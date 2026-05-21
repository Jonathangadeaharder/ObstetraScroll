"""Build all 100 Instagram reels from generated audios + pooled video clips.

For each audio in static/generated-media/audio-11labs/:
  - Slow audio to 0.8x (atempo, pitch preserved).
  - Pick random video(s) from pool; concat more clips if a single one would
    stretch beyond MAX_STRETCH to cover the slowed audio.
  - Stretch (never speed up) the chosen video sequence to match audio duration.
  - Pad to 9:16 720x1280.
  - Transcribe slowed audio with mlx-whisper, filter hallucinations.
  - Burn kinetic ASS captions.
  - Write manifest entry matching feed.ts schema.

Videos can be recycled across reels — pool is reshuffled per reel with a
deterministic seed so the same audio always builds the same reel.
"""

from __future__ import annotations

import json
import os
import random
import re
import subprocess
from pathlib import Path

import mlx_whisper  # pyright: ignore[reportMissingImports]

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "static" / "generated-media"
AUDIO_IN = MEDIA / "audio-11labs"
REELS_OUT = MEDIA / "reels"
AUDIO_OUT = MEDIA / "audio"
POSTERS_OUT = MEDIA / "posters"
WORK = MEDIA / ".work"
for d in (REELS_OUT, AUDIO_OUT, POSTERS_OUT, WORK):
    d.mkdir(parents=True, exist_ok=True)

# Video pool: every .mp4 under these roots is fair game. Add/remove paths here.
VIDEO_POOL_DIRS = [
    MEDIA / "stock",
    MEDIA / "grok-clips",
    MEDIA / "reel-poc",
]
VIDEO_POOL_GLOBS = ["*.mp4", "*.mov"]

AUDIO_SPEED = float(os.environ.get("AUDIO_SPEED", "0.9"))  # 0.9x = ~11% longer
MAX_STRETCH = 1.5                # video stretched no more than 1.5x via setpts
BLACK_TAIL_MAX = 3.0             # acceptable trailing black-pad seconds
MAX_CLIPS_PER_REEL = 8           # concat ceiling; safety against runaway recycling
WHISPER_MODEL = os.environ.get(
    "WHISPER_MODEL", "mlx-community/whisper-large-v3-turbo"
)  # turbo: ~1.5GB vs 3GB for v3
LANG = "es"
WORDS_PER_CHUNK = 3
W, H = 720, 1280
SKIP_EXISTING = os.environ.get("REELS_SKIP_EXISTING", "1") == "1"

# Whisper Spanish errors common in our clinical scripts.
WORD_CORRECTIONS = {
    "lectiva": "electiva",
    "Lectiva": "Electiva",
    "endotarial": "endotelial",
    "endotarials": "endoteliales",
    "publique": "publiques",
}

# Multi-token sequences whisper produces from read-aloud unit notation.
PHRASE_CORRECTIONS = [
    (
        ["kg", "barra", "diagonal", "M", "superíndice", "2"],
        ["kg/m²"],
    ),
    (
        ["kg", "barra", "diagonal", "m", "superíndice", "2"],
        ["kg/m²"],
    ),
    (
        ["mililitros", "barra", "kilogramo"],
        ["ml/kg"],
    ),
]


HALLUCINATION_PATTERNS = [
    r"subt[ií]tulos?(\s+(realizados|creados|por).*)?",
    r"gracias por (ver|mirar|escuchar).*",
    r"suscr[ií]bete.*",
    r"www\..*",
    r"\.com\b",
    r"amara\.org",
    r"^\s*[¡!\.,]+\s*$",
]
HALLUCINATION_RE = re.compile("|".join(HALLUCINATION_PATTERNS), re.IGNORECASE)


def run(cmd: list[str]) -> None:
    result = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if result.returncode != 0:
        err = result.stderr.decode("utf-8", errors="replace")[-2000:]
        raise RuntimeError(f"ffmpeg exit {result.returncode}:\n{err}\nCMD: {' '.join(cmd)}")


def duration(path: Path) -> float:
    out = subprocess.check_output(
        ["/opt/homebrew/bin/ffprobe-full", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(path)],
        text=True,
    ).strip()
    return float(out)


def ts(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h}:{m:02d}:{s:05.2f}"


def discover_videos() -> list[Path]:
    seen: set[Path] = set()
    out: list[Path] = []
    for root in VIDEO_POOL_DIRS:
        if not root.exists():
            continue
        for pattern in VIDEO_POOL_GLOBS:
            for p in root.glob(pattern):
                p = p.resolve()
                if p in seen or not p.is_file():
                    continue
                # Skip our own outputs.
                if REELS_OUT.resolve() in p.parents:
                    continue
                seen.add(p)
                out.append(p)
    return out


def discover_audios() -> list[Path]:
    if not AUDIO_IN.exists():
        return []
    def order_key(p: Path) -> int:
        m = re.match(r"reel-(\d+)", p.stem)
        return int(m.group(1)) if m else 0
    files: list[Path] = []
    for ext in ("*.mp3", "*.wav", "*.m4a"):
        files.extend(AUDIO_IN.glob(f"reel-{ext}"))
    return sorted(files, key=order_key)


def slow_audio(src: Path, dst: Path) -> None:
    run([
        "/opt/homebrew/bin/ffmpeg-full", "-y", "-i", str(src),
        "-filter:a", f"atempo={AUDIO_SPEED}",
        "-c:a", "libmp3lame", "-b:a", "192k", str(dst),
    ])


def pick_clips(pool: list[Path], target_dur: float, seed: int) -> list[Path]:
    """Pick clips until stretched coverage works.

    Goal: total source >= target_dur / MAX_STRETCH so stretch stays <= MAX.
    If still short, fall back to BLACK_TAIL_MAX-second black pad in fit step.
    """
    rng = random.Random(seed)
    soft_need = target_dur / MAX_STRETCH               # stretch-only coverage
    hard_need = (target_dur - BLACK_TAIL_MAX) / MAX_STRETCH  # +black tail OK
    shuffled = pool[:]
    rng.shuffle(shuffled)
    chosen: list[Path] = []
    total = 0.0
    for clip in shuffled:
        try:
            d = duration(clip)
        except subprocess.CalledProcessError:
            continue
        if d <= 0.1:
            continue
        chosen.append(clip)
        total += d
        if total >= soft_need:
            break
        if len(chosen) >= MAX_CLIPS_PER_REEL and total >= hard_need:
            break
    if not chosen and pool:
        chosen = [pool[seed % len(pool)]]
    return chosen


def concat_clips(clips: list[Path], dst: Path) -> None:
    if len(clips) == 1:
        run([
            "/opt/homebrew/bin/ffmpeg-full", "-y", "-i", str(clips[0]),
            "-c:v", "h264_videotoolbox", "-pix_fmt", "yuv420p",
            "-b:v", "6M", "-realtime", "0", "-allow_sw", "0", "-an", str(dst),
        ])
        return
    inputs: list[str] = []
    for c in clips:
        inputs.extend(["-i", str(c)])
    n = len(clips)
    norm = ""
    for i in range(n):
        norm += (
            f"[{i}:v:0]scale={W}:{H}:force_original_aspect_ratio=decrease,"
            f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v{i}];"
        )
    cat = "".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[v]"
    run([
        "/opt/homebrew/bin/ffmpeg-full", "-y", *inputs,
        "-filter_complex", norm + cat, "-map", "[v]",
        "-c:v", "h264_videotoolbox", "-pix_fmt", "yuv420p",
        "-b:v", "6M", "-realtime", "0", "-allow_sw", "0",
        str(dst),
    ])


def fit_video_to_audio(video_src: Path, audio_src: Path, dst: Path) -> None:
    vdur = duration(video_src)
    adur = duration(audio_src)
    if vdur >= adur:
        setpts = 1.0
        black_tail = 0.0
    else:
        natural = adur / vdur
        if natural <= MAX_STRETCH:
            setpts = natural
            black_tail = 0.0
        else:
            setpts = MAX_STRETCH
            black_tail = max(0.0, adur - vdur * MAX_STRETCH)

    if black_tail > 0.05:
        vf = (
            f"[0:v]setpts={setpts}*PTS,"
            f"scale={W}:{H}:force_original_aspect_ratio=decrease,"
            f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[main];"
            f"color=c=black:s={W}x{H}:d={black_tail:.3f}:r=30,setsar=1[tail];"
            f"[main][tail]concat=n=2:v=1:a=0[v]"
        )
    else:
        vf = (
            f"[0:v]setpts={setpts}*PTS,"
            f"scale={W}:{H}:force_original_aspect_ratio=decrease,"
            f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1[v]"
        )

    run([
        "/opt/homebrew/bin/ffmpeg-full", "-y", "-i", str(video_src), "-i", str(audio_src),
        "-filter_complex", vf,
        "-map", "[v]", "-map", "1:a:0", "-shortest",
        "-c:v", "h264_videotoolbox", "-pix_fmt", "yuv420p", "-b:v", "6M", "-realtime", "0", "-allow_sw", "0", "-threads", "0",
        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
        str(dst),
    ])


def apply_phrase_corrections(words: list[dict]) -> list[dict]:
    """Merge multi-token whisper unit names into compact forms."""
    out: list[dict] = []
    i = 0
    while i < len(words):
        matched = False
        for pattern, replacement in PHRASE_CORRECTIONS:
            if i + len(pattern) > len(words):
                continue
            seq = [words[i + j]["word"].strip().lower() for j in range(len(pattern))]
            if seq == [p.lower() for p in pattern]:
                start = words[i]["start"]
                end = words[i + len(pattern) - 1]["end"]
                for tok in replacement:
                    out.append({
                        "word": tok,
                        "start": start,
                        "end": end,
                        "probability": min(words[i + j]["probability"] for j in range(len(pattern))),
                    })
                i += len(pattern)
                matched = True
                break
        if matched:
            continue
        # Single-word spell correction.
        w = dict(words[i])
        stripped = w["word"].strip()
        if stripped in WORD_CORRECTIONS:
            w["word"] = w["word"].replace(stripped, WORD_CORRECTIONS[stripped])
        out.append(w)
        i += 1
    return out


def filter_hallucinations(words: list[dict], audio_dur: float) -> list[dict]:
    if not words:
        return []
    words = apply_phrase_corrections(words)
    clean: list[dict] = []
    for w in words:
        word = w["word"].strip()
        if not word:
            continue
        if w.get("probability", 1.0) < 0.4:
            continue
        if w["start"] > audio_dur + 0.5:
            continue
        if HALLUCINATION_RE.search(word):
            continue
        clean.append(w)
    deduped: list[dict] = []
    for w in clean:
        token = w["word"].strip().lower()
        if (
            len(deduped) >= 2
            and deduped[-1]["word"].strip().lower() == token
            and deduped[-2]["word"].strip().lower() == token
        ):
            continue
        deduped.append(w)
    while deduped:
        tail = " ".join(x["word"].strip() for x in deduped[-5:])
        if HALLUCINATION_RE.search(tail):
            deduped.pop()
        else:
            break
    return deduped


def transcribe(audio_path: Path) -> list[dict]:
    result = mlx_whisper.transcribe(
        str(audio_path),
        path_or_hf_repo=WHISPER_MODEL,
        word_timestamps=True,
        language=LANG,
        condition_on_previous_text=False,
        no_speech_threshold=0.6,
        compression_ratio_threshold=2.4,
        temperature=0.0,
    )
    words: list[dict] = []
    for seg in result["segments"]:
        if seg.get("no_speech_prob", 0.0) > 0.6:
            continue
        for w in seg.get("words", []):
            words.append({
                "word": w["word"],
                "start": float(w["start"]),
                "end": float(w["end"]),
                "probability": float(w.get("probability", 1.0)),
            })
    return filter_hallucinations(words, duration(audio_path))


# Per-reel caption themes — cycled by reel index so users see variety.
# Colors are ASS BGR (&H00BBGGRR). Hot = active word, Base = rest.
CAPTION_THEMES = [
    # Neon green pop
    {"hot": "&H0080DE4A", "base": "&H00FFFFFF", "font": "Impact",
     "base_size": 64, "hot_size": 86, "effect": "pop"},
    # Hot yellow flash
    {"hot": "&H0000E5FF", "base": "&H00FFFFFF", "font": "Impact",
     "base_size": 64, "hot_size": 86, "effect": "pop"},
    # Hot pink
    {"hot": "&H00B4377C", "base": "&H00FFFFFF", "font": "Impact",
     "base_size": 62, "hot_size": 84, "effect": "shake"},
    # Cyan electric
    {"hot": "&H00F4E000", "base": "&H00FFFFFF", "font": "Impact",
     "base_size": 64, "hot_size": 88, "effect": "pop"},
    # Magenta
    {"hot": "&H00FF3CFF", "base": "&H00FFFFFF", "font": "Arial Black",
     "base_size": 62, "hot_size": 84, "effect": "tilt"},
    # Orange burn
    {"hot": "&H001E80FF", "base": "&H00FFFFFF", "font": "Impact",
     "base_size": 64, "hot_size": 86, "effect": "pop"},
    # White block, no color highlight, big scale
    {"hot": "&H00FFFFFF", "base": "&H00C8C8C8", "font": "Helvetica",
     "base_size": 60, "hot_size": 92, "effect": "scale-only"},
    # Red alert
    {"hot": "&H003C3CE6", "base": "&H00FFFFFF", "font": "Impact",
     "base_size": 64, "hot_size": 86, "effect": "shake"},
]


def ass_header(theme: dict) -> str:
    return f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginV, Encoding
Style: Base,{theme['font']},{theme['base_size']},{theme['base']},&H00000000,&H00000000,1,0,1,4,0,2,260,1
Style: Hot,{theme['font']},{theme['hot_size']},{theme['hot']},&H00000000,&H00000000,1,0,1,5,0,2,260,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""


def hot_override(theme: dict, _dur_ms: int) -> str:
    """Return ASS override tags appended to active word for theme effect."""
    effect = theme.get("effect", "pop")
    if effect == "pop":
        # Scale up 1.0 -> 1.15 over first 120ms.
        return rf"{{\rHot\t(0,120,\fscx115\fscy115)}}"
    if effect == "shake":
        # Slight rotation back-forth.
        return rf"{{\rHot\t(0,80,\frz-4)\t(80,160,\frz4)\t(160,240,\frz0)}}"
    if effect == "tilt":
        return rf"{{\rHot\frz-3\t(0,200,\frz3)}}"
    if effect == "scale-only":
        return rf"{{\rHot\t(0,150,\fscx120\fscy120)}}"
    return r"{\rHot}"


def build_ass(words: list[dict], seed: int = 0) -> str:
    theme = CAPTION_THEMES[seed % len(CAPTION_THEMES)]
    lines: list[str] = []
    for i in range(0, len(words), WORDS_PER_CHUNK):
        chunk = words[i : i + WORDS_PER_CHUNK]
        for j, active in enumerate(chunk):
            parts = []
            dur_ms = int((active["end"] - active["start"]) * 1000)
            hot_tag = hot_override(theme, dur_ms)
            for k, w in enumerate(chunk):
                tag = hot_tag if k == j else r"{\rBase}"
                text = w["word"].strip().replace("{", "").replace("}", "")
                parts.append(f"{tag}{text}")
            line_text = " ".join(parts)
            start = active["start"]
            end = chunk[j + 1]["start"] if j + 1 < len(chunk) else active["end"] + 0.05
            lines.append(f"Dialogue: 0,{ts(start)},{ts(end)},Base,,0,0,0,,{line_text}")
    return ass_header(theme) + "\n".join(lines) + "\n"


CAPTIONS_OUT = MEDIA / "captions"
CAPTIONS_OUT.mkdir(parents=True, exist_ok=True)


def burn_captions(video: Path, words: list[dict], dst: Path, seed: int = 0) -> None:
    slug = dst.stem
    ass_path = CAPTIONS_OUT / f"{slug}.ass"
    txt_path = CAPTIONS_OUT / f"{slug}.txt"
    ass_path.write_text(build_ass(words, seed=seed))
    txt_path.write_text(" ".join(w["word"].strip() for w in words))
    try:
        run([
            "/opt/homebrew/bin/ffmpeg-full", "-y", "-i", str(video),
            "-vf", f"ass={ass_path}",
            "-c:v", "h264_videotoolbox", "-pix_fmt", "yuv420p", "-b:v", "6M", "-realtime", "0", "-allow_sw", "0", "-threads", "0",
            "-c:a", "copy", str(dst),
        ])
    finally:
        # Keep .ass + .txt for inspection / re-burn.
        pass


WORKERS = int(os.environ.get("REELS_WORKERS", "3"))


def process_one(args: tuple[int, int, str, list[str]]) -> dict | None:
    i, total, audio_src_str, pool_strs = args
    audio_src = Path(audio_src_str)
    pool = [Path(p) for p in pool_strs]
    slug = audio_src.stem
    final_video = REELS_OUT / f"{slug}.mp4"
    final_audio = AUDIO_OUT / f"{slug}.mp3"
    poster = POSTERS_OUT / f"{slug}.jpg"

    if SKIP_EXISTING and final_video.exists() and final_audio.exists() and poster.exists():
        print(f"[{i+1:3d}/{total}] {slug}: SKIP")
        return {
            "slug": slug,
            "durationSec": round(duration(final_video)),
            "videoPath": f"/generated-media/reels/{slug}.mp4",
            "audioPath": f"/generated-media/audio/{slug}.mp3",
            "posterPath": f"/generated-media/posters/{slug}.jpg",
        }

    print(f"[{i+1:3d}/{total}] {slug} START")
    try:
        slowed_audio = WORK / f"{slug}.audio.mp3"
        slow_audio(audio_src, slowed_audio)
        target = duration(slowed_audio)

        clips = pick_clips(pool, target, seed=i)
        concat = WORK / f"{slug}.concat.mp4"
        concat_clips(clips, concat)

        muxed = WORK / f"{slug}.muxed.mp4"
        fit_video_to_audio(concat, slowed_audio, muxed)

        words = transcribe(slowed_audio)
        burn_captions(muxed, words, final_video, seed=i)
        run(["cp", str(slowed_audio), str(final_audio)])
        run([
            "/opt/homebrew/bin/ffmpeg-full", "-y", "-i", str(final_video),
            "-frames:v", "1", "-q:v", "3", str(poster),
        ])

        for tmp in (slowed_audio, concat, muxed):
            tmp.unlink(missing_ok=True)

        final_dur = duration(final_video)
        print(f"[{i+1:3d}/{total}] {slug} OK ({final_dur:.1f}s, {len(words)} words, {len(clips)} clips)")
        return {
            "slug": slug,
            "durationSec": round(final_dur),
            "videoPath": f"/generated-media/reels/{slug}.mp4",
            "audioPath": f"/generated-media/audio/{slug}.mp3",
            "posterPath": f"/generated-media/posters/{slug}.jpg",
        }
    except Exception as exc:
        print(f"[{i+1:3d}/{total}] {slug} FAIL: {exc}")
        return None


def main() -> None:
    pool = discover_videos()
    audios = discover_audios()
    print(f"Video pool: {len(pool)} clips")
    print(f"Audios:     {len(audios)}")
    print(f"Workers:    {WORKERS}")
    if not pool or not audios:
        raise SystemExit("Missing inputs. Check VIDEO_POOL_DIRS and AUDIO_IN.")

    pool_strs = [str(p) for p in pool]
    tasks = [(i, len(audios), str(a), pool_strs) for i, a in enumerate(audios)]

    from concurrent.futures import ProcessPoolExecutor

    manifest_items: list[dict] = []
    with ProcessPoolExecutor(max_workers=WORKERS) as ex:
        for result in ex.map(process_one, tasks):
            if result:
                manifest_items.append(result)

    manifest_items.sort(key=lambda x: x["slug"])
    (MEDIA / "manifest.json").write_text(
        json.dumps({"items": manifest_items}, indent=2)
    )
    print(f"\nWrote {len(manifest_items)} items to manifest.json")


if __name__ == "__main__":
    main()

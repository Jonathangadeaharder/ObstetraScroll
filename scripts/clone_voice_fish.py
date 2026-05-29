"""Generate reel narration via Fish Speech s2-pro voice cloning (free, local).

Replaces ElevenLabs API. Uses one of the high-quality ElevenLabs clips as
zero-shot reference. Same voice timbre, no per-generation cost.

Flow:
  1. Pick reference: shortest non-trivial ElevenLabs reel (best signal/length).
  2. Transcribe reference once via whisper for ref_text.
  3. For each fact, build beat-1+beat-2 script via planReel logic.
  4. Call mlx-audio Fish s2-pro generate with ref_audio + ref_text.
  5. Write `audio-11labs/{slug}.mp3` (same path build_all_reels expects).

Run after `pnpm media:all` once to flip the source of voice from paid API to
local clone. Future regens are free.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

from aiservices.transcribe import transcribe
from aiservices.generate import AudioGenerator

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "static" / "generated-media"
AUDIO_IN = MEDIA / "audio-11labs"
OUT = MEDIA / "audio-11labs"  # write into same dir, skip existing
REF_CACHE = MEDIA / ".voice-ref.json"

FISH_MODEL = "mlx-community/fish-audio-s2-pro-8bit"
WHISPER_MODEL = "mlx-community/whisper-large-v3-turbo"

OUT.mkdir(parents=True, exist_ok=True)


def pick_reference() -> tuple[Path, float]:
    """Choose a clean reel clip as voice reference.

    Targets ~10-20s — long enough to capture timbre, short enough for Fish.
    """
    if REF_CACHE.exists():
        cached = json.loads(REF_CACHE.read_text())
        p = Path(cached["path"])
        if p.exists():
            return p, cached["duration"]

    candidates: list[tuple[Path, float]] = []
    for f in sorted(AUDIO_IN.glob("reel-*.mp3")):
        dur = float(
            subprocess.check_output(
                [
                    "/opt/homebrew/bin/ffprobe-full", "-v", "error",
                    "-show_entries", "format=duration", "-of", "csv=p=0", str(f),
                ],
                text=True,
            ).strip()
        )
        if 10.0 <= dur <= 22.0:
            candidates.append((f, dur))

    if not candidates:
        for f in sorted(AUDIO_IN.glob("reel-*.mp3")):
            dur = float(
                subprocess.check_output(
                    [
                        "/opt/homebrew/bin/ffprobe-full", "-v", "error",
                        "-show_entries", "format=duration", "-of", "csv=p=0", str(f),
                    ],
                    text=True,
                ).strip()
            )
            candidates.append((f, dur))
        candidates.sort(key=lambda x: x[1])

    chosen = candidates[0]
    REF_CACHE.write_text(json.dumps({"path": str(chosen[0]), "duration": chosen[1]}))
    return chosen


def transcribe_reference(ref_audio: Path) -> str:
    r = transcribe(str(ref_audio), language="es")
    text = " ".join(seg.text.strip() for seg in r.segments)
    return text.strip()


def load_briefs() -> list[dict]:
    """Re-use feed planning by invoking tsx with project's planReel logic."""
    proj_root = str(ROOT)
    script = (
        "import { facts } from './src/lib/server/facts.ts';"
        "import { facts2, facts2Block6to10 } from './src/lib/server/facts2.ts';"
        "import { facts3 } from './src/lib/server/facts3.ts';"
        "import { planReel, reelRequestSchema } from './src/lib/server/reelPlanner.ts';"
        "const TONES = ['calm','urgent','mentor'];"
        "const all = [...facts, ...facts2, ...facts2Block6to10, ...facts3];"
        "const out = all.map((f, i) => {"
        " const tone = TONES[i % TONES.length];"
        " const req = reelRequestSchema.parse({factId: f.id, tone, targetDurationSec: 60});"
        " const brief = planReel(f, req);"
        " return { slug: 'reel-' + String(f.rank).padStart(3,'0') + '-' + f.id, script: brief.script };"
        "});"
        "process.stdout.write(JSON.stringify(out));"
    )
    raw = subprocess.check_output(
        ["pnpm", "exec", "tsx", "-e", script],
        cwd=proj_root,
        text=True,
    )
    return json.loads(raw)


def beat_1_2(script: str) -> str:
    paragraphs = script.split("\n\n")
    return (
        "\n\n".join(paragraphs[1:3]).strip()
        if len(paragraphs) >= 3
        else script.strip()
    )


def main() -> None:
    ref_audio, ref_dur = pick_reference()
    print(f"Reference: {ref_audio.name} ({ref_dur:.1f}s)")
    ref_text = transcribe_reference(ref_audio)
    print(f"Ref text ({len(ref_text)} chars): {ref_text[:120]}...")

    briefs = load_briefs()
    print(f"Generating {len(briefs)} reels via Fish s2-pro...")

    for i, item in enumerate(briefs):
        slug = item["slug"]
        out_path = OUT / f"{slug}.mp3"
        if out_path.exists():
            print(f"[{i+1:3d}/{len(briefs)}] {slug} SKIP exists")
            continue

        text = beat_1_2(item["script"])
        if not text:
            print(f"[{i+1:3d}/{len(briefs)}] {slug} SKIP empty text")
            continue

        try:
            AudioGenerator().generate(
                text=text,
                output=str(out_path),
            )
            print(f"[{i+1:3d}/{len(briefs)}] {slug} OK")
        except Exception as exc:
            print(f"[{i+1:3d}/{len(briefs)}] {slug} FAIL: {exc}")

    print(f"\nDone. Outputs in {OUT}")
    print("To swap for build_all_reels.py, point AUDIO_IN at that dir or rename.")


if __name__ == "__main__":
    main()

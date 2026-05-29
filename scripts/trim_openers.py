"""Trim repetitive opener "Un detalle de partería que se aprende con cancha,"
from each ElevenLabs reel audio.

Strategy: whisper-transcribe → find last word of opener phrase → cut after it
via ffmpeg seek. Originals backed up to audio-11labs.orig/.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from aiservices.transcribe import transcribe

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "static" / "generated-media"
AUDIO_IN = MEDIA / "audio-11labs"
BACKUP = MEDIA / "audio-11labs.orig"
FFMPEG = "/opt/homebrew/bin/ffmpeg-full"

# Tokens (lowercase, comma-stripped) that mark end of repetitive opener.
# Whisper splits "cancha," into "cancha" and "," — we match on the word.
OPENER_END_TOKENS = ["cancha"]
# Fallback if whisper missed: any of these phrases also marks the boundary.
OPENER_END_FALLBACK = ["pasarse", "pausa", "teoría", "olvida", "tenerlo"]


def find_cut_seconds(audio: Path) -> float | None:
    r = transcribe(str(audio))
    # Look only in first segment — opener is always there.
    if not r.segments:
        return None
    first = r.segments[0]
    end_of_first = float(first.end)
    # Check segment text for opener end markers (no word-level timestamps in new API).
    text_lower = first.text.strip().lower()
    for token in OPENER_END_TOKENS:
        if token in text_lower:
            return end_of_first + 0.15
    for token in OPENER_END_FALLBACK:
        if token in text_lower:
            return end_of_first
    # If first segment is itself just the opener, cut right after it.
    if end_of_first < 12.0:
        return end_of_first + 0.05
    return None


def trim_audio(src: Path, cut_s: float, dst: Path) -> None:
    subprocess.run(
        [
            FFMPEG, "-y", "-ss", f"{cut_s:.3f}", "-i", str(src),
            "-c", "copy", str(dst),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )


def process_one(args: tuple[int, int, str]) -> None:
    i, total, src_str = args
    src = Path(src_str)
    backup = BACKUP / src.name
    if not backup.exists():
        shutil.copy2(src, backup)
    else:
        shutil.copy2(backup, src)

    try:
        cut = find_cut_seconds(src)
    except Exception as exc:
        print(f"  [{i+1:3d}/{total}] {src.name} TRANSCRIBE FAIL: {exc}")
        return

    if cut is None or cut < 1.0:
        print(f"  [{i+1:3d}/{total}] {src.name} no opener detected")
        return

    tmp = src.with_suffix(".trim.wav")
    try:
        trim_audio(backup, cut, tmp)
        tmp.replace(src)
        print(f"  [{i+1:3d}/{total}] {src.name} cut @ {cut:.2f}s")
    except subprocess.CalledProcessError as exc:
        print(f"  [{i+1:3d}/{total}] {src.name} FFMPEG FAIL: {exc.stderr.decode()[-300:]}")
        tmp.unlink(missing_ok=True)


def main() -> None:
    BACKUP.mkdir(exist_ok=True, parents=True)
    files = sorted(AUDIO_IN.glob("reel-*.wav"))
    if not files:
        print(f"No audios in {AUDIO_IN}")
        sys.exit(1)
    print(f"Trimming openers from {len(files)} audios...")

    import os
    from concurrent.futures import ProcessPoolExecutor

    workers = int(os.environ.get("TRIM_WORKERS", "6"))
    tasks = [(i, len(files), str(f)) for i, f in enumerate(files)]
    with ProcessPoolExecutor(max_workers=workers) as ex:
        list(ex.map(process_one, tasks))


if __name__ == "__main__":
    main()

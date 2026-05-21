"""Re-encode reels at lower bitrate so total fits GitHub 2GB pack limit.

libx264 CRF 26 + AAC 96k. ~6.5× reduction with no visible quality loss on
mobile 720x1280 playback. Parallel across cores via ProcessPoolExecutor.
"""

from __future__ import annotations

import os
import shutil
import subprocess
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REELS = ROOT / "static" / "generated-media" / "reels"
TMP_SUFFIX = ".compressed.mp4"
FFMPEG = "/opt/homebrew/bin/ffmpeg-full"
WORKERS = int(os.environ.get("COMPRESS_WORKERS", "6"))


def compress_one(src_str: str) -> tuple[str, int, int]:
    src = Path(src_str)
    tmp = src.with_suffix(TMP_SUFFIX)
    before = src.stat().st_size
    subprocess.run(
        [
            FFMPEG, "-y", "-i", str(src),
            "-c:v", "libx264", "-preset", "slow", "-crf", "26",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            "-c:a", "aac", "-b:a", "96k",
            str(tmp),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    after = tmp.stat().st_size
    shutil.move(str(tmp), str(src))
    return src.name, before, after


def main() -> None:
    reels = sorted(REELS.glob("*.mp4"))
    print(f"Compressing {len(reels)} reels with {WORKERS} workers...")

    total_before = 0
    total_after = 0
    with ProcessPoolExecutor(max_workers=WORKERS) as ex:
        for i, (name, before, after) in enumerate(
            ex.map(compress_one, (str(p) for p in reels))
        ):
            total_before += before
            total_after += after
            ratio = before / after if after else 0
            print(
                f"  [{i+1:3d}/{len(reels)}] {name} "
                f"{before/1e6:.1f}M -> {after/1e6:.1f}M ({ratio:.1f}x)"
            )

    print(
        f"\nTotal: {total_before/1e9:.2f}GB -> {total_after/1e9:.2f}GB "
        f"({total_before/total_after:.1f}x reduction)"
    )


if __name__ == "__main__":
    main()

import sys
import mlx_whisper  # pyright: ignore[reportMissingImports]

audio = sys.argv[1]
r = mlx_whisper.transcribe(
    audio,
    path_or_hf_repo="mlx-community/whisper-large-v3-mlx",
    word_timestamps=True,
    language="es",
    condition_on_previous_text=False,
    no_speech_threshold=0.6,
    compression_ratio_threshold=2.4,
    temperature=0.0,
)
for seg in r["segments"]:
    print(f"[{seg['start']:.1f}-{seg['end']:.1f}] {seg['text']}")

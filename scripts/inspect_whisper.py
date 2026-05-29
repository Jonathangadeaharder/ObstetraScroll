import sys
from aiservices.transcribe import transcribe

audio = sys.argv[1]
r = transcribe(audio)
for seg in r.segments:
    print(f"[{seg.start:.1f}-{seg.end:.1f}] {seg.text}")

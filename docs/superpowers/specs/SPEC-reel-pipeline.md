# SPEC: Reel Planning & Medi Pipeline

**Status:** Approved  
**Date:** 2026-05-17  
**Components:**
- `src/lib/server/reelPlanner.ts` (brief generation)
- `src/lib/server/feed.ts` (feed assembly)
- `scripts/reel1-10-pipeline.mjs` (orchestration)

## Overview

Transforms a clinical `Fact` → `ReelBrief` → media assets → playable `ReelFeedItem`. The pipeline has two modes: POC (external APIs) and production (local MLX models).

## Brief Generation (`reelPlanner.ts`)

Input: `Fact` + `ReelRequest` (tone, target duration)  
Output: `ReelBrief` with 5 beats

### Beats

| ID | Duration | Purpose |
|----|----------|---------|
| `b00_hook` | 4s | Attention-grabbing opener |
| `b01_reframe` | 6s | Why this contradicts common belief |
| `b02_clinical_point` | 8s | The evidence-based insight |
| `b03_action` | 5-137s | Practical checklist for practice |
| `b04_safety` | 5s | Safety disclaimer + review notice |

### Tone Variants

| Tone | Opener |
|------|--------|
| `calm` | "Mirá esto con calma, pero sin dejarlo pasar:" |
| `urgent` | "Este momento en sala no conviene pasarlo por alto:" |
| `mentor` | "Un detalle de partería que se aprende con cancha:" |

### Render Plan

Each brief includes a render plan with 4 steps: script → keyframes → voice → assemble. Each step has a status (`ready`/`queued`/`blocked`) based on `evidenceStatus` and `riskLevel`.

## Feed Assembly (`feed.ts`)

Takes facts + generated media manifest → `ReelFeedItem[]`.

### Manifest Resolution

1. Check `static/generated-media/manifest.json`
2. Check `build/client/generated-media/manifest.json` (Docker)
3. Fallback: construct paths by convention (`/generated-media/reels/{slug}.mp4`)

### Audio Duration

- Reads actual duration from `.wav` files via `ffprobe`
- Falls back to 8 seconds if file not found or probe fails

## Media Generation Scripts

| Script | Mode | AI Providers |
|--------|------|-------------|
| `generate-poc-media.mjs` | POC | Kling v1.6 (video), ElevenLabs (audio) |
| `generate-ai-media.mjs` | Production | AIServices/MLX (all) |

### Pipeline Steps

```
Scripts pipeline:
  generate-briefs.mjs  →  JSON briefs per fact
  ↓
  generate-poc-media.mjs / generate-ai-media.mjs
  ↓  (parallel per reel)
  Kling API (video) + ElevenLabs API (audio)
  OR
  MLX text2video + text2audio
  ↓
  ffmpeg assemble (overlay + subtitles)
  ↓
  manifest.json (maps slug → asset paths)
```

## Error Handling

- **Failed media generation:** Script retries (retry script for batch), non-blocking — individual reels can fail independently
- **Missing manifest:** Feed falls back to convention-based paths
- **Audio probe failure:** Falls back to default 8s duration

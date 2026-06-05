# ObstetraScroll

SvelteKit proof of concept para generar reels revisados para parteras y obstétricas. Vertical Instagram-style feed of clinical obstetric facts with video reels, auto-generated quizzes, and spaced repetition.

## Features

- **299 clinical facts** across HPP, preeclampsia, neonatal sepsis, prematurity, asphyxia, infections, nutrition, and more — sourced from Cochrane Reviews, WHO, and DGGG guidelines
- **Instagram-style reel feed** — scroll-snap vertical video with 9:16 reels, poster images, and progress bars
- **Quiz system with SM-2 spaced repetition** — every 5th reel is a quiz card; wrong answers resurface faster via weighted random selection
- **Reel planner** — turns each fact into a 5-beat brief (hook, reframe, clinical point, action, safety) with editorial gating (`approved` vs `review_required`)
- **Clinical glossary** — auto-detects jargon (HPP, AMTSL, TXA, etc.) in fact text and surfaces definitions in the info overlay
- **Rioplatense Spanish UI** — tone shifts neutral Spanish to Argentine voseo; all clinical content in Spanish
- **Media pipeline** — Python + ffmpeg scripts generate reels from ElevenLabs audio + pooled stock clips, with mlx-whisper transcription and ASS caption burning
- **3 API routes** — `/api/facts`, `/api/feed`, `/api/reels` (POST for brief generation)

## Stack

**Frontend:** SvelteKit 5 (adapter-node), Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`), TypeScript, Zod

**Styling:** Newsreader Variable (serif) + JetBrains Mono Variable (mono), custom CSS variables, desktop two-column + mobile single-column layout

**Testing:** Vitest + jsdom, @testing-library/svelte, MSW, Playwright + axe-core, Stryker mutation

**Linting/Formatting:** Biome, commitlint (conventional), Husky + lint-staged

**CI:** GitHub Actions (self-hosted macOS ARM64) — pr-gate (lint, typecheck, unit+coverage, build, deps audit), merge-gate (adds E2E), CodeQL, SonarCloud, Semgrep (disabled), gitleaks (disabled)

**Deployment:** Docker (Node 22 slim), Coolify + Traefik on DigitalOcean, `adapter-node` with static generated-media served from `build/client/generated-media/`

## Project Structure

```
src/
  lib/
    client/
      ReelFeed.svelte      # Main feed component (virtualization, scroll, keyboard, touch)
      ReelCard.svelte       # Individual reel (video + quiz + pipeline sidebar)
      InfoOverlay.svelte    # Bottom sheet with glossary + clinical detail
      reelFeed.ts           # Feed helpers: looping, pagination, virtualization, info items
      spacedRepetition.ts   # SM-2-lite quiz scheduling (localStorage)
      glossary.ts           # 28 obstetric term definitions
    server/
      facts.ts              # Facts lotes 1 (rank 1–100)
      facts2.ts             # Facts lotes 2 (rank 101–200)
      facts3.ts             # Facts lotes 3 (rank 201+)
      feed.ts               # Feed item builder, reads manifest.json
      reelPlanner.ts        # Brief generator with tone hooks and render plan
      enrichQuiz.ts         # Quiz distractor engine (number mutation, direction inversion, misconception)
    types.ts                # Shared types (Fact, ReelBrief, QuizQuestion, ReelFeedItem, etc.)
  routes/
    +page.svelte            # Renders ReelFeed
    +page.server.ts         # Loads facts + feed items
    api/facts/+server.ts    # GET all facts
    api/feed/+server.ts     # GET feed items
    api/reels/+server.ts    # POST plan a reel brief
scripts/
  build_all_reels.py        # Python/ffmpeg pipeline: audio → video → captions → manifest
  generate-elevenlabs-audio.mjs  # ElevenLabs TTS for all fact scripts
  rebuild-manifest.mjs      # Regenerate manifest.json from reels dir
  trim_openers.py           # Trim audio openers
  compress_reels.py         # Compress generated reels
  clone_voice_fish.py       # Voice cloning utility
  inspect_whisper.py        # Whisper transcription debug
static/generated-media/
  reels/                    # Final .mp4 reels
  audio/                    # Generated .mp3 voiceovers
  posters/                  # .jpg poster frames
  captions/                 # .ass + .txt subtitle files
  grok-clips/               # Raw Grok-generated video clips
  stock/                    # Stock footage pool
  manifest.json             # Feed manifest (slug → paths + duration)
```

## Development

```bash
pnpm install
pnpm run dev          # http://localhost:5173
```

## Scripts

```bash
pnpm run media:audio   # Generate ElevenLabs voiceovers (requires ELEVENLABS_TOKEN)
pnpm run media:trim    # Trim audio openers (Python)
pnpm run media:all     # Full pipeline: audio + video + captions + manifest (Python)
```

## Docker

```bash
docker compose up
```

App listens on port 3000 inside the container. Default host port is 3004 (`PORT` env var). AI provider env vars (`AI_PROVIDER`, `MINI_MODEL`, `LOCAL_AI_BASE_URL`) are accepted but not yet wired to a runtime AI module.

## Test

```bash
pnpm run test           # Vitest unit tests (jsdom, network-banned)
pnpm run test:watch     # Vitest watch mode
pnpm exec playwright test  # E2E tests (requires dev server)
```

Coverage thresholds: branches 80%, functions 70%, lines 80%, statements 80%.

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | Host port for Docker | `3000` |
| `AI_PROVIDER` | AI backend selector (not yet implemented) | `mini` |
| `ELEVENLABS_TOKEN` | ElevenLabs TTS API key | — |
| `ELEVENLABS_VOICE_ID` | Voice ID for audio generation | `D6fGRDoSy1WFiaIpAbC7` |
| `PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog analytics (not yet implemented) | — |
| `PUBLIC_SUPABASE_URL` | Supabase (not yet implemented) | — |

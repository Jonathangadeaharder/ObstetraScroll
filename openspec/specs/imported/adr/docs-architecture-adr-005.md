---
id: ADR-005
kind: adr
title: AI Service Integration Architecture
status: draft
date: 2026-05-17T00:00:00.000Z
authors: []
reviewers: []
tags: []
supersedes: []
superseded_by: []
depends_on: []
blocks: []
implements: []
related: []
external: []
project: ObstetraScroll
checksum: ca71a7e45022ff9846d80db36f6ace5c2a12ba89c626414c5da5b1d9ea312eff
---

> Imported legacy ADR artifact from `docs/architecture/ADR-005.md`. Keep future lifecycle work in OpenSpec.

**Deciders:** Architecture Team

## Context

ObstetraScroll generates video reels from evidence-based medical facts. This requires AI-powered media generation: text-to-video, image-to-video, text-to-image, and text-to-audio. The project must also support a "POC mode" using external APIs (ElevenLabs, Kling) alongside local MLX models.

## Decision

### Architecture: Local Python Subprocess Pattern

The AIServices client (`src/lib/server/aiservices.ts`) communicates with a separate Python monorepo at `../AIServices/` via subprocess:

```
┌──────────────────┐     uv run --package <op>     ┌──────────────────────┐
│  SvelteKit App   │ ──────────────────────────→   │  AIServices (Python) │
│  (Node.js)       │ ←──────────────────────────   │  MLX models          │
│  aiservices.ts   │     stdout/file path           │  local inference     │
└──────────────────┘                                └──────────────────────┘
```

### Supported Operations

| Operation     | Type            | POC Provider          | Local Provider |
| ------------- | --------------- | --------------------- | -------------- |
| `text2video`  | Text → Video    | —                     | MLX (LTX 2.3)  |
| `image2video` | Image → Video   | Kling v1.6            | MLX (LTX 2.3)  |
| `text2image`  | Text → Image    | —                     | MLX            |
| `text2audio`  | Text → Audio    | ElevenLabs (Chantini) | MLX            |
| `kling-v1-6`  | API passthrough | Kling API             | —              |
| `elevenlabs`  | API passthrough | ElevenLabs API        | —              |

### AI Provider Abstraction (Env-Driven)

The `docker-compose.yml` exposes `AI_PROVIDER` to switch between modes:

| `AI_PROVIDER` | Behavior                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mini`        | CPU-friendly local models (phi3:mini via Ollama sidecar). Default for production droplet.                                                                                                                            |
| `ollama`      | Local dev. Models via localhost. $0 cost.                                                                                                                                                                            |
| `openrouter`  | OpenRouter API. Pay-per-token.                                                                                                                                                                                       |
| `groq`        | Groq API. Fast, cheap inference.                                                                                                                                                                                     |
| `docker`      | Docker Model Runner with vllm-metal backend. Uses Metal GPU via host-native process. Connect via host.docker.internal. Replaces Ollama for text LLM inference. Available on Apple Silicon with Docker Desktop 4.40+. |

### Command Construction

`buildAIServicesCommand()` maps each operation to a `uv run` invocation:

```
uv run --package text2video text2video --prompt "..." --output /path --seconds 60
```

Environment variables:

- `PYTHONPATH`: Points to Python source directories
- `HF_HUB_DISABLE_XET`: Prevents Xet LFS overhead
- `IMAGE2VIDEO_MODEL_DIR` / `TEXT2VIDEO_MODEL_DIR`: MLX model paths

### POC Pipeline (`scripts/`)

Separate Node.js scripts in `scripts/` handle the POC media generation pipeline:

| Script                          | Purpose                                    |
| ------------------------------- | ------------------------------------------ |
| `generate-poc-media.mjs`        | Generate 10 POC reels (Kling + ElevenLabs) |
| `generate-ai-media.mjs`         | Generate reels using local AIServices      |
| `generate-elevenlabs-audio.mjs` | ElevenLabs TTS batch                       |
| `generate-briefs.mjs`           | Generate reel briefs from facts            |
| `reel1-10-pipeline.mjs`         | Orchestrate end-to-end pipeline            |
| `reel1-10-process.mjs`          | Process individual reel                    |
| `reel1-10-retry.mjs`            | Retry failed reels                         |

### Deployment

- Docker image built from `Dockerfile` (multi-stage, `node:22-slim`)
- Deployed via Coolify with Traefik reverse proxy
- Self-hosted runner (macOS) for local AI model execution
- Healthcheck at `/` via `curl`

## Consequences

- **Positive:** Zero API costs during development. All models run locally on Apple Silicon.
- **Positive:** Single `AI_PROVIDER` env var to switch providers. Code never changes.
- **Negative:** MLX media models (FLUX, LTX, Fish-Speech) still tied to macOS/Apple Silicon. Text LLM inference now portable via Docker Model Runner's OpenAI-compatible API.
- **Negative:** Python monorepo dependency (`../AIServices/`) makes the project non-self-contained.
- **Trade-off:** Subprocess communication is simpler than HTTP/gRPC but less scalable. Acceptable for POC.
- **Positive:** Docker Model Runner eliminates the Ollama sidecar dependency for text-based LLM tasks (fact generation, brief generation). Single `docker model pull` replaces manual Ollama setup.

---
id: ADR-004
kind: adr
title: Testing Strategy
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
checksum: 73ebe9f973f68c3e3e9ac1e7a9e511e0b03f75a502e0031c49e3459d1a932a1e
---

> Imported legacy ADR artifact from `docs/architecture/ADR-004.md`. Keep future lifecycle work in OpenSpec.

**Deciders:** Architecture Team  

## Context

The project generates evidence-based medical content where correctness is critical. Tests must ensure:
1. Clinical facts are accurately transformed into quiz questions
2. Reel planning logic produces valid briefs
3. AI service commands are constructed correctly
4. Feed virtualization works correctly across scroll boundaries

## Decision

### Unit Testing — `vitest` with `jsdom`

- **Environment:** jsdom (not happy-dom) for DOM-dependent component tests
- **Globals:** enabled
- **Pattern:** `src/**/*.{test,spec}.{js,ts}`
- **Setup file:** `vitest.setup.ts` (currently empty, reserved for mocks)

### Coverage Requirements

Configured in `vite.config.ts`:

| Metric | Threshold |
|--------|-----------|
| Branches | 90% |
| Functions | 70% |
| Lines | 90% |
| Statements | 90% |

Coverage scope: `src/lib/**/*.ts` (core logic, not routes/app files).

### Mutation Testing — `Stryker`

- **Config:** `stryker.config.json` with vitest runner
- **Scope:** `src/**/*.{ts,svelte}` (excluding test files)
- **Incremental:** Enabled, cached in `reports/stryker-incremental.json`
- **Thresholds:** high=80, low=60 (no break, for informational purposes)
- **Concurrency:** 4 parallel workers

### Test Scope by Module

| Module | File(s) | What We Test |
|--------|---------|--------------|
| Facts | `facts.ts` | Data integrity (all 100 facts have required fields) |
| Reel Planner | `reelPlanner.ts` | Brief generation for each tone, duration calc, Zod validation |
| Enrich Quiz | `enrichQuiz.ts` | Question generation, option shuffling, answer correctness |
| AI Services | `aiservices.ts` | Command building for each operation, environment variables |
| Feed | `feed.ts` | Feed item construction, manifest parsing, fallback paths |
| reelFeed | `reelFeed.ts` | Virtualization math, page building, scroll direction handling |
| Components | `.svelte` files | Stryker mutation coverage (no dedicated component tests yet) |
| API Routes | `api/reels/+server.ts` | Endpoint validation, error handling |

### Test Files

- `src/lib/server/aiservices.test.ts`
- `src/lib/server/facts.test.ts`
- `src/lib/server/feed.test.ts`
- `src/lib/server/reelPlanner.test.ts`
- `src/lib/client/reelFeed.test.ts`
- `src/routes/api/reels/reels.test.ts`

### What We Do NOT Test (Yet)

- E2E/Playwright tests (no browser test suite — deferred)
- Visual regression tests
- Load/performance tests

## Consequences

- **Positive:** 90% branch coverage on core logic. Mutation testing catches weak tests.
- **Positive:** Stryker incremental mode makes mutation tests feasible on every PR.
- **Trade-off:** No E2E tests means video playback and scroll behavior are untested in real browsers.
- **Trade-off:** No component-level unit tests for Svelte files (Stryker covers them coarsely).

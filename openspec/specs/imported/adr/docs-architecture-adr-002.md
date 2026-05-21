---
id: ADR-002
kind: adr
title: Toolchain
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
checksum: b1780dfab64c807a7707656fb2c8b2a8ae05f91a313148e893bb8be96ceb5e4e
---

> Imported legacy ADR artifact from `docs/architecture/ADR-002.md`. Keep future lifecycle work in OpenSpec.

**Deciders:** Architecture Team

## Context

The project requires a consistent, automated toolchain for linting, formatting, type checking, and code quality enforcement across both local development and CI.

## Decision

### Package Management — `pnpm`

- Strict version `10.33.2` via `packageManager` field
- Frozen lockfile during CI (`pnpm install --frozen-lockfile`)
- Only built dependencies: `@biomejs/biome`, `esbuild`
- `lint-staged` configured for pre-commit hooks

### Linting & Formatting — `biome`

- Version `1.9.4`
- Scope: `src/` only, ignore `.svelte-kit/`
- Indent style: tabs
- Rules: recommended profile with `noConstAssign` and `useConst` disabled
- Biome replaces both ESLint and Prettier

### Type Checking — `svelte-check`

- Runs `svelte-kit sync` first to generate types, then `svelte-check --tsconfig ./tsconfig.json`
- `tsconfig.json` extends `.svelte-kit/tsconfig.json`
- Strict mode enabled. Targets ESNext modules.

### Commit Convention — `commitlint`

- Conventional commits via `@commitlint/config-conventional`
- Husky runs `lint-staged` on pre-commit
- `lint-staged` runs `biome check --write --unsafe` + `biome format --write` on `.ts/.svelte/.js` files

### Git Hygiene

- No commits to `main`/`master`. Always branch + PR.
- PRs merge via squash (`gh pr merge --squash`).
- Branch naming: `fix/<name>` or `feature/<name>`.

## Consequences

- **Positive:** Single tool for lint+format. No ESLint/Prettier friction. Fast `biome check`.
- **Positive:** pnpm is fast, disk-efficient, and enforces strict dependency resolution.
- **Trade-off:** Biome's rule set is smaller than ESLint's plugin ecosystem. Accept for simplicity.
- **Trade-off:** `svelte-check` is slower than raw `tsc` but catches Svelte-specific errors.

---
id: TDD-OBST
kind: tdd
title: ObstetraScroll
description: >-
  SvelteKit proof-of-concept for generating reviewed informational reels for
  midwives
status: draft
date: 2026-05-17T00:00:00.000Z
authors: []
reviewers: []
risk_level: medium
scope_type: project
tags:
  - sveltekit
  - midwifery
  - ai-reels
  - docker
related: []
checksum: b44738ae9b1d8a4b30a8e595e327eba795c4880b87281202e90b74c1c3068f60
---

> Imported legacy TDD artifact from `docs/technical-due-diligence.md`. Keep future lifecycle work in OpenSpec.

## Executive Summary

ObstetraScroll is a SvelteKit POC v0.1.0 for Spanish-language midwifery informational reels with AI-generated content and a TikTok-style vertical feed. The project has the strongest CI/CD pipeline in the portfolio (6 workflows, Trivy, Gitleaks, Stryker mutation, CodeQL) and production-grade Docker deployment on Coolify/Traefik. However, test coverage is thin -- only 6 test files for a full-stack AI application with no client component tests, an empty vitest setup file, and Stryker configured with `break: null` so mutation scores cannot gate CI.

## Scope

Assessed the full SvelteKit codebase including all client and server modules, Docker multi-stage build, docker-compose deployment config, all 6 CI/CD workflow files, Stryker mutation configuration, and SonarCloud quality gate. Excluded the upstream AI provider APIs and the Coolify/Traefik infrastructure layer.

## Architecture

Single-page SvelteKit app with three API route groups (facts, feed, reels) and a vertical reel feed as the primary UI. Client components (ReelCard, ReelFeed, InfoOverlay) manage the TikTok-style scrolling interface. Server modules abstract AI provider interactions behind `aiservices.ts`, with environment-driven switching between local Ollama models and cloud providers. Deployment goes through a multi-stage Docker build to a DigitalOcean droplet via Coolify and Traefik with Let's Encrypt TLS.

## Tech Stack

- **Runtime:** Node 20+, Dockerized (adapter-node)
- **Frontend:** Svelte 5, SvelteKit 2
- **Build:** Vite 6
- **Validation:** zod 3
- **Linting:** Biome 1.9
- **Testing:** Vitest 3, Stryker 9, Playwright (configured)
- **Deploy:** Docker multi-stage, Coolify, Traefik
- **CI/CD:** 6 GitHub Actions workflows
- **Code Quality:** SonarCloud, PR-Agent, Husky, commitlint, lint-staged

## Code Quality

6 test files covering server modules with dedicated `.test.ts` per module. No client component tests exist for ReelCard, ReelFeed, or InfoOverlay. The vitest setup file is empty, meaning SvelteKit environment and store mocks are missing. No coverage thresholds are enforced in CI. Stryker is configured with `high: 80, low: 60, break: null` -- the null break threshold means low mutation scores never fail CI. Biome linting and formatting are configured with lint-staged. SonarCloud quality gate is configured. No README exists.

## Security

Docker security follows best practices: non-root user, tini init, slim base image. CI includes Gitleaks for secret scanning and Trivy for HIGH/CRITICAL dependency CVEs. PR-Agent provides automated security review. AI provider API keys are passed via environment variables with no encryption at rest. No CSP, rate limiting, authentication, or input sanitization is configured for AI-generated content displayed to users. The sslip.io domain is for development only.

## Scalability & Performance

All content is AI-generated at request time with no caching or persistence layer. Every page load triggers AI generation, creating latency and cost scaling issues. No database exists. No load testing has been performed. The Docker healthcheck provides basic liveness, but no performance baselines or SLOs are defined.

## Operations & DevOps

This is the strongest CI/CD setup in the portfolio alongside svelteuml. Six workflows cover PR gates (lint, typecheck, test, build, Trivy, Gitleaks, mutation, infra validation), merge gates (adds CodeQL), PR-Agent, dedicated mutation testing, and AI codebase review. Infrastructure validation checks Dockerfile patterns, docker-compose healthcheck, and env var documentation. Deployment runs through Coolify with Traefik reverse proxy.

## Dependencies & Third-Party Risk

Six runtime deps (fonts, icons, devalue, zod) plus AI provider SDKs loaded at runtime. AI provider availability is the critical third-party dependency -- if Ollama/OpenRouter/Groq is unreachable, the app produces empty content with no fallback. No Dependabot is configured. 18 dev dependencies include the full quality toolchain.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Only 6 test files for full-stack AI app -- high regression risk | High | High | Add client component tests, set coverage thresholds at 80% |
| Stryker break: null -- mutation testing is advisory only | High | Medium | Set break threshold to 60 to enforce minimum mutation score |
| Empty vitest.setup.ts -- client tests run in unreliable environment | High | Medium | Add SvelteKit store/env mocks to vitest setup |
| AI provider unreachable produces empty content | Medium | High | Add fallback content or graceful error UI |
| No README blocks developer onboarding | High | Low | Write README with setup, architecture, and deployment docs |
| No rate limiting on AI generation -- cost explosion risk | Medium | High | Add rate limiting to API endpoints |
| No caching -- every page load regenerates AI content | High | Medium | Add in-memory or filesystem cache with TTL |

## Recommendations

1. **Add client component tests** for ReelCard, ReelFeed, and InfoOverlay using Testing Library and Vitest with jsdom.
2. **Configure coverage thresholds** in vitest config and set Stryker break threshold to 60 to enforce minimum mutation scores in CI.
3. **Fill in vitest.setup.ts** with proper SvelteKit mocks for stores, environment, and navigation.
4. **Add AI provider fallback** or graceful degradation when upstream APIs are unreachable.
5. **Write a README** documenting project purpose, setup instructions, architecture, and deployment process.
6. **Add rate limiting** to AI generation API endpoints to prevent runaway costs.
7. **Add caching layer** for generated content with configurable TTL to reduce AI costs and improve latency.

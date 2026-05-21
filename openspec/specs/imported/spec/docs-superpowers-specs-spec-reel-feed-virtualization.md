---
id: SPEC-REEL
kind: spec
title: "SPEC: Reel Feed Virtualization"
status: draft
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
checksum: 494c17edf762d1fd08fdab5ea8485674e1dbe4159a02382497e0656924b475e1
---

> Imported legacy SPEC artifact from `docs/superpowers/specs/SPEC-reel-feed-virtualization.md`. Keep future lifecycle work in OpenSpec.

---

## checksum: 0298be4ccc8b86e61c89a5fbf24fc3dcfab15e11fad4dd184858e4bfdc5853c9

**Date:** 2026-05-17  
**Component:** `src/lib/client/reelFeed.ts`, `ReelFeed.svelte`, `ReelCard.svelte`

## Overview

TikTok-style vertical feed with infinite scroll, video preloading, and quiz pages. Uses virtual scrolling via IntersectionObserver to render only visible + nearby items.

## Behavior

### Desktop Layout (width > 900px)

- Phone mockup (9:16 aspect ratio) on the left, lesson panel on the right
- Each base feed item loops 12x in the scroll sequence
- Scroll snapping enabled (`y mandatory`)
- Dot navigation on right side shows which base item is active

### Mobile Layout (width ≤ 900px)

- Full-screen vertical scroll (100dvh per page)
- Each base item produces 2 pages: video page + quiz page
- Dot navigation counts base items (not pages)
- Bottom sheet overlay (`InfoOverlay`) for editorial details

### Virtualization Strategy

| Parameter            | Value | Purpose                               |
| -------------------- | ----- | ------------------------------------- |
| `REEL_REPEAT_CYCLES` | 12    | How many times each item loops        |
| `VISIBLE_WINDOW`     | 2     | Items rendered on each side of active |
| `PRELOAD_AHEAD`      | 3     | Videos preloaded ahead of scroll      |

### Keyboard Navigation

| Key               | Action        |
| ----------------- | ------------- |
| ArrowDown / j / n | Next reel     |
| ArrowUp / k       | Previous reel |
| Space             | Toggle pause  |
| Home              | First reel    |
| End               | Last reel     |

### Quiz Flow

- Quiz appears as a separate page (mobile) or sidebar panel (desktop)
- 4 options, shuffled deterministically by `enrichQuiz.ts`
- Clicking reveals correct/incorrect with explanation
- "Next video" button to continue
- Quiz state persists per reel via `selectedAnswers` map

## Data Flow

```
+page.server.ts (load)
  → listFacts() → facts[]
  → listFeedItems() → ReelFeedItem[] (100 items, with briefs)
  → planReel(facts[0]) → initial brief

ReelFeed.svelte
  → buildLoopedFeedItems() → 1200 virtual items (100 × 12)
  → virtualizeReels() → VirtualReel[] (render/preload flags)
  → IntersectionObserver activates nearest reel
  → Video autoplay on intersection

On mobile: buildReelPages() → 2400 virtual pages (100 × 12 × 2)
  → virtualizePages() → VirtualPage[]
```

## Edge Cases

- **Empty feed:** Returns empty arrays, renders nothing
- **Video error:** Shows error overlay, user can skip
- **Rapid scroll:** Preload-ahead of 3 ensures next videos are ready
- **First interaction:** Videos start muted, play on after first tap

---
id: SPEC-QUIZ
kind: spec
title: 'SPEC: Quiz Engine'
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
checksum: 2f50a3ed3e1420f24c5cca1f7a4a4deaa2345479634c377becc3552f6c50796c
---

> Imported legacy SPEC artifact from `docs/superpowers/specs/SPEC-quiz-engine.md`. Keep future lifecycle work in OpenSpec.

---
checksum: 7306fe6c97a4ad7688665be82bbc969570526dcb938e98a7b5790a30c85dc125
---

**Date:** 2026-05-17  
**Component:** `src/lib/server/enrichQuiz.ts`

## Overview

Algorithmic quiz generator that creates 4-option multiple choice questions from any `Fact` object. No ML/AI involved — purely deterministic transformation of structured data.

## Algorithm

### Question Template Selection

4 templates rotate based on `fact.rank`:

1. `"Según la evidencia, {title to lowercase}?"`
2. `"En la práctica clínica, ¿cuál es la conducta correcta respecto a {title to lowercase}?"`
3. `"¿Cuál de estas afirmaciones sobre {title to lowercase} está respaldada por la evidencia?"`
4. `"Frente a {title to lowercase}, ¿qué dice la evidencia que debería hacerse?"`

### Answer Construction

| Option | Source |
|--------|--------|
| Correct | `fact.insight` (truncated to 140 chars) |
| Wrong #1 | `fact.whyNonObvious` (truncated to 120 chars) — describes the common misconception |
| Wrong #2 | Negated `fact.insight` — the inverse claim |
| Wrong #3 | Generic wrong answer pool — rotates based on `fact.rank` |

### Shuffling

Correct answer is placed at position `1 + (rank % 3)` then shuffled with Fisher-Yates style swap. This ensures the correct answer is never at position 0 but varies deterministically per fact.

### Option Notes

Each option gets a detailed explanation:

- **Correct:** Repeats the insight + source
- **Wrong #1 (whyNonObvious):** Explains this is a common belief contradicted by evidence
- **Wrong #2 (negated):** States this contradicts current evidence
- **Wrong #3 (generic):** Generic "not recommended" response

### Determinism

The entire process is deterministic (no randomness). Same fact + same seed produces identical quiz. Quiz cache (`Map<string, QuizQuestion>`) avoids regeneration.

## Output Schema

```typescript
type QuizQuestion = {
  id: string;           // quiz-{fact.id}
  question: string;     // The question text
  options: string[4];   // Shuffled options
  answerIndex: number;  // Index of correct answer (0-3)
  explanation: string;  // Full explanation with source
  optionNotes: string[4]; // Per-option explanations
};
```

## Edge Cases

- **Very long insight:** Truncated to 140 chars for option, 250 chars for explanation
- **Insight starting with "no":** Negation is not double-negated (the template checks for `fact.insight.includes("no")`)
- **Same quiz requested twice:** Returns cached version
- **Fact with very short title:** Template insertion still works — no min-length requirement

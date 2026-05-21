# SPEC: Clinical Facts Engine

**Status:** Approved  
**Date:** 2026-05-17  
**Component:** `src/lib/server/facts.ts`, `src/lib/types.ts`

## Overview

Curated dataset of 100 evidence-based obstetric facts across 8 clinical domains. Each fact drives reel generation, quiz creation, and clinical safety gates.

## Fact Schema

```typescript
type Fact = {
  id: string; // Unique kebab-case ID
  rank: number; // 1-100, display order
  title: string; // Headline (Instagram-ready)
  insight: string; // Key clinical insight (body)
  whyNonObvious: string; // Why this contradicts common belief
  audience: string; // Target professional audience
  sourceNote: string; // Citation with Cochrane/WHO/Lancet refs
  evidenceStatus: "seeded" | "needs_review" | "approved";
  riskLevel: "low" | "medium" | "high";
  tags: string[];
};
```

## Clinical Domains

| Lot | Ranks  | Topic                                       | Count |
| --- | ------ | ------------------------------------------- | ----- |
| 1   | 1-20   | Postpartum Hemorrhage (HPP)                 | 20    |
| 2   | 21-35  | Preeclampsia/Eclampsia                      | 15    |
| 3   | 36-45  | Neonatal Sepsis                             | 10    |
| 4   | 46-55  | Preterm Birth                               | 10    |
| 5   | 56-65  | Perinatal Asphyxia                          | 10    |
| 6   | 66-75  | Infections (HIV, Syphilis, Malaria)         | 10    |
| 7   | 76-85  | Maternal Nutrition                          | 10    |
| 8   | 86-100 | Diverse (Lactation, Smoking, Mental Health) | 15    |

## Safety Gates

- `evidenceStatus === "approved"` → reel is `ready_for_pipeline`
- `evidenceStatus !== "approved"` → reel is `review_required`, voice generation blocked
- `riskLevel === "high"` → `text2audio` blocked until clinical review
- Editorial checks appended to every reel brief as metadata

## Derivation

- **Quiz question:** Derived algorithmically from fact fields (`enrichQuiz.ts`)
- **Reel beats:** Structured script with hook, reframe, action, safety (`reelPlanner.ts`)
- **Image prompts:** Concatenation of visual description + camera direction + style tokens

## Maintenance

Adding a new fact:

1. Append to `facts` array (follow existing structure)
2. Set `evidenceStatus` to `seeded`
3. Assign rank within appropriate domain
4. No schema changes needed — `reelPlanner` and `enrichQuiz` are generic

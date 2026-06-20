# Educational Intelligence Sprint 8 — Teaching Method Effectiveness Intelligence · Audit (Task 1)

**Status: audit only. No code changed in this task. Intelligence only — no automatic teaching
changes, no Tutor Max / Teaching Plan / curriculum / grading / XP changes.**

## Goal

The platform can already measure whether an adaptation worked per topic (Sprint 7). It cannot yet
say WHICH teaching methods are most effective for a specific learner. This sprint ranks teaching
methods by observed learner improvement — read-only, reusing Sprint 7 output.

## Where teaching methods are stored

| Source | Field | Role |
|---|---|---|
| Teaching Plan (S5) | `TeachingPlan.recommendedMethods: TeachingMethod[]` | the methods recommended per topic |
| Tutor Teaching Context (S6) | projection of S5 plan into Tutor Max | confirms those methods were what the tutor adapted to |
| Learning Difficulty (S4) | `difficultyLevel` per topic | already folded into the S5 plan |

The `TeachingMethod` vocabulary (`src/lib/intelligence/teachingPlan.ts`) is the canonical set:
`step_by_step | worked_examples | visual_explanation | guided_practice | more_revision |
more_retesting | analogy_based | standard_instruction`.

## Where effectiveness measurements already exist

Sprint 7 (`src/lib/intelligence/adaptationEffectiveness.ts`) already produces
`AdaptationEffectiveness[]` — one entry **per topic** carrying `teachingMethods`, `improvement`
(before→after mastery delta), and an `effectiveness` level. It even already aggregates per method
inside `generateAdaptationInsights()` (computing `sampleSize` + `averageImprovement` per method).

**Key finding:** every measurement Sprint 8 needs already exists in `AdaptationEffectiveness[]`.
Sprint 8 does **no new measurement** — it re-aggregates the Sprint 7 per-topic results by method.

## How effectiveness can be aggregated safely

- For each `TeachingMethod`, collect the `improvement` values of every topic whose plan included
  that method (a topic with N methods contributes its delta to all N — the same attribution Sprint 7
  already uses for its per-method insights).
- `averageImprovement` = mean of those deltas; `topicsUsed` = count.
- `effectiveness` level reuses Sprint 7's `classifyEffectiveness()` (HIGH ≥25, MEDIUM 10–24,
  LOW 0–9, REGRESSION <0) — no new thresholds.
- **Confidence gate:** a method measured on fewer than `MIN_SAMPLE_FOR_CONFIDENCE` (2) topics is
  treated as "needs more evidence" and excluded from strongest/weakest preference lists (it still
  appears in the ranking and gets an "uncertain" insight) — preventing a single lucky/unlucky topic
  from declaring a method best or worst.

## Reuse decision (no rebuilds)

Sprint 8 is a **pure consumer** of Sprint 7's `AdaptationEffectiveness[]`. It adds: a
`MethodEffectiveness` model, `buildMethodEffectivenessProfile()` (pure aggregate + rank),
`PreferredTeachingMethods`, `MethodEffectivenessInsight`, and a thin read-only wrapper over Sprint
7's `getAdaptationEffectivenessProfile()`. No writes, no schema change, no teaching-plan mutation,
no Tutor Max coupling.

## Insertion points (for implementation)

- `src/lib/intelligence/methodEffectiveness.ts` — model + ranking + preferences + insights + wrapper.
- `GET /api/intelligence/method-effectiveness` — read-only route.
- `src/components/intelligence/MethodEffectivenessViewer.tsx` — dev-only viewer in `/dev/visual-demo`.

# Educational Intelligence Sprint 7 — Adaptation Effectiveness Engine · Audit (Task 1)

**Status: audit only. No code changed in this task. Measurement only — this sprint never alters
teaching plans, Tutor Max, curriculum, grading, or XP.**

## Goal

The platform now ADAPTS teaching (Sprints 5/6) but does not know whether those adaptations help.
This sprint measures effectiveness by joining an existing **before→after mastery** signal with the
**teaching methods** that were recommended for each topic — using only already-derived outputs.

## Source audit & what each output contributes

| Source | Output | Contribution to effectiveness measurement |
|---|---|---|
| Teaching Plan (S5) | `TeachingPlan{ difficultyLevel, recommendedMethods, … }` per topic | **which methods/difficulty** were applied to a topic |
| Tutor Teaching Context (S6) | projection of the S5 plan into Tutor Max | confirms the methods above are what the tutor actually adapted to |
| Improvement Tracking (S4-Improvement) | `analyzeImprovement()` → `ImprovementSummary` with per-topic `previousMastery`, `currentMastery`, `improvementPct`, `status` | **the before→after mastery delta** — the core measurable signal |
| Revision Intelligence (S1) | `RevisionProfile` (titles, weaknesses) | topic titles + which topics are weaknesses |
| Practice Intelligence (S2) | `PracticeTargetPlan` | context (already feeds S4/S5) |
| Retest Intelligence (S3) | `RetestCandidatePlan` | context (already feeds S4/S5) |
| Learning Difficulty (S4) | `LearningDifficultyProfile` | difficulty level (already inside the S5 plan) |
| `TopicProgress` | `masteryPct` (snapshot), `attempts`, `revisionCount` | single current snapshot — overwritten, so NOT a before/after series on its own |
| `StudentProgress` | `lastStudiedAt`, `completedLessons` | recency/context only |

## Key finding: where the before/after signal lives

`TopicProgress.masteryPct` is a **single overwritten snapshot** — it cannot supply a "before vs
after" comparison by itself (the same constraint documented for S4-Improvement). The actual
before→after series comes from **`PracticeSession`'s never-overwritten, timestamped per-attempt
scores**, which `analyzeImprovement()` already turns into `previousMastery`/`currentMastery` per
topic. Therefore Sprint 7 **reuses `analyzeImprovement()` directly** as its mastery-delta source and
joins it to the S5 `TeachingPlan` by `subjectSlug:topicSlug`.

## Measurable signals

| Signal class | How it is measured (existing data only) |
|---|---|
| **improvement** | `improvementPct = currentMastery − previousMastery > 0` (large = effective adaptation) |
| **stagnation** | `improvementPct ≈ 0` (little/no change despite an adaptation being applied) |
| **regression** | `improvementPct < 0` (mastery worsened after the adaptation) |

## Effectiveness classification (to refine in implementation)

| Effectiveness | improvementPct |
|---|---|
| HIGH | ≥ 25 |
| MEDIUM | 10 … 24 |
| LOW | 0 … 9 |
| REGRESSION | < 0 |

Mirrors the spirit of S4-Improvement's ±10 threshold while adding a HIGH tier for large gains and a
distinct REGRESSION tier for worsening.

## Per-method insights

Aggregating effectiveness across topics that share a teaching method yields method-level insights
(e.g. "worked examples appear effective", "visual explanation shows limited improvement",
"guided practice impact remains uncertain" when the sample is too small). Recommendations only — no
automatic change to any plan.

## Reuse decision (no rebuilds)

Sprint 7 is a **pure consumer** of S5 `getTeachingPlans()` + S4-Improvement `analyzeImprovement()`.
It introduces only: an `AdaptationEffectiveness` model, `evaluateTeachingEffectiveness()` (pure
join+classify), `generateAdaptationInsights()` (pure aggregation), `buildAdaptationEffectivenessProfile()`,
and a thin read-only wrapper. No mastery system, no writes, no schema change, no teaching-plan
mutation, no Tutor Max coupling.

## Insertion points (for implementation)

- `src/lib/intelligence/adaptationEffectiveness.ts` — model + detector + insights + profile builder
  + thin wrapper.
- `GET /api/intelligence/adaptation-effectiveness` — read-only route.
- `src/components/intelligence/AdaptationEffectivenessViewer.tsx` — dev-only viewer in `/dev/visual-demo`.

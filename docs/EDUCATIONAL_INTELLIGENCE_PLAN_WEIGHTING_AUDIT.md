# Educational Intelligence Sprint 9 — Personalized Teaching Plan Weighting · Audit (Task 1)

**Status: audit only. No code changed in this task. This sprint changes Teaching Plan METHOD ORDER
only — no Tutor Max, curriculum, XP, grading, assessment, or progression changes, and (per Task 9)
Sprints 1–8 code stays unchanged.**

## Goal

The platform knows which methods are most effective per learner (Sprint 8). It does not yet let that
influence the plan. This sprint adds a weighting transformation that **reorders** a Teaching Plan's
`recommendedMethods` to prefer proven-strong methods and de-emphasize proven-weak ones.

## Current method-selection flow

| Stage | Where | Output |
|---|---|---|
| Plan build (S5) | `teachingPlan.ts` `generateTeachingPlan()` | `TeachingPlan.recommendedMethods` = difficulty-tier baseline ∪ Sprint 4 adaptations (deduped, stable order) |
| Tutor context (S6) | `tutorTeachingContext.ts` | projects `recommendedMethods` **in order** into directive bullets for Tutor Max |
| Effectiveness (S7) | `adaptationEffectiveness.ts` | before→after mastery delta per topic, joined to methods |
| Method ranking (S8) | `methodEffectiveness.ts` | `PreferredTeachingMethods{ strongestMethods, weakestMethods }` + per-method levels |

**Key observation:** S6 emits the methods in the order they appear in `recommendedMethods`. So a
learner-personalized *reordering* of that array is sufficient to make Tutor Max lead with the
learner's most effective methods — without changing any S5/S6 code.

## Safest weighting insertion point

A **new additive transformation** `applyMethodWeighting(plan, preferred)` that returns a
`WeightedTeachingPlan` with `recommendedMethods` reordered. Rationale:

- **No mutation of Sprints 1–8** (Task 9 hard requirement): `teachingPlan.ts`, `tutorTeachingContext.ts`,
  `methodEffectiveness.ts` are read, never edited. The weighting lives in a brand-new file.
- **Ordering only**: it never adds or removes a method, never changes `difficultyLevel`,
  `practiceIntensity`, `revisionPriority`, or `retestPriority` — difficulty logic stays intact.
- **Safe for new learners**: if there is no effectiveness evidence, `PreferredTeachingMethods` is
  empty, all weights are neutral, and the order is unchanged (pure no-op).
- Exposed via a **read-only API + dev viewer** (`originalPlan` vs `weightedPlan`), matching the whole
  sprint series' pattern; live consumption by Tutor Max is a deliberate later step (NOT this sprint).

## How preferred methods influence the plan

- Each method gets a `weight` from its Sprint 8 effectiveness level (high 1.5, medium 1.2, low 0.8,
  regression 0.5; uncertain/unknown 1.0; falling back to strongest=1.3 / weakest=0.7 when only the
  preferred lists are available).
- `recommendedMethods` is **stable-sorted by weight descending** — strong methods move earlier, weak
  methods move later, and equal-weight (e.g. neutral) methods keep their original relative order.
- No method is dropped; the weighted set is exactly the original set, reordered.

## Reuse decision (no rebuilds)

Sprint 9 is a pure consumer of S5 `TeachingPlan` + S8 `MethodEffectivenessProfile`. New artifacts
only: `TeachingMethodWeight`, `WeightedTeachingPlan`, `applyMethodWeighting()`,
`PlanWeightingInsight`, `buildWeightedTeachingPlanProfile()`, a read-only wrapper, a read-only route,
and a dev viewer.

## Insertion points (for implementation)

- `src/lib/intelligence/methodWeighting.ts` — model + engine + insights + profile + wrapper.
- `GET /api/intelligence/weighted-teaching-plan` — read-only route.
- `src/components/intelligence/WeightedTeachingPlanViewer.tsx` — dev-only viewer in `/dev/visual-demo`.

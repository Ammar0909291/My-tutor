# Educational Intelligence Sprint 10 — Live Weighted Tutor Integration · Audit (Task 1)

**Status: audit only. No new intelligence, no new adaptation logic, no new methods, no Tutor Max
redesign. Only the data source feeding the tutor's teaching-style block changes.**

## Goal

Sprint 9 produces a `WeightedTeachingPlan` (methods reordered by proven effectiveness) but Tutor Max
still consumes the original (unweighted) `TeachingPlan`. This sprint connects the weighted plan into
the existing `TutorTeachingContext` pipeline — ordering only.

## Pipeline trace: TeachingPlan → TutorTeachingContext → System Prompt → Tutor Max

| Step | File | Detail |
|---|---|---|
| 1. Plan build (S5) | `teachingPlan.ts` `getTeachingPlans()` | returns `teachingPlan: TeachingPlan[]` (per-topic `recommendedMethods` in baseline∪adaptation order) |
| 2. Weighting (S9) | `methodWeighting.ts` `getWeightedTeachingPlanProfile()` | returns `{ originalPlan, weightedPlan: WeightedTeachingPlan[], insights }` — `weightedPlan[i].recommendedMethods` is the **reordered** method list (same set) |
| 3. Tutor context (S6) | `tutorTeachingContext.ts` `getTutorTeachingContext()` | **currently** calls `getTeachingPlans()` and `buildTutorTeachingContext(teachingPlan, subjectSlug, topicSlug)` |
| 4. Context → block (S6) | `tutorTeachingContext.ts` `buildTutorTeachingContextBlock()` | emits one directive bullet **per method, in array order** — no sorting |
| 5. Inject (S6) | `learn/chat/route.ts` | additive `try/catch` block: `systemPrompt += buildTutorTeachingContextBlock(await getTutorTeachingContext(userId, subjectCode, currentTopicSlug))` |
| 6. AI call | `learn/chat/route.ts` | `routeAI([...history, message], systemPrompt, …)` |

## Exact integration point

**`getTutorTeachingContext()` in `src/lib/intelligence/tutorTeachingContext.ts`** — change its data
source from `getTeachingPlans()` (Step 1) to Sprint 9's `getWeightedTeachingPlanProfile()` (Step 2),
passing `weightedPlan` to the unchanged pure `buildTutorTeachingContext()`.

Why this is the safest and only required change:
- `WeightedTeachingPlan extends TeachingPlan`, so the pure `buildTutorTeachingContext(plans: TeachingPlan[], …)`
  accepts `weightedPlan` with **no signature change**.
- `buildTutorTeachingContextBlock()` already emits methods **in array order with no re-sort**
  (Task 3 requirement), so the weighted ordering is preserved verbatim through to the system prompt.
- The chat route (Step 5) is **unchanged** — it already calls `getTutorTeachingContext()`.
- No new intelligence, no new directives, no new vocabulary: only which plan's `recommendedMethods`
  order is read.

## What does NOT change

`teachingPlan.ts`, `methodWeighting.ts`, `methodEffectiveness.ts`, `adaptationEffectiveness.ts`, the
pure `buildTutorTeachingContext()`/`buildTutorTeachingContextBlock()` functions, the chat route, the
Tutor Max base prompt, curriculum, grading, XP, progression. Sprint 1–9 *logic* is untouched; only
the wrapper's data source is swapped.

## Cost note

`getWeightedTeachingPlanProfile()` is heavier than `getTeachingPlans()` (it also derives effectiveness
+ method ranking, re-reading some tables). It runs inside the existing non-fatal `try/catch`, and is a
pure no-op-ordering for learners with no effectiveness evidence. A future optimization could memoize
the shared `getTeachingPlans()`/`getRevisionProfile()` reads — noted for the roadmap, not done here.

# Educational Intelligence Sprint 11 — Teaching Style Transparency · Audit (Task 1)

**Status: audit only. Visibility only — no new intelligence, no adaptation, no scoring / grading /
XP / curriculum changes, and Sprints 1–10 stay unchanged.**

## Goal

Expose and explain WHY Tutor Max is teaching in a certain style, by surfacing the intelligence that
already drives it — without changing any of it.

## Complete chain: Learning Difficulty → Teaching Plan → Weighted Teaching Plan → Tutor Context → Tutor Max

| Stage | File | Output used for transparency |
|---|---|---|
| Learning Difficulty (S4) | `learningDifficultyProfile.ts` `getLearningDifficultyProfile()` | per-topic `difficultyLevel` + `signals` (e.g. "severely weak mastery", "repeated retries", "poor retention") → the **WHY** |
| Teaching Plan (S5) | `teachingPlan.ts` `getTeachingPlans()` | per-topic `recommendedMethods`, `practiceIntensity`, `revisionPriority`, `retestPriority` |
| Weighted Teaching Plan (S9) | `methodWeighting.ts` `getWeightedTeachingPlanProfile()` | `weightedPlan[].recommendedMethods` = methods reordered by proven effectiveness → the **active method ordering** |
| Tutor Context (S6, now weighted via S10) | `tutorTeachingContext.ts` `getTutorTeachingContext()` | projects the weighted plan into the system-prompt directives Tutor Max actually receives |
| Tutor Max (S6/S10) | `learn/chat/route.ts` | appends the directive block to `systemPrompt` → `routeAI()` |

## What transparency needs (all already exists)

- **Active style** = the weighted plan for a topic: `difficultyLevel`, `recommendedMethods` (weighted
  order → "activeMethods"), `practiceIntensity`, `revisionPriority`, `retestPriority`. This is exactly
  what S10 made Tutor Max consume.
- **The "why"** = the S4 `LearningDifficultyEntry.signals` for that topic.

So Sprint 11 reads `getWeightedTeachingPlanProfile()` (active style) + `getLearningDifficultyProfile()`
(signals) and renders a model + a plain-English explanation. No new computation.

## Representative-topic choice

Outside a live lesson there is no single "current topic", so the transparency layer reports the
learner's **most relevant struggling topic** — the first entry of the S4 profile, which is already
sorted hardest-first (HIGH → MEDIUM → LOW, then lowest mastery). If the learner has no started topics,
the style is "standard instruction" and the explanation says so.

## Reuse decision (no rebuilds)

Pure consumer of S4 + S9. New artifacts only: `ActiveTeachingStyle` model,
`buildActiveTeachingStyle()` (pure projection), `explainTeachingStyle()` (pure text), a read-only
wrapper, a read-only route, and a dev viewer. No writes, no schema change, nothing in Sprints 1–10
modified.

## Insertion points (for implementation)

- `src/lib/intelligence/activeTeachingStyle.ts` — model + projection + explanation + wrapper.
- `GET /api/intelligence/active-teaching-style` — read-only route.
- `src/components/intelligence/TeachingStyleViewer.tsx` — dev-only viewer in `/dev/visual-demo`.

# Educational Intelligence Sprint 5 — Adaptive Teaching Plan Engine · Audit (Task 1)

**Status: audit only. No code changed in this task. This sprint decides HOW a learner SHOULD be
taught — it does NOT change Tutor Max, prompts, curriculum, grading, or XP, and the plan is
consumed nowhere yet.**

## Goal of the audit

Determine which already-derived intelligence outputs can drive per-topic teaching-strategy
decisions, so a read-only `TeachingPlan` layer can synthesize them into one coherent plan per
struggling topic without inventing new analysis or new persistence.

## Source inventory & what each output contributes to a teaching plan

| Source (sprint) | Output | What it drives in a TeachingPlan |
|---|---|---|
| Revision Intelligence (S1) | `RevisionProfile.weaknesses` (mastery), `recommendedRevisionTopics`, `visualWeaknesses` | base weakness signal + **revisionPriority** seed + visual flag |
| Practice Intelligence (S2) | `PracticeTargetPlan` (high/medium/low bands, attempt-escalation) | **practiceIntensity** (the band a topic sits in) |
| Retest Intelligence (S3) | `RetestCandidatePlan` (high/medium/low) | **retestPriority** (the band a topic sits in) |
| Learning Difficulty Intelligence (S4) | `LearningDifficultyProfile.entries[].difficultyLevel` + `signals` | **difficultyLevel** (drives method selection) |
| Learning Difficulty Intelligence (S4) | `generateTeachingAdaptations()` → `TeachingAdaptationRecommendation[]` | the **recommendedMethods** vocabulary (already maps signals→adaptations) |
| Visual Guidance (`visualGuidance.ts`) | guidance hints per visual weakness | reinforces **visual_explanation** method when visual weakness present |
| Visual Recommendations (`visualMasteryRecommendations.ts`) | recommended visual activities | same — visual method reinforcement |

## Signal → teaching-strategy mapping

A `TeachingPlan` is a per-topic synthesis. Every field is a direct read of an existing output —
nothing is recomputed:

| TeachingPlan field | Derived from |
|---|---|
| `topic` / `subjectSlug` / `topicSlug` | S4 `LearningDifficultyEntry` |
| `difficultyLevel` | S4 `entry.difficultyLevel` (verbatim) |
| `recommendedMethods` | S4 `generateTeachingAdaptations()` adaptations, normalized to a stable method vocabulary, plus a difficulty-tier baseline (HIGH→step_by_step+worked_examples+visual_explanation; MEDIUM→worked_examples+guided_practice; LOW→standard_instruction) |
| `practiceIntensity` | the S2 `PracticeTargetPlan` band the topic sits in (high/medium/low) |
| `revisionPriority` | high if topic is in S1 `recommendedRevisionTopics`, else mirrors difficulty tier |
| `retestPriority` | the S3 `RetestCandidatePlan` band the topic sits in (high/medium/low/none) |

## Reuse decision (no rebuilds)

The Teaching Plan layer is a **pure consumer** of S1–S4 outputs — the same consumer relationship
S2/S3/S4 already have to earlier sprints. It introduces:
- a `TeachingMethod` vocabulary (stable string union) normalizing the S4 adaptation phrases,
- `generateTeachingPlan()` (pure) that joins the S4 profile, S4 adaptations, S2 practice plan, and
  S3 retest plan per topic,
- a thin Prisma-reading wrapper that calls the existing S1/S2/S3/S4 wrappers (no new DB read of its
  own — it reuses `getLearningDifficultyProfile()` plus the already-derived practice/retest plans).

No mastery system, no grading thresholds, no writes, no Tutor Max coupling. The plan is produced
and exposed read-only; **nothing consumes it** this sprint.

## Insertion points (for implementation tasks)

- `src/lib/intelligence/teachingPlan.ts` — `TeachingMethod`, `TeachingPlan`, `generateTeachingPlan()`
  (pure) + `getTeachingPlans()` (thin wrapper).
- `GET /api/intelligence/teaching-plan` — read-only route (mirrors `learning-difficulty`).
- `src/components/intelligence/TeachingPlanViewer.tsx` — dev-only viewer.

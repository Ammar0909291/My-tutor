# Educational Intelligence Sprint 5 — Adaptive Teaching Plan Engine · Report

A new **read-only** layer that decides HOW a learner should be taught per topic, by synthesizing
the already-derived outputs of Sprints 1–4 into a coherent `TeachingPlan`. It does **not** change
Tutor Max, prompts, curriculum, grading, or XP, and **nothing consumes the plan** this sprint.

## Audit findings (Task 1 → `docs/EDUCATIONAL_INTELLIGENCE_TEACHING_PLAN_AUDIT.md`)

Every `TeachingPlan` field is a direct read of an existing output — nothing is recomputed:

| TeachingPlan field | Derived from |
|---|---|
| `difficultyLevel` | Sprint 4 `LearningDifficultyEntry.difficultyLevel` (verbatim) |
| `recommendedMethods` | Sprint 4 `generateTeachingAdaptations()` (normalized to a method vocabulary) + a difficulty-tier baseline |
| `practiceIntensity` | the Sprint 2 `PracticeTargetPlan` band the topic sits in |
| `revisionPriority` | high if topic is in Sprint 1 `recommendedRevisionTopics`, else the difficulty tier |
| `retestPriority` | the Sprint 3 `RetestCandidatePlan` band the topic sits in (or `none`) |

Visual Guidance / Visual Recommendations reinforce the `visual_explanation` method (already routed
in via Sprint 4's visual-weakness-driven adaptations). No new analysis was introduced.

## Method vocabulary & tier baselines

`TeachingMethod` = `step_by_step | worked_examples | visual_explanation | guided_practice |
more_revision | more_retesting | analogy_based | standard_instruction`.

Difficulty-tier baseline (the brief's examples):
- HIGH → `step_by_step`, `worked_examples`, `visual_explanation`
- MEDIUM → `worked_examples`, `guided_practice`
- LOW → `standard_instruction`

`recommendedMethods` = baseline ∪ normalized Sprint 4 adaptations (deduped, stable order).

## Files changed

**New**
- `docs/EDUCATIONAL_INTELLIGENCE_TEACHING_PLAN_AUDIT.md` — Task 1 audit.
- `src/lib/intelligence/teachingPlan.ts` — `TeachingMethod`/`TeachingPlan` types,
  `generateTeachingPlan()` (pure, Task 3), and the thin wrapper `getTeachingPlans()`. Read-only.
- `src/app/api/intelligence/teaching-plan/route.ts` — `GET` only, returns
  `{ profile, difficulties, recommendations, teachingPlan }` (Task 4). No writes.
- `src/components/intelligence/TeachingPlanViewer.tsx` — dev-only viewer (Task 5).

**Modified**
- `src/app/dev/visual-demo/VisualDemo.tsx` — adds the dev-only “Educational Intelligence Sprint 5
  — Adaptive Teaching Plan Engine” section.

**Reused unmodified:** `revisionProfile.ts` (S1), `practiceTargets.ts` (S2), `retestCandidates.ts`
(S3), `learningDifficultyProfile.ts` + `teachingAdaptations.ts` (S4). No existing logic changed.

## Generated teaching plans / demonstration results (Task 7)

Ran three in-memory learners through the **real** pure functions (S1→S4 builders →
`generateTeachingPlan`):

```
HIGH  hard_topic:   difficulty=high
      recommendedMethods=[step_by_step, worked_examples, visual_explanation, guided_practice,
                          more_revision, more_retesting, analogy_based]
      practiceIntensity=high  revisionPriority=high  retestPriority=high
MEDIUM medium_topic: difficulty=medium
      recommendedMethods=[worked_examples, guided_practice, step_by_step, more_retesting,
                          visual_explanation, analogy_based]
      practiceIntensity=medium revisionPriority=medium retestPriority=medium
LOW   easy_topic:    difficulty=low
      recommendedMethods=[standard_instruction]
      practiceIntensity=low   revisionPriority=low   retestPriority=none
```

Educational sense-check:
- **High** difficulty → heavy scaffolding (step-by-step, worked examples, visual + analogy) with
  high practice/revision/retest — correct for a severely-struggling topic, and `revisionPriority`
  is high because it’s in the Sprint 1 recommended-revision list.
- **Medium** → worked examples + guided practice with medium intensity — correct for a partial gap.
- **Low** → standard instruction, no retest — correct for a topic the learner has under control.

The demonstration used a **temporary script deleted immediately after running** and seeded **no
database rows** (pure functions; no live DB here), so there is no demo data to clean up.

## Validation results (Task 8)

```
npx prisma generate                       (required first — stale client otherwise)
npx tsc --noEmit -p tsconfig.json   → 0 errors
npm run build                       → exit 0; /api/intelligence/teaching-plan compiled
```

Confirmed untouched: Tutor Max prompts/behavior, curriculum, grading, assessment scoring, XP, and
Sprints 1–4 logic. The teaching plan is exposed read-only and consumed nowhere.

## Universal Learning review (Task 6 — architecture, review only)

| Domain | Applicability | Notes |
|---|---|---|
| CBSE | High | Tier baselines + practice/revision/retest priorities map cleanly onto chapter topics. |
| UP Board | High | Same model; board is a namespace on `subjectCode`. |
| Programming | High | `guided_practice` + `worked_examples` are strong fits; `visual_explanation` optional. |
| Finance | High | Methods are domain-neutral; visual method simply used less. |
| Engineering | High | `step_by_step` + `worked_examples` baseline suits derivation-heavy topics. |
| Medicine | Medium-High | Works well; would benefit from a future spaced-retention weighting of `revisionPriority`. |

The generator is fully domain-agnostic: it consumes generic Sprint 1–4 outputs and emits a stable
method vocabulary with no subject-specific branching. No implementation changes recommended for
cross-domain use beyond optional per-domain method weighting in a future sprint.

## Roadmap recommendations

1. **Sprint 6 (out of scope here):** actually *consume* the `TeachingPlan` — e.g. surface
   `recommendedMethods` to Tutor Max as context (a deliberate, separately-authorized step, since it
   touches prompts). The plan is intentionally inert today.
2. Per-domain method weighting (retention-weighted for Medicine, practice-weighted for Programming).
3. Persist a topic↔visualType link so `visual_explanation` is recommended per-topic rather than
   cross-cutting.
4. Add a confidence/intensity scalar per method once a per-topic timestamped history is available.

**STOP AFTER REPORT** — no Sprint 6, no Tutor Max changes, the teaching plan is consumed nowhere.
This sprint only creates the adaptive teaching plan layer.

# Educational Intelligence Sprint 9 — Personalized Teaching Plan Weighting · Report

## Summary / bottom line

A read-only transformation that **reorders** a Teaching Plan's `recommendedMethods` to lead with the
methods proven effective for the learner (Sprint 8) and push weak ones later — **ordering only, no
methods added or removed, difficulty/priority logic untouched**. Implemented as a brand-new layer
(`applyMethodWeighting`) plus a read-only API + dev viewer; **Sprints 1–8 code is unchanged** (Task 9
requirement — verified by git diff), so Tutor Max, curriculum, XP, grading, assessments, and
progression are all untouched. Live consumption by Tutor Max is a deliberate later step, not this
sprint. Demonstration confirmed the exact expected reordering with no method loss. `tsc` 0 errors,
build exit 0.

## Audit findings (Task 1 → `docs/EDUCATIONAL_INTELLIGENCE_PLAN_WEIGHTING_AUDIT.md`)

- **Current flow:** S5 `generateTeachingPlan()` builds `recommendedMethods` (tier baseline ∪ S4
  adaptations); S6 projects them **in order** into Tutor Max directives; S7 measures effectiveness;
  S8 ranks methods into `PreferredTeachingMethods`.
- **Key observation:** S6 emits methods in array order, so a learner-personalized *reordering* of
  `recommendedMethods` is sufficient to make the tutor lead with effective methods — without changing
  any S5/S6 code.
- **Safest insertion point:** a new additive `applyMethodWeighting(plan, preferred)` transformation
  (new file). It never mutates Sprints 1–8 (Task 9 hard requirement), never adds/removes methods,
  never changes difficulty/priorities, and is a pure no-op for learners with no effectiveness
  evidence (empty preferred lists ⇒ neutral weights ⇒ unchanged order).

## Weighting model

| Effectiveness | weight | Effect on order |
|---|---|---|
| high | 1.5 | moves earlier |
| medium | 1.2 | moves earlier |
| (neutral / uncertain / unknown) | 1.0 | keeps original relative position |
| low | 0.8 | moves later |
| regression | 0.5 | moves later |

(Falls back to strongest = 1.3 / weakest = 0.7 when only the preferred lists are available.)
`recommendedMethods` is **stable-sorted by weight descending**, so equal-weight methods never churn.

## Files changed

**New**
- `docs/EDUCATIONAL_INTELLIGENCE_PLAN_WEIGHTING_AUDIT.md` — Task 1 audit.
- `src/lib/intelligence/methodWeighting.ts` — `TeachingMethodWeight` (Task 2), `applyMethodWeighting()`
  + `WeightedTeachingPlan` (Tasks 3/4), `PlanWeightingInsight` + `generatePlanWeightingInsights()`
  (Task 5), `buildWeightedTeachingPlanProfile()` (pure), and the read-only wrapper
  `getWeightedTeachingPlanProfile()`.
- `src/app/api/intelligence/weighted-teaching-plan/route.ts` — `GET` only, returns
  `{ originalPlan, weightedPlan, insights }` (Task 6). No writes.
- `src/components/intelligence/WeightedTeachingPlanViewer.tsx` — dev-only viewer (Task 7).

**Modified**
- `src/app/dev/visual-demo/VisualDemo.tsx` — adds the dev-only Sprint 9 section.

**Reused unmodified (verified by git diff):** `teachingPlan.ts` (S5), `tutorTeachingContext.ts` (S6),
`methodEffectiveness.ts` (S8), `adaptationEffectiveness.ts` (S7), the chat route, and the whole
S1–S4 chain. Nothing in Sprints 1–8 changed.

## Demonstration results (Task 8)

Learner: worked_examples strong, step_by_step strong, visual_explanation neutral/weak, guided_practice
weak (regression). Ran a plan through the **real** `applyMethodWeighting()`:

```
before: guided_practice → visual_explanation → worked_examples → step_by_step
after:  worked_examples → step_by_step → visual_explanation → guided_practice
no methods removed/added: true
difficulty intact:        true   (difficultyLevel + practiceIntensity unchanged)
strong-first:             true   (worked_examples, step_by_step lead)
weak-last:                true   (guided_practice last)
insights:
  • Worked examples prioritized due to strong effectiveness.
  • Step-by-step instruction prioritized due to strong effectiveness.
  • Visual explanation deprioritized due to weak effectiveness.
  • Guided practice deprioritized due to negative effectiveness.
```

Teaching Plan ordering changed appropriately; the method set is identical before/after (no removals).
The demonstration used a temporary script deleted immediately after running; no DB rows were seeded.

## Validation results (Task 9)

```
npx prisma generate                 → ok
npx tsc --noEmit -p tsconfig.json   → 0 errors
npm run build                       → exit 0; /api/intelligence/weighted-teaching-plan compiled
git diff teachingPlan.ts tutorTeachingContext.ts learn/chat/route.ts → (no changes)
```

Confirmed unchanged: Tutor Max (no prompt/route change), curriculum, XP, grading, and Sprints 1–8
(verified by git diff). The weighting is a new read-only layer; it does not alter the plan that the
live tutor pipeline currently uses.

## Educational review (Task 10 — architecture suitability, review only)

| Domain | Suitability | Notes |
|---|---|---|
| CBSE | High | Leading with a learner's proven methods is directly beneficial for exam topics. |
| UP Board | High | Same model; board is a `subjectCode` namespace. |
| Programming | High | Reordering toward effective methods (e.g. guided practice vs worked examples) is high-impact for coding. |
| Finance | High | Domain-neutral reordering; needs only the S8 evidence. |
| Engineering | High | Prioritizing worked examples / step-by-step where they have proven effective fits derivation-heavy work. |
| Medicine | Medium-High | Works; benefits from retention-weighted effectiveness upstream (future). |
| Universal Learning | High | Fully domain-agnostic — pure reordering of a generic method list, no subject-specific branching. |

No implementation changes recommended for cross-domain use; reordering is inherently portable.

## Future roadmap

1. **Sprint 10 (out of scope):** actually feed `weightedPlan` into the live Sprint 6 tutor context so
   the tutor leads with the learner's effective methods. Deliberately NOT done here — Task 9 requires
   Sprints 1–8 unchanged, so live wiring is a separate, authorized step.
2. Add a confidence floor so weighting only reorders once evidence is sufficient (avoids early churn).
3. Blend cohort-level effectiveness for cold-start learners before personal evidence accumulates.
4. Expose a per-plan weighting trace (which weight moved which method) for QA/explainability.

**STOP AFTER REPORT** — no Sprint 10, no Tutor Max changes. This sprint only lets Teaching Plans
prefer methods that have already proven effective for the learner.

# Execution Planner

The final orchestration layer. Converts a `TeachingPlan` into an
`ExecutionPlan`: **which existing subsystem runs, in what order, with what
inputs, and what happens when one is unavailable.**

```
Conversation Understanding
  ↓
Concept Understanding        (src/lib/teaching/concept/)
  ↓
Teaching Planner             (src/lib/teaching/planner/)
  ↓  TeachingPlan
Execution Planner            ← this module
  ↓  ExecutionPlan
Existing teaching systems
```

It never teaches, renders, explains, or visualizes. It only schedules.

## Layer separation

The Teaching Planner reasons about **pedagogy** ("this turn needs an
explanation and a visual"). The Execution Planner reasons about **execution**
("call the Explanation Engine, then the VIE, then ADR 12; if ADR 12 is down,
drop the visual and keep teaching").

`STEP_FROM_PLANNER` is the total, explicit mapping between the two step
vocabularies. It is a `Record<PlannerStep, ExecutionStepKind>`, so adding a
planner step **breaks the build here** rather than silently falling through.
Execution adds three kinds the planner has no reason to know about:
`UNDERSTAND`, `ASK_DISAMBIGUATION`, `WAIT_FOR_STUDENT`.

## Decision order

1. **Ambiguity outranks everything.** If Concept Understanding reported
   competing readings, no teaching step runs — the plan is
   `ASK_DISAMBIGUATION → WAIT_FOR_STUDENT`, and the original request is
   preserved in `deferredSteps` so nothing is lost by asking.
2. Map the planner's pedagogical sequence to executable steps.
3. Prepend `UNDERSTAND` when no concept resolved.
4. Drop steps whose subsystems are unavailable, per each step's failure policy.
5. Append `WAIT_FOR_STUDENT` after `ASSESS` — a question requires an answer.

## Subsystems

Only systems that already exist: Conversation Understanding, Concept
Understanding, Teaching Planner, Explanation Engine, VIE, ADR 12, Assessment
Engine, Lesson Engine. **No new runtime engine is introduced.**

`VISUALIZE` carries a subsystem *chain* — `[VIE, ADR12_VISUAL_PRODUCTION]` —
because that is genuinely two calls: the VIE produces a `VisualIntent`, ADR 12
produces the visual from it. A step runs only if **every** subsystem in its
chain is available.

## Failure handling — teaching never terminates

`FailurePolicy` has no aborting member. There is deliberately no "halt the
turn" value, so non-termination is **structural, not a convention** (and is
asserted in the tests).

| Situation | Policy | Result |
|---|---|---|
| Visualization unavailable | `SUBSTITUTE_EXPLANATION` | visual dropped, explanation still carries the turn |
| Assessment unavailable | `SKIP_AND_CONTINUE` | probe skipped, teaching proceeds |
| Concept ambiguous | `REQUEST_CLARIFICATION` | ask, wait, re-plan |
| Waiting on the student | `NOT_APPLICABLE` | nothing to fail |

With *everything* down the plan degrades to `NO_OP` with an empty step list —
it never throws.

## Determinism

`executionId` is an **FNV-1a content hash** of mode + concept + step kinds —
no randomness, no clock. Two identical plans provably share an id, which is
what keeps the planner pure. Availability degradation is applied from explicit
evidence only: an omitted subsystem is assumed available, never guessed at.

## Status

Built, tested (27 tests), **not wired into the runtime**, per scope.

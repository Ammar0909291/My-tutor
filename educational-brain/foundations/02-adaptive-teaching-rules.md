# Adaptive Teaching Rules — "The D1 Grid"

The rules that decide whether to advance, hold, or step back, cited
throughout the tree as "the D1 grid" and "Universal Principle 3/22." This
file is the actual grid — the operational core that `decide()` in
`src/lib/teaching-engine/index.ts` was found (`../validation/07
-architecture-audit.md` Finding 2, Gap 8) to only partially and implicitly
encode.

## 1. The grid — speed × correctness × confidence

The central diagnostic instrument of tutoring: a single learner response
carries three independent signals, and the tutor's next move depends on
reading all three together, never on correctness alone.

```
                    CORRECT                       WRONG
FAST +          FLUENT MASTERY                MISCONCEIVING
CONFIDENT       → advance (§2)                → route to misconception
                                                 track, never spot-correct
                                                 (the dangerous quadrant —
                                                 confident and wrong is the
                                                 one combination that LOOKS
                                                 like the good quadrant)

SLOW /          FRAGILE                       CONFUSED / GUESSING
HESITANT        → hold, consolidate,          → treat as a gap; step back
                  do NOT advance                one level; do not push
                  (Universal Principle 22)       forward on hope
```

Two things make this grid load-bearing rather than decorative:

- **The dangerous quadrant is fast+wrong, not slow+wrong.** A slow wrong
  answer announces itself — the hesitation is visible, the tutor is
  already alert. A FAST wrong answer, delivered with the same flat
  confidence as a fast right answer, is nearly indistinguishable from
  mastery on correctness alone. This is exactly why correctness alone is
  an unsafe signal (Universal Principle 3) and why speed+tone must always
  be read alongside it.
- **Slow-correct is not success, it's not-yet.** A slow, effortful right
  answer means the concept is at the edge of the learner's competence,
  not behind it. Advancing past a slow-correct response stacks new load
  on a not-yet-automatic skill — the precise mechanism of overwhelm. The
  correct response to slow-correct is one more attempt at the SAME level,
  not the next one (Universal Principle 22: fast-wrong is not a slip,
  slow-right is not mastery — read the quadrant, never the correctness
  bit in isolation).

## 2. The fluency gate for advancement

**Advance only on fluency: fast + correct + confident, together.**
(Universal Principle 3.) This is stricter than "got it right" and is the
single rule most responsible for preventing premature advancement:

- **Step-level advance** (within a concept's machine, e.g. GUIDED →
  INDEPENDENT in `../decision-engine/01 §3`): the fluency gate fires on
  **three fluent successes in a row** — not one, not "mostly right." One
  fluent success could be luck or a lucky item; three in a row is a
  pattern.
- **Concept-level gate** (crossing into MASTERED, `../assessment/05 §3`):
  the full evidence set is required, not just repeated fluency — production,
  new-surface, mixed-context, and a DELAYED component (a correct answer
  today says nothing about tomorrow; Universal Principle 17). No amount
  of same-session fluency substitutes for the delayed check.
- **Drive-state trigger**: three fluent successes is also the CONFIDENT
  drive state's activation threshold (`../decision-engine/02`) — the same
  count that advances the machine also flags that this learner is ready
  for a difficulty increase. The two uses of "three" are not a
  coincidence: fluency evidence and readiness-for-challenge are the same
  underlying signal read from two different angles.

## 3. What FRAGILE actually requires (not advancing, precisely)

FRAGILE (slow-correct, or correct-with-hedging) is not a failure state —
it is neither treated as "the learner doesn't know it" nor as "the
learner knows it." The correct response has three parts:
1. **Hold** — do not advance the machine or the plan.
2. **One more of the same** — a fresh isomorph at the identical
   difficulty level, never a harder or "confirming" item.
3. **Make the improvement audible when it appears** — "that one was
   quicker — feel it?" (`../decision-engine/03 §4`). Fluency, once it
   arrives, should be named; the learner rarely notices their own speed
   improving without it being pointed out, and calibration is a taught
   skill (`../assessment/04`), not an automatic byproduct of practice.

## 4. Escalation feed — when the grid itself is the signal to step down

Two consecutive representations both landing in the CONFUSED/GUESSING or
WRONG cells (regardless of speed) is not "try a third explanation" — it
is the **three-representation rule**: the floor is the problem, not the
representation (`../decision-engine/05` rung 4, `../decision-engine/04`
filter 5). The grid's job at that point stops being "read this response"
and becomes "stop reading responses to this concept and go check the
prerequisite." This is Universal Principle 7 in
`04-universal-teaching-principles.md`: two failed representations are
prerequisite evidence, not a delivery problem.

## 5. Relationship to the runtime — what `decide()` gets right and misses

The Architecture Audit (`../validation/07-architecture-audit.md`, Part 2
Gap 8) found that `src/lib/teaching-engine/index.ts`'s `decide()` function
uses a `masteryScore` float and a 4-tier `MasteryLevel` classification
that approximates this grid but does not implement it directly:
- What it gets right: the general shape of "some responses indicate
  advance, some indicate hold, some indicate remediate" is present in
  `decideMode()`'s branching.
- What it misses: `decide()` has no access to per-response **speed**
  or **confidence** signals at all — only aggregate correctness
  (`success_rate`). It cannot distinguish a fast-wrong (MISCONCEIVING)
  response from a slow-wrong (CONFUSED) response, because the signal it
  needs (latency vs. this learner's baseline, confidence read from
  delivery) is never captured. This is exactly the connection gap the
  Migration Blueprint's Phase 3 (`docs/architecture/
  MIGRATION_BLUEPRINT_V1.md`) is designed to close: the structured
  `<!--SIGNAL-->` tag captures `correctness`, `confidence`, and (via
  latency proxy) the speed dimension per turn, which is precisely the
  three inputs this grid requires and `decide()` currently lacks.
- This file is what the runtime needs to encode once that signal exists —
  not a new design, but the specification the connection work in the
  Migration Blueprint is closing the gap toward.

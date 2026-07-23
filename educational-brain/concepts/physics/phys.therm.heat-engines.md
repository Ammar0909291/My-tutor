# Heat Engines and Efficiency — `phys.therm.heat-engines`

## Identity

- **Concept ID**: `phys.therm.heat-engines` (canonical physics KG)
- **Curriculum location**: physics / thermodynamics — dependency level 9.
- **Prerequisites**: `phys.therm.thermodynamic-processes` — heat-engine
  efficiency analysis directly applies the already-secure first-law
  energy accounting across a complete thermodynamic cycle.
- **Unlocks** (from KG): `phys.therm.carnot-cycle` — a genuine hub
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly compute engine efficiency as
η=W_out/Q_H=1-Q_C/Q_H, and correctly explain the common computational
error of writing η=1-Q_C (forgetting to divide Q_C by Q_H) — verifying
both formulas independently must give the identical answer;
(2) correctly explain that 100% efficiency (Q_C=0) is fundamentally
IMPOSSIBLE for any CYCLIC heat engine — a cyclic engine must return its
working fluid to its initial state each cycle, and rejecting zero heat
would mean the working fluid's temperature keeps rising indefinitely,
breaking the cyclic requirement (a direct consequence of the second
law).

## Core Understanding

Heat engine efficiency, η=W_out/Q_H=1-Q_C/Q_H (W_out=useful work
output, Q_H=heat absorbed from the hot reservoir, Q_C=heat rejected to
the cold reservoir), requires correctly DIVIDING Q_C by Q_H when using
the second form — a frequent computational error writes η=1-Q_C directly
(forgetting the division), producing a nonsensical result whenever Q_C
and Q_H aren't already normalized; the two formulas (W_out/Q_H and
1-Q_C/Q_H) must always agree exactly when computed correctly, providing
a built-in self-check. A more fundamental, conceptual point: 100%
efficiency (η=1, meaning Q_C=0, ALL absorbed heat converted to work with
NONE rejected) is genuinely IMPOSSIBLE for any engine that operates in a
CYCLE (returning to its starting thermodynamic state repeatedly, as any
practical engine must) — if Q_C were truly zero, the working fluid would
have no way to release the energy needed to return to its initial state
each cycle, meaning its temperature would keep rising indefinitely cycle
after cycle, breaking the fundamental cyclic requirement; this
impossibility is not merely a practical engineering limitation
(friction, imperfect materials) but a DIRECT consequence of the second
law of thermodynamics itself — every cyclic heat engine must reject some
nonzero heat to its cold reservoir.

## Mental Models

**Beginner**: "Efficiency is η=1-Q_C, just subtract the rejected heat
from 1; a perfectly frictionless, ideal engine could theoretically reach
100% efficiency." Upgrade trigger: computing efficiency both ways
(W_out/Q_H and 1-Q_C/Q_H) for specific numbers, finding the
non-normalized subtraction gives a wrong answer, directly confronts the
missing-division error; reasoning through what happens to the working
fluid if Q_C=0 (temperature rising forever, breaking the cycle) directly
confronts the 100%-efficiency assumption.

**Intermediate**: "η=W_out/Q_H=1-Q_C/Q_H, always normalized by Q_H; 100%
efficiency is fundamentally impossible for ANY cyclic engine, not just a
practical limitation." This model correctly captures both core results,
but sometimes still writes the subtraction form without the division out
of habit under time pressure.

**Advanced**: "Whenever computing efficiency via 1-Q_C/Q_H, immediately
verify against the direct W_out/Q_H computation as a self-check; treat
Q_C=0 as a red flag indicating an impossible (non-cyclic) scenario, not
an idealized-but-approachable limit."

**Expert**: the Carnot efficiency limit (η_Carnot=1-T_C/T_H) as the
theoretical maximum for any engine operating between two temperatures,
itself strictly less than 1 for any finite T_C>0 — a natural
consolidation directly connecting to the KG unlock
`phys.therm.carnot-cycle`, not required for mastery.

## Why Students Fail

The dominant failure is a computational slip — writing η=1-Q_C instead
of η=1-Q_C/Q_H, forgetting the normalization by Q_H; a second, distinct
conceptual failure is believing 100% efficiency is achievable in
principle (with a perfect, frictionless engine), not recognizing the
second-law-based impossibility for any genuinely cyclic engine.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.therm.heat-engines.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE**: writing η=1-Q_C (forgetting
  to divide by Q_H), or computing Q_C/Q_H incorrectly. **Birth type**:
  notation-induced (Type 4) — the formula's surface resemblance to
  "1 minus the waste" invites a literal subtraction, obscuring the
  necessary normalization by Q_H that makes the two forms
  (W_out/Q_H and 1-Q_C/Q_H) actually equivalent. Probe: "An engine
  absorbs Q_H=2000 J and rejects Q_C=1200 J. Compute efficiency two ways:
  W_out/Q_H, and 1 minus Q_C/Q_H. Do they agree?"
- **MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE**: believing a perfectly
  frictionless engine could convert all heat to work, reaching 100%
  efficiency. **Birth type**: overgeneralization (Type 1) — "removing
  all practical imperfections (friction, heat loss) should approach a
  perfect result" is a reasonable-sounding engineering intuition,
  incorrectly extended past the second law's fundamental (not merely
  practical) constraint on cyclic engines. Probe: "If an engine rejected
  ZERO heat to its cold reservoir (Q_C=0), what would happen to its
  working fluid's temperature over repeated cycles?"

## Analogies

**Best**: a delivery truck that must return empty to its starting
depot before each new run — even a "perfect" truck (no fuel wasted, no
friction) still can't skip the return trip, since arriving back at the
SAME starting condition each cycle is a structural requirement, not an
efficiency issue — directly targets
MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE by giving a concrete image of a
cyclic-return requirement independent of "perfection."

**Anti-analogy**: do NOT say "efficiency is 1 minus the wasted heat" as
an unqualified shorthand — omitting the Q_H normalization directly
invites MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE.

## Demonstrations

Worked-example: compute efficiency both ways (W_out/Q_H=800/2000=0.40
and 1-Q_C/Q_H=1-1200/2000=0.40) for the Blueprint's specific numbers,
verifying agreement — directly targets
MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE. Conceptual: trace what happens to
a working fluid across repeated cycles if Q_C=0 (temperature rising
indefinitely, the cycle breaking) — directly targets
MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE.

## Discovery Questions

Discovery-style: "if an engine's cold-reservoir heat rejection were
exactly zero, could it still return to its starting state at the end of
each cycle?" — learner traces the temperature consequence, directly
confronting MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE is addressed first (establishing
the correctly-normalized efficiency formula), before
MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE, since a learner fluent in
correctly computing efficiency is then equipped to reason clearly about
its fundamental upper limit.

## Tutor Actions

WORKED-EXAMPLE (efficiency computed both ways, verifying agreement);
THOUGHT-EXPERIMENT (working fluid's fate across cycles if Q_C=0);
ERROR-ANALYSIS (a solution using the un-normalized η=1-Q_C form).

## Voice Teaching Notes

Listen for efficiency computed without dividing Q_C by Q_H, or a belief
that 100% efficiency is achievable with a "perfect" engine — the two
direct misconception tells. Load-bearing sentence: "always divide the
rejected heat by the absorbed heat — and no cyclic engine can ever reject
zero heat, that's not a practical limit, it's fundamental." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner computing η=1-Q_C (no division) signals
MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE (MISCONCEIVING, full repair via the
dual-formula verification). A learner claiming 100% efficiency is
achievable in principle signals
MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE (full repair via the
working-fluid-cycle thought experiment). Mastery trigger: correctly
computing efficiency via both equivalent formulas, AND correctly
explaining why Q_C=0 is fundamentally impossible for a cyclic engine.
Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — compute
W_out/Q_H directly using the given numbers. Does that match what you got
from 1-Q_C/Q_H?" (isolating the self-check before debugging the
formula). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (fundamental, not just practical, efficiency limit) bound to
procedure (η=W_out/Q_H=1-Q_C/Q_H dual-formula calculation). Interleave
with `phys.therm.thermodynamic-processes` and, once authored,
`phys.therm.carnot-cycle` (the direct KG unlock, giving the exact
theoretical maximum efficiency).

## Transfer Connections

Near: any heat-engine efficiency calculation, including car engines and
power plants. Far: mechanical/energy engineering (real-world power plant
efficiency always falling short of the Carnot limit, itself always below
100%) and refrigeration engineering (heat pumps as heat engines run in
reverse, with analogous fundamental limits). Real-world: understanding
why even a "perfect," frictionless car engine could never reach 100%
efficiency — waste heat is fundamental, not just a design flaw. Expert:
the Carnot efficiency limit η=1-T_C/T_H as the theoretical maximum for
any engine between two temperatures.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 9): initial authoring.

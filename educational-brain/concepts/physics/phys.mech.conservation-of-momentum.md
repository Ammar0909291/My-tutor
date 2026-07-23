# Conservation of Linear Momentum — `phys.mech.conservation-of-momentum`

## Identity

- **Concept ID**: `phys.mech.conservation-of-momentum` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 8.
- **Prerequisites**: `phys.mech.impulse` — momentum conservation follows
  directly from Newton's third law applied to impulse: internal forces
  between colliding objects are equal/opposite, so their impulses (and
  hence momentum changes) cancel exactly for the system as a whole.
- **Unlocks** (from KG): `phys.mech.collisions-elastic`,
  `phys.mech.collisions-inelastic` — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state that TOTAL momentum of a system is
conserved in a collision even when individual objects slow down, stop, or
stick together — momentum is not "lost," it is redistributed among the
system's objects, with the sum unchanged; (2) correctly identify that
momentum conservation applies ONLY to an ISOLATED system (no net EXTERNAL
force) — an external force (from a wall, the ground, or gravity acting
unbalanced) changes total system momentum, and applying conservation
without checking for such a force gives a wrong prediction.

## Core Understanding

Total momentum of an isolated system (no external force) is exactly
conserved in any collision, regardless of how individual objects'
momenta change — when object A slows down and object B speeds up (or a
previously-moving object stops entirely upon sticking to another), the
TOTAL momentum (p_A + p_B, as a vector sum) remains exactly the same
before and after; momentum is never "lost," only redistributed among the
system's members, with the total conserved by Newton's third law (the
force A exerts on B during collision is exactly equal and opposite to
the force B exerts on A, so their impulses — and hence momentum changes —
are equal and opposite, summing to zero net change for the system).
This conservation law applies STRICTLY to systems with no net EXTERNAL
force acting during the interval considered — if an external force (a
wall pushing back, friction from the ground, an unbalanced gravitational
component) acts on the system, total momentum genuinely does change, and
conservation cannot be applied naively; a common error is assuming
conservation universally, including scenarios where gravity or a floor's
normal/friction force is doing net external work on the system during
the collision.

## Mental Models

**Beginner**: "Momentum is lost when objects slow down or stop in a
collision; conservation applies to any situation regardless of external
forces." Upgrade trigger: computing total momentum before and after a
perfectly inelastic collision (objects stick together, both possibly
slower than either was initially) and finding the TOTAL unchanged (even
though individual speeds decreased) directly confronts the
momentum-lost assumption.

**Intermediate**: "Total momentum is conserved for an isolated system —
individual momenta can change, but the sum doesn't, UNLESS an external
force acts." This model correctly captures both core distinctions, but
sometimes overlooks a subtle external force (like ground friction during
a car collision) when the scenario isn't explicitly framed as
"isolated."

**Advanced**: "Before applying conservation, explicitly identify the
system's boundary and check for ANY external force crossing it during
the interaction — gravity, ground friction, air resistance — treating
'no external force' as a condition to verify, not assume."

**Expert**: momentum conservation as a direct consequence of Newton's
third law integrated over time (impulse-momentum theorem applied to the
internal action-reaction pair) — not required for mastery, a natural
derivation-level consolidation.

## Why Students Fail

The dominant failure is the momentum-lost intuition: individual objects
visibly slowing down or stopping is mistaken for the SYSTEM losing
momentum, rather than recognizing the total is conserved through
redistribution; a second, distinct failure is applying conservation
without checking whether an external force (gravity, friction, a wall)
is actually acting on the system during the interaction.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.conservation-of-momentum.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-MOMENTUM-LOST**: believing momentum is lost in collisions,
  especially when objects stop or slow down. **Birth type**: perceptual
  intuition (Type 2) — an object visibly slowing down or stopping is
  perceptually salient and easily (but incorrectly) read as "losing its
  momentum" without tracking where that momentum went (transferred to the
  other object). Probe: "Two carts collide and stick together, both ending
  up slower than the faster cart's initial speed. Has momentum been lost,
  or is something else going on?"
- **MC-INTERNAL-EXTERNAL**: applying conservation in all situations even
  when an external force (gravity, friction, a wall) acts on the system.
  **Birth type**: overgeneralization (Type 1) — the clean, idealized
  "isolated system" scenarios used to first introduce conservation are
  extended to realistic scenarios with unacknowledged external forces
  (like ground friction) without re-checking the isolation condition.
  Probe: "A car crashes into a wall and stops. Is the car's momentum
  conserved during this collision?"

## Analogies

**Best**: passing a ball between two people — the ball isn't destroyed
when one person releases it, it's transferred to the other; the total
"ball count" between the two people stays the same even though each
person's individual count changes — directly targets MC-MOMENTUM-LOST by
giving a concrete image of redistribution rather than loss.

**Anti-analogy**: do NOT say "momentum is always conserved" as a bare,
unqualified statement — omitting the isolated-system condition directly
invites MC-INTERNAL-EXTERNAL when applied to scenarios with an
unacknowledged external force.

## Demonstrations

Physical/data-based: measure total momentum before and after a
perfectly inelastic collision (two carts sticking together), showing the
total unchanged despite both carts now moving slower than the faster
one's initial speed — directly targets MC-MOMENTUM-LOST. Conceptual: a
car crashing into an immovable wall — the wall exerts a large external
force, so the car's (and system's) momentum is clearly NOT conserved —
directly targets MC-INTERNAL-EXTERNAL by giving an obvious external-force
counterexample.

## Discovery Questions

Discovery-style: "if a car crashes into a wall and stops completely, was
momentum conserved during that crash?" — learner reasons through the
wall's external force, directly confronting MC-INTERNAL-EXTERNAL.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-MOMENTUM-LOST is
addressed first (establishing conservation as redistribution, not loss,
via the inelastic-collision measurement), before MC-INTERNAL-EXTERNAL,
since trusting conservation's validity in the clean isolated case is the
prerequisite for then correctly identifying when that validity condition
is violated.

## Tutor Actions

WORKED-EXAMPLE (before/after momentum computed for a perfectly inelastic
collision, total conserved despite lower individual speeds);
COMPARE-CONTRAST (isolated collision vs. car-into-wall, external force
present); ERROR-ANALYSIS (a solution applying conservation to a
scenario with an unacknowledged external force).

## Voice Teaching Notes

Listen for "momentum is lost" or conservation applied without checking
for external forces — the two direct misconception tells. Load-bearing
sentence: "momentum isn't destroyed, it's transferred — and conservation
only holds when nothing OUTSIDE the system pushes on it." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming momentum is lost when objects slow down or stop
signals MC-MOMENTUM-LOST (MISCONCEIVING, full repair via the
before/after measurement). A learner applying conservation to a
scenario with an obvious external force (a wall, ground friction)
signals MC-INTERNAL-EXTERNAL (full repair via the car-into-wall
counterexample). Mastery trigger: correctly computing conserved total
momentum for an isolated collision, AND correctly identifying when an
external force invalidates conservation. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the individual objects for a second — add up
BOTH their momenta before the collision, then add up both AFTER. Are the
two totals the same?" (isolating the redistribution check before judging
loss). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (redistribution not loss; isolated-system validity condition)
bound to procedure (total-momentum before/after calculation). Interleave
with `phys.mech.impulse` and, once authored,
`phys.mech.collisions-elastic`/`phys.mech.collisions-inelastic` (the
direct KG unlocks).

## Transfer Connections

Near: any collision problem, including vehicle crash analysis. Far:
rocket propulsion (momentum conservation between expelled fuel and the
rocket) and particle physics collision analysis (conservation laws
governing particle interactions). Real-world: understanding car crash
safety design (crumple zones extend collision time, reducing peak force,
without changing the conserved total momentum). Expert: momentum
conservation's derivation directly from Newton's third law via the
impulse-momentum theorem.

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

- 2026-07-23 (physics EB Wave 8): initial authoring.

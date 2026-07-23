# Inelastic Collisions — `phys.mech.collisions-inelastic`

## Identity

- **Concept ID**: `phys.mech.collisions-inelastic` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.conservation-of-momentum` — inelastic
  collisions apply the already-secure momentum conservation while
  explicitly NOT conserving kinetic energy, the defining contrast with
  elastic collisions.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that momentum is conserved in ANY
isolated collision (elastic or inelastic), even when objects visibly
crumple or deform severely — momentum and kinetic energy are completely
independent quantities, and losing KE to heat/deformation does NOT mean
momentum is also lost; (2) correctly compute that in a PERFECTLY
inelastic collision (objects stick together), the combined object
generally does NOT stop — it moves at a nonzero combined velocity unless
the initial momenta happen to be exactly equal and opposite.

## Core Understanding

Momentum is conserved in ANY isolated collision, elastic OR inelastic —
even a severely crumpling car crash conserves total momentum exactly,
despite dramatically losing kinetic energy to heat and permanent
deformation; momentum and kinetic energy are entirely INDEPENDENT
quantities, and one can be conserved while the other is not. A common
error conflates the two, expecting momentum to be "lost" alongside the
visibly lost KE in a crumpling collision — but crumpling converts KE to
heat/deformation, it does NOT destroy momentum, which remains exactly the
same before and after (verifiable directly: total momentum before =
total momentum after, even as computed KE clearly decreases). A second,
distinct and specific error concerns PERFECTLY inelastic collisions
(where objects stick together after impact): the combined object does
NOT generally come to rest — it moves at v_f = (m₁u₁+m₂u₂)/(m₁+m₂), a
generally NONZERO velocity determined by the total momentum divided by
total mass; the combined object stops ONLY in the special case where
the initial momenta happen to be exactly equal and opposite (total
initial momentum = 0) — in the common case of one object initially at
rest, the combined object continues moving at a reduced (but nonzero)
speed, not zero.

## Mental Models

**Beginner**: "A car crumpling in a crash means momentum is lost; objects
that stick together in a collision come to a complete stop." Upgrade
trigger: computing total momentum explicitly before and after a
crumpling car-crash scenario, finding it exactly conserved despite
dramatic KE loss, directly confronts the momentum-lost assumption;
computing v_f for a specific perfectly-inelastic sticking collision
(finding a nonzero result), directly confronts the both-stop assumption.

**Intermediate**: "Momentum is conserved in ALL collisions, elastic or
not; KE is lost in inelastic collisions but momentum isn't; sticking
objects move together at v_f=(m₁u₁+m₂u₂)/(m₁+m₂), generally nonzero."
This model correctly captures both distinctions, but sometimes still
expects a "dramatic-looking" collision (lots of crumpling/sound) to
somehow violate momentum conservation more than a "gentle" one.

**Advanced**: "Momentum conservation is guaranteed by the isolated-system
condition alone, entirely independent of HOW much KE is lost; always
solve for v_f explicitly using the momentum equation rather than
assuming zero by default."

**Expert**: the coefficient of restitution as a continuous parameter
(1 for perfectly elastic, 0 for perfectly inelastic) quantifying the
degree of KE loss along a spectrum — a natural consolidation, not
required for mastery.

## Why Students Fail

The dominant failure is conflating momentum loss with KE loss, expecting
a visibly dramatic (crumpling, deforming) collision to also lose
momentum; a second, distinct failure is assuming a perfectly inelastic
(sticking) collision always results in zero final velocity, rather than
computing the actual momentum-conservation result.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.collisions-inelastic.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-MOMENTUM-LOST-INELASTIC**: believing a crumpling car crash loses
  momentum, or expecting an inelastic collision not to conserve momentum.
  **Birth type**: perceptual intuition (Type 2) — dramatic visible
  deformation/energy loss (crumpling, sound, heat) is intuitively
  associated with "everything about the collision changing," incorrectly
  extended to momentum, which remains exactly conserved regardless of
  how much KE is lost. Probe: "A 1000 kg car hits a stationary 1500 kg
  car and they crumple severely, sticking together. Is total momentum
  before the crash exactly equal to total momentum after?"
- **MC-PERFECTLY-INELASTIC-ZERO-VELOCITY**: assuming objects stick and
  come to a complete stop in a perfectly inelastic collision. **Birth
  type**: overgeneralization (Type 1) — "sticking together" is loosely
  associated with "stopping," without computing the actual combined
  velocity from momentum conservation, which is generally nonzero. Probe:
  "One object moving at 6 m/s collides and sticks to an identical
  stationary object. Do they stop completely, or do they move together
  at some nonzero speed?"

## Analogies

**Best**: two ice skaters, one moving and one stationary, who grab hands
and continue moving together — they clearly don't stop, but continue at
a reduced (shared) speed determined by their combined momentum — directly
targets MC-PERFECTLY-INELASTIC-ZERO-VELOCITY by giving a familiar,
embodied image of sticking-without-stopping.

**Anti-analogy**: do NOT say "a crash destroys momentum along with
energy" as a loose bridging phrase — this directly invites
MC-MOMENTUM-LOST-INELASTIC by conflating the two independent
quantities.

## Demonstrations

Physical/data-based: compute total momentum before and after a specific
crumpling car-crash scenario (e.g. the Blueprint's 1000kg/1500kg numeric
example), showing exact conservation despite dramatic KE loss (120,000 J
lost) — directly targets MC-MOMENTUM-LOST-INELASTIC. Worked-example:
compute v_f=(m₁u₁+m₂u₂)/(m₁+m₂) for a specific sticking collision (one
object initially at rest), showing a nonzero result — directly targets
MC-PERFECTLY-INELASTIC-ZERO-VELOCITY.

## Discovery Questions

Discovery-style: "if two identical objects stick together after a
collision, with one initially moving and one at rest, do they come to a
complete stop, or do they keep moving?" — learner computes v_f directly,
directly confronting MC-PERFECTLY-INELASTIC-ZERO-VELOCITY.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-MOMENTUM-LOST-INELASTIC is addressed first (establishing momentum's
independence from KE loss), before
MC-PERFECTLY-INELASTIC-ZERO-VELOCITY, since trusting momentum
conservation as the reliable, universal tool is the prerequisite for
then correctly computing the specific (usually nonzero) final velocity
in a sticking collision.

## Tutor Actions

WORKED-EXAMPLE (momentum computed before/after a crumpling car-crash
scenario; v_f computed for a sticking collision); DEMONSTRATION (two
ice skaters grabbing hands and continuing to move together).

## Voice Teaching Notes

Listen for "momentum is lost" applied to a dramatic collision, or an
assumption that sticking objects always stop — the two direct
misconception tells. Load-bearing sentence: "momentum doesn't care how
much crumpling or heat happens — it's still exactly conserved; and
sticking together usually means moving together, not stopping."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming momentum is lost in a crumpling collision signals
MC-MOMENTUM-LOST-INELASTIC (MISCONCEIVING, full repair via the
before/after momentum computation). A learner assuming a sticking
collision always results in zero final velocity signals
MC-PERFECTLY-INELASTIC-ZERO-VELOCITY (full repair via the ice-skater
demonstration). Mastery trigger: correctly verifying momentum
conservation despite KE loss, AND correctly computing a generally
nonzero final velocity for a sticking collision. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the crumpling for a second — is this
system isolated (no external force)? If so, what MUST be true about its
total momentum?" (isolating the isolated-system guarantee before
computing). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (momentum/KE independence; sticking velocity generally nonzero)
bound to procedure (v_f=(m₁u₁+m₂u₂)/(m₁+m₂) calculation). Interleave
with `phys.mech.conservation-of-momentum` and `phys.mech.collisions-elastic`
(sibling concept at this same dependency level, a direct contrast case).

## Transfer Connections

Near: any inelastic-collision-calculation problem, including vehicle
crash analysis. Far: automotive safety engineering (crumple zones
deliberately maximize inelastic energy loss while momentum conservation
still governs the resulting motion) and ballistics (bullet-embedding
problems as classic perfectly-inelastic collision applications).
Real-world: understanding why vehicle safety design intentionally
promotes crumpling (converting KE to deformation/heat, reducing peak
force on occupants) without violating momentum conservation. Expert: the
coefficient of restitution quantifying the elastic-to-inelastic
spectrum.

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

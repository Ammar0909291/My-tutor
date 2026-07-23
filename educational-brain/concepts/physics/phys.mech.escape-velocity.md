# Escape Velocity — `phys.mech.escape-velocity`

## Identity

- **Concept ID**: `phys.mech.escape-velocity` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.gravitational-potential`,
  `phys.mech.conservation-of-energy` — escape velocity is a direct
  application of energy conservation to the gravitational potential well,
  finding the launch KE that exactly cancels the well's depth.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain escape velocity is a purely
ENERGETIC condition (launch KE ≥ the gravitational potential well's
depth |U|) — NOT a requirement for continuous engine thrust; an
unpropelled object launched at exactly v_e=√(2GM/r) coasts to infinity on
its initial kinetic energy alone, engines off; (2) correctly state escape
velocity does NOT depend on the escaping object's own mass — v_e=√(2GM/r)
contains only the source body's mass M and launch radius r, since the
escaping object's mass cancels exactly from the energy-balance equation
(mirroring the same mass-cancellation already established for orbital
speed).

## Core Understanding

Escape velocity is a purely ENERGETIC condition, not a statement about
ongoing propulsion — it is the minimum LAUNCH speed such that NO further
thrust is required afterward: the object coasts to infinity purely on
its initial kinetic energy. The condition is precisely KE_launch ≥
|U_launch| (kinetic energy at least equal to the depth of the
gravitational potential well at the launch point) — equivalently, total
energy E=KE+U ≥ 0. A baseball thrown at exactly 11.2 km/s from Earth's
surface would genuinely escape Earth's gravity with its engines (if it
had any) off entirely, ignoring air resistance — a rocket using
continuous thrust throughout its ascent needs a much LOWER initial
speed (since ongoing work adds energy gradually), but "escape velocity"
specifically refers to the single-launch, unpropelled case. A second,
independent subtlety directly parallels orbital speed's mass-independence:
deriving v_e from energy conservation, ½mv_e²=GMm/r, shows the escaping
object's mass m cancels exactly from both sides, leaving v_e²=2GM/r,
depending only on the SOURCE body's mass M and the launch radius r — a
1kg ball and a 1000kg rocket launched from the identical point in the
identical gravitational field have the EXACT SAME escape velocity
(though the rocket needs 1000× more total energy to reach that same
speed).

## Mental Models

**Beginner**: "A rocket must keep its engines running to escape Earth's
gravity; a heavier object needs a higher escape velocity than a lighter
one." Upgrade trigger: computing the energy condition explicitly
(KE≥|U|, achievable via a single initial impulse with no further
thrust needed) directly confronts the continuous-thrust assumption;
deriving v_e from ½mv_e²=GMm/r and watching m cancel directly confronts
the mass-dependence assumption.

**Intermediate**: "Escape velocity is an energy condition achievable via
a single launch impulse, no ongoing thrust required; v_e=√(2GM/r) depends
only on the source mass and launch radius, not the escaping object's own
mass." This model correctly captures both core results, but sometimes
still pictures escape velocity as somehow requiring active, continuous
propulsion out of habit from real rocket-launch imagery (which DOES use
continuous thrust, for different practical reasons).

**Advanced**: "Distinguish the IDEALIZED energy condition (a single
launch impulse sufficient for escape) from the PRACTICAL engineering
choice (real rockets use continuous thrust for other reasons — fuel
efficiency, structural loads — not because escape velocity itself
requires it)."

**Expert**: escape velocity as the specific radius-dependent boundary
between bound (elliptical) and unbound (parabolic/hyperbolic) orbital
trajectories in the general two-body problem — a natural consolidation
directly connecting to `phys.mech.orbital-mechanics`, not required for
mastery.

## Why Students Fail

The dominant failure is picturing escape velocity as requiring
continuous engine thrust throughout the escape (conflating it with real
rocket engineering practice), rather than recognizing it as a purely
energetic, single-launch-impulse condition; a second, distinct failure
is including the escaping object's mass in the escape velocity formula,
not recognizing the exact cancellation that parallels free-fall's
mass-independence.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.escape-velocity.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ESCAPE-REQUIRES-THRUST**: believing a rocket must keep its
  engines on to escape Earth, or thinking escape velocity only applies to
  self-powered vehicles. **Birth type**: instruction-induced (Type 5) —
  real rocket launches visibly use continuous thrust (for practical
  engineering reasons, not because escape velocity itself demands it),
  and this practical image is incorrectly generalized into the physics
  definition of escape velocity, which is a single-impulse energy
  condition. Probe: "Could a baseball, thrown fast enough (11.2 km/s)
  from Earth's surface with no engine at all, genuinely escape Earth's
  gravity permanently?"
- **MC-ESCAPE-DEPENDS-ON-MASS**: believing heavier objects need more
  speed to escape, or including the escaping object's mass m in the
  v_e formula. **Birth type**: overgeneralization (Type 1) — everyday
  intuition that heavier objects require "more effort" is incorrectly
  extended to escape SPEED, where mass cancels exactly (though total
  ENERGY required genuinely does scale with mass). Probe: "A 1kg ball
  and a 1000kg rocket are both launched from the same point on Earth's
  surface. Do they need the same escape velocity, or does the rocket
  need a higher speed?"

## Analogies

**Best**: Galileo's mass-independent free-fall result, run in reverse —
just as all objects fall at the same acceleration regardless of mass,
the REVERSE process (escaping to infinity) requires the same speed
regardless of mass, for the identical underlying reason (mass cancels in
F=ma when the force itself is proportional to mass) — directly targets
MC-ESCAPE-DEPENDS-ON-MASS by connecting to an already-familiar
precedent.

**Anti-analogy**: do NOT say "a rocket needs escape velocity to blast off
Earth" without clarifying this refers to the SPEED needed for an
unpropelled coast to infinity, not an in-flight thrust requirement — this
vague phrasing directly invites MC-ESCAPE-REQUIRES-THRUST.

## Demonstrations

Conceptual: apply the energy condition KE≥|U| directly (½mv_e²=GMm/r),
showing v_e is achievable via a single initial impulse with zero
subsequent thrust needed — directly targets
MC-ESCAPE-REQUIRES-THRUST. Worked-example: derive v_e=√(2GM/r) for both
a 1kg ball and a 1000kg rocket from the same launch point, showing
identical v_e despite vastly different total energy requirements —
directly targets MC-ESCAPE-DEPENDS-ON-MASS.

## Discovery Questions

Discovery-style: "if you could throw a baseball at exactly 11.2 km/s
from Earth's surface, with no engine attached at all, would it
eventually come back down, or would it escape permanently?" — learner
reasons through the pure energy condition, directly confronting
MC-ESCAPE-REQUIRES-THRUST.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-ESCAPE-REQUIRES-THRUST is addressed first (establishing escape
velocity as a single-impulse energy condition), before
MC-ESCAPE-DEPENDS-ON-MASS, since correctly framing escape as an energy
threshold (KE≥|U|) sets up the natural next step of examining exactly
HOW that threshold depends (or doesn't) on the escaping object's own
mass.

## Tutor Actions

WORKED-EXAMPLE (energy condition KE≥|U| applied to a single-impulse
escape scenario; v_e derived showing mass cancellation for two very
different masses); ANALOGY (Galileo's free-fall mass-independence run in
reverse).

## Voice Teaching Notes

Listen for "the rocket needs its engines on to escape" or escaping
object's mass included in the v_e formula — the two direct misconception
tells. Load-bearing sentence: "escape velocity is about ENERGY at
launch, not ongoing thrust — and mass cancels out of the speed formula
completely, just like in free-fall." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming continuous thrust is required to escape signals
MC-ESCAPE-REQUIRES-THRUST (MISCONCEIVING, full repair via the
single-impulse energy condition). A learner including the escaping
object's mass in v_e signals MC-ESCAPE-DEPENDS-ON-MASS (full repair via
the two-mass derivation). Mastery trigger: correctly stating escape
velocity is a single-launch energy condition, AND correctly computing
v_e=√(2GM/r) as mass-independent. Blueprint's assessment component cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the rocket engine for a second — in the
energy equation ½mv_e²=GMm/r, does the escaping object's own mass m
actually survive on both sides, or does it cancel?" (isolating the
mass-cancellation fact before discussing propulsion). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (single-impulse energy condition; mass-independent escape
speed) bound to procedure (v_e=√(2GM/r) calculation). Interleave with
`phys.mech.gravitational-potential`, `phys.mech.conservation-of-energy`,
and `phys.mech.orbital-mechanics` (sibling concept at this same
dependency level, the closely related bound-vs-unbound trajectory
distinction).

## Transfer Connections

Near: any escape-velocity calculation problem, including planetary
comparisons. Far: astrophysics (black hole escape velocity exceeding
light speed at the event horizon, the same formula pushed to its
relativistic limit) and space mission planning (launch energy budgets
directly determined by the destination's escape velocity). Real-world:
understanding why the Moon (lower escape velocity) needed far less fuel
to launch return missions than Earth-bound missions require. Expert:
escape velocity as the exact boundary between bound and unbound orbital
trajectories.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 9): initial authoring.

# Angular Kinematics — `phys.mech.angular-kinematics`

## Identity

- **Concept ID**: `phys.mech.angular-kinematics` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.kinematics-1d` (the load-bearing part:
  angular kinematics is a direct structural mirror of 1D linear kinematics,
  θ/ω/α replacing x/v/a) and `phys.mech.circular-motion` (the physical
  context angular kinematics describes).
- **Unlocks** (from KG): `phys.mech.torque`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly apply the angular kinematics equations
(ω = ω₀ + αt, θ = θ₀ + ω₀t + ½αt², etc.), recognizing them as a direct
structural mirror of the already-known linear kinematics equations with
θ/ω/α replacing x/v/a; (2) correctly relate angular quantities to linear
quantities at a point on a rotating body (v = ωr, a_tangential = αr), and
correctly explain that different points on the SAME rigid rotating object
share the identical ω and α but have DIFFERENT linear speeds/accelerations
depending on their distance r from the axis; (3) correctly use radians
(not degrees) in all angular kinematics formulas, explaining why radians
specifically are required for the v = ωr relationship to hold with correct
units.

## Core Understanding

Angular kinematics describes rotational motion using angular position (θ),
angular velocity (ω), and angular acceleration (α), governed by equations
structurally IDENTICAL to linear kinematics (θ = θ₀ + ω₀t + ½αt² mirrors
x = x₀ + v₀t + ½at² exactly) — every linear kinematics equation the
learner already knows transfers directly by substituting the angular
analog for each linear quantity. The crucial link between angular and
linear descriptions of the SAME rotating rigid body is v = ωr and
a_tangential = αr: every point on a rigid rotating object shares the
identical angular velocity ω and angular acceleration α (the whole object
rotates together, at one rate), but points at different distances r from
the rotation axis have correspondingly different LINEAR speeds and
accelerations — a point twice as far from the axis moves twice as fast,
even though both points share the same ω. This relationship requires
angles measured in RADIANS specifically (not degrees) — radians are
defined as arc length divided by radius, a dimensionless ratio that makes
v = ωr dimensionally consistent (m/s = rad/s × m, since radians carry no
independent unit); using degrees would require an extra, awkward
conversion factor.

## Mental Models

**Beginner**: "All points on a spinning object move at the same speed."
Upgrade trigger: comparing a point near a rotating disk's center to one
near its rim (a merry-go-round) directly confronts this — the rim point
visibly moves faster.

**Intermediate**: "All points share the same ω and α, but linear
speed/acceleration depends on r via v = ωr, a = αr." This model correctly
distinguishes shared angular quantities from position-dependent linear
ones, but sometimes still uses degrees in kinematics formulas out of habit
from everyday angle usage.

**Advanced**: "Radians must be used in angular kinematics formulas
specifically because v = ωr requires ω in units that make the equation
dimensionally consistent — radians, being a dimensionless ratio (arc
length/radius), are the only angular unit that achieves this without an
extra conversion factor."

**Expert**: angular kinematics as vector quantities (ω and α as
pseudovectors along the rotation axis, via the right-hand rule) — not
required for mastery at this level, which treats rotation in a single
plane.

## Why Students Fail

The dominant failure is same-speed-everywhere intuition (all points on a
spinning object treated as moving identically), and a distinct, common
computational failure is using degrees instead of radians in the
kinematics equations and the v = ωr relationship, producing systematically
wrong numerical answers despite conceptually correct reasoning.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.angular-kinematics.md`,
Misconception Engine, Priority 1-2) documents two; reused by reference
with birth-type added.

- **MC-SAME-TANGENTIAL** (Priority 1): belief all points on a rotating
  rigid body have the same LINEAR (tangential) speed, not just the same
  angular velocity. **Birth type**: overgeneralization (Type 1) — "the
  object is rotating at one rate" is correctly true for ω, and incorrectly
  extended to linear speed, which depends on r. Probe: "A merry-go-round
  spins at a constant rate. Does a child sitting near the center move at
  the same speed as a child sitting near the outer edge?"
- **MC-DEGREES-NOT-RADIANS** (Priority 2): using degrees instead of
  radians in angular kinematics equations, producing incorrect numerical
  results. **Birth type**: overgeneralization (Type 1) — degrees are the
  dominant everyday angle unit (compass directions, protractors), and this
  familiar default is carried into a context (v = ωr and the kinematics
  equations) that specifically requires radians. Probe: "A wheel rotates
  at 2 radians per second. Can you use '2' directly with degrees-based
  intuition, or does the unit matter for getting v = ωr right?"

## Analogies

**Best**: a marching band's rotating line/wheel formation — everyone in
the line turns through the same ANGLE together (same ω), but the person at
the far end of the line has to physically walk much faster (higher linear
speed) to keep up, while the person at the pivot point barely moves at
all. Directly targets MC-SAME-TANGENTIAL with a vivid, embodied image.

**Anti-analogy**: do NOT say "everything on a spinning object moves
together" without immediately qualifying "at the same ANGULAR rate, not
the same linear speed" — bare "moves together" language reinforces
MC-SAME-TANGENTIAL.

## Demonstrations

Physical: mark two points at different radii on a rotating disk or
turntable (a record player, a bike wheel) and time how far each travels in
one rotation — directly, numerically targets MC-SAME-TANGENTIAL by showing
the outer point covers much more linear distance in the same time.
For MC-DEGREES-NOT-RADIANS: compute v = ωr using both a (correct) radian
value and an (incorrect) raw degree value plugged in directly, showing the
degree-based answer is wildly, obviously wrong.

## Discovery Questions

Discovery-style: "does everyone on a spinning merry-go-round move at the
same speed?" — learner predicts, then the marked-points-on-a-turntable
demonstration resolves it, directly confronting MC-SAME-TANGENTIAL.

## Teaching Sequence

Blueprint's session-flow component cited by reference.
MC-SAME-TANGENTIAL repaired first via the marked-turntable demonstration
(establishing the ω-shared/v-varies distinction), before
MC-DEGREES-NOT-RADIANS, since correctly understanding v = ωr as a genuine,
meaningful physical relationship makes the radians requirement feel like a
necessary consequence rather than an arbitrary rule.

## Tutor Actions

DEMONSTRATION (marked points on a rotating disk); WORKED-EXAMPLE (v = ωr
computed correctly with radians, and incorrectly with degrees, side by
side); ERROR-ANALYSIS (a solution using degrees directly in v = ωr).

## Voice Teaching Notes

Listen for "it all moves at the same speed" when describing a spinning
object — the MC-SAME-TANGENTIAL tell. Load-bearing sentence: "same
angular rate everywhere, but linear speed depends on how far out you are."
Channel-reality caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming equal linear speed for two different-radius points on
the same rotating object signals MC-SAME-TANGENTIAL (MISCONCEIVING, full
repair via the marked-turntable demonstration). Mastery trigger: correctly
computing different linear speeds for two different radii on the same
rotating object, using radians consistently throughout. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget speed for a second — does everyone on this
merry-go-round complete one full turn in the SAME time?" (isolating the
shared-ω intuition before reintroducing radius-dependent linear speed).
See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Procedure (angular kinematics equations, direct mirror of linear ones)
bound to a concept (ω/α shared, v/a_tangential radius-dependent).
Interleave with `phys.mech.kinematics-1d` (the direct structural template)
and `phys.mech.circular-motion`, and, once authored, `phys.mech.torque`.

## Transfer Connections

Near: any rotating rigid-body kinematics problem, including gears and
pulleys (different radii, shared angular rate). Far: mechanical
engineering (gear ratio design directly exploits the v = ωr, different-radii
relationship) and astronomy (planetary rotation, where surface linear
speed varies by latitude despite uniform angular rotation rate). Real-world:
why a bicycle's rear wheel and front chainring, connected by a chain,
relate their SPEEDS via their different radii despite sharing the chain's
linear speed. Expert: angular velocity/acceleration as pseudovectors along
the rotation axis.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to mathematics (the
direct structural parallel between linear and angular kinematics equations
mirrors general function-transformation reasoning) not currently captured
as a cross_link — recorded as Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
session-flow/assessment components by reference. Not restated: Concept
Identity, Explanation Blocks, Worked Examples, Adaptive Branching,
Visualisation Specification, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine structural-parallel connection to
mathematics. Flagged for the Curriculum Production Pipeline's backlog, not
fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

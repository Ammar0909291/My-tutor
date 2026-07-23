# Angular Momentum — `phys.mech.angular-momentum`

## Identity

- **Concept ID**: `phys.mech.angular-momentum` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 11.
- **Prerequisites**: `phys.mech.rotational-dynamics` — angular momentum
  (L=Iω) is the rotational analog of linear momentum, built directly on
  the already-secure moment-of-inertia and rotational-kinematics
  framework.
- **Unlocks** (from KG): `phys.mech.conservation-of-angular-momentum` —
  a genuine hub concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly state L=Iω and correctly explain that
angular momentum is NOT the same as angular velocity — two objects with
the SAME ω can have very different L if their moments of inertia I
differ (a slow-spinning flywheel with large I can have MORE angular
momentum than a fast-spinning top with small I); (2) correctly explain
that torque can change the DIRECTION of the angular momentum vector, not
just its magnitude (speeding up or slowing down rotation) — gyroscopic
precession (a spinning top staying upright while its axis slowly sweeps
around) is a direct, real consequence of a gravitational torque changing
L's direction while barely affecting its magnitude.

## Core Understanding

Angular momentum, L=Iω, is NOT simply another name for angular velocity
ω — two objects spinning at the IDENTICAL angular velocity can have
vastly different angular momenta if their moments of inertia I differ:
a large, slow-spinning flywheel (large I, modest ω) can genuinely have
MORE angular momentum than a small, fast-spinning top (small I, large
ω) — L depends on the PRODUCT Iω, not ω alone, and confusing the two
leads to systematic errors whenever comparing objects with different
mass distributions. A second, equally important and often surprising
point: torque's effect on angular momentum is NOT limited to speeding up
or slowing down rotation (changing L's magnitude) — torque can also
change angular momentum's DIRECTION, a genuinely different effect with no
direct analog in simple linear-momentum intuition. Gyroscopic precession
— a spinning top that, rather than simply falling over under gravity's
torque, instead has its spin AXIS slowly sweep around in a cone while
staying upright — is a direct, observable consequence of gravity's
torque changing L's DIRECTION (causing the slow precession) while barely
affecting L's magnitude (the spin rate stays roughly constant); a
learner who assumes torque can only speed up or slow down rotation finds
this behavior deeply puzzling, since it seems to defy the "torque
changes spin rate" intuition entirely.

## Mental Models

**Beginner**: "Angular momentum is basically the same thing as angular
velocity — if two objects spin at the same rate, they have the same
angular momentum; torque can only make something spin faster or slower,
never change which way its rotation axis points." Upgrade trigger:
comparing L=Iω for a large flywheel and a small top at the SAME ω
(finding very different L values) directly confronts the
L-equals-omega assumption; observing (or analyzing) gyroscopic
precession directly confronts the torque-only-changes-speed assumption.

**Intermediate**: "L=Iω depends on both moment of inertia and angular
velocity, not ω alone; torque can change L's direction (precession), not
just its magnitude." This model correctly captures both core results,
but sometimes still defaults to comparing angular momenta using ω alone
when I isn't explicitly emphasized in a problem.

**Advanced**: "Treat angular momentum as a genuine VECTOR quantity —
torque is the rate of change of THIS vector, dL/dt=τ, and just as a
force perpendicular to linear momentum changes its direction (uniform
circular motion), a torque perpendicular to L changes L's direction
(precession), while a torque parallel/antiparallel to L changes only its
magnitude."

**Expert**: the full vector precession-rate formula, Ω=τ/(L sinθ) (or
equivalent), quantitatively predicting a gyroscope's precession rate from
the applied torque and existing angular momentum — a natural
consolidation directly connecting to the KG unlock
`phys.mech.conservation-of-angular-momentum`, not required for mastery.

## Why Students Fail

The dominant failure is treating angular momentum as equivalent to
angular velocity, ignoring the moment-of-inertia factor entirely; a
second, distinct failure is assuming torque can only change rotational
SPEED, missing that torque can also change the angular momentum vector's
DIRECTION, the mechanism underlying gyroscopic precession.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.angular-momentum.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-L-IS-OMEGA**: believing angular momentum is the same as angular
  velocity — "faster spinning means more L," equating L=ω without the I
  factor. **Birth type**: analogy overextension (Type 6) — linear
  momentum's simpler mass-independent-of-velocity conception is
  incorrectly collapsed into treating L as depending on ω alone, missing
  the essential I factor that linear momentum's p=mv analog would
  actually preserve (mass matters there too). Probe: "A large,
  slow-spinning flywheel and a small, fast-spinning top happen to have
  the same angular velocity ω. Do they necessarily have the same angular
  momentum?"
- **MC-TORQUE-CHANGES-SPEED**: believing torque only changes angular
  speed, not the direction of the angular momentum vector — confused by
  gyroscopic precession. **Birth type**: analogy overextension (Type 6)
  — the simpler linear-motion intuition (a force along the direction of
  motion changes speed) is incorrectly assumed to be the ONLY way torque
  can act, missing that torque perpendicular to L instead changes L's
  DIRECTION, exactly as force perpendicular to linear momentum produces
  circular motion rather than speed change. Probe: "A spinning top under
  gravity's torque doesn't simply fall over — its axis slowly sweeps
  around in a circle while the top stays upright. How can a torque cause
  this, if torque can only speed up or slow down rotation?"

## Analogies

**Best**: comparing a heavy, slow-turning merry-go-round to a light,
fast-spinning top — asking directly "which one is harder to stop?" (a
direct, physical proxy for angular momentum) reveals the heavy,
slow-turning one often "wins" despite lower ω — directly targets
MC-L-IS-OMEGA by grounding L in a tangible, comparative physical
consequence.

**Anti-analogy**: do NOT say "torque speeds up or slows down spinning,
just like force speeds up or slows down straight-line motion" as an
unqualified parallel — this directly installs
MC-TORQUE-CHANGES-SPEED by omitting the direction-changing possibility.

## Demonstrations

Worked-example: compute L=Iω for a large flywheel and small top at
identical ω, showing genuinely different L values — directly targets
MC-L-IS-OMEGA. Conceptual: trace gyroscopic precession as a direct
vector consequence of dL/dt=τ, with τ perpendicular to L — directly
targets MC-TORQUE-CHANGES-SPEED.

## Discovery Questions

Discovery-style: "why does a spinning top, subject to gravity's torque,
slowly circle around (precess) instead of simply falling over like a
non-spinning top would?" — learner reasons through the vector nature of
L and τ, directly confronting MC-TORQUE-CHANGES-SPEED.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-L-IS-OMEGA is
addressed first (establishing L=Iω as depending on both factors), before
MC-TORQUE-CHANGES-SPEED, since correctly treating L as a genuine
(I-weighted) vector quantity is the prerequisite for then correctly
reasoning about how torque, as dL/dt, can change that vector's direction
as well as its magnitude.

## Tutor Actions

WORKED-EXAMPLE (L=Iω computed for a flywheel and top at equal ω);
DEMONSTRATION (gyroscope or spinning-top precession, observed or
simulated); THOUGHT-EXPERIMENT (why torque perpendicular to L doesn't
change L's magnitude).

## Voice Teaching Notes

Listen for "same spin speed, same angular momentum" or confusion about
why a torqued spinning top doesn't just fall over — the two direct
misconception tells. Load-bearing sentence: "angular momentum depends on
BOTH how fast something spins AND how its mass is distributed — and
torque can turn that spin axis, not just speed it up or slow it down."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner comparing angular momenta using ω alone (ignoring I) signals
MC-L-IS-OMEGA (MISCONCEIVING, full repair via the flywheel/top
comparison). A learner expecting a torqued spinning top to simply fall
over signals MC-TORQUE-CHANGES-SPEED (full repair via the precession
demonstration). Mastery trigger: correctly computing L=Iω incorporating
moment of inertia, AND correctly explaining gyroscopic precession as a
direction-changing torque effect. Blueprint's assessment component cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget ω for a second — do these two objects have
the same moment of inertia, or different ones?" (isolating the I factor
before comparing angular momenta). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (L=Iω's dual dependence; torque as a direction-changing vector
effect) bound to procedure (L calculation; precession reasoning).
Interleave with `phys.mech.rotational-dynamics` and, once authored,
`phys.mech.conservation-of-angular-momentum` (the direct KG unlock).

## Transfer Connections

Near: any angular-momentum comparison or gyroscopic-behavior problem.
Far: aerospace engineering (gyroscopes used for spacecraft attitude
control, directly exploiting precession) and astronomy (planetary axial
precession, driven by gravitational torques from the Sun/Moon on
Earth's equatorial bulge). Real-world: understanding why a spinning
bicycle wheel resists being tipped over, and why it precesses instead
when a torque is applied. Expert: the full vector precession-rate
formula for quantitative gyroscope analysis.

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

- 2026-07-23 (physics EB Wave 11): initial authoring.

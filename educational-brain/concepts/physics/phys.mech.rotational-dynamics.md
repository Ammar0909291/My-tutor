# Rotational Dynamics — `phys.mech.rotational-dynamics`

## Identity

- **Concept ID**: `phys.mech.rotational-dynamics` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 10.
- **Prerequisites**: `phys.mech.moment-of-inertia` — rotational dynamics
  directly applies τ=Iα, the rotational analog of Newton's second law,
  built on the already-secure moment-of-inertia concept.
- **Unlocks** (from KG): `phys.mech.angular-momentum`,
  `phys.mech.rolling-motion` — a genuine hub concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly apply τ=Iα (NOT τ=α directly, and NOT
τ=mα using linear mass) — angular acceleration depends on BOTH torque
AND moment of inertia, so doubling torque does NOT necessarily double
angular acceleration unless I stays fixed; (2) correctly include
rotational kinetic energy, ½Iω², for any spinning or rolling object —
translational KE=½mv² alone is INCOMPLETE for rotating objects, which
have energy in BOTH translational and rotational forms simultaneously.

## Core Understanding

The rotational analog of Newton's second law, τ=Iα, requires BOTH torque
τ AND moment of inertia I to determine angular acceleration α=τ/I — a
larger torque does NOT automatically produce a proportionally larger α
unless I is held constant; a common computational error either equates
α directly with τ (skipping the division by I entirely) or substitutes
linear mass m in place of I (α=τ/m, dimensionally and physically
incorrect) — the moment of inertia, not mass, is the rotational analog
of inertial resistance. A second, equally important and frequently
overlooked point: any object undergoing rotational motion (spinning,
rolling) possesses ROTATIONAL kinetic energy, ½Iω², IN ADDITION TO any
translational kinetic energy, ½mv² — a rolling wheel, for instance, has
BOTH forms simultaneously (KE_total=½mv²+½Iω²), and using only
½mv² for such an object systematically undercounts its true total
kinetic energy, since rotational KE is a genuinely separate energy
contribution, not something already included in the translational term.

## Mental Models

**Beginner**: "Angular acceleration equals torque directly — doubling
torque always doubles α, regardless of the object; a spinning or rolling
object's kinetic energy is just ½mv², like any other moving object."
Upgrade trigger: comparing α for the same torque applied to objects with
different I values (finding genuinely different α) directly confronts
the torque-equals-α assumption; computing total KE for a rolling wheel
using both ½mv² AND ½Iω², finding a larger total than ½mv² alone,
directly confronts the rotational-KE-ignored assumption.

**Intermediate**: "α=τ/I, always dividing by the object's actual moment
of inertia; rolling/spinning objects have KE_total=½mv²+½Iω², both terms
required." This model correctly captures both core results, but
sometimes still omits the rotational KE term when a problem doesn't
explicitly emphasize rotation.

**Advanced**: "Before computing α, confirm you have the correct I for
this specific object and axis (never substitute m); before computing KE
for any spinning/rolling object, always check whether BOTH translational
and rotational terms apply."

**Expert**: rotational dynamics as the direct rotational analog of the
entire linear-mechanics framework (F=ma↔τ=Iα, p=mv↔L=Iω, KE=½mv²↔
KE_rot=½Iω²) — a natural unifying consolidation, not required for
mastery.

## Why Students Fail

The dominant failure is treating angular acceleration as directly
proportional to torque alone (or substituting mass for moment of
inertia), missing that I must be correctly identified and divided
through; a second, distinct failure is omitting rotational kinetic
energy entirely, treating ½mv² as the complete energy budget for a
spinning or rolling object.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.rotational-dynamics.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ALPHA-EQUALS-TORQUE**: equating α=τ without dividing by I, or
  computing α=τ/m (using linear mass instead of I). **Birth type**:
  analogy overextension (Type 6) — Newton's second law's linear form
  (F=ma, where dividing by mass is the natural, familiar step) is
  incorrectly mapped using MASS rather than the rotational analog,
  moment of inertia. Probe: "The same torque is applied to two different
  objects with different moments of inertia. Do they experience the same
  angular acceleration?"
- **MC-ROTATIONAL-KE-IGNORED**: using only KE=½mv² even for spinning
  objects, ignoring the ½Iω² term. **Birth type**: overgeneralization
  (Type 1) — the linear KE formula, secure and sufficient for
  non-rotating objects, is incorrectly assumed complete for rotating
  ones, missing the genuinely separate rotational energy contribution.
  Probe: "A wheel rolls without slipping. Is its total kinetic energy
  just ½mv², or does it include another term?"

## Analogies

**Best**: pushing a shopping cart (linear) versus spinning a heavy
merry-go-round (rotational) — both require overcoming "resistance to
acceleration," but the relevant resistance is mass for the cart and
moment of inertia (not mass) for the merry-go-round — directly targets
MC-ALPHA-EQUALS-TORQUE by mapping the correct rotational analog.

**Anti-analogy**: do NOT say "a rolling object's energy is just like
any moving object's" — this vague equivalence directly invites
MC-ROTATIONAL-KE-IGNORED by obscuring the extra rotational term.

## Demonstrations

Worked-example: compute α=τ/I for the same torque applied to two objects
with different I, showing genuinely different results — directly
targets MC-ALPHA-EQUALS-TORQUE. Worked-example: compute total KE for a
rolling wheel using both ½mv² and ½Iω², showing the rotational term is a
significant, separate contribution — directly targets
MC-ROTATIONAL-KE-IGNORED.

## Discovery Questions

Discovery-style: "does a rolling wheel have MORE total kinetic energy
than a sliding (non-rotating) object moving at the same speed?" — learner
computes both KE contributions, directly confronting
MC-ROTATIONAL-KE-IGNORED.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-ALPHA-EQUALS-TORQUE is addressed first (establishing τ=Iα as the
correct rotational analog of F=ma), before
MC-ROTATIONAL-KE-IGNORED, since correctly identifying moment of inertia
as the rotational resistance quantity sets up the natural extension to
rotational kinetic energy, ½Iω², built on that same I.

## Tutor Actions

WORKED-EXAMPLE (α=τ/I computed for varying I; total KE computed for a
rolling wheel including both terms); ANALOGY (shopping cart vs.
merry-go-round resistance-to-acceleration comparison).

## Voice Teaching Notes

Listen for torque treated as directly equal to α, or kinetic energy
computed without the rotational term — the two direct misconception
tells. Load-bearing sentence: "angular acceleration is torque DIVIDED by
moment of inertia, never mass — and a spinning or rolling object has
BOTH translational and rotational kinetic energy." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner computing α without dividing by I (or using mass instead)
signals MC-ALPHA-EQUALS-TORQUE (MISCONCEIVING, full repair via the
varying-I comparison). A learner omitting rotational KE for a spinning/
rolling object signals MC-ROTATIONAL-KE-IGNORED (full repair via the
dual-term KE computation). Mastery trigger: correctly applying α=τ/I
with the correct I, AND correctly computing total KE including both
translational and rotational terms. Blueprint's assessment component
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the specific numbers for a second — in
τ=Iα, what quantity plays the role that MASS plays in F=ma?" (isolating
the correct rotational analog before computing). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (moment of inertia as rotational resistance; dual translational/
rotational energy) bound to procedure (τ=Iα and KE_total=½mv²+½Iω²
calculation). Interleave with `phys.mech.moment-of-inertia` and, once
authored, `phys.mech.angular-momentum`/`phys.mech.rolling-motion` (the
direct KG unlocks).

## Transfer Connections

Near: any rotational-acceleration or rolling-object energy problem,
including flywheels and wheels. Far: mechanical engineering (flywheel
energy storage systems relying directly on ½Iω²) and vehicle dynamics
(rolling resistance and wheel energy calculations in automotive
engineering). Real-world: understanding why a solid ball and a hollow
shell of the same mass/radius roll down a ramp at different speeds
(different I, different rotational KE share). Expert: rotational
dynamics as the complete rotational analog of linear mechanics
(F=ma↔τ=Iα, p=mv↔L=Iω).

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

- 2026-07-23 (physics EB Wave 10): initial authoring.

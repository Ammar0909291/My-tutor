# Center of Mass — `phys.mech.center-of-mass`

## Identity

- **Concept ID**: `phys.mech.center-of-mass` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.momentum` — the center of mass's velocity
  is what carries the system's total momentum, directly built on the
  already-secure momentum concept.
- **Unlocks** (from KG): `phys.mech.moment-of-inertia`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly compute the center of mass for a system of
point masses, and correctly explain that the center of mass need not
coincide with the system's geometric center unless mass is distributed
symmetrically; (2) correctly explain that for an isolated system (no net
external force), the center of mass moves at constant velocity (or stays
at rest) REGARDLESS of complex internal motions, collisions, or
explosions among the system's parts; (3) correctly distinguish the center
of mass's motion (governed by total momentum) from any individual part's
motion, which can be far more complex.

## Core Understanding

The center of mass of a system is the mass-weighted average position of
all its parts, x_cm = Σ(m_i x_i)/Σm_i — it coincides with the geometric
center only when mass is distributed symmetrically; an asymmetric mass
distribution (a wrench, a person with one arm raised, two unequal masses
connected by a rod) has its center of mass shifted toward the more massive
region, away from the simple geometric midpoint. The center of mass's
motion obeys a remarkably clean rule: for any isolated system (zero net
external force), the center of mass moves at constant velocity, no matter
how violently or chaotically the individual parts within the system
interact — internal explosions, collisions, and forces (which are all
internal, Newton's-Third-Law-paired, and therefore cancel in their net
effect on the system's total momentum) never change the center of mass's
straight-line, constant-velocity motion, even though individual pieces can
fly off in wildly different, complicated directions.

## Mental Models

**Beginner**: "Center of mass is just the geometric middle of an object."
Upgrade trigger: an asymmetric object (a baseball bat, heavy end vs.
handle) directly confronts this — its center of mass is visibly closer to
the heavy end, not the geometric midpoint.

**Intermediate**: "Center of mass is the mass-weighted average position;
for an isolated system, it moves at constant velocity regardless of
internal events." This model is correct but sometimes still expects an
internal explosion or collision to visibly "kick" the center of mass off
its straight-line path.

**Advanced**: "Internal forces are always Newton's-Third-Law pairs that
cancel exactly in their effect on total momentum — an explosion mid-flight
sends fragments in complicated individual paths, but their MASS-WEIGHTED
AVERAGE position continues exactly the parabolic (or straight-line, in the
absence of gravity) path the unexploded object would have followed."

**Expert**: center-of-mass motion as a direct consequence of Newton's third
law applied system-wide — the internal-force cancellation is not a special
rule but the same F=ma/momentum-conservation machinery already secured —
not required for mastery but worth naming explicitly.

## Why Students Fail

The dominant failure is the geometric-center default, applying "the
middle" as a visual/geometric judgment rather than a mass-weighted
calculation; a second, distinct failure is expecting internal events
(collisions, explosions) to alter the center of mass's overall trajectory.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.center-of-mass.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-COM-IS-GEOMETRIC-CENTRE**: center of mass assumed to always be the
  geometric middle regardless of mass distribution. **Birth type**:
  perceptual intuition (Type 2) — for symmetric, uniform-density objects
  (the most commonly pictured case), geometric center and center of mass
  DO coincide, and this coincidence is overgeneralized to all objects.
  Probe: "A baseball bat is much heavier at the barrel end than the handle
  end. Is its center of mass at the exact geometric midpoint of its
  length, or closer to one end?"
- **MC-COM-VELOCITY-SUM**: expecting an internal explosion or collision to
  change the center of mass's overall trajectory. **Birth type**:
  overgeneralization (Type 1) — individual fragment trajectories after an
  explosion visibly diverge dramatically, and this visible chaos is
  incorrectly extrapolated to the (invisible, unchanged) center-of-mass
  path. Probe: "A firework explodes mid-air into many fragments flying in
  different directions. Does the CENTER OF MASS of all those fragments
  together still follow the same simple parabolic path the unexploded
  firework would have followed?"

## Analogies

**Best**: a lopsided seesaw balance point — the exact point where the
seesaw balances is closer to the heavier side, not the geometric middle of
the plank, directly illustrating mass-weighting. Targets
MC-COM-IS-GEOMETRIC-CENTRE with a familiar, hands-on balance intuition.

**Alternative**: a firework's fragments scattering in every direction
while a marked "ghost point" (their collective average position) sails on
in the exact same smooth arc the unexploded shell would have traced — a
vivid, real demonstration of MC-COM-VELOCITY-SUM's correction.

**Anti-analogy**: do NOT say "center of mass is the middle of the object"
without qualifying "mass-weighted" — bare "middle" language directly
installs MC-COM-IS-GEOMETRIC-CENTRE.

## Demonstrations

Physical: balance a non-uniform object (a hammer, a bat) on a single
finger, showing the balance point is offset from the geometric midpoint —
directly targets MC-COM-IS-GEOMETRIC-CENTRE. Digital/video: slow-motion
footage of an object exploding mid-flight (a firework, or a thrown object
rigged to split) with the center-of-mass trajectory overlaid, showing its
smooth, unperturbed path — directly targets MC-COM-VELOCITY-SUM.

## Discovery Questions

Discovery-style: "where does this lopsided object balance — exactly in
the middle, or somewhere else?" — learner predicts and tests via the
finger-balance demonstration, directly confronting
MC-COM-IS-GEOMETRIC-CENTRE.

## Teaching Sequence

Blueprint's Teaching Action Sequence cited by reference.
MC-COM-IS-GEOMETRIC-CENTRE repaired first via the finger-balance
demonstration (establishing mass-weighting concretely), before
MC-COM-VELOCITY-SUM, since trusting the mass-weighted-average DEFINITION
first makes trusting its smooth, internal-force-independent MOTION a more
natural next step.

## Tutor Actions

DEMONSTRATION (finger-balance for an asymmetric object; exploding-projectile
footage); WORKED-EXAMPLE (computing center of mass for an asymmetric
two-point system); THOUGHT-EXPERIMENT (imagining the firework's fragment
paths vs. their collective average).

## Voice Teaching Notes

Listen for "the middle" used without mass-weighting qualification when a
learner describes center of mass for an asymmetric object — the
MC-COM-IS-GEOMETRIC-CENTRE tell. Load-bearing sentence: "center of mass is
the MASS-WEIGHTED average position — it shifts toward wherever the mass
is concentrated." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner locating center of mass at the exact geometric midpoint of a
visibly asymmetric object signals MC-COM-IS-GEOMETRIC-CENTRE
(MISCONCEIVING, full repair via finger-balance). Mastery trigger: correct
center-of-mass calculation for an asymmetric system AND correctly
predicting that an internal explosion doesn't alter the overall
center-of-mass trajectory. Blueprint's assessment component cited for the
full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the whole object for a second — where's most
of the mass concentrated?" (isolating the mass-weighting intuition before
the formal calculation). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (mass-weighting; internal-force independence) bound to procedure
(x_cm calculation). Interleave with `phys.mech.momentum` and, once
authored, `phys.mech.moment-of-inertia`.

## Transfer Connections

Near: any asymmetric-mass or multi-fragment system problem, including
rocket-stage separation. Far: structural engineering (balance points in
construction, vehicle design for stability) and figure skating/diving
(athletes manipulate their body's center of mass and moment of inertia
deliberately). Real-world: why a loaded moving truck's balance point
matters for handling and rollover risk. Expert: center-of-mass motion as a
direct consequence of Newton's third law applied system-wide.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine, and its
Teaching Action Sequence / assessment components by reference. Not
restated: Concept Identity, Worked Examples, Session Architecture,
Adaptive Flags, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

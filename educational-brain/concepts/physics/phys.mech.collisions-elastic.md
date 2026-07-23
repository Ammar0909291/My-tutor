# Elastic Collisions — `phys.mech.collisions-elastic`

## Identity

- **Concept ID**: `phys.mech.collisions-elastic` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.conservation-of-momentum`,
  `phys.mech.kinetic-energy` — elastic collisions apply BOTH already-secure
  conservation laws simultaneously, the defining feature that
  distinguishes them from other collision types.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly identify that an elastic collision
requires BOTH momentum conservation AND kinetic energy conservation —
momentum conservation alone holds for ANY isolated collision, but KE
conservation is the ADDITIONAL condition specific to elastic collisions,
and must be verified/assumed explicitly, not applied automatically to
every collision (billiard balls approximately qualify; bouncing rubber
balls and sticking collisions do not); (2) correctly compute that in a
1D head-on elastic collision between EQUAL masses (one initially at
rest), the FIRST object STOPS and the SECOND moves at the first's
original speed — NOT both objects stopping.

## Core Understanding

An elastic collision is defined by TWO conditions holding simultaneously:
total momentum is conserved (true for ANY isolated collision, elastic or
not) AND total kinetic energy is conserved (an ADDITIONAL, specific
requirement true only for elastic collisions). Before applying KE
conservation to any collision, this second condition must be explicitly
verified or assumed based on context — billiard ball collisions
approximately qualify (hard, rigid spheres, minimal permanent
deformation), while a bouncing rubber ball (loses 20-30% of KE to heat/
deformation) and a clay lump sticking to a surface (loses ALL relative
KE) do not; true elastic collisions are common at the atomic/subatomic
scale (gas molecule collisions, neutron scattering) but are only
APPROXIMATIONS for everyday macroscopic objects. A specific, often
counterintuitive result: in a 1D head-on elastic collision between EQUAL
masses where the second object starts at rest, the FIRST object comes to
a complete STOP and the SECOND object moves off at exactly the first
object's original speed — this is the well-known "billiard ball" or
"cue ball" result (the cue ball stops; the target ball moves) — NOT both
objects stopping (which would violate momentum conservation, since the
system's total momentum was nonzero before the collision and cannot
become zero afterward).

## Mental Models

**Beginner**: "Kinetic energy conservation applies to all collisions,
including bouncing balls and any collision in general; in an equal-mass
elastic collision, both balls stop." Upgrade trigger: computing actual KE
before and after a rubber-ball bounce or clay-sticking collision (finding
KE genuinely lost) directly confronts the universal-KE-conservation
assumption; applying the elastic-collision formulas to the equal-mass
case, finding the FIRST object's final velocity is exactly zero while the
SECOND moves at the original speed, directly confronts the
both-stop assumption.

**Intermediate**: "Elastic collisions require verifying BOTH momentum and
KE conservation; equal-mass elastic collision with one at rest means
velocities EXCHANGE — the first stops, the second takes over its
velocity." This model correctly captures both core results, but
sometimes still assumes KE conservation by default without checking the
collision type stated or implied by the problem.

**Advanced**: "Before writing any collision equation, explicitly
determine the collision TYPE (elastic, inelastic, perfectly inelastic)
from context — never assume KE conservation as a default; for elastic
collisions, use both conservation equations together to solve for both
final velocities."

**Expert**: elastic collisions as an idealization only exactly valid for
truly rigid, non-deformable bodies (or quantum-mechanical particles) —
a natural physical-limits consolidation, not required for mastery.

## Why Students Fail

The dominant failure is applying KE conservation to every collision
without first checking whether the collision is actually elastic (versus
inelastic, where KE is genuinely lost to heat/deformation); a second,
distinct failure is expecting both objects to stop in an equal-mass
elastic collision, rather than recognizing the velocity-exchange result.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.collisions-elastic.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ALL-COLLISIONS-ELASTIC**: applying KE conservation to all
  collisions, or assuming a bouncing ball undergoes an elastic collision.
  **Birth type**: overgeneralization (Type 1) — momentum conservation's
  universal validity (true for any isolated collision) is incorrectly
  extended to KE conservation, which is a genuinely ADDITIONAL,
  collision-type-specific condition. Probe: "A rubber ball bounces off
  the floor, losing some height on each bounce. Is kinetic energy
  conserved in this collision?"
- **MC-ELASTIC-EQUAL-MASSES-BOTH-STOP**: believing that in an equal-mass
  elastic collision, both balls stop, confusing this with the actual
  stationary result. **Birth type**: overgeneralization (Type 1) — the
  correct result that one object stops is loosely misremembered as "the
  collision stops everything," rather than the specific velocity-exchange
  mechanism where the SECOND object takes over the motion. Probe: "In a
  head-on elastic collision, a moving ball hits an identical ball at
  rest. After the collision, do BOTH balls stop, or does something else
  happen?"

## Analogies

**Best**: Newton's cradle — the classic desktop toy where one ball
striking a row of identical balls causes ONLY the far end ball to swing
out, while the striking ball and the middle balls stop — a direct,
familiar demonstration of the equal-mass elastic velocity-exchange
mechanism — directly targets MC-ELASTIC-EQUAL-MASSES-BOTH-STOP.

**Anti-analogy**: do NOT say "kinetic energy is conserved in collisions"
as an unqualified general statement — this directly invites
MC-ALL-COLLISIONS-ELASTIC by omitting the elastic-specific qualifier.

## Demonstrations

Physical/data-based: compute KE before and after a rubber-ball bounce
(showing genuine loss) versus a billiard-ball-style collision
(approximately conserved) — directly targets MC-ALL-COLLISIONS-ELASTIC.
Worked-example: solve the equal-mass 1D elastic collision formulas
explicitly (v₁f=0, v₂f=v₁ᵢ), verifying both momentum AND KE are
conserved — directly targets MC-ELASTIC-EQUAL-MASSES-BOTH-STOP.

## Discovery Questions

Discovery-style: "in Newton's cradle, when one ball swings in and hits
the row, does the striking ball also swing out on the other side, or
does something else happen?" — learner reasons through the equal-mass
elastic result, directly confronting
MC-ELASTIC-EQUAL-MASSES-BOTH-STOP.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-ALL-COLLISIONS-ELASTIC is addressed first (establishing that KE
conservation must be verified, not assumed), before
MC-ELASTIC-EQUAL-MASSES-BOTH-STOP, since correctly committing to solve
the elastic-collision equations (rather than defaulting to momentum-only)
is the prerequisite for then correctly working through the specific
equal-mass result.

## Tutor Actions

WORKED-EXAMPLE (KE computed before/after a rubber-ball bounce vs. a
billiard-ball collision; equal-mass elastic collision formulas solved
explicitly); DEMONSTRATION (Newton's cradle mapped explicitly onto the
velocity-exchange result).

## Voice Teaching Notes

Listen for KE conservation applied without checking collision type, or an
expectation that both objects stop in an equal-mass elastic collision —
the two direct misconception tells. Load-bearing sentence: "momentum is
always conserved, but kinetic energy conservation is the EXTRA condition
that makes a collision elastic — and in an equal-mass case, the moving
ball stops while the other one takes over, they don't both stop."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner applying KE conservation to a clearly non-elastic collision
signals MC-ALL-COLLISIONS-ELASTIC (MISCONCEIVING, full repair via the
KE-before/after computation). A learner claiming both objects stop in an
equal-mass elastic collision signals
MC-ELASTIC-EQUAL-MASSES-BOTH-STOP (full repair via the Newton's-cradle
demonstration). Mastery trigger: correctly verifying both conservation
conditions before applying elastic-collision equations, AND correctly
solving the equal-mass case showing velocity exchange. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget kinetic energy for a second — is momentum
ALWAYS conserved in a collision, or only sometimes?" (isolating the
universal momentum-conservation fact before introducing the
elastic-specific KE condition). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (dual-condition elastic definition; equal-mass velocity
exchange) bound to procedure (solving the paired conservation
equations). Interleave with `phys.mech.conservation-of-momentum`,
`phys.mech.kinetic-energy`, and `phys.mech.collisions-inelastic` (sibling
concept at this same dependency level, a direct contrast case).

## Transfer Connections

Near: any elastic-collision-calculation problem, including billiards and
Newton's cradle physics. Far: particle physics (elastic scattering
experiments, e.g. neutron scattering, used to probe nuclear structure)
and gas kinetic theory (molecular collisions modeled as elastic to derive
pressure and temperature relationships). Real-world: understanding why
billiard/pool games rely on approximately elastic ball collisions for
predictable shot outcomes. Expert: elastic collisions as an idealization
strictly valid only for rigid or quantum-mechanical bodies.

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

# Rolling Without Slipping — `phys.mech.rolling-motion`

## Identity

- **Concept ID**: `phys.mech.rolling-motion` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 11.
- **Prerequisites**: `phys.mech.rotational-dynamics`,
  `phys.mech.kinetic-energy` — rolling motion combines the already-secure
  rotational and translational kinetic energy concepts into one coupled
  system linked by the rolling-without-slipping constraint v=ωr.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that in a race down a ramp between
objects of different shapes, the WINNER is determined by the shape
factor β (relating I to mr², e.g. β=2/5 for a solid sphere, β=1/2 for a
solid cylinder, β=1 for a hoop) — NOT by mass or radius, which cancel out
of the result entirely; a heavier or larger object does NOT automatically
roll faster; (2) correctly compute total kinetic energy for a rolling
object as KE_total=½mv²+½Iω² (BOTH terms), NOT ½mv² alone — treating
rolling as equivalent to simple sliding and using only ½mv² systematically
overcounts the energy available for translation, giving an incorrectly
high predicted speed at the bottom of a ramp.

## Core Understanding

In a race down an incline between differently-SHAPED rolling objects
(solid sphere vs. solid cylinder vs. hoop, etc.), the WINNER is
determined entirely by the shape factor β (defined via I=βmr², e.g.
β=2/5 for a solid sphere, β=1/2 for a solid cylinder, β=1 for a thin
hoop) — objects with SMALLER β convert a larger fraction of their
gravitational PE into TRANSLATIONAL kinetic energy (rather than
rotational), reaching the bottom faster; crucially, MASS and RADIUS
completely CANCEL OUT of the final speed/acceleration result (verified by
working through the full energy-conservation derivation) — a heavier or
larger ball does NOT automatically win against a smaller or lighter one
of the SAME shape (same β); only the shape (mass distribution pattern)
matters. A second, equally fundamental point concerns rolling's ENERGY
budget: an object rolling without slipping has BOTH translational kinetic
energy (½mv², from its center-of-mass motion) AND rotational kinetic
energy (½Iω², from its spin about its own axis) SIMULTANEOUSLY — treating
rolling as equivalent to simple sliding and using only ½mv² (reasoning
that "the rotation is internal, it doesn't count") is a serious error
that OVERCOUNTS the energy actually available for translation, since
part of the total energy budget is genuinely tied up in rotation; this
error produces a systematically too-high predicted final speed at the
bottom of a ramp, since it fails to account for the energy the object
must "spend" on spinning up.

## Mental Models

**Beginner**: "A heavier or larger ball rolls down a ramp faster — mass
and radius determine the winner; rolling is basically the same as
sliding, so KE=½mv² covers everything." Upgrade trigger: comparing two
different-mass balls of the SAME shape (same β), finding identical
race outcomes regardless of mass, directly confronts the mass-determines-
winner assumption; computing actual final speed using BOTH ½mv²+½Iω²
versus ½mv² alone (finding the correct answer is LOWER, since energy is
shared with rotation) directly confronts the rolling-equals-sliding
assumption.

**Intermediate**: "Race outcome depends only on shape factor β, with mass
and radius canceling out; total KE for a rolling object always includes
both ½mv² AND ½Iω²." This model correctly captures both core results,
but sometimes still forgets the rotational term when a problem's framing
emphasizes only the object's linear motion.

**Advanced**: "Before predicting a rolling race outcome, identify each
object's shape factor β specifically — never assume mass or radius
matters; before computing any rolling object's total energy, always
include BOTH kinetic energy terms, treating the rolling constraint v=ωr
as linking (not eliminating) the rotational contribution."

**Expert**: the full energy-conservation derivation,
mgh=½mv²(1+β), directly showing how β alone determines the final
speed/acceleration fraction relative to frictionless sliding — a natural
mathematical consolidation, not required for mastery.

## Why Students Fail

The dominant failure is expecting a heavier or larger object to win a
rolling race, rather than recognizing shape factor β (independent of
mass and radius) as the true determinant; a second, distinct failure is
treating rolling motion's kinetic energy as identical to simple sliding
(½mv² alone), missing the additional, genuinely separate rotational
kinetic energy contribution.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.rolling-motion.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-SAME-RACE**: believing a heavier or larger object rolls down a
  ramp faster — that mass and radius determine the winner. **Birth
  type**: overgeneralization (Type 1) — everyday intuition (heavier
  objects "should" have more momentum/speed, in vague, unexamined terms)
  is incorrectly extended to rolling races, where mass and radius
  provably cancel out of the result, leaving only the shape factor β as
  the determinant. Probe: "A large, heavy solid sphere and a small, light
  solid sphere (both solid spheres — same shape) race down the same
  ramp. Does the heavier/larger one win?"
- **MC-ROLLING-SAME-AS-SLIDING**: using only ½mv² (ignoring ½Iω²) for a
  rolling object, reasoning that "the rotation is inside the ball, it
  doesn't count." **Birth type**: overgeneralization (Type 1) — the
  simpler kinetic energy formula for pure translation (sufficient for
  sliding, non-rotating objects) is incorrectly assumed complete for
  rolling objects, missing the genuinely separate rotational energy
  contribution the rolling constraint requires. Probe: "A ball rolls
  without slipping down a ramp. Is its total kinetic energy just ½mv²,
  or does rolling add another energy term?"

## Analogies

**Best**: comparing a solid sphere, a solid cylinder, and a hollow hoop
(all released simultaneously from the same height on identical ramps) —
the sphere wins, then the cylinder, then the hoop, REGARDLESS of their
individual masses or sizes, since only their shape (β) differs — directly
targets MC-SAME-RACE by giving a concrete, shape-only-determines-outcome
demonstration.

**Anti-analogy**: do NOT say "a rolling object's kinetic energy is just
like a sliding object's" as a simplifying bridge — this directly installs
MC-ROLLING-SAME-AS-SLIDING by erasing the essential rotational
contribution.

## Demonstrations

Physical/conceptual: race a solid sphere, solid cylinder, and hoop of
DIFFERENT masses and radii down identical ramps, observing the outcome
depends only on shape — directly targets MC-SAME-RACE. Worked-example:
compute final speed at the bottom of a ramp using mgh=½mv²(1+β) versus
the naive mgh=½mv² alone, showing the naive approach overestimates speed
— directly targets MC-ROLLING-SAME-AS-SLIDING.

## Discovery Questions

Discovery-style: "if you race a big, heavy solid ball against a small,
light solid ball (both solid spheres) down the same ramp, which one
reaches the bottom first?" — learner reasons through the
mass-and-radius-cancel result, directly confronting MC-SAME-RACE.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-ROLLING-SAME-AS-SLIDING is addressed first (establishing the correct
dual-term KE budget for any rolling object), before MC-SAME-RACE, since
correctly setting up the full energy-conservation equation
(mgh=½mv²+½Iω², with I=βmr² and v=ωr) is the prerequisite for then
deriving that mass and radius cancel, leaving only β as the racing
determinant.

## Tutor Actions

WORKED-EXAMPLE (mgh=½mv²(1+β) derived and solved, showing mass/radius
cancellation; naive vs. correct final-speed comparison); DEMONSTRATION
(shape race: sphere vs. cylinder vs. hoop, varying mass/radius).

## Voice Teaching Notes

Listen for "heavier/bigger wins the race" or KE computed using only
½mv² for a rolling object — the two direct misconception tells.
Load-bearing sentence: "only the SHAPE decides who wins a rolling race —
mass and size cancel out completely; and rolling always means BOTH
translational AND rotational kinetic energy." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting a heavier/larger object wins a same-shape rolling
race signals MC-SAME-RACE (MISCONCEIVING, full repair via the varied-
mass/radius same-shape race). A learner computing rolling KE using only
½mv² signals MC-ROLLING-SAME-AS-SLIDING (full repair via the naive-vs-
correct speed comparison). Mastery trigger: correctly identifying shape
factor β as the sole racing determinant, AND correctly computing total
rolling KE including both terms. Blueprint's assessment component cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget mass and radius for a second — are these two
objects actually the SAME SHAPE (same β)?" (isolating the shape-factor
comparison before predicting a race outcome). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (shape-factor-only race determination; dual translational/
rotational rolling energy) bound to procedure (mgh=½mv²(1+β)
calculation). Interleave with `phys.mech.rotational-dynamics` and
`phys.mech.kinetic-energy`.

## Transfer Connections

Near: any rolling-object race or energy-calculation problem. Far:
mechanical engineering (wheel and flywheel design optimizing shape
factor for specific rolling/energy-storage applications) and sports
physics (bowling ball design exploiting rolling dynamics). Real-world:
understanding why a solid rubber ball rolls down a hill faster than a
hollow ball of the same size and mass, purely due to shape. Expert: the
full energy-conservation derivation mgh=½mv²(1+β).

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

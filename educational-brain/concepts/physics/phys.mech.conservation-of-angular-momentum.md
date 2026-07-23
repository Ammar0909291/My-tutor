# Conservation of Angular Momentum — `phys.mech.conservation-of-angular-momentum`

## Identity

- **Concept ID**: `phys.mech.conservation-of-angular-momentum` (canonical
  physics KG)
- **Curriculum location**: physics / mechanics — dependency level 12.
- **Prerequisites**: `phys.mech.angular-momentum` — conservation of
  angular momentum applies the already-secure L=Iω relationship to the
  case of ZERO net external torque, the rotational analog of linear
  momentum conservation.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that a spinning skater speeding up
by pulling her arms in requires NO external torque or "pushing off" —
her angular momentum L=Iω is conserved (no external torque acts), so
DECREASING I (arms in) directly FORCES ω to increase proportionally,
purely an internal redistribution, not an externally-caused speedup;
(2) correctly explain that conservation of angular momentum does NOT
imply conservation of rotational kinetic energy — when the skater pulls
her arms in, L=Iω stays constant, but KE=½Iω²=L²/(2I) genuinely
INCREASES as I decreases (since L is fixed and I drops), meaning the
skater's own muscular work (pulling arms in against the centrifugal
tendency) is the source of this increased KE, not a violation of energy
accounting.

## Core Understanding

A spinning skater who pulls her arms inward speeds up WITHOUT any
external torque or push-off force — this is a direct, purely internal
consequence of angular momentum conservation: with no external torque
acting (ice friction is negligible, gravity acts through the rotation
axis), L=Iω remains exactly constant throughout; as the skater pulls her
arms in, her moment of inertia I DECREASES (mass redistributed closer to
the rotation axis), and since L=Iω must stay fixed, ω MUST increase
proportionally to compensate — no external agent "pushes" her faster;
the speedup is a direct, internal mechanical consequence of the
conservation law itself. A second, equally important and easily
conflated point: conservation of ANGULAR MOMENTUM does NOT imply
conservation of ROTATIONAL KINETIC ENERGY — these are genuinely
different, independently-tracked quantities. As the skater pulls her
arms in, L=Iω stays constant, but rotational KE=½Iω²=L²/(2I) actually
INCREASES as I decreases (since L² is fixed in the numerator while I
shrinks in the denominator) — computing ω_f using BOTH L-conservation
AND KE-conservation simultaneously is an over-constrained, WRONG
approach, since KE genuinely changes; the correct method uses ONLY
angular momentum conservation to find the new ω, and the resulting KE
increase is explained by the skater's OWN muscular work done against the
effective centrifugal tendency while pulling her arms in — this work is
the genuine energy source for the increased rotational KE, fully
consistent with overall energy conservation once her internal muscular
work is properly included.

## Mental Models

**Beginner**: "The skater speeds up because she pushes off the ice or
exerts some external force; conservation of angular momentum also means
rotational kinetic energy stays the same." Upgrade trigger: identifying
that NO external torque acts during the arm-pulling maneuver (ice
friction negligible, gravity through the axis) directly confronts the
external-force assumption; computing KE=L²/(2I) explicitly before and
after arm-pulling, finding it genuinely INCREASES, directly confronts the
KE-conservation assumption.

**Intermediate**: "With zero external torque, L=Iω is conserved
internally — decreasing I forces ω to increase, no external push needed;
KE=L²/(2I) genuinely increases as I decreases, powered by the skater's
own muscular work." This model correctly captures both core results, but
sometimes still tries to apply KE conservation alongside L conservation
out of a general "energy is always conserved" habit without checking
which specific energy form applies.

**Advanced**: "Always verify whether external torque is genuinely zero
before invoking angular momentum conservation; once confirmed, use L
conservation ALONE to solve for the new angular velocity — never add a
separate KE-conservation constraint, since rotational KE is generally NOT
conserved when I changes."

**Expert**: the precise energy accounting — the skater's internal
muscular work exactly equals the rotational KE increase — connecting
directly to the broader principle that internal, non-external forces
can still do net work on a system's kinetic energy even while angular
momentum (an externally-torque-governed quantity) remains fixed — a
natural consolidation, not required for mastery.

## Why Students Fail

The dominant failure is assuming an external force or push is needed to
explain the skater's speedup, missing that internal mass redistribution
alone (with zero external torque) forces the speedup via L conservation;
a second, distinct failure is assuming rotational KE is also conserved
alongside angular momentum, over-constraining the problem and missing
that KE genuinely changes (powered by internal muscular work).

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.conservation-of-angular-momentum.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ANGULAR-SPEED-FREE**: believing "a spinning skater speeds up
  because she is pushing off the ice or exerting an external force."
  **Birth type**: overgeneralization (Type 1) — everyday experience of
  speeding up (usually requiring an external push) is incorrectly
  extended to this internally-driven speedup, missing that L
  conservation alone (with I decreasing) forces ω to increase without
  any external agent. Probe: "A skater spinning with arms extended pulls
  them in and speeds up. Is any external force or torque required to
  cause this speedup?"
- **MC-KE-CONSERVED-ROTATION**: believing "conservation of angular
  momentum also means rotational KE is conserved," computing ω_f using
  both L and KE conservation simultaneously. **Birth type**:
  overgeneralization (Type 1) — the general principle "energy is always
  conserved" (true for TOTAL energy including the skater's own metabolic/
  muscular energy) is incorrectly extended to ROTATIONAL KE alone being
  conserved, which it is not, since I changes. Probe: "As the skater
  pulls her arms in (I decreases, ω increases, L constant), does her
  rotational kinetic energy stay the same, increase, or decrease?"

## Analogies

**Best**: a ball on a string being reeled in while swinging in a
horizontal circle — as the string shortens (analogous to I decreasing),
the ball speeds up, with NO external tangential force applied — purely a
consequence of angular momentum conservation as the radius shrinks —
directly targets MC-ANGULAR-SPEED-FREE by giving a concrete, externally-
force-free speedup precedent.

**Anti-analogy**: do NOT say "energy is conserved, so the skater's
rotational KE stays the same" as a bridging simplification — this
directly installs MC-KE-CONSERVED-ROTATION by conflating total energy
conservation with rotational-KE conservation specifically.

## Demonstrations

Conceptual: identify all torques acting on the skater during arm-pulling
(ice friction negligible, gravity through axis — net external torque
zero), confirming L=Iω is conserved with no external agent — directly
targets MC-ANGULAR-SPEED-FREE. Worked-example: compute KE=L²/(2I) before
and after arm-pulling explicitly, showing a genuine increase — directly
targets MC-KE-CONSERVED-ROTATION.

## Discovery Questions

Discovery-style: "does a spinning skater need the ice to push her, or
someone to shove her, in order to speed up when she pulls her arms in?"
— learner reasons through the zero-external-torque condition, directly
confronting MC-ANGULAR-SPEED-FREE.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-ANGULAR-SPEED-FREE is addressed first (establishing L conservation
with zero external torque as the sole mechanism), before
MC-KE-CONSERVED-ROTATION, since correctly committing to L-conservation-
only as the solving method is the prerequisite for then correctly
computing (and being surprised by) the resulting KE change.

## Tutor Actions

WORKED-EXAMPLE (torque identification confirming zero external torque;
KE=L²/(2I) computed before/after arm-pulling); ANALOGY (ball on a
shortening string, speeding up with no external tangential force).

## Voice Teaching Notes

Listen for "she pushes off to speed up" or an assumption that rotational
KE stays constant — the two direct misconception tells. Load-bearing
sentence: "no external push needed — pulling her arms in alone forces
her to spin faster to keep L constant; and her kinetic energy actually
goes UP, powered by her own muscles." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner attributing the skater's speedup to an external push signals
MC-ANGULAR-SPEED-FREE (MISCONCEIVING, full repair via the zero-torque
identification). A learner assuming rotational KE stays constant
alongside L signals MC-KE-CONSERVED-ROTATION (full repair via the
KE=L²/(2I) computation). Mastery trigger: correctly explaining the
speedup via L conservation with zero external torque, AND correctly
computing the genuine KE increase. Blueprint's assessment component
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the arms for a second — is there ANY
external force or torque acting on the skater as she spins on
frictionless ice?" (isolating the zero-external-torque condition before
discussing the mechanism). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (internally-driven speedup via L conservation; genuine KE
change powered by internal work) bound to procedure (L=Iω conservation
and KE=L²/(2I) calculation). Interleave with `phys.mech.angular-momentum`.

## Transfer Connections

Near: any spinning-object I-change problem, including figure skating and
diving. Far: astrophysics (neutron star spin-up as they collapse and
shrink, a direct astronomical analog) and mechanical engineering
(reaction wheels and gyroscopic devices in spacecraft attitude control).
Real-world: understanding why divers and gymnasts tuck their bodies to
spin faster mid-air, and extend to slow down before entry/landing.
Expert: the precise energy accounting connecting internal muscular work
to the rotational KE increase.

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

- 2026-07-23 (physics EB Wave 12): initial authoring.

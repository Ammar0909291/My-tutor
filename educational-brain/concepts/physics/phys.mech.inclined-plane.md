# Motion on Inclined Planes — `phys.mech.inclined-plane`

## Identity

- **Concept ID**: `phys.mech.inclined-plane` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 8.
- **Prerequisites**: `phys.mech.friction`, `phys.mech.normal-force` — the
  load-bearing skill is resolving weight into components along/
  perpendicular to a tilted surface, then applying the already-secure
  friction (f = μN) and normal-force reasoning to that tilted geometry.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly resolve gravity into components parallel
(mg sinθ) and perpendicular (mg cosθ) to an inclined surface, and
correctly compute the normal force as N = mg cosθ — NOT mg, since the
incline only supports the perpendicular component of weight;
(2) correctly compute friction as f = μN = μmg cosθ, explaining why using
the full weight (f = μmg) overstates friction at any nonzero angle and
predicts a nonzero friction force even on a vertical wall where N = 0;
(3) correctly determine friction's direction by checking the block's
actual (or impending) motion relative to the surface — friction always
opposes that relative motion/tendency, never fixed "up the slope."

## Core Understanding

On an inclined plane, gravity (mg, straight down) must be resolved into
two components relative to the tilted surface: mg sinθ (parallel to the
slope, driving sliding) and mg cosθ (perpendicular to the slope, pressing
the object into the surface). The normal force N exactly balances only
the PERPENDICULAR component, so N = mg cosθ — NOT the full weight mg,
which is the constant value only for a perfectly horizontal (θ=0)
surface. Since friction depends on N (f = μN), friction on an incline is
f = μmg cosθ, smaller than μmg at any nonzero angle — using the bare
weight in the friction formula both overstates the actual friction and
breaks down entirely at θ=90° (a vertical wall), where cosθ=0 gives the
physically correct N=0 (nothing presses the object against a purely
vertical wall from gravity alone) but the naive f=μmg formula would
wrongly predict a large nonzero friction holding an unsupported object in
place. Friction's DIRECTION is not fixed relative to the incline — it
always opposes the object's actual or impending relative motion: sliding
down means friction acts up the slope; sliding (or being pushed) up means
friction acts down the slope; the direction must be determined case-by-case,
never memorized as a fixed "friction acts up the incline" rule.

## Mental Models

**Beginner**: "Normal force on an incline equals the object's full weight,
just like on flat ground; friction always acts up the slope." Upgrade
trigger: computing N at θ=90° (a vertical wall) using N=mg cosθ (giving
zero) versus the naive N=mg (giving a large nonzero value) directly
confronts both errors — a vertical wall obviously provides no support
against gravity alone.

**Intermediate**: "N = mg cosθ (not mg); friction = μN, direction opposes
actual/impending relative motion, not fixed up the slope." This model
correctly resolves both core errors, but sometimes still defaults to
friction pointing "up the slope" out of habit when working problems
without pausing to check the specific motion direction.

**Advanced**: "Every inclined-plane problem starts by explicitly resolving
weight into components perpendicular and parallel to the surface, THEN
determining the actual or impending direction of relative sliding before
assigning friction's direction — never applying either step from
memorized templates."

**Expert**: inclined-plane problems as a specific instance of choosing a
rotated (tilted) coordinate system to simplify a constraint-force
problem — a technique generalizing directly to arbitrary constraint
surfaces — not required for mastery.

## Why Students Fail

The dominant failure is using the full weight mg (instead of mg cosθ) in
the friction formula, since mg is the more familiar, "default" value from
flat-ground problems; a second, distinct failure is assuming friction
always points up the slope, rather than checking the object's actual
direction of motion or impending motion.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.inclined-plane.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-FRICTION-WRONG-N**: computing friction as f = μmg (using full
  weight) instead of f = μmg cosθ (using the correct perpendicular
  component). **Birth type**: overgeneralization (Type 1) — the
  flat-ground formula f = μmg (where N genuinely equals mg) is
  incorrectly extended to inclines, where N is instead the smaller
  perpendicular component. Probe: "A block sits on a 30° incline. Is the
  normal force equal to its full weight mg, or something smaller?"
- **MC-FRICTION-DIRECTION**: assuming friction always acts up the slope,
  regardless of the object's actual direction of motion. **Birth type**:
  overgeneralization (Type 1) — the common textbook example (a block
  sliding DOWN, where friction genuinely acts up) is memorized as a fixed
  rule rather than understood as a consequence of opposing THAT
  particular motion direction. Probe: "A block is being pushed UP a
  rough incline. Which direction does friction act on it — up the slope
  or down?"

## Analogies

**Best**: leaning a ladder against a wall at different angles — the
ladder's base only presses into the ground with a fraction of its weight
that depends on the lean angle, never the full weight, directly
paralleling how an incline's normal force depends on cosθ — targets
MC-FRICTION-WRONG-N by giving a familiar, visual angle-dependence example.

**Anti-analogy**: do NOT say "friction always resists the incline" as an
unqualified shorthand — this vague phrasing invites
MC-FRICTION-DIRECTION by not specifying WHICH motion friction resists
(the object's actual motion, which can be either up or down the slope).

## Demonstrations

Physical/conceptual: compute N = mg cosθ at θ=0° (flat, N=mg), θ=30°
(N=0.866mg), and θ=90° (vertical wall, N=0) side by side, directly
targeting MC-FRICTION-WRONG-N with the vertical-wall limiting case as the
clearest confrontation. Worked-example pair: the SAME incline and block,
once sliding down (friction up) and once being pushed up (friction down),
directly targeting MC-FRICTION-DIRECTION via contrast.

## Discovery Questions

Discovery-style: "does a block pressed against a perfectly vertical wall
(no other support) experience any friction from its own weight alone?" —
learner reasons through N=mg cos90°=0, directly confronting
MC-FRICTION-WRONG-N via the limiting case.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-FRICTION-WRONG-N
is addressed first (establishing the N=mg cosθ resolution), before
MC-FRICTION-DIRECTION, since correctly finding N is the prerequisite
input to computing friction's magnitude, after which its direction (the
second, independent question) can be addressed via the motion-direction
check.

## Tutor Actions

WORKED-EXAMPLE (N and f computed at several incline angles including the
vertical-wall limit; block sliding down vs. pushed up, friction direction
contrasted); THOUGHT-EXPERIMENT (the vertical-wall limiting case).

## Voice Teaching Notes

Listen for "friction equals μ times weight" (skipping cosθ) or "friction
always points up the slope" — the two direct misconception tells.
Load-bearing sentence: "the incline only supports the PERPENDICULAR part
of the weight — that's what N actually is." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner using f = μmg (no cosθ) on an incline signals
MC-FRICTION-WRONG-N (MISCONCEIVING, full repair via the vertical-wall
limiting case). A learner drawing friction up the slope for an object
being pushed up signals MC-FRICTION-DIRECTION (full repair via the
side-by-side motion-direction contrast). Mastery trigger: correctly
computing N = mg cosθ and f = μN for any incline angle, AND correctly
determining friction's direction from the actual motion. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the angle for a second — is this block
sliding DOWN the slope, or being pushed/sliding UP it?" (isolating the
motion-direction check before assigning friction's direction). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (component resolution on a tilted surface; motion-direction-
dependent friction) bound to procedure (N=mg cosθ, f=μN calculation).
Interleave with `phys.mech.friction` and `phys.mech.normal-force` (the
two direct prerequisites).

## Transfer Connections

Near: any incline-based force problem, including ramps and wedges. Far:
civil engineering (road grade and retaining-wall friction design) and
mechanical engineering (conveyor belt incline limits before slipping
occurs). Real-world: understanding why steep wet ramps become
dangerously slippery (reduced effective μ combined with reduced N at
steep angles compounds the effect). Expert: rotated-coordinate-system
technique generalizing to arbitrary constraint-surface problems.

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

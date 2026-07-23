# Kinetic Energy — `phys.mech.kinetic-energy`

## Identity

- **Concept ID**: `phys.mech.kinetic-energy` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.work` — the load-bearing part is the
  work-energy connection: kinetic energy is defined via, and changes
  according to, the net work done, not as an independent starting
  concept.
- **Unlocks** (from KG): `phys.mech.collisions-elastic`,
  `phys.mech.conservation-of-energy`, `phys.mech.rolling-motion`,
  `phys.mech.work-energy-theorem` — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) state KE = ½mv² and correctly explain that kinetic
energy scales with the SQUARE of speed, not linearly — doubling speed
quadruples kinetic energy, not doubles it; (2) correctly compute kinetic
energy and correctly reason about how it changes under a given
speed-change factor; (3) correctly explain why kinetic energy can never be
negative (it depends on v², always non-negative, regardless of the
direction of motion).

## Core Understanding

Kinetic energy, KE = ½mv², is the energy an object possesses due to its
motion, and its defining mathematical feature — the squared dependence on
speed — means it grows much faster than speed itself: doubling speed
doesn't double kinetic energy, it QUADRUPLES it (2² = 4), and tripling
speed produces nine times the kinetic energy. This squared relationship
has real, high-stakes consequences (a car going twice as fast takes four
times the braking distance to dissipate that kinetic energy, all else
equal) and is the single most important quantitative fact this concept
teaches. Kinetic energy is always non-negative — since it depends on v²
(speed squared, direction-independent) rather than velocity itself, an
object moving in the "negative" direction on some axis still has positive,
never negative, kinetic energy.

## Mental Models

**Beginner**: "Kinetic energy depends on speed" (no specific relationship,
often implicitly assumed linear by analogy to other doubling-speed
scenarios like distance covered in fixed time). Upgrade trigger: braking
distance data (real, measurable) at different speeds directly confronts a
linear assumption.

**Intermediate**: "KE = ½mv², so doubling speed quadruples KE." This model
is correct and computational but sometimes applied only when explicitly
prompted with the formula, rather than as an automatic, load-bearing
intuition when reasoning about speed changes qualitatively.

**Advanced**: "The v² dependence is why speed limits and braking distances
scale so dramatically — small speed increases produce disproportionately
large kinetic-energy (and therefore stopping-distance and collision-
severity) increases," directly connecting the formula to real-world safety
consequences.

**Expert**: kinetic energy as the time-component of the relativistic
energy-momentum four-vector, with ½mv² as the low-speed (non-relativistic)
limiting case — not required for mastery.

## Why Students Fail

The dominant failure is linear-scaling default: "double the speed, double
the energy" is the intuitively simpler, more broadly-applicable-feeling
pattern (many everyday quantities DO scale linearly with speed, like
distance covered in a fixed time), silently overriding the specifically
quadratic KE relationship unless directly and repeatedly confronted.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.kinetic-energy.md`,
Misconception Engine, Priority 1-2) documents two; reused by reference
with birth-type added.

- **MC-KE-LINEAR** (Priority 1): belief kinetic energy scales linearly
  with speed (double speed, double KE) rather than quadratically. **Birth
  type**: overgeneralization (Type 1) — many familiar quantities (distance
  in fixed time, momentum) DO scale linearly with speed, and this pattern
  is incorrectly extended to kinetic energy specifically. Probe: "A car
  doubles its speed. Does its kinetic energy double, or change by some
  other factor?"
- **MC-KE-NEGATIVE** (Priority 2): belief kinetic energy can be negative
  for an object moving in a "negative" direction. **Birth type**:
  notation-induced (Type 4) — velocity's signed nature (negative for
  reverse direction) is incorrectly carried over to kinetic energy, which
  depends on v² and is therefore always non-negative. Probe: "An object
  moves in the negative x-direction with velocity −5 m/s. Is its kinetic
  energy negative?"

## Analogies

**Best**: braking distance data — a car at 60 mph needs roughly four times
the stopping distance of the same car at 30 mph (not twice), directly and
concretely demonstrating the quadratic relationship with real safety
stakes. Targets MC-KE-LINEAR with a memorable, consequential number.

**Anti-analogy**: do NOT describe kinetic energy as "how fast something
is going, energy-wise" without immediately specifying the squared
relationship — vague framing invites the linear-scaling default.

## Demonstrations

Physical/data-based: present real braking-distance-vs-speed data (readily
available from driver's-education material) and have students compute the
ratio, discovering it's roughly 4:1 for a 2:1 speed ratio, not 2:1 —
directly targets MC-KE-LINEAR with real stakes attached.

## Discovery Questions

Discovery-style: "if you double a car's speed, does its stopping distance
double too?" — learner predicts (often incorrectly, linearly), then the
real braking-distance data resolves it, directly confronting MC-KE-LINEAR
with genuine surprise value.

## Teaching Sequence

Blueprint's Teaching Action Sequence cited by reference. MC-KE-LINEAR
repaired first via the braking-distance data (the highest-stakes, most
memorable correction), before MC-KE-NEGATIVE, since the negative-energy
question depends on the formula itself already being trusted as
squared (making "always non-negative" a natural consequence rather than
an arbitrary rule).

## Tutor Actions

WORKED-EXAMPLE (computing KE for a doubling/tripling speed scenario, then
verifying the 4x/9x ratio explicitly); DEMONSTRATION (braking-distance
data); ERROR-ANALYSIS (a solution assuming KE doubles with speed).

## Voice Teaching Notes

Listen for "so it doubles" spoken immediately after a speed-doubling
scenario is posed — the direct MC-KE-LINEAR tell. Load-bearing sentence:
"kinetic energy depends on speed SQUARED — double the speed is FOUR times
the energy." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Fast "doubles" answer to a speed-doubling KE question signals MC-KE-LINEAR
(MISCONCEIVING, full repair via braking-distance data). Mastery trigger:
correctly computing the KE ratio for at least two different speed-scaling
factors (not just doubling) and correctly denying that KE can be negative.
Blueprint's Mastery Probe Bank cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula — if speed triples, does energy
triple too, or something bigger?" (isolating the qualitative
faster-than-linear intuition before the exact formula). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Procedure (KE calculation) bound to a quantitative-scaling concept (v²
dependence). Interleave with `phys.mech.work` (the prerequisite work-energy
connection) and, once authored, `phys.mech.work-energy-theorem` and
`phys.mech.conservation-of-energy`.

## Transfer Connections

Near: any speed-change kinetic-energy problem, including collision
severity estimation. Far: vehicle safety engineering (speed limits,
crumple-zone design, all directly informed by the v² relationship) and
sports science (impact energy in falls/collisions). Real-world: why
"only" going a bit faster substantially increases collision danger — a
genuinely important safety-literacy transfer. Expert: relativistic energy-
momentum four-vector, of which ½mv² is the low-speed limit.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to mathematics
(quadratic functions and their scaling behavior) not currently captured as
a cross_link — recorded as Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine,
Teaching Action Sequence, Mastery Probe Bank, by reference. Not restated:
Concept Metadata, Concept Spine, Prerequisite Dependency Map, Formative
Assessment Strategy, Anxiety & Confidence Protocols, Spaced Retrieval &
Interleaving Plan, V-Check Trace.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine connection to mathematics'
quadratic-function content. Flagged for the Curriculum Production
Pipeline's backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

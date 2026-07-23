# Power — `phys.mech.power`

## Identity

- **Concept ID**: `phys.mech.power` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.work` — power is the rate of doing work,
  directly built on the already-secure work concept.
- **Unlocks** (from KG): none directly listed — a terminal but
  widely-applied concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) correctly distinguish power (P = W/t, the RATE of
doing work) from work/energy itself, correctly explaining that two
processes can do the SAME total work while requiring very different power
(one quickly, one slowly); (2) correctly apply P = Fv for the instantaneous
power delivered by a constant force at a given speed, and correctly
explain that this does NOT require the speed to be constant over the whole
motion — P = Fv is a valid instantaneous relationship at any moment;
(3) correctly compute one of P, W, t (or P, F, v) given the other two.

## Core Understanding

Power, P = W/t (energy per unit time), measures how QUICKLY work is done
or energy is transferred/converted — it is a rate, fundamentally distinct
from the total amount of work or energy itself. Two processes can
accomplish the identical total work (say, lifting the same weight to the
same height) while requiring dramatically different power: one quickly (a
crane, high power) and one slowly (a person over hours, low power) — same
work, very different power. For a constant force applied to an object
moving at instantaneous speed v (in the force's direction), instantaneous
power is P = Fv — this relationship holds at any single instant, valid
even if the object's speed is changing over the course of the motion (it
is NOT a formula requiring constant velocity throughout; it simply
describes power AT one instant, given the speed and force AT that
instant).

## Mental Models

**Beginner**: "Power means energy, just a fancier word for it." Upgrade
trigger: comparing two scenarios doing identical total work at different
speeds (a slow crane vs. a fast crane lifting the same weight the same
height) directly confronts the energy-power conflation.

**Intermediate**: "Power is the RATE of doing work, P = W/t — same work,
different time, means different power." This model correctly separates
rate from amount, but sometimes assumes P = Fv requires constant speed
throughout the motion, rather than recognizing it as valid instantaneously
at any single moment.

**Advanced**: "P = Fv is an instantaneous relationship — compute it at any
specific instant using the force and speed AT THAT instant, regardless of
whether either is changing over the broader motion," correctly
generalizing beyond constant-velocity scenarios.

**Expert**: power as the time-derivative of energy generally (not just
mechanical work), unifying mechanical, electrical, and thermal power under
one rate-of-energy-transfer concept — not required for mastery.

## Why Students Fail

The dominant failure is the energy-power conflation: because power is
measured in units built from energy (watts = joules/second) and is always
discussed alongside work/energy, students often treat "power" as simply
another name for "energy" or "work," missing that it specifically encodes
the RATE.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.power.md`, Misconception
Engine, Priority 1-2) documents two; reused by reference with birth-type
added.

- **MC-POWER-IS-ENERGY** (Priority 1): power treated as equivalent to
  energy/work itself, ignoring the time (rate) component. **Birth type**:
  language contamination (Type 3) — everyday usage ("a powerful engine,"
  "high-power device") doesn't clearly separate "does a lot of work" from
  "does work quickly," and the units (watts, built from joules per second)
  are less immediately intuitive than joules alone. Probe: "Two cranes lift
  identical 1000 kg weights to the same height. Crane A takes 10 seconds;
  Crane B takes 2 seconds. Do they do the same work? Do they have the same
  power?"
- **MC-POWER-CONSTANT-V** (Priority 2): belief P = Fv requires constant
  velocity throughout the motion to be valid. **Birth type**:
  overgeneralization (Type 1) — most early practice problems use constant-
  velocity scenarios, and the instantaneous validity of P = Fv (valid at
  any single moment regardless of whether v is changing elsewhere in the
  motion) is never explicitly distinguished from a constant-velocity
  requirement. Probe: "A car is accelerating — its speed is changing every
  instant. Can you still use P = Fv to find the power at one specific
  moment, even though the speed isn't constant overall?"

## Analogies

**Best**: filling a bathtub vs. filling a swimming pool with the same
hose, same total volume of water but wildly different time — total volume
(work/energy) can be identical while flow rate (power) is the same, but
comparing a fast-filling small tub to the same-total-volume-over-much-
longer-time scenario for the pool makes rate vs. amount vivid. Directly
targets MC-POWER-IS-ENERGY by anchoring "amount" and "rate" as separately
meaningful quantities using a familiar flow analogy.

**Anti-analogy**: do NOT describe a "powerful" device as simply one that
"has a lot of energy" — conflates power with energy content, reinforcing
MC-POWER-IS-ENERGY.

## Demonstrations

Physical/data-based: compare two real devices doing the same task at
different speeds (e.g., two motors lifting the same weight, timed) and
compute both work (identical) and power (different) explicitly — directly
targets MC-POWER-IS-ENERGY. For MC-POWER-CONSTANT-V: compute P = Fv at
several different instants during an accelerating object's motion (using a
simulator or given speed-vs-time data), showing the calculation works fine
at each individual instant despite the overall changing speed.

## Discovery Questions

Discovery-style: "do two processes doing the same total work always take
the same power?" — learner predicts, then the two-cranes-different-time
comparison resolves it, directly confronting MC-POWER-IS-ENERGY with a
concrete numeric contrast (same work, different power).

## Teaching Sequence

Blueprint's Teaching Action Sequence cited by reference. MC-POWER-IS-ENERGY
repaired first via the two-crane comparison (establishing power as
genuinely distinct from work/energy), before MC-POWER-CONSTANT-V, since
understanding power as a rate makes "instantaneous rate at any given
moment, even during changing speed" a natural extension rather than a
separate rule to memorize.

## Tutor Actions

WORKED-EXAMPLE (computing P = Fv at multiple instants during accelerating
motion); DEMONSTRATION (two-crane same-work-different-time comparison);
ERROR-ANALYSIS (a solution treating power and work as interchangeable).

## Voice Teaching Notes

Listen for "power" and "energy" used interchangeably in a learner's own
explanation — the MC-POWER-IS-ENERGY tell. Load-bearing sentence: "power
is how FAST energy is used or work is done — not how MUCH." Channel-
reality caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner stating two same-work-different-time scenarios "have the same
power" signals MC-POWER-IS-ENERGY (MISCONCEIVING, full repair via the
two-crane comparison). Mastery trigger: correctly distinguishing work from
power in a same-work-different-time scenario, AND correctly applying
P = Fv at a specific instant during accelerating motion. Blueprint's
Mastery Probe Bank cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the total energy for a second — which crane
finished FASTER?" (isolating the rate concept before reintroducing the
power formula). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (rate vs. amount) bound to procedure (P = W/t and P = Fv
calculation). Interleave with `phys.mech.work` and, once authored,
`phys.mech.work-energy-theorem`.

## Transfer Connections

Near: any rate-of-energy-transfer problem, including electrical power
(P = IV, the same rate-vs-amount distinction). Far: engine and motor
specification (horsepower/wattage ratings describe power, not total energy
capacity) and human athletic performance metrics (power output in
cycling/weightlifting). Real-world: understanding why a car's horsepower
rating and its fuel tank size (energy capacity) are entirely different,
unrelated specifications. Expert: power as the general time-derivative of
energy, unifying mechanical/electrical/thermal power.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to computer science
(computational "power" and rate-based performance metrics use an
analogous rate-vs-total-work distinction) not currently captured as a
cross_link — recorded as Curriculum Feedback.

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

KG `cross_links` empty despite a loosely genuine connection to computer
science's rate-based performance metrics. Flagged for the Curriculum
Production Pipeline's backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

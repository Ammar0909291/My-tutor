# Work-Energy Theorem — `phys.mech.work-energy-theorem`

## Identity

- **Concept ID**: `phys.mech.work-energy-theorem` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 8.
- **Prerequisites**: `phys.mech.kinetic-energy` — the theorem directly
  states that the NET work done on an object equals its change in kinetic
  energy, a relationship built entirely on the already-secure KE = ½mv²
  definition.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) state W_net = ΔKE and correctly compute W_net as the
sum of work done by EVERY force acting on an object (including friction,
gravity components, normal force's zero contribution, etc.), not just the
single applied/external force; (2) correctly explain that W_net = 0 means
the object's SPEED is unchanged (constant KE), NOT that the object is at
rest — a moving object at constant velocity has W_net = 0 continuously.

## Core Understanding

The work-energy theorem states W_net = ΔKE — the NET work done by ALL
forces acting on an object (not just one force of interest) equals the
change in its kinetic energy. A common and serious computational error is
computing "W_net" using only the applied/external force while silently
ignoring friction, a gravity component along the motion direction, or
other forces actually doing work — this produces an incorrect ΔKE
prediction whenever multiple forces act, since W_net specifically means
the SUM of all individual works (each possibly positive, negative, or
zero), not a single force's contribution alone. A second, independent and
equally serious misunderstanding treats W_net = 0 as meaning the object
is at rest (speed = 0) — but W_net = 0 only means KE is UNCHANGED
(ΔKE = 0), which is trivially and continuously true for an object moving
at ANY constant nonzero speed (net force zero throughout, so net work
stays zero the whole time) — "unchanged" and "zero" are different claims
entirely.

## Mental Models

**Beginner**: "W_net = the work done by the applied/pushing force; if
W_net = 0, the object must be stopped." Upgrade trigger: a friction
scenario where W_applied alone doesn't match the actual observed ΔKE
(because friction's negative work was omitted) directly confronts the
first error; a constant-velocity scenario (W_net=0 but v≠0 throughout)
directly confronts the second.

**Intermediate**: "W_net = sum of ALL forces' work = ΔKE; W_net=0 means
KE unchanged, not KE=0." This model correctly captures both core
distinctions, but sometimes still forgets to include a force (e.g. a
gravity component) when several forces act simultaneously in a complex
scenario.

**Advanced**: "Before computing W_net, list every force acting on the
object and its individual work contribution (including forces
perpendicular to motion, which contribute zero) — then sum them all;
W_net=0 is fully consistent with any nonzero constant speed."

**Expert**: the work-energy theorem as a direct integral consequence of
Newton's second law (∫F_net·dx = ∫ma·dx = ΔKE by substitution) — not
required for mastery, a natural derivation-level consolidation.

## Why Students Fail

The dominant failure is partial-work computation: including only the
"main" or applied force while omitting friction, gravity components, or
other forces that also do (positive or negative) work on the object; a
second, distinct failure is conflating "net work is zero" with "the
object is at rest," rather than "the object's kinetic energy is
unchanged."

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.work-energy-theorem.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-PARTIAL-WORK**: computing W_net using only the applied/external
  force, omitting friction or other forces' contributions. **Birth
  type**: overgeneralization (Type 1) — simpler earlier problems (a
  single force, no friction) correctly used only that one force's work,
  and this habit is incorrectly extended to multi-force scenarios where
  every force's contribution must be summed. Probe: "A box is pushed
  across a rough floor with a constant force. Does friction do any work
  on the box, and should it be included when computing W_net?"
- **MC-WET-ZERO-SPEED**: believing W_net = 0 implies the object is at
  rest (speed = 0). **Birth type**: language contamination (Type 3) —
  "net work is zero" is loosely read as "nothing is happening," extended
  incorrectly to "the object isn't moving," rather than the precise
  technical meaning "kinetic energy isn't changing." Probe: "A box slides
  across a frictionless floor at constant velocity, with zero net force.
  Is the net work done on it zero? Is the box at rest?"

## Analogies

**Best**: a bank account balance that isn't changing (net deposits and
withdrawals cancel) — the balance can be zero, or it can be a large
nonzero number that just isn't currently changing; "no change" (ΔKE=0,
W_net=0) is a claim about the RATE of change, not the value itself —
directly targets MC-WET-ZERO-SPEED by separating "unchanging" from
"zero."

**Anti-analogy**: do NOT say "the pushing force's work equals the
kinetic energy change" as a general statement — true only when no other
force does work, directly inviting MC-PARTIAL-WORK when applied to any
scenario involving friction or other forces.

## Demonstrations

Physical/conceptual: compute W_applied, W_friction, and W_net = W_applied
+ W_friction separately for a box pushed across a rough floor, showing
W_net (not W_applied alone) correctly predicts the actual ΔKE — directly
targets MC-PARTIAL-WORK. Conceptual: a box moving at constant velocity on
a frictionless floor — W_net = 0 throughout, yet KE stays constant at a
LARGE nonzero value the whole time — directly targets
MC-WET-ZERO-SPEED.

## Discovery Questions

Discovery-style: "if the net work done on an object is exactly zero,
does that mean the object isn't moving?" — learner reasons through the
constant-velocity counterexample, directly confronting
MC-WET-ZERO-SPEED.

## Teaching Sequence

Blueprint's worked-example and assessment components cited by reference.
MC-PARTIAL-WORK is addressed first (establishing W_net as the sum of ALL
forces' work), before MC-WET-ZERO-SPEED, since correctly computing W_net
as a sum first establishes W_net as a numerical quantity that can equal
zero for reasons unrelated to the object being stationary — priming the
"zero net work ≠ zero speed" distinction.

## Tutor Actions

WORKED-EXAMPLE (W_applied, W_friction, W_net computed separately for a
multi-force scenario); ERROR-ANALYSIS (a solution omitting friction's
work); THOUGHT-EXPERIMENT (constant-velocity frictionless motion with
W_net=0 throughout).

## Voice Teaching Notes

Listen for W_net computed from only one force, or "zero net work" equated
with "at rest" — the two direct misconception tells. Load-bearing
sentence: "net work means EVERY force's work added together — and zero
net work just means kinetic energy isn't changing, not that it's zero."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner omitting friction's work from W_net signals MC-PARTIAL-WORK
(MISCONCEIVING, full repair via the separated-work-terms worked example).
A learner claiming a constant-velocity object is at rest because W_net=0
signals MC-WET-ZERO-SPEED (full repair via the constant-velocity thought
experiment). Mastery trigger: correctly summing all forces' work to get
W_net, AND correctly distinguishing "W_net=0" from "at rest." Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget friction for a second — are there ANY other
forces acting on this object besides the one you already included?"
(isolating the missing-force check before summing). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (W_net as a sum of all forces' work; W_net=0 vs. at-rest
distinction) bound to procedure (ΔKE calculation from summed work).
Interleave with `phys.mech.kinetic-energy` and, once authored,
`phys.mech.conservation-of-energy` (sibling concept at this same
dependency level).

## Transfer Connections

Near: any multi-force work-energy problem, including friction-inclusive
scenarios. Far: engineering energy-loss analysis (accounting for every
dissipative force when computing a system's net energy balance) and
vehicle braking-distance calculations (friction's negative work
determining stopping distance). Real-world: understanding why a
constantly-moving car at highway speed has zero net work done on it
(engine force balances air resistance and friction) despite clearly not
being at rest. Expert: the theorem's derivation directly from Newton's
second law via integration.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
worked-example/assessment components by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Lesson Composition
Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock Map, Validation
Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 8): initial authoring.

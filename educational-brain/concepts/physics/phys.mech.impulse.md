# Impulse and Momentum Change — `phys.mech.impulse`

## Identity

- **Concept ID**: `phys.mech.impulse` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.momentum` — impulse is defined as the
  CHANGE in momentum, directly built on the already-secure momentum
  concept.
- **Unlocks** (from KG): `phys.mech.conservation-of-momentum`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) state the impulse-momentum theorem, J = FΔt = Δp, and
correctly explain that impulse is NOT a force itself but the PRODUCT of
force and the time it acts — the same impulse (momentum change) can result
from a large force over a short time or a small force over a long time;
(2) correctly compute impulse from a force-time relationship (constant
force, or the area under a force-time graph for varying force); (3)
correctly determine the DIRECTION of momentum change (and therefore
impulse) from the vector difference p_final − p_initial, correctly
handling cases where the direction reverses (e.g., a bounced ball).

## Core Understanding

Impulse, J = FΔt, equals the change in momentum, Δp — this impulse-
momentum theorem is really just Newton's second law (F = ma = m·Δv/Δt)
rearranged and integrated over time, making explicit that a given momentum
change can be achieved by many different force-time combinations: a huge
force applied briefly (a bat striking a ball) or a modest force applied
over a longer time (a padded surface cushioning a fall) can produce the
identical impulse/momentum change — this is precisely why airbags,
padding, and "following through" reduce injury: they extend Δt for the
same Δp, reducing the peak force F required. Momentum is a vector, so
impulse (Δp) is computed as a VECTOR difference, p_final − p_initial — for
an object that reverses direction (like a ball bouncing off a wall), this
subtraction must account for the sign change, often producing a LARGER
magnitude of momentum change (and therefore impulse) than either the
"stopping" or "reversing" motion would suggest in isolation.

## Mental Models

**Beginner**: "Impulse is basically a strong, sudden force." Upgrade
trigger: comparing a padded vs. unpadded landing (same fall, same total
momentum change, wildly different peak force) directly confronts
impulse-as-force.

**Intermediate**: "Impulse = FΔt = Δp; the same Δp can come from different
F-Δt combinations." This model correctly separates impulse from force
itself, but often computes Δp as a simple magnitude subtraction rather
than a full vector subtraction when direction reverses.

**Advanced**: "For a direction-reversing collision (a bounce), Δp = p_final
− p_initial must be computed as a vector subtraction, which for exact
reversal doubles the magnitude relative to either momentum value alone (a
ball reversing from +p to −p has Δp = −p − (+p) = −2p, not zero)."

**Expert**: impulse as the time-integral of a possibly-varying force,
∫F dt, generalizing beyond the constant-force case to the area under any
force-time curve — not required for mastery.

## Why Students Fail

The dominant failure is impulse-as-force conflation, treating "impulse"
as a synonym for "a big, sudden push" rather than a specific product
quantity that trades off force against time; a secondary, distinct failure
is scalar (magnitude-only) subtraction for direction-reversing scenarios,
producing an underestimated impulse for bounces.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.impulse.md`,
Misconception Engine, Priority 1-2) documents two; reused by reference
with birth-type added.

- **MC-IMPULSE-IS-FORCE** (Priority 1): impulse treated as synonymous with
  force itself, ignoring the time component. **Birth type**: language
  contamination (Type 3) — everyday usage of "impulsive" (sudden, forceful)
  doesn't convey the specific force×time product structure. Probe: "A
  cushioned landing and an unpadded landing from the same height produce
  the same momentum change. Do they involve the same impulse? The same
  peak force?"
- **MC-DELTAP-DIRECTION** (Priority 2): computing momentum change as a
  scalar magnitude subtraction rather than a vector subtraction, especially
  for direction-reversing scenarios. **Birth type**: overgeneralization
  (Type 1) — magnitude-only subtraction works fine for same-direction
  speed changes, and is incorrectly extended to reversing-direction cases.
  Probe: "A ball with momentum +5 kg·m/s bounces off a wall and leaves with
  momentum −5 kg·m/s (same speed, opposite direction). What is the
  magnitude of its momentum change — zero, 5, or 10 kg·m/s?"

## Analogies

**Best**: pushing a shopping cart hard for a moment vs. pushing gently for
a long time to reach the same final speed — same impulse (momentum
change), very different force/time combination. Targets
MC-IMPULSE-IS-FORCE by showing multiple force-time recipes achieving
identical momentum outcomes.

**Anti-analogy**: do NOT describe impulse as "a sudden hit" without
immediately noting the same impulse can come from a gentle, sustained push
— unqualified, reinforces MC-IMPULSE-IS-FORCE.

## Demonstrations

Physical: drop an egg (or similar fragile object) onto a hard surface vs.
a padded surface from the same height — same momentum change (same fall),
dramatically different peak force and outcome (egg survives on padding) —
directly targets MC-IMPULSE-IS-FORCE with a vivid, memorable consequence.
For MC-DELTAP-DIRECTION: a bouncing-ball demonstration with velocity
vectors explicitly drawn before and after, computing the vector
subtraction directly.

## Discovery Questions

Discovery-style: "does a fragile object always survive better with a
softer landing, even though the momentum change is identical?" — learner
predicts, then the egg-drop demonstration resolves it, directly
confronting MC-IMPULSE-IS-FORCE via genuine physical stakes.

## Teaching Sequence

Blueprint's Teaching Action Sequence cited by reference. MC-IMPULSE-IS-FORCE
repaired first via the egg-drop demonstration, before MC-DELTAP-DIRECTION,
since vector-subtraction fluency benefits from the impulse-momentum
theorem itself already being trusted as a genuine force×time product, not
a synonym for force.

## Tutor Actions

DEMONSTRATION (egg-drop padded vs. unpadded); WORKED-EXAMPLE (bounce
scenario vector subtraction); ERROR-ANALYSIS (a solution computing a
bounce's momentum change as a scalar magnitude difference).

## Voice Teaching Notes

Listen for "impulse" used to mean "a strong force" in a learner's own
description — the MC-IMPULSE-IS-FORCE tell. Load-bearing sentence:
"impulse is force MULTIPLIED BY time — the same change can come from a big
force briefly or a small force for longer." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming a padded and unpadded landing have "different impulse"
(rather than same impulse, different peak force) signals
MC-IMPULSE-IS-FORCE (MISCONCEIVING, full repair via egg-drop). Mastery
trigger: correctly computing impulse from an F-Δt relationship AND
correctly vector-subtracting momentum for a direction-reversing scenario.
Blueprint's Mastery Probe Bank cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget force for a second — did the ball's speed AND
direction both change, or just one?" (isolating the full vector nature of
momentum change). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (impulse ≠ force; vector Δp) bound to procedure (J = FΔt = Δp
calculation). Interleave with `phys.mech.momentum` and, once authored,
`phys.mech.conservation-of-momentum`.

## Transfer Connections

Near: any collision or force-time problem, including sports equipment
design (padding, follow-through). Far: automotive safety engineering
(airbags and crumple zones both extend Δt to reduce peak force for a
fixed Δp) and rocket propulsion (thrust as sustained impulse delivery).
Real-world: why "rolling with a punch" or bending knees on landing reduces
injury despite identical momentum change. Expert: impulse as ∫F dt,
generalizing to time-varying forces.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

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

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

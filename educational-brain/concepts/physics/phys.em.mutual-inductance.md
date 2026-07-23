# Mutual Inductance and Transformers — `phys.em.mutual-inductance`

## Identity

- **Concept ID**: `phys.em.mutual-inductance` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.self-inductance` — mutual inductance
  generalizes the single-coil self-inductance idea (a coil's own changing
  current inducing EMF in itself) to a PAIR of coils (one coil's changing
  current inducing EMF in a separate, nearby coil).
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) state that mutual inductance M is exactly symmetric —
M₁₂ = M₂₁ — regardless of the two coils' relative size, shape, or turn
count, and correctly explain why this is a genuine mathematical theorem
(Neumann's formula), not a coincidence; (2) correctly explain that an ideal
transformer conserves POWER (P = VI constant), so a step-up transformer
that increases voltage by some factor decreases current by the identical
factor — never amplifying power; (3) correctly compute transformer
voltage/current ratios from the turns ratio N₂/N₁.

## Core Understanding

Mutual inductance M describes how a changing current in one coil induces
an EMF in a separate, nearby coil (EMF₂ = -M·dI₁/dt), and — a genuinely
non-obvious mathematical result — M is EXACTLY symmetric between the two
coils (M₁₂ = M₂₁), regardless of how different the two coils are in size,
shape, or number of turns. This symmetry, proven directly by the Neumann
formula (a double line-integral manifestly unchanged by swapping which
coil is "1" and which is "2"), can feel counterintuitive: a coil with more
turns collects more flux from its partner, seemingly making the coupling
"stronger" in that direction — but that coil also has proportionally
higher self-inductance, and the two effects balance exactly, so the
coupling coefficient k = M/√(L₁L₂) genuinely is direction-independent. A
transformer applies mutual inductance between two coils sharing an iron
core: an ideal transformer conserves POWER exactly (P₁ = V₁I₁ = V₂I₂ = P₂),
so increasing voltage by the turns ratio N₂/N₁ necessarily decreases
current by that same ratio — voltage and current trade off, but their
product (power) never increases, since no device can output more energy
than it receives (first law of thermodynamics).

## Mental Models

**Beginner**: "M₁₂ ≠ M₂₁ — whichever coil has more turns/collects more
flux has the 'stronger' mutual inductance in that direction." Upgrade
trigger: measuring (or computing via the Neumann formula) M in both
directions for a genuinely asymmetric coil pair, finding identical values,
directly confronts the assumed asymmetry.

**Intermediate**: "M₁₂ = M₂₁ always, by the Neumann formula's built-in
symmetry; a step-up transformer trades voltage for current, conserving
power." This model correctly captures both core results, but sometimes
still expects a step-up transformer to somehow deliver "more" overall,
conflating higher voltage with higher power.

**Advanced**: "A step-up transformer is exactly like a mechanical lever —
trading one quantity (distance/current) for another (force/voltage) while
conserving the product (work/power); this is why transmission-line
transformers step voltage UP for transmission, not because it creates more
power, but because it reduces I²R losses for a fixed power delivered."

**Expert**: mutual inductance's symmetry as a specific instance of a
general reciprocity theorem in linear electromagnetic systems — not
required for mastery.

## Why Students Fail

The dominant failure is expecting asymmetric mutual inductance based on
coil-size/turn-count intuition, rather than trusting the Neumann formula's
built-in symmetry; a second, distinct failure is expecting transformers to
amplify power because they visibly amplify voltage, without checking what
happens to current.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.mutual-inductance.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC**: belief M₁₂ ≠ M₂₁ because one
  coil is larger or has more turns than the other. **Birth type**: analogy
  overextension (Type 6) — an intuition from asymmetric everyday
  interactions ("the bigger thing affects the smaller thing more than vice
  versa") is extended to a system where the underlying physics
  (line-integral coupling) is genuinely, provably symmetric. Probe: "Coil
  1 has 10 turns; coil 2 has 1000 turns, wound around the same core. Is
  the mutual inductance from coil 1 to coil 2 the same as from coil 2 to
  coil 1, or different?"
- **MC-TRANSFORMER-CAN-AMPLIFY-POWER**: belief a step-up transformer
  amplifies power because it increases voltage. **Birth type**:
  overgeneralization (Type 1) — "transformers make things bigger" is
  correctly observed for voltage and incorrectly extended to power,
  without checking what happens to current. Probe: "A step-up transformer
  increases voltage by a factor of 10. Does it also increase the total
  power delivered by a factor of 10, or does power stay the same?"

## Analogies

**Best**: a mechanical lever — a small force applied over a large distance
on one side lifts a large force over a small distance on the other, with
the WORK (force × distance) unchanged — directly targets
MC-TRANSFORMER-CAN-AMPLIFY-POWER by giving a familiar, concrete
conservation principle (work in = work out) that maps directly onto V×I
conservation.

**Anti-analogy**: do NOT say "a transformer boosts the signal" without
immediately specifying WHAT is boosted (voltage) and what correspondingly
drops (current) — bare "boosts" language directly risks installing
MC-TRANSFORMER-CAN-AMPLIFY-POWER.

## Demonstrations

Physical/conceptual: compute M using the Neumann formula symbolically for
two clearly different coils, verifying the swapped-order integral is
identical — directly targets MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC.
Worked-example: compute P₁ = V₁I₁ and P₂ = V₂I₂ for an ideal transformer
with a 1:10 turns ratio, showing both equal 46 W despite the 10× voltage
change — directly targets MC-TRANSFORMER-CAN-AMPLIFY-POWER with concrete
numbers.

## Discovery Questions

Discovery-style: "if a step-up transformer increases voltage by 10×, does
the power delivered to the load also increase by 10×?" — learner predicts
(often incorrectly, expecting yes), then the P₁ = P₂ worked example
resolves it, directly confronting MC-TRANSFORMER-CAN-AMPLIFY-POWER.

## Teaching Sequence

Blueprint's worked-example and assessment components cited by reference.
MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC is addressed first (establishing M's
genuine symmetry via the Neumann formula), before
MC-TRANSFORMER-CAN-AMPLIFY-POWER, since the transformer relationship
V₂/V₁ = N₂/N₁ = I₁/I₂ is itself a direct consequence of the coupled,
symmetric mutual-inductance relationship between the two windings.

## Tutor Actions

WORKED-EXAMPLE (Neumann-formula symmetry check; ideal-transformer power
conservation calculation); THOUGHT-EXPERIMENT (lever analogy mapped
explicitly onto V/I trade-off); COMPARE-CONTRAST (real transformer
efficiency 95-99.5% vs. the ideal 100% case).

## Voice Teaching Notes

Listen for "transformers amplify power" or "the bigger coil has stronger
mutual inductance" — the two direct misconception tells. Load-bearing
sentence: "voltage up, current down, by the same factor — power never
increases, only trades form." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming asymmetric M based on coil size signals
MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC (MISCONCEIVING, full repair via the
Neumann-formula check). A learner claiming a step-up transformer increases
delivered power signals MC-TRANSFORMER-CAN-AMPLIFY-POWER (full repair via
the power-conservation worked example). Mastery trigger: correctly stating
M₁₂ = M₂₁ always, AND correctly computing transformer V/I ratios while
confirming power conservation. Blueprint's assessment component cited for
the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the coil sizes for a second — if transformer
raises voltage by 10, and NO energy is created or destroyed, what MUST
happen to current?" (isolating the conservation principle before
computing). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (M symmetry; power conservation) bound to procedure (transformer
V/I ratio calculation). Interleave with `phys.em.self-inductance` (the
single-coil precursor) and `phys.em.ac-basics` (sibling concept at this
same dependency level, since transformers operate on AC).

## Transfer Connections

Near: any transformer voltage/current-ratio problem, including household
device power adapters. Far: power grid engineering (step-up transformers
at power plants, step-down at substations, specifically to minimize I²R
transmission losses at high voltage) and wireless charging (mutual
inductance between separated coils, k ≈ 0.3-0.7). Real-world: understanding
why power lines run at very high voltage (lower current, lower resistive
losses) despite the safety hazard. Expert: mutual inductance's symmetry as
an instance of electromagnetic reciprocity theorems.

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

- 2026-07-22 (physics EB Wave 7): initial authoring.

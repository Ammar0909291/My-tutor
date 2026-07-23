# Viscosity and Stokes' Law — `phys.mech.viscosity`

## Identity

- **Concept ID**: `phys.mech.viscosity` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 10.
- **Prerequisites**: `phys.mech.bernoulli` — viscosity introduces the
  real-fluid friction effect the already-secure idealized (inviscid)
  Bernoulli analysis explicitly neglects.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that viscosity (resistance to
flow, internal friction between fluid layers) and density (mass per
volume) are entirely INDEPENDENT properties — mercury is 13× denser than
water but only slightly more viscous, while honey is only 1.4× denser
than water but 2,000-10,000× more viscous; (2) correctly explain that
viscosity is STRONGLY temperature-dependent, NOT a fixed material
constant — for liquids, viscosity DECREASES substantially with rising
temperature (water's viscosity drops 6× from 0°C to 100°C); for gases,
viscosity INCREASES (weakly) with temperature, the OPPOSITE direction,
due to a fundamentally different microscopic mechanism.

## Core Understanding

Viscosity (η, resistance to shear/flow, the internal friction between
fluid layers) and density (ρ, mass per unit volume) are completely
INDEPENDENT physical properties, despite sometimes being conflated —
mercury has a very high density (≈13,600 kg/m³, 13× water's) but a LOW
viscosity (≈1.5×10⁻³ Pa·s, only slightly above water's ≈1.0×10⁻³ Pa·s),
flowing quite freely; conversely, honey has a modest density (≈1,400
kg/m³, only 1.4× water's) but an extremely HIGH viscosity (2-10 Pa·s,
2,000-10,000× water's), flowing very slowly — these two properties have
entirely different molecular origins (density depends on molecular mass
and packing; viscosity depends on intermolecular forces and, for
polymers, chain entanglement), and a dense fluid can flow freely while a
light fluid can be highly viscous. A second, equally important
subtlety: viscosity is STRONGLY temperature-dependent, not a fixed
material constant that can be quoted without a temperature — for
LIQUIDS, viscosity DECREASES substantially as temperature rises (water's
η drops from 1.79×10⁻³ Pa·s at 0°C to just 0.28×10⁻³ Pa·s at 100°C, a 6×
decrease, since thermal agitation breaks the intermolecular bonds that
resist layer-sliding); for GASES, viscosity instead INCREASES (more
weakly) with rising temperature — the OPPOSITE direction from liquids —
because increased molecular collisions carry more momentum between
layers, a fundamentally different microscopic mechanism from the liquid
case. This distinction matters practically: engine oil viscosity changes
by roughly 1000× between a cold winter start and normal operating
temperature, which is why multi-grade oil rating systems (like SAE
10W-40) exist specifically to characterize this temperature dependence.

## Mental Models

**Beginner**: "Honey is more viscous because it's denser; the viscosity
of a fluid like water is a fixed number, always the same value."
Upgrade trigger: comparing mercury's high density but low viscosity
against honey's modest density but extreme viscosity directly confronts
the viscosity-equals-density assumption; examining water's viscosity at
different temperatures (0°C vs. 100°C, a 6× difference) directly
confronts the fixed-constant assumption.

**Intermediate**: "Viscosity and density are independent — a dense fluid
can flow easily, a light fluid can be highly viscous; viscosity strongly
depends on temperature, decreasing for liquids and (weakly) increasing
for gases as temperature rises." This model correctly captures both core
distinctions, but sometimes still quotes a viscosity value without
specifying its associated temperature out of habit.

**Advanced**: "Always treat a quoted viscosity value as incomplete
without its associated temperature, and never infer viscosity from
density or vice versa — verify each property independently, since they
arise from genuinely different molecular mechanisms."

**Expert**: the contrasting temperature dependencies (Arrhenius-form
decrease for liquids, Chapman-Enskog T^(1/2) increase for gases) as a
direct signature of the different microscopic mechanisms governing
momentum transfer in each phase — a natural consolidation, not required
for mastery.

## Why Students Fail

The dominant failure is conflating viscosity with density, expecting a
denser fluid to automatically be more viscous; a second, distinct
failure is treating viscosity as a fixed material property, ignoring
its strong (and phase-dependent-direction) temperature sensitivity.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.viscosity.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-VISCOSITY-IS-DENSITY**: believing "honey is more viscous because
  it's denser," confusing viscosity (resistance to flow) with density
  (mass per volume). **Birth type**: language contamination (Type 3) —
  everyday descriptions of "thick" or "heavy" fluids conflate two
  genuinely distinct physical properties (flow resistance and mass
  density) under a single loose intuition. Probe: "Mercury is 13 times
  denser than water. Is mercury also many times more viscous than
  water?"
- **MC-VISCOSITY-CONSTANT-TEMPERATURE**: treating viscosity as a fixed
  material constant without accounting for temperature, or saying "the
  viscosity of water is always 10⁻³ Pa·s." **Birth type**: instruction-
  induced (Type 5) — introductory problems often quote a single
  viscosity value without emphasizing its temperature dependence,
  leading to the value being treated as a universal constant rather than
  a temperature-specific measurement. Probe: "Does water's viscosity at
  0°C equal its viscosity at 100°C, or are they different?"

## Analogies

**Best**: comparing a dense metal ball bearing (heavy, but rolls
smoothly through air — low resistance) against a lightweight but sticky
substance like tree sap (much lighter, but resists flow strongly) —
directly targets MC-VISCOSITY-IS-DENSITY by separating "heaviness"
(density) from "stickiness/resistance" (viscosity) using a familiar
contrast.

**Anti-analogy**: do NOT say "thick fluids are heavy fluids" as a
bridging simplification — this directly installs
MC-VISCOSITY-IS-DENSITY by conflating the two independent properties.

## Demonstrations

Data-based: compare mercury's (dense, low-viscosity) and honey's (modest
density, extremely high-viscosity) actual measured values side by side —
directly targets MC-VISCOSITY-IS-DENSITY. Data-based: compare water's
viscosity at 0°C, 20°C, and 100°C (1.79, 1.00, 0.28 ×10⁻³ Pa·s) — directly
targets MC-VISCOSITY-CONSTANT-TEMPERATURE with concrete numbers.

## Discovery Questions

Discovery-style: "if you compare warm honey and cold honey, does one
pour more easily than the other, and by how much?" — learner reasons
through the strong liquid-viscosity temperature dependence, directly
confronting MC-VISCOSITY-CONSTANT-TEMPERATURE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-VISCOSITY-IS-DENSITY is addressed first (establishing viscosity and
density as independent properties), before
MC-VISCOSITY-CONSTANT-TEMPERATURE, since correctly isolating viscosity
as its own distinct property is the prerequisite for then examining how
THAT specific property varies with temperature.

## Tutor Actions

WORKED-EXAMPLE (mercury/honey density-viscosity comparison; water
viscosity at three temperatures); DEMONSTRATION (warm vs. cold honey
pouring comparison); COMPARE-CONTRAST (liquid vs. gas viscosity-
temperature trends, opposite directions).

## Voice Teaching Notes

Listen for "denser means more viscous" or viscosity quoted without a
temperature — the two direct misconception tells. Load-bearing sentence:
"viscosity and density are totally separate properties — mercury proves
it; and viscosity changes a LOT with temperature, dropping for liquids
as they warm up." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming denser fluids are automatically more viscous signals
MC-VISCOSITY-IS-DENSITY (MISCONCEIVING, full repair via the mercury/
honey comparison). A learner quoting a single viscosity value without a
temperature signals MC-VISCOSITY-CONSTANT-TEMPERATURE (full repair via
the water-at-three-temperatures data). Mastery trigger: correctly
distinguishing viscosity from density with a concrete counterexample,
AND correctly stating viscosity's temperature dependence (and its
opposite direction for liquids vs. gases). Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget honey for a second — does mercury (very
dense) flow easily or resist flowing?" (isolating a concrete
density-viscosity mismatch before generalizing). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (viscosity/density independence; opposite temperature trends for
liquids vs. gases) bound to procedure (viscosity comparison across
fluids and temperatures). Interleave with `phys.mech.bernoulli` and
`phys.mech.pressure-fluids` (already authored).

## Transfer Connections

Near: any fluid-viscosity comparison or temperature-dependence problem,
including lubricant selection. Far: automotive engineering (multi-grade
engine oil rating systems like SAE 10W-40 directly addressing viscosity's
temperature dependence) and biomedical engineering (blood viscosity
measurement, relevant to cardiovascular health monitoring). Real-world:
understanding why engine oil must be chosen carefully for climate — too
viscous when cold, too thin when hot. Expert: the contrasting Arrhenius
(liquid) and Chapman-Enskog (gas) temperature dependencies reflecting
different microscopic momentum-transfer mechanisms.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified,
though blood viscosity is a genuine, identifiable biology/medicine
application; honest "weak but real" assessment at the formal cross-link
level.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

Genuine cross-subject connection to biology/medicine (blood viscosity)
identified but not reflected in KG `cross_links`; recorded honestly, not
fixed (no KG file modified).

## Version History

- 2026-07-23 (physics EB Wave 10): initial authoring.

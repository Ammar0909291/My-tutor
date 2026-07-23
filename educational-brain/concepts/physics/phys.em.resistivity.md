# Resistivity and Conductivity — `phys.em.resistivity`

## Identity

- **Concept ID**: `phys.em.resistivity` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.ohms-law` — the load-bearing part is
  generalizing Ohm's law's object-specific resistance R into a
  geometry-independent MATERIAL property, resistivity ρ, the same
  normalization move already seen for Hooke's law → Young's modulus.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.80 · **Est. hours**: 3

## Learning Objective

The learner can: (1) state R = ρL/A and correctly explain that resistance
depends on BOTH the material (ρ, resistivity) AND the object's geometry
(length L, cross-sectional area A) — a LONGER wire has MORE resistance
(more material to traverse), not less, and a wider wire has LESS
resistance (more parallel paths for current); (2) correctly explain that
resistivity ρ itself is a fixed material property, independent of the
specific object's shape/size, analogous to how Young's modulus is
geometry-independent while spring constant k is not; (3) correctly explain
that for ORDINARY conductors (metals), resistivity INCREASES with rising
temperature, while for SEMICONDUCTORS, resistivity DECREASES with rising
temperature — the two material classes respond oppositely.

## Core Understanding

Resistance, R = ρL/A, depends on both a material-intrinsic property
(resistivity, ρ) and an object's specific geometry (length L, cross-
sectional area A) — a longer wire has proportionally MORE resistance
(current must traverse more material) while a WIDER wire has proportionally
LESS resistance (more cross-sectional "lanes" for current to flow through
in parallel), the exact opposite geometric dependencies. Resistivity ρ
itself, unlike R, is a fixed property of the MATERIAL alone, independent of
a specific object's length or width — copper has one resistivity value
regardless of whether it's shaped into a thick bar or a thin wire, exactly
paralleling how Young's modulus (material property) differs from a
specific spring's k (object-specific property). Temperature dependence
differs by material class: ordinary metallic conductors' resistivity
INCREASES with rising temperature (more thermal lattice vibration
increases electron scattering, impeding current flow), while semiconductors'
resistivity DECREASES with rising temperature (more thermal energy
generates additional charge carriers across the band gap, a dominant
effect that overwhelms any increased scattering) — these are genuinely
opposite responses arising from different physical mechanisms.

## Mental Models

**Beginner**: "A longer wire has less resistance, since there's 'more
wire' to carry the current" (confusing wire length with a parallel-paths
intuition better suited to width). Upgrade trigger: measuring resistance
of two different-length samples of the same wire directly confronts
this — longer measurably has MORE resistance.

**Intermediate**: "R = ρL/A: longer means more resistance, wider means
less; ρ itself is a fixed material property." This model correctly
captures the geometric dependencies, but sometimes assumes resistivity
behaves identically (same temperature direction) for all materials.

**Advanced**: "Metals and semiconductors respond OPPOSITELY to rising
temperature — metals' resistivity rises (more scattering dominates);
semiconductors' resistivity falls (more thermally-generated carriers
dominate) — the same two-mechanism contrast already established in
`phys.mod.semiconductor-classification`'s conductor/semiconductor
comparison."

**Expert**: resistivity's microscopic origin in the Drude model (electron
scattering time and carrier density) explaining both the geometric R = ρL/A
formula's derivation and the metal/semiconductor temperature-response
contrast from first principles — not required for mastery.

## Why Students Fail

The dominant failure is the length-resistance direction error, expecting
longer wires to have LESS resistance (perhaps by loose analogy to "more
lanes on a highway" reasoning, which actually applies to width/area, not
length); a second, distinct failure over-generalizes one material class's
temperature response (typically metals, taught first) to all materials
including semiconductors.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.resistivity.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-LONGER-WIRE-HAS-LOWER-RESISTANCE**: belief a longer wire has LESS
  resistance, rather than more. **Birth type**: analogy overextension
  (Type 6) — a "more pathways/more room" intuition (correctly applicable
  to width/cross-sectional area) is incorrectly extended to length, which
  behaves in the opposite direction (more material to traverse means more
  resistance, not less). Probe: "Two wires of the same material and
  thickness, but one twice as long as the other. Which has more
  resistance?"
- **MC-SEMICONDUCTOR-RESISTANCE-INCREASES-WITH-TEMPERATURE**: belief
  semiconductors, like metals, have resistance that increases with rising
  temperature. **Birth type**: overgeneralization (Type 1) — metals'
  temperature response (learned first, more familiar from everyday wiring
  contexts) is incorrectly extended to semiconductors, which respond
  oppositely due to a fundamentally different dominant mechanism
  (thermally-generated carriers, not increased scattering). Probe: "As a
  piece of silicon (a semiconductor) is heated, does its resistance
  increase or decrease?"

## Analogies

**Best**: a hallway crowded with people trying to get through — a LONGER
hallway takes more total time/effort to traverse (more resistance), while
a WIDER hallway lets more people pass simultaneously (less resistance per
person) — directly targets MC-LONGER-WIRE-HAS-LOWER-RESISTANCE by
correctly separating the length and width effects into two distinct,
oppositely-behaving factors.

**Anti-analogy**: do NOT say "a bigger wire has less resistance" without
specifying whether "bigger" means longer or wider — this ambiguous framing
directly risks installing or reinforcing
MC-LONGER-WIRE-HAS-LOWER-RESISTANCE by conflating the two independent,
oppositely-behaving geometric factors.

## Demonstrations

Physical: measure resistance of two different-length samples of the
identical wire (using a multimeter), showing the longer sample has
measurably MORE resistance — directly, numerically targets
MC-LONGER-WIRE-HAS-LOWER-RESISTANCE. Cross-reference: revisit the
semiconductor-classification concept's own temperature-response
demonstration (a semiconductor sample's resistance measurably DECREASING
when warmed) explicitly alongside a metal wire's INCREASING resistance
when warmed — directly targets
MC-SEMICONDUCTOR-RESISTANCE-INCREASES-WITH-TEMPERATURE via direct,
side-by-side contrast.

## Discovery Questions

Discovery-style: "does a longer wire of the same material and thickness
have more or less resistance than a shorter one?" — learner predicts
(often incorrectly, expecting less), then the different-length
measurement demonstration resolves it, directly confronting
MC-LONGER-WIRE-HAS-LOWER-RESISTANCE.

## Teaching Sequence

Blueprint's practice-set and assessment components cited by reference.
MC-LONGER-WIRE-HAS-LOWER-RESISTANCE is repaired first via the
different-length measurement (establishing R = ρL/A's geometric
dependencies concretely), before
MC-SEMICONDUCTOR-RESISTANCE-INCREASES-WITH-TEMPERATURE, which is repaired
by explicitly recalling the already-covered semiconductor-classification
temperature-response contrast (metal vs. semiconductor) rather than
re-deriving it from scratch.

## Tutor Actions

WORKED-EXAMPLE (R = ρL/A computed for varying L and A independently);
DEMONSTRATION (different-length wire resistance measurement); COMPARE-CONTRAST
(metal vs. semiconductor temperature response, explicitly recalling
`phys.mod.semiconductor-classification`'s prior demonstration).

## Voice Teaching Notes

Listen for "longer wire, less resistance" reasoning — the direct
MC-LONGER-WIRE-HAS-LOWER-RESISTANCE tell. Load-bearing sentence: "longer
means MORE resistance — more material for current to push through; wider
means LESS — more parallel paths." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting less resistance for a longer wire signals
MC-LONGER-WIRE-HAS-LOWER-RESISTANCE (MISCONCEIVING, full repair via
measurement). A learner predicting increased semiconductor resistance
with heating signals the temperature misconception (full repair via
recalling the metal/semiconductor contrast). Mastery trigger: correctly
computing R = ρL/A with correct directional dependencies for both L and A,
AND correctly stating opposite temperature responses for metals vs.
semiconductors. Blueprint's assessment component cited for the full item
bank.

## Tutor Recovery Strategy

Shrink-to question: "forget resistance for a second — if a wire is
longer, does current have to travel through MORE material or LESS?"
(isolating the length-as-more-material intuition). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (geometry-independent ρ vs. geometry-dependent R; metal/
semiconductor temperature contrast) bound to procedure (R = ρL/A
calculation). Interleave with `phys.em.ohms-law` and
`phys.mod.semiconductor-classification` (the direct temperature-response
contrast partner).

## Transfer Connections

Near: any wire-geometry resistance problem, including household wiring
gauge selection. Far: electrical engineering (conductor sizing for power
transmission, balancing resistivity, length, and cross-section against
cost and power loss) and semiconductor device design (temperature-dependent
resistivity is central to thermistor and sensor design). Real-world: why
long extension cords cause voltage drop and why thick gauge wire is used
for high-current applications. Expert: the Drude model's microscopic
derivation of both R = ρL/A and the metal/semiconductor temperature
contrast.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified
beyond the intra-physics connection to semiconductor classification
already discussed; honest "weak but real" assessment at the cross-subject
level.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
practice-set/assessment components by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No genuine cross-SUBJECT connection found; the strongest connection
(semiconductor temperature response) is intra-physics, honestly recorded.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

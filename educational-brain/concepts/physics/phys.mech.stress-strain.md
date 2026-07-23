# Stress, Strain, and Elastic Moduli — `phys.mech.stress-strain`

## Identity

- **Concept ID**: `phys.mech.stress-strain` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.hookes-law` — the load-bearing part is
  generalizing Hooke's law's spring-specific F = −kx into
  material-general, geometry-independent stress-strain relationships.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly define stress (force per unit
cross-sectional area, σ = F/A) and strain (fractional deformation,
ε = ΔL/L), and correctly explain why these geometry-normalized quantities,
rather than raw force and raw extension, are needed to describe a
MATERIAL's intrinsic elastic property independent of a specific object's
size and shape; (2) correctly compute Young's modulus, E = σ/ε, and
correctly explain that it is a material property (like density), not an
object-specific property (unlike Hooke's law's spring constant k, which
does depend on a specific spring's geometry); (3) correctly identify the
elastic limit on a stress-strain graph and correctly explain the
distinction between elastic (reversible) and plastic (permanent)
deformation beyond it.

## Core Understanding

Hooke's law (F = −kx) describes one specific spring or rod's force-
extension behavior, but the spring constant k depends on that object's
particular geometry (length, cross-sectional area) as well as its
material — a thick steel rod and a thin steel wire have very different k
values despite being the identical material. Stress (σ = F/A) and strain
(ε = ΔL/L) normalize out this geometry dependence: dividing force by
cross-sectional area and extension by original length yields quantities
that depend ONLY on the material itself, not on the specific object's
size — Young's modulus, E = σ/ε (the material's intrinsic "stiffness"),
is therefore a genuine material property, identical for any size or shape
of a given material (steel has one Young's modulus, rubber another,
regardless of how thick or long a particular sample is). Beyond a
material's elastic limit, deformation becomes plastic (permanent) —
stress-strain graphs show a straight-line (Hooke's-law-obeying) region up
to this limit, after which the material either yields (stretches further
with little added stress) or, pushed further, fractures; unlike the
elastic region, plastic deformation does NOT reverse when the applied
stress is removed.

## Mental Models

**Beginner**: "Stress and strain are just fancier words for force and
stretch." Upgrade trigger: comparing a thick and thin rod of the IDENTICAL
material stretched by the same force (different extensions, but IDENTICAL
E = σ/ε) directly confronts the force/stress and extension/strain
conflation.

**Intermediate**: "Stress = F/A, strain = ΔL/L; Young's modulus E = σ/ε is
a material property, unlike k which depends on geometry." This model
correctly separates the material-intrinsic quantities, but sometimes still
uses "Young's modulus" and "stiffness" (a looser, geometry-dependent
everyday notion) interchangeably.

**Advanced**: "Young's modulus IS the material's intrinsic stiffness in
the precise, geometry-normalized sense — a specific object's overall
'stiffness' (its k value) further depends on E combined with that
specific object's length and cross-sectional area (k = EA/L for a
uniform rod)."

**Expert**: stress and strain as tensor quantities in three dimensions
(with Poisson's ratio describing lateral contraction under axial stretch)
— not required for mastery at this level, which treats the 1D (axial)
case only.

## Why Students Fail

The dominant failure is force/stress and Hooke's-k/Young's-E conflation:
students correctly learned Hooke's law's spring-specific k, and struggle
to see WHY a new, geometry-normalized quantity (E) is needed rather than
just reusing k, missing that k varies by object shape while E is a fixed
material property.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.stress-strain.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-STRESS-IS-FORCE**: stress treated as simply another name for force,
  without the area-normalization. **Birth type**: overgeneralization
  (Type 1) — force is the more familiar, directly-taught quantity, and
  stress's specific per-unit-area normalization is dropped in casual
  reasoning. Probe: "Two rods of the same material and length, but
  different cross-sectional areas, are pulled with the SAME force. Do they
  experience the same stress?"
- **MC-YOUNG-MODULUS-IS-STIFFNESS**: Young's modulus conflated with an
  object's overall Hooke's-law stiffness (k), without recognizing E is
  geometry-independent while k is not. **Birth type**: analogy
  overextension (Type 6) — both describe "how stiff/resistant to
  deformation," and the geometry-dependence distinction between the two is
  not made explicit. Probe: "A thick steel rod and a thin steel wire —
  same material, different thickness. Do they have the same Young's
  modulus? Do they have the same spring constant k?"

## Analogies

**Best**: density vs. weight — weight (like force/extension) depends on
how MUCH material you have (a bigger chunk weighs more), while density
(like stress/strain, giving E) is an intrinsic material property,
identical whether you have a small or large chunk of the same substance.
Directly targets both misconceptions by anchoring the geometry-independent
vs. geometry-dependent distinction in an already-familiar material
property (density).

**Anti-analogy**: do NOT say "Young's modulus tells you how stiff
something is" without specifying "the MATERIAL, independent of its
shape/size" — bare "how stiff something is" reinforces
MC-YOUNG-MODULUS-IS-STIFFNESS by blurring it with object-specific k.

## Demonstrations

Physical: stretch two rods of the identical material but different
cross-sectional area with the same applied force, showing different
extensions (different k) but computing IDENTICAL stress/strain ratios
(same E) — directly targets both misconceptions with concrete, contrasting
numbers.

## Discovery Questions

Discovery-style: "if a thick rod and a thin rod of the same material
stretch differently under the same force, does that mean they're made of
different 'stiffness' materials?" — learner reasons through the
density-analogy framing before the formal stress/strain definitions are
introduced, directly confronting the geometry-dependence conflation.

## Teaching Sequence

Blueprint's session-flow component cited by reference.
MC-STRESS-IS-FORCE repaired first (establishing the area-normalization),
before MC-YOUNG-MODULUS-IS-STIFFNESS, since the modulus-vs-k distinction
depends on stress/strain themselves already being trusted as
geometry-normalized quantities.

## Tutor Actions

WORKED-EXAMPLE (computing σ, ε, E for two different-geometry rods of the
same material); ANALOGY (density vs. weight); DEMONSTRATION (stretching
two different-area rods of the same material).

## Voice Teaching Notes

Listen for "stress" and "force" used interchangeably without area
qualification — the MC-STRESS-IS-FORCE tell. Load-bearing sentence:
"stress and strain are normalized by area and length specifically so they
describe the MATERIAL, not a particular object's size." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming two different-area rods of the same material under the
same force experience the "same stress" (rather than different stress,
same E) signals MC-STRESS-IS-FORCE (MISCONCEIVING, full repair via the
demonstration). Mastery trigger: correctly computing σ, ε, E for two
different-geometry objects of the same material, confirming identical E
despite different k. Blueprint's assessment component cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the rod's size for a second — if you had TWICE
as much cross-sectional area, would the SAME force feel like more or less
stress?" (isolating the area-normalization intuition). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (geometry-independent material property) bound to procedure (σ,
ε, E calculation). Interleave with `phys.mech.hookes-law` (the
geometry-dependent k this concept generalizes beyond).

## Transfer Connections

Near: any material-property comparison problem. Far: structural and
materials engineering (selecting materials by Young's modulus for a given
application, independent of the final part's shape) and biomechanics
(bone and tissue elastic properties). Real-world: why a steel cable and a
steel rod of very different thickness are still "the same stiffness of
material" in the engineering sense, even though one bends more easily.
Expert: full stress-strain tensor treatment and Poisson's ratio in three
dimensions.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to chemistry/materials
science (intrinsic material properties independent of sample size, a
concept shared with density, specific heat, and other intensive
properties) — not currently captured as a cross_link. Recorded as
Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
session-flow/assessment components by reference. Not restated: Concept
Identity, Explanation Blocks, Worked Examples, Adaptive Branching,
Visualisation Specification, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine connection to chemistry's
intensive-material-property concept (shared with density, specific heat).
Flagged for the Curriculum Production Pipeline's backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

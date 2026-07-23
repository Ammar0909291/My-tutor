# Mass-Energy Equivalence: E=mc² — `phys.rel.mass-energy`

## Identity

- **Concept ID**: `phys.rel.mass-energy` (canonical physics KG)
- **Curriculum location**: physics / special relativity — dependency
  level 15.
- **Prerequisites**: `phys.rel.relativistic-momentum` — E=mc² is the
  v=0 special case of the already-established energy-momentum invariant
  E²=(pc)²+(mc²)².
- **Unlocks** (from KG): `phys.rel.spacetime`, `phys.particle.antimatter`.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that rest mass does NOT "convert
into" or "disappear as" energy — rest mass IS a form of stored energy, and
what happens in reactions is a redistribution between rest-mass energy
and kinetic energy, with TOTAL energy conserved throughout; (2) correctly
explain that E=mc² gives the REST energy only — for a moving particle,
total energy is E=γmc², strictly greater than mc²; (3) correctly explain
that matter-antimatter annihilation does not violate energy conservation
— the rest-mass energy of the annihilating pair reappears as photon
energy, with total energy conserved; (4) correctly explain that
antiparticles have the SAME (positive) mass as their particle partners,
differing only in charge and other quantum numbers, never in having
"negative mass."

## Core Understanding

E₀=mc² is the rest-energy relation: a particle at rest has energy E₀=mc²,
a direct consequence of the Lorentz-invariant relation
E²−(pc)²=(mc²)² evaluated at p=0. A first persistent error frames nuclear
reactions as "mass converting to energy," as if mass disappears — but the
products of a nuclear reaction still have mass (only ~0.09% of uranium's
mass "vanishes" in fission; 99.91% remains as product mass); what actually
happens is that some REST-MASS energy (stored via nuclear binding)
reappears as KINETIC energy of the products — total energy (rest +
kinetic) is conserved throughout, with no true "conversion" of one
substance into another. A second error applies E=mc² to a MOVING
particle's total energy — but E=mc² is specifically the rest energy;
total energy for a moving particle is E=γmc², which for v=0.99c is nearly
7× the rest energy. A third error worries that matter-antimatter
annihilation (e.g., e⁺+e⁻→2γ) violates energy conservation because
"matter disappears" — but the rest-mass energy 2mₑc² is fully accounted
for as the two photons' combined energy; nothing is lost, only
redistributed in form. A fourth error, often from sci-fi exposure,
attributes "negative mass" to antiparticles — but a positron has EXACTLY
the same mass as an electron (0.511 MeV/c²) and positive energy; "anti"
refers to opposite charge and other quantum numbers, never to negative
mass.

## Mental Models

**Beginner**: "Mass converts into energy and disappears in nuclear
reactions; E=mc² gives the total energy of anything, moving or not;
matter-antimatter annihilation seems to violate energy conservation;
antimatter has negative mass." Upgrade trigger: computing the mass of
uranium fission products explicitly (finding 99.91% of the original mass
remains) directly confronts the mass-disappears assumption; computing
E=γmc² for a fast-moving proton (finding it far exceeds mc²) directly
confronts the E=mc²-for-everything assumption.

**Intermediate**: "Rest mass IS a form of energy; reactions redistribute
energy between rest-mass and kinetic forms, with total energy conserved;
E=mc² is specifically the rest energy, with E=γmc² for moving particles;
annihilation converts rest-mass energy fully into photon energy, energy
conserved; antiparticles have identical (positive) mass to their partners,
differing only in charge." This model correctly captures all four points
but may still need to explicitly distinguish E₀=mc² from E=γmc² with a
labeled subscript when working a new problem.

**Advanced**: "Always explicitly label rest energy E₀=mc² vs. total
energy E=γmc² vs. kinetic energy (γ−1)mc² before substituting into any
calculation, and always verify total energy conservation (rest + kinetic
+ photon) rather than describing any process as mass 'disappearing.'"

**Expert**: the four-vector derivation (p^μp_μ=E²/c²−|p|²=m²c², with
E=mc² emerging at p=0 as a Lorentz-invariant special case) and Einstein's
original 1905 photon-emission argument — not required for mastery,
foundational bridge to `phys.rel.spacetime`.

## Why Students Fail

The dominant failure is framing mass-energy conversion as mass literally
disappearing rather than rest-mass energy redistributing into kinetic or
photon energy with total energy conserved; closely related failures
include applying E=mc² to a moving particle's total energy (forgetting
the required γ factor), worrying that annihilation violates energy
conservation, and attributing negative mass to antiparticles.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.rel.mass-energy.md`, §4
Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (E=mc² means mass disappears and becomes energy in nuclear
  reactions)**: believing "the mass was converted to pure energy."
  **Birth type**: language contamination (Type 3) — popular-science
  "mass-to-energy conversion" phrasing is taken literally, missing that
  rest mass IS energy and what changes is the FORM (rest-mass vs.
  kinetic), not the total amount, and that most of the original mass
  remains in the products. Probe: "In a nuclear reaction releasing 200
  MeV, what happened to the mass?"
- **MC-2 (E=mc² applies to all energy, not just rest energy)**: believing
  "total energy=mc² so the proton 'weighs' more when moving," applying
  E=mc² without the γ factor. **Birth type**: overgeneralization (Type
  1) — the rest-energy formula is extended to the general (moving)
  case without recognizing m must specifically be rest mass and E must
  specifically be rest energy, missing the distinct role of E=γmc² for
  total energy. Probe: "A proton moving at 0.8c — what is its 'mass'
  according to E=mc²?"
- **MC-3 (pair production/annihilation creates or destroys mass from
  nothing)**: believing "energy creates mass — matter appears from
  nowhere," or that annihilation destroys matter without accounting for
  where its energy goes. **Birth type**: instruction-induced (Type 5) —
  poetic "energy creates matter" phrasing in popular explanations
  obscures that energy is conserved throughout, missing that the photon's
  energy converts into rest-mass energy of the created particles plus
  kinetic energy, with the total conserved. Probe: "In γ→e⁺+e⁻, where do
  the particles come from?"
- **MC-4 (antiparticles have negative mass or negative energy)**:
  believing "antimatter is negative mass — that's why it annihilates
  matter." **Birth type**: analogy overextension (Type 6) — sci-fi
  framing and a misreading of Dirac's historical negative-energy
  solutions (which Dirac himself reinterpreted as positive-energy
  antiparticles) install a negative-mass picture, missing that positrons
  have identical positive mass to electrons, differing only in charge.
  Probe: "A positron is the antiparticle of the electron. Does it have
  negative mass?"

## Analogies

**Best**: a fully charged vs. discharged battery — the charged battery has
very slightly more mass, with the stored electrical energy contributing to
its mass via E₀=mc² (though the difference, ~10⁻¹⁴ kg for a 100 Wh
battery, is immeasurably small at chemical-energy scales) — directly
targets MC-1 by illustrating that stored energy IS mass at ANY scale,
with nuclear reactions merely making the effect large enough (Δm/m≈0.1%)
to measure, unlike chemical reactions (Δm/m≈10⁻¹⁰).

**Anti-analogy**: do NOT say "matter transforms into energy, like wood
burning into ash, smoke, and heat" — this directly reinforces MC-1's
"mass disappears" framing; in chemical combustion, the total mass of
reactants equals the total mass of products to a precision far beyond any
practical scale (Δm/m~10⁻¹⁰), unlike nuclear reactions where the mass
change is genuinely measurable.

## Demonstrations

Worked-example: compute the mass of a uranium fission's reactants and
products explicitly (finding only ~0.09% "missing," redistributed as
kinetic energy of the fragments) — directly targets MC-1. Worked-example:
compute rest energy E₀ vs. total energy E=γmc² for an electron at v=0.99c
(finding E_total≫E₀) — directly targets MC-2 by making the distinction
between the two quantities concrete.

## Discovery Questions

Discovery-style: "A hot cup of coffee at 80°C and a cold one at 20°C —
according to E=mc², is there any mass difference? Calculate it." —
learner computes Δm=ΔE/c²≈8.4×10⁻¹³ kg (about 3 parts per trillion),
directly confronting the assumption that mass-energy equivalence is a
purely nuclear-scale phenomenon, and discovering the principle is
universal even when the effect is immeasurably small outside nuclear
contexts.

## Teaching Sequence

Blueprint's §9 Teaching Actions cited by reference (5 actions: review the
four-vector origin of E₀=mc² as the v=0 special case → compute rest
energies for electron/proton/neutron → derive pair-production/annihilation
photon energy → connect nuclear mass-defect Q-values explicitly to
E₀=mc² → hot-coffee demonstration for universality-with-scale-difference).
MC-1 (mass disappearing) is addressed first via the mass-defect
connection, before MC-2 (E=mc² vs. E=γmc²) during the rest-energy
calculations, before MC-3 (annihilation/pair-production) during the
photon-energy derivation, before MC-4 (antiparticle mass) which surfaces
naturally when discussing e⁺+e⁻ annihilation.

## Tutor Actions

WORKED-EXAMPLE (uranium fission mass accounting, ~99.91% mass retained);
WORKED-EXAMPLE (E₀ vs. E=γmc² computed for an electron at 0.99c);
THOUGHT-EXPERIMENT (mass difference between hot and cold coffee);
ANALOGY (charged vs. discharged battery mass difference).

## Voice Teaching Notes

Listen for "mass converts to pure energy," "E=mc² is the total energy of
this moving particle," "annihilation breaks energy conservation," or
"antimatter has negative mass" — the four direct misconception tells.
Load-bearing sentence: "rest mass IS a form of energy, not something that
disappears — reactions just redistribute it into kinetic energy or
photons; E=mc² is the REST energy only, moving particles need E=γmc²; and
a positron weighs exactly what an electron weighs, just opposite charge."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing mass as disappearing signals MC-1 (full repair via
the fission mass-accounting worked example). A learner applying E=mc² to
a moving particle's total energy signals MC-2 (full repair via the
E₀ vs. γmc² comparison). A learner questioning energy conservation in
annihilation/pair-production signals MC-3 (full repair via the photon-
energy derivation). A learner attributing negative mass to antiparticles
signals MC-4 (full repair via the positron-mass lookup). Mastery trigger:
correctly calculating rest energy from mass AND correctly deriving pair-
production threshold AND correctly explaining annihilation photon energy
AND correctly connecting Q=Δm×931.5 MeV/u to E₀=mc² AND correctly
distinguishing rest energy from total energy. Blueprint's §11 Assessment
(Formative Assessments 1-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget nuclear reactions for a second — does a fully
charged battery weigh even a tiny bit more than a discharged one? What
does that tell you about where 'stored energy' lives?" (isolating the
energy-is-mass intuition at a familiar, low-stakes scale before
reapplying it to nuclear-scale mass defects). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (rest mass IS energy, never disappears, only redistributes; E=mc²
is rest energy only, E=γmc² is total; annihilation/pair production
conserve total energy; antiparticles have positive, equal mass) bound to
procedure (computing E₀=mc² in SI or MeV/c²; connecting Q-value
calculations explicitly to E₀=mc²). Interleave with
`phys.rel.relativistic-momentum`, `phys.mod.binding-energy`, and
`phys.mod.nuclear-reactions`.

## Transfer Connections

Near: any rest-energy, pair-production-threshold, or nuclear-Q-value
calculation. Far: astrophysics (neutron star rest energy vastly exceeding
gravitational binding energy) and particle physics (invariant mass of
unstable particles measured via E²−(pc)²=(mc²)²). Real-world: PET imaging
(positron annihilation producing two 511 keV photons for tumor
localization) and the sun's mass loss (4.3 million tonnes per second via
fusion). Expert: the four-vector/Lorentz-invariant derivation and its
generalization to general relativity's stress-energy tensor.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to biology
(PET imaging, a direct clinical application of e⁺e⁻ annihilation) —
recorded honestly as a Curriculum Feedback item, not fixed (no KG file
modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.rel.mass-energy.md`,
numbered-section format). Reuses: §4 Misconception Library by reference.
Not restated: §0 Concept Metadata, §1 Concept Spine full formula set, §5
Explanation Library, §7 Demonstration Library full procedures, §8
Discovery Lesson full sequence, §11 Assessment full item text, §12
Recovery Notes, §13 Memory and Review schedule, §14 Transfer Map. The
Blueprint's own §15 suggests consolidating this concept's teaching session
with `phys.rel.relativistic-momentum` pedagogically, while keeping them
separate KG nodes — this EB entry keeps them as separate files per the
KG's own node boundaries, consistent with program policy.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to biology/
medicine (PET imaging as a direct clinical application of e⁺e⁻
annihilation photons) — recorded honestly, not fixed (no KG or Blueprint
file modified).

## Version History

- 2026-07-23 (physics EB Wave 15): initial authoring.

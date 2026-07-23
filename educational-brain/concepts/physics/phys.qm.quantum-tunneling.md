# Quantum Tunneling — `phys.qm.quantum-tunneling`

## Identity

- **Concept ID**: `phys.qm.quantum-tunneling` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 15.
- **Prerequisites**: `phys.qm.schrodinger-equation` — tunneling is the
  physical interpretation of the evanescent-wave TISE solution in a
  classically forbidden region.
- **Unlocks** (from KG): `phys.qm.wkb-approximation`.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that tunneling does NOT involve the
particle "borrowing" energy to temporarily exceed the barrier — the
transmitted particle has EXACTLY the same energy as the incident particle,
conserved throughout; (2) correctly explain that tunneling does NOT
violate energy conservation — the question "what is the particle's
kinetic energy at a specific position inside the barrier" is ill-posed in
quantum mechanics, since there is no trajectory to evaluate it along;
(3) correctly explain that transmission probability T depends
EXPONENTIALLY, not linearly, on barrier width d (T≈e^(−2κd)), so doubling
d roughly SQUARES T rather than halving it; (4) correctly explain that ALL
particles tunnel, not just electrons — heavier particles (protons, alpha
particles) tunnel with dramatically smaller but still nonzero probability.

## Core Understanding

When a particle encounters a barrier V₀>E, its wave function does NOT
stop abruptly — it decays exponentially inside the barrier (evanescent
wave), and if the barrier is thin enough, a reduced-amplitude wave emerges
on the other side: the particle has tunneled. A first persistent error
imagines the particle temporarily "borrows" energy ΔE=V₀−E via the
uncertainty principle to cross over the top — but the transmitted
particle's energy EQUALS the incident particle's energy exactly (no
energy spike is needed); the wave function inside the barrier is
evanescent (real exponential decay), not oscillatory, so there is no
"moment" at which the particle has extra kinetic energy. A second, closely
related error worries that tunneling violates energy conservation because
classically KE=E−V₀<0 inside the barrier would be impossible — but
quantum mechanically, position and energy cannot simultaneously be sharp,
so the question "what is the particle's KE at position x inside the
barrier" is simply ill-posed; only the wave function's overall structure
and asymptotic energy (the same E throughout) are meaningful. A third
error assumes T scales linearly with barrier thickness d (from classical
wave-attenuation intuition) — but T≈e^(−2κd) is exponential, so doubling d
roughly SQUARES the already-small T, which is exactly the mechanism
exploited by scanning tunneling microscopes for sub-angstrom vertical
resolution. A fourth error assumes only electrons tunnel — but alpha
particles tunnel through nuclear Coulomb barriers in alpha decay, and
protons tunnel in enzyme reactions and stellar fusion; T decreases sharply
with mass (κ∝√m) but is never exactly zero for any particle.

## Mental Models

**Beginner**: "The particle borrows energy to get over the barrier
temporarily; tunneling seems to violate energy conservation; doubling the
barrier width should roughly halve the tunneling probability; only tiny
particles like electrons can tunnel." Upgrade trigger: computing the
transmitted particle's energy explicitly (finding it equals the incident
energy, with no "extra" energy anywhere) directly confronts the energy-
borrowing assumption; computing T for d and 2d explicitly (finding T
roughly SQUARES rather than halves) directly confronts the linear-scaling
assumption.

**Intermediate**: "The wave function decays evanescently in the barrier
without any energy change; the question of KE at a specific point inside
the barrier is ill-posed, not answerable classically; T is exponentially
(not linearly) sensitive to barrier width; all particles tunnel, with
probability decreasing sharply but never reaching zero as mass increases."
This model correctly captures all four points but may still need explicit
recomputation of κ for a new mass or barrier height rather than assuming
a memorized T value transfers.

**Advanced**: "Always verify that transmitted-particle energy equals
incident energy (no borrowing) before discussing tunneling, and always use
the exponential T≈e^(−2κd) relationship — never linear — when reasoning
about barrier-width sensitivity."

**Expert**: the full matching-condition derivation (continuity of ψ and
ψ' at both boundaries) and the Gamow-factor/WKB generalization to non-
rectangular barriers (the Coulomb barrier in alpha decay) — not required
for mastery, natural bridge to `phys.qm.wkb-approximation`.

## Why Students Fail

The dominant failure is imagining the particle temporarily borrows energy
to cross the barrier (a misapplication of the energy-time uncertainty
relation); closely related failures include worrying that tunneling
violates energy conservation (from asking an ill-posed classical
question), assuming linear rather than exponential sensitivity to barrier
width, and assuming only electrons (not heavier particles) can tunnel.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.quantum-tunneling.md`, §4
Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (the particle goes over the barrier using borrowed energy)**:
  believing "the uncertainty principle lets it borrow energy ΔE for time
  Δt." **Birth type**: instruction-induced (Type 5) — pop-science
  descriptions and a misapplication of the energy-time uncertainty
  relation are absorbed as the mechanism, missing that the transmitted
  particle's energy equals the incident energy exactly, with no
  intermediate energy spike. Probe: "How does a particle tunnel? Does it
  temporarily have enough energy to reach the top?"
- **MC-2 (tunneling violates energy conservation)**: believing "energy
  conservation says this shouldn't happen" because classically
  KE=E−V₀<0 inside the barrier. **Birth type**: overgeneralization (Type
  1) — the classical requirement that KE be well-defined and non-negative
  at every point along a trajectory is incorrectly extended into quantum
  mechanics, missing that position and energy cannot be simultaneously
  sharp, making the question ill-posed rather than answerable with a
  negative KE. Probe: "If a particle with E=1 eV tunnels through a
  barrier of V₀=5 eV, where does it get the energy to be inside the
  barrier?"
- **MC-3 (T depends linearly on barrier thickness)**: believing "T
  decreases proportionally with thickness." **Birth type**:
  overgeneralization (Type 1) — classical linear-attenuation intuition
  (as in sound through walls) is incorrectly extended to quantum
  transmission, missing that T≈e^(−2κd) is exponential, so doubling d
  SQUARES T rather than halving it. Probe: "If I double the barrier
  thickness, how does T change?"
- **MC-4 (tunneling is only relevant for electrons)**: believing "only
  electrons are small enough to tunnel." **Birth type**: overgeneralization
  (Type 1) — the common electron-focused introductory examples are
  mistaken for an exhaustive scope, missing that alpha particles, protons,
  and even whole atoms tunnel, with T decreasing exponentially with mass
  but never reaching exactly zero. Probe: "Can a proton tunnel? What
  about a carbon atom?"

## Analogies

**Best**: frustrated total internal reflection (FTIR) in optics — two
glass prisms separated by a narrow air gap; light normally totally
internally reflects, but if the gap is thin enough, light "tunnels"
through with reduced intensity — mathematically identical evanescent-wave
structure, directly targeting MC-1 and MC-2 by showing energy is
conserved throughout (no borrowed energy, just amplitude leakage).

**Anti-analogy**: do NOT say "the particle slips through a crack in the
barrier" — this directly installs a false structural-defect picture; the
barrier has no hole, and tunneling occurs uniformly across the FULL
barrier due to the wave-like nature of the particle, not through any gap.

## Demonstrations

Worked-example: compute T for d=0.5, 1.0, 1.5 nm with κ≈10.8 nm⁻¹
(STM-typical), finding T≈2×10⁻⁵, 4×10⁻¹⁰, 8×10⁻¹⁵ — directly targets MC-3
by making the exponential (not linear) sensitivity to d concrete.
Worked-example: compute T for an electron vs. a proton through the same
1 eV, 0.5 nm barrier (T_electron≈6×10⁻³ vs. T_proton≈10⁻⁴¹) — directly
targets MC-4, showing tunneling still occurs for the proton, just at a
vastly smaller (never zero) probability.

## Discovery Questions

Discovery-style: "Both ²³⁸U and ²¹²Po are alpha emitters through a
Coulomb barrier, yet their half-lives differ by 24 orders of magnitude
(4.5 billion years vs. 0.3 microseconds). What single quantity, varying
only modestly between the two, could cause such an enormous difference?"
— learner discovers the exponential Gamow-factor dependence on alpha
particle energy, directly targeting MC-3's linear-scaling assumption by
showing how a modest energy difference compounds exponentially.

## Teaching Sequence

Blueprint's §9 Teaching Actions cited by reference (7 actions: classical-
forbidden-region setup → TISE evanescent solution in the barrier →
three-region matching → transmission-coefficient derivation →
exponential-sensitivity computation → Gamow-factor qualitative discussion
→ applications). MC-1 (energy borrowing) and MC-2 (energy-conservation
violation) are addressed together early, during the evanescent-solution
discussion, before MC-3 (exponential sensitivity) during the
transmission-coefficient computation, before MC-4 (mass dependence) during
the applications discussion (alpha decay, enzyme tunneling).

## Tutor Actions

WORKED-EXAMPLE (T computed for d=0.5/1.0/1.5 nm, STM-typical κ);
WORKED-EXAMPLE (T compared for electron vs. proton through an identical
barrier); THOUGHT-EXPERIMENT (Geiger-Nuttall: why do ²³⁸U and ²¹²Po have
half-lives differing by 24 orders of magnitude?); ANALOGY (frustrated
total internal reflection, evanescent optical wave).

## Voice Teaching Notes

Listen for "it borrows energy to get over," "this breaks energy
conservation," "doubling the width should halve the chance," or "only
electrons tunnel" — the four direct misconception tells. Load-bearing
sentence: "the transmitted particle has exactly the same energy it started
with — nothing borrowed, nothing broken; and the probability drops
exponentially with width, not in a straight line; and every particle
tunnels, just some far less than others." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing energy-borrowing signals MC-1 (full repair via the
transmitted-particle-energy verification). A learner worrying about
energy-conservation violation signals MC-2 (full repair via the ill-posed-
question framing). A learner assuming linear width-sensitivity signals
MC-3 (full repair via the d vs. 2d exponential computation). A learner
restricting tunneling to electrons signals MC-4 (full repair via the
electron-vs-proton comparison). Mastery trigger: correctly writing the
evanescent wave function in the barrier AND correctly computing T≈e^(−2κd)
for given parameters AND correctly explaining the exponential sensitivity
AND correctly connecting to at least two physical applications. Blueprint's
§11 Assessment (Formative Assessments 1-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the barrier for a second — does light
totally reflecting off glass ever appear on the other side of a second,
very close piece of glass, even though it 'shouldn't' classically cross
the air gap?" (isolating the evanescent-wave-leakage intuition via the
familiar optical case before reapplying it to matter waves). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (evanescent wave decays but doesn't reach zero; energy is
conserved throughout, never borrowed; T is exponential in width; all
particles tunnel, with mass-dependent probability) bound to procedure
(computing κ, then T≈e^(−2κd) for given barrier parameters). Interleave
with `phys.qm.schrodinger-equation`, `phys.mod.radioactivity`, and
`phys.mod.nuclear-reactions`.

## Transfer Connections

Near: any rectangular-barrier transmission-coefficient problem for
arbitrary V₀, E, d, m. Far: the Josephson effect (Cooper-pair tunneling
through thin insulators, fundamental to superconducting quantum computers)
and enzyme catalysis (proton tunneling contributing to reaction rates
above classical predictions). Real-world: the scanning tunneling
microscope (sub-angstrom resolution from exponential T sensitivity) and
stellar fusion (proton-proton fusion enabled by Gamow tunneling at
stellar temperatures far below the classical Coulomb-barrier threshold).
Expert: the WKB/Gamow-factor generalization to non-rectangular barriers.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
biology/biochemistry (proton tunneling in enzyme catalysis) — recorded
honestly as a Curriculum Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.quantum-
tunneling.md`, numbered-section format). Reuses: §4 Misconception Library
by reference. Not restated: §0 Concept Metadata, §1 Concept Spine full
formula set, §5 Explanation Library, §7 Demonstration Library full
procedures, §8 Discovery Lesson full sequence, §11 Assessment full item
text, §12 Recovery Notes, §13 Memory and Review schedule, §14 Transfer
Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to biology
(enzyme-catalyzed proton tunneling, an active biophysics research area)
— recorded honestly, not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 15): initial authoring.

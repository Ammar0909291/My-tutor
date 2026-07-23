# Particle in an Infinite Square Well — `phys.qm.particle-in-box`

## Identity

- **Concept ID**: `phys.qm.particle-in-box` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 15.
- **Prerequisites**: `phys.qm.schrodinger-equation` — the infinite square
  well is the first fully worked exact solution of the TISE.
- **Unlocks** (from KG): none — leaf node.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that the ground-state energy
E₁=π²ℏ²/(2mL²) is ALWAYS strictly positive — zero-point energy is
required by confinement, not an artifact removable at absolute zero;
(2) correctly explain that the wave function is EXACTLY zero outside an
infinite well (no leakage, unlike the finite well's tunneling), because
V=∞ there admits no other solution; (3) correctly explain that higher
excited states do NOT simply repeat the ground state's "peak at center"
pattern — each state φₙ has n probability maxima and n−1 interior nodes
whose positions depend on n; (4) correctly explain that energy-level
spacing GROWS with n (Eₙ=n²E₁, so spacing=(2n+1)E₁), unlike the equally-
spaced harmonic oscillator.

## Core Understanding

The particle in an infinite square well is the prototype of quantum
confinement: energy is quantized into Eₙ=n²π²ℏ²/(2mL²) levels. A first
persistent error expects the ground-state energy to be zero (carrying
over the classical "at rest ⟹ E=0" intuition) — but confinement to a
finite region Δx=L forces, via the uncertainty principle, a nonzero
momentum spread Δp≥ℏ/2L, hence a strictly positive minimum kinetic energy;
this zero-point energy is experimentally confirmed (liquid helium never
solidifies at 1 atm even at absolute zero). A second error, often held by
students already aware of tunneling in FINITE wells, expects some leakage
of the wave function beyond an INFINITE well's walls — but V=∞ forces
ψ=0 exactly outside; tunneling requires a finite barrier, which this
model deliberately excludes. A third error assumes every excited state
peaks at the center like the ground state does — but φₙ has n arches and
n−1 interior nodes, so for n=2 the probability is actually ZERO at the
center (x=L/2) and maximal at x=L/4 and 3L/4. A fourth error assumes
equal energy-level spacing (borrowing, often unconsciously, from the
harmonic oscillator) — but Eₙ=n²E₁ gives spacing (2n−1)E₁ between
consecutive levels, which INCREASES with n, unlike the harmonic
oscillator's constant ℏω spacing.

## Mental Models

**Beginner**: "The ground state can have zero energy at absolute zero;
maybe the particle leaks slightly outside an infinite well; all excited
states are most likely to be found near the center; energy levels are
evenly spaced." Upgrade trigger: computing E₁ numerically for an electron
in a 1 nm box (finding ≈0.376 eV, clearly nonzero) directly confronts the
zero-ground-state-energy assumption; plotting |φ₂|² and finding a node at
the center directly confronts the "always peaks at center" assumption.

**Intermediate**: "Confinement forces a strictly positive ground-state
energy via the uncertainty principle; the infinite well's wave function is
exactly zero outside (no tunneling, unlike the finite well); each state φₙ
has n maxima and n−1 nodes at specific locations; spacing between levels
grows as (2n−1)E₁." This model correctly captures all four points but
sometimes still needs to explicitly recompute node/maximum positions for
an unfamiliar n rather than assuming a fixed pattern.

**Advanced**: "Always verify the specific node/maximum structure for the
given n before predicting probability distribution shape, and always
distinguish the infinite well's exact ψ=0 boundary from the finite well's
tunneling case."

**Expert**: the correspondence-principle limit (|φₙ|² becoming
uniform as n→∞, recovering the classical equal-probability expectation)
and the 3D generalization to quantum dots (Eₙₓ,ₙ_y,ₙ_z with size-dependent
emission wavelength) — not required for mastery, natural bridge to
applications in nanophotonics.

## Why Students Fail

The dominant failure is expecting the ground-state energy to be zero,
carrying over the classical "at rest implies no energy" intuition;
closely related failures include expecting wave-function leakage outside
an infinite well (confusing it with the finite-well tunneling case),
assuming all excited states peak at the center like the ground state, and
assuming equal energy-level spacing borrowed from the harmonic oscillator.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.particle-in-box.md`, §4
Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (energy can be zero in the ground state)**: believing "at
  absolute zero, the particle is at rest [so E=0]." **Birth type**:
  language contamination (Type 3) — the everyday association of "ground
  state"/"lowest state" with "at rest" and therefore "zero energy" is
  incorrectly mapped onto the technical result, missing that confinement
  forces a strictly positive zero-point energy via the uncertainty
  principle. Probe: "Can an electron in a 1 nm box have zero kinetic
  energy?"
- **MC-2 (the particle can be found outside the well)**: believing "maybe
  it leaks out slightly," over-applying finite-well tunneling knowledge to
  the infinite-well case. **Birth type**: overgeneralization (Type 1) —
  knowledge of tunneling in finite wells is incorrectly extended to the
  infinite well, missing that V=∞ makes leakage mathematically impossible
  (ψ must be exactly zero outside). Probe: "Where can you find the
  particle in the infinite square well?"
- **MC-3 (higher n states have higher probability of being near the
  center)**: believing "it's most likely in the middle" for the n=2
  state. **Birth type**: overgeneralization (Type 1) — the ground state's
  (n=1) center-peaked probability distribution is incorrectly assumed to
  hold for all n, missing that |φ₂|² has a NODE (zero probability) at the
  center. Probe: "Where is the particle most likely to be found in the
  n=2 state?"
- **MC-4 (the Eₙ spacing is constant, like the harmonic oscillator)**:
  believing "energy levels are evenly spaced." **Birth type**:
  analogy overextension (Type 6) — the harmonic oscillator's genuinely
  equal spacing is incorrectly assumed to be a universal feature of
  quantized systems rather than a consequence specific to the parabolic
  potential, missing that the square well's n²-scaling gives increasing
  spacing. Probe: "If E₁ = 1 eV, what is E₂ − E₁ and E₃ − E₂?"

## Analogies

**Best**: harmonics on a guitar string — only standing waves that fit
the fixed-length string (λₙ=2L/n) are allowed, directly modeling the
matter-wave fitting condition that produces Eₙ=n²π²ℏ²/(2mL²), and
naturally illustrating why the ground state (n=1, one arch) differs
structurally from excited states (n arches, n−1 nodes) — targets MC-3.

**Anti-analogy**: do NOT say "the particle bounces back and forth like a
tennis ball between the walls" — this directly installs a trajectory
picture the node structure forbids: for n=2, the "ball" would have to
pass through x=L/2, but P(x=L/2)=0 exactly, contradicting any classical
bouncing-particle picture.

## Demonstrations

Worked-example: compute E₁ numerically for an electron confined to a 1 nm
box (≈0.376 eV, clearly nonzero) and compare to room-temperature kT
(≈25 meV) — directly targets MC-1. Worked-example: plot |φ₂(x)|² and
verify |φ₂(L/2)|²=0 explicitly by substitution — directly targets MC-3.

## Discovery Questions

Discovery-style: "How does the particle get from x=L/4 to x=3L/4 in the
n=2 state without ever passing through x=L/2, where the probability is
exactly zero?" — learner confronts the assumption that quantum mechanics
describes a continuous trajectory at all, directly targeting the "node
means the particle can't cross" framing by discovering that |ψ|² gives
only a probability distribution, with no trajectory concept to violate.

## Teaching Sequence

Blueprint's §9 Teaching Actions cited by reference (7 actions: standing-
wave intuition from guitar-string harmonics → TISE solution and boundary
conditions → quantized-energy derivation → normalization → wave-function
gallery with node/maximum identification → expectation-value calculation
and HUP verification → quantum-dot application). MC-1 (zero-point energy)
is addressed first during the quantized-energy derivation, before MC-2
(no leakage) during the boundary-condition discussion, before MC-3
(node/maximum structure) during the wave-function gallery, before MC-4
(unequal spacing) which surfaces naturally when comparing E₁, E₂, E₃.

## Tutor Actions

WORKED-EXAMPLE (E₁≈0.376 eV computed numerically for a 1 nm electron
box); WORKED-EXAMPLE (|φ₂(L/2)|²=0 verified by direct substitution);
THOUGHT-EXPERIMENT (how does the particle "cross" a node with zero
probability?); ANALOGY (guitar-string harmonics for standing-wave
fitting).

## Voice Teaching Notes

Listen for "at rest means zero energy," "maybe it leaks a little," "it's
most likely in the middle" (for n>1), or "energy levels are evenly
spaced" — the four direct misconception tells. Load-bearing sentence:
"confinement always costs energy — the ground state can never be zero;
and for an infinite well, ψ is exactly zero outside, no leaking; and each
state n has its own node pattern, don't assume it peaks at the center."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner expecting zero ground-state energy signals MC-1 (full repair
via the numerical E₁ calculation). A learner expecting wave-function
leakage outside the infinite well signals MC-2 (full repair via the V=∞
boundary-condition derivation). A learner assuming center-peaked
probability for excited states signals MC-3 (full repair via the |φ₂|²
plot). A learner assuming equal level spacing signals MC-4 (full repair
via the E₁,E₂,E₃ spacing comparison). Mastery trigger: correctly deriving
Eₙ=n²π²ℏ²/(2mL²) from the TISE and boundary conditions AND correctly
identifying node/maximum positions for any given n AND correctly computing
⟨x⟩, ⟨p²⟩, and verifying Δx·Δp≥ℏ/2. Blueprint's §11 Assessment (Formative
Assessments 1-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the box for a second — if I confine you to a
smaller and smaller room, does the uncertainty principle say your minimum
possible momentum spread goes up or down? What does that do to your
minimum kinetic energy?" (isolating the confinement-forces-energy
intuition before reapplying it to the specific E₁ formula). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (confinement forces nonzero ground-state energy; infinite well
means exactly zero leakage; node/maximum count = n and n−1 respectively;
spacing grows as (2n−1)E₁) bound to procedure (deriving Eₙ from TISE +
boundary conditions; computing expectation values via symmetry and direct
integration). Interleave with `phys.qm.schrodinger-equation` and, once
authored, `phys.qm.uncertainty-principle`/`phys.qm.operators`.

## Transfer Connections

Near: any 1D infinite-well problem for arbitrary mass and length, or any
expectation-value calculation for a given eigenstate. Far: quantum dots
and nanophotonics (E₁∝1/R² directly controlling emission wavelength/color
— real commercial QLED technology) and carbon nanotubes (1D confinement
giving quantized transverse modes). Real-world: quantum-dot display
technology, where dot size is engineered to control emitted light color.
Expert: the 3D generalization and the correspondence-principle limit as
n→∞.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (particle-in-a-box models for conjugated molecules and quantum
dot chemistry) — recorded honestly as a Curriculum Feedback item, not
fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.particle-in-
box.md`, numbered-section format). Reuses: §4 Misconception Library by
reference. Not restated: §0 Concept Metadata, §1 Concept Spine full
formula set, §5 Explanation Library, §7 Demonstration Library full
procedures, §8 Discovery Lesson full sequence, §11 Assessment full item
text, §12 Recovery Notes, §13 Memory and Review schedule, §14 Transfer
Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to chemistry
(particle-in-a-box models in quantum dot chemistry and conjugated
molecule spectroscopy) — recorded honestly, not fixed (no KG or Blueprint
file modified). The Blueprint's own §15 notes overlapping content with
`phys.qm.schrodinger-equation` (boundary conditions, energy eigenvalues)
but explicitly argues they are complementary, not redundant — the TDSE
blueprint establishes the framework, this one applies it with full
expectation-value calculations and applications; this EB entry follows
the same distinction.

## Version History

- 2026-07-23 (physics EB Wave 15): initial authoring.

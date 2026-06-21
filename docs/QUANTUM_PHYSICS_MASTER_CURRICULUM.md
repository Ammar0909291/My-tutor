# Quantum Physics — Master Curriculum (Tasks 2, 3, 4)

**Status: design only. No code, no DB, no subject registration.**
Definitive specification: **7 levels → 32 units → 131 lessons**, beginner (high-school algebra) →
research foundation. Difficulty tags reuse the platform vocabulary
(`foundational | developing | proficient | advanced`) so the eventual tree maps cleanly onto the
existing `mod()` / `CurriculumNode` shape without engine change.

Legend: **U#** = unit, **L#.#** = lesson. "Prereq" lists unit-level or lesson-level prerequisites by id.

---

## TASK 2 — LEVELS

### Level 1 — Foundations  (`LevelIndex` 0)
- **Goal:** give an algebra-only learner the math + classical-physics + "why classical fails" base.
- **Competencies:** calculus basics; complex numbers; describe waves/oscillations/energy; explain
  blackbody, photoelectric, line spectra as classical failures.
- **Prerequisite knowledge:** high-school algebra only.
- **Estimated hours:** ~46

### Level 2 — Wave Mechanics  (`LevelIndex` 1)
- **Goal:** build physical QM intuition wave-first; solve the 1D Schrödinger equation.
- **Competencies:** linear algebra & Fourier basics; wave–particle duality; set up and solve
  Schrödinger's equation for standard 1D potentials; interpret |ψ|².
- **Prerequisite knowledge:** Level 1.
- **Estimated hours:** ~54

### Level 3 — Formal Quantum Mechanics  (`LevelIndex` 2)
- **Goal:** re-express QM rigorously in Hilbert space; master postulates, operators, measurement,
  and the canonical solvable systems.
- **Competencies:** Dirac notation; postulates; observables & measurement; harmonic oscillator;
  angular momentum & spin; hydrogen atom.
- **Prerequisite knowledge:** Level 2.
- **Estimated hours:** ~70

### Level 4 — Advanced Quantum Systems  (`LevelIndex` 3)
- **Goal:** treat realistic systems — many particles, approximations, dynamics, scattering, entanglement.
- **Competencies:** identical particles; perturbation theory; time-dependent QM; scattering; entanglement & Bell.
- **Prerequisite knowledge:** Level 3.
- **Estimated hours:** ~58

### Level 5 — Quantum Information & Computing  (`LevelIndex` 4)
- **Goal:** from qubits to algorithms, error correction, cryptography, and hardware.
- **Competencies:** qubits/gates; circuits & core algorithms; QEC; QKD/communication; hardware platforms.
- **Prerequisite knowledge:** Level 4 (esp. entanglement) + linear algebra (Level 2).
- **Estimated hours:** ~58

### Level 6 — Modern Quantum Physics  (`LevelIndex` 5)
- **Goal:** statistical, open-system, relativistic, and field-theoretic extensions.
- **Competencies:** quantum statistical mechanics; decoherence; relativistic QM; QFT intro; particle-physics base.
- **Prerequisite knowledge:** Level 4 (Level 5 helpful for decoherence).
- **Estimated hours:** ~62

### Level 7 — Research Foundations  (`LevelIndex` 5)
- **Goal:** bridge to graduate research: gauge theory, many-body/condensed matter, frontiers & methods.
- **Competencies:** advanced QFT/gauge; quantum many-body & condensed matter; research literacy & methods.
- **Prerequisite knowledge:** Level 6.
- **Estimated hours:** ~52

---

## TASK 3 + TASK 4 — UNITS & LESSONS

> Difficulty: `F`=foundational, `D`=developing, `P`=proficient, `A`=advanced. Hours are per unit.

### LEVEL 1 — FOUNDATIONS

**U1 — Mathematical Toolkit I** · purpose: calculus & functions needed for wave mechanics · prereq: — · `F` · ~14h
- L1.1 Functions, graphs & units review (obj: model physical quantities) · prereq: —
- L1.2 Derivatives & rates of change (obj: differentiate standard functions) · prereq: L1.1
- L1.3 Integrals & areas (obj: integrate standard functions) · prereq: L1.2
- L1.4 Intro to differential equations (obj: solve simple 1st/2nd-order ODEs) · prereq: L1.3
- L1.5 Complex numbers & Euler's formula (obj: manipulate a+bi, e^{iθ}) · prereq: L1.1

**U2 — Classical Physics Essentials** · purpose: mechanics/energy language QM reuses · prereq: U1 · `F` · ~10h
- L2.1 Position, velocity, acceleration (obj: kinematic description) · prereq: L1.2
- L2.2 Forces, momentum & Newton's laws (obj: apply F=ma, conservation) · prereq: L2.1
- L2.3 Work, energy & potentials (obj: use energy conservation, potential wells) · prereq: L2.2
- L2.4 Probability & expectation values (obj: compute means/variances) · prereq: L1.3

**U3 — Waves & Oscillations** · purpose: the wave vocabulary of QM · prereq: U2 · `F` · ~10h
- L3.1 Simple harmonic motion (obj: describe SHM, period/frequency) · prereq: L2.3
- L3.2 Wave properties: wavelength, frequency, phase (obj: characterize waves) · prereq: L3.1
- L3.3 Superposition & interference (obj: add waves, predict fringes) · prereq: L3.2
- L3.4 Standing waves & normal modes (obj: quantized modes on a string) · prereq: L3.3

**U4 — The Failure of Classical Physics** · purpose: motivate QM historically · prereq: U3 · `D` · ~12h
- L4.1 Blackbody radiation & the ultraviolet catastrophe (obj: Planck quantization) · prereq: L3.4
- L4.2 The photoelectric effect (obj: photons, Einstein's relation) · prereq: L4.1
- L4.3 Atomic line spectra & the Bohr model (obj: quantized energy levels) · prereq: L4.2
- L4.4 The Compton effect & photon momentum (obj: photons carry momentum) · prereq: L4.2

### LEVEL 2 — WAVE MECHANICS

**U5 — Mathematical Toolkit II** · purpose: linear algebra & Fourier for QM · prereq: U1 · `D` · ~16h
- L5.1 Vectors & vector spaces (obj: linear combinations, basis) · prereq: L1.5
- L5.2 Matrices & linear transformations (obj: matrix operations) · prereq: L5.1
- L5.3 Eigenvalues & eigenvectors (obj: diagonalize simple matrices) · prereq: L5.2
- L5.4 Inner products & orthogonality (obj: projections, norms) · prereq: L5.1
- L5.5 Fourier series & transforms (obj: decompose signals into frequencies) · prereq: L5.4

**U6 — Wave–Particle Duality** · purpose: core conceptual pivot · prereq: U4, U5 · `D` · ~10h
- L6.1 de Broglie matter waves (obj: λ = h/p) · prereq: L4.4, L5.5
- L6.2 The double-slit experiment with particles (obj: interference of single quanta) · prereq: L6.1
- L6.3 Wave packets & group velocity (obj: localize a particle from waves) · prereq: L6.1
- L6.4 Heisenberg uncertainty (qualitative) (obj: Δx·Δp ≳ ħ from packets) · prereq: L6.3

**U7 — The Schrödinger Equation** · purpose: the central equation · prereq: U6 · `P` · ~14h
- L7.1 The wavefunction & Born's rule (obj: interpret |ψ|² as probability) · prereq: L6.4
- L7.2 Time-dependent Schrödinger equation (obj: write/parse the TDSE) · prereq: L7.1
- L7.3 Time-independent Schrödinger equation & stationary states (obj: separate variables) · prereq: L7.2
- L7.4 Probability current & normalization (obj: conserve probability) · prereq: L7.1

**U8 — Particle in 1D Potentials** · purpose: solvable intuition-builders · prereq: U7 · `P` · ~14h
- L8.1 Infinite square well (obj: quantized energies & nodes) · prereq: L7.3
- L8.2 Finite square well & bound states (obj: matching conditions) · prereq: L8.1
- L8.3 Potential barriers & quantum tunneling (obj: transmission through barriers) · prereq: L8.2
- L8.4 The step potential & reflection (obj: reflection/transmission coefficients) · prereq: L8.2

### LEVEL 3 — FORMAL QUANTUM MECHANICS

**U9 — Hilbert Spaces & Dirac Notation** · purpose: rigorous state language · prereq: U5, U8 · `P` · ~12h
- L9.1 State vectors & bra–ket notation (obj: write |ψ⟩, ⟨φ|) · prereq: L8.1, L5.4
- L9.2 Hilbert space & completeness (obj: infinite-dim inner-product spaces) · prereq: L9.1
- L9.3 Basis states & superposition (obj: expand in a basis) · prereq: L9.2
- L9.4 Position & momentum representations (obj: switch representations) · prereq: L9.3

**U10 — Postulates of Quantum Mechanics** · purpose: the axiomatic core · prereq: U9 · `P` · ~12h
- L10.1 The state postulate (obj: states as rays in Hilbert space) · prereq: L9.4
- L10.2 Observables as Hermitian operators (obj: link measurables to operators) · prereq: L10.1
- L10.3 The measurement postulate & collapse (obj: outcomes, probabilities, collapse) · prereq: L10.2
- L10.4 Time evolution & the Hamiltonian (obj: unitary evolution) · prereq: L10.2

**U11 — Operators, Observables & Measurement** · purpose: working with operators · prereq: U10 · `A` · ~14h
- L11.1 Expectation values & variance (obj: compute ⟨A⟩, ΔA) · prereq: L10.3
- L11.2 Commutators & compatibility (obj: [A,B] and simultaneous measurement) · prereq: L11.1
- L11.3 The generalized uncertainty principle (obj: derive Δx·Δp ≥ ħ/2) · prereq: L11.2
- L11.4 Eigenstates, spectra & degeneracy (obj: solve eigenproblems) · prereq: L11.1
- L11.5 Ehrenfest's theorem & the classical limit (obj: recover classical motion) · prereq: L11.2

**U12 — The Quantum Harmonic Oscillator** · purpose: the universal model · prereq: U11 · `A` · ~12h
- L12.1 The QHO Hamiltonian & energy ladder (obj: E_n = ħω(n+½)) · prereq: L11.4
- L12.2 Ladder (creation/annihilation) operators (obj: a, a†) · prereq: L12.1
- L12.3 Wavefunctions & Hermite polynomials (obj: ground/excited states) · prereq: L12.1
- L12.4 Coherent states & applications (obj: most-classical states) · prereq: L12.2

**U13 — Angular Momentum & Spin** · purpose: rotations and the qubit's ancestor · prereq: U11 · `A` · ~16h
- L13.1 Orbital angular momentum operators (obj: L², L_z) · prereq: L11.2
- L13.2 Eigenvalues & spherical harmonics (obj: l, m quantum numbers) · prereq: L13.1
- L13.3 Spin-½ & the Stern–Gerlach experiment (obj: intrinsic spin) · prereq: L13.1
- L13.4 Pauli matrices & spinors (obj: 2-level spin algebra) · prereq: L13.3
- L13.5 Addition of angular momenta (obj: Clebsch–Gordan basics) · prereq: L13.2, L13.4

**U14 — The Hydrogen Atom** · purpose: the showcase exact solution · prereq: U12, U13 · `A` · ~14h
- L14.1 The Coulomb potential & separation in 3D (obj: set up the radial equation) · prereq: L13.2
- L14.2 Radial solutions & energy levels (obj: E_n, quantum numbers n,l,m) · prereq: L14.1
- L14.3 Orbitals & probability densities (obj: visualize s/p/d orbitals) · prereq: L14.2
- L14.4 Fine structure & spin–orbit coupling (obj: corrections to levels) · prereq: L14.2, L13.5

### LEVEL 4 — ADVANCED QUANTUM SYSTEMS

**U15 — Identical Particles & Many-Body Basics** · purpose: indistinguishability · prereq: U14 · `A` · ~12h
- L15.1 Indistinguishability & exchange symmetry (obj: symmetric/antisymmetric states) · prereq: L14.3
- L15.2 Bosons, fermions & the Pauli exclusion principle (obj: spin–statistics) · prereq: L15.1
- L15.3 Slater determinants & the periodic table (obj: build multi-electron states) · prereq: L15.2
- L15.4 Exchange interaction & basic many-body effects (obj: exchange energy) · prereq: L15.2

**U16 — Approximation Methods** · purpose: solving the unsolvable · prereq: U14 · `A` · ~14h
- L16.1 Time-independent perturbation theory (non-degenerate) (obj: 1st/2nd-order corrections) · prereq: L14.2
- L16.2 Degenerate perturbation theory (obj: lift degeneracies) · prereq: L16.1
- L16.3 The variational method (obj: bound ground-state energy) · prereq: L14.2
- L16.4 The WKB approximation (obj: semiclassical tunneling rates) · prereq: L8.3, L14.2

**U17 — Time-Dependent Quantum Mechanics** · purpose: transitions & driving · prereq: U16 · `A` · ~12h
- L17.1 Time-dependent perturbation theory (obj: transition amplitudes) · prereq: L16.1
- L17.2 Fermi's golden rule (obj: transition rates) · prereq: L17.1
- L17.3 Interaction with radiation: absorption & emission (obj: selection rules) · prereq: L17.2
- L17.4 Rabi oscillations in two-level systems (obj: driven qubit dynamics) · prereq: L13.4, L17.1

**U18 — Scattering Theory** · purpose: how we probe matter · prereq: U16 · `A` · ~10h
- L18.1 Cross sections & scattering amplitude (obj: define dσ/dΩ) · prereq: L8.4
- L18.2 Partial wave analysis (obj: phase shifts) · prereq: L13.2, L18.1
- L18.3 The Born approximation (obj: weak-potential scattering) · prereq: L16.1, L18.1

**U19 — Quantum Entanglement & Nonlocality** · purpose: the QI gateway · prereq: U13, U15 · `A` · ~12h
- L19.1 Composite systems & tensor products (obj: multi-qubit state space) · prereq: L13.4, L15.1
- L19.2 Entangled states & the EPR paradox (obj: define entanglement) · prereq: L19.1
- L19.3 Bell's theorem & inequalities (obj: rule out local hidden variables) · prereq: L19.2
- L19.4 Density matrices & mixed states (obj: describe subsystems/noise) · prereq: L19.1

### LEVEL 5 — QUANTUM INFORMATION & COMPUTING

**U20 — Qubits & Quantum Gates** · purpose: the computational primitives · prereq: U19 · `P` · ~12h
- L20.1 The qubit & the Bloch sphere (obj: represent 1-qubit states) · prereq: L19.4, L13.4
- L20.2 Single-qubit gates (X, Y, Z, H, phase) (obj: unitary 1-qubit ops) · prereq: L20.1
- L20.3 Multi-qubit gates (CNOT, controlled-U) (obj: entangling gates) · prereq: L20.1, L19.2
- L20.4 Universal gate sets & no-cloning (obj: universality, no-cloning theorem) · prereq: L20.2, L20.3

**U21 — Quantum Circuits & Algorithms** · purpose: real quantum programs · prereq: U20 · `A` · ~16h
- L21.1 The circuit model & measurement (obj: read circuit diagrams) · prereq: L20.4
- L21.2 Superdense coding & quantum teleportation (obj: use entanglement as a resource) · prereq: L20.3, L19.2
- L21.3 Deutsch–Jozsa & Bernstein–Vazirani (obj: first quantum speedups) · prereq: L21.1
- L21.4 Grover's search algorithm (obj: amplitude amplification) · prereq: L21.1
- L21.5 The quantum Fourier transform & Shor's algorithm (obj: factoring/period-finding) · prereq: L21.1, L5.5

**U22 — Quantum Error Correction** · purpose: fighting noise · prereq: U21 · `A` · ~12h
- L22.1 Decoherence & quantum noise channels (obj: model errors) · prereq: L19.4
- L22.2 The 3-qubit bit-flip & phase-flip codes (obj: detect/correct one error) · prereq: L22.1, L21.1
- L22.3 The 9-qubit Shor code & stabilizers (obj: general single-error correction) · prereq: L22.2
- L22.4 Fault tolerance & the threshold theorem (obj: scalable computation) · prereq: L22.3

**U23 — Quantum Cryptography & Communication** · purpose: secure quantum protocols · prereq: U21 · `P` · ~10h
- L23.1 BB84 quantum key distribution (obj: provably secure keys) · prereq: L20.2
- L23.2 E91 & entanglement-based QKD (obj: Bell-test security) · prereq: L19.3
- L23.3 Quantum repeaters & networks (obj: extend range) · prereq: L21.2

**U24 — Quantum Hardware Platforms** · purpose: how qubits are built · prereq: U22 · `P` · ~10h
- L24.1 Superconducting qubits (obj: transmon basics) · prereq: L22.1
- L24.2 Trapped ions & neutral atoms (obj: atomic qubits) · prereq: L13.3
- L24.3 Photonic & spin qubits (obj: alternative platforms) · prereq: L20.1
- L24.4 Benchmarking & the NISQ era (obj: assess real devices) · prereq: L22.4

### LEVEL 6 — MODERN QUANTUM PHYSICS

**U25 — Quantum Statistical Mechanics** · purpose: many quanta in thermal systems · prereq: U15 · `A` · ~12h
- L25.1 Density operators & thermal states (obj: ρ = e^{-βH}/Z) · prereq: L19.4
- L25.2 Bose–Einstein & Fermi–Dirac statistics (obj: occupation distributions) · prereq: L15.2
- L25.3 Bose–Einstein condensation (obj: macroscopic quantum state) · prereq: L25.2
- L25.4 Quantum entropy & information (obj: von Neumann entropy) · prereq: L25.1, L19.4

**U26 — Open Quantum Systems & Decoherence** · purpose: realistic, noisy QM · prereq: U19, U25 · `A` · ~12h
- L26.1 System–environment coupling (obj: reduced dynamics) · prereq: L25.1
- L26.2 The Lindblad master equation (obj: model dissipation) · prereq: L26.1
- L26.3 Decoherence & the quantum-to-classical transition (obj: pointer states) · prereq: L26.1
- L26.4 Quantum measurement theory revisited (obj: POVMs, weak measurement) · prereq: L26.3, L10.3

**U27 — Relativistic Quantum Mechanics** · purpose: merge QM with relativity · prereq: U14 · `A` · ~12h
- L27.1 Special relativity refresher for QM (obj: four-vectors, E²=(pc)²+(mc²)²) · prereq: L14.2
- L27.2 The Klein–Gordon equation (obj: relativistic scalar field eq.) · prereq: L27.1, L7.2
- L27.3 The Dirac equation & spin (obj: relativistic electrons, spin emerges) · prereq: L27.2, L13.4
- L27.4 Antimatter & the Dirac sea (obj: predict positrons) · prereq: L27.3

**U28 — Introduction to Quantum Field Theory** · purpose: fields as the deep description · prereq: U27 · `A` · ~14h
- L28.1 Why fields? Second quantization (obj: promote fields to operators) · prereq: L12.2, L27.3
- L28.2 Canonical quantization of the scalar field (obj: particles as field excitations) · prereq: L28.1
- L28.3 Propagators & Feynman diagrams (intro) (obj: read leading-order diagrams) · prereq: L28.2
- L28.4 Quantum electrodynamics overview (obj: photon–electron interaction) · prereq: L28.3

**U29 — Particle Physics Foundations** · purpose: the Standard Model picture · prereq: U28 · `A` · ~12h
- L29.1 The Standard Model particle zoo (obj: quarks, leptons, bosons) · prereq: L28.4
- L29.2 Symmetries & conservation laws (obj: Noether, charges) · prereq: L28.2
- L29.3 The Higgs mechanism (conceptual) (obj: origin of mass) · prereq: L29.2
- L29.4 Open questions: neutrinos, dark matter, beyond-SM (obj: survey frontiers) · prereq: L29.1

### LEVEL 7 — RESEARCH FOUNDATIONS

**U30 — Advanced QFT & Gauge Theory** · purpose: the language of modern theory · prereq: U28 · `A` · ~14h
- L30.1 Gauge invariance & U(1) (obj: derive EM from symmetry) · prereq: L29.2
- L30.2 Non-abelian gauge theories (Yang–Mills) (obj: SU(2)/SU(3) basics) · prereq: L30.1
- L30.3 Renormalization & running couplings (obj: tame infinities) · prereq: L28.3
- L30.4 Path integrals (obj: sum-over-histories formulation) · prereq: L28.2

**U31 — Quantum Many-Body & Condensed Matter** · purpose: emergent quantum matter · prereq: U25 · `A` · ~12h
- L31.1 Second quantization for many-body systems (obj: occupation-number formalism) · prereq: L28.1
- L31.2 Band theory & semiconductors (obj: electrons in periodic potentials) · prereq: L15.3
- L31.3 Superconductivity & BCS theory (obj: Cooper pairs) · prereq: L25.3
- L31.4 Topological phases & quantum Hall effect (obj: topological order) · prereq: L31.2

**U32 — Frontiers & Research Methods** · purpose: become research-ready · prereq: U30, U31 · `A` · ~10h
- L32.1 Reading & evaluating physics papers (obj: critically parse literature) · prereq: L30.3
- L32.2 Computational quantum methods (obj: numerics, simulation overview) · prereq: L31.1
- L32.3 Current frontiers: quantum gravity, quantum simulation, fault-tolerant QC (obj: map open problems) · prereq: L31.4, L22.4
- L32.4 Designing a research question (obj: scope a tractable problem) · prereq: L32.1

---

## Counts (reconciled with Report)

- **Levels:** 7
- **Units:** 32 (Level 1: 4, L2: 4, L3: 6, L4: 5, L5: 5, L6: 5, L7: 3)
- **Lessons:** 131
- **Total estimated hours:** ~400

Per-level lesson counts: L1 = 17, L2 = 17, L3 = 26, L4 = 19, L5 = 20, L6 = 20, L7 = 12 → **131**.

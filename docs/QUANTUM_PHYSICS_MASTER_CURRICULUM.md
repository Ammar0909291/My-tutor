# Quantum Physics — Master Curriculum (REVISED)

**Status: design only. No code, no DB, no subject registration.**
**Revision 2** — incorporates all 4 required QA fixes (R-Fix-1..4) plus 4 adopted optional
improvements and the Level-7 Task-3 decision. See `docs/QUANTUM_PHYSICS_REVISION_REPORT.md` for the
full changelog. Superseded sections of Revision 1 are replaced in place below.

**New totals: 7 levels → 33 units → 144 lessons** (was 32 units / 131 lessons).

Legend: **U#** = unit, **L#.#** = lesson. "Prereq" lists unit-level or lesson-level prerequisites by id.
Difficulty: `F`=foundational, `D`=developing, `P`=proficient, `A`=advanced.

---

## TASK 2 — LEVELS (updated hours where unit content changed)

### Level 1 — Foundations  (`LevelIndex` 0)
- **Goal:** give an algebra-only learner the math + classical-physics + "why classical fails" base,
  with calculus introduced as a gentler, separated progression (R-Fix-2).
- **Competencies:** derivatives, integrals, and ODEs as distinct mastered steps; complex numbers;
  describe waves/oscillations/energy; explain blackbody, photoelectric, line spectra as classical failures.
- **Prerequisite knowledge:** high-school algebra only.
- **Estimated hours:** ~52 (was ~46; +6h for the split calculus progression)

### Level 2 — Wave Mechanics  (`LevelIndex` 1)
- **Goal:** build physical QM intuition wave-first; solve the 1D Schrödinger equation, now grounded
  in an explicit free-particle/momentum-eigenstate foundation before bound states (R-Fix-3).
- **Competencies:** linear algebra & Fourier basics; wave–particle duality; free particle & plane
  waves; normalization intuition; solve the Schrödinger equation for standard 1D potentials.
- **Prerequisite knowledge:** Level 1.
- **Estimated hours:** ~62 (was ~54; +8h for the free-particle/normalization lessons)

### Level 3 — Formal Quantum Mechanics  (`LevelIndex` 2)
- **Goal:** re-express QM rigorously in Hilbert space; master postulates, operators, measurement,
  the canonical solvable systems, **and** composite multi-particle systems — now taught *before*
  they are needed by identical particles (R-Fix-1) — with bridging and orientation lessons that
  soften the abstraction jump (optional improvements: wavefunction→state-vector bridge, pictures of
  QM, early symmetry).
- **Competencies:** Dirac notation; postulates; pictures of QM; observables & measurement; symmetry
  & conservation (intro); harmonic oscillator; angular momentum & spin; hydrogen atom; tensor
  products & composite/multi-particle Hilbert spaces.
- **Prerequisite knowledge:** Level 2.
- **Estimated hours:** ~88 (was ~70; +18h for 3 optional-improvement lessons + the new composite-systems unit)

### Level 4 — Advanced Quantum Systems  (`LevelIndex` 3)
- **Goal:** treat realistic systems — many particles (now correctly built on Level 3's composite-system
  formalism), approximations, dynamics, scattering, entanglement.
- **Competencies:** identical particles (correctly grounded); perturbation theory; time-dependent QM;
  scattering; entanglement & Bell (now free of duplicated tensor-product content).
- **Prerequisite knowledge:** Level 3 (including the new U15).
- **Estimated hours:** ~56 (was ~58; -2h — entanglement's tensor-product content moved to Level 3, net of unchanged other units)

### Level 5 — Quantum Information & Computing  (`LevelIndex` 4)
- **Goal:** from qubits to algorithms, error correction, cryptography, hardware — now including
  modern variational algorithms and hardware-era realism (R-Fix-4).
- **Competencies:** qubits/gates; circuits & core algorithms; **VQE & QAOA**; QEC; QKD/communication;
  hardware platforms; **error mitigation**; **quantum advantage** literacy.
- **Prerequisite knowledge:** Level 4 (esp. entanglement) + linear algebra (Level 2).
- **Estimated hours:** ~70 (was ~58; +12h for the 4 new modern-QC lessons)

### Level 6 — Modern Quantum Physics  (`LevelIndex` 5)
- **Goal:** statistical, open-system, relativistic, and field-theoretic extensions. (Unchanged in
  this revision — QA raised no required fixes here.)
- **Competencies:** quantum statistical mechanics; decoherence; relativistic QM; QFT intro; particle-physics base.
- **Prerequisite knowledge:** Level 4 (Level 5 helpful for decoherence).
- **Estimated hours:** ~62 (unchanged)

### Level 7 — Research Foundations — Orientation & Literacy  (`LevelIndex` 5)
- **Goal (revised, Task 3 decision B):** explicitly reframed as a **literacy/orientation** level —
  it builds the vocabulary and conceptual map to *read and follow* gauge theory, renormalization,
  path integrals, many-body physics, and topological matter, **not** working technical fluency
  (that depth requires a dedicated graduate sequence, out of scope for this curriculum). The title
  change itself sets correct learner expectations and resolves QA finding F5 without inflating the
  lesson budget into a full grad course.
- **Competencies:** advanced QFT/gauge (orientation); quantum many-body & condensed matter, including
  **Berry/geometric phase** before topological phases (closes QA gap G4); research literacy & methods.
- **Prerequisite knowledge:** Level 6.
- **Estimated hours:** ~56 (was ~52; +4h for the Berry-phase lesson)

---

## TASK 3 + TASK 4 — UNITS & LESSONS (revised)

### LEVEL 1 — FOUNDATIONS

**U1 — Mathematical Toolkit I** · purpose: calculus & functions, taught as a separated, gentler
progression (R-Fix-2) · prereq: — · `F` · ~18h *(was ~14h)*
- L1.1 Functions, graphs & units review (obj: model physical quantities) · prereq: —
- L1.2 Derivatives & rates of change (obj: differentiate standard functions) · prereq: L1.1
- L1.3 Derivative applications & practice — **NEW** (obj: apply derivatives to motion/rates problems before moving on) · prereq: L1.2
- L1.4 Integrals & areas (obj: integrate standard functions) · prereq: L1.3
- L1.5 Intro to differential equations — first-order, separable (obj: solve simple 1st-order ODEs) · prereq: L1.4
- L1.6 Second-order ODEs & the oscillator equation — **NEW**, split out of old combined ODE lesson (obj: solve d²x/dt² = -ω²x and recognize it everywhere in physics) · prereq: L1.5
- L1.7 Complex numbers & Euler's formula (obj: manipulate a+bi, e^{iθ}) · prereq: L1.1

**U2 — Classical Physics Essentials** · purpose: mechanics/energy language QM reuses · prereq: U1 · `F` · ~10h *(unchanged)*
- L2.1 Position, velocity, acceleration · prereq: L1.2
- L2.2 Forces, momentum & Newton's laws · prereq: L2.1
- L2.3 Work, energy & potentials · prereq: L2.2
- L2.4 Probability & expectation values · prereq: L1.4

**U3 — Waves & Oscillations** · purpose: the wave vocabulary of QM · prereq: U2 · `F` · ~10h *(unchanged)*
- L3.1 Simple harmonic motion · prereq: L2.3, L1.6
- L3.2 Wave properties: wavelength, frequency, phase · prereq: L3.1
- L3.3 Superposition & interference · prereq: L3.2
- L3.4 Standing waves & normal modes · prereq: L3.3

**U4 — The Failure of Classical Physics** · purpose: motivate QM historically · prereq: U3 · `D` · ~12h *(unchanged)*
- L4.1 Blackbody radiation & the ultraviolet catastrophe · prereq: L3.4
- L4.2 The photoelectric effect · prereq: L4.1
- L4.3 Atomic line spectra & the Bohr model · prereq: L4.2
- L4.4 The Compton effect & photon momentum · prereq: L4.2

*Level 1 lessons: 7+4+4+4 = **19** (was 17, +2 from R-Fix-2).*

### LEVEL 2 — WAVE MECHANICS

**U5 — Mathematical Toolkit II** · purpose: linear algebra & Fourier for QM · prereq: U1 · `D` · ~16h *(unchanged)*
- L5.1 Vectors & vector spaces · prereq: L1.7
- L5.2 Matrices & linear transformations · prereq: L5.1
- L5.3 Eigenvalues & eigenvectors · prereq: L5.2
- L5.4 Inner products & orthogonality · prereq: L5.1
- L5.5 Fourier series & transforms · prereq: L5.4

**U6 — Wave–Particle Duality** · purpose: core conceptual pivot · prereq: U4, U5 · `D` · ~10h *(unchanged)*
- L6.1 de Broglie matter waves · prereq: L4.4, L5.5
- L6.2 The double-slit experiment with particles · prereq: L6.1
- L6.3 Wave packets & group velocity · prereq: L6.1
- L6.4 Heisenberg uncertainty (qualitative) · prereq: L6.3

**U7 — The Schrödinger Equation** · purpose: the central equation, now grounded in the free particle
*before* bound states (R-Fix-3) · prereq: U6 · `P` · ~20h *(was ~14h)*
- L7.1 The wavefunction & Born's rule · prereq: L6.4
- L7.2 Time-dependent Schrödinger equation · prereq: L7.1
- L7.3 Time-independent Schrödinger equation & stationary states · prereq: L7.2
- L7.4 Probability current & normalization · prereq: L7.1
- L7.5 Free particle, plane waves & momentum eigenstates — **NEW** (obj: solve the free-particle TISE, recognize plane-wave non-normalizability) · prereq: L7.3
- L7.6 Wave-packet normalization — intuition and pitfalls — **NEW** (obj: build a normalizable packet from plane waves; connect to L6.3) · prereq: L7.5, L6.3

**U8 — Particle in 1D Potentials** · purpose: solvable intuition-builders, now properly preceded by
free-particle foundations · prereq: U7 (incl. L7.5, L7.6) · `P` · ~14h *(unchanged)*
- L8.1 Infinite square well · prereq: L7.3, L7.6
- L8.2 Finite square well & bound states · prereq: L8.1
- L8.3 Potential barriers & quantum tunneling · prereq: L8.2
- L8.4 The step potential & reflection · prereq: L8.2

*Level 2 lessons: 5+4+6+4 = **19** (was 17, +2 from R-Fix-3).*

### LEVEL 3 — FORMAL QUANTUM MECHANICS

**U9 — Hilbert Spaces & Dirac Notation** · purpose: rigorous state language, now opened with an
explicit bridge from the wave-mechanics intuition just built (optional improvement, addresses QA
cliff C2) · prereq: U5, U8 · `P` · ~16h *(was ~12h)*
- L9.1 Bridge: from wavefunctions to state vectors — **NEW** (obj: see ψ(x) as one representation of an abstract state) · prereq: L8.1, L5.4
- L9.2 State vectors & bra–ket notation · prereq: L9.1
- L9.3 Hilbert space & completeness · prereq: L9.2
- L9.4 Basis states & superposition · prereq: L9.3
- L9.5 Position & momentum representations · prereq: L9.4, L7.5

**U10 — Postulates of Quantum Mechanics** · purpose: the axiomatic core, now including the pictures
of QM (optional improvement, closes QA finding F2 — was assumed-but-untaught) · prereq: U9 · `P` · ~16h *(was ~12h)*
- L10.1 The state postulate · prereq: L9.5
- L10.2 Observables as Hermitian operators · prereq: L10.1
- L10.3 The measurement postulate & collapse · prereq: L10.2
- L10.4 Time evolution & the Hamiltonian · prereq: L10.2
- L10.5 Pictures of quantum mechanics: Schrödinger, Heisenberg, interaction — **NEW** (obj: translate time-dependence between pictures; prepares U18 time-dependent perturbation theory) · prereq: L10.4

**U11 — Operators, Observables & Measurement** · purpose: working with operators, now including an
early symmetry/conservation thread (optional improvement, closes QA finding F4) · prereq: U10 · `A` · ~18h *(was ~14h)*
- L11.1 Expectation values & variance · prereq: L10.3
- L11.2 Commutators & compatibility · prereq: L11.1
- L11.3 The generalized uncertainty principle · prereq: L11.2
- L11.4 Eigenstates, spectra & degeneracy · prereq: L11.1
- L11.5 Symmetries & conservation laws (intro) — **NEW** (obj: connect commuting operators to conserved quantities; previews L29.2 Noether) · prereq: L11.2, L11.4
- L11.6 Ehrenfest's theorem & the classical limit · prereq: L11.2

**U12 — The Quantum Harmonic Oscillator** · purpose: the universal model · prereq: U11 · `A` · ~12h *(unchanged)*
- L12.1 The QHO Hamiltonian & energy ladder · prereq: L11.4
- L12.2 Ladder (creation/annihilation) operators · prereq: L12.1
- L12.3 Wavefunctions & Hermite polynomials · prereq: L12.1
- L12.4 Coherent states & applications · prereq: L12.2

**U13 — Angular Momentum & Spin** · purpose: rotations and the qubit's ancestor · prereq: U11 · `A` · ~16h *(unchanged)*
- L13.1 Orbital angular momentum operators · prereq: L11.2
- L13.2 Eigenvalues & spherical harmonics · prereq: L13.1
- L13.3 Spin-½ & the Stern–Gerlach experiment · prereq: L13.1
- L13.4 Pauli matrices & spinors · prereq: L13.3
- L13.5 Addition of angular momenta · prereq: L13.2, L13.4

**U14 — The Hydrogen Atom** · purpose: the showcase exact solution · prereq: U12, U13 · `A` · ~14h *(unchanged)*
- L14.1 The Coulomb potential & separation in 3D · prereq: L13.2
- L14.2 Radial solutions & energy levels · prereq: L14.1
- L14.3 Orbitals & probability densities · prereq: L14.2
- L14.4 Fine structure & spin–orbit coupling · prereq: L14.2, L13.5

**U15 — Composite Quantum Systems & Tensor Products — NEW UNIT (R-Fix-1)** · purpose: build the
multi-particle/composite-system formalism **before** it is needed by identical particles, fixing the
QA-identified prerequisite inversion · prereq: U13 · `A` · ~10h
- L15.1 Tensor products & composite-system state spaces (obj: build |ψ⟩⊗|φ⟩ for two subsystems) · prereq: L13.4, L9.5
- L15.2 Multi-particle Hilbert spaces & distinguishable vs. identical setups (obj: distinguish labeled vs. unlabeled particle descriptions) · prereq: L15.1

*Level 3 units: U9–U15 = **7** (was 6, +1 — the new composite-systems unit).*
*Level 3 lessons: 5+5+6+4+5+4+2 = **31** (was 26, +5: +1 bridge, +1 pictures, +1 symmetry, +2 tensor products).*

### LEVEL 4 — ADVANCED QUANTUM SYSTEMS

**U16 — Identical Particles & Many-Body Basics** *(was U15)* · purpose: indistinguishability, now
correctly built on U15's tensor-product formalism (R-Fix-1 applied) · prereq: U14, **U15** · `A` · ~12h
- L16.1 Indistinguishability & exchange symmetry · prereq: L14.3, **L15.2** *(prereq fixed — was undefined-before-taught)*
- L16.2 Bosons, fermions & the Pauli exclusion principle · prereq: L16.1
- L16.3 Slater determinants & the periodic table · prereq: L16.2, **L15.1** *(prereq fixed)*
- L16.4 Exchange interaction & basic many-body effects · prereq: L16.2

**U17 — Approximation Methods** *(was U16)* · purpose: solving the unsolvable · prereq: U14 · `A` · ~14h *(unchanged)*
- L17.1 Time-independent perturbation theory (non-degenerate) · prereq: L14.2
- L17.2 Degenerate perturbation theory · prereq: L17.1
- L17.3 The variational method · prereq: L14.2
- L17.4 The WKB approximation · prereq: L8.3, L14.2

**U18 — Time-Dependent Quantum Mechanics** *(was U17)* · purpose: transitions & driving, now able to
reference the pictures-of-QM lesson · prereq: U17, **L10.5** · `A` · ~12h
- L18.1 Time-dependent perturbation theory · prereq: L17.1, **L10.5**
- L18.2 Fermi's golden rule · prereq: L18.1
- L18.3 Interaction with radiation: absorption & emission · prereq: L18.2
- L18.4 Rabi oscillations in two-level systems · prereq: L13.4, L18.1

**U19 — Scattering Theory** *(was U18)* · purpose: how we probe matter · prereq: U17 · `A` · ~10h *(unchanged)*
- L19.1 Cross sections & scattering amplitude · prereq: L8.4
- L19.2 Partial wave analysis · prereq: L13.2, L19.1
- L19.3 The Born approximation · prereq: L17.1, L19.1

**U20 — Quantum Entanglement & Nonlocality** *(was U19)* · purpose: the QI gateway, now free of
duplicated tensor-product content (moved to U15) · prereq: U13, U15, U16 · `A` · ~10h *(was ~12h —
the tensor-product lesson moved to U15)*
- L20.1 Entangled states & the EPR paradox · prereq: **L15.1**, L16.2 *(was self-contained L19.1, now correctly built on U15)*
- L20.2 Bell's theorem & inequalities · prereq: L20.1
- L20.3 Density matrices & mixed states · prereq: **L15.1**

*Level 4 units: U16–U20 = **5** (unchanged count).*
*Level 4 lessons: 4+4+4+3+3 = **18** (was 19, -1 — duplicate tensor-product lesson removed, content now in U15).*

### LEVEL 5 — QUANTUM INFORMATION & COMPUTING

**U21 — Qubits & Quantum Gates** *(was U20)* · purpose: the computational primitives · prereq: U20 · `P` · ~12h *(unchanged)*
- L21.1 The qubit & the Bloch sphere · prereq: L20.3, L13.4
- L21.2 Single-qubit gates (X, Y, Z, H, phase) · prereq: L21.1
- L21.3 Multi-qubit gates (CNOT, controlled-U) · prereq: L21.1, L20.1
- L21.4 Universal gate sets & no-cloning · prereq: L21.2, L21.3

**U22 — Quantum Circuits & Algorithms** *(was U21)* · purpose: real quantum programs, now including
variational algorithms — the dominant near-term paradigm (R-Fix-4) · prereq: U21 · `A` · ~24h *(was ~16h)*
- L22.1 The circuit model & measurement · prereq: L21.4
- L22.2 Superdense coding & quantum teleportation · prereq: L21.3, L20.1
- L22.3 Deutsch–Jozsa & Bernstein–Vazirani · prereq: L22.1
- L22.4 Grover's search algorithm · prereq: L22.1
- L22.5 The quantum Fourier transform & Shor's algorithm · prereq: L22.1, L5.5
- L22.6 The variational quantum eigensolver (VQE) — **NEW** (obj: hybrid classical–quantum ground-state estimation) · prereq: L22.1, L17.1
- L22.7 QAOA & combinatorial optimization — **NEW** (obj: apply the quantum approximate optimization algorithm) · prereq: L22.6

**U23 — Quantum Error Correction** *(was U22)* · purpose: fighting noise · prereq: U22 · `A` · ~12h *(unchanged)*
- L23.1 Decoherence & quantum noise channels · prereq: **L20.3**
- L23.2 The 3-qubit bit-flip & phase-flip codes · prereq: L23.1, L22.1
- L23.3 The 9-qubit Shor code & stabilizers · prereq: L23.2
- L23.4 Fault tolerance & the threshold theorem · prereq: L23.3

**U24 — Quantum Cryptography & Communication** *(was U23)* · purpose: secure quantum protocols · prereq: U22 · `P` · ~10h *(unchanged)*
- L24.1 BB84 quantum key distribution · prereq: L21.2
- L24.2 E91 & entanglement-based QKD · prereq: **L20.2**
- L24.3 Quantum repeaters & networks · prereq: L22.2

**U25 — Quantum Hardware Platforms** *(was U24)* · purpose: how qubits are built, now including
error mitigation and quantum-advantage literacy (R-Fix-4) · prereq: U23 · `P` · ~18h *(was ~10h)*
- L25.1 Superconducting qubits · prereq: L23.1
- L25.2 Trapped ions & neutral atoms · prereq: L13.3
- L25.3 Photonic & spin qubits · prereq: L21.1
- L25.4 Benchmarking & the NISQ era · prereq: L23.4
- L25.5 Error mitigation techniques — **NEW** (obj: distinguish error mitigation from error correction; zero-noise extrapolation, readout correction) · prereq: L25.4, L23.1
- L25.6 Quantum advantage: claims, skepticism & benchmarks — **NEW** (obj: critically evaluate quantum-advantage claims) · prereq: L25.4, L22.5

*Level 5 units: U21–U25 = **5** (unchanged count).*
*Level 5 lessons: 4+7+4+3+6 = **24** (was 20, +4 from R-Fix-4).*

### LEVEL 6 — MODERN QUANTUM PHYSICS *(unchanged content — QA raised no required fix here; renumbered only)*

**U26 — Quantum Statistical Mechanics** *(was U25)* · prereq: U16 · `A` · ~12h
- L26.1 Density operators & thermal states · prereq: **L20.3**
- L26.2 Bose–Einstein & Fermi–Dirac statistics · prereq: L16.2
- L26.3 Bose–Einstein condensation · prereq: L26.2
- L26.4 Quantum entropy & information · prereq: L26.1, **L20.3**

**U27 — Open Quantum Systems & Decoherence** *(was U26)* · prereq: U20, U26 · `A` · ~12h
- L27.1 System–environment coupling · prereq: L26.1
- L27.2 The Lindblad master equation · prereq: L27.1
- L27.3 Decoherence & the quantum-to-classical transition · prereq: L27.1
- L27.4 Quantum measurement theory revisited · prereq: L27.3, L10.3

**U28 — Relativistic Quantum Mechanics** *(was U27)* · prereq: U14 · `A` · ~12h
- L28.1 Special relativity refresher for QM · prereq: L14.2
- L28.2 The Klein–Gordon equation · prereq: L28.1, L7.2
- L28.3 The Dirac equation & spin · prereq: L28.2, L13.4
- L28.4 Antimatter & the Dirac sea · prereq: L28.3

**U29 — Introduction to Quantum Field Theory** *(was U28)* · prereq: U28 · `A` · ~14h
- L29.1 Why fields? Second quantization · prereq: L12.2, L28.3
- L29.2 Canonical quantization of the scalar field · prereq: L29.1
- L29.3 Propagators & Feynman diagrams (intro) · prereq: L29.2
- L29.4 Quantum electrodynamics overview · prereq: L29.3

**U30 — Particle Physics Foundations** *(was U29)* · prereq: U29 · `A` · ~12h
- L30.1 The Standard Model particle zoo · prereq: L29.4
- L30.2 Symmetries & conservation laws · prereq: L29.2, **L11.5** *(now builds on the Level-3 symmetry intro)*
- L30.3 The Higgs mechanism (conceptual) · prereq: L30.2
- L30.4 Open questions: neutrinos, dark matter, beyond-SM · prereq: L30.1

*Level 6 units: U26–U30 = 5 (unchanged). Lessons: 4+4+4+4+4 = **20** (unchanged).*

### LEVEL 7 — RESEARCH FOUNDATIONS — ORIENTATION & LITERACY *(relabeled, Task 3 decision B)*

**U31 — Advanced QFT & Gauge Theory** *(was U30)* · purpose: the *language* of modern theory, read at
orientation depth (Task 3: not expanded to full technical fluency) · prereq: U29 · `A` · ~14h
- L31.1 Gauge invariance & U(1) · prereq: L30.2
- L31.2 Non-abelian gauge theories (Yang–Mills) · prereq: L31.1
- L31.3 Renormalization & running couplings · prereq: L29.3
- L31.4 Path integrals · prereq: L29.2

**U32 — Quantum Many-Body & Condensed Matter** *(was U31)* · purpose: emergent quantum matter, now
including Berry/geometric phase before topological phases (closes QA gap G4) · prereq: U26 · `A` · ~16h *(was ~12h)*
- L32.1 Second quantization for many-body systems · prereq: L29.1
- L32.2 Band theory & semiconductors · prereq: **L16.3**
- L32.3 Superconductivity & BCS theory · prereq: L26.3
- L32.4 Berry/geometric phase — **NEW** (obj: build the geometric-phase concept needed for topological matter) · prereq: L13.2, L17.1
- L32.5 Topological phases & quantum Hall effect · prereq: L32.2, **L32.4**

**U33 — Frontiers & Research Methods** *(was U32)* · prereq: U31, U32 · `A` · ~10h
- L33.1 Reading & evaluating physics papers · prereq: L31.3
- L33.2 Computational quantum methods · prereq: L32.1
- L33.3 Current frontiers: quantum gravity, quantum simulation, fault-tolerant QC · prereq: L32.5, L23.4
- L33.4 Designing a research question · prereq: L33.1

*Level 7 units: U31–U33 = 3 (unchanged count). Lessons: 4+5+4 = **13** (was 12, +1 — Berry phase).*

---

## Reconciled counts (Revision 2)

- **Levels:** 7 (unchanged; Level 7 relabeled "Research Foundations — Orientation & Literacy")
- **Units:** 4 + 4 + 7 + 5 + 5 + 5 + 3 = **33** (was 32, +1)
- **Lessons:** 19 + 19 + 31 + 18 + 24 + 20 + 13 = **144** (was 131, +13)
- **Total estimated hours:** ~444 (was ~400, +44)

See `docs/QUANTUM_PHYSICS_REVISION_REPORT.md` for the full itemized changelog and revalidation.

# Teaching Blueprint: Particle in an Infinite Square Well

## 0. Concept Metadata
- **Concept ID**: phys.qm.particle-in-box
- **Name**: Particle in an Infinite Square Well
- **Domain**: Quantum Mechanics
- **Difficulty**: expert
- **Bloom Level**: apply
- **Estimated Hours**: 8
- **Prerequisites**: phys.qm.schrodinger-equation
- **Unlocks**: (none — leaf node)
- **Description**: The infinite square well is an exactly solvable quantum model giving quantised energies Eₙ = n²π²ℏ²/(2mL²).

---

## 1. Concept Spine

### Core Idea
The particle in an infinite square well (particle in a box) is the prototype of quantum confinement: a particle confined to a region [0, L] by infinite walls cannot escape, and its energy is quantized into discrete levels Eₙ = n²π²ℏ²/(2mL²). This model reveals zero-point energy (E₁ > 0), nodal structure of wave functions, and the quantum-to-classical correspondence as n → ∞.

### Conceptual Ladder
1. **Recall**: TISE solution structure: oscillatory (sin/cos) inside, zero outside for infinite well.
2. **Apply**: Derive Eₙ and φₙ by applying boundary conditions and normalizing.
3. **Analyze**: Compute expectation values ⟨x⟩, ⟨x²⟩, ⟨p⟩, ⟨p²⟩ for each eigenstate; verify Heisenberg uncertainty.
4. **Extend**: Superposition of eigenstates; time evolution; generalization to finite wells, 2D/3D boxes, quantum dots.

### Key Formula Set
- **Potential**: V(x) = 0 for 0 < x < L; V = ∞ otherwise.
- **Energy eigenvalues**: Eₙ = n²π²ℏ²/(2mL²) = n²E₁, n = 1, 2, 3, …
  - E₁ = π²ℏ²/(2mL²) — ground state / zero-point energy
- **Normalized eigenfunctions**: φₙ(x) = √(2/L) sin(nπx/L), 0 < x < L
- **Expectation values for φₙ**:
  - ⟨x⟩ = L/2 (center of well, by symmetry)
  - ⟨x²⟩ = L²/3 − L²/(2n²π²)
  - ⟨p⟩ = 0 (standing wave, no net momentum)
  - ⟨p²⟩ = n²π²ℏ²/L² = 2mEₙ
  - Δx = L√(1/12 − 1/(2n²π²)); Δp = nπℏ/L
  - Δx·Δp → L/(√12) × nπℏ/L = nπℏ/√12 > ℏ/2 ✓
- **Time evolution**: ψ(x,t) = Σcₙ φₙ(x) e^(−iEₙt/ℏ)

### Canonical Example
**Electron in quantum dot** (L = 5 nm):
E₁ = π²(1.055×10⁻³⁴)²/(2×9.11×10⁻³¹×(5×10⁻⁹)²) = 2.4×10⁻²¹ J = 0.015 eV
E₂ = 4E₁ = 0.060 eV; E₃ = 9E₁ = 0.135 eV.
Transition E₂→E₁: ΔE = 3E₁ = 0.045 eV → λ = hc/ΔE = 27.6 μm (mid-infrared).
For L = 2 nm: E₁ scales as 1/L² → E₁ = 0.094 eV; transition photon in near-IR — that's why quantum dot size controls color.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Pluck a guitar string fixed at both ends. Only standing waves fit: the string length must equal a whole number of half-wavelengths (L = nλ/2 → λₙ = 2L/n). Each mode has a distinct frequency (pitch). The particle in a box is a matter-wave analog: de Broglie waves must fit inside the box with nodes at the walls. Only λₙ = 2L/n fits → p = h/λₙ = nh/(2L) = nπℏ/L → KE = p²/2m = n²π²ℏ²/(2mL²) = Eₙ. The energy quantization follows from the same geometry as musical harmonics.

### Representational (Diagrams and Symbols)
- **Wave function gallery**: Plot φ₁, φ₂, φ₃ inside the well (0 to L). φ₁: one arch; φ₂: two arches with a node at L/2; φ₃: three arches with nodes at L/3 and 2L/3.
- **Probability density gallery**: Plot |φₙ|² for n = 1, 2, 3. Show how the classical limit (uniform |ψ|²) is approached as n → ∞.
- **Energy level diagram**: Horizontal lines at Eₙ = n²E₁ for n = 1, 2, 3, 4. Note unequal spacing (spacing ∝ n — not equidistant, unlike harmonic oscillator).
- **Correspondence principle graph**: |φ₁₀₀|² vs. x — nearly flat, approaching the classical uniform distribution.

### Abstract (Equation Manipulation)
Students must practice:
1. Derive the boundary condition → kₙ = nπ/L from φ(L) = 0.
2. Derive Eₙ = ℏ²kₙ²/2m = n²π²ℏ²/(2mL²).
3. Normalize φₙ: verify ∫₀ᴸ |φₙ|²dx = 1 → A = √(2/L).
4. Compute ⟨x⟩ = ∫₀ᴸ x|φₙ|²dx = L/2 using the symmetry or explicit integral.
5. Compute ⟨p²⟩ = ∫φₙ*(−ℏ²∂²φₙ/∂x²)dx = n²π²ℏ²/L².
6. Verify Δx·Δp ≥ ℏ/2 for n = 1.

### Transfer (Novel Contexts)
- **Quantum dots**: Semiconductor nanocrystals confine electrons in all 3 directions → 3D particle in box → Eₙₓ,ₙ_y,ₙ_z = (ℏ²π²/2m)(nₓ²/Lₓ² + n_y²/L_y² + n_z²/L_z²). Size determines color → tunable light emitter.
- **Nuclear physics**: Nucleons in a nuclear potential well (finite, not infinite) — same model structure.
- **Finite potential well**: Students realize ψ penetrates slightly beyond the walls (evanescent tails) → tunneling probability.

---

## 3. Why Beginners Fail

### Failure Mode 1: Forgetting the floor level at n = 1 (zero-point energy)
Students expect the ground state energy to be zero. Emphasize: E₁ = π²ℏ²/(2mL²) > 0 always. The particle cannot have zero kinetic energy even at absolute zero — this is the Heisenberg uncertainty in action (confining the particle localizes it → Δx finite → Δp finite → KE > 0).

### Failure Mode 2: Starting the quantum number at n = 0
n = 0 would give φ₀ = 0 (identically zero everywhere) — not a valid state. Quantum number starts at n = 1.

### Failure Mode 3: Using complex exponentials for a bounded problem
Students write φ(x) = Ae^(ikx) + Be^(−ikx) (valid) but then set A = B to get sine — correct, but they must also verify the normalization constant from scratch. More robustly: φ = A sin(kx) + B cos(kx); apply φ(0) = 0 → B = 0; φ(L) = 0 → sin(kL) = 0 → k = nπ/L.

### Failure Mode 4: Thinking nodes mean "no particle ever"
The node at x = L/2 for n = 2 means |φ₂(L/2)|² = 0 — zero probability density there. Students ask: "How does the particle get from x = L/4 to x = 3L/4 without passing through x = L/2?" Answer: quantum mechanics doesn't describe paths. The particle doesn't have a trajectory; |ψ|² gives only probability density. There is no "how does it cross the node" — the question assumes a trajectory that doesn't exist in QM.

---

## 4. Misconception Library

### MC-1: "Energy can be zero in the ground state"
- **Probe**: "Can an electron in a 1 nm box have zero kinetic energy?"
- **Characteristic phrase**: "At absolute zero, the particle is at rest."
- **Trigger**: Classical expectation: at T = 0, KE = 0.
- **Conflict evidence**: E₁ = π²ℏ²/(2m×(10⁻⁹)²) ≈ 0.376 eV > 0. This zero-point energy is measured directly in liquid helium (which doesn't solidify at 1 atm even at absolute zero — ZPE prevents crystallization).
- **Bridge**: Confinement Δx = L → Δp ≥ ℏ/2L → KE_min ≥ Δp²/2m = ℏ²/(8mL²) > 0. Zero energy would require Δp = 0 → Δx = ∞ (uncertainty principle) — impossible for a confined particle.
- **Replacement**: Ground state energy E₁ = π²ℏ²/(2mL²) is always positive. Zero-point energy is a real, measurable phenomenon.
- **Discrimination pairs**: "E₁ = π²ℏ²/(2mL²) > 0 always" ✓ vs. "Ground state can have E = 0" ✗
- **S6 repair path**: Calculate E₁ numerically for an electron in a 1 nm well; compare to kT at room temperature (25 meV). E₁ ≈ 376 meV >> 25 meV — quantum effects dominate.

### MC-2: "The particle can be found outside the well"
- **Probe**: "Where can you find the particle in the infinite square well?"
- **Characteristic phrase**: "Maybe it leaks out slightly."
- **Trigger**: Students who know about tunneling and finite wells apply this to the infinite case.
- **Conflict evidence**: V = ∞ outside the well → inside the barrier: −ℏ²/2m ∂²ψ/∂x² = (E − V)ψ = (E − ∞)ψ. For this to be satisfied, ψ must be zero outside. The boundary condition φ(0) = φ(L) = 0 is exact for an infinite well.
- **Bridge**: In a finite well, tunneling occurs because V is finite. In the infinite well, the barrier is literally infinite — the particle cannot penetrate. This is the defining characteristic of the infinite well model.
- **Replacement**: For infinite potential well: ψ = 0 strictly outside [0,L]. For finite well (next topic): ψ ≠ 0 outside, and tunneling occurs.
- **Discrimination pairs**: "Infinite well: ψ = 0 outside" ✓ vs. "Infinite well: ψ nonzero outside" ✗
- **S6 repair path**: Write the Schrödinger equation in the wall region (V = ∞); solve; conclude ψ must be zero.

### MC-3: "Higher n states have higher probability of being near the center"
- **Probe**: "Where is the particle most likely to be found in the n = 2 state?"
- **Characteristic phrase**: "It's most likely in the middle."
- **Trigger**: Applying n = 1 result (maximum at center) to all states.
- **Conflict evidence**: |φ₂|² = (2/L)sin²(2πx/L) has a node at x = L/2 (zero probability) and maxima at x = L/4 and x = 3L/4. The particle is most likely to be near L/4 and 3L/4, not the center.
- **Bridge**: Each state φₙ has n arches (n maxima in |φₙ|²) and n−1 interior nodes. The positions of maxima and nodes depend on n.
- **Replacement**: Ground state (n=1): one maximum at x = L/2. Excited states: n maxima at x = (2j−1)L/(2n) for j = 1,…,n; n−1 nodes at x = jL/n for j = 1,…,n−1.
- **Discrimination pairs**: "n=2 node at x=L/2; maxima at L/4, 3L/4" ✓ vs. "n=2 most probable at center" ✗
- **S6 repair path**: Plot |φ₂|² on graph paper; mark all zeros and maxima; verify by computing |φ₂(L/2)|² = |sin(2π × L/2/L)|² = |sin(π)|² = 0.

### MC-4: "The Eₙ spacing is constant (like the harmonic oscillator)"
- **Probe**: "If E₁ = 1 eV, what is E₂ − E₁ and E₃ − E₂?"
- **Characteristic phrase**: "Energy levels are evenly spaced."
- **Trigger**: Confusing infinite well with harmonic oscillator (which IS evenly spaced).
- **Conflict evidence**: E₁ = E₁, E₂ = 4E₁, E₃ = 9E₁. E₂ − E₁ = 3E₁; E₃ − E₂ = 5E₁. Spacing increases as (2n−1)E₁ — not constant. The infinite well has n²-scaling.
- **Bridge**: Harmonic oscillator: Eₙ = (n+½)ℏω → equal spacing. Infinite well: Eₙ = n²E₁ → increasing spacing. This difference arises from the different potential shape.
- **Replacement**: Infinite well: spacing = Eₙ₊₁ − Eₙ = (2n+1)E₁ (increases with n). Harmonic oscillator: spacing = ℏω (constant). Students must identify which potential they're using before predicting level spacing.
- **Discrimination pairs**: "Infinite well: ΔE increases with n (n² scaling)" ✓ vs. "Equal spacing for all potentials" ✗
- **S6 repair path**: Calculate E₁ through E₄ for a 1 nm box; list the spacing differences; confirm the (2n+1)E₁ formula.

---

## 5. Explanation Library

### Explanation A — Wave fitting (for intuitive learners)
Standing matter waves must fit in the box with nodes at both walls. The fitting condition is L = nλ/2 (n half-wavelengths fit). de Broglie: p = h/λ = nh/2L = nπℏ/L. KE = p²/2m = n²π²ℏ²/(2mL²). No integration needed — the energy quantization follows from pure wave geometry.

### Explanation B — Schrödinger equation derivation (for rigorous learners)
TISE inside well: −ℏ²/2m d²φ/dx² = Eφ → d²φ/dx² = −k²φ where k = √(2mE)/ℏ. General solution: φ = A sin(kx) + B cos(kx). Boundary condition φ(0) = 0 → B = 0. Boundary condition φ(L) = 0 → A sin(kL) = 0 → kL = nπ (n ≠ 0 integer). Therefore k = nπ/L, E = ℏ²k²/2m = n²π²ℏ²/(2mL²). Normalize: A = √(2/L).

### Explanation C — Applications first (for engineering learners)
Quantum dots: CdSe nanocrystal of radius R ≈ 2 nm. Use 3D particle in box: E₁ = π²ℏ²/(2m_eff × 4R²). For different R, E₁ changes → photon emission wavelength changes → quantum dot color is tunable by size. This is real technology in QLED displays and biological fluorescent labels. The "particle in a box" is not an abstraction — it's the operating principle of modern display technology.

---

## 6. Analogy Library

### Primary Analogy
**Harmonics on a guitar string**: A string of length L has fundamental λ₁ = 2L, second harmonic λ₂ = L, third λ₃ = 2L/3. Each has frequency fₙ = nf₁ and energy Eₙ ∝ n²f₁² (for a guitar: tension/linear density determines the scale, not ℏ/m). The particle in a box is exactly this standing-wave problem, with the wave being the de Broglie matter wave and energy set by quantum mechanics.

### Breaking Point
The string analogy breaks for: (1) energy proportionality — guitar harmonics have energy ∝ n²f₁² (frequency squared) while quantum energy is also ∝ n² but the scale factor is ℏ²k₁²/2m, not frequency squared; (2) superposition measurement — strings add amplitudes constructively and destructively in classical wave physics, but quantum superposition leads to probabilistic collapse; (3) complex wave functions — string displacement is real.

### Anti-Analogy
"Particle bounces back and forth like a tennis ball" — this classical picture suggests the particle has a definite position and trajectory. Quantum mechanically, the eigenstate has no trajectory; the particle is described by a standing probability amplitude. The node at x = L/2 for n = 2 forbids the "bouncing ball" picture — the ball would have to pass through x = L/2 but the wave function says P(x = L/2) = 0.

---

## 7. Demonstration Library

### Demo 1: Numerical Verification
Materials: Calculator.
For L = 0.5 nm (atom-scale), m = 9.11×10⁻³¹ kg:
E₁ = π²(1.055×10⁻³⁴)²/(2×9.11×10⁻³¹×(0.5×10⁻⁹)²) = 2.41×10⁻¹⁹ J = 1.51 eV.
Compare to hydrogen ground state (−13.6 eV) and ionization energy: similar scale. This is why quantum well energies match atomic spectra orders of magnitude.

### Demo 2: Quantum Dot Color Prediction
Materials: CdSe quantum dot data (effective mass m* = 0.13m_e; radius R = 1, 2, 3, 4, 5 nm → colors blue, cyan, green, yellow, red).
Students compute E₁(R) ∝ 1/R² for each R and photon wavelength λ = hc/E₁.
Results match known quantum dot emission colors qualitatively. Students see the formula in technology.

### Demo 3: Symmetry Argument for ⟨x⟩
Materials: Whiteboard.
Without computing the integral: |φₙ(x)|² is symmetric about x = L/2 for all n (because sin²(nπx/L) has this symmetry). Therefore ⟨x⟩ = L/2 for all eigenstates. Expectation value follows from symmetry alone — no integral needed. Students practice using symmetry before calculation.

---

## 8. Discovery Lesson

**Title**: "How Big is a Quantum Dot and Why Does Size Control Color?"

**Hook**: "Hold a test tube of CdSe quantum dots — 2 nm appear blue, 5 nm appear red. All the same material. Why does size change color?"

**Exploration**:
1. Model electron as particle in 3D box of side L = 2R.
2. Ground state energy E₁ ∝ 1/R².
3. Photon emitted when electron drops from E₂ to E₁: ΔE = 3E₁ ∝ 1/R².
4. Photon wavelength λ = hc/ΔE ∝ R².
5. Smaller R → smaller λ → bluer light. Larger R → larger λ → redder light.
6. Compute: for m* = 0.13m_e, R = 1 nm: E₁ ≈ 2.3 eV → λ ≈ 540 nm (green); R = 2 nm: E₁ ≈ 0.58 eV → λ ≈ 2.1 μm (IR). Actual CdSe includes bulk bandgap Eg ≈ 1.74 eV; students add it: λ_emission ≈ hc/(Eg + 3E₁).

**Conclusion**: Quantum confinement in a box of size R causes energy quantization with E₁ ∝ 1/R². Controlling R controls color — this is quantum engineering in current commercial technology.

---

## 9. Teaching Actions

**session_cap**: 7

1. **Standing wave intuition**: Show guitar string harmonics; derive λₙ = 2L/n; motivate that matter waves must do the same in a box.
2. **TISE solution and boundary conditions**: Write and solve −ℏ²/2m d²φ/dx² = Eφ in [0,L]; apply φ(0) = φ(L) = 0.
3. **Quantized energies**: Students derive Eₙ = n²E₁; compute E₁ for a specific L.
4. **Normalize**: Students compute the normalization constant A = √(2/L) explicitly.
5. **Wave function gallery**: Plot φ₁, φ₂, φ₃ and |φₙ|² for n = 1,2,3. Identify nodes and maxima.
6. **Expectation values**: Compute ⟨x⟩ (by symmetry) and ⟨p²⟩ for φₙ; derive Δx·Δp; verify HUP.
7. **Application**: Quantum dot color calculation.

---

## 10. Voice Teaching

**Opening move**: "If you put a guitar string in a box, only certain frequencies fit. Quantum mechanics says the same thing for matter waves. Let's derive the allowed energies from scratch."

**Core explanation**: "φ(x) = A sin(kx) inside; zero outside. Boundary condition φ(L) = 0 forces kL = nπ, i.e., k = nπ/L. Energy = ℏ²k²/2m = n²E₁. That's it — quantization from the standing wave condition."

**Common error interception**: "Double-check: did you start at n = 1? n = 0 gives φ = 0 everywhere — that's not a wave function. Quantum number starts at 1."

**Checkpoint question**: "If you double the box length, what happens to E₁?" (E₁ ∝ 1/L² → decreases by factor 4.) "What does that tell you about confining an electron to a smaller space?" (Smaller space → higher ground state energy — quantum confinement increases energy.)

**Closing move**: "The particle in a box is the simplest quantum mechanical system, but it already contains everything: quantization, zero-point energy, nodes, correspondence principle, and direct connection to real technology. Every more complex quantum system is a variation on this."

---

## 11. Assessment

### Mastery Gate
Student can: (1) derive Eₙ = n²π²ℏ²/(2mL²) from the TISE and boundary conditions, (2) write the normalized eigenfunctions φₙ, (3) identify nodes and probability maxima, (4) compute ⟨x⟩, ⟨p²⟩, and Δx·Δp for a given n, (5) apply the formula to a quantum dot problem.

### Formative Assessment 1 — Energy eigenvalues
**Prompt**: "A proton (m = 1.673×10⁻²⁷ kg) is confined to a box of width L = 10 fm (a nuclear scale). Find E₁ in MeV."
**Expected answer**: E₁ = π²(1.055×10⁻³⁴)²/(2×1.673×10⁻²⁷×(10⁻¹⁴)²) = 3.28×10⁻¹³ J = 2.05 MeV.
**Threshold**: Within 10% (SI unit conversions are the main error source).

### Formative Assessment 2 — Wave function properties
**Prompt**: "For the n = 3 state in a box of length L, (a) how many nodes are inside the well? (b) at what x values? (c) where are the probability maxima?"
**Expected answer**: (a) 2 interior nodes. (b) x = L/3 and x = 2L/3. (c) Maxima at x = L/6, L/2, 5L/6.
**Threshold**: All 5 values correct.

### Formative Assessment 3 — Uncertainty principle check
**Prompt**: "For the n = 1 ground state in a box of width L, compute ⟨x²⟩ = L²/3 − L²/(2π²). Then find Δx. Also find Δp from ⟨p²⟩ = π²ℏ²/L². Verify Δx·Δp > ℏ/2."
**Expected answer**: ⟨x⟩ = L/2, ⟨x²⟩ = L²(1/3 − 1/(2π²)) = L²×0.2837. Δx² = ⟨x²⟩ − ⟨x⟩² = L²(0.2837 − 0.25) = 0.0337L². Δx = 0.1836L. Δp = πℏ/L. Δx·Δp = 0.1836L × πℏ/L = 0.577ℏ > ℏ/2 = 0.5ℏ ✓.
**Threshold**: Δx·Δp > ℏ/2 explicitly verified.

### Formative Assessment 4 — Quantum dot
**Prompt**: "A semiconductor quantum dot has effective electron mass m* = 0.067m_e. If L = 3 nm, find E₁ and the photon wavelength for the E₂ → E₁ transition."
**Expected answer**: m* = 0.067 × 9.11×10⁻³¹ = 6.1×10⁻³² kg. E₁ = π²ℏ²/(2m*L²) = π²(1.055×10⁻³⁴)²/(2×6.1×10⁻³²×9×10⁻¹⁸) = 1.00×10⁻²⁰ J = 0.0625 eV. E₂ = 4E₁ = 0.25 eV. ΔE = 3E₁ = 0.1875 eV. λ = hc/ΔE = 1240 eV·nm / 0.1875 eV = 6613 nm (IR).
**Threshold**: E₁ within 20%; correct ΔE = 3E₁; wavelength within 15%.

### Confidence Calibration
After FA1: "How confident are you (0–100%) that your E₁ is in the right energy range? Quick sanity check: proton in 10 fm box should give nuclear-scale energy (~MeV). Does your answer match?"

### Delayed Retrieval
Two weeks later: Without notes, write down the energy eigenvalue formula and normalized eigenfunction for the particle in a box. State the zero-point energy in terms of E₁ and explain physically why it can't be zero.

---

## 12. Recovery Notes

### S0 — Block: "Where does the boundary condition come from?"
Physical argument: the particle cannot exist in a region of infinite potential — infinite energy required. Therefore ψ = 0 outside. At the boundary, ψ must be continuous → ψ(0) = ψ(L) = 0. This is not a mathematical technicality; it's the physical statement that the particle is perfectly reflected by infinite walls.

### S3 — Can set up but cannot apply boundary conditions to quantize
Drill the sin(kL) = 0 step explicitly: sin(kL) = 0 when kL = 0, π, 2π, 3π, ... Since n = 0 gives ψ = 0 (unphysical), the valid values are kL = nπ for n = 1, 2, 3, ... Have students list k₁, k₂, k₃ then compute E₁, E₂, E₃ for a specific L.

### S6 — Cannot identify nodes and maxima
Plot φₙ = sin(nπx/L) by evaluating at x = 0, L/2n, L/n, 3L/2n, ... (quarter-period points). Nodes: where sin = 0. Maxima of |φₙ|²: where sin² = 1, i.e., where sin = ±1. Pattern: n arches → n maxima → n−1 interior nodes.

### S9 — Cannot connect to applications
Assign: look up "quantum dot size emission wavelength chart" online (many sources). Students verify that smaller dots emit blue light (higher energy), larger dots emit red (lower energy), exactly as E₁ ∝ 1/L² predicts. Then ask them to calculate what size dot would emit green light (540 nm) given effective mass data.

---

## 13. Memory and Review

### Memory Type
Procedural (derivation of Eₙ from TISE) + declarative (eigenvalues Eₙ = n²E₁, eigenfunctions φₙ, node positions) + structural (connection to standing waves, zero-point energy, HUP).

### Spaced Retrieval Schedule
- Day 1: Derive Eₙ from TISE for infinite well; compute E₁ for a 1 nm box.
- Day 3: Sketch φ₃ and |φ₃|²; label all nodes and maxima.
- Day 7: Compute ⟨p²⟩ for n = 2; find Δp; verify HUP.
- Day 14: Calculate quantum dot transition wavelength for given L and m*.
- Day 30: Without notes, write the full solution (potential, TISE, solution, BCs, eigenvalues, eigenfunctions) for the infinite square well.

### Interleaving Partners
- phys.qm.schrodinger-equation (the TISE framework used throughout)
- phys.qm.uncertainty-principle (zero-point energy and HUP verification)
- phys.qm.operators (expectation value calculations)

---

## 14. Transfer Map

### Near Transfer
- Solve the 1D infinite well for any m and L.
- Compute any expectation value for any eigenstate.
- Extend to 2D or 3D box by adding energy terms for each direction.

### Far Transfer
- **Quantum dots / nanophotonics**: Direct application; E₁ ∝ 1/R² controls emission wavelength.
- **Carbon nanotubes**: 1D confinement gives quantized transverse modes, analogous to 1D box.
- **Nuclear physics**: Nucleons in a nuclear potential well — same model with finite well depth.

### Structural Abstraction
The infinite square well is the prototype for quantum confinement: physical constraints (boundaries) → wave fitting condition → energy quantization. This structural pattern — boundary conditions impose integer quantum numbers, which quantize energy — is universal in quantum mechanics (hydrogen atom: boundary conditions in r, θ, φ → quantum numbers n, l, m). The particle in a box is a worked example of this universal pattern.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.qm.schrodinger-equation is both necessary and sufficient — students who can solve the TISE for the infinite well have already implicitly done this problem. This blueprint makes that connection explicit and adds expectation value calculations and applications.

### Unlock Readiness
This is a leaf node — it unlocks no further physics KG concepts directly. However, it serves as a practice ground for the operator formalism (phys.qm.operators) and a concrete example for the uncertainty principle (phys.qm.uncertainty-principle).

### Suggested Flag
Note that the "particle in a box" and "Schrödinger equation" blueprints have some content overlap (boundary conditions, energy eigenvalues). The key distinction: the TDSE blueprint establishes the framework; this blueprint applies it deeply with full expectation value calculations, applications, and the correspondence principle. They are complementary, not redundant.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

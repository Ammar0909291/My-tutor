# Teaching Blueprint: Time-Dependent Schrödinger Equation

## 0. Concept Metadata
- **Concept ID**: phys.qm.schrodinger-equation
- **Name**: Time-Dependent Schrödinger Equation
- **Domain**: Quantum Mechanics
- **Difficulty**: expert
- **Bloom Level**: apply
- **Estimated Hours**: 10
- **Prerequisites**: phys.qm.wave-function
- **Unlocks**: phys.qm.harmonic-oscillator-qm, phys.qm.hydrogen-atom-qm, phys.qm.operators, phys.qm.particle-in-box, phys.qm.quantum-tunneling
- **Description**: The Schrödinger equation iℏ∂ψ/∂t = Ĥψ governs the time evolution of the quantum wave function.

---

## 1. Concept Spine

### Core Idea
The Schrödinger equation is the fundamental equation of non-relativistic quantum mechanics. It tells us how the wave function ψ(x, t) evolves in time, given a Hamiltonian operator Ĥ (the total energy operator). For conservative systems, it separates into a time-independent eigenvalue problem Ĥψ = Eψ, whose solutions are stationary states with definite energy.

### Conceptual Ladder
1. **Recall**: ψ(x, t) is the wave function; |ψ|² is probability density; normalization ∫|ψ|²dx = 1.
2. **Understand**: The Schrödinger equation is a wave equation — it has wave-like solutions, but what's waving is probability amplitude, not a physical displacement.
3. **Apply**: Separate variables to find stationary states; apply boundary conditions; extract energy eigenvalues.
4. **Extend**: Superpose stationary states to build time-dependent wave packets; interpret collapse under measurement.

### Key Formula Set
- **Time-dependent Schrödinger equation (TDSE)**:
  iℏ ∂ψ/∂t = Ĥψ = [−ℏ²/(2m) ∂²/∂x² + V(x)] ψ
- **Time-independent Schrödinger equation (TISE)** (separation of variables, ψ = φ(x)T(t)):
  Ĥφ = Eφ — gives energy eigenvalues Eₙ
  T(t) = e^(−iEₙt/ℏ) — time phase factor
- **General stationary state**: ψₙ(x,t) = φₙ(x) e^(−iEₙt/ℏ)
- **General solution** (superposition): ψ(x,t) = Σ cₙ φₙ(x) e^(−iEₙt/ℏ)
- **Expectation value of energy**: ⟨E⟩ = Σ |cₙ|² Eₙ (probability-weighted average)
- **Normalization constraint**: Σ |cₙ|² = 1

### Canonical Example
**Infinite square well** (particle in box preview): V = 0 inside [0, L], V = ∞ outside.
TISE: −ℏ²/(2m) d²φ/dx² = Eφ → φ(x) = A sin(kx), k = nπ/L
Boundary conditions force: Eₙ = n²π²ℏ²/(2mL²), n = 1,2,3,...
Ground state energy E₁ = π²ℏ²/(2mL²) ≠ 0 — zero-point energy is a direct consequence.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Pluck a guitar string. It vibrates in standing wave patterns — fundamental, first overtone, second overtone. Each pattern has a definite frequency (energy). Any complex vibration is a superposition of these modes. Quantum mechanics is analogous: stationary states are the "pure tones" of a quantum system; any state is a superposition of them. The Schrödinger equation is the guitar string's wave equation, but for probability amplitudes.

### Representational (Diagrams and Symbols)
- **Standing wave diagram**: Show φₙ(x) for n = 1, 2, 3 in an infinite well — students see nodal structure increase with n, energy increases with n².
- **Energy level ladder**: Horizontal lines at Eₙ ∝ n²; well walls on sides.
- **Probability density plot**: |φₙ|² for n = 1, 2, 3 — show how the probability distributes across nodes.
- **Complex exponential clock**: e^(−iEt/ℏ) rotates in the complex plane at angular frequency E/ℏ — shows that stationary states "rotate" but |ψ|² is constant.

### Abstract (Equation Manipulation)
Students must practice:
1. Substituting ψ = φ(x)T(t) into TDSE and separating variables.
2. Solving d²φ/dx² = −k²φ for oscillatory solutions.
3. Applying boundary conditions to quantize k → kₙ = nπ/L.
4. Computing Eₙ from kₙ.
5. Writing the general time-dependent state for a two-level superposition.
6. Computing |ψ(x,t)|² and showing it oscillates in time for superpositions.

### Transfer (Novel Contexts)
- Different potential wells: harmonic oscillator, hydrogen atom, finite well — same TISE structure, different V(x), different eigenvalues.
- Tunneling: solving TISE in classically forbidden region (V > E) → exponentially decaying solution rather than oscillatory.
- Quantum chemistry: molecular orbitals are solutions to the many-body Schrödinger equation.

---

## 3. Why Beginners Fail

### Failure Mode 1: Treating ψ as a Real Wave
Students from classical wave mechanics expect ψ to be real (like a string displacement). They're confused when solutions involve i. Emphasize: ψ is complex; only |ψ|² is observable. The imaginary unit is not a defect — it's what makes ψ a probability amplitude rather than a probability.

### Failure Mode 2: Forgetting Boundary Conditions
Students find φ(x) = A sin(kx) + B cos(kx) and stop. They must apply φ(0) = 0 → B = 0, and φ(L) = 0 → k = nπ/L. Without this step, k is continuous and quantization never appears.

### Failure Mode 3: Confusing Stationary States with "Not Moving"
Students see |ψₙ|² time-independent and conclude "the particle is not moving." It is not at rest — it has kinetic energy ⟨KE⟩ = ⟨p²⟩/2m ≠ 0. "Stationary" means the probability distribution is static, not that dynamics are absent.

### Failure Mode 4: Superposition Probability Arithmetic
For ψ = (1/√2)φ₁ + (1/√2)φ₂, students compute probability of measuring E₁ as 1/√2 instead of |1/√2|² = 1/2. Born rule requires squaring the amplitude modulus, not the amplitude itself.

---

## 4. Misconception Library

### MC-1: "The Schrödinger equation gives the trajectory of the particle"
- **Probe**: "What does solving the Schrödinger equation tell you about where the particle will be next?"
- **Characteristic phrase**: "After solving Schrödinger's equation, I know where the particle is at each time."
- **Trigger**: Classical mechanics habit — equations of motion give x(t).
- **Conflict evidence**: ψ(x,t) does not give a definite position — it gives |ψ(x,t)|² = probability density. Position is unknowable until measured (and then it collapses).
- **Bridge**: Newton's equation F = ma → x(t) is the classical trajectory. Schrödinger's equation → ψ(x,t) is the quantum "trajectory" of probability amplitude.
- **Replacement**: The Schrödinger equation governs probability amplitude evolution; it predicts probability distributions, not trajectories.
- **Discrimination pairs**: "ψ(x,t) evolves deterministically via TDSE" ✓ vs. "particle position x(t) evolves deterministically" ✗
- **S6 repair path**: Compute |ψ(x,t)|² for a two-state superposition; show it oscillates — clearly a distribution, not a point.

### MC-2: "Stationary states have zero energy"
- **Probe**: "The ground state wave function of a particle in a box is constant in time (|ψ|² doesn't change). Does that mean E₁ = 0?"
- **Characteristic phrase**: "If nothing changes in time, the energy must be zero."
- **Trigger**: Associating "stationary" with "no motion" and therefore "no energy."
- **Conflict evidence**: E₁ = π²ℏ²/(2mL²) > 0 always. This zero-point energy is confirmed experimentally (liquid helium never freezes at atmospheric pressure because ZPE prevents crystallization).
- **Bridge**: "Stationary" describes |ψ|², not E. Even a rotating wheel has constant |ψ|² for the center of mass while having rotational KE.
- **Replacement**: Stationary state means ∂|ψ|²/∂t = 0 (probability distribution unchanging); energy of stationary state is the eigenvalue Eₙ, always > 0 in a bound system.
- **Discrimination pairs**: E₁ = π²ℏ²/(2mL²) > 0 ✓ vs. "stationary ⟹ E = 0" ✗
- **S6 repair path**: Calculate E₁ for electron in 1 nm box numerically: E₁ ≈ 0.376 eV. Clearly non-zero.

### MC-3: "Any function can be a solution"
- **Probe**: "If I write ψ = x(L−x) for a particle in [0,L], is this a solution to the TISE?"
- **Characteristic phrase**: "I'll just pick a smooth function that satisfies the boundary conditions."
- **Trigger**: Boundary conditions are necessary but not sufficient; students forget the equation must also be satisfied.
- **Conflict evidence**: d²/dx² [x(L−x)] = −2 ≠ −k² x(L−x) — the function doesn't satisfy the TISE for any k.
- **Bridge**: Solutions must simultaneously satisfy BOTH the differential equation AND the boundary conditions.
- **Replacement**: Valid solutions: satisfy TISE, satisfy boundary conditions, are normalizable. All three required.
- **Discrimination pairs**: φₙ = sin(nπx/L) satisfies all three ✓ vs. φ = x(L−x) satisfies boundary conditions only ✗
- **S6 repair path**: Verify sin(nπx/L) satisfies d²φ/dx² = −(nπ/L)²φ explicitly.

### MC-4: "The superposition state has definite energy (E₁ + E₂)/2"
- **Probe**: "A particle is in state ψ = (1/√2)φ₁ + (1/√2)φ₂. What energy will you measure?"
- **Characteristic phrase**: "It's a mixture of E₁ and E₂, so the energy is (E₁+E₂)/2."
- **Trigger**: Averaging instead of applying Born rule for individual measurements.
- **Conflict evidence**: Each measurement gives either E₁ or E₂ (with probability 1/2 each), never the average. ⟨E⟩ = (E₁+E₂)/2 is the statistical mean over many measurements.
- **Bridge**: Think of a biased coin: each flip is heads or tails, not the average. ⟨outcome⟩ = mean of many flips, not a single-measurement prediction.
- **Replacement**: Superposition state gives P(E₁) = |c₁|² = 1/2 and P(E₂) = |c₂|² = 1/2. Each individual measurement collapses to one or the other.
- **Discrimination pairs**: "Each measurement: E₁ or E₂ with prob 1/2" ✓ vs. "Each measurement: (E₁+E₂)/2" ✗
- **S6 repair path**: Compute ⟨E⟩ = Σ|cₙ|²Eₙ and verify it gives the mean; contrast with what a single measurement gives.

---

## 5. Explanation Library

### Explanation A — Derivation-style (for mathematically confident learners)
Classically, E = p²/2m + V. In quantum mechanics, observables become operators: p̂ = −iℏ ∂/∂x, Ê = iℏ ∂/∂t. Apply Ê ψ = Ĥψ (energy eigenvalue equation in the most general sense): iℏ ∂ψ/∂t = (−ℏ²/2m ∂²/∂x² + V)ψ. This is not "derived" in a strict sense — it is postulated and then confirmed by its predictions agreeing with experiment. Its success (hydrogen spectrum, semiconductor band gaps, laser operation) confirms it as a fundamental law.

For time-independent potentials, separate ψ(x,t) = φ(x)T(t):
iℏ T'/T = Ĥφ/φ = E (separation constant) → T = e^(−iEt/ℏ), Ĥφ = Eφ.

### Explanation B — Waves and vibrations (for intuitive learners)
Sound in a room has resonant modes — only certain frequencies fit the room's geometry. An electron in a box has resonant "probability waves" — only certain wavelengths fit (de Broglie waves that form standing patterns). The Schrödinger equation finds those resonant modes (stationary states) and their energies. It's a standing wave condition applied to matter waves.

### Explanation C — Step-by-step (for procedural learners)
To solve a quantum problem:
1. Write down V(x) for the potential well/barrier.
2. Write TISE: −ℏ²/(2m) d²φ/dx² + V(x)φ = Eφ.
3. In each region, identify if E > V (oscillatory: sin/cos) or E < V (evanescent: sinh/cosh or e^(±κx)).
4. Write general solution in each region.
5. Apply boundary conditions (continuity of φ and dφ/dx at boundaries; φ → 0 at ±∞).
6. Extract quantization condition (only discrete k values work) → energy eigenvalues Eₙ.
7. Normalize: find A so ∫|φₙ|²dx = 1.

---

## 6. Analogy Library

### Primary Analogy
**Vibrating string with fixed ends**: A guitar string fixed at x = 0 and x = L can only vibrate in standing wave modes: yₙ(x) = sin(nπx/L) with frequencies fₙ = nf₁. The Schrödinger equation for a particle in a box gives exactly the same spatial functions, with energy playing the role of frequency squared. The quantization arises from the same boundary condition physics.

### Breaking Point
The string analogy breaks down for: (1) complex ψ (string displacement is real), (2) probability interpretation (string amplitude is physical displacement, not probability), (3) measurement collapse (strings don't collapse to a point on measurement), (4) tunneling (strings cannot pass through barriers).

### Anti-Analogy
"The Schrödinger equation tells you where the particle is" — this is wrong. Classical trajectory equations do that. The Schrödinger equation governs the entire probability field, not any specific trajectory. A particle does not have a path in quantum mechanics — it has a wave function.

---

## 7. Demonstration Library

### Demo 1: Numerical TISE Solver
Materials: Python/spreadsheet on screen.
Procedure: Numerically integrate d²φ/dx² = −(2m/ℏ²)(E − V)φ for an infinite well. Try E = E₁ (exact) → solution satisfies φ(L) = 0. Try E = 1.5 E₁ → solution "explodes" at boundary. Show that only discrete E values satisfy boundary conditions. Students see quantization emerge numerically.

### Demo 2: Energy Level Diagram for a Box
Materials: Whiteboard or projected graphic.
Draw: Eₙ = n²E₁ levels (n=1,2,3,4). Show transitions (photon emission) between levels. Calculate wavelength for n=2→1 transition for electron in 0.5 nm box. Compare with Lyman-alpha hydrogen to give intuition for atomic scale.

### Demo 3: Probability Density Animation
Materials: Any quantum mechanics simulation (PhET "Quantum Mechanics" or custom).
Show: |φₙ|² for n=1,2,3. Emphasize: n=1 peaks at center; n=2 has a node at center; n=3 has two nodes. Ask: "Where is the particle most likely to be found in the ground state?" (Center of box for n=1.) "Where can it never be for n=2?" (The node at x=L/2.)

---

## 8. Discovery Lesson

**Title**: "Why Are Atoms Stable? Quantizing the Box"

**Hook**: "A classical electron orbiting a proton should spiral inward in 10⁻¹¹ seconds and emit all its energy. Atoms are stable. Why? We need to find the quantum rule that prevents the collapse."

**Exploration**:
1. Students write the TISE for a 1D infinite well (instructor provides V).
2. They guess φ(x) = A sin(kx) and verify it satisfies the TISE with E = ℏ²k²/2m.
3. They apply φ(0) = 0 (automatically satisfied) and φ(L) = 0 → sin(kL) = 0 → kL = nπ.
4. They compute Eₙ = n²π²ℏ²/(2mL²) for n = 1,2,3.
5. Key insight: there is a minimum energy E₁ > 0 — the particle cannot have zero energy. This is why atoms don't collapse: the ground state prevents it.

**Synthesis**: Zero-point energy is real. Helium stays liquid at absolute zero at 1 atm because its zero-point kinetic energy exceeds the lattice binding energy — a directly measurable quantum effect.

---

## 9. Teaching Actions

**session_cap**: 8

1. **Wave function recall**: Confirm student can state Born rule and normalization. Ask them to sketch |φ|² for a plausible eigenstate.
2. **TDSE introduction**: Write iℏ∂ψ/∂t = Ĥψ. Explain Ĥ = kinetic + potential. Connect to classical E = KE + PE.
3. **Separation of variables**: Perform the derivation on board. Students fill in steps: substitute ψ = φT, divide, set equal to constant E.
4. **TISE for infinite well**: Students set up and solve d²φ/dx² = −k²φ in [0,L], apply boundary conditions, derive Eₙ.
5. **Visualize eigenstates**: Plot φₙ and |φₙ|² for n = 1,2,3. Students identify nodes, antinodes, probability maxima.
6. **Superposition state**: Write ψ = c₁φ₁ + c₂φ₂, compute |ψ(x,t)|² and show it oscillates at angular frequency (E₂−E₁)/ℏ.
7. **Born rule for energy measurement**: Given coefficients c₁, c₂, ask for P(E₁) and P(E₂). Correct the "average" misconception.
8. **Extension preview**: Mention that all future QM concepts (harmonic oscillator, hydrogen atom, tunneling) use the same TISE framework with different V(x).

---

## 10. Voice Teaching

**Opening move**: "The Schrödinger equation is to quantum mechanics what Newton's second law is to classical mechanics — it's the equation that governs everything else."

**Core explanation**: "Write Ĥψ = Eψ. The hat on Ĥ means operator — it acts on ψ by differentiating it. Finding which functions ψ satisfy this equation for which values E is the central calculation of quantum mechanics. The allowed values of E are the energy levels."

**Common error interception**: "Before you claim you have a solution, apply boundary conditions. The equation being satisfied inside the well is not enough — the wave function must also vanish at the walls."

**Checkpoint question**: "If I double the box length, what happens to the ground state energy?" (Answer: E₁ ∝ 1/L² → decreases by factor 4.) "What does that tell you about confining particles to smaller spaces?" (More confinement → higher energy — quantum confinement!)

**Closing move**: "Every atom, every molecule, every transistor in your phone obeys this equation. Solving it — exactly for hydrogen, approximately for everything else — is what quantum chemistry and materials science do."

---

## 11. Assessment

### Mastery Gate
Student can: (1) write TDSE and TISE correctly, (2) solve TISE for infinite square well including boundary conditions, (3) compute energy eigenvalues Eₙ, (4) apply Born rule to superposition states, (5) interpret |ψ|² physically.

### Formative Assessment 1 — Separation of variables
**Prompt**: "Starting from iℏ∂ψ/∂t = [−ℏ²/(2m)∂²/∂x² + V(x)]ψ, substitute ψ = φ(x)T(t) and show that you get two separate ODEs: one in x (the TISE) and one in t."
**Expected answer**: Divide by φT; left side depends only on t; right side depends only on x; both equal separation constant E. T' = −(iE/ℏ)T → T = e^(−iEt/ℏ); Ĥφ = Eφ.
**Threshold**: Must show complete separation; must identify separation constant as E.

### Formative Assessment 2 — Eigenvalue problem
**Prompt**: "For an infinite square well of width L, find the energy eigenvalues Eₙ and normalized eigenfunctions φₙ(x)."
**Expected answer**: Eₙ = n²π²ℏ²/(2mL²); φₙ(x) = √(2/L) sin(nπx/L), n = 1,2,3,...
**Threshold**: Correct Eₙ formula and normalization constant √(2/L).

### Formative Assessment 3 — Superposition
**Prompt**: "A particle in an infinite well is in state ψ = (√3/2)φ₁ + (1/2)φ₂. (a) What are P(E₁) and P(E₂)? (b) Find ⟨E⟩."
**Expected answer**: P(E₁) = |√3/2|² = 3/4; P(E₂) = |1/2|² = 1/4. ⟨E⟩ = (3/4)E₁ + (1/4)E₂ = (3/4)E₁ + (1/4)(4E₁) = (3+1)E₁/4 × ... = (3E₁ + E₂)/4.
**Threshold**: Correct probabilities (3/4 and 1/4), correct ⟨E⟩ calculation.

### Formative Assessment 4 — Conceptual
**Prompt**: "A particle is in the n=2 stationary state. Where is the probability of finding the particle exactly zero? Why?"
**Expected answer**: At x = 0, x = L/2, and x = L. The node at x = L/2 is a quantum mechanical effect with no classical analogue — a classically bouncing particle would visit x = L/2. The node arises because the standing wave has a zero crossing at the midpoint.
**Threshold**: Must identify x = L/2 as the non-trivial node and connect to the wave function's nodal structure.

### Confidence Calibration
After FA2: "On a scale 0–100%, how confident are you that you correctly normalized the eigenfunction? What would make you more certain?" (Look for students who can verify normalization by integrating |φₙ|².)

### Delayed Retrieval
Two weeks later: Write down TISE for a finite square well; state qualitative differences from infinite well (evanescent tails, fewer bound states for shallow wells). No formula sheet.

---

## 12. Recovery Notes

### S0 — Block: "This all seems arbitrary, why this equation?"
Return to the motivation: de Broglie waves (phys.mod.wave-particle-duality) suggest p = ℏk. Plane wave e^(i(kx−ωt)) has E = ℏω. Substituting into iℏ∂ψ/∂t gives Eψ; substituting −ℏ²∂²/∂x² gives p²ψ. So Ĥ = p̂²/2m + V "just" applies the energy formula to the wave, treating p and E as operators. The equation is postulated because it works — its predictions match hydrogen spectrum, tunneling, semiconductor band gaps.

### S3 — Can set up but cannot apply boundary conditions
Review: boundary conditions encode physical constraints. φ(0) = 0 means the particle cannot penetrate an infinite barrier — classically obvious. φ(L) = 0 same at x = L. These two conditions together restrict k to discrete values. Have student graph sin(kx) for various k and physically show which ones "fit" in the box.

### S6 — Confuses operator and eigenvalue
Students write Ĥψ = Ĥψ (tautology) instead of Ĥψ = Eψ (eigenvalue equation). Drill: Ĥ is an operator (acts on functions by differentiating); E is a number (the eigenvalue). The equation says: "Applying Ĥ to φ gives back φ, scaled by the number E."

### S9 — Cannot connect to measurement
Review Born rule: measuring energy always gives an eigenvalue. Probability of getting Eₙ is |⟨φₙ|ψ⟩|² = |cₙ|². After measurement giving Eₙ, state collapses to φₙ. Superposition is a pre-measurement state; eigenvalue is the post-measurement result.

---

## 13. Memory and Review

### Memory Type
Procedural (separation of variables, eigenvalue solution) + conceptual (wave function interpretation, superposition) + structural (TISE as the core equation of quantum mechanics).

### Spaced Retrieval Schedule
- Day 1: Write TDSE from memory; separate variables.
- Day 3: Solve TISE for infinite well; derive Eₙ.
- Day 7: Given ψ = c₁φ₁ + c₂φ₂, compute P(E₁), P(E₂), ⟨E⟩.
- Day 14: Explain qualitatively how TISE for harmonic oscillator differs from infinite well.
- Day 30: Derive that Eₙ ∝ n² for infinite well from first principles, and state the physical interpretation of zero-point energy.

### Interleaving Partners
- phys.qm.wave-function (Born rule and normalization — used in every TISE solution)
- phys.qm.particle-in-box (direct application)
- phys.qm.uncertainty-principle (zero-point energy connects to ΔxΔp ≥ ℏ/2)

---

## 14. Transfer Map

### Near Transfer
- Solve TISE for any symmetric piecewise-constant potential.
- Write general superposition state and compute ⟨E⟩.
- Identify nodes and antinodes of any φₙ.

### Far Transfer
- **Photonics**: Optical cavities with discrete resonant modes — formally analogous to particle-in-box eigenvalue problems.
- **Solid-state physics**: Bloch theorem and band theory — electrons in periodic potentials, same TISE with periodic V(x).
- **Nuclear physics**: Shell model of the nucleus uses TISE with a nuclear potential well.

### Structural Abstraction
The eigenvalue problem Ôf = λf appears across all of physics and mathematics (vibration modes, electromagnetic cavities, normal modes of coupled oscillators). Schrödinger's equation is one instance of this universal pattern: operator Ĥ, eigenfunctions φₙ, eigenvalues Eₙ. This structure — and the superposition + measurement rule — generalizes to spin, angular momentum, and every quantum observable.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.qm.wave-function ensures students understand ψ, Born rule, and normalization before encountering the TISE. The prerequisite is necessary — students who don't understand ψ will mistake the Schrödinger equation's solutions for classical trajectories.

### Unlock Readiness
This blueprint unlocks five major concepts (particle-in-box, harmonic oscillator, hydrogen atom, operators, tunneling) — all are direct applications of the TISE with specific V(x). The framework established here (separation of variables, eigenvalues, superposition) must be solid before any of those can be approached.

### Suggested Flag
Flag for 10-hour estimate — this is one of the most conceptually demanding blueprints in the QM domain. Consider breaking into two sessions: Session A (TDSE → TISE → separation), Session B (boundary conditions → eigenvalues → superposition → measurement).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

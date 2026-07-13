# Teaching Blueprint: Time-Independent Perturbation Theory
**ID:** phys.qm.perturbation-theory
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.qm.perturbation-theory |
| Name | Time-Independent Perturbation Theory |
| Domain | Quantum Mechanics |
| Difficulty | Expert |
| Bloom Level | Apply |
| Estimated Hours | 8 |
| Prerequisites | phys.qm.operators, phys.qm.hydrogen-atom-qm |
| Unlocks | (none) |

---

## Section 1 — Concept Spine

**Core Claim:** When a quantum system's Hamiltonian Ĥ = Ĥ⁰ + λĤ' consists of a solvable part Ĥ⁰ plus a small perturbation λĤ', the corrected energies and wave functions can be expanded in powers of λ: Eₙ = Eₙ⁰ + λEₙ¹ + λ²Eₙ² + …, where the first-order energy correction is simply the expectation value of the perturbation in the unperturbed state: Eₙ¹ = ⟨φₙ⁰|Ĥ'|φₙ⁰⟩.

**Why It Matters:** Very few quantum systems have exact solutions. Perturbation theory provides accurate corrections for realistic systems — fine structure of hydrogen, Stark and Zeeman effects, crystal field splitting — allowing quantitative predictions where exact solutions are impossible.

**Threshold Concept:** Perturbation theory is a systematic expansion in a small parameter, not an approximation method that "guesses." The first-order correction is exact to first order in λ; higher-order terms improve accuracy; convergence requires the perturbation to be genuinely small compared to the unperturbed level spacings.

**Prerequisite Knowledge Check:**
- Quantum operators, expectation values, eigenstates (phys.qm.operators)
- Hydrogen atom wave functions and energy levels (phys.qm.hydrogen-atom-qm)
- Matrix elements ⟨m|Â|n⟩ in bra-ket notation

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** You know the exact solution to a simple problem (a ball in a perfect bowl). Now the bowl is slightly tilted. Instead of solving the tilted-bowl problem from scratch, you find how much the tilt shifts the ball's equilibrium — a small correction to the original answer.

**Representational:**
- Energy level diagram: unperturbed levels E_n⁰ shifted by corrections ΔE_n = E_n¹ + E_n² + …
- Non-degenerate case: correction is additive and proportional to ⟨Ĥ'⟩
- Degenerate case: perturbation lifts degeneracy → levels split into distinct sub-levels

**Abstract:**
- Hamiltonian: Ĥ = Ĥ⁰ + λĤ'
- Eigenstates/values of Ĥ⁰: Ĥ⁰|φₙ⟩ = Eₙ⁰|φₙ⟩
- First-order energy correction: Eₙ¹ = ⟨φₙ⁰|Ĥ'|φₙ⁰⟩
- First-order state correction: |φₙ¹⟩ = Σ_{m≠n} [⟨φₘ⁰|Ĥ'|φₙ⁰⟩/(Eₙ⁰ − Eₘ⁰)] |φₘ⁰⟩
- Second-order energy correction: Eₙ² = Σ_{m≠n} |⟨φₘ⁰|Ĥ'|φₙ⁰⟩|²/(Eₙ⁰ − Eₘ⁰)
- Convergence condition: |⟨φₘ⁰|Ĥ'|φₙ⁰⟩| ≪ |Eₙ⁰ − Eₘ⁰| for all m ≠ n
- Degenerate perturbation theory: diagonalize Ĥ' within the degenerate subspace first

**Transfer:** Hydrogen fine structure: Ĥ' = relativistic + spin-orbit + Darwin term → energy corrections ΔE_{nj} = −(E_n⁰)²/(2m_e c²)[(4n/(j+½)) − 3]. Stark effect: E-field perturbation → linear or quadratic shift depending on degeneracy. Zeeman effect: B-field → splitting of m_l levels.

---

## Section 3 — Why Beginners Fail

1. **Forgetting the convergence condition:** Learners apply perturbation theory even when the perturbation is comparable to level spacings, getting nonsensical results (corrections larger than the unperturbed energy).
2. **Confusing first-order state and first-order energy:** E_n¹ = ⟨n|Ĥ'|n⟩ involves only the diagonal matrix element. The state correction |φₙ¹⟩ involves all off-diagonal matrix elements. Learners mix these up.
3. **Degenerate perturbation theory omission:** When unperturbed levels are degenerate, first-order non-degenerate formula breaks down (denominator E_n⁰ − E_m⁰ = 0). Learners apply non-degenerate formula regardless.
4. **Thinking perturbation "forces" transitions:** Time-independent perturbation theory shifts energies and mixes states — it does not cause transitions. Transitions require time-dependent perturbation theory.

---

## Section 4 — Misconception Library

### MC-1: Perturbation theory always works
- **Probe:** "When does perturbation theory fail?"
- **Characteristic phrase:** "You can always use perturbation theory — just add more terms."
- **Trigger:** Over-confidence in the method; textbooks often present only clean examples.
- **Conflict evidence [P28]:** Consider H' comparable to (E_n⁰ − E_m⁰). The state correction denominator is small; the correction term ⟨m|H'|n⟩/(E_n⁰−E_m⁰) becomes large. Second-order correction |⟨m|H'|n⟩|²/(E_n⁰−E_m⁰) can exceed the first-order correction. The series diverges.
- **Bridge [P30]:** Perturbation theory is a power series expansion in λ. It converges only if each successive term is smaller than the previous one — requiring the off-diagonal matrix elements to be much smaller than the level spacings.
- **Replacement [P31]:** Perturbation theory requires |⟨m|Ĥ'|n⟩| ≪ |E_n⁰ − E_m⁰|. For near-degenerate levels, use degenerate perturbation theory (or variational methods, exact diagonalization).
- **Discrimination pairs [P33]:** H' ≈ 0.01 × |E_n⁰ − E_m⁰|: perturbation theory converges fast. H' ≈ |E_n⁰ − E_m⁰|: method invalid, use exact solution or variational method.
- **S6 repair path:** Apply PT to a two-level system where H' is comparable to the level splitting; show correction exceeds unperturbed energy; compare to exact solution.

### MC-2: First-order energy correction requires summing over all m ≠ n
- **Probe:** "Write the formula for the first-order energy correction E_n¹."
- **Characteristic phrase:** "E_n¹ = Σ_{m≠n} ⟨m|H'|n⟩."
- **Trigger:** Confusing first-order energy with first-order state correction formula.
- **Conflict evidence [P28]:** The first-order energy correction is only the diagonal matrix element: E_n¹ = ⟨n|H'|n⟩. The sum over m≠n formula is for the first-order state correction. If learner uses the sum formula for energy, they get a completely different (wrong) quantity.
- **Bridge [P30]:** Derive from the Schrödinger equation: project (Ĥ⁰ + λH')|n⁰ + λ|n¹⟩ = (E_n⁰ + λE_n¹)|n⁰ + λ|n¹⟩ onto ⟨n⁰|. The Ĥ⁰ terms cancel, leaving E_n¹ = ⟨n⁰|H'|n⁰⟩.
- **Replacement [P31]:** E_n¹ = ⟨φₙ⁰|Ĥ'|φₙ⁰⟩ (diagonal matrix element, no sum). |φₙ¹⟩ = Σ_{m≠n} [⟨φₘ⁰|Ĥ'|φₙ⁰⟩/(Eₙ⁰−Eₘ⁰)]|φₘ⁰⟩ (off-diagonal matrix elements, sum over m≠n).
- **Discrimination pairs [P33]:** E_n¹: one term, diagonal. |φₙ¹⟩: sum of terms, off-diagonal. E_n²: sum of squared off-diagonal elements divided by energy denominators.
- **S6 repair path:** Derive E_n¹ step by step from projecting the first-order equation onto ⟨φₙ⁰|.

### MC-3: Non-degenerate perturbation theory works for degenerate levels
- **Probe:** "The 2p states of hydrogen (l=1, m=−1,0,+1) are degenerate. Can I use E_n¹ = ⟨n|H'|n⟩ for each?"
- **Characteristic phrase:** "Yes, just apply the formula to each m separately."
- **Trigger:** Mechanical application of formula without checking prerequisites.
- **Conflict evidence [P28]:** The state correction |φₙ¹⟩ for degenerate levels has denominator E_n⁰ − E_m⁰ = 0 for other states in the same degenerate subspace → division by zero. The formula breaks down.
- **Bridge [P30]:** Within a degenerate subspace, any linear combination of degenerate eigenstates is also an eigenstate. The perturbation selects which linear combinations are the "correct" zeroth-order states (those that diagonalize H' within the subspace).
- **Replacement [P31]:** Degenerate perturbation theory: construct the matrix ⟨m|H'|n⟩ restricted to the degenerate subspace. Diagonalize this matrix. Its eigenvalues are the first-order energy corrections; its eigenvectors are the correct zeroth-order states.
- **Discrimination pairs [P33]:** Non-degenerate: E_n⁰ ≠ E_m⁰ for m≠n → formula valid. Degenerate: E_n⁰ = E_m⁰ for some m≠n → diagonalize H' in the degenerate subspace first.
- **S6 repair path:** Work through Stark effect on the n=2 hydrogen level: 4-state degenerate subspace (2s, 2p_m) — diagonalize eEz matrix in this subspace to find level splitting.

### MC-4: Perturbation theory causes transitions
- **Probe:** "If I apply a constant electric field, does perturbation theory tell me how fast the electron transitions between levels?"
- **Characteristic phrase:** "Yes — the electric field perturbs the system and causes transitions."
- **Trigger:** Conflating time-independent and time-dependent perturbation theory.
- **Conflict evidence [P28]:** Time-independent perturbation theory assumes H' is constant (switched on at t=−∞). It produces energy eigenvalues and eigenstates of the full time-independent Hamiltonian. Transitions occur only when H' is time-dependent; those rates come from Fermi's golden rule (time-dependent PT).
- **Bridge [P30]:** A constant perturbation shifts energy levels and mixes stationary states — it doesn't cause transitions. A time-varying perturbation oscillating at the right frequency does cause transitions.
- **Replacement [P31]:** Time-independent PT → shifted energy levels and mixed stationary states. Time-dependent PT → transition probabilities and rates (Fermi's golden rule). For the Stark effect (constant E field), time-independent PT is correct — it shifts energy levels, not transition rates.
- **Discrimination pairs [P33]:** Constant magnetic field: time-independent PT → Zeeman splitting of energy levels. Oscillating EM wave: time-dependent PT → stimulated absorption/emission rates.
- **S6 repair path:** Contrast the physical setup: constant field → use time-independent PT to find new stationary states. Oscillating field → use time-dependent PT (Fermi's golden rule) to find transition rates.

---

## Section 5 — Explanation Library

### Explanation A — Derivation of First-Order Correction
Write Ĥ = Ĥ⁰ + λĤ' and expand: |φₙ⟩ = |φₙ⁰⟩ + λ|φₙ¹⟩ + …, Eₙ = Eₙ⁰ + λEₙ¹ + …. Substitute into Ĥ|φₙ⟩ = Eₙ|φₙ⟩ and collect terms by order in λ. Order λ⁰: Ĥ⁰|φₙ⁰⟩ = Eₙ⁰|φₙ⁰⟩ (satisfied by assumption). Order λ¹: Ĥ⁰|φₙ¹⟩ + Ĥ'|φₙ⁰⟩ = Eₙ⁰|φₙ¹⟩ + Eₙ¹|φₙ⁰⟩. Project onto ⟨φₙ⁰|: ⟨φₙ⁰|Ĥ⁰|φₙ¹⟩ + ⟨φₙ⁰|Ĥ'|φₙ⁰⟩ = Eₙ⁰⟨φₙ⁰|φₙ¹⟩ + Eₙ¹. Since Ĥ⁰ is Hermitian: ⟨φₙ⁰|Ĥ⁰|φₙ¹⟩ = Eₙ⁰⟨φₙ⁰|φₙ¹⟩ → these terms cancel → Eₙ¹ = ⟨φₙ⁰|Ĥ'|φₙ⁰⟩.

### Explanation B — Physical Meaning: Expectation Value
The first-order energy correction Eₙ¹ = ⟨φₙ⁰|Ĥ'|φₙ⁰⟩ is simply the expectation value of the perturbation in the unperturbed state. Physical interpretation: to first order, the energy shifts by the average value of the perturbation that the unperturbed particle "feels" in its unperturbed quantum state. For example, adding a small uniform gravitational field to a harmonic oscillator shifts each level by ⟨x⟩ × (gravitational constant) = 0 (since ⟨x⟩ = 0 for the QHO) — the energy doesn't shift at first order, only at second order (the ground state lowers slightly due to the quadratic response).

### Explanation C — Fine Structure of Hydrogen
The hydrogen Hamiltonian in reality has three corrections beyond the simple Coulomb term: (1) relativistic kinetic energy correction (p²/2m → p⁴/8m³c²), (2) spin-orbit coupling L⃗·S⃗ (interaction of orbital and spin magnetic moments), (3) Darwin term (for l=0 states, pointlike correction). Perturbation theory gives the combined fine-structure correction: ΔE_{nj} = −α²E_n⁰/(n²)[(n/(j+½)) − ¾], where α = e²/(4πε₀ℏc) ≈ 1/137 is the fine-structure constant (making these corrections order α² smaller than Eₙ⁰ ≈ −13.6/n² eV). The states split according to j = l ± ½ → the observed hydrogen spectrum shows doublets (two lines for each orbital transition), exactly matching perturbation theory predictions.

---

## Section 6 — Analogy Library

**Primary Analogy:** Taylor expansion. If f(x) is a function near x=a, f(a+ε) ≈ f(a) + ε f'(a) + ε²f''(a)/2 + … Perturbation theory is exactly this, but for energy as a function of the perturbation strength λ: E(λ) = E(0) + λ E'(0) + λ² E''(0)/2 + …

**Breaking Point:** Taylor series converges only within the radius of convergence. Similarly, perturbation series converges only if λ and the matrix elements are small enough. Unlike Taylor series for analytic functions (infinite radius of convergence for polynomials), perturbation series can diverge for arbitrary λ.

**Anti-Analogy:** Exact diagonalization — write the full Hamiltonian matrix and find all eigenvalues numerically. This is always exact but computationally expensive for large systems. Perturbation theory is fast and gives physical insight but works only when the perturbation is small.

---

## Section 7 — Demonstration Library

**Demo 1 — QHO with Linear Perturbation**
H' = cx (linear term added to QHO). Compute E_n¹ = ⟨n|cx|n⟩ = c⟨n|x|n⟩ = 0 (since ⟨x⟩ = 0 for QHO). So no first-order correction. Compute E_n² = c² Σ_{m≠n}|⟨m|x|n⟩|²/(E_n−E_m). Use ladder operators: ⟨n±1|x|n⟩ = √(ℏ/2mω)√(n+1 or n). Result: E_n² = −c²/(2mω²). Compare to exact solution (completing the square in the potential): exact shift = −c²/(2mω²). Perfect agreement — demonstrates that second-order PT is exact for this problem.

**Demo 2 — Stark Effect (n=1 Hydrogen)**
H' = eEz (electric field). Compute E_1¹ = ⟨1s|eEz|1s⟩ = 0 (by parity: 1s is even, z is odd, integral vanishes). So no first-order Stark shift for ground state. E_1² = e²E² Σ_{n≠1}|⟨n|z|1⟩|²/(E_1−E_n) < 0 (denominator negative for all excited states). Ground state shifts down (quadratic Stark effect). Demonstrates parity selection of first vs. second order.

**Demo 3 — Zeeman Effect**
H' = (eB/2m)(L_z + 2S_z). Compute first-order correction for hydrogen states: E¹ = (eB/2m)(m_l + 2m_s)ℏ. Predicts equally spaced triplet (anomalous Zeeman in weak field; normal Zeeman for L=0 states). Compare to observed spectral splitting in a magnetic field.

---

## Section 8 — Discovery Lesson

**Setup:** Learners have the exact solution for a particle in a box (energy E_n⁰ = n²π²ℏ²/2mL²). Perturb with a small bump at the center: H' = V₀ for L/4 < x < 3L/4, zero elsewhere.

**Task 1:** Compute the first-order correction to E_1 (ground state): E_1¹ = ∫₀ᴸ φ_1*(x) H'(x) φ_1(x) dx. (Answer: V₀ × (integral of sin²(πx/L) over the bump region) = V₀/2 approximately.)

**Task 2:** Is the correction positive or negative? Why? (Positive: added potential energy inside the region where the wave function is large.)

**Task 3:** Compute E_2¹ similarly. Why is it different from E_1¹? (The n=2 wave function has a node at x=L/2 — the center of the bump — so it "feels" less of the perturbation.)

**Resolution:** First-order perturbation theory gives quantitatively correct shifts for this problem. The different shifts for different n illustrate that perturbation corrections depend on the overlap of the wave function with the perturbation — not just its magnitude.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Derive E_n¹ = ⟨n|H'|n⟩ from projecting the first-order equation | Learner confuses energy correction formula with state correction |
| 2 | Show parity argument kills first-order Stark effect for ground state | Learner doesn't know when first-order correction vanishes |
| 3 | Set up degenerate subspace matrix for hydrogen n=2 Stark effect | Learner applies non-degenerate formula to degenerate levels |

---

## Section 10 — Voice Teaching

**Opening hook:** "Almost nothing in quantum mechanics can be solved exactly — only the harmonic oscillator, hydrogen atom, and a handful of others. Perturbation theory is the key that unlocks everything else. It says: if you know the solution to a simple problem, and your real problem is just a little different, you can find the answer without starting from scratch."

**Pacing:** Derive E_n¹ from first principles before giving applications. The derivation is short (10 minutes) and completely unmysterious — learners should see it is just algebra following from the Schrödinger equation.

**Common impasse language:** "Does first order always work? No. The correction E_n² has the unperturbed level spacing in the denominator. If two levels are nearly degenerate, that denominator is small → correction is large → first order is not small → the series fails. Always check: is the perturbation small compared to the relevant level spacings?"

**Closing consolidation:** "Perturbation theory is everywhere in physics: fine structure, Zeeman and Stark effects, nuclear shell model, molecular spectra, solid-state band gaps. It's the most-used quantum mechanical tool after the harmonic oscillator solution. Learn it well — you will use it constantly."

---

## Section 11 — Assessment

**Mastery gate:** Derive E_n¹; apply it to at least one physical problem; recognize when degenerate perturbation theory is needed.

**FA-1:** "A particle is in the ground state of an infinite square well (L=1 m). A constant perturbation H' = V₀ is added everywhere inside the well. Find the first-order energy correction."
*Expected:* E_0¹ = ⟨φ_0|H'|φ_0⟩ = V₀⟨φ_0|φ_0⟩ = V₀ (since constant H' → just V₀ times normalization = V₀).
*Threshold:* Correctly identifies it as expectation value of a constant = the constant itself.

**FA-2:** "A spin-½ particle in a magnetic field B along z has H⁰ = −γS_z B. A small transverse field adds H' = −γS_x B'. Find the first-order energy correction to the spin-up state."
*Expected:* E_+¹ = ⟨↑|H'|↑⟩ = −γB'⟨↑|S_x|↑⟩. Using S_x = (ℏ/2)σ_x: ⟨↑|σ_x|↑⟩ = [1,0][[0,1],[1,0]][1,0]ᵀ = 0. So E_+¹ = 0.
*Threshold:* Correctly evaluates matrix element using Pauli matrices; recognizes it vanishes.

**FA-3:** "For which situations must you use degenerate perturbation theory instead of non-degenerate?"
*Expected:* When two or more unperturbed states have the same energy and H' connects them (i.e., has nonzero off-diagonal matrix elements between them in the degenerate subspace). If H' is diagonal in the degenerate subspace, the non-degenerate formula still applies to each state separately.
*Threshold:* States the degeneracy condition; adds the caveat about off-diagonal matrix elements.

**FA-4:** "Why is the second-order energy correction E_n² always negative for the ground state?"
*Expected:* E_n² = Σ_{m>0}|⟨m|H'|0⟩|²/(E_0⁰−E_m⁰). All excited states have E_m⁰ > E_0⁰, so the denominators E_0⁰−E_m⁰ are all negative. The numerators |...|² are all positive. Sum of (positive/negative) terms → E_0² ≤ 0. The ground state always shifts down at second order.
*Threshold:* Identifies sign of each denominator; concludes sum is non-positive.

**Confidence calibration:** After FA-2, ask: "What would the second-order energy correction be for the spin-up state? Would it be zero or nonzero?" This probes whether the learner understands that first-order vanishing doesn't imply all corrections vanish.

**Delayed retrieval:** Return at day 7: "State the condition under which perturbation theory converges. Apply it to decide whether PT is valid for the fine-structure corrections to hydrogen (α ≈ 1/137)."

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Learner cannot evaluate bra-ket inner products or matrix elements. Return to phys.qm.operators before PT.

**S3 — Partial understanding:** Can state E_n¹ = ⟨n|H'|n⟩ but cannot compute it for specific wave functions. Intervention: guided calculation for particle-in-a-box with constant H' (Discovery Lesson).

**S6 — Misconception detected:** MC-3 (applying non-degenerate PT to degenerate hydrogen levels). Intervention: set up the 2×2 matrix for n=2 hydrogen Stark effect; show that non-degenerate formula gives division by zero; then diagonalize the 2×2 matrix correctly.

**S9 — Near mastery:** Can apply first-order PT but struggles with second-order. Intervention: QHO with linear perturbation (Demo 1) — derive second-order correction and verify against exact solution.

---

## Section 13 — Memory & Review

**Memory type:** Procedural (compute E_n¹, recognize degenerate case) + structural (understand when and why PT applies).

**Spaced retrieval schedule:** Day 1 (state E_n¹ formula; apply to QHO with constant perturbation), Day 3 (compute Zeeman splitting for 2p states), Day 7 (derive E_n¹ from scratch; explain second-order sign for ground state), Day 21 (apply degenerate PT to a two-level problem).

**Interleaving partners:** phys.qm.operators (matrix elements, expectation values, bra-ket algebra), phys.qm.hydrogen-atom-qm (the wave functions on which PT acts), phys.qm.selection-rules (which matrix elements ⟨m|H'|n⟩ vanish by symmetry).

---

## Section 14 — Transfer Map

**Near transfer:** Fine structure of hydrogen; Stark effect (linear for n=2, quadratic for n=1); Zeeman effect; crystal field splitting of d-orbitals in transition metals.

**Far transfer:** Nuclear shell model corrections; phonon-electron coupling in superconductivity (BCS theory uses perturbative electron-phonon vertex); molecular vibrational anharmonicity corrections.

**Structural abstraction:** Perturbation theory is a universal strategy in physics and mathematics: wherever an exact solution is known and reality deviates slightly, expand in a small parameter. The same logic appears in classical mechanics (perturbation of planetary orbits), statistical mechanics (virial expansion for non-ideal gases), field theory (Feynman diagrams as perturbative expansion in coupling constant).

---

## Section 15 — Curriculum Feedback

**Dependency check:** phys.qm.operators (eigenvalue equations, expectation values, Hermitian operators) and phys.qm.hydrogen-atom-qm (the canonical wave functions) must both be solid. Without these, learners cannot compute matrix elements ⟨m|H'|n⟩.

**Common pacing error:** Teaching the formula E_n¹ = ⟨n|H'|n⟩ without deriving it. Learners who memorize without deriving typically confuse it with the state correction formula or don't understand why degenerate PT is different.

**Assessment gap:** Most curricula test E_n¹ application but rarely test: (1) when PT fails (MC-1), (2) second-order energy correction for the ground state, or (3) degenerate PT matrix construction.

**Suggested pairing:** Pair with phys.qm.selection-rules — selection rules determine which matrix elements ⟨m|H'|n⟩ vanish by symmetry, making PT calculations much simpler in practice.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

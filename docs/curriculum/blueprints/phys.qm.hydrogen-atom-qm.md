# Teaching Blueprint: Quantum Treatment of Hydrogen Atom
**ID:** phys.qm.hydrogen-atom-qm
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.qm.hydrogen-atom-qm |
| Name | Quantum Treatment of Hydrogen Atom |
| Domain | Quantum Mechanics |
| Difficulty | Expert |
| Bloom Level | Apply |
| Estimated Hours | 10 |
| Prerequisites | phys.qm.schrodinger-equation, phys.qm.operators |
| Unlocks | phys.qm.perturbation-theory, phys.qm.selection-rules |

---

## Section 1 — Concept Spine

**Core Claim:** Solving the 3D Schrödinger equation for an electron in a Coulomb potential V = −e²/(4πε₀r) yields exact wave functions ψ_{nlm}(r,θ,φ) = R_{nl}(r)·Y_l^m(θ,φ) and energy levels Eₙ = −13.6 eV/n², where n (principal), l (orbital), and m (magnetic) quantum numbers arise naturally from the mathematics of spherical symmetry — not as postulates.

**Why It Matters:** The hydrogen atom is the only atom with an exact quantum-mechanical solution; it establishes the quantum number system used for all atoms, explains the Bohr model while revealing its limitations, and provides the basis for understanding atomic structure, the periodic table, and spectroscopy.

**Threshold Concept:** The three quantum numbers (n, l, m) are not arbitrary labels — they arise as boundary conditions forcing the wave function to be normalizable. The quantum structure of the atom is the mathematical requirement that ψ → 0 at infinity, nothing more.

**Prerequisite Knowledge Check:**
- TISE in 3D and separation of variables (phys.qm.schrodinger-equation)
- Angular momentum operators L̂², L̂_z and their eigenvalues (phys.qm.operators)
- Spherical harmonics Y_l^m as eigenfunctions of L̂²

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** Bohr's planetary model: electron in fixed circular orbit, only specific radii allowed. Quantum picture: electron is a 3D wave surrounding the nucleus; the wave function gives the probability of finding the electron. The shape of the probability cloud depends on (n,l,m).

**Representational:**
- Orbital shapes: s (l=0) spherical; p (l=1) dumbbell; d (l=2) cloverleaf
- Radial probability: r²|R_{nl}|² — most probable radius for 1s: r = a₀ = 0.529 Å (Bohr radius)
- Energy ladder: Eₙ = −13.6/n² eV; ionization from ground state requires 13.6 eV

**Abstract:**
- TISE in spherical: −(ℏ²/2m)∇²ψ − (e²/4πε₀r)ψ = Eψ
- Separation: ψ = R(r)·Y_l^m(θ,φ)
- Angular equation → Y_l^m, eigenvalues L̂² = l(l+1)ℏ², L̂_z = mℏ, l = 0,1,…,n−1; m = −l,…,+l
- Radial equation → associated Laguerre polynomials; quantization condition: n = 1,2,3,…; energy Eₙ = −m_e e⁴/(8ε₀²h²n²) = −13.6/n² eV
- Degeneracy: for given n, states with all allowed l and m → n² total states (×2 with spin: 2n²)
- Bohr radius: a₀ = 4πε₀ℏ²/(m_e e²) = 0.529 Å; ⟨r⟩_{1s} = 3a₀/2
- Selection rules (preview): Δn = anything, Δl = ±1, Δm = 0,±1

**Transfer:** Multi-electron atoms: same quantum numbers n,l,m,m_s per electron (plus Pauli exclusion principle → periodic table). Hydrogen spectral series: Lyman (n→1), Balmer (n→2), Paschen (n→3) from Eₙ formula.

---

## Section 3 — Why Beginners Fail

1. **Confusing Bohr orbits with quantum orbitals:** Learners picture the electron following a circular path; quantum mechanics says there is no definite path, only a probability distribution.
2. **Quantum number constraints:** l runs 0 to n−1, m runs −l to +l. Learners often write l up to n or forget the l-constraint on m, giving wrong degeneracy counts.
3. **Radial vs. angular probability:** The angular shape (Y_l^m) gives directionality; the radial function R_{nl} gives the distance distribution. Learners conflate them or think the orbital picture is a literal electron path.
4. **Degeneracy counting:** n² states per n level (ignoring spin). Learners count l values (n possible) but forget each l has 2l+1 m-values. Sum: Σ(l=0 to n-1)(2l+1) = n².

---

## Section 4 — Misconception Library

### MC-1: Electrons orbit the nucleus like planets
- **Probe:** "Where is the electron in the ground state of hydrogen?"
- **Characteristic phrase:** "It orbits at the Bohr radius, like a planet."
- **Trigger:** Bohr model taught first; analogy to solar system.
- **Conflict evidence [P28]:** If the electron had a definite trajectory, we could simultaneously know its position and momentum precisely — violating ΔxΔp ≥ ℏ/2. Also: measured hydrogen positions scatter across a range consistent with the 1s orbital's spread, not a single radius.
- **Bridge [P30]:** The Bohr radius a₀ is the most probable radius in the quantum model (peak of r²|R_{10}|²), not a definite orbit. The electron has a probability *distribution* around the nucleus.
- **Replacement [P31]:** ψ_{1s}(r) = (1/√π a₀³)e^(−r/a₀). The electron is spread out. The probability of finding it at radius r in dr is P(r)dr = r²|R_{10}|²dr — peaked at a₀ but with a spread.
- **Discrimination pairs [P33]:** Bohr: electron at exactly r = a₀ always. QM 1s: P(r = 0) = 0, P(r = a₀) maximum, P(r → ∞) → 0 but never exactly zero.
- **S6 repair path:** Plot the radial probability distribution for 1s and show P(r=a₀) is a peak, not a certainty; integrate P(r)dr from 0 to a₀ to show ~32% of probability is inside a₀.

### MC-2: l can equal n
- **Probe:** "What are the allowed l values for n=3?"
- **Characteristic phrase:** "l = 0, 1, 2, 3."
- **Trigger:** Forgetting the constraint l ≤ n−1.
- **Conflict evidence [P28]:** If l = n = 3, the radial equation has no normalizable solution — the wavefunction diverges or doesn't normalize. The constraint l ≤ n−1 is a mathematical necessity, not an arbitrary rule.
- **Bridge [P30]:** The radial equation produces a polynomial of degree n−l−1; for this to terminate (giving a normalizable solution), we need n−l−1 ≥ 0 → l ≤ n−1.
- **Replacement [P31]:** For n=3: l = 0, 1, 2 only. Subshells: 3s (l=0), 3p (l=1), 3d (l=2).
- **Discrimination pairs [P33]:** n=1: l=0 only (1s). n=2: l=0,1 (2s, 2p). n=3: l=0,1,2 (3s, 3p, 3d). n=4: l=0,1,2,3 (4s, 4p, 4d, 4f).
- **S6 repair path:** Have learner count total states for n=3 using the correct constraints and verify sum = n² = 9.

### MC-3: The orbital shape shows where the electron "is"
- **Probe:** "What does the p_x orbital dumbbell shape mean?"
- **Characteristic phrase:** "The electron is in the two lobes."
- **Trigger:** Visual representation of orbitals as electron locations.
- **Conflict evidence [P28]:** The dumbbell shape is a 3D surface enclosing 90% of the probability density |ψ|². The electron has nonzero probability everywhere outside the boundary too, and the shape describes the *directional distribution* of finding it.
- **Bridge [P30]:** The angular part Y_l^m(θ,φ) determines the directional preference; the radial part R_{nl}(r) determines the radial distribution. The orbital surface is a visual summary of the angular distribution at the most probable radius.
- **Replacement [P31]:** The p orbital dumbbell means: if we look along the x-axis, we're more likely to find the electron in those lobes than along y or z. It's a probability density map, not a container.
- **Discrimination pairs [P33]:** 1s: spherically symmetric (all directions equally probable). 2p_z: highest probability along z-axis (top and bottom), zero probability in xy-plane (nodal plane).
- **S6 repair path:** Show |ψ_{2p_z}|² = r²e^(−r/a₀)cos²θ/(32πa₀⁵); the cos²θ factor makes the z-direction favored.

### MC-4: n=1 has three states (like n=2, l=1 which has three m values)
- **Probe:** "How many distinct quantum states does n=2 have (ignoring spin)?"
- **Characteristic phrase:** "Three, one for each p orbital."
- **Trigger:** Counting only the l=1 subshell (m = −1, 0, +1).
- **Conflict evidence [P28]:** n=2 also has l=0 (the 2s state), giving one more state. Total: l=0 (1 state) + l=1 (3 states) = 4 = n². With spin: 8 = 2n².
- **Bridge [P30]:** Each allowed l has 2l+1 m values. Total states = Σ_{l=0}^{n-1}(2l+1) = 1+3+5+…+(2n−1) = n².
- **Replacement [P31]:** n=2: (2,0,0) plus (2,1,−1), (2,1,0), (2,1,+1) = 4 states. n²=4 ✓.
- **Discrimination pairs [P33]:** n=1: 1 state (1s). n=2: 4 states (2s + 2p×3). n=3: 9 states.
- **S6 repair path:** Table exercise: list all (n,l,m) triples for n=1,2,3 and verify counts 1, 4, 9.

---

## Section 5 — Explanation Library

### Explanation A — Why Three Quantum Numbers Appear
The 3D TISE in spherical coordinates separates into three ordinary differential equations — one each for r, θ, φ. Each equation, when requiring a physically acceptable (normalizable, single-valued) solution, generates an integer. The φ equation gives m (integer from single-valuedness). The θ equation gives l (non-negative integer from normalizability; l ≥ |m|). The r equation gives n (positive integer from normalizability; n ≥ l+1). Three equations, three quantum numbers — a mathematical necessity, not a guess.

### Explanation B — Energy Levels and Spectral Series
The energy Eₙ = −13.6/n² eV is negative (bound state) and increases toward zero as n → ∞ (ionization). Photon emission when electron drops from level n₂ to n₁: hν = Eₙ₂ − Eₙ₁ = 13.6(1/n₁² − 1/n₂²) eV. Balmer series (n₁=2): visible light, famously predicts hydrogen's red, blue-green, violet lines. Lyman series (n₁=1): UV. This formula matches spectroscopic measurements to 6 significant figures — the quantum model's first great triumph.

### Explanation C — Hydrogen Atom and the Periodic Table
Including electron spin, hydrogen's nth level has 2n² states. For multi-electron atoms (solved approximately), the same quantum numbers (n,l,m,m_s) apply per electron, subject to the Pauli exclusion principle (no two electrons share all four quantum numbers). Filling order (with shielding causing energy ordering deviations) produces the periodic table. The l=0 (s), l=1 (p), l=2 (d), l=3 (f) shells hold 2, 6, 10, 14 electrons respectively — the rows and blocks of the periodic table are written in hydrogen's wave functions.

---

## Section 6 — Analogy Library

**Primary Analogy:** Standing waves on a spherical balloon — only certain wave patterns "fit" without discontinuity. The quantum numbers n, l, m label these standing-wave modes; energy quantization is the condition that the wave closes on itself smoothly.

**Breaking Point:** Balloon modes are classical standing waves; the hydrogen wave functions are quantum mechanical. The crucial difference is the probabilistic interpretation and the fact that measuring the electron's position collapses the wave function — there is no classical analog.

**Anti-Analogy:** Bohr model — electron in definite circular orbit. Explains Eₙ = −13.6/n² but wrong about electron location, angular momentum quantization (Bohr: L = nℏ; QM: L = √(l(l+1))ℏ), and predicts no angular momentum for ground state (Bohr: n=1 means L = ℏ; QM: 1s has l=0, L=0).

---

## Section 7 — Demonstration Library

**Demo 1 — Radial Probability Plots**
Plot r²|R_{nl}|² for 1s, 2s, 2p, 3s, 3p, 3d. Identify: (1) the most probable radius for each; (2) the number of radial nodes (= n−l−1); (3) how the most probable radius scales with n² (Bohr-like trend). Ask: "Why does 2s have higher probability near the nucleus than 2p?"

**Demo 2 — Spectral Line Calculation**
Calculate the wavelengths of the first three Balmer lines (n→2): Hα (n=3): λ = 656.3 nm (red), Hβ (n=4): 486.1 nm (blue-green), Hγ (n=5): 434.0 nm (violet). Compare to hydrogen discharge tube spectrum. The match is exact — QM quantitative triumph.

**Demo 3 — Degeneracy Table**
Build the degeneracy table for n=1,2,3,4: list all (n,l,m) combinations, count total states, verify n² formula, add spin to get 2n². Connect to periodic table: n=1 holds 2 electrons (period 1), n=2 holds 8 (but with l-splitting: 2+6=8, period 2), etc.

---

## Section 8 — Discovery Lesson

**Setup:** Present the Balmer formula from hydrogen spectroscopy (1885): 1/λ = R_H(1/4 − 1/n²) for n=3,4,5…

**Task 1:** "This formula predicts spectral lines. Can you guess what formula for Eₙ would produce it, given that photon energy = hc/λ = Eₙ − E₂?"

**Expected result:** Learner derives Eₙ ∝ −1/n². Ask: what is the ground-state energy?

**Task 2:** "The Lyman series satisfies 1/λ = R_H(1−1/n²) for n=2,3,4… In what spectral region? Why?"

**Task 3:** "How many distinct states exist for n=3? Build the table of (n,l,m)."

**Resolution:** The Rydberg formula predates quantum mechanics by 35 years. Quantum mechanics *explains* why it works: the Coulomb potential gives Eₙ = −m_e e⁴/(8ε₀²h²n²), and ℏ→0 gives the Rydberg constant R_∞ = m_e e⁴/(8ε₀²h³c) — a parameter-free derivation.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Plot 1s radial probability distribution; show peak at a₀ is most probable, not definite | Learner invokes Bohr orbit picture |
| 2 | Build (n,l,m) table for n=3 and verify n²=9 | Learner miscounts quantum states |
| 3 | Calculate Balmer Hα wavelength from Eₙ = −13.6/n² eV | Learner questions whether QM predictions match experiment |

---

## Section 10 — Voice Teaching

**Opening hook:** "Bohr guessed the energy levels of hydrogen in 1913 — and got the right answer. But he needed magic: 'electrons can only orbit at certain radii, just because.' Quantum mechanics derived the same energy levels from first principles. No magic, just the mathematics of waves in 3D."

**Pacing:** Start with spectroscopic data (Balmer formula, observed lines), then show QM predicts it. The experimental triumph motivates the formalism.

**Common impasse language:** "Three quantum numbers feel like too many? Remember: one equation, one separation constant. You solved one 3D equation by separating into three 1D equations. Three equations → three quantum numbers. It's just coordinate separation — the structure was always there in the Schrödinger equation."

**Closing consolidation:** "The hydrogen solution is the Rosetta Stone of quantum chemistry. Its quantum numbers (n,l,m,m_s) are the same quantum numbers used for every atom, every molecule, and every solid. Learn hydrogen's wave functions and you've learned the language of atomic structure."

---

## Section 11 — Assessment

**Mastery gate:** Write wave function quantum numbers for any state; compute energy; calculate spectral line wavelengths; count degeneracy correctly.

**FA-1:** "What are the quantum numbers (n,l,m) for the 3d subshell? How many states?"
*Expected:* n=3, l=2, m = −2,−1,0,+1,+2 → 5 states (10 with spin).
*Threshold:* Correct l=2 for d, correct m range, correct count.

**FA-2:** "Calculate the energy of the n=4 level of hydrogen. What wavelength photon is emitted in the 4→2 transition?"
*Expected:* E₄ = −13.6/16 = −0.85 eV. ΔE = −0.85−(−3.4) = 2.55 eV. λ = hc/ΔE = 486 nm (Balmer Hβ, blue-green).
*Threshold:* Correct energy calculation, correct subtraction (upper minus lower = photon energy), correct wavelength.

**FA-3:** "Why does the 2s orbital have higher electron density near the nucleus than 2p?"
*Expected:* The 2s wavefunction ψ_{200} has l=0, so Y₀⁰ = constant — no angular nodes. R_{20} has a radial node but also a nonzero value at r=0 (for l=0: R_{nl}(0) ≠ 0 when l=0). The 2p function ψ_{21m} has l=1: R_{21} ∝ r·e^(−r/2a₀) → R_{21}(0) = 0. So 2p has zero probability at r=0 but 2s does not.
*Threshold:* Identifies l=0 allows nonzero ψ(0) while l>0 forces ψ(0)=0.

**FA-4:** "Total degeneracy of n=4 level (without spin)?"
*Expected:* Σ_{l=0}^{3}(2l+1) = 1+3+5+7 = 16 = n² = 16 ✓.
*Threshold:* Uses correct summation formula or builds the table correctly.

**Confidence calibration:** After FA-3, ask: "Could you explain this to someone who hasn't studied QM?" Learners often understand the calculation but can't explain the physics. Request a one-paragraph non-mathematical explanation.

**Delayed retrieval:** Return at day 7: "Without looking anything up, derive the formula for the Balmer series wavelengths from Eₙ = −13.6/n² eV."

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Learner struggles with complex wave functions or doesn't know what Y_l^m means. Return to phys.qm.operators for angular momentum operators and spherical harmonics.

**S3 — Partial understanding:** Can state Eₙ = −13.6/n² but cannot derive spectral line wavelengths or count degeneracy. Intervention: structured worksheet — compute E for n=1 through 5; calculate all Balmer wavelengths; build (n,l,m) table.

**S6 — Misconception detected:** MC-1 (orbital = definite path). Intervention: plot the 1s radial probability distribution, calculate P(r < a₀) ≈ 32%, show the electron genuinely has distributed probability.

**S9 — Near mastery:** Can compute everything but cannot connect to multi-electron atoms. Intervention: explain how Pauli exclusion + same quantum numbers → periodic table structure; compute electron configuration of carbon (Z=6) from hydrogen quantum numbers.

---

## Section 13 — Memory & Review

**Memory type:** Procedural (quantum number assignment, energy calculation, spectral lines) + structural (orbital shapes and their quantum number meaning).

**Spaced retrieval schedule:** Day 1 (quantum numbers for 2p and 3d; count states), Day 3 (calculate Hα wavelength; explain orbital shape), Day 7 (derive Balmer formula from Eₙ; explain why 2s penetrates closer to nucleus), Day 21 (connect to periodic table: electron configuration of Na or Fe from hydrogen quantum numbers).

**Interleaving partners:** phys.mod.bohr-model (Bohr gets Eₙ right but orbital angular momentum wrong), phys.qm.operators (L̂² and L̂_z eigenvalues underpin the quantum number structure), phys.qm.spin (spin doubles degeneracy: 2n² total states).

---

## Section 14 — Transfer Map

**Near transfer:** Multi-electron atoms: same quantum numbers, same orbital shapes, different energies due to electron-electron repulsion and shielding. Hydrogen spectroscopy: predict all series (Lyman, Balmer, Paschen, Brackett) from Eₙ formula.

**Far transfer:** Periodic table: electron configurations follow from the hydrogen quantum number structure + Pauli exclusion. The blocks (s, p, d, f) of the periodic table directly reflect l = 0, 1, 2, 3 subshells.

**Structural abstraction:** Separation of variables in 3D produces quantum numbers as boundary-condition integers. This pattern recurs whenever a 3D quantum problem has spherical symmetry — nuclear shell model, hydrogen-like ions (He⁺, Li²⁺), and (approximately) all atoms. The spherical harmonic Y_l^m appears in any spherically symmetric quantum potential.

---

## Section 15 — Curriculum Feedback

**Dependency check:** Learners need phys.qm.schrodinger-equation (to handle 3D TISE and separation of variables) and phys.qm.operators (to know L̂² and L̂_z eigenvalues). These must be solid before this blueprint.

**Common pacing error:** Jumping to orbital shapes (3D pictures) before establishing the quantum number constraints. Learners need to understand (n,l,m) constraints first, then the shapes follow.

**Assessment gap:** Most curricula test Eₙ = −13.6/n² but rarely test radial probability (why 2s penetrates more than 2p) or exact degeneracy counting with the summation formula.

**Suggested pairing:** Pair with phys.qm.spin to complete the full 2n² degeneracy picture, then move to phys.qm.selection-rules for which transitions are allowed.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

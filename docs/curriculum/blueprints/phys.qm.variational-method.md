# Teaching Blueprint — phys.qm.variational-method

## C0 — Concept Metadata
```
concept_id        : phys.qm.variational-method
display_name      : Variational Method
kg_difficulty     : 6 (expert)
bloom_target      : apply
mastery_threshold : 0.85
estimated_hours   : 8
prerequisites     : [phys.qm.hydrogen-atom-qm, phys.qm.perturbation-theory]
cross_links       : [phys.qm.wkb-approximation, phys.qm.operators]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The variational method (Rayleigh-Ritz) provides an upper bound on the ground-state energy by minimizing ⟨ψ|H|ψ⟩/⟨ψ|ψ⟩ over a family of trial wavefunctions, without solving the Schrödinger equation exactly.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-VAR-EXACT | "If my trial function is close to the real ground state, E_trial is close to the exact energy." | "I got a good wavefunction so my energy is accurate." | The variational principle guarantees E_trial ≥ E₀ (upper bound), but the gap can be arbitrarily large even for visually similar wavefunctions if the trial function has wrong symmetry or nodes; accuracy of ψ and accuracy of E are separate questions. |
| MC-VAR-ANY-STATE | "I can use the variational method to find excited states the same way I find the ground state." | "Minimize with a different trial function to get E₁." | Excited-state variational methods require orthogonality constraints to all lower states; without these, minimization always collapses to the ground state. The simple Rayleigh-Ritz bound E_trial ≥ E₀ applies unconditionally only to the ground state. |

---

## C3 — Worked Examples

### Example 1 — Gaussian trial function for hydrogen atom
H = −(ℏ²/2m)∇² − e²/(4πε₀r); trial: ψ_α = (2α/π)^(3/4) exp(−αr²) (Gaussian, normalized).
Compute ⟨T⟩ = 3ℏ²α/(2m), ⟨V⟩ = −e²/(4πε₀)·√(8α/π).
E(α) = 3ℏ²α/(2m) − e²√(8α/π)/(4πε₀).
Minimize: dE/dα=0 → α_opt = 8me⁴/(9π·(4πε₀)²ℏ⁴).
E_min = −(8/3π)·(me⁴/2(4πε₀)²ℏ²) = −0.849·E₁ where E₁ = −13.6 eV.
Result: E_trial = −11.5 eV > −13.6 eV (true ground state). Upper bound confirmed ✓

### Example 2 — Linear variational method (two basis functions)
Trial: ψ = c₁φ₁ + c₂φ₂. Minimize E = ⟨ψ|H|ψ⟩/⟨ψ|ψ⟩.
Secular equation: det(H−ES) = 0 where Hᵢⱼ = ⟨φᵢ|H|φⱼ⟩, Sᵢⱼ = ⟨φᵢ|φⱼ⟩.
For orthonormal basis: det(H−EI) = 0 → eigenvalue problem.
Physical example: two-site tight-binding model, H₁₁=H₂₂=ε₀, H₁₂=H₂₁=−t. Energies: E±=ε₀∓t. Bonding and antibonding orbitals emerge from the secular equation.

### Example 3 — Linear harmonic oscillator ground state check
True ground state: ψ₀ = (mω/πℏ)^(1/4) exp(−mωx²/2ℏ). Trial: same Gaussian.
E_trial = ℏω/2 = exact E₀. Shows variational bound is TIGHT when trial function is exact.
Lesson: if you guess the exact eigenstate, variational method gives the exact energy (not just an upper bound).

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P01 | Concrete hook | "You're bidding at auction but you know the price is at most X — you adjust your bid (trial function) to get as close to X from above as possible. The variational principle says your bid is always ≥ the true ground state energy." |
| TA-2 | P06 | Build notation | Rayleigh quotient E[ψ] = ⟨ψ|H|ψ⟩/⟨ψ|ψ⟩; variational theorem: E[ψ] ≥ E₀ for any normalized ψ; trial wavefunction with free parameter α; minimization condition dE/dα=0 |
| TA-3 | P07 | Formula derivation | Prove variational theorem: expand ψ=Σcₙψₙ; ⟨ψ|H|ψ⟩=Σ|cₙ|²Eₙ ≥ E₀Σ|cₙ|²=E₀ (since Eₙ≥E₀ for all n) → E[ψ]≥E₀ |
| TA-4 | P08 | Diagnostic probe | MC-VAR-EXACT: "A trial ψ matches the true ψ₀ in shape but misses a node — how does E_trial compare to E₀?" Answer: trial has no node so it's more like ground state; but if it has wrong spatial extent, E_trial could be significantly above E₀ even if shapes look similar. |
| TA-5 | P13 | Worked example | Example 1 (hydrogen Gaussian): compute ⟨T⟩, ⟨V⟩, minimize, find α_opt, compare to E₁=−13.6 eV. |
| TA-6 | P10 | Pattern drill | Linear variational method steps: (1) choose basis, (2) compute Hᵢⱼ and Sᵢⱼ, (3) solve secular equation, (4) lowest eigenvalue is best upper bound. Students apply to a 2×2 example. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the variational theorem. What does it guarantee about E[ψ] = ⟨ψ|H|ψ⟩ for any normalized trial state ψ?  
*Answer*: E[ψ] ≥ E₀ (ground state energy), with equality iff ψ = ψ₀.

**MP-2** (apply): For a particle in a box (V=0, 0<x<L), use the trial function ψ=x(L−x) (unnormalized) to estimate the ground state energy. Compare to exact E₀=π²ℏ²/(2mL²).  
*Answer*: ⟨T⟩/⟨ψ|ψ⟩ = 5ℏ²/(mL²); exact = π²ℏ²/(2mL²) ≈ 4.935ℏ²/(2mL²); ratio ≈ 1.013. Upper bound ✓ accurate to 1.3%.

**MP-3** (apply-MC): A student minimizes E[ψ_α] over α for an excited-state trial function (one node) and gets a value below the first excited state energy E₁. What went wrong?  
*Answer*: If ψ_α is not orthogonal to the ground state, the minimization collapses toward E₀, not E₁; the variational bound applies to the ground state always. The student must impose ⟨ψ_α|ψ₀⟩=0 to bound E₁.

**MP-4** (analyze): In the linear variational method with 2 basis functions, the secular equation gives E₋ < E₀ < E₊. What does E₋ represent?  
*Answer*: E₋ is the lowest eigenvalue of the 2×2 Hamiltonian matrix — the best upper bound on the true ground state energy E₀ achievable within this 2-function basis. Adding more basis functions can only lower E₋ further toward E₀.

**MP-5** (evaluate): Two students use different trial functions for the hydrogen ground state and get E_trial = −12.0 eV and −13.0 eV. Which is better and why?  
*Answer*: −13.0 eV is the better estimate — it is closer to the exact −13.6 eV from below (upper bound); the lower of two upper bounds is always the better approximation.

---

## C6 — Known Sticking Points

1. **Why only ground state?** Students want to apply the same principle to all levels; clarify that the theorem gives E₀ unconditionally but excited states need orthogonality.
2. **Normalization in Rayleigh quotient**: When trial function is not normalized, use ⟨ψ|H|ψ⟩/⟨ψ|ψ⟩, not just ⟨ψ|H|ψ⟩ — common arithmetic mistake.
3. **Tightness of bound**: Students assume better wavefunction → better energy estimate; correct by example where wrong symmetry gives E_trial ≫ E₀ despite visually similar shapes.
4. **Secular determinant**: Students attempt to solve det(H−ES)=0 directly without noting the generalized eigenvalue structure; for orthonormal basis it reduces to a standard eigenvalue problem.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student gets E_trial < E₀ | Flag numerical error; variational theorem is absolute — check normalization and Hᵢⱼ integrals |
| Student applies variational method to excited state without orthogonality constraint | Show concretely that minimizing ⟨ψ|H|ψ⟩ always gives E₀ — plot E[α] for the trial function |
| Student asks "how do I choose the trial function?" | "Physical intuition: match known limits (r→0, r→∞ behavior); use Gaussian for localized states, power laws for Coulomb potentials; more parameters = better bound but harder optimization" |
| Student confused about Rayleigh quotient vs expectation value | When ψ is normalized ⟨ψ|ψ⟩=1, both agree; when unnormalized, must divide — always safer to use the quotient form |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is the ground-state energy of hydrogen? How was it found?" (perturbation theory connection)
CORE-1 (15 min): TA-1 + TA-2 (hook + Rayleigh quotient notation)
CORE-2 (20 min): TA-3 + TA-4 (proof of theorem + MC diagnostic)
CORE-3 (20 min): TA-5 (hydrogen Gaussian example: compute integrals, minimize, compare)
DRILL  (10 min): TA-6 (linear variational method steps on 2×2 example)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "The WKB approximation is the variational method's partner for finding wavefunctions where the potential varies slowly — next topic."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.variational-method in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.hydrogen-atom-qm, phys.qm.perturbation-theory verified |
| V-3  | bloom_target matches C3 verb use | PASS — "apply" (compute E_trial, minimize, find α_opt) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-VAR-EXACT, MC-VAR-ANY-STATE |
| V-8  | C3 has ≥3 worked examples | PASS — hydrogen Gaussian, linear variational, harmonic oscillator |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P01 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-VAR-EXACT |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/apply-MC/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-3 MC-VAR-ANY-STATE, MP-5 MC-VAR-EXACT |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — E_trial < E₀ trigger, excited-state misuse |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |

# Teaching Blueprint — phys.stat.ising-model

## C0 — Concept Metadata
```
concept_id        : phys.stat.ising-model
display_name      : Ising Model
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 10
prerequisites     : [phys.stat.phase-transitions, phys.stat.fluctuations-correlations]
cross_links       : [phys.stat.phase-transitions-critical-phenomena, phys.stat.monte-carlo-basics]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The Ising model is the canonical exactly-solvable model of interacting spins on a lattice, demonstrating spontaneous symmetry breaking, a finite-temperature phase transition in 2D, and the failure of mean-field theory below the upper critical dimension.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-IS-1D-ORDERS | "The 1D Ising model has a ferromagnetic phase transition at finite T." | "In 1D there must be an ordered phase." | The 1D Ising model has NO finite-temperature phase transition — the Peierls argument shows domain walls cost only finite energy (2J per wall) but gain entropy kT ln(N), so T>0 always destroys long-range order. Only in 2D+ does the energy cost of a domain wall grow with system size, allowing a true ordered phase. |
| MC-IS-MF-ACCURATE-ANY-D | "Mean-field theory gives the correct critical temperature T_c even if exponents are wrong." | "T_c MF is approximately right even in 2D." | In 2D Ising, T_c(MF) = 2zJ/k (z=4 for square lattice) = 8J/k, but exact T_c (Onsager) = 2J/(k ln(1+√2)) ≈ 2.27J/k — MF overestimates by 77%. Fluctuations that lower T_c are exactly those ignored by MF; the error is systematic, not small. |

---

## C3 — Worked Examples

### Example 1 — Ising Hamiltonian and partition function setup
H = −J Σ_{⟨ij⟩} sᵢsⱼ − h Σᵢ sᵢ (sᵢ=±1; sum over nearest-neighbor pairs).
J > 0: ferromagnetic coupling; h: external field.
1D chain (N spins, periodic boundary): Z = 2^N [cosh(βh) + √(sinh²(βh) + e^{−4βJ})]^N.
At h=0: Z = (2cosh(βJ))^N + (2sinh(βJ))^N → dominant term at large N.
No phase transition in 1D: correlation length ξ = 1/ln(coth(βJ)) → finite for all T>0.

### Example 2 — 2D Ising: Onsager's exact result
Onsager (1944) exact solution for 2D square lattice (h=0):
T_c: sinh(2J/kT_c) = 1 → kT_c = 2J/ln(1+√2) ≈ 2.269J.
Magnetization (Onsager-Yang): m(T) = [1 − sinh^{−4}(2βJ)]^{1/8} for T < T_c.
Critical exponent: m ~ (T_c−T)^{1/8} → β_exact = 1/8 ≠ 1/2 (MF).
Heat capacity: C_V diverges logarithmically at T_c (α=0 logarithmic, NOT power law).
Significance: first exactly-solved model with a nontrivial phase transition; confirmed universality.

### Example 3 — Mean-field approximation for the Ising model
Replace Σ_{j∈nn} sⱼ → z⟨s⟩ = zm (z = coordination number, m = ⟨s⟩).
Effective single-site problem: m = tanh(β(Jzm + h)).
Self-consistency: at h=0, m = tanh(βJzm) → nontrivial m≠0 solution for βJz > 1 → T_c^{MF} = zJ/k.
For square lattice z=4: T_c^{MF} = 4J/k ≈ 4J/k vs exact 2.27J/k — overestimate by ~76%.
Lesson: mean-field overestimates T_c because it ignores fluctuations that disorder the system.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "The Ising model is the hydrogen atom of statistical mechanics — simple enough to solve exactly in 2D, rich enough to display phase transitions, universality, critical phenomena, and spontaneous symmetry breaking. Every technique we use for more complex models was first tested on the Ising model." |
| TA-2 | P06 | Build notation | Hamiltonian H = −JΣsᵢsⱼ − hΣsᵢ; coordination number z; mean-field approximation; order parameter m = ⟨s⟩; spontaneous symmetry breaking: H symmetric under sᵢ→−sᵢ but ground state breaks this at T<T_c |
| TA-3 | P07 | Formula derivation | Mean-field self-consistency: m=tanh(β(zJm+h)); at h=0, graphical solution: intersection of y=m and y=tanh(βzJm); one intersection (m=0) for T>T_c, three for T<T_c; T_c^{MF}=zJ/k |
| TA-4 | P08 | Diagnostic probe | MC-IS-1D-ORDERS: "Why is there no phase transition in 1D Ising at T>0?" Students apply Peierls argument: domain wall costs 2J but flipping a block of N spins costs 2J total and gains entropy ~ kT ln(N). Entropy always wins for large N at any T>0. |
| TA-5 | P13 | Worked example | Example 2: Onsager exact result — state T_c, m ~ (T_c−T)^{1/8}, compare to MF; explain why β=1/8 requires exact solution or renormalization group (fluctuations essential). |
| TA-6 | P10 | Pattern drill | Self-consistency drill: plot f(m)=tanh(βzJm) vs m for T>T_c, T=T_c, T<T_c; identify intersections; find m* from intersection; connect to order parameter emergence. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): Write the Ising Hamiltonian for a ferromagnet in an external field h. What is the coordination number z for a 2D square lattice?  
*Answer*: H = −JΣ_{⟨ij⟩}sᵢsⱼ − hΣᵢsᵢ; z=4 for 2D square lattice (each site has 4 nearest neighbors).

**MP-2** (apply): From the mean-field equation m=tanh(βzJm), find T_c for a 2D triangular lattice (z=6). Compare to exact T_c (known: kT_c ≈ 3.64J for triangular lattice).  
*Answer*: T_c^{MF} = zJ/k = 6J/k; exact ≈ 3.64J/k; MF overestimates by ~65%.

**MP-3** (analyze): Explain why the 1D Ising model has no ferromagnetic phase transition using the Peierls domain wall argument.  
*Answer*: A domain wall between + and − regions costs energy 2J (one broken bond). For a chain of N spins, there are N possible positions for the wall → entropy gain kT ln(N). Free energy change: ΔF = 2J − kT ln(N) < 0 for large N at any T>0. Domain walls proliferate at finite T → no long-range order. In 2D, a domain wall spanning the system costs energy ~ L (perimeter), overwhelming entropy ~ L²; ordered phase survives.

**MP-4** (analyze): The exact 2D Ising exponents (β=1/8, γ=7/4, ν=1) satisfy the scaling law 2−α=dν with α=0 (logarithmic divergence). Verify this relation.  
*Answer*: Hyperscaling: 2−α = dν with d=2, ν=1 → 2−α = 2 → α=0. This is consistent with C_V diverging logarithmically (α=0 in the notation where C_V ~ |t|^{−α}, with logarithm as the α→0 limit). Scaling relations are derived from renormalization group and are exact within a universality class.

**MP-5** (evaluate): A simulation of the 2D Ising model gives m ~ (T_c−T)^{0.12} near T_c, while theory predicts β=0.125 exactly. Is this a good confirmation?  
*Answer*: 0.12 is reasonably consistent with 0.125 (4% discrepancy), but evaluation requires: (1) confirming the fit is within the critical region (not crossover); (2) checking finite-size effects (finite system rounds the transition); (3) uncertainty estimate on the exponent fit. A proper finite-size scaling analysis using multiple system sizes L and collapse of data onto a scaling function m·L^{β/ν} vs (T−T_c)L^{1/ν} gives more confidence. The raw number alone is suggestive but not definitive.

---

## C6 — Known Sticking Points

1. **1D vs 2D phase behavior**: The absence of order in 1D (Mermin-Wagner-like argument) surprises students; emphasize the dimension-dependence of domain wall entropy vs energy.
2. **Spontaneous symmetry breaking**: At h=0 below T_c, both +m and −m are solutions; the system "chooses" one in the thermodynamic limit. In finite systems with periodic boundaries, ⟨s⟩=0 (fluctuations restore symmetry); must take L→∞ before h→0.
3. **Exact vs mean-field T_c**: 2D Ising exact T_c ≈ 2.27J/k; MF gives 4J/k. This factor-of-2 difference is not "small" — emphasize that MF is qualitatively correct but quantitatively wrong for d<4.
4. **Onsager's solution complexity**: The full Onsager solution is beyond this course; cite the result authoritatively and focus on the physics (spontaneous symmetry breaking, exact exponents, comparison to MF).

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student expects 1D Ising to order at low T | Apply Peierls argument from MC-IS-1D-ORDERS; ask "how many ways to place one domain wall in a 1D chain?" → ln(N) entropy; ΔF = 2J − kT ln(N) → student computes the crossover |
| Student thinks MF T_c is accurate | State exact values side-by-side (2D square: MF=4J/k, exact=2.27J/k; 3D cubic: MF=6J/k, exact≈4.51J/k); point out systematic overestimate |
| Student confused about spontaneous symmetry breaking | "At T<T_c with h=0, both ±m are equally valid solutions. The system picks one in the limit L→∞. For a finite system, ⟨m⟩=0 always — SSB is a thermodynamic limit phenomenon." |
| Student asks about 3D Ising exponents | "3D Ising: β≈0.326, γ≈1.237, ν≈0.630 — different universality class from 2D; no exact solution exists, best values from conformal bootstrap + Monte Carlo. MF exponents exact only for d≥4." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "Write the Landau free energy for a ferromagnet. What is the order parameter?"
CORE-1 (15 min): TA-1 + TA-2 (hydrogen atom analogy + Ising Hamiltonian notation)
CORE-2 (20 min): TA-3 + TA-4 (mean-field self-consistency + MC 1D Peierls argument)
CORE-3 (20 min): TA-5 (Onsager exact 2D result: T_c, β=1/8, compare to MF)
DRILL  (10 min): TA-6 (graphical self-consistency: tanh vs m at three temperatures)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Critical phenomena — the behavior precisely at T_c — and the renormalization group that explains universality and exact exponents: next two sessions."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.ising-model in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.phase-transitions, phys.stat.fluctuations-correlations verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (Peierls argument, universality classes, finite-size scaling) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-IS-1D-ORDERS, MC-IS-MF-ACCURATE-ANY-D |
| V-8  | C3 has ≥3 worked examples | PASS — 1D Z, Onsager 2D, mean-field self-consistency |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-IS-1D-ORDERS |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-3 MC-IS-1D-ORDERS; MP-2 MC-IS-MF-ACCURATE-ANY-D |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — 1D ordering trigger, MF accuracy trigger |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |

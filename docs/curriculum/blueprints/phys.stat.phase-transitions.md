# Teaching Blueprint — phys.stat.phase-transitions

## C0 — Concept Metadata
```
concept_id        : phys.stat.phase-transitions
display_name      : Phase Transitions (Landau Mean-Field)
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 10
prerequisites     : [phys.stat.free-energy]
cross_links       : [phys.stat.ising-model, phys.stat.fluctuations-correlations, phys.stat.chemical-potential]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Phase transitions are classified by the continuity of the free energy and its derivatives; Landau theory constructs the free energy as a polynomial in the order parameter to predict transition type, critical temperature, and mean-field critical exponents.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-PT-FIRST-SECOND-TERMINOLOGY | "Second-order transition means the phase transition happens twice." | "Why is it 'second order'?" | The Ehrenfest classification: first-order = first derivative of G discontinuous (latent heat, density jump); second-order (continuous) = first derivatives continuous but second derivatives (C_P, κ_T, χ) diverge. "Second order" refers to which derivative is discontinuous, NOT how many times the transition occurs. |
| MC-PT-MF-EXACT | "Mean-field theory gives the exact critical exponents." | "β=1/2 is the exact critical exponent for magnetization." | Mean-field exponents (β=1/2, γ=1, ν=1/2, η=0) are exact only above the upper critical dimension d_c (d_c=4 for Ising). Below d_c, fluctuations (ignored by mean field) change the exponents — the Ising model in 2D has β=1/8, not 1/2. |

---

## C3 — Worked Examples

### Example 1 — Ehrenfest classification
First-order transition (ice→water at 0°C, 1 atm): ΔS = L/T ≠ 0 (latent heat); ΔV = V_liquid − V_ice ≠ 0; G continuous but ∂G/∂T=−S discontinuous.
Second-order transition (paramagnet→ferromagnet at T_c): ⟨M⟩ continuous (→0 as T→T_c); χ=∂⟨M⟩/∂H diverges; C_V diverges; no latent heat.
Lambda transition (superfluid He at T_λ): C_V has logarithmic divergence (not a true discontinuity); technically continuous, but stronger than 2nd-order — example of a universality class distinct from Ising.

### Example 2 — Landau free energy expansion
Order parameter φ (e.g. magnetization m); symmetry φ→−φ restricts to even powers:
F(φ,T) = a(T)φ² + bφ⁴ + ... (b > 0 for stability).
Near T_c: a(T) = a₀(T−T_c) (linear in T−T_c, changes sign at T_c).
For T > T_c: a > 0, minimum at φ=0 (disordered phase).
For T < T_c: a < 0, minima at φ = ±√(−a/2b) = ±√(a₀(T_c−T)/2b).
Mean-field exponent: m ~ (T_c−T)^{1/2} → β_MF = 1/2.
With external field H: F = a(T)φ² + bφ⁴ − Hφ → saddle point → m ~ H^{1/3} at T=T_c → δ_MF = 3.

### Example 3 — Susceptibility divergence
χ = ∂m/∂H|_{H=0}: from saddle point aφ=−Hφ… minimization with H→ ∂²F/∂φ²|_{φ=φ_min}=2a+12bφ².
T > T_c: φ₀=0 → χ = 1/(2a) = 1/(2a₀(T−T_c)) ~ (T−T_c)^{−1} → γ_MF = 1.
T < T_c: φ₀²=−a/(2b) → χ = 1/(−4a) = 1/(4a₀(T_c−T)) ~ (T_c−T)^{−1} → γ_MF = 1 (same exponent both sides, amplitude ratio 2:1).

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "Iron loses its magnetism at 770°C (Curie temperature) — a continuous phase transition. Ice melts at 0°C — a discontinuous transition. Both involve symmetry, order parameters, and free energy, but they're fundamentally different in how the order parameter vanishes." |
| TA-2 | P06 | Build notation | Order parameter φ; Ehrenfest classification (1st vs 2nd order via derivative discontinuities); Landau free energy F(φ,T) = aφ² + bφ⁴; coefficients a=a₀(T−T_c) (sign change at T_c), b > 0 (stability); symmetry constraints on polynomial |
| TA-3 | P07 | Formula derivation | Minimize F: ∂F/∂φ=0 → 2aφ+4bφ³=0 → φ=0 or φ²=−a/(2b); interpret both solutions; find T_c as the temperature where the secondary minimum appears; derive β=1/2 |
| TA-4 | P08 | Diagnostic probe | MC-PT-FIRST-SECOND-TERMINOLOGY: "Water freezing at 0°C — first or second order? How do you tell?" Students check for latent heat (yes → first order) and density jump (yes → first order) vs continuous order parameter (not applicable here). |
| TA-5 | P13 | Worked example | Example 3: derive χ divergence on both sides of T_c; show γ=1, amplitude ratio 2; compare to exact 2D Ising (γ=7/4). Discuss what fluctuations add. |
| TA-6 | P10 | Pattern drill | Given F=aφ²+bφ⁴+cφ⁶ (with b<0, c>0): find multiple minima; identify first-order transition (φ jumps discontinuously at T_c); contrast with b>0 (second-order). |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the Ehrenfest criterion distinguishing first- and second-order phase transitions. Give one example of each.  
*Answer*: First-order: first derivative of G (entropy S=−∂G/∂T, volume V=∂G/∂P) is discontinuous; latent heat, coexistence. Examples: water/ice, gas/liquid. Second-order: first derivatives continuous, second derivatives (C_P=−T∂²G/∂T², κ_T=−(1/V)∂²G/∂P²) diverge; no latent heat. Examples: ferromagnet at T_c, superconductor.

**MP-2** (apply): For F=a(T)m²+bm⁴ with a=a₀(T−T_c) and b>0, find the equilibrium magnetization m(T) below T_c and identify the critical exponent β.  
*Answer*: ∂F/∂m=0 → 2am+4bm³=0 → m²=−a/(2b)=a₀(T_c−T)/(2b). m=(a₀/2b)^{1/2}(T_c−T)^{1/2}. β=1/2 (mean-field).

**MP-3** (analyze): In the Landau expansion F=aφ²+bφ⁴, what role does the symmetry φ→−φ play? What happens if you add a φ³ term?  
*Answer*: Symmetry φ→−φ forces F to contain only even powers of φ (the Ising/magnet symmetry m→−m under H→−H). Adding a cubic term breaks this symmetry — the transition becomes first-order (asymmetric minima appear at different temperatures). This is a common mechanism for the mean-field crossover from 2nd to 1st order.

**MP-4** (analyze): Mean-field theory predicts β=1/2 for all ferromagnets, but experiments give β≈0.33 for 3D Ising-like magnets. Identify the source of this discrepancy.  
*Answer*: Mean-field ignores spatial fluctuations of the order parameter — it assumes every spin sees the same average field. Near T_c, fluctuations diverge (ξ→∞) and correlations between spins are long-range — mean-field becomes inaccurate. The Ginzburg criterion: mean-field works when system dimension d > d_c=4; for d=3, fluctuation corrections change β from 1/2 to ≈0.326.

**MP-5** (evaluate): A student fits m(T) data near T_c to a power law and extracts β=0.5. They conclude "mean-field theory is confirmed." Critically evaluate this conclusion.  
*Answer*: Insufficient — β=0.5 is consistent with mean-field but could also arise from incorrect T_c estimate, insufficient resolution near T_c, or fitting over a range too far from T_c where crossover behavior dominates. A proper critical exponent requires fitting only within the critical region (|T−T_c|/T_c ≪ 1) and confirming multiple exponents satisfy scaling relations (α+2β+γ=2, dν=2−α). Single exponent fitting without this is inconclusive.

---

## C6 — Known Sticking Points

1. **Ehrenfest vs modern classification**: Modern terminology says "discontinuous" (first-order) and "continuous" (second-order/critical), emphasizing the order parameter behavior rather than derivatives.
2. **b > 0 stability requirement**: Without this, F has no lower bound — remind students this is a necessary constraint on the Landau expansion; if b < 0, must include φ⁶ term.
3. **Critical exponents vs power law fits**: Critical exponents are asymptotic results valid only near T_c; naive power law fits over extended temperature ranges can give wrong exponents.
4. **Why do exponents differ from mean-field?**: Fluctuations — Ginzburg criterion gives the crossover scale; below d_c, fluctuations are relevant (renormalization group explains why).

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student asks "what is the order parameter for water-ice transition?" | "Density difference ρ_liquid − ρ_ice; or alternatively, crystal structure (crystalline vs amorphous). Order parameter must vanish in the disordered phase and be nonzero in ordered phase." |
| Student confused by the sign change in a(T) | "a₀>0 is a material constant; a=a₀(T−T_c) is positive above T_c (stable φ=0) and negative below T_c (unstable at φ=0, stable at φ≠0). This is the whole mechanism of the transition." |
| Student says "fluctuations are always small" | Invoke MC-PT-MF-EXACT; Ginzburg criterion gives explicit condition when fluctuations matter; near T_c: ALWAYS relevant in d<4. |
| Student asks what happens when b<0 | "The fourth-order term destabilizes the expansion; must include φ⁶ (with positive coefficient). This gives a first-order transition — the discontinuous jump in φ at T_c is built into the polynomial structure." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "Draw G(T) for two phases at a first-order transition. What is special at the transition temperature?"
CORE-1 (15 min): TA-1 + TA-2 (iron/ice motivation + Ehrenfest + order parameter notation)
CORE-2 (20 min): TA-3 + TA-4 (Landau minimization → β=1/2 + MC Ehrenfest classification)
CORE-3 (20 min): TA-5 (susceptibility divergence derivation, comparison to 2D Ising exact exponents)
DRILL  (10 min): TA-6 (b<0 + φ⁶ → first-order; identify minimum structure from F)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "The Ising model makes mean-field predictions concrete and solvable in low dimensions — next session derives exact results."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.phase-transitions in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.free-energy verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (Ginzburg criterion, exponent discrepancy, scaling relations) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-PT-FIRST-SECOND-TERMINOLOGY, MC-PT-MF-EXACT |
| V-8  | C3 has ≥3 worked examples | PASS — Ehrenfest examples, Landau minimization, susceptibility |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-PT-FIRST-SECOND-TERMINOLOGY |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-4 MC-PT-MF-EXACT; TA-4/MP-1 MC-PT-FIRST-SECOND-TERMINOLOGY |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — fluctuations relevant trigger, b<0 instability |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |

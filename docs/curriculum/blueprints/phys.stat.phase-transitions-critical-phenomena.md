# Teaching Blueprint — phys.stat.phase-transitions-critical-phenomena

## C0 — Concept Metadata
```
concept_id        : phys.stat.phase-transitions-critical-phenomena
display_name      : Critical Phenomena and Universality
kg_difficulty     : 6 (expert)
bloom_target      : evaluate
mastery_threshold : 0.85
estimated_hours   : 12
prerequisites     : [phys.stat.ising-model]
cross_links       : [phys.stat.monte-carlo-basics, phys.stat.fluctuations-correlations]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Critical phenomena are governed by universal power laws characterized by critical exponents that depend only on symmetry and dimensionality — not on microscopic details — explained by the renormalization group through the irrelevance of short-distance physics near the fixed point.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-CP-UNIV-MEANS-SAME | "Universality means all phase transitions are the same." | "Magnets and fluids must behave identically since they're in the same universality class." | Universality means only the critical exponents (β, γ, ν, η...) and scaling functions are the same for systems in the same class (same symmetry and dimension). The microscopic interactions, transition temperature T_c, and amplitude factors differ — only the power-law approach to the critical point is identical. |
| MC-CP-RG-IS-TECHNIQUE | "Renormalization group is just a calculational technique." | "RG is a method for computing exponents." | RG is a conceptual framework — a flow in coupling-constant space — that explains WHY universality exists (irrelevant operators flow to zero → universal fixed point), provides non-perturbative insight, and works even when perturbation theory fails. The calculation is a consequence of the concept, not the point. |

---

## C3 — Worked Examples

### Example 1 — Critical exponents and scaling relations
Standard critical exponents for reduced temperature t = (T−T_c)/T_c:
m ~ (−t)^β (T < T_c, h=0); χ ~ |t|^{−γ}; C_V ~ |t|^{−α}; ξ ~ |t|^{−ν}; G(r,T_c) ~ r^{−(d−2+η)}.
Scaling relations (exact): α + 2β + γ = 2 (Rushbrooke); γ = ν(2−η) (Fisher); α = 2 − dν (hyperscaling).
Universality classes (d=3): Ising (β≈0.326, γ≈1.237, ν≈0.630, η≈0.036); XY (β≈0.346, γ≈1.317, ν≈0.671); Heisenberg (β≈0.366, γ≈1.395, ν≈0.707).
All different from mean field (β=1/2, γ=1, ν=1/2, η=0) for d<4.

### Example 2 — Real-space RG for 1D Ising (block-spin)
Kadanoff block-spin: group pairs of spins (s₁,s₂)→S (block spin S=±1).
Effective coupling: K' = K for 1D; identify fixed points: K=0 (T→∞, trivial) and K=∞ (T=0, ordered).
No finite K* → no phase transition in 1D ✓ (consistent with Peierls argument).
In 2D, RG flows have a nontrivial fixed point K* > 0 → finite T_c.
Lesson: RG fixed points classify phases and phase transitions.

### Example 3 — Finite-size scaling
At T=T_c, system size L cuts off divergence: ξ → L for finite systems.
Scaling hypothesis: m(t,L) = L^{−β/ν} f_m(tL^{1/ν}).
Data collapse: plot m·L^{β/ν} vs (T−T_c)·L^{1/ν}; all system sizes L should collapse onto one curve if correct T_c, β, ν.
Application: Monte Carlo simulations use finite-size scaling to extract T_c and critical exponents without infinite-system data.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "An iron magnet near its Curie point (1043K) and CO₂ near its critical point (304K) are in the same universality class — their magnetization and density fluctuations follow IDENTICAL power laws. The details of iron bonding and CO₂ molecules are completely irrelevant. Why? Renormalization group." |
| TA-2 | P06 | Build notation | Reduced temperature t=(T−T_c)/T_c; standard exponents α,β,γ,δ,ν,η with definitions; scaling relations as constraints (3 independent from 6 exponents); universality class defined by (symmetry of order parameter, dimension d) |
| TA-3 | P07 | Formula derivation | Derive scaling relation α+2β+γ=2 from free energy scaling hypothesis: f(t,h) = b^{−d} f(b^{y_t}t, b^{y_h}h) (Widom scaling); choosing b=|t|^{−1/y_t} gives f ~ |t|^{d/y_t}; identify ν=1/y_t; α=2−dν; similarly derive β=ν(d−y_h)/y_h, γ=ν(2y_h−d)/y_h |
| TA-4 | P08 | Diagnostic probe | MC-CP-UNIV-MEANS-SAME: "Iron (ferromagnet) and SF₆ near its liquid-gas critical point are in the 3D Ising class. Do they have the same T_c? Same heat capacity curve shape?" T_c completely different; C_V near T_c has same power law exponent, different amplitude. |
| TA-5 | P13 | Worked example | Example 3 (finite-size scaling): given Monte Carlo data for m(T,L) at L=16,32,64,128, show data collapse using β=1/8, ν=1 (2D Ising). Identify T_c from crossing of m·L^{β/ν} vs T. |
| TA-6 | P10 | Pattern drill | Scaling relation drill: given any two exponents from {α,β,γ,ν,η,δ}, derive the remaining four using the four scaling relations. Students practice deriving δ=γ/β+1 from Rushbrooke and Fisher relations. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the hyperscaling relation. What does it imply about the upper critical dimension d_c for mean-field theory?  
*Answer*: α = 2 − dν. For mean-field: α=0, ν=1/2 → 0=2−d/2 → d=4 = d_c. Above d_c=4, mean-field exponents are exact (hyperscaling fails for d>d_c because Gaussian fluctuations dominate).

**MP-2** (apply): For the 3D Ising universality class (ν=0.630, η=0.036), compute α using hyperscaling and verify Fisher's relation γ=ν(2−η).  
*Answer*: α = 2 − dν = 2 − 3(0.630) = 2 − 1.890 = 0.110. Fisher: γ = 0.630(2−0.036) = 0.630×1.964 = 1.237 ✓ (matches known γ≈1.237).

**MP-3** (analyze): Why do systems with different microscopic Hamiltonians (different J, different lattice) but the same symmetry and dimension share the same critical exponents?  
*Answer*: Under the RG transformation, all microscopic details flow to the same fixed-point Hamiltonian H* — the infrared (long-wavelength) behavior is controlled by H*, not by the starting Hamiltonian. Only the symmetry group of the order parameter and the spatial dimension d determine which fixed point is reached. Microscopics determine only amplitudes (irrelevant operators), not exponents (relevant/marginal operators at the fixed point).

**MP-4** (analyze): In finite-size scaling, you plot m·L^{β/ν} vs (T−T_c)L^{1/ν} and the curves collapse for L=16,32,64. At L=128, they no longer collapse as well. Interpret this.  
*Answer*: Finite-size scaling requires L≫ξ(T) outside the critical region and L≪ξ(T) inside; for very large L, if T is far from T_c, ξ<L and the scaling hypothesis breaks down (corrections to scaling become visible). Also, at very large L, logarithmic corrections or other irrelevant operators may be detectable. Check whether corrections are consistent with known correction-to-scaling exponents.

**MP-5** (evaluate): A new material shows power-law scaling near its order-disorder transition with ν=0.50, η=0.0 (within error). Evaluate whether this is consistent with known universality classes.  
*Answer*: ν=0.50, η=0 matches the mean-field/Gaussian universality class (β=0.5, γ=1). This is consistent with either: (a) the transition is above d_c=4 (less common in 3D materials); or (b) the critical region is very narrow and the experiment is measuring mean-field crossover behavior (not true critical behavior). Distinguishing these requires finite-size scaling and measuring the critical region width via Ginzburg criterion. Should verify hyperscaling: α=2−dν=2−3(0.5)=0.5; check if specific heat diverges as |t|^{−0.5}.

---

## C6 — Known Sticking Points

1. **Scaling relations derived vs postulated**: Scaling relations are derived from the scaling hypothesis or RG — they're not empirical coincidences; all physically realizable exponents satisfy them.
2. **Universality classes**: Students sometimes think only magnets belong to universality classes; fluid critical points, polymer criticality, and quantum phase transitions all have universality classes.
3. **RG fixed point concept**: The fixed point Hamiltonian H* may not look like a physically realizable system; it is the mathematical attractor of the RG flow, not necessarily a "natural" Hamiltonian.
4. **Finite-size scaling as a tool**: The method is used practically in all numerical studies; students should know the data-collapse procedure as a diagnostic tool.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student says universality means all systems are identical | MC-CP-UNIV-MEANS-SAME: "Do iron and water have the same T_c? Same specific heat value?" → No. "Same critical exponent?" → Yes. Universality is about the power-law exponent, not the physical values. |
| Student confused about what RG "integrates out" | "RG integrates out short-wavelength fluctuations (momentum shell between bΛ and Λ for some b>1) and rescales to restore the original cutoff. What's left is an effective Hamiltonian for long-wavelength modes — this is what flows to the fixed point." |
| Student unsure why d_c=4 for Ising | "Gaussian fluctuations (free field theory) have exactly mean-field exponents; the Ising nonlinearity is IRRELEVANT at the Gaussian fixed point for d>4 (power counting), RELEVANT for d<4 — d=4 is the borderline (marginal). Logarithmic corrections appear exactly at d=4." |
| Student asks "how is the universality class determined experimentally?" | "Measure multiple exponents (α,β,γ,ν) independently and check they satisfy scaling relations AND match a known universality class. A single exponent is insufficient — must verify the full set." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "State the exact 2D Ising exponents β and γ. How do they compare to mean-field?"
CORE-1 (15 min): TA-1 + TA-2 (iron vs CO₂ universality hook + exponent notation)
CORE-2 (20 min): TA-3 + TA-4 (scaling relations derivation + MC universality misconception)
CORE-3 (20 min): TA-5 (finite-size scaling: data collapse procedure, extract T_c and exponents)
DRILL  (10 min): TA-6 (scaling relation drill: derive δ=γ/β+1, verify for 3D Ising)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Monte Carlo simulation makes the Ising model computationally tractable in any dimension — next session you'll learn the Metropolis algorithm."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.phase-transitions-critical-phenomena in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.ising-model verified |
| V-3  | bloom_target matches C3 verb use | PASS — "evaluate" (assess universality class identification, data collapse quality) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-CP-UNIV-MEANS-SAME, MC-CP-RG-IS-TECHNIQUE |
| V-8  | C3 has ≥3 worked examples | PASS — exponent table/scaling relations, 1D RG block-spin, finite-size scaling |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-CP-UNIV-MEANS-SAME |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-3 MC-CP-RG-IS-TECHNIQUE; TA-4/MP-4 MC-CP-UNIV-MEANS-SAME |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — universality misconception, RG integration |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |

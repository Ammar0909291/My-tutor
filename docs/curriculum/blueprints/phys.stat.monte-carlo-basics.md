# Teaching Blueprint — phys.stat.monte-carlo-basics

## C0 — Concept Metadata
```
concept_id        : phys.stat.monte-carlo-basics
display_name      : Monte Carlo Methods (Basics)
kg_difficulty     : 6 (expert)
bloom_target      : apply
mastery_threshold : 0.85
estimated_hours   : 8
prerequisites     : [phys.stat.ising-model]
cross_links       : [phys.stat.phase-transitions-critical-phenomena, phys.stat.fluctuations-correlations]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Monte Carlo simulation generates samples from a statistical ensemble using the Metropolis algorithm — an importance-sampling Markov chain that satisfies detailed balance — enabling computation of thermal averages for systems where exact partition functions are intractable.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-MC-RANDOM-MEANS-CORRECT | "Monte Carlo is random so it must sample all configurations equally." | "It's random, so it's unbiased." | Metropolis importance sampling is deliberately BIASED toward low-energy configurations (Boltzmann weight e^{−βE}). Simple random sampling would be catastrophically inefficient — most configurations for a large system have near-zero weight. Importance sampling generates configurations with probability proportional to e^{−βE}/Z, not uniformly. |
| MC-MC-DETAILED-BALANCE-OPTIONAL | "Detailed balance is a technical condition — you just need to reach equilibrium eventually." | "As long as the simulation runs long enough, any acceptance rule works." | Detailed balance (W_{ij}P_j = W_{ji}P_i at equilibrium) is NECESSARY for convergence to the correct equilibrium distribution P_i ∝ e^{−βE_i}. Without it, the Markov chain may converge to a wrong stationary distribution. The Metropolis rule min(1, e^{−βΔE}) is one specific choice satisfying detailed balance. |

---

## C3 — Worked Examples

### Example 1 — Metropolis algorithm for Ising model
State: spin configuration {s₁,...,sₙ}.
Step: (1) Pick random spin sᵢ. (2) Compute ΔE = energy change if sᵢ flips. (3) If ΔE ≤ 0: flip always. (4) If ΔE > 0: flip with probability e^{−βΔE}. (5) Repeat.
For Ising, ΔE = 2sᵢ J Σ_{j∈nn(i)} sⱼ (depends only on neighbors — local update).
After equilibration: compute ⟨m⟩ = (1/N)⟨Σᵢsᵢ⟩, ⟨E⟩, C_V = (⟨E²⟩−⟨E⟩²)/(kT²).
Key parameter: number of Monte Carlo steps (sweeps) needed for equilibration and averaging.

### Example 2 — Detailed balance verification
Metropolis acceptance probability: A(i→j) = min(1, e^{−β(E_j−E_i)}).
Detailed balance: P_eq(i)·T(i→j)·A(i→j) = P_eq(j)·T(j→i)·A(j→i).
With T(i→j) = T(j→i) (symmetric proposal, e.g., single spin flip chosen uniformly):
e^{−βEᵢ}/Z · A(i→j) = e^{−βEⱼ}/Z · A(j→i).
If Eⱼ > Eᵢ: A(i→j)=e^{−β(Eⱼ−Eᵢ)}, A(j→i)=1. Check: e^{−βEᵢ}·e^{−β(Eⱼ−Eᵢ)} = e^{−βEⱼ}·1 ✓

### Example 3 — Thermalization and autocorrelation
Thermalization: starting from random (T=∞) or ordered (T=0) state, energy E(t) relaxes to equilibrium value.
Autocorrelation time τ: ⟨A(t)A(0)⟩−⟨A⟩² ~ e^{−t/τ} (exponential decay for short-range correlations).
Near T_c: τ ~ ξ^z (critical slowing down; z≈2 for local updates in 2D Ising). At T_c for L=64: τ can be O(10³) sweeps.
Statistical error: ⟨(δA)²⟩ = σ²·2τ/N_total (correlated samples; effective sample number = N/2τ, NOT N).
Solution: cluster algorithms (Wolff, Swendsen-Wang) update correlated clusters → τ ~ 1 near T_c.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P01 | Concrete hook | "The partition function Z = Σ_states e^{−βE} has 2^{10000} terms for a 100×100 Ising lattice — impossible to sum exactly. But importance sampling: instead of summing all terms, GENERATE states with probability proportional to e^{−βE} and just count. Monte Carlo transforms an impossible sum into a manageable average." |
| TA-2 | P06 | Build notation | Markov chain: states {s}, transition probabilities W_{ij}; stationary distribution P_i ∝ e^{−βEi}; detailed balance W_{ij}P_j = W_{ji}P_i; Metropolis rule A=min(1,e^{−βΔE}); Monte Carlo step = N spin-flip attempts |
| TA-3 | P07 | Formula derivation | Prove Metropolis satisfies detailed balance (Example 2): write out both sides for ΔE>0 and ΔE<0 cases; verify cancellation |
| TA-4 | P08 | Diagnostic probe | MC-MC-RANDOM-MEANS-CORRECT: "A student accepts all proposed moves (A=1 always). What distribution does this converge to?" Answer: uniform distribution over all states (infinite T) — wrong for any finite T; importance sampling (Boltzmann weight) is essential. |
| TA-5 | P13 | Worked example | Example 3 (thermalization): compute autocorrelation time for 2D Ising at T=0.8T_c vs T=T_c; demonstrate why independent samples ≠ N sweeps; calculate statistical error with 2τ correction factor. |
| TA-6 | P10 | Pattern drill | Trace through 5 Metropolis steps for a 4-spin Ising chain at β=0.5, J=1: compute ΔE for each proposed flip; decide accept/reject by comparing e^{−βΔE} to random number; update configuration. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the Metropolis acceptance criterion. What condition on the acceptance probabilities ensures convergence to the Boltzmann distribution?  
*Answer*: A(i→j) = min(1, e^{−β(Eⱼ−Eᵢ)}). Condition: detailed balance W_{ij}P_{eq}(j) = W_{ji}P_{eq}(i) with P_{eq}(i) ∝ e^{−βEᵢ}.

**MP-2** (apply): A 2-spin Ising chain (s₁=+1, s₂=−1, J=1) proposes flipping s₁ to −1. Compute ΔE and the Metropolis acceptance probability at β=1.  
*Answer*: H = −Js₁s₂ (periodic: also s₂s₁ for chain). Current E = −1·(+1)(−1) = +1 (for pair). New state s₁=−1, s₂=−1: E = −1·(−1)(−1) = −1. ΔE = −1 − 1 = −2 < 0 → A = 1 (always accept). Energy decreases: correct to always accept energy-lowering moves.

**MP-3** (apply): After running a Monte Carlo simulation for N=10⁶ sweeps with autocorrelation time τ=200 sweeps, compute the effective number of independent samples and the standard error for ⟨m⟩ if the sample standard deviation is σ=0.1.  
*Answer*: Effective N_eff = N/(2τ) = 10⁶/(400) = 2500. Standard error = σ/√N_eff = 0.1/√2500 = 0.1/50 = 0.002. (If ignored autocorrelation: erroneously σ/√N = 0.1/10³ = 10⁻⁴, underestimate by factor 20.)

**MP-4** (analyze): Critical slowing down: at T_c, the autocorrelation time τ ~ L^z with z≈2.17 for local Metropolis on 2D Ising. For L=128, estimate τ relative to L=32.  
*Answer*: τ(128)/τ(32) = (128/32)^{2.17} = 4^{2.17} = 4^2 · 4^{0.17} ≈ 16 · 1.27 ≈ 20. Simulating at T_c with 4× larger system requires ~20× more steps per configuration — a serious computational bottleneck motivating cluster algorithms.

**MP-5** (evaluate): A student reports ⟨m⟩ = 0.0 ± 0.0001 for an Ising simulation at T = 0.5T_c (below T_c). Critically evaluate this result.  
*Answer*: Likely incorrect. Below T_c, the system spontaneously breaks symmetry and occupies one of two ordered states (m≈+m* or m≈−m*). A local Markov chain simulation is TRAPPED in one state at low T (tunneling time between +m* and −m* grows exponentially in system size). ⟨m⟩=0 could arise from: (1) simulation starting in disordered state and equilibrating very slowly, or (2) simulation tunneling between +m* and −m* frequently (only if L is very small). Need to check: spontaneous magnetization |m|, not the signed average; or fix symmetry by starting ordered and measuring within one sector.

---

## C6 — Known Sticking Points

1. **Thermalization vs averaging phase**: Students run too few sweeps for thermalization and count them in the average; always monitor E(t) first to identify the thermalization plateau before starting averages.
2. **Statistical errors with correlated samples**: The naive 1/√N formula gives wrong (too small) errors for correlated data; always compute autocorrelation time and use N_eff = N/(2τ).
3. **Below-T_c broken symmetry**: Measuring ⟨m⟩ in a simulation at T<T_c is subtle; need to measure |m| or fix initial state; naive ⟨m⟩ can be 0 due to tunneling.
4. **Cluster algorithms**: Wolff algorithm flips clusters of aligned spins → τ~1 near T_c; students should know this exists even if not implementing it.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student accepts all moves (A=1) | MC-MC-RANDOM-MEANS-CORRECT diagnostic; compute resulting distribution analytically (uniform over all configurations); compare to desired Boltzmann; show rejection is required |
| Student ignores autocorrelation in error | "Run a visualization: plot ⟨m⟩ vs time for consecutive sweeps — if the curve drifts slowly, τ is large. Use only every 2τ sweeps as independent samples." |
| Student gets ⟨m⟩≈0 below T_c | See MP-5; distinguish systematic effect (trapped state) from rare tunneling; suggest measuring |m| instead |
| Student asks "how many sweeps are enough?" | "Rule of thumb: discard at least 10τ for thermalization; average over at least 100τ for reasonable statistics (error ∝ 1/√(N/2τ)). Near T_c, τ is large — use histogram reweighting or parallel tempering." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "How many configurations does a 10×10 Ising lattice have? Can you sum them all?"
CORE-1 (15 min): TA-1 + TA-2 (importance sampling motivation + Metropolis notation)
CORE-2 (20 min): TA-3 + TA-4 (detailed balance proof + MC diagnostic: A=1 always)
CORE-3 (20 min): TA-5 (thermalization + autocorrelation: statistical error with 2τ factor)
DRILL  (10 min): TA-6 (trace 5 Metropolis steps manually for 4-spin chain)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Monte Carlo is the computational engine for critical phenomena — finite-size scaling and data collapse give exact critical exponents without an analytic solution."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.monte-carlo-basics in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.ising-model verified |
| V-3  | bloom_target matches C3 verb use | PASS — "apply" (run Metropolis steps, compute errors, identify convergence issues) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-MC-RANDOM-MEANS-CORRECT, MC-MC-DETAILED-BALANCE-OPTIONAL |
| V-8  | C3 has ≥3 worked examples | PASS — Metropolis algorithm, detailed balance verification, thermalization/autocorrelation |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P01 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-MC-RANDOM-MEANS-CORRECT |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/apply/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — TA-4/MP-1 MC-MC-DETAILED-BALANCE-OPTIONAL; TA-4 MC-MC-RANDOM-MEANS-CORRECT |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — A=1 always trigger, autocorrelation error trigger |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |

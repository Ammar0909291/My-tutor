# Teaching Blueprint — phys.mech.hamilton-jacobi-equation

## C0 — Concept Metadata
```
concept_id        : phys.mech.hamilton-jacobi-equation
display_name      : Hamilton-Jacobi Equation
kg_difficulty     : 6 (expert)
bloom_target      : evaluate
mastery_threshold : 0.85
estimated_hours   : 10
prerequisites     : [phys.mech.canonical-transformations]
cross_links       : [phys.mech.hamiltons-equations, phys.qm.wkb-approximation]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The Hamilton-Jacobi equation converts the problem of solving Hamilton's equations into finding a single scalar function S(q,t) — Hamilton's principal function — such that all new momenta Pᵢ are constants of the motion.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-HJ-S-IS-ACTION | "S is just the action integral; I can compute it separately." | "I'll integrate L dt to get S." | S is the action only along actual trajectories; the HJ equation determines S(q,α,t) as a function of coordinates and constants of motion α, not as a number for a given path. S satisfies ∂S/∂t + H(q,∂S/∂q,t)=0 regardless of whether the trajectory is known. |
| MC-HJ-ALWAYS-SEPARABLE | "If there are multiple coordinates, you can always separate them." | "Just separate S = S₁(q₁)+S₂(q₂)." | Separability requires specific conditions: H must be separable in each coordinate; cyclic coordinates always separate; for others, separability is a property of the Hamiltonian, not guaranteed. Liouville-separability and Stäckel conditions define when full separation is possible. |

---

## C3 — Worked Examples

### Example 1 — Free particle (1D)
H = p²/2m; HJ equation: (1/2m)(∂S/∂x)² + ∂S/∂t = 0.
Try S(x,α,t) = αx − α²t/(2m) (α = constant momentum).
Check: ∂S/∂x = α, ∂S/∂t = −α²/(2m). Equation satisfied ✓
New coordinates: Q = ∂S/∂α = x − αt/m = x₀. Trajectory: x = αt/m + x₀ = pt/m + x₀. Recovers x = x₀ + vt ✓

### Example 2 — Harmonic oscillator (time-independent)
H = p²/2m + mω²q²/2 = E (const) → use W(q) (Hamilton's characteristic function).
HJ: (1/2m)(dW/dq)² + mω²q²/2 = E.
dW/dq = √(2mE − m²ω²q²); integrate → W(q,E) = ∫√(2mE − m²ω²q²) dq.
New momentum: P = E (a constant); Q = ∂W/∂E = ∫(m/√(2mE − m²ω²q²))dq = (1/ω)arcsin(qω√(m/2E)).
Invert: q(t) = √(2E/mω²) sin(ωQ) = A sin(ωt + φ). Exact solution recovered.

### Example 3 — Kepler problem (separation)
H = p_r²/(2m) + p_φ²/(2mr²) − k/r = E.
S = W_r(r,E,l) + lφ − Et (l = angular momentum constant).
Separation: (dW_r/dr)² = 2m(E + k/r) − l²/r² → orbit equation from Q_E = ∂S/∂E = const and Q_l = ∂S/∂l = const.
Recovers elliptical orbits (Kepler's first law) as a consequence of the HJ equation constants.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P01 | Concrete hook | "What if you could choose a canonical transformation so perfectly that K=0? Then all new Q,P are constants. The HJ equation is the condition that forces K=0." |
| TA-2 | P06 | Build notation | Define S(q,α,t) (principal function); state HJ equation ∂S/∂t + H(q,∂S/∂q,t)=0; distinguish S (time-dependent) from W (characteristic function, time-independent case when H=E) |
| TA-3 | P07 | Formula derivation | Derive HJ from F₂=S(q,P,t): K = H + ∂F₂/∂t = H(q,∂S/∂q,t) + ∂S/∂t = 0 (K=0 is the goal); new momenta Pᵢ=αᵢ are constants; new coordinates Qᵢ=∂S/∂αᵢ are linear in t for cyclic cases |
| TA-4 | P08 | Diagnostic probe | MC-HJ-ALWAYS-SEPARABLE: present H=(p₁²+p₂²)/(2m)+V(r) (central force, separable in spherical) vs H=(p₁²+p₂²)/(2m)+V(x₁+x₂) (coupled, not separable in x₁,x₂). Ask "which can use S=S₁+S₂?" |
| TA-5 | P13 | Worked example | Example 2 (harmonic oscillator): full derivation — HJ equation, W integral, recover q(t)=A sin(ωt+φ). |
| TA-6 | P10 | Pattern drill | Steps for time-independent HJ: (1) write H=E, (2) substitute p=dW/dq, (3) separate, (4) integrate, (5) Q=∂W/∂α=const gives trajectory. Students apply to free particle. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): Write the Hamilton-Jacobi equation for a system with Hamiltonian H(q,p,t). What is the condition on K that motivates it?  
*Answer*: ∂S/∂t + H(q,∂S/∂q,t) = 0; derived from F₂=S with the goal K=H+∂F₂/∂t=0.

**MP-2** (apply): For a free particle H=p²/2m, verify that S=px−p²t/(2m) satisfies the HJ equation.  
*Answer*: ∂S/∂t=−p²/(2m); ∂S/∂x=p; (1/2m)(∂S/∂x)²=p²/(2m). Sum=0 ✓

**MP-3** (analyze): In the time-independent HJ approach, what is Hamilton's characteristic function W and how does it relate to S?  
*Answer*: When H has no explicit t-dependence, separate S(q,α,t)=W(q,α)−Et; W satisfies H(q,∂W/∂q)=E; trajectories from Qᵢ=∂W/∂αᵢ=const (plus t appears only in Q_E=∂W/∂E−t=const).

**MP-4** (analyze): For the harmonic oscillator, the solution gives q=A sin(ωt+φ). Identify what plays the role of the two constants of integration in the HJ framework.  
*Answer*: Two constants α: α₁=E (energy, the separation constant) and α₂=φ (phase, from integrating Q=∂W/∂E=const+t); these replace the two initial conditions (q₀,p₀).

**MP-5** (evaluate): A student uses separation S=S_x(x)+S_y(y) for H=p_x²/(2m)+p_y²/(2m)+xy. Critique this approach.  
*Answer*: H has a coupling term xy that cannot be written as H_x(x,p_x)+H_y(y,p_y); therefore separation is invalid. S_x depends on the constant E_x but there is no way to assign a constant to x alone. The student needs a different approach (e.g., rotate to normal coordinates).

---

## C6 — Known Sticking Points

1. **S vs W distinction**: Students use S and W interchangeably; clarify: S includes −Et factor for time-independent systems; W is the spatial part only.
2. **K=0 motivation**: "Why force K=0?" — it makes new Q,P all constants, so equations of motion are trivially Q̇ᵢ=0, Ṗᵢ=0; the whole dynamics is encoded in S.
3. **Integration vs trajectory**: Students expect to get x(t) directly from the HJ equation; emphasize that Q=∂W/∂E=t+const gives the trajectory implicitly (invert for q(t)).
4. **Separation conditions**: Stäckel conditions are rarely taught explicitly; for this level, state: cyclic coordinates always separate; verify separability by checking whether H can be written as Σᵢ Hᵢ(qᵢ,pᵢ).

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student confuses S with the Lagrangian action integral | Use concrete check: "Evaluate S at a specific q,t — it gives a number that depends on the constant α, not just a number. It's a function of q AND the constants of motion." |
| Student gets partial derivatives correct but wrong Q expression | Verify they differentiated S with respect to αᵢ (the new momenta), not qᵢ |
| Student asks "when is the HJ method better than Hamilton's equations?" | "When the system is separable: for Kepler, 2D oscillator, with HJ you get the full orbit in one integral rather than solving 2N ODEs" |
| Student frustrated by implicit trajectory | Demonstrate with Example 1: Q=x−pt/m=x₀ → x=x₀+pt/m; the implicit equation inverts trivially here |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What canonical transformation has K=0 everywhere?" (connection to canonical transformations)
CORE-1 (15 min): TA-1 + TA-2 (K=0 motivation + notation)
CORE-2 (20 min): TA-3 + TA-4 (derivation + MC diagnostic)
CORE-3 (20 min): TA-5 (harmonic oscillator full derivation)
DRILL  (10 min): TA-6 (5-step procedure applied to free particle)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "The HJ equation bridges classical mechanics and quantum mechanics — in QM, S/ℏ becomes the phase of the wavefunction (WKB approximation, next subject)."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.mech.hamilton-jacobi-equation in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.mech.canonical-transformations verified |
| V-3  | bloom_target matches C3 verb use | PASS — "evaluate" (critique separation validity MP-5, evaluate approaches) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-HJ-S-IS-ACTION, MC-HJ-ALWAYS-SEPARABLE |
| V-8  | C3 has ≥3 worked examples | PASS — free particle, harmonic oscillator, Kepler |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P01 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-HJ-ALWAYS-SEPARABLE |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-4 (S vs W) covers MC-HJ-S-IS-ACTION; MP-5 covers MC-HJ-ALWAYS-SEPARABLE |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — S vs action trigger, implicit trajectory frustration |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |

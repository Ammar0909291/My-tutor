# Blueprint: math.de.chaos

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.chaos |
| name | Chaos Theory |
| Domain | math.de |
| Difficulty | research |
| Bloom level | analyze |
| Estimated hours | 10 |
| Mastery threshold | 0.60 |
| MAMR | 3/5 |
| Prerequisites | math.de.nonlinear-ode, math.de.bifurcation |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student analyses chaotic behaviour in deterministic dynamical systems: defines chaos via sensitive dependence on initial conditions (SDIC), topological transitivity, and dense periodic orbits (Devaney's definition); quantifies sensitivity using the maximal Lyapunov exponent λ₁ (λ₁ > 0 implies chaos); identifies strange attractors as bounded, fractal, non-periodic limit sets; analyses the Lorenz system and logistic map as canonical examples; traces the period-doubling route to chaos and the Feigenbaum constant δ ≈ 4.669; estimates the fractal (correlation) dimension of a strange attractor; and explains why chaos in 3D autonomous ODEs requires dimension ≥ 3 (Poincaré-Bendixson) and why Lyapunov exponents determine long-term predictability horizons.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw two plots side by side: (1) Lorenz attractor butterfly: a 3D trajectory spiralling around two lobes, never repeating, with label "Deterministic: z'=f(x,y,z), but unpredictable after ~1 Lyapunov time"; (2) Cobweb diagram for the logistic map xₙ₊₁=rx_n(1−x_n) at r=3.9: show the cobweb bouncing chaotically across [0,1] never settling; annotate: "SDIC: two initial conditions 0.500 vs. 0.501 diverge by ~0.5 after only 30 iterations — this is chaos")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CHAOS-MEANS-RANDOM | Student conflates chaos with randomness; says "chaotic systems are unpredictable so they must be random"; doesn't recognise that chaos arises from DETERMINISTIC rules and that each trajectory is uniquely determined by initial conditions — the unpredictability comes from exponential sensitivity to initial conditions, not from any stochastic process | Type 3 — language contamination ("chaos" in everyday English means disorder or randomness; students apply this colloquial meaning to the technical term, missing that mathematical chaos is deterministic — the same initial condition always gives the same trajectory; the system merely appears random because no finite measurement precision is sufficient for long-term prediction) |
| MC-2 | LYAPUNOV-EXPONENT-MEASURES-DIVERGENCE-SPEED | Student thinks λ₁ directly measures how fast two trajectories separate; interprets λ₁ = 1 as "trajectories double their distance every unit time"; misses that λ₁ = lim(t→∞) (1/t) ln(|δx(t)|/|δx(0)|) is an ASYMPTOTIC time-averaged rate, that the instantaneous rate fluctuates wildly along the attractor, and that the actual predictability horizon depends on both λ₁ AND the ratio of the system's scale to the measurement error | Type 5 — instruction-induced (λ₁ is often introduced with the formula |δx(t)| ≈ |δx(0)|eλ₁t and the claim "diverges exponentially," encouraging a constant-rate interpretation; but along a strange attractor the local expansion rate varies enormously — the trajectory alternates between expansion and compression in different directions, and only the AVERAGE over time is λ₁) |
| MC-3 | CHAOS-REQUIRES-LARGE-SYSTEMS | Student believes chaos only occurs in complex, high-dimensional systems (many particles, turbulence) and not in simple 3-variable or discrete-map systems; fails to recognise that the Lorenz system (3D ODE) and the logistic map (1D discrete) are both minimal systems exhibiting genuine chaos, and that dimension ≥ 3 is sufficient (not necessary to be "large") for continuous-time autonomous ODE chaos | Type 1 — overgeneralisation (chaos is popularly associated with weather (atmospheric models, millions of degrees of freedom) and other "complex" systems; students over-apply "large system → chaos" and its contrapositive "simple system → no chaos," not knowing that Lorenz specifically showed a 3-variable truncation of the Navier-Stokes equations already exhibits chaos) |

## Component 4 — Session TA Cap
**Cap = 12** (hrs = 10 → cap 12)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Sensitive dependence and Lyapunov exponents:**

**Devaney's definition of chaos:**
A continuous map f: X→X on a metric space is chaotic if:
1. **SDIC:** ∃δ>0 such that for every x and every ε>0, there exists y with d(x,y)<ε and n with d(fⁿ(x),fⁿ(y))>δ.
2. **Topological transitivity:** there exists a dense orbit (one trajectory that comes arbitrarily close to every point of X).
3. **Dense periodic orbits:** the periodic points are dense in X.
Properties 2+3 together imply SDIC for most practical systems (Banks et al., 1992).

**Lyapunov exponent (scalar map):**
For the 1D map xₙ₊₁=f(xₙ), the maximal Lyapunov exponent is:
λ = lim_{N→∞} (1/N) Σₙ₌₀^{N−1} ln|f'(xₙ)|.
If λ > 0: chaotic (nearby orbits diverge on average). If λ < 0: stable periodic orbit. If λ = 0: bifurcation boundary.

**Lyapunov exponent (ODE, n-dimensional):**
For x' = f(x) with variational equation δẋ = Df(x(t))δx, the n Lyapunov exponents {λ₁≥λ₂≥…≥λₙ} are defined as:
λᵢ = lim_{t→∞} (1/t) ln(|δxᵢ(t)|/|δxᵢ(0)|).
Maximal exponent λ₁ > 0 implies chaos. For a dissipative attractor: Σλᵢ < 0 (volume contracts in phase space). For a strange attractor in 3D: λ₁>0, λ₂=0 (along flow), λ₃<0 with |λ₃|>λ₁.

**Logistic map example:**
xₙ₊₁ = rxₙ(1−xₙ), r∈[0,4].
At r=3.9: λ ≈ 0.5 > 0 → chaotic.
Predictability horizon: if initial error |δx₀|=ε=10⁻⁶ and attractor scale L=1, the system becomes unpredictable when ε·eλt ≈ L → t_predict ≈ (1/λ)|ln(ε/L)| = (1/0.5)|ln(10⁻⁶)| ≈ 28 iterations.

**Poincaré-Bendixson constraint:**
In 2D autonomous ODE: trajectories are bounded → limit cycles or equilibria (no chaos). Chaos in continuous-time autonomous ODE requires dimension ≥ 3.

**P49 checkpoint:**
- CORRECT → "Chaos: SDIC + transitivity + dense periodic orbits. λ₁>0 quantifies sensitivity. Predictability horizon ≈ (1/λ₁)ln(L/ε). ODE chaos needs ≥3 dimensions." → A02
- PARTIAL (MC-1: chaos = random) → "Chaos is DETERMINISTIC — the same initial condition gives the IDENTICAL trajectory every time. The word 'unpredictable' means: given a measurement error ε at t=0, the error grows to size L (attractor scale) by time t≈(1/λ₁)ln(L/ε). At that point, the prediction is useless — but this is NOT randomness. Integrate the Lorenz system from x₀=(1,1,1): you get a specific, reproducible trajectory. Integrate from x₀=(1.001,1,1): initially almost identical, exponentially diverging later. Both are completely deterministic." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Tent map: f(x)=2x for x<1/2, f(x)=2(1−x) for x≥1/2. Lyapunov exponent: every point has |f'|=2, so λ=ln(2)≈0.693>0 → chaotic. SDIC: |δxₙ|=2ⁿ|δx₀| until δxₙ≈1 (attractor size). Predictability: if |δx₀|=10⁻³, horizon is n≈3/ln(2)≈4.3 iterations." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Lorenz system, period-doubling, and strange attractors:**

**Lorenz system:**
ẋ = σ(y−x),   ẏ = rx−y−xz,   ż = xy−bz.
Standard parameters: σ=10, b=8/3, r=28.
Equilibria: O=(0,0,0); C±=(±√(b(r−1)), ±√(b(r−1)), r−1) for r>1.
At r=28: all three equilibria are unstable (O is a saddle, C± are unstable foci). λ₁≈0.906>0 → chaos. Attractor dimension D_L≈2.06 (Kaplan-Yorke).

**Dissipation and volume contraction:**
∇·f = ∂ẋ/∂x + ∂ẏ/∂y + ∂ż/∂z = −σ−1−b = −(σ+b+1) = −41/3 < 0.
The phase-space volume V(t) = V(0)·exp(−(41/3)t) → 0. The Lorenz attractor has zero volume, yet is NOT a simple curve or surface — it is a fractal.

**Period-doubling route to chaos (logistic map):**
As r increases: r₁=3 (period-2), r₂≈3.449 (period-4), r₃≈3.544 (period-8), …, r_∞≈3.5699…
**Feigenbaum constant:** δ = lim_{n→∞} (rₙ−rₙ₋₁)/(rₙ₊₁−rₙ) ≈ 4.669201…
Universal: applies to any smooth unimodal map (not just logistic), quadratic maps in R², ODE systems — the period-doubling cascade has the SAME ratio δ regardless of the system. This universality was discovered by Feigenbaum (1978) using renormalization group theory.

**Fractal dimension:**
Correlation dimension D₂ estimated from the correlation integral C(r)∼r^{D₂} (Grassberger-Procaccia):
D₂ = lim_{r→0} ln C(r)/ln r.
For the Lorenz attractor: D₂ ≈ 2.06.
Kaplan-Yorke (Lyapunov) dimension: D_KY = j + (λ₁+…+λⱼ)/|λⱼ₊₁| where j is the largest index with Σᵢ₌₁ʲ λᵢ > 0.
For Lorenz at standard parameters: D_KY ≈ 2.06 (consistent with D₂).

**Strange attractor definition:**
A strange attractor is a bounded, invariant, fractal set toward which nearby trajectories converge and on which the dynamics is chaotic (λ₁>0). It has:
- Measure zero in phase space (zero volume for dissipative systems).
- Non-integer Hausdorff dimension.
- Sensitivity (λ₁>0) and recurrence (every orbit is dense or comes arbitrarily close to every point).

**P49 checkpoint:**
- CORRECT → "Lorenz: 3 unstable equilibria, λ₁≈0.906, D≈2.06, volume contracts at rate −41/3. Period-doubling: Feigenbaum δ≈4.669, universal. Strange attractor: fractal, zero volume, λ₁>0." → Gate (P91)
- PARTIAL (MC-2: Lyapunov exponent as instantaneous rate) → "λ₁ is a TIME AVERAGE — it is the AVERAGE rate of expansion over an infinitely long orbit on the attractor. Instantaneously, the separation may contract (locally stable direction) or expand (locally unstable). On the Lorenz attractor, trajectories sometimes spiral in toward one lobe (locally contracting) then shoot off toward the other (expanding). Only the time-average (and hence the LIMIT) gives the Lyapunov exponent. The phrase '|δx(t)|≈|δx(0)|eλ₁t' is therefore only valid on average over long times — NOT at each moment." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Rössler system: ẋ=−y−z, ẏ=x+ay, ż=b+z(x−c). Parameters a=0.2, b=0.2, c=5.7: λ₁≈0.071>0 → chaotic. Simpler attractor topology than Lorenz (one lobe vs. two). Kaplan-Yorke dimension ≈ 2.01. Shows that even simpler 3D systems with one unstable fixed point can be chaotic." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Determinism vs. predictability: 'deterministic' means rules uniquely determine future from present. 'Predictable' means you can compute future to desired accuracy given finite measurement. Chaos = deterministic + unpredictable. These are NOT contradictory: the rules are fixed, but measurement error ε₀ grows as ε₀eλ₁t, eventually exceeding the attractor's size. After t_predict≈(1/λ₁)ln(L/ε₀), the error is as large as the variation of the system — prediction is useless. The trajectory still EXISTS and is deterministic; you just can't KNOW it."
Step 2 — "Minimal chaotic systems: the Lorenz system has ONLY 3 variables (x,y,z) and 3 parameters (σ,r,b). The logistic map has 1 variable and 1 parameter. These are among the simplest systems in existence. Chaos does NOT require complexity — it requires: (1) nonlinearity (no chaos in linear systems), (2) sufficient dimension (≥3 for ODE, ≥1 for maps). A system with 10 billion variables but all linear has no chaos; a system with 3 variables and one quadratic term does."
Step 3 — "The weather connection: Lorenz discovered chaos by studying a 3-variable truncation of weather models in 1963. Weather is indeed chaotic — but the REASON is the mathematical structure (SDIC from nonlinearity), not the size of the system. Lorenz's insight: predictability has a fundamental MATHEMATICAL limit, not just a practical computational one."

**TB-R02 (MC-2 LYAPUNOV INTERPRETATION):**
Step 1 — "The formula λ₁=lim_{t→∞}(1/t)ln(|δx(t)|/|δx(0)|) involves a LIMIT. The '1/t' averages over all time. If you compute the same formula over a FINITE time window [0,T], you get a finite-time Lyapunov exponent (FTLE) that fluctuates — sometimes negative (locally converging), sometimes large positive (locally diverging). Only the infinite-time limit is the Lyapunov exponent."
Step 2 — "The predictability horizon uses the time-average: since on average |δx(t)|≈|δx(0)|eλ₁t, the time to reach attractor scale is t_predict≈(1/λ₁)ln(L/|δx(0)|). For Lorenz with λ₁≈0.906, L≈50 (attractor size), ε₀=10⁻⁸: t_predict≈(1/0.906)·18.4≈20 time units. For real weather: λ₁≈1/5 days⁻¹ gives a predictability horizon of about 2 weeks (consistent with empirical forecasting limits)."
Step 3 — "Engineering relevance: the predictability horizon is the KEY practical number. For a structural vibration problem with λ₁=0.1 s⁻¹ and measurement error ε₀=10⁻⁶ m, L=10⁻² m: t_predict=(1/0.1)·ln(10⁻²/10⁻⁶)=10·ln(10⁴)≈92 s. After 92 seconds, the state is completely unpredictable despite deterministic dynamics. This is why chaos forces engineers to think statistically about long-term behaviour — not because the physics is random, but because the amplification of uncertainty is exponential."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. For the logistic map xₙ₊₁=rxₙ(1−xₙ) at r=4: (a) show that the substitution xₙ=sin²(πθₙ/2) transforms this to θₙ₊₁=2θₙ (mod 1) (doubling map); (b) show that the doubling map has λ=ln(2); (c) conclude r=4 is chaotic and find the exact predictability horizon for initial error ε₀=10⁻¹⁰.
2. The Lorenz system with σ=10, b=8/3, r=28: (a) verify volume contracts at rate −(σ+b+1)=−41/3; (b) show C±=(±√(72),±√(72),27) are equilibria and compute their Jacobian; (c) find the eigenvalues of J at C+ and determine their stability.
3. Explain the Feigenbaum universality: why should the ratio (rₙ−rₙ₋₁)/(rₙ₊₁−rₙ)→δ for ANY smooth unimodal map? What does this say about the universality of the period-doubling route to chaos? (Conceptual; cite the renormalization group argument.)
4. For a 3D attractor with Lyapunov exponents λ₁=0.4, λ₂=0, λ₃=−1.8: (a) compute the Kaplan-Yorke dimension; (b) verify the attractor satisfies Σλᵢ<0 (dissipative); (c) determine whether the attractor has higher or lower fractal dimension than the Lorenz attractor at standard parameters.
5. Construct a cobweb diagram for the tent map f(x)=1−|2x−1| on [0,1] at 10 iterations starting from x₀=0.3 and x₀=0.300001. Estimate when the two orbits first diverge by more than 0.1, and verify this is consistent with λ=ln(2).

**P55 — Reflect & Consolidate:** "Chaos: deterministic + SDIC + λ₁>0. NOT random. Predictability horizon t_predict≈(1/λ₁)ln(L/ε₀). ODE chaos requires ≥3 dimensions. Lorenz: 3D, λ₁≈0.906, D≈2.06, volume contracts. Period-doubling: Feigenbaum δ≈4.669, universal. Strange attractor: fractal, zero volume, dense orbits. Kaplan-Yorke dimension: D_KY=j+(Σλᵢ)/|λⱼ₊₁|."

**P76 — Transfer Probe (Independence mode):**
(a) Symbolic dynamics: the horseshoe map (Smale) acts on a square by stretching, folding, and re-injecting. Its dynamics is isomorphic to the full shift on two symbols {0,1}: each trajectory is encoded as a bi-infinite sequence (…s₋₂s₋₁.s₀s₁s₂…) where sₙ∈{0,1}. The shift map σ: sₙ→sₙ₊₁ has topological entropy log 2 and satisfies all three of Devaney's conditions. Explain how this symbolic coding makes it rigorous that: (i) SDIC holds (two sequences differing in one symbol diverge after sufficient iterations); (ii) dense periodic orbits exist (periodic sequences are dense in the shift space); (iii) a dense orbit exists (a sequence containing all finite words). (b) Chaos in Hamiltonian systems: for a conservative (Hamiltonian) system, the Lyapunov exponents satisfy the symplectic pairing law: λᵢ + λₙ₊₁₋ᵢ = 0 for all i. This means a Hamiltonian system with a positive Lyapunov exponent must have an equal negative exponent, with Σλᵢ=0 (no dissipation). Explain how chaotic Hamiltonian systems (e.g., the double pendulum, N-body problem) differ from dissipative strange attractors — specifically: why there is no attractor, why phase-space volume is conserved, and what "Arnold diffusion" means for multi-dimensional integrable perturbations. (c) Control of chaos (OGY method): a chaotic attractor contains a dense set of unstable periodic orbits (UPOs). The Ott-Grebogi-Yorke (OGY) algorithm stabilises a chosen UPO by applying tiny parameter perturbations each time the trajectory passes near that orbit's Poincaré section. Explain mathematically how the linear stable/unstable manifold decomposition of the UPO's Poincaré map fixed point guides the perturbation direction, and why chaos control requires exponentially smaller effort than controlling a non-chaotic system to a comparable target.

**P75 — Mastery Assessment:**
"(a) The Hénon map: xₙ₊₁=1−axₙ²+yₙ, yₙ₊₁=bxₙ with a=1.4, b=0.3. (i) Show this map is invertible and compute the Jacobian determinant (which equals b throughout — volume contraction); (ii) show the fixed points satisfy x*=(−(1−b)±√((1−b)²+4a))/(2a); (iii) explain why, despite being a 2D map, the Hénon attractor can be chaotic (Poincaré-Bendixson applies only to continuous-time ODE, not to maps). (b) Compute the predictability horizon for two competing weather models: Model A has λ₁=0.2 day⁻¹, Model B has λ₁=0.35 day⁻¹. If both start with initial error ε₀=0.5% of the attractor scale, which model has longer predictability, by how many days? (c) A student argues: 'The Lorenz attractor must have integer dimension because it is the closure of a set of smooth trajectories.' Identify the flaw and explain why the Lorenz attractor has non-integer dimension ≈2.06. (d) Describe the period-doubling cascade for a smooth unimodal map (sketching the bifurcation diagram of the logistic map). Mark the accumulation point r_∞≈3.5699. Explain what happens for r>r_∞ and why the Feigenbaum constant δ≈4.669 is the same for any such map."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the Lyapunov exponent definition and the period-doubling/Feigenbaum universality
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.bifurcation or math.de.nonlinear-ode; reassign

**P78 — Completion:** Chaos Theory certified. Student defines chaos via Devaney's three conditions and relates them to positive Lyapunov exponents; computes predictability horizons; identifies the Lorenz system as a canonical chaotic ODE; explains the period-doubling route to chaos and Feigenbaum universality; estimates fractal/Kaplan-Yorke dimension; distinguishes chaotic deterministic dynamics from randomness; and recognises that chaos in autonomous ODEs requires dimension ≥ 3.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Symbolic dynamics and horseshoe coding; Hamiltonian chaos vs. dissipative strange attractors; OGY chaos control via Poincaré return map
Skill tested: Connect the elementary SDIC/Lyapunov-exponent framework to rigorous symbolic coding, conservative system theory, and engineered chaos exploitation

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

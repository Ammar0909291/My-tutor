# Blueprint: math.de.heat-equation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.heat-equation |
| name | The Heat Equation |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 7 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.de.separation-of-variables-pde, math.de.fourier-series |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student solves the initial-boundary value problem for the heat equation uₜ = k uₓₓ on [0,L] by separation of variables: assumes u(x,t)=X(x)T(t), derives the Sturm-Liouville problem X''+λX=0 with homogeneous BCs and the ODE T'+kλT=0, assembles the Fourier series solution u(x,t)=Σ bₙe^{−kλₙt}sin(nπx/L) (Dirichlet) or analogously with cosines (Neumann), determines the Fourier coefficients from the initial condition u(x,0)=f(x), and interprets the solution physically: the exponential decay factors e^{−k(nπ/L)²t} damp the higher harmonics faster, leading to an instantaneous smoothing effect and a long-time approach to the equilibrium or steady state.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a time-evolution plot of u(x,t) for the heat equation on [0,1] starting from u(x,0)=sin(πx)+sin(3πx)/3: at t=0, two modes; at small t, the second mode (n=3) decays 9× faster; at large t, only the n=1 mode survives; final state u→0 (Dirichlet). Annotate: "Higher harmonics decay faster — heat equation SMOOTHS"; show a second pair of plots for Neumann BC where the steady state is the average (a₀/2), not zero)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SEPARATION-GIVES-ONLY-ONE-SOLUTION | Student believes the separation u=X(x)T(t) directly gives the full solution; doesn't realise that each eigenvalue λₙ gives one separated solution uₙ=XₙTₙ and the full solution is the SUPERPOSITION u=Σcₙuₙ | Type 5 — instruction-induced (the separation step is presented as a procedure that "solves the PDE"; students perform the algebra correctly but stop after writing one separated solution, not realising that the ODE for X is an eigenvalue problem with infinitely many solutions, each giving a valid separated solution, and the IC requires their linear combination) |
| MC-2 | HEAT-EQUATION-SOLUTION-PROPAGATES | Student thinks the heat equation solution shows "heat waves" travelling from hot to cold, like a wave equation; doesn't understand that the heat equation smooths instantly — at any t>0, a localised hot spot becomes a Gaussian spread over the entire domain | Type 3 — language contamination ("heat flows" from physics (Fourier's law) is the qualitative picture; this language is misread as "heat travels" = wave propagation; the PDE analogy to a wave is triggered by the name "heat flow," not recognised as diffusion — instantaneous spreading with an infinite effective propagation speed) |
| MC-3 | DECAY-RATE-PROPORTIONAL-TO-N | Student believes the n-th mode decays at rate n (proportional) rather than n² (quadratic): the factor is e^{−k(nπ/L)²t}, so decay rate = k(nπ/L)² grows as n² | Type 5 — instruction-induced (the frequency eigenvalue λₙ=nπ/L grows linearly with n; students use this linear factor in the exponent rather than squaring it; the n² behaviour arises because the eigenvalue of −d²/dx² for sin(nπx/L) is (nπ/L)², which is n² times the fundamental decay rate) |

## Component 4 — Session TA Cap
**Cap = 9** (hrs = 7 → cap 9)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Separation of variables for the heat equation:**

**IBVP:** uₜ = k uₓₓ, 0<x<L, t>0; u(0,t)=u(L,t)=0 (Dirichlet); u(x,0)=f(x).

**Step 1 — Assume u=X(x)T(t):**
T'/T = k X''/X = −kλ (constant, since LHS depends only on t and RHS on x).
→ X'' + λX = 0, and T' + kλT = 0.

**Step 2 — Sturm-Liouville problem for X:**
X''+λX=0 with X(0)=X(L)=0.
Non-trivial solutions (eigenfunctions): λₙ=(nπ/L)², Xₙ(x)=sin(nπx/L), n=1,2,3,…

**Step 3 — Time ODE for Tₙ:**
Tₙ' + k(nπ/L)²Tₙ = 0 → Tₙ(t) = e^{−k(nπ/L)²t}.

**Step 4 — Superposition:**
u(x,t) = Σₙ₌₁^∞ bₙ sin(nπx/L) e^{−k(nπ/L)²t}.

**Step 5 — Apply IC:**
u(x,0) = Σbₙ sin(nπx/L) = f(x) → bₙ = (2/L)∫₀ᴸ f(x)sin(nπx/L)dx.

**Worked example — f(x)=sin(πx/L):**
b₁=1, bₙ=0 for n≥2.
u(x,t) = sin(πx/L)·e^{−k(π/L)²t}.
Physical interpretation: the temperature decays exponentially at rate k(π/L)² — higher L (longer bar) → slower decay.

**P49 checkpoint:**
- CORRECT → "u=XₙTₙ for each eigenvalue λₙ=(nπ/L)². Full solution: u=Σbₙsin(nπx/L)e^{−k(nπ/L)²t}. ICs give bₙ via FSS." → A02
- PARTIAL (MC-1: stopped after one separated solution) → "Each eigenvalue λₙ gives one separated solution sin(nπx/L)e^{−k(nπ/L)²t}. You need ALL of them. The initial condition f(x) is almost never equal to a single sine — you need to write f as a FOURIER SINE SERIES Σbₙsin(nπx/L) and match. The FULL solution is the superposition Σbₙsin(nπx/L)e^{−kλₙt}." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "uₜ=uₓₓ on [0,π], u(0,t)=u(π,t)=0, u(x,0)=3sin(2x). λₙ=n², Tₙ=e^{−n²t}. u(x,0)=Σbₙsin(nx); compare: b₂=3, all others 0. u(x,t)=3sin(2x)e^{−4t}." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Physical interpretation and extensions:**

**Exponential decay rates and smoothing:**
The n-th mode decays as e^{−k(nπ/L)²t}:
- n=1 (fundamental): slowest decay, rate k(π/L)².
- n=2: decays 4× faster than n=1.
- n=10: decays 100× faster than n=1.
**Smoothing**: at any t>0, all modes n≥N are negligibly small for large enough N — the solution is infinitely smooth for t>0 regardless of how rough f(x) is.

**Neumann BCs (insulated ends):**
uₓ(0,t)=uₓ(L,t)=0.
Eigenfunctions: cos(nπx/L), n=0,1,2,…; λ₀=0 (steady state = constant).
u(x,t) = a₀/2 + Σaₙcos(nπx/L)e^{−k(nπ/L)²t}.
As t→∞: u→a₀/2 = (1/L)∫₀ᴸf(x)dx (average temperature — conserved for insulated bar).

**Non-homogeneous BCs (steady-state technique):**
u(0,t)=T₁, u(L,t)=T₂ (constant, non-zero).
Decompose: u(x,t) = w(x) + v(x,t).
Steady state w(x): w''=0, w(0)=T₁, w(L)=T₂ → w(x)=T₁+(T₂−T₁)x/L.
Transient v=u−w satisfies: vₜ=kvₓₓ, v(0,t)=v(L,t)=0, v(x,0)=f(x)−w(x).
Solve v by the standard Dirichlet method above.

**P49 checkpoint:**
- CORRECT → "n-th mode decays as e^{−k(nπ/L)²t}: rate ∝ n². Neumann: cosines, a₀/2=average, conserved. Non-homogeneous BCs: split into steady-state + transient." → Gate (P91)
- PARTIAL (MC-3: decay ∝ n not n²) → "The decay factor for mode n is e^{−kλₙt} where λₙ=(nπ/L)². The eigenvalue λₙ is PROPORTIONAL TO n² — not n. So mode 2 decays e^{−4k(π/L)²t} (4 times faster than mode 1), mode 3 decays 9 times faster, mode n decays n² times faster. The n² is the square of n, arising because the eigenvalue of −d²/dx² for sin(nπx/L) equals (nπ/L)², not nπ/L." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "uₜ=uₓₓ, u(0,t)=1, u(1,t)=0, u(x,0)=x(1−x)+1−x. Steady state w: w''=0, w(0)=1, w(1)=0 → w=1−x. Transient v=u−w, v(x,0)=x(1−x). vₜ=vₓₓ, v(0)=v(1)=0. Solve: bₙ=(2)∫₀¹x(1−x)sin(nπx)dx. b₁=8/π³ (approx)." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "The superposition principle for linear PDEs: if u₁ and u₂ are solutions with zero IC and BC, then c₁u₁+c₂u₂ is also a solution. This means EVERY linear combination of separated solutions is a solution. We need infinitely many because the IC f(x) must be represented as a Fourier series — one sine won't do for a general f."
Step 2 — "Heat equation SMOOTHS, it does not propagate waves. Wave equation: finite propagation speed, a disturbance at x=0 takes time L/c to reach x=L. Heat equation: at any t>0, no matter how small, the entire bar is influenced by any local temperature change (infinite effective speed, but decreasing exponentially with distance). This is why the heat equation has the smoothing property."
Step 3 — "Time scale: the fundamental mode sin(πx/L) decays with time constant τ₁ = L²/(kπ²). After 3τ₁, the solution is within e^{−3} ≈ 5% of its final state. Higher modes (n≥2) decay at least 4× faster — they are negligible for t≥τ₁."

**TB-R02 (MC-3 DECAY-RATE-SQUARED):**
Step 1 — "The eigenvalue problem X''+λX=0, X(0)=X(L)=0. Solution: X=sin(nπx/L) is the n-th eigenfunction. Verify: X'' = −(nπ/L)²sin(nπx/L) = −λₙX. So λₙ = (nπ/L)² = n²π²/L². This is n SQUARED, times a constant."
Step 2 — "The time ODE: T'+kλₙT=0 → Tₙ=e^{−kλₙt}=e^{−k(nπ/L)²t}. The exponent is −k·n²·(π/L)². Mode n decays like e^{−n²·(fundamental rate)·t}."
Step 3 — "Consequence: the n=2 mode decays 4× faster than n=1 (not 2×). The n=10 mode is negligible after 1/100 of the time it takes the n=1 mode to decay — the heat equation essentially becomes a single-mode solution (sin(πx/L)·e^{−k(π/L)²t}) for moderate t."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve: uₜ = 2uₓₓ, 0<x<π, u(0,t)=u(π,t)=0, u(x,0)=sin(x)−sin(2x)/3.
2. Solve: uₜ = uₓₓ, 0<x<1, uₓ(0,t)=uₓ(1,t)=0, u(x,0)=4cos(2πx). What is the steady-state temperature? How long until the solution is within 1% of its steady state?
3. Solve the non-homogeneous BC problem: uₜ = uₓₓ, u(0,t)=0, u(1,t)=2, u(x,0)=0. (Use the steady-state decomposition.)
4. Show that if u(x,t) satisfies uₜ=kuₓₓ on [0,L] with u(0,t)=u(L,t)=0 and u(x,0)=f(x)≥0, then u(x,t)≥0 for all t>0. (Use the maximum principle or positivity of Fourier coefficients argument.)
5. Estimate the time for the n=1 mode of the heat equation on [0,π] with k=1 to decay to 1% of its initial amplitude. Express as a formula and then numerically.

**P55 — Reflect & Consolidate:** "Heat equation uₜ=kuₓₓ: separation → X''+λX=0 (Dirichlet eigenvalues λₙ=(nπ/L)²) + T'+kλT=0 (T=e^{−kλt}). Superposition: u=Σbₙsin(nπx/L)e^{−k(nπ/L)²t}. IC gives bₙ via FSS. Higher n decays as n². Neumann: use cosines, a₀/2 conserved. Non-homogeneous BCs: split into steady state + transient."

**P76 — Transfer Probe (Independence mode):**
(a) Green's function (heat kernel): the fundamental solution of uₜ=kuₓₓ on ℝ with u(x,0)=δ(x) is G(x,t)=(4πkt)^{−1/2}exp(−x²/(4kt)) (the heat kernel or Gaussian). Show that ∫_{−∞}^{∞}G(x,t)dx=1 for all t>0, and that G(x,t)→δ(x) as t→0⁺. The solution to uₜ=kuₓₓ on ℝ with u(x,0)=f(x) is the convolution u(x,t)=∫f(y)G(x−y,t)dy. (b) Maximum principle: for the heat equation, the maximum of u over the closed space-time rectangle [0,L]×[0,T] is attained on the bottom or sides (not in the interior or top). Use this to prove uniqueness of the IBVP and the comparison principle: if f₁≤f₂, then u₁≤u₂. (c) Entropy and irreversibility: define E(t)=∫₀ᴸu²dx. Show that dE/dt=−2k∫₀ᴸuₓ²dx≤0 (using integration by parts with Dirichlet BCs), so E is decreasing. This reflects the irreversibility of diffusion: the heat equation cannot be run backward in time (the backward heat equation uₜ=−kuₓₓ is ill-posed). Contrast with the wave equation, which is time-reversible.

**P75 — Mastery Assessment:**
"(a) Solve uₜ=uₓₓ on [0,2] with u(0,t)=u(2,t)=0 and u(x,0)=x for 0<x<1 and u(x,0)=2−x for 1<x<2. (Compute the FSS coefficients for the tent function.) (b) A cooling fin: uₜ = uₓₓ − hu, u(0,t)=1, u(L,t)=0, u(x,0)=0. (Here −hu models heat loss to the environment.) Show the substitution v=e^{ht}(u−w) for the appropriate steady state w reduces this to the standard heat equation IBVP for v, and solve. (c) Long-time asymptotics: for the heat equation on [0,π] with Dirichlet BCs and u(x,0)=f(x), show that as t→∞, u(x,t)≈b₁sin(x)e^{−t} (only the n=1 term survives) provided b₁≠0. Compute the relative error |(u−b₁sin(x)e^{−t})/b₁sin(x)e^{−t}| and show it decays like e^{−3t}."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the decay-rate n² formula and the non-homogeneous BC steady-state technique
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.separation-of-variables-pde or math.de.fourier-series; reassign

**P78 — Completion:** The Heat Equation certified. Student separates variables, solves the Sturm-Liouville eigenvalue problem, assembles the Fourier series solution, applies the IC, interprets the n²-decay rates physically, handles Neumann BCs and non-homogeneous BCs via the steady-state decomposition.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Heat kernel and convolution representation; maximum principle and uniqueness; entropy/irreversibility
Skill tested: Place the IBVP solution within the broader theory of parabolic PDEs, including regularity, uniqueness, and thermodynamic interpretation

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

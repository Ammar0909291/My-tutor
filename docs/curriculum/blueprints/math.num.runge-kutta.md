# Blueprint: math.num.runge-kutta

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.runge-kutta |
| name | Runge-Kutta Methods |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.num.euler-method |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given an initial value problem y'=f(t,y), y(t₀)=y₀, the student derives the classical RK4 update from the idea of evaluating the slope at multiple interior points; states the local truncation error O(h⁵) and global error O(h⁴) for RK4; explains why RK4 requires four function evaluations per step while Euler requires one; compares explicit RK methods against implicit (collocation) RK methods for stiff problems; and applies adaptive step-size control (step doubling or embedded pairs such as RK45) to maintain a target local error tolerance.

## Component 2 — CPA Entry Stage
**C — Concrete** (predict tomorrow's temperature by averaging the slope at the start of the day, the slopes at two mid-day estimates, and the slope at end of day — before any formula)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | RK4-IS-EXACT | Student believes RK4 gives the exact solution because it matches Taylor series to order four — does not recognise that a nonzero O(h⁵) LTE still accumulates | Type 3 — language contamination ("fourth-order" sounds complete; students confuse "matches up to order 4" with "no error at all beyond order 4") |
| MC-2 | MORE-STAGES-ALWAYS-BETTER | Student assumes increasing the number of stages always improves accuracy, not recognising that beyond 4 stages extra stages do not buy a corresponding order increase (Butcher barrier) and that each stage costs an f evaluation | Type 5 — instruction-induced (tables showing order 1→2→3→4 improve accuracy for 1→2→3→4 stages lead students to extrapolate; the Butcher barrier at 5 stages is rarely covered in first courses) |
| MC-3 | ADAPTIVE-STEP-CHANGES-METHOD | Student thinks that when an adaptive solver reduces h it is switching to a different, lower-order method — does not understand that the same RK formula is applied with a smaller step | Type 1 — overgeneralization (solvers report step sizes that vary; students interpret any change in h as a change in the underlying algorithm) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Runge-Kutta:**

| Representation | Content |
|---|---|
| Geometric | Average four slope estimates: k₁ at start, k₂ at midpoint using k₁, k₃ at midpoint using k₂, k₄ at end using k₃ |
| Algebraic | k₁=hf(tₙ,yₙ); k₂=hf(tₙ+h/2, yₙ+k₁/2); k₃=hf(tₙ+h/2, yₙ+k₂/2); k₄=hf(tₙ+h, yₙ+k₃); yₙ₊₁=yₙ+(k₁+2k₂+2k₃+k₄)/6 |
| Error analysis | Taylor: y(tₙ+h)=y(tₙ)+hy'+½h²y''+…; RK4 matches this expansion through the h⁴ term; LTE=O(h⁵); global error=O(h⁴) |
| Code | `def rk4(f,t,y,h): k1=h*f(t,y); k2=h*f(t+h/2,y+k1/2); k3=h*f(t+h/2,y+k2/2); k4=h*f(t+h,y+k3); return y+(k1+2*k2+2*k3+k4)/6` |

**Butcher tableau for RK4:**
```
0   |
1/2 | 1/2
1/2 | 0   1/2
1   | 0   0   1
    | 1/6 1/3 1/3 1/6
```
The bottom row gives the weights (1/6, 2/6, 2/6, 1/6) — a weighted average of slopes, like Simpson's rule.

**Error comparison (y'=−y, y(0)=1, h=0.1, t=1):**
| Method | Steps | Error at t=1 |
|---|---|---|
| Euler (1st order) | 10 | ≈0.005 |
| RK2 (2nd order) | 10 | ≈0.000025 |
| RK4 (4th order) | 10 | ≈3×10⁻⁸ |

**P49 checkpoint:**
- CORRECT → "RK4: four slope evaluations per step, LTE=O(h⁵), global error=O(h⁴). Weighted average k₁+2k₂+2k₃+k₄ mirrors Simpson's rule structure." → A02
- PARTIAL (knows the formula but not why four slopes) → "Each kᵢ is a slope estimate at a different interior point. k₁ uses the start; k₂/k₃ use the midpoint with updated y; k₄ uses the end. Averaging them — with midpoint slopes weighted double — matches the Taylor series through h⁴, eliminating four error terms simultaneously." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Apply RK4 to y'=y, y(0)=1 with h=0.5. Compute k₁,k₂,k₃,k₄ and y₁. Compare with e^{0.5}≈1.6487." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Adaptive step-size gallery:**

**Embedded RK pair (RK45 / Dormand-Prince):** Two RK formulas sharing the same stage evaluations — one 4th-order and one 5th-order — produce two approximations at no extra cost. The difference ‖y₅−y₄‖ estimates the local error. If the error exceeds a tolerance ε: reject the step, halve h. If the error is well below ε: accept the step, increase h by up to a factor of 5.

**Step-size selection formula:** h_new = h_old × (ε/err)^{1/5} (5th-order control). Bounded: h_new ∈ [0.1 h_old, 5 h_old].

**Demonstration (y'=y(1−y), y(0)=0.1, tol=10⁻⁶):**
- Near t=0 (slow growth): solver uses h≈0.3 (few steps needed)
- Near t=3 (rapid sigmoidal growth): solver reduces to h≈0.03 automatically
- Total function evaluations: ~60 (fixed h=0.01 would require 1,000+ evaluations for same accuracy)

**Butcher barrier:** For explicit s-stage methods:
| Stages s | Maximum achievable order |
|---|---|
| 1 | 1 (Euler) |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 4 (NOT 5) |
| 6 | 5 |

Beyond 4 stages, extra stages do NOT buy a corresponding extra order. RK4 is optimal for 4 function evaluations per step.

**Pattern:** RK4 is the practical workhorse — 4 evaluations per step, 4th-order accuracy, no implicit solve. Adaptive RK pairs (RK45) tune h automatically for a target error tolerance. For stiff problems, the stability constraint forces h so small that high-order explicit methods become inefficient — implicit RK (Radau, SDIRK) are preferred.

**P49 checkpoint:**
- CORRECT → "RK4: 4 evaluations, O(h⁴) global error. Adaptive step: embedded pair estimates local error, adjusts h automatically. Butcher barrier: 5 stages gives only order 4, 6 stages first gives order 5." → A03
- PARTIAL (understands RK4 but not adaptive control) → "An embedded pair gives two approximations — one of order p, one of order p+1 — from the same stages. Their difference estimates the local error without any extra evaluations. The h-selection formula (ε/err)^{1/(p+1)} × h is derived from the error model e≈Chᵖ⁺¹: solving for the h that makes e=ε gives h_new." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "For y'=−10y with h=0.2, does explicit Euler remain stable? Does RK4? Compute |1+hλ| for Euler and the equivalent amplification factor for RK4." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Order vs. exactness gate:**

**Gate question (MC-1):** "A student uses RK4 with h=0.01 on a smooth ODE and finds the error at t=1 is 3×10⁻¹⁰. They say 'RK4 is essentially exact for h this small.' Is this correct?"

The claim is partly right but misleading. The error 3×10⁻¹⁰ is small but nonzero. As h→0, the global error O(h⁴)→0, so for this h the error happens to be negligibly small. BUT: (1) 'exact' is wrong — there is still a truncation error, just small; (2) as h→0 round-off error grows (N=1/0.01=100 steps, each adding floating-point noise), so there is an optimal h below which accuracy DECREASES again; (3) 'essentially exact' reasoning fails to budget for catastrophically ill-conditioned ODEs (sensitive dependence on initial conditions).

Correct statement: "RK4 achieves approximately 3×10⁻¹⁰ global error for this h. Halving h to 0.005 would reduce it by a factor of 2⁴=16 (to ≈2×10⁻¹¹), but below h≈10⁻⁴ round-off error starts dominating."

**P49 checkpoint:**
- CORRECT → "RK4 is high-order, not exact. Error scales as O(h⁴) until round-off takes over at very small h. 'Essentially exact' is only valid if the user has bounded both the truncation error and the round-off error." → Gate (P91)
- PARTIAL (correct about truncation error but not round-off) → "Each step introduces floating-point errors of magnitude ~u (machine epsilon ≈10⁻¹⁶). With N=T/h steps, accumulated round-off ≈Nu = Tu/h, which GROWS as h→0. Total error = Ch⁴ + Tu/h, minimised at h_opt≈(Tu/4C)^{1/5}≈10⁻³ for typical smooth problems." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "RK4 applied to y'=y, y(0)=1 with h=10⁻⁸ gives exactly y(1)=e? Why or why not?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 MORE-STAGES-ALWAYS-BETTER):**
Step 1 — "Each Runge-Kutta stage is a slope evaluation f(t,y) at an interior point. The Butcher tableau specifies where to evaluate and how to weight the results. Matching more terms in the Taylor series requires more algebraic conditions — conditions on the weights and abscissae. Beyond 4 stages, the number of conditions grows faster than the number of free parameters, so you cannot always match the next order." Step 2 — Concrete: a 5-stage method has 5+4+3+2+1=15 weights/abscissae but only achieves order 4 (same as 4-stage) because there are more order-4 conditions than free parameters. To get order 5, you need 6 stages. Step 3 — "The practical consequence: if you have a budget of 6 function evaluations per step, an 8th-order Dormand-Prince pair (8 evaluations, order 5 for error control) beats 6 independent RK4 steps (24 evaluations). This is why high-order methods are preferred for smooth problems with tight tolerances — fewer total evaluations for the same accuracy."

**TB-R02 (MC-3 ADAPTIVE-STEP-CHANGES-METHOD):**
Step 1 — "An adaptive solver uses exactly the same RK formula at every step. The only thing that changes is h. The formula yₙ₊₁=yₙ+(k₁+2k₂+2k₃+k₄)/6 is the same whether h=0.3 or h=0.003. The adaptive controller monitors a local error estimate and chooses h so that the local error stays below a tolerance ε." Step 2 — Analogy: a car's cruise control adjusts throttle position to maintain 100 km/h uphill and downhill. The driving physics (engine) doesn't change — only the input (throttle). The RK formula is the engine; h is the throttle. Step 3 — "The benefit of adaptivity: the step is large where the solution is smooth (cheap) and small where the solution changes rapidly (accurate). A fixed-h solver can't distinguish these regimes — it must use the smallest h needed anywhere, wasting work in smooth regions."

**TB-R03 (MC-1 RK4-IS-EXACT):**
Step 1 — "A pth-order method's LTE is Chᵖ⁺¹y^{(p+1)}(ξ) — a term that is never exactly zero for a non-constant y^{(p+1)}. RK4's O(h⁵) LTE is extremely small for moderate h, but it is not zero. Over N=T/h steps the truncation errors accumulate: global error ≈(T/h)×Ch⁵×max|y''''|=CTh⁴×max|y''''|. This is O(h⁴) — small but nonzero." Step 2 — The round-off floor: floating-point arithmetic introduces an error of ≈u per operation. Over N steps, total round-off ≈Tu/h grows. Total error = Ch⁴ + Tu/h, minimised at a finite h_opt not at h=0. Step 3 — "The vocabulary fix: say 'RK4 achieves O(h⁴) global error' or 'RK4 error is negligible for this problem at this h.' Say nothing that implies zero error. The distinction matters in error-sensitive applications (Hamiltonian mechanics, long-time integration) where even O(h⁴) errors accumulate over millions of steps."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Apply RK4 to y'=−2y, y(0)=1 with h=0.5. Compute all four stages k₁,k₂,k₃,k₄ and y₁. Compare with the exact e^{−1}. Now apply Euler with the same h and compare errors. Confirm that RK4's error is roughly h⁴/Euler's h factor smaller.
2. Write the Butcher tableau for the classical RK4 method. Identify the stage evaluations, abscissae (c-column), and weights (b-row). Verify: Σbᵢ=1 (consistency condition). What does this ensure?
3. An adaptive RK45 solver reports taking steps of size h=0.3, 0.28, 0.31, 0.05, 0.04, 0.06 over [0,1]. Where is the solution changing rapidly? What would you expect about f(t,y) in that region?
4. For y'=−1000y, y(0)=1 (stiff, λ=−1000), what is the maximum h for stable explicit RK4? (The RK4 stability region along the negative real axis extends to |hλ|≤2.785.) Compare with the maximum h for explicit Euler (h<2/1000). How many steps does each require to integrate to t=0.1?

**P55 — Reflect & Consolidate:** "RK4: four slope evaluations per step, O(h⁴) global error, much more accurate than Euler for the same h. Adaptive RK45 pairs a 4th- and 5th-order formula to estimate local error and tune h automatically. Butcher barrier: more stages beyond 4 don't automatically buy higher order. For stiff ODEs, switch to implicit methods."

**P76 — Transfer Probe (Independence mode):**
Symplectic (geometric) integrators preserve the phase-space volume of Hamiltonian systems, preventing the artificial energy drift that RK methods introduce over long integration times. (a) Apply RK4 to the harmonic oscillator y''=−y (as a system: y'=v, v'=−y) with h=0.1 for 100 periods (t∈[0,200π]). Does the computed energy H=v²/2+y²/2 drift? (b) The symplectic Euler method: y_{n+1}=yₙ+h·vₙ, v_{n+1}=vₙ−h·yₙ₊₁ (implicit in v, explicit in y). Apply for 100 periods. Does energy drift? (c) Explain why preserving a quadratic invariant exactly (Hamiltonian) is a structural property of the integrator, not just a matter of accuracy order. (d) When would you choose a symplectic integrator over RK4 despite RK4's higher formal order?

**P55 — Reflect & Consolidate:** "RK4 is not symplectic: it introduces artificial energy drift over long times, even at small h. Symplectic methods preserve the phase-space structure of Hamiltonian systems exactly — this is a geometric property, not an accuracy improvement. For long-time orbital mechanics, molecular dynamics, and conservative systems: use symplectic integrators. For short-time, non-Hamiltonian dynamics with high accuracy requirements: use adaptive RK45."

**P75 — Mastery Assessment:**
"A spacecraft trajectory requires integrating the two-body gravitational ODE y''=−μy/|y|³ for 10 orbital periods. (a) Which method preserves energy better over 10 periods: RK4 or symplectic Euler? Why? (b) The orbit is nearly circular. Where does adaptive RK45 take large steps, and where small? (c) At periapsis (closest approach), |y| is small and forces are large. What does this imply for the required step size and the stability of explicit methods? (d) If the mission demands position accuracy of 1 metre after 10 periods and the orbit radius is 6,000 km, what fractional accuracy is needed? Can RK4 achieve this with h=100 s?"

**P55 — Reflect & Consolidate:** "Long-time Hamiltonian dynamics: symplectic first. Short-time, smooth: adaptive RK45. Stiff (λ₁/λ₂ ≫ 1): implicit methods. The method choice is driven by: (1) the ODE's stiffness, (2) whether conserved quantities must be preserved, (3) the integration time relative to the characteristic timescale."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.runge-kutta complete
- Score 3/5 → REVIEW RK4 derivation and adaptive step control; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.num.euler-method; reassign

**P78 — Completion:** Runge-Kutta methods certified. Student derives RK4 from weighted slope averaging, states LTE=O(h⁵)/global O(h⁴), applies adaptive step-size control via embedded pairs, explains the Butcher barrier, and identifies when to switch from explicit RK to implicit or symplectic integrators.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Symplectic integrators for Hamiltonian systems; energy drift; long-time integration
Skill tested: Compare RK4 energy drift vs. symplectic preservation; identify geometric vs. accuracy properties; choose integrator by problem type

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

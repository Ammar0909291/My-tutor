# Blueprint: math.opt.newton-optimization

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.newton-optimization |
| name | Newton's Method for Optimization |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 6 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.opt.gradient-methods, math.calc.multivariable-extrema |
| Cross-links | — |
| Unlocks | math.opt.kkt |

## Component 1 — Learning Objective
Given a twice-differentiable objective function f: ℝⁿ→ℝ, the student applies the Newton step θ_{k+1}=θ_k−[∇²f(θ_k)]⁻¹∇f(θ_k), interprets this geometrically as minimizing the local quadratic approximation, explains why the rate of convergence is quadratic (near a non-degenerate local minimum), identifies when the method can fail (indefinite Hessian, far-from-minimum start, singular Hessian) and states the quasi-Newton and damped-Newton remedies.

## Component 2 — CPA Entry Stage
**A — Abstract** (Hessian matrix; quadratic Taylor expansion; matrix inversion; convergence rate definition)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | NEWTON-ALWAYS-FINDS-GLOBAL-MIN | Student assumes Newton's method converges to the global minimum regardless of starting point; conflates local quadratic convergence with global convergence | Type 5 — instruction-induced ("Newton's method converges fast" is often presented without the "near a critical point" qualifier) |
| MC-2 | HESSIAN-INVERSION-IS-EXPENSIVE-SO-SKIP | Student dismisses Newton's method as unusable because Hessian inversion costs O(n³) without considering quasi-Newton alternatives | Type 5 — instruction-induced (computational cost is emphasised but alternatives are not) |
| MC-3 | QUADRATIC-CONVERGENCE-MEANS-TWO-STEPS | Student interprets "quadratic convergence" as converging in exactly 2 steps; confuses the convergence rate (error² behaviour) with a step count | Type 3 — language contamination ("quadratic" sounds like a number) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Newton step:**

| Representation | Instance (f: ℝ→ℝ) |
|---|---|
| Geometric | Find the minimum of the quadratic tangent f(θ_k)+f'(θ_k)(θ−θ_k)+½f''(θ_k)(θ−θ_k)²; minimiser is θ_k−f'(θ_k)/f''(θ_k) |
| Algebraic (1D) | θ_{k+1}=θ_k−f'(θ_k)/f''(θ_k) |
| Matrix form (nD) | θ_{k+1}=θ_k−[∇²f(θ_k)]⁻¹∇f(θ_k) |
| Root-finding on ∇f | Newton's method applied to g(θ)=∇f(θ)=0 gives the same update |

**Worked example (1D, f(θ)=θ⁴−4θ²):**

| k | θ_k | f'(θ_k)=4θ³−8θ | f''(θ_k)=12θ²−8 | step | θ_{k+1} |
|---|---|---|---|---|---|
| 0 | 2.0 | 16 | 40 | −0.400 | 1.600 |
| 1 | 1.600 | −2.56 | 22.72 | +0.113 | 1.713 |
| 2 | 1.713 | 0.27 | 27.14 | −0.010 | 1.703 |

True minimum at θ*=√2≈1.414? Wait, f'(θ)=4θ³−8θ=4θ(θ²−2)=0 → θ=0 or θ=±√2. Starting at 2.0, Newton converges to θ=√2≈1.414.

Let me redo:

| k | θ_k | f'=4θ(θ²−2) | f''=12θ²−8 | Newton step | θ_{k+1} |
|---|---|---|---|---|---|
| 0 | 2.0 | 16 | 40 | −0.400 | 1.600 |
| 1 | 1.600 | 7.373 | 22.72 | −0.325 | 1.275 |
| 2 | 1.275 | 1.104 | 11.46 | −0.096 | 1.179 |

Converging toward √2≈1.414 slowly from above — error halves roughly, quadratic regime not yet entered. This illustrates "converges fast NEAR the minimum."

**P49 checkpoint:**
- CORRECT → "Newton minimises the local quadratic approximation; update = −H⁻¹g." → A02
- PARTIAL (knows GD, unclear on Hessian role) → "In 1D, the Newton step is −f'/f''. Why divide by f'' rather than a constant step size?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Compute the Newton step for f(θ)=θ²−4θ at θ=3: f'(3)=2, f''(3)=2." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Quadratic convergence — pattern gallery:**

| Method | Convergence rate | Definition |
|---|---|---|
| Gradient descent (convex) | Linear: e_{k+1}≤ρ·eₖ, ρ<1 | Error shrinks by constant factor each step |
| Newton (near non-degenerate min) | Quadratic: e_{k+1}≤C·eₖ² | Error SQUARES each step |
| Newton: 1 digit → 2 digits → 4 digits → 8 digits | Doubling of correct digits per step | Fast in practice |

**Numerical illustration:** At eₖ=0.1 (1 correct digit): e_{k+1}≤C·0.01 (2 correct digits after 1 step); e_{k+2}≤C·0.0001 (4 digits); e_{k+3}≤C·10⁻⁸ (8 digits). After 3 Newton steps from 1-digit accuracy: machine precision.

**When Newton fails:**
- **Indefinite Hessian** (∇²f not positive definite): step may go uphill. Fix: add regularisation θ_{k+1}=θ_k−(∇²f+λI)⁻¹∇f with λ>0 (Levenberg-Marquardt / damped Newton).
- **Singular Hessian** (det=0): matrix not invertible. Fix: regularise or use pseudo-inverse.
- **Far from minimum**: quadratic approximation is poor; may overshoot. Fix: line search along the Newton direction.
- **High-dimensional n**: O(n³) Hessian inversion prohibitive. Fix: quasi-Newton (BFGS, L-BFGS) build Hessian approximation using only gradients.

**P49 checkpoint:**
- CORRECT → "Quadratic convergence = error squares each step ≈ doubling of correct digits. Fails far from minimum or with indefinite Hessian." → A03
- PARTIAL (knows it converges fast, can't distinguish quadratic vs linear rate) → "If gradient descent halves the error each step and Newton squares it, how many steps does each need to go from error=0.1 to error=10⁻⁸?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "If eₖ=0.01 and e_{k+1}=C·eₖ², what is e_{k+1} for C=2?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Newton vs. Gradient Descent vs. Quasi-Newton:**

| Feature | GD | Newton | BFGS (Quasi-Newton) |
|---|---|---|---|
| Per-step cost | O(n) | O(n³) | O(n²) |
| Convergence near min | Linear | Quadratic | Superlinear |
| Requires Hessian? | No | Yes (exact) | No (approximated) |
| Step direction | −α∇f | −H⁻¹∇f | −B_k∇f (B_k≈H⁻¹) |
| Handles non-convex? | Poor (may oscillate) | Poor (indefinite H) | Better with damping |
| Used in practice? | SGD for large-scale | Small-scale smooth | Medium-scale ML, scipy |

**Concrete contrast:** f(x,y)=100(y−x²)²+(1−x)² (Rosenbrock). GD: takes thousands of steps following the narrow curved valley. Newton: goes directly to (1,1) in a handful of steps from a reasonable start. BFGS: intermediate — needs fewer gradient evaluations than GD but less memory than Newton.

**P49 checkpoint:**
- CORRECT → "Newton: quadratic convergence, O(n³) cost, needs PD Hessian. Quasi-Newton: superlinear, O(n²), no Hessian needed." → Gate (P91)
- PARTIAL (knows Newton is faster, unsure of BFGS) → "BFGS approximates H⁻¹ using rank-2 updates from the history of gradients. Why O(n²) rather than O(n³)?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Newton inverts an n×n matrix (O(n³)); BFGS stores and updates an n×n matrix approximation (O(n²)). For n=10,000, which is feasible?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 NEWTON-ALWAYS-FINDS-GLOBAL-MIN):**
Step 1 — "Newton finds a root of ∇f=0 — which could be a local minimum, local maximum, or saddle point. It converges to the closest critical point from the starting point, not necessarily the global minimum." Step 2 — f(θ)=θ³−3θ. Critical points: f'(θ)=3θ²−3=0 → θ=±1. f(−1)=2 (local max), f(1)=−2 (local min). Start at θ₀=−0.5: f'(−0.5)=−2.25, f''(−0.5)=−3. Newton step: −(−2.25)/(−3)=−0.75. θ₁=−1.25, converging toward θ=−1 (local max, not global min!). Step 3 — "Global convergence needs global convexity or careful initialisation."

**TB-R02 (MC-2/MC-3 QUADRATIC-CONVERGENCE-MEANS-TWO-STEPS):**
Step 1 — "Quadratic convergence describes the RATE of decay of the error, not the number of steps." Step 2 — GD from error 0.1: 0.1→0.05→0.025→0.0125→… (27 steps to reach 10⁻⁹). Newton from error 0.1: 0.1→C·0.01→C³·10⁻⁶→… (3 steps to near machine precision). The 'quadratic' refers to the exponent in e_{k+1}≤C·eₖ². Step 3 — Re-trace the digit-doubling table.

**TB-R03 (MC-2 HESSIAN-INVERSION-IS-EXPENSIVE-SO-SKIP):**
Step 1 — "You're right that O(n³) makes exact Newton impractical for n>10⁴. But quasi-Newton methods approximate H⁻¹ without ever forming or inverting the Hessian." Step 2 — "BFGS update: B_{k+1}=B_k + rank-2 correction using the current gradient change. Cost: O(n²) per step, stores an n×n matrix. L-BFGS: stores only the last m (≈20) gradient pairs; cost O(mn) per step." Step 3 — "In practice: Newton for n<1000 (scipy.optimize.minimize, method='Newton-CG'); BFGS for n<10⁵; L-BFGS for large-scale ML."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Apply two Newton steps to minimise f(θ)=e^θ+e^{−θ}−2 starting at θ₀=1.0. Compute f'(θ), f''(θ), and each Newton step exactly.
2. For f(x,y)=x²+4y²+xy, write ∇f and ∇²f. Apply one Newton step from (x₀,y₀)=(1,1). (Hint: invert the 2×2 Hessian.)
3. Explain why Newton's method can diverge when applied to f(θ)=θ¹/³ starting from θ₀=1 (note: the critical point is θ*=0 but f''(0) is undefined).
4. A strongly convex function f satisfies ∇²f(θ)⪰mI for all θ and ‖∇²f‖≤M. State (without proof) how these constants affect: (a) whether Newton's method is guaranteed to converge, (b) the region of quadratic convergence.

**P55 — Reflect & Consolidate:** "Newton's method minimises the local quadratic model — this is equivalent to applying Newton's root-finding to ∇f=0. Convergence is quadratic near non-degenerate minima; quasi-Newton trades exactness for scalability."

**P76 — Transfer Probe (Independence mode):**
Natural gradient descent (Amari, 1998): instead of the Euclidean metric, use the Fisher information matrix F(θ) as a local metric. The update is θ_{k+1}=θ_k−α·F(θ_k)⁻¹∇L(θ_k) where L is a log-likelihood. Show that this is a Newton-style update where F plays the role of the Hessian. Explain why F is always positive semi-definite (as a covariance matrix), and why this avoids Newton's indefinite-Hessian failure mode.

**P55 — Reflect & Consolidate:** "Natural gradient generalises Newton's method to statistical manifolds. The Fisher information geometry makes the step coordinate-invariant — a key advantage for parametric models."

**P75 — Mastery Assessment:**
"f(x,y,z)=x²+2y²+3z²+xy. (a) Compute ∇f and ∇²f. (b) Verify ∇²f is positive definite (show all eigenvalues positive). (c) Apply one Newton step from (1,1,1). (d) How many more Newton steps would you need to reach ‖∇f‖<10⁻⁸ if the current error is 0.01 and C=2 in the quadratic convergence bound e_{k+1}≤C·eₖ²?"

**P55 — Reflect & Consolidate:** "For strongly convex quadratics, Newton converges in one step (because the quadratic approximation IS the function). For nonlinear f, quadratic convergence kicks in once you're close enough."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; advance to math.opt.kkt
- Score 3/5 → REVIEW quadratic convergence and Hessian failure modes; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.gradient-methods or math.calc.multivariable-extrema; reassign

**P78 — Completion:** Newton's method for optimization certified. Student can apply the update, explain quadratic convergence, and identify failure modes and quasi-Newton remedies.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Natural gradient descent — Fisher information as Riemannian metric (Newton-style update with PSD guaranteed metric)
Skill tested: Recognise Newton structure in a new context; explain why PSD property of Fisher prevents Newton's indefinite-Hessian failure mode

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

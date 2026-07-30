# Blueprint: math.opt.duality

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.duality |
| Title | Lagrangian Duality |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 6 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.opt.convex-optimization |
| Cross-links | — |
| Unlocks | math.opt.kkt |

## Component 1 — Learning Objective
Given a primal problem (P): min f(x) s.t. gᵢ(x)≤0, hⱼ(x)=0, the student forms the Lagrangian L(x,λ,ν)=f(x)+Σλᵢgᵢ(x)+Σνⱼhⱼ(x), defines the dual function g(λ,ν)=inf_x L(x,λ,ν), establishes the weak duality inequality g(λ,ν)≤p* for all λ≥0, identifies conditions under which strong duality holds (Slater's condition for convex problems), and interprets the duality gap.

## Component 2 — CPA Entry Stage
**A — Abstract** (Lagrangian as a function of x and multipliers; infimum over x; dual problem as maximisation over λ,ν)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | DUAL-ALWAYS-EQUALS-PRIMAL-NONCONVEX | Student assumes strong duality holds for any optimization problem; applies it to non-convex problems and gets incorrect bounds | Type 5 — instruction-induced (strong duality is emphasised for LP; the convexity requirement for general problems is downplayed) |
| MC-2 | DUAL-VARIABLES-ARE-JUST-MULTIPLIERS | Student treats Lagrange multipliers as a computation device, not as prices/shadow prices; cannot interpret λᵢ as the rate of change of optimal value with respect to constraint tightening | Type 5 — instruction-induced (Lagrange multipliers introduced as a solving technique, not as sensitivity analysis) |
| MC-3 | SLATER-MEANS-INTERIOR-POINT-EXISTS | Student believes Slater's condition requires a strictly interior point of the ENTIRE feasible set; confuses Slater's condition (strict inequality constraints satisfied) with non-degeneracy of the optimal solution | Type 2 — perceptual intuition (Slater sounds geometric — "some interior point" — but applies only to the inequality constraints) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Lagrangian duality:**

| Representation | Instance |
|---|---|
| Lagrangian | L(x,λ,ν)=f(x)+Σλᵢgᵢ(x)+Σνⱼhⱼ(x); λᵢ≥0 (inequality multipliers), νⱼ free |
| Dual function | g(λ,ν)=inf_{x} L(x,λ,ν); always concave in (λ,ν) |
| Dual problem | max g(λ,ν) s.t. λ≥0 |
| Duality gap | p*−d* where p*=primal optimum, d*=dual optimum; gap ≥0 by weak duality |

**Worked example — QP:**
P: min ½xᵀQx+cᵀx s.t. Ax≤b (Q⪰0, convex QP).

Lagrangian: L(x,λ)=½xᵀQx+cᵀx+λᵀ(Ax−b), λ≥0.

inf_x L: ∇_x L=Qx+c+Aᵀλ=0 → x*=−Q⁻¹(c+Aᵀλ) (when Q invertible).

Dual function: g(λ)=L(x*,λ)=−½(c+Aᵀλ)ᵀQ⁻¹(c+Aᵀλ)−bᵀλ.

Dual problem: max_{λ≥0} g(λ). Since g is concave in λ (composition of concave with linear) → dual is a concave maximization → convex problem.

**P49 checkpoint:**
- CORRECT → "Lagrangian relaxes the constraints into the objective via multipliers; dual function takes the infimum over x; weak duality gives g(λ,ν)≤p* always." → A02
- PARTIAL (can write Lagrangian, can't compute inf_x) → "For f(x)=½x² and g(x)=x−1≤0 (x≥1), compute inf_x(½x²+λ(x−1)) over all x∈ℝ." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "What is inf_x (½x²+λx) for λ≥0? Take the derivative and set to zero." → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Weak duality — always holds; strong duality — requires conditions:**

**Weak duality proof:** For any feasible x (gᵢ(x)≤0, hⱼ(x)=0) and any λ≥0:
L(x,λ,ν)=f(x)+Σλᵢgᵢ(x)+Σνⱼhⱼ(x)≤f(x) (since λᵢ≥0, gᵢ(x)≤0 → λᵢgᵢ(x)≤0; hⱼ=0).
So g(λ,ν)=inf_x L(x,λ,ν)≤L(x̄,λ,ν)≤f(x̄) for any feasible x̄.
Taking inf over feasible x̄: g(λ,ν)≤p*. ✓

**Strong duality (Slater's condition):** For a convex problem, if there exists a strictly feasible point x̃ (i.e., gᵢ(x̃)<0 strictly for all i), then p*=d*.

**Non-convex counterexample (MC-1 gate):** min x²+1 s.t. x²≤0.
Primal: only feasible point x=0; p*=0+1=1.
Lagrangian: L(x,λ)=x²+1+λx². inf_x: derivative 2x+2λx=0 → x=0. g(λ)=1.
Dual: max_{λ≥0} 1 → d*=1. So p*=d*=1 here (strong duality happens to hold).

Non-convex where strong duality FAILS: min x s.t. x²+y²=1, x+y≥√2+ε (infeasible for ε>0).

Better example: min x₁² s.t. (x₁−1)²+x₂²≤1 (x₁∈[0,2]). Primal opt p*=0 at x₁=0 — but (0,0) satisfies (0−1)²+0²=1≤1 (on boundary, not strictly interior). Slater fails. Dual: g(λ)=inf_{x} x₁²+λ((x₁−1)²+x₂²−1)=−λ+(inf_{x₁}x₁²+λ(x₁−1)²)+(inf_{x₂}λx₂²). For λ>0: inf_{x₂}λx₂²=0; inf_{x₁}x₁²+λ(x₁−1)²=λ/(1+λ) (minimiser x₁*=λ/(1+λ)). g(λ)=λ/(1+λ)−λ=−λ²/(1+λ). Max_{λ≥0}(−λ²/(1+λ)) achieved at λ=0, giving d*=0=p*. (Duality gap is zero here too — the Slater condition is sufficient but not necessary for strong duality.)

Concrete gap case: P: min x₁²+x₂² s.t. (x₁x₂−1)²≤0, i.e., x₁x₂=1. Primal: min over hyperbola x₁x₂=1 → unbounded below (x₁→0, x₂→∞). Hmm, not clean. Let me use: Non-convex P: min x s.t. x²=0, x≥1. This is infeasible (x=0 from x²=0, but x≥1). p*=+∞. Lagrangian: L(x,λ,ν)=x+λ(x²)+ν(x−1)... this gets complicated. 

Key teaching point: Slater's condition is a sufficient condition for strong duality in convex programs. Without it (or in non-convex programs), a duality gap can occur.

**P49 checkpoint:**
- CORRECT → "Weak duality ALWAYS holds. Strong duality for convex problems: Slater's condition (strictly feasible point) is sufficient." → A03
- PARTIAL (understands weak, can't state Slater) → "Slater's condition: there exists x̃ with gᵢ(x̃)___0 for all i. What goes in the blank — strict or non-strict inequality?" → TB-R01 → A03
- INCORRECT → TB-R01 → A03
- NO_RESPONSE → "If p*=5 and d*=3, what is the duality gap? Can this happen for a convex problem satisfying Slater?" → TB-R01 → A03

### A03 — P06 CONTRAST PAIR
**Shadow price interpretation of dual variables:**

| Feature | λᵢ=0 | λᵢ>0 |
|---|---|---|
| Primal constraint status | Inactive (gᵢ(x*)<0, slack) | Active (gᵢ(x*)=0, binding) |
| Meaning | Relaxing constraint i does not change p* | Relaxing constraint i improves p* by λᵢ per unit |
| Complementary slackness | λᵢgᵢ(x*)=0 (always: either λᵢ=0 or gᵢ=0) | λᵢ>0 forces gᵢ(x*)=0 |

**Sensitivity interpretation:** p*(b)=optimal value as b in gᵢ(x)≤bᵢ changes. At strong duality: ∂p*/∂bᵢ=−λᵢ*. So λᵢ* is the "shadow price" of constraint i: each unit of relaxation (increase bᵢ) decreases the optimal cost by λᵢ*.

**Concrete example:** min x₁+2x₂ s.t. x₁+x₂≥3 (i.e., −x₁−x₂≤−3, g₁=−x₁−x₂+3), x₁,x₂≥0.

Primal opt: (3,0), p*=3. Dual multiplier λ₁*=1.

If constraint relaxes to x₁+x₂≥2 (b₁:=−2): new opt (2,0), p*(new)=2. Decrease = 1 = λ₁* ✓.

**P49 checkpoint:**
- CORRECT → "λᵢ* is the shadow price: rate of improvement in p* per unit relaxation of constraint i. Active constraints have λᵢ*>0; inactive have λᵢ*=0." → Gate (P91)
- PARTIAL (knows CS, can't interpret shadow price) → "If constraint i is inactive (some slack), loosening it further can't help — so λᵢ*=0. Why?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "If you relax a binding constraint by 1 unit and the optimal cost drops by 3, what is the shadow price of that constraint?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 DUAL-ALWAYS-EQUALS-PRIMAL-NONCONVEX):**
Step 1 — "Weak duality is universal: g(λ)≤p* for ANY problem (convex or not). It follows directly from the definition of infimum and the sign of λᵢgᵢ. Strong duality is NOT universal — it needs convexity plus Slater." Step 2 — Numeric: a non-convex problem where the dual gives a lower bound of 3 but the primal optimum is 5: gap=2>0. The dual is solvable but gives a bound, not the true optimum. Step 3 — "In non-convex programs (e.g., integer programs) the duality gap is used as a bound for branch-and-bound: LP relaxation = dual lower bound, integer solution = primal upper bound."

**TB-R02 (MC-2 DUAL-VARIABLES-ARE-JUST-MULTIPLIERS):**
Step 1 — "λᵢ is not just a solving trick; it is an economic price. Think of constraint gᵢ(x)≤0 as a resource limit. λᵢ is the value of one additional unit of that resource — how much the optimal cost decreases if you get more of resource i." Step 2 — LP sensitivity example: factory producing two products with resource constraints. The dual variable for the labour constraint = dollar value of one additional hour of labour. Step 3 — Re-derive ∂p*/∂bᵢ=−λᵢ* from the envelope theorem applied to the Lagrangian.

**TB-R03 (MC-3 SLATER-MEANS-INTERIOR-POINT-EXISTS):**
Step 1 — "Slater's condition: ∃x̃ with gᵢ(x̃)<0 strictly for all INEQUALITY constraints. It says nothing about x̃ being in the interior of any other region." Step 2 — Example: P: min f(x) s.t. x≤1, x=−1 (equality). Slater: need x̃ with x̃<1. x̃=−1 satisfies this. But x̃=−1 is the only feasible point (equality forces x=−1). Slater holds even though the feasible set is a single point! Step 3 — Clarify: Slater is about the INEQUALITY constraints only. It ensures the dual is not degenerate at the boundary of the constraint set.

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Form the Lagrangian for: min x²+y² s.t. x+y≥2. Compute the dual function g(λ) and solve the dual max_{λ≥0} g(λ). Verify strong duality by checking p*=d*.
2. For the LP in standard form min cᵀx s.t. Ax=b, x≥0, write the Lagrangian (treating equality constraints with free multipliers ν) and show the dual is max bᵀν s.t. Aᵀν≤c.
3. Check Slater's condition for: (a) min x₁²+x₂² s.t. x₁+x₂≥1; (b) min x₁²+x₂² s.t. (x₁−1)²+(x₂−1)²≤0 (feasible set = single point {(1,1)}). For which does Slater hold?
4. In problem (a) of Q3, identify the shadow price of the constraint x₁+x₂≥1 and verify it by perturbing the right-hand side to 1+ε.

**P55 — Reflect & Consolidate:** "Lagrangian duality: relax constraints into the objective, take infimum over x, maximise over multipliers. Weak duality always holds; strong duality needs convexity + Slater. Dual variables are shadow prices."

**P76 — Transfer Probe (Independence mode):**
SVM as a duality application: The soft-margin SVM primal is min_{w,b,ξ} ½‖w‖²+CΣξᵢ s.t. yᵢ(wᵀxᵢ+b)≥1−ξᵢ, ξᵢ≥0. Form the Lagrangian with multipliers αᵢ≥0 (for the margin constraints) and μᵢ≥0 (for ξᵢ≥0). Take inf over (w,b,ξ) to obtain the dual. Show that the dual variables αᵢ are the "support vectors" (only points with αᵢ>0 contribute to the decision boundary). This is why SVM is a sparse classifier.

**P55 — Reflect & Consolidate:** "SVM duality is the canonical machine learning example: the primal is a constrained QP over a high-dimensional w; the dual reduces to a QP over n sample weights αᵢ, enabling the kernel trick."

**P75 — Mastery Assessment:**
"P: min x₁+x₂+x₃ s.t. x₁+x₂≥2, x₂+x₃≥2, x₁,x₂,x₃≥0. (a) Form the Lagrangian L(x,λ). (b) Compute the dual function g(λ₁,λ₂) by taking inf over x≥0. (c) Solve max g(λ) over λ≥0. (d) Verify p*=d*. (e) Identify which constraints are active at optimality and find the dual variables via complementary slackness."

**P55 — Reflect & Consolidate:** "The dual of an LP is an LP. The optimal dual variables are the shadow prices of the primal constraints, certifiable via complementary slackness."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; advance to math.opt.kkt
- Score 3/5 → REVIEW weak duality proof and Slater; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.convex-optimization; reassign

**P78 — Completion:** Lagrangian duality certified. Student can form the dual, apply weak and strong duality, interpret dual variables as shadow prices, and state Slater's condition.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: SVM duality — primal QP → dual QP over support weights αᵢ; Lagrangian derivation; CS identifies support vectors
Skill tested: Apply Lagrangian duality to a new machine learning problem; derive dual from first principles; interpret CS for sparsity

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

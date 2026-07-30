# Blueprint: math.opt.kkt

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.kkt |
| Title | KKT Conditions |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.opt.duality, math.opt.lagrange-multipliers |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a constrained optimisation problem min f(x) s.t. gᵢ(x)≤0, hⱼ(x)=0, the student writes all four KKT conditions (stationarity, primal feasibility, dual feasibility, complementary slackness), explains why they are necessary for any smooth optimum under LICQ but sufficient only for convex problems, applies them to solve a small QP by hand, and identifies which training points in a hard-margin SVM are support vectors using complementary slackness.

## Component 2 — CPA Entry Stage
**A — Abstract** (Lagrangian; KKT multipliers; complementary slackness; constraint qualification)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | KKT-SUFFICIENT-ALWAYS | Student believes KKT conditions are both necessary AND sufficient for optimality for any problem; applies them to non-convex problems and trusts the result as a global minimum | Type 5 — instruction-induced (KKT is introduced as "the optimality conditions"; the convexity caveat is added later and students miss it) |
| MC-2 | COMPLEMENTARY-SLACKNESS-CONFUSION | Student reads λᵢgᵢ(x*)=0 as a symmetric choice — either factor can be zero by preference — without seeing the causal direction: inactive constraint forces λᵢ=0, and λᵢ>0 forces constraint active | Type 1 — overgeneralization (reads a product-zero as symmetric; misses the causal direction from the constraint's status) |
| MC-3 | DUAL-FEASIBILITY-OPTIONAL | Student omits the dual feasibility condition λᵢ≥0 when writing KKT; thinks KKT is just stationarity plus primal feasibility; does not understand why a negative multiplier on an inequality constraint would be geometrically wrong | Type 3 — language contamination ("Lagrange multiplier" is sign-free in unconstrained equality settings; the inequality sign requirement comes only with gᵢ≤0 and is missed) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four KKT conditions — four representations:**

| Representation | Instance |
|---|---|
| Lagrangian | L(x,λ,ν) = f(x) + Σλᵢgᵢ(x) + Σνⱼhⱼ(x) |
| Four conditions | (1) Stationarity: ∇ₓL=0; (2) Primal feasibility: gᵢ(x*)≤0, hⱼ(x*)=0; (3) Dual feasibility: λᵢ≥0; (4) Complementary slackness: λᵢgᵢ(x*)=0 ∀i |
| Geometric | At x*: −∇f lies in the cone spanned by active constraint gradients {∇gᵢ: gᵢ=0}; inactive constraints contribute λᵢ=0 |
| Special cases | No inequalities → reduces to Lagrange conditions ∇f(x*)+Σνⱼ∇hⱼ(x*)=0. Unconstrained → ∇f(x*)=0 only. |

**Worked example — equality-constrained:**
min ½x₁²+½x₂² s.t. x₁+x₂=1.

L=½x₁²+½x₂²+ν(x₁+x₂−1). Stationarity: x₁+ν=0, x₂+ν=0 → x₁=x₂=−ν. Primal: −2ν=1 → ν=−½. x*=(½,½). ✓

**Worked example — inequality-constrained:**
min ½x₁²+½x₂²−x₁ s.t. x₁+x₂≤2.

L=½x₁²+½x₂²−x₁+λ(x₁+x₂−2). Four KKT conditions:
1. Stationarity: x₁−1+λ=0, x₂+λ=0 → x₁=1−λ, x₂=−λ.
2. Primal: x₁+x₂≤2 → (1−λ)+(−λ)=1−2λ≤2.
3. Dual: λ≥0.
4. CS: λ(x₁+x₂−2)=0.

Case A (λ=0, inactive): x*=(1,0). Check: 1+0=1≤2 ✓. All four KKT met. ✓
Case B (constraint active, x₁+x₂=2): 1−2λ=2 → λ=−½. Violates dual feasibility. ✗

Solution: x*=(1,0), λ*=0.

**P49 checkpoint:**
- CORRECT → "Four KKT conditions: stationarity, primal feasibility, dual feasibility (λᵢ≥0), complementary slackness (λᵢgᵢ=0). Necessary for any smooth optimum; sufficient for convex." → A02
- PARTIAL (writes stationarity + primal, omits dual feasibility) → "What sign restriction holds on the multipliers λᵢ for inequality constraints gᵢ≤0? Why can't λᵢ be negative?" → TB-R03 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Write the Lagrangian for min f(x) s.t. g(x)≤0. What is the derivative of L with respect to x set to zero?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**KKT necessary vs. sufficient — gate:**

Non-convex example: f(x)=x⁴−2x², no constraints (C=ℝ). KKT reduces to f'(x)=0: 4x³−4x=4x(x²−1)=0 → x=0 or x=±1. At x=0: f(0)=0. But x=±1: f(±1)=1−2=−1<0. So x=0 satisfies KKT (stationarity) but is a LOCAL MAXIMUM, not a minimum. KKT is satisfied but the point is not optimal.

**Gate question (MC-1):** "A student solves KKT for min 2x₁²+2x₂²−2x₁x₂ s.t. x₁+x₂=1 and gets x*=(½,½). They conclude this is the global minimum. How would you verify this claim?"

Check convexity: Hessian H=[[4,−2],[−2,4]]. Eigenvalues: det(H−λI)=(4−λ)²−4=0 → λ=2,6. Both positive → H⪰0 → f is convex. The equality constraint is affine. So this IS a convex problem → every KKT point is globally optimal. ✓ But: if H had a negative eigenvalue, x*=(½,½) could be a saddle point despite satisfying KKT.

**P49 checkpoint:**
- CORRECT → "KKT: necessary always (under LICQ). Sufficient: only when f and all gᵢ are convex and hⱼ are affine. Without convexity: enumerate ALL KKT points and compare." → A03
- PARTIAL (knows KKT isn't always sufficient, unsure of the condition) → "State the conditions on f and gᵢ that make every KKT point globally optimal." → TB-R01 → A03
- INCORRECT → TB-R01 → A03
- NO_RESPONSE → "Can a local maximum satisfy KKT conditions? Give a 1D example." → TB-R01 → A03

### A03 — P06 CONTRAST PAIR
**Complementary slackness — SVM support vectors:**

Hard-margin SVM KKT: αᵢ(yᵢ(wᵀxᵢ+b)−1)=0 ∀i, αᵢ≥0.

| Case | αᵢ | Constraint | Role |
|---|---|---|---|
| Support vector | >0 | yᵢ(wᵀxᵢ+b)=1 (active, on margin) | Determines w,b |
| Non-support vector | =0 | yᵢ(wᵀxᵢ+b)≥1 (inactive, inside margin) | Irrelevant to solution |

Implication: the SVM solution depends ONLY on support vectors. All other training points can be removed without changing w* or b*. CS identifies exactly which points matter.

**Contrast — Lagrange vs KKT multipliers:**

| Setting | Multiplier | Sign requirement | Why |
|---|---|---|---|
| Equality hⱼ(x)=0 | νⱼ | None (any sign) | Equality has no direction |
| Inequality gᵢ(x)≤0 | λᵢ | λᵢ≥0 | Multiplier must push into the feasible set |

Geometric: at an optimum on the boundary gᵢ=0, the gradient −∇f must be a NON-NEGATIVE combination of active constraint normals ∇gᵢ. A negative λᵢ would mean ∇f is being pulled toward infeasibility.

**P49 checkpoint:**
- CORRECT → "CS: λᵢgᵢ(x*)=0 means inactive constraint → λᵢ=0; or λᵢ>0 → constraint active. In SVM: αᵢ>0 exactly for support vectors. Solution determined by boundary points only." → Gate (P91)
- PARTIAL (understands CS, can't identify SVM support vectors) → "If αᵢ=3 for training point xᵢ, what does CS say about yᵢ(wᵀxᵢ+b)?" → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "In αᵢ(yᵢ(wᵀxᵢ+b)−1)=0, if αᵢ>0 what must be true about yᵢ(wᵀxᵢ+b)?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 KKT-SUFFICIENT-ALWAYS):**
Step 1 — "KKT conditions arise from stationarity of the Lagrangian. They identify every critical point of the Lagrangian — including saddle points and local maxima, not just minima." Step 2 — f(x)=x⁴−2x²: stationary points x=0,±1. x=0 is a local maximum (f''(0)=−4<0). All three satisfy KKT (∇f=0, no constraints). Only x=±1 are global minima. KKT does not distinguish them. Step 3 — "Sufficient condition: f convex (positive semidefinite Hessian), all gᵢ convex, all hⱼ affine. Then the problem is convex and any KKT point IS a global minimum. Without convexity: check all KKT points, compare objective values."

**TB-R02 (MC-2 COMPLEMENTARY-SLACKNESS-CONFUSION):**
Step 1 — "λᵢgᵢ(x*)=0: since λᵢ≥0 and gᵢ(x*)≤0, the causal direction is: IF gᵢ(x*)<0 (constraint inactive) THEN λᵢ MUST equal 0 (constraint has no effect at x*, shadow price is zero). IF λᵢ>0 THEN gᵢ(x*)=0 MUST hold (the constraint is binding)." Step 2 — Shadow price intuition: λᵢ is the rate of change of the objective as gᵢ's right-hand side is relaxed. If the constraint is not binding (gᵢ<0), relaxing it doesn't help → λᵢ=0. If λᵢ>0, the constraint is tightly limiting the objective → it must be active. Step 3 — "Check both directions: active constraint (gᵢ=0) → λᵢ free (may be zero in degenerate cases); inactive constraint (gᵢ<0) → λᵢ MUST be zero. The reverse never holds."

**TB-R03 (MC-3 DUAL-FEASIBILITY-OPTIONAL):**
Step 1 — "For Lagrange conditions with equality constraints only, νⱼ can be any sign — there is no direction preference for an equality. For inequality gᵢ(x)≤0: λᵢ<0 would mean the Lagrangian gradient ∇f+λᵢ∇gᵢ=0 has the multiplier pushing toward INCREASING gᵢ — away from feasibility." Step 2 — Geometric: at a constrained minimum on the boundary gᵢ=0, the gradient −∇f must point into the feasible halfspace (gᵢ≤0 side). This requires λᵢ≥0. Negative λᵢ would mean ∇f points into the feasible set — the minimum would be in the interior, not on the boundary. Contradiction. Step 3 — "Always write all four: (1) stationarity, (2) primal feasibility, (3) DUAL FEASIBILITY λᵢ≥0, (4) complementary slackness. Missing dual feasibility is the most common KKT error."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Write all four KKT conditions for: min x₁²+2x₂² s.t. x₁+x₂≤3, x₁≥0. Solve for x*.
2. For min (x₁−3)²+(x₂−2)² s.t. x₁²+x₂²≤5: write the KKT conditions, find x* by case analysis, verify all four conditions.
3. A student solves KKT for min −x₁x₂ s.t. x₁+x₂≤4, x₁,x₂≥0 and finds a KKT point at (2,2). Compute the Hessian of f at (2,2). Is this point a minimum, maximum, or saddle point? Does KKT sufficiency apply?
4. In soft-margin SVM, KKT conditions include αᵢ∈[0,C] and ξᵢ≥0 with a separate multiplier μᵢ. Using CS, explain which training points have: 0<αᵢ<C (on the margin), αᵢ=C (margin violators with ξᵢ>0), αᵢ=0 (correctly classified, inside margin).

**P55 — Reflect & Consolidate:** "KKT: necessary for smooth problems under LICQ. Four conditions: stationarity, primal feasibility, dual feasibility (λᵢ≥0), complementary slackness (λᵢgᵢ=0). Sufficient for convex programs. CS identifies which constraints are active — in SVM, which training points are support vectors."

**P76 — Transfer Probe (Independence mode):**
Fritz John conditions: without assuming LICQ, the stationarity condition becomes λ₀∇f(x*)+Σλᵢ∇gᵢ(x*)=0 where λ₀≥0 and (λ₀,λ₁,…)≠(0,…,0). (a) Show that if LICQ holds at x* (active constraint gradients are linearly independent), then λ₀>0, so dividing by λ₀ recovers standard KKT. (b) Give a concrete example where LICQ fails: min x₁ s.t. x₁²≤0, x₁≥0. Find the optimum, check whether LICQ holds, and show that the only Fritz John multipliers satisfying the condition have λ₀=0 (the "abnormal" case where standard KKT fails).

**P55 — Reflect & Consolidate:** "Fritz John generalises KKT to cases where LICQ fails. When LICQ holds, Fritz John reduces to standard KKT (λ₀=1). LICQ fails when active constraint gradients are linearly dependent — e.g., two constraints tangent at the optimum. The abnormal case (λ₀=0) means the standard stationarity condition may not hold even at the true optimum."

**P75 — Mastery Assessment:**
"The problem: min x₁+x₂ s.t. x₁²+x₂²≤2, x₁+x₂≥1, x₁,x₂≥0. (a) Write the complete KKT conditions (all four conditions for every constraint). (b) Determine which constraints are active at the optimum by case analysis and complementary slackness. (c) Solve for x* and all multipliers. (d) Is the problem convex? Does convexity make your KKT solution provably globally optimal?"

**P55 — Reflect & Consolidate:** "Case analysis via CS: for each inequality, either active (gᵢ=0, λᵢ unconstrained but ≥0) or inactive (λᵢ=0). Exhausting all cases + checking dual feasibility gives the complete solution. For convex problems, the first KKT point found is the unique global minimum."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.kkt complete
- Score 3/5 → REVIEW complementary slackness case analysis and necessity vs. sufficiency; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.duality or math.opt.lagrange-multipliers; reassign

**P78 — Completion:** KKT conditions certified. Student can write all four KKT conditions, distinguish necessity from sufficiency, apply CS to identify active constraints and SVM support vectors, and verify optimality in convex and non-convex cases.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Fritz John conditions without LICQ; LICQ as the standard constraint qualification; abnormal case λ₀=0
Skill tested: Derive standard KKT from Fritz John by invoking LICQ; recognise when LICQ fails; construct an example of an abnormal optimum

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

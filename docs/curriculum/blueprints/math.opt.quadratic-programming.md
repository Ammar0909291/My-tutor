# Blueprint: math.opt.quadratic-programming

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.quadratic-programming |
| Title | Quadratic Programming |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.opt.linear-programming, math.linalg.positive-definite |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a quadratic program (QP): min ½xᵀQx+cᵀx s.t. Ax≤b, the student classifies the problem as convex (Q⪰0) or non-convex (Q not PSD), writes the KKT conditions, solves small instances (2D active-set or closed-form), explains why the SVM training problem is a QP, and distinguishes QP from LP by the curved objective.

## Component 2 — CPA Entry Stage
**A — Abstract** (Hessian Q; quadratic objective; active-set method; KKT system)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | QP-ALWAYS-CONVEX | Student assumes any QP is convex; does not check whether Q is positive semidefinite; attempts to apply convex solvers to non-convex QPs | Type 5 — instruction-induced (QPs are usually introduced with convex examples; non-convex QPs are harder and mentioned later) |
| MC-2 | KKT-SUFFICIENT-WITHOUT-CONVEXITY | Student applies KKT conditions and concludes a solution is globally optimal without verifying convexity; a KKT point of a non-convex QP may be a saddle point | Type 1 — overgeneralization (KKT necessary always; sufficient only for convex problems) |
| MC-3 | QP-SAME-AS-LS | Student confuses unconstrained QP min ½‖Ax−b‖² with the QP min ½xᵀQx+cᵀx; does not see that least squares is a special case (Q=AᵀA, c=−Aᵀb) with a closed-form solution, while constrained QP is harder | Type 3 — language contamination ("quadratic objective" sounds the same in both) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of QP:**

| Representation | Instance |
|---|---|
| Standard form | min ½xᵀQx+cᵀx s.t. Ax≤b, x≥0 |
| Geometric (2D) | Contours are ellipses (Q⪰0) or hyperbolas (Q indefinite); feasible set = polytope |
| Convexity check | Q⪰0 (all eigenvalues ≥0): bowl-shaped; global minimum. Q indefinite: saddle surface; local minima may not be global |
| Special cases | LP: Q=0 (reduces to LP). Least squares: unconstrained Q=AᵀA, c=−Aᵀb, closed form x*=(AᵀA)⁻¹Aᵀb. |

**Classification table:**

| Q | Objective | Convex? | Solver |
|---|---|---|---|
| Q=0 | Linear | Yes (LP) | Simplex / IP |
| Q⪰0 (PSD) | Convex quadratic | Yes | Active-set, OSQP, ECOS |
| Q⪰0 (PD) | Strictly convex | Yes | Unique global min |
| Q indefinite | Non-convex | No | Branch-and-bound, SDP relaxation |
| Q≺0 (ND) | Concave | No | Optimum at vertex (like LP) |

**Worked 2D example (convex QP):**
min ½(x₁²+x₂²)−x₁−x₂ s.t. x₁+x₂≤2.

Q=I (PD, convex). Unconstrained min: ∇f=x−(1,1)ᵀ=0 → x*=(1,1). Check feasibility: 1+1=2≤2 ✓. Constraint is active. KKT multiplier: λ*(x₁+x₂−2)=0, x₁+x₂=2 → λ≥0.  KKT: (1−λ,1−λ)=0 (stationarity) → λ=1. So x*=(1,1), λ*=1. ✓

**P49 checkpoint:**
- CORRECT → "QP: quadratic objective, polyhedral constraints. Convex iff Q⪰0. Solved by active-set or interior-point." → A02
- PARTIAL (knows form, can't check convexity) → "For Q=[[1,2],[2,1]], compute the eigenvalues. Is Q PSD?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "If Q=[[4,0],[0,9]], is Q PSD? What are its eigenvalues?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**QP convexity check — gate:**

For Q=[[1,3],[3,1]]: det(Q)=1−9=−8<0 → Q indefinite (one positive, one negative eigenvalue). Problem min ½xᵀQx is NOT convex (saddle surface). KKT point at gradient=0 is x*=0 with f(0)=0 — but f(1,−1)=½(1+3(−1)(1)+1(−1)²+3(1)(−1))=½(1−3+1−3)=−2<0. So x*=0 is NOT a minimum. KKT is necessary but not sufficient here.

**Gate question (MC-1):** "A student forms the QP min ½xᵀQx s.t. Ax≤b with Q=[[2,1],[1,2]]. They compute eigenvalues: λ₁=3, λ₂=1. Is the problem convex?"

Yes: both eigenvalues positive → Q⪰0 (PD). The problem is strictly convex. Any KKT point is the unique global minimum.

**P49 checkpoint:**
- CORRECT → "Always check Q⪰0 before applying convex solvers. KKT is globally sufficient only when Q⪰0." → A03
- PARTIAL (knows to check eigenvalues, unsure how) → "For [[a,b],[b,c]], the eigenvalues are positive iff a>0 and ac−b²>0 (Sylvester's criterion). Apply this to Q=[[2,1],[1,2]]." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Compute det([[2,1],[1,2]])=4−1=3>0 and leading 1×1 minor=2>0. What does Sylvester say?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**SVM as a QP (motivating application):**

Hard-margin SVM: min ½‖w‖² s.t. yᵢ(wᵀxᵢ+b)≥1 ∀i.

This is a convex QP: Q (acting on w) = I (PD), c=0, b=0; linear constraints yᵢ(wᵀxᵢ+b)≥1.

Soft-margin SVM: min ½‖w‖²+CΣξᵢ s.t. yᵢ(wᵀxᵢ+b)≥1−ξᵢ, ξᵢ≥0.

Still a convex QP: Q=block-diag(I,0,0) (PSD, not PD), c=(0,…,0,C,…,C)ᵀ.

| Feature | Hard-margin SVM | Soft-margin SVM |
|---|---|---|
| Q | I (on w only) | Block-diag(I,0,0) |
| Q PSD? | Yes | Yes (zeros for ξ,b don't cause issues since ξ≥0 constraint bounds the problem) |
| Constraints | yᵢ(wᵀxᵢ+b)≥1 | yᵢ(wᵀxᵢ+b)≥1−ξᵢ, ξᵢ≥0 |
| Dual | QP with n dual variables αᵢ | QP with αᵢ∈[0,C] |
| Solution | Unique (I PD) | Unique in w,b; degenerate in ξ |

**P49 checkpoint:**
- CORRECT → "SVM is a convex QP. Q=I (block) is PSD → unique global optimum. The dual (kernel trick) is also a QP." → Gate (P91)
- PARTIAL (knows SVM is QP, unsure about soft-margin) → "Why is soft-margin SVM still a QP? The ξ variables appear linearly, not quadratically." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "In soft-margin SVM, the objective has ½‖w‖²+CΣξᵢ. What is the degree of each term in (w,b,ξ)?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 QP-ALWAYS-CONVEX):**
Step 1 — "Q is a matrix, not a number. PSD means all eigenvalues ≥0. Indefinite means some eigenvalues positive, some negative." Step 2 — Q=[[1,3],[3,1]]: char poly λ²−2λ−8=(λ−4)(λ+2)=0. λ₁=4>0, λ₂=−2<0. Indefinite → non-convex. Step 3 — "Level sets of ½xᵀQx with indefinite Q are hyperbolas, not ellipses. The function has a saddle point at x=0, not a minimum. Use Sylvester's criterion or check eigenvalues before running a convex solver."

**TB-R02 (MC-2 KKT-SUFFICIENT-WITHOUT-CONVEXITY):**
Step 1 — "KKT: necessary conditions (every optimum satisfies them). Sufficient: for convex problems only, every KKT point IS a global minimum." Step 2 — For Q=[[1,3],[3,1]] (indefinite), x*=0 satisfies stationarity ∇f=Qx=0. But f(1,−1)=−2<f(0)=0. KKT met, not a minimum. Step 3 — "For non-convex QPs, use branch-and-bound or SDP relaxation to find global optima. Never trust a single KKT point as global without convexity."

**TB-R03 (MC-3 QP-SAME-AS-LS):**
Step 1 — "Least squares: min ½‖Ax−b‖²=½xᵀAᵀAx−(Aᵀb)ᵀx+½‖b‖². This IS a QP with Q=AᵀA⪰0 and c=−Aᵀb, unconstrained. The closed form x*=(AᵀA)⁻¹Aᵀb solves it." Step 2 — "Constrained QP: same objective but with Ax≤b. The constraint changes the problem fundamentally — no closed form; requires active-set or interior-point." Step 3 — "LS is the unconstrained special case; constrained QP is the general problem. Both have quadratic objectives, but LS has a direct analytical solution while QP with constraints doesn't."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Classify as convex QP, non-convex QP, or LP: (a) min x₁²+3x₁x₂+x₂² s.t. x₁+x₂≤1; (b) min 2x₁²−x₁x₂+x₂² s.t. x₁,x₂≥0; (c) min 3x₁+x₂ s.t. x₁²+x₂²≤1. (Classify (c) carefully: what kind of problem is it?)
2. Solve min ½x₁²+½x₂²−x₁ s.t. x₁+x₂=1, x₁,x₂≥0 using KKT conditions.
3. Write the dual QP of min ½‖x‖² s.t. Ax≥b and show it equals max bᵀλ−½λᵀ(AA ᵀ)λ s.t. λ≥0.
4. A portfolio optimisation problem: min xᵀΣx s.t. μᵀx≥r, 1ᵀx=1, x≥0 where Σ is a covariance matrix, μ is expected returns, r is the required return. Is this a convex QP? Identify Q, c, A, b.

**P55 — Reflect & Consolidate:** "QP: quadratic objective, polyhedral constraints. Convex iff Q⪰0. KKT is globally sufficient for convex QPs. SVM training, portfolio optimisation, and QP relaxations all reduce to this form."

**P76 — Transfer Probe (Independence mode):**
LASSO as a QP: min ½‖Ax−b‖²+λ‖x‖₁. The ‖x‖₁=Σ|xᵢ| is non-smooth. Show that by introducing auxiliary variables tᵢ≥|xᵢ| (i.e., tᵢ≥xᵢ and tᵢ≥−xᵢ), LASSO becomes min ½‖Ax−b‖²+λΣtᵢ s.t. tᵢ≥xᵢ, tᵢ≥−xᵢ ∀i, which is a convex QP in (x,t). Verify Q for the augmented variable vector.

**P55 — Reflect & Consolidate:** "LASSO reduces to a QP via auxiliary variable lifting of the ‖·‖₁ norm. The same trick converts any absolute-value penalty into linear constraints."

**P75 — Mastery Assessment:**
"Hard-margin SVM with training set {(x₁,+1),(x₂,+1),(x₃,−1)} where x₁=(1,0),x₂=(0,1),x₃=(0,0): (a) Write the hard-margin SVM QP in terms of w∈ℝ², b∈ℝ. (b) Solve for (w*,b*) and find the margin. (c) Write the KKT conditions and identify which training points are support vectors (λᵢ>0). (d) Verify that the KKT multipliers satisfy complementary slackness."

**P55 — Reflect & Consolidate:** "The SVM margin is 2/‖w*‖; support vectors are the training points with active margin constraints (KKT multiplier >0). All other training points have zero KKT multipliers."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.quadratic-programming complete
- Score 3/5 → REVIEW convexity check and KKT sufficiency; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.linear-programming or math.linalg.positive-definite; reassign

**P78 — Completion:** Quadratic programming certified. Student can classify QP convexity, write KKT conditions, solve small instances, and model SVM training as a QP.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: LASSO as QP via auxiliary variable lifting of ‖·‖₁ into linear constraints; verify convexity of augmented problem
Skill tested: Reformulate a non-smooth problem as a smooth QP; verify Q⪰0 for the augmented variable

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

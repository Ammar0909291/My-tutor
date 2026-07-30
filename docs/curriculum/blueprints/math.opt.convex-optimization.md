# Blueprint: math.opt.convex-optimization

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.convex-optimization |
| Title | Convex Optimization |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 7 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.opt.convex-function, math.opt.convex-set |
| Cross-links | — |
| Unlocks | math.opt.linear-programming, math.opt.semidefinite-programming, math.opt.duality |

## Component 1 — Learning Objective
Given a minimisation problem min f(x) s.t. x∈C with f convex and C a convex set, the student states the fundamental theorem (any local minimum is a global minimum), verifies the optimality condition (∇f(x*)=0 for unconstrained; 〈∇f(x*), y−x*〉≥0 for all y∈C for constrained), applies projected gradient descent, and selects among standard problem classes (LP, QP, SDP) by matching the structural form of f and C.

## Component 2 — CPA Entry Stage
**A — Abstract** (first-order optimality conditions; projected gradient; problem class matching)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | LOCAL-IS-NOT-GLOBAL-FOR-CONVEX | Student treats a locally optimal point as potentially not global; applies heuristics (random restarts, simulated annealing) unnecessarily to a convex problem | Type 5 — instruction-induced (students learn local≠global for non-convex, then over-apply this caution) |
| MC-2 | GRADIENT-ZERO-SUFFICIENT-CONSTRAINED | Student uses ∇f(x*)=0 as the constrained optimality condition without checking feasibility; fails to use the projected gradient / variational inequality condition | Type 1 — overgeneralization (unconstrained: ∇f=0 is necessary AND sufficient; constrained requires more) |
| MC-3 | CONVEXITY-OF-FEASIBLE-SET-ENOUGH | Student believes a problem is convex as long as the feasible set C is convex; does not check that the objective f is also convex (a non-convex objective over a convex set can have many local minima) | Type 1 — overgeneralization (convex set is one of two requirements; both must hold) |

## Component 4 — Session TA Cap
**Cap = 9** (hrs = 7 → cap 9)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of a convex optimization problem:**

| Representation | Instance |
|---|---|
| Standard form | min f(x) s.t. gᵢ(x)≤0, hⱼ(x)=0 where f,gᵢ convex; hⱼ affine |
| Geometric | Minimise a bowl-shaped surface over a convex feasible region; any local dip is the global dip |
| Epigraph form | min t s.t. (x,t)∈epi(f), x∈C (equivalent hypograph reformulation) |
| Problem class | LP (f,g linear), QP (f quadratic, g linear), SOCP, SDP — each a special case with standard solvers |

**Fundamental theorem (statement + proof sketch):**
Theorem: If f is convex and x* is a local minimum of f over convex C, then x* is a GLOBAL minimum.

Proof sketch: Suppose x** is a better point with f(x**)<f(x*). For t∈(0,1), consider z_t=tx*+(1−t)x**∈C (convexity of C). By convexity of f: f(z_t)≤tf(x*)+(1−t)f(x**)<f(x*) (since f(x**)<f(x*)). For t close to 1, z_t is arbitrarily close to x* but f(z_t)<f(x*) — contradicting x* being a LOCAL minimum. ✗ Contradiction. ✓

**P49 checkpoint:**
- CORRECT → "Any local minimum of a convex function over a convex set is global. This is the central guarantee enabling efficient optimisation." → A02
- PARTIAL (knows the theorem, can't prove it) → "Why does the contradiction work? What property of C is used to ensure z_t is feasible?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For f(x)=x², what are the local minima? For f(x)=sin(x), what are the local minima?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Constrained optimality condition:**

Unconstrained (C=ℝⁿ): x* is optimal ↔ ∇f(x*)=0.

Constrained (C≠ℝⁿ): x* is optimal ↔ 〈∇f(x*), y−x*〉≥0 for all y∈C.

Intuition: −∇f(x*) is the descent direction. If x* is on the boundary of C, you cannot move in the descent direction without leaving C. The condition says: at x*, every feasible direction y−x* is either an ascent direction (positive inner product with gradient) or zero.

**Projected gradient descent implementation:**
x_{k+1}=Π_C(x_k−α∇f(x_k))
where Π_C is the projection onto C (nearest point in C).

**Gate question (MC-2):** "The problem is min x²+y² s.t. x+y≥1. The unconstrained minimum is (0,0) but (0,0) is infeasible. A student sets ∇f(x,y)=(2x,2y)=0 and says (0,0) is optimal. What is the actual constrained optimum?"

The feasible set C={x+y≥1} is a half-plane. The optimum is the projection of (0,0) onto the boundary x+y=1: x*=y*=1/2, f(1/2,1/2)=1/2. At (1/2,1/2): ∇f=(1,1). Feasible direction along boundary: (1,−1). 〈(1,1),(1,−1)〉=0 ✓. Inward feasible direction: (1,1). 〈(1,1),(1,1)〉=2>0 ✓ (moving inward increases f). The variational inequality is satisfied.

**P49 checkpoint:**
- CORRECT → "Constrained optimum: variational inequality, not just ∇f=0. Projected gradient descent enforces feasibility at each step." → A03
- PARTIAL (understands constraint but can't apply VI) → "At x*=(1/2,1/2), is the gradient pointing into or out of the feasible set?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "What is the projection of (0,0) onto the line x+y=1?" → TB-R02 → A03

### A03 — P04 PATTERN INDUCTION
**Problem class gallery — recognising convex structure:**

| Problem | f(x) | Feasible set C | Class | Standard solver |
|---|---|---|---|---|
| min cᵀx s.t. Ax≤b | Linear | Polyhedron (convex) | LP | simplex, interior point |
| min ½xᵀQx+cᵀx s.t. Ax≤b, Q⪰0 | Quadratic (convex) | Polyhedron | QP | quadprog, OSQP |
| min ½‖Ax−b‖² (least squares) | Quadratic | ℝⁿ | Unconstrained QP | closed form: x=(AᵀA)⁻¹Aᵀb |
| min f s.t. ‖Aᵢx+bᵢ‖≤cᵢᵀx+dᵢ | Convex | Second-order cone | SOCP | ECOS, SCS |
| min tr(CX) s.t. X⪰0, linear constraints | Linear in X | PSD cone | SDP | SCS, MOSEK |
| min f(x) s.t. gᵢ(x)≤0, gᵢ nonconvex | Convex | Non-convex | Non-convex | no polynomial-time guarantee |

**Pattern: Is this problem convex?** Check (1) f convex, (2) all inequality constraints gᵢ convex (gᵢ(x)≤0 defines a convex set when gᵢ convex), (3) equality constraints hⱼ affine.

**P49 checkpoint:**
- CORRECT → "Three checks: convex objective, convex inequality constraints, affine equality constraints. Matching the class selects the right solver." → A04
- PARTIAL (knows LP/QP, unclear on non-convex constraints) → "If the constraint is x₁²+x₂²≥1 (exterior of unit disk), is the feasible set convex?" → TB-R03 → A04
- INCORRECT → TB-R03 → A04
- NO_RESPONSE → "Is f(x)=‖x‖² convex? Is the feasible set {x: xᵀQx≤1, Q⪰0} convex?" → TB-R03 → A04

### A04 — P06 CONTRAST PAIR
**Convex vs. non-convex problem — same functional form, different curvature:**

| Feature | min (x−1)²+(y−1)² | min (x²−1)²+(y²−1)² |
|---|---|---|
| Objective convex? | Yes | No (quartic, non-convex) |
| Local minima | One: (1,1) | Multiple: (±1,±1) |
| Gradient descent | Converges globally | May converge to any of 4 local minima |
| Guarantees | Unique global optimum | No polynomial-time guarantee in general |

**Algorithm selection rule:** Convex problems → certified global optimum via gradient descent/interior-point methods in polynomial time. Non-convex → heuristics (SGD, evolutionary algorithms, restarts) without convergence guarantee.

**P49 checkpoint:**
- CORRECT → "Non-convex = potentially many local minima, no global guarantee. Convex = single global minimum, polynomial-time solvable." → Gate (P91)
- PARTIAL → "Can gradient descent find (−1,−1) and (1,1) as local minima of (x²−1)²+(y²−1)²? Which is global?" → TB-R03 (extend) → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Plot (x²−1)² for x∈[−2,2]. How many local minima does it have?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 LOCAL-IS-NOT-GLOBAL-FOR-CONVEX):**
Step 1 — "For non-convex f: local ≠ global (many bowl shapes, each with its own bottom). For convex f: only one bowl — any bottom IS the global bottom." Step 2 — Compare: f₁(x)=x² (convex, one minimum at x=0); f₂(x)=sin(x) (non-convex, infinitely many local minima). Step 3 — Return to the proof: the key step is f(z_t)<f(x*) for z_t near x* (using convexity of f). Non-convex f doesn't give this bound.

**TB-R02 (MC-2 GRADIENT-ZERO-SUFFICIENT-CONSTRAINED):**
Step 1 — "∇f(x*)=0 means 'no unconstrained descent direction.' But on the boundary of C, the gradient can point OUTWARD (infeasible direction) while ALL feasible directions go uphill. The gradient need not be zero — it just can't point feasibly downhill." Step 2 — Sketch: x* is the leftmost point of a disk. ∇f(x*) points LEFT (outside the disk). No feasible direction is to the left. But ∇f(x*)≠0. Step 3 — VI condition: 〈∇f(x*),y−x*〉≥0 for all feasible y checks that no feasible descent exists.

**TB-R03 (MC-3 CONVEXITY-OF-FEASIBLE-SET-ENOUGH):**
Step 1 — "Two requirements: convex feasible set AND convex objective. Satisfying only one is insufficient." Step 2 — Non-convex f over convex C: min sin(x) s.t. x∈[0,4π]. Feasible set = interval (convex). Objective sin(x) is non-convex. Local minima at x=3π/2, 7π/2 etc.; global minimum at x=3π/2 (both are local minima with the same value here — a fortunate special case). More generally, the problem can have many strictly different local minima. Step 3 — Non-convex C with convex f: min x² s.t. x∈[−2,−1]∪[1,2]. f is convex; C is non-convex. Two local (and global, here tied) minima at x=−1 and x=1. Only knowing f is convex doesn't save you.

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Show that the problem min e^x s.t. x∈[0,1] is convex. Find the optimal x* and verify the variational inequality condition at x*.
2. Classify each problem as LP, QP, SOCP, SDP, or non-convex: (a) min xᵀx s.t. Ax=b; (b) min |x|+|y| s.t. x+y≤3; (c) min xᵀQx s.t. ‖x‖₂≤1, Q not PSD; (d) min cᵀx s.t. xᵀx≤1.
3. For min ½‖x‖² s.t. aᵀx≥b, apply the projected gradient update once from x₀=0. (Projection onto the half-space aᵀx≥b is x+max(0,b−aᵀx)a/‖a‖².)
4. A student claims: "I ran gradient descent on a convex function and it got stuck at a non-optimal point because the gradient became very small but non-zero." Is this a valid failure mode? Under what conditions on the step size does this happen?

**P55 — Reflect & Consolidate:** "Convex optimization: local=global (guaranteed), polynomial-time solvable, mature solvers. The two requirements are: convex objective AND convex feasible set."

**P76 — Transfer Probe (Independence mode):**
The proximal gradient method: for min f(x)+g(x) where f is smooth convex and g is convex but non-smooth (e.g., g(x)=λ‖x‖₁, the LASSO penalty), the update is x_{k+1}=prox_{αg}(x_k−α∇f(x_k)) where prox_{αg}(v)=argmin_x{g(x)+½α⁻¹‖x−v‖²}. Show that when g=0, the proximal gradient step reduces to the standard gradient descent step. Compute prox_{αλ‖·‖₁}(v) (the soft-thresholding operator: sign(v)·max(|v|−αλ,0)). Explain why the LASSO problem is convex even though g is non-differentiable.

**P55 — Reflect & Consolidate:** "Proximal gradient extends convex optimisation to non-smooth objectives by splitting: smooth part handled by gradient, non-smooth part by the proximal operator. LASSO is convex despite the non-differentiability of ‖·‖₁."

**P75 — Mastery Assessment:**
"The elastic net problem: min ½‖Ax−b‖²+λ₁‖x‖₁+½λ₂‖x‖². (a) Is the objective convex? Justify by showing each term's Hessian. (b) Is the feasible set convex? (c) If you apply gradient descent to just the smooth part ½‖Ax−b‖²+½λ₂‖x‖², what is the gradient? (d) Why can't you directly apply gradient descent to the full objective? What do you use instead?"

**P55 — Reflect & Consolidate:** "Elastic net is a convex but non-smooth objective. The ‖·‖₁ term requires proximal methods. This is the standard setup for sparse learning in high dimensions."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; advance to math.opt.linear-programming and/or math.opt.duality
- Score 3/5 → REVIEW local=global theorem and optimality conditions; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.convex-function or math.opt.convex-set; reassign

**P78 — Completion:** Convex optimization certified. Student can verify problem convexity, apply the fundamental theorem, state optimality conditions, and classify problems into LP/QP/SDP/SOCP.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Proximal gradient method — handles non-smooth convex f+g; reduces to GD when g=0; LASSO as example
Skill tested: Extend gradient descent to the non-smooth case; verify LASSO convexity; compute soft-thresholding operator

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

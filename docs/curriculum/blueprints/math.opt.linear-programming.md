# Blueprint: math.opt.linear-programming

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.linear-programming |
| Title | Linear Programming |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 7 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.opt.convex-optimization, math.linalg.linear-system |
| Cross-links | — |
| Unlocks | math.opt.quadratic-programming, math.opt.integer-programming |

## Component 1 — Learning Objective
Given a linear program in standard form (min cᵀx s.t. Ax=b, x≥0), the student identifies the feasible polytope, states that the optimal solution occurs at a vertex (basic feasible solution), executes two iterations of the simplex method (pivot selection and basis update), formulates the dual LP and applies LP duality (weak and strong duality, complementary slackness), and selects between simplex and interior-point methods by problem structure.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit tableau; pivot tables; 2D geometric picture of feasible polytope with objective contour)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | OPTIMAL-INTERIOR-LP | Student believes the LP optimum can occur in the interior of the feasible polytope; does not know the extreme-point (vertex) theorem | Type 2 — perceptual intuition (smooth optimisation finds interior optima; LP looks the same) |
| MC-2 | DUAL-ALWAYS-EQUALS-PRIMAL | Student applies strong duality unconditionally; does not check whether both primal and dual are feasible (strong duality fails if primal is infeasible or unbounded) | Type 5 — instruction-induced ("LP duality" is taught as strong duality; caveats are added later) |
| MC-3 | SIMPLEX-EXPONENTIAL-IN-PRACTICE | Student dismisses simplex as exponential-time and therefore impractical; does not know that simplex runs in polynomial expected time and dominates interior-point for sparse/warm-started problems | Type 3 — language contamination (worst-case exponential ≠ typical exponential; courses often emphasise worst case) |

## Component 4 — Session TA Cap
**Cap = 9** (hrs = 7 → cap 9)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of an LP:**

| Form | Instance |
|---|---|
| Inequality form | min cᵀx s.t. Ax≤b, x≥0 |
| Standard form | min cᵀx s.t. Ax=b, x≥0 (add slacks: Ax+s=b, s≥0) |
| Geometric (2D) | Feasible set = convex polytope; objective = hyperplane sliding in direction c; optimum = first vertex touched |
| Extreme point theorem | If a finite optimum exists, at least one optimal solution is a vertex (basic feasible solution: n−m zero variables, m non-zero) |

**2D worked example:**
min −x₁−2x₂ s.t. x₁+x₂≤4, x₁≤3, x₂≤3, x₁,x₂≥0.

Vertices: (0,0),(3,0),(3,1),(0,3),(1,3). Evaluate objective:
- (0,0): 0; (3,0): −3; (3,1): −5; (1,3): −7; (0,3): −6.

Optimum at (1,3), value −7. Geometric picture: objective contour −x₁−2x₂=c slides in direction (−1,−2) until it touches (1,3).

**P49 checkpoint:**
- CORRECT → "LP optimum is always at a vertex. The simplex method walks from vertex to vertex along edges." → A02
- PARTIAL (finds optimum numerically, misses vertex interpretation) → "Can the optimum be at (2,2)? Check if (2,2) is a vertex of the feasible polytope." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "How many vertices does the feasible polytope in the 2D example have?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Simplex method — pattern gallery of two iterations:**

Standard form: min cᵀx s.t. Ax=b, x≥0. Initial BFS: slack variables as basis.

Example (converted): min −x₁−2x₂ s.t. x₁+x₂+s₁=4, x₁+s₂=3, x₂+s₃=3, x₁,x₂,s₁,s₂,s₃≥0.

**Iteration 1:**
- Basis = {s₁,s₂,s₃}, BFS: x₁=x₂=0, s₁=4,s₂=3,s₃=3. Objective=0.
- Reduced costs: c̄₁=−1, c̄₂=−2. Most negative: x₂ enters.
- Ratios (minimum ratio test): 4/1=4, 3/∞=∞, 3/1=3. Min ratio at row 3 → s₃ leaves.
- Pivot on (row 3, col x₂): new basis {s₁,s₂,x₂}.

**Iteration 2:**
- New BFS: x₂=3, x₁=0, s₁=1, s₂=3. Objective=−6.
- Recompute reduced costs: c̄₁=1 (updated via pivot). Wait, let me recalculate. After pivoting x₂ in: row 3 becomes x₂=3−s₃. Updated row 1: s₁=4−x₁−x₂=4−x₁−(3−s₃)=1−x₁+s₃. Updated objective: −x₁−2x₂=−x₁−2(3−s₃)=−6−x₁+2s₃. Reduced cost of x₁=−1 (still negative → x₁ enters). Minimum ratio test on updated rows: row1: 1/1=1, row2: 3/1=3. x₁ enters via row1 (s₁ leaves). New BFS: x₁=1,x₂=3, objective=−7.
- All reduced costs ≥0 → optimal.

**P49 checkpoint:**
- CORRECT → "Simplex: enter most-negative-reduced-cost variable, pivot via minimum-ratio-test, repeat until no negative reduced costs." → A03
- PARTIAL (understands pivot, can't do ratio test) → "The minimum ratio test prevents which variable from going negative?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "In iteration 1, why do we compute 4/1, ∞, 3/1 as ratios? What are we checking?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**LP duality — primal vs. dual:**

Primal (P): min cᵀx s.t. Ax≥b, x≥0. Dual (D): max bᵀy s.t. Aᵀy≤c, y≥0.

| Property | Statement |
|---|---|
| Weak duality | For any primal feasible x and dual feasible y: cᵀx≥bᵀy |
| Strong duality | If (P) has a finite optimum, so does (D) and their optimal values are equal |
| Complementary slackness | x*,y* optimal ↔ (c−Aᵀy*)ᵢxᵢ*=0 AND (Ax*−b)ⱼyⱼ*=0 for all i,j |
| Infeasible/unbounded | If (P) infeasible → (D) infeasible or unbounded. If (P) unbounded → (D) infeasible. |

**Example:** For our 2D LP, primal optimum = −7. The dual is: max 4y₁+3y₂+3y₃ s.t. y₁+y₂≤1, y₁+y₃≤2, y₁,y₂,y₃≥0. Dual optimum should also equal −7 by strong duality.

Complementary slackness check at (x₁*=1,x₂*=3): Active constraints: x₁+x₂=4 (s₁=0), x₂=3 (s₃=0), x₁>0, x₂>0 → both objective constraints active. Dual variables: y₁ (for x₁+x₂≤4), y₂ (for x₁≤3), y₃ (for x₂≤3). CS: y₂·(3−1)=2y₂=0 → y₂=0; y₁+y₃=2, y₁=1 → y₃=1. Check dual feasibility: y₁+y₂=1≤1 ✓, y₁+y₃=2≤2 ✓. Dual value: 4·1+3·0+3·1=7 ✓ (objective is min −(−7)=7 in this sign convention).

**P49 checkpoint:**
- CORRECT → "Weak duality: primal ≥ dual always. Strong duality: equal at optimum. Complementary slackness: optimal iff each constraint-variable pair has at least one zero." → A04
- PARTIAL (knows duality theorem, can't apply CS) → "At the primal optimum, x₁*=1>0 — what does CS say about the dual constraint involving x₁?" → TB-R02 (extend) → A04
- INCORRECT → TB-R02 → A04
- NO_RESPONSE → "Weak duality says cᵀx≥bᵀy. If primal value is 7 and dual value is 5, is this consistent?" → TB-R02 → A04

### A04 — P11 REPRESENTATION SHIFT (second pass — algorithm comparison)
**Simplex vs. Interior-Point:**

| Feature | Simplex | Interior-Point |
|---|---|---|
| Path taken | Vertex-to-vertex along edges | Through interior of polytope |
| Worst-case complexity | Exponential (Klee-Minty) | Polynomial O(n³·⁵) |
| Practical speed | Fast on sparse/structured LPs | Better for dense LPs, large-scale |
| Warm start | Easy (start from known BFS) | Harder (interior points only) |
| Degeneracy | Can cycle (Bland's rule fixes) | No cycling |
| Used in | Network flows, LP relaxations of IPs | Large dense LPs, ML (LASSO) |

**P49 checkpoint:**
- CORRECT → "Simplex is vertex-walking; interior-point is path-through-middle. Both solve LP in practice; choice depends on problem structure." → Gate (P91)
- PARTIAL → "For re-optimising after a small change to b, which algorithm benefits from warm-starting?" → Gate (after brief answer)
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "If you've already solved an LP and slightly change one right-hand side value b_i, do you want to start from scratch or from the previous optimal basis?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 OPTIMAL-INTERIOR-LP):**
Step 1 — "Linear objective: no curvature. If x is in the interior of the feasible polytope, moving in the direction −c decreases the objective AND stays feasible (for small steps). So the interior is never optimal." Step 2 — Geometric: draw the 2D polytope; slide the objective contour from outside; it first hits the boundary, then a vertex. Step 3 — Formal: if x is interior and cᵀx<0 in some direction, x+εd with d=−c/‖c‖ is still feasible for small ε>0 and has strictly lower objective. ✗ interior optimality.

**TB-R02 (MC-2 DUAL-ALWAYS-EQUALS-PRIMAL / simplex ratio test):**
For ratio test: "Without the minimum ratio test, the entering variable would increase past the point where a basic variable hits zero, making that variable negative (infeasible). The ratio test finds the tightest constraint — the variable that reaches zero first."
For duality: "Strong duality requires both (P) and (D) to be feasible. If (P) is infeasible (empty feasible set), (D) could be infeasible or have an unbounded dual optimal value (this isn't a dual optimal in the standard sense). Always check feasibility of both."

**TB-R03 (MC-3 SIMPLEX-EXPONENTIAL-IN-PRACTICE):**
Step 1 — "Worst-case ≠ typical case. The Klee-Minty cube is a pathological construction that simplex visits exponentially many vertices — but it never arises in practice." Step 2 — "Empirically: simplex takes O(m) to O(2m) pivots on problems with m constraints — far fewer than the 2ⁿ worst case." Step 3 — "Interior-point has polynomial WORST-CASE complexity but is slower per iteration (dense linear algebra) and can't warm-start. For LP relaxations in branch-and-bound (IP), simplex's warm-start is critical."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Convert min 3x₁+2x₂ s.t. x₁+x₂≥2, 2x₁+x₂≥3, x₁,x₂≥0 to standard form and identify the initial BFS (use artificial variables if needed to state the starting basis).
2. Apply two simplex iterations to the LP: min −3x₁−5x₂ s.t. x₁+x₂+s₁=4, 2x₁+s₂=6, x₂+s₃=4. Show the tableau after each pivot.
3. Write the dual of: min cᵀx s.t. Ax≥b, x≥0. Apply weak duality to show that if the primal is unbounded below, the dual is infeasible.
4. At the optimal primal solution x*=(1,2,0), dual solution y*=(2,1), verify complementary slackness for the LP: min 4x₁+3x₂+2x₃ s.t. x₁+x₂+x₃≥3, 2x₁+x₂≥4.

**P55 — Reflect & Consolidate:** "LP: linear objective over a polytope; optimum at a vertex; simplex walks vertices; interior-point traverses interior. Duality: primal min = dual max at optimum (strong duality for feasible LPs)."

**P76 — Transfer Probe (Independence mode):**
Network flow LP: Given a directed graph G=(V,E), source s, sink t, and capacities uₑ on each edge, the max-flow LP is max Σₑ:tail=s xₑ s.t. Σₑ:head=v xₑ = Σₑ:tail=v xₑ for all v≠s,t (flow conservation), 0≤xₑ≤uₑ. Write the dual of this LP. Show that the dual variables correspond to s-t cuts and that the dual objective equals the capacity of the minimum cut. (This proves the max-flow min-cut theorem via LP duality.)

**P55 — Reflect & Consolidate:** "Max-flow min-cut is LP duality applied to network flows. This is the template for combinatorial duality: primal variables are flows, dual variables are cuts."

**P75 — Mastery Assessment:**
"The LP: min 2x₁+3x₂+4x₃ s.t. x₁+x₂+x₃≥5, x₁+2x₂≥4, x₁,x₂,x₃≥0. (a) Find the optimal solution geometrically or by enumeration of vertices. (b) Write and solve the dual LP. (c) Verify strong duality (primal opt = dual opt). (d) Identify which complementary slackness conditions are active at optimality."

**P55 — Reflect & Consolidate:** "The duality gap is zero for all feasible LPs (Farkas/strong duality). Complementary slackness gives a certificate of optimality: checking primal+dual feasibility + CS is enough to certify the solution."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; advance to math.opt.quadratic-programming and/or math.opt.integer-programming
- Score 3/5 → REVIEW simplex pivot rules and strong duality conditions; replay A02–A03
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.convex-optimization or math.linalg.linear-system; reassign

**P78 — Completion:** Linear programming certified. Student can convert to standard form, execute simplex iterations, write and solve the dual, and apply LP duality and complementary slackness.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Max-flow min-cut theorem via LP duality (network flow LP → dual variables = cuts → duality proves max-flow = min-cut)
Skill tested: Write the dual of a structured LP; interpret dual variables combinatorially; apply strong duality to prove a combinatorial theorem

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

# Blueprint: math.opt.integer-programming

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.integer-programming |
| name | Integer Programming |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 7 |
| Mastery threshold | 0.70 |
| MAMR | 4/5 |
| Prerequisites | math.opt.linear-programming |
| Cross-links | math.disc.complexity-classes |
| Unlocks | — |

## Component 1 — Learning Objective
Given an integer program min cᵀx s.t. Ax≤b, x∈ℤⁿ, the student distinguishes ILP/MIP/BIP, explains why integrality destroys convexity (discrete feasible set), solves a 2-variable ILP by LP relaxation followed by branch-and-bound, explains the integrality gap and when it is zero (total unimodularity), and situates the NP-hardness of ILP within math.disc.complexity-classes via the 3-SAT reduction.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit LP relaxation tableau; branch-and-bound tree; 2D integer lattice picture)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | IP-IS-JUST-LP-WITH-ROUNDING | Student solves the LP relaxation and rounds the fractional solution to the nearest integer, believing this gives an optimal or near-optimal IP solution; does not know that rounding can violate constraints or give solutions arbitrarily far from optimal | Type 1 — overgeneralization (rounding works for some special cases like network flows; students generalize this to all IPs) |
| MC-2 | BRANCH-AND-BOUND-IS-BRUTE-FORCE | Student equates branch-and-bound with exhaustive enumeration of all integer points; does not see that LP relaxation bounds prune large subtrees, making B&B far more efficient in practice than 2ⁿ enumeration | Type 3 — language contamination ("branch" sounds like branching over all possibilities; the "bound" that prunes subtrees is missed) |
| MC-3 | LP-RELAXATION-ALWAYS-TIGHT | Student assumes the LP relaxation optimal value equals the IP optimal value, or that the LP optimal solution is always integer or near-integer; does not know that the integrality gap can be arbitrarily large | Type 5 — instruction-induced (network flow LPs are introduced early and always have integer optima due to total unimodularity; students over-generalise this special property to all IPs) |

## Component 4 — Session TA Cap
**Cap = 9** (hrs = 7 → cap 9)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of integer programming:**

| Form | Instance |
|---|---|
| ILP (all integer) | min cᵀx s.t. Ax≤b, x∈ℤⁿ |
| MIP (mixed integer) | min cᵀx+dᵀy s.t. Ax+By≤b, x∈ℤᵏ, y∈ℝⁿ⁻ᵏ |
| BIP (binary) | min cᵀx s.t. Ax≤b, x∈{0,1}ⁿ |
| Geometric | Feasible set = finite lattice of points (non-convex); LP polytope may have no integer vertex near LP optimum |

**Why rounding fails — counter-example:**
max x₁+x₂ s.t. 2x₁+2x₂≤3, x₁,x₂≥0, x₁,x₂∈ℤ.

LP relaxation: x₁=x₂=¾, obj=1.5. Round to nearest integer (1,1): 2+2=4>3, infeasible. Round down (0,0): obj=0. Actual IP optimum: (1,0) or (0,1), obj=1. Rounding gives obj=0, which is 0% of optimal.

**Complexity:**
| Class | Method | Complexity |
|---|---|---|
| LP | Simplex / interior-point | Polynomial (in theory) |
| Network flow ILP | LP relaxation | Polynomial (TU → LP=IP) |
| General ILP | Branch-and-bound + cuts | NP-hard in general |
| Binary ILP | B&B | NP-hard (contains 3-SAT) |

**P49 checkpoint:**
- CORRECT → "IP restricts LP to integer solutions. Feasible set is discrete, non-convex. LP relaxation gives a bound but not the solution. Rounding is not valid. NP-hard in general." → A02
- PARTIAL (knows rounding fails, doesn't know why) → "If rounding the LP solution violates a constraint, what does that tell you about the integrality gap?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "If the LP optimum is x*=(1.7,0.3) satisfying 2x₁+x₂≤4, does rounding to (2,0) also satisfy 2(2)+0=4≤4? What about (1,0)? Which is better?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**LP relaxation and integrality gap — pattern gallery:**

| Problem class | LP relaxation integer? | Integrality gap | Reason |
|---|---|---|---|
| Network flow | Always | 0 | Constraint matrix TU (0,±1 entries; each column ≤1 of each sign) |
| Assignment / bipartite matching | Always | 0 | TU (bipartite incidence matrix) |
| Knapsack (general) | No | Can be large | No TU structure |
| Travelling Salesman (TSP) | No | Up to O(n) | Subtour elimination not TU |
| 0/1 programs | No | Unbounded | Combinatorial; no structural shortcut |

**Total unimodularity (TU) criterion:** matrix A is TU if every square submatrix has determinant ∈ {−1, 0, 1}. When A is TU and b is integer, every vertex of the LP polytope {x: Ax≤b, x≥0} is integer → LP relaxation solves the IP exactly.

**Integrality gap example:**
max x₁+x₂ s.t. x₁+x₂≤1.5, x₁≤1, x₂≤1, x₁,x₂≥0, x₁,x₂∈ℤ.

LP opt: x₁=1,x₂=0.5, obj=1.5. But x₂ must be integer: x₂∈{0,1}. x₂=1: x₁+1≤1.5→x₁≤0.5, so x₁=0; obj=1. x₂=0: x₁=1; obj=1. IP opt=1. Gap=0.5 (LP overestimates by 50%).

**P49 checkpoint:**
- CORRECT → "Integrality gap=LP opt−IP opt. Gap=0 iff matrix A is TU. For general IPs, LP gives a bound only; explicit search (B&B or cutting planes) needed." → A03
- PARTIAL (knows TU concept, can't check it) → "For A=[[1,1],[1,0]], compute the determinants of all 1×1 and 2×2 submatrices. Is A TU?" → TB-R03 → A03
- INCORRECT → TB-R03 → A03
- NO_RESPONSE → "Why does a network flow LP always have an integer optimal solution? What structural property of the incidence matrix causes this?" → TB-R03 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Branch-and-bound — gate:**

**Algorithm:**
1. Node 0: solve LP relaxation. If integer → done. If fractional, pick variable xⱼ with fractional value f.
2. Branch: create left child (add xⱼ≤⌊f⌋) and right child (add xⱼ≥⌈f⌉).
3. At each child: solve LP relaxation. If integer → candidate (update incumbent if better). If infeasible → prune. If LP bound ≥ incumbent (for min) → prune. Else recurse.

**Worked 2D example:**
max x₁+x₂ s.t. x₁+x₂≤3.7, x₁≤2.5, x₂≤2.5, x₁,x₂≥0, x₁,x₂∈ℤ.

Node 0: LP opt x₁=2.5, x₂=1.2, obj=3.7. Fractional x₂. Branch on x₂.

Left (x₂≤1): LP opt x₁=2.5, x₂=1, obj=3.5. Fractional x₁. Branch on x₁.
  Left-Left (x₁≤2): x*=(2,1), obj=3. Integer ✓. Incumbent=3.
  Left-Right (x₁≥3): 3+1=4>3.7. Infeasible. Prune.

Right (x₂≥2): LP opt x₁=1.7, x₂=2, obj=3.7. LP bound=3.7>3 (incumbent). Branch on x₁.
  Right-Left (x₁≤1): x*=(1,2), obj=3. Integer ✓. Tie with incumbent.
  Right-Right (x₁≥2): 2+2=4>3.7. Infeasible. Prune.

IP optimum: 3, attained at (2,1) and (1,2). Explored 5 nodes, not 2²·... lattice points.

**Gate question (MC-2):** "A student says B&B explores 2ⁿ nodes for n binary variables. Is this correct?"

No. The LP bound at each node prunes entire subtrees. A node with LP value ≥ incumbent (min) or ≤ incumbent (max) prunes all its descendants — no LP there even needs to be solved. In practice B&B explores far fewer than 2ⁿ nodes for structured problems. Worst case IS exponential, confirming NP-hardness — but worst case ≠ typical case.

**P49 checkpoint:**
- CORRECT → "B&B = LP relaxation at each node gives a bound; prune when bound ≤ incumbent (max) or ≥ incumbent (min). Not brute force — pruning makes it practical. Worst-case exponential, confirming NP-hardness." → A04
- PARTIAL (understands branching, misses the pruning rule) → "When exactly do you prune a B&B node in a maximisation problem?" → TB-R02 → A04
- INCORRECT → TB-R02 → A04
- NO_RESPONSE → "In the worked example, why was the node x₂≤1, x₁≥3 discarded without solving?" → TB-R02 → A04

### A04 — P06 CONTRAST PAIR
**Branch-and-bound vs. cutting planes:**

**Gomory cut:** From a fractional LP tableau row: if variable xᵢ=fᵢ (fractional) appears with fractional coefficients, Gomory generates a valid inequality that all integer feasible points satisfy but the current LP optimum violates. Adding the cut to the LP and re-solving makes the LP relaxation tighter.

**Example:** LP optimal has x₁=1.5 with row x₁+0.5x₃=1.5 (x₃ slack). Gomory cut: x₁+0.5x₃≥2 (derived from floor-ceiling algebra) eliminates x₁=1.5 while keeping all integer solutions.

| Feature | Branch-and-Bound | Cutting Planes (Gomory) |
|---|---|---|
| Approach | Binary tree; split domain on fractional variable | Add valid inequalities; tighten single LP |
| Theoretical guarantee | Finite (bounded feasible region) | Converges in theory (can be slow) |
| Practical strength | Excellent with branching heuristics + presolve | Strong cuts (MIR, clique, Chvátal-Gomory) essential |
| Combined | Branch-and-Cut: cuts at each B&B node | Industry standard (CPLEX, Gurobi, SCIP) |
| Worst-case complexity | Exponential | Exponential |

**Branch-and-Cut (modern standard):** apply cutting planes at root to tighten the LP relaxation, then branch with LP bounds, adding more cuts at each node. Branching heuristics (strong branching, pseudocosts) and presolve reduce the effective tree by orders of magnitude. Industrial IP solvers routinely handle instances with millions of variables.

**P49 checkpoint:**
- CORRECT → "B&B = tree with LP bounds for pruning. Cutting planes = add valid inequalities until LP is integer. Branch-and-Cut = both. All are exponential worst-case (IP is NP-hard), but modern solvers make large structured IPs tractable." → Gate (P91)
- PARTIAL (understands B&B, unclear on what a cut is) → "A Gomory cut is a valid inequality that all integer-feasible points satisfy. Why doesn't adding it remove any integer solutions?" → TB-R03 (extend) → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "If the LP optimum is x₁=1.5 and x₁ must be integer, write the two constraints that separate feasible integer values. Which one goes in the left branch and which in the right?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 IP-IS-JUST-LP-WITH-ROUNDING):**
Step 1 — "Rounding has two failure modes: (1) rounding up may violate a constraint (making the rounded point infeasible); (2) even feasible rounding may be far from optimal." Step 2 — Concrete: max 1000x₁+999x₂ s.t. x₁+x₂≤0.9, xᵢ∈{0,1}. LP opt: x₁=0.9,x₂=0,obj=900. Round up x₁=1: 1>0.9, infeasible. Round down x₁=0: obj=0. IP opt=0 (no feasible integer solution with x₁+x₂≤0.9 other than (0,0)). Rounding fails entirely. Step 3 — "The correct approach is B&B with LP relaxation bounds. Rounding is a fast heuristic for initial feasible solutions inside B&B, not a substitute for exact optimisation. For guaranteed optimality, solve the full B&B tree."

**TB-R02 (MC-2 BRANCH-AND-BOUND-IS-BRUTE-FORCE):**
Step 1 — "B&B generates a tree of subproblems, each obtained by adding one bound constraint. Key: the LP relaxation at each node is an UPPER BOUND (for max) on the best integer solution reachable from that node." Step 2 — Pruning rule: if LP bound at node N ≤ current incumbent (for max), stop — N's entire subtree cannot improve the solution. This cuts off potentially half the tree at every level. Step 3 — "For network flow IPs: LP relaxation is always integer → root node terminates immediately (0 branches). For structured BIPs: heavy pruning makes effective tree ≪ 2ⁿ. Exponential worst case exists (Klee-Minty analogue for B&B) but rarely arises on real problems."

**TB-R03 (MC-3 LP-RELAXATION-ALWAYS-TIGHT):**
Step 1 — "TU is a rare structural property. Network flow and assignment matrices are TU because they are 0/1 matrices where each column sums to exactly 0 or ±1 in a balanced way. Knapsack, TSP, scheduling problems almost never have TU constraint matrices." Step 2 — Integrality gap can be arbitrarily large: the TSP LP relaxation (with subtour elimination) can give fractional tours that are convex combinations of multiple integer tours, with no single integer-feasible tour near the LP optimal. Christofides algorithm gets within 3/2 of LP optimal, but this gap is structural, not a fluke. Step 3 — "The LP relaxation gives a bound (lower bound for min, upper bound for max) and is a starting point for B&B — not the solution. Always check for TU before trusting LP to solve the IP directly."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Solve by branch-and-bound (draw the full tree): max 2x₁+3x₂ s.t. x₁+2x₂≤5, 3x₁+x₂≤6, x₁,x₂≥0, x₁,x₂∈ℤ. Show LP relaxation and integer solution at each node.
2. 0/1 knapsack: max 4x₁+5x₂+3x₃ s.t. 2x₁+3x₂+x₃≤5, xᵢ∈{0,1}. (a) Solve the LP relaxation. (b) Is the LP solution integer? (c) What is the integrality gap?
3. Explain why 3-SAT reduces to 0/1 ILP: for the clause (x₁∨¬x₂∨x₃), write a linear inequality over binary variables y₁,y₂,y₃∈{0,1} (where yᵢ=1 iff xᵢ=true) that is satisfied iff the clause is satisfied. Use this to argue that 0/1 ILP is NP-hard.
4. A production schedule: 3 product types, each batch is an integer. Formulate as ILP. The constraint matrix A has columns corresponding to products and rows to resources. Is A likely to be TU? What would TU imply?

**P55 — Reflect & Consolidate:** "IP adds integrality to LP. Feasible set is discrete; LP gives a lower/upper bound. B&B: LP bounds prune the search tree — NOT brute force. TU matrices give zero integrality gap. Cutting planes add valid inequalities. NP-hard in general via 3-SAT reduction."

**P76 — Transfer Probe (Cross-link mode: math.disc.complexity-classes):**
Using math.disc.complexity-classes concepts: (a) Show 0/1 ILP is in NP: given a binary vector x, the constraint check Ax≤b can be done in polynomial time. (b) Show 3-SAT ≤_P 0/1 ILP: for a 3-SAT instance with n variables and m clauses, construct an 0/1 ILP with n binary variables yᵢ (yᵢ=1 iff xᵢ=true) and m constraints (one per clause) in O(n+m) time. (c) Conclude 0/1 ILP is NP-complete. (d) Reconcile NP-hardness with the fact that CPLEX solves million-variable IPs in hours: worst-case exponential ≠ typical exponential; structure + cuts + branching heuristics make it tractable.

**P55 — Reflect & Consolidate:** "NP-completeness is a worst-case statement over all instances. Modern IP solvers exploit problem structure (strong cuts, constraint propagation, warm-start from LP, presolve) to make real-world IPs tractable. The NP-hardness result tells us there is no polynomial-time EXACT algorithm for ALL instances — not that IP is practically unsolvable."

**P75 — Mastery Assessment:**
"The IP: min x₁+x₂ s.t. 3x₁+2x₂≥12, x₁+x₂≤6, x₁,x₂≥0, x₁,x₂∈ℤ. (a) Solve the LP relaxation and report the optimal value. (b) Draw the B&B tree for at least two levels of branching. (c) Report the IP optimal solution and value. (d) Compute the integrality gap. (e) Is the constraint matrix TU? Given your answer, should you have expected the LP relaxation to be integer?"

**P55 — Reflect & Consolidate:** "B&B terminates with a provably optimal IP solution when all nodes are pruned or integer. The integrality gap quantifies how much the LP overestimates (for max) or underestimates (for min) the true IP value. TU matrices are the closed-form exception where LP solves IP exactly."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.integer-programming complete
- Score 3/5 → REVIEW branch-and-bound pruning rule and integrality gap; replay A02–A03
- Score ≤ 2/5 → PREREQUISITE GAP in math.opt.linear-programming; reassign

**P78 — Completion:** Integer programming certified. Student can formulate ILP/MIP/BIP, compute LP relaxation bounds, execute branch-and-bound with pruning, recognise TU matrices as the zero-gap case, and place IP within NP-hardness theory via the 3-SAT reduction.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = ['math.disc.complexity-classes'])
Target: NP-completeness of 0/1 ILP via membership in NP and 3-SAT ≤_P reduction; reconciling NP-hardness with practical solvability
Skill tested: Construct polynomial-time verifier for IP; encode 3-SAT clauses as linear inequalities over binary variables; distinguish worst-case theory from engineering practice

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

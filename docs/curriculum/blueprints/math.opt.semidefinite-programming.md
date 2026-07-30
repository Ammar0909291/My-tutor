# Blueprint: math.opt.semidefinite-programming

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.semidefinite-programming |
| Title | Semidefinite Programming |
| Domain | math.opt |
| Difficulty | research |
| Bloom level | analyze |
| Estimated hours | 8 |
| Mastery threshold | 0.65 |
| MAMR | 4/5 |
| Prerequisites | math.opt.convex-optimization, math.linalg.positive-definite |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a semidefinite program (SDP) in standard form (min tr(CX) s.t. tr(AᵢX)=bᵢ, X⪰0), the student identifies the PSD cone as a convex cone (hence SDP is convex), states why SDP generalises LP and QP (scalar variables → matrix variable), writes the dual SDP, applies SDP relaxations to at least one combinatorial problem (MAX-CUT relaxation via Goemans-Williamson), and recognises interior-point as the standard solution algorithm.

## Component 2 — CPA Entry Stage
**A — Abstract** (matrix inequality constraints; trace inner product; PSD cone; Schur complement; matrix variable)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SDP-IS-JUST-QP | Student treats SDP as a QP with a symmetric matrix variable; does not recognise that PSD constraints (X⪰0) are fundamentally different from simple box or polyhedral constraints on matrix entries | Type 1 — overgeneralization (QP has a PD matrix in the objective; SDP has a PSD matrix as the variable — structurally different) |
| MC-2 | PSD-CONE-IS-NOT-CONVEX | Student believes the set of PSD matrices {X: X⪰0} is not convex (because it "involves a nonlinear condition det≥0") | Type 2 — perceptual intuition (eigenvalue conditions look nonlinear; the set LOOKS complicated) |
| MC-3 | SDP-ALWAYS-HAS-RANK-1-SOLUTION | Student expects SDP solutions to be rank-1 matrices (outer products vvᵀ); confuses the SDP relaxation with the original problem's optimal solution, which may require rounding | Type 5 — instruction-induced (SDP relaxations are introduced via rank-1 formulations; the relaxation drops the rank constraint) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of SDP:**

| Representation | Instance |
|---|---|
| Standard form | min tr(CX) s.t. tr(AᵢX)=bᵢ, i=1,…,m; X=Xᵀ⪰0 |
| LP analogy | Replace scalar x∈ℝⁿ with matrix X∈𝕊ⁿ (symmetric matrices); replace x≥0 with X⪰0; replace cᵀx with tr(CX), replace aᵢᵀx with tr(AᵢX) |
| Geometric | Feasible set = intersection of affine subspace with the PSD cone 𝕊ⁿ₊; PSD cone is convex (verify: tX+(1−t)Y⪰0 if X,Y⪰0, t∈[0,1]) |
| Special cases | LP: diagonal C and Aᵢ, X diagonal → reduces to LP. QP: X=[x;1][x;1]ᵀ constraint + linear: equivalent to QP. SDP strictly generalises both. |

**PSD cone convexity proof:** For X,Y⪰0, t∈[0,1]: ∀z, zᵀ(tX+(1−t)Y)z=t·zᵀXz+(1−t)·zᵀYz≥0. ✓ Linear combination of PSD matrices is PSD.

**P49 checkpoint:**
- CORRECT → "SDP: optimise a linear function of a matrix variable over the PSD cone ∩ affine constraints. PSD cone is convex." → A02
- PARTIAL (understands LP/QP analogy, doubts PSD cone is convex) → "For 2×2 diagonal matrices X=diag(a,b)⪰0 (a,b≥0) and Y=diag(c,d)⪰0: is tX+(1−t)Y⪰0?" → TB-R02 → A02
- INCORRECT → TB-R02 → A02
- NO_RESPONSE → "What does X⪰0 mean? How many constraints does it impose on a 2×2 symmetric matrix?" → TB-R02 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**SDP vs. QP — structural difference:**

**QP (standard):** min ½xᵀQx+cᵀx s.t. Ax≤b. Variable: x∈ℝⁿ; Q appears in the OBJECTIVE.

**SDP:** min tr(CX) s.t. tr(AᵢX)=bᵢ, X⪰0. Variable: X∈𝕊ⁿ; C appears in the OBJECTIVE coefficient; X⪰0 is a CONSTRAINT on the variable.

**Schur complement — SDP representation of QP constraint:**
"Is the constraint ½xᵀQx+cᵀx≤t convex?" Yes (for Q⪰0). Equivalent SDP: variables (x,t); constraint:
[[t−cᵀx, x^T/√2], [x/√2, Q⁻¹]] ⪰ 0 (Schur complement form for xᵀQx≤something).

More concretely: yᵀQy≤t ↔ [[t, yᵀ],[y, Q⁻¹]]⪰0 (Schur complement says: top-left block (t) minus (schur complement yᵀQ⁻¹ᵀ... wait — standard Schur: [[A,B],[Bᵀ,C]]⪰0 ↔ C⪰0 and A−BC⁻¹Bᵀ⪰0). So [[t, xᵀ],[x, Q⁻¹]]⪰0 ↔ Q⁻¹⪰0 (true if Q⪰0) and t−xᵀQx≥0 ↔ xᵀQx≤t. ✓

**Gate question (MC-1):** "A student says: 'SDP with X=xxᵀ is the same as a QP because tr(CX)=xᵀCx.' Is this correct?"

No: the constraint X=xxᵀ is a RANK-1 constraint (non-convex). The SDP DROPS this constraint and allows any X⪰0 (rank-1 to rank-n). The SDP objective tr(CX) over X⪰0 is a convex relaxation of xᵀCx — its optimal value is ≤ the optimal xᵀCx (the relaxation is easier). This is why SDP can be solved efficiently while finding the exact rank-1 solution is NP-hard in general.

**P49 checkpoint:**
- CORRECT → "SDP has a MATRIX variable; QP has a vector variable. SDP relaxes rank-1 constraint to PSD → convex. This is the SDP relaxation technique." → A03
- PARTIAL (understands variable difference, unclear on relaxation) → "If X⪰0 but not rank-1, can you recover an x vector from X?" → TB-R01 → A03
- INCORRECT → TB-R01 → A03
- NO_RESPONSE → "What is the rank of xxᵀ for any nonzero vector x?" → TB-R01 → A03

### A03 — P04 PATTERN INDUCTION
**MAX-CUT SDP relaxation — pattern of relaxation technique:**

MAX-CUT: Given graph G=(V,E), partition V into S and V\S to maximise the number of edges between S and V\S.

Integer formulation: xᵢ∈{+1,−1}, max (1/4)Σ_{(i,j)∈E}(1−xᵢxⱼ).

Quadratic objective: xᵀLx where L is the graph Laplacian (L_{ij}=−1 if (i,j)∈E, L_{ii}=deg(i)).

SDP relaxation: replace xᵢxⱼ=xᵢᵀxⱼ by lifting to Xᵢⱼ where X=xxᵀ⪰0, diag(X)=1 (since xᵢ²=1). Drop rank-1 constraint:

**SDP: max (1/4)Σ_{(i,j)∈E}(1−Xᵢⱼ) s.t. Xᵢᵢ=1 ∀i, X⪰0.**

This is a valid SDP (linear objective in X, PSD + affine constraints). Its optimal value ≥ true MAX-CUT (relaxation provides upper bound).

**Rounding (Goemans-Williamson, 1995):** Factor the SDP solution: X*=VᵀV (Cholesky). Each vᵢ is a unit vector in ℝⁿ. Choose a random hyperplane (random unit vector r); assign xᵢ=sign(vᵢᵀr). Probability of cutting edge (i,j): Pr[xᵢ≠xⱼ]=(1/π)arccos(Xᵢⱼ*)≥(arccos(Xᵢⱼ*)/(π·(1−Xᵢⱼ*)/2))·(1−Xᵢⱼ*)/2 ≥ 0.878·(1−Xᵢⱼ*)/2. GW gives a 0.878-approximation to MAX-CUT (vs. 0.5 for greedy).

**P49 checkpoint:**
- CORRECT → "SDP relaxation: lift integer/rank-1 problem to PSD cone; solve SDP efficiently; round the solution back. GW achieves 0.878 for MAX-CUT." → A04
- PARTIAL (understands relaxation, unsure about rounding) → "After solving the SDP, X* may have rank > 1. How do we recover a partition (S, V\S)?" → TB-R03 → A04
- INCORRECT → TB-R03 → A04
- NO_RESPONSE → "The SDP has Xᵢᵢ=1 for all i. What does this correspond to in the original xᵢ∈{±1} problem?" → TB-R03 → A04

### A04 — P06 CONTRAST PAIR
**SDP vs. LP: structural comparison:**

| Feature | LP | SDP |
|---|---|---|
| Variable | x∈ℝⁿ | X∈𝕊ⁿ (n×n symmetric matrix) |
| Nonnegativity | x≥0 (componentwise) | X⪰0 (positive semidefinite) |
| Objective | cᵀx (linear in x) | tr(CX) (linear in X entries) |
| Constraints | aᵢᵀx=bᵢ (linear) | tr(AᵢX)=bᵢ (linear in X) |
| Feasible set | Polytope | Spectrahedron (PSD cone ∩ affine) |
| Strong duality | Holds if feasible (LP duality) | Holds under Slater + complementary conditions |
| Algorithm | Simplex, interior-point | Interior-point only (no vertex structure) |
| Generalises | — | LP (diagonal case), SOCP (intermediate) |
| Applications | Resource allocation, transport | MAX-CUT, SVM kernel learning, control, graph algorithms |

**P49 checkpoint:**
- CORRECT → "SDP generalises LP: scalar x→matrix X, x≥0→X⪰0, cᵀx→tr(CX). Solved by interior-point; spectrahedron has no vertices to walk." → Gate (P91)
- PARTIAL → "Why can't simplex work for SDP? (What is the analogue of 'vertex' for the PSD cone?)" → Gate (after brief answer)
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "The PSD cone is smooth (no corners). What property of LP does simplex exploit that SDP's feasible set lacks?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 SDP-IS-JUST-QP):**
Step 1 — "QP: min ½xᵀQx with Q fixed and x the variable. SDP: min tr(CX) with C fixed and X (a MATRIX) the variable, subject to X⪰0." Step 2 — "The relationship: if X=xxᵀ (rank-1 constraint, non-convex), then tr(CX)=xᵀCx — this gives QP. Dropping rank-1 to X⪰0 gives SDP: a convex relaxation of the QP with rank-1 constraint. They are structurally very different." Step 3 — "SDP's PSD constraint makes it convex but much larger: an n×n variable has n(n+1)/2 entries vs. the n entries of x."

**TB-R02 (MC-2 PSD-CONE-IS-NOT-CONVEX):**
Step 1 — "PSD cone: {X∈𝕊ⁿ: X⪰0}. Convex means: if X,Y⪰0 and t∈[0,1], then tX+(1−t)Y⪰0." Step 2 — Proof: ∀z, zᵀ(tX+(1−t)Y)z=t·(zᵀXz)+(1−t)·(zᵀYz)≥0 since zᵀXz≥0 and zᵀYz≥0 (X,Y PSD). ✓ Step 3 — "The nonlinearity is in the constraint X⪰0 (all eigenvalues ≥0), but the SET {X:X⪰0} is closed under convex combinations. Nonlinear condition ≠ non-convex set."

**TB-R03 (MC-3 SDP-ALWAYS-HAS-RANK-1-SOLUTION):**
Step 1 — "The SDP DROPS the rank-1 constraint xᵢxⱼ=xᵢ·xⱼ. The optimal SDP solution X* can have any rank from 1 to n. High rank means the SDP relaxation is 'loose' relative to the combinatorial problem." Step 2 — "Rounding: factorize X*=VᵀV; the columns vᵢ are unit vectors in ℝⁿ. Cut by a random hyperplane: xᵢ=sign(vᵢᵀr). This is the GW rounding." Step 3 — "When X* happens to be rank-1, the SDP solution IS the original problem's optimal solution and the rounding is exact."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Show that the set {x∈ℝ²: [[1,x₁],[x₁,x₂]]⪰0} is a convex set in ℝ² by finding the explicit constraints on (x₁,x₂) from the PSD condition.
2. Write the dual SDP of: min tr(CX) s.t. tr(AᵢX)=bᵢ (i=1,…,m), X⪰0. (The dual is max bᵀy s.t. C−ΣyᵢAᵢ⪰0.)
3. For the graph with edges {(1,2),(1,3),(2,3)} (triangle), write the MAX-CUT SDP (3×3 matrix X with X₁₁=X₂₂=X₃₃=1). What is the SDP optimal value, and what does the SDP say about the maximum cut?
4. Explain why the constraint xᵀQx≤t (for Q⪰0) can be written as a linear matrix inequality using the Schur complement lemma.

**P55 — Reflect & Consolidate:** "SDP: matrix generalisation of LP. PSD cone is convex. SDP relaxations drop rank constraints. Interior-point solves SDPs in polynomial time. GW shows SDP relaxations can yield near-optimal approximations."

**P76 — Transfer Probe (Independence mode):**
Lyapunov stability via SDP: A linear system ẋ=Ax is stable (all eigenvalues of A have negative real part) if and only if there exists P⪰0 such that AᵀP+PA≺0 (negative definite). Formulate finding such P as an SDP: variables = entries of the symmetric matrix P; constraints = P⪰0, AᵀP+PA+εI⪯0 for small ε>0. Explain why this is a valid SDP (linear in P; both constraints are LMIs). This shows control theory stability analysis is an SDP.

**P55 — Reflect & Consolidate:** "Lyapunov stability reduces to an SDP: find a PSD matrix satisfying two linear matrix inequalities. This is the canonical application of SDP in control theory — a polynomial-time certificate for stability."

**P75 — Mastery Assessment:**
"MAX-INDEPENDENT-SET relaxation: For graph G=(V,E), an independent set has no two adjacent vertices. The max independent set size α(G) satisfies (by Lovász theta): α(G)≤ϑ(G)=max{tr(JX): tr(X)=1, Xᵢⱼ=0 ∀(i,j)∈E, X⪰0} where J is the all-ones matrix. (a) Is this a valid SDP? Identify the variable, objective, and constraints. (b) For K₃ (complete 3-vertex graph), α(K₃)=1. What does the SDP give? (c) Why is SDP relaxation useful here even if the SDP bound is not tight?"

**P55 — Reflect & Consolidate:** "The Lovász theta function is an SDP relaxation of the independent set problem. It is polynomial-time computable and provides tight bounds for many graph classes (perfect graphs). NP-hardness of independent set → SDP is not always tight."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.semidefinite-programming complete
- Score 3/5 → REVIEW PSD cone convexity and the SDP vs. QP distinction; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.positive-definite or math.opt.convex-optimization; reassign

**P78 — Completion:** Semidefinite programming certified. Student can formulate an SDP, prove PSD cone convexity, apply SDP relaxations, and describe the GW rounding algorithm.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Lyapunov stability as SDP — LMI formulation (AᵀP+PA≺0, P⪰0); polynomial-time stability certificate
Skill tested: Recognise SDP structure in a new domain (control theory); verify both LMIs are linear in P; explain what makes this a valid SDP

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

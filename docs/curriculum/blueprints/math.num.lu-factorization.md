# Blueprint: math.num.lu-factorization

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.lu-factorization |
| name | LU Factorization |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.linalg.lu-factorization, math.num.error-analysis |
| Cross-links | math.linalg.lu-factorization |
| Unlocks | — |

## Component 1 — Learning Objective
Given a square matrix A, the student factors A=LU (or A=PLU with partial pivoting) by Gaussian elimination, explains why partial pivoting is necessary for numerical stability, solves Ax=b via forward substitution (Ly=b) then back substitution (Ux=y), counts the operation count (⅔n³ flops for factorisation, O(n²) per solve), and reuses a single LU factorisation to solve multiple right-hand sides efficiently.

## Component 2 — CPA Entry Stage
**C — Concrete** (eliminate variables in a 3×3 system by hand — subtract multiples of one equation from another — before connecting this to matrix notation)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | LU-SAME-AS-INVERSE | Student solves Ax=b by computing A⁻¹x rather than LU; does not recognise that LU is O(n³/3) while A⁻¹ costs 3 times more and loses backward-stability guarantees | Type 5 — instruction-induced (linear algebra courses present A⁻¹ as the canonical solution method; the numerical computation cost of forming an explicit inverse is rarely discussed there) |
| MC-2 | PIVOTING-IS-OPTIONAL | Student applies Gaussian elimination without pivoting and believes the result is always correct if the matrix is invertible — does not recognise that a near-zero pivot causes catastrophic cancellation in the divided row | Type 1 — overgeneralization (examples in textbooks use "nice" matrices where the (1,1) pivot is already large; students generalise that the first element is always a suitable pivot) |
| MC-3 | FORWARD-BACK-ORDER-DOESNT-MATTER | Student solves Ux=y before Ly=b, or confuses which system to solve first; does not remember the two-step order | Type 3 — language contamination ("forward" and "backward" substitution labels are both directional adjectives; students confuse which step comes first when working from the LU factorisation) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of LU factorisation:**

| Representation | Content |
|---|---|
| Elimination step | Subtract (a₂₁/a₁₁) × row 1 from row 2; the multiplier m₂₁=a₂₁/a₁₁ is stored in L |
| Matrix equation | A = L U where L is unit lower triangular (diagonal = 1) and U is upper triangular |
| Pivot explanation | If a₁₁ ≈ 0, dividing by a₁₁ amplifies errors; swap rows (partial pivoting) first |
| Two-step solve | Ax=b ⟹ LUx=b; set Ux=y ⟹ solve Ly=b (forward sub), then Ux=y (back sub) |

**Partial pivoting (PA=LU):** Before each elimination step, swap the row with the largest absolute value in the current column to the pivot position. This ensures |mᵢⱼ|≤1, bounding the growth of rounding errors.

**Operation count:**
- LU factorisation: ≈⅔n³ multiplications/additions
- Each forward/back substitution solve: O(n²)
- k right-hand sides: ⅔n³ + 2kn² — factorize once, solve k times cheaply

**P49 checkpoint:**
- CORRECT → "LU factorises A into L (unit lower triangular) and U (upper triangular). Partial pivoting ensures numerical stability. Solve by forward sub (Ly=b) then back sub (Ux=y). Cost: ⅔n³ for factorisation." → A02
- PARTIAL (understands the factorisation but not the two-step solve order) → "Once we have L and U: first solve Ly=b using forward substitution (top to bottom, since L is lower triangular). Then solve Ux=y using back substitution (bottom to top). The result x=A⁻¹b." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Factor A=[[2,1],[6,4]] as LU. Hint: what multiplier eliminates the (2,1) entry? That multiplier becomes L₂₁." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Pivoting gallery — why pivoting matters:**

**Case 1 — exact arithmetic:** A=[[10⁻⁸, 1],[1, 1]]. Without pivoting: m₂₁=1/10⁻⁸=10⁸. U₂₂=1−10⁸×1≈−10⁸. Solution correct in exact arithmetic.

**Case 2 — floating-point without pivoting:** The computed U₂₂=fl(1−10⁸)=−10⁸ (exact). But when solving, the large multiplier 10⁸ amplifies any rounding error in row 1: the computed x₂ may have only ~8 correct digits instead of 15.

**Case 3 — with partial pivoting:** Swap rows → A=[[1,1],[10⁻⁸,1]]. m₂₁=10⁻⁸; U₂₂=fl(1−10⁻⁸×1)≈1. The system is now well-conditioned. Computed solution has full 15-digit accuracy.

**Multiple right-hand sides:** Three structural load cases on the same beam: A=stiffness matrix (n=10,000). Without LU: 3 full Gaussian eliminations = 3×⅔n³ ≈ 2×10¹² flops. With LU (one factorisation): ⅔n³ + 3×2n² ≈ ⅔n³+6n² — essentially one factorisation's cost.

**Pattern:** The LU factorisation pays its cost upfront once; each subsequent solve is cheap. Pivoting is not optional for floating-point reliability.

**P49 checkpoint:**
- CORRECT → "Without pivoting, a small pivot causes catastrophic cancellation in Gaussian elimination. Partial pivoting bounds the multipliers |mᵢⱼ|≤1 and keeps rounding errors controlled. For multiple right-hand sides, one LU factorisation + k cheap solves beats k full Gaussian eliminations." → A03
- PARTIAL (understands pivoting but not the multiple-RHS advantage) → "If you need to solve the same linear system Ax=b₁, Ax=b₂, …, Ax=b_k, computing A⁻¹ explicitly costs 3×⅔n³ flops. Using LU: compute it once (⅔n³ flops), then for each bₖ run forward+back substitution (2n² flops each). For k=100 and n=1000, LU is roughly 50× faster." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Solve [[0.001, 1],[1,1]][x₁;x₂]=[1.001; 2] without pivoting and with pivoting. What goes wrong without pivoting on a calculator with 3-digit precision?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**LU vs. Inverse gate:**

**Gate question (MC-1):** "A student writes `x = np.linalg.inv(A) @ b` in Python. Why is `np.linalg.solve(A, b)` preferred?"

`inv(A)` explicitly computes A⁻¹ via a full LU factorisation, stores the n² entries of A⁻¹, then multiplies A⁻¹ by b (another n² multiplications). Total: ~3×(⅔n³)+n² flops. `solve(A, b)` uses LU factorisation + one forward/back substitution: ⅔n³ + 2n². For n=1000: solve is ~3× faster. Additionally, A⁻¹ magnifies rounding errors during the matrix–vector multiply step; `solve` avoids this and has a better backward error bound.

**P49 checkpoint:**
- CORRECT → "Computing A⁻¹ explicitly costs ~3× more than solving directly via LU. The solve path (LU + forward/back sub) also has better numerical stability. Never form A⁻¹ just to solve Ax=b." → Gate (P91)
- PARTIAL (knows solve is faster but not why) → "The reason solve avoids A⁻¹: every matrix–vector multiply accumulates O(n²) floating-point errors. If A⁻¹ has errors from its own computation, multiplying by b compounds them. Forward/back substitution has only O(n) rounding stages per right-hand-side, much better-controlled." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Count the floating-point multiplications needed to compute A⁻¹ (inverting a 3×3 by hand) vs. solving Ax=b directly by row reduction. Which requires fewer steps?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 LU-SAME-AS-INVERSE):**
Step 1 — "A⁻¹ is the n×n matrix such that A⁻¹A=I. Computing it requires solving n separate linear systems (one per column of I). That is n full LU solves = n × (⅔n³ + 2n²) ≈ ⅔n⁴ flops. Once you have A⁻¹, multiplying A⁻¹b costs n² multiplications. Total to solve Ax=b via A⁻¹: ≈⅔n⁴+n². Via LU: ⅔n³+2n². For n=100, A⁻¹ is 1000× more expensive." Step 2 — When IS A⁻¹ useful? When you must solve Ax=b for many different b's AND the full matrix A⁻¹ is needed explicitly (e.g. computing sensitivities ∂x/∂b directly). Even then, forming A⁻¹ in floating-point is rarely worth the cost and stability issues. Step 3 — "Rule: never compute A⁻¹ just to solve a linear system. Use scipy.linalg.solve() / MATLAB backslash / Julia \ — these all call LAPACK's DGESV, which is LU with partial pivoting under the hood."

**TB-R02 (MC-2 PIVOTING-IS-OPTIONAL):**
Step 1 — "A near-zero pivot does not make the matrix singular — it just causes a very large multiplier in Gaussian elimination. Large multipliers mean small differences between nearly equal numbers (catastrophic cancellation), losing significant digits. A pivot of 10⁻¹⁵ in a 64-bit float leads to a multiplier of ~10¹⁵, which completely destroys 15-digit floating-point precision in one elimination step." Step 2 — Demonstration: A=[[ε,1],[1,1]] with ε=10⁻¹⁶. Row 2 − (1/ε)×Row 1: entry (2,2) becomes 1−1/ε ≈ −10¹⁶, but in floating-point fl(1−10¹⁶)=−10¹⁶ exactly (the '1' is absorbed). So we solve with U₂₂=−10¹⁶. Back sub: x₁=(1/ε)·x₂−(1/ε)·b₂... the errors from rounding at U₂₂ propagate catastrophically. With pivoting: U₂₂=1−ε≈1, no cancellation. Step 3 — "Rule: always pivot. In practice, partial pivoting (select the largest entry in the current column) suffices for almost all matrices. Full pivoting (select the largest entry in the entire remaining submatrix) is even safer but costs O(n²) extra comparisons per step — rarely needed in practice."

**TB-R03 (MC-3 FORWARD-BACK-ORDER-DOESNT-MATTER):**
Step 1 — "The two-step solve order follows from the matrix structure. L is lower triangular: the first row has only one unknown (y₁=b₁/L₁₁), then row 2 has y₁ and y₂, etc. So we can solve from the TOP DOWN — that's forward substitution. U is upper triangular: the last row has only one unknown (xₙ=yₙ/Uₙₙ), then row n−1 has xₙ and xₙ₋₁, etc. So we solve from the BOTTOM UP — back substitution." Step 2 — Memory aid: 'For-ward (For-L = lower triangle = go down). Back-ward (Back-U = upper triangle = go up).' Step 3 — "If you try Ux=y first, you have n unknowns in x but y is unknown — you'd need y to solve for x, and y to solve for x requires the factorisation to be complete first. The constraint is mathematical, not arbitrary: L must be solved first because its product LU=A, and Ly=b defines y."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Factor A = [[2,4,−2],[1,3,0],[−3,−2,7]] as PA=LU using partial pivoting. Show the row swaps and the multipliers at each step.
2. Use the LU factorisation from problem 1 to solve Ax=b for b=[2,5,−4]ᵀ and b=[0,1,3]ᵀ. Show forward and back substitution for each.
3. Count the flop count (multiplications + additions) for: (a) LU factorisation of an n×n matrix; (b) forward substitution; (c) back substitution. Express in big-O notation and as exact leading terms.
4. The matrix A=[[0.001,1],[1,1]] is solved with and without partial pivoting using 4-digit decimal arithmetic. Without pivoting: compute the solution. With pivoting: compute. Compare with the exact solution x=[1,1]ᵀ and explain the difference.

**P55 — Reflect & Consolidate:** "LU = Gaussian elimination stored compactly. L stores multipliers, U is the result. Solve: Ly=b (forward), Ux=y (backward). Always use partial pivoting. Cost: ⅔n³. Reuse for k right-hand sides."

**P76 — Transfer Probe (Cross-link: math.linalg.lu-factorization):**
Block LU factorisation is used for large systems by partitioning A into block sub-matrices. (a) Partition A into 2×2 blocks: A=[[A₁₁,A₁₂],[A₂₁,A₂₂]]. Show that A=LU can be written as A₁₁=L₁₁U₁₁, A₂₁=L₂₁U₁₁, A₁₂=L₁₁U₁₂, A₂₂=L₂₁U₁₂+L₂₂U₂₂ (the Schur complement). (b) Explain why block LU gives the same solution as scalar LU. (c) Identify the memory and cache advantages of block LU on modern hardware. (d) What happens to the Schur complement A₂₂−L₂₁U₁₂ if A₁₁ is nearly singular?

**P55 — Reflect & Consolidate:** "Block LU decomposes the problem hierarchically: the Schur complement A₂₂−A₂₁A₁₁⁻¹A₁₂ is the reduced system after eliminating the first block. Cache-friendly block operations on modern hardware explain why LAPACK uses block LU even though scalar LU is theoretically equivalent."

**P75 — Mastery Assessment:**
"A finite-element structural model produces the n×n stiffness matrix K (n=500, symmetric positive definite). Ten load vectors f₁,…,f₁₀ must be solved. (a) Describe the full solution strategy (choose: LU, Cholesky, iterative). (b) Count the total flops for LU with partial pivoting vs. solving 10 independent systems. (c) If K is also sparse (≤5 non-zeros per row), should you use dense LU? What alternative is better? (d) If K is perturbed by a small ΔK, express how the solution x changes to first order using the LU factorisation already computed."

**P55 — Reflect & Consolidate:** "LU factorization is the workhorse for dense linear systems. For symmetric positive definite matrices, Cholesky halves the cost. For sparse matrices, sparse LU (with fill-in minimisation orderings) or iterative methods dominate. The LU already computed gives a cheap approximation for perturbed systems via one forward/back substitution update."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.lu-factorization complete
- Score 3/5 → REVIEW partial pivoting and two-step solve; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.lu-factorization or math.num.error-analysis; reassign

**P78 — Completion:** LU factorization certified. Student factors A=PLU with partial pivoting, solves by forward/back substitution, explains the stability role of pivoting, counts flops, and reuses the factorisation for multiple right-hand sides.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.linalg.lu-factorization])
Target: Block LU decomposition and the Schur complement
Skill tested: Derive block LU from scalar LU; connect to the Schur complement; identify hardware motivation; analyse the near-singular case

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

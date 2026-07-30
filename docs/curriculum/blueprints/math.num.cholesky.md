# Blueprint: math.num.cholesky

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.cholesky |
| name | Cholesky Factorization |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.linalg.cholesky, math.num.lu-factorization |
| Cross-links | math.linalg.cholesky |
| Unlocks | — |

## Component 1 — Learning Objective
Given a symmetric positive definite (SPD) matrix A, the student computes the Cholesky factorisation A=LLᵀ by the column-by-column algorithm; explains why SPD is a necessary and sufficient condition for the factorisation to exist without pivoting; counts the exact operation count (≈⅓n³ flops, half of LU); and uses the factorisation to test whether a given matrix is SPD by attempting the factorisation and checking for negative values under the square root.

## Component 2 — CPA Entry Stage
**C — Concrete** (express a 2×2 SPD matrix as a product of a lower triangular matrix times its transpose — by matching entries — before any algorithm)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CHOLESKY-WORKS-FOR-ANY-SYMMETRIC | Student applies Cholesky to a symmetric but indefinite matrix (negative eigenvalues) and does not understand why it fails — encounters a negative number under a square root | Type 1 — overgeneralization (symmetry is necessary; positive-definiteness is also necessary but is the harder condition to visualise; students remember "symmetric" and forget "positive definite") |
| MC-2 | CHOLESKY-IS-LU-WITH-SYMMETRY | Student does not understand why Cholesky costs half of LU; believes Cholesky is just LU applied to a symmetric matrix with the same cost | Type 5 — instruction-induced (Cholesky is introduced as a special case of LU for symmetric matrices, which is correct, but the cost saving from exploiting symmetry is often not emphasised numerically) |
| MC-3 | POSITIVE-DEFINITE-MEANS-ALL-POSITIVE-ENTRIES | Student believes a matrix is SPD if all its entries are positive — confuses positive entries with positive eigenvalues | Type 3 — language contamination (the word "positive" in "positive definite" sounds like it describes the entries; the actual definition (xᵀAx>0 for all x≠0) is more abstract) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Cholesky:**

| Representation | Content |
|---|---|
| Matching entries | A=LLᵀ: L₁₁=√a₁₁; L_{i1}=a_{i1}/L₁₁; L_{jj}=√(a_{jj}−Σₖ<ⱼ L_{jk}²) |
| Why SPD is needed | L_{jj}=√(a_{jj}−Σₖ<ⱼ L_{jk}²): the argument must be positive; fails iff A not SPD |
| Cost comparison | LU: ⅔n³ flops. Cholesky: ⅓n³ flops (exploit symmetry: only compute lower triangle) |
| SPD test | Attempt Cholesky: if it completes without a negative sqrt, A is SPD; otherwise not |

**SPD definition:** A is positive definite iff xᵀAx>0 for all x≠0. Equivalently: all eigenvalues positive. Equivalently: all principal minors positive (Sylvester's criterion).

**Algorithm (outer product form):**
```
for j = 1 to n:
    L[j,j] = sqrt(A[j,j] - sum(L[j,k]^2 for k<j))
    for i = j+1 to n:
        L[i,j] = (A[i,j] - sum(L[i,k]*L[j,k] for k<j)) / L[j,j]
```
**P49 checkpoint:**
- CORRECT → "Cholesky: A=LLᵀ for SPD A. Cost ⅓n³ (half LU). SPD test: attempt the factorisation; negative sqrt = not SPD." → A02
- PARTIAL (knows the factorisation exists but not why SPD is needed) → "The diagonal entry L_{jj}=√(a_{jj}−Σ L_{jk}²). If A is not positive definite, the argument can be negative or zero — the square root fails or gives a zero pivot. Positive definiteness is exactly the condition that makes every diagonal entry positive." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Factor A=[[4,2],[2,5]] as LLᵀ. Step 1: L₁₁=√4=2. Step 2: L₂₁=2/2=1. Step 3: L₂₂=√(5−1²)=2. Check: LLᵀ=[[2,0],[1,2]][[2,1],[0,2]]=[[4,2],[2,5]]=A. ✓" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Cost and stability gallery:**

**Operation counts (n=1000):**
| Factorisation | Flops | Memory |
|---|---|---|
| Dense LU (general) | ⅔n³ ≈ 6.7×10⁸ | n² doubles |
| Cholesky (SPD) | ⅓n³ ≈ 3.3×10⁸ | n(n+1)/2 doubles |
| Cholesky is 2× faster | — | — |

**Numerical stability:** Cholesky without pivoting is backward-stable for SPD matrices. The condition number κ(L)=√κ(A): errors in the Cholesky factors are amplified by √κ(A), whereas LU errors are amplified by κ(A). Cholesky is inherently twice as numerically stable in the error amplification sense.

**Modified Cholesky:** When A is nearly SPD (some negative eigenvalues due to rounding), add a diagonal shift: A+δI where δ = max(0, −λ_min + ε). Now A+δI is SPD; Cholesky succeeds. Used in quasi-Newton optimization when the Hessian approximation becomes indefinite.

**Pattern:** Cholesky is the preferred solver for SPD systems — 2× cheaper than LU, more stable, no pivoting needed. The failure-is-a-test feature makes it a practical SPD checker.

**P49 checkpoint:**
- CORRECT → "Cholesky is preferred for SPD over LU: 2× cheaper (⅓n³ vs ⅔n³), more stable (amplifies by √κ not κ), no pivoting needed. Cholesky failure diagnoses non-SPD. Modified Cholesky adds a diagonal shift for near-SPD matrices." → A03
- PARTIAL (understands cost but not stability advantage) → "Cholesky does not pivot (because pivoting would destroy symmetry exploitation). Yet for SPD matrices, Cholesky is backward-stable WITHOUT pivoting. This is because positive definiteness itself controls the growth of the factors: the diagonal entries L_{jj} are bounded by √a_{jj}, so there is no catastrophic amplification." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "How many floating-point multiplications does Cholesky require for n=4? For n=1000? Express as a formula in n." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**SPD test gate:**

**Gate question (MC-3):** "Is A=[[2,−3],[−3,5]] positive definite? A student checks all entries (none obviously positive or negative, two are positive) and concludes it might be. Apply the Cholesky test."

Attempt Cholesky: L₁₁=√2≈1.414. L₂₁=−3/√2≈−2.121. L₂₂=√(5−(−2.121)²)=√(5−4.5)=√0.5≈0.707. All steps succeed! So A IS positive definite.

Verify: eigenvalues of A satisfy λ²−7λ+(10−9)=λ²−7λ+1=0 → λ=(7±√45)/2. Both positive (λ₁≈6.85, λ₂≈0.15). Positive eigenvalues confirm SPD.

The student's confusion: entries can be negative and the matrix is still SPD. "Positive definite" means xᵀAx>0 for ALL x≠0 — not that the entries are positive.

**P49 checkpoint:**
- CORRECT → "SPD does not mean all entries are positive — it means all eigenvalues are positive (or equivalently xᵀAx>0). Cholesky is the fastest way to test SPD: attempt it; if it completes, A is SPD; if it fails (negative sqrt), A is not SPD." → Gate (P91)
- PARTIAL (correct about Cholesky test but confused about the definition) → "xᵀAx>0 means: put any non-zero vector x into the quadratic form — the result is always positive. For A=[[2,−3],[−3,5]] and x=[1,0]: xᵀAx=2>0. For x=[1,1]: xᵀAx=2−3−3+5=1>0. For x=[3,2]: xᵀAx=18−36+20=2>0. The negative entries don't prevent positive definiteness when the overall quadratic form stays positive." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Attempt Cholesky on A=[[1,2],[2,1]]. What happens at L₂₂=√(1−2²)=√(−3)? What does this tell you about whether A is SPD?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 CHOLESKY-WORKS-FOR-ANY-SYMMETRIC):**
Step 1 — "A symmetric matrix A is SPD if and only if Cholesky succeeds. The diagonal entries of L are L_{jj}=√(a_{jj}−Σ_{k<j}L_{jk}²). If A has a negative eigenvalue, at some step j this expression becomes negative (no real square root exists). Cholesky stops — telling you A is NOT SPD." Step 2 — Counter-example: A=[[1,2],[2,1]] is symmetric but has eigenvalues 3 and −1 (negative — not SPD). Cholesky: L₁₁=1, L₂₁=2/1=2, L₂₂=√(1−4)=√(−3) — fails. Step 3 — "The positive definite requirement is not optional. The two conditions (symmetric + positive definite) together are what makes Cholesky work. Diagonal dominance (another common condition) implies SPD but is stronger — not all SPD matrices are diagonally dominant."

**TB-R02 (MC-2 CHOLESKY-IS-LU-WITH-SYMMETRY):**
Step 1 — "LU computes both L and U (lower and upper triangular factors): 2×(n²/2) entries to fill = n² entries, roughly n³/3 multiplications each for L and U = ⅔n³ total. Cholesky exploits A=LLᵀ: since U=Lᵀ is exactly the transpose of L, we only need to compute L — half the entries. The formula for each entry of L uses only previous entries of L, so no cross-references are needed. This halves the work to ⅓n³." Step 2 — Memory saving: LU stores both L (n²/2) and U (n²/2) = n² entries. Cholesky stores L only (n(n+1)/2) — also half the memory. For n=1000: LU requires 8 MB; Cholesky requires 4 MB. Step 3 — "Cholesky is not LU with symmetry bolted on — it is a fundamentally different algorithm that computes only one factor (L) and derives the other (Lᵀ) for free. The cost saving is real and substantial."

**TB-R03 (MC-3 POSITIVE-DEFINITE-MEANS-ALL-POSITIVE-ENTRIES):**
Step 1 — "Positive definite is a property of a QUADRATIC FORM, not individual entries. xᵀAx is the quadratic form: it computes a weighted sum of products xᵢxⱼ with weights aᵢⱼ. Even if some weights aᵢⱼ are negative, the resulting quadratic form can still be always positive — just as the function (x−y)² is always non-negative even though it contains cross terms." Step 2 — Visual: the matrix A=[[5,−4],[−4,5]] defines the quadratic form 5x₁²−8x₁x₂+5x₂²=5(x₁−0.8x₂)²+0.8x₂²≥0.8·min(5·4,1)x₂²+... always positive. The −8x₁x₂ term does not prevent positive definiteness because the diagonal dominates. Step 3 — "Test: eigenvalues of A must all be positive. Practical test: Cholesky — attempt it; if it succeeds, A is SPD regardless of the sign of any off-diagonal entry."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Compute the Cholesky factorisation A=LLᵀ for A=[[9,3,0],[3,5,−1],[0,−1,4]]. Show all steps. Verify LLᵀ=A.
2. Count the exact number of square roots and multiplications/additions in Cholesky for n=3. Compare with LU for n=3.
3. Is B=[[2,1,1],[1,2,1],[1,1,2]] positive definite? Use the Cholesky test and independently verify using Sylvester's criterion (check all principal minors).
4. A student computes the Cholesky factorisation and obtains L₃₃=√(−0.001). They suspect a rounding error. Describe the modified Cholesky approach: what diagonal shift δ makes A+δI SPD, and how do you choose δ?

**P55 — Reflect & Consolidate:** "Cholesky: A=LLᵀ for SPD A. Algorithm: column by column, √ at each diagonal. Cost: ⅓n³ (2× faster than LU). No pivoting needed. Failure = not SPD. Modified Cholesky adds δI to handle near-indefinite Hessians in optimisation."

**P76 — Transfer Probe (Cross-link: math.linalg.cholesky):**
The LDLT factorisation A=LDLᵀ (L unit lower triangular, D diagonal) avoids square roots and is used for symmetric indefinite matrices. (a) Derive LDLT from Cholesky by writing L_chol = L_LDLT D^{1/2}. (b) Explain how LDLT with diagonal pivoting (Bunch–Kaufman) extends to symmetric indefinite matrices where some Dᵢᵢ<0. (c) For a symmetric indefinite system arising in a saddle-point problem (KKT conditions), is LDLT preferred over Cholesky? Why? (d) Compare the stability of LDLT (pivoting required) with Cholesky (no pivoting needed for SPD).

**P55 — Reflect & Consolidate:** "LDLT avoids the square root in Cholesky and extends to symmetric indefinite matrices via Bunch–Kaufman pivoting. SPD: use Cholesky (fastest, most stable). Symmetric indefinite (e.g. KKT systems in optimisation): use LDLT with pivoting. Non-symmetric: use LU with partial pivoting."

**P75 — Mastery Assessment:**
"A Gaussian process regression model requires solving (K+σ²I)x=y where K is the n×n kernel matrix (SPD, n=2000). (a) What is the preferred factorisation? (b) If σ²=0.001 and K is nearly singular (smallest eigenvalue ≈10⁻⁶), will Cholesky succeed? What happens to numerical accuracy? (c) Increase σ² to 0.01 — how does this affect the condition number and Cholesky stability? (d) After computing the Cholesky factor L, how do you compute log det(K+σ²I) using L (needed for Gaussian process hyperparameter optimisation)?"

**P55 — Reflect & Consolidate:** "For Gaussian processes: A=K+σ²I, solve via Cholesky. The nugget σ²I regularises the condition number and ensures positive definiteness. log det(A)=2Σᵢ log Lᵢᵢ — a free by-product of the Cholesky factorisation, vital for marginal likelihood computation."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.cholesky complete
- Score 3/5 → REVIEW SPD definition and cost comparison; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.cholesky or math.num.lu-factorization; reassign

**P78 — Completion:** Cholesky factorisation certified. Student computes A=LLᵀ, explains the SPD requirement, counts the ⅓n³ cost, uses Cholesky as an SPD test, and applies modified Cholesky for near-indefinite matrices.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.linalg.cholesky])
Target: LDLT factorisation and Bunch–Kaufman pivoting for symmetric indefinite matrices
Skill tested: Derive LDLT from Cholesky; extend to indefinite; compare stability; apply to KKT systems

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

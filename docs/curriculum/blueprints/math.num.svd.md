# Blueprint: math.num.svd

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.svd |
| name | Numerical SVD and Applications |
| Domain | math.num |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.70 |
| MAMR | 4/5 |
| Prerequisites | math.linalg.svd, math.num.qr-algorithm |
| Cross-links | math.linalg.svd |
| Unlocks | — |

## Component 1 — Learning Objective
Given a real m×n matrix A, the student explains how the SVD A=UΣVᵀ is computed numerically in two phases (bidiagonalisation then QR-SVD iteration); interprets the singular values as the 2-norm of the rank-1 components; computes the best rank-k approximation Aₖ=U_kΣ_kV_kᵀ and states the Eckart-Young theorem; uses the numerical rank (number of singular values above a threshold ε‖A‖₂) to diagnose near-rank-deficiency; computes the 2-norm and condition number from the largest and smallest singular values; and applies truncated SVD to least-squares problems with near-singular matrices (regularised least squares via SVD pseudo-inverse).

## Component 2 — CPA Entry Stage
**C — Concrete** (compress a photograph by keeping only the 20 most important "layers" out of 1000 — before any matrix formula)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SVD-AND-EIGENDECOMPOSITION-ARE-THE-SAME | Student treats SVD (A=UΣVᵀ) as the same as eigendecomposition (A=PDP⁻¹) — believes singular values are eigenvalues and U,V are eigenvector matrices | Type 3 — language contamination (both decompositions involve a diagonal matrix of "special values" and two matrices of "special vectors"; the words "singular value" and "eigenvalue" are both "values" of a matrix; for symmetric matrices, the two coincide — students overgeneralise this special case) |
| MC-2 | TRUNCATED-SVD-DISCARDS-INFORMATION | Student believes the best rank-k approximation Aₖ loses "random" information from A — does not recognise that the Eckart-Young theorem proves Aₖ is the OPTIMAL rank-k approximation in both 2-norm and Frobenius norm | Type 5 — instruction-induced (truncation sounds like loss; "throwing away" singular values sounds destructive; the optimality proof requires understanding spectral norms, which is beyond most first courses) |
| MC-3 | NUMERICAL-RANK-IS-EXACT-RANK | Student reads the computed singular values as exact and uses a count of exactly-zero values as the rank — not recognising that floating-point SVD gives near-zero (not zero) values for rank-deficient matrices and that a threshold ε‖A‖₂ is required to determine numerical rank | Type 5 — instruction-induced (theoretical rank counts exactly-zero singular values; computing rank in practice requires a threshold; the distinction is not emphasised in linear algebra courses that work with exact arithmetic) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of numerical SVD:**

| Representation | Content |
|---|---|
| Geometric | SVD = rotation × scaling × rotation: V rotates to the principal directions of A, Σ stretches along them, U rotates to the output directions |
| Algebraic | A=UΣVᵀ; AᵀA=VΣ²Vᵀ; AAᵀ=UΣ²Uᵀ; singular values σᵢ=√λᵢ(AᵀA); left singular vectors = eigenvectors of AAᵀ |
| Rank-1 decomposition | A=σ₁u₁v₁ᵀ+σ₂u₂v₂ᵀ+…+σᵣuᵣvᵣᵀ; each term is a rank-1 matrix; σᵢ measures the "importance" of the ith term |
| Algorithm | Phase 1: bidiagonalise A=U_B·B·V_Bᵀ (B bidiagonal, O(mn²) flops). Phase 2: QR-SVD iteration on B (O(n) per iteration, O(1) iterations per value with shifts) |

**Eckart-Young theorem:** Among all rank-k matrices C, ‖A−Aₖ‖₂ is minimised by Aₖ=U_kΣ_kV_kᵀ (truncated SVD), with ‖A−Aₖ‖₂ = σₖ₊₁.

**Numerical rank:** For a matrix with exact rank r, floating-point SVD gives σ₁≥…≥σᵣ>0, σᵣ₊₁≈…≈σₙ≈ε‖A‖₂ (not exactly zero). Numerical rank: the number of σᵢ > ε·‖A‖₂ for a chosen tolerance ε (typically ε=n·u where u is machine epsilon).

**2-norm and condition number:**
‖A‖₂ = σ₁ (largest singular value)
‖A⁺‖₂ = 1/σₙ (smallest nonzero singular value)
κ₂(A) = σ₁/σₙ (for square invertible A)

**P49 checkpoint:**
- CORRECT → "SVD: A=UΣVᵀ. Singular values = √eigenvalues of AᵀA. Best rank-k approx: truncated SVD (Eckart-Young). 2-norm=σ₁, condition number=σ₁/σₙ." → A02
- PARTIAL (understands the decomposition but not the rank-1 interpretation) → "A = Σ σᵢuᵢvᵢᵀ: each rank-1 term σᵢuᵢvᵢᵀ captures one 'principal component' of A. The first term has the largest σ₁ and explains the most variance. Eckart-Young: cutting off after k terms gives the best rank-k approximation — not the kth term specifically, but the sum of the FIRST k terms (since σ₁≥σ₂≥…)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Compute the SVD of A=[[3,0],[0,1]]. What are U, Σ, Vᵀ? What is ‖A‖₂? What is the best rank-1 approximation of A?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Applications gallery:**

**Image compression (Eckart-Young in practice):**
A is a 1000×1000 grayscale image matrix (10⁶ pixels).
- Full SVD: 1000 singular values; exact storage requires 1000 × (1000+1+1000) ≈ 2×10⁶ numbers
- Rank-10 truncation: store only U_10 (1000×10), Σ_10 (10), V_10 (1000×10) = 20,010 numbers (99% compression)
- Rank-50 truncation: 100,050 numbers (90% compression), visually excellent

**Least-squares with near-singular matrix (regularised via SVD pseudo-inverse):**
Solve Ax≈b where A has small singular values (near rank deficiency). Standard least-squares solution x=A⁺b=(AᵀA)⁻¹Aᵀb amplifies noise by 1/σₙ (the reciprocal of the tiny singular value). Truncated SVD (TSVD): set to zero 1/σᵢ for σᵢ<ε. Then x_k = Σᵢ₌₁ᵏ (uᵢᵀb/σᵢ)vᵢ — a regularised, stable solution.

**Tikhonov regularisation via SVD:** x_λ = Σᵢ (σᵢ/(σᵢ²+λ)) (uᵢᵀb) vᵢ. Filter factor σᵢ²/(σᵢ²+λ) ≈ 1 for σᵢ≫√λ (keeps large singular components), ≈ 0 for σᵢ≪√λ (damps small singular components). Choice of λ: L-curve criterion or generalised cross-validation.

**Numerical rank via SVD:**
A=[[1,2,3],[2,4,6],[3,6,9]] is exactly rank 1. In floating-point: σ₁≈12.85, σ₂≈3×10⁻¹⁶, σ₃≈1×10⁻¹⁶. With tolerance ε=n·u≈3×10⁻¹⁵: numerical rank = 1 (only σ₁>ε·σ₁).

**Pattern:** SVD is the numerically preferred tool for rank determination, condition number estimation, regularised least squares, and low-rank approximation. The condition number κ₂=σ₁/σₙ directly measures how many digits are lost in solving Ax=b.

**P49 checkpoint:**
- CORRECT → "TSVD: discard components with σᵢ<ε to regularise ill-conditioned least-squares. Numerical rank: count σᵢ above ε·‖A‖₂ threshold. Condition number = σ₁/σₙ." → A03
- PARTIAL (understands truncation but not why it regularises) → "The least-squares solution x=(AᵀA)⁻¹Aᵀb can be written in SVD form: x=Σ(uᵢᵀb/σᵢ)vᵢ. A tiny σᵢ amplifies noise in uᵢᵀb by factor 1/σᵢ. If uᵢᵀb is pure noise (magnitude ≈ε‖b‖) and σᵢ≈ε‖A‖₂, then the ith component is ε‖b‖/(ε‖A‖₂) = ‖b‖/‖A‖₂ — a component of full magnitude, dominated by noise. Truncating it removes amplified noise." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "The matrix A=[[1,0],[0,10⁻⁸]] has ‖A‖₂=1 and ‖A⁻¹‖₂=10⁸. If b=[1,10⁻⁸]ᵀ and b is perturbed by δb=[0,10⁻¹⁶]ᵀ (machine epsilon sized), how large is δx in the second component? What does this say about the condition number?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**SVD vs. eigendecomposition gate:**

**Gate question (MC-1):** "A student computes the SVD of A=[[1,2],[3,4]] and says the singular values are the same as the eigenvalues (λ₁≈5.37, λ₂≈−0.37). Are they correct?"

No. The eigenvalues of A are 5.37 and −0.37. The singular values of A are σ₁=√λ_max(AᵀA)≈5.46 and σ₂=√λ_min(AᵀA)≈0.37. They are different. In particular:
- Eigenvalues can be negative or complex; singular values are always non-negative.
- For the non-symmetric A=[[1,2],[3,4]], the SVD decomposition A=UΣVᵀ has U≠V (two different orthogonal matrices); eigendecomposition A=PDP⁻¹ has P not orthogonal.
- Only for symmetric positive semidefinite matrices do singular values equal eigenvalues.

Verify: AᵀA=[[10,14],[14,20]]; eigenvalues: λ²−30λ+200−196=λ²−30λ+4=0 → λ=(30±√(900−16))/2=(30±√884)/2; σ₁=√((30+√884)/2)≈5.46≠5.37.

**P49 checkpoint:**
- CORRECT → "SVD singular values ≠ eigenvalues (except for symmetric PSD). Singular values are √eigenvalues of AᵀA, always non-negative. Eigenvalues can be negative or complex." → Gate (P91)
- PARTIAL (knows they differ but not why) → "The eigenvalue equation Ax=λx requires a square matrix; singular values come from the symmetric positive semidefinite matrix AᵀA (which always has non-negative eigenvalues). For non-symmetric A: the eigenvectors don't form an orthogonal basis in general, so P is not orthogonal; but U and V (from SVD) are always orthogonal by construction." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For A=[[0,1],[0,0]] (a nilpotent matrix): eigenvalues are both 0. Compute AᵀA=[[0,0],[1,0]][[0,1],[0,0]]=[[0,0],[0,1]]. What are the singular values? How do they differ from the eigenvalues?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 TRUNCATED-SVD-DISCARDS-INFORMATION):**
Step 1 — "The Eckart-Young theorem (1936) states: among ALL matrices C with rank(C)≤k, the one closest to A in 2-norm and Frobenius norm is Aₖ=U_kΣ_kV_kᵀ. 'Closest' means ‖A−C‖₂ is minimised — no other rank-k matrix can be closer to A. This is a mathematical optimality guarantee, not a heuristic." Step 2 — What is discarded: the rank-1 components σₖ₊₁uₖ₊₁vₖ₊₁ᵀ+…+σᵣuᵣvᵣᵀ. The total error ‖A−Aₖ‖_F² = σₖ₊₁²+…+σᵣ² (sum of squares of discarded singular values). If σₖ₊₁ is much smaller than σₖ, the approximation error is negligible. Step 3 — "The right vocabulary: truncated SVD doesn't discard random information — it discards the LEAST IMPORTANT information (components with the smallest singular values). In image compression, the discarded components correspond to fine noise and detail at the limit of human perception."

**TB-R02 (MC-3 NUMERICAL-RANK-IS-EXACT-RANK):**
Step 1 — "In exact arithmetic, a rank-r matrix has exactly r nonzero singular values and n−r exactly-zero singular values. In floating-point arithmetic, every singular value computed by `numpy.linalg.svd` is slightly perturbed by rounding errors of magnitude ≈u·‖A‖₂ (u=machine epsilon≈10⁻¹⁶ for double). A truly-zero singular value becomes a number like 10⁻¹⁶·‖A‖₂ — very small, but not zero." Step 2 — Threshold choice: a canonical threshold for rank determination is ε = max(m,n)·u·σ₁, where u≈2.2×10⁻¹⁶ and σ₁=‖A‖₂. This is scipy's default in `numpy.linalg.matrix_rank`. Any σᵢ<ε is numerically zero. Step 3 — "Never use `sum(s>0)` to compute rank in floating-point code — floating-point SVD always gives positive values. Always use `sum(s>tol*s[0])` or `np.linalg.matrix_rank(A)` which applies the canonical threshold internally."

**TB-R03 (MC-1 SVD-AND-EIGENDECOMPOSITION-ARE-THE-SAME):**
Step 1 — "Eigendecomposition A=PDP⁻¹: requires square A; D is diagonal with (possibly complex, possibly negative) eigenvalues; P contains eigenvectors (not necessarily orthogonal). SVD A=UΣVᵀ: works for any m×n matrix; Σ has non-negative diagonal (singular values); U (m×m) and V (n×n) are orthogonal matrices. They are structurally different decompositions." Step 2 — When they coincide: if A is symmetric positive semidefinite (A=Aᵀ, all eigenvalues ≥0), then eigendecomposition gives A=QΛQᵀ (since P is orthogonal for symmetric A) and SVD gives A=UΣVᵀ with U=V=Q and Σ=Λ. The two are the same only in this special case. Step 3 — "Memory hook: eigenvalues are a property of square matrices (character of a matrix). Singular values are a property of the mapping A:ℝⁿ→ℝᵐ (stretching of the unit sphere into an ellipsoid). The SVD's two orthogonal matrices U and V handle the asymmetry between input space (ℝⁿ) and output space (ℝᵐ); the eigendecomposition has only one basis P."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Compute the SVD of A=[[1,1],[0,1],[1,0]] by (a) forming AᵀA, (b) finding its eigenvalues (λ₁,λ₂), (c) computing singular values σᵢ=√λᵢ, (d) finding V (eigenvectors of AᵀA), (e) finding U (Uᵢ=Avᵢ/σᵢ). Verify A=UΣVᵀ.
2. A 100×100 matrix A has singular values σ₁=100, σ₂=10, σ₃=1, σ₄=0.1, σ₅=10⁻¹⁰. (a) What is ‖A‖₂? (b) What is κ₂(A)? (c) What is the numerical rank at tolerance ε=10⁻⁸·‖A‖₂? (d) What is ‖A−A₃‖₂ (the error of the rank-3 truncation)?
3. A student solves the least-squares problem Ax=b where A is 50×5 and has singular values 10, 5, 1, 0.01, 10⁻¹². The right-hand side b has noise ‖δb‖=10⁻³. (a) Without regularisation: how large can the 5th component of the least-squares solution be? (b) With TSVD at threshold σ_k<0.1: which singular values are retained? What is the resulting solution norm?
4. For the linear system Ax=b where A has κ₂(A)=10⁸ and the right-hand side b has relative error ε=10⁻¹⁰ (from measurement noise): what is the guaranteed relative error in the computed solution x? What does this say about the meaningful digits in x?

**P55 — Reflect & Consolidate:** "SVD = U Σ Vᵀ; singular values are non-negative, always exist. Best rank-k approximation: Eckart-Young (Aₖ minimises ‖A−C‖₂). 2-norm=σ₁, condition number=σ₁/σₙ. Numerical rank: threshold ε·σ₁. TSVD and Tikhonov regularise ill-conditioned least-squares."

**P76 — Transfer Probe (Cross-link: math.linalg.svd):**
Randomised SVD algorithms (Halko-Martinsson-Tropp, 2011) compute a rank-k approximation in O(mn·log k) operations — much faster than the O(mn·min(m,n)) cost of full SVD. (a) The algorithm draws a random Gaussian matrix Ω (n×(k+p)) and forms Y=AΩ (m×(k+p)). Explain why the column space of Y approximates the dominant left singular subspace of A. (b) After computing Q=qr(Y).Q (orthonormal basis for range(Y)), form B=QᵀA (a small (k+p)×n matrix) and compute its SVD. Show that the resulting factors give an approximate rank-k SVD of A. (c) For a 10⁶×10⁶ sparse matrix with effective rank k=100, estimate the speedup of randomised SVD over computing the full SVD. (d) The power iteration variant Y=(AAᵀ)^q AΩ improves accuracy for matrices with slowly decaying singular values. Why does raising to the power q make the singular value decay faster and improve the approximation?

**P55 — Reflect & Consolidate:** "Randomised SVD: O(mnk) instead of O(mn·min(m,n)) — transforms large-scale SVD from infeasible to seconds. Power iteration improves accuracy for 'flat' singular value spectra. Used in: recommender systems (n=10⁸ users × m=10⁶ items), topic modelling (TF-IDF matrix), scientific simulations (covariance matrices). The randomised sketch Y=AΩ is the key insight: projecting onto k+p random directions captures the k-dimensional dominant subspace with high probability."

**P75 — Mastery Assessment:**
"A natural language processing task requires computing the top-50 singular vectors of a 10⁶×10⁵ TF-IDF document-term matrix (10¹¹ entries, mostly zeros — sparsity 99.99%). (a) Why is full SVD infeasible? What algorithm would you use? (b) The matrix has singular value spectrum σ₁=100, σ₂=80, …, σ₅₀=10, σ₅₁=0.1 (sharp drop). What numerical rank threshold captures the meaningful structure? (c) The top-50 truncated SVD is used for document retrieval. A query vector q is projected into the SVD space as ŷ=U₅₀ᵀq. Why is the projection into U₅₀ preferable to using the raw query vector for similarity computation? (d) If a new document arrives, can the rank-50 SVD be updated cheaply without recomputing from scratch? What is the rank-1 update to the SVD?"

**P55 — Reflect & Consolidate:** "Large-scale SVD: always use randomised or Lanczos-based algorithms (Krylov subspace). The SVD of a sparse matrix is NOT sparse — U and V are dense — so memory for the full SVD scales as O((m+n)k), not the sparse entry count. Online SVD updates (rank-1 perturbations) allow streaming data without full recomputation — essential for recommender systems and streaming PCA."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.svd complete
- Score 3/5 → REVIEW SVD vs. eigendecomposition and numerical rank; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.svd or math.num.qr-algorithm; reassign

**P78 — Completion:** Numerical SVD certified. Student explains the two-phase computation (bidiagonalisation + QR-SVD), applies Eckart-Young for best rank-k approximation, computes 2-norm and condition number from singular values, determines numerical rank with threshold, regularises ill-conditioned least squares via TSVD, and distinguishes SVD from eigendecomposition.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.linalg.svd])
Target: Randomised SVD; probabilistic low-rank approximation; power iteration; large-scale applications
Skill tested: Explain randomised sketch; derive approximate SVD from QᵀA; estimate speedup; analyse power iteration accuracy improvement

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

# Blueprint: math.num.qr-algorithm

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.qr-algorithm |
| name | QR Algorithm for Eigenvalues |
| Domain | math.num |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 6 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.linalg.qr-factorization, math.linalg.eigenvalues |
| Cross-links | math.linalg.qr-factorization |
| Unlocks | — |

## Component 1 — Learning Objective
Given a real square matrix A, the student explains how repeated QR factorisation (Aₖ₊₁=RₖQₖ, where AₖQₖ=QₖRₖ) drives A toward Schur form; derives the similarity-transformation argument showing eigenvalues are preserved at each step; explains why the basic QR iteration converges (at a rate determined by |λᵢ/λᵢ₊₁|); describes how shifts (Wilkinson shift) and deflation accelerate convergence to O(1) steps per eigenvalue in practice; and identifies why the QR algorithm is the standard library method for dense eigenvalue problems (O(n³) per iteration, global convergence with shifts).

## Component 2 — CPA Entry Stage
**C — Concrete** (repeatedly multiply and divide a positive number by it rounded version — watch it converge to an integer — before any matrix notation)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | QR-ALGORITHM-IS-QR-FACTORIZATION | Student confuses the QR algorithm (an iterative eigenvalue method) with QR factorisation (a one-shot decomposition A=QR) — believes they are the same thing applied differently | Type 3 — language contamination ("QR algorithm" shares the name "QR" with QR factorisation; the algorithm uses QR factorisation at each step, intensifying the confusion; students say "I factor A by QR" meaning either the one-shot or the iterative method) |
| MC-2 | QR-GIVES-EIGENVECTORS-DIRECTLY | Student believes the matrices Qₖ from each QR step are the eigenvectors — does not understand that only after full convergence does the accumulated product Q₁Q₂…Qₖ approximate the eigenvector matrix | Type 5 — instruction-induced (the notation Qₖ appears at every step and Q is the eigenvector matrix in the spectral theorem, so students conflate any Q in a QR step with the eigenvector matrix) |
| MC-3 | SHIFTS-CHANGE-THE-EIGENVALUES | Student thinks that shifting (A−σI) changes the eigenvalues of the original problem — does not recognise that σ is subtracted and then added back, so the final eigenvalues are eigenvalues of A plus σ | Type 1 — overgeneralization (any modification to a matrix sounds like it changes the answer; "shifting" sounds like "moving" the eigenvalues permanently) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of the QR algorithm:**

| Representation | Content |
|---|---|
| Iterative procedure | A₀=A; for k=1,2,…: factor Aₖ₋₁=QₖRₖ; set Aₖ=RₖQₖ; after convergence, diagonal entries of Aₖ are eigenvalues |
| Similarity invariant | Aₖ=RₖQₖ=(Qₖᵀ Aₖ₋₁ Qₖ): each step is a similarity transformation, so all Aₖ have the same eigenvalues as A |
| Convergence intuition | Power iteration: Aᵏe₁→dominant eigenvector; QR iteration simultaneously performs power iteration on all columns of Q — the off-diagonal entries shrink at rate |λ₂/λ₁|ᵏ for the (2,1) entry |
| Schur form | The iteration drives A toward upper triangular (Schur form) T; eigenvalues appear on the diagonal of T; if A is symmetric, T is diagonal (spectral theorem) |

**Basic QR iteration (unshifted):**
```
A₀ = A
for k = 1, 2, ...:
    Qₖ, Rₖ = qr(Aₖ₋₁)        # factor Aₖ₋₁ = Qₖ Rₖ
    Aₖ = Rₖ Qₖ                 # reverse the factors
```
After convergence: Aₖ ≈ T (Schur form), diagonal entries are eigenvalues.

**Why eigenvalues are preserved:** Aₖ = Rₖ Qₖ = Qₖᵀ (Qₖ Rₖ) Qₖ = Qₖᵀ Aₖ₋₁ Qₖ — an orthogonal similarity transformation. Since similarity transformations preserve characteristic polynomials, eigenvalues are unchanged at every step.

**P49 checkpoint:**
- CORRECT → "QR algorithm: repeatedly factor Aₖ=QₖRₖ, reassemble Aₖ₊₁=RₖQₖ. Each step is a similarity transformation — eigenvalues preserved. Convergence: off-diagonals shrink at rate |λ₂/λ₁|." → A02
- PARTIAL (understands the procedure but not why eigenvalues are preserved) → "Aₖ₊₁=RₖQₖ=Qₖᵀ(QₖRₖ)Qₖ=Qₖᵀ Aₖ Qₖ. An orthogonal similarity transformation (B=QᵀAQ with Qᵀ=Q⁻¹) has the same eigenvalues as A because det(B−λI)=det(QᵀAQ−λI)=det(Qᵀ)det(A−λI)det(Q)=det(A−λI). The characteristic polynomial is unchanged." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Apply two iterations of unshifted QR to A=[[2,1],[1,2]]. Compute Q₁,R₁,A₁=R₁Q₁, then Q₂,R₂,A₂=R₂Q₂. What do you observe about the off-diagonal entries?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Shifts and deflation gallery:**

**Problem with unshifted QR:** Convergence rate = |λ₂/λ₁|ᵏ. For A with eigenvalues 10 and 9.99, |λ₂/λ₁|=0.999 — the off-diagonal entry (2,1) shrinks by only 0.1% per iteration, requiring ~7,000 iterations to reach machine precision.

**Shifted QR:** Choose shift σ≈λₙ (the smallest eigenvalue). Factor (Aₖ−σI)=QₖRₖ, set Aₖ₊₁=RₖQₖ+σI. The new convergence rate: |(λₙ₋₁−σ)/(λₙ−σ)|ᵏ. With a good shift, this ratio → 0 much faster.

**Wilkinson shift:** σ = eigenvalue of the bottom-right 2×2 submatrix closer to aₙₙ. Gives asymptotically cubic convergence: |aₙ,ₙ₋₁|³ at each step.

**Deflation:** Once |aₙ,ₙ₋₁|<ε (small), set it to zero. Now aₙₙ is an eigenvalue and the problem reduces from n×n to (n−1)×(n−1). Repeat for the new bottom-right 2×2.

**Cost analysis:**
| Phase | Cost |
|---|---|
| Reduction to Hessenberg form (one-time preprocessing) | O(n³) |
| Each QR iteration on Hessenberg matrix | O(n²) |
| Iterations until deflation (with Wilkinson shift) | O(1) per eigenvalue (empirically 2–3 iterations) |
| Total: finding all n eigenvalues | O(n²) × O(n) deflations = O(n³) |

**Pattern:** With shifts and deflation, the QR algorithm finds ALL eigenvalues of a real matrix in O(n³) operations. It is backward stable (small backward error). For n≤10,000, this is the standard approach (LAPACK `dsyev`, `dgeev`).

**P49 checkpoint:**
- CORRECT → "Shifted QR: σ≈λₙ accelerates convergence of the bottom element to near-zero. Wilkinson shift gives cubic convergence. Deflation removes converged eigenvalues. Total cost O(n³)." → A03
- PARTIAL (understands deflation but not why the shift accelerates convergence) → "Convergence of the (n,n−1) entry depends on |(λₙ₋₁−σ)/(λₙ−σ)|. With σ=λₙ exactly: (λₙ−σ)=0 — the denominator is zero, the ratio blows up favourably — instantaneous convergence. With σ≈λₙ (Wilkinson shift): the ratio is small but not zero, giving very fast (cubic) convergence in practice." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Without shifts, the QR iteration for A=diag(5,4) (already diagonal) produces A₁=A₂=…=A forever. Why does unshifted QR converge so slowly when eigenvalues are close?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**QR algorithm vs. QR factorisation gate:**

**Gate question (MC-1):** "A student is asked to find the eigenvalues of A=[[4,1],[2,3]]. They compute the QR factorisation A=QR and say the eigenvalues appear on the diagonal of R. Are they correct?"

The diagonal of R from a QR factorisation is NOT the eigenvalues. The diagonal of R gives the magnitudes of the Gram-Schmidt norms (pivot values in Householder reduction), not eigenvalues. The eigenvalues of A are 5 and 2 (characteristic polynomial: (4−λ)(3−λ)−2=λ²−7λ+10=0 → λ=5,2). The diagonal of R from A=QR is different: it depends on the column norms and Gram-Schmidt process, not the spectrum.

The QR **algorithm** iterates: factor Aₖ=QₖRₖ, then set Aₖ₊₁=RₖQₖ, repeat. After convergence, the DIAGONAL of Aₖ (not R!) contains the eigenvalues.

**P49 checkpoint:**
- CORRECT → "The diagonal of R in a QR factorisation is NOT the eigenvalues. The QR algorithm iterates the reversal Aₖ₊₁=RₖQₖ; after convergence, the diagonal of Aₖ (the full matrix, not just R) contains eigenvalues." → Gate (P91)
- PARTIAL (knows the diagonal of Aₖ at convergence but confused about intermediate steps) → "During the iteration, Aₖ is generally not triangular — it is the full matrix. Only when off-diagonal entries below the diagonal have converged to zero does Aₖ become (approximately) upper triangular, and THEN the diagonal entries are the eigenvalues. The individual Rₖ factors along the way are not the Schur form." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Apply one QR iteration to A=[[3,1],[0,2]]. Already upper triangular. Compute Q,R, then A₁=RQ. What are the diagonal entries of A₁? Are they 3 and 2?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 QR-GIVES-EIGENVECTORS-DIRECTLY):**
Step 1 — "The matrices Qₖ in each iteration are NOT the eigenvector matrix. Each Qₖ is an orthogonal factor in the factorisation Aₖ₋₁=QₖRₖ — it depends on the current (partially converged) iterate, not the original A. After k steps, the accumulated product Z_k=Q₁Q₂…Qₖ converges to the unitary matrix Q in the Schur decomposition A=QTQᵀ — that is, the columns of Z_k converge to the Schur vectors." Step 2 — For a symmetric matrix, Schur vectors = eigenvectors (since T is diagonal). For a non-symmetric matrix, the Schur form is upper triangular (not diagonal), and the columns of Z_k are NOT the eigenvectors — they are the Schur vectors (a basis in which A is upper triangular). Step 3 — "To get eigenvectors of a non-symmetric A: after QR convergence gives the upper triangular Schur form T, solve (T−λᵢI)x=0 for each eigenvalue λᵢ to get the Schur eigenvectors, then transform back by Zₖ."

**TB-R02 (MC-3 SHIFTS-CHANGE-THE-EIGENVALUES):**
Step 1 — "A shift σ replaces A with A−σI at each step, performs one QR iteration, then adds σI back: Aₖ₊₁=Rₖ(A_{k}−σI)Qₖ+σI. The eigenvalues of A−σI are (λᵢ−σ); after adding σI back, the eigenvalues return to λᵢ. The shift is subtracted and restored — it never permanently moves the eigenvalues." Step 2 — Analogy: weighing luggage by subtracting the known weight of the trolley, measuring the net weight, then adding the trolley back. The luggage weight is unchanged; you just made the measurement easier. The shift σ subtracts from A to make the iteration converge faster, then gets added back. Step 3 — "The correct statement: a shift σ accelerates convergence to the eigenvalue nearest σ, without changing the eigenvalues of the original problem. The Wilkinson shift (σ = eigenvalue of bottom 2×2 submatrix closest to the bottom-right diagonal entry) targets the next eigenvalue to converge and achieves cubic convergence asymptotically."

**TB-R03 (MC-1 QR-ALGORITHM-IS-QR-FACTORIZATION):**
Step 1 — "QR factorisation: given A, find Q (orthogonal) and R (upper triangular) such that A=QR. This is a one-time decomposition. It is used (among other things) as a subroutine in the QR algorithm." Step 2 — "QR algorithm: an iterative method for eigenvalues. It calls QR factorisation at EVERY STEP as an update mechanism: factor Aₖ=QₖRₖ, then reverse: Aₖ₊₁=RₖQₖ. The iteration is repeated dozens of times on successively simpler subproblems. The 'QR' in 'QR algorithm' names the subroutine used, not the final output." Step 3 — "Memory hook: QR factorisation is a noun (a decomposition). QR algorithm is a verb (it iterates). The factorisation solves A=QR once. The algorithm applies QR factorisation repeatedly to drive A toward diagonal/upper-triangular form."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Apply two steps of unshifted QR iteration to A=[[3,1],[1,3]]. Compute Q₁,R₁,A₁=R₁Q₁, then Q₂,R₂,A₂=R₂Q₂. What are the diagonal entries of A₂? Compare with the eigenvalues of A (4 and 2). Is A symmetric? What does convergence to a diagonal matrix imply?
2. For A=[[5,4],[4,5]], compute the Wilkinson shift σ for the first iteration (σ = eigenvalue of the 2×2 matrix A itself closest to a₂₂=5). Apply one shifted QR step: factor (A−σI)=QR, compute A₁=RQ+σI. Compare A₁'s off-diagonal with A's.
3. The unshifted QR iteration on A with eigenvalues 10.0 and 9.9 converges at rate |9.9/10.0|ᵏ=0.99ᵏ. How many iterations to reduce the off-diagonal entry by a factor of 10⁻¹²? With Wilkinson shift (cubic convergence), estimate the iterations needed.
4. LAPACK's `dsyev` finds eigenvalues of a 1000×1000 symmetric matrix in about 0.5 seconds. A student proposes instead to (a) compute all 1000 eigenvalues via the characteristic polynomial, or (b) run 1000 rounds of power iteration starting from random vectors. Why are both approaches inferior to the QR algorithm?

**P55 — Reflect & Consolidate:** "QR algorithm: iterate Aₖ₊₁=RₖQₖ (similarity transform). Eigenvalues are preserved. Converges to Schur form. Wilkinson shift: cubic convergence O(|aₙ,ₙ₋₁|³). Deflation removes converged eigenvalues. Total cost O(n³) with Hessenberg preprocessing."

**P76 — Transfer Probe (Cross-link: math.linalg.qr-factorization):**
The singular value decomposition (SVD) is closely related to the QR algorithm applied to AᵀA. (a) Show that the eigenvalues of AᵀA are the squares of the singular values of A. (b) A one-sided Jacobi SVD algorithm repeatedly applies plane rotations (Givens rotations) to drive AᵀA toward diagonal form — compare this to the QR algorithm's use of Householder reflections. (c) The bidiagonalisation step reduces A to bidiagonal form before applying the QR-like SVD iteration — how does this parallel the Hessenberg reduction in the standard QR algorithm for eigenvalues? (d) For a rank-deficient matrix (some σᵢ=0), what happens to the QR iteration on AᵀA? How does numerical near-zero singular values affect the backward stability of the computed SVD?

**P55 — Reflect & Consolidate:** "The SVD of A connects directly to the QR algorithm via the eigenvalues of AᵀA. Bidiagonalisation (reducing A to bidiagonal form) plays the role of Hessenberg reduction in the eigenvalue problem. Jacobi SVD and QR-SVD are the two practical approaches — Jacobi is slower but preserves small singular values better (better relative accuracy for nearly rank-deficient matrices)."

**P75 — Mastery Assessment:**
"A data scientist computes the PCA of a 500×50 matrix X (500 observations, 50 features). (a) They need the top 5 singular values and singular vectors of X. Should they form XᵀX and apply the full QR eigenvalue algorithm, or use a partial SVD solver (e.g. Lanczos, randomised SVD)? (b) The matrix X has condition number κ≈10⁸. How accurately can the QR algorithm compute the smallest singular values? (c) After one QR iteration on XᵀX, the off-diagonal entry at position (50,49) is 0.01% of the diagonal entry. How many more iterations (with Wilkinson shift) are needed for this entry to reach machine precision? (d) If X is updated each day with 10 new rows, is it practical to rerun the full QR eigenvalue algorithm each time? What alternative update strategy would you propose?"

**P55 — Reflect & Consolidate:** "For large, sparse, or streaming matrices: full QR is O(n³) — prohibitive. Use Krylov subspace methods (Lanczos, Arnoldi) or randomised SVD instead. Full QR is the right tool for dense matrices of moderate size (n≤10,000). Shift choice determines whether convergence is linear (no shift), quadratic (Rayleigh quotient shift), or cubic (Wilkinson shift)."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.qr-algorithm complete
- Score 3/5 → REVIEW similarity invariance and shift mechanics; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.qr-factorization or math.linalg.eigenvalues; reassign

**P78 — Completion:** QR algorithm certified. Student explains the similarity-transformation loop, convergence mechanics, Wilkinson shifts and deflation, the O(n³) total cost, and the distinction between QR factorisation (one-shot) and QR algorithm (iterative eigenvalue method).

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.linalg.qr-factorization])
Target: SVD via AᵀA; bidiagonalisation; Jacobi vs. QR-SVD; near-rank-deficient stability
Skill tested: Connect QR eigenvalue algorithm to SVD computation; compare bidiagonalisation to Hessenberg reduction; analyse numerical accuracy for ill-conditioned matrices

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

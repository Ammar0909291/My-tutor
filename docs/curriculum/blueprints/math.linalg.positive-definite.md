# Teaching Blueprint: Positive Definite Matrix (`math.linalg.positive-definite`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.positive-definite` |
| name | Positive Definite Matrix |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.linalg.spectral-theorem` |
| unlocks | `math.linalg.cholesky` |
| cross_links | `math.opt.convex-function` (unauthored — see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition building on the already-mastered Spectral Theorem's eigenvalue structure |
| description (KG) | A symmetric matrix A is positive definite iff vᵀAv>0 for all nonzero v, iff all eigenvalues are positive, iff all leading principal minors are positive (Sylvester's criterion). PSD: ≥0 instead of >0. |

## Component 1 — Learning Objectives

- LO1: Define a symmetric matrix $A$ as **positive definite** via the quadratic-form condition $v^TAv>0$ for every nonzero vector $v$, and analyze what this condition means geometrically (the quadratic form never dips to zero or negative, except trivially at $v=0$).
- LO2: Use the **eigenvalue characterization** — $A$ is positive definite iff EVERY eigenvalue is (strictly) positive — as the most practically usable test, directly reusing `math.linalg.spectral-theorem`'s factorization $A=Q\Lambda Q^T$ to show why this equivalence holds.
- LO3: Apply **Sylvester's criterion** (all leading principal minors are positive) as a THIRD equivalent test, and distinguish **positive semi-definite** (PSD: $v^TAv\ge0$, allowing equality) from positive definite (strict inequality) — directly refuting the misconception that these two conditions are interchangeable, since a PSD matrix can have a zero eigenvalue where a genuinely positive-definite matrix cannot.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.spectral-theorem` (every symmetric matrix factors as $A=Q\Lambda Q^T$ with $Q$ orthogonal and $\Lambda$ the real diagonal matrix of eigenvalues).

## Component 3 — Core Explanation

**The quadratic-form definition**: a symmetric matrix $A$ is **positive definite** if $v^TAv>0$ for EVERY nonzero vector $v$ (the quadratic form $v^TAv$ is a single number for each $v$, and positive definiteness requires it to always come out strictly positive, never zero or negative, whenever $v\ne0$).

**Why the eigenvalue test is equivalent, via the Spectral Theorem**: substituting $A=Q\Lambda Q^T$ into the quadratic form: $v^TAv = v^TQ\Lambda Q^Tv = (Q^Tv)^T\Lambda(Q^Tv)$. Letting $w=Q^Tv$ (a genuine change of variables, since $Q$ is invertible — in fact $Q^{-1}=Q^T$ — so $v\ne0 \iff w\ne0$): $v^TAv = w^T\Lambda w = \sum_i\lambda_iw_i^2$ (since $\Lambda$ is diagonal). This sum of squares, weighted by the eigenvalues $\lambda_i$, is guaranteed positive for every nonzero $w$ **if and only if** every $\lambda_i>0$ — if even one eigenvalue were $\le0$, choosing $w$ to be the corresponding eigenvector-direction (all other components zero) would make the sum $\le0$. This is exactly why "positive definite" and "all eigenvalues positive" are the SAME condition, directly derived from the Spectral Theorem's factorization rather than asserted separately.

**Sylvester's criterion and the PSD distinction**: a third equivalent test, **Sylvester's criterion**, states that $A$ is positive definite iff all its **leading principal minors** (the determinants of the top-left $k\times k$ submatrices, for $k=1,2,\dots,n$) are positive — a computational alternative that avoids finding eigenvalues explicitly. **Positive semi-definite (PSD)** relaxes the condition to $v^TAv\ge0$ (allowing equality for some nonzero $v$) — by the same eigenvalue argument, this corresponds to all eigenvalues being $\ge0$ (zero eigenvalues now permitted). The distinction matters: a PSD matrix with a zero eigenvalue has some nonzero direction $v$ along which $v^TAv=0$ exactly — the quadratic form genuinely touches zero, which a strictly positive-definite matrix's quadratic form never does.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying positive definiteness via the quadratic form directly)**: For $A=\begin{pmatrix}2&0\\0&3\end{pmatrix}$ and $v=(v_1,v_2)$: $v^TAv = 2v_1^2+3v_2^2$. This is strictly positive for ANY nonzero $(v_1,v_2)$ (at least one of $v_1,v_2$ is nonzero, and its squared term contributes a positive amount, with the other term contributing $\ge0$) — confirming $A$ is positive definite directly from the definition.

**Example 2 (LO2 — the eigenvalue test, connected to the Spectral Theorem)**: For $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ (the symmetric matrix from `math.linalg.spectral-theorem`'s own worked example, with eigenvalues $1,3$ — both positive): by the eigenvalue characterization, $A$ IS positive definite. Verify directly via the quadratic form with $w=Q^Tv$: $v^TAv = 1\cdot w_1^2+3\cdot w_2^2$, manifestly positive for any nonzero $w$ (hence any nonzero $v$, since $w=Q^Tv$ is nonzero exactly when $v$ is) — confirming the eigenvalue test and the quadratic-form definition agree, exactly as the Spectral-Theorem-based derivation in Component 3 predicts.

**Example 3 (LO3 — positive semi-definite vs. positive definite, breaking MC-1)**: Consider $A=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ (symmetric). Its eigenvalues: $\det(A-\lambda I)=(1-\lambda)^2-1=\lambda^2-2\lambda=0$, giving $\lambda=0,2$ — one eigenvalue is exactly ZERO, so $A$ is NOT positive definite (fails the strict-positivity eigenvalue test), but IS positive semi-definite (all eigenvalues $\ge0$). Verify directly: for $v=(1,-1)$ (a specific nonzero vector, in fact the eigenvector for $\lambda=0$), $v^TAv = 1(1)^2+2(1)(1)(-1)+1(-1)^2 = 1-2+1=0$ — the quadratic form genuinely EQUALS zero for this nonzero $v$, confirming $A$ fails strict positive definiteness (which would require $v^TAv>0$ for every nonzero $v$, with no exceptions) while still qualifying as PSD.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Quadratic Form Condition, Verified Directly (Primitive P11: Representation Shift)

State: "positive definite means: no matter which nonzero direction $v$ you plug in, $v^TAv$ always comes out strictly positive — never zero, never negative." Work Example 1's direct verification for a diagonal matrix, where the quadratic form is transparently a sum of positive-coefficient squares.

### Teaching Action A02 — Deriving the Eigenvalue Test From the Spectral Theorem (Primitive P11: Representation Shift)

Derive the substitution $v^TAv=\sum\lambda_iw_i^2$ live, using $A=Q\Lambda Q^T$ from `math.linalg.spectral-theorem`. State: "this is why 'positive definite' and 'all eigenvalues positive' are literally the same fact, not two coincidentally-matching conditions — the Spectral Theorem's factorization IS the proof." Work Example 2's direct verification.

### Teaching Action A03 — PSD vs. Positive Definite: The Zero-Eigenvalue Boundary (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: a matrix with one zero eigenvalue, where a specific nonzero $v$ makes the quadratic form EXACTLY zero. State: "PSD allows this boundary case — the quadratic form can touch zero. Genuinely positive definite matrices never do, for any nonzero input at all."

- **MC-1 hook**: ask "are 'positive definite' and 'positive semi-definite' just two names for the same condition?" — a "yes" answer reveals MC-1 (treating the strict and non-strict conditions as interchangeable, missing that a zero eigenvalue distinguishes them exactly at the boundary).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify directly (via the quadratic form) that $A=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ is positive definite.
  2. Find the eigenvalues of $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$ and use the eigenvalue test to determine whether it is positive definite.
  3. Determine whether $A=\begin{pmatrix}2&2\\2&2\end{pmatrix}$ is positive definite, positive semi-definite, or neither, finding its eigenvalues explicitly and identifying a specific nonzero $v$ where the quadratic form is zero (if applicable).
  4. Using Sylvester's criterion (leading principal minors), verify whether $A=\begin{pmatrix}2&1\\1&5\end{pmatrix}$ is positive definite, showing both minors explicitly.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.opt.convex-function` is not yet authored; a future revision may add a genuine cross-link probe into the convexity-Hessian connection once that entry exists)**: "An optimization algorithm checks the Hessian matrix $H$ (second-derivative matrix, guaranteed symmetric per `math.linalg.symmetric-matrix`'s own Hessian example) at a candidate point to determine whether it's a local minimum. (a) Explain, using the eigenvalue test, what condition on $H$'s eigenvalues would confirm the point is a genuine local minimum (rather than a maximum or saddle point). (b) If the algorithm instead finds $H$ has all eigenvalues $\ge0$ but with one eigenvalue exactly zero, explain what this tells the algorithm about the point — is it definitely a strict local minimum, or is more information needed? (c) Explain why checking Sylvester's criterion (leading principal minors) might be computationally preferable to finding all of $H$'s eigenvalues explicitly, for a large Hessian matrix."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POSITIVE-DEFINITE-AND-PSD-TREATED-AS-INTERCHANGEABLE | Believing positive definite and positive semi-definite are the same condition, missing that a zero eigenvalue distinguishes them exactly at the strict/non-strict boundary | Foundational |
| MC-2 | POSITIVE-DEFINITENESS-CHECKED-ON-NON-SYMMETRIC-MATRIX | Attempting to apply the positive-definiteness eigenvalue test to a non-symmetric matrix, missing that the Spectral Theorem (and hence the entire eigenvalue-based equivalence) only applies to symmetric matrices | Foundational |
| MC-3 | ONE-EIGENVALUE-CHECKED-INSTEAD-OF-ALL | Concluding a matrix is positive definite after verifying only one or a few eigenvalues are positive, rather than confirming EVERY eigenvalue is positive | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Positive-Definite-PSD Interchangeability Assumption") → P41 (detect: ask whether a matrix with eigenvalues $0$ and $2$ is positive definite) → P64 (conceptual shift: re-walk Example 3's direct demonstration — the quadratic form equals exactly zero for a specific nonzero $v$ — re-anchoring on "PSD allows touching zero; positive definite never does").
- **B02 (targets MC-2)**: P27 (name it: "Positive-Definiteness on Non-Symmetric Matrix") → P41 (detect: ask a student to check positive-definiteness of a non-symmetric matrix using the eigenvalue test) → P64 (conceptual shift: re-anchor on "the entire eigenvalue-equivalence argument used the Spectral Theorem's $A=Q\Lambda Q^T$ factorization, which requires symmetry — this machinery simply doesn't apply otherwise").
- **B03 (targets MC-3)**: P27 (name it: "Partial Eigenvalue Check") → P41 (detect: give a 3x3 matrix with one negative eigenvalue among otherwise positive ones, and check whether a student concludes positive-definiteness after checking only the positive ones) → P64 (conceptual shift: re-anchor on "EVERY eigenvalue must be positive — a single negative or zero eigenvalue disqualifies the whole matrix, exactly as Example 3's single zero eigenvalue did").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.spectral-theorem` (the factorization $A=Q\Lambda Q^T$ this concept's eigenvalue characterization is directly derived from).
- **Unlocks**: `math.linalg.cholesky` (the Cholesky decomposition exists precisely for positive definite matrices).
- **Cross-link**: KG lists `math.opt.convex-function` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.opt.convex-function.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the convexity-Hessian connection (a function is convex iff its Hessian is PSD everywhere) once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/analyze tag places this at a "3 TAs + gate" tier — A01 (the quadratic-form definition), A02 (the eigenvalue test derived from the Spectral Theorem), and A03 (PSD vs. positive definite) each target a distinct LO, appropriate for an "analyze" bloom-level concept requiring genuine synthesis of the Spectral Theorem's machinery rather than rote application.
- The eigenvalue test's derivation (Component 3/A02) was deliberately worked as a genuine PROOF using the Spectral Theorem's factorization, rather than simply stated as an equivalent fact — this matches the "analyze" bloom level and directly reinforces why this concept sits immediately downstream of `math.linalg.spectral-theorem` rather than being introduced independently.
- Example 3 deliberately identifies the SPECIFIC nonzero vector ($v=(1,-1)$, the zero-eigenvalue eigenvector) where the quadratic form vanishes, rather than merely asserting PSD status abstractly — this concrete demonstration is the strongest available evidence against MC-1's interchangeability assumption.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.opt.convex-function not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct definition building on the already-mastered Spectral Theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

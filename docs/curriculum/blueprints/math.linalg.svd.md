# Teaching Blueprint: Singular Value Decomposition (`math.linalg.svd`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.svd` |
| name | Singular Value Decomposition |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.linalg.spectral-theorem`, `math.linalg.qr-factorization` |
| unlocks | (none in KG; `math.linalg.singular-values`, `math.linalg.pseudoinverse` are children) |
| cross_links | `math.num.svd`, `math.opt.pca` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Any m×n matrix A = UΣVᵀ where U (m×m) and V (n×n) are orthogonal and Σ (m×n) is diagonal with non-negative entries (singular values). Most powerful matrix decomposition; foundation of numerical linear algebra and data science.

 |

## Component 1 — Learning Objectives

- LO1: State the SVD structure — ANY $m\times n$ matrix $A$ (not just square, not just diagonalizable) factors as $A=U\Sigma V^T$, where $U$ ($m\times m$) and $V$ ($n\times n$) are ORTHOGONAL and $\Sigma$ ($m\times n$) is diagonal with NON-NEGATIVE entries (the singular values) — the crucial generalization beyond `math.linalg.diagonalization`, which requires a square, diagonalizable matrix.
- LO2: Connect SVD to the SPECTRAL THEOREM by recognizing that $A^TA$ is always symmetric, so its eigendecomposition (via the spectral theorem) gives $V$'s columns (eigenvectors of $A^TA$) and $\Sigma$'s entries (square roots of $A^TA$'s eigenvalues — the singular values are NEVER negative, since $A^TA$'s eigenvalues are always non-negative).
- LO3: State why SVD is more UNIVERSALLY APPLICABLE than diagonalization — SVD exists for EVERY matrix (any shape, any rank, diagonalizable or not), while diagonalization requires a square matrix with enough independent eigenvectors.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.spectral-theorem` (needed for the symmetric-matrix eigendecomposition underlying $A^TA$'s diagonalization) and `math.linalg.qr-factorization` (needed for the orthogonal-matrix machinery $U,V$ share with $Q$).

## Component 3 — Core Explanation

**Singular Value Decomposition (SVD)** is the single most powerful and universally applicable matrix decomposition: ANY $m\times n$ matrix $A$ — square or rectangular, diagonalizable or not — factors as $A=U\Sigma V^T$, where $U$ ($m\times m$) and $V$ ($n\times n$) are ORTHOGONAL matrices, and $\Sigma$ ($m\times n$) is diagonal with NON-NEGATIVE entries called the **singular values**.

The connection to the SPECTRAL THEOREM (`math.linalg.spectral-theorem`) is what makes SVD constructible: $A^TA$ is ALWAYS symmetric (since $(A^TA)^T=A^TA$), so the spectral theorem guarantees it has a full set of ORTHOGONAL eigenvectors with REAL, non-negative eigenvalues. These eigenvectors become $V$'s columns, and the singular values are the SQUARE ROOTS of $A^TA$'s eigenvalues — non-negative because $A^TA$'s eigenvalues themselves are always non-negative (a direct consequence of $A^TA$ being positive semi-definite).

This makes SVD strictly more general than diagonalization: diagonalization requires a SQUARE matrix with $n$ independent eigenvectors (many matrices fail this), while SVD exists for EVERY matrix of EVERY shape, always. This universality is exactly why SVD underlies numerical linear algebra and data science applications (dimensionality reduction, PCA, low-rank approximation) where diagonalization simply doesn't apply.

## Component 4 — Worked Examples

**Example 1 (LO1 — SVD structure for a non-square matrix, breaking MC-1)**: For a $3\times2$ matrix $A$, identify the shapes of $U$, $\Sigma$, $V$ in $A=U\Sigma V^T$. $U$ is $3\times3$ (matching $A$'s ROW count), $\Sigma$ is $3\times2$ (matching $A$'s FULL shape), $V$ is $2\times2$ (matching $A$'s COLUMN count). A common error assumes $U$ and $V$ must both be square with the SAME dimension (like in diagonalization's single $P$ matrix) — but SVD genuinely uses TWO DIFFERENT orthogonal matrices, sized according to $A$'s row count ($U$) and column count ($V$) SEPARATELY, which is exactly what allows SVD to handle non-square matrices at all.

**Example 2 (LO2 — deriving V and Σ from A^TA, breaking MC-2)**: For $A=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix}$ (a $3\times2$ matrix), compute $A^TA=\begin{pmatrix}1&0\\0&4\end{pmatrix}$ (a symmetric $2\times2$ matrix). By the spectral theorem, $A^TA$'s eigenvalues are $1$ and $4$ (already diagonal here), with eigenvectors $(1,0)$ and $(0,1)$ forming $V$'s columns. The singular values are $\sqrt1=1$ and $\sqrt4=2$ — the SQUARE ROOTS of $A^TA$'s eigenvalues, NOT the eigenvalues themselves. A common error uses $A^TA$'s eigenvalues DIRECTLY as the singular values (writing $\Sigma=\text{diag}(1,4)$ instead of the correct $\text{diag}(2,1)$, sorted largest-first) — singular values are specifically the square roots, and by convention are listed in DECREASING order.

**Example 3 (LO3 — SVD's universality vs. diagonalization's limits)**: For a genuinely non-square, non-diagonalizable-in-any-sense $3\times2$ matrix (like Example 1's $A$), note that diagonalization doesn't even apply (diagonalization requires a SQUARE matrix), while SVD always works regardless of shape — directly illustrating why SVD, not diagonalization, is the tool of choice for general data matrices (which are rarely square).

## Component 5 — Teaching Actions

### Teaching Action A01 — U and V Have Different Sizes, Matching Rows and Columns Separately (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling $U$'s size against $A$'s row count and $V$'s size against $A$'s column count, contrasting with diagonalization's single square $P$.

- **MC-1 hook**: check whether $U$ and $V$ are correctly recognized as differently-sized orthogonal matrices for a non-square $A$.

### Teaching Action A02 — Singular Values Are Square Roots of A^TA's Eigenvalues, Sorted Descending (Primitive P11: Representation Shift)

Work Example 2, explicitly deriving $A^TA$, applying the spectral theorem, then taking square roots and sorting.

- **MC-2 hook**: this directly targets MC-2 (using $A^TA$'s eigenvalues directly instead of their square roots, or failing to sort descending).

### Teaching Action A03 — SVD Applies Universally; Diagonalization Does Not (Primitive P06: Contrast Pair)

Work Example 3, contrasting SVD's unconditional applicability against diagonalization's square-matrix, full-eigenvector requirement.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For a $4\times6$ matrix $A$, state the shapes of $U$, $\Sigma$, $V$ in its SVD.
  2. Given $A^TA$ has eigenvalues 9 and 16, compute the corresponding singular values, sorted in decreasing order.
  3. Explain, in one sentence, why $A^TA$ is guaranteed to be symmetric for ANY matrix $A$ (even a non-square one).
  4. Explain why a genuinely rectangular data matrix (e.g. 1000 samples × 20 features) cannot be diagonalized directly, but always has an SVD.
- **P76 (Transfer Probe, mode = independence)**: "A recommendation-system data matrix $A$ (1000 users × 50 movies, each entry a rating) is analyzed via SVD, $A=U\Sigma V^T$, to discover a small number of dominant 'taste patterns' (large singular values) versus noise (small singular values). (a) Explain why this $1000\times50$ matrix could never be analyzed via ordinary diagonalization (`math.linalg.diagonalization`) directly, connecting to the square-matrix requirement. (b) Explain, conceptually, why keeping only the LARGEST few singular values (and discarding the rest) gives a good LOW-RANK APPROXIMATION of the original ratings matrix — i.e., why large singular values correspond to the dominant, most information-carrying directions in the data."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | U-AND-V-ASSUMED-SAME-SIZE-LIKE-DIAGONALIZATIONS-SINGLE-P | Assuming SVD's U and V must be the same size (like diagonalization's single P), rather than recognizing they are separately sized to A's rows and columns respectively | Foundational |
| MC-2 | SINGULAR-VALUES-CONFUSED-WITH-A-TRANSPOSE-A-EIGENVALUES-DIRECTLY | Using A^TA's eigenvalues directly as the singular values, instead of their square roots, sorted in decreasing order | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("U and V Assumed Same Size Like Diagonalization's Single P") → P41 (detect: present Example 1 and check whether $U$ and $V$ are (incorrectly) assumed equal-sized) → P64 (conceptual shift: re-derive each matrix's size directly from $A$'s row/column counts).
- **B02 (targets MC-2)**: P27 ("Singular Values Confused with A^TA Eigenvalues Directly") → P41 (detect: present Example 2 and check whether the square root step is skipped) → P64 (conceptual shift: re-compute the square roots explicitly and re-sort in decreasing order).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.spectral-theorem`, `math.linalg.qr-factorization`.
- **Unlocks**: none recorded in the KG (children `math.linalg.singular-values`, `math.linalg.pseudoinverse` build directly on this concept).
- **Related**: `math.linalg.diagonalization` (SVD is the universal generalization when diagonalization fails or doesn't apply).
- **Cross-links**: `math.num.svd` (numerical computation methods), `math.opt.pca` (Principal Component Analysis, SVD's flagship data-science application).

## Component 8 — Teaching Notes

- difficulty = expert, bloom = analyze, and estimated_hours = 8 (the highest in the domain) reflect that SVD synthesizes the spectral theorem and orthogonal-matrix machinery into the single most powerful and widely-applicable decomposition in the entire domain.
- Both misconceptions were ranked Foundational because each corrupts the decomposition's basic structure in a way that would propagate incorrectly into any downstream application (PCA, low-rank approximation).
- The recommendation-system transfer probe was deliberately chosen because low-rank approximation via SVD is SVD's single most impactful real-world application, and directly previews `math.opt.pca` and the two SVD-child concepts (`singular-values`, `pseudoinverse`).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.spectral-theorem`, `math.linalg.qr-factorization`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none; children noted) |
| V-5 | cross_links checked against disk | PASS (`math.num.svd`, `math.opt.pca`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

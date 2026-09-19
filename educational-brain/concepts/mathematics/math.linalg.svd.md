# math.linalg.svd

## Identity
- **KG id**: `math.linalg.svd`
- **Domain**: math.linalg
- **Requires**: `math.linalg.spectral-theorem`, `math.linalg.qr-factorization`
- **Unlocks**: none (children `math.linalg.singular-values`, `math.linalg.pseudoinverse` build
  directly on this concept)
- **Cross-links**: `math.num.svd`, `math.opt.pca` (both not yet authored, independence mode)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
State that ANY $m\times n$ matrix $A$ factors as $A=U\Sigma V^T$ with $U$ ($m\times m$) and $V$
($n\times n$) ORTHOGONAL, sized SEPARATELY to $A$'s rows and columns (never assumed the same size
like diagonalization's single $P$); derive $V$ and $\Sigma$ from $A^TA$'s spectral decomposition,
with singular values as the SQUARE ROOTS of $A^TA$'s eigenvalues sorted DESCENDING (never the raw
eigenvalues themselves); and recognize SVD's universal applicability — it exists for EVERY matrix
of every shape (never limited like diagonalization's square-matrix requirement).

## Core Understanding
$U$ AND $V$ ARE SEPARATELY SIZED TO $A$'S ROWS AND COLUMNS — NEVER THE SAME SIZE: for a
$3\times2$ matrix $A$: $U$ is $3\times3$ (matching $A$'s ROW count), $\Sigma$ is $3\times2$
(matching $A$'s FULL shape), $V$ is $2\times2$ (matching $A$'s COLUMN count). Unlike
diagonalization's SINGLE square matrix $P$, SVD genuinely uses TWO DIFFERENT orthogonal matrices,
sized independently — this is EXACTLY what allows SVD to handle non-square matrices, which
diagonalization cannot even attempt.

SINGULAR VALUES ARE THE SQUARE ROOTS OF $A^TA$'S EIGENVALUES, SORTED DESCENDING — NEVER THE RAW
EIGENVALUES THEMSELVES: for $A=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix}$: $A^TA=
\begin{pmatrix}1&0\\0&4\end{pmatrix}$ (symmetric, so the Spectral Theorem applies), with
eigenvalues $1,4$ and eigenvectors $(1,0),(0,1)$ forming $V$'s columns. The SINGULAR VALUES are
$\sqrt1=1$ and $\sqrt4=2$ — the SQUARE ROOTS, giving $\Sigma=\text{diag}(2,1)$ sorted LARGEST
first (NEVER $\text{diag}(1,4)$, the raw eigenvalues used directly and in the wrong order).

SVD APPLIES UNIVERSALLY — DIAGONALIZATION DOES NOT: $A^TA$ is ALWAYS symmetric for ANY matrix $A$
(even non-square), so the Spectral Theorem's guarantee of orthogonal eigenvectors and real
non-negative eigenvalues ALWAYS applies. This makes SVD strictly more general than
diagonalization: diagonalization requires a SQUARE matrix with $n$ independent eigenvectors (many
matrices fail this entirely), while SVD exists for EVERY matrix, of EVERY shape, ALWAYS — exactly
why SVD, not diagonalization, underlies data-science applications on genuinely rectangular data
matrices.

## Mental Models
- **"U and V are sized to A's rows and columns separately — never forced to match, unlike
  diagonalization's single square P."**
- **"Singular values are square roots of AᵀA's eigenvalues, sorted largest first — never the
  eigenvalues themselves, and never in arbitrary order."**
- **"SVD works for every matrix, every shape, always — diagonalization has a square-matrix
  requirement that SVD simply doesn't have."**

## Why Students Fail

### MC-1: U-AND-V-ASSUMED-SAME-SIZE-LIKE-DIAGONALIZATIONS-SINGLE-P
- **Surface form**: assumes SVD's $U$ and $V$ must be the same size (like diagonalization's single
  $P$), rather than recognizing they are separately sized to $A$'s rows and columns respectively.
- **Birth type**: Foundational severity (Blueprint's own declared severity — prior familiarity
  with diagonalization's single square change-of-basis matrix creates a strong expectation that
  carries over incorrectly).
- **Repair**: re-derive each matrix's size directly from $A$'s row/column counts.

### MC-2: SINGULAR-VALUES-CONFUSED-WITH-A-TRANSPOSE-A-EIGENVALUES-DIRECTLY
- **Surface form**: uses $A^TA$'s eigenvalues directly as the singular values, instead of their
  square roots, sorted in decreasing order.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the connection to the
  Spectral Theorem's eigenvalues is so direct that the extra square-root step is easy to skip).
- **Repair**: re-compute the square roots explicitly and re-sort in decreasing order.

## Misconceptions

### MC-1: U-AND-V-ASSUMED-SAME-SIZE-LIKE-DIAGONALIZATIONS-SINGLE-P
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SINGULAR-VALUES-CONFUSED-WITH-A-TRANSPOSE-A-EIGENVALUES-DIRECTLY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"SVD is diagonalization's more flexible sibling — it doesn't demand a single square change-of-
  basis matrix, it uses two matrices tailored to the actual input and output dimensions."**
- **Anti-analogy**: the singular values are not just "the eigenvalues of AᵀA renamed" — they're
  specifically the square roots of those eigenvalues, a genuinely different set of numbers.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit size derivation for $U,\Sigma,V$ from a
  $3\times2$ matrix $A$'s row and column counts.
- **Demonstration 2 (targets MC-2)**: the full $A^TA\to$ eigenvalues $\to$ square-roots $\to$
  sorted-singular-values derivation for $A=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix}$.
- **Demonstration 3 (positive case)**: the direct contrast between SVD's universal applicability
  and diagonalization's square-matrix requirement for the same non-square $A$.

## Discovery Questions
1. "Must U and V in the SVD be the same size, or are they sized independently to A's rows and
   columns?"
2. "Are the singular values the same as AᵀA's eigenvalues, or their square roots?"
3. "Does SVD exist for every matrix, or only for matrices that are diagonalizable?"

## Teaching Sequence
1. **Conceptual shift**: the differently-sized $U,V$ derivation, working Demonstration 1,
   isolating MC-1.
2. **Representation shift**: the singular-values-as-square-roots derivation, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: SVD's universality versus diagonalization's limits, working Demonstration 3.
4. **Mastery gate**: require a correct size derivation for $U,\Sigma,V$ given $A$'s shape, a
   correct singular-value computation from $A^TA$'s eigenvalues, and a correct explanation of why
   SVD applies universally while diagonalization does not, at the Blueprint's own stated MAMR of
   4/5.

## Tutor Actions
- Never accept $U$ and $V$ assumed to be the same size for a non-square matrix.
- Never accept $A^TA$'s eigenvalues used directly as singular values without the square-root step.
- Never accept a claim that diagonalization could substitute for SVD on a genuinely non-square
  matrix.

## Voice Teaching Notes
- Say "what are A's row and column counts — how does that determine U and V's sizes?" whenever
  SVD is set up for a specific matrix.
- Ask "have you taken the square root, and sorted largest first?" whenever singular values are
  computed from $A^TA$'s eigenvalues.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the shapes of $U,\Sigma,V$ for a given
  matrix's dimensions.
- **Rung 2 (application)**: learner correctly derives $V$ and the singular values from $A^TA$'s
  eigendecomposition.
- **Rung 3 (transfer)**: learner correctly explains why a genuinely rectangular data matrix always
  has an SVD but cannot be diagonalized, and why large singular values correspond to dominant,
  information-carrying directions enabling low-rank approximation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive $U$ and $V$'s sizes from $A$'s row and column counts.
- If MC-2 recurs, re-compute the square roots explicitly and re-sort.

## Memory Hooks
- "U and V are sized to rows and columns separately — never forced equal."
- "Singular values are square roots of AᵀA's eigenvalues, sorted largest first."
- "SVD works for every matrix — diagonalization has a square-matrix requirement SVD doesn't have."

## Transfer Connections
- `math.linalg.spectral-theorem` (already authored, this campaign, Batch 175): supplies the
  symmetric-matrix eigendecomposition underlying $A^TA$'s diagonalization, the constructive
  mechanism for $V$ and the singular values.
- `math.linalg.qr-factorization` (already authored, this campaign, Batch 176): supplies the
  orthogonal-matrix machinery $U,V$ share with $Q$.
- `math.linalg.diagonalization` (already authored, this campaign, Batch 174, KG's declared related
  concept): the more limited factorization this concept generalizes universally.
- `math.linalg.singular-values`, `math.linalg.pseudoinverse` (not yet authored, KG's declared
  children): build directly on this concept's structure.
- `math.num.svd`, `math.opt.pca` (not yet authored): the KG's declared cross-links, the numerical
  computation methods and Principal Component Analysis application this concept previews.

## Cross-Subject Connections
- Data science/recommendation systems: analyzing a users-by-items ratings matrix via SVD to
  discover dominant "taste patterns" (large singular values) versus noise (small singular values),
  enabling low-rank approximation.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.svd.md`, reused by reference for its
  non-square-matrix size-derivation example, its full $A^TA$-to-singular-values worked derivation,
  its universality-versus-diagonalization contrast, and its two-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying SVD to a recommendation-
  system ratings-matrix low-rank-approximation scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.spectral-theorem`/`math.linalg.qr-factorization`, unlocks none, cross_links
  `math.num.svd`/`math.opt.pca`, expert/analyze, mastery_threshold 0.8, estimated_hours 8) was
  directly verified against the live KG and matches exactly. Both cross-link targets independently
  re-confirmed still unauthored — the Blueprint's independence-mode deferral remains correct.

## Version History
- 2026-09-19 (Batch 177): authored. Second entry this batch. Companion batch concept:
  `math.linalg.cholesky`.

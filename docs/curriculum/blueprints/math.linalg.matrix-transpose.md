# Teaching Blueprint: Matrix Transpose (`math.linalg.matrix-transpose`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.matrix-transpose` |
| name | Matrix Transpose |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.linalg.matrix` |
| unlocks | `math.linalg.symmetric-matrix` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — flipping a small numeric matrix's rows into columns by hand before the symbolic $(A^T)_{ij}=A_{ji}$ rule |
| description (KG) | (Aᵀ)_{ij} = A_{ji}: rows become columns and vice versa. Row i, col j of Aᵀ is row j, col i of A. Key properties: (AB)ᵀ=BᵀAᵀ, (Aᵀ)ᵀ=A. Symmetric matrices satisfy A=Aᵀ. |

## Component 1 — Learning Objectives

- LO1: Compute the transpose $A^T$ of a matrix by applying $(A^T)_{ij}=A_{ji}$ — the entry in row $i$, column $j$ of $A^T$ equals the entry in row $j$, column $i$ of $A$ — turning rows of $A$ into columns of $A^T$.
- LO2: State and apply the two key transpose identities: $(A^T)^T=A$ (transposing twice returns the original matrix) and $(AB)^T = B^TA^T$ — noting the **order reversal**, directly refuting the misconception that $(AB)^T=A^TB^T$.
- LO3: Recognize a **symmetric matrix** as one satisfying $A=A^T$, and verify this condition requires a matrix to be **square** with $A_{ij}=A_{ji}$ for every pair $i,j$ — connecting the transpose operation to this special matrix class.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.matrix` (a matrix as an $m\times n$ rectangular array of numbers, with row/column indexing $A_{ij}$) — transpose is a specific rearrangement operation on that indexed array.

## Component 3 — Core Explanation

**The transpose operation**: for an $m\times n$ matrix $A$, its transpose $A^T$ is the $n\times m$ matrix defined by $(A^T)_{ij}=A_{ji}$ — the entry that was in row $j$, column $i$ of $A$ moves to row $i$, column $j$ of $A^T$. Equivalently: **row $i$ of $A^T$ is column $i$ of $A$** (and vice versa) — the rows and columns swap roles entirely. A matrix that started as $m$ rows by $n$ columns becomes $n$ rows by $m$ columns after transposing.

**Two key identities**:
- $(A^T)^T = A$ — transposing twice undoes itself and returns the original matrix, since swapping rows and columns twice restores the original arrangement.
- $(AB)^T = B^TA^T$ — the transpose of a product is the product of the transposes **in reverse order**. This is not a typo or arbitrary convention: it follows directly from how matrix multiplication's row-times-column rule interacts with the index swap, and the order **must** reverse for the dimensions to even match up (if $A$ is $m\times n$ and $B$ is $n\times p$, then $AB$ is $m\times p$, so $(AB)^T$ is $p\times m$; $B^T$ is $p\times n$ and $A^T$ is $n\times m$, so $B^TA^T$ is $p\times m$ — matching only in this order).

**Symmetric matrices**: a matrix $A$ is **symmetric** if $A=A^T$. This forces $A$ to be **square** ($m=n$, since $A$ and $A^T$ must have matching dimensions to be equal at all) and requires $A_{ij}=A_{ji}$ for every entry — the matrix is a mirror image of itself across its main diagonal.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing a transpose directly)**: For $A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$ (a $2\times3$ matrix), the transpose is $A^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}$ (a $3\times2$ matrix) — row 1 of $A$, $(1,2,3)$, becomes column 1 of $A^T$; row 2 of $A$, $(4,5,6)$, becomes column 2 of $A^T$. Checking one entry directly: $(A^T)_{31} = A_{13} = 3$. ✓.

**Example 2 (LO2 — the order-reversal identity, breaking MC-1)**: Let $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$, $B=\begin{pmatrix}1&0\\3&1\end{pmatrix}$. Then $AB = \begin{pmatrix}7&2\\3&1\end{pmatrix}$, so $(AB)^T = \begin{pmatrix}7&3\\2&1\end{pmatrix}$. Now compute $B^TA^T$: $B^T=\begin{pmatrix}1&3\\0&1\end{pmatrix}$, $A^T=\begin{pmatrix}1&0\\2&1\end{pmatrix}$, so $B^TA^T = \begin{pmatrix}7&3\\2&1\end{pmatrix}$ — **matches** $(AB)^T$. Now check the WRONG order, $A^TB^T = \begin{pmatrix}1&0\\2&1\end{pmatrix}\begin{pmatrix}1&3\\0&1\end{pmatrix} = \begin{pmatrix}1&3\\2&7\end{pmatrix}$ — this does **not** match $(AB)^T$ at all, proving the order must reverse.

**Example 3 (LO3 — verifying symmetry and its square requirement)**: $S=\begin{pmatrix}2&5&-1\\5&3&0\\-1&0&7\end{pmatrix}$ is symmetric: checking $S_{12}=5=S_{21}$, $S_{13}=-1=S_{31}$, $S_{23}=0=S_{32}$ — every off-diagonal pair matches, and $S=S^T$ can be confirmed directly by transposing. Contrast with the non-square matrix from Example 1, $A$ ($2\times3$): $A^T$ is $3\times2$, so $A$ and $A^T$ don't even have the same shape — $A=A^T$ is **impossible** to even ask about meaningfully, since symmetry requires a square matrix as a precondition before checking entrywise equality.

## Component 5 — Teaching Actions

### Teaching Action A01 — Flipping Rows Into Columns (Primitive P11: Representation Shift)

Show a small numeric matrix and physically flip it (rotate along the diagonal), drawing arrows from each row to its corresponding column in the result. State: "transposing means row $i$ becomes column $i$ — every entry's row and column labels swap." Shift to the symbolic rule $(A^T)_{ij}=A_{ji}$ and verify it against Example 1's computed result entry by entry.

### Teaching Action A02 — The Product-Transpose Identity Reverses Order (Primitive P28: Conflict Evidence)

Present Example 2's direct conflict: computing $(AB)^T$ two ways — via $B^TA^T$ (matches) and via $A^TB^T$ (does not match). State plainly: "$(AB)^T = B^TA^T$ — notice the order FLIPS. This isn't arbitrary: check the dimensions — if $A$ is $m\times n$ and $B$ is $n\times p$, only $B^TA^T$ has matching dimensions to even multiply; $A^TB^T$ often can't even be computed, let alone match."

- **MC-1 hook**: ask "does $(AB)^T$ equal $A^TB^T$, keeping the same order?" — a "yes" answer reveals MC-1 (assuming the transpose distributes over a product in the same order, rather than recognizing the order must reverse).

### Teaching Action A03 — Symmetric Matrices Require Square Shape (Primitive P06: Contrast Pair)

**Contrast** Example 3's square symmetric matrix $S$ (where $S=S^T$ genuinely holds) against Example 1's non-square $A$ (where $A^T$ has different dimensions entirely, making $A=A^T$ not just false but not even a well-formed question). State: "before you can even ask 'is this matrix symmetric,' it has to be square — $A$ and $A^T$ must have the same shape for the equality $A=A^T$ to make sense at all."

- **MC-2 hook**: ask "can a $2\times3$ matrix be symmetric?" — a "yes" (or an uncertain) answer reveals MC-2 (attempting to apply the symmetry condition to a non-square matrix, missing the square-shape precondition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the transpose of $M = \begin{pmatrix}0&1\\2&3\\4&5\end{pmatrix}$, and state the dimensions of both $M$ and $M^T$.
  2. Verify $(A^T)^T=A$ directly for the matrix $A$ from Example 1, by transposing $A^T$ and confirming it matches $A$.
  3. For $A=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ and $B=\begin{pmatrix}2&1\\0&1\end{pmatrix}$, compute $(AB)^T$ directly and also compute $B^TA^T$, confirming they match.
  4. Explain why the matrix $\begin{pmatrix}1&2\\3&4\\5&6\end{pmatrix}$ cannot be symmetric, without computing its transpose numerically — using the square-shape requirement alone.
- **P76 (Transfer Probe, mode = independence)**: "A data-science team represents a dataset as a matrix $D$ where each row is one observation and each column is one feature. They compute the matrix $C = D^TD$ (transpose of $D$ times $D$) as part of building a covariance-like summary. (a) If $D$ is $100\times5$ (100 observations, 5 features), state the dimensions of $D^T$ and of $C=D^TD$. (b) Prove that $C$ is always symmetric, i.e. $C^T=C$, using the product-transpose identity $(D^TD)^T = D^T(D^T)^T$ and the double-transpose identity. (c) Explain why this symmetry guarantee is useful to know BEFORE doing any numerical computation, rather than checking it after the fact for each dataset."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRANSPOSE-PRODUCT-ORDER-NOT-REVERSED | Assuming $(AB)^T = A^TB^T$ (same order), rather than the correct $(AB)^T=B^TA^T$ (reversed order) | Foundational |
| MC-2 | SYMMETRY-CHECKED-ON-NON-SQUARE-MATRIX | Attempting to evaluate whether a non-square matrix is symmetric, missing that symmetry requires the matrix to be square as a precondition | Moderate |
| MC-3 | TRANSPOSE-INDEX-RULE-APPLIED-BACKWARD | Writing $(A^T)_{ij}=A_{ij}$ (no actual swap) or swapping the wrong pair of indices, rather than correctly applying $(A^T)_{ij}=A_{ji}$ | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Same-Order Transpose-Product Assumption") → P41 (detect: ask a student to compute $(AB)^T$ by first computing $A^TB^T$ directly) → P64 (conceptual shift: re-walk Example 2's side-by-side computation, showing $B^TA^T$ matches while $A^TB^T$ does not, then connect this to the dimension-matching argument for why only the reversed order can even be valid in general).
- **B02 (targets MC-2)**: P27 (name it: "Non-Square Symmetry Attempt") → P41 (detect: ask whether a $3\times2$ matrix could be symmetric) → P64 (conceptual shift: re-anchor on "symmetric requires $A=A^T$, and two matrices of different shapes can never be equal — so square shape is required before entrywise equality is even a meaningful question").
- **B03 (targets MC-3)**: P27 (name it: "Transpose Index Rule Misapplied") → P41 (detect: give a matrix and ask the student to identify $(A^T)_{21}$, checking whether they correctly retrieve $A_{12}$) → P64 (conceptual shift: re-walk Example 1's explicit index check, $(A^T)_{31}=A_{13}$, emphasizing the swapped index order as the entire content of the rule).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.matrix` (the row/column-indexed array structure $A_{ij}$ this operation rearranges).
- **Unlocks**: `math.linalg.symmetric-matrix` (the symmetric-matrix class defined directly via $A=A^T$, introduced here in LO3 as a preview).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 2 with a proficient/apply tag places this at a "3 TAs + gate" tier appropriate for a short, mechanically simple operation whose entire difficulty lies in two specific, well-documented error patterns (order-reversal in products, and the square-shape precondition for symmetry) rather than any conceptual depth.
- MC-1 (product-transpose order reversal) was given Foundational severity because it recurs constantly in every downstream linear-algebra topic involving matrix products (least-squares, covariance matrices, orthogonal transformations) — Teaching Notes flag the $D^TD$ transfer probe specifically as a preview of its most common real-world appearance.
- Example 3 deliberately reuses Example 1's non-square matrix $A$ as the contrasting non-symmetric case (rather than introducing a new matrix), keeping the "square precondition" point isolated with no new computation required to make it.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: hand-flipping a numeric matrix before the symbolic rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

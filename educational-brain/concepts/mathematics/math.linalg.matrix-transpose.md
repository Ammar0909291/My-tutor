# math.linalg.matrix-transpose

## Identity
- **KG id**: `math.linalg.matrix-transpose`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix`
- **Unlocks**: `math.linalg.symmetric-matrix`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Compute the transpose $A^T$ of a matrix via $(A^T)_{ij}=A_{ji}$, reusing `math.linalg.matrix`'s
own indexed grid structure; state and apply the two key identities $(A^T)^T=A$ and
$(AB)^T=B^TA^T$ (noting the order REVERSAL); and recognize a symmetric matrix as one satisfying
$A=A^T$, requiring the matrix to be SQUARE as a precondition.

## Core Understanding
For an $m\times n$ matrix $A$, the transpose $A^T$ is the $n\times m$ matrix defined by
$(A^T)_{ij}=A_{ji}$ — reusing `math.linalg.matrix`'s own $(i,j)$-indexed grid, the entry that was
in row $j$, column $i$ of $A$ moves to row $i$, column $j$ of $A^T$. Equivalently: row $i$ of
$A^T$ IS column $i$ of $A$ — rows and columns swap roles entirely, so a matrix that started
$m\times n$ becomes $n\times m$.

Two identities anchor the operation: $(A^T)^T=A$ — transposing twice restores the original,
since swapping rows and columns twice undoes itself — and $(AB)^T=B^TA^T$, where the ORDER
REVERSES. This reversal is not an arbitrary convention; it is forced by dimension matching alone:
if $A$ is $m\times n$ and $B$ is $n\times p$, then $AB$ is $m\times p$, so $(AB)^T$ must be
$p\times m$. But $B^T$ is $p\times n$ and $A^T$ is $n\times m$, so only $B^TA^T$ — in that specific
order — produces a $p\times m$ result; $A^TB^T$ often cannot even be computed (its inner
dimensions, $m$ and $n$, need not match at all), let alone equal $(AB)^T$.

A matrix $A$ is SYMMETRIC if $A=A^T$. This forces $A$ to be SQUARE ($m=n$), since $A$ and $A^T$
must share the same dimensions for the equality to even be a well-formed question — a non-square
matrix's transpose has genuinely different dimensions from the original, so asking "is it
symmetric?" is not merely false, it is not a meaningful question at all. For a square matrix,
symmetry additionally requires $A_{ij}=A_{ji}$ for every entry — the matrix mirrors itself across
its main diagonal.

## Mental Models
- **"$(A^T)_{ij}=A_{ji}$ — the two subscripts genuinely swap, not just relabel."**
- **"$(AB)^T=B^TA^T$ — the order flips, and dimension-matching FORCES that flip; it's not an
  arbitrary rule."**
- **"Symmetric requires square FIRST — you can't even ask whether a non-square matrix is
  symmetric."**

## Why Students Fail

### MC-1: TRANSPOSE-PRODUCT-ORDER-NOT-REVERSED
- **Surface form**: assumes $(AB)^T=A^TB^T$ (same order), rather than the correct
  $(AB)^T=B^TA^T$ (reversed order).
- **Frequency band**: Foundational (Blueprint's own declared severity — this recurs constantly in
  every downstream linear-algebra topic involving matrix products).
- **Root cause (Type 1, overgeneralization)**: the "transpose distributes over a product" idea is
  correctly grasped in outline, but the SAME-order distribution pattern familiar from other
  algebraic operations (e.g. scalar multiplication distributing without reordering its factors)
  is overgeneralized onto the transpose, which genuinely requires reversal.
- **Repair**: compute $(AB)^T$, $B^TA^T$, and the incorrect $A^TB^T$ all three explicitly for the
  same concrete matrices, showing only the reversed order matches — and connecting the reversal to
  the dimension-matching argument that makes it structurally necessary.

### MC-2: SYMMETRY-CHECKED-ON-NON-SQUARE-MATRIX
- **Surface form**: attempts to evaluate whether a non-square matrix is symmetric, missing that
  symmetry requires the matrix to be square as a precondition.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: the everyday intuition that any two objects can be
  compared for equality is overgeneralized past the requirement that $A$ and $A^T$ must first
  share the same shape before an entrywise comparison is even meaningful — the same
  precondition-skipping mechanism already documented for `math.linalg.vector-addition`'s own
  dimension-mismatch misconception.
- **Repair**: re-anchor on the fact that two matrices of DIFFERENT shapes can never be equal at
  all, so the square-shape check must come BEFORE any entrywise symmetry comparison is attempted.

### MC-3: TRANSPOSE-INDEX-RULE-APPLIED-BACKWARD
- **Surface form**: writing $(A^T)_{ij}=A_{ij}$ (no actual swap) or swapping the wrong pair of
  indices, rather than correctly applying $(A^T)_{ij}=A_{ji}$.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 4, notation-induced)**: the subscript swap $ij\to ji$ is visually subtle —
  the two symbols look nearly identical, and without deliberately tracking which index is "row"
  and which is "column" throughout the swap, the rule is easy to apply as if nothing changed.
- **Repair**: re-walk an explicit index check — e.g. $(A^T)_{31}=A_{13}$ — for a specific matrix,
  physically locating both cells and confirming they hold different values in general.

## Misconceptions

### MC-1: TRANSPOSE-PRODUCT-ORDER-NOT-REVERSED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SYMMETRY-CHECKED-ON-NON-SQUARE-MATRIX
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: TRANSPOSE-INDEX-RULE-APPLIED-BACKWARD
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Undressing in reverse order: putting on a coat then a scarf means taking off the scarf
  first, then the coat — $(AB)^T=B^TA^T$ undoes the product in the opposite order it was built."**
- **Anti-analogy**: transposing is NOT "relabeling" a matrix while keeping the same shape — for a
  non-square matrix, $A^T$ has genuinely different dimensions from $A$, not merely a re-arranged
  version of the same grid.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$,
  $B=\begin{pmatrix}1&0\\3&1\end{pmatrix}$, compute $(AB)^T$, $B^TA^T$ (matches), and $A^TB^T$
  (does not match) side by side.
- **Demonstration 2 (targets MC-2)**: contrast a genuinely symmetric square matrix (verified
  $S=S^T$ entry by entry) against a non-square matrix, showing $A=A^T$ is not even a well-formed
  question for the latter since the dimensions differ.
- **Demonstration 3 (targets MC-3)**: verify $(A^T)_{31}=A_{13}$ explicitly for
  $A=\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}$, locating both cells physically to confirm the
  index swap.

## Discovery Questions
1. "For $(AB)^T$, should you expect $A^TB^T$ (same order) or $B^TA^T$ (reversed order) — and can
   you check using dimensions alone?"
2. "Before checking whether $A=A^T$, is there a precondition about the matrix's shape that must
   hold first?"
3. "In $(A^T)_{ij}=A_{ji}$, do the two subscripts genuinely swap, or do they stay in the same
   order?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix`'s indexed grid structure, framing the transpose as
   a specific, deliberate rearrangement of that structure.
2. **Conflict evidence**: the same-order-versus-reversed-order computation for $(AB)^T$, breaking
   MC-1 directly.
3. **Contrast pair**: a square symmetric matrix versus a non-square matrix, isolating the
   square-shape precondition from the entrywise equality check.
4. **Mastery gate**: require computing a transpose directly, verifying both key identities, and
   explaining why a specific non-square matrix cannot be symmetric using the shape requirement
   alone, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $(AB)^T=A^TB^T$ without the learner checking it against a concrete counterexample
  or the dimension-matching argument.
- When symmetry is being checked, require the learner to confirm the matrix is square BEFORE any
  entrywise comparison.

## Voice Teaching Notes
- Say "which order does dimension-matching force?" whenever a learner states the product-
  transpose identity in the wrong order.
- When symmetry is asked about a non-square matrix, ask "is this even a question we can ask yet?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $A^T$ for a given matrix and verifies
  $(A^T)^T=A$.
- **Rung 2 (application)**: learner correctly computes $(AB)^T$ via $B^TA^T$ and explains why the
  order must reverse using dimension-matching.
- **Rung 3 (transfer)**: learner correctly identifies the square-shape precondition for symmetry
  and applies the transpose identities in a novel context (e.g. proving $D^TD$ is always
  symmetric).

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute all three quantities ($(AB)^T$, $B^TA^T$, $A^TB^T$) explicitly for
  the specific matrices in question.
- If MC-2 recurs, re-anchor on the different-shapes-can-never-be-equal principle for the specific
  non-square matrix in question.
- If MC-3 recurs, re-walk the explicit index-swap check for the specific entry in question.

## Memory Hooks
- "$(A^T)_{ij}=A_{ji}$ — the subscripts genuinely trade places."
- "$(AB)^T=B^TA^T$ — reversed order, forced by dimensions, not arbitrary."
- "Square first, symmetric second — the shape check comes before the entry check."

## Transfer Connections
- `math.linalg.matrix` (already authored, this campaign): supplies the indexed grid structure
  the transpose operation rearranges.
- `math.linalg.symmetric-matrix` (unauthored, direct KG unlock): this entry's own LO3 previews
  the symmetric-matrix class that concept will develop in full.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix-transpose.md`, reused by
  reference for its flip-the-grid representation shift, its order-reversal conflict-evidence
  demonstration, its square-shape contrast pair, and its three-misconception registry (birth
  types independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a data-science
  covariance-matrix scenario, $C=D^TD$, proving $C$ is always symmetric via the product-transpose
  and double-transpose identities).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `matrix`, unlocks
  `symmetric-matrix`, cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours
  2) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 73): authored. Unblocked by `math.linalg.matrix` (Batch 72). Companion batch
  concepts: `math.disc.graph-representation`, `math.linalg.matrix-addition`,
  `math.linalg.matrix-multiplication`. `math.linalg` moves toward **9/61** this batch. Unlocks
  `math.linalg.symmetric-matrix` directly.

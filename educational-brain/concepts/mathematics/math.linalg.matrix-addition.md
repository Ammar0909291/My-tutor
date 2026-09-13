# math.linalg.matrix-addition

## Identity
- **KG id**: `math.linalg.matrix-addition`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 1

## Learning Objective
Add two matrices of the SAME dimensions by adding CORRESPONDING entries, reusing
`math.linalg.matrix`'s own $(i,j)$-indexed grid structure; recognize that matrix addition is
UNDEFINED for matrices of different dimensions, never a partial or forced computation; and state
that matrices of a fixed size, under addition and scalar multiplication, satisfy every VECTOR
SPACE axiom.

## Core Understanding
Matrix addition combines two matrices of the SAME dimensions by adding CORRESPONDING entries: if
$A$ and $B$ are both $m\times n$, then $(A+B)_{ij}=A_{ij}+B_{ij}$ for every position $(i,j)$ —
reusing `math.linalg.matrix`'s own indexed grid structure directly, this is the exact
two-dimensional analog of `math.linalg.vector-addition`'s component-wise rule. The operation is
UNDEFINED for matrices of different dimensions — there is no meaningful way to line up entries
that don't correspond position-for-position, exactly as `math.linalg.vector-addition` treats a
dimension mismatch as a genuine type error rather than an incomplete answer.

Matrices of a FIXED size, under addition (and scalar multiplication), satisfy every VECTOR SPACE
axiom — associativity, commutativity, a zero matrix as additive identity, additive inverses, and
distributivity. This means matrices genuinely ARE vectors in the more general sense: the same
underlying algebraic structure `math.linalg.vector-addition` established for ordered tuples
applies identically here, just with entries arranged in a rectangular grid rather than a single
row or column.

## Mental Models
- **"Add position by position — $(i,j)$ of the sum comes from $(i,j)$ of each input, nothing
  else."**
- **"Different dimensions, no addition — the exact same undefined-not-incomplete rule as vector
  addition."**
- **"A matrix of fixed size IS a vector, just written in a grid instead of a row."**

## Why Students Fail

### MC-1: MISMATCHED-DIMENSION-MATRICES-ADDED-VIA-ARBITRARY-PAIRING
- **Surface form**: attempting to add matrices of different dimensions by forcing some arbitrary
  entry pairing, rather than recognizing the operation is undefined.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: the general habit of "combine whatever numbers are
  present" is overgeneralized past the requirement that matrix addition needs an EXACT
  position-for-position correspondence — the same overgeneralization mechanism already documented
  for `math.linalg.vector-addition`'s own MC-1, recurring one dimension higher.
- **Repair**: attempt to align a $2\times3$ matrix's entries against a $3\times2$ matrix's entries
  explicitly, showing no valid position-by-position correspondence exists between the two shapes.

### MC-2: MATRIX-ADDITION-ENTRY-POSITIONS-MISALIGNED
- **Surface form**: adding entries from mismatched positions within same-dimension matrices (e.g.
  transposing one matrix's layout before adding), rather than matching by exact row-column
  position.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 2, perceptual intuition)**: a visual misreading of the grid layout — reading
  one matrix's rows against the other's columns, or otherwise misaligning the two grids by eye —
  substitutes for the deliberate, exact position-matching the operation requires.
- **Repair**: use an explicit position-by-position grid overlay, physically aligning the two
  matrices' cells, confirming each entry pairs with its EXACT same-position counterpart.

## Misconceptions

### MC-1: MISMATCHED-DIMENSION-MATRICES-ADDED-VIA-ARBITRARY-PAIRING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: MATRIX-ADDITION-ENTRY-POSITIONS-MISALIGNED
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two identically-sized spreadsheets, cell by cell: cell (row 2, column 3) of the sum comes
  from cell (row 2, column 3) of each spreadsheet — never from any other cell."**
- **Anti-analogy**: matrix addition is NOT defined by "however the entries happen to line up
  visually" — two matrices of different dimensions have no canonical alignment, and the operation
  is simply undefined, not something to force through an arbitrary pairing.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: attempt to add a $2\times3$ matrix to a $3\times2$ matrix
  and show there is no valid position-by-position correspondence between the two shapes.
- **Demonstration 2 (targets MC-2)**: use a physical grid overlay to add
  $\begin{pmatrix}1&2\\3&4\end{pmatrix}+\begin{pmatrix}5&6\\7&8\end{pmatrix}=
  \begin{pmatrix}6&8\\10&12\end{pmatrix}$, confirming each entry's position matches exactly.
- **Demonstration 3**: verify commutativity for two $2\times2$ matrices by computing $A+B$ and
  $B+A$ and confirming they are identical, grounded in ordinary real-number addition's own
  commutativity applied entry-wise.

## Discovery Questions
1. "If two matrices have different dimensions, is there any canonical way to line up their
   entries for addition, or does the operation simply not apply?"
2. "When adding two same-dimension matrices, should entry $(2,1)$ of the sum come from entry
   $(2,1)$ of both inputs, or could it come from some other position?"
3. "Do matrices of a fixed size behave like vectors under addition, or like a genuinely different
   kind of object?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix`'s own indexed grid structure and
   `math.linalg.vector-addition`'s component-wise rule, framing matrix addition as the direct
   two-dimensional analog.
2. **Conflict evidence**: the dimension-mismatch attempt, breaking the arbitrary-pairing error
   directly.
3. **Contrast pair**: a correctly position-aligned addition versus a misaligned attempt (e.g. via
   an implicit transpose).
4. **Mastery gate**: require component-wise matrix addition, a dimension-mismatch judgment, and
   an associativity verification, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a matrix sum without the learner confirming both matrices share the same
  dimensions first.
- When two matrices of different dimensions are presented for addition, require the learner to
  state "undefined" and why, before moving on.

## Voice Teaching Notes
- Say "same position, always" whenever a learner's addition mixes up row/column alignment.
- When mismatched dimensions are presented, ask "is there any way to line these up exactly?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly adds two same-dimension matrices entry by entry.
- **Rung 2 (application)**: learner correctly identifies a dimension mismatch as undefined and
  explains why no valid pairing exists.
- **Rung 3 (transfer)**: learner correctly verifies commutativity/associativity and applies
  matrix addition in a novel tabular-data context (e.g. combining two months' sales reports).

## Tutor Recovery Strategy
- If MC-1 recurs, re-attempt the explicit position-alignment demonstration for the specific
  mismatched matrices in question.
- If MC-2 recurs, re-run the physical grid-overlay demonstration for the specific matrices in
  question.

## Memory Hooks
- "Position matches position — never anything else."
- "Different dimensions, no addition — undefined, not incomplete."
- "Fixed-size matrices are vectors wearing a grid."

## Transfer Connections
- `math.linalg.matrix` (already authored, this campaign): supplies the indexed grid structure
  matrix addition operates on directly.
- `math.linalg.vector-addition` (already authored, this campaign): supplies the identical
  component-wise addition rule and dimension-mismatch-is-undefined principle, one dimension lower.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix-addition.md`, reused by
  reference for its worked-example pair (basic addition, dimension-mismatch demonstration,
  commutativity verification) and its two-misconception registry (birth types independently
  classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a spreadsheet
  sales-report scenario, combining two months' matrices and explaining why a differently-shaped
  third report cannot be added directly).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `matrix`, unlocks
  none, cross_links none, proficient/apply, mastery_threshold 0.95, estimated_hours 1) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 73): authored. Unblocked by `math.linalg.matrix` (Batch 72). Companion batch
  concepts: `math.disc.graph-representation`, `math.linalg.matrix-multiplication`,
  `math.linalg.matrix-transpose`. `math.linalg` moves toward **9/61** this batch.

# math.linalg.matrix

## Identity
- **KG id**: `math.linalg.matrix`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector`
- **Unlocks**: `math.linalg.determinant`, `math.linalg.linear-system`, `math.linalg.linear-map`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
State the dimensions of a matrix using the rows-first, columns-second convention
($m\times n$), reusing `math.linalg.vector`'s own ordered-tuple structure extended to a
TWO-dimensional grid; locate any entry $a_{ij}$ using the row-then-column $(i,j)$ index
convention; and recognize that POSITION within the array is structurally meaningful — swapping
two entries produces a genuinely different matrix.

## Core Understanding
A matrix is a rectangular array of numbers arranged in $m$ rows and $n$ columns, written as an
$m\times n$ matrix, with the entry in row $i$ and column $j$ denoted $a_{ij}$. This is a direct
extension of `math.linalg.vector`'s own ordered-tuple structure — a vector is a ONE-dimensional
ordered list, while a matrix is its TWO-dimensional generalization; a column vector is simply an
$m\times1$ matrix, and a row vector is a $1\times n$ matrix.

The dimension notation is a strict convention: $m\times n$ means $m$ ROWS first, $n$ COLUMNS
second — "$m$ by $n$." The entry notation mirrors this exactly: $a_{ij}$ reads row index $i$
first, column index $j$ second. Neither convention is arbitrary or negotiable — a $2\times3$
matrix genuinely has 2 rows and 3 columns, and $a_{23}$ genuinely means "row 2, column 3," never
the reverse.

Position within the matrix carries GENUINE mathematical meaning, exactly the way a vector's
component order does: swapping entries $a_{12}$ and $a_{21}$ produces a DIFFERENT matrix, not a
rearrangement of "the same information." A matrix is not an unordered bag of numbers — each entry
occupies a permanent $(i,j)$ address, and the numbers stored at different addresses generally
describe genuinely different facts (as in a data table, where row and column jointly determine
what a single entry means).

## Mental Models
- **"RC — Row Count first, Column Count second — both in the dimension notation and in the entry
  subscript."**
- **"A matrix is a vector generalized to two dimensions — a grid of numbers, not a bag of them."**
- **"Position is the meaning: swapping two entries changes the matrix, exactly as reordering a
  vector's components changes the vector."**

## Why Students Fail

### MC-1: MATRIX-DIMENSION-REVERSED
- **Surface form**: shown a $2\times3$ matrix, states its dimensions as "$3\times2$" — counts
  columns before rows.
- **Frequency band**: Foundational (Blueprint's own declared status — if the learner cannot
  correctly read $m\times n$, the dimension-compatibility rule for matrix operations and every
  downstream index operation is unreachable).
- **Root cause (Type 6, analogy overextension)**: the familiar $(x,y)$ coordinate-pair convention
  reads HORIZONTAL first, then vertical, and that habit is overextended onto matrix dimensions —
  but the matrix convention is the reverse: rows (a horizontal STRIP, but counted as a vertical
  tally of how many strips there are) are read first, columns second.
- **Repair**: count horizontal bands (rows) explicitly first, then vertical bands (columns)
  second, anchored to the "RC" mnemonic (Row Count before Column Count).

### MC-2: MATRIX-ENTRY-INDEXED-WRONG
- **Surface form**: shown matrix $M$, asked for $M_{23}$, locates row 3, column 2 instead of row
  2, column 3 — reverses $i$ and $j$ in the subscript.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 6, analogy overextension)**: the same horizontal-first coordinate-reading
  habit responsible for MC-1 recurs one level deeper, at the level of individual entry
  addressing, since the subscript order visually resembles an $(x,y)$-style pair.
- **Repair**: treat $a_{ij}$ as a two-step address — go to row $i$ first, then within that row
  find column $j$ — re-deriving a specific entry step by step.

### MC-3: MATRIX-IS-JUST-NUMBERS
- **Surface form**: asked whether swapping two entries changes the matrix, says "no" — treats
  the matrix as an unordered collection of numbers.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 1, overgeneralization)**: the everyday sense of "a collection of numbers"
  (like a set or an unordered list) is overgeneralized onto the matrix, ignoring that every entry
  occupies a PERMANENT structural address — the same overgeneralization mechanism as
  `math.linalg.vector`'s own MC-2 (VECTOR-ORDER-FREE), recurring one dimension higher.
- **Repair**: swap two specific entries explicitly and compare the resulting matrix against the
  original entry by entry, grounding the swap in a concrete data-table scenario where the
  positions clearly mean different things (e.g. a weather-data matrix, where swapping entries
  would misattribute a temperature to the wrong city and day).

## Misconceptions

### MC-1: MATRIX-DIMENSION-REVERSED
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-2: MATRIX-ENTRY-INDEXED-WRONG
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-3: MATRIX-IS-JUST-NUMBERS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A spreadsheet: the row label comes first (row 5), then the column label (column C) — the
  cell at (5, C) is a specific, permanent address, not an interchangeable slot."**
- **Anti-analogy**: a matrix is NOT a bag of numbers that can be freely rearranged — unlike a set,
  where $\{3,4\}=\{4,3\}$, the matrices $\begin{bmatrix}3&7\\1&9\end{bmatrix}$ and
  $\begin{bmatrix}3&1\\7&9\end{bmatrix}$ (with two entries swapped) are genuinely different
  objects.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: state the dimensions of
  $\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix}$ as $2\times3$ (2 rows, 3 columns), explicitly
  contrasting against the incorrect "$3\times2$."
- **Demonstration 2 (targets MC-2)**: locate $a_{23}$ in a $3\times3$ matrix by going to row 2
  first, then column 3, contrasting against the incorrect $a_{32}$ (row 3, column 2).
- **Demonstration 3 (targets MC-3)**: swap $a_{12}$ and $a_{21}$ in a small matrix and show the
  resulting matrix is genuinely different, then apply the same swap to a weather-data matrix
  (days × cities) to show the swap would misattribute a real recorded temperature.

## Discovery Questions
1. "For an $m\times n$ matrix, does $m$ count rows or columns?"
2. "In the notation $a_{ij}$, which subscript tells you the row, and which tells you the
   column?"
3. "If you swap two entries in a matrix, do you get the same matrix back, or a genuinely
   different one?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector`'s ordered-tuple structure, framing the matrix as
   its two-dimensional generalization (row/column vectors as special cases).
2. **Conflict evidence**: the reversed-dimension and reversed-index errors, contrasted against
   the correct rows-first, then-columns convention throughout.
3. **Contrast pair**: swapping two entries in a small matrix versus the mistaken belief that the
   matrix is unchanged, grounded in a real data-table scenario.
4. **Mastery gate**: require stating a matrix's dimensions, locating specific entries by $(i,j)$
   index, judging whether an entry exists at a given index, and applying the row/column
   convention to a novel tabular-data context, at the Blueprint's own stated pass criterion of
   5/5.

## Tutor Actions
- Never accept a stated matrix dimension or entry location without requiring the learner to
  state explicitly which count (rows or columns) they determined first.
- When a learner treats two matrices with the same numbers in different positions as identical,
  require them to compare the matrices entry by entry at each specific address.

## Voice Teaching Notes
- Say "rows first, always" whenever a learner states a matrix's dimensions or an entry's
  subscript in the wrong order.
- When a learner claims a swapped matrix is unchanged, ask "what number is now sitting at that
  specific address?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states a matrix's dimensions using the
  rows-first convention and locates a specified entry by $(i,j)$ index.
- **Rung 2 (application)**: learner correctly judges whether a given entry exists for a stated
  matrix's dimensions (e.g. recognizing $a_{24}$ does not exist in a $4\times2$ matrix).
- **Rung 3 (transfer)**: learner correctly applies the row/column convention to a novel tabular
  data context and explains what reorganizing rows and columns would mean for that data.

## Tutor Recovery Strategy
- If MC-1 recurs, re-count horizontal rows then vertical columns explicitly for the specific
  matrix in question.
- If MC-2 recurs, re-derive the two-step row-then-column address for the specific entry.
- If MC-3 recurs, re-run the entry-by-entry comparison, grounded in the real-data-table scenario.

## Memory Hooks
- "RC — Row Count, Column Count, in that order, everywhere."
- "$a_{ij}$: row $i$ first, column $j$ second — never the reverse."
- "Position is the meaning — swap two entries, get a genuinely different matrix."

## Transfer Connections
- `math.linalg.vector` (already authored, this campaign): supplies the ordered-tuple structure
  this concept extends to two dimensions; row and column vectors are this concept's own
  special cases ($1\times n$ and $m\times1$).

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix.md`, reused by reference for
  its spreadsheet-grid analogy, its representation-shift table (tabular/algebraic/geometric
  readings of the same matrix), its column-as-vector preview, and its three-misconception
  registry (birth types independently classified, since this Blueprint states a trigger/error-
  pattern narrative but not the Type 1-6 taxonomy).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a weather-
  monitoring data matrix — stating dimensions, locating an entry's real-world meaning, and
  reasoning about reorganizing rows and columns).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `vector`, unlocks
  `determinant`+`linear-system`+`linear-map`, cross_links none, proficient/understand,
  mastery_threshold 0.9, estimated_hours 4) was directly verified against the live KG and
  matches exactly.
- **This concept is the single highest-leverage concept authored in this campaign since
  `math.linalg.vector` itself**: it directly unblocks `math.disc.graph-representation` (the
  single remaining concept keeping math.disc from full domain certification) and starts the
  chain toward `math.linalg.determinant` (which reopens the parked math.calc domain).

## Version History
- 2026-09-13 (Batch 72): authored. Unblocked by `math.linalg.vector` (Batch 71). Companion batch
  concepts: `math.linalg.vector-addition`, `math.linalg.scalar-multiplication`,
  `math.linalg.dot-product`. `math.linalg` moves toward **5/61** this batch. Authoring this
  concept reopens `math.disc.graph-representation`, the sole remaining concept in that domain.

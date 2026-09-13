# math.linalg.cofactor-expansion

## Identity
- **KG id**: `math.linalg.cofactor-expansion`
- **Domain**: math.linalg
- **Requires**: `math.linalg.determinant`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define the minor $M_{ij}$ and cofactor $C_{ij}=(-1)^{i+j}M_{ij}$ of a matrix entry, reusing
`math.linalg.determinant`'s own $2\times2$/$3\times3$ computations as the minors themselves; state
the cofactor expansion $\det(A)=\sum_j a_{ij}C_{ij}$ (expansion along ANY row or column gives the
identical value); and select the expansion row/column with the MOST zeros to minimize computation,
recognizing the method's $O(n!)$ complexity as the reason it is impractical for large matrices.

## Core Understanding
For an $n\times n$ matrix $A$, the MINOR $M_{ij}$ is the determinant of the $(n-1)\times(n-1)$
matrix obtained by deleting row $i$ and column $j$ from $A$ — for a $4\times4$ matrix, each minor
is itself a $3\times3$ determinant, computable by `math.linalg.determinant`'s own method. The
COFACTOR $C_{ij}=(-1)^{i+j}M_{ij}$ attaches a sign that alternates in a checkerboard pattern
starting with $+$ at position $(1,1)$: $+,-,+,-,\ldots$ across a row, and the SAME alternation
down a column.

The COFACTOR EXPANSION formula computes the determinant along any row $i$:
$\det(A)=\sum_j a_{ij}C_{ij}=a_{i1}C_{i1}+a_{i2}C_{i2}+\cdots+a_{in}C_{in}$, or equivalently along
any column $j$: $\det(A)=\sum_i a_{ij}C_{ij}$. This is a genuine THEOREM, not a definition choice:
expanding along ROW 1 versus ROW 3 versus COLUMN 2 of the same matrix all produce the exact same
numerical value, because each is computing the same determinant by a different but mathematically
equivalent decomposition.

Since every term $a_{ij}C_{ij}$ with $a_{ij}=0$ contributes NOTHING to the sum, choosing to expand
along the row or column with the MOST zero entries is a genuine EFFICIENCY strategy — fewer
nonzero terms means fewer $(n-1)\times(n-1)$ minors to actually compute. This does not change the
final answer, only how much arithmetic is needed to reach it. Cofactor expansion's cost still
grows as $O(n!)$ in the worst case (each minor recursively requires computing its own
sub-minors), which is why row reduction, not cofactor expansion, is the practical method for large
matrices — a fact `math.linalg.determinant` itself already establishes for the general case.

## Mental Models
- **"A cofactor is a signed minor: $C_{ij}=(-1)^{i+j}M_{ij}$, checkerboard sign starting $+$ at
  $(1,1)$."**
- **"Expand along ANY row or column — they all give the same determinant, just different amounts
  of arithmetic."**
- **"Pick the row or column with the most zeros — free terms, same answer, less work."**

## Why Students Fail

### MC-1: COFACTOR-SIGN-ALTERNATION-NOT-TRACKED-CORRECTLY
- **Surface form**: applies the wrong sign to a cofactor term, losing track of the checkerboard
  $+,-,+,-$ pattern, especially for matrices larger than $3\times3$ or when starting the expansion
  from a row/column other than the first.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity). The
  sign $(-1)^{i+j}$ is a compact formula, and without explicitly re-deriving it entry by entry for
  every position, the alternation is easy to mis-track by eye alone.
- **Repair**: re-derive the sign explicitly via $(-1)^{i+j}$ for the specific position in question,
  never relying on visual pattern-matching alone.

### MC-2: EXPANSION-ROW-COLUMN-CHOSEN-WITHOUT-EFFICIENCY-CONSIDERATION
- **Surface form**: always expands along the first row by default, regardless of whether another
  row or column contains more zeros and would require substantially less computation.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). The
  formula is typically first presented using row 1 as the running example, and without an explicit
  habit of scanning for the sparsest row/column, that default is carried forward unnecessarily.
- **Repair**: before expanding, scan every row and column for zero count, and choose the sparsest
  one explicitly.

### MC-3: DIFFERENT-EXPANSION-CHOICES-ASSUMED-TO-GIVE-DIFFERENT-RESULTS
- **Surface form**: doubts that expanding along a different row or column will produce the same
  determinant value, or treats agreement between two expansion choices as a coincidence rather than
  a guaranteed theorem.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). Since
  different methods in other contexts often DO give different results, that expectation is
  overgeneralized here, where the cofactor expansion theorem guarantees identical output regardless
  of which row or column is chosen.
- **Repair**: compute the same matrix's determinant via two different expansion choices side by
  side, confirming they agree exactly — not by luck, but by the theorem's own guarantee.

## Misconceptions

### MC-1: COFACTOR-SIGN-ALTERNATION-NOT-TRACKED-CORRECTLY
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: EXPANSION-ROW-COLUMN-CHOSEN-WITHOUT-EFFICIENCY-CONSIDERATION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: DIFFERENT-EXPANSION-CHOICES-ASSUMED-TO-GIVE-DIFFERENT-RESULTS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Counting the same crowd from two different vantage points: the count doesn't change based on
  where you stand — cofactor expansion along different rows/columns is counting the same
  determinant from different 'vantage points.'"**
- **Anti-analogy**: this is NOT "any shortcut method risks giving an approximate or slightly
  different answer" — cofactor expansion along any row or column gives the EXACT same value, every
  time, as a proven theorem, never an approximation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute the cofactor $C_{23}$ of a $3\times3$ matrix,
  explicitly deriving the sign $(-1)^{2+3}=-1$ before computing the minor.
- **Demonstration 2 (targets MC-3)**: expand a specific $3\times3$ determinant along row 1 and then
  again along column 2, confirming both give the identical numerical value.
- **Demonstration 3 (targets MC-2)**: for a matrix with one row containing two zeros, compare the
  arithmetic required expanding along that row versus expanding along a row with no zeros.

## Discovery Questions
1. "If you expand a determinant along row 2 instead of row 1, will you get the same answer?"
2. "Does it matter which row or column you choose to expand along, other than how much arithmetic
   it takes?"
3. "What sign attaches to the cofactor at position row 3, column 2?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.determinant`'s own $2\times2$/$3\times3$ formulas, framing
   minors as smaller determinants of the same kind already known.
2. **Conflict evidence**: the two-expansion-choices-agree demonstration, breaking MC-3 directly.
3. **Contrast pair**: expanding along a sparse row versus a dense row for the same matrix, isolating
   MC-2.
4. **Mastery gate**: require a correctly-signed cofactor computation, a full expansion via the
   sparsest row/column, and an explanation of why any expansion choice agrees with any other under
   transfer, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a cofactor sign without the learner explicitly deriving $(-1)^{i+j}$ for that
  position.
- When a matrix has a sparse row or column, require the learner to identify it before expanding.

## Voice Teaching Notes
- Say "what's the sign at that position, and how did you get it?" whenever a cofactor sign is
  stated without derivation.
- Before an expansion begins, ask "which row or column has the most zeros?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a minor and its signed cofactor for a given
  position.
- **Rung 2 (application)**: learner correctly performs a full cofactor expansion, choosing the
  sparsest row or column for efficiency.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context, why two different students
  expanding the same determinant along different rows will necessarily agree on the final value.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the sign for the specific position in question explicitly.
- If MC-2 recurs, re-scan the specific matrix for its sparsest row or column.
- If MC-3 recurs, re-compute the specific determinant via a second expansion choice, confirming
  agreement directly.

## Memory Hooks
- "$(-1)^{i+j}$ — checkerboard sign, always re-derive it, never eyeball it."
- "Any row, any column — same answer, guaranteed by the theorem."
- "Zeros are free — expand along the sparsest row or column."

## Transfer Connections
- `math.linalg.determinant` (already authored, this campaign): supplies the $2\times2$/$3\times3$
  determinant computations that serve directly as this concept's minors.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.cofactor-expansion.md`, reused by
  reference for its signed-cofactor computation, its two-expansion-choices-agree demonstration, its
  sparse-row efficiency contrast, and its three-misconception registry (birth types independently
  classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own probe (explaining why expansion-choice
  independence is a guaranteed theorem, not a coincidence, in a novel matrix context).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `determinant`, unlocks
  none, cross_links none, proficient/apply, mastery_threshold 0.85, estimated_hours 3) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 77): authored. Unblocked by `math.linalg.determinant` (Batch 74). Companion
  batch concepts: `math.linalg.augmented-matrix`, `math.linalg.cramer-rule`, `math.linalg.distance`.
  `math.linalg` moves toward **22/61** this batch.

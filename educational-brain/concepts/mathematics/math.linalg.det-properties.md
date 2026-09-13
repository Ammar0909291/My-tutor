# math.linalg.det-properties

## Identity
- **KG id**: `math.linalg.det-properties`
- **Domain**: math.linalg
- **Requires**: `math.linalg.determinant`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Apply the multiplicative property $\det(AB)=\det(A)\det(B)$ and the transpose property
$\det(A^T)=\det(A)$, reusing `math.linalg.determinant`'s own computations directly; apply the
scalar property $\det(cA)=c^n\det(A)$ for an $n\times n$ matrix, correctly using the exponent $n$
rather than a bare factor of $c$; and track how each of the three row operations affects the
determinant: a swap flips the sign, scaling one row multiplies by that scalar, and adding a
multiple of one row to another leaves it unchanged.

## Core Understanding
Building on `math.linalg.determinant`'s own computation, several key PROPERTIES govern how
determinants behave under common operations: $\det(AB)=\det(A)\det(B)$ (multiplicative over matrix
products); $\det(A^T)=\det(A)$ (transposing never changes the determinant); $\det(cA)=c^n\det(A)$
for an $n\times n$ matrix (scaling the WHOLE matrix by $c$ scales EVERY row by $c$, and since each
row-scaling multiplies the determinant by one factor of $c$, all $n$ rows together contribute
$c^n$); and $\det(A^{-1})=\frac{1}{\det(A)}$, a direct consequence of the multiplicative property
via $\det(A)\det(A^{-1})=\det(AA^{-1})=\det(I)=1$.

The three ROW OPERATIONS (reused directly from `math.linalg.augmented-matrix`'s solution-preserving
guarantee) affect the determinant PREDICTABLY, though not by leaving it unchanged: SWAPPING two
rows FLIPS the sign of the determinant; SCALING a SINGLE row by $c$ MULTIPLIES the determinant by
that one factor of $c$ (genuinely different from scaling the WHOLE matrix, which multiplies by
$c^n$ since every row is affected); ADDING a multiple of one row to another LEAVES the determinant
UNCHANGED.

## Mental Models
- **"$\det(AB)=\det(A)\det(B)$ — determinants multiply across matrix products."**
- **"Scale the WHOLE matrix by $c$: determinant scales by $c^n$, one factor per row. Scale ONE
  row by $c$: determinant scales by just $c$, once."**
- **"Row operations: swap flips the sign, scale-one-row multiplies by that scalar, add-a-multiple
  changes nothing."**

## Why Students Fail

### MC-1: SCALAR-DETERMINANT-PROPERTY-USES-C-INSTEAD-OF-C-TO-THE-N
- **Surface form**: computes $\det(cA)$ as $c\det(A)$ rather than the correct $c^n\det(A)$ for an
  $n\times n$ matrix, using a bare factor of $c$ instead of the exponentiated form.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity).
  Scalar multiplication of a single NUMBER by $c$ multiplies it by exactly $c$ once, and that
  familiar single-factor pattern is overgeneralized to whole-matrix scaling, where EVERY one of
  the $n$ rows independently contributes its own factor of $c$.
- **Repair**: re-derive by tracking each of the $n$ rows individually, showing each contributes its
  own factor of $c$, multiplying together to give $c^n$.

### MC-2: SINGLE-ROW-SCALING-CONFUSED-WITH-WHOLE-MATRIX-SCALING
- **Surface form**: applies the whole-matrix scaling rule ($c^n$) when only a SINGLE row was
  actually scaled (which should use just $c$), or applies the single-row rule when the whole
  matrix was scaled.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — tied
  with MC-1 as the SAME underlying confusion manifesting in two related but distinct scenarios).
  The two scaling scenarios share surface vocabulary ("scaling by $c$"), and the rule that applies
  to one is overgeneralized to the other without re-counting how many rows are actually affected.
- **Repair**: before applying either rule, explicitly re-count exactly how many rows were actually
  scaled by the described operation.

### MC-3: ROW-SWAP-SIGN-CHANGE-FORGOTTEN
- **Surface form**: forgets that swapping two rows flips the determinant's sign, treating a
  row-swapped matrix as having the same determinant as the original.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). A row
  swap is often presented alongside "add a multiple of one row to another" (which leaves the
  determinant unchanged), and without an explicit contrast, the "no effect" pattern from the
  latter is carried over incorrectly to the swap operation.
- **Repair**: re-verify via a small concrete $2\times2$ example, computing the determinant before
  and after an explicit row swap.

## Misconceptions

### MC-1: SCALAR-DETERMINANT-PROPERTY-USES-C-INSTEAD-OF-C-TO-THE-N
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SINGLE-ROW-SCALING-CONFUSED-WITH-WHOLE-MATRIX-SCALING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ROW-SWAP-SIGN-CHANGE-FORGOTTEN
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Scaling a recipe that serves $n$ people versus doubling just one ingredient: doubling every
  ingredient (the whole matrix) compounds $n$ times over; doubling just one ingredient (one row)
  changes only that one factor — the effect on the final 'output' scales very differently
  depending on how much you actually touched."**
- **Anti-analogy**: this is NOT "row operations always leave the determinant unchanged" — only ONE
  of the three operations (adding a multiple of one row to another) has no effect; the other two
  (swap, scale-one-row) genuinely change the determinant's value.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for a $3\times3$ matrix with $\det(A)=5$, compute
  $\det(2A)=2^3\times5=40$, contrasted against the incorrect $2\times5=10$.
- **Demonstration 2 (targets MC-2)**: for $\det(A)=7$, compare scaling ONE row by 3 (giving
  $3\times7=21$) against scaling the WHOLE matrix by 3 (which would instead give $3^n\times7$).
- **Demonstration 3 (targets MC-3)**: for $\det(A)=7$, verify a row swap gives $-7$, while adding
  $2\times$ row 1 to row 2 leaves the determinant at exactly $7$.

## Discovery Questions
1. "If you double EVERY entry in a $3\times3$ matrix, does the determinant double, or does
   something else happen?"
2. "Is scaling one row by 3 the same as scaling the whole matrix by 3, in terms of the effect on
   the determinant?"
3. "If you swap two rows of a matrix, does the determinant's value stay the same?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.determinant`'s own computation, framing these properties as
   rules governing how that computation behaves under common operations.
2. **Conflict evidence**: the whole-matrix-vs-single-row scaling contrast, breaking MC-1/MC-2
   directly.
3. **Contrast pair**: the row-swap sign flip against the row-addition no-change case, isolating
   MC-3.
4. **Mastery gate**: require correct application of the multiplicative/transpose/scalar properties,
   correct tracking of all three row operations' effects, and a transfer explanation distinguishing
   whole-matrix from single-row scaling, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $\det(cA)=c\det(A)$ for an $n\times n$ matrix with $n>1$ without the learner
  correcting to $c^n\det(A)$.
- When a row operation is applied, require the learner to state its determinant effect (sign flip,
  scale, or no change) BEFORE computing.

## Voice Teaching Notes
- Say "how many rows did that scaling actually touch?" whenever a scaling factor is applied to the
  determinant.
- When a row swap occurs, ask "does the determinant stay the same, or does something change?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the multiplicative and transpose properties.
- **Rung 2 (application)**: learner correctly distinguishes whole-matrix scaling ($c^n$) from
  single-row scaling ($c$), and correctly tracks all three row operations' effects.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context (e.g. an economics
  input-output matrix), why whole-matrix and single-row scaling by the same factor give genuinely
  different determinant results.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the specific $c^n$ computation row by row for the case in question.
- If MC-2 recurs, re-count exactly how many rows were affected in the specific scaling operation in
  question.
- If MC-3 recurs, re-verify the specific row-swap case directly via a small concrete example.

## Memory Hooks
- "Whole matrix scaled by $c$? That's $c^n$ — one factor per row."
- "One row scaled by $c$? That's just $c$, once."
- "Swap flips the sign. Add-a-multiple changes nothing."

## Transfer Connections
- `math.linalg.determinant` (already authored, this campaign): supplies the base computation these
  properties govern.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.det-properties.md`, reused by
  reference for its whole-matrix-vs-single-row scaling contrast, its multiplicative/transpose
  property demonstration, its row-operation effects demonstration, and its three-misconception
  registry (birth types independently classified, since this Blueprint states severity but not
  birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an economics
  input-output matrix scenario, contrasting whole-sector-scaling versus single-sector-scaling
  effects on the determinant).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `determinant`, unlocks
  none, cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours 3) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 78): authored. Unblocked by `math.linalg.determinant` (Batch 74). Companion
  batch concepts: `math.linalg.characteristic-polynomial`, `math.linalg.row-reduction`.
  `math.linalg` moves toward **25/61** this batch.

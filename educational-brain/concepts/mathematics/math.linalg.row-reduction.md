# math.linalg.row-reduction

## Identity
- **KG id**: `math.linalg.row-reduction`
- **Domain**: math.linalg
- **Requires**: `math.linalg.augmented-matrix`
- **Unlocks**: `math.linalg.row-echelon`, `math.linalg.lu-factorization`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Apply the three elementary row operations SYSTEMATICALLY — working column by column, left to
right — to eliminate variables from an augmented matrix, reusing `math.linalg.augmented-matrix`'s
own solution-preserving guarantee directly; recognize ROW ECHELON FORM (each row's pivot strictly
right of the pivot above it, zero rows at the bottom) as the goal of this systematic process; and
use the completed echelon form to solve the system via BACK-SUBSTITUTION, working bottom to top —
recognizing that row reduction alone does NOT already yield the numeric solution.

## Core Understanding
ROW REDUCTION applies the three already-guaranteed-safe row operations (from
`math.linalg.augmented-matrix`) in a SPECIFIC, DISCIPLINED order: working left to right through the
columns, use each column's pivot row to eliminate all entries BELOW it in that column, then move to
the next column. This systematic sweep — the same three legal moves as before, but organized into a
repeatable procedure — is what distinguishes row reduction from applying row operations in an
arbitrary, ad hoc order.

The target shape of this process is ROW ECHELON FORM (REF): each nonzero row's leading (leftmost
nonzero) entry — its PIVOT — sits strictly to the right of the pivot in the row directly above it,
and any fully-zero rows are pushed to the bottom. This staircase pattern is exactly what falls out
of the column-by-column elimination sweep, and it signals that no further elimination is needed
below any pivot.

Row echelon form is NOT yet the numeric answer — it is a SIMPLER, equivalent system (same solution
set, by the row-operation guarantee already established), but not yet solved. BACK-SUBSTITUTION
extracts the actual values: starting from the BOTTOM row (which typically involves the fewest
unknowns), solve for that variable, then substitute it upward into the row above to solve for the
next, working bottom to top. Row reduction transforms the system into a form where this
substitution becomes easy — it does not perform the substitution itself.

## Mental Models
- **"Column by column, left to right — clear everything below each pivot before moving on."**
- **"Row echelon form is a staircase: each row's pivot sits strictly to the right of the one
  above."**
- **"Reaching echelon form is not the answer — back-substitution, bottom to top, is what actually
  solves it."**

## Why Students Fail

### MC-1: ECHELON-FORM-MISTAKEN-FOR-SOLVED-SYSTEM
- **Surface form**: believes reaching row echelon form already constitutes solving the system,
  without recognizing back-substitution as a required additional step.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity, the
  single most common point where students stop working prematurely). The elimination sweep is
  visually dramatic — a clean staircase pattern that LOOKS like a finished result — and without an
  explicit statement that a second step remains, the process appears complete once that pattern
  emerges.
- **Repair**: re-walk the explicit bottom-to-top substitution, re-anchoring on "echelon form is a
  SIMPLER system, not yet solved numbers."

### MC-2: ROW-OPERATIONS-APPLIED-OUT-OF-SYSTEMATIC-ORDER
- **Surface form**: applies row operations haphazardly, jumping between columns rather than
  following the systematic left-to-right, top-to-bottom sweep, often re-introducing nonzero entries
  in already-cleared columns.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity). The
  three row operations are individually legal in any order, and without an explicit discipline
  requirement, that individual-move legality is mistaken for permission to sequence them freely.
- **Repair**: re-walk the strict column-by-column order, re-anchoring on "fully finish each column
  before moving to the next — skipping ahead undoes earlier work."

### MC-3: ECHELON-FORM-PIVOT-PATTERN-MISJUDGED
- **Surface form**: misjudges whether a given matrix is in echelon form, particularly failing to
  notice a pivot that does NOT move strictly rightward relative to the row above.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity). A
  matrix with mostly-zero rows can visually resemble echelon form at a glance, without the pivot
  positions being checked explicitly one row at a time.
- **Repair**: re-check each row's pivot column position explicitly against the row above,
  re-anchoring on "strictly rightward, every single row, no exceptions."

## Misconceptions

### MC-1: ECHELON-FORM-MISTAKEN-FOR-SOLVED-SYSTEM
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: ROW-OPERATIONS-APPLIED-OUT-OF-SYSTEMATIC-ORDER
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: ECHELON-FORM-PIVOT-PATTERN-MISJUDGED
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Sorting a deck of cards into suits before counting each suit: sorting (row reduction) makes
  the counting (back-substitution) easy — but sorting itself doesn't tell you how many cards are in
  each suit. You still have to count."**
- **Anti-analogy**: row reduction is NOT "any sequence of legal moves that gets you to a
  staircase" — skipping ahead to a later column before fully clearing an earlier one can
  re-introduce nonzero entries in columns already cleared, undoing prior work.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: eliminate a 3-equation system's column 1 fully before moving
  to column 2, narrating the strict left-to-right order explicitly.
- **Demonstration 2 (targets MC-3)**: contrast a genuine echelon-form matrix (staircase going the
  right way) against a non-example (staircase backward), showing the fix is a row swap.
- **Demonstration 3 (targets MC-1)**: translate a completed echelon form back to equations, showing
  three unknowns remain undetermined numerically, then perform the full bottom-to-top
  back-substitution to find them.

## Discovery Questions
1. "Once a matrix is in row echelon form, have you already solved the system?"
2. "Does it matter which column you eliminate first, or can you work in any order?"
3. "How can you tell whether a given matrix is genuinely in row echelon form?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.augmented-matrix`'s own $[A|b]$ notation and
   solution-preservation guarantee, framing row reduction as that guarantee applied systematically.
2. **Conflict evidence**: the echelon-form-is-not-yet-solved demonstration, breaking MC-1 directly.
3. **Contrast pair**: the genuine versus backward echelon-form staircase, isolating MC-3.
4. **Mastery gate**: require a correctly-ordered systematic elimination, a correct echelon-form
   recognition, and a complete back-substitution solve under transfer, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim of "solved" the moment echelon form is reached — require the learner to
  perform back-substitution explicitly.
- When elimination is performed, require the learner to fully clear each column before moving to
  the next.

## Voice Teaching Notes
- Say "have you found the actual numbers yet, or just reached a simpler form?" whenever echelon
  form is reached.
- When elimination jumps between columns, ask "did you finish clearing the earlier column first?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies whether a given matrix is in row echelon
  form.
- **Rung 2 (application)**: learner correctly performs systematic column-by-column elimination and
  completes back-substitution to find numeric values.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context (a 4-unknown system), what
  additional work remains after reaching echelon form and performs it.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the specific echelon form's translation back to equations and complete
  back-substitution.
- If MC-2 recurs, re-order the specific elimination in question, fully clearing each column before
  the next.
- If MC-3 recurs, re-check the specific matrix's pivot positions row by row against the row above.

## Memory Hooks
- "Column by column, left to right — never skip ahead."
- "Staircase pattern, strictly rightward, every row."
- "Echelon form is simpler, not solved — back-substitute to finish."

## Transfer Connections
- `math.linalg.augmented-matrix` (already authored, this campaign): supplies the $[A|b]$ notation
  and the solution-preservation guarantee this concept's systematic procedure directly relies on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.row-reduction.md`, reused by reference
  for its systematic-elimination demonstration, its echelon-form recognition contrast, its
  back-substitution demonstration, and its three-misconception registry (birth types independently
  classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a 4-equation
  system scenario, confirming echelon form and completing the remaining back-substitution).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `augmented-matrix`,
  unlocks `row-echelon`/`lu-factorization`, cross_links none, proficient/apply, mastery_threshold
  0.9, estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 78): authored. Unblocked by `math.linalg.augmented-matrix` (Batch 77).
  Companion batch concepts: `math.linalg.det-properties`, `math.linalg.characteristic-polynomial`.
  `math.linalg` moves toward **25/61** this batch. Unlocks `math.linalg.row-echelon` and
  `math.linalg.lu-factorization` directly.

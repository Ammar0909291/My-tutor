# math.linalg.augmented-matrix

## Identity
- **KG id**: `math.linalg.augmented-matrix`
- **Domain**: math.linalg
- **Requires**: `math.linalg.linear-system`
- **Unlocks**: `math.linalg.row-reduction`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.95
- **Estimated hours**: 1

## Learning Objective
Construct the augmented matrix $[A|b]$ for a linear system $Ax=b$ by appending the right-hand-side
column $b$ to the coefficient matrix $A$, reusing `math.linalg.linear-system`'s own $Ax=b$
structure directly; explain why the augmented matrix is a compact bookkeeping device, not a new
mathematical object with its own separate meaning; and state that row operations performed on
$[A|b]$ PRESERVE the solution set of the underlying system.

## Core Understanding
Given the linear system $Ax=b$, the AUGMENTED MATRIX $[A|b]$ is formed by literally appending $b$
as an extra column to the right of $A$ — reusing `math.linalg.linear-system`'s own $Ax=b$
structure directly, with the vertical bar serving only as a visual separator, never a mathematical
operation. Each ROW of $[A|b]$ corresponds to exactly one equation of the original system: the
row's entries in the $A$-part are that equation's coefficients, and the row's entry in the $b$-part
is that equation's constant term.

The augmented matrix is a BOOKKEEPING DEVICE, not new mathematics: it is simply a compact way of
writing down the exact same system of equations, dropping the variable names and "=" signs since
their positions are now implied by the matrix's structure. Every operation performed on the
augmented matrix is really an operation on the underlying equations; the matrix notation exists
purely to make those operations mechanical and systematic.

ROW OPERATIONS PRESERVE THE SOLUTION SET: the three legal row operations — swapping two rows,
multiplying a row by a nonzero constant, adding a multiple of one row to another — each correspond
to a manipulation of the underlying EQUATIONS that is well known from ordinary algebra not to
change which values of $x_1,\ldots,x_n$ satisfy the system. Because $[A|b]$'s rows directly
correspond to these equations, the same three guarantees apply directly to row operations on the
matrix.

## Mental Models
- **"Each row IS an equation, with the variable names and '=' stripped, because their positions
  are now implied by the columns."**
- **"The augmented matrix is bookkeeping — the same algebra, just notated for speed and
  repeatability."**
- **"Legal row operations are guaranteed, by the same algebra that lets you add/subtract/scale
  equations, to preserve the solution set."**

## Why Students Fail

### MC-1: ROW-OPERATIONS-FEARED-TO-ALTER-SOLUTION-SET
- **Surface form**: believes legal row operations on an augmented matrix might accidentally change
  the underlying system's solution set, rather than recognizing they are guaranteed to preserve it.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity). Row
  operations are often presented as a mechanical procedure to execute, without an explicit
  guarantee connecting them back to the equation-level operations already known to preserve
  solutions.
- **Repair**: solve both the original and the row-operated system directly, side by side,
  confirming they share the exact same solution.

### MC-2: AUGMENTED-MATRIX-COLUMN-ORDER-MISALIGNED
- **Surface form**: places a variable's coefficient in the wrong column, especially when a variable
  is absent from an equation (a missing term should be recorded as $0$, not omitted).
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity). Without
  a fixed column-to-variable correspondence held consistently across every row, an absent term is
  easy to skip rather than explicitly zero-filled.
- **Repair**: re-anchor on "every row must have exactly one entry per column, in the SAME variable
  order across every row" — a missing variable means writing $0$, never skipping the column.

### MC-3: AUGMENTED-MATRIX-TREATED-AS-A-DIFFERENT-MATHEMATICAL-OBJECT
- **Surface form**: treats the augmented matrix as introducing new mathematical content beyond the
  original system, rather than recognizing it as a pure notational repackaging.
- **Birth type**: Type 6, analogy overextension (Blueprint's own declared Moderate severity). The
  unfamiliar matrix notation looks structurally different enough from an equation that it can be
  mistaken for a genuinely new mathematical entity, rather than the same content re-notated.
- **Repair**: compare a matrix row operation and its equivalent equation-level elimination step
  side by side, showing they produce the identical resulting equation — nothing new was computed,
  only re-notated.

## Misconceptions

### MC-1: ROW-OPERATIONS-FEARED-TO-ALTER-SOLUTION-SET
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: AUGMENTED-MATRIX-COLUMN-ORDER-MISALIGNED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: AUGMENTED-MATRIX-TREATED-AS-A-DIFFERENT-MATHEMATICAL-OBJECT
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Shorthand notes taken during a lecture: the notes look compressed and different from the full
  spoken sentences, but they carry exactly the same content — the augmented matrix is shorthand for
  the same equations, nothing added."**
- **Anti-analogy**: the augmented matrix is NOT "a calculation tool that could introduce rounding or
  logical errors of its own" — every legal row operation is exactly equivalent to a known-safe
  algebraic manipulation of the original equations.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: construct $[A|b]$ for $2x+3y=7$, $x-y=1$, explicitly
  connecting each equation's coefficients and constant to its matching matrix row.
- **Demonstration 2 (targets MC-3)**: perform a row operation on $[A|b]$ and show it produces the
  identical resulting equation as the equivalent equation-level elimination step.
- **Demonstration 3 (targets MC-1)**: solve both the original system and its row-operated version
  directly, confirming both give the exact same solution $(x,y)$.

## Discovery Questions
1. "When you perform a legal row operation on an augmented matrix, could you end up with a
   different solution than the original system had?"
2. "If a variable is missing from one equation, what goes in that column of the augmented matrix?"
3. "Does the augmented matrix compute something new, or does it just repackage the same
   equations?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.linear-system`'s own $Ax=b$ structure, framing $[A|b]$ as
   that same system with the equals signs and variable names stripped.
2. **Conflict evidence**: the side-by-side matrix-vs-equation elimination comparison, breaking MC-3
   directly.
3. **Contrast pair**: the original system against its row-operated version, isolating MC-1 via
   direct solution verification.
4. **Mastery gate**: require an augmented-matrix construction, a row-operation-solution-
   preservation verification, and a bookkeeping-framing explanation under transfer, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a variable omission from an augmented matrix row without the learner explicitly
  writing $0$.
- When a row operation is performed, require the learner to confirm the solution set is unchanged.

## Voice Teaching Notes
- Say "what goes in that column if the variable is missing?" whenever a term is omitted rather
  than zero-filled.
- When a row operation is performed, ask "could this have changed which values solve the system?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs the augmented matrix for a given system,
  including zero-filling missing variables.
- **Rung 2 (application)**: learner correctly performs a row operation and verifies the solution
  set is preserved.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context, why a row appearing during
  row reduction (that never appeared in the original matrix) still yields a value trustworthy for
  the original system.

## Tutor Recovery Strategy
- If MC-1 recurs, re-solve both the original and row-operated systems directly for the specific
  case in question.
- If MC-2 recurs, re-construct the specific row in question with explicit zero-filling.
- If MC-3 recurs, re-compare the specific row operation against its equation-level equivalent.

## Memory Hooks
- "Each row is an equation with the labels stripped."
- "Missing variable? Write zero, never skip the column."
- "Row operations are algebra in disguise — nothing new, just re-notated."

## Transfer Connections
- `math.linalg.linear-system` (already authored, this campaign): supplies the $Ax=b$ structure the
  augmented matrix packages directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.augmented-matrix.md`, reused by
  reference for its row-by-row construction demonstration, its matrix-vs-equation bookkeeping
  comparison, its solution-preservation verification, and its three-misconception registry (birth
  types independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a 4-equation
  system scenario, trusting a derived row's value for the original system and evaluating the
  "just for organization" characterization).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `linear-system`,
  unlocks `row-reduction`, cross_links none, proficient/understand, mastery_threshold 0.95,
  estimated_hours 1) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 77): authored. Unblocked by `math.linalg.linear-system` (Batch 76). Companion
  batch concepts: `math.linalg.cofactor-expansion`, `math.linalg.cramer-rule`,
  `math.linalg.distance`. `math.linalg` moves toward **22/61** this batch. Unlocks
  `math.linalg.row-reduction` directly.

# math.linalg.rank

## Identity
- **KG id**: `math.linalg.rank`
- **Domain**: math.linalg
- **Requires**: `math.linalg.row-echelon`
- **Unlocks**: `math.linalg.rank-nullity`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Compute a matrix's RANK by row-reducing to row echelon form (reusing `math.linalg.row-echelon`'s
own pivot structure directly) and counting the number of pivots; state that ROW RANK equals COLUMN
RANK always — a non-obvious but universal fact; and use rank to determine both the EXISTENCE and
UNIQUENESS of solutions to $Ax=b$, via two SEPARATE rank comparisons.

## Core Understanding
The RANK of a matrix is the number of PIVOTS in its row echelon form — reusing
`math.linalg.row-echelon`'s own pivot structure directly — equivalently, the dimension of its
COLUMN SPACE (the span of its columns) or its ROW SPACE (the span of its rows). A remarkable,
non-obvious fact: ROW RANK always EQUALS COLUMN RANK, for any matrix — despite rows and columns
seeming like structurally different objects.

Rank determines the SOLVABILITY of $Ax=b$ via TWO SEPARATE comparisons: (1) a solution EXISTS if
and only if $\text{rank}(A)=\text{rank}([A|b])$ — comparing $A$ against the augmented matrix
(reusing `math.linalg.augmented-matrix`'s own $[A|b]$ notation); if appending $b$ increases the
rank, the system is INCONSISTENT; (2) if a solution exists, it is UNIQUE if and only if
$\text{rank}(A)$ equals the number of UNKNOWNS — otherwise, infinitely many solutions exist (free
variables remain, reusing `math.linalg.row-echelon`'s own free-variable framework). Existence and
uniqueness are genuinely DIFFERENT questions, each requiring its own comparison — one does not
imply the other.

## Mental Models
- **"Rank = number of pivots in row echelon form."**
- **"Row rank always equals column rank — same number, two different-looking counts."**
- **"Existence: compare rank(A) to rank([A|b]). Uniqueness: compare rank(A) to the number of
  unknowns. Two separate questions, two separate comparisons."**

## Why Students Fail

### MC-1: EXISTENCE-CHECKED-VIA-RANK-A-ALONE
- **Surface form**: checks only $\text{rank}(A)$'s value to determine solution existence, without
  comparing it against $\text{rank}([A|b])$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). A
  "full rank" matrix intuitively feels like it should guarantee a solution, and that single-value
  intuition is overgeneralized past the actual requirement — that existence depends on a
  COMPARISON between $A$ and the augmented matrix, not on $\text{rank}(A)$ in isolation.
- **Repair**: re-derive both ranks explicitly for the case in question, showing the comparison —
  not $\text{rank}(A)$ alone — determines existence.

### MC-2: CONSISTENCY-ASSUMED-TO-IMPLY-UNIQUENESS
- **Surface form**: believes a consistent (solvable) system automatically has a unique solution,
  without separately checking rank against the number of unknowns.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, tied
  with MC-1 as the SAME structural error — collapsing a two-part diagnostic into a single,
  incomplete check — applied to two related but distinct questions). "Solvable" and "uniquely
  solvable" are conflated because everyday language often treats "has an answer" as synonymous with
  "has ONE answer."
- **Repair**: re-check $\text{rank}(A)$ against the number of unknowns separately, identifying the
  free variable if one exists.

### MC-3: PIVOT-COUNT-MISCOMPUTED-DURING-ROW-REDUCTION
- **Surface form**: miscounts pivots during row reduction, for example counting a row of all zeros
  as contributing a pivot.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity). A
  visually "full-looking" matrix can be mistaken for having a pivot in every row without checking
  each row's leading entry is genuinely nonzero.
- **Repair**: re-verify each claimed pivot is a genuinely nonzero leading entry in its row, per
  `math.linalg.row-echelon`'s own definition.

## Misconceptions

### MC-1: EXISTENCE-CHECKED-VIA-RANK-A-ALONE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: CONSISTENCY-ASSUMED-TO-IMPLY-UNIQUENESS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: PIVOT-COUNT-MISCOMPUTED-DURING-ROW-REDUCTION
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two different ways of counting the same crowd — by rows of seats filled, or by columns of
  seats filled — always give the same total headcount, even though you're counting in two visually
  different directions. That's row rank equalling column rank."**
- **Anti-analogy**: a consistent system is NOT automatically a uniquely-solvable one — existence and
  uniqueness are genuinely separate questions, each needing its own rank comparison; passing one
  check says nothing about the other.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: row-reduce a $3\times3$ matrix, explicitly circling each
  pivot as it's identified, connecting the final pivot count to the rank.
- **Demonstration 2 (targets MC-1)**: for a system with $\text{rank}(A)=2$ and
  $\text{rank}([A|b])=3$, show the mismatch signals inconsistency — no solution exists.
- **Demonstration 3 (targets MC-2)**: for a consistent system ($\text{rank}(A)=\text{rank}([A|b])=2$)
  with 3 unknowns, show the solution is NOT unique — 1 free variable, infinitely many solutions.

## Discovery Questions
1. "If a matrix has 'full rank,' does that alone guarantee a solution to $Ax=b$ exists?"
2. "If a system is consistent (has at least one solution), does that mean it has exactly one
   solution?"
3. "Does a row of all zeros in row echelon form count as a pivot?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.row-echelon`'s own pivot structure, framing rank as a direct
   count of pivots.
2. **Conflict evidence**: the rank(A)-vs-rank([A|b]) existence comparison, breaking MC-1 directly.
3. **Contrast pair**: the existence check against the separate uniqueness check, isolating MC-2.
4. **Mastery gate**: require a correct rank computation, a correct existence determination via
   comparison, and a correct uniqueness determination via a separate comparison, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept an existence claim based on $\text{rank}(A)$ alone without the
  $\text{rank}([A|b])$ comparison.
- When a system is confirmed consistent, require the learner to separately check rank against the
  number of unknowns before claiming uniqueness.

## Voice Teaching Notes
- Say "did you check the augmented matrix's rank too, or just A's?" whenever existence is claimed.
- When consistency is established, ask "does that also tell you the solution is unique?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a matrix's rank via row reduction.
- **Rung 2 (application)**: learner correctly determines existence via the rank(A)-vs-rank([A|b])
  comparison and uniqueness via the rank(A)-vs-unknowns comparison, as two separate checks.
- **Rung 3 (transfer)**: learner correctly applies both comparisons, in a novel context (e.g. a
  structural engineering truss system), and explains what a rank-deficient result means physically.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute both ranks explicitly for the specific system in question.
- If MC-2 recurs, re-check rank against the number of unknowns for the specific system in question.
- If MC-3 recurs, re-verify each claimed pivot in the specific row reduction in question.

## Memory Hooks
- "Rank = pivot count."
- "Row rank equals column rank, always."
- "Existence and uniqueness are two questions — check both, separately."

## Transfer Connections
- `math.linalg.row-echelon` (already authored, this campaign): supplies the pivot structure this
  concept counts directly, and the free-variable framework reused for the uniqueness check.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.rank.md`, reused by reference for its
  pivot-counting demonstration, its existence-comparison demonstration, its uniqueness-comparison
  demonstration, and its three-misconception registry (birth types independently classified, since
  this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a structural
  engineering truss scenario, applying both rank comparisons and interpreting a rank-deficient
  result physically).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found**: the Blueprint's own Component 0 states
  "unlocks: (none in KG)" and its Validation Checklist V-4 states "PASS (none)" — but the live KG
  lists `unlocks: ['math.linalg.rank-nullity']`. Resolved toward the KG per standing policy (never
  fixing the KG or Blueprint file). Verified via `ls
  educational-brain/concepts/mathematics/math.linalg.rank-nullity.md` that this forward concept has
  no Educational Brain entry yet — recorded as a standing forward note for whichever future batch
  authors it.

## Version History
- 2026-09-13 (Batch 80): authored. Unblocked by `math.linalg.row-echelon` (Batch 79). No companion
  batch concepts — this was the sole topologically-ready math.linalg candidate this batch.
  `math.linalg` moves toward **28/61** this batch.

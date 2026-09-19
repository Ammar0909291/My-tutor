# math.linalg.column-space

## Identity
- **KG id**: `math.linalg.column-space`
- **Domain**: math.linalg
- **Requires**: `math.linalg.subspace`, `math.linalg.span`
- **Unlocks**: `math.linalg.rank-nullity`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define the column space $C(A)=\{Ax:x\in\mathbb R^n\}$ as the SPAN of $A$'s columns and find a
spanning set for it directly from $A$'s columns; use it to determine that $Ax=b$ is CONSISTENT
exactly when $b\in C(A)$, checking ALL components simultaneously; and state
$\dim(C(A))=\mathrm{rank}(A)$, connecting column space directly to the already-mastered rank
concept.

## Core Understanding
COLUMN SPACE IS THE SPAN OF $A$'S COLUMNS, WHOSE TRUE SIZE MAY BE SMALLER THAN THE COLUMN COUNT:
$C(A)$ collects every possible output $Ax$ as $x$ ranges over $\mathbb R^n$ — equivalently, every
linear combination of $A$'s columns, directly reusing `math.linalg.span`'s own spanning
machinery. $C(A)$ is a subspace of $\mathbb R^m$ (`math.linalg.subspace`'s own object). For
$A=\begin{pmatrix}1&2\\3&6\\2&4\end{pmatrix}$, the two columns $(1,3,2)$ and $(2,6,4)$ are
proportional ($2\times$ each other) — genuinely linearly DEPENDENT — so the column space is
really the span of just ONE vector (a line), not a 2-dimensional plane, despite $A$ HAVING 2
columns.

$Ax=b$ IS CONSISTENT EXACTLY WHEN $b\in C(A)$, VERIFIED ACROSS ALL COMPONENTS SIMULTANEOUSLY: for
$A=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$ and $b=(2,3,4)$, checking $b\in C(A)$ requires
$c_1=2,c_2=3$ AND $c_1+c_2=4$ simultaneously — but $2+3=5\ne4$, so $b\notin C(A)$ and $Ax=b$ has
NO solution. Confirming only the first two components ($c_1=2,c_2=3$) without checking the third
would incorrectly suggest consistency; every component of the candidate combination must match
$b$ at once.

COLUMN SPACE DIMENSION IS THE RANK, NOT THE COLUMN COUNT: for the Example-1 matrix, row-reduction
gives rank 1 (only 1 pivot, since the columns are proportional), so $\dim(C(A))=1$ — matching the
direct observation that the column space collapses to a line, despite $A$ having 2 columns.
Whenever columns are linearly dependent, $\dim(C(A))$ is strictly LESS than the column count.

## Mental Models
- **"The number of columns is only an upper bound on the column space's dimension — dependent
  columns collapse it, and only the rank tells you the true size."**
- **"Checking $b\in C(A)$ means every component of $b$ must be hit at once by the SAME
  coefficients — a partial match proves nothing."**

## Why Students Fail

### MC-1: COLUMN-SPACE-MEMBERSHIP-CHECKED-PARTIALLY
- **Surface form**: verifies only some components of the required linear-combination system when
  checking $b\in C(A)$, rather than confirming all components simultaneously.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  once the first components appear to match, the check is easy to stop early, especially in
  larger systems).
- **Repair**: re-set up the full system explicitly, checking every component together before
  concluding consistency.

### MC-2: COLUMN-SPACE-DIMENSION-ASSUMED-EQUAL-TO-COLUMN-COUNT
- **Surface form**: believes $\dim(C(A))$ always equals the number of columns in $A$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  column space is DEFINED in terms of the columns, so equating its dimension with the raw column
  count feels natural until dependence is checked).
- **Repair**: re-derive the rank via row reduction directly, connecting the pivot count to the
  true column-space dimension.

## Misconceptions

### MC-1: COLUMN-SPACE-MEMBERSHIP-CHECKED-PARTIALLY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: COLUMN-SPACE-DIMENSION-ASSUMED-EQUAL-TO-COLUMN-COUNT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Dependent columns are like two identical keys on a keyring — having both doesn't open any
  more doors than having one."**
- **Anti-analogy**: more columns does NOT automatically mean a bigger column space — the rank,
  not the column count, is what actually measures its dimension.

## Demonstrations
- **Demonstration 1 (targets MC-2, direct setup)**: for
  $A=\begin{pmatrix}1&2\\3&6\\2&4\end{pmatrix}$, column 2 is exactly $2\times$ column 1 —
  genuinely dependent — so the spanning set collapses to one vector.
- **Demonstration 2 (targets MC-1)**: for $A=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$,
  $b=(2,3,4)$: solving the first two components gives $c_1=2,c_2=3$, but the third component
  requires $c_1+c_2=4$; since $2+3=5\ne4$, the full system fails and $b\notin C(A)$ — a partial
  check would have wrongly declared consistency.
- **Demonstration 3 (targets MC-2, completes)**: row-reducing Demonstration 1's matrix gives rank
  1 (one pivot), matching $\dim(C(A))=1$ directly — confirming the column space is a line, not a
  plane, despite 2 columns being present.

## Discovery Questions
1. "If a matrix has 2 columns, does its column space always have dimension 2?"
2. "To check whether $b$ is in the column space, is it enough to confirm that some but not all of
   $b$'s components can be matched by a linear combination of the columns?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.span`'s own spanning-set machinery, framing $C(A)$ as
   exactly the span of $A$'s columns.
2. **Conceptual shift**: Demonstration 1's dependent-column collapse, previewing that column
   count is only an upper bound.
3. **Contrast pair**: Demonstration 2's full-system check, isolating MC-1 by requiring every
   component be verified together.
4. **Contrast pair**: Demonstration 3's rank computation, isolating MC-2 by connecting the pivot
   count directly to the true dimension.
5. **Mastery gate**: require a correct spanning-set identification, a correct full-system
   consistency check, and a correct rank-based dimension statement, at the Blueprint's own stated
   MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a $b\in C(A)$ check that verifies only some components of the required system.
- Never accept $\dim(C(A))$ stated as the column count without a rank computation confirming it.

## Voice Teaching Notes
- Say "does that combination match every component of $b$, or just the ones you've checked so
  far?" whenever a consistency check is proposed.
- When column space dimension is stated, ask "is that the column count, or did you actually
  compute the rank?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies a spanning set for $C(A)$ from $A$'s
  columns.
- **Rung 2 (application)**: learner correctly determines whether a given $b$ is in $C(A)$,
  checking all components simultaneously.
- **Rung 3 (transfer)**: learner correctly states $\dim(C(A))$ for a NEW matrix using its rank,
  even when the column count differs from the rank.

## Tutor Recovery Strategy
- If MC-1 recurs, re-set up the full system of equations explicitly.
- If MC-2 recurs, re-derive the rank via row reduction directly.

## Memory Hooks
- "Column space dimension is the rank, never just the column count."
- "Every component must match at once — a partial match proves nothing."

## Transfer Connections
- `math.linalg.subspace` (already authored): supplies the subspace structure $C(A)$ satisfies.
- `math.linalg.span` (already authored, this campaign): supplies the spanning-set machinery
  $C(A)$ is directly defined via.
- `math.linalg.rank-nullity` (not yet authored): the KG's declared unlock, building the
  dimension-counting theorem this concept's rank connection anticipates.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.column-space.md`, reused by
  reference for its dependent-column collapse example, its full-system consistency check, its
  rank-dimension connection, and its two-misconception registry (severity levels adopted directly
  as declared; birth types independently classified since this Blueprint states Description but
  not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  network-flow model's achievable flow patterns via $b\in C(A)$ and the dimension gap between a
  5-pipe network and its rank-3 column space.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/KG metadata discrepancy found and corrected**: the Blueprint's Component 0 states
  `unlocks | (none in KG)`, but the live KG (`docs/mathematics/kg/graph.json`) actually lists
  `math.linalg.rank-nullity` as this concept's unlock. This Identity section states the KG's
  actual value, not the Blueprint's stale claim. All other fields (requires
  `math.linalg.subspace`+`math.linalg.span`, cross_links none, proficient/apply,
  mastery_threshold 0.9, estimated_hours 3) matched exactly.

## Version History
- 2026-09-18 (Batch 95): authored. Second entry this batch. Companion batch concept:
  `math.abst.galois-correspondence`. `math.linalg` moves 33/61 → **34/61** this batch.

# math.linalg.null-space

## Identity
- **KG id**: `math.linalg.null-space`
- **Domain**: math.linalg
- **Requires**: `math.linalg.subspace`, `math.linalg.row-echelon`
- **Unlocks**: `math.linalg.rank-nullity`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute $N(A)=\{x:Ax=0\}$ for a given matrix $A$ by row-reducing to RREF and parameterizing the
free variables (reusing `math.linalg.row-echelon`'s own technique directly); correctly verify
$N(A)$ is a subspace via the explicit 3-condition test rather than assuming it; and correctly
count the nullity as the number of free variables, including the TRIVIAL case $N(A)=\{0\}$ when
no free variables exist.

## Core Understanding
THE NULL SPACE IS THE SOLUTION SET OF THE HOMOGENEOUS SYSTEM: $N(A)=\{x\in\mathbb R^n:Ax=0\}$ —
every vector that $A$ sends to the zero vector. This is NOT automatically a large or even a
nontrivial set: it can be exactly $\{0\}$ (the ZERO vector alone), and this trivial case is a
completely valid, common outcome — it is not evidence of an error.

NULL-SPACE MEMBERSHIP IS FOUND BY ROW-REDUCING, NEVER GUESSED: solve $Ax=0$ by row-reducing $A$
to RREF (reusing `math.linalg.row-echelon`'s own systematic elimination directly — the augmented
column here is simply the zero vector, which never changes under row operations), identify the
free variables (the non-pivot columns), and express every basic variable in terms of them; the
resulting parameterized solutions, one per free variable, form a spanning set for $N(A)$.

$N(A)$ IS ALWAYS A GENUINE SUBSPACE, VERIFIED BY THE SAME 3-CONDITION TEST AS ANY OTHER CANDIDATE:
$N(A)$ contains $\mathbf 0$ (since $A\mathbf 0=\mathbf 0$), is closed under addition (if
$Ax=0$ and $Ay=0$ then $A(x+y)=Ax+Ay=0$, using $A$'s own linearity), and closed under scalar
multiplication (if $Ax=0$ then $A(cx)=cAx=0$) — this is a proof from $A$'s linearity, not an
assumption, and skipping it is skipping the very thing that makes $N(A)$ usable as a subspace at
all.

THE NULLITY IS THE NUMBER OF FREE VARIABLES, COUNTED CAREFULLY FROM THE RREF: nullity
$=\dim(N(A))=$ (number of columns) $-$ (number of pivot columns), read directly off the reduced
form — a miscount of the pivot columns (e.g. treating a column with a nonzero entry, but not in
pivot position, as a pivot column) produces a wrong nullity even when the parameterization itself
is correct.

## Mental Models
- **"$N(A)$ answers one question: which inputs does $A$ crush down to zero? — and the honest
  answer can be 'only the zero input itself.'"**
- **"Read the free variables off the RREF like reading a list — each free variable contributes
  exactly one spanning vector to $N(A)$."**

## Why Students Fail

### MC-1: HOMOGENEOUS-SYSTEM-ASSUMED-TO-ALWAYS-HAVE-NONTRIVIAL-SOLUTIONS
- **Surface form**: expects $N(A)$ to always contain nonzero vectors, treating $N(A)=\{0\}$ as a
  sign that something went wrong in the computation, rather than a genuine, common outcome.
- **Birth type**: Type 1, overgeneralization (identified in the Blueprint as FOUNDATIONAL —
  homogeneous systems are often introduced via examples deliberately chosen to have nontrivial
  solutions, so the trivial-only case is never seen until it appears unexpectedly).
- **Repair**: re-row-reduce a matrix with full column rank (every column a pivot column), showing
  the RREF has NO free variables and therefore $N(A)=\{0\}$ is the complete, correct answer.

### MC-2: SUBSPACE-VERIFICATION-STEP-SKIPPED-FOR-NULL-SPACE
- **Surface form**: computes $N(A)$ by row-reduction and parameterization but never explicitly
  confirms the 3-condition subspace test, treating "solution set of a linear system" as
  automatically synonymous with "subspace" without stating why.
- **Birth type**: Type 5, instruction-induced (identified in the Blueprint as FOUNDATIONAL — once
  the mechanical row-reduction procedure is fluent, the underlying subspace-closure argument is
  easy to skip since it never changes the parameterization's numerical answer).
- **Repair**: re-state the explicit 3-condition proof (zero vector, closure under addition, closure
  under scalar multiplication) using $A$'s own linearity, for the specific matrix in question.

### MC-3: NULLITY-MISCOUNTED-FROM-RREF
- **Surface form**: reads the wrong number of free variables off the RREF — most commonly by
  misidentifying which columns are pivot columns (e.g. counting a column with a nonzero but
  non-leading entry as a pivot column).
- **Birth type**: Type 2, perceptual intuition (a column that merely CONTAINS a nonzero entry is
  visually mistaken for a pivot column, rather than checking that the entry is specifically the
  leading 1 of its row).
- **Repair**: re-identify the pivot columns explicitly (the columns containing a leading 1 in
  RREF) before counting free variables, rather than scanning for nonzero entries generally.

## Misconceptions

### MC-1: HOMOGENEOUS-SYSTEM-ASSUMED-TO-ALWAYS-HAVE-NONTRIVIAL-SOLUTIONS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SUBSPACE-VERIFICATION-STEP-SKIPPED-FOR-NULL-SPACE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: NULLITY-MISCOUNTED-FROM-RREF
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"$N(A)$ is the set of inputs that $A$ treats as invisible — it can be a whole family of
  invisible inputs, or it can be that ONLY the zero input is invisible, and both are completely
  ordinary answers."**
- **Anti-analogy**: a "system with solutions" is NOT automatically a "system with many solutions"
  — a homogeneous system's solution set can be as small as $\{0\}$, and that smallness is not a
  computational failure.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: row-reduce
  $A=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ (the identity): RREF has a pivot in EVERY column, so
  there are zero free variables, and the only solution to $Ax=0$ is $x=\mathbf 0$ — $N(A)=\{0\}$,
  a complete and correct answer, not a dead end.
- **Demonstration 2 (targets MC-2)**: for
  $A=\begin{pmatrix}1&2\\2&4\end{pmatrix}$, RREF is $\begin{pmatrix}1&2\\0&0\end{pmatrix}$, free
  variable $x_2=t$, so $N(A)=\{t(-2,1):t\in\mathbb R\}$; explicitly verify closure —
  $t_1(-2,1)+t_2(-2,1)=(t_1+t_2)(-2,1)$, still of the same form, confirming closure under addition
  directly rather than assuming it.
- **Demonstration 3 (targets MC-3)**: for
  $A=\begin{pmatrix}1&2&0\\0&0&1\end{pmatrix}$ (already RREF), the pivot columns are columns 1
  and 3 (each has a leading 1); column 2 has nonzero-looking structure in neither row's leading
  position, so it is the single free variable, giving nullity $=1$ — a miscount that treats
  column 2 as a second pivot column (because "it has a 2 in it") wrongly gives nullity $=0$.

## Discovery Questions
1. "If a matrix row-reduces so that every column has a pivot, what does that tell you about
   $N(A)$?"
2. "You found the parameterized solutions to $Ax=0$ — how would you actually PROVE that set is
   closed under addition, rather than just assuming it?"
3. "Looking at the RREF, which columns are the pivot columns, and how many free variables does
   that leave?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.row-echelon`'s own free-variable/pivot-column
   identification, and to `math.linalg.subspace`'s own 3-condition test.
2. **Contrast pair**: Demonstration 1's full-pivot trivial case, isolating MC-1.
3. **Explicit proof**: Demonstration 2's closure verification, isolating MC-2.
4. **Contrast pair**: Demonstration 3's correct-vs-miscounted pivot identification, isolating
   MC-3.
5. **Mastery gate**: require a correct $N(A)$ computation via row reduction for a new matrix, an
   explicit subspace-closure verification, and a correct nullity count, at the Blueprint's own
   stated MAMR of 5/6 (⌈0.9×6⌉).

## Tutor Actions
- Never accept $N(A)=\{0\}$ described as an error or an incomplete answer — confirm it is a valid,
  common outcome when the RREF has no free variables.
- Never accept a computed $N(A)$ without an explicit subspace-closure statement shown.
- Never accept a nullity count without the learner explicitly naming which columns are pivot
  columns.

## Voice Teaching Notes
- Say "is that genuinely a pivot column, or does it just have a nonzero entry?" whenever nullity
  is being counted.
- When $N(A)=\{0\}$ is reached, ask "is that a mistake, or is that just what this matrix's null
  space actually is?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies whether a given candidate vector lies in
  $N(A)$ by direct substitution.
- **Rung 2 (application)**: learner correctly computes $N(A)$ for a specific matrix via row
  reduction and parameterization, including correctly handling a full-pivot (trivial null space)
  case.
- **Rung 3 (transfer)**: learner correctly explains, for a NEW matrix, why $N(A)$ must be a
  subspace, using the 3-condition test grounded in $A$'s linearity.

## Tutor Recovery Strategy
- If MC-1 recurs, re-row-reduce a fresh full-pivot matrix and confirm $N(A)=\{0\}$ explicitly.
- If MC-2 recurs, re-state the 3-condition closure proof for the specific $N(A)$ in question.
- If MC-3 recurs, re-identify the pivot columns explicitly before recounting free variables.

## Memory Hooks
- "The null space can be just $\{0\}$ — and that's a correct, complete answer."
- "Prove closure — don't just assume the solution set is automatically a subspace."
- "Count pivot COLUMNS, not nonzero entries, to get the nullity right."

## Transfer Connections
- `math.linalg.row-echelon` (already authored, this campaign, Batch 79): supplies the RREF
  pivot/free-variable identification this concept's own null-space computation directly reuses.
- `math.linalg.subspace` (already authored, this campaign, Batch 90): supplies the 3-condition
  subspace test this concept's own closure proof directly reuses.
- `math.linalg.rank-nullity` (not yet authored): the next concept in the chain, connecting this
  concept's own nullity count to `math.linalg.rank`'s pivot count via the Rank-Nullity Theorem.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.null-space.md`, reused by reference
  for its row-reduce-and-parameterize procedure, its subspace-verification-via-linearity argument,
  and its three-misconception registry (birth types independently classified since this Blueprint
  states Severity but not a formal Type label).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.subspace`+`math.linalg.row-echelon`, unlocks `math.linalg.rank-nullity`,
  cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours 4) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-14 (Batch 93): authored. Fourth entry this batch. Companion batch concepts:
  `math.abst.ufd`, `math.abst.galois-theory`, `math.linalg.span`. `math.linalg` moves
  30/61 → **32/61** this batch (both math.linalg concepts authored this batch).

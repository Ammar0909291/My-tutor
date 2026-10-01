# math.linalg.matrix-representation

## Identity
- **KG id**: `math.linalg.matrix-representation`
- **Domain**: math.linalg
- **Requires**: `math.linalg.linear-map`, `math.linalg.basis`
- **Unlocks**: `math.linalg.change-of-basis`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Construct $[T]_{\gamma\beta}$ by applying $T$ to EACH basis vector of $\beta$ IN ORDER — NEVER
to arbitrary vectors; use the matrix to compute $T(v)=[T]_{\gamma\beta}[v]_\beta$ — NEVER by
multiplying raw standard components when $\beta$ is non-standard; and verify composition matches
multiplication ORDER exactly, $[T\circ S]=[T][S]$ — NEVER $[S][T]$.

## Core Understanding
THE MATRIX IS BUILT COLUMN-BY-COLUMN FROM $T$ APPLIED TO EACH BASIS VECTOR OF $\beta$, IN ORDER —
NEVER FROM ARBITRARY VECTORS: for $T(x,y)=(2x+y,x-y)$ relative to the standard basis
$\beta=\{(1,0),(0,1)\}$: $T(1,0)=(2,1)$ is column 1, $T(0,1)=(1,-1)$ is column 2, giving
$[T]=\begin{pmatrix}2&1\\1&-1\end{pmatrix}$. Applying $T$ to some OTHER pair of vectors (not
specifically $\beta$'s own basis vectors, in $\beta$'s own order) produces a matrix that does NOT
correctly represent $T$ relative to $\beta$ — the columns must be $T(b_1),T(b_2),\ldots$
EXACTLY, never a substitute pair.

THE MATRIX-VECTOR PRODUCT USES $v$'S COORDINATES RELATIVE TO $\beta$ — NEVER ITS RAW STANDARD
COMPONENTS WHEN $\beta$ IS NON-STANDARD: with $[T]=\begin{pmatrix}2&1\\1&-1\end{pmatrix}$ (standard
$\beta$), computing $T(3,4)$ uses $[v]_\beta=(3,4)$ directly (since $\beta$ IS standard here):
$[T][v]_\beta=\begin{pmatrix}2(3)+1(4)\\1(3)-1(4)\end{pmatrix}=\begin{pmatrix}10\\-1\end{pmatrix}$,
matching $T(3,4)=(2(3)+4,3-4)=(10,-1)$ directly. If $\beta$ were instead some NON-standard basis,
using $v$'s raw standard components in place of its actual $\beta$-coordinates would be WRONG —
the matrix-vector product is only valid against coordinates relative to the SAME basis $\beta$
the matrix was built from.

COMPOSITION CORRESPONDS TO MATRIX MULTIPLICATION IN THE EXACT SAME ORDER — NEVER REVERSED: for
$T(x,y)=(x+y,x-y)$ and $S(x,y)=(2x,3y)$: $[T]=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$,
$[S]=\begin{pmatrix}2&0\\0&3\end{pmatrix}$. $[T\circ S]=[T][S]=\begin{pmatrix}2&3\\2&-3\end{pmatrix}$,
matching $(T\circ S)(x,y)=T(2x,3y)=(2x+3y,2x-3y)$ directly. Computing $[S][T]$ instead — the
REVERSED order — gives $\begin{pmatrix}2&2\\3&-3\end{pmatrix}$, a DIFFERENT matrix, since matrix
multiplication is generally non-commutative; this reversed product actually represents $S\circ T$,
never $T\circ S$. Reversing the multiplication order is WRONG — the matrix product order must
match the composition order exactly, $[T\circ S]=[T][S]$, with $[T]$ on the left.

## Mental Models
- **"Build the matrix by walking through β's basis vectors in order, applying T to each one — the
  columns are never arbitrary."**
- **"The matrix only multiplies coordinates relative to the SAME basis it was built from — never
  raw standard components when the basis isn't standard."**
- **"Composition reads T∘S as 'S first, then T' — its matrix is [T][S], T on the left, matching
  order exactly; reversing it computes a genuinely different transformation, S∘T."**

## Why Students Fail

### MC-1: MATRIX-REPRESENTATION-BUILT-FROM-WRONG-VECTORS
- **Surface form**: constructs the matrix from T applied to vectors other than the specific basis
  vectors of β, in order.
- **Birth type**: procedural slip (Blueprint's own declared foundational severity — the
  column-by-column construction is a specific procedure that must be followed exactly).
- **Repair**: re-derive by explicitly listing β's vectors first, then applying T to each in turn.

### MC-2: COMPOSITION-MATRIX-MULTIPLICATION-ORDER-REVERSED
- **Surface form**: computes $[S][T]$ instead of $[T][S]$ for the composition $T\circ S$.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — composition is read
  right-to-left in application order but the matrix product is read left-to-right, a genuine
  source of order confusion).
- **Repair**: re-verify against the direct function composition, confirming which matrix product
  matches the actual computed output.

### MC-3: COORDINATE-VECTOR-NOT-USED-FOR-NON-STANDARD-BASIS
- **Surface form**: when β or γ is a non-standard basis, uses the vector's standard components
  directly rather than its actual coordinates relative to that basis.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the standard-basis
  case, where components and coordinates coincide, is taught first and overgeneralized).
- **Repair**: re-derive $[v]_\beta$ explicitly per `math.linalg.coordinates`'s method before
  applying the matrix.

## Misconceptions

### MC-1: MATRIX-REPRESENTATION-BUILT-FROM-WRONG-VECTORS
- **Surface form**: as described above.
- **Root cause (procedural slip)**: as described above.
- **Repair**: as described above.

### MC-2: COMPOSITION-MATRIX-MULTIPLICATION-ORDER-REVERSED
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: COORDINATE-VECTOR-NOT-USED-FOR-NON-STANDARD-BASIS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Building the matrix is like photographing each basis vector's shadow one at a time and
  filing each photo as a column — skip a vector or photograph the wrong one, and the album no
  longer represents the map."**
- **Anti-analogy**: reversing $[T][S]$ to $[S][T]$ isn't a harmless reordering like swapping
  addends — it's computing an entirely different transformation, $S\circ T$ instead of $T\circ S$.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $T(x,y)=(2x+y,x-y)$ column-by-column construction.
- **Demonstration 2 (targets MC-3)**: the $T(3,4)$ matrix-vector-product verification against the
  direct function definition.
- **Demonstration 3 (targets MC-2)**: the $[T][S]$-versus-$[S][T]$ composition-order contrast for
  $T(x,y)=(x+y,x-y)$, $S(x,y)=(2x,3y)$.

## Discovery Questions
1. "When building the matrix representation of T, do you apply T to any convenient vectors, or
   specifically to β's own basis vectors, in order?"
2. "If β is a non-standard basis, can you multiply the matrix by v's raw standard components, or
   do you need v's coordinates relative to β?"
3. "For $T\circ S$, is the correct matrix product $[T][S]$ or $[S][T]$?"

## Teaching Sequence
1. **Conceptual shift**: work Example 1's column-by-column construction, isolating MC-1.
2. **Conceptual shift (second instance)**: work Example 2's matrix-vector product, connecting back
   to the direct function definition, isolating MC-3.
3. **Contrast pair**: work Example 3, computing both $[T][S]$ and $[S][T]$ explicitly, isolating
   MC-2.
4. **Mastery gate**: require a correct column-by-column matrix construction, a correct
   matrix-vector computation of $T(v)$, and a correct composition-order justification, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a matrix representation built from vectors other than β's own basis vectors, in
  order.
- Never accept a non-standard basis's coordinate vector replaced by raw standard components.
- Never accept $[S][T]$ presented as representing $T\circ S$.

## Voice Teaching Notes
- Say "which basis vector of β does this column come from?" whenever a matrix representation is
  being constructed.
- Ask "is that T-then-S, or S-then-T — and does your matrix product match that order?" whenever a
  composition is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs $[T]_{\gamma\beta}$ column-by-column from
  β's basis vectors.
- **Rung 2 (application)**: learner correctly computes $T(v)$ via $[T]_{\gamma\beta}[v]_\beta$.
- **Rung 3 (transfer)**: learner correctly composes two graphics-pipeline transformations in the
  right order and diagnoses what a reversed-order product actually represents.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive by explicitly listing β's vectors first, then applying T to each.
- If MC-2 recurs, re-verify against direct function composition to identify the matching product.
- If MC-3 recurs, re-derive $[v]_\beta$ explicitly before applying the matrix.

## Memory Hooks
- "Columns come from T applied to β's own basis vectors, in order — never substitutes."
- "Multiply against coordinates relative to β — never raw standard components for a non-standard
  basis."
- "$[T\circ S]=[T][S]$, T on the left — reversing it computes a different map entirely."

## Transfer Connections
- `math.linalg.linear-map` (prerequisite, already authored): supplies the linear-map definition
  this concept represents concretely as a matrix.
- `math.linalg.basis` (prerequisite, already authored): supplies the ordered-basis framework whose
  vectors this concept's columns are built from.

## Cross-Subject Connections
- Computer graphics: transformation pipelines (rotation, scaling, translation) are composed via
  exactly this matrix-multiplication-order rule, where a reversed order produces a visibly
  incorrect on-screen result.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix-representation.md`, reused by
  reference for its three worked examples, its composition-order contrast, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a graphics pipeline composing a
  rotation and a scaling transformation, diagnosing what a reversed-order matrix product actually
  represents.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale KG metadata discrepancy (unlocks)**: the Blueprint's Component 0 states "unlocks: (none
  in KG)" and Component 7 states "Unlocks: none recorded in the KG" — but the live KG
  (`docs/mathematics/kg/graph.json`) shows `unlocks: ["math.linalg.change-of-basis"]` for this
  concept, and `math.linalg.change-of-basis` does exist as a valid concept id in the KG. This is
  the campaign's 14th discrepancy overall and 5th stale-KG-metadata case. Corrected here: Identity
  section above states the live KG's actual `unlocks` value, not the Blueprint's stale claim.

## Version History
- 2026-09-19 (Batch 224): authored. First entry this batch. Companion batch concept:
  `math.linalg.tensor`.

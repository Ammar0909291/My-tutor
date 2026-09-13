# math.linalg.determinant

## Identity
- **KG id**: `math.linalg.determinant`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix-multiplication`
- **Unlocks**: `math.linalg.matrix-inverse`, `math.linalg.eigenvalues`, `math.linalg.cramer-rule`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
Compute the determinant of a $2\times2$ matrix via $\det(A)=ad-bc$ and a $3\times3$ matrix via
cofactor expansion; interpret $|\det(A)|$ as the area (2D) or volume (3D) of the parallelepiped
formed by the matrix's rows, with the sign encoding orientation; state and apply the criterion
$\det(A)=0\iff A$ is singular (rows linearly dependent, not invertible); and apply the product
rule $\det(AB)=\det(A)\det(B)$ while correctly rejecting the false analog $\det(A+B)=\det(A)+\det(B)$.

## Core Understanding
The determinant $\det(A)$ is a scalar function of a square matrix satisfying three defining
properties: multilinearity in each row separately, an alternating sign under row swaps, and
$\det(I)=1$. For a $2\times2$ matrix, this reduces to the familiar formula
$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$; for a $3\times3$ matrix, cofactor expansion along
any row (choosing the row with the most zeros for efficiency) reduces the computation to three
$2\times2$ sub-determinants.

Geometrically, $|\det(A)|$ measures the AREA (2D) or VOLUME (3D) of the parallelepiped formed by
placing the matrix's rows as vectors from the origin — this reuses `math.linalg.vector`'s own
displacement reading of a row directly. The SIGN of the determinant encodes orientation: positive
means the transformation preserves orientation, negative means it reverses it (like a reflection).
This geometric picture is what makes $\det(A)=0$ immediately meaningful rather than an arbitrary
formula output: if the rows are linearly dependent (one is a scalar multiple of another, or more
generally lie in a lower-dimensional subspace), the "parallelepiped" they form COLLAPSES to zero
area/volume — exactly the condition under which $A$ maps the whole space onto a lower-dimensional
image and is therefore NOT invertible. So $\det(A)=0\iff$ rows are linearly dependent $\iff A$
collapses dimension $\iff A$ is not invertible; and $\det(A)\ne0\iff A$ is invertible.

The determinant obeys a PRODUCT rule, $\det(AB)=\det(A)\det(B)$ — directly extending
`math.linalg.matrix-multiplication`'s own composed-operation reading, since $AB$ represents composing
two linear maps and the determinant of the composition is the product of the individual scale
factors. A consequence: $\det(A^{-1})=1/\det(A)$, since $\det(A)\det(A^{-1})=\det(AA^{-1})=\det(I)=1$.
The determinant is emphatically NOT additive: $\det(A+B)\ne\det(A)+\det(B)$ in general — even for
two copies of the identity matrix, $\det(I+I)=\det(2I)=4\ne1+1=2$. Row operations reveal further
structure: swapping two rows flips the sign of $\det$; scaling one row by $k$ multiplies $\det$ by
$k$; and adding a multiple of one row to another leaves $\det$ UNCHANGED — this last property is
exactly why Gaussian elimination's row-replacement steps don't require tracking determinant changes,
only swaps and scalings do.

## Mental Models
- **"$|\det(A)|$ is the area/volume the rows sweep out; the sign is which way it's facing."**
- **"$\det(A)=0$ means the rows collapse — no area, no volume, no way back."**
- **"Determinants multiply under composition ($\det(AB)=\det(A)\det(B)$); they do NOT add under
  matrix addition."**

## Why Students Fail

### MC-1: DETERMINANT-IS-JUST-A-FORMULA
- **Surface form**: applies $ad-bc$ (or cofactor expansion) mechanically to get a number, with no
  connection to area, orientation, or invertibility — treats the computation as the whole task.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). The
  formula is genuinely easy to apply in isolation; connecting a bare scalar output to a geometric
  meaning (area/volume) is a separate, non-obvious step that the formula's own mechanics never
  force a student to take.
- **Repair**: work the same matrix two ways side by side — the formula's numeric output, and the
  parallelogram picture whose area matches it exactly — so the number is never left unconnected to
  what it measures.

### MC-2: DET(A+B)=DET(A)+DET(B)
- **Surface form**: assumes the determinant is additive across matrix sums, i.e.
  $\det(A+B)=\det(A)+\det(B)$, confusing this with the valid product rule $\det(AB)=\det(A)\det(B)$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL-alternate
  severity). Other familiar linear operations (the trace, $\text{tr}(A+B)=\text{tr}(A)+\text{tr}(B)$)
  ARE additive, and that correct pattern is imported onto the determinant without verification — the
  determinant's row-multilinearity (linear in ONE row at a time) is genuinely different from
  full-matrix additivity, since adding two matrices changes every row simultaneously and produces
  cross-terms multilinearity alone does not track.
- **Repair**: compute $\det(A+B)$ directly for two copies of the identity matrix (the simplest
  possible case) and show it equals 4, not $1+1=2$ — a clean counterexample that the false pattern
  fails even in the easiest case.

### MC-3: ZERO-DETERMINANT-MEANS-ZERO-MATRIX
- **Surface form**: believes $\det(A)=0$ implies $A$ itself must be the all-zero matrix, rather than
  recognizing it as the signature of linearly dependent rows in an otherwise nonzero matrix.
- **Birth type**: Type 1, overgeneralization. In ordinary scalar arithmetic, a value being "zero" in
  the relevant sense typically does mean the object itself is zero (a product is zero only if a
  factor is zero) — this correct scalar intuition is carried over to matrices, where it fails: a
  matrix can have entirely nonzero entries and still have $\det=0$, once its rows happen to be
  linearly dependent.
- **Repair**: present a concrete nonzero matrix with $\det=0$ (rows one a multiple of the other) and
  connect the zero determinant directly to the collapsed parallelogram, not to any entry being zero.

## Misconceptions

### MC-1: DETERMINANT-IS-JUST-A-FORMULA
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DET(A+B)=DET(A)+DET(B)
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ZERO-DETERMINANT-MEANS-ZERO-MATRIX
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A photocopier scale factor: $|\det(A)|$ tells you how much a shape's area/volume is stretched
  or shrunk; the sign tells you whether the copy is flipped (mirror image) or not."**
- **Anti-analogy**: the determinant is NOT "just another number you extract from a matrix" the way,
  say, the trace is — the trace adds under matrix addition, but the determinant multiplies under
  matrix MULTIPLICATION and does neither cleanly under addition; conflating the two operations'
  behavior is exactly MC-2.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $A=\begin{pmatrix}3&1\\2&4\end{pmatrix}$, compute
  $\det(A)=10$ via the formula, then draw the parallelogram formed by rows $(3,1)$ and $(2,4)$ and
  confirm its area is exactly 10.
- **Demonstration 2 (targets MC-2)**: compute $\det(I+I)=\det(2I)=4$ directly and contrast with
  $\det(I)+\det(I)=1+1=2$, establishing the counterexample concretely.
- **Demonstration 3 (targets MC-3)**: for $B=\begin{pmatrix}1&2\\2&4\end{pmatrix}$ (row 2 = 2×row 1,
  entries all nonzero), compute $\det(B)=0$ and show the rows collapse to a single line — zero area,
  zero determinant, but $B$ is clearly not the zero matrix.

## Discovery Questions
1. "If two rows of a matrix point in the exact same direction (one is a multiple of the other), what
   should happen to the 'area' they sweep out — and what should that mean for the determinant?"
2. "Does $\det(AB)=\det(A)\det(B)$, or does $\det(A+B)=\det(A)+\det(B)$ — which one is actually true,
   and can you find a counterexample for the other?"
3. "Can a matrix with every entry nonzero still have determinant zero? What would that require of its
   rows?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix-multiplication`'s composed-operation reading and
   `math.linalg.vector`'s row-as-displacement reading, framing the determinant as a single number
   summarizing how a matrix scales area/volume.
2. **Conflict evidence**: the $\det(A+B)$ vs. $\det(A)+\det(B)$ counterexample, breaking MC-2
   directly.
3. **Contrast pair**: an invertible matrix (nonzero det, non-degenerate parallelogram) against a
   singular one (zero det, collapsed parallelogram, entries still nonzero) — isolating MC-1 and MC-3
   simultaneously.
4. **Mastery gate**: require a $2\times2$ and $3\times3$ determinant computation, an invertibility
   judgment with geometric justification, and correct application of the product rule alongside
   explicit rejection of additivity, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a bare numeric determinant without at least one geometric or invertibility
  interpretation attached.
- When a learner states $\det(A+B)=\det(A)+\det(B)$, require them to test it against a specific
  counterexample before proceeding.

## Voice Teaching Notes
- Say "what does that number tell you about area?" whenever a learner reports a determinant with no
  interpretation.
- When a nonzero matrix has $\det=0$, ask "does zero determinant mean the matrix itself is zero, or
  something about its rows?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a $2\times2$ determinant via $ad-bc$.
- **Rung 2 (application)**: learner correctly computes a $3\times3$ determinant via cofactor
  expansion and correctly judges invertibility from the sign/value of the result.
- **Rung 3 (transfer)**: learner correctly applies the product rule to a chain of matrix operations
  (e.g. $\det(A^2)$, $\det(A^{-1})$) and correctly rejects a proposed additivity claim with a
  counterexample.

## Tutor Recovery Strategy
- If MC-1 recurs, re-draw the parallelogram for the specific matrix in question and connect its area
  directly to the computed determinant.
- If MC-2 recurs, re-compute $\det(A+B)$ and $\det(A)+\det(B)$ explicitly for the specific matrices
  in question.
- If MC-3 recurs, re-identify the linear dependency between the specific matrix's rows and connect it
  to the collapsed parallelogram.

## Memory Hooks
- "$ad-bc$ — and that number IS an area."
- "Zero determinant: rows collapse, not entries collapse."
- "Determinants multiply under composition; they never simply add."

## Transfer Connections
- `math.linalg.matrix-multiplication` (already authored, this campaign): supplies the composed-map
  reading behind the product rule $\det(AB)=\det(A)\det(B)$.
- `math.linalg.vector` (already authored, this campaign): supplies the row-as-displacement reading
  that grounds the parallelogram/parallelepiped geometric interpretation.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.determinant.md`, reused by reference for
  its contrast-pair opening (invertible vs. singular matrix), its worked cofactor-expansion example,
  its pattern-induction property list (row swap/scaling/replacement, product rule, non-additivity
  counterexample), and its three-misconception registry (birth types independently classified, since
  this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a linear map's unit
  square image, computing area scale factor via the determinant and confirming invertibility).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `matrix-multiplication`, unlocks `matrix-inverse`/`eigenvalues`/`cramer-rule`, cross_links none,
  proficient/apply, mastery_threshold 0.9, estimated_hours 6) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-13 (Batch 74): authored. Unblocked by `math.linalg.matrix-multiplication` (Batch 73).
  Companion batch concepts: `math.linalg.norm`, `math.linalg.orthogonality`,
  `math.linalg.symmetric-matrix`. `math.linalg` moves toward **12/61** this batch. **Authoring this
  concept unblocks `math.linalg.matrix-inverse`/`math.linalg.eigenvalues`/`math.linalg.cramer-rule`
  directly, and is the exact concept that reopens the previously-parked `math.calc` domain (whose
  sole remaining concept, `change-of-variables`, requires this one).**

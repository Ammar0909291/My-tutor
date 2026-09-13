# math.linalg.eigenvalues

## Identity
- **KG id**: `math.linalg.eigenvalues`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix-multiplication`, `math.linalg.determinant`
- **Unlocks**: `math.linalg.diagonalization`, `math.linalg.spectral-theorem`
- **Cross-links**: `math.de.char-equation`, `math.fnal.spectral-theory`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
Find eigenvalues by solving the characteristic equation $\det(A-\lambda I)=0$, reusing
`math.linalg.determinant`'s own computation directly; find eigenvectors by solving
$(A-\lambda I)v=0$ for each eigenvalue, correctly excluding the zero vector; and recognize the
eigenspace as a full SUBSPACE (any nonzero scalar multiple of an eigenvector is also an
eigenvector with the same eigenvalue), never a single unique vector.

## Core Understanding
A nonzero vector $v$ is an EIGENVECTOR of a square matrix $A$ with EIGENVALUE $\lambda$ if
$Av=\lambda v$ — the matrix maps $v$ to a scalar multiple of itself. Geometrically, eigenvectors
are the FIXED DIRECTIONS of the linear transformation: most vectors are rotated AND scaled by $A$,
but eigenvectors are only SCALED, never rotated.

Eigenvalues are found from $Av=\lambda v\iff(A-\lambda I)v=0$ has a nonzero solution
$\iff\det(A-\lambda I)=0$ — reusing `math.linalg.determinant`'s own computation directly, now
applied to the matrix $A-\lambda I$ with a symbolic parameter $\lambda$. This CHARACTERISTIC
EQUATION is a degree-$n$ polynomial in $\lambda$ whose roots are exactly $A$'s eigenvalues. For
each eigenvalue $\lambda$, the corresponding eigenvectors are found by solving $(A-\lambda I)v=0$
— finding the NULL SPACE of $(A-\lambda I)$, called the EIGENSPACE $E_\lambda=\ker(A-\lambda I)$.

The eigenspace is a genuine SUBSPACE, not a single vector: if $Av=\lambda v$ and $c\ne0$, then
$A(cv)=c\cdot Av=c\lambda v=\lambda(cv)$, so $cv$ is ALSO an eigenvector with the same eigenvalue.
"The eigenvector for $\lambda$" conventionally means "a chosen representative of the eigenspace,"
never a unique object. The definition explicitly REQUIRES $v\ne0$: the zero vector trivially
satisfies $A\cdot0=\lambda\cdot0$ for every $A$ and every $\lambda$, but carries no geometric
information about $A$'s fixed directions, so it is excluded by construction.

Eigenvalues need not be real: a rotation matrix (e.g. 90° rotation) has NO real eigenvectors,
since no real direction survives a pure rotation unchanged — its characteristic equation has only
complex roots. Two useful identities connect eigenvalues to already-known matrix invariants:
$\det(A)$ equals the PRODUCT of all eigenvalues, and $\text{tr}(A)$ equals their SUM.

## Mental Models
- **"$Av=\lambda v$ — the transformation only SCALES this direction, never rotates it."**
- **"$\det(A-\lambda I)=0$ — the same determinant computation, now with $\lambda$ subtracted from
  the diagonal."**
- **"An eigenvector, not THE eigenvector — the eigenspace is a whole line (or plane) of them."**

## Why Students Fail

### MC-1: EIGENVECTOR-CAN-BE-ZERO
- **Surface form**: accepts the zero vector as a valid eigenvector, since it algebraically
  satisfies $A\cdot0=\lambda\cdot0=0$ for every $A$ and $\lambda$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). The
  equation $Av=\lambda v$ is algebraically satisfied by the zero vector trivially, and without the
  explicit $v\ne0$ exclusion stated and justified, nothing in the raw equation itself rules it out.
- **Repair**: state explicitly that the zero vector gives no information about $A$'s fixed
  directions (it has no direction at all), so the nonzero requirement is a meaningful exclusion,
  not arbitrary formalism.

### MC-2: EIGENVALUES-ARE-DIAGONAL-ENTRIES
- **Surface form**: reads off the diagonal entries of $A$ as its eigenvalues, skipping the
  characteristic equation entirely.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity). For diagonal and
  triangular matrices, the diagonal entries genuinely ARE the eigenvalues — this correct special
  case is generalized to matrices where it fails.
- **Repair**: compute the actual characteristic equation for a specific non-triangular matrix,
  showing the resulting eigenvalues differ entirely from the diagonal entries.

### MC-3: EIGENVECTORS-ARE-UNIQUE
- **Surface form**: believes each eigenvalue has exactly one eigenvector, missing that the
  eigenspace is a full subspace closed under scalar multiplication.
- **Birth type**: Type 1, overgeneralization. The characteristic equation gives a UNIQUE eigenvalue
  (a specific root), and that uniqueness is carried over to the eigenvector, without recognizing
  that "unique solution" (a full-rank system) and "eigenspace" (a null space, always at least
  one-dimensional) are structurally different objects.
- **Repair**: show explicitly that a scalar multiple of a computed eigenvector satisfies the same
  eigenvalue equation, establishing the eigenspace as a subspace rather than a single point.

## Misconceptions

### MC-1: EIGENVECTOR-CAN-BE-ZERO
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: EIGENVALUES-ARE-DIAGONAL-ENTRIES
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: EIGENVECTORS-ARE-UNIQUE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Pulling a rubber band along one direction: that direction's arrows stay pointing the same
  way, just longer — every other direction gets deflected sideways too. The unchanged direction IS
  the eigenvector."**
- **Anti-analogy**: eigenvalues are NOT "just whatever numbers sit on the diagonal" — that
  shortcut only works for triangular matrices; for a general matrix, the characteristic equation
  is mandatory, and the diagonal entries typically bear no relation to the true eigenvalues.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: check whether the zero vector is an eigenvector of
  $A=\begin{pmatrix}1&0\\0&2\end{pmatrix}$ with $\lambda=1$ — algebraically true, but excluded by
  definition since it carries no directional information.
- **Demonstration 2 (targets MC-2)**: for $A=\begin{pmatrix}1&3\\2&4\end{pmatrix}$, compute the
  actual characteristic equation and its roots ($\lambda=(5\pm\sqrt{33})/2$), showing neither
  matches the diagonal entries 1 and 4.
- **Demonstration 3 (targets MC-3)**: for $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}$ with eigenvector
  $(-1,1)$ for $\lambda=2$, verify $A(-2,2)=2(-1,1)\cdot2=(-2,2)\cdot2$ confirms $(-2,2)$ is also
  an eigenvector with the same eigenvalue.

## Discovery Questions
1. "Does the zero vector satisfy $Av=\lambda v$ for every matrix $A$ and every $\lambda$ — and
   does that make it a useful eigenvector?"
2. "Do the diagonal entries of a matrix always equal its eigenvalues, or only in special cases?"
3. "If $v$ is an eigenvector with eigenvalue $\lambda$, is $3v$ also an eigenvector with the same
   eigenvalue?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix-multiplication`'s own $Av$ computation and
   `math.linalg.determinant`'s own formula, framing eigenvalues as the specific scaling factors
   that make $Av$ parallel to $v$.
2. **Conflict evidence**: the zero-vector check and the non-triangular-matrix characteristic
   equation, breaking MC-1 and MC-2 directly.
3. **Contrast pair**: a diagonal matrix (diagonal entries ARE eigenvalues) against a non-diagonal
   one (characteristic equation required) — isolating MC-2 further.
4. **Mastery gate**: require a characteristic-equation computation, an eigenvector computation
   with the zero-vector exclusion, and an eigenspace-as-subspace judgment under transfer, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the zero vector as a valid eigenvector without the learner stating the exclusion.
- When eigenvalues are read directly off the diagonal, require the learner to verify via the
  characteristic equation unless the matrix is confirmed triangular.

## Voice Teaching Notes
- Say "does that vector actually give you a direction?" whenever the zero vector is proposed as an
  eigenvector.
- When an eigenvector is found, ask "is that THE eigenvector, or A representative of the
  eigenspace?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly solves the characteristic equation for a given
  matrix's eigenvalues.
- **Rung 2 (application)**: learner correctly computes an eigenvector for a given eigenvalue,
  excluding the zero vector.
- **Rung 3 (transfer)**: learner correctly identifies that a rotation matrix has no real
  eigenvectors and explains why, connecting the algebraic (complex roots) and geometric (no fixed
  direction) readings.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the directional-information argument for the specific matrix in
  question.
- If MC-2 recurs, re-compute the actual characteristic equation for the specific non-triangular
  matrix in question.
- If MC-3 recurs, re-verify a scalar multiple of the specific eigenvector in question satisfies
  the same eigenvalue equation.

## Memory Hooks
- "$Av=\lambda v$, $v\ne0$ — the zero vector is always excluded."
- "$\det(A-\lambda I)=0$ — the characteristic equation, mandatory except for triangular matrices."
- "An eigenvector, not THE eigenvector — the whole eigenspace qualifies."

## Transfer Connections
- `math.linalg.matrix-multiplication` (already authored, this campaign): supplies the $Av$
  computation the eigenvalue equation is built directly on.
- `math.linalg.determinant` (already authored, this campaign): supplies the determinant formula
  used to form the characteristic equation $\det(A-\lambda I)=0$.
- `math.de.char-equation` (Tier-1 cross-link, confirmed via `ls` to have no Educational Brain
  entry — `math.de` entirely unstarted): the Blueprint's own P76_mode is `independence`, matching
  this confirmed absence — reused exactly as declared.
- `math.fnal.spectral-theory` (Tier-1 cross-link, confirmed via `ls` to have no Educational Brain
  entry — `math.fnal` entirely unstarted): same independence-mode confirmation as above.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.eigenvalues.md`, reused by reference
  for its rubber-band analogy bridge, its worked-example pair (distinct real eigenvalues, repeated
  eigenvalue), its pattern-induction property list (triangular matrices, rotation matrices,
  projection matrices, det/trace formulas), and its three-misconception registry (birth types
  independently classified, since this Blueprint states triggers but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a 90°-rotation
  matrix, deriving its complex characteristic roots and connecting them to the geometric absence
  of a real fixed direction).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `matrix-multiplication`/`determinant`, unlocks `diagonalization`/`spectral-theorem`, cross_links
  `math.de.char-equation`/`math.fnal.spectral-theory`, proficient/apply, mastery_threshold 0.9,
  estimated_hours 6) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 75): authored. Unblocked by `math.linalg.determinant` (Batch 74). Companion
  batch concepts: `math.calc.change-of-variables`, `math.linalg.unit-vector`,
  `math.linalg.cross-product`. `math.linalg` moves toward **16/61** this batch. Unlocks
  `math.linalg.diagonalization`/`math.linalg.spectral-theorem` directly.

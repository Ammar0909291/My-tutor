# math.linalg.eigenspace

## Identity
- **KG id**: `math.linalg.eigenspace`
- **Domain**: math.linalg
- **Requires**: `math.linalg.eigenvalues`, `math.linalg.null-space`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Find the eigenspace $E_\lambda=\ker(A-\lambda I)=\{v:Av=\lambda v\}$ for a given eigenvalue by
solving the homogeneous system $(A-\lambda I)v=0$, reusing `math.linalg.null-space`'s own
technique directly; determine the GEOMETRIC MULTIPLICITY of $\lambda$ as $\dim(E_\lambda)$ and
compare it against the ALGEBRAIC MULTIPLICITY; and state that algebraic multiplicity $\ge$
geometric multiplicity ALWAYS, with EQUALITY for every eigenvalue characterizing exactly when a
matrix is DIAGONALIZABLE.

## Core Understanding
THE EIGENSPACE IS COMPUTED BY DIRECTLY REUSING THE NULL-SPACE TECHNIQUE: $E_\lambda=\ker(A-\lambda
I)$ is the set of ALL eigenvectors for a specific eigenvalue $\lambda$ (plus the zero vector) — a
subspace of $\mathbb R^n$, found by row-reducing $(A-\lambda I)$ and parameterizing free variables
exactly as `null-space` already established, applied here to the specific matrix $A-\lambda I$
rather than $A$ itself.

GEOMETRIC MULTIPLICITY (THE EIGENSPACE'S DIMENSION) CAN GENUINELY DIFFER FROM ALGEBRAIC
MULTIPLICITY: the algebraic multiplicity of $\lambda$ is how many times it appears as a root of
the characteristic polynomial; the geometric multiplicity is $\dim(E_\lambda)$ — how many
linearly independent eigenvectors actually correspond to $\lambda$. For
$A=\begin{pmatrix}3&1\\0&3\end{pmatrix}$, $\lambda=3$ has algebraic multiplicity 2 (a repeated
root), but row-reducing $A-3I=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ gives rank 1, so
$\dim(E_3)=2-1=1$ — geometric multiplicity STRICTLY LESS than algebraic multiplicity. These two
counts are computed by genuinely DIFFERENT methods (polynomial-root counting versus
null-space-dimension counting) and need not agree.

THE INEQUALITY IS ALWAYS ONE DIRECTION, AND EQUALITY EVERYWHERE MEANS DIAGONALIZABLE: algebraic
multiplicity $\ge$ geometric multiplicity, NEVER the reverse. When this holds with EQUALITY for
EVERY eigenvalue of $A$, the matrix is DIAGONALIZABLE — e.g.
$A=\mathrm{diag}(2,2,5)$ has $\lambda=2$ with algebraic multiplicity 2 and $E_2$ spanned by two
independent vectors (geometric multiplicity 2, equal), and $\lambda=5$ with both multiplicities 1
(equal) — confirming diagonalizability directly from the multiplicity match, without needing any
further test.

## Mental Models
- **"Algebraic multiplicity counts root repetitions in a polynomial; geometric multiplicity counts
  actual independent eigenvectors — two different countings that only sometimes agree."**
- **"A strict gap between algebraic and geometric multiplicity is the signature of a matrix that
  cannot be diagonalized."**

## Why Students Fail

### MC-1: ALGEBRAIC-AND-GEOMETRIC-MULTIPLICITY-ASSUMED-ALWAYS-EQUAL
- **Surface form**: believes algebraic and geometric multiplicity must always match.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  simple diagonal examples make the two counts coincide, obscuring that strict inequality is a
  genuine, common possibility).
- **Repair**: re-derive the eigenspace explicitly via row reduction, showing its true dimension
  can be strictly less than the algebraic count.

### MC-2: GEOMETRIC-MULTIPLICITY-COMPUTED-WITHOUT-ROW-REDUCTION
- **Surface form**: guesses or assumes an eigenspace's dimension rather than actually row-reducing
  $(A-\lambda I)$ to find its null-space dimension precisely.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  once the algebraic multiplicity is known, it's tempting to assume the geometric multiplicity
  matches without independently verifying via row reduction).
- **Repair**: re-derive by explicitly row-reducing $(A-\lambda I)$ and counting free variables.

## Misconceptions

### MC-1: ALGEBRAIC-AND-GEOMETRIC-MULTIPLICITY-ASSUMED-ALWAYS-EQUAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: GEOMETRIC-MULTIPLICITY-COMPUTED-WITHOUT-ROW-REDUCTION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Algebraic multiplicity is how many times a name is printed on a guest list; geometric
  multiplicity is how many distinct people actually show up — the list can overcount."**
- **Anti-analogy**: a repeated eigenvalue does NOT guarantee a matching number of independent
  eigenvectors — the eigenspace's true dimension must be checked by row reduction, never assumed
  from the root's multiplicity alone.

## Demonstrations
- **Demonstration 1 (targets MC-2, direct computation)**: for
  $A=\begin{pmatrix}2&0\\0&2\end{pmatrix}$, $\lambda=2$: $A-2I$ is the zero matrix, so EVERY
  vector satisfies $(A-2I)v=0$ — $E_2=\mathbb R^2$, $\dim(E_2)=2$.
- **Demonstration 2 (targets MC-1)**: for $A=\begin{pmatrix}3&1\\0&3\end{pmatrix}$, algebraic
  multiplicity of $\lambda=3$ is 2, but row-reducing $A-3I=\begin{pmatrix}0&1\\0&0\end{pmatrix}$
  gives rank 1, so $\dim(E_3)=1$ — strictly less than algebraic multiplicity; $A$ is NOT
  diagonalizable (defective).
- **Demonstration 3 (completes MC-1's contrast)**: for $A=\mathrm{diag}(2,2,5)$, both eigenvalues
  have matching algebraic and geometric multiplicities (2 and 1 respectively) — confirmed
  diagonalizable.

## Discovery Questions
1. "If an eigenvalue has algebraic multiplicity 2, does its eigenspace always have dimension 2?"
2. "Can you determine an eigenspace's dimension just from the characteristic polynomial's root
   multiplicities, without row-reducing $(A-\lambda I)$?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.null-space`'s own row-reduction technique, framing
   eigenspace computation as applying it to $A-\lambda I$.
2. **Conceptual shift**: Demonstration 1's direct computation, establishing the baseline
   procedure.
3. **Contrast pair**: Demonstration 2's strict-inequality case, isolating MC-1 by requiring the
   eigenspace be independently row-reduced rather than assumed to match the algebraic count.
4. **Representation shift**: Demonstration 3's equality case, connecting the multiplicity match
   directly to diagonalizability.
5. **Mastery gate**: require a correct eigenspace computation via row reduction, a correct
   algebraic-versus-geometric multiplicity comparison, and a correct diagonalizability
   determination, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a geometric multiplicity claim without an explicit row-reduction of $(A-\lambda
  I)$.
- Never accept "algebraic multiplicity always equals geometric multiplicity" as a general rule.

## Voice Teaching Notes
- Say "did you actually row-reduce $(A-\lambda I)$, or are you assuming it matches the algebraic
  count?" whenever a geometric multiplicity is stated.
- When diagonalizability is asked, ask "do the two multiplicities match for every eigenvalue, or
  just some?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes an eigenspace via row reduction of
  $(A-\lambda I)$.
- **Rung 2 (application)**: learner correctly compares algebraic and geometric multiplicity for a
  new matrix, identifying whether they match.
- **Rung 3 (transfer)**: learner correctly determines diagonalizability for a NEW matrix using the
  multiplicity-equality criterion across all its eigenvalues.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the eigenspace explicitly via row reduction.
- If MC-2 recurs, re-derive by explicitly row-reducing and counting free variables.

## Memory Hooks
- "Algebraic multiplicity is a ceiling — geometric multiplicity can fall short of it, never
  exceed it."
- "Equal multiplicities everywhere means diagonalizable; any gap means defective."

## Transfer Connections
- `math.linalg.eigenvalues` (already authored): supplies the eigenvalue and characteristic
  polynomial machinery this concept's algebraic multiplicity is drawn from.
- `math.linalg.null-space` (already authored, this campaign): supplies the row-reduction /
  free-variable technique this concept directly applies to $A-\lambda I$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.eigenspace.md`, reused by reference
  for its zero-matrix eigenspace example, its strict-inequality defective-matrix example, its
  equality-implies-diagonalizable example, and its two-misconception registry (severity levels
  adopted directly as declared; birth types independently classified since this Blueprint states
  Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  vibration-analysis engineer's stiffness-matrix eigenvalue with algebraic multiplicity 3 and a
  potentially smaller geometric multiplicity, and its physical/diagonalizability implications.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.eigenvalues`+`math.linalg.null-space`, unlocks none, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 96): authored. First entry this batch. Companion batch concept:
  `math.linalg.inner-product`. `math.linalg` moves 34/61 → **35/61** this batch.

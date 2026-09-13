# math.linalg.characteristic-polynomial

## Identity
- **KG id**: `math.linalg.characteristic-polynomial`
- **Domain**: math.linalg
- **Requires**: `math.linalg.eigenvalues`, `math.linalg.determinant`
- **Unlocks**: none
- **Cross-links**: `math.de.char-equation`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Construct the characteristic polynomial $p(\lambda)=\det(A-\lambda I)$ for a given matrix $A$,
reusing `math.linalg.determinant`'s own computation directly; find eigenvalues by solving
$p(\lambda)=0$, reusing `math.linalg.eigenvalues`'s own defining equation; and state the
Cayley-Hamilton theorem — $A$ satisfies its OWN characteristic polynomial, $p(A)=0$, with every
constant term converted to that constant times the identity matrix $I$.

## Core Understanding
The CHARACTERISTIC POLYNOMIAL of an $n\times n$ matrix $A$ is $p(\lambda)=\det(A-\lambda I)$ —
reusing `math.linalg.determinant`'s own computation directly, applied to the matrix $A-\lambda I$.
This is a degree-$n$ polynomial in the variable $\lambda$. Its ROOTS are exactly the EIGENVALUES of
$A$ — reusing `math.linalg.eigenvalues`'s own defining equation directly, since $\lambda$ is an
eigenvalue precisely when $A-\lambda I$ is singular (i.e. when $\det(A-\lambda I)=0$).

The CAYLEY-HAMILTON THEOREM states that $A$ satisfies its OWN characteristic polynomial:
substituting the MATRIX $A$ itself in place of $\lambda$ — with every CONSTANT term converted to
that constant TIMES the identity matrix $I$, since a bare scalar cannot be added directly to a
matrix — gives $p(A)=0$ (the zero matrix). This is a remarkable, non-obvious structural fact,
useful for computing matrix powers and inverses efficiently: once $A^2$ is expressed in terms of
$A$ and $I$ via Cayley-Hamilton, higher powers follow without repeated direct multiplication.

## Mental Models
- **"$p(\lambda)=\det(A-\lambda I)$ — the determinant of $A$ shifted by $\lambda$ on the
  diagonal."**
- **"Eigenvalues are exactly the roots of $p(\lambda)=0$."**
- **"Cayley-Hamilton: substitute $A$ for $\lambda$, and every constant term becomes that constant
  times $I$."**

## Why Students Fail

### MC-1: LAMBDA-SUBTRACTED-FROM-WRONG-ENTRIES
- **Surface form**: subtracts $\lambda$ from off-diagonal entries, or fails to subtract it from
  all diagonal entries, when forming $A-\lambda I$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity). The
  compact notation $A-\lambda I$ obscures that $\lambda I$ is a full matrix contributing $-\lambda$
  to EVERY diagonal position and ZERO to every off-diagonal position — without explicitly forming
  $\lambda I$ first, it is easy to misplace where the subtraction applies.
- **Repair**: re-derive $\lambda I$ explicitly as a full matrix first, then subtract it entry by
  entry from $A$.

### MC-2: CAYLEY-HAMILTON-CONSTANT-TERM-NOT-CONVERTED-TO-IDENTITY-MULTIPLE
- **Surface form**: substitutes $A$ for $\lambda$ in the characteristic polynomial but leaves the
  constant term as a bare scalar, rather than converting it to that scalar times the identity
  matrix — an operation that is not even a valid matrix equation as written.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity, tied
  with MC-1). Ordinary polynomial substitution (substituting a NUMBER for $\lambda$) leaves the
  constant term as a bare number, and that familiar pattern is carried over incorrectly when the
  substituted value is a MATRIX instead — every term, including the constant, must become a
  matrix.
- **Repair**: re-state that EVERY term of the polynomial, including the constant, must become a
  matrix when substituting $A$ — the constant term specifically becomes that number times $I$.

### MC-3: CHARACTERISTIC-POLYNOMIAL-DEGREE-MISMATCHED-TO-MATRIX-SIZE
- **Surface form**: produces a characteristic polynomial of the wrong degree, not matching the
  matrix's size $n$, typically from a determinant computation error.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). The
  determinant computation feeding into $p(\lambda)$ is error-prone in its own right, and without
  an explicit degree check as a sanity test, a computational slip can silently produce a polynomial
  of the wrong degree.
- **Repair**: re-derive the determinant computation carefully, verifying the resulting polynomial's
  degree matches $n$.

## Misconceptions

### MC-1: LAMBDA-SUBTRACTED-FROM-WRONG-ENTRIES
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: CAYLEY-HAMILTON-CONSTANT-TERM-NOT-CONVERTED-TO-IDENTITY-MULTIPLE
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: CHARACTERISTIC-POLYNOMIAL-DEGREE-MISMATCHED-TO-MATRIX-SIZE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A polynomial evaluated at a matrix is like a recipe that must be re-read for a different kind
  of ingredient: every step that used to add a plain number now needs that number scaled up to
  match the new ingredient's 'type' — here, matrices — which is exactly why the constant term
  becomes a multiple of $I$."**
- **Anti-analogy**: Cayley-Hamilton is NOT "just plug $A$ in like any other number" — a bare
  constant added to a matrix is not a valid operation at all; every term of the polynomial,
  without exception, must be converted into a matrix-shaped quantity first.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}$, form
  $A-\lambda I=\begin{pmatrix}3-\lambda&1\\0&2-\lambda\end{pmatrix}$, explicitly showing $\lambda$
  appears only on the diagonal.
- **Demonstration 2 (targets neither MC directly, establishes LO2)**: from
  $p(\lambda)=\lambda^2-5\lambda+6=0$, factor to $(\lambda-2)(\lambda-3)=0$, giving eigenvalues
  $\lambda=2,3$.
- **Demonstration 3 (targets MC-2)**: verify Cayley-Hamilton for the same $A$:
  $A^2-5A+6I=\begin{pmatrix}0&0\\0&0\end{pmatrix}$, contrasted against the invalid attempt to add
  "$+6$" as a bare scalar.

## Discovery Questions
1. "When forming $A-\lambda I$, does $\lambda$ get subtracted from every entry, or just some of
   them?"
2. "Are the eigenvalues of $A$ related to the characteristic polynomial in some way?"
3. "If you substitute the matrix $A$ itself into its characteristic polynomial, what happens to the
   constant term — does it stay a plain number?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.determinant`'s own computation and `math.linalg.eigenvalues`'s
   own defining equation, framing $p(\lambda)$ as the determinant of $A-\lambda I$.
2. **Conflict evidence**: the diagonal-only $\lambda$-subtraction demonstration, breaking MC-1
   directly.
3. **Contrast pair**: the correct $+6I$ substitution against the invalid bare-scalar attempt,
   isolating MC-2.
4. **Mastery gate**: require a correctly-formed characteristic polynomial, correct eigenvalue
   extraction, and a correct Cayley-Hamilton verification under transfer, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept $A-\lambda I$ with $\lambda$ appearing anywhere off the diagonal.
- When Cayley-Hamilton substitution is performed, require the learner to convert every constant
  term to that constant times $I$ before accepting the resulting matrix equation.

## Voice Teaching Notes
- Say "does $\lambda$ belong there, or only on the diagonal?" whenever $A-\lambda I$ is formed.
- When substituting $A$ for $\lambda$, ask "what does the constant term become now?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs $p(\lambda)=\det(A-\lambda I)$ for a given
  matrix.
- **Rung 2 (application)**: learner correctly finds eigenvalues by solving $p(\lambda)=0$, and
  correctly verifies Cayley-Hamilton with the constant term converted to a multiple of $I$.
- **Rung 3 (transfer)**: learner correctly uses Cayley-Hamilton to express a higher matrix power in
  terms of $A$ and $I$, in a novel context, without directly multiplying $A$ by itself repeatedly.

## Tutor Recovery Strategy
- If MC-1 recurs, re-form $A-\lambda I$ entry by entry for the specific matrix in question.
- If MC-2 recurs, re-convert the specific constant term in question to a multiple of $I$.
- If MC-3 recurs, re-derive the determinant computation for the specific matrix in question,
  checking the resulting degree.

## Memory Hooks
- "$p(\lambda)=\det(A-\lambda I)$ — subtract $\lambda$ only on the diagonal."
- "Eigenvalues are the roots of $p(\lambda)=0$."
- "Substituting $A$? Every constant becomes that constant times $I$."

## Transfer Connections
- `math.linalg.eigenvalues` (already authored, this campaign): supplies the defining equation whose
  roots this polynomial produces.
- `math.linalg.determinant` (already authored, this campaign): supplies the computation this
  polynomial is built from.
- `math.de.char-equation` (Tier-1 cross-link, confirmed via `ls` to have no Educational Brain entry
  — `math.de` entirely unstarted): the Blueprint's own metadata table states "cross_links: (none)",
  but the live KG lists `math.de.char-equation` as a genuine cross-link — a discrepancy resolved
  toward the KG (see Curriculum Feedback). Reused via independence mode, matching the confirmed
  absence.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.characteristic-polynomial.md`, reused
  by reference for its diagonal-subtraction demonstration, its eigenvalue-extraction demonstration,
  its Cayley-Hamilton verification demonstration, and its three-misconception registry (birth types
  independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an engineering
  matrix-power-efficiency scenario, using Cayley-Hamilton to express $A^2$ and $A^3$ in terms of
  $A$ and $I$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found**: the Blueprint's own Component 0 states
  "cross_links: (none)" and its Validation Checklist V-5 states "PASS (none declared)" — but the
  live KG lists `cross_links: ['math.de.char-equation']`. Resolved toward the KG per standing
  policy (never fixing the KG or Blueprint file). Verified via `ls
  educational-brain/concepts/mathematics/math.de.char-equation.md` that this cross-link target has
  no Educational Brain entry — independence mode applies: this entry's Cayley-Hamilton treatment is
  self-contained rather than citing a retrievable peer entry.

## Version History
- 2026-09-13 (Batch 78): authored. Unblocked by `math.linalg.eigenvalues` (Batch 75). Companion
  batch concepts: `math.linalg.det-properties`, `math.linalg.row-reduction`. `math.linalg` moves
  toward **25/61** this batch.

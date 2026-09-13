# math.linalg.matrix-inverse

## Identity
- **KG id**: `math.linalg.matrix-inverse`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix-multiplication`, `math.linalg.determinant`
- **Unlocks**: `math.linalg.cramer-rule`
- **Cross-links**: `math.abst.group-inverse`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define the inverse $A^{-1}$ of a square matrix $A$ as the matrix satisfying $AA^{-1}=A^{-1}A=I$,
and state the equivalence: $A$ is invertible iff $\det(A)\ne0$, reusing `math.linalg.determinant`'s
own criterion directly; compute $A^{-1}$ for a $2\times2$ matrix via the direct formula and for
larger matrices via row reduction on $[A|I]\to[I|A^{-1}]$; and correctly identify a SINGULAR
matrix ($\det(A)=0$) BEFORE attempting to compute an inverse, recognizing row reduction's failure
to reach $[I|\ldots]$ as diagnostic confirmation, not a computational error.

## Core Understanding
For a square matrix $A$, the INVERSE $A^{-1}$ (if it exists) is the unique matrix satisfying
$AA^{-1}=A^{-1}A=I$. $A$ is INVERTIBLE (non-singular) exactly when $\det(A)\ne0$ — reusing
`math.linalg.determinant`'s own criterion directly, equivalently when $\text{rank}(A)=n$
(full rank), equivalently when its columns are linearly independent. A matrix failing any of these
equivalent conditions is SINGULAR and has NO inverse.

For a $2\times2$ matrix $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, the inverse has a direct formula:
$A^{-1}=\frac{1}{\det(A)}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ — swap the diagonal entries, negate
the off-diagonal entries, divide by the determinant. For larger matrices, form the augmented matrix
$[A|I]$ and row-reduce until the LEFT side becomes $I$; whatever operations achieve this, applied
simultaneously to the right side, transform it into $A^{-1}$: $[A|I]\to[I|A^{-1}]$.

Row reduction FAILING to reach $[I|\ldots]$ is DIAGNOSTIC, never a mistake to fix: if $A$ is
singular ($\det(A)=0$), a row on the left side will become entirely zeros partway through, meaning
$I$ can never be reached. This is the row-reduction process itself CONFIRMING $A$ has no inverse,
exactly matching the $\det(A)=0$ diagnosis — the two methods are consistent, never contradictory.
The determinant check should ALWAYS come first, since it settles invertibility in one line before
committing to the full row-reduction procedure.

## Mental Models
- **"$AA^{-1}=I$ — the defining property; the inverse is whatever matrix multiplies $A$ back to
  identity."**
- **"$\det(A)\ne0$ — check this FIRST, always, before attempting to compute an inverse."**
- **"A zero row during row reduction on $[A|I]$ isn't a mistake — it's the answer: no inverse
  exists."**

## Why Students Fail

### MC-1: INVERTIBILITY-NOT-CHECKED-FIRST
- **Surface form**: attempts to compute a matrix inverse (via the $2\times2$ formula or row
  reduction) without first checking whether the determinant is nonzero, wasting effort on a
  singular matrix.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity).
  Computing an inverse is presented as a procedure to execute, and without an explicit habit of
  checking invertibility FIRST, the procedure is simply attempted regardless of whether it can
  succeed.
- **Repair**: re-anchor on checking $\det(A)$ first, always — a one-line computation that settles
  whether the rest of the work is even worth attempting.

### MC-2: SINGULAR-ROW-REDUCTION-TREATED-AS-ERROR
- **Surface form**: believes an all-zero row appearing during row reduction on $[A|I]$ indicates a
  computational mistake to fix, rather than recognizing it as the correct, diagnostic confirmation
  that $A$ is singular.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). In
  most row-reduction contexts, an unexpected zero row signals an arithmetic slip, and that pattern
  is overgeneralized to this case, where the zero row is actually the CORRECT and expected
  outcome for a singular matrix.
- **Repair**: re-anchor on "a zero row here is the ANSWER, not a mistake" — it directly confirms
  what $\det(A)=0$ already established.

### MC-3: INVERSE-FORMULA-APPLIED-WITHOUT-DIVIDING-BY-DETERMINANT
- **Surface form**: when using the $2\times2$ inverse formula, swaps and negates the entries
  correctly but forgets to divide the entire result by $\det(A)$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). The
  swap-and-negate step is visually salient and easy to execute mechanically; the final division
  step is easy to omit without an explicit verification habit.
- **Repair**: multiply the (incorrect, undivided) candidate matrix by $A$ directly, showing the
  result is NOT the identity until the determinant division is applied.

## Misconceptions

### MC-1: INVERTIBILITY-NOT-CHECKED-FIRST
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: SINGULAR-ROW-REDUCTION-TREATED-AS-ERROR
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: INVERSE-FORMULA-APPLIED-WITHOUT-DIVIDING-BY-DETERMINANT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A locked door and its key: not every door has a key that opens it — checking $\det(A)\ne0$ is
  checking whether a key exists AT ALL before trying to find it."**
- **Anti-analogy**: this is NOT "keep trying row-reduction techniques harder if you get stuck" — a
  zero row on a singular matrix is not a puzzle to solve with more effort; it is the definitive,
  final answer that no inverse exists.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: for $A=\begin{pmatrix}3&2\\1&4\end{pmatrix}$, compute
  $\det(A)=10$ and $A^{-1}=\frac1{10}\begin{pmatrix}4&-2\\-1&3\end{pmatrix}$, verifying
  $AA^{-1}=I$ directly.
- **Demonstration 2 (targets MC-1)**: for $B=\begin{pmatrix}2&4\\1&2\end{pmatrix}$, check
  $\det(B)=0$ FIRST, concluding immediately that $B$ is singular before attempting row reduction.
- **Demonstration 3 (targets MC-2)**: attempt $[B|I]$ for the same singular $B$, showing row
  reduction produces a zero row on the left before reaching $I$ — confirming, not contradicting,
  the determinant diagnosis.

## Discovery Questions
1. "Before computing an inverse, is there a quick check that tells you whether one exists at all?"
2. "If row reduction on $[A|I]$ produces a zero row, is that a mistake to fix or a conclusion to
   accept?"
3. "After swapping and negating entries in the $2\times2$ formula, is there a step still missing?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix-multiplication`'s own $AB$ computation and
   `math.linalg.determinant`'s own invertibility criterion, framing the inverse as the matrix
   satisfying $AA^{-1}=I$.
2. **Conflict evidence**: the determinant-first check on a singular matrix, breaking MC-1 directly.
3. **Contrast pair**: the determinant diagnosis against the row-reduction confirmation for the same
   singular matrix, isolating MC-2.
4. **Mastery gate**: require a $2\times2$ inverse computation with verification, a determinant-first
   invertibility check, and a diagnostic interpretation of a zero row under transfer, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept an inverse computation attempt without the learner first checking $\det(A)\ne0$.
- When a zero row appears during row reduction, require the learner to state this confirms
  singularity, not an error.

## Voice Teaching Notes
- Say "did you check the determinant first?" whenever an inverse computation is attempted.
- When a zero row appears, ask "is this a mistake, or the answer?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a $2\times2$ inverse and verifies
  $AA^{-1}=I$.
- **Rung 2 (application)**: learner correctly checks $\det(A)$ first before attempting to compute
  an inverse, and correctly identifies a singular matrix.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context (e.g. a supply-chain
  system), why a zero determinant makes solving via the inverse genuinely impossible, not merely
  computationally harder.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check the determinant for the specific matrix in question before any further
  computation.
- If MC-2 recurs, re-interpret the specific zero row in question as diagnostic confirmation.
- If MC-3 recurs, re-verify the specific undivided candidate matrix against $A$ directly.

## Memory Hooks
- "$\det(A)\ne0$ — check first, always."
- "A zero row on $[A|I]$ is the answer, not a mistake."
- "Swap, negate, AND divide — the formula has three steps, not two."

## Transfer Connections
- `math.linalg.matrix-multiplication` (already authored, this campaign): supplies the $AB$
  computation needed to verify $AA^{-1}=I$.
- `math.linalg.determinant` (already authored, this campaign): supplies the invertibility criterion
  $\det(A)\ne0$ this entire concept is built around.
- `math.abst.group-inverse` (Tier-1 cross-link, confirmed via `ls` to have no Educational Brain
  entry — `math.abst` entirely unstarted): the Blueprint's own P76_mode is `independence`,
  matching this confirmed absence — reused exactly as declared.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix-inverse.md`, reused by
  reference for its $2\times2$-formula-with-verification demonstration, its determinant-first
  contrast pair, its singular-row-reduction-as-diagnosis demonstration, and its three-misconception
  registry (birth types independently classified, since this Blueprint states severity but not
  birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a supply-chain
  linear-system scenario, explaining why $\det(A)=0$ makes solving via the inverse genuinely
  impossible, via linear dependence of columns).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `matrix-multiplication`/`determinant`, unlocks `cramer-rule`, cross_links
  `math.abst.group-inverse`, proficient/apply, mastery_threshold 0.9, estimated_hours 4) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 76): authored. Unblocked by `math.linalg.determinant` (Batch 74). Companion
  batch concepts: `math.graph.algebraic-graph-theory`, `math.linalg.linear-system`,
  `math.linalg.angle-vectors`. `math.linalg` moves toward **19/61** this batch. Unlocks
  `math.linalg.cramer-rule` directly.

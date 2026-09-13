# math.linalg.matrix-multiplication

## Identity
- **KG id**: `math.linalg.matrix-multiplication`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix`, `math.linalg.dot-product`
- **Unlocks**: `math.linalg.matrix-inverse`, `math.linalg.determinant`
- **Cross-links**: `math.abst.ring-theory`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute $C=AB$ via $C_{ij}=\sum_kA_{ik}B_{kj}$ — the dot product of row $i$ of $A$ with column $j$
of $B$ — reusing `math.linalg.matrix`'s own indexed grid and `math.linalg.dot-product`'s pair-
multiply-sum rule; verify that the INNER dimensions of $A$ and $B$ must match for the product to
be defined; and demonstrate, with a concrete counterexample, that matrix multiplication is
generally NON-COMMUTATIVE ($AB\ne BA$).

## Core Understanding
Matrix multiplication $C=AB$ is defined entry by entry: $C_{ij}=\sum_kA_{ik}B_{kj}$ — exactly the
DOT PRODUCT of row $i$ of $A$ with column $j$ of $B$, reusing `math.linalg.dot-product`'s own
pair-multiply-sum rule directly. This requires the INNER dimensions to match: if $A$ is
$m\times n$ and $B$ is $n\times p$ (the inner dimension $n$ shared), the product $C$ is
$m\times p$ (the OUTER dimensions). The inner-dimension requirement is not a convention layered on
top — it follows directly from the dot product itself needing two vectors of the SAME length: row
$i$ of $A$ has $n$ entries, column $j$ of $B$ has $n$ entries, and the dot product cannot be
formed at all if those lengths differ.

Matrix multiplication is generally NON-COMMUTATIVE: $AB\ne BA$, and this is not merely possible
but the GENERAL RULE, not a rare exception. This follows directly from the entry formula's own
asymmetry — $C_{ij}$ pairs a ROW of the FIRST matrix with a COLUMN of the SECOND, so swapping which
matrix comes first swaps which one contributes rows versus columns, genuinely changing the
computation. In some cases one product isn't even DEFINED while the other is (e.g. $A$ is
$2\times3$, $B$ is $3\times4$: $AB$ is defined as $2\times4$, but $BA$ requires $B$'s inner
dimension $4$ to match $A$'s outer dimension $2$ — it does not, so $BA$ is undefined), making
commutativity structurally impossible to even ask about.

The set of $n\times n$ matrices under addition and multiplication forms a NON-COMMUTATIVE RING —
it satisfies closure, associativity, distributivity, has a multiplicative identity (the identity
matrix $I$) and additive inverses, but fails commutativity for multiplication. This previews (in
independence mode, since no formal ring-theory prerequisite exists yet) the general algebraic
structure `math.abst.ring-theory` studies.

## Mental Models
- **"Check the inner dimensions first, always — they must match, or the product doesn't exist at
  all."**
- **"$C_{ij}$ = row $i$ of the FIRST matrix, dotted with column $j$ of the SECOND — never the
  reverse."**
- **"$AB\ne BA$ is the rule, not the exception — swapping order swaps which matrix contributes
  rows versus columns."**

## Why Students Fail

### MC-1: DIMENSION-RULE-IGNORED
- **Surface form**: attempts to multiply matrices whose inner dimensions do not match, e.g.
  computing the product of a $2\times3$ and a $2\times3$ matrix and claiming a $2\times3$ or
  $2\times2$ result.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: matrix multiplication is treated like
  ELEMENT-WISE (Hadamard) multiplication, the same overgeneralization that produces the vector-
  level MC-2 seen in `math.linalg.dot-product` — the learner is unaware the inner-dimension
  constraint is a structural requirement of the row-dotted-with-column definition, not an
  optional check.
- **Repair**: test both orders explicitly for a $2\times3$-by-$2\times3$ pair, showing the inner
  dimension of the first ($3$ columns) never matches the inner dimension of the second ($2$ rows)
  in either order, so BOTH $AB$ and $BA$ are undefined.

### MC-2: ROW-COLUMN-ORDER-REVERSED
- **Surface form**: uses column $i$ of $A$ dotted with row $j$ of $B$ instead of row $i$ of $A$
  dotted with column $j$ of $B$.
- **Frequency band**: not explicitly ranked by the Blueprint beyond MC-1's foundational status
  (adopted as secondary, given its shared repair target with MC-3).
- **Root cause (Type 4, notation-induced)**: the entry formula's index roles ($i$ selects a row of
  the FIRST factor, $j$ selects a column of the SECOND) are easy to swap when the subscripts
  $C_{ij}$ are read without tracking which factor each index actually belongs to.
- **Repair**: compute a specific entry explicitly with BOTH the correct pairing and the reversed
  pairing side by side, showing they produce genuinely different numbers.

### MC-3: ASSUMES-COMMUTATIVITY
- **Surface form**: claims $AB=BA$ for general matrices, computing $AB$ and assuming $BA$ must
  equal it without checking.
- **Frequency band**: not explicitly ranked by the Blueprint beyond MC-1's foundational status
  (adopted as secondary).
- **Root cause (Type 1, overgeneralization)**: scalar multiplication's commutativity
  ($ab=ba$ for ordinary numbers) is overgeneralized onto matrix multiplication, missing that the
  order-dependence arises directly from the entry formula's own row/column asymmetry, which has
  no analog in scalar arithmetic.
- **Repair**: compute both $AB$ and $BA$ explicitly for a concrete $2\times2$ pair, entry by
  entry, showing they genuinely differ — not merely asserting non-commutativity as a rule to
  memorize.

## Misconceptions

### MC-1: DIMENSION-RULE-IGNORED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ROW-COLUMN-ORDER-REVERSED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: ASSUMES-COMMUTATIVITY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An assembly line where the first machine's OUTPUT width must match the second machine's
  INPUT width — feed it backwards and the parts simply don't fit, exactly like mismatched inner
  dimensions."**
- **Anti-analogy**: matrix multiplication is NOT like multiplying ordinary numbers — $ab=ba$
  always holds for numbers, but $AB=BA$ is the EXCEPTION for matrices, not the rule.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $A$ ($3\times2$) and $B$ ($2\times4$), verify $AB$ is
  defined ($3\times4$) by checking the shared inner dimension $2$, then attempt $BA$ and confirm
  its inner dimensions ($4$ vs. $2$) do not match, so it is undefined.
- **Demonstration 2 (targets MC-2)**: compute a specific entry $C_{12}$ correctly (row 1 of $A$
  dotted with column 2 of $B$) and contrast it against the incorrect reversed pairing, showing
  the two calculations produce different numbers.
- **Demonstration 3 (targets MC-3)**: compute $AB$ and $BA$ explicitly for
  $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $B=\begin{pmatrix}5&6\\7&8\end{pmatrix}$, confirming
  $AB=\begin{pmatrix}19&22\\43&50\end{pmatrix}\ne\begin{pmatrix}23&34\\31&46\end{pmatrix}=BA$.

## Discovery Questions
1. "For $A$ ($m\times n$) times $B$ ($p\times q$), which pair of dimensions must match for the
   product to exist — the outer pair, or the inner pair?"
2. "In $C_{ij}=$ row $i$ of $A$ dotted with column $j$ of $B$, which matrix contributes the ROW,
   and which contributes the COLUMN?"
3. "If $AB$ is computed for two matrices, is $BA$ guaranteed to give the same result, a different
   result, or possibly not even be defined?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix`'s indexed grid and `math.linalg.dot-product`'s
   pair-multiply-sum rule, framing matrix multiplication as row-dotted-with-column.
2. **Conflict evidence**: the inner-dimension check applied to a genuinely mismatched pair,
   showing both orders can be undefined simultaneously.
3. **Contrast pair**: $AB$ versus $BA$ computed explicitly for the same matrix pair, showing the
   genuinely different results.
4. **Mastery gate**: require checking dimension compatibility, computing specific entries via the
   row-column dot product, and demonstrating non-commutativity with a counterexample, at the
   Blueprint's own stated pass criterion of 5/5.

## Tutor Actions
- Never accept a matrix product without the learner first stating whether the inner dimensions
  match.
- When a learner claims $AB=BA$, require them to compute both explicitly before accepting or
  rejecting the claim.

## Voice Teaching Notes
- Say "check the inner dimensions first" whenever a learner attempts a matrix product without
  verifying compatibility.
- When a learner assumes commutativity, ask "have you actually computed $BA$, or are you
  assuming it matches $AB$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly checks dimension compatibility and states the
  resulting product's dimensions.
- **Rung 2 (application)**: learner correctly computes a specific entry of a matrix product via
  the row-column dot product rule.
- **Rung 3 (transfer)**: learner correctly demonstrates non-commutativity with a concrete
  counterexample and connects the structure to the non-commutative ring `math.abst.ring-theory`
  previews.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check the inner dimensions explicitly for the specific matrices in question.
- If MC-2 recurs, re-compute the specific entry with the correct row-column pairing shown
  alongside the incorrect reversed pairing.
- If MC-3 recurs, re-compute both $AB$ and $BA$ explicitly, entry by entry, for the specific
  matrices in question.

## Memory Hooks
- "Inner dimensions match, or the product doesn't exist."
- "Row of the first, column of the second — never swapped."
- "$AB\ne BA$ is the rule for matrices, not the exception."

## Transfer Connections
- `math.linalg.matrix` (already authored, this campaign): supplies the indexed grid structure
  matrix multiplication operates on.
- `math.linalg.dot-product` (authored this same batch's predecessor, Batch 72): supplies the
  exact pair-multiply-sum rule each entry of a matrix product applies directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix-multiplication.md`, reused by
  reference for its inner/outer dimension contrast table, its worked demonstration of $AB$ versus
  $BA$ for concrete $2\times2$ matrices, and its three-misconception registry (MC-1's Foundational
  status adopted directly; MC-2/MC-3 birth types independently classified, since the Blueprint
  states root-cause narratives but not the Type 1-6 taxonomy).
- Transfer probe cited by reference: the Blueprint's own probe (computing $AB$ and $BA$ for a
  specific pair, confirming $AB\ne BA$, and identifying commutativity as the one ring axiom
  matrix multiplication fails).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy on requires/unlocks/cross_links/difficulty/bloom/
  mastery_threshold/estimated_hours**: every stated field (requires `matrix`+`dot-product`,
  unlocks `matrix-inverse`+`determinant`, cross_links `math.abst.ring-theory`, proficient/apply,
  mastery_threshold 0.9, estimated_hours 4) was directly verified against the live KG and matches
  exactly.
- **Genuine Blueprint-staleness finding on the P76 cross-link MODE, corrected**: the Blueprint
  declares `P76_mode: cross-link (math.abst.ring-theory is Tier 1)` and its own transfer probe is
  written as a direct ring-theory question — but `math.abst.ring-theory` is confirmed via `ls` to
  have NO Educational Brain entry (`math.abst` entirely unstarted, matching the same pattern as
  `math.linalg.vector-addition`'s own `math.abst.group-operation` cross-link earlier this batch's
  predecessor). Per this program's established precedent (Blueprint-file-existence mistaken for
  EB-entry-existence), this entry handles the transfer content in INDEPENDENCE mode — the ring-
  axiom discussion is presented self-contained within this entry rather than assuming a peer
  `math.abst.ring-theory` entry exists to cross-reference.
- **This concept, together with `math.linalg.matrix-transpose`, opens the direct path toward
  `math.linalg.determinant`** (its own sole prerequisite is `matrix-multiplication`), which will
  reopen the parked `math.calc` domain once authored.

## Version History
- 2026-09-13 (Batch 73): authored. Unblocked by `math.linalg.matrix` (Batch 72) and
  `math.linalg.dot-product` (Batch 72). Companion batch concepts:
  `math.disc.graph-representation`, `math.linalg.matrix-addition`,
  `math.linalg.matrix-transpose`. `math.linalg` moves toward **9/61** this batch. Unblocks
  `math.linalg.determinant` directly (its sole prerequisite), the concept that will reopen
  `math.calc`.

# math.linalg.lu-factorization

## Identity
- **KG id**: `math.linalg.lu-factorization`
- **Domain**: math.linalg
- **Requires**: `math.linalg.row-reduction`, `math.linalg.matrix-multiplication`
- **Unlocks**: none
- **Cross-links**: `math.num.lu-factorization`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Recognize that the elimination multipliers `math.linalg.row-reduction`'s own steps already
compute assemble directly into a LOWER TRIANGULAR matrix $L$ satisfying $A=LU$ — LU factorization
is bookkeeping of row reduction's own steps, not new arithmetic; recognize the payoff of $A=LU$:
solving $Ax=b$ for multiple different $b$ vectors becomes two cheap triangular solves (forward
substitution for $Ly=b$, then back substitution for $Ux=y$), reusing `math.linalg.matrix-multiplication`
to verify $LU=A$; and recognize, at orientation level, that a zero pivot forces a row swap,
requiring the modified factorization $PA=LU$.

## Core Understanding
LU FACTORIZATION is row reduction's OWN elimination steps, RECORDED rather than discarded.
`math.linalg.row-reduction` eliminates entries below each pivot using operations of the form
"Row$_k\to$Row$_k-m\cdot$Row$_i$" — and ordinarily, once elimination is done, the multipliers $m$
used along the way are thrown away, leaving only the final echelon form $U$. LU factorization's
insight is that these multipliers, if RECORDED instead of discarded, assemble into a lower
triangular matrix $L$ (with $1$s on the diagonal and each multiplier $m_{ki}$ placed at position
$(k,i)$) satisfying exactly $A=LU$ — the SAME elimination arithmetic already performed, packaged
into two matrices instead of one final result.

The PAYOFF: once $A=LU$ is known, solving $Ax=b$ becomes $LUx=b$; setting $y=Ux$, this splits into
$Ly=b$ (solved by FORWARD substitution, top to bottom, since $L$ is lower triangular) followed by
$Ux=y$ (solved by BACK substitution, bottom to top, exactly as in `math.linalg.row-reduction`).
Crucially, if a SECOND right-hand side $b'$ arises later for the SAME $A$, the expensive
elimination work (computing $L$ and $U$) does NOT need repeating — only two cheap triangular solves
are needed. Direct matrix multiplication (via `math.linalg.matrix-multiplication`) verifies $LU=A$.

At ORIENTATION LEVEL: if a pivot position happens to be zero (elimination cannot proceed as
written) or dangerously close to zero (numerically unstable), rows must be SWAPPED before
continuing — tracked via a PERMUTATION MATRIX $P$, giving the modified factorization $PA=LU$
rather than $A=LU$ directly. Full development of pivoting strategy is deferred beyond this
concept's core scope.

## Mental Models
- **"$L$ is exactly row reduction's own multipliers, recorded instead of thrown away."**
- **"$A=LU$ pays off when you solve $Ax=b$ for many different $b$'s — one expensive factorization,
  many cheap triangular solves."**
- **"A zero pivot breaks the simple story — you need $PA=LU$, a row swap first."**

## Why Students Fail

### MC-1: LU-COMPUTATION-ASSUMED-SEPARATE-NEW-ARITHMETIC
- **Surface form**: believes computing $L$ and $U$ requires separate new arithmetic distinct from
  row reduction, missing that $L$'s entries are exactly row reduction's own multipliers, recorded
  rather than discarded.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity). LU
  factorization is often introduced with new notation ($L$, $U$, "factorization") that suggests a
  genuinely new procedure, without an explicit statement that the underlying arithmetic is
  identical to elimination already known.
- **Repair**: re-walk the multiplier bookkeeping directly against `math.linalg.row-reduction`'s own
  elimination steps, re-anchoring on "$L$'s entries are exactly row reduction's own discarded
  multipliers, now recorded."

### MC-2: LU-PAYOFF-ASSUMED-SINGLE-USE
- **Surface form**: believes LU factorization's value applies even when solving $Ax=b$ only once,
  missing that its real payoff is reusing $L,U$ across multiple right-hand sides.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared High severity). A single
  worked example typically demonstrates the factorization on one $b$, and without an explicit
  contrast against the single-elimination cost, the "why bother factoring rather than just
  eliminating directly" payoff for repeated use is easy to miss.
- **Repair**: re-walk the cheap-reuse demonstration for a second right-hand side, re-anchoring on
  "the real payoff is reusing $L,U$ across many different right-hand sides."

### MC-3: A-EQUALS-LU-ASSUMED-ALWAYS-VALID
- **Surface form**: believes every matrix admits a plain $A=LU$ factorization via ordinary
  elimination, missing that a zero pivot forces a row swap, requiring $PA=LU$ instead.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Moderate severity). The clean
  $A=LU$ examples typically presented (all nonzero pivots) are overgeneralized into a universal
  claim, without encountering the zero-pivot edge case that breaks the simple story.
- **Repair**: re-walk the zero-pivot case, re-anchoring on "a zero pivot forces a row swap,
  requiring $PA=LU$ instead."

## Misconceptions

### MC-1: LU-COMPUTATION-ASSUMED-SEPARATE-NEW-ARITHMETIC
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: LU-PAYOFF-ASSUMED-SINGLE-USE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: A-EQUALS-LU-ASSUMED-ALWAYS-VALID
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Keeping your work versus erasing it: row reduction's multipliers are the 'scratch work' you'd
  normally erase once you reach the final echelon form — LU factorization is simply keeping that
  scratch work, because it turns out to be reusable for every future problem with the same
  matrix."**
- **Anti-analogy**: LU factorization is NOT "a completely different way to solve $Ax=b$" — it
  performs the EXACT SAME elimination arithmetic as ordinary row reduction; its only addition is
  recording, not recomputing.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for the matrix from `math.linalg.row-reduction`'s own worked
  system, record each elimination multiplier as it is used, assembling $L$ and verifying $LU=A$ by
  direct multiplication.
- **Demonstration 2 (targets MC-2)**: reuse the already-computed $L,U$ from Demonstration 1 to
  solve for a second right-hand side $b'$ via forward-then-back substitution, with zero
  re-elimination of $A$.
- **Demonstration 3 (targets MC-3)**: for a matrix with a zero $(1,1)$ pivot, show elimination
  cannot proceed as written, requiring a row swap and yielding $PA=LU$ instead of $A=LU$.

## Discovery Questions
1. "Is computing $L$ and $U$ separate new arithmetic, or is it something you already computed
   doing ordinary row reduction?"
2. "Does LU factorization only matter if you're solving $Ax=b$ a single time?"
3. "Does every matrix admit a factorization $A=LU$ using ordinary elimination, with no pivoting
   needed?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.row-reduction`'s own elimination steps, framing $L$ as those
   multipliers recorded rather than discarded.
2. **Conflict evidence**: the two-triangular-solve reuse demonstration for a second $b$, breaking
   MC-2 directly.
3. **Contrast pair**: the clean nonzero-pivot case against the zero-pivot case requiring $PA=LU$,
   isolating MC-3.
4. **Mastery gate**: require a correct $L,U$ assembly with $LU=A$ verification, a correct two-step
   solve for a new right-hand side, and a transfer explanation of when $PA=LU$ is needed, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that computing $L$ requires new arithmetic beyond row reduction's own
  multipliers.
- When a second right-hand side is introduced, require the learner to reuse the already-computed
  $L,U$ rather than re-eliminating from scratch.

## Voice Teaching Notes
- Say "did you already compute that multiplier during elimination, or is this new work?" whenever
  $L$'s entries are being assembled.
- When a zero pivot arises, ask "can elimination proceed as written, or does something need to
  change first?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly assembles $L$ and $U$ from a row-reduction's own
  elimination steps and verifies $LU=A$.
- **Rung 2 (application)**: learner correctly solves $Ax=b'$ for a new right-hand side using the
  already-computed $L,U$ via forward-then-back substitution.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context (e.g. an engineering
  firm solving for many load vectors), why factoring once and reusing $L,U$ is worthwhile, and
  correctly identifies when a zero pivot requires switching to $PA=LU$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the specific multiplier bookkeeping for the case in question directly
  against the row-reduction steps already performed.
- If MC-2 recurs, re-demonstrate the two-triangular-solve reuse for the specific new right-hand
  side in question.
- If MC-3 recurs, re-walk the specific zero-pivot case in question, showing the required row swap.

## Memory Hooks
- "$L$ is the multipliers you already computed — just recorded, not new."
- "One factorization, many cheap solves — that's the payoff."
- "Zero pivot? You need $PA=LU$, not plain $A=LU$."

## Transfer Connections
- `math.linalg.row-reduction` (already authored, this campaign): supplies the elimination steps
  this concept's $L$ directly records, and back-substitution reused unchanged for the $Ux=y$ step.
- `math.linalg.matrix-multiplication` (already authored, this campaign): supplies the computation
  needed to verify $LU=A$.
- `math.num.lu-factorization` (Tier-1 cross-link, confirmed via `ls` to have no Educational Brain
  entry — `math.num` entirely unstarted): the Blueprint's own P76_mode is `independence`, matching
  this confirmed absence — reused exactly as declared.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.lu-factorization.md`, reused by
  reference for its multiplier-bookkeeping demonstration, its two-right-hand-side reuse
  demonstration, its zero-pivot contrast demonstration, and its three-misconception registry (birth
  types independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an engineering
  firm scenario solving many load vectors for the same stiffness matrix, plus a pivot-becomes-zero
  complication).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `row-reduction`/`matrix-multiplication`, unlocks none, cross_links `math.num.lu-factorization`,
  proficient/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against the
  live KG and matches exactly — including the Blueprint's own correctly-declared independence-mode
  cross-link, verified fresh via `ls` rather than trusted.

## Version History
- 2026-09-13 (Batch 79): authored. Unblocked by `math.linalg.row-reduction` (Batch 78). Companion
  batch concept: `math.linalg.row-echelon`. `math.linalg` moves toward **27/61** this batch.

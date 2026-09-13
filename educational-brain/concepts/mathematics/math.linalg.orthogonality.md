# math.linalg.orthogonality

## Identity
- **KG id**: `math.linalg.orthogonality`
- **Domain**: math.linalg
- **Requires**: `math.linalg.dot-product`
- **Unlocks**: `math.linalg.orthogonal-basis`, `math.linalg.gram-schmidt`
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Determine whether two vectors are orthogonal by computing their dot product and checking whether it
equals EXACTLY zero, reusing `math.linalg.dot-product`'s own computation directly; recognize that
orthogonality is an ALGEBRAIC test applicable in any number of dimensions (including abstract spaces
with no picture), not merely a visual "looks perpendicular" judgment; and distinguish orthogonality
(dot product zero) from the stronger condition of orthoNORMALITY (orthogonal AND each vector
normalized to unit length).

## Core Understanding
Two vectors $u,v$ are ORTHOGONAL if and only if $u\cdot v=0$ — reusing `math.linalg.dot-product`'s own
computation directly, this single algebraic condition IS the entire definition. For a familiar 2D
pair like $u=(1,0)$, $v=(0,1)$, the algebraic test matches visual intuition ($u\cdot v=0$, and the
vectors do look perpendicular) — but the SAME test applies identically and with equal certainty in
$\mathbb R^4$, $\mathbb R^n$ for any $n$, or in abstract inner product spaces (polynomials,
functions) where "perpendicular" has no direct visual meaning at all. The dot-product test is not a
shortcut for confirming what a picture would show — it is the actual, and in general the ONLY,
method by which orthogonality is ever determined, even in 2D or 3D where a picture happens to be
possible.

Orthogonality says NOTHING about the vectors' lengths. Two vectors of wildly different, non-unit
lengths can be perfectly orthogonal — $u=(10,0)$ and $v=(0,-3)$ give $u\cdot v=0$ despite neither
having length 1. ORTHONORMALITY is the strictly stronger condition of being orthogonal AND each
individually normalized to length exactly 1 (via `math.linalg.norm`); orthogonality by itself makes no
length requirement whatsoever.

Orthogonality is also an EXACT condition, admitting no partial credit: a dot product of $0.001$ means
the vectors are definitively NOT orthogonal, exactly as decisively as a dot product of $500$ would —
"very small" and "exactly zero" are entirely different claims, and only the exact computation, never
an eyeballed estimate of how small a number looks, settles the question.

## Mental Models
- **"Orthogonal means $u\cdot v=0$ — full stop, checked algebraically, in any dimension."**
- **"No picture required, no picture possible past 3D — the dot product IS the test."**
- **"Orthogonal is about the dot product; orthonormal ADDS a length-1 requirement on top."**

## Why Students Fail

### MC-1: ORTHOGONALITY-REQUIRES-VISUALIZATION
- **Surface form**: believes orthogonality can only be determined or even meaningfully discussed by
  visual inspection in 2D/3D, missing that it is an algebraic test valid in any dimension or abstract
  space.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared FOUNDATIONAL severity — it
  directly enables both other misconceptions). Most students' first exposure to "perpendicular" is
  entirely visual/geometric from earlier geometry, and if the algebraic test is ever introduced merely
  as "a way to confirm what you can already see" rather than as the actual, sole definition, the
  visual anchor becomes load-bearing in a way that fails completely past 3 dimensions.
- **Repair**: apply the identical dot-product test to a picturable 2D pair AND an unpicturable
  higher-dimensional pair back to back, establishing algebra — not the picture — as what is actually
  being checked in both cases.

### MC-2: ORTHOGONAL-REQUIRES-UNIT-LENGTH
- **Surface form**: believes orthogonal vectors must have length exactly 1, conflating orthogonality
  with the stronger condition of orthonormality.
- **Birth type**: Type 6, analogy overextension. The word association between "orthogonal" and later
  "orthonormal" (or an early example that happened to use unit vectors) leads the length requirement
  of the LATER, stronger concept to be silently imported into the definition of the earlier, weaker
  one.
- **Repair**: present an orthogonal pair with dramatically different, explicitly non-unit lengths
  and confirm the dot-product test alone — with no reference to either length — settles orthogonality.

### MC-3: SMALL-DOT-PRODUCT-MEANS-APPROXIMATELY-ORTHOGONAL
- **Surface form**: treats a small but definitively nonzero dot product as "close enough" to
  orthogonal.
- **Birth type**: Type 5, instruction-induced. Visual or approximate judgments of "looks about
  perpendicular" naturally tolerate near-misses in a way the exact algebraic test never does, and
  without an explicit warning, a small-looking computed number is treated with the same tolerance a
  picture would allow.
- **Repair**: compute a small-but-nonzero dot product exactly and contrast it against a genuinely
  zero result, establishing that orthogonality has no "close enough" category.

## Misconceptions

### MC-1: ORTHOGONALITY-REQUIRES-VISUALIZATION
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-2: ORTHOGONAL-REQUIRES-UNIT-LENGTH
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-3: SMALL-DOT-PRODUCT-MEANS-APPROXIMATELY-ORTHOGONAL
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A lock-and-key test that works blindfolded: the dot product tells you 'orthogonal or not' with
  certainty, whether or not you could ever actually see the vectors."**
- **Anti-analogy**: orthogonality is NOT "looks like a right angle" — a picture is, at best, a
  supplementary sanity check available only in 2D/3D; the dot-product computation is the actual test,
  every time, in every dimension.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: check orthogonality via the dot product for a picturable 2D pair
  (matching intuition) and then for a 4D pair with no possible picture, using the identical formula
  both times.
- **Demonstration 2 (targets MC-2)**: confirm $u=(10,0)$ and $v=(0,-3)$ are orthogonal ($u\cdot v=0$)
  despite neither being a unit vector.
- **Demonstration 3 (targets MC-3)**: compute the exact dot product of $a=(1,0.001)$ and
  $b=(0.001,1)$ (equals $0.002$, NOT zero) and contrast with a genuinely orthogonal pair like
  $c=(1,0)$, $d=(0,1)$ (equals exactly 0).

## Discovery Questions
1. "Can two vectors in a space you can't draw or picture at all still be orthogonal — and how would
   you ever know?"
2. "Does an orthogonal pair of vectors need to have length 1, or is that a separate requirement?"
3. "If a dot product comes out to $0.001$ instead of exactly $0$, are the vectors orthogonal?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.dot-product`'s own computation, framing orthogonality as
   naming the specific zero-dot-product condition that computation can produce.
2. **Conflict evidence**: the picturable-2D-vs-unpicturable-4D pair, applying the identical test to
   both, breaking MC-1 directly.
3. **Contrast pair**: an orthogonal pair with dramatically different non-unit lengths against a
   small-but-nonzero dot product firmly classified as not orthogonal — isolating MC-2 and MC-3
   simultaneously.
4. **Mastery gate**: require correct orthogonality judgments across dimensions, an
   orthogonal-vs-orthonormal distinction, and exact-zero discipline under transfer, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a visual "looks perpendicular" judgment as sufficient — always require the dot-product
  computation.
- When a small nonzero dot product is reported, require the learner to state explicitly that it is
  NOT orthogonal before proceeding.

## Voice Teaching Notes
- Say "what does the dot product actually equal?" whenever a learner defaults to visual estimation.
- When length is mentioned in the same breath as orthogonality, ask "is that orthogonal, or
  orthonormal?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly determines orthogonality via the dot-product test for a
  picturable low-dimensional pair.
- **Rung 2 (application)**: learner correctly applies the identical test to a higher-dimensional pair
  with no picture, and correctly distinguishes orthogonal from orthonormal for a non-unit-length pair.
- **Rung 3 (transfer)**: learner correctly rejects a small-but-nonzero dot product as "approximately
  orthogonal" in a novel high-dimensional context (e.g. a data-science vector-similarity scenario),
  distinguishing the exact mathematical claim from an informal practical approximation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the picturable-vs-unpicturable pair comparison for the specific vectors in
  question.
- If MC-2 recurs, re-confirm the specific orthogonal, non-unit-length pair's dot product equals zero
  regardless of length.
- If MC-3 recurs, re-compute the exact dot product for the specific small-looking pair in question.

## Memory Hooks
- "$u\cdot v=0$ — that's the whole test, in every dimension."
- "Orthogonal says nothing about length; orthonormal adds length exactly 1."
- "Zero means zero — 0.001 is not zero, however small it looks."

## Transfer Connections
- `math.linalg.dot-product` (already authored, this campaign): supplies the exact computation whose
  zero-value case this concept names and studies.
- `math.linalg.norm` (already authored, this batch): supplies the length-1 normalization that
  distinguishes orthonormality from orthogonality.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.orthogonality.md`, reused by reference
  for its picturable-vs-unpicturable representation shift, its two-contrast-pair demonstration
  (non-unit-length orthogonal pair, small-but-nonzero dot product), and its three-misconception
  registry (birth types independently classified, since this Blueprint states triggers but not birth
  type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a 10-dimensional
  customer-spending-pattern scenario, distinguishing mathematical orthogonality from a practical
  near-independence approximation).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `dot-product`, unlocks
  `orthogonal-basis`/`gram-schmidt`, cross_links none, developing/understand, mastery_threshold 0.9,
  estimated_hours 2) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 74): authored. Unblocked by `math.linalg.dot-product` (Batch 72). Companion batch
  concepts: `math.linalg.determinant`, `math.linalg.norm`, `math.linalg.symmetric-matrix`.
  `math.linalg` moves toward **12/61** this batch.

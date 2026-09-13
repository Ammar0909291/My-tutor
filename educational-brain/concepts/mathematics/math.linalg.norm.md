# math.linalg.norm

## Identity
- **KG id**: `math.linalg.norm`
- **Domain**: math.linalg
- **Requires**: `math.linalg.dot-product`
- **Unlocks**: `math.linalg.unit-vector`, `math.linalg.distance`
- **Cross-links**: `math.real.metric-space`
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Compute the Euclidean norm $\|v\|=\sqrt{v\cdot v}=\sqrt{\sum v_i^2}$ of a vector, reusing
`math.linalg.dot-product`'s own $v\cdot v$ computation directly; recognize that the norm is ALWAYS
non-negative regardless of the vector's own signs, since squaring erases sign before the square root
is ever taken; and distinguish the standard Euclidean ($p=2$) norm from other valid $p$-norms
(1-norm, $\infty$-norm), which generally give DIFFERENT numeric values for the same vector.

## Core Understanding
The (Euclidean) norm of a vector $v$ is $\|v\|=\sqrt{v\cdot v}=\sqrt{\sum_i v_i^2}$ — directly reusing
`math.linalg.dot-product`'s own $v\cdot v$ computation, which is exactly the sum of squared
components already computed in a different context. This is the natural generalization of the
Pythagorean theorem: for $v=(3,4)$, $\|v\|=\sqrt{3^2+4^2}=\sqrt{25}=5$, the familiar hypotenuse length
of a 3-4-5 right triangle, and the identical square-then-sum-then-root pattern extends to any number
of components.

Because every term in the sum is SQUARED before anything else happens, the norm is ALWAYS
non-negative — squaring a negative component produces a positive result exactly as squaring its
positive counterpart would, so the sign of any individual component never survives into the final
answer. A vector with every component negative has exactly the same norm as its all-positive mirror
image.

The Euclidean norm is one member of a family of $p$-norms, $\|v\|_p=\left(\sum_i|v_i|^p\right)^{1/p}$
— the Euclidean case is $p=2$. Two other common cases: the 1-norm $\|v\|_1=\sum_i|v_i|$ (sum of
absolute values, no squaring at all) and the $\infty$-norm $\|v\|_\infty=\max_i|v_i|$ (just the
single largest absolute component). These generally give GENUINELY DIFFERENT numeric values for the
same vector — "the norm," without further qualification, conventionally means the Euclidean case, but
it is not the only valid notion of a vector's "size." All three satisfy the defining properties of a
norm (non-negativity/definiteness, homogeneity, the triangle inequality), which is exactly what makes
each one usable to build a valid metric $d(u,v)=\|u-v\|_p$ on the underlying space.

## Mental Models
- **"$\|v\|=\sqrt{v\cdot v}$ — the norm IS the dot product of $v$ with itself, square-rooted."**
- **"Square first — that's where the sign disappears, before the sum, before the root."**
- **"There isn't one 'the norm' — the 1-norm, 2-norm, and $\infty$-norm are three different
  questions about the same vector."**

## Why Students Fail

### MC-1: NORM-IS-SUM-OF-COMPONENTS
- **Surface form**: computes the norm by simply summing the raw components (e.g. treats
  $\|(3,4)\|$ as $3+4=7$), skipping the squaring and square root entirely.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity — the
  most common computational shortcut error for this concept). Summing raw components is the simplest
  possible operation available, and without an explicit anchor to the Pythagorean theorem, nothing
  about the word "norm" itself signals that squaring and a square root are required rather than a
  bare sum.
- **Repair**: re-anchor explicitly on the Pythagorean theorem — the hypotenuse of a right triangle
  with legs 3 and 4 is $\sqrt{3^2+4^2}$, never $3+4$ — and connect this directly to the norm formula
  as the SAME computation.

### MC-2: NEGATIVE-COMPONENTS-GIVE-NEGATIVE-NORM
- **Surface form**: believes a vector with one or more negative components must itself have a
  negative norm.
- **Birth type**: Type 2, perceptual intuition. A vector that "looks negative" (has negative-looking
  components) is intuitively expected to produce a "negative-looking" result, without tracking that
  every component is SQUARED — an operation that structurally erases sign — before the sum is even
  formed.
- **Repair**: compute the norm of a negative-component vector directly, showing each squared term is
  positive regardless of the original sign, so the sum (and its square root) is positive throughout.

### MC-3: ALL-NORMS-ARE-THE-SAME-VALUE
- **Surface form**: assumes the 1-norm, 2-norm, and $\infty$-norm of a vector are all equal, or treats
  "norm" as referring only to the Euclidean case with no valid alternatives.
- **Birth type**: Type 5, instruction-induced. Most introductory treatments present only the
  Euclidean norm and never explicitly contrast it against the 1-norm or $\infty$-norm on the same
  vector, so nothing signals that "norm" is a FAMILY of related-but-distinct formulas rather than one
  fixed operation.
- **Repair**: compute all three $p$-norms explicitly on one vector, showing three genuinely different
  numeric results, and state clearly that each is a separately valid — but different — notion of the
  vector's "size."

## Misconceptions

### MC-1: NORM-IS-SUM-OF-COMPONENTS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: NEGATIVE-COMPONENTS-GIVE-NEGATIVE-NORM
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-3: ALL-NORMS-ARE-THE-SAME-VALUE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The norm is the Pythagorean theorem generalized past two legs: square every piece, add, take one
  root."**
- **Anti-analogy**: the norm is NOT "add up the numbers you're given" — a raw sum of components has
  no geometric meaning as length at all, while the square-then-root construction is exactly what
  makes the result behave like a genuine distance.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute $\|(6,8)\|$ both the wrong way ($6+8=14$) and the
  correct way ($\sqrt{36+64}=\sqrt{100}=10$), confirming the correct answer matches the familiar
  6-8-10 right triangle.
- **Demonstration 2 (targets MC-2)**: compute $\|(-6,-8)\|=\sqrt{36+64}=10$, a POSITIVE result,
  despite both components being negative.
- **Demonstration 3 (targets MC-3)**: for $v=(3,-4)$, compute the 1-norm (7), 2-norm (5), and
  $\infty$-norm (4) side by side, confirming three genuinely different values.

## Discovery Questions
1. "If you sum the raw components of a vector instead of squaring them first, does the result still
   match the Pythagorean-theorem length?"
2. "Does squaring a negative component ever produce a negative result — and what does that mean for
   the sign of the final norm?"
3. "Do the 1-norm, 2-norm, and $\infty$-norm of the same vector have to agree, or can they be
   genuinely different numbers?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.dot-product`'s own $v\cdot v$ computation and the familiar
   Pythagorean theorem, framing the norm as the square root of a quantity already computed in a
   different context.
2. **Conflict evidence**: the raw-sum-vs-square-root-of-sum-of-squares computation for $\|(6,8)\|$,
   breaking MC-1 directly.
3. **Contrast pair**: a negative-component vector's norm (still positive) against the three-$p$-norm
   comparison on one vector (three different values) — isolating MC-2 and MC-3 simultaneously.
4. **Mastery gate**: require correct Euclidean norm computation, a sign-independence judgment, and a
   three-$p$-norm comparison under transfer, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a norm computed as a raw sum of components without the learner re-deriving it via
  squaring and a square root.
- When a vector has negative components, require the learner to confirm the norm is still
  non-negative before accepting a final answer.

## Voice Teaching Notes
- Say "square first — where does the sign go?" whenever a learner sums raw components instead of
  squaring them.
- When multiple $p$-norms are discussed, ask "should these three numbers be the same, or different?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the Euclidean norm of a vector via
  $\sqrt{\sum v_i^2}$.
- **Rung 2 (application)**: learner correctly confirms a negative-component vector's norm is positive
  and computes at least one alternative $p$-norm correctly.
- **Rung 3 (transfer)**: learner correctly connects the norm's non-negativity and sign-independence to
  the defining axioms of a metric (via `math.real.metric-space`'s framework), recognizing that
  multiple $p$-norms can each independently define a valid metric.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the Pythagorean theorem for the specific vector in question.
- If MC-2 recurs, re-compute the squared terms explicitly for the specific negative-component vector
  in question.
- If MC-3 recurs, re-compute all three $p$-norms explicitly for the specific vector in question.

## Memory Hooks
- "$\|v\|=\sqrt{v\cdot v}$ — the norm is a dot product wearing a square root."
- "Square first — sign disappears before the sum ever forms."
- "1-norm, 2-norm, $\infty$-norm: three different questions, three different answers."

## Transfer Connections
- `math.linalg.dot-product` (already authored, this campaign): supplies the $v\cdot v=\sum v_i^2$
  computation the norm is defined directly in terms of.
- `math.real.metric-space` (Tier-1 cross-link; confirmed via directory listing to have no
  Educational Brain entry — `math.real` is entirely unstarted): the Blueprint's own P76 transfer
  probe is self-contained, stating the three metric axioms directly within the probe text rather than
  assuming a peer entry's content is retrievable, so it is genuinely usable without independence-mode
  adaptation — reused by reference as written.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.norm.md`, reused by reference for its
  Pythagorean-theorem representation shift, its three-contrast-pair demonstration (raw sum vs.
  correct formula, negative components, three $p$-norms), and its three-misconception registry (birth
  types independently classified, since this Blueprint states triggers but not birth type).
- Transfer probe cited by reference: the Blueprint's own self-contained cross-link probe, deriving
  the metric-space non-negativity/definiteness/symmetry axioms directly from the norm's own
  sign-erasing squaring behavior, and evaluating whether multiple $p$-norms can each independently
  define a valid metric.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `dot-product`, unlocks
  `unit-vector`/`distance`, cross_links `math.real.metric-space`, developing/apply, mastery_threshold
  0.9, estimated_hours 2) was directly verified against the live KG and matches exactly.
- **P76 cross-link mode note**: `math.real.metric-space` has no Educational Brain entry
  (`math.real` domain entirely unstarted), which would normally warrant independence mode per this
  program's established convention — but the Blueprint's own transfer probe is self-contained (it
  states the three metric axioms directly within the probe text rather than assuming a retrievable
  peer entry), so no staleness correction was needed; the probe was reused exactly as written.

## Version History
- 2026-09-13 (Batch 74): authored. Unblocked by `math.linalg.dot-product` (Batch 72). Companion batch
  concepts: `math.linalg.determinant`, `math.linalg.orthogonality`,
  `math.linalg.symmetric-matrix`. `math.linalg` moves toward **12/61** this batch.

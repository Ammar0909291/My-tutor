# math.linalg.cross-product

## Identity
- **KG id**: `math.linalg.cross-product`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector`, `math.linalg.dot-product`
- **Unlocks**: none
- **Cross-links**: `math.geom.cross-product`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Compute the cross product $a\times b=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)$ of two
vectors in $\mathbb{R}^3$, reusing `math.linalg.vector`'s own component structure directly; state
and apply the two key geometric properties — the result is PERPENDICULAR to both $a$ and $b$, and
its magnitude equals $|a||b|\sin\theta$ (the area of the spanned parallelogram); and apply
ANTI-COMMUTATIVITY, $a\times b=-(b\times a)$, contrasting explicitly with
`math.linalg.dot-product`'s own commutativity.

## Core Understanding
The CROSS PRODUCT, defined only in $\mathbb{R}^3$, is
$a\times b=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)$ — reusing `math.linalg.vector`'s own
component structure directly, but producing a genuinely NEW VECTOR, unlike
`math.linalg.dot-product`'s own scalar output. Computing each of the three components in a
consistent cyclic pattern (indices $(2,3)$, then $(3,1)$, then $(1,2)$) reduces index-mixing
errors.

Geometrically, the result is PERPENDICULAR to BOTH $a$ and $b$ (normal to the plane they span),
and its magnitude equals $|a||b|\sin\theta$ — exactly the AREA of the parallelogram formed by $a$
and $b$. The most diagnostic verification that a computed cross product is correct is checking
PERPENDICULARITY: dot-producting the result with BOTH original vectors must give exactly zero
both times, reusing `math.linalg.dot-product`'s own zero-means-orthogonal test directly. This check
is more reliable than confirming the magnitude alone, since a computational slip could still
produce a wrong but nonzero-magnitude vector.

The cross product is ANTI-COMMUTATIVE: $a\times b=-(b\times a)$ — swapping the order REVERSES the
sign (and hence direction) of the result. This is a genuinely different behavior from
`math.linalg.dot-product`'s COMMUTATIVITY ($a\cdot b=b\cdot a$); the two vector products behave
oppositely under operand-order reversal, and this distinction must be actively held, not assumed
by analogy.

## Mental Models
- **"The cross product produces a NEW vector, perpendicular to both inputs — the dot product
  produces a scalar, the cross product a direction."**
- **"Verify by dot-producting the result with both originals — genuine cross products always give
  exactly zero both times."**
- **"Order matters: $a\times b$ and $b\times a$ point in OPPOSITE directions — unlike the dot
  product, where order never matters."**

## Why Students Fail

### MC-1: CROSS-PRODUCT-PERPENDICULARITY-NOT-VERIFIED
- **Surface form**: does not check a computed cross product's perpendicularity to both original
  vectors via dot products, relying on a less diagnostic check (or no check at all).
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). The
  component formula is presented as a mechanical procedure, and without an explicit habit of
  verification, nothing signals that a computational slip could produce a plausible-looking but
  incorrect result.
- **Repair**: re-compute the dot product of the result with BOTH original vectors, confirming both
  equal exactly zero — the diagnostic test that catches most computational errors.

### MC-2: CROSS-PRODUCT-ASSUMED-COMMUTATIVE
- **Surface form**: expects $a\times b=b\times a$, by incorrect analogy with the already-mastered
  commutative dot product, missing the genuine anti-commutative sign flip.
- **Birth type**: Type 6, analogy overextension (Blueprint's own declared FOUNDATIONAL severity —
  a classic case where prior correct learning about a DIFFERENT operation interferes with new
  learning). `math.linalg.dot-product`'s own commutativity is a recently-mastered, salient fact,
  and it is overextended onto this superficially similar "other vector product."
- **Repair**: compute both orders explicitly for a concrete example, confirming the result negates
  exactly, contrasting directly against the dot product's own order-independence.

### MC-3: CROSS-PRODUCT-COMPONENT-FORMULA-INDICES-MIXED-UP
- **Surface form**: miscomputes one or more of the three cross-product components by using the
  wrong pair of indices from the formula.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity). The
  three components use a cyclic $(2,3)\to(3,1)\to(1,2)$ index pattern that is easy to apply
  inconsistently without deliberately tracking the cycle.
- **Repair**: re-derive using the consistent cyclic pattern for the three components in order,
  verified against the perpendicularity test.

## Misconceptions

### MC-1: CROSS-PRODUCT-PERPENDICULARITY-NOT-VERIFIED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: CROSS-PRODUCT-ASSUMED-COMMUTATIVE
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-3: CROSS-PRODUCT-COMPONENT-FORMULA-INDICES-MIXED-UP
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A wood screw's rotation direction: turning it one way drives it in, the other way pulls it
  out — reversing the cross product's operand order reverses the resulting direction exactly the
  same way."**
- **Anti-analogy**: the cross product is NOT "the dot product, but for 3D vectors" — it produces a
  genuinely different KIND of result (a vector, not a scalar) and behaves oppositely under order
  reversal; the two operations share the name "product" but very little else.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: compute $(1,2,3)\times(4,5,6)$ component by component using
  the cyclic $(2,3)\to(3,1)\to(1,2)$ pattern, getting $(-3,6,-3)$.
- **Demonstration 2 (targets MC-1)**: verify $(-3,6,-3)$ is perpendicular to both $(1,2,3)$ and
  $(4,5,6)$ by dot-producting with each, confirming both equal exactly zero.
- **Demonstration 3 (targets MC-2)**: compute $(4,5,6)\times(1,2,3)$ (reversed order), getting
  $(3,-6,3)$ — exactly the negation of Demonstration 1's result, confirming anti-commutativity.

## Discovery Questions
1. "Does the cross product produce a scalar, like the dot product, or something else?"
2. "If a computed cross product's magnitude looks plausible, does that alone confirm it's
   correct?"
3. "Should $a\times b$ and $b\times a$ give the same result, or should you expect them to
   differ?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector`'s own component structure and
   `math.linalg.dot-product`'s own scalar-output contrast, framing the cross product as producing
   a genuinely different KIND of result.
2. **Conflict evidence**: the perpendicularity-verification demonstration, breaking MC-1 directly
   via the dot-product test already mastered.
3. **Contrast pair**: the reversed-order computation against the original, isolating MC-2 via
   direct negation.
4. **Mastery gate**: require a component computation with the cyclic pattern, a perpendicularity
   verification, and an anti-commutativity check under transfer, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept a computed cross product without the learner verifying perpendicularity via dot
  products with both original vectors.
- When operand order is reversed, require the learner to state that the result negates, not
  repeats.

## Voice Teaching Notes
- Say "does the dot product with both originals come out to zero?" whenever a cross product is
  computed.
- When order is swapped, ask "should this give the same result, or the opposite?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a cross product using the component
  formula.
- **Rung 2 (application)**: learner correctly verifies perpendicularity of the result via dot
  products with both original vectors.
- **Rung 3 (transfer)**: learner correctly applies anti-commutativity in a novel context (e.g. a
  torque computation $\tau=r\times F$), explaining why reversing operand order reverses the
  physical direction of the result.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify perpendicularity via dot products for the specific computed result in
  question.
- If MC-2 recurs, re-compute both operand orders explicitly for the specific vectors in question.
- If MC-3 recurs, re-derive using the cyclic index pattern for the specific components in
  question.

## Memory Hooks
- "Cross product: a new vector, perpendicular to both inputs."
- "Verify with the dot product — zero both times, or it's wrong."
- "Reverse the order, reverse the direction — never the same result."

## Transfer Connections
- `math.linalg.vector` (already authored, this campaign): supplies the component structure the
  cross-product formula operates on directly.
- `math.linalg.dot-product` (already authored, this campaign): supplies the zero-means-orthogonal
  test used to verify a cross product, and the commutativity this concept explicitly contrasts
  against.
- `math.geom.cross-product` (Tier-1 cross-link, already authored — `math.geom` CERTIFIED domain):
  genuinely incorporated as the geometric-context sibling entry, sharing the identical
  perpendicular/area/anti-commutative facts from the coordinate-geometry perspective this concept
  reuses in the pure linear-algebra setting.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.cross-product.md`, reused by
  reference for its systematic component-computation demonstration, its perpendicularity-
  verification contrast, its anti-commutativity contrast, and its three-misconception registry
  (birth types independently classified, since this Blueprint states severity but not birth
  type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a mechanical-
  engineering torque scenario, $\tau=r\times F$, explaining the physical consequence of an
  operand-order mistake via anti-commutativity).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG cross_links discrepancy found, resolved toward the KG**: the Blueprint's
  own Component 0 states "cross_links: (none)" and its Validation Checklist V-5 confirms "PASS
  (none declared)" — but the live KG lists `cross_links: ['math.geom.cross-product']`. Since
  `math.geom.cross-product` is confirmed authored (`math.geom` CERTIFIED domain), this entry
  genuinely incorporates that cross-link substantively (see Transfer Connections above) rather
  than treating it as absent, per this program's standing rule of resolving toward the KG. All
  other fields (requires, unlocks, difficulty, bloom, mastery_threshold, estimated_hours) match
  exactly.

## Version History
- 2026-09-13 (Batch 75): authored. Unblocked by `math.linalg.vector`+`math.linalg.dot-product`
  (both Batch 72). Companion batch concepts: `math.calc.change-of-variables`,
  `math.linalg.eigenvalues`, `math.linalg.unit-vector`. `math.linalg` moves toward **16/61** this
  batch.

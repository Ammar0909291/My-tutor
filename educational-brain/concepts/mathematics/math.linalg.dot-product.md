# math.linalg.dot-product

## Identity
- **KG id**: `math.linalg.dot-product`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector`, `math.arith.multiplication`
- **Unlocks**: `math.linalg.norm`, `math.linalg.angle-vectors`, `math.linalg.orthogonality`
- **Cross-links**: `math.geom.dot-product`
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Compute the dot product $\mathbf a\cdot\mathbf b=\sum_i a_ib_i$ of two same-dimension vectors,
reusing `math.linalg.vector`'s own ordered-tuple pairing and `math.arith.multiplication`'s signed
products; correctly identify the RESULT as a scalar, never a vector; and determine orthogonality
by checking whether $\mathbf a\cdot\mathbf b=0$.

## Core Understanding
The dot product of vectors $\mathbf a=(a_1,\ldots,a_n)$ and $\mathbf b=(b_1,\ldots,b_n)$ is the
SCALAR $\mathbf a\cdot\mathbf b=\sum_{i=1}^na_ib_i$ — pair each component by its shared position
(reusing `math.linalg.vector`'s own indexed structure), multiply each pair (reusing
`math.arith.multiplication`'s signed-product rule), then SUM all the products into a single
number. This is a genuinely different output type from vector addition or scalar multiplication:
those operations return vectors; the dot product always collapses to one number.

Geometrically, the same value is given by $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos
\theta$, where $\theta$ is the angle between the two vectors. The two formulas — component-based
and geometric — are equivalent, but serve different situations: the component formula is used
directly when components are given, while the geometric formula is used when angle and magnitude
are known instead. A direct corollary of the geometric formula gives the ORTHOGONALITY
criterion: $\mathbf a\cdot\mathbf b=0$ if and only if $\cos\theta=0$, i.e. $\theta=90°$ — the
vectors are perpendicular.

The dot product must not be confused with the ELEMENT-WISE (Hadamard) product
$\mathbf a\odot\mathbf b=(a_1b_1,\ldots,a_nb_n)$, which STOPS after multiplying and produces a
vector — a different operation entirely. The dot symbol always means: multiply pairs, THEN sum
everything into one number.

## Mental Models
- **"Pair, multiply, sum — and the answer is always one single number, never a vector."**
- **"Same operation, two formulas: use $\sum a_ib_i$ when components are given, use
  $|\mathbf a||\mathbf b|\cos\theta$ when angle and magnitude are given."**
- **"Zero dot product means perpendicular — a scalar zero, reporting a geometric fact about
  direction, not a zero vector."**

## Why Students Fail

### MC-1: ADD-THEN-MULTIPLY
- **Surface form**: for $(2,3)\cdot(4,5)$, adds components WITHIN each vector first
  ($2+3=5$, $4+5=9$), then multiplies the sums ($5\times9=45$) — instead of pairing across the
  vectors by position.
- **Frequency band**: Foundational (Blueprint's own declared foundational status — the wrong
  operation at the component-pairing level must be cleared before output-type or formula
  misconceptions are addressed).
- **Root cause (Type 1, overgeneralization)**: the two operations "add" and "multiply" both
  appear somewhere in the dot product's own definition, and a learner overgeneralizes a plausible
  BUT WRONG grouping of those operations — collapsing each vector to a single number first via
  addition, then combining the two resulting numbers via multiplication — rather than the correct
  cross-vector pairing.
- **Repair**: diagnose the very first arithmetic step performed ("add within a vector, or
  multiply across vectors?"), then re-derive pair by pair: position 1 multiplies across vectors,
  position 2 multiplies across vectors, and only THEN are the products summed.

### MC-2: DOT-PRODUCT-IS-VECTOR
- **Surface form**: returns the component-wise product as a vector, e.g.
  $(2,3)\cdot(4,5)=(8,15)$, instead of the scalar $23$.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 6, analogy overextension)**: both `math.linalg.vector-addition` and
  `math.linalg.scalar-multiplication`, already mastered, return VECTORS — that pattern is
  overextended onto the dot product, stopping at the element-wise product $(8,15)$ (the genuinely
  different Hadamard product) without performing the final summation step that collapses it to a
  scalar.
- **Repair**: explicitly perform the summation step the learner stopped short of, contrasting the
  element-wise product (a vector, a different operation) against the dot product (a scalar,
  reached by summing that same element-wise product).

### MC-3: COSINE-FORMULA-ONLY
- **Surface form**: cannot apply the component formula directly; attempts to find magnitudes and
  an angle even when components are already given.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 5, instruction-induced)**: the geometric formula
  $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$ is often the more MEMORABLE,
  visually-motivated formula taught first or emphasized more, so it becomes the default reach
  even in situations where the much simpler component formula applies directly.
- **Repair**: require the learner to compute a dot product using ONLY the component formula, with
  no magnitude or angle computation permitted, demonstrating the geometric formula is not a
  necessary detour.

## Misconceptions

### MC-1: ADD-THEN-MULTIPLY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DOT-PRODUCT-IS-VECTOR
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-3: COSINE-FORMULA-ONLY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An invoice ledger: pair each item's quantity with its price (same row), multiply, then sum
  every row's product into one total cost — never a total per item, one grand total."**
- **Anti-analogy**: the dot product is NOT the element-wise (Hadamard) product — an answer that
  is still a vector after the multiplication step is not yet a dot product; the summation is what
  finishes the operation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute $(1,2)\cdot(3,4)$ by pairing across vectors first
  ($1\times3=3$, $2\times4=8$, sum $=11$), contrasting explicitly against the incorrect
  add-within-vectors-first result ($3\times7=21$).
- **Demonstration 2 (targets MC-2)**: compute $(2,3)\cdot(4,5)$, stopping first at the
  element-wise product $(8,15)$, then performing the final sum to $23$, naming the intermediate
  step as the (different) Hadamard product.
- **Demonstration 3 (targets MC-3)**: compute $(2,3)\cdot(4,5)=23$ using only the component
  formula, with no magnitude or angle computed anywhere in the process.

## Discovery Questions
1. "For $(1,2)\cdot(3,4)$, should the very first step add numbers within one vector, or multiply
   numbers across the two vectors?"
2. "After multiplying corresponding components together, is the dot product finished, or is
   there one more step?"
3. "If you already know both vectors' components, do you need their magnitudes or the angle
   between them to compute the dot product?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector`'s indexed component structure and
   `math.arith.multiplication`'s signed products, framing the dot product as PAIR-MULTIPLY-SUM.
2. **Conflict evidence**: the add-then-multiply error contrasted against the correct
   pair-across-vectors, multiply, then sum sequence.
3. **Contrast pair**: the dot product (scalar, sums everything) versus the element-wise Hadamard
   product (vector, stops after multiplying).
4. **Mastery gate**: require computing the dot product in 2D and 3D with negative entries,
   determining orthogonality from a zero dot product, and applying the operation in a novel
   physical context, at the Blueprint's own stated pass criterion of 5/5.

## Tutor Actions
- Never accept a dot-product answer that is still a vector — always require the learner to state
  explicitly that the final answer is a single scalar.
- When a learner reaches for magnitude/angle with components already given, require them to
  attempt the component formula directly first.

## Voice Teaching Notes
- Say "pair across, not within" whenever a learner's first step adds components inside a single
  vector.
- When a learner's answer is still a vector, ask "is there one more step — summing those
  products?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the dot product for two same-dimension
  vectors and states the result is a scalar.
- **Rung 2 (application)**: learner correctly determines orthogonality by checking whether the
  dot product equals zero.
- **Rung 3 (transfer)**: learner correctly applies the dot product in a novel physical context
  (e.g. work done by a force) and explains why a perpendicular component contributes zero.

## Tutor Recovery Strategy
- If MC-1 recurs, re-diagnose the very first arithmetic step and re-run the pair-multiply-sum
  sequence explicitly.
- If MC-2 recurs, re-run the element-wise-product-versus-dot-product contrast, performing the
  final summation the learner stopped short of.
- If MC-3 recurs, require a component-only computation with magnitude/angle explicitly
  disallowed.

## Memory Hooks
- "Pair, multiply, sum — three steps, one number at the end."
- "Still a vector? Not done yet — sum it."
- "Components given? Use the component formula — no angle needed."

## Transfer Connections
- `math.linalg.vector` (already authored, this campaign): supplies the indexed component
  structure the dot product pairs across.
- `math.arith.multiplication` (already authored, CERTIFIED domain): supplies the signed-product
  rule applied to each paired component.
- `math.geom.dot-product` (already authored, CERTIFIED math.geom domain): the KG's own
  cross-link, genuinely real and content-adjacent — but the Blueprint deliberately designates it
  NOT Tier 1 and uses an independence-mode transfer probe (a physics work example) rather than a
  cross-link probe against it, a considered design choice this entry preserves rather than
  overriding.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.dot-product.md`, reused by reference
  for its invoice-ledger analogy, its worked-example pair (2D and 3D with negative entries), its
  contrast pair (dot product vs. Hadamard product; component formula vs. geometric formula), and
  its three-misconception registry (birth types independently classified, since this Blueprint
  states a trigger/error-pattern narrative but not the Type 1-6 taxonomy).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (work done by a
  force, $W=\mathbf F\cdot\mathbf d$, comparing horizontal vs. vertical displacement and
  explaining why a perpendicular force component contributes zero work).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `vector`+
  `math.arith.multiplication`, unlocks `norm`+`angle-vectors`+`orthogonality`, cross_links
  `math.geom.dot-product`, developing/apply, mastery_threshold 0.9, estimated_hours 3) was
  directly verified against the live KG and matches exactly.
- **Notable design choice, not a discrepancy**: although `math.geom.dot-product` is already
  authored and could in principle support a substantive cross-link probe, the Blueprint itself
  explicitly designates it NOT Tier 1 and deliberately chooses an independence-mode physics
  transfer probe instead — respected here as an intentional Blueprint design decision, not
  corrected toward cross-link-probe mode.

## Version History
- 2026-09-13 (Batch 72): authored. Unblocked by `math.linalg.vector` (Batch 71) and
  `math.arith.multiplication` (already authored, CERTIFIED math.arith domain). Companion batch
  concepts: `math.linalg.vector-addition`, `math.linalg.scalar-multiplication`,
  `math.linalg.matrix`. `math.linalg` moves toward **5/61** this batch. Unlocks a 3-concept
  chain (`norm`, `angle-vectors`, `orthogonality`) for a future batch.

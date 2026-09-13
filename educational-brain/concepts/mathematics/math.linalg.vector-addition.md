# math.linalg.vector-addition

## Identity
- **KG id**: `math.linalg.vector-addition`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector`
- **Unlocks**: none
- **Cross-links**: `math.abst.group-operation`
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 2

## Learning Objective
Compute $\mathbf u+\mathbf v$ and $\mathbf u-\mathbf v$ component-wise for any two vectors of the
SAME dimension, reusing `math.linalg.vector`'s own ordered-tuple structure; verify associativity
and commutativity from the underlying real-number arithmetic; recognize dimension mismatch as an
undefined operation, never an error to be worked around; and identify the zero vector as the
additive identity.

## Core Understanding
Vector addition is defined component-wise: $(a_1,\ldots,a_n)+(b_1,\ldots,b_n)=(a_1+b_1,\ldots,
a_n+b_n)$ — reusing `math.linalg.vector`'s own ordered-tuple definition, addition simply adds each
POSITION's real-number entries independently. Geometrically, this is the TIP-TO-TAIL rule: placing
the tail of $\mathbf v$ at the tip of $\mathbf u$, the sum $\mathbf u+\mathbf v$ runs from
$\mathbf u$'s tail to $\mathbf v$'s tip (equivalently, the parallelogram law).

Both vectors must have the SAME dimension for addition to be defined — this is not a technicality
to be patched around but a genuine TYPE requirement: a 2D vector tracks two independent
quantities, a 3D vector tracks three, and there is simply nothing in a 2D vector to pair with a
3D vector's third component. Addition of mismatched dimensions is UNDEFINED, not merely
incomplete or an error state to recover from.

Because each component is added using ordinary real-number addition (reusing
`math.found.real-numbers`'s own field axioms), vector addition inherits commutativity
($\mathbf u+\mathbf v=\mathbf v+\mathbf u$) and associativity directly, component by component.
The zero vector $\mathbf 0$ acts as the additive IDENTITY ($\mathbf v+\mathbf 0=\mathbf v$), and
every vector $\mathbf v$ has an additive INVERSE $-\mathbf v=(-v_1,\ldots,-v_n)$, with subtraction
defined as $\mathbf a-\mathbf b=\mathbf a+(-\mathbf b)$. These four properties — closure,
associativity, identity, inverse, plus commutativity — are exactly what makes $(\mathbb R^n,+)$ an
ABELIAN GROUP, previewing (without formally teaching) the structure `math.abst.group-operation`
studies in full generality.

## Mental Models
- **"Add component 1 to component 1, component 2 to component 2 — never mix positions across the
  two vectors."**
- **"Same dimension or undefined — there is no partial answer for mismatched vectors, only a
  type error."**
- **"Tip-to-tail: walk the first displacement, then the second, from wherever the first one
  ends."**

## Why Students Fail

### MC-1: CROSS-COMPONENT-MIXING
- **Surface form**: $(1,2)+(3,4)=(1+4,2+3)=(5,5)$ — mixes components across positions instead of
  pairing by index.
- **Frequency band**: Foundational (Blueprint's own declared priority).
- **Root cause (Type 1, overgeneralization)**: the general habit of "combine every number in
  sight" from earlier arithmetic overgeneralizes past the requirement that vector addition pairs
  components by their SHARED index position — nothing in the notation itself enforces the pairing
  the way, say, aligned columns in a written sum would.
- **Repair**: list the index-1 elements and the index-2 elements SEPARATELY before adding, making
  the required pairing structurally visible rather than implicit.

### MC-2: DIMENSION-MISMATCH-IGNORED
- **Surface form**: attempts to add $(1,2)+(3,4,5)$ without raising an error.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 5, instruction-induced)**: the dimension check is rarely drilled as a
  mandatory FIRST step before any addition is attempted, so it is skipped by default rather than
  performed and then dismissed.
- **Repair**: require the learner to state explicitly which component of the smaller vector would
  need to pair with the larger vector's extra component, exposing that no such partner exists.

### MC-3: ADDITION-COLLAPSES-DIMENSION
- **Surface form**: believes $(1,2)+(3,4)=10$ (a scalar) or $(1,2,3,4)$ (concatenated).
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 6, analogy overextension)**: vector addition is confused with either scalar
  addition (collapsing to one number) or list concatenation (stringing entries together) — two
  operations that share superficial surface similarity (numbers being "combined") but produce a
  fundamentally different structure than component-wise addition.
- **Repair**: count the component additions explicitly (two additions for two 2D vectors,
  producing exactly two results) — that count directly determines the output's dimension.

## Misconceptions

### MC-1: CROSS-COMPONENT-MIXING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DIMENSION-MISMATCH-IGNORED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: ADDITION-COLLAPSES-DIMENSION
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two hikers' walking directions, added leg by leg: east-west distances combine with
  east-west, north-south with north-south — never an east-west distance combined with a
  north-south one."**
- **Anti-analogy**: vector addition is NOT string concatenation and NOT scalar addition — the
  result is a vector of the SAME dimension as the inputs, never longer and never collapsed to one
  number.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute $(5,-3)+(-2,7)=(3,4)$ by explicitly labeling each
  position's sum, then $(1,-2,5)+(3,0,-1)=(4,-2,4)$, verifying the reversed order gives the
  identical result (commutativity).
- **Demonstration 2 (targets MC-2)**: attempt $(4,-1,2)+(5,3)$ and identify that the third
  component of the first vector has no partner in the second, making the sum undefined.
- **Demonstration 3 (targets MC-3)**: compute $(1,2)+(3,4)$ and confirm the result is a single
  2D vector $(4,6)$ — neither the scalar $10$ nor the 4-entry list $(1,2,3,4)$.

## Discovery Questions
1. "When adding $(1,2)$ and $(3,4)$, should the first number of one vector combine with the first
   or the second number of the other?"
2. "If one vector tracks 2 quantities and another tracks 3, is there always a valid way to add
   them, or could the operation simply not be defined?"
3. "Adding two 2D vectors together — should the answer have more entries, fewer entries, or the
   same number of entries as each input?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector`'s own component structure, framing addition as the
   first operation performed on that structure.
2. **Conflict evidence**: the cross-component-mixing error contrasted against the correct
   positional pairing.
3. **Contrast pair**: a dimension-matched addition versus a dimension-mismatched attempt, and the
   correct 2D result versus the collapsed-scalar/concatenated-list guesses.
4. **Mastery gate**: require component-wise addition and subtraction across dimensions, a
   dimension-mismatch judgment, and verification of the zero-vector identity property, at the
   Blueprint's own stated pass criterion of 5/5.

## Tutor Actions
- Never accept a vector sum without the learner stating explicitly which component of each input
  vector was paired to produce each output component.
- When two vectors of different dimensions are presented for addition, require the learner to
  state "undefined" and why, before moving on.

## Voice Teaching Notes
- Say "which position pairs with which?" whenever a learner's addition skips explicit
  index-by-index pairing.
- When a learner attempts to add mismatched-dimension vectors, ask "what would the extra
  component even pair with?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes component-wise addition for two
  same-dimension vectors.
- **Rung 2 (application)**: learner correctly identifies a dimension mismatch as undefined and
  correctly computes vector subtraction via the additive-inverse definition.
- **Rung 3 (transfer)**: learner correctly verifies commutativity/associativity from real-number
  arithmetic and correctly applies the zero-vector identity property.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the explicit separate-listing-by-index repair.
- If MC-2 recurs, re-run the "what would the extra component pair with?" demonstration.
- If MC-3 recurs, re-count the component additions explicitly for the specific vectors in
  question.

## Memory Hooks
- "Pair by position, never by proximity."
- "Different dimensions, no addition — not incomplete, undefined."
- "Two vectors in, one vector of the SAME size out."

## Transfer Connections
- `math.linalg.vector` (already authored, this campaign): supplies the ordered-tuple structure,
  dimension, and zero vector this concept's addition operates on directly.
- `math.abst.group-operation` (Blueprint-confirmed unauthored, `math.abst` entirely unstarted):
  handled in independence mode — this entry's own closure/associativity/identity/inverse/
  commutativity list previews the abelian-group structure without requiring formal group theory.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.vector-addition.md`, reused by
  reference for its tip-to-tail displacement analogy, its worked-example pair (2D and 3D
  addition, commutativity verification), its contrast-pair table (correct pairing vs.
  cross-component mixing vs. dimension mismatch vs. dimension collapse), and its
  three-misconception registry (birth types independently classified, since this Blueprint states
  priority and a root-cause narrative but not the Type 1-6 taxonomy).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (deriving vector
  subtraction from $\mathbf a-\mathbf b=\mathbf a+(-1)\mathbf b$ and verifying
  $(\mathbf a-\mathbf b)+\mathbf b=\mathbf a$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `vector`, unlocks
  none, cross_links `math.abst.group-operation`, developing/apply, mastery_threshold 0.95,
  estimated_hours 2) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 72): authored. Unblocked by `math.linalg.vector` (Batch 71). Companion batch
  concepts: `math.linalg.scalar-multiplication`, `math.linalg.dot-product`, `math.linalg.matrix`.
  `math.linalg` moves toward **5/61** this batch.

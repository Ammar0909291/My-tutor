# math.linalg.scalar-multiplication

## Identity
- **KG id**: `math.linalg.scalar-multiplication`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 1

## Learning Objective
Compute $c\mathbf v=(cv_1,cv_2,\ldots,cv_n)$ for any real scalar $c$ and vector $\mathbf v$ of any
dimension, reusing `math.linalg.vector`'s own ordered-tuple structure; interpret the geometric
scaling effect (stretch/compress by $|c|$, reverse direction when $c<0$); and correctly apply the
special scalars $0$, $1$, and $-1$.

## Core Understanding
Scalar multiplication multiplies EVERY component of a vector by the same real number $c$:
$c(v_1,v_2,\ldots,v_n)=(cv_1,cv_2,\ldots,cv_n)$ — reusing `math.linalg.vector`'s own component
structure, but applying $c$ uniformly to every entry, never to just one. Geometrically, this
scales the displacement arrow: $|c|$ stretches the arrow (if $|c|>1$) or compresses it (if
$0<|c|<1$), and the SIGN of $c$ determines direction — positive keeps the same direction, negative
REVERSES it.

Three special scalars anchor the operation: $1\cdot\mathbf v=\mathbf v$ (the multiplicative
identity, changing nothing), $0\cdot\mathbf v=\mathbf 0$ (the zero scalar annihilates every vector
to the zero vector), and $(-1)\cdot\mathbf v=-\mathbf v$ (negation — the exact additive inverse
`math.linalg.vector-addition` defines). The negative sign is not a separate case bolted onto the
rule; it is carried into EVERY component by the same multiplication, so $(-2)(3,4)=(-6,-8)$, not
$(6,8)$ — the sign genuinely flips each component, it does not merely scale a magnitude.

Together with vector addition, scalar multiplication is one of the two operations that make
$\mathbb R^n$ a vector space; the distributive laws $c(\mathbf u+\mathbf v)=c\mathbf u+c\mathbf v$
and $(c+d)\mathbf v=c\mathbf v+d\mathbf v$, previewed here without full derivation, are what
formally connect the two operations.

## Mental Models
- **"Multiply every single component by $c$ — no exceptions, no skipped entries."**
- **"The sign of $c$ decides direction; the size of $c$ decides length — both apply to EVERY
  component simultaneously."**
- **"$1$ changes nothing, $0$ annihilates to the zero vector, $-1$ reverses direction exactly."**

## Why Students Fail

### MC-1: SCALAR-ADDS-TO-COMPONENTS
- **Surface form**: $3(2,5)=(2+3,5+3)=(5,8)$ instead of $(6,15)$ — the scalar is used as an
  addend, not a multiplier.
- **Frequency band**: Foundational (Blueprint's own declared priority).
- **Root cause (Type 1, overgeneralization)**: the visually similar juxtaposition of a number
  next to a vector (as in $c\mathbf v$) is overgeneralized from earlier contexts where a lone
  number placed near an expression signaled ADDITION (as in a running total), rather than the
  multiplicative scaling the notation actually specifies.
- **Repair**: explicitly ask "does the operation say 'add 3 to each component' or 'multiply each
  component by 3'?", computing $3\times2$ and $3\times5$ directly to break the addend reflex.

### MC-2: SCALAR-MULTIPLIED-ONCE
- **Surface form**: $3(2,5)=(6,5)$ — the scalar is applied to only the first component.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 1, overgeneralization)**: single-variable multiplication habits (multiplying
  one number by another, once) are overgeneralized onto a vector's multi-component structure,
  where the operation must instead be repeated once per component.
- **Repair**: count the required multiplications explicitly before performing them (three
  components means three separate multiplications), making the omission visible.

### MC-3: NEGATIVE-SCALAR-MAGNIFIES
- **Surface form**: $-2(3,4)=(6,8)$ instead of $(-6,-8)$ — ignores the sign reversal, treating the
  scalar as its magnitude alone.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 2, perceptual intuition)**: the MAGNITUDE of the scalar (how much the arrow
  stretches) is the perceptually salient part of "scaling," while the sign — which determines
  direction, not size — is visually easy to discard as a decoration on the number rather than a
  genuine part of the multiplication.
- **Repair**: contrast $2(3,4)=(6,8)$ against $-2(3,4)=(-6,-8)$ directly, side by side, showing the
  sign carries into every component exactly as the magnitude does.

## Misconceptions

### MC-1: SCALAR-ADDS-TO-COMPONENTS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SCALAR-MULTIPLIED-ONCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: NEGATIVE-SCALAR-MAGNIFIES
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Photocopier zoom: setting 200% stretches every part of the image equally, not just one
  corner — and 'negative zoom' would be a mirror flip of the whole image, not a partial one."**
- **Anti-analogy**: scalar multiplication is NOT the same operation as vector addition — the
  scalar $c$ is a single number applied by MULTIPLICATION to every component, never added to any
  component.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute $5(1,3)$ step by step as $5\times1$ and $5\times3$,
  contrasting explicitly against the incorrect $1+5$ and $3+5$.
- **Demonstration 2 (targets MC-2)**: compute $3(4,2,7)$ and count exactly three multiplications
  performed, contrasting against a result that leaves two of the three components unchanged.
- **Demonstration 3 (targets MC-3)**: compute $2(3,4)=(6,8)$ and $-2(3,4)=(-6,-8)$ side by side,
  showing the negative sign flips BOTH components, not just the overall "size."

## Discovery Questions
1. "Does $c\mathbf v$ mean 'add $c$ to each entry' or 'multiply each entry by $c$'?"
2. "If a vector has three components, how many separate multiplications does scaling it by $c$
   require?"
3. "Does multiplying a vector by $-2$ change only its length, or does it also change something
   else?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector`'s own component structure, framing scalar
   multiplication as the second fundamental operation on that structure.
2. **Conflict evidence**: the addend-versus-multiplier contrast, breaking MC-1's confusion with
   vector addition directly.
3. **Contrast pair**: positive versus negative scalars applied to the identical vector, isolating
   the sign's role from the magnitude's role.
4. **Mastery gate**: require computing $c\mathbf v$ for positive, negative, and fractional
   scalars, and correctly applying the special scalars $0$, $1$, $-1$, at the Blueprint's own
   stated pass criterion of 5/5.

## Tutor Actions
- Never accept a scalar-multiplication result without requiring the learner to state the
  operation performed on EACH component individually.
- When a negative scalar is involved, require the learner to state explicitly whether the sign
  was carried into every component before accepting the final answer.

## Voice Teaching Notes
- Say "multiply, don't add" whenever a learner's scalar-multiplication result matches an addition
  pattern instead.
- When a learner drops a negative sign partway through, ask "did that sign carry into every
  component, or only some?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $c\mathbf v$ for a positive integer scalar
  and states the resulting dimension.
- **Rung 2 (application)**: learner correctly computes $c\mathbf v$ for negative and fractional
  scalars, correctly carrying the sign into every component.
- **Rung 3 (transfer)**: learner correctly applies the special scalars $0$, $1$, $-1$ and
  transfers the operation to a novel context (e.g. physical velocity scaling).

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the explicit multiplication-versus-addition contrast for the specific
  scalar and vector in question.
- If MC-2 recurs, re-count the required multiplications for the specific vector's dimension.
- If MC-3 recurs, re-run the positive-versus-negative side-by-side contrast.

## Memory Hooks
- "Multiply, every component — never add."
- "One scalar, as many multiplications as there are components."
- "The sign flips direction; the size scales length — both apply everywhere, every time."

## Transfer Connections
- `math.linalg.vector` (already authored, this campaign): supplies the ordered-tuple structure
  scalar multiplication operates on component-wise.
- `math.linalg.vector-addition` (authored this same batch): the special scalar $-1$ produces
  exactly the additive inverse that concept's own subtraction rule relies on
  ($\mathbf a-\mathbf b=\mathbf a+(-1)\mathbf b$).

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.scalar-multiplication.md`, reused by
  reference for its arrow-scaling analogy, its worked-example pair (negative scalar in 3D,
  fractional scalar), and its three-misconception registry (birth types independently classified,
  since this Blueprint states priority and a root-cause narrative but not the Type 1-6 taxonomy).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (physical
  velocity scaling — tripling speed, reversing direction, and finding the scalar that brings an
  object to rest).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `vector`, unlocks
  none, cross_links none, developing/apply, mastery_threshold 0.95, estimated_hours 1) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 72): authored. Unblocked by `math.linalg.vector` (Batch 71). Companion batch
  concepts: `math.linalg.vector-addition`, `math.linalg.dot-product`, `math.linalg.matrix`.
  `math.linalg` moves toward **5/61** this batch.

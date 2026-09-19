# math.linalg.linear-map

## Identity
- **KG id**: `math.linalg.linear-map`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector-space`, `math.linalg.matrix`
- **Unlocks**: `math.linalg.kernel-image`, `math.linalg.matrix-representation`
- **Cross-links**: `math.abst.group-homomorphism`, `math.fnal.bounded-operator` (both not yet
  authored — verified via `ls`; independence mode used, see Blueprint References)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Define a LINEAR MAP $T:V\to W$ as a function satisfying ADDITIVITY ($T(u+v)=T(u)+T(v)$) and
HOMOGENEITY ($T(cv)=cT(v)$), verifying both directly rather than assuming any previously-studied
transformation qualifies; explain and apply that a linear map is COMPLETELY DETERMINED BY ITS
ACTION ON A BASIS; and connect linear maps between finite-dimensional spaces to their MATRIX
representation, recognizing rotation/reflection/dilation as concrete linear-map instances while
translation is the one exception that fails.

## Core Understanding
A LINEAR MAP MUST SATISFY BOTH PROPERTIES, VERIFIED DIRECTLY — NEVER ASSUMED FROM APPEARANCE: a
function $T:V\to W$ is linear exactly when $T(u+v)=T(u)+T(v)$ (additivity) and $T(cv)=cT(v)$
(homogeneity) hold for ALL $u,v\in V$ and ALL scalars $c$. A necessary consequence follows
immediately: $T(0)=T(0\cdot v)=0\cdot T(v)=0$ — any map sending the origin elsewhere cannot be
linear. This immediately disqualifies translation, $S(x,y)=(x+1,y)$: $S(0,0)=(1,0)\ne(0,0)$, so
despite being one of the four familiar geometric transformation types, translation is NEVER a
linear map — the other three (rotation, reflection, dilation, all centered at the origin) pass
both properties directly and ARE linear.

A LINEAR MAP IS COMPLETELY PINNED DOWN BY ITS BASIS IMAGES — NO FREEDOM REMAINS ELSEWHERE: if
$e_1,\dots,e_n$ is a basis for $V$, every $v\in V$ writes uniquely as $v=c_1e_1+\cdots+c_ne_n$, so
by linearity $T(v)=c_1T(e_1)+\cdots+c_nT(e_n)$. Once $T(e_1),\dots,T(e_n)$ are known, $T(v)$ is
FORCED for every $v\in V$ — there is no remaining freedom to independently specify $T$ at any
other point; any claimed extra rule inconsistent with the basis-forced value cannot describe a
genuine linear map.

MATRIX REPRESENTATION IS THE SAME CALCULATION, DIFFERENTLY NOTATED: for finite-dimensional $V,W$
with chosen bases, $T$ is represented by the matrix $A$ whose $j$-th column is $T(e_j)$'s
coordinate vector; applying $T$ becomes ordinary matrix-vector multiplication $Av$. Computing
$T(v)$ via basis decomposition and computing $Av$ directly are literally the same arithmetic,
just notated differently — this is exactly why rotation by $\theta$ has matrix
$\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$.

## Mental Models
- **"A linear map's values away from its basis are never free choices — the basis images force
  every other value."**
- **"Test homogeneity with a scalar that could actually break it — never just $c=1$ or $c=0$."**

## Why Students Fail

### MC-1: ALL-TRANSFORMATIONS-ASSUMED-LINEAR
- **Surface form**: assumes any previously-studied geometric transformation, including
  translation, is automatically a linear map without checking the two defining properties (or the
  necessary $T(0)=0$ consequence).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  rotation, reflection, and dilation were all linear, so translation looks like it should follow
  the same pattern by resemblance alone).
- **Repair**: re-test $S(0,0)$ directly against the necessary $T(0)=0$ consequence.

### MC-2: BASIS-DETERMINATION-NOT-ENFORCED
- **Surface form**: believes a linear map's values away from a chosen basis can be independently
  or arbitrarily specified, rather than being fully forced once the basis images are fixed.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — a
  function is normally free to take any value anywhere, so the basis-forcing constraint feels like
  an unusual restriction unless directly derived).
- **Repair**: re-derive the forced value directly from the basis decomposition and linearity,
  exposing the contradiction against any inconsistent extra claim.

### MC-3: HOMOGENEITY-CHECKED-WITH-UNIT-SCALAR-ONLY
- **Surface form**: verifies $T(cv)=cT(v)$ only for $c=1$ (or other trivial scalars) and concludes
  homogeneity holds generally.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity — a
  quick sanity check with $c=1$ is trivially true for every function, masking genuine failures
  that only appear at other scalars).
- **Repair**: re-anchor on testing with a genuinely distinguishing scalar, such as $c=-2$ or
  $c=\tfrac12$.

## Misconceptions

### MC-1: ALL-TRANSFORMATIONS-ASSUMED-LINEAR
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: BASIS-DETERMINATION-NOT-ENFORCED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: HOMOGENEITY-CHECKED-WITH-UNIT-SCALAR-ONLY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A linear map's basis images are like the first few dominoes — once they fall in a specific
  pattern, every other domino's position is already determined, not a free choice."**
- **Anti-analogy**: translation LOOKS like a simple, well-behaved geometric transformation, but is
  NEVER a linear map — resemblance to already-known linear examples is not a valid test.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $T(x,y)=(2x+y,x-y)$ passes both additivity and homogeneity
  directly (verified term-by-term), while $S(x,y)=(x+1,y)$ fails immediately since
  $S(0,0)=(1,0)\ne(0,0)$ — a direct, checkable disqualification, not merely "translation feels
  different."
- **Demonstration 2 (targets MC-2)**: given $T(1,0)=(3,1)$, $T(0,1)=(-2,4)$, a claimed additional
  rule "$T(1,1)=(0,0)$" is inconsistent — linearity already FORCES $T(1,1)=T(e_1)+T(e_2)=(3,1)+
  (-2,4)=(1,5)\ne(0,0)$, so the claimed extra rule cannot describe a genuine linear map.
- **Demonstration 3 (targets MC-3)**: for $T(x,y)=(2x+y,x-y)$, checking homogeneity only at
  $c=1$ (trivially $T(v)=T(v)$) or $c=0$ (trivially $T(0)=0$) proves nothing; checking at $c=-2$
  genuinely distinguishes: $T(-2x,-2y)=(2(-2x)+(-2y),(-2x)-(-2y))=(-4x-2y,-2x+2y)=-2(2x+y,x-y)=
  -2T(x,y)$ — confirmed only by testing a scalar capable of exposing failure.

## Discovery Questions
1. "Is translation — one of our four geometric transformations — a linear map?"
2. "Can a linear map's value away from its basis images be chosen independently, or is it already
   forced?"
3. "Does checking homogeneity only at $c=1$ actually confirm the property holds for every
   scalar?"

## Teaching Sequence
1. **Anchor**: connect to the already-studied rotation/reflection/dilation coordinate rules,
   framing additivity and homogeneity as the general test those transformations already satisfy.
2. **Conflict evidence**: Demonstration 1's translation failure, isolating MC-1 by requiring the
   $T(0)=0$ consequence be checked explicitly rather than assumed from resemblance.
3. **Contrast pair**: Demonstration 2's forced-value contradiction, isolating MC-2 by showing
   basis images leave no remaining freedom.
4. **Representation shift**: Demonstration 3's scalar-choice contrast, isolating MC-3 by exposing
   why trivial scalars mask genuine failures.
5. **Mastery gate**: require a correct linearity verification for a new map, a correct
   basis-determined value computation, and a correct matrix representation, at the Blueprint's own
   stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a transformation as linear on resemblance to prior examples alone — require both
  properties (or the $T(0)=0$ consequence) checked explicitly.
- Never accept a homogeneity check performed only at $c=1$ or $c=0$ as sufficient.

## Voice Teaching Notes
- Say "does this actually pass both properties, or does it just look like the others we've seen?"
  whenever a new candidate transformation is proposed.
- When homogeneity is checked, ask "would that scalar choice actually catch a failure if there
  were one?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies whether a given map is linear, checking
  both properties (or the $T(0)=0$ shortcut) explicitly.
- **Rung 2 (application)**: learner correctly computes $T(v)$ for a new vector from basis images
  alone, and writes the corresponding matrix.
- **Rung 3 (transfer)**: learner correctly identifies an inconsistent claimed value against a
  linear map's basis-forced values, and explains why.

## Tutor Recovery Strategy
- If MC-1 recurs, re-test the candidate map's behavior at the origin directly.
- If MC-2 recurs, re-derive the forced value from the basis decomposition directly.
- If MC-3 recurs, re-test homogeneity with a genuinely distinguishing scalar.

## Memory Hooks
- "Linear maps always send the origin to the origin — translation never does."
- "Basis images decide everything else — there's no room left to choose freely."
- "Test homogeneity with a scalar that could actually fail it, not just 1."

## Transfer Connections
- `math.linalg.vector-space` (already authored): supplies the vector addition and scalar
  multiplication structure a linear map must respect.
- `math.linalg.matrix` (already authored): supplies the matrix representation this concept
  connects linear maps to directly.
- `math.linalg.kernel-image` (not yet authored): the next concept, defining kernel and image
  directly in terms of this concept's structure.
- `math.linalg.matrix-representation` (not yet authored): the general basis-dependent
  matrix-representation theory, building on this concept's basis-determination fact.

## Cross-Subject Connections
- None formal — `math.abst.group-homomorphism` and `math.fnal.bounded-operator` are declared
  cross-links in the KG but neither is authored yet (confirmed via `ls`), so this entry uses
  independence mode per the established convention.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.linear-map.md`, reused by reference
  for its translation-failure disqualification, its forced-value basis contradiction, its
  scalar-choice homogeneity contrast, and its three-misconception registry (severity levels
  adopted directly as declared; birth types independently classified since this Blueprint states
  Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining an
  image-processing shear filter's linearity and computing a pixel's transformed position from
  basis images alone, cross-checked against direct matrix multiplication.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.vector-space`+`math.linalg.matrix`, unlocks `math.linalg.kernel-image`+
  `math.linalg.matrix-representation`, cross_links `math.abst.group-homomorphism`+
  `math.fnal.bounded-operator`, proficient/understand, mastery_threshold 0.85, estimated_hours 5)
  was directly verified against the live KG and matches exactly. The Blueprint's own
  correctly-declared independence P76 mode (both cross-link targets confirmed unauthored via
  `ls`) required no correction.

## Version History
- 2026-09-18 (Batch 94): authored. Second entry this batch. Companion batch concept:
  `math.abst.galois-group`. `math.linalg` moves 32/61 → **33/61** this batch.

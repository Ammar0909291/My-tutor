# math.linalg.vector

## Identity
- **KG id**: `math.linalg.vector`
- **Domain**: math.linalg
- **Requires**: `math.found.real-numbers`, `math.geom.x-y-coordinates`
- **Unlocks**: `math.linalg.vector-space`, `math.linalg.dot-product`
- **Cross-links**: `math.geom.vectors-2d`, `math.geom.vectors-3d`
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define a vector in $\mathbb R^n$ as an ordered $n$-tuple of real numbers, reusing
`math.found.real-numbers`'s own field of components and `math.geom.x-y-coordinates`'s ordered-pair
notation; distinguish the vector's TWO coexisting interpretations — geometric (a displacement
arrow, anchored to no fixed point) and algebraic (a list of components) — from a fixed geometric
POINT that shares the same notation; assert vector equality by component-wise comparison, with
order treated as part of the definition; and identify the zero vector as the unique vector with
every component zero.

## Core Understanding
A vector in $\mathbb R^n$ is an ORDERED $n$-tuple of real numbers $(v_1,v_2,\ldots,v_n)$, with
each component $v_i\in\mathbb R$ (directly reusing `math.found.real-numbers`'s complete ordered
field as the coefficient domain). Two interpretations of the same object coexist without
conflict: GEOMETRICALLY, a vector is an arrow with magnitude and direction, anchored to no fixed
point — the identical displacement $(3,4)$ applied starting at $(0,0)$ ends at $(3,4)$, but
applied starting at $(1,2)$ ends at $(4,6)$; ALGEBRAICALLY, a vector is simply an element of
$\mathbb R^n$, a list of components. The ordered-tuple definition unifies both readings.

This is the single most consequential distinction in the entire concept: a geometric POINT
$(3,4)$ names a unique, fixed LOCATION — there is exactly one such point in the plane, reusing
`math.geom.x-y-coordinates`'s own ordered-pair notation for signed distances along each axis. A
vector $(3,4)$ names a DISPLACEMENT — move 3 right, 4 up — that carries no fixed home and can be
applied starting from any location. The notation is IDENTICAL; the objects are fundamentally
different.

Two vectors are EQUAL if and only if all corresponding components are equal:
$\mathbf u=\mathbf v$ iff $u_i=v_i$ for every index $i$. Order is not an incidental detail of the
notation — it is part of the definition itself: $(3,4)$ and $(4,3)$ are different vectors,
pointing in genuinely different directions, precisely because the FIRST component always measures
one axis and the SECOND always measures another. The zero vector $\mathbf 0=(0,0,\ldots,0)$ is the
unique vector with every component zero.

Magnitude — the length of the arrow — is a NUMBER derived FROM a vector, computed as
$\|\mathbf v\|=\sqrt{v_1^2+v_2^2+\cdots+v_n^2}$; it is not the vector itself, and many distinct
vectors (pointing in entirely different directions) can share the identical magnitude. Discarding
direction and reporting only the magnitude discards exactly half of what a vector carries.

## Mental Models
- **"Same notation, different objects: a POINT is a fixed location — there is exactly one. A
  VECTOR is a displacement — it can be placed starting anywhere, and what matters is direction and
  length, never a starting point."**
- **"Order is part of the definition — $(3,4)$ and $(4,3)$ are not a re-listing of the same
  information, they are two vectors pointing in two different directions."**
- **"Magnitude is one number PULLED OUT of a vector — many different vectors, pointing every
  which way, can share the exact same magnitude."**

## Why Students Fail

### MC-1: VECTOR-IS-POINT
- **Surface form**: treating vector $(3,4)$ as identical to the geometric point $(3,4)$ at a fixed
  location.
- **Frequency band**: Foundational (Blueprint's own declared priority).
- **Root cause (Type 4, notation-induced)**: ordered pairs are used identically for both
  coordinates (a fixed location) and vectors (a displacement), and this shared notation actively
  leads to conflating the two — nothing in the symbol $(3,4)$ itself signals which reading is
  intended.
- **Repair**: contrast the fixed point (exactly one location, cannot be placed anywhere else)
  against the displacement vector (the identical arrow ends at genuinely different points
  depending on where it starts — e.g. $(2,-1)$ starting at $(5,3)$ ends at $(7,2)$, but starting
  at $(-1,7)$ ends at $(1,6)$), making the "can this be placed somewhere other than the origin?"
  question the deciding test.

### MC-2: VECTOR-ORDER-FREE
- **Surface form**: claiming $(3,4)$ and $(4,3)$ are the same vector.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 6, analogy overextension)**: the vector's tuple notation superficially
  resembles a SET's listing of elements, and a set's genuine order-independence ($\{3,4\}=\{4,3\}$)
  is overextended onto the vector, ignoring that "ordered" is explicitly part of the tuple's own
  definition — position, not membership, is what a tuple's notation encodes.
- **Repair**: trace both arrows from the origin explicitly — $(3,4)$ ends at $(3,4)$, $(4,3)$ ends
  at $(4,3)$ — showing the two genuinely different destinations that the reordering produces.

### MC-3: VECTOR-IS-MAGNITUDE
- **Surface form**: saying "the vector is $\sqrt5$" when asked about $(1,2)$, conflating the
  vector with its scalar length.
- **Frequency band**: Secondary (Blueprint's own declared priority).
- **Root cause (Type 5, instruction-induced)**: magnitude is computed so frequently in early
  practice that the computation itself becomes the salient "answer" a learner reaches for, and the
  directional information the vector also carries gets discarded as a byproduct of that repeated
  drill.
- **Repair**: require the learner to produce a SECOND, genuinely different vector sharing the
  identical magnitude (e.g. two distinct vectors both with magnitude 5, like $(3,4)$ and $(4,3)$,
  or $(5,0)$ and $(0,5)$) — an impossible task if the vector really were nothing but its magnitude.

## Misconceptions

### MC-1: VECTOR-IS-POINT
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: VECTOR-ORDER-FREE
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-3: VECTOR-IS-MAGNITUDE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Walking directions: 'go 3 blocks east and 4 blocks north' is a displacement, not a
  destination — the same instruction takes you somewhere different depending on where you start
  following it."**
- **Anti-analogy**: a vector is NOT a set of its components — $\{3,4\}$ genuinely equals $\{4,3\}$,
  but the vector $(3,4)$ does not equal the vector $(4,3)$; position in the tuple, not membership,
  is what carries the meaning.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: apply the identical displacement $(2,-1)$ starting from two
  different points, $(5,3)$ and $(-1,7)$, showing the two genuinely different endpoints
  $(7,2)$ and $(1,6)$ — the vector itself never changed, only where it was applied.
- **Demonstration 2 (targets MC-2)**: plot $(3,4)$ and $(4,3)$ from the same origin, showing the
  two arrows land at two different points, pointing in two different directions.
- **Demonstration 3 (targets MC-3)**: produce two distinct vectors sharing the identical magnitude
  $\sqrt5$ — e.g. $(1,2)$ and $(2,1)$, or $(1,2)$ and $(-1,-2)$ — demonstrating that magnitude
  alone cannot recover which vector was intended.

## Discovery Questions
1. "If I hand you the instruction '(3, 4)' with no starting point given, does that uniquely
   determine a single spot on the map, or could it end up in many different places?"
2. "Do $(3,4)$ and $(4,3)$ point in the same direction, or genuinely different directions?"
3. "If two arrows have the exact same length but point in opposite directions, are they the same
   vector?"

## Teaching Sequence
1. **Anchor**: connect to `math.geom.x-y-coordinates`'s ordered-pair notation, framing the vector
   as the SAME notation reused for a fundamentally different kind of object (displacement, not
   location).
2. **Conflict evidence**: the identical displacement applied from two different starting points,
   breaking MC-1's point/vector conflation directly.
3. **Contrast pair**: $(3,4)$ versus $(4,3)$ (different vectors, different destinations) and a
   vector versus its own magnitude (one number cannot recover the direction it discarded).
4. **Mastery gate**: require reading/writing a vector as an ordered tuple, asserting equality by
   components, computing magnitude while distinguishing it from the vector itself, and previewing
   component-wise vector addition in a 2D geometric context, at the Blueprint's own stated pass
   criterion of 5/5.

## Tutor Actions
- Never accept a vector answer that names only a fixed endpoint without confirming the learner
  understands the SAME displacement would land elsewhere from a different start.
- When a learner reorders a vector's components, require them to state explicitly whether the two
  orderings point in the same direction or different directions before accepting the answer.

## Voice Teaching Notes
- Say "can this arrow start anywhere else?" whenever a learner treats a vector as a fixed
  location — a vector answers yes, a point answers no.
- When a learner reports only a magnitude, ask "which direction is it pointing?" to surface
  whether the directional half of the vector has been discarded.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly reads a vector's components, states its dimension,
  and identifies the zero vector in the same space.
- **Rung 2 (application)**: learner correctly distinguishes a vector from a fixed point by testing
  whether the same displacement can be applied from different starting locations, and correctly
  asserts or denies vector equality by comparing components in order.
- **Rung 3 (transfer)**: learner correctly reasons about a vector's geometric arrow interpretation
  (quadrant, magnitude) and previews component-wise vector addition in a 2D geometric context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the same-displacement-different-start-point demonstration.
- If MC-2 recurs, re-plot both orderings from the origin and compare destinations directly.
- If MC-3 recurs, require production of a second, genuinely distinct vector sharing the identical
  magnitude.

## Memory Hooks
- "Same notation, different objects — a point is one place, a vector is a movement that can start
  anywhere."
- "Order is the definition — $(3,4)$ and $(4,3)$ are different vectors, not a re-listing."
- "Magnitude is a number PULLED OUT of a vector — it can't tell you which vector it came from."

## Transfer Connections
- `math.found.real-numbers` (already authored, CERTIFIED domain): supplies the ordered field
  $\mathbb R$ each vector's components are drawn from.
- `math.geom.x-y-coordinates` (already authored, CERTIFIED domain): supplies the ordered-pair
  notation this concept reuses, then reframes for displacement rather than location.
- `math.geom.vectors-2d`/`math.geom.vectors-3d` (both already authored, CERTIFIED domain,
  Tier 1 cross-links): substantively incorporated, not merely flagged — this entry's own
  Assessment Signals rung 3 directly previews the geometric arrow interpretation (quadrant,
  magnitude, tip-to-tail addition) those entries develop in full, matching the Blueprint's own
  P76 cross-link probe design.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.vector.md`, reused by reference for
  its displacement-arrow analogy, its three-representation shift (arrow/tuple/column), its
  point-vs-vector contrast table, and its three-misconception registry (birth types independently
  classified, since this Blueprint states priority/root-cause narrative but not the Type 1-6
  taxonomy).
- Transfer probe cited by reference: the Blueprint's own cross-link probe against
  `math.geom.vectors-2d` (Tier 1) — quadrant identification, magnitude computation, and a
  component-wise vector-addition preview for $\mathbf u=(-2,3)$, $\mathbf v=(5,1)$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires, unlocks
  `math.linalg.vector-space`+`math.linalg.dot-product`, cross_links
  `math.geom.vectors-2d`+`math.geom.vectors-3d`, developing/understand, mastery_threshold 0.9,
  estimated_hours 3) was directly verified against the live KG and matches exactly.
- **Genuine tracking correction found while starting this batch**: several prior CLAUDE.md/
  ROADMAP.md/COVERAGE.md notes described math.linalg as "0/16, entirely unstarted." Direct
  verification via `scripts/math/state.ts` shows math.linalg is actually **61 KG concepts**, not
  16 — a stale figure carried forward across multiple batches without being re-checked against
  the live KG. Corrected in this batch's own tracking updates.
- **This concept OPENS the math.linalg domain (0/61 → 1/61)** and is the entry node this program's
  own convergent-frontier check identified as the shared path back into all three simultaneously
  PARKED domains (math.disc's `graph-representation`, math.calc's `change-of-variables`, and two
  of math.graph's final three concepts).

## Version History
- 2026-09-13 (Batch 71): authored. Entry node — no math.linalg prerequisite. Requires
  `math.found.real-numbers`+`math.geom.x-y-coordinates`, both already authored (CERTIFIED
  domains). `math.linalg` opens **0/61 → 1/61** (corrected from the stale "0/16" figure carried
  in prior tracking notes). This is the highest-leverage remaining concept in mathematics:
  authoring it is the single step that reopens math.disc, math.calc, and math.graph, all three
  simultaneously PARKED as of Batch 70.

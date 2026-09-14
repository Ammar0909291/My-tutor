# math.opt.convex-set

## Identity
- **KG id**: `math.opt.convex-set`
- **Domain**: math.opt
- **Requires**: `math.linalg.vector`
- **Unlocks**: `math.opt.convex-optimization`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Given a subset $S$ of $\mathbb{R}^n$, apply the line-segment criterion (for all $x,y\in S$ and
$t\in[0,1]$, $tx+(1-t)y\in S$), reusing `math.linalg.vector`'s own component structure directly, to
classify $S$ as convex or non-convex; identify canonical convex sets (balls, half-spaces,
hyperplanes, polyhedra, cones); explain why convexity is closed under intersection and affine maps
but NOT union; and distinguish convex from non-convex regions by counterexample.

## Core Understanding
A set $S$ is CONVEX if, for ANY two points $x,y\in S$ and EVERY $t\in[0,1]$, the point
$tx+(1-t)y$ — the LINE SEGMENT connecting $x$ and $y$ — lies entirely within $S$. This is a
purely GEOMETRIC condition (any two points in the set can be connected by a segment lying
entirely within the set), equivalently stated ALGEBRAICALLY via `math.linalg.vector`'s own
component arithmetic. Convexity is about the interior CONTENT of the set, never about the
smoothness of its boundary — a square with sharp corners is just as convex as a smooth disk,
since the line-segment test never examines boundary curvature.

Canonical convex sets include balls (disks), half-spaces, hyperplanes, polyhedra, and cones.
CONVEXITY-PRESERVING OPERATIONS: the INTERSECTION of convex sets is ALWAYS convex (if $x,y$ are
in every set of the intersection, the segment between them stays in every set, hence in the
intersection); an AFFINE IMAGE of a convex set is convex; a Cartesian PRODUCT of convex sets is
convex. Critically, the UNION of convex sets is NOT convex in general — two disjoint convex
"blobs" joined together generically have a gap between them that the connecting segment crosses.

The FULL condition requires checking EVERY $t\in[0,1]$, not merely the midpoint $t=1/2$ — a
star-shaped set can have every midpoint of nearby tips landing inside it while a segment at some
other $t$ exits through a concave notch, so a midpoint-only check is insufficient.

## Mental Models
- **"Convex: any two points, the WHOLE segment between them stays inside."**
- **"Convexity is about content, not boundary smoothness — corners don't disqualify a set."**
- **"Intersection preserves convexity; union does not."**

## Why Students Fail

### MC-1: CONVEX-MEANS-SMOOTH
- **Surface form**: conflates convexity with smoothness of the boundary; believes a square (with
  corners) is not convex.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared birth type). Smooth curved
  boundaries visually suggest "convex-looking" shapes, and that visual association is mistaken for
  the actual mathematical definition, which never examines boundary smoothness at all.
- **Repair**: apply the algebraic line-segment condition directly to the square's corners,
  confirming the segment stays in $[0,1]^2$ for every $t$.

### MC-2: CONVEX-UNION-CLOSED
- **Surface form**: believes the union of two convex sets is convex, confusing it with the
  intersection rule.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). Since
  intersection is closed under convexity, that closure property "feels" symmetric and is
  overgeneralized to union as well, when in fact the two set operations behave oppositely here.
- **Repair**: construct two disjoint disks, both convex, and show their midpoint segment exits the
  union entirely — non-convex.

### MC-3: MIDPOINT-SUFFICIENT
- **Surface form**: checks only the midpoint $t=1/2$ rather than all $t\in[0,1]$, concluding a
  star-shaped set is convex because all midpoints appear inside.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — the word
  "middle" collapses the full range of $t$ down to just $t=1/2$ in casual reasoning).
- **Repair**: re-state the full requirement explicitly — verify $tx+(1-t)y\in S$ for EVERY $t$ in
  $[0,1]$, not just the midpoint, and locate the specific $t$ where a star polygon's segment exits.

## Misconceptions

### MC-1: CONVEX-MEANS-SMOOTH
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-2: CONVEX-UNION-CLOSED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: MIDPOINT-SUFFICIENT
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A rubber band stretched taut between any two points inside a shape: if it always stays inside
  no matter which two points you pick, the shape is convex — corners don't stop a straight rubber
  band from staying inside."**
- **Anti-analogy**: convexity is NOT "the union of nice pieces stays nice" — two perfectly convex
  pieces, joined together with a gap between them, generally form a non-convex union.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: apply the line-segment test to a square's corners $(0,0)$ and
  $(1,1)$, confirming the segment $t(0,0)+(1-t)(1,1)$ stays in $[0,1]^2$ for every $t\in[0,1]$.
- **Demonstration 2 (targets MC-2)**: for two disjoint disks, take one point from each, and show
  their midpoint falls outside both — the union is not convex, even though each disk individually
  is.
- **Demonstration 3 (targets MC-3)**: for a star polygon, show two tips whose midpoint appears
  inside but whose segment at some other $t$ exits through a concave notch.

## Discovery Questions
1. "Does a shape with sharp corners, like a square, disqualify it from being convex?"
2. "If two sets are each convex, is their union automatically convex too?"
3. "Is it enough to check just the midpoint between two points to confirm a set is convex?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector`'s own component structure, framing the line-segment
   condition as a direct algebraic test on vectors.
2. **Conflict evidence**: the disjoint-disks union counterexample, breaking MC-2 directly.
3. **Contrast pair**: the square's corners against a smooth disk, both passing the line-segment
   test, isolating MC-1.
4. **Mastery gate**: require a correct convexity classification via the line-segment test, a
   correct identification of which operations preserve convexity, and a transfer proof under
   novel conditions, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "not convex" solely because a set has visible corners — require the line-segment
  test to be applied.
- When two convex sets are combined, require the learner to specify whether intersection or union
  is being used before concluding convexity.

## Voice Teaching Notes
- Say "does having corners actually violate the line-segment test?" whenever boundary smoothness
  is used as a convexity criterion.
- When a union of convex sets arises, ask "is that guaranteed to stay convex, or does it depend?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the line-segment criterion to classify a
  given set as convex or non-convex.
- **Rung 2 (application)**: learner correctly identifies which of intersection, union, and affine
  image preserve convexity.
- **Rung 3 (transfer)**: learner correctly proves, in a novel context, that a convex polytope
  (intersection of half-spaces) is convex, using the intersection-preservation property.

## Tutor Recovery Strategy
- If MC-1 recurs, re-apply the line-segment test to the specific corner case in question.
- If MC-2 recurs, re-construct the specific disjoint-set counterexample for the case in question.
- If MC-3 recurs, re-locate the specific failing $t$-value for the case in question.

## Memory Hooks
- "Any two points, the WHOLE segment, every $t$ — that's convex."
- "Corners don't disqualify — only the segment test matters."
- "Intersection stays convex. Union doesn't."

## Transfer Connections
- `math.linalg.vector` (already authored, this campaign): supplies the component structure the
  line-segment condition is stated over directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.convex-set.md`, reused by reference for
  its representation-shift gallery, its convexity-preserving-operations pattern table, its
  contrast-pair demonstrations, and its three-misconception registry (birth types EXPLICITLY given
  by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (the epigraph
  duality between convex functions and convex sets in $\mathbb{R}^{n+1}$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.linalg.vector`,
  unlocks `math.opt.convex-optimization`, cross_links none, proficient/understand,
  mastery_threshold 0.9, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-13 (Batch 80): authored. First entry in a newly-opened domain — `math.opt` (16 KG
  concepts), selected after `math.linalg` reached 0 topologically-ready candidates (its remaining
  chain blocked on unauthored `math.abst.field`, a deep multi-level cross-domain prerequisite, not
  a small bounded excursion). Companion batch concepts: `math.opt.convex-function`,
  `math.opt.unconstrained-optimization`. `math.opt` moves toward **3/16** this batch.

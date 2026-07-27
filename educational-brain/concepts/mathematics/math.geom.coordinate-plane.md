# math.geom.coordinate-plane

## Identity
- **KG ID**: `math.geom.coordinate-plane`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.plane`, `math.found.real-numbers`
- **Unlocks**: `math.geom.distance-formula`, `math.geom.midpoint-formula`, `math.geom.slope`, `math.geom.line-equation`
- **Cross-links**: `math.func.graph-of-function` (not Tier 1, not authored; P76_mode = independence per the Blueprint).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.90 (⌈0.90×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.geom.coordinate-plane.md` (reused by reference throughout this entry).

## Learning Objective
The student will correctly plot and read ordered pairs (x,y) with x (horizontal, signed) always stated and applied first and y (vertical, signed) second, correctly derive quadrant membership from the sign of each coordinate rather than by rote memorization, and recognize the origin as the center of an axis system extending infinitely in all directions, where negative coordinates are genuinely valid positions.

## Core Understanding
Per the Blueprint's Component 1: the Cartesian coordinate plane pairs every point in the plane with a unique ordered pair (x,y) by measuring signed horizontal distance (x) and signed vertical distance (y) from a fixed origin. Order matters — (3,−2) and (−2,3) are different points — and sign matters — (3,2) and (−3,2) are reflections across the y-axis. The plane divides into four quadrants, labeled I–IV counter-clockwise from the upper right, each with a fixed sign pattern (I: +,+; II: −,+; III: −,−; IV: +,−) that should be DERIVED from the axis directions (left of y-axis means x<0; above x-axis means y>0), not memorized as arbitrary labels. Points with x=0 lie on the y-axis; points with y=0 lie on the x-axis; neither case belongs to any quadrant. The formal definition: ℝ²={(x,y): x∈ℝ, y∈ℝ}, with each point corresponding to exactly one ordered pair and vice versa.

## Mental Models
1. **The GPS-navigation model** (Blueprint TA-A01, P03): longitude (east/west, x) is always stated before latitude (north/south, y) — the coordinate plane works the same way, x first (horizontal), y second (vertical).
2. **The derive-don't-memorize quadrant model** (Blueprint TA-A02, P27): quadrant sign patterns should be derived directly from "left of y-axis means x<0" and "above x-axis means y>0," not memorized as an arbitrary I/II/III/IV lookup table.
3. **The origin-as-center model** (Blueprint TA-B03, P64): unlike a ruler that starts at 0 on one end, the coordinate axes extend infinitely in BOTH directions from the origin, which sits at the CENTER — negative coordinates are genuinely valid positions, not errors.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is axis-swap — believing the first number in (x,y) is the vertical distance and the second is horizontal, plotting by moving up/down before left/right, reversing the correct convention. A second failure is quadrant-sign-error — memorizing quadrant numbers without linking them to the actual sign rules of the two axes, leading to errors like believing quadrant II has positive x. A third failure is treating the origin as a corner (like a ruler's zero-end or a page's top-left corner) rather than the center, leading students to believe negative coordinates are somehow invalid or "impossible."

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — AXIS-SWAP** (FOUNDATIONAL)
  - **Blueprint description**: believing the first number in (x,y) is vertical and the second horizontal, or plotting by moving up/down first — reversing the correct x-then-y convention.
  - **Birth type**: Type 3, language contamination — "coordinates" as a word carries no inherent ordering cue, and some students default to a "read top to bottom" instinct that conflicts with the established horizontal-first convention.
  - **Repair approach**: Blueprint Repair Action B-1 — the GPS mnemonic (longitude before latitude = x before y) plus explicit step-by-step plotting (move horizontally first, mark an intermediate point, then move vertically).

- **MC-2 — QUADRANT-SIGN-ERROR** (see Blueprint Component 2)
  - **Blueprint description**: memorizing quadrant numbers without connecting them to axis sign rules, e.g., believing quadrant II has positive x.
  - **Birth type**: Type 5, instruction-induced — quadrant labels are often taught as a static diagram to memorize rather than a rule to derive, leaving no fallback method when memory fails or a novel case arises.
  - **Repair approach**: Blueprint Repair Action B-2 — always deriving from axis directions (left of y-axis → x<0; below x-axis → y<0), verified across several worked classification examples.

- **MC-3 — ORIGIN-AS-CORNER** (see Blueprint Component 2)
  - **Blueprint description**: believing the origin sits in a corner (like a ruler's zero-end or a page's top-left corner) and that negative coordinates are somehow invalid.
  - **Birth type**: Type 6, analogy overextension — prior experience with rulers (starting at 0 on one end) and page/pixel coordinates (starting top-left) is over-applied to the coordinate plane, which genuinely extends in all four directions from a central origin.
  - **Repair approach**: Blueprint Repair Action B-3 — plotting points explicitly in all four quadrants on a full plane (both positive and negative regions shown), confirming each negative-coordinate point exists and is well-defined.

## Analogies
- **The GPS-navigation analogy** (Blueprint TA-A01, P03): GPS states longitude (east/west) before latitude (north/south); the coordinate plane's (x,y) convention mirrors this exactly, x (horizontal) always first.

## Demonstrations
- The correct-versus-swapped plotting contrast for the point (3,−2), showing the swapped procedure coincidentally lands on the same point here but would diverge for points like (3,5) (Blueprint TA-A01, P06), targeting MC-1.
- The quadrant sign-rule table derived directly from axis directions, rather than presented as a static lookup (Blueprint TA-A02, P11), targeting MC-2.
- The reflection-pattern induction: flipping x's sign mirrors across the y-axis, flipping y's sign mirrors across the x-axis, flipping both rotates 180° (Blueprint TA-A03, P04).

## Discovery Questions
1. "In the ordered pair (x,y), which direction do you move first — horizontal or vertical?"
2. "Is quadrant II's sign pattern something to memorize, or something you can derive from the axes?"
3. "Can a point have a negative x-coordinate? If so, where is it?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (concrete foundation — the address system, GPS analogy, x-then-y plotting) → TA-A02 (quadrant signs and reflections, derived from axis directions) → TA-A03 (abstract layer — ℝ² and coordinate reading, reflection patterns) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the GPS longitude-before-latitude framing for x-before-y (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the correct-versus-axis-swapped plotting contrast (Blueprint TA-A01, P06), targeting MC-1.
- **TELL: Explanation** — deriving quadrant signs directly from axis directions rather than memorizing a lookup table (Blueprint TA-A02), targeting MC-2.
- **DO: Worked Example** — plotting reflections across each axis and 180° rotation about the origin (Blueprint TA-A03), targeting MC-3.

## Voice Teaching Notes
When a student plots a point, ask "did you move horizontally first, or vertically first?" as a standing check directly targeting MC-1's axis-swap before any point is confirmed correct.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — `math.func.graph-of-function` not Tier 1)**: reused verbatim from the Blueprint's Component 4 TA-A04 — plotting y=x² from a table of values, describing the resulting parabola, and explaining the symmetric-point relationship using quadrant/axis/reflection vocabulary.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 4 TA-A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists under time pressure, require the student to narrate each plotting step aloud ("first I move ___ units ___, then ___ units ___") before marking any point, until the horizontal-then-vertical order becomes automatic even without narration.

## Memory Hooks
- "x before y, horizontal before vertical — just like longitude before latitude."
- "Derive quadrant signs from the axes — don't just memorize the diagram."
- "The origin is the center — axes go both ways, and negative coordinates are real positions."

## Transfer Connections
- `math.geom.distance-formula` (unlocks) computes distance directly from two ordered pairs' coordinates.
- `math.geom.slope` (unlocks) computes rise/run from signed coordinate differences, requiring correct x/y identification.
- `math.geom.line-equation` (unlocks) expresses lines algebraically using coordinate variables.
- `math.func.graph-of-function` (cross-link, not Tier 1): every function graph is a set of points plotted on this coordinate plane.

## Cross-Subject Connections
- Computer science: 2D graphics, screen coordinates, and game-object positioning all reuse this same ordered-pair addressing system (though screen coordinates commonly flip the y-axis direction, a notable point of contrast).

## Blueprint References
`docs/curriculum/blueprints/math.geom.coordinate-plane.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.func.graph-of-function` not Tier 1, independence mode) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 4 part 1.

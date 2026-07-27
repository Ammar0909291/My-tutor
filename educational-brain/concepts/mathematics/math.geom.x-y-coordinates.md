# math.geom.x-y-coordinates

## Identity
- **KG ID**: `math.geom.x-y-coordinates`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.coordinate-plane`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG (P76_mode = independence)
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.geom.x-y-coordinates.md` (reused by reference throughout this entry).

## Learning Objective
The student will read and plot any ordered pair (x, y) — including negative, zero, and fractional coordinates — as two independent signed distances (x horizontal from the y-axis, y vertical from the x-axis, both measured from the origin), and will state why (x, y) and (y, x) are generally different points.

## Core Understanding
Per the Blueprint's Component 1: the ordered pair (x, y) encodes a unique location in the coordinate plane as two independent signed distances. The x-coordinate comes first and is always horizontal (positive = right of the y-axis, negative = left); the y-coordinate comes second and is always vertical (positive = above the x-axis, negative = below). Plotting starts at the origin (0, 0) — never at a corner or edge of the visible grid — moving |x| units horizontally in the direction of x's sign, then |y| units vertically in the direction of y's sign. Order is a fixed notational contract: (3, 5) and (5, 3) are different points, and the sign is not optional extra information but the direction itself — (−3, 2) and (3, 2) are mirror images across the y-axis, not the same point.

## Mental Models
1. **The street-address model** (Blueprint TA-A01, P03): a coordinate pair is a city address — "blocks east-west, then floors up-down" from City Hall (the origin); the same instruction format applies everywhere, and east-west always comes first.
2. **The two-independent-dials model** (Blueprint TA-A02, P11): x and y are two separate measurements that never interact — one purely horizontal offset, one purely vertical — read or set independently in either direction (graph → coordinates or coordinates → graph).
3. **The fixed-contract model** (Blueprint TA-A03, P06): (x, y) order is alphabetical and directional — x before y, horizontal before vertical — a convention as fixed as reading left-to-right.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is reading or applying coordinates in (y, x) order, plotting (3, 5) at horizontal-5, vertical-3. A second failure treats coordinates as unsigned magnitudes, collapsing (−3, 2) and (3, 2) into one point. A third failure counts from a corner of the visible grid instead of from the origin, shifting every plotted point by a constant offset.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — COORDINATE-SWAP** (Foundational)
  - **Blueprint description**: plots (3, 5) at horizontal=5, vertical=3 — reads or applies coordinates in (y, x) order instead of (x, y).
  - **Birth type**: Type 4, notation-induced — the parenthesized pair gives no visual cue which slot is horizontal; nothing in the symbol "(3, 5)" itself marks the first number as the east-west one, so the assignment must be carried as a memorized convention that easily flips.
  - **Repair approach**: Blueprint Repair TA-B01 — the fixed-contract naming ("x always first, always horizontal") with the alphabetical-and-directional mnemonic, then re-plotting with the motion traced explicitly.

- **MC-2 — SIGN-IGNORED** (Secondary)
  - **Blueprint description**: treats (−3, 2) as equivalent to (3, 2); ignores the negative — coordinates handled as magnitudes only, sign not connected to direction.
  - **Birth type**: Type 1, overgeneralization — prior experience with counting and unsigned distances (where numbers only say "how far," never "which way") is over-applied to signed coordinates.
  - **Repair approach**: Blueprint Repair TA-B02 — plotting (−4, 1) and (4, 1) side by side as mirror images across the y-axis, re-anchoring "the sign IS the direction."

- **MC-3 — ORIGIN-MISSING** (Secondary)
  - **Blueprint description**: counts from a corner of the visible grid rather than from (0, 0); does not recognize the origin as the universal reference point.
  - **Birth type**: Type 2, perceptual intuition — the corner or edge of the drawn grid is the perceptually salient "starting place" (as on a ruler or a page), while the origin is just one more crossing point among many unless explicitly marked.
  - **Repair approach**: Blueprint Repair TA-B03 — explicitly marking the origin dot before every plot and drawing the arrow from origin to point, verifying the starting reference physically.

## Analogies
- **The city-grid address** (Blueprint TA-A01, P03): "(3, 5)" is "3 blocks east, 5 floors up" from City Hall — west and down are the negative directions, and the block count always comes before the floor count.

## Demonstrations
- Reading plotted points into coordinates and plotting coordinates back onto the grid across all four quadrants, including (−4, −1) in Quadrant III and (−2, 3) in Quadrant II (Blueprint TA-A02), targeting MC-1 and MC-2.
- The contrast table of (3, 5) vs (5, 3), (−2, 4) vs (2, 4), (0, 6) vs (6, 0), and (0, 0) itself (Blueprint TA-A03, P06), targeting all three misconceptions at once — order, sign, and the origin/axis special points.

## Discovery Questions
1. "Which address puts you 4 blocks east and 2 floors up: (4, 2) or (2, 4)? What does the other one describe instead?"
2. "Are (−4, 1) and (4, 1) the same point? If not, how are they related?"
3. "When you plot a point, where exactly do you start counting from — and how do you know?"

## Teaching Sequence
Follows the Blueprint's Protocol A exactly: TA-A01 (concrete address analogy with signed directions) → TA-A02 (representation shift, graph ↔ coordinates in both directions) → TA-A03 (contrast pairs for order, sign, and axis points) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — plotting from the origin with the motion narrated ("start at origin, 2 left, 3 up"), targeting MC-3 (Blueprint TA-A02).
- **TELL: Explanation** — the fixed (x, y) contract and the alphabetical-and-directional mnemonic, targeting MC-1 (Blueprint TA-B01's P64).
- **TEST-THINKING: Matching** — matching verbal descriptions ("3 left, 4 down") to ordered pairs and back, the bidirectional-translation diagnostic, targeting MC-1 and MC-2.
- **DO: Worked Example** — locating the four sign-variant points A=(3,4), B=(−3,4), C=(3,−4), D=(−3,−4) and describing the symmetry (Blueprint P77 item 4).

## Voice Teaching Notes
Before accepting any plotted point, ask "which number did you use for the horizontal move?" — a standing check that surfaces MC-1 instantly without marking the answer wrong. Per the Blueprint's Component 8, this is a bloom=remember concept: probes test stating, reading, and plotting, not deriving.

## Assessment Signals
- **P76 (transfer probe, independence mode — the KG lists no cross-links)**: reused verbatim from the Blueprint's TA-A04 — the leaning-ladder scenario mapping a physical floor/wall configuration onto axes, reading off (3, 0) and (0, 4) and estimating the midpoint.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (TA-A04), MAMR 5/5 — the 0.95 threshold makes this one of the strictest gates in the domain, appropriate for a pure-recall foundational convention.

## Tutor Recovery Strategy
If MC-1 persists after TA-B01, drop to the physical register: have the student trace the motion with a finger (or physically walk a floor grid, per the Blueprint's CPA note) saying "horizontal first" aloud on every plot, until the order is motor-anchored rather than memorized.

## Memory Hooks
- "x before y in the alphabet — horizontal before vertical in the address."
- "The sign is the direction: negative x is left, negative y is down."
- "Every count starts at the origin dot, never at the corner of the paper."

## Transfer Connections
- `math.geom.coordinate-plane` (requires) supplies the axis system, sign conventions, and quadrant definitions this concept's ordered pairs are read against.
- `math.geom.slope`, `math.geom.distance-formula`, and `math.geom.midpoint-formula` (siblings under the same prerequisite) all consume fluent (x, y) reading as their raw material — every Δx/Δy computation begins by unpacking two ordered pairs correctly.
- Function graphing (math.func domain) reuses (x, y) pairs as (input, output) records — the Blueprint's Day-30 spaced probe (y = 2x table → plotted pattern) previews exactly this transfer.

## Cross-Subject Connections
- Geography/computer science: map coordinates and screen coordinates both reuse the two-independent-signed-offsets idea (with computer-science screen coordinates famously flipping the y-direction — a useful later contrast, not introduced at this level).

## Blueprint References
`docs/curriculum/blueprints/math.geom.x-y-coordinates.md` — all teaching actions, checkpoint branches, repair scripts, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time. (The KG lists this node with empty `unlocks` even though sibling coordinate-geometry concepts clearly build on it — but those siblings correctly gate on the shared parent `math.geom.coordinate-plane` instead, so this is a deliberate granularity choice, not a defect.)

## Version History
- v1.0 (2026-07-27): Initial authoring, Domain Certification Mode, math.geom Wave 9.

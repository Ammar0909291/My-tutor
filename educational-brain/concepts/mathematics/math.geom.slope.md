# math.geom.slope

## Identity
- **KG ID**: `math.geom.slope`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.coordinate-plane`
- **Unlocks**: `math.geom.line-equation`
- **Cross-links**: `math.calc.derivative-intro` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.geom.slope.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute the slope m = (y₂−y₁)/(x₂−x₁) of a line from any two of its points, explain why every point pair on the same line yields the same slope, apply the parallel (equal slopes) and perpendicular (m₁·m₂ = −1) conditions correctly, and handle the horizontal (m = 0) and vertical (m undefined) special cases.

## Core Understanding
Per the Blueprint's Component 1: slope is the ratio of vertical change to horizontal change — rise over run, Δy/Δx — between any two points on a line. It is a property of the line itself, not of the particular point pair chosen: any two points on the same line produce the same ratio. Parallel lines share the same slope (same direction, never meeting); perpendicular lines have slopes that are negative reciprocals, verified definitively by the product test m₁ × m₂ = −1. Two special cases complete the picture: a horizontal line has Δy = 0 everywhere, so m = 0; a vertical line has Δx = 0, so the ratio is undefined (division by zero), not "zero" and not "infinite slope treated as a number." The slope of a secant line through two points of a curve is the discrete precursor to the derivative — as the two points approach each other, secant slope approaches tangent slope.

## Mental Models
1. **The staircase model** (Blueprint TA-A01, P03): a steep staircase has tall steps over short depth (large rise/run ratio); a gentle ramp has tiny rise over long run — slope is exactly that ratio, with a flat floor at m = 0 and a vertical wall undefined.
2. **The property-of-the-line model** (Blueprint TA-A01): slope is like a line's fixed "tilt setting" — measuring it between any two of its points reads off the same value, the way a ramp's steepness doesn't depend on where along it you measure.
3. **The flip-and-negate model** (Blueprint TA-A02, P07): the perpendicular slope is the negative reciprocal — write m as a fraction, flip it, negate it — always verified by the product test m₁·m₂ = −1.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is computing Δx/Δy instead of Δy/Δx — "difference over difference" memorized without anchoring which change goes on top. A second failure treats slope as a local measurement that depends on which point pair was chosen. A third failure conflates the parallel condition with the perpendicular one, claiming perpendicular lines also have equal slopes.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — DELTA-Y-OVER-DELTA-X-REVERSED** (Foundational)
  - **Blueprint description**: computes Δx/Δy instead of Δy/Δx — for (2,3) and (5,9), gets 3/6 = 1/2 instead of 6/3 = 2.
  - **Birth type**: Type 4, notation-induced — the formula's visually symmetric "difference over difference" shape gives no cue which difference belongs on top; without the spatial rise-over-run anchor, the two deltas are interchangeable symbols.
  - **Repair approach**: Blueprint Repair TA-B01 — re-anchoring on "vertical ÷ horizontal" via the staircase image (stair height sits above stair depth), then recomputing with the deltas labeled.

- **MC-2 — SLOPE-DEPENDS-ON-POINT-CHOICE** (High)
  - **Blueprint description**: believes different pairs of points on the same line give different slopes — treats slope like a local measurement.
  - **Birth type**: Type 1, overgeneralization — most measurements between two points (distance, midpoint) genuinely DO depend on which points are chosen; that correct pattern is over-applied to slope, whose ratio invariance on a line is the genuinely new fact.
  - **Repair approach**: Blueprint Repair TA-B01 — computing the same slope from two different point pairs on the same line (y = 2x−1 via (0,−1)/(4,7) and (2,3)/(5,9)), making the invariance an observed fact rather than an assertion.

- **MC-3 — PERPENDICULAR-SLOPES-EQUAL** (High)
  - **Blueprint description**: asked for the slope perpendicular to m = 3, answers 3 instead of −1/3 — conflates the parallel condition with the perpendicular one.
  - **Birth type**: Type 5, instruction-induced — the parallel rule ("special line pairs have equal slopes") is learned first and garbles into "related line pairs have equal slopes," absorbing the perpendicular case into the wrong rule.
  - **Repair approach**: Blueprint Repair TA-B02 — the direct contradiction ("if two perpendicular lines both had slope 3, they'd tilt identically — they'd be parallel"), then the flip-and-negate procedure verified by the product test.

## Analogies
- **The staircase/ramp** (Blueprint TA-A01, P03): steepness as height-per-step-depth, with the flat floor (m = 0) and vertical wall (undefined) as the natural limiting cases.
- **The secant-to-tangent limit** (Blueprint P76): slope as average rate of change over an interval, sliding toward instantaneous rate of change — the bridge to `math.calc.derivative-intro`.

## Demonstrations
- Computing m = 2 for (2,3)/(5,9), then confirming the same m = 2 from (0,−1)/(4,7) on the same line (Blueprint TA-A01), targeting MC-2.
- The parallel/perpendicular worked pair: parallel line keeps m = 2 verified from fresh points; perpendicular to m = 3 forced to −1/3 by the product test (Blueprint TA-A02, P07), targeting MC-3.
- The classification contrast table (equal slopes vs product −1, never-intersecting vs 90° meeting, including the horizontal↔vertical special-case pairing) and the "neither" case m₁ = 2, m₂ = 1/2 whose product is +1, not −1 (Blueprint TA-A03, P06).

## Discovery Questions
1. "For the points (−1, 4) and (3, 12): which difference goes on top of the slope fraction, and how do you know?"
2. "If you pick two different points on the same line, could you get a different slope? Why or why not?"
3. "Two perpendicular lines — do they have the same slope? What test settles it definitively?"

## Teaching Sequence
Follows the Blueprint's Protocol A exactly: TA-A01 (slope formula and invariance, from the staircase analogy) → TA-A02 (parallel and perpendicular slopes, worked example pair) → TA-A03 (contrast: parallel vs perpendicular vs neither) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the slope triangle drawn on the grid with rise and run color-coded before any formula (Blueprint CPA arc, pictorial entry).
- **DO: Worked Example** — the parallel/perpendicular pair with the product test computed explicitly (Blueprint TA-A02).
- **TEST-THINKING: Error Analysis** — presenting the reversed computation 3/6 = 1/2 and having the student locate which delta was misplaced, targeting MC-1.
- **TELL: Explanation** — why vertical lines have undefined (not zero, not "infinite-as-a-number") slope, targeting the special cases gated in P77 item 4.

## Voice Teaching Notes
Before accepting any slope computation, ask "which change did you put on top — the vertical or the horizontal?" as a standing MC-1 check. Per the Blueprint's Component 8, learners who see only the formula without the spatial intuition almost universally develop MC-1 — the staircase image must precede the symbols.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.calc.derivative-intro` per the Blueprint's Component 0 — Tier 1 cross-link)**: reused verbatim from the Blueprint's TA-A04 — the secant slope of f(x) = x² through (1,1) and (1+h, (1+h)²), simplified to 2+h, evaluated at shrinking h, and identified in the limit as the tangent slope/derivative.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (computation, perpendicular slope, invariance true/false, both special cases) plus P76 (TA-A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after TA-B01, require the student to draw the slope triangle and label its legs "rise" and "run" before writing any fraction, until the spatial anchor precedes the symbolic step automatically. If MC-3 recurs, enforce the product test m₁·m₂ = −1 as the mandatory verification on every perpendicular claim (per the Blueprint's Component 8 note that "flip and negate" alone misfires on m = 0 and undefined slopes).

## Memory Hooks
- "Rise over run — y over x — the stair height sits above the stair depth."
- "Slope belongs to the line, not to the points you happened to pick."
- "Parallel: same slope. Perpendicular: flip, negate, and check the product is −1."
- "Horizontal: m = 0. Vertical: undefined — you can't divide by zero."

## Transfer Connections
- `math.geom.line-equation` (unlocks) uses slope directly as the m in y = mx + b — this concept is its single load-bearing input.
- `math.geom.coordinate-plane` (requires) supplies the plotted point pairs the deltas are read from.
- `math.calc.derivative-intro` (cross-link, Blueprint exists, no EB entry) reframes slope as the h→0 limit of secant slopes — the P76 probe is this connection made concrete.
- `math.geom.parallel-lines` and `math.geom.perpendicular-lines` (already-authored EB siblings) supply the geometric meaning of the two slope conditions this concept expresses algebraically.

## Cross-Subject Connections
- Physics: slope of a position-time graph is velocity; of a velocity-time graph, acceleration — the Blueprint's Day-30 spaced probe ("connect slope to average velocity") makes the rate-of-change transfer explicit.

## Blueprint References
`docs/curriculum/blueprints/math.geom.slope.md` — all teaching actions, checkpoint branches, repair scripts, the P89 spaced-repetition schedule, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time. (Blueprint Component 0 lists estimated_hours 5 and mastery_threshold 0.90, matching the KG exactly; the cross-link `math.calc.derivative-intro` was correctly declared Tier 1 with a genuine cross-link probe.)

## Version History
- v1.0 (2026-07-27): Initial authoring, Domain Certification Mode, math.geom Wave 9.

## Identity

- **KG ID**: `math.geom.parabola`
- **Name**: Parabola
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 6
- **Requires**: `math.geom.conic-sections`, `math.alg.quadratic-equation`
- **Unlocks**: (none in current KG)
- **Cross-links**: `math.func.quadratic-function`

## Learning Objective

Given a parabola equation or focus-directrix description, the student:

(a) defines it as the set of points equidistant from a fixed focus and a fixed directrix;  
(b) distinguishes equations opening up/down (y = ax² + bx + c, one squared variable) from equations opening left/right (x = ay² + by + c, the other squared);  
(c) determines the opening direction from the sign of the leading coefficient a;  
(d) converts between general and vertex form by completing the square;  
(e) identifies the vertex, axis of symmetry, and opening direction from the equation.

## Core Understanding

A **parabola** is the set of all points equidistant from a fixed point (the **focus**) and a fixed line (the **directrix**):

> distance(P, focus) = distance(P, directrix) for every point P on the parabola.

This is the **one-focus, one-directrix** conic — unlike the ellipse and hyperbola, which each use two foci.

**Two orientation families**:
- y = ax² + bx + c: the squared variable is x → axis of symmetry is **vertical** → opens **up** (a > 0) or **down** (a < 0).
- x = ay² + by + c: the squared variable is y → axis of symmetry is **horizontal** → opens **right** (a > 0) or **left** (a < 0).

**Vertex form**: y = a(x − h)² + k places the vertex at (h, k). Completing the square converts general to vertex form using exactly the technique from `math.alg.quadratic-equation`.

**Cross-link**: the graph of any quadratic function (`math.func.quadratic-function`) is a parabola opening up or down. That concept studies parabolas as function graphs; this concept studies parabolas as geometric loci.

## Mental Models

- **Focus-directrix as a distance race**: imagine a race where two runners start simultaneously — one running from P to the focus, the other from P straight down to the directrix. On the parabola, both runners always arrive at the same time (same distance). The parabola is the set of all "tie" starting positions.
- **Reflecting dish**: a parabolic dish (satellite dish, car headlight, telescope mirror) focuses all parallel incoming signals to the single focus point. This works BECAUSE of the equal-distance property — every ray travels the same total distance (to the directrix) regardless of where it hits the dish, so they all converge at the focus simultaneously.
- **One focus, two for its siblings**: the ellipse needs two foci (sum constraint) and the hyperbola needs two foci (difference constraint). The parabola is the in-between case — it needs only one focus (equality constraint). It can be thought of as the limiting case of an ellipse as one focus is moved to infinity.

## Why Students Fail

Students confuse the orientation: they see y² in an equation and write a vertical-axis parabola, when y² means the axis of symmetry is HORIZONTAL. Students also apply the opening-direction rule for the y-form to the x-form without adjusting — "a > 0 always means opens up," when in the x-form, a > 0 means opens RIGHT. Completing the square errors from `math.alg.quadratic-equation` carry over here (especially forgetting to divide through by a before completing the square when a ≠ 1).

## Misconceptions

### MC-1 — Y-SQUARED-MEANS-VERTICAL-AXIS
**Birth type**: Type 3 (language contamination — students associate "y" with vertical movement; seeing y² leads them to picture a vertically-oriented parabola opening up or down)
**Mechanism**: The rule is "the squared variable tells you the axis of SYMMETRY (not the opening direction)." For x = ay², the axis of symmetry is horizontal (the y-axis of the equation is horizontal symmetry), so the parabola opens left or right. Students instead picture "y² → vertical," drawing a curve opening up or down.
**Diagnostic probe**: "Sketch x = y²." — watch for a student drawing an upward-opening parabola (y = x², the standard orientation) rather than a rightward-opening one (x = y², vertex at origin, opening right).
**Characteristic phrases**: "x = y² is the same as y = x²" / "y-squared means it opens up."

### MC-2 — A-POSITIVE-ALWAYS-MEANS-OPENS-UP
**Birth type**: Type 5 (instruction-induced — the vertical-form y = ax² + bx + c is drilled extensively; students learn "a > 0 → opens up" without the qualification "for vertical parabolas only")
**Mechanism**: In x = ay² + by + c (horizontal form), a > 0 means the parabola opens RIGHT, and a < 0 means it opens LEFT — but students apply the vertical-form rule and say "a > 0 → opens up" regardless of which form they are in.
**Diagnostic probe**: "For x = 2y², does the parabola open up or to the right?" — watch for "up" rather than "right."
**Characteristic phrases**: "a = 2 is positive, so it opens up" / "The sign of a is positive, so it's upward."

### MC-3 — COMPLETING-THE-SQUARE-SIGN-ERROR
**Birth type**: Type 4 (notation-induced — the completing-the-square sign pattern (x − h)² = x² − 2hx + h² requires careful tracking of signs when rewriting; a single sign reversal gives the wrong vertex)
**Mechanism**: Students write y = a(x − h)² + k and then misread h — for example, from y = 2(x + 3)² − 1 they report the vertex as (3, −1) rather than (−3, −1) because they miss that (x + 3) = (x − (−3)) means h = −3.
**Diagnostic probe**: "State the vertex of y = 3(x + 2)² − 5." — watch for (2, −5) rather than (−2, −5).
**Characteristic phrases**: "Vertex is at (2, −5) because 2 is inside the parentheses" / "h = 2 because there's a +2."

## Analogies

- **Headlight**: the reflector inside a car headlight is a parabolic mirror. The bulb is placed at the focus. Every ray from the bulb reflects off the paraboloid and exits as a parallel beam (perpendicular to the directrix). This is the focus-directrix property in action — used intentionally in engineering to produce directional light.
- **Thrown ball (parabolic arc)**: projectile motion under uniform gravity follows a parabolic path (in the absence of air resistance). The vertex of the parabola is the highest point of the trajectory. This connection to `math.func.quadratic-function` makes the parabola the most physically encountered conic.

## Demonstrations

1. **Focus-directrix construction**: on graph paper, mark a focus at (0, 1) and a directrix y = −1. For a grid of x-values, find y such that distance-to-focus = distance-to-directrix. Show that the resulting points fall on y = x²/4. The algebraic equation emerges from the geometric constraint.
2. **Orientation table**: present four equations: y = 2x² (opens up), y = −3x² (opens down), x = 2y² (opens right), x = −3y² (opens left). For each, identify the squared variable (x-form or y-form) and the sign of a. Make the pattern explicit in a 2×2 table.
3. **Vertex form conversion**: take y = 2x² − 8x + 5. Complete the square: y = 2(x² − 4x) + 5 = 2(x² − 4x + 4) + 5 − 8 = 2(x − 2)² − 3. Vertex: (2, −3), opens up (a = 2 > 0). Plot the vertex, a second point, and its mirror across the axis of symmetry to sketch the parabola.

## Discovery Questions

- "For a parabola opening upward, where is the focus relative to the vertex — above it or below it? Does the directrix go above or below the vertex? Why?"
- "What happens to the parabola y = ax² as a → ∞? As a → 0⁺? Draw both limiting cases."
- "A parabola and a line can intersect in 0, 1, or 2 points. What geometric condition corresponds to exactly 1 intersection? How does this connect to the discriminant in `math.alg.quadratic-equation`?"

## Teaching Sequence

1. Recall the conic classification from `math.geom.conic-sections`: parabola = exactly one squared variable.
2. State the focus-directrix definition; derive the equation for the simplest case (vertex at origin, focus on y-axis).
3. Introduce vertex form y = a(x − h)² + k; identify vertex, axis, opening direction.
4. Show the horizontal form x = a(y − k)² + h; contrast the orientation rule carefully.
5. Drill completing the square to convert general → vertex form; emphasize sign of h.
6. Present the cross-link to quadratic functions: every quadratic function graph is a parabola.
7. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: focus-directrix definition — geometric construction before the formula.
- **Blueprint Teaching Action A02**: orientation identification from equation form (vertical vs. horizontal, sign of a).
- **Blueprint Teaching Action A03**: completing the square to vertex form; vertex identification.
- **MC-1 intervention**: draw x = y² explicitly on a coordinate plane; show which direction the curve opens and label the axis of symmetry as horizontal.
- **MC-3 intervention**: write (x + 3) as (x − (−3)) explicitly at every step; "the h in (x − h)² is the number WITH THE MINUS SIGN in front."

## Voice Teaching Notes

- Say "which variable is squared?" before any further analysis — this single question determines all subsequent orientation analysis.
- When discussing opening direction, always qualify: "for a VERTICAL parabola (y = ax²), a > 0 means opens up. For a HORIZONTAL parabola (x = ay²), a > 0 means opens RIGHT."
- Latency signal: a student who gets a vertex with the wrong sign for h is showing MC-3; prompt with "write (x + 3) as (x minus what)?"

## Assessment Signals

- **Entry check**: expand (x − 2)² (confirms algebraic prerequisite); classify y = x² − 4x + 4 as a conic type (confirms `math.geom.conic-sections`).
- **Orientation probe**: "Does x = −3y² + 6y open left, right, up, or down?"
- **Vertex probe**: convert y = 2x² + 12x + 15 to vertex form; state the vertex.
- **Definition probe**: "Define a parabola using focus and directrix."
- **Mastery gate**: 4/5 problems including one horizontal parabola and one vertex-form conversion.

## Tutor Recovery Strategy

- **MC-1 (y² = vertical confusion)**: draw x = y² on paper step by step. For y = 0, x = 0. For y = 1, x = 1. For y = −1, x = 1. For y = 2, x = 4. The points (0,0), (1,1), (1,−1), (4,2), (4,−2) clearly trace a curve opening rightward. "x = y² opens right — the y² is squared, so the axis of symmetry is the x-axis, which is horizontal."
- **MC-2 (sign of a in horizontal form)**: use the sign-as-direction table: make a 2×2 grid (vertical/horizontal × positive/negative). Drill it until the student can produce all four cases without prompting.
- **MC-3 (vertex sign)**: require the student to rewrite every (x + c) term as (x − (−c)) before extracting h. Never allow h to be read directly from the number inside parentheses without applying this rewriting step.

## Memory Hooks

- **Squared variable = axis of symmetry**: "the SQUARED variable is the one the parabola is SYMMETRIC about — that's its axis."
- **Vertex form**: "y = a(x − h)² + k, vertex = (h, k); h has opposite sign from what's inside."
- **One focus, one directrix**: "parabola is the loner conic — one focus, one directrix, no second focus needed."

## Transfer Connections

- `math.func.quadratic-function`: every quadratic function graph is a parabola. This concept studies the parabola as a geometric object (focus-directrix, conic family membership); that concept studies it as a function (domain, range, roots, maximum/minimum). They complement each other.
- `math.geom.conic-sections`: the parabola is the "one-coefficient-zero" conic in the general second-degree equation — Ax² + Cy² + Dx + Ey + F = 0 with exactly one of A, C equal to zero.

## Cross-Subject Connections

- Physics: projectile motion (no air resistance) traces a parabolic arc. The vertex is the highest point, and the axis of symmetry is the vertical through the launch point if launched straight up (or at an angle, the axis is vertical through the apex). Parabolic dish antennas use the reflection property for signal focusing.
- Architecture/engineering: parabolic arches (in bridges, cables of suspension bridges under uniform load) are structurally efficient because loads distribute evenly along the curve. The Gateway Arch in St. Louis is a catenary, not a parabola — a common misconception worth noting.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.parabola.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (y² = vertical), MC-2 (sign convention), MC-3 (vertex sign error).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.parabola:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.parabola:PROBE:en` (DRAFT, live-capture; probes should target MC-1 orientation, MC-2 opening direction from a, MC-3 vertex identification)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03

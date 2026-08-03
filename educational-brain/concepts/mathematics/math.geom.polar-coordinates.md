## Identity

- **KG ID**: `math.geom.polar-coordinates`
- **Name**: Polar Coordinates
- **Domain**: Geometry
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 8
- **Requires**: `math.geom.coordinate-plane`, `math.trig.trig-functions`
- **Unlocks**: `math.geom.polar-curves`, `math.cx.complex-numbers-analysis`
- **Cross-links**: `math.cx.complex-numbers-analysis`

## Learning Objective

Given a point in the plane, the student:

(a) represents it in polar form (r, θ) where r is the distance from the origin and θ is the angle from the positive x-axis;  
(b) converts from polar to Cartesian: x = r cos θ, y = r sin θ;  
(c) converts from Cartesian to polar: r = √(x² + y²), θ = arctan(y/x) with correct quadrant adjustment;  
(d) interprets negative r: (−r, θ) is the same point as (r, θ + π);  
(e) recognizes non-uniqueness: (r, θ) and (r, θ + 2πn) represent the same point.

## Core Understanding

Polar coordinates locate a point by **distance from origin** (r) and **angle from the positive x-axis** (θ), rather than by horizontal and vertical displacement.

**Conversion formulas** (polar ↔ Cartesian):
- Polar to Cartesian: x = r cos θ, y = r sin θ
- Cartesian to polar: r = √(x² + y²), θ = arctan(y/x) [quadrant adjustment required]

**Negative r**: a negative radius means "go in the opposite direction." (−r, θ) = (r, θ + π). This is valid, not an error.

**Non-uniqueness**: a single point has infinitely many polar representations. (r, θ), (r, θ + 2π), (r, θ + 4π) … all describe the same point. Canonical form: r ≥ 0 and θ ∈ [0, 2π).

**Geometric advantage**: circles centered at the origin have the simple polar equation r = c (versus x² + y² = c² in Cartesian). Rays from the origin have equation θ = α (versus y = x tan α in Cartesian). Polar coordinates are the natural system for problems with rotational symmetry.

## Mental Models

- **Radar bearing**: a ship's radar reports range (how far away) and bearing (what direction). This is polar thinking — the world described by "how far, which direction" rather than "how far left-right, how far up-down." A city's street grid is Cartesian; a radar screen is polar.
- **Clock with extending arm**: the minute hand sweeps out θ as it rotates; extending it to length r reaches any point in the plane. Polar coordinates are "where the extended hand points and how long the hand is."
- **Redundancy as a feature, not a bug**: the non-uniqueness of polar representation is deliberate — it lets the same curve be written in multiple convenient ways (especially useful in polar curve tracing), rather than being forced into one canonical form at all times.

## Why Students Fail

Students plot (r, θ) as if it were (x, y) in a Cartesian grid — treating r as the x-coordinate and θ as the y-coordinate. The quadrant adjustment for arctan(y/x) is frequently omitted, placing converted points in the wrong quadrant. Students declare negative r "undefined" or take its absolute value, misplotting the point. Non-uniqueness confuses students who expect every point to have exactly one representation.

## Misconceptions

### MC-1 — POLAR-POINT-AS-CARTESIAN
**Birth type**: Type 3 (language contamination — coordinate pairs always meant (x, y) in prior work; the identical (a, b) notation in polar means something completely different)
**Mechanism**: The student plots (r, θ) as if r is horizontal displacement and θ is vertical displacement. The point (3, π/2) lands at Cartesian (3, 1.57) instead of Cartesian (0, 3). The error produces a visually sensible-looking plot that is geometrically wrong.
**Diagnostic probe**: "Plot the point (3, π/2) on a polar grid." — watch for the point ending up 3 units along the x-axis (Cartesian interpretation) rather than 3 units along the y-axis (correct polar position).
**Characteristic phrases**: "The point (3, π/2) is 3 units right and π/2 up" / "I plot r on the x-axis, right?"

### MC-2 — NEGATIVE-R-IS-UNDEFINED
**Birth type**: Type 2 (perceptual intuition — "radius" connotes non-negative magnitude; r < 0 violates that intuition)
**Mechanism**: The student has seen radius and distance as inherently non-negative quantities throughout geometry. A negative r appears meaningless or invalid. The student takes |r| instead, misplotting the point's actual location.
**Diagnostic probe**: "Plot (−2, π/4) on a polar grid." — watch for the point ending up at Cartesian (√2, √2) (taking |r|) instead of (−√2, −√2) (correct, at angle π/4 + π = 5π/4 and distance 2).
**Characteristic phrases**: "You can't have a negative radius" / "I took the absolute value since distance can't be negative."

### MC-3 — ARCTAN-QUADRANT-ERROR
**Birth type**: Type 4 (notation-induced — arctan(y/x) returns values in (−π/2, π/2), covering only Quadrants I and IV; the formula is algebraically correct but incomplete without quadrant adjustment)
**Mechanism**: The student computes θ = arctan(y/x) and accepts the calculator's output without checking which quadrant (x, y) actually lies in. For points in Quadrants II and III, the formula returns an angle in the wrong quadrant.
**Diagnostic probe**: "Convert (−3, 3) to polar form." — watch for θ = arctan(3/−3) = arctan(−1) = −45° rather than the correct 135°.
**Characteristic phrases**: "arctan gave me −45° so that's the angle" / "I just plugged into the formula."

## Analogies

- **Navigation and GPS**: the polar system is how pilots and sailors describe position — bearing and distance from a reference point — before GPS converted everything to latitude/longitude (an alternative global Cartesian system). Choosing coordinates is choosing a description language, not an objective truth about the world.
- **Spiral galaxy**: a galaxy's structure (spiral arms, rings) is elegantly described in polar coordinates because the arms are curves of the form r = f(θ). The same shapes are algebraically horrendous in Cartesian form — the coordinate system should match the geometry.

## Demonstrations

1. **Four canonical points**: plot (2, 0), (2, π/2), (2, π), (2, 3π/2) on a polar grid. Connect them — they form a square in standard position. Then convert each to Cartesian and show the x/y coordinates. The conversion formulas produce the familiar (2,0), (0,2), (−2,0), (0,−2) exactly.
2. **Negative r**: plot (−3, π/4) by first pointing in the direction π/4 (northeast), then going 3 units in the OPPOSITE direction (southwest). The result is the same as (3, π/4 + π) = (3, 5π/4). Verify algebraically: (−3 cos(π/4), −3 sin(π/4)) = (−3√2/2, −3√2/2). ✓
3. **Non-uniqueness**: show that (2, 0), (2, 2π), (2, 4π), and (−2, π) all convert to Cartesian (2, 0). This demonstrates why r = 2 is canonical, but angle is not.

## Discovery Questions

- "A circle of radius 5 centered at the origin has Cartesian equation x² + y² = 25. What is its polar equation? Which form is simpler?"
- "Can you plot the point (0, any angle)? What point does this always produce, regardless of θ?"
- "What happens to a polar curve r = 2 + cos θ when you add π to every θ value? Is the curve the same or different?"

## Teaching Sequence

1. Recall the Cartesian coordinate system; acknowledge it is one choice of coordinate language, not the only one.
2. Motivate with the radar/navigation analogy: distance and direction as a natural description.
3. Define the polar grid: concentric circles (constant r), rays (constant θ).
4. Plot several points by hand; emphasize the two quantities to read off (distance and angle).
5. Derive the conversion formulas from the right-triangle interpretation.
6. Introduce negative r as "opposite direction"; drill with two examples.
7. Establish non-uniqueness; define canonical form.
8. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: polar grid plotting — point-by-point before any formula.
- **Blueprint Teaching Action B01**: coordinate conversion — explicit quadrant-check drill.
- **MC-1 intervention**: place a Cartesian grid and a polar grid side by side; explicitly mark why the same notation (a, b) means different things in each system.
- **MC-2 intervention**: draw the "opposite direction" interpretation of negative r geometrically; show the resulting point is genuine and well-defined.
- **MC-3 intervention**: always check the quadrant of (x, y) AFTER computing arctan; write out the quadrant rule explicitly every time.

## Voice Teaching Notes

- Say "distance r from the origin, angle θ from the positive x-axis" — repeat this description every time a polar point is introduced, until students can say it unprompted.
- When plotting, narrate: "find the circle of radius r, then find the ray at angle θ, the point is at their intersection."
- Latency signal: hesitation before answering whether a negative r is valid signals MC-2; prompt with "what direction does a negative r send you?"

## Assessment Signals

- **Entry check**: name the quadrant containing (−3, 5) on a Cartesian grid (confirms `math.geom.coordinate-plane`); compute cos(3π/4) without a calculator (confirms trig prerequisite).
- **Plotting probe**: plot (3, 2π/3) and (−2, π/4) on a polar grid.
- **Conversion probe**: convert (4, −4) from Cartesian to polar in canonical form.
- **Non-uniqueness probe**: name three different polar representations of the Cartesian point (0, 5).
- **Mastery gate**: 4/5 problems including one negative-r plot and one quadrant-adjusted Cartesian-to-polar conversion.

## Tutor Recovery Strategy

- **MC-1 (Cartesian confusion)**: draw the polar grid next to the Cartesian grid and place the SAME point on both using its respective coordinates. Show that (r, θ) lands somewhere completely different from (r, θ) interpreted as (x, y). The visual gap closes the misconception faster than algebraic argument.
- **MC-2 (negative r)**: start from the geometric definition — "polar coordinates: go distance r in direction θ." Ask: "what if r = −2? You go 2 units in the OPPOSITE of direction θ." Draw the resulting point. It is real and well-defined. No math is broken.
- **MC-3 (arctan quadrant)**: make a habit: after computing arctan(y/x), always draw (x, y) on a small sketch to check which quadrant it is in. If the sketch says Quadrant II or III, add π to the arctan result. No exceptions.

## Memory Hooks

- **Polar pair order**: "r then θ — radius then rotation." The first coordinate is always the distance; the second is always the angle.
- **Negative r**: "negative radius = U-turn" — go the opposite direction.
- **Non-uniqueness**: "polar is many-to-one, Cartesian is one-to-one" — every Cartesian point has one representation; every polar point has infinitely many.

## Transfer Connections

- `math.geom.polar-curves`: polar coordinates are the foundational language for expressing and plotting polar curves r = f(θ); mastery of the coordinate system is required before curve families make sense.
- `math.cx.complex-numbers-analysis`: complex numbers in polar form z = r e^{iθ} = r(cos θ + i sin θ) directly use the polar representation — the complex modulus is r and the argument is θ. The conversion formulas here are the bridge.

## Cross-Subject Connections

- Physics: central-force problems (gravity, electrostatics) are most naturally analyzed in polar or spherical coordinates because the force is radially symmetric; the equations of motion simplify dramatically when expressed with r and θ as the fundamental coordinates.
- Engineering: antenna patterns, radar charts, and stress rosettes are all naturally expressed in polar form. Control-system engineers use polar plots (Nyquist diagrams) to analyze system stability.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.polar-coordinates.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 1 (Cognitive Map / Core Explanation), Component 2 (Misconception Registry MC-1 to MC-3).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.polar-coordinates:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.polar-coordinates:PROBE:en` (DRAFT, live-capture; probes should target MC-1 Cartesian confusion, MC-2 negative r, MC-3 arctan quadrant)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03

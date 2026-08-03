## Identity

- **KG ID**: `math.geom.ellipse`
- **Name**: Ellipse
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6
- **Requires**: `math.geom.conic-sections`
- **Unlocks**: (none in current KG)
- **Cross-links**: (none in KG)

## Learning Objective

Given an ellipse in standard or general form, the student:

(a) defines it as the locus of points where the sum of distances to two foci equals a constant (2a);  
(b) applies the standard equation x²/a² + y²/b² = 1, correctly identifying the larger denominator as a² (semi-major);  
(c) computes the focal distance c from c² = a² − b²;  
(d) locates the foci along the correct axis (the one with the larger denominator);  
(e) recognizes a circle as the special case a = b (foci coincide at the center).

## Core Understanding

An **ellipse** is the set of all points P where the **sum** of distances to two fixed foci F₁ and F₂ is constant:

> distance(P, F₁) + distance(P, F₂) = 2a

The **standard form** for an axis-aligned ellipse centered at the origin is:

> x²/a² + y²/b² = 1, where a > b > 0

- **Semi-major axis** = a (the longer direction); the foci lie along this axis.
- **Semi-minor axis** = b (the shorter direction).
- **Focal distance** c: each focus is c units from the center, where **c² = a² − b²**.

**Which axis holds the foci?** The larger denominator tells you — the foci lie along the axis whose variable has the larger denominator. If a² is under x², foci are on the x-axis; if a² is under y², foci are on the y-axis.

**Circle as a special case**: when a = b, the "two foci" coincide at the center, and the ellipse becomes a circle of radius a. A circle is not a different kind of shape — it is the maximally symmetric ellipse.

## Mental Models

- **Two-pin-and-string**: stick two pins into paper (the foci), loop a string of fixed total length around both pins and a pencil, and pull the pencil taut while tracing. The pencil draws an ellipse — every point satisfies the fixed-sum-of-distances definition by construction.
- **Squashed circle**: an ellipse is a circle that has been compressed uniformly in one direction. The two equal-distance foci of the circle have "pulled apart" as the circle was compressed, becoming two distinct foci.
- **Orbital intuition**: planets orbit the sun in ellipses with the sun at one focus (Kepler's first law). The planet's distance from the sun changes throughout the orbit — but the SUM of distances to the two mathematical foci stays constant. At closest approach (perihelion) and farthest (aphelion), the sum relation can be verified explicitly.

## Why Students Fail

Students confuse which denominator corresponds to the major (longer) axis — they assume a² is always under x², when in fact a is defined as the LARGER value regardless of which variable it's under. Students also make sign errors in c² = a² − b² (trying to use a² + b² by analogy with the Pythagorean theorem). The sum-of-distances definition is known but forgotten under problem pressure; students fall back to equation manipulation without understanding why the formula works.

## Misconceptions

### MC-1 — A-IS-ALWAYS-UNDER-X
**Birth type**: Type 5 (instruction-induced — the horizontal ellipse x²/a² + y²/b² = 1 with a > b is often the only case drilled, leading students to assume a is always under x²)
**Mechanism**: Students see x²/16 + y²/9 = 1 and correctly identify a = 4 (major axis along x). Then they see x²/9 + y²/16 = 1 and still say "a = 3, major axis along x" — missing that 16 > 9, so b = 4 is the semi-MAJOR axis when it appears under y².
**Diagnostic probe**: "For x²/9 + y²/25 = 1, which direction is the major axis?" — watch for "x-axis" rather than the correct "y-axis."
**Characteristic phrases**: "a is always the x-denominator" / "The major axis is horizontal because that's where a goes."

### MC-2 — FOCAL-DISTANCE-USES-PYTHAGOREAN-SUM
**Birth type**: Type 3 (language contamination — the Pythagorean theorem's a² + b² = c² is deeply ingrained; students apply it to the ellipse triangle, which uses a different relationship)
**Mechanism**: Students compute c² = a² + b² (like the Pythagorean theorem) instead of c² = a² − b². The ellipse triangle (focus → center → end of semi-minor axis) has hypotenuse a and legs b and c, giving a² = b² + c² → c² = a² − b². The confusion is between the Pythagorean form and the ellipse's specific triangle geometry.
**Diagnostic probe**: "For x²/25 + y²/16 = 1, compute the distance from center to focus." — watch for c = √(25 + 16) = √41 instead of the correct c = √(25 − 16) = 3.
**Characteristic phrases**: "c² = a² + b²" / "I use the Pythagorean theorem to find c."

### MC-3 — SUM-VS-DIFFERENCE-CONFUSION-WITH-HYPERBOLA
**Birth type**: Type 5 (instruction-induced — ellipses and hyperbolas are taught in close succession; the SUM vs. DIFFERENCE distinction is the sole definitional separator, and students conflate them under pressure)
**Mechanism**: Students recall that a conic involves distances to two foci but cannot reliably produce whether it is the SUM (ellipse) or DIFFERENCE (hyperbola) of those distances that is constant. They either confuse the two conics or default to whichever they learned last.
**Diagnostic probe**: "Complete the definition: an ellipse is the set of points where the _____ of distances to two foci is constant." — watch for "difference" rather than "sum."
**Characteristic phrases**: "Is it sum or difference? I can never remember which is which" / "That sounds like the hyperbola definition."

## Analogies

- **Whispering gallery**: certain dome-shaped rooms (like St. Paul's Cathedral in London) have two focal points. A whisper at one focus travels along the curved wall and arrives clearly at the other focus — because the dome is an elliptical cross-section and sound travels along the constant-sum-of-distances path. This is the definition of an ellipse made audible.
- **Family portrait**: the circle, ellipse, hyperbola, and parabola are siblings in the conic family (from `math.geom.conic-sections`). The ellipse is the "most like" the circle among the non-circular conics — it is still bounded (finite extent in all directions), still a single closed curve, still symmetric.

## Demonstrations

1. **String construction**: on paper, mark two foci 4 units apart. Use a 10-unit string looped around both pins. Trace the full ellipse. Measure a = 5 (half the string length), b = 3 (semi-minor by the right triangle), c = 2 (half the focal separation). Verify: c² = a² − b² → 4 = 25 − 9 = 16. Wait — 2² = 4 and 5² − 3² = 16, not 4. Let me correct: with foci 4 units apart (c = 2) and string length 10 (2a = 10, so a = 5): b² = a² − c² = 25 − 4 = 21, b = √21 ≈ 4.58. Use these numbers in the demonstration and verify geometrically.
2. **Identify major axis**: present x²/9 + y²/25 = 1 side by side with x²/25 + y²/9 = 1. Show that in the first, 25 > 9 and 25 is under y² — so the major axis is vertical. In the second, 25 is under x² — major axis is horizontal. The foci move accordingly.
3. **Circle as limiting case**: start with x²/9 + y²/4 = 1. Compute c = √(9 − 4) = √5. Now slowly increase the y-denominator toward 9 — the ellipse becomes rounder and the foci move toward the center. When b = a = 3: c = 0, foci coincide at the origin, the ellipse becomes the circle x² + y² = 9.

## Discovery Questions

- "If you move the two foci closer and closer together (fixing the total string length), what does the ellipse approach? What is the endpoint of this process?"
- "Can an ellipse have its foci outside the ellipse itself? Prove your answer using c² = a² − b²."
- "For a planet orbiting the sun in an ellipse, at which point in the orbit is the planet moving fastest? Why does this follow from the constant-sum-of-distances definition?"

## Teaching Sequence

1. Recall the conic classification from `math.geom.conic-sections`: ellipse = same-sign coefficients, unequal.
2. Motivate with the two-pin-and-string physical construction.
3. State the definition: sum of distances to two foci = 2a.
4. Derive the standard form equation from the definition.
5. Identify semi-major a, semi-minor b, and focal distance c; derive c² = a² − b².
6. Drill identifying the major axis direction from the equation (find the larger denominator).
7. Show the circle as the special case a = b.
8. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: two-pin-and-string construction — kinesthetic before algebraic.
- **Blueprint Teaching Action A02**: standard form and parameter identification, with emphasis on WHICH denominator is larger.
- **MC-1 intervention**: always ask "which denominator is larger?" before identifying a; never default to "a is under x²."
- **MC-2 intervention**: draw the right triangle explicitly — center, focus, and end of semi-minor axis — with sides labeled b, c, and hypotenuse a. State: "the hypotenuse is a, so a² = b² + c², giving c² = a² − b²." This is the Pythagorean theorem, but on the right triangle — not confusing a and c.

## Voice Teaching Notes

- Say "sum of distances to two foci" — stress the word SUM every time the definition is stated, to distinguish from the hyperbola's DIFFERENCE.
- When identifying a: "find the larger denominator first — a² is always the larger of the two denominators, regardless of which variable it's under."
- Latency signal: hesitation when asked which axis the foci lie along signals MC-1; prompt with "which denominator is larger? That's where the foci go."

## Assessment Signals

- **Entry check**: classify x²/4 + y²/9 = 1 as a conic type (confirms `math.geom.conic-sections`); identify the larger denominator immediately (confirms prerequisite understanding).
- **Definition probe**: "Define an ellipse using distances to two foci."
- **Parameter probe**: for x²/16 + y²/7 = 1, state a, b, c, and which direction the major axis points.
- **Circle probe**: "Is a circle a special case of an ellipse? When does an ellipse become a circle?"
- **Mastery gate**: 4/5 problems including one vertical-major-axis ellipse and one focal-distance computation.

## Tutor Recovery Strategy

- **MC-1 (axis confusion)**: write the rule on paper: "a² is the LARGER denominator — period." Then: "where is a²? That's the major axis direction." Drill with three examples alternating horizontal and vertical major axes.
- **MC-2 (focal distance sign)**: draw the right triangle (focus at one corner, center at second, end of semi-minor at third). Label the sides. "Hypotenuse = a. Legs = b and c. Pythagorean theorem: a² = b² + c² → c² = a² − b²." The geometry makes the sign obvious.
- **MC-3 (sum vs. difference)**: write in large letters: "ELLIPSE = SUM. HYPERBOLA = DIFFERENCE." Connect it to the word: an ellipse is a round, enclosed, ADDITIVE shape — "ell-SUM." Drill with three classification questions before returning to computation.

## Memory Hooks

- **Sum for ellipse**: "ellipse adds up — it's the SUM of distances that's constant."
- **a is larger**: "a is the bigger brother — always the larger denominator, always the longer axis."
- **c² = a² − b²**: "a² minus b² makes c² — subtract the smaller squared."

## Transfer Connections

- `math.geom.conic-sections`: the ellipse is one of the four conics classified by the Ax² + Cy² + Dx + Ey + F = 0 coefficient pattern. This entry provides the ellipse-specific depth; that entry provides the unifying framework.
- `math.geom.hyperbola`: the direct contrast — difference vs. sum of focal distances; two open branches vs. one closed curve. Studying both together cements the distinguishing features.

## Cross-Subject Connections

- Astronomy/Physics: every bound gravitational orbit is an ellipse (Kepler's first law). The planet's velocity at any point follows from the constant-sum property (via angular momentum conservation — slower at aphelion, faster at perihelion).
- Optics: an elliptical reflector focuses all light from one focus to the other — the physical embodiment of the equal-sum-of-distances path property. Ellipsoidal lenses and mirrors in optical instruments use this.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.ellipse.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (a-under-x confusion), MC-2 (focal distance sign), MC-3 (sum vs. difference).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.ellipse:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.ellipse:PROBE:en` (DRAFT, live-capture; probes should target MC-1 major-axis identification, MC-2 focal distance, MC-3 definition recall)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03

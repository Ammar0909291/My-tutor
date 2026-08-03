## Identity

- **KG ID**: `math.geom.curvature`
- **Name**: Curvature
- **Domain**: Geometry
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.70
- **Estimated hours**: 8
- **Requires**: `math.geom.differential-geometry-curves`, `math.calc.derivative-rules`
- **Unlocks**: `math.geom.differential-geometry-surfaces`
- **Cross-links**: (none in KG)

## Learning Objective

Given a space curve **r**(t), the student:

(a) explains why the definition κ = |dT/ds| is geometrically correct but computationally impractical for most curves;  
(b) derives and applies the computable formula κ(t) = |**r**′(t) × **r**″(t)| / |**r**′(t)|³;  
(c) verifies special cases: a straight line has κ = 0; a circle of radius R has κ = 1/R;  
(d) distinguishes the single curvature number κ (for a curve in space) from the surface curvature quantities (geodesic curvature, normal curvature) that apply when a curve lies on a surface;  
(e) interprets κ qualitatively: large κ = sharp bend, small κ = gentle curve, κ = 0 = locally straight.

## Core Understanding

**Curvature** κ measures how sharply a curve bends at a given point — the rate at which the unit tangent T rotates relative to arc length traveled:

> κ = |dT/ds|

This definition is geometrically correct but practically unusable: computing d/ds requires the arc-length parametrization **r**(s), which in turn requires solving s(t) = ∫|**r**′(t)| dt and inverting — rarely possible in closed form.

**The computable formula** avoids this via the chain rule:

> κ(t) = |**r**′(t) × **r**″(t)| / |**r**′(t)|³

This uses only the original parametrization's first and second derivatives — no reparametrization required.

**Key special cases**:
- Straight line: κ = 0 everywhere (no bending).
- Circle of radius R: κ = 1/R everywhere (uniform bending; sharper circle = higher curvature).
- Radius of curvature: ρ = 1/κ — the radius of the "osculating circle" (best-fitting circle at a point).

**What curvature is NOT** (at this concept): geodesic curvature and normal curvature are curvature quantities for curves living ON a surface — they decompose κ into a component within the surface and a component normal to it. These are deferred to `math.geom.differential-geometry-surfaces`.

## Mental Models

- **How fast the compass needle spins**: the unit tangent T(t) is a compass needle pointing in the direction of motion. Curvature measures how fast the needle rotates as you walk one unit of distance along the curve. A straight road: needle never moves, κ = 0. A sharp U-turn: needle rotates quickly, κ large. A gentle highway curve: needle rotates slowly, κ small.
- **Osculating circle**: at each point of a curve, there is a unique circle that "best fits" the curve locally — it shares the point, the tangent direction, and the curvature. Its radius ρ = 1/κ is the radius of curvature. A tightly curving road has a small osculating circle (high κ); a nearly straight road has a huge osculating circle (low κ).
- **Banking a turn**: racecar drivers bank (tilt) a turn to counteract centripetal force. The required banking angle depends on the curvature κ of the track and the speed — high curvature (sharp turn) at high speed demands more banking. Curvature is the geometric input the physics formula reads.

## Why Students Fail

Students try to apply the definition κ = |dT/ds| directly without recognizing the need to first reparametrize, leading to algebraically incorrect results. Students also confuse the cross-product formula κ = |**r**′ × **r**″| / |**r**′|³ with the formula for the cross product itself (not a curvature formula). The special case circle κ = 1/R is known but students often apply it with the wrong radius — confusing the osculating circle's radius (the LOCAL curvature radius at one point) with the global radius of a full circle (which has the same curvature everywhere).

## Misconceptions

### MC-1 — APPLY-DEFINITION-DIRECTLY-WITHOUT-REPARAMETRIZING
**Birth type**: Type 5 (instruction-induced — students learn κ = |dT/ds| first and attempt to differentiate T with respect to s directly without computing the arc-length parametrization)
**Mechanism**: Students differentiate T(t) with respect to t and report |T′(t)| as the curvature, forgetting the chain-rule factor ds/dt = |**r**′(t)|. The correct relation is κ = |dT/ds| = |T′(t)| / |**r**′(t)|, not |T′(t)| alone.
**Diagnostic probe**: "Compute κ for **r**(t) = (cos(2t), sin(2t))." — the correct κ = 1/1 = 1 (unit circle traversed at speed 2). Watch for κ = |T′(t)| = 2 (missing the division by |**r**′(t)| = 2).
**Characteristic phrases**: "Curvature is just |T′|" / "I differentiated T with respect to t and that's κ."

### MC-2 — CURVATURE-FORMULA-SAME-AS-CROSS-PRODUCT
**Birth type**: Type 4 (notation-induced — the formula |**r**′ × **r**″| appears in the numerator; students mistake this for the cross product formula rather than reading it as the MAGNITUDE of the cross product divided by a power of |**r**′|)
**Mechanism**: Students compute **r**′ × **r**″ (the cross product vector) and report that vector as the curvature, instead of taking its magnitude and dividing by |**r**′|³.
**Diagnostic probe**: "Compute κ for **r**(t) = (t, t², 0) at t = 0." — the correct κ = |**r**′ × **r**″| / |**r**′|³ = |(1,0,0) × (0,2,0)| / 1 = |(0,0,2)| / 1 = 2. Watch for a student who reports κ = (0, 0, 2) (a vector, not a scalar).
**Characteristic phrases**: "Curvature is the cross product" / "κ = **r**′ × **r**″."

### MC-3 — CURVATURE-IS-GLOBAL-NOT-LOCAL
**Birth type**: Type 2 (perceptual intuition — students who picture a curve globally ("this curve is more curved than that one") apply curvature as a property of the whole curve, not as a function that varies from point to point)
**Mechanism**: Students compute κ for a complicated curve and expect a single number — asking "what is the curvature of the curve?" rather than "what is the curvature AT THIS POINT?" They are surprised when κ changes along the curve and cannot identify the most sharply curved point.
**Diagnostic probe**: "For the parabola y = x² (parametrized as (t, t², 0)), compute κ at t = 0 and t = 1. Are they the same?" — watch for a student who computes one value and concludes "the curvature is constant" or who is confused by different values at different points.
**Characteristic phrases**: "What is THE curvature of the parabola?" / "I expected the same κ everywhere."

## Analogies

- **Highway speed limits on curves**: highway engineers specify a "safe speed" for each curve — this is directly derived from the curve's radius of curvature ρ. A sharper curve (smaller ρ, larger κ) has a lower speed limit. Curvature is literally the quantity that determines safe driving speed, not a abstract geometric concept.
- **Sewing a curved seam**: when sewing a sharp corner or tight curve into fabric, the seamstress slows down, taking shorter stitches and making more adjustments per inch. This is the physical analog of large curvature — more turning per unit of distance traveled requires more attention per unit of fabric.

## Demonstrations

1. **Straight line κ = 0**: **r**(t) = (t, 0, 0). **r**′ = (1, 0, 0), **r**″ = (0, 0, 0). **r**′ × **r**″ = (0, 0, 0). κ = 0/1³ = 0. "A straight line never bends — curvature is identically zero everywhere."
2. **Circle κ = 1/R**: **r**(t) = (R cos t, R sin t, 0). **r**′ = (−R sin t, R cos t, 0), |**r**′| = R. **r**″ = (−R cos t, −R sin t, 0). **r**′ × **r**″ = (0, 0, R² sin²t + R² cos²t) = (0, 0, R²). |**r**′ × **r**″| = R². κ = R²/R³ = 1/R. "A circle of radius R has constant curvature 1/R — the smaller the circle, the higher the curvature."
3. **Parabola κ varies**: **r**(t) = (t, t², 0). **r**′ = (1, 2t, 0), |**r**′| = √(1 + 4t²). **r**″ = (0, 2, 0). **r**′ × **r**″ = (0, 0, 2). κ(t) = 2/(1 + 4t²)^{3/2}. At t = 0: κ = 2 (most curved, at the vertex). At t = 1: κ = 2/5^{3/2} ≈ 0.18 (much less curved, far from vertex). "Curvature is a function of position along the curve — it varies."

## Discovery Questions

- "For a curve with very high curvature at a point, what does the osculating circle look like? What happens to the circle as curvature approaches 0?"
- "Can a curve have high curvature everywhere and still be a simple (non-self-intersecting) curve? Give an example."
- "A helix **r**(t) = (cos t, sin t, ct) for different values of c — as c increases, the helix becomes more stretched in the z-direction. How does the curvature change? Does κ increase or decrease as c grows?"

## Teaching Sequence

1. Recall `math.geom.differential-geometry-curves`: unit tangent T(t), arc length s(t), qualitative notion κ = |dT/ds|.
2. Establish why direct computation of dT/ds is impractical (requires closed-form inversion of s(t)).
3. Derive the computable formula via the chain rule: dT/ds = T′(t)/(ds/dt) → κ = |T′(t)|/|**r**′(t)|.
4. Simplify to κ = |**r**′ × **r**″|/|**r**′|³ (standard vector calculus identity).
5. Verify: straight line κ = 0; circle of radius R gives κ = 1/R.
6. Show that κ varies along a parabola — curvature is a function, not a constant.
7. Introduce the osculating circle ρ = 1/κ.
8. Note geodesic/normal curvature as surface concepts, deferred.
9. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: why the definition is impractical — explicitly show the inversion problem for a non-trivial curve.
- **Blueprint Teaching Action A02**: derivation and application of the computable formula — require full cross-product and cube of |**r**′| every time.
- **MC-1 intervention**: make the chain-rule factor ds/dt = |**r**′(t)| visible in every formula step; never write |T′(t)| without immediately dividing by |**r**′(t)|.
- **MC-3 intervention**: plot κ(t) as a function for the parabola example — make it visually clear that curvature varies along the curve.

## Voice Teaching Notes

- Say "curvature AT this point" — stress the locality every time. Never say "the curvature of the curve" as if it were a single number for the whole curve.
- When applying the formula, verbalize: "cross product of first and second derivatives, take the magnitude, divide by the cube of the speed."
- Latency signal: a student who computes |T′(t)| and pauses before the next step is likely to commit MC-1; prompt with "what do you divide by?"

## Assessment Signals

- **Entry check**: compute **r**′(t) and T(t) for **r**(t) = (e^t, 0, 0) (confirms `math.geom.differential-geometry-curves`); apply the chain rule to d/dt[f(s(t))] (confirms `math.calc.derivative-rules`).
- **Formula probe**: state the computable curvature formula κ(t) = ____; identify what goes in the numerator and denominator.
- **Special case probe**: verify κ = 0 for any line and κ = 1/R for a circle of radius R.
- **Computational probe**: compute κ at t = 1 for **r**(t) = (t, t², t³).
- **Mastery gate**: 4/5 problems including one curve with non-constant κ and one verification of a special case.

## Tutor Recovery Strategy

- **MC-1 (|T′| without denominator)**: compute |T′(t)| and |**r**′(t)| separately for the circle example. Show that |T′(t)| = 1 for any unit circle (which would give κ = 1, but R = 1 so κ = 1/R = 1 — which happens to be right). Now try R = 2: |T′(t)| = 1 still (unit tangent is always a unit vector!), but κ should be 1/2. This forces the division by |**r**′(t)| = 2.
- **MC-2 (cross product vs. curvature)**: read the formula aloud: "MAGNITUDE of the cross product, divided by CUBE of the speed — the result is a SCALAR." The cross product is a vector; κ requires one more step: take its magnitude.
- **MC-3 (global vs. local)**: assign a problem that explicitly requires computing κ at two different points on the same curve. When the results differ, state: "κ is a FUNCTION of position along the curve — it is different at different points, just like the speed of a car varies along a road."

## Memory Hooks

- **Formula**: "cross magnitude over speed cubed — |**r**′ × **r**″| / |**r**′|³."
- **Special cases**: "line = 0, circle = one over radius."
- **Local**: "curvature AT a point, not OF the whole curve."

## Transfer Connections

- `math.geom.frenet-serret`: curvature κ is the first of two geometric quantities in the Frenet-Serret system. Torsion τ is the second (measures out-of-plane twisting). Together, κ and τ completely determine the shape of a space curve up to rigid motion.
- `math.geom.differential-geometry-surfaces`: when a curve lies ON a surface, its curvature κ decomposes into geodesic curvature (within the surface) and normal curvature (perpendicular to the surface). Gaussian curvature K of a surface is built from principal curvatures, which are extrema of normal curvature.

## Cross-Subject Connections

- Physics: the centripetal acceleration of a particle moving along a curve at speed v is a = v²κ directed toward the center of curvature. For circular motion (κ = 1/R constant), this gives the familiar a = v²/R.
- Optics: the optical power of a lens surface is proportional to its curvature κ. Grinding a lens to a higher curvature (smaller radius of curvature) produces stronger refraction — a more powerful lens.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.curvature.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (definition vs. formula), MC-2 (formula confusion), MC-3 (global vs. local).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.curvature:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.curvature:PROBE:en` (DRAFT, live-capture; probes should target MC-1 chain-rule factor, MC-2 scalar output, MC-3 local evaluation)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03

## Identity

- **KG ID**: `math.geom.differential-geometry-curves`
- **Name**: Curves in Space
- **Domain**: Geometry
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.70
- **Estimated hours**: 12
- **Requires**: `math.calc.parametric-curves`, `math.geom.vectors-3d`
- **Unlocks**: `math.geom.differential-geometry-surfaces`
- **Cross-links**: (none in KG)

## Learning Objective

Given a space curve defined by a vector-valued function **r**(t), the student:

(a) represents the curve as **r**(t) = (x(t), y(t), z(t)), fusing parametric and vector notation;  
(b) computes the velocity vector **r**′(t) and distinguishes it from the unit tangent T(t) = **r**′(t)/|**r**′(t)|;  
(c) computes arc length L = ∫ₐᵇ |**r**′(t)| dt over an interval;  
(d) explains what reparametrizing by arc length means and why it produces |d**r**/ds| ≡ 1;  
(e) recognizes curvature κ = |dT/ds| as a local measure of bending and the Frenet frame (T, N, B) as a moving orthonormal basis along the curve (orientation level — full computation deferred to `math.geom.curvature` and `math.geom.frenet-serret`).

## Core Understanding

A **space curve** is a smooth path in ℝ³, described by a vector-valued function:

> **r**(t) = (x(t), y(t), z(t))

This fuses two prerequisites: `math.calc.parametric-curves`' idea of tracing a path as a parameter varies, now extended to three dimensions using `math.geom.vectors-3d`' component-vector notation.

**Velocity and unit tangent**:
- Velocity vector: **r**′(t) = (x′(t), y′(t), z′(t)) — points in the direction of motion; its magnitude is the speed.
- Unit tangent: T(t) = **r**′(t) / |**r**′(t)| — direction only, speed stripped away.
- These are NOT the same. |**r**′(t)| is the speed, which varies along the curve.

**Arc length**: L = ∫ₐᵇ |**r**′(t)| dt — integrating speed gives distance traveled.

**Arc-length parametrization**: define s(t) = ∫₀ᵗ |**r**′(u)| du. Expressing the curve as **r**(s) (reparametrizing by arc length) gives |d**r**/ds| ≡ 1 everywhere — a genuine change of variables, not just renaming t as s. Most curves cannot be reparametrized in closed form.

**Local geometry** (orientation): curvature κ = |dT/ds| measures local bending; the Frenet frame (T, N, B) is the moving orthonormal basis. Full computation deferred to `math.geom.curvature` and `math.geom.frenet-serret`.

## Mental Models

- **Particle on a wire**: imagine a bead sliding along a curved wire in 3D. **r**(t) gives the bead's position at time t. **r**′(t) is the bead's velocity vector (direction and speed). T(t) is the direction the bead is moving, regardless of how fast. The wire itself — the set of all positions — is the curve; the parametrization **r**(t) is one way of traversing that wire.
- **Arc length as odometer**: the integral ∫|**r**′(t)| dt is an odometer reading — it counts the total physical distance traveled along the curve, regardless of how fast. A reparametrization by arc length sets the "speedometer" to read exactly 1 everywhere — constant-speed traversal.
- **Unit tangent as direction compass**: T(t) is like a compass needle pointing in the instantaneous direction of motion. The speed (magnitude of velocity) affects how fast the needle moves from point to point, but not where it points at any given moment. Curvature (the next concept) will measure how fast the needle rotates.

## Why Students Fail

Students confuse the velocity vector **r**′(t) with the unit tangent T(t) — they omit the normalization step and report a non-unit vector as the tangent. Students also misunderstand reparametrization by arc length as a simple substitution (replacing t with s everywhere in the formula), when it requires first computing s(t) and then inverting it, which is often impossible in closed form. The transition from 2D parametric curves to 3D vector-valued functions is sometimes obstructed by students who treat the third component z(t) as fundamentally different from x(t) and y(t), when it is exactly analogous.

## Misconceptions

### MC-1 — VELOCITY-EQUALS-UNIT-TANGENT
**Birth type**: Type 5 (instruction-induced — in 2D parametric curves, the "tangent vector" is sometimes introduced as (x′(t), y′(t)) without stressing that this is only the direction when normalized)
**Mechanism**: Students compute **r**′(t) and report it as the unit tangent without dividing by |**r**′(t)|. This error is catastrophic for arc-length-parametrization work, since the central property |d**r**/ds| = 1 requires genuine unit vectors.
**Diagnostic probe**: "For **r**(t) = (cos t, sin t, t), compute the unit tangent at t = 0." — watch for T = (−sin t, cos t, 1)|_{t=0} = (0, 1, 1) (unnormalized) instead of (0, 1, 1)/√2 = (0, 1/√2, 1/√2) (correct).
**Characteristic phrases**: "The tangent vector is **r**′(t)" / "The tangent is (0, 1, 1) — I don't need to normalize."

### MC-2 — ARC-LENGTH-PARAMETRIZATION-IS-JUST-RELABELING
**Birth type**: Type 5 (instruction-induced — students are told "replace t with s" without understanding that this requires an invertible change of variables s = s(t), which must be computed and then inverted)
**Mechanism**: Students substitute s for t in the formula **r**(t) and declare the curve "reparametrized by arc length." They do not check that the result satisfies |d**r**/ds| = 1, and when they fail the check, they do not understand why.
**Diagnostic probe**: "Reparametrize **r**(t) = (3t, 4t) by arc length." — watch for **r**(s) = (3s, 4s) (simple substitution) versus the correct computation: |**r**′(t)| = 5, so s = 5t, t = s/5, and **r**(s) = (3s/5, 4s/5) with |d**r**/ds| = |(3/5, 4/5)| = 1. ✓
**Characteristic phrases**: "I just replace t with s" / "Isn't the arc-length parametrization just the same curve with s instead of t?"

### MC-3 — Z-COMPONENT-TREATED-DIFFERENTLY
**Birth type**: Type 3 (language contamination — 2D thinking is deeply ingrained; the z-component feels like an "extra" dimension with different rules)
**Mechanism**: Students differentiate x(t) and y(t) correctly but forget or mishandle z(t), treating the 3D velocity as a 2D vector with an awkward third piece. This shows up in arc length computations (forgetting z′(t)² under the square root) and in dot-product calculations.
**Diagnostic probe**: "Compute |**r**′(t)| for **r**(t) = (t², 2t, 2)." — watch for √(4t² + 4) (omitting the z′ = 2 term, so no 4 in the sum) instead of the correct √(4t² + 4 + 4) = √(4t² + 8).
**Characteristic phrases**: "The z part doesn't change much so I ignored it" / "The magnitude is just √(x′² + y′²)."

## Analogies

- **GPS track elevation**: a GPS track records latitude, longitude, and altitude as functions of time — (x(t), y(t), z(t)). The track is a space curve. The speed shown on your fitness app is |**r**′(t)|; the total distance "odometer" reading is ∫|**r**′(t)| dt. Reparametrizing by arc length would give you a "position as function of distance traveled" description — more natural for planning a route than a time description.
- **Roller coaster**: a roller coaster track is a space curve. The car's position is **r**(t); the unit tangent T(t) points in the direction the car is moving at each instant. The curvature κ (next concept) tells you how sharply the track bends — which is exactly what riders feel. Arc length is the track's total length from the start.

## Demonstrations

1. **Helix**: **r**(t) = (cos t, sin t, t). Compute **r**′(t) = (−sin t, cos t, 1). Compute |**r**′(t)| = √(sin²t + cos²t + 1) = √2. Compute T(t) = (−sin t, cos t, 1)/√2. Arc length from 0 to 2π: L = ∫₀²π √2 dt = 2π√2 (the helix completes one full revolution while rising by 2π units; the actual path length is longer than 2π by the factor √2).
2. **Arc-length reparametrization of a line**: **r**(t) = (3t, 4t). |**r**′(t)| = 5. s(t) = 5t → t(s) = s/5. **r**(s) = (3s/5, 4s/5). Check: |d**r**/ds| = |(3/5, 4/5)| = √(9/25 + 16/25) = 1. ✓ This shows all three steps explicitly and verifies the unit-speed property.
3. **Curvature orientation**: for the helix from Demo 1, T′(t) = (−cos t, −sin t, 0) and |T′(t)| = 1. Since ds/dt = √2, κ = |T′(t)|/|**r**′(t)| = 1/√2 (a constant — a helix has constant curvature). Note: full curvature computation comes in `math.geom.curvature`; here it is orientation only.

## Discovery Questions

- "Two different parametrizations of the same circle — one traversed at constant speed, one at variable speed — will give different velocity vectors at the same geometric point. But will they give the same unit tangent vector? Why or why not?"
- "For a straight line **r**(t) = **p** + t**d**, what is the curvature? What does κ = 0 mean geometrically?"
- "Can a space curve have zero curvature everywhere and still be non-straight? Why or why not?"

## Teaching Sequence

1. Recall `math.calc.parametric-curves`: position as (x(t), y(t)), direction of travel, arc length in 2D.
2. Recall `math.geom.vectors-3d`: 3D component vectors, magnitude, unit vectors.
3. Fuse them: **r**(t) = (x(t), y(t), z(t)) as a vector-valued function tracing a space curve.
4. Define velocity **r**′(t); compute for a helix.
5. Distinguish unit tangent T(t) from velocity; emphasize normalization.
6. Define arc length integral; compute for the helix.
7. Define arc-length reparametrization; work through the line example explicitly.
8. Introduce curvature κ and the Frenet frame as orientation — connect to the child concepts `math.geom.curvature` and `math.geom.frenet-serret`.
9. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: velocity-vs-unit-tangent distinction — drill normalization explicitly on every example.
- **Blueprint Teaching Action A02**: arc length integration — compute for helix; stress that z′ contributes exactly as x′ and y′ do.
- **Blueprint Teaching Action A03**: arc-length reparametrization — full three-step procedure on the line example.
- **MC-1 intervention**: side-by-side display of **r**′(t) and T(t) = **r**′(t)/|**r**′(t)|; require the student to compute both for every tangent-vector problem.
- **MC-3 intervention**: write the 3D magnitude formula explicitly with all three components before every arc-length integral; never allow √(x′² + y′²) as the speed for a 3D curve.

## Voice Teaching Notes

- Say "velocity vector **r**-prime of t" and "UNIT tangent vector capital T of t" — using "unit" every single time prevents MC-1.
- When computing arc length in 3D, verbalize: "x′ squared, plus y′ squared, plus z′ squared — three terms, not two."
- Latency signal: a student who starts arc-length integration without writing out |**r**′(t)|² with all three components explicitly is at risk for MC-3; prompt with "write out all three squared terms before taking the square root."

## Assessment Signals

- **Entry check**: compute (d/dt)(sin t, cos t) and |sin t, cos t, 1| (confirms both prerequisites).
- **Unit tangent probe**: for **r**(t) = (t, t², t³), compute T(t) at t = 0.
- **Arc length probe**: compute the arc length of the helix **r**(t) = (cos t, sin t, t) from t = 0 to t = 4π.
- **Reparametrization probe**: reparametrize **r**(t) = (5 cos t, 5 sin t) by arc length and verify |d**r**/ds| = 1.
- **Mastery gate**: 4/5 problems including one unit-tangent computation and one arc-length integral with a nonzero z-component.

## Tutor Recovery Strategy

- **MC-1 (velocity = unit tangent)**: compute both for a concrete example and show that |**r**′(t)| ≠ 1 in general. State: "T(t) is the UNIT tangent — always normalized. **r**′(t) is the velocity — its length is the SPEED, not 1." Make normalization a required step that is explicitly written every time.
- **MC-2 (reparametrization as relabeling)**: work the line example. "After substituting t = s/5 into **r**(t), verify |d**r**/ds| = 1. If you just relabeled t as s without computing, this verification would fail — the relabeled curve has speed 5, not 1." The verification step exposes the misconception.
- **MC-3 (missing z term)**: draw the 3D distance formula: |**v**| = √(v₁² + v₂² + v₃²). Circle the v₃² term. "There are THREE components — three squared terms. Missing one gives the WRONG speed and the WRONG arc length."

## Memory Hooks

- **Velocity vs. unit tangent**: "velocity = direction AND speed; unit tangent = direction ONLY."
- **Arc length**: "integrate the speed" — L = ∫|**r**′(t)| dt is literally the distance formula for a curve, the same as "distance = speed × time" summed up.
- **Reparametrization**: "arc length parametrization = constant speed = odometer ticks steadily."

## Transfer Connections

- `math.geom.curvature`: takes the unit tangent T(t) developed here and measures how quickly it rotates — giving the computable curvature formula κ(t) = |**r**′ × **r**″| / |**r**′|³.
- `math.geom.frenet-serret`: extends the unit tangent T to a full moving frame (T, N, B) and encodes all local geometry via the Frenet-Serret differential equations.
- `math.geom.differential-geometry-surfaces`: extends the single-parameter curve **r**(t) to two-parameter surfaces **r**(u, v), using partial derivatives instead of ordinary derivatives.

## Cross-Subject Connections

- Physics: a particle's trajectory is a space curve; **r**′(t) is velocity, **r**″(t) is acceleration, |**r**′| is speed. Arc length is distance traveled. Curvature of the trajectory (next concept) appears in the normal force in circular/curved motion and in the centripetal acceleration formula.
- Robotics: robot arm end-effector trajectories are space curves; arc-length parametrization is used to produce constant-speed motion along a planned path, independent of how the arm was originally time-parametrized.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.differential-geometry-curves.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO5), misconceptions MC-1 (velocity vs. unit tangent), MC-2 (arc-length reparametrization), MC-3 (z-component).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.differential-geometry-curves:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.differential-geometry-curves:PROBE:en` (DRAFT, live-capture; probes should target MC-1 normalization, MC-2 reparametrization, MC-3 3D speed formula)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03

## Identity

- **KG ID**: `math.geom.polar-curves`
- **Name**: Polar Curves
- **Domain**: Geometry
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.70
- **Estimated hours**: 6
- **Requires**: `math.geom.polar-coordinates`
- **Unlocks**: (none in current KG)
- **Cross-links**: (none in KG)

## Learning Objective

Given a polar equation r = f(θ), the student:

(a) plots the curve by computing (r, θ) pairs and marking each point, correctly handling negative r values;  
(b) recognizes the key polar curve families by equation form: cardioid, rose curve, lemniscate, and Archimedean spiral;  
(c) determines the number of petals of a rose curve r = a cos(nθ) or r = a sin(nθ) — n petals if n is odd, 2n petals if n is even;  
(d) symmetry-tests a polar curve about the polar axis, the line θ = π/2, and the origin before plotting;  
(e) converts a polar equation to Cartesian form using x = r cos θ, y = r sin θ, r² = x² + y².

## Core Understanding

A **polar curve** is defined by r = f(θ) — for each angle θ, the function gives the radial distance. To plot: compute r at a sequence of θ values, mark each (r, θ) point on the polar grid.

**Key families**:
- **Cardioid**: r = a(1 ± cos θ) or r = a(1 ± sin θ) — a heart-shaped single loop. The dimple points toward the pole when "−" is used.
- **Rose curve**: r = a cos(nθ) or r = a sin(nθ) — n petals if n is odd; 2n petals if n is even.
- **Lemniscate**: r² = a² cos(2θ) — a figure-eight centered at the origin.
- **Archimedean spiral**: r = aθ — the radius grows linearly with angle; the coils are equally spaced.

**Negative r in curve tracing**: when f(θ) < 0, the point (r, θ) is plotted in the direction θ + π at distance |r|. This is NOT an error — it is normal and produces curves with petals "behind" the expected direction.

**Rose curve petal count**: the non-obvious rule. For r = cos(nθ):
- n odd → n petals (each in [0, π] range of θ suffices)
- n even → 2n petals (full [0, 2π] needed, each direction traced twice)

## Mental Models

- **Antenna pattern**: radio engineers plot the gain of an antenna as a function of direction — producing polar rose patterns showing where the signal is strongest. The pattern r = cos(2θ) (4-petal rose) means the antenna radiates strongly in four directions. Polar curves are literally the visual language of directionality.
- **Spirograph toy**: the Spirograph toy produces curves by rolling a small circle inside or outside a large circle. The resulting curves (hypotrochoids and epitrochoids) are close relatives of rose curves and cardioids — polar coordinates make their equations simple; Cartesian equations for the same curves are unwieldy.
- **Unfolding the curve**: trace a rose curve by slowly increasing θ from 0 to 2π and watching which petals appear when. This "unfolding" view shows WHY the petal count depends on parity — for odd n, each petal appears once in [0, π] and then is retraced in [π, 2π]. For even n, a new set of petals appears in [π, 2π].

## Why Students Fail

Students forget to account for negative r when tracing polar curves, misplotting "missing" petals of rose curves (the negative-r petals land on the opposite side of the origin). The rose curve petal-count rule is often inverted — students guess n petals for even n (getting 2n wrong). Students also try to plot too few (r, θ) pairs and draw the curve incorrectly because the smooth shape between sample points is not obvious.

## Misconceptions

### MC-1 — NEGATIVE-R-MEANS-NO-POINT
**Birth type**: Type 2 (perceptual intuition — r was always non-negative when describing specific points in `math.geom.polar-coordinates`; in curve tracing, negative values arising from f(θ) are treated as "outside the domain")
**Mechanism**: When tracing r = cos(2θ) and arriving at θ values where cos(2θ) < 0 (giving negative r), students skip these values or treat them as undefined. This causes the curve to appear as a 2-petal rose instead of the correct 4-petal rose — the negative-r petals are omitted.
**Diagnostic probe**: "Trace r = cos(2θ) for θ from 0 to 2π. Plot r at θ = π/4, π/2, 3π/4, π." At θ = π/2, r = cos(π) = −1 — watch for students skipping this point rather than plotting it at (1, 3π/2) (the point at distance 1 in direction π/2 + π = 3π/2).
**Characteristic phrases**: "r can't be negative, so I skip those values" / "The curve just isn't there when r is negative."

### MC-2 — ROSE-PETAL-COUNT-EQUALS-N
**Birth type**: Type 2 (perceptual intuition — n in r = cos(nθ) looks like it directly controls the number of petals; the factor-of-2 for even n is non-obvious without exploring the curve)
**Mechanism**: Students apply the rule "n petals always" without distinguishing odd and even n. For r = cos(2θ), they expect 2 petals but find 4. The actual pattern (odd → n petals, even → 2n petals) is a genuine mathematical fact that requires derivation or at least careful numerical exploration to internalize.
**Diagnostic probe**: "How many petals does r = 4 cos(4θ) have?" — watch for "4" rather than the correct "8."
**Characteristic phrases**: "It has n petals because n = 4" / "The n just tells you the number of petals."

### MC-3 — POLAR-SYMMETRY-SAME-AS-CARTESIAN-SYMMETRY
**Birth type**: Type 3 (language contamination — "symmetric about the x-axis" has a specific meaning in Cartesian coordinates; polar symmetry tests look different but students apply Cartesian intuitions)
**Mechanism**: In Cartesian coordinates, a curve is symmetric about the x-axis if replacing y with −y gives the same equation. In polar, replacing θ with −θ (equivalent to reflecting about the polar axis, which corresponds to the positive x-axis) is the correct test. Students apply Cartesian symmetry arguments incorrectly to polar equations.
**Diagnostic probe**: "Is r = cos(θ) symmetric about the polar axis? How do you test this?" — watch for "I check if x appears only even powers" (Cartesian thinking) rather than "I replace θ with −θ: cos(−θ) = cos(θ), same equation — yes, symmetric."
**Characteristic phrases**: "I replace x with −x" / "It's symmetric because there's no y term."

## Analogies

- **Petals of a flower**: a rose curve r = cos(nθ) produces n or 2n mathematically precise "petals" radiating from the origin — the name is apt. Florists know that different flower varieties have different petal counts; mathematicians know that different n values produce different petal counts, with the odd/even rule determining the pattern.
- **Watching a second hand**: a clock's second hand sweeps at constant angular speed (constant rate of θ increase). Different polar curves are like differently shaped orbits — for a circle r = 1, the hand traces a perfect circle; for a cardioid r = 1 + cos θ, the hand traces a heart-shaped path as it sweeps around.

## Demonstrations

1. **Cardioid by table**: trace r = 1 + cos θ at θ = 0, π/6, π/3, π/2, 2π/3, π, 4π/3, 3π/2, 2π. Mark each (r, θ) point on the polar grid; connect with a smooth curve. The "dimple" at θ = π (where r = 0) is the pole.
2. **Rose curve petal count**: plot r = cos(2θ) (expected: 4 petals) and r = cos(3θ) (expected: 3 petals). In r = cos(2θ), at θ = π/4 the r = 0 (end of petal); at θ = π/2, r = −1 (a point plotted at distance 1 in direction 3π/2 — this IS the third petal). Counting petals: explicitly follow the curve for one full revolution and mark each petal as it appears.
3. **Lemniscate**: r² = 4 cos(2θ). Show that r is only defined where cos(2θ) ≥ 0 (i.e., θ ∈ [−π/4, π/4] ∪ [3π/4, 5π/4]). Plot the figure-eight shape. Compare the Cartesian form: (x² + y²)² = 4(x² − y²).

## Discovery Questions

- "For which values of θ does a cardioid r = 1 + cos θ pass through the origin? What does passing through the origin look like on a polar curve?"
- "Does the Archimedean spiral r = θ have any symmetry? Explain."
- "What is the difference between the curves r = cos(3θ) and r = |cos(3θ)|? Sketch both."

## Teaching Sequence

1. Recall polar coordinates from `math.geom.polar-coordinates`: plotting (r, θ), handling negative r.
2. Define a polar curve r = f(θ): a curve traced by varying θ and plotting the resulting (r, θ) points.
3. Trace a simple circle r = 2 and the polar line θ = π/4 as warm-up cases.
4. Trace a cardioid by table; connect the dots; observe the distinctive heart shape.
5. Introduce the rose curve family; derive the petal count rule for n = 1, 2, 3.
6. Introduce the lemniscate and Archimedean spiral by equation form recognition.
7. Address negative-r curve tracing explicitly with a 4-petal rose example.
8. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: point-by-point tracing with explicit negative-r handling — make a table with r-positive and r-negative regions labeled.
- **Blueprint Teaching Action A02**: curve-family recognition — present the cardioid, rose, lemniscate, and spiral equation forms side by side.
- **MC-1 intervention**: before any curve tracing, re-establish the negative-r rule from `math.geom.polar-coordinates`: "negative r means plot in the opposite direction at the positive distance." Then show a 4-petal rose with and without negative-r points to show what is lost.
- **MC-2 intervention**: trace r = cos(2θ) explicitly, counting petals as they appear. State the rule after discovering it empirically: "for even n, the second half of the θ range fills in a SECOND set of n petals, giving 2n total."

## Voice Teaching Notes

- Always say "which family does this equation belong to?" before attempting to plot — recognition saves time and avoids blind point-plotting.
- When a student computes a negative r during tracing: "negative r means go the OPPOSITE direction — plot it at angle θ + 180° instead. The curve goes there."
- Latency signal: a student who gets fewer petals than expected on a rose curve is almost certainly showing MC-1 (skipping negative r); prompt with "what does a negative r value mean when tracing?"

## Assessment Signals

- **Entry check**: plot (3, −π/4) and (−2, π/3) on a polar grid (confirms `math.geom.polar-coordinates` prerequisite including negative r).
- **Family recognition probe**: name the curve family for r = 3(1 + sin θ), r² = 4 cos(2θ), r = 2θ, r = 5 sin(3θ).
- **Petal count probe**: state the number of petals for r = sin(6θ) and for r = cos(5θ).
- **Tracing probe**: trace r = 1 + 2 cos θ (a limaçon with an inner loop) at 8 values of θ, marking all negative-r points correctly.
- **Mastery gate**: 4/5 problems including one rose curve with even n and one negative-r tracing problem.

## Tutor Recovery Strategy

- **MC-1 (skipping negative r)**: return to the polar coordinate definition of negative r. Trace r = cos(2θ) side by side with the student, computing r at θ = π/4, π/2, 3π/4. At π/2, r = −1. Ask: "where does (−1, π/2) go?" Answer: "(1, 3π/2)" — that is, 1 unit in the direction pointing DOWN. Draw it. Now the fourth petal appears.
- **MC-2 (petal count)**: give the rule, then verify it for n = 2, 3, 4 by tracing. Make a table: "n = 2 (even) → 4 petals; n = 3 (odd) → 3 petals; n = 4 (even) → 8 petals." Pattern: "odd → n petals; even → 2n petals."
- **MC-3 (Cartesian symmetry test)**: write the polar symmetry tests explicitly: "replace θ with −θ for symmetry about polar axis." Drill two examples before returning to the original problem.

## Memory Hooks

- **Rose petal count**: "odd n = n petals; even n = double the petals (2n)."
- **Negative r in tracing**: "negative r = U-turn at that angle."
- **Cardioid**: "cardioid = heart-shaped; comes from 'cardio' (heart)."

## Transfer Connections

- `math.geom.polar-coordinates`: polar curves directly extend polar coordinate plotting from individual points to entire curve families. Every technique from that concept — including negative r and non-uniqueness — applies here.
- `math.calc.parametric-curves`: a polar curve r = f(θ) can be written parametrically as (f(θ) cos θ, f(θ) sin θ) — connecting polar curve analysis to parametric differentiation and arc-length integration methods.

## Cross-Subject Connections

- Physics/Engineering: polar curves describe radiation patterns, antenna gain, far-field diffraction patterns, and gravitational potential equicurves. Rose patterns specifically model multi-lobe antenna designs where signal is concentrated in particular directions.
- Signal processing: the polar plot of a transfer function (Nyquist diagram) shows system stability — it is a polar curve in the complex-frequency plane where the engineer reads closed-loop stability from whether the curve encircles a particular point.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.polar-curves.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (negative r), MC-2 (petal count), MC-3 (symmetry test).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.polar-curves:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.polar-curves:PROBE:en` (DRAFT, live-capture; probes should target MC-1 negative-r plotting, MC-2 petal count, family recognition)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03

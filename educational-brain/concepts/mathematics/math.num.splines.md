# math.num.splines

## Identity
- **KG id**: `math.num.splines`
- **Domain**: math.num
- **Requires**: `math.num.interpolation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Write $C^0$, $C^1$, $C^2$ continuity conditions at interior knots and count the $4n$ equations
for a natural cubic spline; explain why higher smoothness is NEVER always better — matching
smoothness to the application, NEVER defaulting to maximum; recognize splines avoid Runge's
phenomenon by piecewise LOW-degree fitting; and distinguish interpolating splines (pass through
data) from approximating splines (B-splines, control points NEVER interpolation points).

## Core Understanding
HIGHER SMOOTHNESS IS NEVER ALWAYS BETTER — MATCH IT TO THE APPLICATION: $C^0$ piecewise-linear
connects data with straight lines — fast, simple, robust, error $O(h^2)$. $C^2$ natural cubic is
visually smoother but costs a global tridiagonal solve and requires enough data per piece. For
1000 NOISY measurements, a $C^2$ natural cubic spline passes through EVERY noisy point exactly —
the curve WIGGLES as much as the noise. Always imposing $C^2$ conditions even when $C^1$ or
$C^0$ suffices, adding unnecessary complexity and potentially forcing an over-fit to noise, is
WRONG — the correct smoothness level MATCHES the application: exact data warrants $C^2$
interpolation, noisy data warrants a smoothing approximation instead.

SPLINES AVOID RUNGE'S PHENOMENON BY FITTING PIECEWISE LOW-DEGREE POLYNOMIALS — NEVER ONE
HIGH-DEGREE GLOBAL FIT: a degree-10 global Lagrange interpolant through equally spaced points of
$1/(1+25x^2)$ has maximum error $\approx10^{-3}$; degree-20 error $\approx0.3$; degree-40 error
$>10$ — WORSE with more points. A natural cubic spline on the SAME points: error $\le Ch^4$ —
STABLE and convergent. Each cubic piece only "knows about" the data at its two endpoints (plus
knot continuity) — it has NO incentive to pass through far-away data, unlike the global polynomial
which must honor ALL points simultaneously. Splines avoid Runge's phenomenon precisely because
they are piecewise LOW-degree (typically cubic), never because of some other unrelated property.

B-SPLINE CONTROL POINTS ATTRACT THE CURVE — THEY ARE NEVER INTERPOLATION POINTS: for a quadratic
Bezier curve with control points $P_0=(0,0)$, $P_1=(1,2)$, $P_2=(2,0)$:
$B(t)=(1-t)^2P_0+2t(1-t)P_1+t^2P_2$. At $t=0$: $B=P_0$; at $t=1$: $B=P_2$; but at $t=\frac12$:
$B=\frac14P_0+\frac12P_1+\frac14P_2=(1,1)\ne P_1$ — the curve does NOT pass through $P_1$.
Believing B-splines and Bezier curves pass exactly through their control points confuses the
INTERPOLATING framework (curve passes through every data point) with the APPROXIMATING framework
(control points are WEIGHTS in a weighted average that pull the curve toward them without
touching it) — moving a control point changes a weight, never a point the curve is forced through.

## Mental Models
- **"Smoothness is a dial to set for the job — maximum smoothness (C²) isn't automatically the
  right setting, especially for noisy data."**
- **"A spline is many small, well-behaved polynomial pieces — never one big polynomial straining
  to honor every point at once, which is exactly what causes Runge's phenomenon."**
- **"A control point is a magnet pulling the curve nearby — never a point the curve is forced
  through."**

## Why Students Fail

### MC-1: MORE-SMOOTHNESS-ALWAYS-BETTER
- **Surface form**: always imposes $C^2$ conditions even when $C^1$ is sufficient, adding
  unnecessary complexity and potentially over-constraining the system.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — textbook examples
  always feature the most refined spline; students infer maximum smoothness is always optimal).
- **Repair**: re-present the 1000-noisy-measurements counter-example, confirming a $C^2$
  interpolating spline would wiggle with the noise, while a smoother approximation is more
  meaningful.

### MC-2: SPLINE-CONTROL-POINTS-ARE-INTERPOLATION-POINTS
- **Surface form**: believes B-splines and Bezier curves pass exactly through their control
  points, confusing the interpolating and approximating frameworks.
- **Birth type**: language contamination (Blueprint's own declared birth type — all splines are
  described as "fitting a curve through points"; the distinction between weights and constraints
  is never emphasized).
- **Repair**: re-derive the quadratic Bezier curve's midpoint value, confirming it does not equal
  the middle control point.

### MC-3: PIECEWISE-LINEAR-IS-NOT-A-SPLINE
- **Surface form**: does not recognize piecewise-linear interpolation as the simplest $C^0$
  spline, and cannot extend the spline framework to linear pieces.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — splines are
  introduced via cubic splines for visual smoothness; piecewise-linear is treated as a naive
  method, not a degenerate spline family member).
- **Repair**: re-count the piecewise-linear conditions explicitly ($2n$ unknowns, $2n$ equations),
  confirming it fits the same spline framework at degree 1.

## Misconceptions

### MC-1: MORE-SMOOTHNESS-ALWAYS-BETTER
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: SPLINE-CONTROL-POINTS-ARE-INTERPOLATION-POINTS
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-3: PIECEWISE-LINEAR-IS-NOT-A-SPLINE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A flexible ruler bent through data points is a physical spline — piecewise smooth with
  continuous curvature, never one rigid rod strained to touch every point."**
- **Anti-analogy**: a B-spline control polygon isn't a dot-to-dot picture — the curve floats near
  the polygon's shape, like a magnet's pull, never snapping onto each vertex.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the 1000-noisy-point $C^2$-wiggles-with-noise counter-
  example.
- **Demonstration 2**: the degree-10/20/40 Lagrange-versus-cubic-spline Runge's-phenomenon
  comparison.
- **Demonstration 3 (targets MC-2)**: the quadratic Bezier curve's midpoint-value derivation.

## Discovery Questions
1. "Should you always impose the maximum smoothness (C²) on a spline, regardless of the data?"
2. "Does a spline avoid Runge's phenomenon because of its degree, or some other property?"
3. "Does a B-spline curve pass through its control points?"

## Teaching Sequence
1. **Representation shift**: the four-representation cubic-spline derivation (physical, algebraic,
   conditions table, smoothness comparison), setting up the condition-counting groundwork.
2. **Pattern induction**: the spline-gallery-from-coarse-to-refined comparison, working
   Demonstration 2.
3. **Contrast pair**: the interpolating-versus-approximating-spline distinction, working
   Demonstration 3, isolating MC-2.
4. **Reused procedure**: the smoothness-matching-application demonstration, working Demonstration
   1, isolating MC-1; and the piecewise-linear-as-simplest-spline reframing, isolating MC-3.
5. **Mastery gate**: require a correct condition count for a natural cubic spline, a correct
   explanation of Runge's-phenomenon avoidance, and a correct interpolating-versus-approximating
   distinction, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept maximum smoothness imposed by default regardless of the application or data
  quality.
- Never accept a claim that B-spline or Bezier control points lie on the curve except where
  explicitly true (endpoints).
- Never accept piecewise-linear interpolation excluded from the spline framework.

## Voice Teaching Notes
- Say "does this data warrant maximum smoothness, or would that just fit the noise?" whenever a
  spline's smoothness class is chosen.
- Ask "does the curve actually pass through that control point, or just get pulled toward it?"
  whenever B-spline or Bezier control points are discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly counts the $4n$ conditions for a natural cubic
  spline.
- **Rung 2 (application)**: learner correctly explains why a cubic spline avoids Runge's
  phenomenon where a high-degree global polynomial does not.
- **Rung 3 (transfer)**: learner correctly distinguishes an interpolating spline from a B-spline
  approximation for a noisy sensor-data scenario, justifying the choice.

## Tutor Recovery Strategy
- If MC-1 recurs, re-present the noisy-data over-fitting counter-example.
- If MC-2 recurs, re-derive the Bezier curve's midpoint value.
- If MC-3 recurs, re-count the piecewise-linear conditions explicitly.

## Memory Hooks
- "Match smoothness to the job — C² isn't automatically best, especially with noise."
- "Splines avoid Runge's phenomenon via piecewise low degree — never a global high-degree fit."
- "Control points are magnets, never waypoints the curve must touch."

## Transfer Connections
- `math.num.interpolation` (already authored, this campaign, Batch 202): supplies the polynomial
  interpolation framework (Lagrange basis, Runge's phenomenon) this concept directly extends to
  piecewise construction.

## Cross-Subject Connections
- CAD/CAM design: B-spline and Bezier curves with control-point manipulation are the standard
  representation for smooth, editable shapes in computer-aided design software.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.splines.md`, reused by reference for
  its four-representation cubic-spline derivation, its spline gallery, its interpolating-versus-
  approximating contrast, and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on periodic spline boundary
  conditions and the curvature-minimization property proved via integration by parts.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.num.interpolation`, unlocks none, cross_links none, proficient/apply, mastery_threshold
  0.8, estimated_hours 5) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 220): authored. Second entry this batch. Companion batch concept:
  `math.num.numerical-integration`.

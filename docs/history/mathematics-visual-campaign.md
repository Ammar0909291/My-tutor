# Mathematics visual campaign (2026-10-11, owner instruction: "Run one batch of 12 Mathematics visuals first. Show me also every visual.")

Mathematics content work was paused (CLAUDE.md); this batch runs on that explicit fresh instruction. It is a **pilot**: one batch of
12 to measure how much work a batch is, before the owner decides on the rest.

## Why Mathematics, and the measurement behind it

A local audit over all 908 Mathematics KG concepts, calling the real registry functions (`lookupConceptVisualBinding`,
`getConceptSceneGenerator`, `CONCEPT_SCENE_OVERRIDES`; no network, no DB), on main at `4432627a`:

- 47 of 908 concepts (5%) had a fixed figure before this batch.
- By my own tiering (a per-domain rule list written for the audit, spot-checked on 45 random concepts; treat the totals as about ±10%):
  about 346 concepts are ESSENTIAL (their meaning is spatial or graphical), about 210 HELPFUL, about 352 need no figure.
- 45 of the 346 essential concepts were covered; about 301 were not.
- Wrong stock figures were removed on 2026-10-07 (`532055ec`, MATH-010/011/012/025), so most Mathematics lessons now show
  NO figure. That is the safe behaviour; this campaign adds correct ones.

## What this batch adds (new module `sceneGenerators/mathCoreScenesB1.ts`)

Twelve core-level concepts (developing / proficient), six domains, each a figure that draws what the concept's KG
description defines. Numbers are computed, not eyeballed; `mathCoreScenesBatch1.test.ts` re-derives each one.

| Concept | Figure |
|---|---|
| math.geom.pythagorean-theorem | 3-4-5 triangle with a square on each side cut into unit cells: 9 + 16 = 25 |
| math.geom.slope | line through two points, run 3 (red), rise 2 (blue), m = 2/3; a falling line has m < 0 |
| math.geom.parabola | y = x²/4: PF = PD = 3.25 at P, QF = QD = 2 at Q (focus, directrix, vertex) |
| math.geom.circle-equation | circle centre (1, 1), r = 5; legs 4 and 3 give (x − 1)² + (y − 1)² = 25 |
| math.func.graph-of-function | the graph is the set of points (x, f(x)); vertical line test: U passes, circle fails |
| math.func.inverse-functions | f(x) = x³/4 and its mirror image across y = x; (a, b) ↔ (b, a) |
| math.func.domain-range | √(9 − x²): domain −3..3 on the x-axis, range 0..3 on the y-axis |
| math.alg.system-linear-equations | y = x + 1 and y = −½x + 4 cross at (2, 3); parallel = none, same line = infinitely many |
| math.linalg.determinant | unit square becomes a parallelogram of area det = 2·2 − 1·1 = 3 |
| math.linalg.eigenvalues | A = [3 1; 1 3]: v₁ → 4v₁, v₂ → 2v₂ keep direction; an ordinary vector turns |
| math.prob.conditional-probability | 50 outcomes, |B| = 25, |A ∩ B| = 9, so P(A \| B) = 9/25 = 0.36 |
| math.prob.normal-distribution | bell with ±1σ / ±2σ / ±3σ bands: 68.3% / 95.4% / 99.7% (from erf) |

Files: the new module, `mathCoreScenesBatch1.test.ts` (96+ checks), and 13 added lines in `conceptSceneParams.ts` (one import, twelve
registrations next to the existing math entry). Nothing else is touched.

## Two things worth knowing

1. **`math.linalg.vector-addition` is the designated AI canary concept** (`visualCanaryConcept.test.ts`) and must stay figure-less so
   live generation is the only way it can ever produce one. A first draft gave it a figure and broke six canary tests; it was
   replaced in this batch by Equation of a Circle. Do not add a figure for it.
2. Figures are framed with `framed()` (camera pulled in to the same 78% fill target `layout.ts` uses), since these flat 2-D graphs span
   less than the ±5 canvas.

## How each figure was checked

- `resolveVisual` serves each at concept scope, both on an ordinary turn and on "show me a diagram" (the test asserts this).
- Rendered in Chromium through the real renderer (`/dev/physics-audit?concept=…`, which resolves any concept) at 1280 px and 390 px,
  and looked at. Two rounds of layout fixes came out of that: labels the label solver moved away from their object (normal
  distribution brackets, conditional probability, parallel-lines inset), a label detached from its dot (graph of a function,
  circle), and crowded vectors (eigenvectors).
- Not done in this pilot: the full rendered-figure audit with the freshness gate that Physics, Chemistry and Biology have
  (`physicsVisualAudit.test.ts` pattern), light-theme renders, and production verification on the deployed app.

## Pace measurement (the point of the pilot)

One session built the 12 figures, their tests, the renders and this note, including the canary detour. See the owner report for
the session-count estimate this gives.


---

# Batch 2 (2026-10-11, owner instruction: "make all remaining Mathematics visuals ... cross check they are 100% correct ... keep me posting each visual")

The pilot's one-batch limit was lifted by that instruction; the campaign now runs batch after batch until the essential tier is covered.

## Re-measured before batch 2 (main at b0ea7445)

`npx tsx scripts/math/visual-coverage.ts` (new, committed): 59 of 908 concepts had a fixed figure after batch 1 (the earlier audit script
mis-read `CONCEPT_SCENE_OVERRIDES`, which is an array of ids, so it undercounted authored figures; the committed script is correct).
Tier E (essential, my own priority tiers in `docs/qa/mathematics-visual-campaign/tiers.json`): 57 of 346 covered, 289 open.

## What batch 2 added (new modules `sceneGenerators/mathSceneKit.ts` + `mathCoreScenesB2.ts`)

Thirteen figures (twelve planned plus one swap, see "Reserved concepts"):

| Concept | Figure |
|---|---|
| math.geom.coordinate-plane | grid with numbered axes, origin, A (3, 2) reached 3 right + 2 up, B (−2, −3) 2 left + 3 down |
| math.geom.quadrants | four quadrants I–IV counter-clockwise, sign pair of each, one example point in each |
| math.geom.midpoint-formula | A (−4, −1), B (2, 3): x-values average to −1, y-values to 1, M (−1, 1), AM = MB |
| math.geom.parallel-lines | two parallel lines + a 60° transversal: corresponding, alternate interior (60°) and co-interior (120° + 60° = 180°) arcs |
| math.geom.pythagorean-converse | 5-12-13 passes 25 + 144 = 169 = 13² (right angle); 5-12-14 fails (169 ≠ 196, angle ≈ 103°) |
| math.geom.parallelogram | area = base × height: cut the triangle at one end and slide it to make a 5 × 3 rectangle |
| math.geom.line-equation | y = 2x + 1 in slope-intercept, point-slope (through (1, 3)) and standard form (2x − y = −1) |
| math.func.quadratic-function | x² − 2x − 3: vertex on x = −b/2a = 1 at (1, −4), roots −1 and 3, y-intercept −3 |
| math.func.vertex-form | y = x², then (x − 2)² + 1 (vertex (2, 1)), then a = −1 flips it to a maximum |
| math.func.exponential-function | 2ˣ through (0, 1), ×2 per step, never reaches 0, and (½)ˣ as the mirror image |
| math.func.logarithmic-function | y = 2ˣ reflected in y = x gives y = log₂ x, only for x > 0 |
| math.func.composition | 3 → g (add 2) → 5 → f (square) → 25, versus 3 → f → 9 → g → 11: the order matters |
| math.func.even-odd-functions | x² even, x³/2 odd, (x² + x)/2 neither, with the matched points that show it |

## How "100% correct" is enforced

`mathCoreScenesBatch2.test.ts` (93 checks) maps the DRAWN coordinates back to maths coordinates and re-derives each claim independently:
every sampled curve point satisfies its equation, every dot sits where its label says, arcs subtend the angle their label states,
drawn side lengths are in the stated ratios, the three printed line forms hold for 6 sample x-values, and so on. All of it must hold on
the figure as rendered, not just in the constants. Each figure was also rendered in Chromium through the real renderer
(`/dev/physics-audit?concept=…`, 1280 px and 390 px) and looked at; layout fixes from that look: labels moved off the curves,
the Converse figure rescaled to stay inside ±5, boxes widened so the composition machine names stay inside them.

## Reserved concepts (do NOT give these a figure without reading this)

- `math.linalg.vector-addition`: the AI canary (`visualCanaryConcept.test.ts`).
- `math.func.linear-function`: four existing tests (`visualApprovedFigureTier`, `visualFigureBreadth`, `visualFigureCritic`,
  `visualGenerationOutcomeStore`) use it as their "uncurated concept" fixture for the AI-generation path. A figure for it made 8 of
  those tests fail in the full run. To release it later: change that constant and the fixture text in those four files to another
  concept first. Equations of Lines (`math.geom.line-equation`) carries the y = mx + b figure instead.

## Handover: how to continue

1. `npx tsx scripts/math/visual-coverage.ts` lists the next essential gaps (the canary is excluded) and the per-domain count.
2. New figures go in the next `sceneGenerators/mathCoreScenesBn.ts` (helpers in `mathSceneKit.ts`; per-step limit is 50 objects,
   `validateSceneSpec`; a "filled" bar cell is one thick `line()`), registered in `conceptSceneParams.ts` under a dated comment,
   with a `mathCoreScenesBatchn.test.ts` that re-derives the maths from the drawn coordinates.
3. Render check: `npx next dev -p 3000`, then a Playwright script that opens `/dev/physics-audit?concept=<id>&fw=1026` (and 316) and
   screenshots `[data-audit-frame]` (Chromium at /opt/pw-browsers, swiftshader args as in the physics audit).
4. Run `npx vitest run visual Scene scene math curriculum` (about 6 minutes) before every push; the full suite takes about 20 minutes.
5. Coordinates stay inside ±5; the camera looks at the origin, so centre each figure's drawn extent on (0, 0).

## Pace

Batch 2 took one working session of roughly 85k tokens including the render rounds and the linear-function discovery.
About 275 essential concepts remain (about 23 more batches of 12) before helpful-tier work.


# Batch 3 (2026-10-11): arithmetic and number sense

New module `sceneGenerators/mathCoreScenesB3.ts`, test `mathCoreScenesBatch3.test.ts` (98 checks). A "filled" bar cell is one thick
cylinder (`fracBar`); the cell outline stays visible because the cylinder is drawn at 56% of the bar height.

| Concept | Figure |
|---|---|
| math.arith.fraction-equivalence | 1/2, 2/4, 4/8 as bars of one length, shaded parts all ending on one line; ad = bc: 1 × 4 = 2 × 2 |
| math.arith.fraction-simplification | 6/8 grouped in pairs (gcd 2) becomes 3/4, same end; gcd(3, 4) = 1 so lowest terms |
| math.arith.fraction-addition | 1/3 and 1/4 re-cut into twelfths (LCM 12): 4/12 + 3/12 = 7/12, guides show the ends do not move |
| math.arith.improper-fractions | 3/3 = 1 whole, 7 thirds over three wholes, 7/3 marked past 2 on a number line |
| math.arith.place-value | 3,482: counters per column (3, 4, 8, 2), worth 3000 + 400 + 80 + 2 |
| math.arith.multiplication | 3 rows of 4 = 12 (4 + 4 + 4), turned to 4 rows of 3 (3 + 3 + 3 + 3) |
| math.arith.division | 13 dots in groups of 4: 3 groups, 1 left over; 3 × 4 + 1 = 13 |
| math.arith.number-base | 13 = 1 ten + 3 ones = 1101 in binary (8 + 4 + 0 + 1); two bars of equal length |
| math.arith.ratios | 2 red : 3 blue, then 4 : 6 and 6 : 9, red ÷ blue = 2/3 every time |
| math.arith.direct-variation | y = 2x through the origin, y ÷ x = 2 at (1, 2), (2, 4), (3, 6) |
| math.arith.inverse-variation | y = 6/x, equal-area rectangles under (2, 3) and (3, 2): x × y = 6 |
| math.arith.percentage-change | 50 → 65 is +30% and 80 → 60 is −25%, each as a fraction of the OLD bar |


# Batch 4 (2026-10-11): elementary geometry and transformations

`sceneGenerators/mathCoreScenesB4.ts` + `mathCoreScenesBatch4.test.ts` (98 checks, every claim re-derived from the DRAWN coordinates).
Naming note: the reflection builder is `buildTransformReflectionScene` because `buildReflectionScene` already exists (optics).

| Concept | Figure |
|---|---|
| math.geom.point | a point (dot + crosshair on the exact spot) against a segment (length) and a square (length and width) |
| math.geom.line | two points fix exactly one line (arrowheads both ways); many lines through A, one through A and B |
| math.geom.line-segment | the part of the line between endpoints, laid against a ruler: AB = 5 |
| math.geom.ray | ray AB (endpoint A, through B, forever) and ray BA, the other way |
| math.geom.plane | three non-collinear points, the sheet through them, extended lines staying in the plane |
| math.geom.perpendicular-lines | two lines at 90°; from P the perpendicular (3) is shorter than slanted segments (5, 5) |
| math.geom.trapezoid | bases 4 and 8, height 3; an upside-down copy makes a 12 × 3 parallelogram (36), so the area is ½(4 + 8)·3 = 18 |
| math.geom.area | 4 × 3 unit squares = 12; right triangle on the same base and height = 6; L-shape 12 + 2 = 14 |
| math.geom.translation | triangle ABC slid by (4, 2): three equal arrows, congruent image, same orientation |
| math.geom.rotation | triangle PQR turned 90° about O: arcs about O, (x, y) → (−y, x), distances from O unchanged |
| math.geom.reflection | mirror line, perpendicular guides bisected by it, image with reversed corner order |
| math.geom.dilation | rays from O, image at k = 2 times the distance, similar triangle, sides ×2 and parallel |


# Batch 5 (2026-10-11): trigonometry and algebra

`sceneGenerators/mathCoreScenesB5.ts` + `mathCoreScenesBatch5.test.ts` (98 checks; tolerances of 0.15 to 0.2 only where the drawn
coordinates are rounded to 0.01 on a steep curve, everything else is exact to the rounding).

| Concept | Figure |
|---|---|
| math.trig.trig-functions | unit circle at 50°: cos and sin legs of P, tan as the height on the tangent line (0.64, 0.77, 1.19) |
| math.trig.pythagorean-identities | cos 0.8, sin 0.6: 0.36 + 0.64 = 1; scaled to adjacent 1: 1 + 0.75² = 1.25² |
| math.trig.law-of-sines | 40-60-80 triangle in its circumcircle: side ÷ sin(opposite) = 10 = 2R each |
| math.trig.law-of-cosines | a = 5, b = 6, C = 60°: c² = 61 − 30 = 31, against the right-angle case 61 |
| math.trig.eulers-formula | e^(iθ) on the unit circle, real part cos θ, imaginary part sin θ, half-turn to −1: e^(iπ) + 1 = 0 |
| math.alg.completing-the-square | x² + 6x as a square plus two 3-wide strips; the 3 × 3 corner (9) makes (x + 3)² |
| math.alg.discriminant | y = x² − 2x + c for c = −3, 1, 4: b² − 4ac = 16, 0, −12 → two roots, one, none |
| math.alg.remainder-theorem | x² − x − 6 ÷ (x − 1): quotient x, remainder −6 = p(1) |
| math.alg.factor-theorem | p(3) = p(−2) = 0 so (x − 3)(x + 2); p(1) = −6 so (x − 1) is not a factor |
| math.alg.polynomial-inequality | cubic sign chart − + − +, solution −1 < x < 1 or x > 3 with open circles at the roots |
| math.alg.rational-expressions | (x² − 9)/(x − 3) = x + 3 with a hole at (3, 6) |
| math.alg.inequality | number-line rays and segments: open circle at 2, filled dot at −1, −1 < x ≤ 3 |

Not done yet and still open for the algebra domain: `math.alg.exponential-function` and `math.alg.logarithm` (the func-domain
exponential and log figures could be registered for them) and `pascals-triangle`, `fundamental-theorem-algebra`, `rational-inequality`.


# Batch 6 (2026-10-11): single-variable calculus

`sceneGenerators/mathCoreScenesB6.ts` + `mathCoreScenesBatch6.test.ts` (110 checks). The generic suite now also runs the repo's own
admission audit (`payloadBlockers`, figureAudit.ts) on every figure: during this batch it rejected two figures that the schema
validator had passed, and the learner would have seen NO figure for them:

- a label containing the word "undefined" is treated as internal-state leakage (ST-04). Say "no value" instead.
- a zero-length `bond` (a Riemann rectangle of height 0) fails ST-07. Skip zero-height sides.

Name collision to remember: `buildContinuityScene` already exists (fluid continuity, physics), so the calculus one is
`buildPointContinuityScene`. `tsc` flags these as duplicate identifiers in conceptSceneParams.ts.

| Concept | Figure |
|---|---|
| math.calc.limits | (x² − 1)/(x − 1) with a hole at (1, 2): both approaches close in on 2 |
| math.calc.one-sided-limits | a jump at x = 1: left limit 1 (open circle), right limit 3 (filled dot), no two-sided limit |
| math.calc.limits-at-infinity | 2 + 1/x sinking to the asymptote y = 2 on the right and rising to it on the left |
| math.calc.continuity | the three conditions at x = 1 on x²/2 + 1/2: f(1) = 1, limit 1, equal |
| math.calc.continuity-types | removable hole, jump, infinite (1/x) in three small panels |
| math.calc.derivative-intro | tangents at P(2, 1) (slope 1) and Q(4, 4) (slope 2) on x²/4 |
| math.calc.derivative-definition | secants with h = 2, 1, 0.5 have slopes 1.5, 1.25, 1.125 → the tangent slope 1 |
| math.calc.differentiability | smooth x², corner |x| (slopes −1 and +1), vertical tangent ∛x |
| math.calc.increasing-decreasing | x³/3 − x coloured by the sign of f′ = x² − 1 |
| math.calc.local-extrema | x⁴/4 − x²: horizontal tangents at the max (0, 0) and minima (±√2, −1) |
| math.calc.concavity | x³/6 above its tangent for x > 0, below for x < 0, inflection at 0 |
| math.calc.riemann-sums | left sums of x²/4 on [0, 4]: n = 4 gives 3.5, n = 8 gives 4.375, exact 16/3 |


# Batch 7 (2026-10-11): single-variable calculus, part 2

`sceneGenerators/mathCoreScenesB7.ts` + `mathCoreScenesBatch7.test.ts` (110 checks). New in this batch: `mathVisualCampaignAudit.test.ts`
runs `validateSceneSpec` + `payloadBlockers` + concept-scope serving over EVERY `math.*` entry in CONCEPT_SCENES, so a future figure
that the admission audit would silently drop fails CI by name. Raise its `toBeGreaterThanOrEqual` count with each batch.

Hatched areas are checked by summing the drawn hatch lines (length ÷ unit × step) against the exact integral. Two figures use a
stretched vertical scale on purpose and say so in their ariaLabel / the test: improper integrals (×3.2) and the Fourier square wave (×1.6).

| Concept | Figure |
|---|---|
| math.calc.mean-value-theorem | x²/4 on [1, 5]: secant slope 1.5 and the parallel tangent at c = 3 |
| math.calc.related-rates | a 5-long ladder, foot at 3 sliding out at 1: x dx/dt + y dy/dt = 0 gives dy/dt = −3/4 (arrows in that ratio) |
| math.calc.linearization | √x and its tangent at 4: error 0.002 at 4.4, 0.25 at 1 |
| math.calc.definite-integral | (x − 1)(x − 3) on [0, 4]: +4/3, −4/3, +4/3, total 4/3 |
| math.calc.ftc-part1 | area under t/2 is A(x) = x²/4, and the slope of A at 3 equals the height f(3) = 1.5 |
| math.calc.ftc-part2 | area under y = x from 1 to 3 is 4 = F(3) − F(1) with F = x²/2 |
| math.calc.improper-integrals | 1/x² from 1 to R: 0.5, 0.667, 0.833 → 1 − 1/R → 1 |
| math.calc.integral-area | strips of height x − x² between y = x and y = x²: 1/6 |
| math.calc.arc-length | chords n = 2, 4, 8 give 5.84, 5.90, 5.91 below the exact 5.92 |
| math.calc.taylor-series | sin x with x, x − x³/6 and x − x³/6 + x⁵/120 |
| math.calc.parametric-curves | x = 3 cos t, y = 2 sin t: marked t values, counter-clockwise, x²/9 + y²/4 = 1 |
| math.calc.fourier-series-intro | square wave and the partial sums (4/π) sin x and the first three odd terms |


# Batch 8 (2026-10-11): probability

`sceneGenerators/mathCoreScenesB8.ts` + `mathCoreScenesBatch8.test.ts` (125 checks). `mathVisualCampaignAudit.test.ts` count threshold is now 98
(it counts only `math-*` figures from this campaign; the coverage script's 144 also includes older, pre-campaign `math.*` figures).
Coverage after this batch: 144 of 908 concepts with a fixed figure; essential tier 142 / 346.

Things learned that apply to every later batch:
- The renderer draws a `line()` tube about **twice `thickness` wide**. Bars side by side need `thickness` of about half the centre spacing
  (Bernoulli: spacing 0.9, thickness 0.26; Bin(5, p) pairs: offset ±0.14, thickness 0.11).
- A bar whose two ends round to the same point (here Bin(5, 0.2) at k = 4, 5) is a zero-length bond and the whole figure is
  silently dropped ("NO FIGURE"); `bar()` draws a dot on the axis instead. `scripts`-free check: `validateSceneSpec` reports it.
- `mathAxes(map, …)` draws the axes through `map(0, 0)`. When a map is centred on a mean (standard deviation) pass the deviation
  t = x − μ so the origin is at the mean, otherwise the axes land far off screen and the camera zooms the figure to a speck.
- Cell/probability labels placed ON a grid line or under a halo ring get pushed away by the label solver. Put them inside the
  cell, clear of the dot and ring (see `labelDrop`, ring = dot radius + 0.1).
- Dot AREA encodes probability (radius = 0.5·√(p/0.4)); the test recovers p from the drawn radius.
- Hatch steps must divide the shaded interval exactly (0.4/0.05, 1/0.05, 2/0.1) or the last strip is missing and the area is short.
- The law-of-large-numbers run is one fixed pseudo-random sequence (`mulberry32(1)`, 60 flips, 32 heads). Seed 1 is the first seed
  whose run opens with a wide swing and stays inside the 1/2 ± 1/√n band from n = 4; the test asserts all of that, and that the
  curves are the running proportion of exactly that sequence.

| Concept | Figure |
|---|---|
| math.prob.event | die outcomes 1–6 in a sample space; A = even {2, 4, 6} (1/2), B = more than 4 {5, 6} (1/3), A ∩ B = {6}; ellipses contain exactly those faces |
| math.prob.total-probability | columns of width .5/.3/.2 shaded to .1/.4/.5: .05 + .12 + .10 = .27 |
| math.prob.distribution | two-coin heads PMF (1/4, 1/2, 1/4) beside its CDF steps (0, 1/4, 3/4, 1); the jump at 1 equals the bar at 1 |
| math.prob.discrete-distributions | Bernoulli(1/2); Bin(5, 1/2) = 1,5,10,10,5,1 over 32; Bin(5, 0.2) beside it |
| math.prob.continuous-distributions | uniform [0.2, 0.6] = 0.40, exponential [0.5, 1.5] = 0.38, normal ±1 = 0.68, as hatched area |
| math.prob.quantile | normal CDF read across at p = .25/.5/.75 and down: −0.67, 0, 0.67 |
| math.prob.variance | data 2,4,4,4,5,5,7,9: squares on the distances 9+1+1+1+4+16 = 32, ÷ 8 = 4 |
| math.prob.standard-deviation | N(170, 10²) heights: 0.683 within 1σ, 0.954 within 2σ (hatch sums checked) |
| math.prob.joint-distribution | 2 × 2 table, dot areas .4/.1/.2/.3 summing to 1 |
| math.prob.marginal-distribution | column totals .5/.5, row totals .6/.4; .4 ≠ .5 × .6 so dependent |
| math.prob.conditional-distribution | X = 1 slice (.2, .3; total .5) ÷ .5 → P(Y \| X = 1) = .4, .6 |
| math.prob.lln | running proportion of heads over 60 flips, with the narrowing 1/2 ± 1/√n band |

Next (batch 9 plan): the 3 remaining essential probability concepts (markov-chain, covariance, correlation), then the 16 essential statistics concepts (math.stats.descriptive-statistics, measures-of-center/-spread,
percentile, sampling-distribution, confidence-interval, ci-mean, ci-proportion, hypothesis-testing, p-value, type-errors, power, anova,
correlation, linear-regression, normal-approximation); later linear algebra, remaining geometry/functions/sequences, discrete/graph theory.


# Batch 9 (2026-10-12): last essential probability + first statistics

`sceneGenerators/mathCoreScenesB9.ts` + `mathCoreScenesBatch9.test.ts` (126 checks); campaign audit threshold now 110. Coverage after this batch:
156 of 908 concepts with a fixed figure; essential tier 154 / 346.

Notes for later batches:
- Simulations are fixed pseudo-random runs (`mulberry32`, Box–Muller `gauss`) so a figure never changes between renders. The
  confidence-interval figure uses seed 1 (the first seed with exactly one of 20 intervals missing μ, not extreme); the test checks the
  run is plausible (sample means centre on μ, spread near the SE) and that every drawn interval is blue exactly when it covers μ.
- A mean-centred axis (confidence/ci-proportion/hypothesis) is drawn from the data's own centre, never `mathAxes` at `map(0, 0)`.
- Rounding of drawn coordinates (2 decimals) limits how tightly a test can match a steep curve: the tests derive the tolerance from the
  steepest slope times the x rounding (see the sampling-distribution and ci-proportion checks).
- The Student-t critical value 2.262 (9 df) is verified by integrating the t density (Γ(5)/(√(9π)Γ(4.5)))(1 + x²/9)^−5 to 0.95.
- Dot-plot figures use `x → (x − mid) · u`; keep u ≥ 0.4 per data unit or stacked dots merge (measures-of-center uses outlier 24, u 0.4).

| Concept | Figure |
|---|---|
| math.prob.markov-chain | Sunny/Rainy chain (.8/.2, .4/.6): stacked P(Sunny) after 0–3 steps = 1, .8, .72, .688 → stationary 2/3 |
| math.prob.covariance | six points, signed rectangles to the means: +3.75 ×4, −0.25 ×2, Cov = 14.5/6 = 2.42; y flipped gives −2.42 |
| math.prob.correlation | r = 1.00 (exact line), −0.90 (noisy), 0.00 (parabola y = (x−3)²/1.5: uncorrelated is not independent) |
| math.stats.descriptive-statistics | 11 values as dot plot, histogram (3, 5, 2, 1) and boxplot (2, 3, 4, 6, 9); mean 4.7, median 4, s 2.0 |
| math.stats.measures-of-center | mean as balance point 4.7; median 4, mode 4; an outlier at 24 moves the mean to 6.3 and the median only to 4.5 |
| math.stats.measures-of-spread | range 7, IQR 3, s = 2.0 (s² = 40.2 ÷ 10 = 4.02, n − 1) |
| math.stats.percentile | 20 sorted values: cuts 25, 36.5, 48.5 have 5, 10, 15 values below (25/50/75%), IQR 23.5 |
| math.stats.sampling-distribution | N(100, 15²) population and sample-mean bells with SE 7.5 (n = 4) and 3.75 (n = 16) |
| math.stats.confidence-interval | 20 simulated intervals x̄ ± 1.96·σ/√n (± 3.92): 19 cover μ = 50, one (red, circled) misses |
| math.stats.ci-mean | half-widths ±9.8, ±4.9, ±2.45 for n = 4, 16, 64; with s = 10, n = 10 the t-interval ±7.15 is wider than z ±6.20 |
| math.stats.ci-proportion | p̂ = 0.6: 0.504 to 0.696 at n = 100, 0.552 to 0.648 at n = 400 (middle 95% of the bell hatched) |
| math.stats.hypothesis-testing | N(0, 1) with rejection region |z| > 1.96 (0.025 per tail); observed z = 2.4 is inside, reject H₀ |

Next (batch 10 plan): remaining essential statistics (p-value, type-errors, power, anova, sample correlation, linear-regression,
normal-approximation) plus 5 calculus/function concepts (curve-sketching, volume-revolution, surface-area-integral, parametric-calculus,
periodic/piecewise function). Check `npx tsx scripts/math/visual-coverage.ts --list E` for the live list.


# Batch 10 (2026-10-12): remaining essential statistics + calculus/function figures

`sceneGenerators/mathCoreScenesB10.ts` + `mathCoreScenesBatch10.test.ts` (122 checks); campaign audit threshold now 122. Coverage after this batch:
168 of 908 concepts with a fixed figure; essential tier 166 / 346.

Notes for later batches:
- `payloadBlockers` (SM-01) rejects a figure whose labels state the SAME name with two different values (`SSE = 4.26` and `SSE = 8.04`):
  the whole figure silently becomes "NO FIGURE". Word the second as `steeper line: 8.04 is worse`. Run the audit with
  `{ renderer: 'scene', sceneSpec }` (without `renderer` it reports nothing).
- Generator names must not collide with other registered builders (`buildPowerScene` already exists for physics; mine is
  `buildStatisticalPowerScene`; tsc reports a duplicate identifier in `conceptSceneParams.ts`).
- Solids/surfaces of revolution are drawn as ellipses (circles seen edge-on) at the slice midpoints; for a linear integrand the
  midpoint sum is exact (8π, 4π√2), and the tests also cross-check V by Pappus's theorem and S by the cone formula π r l.
- Two statistics figures share one data set (`REG`): sample correlation (r = 33.2/√(42 × 30.5) = 0.93, outlier → 0.57) and regression
  (ŷ = 1.49 + 0.79x, SSE 4.26 vs 8.04 for a line of slope ±0.3 steeper).

| Concept | Figure |
|---|---|
| math.stats.p-value | z = 1.5: two tails of 0.067 → p = 0.134 > α = 0.05 (±1.96 drawn further out): do not reject |
| math.stats.type-errors | H₀ N(0,1) and H₁ N(3,1), line at 1.645: α = 0.05 (red tail of H₀), β = 0.088 (violet part of H₁) |
| math.stats.power | power = 1 − Φ(1.645 − δ): 0.05 at 0, 0.64 at 2, 0.91 at 3, 0.80 at δ ≈ 2.49 |
| math.stats.anova | three groups of five: SS_within 26, SS_between 40, total 66, F = 9.23 (segments and arrows are the deviations) |
| math.stats.correlation | eight points r = 0.93, r² = 0.86; one outlier drops r to 0.57 |
| math.stats.linear-regression | ŷ = 1.49 + 0.79x through the means; residuals, SSE 4.26 vs 8.04 for a steeper line |
| math.stats.normal-approximation | Bin(20, 1/2) bars vs N(10, 5); P(X ≤ 12) = 0.868, normal to 12.5 = 0.868, to 12 = 0.814 |
| math.calc.curve-sketching | x/(1 + x²): odd, asymptote y = 0, max (1, 0.5), min (−1, −0.5), inflections 0 and ±√3 (vertical scale ×4) |
| math.calc.volume-revolution | y = √x on [0, 4] about the x-axis: 8 midpoint disks add to 8π ≈ 25.13 |
| math.calc.surface-area-integral | y = x on [0, 2] about the x-axis: 4 bands add to 4π√2 ≈ 17.77 = π r l |
| math.calc.parametric-calculus | cycloid arch: slope 1 at t = π/2, 12 chords 7.98 → L = 8, strips → area 3π |
| math.func.periodic-function | sin x repeats every 2π (equal heights one period apart), sin 2x every π |

Next (batch 11 plan): essential concepts still open (list with `npx tsx scripts/math/visual-coverage.ts --list E`): linear algebra (23),
remaining calculus (multivariable: partial derivatives, gradient, double integrals, vector fields, …), functions (injectivity,
surjectivity, bijection, rational function, asymptotes, piecewise, transformations), geometry (circle theorems, conics, vectors,
polar), sequences/series, discrete and graph theory.

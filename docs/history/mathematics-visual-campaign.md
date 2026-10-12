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


# Batch 11 (2026-10-12): functions

`sceneGenerators/mathCoreScenesB11.ts` + `mathCoreScenesBatch11.test.ts` (122 checks); campaign audit threshold now 134. Coverage after this batch:
180 of 908 concepts with a fixed figure; essential tier 178 / 346.

Notes for later batches:
- `mappingFrame(cx, gap, sp, dom, cod)` draws the two-oval mapping diagrams (function concept, surjective, bijective): domain dots red,
  codomain dots blue, element order top to bottom; the tests recover each arrow's input/output from its y coordinate (`idxAt`).
- Drawn tube width is about twice `thickness`; side-by-side bars and curves need that in mind.
- Crossing counts for the horizontal line test use `>= level` sign changes (a drawn point can land exactly on the level after 2-decimal
  rounding, which defeats a strict `a * b < 0` test).
- `-0` fails `toBe(0)`: compare computed zeros with `toBeCloseTo(0, 12)` (a product with a zero factor is often `-0`).
- Where a figure uses unequal horizontal/vertical scales it says so in the aria label (polynomial, injectivity, monotonic).

| Concept | Figure |
|---|---|
| math.func.function-concept | f(x) = x² on {−1, 0, 1, 2}: one arrow from each input, two share an output, range {0, 1, 4} inside codomain {0..5} |
| math.func.injectivity | horizontal line test: x³ hit once by each line, x² hit twice at ±1.5, x² on x ≥ 0 hit once |
| math.func.surjectivity | f onto {1,2,3} (3 has two arrows) vs g into {1,2,3,4} (4 never reached) |
| math.func.bijection | f(x) = 2x pairing {1,2,3} with {2,4,6} one-to-one, inverse arrows y/2 |
| math.func.transformations-functions | x², f(x−2)+1 (vertex (2,1)), −f(x) (mirror), 2f(x) (stretch ×2) |
| math.func.polynomial-function | (x+2)(x−1)(x−3): roots −2, 1, 3, p(0) = 6, two turning points (≈ 8.2, ≈ −4.1) |
| math.func.end-behavior | ±x², ±x³: even degree ends match, odd ends opposite, arrows at each end |
| math.func.rational-function | (x+2)(x−1)/((x−3)(x−1)): asymptote x = 3, hole at (1, −1.5), zero −2, y = 1 |
| math.func.vertical-asymptote | 1/(x−2): 2, 5, 10 from the right, −2, −5, −10 from the left |
| math.func.horizontal-asymptote | (2x²+1)/(x²+1) → 2 (= 2 − 1/(x²+1)) and 4/(x²+1) → 0; f(4) ≈ 1.94, f(6) ≈ 1.97 |
| math.func.piecewise-function | −x, x², 6 − x meet at (0,0) and (2,4); a last piece 7 − x would jump 4 → 5 |
| math.func.monotonic-function | (x³+3x)/4 increasing, its negative decreasing, x³ − 3x neither (rises, falls, rises) |

Left in `func` (essential): real-valued-function, rational-root; math.func.linear-function stays reserved.
Next (batch 12 plan): geometry (circle theorems, conic sections, ellipse, hyperbola, polar coordinates and curves, 2D vectors,
dot product, cross product, curvature, …) — check `visual-coverage.ts --list E`.


# Batch 12 (2026-10-12): geometry

`sceneGenerators/mathCoreScenesB12.ts` + `mathCoreScenesBatch12.test.ts` (125 checks); campaign audit threshold now 146. Coverage after this batch:
192 of 908 concepts with a fixed figure; essential tier 190 / 346.

Notes for later batches:
- The audit's SM-01 also reads `name = value` labels: several labels with the same last token before `=` but different values blank the
  whole figure ("circle e = 0" and "ellipse e = 0.5" would both be `e`, so the conic labels are written `circle: eccentricity 0`; the polar
  conversions are `x = r cos θ: 1.5`, not `… = 1.5`, next to `θ = 60°`).
- Conic family: r = ℓ/(1 − e cos θ) about a common focus; the test checks focus-distance = e × directrix-distance for every drawn point
  (circle e = 0 is r = 1), and that the ellipse's drawn extreme focal distances give e = 0.5.
- 3D vectors are drawn in an oblique projection (screen = ((y − k x) u, (z − k x) u), k = 0.35); the test inverts it from the drawn component
  edges to (2, 2, 1) and |v| = 3. No true 3-D rendering is needed.
- Curvature test: κ is recovered from first principles as the Menger circle through three very close points of y = x²/2 (no derivative
  formula), then the drawn osculating circles are checked against R = 1/κ, centres on the normal.
- A dot's `position` has three entries; slice to 2 before comparing with a 2-D array.

| Concept | Figure |
|---|---|
| math.geom.circle-theorems | central angle 100° at the centre, inscribed angle 50° from two points of the far arc, tangent ⟂ radius |
| math.geom.conic-sections | circle, ellipse, parabola, hyperbola as r = 1/(1 − e cos θ) about one focus (e = 0, 0.5, 1, 2), directrix of the parabola |
| math.geom.ellipse | x²/9 + y²/4 = 1, foci (±√5, 0); two points whose focal distances (4.12 + 1.88, 1.21 + 4.79) both add to 2a = 6 |
| math.geom.hyperbola | x²/4 − y²/2.25 = 1, foci (±2.5, 0), 5.75 − 1.75 = 2a = 4, asymptotes y = ±0.75x, box (±2, ±1.5) |
| math.geom.polar-coordinates | polar grid; (3, 60°) = (1.5, 2.60) with guides; (2, 210°) = (−1.73, −1) |
| math.geom.polar-curves | cardioid r = 1 + cos θ, 3-petal rose r = cos 3θ, spiral r = θ/π in three panels |
| math.geom.vectors-2d | a = (3, 1), b = (1, 2): head-to-tail sum (4, 3), length 5; 2a = (6, 2) |
| math.geom.vectors-3d | v = (2, 2, 1) in oblique view: component staircase, floor diagonal 2√2, |v| = 3 |
| math.geom.dot-product | a = (4, 1), b = (2, 3): a·b = 11, θ ≈ 42.3°, projection 2.67; c = (−1, 4) ⟂ a gives 0 |
| math.geom.cross-product | parallelogram on (3, 0), (1, 2): area 6 = a₁b₂ − a₂b₁; ⊙ for a × b out of the page, ⊗ for b × a |
| math.geom.curvature | y = x²/2: osculating circle radius 1 at the vertex (κ = 1), radius 2.83 at x = 1 (κ = 0.354) |
| math.geom.x-y-coordinates | P(−4, 3) and Q(2, −3) with guides showing signed distances to the axes; R(0, −2) on the y-axis |

Left in `geom` (essential): platonic-solids, differential-geometry-curves, frenet-serret (3-D, need a decision on how to draw space curves),
plus whatever `visual-coverage.ts --list E` shows. Next (batch 13 plan): linear algebra (24 essential) — vectors, span, basis, matrix
transformations, determinant, eigenvectors.


# Batch 13 (2026-10-12): linear algebra in the plane

`sceneGenerators/mathCoreScenesB13.ts` + `mathCoreScenesBatch13.test.ts` (122 checks); campaign audit threshold now 158. Coverage after this batch:
204 of 908 concepts with a fixed figure; essential tier 202 / 346.

Notes for later batches:
- Every figure is a 2-D picture of ℝ²; vectors are `arrow()`s whose displacement (screen length ÷ u) the tests read back, so a vector figure
  is verified by what is drawn, not by its constants. `solveBasis` (Cramer's rule) recovers coordinates in a basis from drawn points.
- A bad rounding in a label is caught by the audit-free test: √17 + √10 = 7.2854, so the label says 7.29 (not 7.28); recompute printed
  numbers from the constants before writing them.
- Skew-basis grids are drawn as two families of `line()` segments; the tests count them (10 for the coordinate figures, 14 for the basis grid).
- The linear-algebra `dot-product` and `cross-product` concepts (and the other still-open ones below) have NOT been given figures yet:
  `math.geom.dot-product` / `math.geom.cross-product` already exist with a geometric emphasis; the linalg versions should show the
  algebraic side (component formula, ℝ³, the determinant) rather than reuse those scenes.

| Concept | Figure |
|---|---|
| math.linalg.vector | (3, 2) with components; the same displacement from other tails is the same vector; (2, 3) is different |
| math.linalg.scalar-multiplication | v = (2, 1), 2v = (4, 2), ½v = (1, 0.5), −v = (−2, −1): length |c||v|, c < 0 reverses |
| math.linalg.norm | |(3, 4)| = 5 by Pythagoras; |p + q| = 6.40 ≤ 7.29; unit balls of the 1-, 2-, ∞-norms |
| math.linalg.unit-vector | unit circle, e₁, e₂; v = (3, 4) of length 5 normalised to (0.6, 0.8) |
| math.linalg.orthogonality | u·w = 0 at a right angle; u·w′ = 4 at 36.9°; |u + w|² = 5 + 5 = 10 |
| math.linalg.span | multiples of v₁ = a line; 25 combinations c₁v₁ + c₂v₂ fill the plane; 2v₁ adds nothing |
| math.linalg.linear-independence | (2, 1), (−1, 1) independent (det 3); v₃ = 2v₁ dependent; v₄ = v₁ + v₂ |
| math.linalg.basis | w = (3, 1) = 3e₁ + e₂ = 2b₁ − b₂ for b₁ = (1, 1), b₂ = (−1, 1) on two grids |
| math.linalg.coordinates | skew basis (2, 0), (1, 1): (4, 2) = 1·b₁ + 2·b₂, so [w]_B = (1, 2) |
| math.linalg.change-of-basis | M = [[2, 1], [0, 1]], M⁻¹ = [[0.5, −0.5], [0, 1]]: (4, 2) ↔ (1, 2), (3, 1) ↔ (1, 1) |
| math.linalg.linear-map | T(x, y) = (2x + y, x + 2y): columns (2, 1), (1, 2); unit square (area 1) → parallelogram (area 3); T(1, 1) = (3, 3) |
| math.linalg.projection | proj_u(v) = (2.7, 0.9) is the closest point (2.21 vs 2.72, 2.55); Pythagoras 13 = 8.1 + 4.9 |

Left in `linalg` (essential): dot-product, cross-product, row-reduction, subspace, null-space, column-space, kernel-image, eigenspace,
orthogonal-basis, least-squares, svd (11; vector-addition stays reserved). Next (batch 14 plan): those eleven plus one more domain item.

---

# Batch 14 (2026-10-12): the rest of linear algebra + the geometric sequence

`sceneGenerators/mathCoreScenesB14.ts` + `mathCoreScenesBatch14.test.ts` (122 checks); campaign audit threshold now 170. Coverage after this batch:
216 of 908 concepts with a fixed figure; essential tier 214 / 346 (tier H 0 / 210, tier N 2 / 352). `linalg` essential is now 25 / 26 — the one left
is `math.linalg.vector-addition`, which is the reserved canary and must stay figure-less.

Notes for later batches:
- Row operations are verified by DRAWING every equation as a line and testing that all four lines pass through the screen origin (the solution is
  drawn there); consecutive systems are re-solved by Cramer's rule in the test, so a wrong row operation cannot slip through a label.
- 3-D (dot-product bars over ℝ³ components, cross-product) uses the oblique projection `projectL` (k = 0.35). Floor vectors (z = 0) are decoded back
  from the drawn arrow in the test; the a × b arrow is purely vertical, so only its length (4 = parallelogram area) is read back.
- Least squares: label values come from `lsqFit` / `lsqSse` (SSE 1/6 for the fit, 1.00 for the line through two points), never typed by hand.
  The test also grid-searches (c, m) to confirm nothing beats the fitted line, and checks Aᵀr = 0.
- Labels were kept distinct per panel (`A v₁: length 4`, `A v₂: length 2`; `E₃: …, λ = 3`, `E₁: …, λ = 1`) so SM-01 (same last token before `=` with different
  numbers silently drops the whole figure) cannot trigger; the audit (`payloadBlockers` with `renderer: 'scene'`) reported no blockers for all twelve.
  panel (`A v₁: length 4`, `A v₂: length 2`).
- A figure that rounds an angle: θ = arccos(9/√294) = 58.34° → label "θ ≈ 58.3°". The test asserts both the 2-decimal value and the 1-decimal label.

| Concept | Figure |
|---|---|
| math.linalg.dot-product | a = (2, −1, 3), b = (4, 2, 1): component bars, products 8, −2, 3 summing to 9 = |a||b|cos θ, θ ≈ 58.3° |
| math.linalg.cross-product | a = (2, 0, 0), b = (1, 2, 0), a × b = (0, 0, 4) perpendicular, length 4 = parallelogram area, b × a reverses it |
| math.linalg.row-reduction | 2x + y = 5, x − y = 1 → R₁ − 2R₂, ÷3 → y = 1 → R₂ + R₁ → x = 2: four lines, one common point (2, 1) |
| math.linalg.subspace | line y = x/2 (through 0, closed under + and scaling) vs y = x/2 + 1 (misses 0; p + q leaves it) |
| math.linalg.null-space | A = [[1, 2], [2, 4]]: N(A) is the line along (−2, 1); A(1, 1) = (3, 6); all solutions of Ax = (3, 6) are (1, 1) + N(A) |
| math.linalg.column-space | same A: columns (1, 1), (2, 2) span only y = x; b = (3, 3) reachable, b′ = (1, 0) is not |
| math.linalg.kernel-image | T(x, y) = (x + y, 2x + 2y): ker T is x + y = 0, im T the line along (1, 2), lines x + y = c collapse to (c, 2c) |
| math.linalg.eigenspace | A = [[2, 1], [1, 2]]: E₃ on y = x (stretched ×3), E₁ on y = −x (kept), w = (2, 0) goes to (4, 2) and is turned |
| math.linalg.orthogonal-basis | e = (1, 1)/√2, f = (−1, 1)/√2: ⟨v, e⟩ = 2.83, ⟨v, f⟩ = −1.41 rebuild v = (3, 1) as a right-angled staircase |
| math.linalg.least-squares | points (1, 1), (2, 2), (3, 2): y = 2/3 + x/2, residuals −1/6, 1/3, −1/6, SSE 1/6 (line through two points: 1.00) |
| math.linalg.svd | A = [[3, 1], [1, 3]]: unit circle → ellipse with semi-axes σ₁ = 4, σ₂ = 2 along v₁, v₂ |
| math.seq.geometric-sequence | ×2 (1, 2, 4, 8, 16), ×½ (16 … 1), ×(−½) (8, −4, 2, −1, 0.5): constant ratio, alternation, shrinking |

Next (batch 15 plan, from `visual-coverage.ts --list E`; 131 essential concepts still uncovered (132 less the reserved canary)): `found` sets (12), `arith` (12), `de` (12), `disc` (13),
`real` (9), `top` (8), `cx` (7), `seq` (6), `opt` (6), `graph` (6), `num` (5), `alg` (5), `cat` (4), multivariable calculus (14),
`nt` (2), `meas` (2), `abst` / `fnal` (1 each), geom 3-D (platonic-solids, differential-geometry-curves, frenet-serret), func (3: real-valued-function, rational-root + 1).

---

# Batch 15 (2026-10-12): sets, Venn / Hasse diagrams, irrational and complex numbers

`sceneGenerators/mathCoreScenesB15.ts` + `mathCoreScenesBatch15.test.ts` (134 checks); campaign audit threshold now 182. Coverage after this batch:
228 of 908 concepts with a fixed figure; essential tier 226 / 346 (tier H 0 / 210, tier N 2 / 352). The `found` domain is now complete
(15 / 15 essential).

Notes for later batches (these cost real time in this batch — read before drawing a set / Venn figure):
- **A numeral must NOT sit on top of a mark.** The label solver pushes any label off every object it overlaps (rings, hatch lines, dots), so a
  numeral drawn inside a green ring is displaced and ends up outside the region it belongs to. The element is therefore a small ink dot (r 0.08)
  with its numeral BESIDE it (`elems()`, offset 0.3 + 0.12 × digits), and a highlight is a larger coloured dot (r 0.2, `mark()`) that swallows
  the small one. A hatched region (shadeConvex) pushes labels the same way — the lens of the intersection is OUTLINED instead (`lensOutline`).
- Labels also keep ≥ ~0.45 clear of circle lines; element numerals placed nearer than that get pushed across the line. Keep numeral centres
  well inside the circle. The test `element dots and numerals stay unambiguous` (generic suite) fails when a dot's own numeral is not clearly the
  nearest one or when two elements crowd (< 0.6) — it caught `5` landing on top of the dot for `3` and `6` beside `10`.
- Set membership is READ BACK FROM GEOMETRY in the tests (`circlesOf`, `setIn`, `markedNumerals`): a numeral belongs to a circle when its dot lies
  inside the fitted circle. A set figure is therefore verified by what is drawn, not by the constants. The Venn region counts are classified the
  same way (`signature` of the circles each count sits in) and the totals (11, 11, 9, 20, 24) and inclusion–exclusion are recomputed from them.
- SM-01 (same last token before `=` with different numbers silently drops the whole figure) shaped the wording: no `A ∪ B = …` next to
  `B = {…}`; statements use `A ∖ B: {1, 2, 3}`, `union: …`, `|A ∪ B ∪ C| = 20` (token `C|` ≠ `|C|`), and `z*` / `iz` / `|z|` instead of repeating `z`.
- The Hasse test recomputes the covering relations of divisibility on the divisors of 12 and requires the drawn edges to be exactly those, all
  pointing upward, with the transitive closure of the drawn edges equal to divisibility; the meet / join rings are checked against gcd / lcm.
- The irrational-numbers test maps the magnified ruler back to values (7/5, 41/29, 17/12 within 3e-5), recomputes their squares (1.96, 1.9988,
  2.0069) and checks exhaustively that 2q² is never a perfect square for q ≤ 2000.

| Concept | Figure |
|---|---|
| math.found.set | circle A = {2, 4, 6, 8, 10} (even, ≤ 10) with 3, 7, 9 outside; 4 ∈ A, 7 ∉ A; \|A\| = 5 |
| math.found.subset | A = {2, 4} drawn inside B = {1…6} (A ⊆ B); C = {2, 7} crosses B's edge (7 ∈ C, 7 ∉ B, so C ⊄ B) |
| math.found.proper-subset | A = {1, 2} ⊂ B = {1, 2, 3} ⊂ C = {1, 2, 3, 4}: nested, 3 ∈ B∖A and 4 ∈ C∖B marked, sizes 2 < 3 < 4 |
| math.found.set-equality | A = {1, 2, 3} and B = {3, 1, 2} pair up (connectors cross); A and C = {1, 2, 4}: 3 and 4 unmatched |
| math.found.union | A = {1…5}, B = {4…7} in U = {1…10}: A ∪ B = {1…7}, \|A ∪ B\| = 5 + 4 − 2 = 7 |
| math.found.intersection | the lens outlined in green holds {4, 5}; 5 + 4 − 7 = 2 |
| math.found.set-difference | A ∖ B = {1, 2, 3} (4, 5 removed), B ∖ A = {6, 7}, A ∖ B ≠ B ∖ A |
| math.found.complement | A′ = {6…10} outside A inside U; A ∪ A′ = U, 5 + 5 = 10 |
| math.found.venn-diagram | three circles, seven region counts (5, 4, 3, 2, 1, 2, 3) + 4 outside: \|A\| = 11, \|B\| = 11, \|C\| = 9, union 20, \|U\| = 24 |
| math.found.hasse-diagram | divisors of 12 under divisibility: 7 covering edges, chain 1 \| 2 \| 4 \| 12, 4 and 6 incomparable, meet 2 (gcd), join 12 (lcm) |
| math.found.irrational-numbers | unit-square diagonal swung onto the line at √2; ruler 1.400–1.420: 7/5, 41/29, 17/12 square to 1.96, 1.9988, 2.0069, none to 2 |
| math.found.complex-numbers | z = 3 + 2i, z* = 3 − 2i (mirror), \|z\| = 3.61 (circle), iz = −2 + 3i (90° turn) |

Next (batch 16 plan, from `visual-coverage.ts --list E`; 119 essential concepts still uncovered): `arith` (12), `de` (12), `disc` (13), `real` (9), `top` (8),
`cx` (7), `seq` (6), `opt` (6), `graph` (6), `num` (5), `alg` (5), `cat` (4), multivariable calculus (14), `nt` (2), `meas` (2), `abst` / `fnal` (1 each),
geom 3-D (platonic-solids, differential-geometry-curves, frenet-serret), func (3). `math.arith.*` (counting, subitizing, expanded-form,
multiplication-table, long-multiplication, fraction-multiplication, mixed-numbers, proportion, rounding, square/cube numbers, square roots) is the
next obvious block of 12.

---

# Batch 16 (2026-10-12): arithmetic

`sceneGenerators/mathCoreScenesB16.ts` + `mathCoreScenesBatch16.test.ts` (122 checks); campaign audit threshold now 194. Coverage after this batch:
240 of 908 concepts with a fixed figure; essential tier 238 / 346 (tier H 0 / 210, tier N 2 / 352). The `arith` domain is complete (32 / 32 essential).

Notes for later batches:
- **Fraction notation in a label is evaluated left to right by the semantic audit (SM-01).** `3/4 ÷ 3/8 = 2` is parsed as ((3/4) ÷ 3) / 8 = 0.031 and the
  figure silently vanishes; write `(3/4) ÷ (3/8) = 2`. `2/3 × 3/4 = 1/2` happens to evaluate correctly left to right. Always run the audit script
  (`payloadBlockers` with `renderer: 'scene'`) after writing labels that contain `/`, `÷` or `×`.
- Digit labels (1 character) are free of the label budget, so place-value layouts can use real numerals in columns (`LONG`): the test reads each
  row's digits back by position, checks the ones digits share a column and re-does the column addition with carries from the DRAWN digits.
- Thick `line()`s make good filled bars (mixed numbers, fraction bar model): a bar is a bond of thickness ≈ 0.09-0.17, and the test reads its length.
- Oblique 3-D lattices of dots (cube numbers, `cubePoint`) read well up to 3 × 3 × 3; layers are told apart by colour and the test recovers each
  layer's n × n lattice and the oblique shift between layers. Keep a dot radius ≤ 0.1 there.
- Staggering text vertically (expanded form: term labels at y −2.0 / −2.7 / −2.0) is the cheap fix when three equally wide labels sit in a row.

| Concept | Figure |
|---|---|
| math.arith.counting | 6 dots each paired with one of 1…6 left to right, bracket "count: 6"; the same dots numbered 3, 6, 1, 5, 2, 4 — still a bijection onto 1…6 |
| math.arith.subitizing | dice patterns for 1, 2, 3, 4 recognised at a glance; 7 scattered dots read as brackets of 4 and 3 |
| math.arith.expanded-form | stacks of 3, 4, 5 counters worth 10², 10¹, 10⁰: 3 × 100 = 300, 4 × 10 = 40, 5 × 1 = 5, 345 = 300 + 40 + 5 |
| math.arith.multiplication-table | 12 × 12 grid; the 7-by-8 rectangle (56 cells) and its mirror over the diagonal, the 8-by-7 rectangle (56 cells) |
| math.arith.long-multiplication | 23 × 14 in H/T/O columns: carry 1, partial products 92 and 230, total 322 |
| math.arith.fraction-multiplication | 4 × 3 grid: 3/4 wide ∩ 2/3 high = 6 of 12 cells = 1/2; bar model (3/4) ÷ (3/8) = 2 |
| math.arith.mixed-numbers | 3 whole bars + a half = 7 half bars: 3½ = 7/2, 3 × 2 + 1 = 7, 7 ÷ 2 = 3 r 1 |
| math.arith.proportion | 3 : 4 and 6 : 8 rectangles with equal diagonals; 3/4 = 6/8 = 0.75; cross products 24 = 24 |
| math.arith.rounding | 3.40–3.50 ruler: 3.44 → 3.4, 3.46 → 3.5, the halfway 3.45 rounds up to 3.5 |
| math.arith.square-numbers | 5 × 5 dots in L layers of 1, 3, 5, 7, 9; nested squares 1, 4, 9, 16, 25; n² = sum of the first n odd numbers |
| math.arith.cube-numbers | cubes of side 1, 2, 3 as oblique dot lattices: 1, 8, 27 dots = n layers of n × n |
| math.arith.square-roots | squares of area 4, 9, 16, 10 with side bars √4 = 2, √9 = 3, √16 = 4, √10 ≈ 3.16 and √10 on a 3-to-4 number line |

Next (batch 17 plan, from `visual-coverage.ts --list E`; 108 essential concepts still uncovered): `disc` (13), `de` (12), `real` (9), `top` (8), `cx` (7), `seq` (6),
`opt` (6), `graph` (6), `num` (5), `alg` (5: fundamental-theorem-algebra, exponential-function, logarithm, rational-inequality, pascals-triangle), `cat` (4),
multivariable calculus (14), `nt` (2: sieve-of-eratosthenes, modular-arithmetic), `meas` (2), `abst` / `fnal` (1 each), geom 3-D (platonic-solids,
differential-geometry-curves, frenet-serret), func (3). A natural batch 17: `alg` (5) + `nt` (2) + `seq` (5: convergent, divergent-sequence, geometric-series,
comparison-test, integral-test) — all picture-friendly.

---

# Batch 17 (2026-10-12): algebra, number theory, sequences and series

`sceneGenerators/mathCoreScenesB17.ts` + `mathCoreScenesBatch17.test.ts` (130 checks); campaign audit threshold now 207. Coverage after this batch:
253 of 908 concepts with a fixed figure; essential tier 251 / 346 (tier H 0 / 210, tier N 2 / 352). The `alg`, `nt` (essential) and `seq` domains are complete.
Thirteen concepts: eleven new figures plus `math.alg.exponential-function` and `math.alg.logarithm`, which are registered to the batch-2 builders of their
`math.func.*` twins (same KG statement, f(x) = aˣ and its inverse log_a x, and the batch-2 figures already show exactly that).

Notes for later batches:
- **A label is also an obstacle for lines.** Underlines / bullets / bracket lines closer than ~0.5 to a numeral push it off its place (the Pascal 10s and the
  sieve numerals scrambled until the marks moved clear). Rules that worked: sieve markers are UNDERLINES 0.42 below the numeral on a 1.0 row pitch;
  the Pascal bracket sits 0.5 below the two summands and drops to the sum; row spacing 1.3.
- **Audit surprises**: a label containing the word "undefined" trips ST-04 ("looks like leakage") — say "not allowed: −2". Fraction/division labels are
  evaluated left to right by SM-01 (see batch 16).
- Branches of a rational function are clipped where |y| reaches the window (`RAT.left`, `RAT.right`), and the test accepts a slope-dependent tolerance
  (|f′| grows near the pole) when mapping drawn points back onto the curve.
- The ε–N figure draws the band as two lines and recolours the terms with larger dots (green inside the band, red on/outside); the test recomputes the
  least N for ε = 0.2 and 0.1 (5 and 10 — a₅ = 0.2 is NOT < 0.2) and checks that the colour split and the vertical guide sit exactly there.
- The integral-test rectangles share edges, so the test reads each rectangle's height from its own top line, not from the vertical edges.
- Left to do in `seq`: nothing essential. Left in the helpful tier: series / sequence / absolute-convergence / telescoping etc.

| Concept | Figure |
|---|---|
| math.alg.exponential-function | (batch-2 figure) 2ˣ and (½)ˣ, through (0, 1), × 2 per step, never 0 |
| math.alg.logarithm | (batch-2 figure) log₂ x as the mirror of 2ˣ in y = x, domain x > 0 |
| math.alg.fundamental-theorem-algebra | roots of z³ − 1 on the unit circle, 120° apart (sum 0, product 1); (z − 1)²(z + 1): root 1 counted twice, 3 with multiplicity |
| math.alg.rational-inequality | graph of (x − 1)/(x + 2) with pole −2 and zero 1; sign chart + − +; solution x < −2 or x > 1 |
| math.alg.pascals-triangle | rows 0–5; 4 + 6 = 10 = C(5, 2) bracket; row sums 1, 2, 4, 8, 16, 32 |
| math.nt.sieve-of-eratosthenes | 1…49 grid, underlines by smallest prime factor (23 / 7 / 2 / 1), 15 green primes |
| math.nt.modular-arithmetic | mod-5 clock, 3 + 4 = 7 ≡ 2 by four hops; table 0…14 with the 2, 7, 12 column outlined |
| math.seq.convergent | aₙ = 1/n with ε-bands 0.2 (N = 5) and 0.1 (N = 10) |
| math.seq.divergent-sequence | (−1)ⁿ with an empty ±0.5 band (no limit); aₙ = n passing the bound 6 |
| math.seq.geometric-series | 1 + ½ + ¼ + … on a number line: partial sums 1, 1.5, 1.75, 1.875 → a/(1 − r) = 2 |
| math.seq.comparison-test | bars bₙ = 1/n² and aₙ = 1/(n² + 1): aₙ ≤ bₙ, Σbₙ → 1.645 |
| math.seq.integral-test | 1/x² with rectangles under the curve (converges) and 1/x with rectangles over it (diverges) |
| math.seq.alternating-series | hops 1, −½, +⅓, … closing in on ln 2 ≈ 0.693 |

Next (batch 18 plan, from `visual-coverage.ts --list E`; 95 essential concepts still uncovered): `disc` (13), `de` (12), `real` (9), `top` (8), `cx` (7),
`opt` (6), `graph` (6), `num` (5), `cat` (4), multivariable calculus (14), `meas` (2), `abst` / `fnal` (1 each), geom 3-D (platonic-solids,
differential-geometry-curves, frenet-serret), func (3: real-valued-function, rational-root and one more). A natural batch 18: `disc` (stars-bars,
inclusion-exclusion, graph, graph-types, graph-representation, graph-connectivity, euler-hamiltonian, graph-trees, spanning-tree, graph-coloring,
planar-graph, boolean-circuits, asymptotic-notation) — all drawable, many reusable for `math.graph.*` (graph, connectivity, tree, matching, coloring).

---

# Batch 18 (2026-10-12): discrete mathematics — graphs, stars and bars, inclusion–exclusion, asymptotics

`sceneGenerators/mathCoreScenesB18.ts` + `mathCoreScenesBatch18.test.ts` (149 checks); campaign audit threshold now 222. Coverage after this batch:
268 of 908 concepts with a fixed figure; essential tier 266 / 346 (tier H 0 / 210, tier N 2 / 352). Twelve new figures plus three registrations:
`math.graph.graph`, `math.graph.tree` and `math.graph.graph-coloring` use the `math.disc.*` figures (same KG statements: degrees / handshaking, trees, colouring).
`math.disc.boolean-circuits` is the one `disc` essential left (needs a netlist-style test — see below).

Notes for later batches:
- **Graph figures are verified by rebuilding the graph from the drawing**: a vertex is a dot (r 0.16), an edge a bond whose two ends sit on dots; the tests
  compute degrees, components, acyclicity, paths, Kruskal, colourings and crossings from that, never from the constants. Highlights (marks r 0.2-0.26) swallow
  the small dot; highlighted edges are thicker bonds drawn over the grey ones.
- A vertex letter is a label placed OUTWARD from its dot (0.45), a degree numeral further out (0.95); edge numbers / weights sit 0.35-0.4 outward from the edge
  midpoint. Parallel edges (multigraph) are drawn as a straight edge plus a bent one (two bonds through a bend point that is NOT a vertex).
- The asymptotic figure plots the RATIO f(n)/n² = 3 + 5/n against the constants 3 and 4; plotting f, 3n² and 4n² on one axis gave three overlapping parabolas.
- SM-01 again: `C(7, 2) = 21` and a second `C(4, 2) = 6` share the last token `2)` and would drop the figure, so the second is worded
  `with every bin non-empty: 6 ways` (no `=`).
- Kruskal on the drawn weights is recomputed in the test and the drawn green edges must equal it; each rejected edge must already be joined by a cheaper
  path of kept edges (that is exactly "would close a cycle").
- K₄ in the colouring figure is drawn already coloured (marks only), C₅ is drawn grey first then coloured — the test takes K₄'s vertices from the marks.

| Concept | Figure |
|---|---|
| math.disc.graph (+ math.graph.graph) | pentagon + chord A–C: degrees 3, 2, 3, 2, 2; Σdeg = 12 = 2 × 6 |
| math.disc.graph-types | K₄ (all 6 pairs), K₂,₃ (blue–red only), a multigraph (doubled edge), C₅ (regular, degree 2) |
| math.disc.graph-representation | triangle + tail; 4 × 4 adjacency matrix (symmetric, zero diagonal) and the adjacency lists |
| math.disc.graph-connectivity | a green 5-vertex path, a violet 4-cycle, a disconnected graph with no path between the red dots |
| math.disc.euler-hamiltonian | bowtie with edge order 1–6 (all degrees even, Euler circuit); Hamiltonian outer pentagon |
| math.disc.graph-trees (+ math.graph.tree) | 7 vertices, 6 edges; unique path c–a–d; an extra edge e–f closes the cycle e–b–f |
| math.disc.spanning-tree | weighted graph; Kruskal keeps AB 1, BC 2, DE 3, AD 4 (total 10), rejects 5, 6, 7 |
| math.disc.graph-coloring (+ math.graph.graph-coloring) | C₅ with 3 colours (χ = 3, an odd cycle), K₄ with 4 colours (χ = 4) |
| math.disc.planar-graph | K₄ drawn without crossings (4 − 6 + 4 = 2); K₅ on a pentagon with its 5 crossings; 10 > 3V − 6 = 9 |
| math.disc.stars-bars | ★★\|★\|★★ rows (2 + 1 + 2, 0 + 5 + 0, 1 + 1 + 3 = 5); C(7, 2) = 21 ways; 6 if every bin is non-empty |
| math.disc.inclusion-exclusion | multiples of 2 and 3 up to 30: regions 10, 5, 5, 10; 15 + 10 − 5 = 20 |
| math.disc.asymptotic-notation | f(n)/n² = 3 + 5/n squeezed between 3 and 4 from n₀ = 5: f is Θ(n²) |

Next (batch 19 plan; 80 essential concepts still uncovered): `math.disc.boolean-circuits` (gates + a netlist the test simulates against its truth table),
`math.graph.connectivity` / `maximum-flow` / `matching`, `de` (12: slope-field, euler-method, harmonic-oscillator, resonance, stability-analysis, fourier-*, pde, heat /
wave / Laplace), `real` (9), `top` (8), `cx` (7), `opt` (6), `num` (5), `cat` (4), multivariable calculus (14), `meas` (2), `abst` / `fnal` (1 each), geom 3-D (3), func (3).

---

# Batch 19 (2026-10-12): differential equations

`sceneGenerators/mathCoreScenesB19.ts` + `mathCoreScenesBatch19.test.ts` (131 checks); campaign audit threshold now 235. Coverage after this batch:
281 of 908 concepts with a fixed figure; essential tier 279 / 346 (tier H 0 / 210, tier N 2 / 352). The `de` domain is complete (12 / 12 essential);
`math.num.euler-method` is registered to the Euler figure of `math.de.euler-method` (the same y_{n+1} = y_n + h f(x_n, y_n) statement).

Notes for later batches:
- **Curves are verified against the equation, not against the generator.** The oscillator and resonance tests integrate x″ + b x′ + 4x = 0 and x″ + x = cos ωt
  with their own RK4 and compare the drawn samples; the Fourier tests integrate the coefficients by Simpson's rule and rebuild the partial sums; the heat test takes
  the sine coefficients of the DRAWN t = 0 curve, evolves each mode by e^(−n²kt) and compares with the drawn t = 0.1 and 0.3 curves; the wave test also checks the
  conserved area √π; the Laplace test checks the mean value property on the drawn circle and that the extremes sit on the boundary.
- **Rounding tolerance on steep curves**: `P()` rounds to 0.01 on screen, so a partial sum with slope 37 (S₂₉ at the jump) is off by 0.07 in value at a sample.
  The tests use `offBy(f, x, y, dx)`: the distance to the curve allowing a small x-shift. Do not compare second differences of drawn samples (noise ×4/dt²); integrate the ODE instead.
- A solution plotted on a window must be centred: a time axis drawn from `ox = −4.4` with `ut = 0.28` filled only the left half of the canvas. Pick `ut` so that `T·ut ≈ 8`.
- Labels named `Δ < 0` / `Δ > 0` / `u_xx + u_yy = 0` are fine for SM-01 as long as no two share the last token before an `=` with different numbers
  (`u_t`, `u_tt`, `u_yy` are distinct).
- The PDE classification figure puts the conic icons at ±3.5 (not ±4) so the hyperbola branches stay inside ±5.

| Concept | Figure |
|---|---|
| math.de.slope-field | y′ = x − y: 42 tangent segments on a lattice; the solution through (0, 1) follows them; flat isocline y = x |
| math.de.euler-method (+ math.num.euler-method) | y′ = y: Euler paths h = 0.5 (5.06) and h = 0.25 (5.96) under the exact eˣ (7.39); error ∝ h |
| math.de.harmonic-oscillator | m = 1, k = 4: underdamped b = 1 (oscillates), critical b = 4 (b² = 4mk), overdamped b = 6 |
| math.de.resonance | x″ + x = cos ωt: ω = 0.7 bounded (beats), ω = 1 grows like (t/2) sin t inside ±t/2 |
| math.de.stability-analysis | y′ = y(1 − y): f(y) parabola, phase-line arrows, 0 unstable (f′ = 1), 1 stable (f′ = −1) |
| math.de.fourier-series | square wave and S₁, S₃, S₅ = (4/π)Σ sin(kx)/k |
| math.de.fourier-convergence | S₉ and S₂₉ at the jump: midpoint 0, Gibbs overshoot ≈ 1.179 (≈ 9 % of 2) |
| math.de.fourier-sine-cosine | x on [0, π]: odd extension → sine series, even extension (|x|) → cosine series |
| math.de.pde | Δ = B² − 4AC: Laplace −4 elliptic, heat 0 parabolic, wave +4 hyperbolic, with ellipse / parabola / hyperbola icons |
| math.de.heat-equation | sin x + ½ sin 3x smoothing at t = 0, 0.1, 0.3 (modes decay like e^(−n²kt)) |
| math.de.wave-equation | e^(−x²) splits into two half-height pulses at x = ±ct (t = 0, 2, 4) |
| math.de.laplace-equation | contours of x² − y², mean value property on a circle, extremes on the boundary |

Next (batch 20 plan; 67 essential concepts still uncovered): `math.disc.boolean-circuits` (gates + a netlist the test simulates against its truth table),
`math.graph.connectivity` / `maximum-flow` / `matching`, `real` (9: sup-inf, convergence-sequences, cauchy-sequence, open-sets, continuity-rigorous, uniform-continuity,
riemann-integral, uniform-convergence, pointwise-convergence), `top` (8), `cx` (7), `opt` (6), `num` (4 left: newtons-method, interpolation, numerical-differentiation,
numerical-integration), `cat` (4), multivariable calculus (14), `meas` (2), `abst` / `fnal` (1 each), geom 3-D (3), func (3 incl. the reserved fixture).

---

# Batch 20 (2026-10-12): multivariable calculus

`sceneGenerators/mathCoreScenesB20.ts` + `mathCoreScenesBatch20.test.ts` (142 checks); campaign audit threshold now 249. Coverage after this batch:
295 of 908 concepts with a fixed figure; essential tier 293 / 346 (tier H 0 / 210, tier N 2 / 352). All 14 `math.calc.*` multivariable concepts are covered.

Notes for later batches:
- **3-D is drawn by an oblique projection and verified by inverting it.** `oblique(o)` maps (x, y, z) to (ox + ux·x + dxy·y, oy + uz·z + dyy·y); `obliqueInv(o, base, z)`
  undoes it. Tests read dots / lines back from the scene, invert the projection and recompute the surface integral, the volume element, the Riemann sum, etc.
- **Level curves are checked against the function**: the gradient test fits each drawn ellipse to f(x, y) = c and checks the arrow against a finite-difference gradient;
  the extrema test recomputes D = f_xx f_yy − f_xy² with its own Hessian; the directional test compares the drawn D_u f curve with ∇f·u(θ) (max = |∇f| = 2.83).
- **Field arrows at the origin have zero length** (invalid arrow): the line-integral and vector-field figures skip the arrow at (0, 0).
- **Tolerances that were too tight (all fixed in the tests, not the figures)**: ring radii of a circle fit come out 0.9996 / 1.9994 (use `toBeCloseTo`);
  ray angles read back after 0.01 rounding are 1.01 / 2.99 of π/8; the cylindrical element box (inner-corner straight-edged) is within 16 % of r dr dθ dz while the
  exact wedge formula ½(r₂² − r₁²)Δθ Δz equals r̄ Δr Δθ Δz exactly.
- Window: the directional-derivative left panel uses u = 1.2 and the right plot x₀ = 0.5, ux = 1/90, uy = 0.55 to stay inside ±5.

| Concept | Figure |
|---|---|
| math.calc.multivariable-intro | f: ℝ² → ℝ with f(A) = f(B) = 1, f(C) = 2 (a point on the plane maps to one height) |
| math.calc.partial-derivatives | contour plot with two slices through a point: ∂f/∂x = 2 (blue slice), ∂f/∂y = 1 (red slice) |
| math.calc.gradient | level ellipses with ∇f arrows perpendicular to the level curve at three points |
| math.calc.directional-derivative | D_u f(θ) = ∇f·u: max 2.83 at θ = 45°, 0 at 135°, 2 along the x-axis |
| math.calc.multivariable-extrema | min (D 4, f_xx 2), max (D 4, f_xx −2), saddle (D −4) contour sketches |
| math.calc.vector-fields | F = (−y, x) rotation and G = (x, y) outflow arrows; potential f = ½(x² + y²) for the conservative one |
| math.calc.curl-divergence | G = 2 net outflow vs ∇×F = 2 net circulation through a small square |
| math.calc.line-integrals | F = (−y, x) along the arc A→B: ∫ F·dr = π/2; chord 1; path dependence |
| math.calc.change-of-variables | (r, θ) rectangle ↦ polar sector, J = r, element dr dθ → r dr dθ |
| math.calc.double-integrals | Riemann sum Σ f ΔA = 3 vs ∫₀² (x + ½) dx = 3 on z = x + y |
| math.calc.multiple-integrals | both orders of integration on the triangle give area ½ (dy dx columns vs dx dy rows) |
| math.calc.triple-integrals | cylinder 0 ≤ z ≤ 2 with volume element r dr dθ dz; ∭ dV = 2π |
| math.calc.surface-integrals | flux of F = (0, 0, 1) through a tilted plane: F·n = 0.89, dS = 1.12 dA, ∬ F·dS = 1 |
| math.calc.divergence-theorem | F = (x, y, z) on the unit sphere: ∬ F·dS = 4π = 3 × (4π/3) |

Next (batch 21 plan; 53 essential concepts still uncovered, by domain: real 9, top 8, cx 7, opt 6, num 4, cat 4, graph 3, geom 3, func 3, meas 2, fnal 1, disc 1, abst 1):
`math.disc.boolean-circuits` (gates + a netlist the test simulates against its truth table), `math.graph.connectivity` / `maximum-flow` / `matching`,
`real` (sup-inf, convergence-sequences, cauchy-sequence, open-sets, continuity-rigorous, uniform-continuity, riemann-integral, uniform-convergence, pointwise-convergence),
`top` (8), `cx` (7), `opt` (6), `num` (newtons-method, interpolation, numerical-differentiation, numerical-integration), `cat` (4), `meas` (2), `abst.cyclic-group`,
`fnal.convolution`, geom 3-D (platonic-solids, differential-geometry-curves, frenet-serret), func (real-valued-function, rational-root; the third is the reserved fixture).

---

# Batch 21 (2026-10-12): Boolean circuits, graph connectivity / flow / matching, real analysis

`sceneGenerators/mathCoreScenesB21.ts` + `mathCoreScenesBatch21.test.ts` (132 checks); campaign audit threshold now 262. Coverage after this batch:
308 of 908 concepts with a fixed figure; essential tier 306 / 346 (tier H 0 / 210, tier N 2 / 352). The `real` and `graph` essential concepts are complete.

Notes for later batches:
- **A circuit is verified by simulating its DRAWN wires.** `simulateCircuit(A, B, wires)` merges wire endpoints into nets (union-find on coordinates rounded to 0.01), evaluates each
  gate from the nets on its pins and reads the net at Y. Wires that merely cross share no endpoint, so they are not connected (a T-junction needs an endpoint at the join: the
  vertical wire is split there). The test also deletes one wire and checks the answer changes.
- **Graph theory figures are rebuilt from the drawing** (dots + lines → vertex / edge lists) and the numbers recomputed by brute force: κ, λ, δ, the minimum b–e vertex cut
  (Menger), Edmonds–Karp max flow from the drawn capacity numbers, Hall's condition and the symmetric difference M △ P for the matching.
- **Label width is ≈ 0.26 screen units per character** (primary tier). A 15-character caption is 3.9 units wide: three captions at x = −3.3 / 0 / 3.3 overlap unless they are
  short ("size 2", "augmenting", "perfect"). Plan panel captions by character count, not by eye.
- **Panels side by side need ≥ 3.4 between centres** when the graph has outward vertex letters; the connectivity figure uses a triangle layout (two panels on top, one below).
- A label pushed off a thick curve may land on a neighbouring label: stagger heights explicitly (the sin-x box heights use offsets 0.4 / 1.0 / 0.4).
- Highlight dots drawn on top of a coloured curve of the same colour vanish; mark them with the ink colour (uniform-convergence markers).
- Tolerances: the ε–δ test uses the largest allowed δ (0.2247 for ε = 0.5 on x² at 1) and checks the drawn δ = 0.22 is below it; the sup/inf test treats dots as members only if within 0.002 in value.

| Concept | Figure |
|---|---|
| math.disc.boolean-circuits | AND / OR / NOT symbols; XOR = (A OR B) AND NOT(A AND B) wired from four gates, simulated from the drawn wires: 0, 1, 1, 0 |
| math.graph.connectivity | hexagon + chord: κ = 2 (vertex cut {a, d}), λ = 2 (edge cut ab, cd), δ = 2; Menger: two disjoint b–e paths |
| math.graph.maximum-flow | s → a, b → t with capacities 3, 3, 1, 2, 2; flow 3, 1, 1, 2, 2 = 4; min cut a→t, b→t = 2 + 2 |
| math.graph.matching | bipartite 1, 2, 3 / A, B, C: M = {1A, 3B}; augmenting path 2–A–1–B–3–C; perfect matching {2A, 1B, 3C} |
| math.real.sup-inf | S = {1 − 1/n}: sup 1 not attained (0.9 fails: 0.909 ∈ S), inf 0 attained |
| math.real.convergence-sequences | 2 + (−1)ⁿ/n: ε = 0.3 → N = 3; ε = 0.15 → N = 6 |
| math.real.cauchy-sequence | sₙ = 2 − 2^(1−n): beyond N = 4 pairs closer than ε = 0.1; (−1)ⁿ not Cauchy (gap 2) |
| math.real.open-sets | dashed-edge disc with ball inside; solid-edge disc with an edge point whose balls stick out; complement ball outside |
| math.real.continuity-rigorous | x² at 1: ε = 0.5, δ = 0.22 (max 0.2247); jump function: no δ works |
| math.real.uniform-continuity | same δ = 0.5 windows: sin x changes 0.36, 0.09, 0.46; x² changes 0.75, 1.75, 2.75 |
| math.real.riemann-integral | x² Darboux sums: n = 4 → 0.22 / 0.47, n = 8 → 0.27 / 0.40, squeezing 1/3 |
| math.real.uniform-convergence | x + sin(nx)/n inside the ε = 0.3 tube for n = 5, 12 (n = 2 leaves); xⁿ reaches ½ at 2^(−1/n) above its tube |
| math.real.pointwise-convergence | xⁿ → 0: N(x, 0.1) = 2, 4, 7, 11, 22, 45 at x = 0.2 … 0.95, unbounded as x → 1 |

Next (batch 22 plan; 40 essential concepts still uncovered, 39 excluding the reserved fixture `math.func.linear-function`; by domain: top 8, cx 7, opt 6, num 4, cat 4, geom 3, func 3, meas 2, fnal 1, abst 1):
`top` (open-sets, homeomorphism, quotient-space, homotopy, fundamental-group, euler-characteristic, manifold, smooth-manifold), `cx` (complex-numbers-analysis, complex-integration,
cauchy-theorem, residue-theorem, real-integral-residues, mobius-transformation, riemann-surface), `opt` (unconstrained, convex-function, convex-set, linear-programming,
lagrange-multipliers, gradient-methods), `num` (newtons-method, interpolation, numerical-differentiation, numerical-integration), `cat` (category, morphism-types, functor,
natural-transformation), `meas` (simple-function, lebesgue-integral), `abst.cyclic-group`, `fnal.convolution`, geom 3-D (platonic-solids, differential-geometry-curves, frenet-serret),
func (real-valued-function, rational-root; linear-function stays figure-less). Then tier H (210) and tier N (350).

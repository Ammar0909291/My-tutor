# Mathematics visual quality audit — render audit + freshness gate

Date: 2026-10-13. Scope: every Mathematics concept that serves a figure through the real resolver (`resolveVisual`, subject `mathematics`) — **556 of 908** concepts (352 serve none). Procedure and re-audit instructions: `docs/history/mathematics-visual-render-audit.md`. Committed record: `docs/qa/mathematics-visual-audit/audit-summary.json` (per-concept verdicts + per-concept fingerprints) and `verdict-summary.json`; the freshness gate is `src/tests/mathVisualAudit.test.ts`.

## Result

- **FAIL: 0.  PASS: 495.  REVIEW_REQUIRED: 61** (556 figures).
- Rendered in real Chromium (software WebGL) against the dev server, through the production resolver and renderers: **mobile 390 px (dark and light), desktop 1280 px (dark), desktop 50/50 column (dark)** = 4 renders per figure, **2,224 renders**, 0 render errors in the final record. (The Physics convention: the light theme is rendered where contrast is hardest, the phone.) Every slider/state of an interactive figure is driven; every state is judged by the same rules as the default frame.
- By viewport: mobile: 545 PASS / 11 REVIEW / 0 FAIL; desktop: 542 PASS / 14 REVIEW / 0 FAIL; desktop-column: 543 PASS / 13 REVIEW / 0 FAIL.
- By dimension: structural: 544 PASS / 12 REVIEW; readability: 556 PASS; contrast: 556 PASS; layout: 551 PASS / 5 REVIEW; graph: 556 PASS; semantic: 509 PASS / 47 REVIEW; interactive: 555 PASS / 1 REVIEW.

Rules applied (shared with Physics/Chemistry/Biology, unchanged): `src/lib/teaching/visual/figureAudit.ts` (structure ST-*, readability RD-*, contrast CT-*, layout LY-*, graph GR-*) and `figureSemantics.ts` (SM-01, arithmetic self-consistency). A scene figure is semantically PASS only if a deterministic assertion covers it: a `mathCoreScenesBatch<N>.test.ts` that names the concept or scene id (those tests re-derive every number the figure states from its drawn coordinates) or an arithmetic chain the checker evaluated. A card / domain-fallback figure has no such assertion, so it stays REVIEW_REQUIRED — that is the honest verdict, and the queued **semantic review** (Math queue item 2) is what decides it.

## What the first pass found and what was repaired

The first mobile/dark pass over all 556 figures found **55 FAIL** (28 after the first round of fixes was re-rendered, 0 after the second). Every fix is in the figure or in the shared card it is drawn by — no audit rule was relaxed:

| Finding | Concepts | Cause | Fix |
|---|---|---|---|
| RD-02 + LY-01 (clipped text, overlap) | 26 (`geometry_shape` card) | the fact "∠A + ∠B + ∠C = 180°" sat at x = 50, y = 80 of a 300×100 viewBox: clipped at the left edge on a phone and drawn across the triangle's base and its name | `GeometryShapes.tsx`: centred under all three shapes (viewBox 300×114) |
| GR-02 (axis has no name) | 17 | plotted graphs whose axes carried no letter | the axis letter added to each figure (x, y, t, T) |
| GR-01 (graph with no axes) | `math.calc.critical-points` | the shared `calculus_graph` generator drew the curve alone | `calculusGraph.pure.ts` now draws a named pair of axes at the curve box's corner (every `calculus_graph` figure gains them) |
| GR-04 (curve leaves its axes) | `math.opt.convex-optimization` | the left curve rose above the axis | the axis made taller |
| ST-08 (raw LaTeX) | 5 | `e^{it}`, `∫_{−∞}^{∞}`, `1_{Eᵢ}`, and a `$2 … $4` price pair printed as text | rewritten in plain words (`e^(it)`, "the integral … from −∞ to ∞", `1_Eᵢ`, "2 dollars") |
| ST-04 ("undefined" read as a JS leak) | 3 | the word "undefined" in learner-facing text (a vertical line's slope, a function at a point) | "not defined" |
| LY-02 / CT-01 | `math.arith.fractions` (`fraction_bar` card) | with an even numerator the caption "2/3" was centred on a cell divider | `FractionBar.tsx`: caption centred in a cell |
| LY-02 | `math.nt.prime-distribution` | a bar's count sat on the violet average line | counts of bars shorter than the average are written beside the bar |
| LY-02 | `math.func.inverse-functions` (mobile/light only) | the axis letter x sat on the arrow head | moved below the axis |
| RN-01 | 4 foundations figures | a render crashed when the browser was interrupted; re-rendered clean | — |

## The 61 REVIEW_REQUIRED figures

None is a FAIL; each needs a human decision, which is the semantic review (Math queue item 2):

### SM-02 — 44 figures

Reason(s): no deterministic mathematics assertion covers this figure (no arithmetic chain, no mathCoreScenesBatch test na (×44)

`math.found.integers`, `math.found.rational-numbers`, `math.found.real-numbers`, `math.arith.negative-numbers`, `math.arith.number-line`, `math.arith.ordering`, `math.arith.absolute-value`, `math.arith.integer-arithmetic`, `math.arith.fractions`, `math.arith.decimals`, `math.arith.percentages`, `math.geom.angle`, `math.geom.angle-types`, `math.geom.angle-measurement`, `math.geom.angle-pairs`, `math.geom.triangle`, `math.geom.triangle-types`, `math.geom.triangle-angle-sum`, `math.geom.right-triangle`, `math.geom.congruent-triangles`, `math.geom.similar-triangles`, `math.geom.triangle-centers`, `math.geom.area-triangle`, `math.geom.polygon`, `math.geom.polygon-angle-sum`, `math.geom.quadrilateral`, `math.geom.regular-polygon`, `math.geom.area-polygon`, `math.geom.perimeter`, `math.geom.circle`, `math.geom.circle-parts`, `math.geom.circle-circumference`, `math.geom.circle-area`, `math.geom.surface-area`, `math.geom.volume`, `math.geom.solid-3d`, `math.geom.transformations`, `math.trig.angle-measure`, `math.trig.right-triangle-trig`, `math.trig.special-angles`, `math.trig.unit-circle`, `math.trig.reference-angles`, `math.calc.critical-points`, `math.stats.data-visualization`

### ST-03 — 11 figures

Reason(s): the canvas holds text only, no drawn geometry (ink 0.19%) (×2); the canvas holds text only, no drawn geometry (ink 0.30%) (×2); the canvas holds text only, no drawn geometry (ink 0.27%) (×2); the canvas holds text only, no drawn geometry (ink 0.00%) (×2)

`math.found.truth-table`, `math.arith.column-addition`, `math.nt.prime-factorization`, `math.nt.congruence`, `math.nt.continued-fractions`, `math.alg.factoring-trinomials`, `math.alg.binomial-theorem`, `math.alg.pascals-triangle`, `math.disc.binomial-theorem`, `math.disc.propositional-logic`, `math.abst.binary-operation`

### LY-02 — 5 figures

Reason(s): "1" overlaps drawn geometry (22% of its box) (×2); "2" overlaps drawn geometry (25% of its box) (×2); "3" overlaps drawn geometry (25% of its box) (×2); "4" overlaps drawn geometry (25% of its box) (×2)

`math.arith.percentage-change`, `math.alg.polynomial`, `math.alg.quadratic-equation`, `math.geom.slope`, `math.func.domain-range`

### SM-02; ST-03 — 1 figures

Reason(s): the canvas holds text only, no drawn geometry (ink 0.23%); the canvas holds text only, no drawn geometry (ink 0.21%); no deterministic mathematics assertion covers this figure (no arithmetic chain, no mathCoreScenesBatch test na

`math.geom.distance-formula`

## Figure classes in the record

| class | scope | authorship | figures |
|---|---|---|---|
| scene | concept | authored-concept | 510 |
| card | domain | domain-fallback-card | 27 |
| card | concept | curated-card | 12 |
| card | domain | curated-card | 4 |
| scene | concept | shared-generator-default | 2 |
| scene | domain | shared-generator-default | 1 |

Note for the semantic review: the 27 `domain-fallback-card` figures are the DOMAIN's shared card shown for a concept that has no figure of its own (for example the shapes card for `math.geom.circle-area` or `math.trig.unit-circle`). They are readable but not figures OF the concept — that mismatch belongs to the visual-scope audit (`mathematicsVisualScopeAudit.test.ts`), not to this readability audit.

## Not covered
- Production rendering: no Mathematics figure has been checked in the real `/learn` page (Math queue item 3, needs a fresh go-ahead).
- Renderer / CSS changes are not in the fingerprint (a UI edit would otherwise force a 2-hour re-render): a change to the shared figure renderers or the cards listed above needs a re-run of `renderAudit.ts`.
- The 352 concepts that serve no figure (tier N and unassigned) are outside this record.

# Mathematics visual quality audit — render audit, freshness gate, review dispositions

Date: 2026-10-13/14. Scope: every Mathematics concept that serves a figure through the real resolver (`resolveVisual`, subject `mathematics`) — **556 of 908** concepts (513 scenes, 43 cards; 352 serve none). Procedure and re-audit steps: `docs/history/mathematics-visual-render-audit.md`. Committed record: `docs/qa/mathematics-visual-audit/` (`audit-summary.json` per-concept verdicts + fingerprints, `verdict-summary.json`, `review-dispositions.json`). Gates: `src/tests/mathVisualAudit.test.ts` (freshness), `mathReviewDispositions.test.ts` (dispositions bound to fingerprints), `mathVisualSemanticEvidence.test.ts` (deterministic evidence), `mathLabelAssociation.test.ts` (label-displacement backlog).

## Result

- **FAIL: 0.  PASS: 544.  REVIEW_REQUIRED: 12** (556 figures). Semantic dimension: 556 PASS / 0 REVIEW.
- Rendered in real Chromium (software WebGL) against the dev server, through the production resolver and renderers, **under the real lesson page's token scope** (`scope=lesson`, the `.learnCandy` class of `LessonScreen.module.css`): mobile 390 px (dark and light), desktop 1280 px (dark), desktop 50/50 column (dark) = **2,224 renders**, 0 render errors. Every slider/state of an interactive figure is driven and judged by the same rules as the default frame.
- By viewport: mobile: 550 PASS / 6 REVIEW / 0 FAIL; desktop: 544 PASS / 12 REVIEW / 0 FAIL; desktop-column: 547 PASS / 9 REVIEW / 0 FAIL.
- By dimension: structural: 544 PASS / 12 REVIEW; readability: 556 PASS; contrast: 556 PASS; layout: 556 PASS; graph: 556 PASS; semantic: 556 PASS; interactive: 555 PASS / 1 REVIEW.

Rules (shared with Physics/Chemistry/Biology, unchanged): `figureAudit.ts` (structure ST-*, readability RD-*, contrast CT-*, layout LY-*, graph GR-*) and `figureSemantics.ts` (SM-01). A figure is semantically PASS only if a deterministic assertion covers it (a `mathCoreScenesBatch<N>.test.ts` that names it, a shared generator's own consistency checker run on the served figure, or the card tests in `mathVisualSemanticEvidence.test.ts`).

### Harness fidelity: the audit page now renders under the lesson page's tokens

The first full pass rendered figures on the dev audit page with the GLOBAL design tokens. The real lesson page scopes its own (`.learnCandy`: `--sb-*`, `--coral`, `--text-*`, `--bg-*`). The difference is invisible for most figures but real for some: the shared process-flow badge numeral takes `--sb-accent-ink`, defined only in that scope — on the global page it fell back to white on amber (a false 1.8:1 contrast FAIL that does not exist in a lesson). The audit page therefore accepts `scope=lesson` (opt-in; Physics / Chemistry / Biology audits are measured exactly as before) and the whole Mathematics audit was re-rendered under it (the record above). This is the closest local approximation to the production `/learn` page; it is not a substitute for it (see "Production verification").

## What the audits found and what was repaired

The first phone/dark pass found **55 FAIL**; the lesson-scope pass 2 more. Every fix is in the figure or in the shared card it is drawn by — no audit rule was relaxed:

| Finding | Concepts | Cause | Fix |
|---|---|---|---|
| RD-02 + LY-01 (clipped text, overlap) | 26 (`geometry_shape` card) | the fact "∠A + ∠B + ∠C = 180°" sat at x = 50, y = 80 of a 300×100 viewBox: clipped at the left edge on a phone and drawn across the triangle's base and name | `GeometryShapes.tsx`: centred under all three shapes (viewBox 300×114) |
| GR-02 (axis has no name) | 17 | plotted graphs whose axes carried no letter | the axis letter added (x, y, t, T) |
| GR-01 (graph with no axes) | `math.calc.critical-points` | the shared `calculus_graph` generator drew the curve alone | `calculusGraph.pure.ts` draws a named pair of axes (every `calculus_graph` figure gains them) |
| GR-04 (curve leaves its axes) | `math.opt.convex-optimization` | the left curve rose above the axis | the axis made taller |
| ST-08 / ST-04 (LaTeX-looking text, "undefined") | 9 | `e^{it}`, `∫_{−∞}^{∞}`, `1_{Eᵢ}`, a `$2 … $4` price pair, and the word "undefined" in learner-facing text | rewritten in plain words |
| LY-02 / CT-01 | `math.arith.fractions` (`fraction_bar` card) | with an even numerator the caption "2/3" sat on a cell divider | caption centred in a cell |
| LY-02 | `math.nt.prime-distribution` | a bar's count sat on the violet average line | counts of bars shorter than the average are written beside the bar |
| LY-02 | `math.func.inverse-functions`, `math.geom.slope`, `math.func.domain-range` | the axis letter x sat on the arrow head | moved below the axis |
| LY-02 | `math.arith.percentage-change` | "+15" sat on the bar | moved to the bar's end |
| LY-02 / LY-01 (lesson scope) | `math.alg.polynomial`, `math.alg.quadratic-equation` (`coordinate_plane` card) | tick numerals sat ON grid lines; and in the lesson font the origin "0" overlapped the x tick "−1" | surface-colour halo on every tick numeral; the origin "0" moved right of the y axis |
| RN-01 | 4 foundations figures | a render crashed when the browser was interrupted | re-rendered clean |

## The 61 REVIEW_REQUIRED figures of the first audit — dispositions

Each of the 61 has a recorded disposition in `review-dispositions.json`, bound to the figure's current fingerprint and checked by `mathReviewDispositions.test.ts`: **43 ASSERTION_ADDED** (a deterministic assertion now covers the figure and it passes), **6 FIXED_DEFECT** (a genuine layout / structure defect, repaired), **12 VALID_TEXT_FIGURE** (the figure is a table / worked layout; the audit rule flags "no drawn geometry" for exactly those and they remain REVIEW_REQUIRED by design). After the work, 12 figures remain REVIEW_REQUIRED and 49 are PASS.

- **Cards (43).** The five 2D cards (`number_line`, `fraction_bar`, `percentage_grid`, `coordinate_plane`, `geometry_shape`) are asserted from the markup they draw (tick count and spacing, filled cells, the point at (2, 3), the triangle's three angles summing to 180°, text inside its viewBox, …); the two 3D cards (`three_geometric_solids`, `three_transformations`) from their exported geometry data (four solids of the right kinds, in caption order, with room between them; a non-zero translation, non-zero rotation and a uniform enlargement). A sweep checks every card a Mathematics concept is served belongs to that concept's DOMAIN. Four regression mutations (old caption position, old 180° position, no halo, no axes) each fail a test.
- **Shared-generator scenes (4):** `math.geom.triangle`, `math.geom.distance-formula`, `math.calc.critical-points`, `math.stats.data-visualization` — each generator's own independent consistency checker is run on the figure the resolver serves.
- **Text-only figures (12), still REVIEW_REQUIRED:** `math.found.truth-table`, `math.arith.column-addition`, `math.nt.prime-factorization`, `math.nt.congruence`, `math.nt.continued-fractions`, `math.alg.factoring-trinomials`, `math.alg.binomial-theorem`, `math.alg.pascals-triangle`, `math.geom.distance-formula`, `math.disc.binomial-theorem`, `math.disc.propositional-logic`, `math.abst.binary-operation`. Opened at 390 / 1280 px: legible, no clipping or overlap, 0 machine FAIL; every number they state is pinned by `mathCoreScenesBatch<N>` tests. `math.geom.distance-formula` additionally flags its slider states y₁ / y₂ / all = min (thin line, small in its frame: ink 0.2-0.3 %): legible, not a defect.

### Owner question Q1 (a product decision, not a rendering defect)

31 concepts without a figure of their own are shown their DOMAIN's shared overview card (the shapes card for circle-area or unit-circle, the number line for absolute-value, the coordinate plane for the quadratic equation). Accept them as domain-scope overviews, or author concept-specific figures (the tier-N campaign)? Not a rendering defect; a product decision. The 31 concepts: `math.found.rational-numbers`, `math.found.real-numbers`, `math.arith.negative-numbers`, `math.arith.ordering`, `math.arith.absolute-value`, `math.arith.integer-arithmetic`, `math.alg.polynomial`, `math.alg.quadratic-equation`, `math.geom.angle`, `math.geom.angle-types`, `math.geom.angle-measurement`, `math.geom.angle-pairs`, `math.geom.triangle-types`, `math.geom.triangle-angle-sum`, `math.geom.right-triangle`, `math.geom.congruent-triangles`, `math.geom.similar-triangles`, `math.geom.triangle-centers`, `math.geom.area-triangle`, `math.geom.polygon-angle-sum`, `math.geom.regular-polygon`, `math.geom.area-polygon`, `math.geom.perimeter`, `math.geom.circle-parts`, `math.geom.circle-circumference`, `math.geom.circle-area`, `math.trig.angle-measure`, `math.trig.right-triangle-trig`, `math.trig.special-angles`, `math.trig.unit-circle`, `math.trig.reference-angles`.

## Card-host label-displacement review (batches 1-29)

`scripts/math/label-displacement.ts all 14` lists **218 figures / 483 labels** moved more than 14 px by the production solver on the 570 × 370 card host. The real-Chromium audit (3 widths × 2 themes) found no clipping, overlap or contrast failure in any of them. The remaining question — does a move break a label's association with what it names — is measured by `scripts/math/labelAssociation.ts`: 341 of the 483 labels were ATTACHED (authored within 30 px of drawn geometry) and **332 stay within 75 px (about two text lines) of that geometry**; 142 are free captions (their destination does not change what they name). The 9 attached labels that ended further away were each opened in the 50/50-column render and accepted — the label keeps its role colour, stays in the same region and no object of that colour is nearer:

| figure | label | verdict |
|---|---|---|
| math-basis | w = 2b₁ − b₂ | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-curves-in-space | curvature 1.25 | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-derivative-intro | slope 2: steeper | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-inverse-variation | 2 × 3 = 6 | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-line-integrals | path-dependent | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-polar-coordinates | θ = 60° | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-proper-subset | 3 ∈ B, 3 ∉ A | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-pythagorean-theorem | c = 5 | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |
| math-trig-functions | sin θ = 0.77 | accepted: unambiguous in the 566 px column render (same role colour, same region of the figure, no nearer object of that colour) |

`mathLabelAssociation.test.ts` pins the outcome (the far set must equal this reviewed list) and asserts that batches 30 and later have no card-host move at all. Reproduce: `npx tsx scripts/math/labelAssociation.ts`.

## Production verification — NOT performed (blocked)

The deployed app was checked only as far as it can be without a login: the production deployment for the audited commit is READY on Vercel (deployment API) and `/` answers 200; `/learn` redirects (307) to the login; the dev audit page is 404 in production, as designed. The real `/learn` page needs an authenticated learner, and this task's rules forbid account deletion, so no disposable account was registered. **Action to complete it:** run `npx tsx scripts/qa/physicsProductionBrowserAudit.ts --subject mathematics --only <concept ids> --out docs/qa/mathematics-visual-audit/production-<date>.json` after you approve the disposable-account lifecycle (`scripts/qa/liveAccount.ts`: register → drive → delete, `qa-*@mytutor-qa.invalid`, deleted with re-login verified), or supply credentials as an ephemeral env var. Suggested sample: `math.geom.circle-area`, `math.trig.unit-circle` (shapes card), `math.arith.fractions` (fraction bar), `math.alg.polynomial` (coordinate plane), `math.geom.volume` (3D solids), `math.nt.congruence`, `math.found.truth-table` (text figures), `math.calc.critical-points`, `math.calc.ftc-part1`, `math.geom.distance-formula` (sliders).

## Not covered
- Renderer / CSS changes are not in the fingerprint (a UI edit would otherwise force a 2-hour re-render): a change to a shared renderer or card component needs a re-run of `renderAudit.ts` for the concepts it serves.
- The 352 concepts that serve no figure are outside this record.
- Whether a figure teaches its concept well (beyond the asserted numbers) is a human review (deferred queue item 2); the 12 text-only figures and Q1 are the open pieces.

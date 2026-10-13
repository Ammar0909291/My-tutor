# My Tutor — Zero-Open-Item Visual Quality Closure (2026-10-12/13)

Shared figure legibility · Physics · Chemistry · Biology · production verification · egress.
Every finding ends in exactly one of: **FIXED AND VERIFIED**, **INTENTIONAL AND VERIFIED**, **BLOCKED** (owner/evidence/finishing test named),
**NOT REPRODUCIBLE**. Nothing is called production-verified unless it was measured on the deployed `/learn` page; QA-harness defects are kept separate from app defects.

**Final verified commit: `23c52bf`** on `main` (= `origin/main`, clean working tree) — deployment **`dpl_2qXa8KT6TL49AFbwnqicesn57jWa`**, READY, `aliasError: null`, alias `my-tutor-flame.vercel.app`, exact commit `23c52bf0d8d4942a65a62a2aab39ceff682b30c8`.
CI (`validate`, run #4601): **success** for `23c52bf` (type-error ratchet, vitest, knowledge-graph validator, educational-package determinism, visualization-registry coverage).
The earlier verified deployments are `dpl_DfiW33EV…` (`74f4207`) and `dpl_CY88qN1U…` (`9b26c89`); `23c52bf` adds the closure documents and the other worker's Mathematics batch 41 (`mathCoreScenesB41.ts`, its test, 19 registry lines) — no Physics, Chemistry, Biology or hook code.
Any commit after `23c52bf` is documentation only (this report). Evidence: `docs/qa/physics-visual-audit/production-2026-10-13/` (README + JSON + screenshots).

## Who did what (so nothing is credited twice)

* **This campaign:** shared hook, harness, Physics (weight label, lens power, normal force), egress, the production verification of everything below, cross-subject regression.
* **Biology workstream (another worker, on `main` since 2026-10-12):** the six REVIEW_REQUIRED figures (`ea3660e`, `c2c6832`, `d19b00f`), ledger in `docs/qa/biology-visual-audit/README.md`.
* **Chemistry workstream (another worker, merged to `main` 2026-10-13):** R1–R19 and the 186-concept classification (`5ef4638` … `5465509`), ledger in `docs/qa/CHEMISTRY_VISUAL_QUALITY_AUDIT.md` §12.
* Two subagents started here for Biology and Chemistry **duplicated that work** (their base predated those pushes) and were stopped; their edits are archived and stashed, not merged, and nothing of theirs shipped. They were not credited above.

## Closure table

| # | Finding | Resolution | Test evidence | Production evidence | Final status |
|---|---|---|---|---|---|
| 1 | Shared `useFigureLegibility`: an older card mounted above the fold never got the contrast lift (found 3.11–3.99:1 in prod) | Reruns on visibility (IntersectionObserver), resize, DOM mutation, theme and colour-scheme change; unmeasurable text is *marked*, not reported as success; 4.5:1 unchanged; cleanup removes observers and markers; SSR-safe | `figureLegibilityBrowser.test.ts` — 20 real-Chromium tests incl. a negative control that reproduces the defect | before `485f75d`: 8 PASS / 8 FAIL; after `74f4207` and final `9b26c89`: **16/16 PASS** (4 cards, 390/1280, light/dark, each scrolled into view), all markers present, none unmeasured | **FIXED AND VERIFIED** |
| 2 | QA harness measured the wrong card (first/last figure by DOM position) | Figure tied to the reply by `data-message-id` markers; `WRONG_FIGURE` thrown when it cannot be tied; rows record message id, selection mode, ambiguity; two production-found sub-defects fixed (replies collapsed behind "Read more →"; a scene's sliders outside its frame) | `figureAssociationBrowser.test.ts` — 19 tests | every production row carries the message id; wrong-card is a hard error | **FIXED AND VERIFIED** (harness defect — kept separate from app defects) |
| 3 | Weight label touched its arrowhead at 1280 px | `FORCE_DIAGRAM.labelGap` 6 / `headHalfWidth` 10; label starts clear of the head and runs away | `physicsCardSemantics.test.ts` (83 tests, with a negative control) | measured gap **6.8 px (390) / 10.7 px (1280)**, light+dark, on the lessons that draw the weight/normal step (free-body-diagram, equilibrium: 8/8 PASS). `force`/`friction` replies were too short to reach that step (recorded harness limit) | **FIXED AND VERIFIED** |
| 4 | Lens power was a static figure | Interactive parametric scene (P, P₁, P₂, gap); printed powers re-derived from the drawn rays; P=0 prints f=∞, no division by zero; apart: P=P₁+P₂−d·P₁P₂ and the sum rule is said not to hold | `lensPowerInteractive.test.ts`; dev render PASS in every slider state × 390/1280 × light/dark | slider checks (P=+4, −2, 0; pair +4/+2 in contact = +6 D; pair 0.1 m apart = +5.2 D): **24/24 PASS** on `74f4207` (4 views × default + 5 checks); on `9b26c89` all 24 lens-power cells PASS | **FIXED AND VERIFIED** |
| 5 | Normal force was level-only; the lesson teaches slope and push | Interactive scene (θ 0–60°, push F; N = (mg+F)cos θ; arrow ⟂ the drawn surface; load resolved; Third-Law partner N′) | `normalForceInteractive.test.ts` (23 tests incl. negative controls) | N = 1.00 / 0.87 / 0.50 / 1.50 mg checks: **20/20 PASS** on `74f4207`; on `9b26c89` 15 PASS + 1 NOT_RUN (a network timeout on `page.goto` for one view) and the whole set re-run: **20/20 PASS** | **FIXED AND VERIFIED** |
| 6 | Physics render audit freshness (two concepts changed renderer) | Re-rendered the 5 changed concepts (390/1280, light/dark, every slider state) and merged | `physicsVisualAudit.test.ts`, `physicsSemanticReview.test.ts` | 283 concepts: **266 PASS / 17 REVIEW_REQUIRED / 0 FAIL**; REVIEW items carry ledger decisions | **FIXED AND VERIFIED** |
| 7 | Biology — six REVIEW_REQUIRED figures: `brain-regional-organization`, `cell-theory`, `dna-replication`, `predator-prey-dynamics`, `mycorrhizae-plant-symbioses`, `plant-growth-hormones` | Resolved by the Biology workstream (anatomical brain; three tenets; 9-label DNA replication; RK4 predator–prey plot; arbuscular vs ectomycorrhizal vs nodule; function per hormone) | `bioClosureFigures.test.ts` (in the 344-test targeted run and the full suite) | independent run on the real page, 6 concepts × 4 views: **22/24 PASS** on both `74f4207` and `9b26c89`; the 2 FAIL are one concept at 1280 (see #8) | **FIXED AND VERIFIED** (by the Biology workstream; re-verified here) |
| 8 | Biology `mycorrhizae` @1280: `RD-02 "More insights" is clipped` in this campaign's production audit | The card is ~1,440 px tall on the 1280 layout; the audit aligns its top with the window top and its last control sits under the lesson page's fixed footer. Checked, not assumed: on production at 1280×1700, 1280×900 and 1366×768 the control is reachable and uncovered after scrolling | `production-2026-10-13/README.md` (+ `FINAL-9b26c89-biology.json`) | reachability check ×3 window sizes; the Biology workstream's own production audit measured this concept clean | **INTENTIONAL AND VERIFIED** (a harness position artifact, not an app defect). Observation for the Biology owner: the all-stages "What's happening?" panel is long enough to make the card taller than a laptop window |
| 9 | Chemistry — objective defects R1–R19 | Resolved by the Chemistry workstream (186 concepts classified; 1,086 rendered states: 990 PASS / 96 REVIEW / 0 FAIL; R2 lone pairs/bond order, R6 picker, R7 key, R8 units, R9, R10, R12, R19 fixed; R5/R15/R16 decided by design with measurement) | `chemistryClosureGates.test.ts`, `chemistryVisualAudit.test.ts`, `chemistrySemanticReview.test.ts`, `chemistrySeedEquations.test.ts` (full suite green: 973 files / 24,881 tests) | representative figures incl. Born–Haber, Hess, galvanic cell, real gases, crystal field, 4 views each: **20/20 PASS** (`74f4207`), **20/20 PASS** (`9b26c89`; one cell re-run after a network timeout) | **FIXED AND VERIFIED** for the objective defects |
| 10 | Chemistry — what the Chemistry workstream left REVIEW_REQUIRED | 33 Tier-3 figures judged MINOR, 2 approved Tier-2 flows (corrections prepared, not applied), the chelate-effect chart (1 UNVERIFIED reference value), R1's production probe row (SQL prepared, **not executed**), 14 concepts whose only figure was retired as wrong and have none until a faithful one is authored | `semantic-review.json`, `reference-data-ledger.json`, `tier2-corrections-prepared.md`, `R1-production-probe-fix.sql` | n/a (a production write or an authoring decision is required) | **BLOCKED** — owner: accept/regenerate/retire the Tier-3 figures, approve the Tier-2 corrections and the R1 `UPDATE`, author the 14 figures. Finishing tests: `chemistrySemanticReview.test.ts` (fails when an entry's fingerprint changes), `chemistrySeedEquations.test.ts` |
| 11 | Shared-component blast radius: the hook (used by `VisualCard`, `VisualRenderer`, Process/Graph/Geometry/NumberLine renderers) and the Chemistry worker's `GraphRenderer` fix | Hook lifts only text that fails 4.5:1 and keeps every authored colour otherwise; Biology layout stays behind `isBiologyScene`/`fitToCanvas` | invariance/fingerprint suites in the full run; Physics + Biology + Chemistry audits re-run | **40/40 Physics graph concepts unchanged** (390/1280, light/dark); **180/180 Chemistry Tier-2/3 states identical** to the committed record (164 PASS / 16 REVIEW / 0 FAIL); Biology 22/24 (see #8) | **FIXED AND VERIFIED** (no regression found) |
| 12 | "Egress above 5 GB" | Cycle total (spent 2026-10-05→07 by synthetic campaigns: ≈ 2.4–3.3 GB for those three days alone, estimate — the meter is not readable through the MCP) cannot be lowered; the one live read that grows with use (`captureGenerated*` loaded the whole lineage: ≈ 52 KB per capture) now reads two rows | `captureLineageEgress.test.ts` (14 tests) | post-deploy `snap5`: spine and whole-lineage reads **+0** over 14.5 h; 5,710 rows across the 29 heaviest statements (< 5 MB/day vs ≈ 167 MB/day share). Honest limit: this window had too few capture-triggering turns to measure the new per-call value — the unit test pins it | **FIXED AND VERIFIED** (code and live rate); the already-spent cycle total is **BLOCKED** on the owner (dashboard-only figure; plan/retention decision, see #13) |
| 13 | Database size 717 MB (spine_events 283 MB, messages 144 MB, evidence_events 66 MB; 30,436 never-served DRAFT explanations) | Not changed — a data-retention call | — | measured only | **BLOCKED** — owner: decide pruning/retention (and the plan's 500 MB limit if on the free tier). Finishing test: re-measure `pg_database_size` after the decision |

## Gates (exact tree `23c52bf`, clean working tree, run 2026-10-13)

| gate | result |
|---|---|
| `npx tsc --noEmit` | **exit 0** |
| `npx next lint` | **exit 0** (0 errors; the 12 pre-existing warnings unchanged) |
| `REQUIRE_BROWSER_TESTS=1 npx vitest run` (full suite, real-Chromium suites required) | **974 files passed; 25,027 tests passed, 9 skipped, 0 failed** — includes Mathematics batch 41 |
| `npm run build` (`prisma generate && next build`) | **exit 0** |
| CI `validate` #4601 on `23c52bf` | **success** |
| Vercel `dpl_2qXa8KT6TL49AFbwnqicesn57jWa` | **READY**, commit `23c52bf`, aliased to `my-tutor-flame.vercel.app` |
| Production smoke on that deployment (disposable accounts, deleted, re-login blocked) | shared contrast fix: **16/16 PASS** (4 force-diagram cards, 390/1280, light/dark, each scrolled into view); lens-power + normal-force sliders: **44/44 PASS** (`FINAL2-23c52bf-legibility.json`, `FINAL2-23c52bf-interact.json`) |

History of the same gates on earlier trees: `74f4207` merged tree — full vitest 966 files / 24,582 passed; `9b26c89` + docs — 973 files / 24,881 passed; both with `tsc` 0, lint 0, build 0.
Nothing was changed in code during this verification; no reopened fixes, no Chemistry data touched, no prepared SQL executed, no scope added.

## Remaining owner decisions (all BLOCKED items, unchanged)

1. **Chemistry — items the Chemistry workstream left REVIEW_REQUIRED:** accept / regenerate / retire the 33 Tier-3 figures judged MINOR; approve (or reject) the 2 prepared Tier-2 corrections (`tier2-corrections-prepared.md`); the chelate-effect chart's 1 UNVERIFIED reference value; **R1's production probe row — the SQL is prepared (`R1-production-probe-fix.sql`) and has NOT been executed**; author a faithful figure for the 14 concepts whose only figure was retired as wrong. Finishing tests: `chemistrySemanticReview.test.ts`, `chemistrySeedEquations.test.ts`.
2. **Egress:** the already-spent 5 GB cycle total (2026-10-05→07) is a dashboard-only figure and cannot be lowered from the repo; the fix removes the live read that grows with use. Re-measure after real-learner traffic (`captureLineageEgress.test.ts` pins the per-call read).
3. **Database size 717 MB** (spine_events 283 MB, messages 144 MB, evidence_events 66 MB; 30,436 never-served DRAFT explanations): a data-retention decision. Finishing check: re-measure `pg_database_size` after the decision.
4. **Observation for the Biology owner (no action requested here):** the all-stages "What's happening?" panel for `bio.plant.mycorrhizae-plant-symbioses` makes that card taller than a laptop window (its last control is reachable by scrolling — verified).

## Re-running

```
# shared hook + harness
REQUIRE_BROWSER_TESTS=1 npx vitest run src/tests/figureLegibilityBrowser.test.ts src/tests/figureAssociationBrowser.test.ts
# production (disposable accounts, deleted + re-login verified)
npx tsx scripts/qa/productionVisualClosure.ts --mode legibility --subject physics --concept phys.mech.force --cards 4 --out r.json --shots shots --deployment <dpl> --commit <sha>
npx tsx scripts/qa/productionVisualClosure.ts --mode interact --subject physics --out r.json --shots shots --deployment <dpl> --commit <sha>
npx tsx scripts/qa/physicsProductionBrowserAudit.ts --subject biology|chemistry|physics --concepts a,b --out r.json --shots shots
# local render regression
npx tsx scripts/qa/physicsVisual/render.ts --out <dir> --concepts <ids> --viewports mobile,desktop-column --workers 2   # on a WARM dev server
npx tsx scripts/qa/physicsVisual/validate.ts --in <dir> --out <dir2> ; npx tsx scripts/qa/physicsVisual/merge-audit.ts --base docs/qa/physics-visual-audit/audit-summary.json --update <dir2>/audit-summary.json --out docs/qa/physics-visual-audit/audit-summary.json
```
A render on a **cold** dev server produces an unstyled page and spurious edge-ink/overlap findings — load the app once and wait before measuring.

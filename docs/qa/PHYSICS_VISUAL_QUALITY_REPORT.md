# Physics Visual Quality Report — 2026-10-07/08

Consolidated production audit of every learner-facing Physics visual: generation → validation → readability
gate. Every figure was **actually rendered** (headless Chromium + SwiftShader WebGL) at a 390 px phone and a
1280 px desktop column, in dark and light themes, and measured from what the browser painted — DOM boxes,
computed styles, and the pixels behind each glyph. Nothing below is called "validated" unless it was rendered
and measured.

Record: `docs/qa/physics-visual-audit/` · method and fixes: `docs/history/physics-visual-readability-gate.md`.

**Headline.** 283 concepts: baseline **90 PASS / 1 REVIEW / 192 FAIL** → final **262 PASS / 21 REVIEW_REQUIRED / 0 FAIL**,
0 missing renders, no threshold lowered. Newton and Pendulum PASS in every driven state.

**Update 2026-10-08 — see §17.** The 21 REVIEW_REQUIRED figures were reviewed by hand: 7 PASS, 13 fixed, 1 left for the owner (`phys.opt.lens-power`); machine audit now **264 PASS / 19 REVIEW_REQUIRED / 0 FAIL**. The numbers in §§1-16 are the 2026-10-07 record and are kept unchanged.

---

## 1. Inventory

Every concept in `docs/physics/kg/graph.json` (283) resolved through the production `resolveVisual` path
(`"show me a diagram"`, `learnerRequest: 'diagram'`).

| | |
|---|---|
| Concepts | 283 |
| Figure class | 265 scene (3D/2D `SceneSpec`), 18 curated card |
| Authorship | 243 authored per concept · 22 shared-generator default · 18 curated card |
| Scope | 271 concept-scoped · 12 domain-scoped (pinned interactive figures) |
| Interactive (sliders / simulation) | 23 |
| Graph figures (axes + curves) | 40 |
| Parametric generator kinds swept | 11 |
| Rendered states | 1,405 (default + every slider min/max, all-min, all-max, two alternating combinations, and the simulation phases) |

Not individually rendered: the **158 cached generated figures** (the harness cannot reach the generated-figure
cache). They are held to the same gate at admission (§4, parity), not by a browser render.

## 2. Initial render audit (baseline)

Pristine source (git worktree at the pre-fix commit) rendered with the same harness: **849 renders, 0 errors**.

| Verdict | Concepts |
|---|---|
| PASS | 90 |
| REVIEW_REQUIRED | 1 |
| FAIL | **192** |

By dimension (FAIL counts): contrast 184 · layout 17 · readability 10 · graph 3 · semantic 3 · structural 0.
By viewport: mobile 191 FAIL, desktop-column 28 FAIL.

## 3. Failure clusters (shared renderer defect vs per-visual)

| Rule [region] | Findings | Concepts | Cause | Kind |
|---|---|---|---|---|
| CT-01 [chrome] | 199 | 181 | play/replay glyph white on chalk-yellow, **1.84-2.00:1** | shared renderer |
| CT-01 [svg-text] | 135 | 12 | SVG card text 3.99:1 on its real backdrop | shared renderer |
| CT-01 [scene-label] | 65 | 3 | 3D label colour on same-hue body (2.3-3:1) | shared renderer |
| LY-01 | 79 | 10 | labels printed over one another at 390 px | shared solver |
| RD-02 [scene-label] | 32 | 8 | axis letters 32-95 % visible (cut by canvas) | shared renderer |
| LY-06 | 31 | 8 | drawing cut off at the canvas edge | shared renderer |
| SM-03 / GR-01 / GR-04 | 9 / 2 / 1 | 3 / 2 / 1 | kinematics graphs: no axes, curve outside axes | per-generator |
| LY-02 | 6 | 3 | label on drawn geometry | solver |
| RD-02 [svg-text] | 2 | 2 | "spectral line" cut at the viewBox edge | per-visual |

## 4. Repairs

Fixed once at the owner of each defect — no per-figure patching for a shared cause.

1. `VisualPlaybackControls`: glyph `var(--on-accent)`, speed chips >= 24 px (181 concepts).
2. `useFigureLegibility` rule 3: SVG `<text>` lifted to 4.5:1 on its measured backdrop, both themes.
3. `meshColor()` (3:1 on the figure surface); `themeColor` left unchanged (tests pin it).
4. **Label solver** (`layout.ts`): 2 px edge inset; escalation over a 2 px grid of the whole canvas; then the same words wrapped narrower; then one typographic tier smaller (never below the 10 px floor); labels left on a body get a surface-colour plate; axis letters are late labels on a plate.
5. `kinematicsGraphs.pure.ts`: three stacked graphs, each with its own axes, units and end-value ticks.
6. `cameraDistanceToContain` (only ever moves further) and `anchorOf` (text above large bodies).
7. `stageView` drops focus ids that name nothing drawn (electric-dipole step 5).
8. `SceneStageDecor`: ground plane and axis triad kept inside the frame (were 1.3-2.2x past the bottom edge).
9. Per figure: `EnergyLevelDiagram` caption centred; `gravitationOrbit` ring and bodies larger; damped-oscillation axis arrow.
10. **Generated-visual parity.** `admitVisualAsset` — the single gate for tiers 0-3 — now runs `payloadBlockers` (FAIL data findings, raw LaTeX, equation contradictions, forbidden text) and refuses with `failed-audit`; `figureCritic.checkRendering` applies the same blockers to a generated figure. Authored and generated figures cannot differ at this gate.
11. **Fail-closed.** A figure that fails the gate is refused, never shown; the learner gets no figure rather than a wrong one.

## 5. Post-fix audit

Full 849-render re-audit on the final code (12 concepts re-rendered after the last decor fix) + 12 simulation runs.

| Verdict | Baseline | Final |
|---|---|---|
| PASS | 90 | **262** |
| REVIEW_REQUIRED | 1 | 21 |
| FAIL | 192 | **0** |
| Missing renders | 0 | 0 |

By dimension (final): structural 277 PASS / 6 REVIEW · readability 283 PASS · contrast 283 PASS · layout 279 PASS / 4 REVIEW · graph 283 PASS · semantic 269 PASS / 14 REVIEW · interactive 281 PASS / 2 REVIEW.

## 6. Readability — desktop 1280 and phone 390

Mobile: 277 PASS / 6 REVIEW / 0 FAIL (baseline 91 / 1 / **191**). Desktop column: 277 PASS / 6 REVIEW / 0 FAIL (baseline 247 / 8 / **28**).
Readability dimension 283/283 PASS (baseline 10 FAIL): no text clipped, no label under the 10 px floor, no text outside the canvas, no label on another label. The 6 structural REVIEWs are text-only figures (§15).

## 7. Contrast (from rendered pixels, not from tokens)

Median backdrop contrast behind every glyph, measured on a text-hidden capture, both themes: contrast dimension **283/283 PASS** (baseline 184 FAIL). Text >= 4.5:1 (>= 3:1 large), graphics >= 3:1, targets >= 24 px. Mesh colours >= 3:1 and label colours >= 4.5:1 are also asserted for the whole corpus in both themes by `physicsVisualReadability.test.ts`.

## 8. Graph validation

40 graph figures (detected by arrow pairs crossing at the axis start, per-panel curve assignment). Rules GR-01 (axes present), GR-02 (axes named), GR-04 (curves inside axes): **40/40 PASS** (baseline 3 FAIL, all kinematics). The kinematics generator's independent consistency checker was rewritten to the stacked layout and swept over the slider domain: 0 failing states.

## 9. Semantic physics

Deterministic only. Evidence: unit/dimension arithmetic chains in every printed equation (`figureSemantics.ts`); the physics-asserting test files; and for the 11 parametric kinds an independent re-derivation of what is drawn at every state of the slider grid.

| Kind | States | Built | Refused by its own validator | Failing |
|---|---|---|---|---|
| torque_diagram | 36 | 36 | 0 | 0 |
| electric_dipole | 176 | 176 | 0 | 0 |
| projectile | 12 | 12 | 0 | 0 |
| vector | 93 | 87 | 6 | 0 |
| circular | 15 | 15 | 0 | 0 |
| pendulum | 15 | 15 | 0 | 0 |
| collision | 176 | 42 | 134 | 0 |
| kinematics_graphs | 36 | 36 | 0 | 0 |
| ray_optics | 121 | 120 | 1 | 0 |
| electric_circuit | 65 | 65 | 0 | 0 |
| gravitation_orbit | 12 | 12 | 0 | 0 |

"Refused" = a combination the generator itself rejects (the frame keeps the last good figure) — counted, not judged. The collision generator refuses most of its grid; that is pre-existing.
Result: **269 PASS, 14 REVIEW_REQUIRED, 0 FAIL** (baseline 266 / 14 / 3). A figure with no deterministic assertion is REVIEW_REQUIRED, never PASS.

## 10. Interactive states

* **Newton's second law** (`phys.mech.newtons-second-law`): frame 0 (idle), prediction made, running, paused, stepped x2, reset, finished (run 1), finished (run 2, one value doubled), m = min, m = max — 67 rendered states across 6 viewport/theme runs: **PASS in every dimension**.
* **Pendulum** (`phys.wave.pendulum`): frame 0, prediction, running, paused, stepped, reset, finished x2, swing angle = min / max — 83 states: **PASS in every dimension**.
* Drive method: only the buttons and sliders a learner uses. The simulations' learning logic was not changed or bypassed.
* **Other interactive figures (21):** every slider min / max, all-min, all-max and two alternating combinations rendered and judged by the same rules as the default frame: 281 PASS / 2 REVIEW (the 2 are the optical-axis labels, §15).

## 11. Regression tests added

| File | Tests | Pins |
|---|---|---|
| `figureAudit.test.ts` | 24 | every verdict rule, incl. false-positive guards |
| `figureSemantics.test.ts` | 23 | unit/dimension arithmetic |
| `physicsVisualReadability.test.ts` | 43 | PHYS-VIS-01..09 — playback contrast; text lift; mesh contrast; stacked graphs; fail-closed gate and generated parity; whole-corpus 4.5:1 / 3:1; **label placement across every served stage and every slider state at 390 and desktop size**; decor inside the frame |
| `physicsKindSweep.test.ts` | 14 | slider-domain sweep of the 11 kinds; dangling focus ids |
| `physicsVisualAudit.test.ts` | 7 | committed verdicts still describe what ships (per-concept fingerprint), all 283 covered, 0 FAIL |
| `visualLabelPlacement.test.ts` (updated) | 15 | placement contract incl. rarity of far-moved labels |

Patterns matching the English ENGL-016/017 defects (raw LaTeX in a label, label text under 4.5:1) are covered for Physics (`containsRawLatex`, label contrast corpus gate); no English file was modified.

## 12. Test results

| Check | Result |
|---|---|
| Targeted visual / layout / audit suites | pass |
| Browser audit (Chromium, 390 + 1280, dark + light) | 849 renders + 12 simulation runs, 0 errors, 0 FAIL |
| Full vitest suite | **905 files passed / 905; 18,097 tests passed, 9 skipped** |
| `tsc --noEmit` | 0 errors |
| ESLint (`next lint`) | 0 errors; 12 warnings — identical to the pre-change HEAD (all pre-existing) |
| `npm run build` (`prisma generate && next build`) | exit 0 (warnings only from `jose` in the Edge runtime, pre-existing); `/dev/physics-audit` compiles and returns 404 in production |

## 13. Production status

Deployed: `main` fast-forwarded `b07037f` (English fixes) → `c2cba6a`; Vercel deployment `dpl_8dhQ4cU4knAoimkytLPTNZevTjo9` built from `c2cba6a` and is **READY** on the production alias. The English fixes are an ancestor of the deployed commit, so they were not overwritten. Deployed only after: 0 FAIL in the full browser re-audit, the new regression tests, the full suite (905 files), tsc, ESLint and `npm run build` all green.

Verified again in production, as a disposable learner (account created through the app, deleted afterwards):

1. **Served figure = audited figure** (`production-verification.json`): for 10 repaired concepts the scene sent over the wire for "show me a diagram" is byte-identical to what `resolveVisual` serves from this commit (9/9 scenes; the 10th, Bohr model, is the `energy_level_diagram` card), with 0 payload blockers and 0 data FAILs.
2. **Rendered in the real production lesson page** (`production-browser-audit.json`): the deployed app's `/learn` page, in Chromium, 390 px and 1280 px, dark and light, 9 concepts x 4 = **36 renders, 36 PASS**, measured with the same in-page auditor and the same rules as the dev-page audit. One navigation timeout (`net::ERR_TIMED_OUT`, orbital-mechanics mobile/dark) was re-run and passed. Default state only; slider and simulation sweeps were done on the dev page (§10) because the dev page cannot exist in production.
3. `/dev/physics-audit` answers 404 in production (it is `notFound()` outside development).

Not verified in production: the 158 cached generated figures (no way to enumerate them), the 274 concepts not in the sample of 9, and non-default slider states. Those rest on the local audit of the same source.

**Blast radius beyond Physics (read this).** The label solver, `SceneLabel` plate, `useFigureLegibility` text lift and `cameraDistanceToContain` are shared components. They are additive and fail-safe (they act only where a label previously overlapped, sat on a body, or text was under 4.5:1), the full suite including the other subjects' visual tests is green, but **other subjects' figures were not browser-audited** and may look slightly different (e.g. a label that used to sit on a body now sits on a small surface-colour plate; SVG text lifted to 4.5:1). Production rollback target if needed: deployment `dpl_9KsxZ4GFAvL1igMK8v33ZnqaLo8t` (`b07037f`).

## 14. Remaining failures

**None.** 0 FAIL across 283 concepts, 0 missing renders.

## 15. REVIEW_REQUIRED visuals (21) — by reason

* **No deterministic physics assertion covers it (SM-02), 14:** `phys.meas.vector-products`, `phys.mech.free-body-diagram`, `phys.mech.friction`, `phys.mech.normal-force`, `phys.mech.conservation-of-momentum`, `phys.mech.equilibrium`, `phys.mod.wave-particle-duality`, `phys.qm.wave-function`, `phys.qm.particle-in-box`, `phys.qm.hydrogen-atom-qm`, `phys.qm.spin`, `phys.qm.quantum-tunneling`, `phys.stat.probability-basics`, `phys.astro.gravitational-waves`. Rendering is clean; a person must confirm the physics.
* **Text-only layout, no geometry to validate (ST-03), 6:** `phys.meas.units`, `phys.meas.dimensions`, `phys.particle.particle-classification`, `phys.particle.conservation-laws`, and `phys.opt.lenses` / `phys.opt.lens-power` (one slider state). Readable and correct; they are labelled text on a canvas by design.
* **Label sits on a drawn line by design (LY-02), 1 more:** `phys.opt.mirrors` (`P` / `F` on the optical axis). The same optical-axis labels also appear on `phys.opt.lenses` / `phys.opt.lens-power`, and one card caption ("infinite square well") on `phys.qm.particle-in-box`; those concepts are already counted above.

Total: 14 + 6 + 1 = 21.

## 16. Git commits

Branch `claude/hopeful-franklin-ga706b` (ahead of `origin/main` `b07037f`):

* `3d00b5d` test(visual): physics visual render-audit harness (inventory, Chromium render, rules)
* `8b973eb` fix(visual): physics readability — shared root causes found by the render audit
* `184f939` test(visual): parameter-domain physics sweep; fix dangling focus ids; graph rules for mid-panel axes
* `d343331` Physics visual audit: interactive dimension rolls up non-default states; add audit freshness gate test
* `aecc7d7` fix(visual): label solver finds a clear box for every label …
* `ae33b54` fix(visual): keep the ground plane and axis triad inside the canvas; plate decor letters; make the orbit figure visible
* `c2cba6a` docs(qa): Physics visual quality report, committed render audit (283 concepts, 0 FAIL), per-concept freshness gate — **deployed**
* (this commit) production verification scripts and records


---

## 17. REVIEW_REQUIRED FOLLOW-UP — 2026-10-08

Scope: only the 21 concepts §15 left REVIEW_REQUIRED. For each: resolve the production figure, render it (390 px and the 1280 px column, dark and light, slider states), read the KG entry, the Educational Brain entry and the figure's source, and compare **what the figure claims** with **what it draws**. A concept is PASS only with a cited test or measurement. Nothing else in Physics, no other subject, no threshold, no ADR 12/16 code was touched; no new renderer — existing `SceneSpec` / cards / registry / label solver.

**Result.** 21 reviewed: **7 PASS** (no defect) · **13 FIXED→PASS** (a real defect, fixed, with a deterministic test) · **1 REVIEW_REQUIRED** (`phys.opt.lens-power`, owner decision) · **0 FIX_REQUIRED**. Machine audit after re-rendering the 16 changed concepts and merging: **264 PASS / 19 REVIEW_REQUIRED / 0 FAIL** (was 262 / 21 / 0). Machine verdicts are not edited; the human decision is in `docs/qa/physics-visual-audit/semantic-review.json` and `physicsSemanticReview.test.ts` fails if a machine-REVIEW concept has no entry or an entry cites a test that no longer exists.

| # | Concept | Initial reason | Final | Evidence / fix |
|---|---|---|---|---|
| 1 | `phys.meas.units` | ST-03: text only, no drawn geometry | **PASS** | Seven SI base pairs and 1 N = 1 kg·m/s² checked against an independent table |
| 2 | `phys.meas.dimensions` | ST-03: text only, no drawn geometry | **PASS** | Every bracket parsed, dimension algebra redone; both verdicts follow |
| 3 | `phys.meas.vector-products` | SM-02: no physics assertion | **PASS** | Printed 6 and 10.39 equal the drawn projection and parallelogram; existing right-hand-rule / perpendicular tests |
| 4 | `phys.mech.free-body-diagram` | SM-02: no physics assertion | **FIXED→PASS** | Friction head, balanced pairs, body on ground (force-diagram card) |
| 5 | `phys.mech.friction` | SM-02: no physics assertion | **FIXED→PASS** | Friction opposes the applied force, head away from body |
| 6 | `phys.mech.normal-force` | SM-02: no physics assertion | **FIXED→PASS** | Body rests on the surface; N ⟂ surface, up |
| 7 | `phys.mech.equilibrium` | SM-02: no physics assertion | **FIXED→PASS** | Four forces in two equal opposite pairs; net force and torque zero |
| 8 | `phys.mech.conservation-of-momentum` | SM-02: no physics assertion | **FIXED→PASS** | Rebound to the collision generator; totals re-derived from drawn vectors |
| 9 | `phys.opt.mirrors` | LY-02: P and F labels overlap the axis | **FIXED→PASS** | Signed u, f, v; mirror plane drawn; P/F on the axis kept by design; camera framed |
| 10 | `phys.opt.lenses` | ST-03 text only, LY-02: P / F overlap the axis | **FIXED→PASS** | O (not P) on lenses; signed numbers; lens drawn; camera framed |
| 11 | `phys.opt.lens-power` | ST-03 text only, LY-02: P / F overlap the axis | **REVIEW_REQUIRED** | Correct but does not depict P = 1/f or P₁ + P₂ — owner decision |
| 12 | `phys.mod.wave-particle-duality` | SM-02: no physics assertion | **FIXED→PASS** | Two equal slits; 150 detection dots from the two-slit intensity |
| 13 | `phys.qm.wave-function` | SM-02: no physics assertion | **FIXED→PASS** | |ψ|² = ψ²; y-axis arrow and label fixed |
| 14 | `phys.qm.particle-in-box` | LY-02: caption overlap, SM-02: no physics assertion | **FIXED→PASS** | Levels at n² (were compressed); ψₙ zero at the walls |
| 15 | `phys.qm.hydrogen-atom-qm` | SM-02: no physics assertion | **FIXED→PASS** | Cloud shapes verified; 1s / 2s / 2p now named |
| 16 | `phys.qm.spin` | SM-02: no physics assertion | **PASS** | One beam, two symmetric ±½ outcomes; never "rotation" |
| 17 | `phys.qm.quantum-tunneling` | SM-02: no physics assertion | **FIXED→PASS** | Real exponential decay, joined transmitted wave, same wavelength |
| 18 | `phys.stat.probability-basics` | SM-02: no physics assertion | **PASS** | Frequency histogram; mean line and "symmetric" true of the data |
| 19 | `phys.astro.gravitational-waves` | SM-02: no physics assertion | **PASS** | Stages in physical order; no medium; 1/r not 1/r²; strain h = ΔL/L |
| 20 | `phys.particle.particle-classification` | ST-03: text only | **FIXED→PASS** | Tree stays in place at every width; examples in the narration |
| 21 | `phys.particle.conservation-laws` | ST-03: text only | **PASS** | B/L tallies and ✓/✗ recomputed from an independent particle table |

Full finding, fix, cited tests and remaining uncertainty per concept: `semantic-review.json`.

### Defects the numeric audit could not see (found by reading the geometry against the claim)

* **Force diagram (4 concepts):** the friction arrow-head pointed *at* the body (an SVG `orient="auto"` marker drawn pointing the wrong way — friction looked like it helped the push); applied 45 vs friction 40 (an unbalanced body, the wrong picture for equilibrium); the body floated 20 units above the ground, so the normal force had no contact. Fixed in `ForceDiagram.tsx`; the test parses the rendered markup's lines and marker polygons.
* **Double slit:** slits 6 and 12 units wide, a hand-placed asymmetric band pattern, no particles on a card about particles. Now two equal slits and 150 detection dots drawn from the two-slit intensity (fixed seed). The caption is neutral ("one dot = one detection") because the same card serves Young's experiment — which is why it was re-rendered and why its first caption ("one particle") was changed.
* **Potential well:** levels drawn 1 : 2.75 : 5 against labels E₂ = 4E₁, E₃ = 9E₁. Now n².
* **Quantum tunneling:** the barrier curve was decay × cos (still oscillating) and the transmitted wave did not join it. Now a real exponential, e^(−κ) continuity, same wavelength.
* **Wave function:** y-axis arrow-head pointed left; axis named only ψ although |ψ|² shares it.
* **Particle tree:** scrambled by the label solver at both widths; now data-driven, short names, qualifiers beneath, examples in the narration (stays inside the nine-label budget; the first attempt with inline examples pushed leaves 24-30 px and was rejected by measurement).
* **Ray optics (mirrors, lenses, lens power):** the title printed unsigned u, f beside a signed v (the three numbers did not satisfy the lesson's own formula); a lens's centre was labelled *P* (a mirror's pole; on the lens-power lesson also read as "power"); the lens/mirror was only a dot and the whole figure used ~0.26 % of the canvas. Now signed numbers, *O* on lenses, the element drawn, the camera framed to the drawn extent (applied at render time on narrower canvases).
* **Conservation of momentum:** the 3D card drew unlabeled spheres whose arrows did not conserve momentum for the masses their sizes implied; now served by the `collision` generator (masses and velocities printed, total re-derived from the drawn vectors), recorded as a judged generator-default.
* **Hydrogen orbitals:** the side-by-side clouds were distinguished by colour only; now named 1s / 2s / 2p (shared `SceneLabelLayer`, auto-rotation off like every labelled 3D card).

### Left as machine REVIEW on purpose

* *P*, *F*, *O* labels on the optical axis (LY-02): each names a point that lies on the axis, so its box meets the line by construction — intentional and correct; positions are verified. Not moved to satisfy a validator.
* Text-only figures (units, dimensions, conservation laws; ST-03): genuinely text; contents verified by recomputation.
* `phys.opt.lens-power`: correct figure, but it shows neither P = 1/f nor P₁ + P₂ (recorded in `scope.ts` since before this review). Closing it is new content from the Educational Brain's worked numbers — the owner's call.

### Tests

New: `physicsCardSemantics.test.ts` (72 tests — geometry read from what each figure draws, checked against independent tables; negative controls run on the SI, dimension and force-diagram tests) and `physicsSemanticReview.test.ts` (4). Updated: `visualGeneratorDefaultScope.test.ts` (judged generator-default). `physicsVisualAudit.test.ts` passes against the re-rendered record.

| Check | Result |
|---|---|
| Full vitest | **907 files / 18,173 passed, 9 skipped, 0 failed** (baseline 905 / 18,097 / 9: +2 files, +76 tests, nothing removed) |
| `tsc --noEmit` | 0 errors |
| `next lint` | 0 errors, 12 warnings (identical to baseline; none in touched files) |
| `npm run build` | exit 0 |
| Browser re-audit of the 16 changed concepts (390 + 1280 column, dark + light, 23-27 slider states for the interactive ones) | 0 FAIL |

### Production (2026-10-08 → 10-09)

`main` `01ece10` → `9ffaec0`, deployment `dpl_CXRW4xg7LmvBbvoqRUzWyYsmrivy` **READY** (alias `my-tutor-flame.vercel.app`). Disposable learners only (all deleted).

1. **Served = audited, over the wire** (`production-verification-followup.json`): the 5 scene-served changed concepts — mirrors, lenses, lens-power, conservation-of-momentum, particle-classification — are byte-identical to what `resolveVisual` serves from this commit, 0 blockers. (The older 10 concepts re-checked too: unchanged.)
2. **Rendered in the real `/learn` page** (`production-browser-audit-followup.json`, screenshots viewed): 16 concepts × 390 / 1280 × dark / light.
   * Scenes: particle-classification 4/4 PASS, conservation-of-momentum 4/4 PASS; mirrors, lenses, lens-power REVIEW_REQUIRED only for the on-axis *P/F/O* labels (same as local).
   * Cards (11): **all PASS**, with the finished figure seen for force, free-body-diagram, friction, equilibrium, hydrogen (comparison with 1s/2s/2p labels), double slit ×2 (with dots), wave function, potential well and quantum tunneling (decay, transmitted wave, labels).
3. Two harness bugs found and fixed on the way (not app defects): ThreeDVisual also sets `data-scene-box`, so a 3D card was framed as the whole page (4 false FAILs on hydrogen); and a card measured on arrival is only partly revealed.

**Observation, pre-existing, not changed.** In the lesson a card is driven by the tutor's narration and shows **as many steps as the reply has sentences** (`visualStepForSegment`). A one- or four-sentence reply leaves the last steps unseen — e.g. normal-force never reached its fifth step (the normal arrow) in three production replies, while the tutor's text already described that arrow; tunneling stopped at step 3 in one reply. The identical force-diagram card showed all five steps for four sibling concepts, so the normal-force *figure* is verified, but not in a reply of its own. This is worth an owner look.

### Remaining uncertainty

* Normal-force's fifth step was not seen in a production reply of its own (above).
* Slider / simulation states were verified locally, not in production (production audits default state only).
* The 158 cached generated figures and the other 262 concepts were not re-browsed in production.
* `phys.opt.lens-power` stays REVIEW_REQUIRED.

### Commits

* `6d1b89a` fix(visual): physics cards draw what their concepts say
* `4d14a0b` fix(visual): physics scenes — particle tree, ray-optics figures, conservation of momentum
* `9ffaec0` test(visual): deterministic semantic assertions + review ledger + re-audited records — **deployed**
* (this commit) production verification scripts and records, report

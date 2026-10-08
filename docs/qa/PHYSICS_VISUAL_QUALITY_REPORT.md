# Physics Visual Quality Report — 2026-10-07/08

Consolidated production audit of every learner-facing Physics visual: generation → validation → readability
gate. Every figure was **actually rendered** (headless Chromium + SwiftShader WebGL) at a 390 px phone and a
1280 px desktop column, in dark and light themes, and measured from what the browser painted — DOM boxes,
computed styles, and the pixels behind each glyph. Nothing below is called "validated" unless it was rendered
and measured.

Record: `docs/qa/physics-visual-audit/` · method and fixes: `docs/history/physics-visual-readability-gate.md`.

**Headline.** 283 concepts: baseline **90 PASS / 1 REVIEW / 192 FAIL** → final **262 PASS / 21 REVIEW_REQUIRED / 0 FAIL**,
0 missing renders, no threshold lowered. Newton and Pendulum PASS in every driven state.

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

See the final report for the push and deploy outcome; production on entry was `b07037f` (English fixes), an ancestor of this branch — a fast-forward cannot overwrite it. The dev render page `/dev/physics-audit` is `notFound()` when `NODE_ENV === 'production'`, so production rendering cannot be driven by this harness; production verification needs a real signed-in lesson session (disposable QA account).

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
* (this commit) per-concept audit fingerprints, `merge-audit.ts`, committed audit record, this report

# Physics visual readability gate — consolidated render audit (2026-10-07/08)

Owner request: audit **every** learner-facing Physics visual by actually rendering it (Chromium, 390 px and
1280 px, both themes), validate structure / readability / contrast / layout / graph / physics semantics /
interactive states, repair at the shared root cause, hold generated figures to the same gates as authored
ones, and leave permanent regression tests. Physics only; no second visualization engine; no change to the
Physics KG, Educational Brain, curriculum, Tutor Max policy, GB+, or the Newton / Pendulum learning logic.

Report (16 sections, numbers below): `docs/qa/PHYSICS_VISUAL_QUALITY_REPORT.md`.
Committed audit record: `docs/qa/physics-visual-audit/` (per-concept verdicts + served-payload fingerprint).

## How it works

| Piece | Where |
|---|---|
| Inventory — every KG concept resolved through the production `resolveVisual` path | `scripts/qa/physicsVisual/inventory.ts` |
| Real render + measurement (DOM boxes, computed styles, the pixels behind every glyph) | `render.ts`, `inpage.js` |
| Newton / Pendulum state drive (frame 0 → prediction → run → pause → step → reset → finished → second run → extremes) | `simulation.ts` |
| Parameter-domain sweep of the 11 parametric kinds (every slider min / mid / max, every option, corners) | `kindChecks.ts` |
| Verdict rules (pure, unit-tested) | `src/lib/teaching/visual/figureAudit.ts` |
| Deterministic physics checks (unit/dimension arithmetic chains) | `src/lib/teaching/visual/figureSemantics.ts` |
| Fail-closed gate for **every** tier, authored or generated | `admitVisualAsset` + `payloadBlockers` (`asset.ts`), `checkRendering` (`figureCritic.ts`) |
| Dev-only render page (404 in production) | `src/app/dev/physics-audit/` |
| Roll-up + committed record | `validate.ts` → `docs/qa/physics-visual-audit/audit-summary.json` |

`npx tsx scripts/qa/physicsVisual/render.ts --out <dir> --base http://localhost:3000` (needs `next dev`),
then `validate.ts --in <dir> --out <dir2>`. A full run is 849 renders, about 65-90 minutes on 4 workers.

**Keeping it true.** `src/tests/physicsVisualAudit.test.ts` compares a per-concept fingerprint of what the
resolver serves (payload, provenance, scope) with the committed `audit-summary.json`, and fails — naming the
concepts — if any figure changed, a concept was added, or any concept is FAIL. Re-audit only those concepts:

```
render.ts   --out <dir>  --concepts <ids from the test> --base http://localhost:3000   # needs next dev
validate.ts --in  <dir>  --out <dir2>                                                  # other concepts show as missing; ignored
merge-audit.ts --base docs/qa/physics-visual-audit/audit-summary.json \
               --update <dir2>/audit-summary.json --out docs/qa/physics-visual-audit/audit-summary.json
```

Renderer / solver changes are NOT in the fingerprint (that would force a full re-render for every UI edit):
they are guarded by `physicsVisualReadability.test.ts` (PHYS-VIS-01..09) and by re-running the full audit.

Verdicts: PASS / FAIL / REVIEW_REQUIRED. Physics semantics that no deterministic assertion covers are
REVIEW_REQUIRED, never PASS. No threshold was lowered to reach a number (`AUDIT_THRESHOLDS`).

## Result

| | Baseline (pristine source) | Final |
|---|---|---|
| Concepts | 283 | 283 |
| PASS | 90 | 262 |
| REVIEW_REQUIRED | 1 | 21 |
| FAIL | 192 | **0** |
| Missing renders | 0 | 0 |

849 renders (283 concepts x mobile dark / mobile light / desktop-column dark... plus per-slider states) +
12 simulation runs. Newton and Pendulum PASS in all 67 / 83 rendered states.

## Root causes found (clusters) and where each was fixed

1. **Playback glyph white on chalk-yellow, 1.84:1, on 181 concepts** — `VisualPlaybackControls` uses
   `--on-accent`; speed chips >= 24 px.
2. **SVG card text below 4.5:1** — `useFigureLegibility` rule 3 lifts `<text>` fill to 4.5:1 on its real
   backdrop (`elementsFromPoint`), both themes, cached authored fill.
3. **3D mesh colours below 3:1** — `meshColor()` (`visualDesign.ts`); `themeColor` unchanged (tests pin it).
4. **Axis letters 32-95 % visible / on top of authored labels** — letters are labels in the same solver
   (`stageAxisLabels`, appended last), 2 px edge inset, always backed by the surface colour.
5. **Label-on-label overlaps at 390 px** — solver escalation: 2 px grid over the whole canvas, then the same
   words wrapped narrower, then one typographic tier smaller (never below the 10 px floor); a label left on a
   body gets a surface-colour plate (box-shadow, no layout width). `PlacedLabel` carries `onGeometry`,
   `wrapPx`, `tier`; the renderer draws exactly the box the solver planned.
6. **Kinematics graphs: no axes / curves outside axes** — rewritten as three stacked graphs, each with its
   own axes, units and end-value ticks (curve ids and label texts preserved).
7. **Figures cropped / small in the canvas** — `cameraDistanceToContain` (only ever moves further).
8. **Text anchored inside a body** — `anchorOf` places node/particle text above bodies >= 0.45 radius.
9. **Dangling focus ids** (electric-dipole step 5) — `stageView` drops ids that name nothing drawn.
10. **Ground grid and axis triad cut off by the canvas** (1.3-2.2x past the bottom, 8 figures) —
    `stageDecorLayout(bounds, cameraDistance, aspect)` keeps both in frame; unchanged when they already fit.
11. **Per-figure**: `EnergyLevelDiagram` "spectral line" centred under the detector; orbit ring / bodies
    larger in `gravitationOrbit` (text-only REVIEW -> PASS); damped-oscillation axis arrow.
12. **Harness**: a canvas that has not painted its first frame is retaken (twice) before it can be called
    blank (one transient seen: `phys.meas.units`, re-rendered clean).

## Production (2026-10-08)

`main` `b07037f` -> `c2cba6a`, deployment `dpl_8dhQ4cU4knAoimkytLPTNZevTjo9` READY. Verified over the wire (10 concepts: served scene
identical to the audited one, 0 blockers) and in the real production `/learn` page (9 concepts x 390/1280 x dark/light = 36/36 PASS):
`scripts/qa/physicsProductionVisualVerify.ts`, `scripts/qa/physicsProductionBrowserAudit.ts`; records in `docs/qa/physics-visual-audit/`.
Shared components (label solver, label plate, SVG text lift) also affect other subjects' figures; those were not browser-audited.

## What stays REVIEW_REQUIRED (21) — honest, not hidden

* 13 figures: **no deterministic physics assertion covers them** (SM-02) — cards and a few scenes. A person
  must confirm the physics; the audit refuses to call them PASS.
* 6 text-only layouts (units, dimensions, conservation-laws, particle-classification, ...): readable, no
  geometry to validate (ST-03 REVIEW).
* Optical-axis point labels `P` / `F` and one card caption sit on the axis line by design (LY-02 REVIEW).

## Not covered

* The 158 cached **generated** figures were not individually rendered (no access to the cache from the
  harness). They are covered by the same blockers at admission time (`payloadBlockers`) and by the critic;
  a generated figure that fails is refused, never shown.
* Collision generator refuses 134 of 176 slider combinations at its own validator (pre-existing; the frame
  keeps the last good figure) — counted, not judged.

## Tests added

`figureAudit` (24), `figureSemantics` (23), `physicsVisualReadability` (PHYS-VIS-01..09, 43), `physicsKindSweep`
(14), `physicsVisualAudit` (committed-verdict freshness). Placement contract tests updated for the new
`onGeometry` / `wrapPx` / `tier` fields and the measured rarity of far-moved labels.

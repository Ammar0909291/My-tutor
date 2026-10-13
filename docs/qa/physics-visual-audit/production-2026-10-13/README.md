# Production evidence — zero-open-item visual closure (2026-10-12/13)

Everything here was measured on the deployed `/learn` page (`https://my-tutor-flame.vercel.app`) in real Chromium with disposable QA accounts
(each deleted at the end; the report records `deleted: true, reloginBlocked: true`). Every JSON row carries the deployment id, commit, viewport, theme,
concept and (for figures) the id of the message whose card was measured.

| file | what | deployment / commit | result |
|---|---|---|---|
| `legibility-before-485f75d.json` | 4 force-diagram cards on one page, older cards above the fold, each scrolled into view — BEFORE the shared-hook fix | pre-fix main `485f75d` | 8 PASS / **8 FAIL** (CT-01 3.11–3.99:1) |
| `legibility-after-74f4207.json`, `FINAL-9b26c89-legibility.json` | same, AFTER the fix | `dpl_DfiW33EV…`/`74f4207`; `dpl_CY88qN1U…`/`9b26c89` | **16/16 PASS** (both) |
| `interact-after-74f4207.json`, `FINAL-9b26c89-interact*.json` | lens-power (P, P₁, P₂, gap) and normal-force (θ, F) sliders: printed labels follow the controls; no overlap/blank | `74f4207`; `9b26c89` | 44/44 PASS on `74f4207`; on `9b26c89` 39 PASS + 1 NOT_RUN (network timeout on `page.goto`), the whole normal-force set re-run: 20/20 PASS |
| `force-family-after-74f4207.json` | weight/normal label clearance for the force-diagram family (free-body-diagram, equilibrium reach step 5: 6.8 px at 390, 10.7 px at 1280; force/friction replies too short to draw those steps — harness limit) | `74f4207` | 16/16 PASS |
| `74f4207-biology.json`, `FINAL-9b26c89-biology.json` | the six Biology figures resolved by the Biology workstream, 4 views each | `74f4207`; `9b26c89` | 22 PASS + 2 FAIL (both `bio.plant.mycorrhizae-plant-symbioses` @1280, RD-02 "More insights" clipped) — classified below |
| `74f4207-chemistry.json`, `FINAL-9b26c89-chemistry*.json` | five Chemistry figures incl. Born–Haber (`chem.thermo.bond-enthalpy`), Hess, galvanic cell, real gases, crystal field, 4 views each | `74f4207`; `9b26c89` | 20/20 PASS on `74f4207`; on `9b26c89` 19 PASS + 1 NOT_RUN (network timeout), that cell re-run: PASS |
| `regression-2026-10-13.json` | local real-Chromium regression of the shared-component changes (hook, GraphRenderer) | merged tree | see file: 40 Physics graph concepts 40/40 unchanged; 180 Chemistry Tier-2/3 states identical to the committed record |

## The two Biology FAIL rows are a harness position artifact, not an app defect (checked, not assumed)
The figure for `bio.plant.mycorrhizae-plant-symbioses` is ~1,440 px tall on the 1280 layout (a long "What's happening?" panel in a narrow column). The audit aligns the figure's top with the
window top; its last control ("More insights") then sits under the lesson page's fixed Previous/Next footer. A learner scrolls: a direct check on production (`mycorrhizae` desktop, light) at
**1280×1700, 1280×900 and 1366×768** found the control reachable and not covered after `scrollIntoView` (`elementFromPoint` inside the figure) in all three. The Biology workstream's own production audit
measured the same concept MEASURED_CLEAN (its harness scrolls). Observation for the Biology owner (not changed here): the all-stages panel for this concept is long enough to make the card taller than a laptop window.

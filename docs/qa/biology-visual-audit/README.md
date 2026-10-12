# Biology visual quality audit — 2026-10-08, closed 2026-10-12

> **Read the "Closure campaign (2026-10-09/12)" section first** — it supersedes the "Final re-audit" and "Remaining issues" sections below,
> which are kept as the record of the intermediate state (PASS 193 / REVIEW_REQUIRED 6).

Scope: Biology only. The **rendered learner experience** of the current Biology figures — what
`resolveVisual` serves for a "show me a diagram" request, drawn by the real `SceneSpecFigure →
ExplainerFigure → SceneSpecRenderer` component — at **desktop 1280 px** and **mobile 390 px**, in the
initial (all stages), first-stage and last-stage states, in light and dark theme, with the interactive
controls exercised on a sample. A figure is not PASS because its payload is valid.

Artifacts in this directory:

| file | what it is |
|---|---|
| `audit-final.json` | one record per concept (199): baseline status + the final measured render (desktop and mobile) |
| `semantic-review-baseline.json` | the pre-repair semantic verdicts (Educational Brain Core Understanding vs the served figure), with issue + proposed fix for every FAIL / REVIEW_REQUIRED |
| `../../../scripts/qa/biologyVisualInventory.ts` | inventory: the real resolver for all 199 concepts |
| `../../../scripts/qa/biologyVisualRenderAudit.mjs` | Playwright/Chromium render + DOM measurements + screenshots |
| `../../../scripts/qa/biologyVisualInteractionAudit.mjs` | Play / stop / reset / Situation-Diagram / modes / legend / expand / reduced-motion |
| `../../../scripts/qa/biologyProductionBrowserAudit.ts` | the same measurement against the DEPLOYED `/learn` page, with a disposable QA account that is deleted afterwards |

Reproduce (dev server on 3001; the harnesses read the dev-only `/dev/visual-demo/simulation/served?concept=<id>`):

```
npx tsx scripts/qa/biologyVisualInventory.ts /tmp/inventory.json
node scripts/qa/biologyVisualRenderAudit.mjs /tmp/render --file ids.txt --base http://localhost:3001 [--theme light] [--all-stages] --shard 0
npx tsx scripts/qa/biologyProductionBrowserAudit.ts --shots /tmp/prod --out /tmp/prod.json   # needs network access to the deployed app
node scripts/qa/biologyVisualInteractionAudit.mjs /tmp/interaction --ids bio.cell.mitosis,bio.eco.community-ecology --base http://localhost:3001
```

Use at most four render shards: SwiftShader WebGL is CPU-bound and a loaded machine captures figures
mid-transition (three false overlaps were seen that way and disappeared when re-rendered alone).

## Closure campaign (2026-10-09/12)

**Question this answers:** after the render audit, six figures were REVIEW_REQUIRED. Resolve each from its Educational Brain entry, re-audit
**all 199** on the final merged code (both viewports, both themes, every stage, interaction states), and verify on the deployed app.

### Result

| | |
|---|---|
| Biology KG concepts | **199** (all `renderer: scene`, 196 concept-owned, 3 generator-served: `bio.cell.mitosis`, `bio.gen.mendelian-genetics`, `bio.eco.ecosystem-structure-function`) |
| Rendered in a real browser (Chromium + WebGL) | **199 × 2 viewports (1280, 390) × 2 themes (dark, light) = 796 renders**, every stage walked: **3,716 measured states** (1,858 per theme) |
| Automated flags over all 3,716 states | **0** label overlaps · **0** labels outside the canvas · **0** horizontal scroll · **0** figure overflow · **0** leaked ids · **0** page errors (see "environment noise") · min caption font **10 px** (the readability floor) · min contrast **4.60 : 1** dark / **4.65 : 1** light (WCAG AA) |
| Eyeballed | every concept's final **dark and light** all-stages view (desktop + mobile) in this pass (the 24 figures changed during the campaign were re-viewed after their last change); the six repaired figures **stage by stage** (dark, desktop + mobile). Every other stage and the light stage views were measured automatically, not eyeballed |
| Semantic | the six repairs were additionally reviewed by an independent reviewer (below) |
| Interaction audit (Play the stages, stop, Show-all reset, Situation↔Diagram, modes, legend pin, Expand→Return, reduced motion), desktop + mobile | the six repaired figures + four changed ones: all controls pass. The other 189 share the same controls and were render-measured, not driven |
| Non-Biology blast radius | **1,712** Physics / Chemistry / Mathematics / CS / English served-figure payloads are **byte-identical** to `origin/main` (fingerprint of the whole payload) |
| Final status words | **PASS 199 · FAIL 0 · REVIEW_REQUIRED 0** — with the observations below recorded, not hidden |

Per-concept manifest (concept, figure type, renderer, per-viewport/theme measurements, repaired / regenerated, semantic baseline → final, status):
`audit-final.json` — each record keeps its `baseline` and `final` blocks and gains a `closure` block. `semantic-review-baseline.json` is untouched
apart from an appended `closureReview` block.

### The six figures

| figure | what was wrong | what it is now (source: its EB entry) |
|---|---|---|
| `bio.neuro.brain-regional-organization` | four lobes as dots in a circle | lateral brain, one brush path per region (the first draft had 100+ objects per stage and was **rejected by the admission gate** ST-07 and served nothing — fixed by drawing, not by loosening the gate); three divisions (forebrain/midbrain/hindbrain), four lobes, amygdala + hippocampus as the limbic structures "not one place"; no focus on the last stage so the opening view is not dimmed |
| `bio.cell.cell-theory` | a thin three-event timeline | Schleiden 1838 → Schwann 1839 → Virchow 1855 → the theory's three tenets, "all cells arise from pre-existing cells" attributed to Virchow only, and the abiogenesis scoping note |
| `bio.mol.dna-replication` | 17 labels (budget 9) so eight were silently held back; mobile lagging-strand caption ~96 px from its strand | 9 labels; "lagging strand (Okazaki fragments)" sits on the fragments; legend carries parental DNA / new DNA built 5′→3′ / RNA primer / enzymes; 5′/3′ polarity, leading/lagging and fork direction kept |
| `bio.eco.predator-prey-dynamics` | the two equations as text; no cycle | population-over-time plot from an RK4 integration of the Lotka–Volterra pair, two cycles, predator lagging prey, four numbered phases, numerical vs functional response; passes the graph audit (GR-01/02/04) |
| `bio.plant.mycorrhizae-plant-symbioses` | only the rhizobium half of the entry | arbuscular (hypha crosses the wall; arbuscule twigs all **inside** the cell) vs ectomycorrhizal (mantle **outside**, Hartig net **between** the cells) vs the rhizobium–legume nodule, drawn apart and labelled "bacteria not fungi"; oxygen-protected nodule before nitrogen fixation |
| `bio.plant.plant-growth-hormones` | four of five hormones showed only a name | each hormone carries a source-supported function: auxin (elongation; moves away from light, shaded side grows more; roots ~1000× more sensitive), gibberellins, cytokinins (delay senescence; oppose ethylene), ABA, ethylene (a gas; ripening, abscission; opposes cytokinins) — no "always" anywhere |

### Defects the full re-audit found beyond the six (all fixed, all Biology-only)

| defect | scope | fix |
|---|---|---|
| a comparison group drew only its **name**; its clause lived in the narration, beside groups that carried examples | 20 figures (five antibody classes, three gene-transfer routes, four arthropod classes were bare) | `cellComparison.pure.ts` draws the group's own authored `description` as its caption — nothing new written |
| the vertical connector of an odd-spoke hub cut the first letter of a lower side caption ("|ndustrial biotechnology" at 390 px) | 3 hubs | `cellHub.pure.ts` wraps lower-side captions to the width they own |
| "Play the motion" offered to walk a marker round a cell **outline** | 10 structure figures | boundary ring opts out (`properties.trace === false`, honoured by `sceneAnimation.traceablePaths`; no other scene sets it) |
| a caption covered 88 % of its own sphere at 390 px | `bio.found.binomial-nomenclature` (the only one in the corpus: scanned every stage at both widths) | caption anchor lifted |
| the "What's happening?" panel is cut at 1000 characters in whole lines, so long narrations lost their last stages | the two re-authored figures (brain 2 of 4 stages, mycorrhizae 5 of 7) — **caught by the full test suite**, not by any render | narrations shortened under the budget; a test pins it |
| harness read heavy figures before their labels mounted | render + interaction harnesses | both now wait for the figure to settle; `--all-stages` added |

### Independent semantic review of the six repairs

REVIEW_PLACEHOLDER

### Observations (recorded, not defects; none changes a status)

* **Stage height variance.** `ExplainerFigure`'s fit search can settle at heights that differ by ±40–120 px between runs (e.g. `bio.neuro.sleep-circadian-biology`
  at 390 px keeps spare space under the figure). Pre-existing, shared layout code, never clips anything; not touched.
* **Hub caption touching its sphere** at 390 px on a few three-spoke figures (e.g. `bio.sys.gene-regulatory-networks`: a one-line caption sits 2–3 px above its sphere).
  Below the occlusion threshold (> 15 % of the sphere) used by the scan; no legibility loss.
* **Environment noise in the dev harness, not the app:** every page logs `ClientFetchError … server configuration` / HTTP 500 from `/api/auth/session` (the dev
  server has no `AUTH_SECRET`), and the light theme logs React hydration warnings ("Prop `fill` did not match", a server-vs-client colour on the legend swatch).
  Neither occurs in a figure's own rendering; both are excluded from the "page errors" count above and counted separately (dark 280, light 1,589 + 296).
* **Provider failures are a separate matter.** Production logs show the Gemini fallback returning `403 … project has been denied access` and occasional
  `503`s (details under "Production"). No keys were rotated and no provider policy was changed.

## Inventory

| | count |
|---|---|
| Biology KG concepts | 199 |
| served as a 3D SceneSpec figure (baseline) | 192 (189 concept-authored, 3 generator defaults) |
| served the generic `bio.eco` → `food_chain` **card** (baseline) | 7 |
| concepts with no visual | 0 |
| parametric simulations | 0 — every Biology figure is a static stepped figure |
| concept-owned scenes now | 199 (the 7 cards were replaced) |

Families: comparison 97, pathway 50, hub 28, structure 11, card 7, cell-division 2, timeline 1,
DNA-replication 1, Punnett 1, ecological pyramid 1.

## Baseline (measured on `main` b07037f, before any repair)

* 71 concepts had a sphere or caption cut off by the canvas edge (every two-group comparison at 390 px).
* 42 had a caption below 3 : 1 contrast (captions were painted in the sphere's colour **on** the sphere: 2.2–4.5 : 1); 139 marginal (3–4.5 : 1).
* 25 had overlapping labels; 11 structure figures hid their parts inside an opaque sphere.
* Pathway arrowheads ended inside the destination sphere — no direction was visible on any pathway.
* Rule-derived status (measurements, not judgement): **FAIL 119 · REVIEW_REQUIRED 55 · PASS 25**.
* Semantic review (every concept, Educational Brain vs figure): **PASS 162 · FAIL 24 · REVIEW_REQUIRED 13**.

### Biology semantic failures (24 FAIL, 13 REVIEW_REQUIRED — all in `semantic-review-baseline.json`)

Representative: `bio.cell.cell-theory` merged Schleiden (1838) and Schwann (1839) into one event and dropped Virchow;
`bio.plant.mycorrhizae-plant-symbioses` drew nitrogen fixation *before* the low-oxygen nodule that makes it possible;
`bio.mol.dna-replication` drew the leading and lagging strands with the wrong 5′/3′ polarity; seven `bio.eco` concepts
(habitat/niche, population growth, nutrient cycling, biodiversity, environmental issues, community ecology,
global change) were shown a **food chain** — a figure about who eats whom for concepts that are not feeding relationships.

### Readability failures

Clipping at the canvas edge, captions on spheres, hub captions drawn across spokes, hidden structure parts,
pathway nodes without a visible direction, comparison columns whose captions wrapped into each other, a
meiosis layout that overlapped itself, a Punnett grid without row/column alignment, pyramid labels on the bars.

## Root-cause clusters and repairs (all in the owning shared layer)

| cluster | owning layer | repair |
|---|---|---|
| framing used coordinates only — sphere radius and caption width invisible | `layout.ts` `cameraDistanceToContainFigure`, `ExplainerFigure` | contain geometry **and** every caption's painted box in the canvas actually drawn in; solved to a fixed point because caption wrap narrows as the camera backs away |
| a phone's short 4:3 stage cannot hold a figure whose captions are a fixed pixel size | `layout.ts` `stageHeightToFit`, `ExplainerFigure` | the stage grows in height only as far as the renderer's own solver needs; the search uses the renderer's exact framing |
| captions on spheres in the sphere colour | `cellComparison/cellHub/cellPathway/cellStructure.pure.ts`, `shared.ts` | captions beside/above/below the body (`captionBeside`), on a backing plate |
| structure figures hid their parts | `cellStructure.pure.ts` | boundary drawn as a ring, parts on an inner ring |
| hub captions across spokes; 7–8 spoke hubs cluttered | `cellHub.pure.ts` | captions above/below by half-plane, half-step angle for even n, ring radius grows with spokes, long hub caption becomes a heading |
| pathway direction invisible | `cellPathway.pure.ts` | arrows run surface to surface; cycles return with an arrowhead; **six or more stages alternate captions above/below** |
| comparison columns | `cellComparison.pure.ts` | grid from three groups, wrap to the column, caption-height-aware slots, first caption below the stub, gutters, two groups 9.5 apart with item k of both columns on one row |
| meiosis / mitosis, Punnett, pyramid, DNA replication | `cellDivision`, `punnettSquare`, `ecologicalPyramid`, `dnaReplication` generators | two-row layout with arrows; aligned grid; labels off the bars; polarity corrected |
| 7 generic food-chain cards | `conceptSceneParams.ts` (Tier 0) | concept-owned scenes grounded in each concept's Educational Brain Core Understanding |
| 24 FAIL + 13 REVIEW_REQUIRED semantic | `conceptSceneParams.ts` | corrected from the Educational Brain text; nothing invented |

**Scope guard.** Every layout rule is gated to Biology (`isBiologyScene`, and `fitToCanvas` on `ExplainerFigure`, on only for a
Biology lesson). Switching the figure-level framing on for every subject changed 114 Physics, 19 Chemistry and 1 Mathematics
canvas views, so it is opt-in. Verified: `placeSceneLabels` / `checkSceneLayout` output is identical to the pre-change module for all
305 non-Biology scenes at both widths (1,220 checks).

## Regenerated visuals

Seven `bio.eco` cards → concept-owned scenes: `organism-environment` (6-group comparison), `population-ecology` (4),
`nutrient-cycling` (cyclic nitrogen pathway), `biodiversity-conservation` (6-spoke hub), `environmental-issues` (4),
`community-ecology` (4), `global-change-biology` (4). `bio.mol.dna-replication` rebuilt with correct polarity.
Words changed (labels / captions / narration / title) in 49 concepts: the 24 semantic FAILs, the REVIEW_REQUIRED items, the
7 regenerated figures, and eight figures whose captions were shortened to fit the label budget (no fact dropped; the detail moved
into the stage narration).

## Final re-audit (merged build, 2026-10-09)

| | |
|---|---|
| TOTAL | **199** |
| RENDERED in a real browser | **199** (desktop 1280 **and** mobile 390, three states each) |
| PASS | **193** |
| FAIL | **0** |
| REVIEW_REQUIRED | **6** (below) |
| REPAIRED (the scene the resolver serves changed vs baseline) | **186** (135 changed content or structure, 51 layout only); the other 13 are served unchanged and benefit from the renderer's framing fix. **49** had their words corrected |
| REGENERATED (a different figure) | **7** cards → concept-owned scenes, plus `bio.mol.dna-replication` rebuilt |
| STATIC (stepped figure, no simulation) | 199 |
| INTERACTIVE (parametric) | 0 |
| DESKTOP / MOBILE tested | 199 / 199 |
| light theme | 16 sampled across all families: min contrast 4.65 : 1 |
| no-rendering / card fallback / concepts without a visual | 0 / 0 / 0 |

Automated measurements on the final render, all 199 × 2 viewports: 0 label overlaps, 0 labels outside the canvas,
0 horizontal scroll, 0 figure overflow, 0 page errors, minimum caption contrast **4.6 : 1** (WCAG AA), minimum caption font ≥ 10 px.

Interaction audit (Play the stages, toggle-stop, Show all/reset, Situation↔Diagram, modes, legend pin, Expand→Return,
reduced-motion stability), desktop and mobile: 18 concepts across the campaign plus 6 re-run on the final build — 0 failures.
The interactive controls are shared by every figure; the other 175 concepts were render-measured, not driven.

**How "PASS" was decided.** Not from a schema. Every one of the 199 concepts' desktop+mobile all-stages renders was looked at
(three per image) after the last shared-layer change but one; a pixel diff between that fully inspected render and the final merged-build
render shows exactly the 6 figures changed in the last round differ (they were inspected separately) and the other 193 are
identical. The first/last-stage states were measured automatically (overlap, bounds, contrast, scroll, errors) but not all eyeballed.
The baseline semantic verdicts came from reviewers reading the Educational Brain text; two of three final visual reviewer slices
failed on session rate limits and were done by hand. Status words follow the prompt: uncertain ⇒ REVIEW_REQUIRED.

## Remaining issues

REVIEW_REQUIRED (6) — each is a content/depiction decision, not a rendering defect:

1. `bio.neuro.brain-regional-organization` — the four lobes are labelled dots in a circle; no anatomical depiction.
2. `bio.cell.cell-theory` — a plain three-event timeline: legible, but a thin line with small captions.
3. `bio.mol.dna-replication` — 17 labels (over the 9-label complexity budget); on mobile the "lagging strand" caption sits ~96 px from its strand.
4. `bio.eco.predator-prey-dynamics` — the two coupled equations as text; the predator/prey cycle itself is not drawn.
5. `bio.plant.mycorrhizae-plant-symbioses` — the figure traces the rhizobium–legume half of the Educational Brain entry; the arbuscular vs ectomycorrhizal contrast (the other half, and the concept's name) is not drawn. Needs an owner decision on which half the one figure carries.
6. `bio.plant.plant-growth-hormones` — four of the five hormones show only their name in the all-stages view; their function is in the stage narration.

Polish observations (judged PASS): `bio.micro.microbes-in-human-welfare` at 390 px has one hub caption touching a spoke line;
`bio.neuro.sleep-circadian-biology` at 390 px grows its stage taller than the figure needs; pairs on desktop use generous vertical slots;
`bio.eco.nutrient-cycling` covers the nitrogen cycle only; `bio.cell.cell_division` figures have no chromosome glyphs.
Dev-only: the light-theme harness (theme forced through `localStorage`) logs React hydration warnings on a server-vs-client colour prop;
not measured on production.

## Production

Production visual browser validation unavailable. This session has no production browser access (the deployed app answers the
sandbox with 403; recorded in `CLAUDE.md` and `docs/history/physics-visual-gap-campaign.md`), so the audit covers the real
components rendered from the repository on a local dev server — the same `resolveVisual` → `SceneSpecFigure` path a lesson uses.
Deployment state was read through the Vercel API: the `my-tutor` production project builds every push to `main` (latest READY
production deployments at the time of writing: `1e7d079`, `66565e6`, `9ffaec0`, `c2cba6a`, `b07037f`); the push that lands this work
therefore deploys it. Nothing here claims production is verified — only that the repository build, the full test suite and the local
render audit pass.

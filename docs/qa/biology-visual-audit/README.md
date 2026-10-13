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
| Rendered in a real browser (Chromium + WebGL) | **199 × 2 viewports (1280, 390) × 2 themes (dark, light) = 796 renders**, every stage walked: **3,716 measured states** (1,858 per theme); the six repaired figures were re-measured on the final code after the review wording fixes |
| Automated flags over all 3,716 states | **0** label overlaps · **0** labels outside the canvas · **0** horizontal scroll · **0** figure overflow · **0** leaked ids · **0** page errors (see "environment noise") · min caption font **10 px** (the readability floor) · min contrast **4.60 : 1** dark / **4.65 : 1** light (WCAG AA) |
| Eyeballed | every concept's final **dark and light** all-stages view (desktop + mobile) in this pass (the 39 figures whose served scene the closure changed — the six repaired + 33 touched by the shared Biology-only fixes — were re-viewed after their last change); the six repaired figures **stage by stage** (dark, desktop + mobile). Every other stage and the light stage views were measured automatically, not eyeballed |
| Semantic | the six repairs were additionally reviewed by an independent reviewer (below) |
| Interaction audit (Play the stages, stop, Show-all reset, Situation↔Diagram, modes, legend pin, Expand→Return, reduced motion), desktop + mobile | the six repaired figures + four changed ones: all controls pass. The other 189 share the same controls and were render-measured, not driven |
| Non-Biology blast radius | **1,712** Physics / Chemistry / Mathematics / CS / English served-figure payloads were **byte-identical** to `origin/main` when the campaign merged (fingerprint of the whole payload; Physics/Mathematics work has landed on `main` since — see "Final verification") |
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

An independent reviewer (a separate agent with read-only access, given only each concept's Educational Brain entry and the full text of the figure it
is drawn for — title, legend, insight, every stage's narration, every drawn caption, and the ids of the unlabelled geometry) judged each repair against
the entry. **Verdict: all six PASS, no BLOCKING finding, no contradiction of an Educational Brain entry.** It flagged six ADVISORY items; the five that are
plainly supported by the entry were fixed (commit `d19b00f`), re-rendered in both themes and re-tested:

| concept | advisory | action |
|---|---|---|
| `bio.mol.dna-replication` | never says the RNA primers are removed and replaced with DNA (EB: "DNA polymerase I then removes the RNA primers and fills the gaps") — the objective asks the learner to predict what each daughter molecule contains | stage 5 now says ligase joins the pieces once DNA polymerase I has replaced the RNA primers with DNA |
| `bio.cell.cell-theory` | Schwann's stage carried the universal first-tenet wording | now "extended it to animals: animals, too, are built from cells" |
| `bio.eco.predator-prey-dynamics` | functional response defined without "per unit time" | added (a rate, as the objective defines it) |
| `bio.plant.plant-growth-hormones` | title implied exactly five hormones; the auxin caption had no subject and half the direction | "Five Major Plant Hormone Groups"; "Auxin leaves lit side: shaded side grows more" |
| `bio.neuro.brain-regional-organization` | "joined" could read as one contiguous limbic unit; forebrain called "the large cerebrum" | "functionally linked"; "the cerebrum and the structures beneath it" |
| `bio.plant.mycorrhizae-plant-symbioses` | only the ectomycorrhizal panel had soil hyphae ids | checked, no change: `am-hypha` starts above the root (outside) and crosses the wall |

Not acted on, recorded: the reviewer could not see the plot or the limbic layout. The predator-prey "Functional response" callout is anchored on the **prey**
curve (kills per predator act on the prey), not the predator curve, so it does not conflate the two levels; the amygdala and hippocampus are drawn apart
(left and right of the temporal lobe) with the link drawn between them. Caveat on independence: the reviewer is a model reading the same Educational
Brain text; it removes my own anchoring, it is not a human domain review.

### Observations (recorded, not defects; none changes a status)

* **Stage height variance.** `ExplainerFigure`'s fit search can settle at heights that differ by ±40–120 px between runs (e.g. `bio.neuro.sleep-circadian-biology`
  at 390 px keeps spare space under the figure). Pre-existing, shared layout code, never clips anything; not touched.
* **Hub caption touching its sphere** at 390 px on a few three-spoke figures (e.g. `bio.sys.gene-regulatory-networks`: a one-line caption sits 2–3 px above its sphere).
  Below the occlusion threshold (> 15 % of the sphere) used by the scan; no legibility loss.
* **Environment noise in the dev harness, not the app:** every page logs `ClientFetchError … server configuration` / HTTP 500 from `/api/auth/session` (the dev
  server has no `AUTH_SECRET`), and the light theme logs React hydration warnings ("Prop `fill` did not match", a server-vs-client colour on the legend swatch).
  Neither occurs in a figure's own rendering; both are excluded from the "page errors" count above and counted separately. The counts vary run to run with the dev server's state (the 2026-10-13 re-audit on `1fb5e21` logged 1,592 `ClientFetchError` per theme and 296 hydration warnings in light).
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

## Final verification (2026-10-13, last verified tree `6e69667`)

**Question this answers:** is the closure above still true on the code that is on `main` and deployed now? Between the closure report and this pass,
`main` gained Mathematics batches 40-41, Physics visual work and a Chemistry visual closure (`b35bb4c..23c52bf`, 40 commits) — including edits to
shared render files (`ExplainerFigure.tsx`, `SceneSpecRenderer.tsx`, `cellComparison.pure.ts`, `useFigureLegibility.ts`, `conceptSceneParams.ts`). The earlier
claims were therefore re-checked, twice (on `1fb5e21`, then on the merge with the Chemistry work, `6e69667`), rather than assumed. No Biology source was
changed; one test block was added (below). Later upstream commits (to `908e019`) changed `CLAUDE.md` and `docs/` only.

| Check | Result |
|---|---|
| Branch / tree | `main`; clean before this pass's changes; two upstream merges done with `git merge` (no rebase, no force) |
| Production alias now | `my-tutor-flame.vercel.app` → `dpl_2qXa8KT6TL49AFbwnqicesn57jWa`, READY, built from `23c52bf`. The deployments named in the first closure report (`dpl_2oRc…`, `dpl_C8yy…`) are no longer the alias target; the alias moves with every push to `main` |
| CI (`validate`: type ratchet, full vitest, KG validator, package determinism, visualization coverage) | success on `478adb0` (the final Biology code tree, includes `d19b00f`), `b35bb4c`, `74f4207`, `1fb5e21`, `f862172` and `23c52bf`. This closes the "full suite not rerun after `d19b00f`" gap |
| Local gates | on `1fb5e21`: `tsc --noEmit` exit 0 · eslint 0 errors (6 pre-existing `exhaustive-deps` warnings) · full vitest **968 files, 24,779 passed, 9 skipped, 0 failed**. On the merged tree `6e69667` (includes the new tests): `tsc` exit 0 · full vitest **974 files, 25,032 passed, 9 skipped, 0 failed** |
| Biology figure payloads | **199 / 199 identical** (`figureFingerprint` of every resolved payload) across `b35bb4c` → `1fb5e21` → `6e69667`; `evidence/figure-fingerprints-1fb5e21.json` |
| Do the shared edits change a Biology render? | Empirically no (below). By reading: `cellComparison` gained an **opt-in** `captioned` flag (default off; Biology already took the captioned layout through `isBiologyScene`), `SceneSpecRenderer` draws a `bond` as parallel sticks only when `properties.order > 1`, `ExplainerFigure` changes concern parametric choice controls, `useFigureLegibility` serves the 2D SVG renderers (not the 3D scene path), `labelSpots` is imported by two Physics generators only |
| Inventory (`biologyVisualInventory.ts`) | 199 / 199 `renderer: scene`, 196 concept-owned + 3 kind-default generators (`bio.cell.mitosis`, `bio.gen.mendelian-genetics`, `bio.eco.ecosystem-structure-function`); identical to the campaign-final inventory |
| Render re-audit (Chromium + WebGL, 1280 / 390, dark + light, every stage) | run on `1fb5e21` **and** on `6e69667`: each **199 concepts × 4 views, 3,716 states, 0 flags** — 0 overlaps · 0 outside the canvas · 0 horizontal scroll · 0 figure overflow · 0 leaked ids · 0 page errors · min caption 10 px · min contrast 4.60 dark / 4.65 light. Label count, state count, canvas size and contrast of every concept × view equal the campaign manifest and each other (0 drift). Per-concept numbers: `evidence/reaudit-1fb5e21.json`. Looked at by eye on the re-render: mycorrhizae, predator-prey, dna-replication |
| Production browser, six repaired figures on the code deployed now (`23c52bf`) | **24 / 24 views `MEASURED_CLEAN`** (390 / 1280 × dark / light), `sameAsAudited: true` for all six, provider `groq`. Three views first timed out on the network (`ERR_TIMED_OUT` / selector timeout, recorded as `NOT_RUN`, not as passes) and were re-run clean. `evidence/production-audit-run3*.json`, `production-audit-run3.log` |
| Another session's independent production audit | `docs/qa/physics-visual-audit/production-2026-10-13/` measured the same six figures × 4 views at `74f4207` and `9b26c89`: 22 / 24 PASS. The two FAIL rows are `bio.plant.mycorrhizae-plant-symbioses` at 1280 px, "`More insights` is clipped" (RD-02), which that session classified as a harness position artifact. Checked independently here: on `23c52bf`, at 1280×800, 1280×900, 1366×768 and 390×844 in both themes, the control is reachable after scrolling, inside the viewport and **not covered** (`elementFromPoint` is the control; no fixed bar over it). `evidence/production-reach-mycorrhizae.json`. Why the two harnesses disagreed: this audit's windows are 1700 / 2200 px tall, theirs short |
| Regression pins | every closure fix is pinned in `bioClosureFigures.test.ts` / `dnaReplicationVisual.test.ts`. One gap was found: the wording fixes from the independent review (`d19b00f`) were pinned only for the auxin caption. A block of five tests was added, each tied to the Educational Brain sentence it follows; with each wording reverted its test fails and the other 55 pass (mutation-checked, mutations reverted). 105 Biology/visual test files (3,937 tests) pass |
| Disposable QA accounts | none left from the Biology work: this pass's own accounts (production audit runs 3 / 3b / 3c and the reachability check) were each deleted, re-login blocked. A read-only count found 28 `qa-*@mytutor-qa.invalid` accounts at the start of this pass — 26 created 2026-09-01…10-02 by earlier campaigns, 2 created 2026-10-13 08:15 by a concurrent Physics harness; none created by this Biology work, none touched here |

### What each kind of evidence covers (do not conflate)

| Kind | Scope | Source |
|---|---|---|
| Locally rendered and measured | all 199 concepts, both viewports, both themes, every stage — on the campaign build, `1fb5e21` and `6e69667` | `evidence/reaudit-1fb5e21.json`, `audit-final.json` |
| Production-browser verified | **14 of 199** concepts × 4 views at the audited build `478adb0` (the six repaired + 8 unchanged controls), then **the six repaired × 4 views again on the code deployed now (`23c52bf`)**. The 8 controls were not re-run on `23c52bf`; their payloads are unchanged and the local render audit of the current tree is clean | `evidence/production-audit-run2.json`, `…run1.log`, `…run3*.json`, `evidence/production-screenshots/` (the six repaired figures, 4 views each, from the `478adb0` runs) |
| Automated semantic review | the six repaired figures, by an independent read-only **model** reviewer reading the Educational Brain text; a mechanical check that the pinned wording follows the entry | `semantic-review-baseline.json` → `closureReview`, the new tests |
| Human review | **none** — no educator or domain expert has signed off any Biology figure | — |

Persisted evidence: until this pass the production audit records and screenshots lived only in a session scratchpad. Under `evidence/` now: the
production audit JSON of every run and the run 1 / 3 logs, the reachability check, the 24 default-view production screenshots of the six repaired figures
(`478adb0` runs; the stage-by-stage walk screenshots, 6.8 MB, and the `23c52bf` screenshots were not kept — the `23c52bf` measurements are in the JSON),
the 199 figure fingerprints and the re-audit summary. Run 1's JSON was lost to a worker restart; its log is kept.

Confirmed defects: none new. Observations: stage-height variance; a 2–3 px hub caption touch; dev-harness noise; and **`bio.plant.mycorrhizae-plant-symbioses`
is a tall card** (1,355–1,848 px at 1280 / 390 px windows: a three-part figure whose stage grows to fit, plus a ~920-character all-stages panel). Nothing
is clipped or covered — a learner scrolls — and it was not changed here; shortening the panel or giving the figure `explainer.panels` would be a content
decision. Provider failures (Gemini 403/503, Resend, `CredentialsSignin`) are separate and untouched.

## Production

**Deployment verified and browser-audited on the real learner page.** The campaign's final figure code is deployed:

| | |
| --- | --- |
| Pushed commit | `478adb0f983f3cc25085a19f6547c3b3880bb137` (origin/main) |
| Vercel deployment | `dpl_2oRcCMGxnxAJ7GCL5D8bMD3pPw5g` — state READY, project `prj_FwjmRdthApGhwdQY7FyDYThD7WJD` |
| Production alias at the time of the audit | `my-tutor-flame.vercel.app` → the deployment above (the alias has moved on since, with every later push to `main`; see "Final verification" for what it serves now) |
| Curriculum read | `/api/curriculum?subject=biology` → 199 Biology lessons |
| AI provider during the runs | `groq` (the Gemini fallback was not reached) |

How it was measured (`scripts/qa/biologyProductionBrowserAudit.ts`): a disposable `qa-*@mytutor-qa.invalid` account is registered through the
app, onboarded onto Biology, then for each concept a real session is created, the lesson is opened and the learner says "Show me a diagram";
the served scene's signature is compared with the one `resolveVisual` produces from this repository (`sameAsAudited`), and `/learn?subject=biology`
is loaded at 390 and 1280 px in dark and light and measured the same way as the local audit (overlaps, labels outside the stage, token/enum
leaks, horizontal scroll, figure count). For the six repaired figures every stage was also walked and screenshotted (dark). The account is
deleted in a `finally` block.

| Result | |
| --- | --- |
| Concepts audited on production | 14 — the six repaired figures (`brain-regional-organization`, `cell-theory`, `dna-replication`, `predator-prey-dynamics`, `mycorrhizae-plant-symbioses`, `plant-growth-hormones`) + 8 unchanged controls (`what-is-biology`, `cell-membrane-transport`, `enzymes`, `photosynthesis`, `mendelian-genetics`, `natural-selection`, `circulatory-system`, `ecosystem-structure-function`) |
| Views | 14 × 4 (mobile/desktop × dark/light) = 56, every one `MEASURED_CLEAN`: no overlap, nothing outside the stage, no leaked tokens, no horizontal scroll, exactly one figure |
| Served scene = audited scene | `sameAsAudited: true` for all 14 (production serves the figure this repository resolves) |
| Screenshots | stage-by-stage (dark) for the six repaired figures, plus the default view of every concept in all four combinations; one production view of each of the six repaired figures and two controls (`photosynthesis`, `circulatory-system`) was also looked at by eye; the remaining views are measured, not eyeballed |

Honest limits: the audit samples 14 of 199 concepts on production — the other 185 are covered by the local render audit of the same code plus the
byte-identical-payload check; the drive uses `groq`, so a turn served by another provider was not exercised; the first run's JSON was lost to a
worker restart (its console log, the screenshots and the second run's JSON cover the same 14 concepts; run 1 measured brain / cell-theory /
dna-replication; run 2 re-measured the rest, predator-prey included).

**QA-account incident (recorded, resolved).** The first production run was killed by a worker restart (`ERR_PROXY_CONNECTION_FAILED`) before its
`finally` block ran, orphaning one disposable account. It was found with a narrowly scoped read-only lookup (`email like 'qa-%@mytutor-qa.invalid'`
created in the last 2 days), logged in with the password derived from the account's own stamp, deleted through `/api/user/delete-account`
(`deleted=true`, re-login blocked), and a final count confirmed 0 `qa-%@mytutor-qa.invalid` users remain. No other table was read or written.

**Provider failures (separate from the figures).** Vercel runtime errors over the last 48 h include the Gemini fallback answering
`403 Forbidden … project has been denied access` (`/api/learn/chat`, `/api/learn/lesson-init`; first seen 2026-08-19, last 2026-10-09), occasional
Gemini `503`s, Resend test-recipient failures on email and `CredentialsSignin` noise. Groq is the primary and served every audited turn. No key was
rotated and no provider policy was changed; the Gemini project/key is an owner action in the Google console.

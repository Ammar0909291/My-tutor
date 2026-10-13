# Chemistry visual quality audit — 2026-10-08

**Scope:** every learner-facing Chemistry visual. Mathematics, Physics, English, Biology, CS, the Chemistry KG,
the Educational Brain, the curriculum and Tutor Max policy were **not** changed.
**Baseline:** `main` at `b07037f` (Vercel has built nothing since `05b7868`; see §11).
**Method:** the real resolver → the real client components in headless Chromium (1280px and 390px, light and
dark, every stage and control state) → measurement in the page and on the rendered pixels → pure
chemistry-semantic validators over the payloads. "The payload validates" was never accepted as evidence.

Everything below that carries a number was measured in this pass. Statements that are inference are marked
**(hypothesis)**.

---

## 1. Inventory (Phase 0, read-only — `scripts/chemistry/visual-audit/inventory.ts`)

| measure | value |
|---|---|
| Chemistry KG concepts | 186 |
| served a figure by Tier 0/1 (the synchronous resolver) | **51** |
| no figure from Tier −1/0/1 | **135** (123 with no binding or scene; 12 retired) |
| unique resolver-reachable visual instances | **37** (5 cards, 32 scenes) |
| interactive-control variants reachable by pressing a control | 47 (electron shells 10, periodic trends 30, molecule 5, lattice 2) |
| by origin (instances) | authored 31 · kind-default 4 · domain-default 2 |
| flags (instances) | interactive 4 · graph 6 · molecular 13 · reaction 12 · process-flow 1 · 3D 8 |
| all figures draw through | WebGL (react-three-fiber) + an HTML label layer |

**The "59/186 curated, 127 without" baseline is not an Explanation-Memory number.** It is "concepts with a registry
row **or** a `CONCEPT_SCENES` override" (35 + 24 at `901ad5d`/`5e53430^`; reproduced exactly by running the
resolver on archived trees). Today that definition gives 63, but **12 of those 63 are retired and show nothing**,
so what a learner is actually served is **51/186** (47 at the 59-baseline). `scripts/qa/visual-census.ts` reports
35/186: it reads registry rows only and is blind to scene-only concepts and to retirement.

Learner-reachable but **not** resolved per concept (cannot be enumerated offline — recorded, not guessed):
Tier 2 approved figures (production DB; docs name only `chem.found.stoichiometry`) and Tier 3 generated figures (LLM
+ critic). The five chemistry `*Interactive3D` components have **0 production importers** (dev demo only): not
learner-reachable. Opening turns (`lesson-init`) cannot show figures.

## 2. Initial render audit (baseline, unmodified code)

728 rendered states · 82 instances (37 resolver + 45 variants at audit time) · 1280px and 390px · both themes.

| | PASS | REVIEW_REQUIRED | FAIL |
|---|---|---|---|
| instances (worst state over viewports/themes) | 35 | 21 | **26** |
| — cards (5) | 0 | 0 | 5 |
| — scenes (32) | 7 | 5 | 20 |
| — interactive variants (45) | 28 | 16 | 1 |
| rendered states @1280 | 233 | 64 | 67 |
| rendered states @390 | 215 | 76 | 73 |

Findings by code (all states): `LABEL_COLLISION` fail 153 · `CLIPPED` fail 126 · `CONTRAST_LOW` fail 54 (cards) ·
`CONTRAST_LOW` review 99 · `LABEL_COLLISION` review 57 · `CLIPPED_AWAY` review 274 (decorative axis letters outside the
frame; invisible). Minimum effective font anywhere: 10.0px (the repo's floor) — 0 `FONT_TOO_SMALL`.
Harness correctness: `--selftest` 22/22 against known-bad samples; measurements were cross-checked against the
screenshots by eye (Born–Haber 1280, Daniell 390, real-gases 390, molecular shapes card).

`layout.ts`'s own model predicted 13 of 32 scenes unsafe on mobile; the browser confirmed 12 (nucleic-acids was clean)
with no false negatives among the 19 predicted safe.

## 3. Failure clusters and root causes

| # | symptom (seen) | root cause | shared or chemistry |
|---|---|---|---|
| C1 | The headline answer drawn **on top of** other labels: Born–Haber "Every path gives the same total…" over "Direct", "Via ions", "dissociation ½ΔHdiss" (24 collisions @1280, 29 @390); Daniell/all 7 cell scenes: "Ecell = …" over "Zn (anode)", "Cu (cathode)", "e⁻ flow" (390px) | `energyCycle.ts` put the result at `HEIGHT_SCALE_TARGET + 1.6` — the row of the path names and top level label; `electrochemicalCell.ts` put it at `BEAKER_Y1 + 2` — the row of the electrode names, under the wire. At the 1.75× heading tier it also wrapped to 3 lines (71px) on a phone | chemistry generators |
| C2 | Long clauses cut off at the canvas edge and colliding in 3–4-column comparisons: real gases ("a/Vm²: adds back pressure lo…"), phase diagram, pericyclic, biodegradable polymers | 4 columns ~85px apart on a 282px canvas leave no free space; the solver's displacement bound (30%) cannot reach it and it then **keeps the authored position** (clipped) | shared solver + shared generator (opt-in only) |
| C3 | Raw ASCII notation in figure text — `Zn2+ in solution`, `NH3`, `H2(g)`, `Cl-` (17 of 34 authored scenes), beside Unicode `e⁻` in the same figure, while tutor text and cards are typeset | `SceneLabel` prints text verbatim; `plainNotation` (CHEM-129) was applied to tutor text and MCQs only | shared (one choke point) |
| C4 | Amber result text 2.0:1 on the light card (result chip, emphasised panel line, "Working") on 10 figures | `color: var(--accent-amber, #f59e0b)` — the variable is defined nowhere, the fallback is used in both themes | shared CSS |
| C5 | All 5 3D cards fail in dark theme: white ▶ and active speed chip on gold = 1.84:1 | `VisualPlaybackControls` hard-codes `#fff` on `var(--coral)` (chalk-yellow in dark); `tokens.css` defines `--on-accent` for exactly this and documents the 1.7:1 trap | shared component |
| C6 | Labels that say something the figure contradicts or omits: a molten-salt cell labelled "in solution"; `Cu (pure, impure at cathode) (anode)`; a phase diagram "three regions" listing solid and gas only; the Nernst/concentration cells never showing the concentrations that set their EMF; a title promising "sp3d2 / d2sp3 hybridization" over a figure that draws none | hard-coded label text / a builder that ignored `concentration` | chemistry generators + params |
| C7 | 66 ordered element pairs in the periodic-trend control build nothing (Ne/Ar offered; H missing) | the option list was hand-typed instead of derived from the generator's own table | shared parametric table |
| C8 | Generated figures could print raw `Fe^{2+}`, `\ce{}`, `\to`, `K_{sp}` | the critic's LaTeX check listed 12 commands and 3 delimiters only | shared critic |
| C9 | A one-line reaction chain in a code fence ("S → SO₂ → SO₃ → H₂SO₄") deleted whole, leaving "Here is the Contact Process:" hanging | the guard's "≥2 arrow glyphs in a fence is a drawing" rule (written for a drawn grammar sketch) cannot tell a chain of species from a drawing | shared guard (narrow exemption) |
| C10 | A malformed authored payload was admitted, the tutor contract told a figure exists, and the client silently dropped it | `admitVisualAsset` checked only "is there anything in the payload" | shared gate (chemistry-only predicate) |
| C11 | (found in my own work) a chemistry gate that read labels with ASCII regexes silently became a no-op — and, for a ligand *count*, a false FAIL that blanked three hexaammine concepts — once figures were served typeset | verifiers written against `NH3`/`Co3+` | audit module (now notation-neutral, pinned) |

## 4. Repairs

**Shared (renderer / engine)**
* `layout.ts` + `SceneLabelLayer.tsx` — **wrap-to-fit retry** in the label solver: if a label has no safe placement at its natural
  width, retry it wrapped to progressively narrower widths (same words, same type size; a figure that already places cleanly is
  byte-identical, pinned). The Physics visual campaign landed the same mechanism independently (`fallbacks`: narrower wrap, then a
  tier step-down, with a fine-grid search, an edge inset and a backing plate on bodies) — a superset — so **at the merge the
  upstream solver was taken as-is and this duplicate was dropped**; `chemLayoutAndControls.test.ts` pins what Chemistry relies on
  (placed, inside the canvas, nothing unresolved, untouched when it already fits).
* `asset.ts` / `figureAudit.ts` — after the merge there are two admission predicates behind the one function: upstream's
  subject-agnostic `payloadBlockers` runs first, then Chemistry's `chemistryAdmission` (a deterministic FAIL from the chemistry
  validators). The extended raw-LaTeX marker set (arrows, `\ce`, `\text`, `\mathrm`, brace sub/superscripts; bare `x^2` still
  not flagged) now lives in upstream's single `containsRawLatex`. Both sides had made the identical `--on-accent` fix to the 3D
  playback glyph.
* `layout.ts` `fitSceneToFrame` — **perspective-aware framing**. The fitted camera distance was derived from the geometry's x/y
  extent alone, as if every point sat on the focal plane. A point `z` nearer the camera is magnified by `d/(d−z)`, so the
  ammonia figure (nearest H at z = +6.4, fitted distance 11.5 → 2.25×) lost its third hydrogen and a bond off the top-left
  corner at 1280 *and* 390px while the narration said "it bonds to 3 H atoms" (found only because `CLIPPED_AWAY` was kept as a
  REVIEW finding instead of being waved off as decorative). The distance is now `max(flat formula, |y|/(fill·tan) + z, |x|/(fill·tan·4/3) + z)`
  over points with `z > 0`; with no such point the original formula runs unchanged. **Blast radius measured, not assumed:** across all
  463 canonical scenes (0 have `z ≠ 0`) and every default and picker option of the 28 parametric kinds (129 builds), exactly two
  change — molecule NH₃ (11.5 → 17.9) and CH₄ (12.7 → 17.3).
* `layoutStages.ts` (new, pure) — replays the renderer's own reveal (same `budgetLabels`, same fresh set, same solver)
  so a unit test can say what the browser says. The all-labels predicate over-predicted because it ignored the
  9-label budget the renderer applies.
* `ExplainerFigure.module.css` — amber result text `#a04a08` on light (5.64:1; 5.01:1 on the grey card), bright amber kept
  on dark (6.86:1).
* `VisualPlaybackControls.tsx` — `--on-accent` instead of `#fff`.
* `ExplainerFigure.module.css` (expanded / fullscreen) — two defects found only by driving the *expanded* state in the
  browser: (1) `.frame:fullscreen` set `--fig-scene-h: none`, which is invalid inside `ThreeDVisual`'s own
  `min-height: min(260px, var(--fig-scene-h))` floor, so the inline declaration computed to `auto` and the floor silently
  vanished — measured at 390px: the expanded scene was **223×167, smaller than the 324×260 it has inline**, with the same
  fixed-size labels crowded into it (now `100vh`); (2) `.body`/`.stage` had `min-height: 0`, so a scene with a floor
  overflowed its box and was painted over the stage stepper and legend (now `auto`; the frame's own `overflow: auto`
  scrolls instead, which is what its comment always promised).
* `parametricScenes.ts` — periodic-trend options derived from the generator's table.
* `figureCritic.ts` / `figureAudit.ts` — raw-LaTeX check extended to `\rightarrow \leftrightarrow \to \ce \text \mathrm \left \right` and
  brace sub/superscripts. **Deliberately not** bare `x^2`/`H_2O`: `figureText()` includes a graph's `equation`, where
  `y = x^2` is the notation the parser compiles (a bare-caret rule would have rejected every quadratic graph in every
  subject; pinned).
* `asciiDiagramGuard.ts` — a **one-line** fence whose every part between arrows parses as a chemical species, with at least
  one real chemistry signal, is kept.
* `chemSpecies.pure.ts` (new, import-free) — complete element table, notation normaliser, formula and species parser,
  and the **figure-text typesetter** (`Zn2+`→`Zn²⁺`, `NH3`→`NH₃`, `[Ti(H2O)6]3+`→`[Ti(H₂O)₆]³⁺`). It rewrites a token only
  when it parses as a real species; it leaves `O2-`/`H2+` (oxide vs superoxide, H₂⁺ vs H²⁺ are undecidable in ASCII),
  a lone `C2`/`T1`/`V2` (locant or quantity), words, units, numbers and already-typeset text untouched.
* `typesetSceneChemistry.ts` (new) — applies it to exactly the strings `collectSceneTexts` lists and nothing else; wired at
  `makeVisualAsset`, the one place every tier's asset is built, **for `chem.*` concepts only**.
* `chemistryAdmission.ts` (new) + `asset.ts` — the one admission gate now also refuses a `chem.*` payload with a
  deterministic FAIL from `chemistryFigureAudit` (structure the client would drop, non-finite numbers, placeholder/debug
  text, internal ids, an EMF whose sign contradicts "spontaneous", a molten salt "in solution", …). It never blocks on
  REVIEW_REQUIRED (that would blank almost every chemistry figure) and admits if the audit itself throws.

**Chemistry-specific**
* `energyCycle.ts` / `electrochemicalCell.ts` — text lanes (title above path names above the ladder; result below the
  lowest level / below the beakers), result at the `detail` tier, true minus sign, `medium: 'molten'`, concentrations
  drawn, concentration consistency check.
* `energyCycle.ts` (second pass, after the post-fix browser run still showed Born–Haber stages tangled at 1280px — desktop
  label type is ~15.5px against 11.5px on a phone, in the same ~290px-tall canvas, so a 9-row ladder did not fit):
  (1) step labels sit **outward** of their arrow — the first column's to its left (length-aware offset), the others' to
  its right at the bar edge — instead of centred across the arrow and, for the first column, in the gap between the
  columns; (2) a level the paths **share** (the start, a common end state) is labelled **once**, centred between the
  columns that reach it, not stacked twice; (3) the path names are **column footers** under the lowest level instead of a
  fourth row at the top of the ladder with the title and the highest levels; (4) the **title is anchored to the highest
  level actually drawn**, not to the scale ceiling — Hess's Law only descends from 0, so the old anchor left eight empty
  units above the ladder and, because the camera is fitted to the whole extent, shrank every label for it (Hess no longer
  has an advanced-level phone gap); (5) walking down from the top, a level label that would sit closer than one text row to
  the label above it hangs just **below** its own line; (6) the resolve narration says "agree" only when the drawn totals
  do (it said "The totals agree" under "Paths disagree — …"). `chemistryFigureAudit.pure.ts`'s energy-cycle verifier was
  taught the new geometry and its negative tests still fail wrong arrows, wrong totals and non-conserving levels.
  *Tried and rejected:* lifting the top lanes (made 1280px stage-2 collisions worse, 3 → 5); a longer right-side outward
  offset (a 23-character label ran 31px off a 282px phone canvas — a shared layout cannot know the viewport, so the right
  side stays at the bar edge, and that is why a right-hand label still crosses its arrow in places).
* `conceptSceneParams.ts` — molten-NaCl `medium`, electroplating electrode label, phase-diagram liquid region, honest
  `chem.coord.bonding` title (scene id changes with the title), `gridFromGroups` opt-in on the four 3–4-group comparisons.
* `cellComparison.pure.ts` — `gridFromGroups` (opt-in; **default behaviour byte-identical**, so every Biology comparison is
  unchanged — pinned).

**Rejected / not done (and why)**
* No CSS or renderer special-casing of any one concept; no second engine, registry or renderer.
* No authored chemistry was "corrected" to make a check pass. Content that cannot be settled in the visual layer is in §8.

## 5. Post-fix render audit

The **complete** inventory was re-rendered on the final code (manifest regenerated from the final generators, nothing
filtered): 820 states · 84 instances (37 resolver + 47 variants; the periodic picker lost the dead Ne/Ar options and gained H, so the
variant count moved from 45) · 1280px and 390px · both themes · every stage, mode, "how this is shown" chip, control option and the
expanded view.

| | PASS | REVIEW_REQUIRED | FAIL |
|---|---|---|---|
| **instances** (worst state over viewports/themes), baseline → final | 35 → **55** | 21 → **29** | 26 → **0** |
| — cards (5) | 0 → 3 | 0 → 2 | 5 → 0 |
| — scenes (32) | 7 → 12 | 5 → 20 | 20 → 0 |
| — interactive variants (47) | 28 → 40 | 16 → 7 | 1 → 0 |
| rendered states @1280 | 233 → 375 | 64 → 35 | 67 → 0 |
| rendered states @390 | 215 → 361 | 76 → 49 | 73 → 0 |
| **all states** | 448 → **736** | 140 → **84** | 140 → **0** |

(The 81 instances present in both audits: 34 PASS · 21 REVIEW · 26 FAIL → 52 · 29 · 0. Failures became passes or *reviewable* findings;
each category below says what remains and why.) **This final run is on the merged tree** — after `origin/main` (the Physics visual
campaign's label solver, backing plates and audit gate) was merged into this work. The identical figures measured *before* the merge
were 702 PASS · 118 REVIEW · 0 FAIL, so the shared solver the merge brought in also cut the Chemistry contrast reviews from 98 to 61.

Findings by code, baseline → final: `LABEL_COLLISION` fail 153 → **0** (review 57 → 0) · `CLIPPED` fail 126 → **0** ·
`CONTRAST_LOW` fail 54 → **0** (review 99 → 61) · `CLIPPED_AWAY` 274 → **0** · `FONT_TOO_SMALL` 0 → 0 (minimum effective font
10.0px, the repo's floor) · `INNER_SCROLL_X` review 0 → 109, **all in the expanded view** (34 states, 18 instances), see R15.

What the 84 REVIEW states are: 34 are the expanded view scrolling (R15); the rest are `CONTRAST_LOW` review (56 states) where the
glyph sits on a saturated 3D fill or carries a halo (R16; ratios 2.13–4.49:1). **No state is REVIEW or FAIL for an overlapping,
clipped, unreadable or off-canvas label.**

Contrast tooling note — two harness rules were corrected while auditing, each recorded here because they *reduce* findings:
(1) contrast sampling is inset past the element's own 1px border (a pill's border `rgba(241,237,226,.10)` over the dark surface is
`#39463c` and was ≥10% of a small control's pixels, so it counted as a second "background": a false 4.02:1 against the real 5.38:1);
(2) a failure produced only by a *minority* background bucket, where the dominant in-box background and the surrounding ring both pass,
is downgraded FAIL → REVIEW (it stays visible, with the reason in the finding). 3 findings were affected by (2); the rest of the
the rest are halo/complex-background reviews that were REVIEW before. `--selftest` still catches all 22 known-bad samples.

The last four label-collision states that survived the first post-fix run were the Born–Haber cycle at 1280px, and a stage-by-stage
view of the Hess cycle in the expanded frame; both are fixed (second-pass `energyCycle.ts`, §4). The browser also found what no
model would have: the NH₃ figure was missing a hydrogen (§4, `fitSceneToFrame`).

## 6–7. Readability, contrast, formulas, structures, reactions, mechanisms, graphs, equilibrium, energy profiles

Chemistry-semantic validation ran over **374 figure instances** (84 resolver/variant figures as the browser renders them, 18 authored
scenes, 5 registry rows, 250 parameter-space builds of the pickers, 17 synthetic sweeps of the generators): **238 PASS · 136
REVIEW_REQUIRED · 0 FAIL**. No control builds nothing; the reference tables agree with the placement derived from Z.

| category | what was verified (deterministically, from coordinates / numbers / parsed species) | outcome |
|---|---|---|
| **Readability** | no overlapping, clipped or off-canvas label in any of 820 states; minimum effective font 10.0px; **412 of 820 states still carry text under the 12px recommendation** (401 of them at 390px: the phone label tier is 11.5px) | PASS on collisions/clipping; the 11.5px tier is unchanged and is a shared typography decision |
| **Contrast** | 0 fail-severity findings; amber result text 2.0 → 5.64:1 (light) / 6.86:1 (dark); 3D playback glyph 1.84 → on-accent; 61 REVIEW (halo / saturated fill, R16) | PASS with R16 |
| **Formulas, charges, subscripts** | every served chemistry figure string typeset (`Zn²⁺`, `NH₃`, `[Ti(H₂O)₆]³⁺`); idempotent; verifiers notation-neutral (parity pinned over all 29 authored scenes); `F-MINUS-MIX` 6 and `F-DOUBLE-SIGN` 4 are info | PASS |
| **Molecular structures** | single connected component, valence/octet, atom multiset = formula, VSEPR geometry recomputed from coordinates, title geometry and bond-angle label = drawn angle (6 molecules); electron shells: electron count = Z, aufbau occupancy, valence = group (20 elements, all PASS); coordination: geometry from coordinates, ligand counts vs narration, name prefix, oxidation state vs charge, cis/trans from coordinates (13, all PASS); NH₃ and CH₄ now framed with perspective counted | PASS; lone pairs / bond order are **not drawn** (R2), so the molecule figures stay REVIEW |
| **Reactions** | atom/charge conservation between consecutive levels, ΔU = Q + W (6 first-law figures, arrows follow the sign), EMF sign vs "spontaneous", ΔG = −nFE with integer n, electron flow anode → cathode (19 cells) | verified claims PASS; the 6 first-law figures stay REVIEW (no unit anywhere on the figure, R8) and the 19 cells stay REVIEW because the standard potentials, electrode materials and half-reactions are reference data (R17). The one unbalanced reaction found is a seed *probe*, not a figure (R1) |
| **Mechanisms** | the organometallic catalytic cycle is a *prose pathway* (and 5 more figures are prose comparisons): names, conditions, numbers and mechanism steps are text with no deterministic check; the notation, typesetting, layout and legibility checks all apply to it | **REVIEW_REQUIRED, not PASS** — a chemist must read it (R18) |
| **Periodic trends** | group/period from Z; trend claims follow placement; 66 previously dead ordered pairs now build; radius/EN *order* needs measured data | PASS on 200 of 272, REVIEW on 72 (R6) |
| **Graphs / bar charts** | bar heights proportional to values from zero, label = value, largest label = argmax, title trend/dip claims hold, heat capacities = equipartition values | the geometry checks PASS; 8 of 9 are REVIEW because the values are measured reference data (boiling points, radii, ionisation energies, log K — R17) and one prints no unit (R8) |
| **Equilibrium, energy profiles** | Hess/Born–Haber totals agree across paths; arrows rise for positive and fall for negative steps on one scale; consecutive levels conserve atoms and charge; crystal-field d-count = group − charge, eg above t2g (7 energy-cycle figures) | the internal-consistency claims PASS; all 7 are REVIEW because ΔH, IE, EA, lattice energy and Δo are measured reference data the audit cannot check against an in-tree table (R17); the unit is stated once (R8) |
| **Interactive states** | every picker option, stage, mode chip, "how this is shown" chip and the expanded view rendered and measured (47 variants + 37 instances) | 0 FAIL |


## 8. REVIEW_REQUIRED — reported, deliberately not changed

> **Superseded by §12 (2026-10-12):** every item R1–R19 below has a recorded disposition there (fixed, decided, or kept REVIEW_REQUIRED with an owner decision). The table is kept as the baseline.

Verified in the repository this pass, **not** changed — each needs an owner or curriculum decision, or cannot be settled
deterministically from the figure:

| # | item | evidence | why not changed |
|---|---|---|---|
| R1 | An **unbalanced** seed probe: `C + O²⁻ → CO₂ + 4e⁻` (needs `2O²⁻`) in `chem.elect.industrial` | `src/lib/teaching/assets/chemistrySeedAssets.ts` ~15752–15755; the atom/charge checker flags it | authored chemistry; rewriting it silently is exactly what was forbidden |
| R2 | Molecule figures draw **no lone pairs and no bond order** (CO₂ is two single sticks; "lone pairs squeeze the angle" is a claim the picture cannot show) | `moleculeGeometry` scenes; geometry itself is verified from coordinates | a new drawing capability, not a fix |
| R3 | **One figure for a multi-process lesson**: batteries, industrial electrolysis, "electrolysis" (molten NaCl) vs Faraday's laws | resolver binds one scene per concept | which process is *the* figure is a curriculum call |
| R4 | 12 concepts are served a **domain-default** card at "domain" scope; whether that card is appropriate for the concept is not decidable by a checker | inventory §1 | appropriateness is editorial |
| R5 | **Advanced level shows every label at once** (by design): the two energy cycles overflow at phone width at that level only | `chemLayoutAndControls.test.ts` pins this as the *only* known gap | the policy is Tutor-Max/visual-complexity, out of scope |
| R6 | Periodic picker lets a learner choose the **same element twice** (Cl/Na no-op comparisons) and the semantic check cannot decide radius/electronegativity order from placement alone | 64 `param` instances REVIEW | needs measured data, not placement |
| R7 | Body-centred and face-centred cubic lattices distinguish atom classes by **colour only** | semantic audit I-COLOUR-ONLY | adding shape/pattern coding is a design change |
| R8 | **Units** missing on some first-law / Born–Haber step labels (the unit appears on the common total, not on each step) | audit L-UNIT-MISSING (info) | the unit is stated once on the figure; repeating it everywhere costs width |
| R9 | `Ln3+`, `ΔH1` and similar shorthand are **not typeset** | typesetter negative list | `Ln` is not a real element symbol and `ΔH1` is a quantity, not a formula; guessing would corrupt text |
| R10 | **ASCII-art remnants** in tutor prose (orphan fragments, unfenced Lewis structures, `+---+` boxes) | `asciiDiagramGuard` only strips what it can recognise | stopping them needs an explicit NO-FIGURE policy in the tutor contract (owner/Tutor-Max decision) |
| R11 | **Tier 2 (approved) and Tier 3 (generated) figures are not enumerable offline**; none was audited | inventory §1 | needs the production DB / live LLM |
| R12 | **135 concepts have no figure at all** (123 unbound, 12 retired) | inventory §1 | content authoring programme, out of scope |
| R13 | Production has **not** been deployed or re-measured | §11 | Vercel has built nothing since `05b7868`; no deploy is claimed |
| R15 | The **expanded/fullscreen** view scrolls (the 18 instances that offer it, at 1280×800 and 390×844; text below the fold by 6–110px): the chrome around the scene is taller than the window. It used to *not* scroll only because the scene was crushed below its own floor (223×167 at 390px, labels piled up and the stepper painted over). `figureFitsOneViewport.test.ts` pinned `--fig-scene-h: none`; that token was the bug and the pin now says `100vh` | §4 | restoring the documented "scrolling a little beats crushing the picture"; making the chrome shorter (or the scene fill the window and the chrome scroll) is a shared UX change |
| R16 | **Label text drawn on a saturated 3D fill** (atoms, bars) measures 2.1–4.5:1 against the fill (worst: the `C` and `O` atom labels, 2.13:1; also `DNA`/`RNA`); every one carries a text halo/outline and was read in the screenshots, but WCAG 4.5:1 cannot be met by a glyph on a saturated sphere | §5 | the fix is a design one (label beside the atom, or a plate behind it) in the shared label layer |
| R17 | **Reference data inside figures** — ΔH, IE, EA, lattice energy, Δo, standard potentials, boiling points, radii, log K — is checked only for internal consistency (paths agree, arrows follow signs, EMF sign vs spontaneity, bar heights vs labels), never against an authoritative table | §6–7 | there is no authoritative chemistry data source in the repository to verify against; inventing one would be exactly the silent authoring that was forbidden |
| R18 | **Prose** pathways and comparisons (6 instances: the organometallic cycle and five comparisons) contain chemistry statements — names, conditions, numbers, mechanism steps — that no deterministic check can verify | §6–7 | needs a chemist's read |
| R19 | **Five fixed React-component cards** (atomic structure, electron shells, bond formation, molecular shapes, crystal lattice) — their internal content is not inspectable from the payload (`U-CARD`); they were rendered and measured as pixels only | §6–7 | no payload to audit |


## 8a. Dispositions (2026-10-12)

Every item of the §8 register was re-checked against the code of `main` at `74f4207` (other sessions had pushed since 2026-10-08) and ends in exactly one
state. (There is no R14 in the register — the numbering skipped it.) The §8 table above is the historical record and is unchanged.

**Re-measured today** (`scripts/chemistry/visual-audit`, real Chromium, 1280 / 390 px, both themes, every stage / mode / control / expanded view; the
inventory is now 39 resolver + 47 variant instances = **850 states**):

| | PASS | REVIEW_REQUIRED | FAIL | REVIEW findings |
|---|---|---|---|---|
| before the fixes below (today's baseline) | 765 | 85 | 0 | `INNER_SCROLL_X` 110 · `CONTRAST_LOW` 61 |
| after | **815** | **35** | 0 | `INNER_SCROLL_X` 110 (35 states, **all in the expanded view**) · `CONTRAST_LOW` 3 (the frame's own "More insights" summary, 4.47:1, expanded view, 390 dark) |

**All 786 states that are not the expanded view are PASS.** The Born–Haber / Hess / crystal-field figures were also rendered at the beginner and advanced
levels (12 runs, 1280 / 390 px, dark; the Born–Haber advanced view in light was rendered earlier in the same session): 0 findings. Served-figure counts today:
53 / 186 concepts served a figure (36 Tier 0 authored + 5 kind-default + 12 domain-default cards), 133 without (122 unbound, 11 retired), 18 served only at
"domain" scope.

| # | verified today | disposition | what changed / evidence | owner · finishing test (BLOCKED only) |
|---|---|---|---|---|
| R1 | Reproduced. A sweep of the whole Chemistry seed corpus (372 explanations, 687 + 244 probes, 95 equations parsed) through the atom/charge checker found **exactly two** FAILs, both this probe (the choice text and the answer key) | **FIXED AND VERIFIED** | `chemistrySeedAssets.ts`: `C + 2O²⁻ → CO₂ + 4e⁻` in both strings (1 C, 2 O and −4 charge on each side). `chemObjectiveVisualDefects.test.ts` R1: the whole corpus has 0 FAIL (and parses > 80 equations), the probe carries the balanced equation and not the old one, and the pre-fix string is still a `G-ATOMS-UNBALANCED` FAIL (negative control). **The production asset bootstrap is create-only: a content edit does not reach production by itself.** Nothing was written to any database; to converge, with owner approval: `npx tsx scripts/assets/converge-probe-edits.ts --subject chemistry` (read-only list), then `--apply --slugs chem.elect.industrial:step_check:en:undergraduate` | — |
| R2 | Reproduced as a capability gap: `moleculeGeometry.pure.ts` draws atoms and single bond sticks; no lone pairs, no bond order. But **no served figure's text mentions lone pairs or bond order** (0 matches in all 86 manifest payloads) and all six molecules audit PASS (valence/octet, VSEPR geometry, title angle = drawn angle) | **INTENTIONAL AND VERIFIED** | The figure kind is a VSEPR *geometry* figure built from the bond angle; Lewis detail is a different figure. Nothing it says is contradicted by what it draws. If the owner wants Lewis detail, that is a new drawing capability plus per-molecule data (lone pairs, bond order) — a curriculum/design decision, not a defect fix | — |
| R3 | Reproduced: `chem.elect.batteries` → zinc–carbon dry cell, `chem.elect.electrolysis` → molten NaCl, `chem.elect.industrial` → copper electroplating, `chem.elect.conductance` and `chem.elect.corrosion` → no figure | **BLOCKED** | One scene per concept is how the resolver binds; which process is *the* figure of a multi-process lesson is an editorial call | Owner: Chemistry curriculum. Finish: the owner's concept → process list, enforced by `chemistryVisualCoverageAudit.test.ts` |
| R4 | Reproduced: 18 concepts are served only at domain scope (12 domain-default cards, 4 kind-default scenes, 2 authored cards `chem.bond.hybridization` / `chem.bond.bond-parameters`); the inventory flags 6 as `insufficientForConcept` | **BLOCKED** | Whether a general card is appropriate for a concept is editorial; no checker can decide it | Owner: Chemistry curriculum. Finish: an owner-approved concept → card list, asserted over the registry `scope` field |
| R5 | Reproduced and measured. Born–Haber at the advanced level on a phone: 12 layout violations (5 step labels 5–39 px off the 282 px canvas, 7 collisions); in Chromium at 1280 px the advanced view had 2 label collisions (result sentence over the path names and the lattice-energy label). Seen in the screenshots: the five rises and falls were drawn **on one x**, so the falling arrows ran over the rising ones (no way to tell which label belonged to which step), and step labels were carried 130–250 px to the neighbourhood of a different arrow | **FIXED AND VERIFIED** (overflow, collisions, overlapping arrows, phone layout) | `energyCycle.ts`: (1) `assignLanes` — a step takes the first lane in which it does not overlap, in height, an arrow already drawn, so Born–Haber's three rises and two falls are two lanes; arrows carry `properties.energyPath`; (2) a figure with more than 12 labels is *dense*: narrow bars (compact geometry), step labels wrap beside their arrow (`labelWrapFraction`), no in-canvas copy of the frame title, and it opens on its starting level (its stage-1 narration already said so); Hess's Law (9 labels) and crystal-field splitting are drawn exactly as before. `chemistryFigureAudit.pure.ts`: the audit sums a path by `energyPath`, not by x (negative controls pin it), and the headline-total check — whose pattern only knew "…the same total" and had silently stopped running — matches "Every path totals" again. **Model:** advanced-level violations at phone / tablet / desktop 12 / 0 / 0 → **0 / 0 / 0** at every stage and level; the pin `chemLayoutAndControls` "ADVANCED … the one known gap" is now `[]`. **Chromium:** Born–Haber advanced 390 and 1280 px, light and dark: PASS (was REVIEW at 1280). Screenshots viewed (390 and 1280, light and dark, default / beginner / advanced) | see R5-residual |
| R5-residual | At the advanced level (every label at once) on a 282×260 phone canvas Born–Haber carries 15 labels — about half the canvas as ink. The placement is collision-free and clipped nowhere, but the solver can still seat a step label up to ~130 px from its arrow (72 px at the default level; was 136–152 / ~60) | **BLOCKED** | No Chemistry-only change helps further: the figure's own text cannot shrink (authored teaching text), and per-label units make it worse (see R8). The lever is the existing `fitToCanvas` stage-growth that Biology uses, which today is `fitToCanvas={subjectSlug === 'biology'}` in `LessonScreen.tsx` (pinned by `biologyFigureFraming.test.ts`) | Owner: shared visual layer (Physics/Biology/Chemistry). Finish: enable `fitToCanvas` for `chemistry`, then in the harness the advanced Born–Haber labels should sit ≤ 60 px from their arrows (extend `chemObjectiveVisualDefects.test.ts` R5 with a `placeSceneLabels` displacement bound on the grown stage) |
| R6 | Reproduced: at the defaults the pickers offered Cl as Element A (B is Cl) and Na as Element B; pressing it moved the highlight and built nothing | **FIXED AND VERIFIED** | `parametricScenes.ts`: optional `distinctFrom` on a choice variable + `offeredOptions(v, params)`; `periodic_trends` sets it both ways. `ExplainerFigure.tsx` passes each control through `offeredOptions` at its two call sites (3 lines; every variable without `distinctFrom` is returned as the same object). Tests: exhaustive — from every reachable state every offered chip builds (`11·16·2·16`… 8,160 checks), the raw list's no-op builds nothing (negative control), every other registered kind returns an identical object. Chromium: Element A lists no Cl and Element B no Na (screenshot viewed). The inventory no longer reports the 2 "dead options" | — |
| R7 | Reproduced: bcc and fcc told corner / face / body atoms apart by hue only (`I-COLOR-ONLY`) | **FIXED AND VERIFIED** | `crystalLattice.pure.ts`: the counting stage prints each atom's share above it — ⅛ corner, ½ face, 1 body — one-character marks (the label budget does not count them). The printed shares sum to the atoms per cell (test), sit above an atom of their class, and the lattice still passes its own sharing-rule checks. The validator's own pin now uses a synthetic colour-only figure; the lattices are asserted clean. Screenshot viewed (fcc, 390 light) | — |
| R8 | Reproduced: the first-law figure printed q, w and ΔU with no unit anywhere (`L-UNIT-MISSING`, REVIEW); Born–Haber states kJ/mol on the first step and the result only | **FIXED AND VERIFIED** (first law) · **INTENTIONAL AND VERIFIED** (Born–Haber) | First law: `chemistrySystemScenes.ts` states `kJ` on q, w, ΔU, the narration and the accessible label; the audit verdict goes REVIEW → **PASS** (the unitless variant is still flagged — negative control). Hess's Law already has the unit on every step. Born–Haber: adding ` kJ/mol` to the five ionic steps was measured — it breaks the phone advanced view (3–8 layout violations vs 0; `chemObjectiveVisualDefects.test.ts` pins the negative control), so the unit stays on the first step, the result sentence and the card chip | — |
| R9 | Reproduced on served figures: `ΔH1` / `ΔH2` (Hess steps) and `Ln3+` (lanthanide-contraction title) printed raw next to typeset text | **FIXED AND VERIFIED** | `chemSpecies.pure.ts`: `Ln` is the IUPAC generic lanthanoid symbol, so `Ln3+` → `Ln³⁺`; a step-indexed quantity `ΔH1`/`ΔG2`/`ΔS1` takes a subscript. Everything else stays byte-identical (`ΔH`, `ΔHf°`, `ΔHsub`, `ΔH298`, `ΔH10`, `ΔT1`, `M2+` pinned unchanged). Two pins moved with dated reasons (`Ln3+` out of the "untouched" list). Screenshot viewed (Hess shows ΔH₁ / ΔH₂) | — |
| R10 | Reproduced with `stripUnbackedAsciiDiagram(text, false)`: a **fenced** box is removed; an unfenced `+-----+` box, an unfenced Lewis `H : O : H`, and an orphan `H--C--H` fragment are kept | **BLOCKED** | The guard is shared by every subject, and what it may delete from tutor prose is a Tutor-Max contract decision (an explicit NO-FIGURE policy), not a Chemistry-only fix | Owner: Tutor-Max / tutor contract. Finish: the policy, then `asciiDiagramGuard` cases for an unfenced box and a Lewis dot structure with a chemistry exemption for reaction chains (already pinned) |
| R11 | Not enumerable offline: `inventory.ts` lists "Tier 2 approved" and "Tier 3 generated" as `unreachableOffline` | **BLOCKED** | Needs the production database (ACTIVE VISUAL rows) and a live LLM. No database was touched | Owner: whoever holds the production read credential. Finish: export the ACTIVE VISUAL rows, feed their `sceneSpec` through `auditChemistryScene` and the harness manifest |
| R12 | Reproduced: 133 of 186 concepts have no figure (122 unbound, 11 retired) | **BLOCKED** | A content-authoring programme, out of scope | Owner: Chemistry content. Finish: `scripts/chemistry/visual-audit/inventory.ts` `withoutFigure` falling per authored batch; `chemistryVisualCoverageAudit.test.ts` |
| R13 | Not re-measured: the repository cannot reach Vercel, and the audit page 404s in production by design | **BLOCKED** | No deploy is claimed. Production rendering needs a deployed preview with the dev route enabled, or the `VISUAL_TURN` runtime logs | Owner: Vercel account holder. Finish: after a deploy, run the harness against it (`--base-url`) and read the Tier 2 rows |
| R15 | Reproduced: 35 states, all in the expanded view, 110 `INNER_SCROLL_X` findings (text 6–110 px below the fold) | **INTENTIONAL AND VERIFIED** | Documented design: `ExplainerFigure.module.css` (`.frame:fullscreen`) — "the chrome alone can exceed the height, and scrolling a little beats crushing the picture to nothing"; the same shared CSS serves every subject. Every non-expanded state is PASS. Shortening the chrome is a shared UX change (see R5-residual for the owner of the shared layer) | — |
| R16 | Reproduced: 61 `CONTRAST_LOW` REVIEWs. Cards: `C` 2.13:1, `H` 3.4–4.4:1 (gold wireframe crossing the glyphs), `Completed crystal lattice` 3.54:1 (symmetry plane). Scenes: bond-angle, atoms-per-cell, ion and Cl labels at 3.9–4.5:1, always **text over the ground grid's lines** (a minority background) | **FIXED AND VERIFIED** | Cards: the existing `SceneLabel` `plate` on the labels inside the translucent geometry (`MolecularShapes3D.tsx`, `CrystalLattice3D.tsx`). Scenes: `stage.grid: false` in the molecule, lattice, coordination and electrochemical-cell generators (the energy cycles and system scenes already opted out; the shell figure is unchanged). Chromium: `CONTRAST_LOW` 61 → 3, and the 3 left are the frame's own "More insights" summary text (4.47:1, shared chrome, expanded view) — not figure text. Screenshots viewed (molecular-shapes card, water, fcc). The previous pin "the grid is left as it was" moved with a dated reason | — (the 4.47:1 frame summary is shared CSS; owner: shared visual layer) |
| R17 | Reproduced: ΔH, IE, EA, lattice energy, Δo, E°, boiling points, radii, log K are checked for internal consistency only. The repository holds no authoritative table for them (`docs/chemistry` is the KG and the teaching-asset blueprints; the only data tables in code are the 17-element EN/radius table and the shell/VSEPR tables) | **BLOCKED** | Inventing a table would be the silent authoring that is forbidden | Owner: Chemistry curriculum supplies a sourced table (e.g. `docs/chemistry/reference-data.json` with citations). Finish: a `verifyReferenceData` pass in `chemistryFigureAudit.pure.ts` and the 20 REVIEW verdicts that cite reference data (23 REVIEW scenes today) moving to PASS |
| R18 | Reproduced: 6 prose figures (organometallic cycle and five comparisons) audit REVIEW_REQUIRED, `prose chemistry statements … are not machine-checkable` | **BLOCKED** | Needs a chemist's reading | Owner: a Chemistry reviewer. Finish: a decision file per figure like Physics' `docs/qa/physics-visual-audit/semantic-review.json` and a test that enforces it |
| R19 | Reproduced: the five fixed cards have no payload to audit (`U-CARD`) | **INTENTIONAL AND VERIFIED** (+ guard) | By design a card is a React component and the payload carries only its type. Their pixels are in the render audit (0 findings after R16), and `chemObjectiveVisualDefects.test.ts` R19 now pins every text literal each card declares (and its five-stage reveal) so a change to a card fails until it is re-measured | — |

**Changed pins** (each with a dated reason in the test): `chemLayoutAndControls` (advanced known-gap list → `[]`; the all-labels predicate's example moved to a synthetic pile with Born–Haber now passing; energy-cycle label-side rule for several lanes), `chemVisualQualityAudit` (Born–Haber has no in-canvas title; the grid pin), `chemistryFigureAudit` (first-law unit and verdict; the colour-only example), `chemFigureTypeset` (`Ln3+`). No assertion was deleted.

**Tests** — new: `src/tests/chemObjectiveVisualDefects.test.ts` (32 tests: R1 corpus sweep, R5 lanes / dense rule / layout / verifier, R6 picker, R7 marks, R8, R9, R16, R19). Commands run on this tree (`74f4207` + these edits):
`npx vitest run <263 files matching chem|figure|visual|scene|parametric|molecule|lattice|electro|periodic|energy|coord|typeset|ascii|fingerprint|invariant|biology|physics|mathematics>` → **263 files, 11,936 tests passed** (includes `physicsVisualAudit`, `physicsVisualPilot`, `physicsVisualReadability`, `mathVisualCampaignAudit`, `biologyFigureFraming`, `visualArchitectureInvariants`, the Chemistry admission and typeset corpus properties); `npx tsc --noEmit` → no errors. Render: `node scripts/chemistry/visual-audit/render-measure.mjs --manifest <dir>/chem-manifest.json --out <dir>/out --workers 2 --port 3000` (850 states) and `--only 'scene:energy-cycle-*' --levels beginner,advanced`; `--selftest` 22/22.

## 9. Regression tests (permanent)

| file | pins |
|---|---|
| `chemFigureTypeset.test.ts` | typesetter positives, the byte-identical negatives (words, units, locants, `O2-`, orbitals, URLs), idempotence, the scene mapper (only text changes, input never mutated, same object when nothing to do), and a corpus property over every chemistry scene the resolver serves |
| `chemistryAdmission.test.ts` | the gate refuses real FAILs and admits REVIEW; chemistry-only; never throws; **no served chemistry figure is blanked (51 stay 51)**; audit verdict, verified claims and FAILs identical before and after typesetting for all 29 authored scenes |
| `chemistryFigureAudit.test.ts` | 129 tests: a bad and a good fixture per validator |
| `chemVisualQualityAudit.test.ts` | molten label, concentrations drawn, electroplating label, result lane, energy-cycle lanes/tier/minus, comparison default byte-identity and opt-in, phase-diagram liquid, honest `coord.bonding` title, critic LaTeX positives and the `x^2` negatives, ASCII-guard reaction chain kept / drawings still stripped |
| `chemLayoutAndControls.test.ts` | wrap-fit (retry, identity when unneeded, widest-first, failure keeps position), every authored chemistry scene legible at every stage × viewport (beginner, intermediate), the advanced-level known gap (Born–Haber only, phone width), periodic picker, contrast tokens, the complete view, the one-line result sentence, the fullscreen floor, **energy-cycle labels clear their arrows and a shared level is labelled once**, and **every molecule projects inside the frame with perspective counted** (fails without the `fitSceneToFrame` fix: ammonia and methane) plus a flat-scene identity check |
| `figureFitsOneViewport.test.ts` | (updated) the fullscreen token pin is now `--fig-scene-h: 100vh` and refuses `none` |
| `chemistryFigureAudit.test.ts` / `chemVisualQualityAudit.test.ts` | (updated) the energy-cycle verifier accepts outward and shared labels yet still fails wrong arrows, totals and non-conserving levels; lanes are title / ladder / path-name footers / result; the narration never says "agree" under "Paths disagree" |

## 10. Re-running the audit

```
npm ci && npx prisma generate
npx tsx scripts/chemistry/visual-audit/inventory.ts --out <dir>          # manifest + inventory (no DB, no network)
npx tsx scripts/chemistry/visual-audit/semantic-audit.ts --manifest <dir>/chem-manifest.json --out <dir>/semantic.json   # --out is a FILE
node scripts/chemistry/visual-audit/render-measure.mjs --manifest <dir>/chem-manifest.json --out <dir>/out --workers 3 --port 3437
    # real Chromium at 1280/390, both themes, every stage/control; --only 'scene:electrochemical-cell-*' --resume --levels default,beginner,advanced
node scripts/chemistry/visual-audit/render-measure.mjs --selftest        # 22 known-bad samples the harness must catch
```
The render page is `/dev/chem-visual-audit`: it calls `notFound()` when `NODE_ENV === 'production'`, is `noindex`, unlinked, and
(like `/dev/visual-2d`) adds nothing to production behaviour.

## 11. Production

Not deployed by this pass. Production is `b07037f`; Vercel has built nothing since `05b7868`, so commits `afa7322`,
`532055e`, `6ff5a40` (renderer fixes, ENGL-017 contrast lift) are also undeployed. No claim is made about production
rendering: the browser audit is against this repository's code on a local dev server, and Tier 2/3 figures cannot be
enumerated offline. After any deploy, re-run the harness against the deployed build and read the Tier 2 ACTIVE visual rows.


## 12. Closure (2026-10-12) — R1–R19 dispositions and the final measured state

Scope: the Chemistry visual system only. Mathematics, Physics, English, Biology, CS, the KG, the Educational Brain, GB+, grading, Tutor Max policy and
mastery were **not** touched (one deliberate shared-renderer fix, `GraphRenderer`, is called out in §12.3). Method: the real resolver (all tiers,
Tier 2/3 replayed over the committed production snapshot) → the real components in Chromium at 390 and 1280 px, both themes, every control state →
deterministic validators → independent source-based reviews → a committed, fingerprint-bound record that CI re-checks.

### 12.1 Final measured state (merged code, nothing filtered)

| | |
|---|---|
| concepts classified | **186** — E (a figure is served) **100**, D (a generated figure exists, refused) 59, B (should have one; the only figure was retired as wrong) 14, A (generator recorded a deliberate decline) 13 |
| served by tier | Tier 0 authored/generator 39 · Tier 1 curated/domain card 16 · Tier 2 approved 2 · Tier 3 generated 43 (before the closure the resolver also served 16 wrong generated figures and had no figure for 2 concepts) |
| figure instances audited | **134** — 42 resolver scenes/cards + 47 interactive-control variants + 45 Tier 2/3 figures |
| rendered states | **1,086** (instance × viewport × theme × control state): **990 PASS · 96 REVIEW_REQUIRED · 0 FAIL** |
| machine instance verdicts | 53 PASS · 81 REVIEW_REQUIRED · 0 FAIL (a REVIEW means no deterministic assertion covers the chemistry; §12.4) |
| what the 96 REVIEW states are | `INNER_SCROLL_X` 42 (expanded view scrolls, R15) · `CONTRAST_LOW` 46 (glyph on a saturated fill, R16; worst 2.13:1) · `LABEL_OVER_STROKE` 16 (a graph gridline behind a tick numeral, four Tier-3 graphs). **No state is REVIEW or FAIL for an overlapping, clipped, unreadable or off-canvas label.** |
| smallest type / lowest contrast measured | 10.0 px (the repo floor) · 2.13:1 (halo label on a saturated sphere) |
| human review | 81 REVIEW figures each carry a decision: 22 PASS · 23 FIXED→PASS · 36 REVIEW_REQUIRED (33 Tier-3 figures the reviewer called MINOR, the 2 approved Tier-2 flows, the chelate-effect bar chart) |

Files: `docs/qa/chemistry-visual-audit/audit-summary.json` (per concept: category, tier, provenance, fingerprint, instance, verdict; per instance:
fingerprint, verdicts, finding codes), `render-states.json` (the per-state manifest), `semantic-review.json` (the ledger),
`reference-data-ledger.json`, `periodic-reference-ledger.json`, `tier3-independent-review.json`, `prose-figure-review.json`,
`tier23-snapshot/` (the production cache read of 2026-10-09). CI: `chemistryVisualAudit.test.ts` recomputes every served fingerprint from the
resolver (Tier 0/1 directly, Tier 2/3 by replaying `resolveVisualForTurn` over the snapshot) and fails, naming the concepts, when the record is stale;
`chemistrySemanticReview.test.ts` fails when a REVIEW figure has no entry, an entry's fingerprint no longer matches, or its cited evidence has vanished.

### 12.2 R1–R19

| # | disposition | evidence |
|---|---|---|
| R1 | **Fixed in the seed** (`C + 2O²⁻ → CO₂ + 4e⁻`); every equation in the seed corpus now balances (test). The live production row is **not** changed: the bootstrap is create-only, so the edit needs a one-row `UPDATE`, **prepared, not executed** (owner confirm) — `R1-production-probe-fix.sql` | `chemistrySeedEquations.test.ts` |
| R2 | **Fixed**: bond order drawn as parallel sticks, lone pairs drawn in the free VSEPR domains (109.47° apart); the gate checks both | `chemistryClosureGates.test.ts` (R2) |
| R3 | **Fixed**: the batteries, industrial-electrolysis and electrolysis scenes say which process they show and that others exist; the dry cell is no longer taught as "an electrolytic cell" (found by this closure) | `chemistryClosureGates.test.ts` |
| R4 | **Decided by the semantic-moat doctrine**: all 12 domain-default cards were read; none depicts the position its concept refutes, so all stay (inert, demoted, scope-claimed at domain level); `chem.solid.packing` now owns a face-centred-cubic cell. No retirement row was added (the register stays at 14). An early draft that retired six of them contradicted the doctrine's pins and was withdrawn | `visualSemanticMoatPhysicsChemistry.test.ts` |
| R5 | **Decided (policy, unchanged)**: the advanced level shows every label at once by design; the only known gap is Born–Haber at phone width, pinned | `chemLayoutAndControls.test.ts` |
| R6 | **Fixed**: the periodic picker cannot pick the same element twice (taken chips are struck through); radius and electronegativity order verified against authoritative tables (136 pairs, scale-aware radius narration) | `periodic-reference-ledger.json` |
| R7 | **Fixed**: lattice atom classes carry a key label (no colour-only coding) | `chemistryFigureAudit.test.ts` |
| R8 | **Fixed**: units on each label (J on every first-law label; kJ/mol on the Born–Haber steps) | `chemistrySystemScenes.test.ts` |
| R9 | **Fixed**: `ΔH₁`, `Ln³⁺` and the D/T hydrogen isotopes are handled; "Ln" is the IUPAC generic lanthanide symbol and is noted, not "fixed" | `chemFigureTypeset.test.ts` |
| R10 | **Fixed**: the ASCII guard strips unfenced box/Lewis drawings and exempts one-line reaction chains | `asciiGuardRemnants.test.ts` |
| R11 | **Done**: Tier 2 (2 approved rows) and Tier 3 (147 cached figures, 74 promote verdicts, shown ~6,000 times) were read from production (SELECT only), replayed through the real resolver, rendered, and reviewed (61 figures read independently: 10 ACCURATE · 36 MINOR · 15 WRONG; those 15 plus one MINOR drawing error — a ring labelled furan with no oxygen — are refused by content fingerprint in `RETIRED_GENERATED_FIGURES`) | `tier3-independent-review.json` |
| R12 | **Done**: every concept classified (§12.1); the 2 unexamined concepts now own faithful figures (`chem.surface.colloids`, `chem.sblock.water`); the 14 B concepts are the retired-as-wrong ones awaiting a faithful figure | `audit-summary.json` |
| R13 | see §13 (production) | |
| R15 | **Decided (by design, measured)**: the expanded view scrolls in 42 states (the chrome is taller than the window); never a clipped or colliding label | `render-states.json` |
| R16 | **Documented, measured**: 46 states have a halo label on a saturated fill (2.13–4.49:1); WCAG 4.5:1 cannot be met by a glyph on a saturated sphere, every one was read in its screenshot | `render-states.json` |
| R17 | **Done**: 69 in-figure reference values checked against NIST / CRC-derived / Martell & Smith / Shannon sources — 41 MATCH · 27 within rounding · 1 UNVERIFIED. The unverified one (`[Cu(NH₃)₄]²⁺` log Kf 13.0 vs the critical 11.75 at I = 0, and a not-like-for-like chelate pair) stays **REVIEW_REQUIRED** with an owner decision | `reference-data-ledger.json`, `chemistrySemanticReview.test.ts` |
| R18 | **Done**: eleven prose pathway/comparison figures read independently (some three times); every correction applied; final reads CORRECT with minor notes recorded | `prose-figure-review.json` |
| R19 | **Done**: the five fixed React cards — four were wrong (a charged "atom" with 2/4/4 electrons, M "capacity" 8, two electrons vanishing in bond formation, a "repeated" lattice equal to its cell) and are fixed; the fifth (molecular shapes) was verified (109.47°). All five held to the periodic table by test | `chemistryClosureGates.test.ts` (R19) |

### 12.3 Defects the closure's own browser run found (not in the review)
* **Real gases** — the R18 wording for `b` clipped and collided with "Z > 1" at 1280 px (the layout *model* said fine; the browser said FAIL). Shortened.
* **Long-item comparison figures** (colloids, water, polymers) — in the legacy layout one column's items interleaved with the next, so a reader could not tell which caption belonged to which group, though no label collided. The comparison generator gained an **opt-in** `captioned` flag that reuses the Biology caption layout; every figure that does not opt in is byte-identical.
* **Zinc–carbon dry cell** — its goal text said "an electrolytic cell" for every undivided cell; it now follows `cellType`.
* **`GraphRenderer` (the one shared-renderer touch)** — the axis-name halo used `--surface`, a CSS variable defined nowhere, so it fell back to near-black and ringed the grey words in black on the light theme; and the x-axis name sat 4 px above the zoom buttons and was half hidden. Fixed with the app's `--bg-surface` and a 46 px baseline. This renderer is shared with Mathematics and Physics, whose graphs gain the same two corrections (no payload changes, no fingerprint changes).
* **True minus sign** in the first-law figure, the Hess/Born–Haber descriptions and the cell ΔG line; `D₂O`-style isotope formulas no longer raise an element note.
* **Periodic trends were four lines of text** (found by the PRODUCTION browser run, §13): `chem.period.modern-periodic-law` and `chem.period.periodic-properties` serve the shared `periodic_trends` generator, which drew only labels — "ST-03: the canvas holds text only, no drawn geometry (ink 0.00%)". The local render did not measure canvas ink (`render-measure.mjs` has no ST-03), so 28 local states had called it PASS. Each atom is now a sphere drawn to the same scale as its calculated radius, captioned in pm, for every ordered pair of the 17 selectable elements (272); `chemistryClosureGates.test.ts` now fails any Chemistry concept whose scene holds nothing but labels (the static form of ST-03, measured: exactly these two concepts), and re-rendered 31 instances (the default Na/Cl in 28 states, 30 element-picker variants) = 148 PASS.

### 12.4 What is still REVIEW_REQUIRED, and who decides
* **33 Tier-3 figures** the independent reviewer called MINOR (true, but loose or incomplete) — they stay served; a generated figure is never edited in place. Owner / curriculum pipeline: accept, regenerate or retire (`semantic-review.json` has each reviewer note).
* **2 approved Tier-2 flows** (`chem.found.significant-figures`, `chem.found.stoichiometry`): correct in outline, imprecise ("molar mole ratios", the trailing-zero rule, a missing moles-to-grams step). Corrections prepared in `tier2-corrections-prepared.md`, **not applied** (a production write).
* **The chelate-effect chart** (R17 above).
* **R1's production row** (prepared SQL).
* **Known limitation — a header label can sit on its sphere** (cosmetic: the text stays legible and nothing is clipped off the figure). In the colloids figure (an opt-in `captioned` comparison; the water and polymer figures use the same layout and showed it in none of the screenshots read) a header is clamped against the canvas edge and its plate covers the top of its own sphere, so the sphere is drawn with a flat top — seen locally under "True solution" and, at the real column width, in production under "Suspension". The machine audit cannot see it (a sphere is WebGL pixels, not DOM, and `render-measure.mjs` has no ink check). A larger header gap in the `captioned` layout was tried and did not move the label and made the expanded view's overflow worse (3, 8 and 7 overflowing text lines in the colloids, water and polymer figures), so it was reverted. Root cause: Chemistry canvases are not framed with headroom for their captions (`fitToCanvas` is Biology-only, `LessonScreen.tsx`); the fix is the shared renderer's framing — Physics and Mathematics use it too — so it is an owner decision.
* The 14 B concepts have no figure until a faithful one is authored; the 59 D concepts have a generated figure the critic or a gate refuses, and the 13 A concepts a recorded decline.

### 12.5 Re-running
```
npx tsx scripts/chemistry/visual-audit/inventory.ts --out <t01>
npx tsx scripts/chemistry/visual-audit/tier23-resolve.ts --out <t01>            # also writes tier23-manifest.json (Tier 2/3 served figures)
npx tsx scripts/chemistry/visual-audit/semantic-audit.ts --manifest <t01>/chem-manifest.json --out <t01>/semantic.json
npx next dev -p 3437 &                                                         # the render page /dev/chem-visual-audit 404s in production
node scripts/chemistry/visual-audit/render-measure.mjs --manifest <t01>/chem-manifest.json --out <r1> --base-url http://localhost:3437 --states all --workers 3
node scripts/chemistry/visual-audit/render-measure.mjs --manifest <t01>/tier23-manifest.json --out <r23> --base-url http://localhost:3437 --states default
npx tsx scripts/chemistry/visual-audit/final-audit.ts --tier01 <t01> --tier23 <t23> --base docs/qa/chemistry-visual-audit/audit-summary.json
```
`--only` re-renders just the instances whose fingerprint changed (the failing test names the concepts); merge the new `render-results.json` rows over the old
ones by `instanceId` before `final-audit.ts` (the manifest must be regenerated first — a stale manifest renders stale scenes). Run the render under
`setsid nohup … < /dev/null`: a plain background job dies with a worker restart. A full render is ~30 minutes at 3 workers (software WebGL).

## 13. Production verification (2026-10-13)

Deployment `dpl_GsCTR3568rmgeRaSoKCmadMWh4td` (commit `5465509`, state READY, alias `my-tutor-flame.vercel.app` serving it). The dev render route
`/dev/chem-visual-audit` returns 404 in production (verified). Harness: `scripts/qa/chemistryProductionBrowserAudit.ts` — registers a disposable
`qa-*@mytutor-qa.invalid` account, drives the lesson over the real API for each concept, then loads `/learn` at 390 and 1280 px in both themes, audits the
figure with the same in-page auditor the local audit uses and compares the figure on the wire with the checkout's `resolveVisual` fingerprint. Four runs
(a first full run plus three re-runs of the concepts that timed out); every disposable account was deleted (`deleted = true` in each run).

| | |
|---|---|
| concepts exercised | 35 (every concept the closure created or changed, a Tier 0 / Tier 1 sample across domains, both Tier 2 rows, one Tier 3 flow, the retired concepts) |
| states (concept × viewport × theme), best of the runs | 131: **118 PASS · 2 REVIEW_REQUIRED · 3 no-figure-as-expected · 8 NOT_RUN** · 0 FAIL |
| Tier 0 / Tier 1 fingerprint on the wire vs the checkout | **equal for every concept where both were measured** (20 concepts, 0 mismatches) — production serves exactly the audited figure |
| screenshots | the production captures were read, not only counted: Periodic Trends (the text-only finding), water and colloids (the sphere/label limitation below). The PNGs are run output and are not committed |

Findings (none fixed by redeploying unreviewed data; each has an owner):
* **FIXED and re-verified in production: Periodic Trends was text only** (the 2 REVIEW states, `chem.period.periodic-properties` at 390 px). See §12.3 and §13.1.
* **Tier-2 approved figures are not restored after a page reload** (`chem.found.significant-figures`, `chem.found.stoichiometry`: 8 NOT_RUN — the figure never appeared on the reloaded `/learn`, while the wire carried the `visualSpec` and the tutor's text referred to it). Root cause by code reading, not a harness fault: `GET /api/sessions` / history restore re-derives a figure with `restoreVisualSession` (Tier 0/1, synchronous) or `restoreFromFigureCache` (the `visualization_cache` row, Tier 3), and **neither reads the approved `visual_assets` row**, so an approved figure drops on refresh (the figure that arrives in the live turn goes through the ordinary renderer; that live display was not browser-verified here). Two concepts today. Not changed: it is the session-persistence path, outside a visual-quality repair. Proposed fix (owner): let `restoreFromFigureCache`'s caller fall back to `findApprovedFigure`, behind the same re-validation and admission the live path applies.
* **Retired concepts regenerate figures in production** (3 of the 6 B concepts sampled — `chem.org.hybridization`, `chem.carb.ketones`, `chem.nitro.amines` — served a freshly generated figure; the other three served none). Retiring a figure by content cannot stop the generator proposing a new one, and the admission path judges a new figure afresh. The ketones one repeats the flaw that got the concept retired. Owner decision: author a Tier 0 figure for the 14 B concepts, or add a pre-generation withhold for a retired concept.
* The 8 NOT_RUN are all the two Tier-2 concepts above (4 states each); the earlier timeouts on other concepts (`ERR_TIMED_OUT`) passed on re-run.

### 13.1 After the fix deployed
Deployment `dpl_8xJhAhCHsRz7gCvnGWVUjwHjAdR5` (commit `6fe384b`, READY; alias `my-tutor-flame.vercel.app` listed on it). A later commit that only adds Mathematics work was already building behind it, so the alias moves on without changing any Chemistry output. Harness re-run on `chem.period.periodic-properties`, `chem.period.modern-periodic-law` and the `chem.bond.vsepr` control: **12/12 PASS** (3 concepts × 390/1280 px × both themes), the wire figure's fingerprint `fdfe75ee0` equals the checkout's, and the screenshots show the two spheres to scale with their pm captions. The disposable account was deleted; a read-only count shows 26 `qa-*@mytutor-qa.invalid` rows, all created 2026-09-01 … 2026-10-02 by earlier campaigns — none from this closure's runs (every run here printed `deleted = true`). They were left alone: deleting them is a production write for the owner.

Observation, not changed: in that run the tutor's own reply said chlorine has "a radius of 99 pm" while the figure draws and captions 79 pm. Both are real figures (99 pm is a covalent radius; the figure uses the calculated 79 pm and the step narration says so), but the learner sees two numbers. The figure cannot control what the model writes; the model check-pass (`factCheckPass.ts`) did not flag it because both numbers are defensible. If it proves confusing, the captions could say "79 pm (calculated)" — owner's call.


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
* `layout.ts` + `SceneLabelLayer.tsx` — **wrap-to-fit retry**: if a label has no safe placement at its natural width, the
  solver retries it wrapped to progressively narrower widths (never narrower than its longest word). Same words, same
  type size; reached only after the natural box failed, so a figure that already places cleanly is byte-identical (pinned).
  The renderer paints the width the solver planned; the layout predicate checks that box.
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
* `figureCritic.ts` — raw-LaTeX check extended to `\rightarrow \leftrightarrow \to \ce \text \mathrm \left \right` and
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
| **instances** (worst state over viewports/themes), baseline → final | 35 → **43** | 21 → **41** | 26 → **0** |
| — cards (5) | 0 → 3 | 0 → 2 | 5 → 0 |
| — scenes (32) | 7 → 10 | 5 → 22 | 20 → 0 |
| — interactive variants (47) | 28 → 30 | 16 → 17 | 1 → 0 |
| rendered states @1280 | 233 → 349 | 64 → 61 | 67 → 0 |
| rendered states @390 | 215 → 353 | 76 → 57 | 73 → 0 |
| **all states** | 448 → **702** | 140 → **118** | 140 → **0** |

(The two columns that grew — REVIEW instances and the matching drop in FAIL — are failures that became *reviewable* findings, not
failures that were hidden: each category below says what remains and why.)

Findings by code, baseline → final: `LABEL_COLLISION` fail 153 → **0** (review 57 → 0) · `CLIPPED` fail 126 → **0** ·
`CONTRAST_LOW` fail 54 → **0** (review 99 → 98) · `CLIPPED_AWAY` 274 → **0** · `FONT_TOO_SMALL` 0 → 0 (minimum effective font
10.0px, the repo's floor) · `INNER_SCROLL_X` review 0 → 109, **all in the expanded view** (34 states), see R15.

What the 118 REVIEW states are: 34 are the expanded view scrolling (R15); the rest are `CONTRAST_LOW` review where the glyph sits on a
saturated 3D fill or carries a halo (R16). **No state is REVIEW or FAIL for an overlapping, clipped, unreadable or off-canvas label.**

Contrast tooling note — two harness rules were corrected while auditing, each recorded here because they *reduce* findings:
(1) contrast sampling is inset past the element's own 1px border (a pill's border `rgba(241,237,226,.10)` over the dark surface is
`#39463c` and was ≥10% of a small control's pixels, so it counted as a second "background": a false 4.02:1 against the real 5.38:1);
(2) a failure produced only by a *minority* background bucket, where the dominant in-box background and the surrounding ring both pass,
is downgraded FAIL → REVIEW (it stays visible, with the reason in the finding). 3 findings were affected by (2); the rest of the
98 are halo/complex-background reviews that were REVIEW before. `--selftest` still catches all 22 known-bad samples.

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
| **Contrast** | 0 fail-severity findings; amber result text 2.0 → 5.64:1 (light) / 6.86:1 (dark); 3D playback glyph 1.84 → on-accent; 98 REVIEW (halo / saturated fill, R16) | PASS with R16 |
| **Formulas, charges, subscripts** | every served chemistry figure string typeset (`Zn²⁺`, `NH₃`, `[Ti(H₂O)₆]³⁺`); idempotent; verifiers notation-neutral (parity pinned over all 29 authored scenes); `F-MINUS-MIX` 6 and `F-DOUBLE-SIGN` 4 are info | PASS |
| **Molecular structures** | single connected component, valence/octet, atom multiset = formula, VSEPR geometry recomputed from coordinates, title geometry and bond-angle label = drawn angle (6 molecules); electron shells: electron count = Z, aufbau occupancy, valence = group (20 elements, all PASS); coordination: geometry from coordinates, ligand counts vs narration, name prefix, oxidation state vs charge, cis/trans from coordinates (13, all PASS); NH₃ and CH₄ now framed with perspective counted | PASS; lone pairs / bond order are **not drawn** (R2), so the molecule figures stay REVIEW |
| **Reactions** | atom/charge conservation between consecutive levels, ΔU = Q + W (6 first-law figures, arrows follow the sign), EMF sign vs "spontaneous", ΔG = −nFE with integer n, electron flow anode → cathode (19 cells) | verified claims PASS; the 6 first-law figures stay REVIEW (no unit anywhere on the figure, R8) and the 19 cells stay REVIEW because the standard potentials, electrode materials and half-reactions are reference data (R17). The one unbalanced reaction found is a seed *probe*, not a figure (R1) |
| **Mechanisms** | the organometallic catalytic cycle is a *prose pathway* (and 5 more figures are prose comparisons): names, conditions, numbers and mechanism steps are text with no deterministic check; the notation, typesetting, layout and legibility checks all apply to it | **REVIEW_REQUIRED, not PASS** — a chemist must read it (R18) |
| **Periodic trends** | group/period from Z; trend claims follow placement; 66 previously dead ordered pairs now build; radius/EN *order* needs measured data | PASS on 200 of 272, REVIEW on 72 (R6) |
| **Graphs / bar charts** | bar heights proportional to values from zero, label = value, largest label = argmax, title trend/dip claims hold, heat capacities = equipartition values | the geometry checks PASS; 8 of 9 are REVIEW because the values are measured reference data (boiling points, radii, ionisation energies, log K — R17) and one prints no unit (R8) |
| **Equilibrium, energy profiles** | Hess/Born–Haber totals agree across paths; arrows rise for positive and fall for negative steps on one scale; consecutive levels conserve atoms and charge; crystal-field d-count = group − charge, eg above t2g (7 energy-cycle figures) | the internal-consistency claims PASS; all 7 are REVIEW because ΔH, IE, EA, lattice energy and Δo are measured reference data the audit cannot check against an in-tree table (R17); the unit is stated once (R8) |
| **Interactive states** | every picker option, stage, mode chip, "how this is shown" chip and the expanded view rendered and measured (47 variants + 37 instances) | 0 FAIL |


## 8. REVIEW_REQUIRED — reported, deliberately not changed

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
| R15 | The **expanded/fullscreen** view scrolls (all 17 instances that offer it, at 1280×800 and 390×844; text below the fold by 6–110px): the chrome around the scene is taller than the window. It used to *not* scroll only because the scene was crushed below its own floor (223×167 at 390px, labels piled up and the stepper painted over). `figureFitsOneViewport.test.ts` pinned `--fig-scene-h: none`; that token was the bug and the pin now says `100vh` | §4 | restoring the documented "scrolling a little beats crushing the picture"; making the chrome shorter (or the scene fill the window and the chrome scroll) is a shared UX change |
| R16 | **Label text drawn on a saturated 3D fill** (atoms, bars) measures 1.6–2.7:1 against the fill (worst: `Ce³⁺ 101.0 pm` on a blue bar 1.64:1, `C`/`O` on atoms, `DNA`/`RNA`); every one carries a text halo/outline and was read in the screenshots, but WCAG 4.5:1 cannot be met by a glyph on a saturated sphere | §5 | the fix is a design one (label beside the atom, or a plate behind it) in the shared label layer |
| R17 | **Reference data inside figures** — ΔH, IE, EA, lattice energy, Δo, standard potentials, boiling points, radii, log K — is checked only for internal consistency (paths agree, arrows follow signs, EMF sign vs spontaneity, bar heights vs labels), never against an authoritative table | §6–7 | there is no authoritative chemistry data source in the repository to verify against; inventing one would be exactly the silent authoring that was forbidden |
| R18 | **Prose** pathways and comparisons (6 instances: the organometallic cycle and five comparisons) contain chemistry statements — names, conditions, numbers, mechanism steps — that no deterministic check can verify | §6–7 | needs a chemist's read |
| R19 | **Five fixed React-component cards** (atomic structure, electron shells, bond formation, molecular shapes, crystal lattice) — their internal content is not inspectable from the payload (`U-CARD`); they were rendered and measured as pixels only | §6–7 | no payload to audit |


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

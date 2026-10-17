# Learner-experience defect backlog — status and plans (2026-10-16)

Scope: the "close the learner-experience defect backlog (2026-10-14 to 10-16)" prompt. State measured on
`origin/main` b92d3c4 plus this pass's edits. Nothing below that says "PROPOSAL" is implemented.

## 1. Fixed in this pass (code, each with a regression test and a mutation check)

| Id | Defect | Fix | Test |
|---|---|---|---|
| M1 | "what does converge even mean, the terms just get small?" in `math.real.convergence-sequences` resolved to `math.func.even-odd-functions` ("Even" is a TITLE_COMPONENT of "Even and Odd Functions", 0.8) and replaced the lesson's figure. The same sentence with "really" resolved to nothing. | `requestedConcept.ts`: new `isAdverbialFragment` filter in the `viable` chain — a lone ordinary adverb counts as naming a concept only when another word of that concept's title sits within 2 tokens ("even function", "even and odd") or the message is ≤2 tokens. Measured over all six KGs, "even" is the only ordinary adverb that is a single-word title component. | `adverbialFragmentNotATopic.test.ts` (9). Mutation: guard disabled → 3 fail. 204 files / 10,859 tests of every suite touching the resolver pass. |
| M2 | The figure self-description read out the semantics caption (`<title> — <teaching goal>`, goal clipped at 160 chars) and the step narration (clipped at 120 chars in the stored copy) as "the words written on it", cut mid-sentence. | `figureReference.ts` `figureEvidenceAnswer`: the title is the part before " — "; only short labels (≤48 chars, no ellipsis, not a sentence) are quoted. The claim-check evidence (`FigureEvidence.text`) is untouched. | `figureSelfDescriptionLabelsOnly.test.ts` (6). Mutations: tail kept → 2 fail; every entry quoted → 5 fail. |
| B3 | Newton's-second-law figure, 390 px: the speed-axis top number "45" sat level with the track's "0 m" and read as "45 0 m". Not a data error: the axes are fixed by design. | `newtonSecondLaw.pure.ts`: `GRAPH_V_MAX_LABEL_X` −1.2 → −2.4 (label-only; axes unchanged). Measured in Chromium at 390 px: gap 12.3 px → 17.6 px. | `newtonSecondLawSimulation.test.ts` (+1). Mutation: old position → fails. Physics audit re-run for this concept (`render.ts` → `validate.ts` → `merge-audit.ts`): PASS in every dimension; the freshness gate is green again. |

Audit record note: the committed row for `phys.mech.newtons-second-law` recorded 67 states over mobile + desktop-column;
the documented default sweep (`render.ts` defaults: 9 slider states in dark on mobile, desktop and desktop-column, 1 default
state on mobile light) records 28 states over three viewports. Verdict unchanged (PASS, 0 fail).

## 2. Deliberately not changed

- **C1 (numeric accuracy):** closed numeric track (owner, 2026-10-04). Not touched.
- **C2:** not reproduced today; nothing to fix.
- **C4 (platform talk):** not reproduced today. The phrase is not in code — it is a model paraphrase, so a deterministic
  strip would be a guess. Not built.
- **Re-ask rule (G2, 2026-09-24):** not touched.
- **A1–A6:** already fixed; their regression tests were re-run green (88 tests in `tutorTextDefects` plus the visual-continuity,
  `visual2dLayoutSafety`, `generatedGraphMustShowItsCurve`, `orbitalOccupancySuperscript`, `collapsedBulletSplit`,
  `periodicLawFigureDefault` suites).

## 3. Measured: the authored card pool (all subjects, from the authored corpus via `contract-audit` `load()` + `probeToMcq`)

| Subject | Concepts | Cards | Cards/concept min/median/max | Options 2 / 3 / 4 | Concepts with <3 cards | Concepts with <3 three-plus-option cards | Blind-guess accuracy |
|---|---|---|---|---|---|---|---|
| mathematics | 908 | 4,585 | 5/5/15 | 163 / 2,556 / 1,866 | 0 | 22 | 30.5 % |
| physics | 283 | 1,605 | 5/5/20 | 725 / 300 / 580 | 0 | 166 | 37.9 % |
| chemistry | 186 | 931 | 5/5/6 | 618 / 69 / 244 | 0 | 151 | 42.2 % |
| computer science | 119 | 268 | 2/2/3 | 152 / 77 / 39 | 89 | 119 | 41.6 % |
| biology | 199 | 597 | 3/3/3 | 203 / 104 / 290 | 0 | 199 | 35.0 % |
| english | 215 | 1,501 | 3/7/7 | 1,493 / 8 / 0 | 0 | 215 | 49.9 % |

("Blind-guess accuracy" = the expected score of answering every card at random.) Owner decision 3 (2026-10-07) makes a
2-option card practice-only only where the concept holds ≥3 authored 3+-option cards (`turnContract.certifiesMastery`).
Outside mathematics that condition is mostly unmet, so most 2-option cards still count towards mastery — English's counting
cards are, in effect, coin flips (1,493 of 1,501 are 2-option).

Cards needed to reach that floor (`Σ max(0, 3 − three-plus cards)` per concept):

| Subject | Concepts under the floor | Cards missing | Coverable by converting an existing 2-option card | Must be newly written |
|---|---|---|---|---|
| mathematics | 22 | 22 | 22 | 0 |
| physics | 166 | 215 | 215 | 0 |
| chemistry | 151 | 247 | 247 | 0 |
| computer science | 119 | 241 | 152 | 89 |
| biology | 199 | 203 | 203 | 0 |
| english | 215 | 637 | 637 | 0 |
| **all** | 872 | **1,565** | 1,476 | 89 |

Pool depth also explains the repeated-question reports: 5 cards per concept (3 in biology, 2–3 in CS) are spent in phases that
do not count towards mastery (GUIDE / DEMONSTRATE), so a learner who stays until mastery (owner decision 4) can exhaust the pool.

## 4. PROPOSALS (not implemented — each needs an owner decision)

### B1 — re-author the cards (guessability) + content sync

Two ways to reach the "≥3 authored 3+-option cards per concept" floor:

- **Path A — add new 3–4-option cards (recommended).** New cards are new identities, which the create-only bootstrap creates on
  the next cold start, so **no production content sync is needed**; the pool also gets deeper, which helps the repeated-question
  report. Needs 1,565 new cards (table above). To confirm before writing: slug capacity — the probe slug carries an optional
  difficulty segment (`buildProbeSlugResolver`); run `npx tsx scripts/brain/seed-knowledge-assets.ts --draft --dry-run` to prove
  no duplicate `canonicalSlug`.
- **Path B — re-author the existing 2-option cards in place** (1,476 conversions + 89 new CS cards). Same learner effect, but an
  edit of an existing identity **never reaches production by itself** (create-only bootstrap): it needs an owner-approved content
  sync (the 2026-09-22 SQL-equivalent write is the precedent) and a production convergence check afterwards.
- **Order (worst first):** english (637 cards, 49.9 % blind accuracy) → chemistry (247) → computer science (241) → physics (215)
  → biology (203) → mathematics (22).
- **Effort:** one campaign the size of the mathematics probe-depth campaign (1,833 probes in 24 modules) — roughly 10–13 batches of
  ~120–150 cards, each ending in the dry-run, the contract audit (`contract-audit.ts --min 3`) and `tsc`.
- **Risk:** content quality only — distractors must be plausible and carry a `misconceptionId`; no engine change. Path A adds
  production rows on deploy (reversible by status). Path B adds the sync risk above.

### B2 — real figures (measured today with `resolveVisual`)

| Concept | Served today | Proposal |
|---|---|---|
| `math.trig.unit-circle` | `registry:domain-default:math.trig:geometry_shape` — a generic geometry card, not a unit-circle figure | Author a unit-circle scene in the existing math batch workflow (`framed()`, label solver, ≤9 named labels, SM-01 label rule), register it, raise the audit threshold, re-render under `?scope=lesson`. ~½ day; low risk (label placement). |
| `chem.state.phase-diagram` | concept-authored `cell-comparison` scene "Reading a Phase Diagram: Pressure against Temperature" (22 objects) | Render it first (390/1280, both themes) and judge it against a real P–T diagram (three boundary curves, solid/liquid/gas regions, triple and critical points); author a plotted scene only if it falls short. Needs a chemistry audit re-render and an updated semantic-review binding. ~½–1 day; medium risk (audit gate). |
| `eng.grammar.nouns` | none — `no-figure:no-faithful-visual` (by policy, not a wrong figure) | A sorting figure (person / place / thing / idea) only if it passes the faithfulness policy; never a decorative figure. ~½ day; low–medium risk. |
| `bio.immuno.immune-disorders` | concept-authored scene "Immune Disorders: Three Failure Modes" (14 objects) — the 2026-09-25 Tier 0 fix | Verification, not authoring: re-run the biology render harness on this concept and confirm in production. ~1 h; low risk. |

All four are code-served registry figures: they ship with a deploy, not with a content sync. Each new or changed figure must pass its
subject's visual audit gate in the same push.

### B4 — more probes

- **Floor (3 probes, the asset contract):** 89 CS concepts (median 2 cards) are under it today → 89 new cards.
- **Depth (5 probes, the mathematics/chemistry/physics standard):** CS 327 more, biology 398 more.
- New identities only, so no production content sync; same dry-run, contract-audit and convergence checks as B1.
- **Effort:** ~89 cards for the floor (1 batch); ~725 for depth (5–6 batches).

### Owner decisions needed before any of the above starts

1. B1 Path A (add) or Path B (re-author + sync)?
2. Stop spending authored cards in non-counting phases (GUIDE / DEMONSTRATE)? That is an Educational Brain teaching-decision
   change, so it needs the G1/G2 sign-off; the alternative is to deepen the pool (B1 Path A / B4).
3. B2: which of the four to author (the Immune Disorders and Phase Diagram items may need only verification).

## 5. Decisions taken on owner delegation (2026-10-17: "Take the best decision yourself")

| # | Item | Decision | Status |
|---|---|---|---|
| 1 | Parked `POINTS_AT_MISSING_OPTIONS` widening (38609b7f) | **Finish it, narrowly.** Only the form measured live ("Your turn to pick the answer!", bio.gen.mendelian-genetics, 2026-09-27) is added: `your turn to (pick\|choose\|select) …`. The broader "pick an option" / "choose the option" stays out. Mutation check: the broad version deletes ordinary teaching sentences ("In a multiple-choice question, choose the option that fits your reasoning first."), the narrow one does not. | DONE — `yourTurnToPickWithoutOptions.test.ts` (10 tests) |
| 2 | B1 | **Path A — add new 3–4-option cards**, no in-place edits, no content sync. Order: english (637) → chemistry (247) → computer science (241) → physics (215) → biology (203) → mathematics (22). | **IN PROGRESS** — English, chemistry and physics DONE; computer science SKIPPED on owner instruction ("skip cs"); biology and mathematics DONE, see §6 |
| 3 | Stop spending cards in GUIDE / DEMONSTRATE | **Not taken.** It is an Educational Brain teaching-decision change and needs the real G1/G2 owner sign-off; deepening the pool (decision 2 and B4) removes the need for it without an engine change. | Not started |
| 4 | B2 | Verify before authoring: re-render `bio.immuno.immune-disorders` and `chem.state.phase-diagram` (390/1280, both themes) and author only if they fall short. `math.trig.unit-circle` goes in the next trigonometry batch of the already-authorised Mathematics figure campaign. `eng.grammar.nouns` last. | Not started |
| 5 | B4 | Floor first (89 CS cards), depth (5 per concept) afterwards. | Not started |

**Gate on 2–5.** They author teaching content (cards, figures). The standing instruction for the system-layer
agent is never to modify Physics/Mathematics/English teaching assets unless explicitly asked, so none of it was
started on a "decide for me" alone. The gate was lifted by the explicit owner instruction "F it's required then
go ahead" (2026-10-17), which authorises B1 Path A and the items after it, in the order above.

## 6. Execution log (2026-10-17)

### B1 Path A — English: DONE (216 / 216 concepts at the floor)

Method (every batch): one new card per free `(concept, kind, band)` slot — never a second probe in a used slot, which
would promote the slot to a 5-segment slug and abandon the live identity (P-10) — with three options: the correct
answer plus one wrong answer for each of two of the concept's registered misconceptions (ids taken from the concept's
own existing probes or its educational-brain misconception library, never invented). Every stem is a new worked
example; facts come from the concept's blueprint.

| Gate | Result |
|---|---|
| Validator (`scripts/qa/englishCardDepthValidate.ts`) | exactly 3 distinct options, one correct; slot free; ids known; no repeated stem; correct answer strictly longest in 29–38 % of cards per batch (chance 33 %) |
| Seed dry-run (`seed-knowledge-assets.ts --draft --dry-run`) | 13,853 items, 13,853 distinct identities, 0 duplicates |
| Contract audit (English) | 216 concepts, 412 pairs, 410 at contract (was 409); the 2 short pairs are pre-existing gaps, not card-depth (no ADULT probe for `phonemic-awareness`; the EARLY open-recall probe of `letter-sound-correspondence`) |
| Floor (`Σ max(0, 3 − three-plus cards)`) | 637 → **0** |
| Full suite | one real finding: the capitalisation card's options differ only by case on purpose, and `caseOnlyOptionsProbe.test.ts` requires such a pair to be listed; it is listed, with the reason |

Batches: `englishCardDepthBatch1` … `Batch24` (≈ 640 cards). Delivered by the create-only bootstrap on the next cold
start; no content sync is needed.

### B1 Path A — Chemistry: DONE (186 / 186 concepts at the floor)

Same method. Free slots were `short_answer`, `fill_blank`, `numeric` (HIGH) and, for the undergraduate concepts, the
same labels at UNDERGRADUATE; the kind is only a slot label (`probeToMcq` is the serving predicate). Facts come from
each concept's blueprint (Misconception Library, replacement and discrimination pairs); wrong answers that match no
registered misconception carry no id. `scripts/qa/englishCardDepthValidate.ts` now derives the subject prefix from the
batch and accepts misconception ids defined in `educational-brain/concepts/*/<concept>.md`.

| Gate | Result |
|---|---|
| Validator (all 16 batches) | exactly 3 distinct options, one correct; slot free (also across batches); ids known; correct answer strictly longest in 24–40 % of cards per batch |
| Seed dry-run | 14,100 items, 14,100 distinct identities, 0 duplicates |
| Contract audit (chemistry) | 186 concepts, 186 pairs, 186 at contract, 0 short |
| Floor | 247 → **0** |
| `tsc` ratchet | 0 ≤ 0 |
| Full suite | 998 files, 25,509 tests passed |

Batches: `chemistryCardDepthBatch1` … `Batch16` (247 cards).

### Computer science — SKIPPED on owner instruction ("skip cs", 2026-10-17)

The 241 CS cards (11 batches, all validated) were drafted and then removed from the tree on that instruction; nothing
CS was committed. CS therefore stays at its measured state (119 concepts under the 3-card floor, 89 of them also under
the 3-probe contract floor, median 2 cards) and the B4 CS items (89 floor cards, 327 depth cards) stay open. Pick it up
only on a fresh owner instruction.

### B1 Path A — Physics: DONE (283 / 283 concepts at the floor)

Same method. Free slots were `step_check` (165 cards) and `fill_blank` (49) / `numeric` (1) at each concept's own
band — the kind is only a slot label. Facts come from each concept's blueprint (Misconception Library, replacement and
discrimination pairs); a wrong answer that states a registered misconception carries that id (physics ids are `MC-n` for
some concepts and long names for others, e.g. `MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS` — read them off the concept's
own probes); any other wrong answer carries no id.

| Gate | Result |
|---|---|
| Validator (all 13 batches) | exactly 3 distinct options, one correct; slot free (also across batches); ids known; no repeated stem; correct answer strictly longest in 24–40 % of cards per batch |
| Seed dry-run | 14,315 items, 14,315 distinct identities, 0 duplicates |
| Contract audit (physics) | 283 concepts, 306 pairs, 306 at contract, 0 short |
| Floor | 215 → **0** |
| `tsc` ratchet | 0 ≤ 0 |
| Full suite | 998 files, 25,509 tests passed |

Batches: `physicsCardDepthBatch1` … `Batch13` (215 cards).

### B1 Path A — Biology: DONE (199 / 199 concepts at the floor)

Same method. Free slots were `step_check` (all 199 concepts; 4 concepts needing two cards also used `fill_blank`) at each
concept's own band (HIGH, or UNDERGRADUATE for the advanced concepts); the kind is only a slot label. Facts come from each
concept's educational-brain entry (Core Understanding and Misconceptions); a wrong answer that states a registered
misconception carries that id (ids read off the concept's own probes or defined in its EB entry), any other wrong answer
carries none. `scripts/qa/englishCardDepthValidate.ts` now also reads EB misconception ids written as a bullet
(`- **M1 — …`) or a heading (`### M1 — …`), the two forms the biology entries use.

| Gate | Result |
|---|---|
| Validator (all 11 batches) | exactly 3 distinct options, one correct; slot free (also across batches); ids known; no repeated stem; correct answer strictly longest in 28–33 % of cards per batch |
| Seed dry-run (with mathematics) | 14,540 items, 14,540 distinct identities, 0 duplicates |
| Contract audit (biology) | 199 concepts, 199 pairs, 199 at contract, 0 short |
| Floor | 203 → **0** |
| `tsc` ratchet | 0 ≤ 0 |
| Full suite | 998 files, 25,509 tests passed |

Batches: `biologyCardDepthBatch1` … `Batch11` (203 cards).

### B1 Path A — Mathematics: DONE (908 / 908 concepts at the floor)

22 cards, one per under-floor concept, in `mathematicsCardDepthBatch1` (free slot `step_check` at the concept's band). Facts
come from the concepts' own probes and blueprints; every misconception id is one the concept already registers
(`MC-n` or a long name). Contract audit (mathematics): 908 concepts, 917 pairs, 917 at contract, 0 short. Floor 22 → **0**.

### B4 — Biology depth: DONE (199 / 199 concepts at 5 probes; computer science skipped)

After Path A every biology concept held 4 probes (3 authored + 1 new card; 4 concepts held 5). This adds the fifth: one
`fill_blank` card per concept (195 cards, 11 batches), each on a facet the other four do not ask — a definition, a
mechanism, an application or a second misconception — so a learner who stays until mastery meets a new question instead
of a repeat. Same method and ids as Path A; the free slot was `fill_blank` at the concept's own band (HIGH, UNDERGRADUATE
for the advanced concepts).

| Gate | Result |
|---|---|
| Validator (all 11 batches) | exactly 3 distinct options, one correct; slot free (also across batches); ids known; no repeated stem; correct answer strictly longest in 29–33 % of cards per batch |
| Seed dry-run | 14,735 items, 14,735 distinct identities, 0 duplicates |
| Contract audit (biology) | 199 concepts, 199 pairs, 199 at contract, 0 short |
| Depth (5 probes per concept) | 195 → **0** concepts below |
| `tsc` ratchet | 0 ≤ 0 |
| Full suite | 998 files, 25,509 tests passed |

Batches: `biologyDepthBatch1` … `Batch11` (195 cards). The B4 computer-science items (89 floor cards, 327 depth cards) stay
open: CS was skipped on owner instruction.

### B2 — figures: `bio.immuno.immune-disorders` verified, `chem.state.phase-diagram` replaced (done); unit circle and nouns open

**`bio.immuno.immune-disorders` — verified, no change needed.** Rendered with `scripts/qa/biologyVisualRenderAudit.mjs --all-stages`
(dark and light, 390 px and 1280 px, five stage states each = 20 states): 0 label overlaps, 0 labels outside the canvas, 0 leaks,
no horizontal scroll, label font 13.4 px desktop / 10 px mobile. The repo audit already held PASS for it.

**`chem.state.phase-diagram` — the text comparison is now a drawn pressure–temperature diagram.** New generator
`src/lib/teaching/sceneGenerators/phaseDiagram.ts` (`buildPhaseDiagramScene`, `checkPhaseDiagramConsistency`): pressure and
temperature axes, the sublimation, vaporisation and melting curves meeting at the triple point, the curve ending at the critical
point, and the solid / liquid / gas / supercritical regions labelled. Four steps (axes → regions → boundaries → named points).
Registered in `conceptSceneParams.ts` for `chem.state.phase-diagram` in place of the cell-comparison entry. Narration keeps the
numbers (water 273.16 K / 612 Pa; CO₂ 304 K / 73 atm; water 647 K / 218 atm), and names the curves because the default view's label
budget (9) holds the regions and points. Tests: `src/tests/phaseDiagram.test.ts` (7, with a mutation test); the two older chemistry
visual tests that pinned the comparison were updated to the new content.

Chemistry visual audit: re-rendered and re-recorded (`audit-summary.json`, `render-states.json`, new `semantic-review.json` entry
`scene:phase-diagram-pt`, fingerprint `f9e058c5a`, decision FIXED→PASS). 22 states: 20 PASS, 2 REVIEW_REQUIRED (expanded-view scroll
only, recorded as R15 in the semantic-review ledger).

Gates: full suite 999 files, 25,516 tests passed (9 skipped); `tsc` ratchet 0 ≤ 0; chemistry visual audit and semantic-review gates green.

**`math.trig.unit-circle` — now its own figure (Mathematics batch 43, 2026-10-17).** It was served the geometry domain's shared
shapes card (owner question Q1). `src/lib/teaching/sceneGenerators/mathCoreScenesB43.ts` (`buildUnitCircleScene`, id
`math-unit-circle`) draws a radius-1 circle about the axes' crossing with 1 / −1 on both axes, P at 30° (cos θ = 0.87 red leg,
sin θ = 0.50 blue leg, x² + y² = 1) and Q at 150° (cos 150° = −0.87 left of the vertical axis, sin 150° = 0.50). The value labels sit
outside the circle: they are wider than one quadrant of it. Test `src/tests/mathCoreScenesBatch43.test.ts` re-derives every stated
number from the drawn coordinates (constant ring radius, both points on it, radii and arcs sweeping 30° and 150°, each leg's signed
length = the coordinate, signs, the four axis numerals) and was mutation-checked. Label solver: 0 moved on the card host. Render audit
(`renderAudit.ts --concepts math.trig.unit-circle --redo` → `validate.ts` → `merge-audit.ts`): PASS at 390 px dark and light, 1280 px
and the 50/50 column; the first render's LY-02 on a tick numeral was repaired. Ledger entry now FIXED_DEFECT with the new
fingerprint, owner question Q1 covers 30 concepts, card floor 43 → 42, campaign floor 510 → 511, and `visualScope.test.ts` uses
`math.geom.circle-area` as its domain-card sample. Gates: full suite 1,000 files, 25,530 tests passed (the one failing file was the
sample fix above, re-run green); `tsc` ratchet 0 ≤ 0; `validate-visualization-coverage` PASS.

**Still open under B2**
- `eng.grammar.nouns`: last. English serves NO static figure by policy (`englishVisualAudit.test.ts` pins it: "if one appears it
  needs a real audit"), so a sorting figure is the first English registry figure and needs its own render audit, not the envelope one.

### Next

B2: `eng.grammar.nouns` (see above), then, when the owner un-skips computer science, B1 Path A (89 floor cards) and B4 depth (327
cards) for CS.

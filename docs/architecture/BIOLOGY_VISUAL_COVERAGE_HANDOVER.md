# Biology Visual Coverage Campaign — Handover

**Subject**: Biology visuals ONLY (`src/lib/teaching/visual/conceptSceneParams.ts` +
`src/tests/bioVisualCoverageCampaign.test.ts`). **Status: COMPLETE as of batch 13 (2026-09-27) —
all 161 statically-flagged concepts fixed.** This file remains the complete pickup point for any
future Biology-visual work (a fresh regression, a new concept added to the KG, etc.) — read it in
full before touching Biology visual code. Update this file on every future commit that touches
this campaign's scope (add a dated entry, refresh the headline numbers) so a different Claude
session can resume cold at any point.

**Governing directive** (owner, this session, verbatim): *"Is it ready for end user? Yes or no"* →
answered **No**, citing three gaps: (a) an unreproduced empty-tutor-response bug, (b) almost no
Biology concepts audited for a "no diagram ever, even on explicit request" visual defect, (c)
mastery completion never observed end-to-end in production for a real Biology lesson. Owner's
follow-up instruction: **"Make it end user ready. Don't stop until ready."** This campaign (item
b) is being worked to completion autonomously under that instruction; items (a) and (c) are
separately tracked, still open, and listed under "What's left after this campaign" below.

## The defect this campaign fixes

A live diagnostic sweep (disposable QA accounts, real HTTP calls to `/api/sessions` +
`/api/learn/lesson-init` + `/api/learn/chat` against the deployed app, one concept per Biology
domain, then re-confirmed with repeated distinct phrasings across fresh sessions) found that an
explicit "show me a diagram" request never produces a figure for roughly 3 in 4 of Biology's 161
concepts that have no static (Tier 0/1) visual binding. Root cause: `resolveVisual.ts`'s Tier 3
(live LLM generation + critic judgment) can get permanently stuck reproducing a candidate
fingerprint-identical to one already critic-rejected (`no-figure:retry-identical-figure`) for
concepts whose generator output is near-deterministic — this is not a two-concept anomaly, it is
systemic. Two concepts (`bio.plant.photosynthesis`, `bio.immuno.immune-disorders`) were found and
fixed first (`bioVisualGapFix.test.ts`); this campaign is the resulting full remediation across
all 161 static-audit-flagged concepts.

## Fix methodology (do not deviate)

1. Extract the concept's own Educational Brain `## Core Understanding` section
   (`educational-brain/concepts/biology/{conceptId}.md`) — this is the **sole** grounding source.
   Never use the fuller raw KG description, never invent structure the EB entry does not state.
2. Classify the concept's content shape into one of four existing, reused generators (no new
   generator, no per-concept bespoke rendering code):
   - `buildCellPathwayScene` (`src/lib/teaching/sceneGenerators/cellPathway.pure.ts`) — a REAL
     ordered sequence (`stages: [{name, description}]`, optional `cyclic`/`branchStart`/`branchEnd`).
   - `buildCellComparisonScene` (`cellComparison.pure.ts`) — 2+ contrasted categories
     (`groups: [{label, description, items: string[]}]`). **Note the field is `groups`, not
     `categories`, and `items` is a plain `string[]`.**
   - `buildCellHubScene` (`cellHub.pure.ts`) — independent coexisting items around one umbrella
     idea (`hubLabel`, `spokes: [{name, description}]`).
   - `buildCellStructureScene` (`cellStructure.pure.ts`) — a whole thing + its defining parts
     (`subject`, `boundaryLabel`, `parts: [{name, description}]`).
   A list of coexisting things is a HUB, never a PATHWAY (a "list is not a process" — see each
   generator file's own header comment). Only add a Tier 0 override where the concept is actually
   confirmed stuck; a concept that already serves a real, on-topic figure via Tier 3 (e.g.
   `bio.plant.plant-respiration`, confirmed in the original sweep) is deliberately left unauthored
   — never inflate the count.
3. Append the new entries to `CONCEPT_SCENES` in `conceptSceneParams.ts`, under a new
   `// Batch N (...)` comment naming the domain composition, using strings with real apostrophes
   in double quotes (`"Hess's Law..."`) — the file's established convention, not escaped
   single-quote strings.
4. Append the same concept IDs to `CAMPAIGN_FIXED_CONCEPTS` in
   `src/tests/bioVisualCoverageCampaign.test.ts` (grouped by batch, same domain-composition
   comment). This array drives `describe.each` tests asserting: `graphical: true` with a real
   asset, no Tier 1 curated binding (the fix is genuinely Tier 0, confirmed via
   `lookupConceptVisualBinding(id) === null` and `isRetiredVisualBinding(id) === false`), and at
   least one scene step with non-empty narration.
5. Validate before every commit, in this order: `npx tsc --noEmit` (must be 0 errors) → targeted
   vitest run (`bioVisualCoverageCampaign.test.ts`, `bioVisualGapFix.test.ts`,
   `visualGeneratorSplits.test.ts`, `dnaReplicationVisual.test.ts`,
   `photosynthesisVisualServingLedger.test.ts` — the five files with hardcoded counts/lists this
   campaign can invalidate) → full `npx vitest run` (the mathematics campaign's handover doc
   records a real incident of a targeted-only check missing a cross-cutting regression; don't
   repeat that here) → `npx tsx scripts/brain/seed-knowledge-assets.ts --draft --dry-run` (checks
   for duplicate seed-corpus identities; this campaign doesn't touch seed content, but running it
   costs nothing and has caught contamination before).
6. Commit, then **immediately** `git fetch origin main` and check for concurrent-session overlap
   before pushing — `main` receives very high concurrent push traffic from other sessions (a
   Physics "synthetic student runner" campaign has been active throughout). Merge (never rebase),
   re-run the validation sequence above after any merge, then push wrapped in the
   retry-with-exponential-backoff loop CLAUDE.md's git-operations section requires (2s/4s/8s/16s).
7. **Update this file** with a dated entry before or alongside that push: new headline numbers,
   which concepts were fixed and why each was classified the way it was, any defect found and
   fixed along the way.

### One stale-count landmine, now fully resolved — a pattern to watch for in other files

- `dnaReplicationVisual.test.ts`'s DNA-concepts regression test originally hardcoded a list of 4
  concepts expected to have NO figure (`bio.mol.nucleic-acid-structure`, `bio.mol.transcription`,
  `bio.mol.dna-damage-repair`, `bio.mol.chromatin-structure-genome-organization`). Batches 2, 7,
  and 11 fixed all four; the test was rewritten each time to narrow its list, and as of batch 11 it
  now asserts the LAST one is fixed too (`graphical: true`) rather than iterating an empty "still
  broken" array. If any OTHER test file in the repo hardcodes a similar "this concept has no
  figure" list for a Biology concept this campaign later fixes, apply the same pattern: narrow or
  flip the assertion in the SAME commit, with a comment naming which batch did it.
- `visualGeneratorSplits.test.ts` and `bioVisualGapFix.test.ts` both use
  `.length).toBeGreaterThanOrEqual(N)` rather than an exact count specifically so this campaign's
  growth doesn't require touching them — leave them as `>=` checks, don't "fix" them back to exact
  counts.

## Current status (2026-09-27, after batch 13 — CAMPAIGN COMPLETE)

**161 of 161 statically-flagged concepts fixed and verified** (`tsc` 0 errors, 604/604 targeted
tests passing, 735 files / 15,577 passing / 9 skipped in the full suite, 0 duplicate seed
identities — 10,650 items). 13 batches committed total; batch 12 confirmed landed on `main` as
`b65b1123`; batch 13 (the final batch) push is the very next action after this update. **No
concepts remain on the "not yet fixed" list.** `bio.plant.plant-respiration` remains the one
confirmed non-defect, deliberately left unauthored (already serves a real Tier 3 figure).

Batch 13 — THE FINAL BATCH (17 concepts, all of the remaining frontier in one batch since it was
already under the usual ~12-concept size): `bio.physio.exercise-physiology` — COMPARISON, aerobic
vs anaerobic training's different chronic adaptations; `bio.physio.homeostasis-thermoregulation`
— COMPARISON, heat-loss vs heat-gain responses; `bio.physio.integumentary-system` — PATHWAY,
wound healing's four ordered stages (haemostasis → inflammation → proliferation → remodelling);
`bio.physio.lymphatic-system-detail` — COMPARISON, the system's explicit dual role (fluid balance
vs immune surveillance); `bio.physio.muscle-physiology-energetics` — PATHWAY, the three ATP
sources each dominant over a different timescale (creatine phosphate → anaerobic glycolysis →
oxidative phosphorylation); `bio.plant.mycorrhizae-plant-symbioses` — PATHWAY, the
rhizobium-legume nitrogen-fixation mechanism traced step by step (infection → nodule formation →
nitrogenase fixation → leghaemoglobin oxygen protection); `bio.plant.phytochrome-photoperiodic-
flowering` — PATHWAY, night-length detection (leaves) → florigen production → vascular transport
→ flowering response (shoot apex); `bio.plant.plant-biotechnology-applications` — PATHWAY,
Agrobacterium-mediated transformation traced step by step (natural infection → gene replacement →
T-DNA delivery); `bio.plant.plant-defense-mechanisms` — COMPARISON, structural vs chemical
defences; `bio.plant.plant-stress-physiology` — HUB, ABA as the central integrating hormone
coordinating three distinct stress responses (stomatal closure, osmotic adjustment, antioxidant
defence); `bio.plant.plant-tissue-systems` — STRUCTURE, the plant body's dermal/ground/vascular
tissue systems; `bio.plant.secondary-growth-anatomy` — COMPARISON, wood vs bark as two composite
outcomes of secondary growth; `bio.plant.seed-germination-dormancy` — STRUCTURE, seed
coat/embryo/endosperm; `bio.repro.animal-reproductive-strategies` — COMPARISON (3 groups),
oviparity/viviparity/ovoviviparity classified on both location-of-development and nutrient-source
dimensions; `bio.repro.hormonal-regulation-reproduction-detail` — PATHWAY, cyclic: true, the HPG
axis's regulatory feedback loop (hypothalamus → anterior pituitary → gonads → feedback);
`bio.sys.evolutionary-systems-biology` — COMPARISON, robustness vs evolvability as related but
distinct network properties; `bio.sys.quantitative-systems-modeling` — PATHWAY, the modelling
workflow (ODE model construction → parameter estimation → sensitivity analysis)) validated clean:
`tsc --noEmit` 0 errors, 604/604 targeted tests passing (up from 515), 735 files / 15,577/15,586
full suite passing (9 pre-existing skips), dry-run seed script "Identity check passed: 10650
items, 10650 distinct identities, 0 duplicates".

**One real, non-landmine test conflict found and fixed in this batch**: giving
`bio.physio.homeostasis-thermoregulation` a Tier 0 override broke
`visualFigureBreadth.test.ts`'s `"generation reaches the learner with the conditional framing
intact..."` test, which called `resolveVisualForTurn` for that exact concept expecting Tier 3
generation to be reached (Tier 0 now wins unconditionally and short-circuits before generation is
attempted — this is the campaign's own intended effect, not a regression). Unlike the
`dnaReplicationVisual.test.ts` pattern (narrow/flip a hardcoded list), this test's actual purpose
was exercising the GENERATION+CRITIC+ADMISSION pipeline itself, orthogonal to which concept it
runs against — fixed by retargeting the test to `bio.plant.plant-respiration` (confirmed to have
no Tier 0/1 binding) with a freshly-anchored mock scene using that concept's own KG vocabulary
(aerobic vs anaerobic respiration) instead of the original thermoregulation content, since the
generation pipeline's anchor check compares generated prose against the RESOLVED concept's own KG
text — reusing the original thermoregulation content against a different concept would have
failed anchoring. A first attempt at the retargeted content also tripped
`processFlowStepSchema`'s 60-character-per-step-title zod limit (unrelated to the concept swap);
shortened the step titles to fix. If a future session sees a similar failure when giving a NEWLY
Tier-0'd concept its own scene, check whether any OTHER test file calls `resolveVisualForTurn`
directly for that exact concept id expecting a Tier 3/generation outcome — Tier 0 always wins by
design, so such a test's premise no longer holds and must be retargeted to a still-unbound
concept, not "fixed" by touching the resolver's tier priority.

## Concepts fixed, for reference (all 161 — see `CAMPAIGN_FIXED_CONCEPTS` in
## `bioVisualCoverageCampaign.test.ts` for the authoritative, machine-checked list)

Batches 1-12's full per-batch history (which concept, which generator shape, why) is preserved
below this section, unedited. Batch 13's own list is immediately above. Nothing further is
"remaining" — this campaign's own stated goal (close the "no diagram ever, even on explicit
request" gap across the 161 statically-flagged Biology concepts) is met. Any NEW Biology visual
defect found in the future (a fresh production QA sweep, a new KG concept added, a regression) is
separate work — read "What's left after this campaign" below before starting it.

Batch 12 (12 concepts: `bio.neuro.cognitive-neuroscience-consciousness` — HUB, three distinct
lines of evidence (top-down vs bottom-up control, neural correlates of consciousness, split-brain
hemispheric dissociation); `bio.neuro.learning-memory-neurobiology` — COMPARISON, declarative
(hippocampus-dependent) vs procedural (basal-ganglia/cerebellum-dependent) memory systems;
`bio.neuro.neural-circuits-computation` — HUB, four circuit motifs (feedforward inhibition,
lateral inhibition, rate vs temporal coding, central pattern generators);
`bio.neuro.neurodegenerative-disease` — COMPARISON, amyloid-beta plaques (extracellular) vs tau
tangles (intracellular) — the EB entry explicitly warns these must not be conflated;
`bio.neuro.neurodevelopment` — PATHWAY, neurulation → neuronal migration → synaptogenesis →
activity-dependent pruning; `bio.neuro.neurotransmitter-systems` — COMPARISON, ionotropic
(fast, direct channel) vs metabotropic (slow, second-messenger) receptors;
`bio.neuro.sensory-transduction` — HUB, four receptor categories (photo/mechano/chemo/thermo)
sharing one transduction logic; `bio.neuro.sleep-circadian-biology` — PATHWAY, cyclic: true, the
molecular clock's negative-feedback loop (CLOCK/BMAL1 → PER/CRY accumulation → inhibition →
decline → repeat); `bio.neuro.vision-visual-system` — PATHWAY, cornea/lens → retina →
bipolar/ganglion cells → visual cortex; `bio.physio.blood-physiology-hemostasis` — PATHWAY,
vascular spasm → platelet plug → coagulation cascade, the EB entry's own explicit three-stage
sequence; `bio.physio.comparative-animal-physiology` — HUB, four gas-exchange strategies (gills,
tracheal systems, book lungs, alveolar lungs) all solving the same surface-area-to-volume
constraint; `bio.physio.endocrine-disorders-feedback` — PATHWAY, cyclic: true, oxytocin's
positive-feedback loop during childbirth (cervix stretch → oxytocin release → intensified
contractions → more stretch), the EB entry's explicit exception to negative feedback) validated
clean: `tsc --noEmit` 0 errors, 515/515 targeted tests passing (up from 479), 15,517/15,526 full
suite passing (9 pre-existing skips), dry-run seed script "Identity check passed: 10602 items,
10602 distinct identities, 0 duplicates". No stale-count landmine found for any of these 12
concept IDs elsewhere in the test suite (grepped before starting).

Batch 10 (12 concepts — see git log commit `53722909`/`b681332d` for the full list: reptile/bird
diversity, coevolution, convergent evolution, macroevolution/extinction, phylogeography,
scientific method, unifying themes, conservation genetics, genetic testing/counselling,
quantitative genetics/heritability, cancer immunotherapy, cytokine signalling) validated clean and
pushed.

Batch 11 (12 concepts: `bio.immuno.t-cell-development-tolerance` — PATHWAY, positive selection →
negative selection → peripheral tolerance backup; `bio.micro.antimicrobial-resistance` — HUB,
three resistance mechanisms (efflux pumps, enzymatic inactivation, target-site modification);
`bio.micro.archaea-extremophiles` — HUB, the four extremophile categories matched to their
specific stressor; `bio.micro.human-microbiome-detail` — HUB, the three distinct
microbiome-host interaction mechanisms; `bio.micro.microbial-metabolism-diversity` — HUB, the
three metabolic strategies behind extremophile survival; `bio.mol.alternative-splicing-rna-
diversity` — HUB, the four splicing mechanisms that create protein diversity from one gene;
`bio.mol.chromatin-structure-genome-organization` — PATHWAY, nucleosome → higher-order folding →
TADs (this was also one of `dnaReplicationVisual.test.ts`'s originally-tracked "still broken"
concepts — that test was updated in the same commit to assert the fix instead, closing out that
file's entire original 4-concept list); `bio.mol.metabolic-regulation-integration` — COMPARISON,
insulin (fed state) vs glucagon (fasted state) reciprocal control; `bio.mol.protein-quality-
control-autophagy` — HUB, the four distinct protein-degradation routes; `bio.neuro.audition-
vestibular-system` — PATHWAY, outer ear → middle ear → inner ear/cochlea sound transmission;
`bio.neuro.autonomic-stress-physiology` — PATHWAY, the HPA axis's hypothalamus → pituitary →
adrenal cortisol cascade; `bio.neuro.brain-regional-organization` — STRUCTURE, the cerebral
cortex's four lobes) validated clean: `tsc --noEmit` 0 errors, 479/479 targeted tests passing,
15,392/15,401 full-suite tests passing (9 pre-existing skips, unrelated to this campaign), dry-run
seed script 0 duplicate identities (10,462 items).

### Remaining frontier — NONE. Campaign complete (161/161)

`bio.plant.plant-respiration` is the one **confirmed non-defect**, deliberately excluded from
`CAMPAIGN_FIXED_CONCEPTS` because it already serves a real Tier 3 figure — do not "fix" it.

If a future session needs to verify this is still true (a KG edit, a new concept added, a
regression in Tier 0/1/3 resolution), regenerate rather than trust a number here: diff
`CAMPAIGN_FIXED_CONCEPTS` in `bioVisualCoverageCampaign.test.ts` against a fresh static audit
of all current KG concepts (the original audit script was a one-off in the session scratchpad,
not committed to the repo; re-derive it from `resolveVisual`/Tier 0/1 lookups against all KG
concepts). If that turns up new gaps, continue in ~12-concept batches, same methodology,
same validation sequence, same commit/merge/push discipline, until this list is empty.

## What's left after this campaign (do not start these without finishing this one first)

These are separate, already-identified gaps from the same "is it ready for end user" diagnostic
that this campaign does not address:

- **Empty-tutor-response bug**: one turn in earlier QA on `bio.immuno.immune-disorders` returned a
  completely empty response body to an explicit visual request. Not yet reproduced or root-caused.
- **Mastery end-to-end**: no session in this entire Biology readiness effort (across multiple
  campaigns predating this one, see `CLAUDE.md`'s Biology section) has yet driven one real Biology
  lesson all the way to a genuine, DB-confirmed `MASTERED` status via a disposable QA account
  answering correctly throughout. The closest prior attempt landed at `REVISION`/25% mastery.
- **Final report**: once visual coverage is complete AND the two items above are resolved (or
  explicitly deferred with owner sign-off), CLAUDE.md's binding reporting preference requires a
  single fenced-code-block report covering git info and a final ready/not-ready verdict.

## Client-side render verification (2026-09-27) — figure renders; 3 render defects found, NOT fixed

The one step API calls could not cover — does the browser actually DRAW the served `sceneSpec` —
was checked in real headless Chromium against production (`my-tutor-flame.vercel.app`, owner
account, `/learn?subject=biology` → prelude → "More options" → "Give me a diagram", concept
`bio.found.what-is-biology`, desktop 1440px and mobile 390px). Screenshots stayed in that
session's scratchpad (not committed).

**PASS — a real figure renders.** `POST /api/learn/chat` returned 200 with a `sceneSpec`
(`cell-hub-bio.found.what-is-biology`, 7 steps); the browser mounted a WebGL canvas (526×300)
and drew the orange "Biology" hub plus all six blue branch nodes (Botany, Zoology,
Microbiology, Physiology, Ecology, Genetics) with legible labels, matching the payload exactly.
The stepper ("Stage 1 of 7", Next/Previous, Show all, Play the stages) works; the figure opens
on stage 1 (hub only) by design. No page errors, no failed asset loads (only navigation-abort
`ERR_ABORTED` prefetches) — the prior session's `ERR_TOO_MANY_RETRIES` was specific to that
sandbox. The prior session's gap in the browser was the sandbox's Chromium NSS store being
empty; the fix there was importing the proxy CAs from `/root/.ccr/ca-bundle.crt` into
`/root/.pki/nssdb` with `certutil -A -t "C,,"` (never disable TLS verification).

**Precondition found:** `/learn?subject=<slug>` only honours the param when the profile is
ENROLLED in that subject (`src/app/learn/page.tsx:82-86`); otherwise it silently falls back to
`profile.subjects[0]`. The owner account was not enrolled in biology, so the page opened
Chemistry. Enrolled via the app's own additive `POST /api/subjects/enroll` (new
`profile_subjects` + `learning_paths` rows only; nothing else touched).

**Defects (root-caused, NOT fixed — cross-subject renderer change, owner decision):**
1. **Connector lines are invisible.** `SceneSpecRenderer.tsx` `case 'path'` draws only a
   0.06-radius marker at each point, never a segment between them. `cellHub.pure.ts:48` emits
   each spoke as a 2-point path from the hub centre to the spoke centre, so both markers sit
   inside the spheres and the spoke disappears completely. Same pattern in
   `cellComparison.pure.ts:54` (header→item lines, 92 concepts), `cellStructure.pure.ts:60`
   (11), `cellPathway.pure.ts:119` (cycle-return arrow) — code-derived, only the hub family was
   seen in the browser. The tutor's prose ("six curved paths") describes lines the learner
   cannot see.
2. **Misleading legend.** `explainer.ts` `deriveLegend` keeps one row per COLOUR, labelled by
   the first object of that colour: the six blue branches are all captioned "Botany", and the
   invisible line gets its raw id, "Spoke line 0".
3. **Run-on "What's happening?" panel.** `derivePanels` joins step narrations with a bare
   space: "Biology Botany: the study of plants Zoology: the study of animals …".

### Update (2026-09-27, later) — all three render defects FIXED and verified on production

Fixed in `622268f` (renderer + legend + panel), with two follow-ups found by the same
browser pass: `b4def2a` (content + colour) and the visual-contract commit below. Verified in
real headless Chromium against production (deployment `94211d5`, then `1d34991`), owner
account, `bio.found.what-is-biology`, a FRESH "Give me a diagram" request (`/api/learn/chat`
200, new `sceneSpec`), desktop 1440px and mobile 390px, 0 page errors:

1. **Connectors drawn.** `SceneSpecRenderer` now joins each consecutive pair of a `path`'s
   points with the existing `BondLine` (markers kept as round joints; `pathSegments()` in
   `sceneSpec.ts`). All six hub spokes visible on production. Because `path` is shared, the
   physics/chemistry/maths curves were checked through the dev-only `/dev/physics-pilot`
   harness before and after: projectile parabola, pendulum arc, circular-motion circle,
   gravitation orbit, transverse wave, interference, torque arc, electric-dipole arc,
   electron shells, kinematics and calculus curves — all now continuous lines (were loose
   dots), rings closed, arcs open. Pinned in `figureRenderDefects.test.ts`.
2. **Legend truthful.** Production legend now reads "Biology" / "Botany, Zoology,
   Microbiology, Physiology, Ecology, Genetics". `deriveLegend` names every captioned object
   of a colour (with "+N more" past 64 chars), uses ids only when `nameFromId` says they
   read as names, and drops rows whose only evidence is a numbered handle. Measured across
   all 248 deterministic scenes before/after: every id-handle leak removed ("Spoke line 0",
   "Group 0 line 0", "Stage 1 arrow", "Critical 0", "E0", …); physics names preserved
   ("P vector", "Resistor", "Male"/"Female", "Object"/"Image").
3. **Panel separated.** "What's happening?" is one finished sentence per step
   (`white-space: pre-line`); verified on production.

**Found by the same pass and fixed:**
- `b4def2a` — "Whittaker's Five Kingdoms" drew FOUR kingdoms (Animalia missing though the
  KG and EB list five); Animalia added from the EB Core Understanding. The comparison
  generator had 4 group colours, so 9 Biology comparisons with 5–6 groups painted unrelated
  groups the same colour; now 6 colours (≤4-group figures byte-identical).
- Visual contract (what the tutor is TOLD about the figure) — it described the six straight
  spokes as "6 plotted curves" (the tutor then said "six curved arrows") and said "built in
  6 stages" for the 7-stage figure, never passing stage 7 (the count was taken after a
  6-stage cap). Straight paths are now "straight lines"; the cap is 12 (covers all 7
  Biology figures with 7–12 stages); a truncated list reports the real total.
  `visualContractFigureTruth.test.ts`.

**`/learn?subject=` fallback FIXED (`1d34991`).** `resolveLearnSubject()` + the
`SubjectNotEnrolled` screen: an unenrolled (or removed — `isActive=false`) subject now
shows "You're not enrolled in Biology yet" with Add (the Library's own additive enroll
endpoint), "<current subject> — Continue Learning", and Go to Library; an unknown/hidden
slug says "This subject isn't available yet". Never enrolls on a GET. Verified on
production with a disposable account (onboarded with Chemistry): prompt shown, no
Chemistry lesson; unknown slug message; Add → 200 → Biology subject introduction; account
deleted, re-login blocked.

**Still open from this pass (not fixed):**
- Six-group comparison figures (e.g. `bio.repro.asexual-reproduction`) are cramped at
  lesson width: item labels crowd each other. Pre-existing layout; colours now distinct.
- `cellPathway` narrations omit the stage name ("the cell grows…", not "G1: the cell
  grows…"), so a pathway's "What's happening?" lines don't say which stage they describe.
- Legends for label-less physics objects still fall back to palette role names ("Resulting
  / outgoing quantity") — pre-existing, unchanged.

## Mastery reachability, batch 13 — live, 2026-09-27

**Question:** can a learner who answers correctly reach VERIFIED mastery (1 verified CHECK +
2 verified PRACTICE, `masteryGate.ts`) on the 17 batch-13 concepts? The earlier harness
could not say: it matched quiz stems with hand-written regexes and guessed option 0 on
anything else.

**Harness** (`scripts/qa/biologyMasteryReachability.ts` + `biologyAnswerPicker.ts`,
pinned by `src/tests/qaBiologyAnswerPicker.test.ts`). Answers come only from the concept's
own canonical sources (seed probes, seed explanations, EB Learning Objective / Core
Understanding / Mental Models); `correctIndex` is never read (the route strips it).
Measured over all 597 Biology seed probes, options shuffled: 99.5% on an authored probe;
72.9% on a held-out question (leave-one-out) vs a 35.0% random baseline. Prose questions
with lettered options are answered like an MCQ; open questions by quoting the taught
sentence that best matches.

Two harness defects were found and fixed before any result was trusted:
1. Nudging "can you quiz me?" made the tutor write its own quiz during GUIDE — an
   ungradeable (model-invented key) question whose wrong answer still regresses the
   ladder. The harness now only acknowledges; the lesson's gate decides when to ask.
2. Three lessons driven CONCURRENTLY on one account overwrote each other's lesson state
   (one session taught another concept's figure and closed "<other concept> is on
   pause"; a CHECK counter fell 1 → 0) — the API harness sends no `tabId`. Run 1's 4/17
   is therefore void. Run 2 uses one disposable account per worker, concepts sequential.

**Result (run 2, disposable accounts, production):** **8/17 VERIFIED** (DB: 8 `COMPLETED`, 9 `REVISION` — matches the API exactly). Every NOT-verified lesson answered all three authored probes correctly.

| concept | verified | turns | verified CHECK/PRACTICE | 3 authored probes: attached at → graded at |
|---|---|---|---|---|
| `bio.physio.exercise-physiology` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.physio.homeostasis-thermoregulation` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.physio.integumentary-system` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.physio.lymphatic-system-detail` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → DEMONSTRATE/CHECK/PRACTICE |
| `bio.physio.muscle-physiology-energetics` | YES | 9 | 1/2 | CHECK/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.plant.mycorrhizae-plant-symbioses` | YES | 7 | 1/2 | GUIDE/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.plant.phytochrome-photoperiodic-flowering` | YES | 9 | 1/2 | CHECK/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.plant.plant-biotechnology-applications` | no | 18 | 1/1 | GUIDE/GUIDE/CHECK → DEMONSTRATE/CHECK/PRACTICE |
| `bio.plant.plant-defense-mechanisms` | YES | 9 | 1/2 | CHECK/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.plant.plant-stress-physiology` | YES | 7 | 1/2 | GUIDE/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.plant.plant-tissue-systems` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.plant.secondary-growth-anatomy` | YES | 9 | 1/2 | CHECK/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.plant.seed-germination-dormancy` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.repro.animal-reproductive-strategies` | YES | 10 | 1/2 | GUIDE/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |
| `bio.repro.hormonal-regulation-reproduction-detail` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.sys.evolutionary-systems-biology` | no | 18 | 1/1 | GUIDE/CHECK/CHECK → GUIDE/CHECK/PRACTICE |
| `bio.sys.quantitative-systems-modeling` | YES | 9 | 1/2 | GUIDE/CHECK/PRACTICE → CHECK/PRACTICE/PRACTICE |

**Root cause of every NOT-verified lesson — a product defect (NOT fixed; owner decision).**
The learner answered ALL THREE authored probes correctly in every lesson. What decides the
outcome is the phase the FIRST probe is GRADED in:
- 9/9 NOT-verified: the first authored probe was graded at GUIDE (7) or DEMONSTRATE after a
  ladder regression (2). A correct answer there only advances the ladder
  (`conversationState.ts` fold, `case 'GUIDE'`) and banks no credit — and the probe is
  spent. With exactly three authored probes per Biology concept (the bare asset contract),
  two remain for three required credits: verified mastery is unreachable however well the
  learner answers, and the lesson pauses at turn 18 ("…is on pause — you haven't mastered
  it yet").
- 8/8 VERIFIED: all three probes were graded at CHECK/PRACTICE. In 4 of them the first probe
  was ATTACHED at GUIDE too, but the attaching turn itself advanced the ladder to CHECK
  before the answer arrived, so it counted.
It is timing, not content: integumentary and homeostasis were verified in 9 turns in run 1
and not in run 2.

The code already states this law for the phases below GUIDE: `mayAttachProbeBelowGuide`
(masteryReachability.ts) refuses to spend a probe at OBSERVE/DEMONSTRATE unless three remain
afterwards, "because at a pool of exactly three, spending one below the gates makes mastery
unreachable". GUIDE is outside it on purpose — A2 (`a2LadderGateReachability.test.ts`) opened
authored probes at GUIDE so a lesson could not stall there on ungradeable model questions —
but an authored probe GRADED at GUIDE earns the same zero credit.

Fix options for the owner (none implemented):
- **(a) Surplus rule at GUIDE** — attach an authored probe at GUIDE only while ≥3 remain
  afterwards. Closes the defect for bare-contract concepts in every subject (physics/
  chemistry, ≥5 probes, unchanged), but also removes the 4 successful GUIDE-attach paths
  above, so those lessons must reach CHECK through other turns (they did in the 4 verified
  lessons with no GUIDE attach). Re-creating A2's GUIDE stall is the risk to measure.
- **(b) A fourth authored probe per Biology concept** (from each EB entry, as the earlier
  depth campaigns did), so a GUIDE-graded spend still leaves three. No logic change; 199
  concepts of content work.
- **(c) Don't mark an authored probe spent when it is graded at GUIDE** (re-askable later at
  CHECK, options rotated, as a missed probe already is). Keeps A2's ladder benefit and the
  pool; the learner meets the same question twice.

**Also observed (not fixed):** on a model-invented quiz the learner answered wrongly, the
server graded it wrong (phase regressed GUIDE → DEMONSTRATE) but the reply said "Great,
you've spotted the hypertrophy adaptation" — `wrongAnswerCorrection.ts` deliberately stays
silent on model-invented keys, and nothing stops the model praising a wrong answer.

## FINAL VERDICT (2026-09-27): Is Biology fully production-ready? **NO.** — SUPERSEDED 2026-09-28, see the update below

Everything a learner SEES and the content behind it is ready. The one outcome that makes
Biology a finished course is not: **a learner who answers every question correctly reaches
verified mastery only when the timing is favourable — 8 of 17 batch-13 concepts in the live
run.** That is a product defect in the mastery gate, with three fix options awaiting an owner
decision (section "Mastery reachability, batch 13" above).

**Ready (measured on production, deployment `aba1911`):**
- Content: asset contract 199/199 authored, 199/199 at contract, 0 short, 0 never-quizzable
  (`scripts/assets/contract-audit.ts --subject biology`); seed corpus 10,838 items, 0
  duplicate identities (`seed-knowledge-assets.ts --draft --dry-run`).
- Figures: `scripts/qa/biologyFinalRuntimeQa.ts` — one concept per figure family (hub,
  5-group comparison, 6-group comparison, cyclic pathway, 12-stage pathway, structure) plus
  the two with a defect history: 8/8 served a figure, 8/8 THEIR OWN concept's figure, 0 empty
  replies, 0 claims of a figure that was not attached, 0 "curved" descriptions of straight
  connectors; ~9–13 s per diagram turn. `bio.immuno.immune-disorders` (previously an empty
  turn) and `bio.plant.photosynthesis` (previously no figure) both served correctly in two
  separate runs. Browser-verified render: connectors, legend, panel (desktop + mobile).
- Five-kingdom figure complete (Animalia), distinct group colours for 5–6 group figures,
  tutor told the truth about the figure (straight lines, every stage).
- `/learn?subject=` for an unenrolled subject prompts instead of opening another subject.
- Tone: a repeated "Give me a diagram" no longer triggers the frustration script
  (`aba1911`): 4/8 → 0/8 apology openings, 0 `recoveryKey:"frustrated"` in the logs.
- Honesty: across 17 lessons the API mastery verdict and `topic_progress` agreed exactly
  (8 COMPLETED / 9 REVISION); unmastered lessons close as "on pause — you haven't mastered it
  yet", never as mastered.

**Not ready — caveats, each named:**
1. **BLOCKER — mastery reachability (owner decision).** Authored probe graded at GUIDE banks
   no credit and is spent; with exactly three authored probes per Biology concept, verified
   mastery becomes unreachable for a perfect learner in that session (9/17 live). Options:
   (a) surplus rule at GUIDE, (b) a fourth EB-grounded probe per concept, (c) don't spend a
   probe graded at GUIDE. Not changed: it is teaching-decision logic under the G1/G2 rule.
2. Praise for a wrong answer on a model-invented quiz ("Great, you've spotted the
   hypertrophy adaptation" after a wrong answer the server graded wrong).
   `wrongAnswerCorrection.ts` deliberately stays silent on model-invented keys, and nothing
   stops the model praising. Not changed (grading/verdict design).
3. Six-group comparison figures are cramped at lesson width (labels crowd).
4. Pathway "What's happening?" lines don't name their stage (`cellPathway` narrations).
5. `topic_progress.masteryPct` reads 65 for COMPLETED and REVISION alike in these runs —
   status is right; the percentage looks like a coarse display value (not investigated).
6. After Add-subject there is a 5–10 s empty lesson frame before the subject introduction.
7. Diagram turns take ~9–13 s end to end.
8. Only batch 13 (17 concepts) was mastery-driven live; the other 182 Biology concepts
   share the same three-probe contract and the same gate, so caveat 1 applies to them too.

## VERDICT UPDATE (2026-09-28): blocker fixed — Biology is production-ready, with the named caveats

The owner chose option **(c)**. Commit `5639ee4` (`recordMcqOutcome`'s `gradedWithoutCredit`):
an authored probe answered CORRECTLY while the lesson is at OBSERVE / DEMONSTRATE / GUIDE —
where a correct answer banks no mastery credit — is no longer lost; it gets the same single
re-ask a missed probe already gets (fresh probes first, at most once). Tests:
`probeGradedWithoutCreditReaskable.test.ts`; tsc clean; full suite 743 files, 15,696 passed.

**Live re-test on production (deployment `5639ee4`, same harness, same 17 batch-13 concepts,
three disposable accounts, all deleted afterwards): 17/17 VERIFIED** (was 8/17). DB agrees:
17/17 `topic_progress` rows `COMPLETED`. Several lessons now serve 4–5 authored-probe turns
instead of 3 — the GUIDE-graded probe coming back at CHECK/PRACTICE, as designed.

**Verdict: YES — Biology is production-ready**, with caveats 2–8 from the section above still
open (none blocks a learner from being taught, shown correct figures, or reaching verified
mastery):
- praise for a wrong answer on a model-invented quiz;
- cramped six-group comparison figures; pathway panel lines don't name their stage;
- `masteryPct` shows 65 for COMPLETED and REVISION alike;
- 5–10 s blank frame after Add-subject; ~9–13 s diagram turns;
- only batch 13 was mastery-driven live — the other 182 concepts share the same contract and
  gate, so the fix applies to them, but they have not each been driven end to end.

## Caveats closed (2026-09-28) — the six named above

Owner instruction: "Fix all 6". Each item below: what was measured, what changed, how it was
verified. Commits on `main`: `f9831f9`, `14bd350`, `e04fccc`, `bd75f6a` (merged as `253071a`); the case-only-probe fix found by item 5 is `70fac07` (merged as `0fc94de`).

1. **Praise for a wrong answer (`14bd350`).** The unbacked-claim stripper already runs when a
   grade comes from a model-invented key, but its pattern list missed praise of the form
   "Great, you've spotted …", "well spotted", "good catch". Added (opening sentence only, as
   before); `stateCorrectionForWrongAnswer` now strips the same claim before "Not quite — the
   answer is: …". `rubricScore.ts` kept in lockstep. `praiseForWrongAnswer.test.ts`.
2. **Figures (`e04fccc`).**
   - Five/six-group comparisons: two rows of ≤3 columns 6.5 apart, camera 20. MEASURED in
     Chromium before: labels overlapped at 1200px, outer columns clipped at 390px; after:
     neither, at both widths. ≤4-group figures byte-identical (83 of 92).
   - Pathway steps now lead with their stage name ("Hypothalamus: secretes GnRH …"); branch
     steps name both branches and no longer run together.
   - The panel's `slice(0, 600)` cut six figures mid-sentence (DNA replication, meiosis,
     viscosity, levels of organisation, evidence for evolution, surface tension); it now cuts
     at whole lines within 1000 chars (longest narration 925).
   - Full 248-scene before/after diff: 58 scenes changed, all Biology; no other subject's
     geometry changed. `comparisonGridAndStageNames.test.ts`.
   - Production (deployment `253071a`, disposable account, real diagram request): asexual
     reproduction served two rows of three (headers y 3.54 / -1.78, x -6.5 / 0 / 6.5, camera
     20); hormonal regulation's steps read "Hypothalamus: …", "Anterior pituitary: …",
     "Gonads: …".
3. **`masteryPct` (`f9831f9`).** Now the verified share of the gate's bar (0/33/67/100), from
   the gate's own counters, written when a concept is mastered or sent to review. A verified
   lesson whose last chat answer was wrong no longer stays IN_PROGRESS. Every
   `topic_progress` consumer already treats COMPLETED and MASTERED alike. Production: the
   first verified lesson of the 182-concept run below wrote `MASTERED`, 100 (was `COMPLETED`,
   65 for every verified batch-13 lesson).
4. **Blank frame after Add subject (`bd75f6a`).** MEASURED on production before the fix
   (disposable account, 500 ms frames): "Enrolling…" 0–2.6 s, then "＋ Add subject: Biology"
   AGAIN 3.1–4.6 s (a `finally` cleared the busy state while `router.refresh()` was still
   running), then 13 blank frames 5.2–11.2 s (the lesson overlays deliberately render nothing
   until the entry gate can answer), prelude at 11.7 s. Fixed: the refresh runs in a
   transition so the button stays busy; a neutral "Loading your lesson…" status line fills the
   gate gap. Same probe after deploy `253071a`: "Enrolling…" 0–4.1 s, "Loading your lesson…"
   4.7–7.3 s, prelude 7.8 s — **0 blank frames** (was 13). Account deleted, re-login blocked.
   **Diagram-turn latency — root cause found, NOT changed (owner decision).** Over 5,556
   production turns (4 days): a diagram turn is NOT slower than any other turn (1 LLM call:
   p50 10.8 s with a figure, 10.9 s without). Turns with ZERO LLM calls still take 6–8 s p50,
   so most of every turn is server overhead, not the model. The database executes in ~1 ms
   per query (pg_stat_statements mean 1.1 ms), but the functions run in Vercel `sin1`
   (Singapore, `vercel.json`, chosen when the deployment doc assumed Neon) while the database
   is Supabase `ap-south-1` (Mumbai), reached through Supavisor. Measured from outside:
   `/api/health` (one `SELECT 1`) 1.05–1.1 s vs `/api/auth/csrf` (no DB) 0.40–0.45 s — one
   query costs ~650 ms end to end. Recommended: `"regions": ["bom1"]` in `vercel.json`
   (functions next to the database). Not applied: it moves every production function and is
   the owner's call.
5. **Live mastery test of the other 182 Biology concepts** (production, disposable accounts,
   `biologyMasteryReachability.ts`, DB cross-check, accounts deleted afterwards).
   - **Run 1** (deployment `253071a`, 8 workers): 72 VERIFIED, 2 NOT-VERIFIED, 9 ERROR, then
     STOPPED by me when production `/api/health` went 503 (see incident below). DB agreed
     exactly: 72 `MASTERED`/100, 2 `REVISION`/67 (Fix 3's verified share: 2 of 3 credits).
   - The two NOT-VERIFIED, root-caused from transcript + `evidence_events` + `messages`:
     - `bio.found.binomial-nomenclature` — **product defect, FIXED (`70fac07`)**. Its third
       authored probe asks which of Homo sapiens / homo sapiens / Homo Sapiens / HOMO SAPIENS
       is written correctly. `probeToMcq` compared options with case folded and refused it as
       duplicates, so it was never served; the PRACTICE turns that should have asked it were
       content-free fallback text and the lesson paused 1 credit short. The grader would have
       refused every tap the same way. Now: case is kept when comparing authored options and,
       only where case-folding finds several matches, when resolving a tap. It is the only
       such probe (repo seed files and production `probe_assets`); a corpus guard fails on a
       new one. Re-run on `0fc94de`: VERIFIED in 7 turns, the case probe served and graded
       "That's right."
     - `bio.plant.plant-water-relations` — **test-harness artifact, not a product defect.** One
       harness `say()` reached the server TWICE (two identical USER rows 11 s apart; the
       harness saw only the second reply). The server graded the repeat against the next
       probe it had just served — correctly "Not quite" — which held the ladder at CHECK. The
       same class of duplicate can come from a real client retry: route.ts's own Typed Turn
       Contract I10 note says a retried request whose server side completed runs as a second
       full turn (observation only; the real fix needs a persisted idempotency key = schema
       migration, under the deferred primitives). Re-run: VERIFIED in 6 turns.
   - **Run 2** (deployment `0fc94de`, 3 workers, health watchdog): the 110 concepts not
     verified in run 1 (incl. the 2 above and the 9 errored). **110/110 VERIFIED**, 0 errors.
     DB: 110 `MASTERED`/100 (36/39/35 per account, matching the harness exactly).
   - **Result: 182/182 VERIFIED** (median 8 turns, p90 10, max 28). With batch 13's 17/17,
     **all 199 Biology concepts reach verified mastery on production**. All 11 disposable
     accounts deleted; re-login blocked; 0 `qa-bio-mastery-*` users left.

6. **Comparison colours in other subjects.** `buildCellComparisonScene` and its colour list
   have 92 consumers, all Biology; no physics, chemistry, mathematics, CS or English code
   imports them. The full-corpus diff above confirms no other subject's scene changed.

### Production incident during run 1 (2026-09-28 ~04:47–04:59 UTC) — mitigated, NOT fixed

Run 1 (8 workers) coincided with another session's deploy (`1aa7782`, 04:43) and that session's
own QA traffic. From ~04:57: 8 chat turns 503 `route_deadline`, one `/api/sessions` 500
`db_timeout`, and `/api/health` 503 (DB unreachable within 3 s). I stopped the run; health was
200 again within ~30 s. `pg_stat_activity` at the time: **15 backends `idle in transaction`
(oldest 683 s) + 1 aborted** — abandoned app transactions (`spine_events`, `student_progress`,
`asset_identity` INSERTs, bare `BEGIN`s) whose Vercel invocations (max 60 s) were long gone.
Through Supavisor each pins a pooled connection; `idle_in_transaction_session_timeout` is `0`
(disabled), so they hold it until the client connection drops. 7 more had accumulated again
~7 min after the next deploy. Pool starvation under load is the evident mechanism.

**Owner decisions recommended (not applied — production configuration):**
1. `ALTER DATABASE postgres SET idle_in_transaction_session_timeout = '60s';` (Prisma
   interactive transactions time out at 5 s by default and functions at 60 s, so no
   legitimate transaction idles that long). Reversible with `… RESET …`.
2. `vercel.json` `"regions": ["bom1"]` — functions next to the Mumbai database (see item 4).
3. Find why app transactions are abandoned (route deadline vs. in-flight transaction).
Load-testing rule learned: ≤3 concurrent QA workers, with a health watchdog.

## VERDICT UPDATE (2026-09-28, evening): all six caveats closed; 199/199 concepts verified live

Biology is production-ready. Every caveat named above is fixed and verified on production
except diagram-turn latency, whose root cause (function region ≠ database region) is found and
handed to the owner with the one-line change. New since the last verdict: the case-only probe
defect (fixed), the duplicate-request gap (documented, deferred primitive), and the
leaked-transaction pool starvation (mitigated, owner decision above).

## RENDER AUDIT (2026-10-08/09): every Biology figure rendered, inspected, repaired and re-rendered

Full report, per-concept record and harnesses: `docs/qa/biology-visual-audit/` (README.md is the report). Read it before touching
Biology figure layout. Headline (final merged build): **199 concepts, 199 rendered at 1280 px and 390 px, PASS 193 · FAIL 0 ·
REVIEW_REQUIRED 6**; 0 label overlaps, 0 labels outside the canvas, 0 horizontal scroll, 0 page errors, min caption contrast 4.6 : 1.
Baseline was FAIL 119 / REVIEW_REQUIRED 55 / PASS 25 (rule-derived) and semantic FAIL 24 / REVIEW_REQUIRED 13.

What the earlier campaigns could not see: they proved a figure *resolves* and carries the right words. Rendered, 71 concepts had a
sphere or caption cut off by the canvas, captions sat on spheres in the sphere colour (2.2–4.5 : 1), pathways showed no direction, and
seven `bio.eco` concepts were served the generic food-chain card.

Rules this audit adds (binding for Biology figure work):

1. **Biology-only.** Every layout rule in `cellComparison/cellHub/cellPathway/cellStructure.pure.ts` is gated by `isBiologyScene(conceptId)`
   and the figure-level framing/stage growth by `ExplainerFigure`'s `fitToCanvas` (on only for `subjectSlug === 'biology'`). Physics,
   Chemistry and Mathematics share these generators and the renderer, and their committed audits fingerprint byte-identical output.
   Switching the framing on for everyone changed 114 Physics / 19 Chemistry / 1 Mathematics canvas views. `biologyFigureFraming.test.ts`
   pins the gate.
2. **Caption height decides spacing, at the scale it is drawn at.** `cellComparison.pure.ts` estimates a caption's wrapped height from its
   length and column width (`CHARS_PER_UNIT`, `LINE_UNITS`) — a grid is pulled back to ~16–19 px/unit, a pair stays at the camera's own
   ~20–27. Re-measure with the render harness and `scripts` replay of `placeSceneLabels` if you change a constant; a caption the solver has
   to move > ~60 px is a defect (it lands in the neighbouring column).
3. **`cameraDistanceToContainFigure` is a fixed point**, because caption wrap narrows as the camera backs away; `stageHeightToFit` must use
   the renderer's exact framing (aspect rule ∨ viewport rule) or it validates a layout the learner never gets.
4. **More than nine `label` objects are held back by the complexity policy** (`maxLabels` 9, intermediate level). Keep item captions short and put
   the detail in the stage narration; `node` captions do not count.
5. Pathways of six or more stages alternate captions above/below the line.

Re-run: `node scripts/qa/biologyVisualRenderAudit.mjs <out> --file ids.txt --base http://localhost:3001 [--theme light]` (≤ 4 shards), then judge
the screenshots — the harness measures, it does not judge. Open items (6 REVIEW_REQUIRED, all content/depiction decisions): see the report.
Production browser validation was unavailable in this session.

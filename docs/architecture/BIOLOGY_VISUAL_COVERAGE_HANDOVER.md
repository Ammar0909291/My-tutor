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

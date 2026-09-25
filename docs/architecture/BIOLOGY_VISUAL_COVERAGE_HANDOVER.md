# Biology Visual Coverage Campaign — Handover

**Subject**: Biology visuals ONLY (`src/lib/teaching/visual/conceptSceneParams.ts` +
`src/tests/bioVisualCoverageCampaign.test.ts`). **Status: IN PROGRESS, not paused.** This file is
the complete pickup point for the next session/account — read it in full before touching Biology
visual code. Update this file on every commit this campaign makes (add a dated entry, refresh the
headline numbers) so a different Claude session can resume cold at any point.

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

### Two stale-count landmines already hit once each — check both on every batch

- `dnaReplicationVisual.test.ts`'s `'the other molecular-biology DNA concepts resolve exactly as
  before (no figure)'` test hardcodes a list of concepts still expected to have NO figure. If a
  batch fixes one of `bio.mol.nucleic-acid-structure` / `bio.mol.transcription` /
  `bio.mol.dna-damage-repair` / `bio.mol.chromatin-structure-genome-organization` (the original 4),
  narrow this test's list and add a comment naming which batch fixed it. As of batch 10, only
  `bio.mol.chromatin-structure-genome-organization` remains in that list — it is also still in
  this campaign's own remaining-42 list below, so whichever batch reaches it must update BOTH
  files in the same commit.
- `visualGeneratorSplits.test.ts` and `bioVisualGapFix.test.ts` both use
  `.length).toBeGreaterThanOrEqual(N)` rather than an exact count specifically so this campaign's
  growth doesn't require touching them — leave them as `>=` checks, don't "fix" them back to exact
  counts.

## Current status (2026-09-25, after batch 10)

**119 of 161 statically-flagged concepts fixed and verified** (`tsc` 0 errors, 443/443 targeted
tests passing, 15,356 passing / 9 skipped in the full suite, 0 duplicate seed identities). 10
batches committed and pushed to `main` individually so far.

Batch 10 (12 concepts: `bio.div.reptile-bird-diversity` — HUB, flight's three functional demands;
`bio.evo.coevolution-species-interactions` — COMPARISON, reciprocal coevolution vs parallel
adaptation to a shared environment; `bio.evo.convergent-evolution-homoplasy` — COMPARISON,
convergent vs parallel evolution as the two sources of homoplasy; `bio.evo.macroevolution-
extinction` — COMPARISON, phyletic gradualism vs punctuated equilibrium; `bio.evo.phylogeography-
biogeography` — COMPARISON, vicariance vs dispersal; `bio.found.scientific-method-in-biology` —
PATHWAY, observation → controlled experiment → statistical evaluation → replication/peer review;
`bio.found.unifying-themes-in-biology` — HUB, the four recurring themes; `bio.gen.conservation-
genetics` — HUB, the three reasons effective population size (Ne) is smaller than census size (N);
`bio.gen.genetic-testing-counseling` — COMPARISON, carrier screening vs prenatal diagnostic
testing; `bio.gen.quantitative-genetics-heritability` — COMPARISON, broad-sense (H²) vs
narrow-sense (h²) heritability; `bio.immuno.cancer-immunology-immunotherapy` — COMPARISON,
checkpoint inhibitors vs CAR-T cell therapy as mechanistically distinct approaches;
`bio.immuno.cytokines-immune-signaling` — HUB, interleukins/interferons/TNF as three distinct
cytokine classes) validated clean: `tsc --noEmit` 0 errors, 443/443 targeted tests passing,
15,356/15,365 full-suite tests passing (9 pre-existing skips, unrelated to this campaign), dry-run
seed script reported 0 duplicate identities. **Not yet committed as of this file's creation —
commit/merge/push for batch 10 is the very next action.**

### Remaining frontier — 42 concept IDs not yet fixed

One of these (`bio.plant.plant-respiration`) is a **confirmed non-defect**, deliberately excluded
from `CAMPAIGN_FIXED_CONCEPTS` because it already serves a real Tier 3 figure — do not "fix" it,
just don't count it against progress. The other 41 are genuinely unclassified/unauthored:

```
bio.plant.plant-respiration            (confirmed already working — do NOT author, leave as-is)
bio.immuno.t-cell-development-tolerance
bio.micro.antimicrobial-resistance
bio.micro.archaea-extremophiles
bio.micro.human-microbiome-detail
bio.micro.microbial-metabolism-diversity
bio.mol.alternative-splicing-rna-diversity
bio.mol.chromatin-structure-genome-organization   (also update dnaReplicationVisual.test.ts when fixed)
bio.mol.metabolic-regulation-integration
bio.mol.protein-quality-control-autophagy
bio.neuro.audition-vestibular-system
bio.neuro.autonomic-stress-physiology
bio.neuro.brain-regional-organization
bio.neuro.cognitive-neuroscience-consciousness
bio.neuro.learning-memory-neurobiology
bio.neuro.neural-circuits-computation
bio.neuro.neurodegenerative-disease
bio.neuro.neurodevelopment
bio.neuro.neurotransmitter-systems
bio.neuro.sensory-transduction
bio.neuro.sleep-circadian-biology
bio.neuro.vision-visual-system
bio.physio.blood-physiology-hemostasis
bio.physio.comparative-animal-physiology
bio.physio.endocrine-disorders-feedback
bio.physio.exercise-physiology
bio.physio.homeostasis-thermoregulation
bio.physio.integumentary-system
bio.physio.lymphatic-system-detail
bio.physio.muscle-physiology-energetics
bio.plant.mycorrhizae-plant-symbioses
bio.plant.phytochrome-photoperiodic-flowering
bio.plant.plant-biotechnology-applications
bio.plant.plant-defense-mechanisms
bio.plant.plant-stress-physiology
bio.plant.plant-tissue-systems
bio.plant.secondary-growth-anatomy
bio.plant.seed-germination-dormancy
bio.repro.animal-reproductive-strategies
bio.repro.hormonal-regulation-reproduction-detail
bio.sys.evolutionary-systems-biology
bio.sys.quantitative-systems-modeling
```

(Regenerate this list yourself rather than trusting it blindly: diff
`CAMPAIGN_FIXED_CONCEPTS` in `bioVisualCoverageCampaign.test.ts` against the original 161-concept
static audit — the audit script itself was a one-off in the session scratchpad, not committed to
the repo; re-derive it from `resolveVisual`/Tier 0/1 lookups against all 199 KG concepts if the
scratchpad file is gone in a future session.) Continue in ~12-concept batches, same methodology,
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

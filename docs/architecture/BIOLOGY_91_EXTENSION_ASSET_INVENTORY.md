# Biology 91-Concept Extension — Production Asset Gap Inventory (2026-09-21)

**Owner instruction this document executes**: "MOHD — BIOLOGY NEXT PHASE." Biology
formal Educational Brain authoring is complete (199/199, `a0a288f`). This document is
Phase 1 of that instruction: an exact, measured enumeration of the 91 concepts added
by the 2026-09-14 KG extension that currently have **zero production teaching content**
(no `core_explanation`, no gradeable probe of any kind) — before any authoring begins.

## Measurement method (evidence, not inference)

1. Loaded the canonical KG (`docs/biology/kg/graph.json`, 199 concepts, KG validator
   already PASS/199-reachable, unchanged).
2. Loaded every concept ID literal occurring anywhere in
   `src/lib/teaching/assets/biologySeedAssets.ts` (108 originally-authored concepts,
   216 explanations, 216 probes) and
   `src/lib/teaching/assets/biologyDepthSeedAssets.ts` (the probe-depth campaign's
   third-probe additions for those same 108 concepts).
3. `199 KG concepts − 108 concepts with any seed-file occurrence = 91 concepts with
   zero seed content` — matches `scripts/assets/contract-audit.ts --subject biology`
   exactly: `kg concepts=199 authored=108 pairs=108 at contract=108 short=0
   never quizzable=0` (i.e. the 91 are entirely absent from the audit's per-pair
   count, not merely short of contract).
4. Cross-checked every one of the 91 IDs against
   `educational-brain/concepts/biology/*.md` (the just-completed formal EB) —
   **all 91 have a completed EB file** (confirmed by direct filename match), so the
   EB is available as the authoritative teaching source for every concept in this
   gap, per the owner instruction's Phase 2 directive.
5. No Blueprint file exists for biology as a subject (0 Blueprint files total,
   consistent with every EB entry's own "Blueprint References" section) — this is a
   pre-existing, subject-wide condition, not something specific to these 91.

## Headline numbers

| Metric | Value |
|---|---|
| Total biology KG concepts | 199 |
| Concepts with seed content (any) | 108 |
| **Concepts with zero seed content (this gap)** | **91** |
| Of the 91, with a completed EB file | 91 / 91 (100%) |
| Of the 91, with a Blueprint file | 0 / 91 (no biology Blueprint exists) |
| Explanation coverage across the 91 | 0 |
| Probe coverage across the 91 | 0 |
| Asset-identity rows registered (production) | 0 (nothing to bootstrap — no seed source exists yet) |

## Breakdown by domain (18 domains total; only domains with a gap shown)

| Domain | Gap count |
|---|---|
| `bio.neuro` | 12 |
| `bio.behav` | 9 |
| `bio.div` | 8 |
| `bio.physio` | 8 |
| `bio.plant` | 8 |
| `bio.eco` | 7 |
| `bio.cell` | 6 |
| `bio.evo` | 4 |
| `bio.micro` | 4 |
| `bio.mol` | 4 |
| `bio.bioinfo` | 3 |
| `bio.biotech` | 3 |
| `bio.dev` | 3 |
| `bio.gen` | 3 |
| `bio.immuno` | 3 |
| `bio.found` | 2 |
| `bio.repro` | 2 |
| `bio.sys` | 2 |

`bio.behav` and `bio.neuro` (21 of the 91) are entirely new domains from the KG
extension — every concept in them is in this gap. The remaining 70 are pre-existing
domains that grew new leaf concepts during the extension.

## Not uniform in difficulty or requirements — do not assume homogeneity

| Difficulty | Count |
|---|---|
| expert | 31 |
| proficient | 27 |
| advanced | 23 |
| developing | 8 |
| foundational | 2 |

| Bloom level | Count |
|---|---|
| analyze | 53 |
| evaluate | 16 |
| understand | 14 |
| apply | 8 |

This spans the full difficulty range already used elsewhere in biology (no
concept requires inventing a new difficulty/bloom tier). `mastery_threshold` and
`estimated_hours` per concept are already fixed by the frozen KG (0.70–0.80, 4–6h)
and require no new decision — the EB entries already state them per concept.

## Cross-subject dependencies (16 cross-links across 11 of the 91 concepts)

These 11 concepts' KG entries carry a non-empty `cross_links` field naming a
Mathematics or Chemistry concept; asset authoring for these must reference the
correct target concept in prose (no code coupling is required — `cross_links` is
descriptive metadata only, already handled identically for every other cross-linked
biology concept in the completed EB):

| Concept | Cross-links to |
|---|---|
| `bio.behav.foraging-behavior` | `math.calc.optimization` |
| `bio.bioinfo.multiomics-statistical-genomics` | `math.stats.hypothesis-testing`, `math.stats.chi-squared-test` |
| `bio.cell.anaerobic-respiration-fermentation` | `chem.redox.oxidation-state` |
| `bio.cell.membrane-transport-energetics` | `chem.thermo.gibbs` |
| `bio.eco.population-growth-models-quantitative` | `math.calc.derivative-rules`, `math.calc.definite-integral` |
| `bio.eco.predator-prey-dynamics` | `math.de.ode`, `math.de.nonlinear-ode` |
| `bio.gen.quantitative-genetics-heritability` | `math.prob.variance`, `math.prob.normal-distribution` |
| `bio.mol.metabolic-regulation-integration` | `chem.bio.enzyme-kinetics`, `chem.kinet.catalysis` |
| `bio.plant.plant-defense-mechanisms` | `chem.org.aromaticity` |
| `bio.sys.quantitative-systems-modeling` | `math.de.ode`, `math.calc.partial-derivatives` |

No cross-links point at a concept that itself lacks content in its own subject —
not verified in this pass (out of scope: Mathematics/Chemistry content work remains
paused per CLAUDE.md unless a proven shared-infrastructure defect is found; this
inventory only records what biology's own KG asserts).

## Full 91-concept table

Ordered by the same enumeration `contract-audit.ts` and the KG loader use
(alphabetical by ID within domain groups, exactly as extracted).

| # | Concept ID | Domain | Difficulty | Bloom | Requires | Cross-links | EB file |
|---|---|---|---|---|---|---|---|
| 1 | `bio.behav.animal-cognition` | behav | expert | evaluate | bio.behav.learning-and-behavior, bio.neuro.cognitive-neuroscience-consciousness | (none) | yes |
| 2 | `bio.behav.animal-communication` | behav | proficient | analyze | bio.behav.innate-behavior-instinct | (none) | yes |
| 3 | `bio.behav.foraging-behavior` | behav | advanced | analyze | bio.behav.innate-behavior-instinct, bio.eco.population-ecology | math.calc.optimization | yes |
| 4 | `bio.behav.human-behavioral-ecology-evolutionary-psych` | behav | expert | evaluate | bio.behav.kin-selection-altruism, bio.evo.human-evolution | (none) | yes |
| 5 | `bio.behav.innate-behavior-instinct` | behav | developing | understand | bio.physio.nervous-system | (none) | yes |
| 6 | `bio.behav.kin-selection-altruism` | behav | expert | evaluate | bio.behav.social-behavior-eusociality, bio.gen.population-genetics | (none) | yes |
| 7 | `bio.behav.learning-and-behavior` | behav | proficient | analyze | bio.behav.innate-behavior-instinct, bio.neuro.learning-memory-neurobiology | (none) | yes |
| 8 | `bio.behav.mating-systems-sexual-selection` | behav | advanced | analyze | bio.behav.animal-communication, bio.evo.natural-selection | (none) | yes |
| 9 | `bio.behav.social-behavior-eusociality` | behav | advanced | analyze | bio.behav.mating-systems-sexual-selection | (none) | yes |
| 10 | `bio.bioinfo.comparative-genomics` | bioinfo | expert | analyze | bio.bioinfo.genome-sequencing-technologies, bio.bioinfo.sequence-alignment | (none) | yes |
| 11 | `bio.bioinfo.genome-sequencing-technologies` | bioinfo | advanced | analyze | bio.bioinfo.bioinformatics-intro, bio.biotech.genomics-proteomics | (none) | yes |
| 12 | `bio.bioinfo.multiomics-statistical-genomics` | bioinfo | expert | evaluate | bio.bioinfo.structural-bioinformatics, bio.bioinfo.comparative-genomics | math.stats.hypothesis-testing, math.stats.chi-squared-test | yes |
| 13 | `bio.biotech.agricultural-forensic-biotechnology` | biotech | proficient | apply | bio.biotech.biotech-process-applications | (none) | yes |
| 14 | `bio.biotech.bioprocess-engineering` | biotech | proficient | apply | bio.biotech.biotech-principles | (none) | yes |
| 15 | `bio.biotech.gene-therapy-detail` | biotech | expert | evaluate | bio.biotech.crispr-genome-editing | (none) | yes |
| 16 | `bio.cell.anaerobic-respiration-fermentation` | cell | proficient | analyze | bio.plant.plant-respiration | chem.redox.oxidation-state | yes |
| 17 | `bio.cell.cancer-biology-hallmarks` | cell | expert | evaluate | bio.cell.cell-cycle, bio.cell.apoptosis, bio.cell.cell-adhesion-tissue-organization | (none) | yes |
| 18 | `bio.cell.cell-adhesion-tissue-organization` | cell | proficient | analyze | bio.cell.cell-junctions-extracellular-matrix | (none) | yes |
| 19 | `bio.cell.cell-junctions-extracellular-matrix` | cell | developing | understand | bio.cell.cell-membrane-transport | (none) | yes |
| 20 | `bio.cell.cytoskeleton-motility` | cell | proficient | analyze | bio.cell.cytoskeleton | (none) | yes |
| 21 | `bio.cell.membrane-transport-energetics` | cell | proficient | apply | bio.cell.cell-membrane-transport, bio.mol.bioenergetics | chem.thermo.gibbs | yes |
| 22 | `bio.dev.aging-senescence-biology` | dev | expert | evaluate | bio.dev.stem-cells-regeneration | (none) | yes |
| 23 | `bio.dev.organogenesis` | dev | advanced | analyze | bio.dev.morphogenesis-differentiation | (none) | yes |
| 24 | `bio.dev.regeneration-biology` | dev | advanced | analyze | bio.dev.stem-cells-regeneration | (none) | yes |
| 25 | `bio.div.animal-body-plans-symmetry` | div | developing | understand | bio.found.five-kingdom, bio.div.cladistics-phylogenetic-thinking | (none) | yes |
| 26 | `bio.div.arthropod-diversity` | div | proficient | analyze | bio.div.invertebrate-diversity-major-phyla | (none) | yes |
| 27 | `bio.div.chordate-vertebrate-diversity` | div | proficient | understand | bio.div.echinoderm-deuterostome-diversity | (none) | yes |
| 28 | `bio.div.echinoderm-deuterostome-diversity` | div | proficient | analyze | bio.div.invertebrate-diversity-major-phyla | (none) | yes |
| 29 | `bio.div.fish-amphibian-diversity` | div | proficient | analyze | bio.div.chordate-vertebrate-diversity | (none) | yes |
| 30 | `bio.div.invertebrate-diversity-major-phyla` | div | proficient | understand | bio.div.animal-body-plans-symmetry | (none) | yes |
| 31 | `bio.div.mammalian-diversity` | div | proficient | analyze | bio.div.chordate-vertebrate-diversity | (none) | yes |
| 32 | `bio.div.reptile-bird-diversity` | div | proficient | analyze | bio.div.chordate-vertebrate-diversity | (none) | yes |
| 33 | `bio.eco.applied-ecology-ecosystem-services` | eco | proficient | evaluate | bio.eco.biodiversity-conservation | (none) | yes |
| 34 | `bio.eco.biogeochemistry-advanced` | eco | advanced | analyze | bio.eco.nutrient-cycling | (none) | yes |
| 35 | `bio.eco.global-change-biology` | eco | expert | evaluate | bio.eco.environmental-issues, bio.eco.population-growth-models-quantitative | (none) | yes |
| 36 | `bio.eco.landscape-conservation-ecology` | eco | advanced | analyze | bio.eco.biodiversity-conservation | (none) | yes |
| 37 | `bio.eco.microbial-ecology` | eco | advanced | analyze | bio.micro.microbial-diversity, bio.eco.ecosystem-structure-function | (none) | yes |
| 38 | `bio.eco.population-growth-models-quantitative` | eco | advanced | apply | bio.eco.population-ecology | math.calc.derivative-rules, math.calc.definite-integral | yes |
| 39 | `bio.eco.predator-prey-dynamics` | eco | expert | analyze | bio.eco.population-growth-models-quantitative | math.de.ode, math.de.nonlinear-ode | yes |
| 40 | `bio.evo.coevolution-species-interactions` | evo | advanced | analyze | bio.evo.natural-selection, bio.eco.population-ecology | (none) | yes |
| 41 | `bio.evo.convergent-evolution-homoplasy` | evo | advanced | analyze | bio.evo.evidence-for-evolution, bio.div.cladistics-phylogenetic-thinking | (none) | yes |
| 42 | `bio.evo.macroevolution-extinction` | evo | advanced | analyze | bio.evo.modern-synthesis-speciation | (none) | yes |
| 43 | `bio.evo.phylogeography-biogeography` | evo | expert | analyze | bio.evo.evidence-for-evolution, bio.bioinfo.phylogenetics-computational | (none) | yes |
| 44 | `bio.found.scientific-method-in-biology` | found | foundational | understand | bio.found.what-is-biology | (none) | yes |
| 45 | `bio.found.unifying-themes-in-biology` | found | foundational | understand | bio.found.characteristics-of-life, bio.found.scientific-method-in-biology | (none) | yes |
| 46 | `bio.gen.conservation-genetics` | gen | expert | evaluate | bio.gen.population-genetics, bio.eco.biodiversity-conservation | (none) | yes |
| 47 | `bio.gen.genetic-testing-counseling` | gen | proficient | apply | bio.gen.pedigree-human-genetics | (none) | yes |
| 48 | `bio.gen.quantitative-genetics-heritability` | gen | expert | analyze | bio.gen.population-genetics | math.prob.variance, math.prob.normal-distribution | yes |
| 49 | `bio.immuno.cancer-immunology-immunotherapy` | immuno | expert | evaluate | bio.immuno.immune-disorders, bio.immuno.t-cell-development-tolerance | (none) | yes |
| 50 | `bio.immuno.cytokines-immune-signaling` | immuno | proficient | analyze | bio.immuno.innate-adaptive-immunity | (none) | yes |
| 51 | `bio.immuno.t-cell-development-tolerance` | immuno | expert | analyze | bio.immuno.mhc-antigen-presentation | (none) | yes |
| 52 | `bio.micro.antimicrobial-resistance` | micro | expert | evaluate | bio.micro.pathogenic-microbes, bio.micro.horizontal-gene-transfer | (none) | yes |
| 53 | `bio.micro.archaea-extremophiles` | micro | expert | analyze | bio.div.three-domain-system, bio.micro.microbial-metabolism-diversity | (none) | yes |
| 54 | `bio.micro.human-microbiome-detail` | micro | proficient | analyze | bio.micro.microbial-diversity, bio.physio.digestive-system | (none) | yes |
| 55 | `bio.micro.microbial-metabolism-diversity` | micro | advanced | analyze | bio.micro.microbial-diversity | (none) | yes |
| 56 | `bio.mol.alternative-splicing-rna-diversity` | mol | advanced | analyze | bio.mol.transcription | (none) | yes |
| 57 | `bio.mol.chromatin-structure-genome-organization` | mol | expert | analyze | bio.mol.epigenetics, bio.cell.nucleus-chromosomes | (none) | yes |
| 58 | `bio.mol.metabolic-regulation-integration` | mol | expert | analyze | bio.mol.enzymes, bio.mol.bioenergetics | chem.bio.enzyme-kinetics, chem.kinet.catalysis | yes |
| 59 | `bio.mol.protein-quality-control-autophagy` | mol | advanced | analyze | bio.mol.proteins-structure, bio.cell.endomembrane-system | (none) | yes |
| 60 | `bio.neuro.audition-vestibular-system` | neuro | advanced | analyze | bio.neuro.sensory-transduction | (none) | yes |
| 61 | `bio.neuro.autonomic-stress-physiology` | neuro | expert | analyze | bio.neuro.brain-regional-organization, bio.physio.endocrine-system | (none) | yes |
| 62 | `bio.neuro.brain-regional-organization` | neuro | proficient | understand | bio.physio.nervous-system | (none) | yes |
| 63 | `bio.neuro.cognitive-neuroscience-consciousness` | neuro | expert | evaluate | bio.neuro.learning-memory-neurobiology, bio.neuro.brain-regional-organization | (none) | yes |
| 64 | `bio.neuro.learning-memory-neurobiology` | neuro | expert | analyze | bio.neuro.neural-circuits-computation | (none) | yes |
| 65 | `bio.neuro.neural-circuits-computation` | neuro | expert | analyze | bio.neuro.neurotransmitter-systems, bio.neuro.brain-regional-organization | (none) | yes |
| 66 | `bio.neuro.neurodegenerative-disease` | neuro | expert | evaluate | bio.neuro.learning-memory-neurobiology | (none) | yes |
| 67 | `bio.neuro.neurodevelopment` | neuro | expert | analyze | bio.neuro.brain-regional-organization, bio.dev.morphogenesis-differentiation | (none) | yes |
| 68 | `bio.neuro.neurotransmitter-systems` | neuro | proficient | understand | bio.physio.nervous-system | (none) | yes |
| 69 | `bio.neuro.sensory-transduction` | neuro | proficient | understand | bio.physio.nervous-system | (none) | yes |
| 70 | `bio.neuro.sleep-circadian-biology` | neuro | advanced | analyze | bio.neuro.brain-regional-organization | (none) | yes |
| 71 | `bio.neuro.vision-visual-system` | neuro | advanced | analyze | bio.neuro.sensory-transduction | (none) | yes |
| 72 | `bio.physio.blood-physiology-hemostasis` | physio | proficient | analyze | bio.physio.circulatory-system | (none) | yes |
| 73 | `bio.physio.comparative-animal-physiology` | physio | advanced | analyze | bio.physio.respiratory-system, bio.physio.circulatory-system | (none) | yes |
| 74 | `bio.physio.endocrine-disorders-feedback` | physio | proficient | analyze | bio.physio.endocrine-system | (none) | yes |
| 75 | `bio.physio.exercise-physiology` | physio | expert | evaluate | bio.physio.muscle-physiology-energetics, bio.physio.respiratory-system | (none) | yes |
| 76 | `bio.physio.homeostasis-thermoregulation` | physio | developing | apply | bio.physio.excretory-system, bio.physio.circulatory-system | (none) | yes |
| 77 | `bio.physio.integumentary-system` | physio | developing | understand | bio.physio.circulatory-system | (none) | yes |
| 78 | `bio.physio.lymphatic-system-detail` | physio | developing | understand | bio.physio.circulatory-system, bio.physio.immune-system-intro | (none) | yes |
| 79 | `bio.physio.muscle-physiology-energetics` | physio | proficient | apply | bio.physio.musculoskeletal-system | (none) | yes |
| 80 | `bio.plant.mycorrhizae-plant-symbioses` | plant | advanced | analyze | bio.plant.plant-tissue-systems, bio.plant.mineral-nutrition, bio.div.fungal-biology | (none) | yes |
| 81 | `bio.plant.phytochrome-photoperiodic-flowering` | plant | expert | analyze | bio.plant.plant-growth-hormones | (none) | yes |
| 82 | `bio.plant.plant-biotechnology-applications` | plant | proficient | apply | bio.biotech.biotech-process-applications, bio.plant.plant-growth-hormones | (none) | yes |
| 83 | `bio.plant.plant-defense-mechanisms` | plant | advanced | analyze | bio.plant.plant-tissue-systems, bio.mol.signal-transduction-pathways | chem.org.aromaticity | yes |
| 84 | `bio.plant.plant-stress-physiology` | plant | expert | analyze | bio.plant.plant-tissue-systems, bio.plant.plant-water-relations | (none) | yes |
| 85 | `bio.plant.plant-tissue-systems` | plant | developing | understand | bio.cell.eukaryotic-cell | (none) | yes |
| 86 | `bio.plant.secondary-growth-anatomy` | plant | proficient | analyze | bio.plant.plant-tissue-systems | (none) | yes |
| 87 | `bio.plant.seed-germination-dormancy` | plant | developing | understand | bio.repro.sexual-reproduction-plants | (none) | yes |
| 88 | `bio.repro.animal-reproductive-strategies` | repro | advanced | analyze | bio.repro.human-reproductive-system | (none) | yes |
| 89 | `bio.repro.hormonal-regulation-reproduction-detail` | repro | expert | analyze | bio.repro.human-reproductive-system, bio.physio.endocrine-system | (none) | yes |
| 90 | `bio.sys.evolutionary-systems-biology` | sys | expert | evaluate | bio.sys.gene-regulatory-networks, bio.evo.molecular-evolution | (none) | yes |
| 91 | `bio.sys.quantitative-systems-modeling` | sys | expert | analyze | bio.sys.gene-regulatory-networks | math.de.ode, math.calc.partial-derivatives | yes |

## Architecture decision for Phase 2 (no parallel pipeline)

Following the owner instruction's explicit constraint ("Use the established Biology
seed/production architecture. Do NOT invent a parallel pipeline"), and the exact
precedent `biologyDepthSeedAssets.ts` already set for the probe-depth campaign (one
file, grown batch-by-batch, with a running header documenting each batch):

- A **new file**, `src/lib/teaching/assets/biologyExtensionSeedAssets.ts`, holds all
  91 concepts' full seed content (both `core_explanation`/`misconception_repair`
  explanations and all gradeable probes) — a genuinely new corpus, not an extension
  of an existing singleton slot, so there is no P-10 abandoned-slug risk the way the
  depth campaign had to route around: each of these 91 concepts opens **brand-new**
  `conceptId` rows entirely, at every probe kind, from probe #1.
- Every concept gets **>= 1 explanation** (`core_explanation`, gradeBand HIGH,
  matching the 108-concept precedent) and **>= 3 gradeable probes** from the start
  (an `mcq`, a `misconception_probe`, and a third capability-distinct probe — the
  contract floor the depth campaign had to retrofit for the original 108 is applied
  correctly here from the first commit, avoiding that exact defect class).
- The file exports `BIOLOGY_EXTENSION_EXPLANATIONS` and `BIOLOGY_EXTENSION_PROBES`,
  wired into `src/instrumentation.ts` and `scripts/brain/seed-knowledge-assets.ts`
  exactly where `BIOLOGY_EXPLANATIONS`/`BIOLOGY_PROBES` and
  `BIOLOGY_DEPTH_PROBES` are already wired — no new import pattern, no new bootstrap
  path.
- Content is authored **directly from each concept's own completed EB entry**
  (`educational-brain/concepts/biology/<id>.md`) — the EB's Core Understanding,
  Misconceptions (M1/M2 with their own Verification-of-death criteria), and Analogies
  sections are the authoritative source for explanation prose, misconception-probe
  stems, and correct/incorrect answer framing, per the owner instruction's Phase 2
  directive ("Use the completed EB as the authoritative teaching source").
- Authoring proceeds in the SAME strict KG-prerequisite order already used for EB
  authoring (not alphabetical), batch by batch, each batch validated
  (`tsc --noEmit`, `contract-audit.ts --subject biology`, dry-run seed script) before
  commit — the identical discipline already proven across 61 EB batches.

## Batch plan

91 concepts ÷ 3 per batch ≈ 31 batches, mirroring the EB campaign's own cadence.
Batch 1 begins immediately following this document, starting at the same
KG-prerequisite root already used for EB authoring (`bio.found.scientific-method-
in-biology`, `bio.found.unifying-themes-in-biology` — the only two `bio.found` gaps,
both foundational-difficulty, both with all prerequisites already among the
108-authored concepts).

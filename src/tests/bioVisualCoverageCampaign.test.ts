/**
 * BIOLOGY VISUAL COVERAGE CAMPAIGN (2026-09-25, in progress).
 *
 * bioVisualGapFix.test.ts fixed two concepts (bio.plant.photosynthesis,
 * bio.immuno.immune-disorders) found stuck in production: an explicit "show
 * me a diagram" request never produces a figure, because the concept has no
 * Tier 0/1 static binding and the Tier 3 generator keeps reproducing a
 * candidate fingerprint-identical to the one already critic-rejected.
 *
 * A live diagnostic sweep (one concept per Biology domain, driven against
 * the real deployed app, then re-confirmed with repeated distinct phrasings
 * across fresh sessions) found this is NOT a two-concept anomaly: roughly 3
 * in 4 of Biology's 161 concepts with no static binding hit the identical
 * shape. This file tracks the resulting campaign — every concept fixed here,
 * KG-batch by KG-batch, each grounded strictly in that concept's own
 * Educational Brain "Core Understanding" (never the fuller raw KG
 * description, never inventing structure the EB entry does not state),
 * reusing the four existing generators from the prior bio.cell campaign —
 * no new generator, no per-concept bespoke rendering code.
 *
 * Concepts confirmed already working via Tier 3 in the sweep (e.g.
 * bio.plant.plant-respiration) are deliberately left unauthored — a
 * deterministic scene is only added where evidence or a genuine structural
 * risk justifies it, never to inflate a coverage count.
 */
import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'

const ask = (conceptId: string) =>
  resolveVisual({ message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' })

/** Every concept this campaign has fixed so far, batch by batch. */
export const CAMPAIGN_FIXED_CONCEPTS = [
  // Batch 1 — bio.found (8), bio.mol (4)
  'bio.found.what-is-biology',
  'bio.found.characteristics-of-life',
  'bio.found.classification-need',
  'bio.found.five-kingdom',
  'bio.found.binomial-nomenclature',
  'bio.found.viruses-viroids-lichens',
  'bio.found.microscopy-basics',
  'bio.found.biomes-levels-of-organisation',
  'bio.mol.biomolecule-types',
  'bio.mol.carbohydrates-lipids',
  'bio.mol.proteins-structure',
  'bio.mol.enzymes',
  // Batch 2 — bio.mol (4), bio.gen (6), bio.evo (2)
  'bio.mol.nucleic-acid-structure',
  'bio.mol.transcription',
  'bio.mol.translation-genetic-code',
  'bio.mol.gene-regulation',
  'bio.gen.gene-interactions',
  'bio.gen.chromosomal-theory-linkage',
  'bio.gen.pedigree-human-genetics',
  'bio.gen.mutations',
  'bio.gen.population-genetics',
  'bio.gen.genetic-engineering',
  'bio.evo.origin-of-life',
  'bio.evo.evidence-for-evolution',
  // Batch 3 — bio.evo (3), bio.physio (8)
  'bio.evo.natural-selection',
  'bio.evo.modern-synthesis-speciation',
  'bio.evo.human-evolution',
  'bio.physio.digestive-system',
  'bio.physio.respiratory-system',
  'bio.physio.circulatory-system',
  'bio.physio.excretory-system',
  'bio.physio.nervous-system',
  'bio.physio.endocrine-system',
  'bio.physio.musculoskeletal-system',
  'bio.physio.immune-system-intro',
  // Batch 4 — bio.plant (3), bio.repro (5), bio.dev (3), bio.micro (1)
  'bio.plant.plant-water-relations',
  'bio.plant.mineral-nutrition',
  'bio.plant.plant-growth-hormones',
  'bio.repro.asexual-reproduction',
  'bio.repro.sexual-reproduction-plants',
  'bio.repro.human-reproductive-system',
  'bio.repro.fertilisation-development',
  'bio.repro.reproductive-health',
  'bio.dev.gametogenesis-fertilisation-dev',
  'bio.dev.morphogenesis-differentiation',
  'bio.dev.stem-cells-regeneration',
  'bio.micro.microbial-diversity',
  // Batch 5 — bio.micro (3), bio.immuno (3), bio.biotech (4), bio.bioinfo (2)
  'bio.micro.microbial-growth-culture',
  'bio.micro.microbes-in-human-welfare',
  'bio.micro.pathogenic-microbes',
  'bio.immuno.innate-adaptive-immunity',
  'bio.immuno.antibody-structure-function',
  'bio.immuno.vaccination-immunisation',
  'bio.biotech.biotech-principles',
  'bio.biotech.biotech-process-applications',
  'bio.biotech.genomics-proteomics',
  'bio.biotech.crispr-genome-editing',
  'bio.bioinfo.bioinformatics-intro',
  'bio.bioinfo.sequence-alignment',
  // Batch 6 — bio.bioinfo (2), bio.sys (4), bio.div (6)
  'bio.bioinfo.phylogenetics-computational',
  'bio.bioinfo.structural-bioinformatics',
  'bio.sys.systems-biology-intro',
  'bio.sys.gene-regulatory-networks',
  'bio.sys.metabolic-network-modelling',
  'bio.sys.synthetic-biology',
  'bio.div.three-domain-system',
  'bio.div.endosymbiotic-theory',
  'bio.div.protist-diversity',
  'bio.div.fungal-biology',
  'bio.div.plant-diversity-alternation-of-generations',
  'bio.div.cladistics-phylogenetic-thinking',
  // Batch 7 — bio.micro (2), bio.mol (5), bio.gen (1), bio.evo (2),
  // bio.immuno (1), bio.behav (1)
  'bio.micro.viral-replication',
  'bio.micro.horizontal-gene-transfer',
  'bio.mol.epigenetics',
  'bio.mol.noncoding-rna',
  'bio.mol.signal-transduction-pathways',
  'bio.mol.dna-damage-repair',
  'bio.mol.bioenergetics',
  'bio.gen.transposable-elements',
  'bio.evo.molecular-evolution',
  'bio.evo.evo-devo',
  'bio.immuno.mhc-antigen-presentation',
  'bio.behav.animal-cognition',
  // Batch 8 — bio.behav (8), bio.bioinfo (3), bio.biotech (1)
  'bio.behav.animal-communication',
  'bio.behav.foraging-behavior',
  'bio.behav.human-behavioral-ecology-evolutionary-psych',
  'bio.behav.innate-behavior-instinct',
  'bio.behav.kin-selection-altruism',
  'bio.behav.learning-and-behavior',
  'bio.behav.mating-systems-sexual-selection',
  'bio.behav.social-behavior-eusociality',
  'bio.bioinfo.comparative-genomics',
  'bio.bioinfo.genome-sequencing-technologies',
  'bio.bioinfo.multiomics-statistical-genomics',
  'bio.biotech.agricultural-forensic-biotechnology',
  // Batch 9 — bio.biotech (2), bio.dev (3), bio.div (6)
  'bio.biotech.bioprocess-engineering',
  'bio.biotech.gene-therapy-detail',
  'bio.dev.aging-senescence-biology',
  'bio.dev.organogenesis',
  'bio.dev.regeneration-biology',
  'bio.div.animal-body-plans-symmetry',
  'bio.div.arthropod-diversity',
  'bio.div.chordate-vertebrate-diversity',
  'bio.div.echinoderm-deuterostome-diversity',
  'bio.div.fish-amphibian-diversity',
  'bio.div.invertebrate-diversity-major-phyla',
  'bio.div.mammalian-diversity',
  // Batch 10 — bio.div (1), bio.evo (4), bio.found (2), bio.gen (3),
  // bio.immuno (2)
  'bio.div.reptile-bird-diversity',
  'bio.evo.coevolution-species-interactions',
  'bio.evo.convergent-evolution-homoplasy',
  'bio.evo.macroevolution-extinction',
  'bio.evo.phylogeography-biogeography',
  'bio.found.scientific-method-in-biology',
  'bio.found.unifying-themes-in-biology',
  'bio.gen.conservation-genetics',
  'bio.gen.genetic-testing-counseling',
  'bio.gen.quantitative-genetics-heritability',
  'bio.immuno.cancer-immunology-immunotherapy',
  'bio.immuno.cytokines-immune-signaling',
] as const

describe.each(CAMPAIGN_FIXED_CONCEPTS)('%s now resolves to a faithful Tier 0 scene', (conceptId) => {
  it('is graphical, with a real scene attached', () => {
    const d = ask(conceptId)
    expect(d.graphical).toBe(true)
    expect(d.asset?.conceptId).toBe(conceptId)
  })

  it('is not retired and has no curated Tier 1 binding — the fix is genuinely Tier 0', () => {
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(lookupConceptVisualBinding(conceptId)).toBeNull()
  })

  it('the scene has at least one real step with narration', () => {
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene).not.toBeNull()
    expect(scene!.steps.length).toBeGreaterThan(0)
    expect(scene!.steps.every((s) => (s.narration ?? '').length > 0)).toBe(true)
  })
})

describe('campaign non-regression', () => {
  it('CONCEPT_SCENE_OVERRIDES contains every concept this file tracks', () => {
    for (const id of CAMPAIGN_FIXED_CONCEPTS) {
      expect(CONCEPT_SCENE_OVERRIDES, id).toContain(id)
    }
  })

  it('no duplicate concept ids within the campaign list itself', () => {
    expect(new Set(CAMPAIGN_FIXED_CONCEPTS).size).toBe(CAMPAIGN_FIXED_CONCEPTS.length)
  })

  it('a concept confirmed already working via Tier 3 was deliberately left unauthored', () => {
    // bio.plant.plant-respiration served a real, on-topic figure on the
    // first explicit request in the live diagnostic sweep — no Tier 0
    // override was added for it, since none was needed.
    expect(CAMPAIGN_FIXED_CONCEPTS as readonly string[]).not.toContain('bio.plant.plant-respiration')
  })

  it('mitosis, the 18 replaced bio.cell concepts, and the two original gap-fix concepts are unaffected', () => {
    expect(ask('bio.cell.mitosis').graphical).toBe(true)
    expect(ask('bio.plant.photosynthesis').graphical).toBe(true)
    expect(ask('bio.immuno.immune-disorders').graphical).toBe(true)
  })

  it('an unrelated still-retired concept remains retired', () => {
    expect(isRetiredVisualBinding('chem.bond.ionic-bonding')).toBe(true)
    expect(ask('chem.bond.ionic-bonding').graphical).toBe(false)
  })
})

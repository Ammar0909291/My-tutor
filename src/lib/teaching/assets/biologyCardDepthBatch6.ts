/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 6 (bio.repro, bio.immuno, bio.sys, bio.biotech and bio.bioinfo part 6, 19 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: all 199 biology concepts held fewer than three authored cards with
 * 3+ options (203 cards short). Owner decision 3 (2026-10-07, `turnContract.certifiesMastery`)
 * makes a 2-option card practice-only once a concept holds three such cards, so a blind guess
 * on the remaining 2-option cards would otherwise still count towards mastery. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit existing
 * identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the
 * idea of one of the concept's registered misconceptions (ids read off the concept's own
 * existing probes, so none is invented) carries that id; any other wrong answer carries no id.
 * Every stem is a NEW worked example. Facts come only from the concept's own
 * Educational Brain entry (educational-brain/concepts/biology/<concept>.md — Core Understanding
 * and Misconceptions); biology has no blueprint.
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each concept in this batch holds short_answer, mcq and misconception_probe probes at its own band, so the new cards take the FREE slot step_check at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'biology'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'mcq' | 'misconception_probe' | 'true_false' | 'checkpoint' | 'step_check' | 'short_answer' | 'fill_blank' | 'numeric'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  const wrong = (w: [string, string]) => ({ text: w[0], isCorrect: false, ...(w[1] ? { misconceptionId: id(w[1]) } : {}) })
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem,
    choices: [{ text: correct, isCorrect: true }, wrong(wrongA), wrong(wrongB)],
    targetedMisconceptions: [wrongA, wrongB].filter((w) => w[1]).map((w) => id(w[1])),
    source: `educational-brain/concepts/biology/${conceptId}.md — Core Understanding and Misconceptions; ${note}`,
  }
}

export const BIOLOGY_CARD_DEPTH_BATCH_6: SeedProbe[] = [
  card('bio.repro.fertilisation-development', 'step_check', H,
    'Oxygen passes from a mother to her foetus across the placenta. How?',
    'By diffusion across the placental barrier, with the two bloodstreams kept separate',
    ['Maternal blood flows straight into the foetal circulation through the cord', 'M1'],
    ['The foetus breathes in amniotic fluid and absorbs oxygen from it', ''],
    'M1 maternal blood does not flow into the foetal circulation, re-asked as how oxygen crosses the placenta'),
  card('bio.repro.reproductive-health', 'step_check', H,
    'Emergency contraception is taken within a few days of unprotected sex. How does it mainly work?',
    'It mainly delays or prevents ovulation, so there is no egg to fertilise',
    ['It ends an established pregnancy by removing the embryo from the uterus', 'M2'],
    ['It stops a fertilised egg from implanting in the wall of the uterus', 'M1'],
    'M1 and M2 contraception works before fertilisation and is not an abortifacient, re-asked for emergency contraception'),
  card('bio.immuno.innate-adaptive-immunity', 'step_check', H,
    'A neutrophil engulfs bacteria at a wound. Does it present the antigen to T cells?',
    'No: neutrophils kill bacteria, while dendritic cells and macrophages present antigens',
    ['Yes: as first responders, neutrophils also activate T cells', 'M2'],
    ['Yes, but only after the neutrophil has first become a B cell', ''],
    'M2 neutrophils do not activate T cells directly, re-asked with a wound'),
  card('bio.immuno.antibody-structure-function', 'step_check', H,
    'A newborn has no immune memory yet, but its blood holds antibodies against measles. Where did they come from?',
    'IgG that crossed the placenta from the mother',
    ['IgM, the first antibody made, which crossed the placenta from the mother', 'M3'],
    ['IgE made by the newborn\'s own plasma cells before birth', ''],
    'M3 IgG and not IgM crosses the placenta, re-asked as where a newborn\'s antibodies come from'),
  card('bio.immuno.vaccination-immunisation', 'step_check', H,
    'In a school 95% of pupils are vaccinated. Why are the few unvaccinated pupils still unlikely to catch the disease?',
    'The pathogen rarely finds a susceptible host, so chains of spread break',
    ['The vaccinated pupils\' antibodies spread to them through close contact', 'M3'],
    ['Unvaccinated pupils quickly make memory cells from being near vaccinated ones', ''],
    'M3 herd immunity does not work by antibodies spreading between people, re-asked for a school'),
  card('bio.immuno.immune-disorders', 'step_check', U,
    'Which statement correctly describes type 1 diabetes and hay fever?',
    'Both involve an overactive response: one against self, one against a harmless target',
    ['Both are caused by a weak, underactive immune system', 'M1'],
    ['Type 1 diabetes is an allergy and hay fever is an autoimmune disease', ''],
    'M1 autoimmunity and allergy are overactive and not weak responses, re-asked as a comparison'),
  card('bio.immuno.mhc-antigen-presentation', 'step_check', U,
    'A macrophage engulfs a bacterium and shows one of its peptides to a helper T cell. Which MHC class does it use?',
    'Class II: peptides from engulfed material go on MHC class II',
    ['Class I: the class is set by the type of pathogen, and bacteria use class I', 'M2'],
    ['Neither: the T cell detects the free bacterium directly', 'M1'],
    'M1 and M2 MHC class follows the origin of the peptide and T cells need presentation, re-asked with a macrophage'),
  card('bio.sys.systems-biology-intro', 'step_check', U,
    'Protein X represses its own gene. What does this negative feedback usually produce?',
    'Stabilisation of X at a steady level, or oscillation',
    ['Bistability: two stable states with a switch between them', 'M2'],
    ['Runaway growth of X without limit', ''],
    'M2 negative feedback does not give bistability, re-asked with a self-repressing protein'),
  card('bio.sys.gene-regulatory-networks', 'step_check', U,
    'A diagram lists every known regulator-target link in a developing tissue. What can be concluded from it?',
    'Which links exist, but not the strengths, timing or levels needed to predict behaviour',
    ['It is a complete predictive model, like a circuit schematic', 'M1'],
    ['Only which genes are present in the genome', ''],
    'M1 a wiring diagram is not a complete predictive model, re-asked as what can be concluded'),
  card('bio.sys.metabolic-network-modelling', 'step_check', U,
    'Which question can standard FBA answer without any kinetic data?',
    'Which steady-state reaction fluxes maximise growth on a given nutrient',
    ['How each metabolite concentration changes over the first minutes after a glucose pulse', 'M1'],
    ['Which enzymes are actually expressed in the cell at that moment', ''],
    'M1 FBA does not simulate concentrations over time, re-asked as which question FBA can answer'),
  card('bio.sys.synthetic-biology', 'step_check', U,
    'A brief pulse of inducer flips a toggle switch to B-on, then the inducer is washed away. What does the cell do?',
    'It stays in B-on, because mutual repression holds the state',
    ['It returns to its original A-on state, since toggle switches reset to default', 'M2'],
    ['It oscillates between A-on and B-on indefinitely', ''],
    'M2 a toggle switch does not reset when the signal is removed, re-asked after the inducer is washed away'),
  card('bio.biotech.biotech-principles', 'step_check', H,
    'Brewing beer and making cheese with microbes go back thousands of years. How should they be classified?',
    'As traditional biotechnology, using living organisms for human benefit',
    ['Not biotechnology, since biotechnology requires modern DNA techniques', 'M1'],
    ['As genetic engineering, since the microbes were modified', ''],
    'M1 biotechnology is not entirely modern, re-asked with brewing and cheese-making'),
  card('bio.biotech.biotech-process-applications', 'step_check', U,
    'In making a recombinant plasmid, which enzyme cuts it at a chosen site and which seals the insert in?',
    'A restriction enzyme cuts it; DNA ligase seals the insert in',
    ['DNA ligase cuts it; a restriction enzyme seals the insert in', 'M2'],
    ['DNA polymerase cuts it; RNA polymerase seals the insert in', ''],
    'M2 ligase joins and does not cut, re-asked as which enzyme cuts and which seals'),
  card('bio.biotech.genomics-proteomics', 'step_check', U,
    'RNA-seq is run on liver and brain samples from the same person. What does the data show?',
    'Which genes are transcribed, and how much, in each tissue',
    ['The differences in DNA sequence between the liver and the brain samples', 'M2'],
    ['The amount of each protein in each tissue', ''],
    'M2 RNA-seq measures transcripts and not DNA sequence or protein, re-asked with two tissues'),
  card('bio.biotech.crispr-genome-editing', 'step_check', U,
    'A guide RNA matches its 20-nucleotide target and also a similar site elsewhere with one mismatch. What risk does this create?',
    'Off-target cutting at the similar site, so unintended edits can occur',
    ['None: CRISPR is clean and edits only the intended site', 'M1'],
    ['The guide RNA is degraded and no cut is made anywhere', ''],
    'M1 CRISPR is not perfectly clean, re-asked with a near-match site'),
  card('bio.bioinfo.bioinformatics-intro', 'step_check', U,
    'Two BLAST hits for one query have E = 1e-3 and E = 1e-40. Which is stronger evidence of homology?',
    'The 1e-40 hit: E is the number of equally good matches expected by chance',
    ['The 1e-3 hit: E is the percent identity, so a larger number means a closer match', 'M2'],
    ['Neither: E-values say nothing about how likely a match is by chance', ''],
    'M2 an E-value is not percent identity, re-asked with two BLAST hits'),
  card('bio.bioinfo.sequence-alignment', 'step_check', U,
    'Two proteins share 25% identity but fold into the same 3D structure and do the same job. What is the best conclusion?',
    'They are probably homologous, since structure is conserved longer than sequence',
    ['They are unrelated, because proteins below 30% identity cannot possibly be homologous', 'M1'],
    ['They are the same protein, since the function is the same', ''],
    'M1 low identity does not rule out homology, re-asked with a shared fold at 25% identity'),
  card('bio.bioinfo.phylogenetics-computational', 'step_check', U,
    'In a phylogenetic tree, lungfish branch off before humans. What does this say about lungfish?',
    'Only the order of splitting: both lineages have evolved equally long',
    ['They are more primitive and have evolved less than humans have since the split', 'M1'],
    ['They are the ancestors of humans', ''],
    'M1 an earlier branch is not more primitive, re-asked with lungfish and humans'),
  card('bio.bioinfo.structural-bioinformatics', 'step_check', U,
    'Structure A is solved at 1.8 Å and structure B at 3.5 Å. Which gives more atomic detail?',
    'A, because a smaller resolution value means finer detail',
    ['B, because resolution is the percentage of residues placed and 3.5 is higher', 'M2'],
    ['Neither, because resolution describes only the size of the crystal', ''],
    'M2 a PDB resolution value is not a percentage, re-asked with 1.8 and 3.5 angstrom structures'),
]

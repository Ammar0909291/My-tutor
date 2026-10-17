/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 8 (bio.repro, bio.immuno, bio.sys, bio.biotech and bio.bioinfo, facet cards, 18 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5, B4)
 * The asset contract floor is 3 probes per concept; the mathematics, chemistry and physics standard is 5.
 * Biology authored 3 per concept, and the B1 card-depth campaign added one 3-option card each, so every
 * concept now holds 4. Five cards per concept are spent in phases that do not count towards mastery
 * (GUIDE / DEMONSTRATE), so a learner who stays until mastery (owner decision 4, 2026-10-07) can exhaust a
 * shallow pool and meet the same question again. This batch adds the fifth card, on a facet of the concept
 * the other four do not ask. Owner authorisation: "F it's required then go ahead" (2026-10-17).
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the idea of one of
 * the concept's registered misconceptions (ids read off the concept's own existing probes or its
 * educational-brain entry, so none is invented) carries that id; any other wrong answer carries none.
 * Every stem is a NEW scenario. Facts come only from the concept's educational-brain entry
 * (educational-brain/concepts/biology/<concept>.md — Core Understanding and Misconceptions).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a second one:
 * `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug and abandon the live row's
 * identity. Each concept in this batch holds step_check, short_answer, mcq and misconception_probe probes at its own band, so the new card takes the FREE slot fill_blank at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is only a slot label.
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

export const BIOLOGY_DEPTH_BATCH_8: SeedProbe[] = [
  card('bio.repro.human-reproductive-system', 'fill_blank', H,
    'Where in the male reproductive system are sperm produced?',
    'The testes',
    ['The prostate gland, which adds fluid to the semen', ''],
    ['The epididymis, where sperm are first formed', ''],
    'the testes produce sperm and the epididymis matures them, re-asked as where sperm are produced'),
  card('bio.repro.fertilisation-development', 'fill_blank', H,
    'Why must a sperm undergo capacitation?',
    'It gains the ability to fertilise the egg within the female tract',
    ['It becomes haploid so that it can fuse with the egg', ''],
    ['It is converted into a zygote before reaching the egg', ''],
    'capacitation gives sperm their fertilising ability, re-asked as why a sperm must undergo it'),
  card('bio.repro.reproductive-health', 'fill_blank', H,
    'How is reproductive health defined?',
    'Complete physical, mental and social well-being in reproduction, not merely the absence of disease',
    ['The absence of reproductive disease only', ''],
    ['The ability to conceive within three months of trying', ''],
    'reproductive health is more than the absence of disease, re-asked as how it is defined'),
  card('bio.immuno.innate-adaptive-immunity', 'fill_blank', H,
    'Which feature is unique to adaptive immunity?',
    'Specificity for one antigen and memory of it',
    ['A response within minutes of any infection', ''],
    ['It replaces the innate response once it is active', 'M1'],
    'M1 the innate system keeps working when adaptive immunity starts, re-asked as which feature is unique to adaptive immunity'),
  card('bio.immuno.antibody-structure-function', 'fill_blank', H,
    'How many polypeptide chains does a typical antibody contain?',
    'Four: two identical heavy chains and two identical light chains',
    ['Two identical chains joined together', ''],
    ['One long chain folded into a Y shape', ''],
    'an antibody has two heavy and two light chains, re-asked as how many chains it contains'),
  card('bio.immuno.vaccination-immunisation', 'fill_blank', H,
    'Why does a second exposure to a pathogen produce a faster and stronger response than the first?',
    'Memory cells formed after the first exposure respond rapidly',
    ['Antibodies from the first exposure stay in the blood at high levels permanently', ''],
    ['The innate immune system has learned to recognise that specific pathogen', ''],
    'vaccination works through immunological memory, re-asked as why a second exposure gives a stronger response'),
  card('bio.immuno.immune-disorders', 'fill_blank', U,
    'Which of these is an underactive (immunodeficiency) disorder?',
    'AIDS, where the immune system fails to defend against infection',
    ['Hay fever, which is caused by a weak immune system', 'M1'],
    ['Type 1 diabetes, where T cells attack the pancreas', ''],
    'M1 allergies and autoimmune diseases are not caused by a weak immune system, re-asked as which is an immunodeficiency'),
  card('bio.immuno.mhc-antigen-presentation', 'fill_blank', U,
    'Which cells carry MHC class I molecules?',
    'Nearly all nucleated cells',
    ['Only antigen-presenting cells such as macrophages', ''],
    ['Only red blood cells, to mark them as self', ''],
    'MHC class I is displayed by nearly all nucleated cells, re-asked as which cells carry it'),
  card('bio.sys.systems-biology-intro', 'fill_blank', U,
    'What does systems biology treat as emergent properties?',
    'Behaviours of networks that no single component shows alone',
    ['The amount of data produced by many experiments run at once', 'M1'],
    ['The sequence of a single gene', ''],
    'M1 systems biology is not just using lots of data, re-asked as what it treats as emergent'),
  card('bio.sys.gene-regulatory-networks', 'fill_blank', U,
    'In a gene regulatory network graph, what do the directed edges represent?',
    'Regulatory interactions: activation or repression',
    ['The physical distance between genes on a chromosome', ''],
    ['The copy number of each gene in the genome', ''],
    'edges of a GRN are activation and repression, re-asked as what the directed edges represent'),
  card('bio.sys.metabolic-network-modelling', 'fill_blank', U,
    'What does the stoichiometric matrix S of a metabolic model list?',
    'The coefficient of each metabolite in each reaction',
    ['The measured concentration of each metabolite', ''],
    ['How each metabolite concentration changes over time', 'M1'],
    'M1 FBA does not simulate concentrations over time, re-asked as what the stoichiometric matrix lists'),
  card('bio.sys.synthetic-biology', 'fill_blank', U,
    'Which engineering principle does synthetic biology apply?',
    'Standardised, modular parts that can be combined into devices',
    ['Creating life from non-living matter alone', 'M1'],
    ['Removing every gene from a cell before use', ''],
    'M1 synthetic biology did not create life from scratch, re-asked as which engineering principle it applies'),
  card('bio.biotech.biotech-principles', 'fill_blank', H,
    'What is meant by traditional biotechnology?',
    'The long-standing use of organisms such as yeast to make bread, beer and cheese',
    ['Genetic engineering carried out only after DNA was discovered in the twentieth century', 'M1'],
    ['Any technology that involves a computer', ''],
    'M1 biotechnology is not entirely modern, re-asked as what traditional biotechnology means'),
  card('bio.biotech.biotech-process-applications', 'fill_blank', U,
    'Which application uses a viral vector to carry a therapeutic gene into cells?',
    'Gene therapy',
    ['Marker-assisted selective breeding', ''],
    ['Industrial fermentation', ''],
    'gene therapy uses vectors to deliver genes, re-asked as which application uses a viral vector'),
  card('bio.biotech.genomics-proteomics', 'fill_blank', U,
    'What makes next-generation sequencing fast and cheap?',
    'It runs millions of sequencing reactions in parallel',
    ['It reads each base once with a single very long enzyme', ''],
    ['It sequences only the genes that are expressed in the cell', ''],
    'next-generation sequencing is massively parallel, re-asked as what makes it fast and cheap'),
  card('bio.biotech.crispr-genome-editing', 'fill_blank', U,
    'What does the guide RNA do in CRISPR-Cas9?',
    'It directs Cas9 to a matching DNA sequence',
    ['It cuts the DNA itself at the target', ''],
    ['It pastes in the replacement gene cleanly', 'M1'],
    'M1 CRISPR is not clean cut and paste, re-asked as what the guide RNA does'),
  card('bio.bioinfo.bioinformatics-intro', 'fill_blank', U,
    'How should an AlphaFold2 structure prediction be treated?',
    'As a computational prediction that is not equivalent to an experimental structure',
    ['As experimentally equivalent to a crystal structure, since it is so highly accurate', 'M1'],
    ['As useless, because it was not measured in an experiment', ''],
    'M1 AlphaFold2 predictions are not experimentally equivalent to crystal structures, re-asked as how a prediction should be treated'),
  card('bio.bioinfo.sequence-alignment', 'fill_blank', U,
    'Which method finds the best global alignment of two sequences?',
    'Dynamic programming, as in the Needleman–Wunsch algorithm',
    ['A BLAST search of a large database of known sequences', ''],
    ['Counting the identical letters by eye until the two sequences line up', ''],
    'pairwise alignment uses dynamic programming, re-asked as which method finds the best global alignment'),
]

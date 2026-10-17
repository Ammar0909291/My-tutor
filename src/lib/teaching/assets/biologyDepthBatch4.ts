/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 4 (bio.evo, bio.gen, bio.neuro, bio.sys, bio.cell and bio.mol, facet cards, 18 cards).
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
 * identity. Each concept in this batch holds step_check, mcq, misconception_probe and short_answer probes at its own band, so the new card takes the FREE slot fill_blank at that band (the kind is only a slot label).
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

export const BIOLOGY_DEPTH_BATCH_4: SeedProbe[] = [
  card('bio.evo.coevolution-species-interactions', 'fill_blank', H,
    'What distinguishes coevolution from two species independently evolving similar traits in a shared climate?',
    'Reciprocal change: each species\' evolution alters the selection on the other',
    ['Nothing: sharing an environment is enough to call it coevolution', 'M1'],
    ['Coevolution requires that the two species are closely related', ''],
    'M1 similar traits in a shared environment are not coevolution, re-asked as what distinguishes coevolution'),
  card('bio.evo.convergent-evolution-homoplasy', 'fill_blank', H,
    'Bird wings and insect wings both allow flight but arose independently. What is this kind of similarity called?',
    'Homoplasy: a similarity not due to shared ancestry',
    ['Homology: a similarity due to shared ancestry', 'M1'],
    ['Vestigial structure: a remnant that has lost its function', ''],
    'M1 structural similarity does not always mean close relationship, re-asked with bird and insect wings'),
  card('bio.evo.macroevolution-extinction', 'fill_blank', H,
    'What is macroevolution concerned with?',
    'Patterns above the species level, such as speciation, extinction and diversification rates',
    ['Changes within a single population over a few generations', ''],
    ['Evolution that happens instantaneously by a different mechanism', 'M1'],
    'M1 macroevolution builds on microevolution and is not instantaneous, re-asked as what macroevolution studies'),
  card('bio.evo.phylogeography-biogeography', 'fill_blank', H,
    'A new mountain range rises and splits one population in two. Which mechanism is this?',
    'Vicariance: a formerly continuous population is divided by a barrier',
    ['Dispersal: individuals crossed an existing barrier', ''],
    ['Neither: vicariance and dispersal are different words for the same explanation', 'M1'],
    'M1 vicariance and dispersal are different explanations, re-asked with a rising mountain range'),
  card('bio.gen.genetic-testing-counseling', 'fill_blank', H,
    'Two healthy prospective parents are tested for whether they carry a recessive disease allele. What is this called?',
    'Carrier screening',
    ['Newborn screening, carried out after birth', ''],
    ['A diagnostic test of the fetus', ''],
    'carrier screening tests prospective parents for recessive alleles, re-asked as what the test is called'),
  card('bio.neuro.neurodevelopment', 'fill_blank', H,
    'What forms from the neural plate during neurulation?',
    'The neural tube, the origin of the brain and spinal cord',
    ['The notochord, a rod that lies beneath the nerve cord', ''],
    ['The neural crest alone, with nothing forming from the plate itself', ''],
    'neurulation folds the neural plate into the neural tube, re-asked as what forms from the plate'),
  card('bio.sys.evolutionary-systems-biology', 'fill_blank', H,
    'What does it mean to say a gene-regulatory network is robust?',
    'It keeps its function when mutations or perturbations occur',
    ['It cannot change at all, so it is the opposite of evolvable', 'M1'],
    ['It evolves faster than any other network', ''],
    'M1 robustness and evolvability are not simple opposites, re-asked as what robustness means'),
  card('bio.cell.cell-cycle', 'fill_blank', H,
    'What does the spindle assembly checkpoint verify before anaphase begins?',
    'That every chromosome is attached to spindle fibres from both poles',
    ['That the cell has finished growing and has doubled its volume', ''],
    ['That DNA replication has just begun in G1', 'M2'],
    'M2 DNA replication happens in S phase and not in G1, re-asked as what the spindle checkpoint verifies'),
  card('bio.cell.mitosis', 'fill_blank', H,
    'At which stage of mitosis do the chromosomes line up on the cell\'s equator?',
    'Metaphase',
    ['Prophase, when the chromosomes first condense', ''],
    ['Anaphase, when the sister chromatids are pulled apart', ''],
    'metaphase aligns the chromosomes at the metaphase plate, re-asked as which stage lines them up'),
  card('bio.cell.meiosis', 'fill_blank', H,
    'How many haploid cells does one diploid cell produce by meiosis?',
    'Four',
    ['Two, because meiosis is a single division like mitosis', 'M1'],
    ['One, because the other cells are destroyed', ''],
    'M1 meiosis has two divisions and the reductional one is meiosis I, re-asked as how many cells meiosis makes'),
  card('bio.cell.apoptosis', 'fill_blank', U,
    'In the extrinsic pathway of apoptosis, what triggers the process?',
    'A death ligand such as FasL binding its receptor on the cell surface',
    ['Release of cytochrome c from the mitochondria', ''],
    ['Swelling of the cell until its membrane ruptures', 'M2'],
    'M2 apoptosis is not necrosis, re-asked as what triggers the extrinsic pathway'),
  card('bio.mol.biomolecule-types', 'fill_blank', H,
    'Which class of biomolecule is not a true polymer, having no single repeating monomer?',
    'Lipids',
    ['Proteins, which are chains of amino acids', ''],
    ['Carbohydrates, which are chains of monosaccharides', ''],
    'lipids are not true polymers, re-asked as which class has no repeating monomer'),
  card('bio.mol.carbohydrates-lipids', 'fill_blank', H,
    'A triglyceride is built from which parts?',
    'Glycerol and three fatty acids',
    ['Three glycerol molecules and one fatty acid', ''],
    ['Glucose units joined by glycosidic bonds', ''],
    'triglycerides are glycerol plus three fatty acids, re-asked as which parts build a triglyceride'),
  card('bio.mol.proteins-structure', 'fill_blank', H,
    'Which interactions stabilise the alpha-helix and beta-sheet of secondary structure?',
    'Hydrogen bonds between atoms of the peptide backbone',
    ['Peptide bonds between neighbouring amino acids', ''],
    ['Disulfide bridges between distant side chains only', ''],
    'secondary structure is held by backbone hydrogen bonds, re-asked as which interactions stabilise it'),
  card('bio.mol.nucleic-acid-structure', 'fill_blank', H,
    'A double-stranded DNA sample has 26% cytosine. What percentage of its bases are A or T together?',
    '48%: C = G = 26%, so A + T = 100 \u2212 52',
    ['26%, since A and T can take any value independent of the cytosine', 'M2'],
    ['74%, the remainder after removing cytosine only', ''],
    'M2 base percentages are linked by Chargaff\'s rules, re-asked with 26% cytosine'),
  card('bio.mol.dna-replication', 'fill_blank', H,
    'In which model of replication does each daughter helix contain one old strand and one new strand?',
    'The semi-conservative model',
    ['The conservative model', 'M1'],
    ['The dispersive model', 'M1'],
    'M1 replication is semi-conservative and not conservative or dispersive, re-asked as which model gives one old and one new strand'),
  card('bio.mol.transcription', 'fill_blank', H,
    'What does RNA polymerase bind to in order to start transcribing a gene?',
    'A promoter, a DNA sequence marking the start of the gene',
    ['The ribosome binding site found on the finished mRNA after processing', ''],
    ['The origin of replication on the chromosome', ''],
    'RNA polymerase binds a promoter, re-asked as what it binds to start transcription'),
  card('bio.mol.translation-genetic-code', 'fill_blank', H,
    'What signals the ribosome to stop translating?',
    'A stop codon (UAA, UAG or UGA), which has no matching tRNA',
    ['The start codon AUG appearing a second time', ''],
    ['Nothing: translation stops when the ribosome simply runs out of mRNA', 'M2'],
    'M2 translation ends at a stop codon and not by running out of codons, re-asked as what signals the stop'),
]

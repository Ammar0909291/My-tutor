/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 2 (bio.cell and bio.mol part 2, 17 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds short_answer, mcq and misconception_probe probes at its own band (cell-signalling and enzymes need two cards), so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
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

export const BIOLOGY_CARD_DEPTH_BATCH_2: SeedProbe[] = [
  card('bio.cell.cell-signalling', 'step_check', H,
    'A water-soluble peptide hormone reaches its target cell. What does the hormone molecule itself do?',
    'It binds a surface receptor and never enters the cell',
    ['It crosses the membrane and switches on enzymes inside the cell directly', 'M1'],
    ['It is split at the membrane, and one fragment enters to start the response', ''],
    'M1 hormones do not all enter the cell, re-asked for a water-soluble peptide hormone'),
  card('bio.cell.cell-signalling', 'fill_blank', H,
    'A growth factor can act on the cell that released it, on its neighbours or on distant cells. What decides the type of signalling?',
    'How far the signal travels: to the cell itself, to neighbours or to distant cells',
    ['Which molecule it is: each molecule has one fixed signalling type', 'M2'],
    ['Whether its receptor lies on the surface or inside the cell', ''],
    'M2 the type of signalling follows the travel path, re-asked with one growth factor'),
  card('bio.cell.cell-cycle', 'step_check', H,
    'A G1 cell and a G2 cell from the same tissue are compared. Which one holds the doubled amount of DNA?',
    'The G2 cell: DNA is copied in S phase, between the two',
    ['The G1 cell: DNA is copied while the cell grows in G1', 'M2'],
    ['Neither: interphase is only a resting period, so the amount stays the same', 'M1'],
    'M1 and M2 interphase is active and DNA is copied in S phase, re-asked with G1 and G2 cells'),
  card('bio.cell.mitosis', 'step_check', H,
    'A mitotic division in a cell with 8 chromosomes gives two daughter cells. How many chromosomes does each one receive?',
    '8: each daughter receives a complete, identical set of the parent cell\'s chromosomes',
    ['4, because every division halves the chromosome number', 'M1'],
    ['16, because the chromosomes are copied and then never separated', ''],
    'M1 mitosis does not halve the chromosome number, re-asked with an 8-chromosome cell'),
  card('bio.cell.meiosis', 'step_check', H,
    'Which chromosome copies are pulled to opposite poles at anaphase I of meiosis?',
    'The two homologous chromosomes of each pair',
    ['The two sister chromatids of each chromosome, as in mitosis', 'M2'],
    ['None yet; meiosis II is the division that halves the number', 'M1'],
    'M1 and M2 meiosis I is the reductional division and separates homologs, re-asked at anaphase I'),
  card('bio.cell.apoptosis', 'step_check', U,
    'A cell with irreparable DNA damage activates its caspases, shrinks and breaks into membrane-bound bodies that phagocytes remove. What happens to the surrounding tissue?',
    'It is not inflamed, because the contents never spill out',
    ['It becomes inflamed, since this is the same process as necrosis', 'M2'],
    ['It is damaged, since any cell death harms the organism', 'M1'],
    'M1 and M2 apoptosis is controlled and non-inflammatory unlike necrosis, re-asked with an apoptotic cell'),
  card('bio.mol.biomolecule-types', 'step_check', H,
    'Which statement about lipids is accurate?',
    'They are not true polymers, and they build membranes as well as storing energy',
    ['They are only a store of energy and play no structural role in cells', 'M1'],
    ['They are polymers built from one repeating monomer, like proteins', ''],
    'M1 lipids are not only energy storage, re-asked as an accuracy check'),
  card('bio.mol.carbohydrates-lipids', 'step_check', H,
    'In a potato plant one polysaccharide is stored as an energy reserve and another forms the cell walls. Which pairing is correct?',
    'Starch is the reserve; cellulose forms the walls',
    ['Cellulose is the reserve; starch forms the walls', 'M2'],
    ['Glycogen is the reserve; chitin forms the walls', ''],
    'M2 cellulose and not starch is structural, re-asked with a potato plant'),
  card('bio.mol.proteins-structure', 'step_check', H,
    'Egg white turns from clear to solid white when it is cooked. Which level of protein structure is still unchanged?',
    'Primary structure: the amino acid sequence stays the same',
    ['None: cooking breaks the peptide bonds and destroys the sequence', 'M1'],
    ['Quaternary structure, because it is the most stable and complex level', ''],
    'M1 denaturation does not destroy the amino acid sequence, re-asked with cooked egg white'),
  card('bio.mol.nucleic-acid-structure', 'step_check', H,
    'A DNA strand reads 5′-ATGC-3′. Which sequence is the complementary strand, written 5′ to 3′?',
    '5′-GCAT-3′, the complement read in the opposite direction',
    ['5′-TACG-3′, the complement written in the same direction', ''],
    ['5′-UACG-3′, the complement with uracil in place of thymine', ''],
    'base pairing and antiparallel strands, re-asked as a written complementary sequence'),
  card('bio.mol.enzymes', 'step_check', H,
    'A reaction runs in a test tube with a small amount of enzyme. After it finishes, what has happened to the enzyme?',
    'It is unchanged and can catalyse the reaction again',
    ['It is used up and must be replaced for the next reaction', 'M2'],
    ['It is permanently converted into the product', ''],
    'M2 enzymes are not consumed, re-asked after a finished test-tube reaction'),
  card('bio.mol.enzymes', 'fill_blank', H,
    'Adding much more substrate does not restore the rate of a reaction slowed by an inhibitor. Which kind of inhibitor is most likely?',
    'Noncompetitive: it binds away from the active site, so extra substrate cannot outcompete it',
    ['Competitive: it blocks the active site, so more substrate cannot displace it', 'M1'],
    ['Neither: an inhibitor acts only on the substrate, never on the enzyme', ''],
    'M1 competitive and noncompetitive inhibition differ, re-asked with an extra-substrate test'),
  card('bio.mol.dna-replication', 'step_check', H,
    'In the Meselson-Stahl experiment, DNA labelled with heavy nitrogen replicates once in light nitrogen. What density do the daughter molecules show?',
    'Intermediate: one heavy original strand, one light new strand',
    ['Light: every strand is newly made, so no heavy nitrogen is left in the DNA', 'M1'],
    ['Half heavy and half light: the original helix stays whole', ''],
    'M1 replication is semi-conservative, re-asked with the Meselson-Stahl result'),
  card('bio.mol.transcription', 'step_check', H,
    'A cell needs a lot of one enzyme but little of the others. How does transcription make this possible?',
    'It copies only that one gene, and can repeat this on demand for as long as needed',
    ['It copies the whole genome each time and keeps only what is needed', ''],
    ['It happens once per cell, so the enzyme is made a single time', ''],
    'transcription is selective and repeatable, unlike whole-genome replication'),
  card('bio.mol.translation-genetic-code', 'step_check', H,
    'Leucine is specified by six different codons. What does this show about the genetic code?',
    'It is degenerate: several codons can code for one amino acid',
    ['It is error-prone: one codon is sometimes read as different amino acids', 'M1'],
    ['It is not universal: each species uses its own codon for leucine', ''],
    'M1 degenerate does not mean faulty, re-asked with leucine\'s six codons'),
  card('bio.mol.gene-regulation', 'step_check', U,
    'A liver cell and a muscle cell in the same person share one genome. What makes them different?',
    'They express different subsets of the same genes',
    ['Epigenetic marks have rewritten the DNA sequence of each cell type', 'M1'],
    ['Each cell type has lost the genes it does not need', ''],
    'M1 regulation does not change the DNA sequence, re-asked with liver and muscle cells'),
  card('bio.mol.epigenetics', 'step_check', U,
    'A gene is silenced by methyl groups added to cytosines at its CpG sites. What has changed?',
    'Its expression has changed, but its base sequence has not',
    ['Its base sequence has been permanently rewritten', 'M1'],
    ['Nothing: methylation cannot affect how a gene is expressed', ''],
    'M1 epigenetic marks do not alter the DNA sequence, re-asked with CpG methylation'),
]

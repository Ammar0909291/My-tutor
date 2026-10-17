/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 11 (bio.plant, bio.cell, bio.mol, bio.micro, bio.immuno and bio.gen, facet cards, 21 cards).
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

export const BIOLOGY_DEPTH_BATCH_11: SeedProbe[] = [
  card('bio.plant.seed-germination-dormancy', 'fill_blank', H,
    'Which part of a seed is the developing young plant itself?',
    'The embryo',
    ['The seed coat, which protects the seed', ''],
    ['The endosperm, which stores food for the seedling', ''],
    'the embryo is the young plant, re-asked as which part of a seed is the plant'),
  card('bio.plant.plant-biotechnology-applications', 'fill_blank', H,
    'Why can a single carrot cell grow into a whole plant in tissue culture?',
    'Many plant cells are totipotent',
    ['Plant cells never differentiate in the first place', ''],
    ['Marker-assisted selection inserts the missing genes first', 'M2'],
    'M2 marker-assisted breeding is not genetic engineering and tissue culture relies on totipotency, re-asked with a carrot cell'),
  card('bio.plant.phytochrome-photoperiodic-flowering', 'fill_blank', H,
    'Which light converts phytochrome from the inactive Pr form to the active Pfr form?',
    'Red light',
    ['Far-red light, which converts Pfr back to Pr', ''],
    ['Blue light only', ''],
    'Pr absorbs red light and becomes Pfr, re-asked as which light activates phytochrome'),
  card('bio.cell.cytoskeleton-motility', 'fill_blank', H,
    'How does a crawling cell extend its leading edge?',
    'Actin polymerises at the front and pushes the membrane forward',
    ['It contracts uniformly like a muscle fibre, shortening the whole cell', 'M1'],
    ['Its microtubules shorten and pull the front forward', ''],
    'M1 actin-myosin cell crawling does not work like muscle contraction, re-asked as how a crawling cell moves'),
  card('bio.cell.membrane-transport-energetics', 'fill_blank', H,
    'What defines primary active transport?',
    'It uses ATP directly to move a substance against its gradient',
    ['It needs no energy, because no ATP is used directly', 'M2'],
    ['It is any transport that involves a membrane protein', 'M1'],
    'M1 and M2 transport is classified by energetics, re-asked as what defines primary active transport'),
  card('bio.cell.anaerobic-respiration-fermentation', 'fill_blank', H,
    'What are the end products of alcoholic fermentation?',
    'Ethanol and carbon dioxide',
    ['Lactic acid only', ''],
    ['Acetic acid and water', ''],
    'alcoholic fermentation yields ethanol and CO2, re-asked as what its end products are'),
  card('bio.mol.metabolic-regulation-integration', 'fill_blank', H,
    'How does allosteric regulation of an enzyme work?',
    'A regulator binds a site other than the active site and alters activity',
    ['A regulator binds the active site and competes directly with the substrate for it', ''],
    ['Any product of the cell can inhibit any enzyme in the cell', 'M1'],
    'M1 feedback inhibition is specific and not any product on any enzyme, re-asked as how allosteric regulation works'),
  card('bio.mol.protein-quality-control-autophagy', 'fill_blank', H,
    'What do lysosomes do in macroautophagy?',
    'Break down engulfed cell components',
    ['They act as the proteasome and tag proteins with ubiquitin', 'M2'],
    ['They fold newly made proteins into shape', ''],
    'M2 the quality-control systems are distinct, re-asked as what lysosomes do in macroautophagy'),
  card('bio.cell.cell-junctions-extracellular-matrix', 'fill_blank', H,
    'Does the extracellular matrix only provide structure?',
    'No: it also signals to cells through receptors such as integrins',
    ['Yes: it is passive structural filler with no signalling role at all', 'M2'],
    ['No: it is made entirely of living cells', ''],
    'M2 the extracellular matrix has a signalling role, re-asked as whether it only gives structure'),
  card('bio.mol.alternative-splicing-rna-diversity', 'fill_blank', H,
    'What is removed from a pre-mRNA during splicing?',
    'Introns',
    ['Exons, which are discarded', 'M1'],
    ['The 5′ cap and poly-A tail', ''],
    'M1 exons are retained and introns removed, re-asked as what is removed during splicing'),
  card('bio.sys.quantitative-systems-modeling', 'fill_blank', H,
    'What does an ODE model of gene expression describe?',
    'How concentrations change over time',
    ['Which genes are present in the genome', ''],
    ['A topic that is unrelated to network motifs', 'M1'],
    'M1 ODE models extend the qualitative motif descriptions, re-asked as what an ODE model describes'),
  card('bio.cell.cell-adhesion-tissue-organization', 'fill_blank', H,
    'Which adhesion molecules join neighbouring cells to each other in a tissue?',
    'Cadherins',
    ['Integrins, which anchor cells to the extracellular matrix', 'M1'],
    ['Selectins, which cause white blood cells to roll along vessel walls', ''],
    'M1 cadherins, selectins and integrins are not interchangeable, re-asked as which join cells to each other'),
  card('bio.mol.chromatin-structure-genome-organization', 'fill_blank', H,
    'What is a topologically associating domain (TAD)?',
    'A genome region whose DNA interacts mostly with itself',
    ['An epigenetic chemical mark placed on histones or on the DNA', 'M2'],
    ['A type of histone in the nucleosome', ''],
    'M2 3D genome architecture is not the same as epigenetic marks, re-asked as what a TAD is'),
  card('bio.micro.microbial-metabolism-diversity', 'fill_blank', H,
    'What is anoxygenic photosynthesis?',
    'Light-driven carbon fixation that does not release oxygen',
    ['Not photosynthesis, since photosynthesis always releases oxygen', 'M1'],
    ['Respiration that takes place without any oxygen', ''],
    'M1 not all photosynthesis releases oxygen, re-asked as what anoxygenic photosynthesis is'),
  card('bio.cell.cancer-biology-hallmarks', 'fill_blank', H,
    'Why is cancer usually not caused by one single change?',
    'It needs several hallmark capabilities to be acquired together',
    ['One hallmark is enough to give a fully malignant cancer on its own', 'M1'],
    ['Cancer is caused only by infection with viruses', ''],
    'M1 a single hallmark is not sufficient for malignancy, re-asked as why cancer needs more than one change'),
  card('bio.micro.archaea-extremophiles', 'fill_blank', H,
    'What is an extremophile?',
    'An organism adapted to live in extreme conditions such as heat, salt or acid',
    ['Any bacterium in an extreme habitat, which would make all archaea bacteria', 'M1'],
    ['Any microbe that causes disease in humans', ''],
    'M1 archaea are not just extreme bacteria, re-asked as what an extremophile is'),
  card('bio.micro.human-microbiome-detail', 'fill_blank', H,
    'Which is a role of the gut microbiome?',
    'Producing nutrients such as short-chain fatty acids from fibre',
    ['Causing disease whenever any gut bacterium is present', ''],
    ['Digesting the person\'s own gut lining tissue to release nutrients', ''],
    'the microbiome has metabolic, immune and signalling roles, re-asked as which is a role of the gut microbiome'),
  card('bio.eco.microbial-ecology', 'fill_blank', H,
    'Which processes do microbes drive in the nitrogen cycle?',
    'Nitrogen fixation, nitrification and denitrification',
    ['Photosynthesis in the leaves of plants', ''],
    ['Lipid synthesis in animal cells', ''],
    'microbes are the principal drivers of biogeochemical cycling, re-asked as which nitrogen-cycle processes they drive'),
  card('bio.immuno.cytokines-immune-signaling', 'fill_blank', H,
    'What are cytokines?',
    'Small signalling proteins that coordinate immune responses',
    ['Antibodies that kill pathogens directly', ''],
    ['Exotic molecules found only in a cytokine storm', 'M2'],
    'M2 a cytokine storm uses ordinary cytokines, re-asked as what cytokines are'),
  card('bio.micro.antimicrobial-resistance', 'fill_blank', H,
    'How does a beta-lactamase protect a bacterium?',
    'It enzymatically destroys the antibiotic',
    ['It pumps the drug out of the cell', ''],
    ['It mutates the bacterium in response to the drug', 'M1'],
    'M1 antibiotics do not cause resistance mutations, re-asked as how a beta-lactamase protects a bacterium'),
  card('bio.gen.quantitative-genetics-heritability', 'fill_blank', H,
    'Why do polygenic traits such as height show a continuous range of values?',
    'Many genes each add a small effect, together with the environment',
    ['A single gene with two alleles controls the trait', ''],
    ['Heritability says how much of each person\'s height is genetic', 'M1'],
    'M1 heritability describes populations and not individuals, re-asked as why polygenic traits are continuous'),
]

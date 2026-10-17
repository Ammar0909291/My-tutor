/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 5 (bio.mol, bio.physio and bio.gen, facet cards, 18 cards).
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

export const BIOLOGY_DEPTH_BATCH_5: SeedProbe[] = [
  card('bio.mol.gene-regulation', 'fill_blank', U,
    'In the lac operon, what does lactose do when it is present?',
    'It binds the repressor, which lets RNA polymerase transcribe the operon',
    ['It destroys the repressor gene permanently', ''],
    ['It binds the promoter and blocks RNA polymerase', ''],
    'lactose inactivates the repressor, re-asked as what lactose does when present'),
  card('bio.mol.epigenetics', 'fill_blank', U,
    'What does adding acetyl groups to histones do to chromatin?',
    'It loosens chromatin, making genes easier to transcribe',
    ['It condenses chromatin and silences the genes', ''],
    ['It changes the DNA sequence, so different cell types carry different DNA', 'M2'],
    'M2 cell types differ in expression and not in DNA, re-asked about histone acetylation'),
  card('bio.mol.noncoding-rna', 'fill_blank', U,
    'Which RNA acts as the amino-acid adaptor in translation and is never itself translated?',
    'tRNA',
    ['mRNA, which carries the codons to the ribosome', ''],
    ['miRNA, which binds mRNA to suppress it', ''],
    'tRNA is a non-coding RNA, re-asked as which RNA is the adaptor'),
  card('bio.mol.signal-transduction-pathways', 'fill_blank', U,
    'Which order correctly lists the three stages of signal transduction?',
    'Reception, transduction, response',
    ['Transduction, reception, response', ''],
    ['Response, transduction, reception', ''],
    'signal transduction runs reception, transduction, response, re-asked as the correct order'),
  card('bio.mol.dna-damage-repair', 'fill_blank', U,
    'Roughly how many DNA lesions does each cell sustain per day?',
    'About 10,000 — damage is a routine condition of being alive',
    ['Almost none, since damage needs radiation or toxic chemicals', 'M1'],
    ['About one, so repair is rarely needed', ''],
    'M1 mutations do not come only from radiation and chemicals, re-asked as how many lesions a cell sustains'),
  card('bio.mol.bioenergetics', 'fill_blank', U,
    'Why is ATP called the universal energy currency of the cell?',
    'Its hydrolysis releases free energy that cells couple to many energy-requiring reactions',
    ['It lets cells create order in violation of the second law of thermodynamics', 'M1'],
    ['It is the only molecule in the cell that contains any energy', ''],
    'M1 living cells do not violate the second law, re-asked as why ATP is the energy currency'),
  card('bio.physio.respiratory-system', 'fill_blank', H,
    'When the diaphragm contracts and flattens, what happens to the air in the chest?',
    'The chest volume increases, so the pressure falls and air flows in',
    ['The lungs actively suck the air in like a pump, whatever the pressure', 'M2'],
    ['The pressure rises, which pushes the air in', ''],
    'M2 the lungs do not actively expand to pull air in, re-asked about a contracting diaphragm'),
  card('bio.physio.circulatory-system', 'fill_blank', H,
    'Which loop carries blood from the right ventricle to the lungs?',
    'The pulmonary circulation, through the pulmonary arteries',
    ['The systemic circulation, through the aorta', ''],
    ['Neither: four chambers simply pump a larger volume around one loop', 'M2'],
    'M2 the four chambers serve double circulation and not a larger volume, re-asked as which loop reaches the lungs'),
  card('bio.physio.immune-system-intro', 'fill_blank', H,
    'Which statement describes innate immunity?',
    'It responds within minutes to hours, and in the same way to any pathogen',
    ['It is specific to one pathogen and builds memory', ''],
    ['It needs a previous infection before it can work', ''],
    'innate immunity is fast and non-specific, re-asked as which statement describes it'),
  card('bio.physio.digestive-system', 'fill_blank', H,
    'Chewing and the churning of the stomach are which kind of digestion?',
    'Mechanical, which increases the surface area for enzymes',
    ['Chemical digestion, because they break chemical bonds in the food', 'M1'],
    ['Absorption, because they move the food into the blood', 'M2'],
    'M1 and M2 mechanical digestion is not chemical digestion or absorption, re-asked with chewing and churning'),
  card('bio.physio.nervous-system', 'fill_blank', H,
    'Which part of the nervous system is made of the brain and the spinal cord?',
    'The central nervous system',
    ['The peripheral nervous system, which links the body to the brain', ''],
    ['The autonomic nervous system, which controls involuntary actions', ''],
    'the central nervous system integrates information and generates responses, re-asked as which part is brain plus spinal cord'),
  card('bio.physio.endocrine-system', 'fill_blank', H,
    'Which gland is called the master gland because it regulates other endocrine glands?',
    'The pituitary',
    ['The pancreas, which makes insulin and glucagon', ''],
    ['The thyroid, which makes thyroxine', ''],
    'the pituitary regulates other endocrine glands, re-asked as which gland is the master gland'),
  card('bio.physio.excretory-system', 'fill_blank', H,
    'Glucose is filtered into the nephron tubule. What happens to it as the filtrate passes along?',
    'It is reabsorbed into the blood, so healthy urine contains none',
    ['It never enters the tubule, because the glomerulus filters out glucose', 'M1'],
    ['It passes into the urine in small amounts', ''],
    'M1 the glomerulus does filter glucose and the tubule reabsorbs it, re-asked as what happens to filtered glucose'),
  card('bio.physio.musculoskeletal-system', 'fill_blank', H,
    'Which two cell types remodel bone throughout life?',
    'Osteoblasts build bone and osteoclasts break it down',
    ['Osteocytes build bone and chondrocytes break it down', ''],
    ['Only osteoblasts, since bone is non-living once it has formed', ''],
    'bone is living tissue remodelled by two opposing cell types, re-asked as which cells remodel bone'),
  card('bio.gen.mendelian-genetics', 'fill_blank', H,
    'A pea plant has the genotype Tt and is tall. What do "Tt" and "tall" each describe?',
    '"Tt" is its genotype and "tall" is its phenotype',
    ['"Tt" is its phenotype and "tall" is its genotype', ''],
    ['"Tt" is the dominant allele, which is the more common allele', 'M1'],
    'M1 dominant does not mean common, re-asked with a Tt plant'),
  card('bio.gen.gene-interactions', 'fill_blank', H,
    'A red-flowered snapdragon is crossed with a white-flowered one, and all offspring are pink. Which pattern is this?',
    'Incomplete dominance: the heterozygote is an intermediate blend',
    ['Codominance: both parental colours show separately in each flower', ''],
    ['Complete dominance: red hides white', ''],
    'incomplete dominance gives an intermediate phenotype, re-asked with snapdragons'),
  card('bio.gen.chromosomal-theory-linkage', 'fill_blank', H,
    'What did Sutton and Boveri propose?',
    'Genes lie on chromosomes, whose behaviour in meiosis explains Mendel\'s patterns',
    ['Genes are independent of chromosomes and float free in the nucleus', ''],
    ['Males are generally more vulnerable to inherited conditions', 'M1'],
    'M1 male vulnerability is specific to X-linked recessive conditions, re-asked as what Sutton and Boveri proposed'),
  card('bio.gen.pedigree-human-genetics', 'fill_blank', H,
    'In a pedigree chart, what do shaded squares and circles represent?',
    'Affected individuals: squares are males and circles are females',
    ['Carriers only, whatever their sex', ''],
    ['Individuals who have died', ''],
    'shaded symbols mark affected individuals, re-asked as what shaded squares and circles represent'),
]

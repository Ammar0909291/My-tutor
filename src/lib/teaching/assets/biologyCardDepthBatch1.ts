/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 1 (bio.found and bio.cell part 1, 18 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds short_answer, mcq and misconception_probe probes at its own band (the characteristics-of-life concept needs two cards), so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
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

export const BIOLOGY_CARD_DEPTH_BATCH_1: SeedProbe[] = [
  card('bio.found.what-is-biology', 'step_check', H,
    'How are the branches of biology (botany, zoology, microbiology, ecology) best understood?',
    'As different angles on the same object, life, often needed together',
    ['As separate subjects that share nothing but a set of names to memorise', 'M1'],
    ['As a fixed ranking in which one branch outranks all the others', ''],
    'M1 biology is reasoning and not memorising, re-asked about its branches'),
  card('bio.found.characteristics-of-life', 'step_check', H,
    'A worker bee is sterile and never reproduces. Is it alive?',
    'Yes: reproduction is needed by the lineage, not by each individual',
    ['No: reproduction is essential to life, so an organism that cannot reproduce is not alive', 'M2'],
    ['Only while it is growing, and not once growth has stopped', ''],
    'M2 a sterile individual is still alive, re-asked with a worker bee'),
  card('bio.found.characteristics-of-life', 'fill_blank', H,
    'Complete the sentence: fire is not alive because it lacks ____.',
    'cells, homeostasis and heredity, not cells alone',
    ['cells only, since all of the other characteristics of life apply to it', 'M1'],
    ['the release of energy, which every living thing must show', ''],
    'M1 one missing property is not the whole answer, re-asked as a completion'),
  card('bio.found.classification-need', 'step_check', H,
    'Why do scientists place two organisms close together in the classification hierarchy?',
    'It is a testable hypothesis of shared ancestry and shared biology',
    ['It is a convenient label, chosen for their outward similarity', 'M1'],
    ['Because they share the same common name in everyday speech', ''],
    'M1 classification reflects evolutionary relationships, re-asked as why organisms are grouped'),
  card('bio.found.binomial-nomenclature', 'step_check', H,
    'Which of these is a complete scientific name: sapiens, Homo, or Homo sapiens?',
    'Homo sapiens: the genus and the species together',
    ['sapiens, since the species name alone is enough', 'M1'],
    ['Homo, since the genus identifies the species', ''],
    'M1 a binomial has two parts, re-asked with three candidates'),
  card('bio.found.five-kingdom', 'step_check', H,
    'A multicellular, non-photosynthetic organism with a cell wall absorbs its food from its surroundings. Which kingdom is it?',
    'Fungi: multicellular heterotrophs that absorb their food',
    ['Plantae, since fungi are simply plants that are not green', 'M1'],
    ['Animalia, since it takes in food from outside itself', ''],
    'M1 fungi are not non-green plants, re-asked with nutrition and body plan'),
  card('bio.found.microscopy-basics', 'step_check', H,
    'A light-microscope image is blurry at 400×. What does adding lenses to reach 1500× do?',
    'It only enlarges the blur, because resolution and not magnification limits the detail',
    ['It reveals finer detail, since higher magnification always shows more', 'M1'],
    ['It sharpens the image, since enlargement spreads the dots further apart so each is easier to see', ''],
    'M1 magnification is not resolution, re-asked with 400× and 1500×'),
  card('bio.found.biomes-levels-of-organisation', 'step_check', H,
    'Which group is a population: all the wolves in a forest, or all the wolves, deer and oaks in it?',
    'All the wolves: one species in one place; the mixed group is a community',
    ['Both are populations, because "community" is only the name for a bigger population', 'M1'],
    ['Neither: only a whole biome can be a population', ''],
    'M1 a population is one species, re-asked with wolves, deer and oaks'),
  card('bio.found.viruses-viroids-lichens', 'step_check', H,
    'How is a virus particle that sits outside any host cell best described?',
    'An inert particle with no metabolism of its own',
    ['A living organism, since it can reproduce', 'M1'],
    ['A tiny single cell with a very thin wall', ''],
    'M1 viruses are not independently alive, re-asked about a particle outside a host'),
  card('bio.cell.cell-theory', 'step_check', H,
    'Who showed in 1839 that animals, as well as plants, are built from cells?',
    'Theodor Schwann, extending Schleiden\'s result for plants',
    ['Matthias Schleiden, who had studied animals first', 'M2'],
    ['Robert Hooke, who named cells in cork', ''],
    'M2 Schleiden, Schwann and Virchow made different contributions, re-asked with Schwann'),
  card('bio.cell.prokaryotic-cell', 'step_check', H,
    'Where is the DNA of a bacterium found?',
    'As a single circular chromosome in the nucleoid, in the cytoplasm',
    ['Nowhere: bacteria have no nucleus and so have no genetic material', 'M1'],
    ['Inside a membrane-bound nucleus that is smaller than ours', ''],
    'M1 bacteria have DNA without a nucleus, re-asked as where it is found'),
  card('bio.cell.eukaryotic-cell', 'step_check', H,
    'Under a microscope, a slice of green leaf and a slice of white potato tuber are compared. Which one shows chloroplasts?',
    'The leaf only: the tuber grows in the dark, with no chloroplasts',
    ['Both do, since every cell of a plant contains chloroplasts', 'M1'],
    ['Neither does, since chloroplasts occur only in algae and not in plants', ''],
    'M1 not all plant cells photosynthesise, re-asked with a leaf and a tuber'),
  card('bio.cell.cell-membrane-transport', 'step_check', H,
    'Glucose enters a cell through a carrier protein, down its gradient, without using ATP. What is this process?',
    'Facilitated diffusion',
    ['Osmosis, which describes any substance crossing a membrane', 'M1'],
    ['Active transport, because carrier proteins always use ATP', 'M2'],
    'M1 and M2 osmosis is water only and facilitated diffusion is passive, re-asked with glucose'),
  card('bio.cell.nucleus-chromosomes', 'step_check', H,
    'A human chromosome in a G1 cell, before DNA replication, has how many chromatids?',
    'One: it only has two after S phase',
    ['Two sister chromatids, by definition', 'M1'],
    ['Four, because the cell is diploid', ''],
    'M1 a chromosome has two chromatids only after replication, re-asked for G1'),
  card('bio.cell.mitochondria-energy', 'step_check', H,
    'Mitochondria are often said to "make energy". What is more accurate?',
    'They convert energy stored in food molecules into ATP; energy is not created',
    ['They generate brand-new energy from ADP and phosphate, which the cell then spends', 'M1'],
    ['They store sunlight until the cell needs it', ''],
    'M1 mitochondria do not create energy, re-asked as what is more accurate'),
  card('bio.cell.chloroplast-structure', 'step_check', H,
    'A plant is given water containing heavy oxygen (¹⁸O). In which product does the ¹⁸O appear?',
    'The oxygen gas released, since it comes from the splitting of water',
    ['It never reaches the released O₂, because that gas is made from the CO₂ the leaf takes in', 'M1'],
    ['Only in the glucose that the plant makes', ''],
    'M1 the oxygen released comes from water, re-asked with a labelled-oxygen experiment'),
  card('bio.cell.endomembrane-system', 'step_check', H,
    'Where are proteins that stay in the cytosol made?',
    'On free ribosomes in the cytosol',
    ['On the rough ER, since all protein synthesis needs it', 'M1'],
    ['In the Golgi apparatus, which assembles all proteins', ''],
    'M1 not all proteins are made on the rough ER, re-asked as where cytosolic proteins are made'),
  card('bio.cell.cytoskeleton', 'step_check', H,
    'How does the cytoskeleton change when a cell divides?',
    'It reorganises: microtubules form the spindle and then break down again',
    ['It stays a rigid, fixed frame that never changes', 'M1'],
    ['It disappears completely and is rebuilt only after the cell has died', ''],
    'M1 the cytoskeleton is dynamic, re-asked during cell division'),
]

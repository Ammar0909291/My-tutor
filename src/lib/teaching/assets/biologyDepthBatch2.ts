/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 2 (bio.cell, bio.gen, bio.immuno, bio.eco, bio.behav and bio.bioinfo, facet cards, 14 cards).
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

export const BIOLOGY_DEPTH_BATCH_2: SeedProbe[] = [
  card('bio.cell.mitochondria-energy', 'fill_blank', H,
    'What does folding the inner mitochondrial membrane into cristae achieve?',
    'It increases the surface area available for ATP synthesis',
    ['It makes the matrix larger so that more ATP can be stored', ''],
    ['It creates the site of the Krebs cycle enzymes', 'M2'],
    'M2 the Krebs cycle is in the matrix and not on the inner membrane, re-asked about the purpose of cristae'),
  card('bio.cell.chloroplast-structure', 'fill_blank', H,
    'Where in a chloroplast are chlorophyll and the other photosynthetic pigments embedded?',
    'In the thylakoid membranes, stacked into grana',
    ['Dissolved in the stroma, where the Calvin cycle also runs', 'M2'],
    ['In the outer membrane of the chloroplast', ''],
    'M2 the light reactions and the Calvin cycle occur in different places, re-asked as where the pigments sit'),
  card('bio.cell.endomembrane-system', 'fill_blank', H,
    'A cell makes large amounts of steroid hormones. Which organelle is most expanded?',
    'The smooth ER, which makes lipids such as steroids',
    ['The rough ER, since all synthesis in the cell needs ribosomes attached to the ER', 'M1'],
    ['The lysosomes, which sort and dispatch the hormones', 'M2'],
    'M1 and M2 not all synthesis is on the rough ER and lysosomes do not dispatch products, re-asked with steroid synthesis'),
  card('bio.cell.cytoskeleton', 'fill_blank', H,
    'Which filaments pinch a dividing animal cell in two at the end of mitosis?',
    'Actin microfilaments, forming a contractile ring',
    ['Microtubules, forming the spindle fibres', ''],
    ['Intermediate filaments, forming the nuclear lamina', ''],
    'cytokinesis is driven by actin microfilaments, re-asked as which filaments divide the cell'),
  card('bio.gen.conservation-genetics', 'fill_blank', H,
    'A small population has very low genetic diversity. Why is it more at risk if a new disease arrives?',
    'Less variation means fewer individuals are likely to carry resistance',
    ['Nothing changes, because the head count alone decides how vulnerable it is', 'M1'],
    ['Low diversity raises the mutation rate, so the disease evolves faster', ''],
    'M1 census size does not decide genetic vulnerability, re-asked with a new disease'),
  card('bio.immuno.t-cell-development-tolerance', 'fill_blank', H,
    'Why is negative selection in the thymus important?',
    'It removes T cells that bind self-antigens too strongly, preventing autoimmunity',
    ['It removes T cells that cannot bind self-MHC at all', 'M1'],
    ['It removes T cells that bind foreign antigens too strongly', ''],
    'M1 negative selection tests strong self-binding and positive selection tests self-MHC recognition, re-asked as why negative selection matters'),
  card('bio.eco.population-growth-models-quantitative', 'fill_blank', H,
    'A population with r = 0.5 is far below its carrying capacity K. How does it grow?',
    'Almost exponentially, since the factor (1 − N/K) is close to 1',
    ['More slowly, for reasons not tied to the terms of the model', 'M1'],
    ['Linearly, adding a fixed number of individuals each year', ''],
    'M1 logistic slowing is tied to the (1 − N/K) term, re-asked far below K'),
  card('bio.behav.mating-systems-sexual-selection', 'fill_blank', H,
    'In many species males are larger or more colourful than females. Which process mainly explains this?',
    'Sexual selection acting on traits that help in obtaining mates',
    ['Natural selection acting only on survival', ''],
    ['It cannot be explained, since traits that reduce survival are never favoured', 'M1'],
    'M1 a trait that lowers survival can still be favoured, re-asked with male size and colour'),
  card('bio.bioinfo.genome-sequencing-technologies', 'fill_blank', H,
    'In Sanger sequencing, what makes copied fragments stop at every possible position?',
    'Chain-terminating nucleotides that block further extension',
    ['Restriction enzymes that cut the DNA at random positions', ''],
    ['The sequencer reading each base once and then stopping', ''],
    'Sanger sequencing relies on chain-terminating nucleotides, re-asked as what makes fragments stop'),
  card('bio.behav.social-behavior-eusociality', 'fill_blank', H,
    'Group living brings resource competition and disease spread. Why might a species still evolve to live in groups?',
    'When benefits such as predator defence outweigh the costs for that species\' ecology',
    ['Because group living is always better than living alone, whatever the ecology of the species', 'M1'],
    ['Because the costs do not exist at all in natural groups of animals', ''],
    'M1 group living is a trade-off and not simply beneficial, re-asked with competition and disease'),
  card('bio.bioinfo.comparative-genomics', 'fill_blank', H,
    'A human gene and its counterpart in mice descend from one gene in their common ancestor. What are they?',
    'Orthologs, separated by speciation',
    ['Paralogs, since they have similar sequences', 'M1'],
    ['Analogs, since they have the same function', ''],
    'M1 orthologs and paralogs are not classified by similarity alone, re-asked with a human and a mouse gene'),
  card('bio.eco.predator-prey-dynamics', 'fill_blank', H,
    'In the Lotka–Volterra model, prey rise while predators are few. What happens next?',
    'Predators increase, then prey decline, then predators decline',
    ['Prey keep rising until an outside disturbance stops them', 'M1'],
    ['Both populations stay constant from then on', ''],
    'M1 the cycles arise from the interaction and need no outside disturbance, re-asked as what follows rising prey'),
  card('bio.behav.kin-selection-altruism', 'fill_blank', H,
    'A helper pays a cost C = 2 to give a first cousin (r = 0.125) a benefit B = 5. Is helping favoured by Hamilton\'s rule?',
    'No: rB = 0.625, which is less than C = 2',
    ['Yes: B = 5 is greater than C = 2', 'M1'],
    ['Yes: cousins always count as close kin', ''],
    'M1 Hamilton\'s rule includes relatedness, re-asked with a first cousin'),
  card('bio.immuno.cancer-immunology-immunotherapy', 'fill_blank', H,
    'Tumour cells often display PD-L1. What does this achieve for the tumour?',
    'It binds PD-1 on T cells and switches them off, helping the tumour evade attack',
    ['It is the artificial receptor that CAR-T therapy adds to a patient\'s own T cells', 'M2'],
    ['It marks the tumour cell for destruction by T cells', ''],
    'M2 checkpoint signalling and CAR-T therapy are different, re-asked with PD-L1 on a tumour'),
]

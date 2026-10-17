/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 9 (bio.bioinfo, bio.dev, bio.found, bio.behav, bio.neuro and bio.div, facet cards, 18 cards).
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

export const BIOLOGY_DEPTH_BATCH_9: SeedProbe[] = [
  card('bio.bioinfo.phylogenetics-computational', 'fill_blank', U,
    'What is the first step in building a phylogenetic tree from molecular sequences?',
    'Align the sequences',
    ['Draw the tree by hand from the species names', ''],
    ['Count how many species are in the data set', ''],
    'phylogenetics builds on sequence alignment, re-asked as the first step of tree-building'),
  card('bio.bioinfo.structural-bioinformatics', 'fill_blank', U,
    'What is the Protein Data Bank (PDB)?',
    'A repository of experimentally determined structures',
    ['A database of AlphaFold2 predictions that replaces experiments', 'M1'],
    ['A database of DNA sequences from many genomes', ''],
    'M1 AlphaFold2 has not replaced experimental methods, re-asked as what the PDB is'),
  card('bio.dev.gametogenesis-fertilisation-dev', 'fill_blank', H,
    'How many functional sperm cells does one primary spermatocyte produce?',
    'Four',
    ['One, as in oogenesis', 'M2'],
    ['Two, since only the first division makes functional cells', ''],
    'M2 spermatogenesis completes both meiotic divisions, re-asked as how many sperm one spermatocyte makes'),
  card('bio.dev.morphogenesis-differentiation', 'fill_blank', U,
    'What is cell differentiation?',
    'Cells reading out different subsets of the same genome to become specialised',
    ['Cells losing the genes they no longer need, so that each type keeps only its own', 'M1'],
    ['Cells dividing again and again without changing', ''],
    'M1 differentiated cells keep their DNA, re-asked as what differentiation is'),
  card('bio.dev.stem-cells-regeneration', 'fill_blank', U,
    'Which stem cells can form every cell type of the body but not extra-embryonic tissue?',
    'Pluripotent stem cells',
    ['Multipotent stem cells, which make a limited range of cell types', 'M1'],
    ['Unipotent stem cells, which make a single cell type', ''],
    'M1 adult stem cells are not pluripotent, re-asked as which cells form every body cell type'),
  card('bio.found.scientific-method-in-biology', 'fill_blank', H,
    'What makes a hypothesis scientific?',
    'It makes a specific prediction that evidence could show to be wrong',
    ['It is already certain to be true', ''],
    ['It is a theory that is only an unproven guess', 'M1'],
    'M1 a scientific theory is not just a guess, re-asked as what makes a hypothesis scientific'),
  card('bio.found.unifying-themes-in-biology', 'fill_blank', H,
    'Which unifying theme does the keeping of a steady body temperature illustrate?',
    'Homeostasis',
    ['Evolution through natural selection', ''],
    ['The relationship between structure and function', ''],
    'homeostasis is one of the four unifying themes, re-asked with a steady body temperature'),
  card('bio.behav.innate-behavior-instinct', 'fill_blank', H,
    'What makes a fixed action pattern "fixed"?',
    'Once triggered, it runs to completion in the same stereotyped way',
    ['It happens spontaneously without any trigger', 'M1'],
    ['It is exactly the same thing as a reflex', 'M2'],
    'M1 and M2 a fixed action pattern needs a trigger and is not a reflex, re-asked as what makes it fixed'),
  card('bio.behav.animal-communication', 'fill_blank', H,
    'An ant leaves a trail that other ants follow. Which signal modality is this?',
    'Chemical (a pheromone)',
    ['Visual, since the ants see the trail', ''],
    ['Auditory, since the ants hear the trail', 'M2'],
    'M2 visual, auditory and chemical signals are not interchangeable, re-asked with an ant pheromone trail'),
  card('bio.neuro.brain-regional-organization', 'fill_blank', H,
    'Which structure belongs to the hindbrain?',
    'The cerebellum',
    ['The cerebral cortex, which belongs to the forebrain', 'M1'],
    ['The limbic system, a single compact structure', 'M2'],
    'M1 and M2 the divisions and lobes are not competing schemes and the limbic system is a network, re-asked as which structure is hindbrain'),
  card('bio.div.animal-body-plans-symmetry', 'fill_blank', H,
    'How many germ layers do triploblastic animals have?',
    'Three: ectoderm, mesoderm and endoderm',
    ['Two: ectoderm and endoderm only', ''],
    ['One: a single layer of cells', ''],
    'triploblastic animals have three germ layers, re-asked as how many layers they have'),
  card('bio.neuro.neurotransmitter-systems', 'fill_blank', H,
    'Where are neurotransmitters released?',
    'At the synapse, from the presynaptic terminal',
    ['Along the whole length of the axon at once', ''],
    ['From the dendrites directly into the blood', ''],
    'neurotransmitters are released at synapses, re-asked as where they are released'),
  card('bio.neuro.sensory-transduction', 'fill_blank', H,
    'What does a sensory receptor convert a stimulus into?',
    'A graded receptor potential, an electrical signal',
    ['A chemical signal that travels in the blood', ''],
    ['A larger action potential when the stimulus is stronger', 'M1'],
    'M1 a stronger stimulus does not give a bigger action potential, re-asked as what a receptor converts the stimulus into'),
  card('bio.div.invertebrate-diversity-major-phyla', 'fill_blank', H,
    'Which feature is characteristic of the phylum Cnidaria?',
    'Stinging cells (nematocysts) used to capture prey',
    ['True body segmentation along the length of the animal', ''],
    ['A body covered by a hard shell secreted by a mantle', 'M2'],
    'M2 each phylum has its own defining features, re-asked as which feature is characteristic of Cnidaria'),
  card('bio.neuro.neural-circuits-computation', 'fill_blank', H,
    'What is the role of inhibitory neurons in a circuit?',
    'They shape the computation, for example by sharpening contrast',
    ['They simply turn other neurons off and compute nothing', 'M1'],
    ['They speed up conduction along the axons they contact', ''],
    'M1 inhibition is an active computation and not just a brake, re-asked as the role of inhibitory neurons'),
  card('bio.neuro.vision-visual-system', 'fill_blank', H,
    'Which structure of the eye provides most of its focusing power?',
    'The cornea',
    ['The lens, which fine-tunes focus for different distances', ''],
    ['The retina, which contains the photoreceptors', ''],
    'the cornea gives most of the focusing power and the lens fine-tunes it, re-asked as which structure focuses most'),
  card('bio.div.arthropod-diversity', 'fill_blank', H,
    'Which arthropod class has six legs and three body parts?',
    'Insecta',
    ['Arachnida, with eight legs and two body parts', ''],
    ['Crustacea, with a pair of legs on most segments', ''],
    'arthropod classes are distinguished by anatomy, re-asked as which class has six legs and three body parts'),
  card('bio.neuro.learning-memory-neurobiology', 'fill_blank', H,
    'What does long-term depression (LTD) do?',
    'It weakens the particular synapse that was active',
    ['It lowers the excitability of the whole neuron', 'M1'],
    ['It removes the neuron from the circuit', ''],
    'M1 LTP and LTD change individual synapses and not the whole neuron, re-asked as what LTD does'),
]

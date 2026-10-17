/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 7 (bio.dev, bio.found, bio.behav, bio.neuro and bio.div part 7, 20 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds mcq, misconception_probe and short_answer probes at its own band, so the new cards take the FREE slot step_check at that band (the kind is only a slot label).
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

export const BIOLOGY_CARD_DEPTH_BATCH_7: SeedProbe[] = [
  card('bio.dev.gametogenesis-fertilisation-dev', 'step_check', H,
    'When does a human egg complete meiosis II?',
    'Only if a sperm penetrates it, which triggers completion',
    ['Before ovulation, so the egg is already a fully haploid cell', 'M1'],
    ['Never: oogenesis completes only one meiotic division', 'M2'],
    'M1 and M2 an unfertilised egg has not completed meiosis and oogenesis has two divisions, re-asked as when meiosis II is completed'),
  card('bio.dev.morphogenesis-differentiation', 'step_check', U,
    'A nucleus from a differentiated intestinal cell is placed in an egg with its own nucleus removed, and it directs development of a whole tadpole. What does this show?',
    'The differentiated nucleus still held all of the genes',
    ['It had lost genes, and the egg cytoplasm supplied the missing ones', 'M1'],
    ['Differentiation is permanent, so this should have been impossible', ''],
    'M1 differentiated cells keep their DNA, re-asked with a nuclear-transfer experiment'),
  card('bio.dev.stem-cells-regeneration', 'step_check', U,
    'A patient with leukaemia receives bone-marrow stem cells. Which cells can these restore?',
    'Blood and immune cells, because they are multipotent',
    ['Any damaged tissue in the body, because they are pluripotent', 'M1'],
    ['Only red blood cells, because each stem cell has a single fate', ''],
    'M1 adult stem cells are not pluripotent, re-asked with a bone-marrow transplant'),
  card('bio.found.scientific-method-in-biology', 'step_check', H,
    'Identical plants get 0 g, 5 g or 10 g of fertiliser, and their height is measured after a month. Which is the independent variable?',
    'The amount of fertiliser given',
    ['The height of the plants after a month', ''],
    ['The type of plant used in the experiment', ''],
    'the measured outcome is not the variable the researcher changes, re-asked with a fertiliser trial'),
  card('bio.found.unifying-themes-in-biology', 'step_check', H,
    'A forest receives sunlight, and its carbon atoms are reused again and again. Which statement is correct?',
    'Energy flows through one-way and is lost as heat, while carbon cycles',
    ['Energy and carbon both cycle indefinitely through the forest', 'M2'],
    ['Carbon flows one-way and is lost, while energy cycles indefinitely', 'M2'],
    'M2 energy flows one-way while matter cycles, re-asked with a forest'),
  card('bio.behav.innate-behavior-instinct', 'step_check', H,
    'A male stickleback attacks anything with a red underside, even a crude red model, and the whole attack sequence runs to the end. What is the red underside?',
    'A sign stimulus that triggers a fixed action pattern',
    ['Nothing special: fixed action patterns occur spontaneously with no trigger', 'M1'],
    ['A reflex trigger, since reflexes and fixed action patterns work identically', 'M2'],
    'M1 and M2 a fixed action pattern needs a trigger and is not a reflex, re-asked with a stickleback'),
  card('bio.behav.animal-communication', 'step_check', H,
    'A frog calls from dense forest at night. Why is sound better than a visual display here?',
    'Sound travels around obstacles and works in the dark, which suits the habitat',
    ['All signal types work equally well, so the habitat does not matter', 'M2'],
    ['Sound carries more information per second than any visual signal', ''],
    'M2 the signal modalities are not interchangeable, re-asked with a frog in dense forest'),
  card('bio.neuro.brain-regional-organization', 'step_check', H,
    'The hippocampus and amygdala are both called part of the limbic system. What does "limbic system" refer to?',
    'A network of linked structures with related functions, not one structure',
    ['One single compact structure, like the cerebellum', 'M2'],
    ['Another name for the whole cerebral cortex', ''],
    'M2 the limbic system is not a single structure, re-asked with the hippocampus and amygdala'),
  card('bio.div.animal-body-plans-symmetry', 'step_check', H,
    'What does the protostome–deuterostome distinction rest on?',
    'Whether the embryo\'s first opening becomes the mouth or the anus',
    ['Nothing definite: the labels are assigned without a defining criterion', 'M2'],
    ['The number of segments in the adult body', ''],
    'M2 protostome and deuterostome are defined by a specific criterion, re-asked as what the distinction rests on'),
  card('bio.neuro.neurotransmitter-systems', 'step_check', H,
    'After release at a synapse, how is the signal normally ended?',
    'The transmitter is removed by reuptake or broken down by enzymes',
    ['It fades away passively, with no mechanism needed to remove it', 'M2'],
    ['The postsynaptic neuron absorbs it all at once through the receptor', ''],
    'M2 a synaptic signal is ended by active removal and does not fade passively, re-asked as how the signal ends'),
  card('bio.neuro.sensory-transduction', 'step_check', H,
    'You notice your watch when you put it on, but not an hour later, although it is still there. What explains this?',
    'Sensory adaptation: receptors respond less to a constant stimulus',
    ['The receptors have worn out and failed under the constant stimulation', 'M2'],
    ['The brain has stopped listening, so the receptor no longer sends any signals', ''],
    'M2 adaptation is not a receptor wearing out, re-asked with a wristwatch'),
  card('bio.div.invertebrate-diversity-major-phyla', 'step_check', H,
    'A snail, a clam and a squid look very different. What do they share?',
    'A muscular foot, a mantle and a visceral mass',
    ['Nothing: Mollusca is a group defined only by superficial similarity', 'M2'],
    ['A segmented body covered by an exoskeleton', ''],
    'M2 Mollusca has a unifying body plan, re-asked with a snail, a clam and a squid'),
  card('bio.neuro.neural-circuits-computation', 'step_check', H,
    'In the retina, a bright spot excites some neurons and inhibits their neighbours. What does this lateral inhibition do?',
    'It sharpens contrast at the edges of the spot',
    ['It just lowers activity everywhere, so the response is weaker', 'M1'],
    ['It speeds up the signal along each axon', ''],
    'M1 inhibition computes and is not just an off switch, re-asked with a bright spot on the retina'),
  card('bio.neuro.vision-visual-system', 'step_check', H,
    'A person\'s retinas and optic nerves are intact but the visual cortex is damaged. Can they see normally?',
    'No: the image is constructed in the brain, not at the retina',
    ['Yes: seeing happens at the retina as soon as the light is detected', 'M2'],
    ['Yes, but only in dim light', ''],
    'M2 seeing does not happen at the retina alone, re-asked with visual cortex damage'),
  card('bio.div.arthropod-diversity', 'step_check', H,
    'A spider and a mite both have eight legs and two body parts, though the mite is tiny. What class do they share?',
    'Arachnida: defined by body parts and legs, not by size',
    ['Different classes, since size and habitat decide the class', 'M2'],
    ['Insecta, as all small arthropods are insects', ''],
    'M2 arthropod classes rest on anatomy and not on size or habitat, re-asked with a spider and a mite'),
  card('bio.neuro.learning-memory-neurobiology', 'step_check', H,
    'LTP strengthens one synapse on a neuron. What does that imply for the neuron\'s other synapses?',
    'They can stay the same or change differently, since plasticity is synapse-specific',
    ['All of them strengthen too, since the whole neuron becomes more excitable', 'M1'],
    ['All of them weaken, to keep the total balanced', ''],
    'M1 LTP is synapse-specific and does not change the whole neuron, re-asked for the other synapses'),
  card('bio.div.echinoderm-deuterostome-diversity', 'step_check', H,
    'Adult sea stars are radially symmetric, but their larvae are bilateral. What does this suggest?',
    'Adult radial symmetry evolved secondarily from a bilateral ancestor',
    ['Radial symmetry is ancestral and primitive, as it is in Cnidaria', 'M2'],
    ['The larvae and adults are really different species', ''],
    'M2 echinoderm radial symmetry is secondary and not ancestral, re-asked with a bilateral larva'),
  card('bio.neuro.audition-vestibular-system', 'step_check', H,
    'A person has damaged semicircular canals but a healthy cochlea. What is affected?',
    'Their sense of rotation and balance, but not their hearing',
    ['Their hearing, since the vestibular system detects sound', 'M2'],
    ['Both hearing and balance, since they share one sensory organ', ''],
    'M2 the vestibular system does not detect sound, re-asked with damaged semicircular canals'),
  card('bio.div.chordate-vertebrate-diversity', 'step_check', H,
    'An adult frog has no visible notochord, though its tadpole did. Is the adult frog a chordate?',
    'Yes: the four defining features need appear only at some stage of life',
    ['No: an adult must show a visible notochord to be a chordate', 'M1'],
    ['No: only fish keep chordate status as adults', ''],
    'M1 an adult need not show a visible notochord, re-asked with a frog and its tadpole'),
  card('bio.neuro.cognitive-neuroscience-consciousness', 'step_check', H,
    'A brain pattern appears whenever a person is aware of a face. What does this alone establish?',
    'A correlation: what activity accompanies the experience, not why it occurs',
    ['A full explanation of why the experience occurs in the brain at all', 'M1'],
    ['That faces are stored in that brain region', ''],
    'M1 a neural correlate does not explain the experience, re-asked with a face'),
]

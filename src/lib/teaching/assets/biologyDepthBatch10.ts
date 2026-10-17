/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 10 (bio.div, bio.neuro, bio.behav, bio.physio, bio.plant and bio.repro, facet cards, 24 cards).
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

export const BIOLOGY_DEPTH_BATCH_10: SeedProbe[] = [
  card('bio.div.echinoderm-deuterostome-diversity', 'fill_blank', H,
    'What happens to the blastopore in a deuterostome?',
    'It becomes the anus, and the mouth forms separately later',
    ['It becomes the mouth, as it does in protostomes, and the anus forms later', ''],
    ['It becomes the nervous system of the larva', ''],
    'deuterostomes form the anus from the blastopore, re-asked as what happens to the blastopore'),
  card('bio.neuro.audition-vestibular-system', 'fill_blank', H,
    'Which structure converts sound vibrations into nerve signals?',
    'The cochlea',
    ['The vestibular system, which sits next to the cochlea', 'M2'],
    ['The eardrum, which collects the sound waves', ''],
    'M2 the vestibular system does not detect sound, re-asked as which structure converts sound to nerve signals'),
  card('bio.div.chordate-vertebrate-diversity', 'fill_blank', H,
    'Which four features define the phylum Chordata?',
    'Notochord, dorsal nerve cord, pharyngeal slits and a post-anal tail',
    ['Backbone, jaws, lungs and four limbs', ''],
    ['A visible notochord that stays throughout adult life in every chordate', 'M1'],
    'M1 an adult need not show a visible notochord, re-asked as which four features define chordates'),
  card('bio.neuro.cognitive-neuroscience-consciousness', 'fill_blank', H,
    'What is meant by executive function?',
    'Top-down control of attention and behaviour by goals and expectations',
    ['Bottom-up capture of attention by the loudest stimulus', ''],
    ['The explanation of why conscious experience arises', 'M1'],
    'M1 a neural correlate does not explain consciousness, re-asked as what executive function means'),
  card('bio.behav.learning-and-behavior', 'fill_blank', H,
    'A city pigeon stops flying off at every passing car. What is this?',
    'Habituation: a reduced response to a repeated, harmless stimulus',
    ['Operant conditioning, since the pigeon is rewarded each time it stays', 'M1'],
    ['Imprinting, since it happens early in life', 'M2'],
    'M1 and M2 habituation differs from conditioning and imprinting, re-asked with a pigeon and passing cars'),
  card('bio.behav.animal-cognition', 'fill_blank', H,
    'Which finding best supports flexible problem-solving in an animal?',
    'It devises a new solution to a problem it has never met',
    ['It succeeds at any task it has practised many times', 'M1'],
    ['It uses a tool in the way every member of its species does', ''],
    'M1 successful tool use alone does not show sophisticated cognition, re-asked as which finding supports flexibility'),
  card('bio.neuro.neurodegenerative-disease', 'fill_blank', H,
    'Where do amyloid-beta plaques and tau tangles each accumulate in Alzheimer\'s disease?',
    'Plaques outside neurons; tangles inside neurons',
    ['Both inside neurons, as one and the same structure', 'M1'],
    ['Plaques inside neurons; tangles outside them', ''],
    'M1 plaques and tangles are different structures, re-asked as where each accumulates'),
  card('bio.div.fish-amphibian-diversity', 'fill_blank', H,
    'Which group of fish lacks true jaws?',
    'Jawless fish such as lampreys and hagfish',
    ['The largest predatory fish, such as big sharks', 'M2'],
    ['Cartilaginous fish such as rays', ''],
    'M2 fish classification rests on jaw and skeleton features and not on size, re-asked as which fish lack jaws'),
  card('bio.div.reptile-bird-diversity', 'fill_blank', H,
    'Which part of the amniotic egg lets the embryo develop on dry land?',
    'Membranes and a shell that protect it from drying out',
    ['A jelly coat that absorbs water from the pond', ''],
    ['External fertilisation in open water', ''],
    'the amniotic egg solved amphibians\' water dependence, re-asked as which part allows development on land'),
  card('bio.div.mammalian-diversity', 'fill_blank', H,
    'Which feature is a defining hallmark of mammals?',
    'Mammary glands that nourish the young',
    ['A four-chambered heart', ''],
    ['An amniotic egg', ''],
    'mammals are defined by hair, mammary glands and other specific features, re-asked as which feature is a hallmark'),
  card('bio.neuro.sleep-circadian-biology', 'fill_blank', H,
    'How does NREM sleep change across its stages?',
    'It becomes progressively deeper, with slower brain waves',
    ['Brain activity is uniformly reduced and identical at every stage', 'M1'],
    ['It becomes lighter, with faster brain waves', ''],
    'M1 sleep stages have different signatures and not uniformly reduced activity, re-asked as how NREM changes'),
  card('bio.physio.blood-physiology-hemostasis', 'fill_blank', H,
    'Where do all blood cell types originate?',
    'From haematopoietic stem cells in the bone marrow',
    ['From mature red blood cells in the liver', ''],
    ['From the muscle of the heart', ''],
    'all blood cells arise through haematopoiesis, re-asked as where blood cells originate'),
  card('bio.physio.endocrine-disorders-feedback', 'fill_blank', H,
    'In negative feedback, what does a rising hormone level do to its own release?',
    'It suppresses further release',
    ['It raises further release, as in every hormone system', 'M1'],
    ['It has no effect on the release', ''],
    'M1 oxytocin\'s positive feedback in labour is an exception and not a malfunction, re-asked as what negative feedback does'),
  card('bio.physio.integumentary-system', 'fill_blank', H,
    'Which layer of the skin is the outermost barrier?',
    'The epidermis',
    ['The dermis, which holds blood vessels and nerves', ''],
    ['The hypodermis, which stores fat', ''],
    'skin has three structural layers, re-asked as which is the outermost'),
  card('bio.physio.homeostasis-thermoregulation', 'fill_blank', H,
    'What does negative feedback do to a deviation?',
    'It counteracts the deviation, returning the variable to its set point',
    ['It signals that something is going wrong in the body', 'M1'],
    ['It amplifies the deviation further until the body can no longer cope', ''],
    'M1 negative feedback is a normal control loop and not a sign of a fault, re-asked as what it does to a deviation'),
  card('bio.physio.lymphatic-system-detail', 'fill_blank', H,
    'What do lymph nodes do?',
    'Filter the lymph and house immune cells',
    ['Pump lymph around a closed loop like the heart', ''],
    ['Make red blood cells for the circulation', ''],
    'lymph nodes filter lymph and support immunity, re-asked as what lymph nodes do'),
  card('bio.physio.muscle-physiology-energetics', 'fill_blank', H,
    'What is a motor unit?',
    'One motor neuron and all the muscle fibres it innervates',
    ['A single muscle fibre on its own', ''],
    ['A whole muscle together with its tendons', ''],
    'a motor unit is a neuron plus its fibres, re-asked as what a motor unit is'),
  card('bio.physio.exercise-physiology', 'fill_blank', H,
    'Which of these is a chronic training adaptation rather than an acute response?',
    'A lower resting heart rate after months of training',
    ['Heart rate rising during a single workout', 'M1'],
    ['Sweating during a single workout', ''],
    'M1 acute responses and chronic adaptations are different processes, re-asked as which is a chronic adaptation'),
  card('bio.physio.comparative-animal-physiology', 'fill_blank', H,
    'Why is an open circulatory system not simply an inferior version of a closed one?',
    'It suits animals with low oxygen demands and works well for them',
    ['It is a less evolved and failed version of a closed circulatory system', 'M1'],
    ['It contains no circulating fluid at all', ''],
    'M1 open circulation is not inferior, re-asked as why it is not simply inferior'),
  card('bio.plant.plant-tissue-systems', 'fill_blank', H,
    'Where are the actively dividing cells of a plant found?',
    'In meristematic tissue, such as the shoot and root tips',
    ['In the xylem, which carries water', ''],
    ['In permanent tissue, which has already differentiated', ''],
    'meristematic tissue divides and permanent tissue has differentiated, re-asked as where dividing cells are found'),
  card('bio.plant.secondary-growth-anatomy', 'fill_blank', H,
    'Which lateral meristem makes secondary xylem and secondary phloem?',
    'The vascular cambium',
    ['The cork cambium, which makes the periderm', ''],
    ['The apical meristem, which lengthens the stem', ''],
    'secondary growth in girth comes from two lateral meristems, re-asked as which makes secondary xylem and phloem'),
  card('bio.repro.animal-reproductive-strategies', 'fill_blank', H,
    'Fish that release thousands of eggs and give no parental care are closest to which strategy?',
    'r-selected: many offspring, little investment in each',
    ['K-selected: few offspring, heavy investment in each', ''],
    ['Neither, since a species must be purely r-selected or purely K-selected', 'M2'],
    'M2 r and K are a continuum and not a strict either-or, re-asked with egg-releasing fish'),
  card('bio.repro.hormonal-regulation-reproduction-detail', 'fill_blank', H,
    'Which organs do LH and FSH from the anterior pituitary act on?',
    'The gonads',
    ['The hypothalamus', ''],
    ['The adrenal glands', ''],
    'LH and FSH act on the gonads in the HPG axis, re-asked as which organs they act on'),
  card('bio.neuro.autonomic-stress-physiology', 'fill_blank', H,
    'Which branch of the autonomic nervous system triggers the fast fight-or-flight response?',
    'The sympathetic branch',
    ['The parasympathetic branch', ''],
    ['The HPA axis, which also acts within seconds', 'M2'],
    'M2 the autonomic and HPA-axis responses are different systems with different timing, re-asked as which branch triggers the fast response'),
]

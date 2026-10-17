/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 8 (bio.behav, bio.neuro, bio.div, bio.physio, bio.plant and bio.repro part 8, 20 cards).
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

export const BIOLOGY_CARD_DEPTH_BATCH_8: SeedProbe[] = [
  card('bio.behav.learning-and-behavior', 'step_check', H,
    'A dog salivates at the sound of a bell that always comes before its food. What kind of learning is this?',
    'Classical conditioning: one stimulus is linked to another',
    ['Operant conditioning: the dog is rewarded each time it salivates', 'M1'],
    ['Habituation: the dog is simply getting used to the bell', ''],
    'M1 classical and operant conditioning are different, re-asked with a bell and food'),
  card('bio.behav.animal-cognition', 'step_check', H,
    'A crow uses a stick to pull out insects, as it has done every day since it was young. Does this alone show flexible cognition?',
    'No: a practised routine does not show a novel solution to a novel problem',
    ['Yes: any successful tool use proves sophisticated cognition', 'M1'],
    ['Yes, but only if the crow made the stick itself', ''],
    'M1 successful tool use alone is not sophisticated cognition, re-asked with a crow and a stick'),
  card('bio.neuro.neurodegenerative-disease', 'step_check', H,
    'Parkinson\'s disease mainly causes tremor and slow movement. Which loss explains this?',
    'Dopamine-producing neurons in the substantia nigra',
    ['Neurons lost evenly across the whole brain', 'M2'],
    ['Neurons destroyed by extracellular amyloid plaques in the motor cortex', ''],
    'M2 Parkinson\'s disease is not generalised brain-wide neuron loss, re-asked as which loss explains the symptoms'),
  card('bio.div.fish-amphibian-diversity', 'step_check', H,
    'A frog lays soft, jelly-coated eggs. Where must it lay them, and why?',
    'In water or damp places, because the eggs dry out on land',
    ['Anywhere on dry land, since amphibians have fully left the water', 'M1'],
    ['On dry land only, because water would drown the embryos', ''],
    'M1 amphibians have not fully left the water, re-asked with a frog\'s eggs'),
  card('bio.div.reptile-bird-diversity', 'step_check', H,
    'Why do birds have hollow, air-filled bones?',
    'To reduce body weight for flight',
    ['It is an unrelated feature with no link to flight', 'M2'],
    ['To make the bones stiffer and heavier', ''],
    'M2 bird flight adaptations form a connected set, re-asked about hollow bones'),
  card('bio.div.mammalian-diversity', 'step_check', H,
    'Marsupials and placentals split from a common ancestor and each evolved its own features. How should they be described?',
    'As two separate branches, not stages on one ladder',
    ['As steps on a ladder from primitive monotremes to advanced placentals', 'M1'],
    ['As one group, since marsupials are young placentals', ''],
    'M1 mammalian reproductive types are not a linear progression, re-asked for marsupials and placentals'),
  card('bio.neuro.sleep-circadian-biology', 'step_check', H,
    'Volunteers live in a cave with no clock or daylight for weeks, yet keep a sleep–wake cycle of about 24 hours. What explains this?',
    'An internal molecular clock that runs without external light',
    ['Leftover light cues stored in the eyes, since light creates the rhythm', 'M2'],
    ['Regular meal times alone create the rhythm', ''],
    'M2 the circadian rhythm is internal and not created by light, re-asked with cave volunteers'),
  card('bio.physio.blood-physiology-hemostasis', 'step_check', H,
    'A Type A patient is given Type B blood and reacts badly. What causes the reaction?',
    'The patient\'s anti-B antibodies attack the B antigens on the donor cells',
    ['A general mismatch of blood, with no specific antibodies involved', 'M2'],
    ['The donor\'s platelets clump together in the patient\'s vessels', ''],
    'M2 transfusion incompatibility is a specific antibody reaction, re-asked as what causes it'),
  card('bio.physio.endocrine-disorders-feedback', 'step_check', H,
    'A patient\'s insulin level is normal, but the cells do not respond because their receptors are faulty. What does the patient show?',
    'Signs of insulin deficiency despite normal levels, due to a receptor problem',
    ['A hormone level problem that giving more insulin will always fix', 'M2'],
    ['Nothing: normal insulin means normal glucose control', ''],
    'M2 a receptor fault is not the same as an abnormal hormone level, re-asked with faulty insulin receptors'),
  card('bio.physio.integumentary-system', 'step_check', H,
    'A cut shows redness, heat and swelling for days, then new tissue forms, and months later scar tissue remodels. What does this show?',
    'Healing is an ordered sequence of stages, not one event',
    ['Healing is one single event that happens all at once', 'M2'],
    ['Only the first stage belongs to healing; the later changes are unrelated', ''],
    'M2 wound healing is a sequence of stages, re-asked with a cut over several months'),
  card('bio.physio.homeostasis-thermoregulation', 'step_check', H,
    'On a hot day a person sweats, their skin flushes and they seek shade. How are these responses related?',
    'They are coordinated parts of one negative-feedback loop that lowers temperature',
    ['They are independent reflexes with no connection to one another', 'M2'],
    ['They show the body is malfunctioning, since negative feedback signals a fault', 'M1'],
    'M1 and M2 thermoregulatory responses are coordinated and negative feedback is not a fault, re-asked on a hot day'),
  card('bio.physio.lymphatic-system-detail', 'step_check', H,
    'What are the roles of the lymphatic system?',
    'Draining excess tissue fluid and supporting immune defence',
    ['A single role: it only drains fluid and has no immune function', 'M1'],
    ['Pumping blood around the body in a closed loop', ''],
    'M1 the lymphatic system has two roles, re-asked as what its roles are'),
  card('bio.physio.muscle-physiology-energetics', 'step_check', H,
    'A sprinter starts a 10-second race. Which ATP source supplies energy first?',
    'Creatine phosphate, used first and fastest',
    ['All three sources contribute equally from the very start', 'M2'],
    ['Oxidative phosphorylation, the fastest source of ATP', ''],
    'M2 the ATP sources do not contribute equally from the start, re-asked with a sprinter'),
  card('bio.physio.exercise-physiology', 'step_check', H,
    'Two runners have the same heart and lung capacity, but runner A has far more mitochondria in the muscles. Who is likely to have the higher VO2 max?',
    'Runner A, since the muscles must also be able to use the oxygen delivered',
    ['Neither: VO2 max depends only on how much heart and lung capacity each has', 'M2'],
    ['Runner B, because mitochondria do not affect oxygen use', ''],
    'M2 VO2 max is not set by cardiovascular capacity alone, re-asked with two runners'),
  card('bio.physio.comparative-animal-physiology', 'step_check', H,
    'A freshwater fish and a marine fish both keep their body fluids stable. How do their strategies differ?',
    'Freshwater fish excrete dilute urine; marine fish drink seawater',
    ['They use the same generic strategy, since osmoregulation is one process everywhere', 'M2'],
    ['Neither controls water balance, because water simply follows the gradient', ''],
    'M2 osmoregulation is not one generic strategy, re-asked for freshwater and marine fish'),
  card('bio.plant.plant-tissue-systems', 'step_check', H,
    'A leaf makes sugar in summer. Where does the phloem carry it?',
    'To any sink, such as roots or fruits, in whichever direction is needed',
    ['Only upward from the roots to the shoot, exactly as xylem does', 'M1'],
    ['Only downward to the roots, which are the one place that stores sugar', ''],
    'M1 phloem does not carry in a single fixed direction, re-asked for a leaf making sugar'),
  card('bio.plant.secondary-growth-anatomy', 'step_check', H,
    'A tree shows one very narrow growth ring between wider ones. What most likely explains the narrow ring?',
    'Poor growing conditions that year, such as drought, slowed growth',
    ['Nothing: growth rings are arbitrary markers unrelated to conditions', 'M2'],
    ['The tree grew faster that year and wasted wood', ''],
    'M2 growth rings reflect growing conditions, re-asked with one narrow ring'),
  card('bio.repro.animal-reproductive-strategies', 'step_check', H,
    'A shark embryo develops inside its mother, feeding on its yolk, and is born live. Which strategy is this?',
    'Ovoviviparity: internal development with nutrients from the egg',
    ['Viviparity, since the development occurs inside the mother\'s body', 'M1'],
    ['Oviparity, since sharks are fish that lay eggs', ''],
    'M1 ovoviviparity is a distinct category, re-asked with a live-bearing shark'),
  card('bio.repro.hormonal-regulation-reproduction-detail', 'step_check', H,
    'How does a barrier method differ from a hormonal pill?',
    'A barrier blocks sperm; the pill works on hormones to stop ovulation',
    ['Both work by physically blocking sperm from ever reaching the egg in the tube', 'M2'],
    ['Both work by ending a pregnancy after it has implanted in the uterus wall', ''],
    'M2 hormonal contraception does not physically block sperm, re-asked as barrier versus pill'),
  card('bio.neuro.autonomic-stress-physiology', 'step_check', H,
    'A student gets a fright. Which change comes first, and how fast does cortisol follow?',
    'Heart rate rises within seconds; cortisol rises over minutes',
    ['Both rise at the same instant, since they are one system', 'M2'],
    ['Cortisol rises first, and the heart rate follows hours later', ''],
    'M2 the autonomic and HPA-axis responses are different systems with different timing, re-asked after a fright'),
]

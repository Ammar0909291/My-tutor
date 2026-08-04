/**
 * Subject Prelude — what a learner reads once, before Lesson 1 of a subject.
 *
 * ─── DESIGN ──────────────────────────────────────────────────────────────────
 *
 * CONTENT IS DATA, NOT CODE. Adding a seventh subject means adding one entry
 * to SUBJECT_PRELUDES below — no new component, route, gate, or test. That is
 * the "future subjects require content, not code changes" requirement, and it
 * is why every section is a field on a typed record rather than bespoke markup.
 *
 * ISOLATION FROM THE LESSON ENGINE. Nothing here imports the teaching engine,
 * the Educational Brain, or the Knowledge Graph, and nothing here is read by
 * them. The prelude is a gate in front of Lesson 1, not a stage inside it: its
 * completion is a single nullable timestamp on StudentProgress
 * (`preludeViewedAt`) which no mastery, progression, or curriculum computation
 * reads. A learner who never sees a prelude and a learner who replays it ten
 * times have byte-identical lesson progress.
 *
 * WHY StudentProgress AND NOT A NEW TABLE. StudentProgress is already the
 * canonical per-(user, subject) record — precisely the grain "show this once
 * per subject per learner" needs. Reusing it adds no ownership and no join.
 * A nullable column is additive: existing rows read NULL, which correctly
 * means "prelude not yet seen" for every learner who predates the feature.
 *
 * TRANSLATION. Prelude copy is authored per subject in English here. Localized
 * delivery is intentionally out of scope for this feature and is noted as
 * follow-up rather than half-built: the correct home for it is the same
 * id-keyed display layer added for concept titles, not a second mechanism.
 */

export type PreludeSubjectSlug =
  | 'mathematics' | 'physics' | 'chemistry' | 'biology' | 'english' | 'computer_science'

export interface PreludeRoadmapStage {
  title: string
  detail: string
}

export interface SubjectPrelude {
  subjectSlug: PreludeSubjectSlug
  /** 1 · Welcome. */
  welcome: string
  /** 2 · The Big Question the whole subject is an answer to. */
  bigQuestion: string
  /** 3 · Why this subject exists — why humanity created it. */
  whyItExists: string
  /** 4 · Why it matters in everyday life. */
  whyItMatters: string
  /** 5 · Learning roadmap — the shape of the journey, not the lesson list. */
  roadmap: PreludeRoadmapStage[]
  /** 6 · Why it is worth learning — how it changes how you think. */
  worthLearning: string
  /** 7 · Expectations. Fixed across subjects by design (see EXPECTATIONS). */
  expectations: readonly string[]
  /** 8 · Smooth transition into Lesson 1. */
  transition: string
  estimatedJourney: string
  /** Empty array means "none" — every subject states this explicitly. */
  prerequisites: string[]
  realWorldApplications: string[]
  careerRelevance: string[]
  connectedSubjects: string[]
  motivation: string
}

/**
 * Shared across every subject on purpose: these three promises are a property
 * of how this platform teaches, not of any one subject. Authoring them per
 * subject would let them drift apart, and a learner who switches subjects
 * would be told different things about how mistakes are treated.
 */
export const EXPECTATIONS = [
  'No prior knowledge is required. This starts from the beginning, and "the beginning" means genuinely nothing assumed.',
  'Mistakes are expected. They are how the tutor finds what to teach next — getting things wrong here is useful, not embarrassing.',
  'Understanding matters more than memorisation. You will never be asked to memorise something you have not first understood.',
] as const

const SUBJECT_PRELUDES: Record<PreludeSubjectSlug, SubjectPrelude> = {
  mathematics: {
    subjectSlug: 'mathematics',
    welcome: 'Welcome. Before the first lesson, it is worth knowing what mathematics actually is — because it is almost certainly not what school made it look like.',
    bigQuestion: 'Why do humans need mathematics?',
    whyItExists: 'Mathematics began as bookkeeping: counting grain, marking seasons, dividing land. But something strange happened. The rules invented for counting sheep turned out to also describe planets, populations, money, music and heat. Humans did not invent mathematics to be beautiful — they invented it to keep track of things, and then discovered it was the most reliable thinking tool ever found.',
    whyItMatters: 'Every time you split a bill, judge whether a deal is worth it, read a statistic in the news, or estimate whether you have enough time to get somewhere — you are doing mathematics. Done well it is not calculation, it is protection: it is what stops you being fooled by a confident argument or a misleading chart.',
    roadmap: [
      { title: 'Foundations', detail: 'What numbers are, what proof means, and why mathematicians insist on being so careful.' },
      { title: 'Arithmetic and number', detail: 'Counting, fractions, ratios — the tools you will use for the rest of your life.' },
      { title: 'Structure', detail: 'Algebra and functions: describing not one situation, but every situation of a kind.' },
      { title: 'Space and change', detail: 'Geometry, then the mathematics of things that move and grow.' },
      { title: 'Uncertainty', detail: 'Probability and statistics — reasoning carefully about what you cannot know for sure.' },
    ],
    worthLearning: 'Mathematics changes how you think more than what you know. It trains you to notice hidden assumptions, to ask "how would I know if this were false?", and to be comfortable saying "I do not know yet" while still making progress. That habit outlives every formula you will ever learn.',
    expectations: EXPECTATIONS,
    transition: 'Lesson 1 starts at the very beginning — no formulas, no notation, just the idea underneath it all. Take it at your own pace.',
    estimatedJourney: 'A long one, and it is meant to be. Expect steady progress in short sessions rather than a sprint; the foundations alone reward real time.',
    prerequisites: [],
    realWorldApplications: ['Personal finance and judging whether a deal is fair', 'Reading statistics and charts without being misled', 'Estimation and planning under time pressure', 'Any science, engineering or technical field'],
    careerRelevance: ['Engineering and the sciences', 'Software, data and machine learning', 'Finance, actuarial work and economics', 'Medicine and research — anywhere evidence must be weighed'],
    connectedSubjects: ['Physics — mathematics is the language its laws are written in', 'Computer Science — algorithms are mathematics that runs', 'Chemistry and Biology — increasingly quantitative'],
    motivation: 'Almost everyone who believes they are "bad at maths" was simply moved on before something clicked. That is a teaching failure, not a fact about you — and it is exactly what this tutor is built to avoid.',
  },

  physics: {
    subjectSlug: 'physics',
    welcome: 'Welcome. Physics is the subject that asks the most stubborn question a person can ask: why does anything happen at all?',
    bigQuestion: 'Why does the universe behave the way it does?',
    whyItExists: 'For most of history, "why did that happen?" was answered with stories. Physics began when a few people started insisting on a harder standard: an explanation must predict what happens next, and must be abandoned if it fails. That single rule — predict, test, discard what fails — turned scattered observations into the most precise knowledge humanity has.',
    whyItMatters: 'Physics is why bridges stand, why your phone knows where it is, why an aeroplane stays up, and why a microwave heats food but not the plate. It is also the fastest route to a genuinely useful instinct: an estimate of whether a claim is even physically possible.',
    roadmap: [
      { title: 'Measurement', detail: 'Before anything else: what it means to measure, and why units exist at all.' },
      { title: 'Motion and forces', detail: 'Why things move, stop, fall and orbit — the mechanics everything else is built on.' },
      { title: 'Energy and heat', detail: 'The single most useful accounting system in science.' },
      { title: 'Waves, light and electricity', detail: 'The physics behind almost every piece of technology you touch.' },
      { title: 'The modern picture', detail: 'Relativity and the quantum world, where ordinary intuition stops working.' },
    ],
    worthLearning: 'Physics teaches you to separate what you have observed from what you have assumed — and to be genuinely delighted when reality contradicts you. Very few habits are more useful, in or out of science.',
    expectations: EXPECTATIONS,
    transition: 'Lesson 1 begins with something so basic it is usually skipped: what it actually means to measure something. It is a better starting point than it sounds.',
    estimatedJourney: 'A substantial journey. Mechanics repays slow, careful work early; later topics move faster because they rest on it.',
    prerequisites: ['Comfort with basic arithmetic helps, but is taught alongside where needed — nothing is assumed.'],
    realWorldApplications: ['Understanding how everyday technology actually works', 'Estimating whether a claim is physically plausible', 'Driving, sport and anything involving forces and motion', 'Energy use and efficiency at home'],
    careerRelevance: ['Engineering of every kind', 'Medicine and medical imaging', 'Energy, climate and materials', 'Research, aerospace and instrumentation'],
    connectedSubjects: ['Mathematics — the language physics is written in', 'Chemistry — where physics meets matter', 'Computer Science — simulation and modelling'],
    motivation: 'Physics has a reputation for being the hard one. What makes it hard is usually being shown formulas before the reason anyone wanted them. Here the reason comes first.',
  },

  chemistry: {
    subjectSlug: 'chemistry',
    welcome: 'Welcome. Chemistry is the study of what everything is made of — including you, and everything you have ever touched.',
    bigQuestion: 'What is everything around us made of?',
    whyItExists: 'People spent centuries trying to turn lead into gold and failing. In failing carefully, they discovered something better: matter is made of a limited set of building blocks that combine by rules. Chemistry exists because humans wanted to control materials — to make medicine, metal, dye and food — and had to understand them first.',
    whyItMatters: 'Cooking, cleaning, medicine, batteries, plastics, fuel, soap, rust, digestion and every smell you have noticed are chemistry. It explains why food browns, why mixing certain cleaners is dangerous, and why a medicine has a dose rather than just an effect.',
    roadmap: [
      { title: 'Foundations', detail: 'What matter is, its states, and how chemists measure amounts of it.' },
      { title: 'Atoms and the periodic table', detail: 'The building blocks, and why the table is arranged the way it is.' },
      { title: 'Bonding', detail: 'How atoms join — the single idea that explains most of chemistry.' },
      { title: 'Reactions', detail: 'Energy, speed and equilibrium: what happens, how fast, and how far.' },
      { title: 'Organic and applied', detail: 'The chemistry of carbon, and of life, materials and industry.' },
    ],
    worthLearning: 'Chemistry rewires how you see ordinary objects. Once you know matter is made of particles that rearrange, cooking, rust, medicine and pollution stop being separate facts and become the same story told six ways.',
    expectations: EXPECTATIONS,
    transition: 'Lesson 1 starts with the most basic question in the subject — what matter actually is — and builds from there.',
    estimatedJourney: 'A steady journey. The foundations are short; bonding and reactions are where the real time goes, and where it pays off.',
    prerequisites: [],
    realWorldApplications: ['Cooking, and why recipes behave as they do', 'Reading ingredient and medicine labels', 'Household safety — what must never be mixed', 'Understanding materials, batteries and recycling'],
    careerRelevance: ['Medicine, pharmacy and healthcare', 'Materials, energy and manufacturing', 'Environmental science and food science', 'Chemical and biomedical engineering'],
    connectedSubjects: ['Physics — the rules underneath chemical behaviour', 'Biology — life is chemistry that maintains itself', 'Mathematics — reactions are quantitative'],
    motivation: 'Chemistry is often taught as a list to memorise. It is not a list. It is a small number of ideas about particles, applied over and over — and that is a far easier thing to learn.',
  },

  biology: {
    subjectSlug: 'biology',
    welcome: 'Welcome. Biology is the study of the only thing in the known universe that keeps itself going: life.',
    bigQuestion: 'What makes something alive?',
    whyItExists: 'Biology began with a practical need — grow food, treat illness, avoid poison — and became something deeper when people noticed that every living thing, from bacteria to whales, is built from the same kind of parts and related by descent. Humanity developed biology to understand itself: why we get ill, why we age, why we are the way we are.',
    whyItMatters: 'It is your body, your food, your health and every living thing you share the planet with. Biology is why vaccines work, why antibiotics stop working when misused, why exercise changes you, and why ecosystems collapse when one part is removed.',
    roadmap: [
      { title: 'Foundations', detail: 'What distinguishes living from non-living, and how biologists investigate it.' },
      { title: 'Cells', detail: 'The unit every living thing is built from.' },
      { title: 'Molecules and genetics', detail: 'DNA, inheritance, and how information becomes an organism.' },
      { title: 'Organisms and systems', detail: 'How bodies work — and how they fail.' },
      { title: 'Evolution and ecology', detail: 'The idea that ties every other topic together, and life at the scale of a planet.' },
    ],
    worthLearning: 'Biology teaches you to think about systems rather than single causes — that a change in one place shows up somewhere unexpected. It also makes your own body legible, which is quietly one of the most useful things a person can have.',
    expectations: EXPECTATIONS,
    transition: 'Lesson 1 begins with the question that sounds simple until you try to answer it: what does it actually mean to be alive?',
    estimatedJourney: 'A broad journey rather than a steep one. Biology rewards curiosity and connection-making more than heavy calculation.',
    prerequisites: [],
    realWorldApplications: ['Understanding your own health and medical advice', 'Nutrition, exercise and sleep', 'Why vaccines and antibiotics work — and how resistance happens', 'Gardening, conservation and food production'],
    careerRelevance: ['Medicine, nursing and allied health', 'Biotechnology, genetics and research', 'Conservation, agriculture and ecology', 'Public health and epidemiology'],
    connectedSubjects: ['Chemistry — life runs on chemical reactions', 'Physics — from diffusion to how eyes and nerves work', 'Mathematics — genetics and ecology are statistical'],
    motivation: 'Biology has more names in it than most subjects, which makes it feel like memorisation. Learn the mechanisms and the names attach themselves — that is the order used here.',
  },

  english: {
    subjectSlug: 'english',
    welcome: 'Welcome. Before the first lesson, consider what language actually does — because it is a stranger thing than it looks.',
    bigQuestion: 'How can thoughts travel from one mind to another?',
    whyItExists: 'A thought is trapped inside one head. Language is the workaround humans invented: encode the thought as sound or marks, send it, and have another mind rebuild something close to it. Writing extended that across time, letting a person be understood centuries after their death. English matters not because it is special, but because it is currently the shared second language of science, trade and the internet.',
    whyItMatters: 'Every job application, message, argument, instruction and apology depends on getting a thought into someone else\'s head accurately. Being understood — and understanding precisely what someone else meant — is not a soft skill; it is the one that determines whether the others get used.',
    roadmap: [
      { title: 'Sounds and words', detail: 'How spoken English is built, and how it maps onto writing.' },
      { title: 'Structure', detail: 'Grammar as machinery for meaning, not as a list of rules to obey.' },
      { title: 'Vocabulary', detail: 'Building range, and precision about shades of meaning.' },
      { title: 'Reading', detail: 'Understanding what is said, and what is implied but not said.' },
      { title: 'Writing and speaking', detail: 'Producing language other people understand exactly as you intended.' },
    ],
    worthLearning: 'Working on language sharpens thinking itself. Vague writing is usually vague thinking, and the effort to say something clearly often reveals you had not decided what you meant. That is why this changes how you think, not just how you speak.',
    expectations: EXPECTATIONS,
    transition: 'Lesson 1 starts with listening and speaking rather than rules or writing — the way every human learns a language first.',
    estimatedJourney: 'Ongoing and cumulative. Frequent short practice beats occasional long sessions in language more than in any other subject.',
    prerequisites: [],
    realWorldApplications: ['Work: email, applications, interviews and presentations', 'Understanding contracts, instructions and news accurately', 'Travel and everyday conversation', 'Access to most of the internet and scientific writing'],
    careerRelevance: ['Effectively every profession', 'International work of any kind', 'Writing, teaching, law and journalism', 'Technology — documentation and communication'],
    connectedSubjects: ['Every subject — you learn all of them through language', 'Computer Science — programming languages borrow these ideas', 'History and literature — reading the past'],
    motivation: 'Nobody is fluent because they memorised grammar. Fluency comes from being understood, repeatedly, including while getting things wrong — which is exactly what these sessions are for.',
  },

  computer_science: {
    subjectSlug: 'computer_science',
    welcome: 'Welcome. Computer science is not really about computers, any more than astronomy is about telescopes.',
    bigQuestion: 'How do machines solve problems by following instructions?',
    whyItExists: 'People wanted to stop doing repetitive calculation by hand. Pursuing that, they discovered something far larger: that a precise enough procedure can be carried out by something with no understanding at all. Computer science exists to work out what can be computed, how efficiently, and how to describe a procedure so exactly that a machine can follow it.',
    whyItMatters: 'Software decides what news you see, whether your loan is approved, how your route is chosen and where your data goes. Understanding computation is the difference between being a user of those systems and being able to reason about them — and increasingly, to build them.',
    roadmap: [
      { title: 'Foundations', detail: 'What computation is, and how a machine represents information.' },
      { title: 'Programming', detail: 'Expressing a procedure precisely enough to be executed.' },
      { title: 'Data structures', detail: 'Organising information so it can be found and changed efficiently.' },
      { title: 'Algorithms', detail: 'Solving problems well — and knowing what "well" costs.' },
      { title: 'Systems', detail: 'How real machines, networks and databases actually work.' },
    ],
    worthLearning: 'Computer science makes you decompose problems ruthlessly — into steps small enough to have no ambiguity left. That habit transfers to organising anything complicated, and it is why programmers are often unusually good at breaking down non-technical problems too.',
    expectations: EXPECTATIONS,
    transition: 'Lesson 1 starts before any code: with what a computation actually is. Code is easier once that is clear.',
    estimatedJourney: 'Hands-on throughout. Progress is fastest when you write and run things rather than only read about them.',
    prerequisites: ['Basic arithmetic and comfort with logical reasoning. Both are supported along the way — nothing is assumed up front.'],
    realWorldApplications: ['Automating repetitive work', 'Understanding privacy, security and how your data flows', 'Judging what software and AI can and cannot do', 'Building tools, sites and applications yourself'],
    careerRelevance: ['Software engineering and data science', 'Security, infrastructure and AI', 'Any modern scientific research', 'Product, analysis and technical entrepreneurship'],
    connectedSubjects: ['Mathematics — logic and algorithmic analysis', 'Physics and Biology — simulation and modelling', 'English — code is written to be read by people'],
    motivation: 'You do not need to be a "maths person" or to have started as a child. Computer science rewards persistence and precision far more than talent, and every professional you admire spent most of their time confused too.',
  },
}

/** Every subject that has a prelude. */
export function preludeSubjectSlugs(): PreludeSubjectSlug[] {
  return Object.keys(SUBJECT_PRELUDES) as PreludeSubjectSlug[]
}

/** Does this subject have a prelude? Subjects without one are simply skipped. */
export function hasSubjectPrelude(subjectSlug: string): subjectSlug is PreludeSubjectSlug {
  return Object.prototype.hasOwnProperty.call(SUBJECT_PRELUDES, subjectSlug)
}

/** The prelude for a subject, or null when the subject has none. */
export function getSubjectPrelude(subjectSlug: string): SubjectPrelude | null {
  return hasSubjectPrelude(subjectSlug) ? SUBJECT_PRELUDES[subjectSlug] : null
}

// ─── The gate ────────────────────────────────────────────────────────────────

export interface PreludeGateContext {
  subjectSlug: string
  /** StudentProgress.preludeViewedAt — null/undefined when never completed. */
  preludeViewedAt: Date | string | null | undefined
  /** Set when the learner asked to see it again from Subject Overview. */
  replayRequested?: boolean
}

/**
 * Should the prelude be shown right now?
 *
 * Automatic display happens exactly once: on first entry to a subject, before
 * Lesson 1. After completion it never returns on its own — only an explicit
 * replay from Subject Overview brings it back, which is why replayRequested is
 * checked first and ignores the timestamp entirely.
 *
 * A subject with no authored prelude never shows one, which is what keeps this
 * safe to enable platform-wide: school mode and any future subject without
 * content simply proceed straight to Lesson 1.
 */
export function shouldShowPrelude(ctx: PreludeGateContext): boolean {
  if (!hasSubjectPrelude(ctx.subjectSlug)) return false
  if (ctx.replayRequested) return true
  return !isPreludeCompleted(ctx.preludeViewedAt)
}

/** Has the learner completed this subject's prelude? */
export function isPreludeCompleted(preludeViewedAt: Date | string | null | undefined): boolean {
  if (preludeViewedAt == null) return false
  const t = preludeViewedAt instanceof Date ? preludeViewedAt.getTime() : Date.parse(preludeViewedAt)
  return Number.isFinite(t)
}

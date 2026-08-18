/**
 * Mathematics probe assets — the third gradeable question every serving concept
 * was missing.
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
 * Mastery requires THREE server-graded correct answers (`correctAtCheck >= 1`
 * and `correctAtPractice >= 2`) and the gate never re-asks a probe it has
 * already spent. Measured against production 2026-08-18, every mathematics
 * concept that serves content held ONE or TWO closed-choice probes and none
 * held three:
 *
 *     1 probe  ->  3 concepts        3 probes -> 0 concepts
 *     2 probes -> 40 concepts
 *
 * So the authored pool ran dry at PRACTICE for every learner, the turn was
 * handed to the model, and its `<!--MCQ-->` tag is an advisory prompt rule. When
 * it asked in prose instead, the answer could not be graded and the learner's
 * correct answer counted for nothing — observed end to end on
 * `math.found.logic`, where three correct answers moved no counter.
 *
 * `assetContract.ts` states the requirement. This file supplies the content for
 * `math.arith`, taking every serving concept in that domain to >= 3
 * closed-choice probes at each band it already serves.
 *
 * ── HOW THESE WERE WRITTEN ──────────────────────────────────────────────────
 * Every distractor is a real error a real student makes, and each carries the
 * `misconceptionId` naming it, so a wrong answer routes to repair rather than a
 * bare "no". None is filler, none is a joke option, and none is "none of the
 * above". Stems are checked against the probes already ACTIVE for the same
 * concept so nothing duplicates a question the learner may already have met.
 *
 * Grade bands match what each concept already serves — this file adds depth to
 * existing coverage and deliberately introduces no new band, because a band with
 * probes but no explanation would be worse than no band at all.
 *
 * Seeded as DRAFT by `scripts/brain/seed-knowledge-assets.ts --draft`. Nothing
 * here reaches a learner until a human promotes it through
 * `/api/admin/knowledge-assets`.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what}`

// ─── math.arith.addition ─────────────────────────────────────────────────────
// Already ACTIVE at ELEMENTARY: "What is 38 + 26?"
const ADDITION: SeedProbe[] = [
  {
    conceptId: 'math.arith.addition', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A student adds 47 + 8 and writes 415. What went wrong?',
    choices: [
      { text: 'They added 7 + 8 = 15 and wrote all of it down instead of carrying the ten into the tens column', isCorrect: true },
      { text: 'They should have subtracted instead of adding', isCorrect: false, misconceptionId: 'math.arith.addition:MC-operation-choice' },
      { text: 'Nothing — 415 is correct', isCorrect: false, misconceptionId: 'math.arith.addition:MC-carrying' },
    ],
    targetedMisconceptions: ['math.arith.addition:MC-carrying'],
    source: src('math.arith.addition', 'failure to carry — the digit-string error, not an arithmetic slip'),
  },
  {
    conceptId: 'math.arith.addition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know 8 + 5 = 13. Without adding again, what is 5 + 8?',
    choices: [
      { text: '13 — the order of the two numbers does not change the total', isCorrect: true },
      { text: 'You have to add it out to find out', isCorrect: false, misconceptionId: 'math.arith.addition:MC-commutativity' },
      { text: '58', isCorrect: false, misconceptionId: 'math.arith.addition:MC-digit-concatenation' },
    ],
    targetedMisconceptions: ['math.arith.addition:MC-commutativity'],
    source: src('math.arith.addition', 'commutativity as a labour-saving property, not a stated rule'),
  },
]

// ─── math.arith.subtraction ──────────────────────────────────────────────────
// Already ACTIVE at ELEMENTARY: "What is 62 − 37?"
const SUBTRACTION: SeedProbe[] = [
  {
    conceptId: 'math.arith.subtraction', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A student works out 53 − 27 and gets 34. Where did that come from?',
    choices: [
      { text: 'In the ones column they did 7 − 3 instead of borrowing, taking the smaller digit from the larger', isCorrect: true },
      { text: 'They forgot that subtraction and addition give the same answer', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-operation-choice' },
      { text: 'Nothing — 34 is correct', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-smaller-from-larger' },
    ],
    targetedMisconceptions: ['math.arith.subtraction:MC-smaller-from-larger'],
    source: src('math.arith.subtraction', 'smaller-from-larger: the single most common column-subtraction error'),
  },
  {
    conceptId: 'math.arith.subtraction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know 9 − 4 = 5. Is 4 − 9 also 5?',
    choices: [
      { text: 'No — order matters in subtraction, and 4 − 9 is not 5', isCorrect: true },
      { text: 'Yes — order does not matter, just like in addition', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-commutativity-transfer' },
    ],
    targetedMisconceptions: ['math.arith.subtraction:MC-commutativity-transfer'],
    source: src('math.arith.subtraction', 'overgeneralising addition\'s commutativity to subtraction'),
  },
]

// ─── math.arith.multiplication ───────────────────────────────────────────────
// Already ACTIVE at EARLY: "What is 3 × 4?"  ELEMENTARY: "What is 6 × 0?"
const MULTIPLICATION: SeedProbe[] = [
  {
    conceptId: 'math.arith.multiplication', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'There are 4 plates with 2 biscuits on each. Which addition gives the same total as 4 × 2?',
    choices: [
      { text: '2 + 2 + 2 + 2', isCorrect: true },
      { text: '4 + 2', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-times-means-add' },
      { text: '4 + 4', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-group-count-swap' },
    ],
    targetedMisconceptions: ['math.arith.multiplication:MC-times-means-add'],
    source: src('math.arith.multiplication', 'multiplication as repeated addition of equal groups'),
  },
  {
    conceptId: 'math.arith.multiplication', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know 5 × 2 = 10. What is 2 × 5?',
    choices: [
      { text: '10 — swapping the two numbers does not change the answer', isCorrect: true },
      { text: '7', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-times-means-add' },
      { text: 'You have to work it out separately', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-commutativity' },
    ],
    targetedMisconceptions: ['math.arith.multiplication:MC-commutativity'],
    source: src('math.arith.multiplication', 'commutativity halves the multiplication facts to be learned'),
  },
  {
    conceptId: 'math.arith.multiplication', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'True or false: multiplying always makes a number bigger.',
    choices: [
      { text: 'False — multiplying by 1 leaves it unchanged, and multiplying by 0 gives 0', isCorrect: true },
      { text: 'True — that is what multiplying means', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-multiplication-makes-bigger' },
    ],
    targetedMisconceptions: ['math.arith.multiplication:MC-multiplication-makes-bigger'],
    source: src('math.arith.multiplication', 'multiplication-makes-bigger — the belief that later breaks fractions'),
  },
  {
    conceptId: 'math.arith.multiplication', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A room has 6 rows of 7 chairs. Which calculation gives the number of chairs?',
    choices: [
      { text: '6 × 7', isCorrect: true },
      { text: '6 + 7', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-times-means-add' },
      { text: '7 − 6', isCorrect: false, misconceptionId: 'math.arith.multiplication:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.multiplication:MC-operation-choice'],
    source: src('math.arith.multiplication', 'recognising an array situation as multiplication'),
  },
]

// ─── math.arith.division ─────────────────────────────────────────────────────
// Already ACTIVE at ELEMENTARY: "What is 17 ÷ 5?"  MIDDLE: "What is 9 ÷ 0?"
const DIVISION: SeedProbe[] = [
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: '12 sweets are shared equally between 3 children. Which calculation finds how many each child gets?',
    choices: [
      { text: '12 ÷ 3', isCorrect: true },
      { text: '3 ÷ 12', isCorrect: false, misconceptionId: 'math.arith.division:MC-order-reversed' },
      { text: '12 × 3', isCorrect: false, misconceptionId: 'math.arith.division:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-order-reversed'],
    source: src('math.arith.division', 'division is not commutative — the shared amount comes first'),
  },
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'True or false: dividing always makes a number smaller.',
    choices: [
      { text: 'False — dividing by 1 leaves it unchanged', isCorrect: true },
      { text: 'True — sharing something out always leaves less', isCorrect: false, misconceptionId: 'math.arith.division:MC-division-makes-smaller' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-division-makes-smaller'],
    source: src('math.arith.division', 'division-makes-smaller — the belief that later breaks division by a fraction'),
  },
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 0 ÷ 9?',
    choices: [
      { text: '0 — nothing shared among 9 gives each of them nothing', isCorrect: true },
      { text: 'Undefined, the same as 9 ÷ 0', isCorrect: false, misconceptionId: 'math.arith.division:MC-zero-symmetry' },
      { text: '9', isCorrect: false, misconceptionId: 'math.arith.division:MC-zero-identity' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-zero-symmetry'],
    source: src('math.arith.division', '0 ÷ 9 and 9 ÷ 0 are not the same question — only one is undefined'),
  },
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: '30 pencils are packed into boxes of 4. How many boxes are completely full, and how many pencils are left over?',
    choices: [
      { text: '7 full boxes, 2 left over', isCorrect: true },
      { text: '7.5 boxes', isCorrect: false, misconceptionId: 'math.arith.division:MC-remainder-as-decimal' },
      { text: '8 full boxes', isCorrect: false, misconceptionId: 'math.arith.division:MC-rounding-up' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-remainder-as-decimal'],
    source: src('math.arith.division', 'a remainder in a whole-object context is not a decimal'),
  },
]

// ─── one-probe top-ups for concepts already holding two ──────────────────────
const TOP_UPS: SeedProbe[] = [
  {
    conceptId: 'math.arith.fractions', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says 1/4 + 1/4 = 2/8. What did they do?',
    choices: [
      { text: 'They added the tops and the bottoms separately; the quarters are the same size, so two of them make 2/4', isCorrect: true },
      { text: 'Nothing — 2/8 is right', isCorrect: false, misconceptionId: 'math.arith.fractions:MC-add-across' },
      { text: 'They should have multiplied instead', isCorrect: false, misconceptionId: 'math.arith.fractions:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.fractions:MC-add-across'],
    source: src('math.arith.fractions', 'adding numerators and denominators across — the classic fraction error'),
  },
  {
    conceptId: 'math.arith.fraction-equivalence', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To get from 2/5 to an equivalent fraction, a student adds 3 to the top and 3 to the bottom, giving 5/8. Is 5/8 equivalent to 2/5?',
    choices: [
      { text: 'No — you must multiply both parts by the same number, not add to both', isCorrect: true },
      { text: 'Yes — the same thing was done to the top and the bottom', isCorrect: false, misconceptionId: 'math.arith.fraction-equivalence:MC-add-same-to-both' },
    ],
    targetedMisconceptions: ['math.arith.fraction-equivalence:MC-add-same-to-both'],
    source: src('math.arith.fraction-equivalence', 'adding the same number to both parts does not preserve value'),
  },
  {
    conceptId: 'math.arith.fraction-multiplication', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is 1/2 × 1/4 larger or smaller than 1/2?',
    choices: [
      { text: 'Smaller — taking a quarter OF a half gives less than the half you started with', isCorrect: true },
      { text: 'Larger — multiplying always makes things bigger', isCorrect: false, misconceptionId: 'math.arith.fraction-multiplication:MC-multiplication-makes-bigger' },
      { text: 'The same size', isCorrect: false, misconceptionId: 'math.arith.fraction-multiplication:MC-no-change' },
    ],
    targetedMisconceptions: ['math.arith.fraction-multiplication:MC-multiplication-makes-bigger'],
    source: src('math.arith.fraction-multiplication', 'multiplying by a proper fraction reduces — where multiplication-makes-bigger breaks'),
  },
  {
    conceptId: 'math.arith.order-of-operations', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is 10 − 2 + 3?',
    choices: [
      { text: '11 — with only + and −, work left to right', isCorrect: true },
      { text: '5 — do the addition first because A comes before S in the rule', isCorrect: false, misconceptionId: 'math.arith.order-of-operations:MC-addition-before-subtraction' },
    ],
    targetedMisconceptions: ['math.arith.order-of-operations:MC-addition-before-subtraction'],
    source: src('math.arith.order-of-operations', 'the acronym read as a strict order rather than as tiers'),
  },
  {
    conceptId: 'math.arith.ratios', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A class has 8 boys and 12 girls. What is the ratio of boys to the whole class?',
    choices: [
      { text: '8:20', isCorrect: true },
      { text: '8:12', isCorrect: false, misconceptionId: 'math.arith.ratios:MC-part-to-part-vs-whole' },
      { text: '12:8', isCorrect: false, misconceptionId: 'math.arith.ratios:MC-order-reversed' },
    ],
    targetedMisconceptions: ['math.arith.ratios:MC-part-to-part-vs-whole'],
    source: src('math.arith.ratios', 'MC-2 part-to-part vs part-to-whole confusion'),
  },
  {
    conceptId: 'math.arith.exponentiation', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says 3⁴ means 3 × 4 = 12. What does 3⁴ actually mean?',
    choices: [
      { text: '3 × 3 × 3 × 3 = 81 — the exponent counts how many 3s are multiplied', isCorrect: true },
      { text: '3 × 4 = 12', isCorrect: false, misconceptionId: 'math.arith.exponentiation:MC-exponent-as-multiplier' },
      { text: '4 × 4 × 4 = 64', isCorrect: false, misconceptionId: 'math.arith.exponentiation:MC-base-exponent-swap' },
    ],
    targetedMisconceptions: ['math.arith.exponentiation:MC-exponent-as-multiplier'],
    source: src('math.arith.exponentiation', 'exponent read as a multiplier rather than as a repeat count'),
  },
]

export const MATHEMATICS_PROBES: SeedProbe[] = [
  ...ADDITION, ...SUBTRACTION, ...MULTIPLICATION, ...DIVISION, ...TOP_UPS,
]

/** No explanations are added here — every concept above already serves one. */
export const MATHEMATICS_EXPLANATIONS: never[] = []

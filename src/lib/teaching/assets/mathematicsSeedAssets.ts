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

// ─── math.found ──────────────────────────────────────────────────────────────
// Existing ACTIVE stems are avoided: integers "every integer is either positive
// or negative" / "closed under"; logic "divisible by 4" / "n²+n+41";
// natural-numbers "Is 0 natural?" / well-ordering; rational-numbers "1/2 and
// 2/4" / "0.333…"; set "{∅} cardinality" / "{a,b,a,c,b}".
const FOUNDATIONS: SeedProbe[] = [
  {
    conceptId: 'math.found.integers', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is −7 a smaller number than −3?',
    choices: [
      { text: 'Yes — on the number line −7 lies further left, so it is less than −3', isCorrect: true },
      { text: 'No — 7 is bigger than 3, so −7 is bigger than −3', isCorrect: false, misconceptionId: 'math.found.integers:MC-magnitude-as-order' },
    ],
    targetedMisconceptions: ['math.found.integers:MC-magnitude-as-order'],
    source: src('math.found.integers', 'ordering negatives by magnitude rather than by position'),
  },
  {
    conceptId: 'math.found.logic', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The statement "every swan I have seen is white" is offered as proof that all swans are white. What is missing?',
    choices: [
      { text: 'An argument covering every swan — examples can support a claim but never establish it for all cases', isCorrect: true },
      { text: 'Nothing — enough observations amount to a proof', isCorrect: false, misconceptionId: 'math.found.logic:MC-examples-as-proof' },
      { text: 'More observations of the same kind', isCorrect: false, misconceptionId: 'math.found.logic:MC-examples-as-proof' },
    ],
    targetedMisconceptions: ['math.found.logic:MC-examples-as-proof'],
    source: src('math.found.logic', 'accumulated examples mistaken for a universal proof'),
  },
  {
    conceptId: 'math.found.natural-numbers', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is there a largest natural number?',
    choices: [
      { text: 'No — whichever you name, adding 1 gives a larger one', isCorrect: true },
      { text: 'Yes, infinity', isCorrect: false, misconceptionId: 'math.found.natural-numbers:MC-infinity-as-number' },
    ],
    targetedMisconceptions: ['math.found.natural-numbers:MC-infinity-as-number'],
    source: src('math.found.natural-numbers', 'infinity treated as a natural number rather than as unboundedness'),
  },
  {
    conceptId: 'math.found.rational-numbers', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Between the rationals 1/3 and 1/2, how many other rationals are there?',
    choices: [
      { text: 'Infinitely many — the average of any two rationals is another rational between them', isCorrect: true },
      { text: 'None — they are next to each other', isCorrect: false, misconceptionId: 'math.found.rational-numbers:MC-discrete-successor' },
      { text: 'Exactly one', isCorrect: false, misconceptionId: 'math.found.rational-numbers:MC-discrete-successor' },
    ],
    targetedMisconceptions: ['math.found.rational-numbers:MC-discrete-successor'],
    source: src('math.found.rational-numbers', 'expecting a next rational, carried over from counting numbers'),
  },
  {
    conceptId: 'math.found.set', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are {1, 2, 3} and {3, 1, 2} the same set?',
    choices: [
      { text: 'Yes — a set is decided by which members it has, not by the order they are written in', isCorrect: true },
      { text: 'No — the members are in a different order', isCorrect: false, misconceptionId: 'math.found.set:MC-order-matters' },
    ],
    targetedMisconceptions: ['math.found.set:MC-order-matters'],
    source: src('math.found.set', 'sets read as ordered lists'),
  },
  {
    conceptId: 'math.found.set', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Is the empty set a subset of {1, 2, 3}?',
    choices: [
      { text: 'Yes — it has no member that is missing from {1, 2, 3}, so nothing disqualifies it', isCorrect: true },
      { text: 'No — it has no members, so it cannot be inside anything', isCorrect: false, misconceptionId: 'math.found.set:MC-empty-set-not-subset' },
    ],
    targetedMisconceptions: ['math.found.set:MC-empty-set-not-subset'],
    source: src('math.found.set', 'the empty set as a subset of every set'),
  },
  {
    conceptId: 'math.found.set', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A = {1, 2}, which is true: 1 ∈ A, or {1} ∈ A?',
    choices: [
      { text: '1 ∈ A — the number is a member; {1} is a set containing it, and A does not contain that set', isCorrect: true },
      { text: 'Both are true', isCorrect: false, misconceptionId: 'math.found.set:MC-element-vs-singleton' },
      { text: '{1} ∈ A — members are written as sets', isCorrect: false, misconceptionId: 'math.found.set:MC-element-vs-singleton' },
    ],
    targetedMisconceptions: ['math.found.set:MC-element-vs-singleton'],
    source: src('math.found.set', 'membership vs containment — an element is not the singleton holding it'),
  },
  {
    conceptId: 'math.found.set', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A = {1, 2} and B = {1, 2, 3}. Is A ⊆ B, or A ∈ B?',
    choices: [
      { text: 'A ⊆ B — every member of A is a member of B, but A itself is not one of B\'s three members', isCorrect: true },
      { text: 'A ∈ B — A sits inside B', isCorrect: false, misconceptionId: 'math.found.set:MC-subset-vs-membership' },
    ],
    targetedMisconceptions: ['math.found.set:MC-subset-vs-membership'],
    source: src('math.found.set', 'subset and membership conflated — the two senses of "inside"'),
  },
]

// ─── math.geom ───────────────────────────────────────────────────────────────
const GEOMETRY: SeedProbe[] = [
  {
    conceptId: 'math.geom.angle', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two angles are complementary and one measures 35°. What is the other?',
    choices: [
      { text: '55° — complementary angles sum to 90°', isCorrect: true },
      { text: '145° — they sum to 180°', isCorrect: false, misconceptionId: 'math.geom.angle:MC-complementary-supplementary-swap' },
      { text: '35° — complementary means equal', isCorrect: false, misconceptionId: 'math.geom.angle:MC-complementary-means-equal' },
    ],
    targetedMisconceptions: ['math.geom.angle:MC-complementary-supplementary-swap'],
    source: src('math.geom.angle', 'complementary and supplementary exchanged'),
  },
  {
    conceptId: 'math.geom.circle', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A circle has radius 3. A student computes the circumference as 2π(3²) = 18π. What went wrong?',
    choices: [
      { text: 'They squared the radius; circumference is 2πr = 6π, and it is the AREA that uses r²', isCorrect: true },
      { text: 'Nothing — 18π is correct', isCorrect: false, misconceptionId: 'math.geom.circle:MC-area-circumference-swap' },
      { text: 'They should have used the diameter instead of the radius', isCorrect: false, misconceptionId: 'math.geom.circle:MC-radius-diameter-swap' },
    ],
    targetedMisconceptions: ['math.geom.circle:MC-area-circumference-swap'],
    source: src('math.geom.circle', 'the two circle formulas exchanged'),
  },
  {
    conceptId: 'math.geom.coordinate-plane', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Are the points (2, 5) and (5, 2) the same point?',
    choices: [
      { text: 'No — the first number is the horizontal move and the second the vertical, so swapping them gives a different place', isCorrect: true },
      { text: 'Yes — they use the same two numbers', isCorrect: false, misconceptionId: 'math.geom.coordinate-plane:MC-coordinate-order' },
    ],
    targetedMisconceptions: ['math.geom.coordinate-plane:MC-coordinate-order'],
    source: src('math.geom.coordinate-plane', 'an ordered pair read as an unordered pair'),
  },
  {
    conceptId: 'math.geom.right-triangle', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A right triangle has legs 6 and 8. A student says the hypotenuse is 6 + 8 = 14. What is it really?',
    choices: [
      { text: '10 — the squares add, not the lengths: 6² + 8² = 100, so the hypotenuse is √100', isCorrect: true },
      { text: '14', isCorrect: false, misconceptionId: 'math.geom.right-triangle:MC-add-legs' },
      { text: '48', isCorrect: false, misconceptionId: 'math.geom.right-triangle:MC-multiply-legs' },
    ],
    targetedMisconceptions: ['math.geom.right-triangle:MC-add-legs'],
    source: src('math.geom.right-triangle', 'adding the legs instead of adding their squares'),
  },
  {
    conceptId: 'math.geom.similar-triangles', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two similar triangles have sides in the ratio 1:3. What is the ratio of their AREAS?',
    choices: [
      { text: '1:9 — area scales with the square of the length factor', isCorrect: true },
      { text: '1:3 — the same as the sides', isCorrect: false, misconceptionId: 'math.geom.similar-triangles:MC-linear-area-scaling' },
      { text: '1:6', isCorrect: false, misconceptionId: 'math.geom.similar-triangles:MC-linear-area-scaling' },
    ],
    targetedMisconceptions: ['math.geom.similar-triangles:MC-linear-area-scaling'],
    source: src('math.geom.similar-triangles', 'area assumed to scale linearly with side length'),
  },
  {
    conceptId: 'math.geom.slope', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is the slope of a horizontal line?',
    choices: [
      { text: '0 — it rises by nothing over any run', isCorrect: true },
      { text: 'Undefined', isCorrect: false, misconceptionId: 'math.geom.slope:MC-horizontal-vertical-swap' },
      { text: '1', isCorrect: false, misconceptionId: 'math.geom.slope:MC-slope-one-default' },
    ],
    targetedMisconceptions: ['math.geom.slope:MC-horizontal-vertical-swap'],
    source: src('math.geom.slope', 'zero slope and undefined slope exchanged'),
  },
  {
    conceptId: 'math.geom.triangle', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Can a triangle be built with sides 2, 3 and 9?',
    choices: [
      { text: 'No — 2 + 3 is less than 9, so the two short sides cannot meet', isCorrect: true },
      { text: 'Yes — any three positive lengths make a triangle', isCorrect: false, misconceptionId: 'math.geom.triangle:MC-any-three-lengths' },
    ],
    targetedMisconceptions: ['math.geom.triangle:MC-any-three-lengths'],
    source: src('math.geom.triangle', 'the triangle inequality — not every triple of lengths closes'),
  },
  {
    conceptId: 'math.geom.vectors-2d', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Vector u = (3, 4) and vector v = (4, 3). Do u and v have the same magnitude, and are they the same vector?',
    choices: [
      { text: 'Same magnitude (both 5), different vectors — they point in different directions', isCorrect: true },
      { text: 'They are the same vector', isCorrect: false, misconceptionId: 'math.geom.vectors-2d:MC-magnitude-is-identity' },
      { text: 'Different magnitudes', isCorrect: false, misconceptionId: 'math.geom.vectors-2d:MC-component-order-changes-length' },
    ],
    targetedMisconceptions: ['math.geom.vectors-2d:MC-magnitude-is-identity'],
    source: src('math.geom.vectors-2d', 'a vector is magnitude AND direction — equal length is not equality'),
  },
]

// ─── math.nt ─────────────────────────────────────────────────────────────────
const NUMBER_THEORY: SeedProbe[] = [
  {
    conceptId: 'math.nt.prime-number', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Is 2 a prime number?',
    choices: [
      { text: 'Yes — its only divisors are 1 and itself; being even is irrelevant to primality', isCorrect: true },
      { text: 'No — primes are odd', isCorrect: false, misconceptionId: 'math.nt.prime-number:MC-primes-are-odd' },
    ],
    targetedMisconceptions: ['math.nt.prime-number:MC-primes-are-odd'],
    source: src('math.nt.prime-number', 'oddness mistaken for a defining property of primes'),
  },
]

export const MATHEMATICS_PROBES: SeedProbe[] = [
  ...ADDITION, ...SUBTRACTION, ...MULTIPLICATION, ...DIVISION, ...TOP_UPS,
  ...FOUNDATIONS, ...GEOMETRY, ...NUMBER_THEORY,
]

/** No explanations are added here — every concept above already serves one. */
export const MATHEMATICS_EXPLANATIONS: never[] = []

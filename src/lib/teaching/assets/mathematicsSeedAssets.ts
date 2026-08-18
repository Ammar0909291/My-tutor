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

// ─── math.alg ────────────────────────────────────────────────────────────────
// Existing ACTIVE stems avoided: equation "x + 5 = x" (high) / "3x = 12, are you
// done?" (middle); expression "Simplify 4x + 3"; like-terms "3x² + 2x²" /
// "x + x²"; linear-equation-1var "5x = 12 − 3" / "4x + 7 = 31";
// quadratic-equation discriminant / "x² + 3x + 1 no integer pair".
const ALGEBRA: SeedProbe[] = [
  {
    conceptId: 'math.alg.equation', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Solving 2x + 6 = 10, a student subtracts 6 from the left only and writes 2x = 10. What did they miss?',
    choices: [
      { text: 'Whatever is done to one side must be done to the other, so it should be 2x = 4', isCorrect: true },
      { text: 'Nothing — you only clear the side with the variable', isCorrect: false, misconceptionId: 'math.alg.equation:MC-one-sided-operation' },
      { text: 'They should have added 6 instead', isCorrect: false, misconceptionId: 'math.alg.equation:MC-inverse-direction' },
    ],
    targetedMisconceptions: ['math.alg.equation:MC-one-sided-operation'],
    source: src('math.alg.equation', 'the balance is broken when an operation is applied to one side'),
  },
  {
    conceptId: 'math.alg.equation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What does the "=" in 3x + 1 = 7 assert?',
    choices: [
      { text: 'That the two sides have the same value — it is a claim to be kept true, not an instruction to compute', isCorrect: true },
      { text: 'That the answer follows next, like the = on a calculator', isCorrect: false, misconceptionId: 'math.alg.equation:MC-equals-as-operator' },
    ],
    targetedMisconceptions: ['math.alg.equation:MC-equals-as-operator'],
    source: src('math.alg.equation', 'the operator reading of equals, carried from arithmetic'),
  },
  {
    conceptId: 'math.alg.equation', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A student solving x² = 9 writes x = 3. Is that the complete solution?',
    choices: [
      { text: 'No — x = −3 also satisfies it, so both roots must be given', isCorrect: true },
      { text: 'Yes — a square root has one value', isCorrect: false, misconceptionId: 'math.alg.equation:MC-lost-negative-root' },
    ],
    targetedMisconceptions: ['math.alg.equation:MC-lost-negative-root'],
    source: src('math.alg.equation', 'the negative root dropped when undoing a square'),
  },
  {
    conceptId: 'math.alg.equation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'From x(x − 2) = 0, what can be concluded?',
    choices: [
      { text: 'x = 0 or x = 2 — a product is zero only when a factor is zero', isCorrect: true },
      { text: 'x = 2 only', isCorrect: false, misconceptionId: 'math.alg.equation:MC-discard-trivial-root' },
      { text: 'x − 2 = 0 and x = 0 must both hold', isCorrect: false, misconceptionId: 'math.alg.equation:MC-and-vs-or' },
    ],
    targetedMisconceptions: ['math.alg.equation:MC-and-vs-or'],
    source: src('math.alg.equation', 'the zero-product property read as a conjunction'),
  },
  {
    conceptId: 'math.alg.expression', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the difference between 3x + 5 and 3x + 5 = 11?',
    choices: [
      { text: 'The first is an expression — a value depending on x. The second is an equation, a claim that can be solved', isCorrect: true },
      { text: 'Nothing — they mean the same thing', isCorrect: false, misconceptionId: 'math.alg.expression:MC-expression-is-equation' },
      { text: 'The first is unfinished and must be set equal to something', isCorrect: false, misconceptionId: 'math.alg.expression:MC-expression-needs-answer' },
    ],
    targetedMisconceptions: ['math.alg.expression:MC-expression-is-equation'],
    source: src('math.alg.expression', 'expression and equation conflated — the source of "solve 4x + 3"'),
  },
  {
    conceptId: 'math.alg.expression', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'In the expression 5y, what does the 5 do?',
    choices: [
      { text: 'It multiplies y — 5y means five lots of whatever y is', isCorrect: true },
      { text: 'It is added to y', isCorrect: false, misconceptionId: 'math.alg.expression:MC-juxtaposition-as-addition' },
      { text: 'It is a digit placed in front, like 5 and y written together', isCorrect: false, misconceptionId: 'math.alg.expression:MC-concatenation' },
    ],
    targetedMisconceptions: ['math.alg.expression:MC-juxtaposition-as-addition'],
    source: src('math.alg.expression', 'implied multiplication read as concatenation or addition'),
  },
  {
    conceptId: 'math.alg.like-terms', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Simplify 5a + 3b, if possible.',
    choices: [
      { text: 'It is already simplified — a and b are different unknowns and cannot be combined', isCorrect: true },
      { text: '8ab', isCorrect: false, misconceptionId: 'math.alg.like-terms:MC-combine-unlike' },
      { text: '8', isCorrect: false, misconceptionId: 'math.alg.like-terms:MC-drop-variables' },
    ],
    targetedMisconceptions: ['math.alg.like-terms:MC-combine-unlike'],
    source: src('math.alg.like-terms', 'unlike terms combined under pressure to produce a single answer'),
  },
  {
    conceptId: 'math.alg.linear-equation-1var', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'To solve 3x = 12, which single step finishes it?',
    choices: [
      { text: 'Divide both sides by 3 — the inverse of multiplying by 3', isCorrect: true },
      { text: 'Subtract 3 from both sides', isCorrect: false, misconceptionId: 'math.alg.linear-equation-1var:MC-wrong-inverse' },
      { text: 'Multiply both sides by 3', isCorrect: false, misconceptionId: 'math.alg.linear-equation-1var:MC-inverse-direction' },
    ],
    targetedMisconceptions: ['math.alg.linear-equation-1var:MC-wrong-inverse'],
    source: src('math.alg.linear-equation-1var', 'the inverse chosen by operation-type rather than by what undoes it'),
  },
  {
    conceptId: 'math.alg.quadratic-equation', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A student solves x² = 5x by dividing both sides by x, getting x = 5. What has been lost?',
    choices: [
      { text: 'The root x = 0 — dividing by x assumes x is not zero, and here it can be', isCorrect: true },
      { text: 'Nothing — x = 5 is the whole solution', isCorrect: false, misconceptionId: 'math.alg.quadratic-equation:MC-divide-by-variable' },
    ],
    targetedMisconceptions: ['math.alg.quadratic-equation:MC-divide-by-variable'],
    source: src('math.alg.quadratic-equation', 'dividing through by the variable silently discards a root'),
  },
]

// ─── math.calc ───────────────────────────────────────────────────────────────
const CALCULUS: SeedProbe[] = [
  {
    conceptId: 'math.calc.limits', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'g(x) = 1 for every x except x = 3, where g(3) = 7. What is lim_{x→3} g(x)?',
    choices: [
      { text: '1 — a limit describes the approach, and the value AT the point is irrelevant', isCorrect: true },
      { text: '7 — the limit is the function value there', isCorrect: false, misconceptionId: 'math.calc.limits:MC-limit-is-value' },
    ],
    targetedMisconceptions: ['math.calc.limits:MC-limit-is-value'],
    source: src('math.calc.limits', 'the limit confused with the function value at the point'),
  },
  {
    conceptId: 'math.calc.derivative-intro', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'For f(x) = x², f′(3) = 6. What does the 6 measure?',
    choices: [
      { text: 'The instantaneous rate of change of f at x = 3 — the slope of the tangent there', isCorrect: true },
      { text: 'The value of f at x = 3', isCorrect: false, misconceptionId: 'math.calc.derivative-intro:MC-derivative-is-value' },
      { text: 'The average slope between x = 0 and x = 3', isCorrect: false, misconceptionId: 'math.calc.derivative-intro:MC-average-vs-instantaneous' },
    ],
    targetedMisconceptions: ['math.calc.derivative-intro:MC-average-vs-instantaneous'],
    source: src('math.calc.derivative-intro', 'average rate over an interval vs instantaneous rate at a point'),
  },
  {
    conceptId: 'math.calc.chain-rule', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A student differentiates (3x + 1)⁵ as 5(3x + 1)⁴. What is missing?',
    choices: [
      { text: 'The derivative of the inside, 3 — the answer is 15(3x + 1)⁴', isCorrect: true },
      { text: 'Nothing — the power rule is complete', isCorrect: false, misconceptionId: 'math.calc.chain-rule:MC-forgotten-inner-derivative' },
      { text: 'The inside should also be differentiated to 3x', isCorrect: false, misconceptionId: 'math.calc.chain-rule:MC-inner-mishandled' },
    ],
    targetedMisconceptions: ['math.calc.chain-rule:MC-forgotten-inner-derivative'],
    source: src('math.calc.chain-rule', 'the inner derivative dropped — the commonest chain-rule slip'),
  },
  {
    conceptId: 'math.calc.antiderivatives', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why does ∫2x dx = x² + C carry the "+ C"?',
    choices: [
      { text: 'Because every function differing by a constant has the same derivative, so the antiderivative is a family, not one function', isCorrect: true },
      { text: 'It is a convention with no mathematical content', isCorrect: false, misconceptionId: 'math.calc.antiderivatives:MC-constant-is-decorative' },
      { text: 'Because the integral is only approximate', isCorrect: false, misconceptionId: 'math.calc.antiderivatives:MC-integral-approximate' },
    ],
    targetedMisconceptions: ['math.calc.antiderivatives:MC-constant-is-decorative'],
    source: src('math.calc.antiderivatives', 'the constant of integration copied without meaning'),
  },
]

// ─── math.linalg / math.abst / math.func ─────────────────────────────────────
const STRUCTURES: SeedProbe[] = [
  {
    conceptId: 'math.linalg.determinant', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 2×2 matrix has determinant 0. What follows?',
    choices: [
      { text: 'It has no inverse — its columns are linearly dependent', isCorrect: true },
      { text: 'It is the zero matrix', isCorrect: false, misconceptionId: 'math.linalg.determinant:MC-zero-det-zero-matrix' },
      { text: 'Its inverse is the zero matrix', isCorrect: false, misconceptionId: 'math.linalg.determinant:MC-zero-inverse' },
    ],
    targetedMisconceptions: ['math.linalg.determinant:MC-zero-det-zero-matrix'],
    source: src('math.linalg.determinant', 'a zero determinant read as a zero matrix'),
  },
  {
    conceptId: 'math.linalg.matrix-multiplication', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A is 2×3 and B is 3×4. What is the size of AB?',
    choices: [
      { text: '2×4 — the inner dimensions match and cancel, leaving the outer ones', isCorrect: true },
      { text: '3×3', isCorrect: false, misconceptionId: 'math.linalg.matrix-multiplication:MC-inner-dimensions-kept' },
      { text: 'It cannot be computed', isCorrect: false, misconceptionId: 'math.linalg.matrix-multiplication:MC-same-shape-required' },
    ],
    targetedMisconceptions: ['math.linalg.matrix-multiplication:MC-inner-dimensions-kept'],
    source: src('math.linalg.matrix-multiplication', 'conformability and the shape of the product'),
  },
  {
    conceptId: 'math.abst.group-theory', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Are the integers under subtraction a group?',
    choices: [
      { text: 'No — subtraction is not associative, so one of the group axioms fails', isCorrect: true },
      { text: 'Yes — subtraction is closed on ℤ and 0 acts as an identity', isCorrect: false, misconceptionId: 'math.abst.group-theory:MC-closure-suffices' },
    ],
    targetedMisconceptions: ['math.abst.group-theory:MC-closure-suffices'],
    source: src('math.abst.group-theory', 'closure mistaken for the whole of the group axioms'),
  },
  {
    conceptId: 'math.func.function-concept', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A rule pairs 3 with both 5 and 9. Is it a function?',
    choices: [
      { text: 'No — a function gives each input exactly one output', isCorrect: true },
      { text: 'Yes — repeated outputs are allowed in a function', isCorrect: false, misconceptionId: 'math.func.function-concept:MC-input-output-direction' },
    ],
    targetedMisconceptions: ['math.func.function-concept:MC-input-output-direction'],
    source: src('math.func.function-concept', 'the one-output rule applied to the wrong side of the pairing'),
  },
]

// ─── math.prob / math.trig ───────────────────────────────────────────────────
const PROB_TRIG: SeedProbe[] = [
  {
    conceptId: 'math.prob.classical-probability', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A fair coin has landed heads five times running. What is P(heads) on the next toss?',
    choices: [
      { text: '1/2 — the coin has no memory of previous tosses', isCorrect: true },
      { text: 'Less than 1/2, because tails is overdue', isCorrect: false, misconceptionId: 'math.prob.classical-probability:MC-gamblers-fallacy' },
      { text: 'More than 1/2, because heads is on a run', isCorrect: false, misconceptionId: 'math.prob.classical-probability:MC-hot-hand' },
    ],
    targetedMisconceptions: ['math.prob.classical-probability:MC-gamblers-fallacy'],
    source: src('math.prob.classical-probability', 'independence denied by the gambler\'s fallacy'),
  },
  {
    conceptId: 'math.prob.conditional-probability', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A disease affects 1 in 1000. A test is 99% accurate and a random person tests positive. Is it near-certain they have it?',
    choices: [
      { text: 'No — the healthy majority produces many false positives, so the chance stays well below certainty', isCorrect: true },
      { text: 'Yes — the test is 99% accurate, so they are 99% likely to have it', isCorrect: false, misconceptionId: 'math.prob.conditional-probability:MC-base-rate-neglect' },
    ],
    targetedMisconceptions: ['math.prob.conditional-probability:MC-base-rate-neglect'],
    source: src('math.prob.conditional-probability', 'base-rate neglect — test accuracy read as posterior probability'),
  },
  {
    conceptId: 'math.prob.expected-value', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A fair die is rolled. What is the expected value?',
    choices: [
      { text: '3.5 — the probability-weighted average, which is not itself a possible roll', isCorrect: true },
      { text: '6, the most you can score', isCorrect: false, misconceptionId: 'math.prob.expected-value:MC-expected-as-maximum' },
      { text: 'It has none, since no face shows 3.5', isCorrect: false, misconceptionId: 'math.prob.expected-value:MC-must-be-attainable' },
    ],
    targetedMisconceptions: ['math.prob.expected-value:MC-must-be-attainable'],
    source: src('math.prob.expected-value', 'expectation required to be an attainable outcome'),
  },
  {
    conceptId: 'math.trig.right-triangle-trig', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'In a right triangle, which side is the hypotenuse?',
    choices: [
      { text: 'The one opposite the right angle — always the longest', isCorrect: true },
      { text: 'Whichever side is drawn at the bottom', isCorrect: false, misconceptionId: 'math.trig.right-triangle-trig:MC-orientation-dependent' },
      { text: 'The side adjacent to the angle being used', isCorrect: false, misconceptionId: 'math.trig.right-triangle-trig:MC-hypotenuse-is-adjacent' },
    ],
    targetedMisconceptions: ['math.trig.right-triangle-trig:MC-orientation-dependent'],
    source: src('math.trig.right-triangle-trig', 'side roles read off the drawing rather than off the right angle'),
  },
  {
    conceptId: 'math.trig.trig-functions', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Can sin(x) ever equal 1.4?',
    choices: [
      { text: 'No — sine is a ratio bounded between −1 and 1', isCorrect: true },
      { text: 'Yes, for a large enough angle', isCorrect: false, misconceptionId: 'math.trig.trig-functions:MC-unbounded-sine' },
    ],
    targetedMisconceptions: ['math.trig.trig-functions:MC-unbounded-sine'],
    source: src('math.trig.trig-functions', 'sine treated as unbounded like a polynomial'),
  },
  {
    conceptId: 'math.trig.unit-circle', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'On the unit circle, in which quadrant is sin θ positive while cos θ is negative?',
    choices: [
      { text: 'The second — y is above the axis while x is to its left', isCorrect: true },
      { text: 'The fourth', isCorrect: false, misconceptionId: 'math.trig.unit-circle:MC-quadrant-signs-swapped' },
      { text: 'The third', isCorrect: false, misconceptionId: 'math.trig.unit-circle:MC-both-negative' },
    ],
    targetedMisconceptions: ['math.trig.unit-circle:MC-quadrant-signs-swapped'],
    source: src('math.trig.unit-circle', 'quadrant sign patterns memorised without the coordinate meaning'),
  },
]

export const MATHEMATICS_PROBES: SeedProbe[] = [
  ...ADDITION, ...SUBTRACTION, ...MULTIPLICATION, ...DIVISION, ...TOP_UPS,
  ...FOUNDATIONS, ...GEOMETRY, ...NUMBER_THEORY,
  ...ALGEBRA, ...CALCULUS, ...STRUCTURES, ...PROB_TRIG,
]

/** No explanations are added here — every concept above already serves one. */
export const MATHEMATICS_EXPLANATIONS: never[] = []

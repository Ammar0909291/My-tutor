/**
 * The bands that could be TAUGHT but never QUIZZED.
 *
 * ── THE DEFECT, MEASURED ────────────────────────────────────────────────────
 * `mathematicsSeedAssets.ts` states the rule it followed: "Grade bands match
 * what each concept already serves … a band with probes but no explanation
 * would be worse than no band at all." That is right, and its CONVERSE is the
 * defect this file closes — an explanation in a band with no probes.
 *
 * Five (concept, band) pairs carried a `core_explanation` at one band while
 * every gradeable probe for the concept sat at a higher one:
 *
 *     math.arith.addition      EARLY   taught, probes only ELEMENTARY
 *     math.arith.subtraction   EARLY   taught, probes only ELEMENTARY
 *     math.arith.division      EARLY   taught, probes only ELEMENTARY/MIDDLE
 *     math.found.logic         MIDDLE  taught, probes only HIGH
 *     math.arith.fractions     ADULT   taught, probes only MIDDLE
 *
 * ── WHY THAT IS FATAL RATHER THAN MERELY UNTIDY ─────────────────────────────
 * `matcher.ts` scores a probe from a base of 50: +25 for an exact band, +10 at
 * one band's distance, +0 beyond, against `DEFAULT_CONFIDENCE_THRESHOLD = 65`.
 * So an adjacent band scores 60 and is REFUSED, and two bands out scores 50.
 * (The single exception, HIGH<->ADULT at +15, does not reach any pair above.)
 * A learner placed at one of these bands is therefore taught and then offered
 * NO gradeable question at all — the gate pool is empty, not thin.
 *
 * The runtime handles that correctly and the learner still loses: with no
 * probe, `withholdUngradedGateQuestion` strips the model's prose question
 * rather than present something ungradeable, so the turn teaches and asks
 * nothing. Mastery needs `correctAtCheck >= 1` and `correctAtPractice >= 2`,
 * which no unasked question can supply, and the lesson cannot close — observed
 * in certification as D3-unreachable after the full 24-turn limit.
 *
 * The bands themselves are correct and are deliberately NOT removed: teaching
 * addition at EARLY, logic at MIDDLE and fractions to an adult returner is the
 * point of having bands. What was missing is the questions, so this file adds
 * exactly those — three per pair, the mastery bar, with no re-asking.
 *
 * ── HOW THESE WERE WRITTEN ──────────────────────────────────────────────────
 * Every distractor is a real error at THAT band, carrying the `misconceptionId`
 * naming it so a wrong answer routes to repair. Misconception ids reuse the
 * identifiers already ACTIVE for the same concept; each maps to a numbered row
 * of that concept's registry, named per entry below. Stems are checked against
 * the probes already serving the concept so none repeats a question the learner
 * may meet at another band.
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

// ─── math.arith.addition @ EARLY ─────────────────────────────────────────────
// Registry: MC-1 CARRYING-BREAKDOWN, MC-2 COMMUTATIVITY-UNKNOWN,
// MC-3 ZERO-ANNIHILATES. Carrying is out of band at EARLY (single-digit work),
// so this set uses MC-2 and MC-3, which are exactly EARLY-band errors, plus the
// digit-concatenation slip the ELEMENTARY set already names.
const ADDITION_EARLY: SeedProbe[] = [
  {
    conceptId: 'math.arith.addition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You have 4 stickers. A friend gives you 3 more. How many stickers do you have now?',
    choices: [
      { text: '7', isCorrect: true },
      { text: '43', isCorrect: false, misconceptionId: 'math.arith.addition:MC-digit-concatenation' },
      { text: '1', isCorrect: false, misconceptionId: 'math.arith.addition:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.addition:MC-digit-concatenation'],
    source: src('math.arith.addition', 'writing the two digits side by side instead of combining them'),
  },
  {
    conceptId: 'math.arith.addition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know that 2 + 6 = 8. Without counting again, what is 6 + 2?',
    choices: [
      { text: '8 — it is the same two numbers, just said the other way round', isCorrect: true },
      { text: 'You cannot tell without counting it out', isCorrect: false, misconceptionId: 'math.arith.addition:MC-commutativity' },
      { text: '4', isCorrect: false, misconceptionId: 'math.arith.addition:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.addition:MC-commutativity'],
    source: src('math.arith.addition', 'MC-2 COMMUTATIVITY-UNKNOWN at the counting-on stage'),
  },
  {
    conceptId: 'math.arith.addition', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'There are 5 birds on a branch. No more birds come. How many birds are on the branch?',
    choices: [
      { text: '5 — adding nothing leaves it exactly as it was', isCorrect: true },
      { text: '0 — adding nothing makes it nothing', isCorrect: false, misconceptionId: 'math.arith.addition:MC-zero-annihilates' },
      { text: '6', isCorrect: false, misconceptionId: 'math.arith.addition:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.addition:MC-zero-annihilates'],
    source: src('math.arith.addition', 'MC-3 ZERO-ANNIHILATES — the a×0=0 rule carried into addition'),
  },
]

// ─── math.arith.subtraction @ EARLY ──────────────────────────────────────────
// Registry: MC-1 SMALLER-FROM-LARGER, MC-2 COMMUTATIVITY-ASSUMED,
// MC-3 BORROW-NOT-REDUCED. Borrowing is out of band at EARLY, so MC-1 is asked
// in its single-digit form (the take-away that runs past zero) and MC-2 direct.
const SUBTRACTION_EARLY: SeedProbe[] = [
  {
    conceptId: 'math.arith.subtraction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You have 8 grapes and you eat 3 of them. How many grapes are left?',
    choices: [
      { text: '5', isCorrect: true },
      { text: '11', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-operation-choice' },
      { text: '3', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-smaller-from-larger' },
    ],
    targetedMisconceptions: ['math.arith.subtraction:MC-operation-choice'],
    source: src('math.arith.subtraction', 'take-away read as combine'),
  },
  {
    conceptId: 'math.arith.subtraction', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A child says "7 − 2 and 2 − 7 must give the same answer, because 7 + 2 and 2 + 7 do." Is that right?',
    choices: [
      { text: 'No — with take-away it matters which number you start from', isCorrect: true },
      { text: 'Yes — the order never matters in maths', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-commutativity-transfer' },
      { text: 'Yes, but only when both numbers are small', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-commutativity-transfer' },
    ],
    targetedMisconceptions: ['math.arith.subtraction:MC-commutativity-transfer'],
    source: src('math.arith.subtraction', 'MC-2 COMMUTATIVITY-ASSUMED carried over from addition'),
  },
  {
    conceptId: 'math.arith.subtraction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'There are 6 cars in a car park and 6 of them drive away. How many are left?',
    choices: [
      { text: '0', isCorrect: true },
      { text: '6 — taking away the same number changes nothing', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-operation-choice' },
      { text: '1', isCorrect: false, misconceptionId: 'math.arith.subtraction:MC-smaller-from-larger' },
    ],
    targetedMisconceptions: ['math.arith.subtraction:MC-operation-choice'],
    source: src('math.arith.subtraction', 'taking a quantity from itself, the zero result at EARLY band'),
  },
]

// ─── math.arith.division @ EARLY ─────────────────────────────────────────────
// Registry: MC-1 DIVISION-COMMUTATIVE, MC-2 DIVISION-BY-ZERO-DEFINED,
// MC-3 REMAINDER-IGNORED. At EARLY, division is sharing into equal groups;
// MC-2 is out of band, so MC-1 and MC-3 are asked in their sharing form.
const DIVISION_EARLY: SeedProbe[] = [
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '6 biscuits are shared equally between 2 children. How many does each child get?',
    choices: [
      { text: '3', isCorrect: true },
      { text: '4', isCorrect: false, misconceptionId: 'math.arith.division:MC-operation-choice' },
      { text: '12', isCorrect: false, misconceptionId: 'math.arith.division:MC-operation-choice' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-operation-choice'],
    source: src('math.arith.division', 'sharing equally, the EARLY-band meaning of division'),
  },
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"10 shared between 2" gives 5. Does "2 shared between 10" also give 5?',
    choices: [
      { text: 'No — sharing 2 things between 10 children gives each child less than one', isCorrect: true },
      { text: 'Yes — it is the same two numbers', isCorrect: false, misconceptionId: 'math.arith.division:MC-commutative' },
      { text: 'Yes, sharing always works either way round', isCorrect: false, misconceptionId: 'math.arith.division:MC-commutative' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-commutative'],
    source: src('math.arith.division', 'MC-1 DIVISION-COMMUTATIVE, asked as sharing rather than as notation'),
  },
  {
    conceptId: 'math.arith.division', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.EARLY, difficulty: ProbeDifficulty.DEVELOPING,
    stem: '7 sweets are shared equally between 2 children. Each child gets 3. What happens to the sweet that is left over?',
    choices: [
      { text: 'It is left over — it is part of the answer, not a mistake', isCorrect: true },
      { text: 'You ignore it, because the answer is just 3', isCorrect: false, misconceptionId: 'math.arith.division:MC-remainder-ignored' },
      { text: 'It means the sharing was done wrongly', isCorrect: false, misconceptionId: 'math.arith.division:MC-remainder-ignored' },
    ],
    targetedMisconceptions: ['math.arith.division:MC-remainder-ignored'],
    source: src('math.arith.division', 'MC-3 REMAINDER-IGNORED — the leftover treated as an error'),
  },
]

// ─── math.found.logic @ MIDDLE ───────────────────────────────────────────────
// Registry (Blueprint Component 6, mirrored in the Educational Brain entry):
// MC-1 false antecedent, MC-2 converse, MC-3 example-as-proof, MC-4 inclusive
// OR. The HIGH set already asks MC-3, so this set takes the other three — all
// of which are language-contamination or overgeneralisation errors that land
// squarely in MIDDLE band, and none of which needs formal notation.
const LOGIC_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'math.found.logic', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '"If it rains, I take my umbrella." It did not rain, and I took my umbrella anyway. Did I break my promise?',
    choices: [
      { text: 'No — the promise only says what happens IF it rains, so it says nothing about a dry day', isCorrect: true },
      { text: 'Yes — the umbrella was only allowed on a rainy day', isCorrect: false, misconceptionId: 'math.found.logic:MC-false-antecedent' },
      { text: 'The promise cannot be judged at all when it does not rain', isCorrect: false, misconceptionId: 'math.found.logic:MC-false-antecedent' },
    ],
    targetedMisconceptions: ['math.found.logic:MC-false-antecedent'],
    source: src('math.found.logic', 'MC-1 — IF-THEN judged false or undefined when the IF part is false'),
  },
  {
    conceptId: 'math.found.logic', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"If a number is divisible by 4, then it is divisible by 2." Does that also mean every number divisible by 2 is divisible by 4?',
    choices: [
      { text: 'No — 6 is divisible by 2 and not by 4', isCorrect: true },
      { text: 'Yes — an IF-THEN statement works in both directions', isCorrect: false, misconceptionId: 'math.found.logic:MC-converse-equivalent' },
      { text: 'Yes, because 4 and 2 are related', isCorrect: false, misconceptionId: 'math.found.logic:MC-converse-equivalent' },
    ],
    targetedMisconceptions: ['math.found.logic:MC-converse-equivalent'],
    source: src('math.found.logic', 'MC-2 — the converse assumed equivalent, refuted by x=6'),
  },
  {
    conceptId: 'math.found.logic', subjectSlug: S, probeKind: 'mcq',
    // PROFICIENT, not DEVELOPING: the converse probe above already claims
    // mcq/MIDDLE/DEVELOPING, and two probes on one canonical identity means the
    // second is SKIPPED at seed time — which would leave this band at two
    // gradeable probes against a bar of three, i.e. the very defect this file
    // exists to close. Caught by mathematicsBandContract.test.ts.
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A rule says "you may have dessert if you finish your dinner OR tidy your room". You do BOTH. In mathematics, does the rule allow dessert?',
    choices: [
      { text: 'Yes — in mathematics "or" also covers doing both', isCorrect: true },
      { text: 'No — "or" means one or the other, never both', isCorrect: false, misconceptionId: 'math.found.logic:MC-inclusive-or' },
      { text: 'Only if you decide in advance which one counts', isCorrect: false, misconceptionId: 'math.found.logic:MC-inclusive-or' },
    ],
    targetedMisconceptions: ['math.found.logic:MC-inclusive-or'],
    source: src('math.found.logic', 'MC-4 — everyday exclusive "or" carried into inclusive mathematical OR'),
  },
]

// ─── math.arith.fractions @ ADULT ────────────────────────────────────────────
// Register (Educational Brain entry, M1–M5): M1 bigger denominator = bigger
// fraction, M2 top and bottom as two separate numbers, M3 a fraction cannot
// exceed 1. The MIDDLE set already asks M1 and M2 in a cake-and-pizza framing;
// these are the same three errors met where an adult returner meets them — a
// recipe, a tape measure, a bill.
const FRACTIONS_ADULT: SeedProbe[] = [
  {
    conceptId: 'math.arith.fractions', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A recipe needs 1/3 of a cup of oil. You only have a 1/4 cup measure. Is one level 1/4 cup enough?',
    choices: [
      { text: 'No — a quarter is less than a third, because dividing into more pieces makes each piece smaller', isCorrect: true },
      { text: 'Yes — 4 is bigger than 3, so 1/4 is the larger amount', isCorrect: false, misconceptionId: 'math.arith.fractions:M1' },
      { text: 'Yes — they are close enough to be the same', isCorrect: false, misconceptionId: 'math.arith.fractions:M1' },
    ],
    targetedMisconceptions: ['math.arith.fractions:M1'],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Misconceptions, M1, met as a kitchen measure',
  },
  {
    conceptId: 'math.arith.fractions', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A colleague works 1/4 of a day on Monday and 1/4 of a day on Tuesday, and writes the total as 2/8 of a day. What has gone wrong?',
    choices: [
      { text: 'They added the bottom numbers as well — the pieces are still quarters, so it is 2/4, or half a day', isCorrect: true },
      { text: 'Nothing — 2/8 is correct', isCorrect: false, misconceptionId: 'math.arith.fractions:M2' },
      { text: 'They should have multiplied the two fractions instead', isCorrect: false, misconceptionId: 'math.arith.fractions:M2' },
    ],
    targetedMisconceptions: ['math.arith.fractions:M2'],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Misconceptions, M2, adding across as a timesheet error',
  },
  {
    conceptId: 'math.arith.fractions', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A job takes 5/4 hours. Is that a valid amount of time?',
    choices: [
      { text: 'Yes — it is five quarter-hours, which is one and a quarter hours', isCorrect: true },
      { text: 'No — the top of a fraction can never be larger than the bottom', isCorrect: false, misconceptionId: 'math.arith.fractions:M3' },
      { text: 'No — it must be written as 4/5 of an hour', isCorrect: false, misconceptionId: 'math.arith.fractions:M3' },
    ],
    targetedMisconceptions: ['math.arith.fractions:M3'],
    source: 'educational-brain/concepts/mathematics/math.arith.fractions.md — Misconceptions, M3, a fraction above 1 read as an error',
  },
]

export const MATHEMATICS_BAND_GAP_PROBES: SeedProbe[] = [
  ...ADDITION_EARLY, ...SUBTRACTION_EARLY, ...DIVISION_EARLY,
  ...LOGIC_MIDDLE, ...FRACTIONS_ADULT,
]

/** No explanations are added here — every band above already has one; that is the defect. */
export const MATHEMATICS_BAND_GAP_EXPLANATIONS: never[] = []

/**
 * Seventh batch — the parts of an expression, and the exponents that look
 * like exceptions.
 *
 * Three clusters, chosen because each one is a place where a learner who can
 * DO the manipulation still cannot say what they are looking at:
 *
 *   PARTS        term, coefficient, degree. The vocabulary that lets a hint
 *                be given at all. "Collect like terms" is unusable advice to
 *                someone who cannot see where one term stops.
 *   ANSWERS      inequality, solution-set. Where the answer stops being a
 *                number and becomes a set — and the sign flip that is a
 *                consequence of that, not a rule to remember.
 *   EDGES        exponent-rules, zero-exponent, negative-exponent. a^0 = 1
 *                and a^-n = 1/a^n are taught as decrees and are forced:
 *                the pattern that already holds leaves no other option.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TERM = 'math.alg.term'
const COEF = 'math.alg.coefficient'
const DEG = 'math.alg.degree'
const INEQ = 'math.alg.inequality'
const SOLSET = 'math.alg.solution-set'
const ZEXP = 'math.alg.zero-exponent'
const NEXP = 'math.alg.negative-exponent'
const EXPR = 'math.arith.exponent-rules'

export const MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TERM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Read 3x² − 7x + 5 and the plus and minus signs are doing a job beyond arithmetic: they '
      + 'are the fences. What sits between two fences is a term, so this expression has '
      + 'three of them — 3x², −7x and 5.\n\n'
      + 'Two things follow that catch people out. A lone number is a full term; 5 is not '
      + 'left over from the real ones. And the sign in front travels WITH the term — the '
      + 'middle term is −7x, not 7x, which is why moving terms around stops producing wrong '
      + 'answers once you carry the sign.\n\n'
      + 'Multiplication and division do NOT fence. 3x² is one term even though a 3, an x and '
      + 'a squaring are all inside it, because they are bound together by multiplying. That '
      + 'is why "collect like terms" is a usable instruction: it assumes you can see where '
      + 'one term stops, and until you can, the instruction means nothing.',
    targetedMisconceptions: [`${TERM}:MC-1`, `${TERM}:MC-2`],
    source: eb(TERM, 'Identity + Misconception register — + and − fence, × does not'),
  },
  {
    conceptId: COEF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Inside a term, the coefficient is the number part: in 3x² it is 3, and in −7x it is '
      + '−7. It answers "how many of these?", and the variable part answers "of what?".\n\n'
      + 'The case that costs marks is the one with nothing written. In x², the coefficient is '
      + '1, because x² means 1 × x² and multiplying by 1 changes nothing, so nobody bothers '
      + 'to write it. It is invisible, not absent — and when you subtract x² from 5x² you '
      + 'need it to be there, because 5 − 1 is 4.\n\n'
      + 'The coefficient stops at the number. In 3x² the coefficient is 3 and not 3x, and the '
      + 'minus sign in −7x belongs to the coefficient, not to the x. Keeping that boundary '
      + 'sharp is what makes like terms combinable: 3x² and 5x² add to 8x² because only the '
      + '"how many" changed.',
    targetedMisconceptions: [`${COEF}:MC-1`, `${COEF}:MC-2`],
    source: eb(COEF, 'Identity + Misconception register — the implied coefficient of 1'),
  },
  {
    conceptId: DEG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The degree of a polynomial is the highest power appearing in it. In 4x³ − x + 9 the '
      + 'degree is 3, and that single number predicts a surprising amount: the graph\'s '
      + 'long-run shape, and a ceiling of 3 on how many roots it can have.\n\n'
      + 'Ceiling, not count. x² + 1 has degree 2 and no real roots at all; x² − 4 has degree '
      + '2 and exactly two. The degree says "at most this many", which is a genuinely '
      + 'different claim from "this many".\n\n'
      + 'With more than one variable, a term\'s degree is the SUM of its exponents, so x²y³ '
      + 'has degree 5, not 3. And only terms that survive count — if simplifying kills a '
      + 'term, its power goes with it, because degree is a property of the polynomial, not '
      + 'of how it happened to be written down.',
    targetedMisconceptions: [`${DEG}:MC-1`, `${DEG}:MC-2`],
    source: eb(DEG, 'Identity + Misconception register — a ceiling on roots, and summed exponents'),
  },
  {
    conceptId: INEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'An equation asks which values make two things equal; an inequality asks which values '
      + 'make one bigger than the other. Solve x + 3 = 7 and you get a point, x = 4. Solve '
      + 'x + 3 > 7 and you get everything past a point: x > 4, an infinite stretch of the '
      + 'number line.\n\n'
      + 'That is why the answer is drawn rather than written as a single value, and why the '
      + 'circle at 4 matters. For x > 4 the endpoint is hollow — 4 itself does not qualify. '
      + 'For x ≥ 4 it is filled. One boundary value is the whole difference between the two.\n\n'
      + 'Multiplying or dividing by a negative flips the sign, and this is forced rather than '
      + 'decreed. 2 < 5 is true; multiply both sides by −1 and you have −2 and −5, and −2 is '
      + 'the larger. Negating reverses the order of the number line, so the symbol has to '
      + 'turn round to keep telling the truth.',
    targetedMisconceptions: [`${INEQ}:MC-1`, `${INEQ}:MC-2`],
    source: eb(INEQ, 'Identity + Misconception register — the flip as a consequence of negation'),
  },
  {
    conceptId: SOLSET, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The solution set is EVERY value that satisfies the statement — not the first one you '
      + 'find. x² = 9 has solution set {3, −3}, and stopping at 3 is not a slightly '
      + 'incomplete answer; it is a different answer to a different question.\n\n'
      + 'Thinking in sets makes the strange cases ordinary. x + 1 = x + 2 has solution set ∅ '
      + '— nothing works. x + 1 = x + 1 has solution set ℝ — everything works. Without the '
      + 'set language both look like the problem broke; with it, they are simply an empty '
      + 'answer and a very full one.\n\n'
      + 'Those two are opposites and are easy to swap under pressure, so it is worth testing '
      + 'rather than recalling: substitute 0. If it works and 1 works and 7 works, you are '
      + 'looking at "all reals", and if nothing works you are looking at the empty set.',
    targetedMisconceptions: [`${SOLSET}:MC-1`, `${SOLSET}:MC-2`],
    source: eb(SOLSET, 'Identity + Misconception register — empty and all-reals are opposites'),
  },
  {
    conceptId: EXPR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Every exponent rule is bookkeeping over what a power already means. a³ · a² is '
      + '(a·a·a)(a·a) — five a\'s multiplied — so the exponents ADD: a⁵. Nothing was decided; '
      + 'it was counted.\n\n'
      + 'The rule people most often mix up is the next one. (a³)² is a³ · a³, which is six '
      + 'a\'s, so here the exponents MULTIPLY: a⁶. Multiplying powers adds; raising a power '
      + 'to a power multiplies. Writing out the a\'s once settles which is which more '
      + 'reliably than repeating the words.\n\n'
      + 'Division subtracts, for the same reason: a⁵/a² cancels two a\'s from five and leaves '
      + 'a³. And (ab)ⁿ = aⁿbⁿ because the factors can be reordered. Every rule here is a '
      + 'count you could redo by hand, which is what makes them recoverable when memory '
      + 'fails.',
    targetedMisconceptions: [`${EXPR}:MC-1`, `${EXPR}:MC-2`],
    source: eb(EXPR, 'Identity + Misconception register — add for products, multiply for towers'),
  },
  {
    conceptId: ZEXP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'a⁰ = 1 looks arbitrary and is not chosen. Follow the powers of 2 downward — 16, 8, 4, '
      + '2 — and each step halves. The next step is 1, and the exponent has reached zero.\n\n'
      + 'The division rule forces the same answer. a⁵/a⁵ is 1, because anything divided by '
      + 'itself is 1. But subtracting exponents makes it a⁰. Both readings are correct, so '
      + 'a⁰ has to BE 1 — any other value would break the rule everywhere else it is used.\n\n'
      + 'Zero exponent does not mean zero of anything; it means "no factors left", and the '
      + 'empty product is 1, just as an empty sum is 0. The one genuine exclusion is a = 0: '
      + '0⁰ is left undefined, because 0⁵/0⁵ divides by zero and the argument above never '
      + 'gets started.',
    targetedMisconceptions: [`${ZEXP}:MC-1`, `${ZEXP}:MC-2`],
    source: eb(ZEXP, 'Identity + Misconception register — forced by the quotient rule, undefined at 0'),
  },
  {
    conceptId: NEXP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Keep halving past a⁰ and the powers of 2 continue: 4, 2, 1, then ½, then ¼. Those are '
      + '2⁻¹ and 2⁻². A negative exponent is a reciprocal, so a⁻ⁿ = 1/aⁿ.\n\n'
      + 'The sign of the exponent has nothing to do with the sign of the answer. 2⁻³ = 1/8, '
      + 'which is small and positive, not −8. The minus is an instruction about WHERE the '
      + 'power goes — downstairs — not about which side of zero the value lands on.\n\n'
      + 'Because it means "the other side of the fraction bar", moving a factor across flips '
      + 'the sign of its exponent: 1/x⁻² is x², and x³/x⁵ is x⁻² is 1/x². This is what makes '
      + 'negative exponents worth having at all — one rule, aᵐ/aⁿ = aᵐ⁻ⁿ, now works whether '
      + 'm is bigger than n or not, with no separate case to remember.',
    targetedMisconceptions: [`${NEXP}:MC-1`, `${NEXP}:MC-2`],
    source: eb(NEXP, 'Identity + Misconception register — reciprocal, not negation'),
  },
]

export const MATHEMATICS_ALGEBRA_VOCAB_PROBES: SeedProbe[] = [
  // --- math.alg.term ---------------------------------------------------------
  {
    conceptId: TERM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many terms are in 3x² − 7x + 5?',
    choices: [
      { text: 'Three — the + and − signs separate them', isCorrect: true },
      { text: 'Two — 5 is just a number, not a term', isCorrect: false, misconceptionId: `${TERM}:MC-2` },
      { text: 'Five — 3, x², 7, x and 5', isCorrect: false, misconceptionId: `${TERM}:MC-1` },
    ],
    targetedMisconceptions: [`${TERM}:MC-1`, `${TERM}:MC-2`],
    source: eb(TERM, 'Assessment gate — counting terms'),
  },
  {
    conceptId: TERM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why is 4xy a single term rather than three?',
    choices: [
      { text: 'Its parts are joined by multiplication, and only + and − separate terms', isCorrect: true },
      { text: 'Because it is short enough to count as one', isCorrect: false, misconceptionId: `${TERM}:MC-1` },
      { text: 'It is three terms: 4, x and y', isCorrect: false, misconceptionId: `${TERM}:MC-1` },
    ],
    targetedMisconceptions: [`${TERM}:MC-1`],
    source: eb(TERM, 'Misconception register — multiplication does not fence'),
  },
  {
    conceptId: TERM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In 2a − 9b + 1, what is the second term?',
    choices: [
      { text: '−9b — the sign in front belongs to the term', isCorrect: true },
      { text: '9b — the minus is an operation, not part of it', isCorrect: false, misconceptionId: `${TERM}:MC-1` },
      { text: '−9 — the letter is separate', isCorrect: false, misconceptionId: `${TERM}:MC-3` },
    ],
    targetedMisconceptions: [`${TERM}:MC-1`, `${TERM}:MC-3`],
    source: eb(TERM, 'Transfer probe — the sign travels with the term'),
  },

  // --- math.alg.coefficient --------------------------------------------------
  {
    conceptId: COEF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the coefficient in the term −7x?',
    choices: [
      { text: '−7', isCorrect: true },
      { text: '7 — the minus is not part of it', isCorrect: false, misconceptionId: `${COEF}:MC-1` },
      { text: '−7x — the whole term', isCorrect: false, misconceptionId: `${COEF}:MC-3` },
    ],
    targetedMisconceptions: [`${COEF}:MC-1`, `${COEF}:MC-3`],
    source: eb(COEF, 'Assessment gate — the coefficient is the signed number part'),
  },
  {
    conceptId: COEF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The term x² has no number written in front of it. What is its coefficient?',
    choices: [
      { text: '1 — it is invisible, not absent, since x² means 1 × x²', isCorrect: true },
      { text: '0 — there is nothing there', isCorrect: false, misconceptionId: `${COEF}:MC-2` },
      { text: 'It has none; only some terms have coefficients', isCorrect: false, misconceptionId: `${COEF}:MC-2` },
    ],
    targetedMisconceptions: [`${COEF}:MC-2`],
    source: eb(COEF, 'Misconception register — the implied coefficient of 1'),
  },
  {
    conceptId: COEF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Simplify 5x² − x².',
    choices: [
      { text: '4x² — the coefficients are 5 and 1, and 5 − 1 = 4', isCorrect: true },
      { text: '5x² — subtracting x² with no coefficient removes nothing', isCorrect: false, misconceptionId: `${COEF}:MC-2` },
      { text: '5 — the x² parts cancel', isCorrect: false },
    ],
    targetedMisconceptions: [`${COEF}:MC-2`],
    source: eb(COEF, 'Transfer probe — the invisible 1 is needed to combine'),
  },

  // --- math.alg.degree -------------------------------------------------------
  {
    conceptId: DEG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the degree of 4x³ − x + 9?',
    choices: [
      { text: '3 — the highest power present', isCorrect: true },
      { text: '4 — the largest coefficient', isCorrect: false },
      { text: '9 — the constant', isCorrect: false },
    ],
    targetedMisconceptions: [`${DEG}:MC-1`],
    source: eb(DEG, 'Assessment gate — degree is the highest power'),
  },
  {
    conceptId: DEG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'x² + 1 has degree 2. How many real roots does it have?',
    choices: [
      { text: 'None — degree caps the number of roots at 2; it does not promise 2', isCorrect: true },
      { text: 'Exactly two — the degree gives the root count', isCorrect: false, misconceptionId: `${DEG}:MC-2` },
      { text: 'One, because the graph touches the axis once', isCorrect: false, misconceptionId: `${DEG}:MC-2` },
    ],
    targetedMisconceptions: [`${DEG}:MC-2`],
    source: eb(DEG, 'Misconception register — a ceiling, not a count'),
  },
  {
    conceptId: DEG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the degree of the term x²y³?',
    choices: [
      { text: '5 — with several variables you add the exponents', isCorrect: true },
      { text: '3 — the largest single exponent', isCorrect: false, misconceptionId: `${DEG}:MC-1` },
      { text: '6 — you multiply the exponents', isCorrect: false, misconceptionId: `${DEG}:MC-1` },
    ],
    targetedMisconceptions: [`${DEG}:MC-1`],
    source: eb(DEG, 'Transfer probe — multivariable degree is a sum'),
  },

  // --- math.alg.inequality ---------------------------------------------------
  {
    conceptId: INEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Solve x + 3 > 7.',
    choices: [
      { text: 'x > 4 — every number past 4 works', isCorrect: true },
      { text: 'x = 4', isCorrect: false, misconceptionId: `${INEQ}:MC-1` },
      { text: 'x < 4', isCorrect: false },
    ],
    targetedMisconceptions: [`${INEQ}:MC-1`],
    source: eb(INEQ, 'Assessment gate — the answer is a stretch, not a point'),
  },
  {
    conceptId: INEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'From −2x > 6, dividing both sides by −2 gives what, and why?',
    choices: [
      { text: 'x < −3 — dividing by a negative reverses the order of the number line, so the symbol must turn round', isCorrect: true },
      { text: 'x > −3 — the symbol stays as it is', isCorrect: false, misconceptionId: `${INEQ}:MC-2` },
      { text: 'x > 3 — cancel the minus on both sides', isCorrect: false, misconceptionId: `${INEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${INEQ}:MC-2`],
    source: eb(INEQ, 'Misconception register — the flip is forced, not decreed'),
  },
  {
    conceptId: INEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'On a number line, what is the difference between graphing x > 4 and x ≥ 4?',
    choices: [
      { text: 'A hollow circle at 4 versus a filled one — whether 4 itself qualifies', isCorrect: true },
      { text: 'No difference; both mean everything past 4', isCorrect: false, misconceptionId: `${INEQ}:MC-3` },
      { text: 'The arrow points the other way for ≥', isCorrect: false },
    ],
    targetedMisconceptions: [`${INEQ}:MC-3`],
    source: eb(INEQ, 'Transfer probe — strict versus non-strict at the boundary'),
  },

  // --- math.alg.solution-set -------------------------------------------------
  {
    conceptId: SOLSET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the solution set of x² = 9?',
    choices: [
      { text: '{3, −3} — both values satisfy it', isCorrect: true },
      { text: '{3} — that is the square root of 9', isCorrect: false, misconceptionId: `${SOLSET}:MC-2` },
      { text: '{9}', isCorrect: false },
    ],
    targetedMisconceptions: [`${SOLSET}:MC-2`],
    source: eb(SOLSET, 'Assessment gate — every value, not the first one found'),
  },
  {
    conceptId: SOLSET, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the solution set of x + 1 = x + 2?',
    choices: [
      { text: 'The empty set — no value of x makes it true', isCorrect: true },
      { text: 'All real numbers — x cancels, so anything works', isCorrect: false, misconceptionId: `${SOLSET}:MC-1` },
      { text: '{0} — the x terms cancel and leave nothing', isCorrect: false, misconceptionId: `${SOLSET}:MC-1` },
    ],
    targetedMisconceptions: [`${SOLSET}:MC-1`],
    source: eb(SOLSET, 'Misconception register — empty and all-reals confused'),
  },
  {
    conceptId: SOLSET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You are unsure whether an equation has solution set ∅ or ℝ. What settles it fastest?',
    choices: [
      { text: 'Substitute a couple of values — if none work it is empty, and if they all work it is all reals', isCorrect: true },
      { text: 'Check whether the variable cancelled; if it did, the set is empty', isCorrect: false, misconceptionId: `${SOLSET}:MC-1` },
      { text: 'Neither can be a solution set, so the working must be wrong', isCorrect: false, misconceptionId: `${SOLSET}:MC-1` },
    ],
    targetedMisconceptions: [`${SOLSET}:MC-1`],
    source: eb(SOLSET, 'Transfer probe — testing beats recalling for the two extremes'),
  },

  // --- math.arith.exponent-rules ---------------------------------------------
  {
    conceptId: EXPR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Simplify a³ · a².',
    choices: [
      { text: 'a⁵ — three a\'s times two a\'s is five a\'s', isCorrect: true },
      { text: 'a⁶ — multiply the exponents', isCorrect: false, misconceptionId: `${EXPR}:MC-1` },
      { text: 'a⁹ — cube then square', isCorrect: false, misconceptionId: `${EXPR}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPR}:MC-1`],
    source: eb(EXPR, 'Assessment gate — the product rule adds'),
  },
  {
    conceptId: EXPR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Simplify (a³)², and say why it differs from a³ · a².',
    choices: [
      { text: 'a⁶ — this is a³ · a³, six a\'s, so a power of a power multiplies while a product adds', isCorrect: true },
      { text: 'a⁵ — exponents always add', isCorrect: false, misconceptionId: `${EXPR}:MC-2` },
      { text: 'a⁹ — cube the whole thing again', isCorrect: false },
    ],
    targetedMisconceptions: [`${EXPR}:MC-2`],
    source: eb(EXPR, 'Misconception register — product versus power rule'),
  },
  {
    conceptId: EXPR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Simplify a⁵ / a².',
    choices: [
      { text: 'a³ — two a\'s cancel from five', isCorrect: true },
      { text: 'a⁷ — division adds the exponents', isCorrect: false, misconceptionId: `${EXPR}:MC-1` },
      { text: 'a^2.5 — divide the exponents', isCorrect: false, misconceptionId: `${EXPR}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPR}:MC-1`],
    source: eb(EXPR, 'Transfer probe — division subtracts, by cancelling'),
  },

  // --- math.alg.zero-exponent ------------------------------------------------
  {
    conceptId: ZEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 7⁰?',
    choices: [
      { text: '1', isCorrect: true },
      { text: '0 — the exponent is zero', isCorrect: false, misconceptionId: `${ZEXP}:MC-1` },
      { text: '7 — no exponent means leave it alone', isCorrect: false },
    ],
    targetedMisconceptions: [`${ZEXP}:MC-1`],
    source: eb(ZEXP, 'Assessment gate — zero exponent gives one'),
  },
  {
    conceptId: ZEXP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why must a⁰ equal 1 rather than 0?',
    choices: [
      { text: 'a⁵/a⁵ is 1 by division and a⁰ by subtracting exponents, so a⁰ has to be 1 for the rule to hold', isCorrect: true },
      { text: 'It is a convention chosen to make tables tidy', isCorrect: false, misconceptionId: `${ZEXP}:MC-1` },
      { text: 'Because zero of anything is nothing, and nothing rounds up to one', isCorrect: false, misconceptionId: `${ZEXP}:MC-1` },
    ],
    targetedMisconceptions: [`${ZEXP}:MC-1`],
    source: eb(ZEXP, 'Misconception register — forced by the quotient rule'),
  },
  {
    conceptId: ZEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the rule a⁰ = 1 cover 0⁰?',
    choices: [
      { text: 'No — 0⁰ is left undefined, because the argument needs 0⁵/0⁵ and that divides by zero', isCorrect: true },
      { text: 'Yes — 0⁰ = 1 like every other base', isCorrect: false, misconceptionId: `${ZEXP}:MC-2` },
      { text: 'Yes — 0⁰ = 0, since the base is zero', isCorrect: false, misconceptionId: `${ZEXP}:MC-2` },
    ],
    targetedMisconceptions: [`${ZEXP}:MC-2`],
    source: eb(ZEXP, 'Transfer probe — the one excluded base'),
  },

  // --- math.alg.negative-exponent --------------------------------------------
  {
    conceptId: NEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 2⁻³?',
    choices: [
      { text: '1/8 — a negative exponent means the reciprocal', isCorrect: true },
      { text: '−8 — the minus makes the answer negative', isCorrect: false, misconceptionId: `${NEXP}:MC-2` },
      { text: '−6 — multiply 2 by −3', isCorrect: false },
    ],
    targetedMisconceptions: [`${NEXP}:MC-2`],
    source: eb(NEXP, 'Assessment gate — reciprocal, not negation'),
  },
  {
    conceptId: NEXP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Simplify 1/x⁻².',
    choices: [
      { text: 'x² — the factor moves across the bar, and its exponent changes sign', isCorrect: true },
      { text: '1/x² — the minus can be dropped', isCorrect: false, misconceptionId: `${NEXP}:MC-1` },
      { text: '−x² — the minus stays with the value', isCorrect: false, misconceptionId: `${NEXP}:MC-2` },
    ],
    targetedMisconceptions: [`${NEXP}:MC-1`, `${NEXP}:MC-2`],
    source: eb(NEXP, 'Misconception register — a negative exponent already in the denominator'),
  },
  {
    conceptId: NEXP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What do negative exponents buy you, beyond a shorter way to write fractions?',
    choices: [
      { text: 'The rule aᵐ/aⁿ = aᵐ⁻ⁿ works whether m exceeds n or not, so there is no separate case', isCorrect: true },
      { text: 'They let you write negative numbers as powers', isCorrect: false, misconceptionId: `${NEXP}:MC-2` },
      { text: 'Nothing — they are only notation and can always be avoided', isCorrect: false },
    ],
    targetedMisconceptions: [`${NEXP}:MC-2`],
    source: eb(NEXP, 'Transfer probe — one rule instead of two cases'),
  },
]

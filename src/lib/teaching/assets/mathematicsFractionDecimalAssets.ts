/**
 * Fractions, decimals and percentages — the same number, three costumes.
 *
 * The single most consequential idea in school arithmetic, and the one where
 * beginners most often carry a rule with no meaning attached. Every concept
 * here is a place where "the rule" is famously remembered wrong: turn it upside
 * down and multiply; move the decimal point; percentage change measured against
 * whichever number is handy.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes.
 *
 * The explanations are written to make the rule FOLLOW from something, because
 * a remembered rule with no reason behind it is exactly what decays into the
 * misconceptions these probes catch.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RECIP = 'math.arith.fraction-reciprocal'
const MIXED = 'math.arith.mixed-numbers'
const IMPROP = 'math.arith.improper-fractions'
const DECOP = 'math.arith.decimal-operations'
const TERM = 'math.arith.terminating-decimals'
const REPEAT = 'math.arith.repeating-decimals'
const PCTCALC = 'math.arith.percentage-calculations'
const PCTCHG = 'math.arith.percentage-change'

export const MATHEMATICS_FRACTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RECIP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The reciprocal of a number is what you multiply it by to get 1. For 3/4 that is 4/3, '
      + 'because 3/4 × 4/3 = 12/12 = 1. Flipping the fraction is the shortcut; getting 1 is '
      + 'the point.\n\n'
      + 'This is why dividing by a fraction means multiplying by its reciprocal. Dividing by '
      + '3/4 asks "how many three-quarters fit in?" — and multiplying by 4/3 answers exactly '
      + 'that. The rule is not arbitrary; it is the reciprocal doing its job.\n\n'
      + 'Zero is the one number with no reciprocal. Nothing times 0 gives 1, however hard '
      + 'you try — which is the same reason you cannot divide by zero. The two facts are one '
      + 'fact wearing different clothes.',
    targetedMisconceptions: [`${RECIP}:MC-reciprocal-is-negative`],
    source: eb(RECIP, 'Identity — the reciprocal defined by its product, not by flipping'),
  },
  {
    conceptId: MIXED, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Two and a half pizzas is written 2½. That is a mixed number: a whole part and a '
      + 'fraction part, sitting side by side.\n\n'
      + 'The side-by-side writing hides an addition. 2½ means 2 + ½, not 2 × ½. That matters '
      + 'the moment you start calculating, because everywhere else in mathematics two things '
      + 'written next to each other are multiplied — 2x means two times x. Mixed numbers are '
      + 'the exception, and knowing that is knowing where a lot of errors come from.\n\n'
      + 'They are easy to read and awkward to compute with, which is why you convert them to '
      + 'improper fractions before multiplying or dividing, and convert back at the end so '
      + 'the answer is readable again.',
    targetedMisconceptions: [`${MIXED}:MC-juxtaposition-is-multiplication`],
    source: eb(MIXED, 'Identity + Misconception register — the hidden plus sign'),
  },
  {
    conceptId: IMPROP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'An improper fraction has a top at least as big as its bottom — 7/4, 9/9, 11/2. '
      + 'Nothing is wrong with it. The name is unfortunate: these are the most useful form '
      + 'of a fraction to calculate with.\n\n'
      + 'To see 7/4, cut pizzas into quarters and take seven of them. That is one whole pizza '
      + 'and three quarters left, so 7/4 = 1¾. To go the other way, ask how many quarters are '
      + 'in 1¾: four in the whole, plus the three, giving 7/4.\n\n'
      + 'The conversion is not two rules to memorise, because both directions ask the same '
      + 'question: how many pieces of this size do I have altogether? Counting them as '
      + 'quarters gives 7/4; grouping them into whole pizzas gives 1¾. Same seven pieces, '
      + 'two ways of reporting them.',
    targetedMisconceptions: [`${IMPROP}:MC-improper-is-wrong`],
    source: eb(IMPROP, 'Identity + Misconception register — "improper" is a name, not a fault'),
  },
  {
    conceptId: DECOP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Adding decimals means lining up the decimal points, for exactly the reason column '
      + 'addition lines up the ones: tenths may only be added to tenths. 3.4 + 0.25 lines up '
      + 'as 3.40 + 0.25, giving 3.65. Right-aligning the digits instead would add the 4 '
      + 'tenths to the 5 hundredths, which is nonsense.\n\n'
      + 'Multiplying works differently, and this is where the rules get tangled. Ignore the '
      + 'points, multiply as whole numbers, then count how many decimal places went IN and '
      + 'give the answer that many. 0.3 × 0.2 is 3 × 2 = 6 with two places, so 0.06.\n\n'
      + 'Check it against sense: a third of a fifth of something is small. That is why '
      + 'multiplying two numbers below 1 gives something smaller than both — the one result '
      + 'that most contradicts what multiplication felt like with whole numbers.',
    targetedMisconceptions: [`${DECOP}:MC-align-right`],
    source: eb(DECOP, 'Identity + Misconception register — alignment for addition, place-counting for multiplication'),
  },
  {
    conceptId: TERM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Some fractions stop when written as decimals: 1/4 = 0.25, 3/8 = 0.375. Those are '
      + 'terminating decimals, and which fractions do it is not luck.\n\n'
      + 'Our decimal places are tenths, hundredths, thousandths — all powers of 10, and 10 is '
      + '2 × 5. So a fraction terminates exactly when its denominator, once fully simplified, '
      + 'is built only from 2s and 5s. 1/8 terminates because 8 = 2×2×2. 1/20 terminates '
      + 'because 20 = 2×2×5.\n\n'
      + 'The word "simplified" is doing real work there. 6/12 looks like it has a 3 in the '
      + 'bottom, but it is 1/2, so it terminates at 0.5. Always reduce before you judge.',
    targetedMisconceptions: [`${TERM}:MC-judge-before-simplifying`],
    source: eb(TERM, 'Identity — the 2s-and-5s criterion, and why simplifying comes first'),
  },
  {
    conceptId: REPEAT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      '1/3 = 0.333… and the 3s never stop. That is a repeating decimal, and the dots are not '
      + 'an approximation — they mean the pattern continues forever, exactly.\n\n'
      + 'It happens whenever the simplified denominator has a factor other than 2 or 5, '
      + 'because then no power of 10 is ever divisible by it and the long division can never '
      + 'come out even. 1/7 = 0.142857142857… repeats a block of six.\n\n'
      + 'It must repeat rather than wander, and the reason is neat: dividing by 7 leaves only '
      + 'six possible remainders, so within seven steps one has to come round again — and '
      + 'once a remainder repeats, everything after it repeats too. These are still '
      + 'perfectly ordinary fractions; only their decimal costume is untidy.',
    targetedMisconceptions: [`${REPEAT}:MC-repeating-is-approximate`],
    source: eb(REPEAT, 'Identity + Misconception register — repetition is exact, and forced by the remainders'),
  },
  {
    conceptId: PCTCALC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Per cent means "per hundred". 30% is 30 out of every 100, which is 30/100, which is '
      + '0.3. Same number, three costumes — and swapping between them is most of the skill.\n\n'
      + 'To find 30% of 60, use the decimal: 0.3 × 60 = 18. That single move replaces every '
      + 'rule you may have been given about moving points around, and it keeps working when '
      + 'the numbers are awkward.\n\n'
      + 'The word "of" is the one to watch. 30% of 60 is not the same as 60% of 30 — except '
      + 'that it is, both being 18, because multiplication does not care about order. That '
      + 'coincidence is genuinely useful: 4% of 25 is hard, 25% of 4 is a quarter of four, '
      + 'which is 1.',
    targetedMisconceptions: [`${PCTCALC}:MC-percent-is-not-fraction`],
    source: eb(PCTCALC, 'Identity — per-hundred, and the decimal as the working form'),
  },
  {
    conceptId: PCTCHG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Percentage change compares the change to what you STARTED with. A price goes from '
      + '£40 to £50: the change is £10, and 10 out of the original 40 is 25%. Dividing by 50 '
      + 'instead would answer a different question.\n\n'
      + 'Which number is the starting one is the whole difficulty, and it is why increases '
      + 'and decreases are not mirror images. Going 40 → 50 is a 25% rise; coming back '
      + '50 → 40 is a £10 fall measured against 50, which is 20%. Same money, different '
      + 'percentages, because the base changed.\n\n'
      + 'That asymmetry has a consequence worth carrying: a 20% rise followed by a 20% fall '
      + 'does not return you to where you began. 100 becomes 120, and 20% off 120 is 96. The '
      + 'second percentage was taken from a bigger number.',
    targetedMisconceptions: [`${PCTCHG}:MC-wrong-base`],
    source: eb(PCTCHG, 'Identity + Misconception register — the base is the original, and rises/falls are asymmetric'),
  },
]

export const MATHEMATICS_FRACTION_PROBES: SeedProbe[] = [
  {
    conceptId: RECIP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the reciprocal of 3/4?',
    choices: [
      { text: '4/3 — because 3/4 × 4/3 = 1', isCorrect: true },
      { text: '−3/4', isCorrect: false, misconceptionId: `${RECIP}:MC-reciprocal-is-negative` },
      { text: '3/4', isCorrect: false, misconceptionId: `${RECIP}:MC-reciprocal-is-self` },
    ],
    targetedMisconceptions: [`${RECIP}:MC-reciprocal-is-negative`],
    source: eb(RECIP, 'Assessment gate — reciprocal, not negation'),
  },
  {
    conceptId: RECIP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which number has no reciprocal?',
    choices: [
      { text: '0 — nothing multiplied by 0 gives 1', isCorrect: true },
      { text: '1', isCorrect: false, misconceptionId: `${RECIP}:MC-one-has-none` },
    ],
    targetedMisconceptions: [`${RECIP}:MC-one-has-none`],
    source: eb(RECIP, 'Assessment gate — why zero is the exception'),
  },
  {
    conceptId: RECIP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does dividing by 3/4 mean multiplying by 4/3?',
    choices: [
      { text: 'Because multiplying by the reciprocal answers "how many three-quarters fit in?"', isCorrect: true },
      { text: 'It is just a rule with no reason behind it', isCorrect: false, misconceptionId: `${RECIP}:MC-rule-without-reason` },
    ],
    targetedMisconceptions: [`${RECIP}:MC-rule-without-reason`],
    source: eb(RECIP, 'Assessment gate — the reciprocal explains the division rule'),
  },

  {
    conceptId: MIXED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does 2½ mean?',
    choices: [
      { text: '2 + ½', isCorrect: true },
      { text: '2 × ½', isCorrect: false, misconceptionId: `${MIXED}:MC-juxtaposition-is-multiplication` },
    ],
    targetedMisconceptions: [`${MIXED}:MC-juxtaposition-is-multiplication`],
    source: eb(MIXED, 'Assessment gate — the hidden plus sign'),
  },
  {
    conceptId: MIXED, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In algebra 2x means two times x. Why does 2½ not mean two times a half?',
    choices: [
      { text: 'Mixed numbers are the exception — the two parts are added, not multiplied', isCorrect: true },
      { text: 'It does mean two times a half; 2½ is 1', isCorrect: false, misconceptionId: `${MIXED}:MC-juxtaposition-is-multiplication` },
    ],
    targetedMisconceptions: [`${MIXED}:MC-juxtaposition-is-multiplication`],
    source: eb(MIXED, 'Assessment gate — naming the notational exception explicitly'),
  },
  {
    conceptId: MIXED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Before multiplying 2½ by 3, what is the sensible first step?',
    choices: [
      { text: 'Convert 2½ to 5/2, because mixed numbers are awkward to multiply', isCorrect: true },
      { text: 'Multiply the 2 by 3 and leave the half alone', isCorrect: false, misconceptionId: `${MIXED}:MC-parts-separately` },
    ],
    targetedMisconceptions: [`${MIXED}:MC-parts-separately`],
    source: eb(MIXED, 'Assessment gate — convert before computing'),
  },

  {
    conceptId: IMPROP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Write 7/4 as a mixed number.',
    choices: [
      { text: '1¾', isCorrect: true },
      { text: '3¼', isCorrect: false, misconceptionId: `${IMPROP}:MC-parts-swapped` },
    ],
    targetedMisconceptions: [`${IMPROP}:MC-parts-swapped`],
    source: eb(IMPROP, 'Assessment gate — converting improper to mixed'),
  },
  {
    conceptId: IMPROP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is there anything wrong with leaving an answer as 9/4?',
    choices: [
      { text: 'No — "improper" is just a name; this form is often the easiest to calculate with', isCorrect: true },
      { text: 'Yes — an answer must always be a mixed number', isCorrect: false, misconceptionId: `${IMPROP}:MC-improper-is-wrong` },
    ],
    targetedMisconceptions: [`${IMPROP}:MC-improper-is-wrong`],
    source: eb(IMPROP, 'Assessment gate — the name is not a fault'),
  },
  {
    conceptId: IMPROP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many quarters are there in 1¾?',
    choices: [
      { text: 'Seven — four in the whole, plus three more', isCorrect: true },
      { text: 'Three', isCorrect: false, misconceptionId: `${IMPROP}:MC-whole-ignored` },
    ],
    targetedMisconceptions: [`${IMPROP}:MC-whole-ignored`],
    source: eb(IMPROP, 'Assessment gate — mixed to improper as a counting question'),
  },

  {
    conceptId: DECOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Adding 3.4 and 0.25, how should the numbers line up?',
    choices: [
      { text: 'By the decimal point, so tenths sit under tenths', isCorrect: true },
      { text: 'By the right-hand edge, like whole numbers', isCorrect: false, misconceptionId: `${DECOP}:MC-align-right` },
    ],
    targetedMisconceptions: [`${DECOP}:MC-align-right`],
    source: eb(DECOP, 'Assessment gate — alignment is by place value'),
  },
  {
    conceptId: DECOP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 0.3 × 0.2?',
    choices: [
      { text: '0.06 — 3 × 2 = 6, and two decimal places went in', isCorrect: true },
      { text: '0.6', isCorrect: false, misconceptionId: `${DECOP}:MC-place-count` },
      { text: '0.5', isCorrect: false, misconceptionId: `${DECOP}:MC-added-instead` },
    ],
    targetedMisconceptions: [`${DECOP}:MC-place-count`],
    source: eb(DECOP, 'Assessment gate — counting decimal places in a product'),
  },
  {
    conceptId: DECOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Multiplying 0.4 by 0.5 gives 0.2, which is smaller than both. Is that right?',
    choices: [
      { text: 'Yes — taking a fraction of a fraction gives less than either', isCorrect: true },
      { text: 'No — multiplying always makes numbers bigger', isCorrect: false, misconceptionId: `${DECOP}:MC-multiplication-makes-bigger` },
    ],
    targetedMisconceptions: [`${DECOP}:MC-multiplication-makes-bigger`],
    source: eb(DECOP, 'Assessment gate — where multiplication-makes-bigger breaks'),
  },

  {
    conceptId: TERM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these terminates as a decimal?',
    choices: [
      { text: '1/8 — its denominator is only 2s', isCorrect: true },
      { text: '1/3', isCorrect: false, misconceptionId: `${TERM}:MC-all-fractions-terminate` },
    ],
    targetedMisconceptions: [`${TERM}:MC-all-fractions-terminate`],
    source: eb(TERM, 'Assessment gate — the 2s-and-5s criterion'),
  },
  {
    conceptId: TERM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does 6/12 terminate as a decimal?',
    choices: [
      { text: 'Yes — simplify first: it is 1/2, which is 0.5', isCorrect: true },
      { text: 'No — 12 has a factor of 3', isCorrect: false, misconceptionId: `${TERM}:MC-judge-before-simplifying` },
    ],
    targetedMisconceptions: [`${TERM}:MC-judge-before-simplifying`],
    source: eb(TERM, 'Assessment gate — simplify before applying the criterion'),
  },
  {
    conceptId: TERM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why do only 2s and 5s in the denominator allow a decimal to stop?',
    choices: [
      { text: 'Because decimal places are powers of 10, and 10 = 2 × 5', isCorrect: true },
      { text: 'Because 2 and 5 are small numbers', isCorrect: false, misconceptionId: `${TERM}:MC-size-not-factors` },
    ],
    targetedMisconceptions: [`${TERM}:MC-size-not-factors`],
    source: eb(TERM, 'Assessment gate — the reason behind the criterion'),
  },

  {
    conceptId: REPEAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does 1/3 = 0.333… mean?',
    choices: [
      { text: 'The 3s go on forever, and the two sides are exactly equal', isCorrect: true },
      { text: 'It is close to 1/3 but slightly less', isCorrect: false, misconceptionId: `${REPEAT}:MC-repeating-is-approximate` },
    ],
    targetedMisconceptions: [`${REPEAT}:MC-repeating-is-approximate`],
    source: eb(REPEAT, 'Assessment gate — the repetition is exact'),
  },
  {
    conceptId: REPEAT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 0.333… a rational number?',
    choices: [
      { text: 'Yes — it is exactly 1/3, a ratio of two whole numbers', isCorrect: true },
      { text: 'No — it never ends, so it cannot be a fraction', isCorrect: false, misconceptionId: `${REPEAT}:MC-endless-means-irrational` },
    ],
    targetedMisconceptions: [`${REPEAT}:MC-endless-means-irrational`],
    source: eb(REPEAT, 'Assessment gate — an endless decimal can still be rational'),
  },
  {
    conceptId: REPEAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why must a decimal that does not terminate eventually repeat rather than wander forever?',
    choices: [
      { text: 'Only finitely many remainders are possible, so one must come round again — and then the pattern does too', isCorrect: true },
      { text: 'It does not have to; some just never settle', isCorrect: false, misconceptionId: `${REPEAT}:MC-may-not-repeat` },
    ],
    targetedMisconceptions: [`${REPEAT}:MC-may-not-repeat`],
    source: eb(REPEAT, 'Assessment gate — the pigeonhole argument on remainders'),
  },

  {
    conceptId: PCTCALC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 30% written as a decimal?',
    choices: [
      { text: '0.3', isCorrect: true },
      { text: '0.03', isCorrect: false, misconceptionId: `${PCTCALC}:MC-place-shift` },
      { text: '30', isCorrect: false, misconceptionId: `${PCTCALC}:MC-percent-is-not-fraction` },
    ],
    targetedMisconceptions: [`${PCTCALC}:MC-place-shift`],
    source: eb(PCTCALC, 'Assessment gate — per-hundred as a decimal'),
  },
  {
    conceptId: PCTCALC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is 30% of 60?',
    choices: [
      { text: '18 — that is 0.3 × 60', isCorrect: true },
      { text: '2 — divide 60 by 30', isCorrect: false, misconceptionId: `${PCTCALC}:MC-divide-by-percent` },
      { text: '1800', isCorrect: false, misconceptionId: `${PCTCALC}:MC-percent-is-not-fraction` },
    ],
    targetedMisconceptions: [`${PCTCALC}:MC-divide-by-percent`],
    source: eb(PCTCALC, 'Assessment gate — "of" means multiply, using the decimal'),
  },
  {
    conceptId: PCTCALC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '4% of 25 is awkward. What easier calculation gives the same answer?',
    choices: [
      { text: '25% of 4 — a quarter of four, which is 1', isCorrect: true },
      { text: 'There is no easier way; you must compute 0.04 × 25', isCorrect: false, misconceptionId: `${PCTCALC}:MC-no-commuting` },
    ],
    targetedMisconceptions: [`${PCTCALC}:MC-no-commuting`],
    source: eb(PCTCALC, 'Assessment gate — swapping the percentage and the amount'),
  },

  {
    conceptId: PCTCHG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A price rises from £40 to £50. What is the percentage increase?',
    choices: [
      { text: '25% — the £10 change measured against the original £40', isCorrect: true },
      { text: '20% — the £10 measured against £50', isCorrect: false, misconceptionId: `${PCTCHG}:MC-wrong-base` },
      { text: '10%', isCorrect: false, misconceptionId: `${PCTCHG}:MC-change-is-percentage` },
    ],
    targetedMisconceptions: [`${PCTCHG}:MC-wrong-base`],
    source: eb(PCTCHG, 'Assessment gate — the base is what you started with'),
  },
  {
    conceptId: PCTCHG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Going 40 → 50 is a 25% rise. Is going 50 → 40 a 25% fall?',
    choices: [
      { text: 'No — it is 20%, because the £10 is now measured against 50', isCorrect: true },
      { text: 'Yes — the same change gives the same percentage', isCorrect: false, misconceptionId: `${PCTCHG}:MC-symmetric-change` },
    ],
    targetedMisconceptions: [`${PCTCHG}:MC-symmetric-change`],
    source: eb(PCTCHG, 'Assessment gate — rises and falls are not mirror images'),
  },
  {
    conceptId: PCTCHG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '100 rises by 20%, then falls by 20%. Where does it end up?',
    choices: [
      { text: '96 — the fall was taken from 120, not from 100', isCorrect: true },
      { text: '100 — the two changes cancel', isCorrect: false, misconceptionId: `${PCTCHG}:MC-changes-cancel` },
    ],
    targetedMisconceptions: [`${PCTCHG}:MC-changes-cancel`],
    source: eb(PCTCHG, 'Assessment gate — successive percentages do not cancel'),
  },
]

/**
 * Fourth math.alg asset batch — completing-the-square and
 * polynomial-division.
 *
 * Continues serving-asset coverage for math.alg (20/59 -> 22/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.completing-the-square.md
 * and math.alg.polynomial-division.md.
 *
 *   COMPLETESQ  completing-the-square — the non-monic case needs only one
 *               extra step (factor a out first), never a different
 *               technique; positive a means a minimum (cup), negative a
 *               means a maximum (cap), never reversed; the square-
 *               completion term is (b/2a)^2, never (b/2)^2.
 *   POLYDIV     polynomial-division — a nonzero remainder is a normal,
 *               expected outcome, never a sign of error; each step
 *               divides the LEADING term of the current remainder, never
 *               the trailing term; synthetic division applies only to
 *               monic linear divisors, never any divisor.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLETESQ = 'math.alg.completing-the-square'
const POLYDIV = 'math.alg.polynomial-division'

export const MATHEMATICS_ALGEBRA_COMPLETE_SQUARE_POLY_DIV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLETESQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Completing the square works for ANY quadratic ax²+bx+c, not just the monic case (a=1): '
      + 'for a non-monic quadratic, factor a out of the first two terms FIRST, and every step '
      + 'after that is identical to the monic case — this ONE extra step is the entire '
      + 'generalization, never a different technique to relearn. For 2x²+12x+7: factor out 2, '
      + 'giving 2(x²+6x)+7, then proceed exactly as in the monic case.\n\n'
      + 'Once in vertex form a(x-h)²+k, the sign of a determines max vs. min, and this mapping is '
      + 'NEVER reversed: positive a means the parabola opens upward like a cup, so (h,k) is a '
      + 'MINIMUM; negative a means it opens downward like a cap, so (h,k) is a MAXIMUM.\n\n'
      + 'The square-completion term is (b/2a)², NEVER (b/2)²: the division by a is a required '
      + 'part of the term, easy to omit since it wasn\'t present in the simpler monic case where '
      + 'a=1 made the distinction invisible.',
    targetedMisconceptions: [`${COMPLETESQ}:MC-1`, `${COMPLETESQ}:MC-2`, `${COMPLETESQ}:MC-3`],
    source: eb(COMPLETESQ, 'Core Understanding — the non-monic case needs only one extra step, the sign of a determines max/min without reversal, the completion term is (b/2a)² never (b/2)²'),
  },
  {
    conceptId: POLYDIV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The polynomial Division Algorithm p(x)=d(x)q(x)+r(x) with deg r < deg d ALWAYS holds, '
      + 'with or without r=0 — a NONZERO remainder is a normal, expected outcome, never a sign of '
      + 'error. Since factoring exercises are deliberately constructed to divide evenly, this can '
      + 'create a false impression that division must come out even; it does not, exactly as '
      + '29÷7=4 remainder 1 is a perfectly valid integer division.\n\n'
      + 'At every step of long division, the quotient term cancels the LEADING term of the CURRENT '
      + 'remainder, NEVER any other term — the procedure never looks at the trailing or constant '
      + 'term of the remainder to decide what to divide next.\n\n'
      + 'Synthetic division applies ONLY when the divisor is monic and linear (x-c) — it is NOT a '
      + 'general shortcut usable for any divisor. Attempting it on a non-monic divisor like 2x+3 '
      + 'or a higher-degree divisor like x²+1 is invalid; long division must be used instead.',
    targetedMisconceptions: [`${POLYDIV}:MC-1`, `${POLYDIV}:MC-2`, `${POLYDIV}:MC-3`],
    source: eb(POLYDIV, 'Core Understanding — a nonzero remainder is normal, each step divides the leading term of the current remainder, synthetic division applies only to monic linear divisors'),
  },
]

export const MATHEMATICS_ALGEBRA_COMPLETE_SQUARE_POLY_DIV_PROBES: SeedProbe[] = [
  // --- math.alg.completing-the-square -------------------------------------------
  {
    conceptId: COMPLETESQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does completing the square only work cleanly when the leading coefficient a equals 1?',
    choices: [
      { text: 'No — for a non-monic quadratic (a≠1), factor a out of the first two terms first; every step after that is identical to the monic case, the only generalization needed', isCorrect: true },
      { text: 'Yes — the technique only applies to quadratics already in monic form', isCorrect: false, misconceptionId: `${COMPLETESQ}:MC-1` },
      { text: 'Yes, since a non-monic quadratic requires an entirely different method', isCorrect: false, misconceptionId: `${COMPLETESQ}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLETESQ}:MC-1`],
    source: eb(COMPLETESQ, 'Assessment gate (Blueprint) — the non-monic case needs only the one extra step of factoring a out first'),
  },
  {
    conceptId: COMPLETESQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You have 2(x+3)² - 11 in vertex form. Is the vertex (-3,-11) the highest point the graph reaches, or the lowest?',
    choices: [
      { text: 'The lowest (a minimum) — a=2 is positive, so the parabola opens upward like a cup, and a cup\'s lowest point is a minimum', isCorrect: true },
      { text: 'The highest (a maximum), since a positive leading coefficient indicates a maximum', isCorrect: false, misconceptionId: `${COMPLETESQ}:MC-2` },
      { text: 'It cannot be determined from the sign of a alone', isCorrect: false, misconceptionId: `${COMPLETESQ}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLETESQ}:MC-2`],
    source: eb(COMPLETESQ, 'Misconception register (Blueprint) — positive a means minimum (cup), negative a means maximum (cap), never reversed'),
  },
  {
    conceptId: COMPLETESQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Completing the square on 3x² - 5x + 1, what exactly do you divide 5 by before squaring?',
    choices: [
      { text: '2a = 6 (dividing by 2 AND by a=3), giving (5/6)²=25/36 — never just dividing by 2 alone', isCorrect: true },
      { text: 'Just 2, giving (5/2)², since a\'s role only appears in the initial factoring step', isCorrect: false, misconceptionId: `${COMPLETESQ}:MC-3` },
      { text: 'Just a, giving (5/3)², skipping the division by 2 entirely', isCorrect: false, misconceptionId: `${COMPLETESQ}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLETESQ}:MC-3`],
    source: eb(COMPLETESQ, 'Transfer probe (Blueprint) — the square-completion term is (b/2a)², requiring division by both 2 and a'),
  },

  // --- math.alg.polynomial-division ----------------------------------------------
  {
    conceptId: POLYDIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Dividing (x+3) by (x+1), you get a nonzero constant remainder. Does this mean you made a mistake?',
    choices: [
      { text: 'No — the Division Algorithm p(x)=d(x)q(x)+r(x) with deg r < deg d ALWAYS holds, with or without r=0; a nonzero remainder is a normal, expected outcome, not an error', isCorrect: true },
      { text: 'Yes — a correct polynomial division must always produce a remainder of exactly 0', isCorrect: false, misconceptionId: `${POLYDIV}:MC-1` },
      { text: 'Yes, since only integer division can have a nonzero remainder, never polynomial division', isCorrect: false, misconceptionId: `${POLYDIV}:MC-1` },
    ],
    targetedMisconceptions: [`${POLYDIV}:MC-1`],
    source: eb(POLYDIV, 'Assessment gate (Blueprint P41) — a nonzero remainder is a normal, expected outcome of polynomial division'),
  },
  {
    conceptId: POLYDIV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Mid-computation, your current remainder is 4x² - 5x and the divisor is x - 2. Which term do you divide by the divisor\'s leading term x?',
    choices: [
      { text: '4x², the LEADING term of the current remainder — every step always cancels the leading term, never any other term', isCorrect: true },
      { text: '-5x, the trailing term of the current remainder', isCorrect: false, misconceptionId: `${POLYDIV}:MC-2` },
      { text: 'Either term works equally well', isCorrect: false, misconceptionId: `${POLYDIV}:MC-2` },
    ],
    targetedMisconceptions: [`${POLYDIV}:MC-2`],
    source: eb(POLYDIV, 'Misconception register (Blueprint P41) — each step divides the leading term of the current remainder, never the trailing term'),
  },
  {
    conceptId: POLYDIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you use synthetic division for the divisor 2x + 1?',
    choices: [
      { text: 'No — synthetic division applies only to monic linear divisors of the exact form (x-c); 2x+1 is linear but not monic (leading coefficient 2, not 1), so long division must be used instead', isCorrect: true },
      { text: 'Yes — synthetic division works for any linear divisor, monic or not', isCorrect: false, misconceptionId: `${POLYDIV}:MC-3` },
      { text: 'Yes, since synthetic division is simply a faster version of long division usable for any divisor at all', isCorrect: false, misconceptionId: `${POLYDIV}:MC-3` },
    ],
    targetedMisconceptions: [`${POLYDIV}:MC-3`],
    source: eb(POLYDIV, 'Transfer probe (Blueprint P41) — synthetic division applies only to monic linear divisors, never any divisor'),
  },
]

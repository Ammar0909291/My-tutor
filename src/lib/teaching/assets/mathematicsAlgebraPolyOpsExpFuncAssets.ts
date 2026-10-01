/**
 * Third math.alg asset batch — polynomial-operations and
 * exponential-function.
 *
 * Continues serving-asset coverage for math.alg (4/45 -> 6/45).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.polynomial-operations.md
 * and math.alg.exponential-function.md.
 *
 *   POLYOPS  polynomial-operations — combining terms still needs matching
 *            variable AND exponent, never just a shared variable letter;
 *            polynomial subtraction negates EVERY term of the second
 *            polynomial, never just the first; FOIL is only the 2x2
 *            special case, never a complete method.
 *   EXPFUNC  exponential-function — a^x and x^a are structurally different
 *            functions despite similar "power" notation; the base
 *            restrictions a>0, a≠1 each have a specific concrete reason,
 *            never arbitrary rules; the y-intercept (0,1) never varies by
 *            base.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POLYOPS = 'math.alg.polynomial-operations'
const EXPFUNC = 'math.alg.exponential-function'

export const MATHEMATICS_ALGEBRA_POLY_OPS_EXP_FUNC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POLYOPS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Polynomial addition, subtraction, and multiplication are like-terms collection and the '
      + 'distributive law, applied at polynomial scale. Combining terms still needs the variable '
      + 'AND exponent to match — 3x²+2x cannot be simplified to 5x² or 5x, since x² and x are '
      + 'different quantities, the way area differs from length.\n\n'
      + 'Subtraction of an entire polynomial means negating EVERY term of the polynomial being '
      + 'subtracted, never just the first: p(x)-q(x) is p(x)+(-1)·q(x), and -1 distributes across '
      + 'ALL of q(x)\'s terms. (x²+3x+1)-(x²-2x+4) is x²+3x+1-x²+2x-4, never '
      + 'x²+3x+1-x²-2x+4.\n\n'
      + 'Multiplication is the distributive law run twice: every term of the first factor '
      + 'multiplies every term of the second. FOIL is a mnemonic for exactly the 2-term-by-2-term '
      + 'case (4 products), NEVER a complete method — the moment either factor has three or more '
      + 'terms, FOIL has no natural extension, and the general rule (terms of p) × (terms of q) '
      + 'partial products must be used instead.',
    targetedMisconceptions: [`${POLYOPS}:MC-1`, `${POLYOPS}:MC-2`, `${POLYOPS}:MC-3`],
    source: eb(POLYOPS, 'Core Understanding — matching variable and exponent are both required, subtraction negates every term of the second polynomial, FOIL is only the 2x2 special case'),
  },
  {
    conceptId: EXPFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The exponential function f(x)=a^x (variable in the EXPONENT) is structurally different '
      + 'from a power function x^a (variable in the BASE), despite both looking like "a number to '
      + 'a power." f(3)=8 vs g(3)=9 for f(x)=2^x, g(x)=x²: close at first, but f(10)=1024 vs '
      + 'g(10)=100 diverge dramatically, and f(0)=1 while g(0)=0.\n\n'
      + 'The base restrictions a>0 and a≠1 each have a SPECIFIC concrete reason, never an '
      + 'arbitrary rule: a>0 is required because a^(1/2)=√a needs a nonnegative base to stay '
      + 'real-valued (e.g. (-4)^(1/2)=√-4 is not real); a≠1 is required because 1^x=1 for every '
      + 'x, a constant function with no growth or decay to study.\n\n'
      + 'The y-intercept is ALWAYS (0,1), NEVER varying by base: f(0)=a^0=1 for ANY valid base a, '
      + 'by the zero-exponent rule — even though other values like f(1)=a genuinely do depend on '
      + 'the base, x=0 is a special input where the base\'s influence structurally vanishes.',
    targetedMisconceptions: [`${EXPFUNC}:MC-1`, `${EXPFUNC}:MC-2`, `${EXPFUNC}:MC-3`],
    source: eb(EXPFUNC, 'Core Understanding — exponential and power functions are structurally different, the base restrictions each have a specific reason, the y-intercept never varies by base'),
  },
]

export const MATHEMATICS_ALGEBRA_POLY_OPS_EXP_FUNC_PROBES: SeedProbe[] = [
  // --- math.alg.polynomial-operations -----------------------------------------
  {
    conceptId: POLYOPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does 3x² + 2x equal 5x², 5x, or cannot be simplified?',
    choices: [
      { text: 'Cannot be simplified — x² and x are different quantities (like area vs. length), so only terms matching BOTH variable and exponent can combine', isCorrect: true },
      { text: '5x² — combining the coefficients regardless of exponent', isCorrect: false, misconceptionId: `${POLYOPS}:MC-1` },
      { text: '5x — combining the coefficients and keeping the lower exponent', isCorrect: false, misconceptionId: `${POLYOPS}:MC-1` },
    ],
    targetedMisconceptions: [`${POLYOPS}:MC-1`],
    source: eb(POLYOPS, 'Assessment gate (Blueprint P41) — combining terms requires matching both variable and exponent, never just a shared letter'),
  },
  {
    conceptId: POLYOPS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Compute (5x² + 3x + 1) - (2x² - x + 4). Which is correct after removing the parentheses?',
    choices: [
      { text: '5x²+3x+1-2x²+x-4 — every term of the second polynomial is negated, not just the first', isCorrect: true },
      { text: '5x²+3x+1-2x²-x+4 — only the leading term of the second polynomial changes sign', isCorrect: false, misconceptionId: `${POLYOPS}:MC-2` },
      { text: '5x²+3x+1+2x²-x+4 — none of the second polynomial\'s terms change sign', isCorrect: false, misconceptionId: `${POLYOPS}:MC-2` },
    ],
    targetedMisconceptions: [`${POLYOPS}:MC-2`],
    source: eb(POLYOPS, 'Misconception register (Blueprint P41) — subtraction negates every term of the subtracted polynomial, never just the first'),
  },
  {
    conceptId: POLYOPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing (x+1)(x²+2x+3) using FOIL, how many partial products should result?',
    choices: [
      { text: '6 — FOIL is only the 2-term-by-2-term special case (4 products); here it is 2 terms by 3 terms, requiring every term times every term, giving 6 products', isCorrect: true },
      { text: '4 — FOIL always produces exactly four partial products regardless of the factors', isCorrect: false, misconceptionId: `${POLYOPS}:MC-3` },
      { text: 'FOIL cannot be applied at all once a factor has more than two terms, so no products can be computed', isCorrect: false, misconceptionId: `${POLYOPS}:MC-3` },
    ],
    targetedMisconceptions: [`${POLYOPS}:MC-3`],
    source: eb(POLYOPS, 'Transfer probe (Blueprint P41) — FOIL is only the 2x2 special case of every-term-times-every-term, never a complete general method'),
  },

  // --- math.alg.exponential-function --------------------------------------------
  {
    conceptId: EXPFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is 2^x the same TYPE of function as x^2, since both involve "2" and a power?',
    choices: [
      { text: 'No — 2^x has the variable in the exponent (exponential), while x^2 has the variable in the base (power function); their values diverge dramatically (2^10=1024 vs 10^2=100)', isCorrect: true },
      { text: 'Yes — both are "a number to a power," so they behave the same way', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-1` },
      { text: 'Yes, since they produce identical values for every input', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPFUNC}:MC-1`],
    source: eb(EXPFUNC, 'Assessment gate (Blueprint) — exponential functions (variable in exponent) and power functions (variable in base) are structurally different'),
  },
  {
    conceptId: EXPFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=a^x, why must a be positive and not equal to 1?',
    choices: [
      { text: 'a>0 is needed so fractional exponents stay real-valued (e.g. (-4)^(1/2)=√-4 is not real); a≠1 is excluded because 1^x=1 always, a constant function with no growth or decay to study', isCorrect: true },
      { text: 'These are arbitrary conventions with no deeper mathematical reason', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-2` },
      { text: 'The restrictions exist purely to match textbook notation, not for any structural reason', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${EXPFUNC}:MC-2`],
    source: eb(EXPFUNC, 'Misconception register (Blueprint) — each base restriction has a specific, concrete mathematical reason, never an arbitrary rule'),
  },
  {
    conceptId: EXPFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the y-intercept of f(x)=7^x, without computing anything?',
    choices: [
      { text: '(0,1) — a^0=1 for ANY valid base a by the zero-exponent rule, so every exponential function shares this identical y-intercept regardless of its specific base', isCorrect: true },
      { text: 'It depends on the base 7, so it must be computed separately for each function', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-3` },
      { text: '(0,7), matching the base value directly', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${EXPFUNC}:MC-3`],
    source: eb(EXPFUNC, 'Transfer probe (Blueprint) — the y-intercept (0,1) is a universal feature, never varying by base'),
  },
]

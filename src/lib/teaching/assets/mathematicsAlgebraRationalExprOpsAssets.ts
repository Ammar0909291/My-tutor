/**
 * Eighteenth math.alg asset batch — rational-expressions-addition and
 * rational-expressions-multiplication.
 *
 * Continues serving-asset coverage for math.alg (48/59 -> 50/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.rational-expressions-addition.md
 * and math.alg.rational-expressions-multiplication.md.
 *
 *   RATADD       rational-expressions-addition — the genuine LCD comes
 *                from FACTORING each denominator first, never from
 *                multiplying unfactored denominators together; a value
 *                excluded by an ORIGINAL denominator remains excluded
 *                forever, never dropped once a cancelling factor
 *                removes it from view; converting to the LCD requires
 *                rescaling BOTH numerator and denominator by the same
 *                factor, never the denominator alone.
 *   RATMULT      rational-expressions-multiplication — factoring
 *                BEFORE multiplying reveals cancellations that
 *                expanding first buries; only the DIVISOR (the fraction
 *                after ÷) gets flipped, never the dividend or both;
 *                a factor in one fraction's numerator can cancel
 *                DIAGONALLY against the same factor in the other
 *                fraction's denominator, never limited to
 *                within-fraction cancellation alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RATADD = 'math.alg.rational-expressions-addition'
const RATMULT = 'math.alg.rational-expressions-multiplication'

export const MATHEMATICS_ALGEBRA_RATIONAL_EXPR_OPS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RATADD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Adding or subtracting rational expressions extends the fluent numeric-fraction rule: with '
      + 'the SAME denominator, combine numerators directly. With DIFFERENT denominators, the '
      + 'genuine Least Common Denominator (LCD) comes from FACTORING each denominator FIRST, never '
      + 'from simply multiplying the unfactored denominators together — for 1/(x²−1)+2/(x+1), x+1 '
      + 'is already a factor of x²−1, so the genuine LCD is (x+1)(x−1), NEVER the unnecessarily '
      + 'large (x²−1)(x+1) that direct multiplication would produce.\n\n'
      + 'Converting each fraction to the LCD requires multiplying BOTH its numerator and '
      + 'denominator by the missing factor — NEVER the denominator alone, since that changes the '
      + 'fraction\'s value.\n\n'
      + 'The domain restriction from the ORIGINAL denominators must be tracked and preserved '
      + 'throughout: a value that made any original denominator zero remains excluded from the '
      + 'combined result PERMANENTLY, regardless of whether that exclusion is still visible after '
      + 'simplification. For (x²−4)/(x−2) simplifying to x+2, the restriction x≠2 survives even '
      + 'though the simplified form x+2 looks perfectly defined there.',
    targetedMisconceptions: [`${RATADD}:MC-1`, `${RATADD}:MC-2`, `${RATADD}:MC-3`],
    source: eb(RATADD, 'Core Understanding — the LCD comes from factoring each denominator first, the domain restriction from the original denominators survives simplification, and LCD conversion requires rescaling both numerator and denominator'),
  },
  {
    conceptId: RATMULT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Multiplying rational expressions extends A/B×C/D=AC/BD. The most efficient approach factors '
      + 'every numerator and denominator FIRST, while the pieces are small, rather than multiplying '
      + 'everything out and searching for cancellations in a large expanded result — for '
      + '(x²−4)/(x+3)×(x+3)/(x−2), factoring first gives [(x+2)(x−2)]/(x+3)×(x+3)/(x−2), with the '
      + '(x+3) and (x−2) cancellations visible immediately.\n\n'
      + 'Factoring first also reveals DIAGONAL cancellation: a factor in ONE fraction\'s numerator '
      + 'can cancel against the SAME factor in the OTHER fraction\'s denominator, since '
      + 'multiplication combines everything into one shared numerator and denominator regardless of '
      + 'which original fraction each factor came from — for 2x/[(x+3)(x−3)]×(x−3)/4, the (x−3) in '
      + 'the second fraction\'s numerator cancels against the (x−3) in the first fraction\'s '
      + 'factored denominator, NEVER restricted to cancellation within a single fraction alone.\n\n'
      + 'Division follows A/B÷C/D=A/B×D/C — multiply by the RECIPROCAL of the DIVISOR (the fraction '
      + 'after ÷) ONLY. The dividend is NEVER flipped, and flipping the wrong fraction (or both) '
      + 'produces a structurally different, generally incorrect expression, never merely an '
      + 'inefficient path to the right answer.',
    targetedMisconceptions: [`${RATMULT}:MC-1`, `${RATMULT}:MC-2`, `${RATMULT}:MC-3`],
    source: eb(RATMULT, 'Core Understanding — factoring before multiplying reveals cancellations including diagonal ones across fractions, and division flips only the divisor, never the dividend'),
  },
]

export const MATHEMATICS_ALGEBRA_RATIONAL_EXPR_OPS_PROBES: SeedProbe[] = [
  // --- math.alg.rational-expressions-addition ------------------------------------------
  {
    conceptId: RATADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To add 1/(x²−1) + 2/(x+1), what is the genuine LCD?',
    choices: [
      { text: '(x+1)(x−1) — factoring x²−1 first reveals x+1 is already one of its factors, so the LCD is just (x+1)(x−1), never the larger product of both unfactored denominators', isCorrect: true },
      { text: '(x²−1)(x+1) — the product of the two unfactored denominators as given', isCorrect: false, misconceptionId: `${RATADD}:MC-1` },
      { text: 'x²−1 alone, since it is the larger of the two denominators', isCorrect: false, misconceptionId: `${RATADD}:MC-1` },
    ],
    targetedMisconceptions: [`${RATADD}:MC-1`],
    source: eb(RATADD, 'Detection probe — the genuine LCD comes from factoring each denominator first, which often reveals a shared factor that direct multiplication of unfactored denominators would miss'),
  },
  {
    conceptId: RATADD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '(x²−4)/(x−2) simplifies to x+2 after factoring and cancelling. What is the correct domain restriction on this result?',
    choices: [
      { text: 'x≠2 — the ORIGINAL expression is undefined at x=2, and this exclusion survives even though the simplified form x+2 looks perfectly defined there', isCorrect: true },
      { text: 'No restriction — x+2 is defined for every real number', isCorrect: false, misconceptionId: `${RATADD}:MC-2` },
      { text: 'x≠−2, reading the restriction from the simplified expression x+2', isCorrect: false, misconceptionId: `${RATADD}:MC-2` },
    ],
    targetedMisconceptions: [`${RATADD}:MC-2`],
    source: eb(RATADD, 'Detection probe — a value excluded by the original, pre-simplification denominator remains excluded permanently, regardless of whether it is still visible after cancellation'),
  },
  {
    conceptId: RATADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Converting 5/(x+1) to the LCD (x+1)(x−1) by multiplying the denominator by (x−1), what must also be done to the numerator?',
    choices: [
      { text: 'Multiply it by the same factor (x−1), giving 5(x−1)/[(x+1)(x−1)] — this is required so the fraction\'s value is preserved, the identical "multiply by 1" principle from numeric fractions', isCorrect: true },
      { text: 'Nothing — only the denominator needs to change to match the LCD', isCorrect: false, misconceptionId: `${RATADD}:MC-3` },
      { text: 'Multiply it by a different factor chosen to keep the numerator as simple as possible', isCorrect: false, misconceptionId: `${RATADD}:MC-3` },
    ],
    targetedMisconceptions: [`${RATADD}:MC-3`],
    source: eb(RATADD, 'Detection probe — converting to a common denominator requires multiplying BOTH numerator and denominator by the identical missing factor, never the denominator alone'),
  },

  // --- math.alg.rational-expressions-multiplication -------------------------------------------
  {
    conceptId: RATMULT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To multiply (x²−4)/(x+3) × (x+3)/(x−2), what is the most efficient first step?',
    choices: [
      { text: 'Factor every numerator and denominator first: [(x+2)(x−2)]/(x+3) × (x+3)/(x−2), making the (x+3) and (x−2) cancellations visible immediately', isCorrect: true },
      { text: 'Multiply both numerators and both denominators out fully first, then search the expanded result for common factors', isCorrect: false, misconceptionId: `${RATMULT}:MC-1` },
      { text: 'Add the numerators and denominators together before simplifying', isCorrect: false, misconceptionId: `${RATMULT}:MC-1` },
    ],
    targetedMisconceptions: [`${RATMULT}:MC-1`],
    source: eb(RATMULT, 'Detection probe — factoring every numerator and denominator first, before multiplying, reveals cancellation opportunities immediately rather than burying them in an expanded product'),
  },
  {
    conceptId: RATMULT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Dividing (x+1)/(x−5) ÷ (x+1)/(x+2), which fraction should be flipped to its reciprocal?',
    choices: [
      { text: 'Only the second fraction, (x+1)/(x+2) — the divisor, the one after the ÷ symbol; the dividend (x+1)/(x−5) is never touched', isCorrect: true },
      { text: 'The first fraction, (x+1)/(x−5), since it appears first in the expression', isCorrect: false, misconceptionId: `${RATMULT}:MC-2` },
      { text: 'Both fractions should be flipped to their reciprocals', isCorrect: false, misconceptionId: `${RATMULT}:MC-2` },
    ],
    targetedMisconceptions: [`${RATMULT}:MC-2`],
    source: eb(RATMULT, 'Detection probe (Blueprint) — division flips only the divisor (the fraction after ÷), never the dividend and never both; this rule has no exceptions'),
  },
  {
    conceptId: RATMULT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Multiplying 2x/[(x+3)(x−3)] × (x−3)/4, is there a cancellation available even though the two (x−3) factors started out in different fractions?',
    choices: [
      { text: 'Yes — the (x−3) in the second fraction\'s numerator cancels against the (x−3) in the first fraction\'s denominator, since multiplication combines everything into one shared numerator and denominator regardless of origin', isCorrect: true },
      { text: 'No — factors can only cancel with other factors within the same original fraction', isCorrect: false, misconceptionId: `${RATMULT}:MC-3` },
      { text: 'No, since the two (x−3) factors appear on opposite sides of the multiplication sign', isCorrect: false, misconceptionId: `${RATMULT}:MC-3` },
    ],
    targetedMisconceptions: [`${RATMULT}:MC-3`],
    source: eb(RATMULT, 'Detection probe (Blueprint) — a factor in one fraction\'s numerator can cancel against the identical factor in the other fraction\'s denominator, never restricted to within-fraction cancellation alone'),
  },
]

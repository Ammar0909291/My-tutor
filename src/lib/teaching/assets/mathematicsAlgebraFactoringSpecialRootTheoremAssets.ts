/**
 * Sixteenth math.alg asset batch — factoring-special and rational-root-theorem.
 *
 * Continues serving-asset coverage for math.alg (44/59 -> 46/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.factoring-special.md
 * and math.alg.rational-root-theorem.md.
 *
 *   FACTORSPECIAL factoring-special — a sum of squares NEVER factors
 *                 the way a difference of squares does; the cube-
 *                 factoring trinomial's middle sign is always the
 *                 OPPOSITE of the binomial's sign, never matching; a
 *                 perfect-square trinomial requires the middle term to
 *                 EXACTLY equal 2ab, never just "two perfect-square
 *                 outer terms."
 *   RATROOTTHM    rational-root-theorem — a failed candidate says
 *                 NOTHING about the next candidate, so testing must
 *                 never stop after one failure; an exhausted candidate
 *                 list proves only "no RATIONAL roots," never "no roots
 *                 at all"; the divisor list must be generated
 *                 systematically, never from memory or partially.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FACTORSPECIAL = 'math.alg.factoring-special'
const RATROOTTHM = 'math.alg.rational-root-theorem'

export const MATHEMATICS_ALGEBRA_FACTORING_SPECIAL_ROOT_THEOREM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FACTORSPECIAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Three pattern families are memorised shortcuts through the general factoring procedure. '
      + 'DIFFERENCE OF SQUARES, a²−b²=(a+b)(a−b), has NO analogue for addition: a²+b² does NOT '
      + 'factor into real linear factors at all — attempting (3x+5)(3x−5) for 9x²+25 expands back '
      + 'to 9x²−25, not 9x²+25, confirming no such factorisation exists.\n\n'
      + 'SUM AND DIFFERENCE OF CUBES, a³+b³=(a+b)(a²−ab+b²) and a³−b³=(a−b)(a²+ab+b²), follow a '
      + 'fixed sign rule: the binomial factor\'s sign MATCHES the original expression, while the '
      + 'trinomial factor\'s middle term is ALWAYS the OPPOSITE sign — for x³+8=(x+2)(x²−2x+4), the '
      + 'middle term is −2x (opposite the +), never +2x, since only that sign choice makes the cross '
      + 'terms cancel when expanded.\n\n'
      + 'PERFECT SQUARE TRINOMIALS, (a±b)²=a²±2ab+b², require the sharpest check: two perfect-square '
      + 'outer terms are NECESSARY but NEVER SUFFICIENT — the middle term must EXACTLY equal twice '
      + 'the product of the outer terms\' square roots. x²+10x+25 fits (required middle term '
      + '2·x·5=10x matches exactly), but x²+9x+25 does NOT (required 10x ≠ actual 9x), despite '
      + 'having identical perfect-square outer terms. Every one of these three patterns is verified '
      + 'by expanding the proposed factorisation back out.',
    targetedMisconceptions: [`${FACTORSPECIAL}:MC-1`, `${FACTORSPECIAL}:MC-2`, `${FACTORSPECIAL}:MC-3`],
    source: eb(FACTORSPECIAL, 'Core Understanding — a sum of squares never factors like a difference, the cube trinomial\'s middle sign is always opposite the binomial\'s, and a perfect-square trinomial needs an exact middle-term match, never just matching outer terms'),
  },
  {
    conceptId: RATROOTTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Rational Root Theorem states that for a polynomial with INTEGER coefficients, any '
      + 'rational root p/q (lowest terms) must satisfy p divides the constant term and q divides the '
      + 'leading coefficient. This generates a FINITE LIST of candidates, but the theorem does NOT '
      + 'guarantee any candidate is an actual root — it only narrows the search, and each candidate '
      + 'must be TESTED independently.\n\n'
      + 'A failed candidate says NOTHING about the next one: testing x=2 in 2x³−3x²−11x+6 fails '
      + '(giving −12≠0), but stopping there would miss the genuine root x=3. Each test is a fresh, '
      + 'independent check, and the full list must be exhausted before concluding no rational roots '
      + 'exist.\n\n'
      + 'When every candidate fails, the correct conclusion is narrowly "no RATIONAL roots exist," '
      + 'NEVER the broader "no roots exist at all" — for x²−2=0, testing all candidates (±1, ±2) '
      + 'fails, but the actual roots x=±√2 are irrational and never appear on any Rational Root '
      + 'Theorem candidate list, since the theorem was never designed to detect irrational roots.\n\n'
      + 'The candidate list itself must be generated SYSTEMATICALLY — checking every integer up to '
      + 'the value for exact division — never recalled from memory, since a missed divisor silently '
      + 'omits a genuine candidate root from the search.',
    targetedMisconceptions: [`${RATROOTTHM}:MC-1`, `${RATROOTTHM}:MC-2`, `${RATROOTTHM}:MC-3`],
    source: eb(RATROOTTHM, 'Core Understanding — each candidate is an independent test that must be exhausted, an empty result means only no rational roots not no roots at all, and the divisor list must be generated systematically'),
  },
]

export const MATHEMATICS_ALGEBRA_FACTORING_SPECIAL_ROOT_THEOREM_PROBES: SeedProbe[] = [
  // --- math.alg.factoring-special ------------------------------------------
  {
    conceptId: FACTORSPECIAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does 9x²+25 factor as (3x+5)(3x−5), the way 9x²−25 does?',
    choices: [
      { text: 'No — expanding (3x+5)(3x−5) gives 9x²−25, not 9x²+25; a sum of squares has no real factorisation at all, unlike a difference of squares', isCorrect: true },
      { text: 'Yes — any expression with two perfect-square terms factors the same way regardless of the operator between them', isCorrect: false, misconceptionId: `${FACTORSPECIAL}:MC-1` },
      { text: 'Yes, since both expressions contain the identical squared terms 9x² and 25', isCorrect: false, misconceptionId: `${FACTORSPECIAL}:MC-1` },
    ],
    targetedMisconceptions: [`${FACTORSPECIAL}:MC-1`],
    source: eb(FACTORSPECIAL, 'Detection probe — a sum of squares never factors into real linear factors, unlike a difference of squares, confirmed by attempted expansion never matching'),
  },
  {
    conceptId: FACTORSPECIAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Factoring x³+8 using the sum-of-cubes pattern a³+b³=(a+b)(a²−ab+b²), what should the trinomial\'s middle term be?',
    choices: [
      { text: '−2x — the trinomial\'s middle term is always the OPPOSITE sign of the binomial\'s (+), giving (x+2)(x²−2x+4); this is what makes the cross terms cancel when expanded', isCorrect: true },
      { text: '+2x — matching the binomial\'s sign, giving (x+2)(x²+2x+4)', isCorrect: false, misconceptionId: `${FACTORSPECIAL}:MC-2` },
      { text: 'Either sign works equally well, since both expand to valid factorisations', isCorrect: false, misconceptionId: `${FACTORSPECIAL}:MC-2` },
    ],
    targetedMisconceptions: [`${FACTORSPECIAL}:MC-2`],
    source: eb(FACTORSPECIAL, 'Detection probe — the cube-factoring trinomial\'s middle term is always the opposite sign of the binomial factor\'s sign, never matching, verified by expansion'),
  },
  {
    conceptId: FACTORSPECIAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'x²+9x+25 has perfect-square outer terms (x² and 25=5²), just like x²+10x+25. Does x²+9x+25 also fit the perfect-square-trinomial pattern (x+5)²?',
    choices: [
      { text: 'No — the required middle term is 2·x·5=10x, but the actual middle term is 9x; having perfect-square outer terms is necessary but not sufficient, the middle term must match exactly', isCorrect: true },
      { text: 'Yes — since both outer terms are perfect squares, the trinomial automatically fits the pattern', isCorrect: false, misconceptionId: `${FACTORSPECIAL}:MC-3` },
      { text: 'Yes, since 9x and 10x are close enough to be treated as the same pattern', isCorrect: false, misconceptionId: `${FACTORSPECIAL}:MC-3` },
    ],
    targetedMisconceptions: [`${FACTORSPECIAL}:MC-3`],
    source: eb(FACTORSPECIAL, 'Detection probe — perfect-square outer terms are necessary but never sufficient; the middle term must be computed explicitly (2ab) and compared exactly against the actual middle term'),
  },

  // --- math.alg.rational-root-theorem -------------------------------------------
  {
    conceptId: RATROOTTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Testing x=2 in 2x³−3x²−11x+6 gives −12≠0, so x=2 is not a root. Does this tell you anything about whether x=3 is a root?',
    choices: [
      { text: 'No — each candidate is an independent test; x=2 failing tells you nothing about x=3, which must be tested on its own (and turns out to be a genuine root)', isCorrect: true },
      { text: 'Yes — if x=2 fails, nearby candidates like x=3 are also likely to fail and testing can stop', isCorrect: false, misconceptionId: `${RATROOTTHM}:MC-1` },
      { text: 'Yes, since one failed candidate means the whole candidate list can be abandoned', isCorrect: false, misconceptionId: `${RATROOTTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${RATROOTTHM}:MC-1`],
    source: eb(RATROOTTHM, 'Detection probe (Blueprint) — each rational-root candidate is an independent test; a single failure carries no information about any other candidate, so the full list must be tested'),
  },
  {
    conceptId: RATROOTTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For x²−2=0, testing all four rational candidates (±1, ±2) finds none satisfy the equation. What is the correct conclusion?',
    choices: [
      { text: 'No RATIONAL roots exist — the equation may still have irrational roots (indeed x=±√2 are the actual roots, which never appear on any Rational Root Theorem candidate list)', isCorrect: true },
      { text: 'The equation has no roots at all, in any number system', isCorrect: false, misconceptionId: `${RATROOTTHM}:MC-2` },
      { text: 'The equation was set up incorrectly, since every valid polynomial equation must have a rational root', isCorrect: false, misconceptionId: `${RATROOTTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${RATROOTTHM}:MC-2`],
    source: eb(RATROOTTHM, 'Detection probe (Blueprint) — an exhausted rational candidate list proves only "no rational roots," never the broader "no roots at all"; irrational or complex roots may still exist'),
  },
  {
    conceptId: RATROOTTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To generate the candidate list for a polynomial with constant term 12, how should the divisors of 12 be found?',
    choices: [
      { text: 'Systematically — check every integer from 1 up to 12 for exact division, giving the complete set ±1,±2,±3,±4,±6,±12', isCorrect: true },
      { text: 'From memory, listing whichever divisors come to mind first', isCorrect: false, misconceptionId: `${RATROOTTHM}:MC-3` },
      { text: 'Only the divisors that are also perfect squares or otherwise visually notable', isCorrect: false, misconceptionId: `${RATROOTTHM}:MC-3` },
    ],
    targetedMisconceptions: [`${RATROOTTHM}:MC-3`],
    source: eb(RATROOTTHM, 'Detection probe — the divisor list must be generated systematically, checking every integer up to the value, never recalled from memory or partially, since a missed divisor omits a genuine candidate root'),
  },
]

/**
 * MATHEMATICS — probe DEPTH, batch 8: math.func (29 (concept, band) pairs, 58 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every answer was substituted back, e.g. 2x³ − 3x² − 3x + 2 has roots 2, ½
 * and −1 (and not 1, −2 or 3/2), the vertex of −x² + 4x + 1 is (2, 5),
 * x² + 4x + 1 = (x + 2)² − 3, f(x + h) − f(x) = 2xh + h² for x², and
 * continuity of the piecewise 3x − 1 / x² + k at 2 needs 5 = 4 + k.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, gradeBand: GradeBand, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

const M = 'mcq' as const
const X = 'misconception_probe' as const

export const MATHEMATICS_DEPTH_FUNCTIONS_PROBES: SeedProbe[] = [
  q('math.func.bijection', HIGH, M, D, 'Is f(x) = 2x + 1, from ℝ to ℝ, a bijection?', 'Yes, it is both injective and surjective', ['No, it is only injective', 'No, it is only surjective', 'No, a linear function is never a bijection'], 'every y has exactly one x = (y − 1)/2'),
  q('math.func.bijection', HIGH, M, A, 'How many bijections are there from {1, 2, 3} to {a, b, c}?', '6', ['3', '9', '27'], '3! orderings'),

  q('math.func.composition', HIGH, M, D, 'f(x) = 2x and g(x) = x − 1. What is (g∘f)(3)?', '5', ['4', '8', '3'], 'f first: f(3) = 6, then g(6) = 5'),
  q('math.func.composition', HIGH, M, A, 'f(x) = 1/x and g(x) = x + 2. What is the domain of f∘g?', 'All real x except −2', ['All real x except 0', 'All real x', 'x > −2'], 'g(x) must not be 0'),

  q('math.func.domain-range', HIGH, M, D, 'What is the range of f(x) = x² + 3?', 'y ≥ 3', ['All real numbers', 'y ≥ 0', 'y > 3'], 'x² is at least 0, and reaches 0'),
  q('math.func.domain-range', HIGH, M, A, 'What is the domain of f(x) = √(4 − x²)?', '−2 ≤ x ≤ 2', ['−2 < x < 2', 'x ≤ 2', 'All real numbers'], '4 − x² ≥ 0, endpoints included'),

  q('math.func.end-behavior', HIGH, M, D, 'As x → ∞, what does f(x) = −2x⁴ + x do?', 'f(x) → −∞', ['f(x) → ∞', 'f(x) → 0', 'f(x) → −2'], 'the leading term −2x⁴ dominates'),
  q('math.func.end-behavior', HIGH, M, A, 'f(x) = (3x² + 1)/(x² − 5). What does f(x) approach as x → ∞?', '3', ['∞', '0', '−1/5'], 'ratio of leading coefficients, equal degrees'),

  q('math.func.even-odd-functions', HIGH, M, D, 'Is f(x) = x³ − x even, odd, or neither?', 'Odd', ['Even', 'Neither', 'Both'], 'f(−x) = −x³ + x = −f(x)'),
  q('math.func.even-odd-functions', HIGH, M, A, 'f is even and g is odd. Is the product f·g even, odd, or neither?', 'Odd', ['Even', 'Neither', 'It cannot be determined'], 'f(−x)g(−x) = f(x)·(−g(x))'),

  q('math.func.exponential-function', HIGH, M, D, 'What is 2^(−3)?', '1/8', ['−8', '−6', '8'], 'a negative exponent is a reciprocal'),
  q('math.func.exponential-function', HIGH, M, A, 'A quantity starts at 10 and triples every 2 hours. How much is there after 6 hours?', '270', ['90', '180', '2430'], 'three tripling periods: 10 · 3³'),

  q('math.func.function-concept', HIGH, X, F, 'Which set of (x, y) pairs is a function of x?', '{(1, 2), (2, 2), (3, 5)}', ['{(1, 2), (1, 3), (2, 4)}', '{(2, 1), (2, 5), (3, 1)}', 'None of them, since a repeated output is not allowed'], 'a repeated output is fine; a repeated input with two outputs is not'),
  q('math.func.function-concept', HIGH, X, P, 'Is the vertical line x = 4 the graph of a function y = f(x)?', 'No, the input 4 is paired with every y', ['Yes, every straight line is a function', 'Yes, it has a constant value', 'No, because it has no y-intercept'], 'one input, infinitely many outputs'),

  q('math.func.function-notation', HIGH, M, D, 'If f(x) = 3x − 1, what is f(a + 2)?', '3a + 5', ['3a + 1', '3a + 3', '3a − 1'], 'replace every x by (a + 2): 3a + 6 − 1'),
  q('math.func.function-notation', HIGH, M, A, 'If f(x) = x², what is f(x + h) − f(x)?', '2xh + h²', ['h²', 'x² + h²', '2x + h'], '(x + h)² − x²'),

  q('math.func.function-operations', HIGH, M, D, 'f(x) = x + 2 and g(x) = x − 5. What is (f − g)(x)?', '7', ['2x − 3', '−3', '2x + 7'], 'subtract the whole of g: x + 2 − x + 5'),
  q('math.func.function-operations', HIGH, M, A, 'f(x) = x² and g(x) = x − 2. What is the domain of (f/g)(x)?', 'All real x except 2', ['All real x', 'x > 2', 'All real x except 0'], 'the divisor g(x) must not be 0'),

  q('math.func.graph-of-function', HIGH, M, D, 'The point (2, 7) is on the graph of f. What does that tell you?', 'f(2) = 7', ['f(7) = 2', 'f(0) = 2', 'f(2) = 0'], 'a graph point is (input, output)'),
  q('math.func.graph-of-function', HIGH, M, A, 'Which curve is the graph of a function of x?', 'y = |x|', ['x² + y² = 1', 'x = y²', 'x = 3'], 'the vertical line test'),

  q('math.func.horizontal-asymptote', HIGH, M, D, 'What is the horizontal asymptote of f(x) = 5/(x + 1)?', 'y = 0', ['y = 5', 'x = −1', 'y = 1'], 'the numerator has lower degree'),
  q('math.func.horizontal-asymptote', HIGH, M, A, 'What is the horizontal asymptote of f(x) = (4x³ − x)/(2x³ + 7)?', 'y = 2', ['y = 4', 'y = 0', 'There is none'], 'equal degrees: 4/2'),

  q('math.func.injectivity', HIGH, M, D, 'Which function is injective on all of ℝ?', 'f(x) = x³', ['f(x) = x²', 'f(x) = |x|', 'f(x) = cos x'], 'x³ never repeats a value'),
  q('math.func.injectivity', HIGH, M, A, 'Is f(x) = x² injective on the domain x ≥ 0?', 'Yes', ['No, because f(−2) = f(2)', 'No, a quadratic is never injective', 'Only for x > 1'], '−2 is not in this domain'),

  q('math.func.inverse-functions', HIGH, M, D, 'What is f⁻¹(x) for f(x) = (x − 4)/5?', '5x + 4', ['5x − 4', '(x + 4)/5', '5/(x − 4)'], 'undo in reverse order: multiply by 5, then add 4'),
  q('math.func.inverse-functions', HIGH, M, A, 'If f(3) = 8, what is f⁻¹(8)?', '3', ['1/8', '8', '1/3'], 'the inverse swaps input and output'),

  q('math.func.linear-function', HIGH, M, D, 'What is the slope of the line through (1, 2) and (4, 11)?', '3', ['1/3', '9', '13/5'], 'rise 9 over run 3'),
  q('math.func.linear-function', HIGH, M, A, 'A linear function has f(0) = 5 and f(2) = 1. What is f(x)?', '−2x + 5', ['2x + 5', '−2x + 1', '−4x + 5'], 'slope (1 − 5)/2, intercept 5'),

  q('math.func.logarithmic-function', HIGH, M, D, 'What is log₂ 32?', '5', ['16', '6', '4'], '2⁵ = 32'),
  q('math.func.logarithmic-function', HIGH, M, A, 'Solve log₃(x − 1) = 2.', 'x = 10', ['x = 9', 'x = 7', 'x = 8'], 'x − 1 = 3²'),

  q('math.func.monotonic-function', HIGH, M, D, 'On which interval is f(x) = x² decreasing?', 'x < 0', ['x > 0', 'All real x', 'Nowhere'], 'the parabola falls to the left of its vertex'),
  q('math.func.monotonic-function', HIGH, M, A, 'Is f(x) = x³ strictly increasing on ℝ?', 'Yes', ['No, since its derivative is 0 at x = 0', 'No, it decreases for x < 0', 'Only for x > 0'], 'a < b implies a³ < b³; a zero slope at one point does not break it'),

  q('math.func.periodic-function', HIGH, M, D, 'What is the period of f(x) = sin(3x)?', '2π/3', ['3', '6π', 'π/3'], '2π divided by 3'),
  q('math.func.periodic-function', HIGH, M, A, 'f has period 4 and f(1) = 7. What is f(13)?', '7', ['19', '4', '52'], '13 = 1 + 3 · 4'),

  q('math.func.piecewise-function', HIGH, M, D, 'f(x) = x² for x < 0 and f(x) = 2x + 1 for x ≥ 0. What is f(−3)?', '9', ['−5', '−9', '6'], '−3 < 0, so use x²'),
  q('math.func.piecewise-function', HIGH, M, A, 'f(x) = 3x − 1 for x < 2 and f(x) = x² + k for x ≥ 2. Which k makes f continuous at 2?', '1', ['5', '−1', '0'], 'both pieces must give 5 at x = 2'),

  q('math.func.polynomial-function', HIGH, M, D, 'What is the degree of p(x) = 4x³ − 2x⁵ + 7?', '5', ['3', '4', '8'], 'the highest power, wherever it is written'),
  q('math.func.polynomial-function', HIGH, M, A, 'How many distinct real zeros does p(x) = (x − 2)²(x + 1) have?', '2', ['3', '1', '4'], 'x = 2 (double) and x = −1'),

  q('math.func.quadratic-function', HIGH, M, D, 'What are the roots of f(x) = x² − x − 12?', 'x = 4 and x = −3', ['x = 3 and x = −4', 'x = 12 and x = −1', 'x = 6 and x = −2'], '(x − 4)(x + 3)'),
  q('math.func.quadratic-function', HIGH, M, A, 'What is the maximum value of f(x) = −x² + 4x + 1?', '5', ['1', '2', '4'], 'vertex at x = 2: −4 + 8 + 1'),

  q('math.func.rational-function', HIGH, M, D, 'What is the domain of f(x) = (x + 1)/(x² − 9)?', 'All real x except 3 and −3', ['All real x except 3', 'All real x except −1', 'All real x'], 'x² − 9 = 0 at ±3'),
  q('math.func.rational-function', HIGH, M, A, 'What happens to f(x) = (x² − 1)/(x − 1) at x = 1?', 'It has a hole at x = 1', ['It has a vertical asymptote at x = 1', 'It has a hole at x = −1', 'Nothing; it is defined there'], 'the factor x − 1 cancels'),

  q('math.func.rational-root', HIGH, M, D, 'Which number is on the rational-root candidate list for 3x³ + x − 2?', '2/3', ['3/2', '3', '1/2'], 'p divides −2, q divides 3'),
  q('math.func.rational-root', HIGH, M, A, 'Which number is a root of 2x³ − 3x² − 3x + 2?', '2', ['1', '−2', '3/2'], '16 − 12 − 6 + 2 = 0'),

  q('math.func.real-valued-function', HIGH, M, D, 'What is the natural domain of f(x) = √(x + 5)?', 'x ≥ −5', ['x > −5', 'x ≥ 5', 'All real x'], 'x + 5 ≥ 0'),
  q('math.func.real-valued-function', HIGH, M, A, 'What is the range of f(x) = 1/x²?', 'y > 0', ['y ≥ 0', 'All real y except 0', 'y < 0'], 'never 0, never negative'),

  q('math.func.step-function', HIGH, M, D, 'What is ⌊3.7⌋?', '3', ['4', '3.7', '0.7'], 'the greatest integer not above 3.7'),
  q('math.func.step-function', HIGH, M, A, 'What is ⌈−1.2⌉?', '−1', ['−2', '1', '−1.2'], 'the least integer not below −1.2'),

  q('math.func.surjectivity', HIGH, M, D, 'Is f(x) = x², from ℝ to ℝ, surjective?', 'No, negative numbers are never outputs', ['Yes, every real x has an output', 'Yes, because it is continuous', 'No, because f(−2) = f(2)'], 'surjective is about the codomain being covered'),
  q('math.func.surjectivity', HIGH, M, A, 'Is f(x) = 3x − 7, from ℝ to ℝ, surjective?', 'Yes, each y comes from x = (y + 7)/3', ['No, −7 is never an output', 'No, only integers are reached', 'Only for x > 0'], 'solve 3x − 7 = y'),

  q('math.func.transformations-functions', HIGH, M, D, 'The graph of y = x² is shifted up 4. What is the new equation?', 'y = x² + 4', ['y = (x + 4)²', 'y = (x − 4)²', 'y = 4x²'], 'a vertical shift adds outside the function'),
  q('math.func.transformations-functions', HIGH, M, A, 'The graph of y = f(x) is reflected in the x-axis. What is the new equation?', 'y = −f(x)', ['y = f(−x)', 'y = −f(−x)', 'y = 1/f(x)'], 'every output changes sign'),

  q('math.func.vertex-form', HIGH, M, D, 'What is the vertex of f(x) = 2(x + 1)² − 3?', '(−1, −3)', ['(1, −3)', '(−1, 3)', '(2, −3)'], 'x + 1 = 0 at x = −1'),
  q('math.func.vertex-form', HIGH, M, A, 'Write x² + 4x + 1 in vertex form.', '(x + 2)² − 3', ['(x + 2)² + 1', '(x + 4)² − 15', '(x − 2)² − 3'], 'add and subtract 4'),

  q('math.func.vertical-asymptote', HIGH, M, D, 'Where are the vertical asymptotes of f(x) = 1/(x² − 4)?', 'x = 2 and x = −2', ['x = 4', 'x = 2 only', 'y = 0'], 'the denominator is 0 at ±2'),
  q('math.func.vertical-asymptote', HIGH, M, A, 'Does f(x) = (x + 3)/(x² + 1) have a vertical asymptote?', 'No, x² + 1 is never 0', ['Yes, at x = −1', 'Yes, at x = −3', 'Yes, at x = 1 and x = −1'], 'no real zero of the denominator'),

  q('math.func.zero-of-function', HIGH, M, D, 'What are the zeros of f(x) = x(x − 3)(x + 2)?', '0, 3 and −2', ['3 and −2 only', '0, −3 and 2', '0 only'], 'set each factor to 0'),
  q('math.func.zero-of-function', HIGH, M, A, 'How many real zeros does f(x) = x² + 2x + 5 have?', '0', ['1', '2', '5'], 'discriminant 4 − 20 < 0'),
]

/**
 * MATHEMATICS — probe DEPTH, batch 5: math.alg (60 (concept, band) pairs, 120 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every answer was substituted back, including the extraneous-root cases
 * (√(x + 6) = x keeps 3 and rejects −2; log₂ x + log₂(x − 3) = 2 keeps 4),
 * the discriminant 49 − 4·3·(−6) = 121, Vieta for 3x² − 12x + 5, the
 * remainder p(−2) = −3 for x³ − x + 3, and the identity 1/(x − 1) + 1 =
 * x/(x − 1), whose solution set is every x except 1.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { MIDDLE, HIGH, UNDERGRADUATE: UG } = GradeBand
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

export const MATHEMATICS_DEPTH_ALGEBRA_PROBES: SeedProbe[] = [
  q('math.alg.absolute-value-equations', HIGH, 'mcq', D, 'Solve |2x − 3| = 7.', 'x = 5 or x = −2', ['x = 5 only', 'x = −5 or x = 2', 'No solution'], 'two cases: 2x − 3 = 7 or 2x − 3 = −7'),
  q('math.alg.absolute-value-equations', HIGH, 'mcq', A, 'Solve |x − 4| < 3.', '1 < x < 7', ['x < 7', 'x < 1 or x > 7', '−7 < x < 1'], 'within 3 of 4'),

  q('math.alg.binomial-theorem', HIGH, 'mcq', D, 'What is the coefficient of x² in (x + 3)⁴?', '54', ['6', '18', '12'], 'C(4, 2) × 3² = 6 × 9'),
  q('math.alg.binomial-theorem', HIGH, 'mcq', A, 'What is the constant term of (x + 1/x)⁶?', '20', ['6', '15', '1'], 'the middle term C(6, 3)'),

  q('math.alg.change-of-base', HIGH, 'mcq', D, 'Which expression equals log₅ 20?', 'ln 20 / ln 5', ['ln 5 / ln 20', 'ln 20 − ln 5', 'ln 4'], 'log_b x = log x / log b in any base'),
  q('math.alg.change-of-base', HIGH, 'mcq', A, 'What is log₄ 8?', '3/2', ['2', '1/2', '32'], 'log₂ 8 / log₂ 4 = 3/2'),

  q('math.alg.coefficient', MIDDLE, 'mcq', D, 'What is the coefficient of x in 7 − 4x + x²?', '−4', ['4', '7', '1'], 'the sign belongs to the coefficient'),
  q('math.alg.coefficient', MIDDLE, 'mcq', A, 'What is the coefficient of x² once 3(x² + 2) − x(2x − 1) is simplified?', '1', ['3', '5', '−2'], '3x² − 2x² = x²'),

  q('math.alg.completing-the-square', HIGH, 'mcq', D, 'Write x² + 8x + 3 in completed-square form.', '(x + 4)² − 13', ['(x + 4)² + 3', '(x + 8)² − 61', '(x + 4)² − 16'], 'add and subtract 16'),
  q('math.alg.completing-the-square', HIGH, 'mcq', A, 'What is the minimum value of 2x² − 12x + 5?', '−13', ['5', '3', '−31'], '2(x − 3)² − 13'),

  q('math.alg.complex-polynomial-roots', UG, 'mcq', D, 'A real quadratic has root 3 − 2i. Which quadratic is it?', 'x² − 6x + 13', ['x² + 6x + 13', 'x² − 6x + 5', 'x² − 13'], 'roots 3 ± 2i: sum 6, product 9 + 4'),
  q('math.alg.complex-polynomial-roots', UG, 'mcq', A, 'A real cubic has roots 2 and 1 + i. How many real roots does it have?', 'Exactly one', ['Two', 'Three', 'None'], 'the third root is the conjugate 1 − i'),

  q('math.alg.degree', HIGH, 'mcq', D, 'What is the degree of (x² + 1)(x³ − x)?', '5', ['6', '3', '2'], 'degrees add under multiplication'),
  q('math.alg.degree', HIGH, 'mcq', A, 'What is the degree of (x² + 1)² − x⁴?', '2', ['4', '8', '0'], 'the x⁴ terms cancel: 2x² + 1'),

  q('math.alg.discriminant', HIGH, 'mcq', D, 'What is the discriminant of 3x² + 7x − 6?', '121', ['−23', '−49', '25'], '49 − 4 × 3 × (−6) = 49 + 72'),
  q('math.alg.discriminant', HIGH, 'mcq', A, 'For which value of k does x² + kx + 9 = 0 have exactly one real root (k > 0)?', 'k = 6', ['k = 3', 'k = 9', 'k = 36'], 'k² − 36 = 0'),

  q('math.alg.elimination-method', HIGH, 'mcq', D, 'Solve x + y = 10 and x − y = 4.', 'x = 7, y = 3', ['x = 3, y = 7', 'x = 14, y = 4', 'x = 6, y = 4'], 'add the equations: 2x = 14'),
  q('math.alg.elimination-method', HIGH, 'mcq', A, 'Solve 2x + 3y = 12 and 4x − y = 10.', 'x = 3, y = 2', ['x = 2, y = 3', 'x = 6, y = 0', 'x = 1.5, y = 3'], 'multiply the second by 3 and add: 14x = 42'),

  q('math.alg.equation', HIGH, 'misconception_probe', F, 'Solve 3(x − 2) = 12.', 'x = 6', ['x = 2', 'x = 14/3', 'x = 4'], 'divide by 3, then add 2'),
  q('math.alg.equation', HIGH, 'misconception_probe', D, 'How many solutions does 2(x + 3) = 2x + 6 have?', 'Infinitely many', ['One', 'None', 'Two'], 'both sides are identical — an identity'),

  q('math.alg.equation', MIDDLE, 'mcq', F, 'Solve x − 7 = 12.', 'x = 19', ['x = 5', 'x = −5', 'x = 84'], 'add 7 to both sides'),
  q('math.alg.equation', MIDDLE, 'mcq', P, 'Solve 5x − 4 = 3x + 10.', 'x = 7', ['x = 3', 'x = 14', 'x = 0.75'], 'collect x on one side: 2x = 14'),

  q('math.alg.exponent-rules', HIGH, 'mcq', D, 'Simplify (x²y³)² ÷ x³y.', 'xy⁵', ['x⁴y⁶', 'xy⁶', 'x²y⁵'], 'x⁴y⁶ ÷ x³y'),
  q('math.alg.exponent-rules', HIGH, 'mcq', A, 'What is 8^(−2/3)?', '1/4', ['−4', '4', '−1/4'], 'cube root 2, squared 4, reciprocal'),

  q('math.alg.exponential-equations', HIGH, 'mcq', D, 'Solve 2^(x + 1) = 32.', 'x = 4', ['x = 5', 'x = 16', 'x = 15'], '32 = 2⁵'),
  q('math.alg.exponential-equations', HIGH, 'mcq', A, 'Solve 9^x = 27.', 'x = 3/2', ['x = 3', 'x = 2/3', 'x = 18'], '3^(2x) = 3³'),

  q('math.alg.exponential-function', HIGH, 'mcq', D, 'A population doubles every 5 years from 100. What is it after 15 years?', '800', ['300', '600', '400'], '100 × 2³'),
  q('math.alg.exponential-function', HIGH, 'mcq', A, 'Which function is decreasing?', 'f(x) = (0.8)^x', ['f(x) = 2^x', 'f(x) = 1.1^x', 'f(x) = e^x'], 'a base between 0 and 1 decays'),

  q('math.alg.expression', MIDDLE, 'mcq', F, 'What is the value of 2a + 3 when a = 5?', '13', ['25', '10', '28'], '2 × 5 + 3'),
  q('math.alg.expression', MIDDLE, 'mcq', P, 'Which expression means "four less than three times a number n"?', '3n − 4', ['4 − 3n', '3(n − 4)', '3n + 4'], '"less than" reverses the order'),

  q('math.alg.factor-theorem', HIGH, 'mcq', D, 'Is (x − 3) a factor of x³ − 4x² + x + 6?', 'Yes, because p(3) = 0', ['No, because p(3) = 6', 'Only if p(−3) = 0', 'It cannot be checked without division'], '27 − 36 + 3 + 6 = 0'),
  q('math.alg.factor-theorem', HIGH, 'mcq', A, 'For which k is (x + 2) a factor of x³ + kx + 6?', 'k = −1', ['k = 1', 'k = 7', 'k = −7'], 'p(−2) = −8 − 2k + 6 = 0'),

  q('math.alg.factoring-gcf', MIDDLE, 'mcq', D, 'Factor 10x² − 15x completely.', '5x(2x − 3)', ['5(2x² − 3x)', 'x(10x − 15)', '5x(2x − 15)'], 'the GCF is 5x'),
  q('math.alg.factoring-gcf', MIDDLE, 'mcq', A, 'Factor 6a²b − 9ab² + 3ab completely.', '3ab(2a − 3b + 1)', ['3ab(2a − 3b)', 'ab(6a − 9b + 3)', '3(2a²b − 3ab² + ab)'], 'the last term keeps a factor of 1'),

  q('math.alg.factoring-special', HIGH, 'mcq', D, 'Factor x² − 49.', '(x − 7)(x + 7)', ['(x − 7)²', '(x + 7)²', 'It does not factor'], 'difference of squares'),
  q('math.alg.factoring-special', HIGH, 'mcq', A, 'Factor 8x³ − 27.', '(2x − 3)(4x² + 6x + 9)', ['(2x − 3)³', '(2x − 3)(4x² − 6x + 9)', '(2x + 3)(4x² − 6x + 9)'], 'difference of cubes a³ − b³ = (a − b)(a² + ab + b²)'),

  q('math.alg.factoring-trinomials', HIGH, 'mcq', D, 'Factor x² − x − 12.', '(x − 4)(x + 3)', ['(x + 4)(x − 3)', '(x − 6)(x + 2)', '(x − 12)(x + 1)'], 'numbers multiplying to −12 and adding to −1'),
  q('math.alg.factoring-trinomials', HIGH, 'mcq', A, 'Factor 3x² + 10x − 8.', '(3x − 2)(x + 4)', ['(3x + 2)(x − 4)', '(3x − 4)(x + 2)', '(3x + 4)(x − 2)'], 'ac = −24: split 10x as 12x − 2x'),

  q('math.alg.factoring', HIGH, 'mcq', D, 'Factor 2x³ − 8x completely.', '2x(x − 2)(x + 2)', ['2x(x² − 4)', 'x(2x² − 8)', '2(x³ − 4x)'], 'take out 2x, then the difference of squares'),
  q('math.alg.factoring', HIGH, 'mcq', A, 'Factor x³ + 2x² − 9x − 18 by grouping.', '(x + 2)(x − 3)(x + 3)', ['(x + 2)(x² − 9)', '(x − 2)(x² + 9)', '(x + 2)(x − 9)'], 'grouping, then the difference of squares'),

  q('math.alg.fractional-exponent', HIGH, 'mcq', D, 'What is 25^(3/2)?', '125', ['37.5', '15', '625'], '√25 = 5, then cubed'),
  q('math.alg.fractional-exponent', HIGH, 'mcq', A, 'Write ∛(x²) with a fractional exponent.', 'x^(2/3)', ['x^(3/2)', 'x^(2·3)', 'x^(1/6)'], 'the root index goes in the denominator'),

  q('math.alg.fundamental-theorem-algebra', UG, 'mcq', D, 'Counting multiplicity, how many complex roots does x⁵ − x + 1 have?', '5', ['1', '3', 'It cannot be known without solving'], 'degree n gives n roots in ℂ'),
  q('math.alg.fundamental-theorem-algebra', UG, 'mcq', A, 'Which statement follows from the Fundamental Theorem of Algebra?', 'Every real polynomial factors into real linear and real quadratic factors', ['Every polynomial has a real root', 'Every root can be written with radicals', 'Every polynomial of degree 4 has 4 distinct roots'], 'complex roots pair into real quadratics'),

  q('math.alg.inequality-1var', HIGH, 'mcq', D, 'Solve 4 − 3x ≤ 10.', 'x ≥ −2', ['x ≤ −2', 'x ≥ 2', 'x ≤ 2'], 'dividing by −3 flips the sign'),
  q('math.alg.inequality-1var', HIGH, 'mcq', A, 'Solve −1 < 2x + 3 ≤ 9.', '−2 < x ≤ 3', ['−1 < x ≤ 3', '−2 ≤ x < 3', '1 < x ≤ 6'], 'subtract 3 from all three parts, then divide by 2'),

  q('math.alg.inequality-2var', HIGH, 'mcq', D, 'Is (2, 1) a solution of y > 2x − 5?', 'Yes, because 1 > −1', ['No, because 1 < 2', 'No, it lies on the line', 'It cannot be decided'], 'substitute the point'),
  q('math.alg.inequality-2var', HIGH, 'mcq', A, 'Which point satisfies both y ≥ x and x + y < 4?', '(1, 2)', ['(3, 2)', '(2, 1)', '(0, 5)'], 'check each inequality'),

  q('math.alg.inequality', MIDDLE, 'mcq', D, 'Solve 3x − 2 ≥ 10.', 'x ≥ 4', ['x ≤ 4', 'x ≥ 8/3', 'x ≥ 12'], 'add 2, then divide by 3'),
  q('math.alg.inequality', MIDDLE, 'mcq', A, 'Solve −x + 5 > 2.', 'x < 3', ['x > 3', 'x < −3', 'x > −3'], 'multiplying by −1 flips the sign'),

  q('math.alg.like-terms', MIDDLE, 'misconception_probe', F, 'Simplify 4y + 7y.', '11y', ['11y²', '28y', '4y + 7y cannot be simplified'], 'like terms add their coefficients'),
  q('math.alg.like-terms', MIDDLE, 'misconception_probe', P, 'Simplify 3ab + 2ba − ab.', '4ab', ['5ab − ab', '4a²b²', '3ab + 2ba'], 'ab and ba are the same term'),

  q('math.alg.linear-equation-1var', MIDDLE, 'misconception_probe', F, 'Solve x/4 = 3.', 'x = 12', ['x = 3/4', 'x = 7', 'x = −1'], 'multiply both sides by 4'),
  q('math.alg.linear-equation-1var', MIDDLE, 'misconception_probe', D, 'Solve 2(x − 1) = 10.', 'x = 6', ['x = 5.5', 'x = 4', 'x = 9'], 'expand or divide by 2 first'),

  q('math.alg.linear-equation-2var', MIDDLE, 'mcq', D, 'Which point lies on 2x − y = 6?', '(4, 2)', ['(2, 4)', '(3, 3)', '(0, 6)'], '8 − 2 = 6'),
  q('math.alg.linear-equation-2var', MIDDLE, 'mcq', A, 'Rearrange 3x + 2y = 8 into the form y = mx + c.', 'y = −1.5x + 4', ['y = 1.5x + 4', 'y = −3x + 8', 'y = −1.5x + 8'], 'subtract 3x, then divide everything by 2'),

  q('math.alg.logarithm-properties', HIGH, 'mcq', D, 'Write log 12 using log 2 and log 3.', '2 log 2 + log 3', ['log 2 + log 3 + 2', 'log 2 × log 3 × 2', '6 log 2'], '12 = 2² × 3'),
  q('math.alg.logarithm-properties', HIGH, 'mcq', A, 'Simplify log₃ 54 − log₃ 2.', '3', ['log₃ 52', '27', '1'], 'log₃(54/2) = log₃ 27'),

  q('math.alg.logarithm', HIGH, 'mcq', D, 'What is log₂ 32?', '5', ['16', '6', '2⁵'], '2⁵ = 32'),
  q('math.alg.logarithm', HIGH, 'mcq', A, 'What is log₁₀ 0.001?', '−3', ['3', '0.001', 'It is undefined'], '10⁻³ = 0.001'),

  q('math.alg.logarithmic-equations', HIGH, 'mcq', D, 'Solve log₃(x − 1) = 2.', 'x = 10', ['x = 7', 'x = 9', 'x = 3'], 'x − 1 = 3²'),
  q('math.alg.logarithmic-equations', HIGH, 'mcq', A, 'Solve log₂ x + log₂(x − 3) = 2.', 'x = 4', ['x = 4 or x = −1', 'x = −1', 'x = 7/2'], 'x(x − 3) = 4; reject −1, where the log is undefined'),

  q('math.alg.natural-logarithm', HIGH, 'mcq', D, 'What is ln(e⁵)?', '5', ['e⁵', '5e', '1'], 'ln and e^x undo each other'),
  q('math.alg.natural-logarithm', HIGH, 'mcq', A, 'Solve e^(2x) = 7.', 'x = (ln 7)/2', ['x = ln 7 − 2', 'x = 7/2', 'x = 2 ln 7'], 'take ln of both sides'),

  q('math.alg.negative-exponent', MIDDLE, 'mcq', D, 'What is 5⁻²?', '1/25', ['−25', '−10', '25'], 'a negative exponent means a reciprocal'),
  q('math.alg.negative-exponent', MIDDLE, 'mcq', A, 'What is (2/3)⁻²?', '9/4', ['4/9', '−4/9', '−9/4'], 'flip, then square'),

  q('math.alg.pascals-triangle', HIGH, 'mcq', D, 'Row 6 of Pascal\'s triangle starts 1, 6, 15, … What is the next entry?', '20', ['21', '16', '30'], 'the entry C(6, 3)'),
  q('math.alg.pascals-triangle', HIGH, 'mcq', A, 'What is the sum of all entries in row 7 of Pascal\'s triangle?', '128', ['49', '64', '14'], 'row n sums to 2ⁿ'),

  q('math.alg.polynomial-division', HIGH, 'mcq', D, 'Divide x² + 5x + 6 by x + 2.', 'x + 3', ['x + 2', 'x + 3 remainder 1', 'x − 3'], 'x² + 5x + 6 = (x + 2)(x + 3)'),
  q('math.alg.polynomial-division', HIGH, 'mcq', A, 'What is the remainder when x³ − 2x + 1 is divided by x − 2?', '5', ['1', '−3', '0'], 'p(2) = 8 − 4 + 1'),

  q('math.alg.polynomial-inequality', HIGH, 'mcq', D, 'Solve (x − 1)(x − 4) < 0.', '1 < x < 4', ['x < 1 or x > 4', 'x < 4', 'x > 1'], 'the product is negative between the roots'),
  q('math.alg.polynomial-inequality', HIGH, 'mcq', A, 'Solve x² − 9 ≥ 0.', 'x ≤ −3 or x ≥ 3', ['−3 ≤ x ≤ 3', 'x ≥ 3', 'x ≥ ±3'], 'the parabola is above the axis outside its roots'),

  q('math.alg.polynomial-operations', HIGH, 'mcq', D, 'Expand (2x + 3)(x − 4).', '2x² − 5x − 12', ['2x² − 12', '2x² + 11x − 12', '2x² − 5x + 12'], 'four partial products'),
  q('math.alg.polynomial-operations', HIGH, 'mcq', A, 'Expand (x − 3)².', 'x² − 6x + 9', ['x² + 9', 'x² − 9', 'x² − 3x + 9'], 'the cross term 2 × x × (−3)'),

  q('math.alg.polynomial-roots', HIGH, 'mcq', D, 'What are the roots of x(x − 5)(x + 2) = 0?', '0, 5 and −2', ['5 and −2', '0, −5 and 2', '−5 and 2'], 'each factor gives a root; x itself gives 0'),
  q('math.alg.polynomial-roots', HIGH, 'mcq', A, 'Which polynomial has a double root at x = 1?', '(x − 1)²(x + 3)', ['(x − 1)(x + 1)', '(x + 1)²(x − 3)', '(x − 1)(x − 2)'], 'multiplicity two'),

  q('math.alg.polynomial', HIGH, 'mcq', D, 'Which of these is a polynomial?', '4x³ − x + 2', ['x² + 1/x', '√x + 3', '2^x'], 'whole-number powers of x only'),
  q('math.alg.polynomial', HIGH, 'mcq', A, 'What is the leading coefficient of 3 − 2x + 5x⁴ − x²?', '5', ['3', '−1', '4'], 'the coefficient of the highest power'),

  q('math.alg.quadratic-equation', HIGH, 'misconception_probe', F, 'Solve x² − 5x + 6 = 0.', 'x = 2 or x = 3', ['x = −2 or x = −3', 'x = 6', 'x = 1 or x = 6'], '(x − 2)(x − 3) = 0'),
  q('math.alg.quadratic-equation', HIGH, 'misconception_probe', D, 'Solve x² = 4x.', 'x = 0 or x = 4', ['x = 4', 'x = 2', 'x = ±2'], 'factor x(x − 4); dividing by x loses x = 0'),

  q('math.alg.quadratic-formula', HIGH, 'mcq', D, 'Use the quadratic formula on x² + 2x − 2 = 0.', 'x = −1 ± √3', ['x = 1 ± √3', 'x = −1 ± √12', 'x = −2 ± √3'], '(−2 ± √12)/2'),
  q('math.alg.quadratic-formula', HIGH, 'mcq', A, 'Use the quadratic formula on 2x² − 3x − 2 = 0.', 'x = 2 or x = −1/2', ['x = −2 or x = 1/2', 'x = 2 or x = −2', 'x = 1 or x = −1'], '(3 ± 5)/4'),

  q('math.alg.radical-equations', HIGH, 'mcq', D, 'Solve √(x + 3) = 4.', 'x = 13', ['x = 1', 'x = 19', 'x = 7'], 'square both sides: x + 3 = 16'),
  q('math.alg.radical-equations', HIGH, 'mcq', A, 'Solve √(x + 6) = x.', 'x = 3', ['x = 3 or x = −2', 'x = −2', 'x = 6'], 'squaring gives 3 and −2; −2 fails the original'),

  q('math.alg.radicals', HIGH, 'mcq', D, 'Simplify √50 + √18.', '8√2', ['√68', '2√17', '5√2 + 3'], '5√2 + 3√2'),
  q('math.alg.radicals', HIGH, 'mcq', A, 'Simplify (√3 + 1)(√3 − 1).', '2', ['4', '3 − 1√3', '√3'], 'difference of squares: 3 − 1'),

  q('math.alg.rational-equations', HIGH, 'mcq', D, 'Solve 3/x = 6/(x + 2).', 'x = 2', ['x = −2', 'x = 1', 'No solution'], '3(x + 2) = 6x'),
  q('math.alg.rational-equations', HIGH, 'mcq', A, 'Solve 1/(x − 1) + 1 = x/(x − 1).', 'Every x except 1', ['No solution', 'x = 1', 'x = 0'], 'the left side simplifies to x/(x − 1): an identity wherever the denominator is non-zero'),

  q('math.alg.rational-expressions-addition', HIGH, 'mcq', D, 'Simplify 2/x + 3/x.', '5/x', ['5/(2x)', '6/x²', '5/x²'], 'same denominator: add numerators'),
  q('math.alg.rational-expressions-addition', HIGH, 'mcq', A, 'Simplify 1/(x − 1) − 1/(x + 1).', '2/(x² − 1)', ['0', '−2/(x² − 1)', '2x/(x² − 1)'], '(x + 1 − x + 1)/((x − 1)(x + 1))'),

  q('math.alg.rational-expressions-multiplication', HIGH, 'mcq', D, 'Simplify (x/3) × (6/x²).', '2/x', ['6x/3x²', '2x', '2/x²'], 'cancel 3 and one x'),
  q('math.alg.rational-expressions-multiplication', HIGH, 'mcq', A, 'Simplify (x² − 9)/(2x) ÷ (x + 3)/(4x²).', '2x(x − 3)', ['(x − 3)/(8x³)', '2(x − 3)', '(x + 3)/2x'], 'multiply by the reciprocal, then cancel'),

  q('math.alg.rational-expressions', HIGH, 'mcq', D, 'Simplify (x² − 4)/(x + 2).', 'x − 2, for x ≠ −2', ['x + 2', 'x − 2, for all x', 'x² − 2'], 'cancel the common factor; keep the restriction'),
  q('math.alg.rational-expressions', HIGH, 'mcq', A, 'For which x is (x + 1)/(x² − 5x + 6) undefined?', 'x = 2 and x = 3', ['x = −1', 'x = −2 and x = −3', 'x = 6'], 'the denominator (x − 2)(x − 3) is zero'),

  q('math.alg.rational-inequality', HIGH, 'mcq', D, 'Solve (x + 1)/(x − 3) < 0.', '−1 < x < 3', ['x < −1 or x > 3', '−1 ≤ x < 3', 'x < 3'], 'numerator and denominator have opposite signs'),
  q('math.alg.rational-inequality', HIGH, 'mcq', A, 'Solve x/(x − 2) ≥ 0.', 'x ≤ 0 or x > 2', ['x ≥ 0', '0 ≤ x < 2', 'x ≤ 0 or x ≥ 2'], 'include the zero of the numerator, never the zero of the denominator'),

  q('math.alg.rational-root-theorem', HIGH, 'mcq', D, 'Which number is a possible rational root of 2x³ − 5x + 3?', '3/2', ['2/3', '5', '−5/2'], '±(factors of 3)/(factors of 2)'),
  q('math.alg.rational-root-theorem', HIGH, 'mcq', A, 'Which value is actually a root of 2x³ − x² − 2x + 1?', '1/2', ['−1/2', '2', '−2'], '2(1/8) − 1/4 − 1 + 1 = 0'),

  q('math.alg.rationalizing-denominators', HIGH, 'mcq', D, 'Rationalize 6/√3.', '2√3', ['6√3', '√3/6', '2'], 'multiply top and bottom by √3'),
  q('math.alg.rationalizing-denominators', HIGH, 'mcq', A, 'Rationalize 4/(√5 − 1).', '√5 + 1', ['4(√5 − 1)/4', '4/(√5 + 1)', '(√5 + 1)/4'], 'multiply by the conjugate: 4(√5 + 1)/4'),

  q('math.alg.remainder-theorem', HIGH, 'mcq', D, 'What is the remainder when x³ − x + 3 is divided by x + 2?', '−3', ['9', '−9', '3'], 'p(−2) = −8 + 2 + 3'),
  q('math.alg.remainder-theorem', HIGH, 'mcq', A, 'p(x) leaves remainder 5 when divided by x − 1. What is p(1)?', '5', ['1', '0', '−5'], 'the remainder equals p(1)'),

  q('math.alg.simplification', MIDDLE, 'mcq', D, 'Simplify 2(3x − 1) − 4(x + 2).', '2x − 10', ['2x + 6', '10x − 10', '2x − 6'], 'expand both, then collect'),
  q('math.alg.simplification', MIDDLE, 'mcq', A, 'Simplify 5 − 3(2 − x).', '3x − 1', ['4 − 2x', '3x + 11', '−3x − 1'], 'the −3 multiplies both terms in the bracket'),

  q('math.alg.simplifying-radicals', HIGH, 'mcq', D, 'Simplify √98.', '7√2', ['2√7', '49√2', '9.9'], '98 = 49 × 2'),
  q('math.alg.simplifying-radicals', HIGH, 'mcq', A, 'Simplify √(48x²) for x ≥ 0.', '4x√3', ['16x√3', '4√(3x²)', '2x√12'], '48 = 16 × 3'),

  q('math.alg.solution-set', MIDDLE, 'mcq', D, 'What is the solution set of 2x + 4 = 2(x + 2)?', 'All real numbers', ['∅', '{0}', '{2}'], 'an identity'),
  q('math.alg.solution-set', MIDDLE, 'mcq', A, 'What is the solution set of x² + 1 = 0 over the real numbers?', '∅', ['{1, −1}', '{0}', 'All real numbers'], 'x² is never −1 for real x'),

  q('math.alg.substitution-method', HIGH, 'mcq', D, 'Solve y = 2x and x + y = 9.', 'x = 3, y = 6', ['x = 6, y = 3', 'x = 4.5, y = 4.5', 'x = 2, y = 7'], 'substitute: 3x = 9'),
  q('math.alg.substitution-method', HIGH, 'mcq', A, 'Solve y = x − 1 and 2x + 3y = 12.', 'x = 3, y = 2', ['x = 2, y = 1', 'x = 2.4, y = 1.4', 'x = 4, y = 3'], '2x + 3(x − 1) = 12'),

  q('math.alg.system-3var', HIGH, 'mcq', D, 'Solve x + y + z = 6, y + z = 5, z = 3.', 'x = 1, y = 2, z = 3', ['x = 3, y = 2, z = 1', 'x = 2, y = 1, z = 3', 'x = 1, y = 3, z = 2'], 'back-substitute from the last equation'),
  q('math.alg.system-3var', HIGH, 'mcq', A, 'Solve x + y = 3, y + z = 5, x + z = 4.', 'x = 1, y = 2, z = 3', ['x = 2, y = 1, z = 4', 'x = 3, y = 0, z = 5', 'x = 1, y = 3, z = 2'], 'adding all three gives x + y + z = 6'),

  q('math.alg.system-linear-equations', HIGH, 'mcq', D, 'How many solutions do y = 3x + 1 and y = 3x − 2 have together?', 'None', ['One', 'Two', 'Infinitely many'], 'parallel lines'),
  q('math.alg.system-linear-equations', HIGH, 'mcq', A, 'For which k do 2x + y = 4 and 4x + 2y = k have infinitely many solutions?', 'k = 8', ['k = 4', 'k = 2', 'No value of k'], 'the second must be twice the first'),

  q('math.alg.term', MIDDLE, 'mcq', D, 'How many terms does 5x − 3y + 2 − x have before simplifying?', '4', ['3', '2', '1'], 'terms are separated by + and −'),
  q('math.alg.term', MIDDLE, 'mcq', A, 'After collecting like terms, how many terms does 4a + 3b − a + 2 − 3b have?', '2', ['5', '3', '4'], '3a + 2'),

  q('math.alg.vietas-formulas', HIGH, 'mcq', D, 'For 3x² − 12x + 5 = 0, what is the product of the roots?', '5/3', ['4', '−5/3', '12'], 'c/a'),
  q('math.alg.vietas-formulas', HIGH, 'mcq', A, 'The roots of x² − 7x + 10 = 0 are r and s. What is r² + s²?', '29', ['49', '20', '39'], '(r + s)² − 2rs = 49 − 20'),

  q('math.alg.zero-exponent', MIDDLE, 'mcq', D, 'What is (−5)⁰?', '1', ['−1', '0', '−5'], 'any non-zero base to the 0 is 1'),
  q('math.alg.zero-exponent', MIDDLE, 'mcq', A, 'What is 3x⁰ for x ≠ 0?', '3', ['1', '0', '3x'], 'only x is raised to the 0'),
]

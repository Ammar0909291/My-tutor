/**
 * MATHEMATICS — probe DEPTH, batch 17: math.real (30 (concept, band) pairs, 60 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every answer was checked by hand, e.g. 1/333 > 0.003 so N = 334, the
 * maximum of x³ − 3x on [0, 2] is f(2) = 2 (f(1) = −2 is the minimum),
 * |x² − 4| ≤ 5|x − 2| once |x − 2| ≤ 1, x⁵ − x − 1 is −1 at 1 and 29 at 2,
 * U(f, P) = ¼ + ½ = ¾ for f(x) = x on {0, ½, 1}, and e^0.1 · 0.01/2 < 0.006.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand: UG, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_REAL_ANALYSIS_PROBES: SeedProbe[] = [
  q('math.real.absolute-convergence', D, 'Which series converges absolutely?', 'Σ(−1)ⁿ/n²', ['Σ(−1)ⁿ/n', 'Σ(−1)ⁿ/√n', 'Σ(−1)ⁿ'], 'Σ1/n² converges'),
  q('math.real.absolute-convergence', A, 'Σaₙ converges conditionally. By Riemann\'s rearrangement theorem, what can a rearrangement do?', 'Sum to any real number, or diverge', ['Only sum to the original value', 'Only sum to 0', 'Only diverge to ±∞'], 'the positive and negative parts each diverge'),

  q('math.real.archimedean', D, 'By the Archimedean property, which n is the first with 1/n < 0.003?', '334', ['300', '3', '333'], '1/333 is just above 0.003'),
  q('math.real.archimedean', A, 'Which ordered field is NOT Archimedean?', 'Rational functions ℝ(x), ordered so x exceeds every real number', ['ℚ', 'ℝ', 'ℚ(√2)'], 'no natural number exceeds x there'),

  q('math.real.baire-category', D, 'Which set is nowhere dense in ℝ?', 'The Cantor set', ['ℚ', '(0, 1)', 'The irrationals'], 'its closure has empty interior'),
  q('math.real.baire-category', A, 'Can ℝ be written as a countable union of nowhere dense closed sets?', 'No, since ℝ is complete', ['Yes, as a union of single points', 'Yes, trivially', 'Only if each set is bounded'], 'Baire: ℝ is uncountable and not meagre'),

  q('math.real.cauchy-sequence', D, 'Which sequence of rationals is Cauchy but has no limit in ℚ?', '1, 1.4, 1.41, 1.414, … (decimals of √2)', ['1/n', '(−1)ⁿ', 'n'], 'its limit √2 is not rational'),
  q('math.real.cauchy-sequence', A, '|aₙ₊₁ − aₙ| ≤ 2⁻ⁿ for every n. Is (aₙ) Cauchy?', 'Yes, since |aₘ − aₙ| ≤ 2⁻ⁿ + 2⁻⁽ⁿ⁺¹⁾ + ⋯ ≤ 2¹⁻ⁿ', ['No, consecutive closeness never suffices', 'It cannot be decided', 'Only if the sequence is bounded'], 'a geometric tail bounds every later gap'),

  q('math.real.compactness', D, 'Which subset of ℝ is compact?', '[0, 1]', ['(0, 1)', '[0, ∞)', 'ℚ ∩ [0, 1]'], 'closed and bounded'),
  q('math.real.compactness', A, 'Which subset of ℝ² is compact?', 'The closed unit disc', ['The open unit disc', 'The x-axis', 'The hyperbola xy = 1'], 'Heine–Borel in ℝ²'),

  q('math.real.completeness-metric', D, 'Which metric space is complete?', 'ℝ with d(x, y) = |x − y|', ['ℚ with d(x, y) = |x − y|', '(0, 1) with d(x, y) = |x − y|', 'ℝ \\ {0} with d(x, y) = |x − y|'], 'every Cauchy sequence has a limit inside'),
  q('math.real.completeness-metric', A, 'What is the completion of ℚ under d(x, y) = |x − y|?', 'ℝ', ['ℚ', 'ℂ', 'ℤ'], 'add the limits of all Cauchy sequences'),

  q('math.real.completeness', D, 'In ℝ, what is sup {x ∈ ℚ : x² < 2}?', '√2', ['2', '1.414', 'It has none'], 'the least upper bound exists in ℝ'),
  q('math.real.completeness', A, 'What is sup {1 − 1/n : n ≥ 1}?', '1', ['0', '1 − 1/n', 'It has none'], 'never reached, but no smaller bound works'),

  q('math.real.connectedness', D, 'Which subset of ℝ is connected?', '[0, 2)', ['[0, 1] ∪ [2, 3]', 'ℚ', '{0, 1}'], 'the connected subsets of ℝ are intervals'),
  q('math.real.connectedness', A, 'f is continuous on [0, 1]. What must f([0, 1]) be?', 'A closed bounded interval, possibly a single point', ['Any set', 'An open interval', 'A finite set'], 'connected and compact images'),

  q('math.real.continuity-rigorous', D, 'For f(x) = 3x at any point a, which δ works for a given ε?', 'δ = ε/3', ['δ = 3ε', 'δ = ε', 'δ = ε²'], '|3x − 3a| = 3|x − a| < ε'),
  q('math.real.continuity-rigorous', A, 'For f(x) = x² at a = 2, which δ works for a given ε?', 'δ = min(1, ε/5)', ['δ = ε/4', 'δ = ε/2', 'δ = √ε'], '|x − 2| < 1 gives |x + 2| < 5'),

  q('math.real.convergence-sequences', D, 'For aₙ = 1/n and ε = 0.01, which N makes |aₙ| < ε for every n > N?', 'N = 100', ['N = 10', 'N = 0.01', 'N = 99'], 'n = 100 gives exactly 0.01, which is not less than ε'),
  q('math.real.convergence-sequences', A, 'By Bolzano–Weierstrass, what must every bounded sequence in ℝ have?', 'A convergent subsequence', ['A limit', 'A monotone tail', 'A largest term'], 'bounded does not mean convergent'),

  q('math.real.differentiability-rigorous', D, 'Is f(x) = x|x| differentiable at 0?', 'Yes, with f′(0) = 0', ['No, because |x| is not', 'No, it has a corner at 0', 'Only from the right'], '(h|h|)/h = |h| → 0'),
  q('math.real.differentiability-rigorous', A, 'f(x) = x² sin(1/x) for x ≠ 0 and f(0) = 0. What is f′(0)?', '0', ['It does not exist', '1', 'sin 1'], '|h sin(1/h)| ≤ |h| → 0'),

  q('math.real.extreme-value-theorem', D, 'Which function must attain a maximum on its domain?', 'x² on [−1, 2]', ['1/x on (0, 1]', 'x on (0, 1)', 'tan x on (−π/2, π/2)'], 'continuous on a closed bounded interval'),
  q('math.real.extreme-value-theorem', A, 'What is the maximum of f(x) = x³ − 3x on [0, 2]?', '2', ['−2', '0', '8'], 'compare f(0) = 0, f(1) = −2 and f(2) = 2'),

  q('math.real.fixed-point-theorem', D, 'Which map is a contraction on ℝ?', 'f(x) = x/2 + 1', ['f(x) = x + 1', 'f(x) = 2x', 'f(x) = x²'], 'Lipschitz constant 1/2 < 1'),
  q('math.real.fixed-point-theorem', A, 'Iterating x ↦ x/2 + 1 from any starting point converges to what?', '2', ['1', '0', '∞'], 'the unique fixed point solves x = x/2 + 1'),

  q('math.real.ftc-rigorous', D, 'F(x) = ∫₀ˣ t² dt. What is F′(x)?', 'x²', ['x³/3', '2x', '0'], 'FTC part 1'),
  q('math.real.ftc-rigorous', A, 'F(x) = ∫₀^(x²) cos t dt. What is F′(x)?', '2x cos(x²)', ['cos(x²)', 'sin(x²)', '2x sin(x²)'], 'FTC part 1 with the chain rule'),

  q('math.real.implicit-function-theorem', D, 'On x² + y² = 1, what is dy/dx at (0.6, 0.8)?', '−0.75', ['0.75', '−4/3', '0'], '−x/y'),
  q('math.real.implicit-function-theorem', A, 'Near which point of x² + y² = 1 is y NOT a function of x?', '(1, 0)', ['(0, 1)', '(0.6, 0.8)', '(0, −1)'], '∂F/∂y = 2y vanishes there'),

  q('math.real.inverse-function-theorem', D, 'f(x) = x³ + x and f(1) = 2. What is (f⁻¹)′(2)?', '1/4', ['4', '1/2', '12'], '1/f′(1)'),
  q('math.real.inverse-function-theorem', A, 'f(x, y) = (x + y, x − y). What is the determinant of its Jacobian?', '−2', ['0', '2', '1'], 'det [[1, 1], [1, −1]]; nonzero, so locally invertible'),

  q('math.real.ivt', D, 'f is continuous on [1, 2] with f(1) = −3 and f(2) = 5. What does the IVT guarantee?', 'Some c in (1, 2) with f(c) = 0', ['f(1.5) = 1', 'f is increasing', 'f has its maximum at 2'], '0 lies between −3 and 5'),
  q('math.real.ivt', A, 'Why must x⁵ − x − 1 have a root in (1, 2)?', 'It is continuous with f(1) = −1 < 0 < 29 = f(2)', ['Because f(1) = 0', 'Because f is increasing', 'Because every polynomial has a root in (1, 2)'], 'a sign change plus continuity'),

  q('math.real.lipschitz-continuity', D, 'What is the smallest Lipschitz constant of f(x) = 3x − 7?', '3', ['7', '1', '−7'], '|f(x) − f(y)| = 3|x − y|'),
  q('math.real.lipschitz-continuity', A, 'What is the smallest Lipschitz constant of sin x on ℝ?', '1', ['π', '0', '2'], 'sup |cos x| = 1'),

  q('math.real.metric-space', D, 'In the discrete metric, what is d(x, y) when x ≠ y?', '1', ['0', '|x − y|', '∞'], 'by definition'),
  q('math.real.metric-space', A, 'Which function is a metric on ℝ?', 'd(x, y) = |x − y|/(1 + |x − y|)', ['d(x, y) = (x − y)²', 'd(x, y) = |x² − y²|', 'd(x, y) = x − y'], '(x − y)² breaks the triangle inequality'),

  q('math.real.mvt', D, 'For f(x) = x² on [1, 3], which c does the mean value theorem give?', '2', ['1', '3', '4'], '2c = (9 − 1)/2'),
  q('math.real.mvt', A, '|f′(x)| ≤ 2 on [0, 5] and f(0) = 1. What is the largest possible value of f(5)?', '11', ['10', '3', '7'], 'f(5) ≤ f(0) + 2 · 5'),

  q('math.real.open-sets', D, 'Which subset of ℝ is open?', '(0, 1) ∪ (2, 3)', ['[0, 1)', '{0}', '[0, 1]'], 'every point has a neighbourhood inside'),
  q('math.real.open-sets', A, 'What is the closure of (0, 1) ∪ {2}?', '[0, 1] ∪ {2}', ['[0, 2]', '(0, 1)', '[0, 1]'], 'add the limit points 0 and 1; 2 stays'),

  q('math.real.pointwise-convergence', D, 'What is the pointwise limit of fₙ(x) = xⁿ on [0, 1]?', '0 for x < 1 and 1 at x = 1', ['0 everywhere', '1 everywhere', 'x'], 'evaluate the limit at each fixed x'),
  q('math.real.pointwise-convergence', A, 'What is the pointwise limit of fₙ(x) = x/n on ℝ?', '0', ['x', '1', 'It does not exist'], 'x is fixed while n grows'),

  q('math.real.riemann-integrability', D, 'Which function is Riemann integrable on [0, 1]?', 'f = 1 on [0, 1/2] and 0 elsewhere', ['The Dirichlet function', 'f(x) = 1/x for x > 0, f(0) = 0', 'f = 1 on the rationals and x elsewhere'], 'bounded with one discontinuity'),
  q('math.real.riemann-integrability', A, 'Thomae\'s function is discontinuous at every rational in [0, 1]. Is it Riemann integrable there?', 'Yes, its discontinuities form a null set, and the integral is 0', ['No, it has infinitely many discontinuities', 'Yes, with integral 1/2', 'No, it is unbounded'], 'the Lebesgue criterion'),

  q('math.real.riemann-integral', D, 'For f(x) = x on [0, 1] with partition {0, 1/2, 1}, what is the upper sum U(f, P)?', '3/4', ['1/4', '1/2', '1'], '½ · ½ + ½ · 1'),
  q('math.real.riemann-integral', A, 'For f(x) = x on [0, 1] with n equal pieces, what is U − L?', '1/n', ['1/n²', '0', '1/2'], 'each piece contributes (1/n)²; n of them'),

  q('math.real.series-rigorous', D, 'What does the Cauchy criterion for Σaₙ require?', 'For each ε > 0, an N with |aₙ₊₁ + ⋯ + aₘ| < ε for all m > n ≥ N', ['|aₙ| < ε for all n ≥ N', '|aₙ₊₁ − aₙ| < ε for all n ≥ N', 'Bounded partial sums'], 'the partial sums form a Cauchy sequence'),
  q('math.real.series-rigorous', A, 'Does Σ 1/(n ln n), from n = 2, converge?', 'No, it diverges', ['Yes, because its terms tend to 0', 'Yes, because it shrinks faster than 1/n', 'Yes, to 1'], '∫ dx/(x ln x) = ln ln x → ∞'),

  q('math.real.sup-inf', D, 'What is inf {1/n : n ≥ 1}?', '0', ['1', '1/n', 'It has none'], 'never reached, but no larger lower bound works'),
  q('math.real.sup-inf', A, 'S = {x : x² < 9}. What are sup S and inf S?', '3 and −3', ['9 and −9', '3 and 0', 'They do not exist'], 'S is the interval (−3, 3)'),

  q('math.real.taylor-rigorous', D, 'What is the degree-2 Taylor polynomial of eˣ at 0?', '1 + x + x²/2', ['1 + x + x²', '1 + x', 'x + x²/2'], 'f⁽ᵏ⁾(0)/k! = 1/k!'),
  q('math.real.taylor-rigorous', A, 'Using Lagrange\'s remainder, how large can the error of e^0.1 ≈ 1 + 0.1 be?', 'Less than 0.006', ['Exactly 0.005', 'At most 0.1', 'At most 0.0005'], 'e^c · (0.1)²/2 with c < 0.1'),

  q('math.real.uniform-continuity', D, 'Which function is uniformly continuous on (0, 1)?', 'x²', ['1/x', 'sin(1/x)', '1/x²'], 'it extends continuously to [0, 1]'),
  q('math.real.uniform-continuity', A, 'Is f(x) = x² uniformly continuous on ℝ?', 'No, since f(x + δ) − f(x) = 2xδ + δ² grows with x', ['Yes, it is continuous everywhere', 'Yes, it is differentiable', 'Yes, on every interval'], 'no single δ works for large x'),

  q('math.real.uniform-convergence', D, 'Does fₙ(x) = x/n converge uniformly on [0, 1]?', 'Yes, since sup |fₙ| = 1/n → 0', ['No, only pointwise', 'No, it does not converge', 'Only at x = 0'], 'the sup norm of the error tends to 0'),
  q('math.real.uniform-convergence', A, 'Does fₙ(x) = xⁿ converge uniformly on [0, 1/2]?', 'Yes, since sup |fₙ| = (1/2)ⁿ → 0', ['No, the limit is discontinuous', 'No, only pointwise', 'Only on the whole of [0, 1]'], 'away from 1 the convergence is uniform'),

  q('math.real.weierstrass-approximation', D, 'What does the Weierstrass approximation theorem say about a continuous f on [a, b]?', 'For every ε > 0 some polynomial p has |f(x) − p(x)| < ε on all of [a, b]', ['f is a polynomial', 'The Taylor series of f converges to f', 'Some polynomial equals f at finitely many points only'], 'uniform approximation'),
  q('math.real.weierstrass-approximation', A, 'Which family is dense in C([0, 1]) under the sup norm?', 'All polynomials', ['The constant functions', 'The polynomials of degree at most 3', 'The linear functions'], 'any finite degree bound leaves a gap'),
]

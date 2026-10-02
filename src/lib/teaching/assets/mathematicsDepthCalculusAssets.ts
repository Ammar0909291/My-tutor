/**
 * MATHEMATICS — probe DEPTH, batch 6: math.calc (76 (concept, band) pairs, 152 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every derivative, integral and limit below was worked by hand, e.g.
 * ∫₀² (3x² − 2x) dx = 4, d/dx[e^(x²)] = 2x e^(x²), lim (sin 3x)/x = 3,
 * ∫ x e^x dx = (x − 1)e^x + C, the arc length of y = (2/3)x^(3/2) on [0, 3]
 * = 14/3, and the Jacobian of polar coordinates r.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand: UG, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

const M = 'mcq' as const
const X = 'misconception_probe' as const

export const MATHEMATICS_DEPTH_CALCULUS_PROBES: SeedProbe[] = [
  q('math.calc.antiderivatives', X, F, 'What is ∫ 3 dx?', '3x + C', ['3 + C', '0', 'x³ + C'], 'the antiderivative of a constant'),
  q('math.calc.antiderivatives', X, D, 'What is ∫ (4x³ − 2x) dx?', 'x⁴ − x² + C', ['12x² − 2 + C', 'x⁴ − x²', '4x⁴ − 2x² + C'], 'power rule in reverse, term by term, with + C'),

  q('math.calc.arc-length', M, D, 'What integral gives the length of y = x² from x = 0 to x = 1?', '∫₀¹ √(1 + 4x²) dx', ['∫₀¹ √(1 + 2x) dx', '∫₀¹ 2x dx', '∫₀¹ (1 + 4x²) dx'], 'square the derivative inside the root'),
  q('math.calc.arc-length', M, A, 'What is the length of y = (2/3)x^(3/2) from x = 0 to x = 3?', '14/3', ['2√3', '3', '7'], '√(1 + x) integrates to (2/3)(1 + x)^(3/2): (2/3)(8 − 1)'),

  q('math.calc.chain-rule-multivariable', M, D, 'z = x + y² with x = t² and y = 3t. What is dz/dt?', '2t + 18t', ['2t', '18t', '2t + 6t'], 'dz/dt = z_x·x′ + z_y·y′ = 1·2t + 2y·3'),
  q('math.calc.chain-rule-multivariable', M, A, 'z = xy with x = s + t and y = s − t. What is ∂z/∂s?', '2s', ['2t', 's + t', '0'], 'y·1 + x·1 = (s − t) + (s + t)'),

  q('math.calc.chain-rule', X, F, 'What is d/dx[(x² + 1)³]?', '6x(x² + 1)²', ['3(x² + 1)²', '3(2x)²', '6x³'], 'outer derivative times inner derivative'),
  q('math.calc.chain-rule', X, D, 'What is d/dx[e^(x²)]?', '2x e^(x²)', ['e^(x²)', 'x² e^(x² − 1)', '2e^(x²)'], 'the inner function x² contributes 2x'),

  q('math.calc.change-of-variables', M, D, 'In polar coordinates, dA = dx dy becomes what?', 'r dr dθ', ['dr dθ', 'r² dr dθ', 'dθ dr / r'], 'the Jacobian of (r cos θ, r sin θ) is r'),
  q('math.calc.change-of-variables', M, A, 'For x = 2u and y = 3v, what is |∂(x, y)/∂(u, v)|?', '6', ['5', '1', '2/3'], 'the determinant of [[2, 0], [0, 3]]'),

  q('math.calc.concavity', M, D, 'On which interval is f(x) = x³ − 3x concave up?', 'x > 0', ['x < 0', 'All x', '−1 < x < 1'], "f″(x) = 6x"),
  q('math.calc.concavity', M, A, 'Where is the inflection point of f(x) = x³ − 6x²?', 'x = 2', ['x = 0', 'x = 4', 'x = 6'], 'f″ = 6x − 12 changes sign at 2'),

  q('math.calc.continuity-types', M, D, 'What kind of discontinuity does 1/(x − 3) have at x = 3?', 'Infinite', ['Removable', 'Jump', 'None'], 'the function blows up'),
  q('math.calc.continuity-types', M, A, 'What kind of discontinuity does floor(x) have at x = 2?', 'Jump', ['Removable', 'Infinite', 'Oscillating'], 'one-sided limits 1 and 2 differ'),

  q('math.calc.continuity', M, D, 'For which value of k is f(x) = kx + 1 (x < 2), x² (x ≥ 2) continuous at 2?', 'k = 3/2', ['k = 2', 'k = 4', 'k = 1/2'], '2k + 1 = 4'),
  q('math.calc.continuity', M, A, 'Which function is continuous at x = 0?', 'f(x) = x sin(1/x) for x ≠ 0, f(0) = 0', ['f(x) = sin(1/x) for x ≠ 0, f(0) = 0', 'f(x) = 1/x for x ≠ 0, f(0) = 0', 'f(x) = |x|/x for x ≠ 0, f(0) = 0'], 'the squeeze |x sin(1/x)| ≤ |x|'),

  q('math.calc.critical-points', M, D, 'What are the critical points of f(x) = x³ − 12x?', 'x = −2 and x = 2', ['x = 0', 'x = ±√12', 'x = 12'], "f′ = 3x² − 12 = 0"),
  q('math.calc.critical-points', M, A, 'What are the critical points of f(x) = x^(2/3)?', 'x = 0 only', ['None', 'x = 0 and x = 1', 'Every x'], "f′ = (2/3)x^(−1/3) is never 0 but is undefined at 0"),

  q('math.calc.curl-divergence', M, D, 'What is the divergence of F = (x², yz, z)?', '2x + z + 1', ['2x + y + 1', '(2x, z, 1)', '0'], '∂P/∂x + ∂Q/∂y + ∂R/∂z'),
  q('math.calc.curl-divergence', M, A, 'What is the curl of F = (−y, x, 0)?', '(0, 0, 2)', ['(0, 0, 0)', '(0, 0, −2)', '2'], 'curl is a vector: ∂Q/∂x − ∂P/∂y = 2 in the k-component'),

  q('math.calc.curve-sketching', M, D, 'What is the horizontal asymptote of f(x) = (2x² + 1)/(x² − 4)?', 'y = 2', ['y = 0', 'x = ±2', 'y = −1/4'], 'equal degrees: ratio of leading coefficients'),
  q('math.calc.curve-sketching', M, A, 'f(x) = x/(x² + 1). Where is f increasing?', '−1 < x < 1', ['x > 0', 'x < −1 or x > 1', 'All x'], "f′ = (1 − x²)/(x² + 1)²"),

  q('math.calc.definite-integral', M, D, 'What is ∫₀² (3x² − 2x) dx?', '4', ['8', '12', '0'], '[x³ − x²] from 0 to 2'),
  q('math.calc.definite-integral', M, A, 'If ∫₀⁵ f(x) dx = 7 and ∫₀² f(x) dx = 3, what is ∫₂⁵ f(x) dx?', '4', ['10', '−4', '21'], 'additivity over adjacent intervals'),

  q('math.calc.derivative-definition', M, D, 'Which limit is the definition of f′(x)?', 'lim_{h→0} [f(x + h) − f(x)]/h', ['lim_{h→0} [f(x + h) − f(x)]', 'lim_{h→0} f(x + h)/h', '[f(x + 1) − f(x)]/1'], 'the difference quotient as h → 0'),
  q('math.calc.derivative-definition', M, A, 'Using the definition, what is f′(3) for f(x) = 2x²?', '12', ['18', '6', '4'], '[2(3 + h)² − 18]/h = 12 + 2h → 12'),

  q('math.calc.derivative-exponential', M, D, 'What is d/dx[2^x]?', '2^x ln 2', ['x·2^(x−1)', '2^x', '2^x / ln 2'], 'a base other than e brings ln of the base'),
  q('math.calc.derivative-exponential', M, A, 'What is d/dx[x e^x]?', '(x + 1)e^x', ['e^x', 'x e^x', 'e^x + x'], 'product rule'),

  q('math.calc.derivative-intro', X, F, 'What does f′(a) represent on the graph of f?', 'The slope of the tangent line at x = a', ['The height of the graph at x = a', 'The area under the graph up to a', 'The average slope from 0 to a'], 'derivative as slope'),
  q('math.calc.derivative-intro', X, P, 'A car\'s position is s(t) = t² metres. What is its speed at t = 3 s?', '6 m/s', ['9 m/s', '3 m/s', '1 m/s'], 'instantaneous rate s′(3) = 2·3'),

  q('math.calc.derivative-inverse-trig', M, D, 'What is d/dx[arctan x]?', '1/(1 + x²)', ['−1/(1 + x²)', '1/√(1 − x²)', 'sec² x'], 'standard result'),
  q('math.calc.derivative-inverse-trig', M, A, 'What is d/dx[arctan(3x)]?', '3/(1 + 9x²)', ['1/(1 + 9x²)', '3/(1 + 3x²)', '1/(1 + 3x²)'], 'chain rule: square the whole 3x and multiply by 3'),

  q('math.calc.derivative-ln', M, D, 'What is d/dx[ln(5x)]?', '1/x', ['5/x', '1/(5x)', '5'], 'ln 5x = ln 5 + ln x'),
  q('math.calc.derivative-ln', M, A, 'What is d/dx[ln(x² + 4)]?', '2x/(x² + 4)', ['1/(x² + 4)', '2x', '1/(2x)'], 'chain rule: the inner derivative 2x'),

  q('math.calc.derivative-rules', M, D, 'What is d/dx[5x⁴ − 3x + 7]?', '20x³ − 3', ['20x³ − 3x', '5x³ − 3', '20x³ + 4'], 'power rule term by term; constants vanish'),
  q('math.calc.derivative-rules', M, A, 'What is d/dx[√x + 1/x]?', '1/(2√x) − 1/x²', ['1/(2√x) + 1/x²', '2√x − 1/x²', '1/√x − 1/x'], 'x^(1/2) and x^(−1)'),

  q('math.calc.derivative-trig', M, D, 'What is d/dx[sin x · cos x]?', 'cos² x − sin² x', ['−sin x cos x', 'cos x − sin x', '1'], 'product rule; equals cos 2x'),
  q('math.calc.derivative-trig', M, A, 'What is d/dx[sec x]?', 'sec x tan x', ['tan² x', '−sec x tan x', 'sec² x'], 'derivative of 1/cos x'),

  q('math.calc.differentiability', M, D, 'Which function is continuous but not differentiable at x = 0?', 'f(x) = |x|', ['f(x) = x²', 'f(x) = 1/x', 'f(x) = x³'], 'a corner'),
  q('math.calc.differentiability', M, A, 'Is f(x) = x^(1/3) differentiable at x = 0?', 'No, it has a vertical tangent there', ['Yes, because it is continuous', 'Yes, its derivative is 0', 'No, it is not continuous'], 'f′(x) = (1/3)x^(−2/3) blows up'),

  q('math.calc.directional-derivative', M, D, 'For f(x, y) = x² + y² at (1, 2), what is the directional derivative toward u = (1, 0)?', '2', ['4', '6', '√20'], '∇f = (2, 4), dotted with (1, 0)'),
  q('math.calc.directional-derivative', M, A, 'At a point ∇f = (3, 4). In which direction is the directional derivative zero?', 'Along (4, −3)/5', ['Along (3, 4)/5', 'Along (−3, −4)/5', 'In no direction'], 'perpendicular to the gradient'),

  q('math.calc.divergence-theorem', M, D, 'For F = (x, y, z) over the unit ball, what is the outward flux through the sphere?', '4π', ['3', '4π/3', '12π'], '∭ 3 dV = 3 × (4π/3)'),
  q('math.calc.divergence-theorem', M, A, 'The divergence theorem equates the flux through a closed surface with what?', 'The integral of div F over the enclosed solid', ['The line integral around the boundary', 'The integral of curl F over the surface', 'Zero'], 'Gauss: ∯ F·n dS = ∭ ∇·F dV'),

  q('math.calc.double-integrals', M, D, 'What is ∫₀¹ ∫₀² xy dy dx?', '1', ['2', '1/2', '4'], '∫₀¹ 2x dx'),
  q('math.calc.double-integrals', M, A, 'What is the area of the disk r ≤ 2 using ∫₀^{2π} ∫₀² r dr dθ?', '4π', ['2π', '8π', '4'], 'remember the r in dA'),

  q('math.calc.fourier-series-intro', M, D, 'For an odd function on [−π, π], which Fourier coefficients vanish?', 'All the cosine coefficients aₙ (and a₀)', ['All the sine coefficients bₙ', 'None', 'All of them'], 'an odd function has a sine series'),
  q('math.calc.fourier-series-intro', M, A, 'What is ∫₋π^π sin(2x) sin(3x) dx?', '0', ['π', '2π', '1'], 'orthogonality of different frequencies'),

  q('math.calc.ftc-part1', M, D, 'What is d/dx ∫₁ˣ e^(t²) dt?', 'e^(x²)', ['e^(x²) − e', '2x e^(x²)', 'e^(t²)'], 'FTC1 at the upper limit x'),
  q('math.calc.ftc-part1', M, A, 'What is d/dx ∫ₓ⁵ cos t dt?', '−cos x', ['cos x', 'sin 5 − sin x', '−sin x'], 'the variable is the LOWER limit, so the sign flips'),

  q('math.calc.ftc-part2', M, D, 'What is ∫₁² (1/x) dx?', 'ln 2', ['1/2', '−1/2', 'ln 1'], 'F(x) = ln x'),
  q('math.calc.ftc-part2', M, A, 'What is ∫₀^π sin x dx?', '2', ['0', '−2', '1'], '−cos π + cos 0'),

  q('math.calc.gradient', M, D, 'What is ∇f for f(x, y) = x²y + 3y?', '(2xy, x² + 3)', ['(2x, 3)', '(2xy, x²)', '2xy + x² + 3'], 'the vector of partial derivatives'),
  q('math.calc.gradient', M, A, 'How does ∇f at a point relate to the level curve through that point?', 'It is perpendicular to the level curve', ['It is tangent to the level curve', 'It is parallel to the x-axis', 'It has no relation'], 'f does not change along a level curve'),

  q('math.calc.greens-theorem', M, D, "Green's theorem turns ∮ (P dx + Q dy) into which double integral?", '∬ (∂Q/∂x − ∂P/∂y) dA', ['∬ (∂P/∂x − ∂Q/∂y) dA', '∬ (∂P/∂x + ∂Q/∂y) dA', '∬ (P + Q) dA'], 'circulation form'),
  q('math.calc.greens-theorem', M, A, 'Using Green\'s theorem with P = −y/2, Q = x/2, what does ∮ (P dx + Q dy) around a region give?', 'Its area', ['Its perimeter', 'Zero', 'Twice its area'], '∂Q/∂x − ∂P/∂y = 1'),

  q('math.calc.higher-order-derivatives', M, D, 'What is f″(x) for f(x) = sin(2x)?', '−4 sin(2x)', ['−2 sin(2x)', '4 cos(2x)', '−sin(2x)'], 'each derivative brings a factor 2'),
  q('math.calc.higher-order-derivatives', M, A, 'What is the 10th derivative of e^(−x)?', 'e^(−x)', ['−e^(−x)', '10e^(−x)', '0'], 'the sign alternates; an even order is positive'),

  q('math.calc.hyperbolic-derivatives', M, D, 'What is d/dx[sinh x]?', 'cosh x', ['−cosh x', 'sinh x', '−sinh x'], 'no sign change, unlike sin'),
  q('math.calc.hyperbolic-derivatives', M, A, 'What is d/dx[tanh x]?', 'sech² x', ['−sech² x', 'cosh² x', '1 + tanh² x'], 'quotient of sinh and cosh; cosh² − sinh² = 1'),

  q('math.calc.implicit-differentiation', M, D, 'For x² + y² = 25, what is dy/dx?', '−x/y', ['x/y', '−y/x', '2x + 2y'], 'differentiate y² as 2y·y′'),
  q('math.calc.implicit-differentiation', M, A, 'For xy = 6, what is dy/dx at (2, 3)?', '−3/2', ['−2/3', '3/2', '6'], 'y + xy′ = 0'),

  q('math.calc.improper-integrals', M, D, 'What is ∫₁^∞ (1/x²) dx?', '1', ['∞', '0', '2'], '[−1/x] from 1 to ∞'),
  q('math.calc.improper-integrals', M, A, 'For which p does ∫₁^∞ (1/x^p) dx converge?', 'p > 1', ['p ≥ 1', 'p < 1', 'Every p'], 'the p-test; p = 1 gives ln, which diverges'),

  q('math.calc.increasing-decreasing', M, D, 'Where is f(x) = x² − 6x decreasing?', 'x < 3', ['x > 3', 'x < 0', 'Everywhere'], 'f′ = 2x − 6 < 0'),
  q('math.calc.increasing-decreasing', M, A, 'Where is f(x) = xe^(−x) increasing?', 'x < 1', ['x > 1', 'x > 0', 'Everywhere'], 'f′ = (1 − x)e^(−x)'),

  q('math.calc.integral-area', M, D, 'What is the area between y = x and y = x² from x = 0 to x = 1?', '1/6', ['1/2', '1/3', '5/6'], '∫₀¹ (x − x²) dx'),
  q('math.calc.integral-area', M, A, 'What is the total area between y = x³ and the x-axis for −1 ≤ x ≤ 1?', '1/2', ['0', '1/4', '2'], 'the signed integral is 0; add the two halves of 1/4'),

  q('math.calc.integration-by-parts', M, D, 'What is ∫ x e^x dx?', '(x − 1)e^x + C', ['x e^x + C', '(x + 1)e^x + C', 'x²e^x/2 + C'], 'u = x, dv = e^x dx'),
  q('math.calc.integration-by-parts', M, A, 'What is ∫ ln x dx?', 'x ln x − x + C', ['1/x + C', 'x ln x + C', '(ln x)²/2 + C'], 'u = ln x, dv = dx'),

  q('math.calc.ivt', M, D, 'f is continuous with f(0) = −2 and f(4) = 6. Which value must f take on (0, 4)?', '3', ['7', '−3', '10'], 'every value strictly between −2 and 6'),
  q('math.calc.ivt', M, A, 'Does cos x = x have a solution in [0, 1]?', 'Yes: g(x) = cos x − x is continuous, g(0) = 1 > 0 and g(1) < 0', ['No, cos x is never equal to x', 'Only if the graphs are drawn', 'IVT does not apply to trig functions'], 'apply IVT to the difference'),

  q('math.calc.lhopitals-rule', M, D, 'What is lim_{x→0} (e^x − 1)/x?', '1', ['0', 'e', '∞'], "0/0, so L'Hôpital: e^x/1"),
  q('math.calc.lhopitals-rule', M, A, 'What is lim_{x→∞} x²/e^x?', '0', ['∞', '1', '2'], "apply L'Hôpital twice: 2/e^x"),

  q('math.calc.limit-laws', M, D, 'lim f = 4 and lim g = −2 as x → a. What is lim [3f − g²]?', '8', ['16', '14', '4'], '12 − 4'),
  q('math.calc.limit-laws', M, A, 'lim_{x→2} f(x) = 5. What is lim_{x→2} √(f(x) + 4)?', '3', ['√5 + 2', '9', '√9 + 4'], 'the root law applies when the inner limit is positive'),

  q('math.calc.limits-at-infinity', M, D, 'What is lim_{x→∞} (4x − 1)/(2x + 3)?', '2', ['4', '−1/3', '∞'], 'leading coefficients of equal degrees'),
  q('math.calc.limits-at-infinity', M, A, 'What is lim_{x→∞} (√(x² + x) − x)?', '1/2', ['0', '1', '∞'], 'multiply by the conjugate: x/(√(x² + x) + x)'),

  q('math.calc.limits', X, F, 'What is lim_{x→3} (2x + 1)?', '7', ['6', '3', 'It does not exist'], 'a polynomial: substitute'),
  q('math.calc.limits', X, D, 'What is lim_{x→0} (sin 3x)/x?', '3', ['0', '1', '1/3'], 'rewrite as 3·(sin 3x)/(3x)'),

  q('math.calc.line-integrals', M, D, 'For F = (y, x) along any path from (0, 0) to (1, 2), what is ∫ F · dr?', '2', ['1', '3', 'It depends on the path'], 'F = ∇(xy), so the integral is 1·2 − 0'),
  q('math.calc.line-integrals', M, A, 'For F = (−y, x) around the unit circle anticlockwise, what is ∮ F · dr?', '2π', ['0', 'π', '−2π'], 'r(t) = (cos t, sin t): integrand sin² t + cos² t'),

  q('math.calc.linearization', M, D, 'What is the linearization of f(x) = √x at a = 9?', 'L(x) = 3 + (x − 9)/6', ['L(x) = 3 + (x − 9)/3', 'L(x) = 9 + (x − 3)/6', 'L(x) = 3 + 6(x − 9)'], "f′(9) = 1/(2·3)"),
  q('math.calc.linearization', M, A, 'Using the linearization of √x at 9, estimate √9.3.', '3.05', ['3.1', '3.3', '3.01'], '3 + 0.3/6'),

  q('math.calc.local-extrema', M, D, 'What is the local maximum point of f(x) = −x² + 4x?', 'x = 2', ['x = 4', 'x = 0', 'x = −2'], "f′ = −2x + 4 = 0, and f″ < 0"),
  q('math.calc.local-extrema', M, A, 'For f(x) = x³ − 3x, which point is a local minimum?', 'x = 1', ['x = −1', 'x = 0', 'x = 3'], "f″(1) = 6 > 0"),

  q('math.calc.logarithmic-differentiation', M, D, 'What is d/dx[x^x]?', 'x^x (ln x + 1)', ['x · x^(x−1)', 'x^x ln x', 'x^x'], 'take ln: ln y = x ln x'),
  q('math.calc.logarithmic-differentiation', M, A, 'For y = (x + 1)²(x − 1)³, what is y′/y?', '2/(x + 1) + 3/(x − 1)', ['6/((x + 1)(x − 1))', '2(x + 1) + 3(x − 1)', '5/x'], 'ln y = 2 ln(x + 1) + 3 ln(x − 1)'),

  q('math.calc.maclaurin-series', M, D, 'What are the first three non-zero terms of the Maclaurin series of e^x?', '1 + x + x²/2', ['1 + x + x²', 'x + x²/2 + x³/6', '1 + x + 2x²'], 'xⁿ/n!'),
  q('math.calc.maclaurin-series', M, A, 'What is the Maclaurin series of cos x up to x⁴?', '1 − x²/2 + x⁴/24', ['1 − x² + x⁴', 'x − x³/6', '1 + x²/2 + x⁴/24'], 'even powers, alternating signs'),

  q('math.calc.mean-value-theorem', M, D, 'For f(x) = x² on [0, 4], what value of c does the MVT give?', 'c = 2', ['c = 4', 'c = 1', 'c = 16'], 'f′(c) = 2c = (16 − 0)/4'),
  q('math.calc.mean-value-theorem', M, A, 'A car travels 120 km in 1.5 hours. What does the MVT guarantee?', 'At some instant its speed was exactly 80 km/h', ['Its speed was always 80 km/h', 'Its maximum speed was 80 km/h', 'Nothing about its speed'], 'average rate equals some instantaneous rate'),

  q('math.calc.multiple-integrals', M, D, 'What is ∫₀¹ ∫₀ˣ 2 dy dx?', '1', ['2', '1/2', 'x'], 'the inner integral gives 2x'),
  q('math.calc.multiple-integrals', M, A, 'Reverse the order of ∫₀¹ ∫₀ˣ f(x, y) dy dx.', '∫₀¹ ∫ᵧ¹ f(x, y) dx dy', ['∫₀¹ ∫₀ʸ f(x, y) dx dy', '∫₀ˣ ∫₀¹ f(x, y) dx dy', '∫₀¹ ∫₀¹ f(x, y) dx dy'], 'the triangle 0 ≤ y ≤ x ≤ 1'),

  q('math.calc.multivariable-extrema', M, D, 'Classify the critical point (0, 0) of f(x, y) = x² + y².', 'Local minimum', ['Local maximum', 'Saddle point', 'Cannot be classified'], 'D = 4 > 0 and f_xx > 0'),
  q('math.calc.multivariable-extrema', M, A, 'Classify the critical point (0, 0) of f(x, y) = xy.', 'Saddle point', ['Local minimum', 'Local maximum', 'Not a critical point'], 'D = 0·0 − 1² < 0'),

  q('math.calc.multivariable-intro', M, D, 'What is f(2, −1) for f(x, y) = x²y + 3?', '−1', ['7', '5', '−4'], '4·(−1) + 3'),
  q('math.calc.multivariable-intro', M, A, 'Along y = x, what does xy/(x² + y²) approach as (x, y) → (0, 0)?', '1/2', ['0', '1', 'It does not approach anything'], 'x²/(2x²); since paths along the axes give 0, the limit does not exist'),

  q('math.calc.one-sided-limits', M, D, 'What is lim_{x→0⁺} |x|/x?', '1', ['−1', '0', 'It does not exist'], 'for x > 0, |x| = x'),
  q('math.calc.one-sided-limits', M, A, 'What is lim_{x→2⁻} 1/(x − 2)?', '−∞', ['+∞', '0', '1/2'], 'x − 2 is a small negative number'),

  q('math.calc.optimization', M, D, 'A rectangle has perimeter 20. What is its largest possible area?', '25', ['20', '100', '24'], 'a 5 × 5 square'),
  q('math.calc.optimization', M, A, 'What is the maximum of f(x) = x³ − 3x on [0, 2]?', '2', ['−2', '0', '8'], 'compare f(0) = 0, f(1) = −2, f(2) = 2'),

  q('math.calc.parametric-calculus', M, D, 'For x = t², y = t³, what is dy/dx?', '3t/2', ['3t²', '2t', '2/(3t)'], '(dy/dt)/(dx/dt) = 3t²/2t'),
  q('math.calc.parametric-calculus', M, A, 'For x = cos t, y = sin t, what is dy/dx at t = π/4?', '−1', ['1', '0', 'Undefined'], 'cos t / (−sin t)'),

  q('math.calc.parametric-curves', M, D, 'Eliminate t from x = t + 1, y = 2t.', 'y = 2x − 2', ['y = 2x + 2', 'y = x/2', 'y = 2x − 1'], 't = x − 1'),
  q('math.calc.parametric-curves', M, A, 'What curve does x = 3cos t, y = 2sin t trace?', 'An ellipse with semi-axes 3 and 2', ['A circle of radius 3', 'A circle of radius 2', 'A line segment'], 'x²/9 + y²/4 = 1'),

  q('math.calc.partial-derivatives', M, D, 'What is ∂f/∂y for f(x, y) = x³y² + sin x?', '2x³y', ['3x²y²', '2x³y + cos x', 'x³y²'], 'treat x as a constant'),
  q('math.calc.partial-derivatives', M, A, 'What is f_xy for f(x, y) = x²y³?', '6xy²', ['2xy³', '3x²y²', '6x²y'], 'differentiate in x, then in y'),

  q('math.calc.partial-fractions', M, D, 'Decompose 1/((x − 1)(x + 1)).', '(1/2)/(x − 1) − (1/2)/(x + 1)', ['1/(x − 1) + 1/(x + 1)', '1/(x − 1) − 1/(x + 1)', '(1/2)/(x − 1) + (1/2)/(x + 1)'], 'cover-up: A = 1/2, B = −1/2'),
  q('math.calc.partial-fractions', M, A, 'What form does the decomposition of 1/(x²(x + 1)) take?', 'A/x + B/x² + C/(x + 1)', ['A/x² + C/(x + 1)', 'A/x + C/(x + 1)', '(Ax + B)/x² + C'], 'a repeated factor needs every power'),

  q('math.calc.power-series', M, D, 'What is the interval of convergence of Σ xⁿ/2ⁿ?', '(−2, 2)', ['[−2, 2]', '(−1, 1)', 'All real x'], 'a geometric series in x/2; both endpoints diverge'),
  q('math.calc.power-series', M, A, 'Differentiating Σ xⁿ = 1/(1 − x) term by term gives which series?', 'Σ n xⁿ⁻¹ = 1/(1 − x)²', ['Σ xⁿ⁻¹ = 1/(1 − x)', 'Σ n xⁿ = 1/(1 − x)', 'Σ xⁿ/n = ln(1 − x)'], 'inside the radius of convergence'),

  q('math.calc.product-rule', M, D, 'What is d/dx[x² e^x]?', '(x² + 2x)e^x', ['2x e^x', 'x² e^x', '2x + e^x'], "f′g + fg′"),
  q('math.calc.product-rule', M, A, 'What is d/dx[x ln x]?', 'ln x + 1', ['1/x', 'ln x', 'x/x'], '1·ln x + x·(1/x)'),

  q('math.calc.quotient-rule', M, D, 'What is d/dx[x/(x + 1)]?', '1/(x + 1)²', ['−1/(x + 1)²', '1', 'x/(x + 1)²'], '((x + 1) − x)/(x + 1)²'),
  q('math.calc.quotient-rule', M, A, 'What is d/dx[(x² + 1)/x]?', '(x² − 1)/x²', ['2x', '(x² + 1)/x²', '(1 − x²)/x²'], '(2x·x − (x² + 1))/x²'),

  q('math.calc.radius-of-convergence', M, D, 'What is the radius of convergence of Σ (3x)ⁿ?', '1/3', ['3', '1', '∞'], '|3x| < 1'),
  q('math.calc.radius-of-convergence', M, A, 'What is the radius of convergence of Σ n! xⁿ?', '0', ['1', '∞', 'e'], 'the ratio (n + 1)|x| → ∞ for any x ≠ 0'),

  q('math.calc.reduction-formulas', M, D, 'What is ∫ sin² x dx?', 'x/2 − sin(2x)/4 + C', ['sin³ x/3 + C', '−cos² x + C', 'x/2 + sin(2x)/4 + C'], 'the base step of the sine reduction'),
  q('math.calc.reduction-formulas', M, A, 'With Iₙ = ∫₀^(π/2) sinⁿ x dx = ((n − 1)/n) Iₙ₋₂, what is I₄?', '3π/16', ['π/4', '3π/8', 'π/16'], 'I₄ = (3/4)(1/2)(π/2)'),

  q('math.calc.related-rates', M, D, 'A circle\'s radius grows at 2 cm/s. How fast is its area growing when r = 5 cm?', '20π cm²/s', ['10π cm²/s', '4π cm²/s', '50π cm²/s'], 'dA/dt = 2πr dr/dt'),
  q('math.calc.related-rates', M, A, 'A 10 m ladder slides; its foot moves away at 1 m/s. How fast does the top fall when the foot is 6 m out?', '0.75 m/s', ['1 m/s', '1.33 m/s', '0.6 m/s'], 'x x′ + y y′ = 0 with y = 8'),

  q('math.calc.riemann-sums', M, D, 'What is the left Riemann sum of f(x) = x on [0, 2] with 2 equal subintervals?', '1', ['2', '3', '0'], 'f(0)·1 + f(1)·1'),
  q('math.calc.riemann-sums', M, A, 'For an increasing function, how do left and right Riemann sums compare with the integral?', 'Left underestimates, right overestimates', ['Left overestimates, right underestimates', 'Both are exact', 'Both overestimate'], 'heights from the lower and the higher end'),

  q('math.calc.rolles-theorem', M, D, 'For f(x) = x² − 4x on [0, 4], where does Rolle\'s theorem place c?', 'c = 2', ['c = 0', 'c = 4', 'c = 1'], 'f(0) = f(4) = 0, f′(c) = 2c − 4 = 0'),
  q('math.calc.rolles-theorem', M, A, 'Why does Rolle\'s theorem not apply to f(x) = 1/x² on [−1, 1]?', 'f is not continuous on [−1, 1]', ['f(−1) ≠ f(1)', 'f is a polynomial', 'It does apply'], 'f is undefined at 0'),

  q('math.calc.sequence-limits', M, D, 'What is lim (3n + 2)/(n − 1)?', '3', ['−2', '∞', '1'], 'divide by n'),
  q('math.calc.sequence-limits', M, A, 'What is lim (1 + 1/n)ⁿ?', 'e', ['1', '∞', '2'], 'the definition of e'),

  q('math.calc.squeeze-theorem', M, D, 'What is lim_{x→∞} sin(x)/x?', '0', ['1', 'It does not exist', '∞'], '−1/x ≤ sin x / x ≤ 1/x'),
  q('math.calc.squeeze-theorem', M, A, 'What is lim_{x→0} x² cos(1/x)?', '0', ['1', 'It does not exist', 'cos 0'], '−x² ≤ x² cos(1/x) ≤ x²'),

  q('math.calc.stokes-theorem', M, D, "Stokes' theorem equates ∮ F · dr around a curve with what?", 'The flux of curl F through a surface bounded by the curve', ['The flux of F through the surface', 'The divergence of F inside', 'Zero always'], '∮ F·dr = ∬ (∇×F)·dS'),
  q('math.calc.stokes-theorem', M, A, 'If curl F = 0 everywhere in space, what is ∮ F · dr around any closed curve?', '0', ['2π', 'The enclosed area', 'It depends on the curve'], "Stokes' theorem with zero integrand"),

  q('math.calc.surface-area-integral', M, D, 'Rotating y = 1 for 0 ≤ x ≤ 5 about the x-axis gives a cylinder. What is its curved surface area?', '10π', ['5π', '25π', '2π'], '2π∫₀⁵ 1·√(1 + 0) dx'),
  q('math.calc.surface-area-integral', M, A, 'Which integral gives the area of the surface made by rotating y = x³, 0 ≤ x ≤ 1, about the x-axis?', '2π ∫₀¹ x³ √(1 + 9x⁴) dx', ['2π ∫₀¹ x³ dx', '2π ∫₀¹ x³ √(1 + 3x²) dx', 'π ∫₀¹ x⁶ dx'], 'square the derivative 3x²'),

  q('math.calc.surface-integrals', M, D, 'What is the surface area of the plane z = 2x + 2y over the unit square?', '3', ['1', '√3', '9'], '√(1 + 2² + 2²) = 3'),
  q('math.calc.surface-integrals', M, A, 'Reversing a surface\'s orientation does what to the flux of F through it?', 'Changes its sign', ['Leaves it unchanged', 'Makes it zero', 'Doubles it'], 'the normal reverses'),

  q('math.calc.taylor-remainder', M, D, 'Approximating e^x by 1 + x near 0, what is the leading term of the error?', 'x²/2', ['x', 'x³/6', 'e^x'], 'the first omitted term'),
  q('math.calc.taylor-remainder', M, A, 'Approximating sin(0.1) by 0.1, what does the Lagrange bound say about the error?', 'At most (0.1)³/6', ['At most 0.1', 'Exactly zero', 'At most (0.1)²/2'], 'the x² term of sin is 0, so the next term is x³/3!'),

  q('math.calc.taylor-series', M, D, 'What is the coefficient of (x − 1)² in the Taylor series of f(x) = ln x about a = 1?', '−1/2', ['1/2', '−1', '1'], "f″(1)/2! = −1/2"),
  q('math.calc.taylor-series', M, A, 'What is the Taylor series of 1/x about a = 1?', 'Σ (−1)ⁿ (x − 1)ⁿ', ['Σ (x − 1)ⁿ', 'Σ (−1)ⁿ xⁿ', 'Σ n(x − 1)ⁿ'], '1/(1 + (x − 1)) is geometric'),

  q('math.calc.trig-integrals', M, D, 'What is ∫ sin³ x cos x dx?', 'sin⁴ x/4 + C', ['cos⁴ x/4 + C', '−sin⁴ x/4 + C', 'sin² x/2 + C'], 'u = sin x'),
  q('math.calc.trig-integrals', M, A, 'What is ∫ tan x dx?', '−ln|cos x| + C', ['sec² x + C', 'ln|cos x| + C', 'tan² x/2 + C'], 'tan x = sin x / cos x, u = cos x'),

  q('math.calc.trig-substitution', M, P, 'Which substitution suits ∫ √(4 − x²) dx?', 'x = 2 sin θ', ['x = 2 tan θ', 'x = 2 sec θ', 'x = 4 sin θ'], 'a² − x² pairs with sine'),
  q('math.calc.trig-substitution', M, A, 'With x = 3 tan θ, what does √(9 + x²) become?', '3 sec θ', ['3 tan θ', '3 cos θ', '9 sec θ'], '9 + 9 tan² θ = 9 sec² θ'),

  q('math.calc.triple-integrals', M, D, 'What is ∫₀¹ ∫₀¹ ∫₀¹ 6xyz dz dy dx?', '3/4', ['6', '1/8', '1'], '6 × (1/2)³'),
  q('math.calc.triple-integrals', M, A, 'In spherical coordinates, what replaces dV?', 'ρ² sin φ dρ dφ dθ', ['ρ dρ dφ dθ', 'ρ² dρ dφ dθ', 'r dr dθ dz'], 'the spherical Jacobian'),

  q('math.calc.u-substitution', M, D, 'What is ∫ 2x cos(x²) dx?', 'sin(x²) + C', ['cos(x²) + C', '2 sin(x²) + C', 'x² sin(x²) + C'], 'u = x²'),
  q('math.calc.u-substitution', M, A, 'What is ∫₀¹ x(x² + 1)³ dx?', '15/8', ['1', '15/4', '2'], 'u = x² + 1 from 1 to 2: (1/2)(16 − 1)/4'),

  q('math.calc.vector-fields', M, D, 'Is F = (2x, 2y) conservative?', 'Yes, F = ∇(x² + y²)', ['No, because it points outward', 'Only on the unit circle', 'No, its components differ'], 'find a potential'),
  q('math.calc.vector-fields', M, A, 'For F = (P, Q) on the whole plane, which test shows F is conservative?', '∂P/∂y = ∂Q/∂x everywhere', ['P = Q', '∂P/∂x = ∂Q/∂y', 'P and Q are continuous'], 'the cross-partials agree on a simply connected domain'),

  q('math.calc.volume-revolution', M, D, 'What is the volume when y = x, 0 ≤ x ≤ 3, is rotated about the x-axis?', '9π', ['3π', '27π', '9π/2'], 'π∫₀³ x² dx'),
  q('math.calc.volume-revolution', M, A, 'Using shells, what is the volume when y = x², 0 ≤ x ≤ 1, is rotated about the y-axis?', 'π/2', ['π/4', 'π', 'π/5'], '2π∫₀¹ x·x² dx'),
]

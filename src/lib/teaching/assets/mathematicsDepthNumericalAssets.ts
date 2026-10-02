/**
 * MATHEMATICS — probe DEPTH, batch 21: math.num (16 (concept, band) pairs, 32 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every value was worked by hand, e.g. the Cholesky factor of [[9, 3], [3, 5]]
 * is [[3, 0], [1, 2]], one Newton step for x² − 2 from 1 gives 1.5, the
 * trapezoid gives 4 and Simpson 8/3 (exact) for ∫₀² x² dx, 2⁻¹⁰ < 10⁻³,
 * explicit Euler on y′ = −10y needs |1 − 10h| ≤ 1, and κ = 100/0.01 = 10⁴.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, gradeBand: GradeBand, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_NUMERICAL_PROBES: SeedProbe[] = [
  q('math.num.cholesky', UG, D, 'What is the Cholesky factor L of [[9, 3], [3, 5]]?', '[[3, 0], [1, 2]]', ['[[9, 0], [3, 5]]', '[[3, 0], [3, 2]]', '[[3, 0], [1, √5]]'], 'L₁₁ = 3, L₂₁ = 3/3, L₂₂ = √(5 − 1)'),
  q('math.num.cholesky', UG, A, 'Roughly how does the cost of Cholesky compare with LU for an n × n SPD matrix?', 'About half', ['The same', 'About twice', 'n² against n³'], 'n³/3 against 2n³/3 flops'),

  q('math.num.error-analysis', UG, D, 'The true value is 2.0 and the computed value is 2.1. What is the relative error?', '0.05', ['0.1', '0.048', '5'], '|2.1 − 2.0|/2.0'),
  q('math.num.error-analysis', UG, A, 'A problem has condition number 10⁶ and its inputs carry relative error 10⁻¹⁶. Roughly how large can the output\'s relative error be?', '10⁻¹⁰', ['10⁻¹⁶', '10⁻²²', '10⁶'], 'condition number × input error'),

  q('math.num.euler-method', UG, D, 'What is the global error order of Euler\'s method?', 'O(h)', ['O(h²)', 'O(1)', 'O(h⁴)'], 'local O(h²) errors accumulate over 1/h steps'),
  q('math.num.euler-method', UG, A, 'For y′ = −10y, which step sizes keep explicit Euler stable?', 'h ≤ 0.2', ['Any h', 'h ≤ 2', 'h ≤ 0.02'], 'yₙ₊₁ = (1 − 10h)yₙ needs |1 − 10h| ≤ 1'),

  q('math.num.floating-point', UG, D, 'About what is machine epsilon in IEEE double precision?', '2.2 × 10⁻¹⁶', ['10⁻⁸', '10⁻³²', '0'], '2⁻⁵²'),
  q('math.num.floating-point', UG, A, 'Why is computing 1 − cos x inaccurate for tiny x?', 'Subtracting two nearly equal numbers cancels the significant digits', ['It overflows', 'cos x underflows to 0', 'cos x cannot be computed near 0'], 'use 2 sin²(x/2) instead'),

  q('math.num.interpolation', UG, D, 'How many points determine a unique interpolating polynomial of degree at most 3?', '4', ['3', '5', '6'], 'one per coefficient'),
  q('math.num.interpolation', UG, A, 'What does the linear interpolant through (1, 2) and (3, 8) give at x = 2?', '5', ['4', '6', '10'], 'the midpoint value'),

  q('math.num.iterative-linear', UG, D, 'For which matrices does Jacobi iteration converge from every starting point?', 'Strictly diagonally dominant matrices', ['All symmetric matrices', 'All invertible matrices', 'All upper triangular matrices'], 'a sufficient condition'),
  q('math.num.iterative-linear', UG, A, 'In exact arithmetic, conjugate gradient solves an n × n SPD system in at most how many steps?', 'n', ['1', 'n²', 'log n'], 'it builds n A-orthogonal directions'),

  q('math.num.lu-factorization', UG, D, 'Why is partial pivoting used in Gaussian elimination?', 'To avoid dividing by small pivots that magnify rounding error', ['To make the matrix symmetric', 'To reduce the operation count', 'To compute the determinant'], 'stability'),
  q('math.num.lu-factorization', UG, A, 'What is the cost of LU factorization of an n × n matrix?', 'About 2n³/3 flops', ['About n²', 'About n log n', 'About n⁴'], 'n eliminations of about n² work'),

  q('math.num.newtons-method', UG, D, 'Newton\'s method for x² − 2 = 0 starts at x₀ = 1. What is x₁?', '1.5', ['2', '1.414', '0.5'], '1 − (1 − 2)/(2 · 1)'),
  q('math.num.newtons-method', UG, A, 'At what rate does Newton\'s method converge on f(x) = x², with its double root at 0?', 'Linearly, halving the error each step', ['Quadratically', 'Cubically', 'It does not converge'], 'xₖ₊₁ = xₖ/2'),

  q('math.num.numerical-differentiation', UG, D, 'Which formula is the central difference approximation of f′(x)?', '(f(x + h) − f(x − h))/(2h)', ['(f(x + h) − f(x))/h', '(f(x + h) − f(x − h))/h', '(f(x + h) + f(x − h))/(2h)'], 'symmetric about x'),
  q('math.num.numerical-differentiation', UG, A, 'What is the truncation error order of the central difference formula?', 'O(h²)', ['O(h)', 'O(h⁴)', 'O(1)'], 'the h² terms of the Taylor expansions cancel'),

  q('math.num.numerical-integration', UG, D, 'What does the trapezoid rule with one interval give for ∫₀² x² dx?', '4', ['8/3', '2', '8'], '(2/2)(0 + 4)'),
  q('math.num.numerical-integration', UG, A, 'What does Simpson\'s rule with one parabola give for ∫₀² x² dx?', '8/3', ['4', '3', '2'], '(2/6)(0 + 4 · 1 + 4); exact for quadratics'),

  q('math.num.qr-algorithm', UG, D, 'The QR algorithm sets Aₖ₊₁ = RₖQₖ from Aₖ = QₖRₖ. How is Aₖ₊₁ related to Aₖ?', 'Similar to it, with the same eigenvalues', ['Its inverse', 'Its transpose', 'Unrelated to it'], 'Aₖ₊₁ = Qₖᵀ Aₖ Qₖ'),
  q('math.num.qr-algorithm', UG, A, 'For a symmetric matrix whose eigenvalues have distinct absolute values, what does Aₖ converge to?', 'A diagonal matrix of the eigenvalues', ['The identity', 'The zero matrix', 'An upper triangular matrix of ones'], 'the off-diagonal entries decay'),

  q('math.num.root-finding', UG, D, 'Bisection for x² − 2 on [0, 2]. What is the interval after one step?', '[1, 2]', ['[0, 1]', '[0.5, 1.5]', '[1.5, 2]'], 'f(1) = −1 < 0 < f(2)'),
  q('math.num.root-finding', UG, A, 'How many bisection steps shrink an interval of length 1 below 10⁻³?', '10', ['3', '1000', '100'], '2⁻¹⁰ ≈ 0.00098'),

  q('math.num.runge-kutta', UG, D, 'What is the global error order of the classical RK4 method?', 'O(h⁴)', ['O(h)', 'O(h²)', 'O(h⁵)'], 'fourth order'),
  q('math.num.runge-kutta', UG, A, 'Halving h with RK4 reduces the global error by about what factor?', '16', ['2', '4', '32'], '2⁴'),

  q('math.num.splines', UG, D, 'What second derivative does a natural cubic spline have at both ends?', 'Zero', ['One', 'The slope of the data there', 'It is undefined'], 'the natural end condition'),
  q('math.num.splines', UG, A, 'A cubic spline passes through n + 1 points. How many cubic pieces does it have?', 'n', ['n + 1', '3n', '4n'], 'one between each pair of neighbouring points'),

  q('math.num.stiff-ode', UG, D, 'Which method suits stiff ODEs?', 'Backward (implicit) Euler', ['Explicit Euler', 'Explicit RK4', 'A forward-difference scheme'], 'A-stable for every step size'),
  q('math.num.stiff-ode', UG, A, 'For y′ = −1000y, what limits explicit Euler\'s step size?', 'Stability: h must stay below 0.002', ['Accuracy of the slow components', 'Nothing', 'Roundoff error'], '|1 − 1000h| ≤ 1'),

  q('math.num.svd', UG, D, 'A matrix has singular values 100 and 0.01. What is its 2-norm condition number?', '10⁴', ['100', '0.01', '99.99'], 'σ_max/σ_min'),
  q('math.num.svd', UG, A, 'What does keeping only the k largest singular values of the SVD give?', 'The best rank-k approximation', ['A random rank-k matrix', 'The inverse', 'The eigendecomposition'], 'Eckart–Young'),
]

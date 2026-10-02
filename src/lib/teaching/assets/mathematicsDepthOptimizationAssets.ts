/**
 * MATHEMATICS — probe DEPTH, batch 20: math.opt (16 (concept, band) pairs, 32 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every optimum was worked by hand, e.g. the LP vertices (0, 0), (3, 0),
 * (3, 1), (0, 4) give 0, 9, 11, 8; coins {1, 3, 4} make 6 as 3 + 3 where
 * greedy takes 4 + 1 + 1; minimizing x² with x ≥ 1 gives x* = 1, λ = 2; one
 * Newton step on x² − 4x from 10 lands on 2; and f″(0) = −4 for x⁴ − 2x².
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

export const MATHEMATICS_DEPTH_OPTIMIZATION_PROBES: SeedProbe[] = [
  q('math.opt.convex-function', UG, D, 'Which function is convex on ℝ?', 'eˣ', ['−x²', 'sin x', 'x³'], 'f″ = eˣ > 0'),
  q('math.opt.convex-function', UG, A, 'Is f(x) = x⁴ − 2x² convex on ℝ?', 'No, f″(0) = −4 < 0', ['Yes, it has even degree', 'Yes, x⁴ dominates for large x', 'Yes, it is bounded below'], 'f″(x) = 12x² − 4'),

  q('math.opt.convex-optimization', UG, D, 'Minimize (x − 3)² subject to x ≤ 1. What is the minimizer?', 'x = 1', ['x = 3', 'x = 0', 'x = −1'], 'the unconstrained minimum is infeasible; the boundary is closest'),
  q('math.opt.convex-optimization', UG, A, 'In a convex problem where Slater\'s condition holds, a point satisfies the KKT conditions. What is it?', 'A global minimizer', ['Only a local minimizer', 'A saddle point', 'Possibly neither'], 'KKT is sufficient for convex problems'),

  q('math.opt.convex-set', UG, D, 'Which set is convex?', 'The closed unit disc', ['An annulus', 'Two disjoint discs', 'The unit circle'], 'every segment between two points stays inside'),
  q('math.opt.convex-set', UG, A, 'Which operation always preserves convexity?', 'Intersection', ['Union', 'Complement', 'Set difference'], 'a segment in both sets lies in their intersection'),

  q('math.opt.duality', UG, D, 'For a minimization problem, how does the dual optimal value d* relate to the primal optimal value p*?', 'd* ≤ p*', ['d* ≥ p*', 'Always d* = p*', 'They are unrelated'], 'weak duality'),
  q('math.opt.duality', UG, A, 'Primal: minimize cᵀx subject to Ax ≥ b, x ≥ 0. What is the dual?', 'Maximize bᵀy subject to Aᵀy ≤ c, y ≥ 0', ['Minimize bᵀy subject to Aᵀy ≥ c, y ≥ 0', 'Maximize cᵀy subject to Ay ≤ b', 'Maximize bᵀy subject to Aᵀy ≥ c, y ≥ 0'], 'the symmetric form of LP duality'),

  q('math.opt.dynamic-programming', UG, D, 'With memoization, how many distinct subproblems does computing the Fibonacci number F(n) need?', 'About n', ['About 2ⁿ', 'About n²', 'About log n'], 'each F(k) is solved once'),
  q('math.opt.dynamic-programming', UG, A, 'Coins of value 1, 3 and 4 must make 6. What is the fewest coins?', '2', ['3', '6', '1'], '3 + 3; greedy takes 4 + 1 + 1'),

  q('math.opt.gradient-methods', UG, D, 'Gradient descent on f(x) = x² starts at x₀ = 4 with step size 0.25. What is x₁?', '2', ['6', '3', '0'], 'x₁ = 4 − 0.25 · 8'),
  q('math.opt.gradient-methods', UG, A, 'On f(x) = x², which step size makes gradient descent diverge?', '1.5', ['0.1', '0.5', '0.9'], 'xₖ₊₁ = (1 − 2η)xₖ; |1 − 2η| > 1 when η > 1'),

  q('math.opt.integer-programming', UG, D, 'Maximize x + y with x + y ≤ 2.5 and x, y non-negative integers. What is the optimum?', '2', ['2.5', '3', '0'], 'the LP value 2.5 is not reachable with integers'),
  q('math.opt.integer-programming', UG, A, 'In branch-and-bound, the LP relaxation gives x = 2.6. Which two branches are created?', 'x ≤ 2 and x ≥ 3', ['x ≤ 2.6 and x ≥ 2.6', 'x = 2 and x = 3 only', 'x ≤ 3 and x ≥ 2'], 'cut out the fractional gap'),

  q('math.opt.kkt', UG, D, 'For a constraint g(x) ≤ 0 with multiplier λ, what does complementary slackness require?', 'λ g(x*) = 0', ['λ = g(x*)', 'λ + g(x*) = 0', 'λ < 0'], 'either the constraint is tight or its multiplier is 0'),
  q('math.opt.kkt', UG, A, 'Minimize x² subject to 1 − x ≤ 0. What are x* and λ?', 'x* = 1 and λ = 2', ['x* = 0 and λ = 0', 'x* = 1 and λ = 0', 'x* = 1 and λ = 1'], 'stationarity 2x − λ = 0 at x = 1'),

  q('math.opt.lagrange-multipliers', UG, D, 'Maximize xy subject to x + y = 10. What is the maximum?', '25', ['50', '100', '20'], 'x = y = 5'),
  q('math.opt.lagrange-multipliers', UG, A, 'Minimize x² + y² subject to x + y = 2. What is λ in ∇f = λ∇g?', '2', ['1', '4', '0'], '2x = λ = 2y with x = y = 1'),

  q('math.opt.linear-programming', UG, D, 'Maximize 3x + 2y subject to x + y ≤ 4, x ≤ 3, x ≥ 0, y ≥ 0. What is the optimum?', '11', ['12', '9', '8'], 'the vertex (3, 1)'),
  q('math.opt.linear-programming', UG, A, 'Where does a feasible LP with a bounded feasible region always attain its optimum?', 'At a vertex of the feasible region', ['Only at an interior point', 'At the centroid', 'Nowhere in general'], 'a linear objective is extreme at a corner'),

  q('math.opt.newton-optimization', UG, D, 'One Newton step to minimize f(x) = x² − 4x from x₀ = 10. What is x₁?', '2', ['6', '10', '−2'], 'x₀ − f′/f″ = 10 − 16/2; exact for a quadratic'),
  q('math.opt.newton-optimization', UG, A, 'Newton\'s method converges quadratically and the error is now 10⁻². Roughly what is it after one more step?', '10⁻⁴', ['10⁻³', '5 × 10⁻³', '10⁻²'], 'the error is squared'),

  q('math.opt.pca', UG, D, 'The covariance eigenvalues are 6, 3 and 1. What fraction of the variance does the first principal component explain?', '0.6', ['6', '0.5', '1/3'], '6/(6 + 3 + 1)'),
  q('math.opt.pca', UG, A, 'How are the first two principal component directions related?', 'They are orthogonal', ['They are parallel', 'They carry equal variance', 'They are the first two original features'], 'eigenvectors of a symmetric matrix'),

  q('math.opt.quadratic-programming', UG, D, 'When is the QP "minimize ½xᵀQx + cᵀx" convex?', 'When Q is positive semidefinite', ['When Q has positive entries', 'When Q is invertible', 'Always'], 'the Hessian is Q'),
  q('math.opt.quadratic-programming', UG, A, 'Minimize x² − 2x subject to x ≤ 0. What is the minimizer?', 'x = 0', ['x = 1', 'x = −1', 'There is none'], 'the unconstrained minimum x = 1 is infeasible'),

  q('math.opt.semidefinite-programming', UG, D, 'What constraint does an SDP place on its matrix variable X?', 'X ⪰ 0, positive semidefinite', ['X ≥ 0 entry by entry', 'X invertible', 'X diagonal'], 'a linear objective over the PSD cone'),
  q('math.opt.semidefinite-programming', UG, A, 'Which matrix is positive semidefinite?', '[[1, 1], [1, 1]]', ['[[1, 2], [2, 1]]', '[[0, 1], [1, 0]]', '[[−1, 0], [0, 1]]'], 'eigenvalues 2 and 0'),

  q('math.opt.stochastic-gradient', UG, D, 'What gradient does each SGD step use?', 'The gradient on one random example or mini-batch', ['The full-dataset gradient', 'The Hessian', 'No gradient at all'], 'a cheap, noisy estimate'),
  q('math.opt.stochastic-gradient', UG, A, 'Why is the SGD step size often decreased over time?', 'To damp the noise so the iterates settle near the minimum', ['To speed up each step', 'To escape the minimum', 'Because Newton\'s method requires it'], 'a constant step keeps bouncing'),

  q('math.opt.unconstrained-optimization', UG, D, 'What is the stationary point of f(x, y) = x² + y² − 2x?', '(1, 0)', ['(0, 0)', '(2, 0)', '(1, 1)'], '∇f = (2x − 2, 2y) = 0'),
  q('math.opt.unconstrained-optimization', UG, A, 'What kind of stationary point does f(x, y) = x² − y² have at the origin?', 'A saddle point', ['A minimum', 'A maximum', 'It is not stationary'], 'the Hessian has eigenvalues 2 and −2'),
]

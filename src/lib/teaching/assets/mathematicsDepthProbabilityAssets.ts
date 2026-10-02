/**
 * MATHEMATICS — probe DEPTH, batch 11: math.prob (49 (concept, band) pairs, 98 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every probability was worked by hand, e.g. the 1%-prevalence test gives
 * 0.009/(0.009 + 0.099) = 1/12, two aces 4/52 · 3/51 = 1/221, the two-step
 * return probability of [[0.7, 0.3], [0.4, 0.6]] is 0.49 + 0.12 = 0.61, the
 * stationary law of [[0.9, 0.1], [0.2, 0.8]] is (2/3, 1/3), P(A ∪ B) for
 * independent 0.3 and 0.6 is 0.72, and M(t) = (1 − t)⁻¹ gives E[X²] = 2.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand: HIGH, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

const M = 'mcq' as const
const X = 'misconception_probe' as const

export const MATHEMATICS_DEPTH_PROBABILITY_PROBES: SeedProbe[] = [
  q('math.prob.bayes-theorem', M, D, 'P(A) = 0.3, P(B | A) = 0.5 and P(B) = 0.25. What is P(A | B)?', '0.6', ['0.5', '0.15', '0.3'], 'P(B | A)P(A)/P(B) = 0.15/0.25'),
  q('math.prob.bayes-theorem', M, A, '1% of people have a condition. A test is positive for 90% of those who have it and for 10% of those who do not. Given a positive test, what is the chance of having the condition?', '1/12, about 8%', ['90%', '10%', '1%'], '0.009/(0.009 + 0.099)'),

  q('math.prob.bayesian-inference', M, D, 'Prior P(θ = 1) = P(θ = 2) = 0.5. The data have likelihood 0.2 under θ = 1 and 0.6 under θ = 2. What is the posterior P(θ = 2 | data)?', '0.75', ['0.6', '0.5', '0.3'], '0.3/(0.1 + 0.3)'),
  q('math.prob.bayesian-inference', M, A, 'With a Beta(2, 2) prior and 3 successes in 4 Bernoulli trials, what is the posterior?', 'Beta(5, 3)', ['Beta(3, 4)', 'Beta(5, 5)', 'Beta(3, 1)'], 'add successes to α and failures to β'),

  q('math.prob.cdf', M, D, 'X has CDF F(x) = x² on [0, 1]. What is P(0.5 < X ≤ 1)?', '0.75', ['0.25', '0.5', '1'], 'F(1) − F(0.5)'),
  q('math.prob.cdf', M, A, 'A CDF has F(2) = 0.4 and F(5) = 0.9. What is P(2 < X ≤ 5)?', '0.5', ['0.9', '1.3', '0.4'], 'F(5) − F(2)'),

  q('math.prob.characteristic-function', M, D, 'What is the characteristic function of the constant random variable X = 0?', 'φ(t) = 1', ['φ(t) = 0', 'φ(t) = t', 'φ(t) = eᵗ'], 'E[e^(it·0)] = 1'),
  q('math.prob.characteristic-function', M, A, 'For any random variable X, what is φ_X(0)?', '1', ['0', 'E[X]', 'It may not exist'], 'E[e⁰] = 1, and φ always exists'),

  q('math.prob.chebyshev', M, D, 'Chebyshev bounds P(|X − μ| ≥ 3σ) by what?', '1/9', ['1/3', '0.003', '8/9'], '1/k² with k = 3'),
  q('math.prob.chebyshev', M, A, 'μ = 50 and σ = 5. What lower bound does Chebyshev give for P(40 < X < 60)?', '3/4', ['1/4', '0.95', '1/2'], 'k = 2, so at least 1 − 1/4'),

  q('math.prob.classical-probability', X, F, 'Two fair dice are rolled. What is P(the sum is 7)?', '1/6', ['1/11', '1/12', '7/36'], 'the 11 sums are not equally likely: 6 of 36 outcomes give 7'),
  q('math.prob.classical-probability', X, P, 'A bag holds 3 red and 5 blue marbles. What is P(red)?', '3/8', ['3/5', '1/2', '1/3'], 'favorable over total, not red over blue or one per colour'),

  q('math.prob.clt', M, D, 'Each Xᵢ has mean 10 and SD 4. What is the SD of the mean of 16 of them?', '1', ['4', '0.25', '2'], 'σ/√n = 4/4'),
  q('math.prob.clt', M, A, 'Each Xᵢ has mean 2 and variance 9. Approximately what distribution does the sum of 100 independent Xᵢ have?', 'N(200, 900)', ['N(2, 9)', 'N(200, 9)', 'N(200, 90)'], 'mean 100 · 2, variance 100 · 9'),

  q('math.prob.combinatorial-probability', M, D, 'Two cards are drawn without replacement from a standard deck. What is P(both are aces)?', '1/221', ['1/169', '1/26', '2/13'], '4/52 · 3/51'),
  q('math.prob.combinatorial-probability', M, A, 'Three fair coins are tossed. What is P(at least one head)?', '7/8', ['3/8', '1/2', '1/8'], '1 − P(no heads)'),

  q('math.prob.conditional-distribution', M, D, 'Joint PMF: p(0,0) = 0.1, p(1,0) = 0.3, p(0,1) = 0.2, p(1,1) = 0.4. What is P(X = 1 | Y = 0)?', '0.75', ['0.3', '0.6', '0.5'], '0.3/(0.1 + 0.3)'),
  q('math.prob.conditional-distribution', M, A, 'Given Y = y, X is uniform on [0, y]. What is E[X | Y = 4]?', '2', ['4', '1/4', '8'], 'the midpoint of [0, 4]'),

  q('math.prob.conditional-expectation', M, D, 'E[X | Y = 0] = 2, E[X | Y = 1] = 6 and P(Y = 1) = 0.25. What is E[X]?', '3', ['4', '8', '2'], 'tower rule: 2 · 0.75 + 6 · 0.25'),
  q('math.prob.conditional-expectation', M, A, 'X and Y are independent. What is E[X | Y]?', 'E[X]', ['Y', 'E[Y]', 'X'], 'knowing Y tells nothing about X'),

  q('math.prob.conditional-probability', X, F, 'A card is drawn from a standard deck. Given that it is a heart, what is P(it is a king)?', '1/13', ['1/52', '1/4', '17/52'], 'restrict to the 13 hearts; 1/52 is the joint probability'),
  q('math.prob.conditional-probability', X, D, 'P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.1. What is P(B | A)?', '0.2', ['0.25', '0.1', '0.4'], 'divide by P(A), not P(B); 0.25 is P(A | B)'),

  q('math.prob.continuous-distributions', M, D, 'X ~ Exponential(λ = 2). What is E[X]?', '1/2', ['2', '4', '1/4'], 'E[X] = 1/λ'),
  q('math.prob.continuous-distributions', M, A, 'X ~ U(2, 8). What is P(X > 6)?', '1/3', ['2/3', '1/6', '3/4'], 'length 2 out of 6'),

  q('math.prob.continuous-rv', M, D, 'f(x) = k on [1, 5] is a PDF. What is k?', '1/4', ['1', '1/5', '4'], 'the total area 4k must be 1'),
  q('math.prob.continuous-rv', M, A, 'X has PDF f(x) = 3x² on [0, 1]. What is P(X ≤ 1/2)?', '1/8', ['3/4', '1/2', '3/8'], 'F(x) = x³'),

  q('math.prob.convergence-types', M, D, 'Which mode of convergence is the weakest?', 'In distribution', ['Almost surely', 'In probability', 'In mean square'], 'the others each imply it'),
  q('math.prob.convergence-types', M, A, 'Xₙ = 1/n with probability 1. What does Xₙ converge to almost surely?', '0', ['1', 'It does not converge', '1/2'], 'every outcome gives 1/n → 0'),

  q('math.prob.correlation', M, D, 'Cov(X, Y) = 6, SD(X) = 2 and SD(Y) = 5. What is ρ(X, Y)?', '0.6', ['6', '0.3', '1.2'], '6/(2 · 5)'),
  q('math.prob.correlation', M, A, 'ρ(X, Y) = 0.4. What is ρ(2X + 1, −3Y)?', '−0.4', ['0.4', '−2.4', '−0.8'], 'scaling keeps the size; a negative factor flips the sign'),

  q('math.prob.covariance', M, D, 'E[XY] = 10, E[X] = 2 and E[Y] = 3. What is Cov(X, Y)?', '4', ['10', '6', '16'], 'E[XY] − E[X]E[Y]'),
  q('math.prob.covariance', M, A, 'Cov(X, Y) = 3. What is Cov(2X, 5Y)?', '30', ['3', '10', '15'], 'constants come out as a product'),

  q('math.prob.discrete-distributions', M, D, 'X ~ Binomial(10, 0.3). What is E[X]?', '3', ['0.3', '7', '2.1'], 'np'),
  q('math.prob.discrete-distributions', M, A, 'X ~ Poisson(2). What is P(X = 0)?', 'e⁻²', ['0', '2e⁻²', '1/2'], 'e^(−λ)λ⁰/0!'),

  q('math.prob.discrete-rv', M, D, 'X is the number of heads in two fair coin tosses. What is P(X = 1)?', '1/2', ['1/3', '1/4', '1'], 'HT and TH out of four outcomes'),
  q('math.prob.discrete-rv', M, A, 'X takes the values 0, 1 and 2 with probabilities 0.5, 0.3 and 0.2. What is P(X ≥ 1)?', '0.5', ['0.3', '0.2', '0.8'], '0.3 + 0.2'),

  q('math.prob.distribution', M, D, 'X ~ Binomial(3, 1/2). What is P(X = 2)?', '3/8', ['1/4', '1/2', '2/3'], 'C(3, 2)/2³'),
  q('math.prob.distribution', M, A, 'Which list is a valid distribution for X on {1, 2, 3}?', '0.2, 0.3, 0.5', ['0.5, 0.5, 0.5', '0.6, 0.6, −0.2', '0.1, 0.2, 0.3'], 'non-negative and summing to 1'),

  q('math.prob.ergodicity', M, D, 'Which Markov chain is ergodic?', 'A finite chain that is irreducible and aperiodic', ['A chain that alternates between two states with certainty', 'A chain made of two separate closed classes', 'A chain where every state leads to one absorbing state'], 'irreducible plus aperiodic on a finite space'),
  q('math.prob.ergodicity', M, A, 'An ergodic chain has stationary distribution π = (0.6, 0.4). In the long run, what fraction of time is spent in state 2?', '0.4', ['0.6', '0.5', 'It depends on the starting state'], 'time averages converge to π'),

  q('math.prob.event', M, D, 'One die is rolled. What is the event "even and greater than 3"?', '{4, 6}', ['{2, 4, 6}', '{4, 5, 6}', '{2, 4, 5, 6}'], 'the intersection of the two events'),
  q('math.prob.event', M, A, 'A and B are mutually exclusive with P(A) = 0.3 and P(B) = 0.5. What is P(A ∪ B)?', '0.8', ['0.15', '0.65', '0.5'], 'disjoint events add'),

  q('math.prob.expected-value', X, F, 'A game pays $10 with probability 0.2 and $0 otherwise. What is the expected payout?', '$2', ['$5', '$10', '$0'], 'weight each value by its probability, not a plain average'),
  q('math.prob.expected-value', X, D, 'X is 1 with probability 0.9 and 100 with probability 0.1. What is E[X]?', '10.9', ['50.5', '1', '100'], '0.9 + 10; neither the plain average nor the most likely value'),

  q('math.prob.generating-function', M, D, 'What is the probability generating function of the number of heads in one fair coin toss?', '(1 + z)/2', ['1/2', 'z/2', '(1 − z)/2'], 'P(0) + P(1)z'),
  q('math.prob.generating-function', M, A, 'G_X(z) = (1 + z)/2 and Y is an independent copy of X. What is the PGF of X + Y?', '((1 + z)/2)²', ['1 + z', '(1 + z)/4', '(2 + 2z)/2'], 'independent sums multiply PGFs'),

  q('math.prob.independence', M, D, 'P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2. Are A and B independent?', 'Yes, since P(A)P(B) = 0.2', ['No, since they overlap', 'No, since 0.2 ≠ 0.9', 'It cannot be decided'], 'compare P(A ∩ B) with P(A)P(B)'),
  q('math.prob.independence', M, A, 'A and B are independent with P(A) = 0.3 and P(B) = 0.6. What is P(A ∪ B)?', '0.72', ['0.9', '0.18', '0.82'], '0.3 + 0.6 − 0.18'),

  q('math.prob.joint-distribution', M, D, 'Joint PMF: p(0,0) = 0.1, p(0,1) = 0.3, p(1,0) = 0.2, p(1,1) = 0.4. What is P(X + Y = 1)?', '0.5', ['0.3', '0.2', '0.4'], 'p(0,1) + p(1,0)'),
  q('math.prob.joint-distribution', M, A, 'X and Y are independent, each uniform on {1, 2, 3}. What is P(X = 1, Y = 3)?', '1/9', ['1/3', '2/3', '1/6'], 'multiply the marginals'),

  q('math.prob.law-of-unconscious', M, D, 'X is uniform on {1, 2, 3}. What is E[X²]?', '14/3', ['4', '2', '9'], '(1 + 4 + 9)/3'),
  q('math.prob.law-of-unconscious', M, A, 'X ~ U(0, 1). What is E[X²]?', '1/3', ['1/4', '1/2', '1'], '∫₀¹ x² dx'),

  q('math.prob.linearity-expectation', M, D, 'E[X] = 3 and E[Y] = −1. What is E[2X − 4Y + 5]?', '15', ['7', '3', '11'], '6 + 4 + 5'),
  q('math.prob.linearity-expectation', M, A, 'Ten fair dice are rolled. What is the expected total?', '35', ['3.5', '60', '21'], '10 · 3.5'),

  q('math.prob.lln', M, D, 'What does the law of large numbers say about the mean of many fair die rolls?', 'It is very likely close to 3.5', ['It equals exactly 3.5 after enough rolls', 'Early high rolls are balanced by later low rolls', 'It approaches 6'], 'convergence in probability, not compensation'),
  q('math.prob.lln', M, A, 'A fair coin is flipped 10,000 times. Which statement is most accurate?', 'The proportion of heads is very likely close to 0.5', ['The number of heads is very likely exactly 5000', 'Heads and tails will roughly alternate', 'The proportion must be exactly 0.5'], 'proportions settle, counts still wander'),

  q('math.prob.marginal-distribution', M, D, 'Joint PMF: p(0,0) = 0.1, p(0,1) = 0.3, p(1,0) = 0.2, p(1,1) = 0.4. What is P(Y = 1)?', '0.7', ['0.4', '0.3', '0.5'], 'sum over x: 0.3 + 0.4'),
  q('math.prob.marginal-distribution', M, A, 'f(x, y) = x + y on the unit square. What is the marginal density f_X(x)?', 'x + 1/2', ['x', 'x + y', '1/2'], '∫₀¹ (x + y) dy'),

  q('math.prob.markov-chain', M, D, 'A chain has P = [[0.7, 0.3], [0.4, 0.6]] and starts in state 1. What is the probability it is in state 2 after one step?', '0.3', ['0.4', '0.6', '0.7'], 'row 1, column 2'),
  q('math.prob.markov-chain', M, A, 'A chain has P = [[0.7, 0.3], [0.4, 0.6]]. What is the probability of being in state 1 two steps after starting there?', '0.61', ['0.49', '0.7', '0.58'], '0.7 · 0.7 + 0.3 · 0.4'),

  q('math.prob.markov-inequality', M, D, 'X ≥ 0 with E[X] = 5. What does Markov\'s inequality give for P(X ≥ 20)?', 'At most 1/4', ['Exactly 1/4', 'At least 1/4', 'At most 1/16'], 'E[X]/a'),
  q('math.prob.markov-inequality', M, A, 'X ≥ 0 has mean 2. Which statement must hold?', 'P(X ≥ 10) ≤ 0.2', ['P(X ≥ 10) = 0.2', 'P(X ≥ 10) ≥ 0.2', 'P(X ≤ 10) ≤ 0.2'], 'an upper bound on a tail'),

  q('math.prob.martingale', M, D, 'Mₙ is a martingale with M₀ = 5. What is E[M₁₀]?', '5', ['0', '50', '10'], 'a martingale keeps its expectation'),
  q('math.prob.martingale', M, A, 'The Xᵢ are independent, each ±1 with probability 1/2, and Sₙ = X₁ + ⋯ + Xₙ. Which process is a martingale?', 'Sₙ', ['Sₙ²', 'Sₙ + n', '|Sₙ|'], 'E[Sₙ₊₁ | past] = Sₙ'),

  q('math.prob.mgf', M, D, 'M_X(t) = e^(3t + 2t²). What is E[X]?', '3', ['2', '4', '5'], 'M′(0) = 3'),
  q('math.prob.mgf', M, A, 'M_X(t) = 1/(1 − t). What is E[X²]?', '2', ['1', '0', '1/2'], 'M″(t) = 2/(1 − t)³'),

  q('math.prob.moments', M, D, 'E[X] = 3 and E[X²] = 13. What is Var(X)?', '4', ['10', '7', '13'], 'E[X²] − (E[X])²'),
  q('math.prob.moments', M, A, 'Which distribution has skewness 0?', 'Any normal distribution', ['Exponential(1)', 'Poisson(1)', 'Chi-squared with 2 degrees of freedom'], 'symmetric about its mean'),

  q('math.prob.normal-distribution', M, D, 'X ~ N(50, 25). About what percent of values lie between 45 and 55?', '68%', ['95%', '99.7%', '50%'], 'σ = 5, so this is ±1σ'),
  q('math.prob.normal-distribution', M, A, 'X ~ N(100, 15²). What is the z-score of 130?', '2', ['30', '1/2', '1.3'], '(130 − 100)/15'),

  q('math.prob.pdf', M, D, 'Which function is a valid PDF on [0, 1]?', 'f(x) = 2x', ['f(x) = x', 'f(x) = 1 − 2x', 'f(x) = 3'], 'non-negative with total area 1'),
  q('math.prob.pdf', M, A, 'X has PDF f(x) = 2x on [0, 1]. What is E[X]?', '2/3', ['1/2', '1', '1/3'], '∫₀¹ 2x² dx'),

  q('math.prob.pmf', M, D, 'A PMF on {1, 2, 3, 4} is p(k) = ck. What is c?', '1/10', ['1/4', '10', '1/24'], 'c(1 + 2 + 3 + 4) = 1'),
  q('math.prob.pmf', M, A, 'p(k) = (1/2)ᵏ for k = 1, 2, 3, …. What is P(X ≥ 3)?', '1/4', ['1/8', '3/4', '7/8'], '1 − 1/2 − 1/4'),

  q('math.prob.poisson-process', M, D, 'Calls arrive as a Poisson process at 6 per hour. What is the expected number in 20 minutes?', '2', ['6', '3', '20'], 'λt = 6 · 1/3'),
  q('math.prob.poisson-process', M, A, 'Arrivals form a Poisson process at 3 per minute. What is the expected wait until the next arrival?', '1/3 minute', ['3 minutes', '1 minute', '1/9 minute'], 'exponential gaps with mean 1/λ'),

  q('math.prob.probability-axioms', M, D, 'Which statement is NOT one of Kolmogorov\'s axioms?', 'P(Aᶜ) = 1 − P(A)', ['P(A) ≥ 0', 'P(Ω) = 1', 'P of a countable disjoint union is the sum'], 'the complement rule is derived from them'),
  q('math.prob.probability-axioms', M, A, 'P(A) = 0.6 and P(B) = 0.7. What is the smallest possible P(A ∩ B)?', '0.3', ['0', '0.42', '0.6'], 'P(A ∪ B) ≤ 1 forces 0.6 + 0.7 − 1'),

  q('math.prob.probability-measure', M, D, 'P(A) = 0.6, P(B) = 0.5 and P(A ∪ B) = 0.8. What is P(A ∩ B)?', '0.3', ['1.1', '0.2', '0.5'], 'inclusion–exclusion'),
  q('math.prob.probability-measure', M, A, 'P(A) = 0.7 and P(A ∩ B) = 0.2. What is P(A ∩ Bᶜ)?', '0.5', ['0.3', '0.8', '0.9'], 'A splits into A ∩ B and A ∩ Bᶜ'),

  q('math.prob.quantile', M, D, 'X ~ U(0, 10). What is the 30th percentile?', '3', ['0.3', '30', '7'], 'F(x) = x/10 = 0.3'),
  q('math.prob.quantile', M, A, 'X has CDF F(x) = x² on [0, 1]. What is the median?', '1/√2', ['1/2', '1/4', '√2'], 'x² = 1/2'),

  q('math.prob.random-variable', M, D, 'Two coins are tossed and X counts the heads. What values can X take?', '0, 1 and 2', ['1 and 2', 'HH, HT, TH and TT', '0 and 1'], 'X maps outcomes to numbers'),
  q('math.prob.random-variable', M, A, 'X is the sum of two dice. How many distinct values can X take?', '11', ['12', '36', '6'], 'the sums 2 through 12'),

  q('math.prob.sample-space', M, D, 'How many outcomes are in the sample space of three coin tosses?', '8', ['6', '3', '4'], '2³'),
  q('math.prob.sample-space', M, A, 'A die is rolled and a coin is tossed. How many outcomes are in the sample space?', '12', ['8', '6', '2'], '6 · 2'),

  q('math.prob.standard-deviation', M, D, 'A data set has population variance 4. What is its standard deviation?', '2', ['4', '16', '0.5'], 'the square root of the variance'),
  q('math.prob.standard-deviation', M, A, 'SD(X) = 3. What is SD(−2X + 7)?', '6', ['−6', '13', '1'], '|−2| · 3; shifting does nothing'),

  q('math.prob.standard-normal', M, D, 'Φ(1.5) ≈ 0.933. What is P(Z > 1.5)?', 'About 0.067', ['About 0.933', '0.5', '1.5'], '1 − Φ(1.5)'),
  q('math.prob.standard-normal', M, A, 'Φ(1) ≈ 0.841. What is P(−1 < Z < 1)?', 'About 0.682', ['About 0.841', 'About 0.159', '0.5'], '2Φ(1) − 1'),

  q('math.prob.stationary-distribution', M, D, 'P = [[0.5, 0.5], [0.5, 0.5]]. What is the stationary distribution?', '(1/2, 1/2)', ['(1, 0)', '(0, 1)', 'There is none'], 'πP = π'),
  q('math.prob.stationary-distribution', M, A, 'P = [[0.9, 0.1], [0.2, 0.8]]. What is the stationary distribution?', '(2/3, 1/3)', ['(1/3, 2/3)', '(1/2, 1/2)', '(0.9, 0.8)'], 'balance: 0.1π₁ = 0.2π₂'),

  q('math.prob.total-probability', M, D, 'Machine A makes 60% of items, 2% defective; machine B makes 40%, 5% defective. What is P(defective)?', '0.032', ['0.035', '0.07', '0.02'], '0.6 · 0.02 + 0.4 · 0.05'),
  q('math.prob.total-probability', M, A, 'Urn 1 has 2 red balls out of 5; urn 2 has 4 red out of 5. An urn is chosen at random and a ball drawn. What is P(red)?', '3/5', ['2/5', '4/5', '6/25'], '½ · 2/5 + ½ · 4/5'),

  q('math.prob.transition-matrix', M, D, 'Which matrix can be a transition matrix?', '[[0.3, 0.7], [1, 0]]', ['[[0.3, 0.3], [0.5, 0.5]]', '[[0.5, 0.6], [0.5, 0.4]]', '[[1.2, −0.2], [0, 1]]'], 'non-negative rows that each sum to 1'),
  q('math.prob.transition-matrix', M, A, 'P = [[0, 1], [1, 0]]. What is P²?', '[[1, 0], [0, 1]]', ['[[0, 1], [1, 0]]', '[[0, 0], [0, 0]]', '[[1, 1], [1, 1]]'], 'two swaps return to the start'),

  q('math.prob.variance', M, D, 'X is 0 or 2, each with probability 1/2. What is Var(X)?', '1', ['2', '4', '0'], 'E[X²] − (E[X])² = 2 − 1'),
  q('math.prob.variance', M, A, 'X and Y are independent with Var(X) = 4 and Var(Y) = 9. What is Var(X − Y)?', '13', ['−5', '5', '36'], 'variances add, even for a difference'),
]

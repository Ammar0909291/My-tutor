/**
 * MATHEMATICS — probe DEPTH, batch 24: math.meas (13 (concept, band) pairs, 26 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified. This batch closes the campaign:
 * every mathematics (concept, band) pair now holds five gradeable probes.
 *
 * Every value was worked by hand, e.g. ∫₀¹ x² dx = 1/3 so ‖x‖₂ = 1/√3,
 * n · 1(0, 1/n) integrates to 1 for every n while its limit is 0, Hölder
 * pairs 3 with 3/2, and the simple function 3 on [0, 2), 1 on [2, 6) has
 * integral 6 + 4 = 10.
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

export const MATHEMATICS_DEPTH_MEASURE_PROBES: SeedProbe[] = [
  q('math.meas.abstract-measure-spaces', D, 'Is Lebesgue measure on ℝ σ-finite?', 'Yes, since ℝ is the union of the intervals [−n, n], each of finite measure', ['No, since λ(ℝ) = ∞', 'Only on bounded sets', 'No, since ℝ is uncountable'], 'σ-finite allows an infinite total'),
  q('math.meas.abstract-measure-spaces', A, 'Which measure is NOT σ-finite?', 'Counting measure on all subsets of ℝ', ['Lebesgue measure on ℝ', 'Any probability measure', 'Counting measure on ℕ'], 'a countable union of finite sets is countable'),

  q('math.meas.convergence-theorems', D, 'Measurable fₙ ≥ 0 increase pointwise to f. What does the monotone convergence theorem give?', '∫ fₙ → ∫ f', ['∫ f = 0', '∫ fₙ = ∫ f for every n', 'fₙ → f uniformly'], 'limit and integral swap for increasing non-negative sequences'),
  q('math.meas.convergence-theorems', A, 'fₙ = n · 1(0, 1/n) on [0, 1]. What are lim ∫ fₙ and ∫ lim fₙ?', '1 and 0', ['0 and 0', '1 and 1', '∞ and 0'], 'no integrable bound dominates fₙ'),

  q('math.meas.l2-space', D, 'In L²[0, 1], what is ‖f‖₂ for f(x) = x?', '1/√3', ['1/2', '1/3', '1'], '√(∫₀¹ x² dx)'),
  q('math.meas.l2-space', A, 'f ∈ L² has coefficients cₙ in an orthonormal basis. What is Σ |cₙ|²?', '‖f‖₂²', ['‖f‖₂', '0', 'Always infinite'], 'Parseval\'s identity'),

  q('math.meas.lebesgue-integral', D, 'What is the Lebesgue integral of the indicator of ℚ ∩ [0, 1]?', '0', ['1', 'It is undefined', '1/2'], 'ℚ has measure 0'),
  q('math.meas.lebesgue-integral', A, 'f = 1 on the irrationals and 0 on the rationals. What is the Lebesgue integral of f over [0, 1]?', '1', ['0', 'It is undefined', '1/2'], 'f = 1 almost everywhere, though it is not Riemann integrable'),

  q('math.meas.lebesgue-measure', D, 'What is the Lebesgue measure of [2, 5]?', '3', ['5', '7', '2'], 'its length'),
  q('math.meas.lebesgue-measure', A, 'What is the Lebesgue measure of [0, 1] \\ ℚ?', '1', ['0', 'It is not measurable', '1/2'], 'removing a null set changes nothing'),

  q('math.meas.lp-space', D, 'What is ‖f‖_∞ for f(x) = sin x on [0, π]?', '1', ['0', 'π', '2'], 'the essential supremum of |sin x|'),
  q('math.meas.lp-space', A, 'Hölder\'s inequality pairs L³ with L^q for which q?', '3/2', ['3', '1/3', '2'], '1/3 + 1/q = 1'),

  q('math.meas.measurable-function', D, 'Which condition makes f: (X, F) → ℝ measurable?', 'f⁻¹(B) ∈ F for every Borel set B', ['f(A) is Borel for every A ∈ F', 'f is continuous', 'f is bounded'], 'preimages of measurable sets'),
  q('math.meas.measurable-function', A, 'f and g are measurable. Which of f + g, fg and max(f, g) must be measurable?', 'All three', ['Only f + g', 'None in general', 'Only max(f, g)'], 'measurable functions form an algebra closed under max'),

  q('math.meas.measure-zero', D, 'What is the Lebesgue measure of a countable set of reals?', '0', ['1', '∞', 'It depends on the set'], 'cover the nth point by an interval of length ε/2ⁿ'),
  q('math.meas.measure-zero', A, 'What does "f = g almost everywhere" mean?', '{x : f(x) ≠ g(x)} has measure 0', ['f(x) = g(x) for all but finitely many x', 'They differ only on a countable set', 'f = g everywhere'], 'an exceptional set of measure zero, possibly uncountable'),

  q('math.meas.measure', D, 'A and B are disjoint with μ(A) = 3 and μ(B) = 4. What is μ(A ∪ B)?', '7', ['12', '1', '4'], 'additivity on disjoint sets'),
  q('math.meas.measure', A, 'A ⊆ B with μ(A) = 2 and μ(B) = 5. What is μ(B \\ A)?', '3', ['7', '2', '5'], 'B is the disjoint union of A and B \\ A'),

  q('math.meas.product-measure', D, 'What is the product Lebesgue measure of [0, 2] × [0, 3]?', '6', ['5', '1', '9'], 'λ([0, 2]) · λ([0, 3])'),
  q('math.meas.product-measure', A, 'When does Fubini\'s theorem allow swapping the order of integration of f on X × Y?', 'When ∫∫ |f| is finite', ['Always', 'Whenever f is bounded', 'Whenever both iterated integrals exist'], 'absolute integrability on the product'),

  q('math.meas.radon-nikodym', D, 'What does ν ≪ μ mean?', 'μ(E) = 0 implies ν(E) = 0', ['ν(E) = 0 implies μ(E) = 0', 'ν(E) ≤ μ(E) for every E', 'ν = μ'], 'absolute continuity'),
  q('math.meas.radon-nikodym', A, 'ν(E) = ∫_E 2x dx on [0, 1]. What is the Radon–Nikodym derivative dν/dλ?', '2x', ['x²', '2', '1'], 'the density in the integral'),

  q('math.meas.sigma-algebra', D, 'X = {1, 2, 3}. Which collection is a σ-algebra on X?', '{∅, {1}, {2, 3}, X}', ['{∅, {1}, X}', '{{1}, {2}, {3}}', '{∅, {1}, {2}, X}'], 'closed under complements and countable unions'),
  q('math.meas.sigma-algebra', A, 'A is a subset of X with ∅ ≠ A ≠ X. How many sets are in the σ-algebra generated by A?', '4', ['2', '3', '8'], '∅, A, its complement, X'),

  q('math.meas.simple-function', D, 'φ = 3 on [0, 2) and 1 on [2, 6), and 0 elsewhere. What is ∫ φ dλ?', '10', ['4', '8', '12'], '3 · 2 + 1 · 4'),
  q('math.meas.simple-function', A, 'How many distinct values can a simple function take?', 'Finitely many', ['Countably many', 'Any number', 'Exactly two'], 'a finite combination of indicators'),
]

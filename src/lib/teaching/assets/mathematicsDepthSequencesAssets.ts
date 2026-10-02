/**
 * MATHEMATICS — probe DEPTH, batch 9: math.seq (21 (concept, band) pairs, 42 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every value below was worked by hand, e.g. 3 + 19·4 = 79, S₁₀ of 5, 8, 11
 * = 5·(10 + 27) = 185, 2·3⁵ = 486, 3(1 − (−2)⁴)/(1 − (−2)) = −15,
 * 9/(1 − 1/3) = 27/2, H₄ = 25/12, the telescoping sum of 1/n − 1/(n + 2)
 * = 1 + ½, and the fixed point L = (L + 6)/2 at 6.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH, UNDERGRADUATE: UG } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, ADVANCED: A } = ProbeDifficulty
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

export const MATHEMATICS_DEPTH_SEQUENCES_PROBES: SeedProbe[] = [
  q('math.seq.absolute-convergence', UG, M, D, 'Does ∑(−1)ⁿ/n² converge absolutely?', 'Yes, since ∑1/n² converges', ['No, it converges only conditionally', 'No, it diverges', 'Yes, because its signs alternate'], 'test the series of absolute values'),
  q('math.seq.absolute-convergence', UG, M, A, 'Which series converges conditionally but not absolutely?', '∑(−1)ⁿ/√n', ['∑(−1)ⁿ/n²', '∑(−1)ⁿ', '∑1/n'], 'alternating test passes, ∑1/√n diverges'),

  q('math.seq.alternating-series', UG, M, D, 'Does ∑(−1)ⁿ⁺¹/(2n + 1) converge?', 'Yes, by the alternating series test', ['No, since ∑1/(2n + 1) diverges', 'No, since its terms change sign', 'It cannot be decided'], 'terms decrease to 0'),
  q('math.seq.alternating-series', UG, M, A, '∑(−1)ⁿ⁺¹/n³ is approximated by S₃. What bounds the error?', '1/64', ['1/27', '1/8', '1/3'], 'the first omitted term, 1/4³'),

  q('math.seq.arithmetic-sequence', HIGH, M, D, 'What is the 20th term of 3, 7, 11, 15, …?', '79', ['83', '80', '76'], 'a₂₀ = 3 + 19 · 4'),
  q('math.seq.arithmetic-sequence', HIGH, M, A, 'An arithmetic sequence has a₃ = 10 and a₇ = 22. What is a₁?', '4', ['7', '1', '3'], '4d = 12 so d = 3; a₁ = 10 − 2 · 3'),

  q('math.seq.arithmetic-series', HIGH, M, D, 'What is the sum of the whole numbers from 1 to 100?', '5050', ['5000', '10100', '4950'], '100 · 101 / 2'),
  q('math.seq.arithmetic-series', HIGH, M, A, 'What is the sum of the first 10 terms of 5, 8, 11, …?', '185', ['32', '170', '200'], 'S₁₀ = 10/2 · (2 · 5 + 9 · 3)'),

  q('math.seq.comparison-test', UG, M, D, 'Which comparison settles ∑1/(n² + 5)?', 'Its terms are below 1/n², and ∑1/n² converges', ['Its terms are above 1/n, and ∑1/n diverges', 'Its terms are below 1/n, so it converges', 'No comparison applies'], 'smaller than a convergent series'),
  q('math.seq.comparison-test', UG, M, A, 'Using limit comparison with ∑1/n, what does ∑n/(n² + 3) do?', 'It diverges, since the limit of the ratio is 1', ['It converges, since n² + 3 > n²', 'It converges, since the limit of the ratio is 0', 'The test is inconclusive'], 'a positive finite limit means same behaviour'),

  q('math.seq.convergent', UG, M, D, 'What is the limit of aₙ = (2n + 1)/(n + 3)?', '2', ['1/3', '1', '∞'], 'divide top and bottom by n'),
  q('math.seq.convergent', UG, M, A, 'What does aₙ = (1 + 1/n)ⁿ converge to?', 'e', ['1', '∞', '2'], 'the defining limit of e'),

  q('math.seq.divergence-test', UG, M, D, 'What does the divergence test say about ∑n/(n + 1)?', 'It diverges, since the terms tend to 1', ['It converges', 'It is inconclusive', 'It converges to 1'], 'terms that do not tend to 0'),
  q('math.seq.divergence-test', UG, M, A, 'The terms of ∑1/√n tend to 0. What does the divergence test conclude?', 'Nothing; the test is inconclusive', ['The series converges', 'The series diverges', 'The sum is 0'], 'terms tending to 0 is necessary, not sufficient'),

  q('math.seq.divergent-sequence', UG, M, D, 'Which sequence diverges?', 'aₙ = n²', ['aₙ = 1/n', 'aₙ = (−1)ⁿ/n', 'aₙ = 5'], 'n² grows without bound'),
  q('math.seq.divergent-sequence', UG, M, A, 'Does aₙ = cos(nπ) converge?', 'No, it alternates between −1 and 1', ['Yes, to 0', 'Yes, to 1', 'Yes, because it is bounded'], 'cos(nπ) = (−1)ⁿ'),

  q('math.seq.geometric-sequence', HIGH, M, D, 'What is the 6th term of 2, 6, 18, …?', '486', ['1458', '162', '36'], 'a₆ = 2 · 3⁵'),
  q('math.seq.geometric-sequence', HIGH, M, A, 'A geometric sequence has a₂ = 12 and a₅ = 96. What is r?', '2', ['8', '3', '4'], 'r³ = 96/12 = 8'),

  q('math.seq.geometric-series', HIGH, M, D, 'What is 1 + 2 + 4 + ⋯ + 2⁹?', '1023', ['1024', '512', '2047'], '(2¹⁰ − 1)/(2 − 1)'),
  q('math.seq.geometric-series', HIGH, M, A, 'Using the geometric sum formula, what is 3 − 6 + 12 − 24?', '−15', ['45', '−45', '15'], 'a = 3, r = −2, n = 4: 3(1 − 16)/3'),

  q('math.seq.harmonic-series', UG, M, D, 'What is H₄ = 1 + 1/2 + 1/3 + 1/4?', '25/12', ['2/5', '2', '1/24'], 'common denominator 12: (12 + 6 + 4 + 3)/12'),
  q('math.seq.harmonic-series', UG, M, A, 'Which argument shows the harmonic series diverges?', 'Grouping terms into blocks that each exceed 1/2', ['Its terms tend to zero', 'Each term exceeds 1/2', 'Its partial sums stay below 2'], '1/3 + 1/4 > 1/2, 1/5 + ⋯ + 1/8 > 1/2, and so on'),

  q('math.seq.infinite-geometric-series', HIGH, M, D, 'What is 9 + 3 + 1 + 1/3 + ⋯?', '27/2', ['12', '27', '13'], 'a/(1 − r) = 9/(2/3)'),
  q('math.seq.infinite-geometric-series', HIGH, M, A, 'Writing 0.777… as 7/10 + 7/100 + ⋯, what fraction is it?', '7/9', ['7/10', '77/100', '7/99'], '(7/10)/(1 − 1/10)'),

  q('math.seq.integral-test', UG, M, D, 'Which integral does the integral test use for ∑1/n³?', '∫₁^∞ 1/x³ dx', ['∫₀¹ 1/x³ dx', '∫₁^∞ 3ˣ dx', '∫₁^∞ x³ dx'], 'the same function, on [1, ∞)'),
  q('math.seq.integral-test', UG, M, A, 'By the integral test, for which p does ∑1/nᵖ converge?', 'p > 1', ['p ≥ 1', 'p > 0', 'p < 1'], '∫₁^∞ x^(−p) dx is finite exactly when p > 1'),

  q('math.seq.partial-sums', UG, M, D, 'For aₙ = 2n − 1, what is S₄?', '16', ['7', '15', '9'], '1 + 3 + 5 + 7'),
  q('math.seq.partial-sums', UG, M, A, 'A series has partial sums Sₙ = n/(n + 1). What is the sum of the series?', '1', ['0', '∞', '1/2'], 'the limit of Sₙ'),

  q('math.seq.ratio-test', UG, M, D, 'What does the ratio test give for ∑5ⁿ/n!?', 'L = 0, so the series converges', ['L = 5, so the series diverges', 'L = 1, so the test is inconclusive', 'L = ∞, so the series diverges'], 'the ratio is 5/(n + 1)'),
  q('math.seq.ratio-test', UG, M, A, 'What does the ratio test give for ∑n²/2ⁿ?', 'L = 1/2, so the series converges', ['L = 2, so the series diverges', 'L = 1, so the test is inconclusive', 'L = 0, so the series converges'], '((n + 1)/n)² · 1/2 → 1/2'),

  q('math.seq.recursive-sequences', UG, M, D, 'a₁ = 2 and aₙ = 3aₙ₋₁ − 1. What is a₄?', '41', ['14', '40', '122'], '2, 5, 14, 41'),
  q('math.seq.recursive-sequences', UG, M, A, 'The sequence aₙ₊₁ = (aₙ + 6)/2 converges. What is its limit?', '6', ['3', '2', '12'], 'L = (L + 6)/2'),

  q('math.seq.root-test', UG, M, D, 'What does the root test give for ∑(n/(3n + 1))ⁿ?', 'L = 1/3, so the series converges', ['L = 1, so the test is inconclusive', 'L = 3, so the series diverges', 'L = 0, so the series converges'], 'the nth root is n/(3n + 1) → 1/3'),
  q('math.seq.root-test', UG, M, A, 'What does the root test give for ∑2ⁿ/nⁿ?', 'L = 0, so the series converges', ['L = 2, so the series diverges', 'L = 1, so the test is inconclusive', 'L = 1/2, so the series converges'], 'the nth root is 2/n → 0'),

  q('math.seq.sequence', UG, M, D, 'What are the first three terms of aₙ = n² − 1?', '0, 3, 8', ['1, 4, 9', '0, 1, 2', '3, 8, 15'], 'n = 1, 2, 3'),
  q('math.seq.sequence', UG, M, A, 'Which formula gives 2, 5, 10, 17, …?', 'aₙ = n² + 1', ['aₙ = 3n − 1', 'aₙ = 2n + 1', 'aₙ = n² + n'], 'check n = 1 to 4'),

  q('math.seq.series-convergence', UG, M, F, 'Does ∑1/2ⁿ converge?', 'Yes, it is geometric with r = 1/2', ['No, all its terms are positive', 'No, it has infinitely many terms', 'Only if the terms are added in order'], 'a geometric series with |r| < 1'),
  q('math.seq.series-convergence', UG, M, A, 'Which series diverges?', '∑1/√n', ['∑1/n^1.1', '∑(−1)ⁿ/n', '∑1/2ⁿ'], 'a p-series with p = 1/2'),

  q('math.seq.series', UG, M, D, 'What is the third partial sum of 1 + 1/2 + 1/4 + ⋯?', '7/4', ['1/4', '2', '3/4'], '1 + 1/2 + 1/4'),
  q('math.seq.series', UG, M, A, 'Which statement about a series ∑aₙ is true?', 'If the series converges, its terms tend to 0', ['If the terms tend to 0, the series converges', 'The series and its terms have the same limit', 'A series of positive terms always converges'], 'the converse of the divergence test fails'),

  q('math.seq.telescoping-series', HIGH, M, D, 'What is the infinite sum of 1/(n(n + 1)) from n = 1?', '1', ['1/2', '∞', '2'], '1/n − 1/(n + 1) telescopes to 1'),
  q('math.seq.telescoping-series', HIGH, M, A, 'What is the infinite sum of 1/n − 1/(n + 2) from n = 1?', '3/2', ['1', '2', '∞'], 'only 1 and 1/2 survive'),
]

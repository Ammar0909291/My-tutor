/**
 * Batch: comparison-test, root-test, harmonic-series (math.seq).
 *
 * Continues the systematic sweep of math.seq.series-convergence's own
 * newly-unblocked children (after ratio-test, alternating-series,
 * divergence-test in Batches 90-92) — all remaining math.seq concepts are
 * leaf nodes with no further KG unlocks, so this batch groups the three
 * sibling convergence-test-family concepts naturally: comparison-test (DCT
 * and LCT) and root-test round out the standard test toolkit alongside the
 * already-authored ratio test, while harmonic-series formalizes the
 * standing counterexample already informally invoked by series-convergence,
 * divergence-test, and alternating-series's own explanations.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.seq.{comparison-test,
 * root-test,harmonic-series}.md.
 *
 *   COMPARISON-TEST  comparison-test — DCT is genuinely ASYMMETRIC: only
 *                 "smaller squeezed beneath a convergent bound" and "larger
 *                 forced to absorb a divergent lower bound" are valid, the
 *                 REVERSE directions prove nothing; LCT's boundary cases
 *                 L=0/L=∞ give only ONE-SIDED partial information, never
 *                 the full same-fate conclusion; a benchmark must match the
 *                 target's DOMINANT term, never be picked arbitrarily.
 *   ROOT-TEST  root-test — L<1 converges, L>1 diverges, L=1 inconclusive
 *                 (mirroring the ratio test); lim n^(1/n)=1, so ANY
 *                 polynomial factor raised to 1/n vanishes into 1, never
 *                 staying unchanged; the root test is strictly STRONGER
 *                 than the ratio test in theory, but in practice each is
 *                 chosen for whichever form is easier to compute.
 *   HARMONIC-SERIES  harmonic-series — Oresme's grouping argument proves
 *                 ∑1/n DIVERGES (every doubling block contributes ≥1/2
 *                 forever, S₂ᵏ>1+k/2→∞), the standing counterexample that
 *                 terms→0 is necessary but never sufficient for
 *                 convergence; slow growth (like ln n) is still UNBOUNDED
 *                 growth, never eventual stabilization; p=1 is the exact
 *                 knife-edge of the p-series family.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPARISON_TEST = 'math.seq.comparison-test'
const ROOT_TEST = 'math.seq.root-test'
const HARMONIC_SERIES = 'math.seq.harmonic-series'

export const MATHEMATICS_SEQ_COMPARISON_TEST_ROOT_TEST_HARMONIC_SERIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPARISON_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Direct Comparison Test (DCT) states: if 0≤aₙ≤bₙ for all sufficiently large n, then '
      + '∑bₙ converging forces ∑aₙ to converge (a smaller series is "squeezed" beneath a '
      + 'convergent bound), and ∑aₙ diverging forces ∑bₙ to diverge (a larger series must absorb '
      + 'at least as much as a divergent lower bound). Crucially, the REVERSE directions are '
      + 'INVALID: knowing the smaller series converges says nothing about the larger one, and '
      + 'knowing the larger series diverges says nothing about the smaller one — only two of the '
      + 'four possible direction/outcome combinations license a conclusion.\n\n'
      + 'The Limit Comparison Test (LCT) uses the RATIO L=lim(aₙ/bₙ) instead: if 0<L<∞, the two '
      + 'series share the identical fate (both converge or both diverge). The boundary cases L=0 '
      + 'and L=∞ give only PARTIAL, one-sided information — L=0 means aₙ is asymptotically '
      + 'negligible compared to bₙ, so a CONVERGENT benchmark forces aₙ\'s series to converge too, '
      + 'but a divergent benchmark tells you NOTHING; L=∞ mirrors this in the other direction.\n\n'
      + 'Selecting a good benchmark is a skill, not a guess: for a rational expression, the '
      + 'benchmark should match the DOMINANT (leading-order) term of numerator and denominator — '
      + 'e.g. (3n+2)/(n³+5n+1) behaves asymptotically like 3n/n³=3/n², so ∑1/n² is the natural '
      + 'benchmark. A benchmark of the wrong asymptotic order produces an inconclusive L=0 or L=∞ '
      + 'boundary case, rather than the clean, fully conclusive 0<L<∞ result a correctly-matched '
      + 'benchmark gives.',
    targetedMisconceptions: [`${COMPARISON_TEST}:MC-1`, `${COMPARISON_TEST}:MC-2`, `${COMPARISON_TEST}:MC-3`],
    source: eb(COMPARISON_TEST, 'Core Understanding — the Direct Comparison Test\'s asymmetric valid directions, the Limit Comparison Test\'s boundary cases L=0/L=infinity giving only one-sided partial information, and benchmark selection requiring a match to the target\'s dominant term'),
  },
  {
    conceptId: ROOT_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Like the ratio test, the Root Test is grounded in geometric-series comparison: if '
      + '|aₙ|^(1/n)→L, then for large n, |aₙ|≈Lⁿ — the series behaves like a geometric series with '
      + 'ratio L. When L<1, absolute convergence follows by comparison with a convergent geometric '
      + 'series; when L>1, aₙ↛0 and the series diverges by the divergence test; when L=1, exactly '
      + 'as with the ratio test, no conclusion is available.\n\n'
      + "The test's natural domain is series already written as an nth power, aₙ=(f(n))ⁿ: taking "
      + 'the nth root collapses the outer exponent immediately, leaving just |f(n)| to evaluate. A '
      + 'CRITICAL prerequisite limit makes this work even with polynomial factors: lim n^(1/n)=1 '
      + '(via ln(n^(1/n))=(ln n)/n→0). As a direct consequence, ANY fixed power nᵖ raised to the '
      + '1/n exponent also tends to 1 — (nᵖ)^(1/n)=n^(p/n)→1ᵖ=1 — meaning polynomial factors inside '
      + 'an nth power are asymptotically INVISIBLE after taking the root: only the exponential '
      + '"base" factor survives.\n\n'
      + 'The Root Test is provably STRICTLY STRONGER than the Ratio Test: whenever the ratio '
      + "test's limit exists and equals L, the root test gives the identical value, but the "
      + 'reverse is not guaranteed. In PRACTICE, however, the two tests are usually chosen by '
      + 'which form is EASIER to compute: an nth-power series collapses instantly under the root '
      + 'test, while a factorial or exponential-ratio series simplifies far more readily under the '
      + "ratio test's successive-term cancellation — applying the root test to a factorial series "
      + "requires Stirling's approximation and is genuinely harder, even though it still "
      + 'eventually works.',
    targetedMisconceptions: [`${ROOT_TEST}:MC-1`, `${ROOT_TEST}:MC-2`, `${ROOT_TEST}:MC-3`],
    source: eb(ROOT_TEST, 'Core Understanding — the root test\'s three-case decision rule via geometric-series comparison, the critical limit n^(1/n)=1 making polynomial factors vanish after the root, and the root test being strictly stronger than the ratio test in theory but each chosen in practice for computational ease'),
  },
  {
    conceptId: HARMONIC_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The harmonic series ∑1/n is the canonical, permanent counterexample proving that aₙ→0 is '
      + 'NECESSARY but not SUFFICIENT for convergence: its terms shrink to zero, yet the series '
      + "diverges — proven directly via ORESME'S GROUPING ARGUMENT (14th century). Group the "
      + 'series by powers of 2: 1+(1/2)+(1/3+1/4)+(1/5+1/6+1/7+1/8)+⋯. Block k has 2ᵏ⁻¹ terms, each '
      + 'at least as large as 1/2ᵏ (the smallest in the block), so block k contributes at least '
      + '2ᵏ⁻¹×1/2ᵏ=1/2 — EVERY block, regardless of how far out, contributes at least 1/2. '
      + 'Formally, S₂ₖ>1+k/2 for all k≥1, and since 1+k/2→∞, the partial sums are unbounded: ∑1/n '
      + 'DIVERGES.\n\n'
      + 'The partial sums Hₙ=∑1/i grow at a precise, very slow rate: Hₙ≈ln n+γ (γ≈0.5772, the '
      + 'Euler–Mascheroni constant). This growth is genuinely UNBOUNDED — it eventually crosses '
      + 'every finite threshold — but astronomically slowly: reaching Hₙ=100 requires roughly '
      + 'n≈2×10⁴³ terms, far beyond any physical computation. "Slow growth" is NOT the same claim '
      + 'as "eventual convergence" — logarithmic growth is still unbounded growth, just at an '
      + 'imperceptible pace.\n\n'
      + 'The harmonic series is also the exact BOUNDARY of the p-series family ∑1/nᵖ, which '
      + 'converges if and only if p>1. At p=1 (harmonic), each block\'s contribution stays fixed at '
      + '≥1/2 forever — enough to diverge, but only just; at p=1+ε for any ε>0, the block sums '
      + 'instead form a convergent geometric-type series. The harmonic series sits at the precise '
      + 'knife-edge where this balance fails on the divergence side.',
    targetedMisconceptions: [`${HARMONIC_SERIES}:MC-1`, `${HARMONIC_SERIES}:MC-2`, `${HARMONIC_SERIES}:MC-3`],
    source: eb(HARMONIC_SERIES, "Core Understanding — Oresme's grouping argument proving the harmonic series diverges despite terms shrinking to zero, the harmonic partial sums' genuinely unbounded but astronomically slow growth, and the harmonic series as the exact p=1 knife-edge of the p-series family"),
  },
]

export const MATHEMATICS_SEQ_COMPARISON_TEST_ROOT_TEST_HARMONIC_SERIES_PROBES: SeedProbe[] = [
  {
    conceptId: COMPARISON_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Given 0≤aₙ≤bₙ, and it is known that ∑aₙ (the SMALLER series) converges. Does this tell you anything about whether ∑bₙ (the LARGER series) converges?',
    choices: [
      { text: 'No — knowing the smaller series converges says NOTHING about the larger one; only two of the four direction/outcome combinations are valid (a convergent bound forces the smaller to converge; a divergent smaller series forces the larger to diverge), and this is neither', isCorrect: true },
      { text: 'Yes — if the smaller series converges, the larger series bounding it from above must also converge, since it is "squeezed" the same way', isCorrect: false, misconceptionId: `${COMPARISON_TEST}:MC-1` },
      { text: 'Yes, since any true inequality between two series\' terms should hold symmetrically for their convergence behavior as well', isCorrect: false, misconceptionId: `${COMPARISON_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPARISON_TEST}:MC-1`],
    source: eb(COMPARISON_TEST, 'Demonstration 1 — showing sum 1/n^2 converging says nothing about the larger sum 1/n, directly breaking comparison-wrong-direction'),
  },
  {
    conceptId: COMPARISON_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For ∑sin(1/n²) compared against the DIVERGENT benchmark ∑1/n, the Limit Comparison Test gives L=0. Does this mean both series diverge (the same-fate rule)?',
    choices: [
      { text: 'No — L=0 gives only ONE-SIDED partial information: a divergent benchmark tells you NOTHING when L=0; re-benchmarking against the convergent ∑1/n² instead gives L=1, a clean, fully conclusive result showing the series actually converges', isCorrect: true },
      { text: 'Yes — whenever L=0 or L=∞ occurs, the two series always share the identical fate, exactly as in the standard 0<L<∞ case', isCorrect: false, misconceptionId: `${COMPARISON_TEST}:MC-2` },
      { text: 'Yes, since a limit of exactly 0 means the target series is negligible and therefore automatically diverges alongside any divergent benchmark', isCorrect: false, misconceptionId: `${COMPARISON_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPARISON_TEST}:MC-2`],
    source: eb(COMPARISON_TEST, 'Demonstration 2 — computing L=0 against a divergent benchmark showing it is genuinely inconclusive, then re-benchmarking against a convergent series for a clean conclusion, directly breaking limit-comparison-L-boundary'),
  },
  {
    conceptId: COMPARISON_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For ∑(3n+2)/(n³+5n+1), is any convenient, familiar series an acceptable LCT benchmark, or does the benchmark need to match something specific about the target series?',
    choices: [
      { text: 'The benchmark must match the DOMINANT term: the numerator/denominator behave asymptotically like 3n/n³=3/n², so ∑1/n² is the correct benchmark, giving a clean L=3∈(0,∞); an arbitrary benchmark would likely produce an inconclusive L=0 or L=∞ instead', isCorrect: true },
      { text: 'Any familiar convergent or divergent series works equally well as a benchmark, since the Limit Comparison Test always produces a usable conclusion regardless of which one is chosen', isCorrect: false, misconceptionId: `${COMPARISON_TEST}:MC-3` },
      { text: 'The benchmark should be chosen based on which series is easiest to compute with, without needing to check its asymptotic order against the target series', isCorrect: false, misconceptionId: `${COMPARISON_TEST}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPARISON_TEST}:MC-3`],
    source: eb(COMPARISON_TEST, 'Demonstration 3 — extracting the dominant term to select the matching benchmark and computing a clean L=3, directly breaking benchmark-selection-arbitrary'),
  },
  {
    conceptId: ROOT_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "In computing the root test's L for aₙ=n²·(1/3)ⁿ, does the polynomial factor n² inside |aₙ|^(1/n) simplify to (n²)^(1/n)=n² unchanged, or to something that vanishes to 1?",
    choices: [
      { text: 'It vanishes to 1 — since lim n^(1/n)=1, any fixed power raised to the 1/n exponent also tends to 1: (n²)^(1/n)=n^(2/n)→1²=1; the polynomial factor is asymptotically INVISIBLE after taking the nth root', isCorrect: true },
      { text: '(n²)^(1/n) simplifies to n² unchanged, since the 1/n exponent applied to an already-exponentiated base has no further simplifying effect', isCorrect: false, misconceptionId: `${ROOT_TEST}:MC-2` },
      { text: '(n²)^(1/n) simplifies to n, since taking a root always divides the visible exponent in half regardless of the root\'s actual index', isCorrect: false, misconceptionId: `${ROOT_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${ROOT_TEST}:MC-2`],
    source: eb(ROOT_TEST, 'Demonstration 2 — deriving lim n^(1/n)=1 via the logarithm argument and applying it to a polynomial factor, directly breaking nth-root-of-n-is-n'),
  },
  {
    conceptId: ROOT_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For ∑(3n/(2n+1))ⁿ, the root test resolves it in one line (L=3/2). Does this mean the root test and ratio test always produce their results with the identical amount of effort on any series?',
    choices: [
      { text: 'No — the root test is strictly stronger in theory, but the two tests genuinely differ in effort depending on the series\' shape: this nth-power series collapses instantly under the root test, while the ratio test here would require extracting a nontrivial exponential-type limit', isCorrect: true },
      { text: 'Yes — since the two tests are grounded in the same geometric-series comparison, they always require identical computational effort for any series shape', isCorrect: false, misconceptionId: `${ROOT_TEST}:MC-1` },
      { text: 'Yes, because whenever one test\'s limit exists, the other test\'s limit is computed via an identical algebraic procedure', isCorrect: false, misconceptionId: `${ROOT_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${ROOT_TEST}:MC-1`],
    source: eb(ROOT_TEST, 'Demonstration 1 — applying both tests to sum (3n/(2n+1))^n showing the root test resolves it in one line while the ratio test requires a nontrivial limit, directly breaking root-and-ratio-always-same'),
  },
  {
    conceptId: ROOT_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For ∑2ⁿ/n!, is the root test the easiest tool to apply, given that the series contains a factorial rather than being written as an nth power?',
    choices: [
      { text: 'No — the ratio test is far simpler here (one line: L=0 via factorial cancellation), while the root test technically still works but requires Stirling\'s approximation ((n!)^(1/n)~n/e), reaching the identical answer with substantially more effort', isCorrect: true },
      { text: 'Yes — the root test\'s genuine cleanliness on nth-power series extends equally well to any series shape, including ones built from factorials', isCorrect: false, misconceptionId: `${ROOT_TEST}:MC-3` },
      { text: 'Yes, since factorial expressions always simplify more cleanly under an nth root than under a ratio of successive terms', isCorrect: false, misconceptionId: `${ROOT_TEST}:MC-3` },
    ],
    targetedMisconceptions: [`${ROOT_TEST}:MC-3`],
    source: eb(ROOT_TEST, "Demonstration 3 — computing sum 2^n/n!'s convergence via both tests, showing the ratio test is far simpler than the Stirling-approximation-dependent root test, directly breaking root-test-on-factorial-series"),
  },
  {
    conceptId: HARMONIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The terms of the harmonic series ∑1/n shrink to zero (1/n→0). Does this mean the series converges?',
    choices: [
      { text: "No — Oresme's grouping argument proves it DIVERGES: grouping by powers of 2, every block (however far out) contributes at least 1/2, so S₂ᵏ>1+k/2→∞; terms shrinking to zero is necessary but never sufficient for convergence", isCorrect: true },
      { text: 'Yes — since the individual terms 1/n approach zero, the running total must eventually settle down to a finite value', isCorrect: false, misconceptionId: `${HARMONIC_SERIES}:MC-1` },
      { text: 'Yes, because any series whose terms vanish in the limit satisfies the complete definition of convergence', isCorrect: false, misconceptionId: `${HARMONIC_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${HARMONIC_SERIES}:MC-1`],
    source: eb(HARMONIC_SERIES, "Demonstration 1 — working Oresme's grouping proof directly computing S8>2.5, directly breaking harmonic-converges-because-terms-vanish"),
  },
  {
    conceptId: HARMONIC_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The partial sums Hₙ of the harmonic series grow extremely slowly (like ln n). Does this slow growth mean Hₙ eventually stabilizes at some finite value?',
    choices: [
      { text: 'No — the growth is genuinely UNBOUNDED, eventually crossing every finite threshold, just astronomically slowly (reaching Hₙ=100 needs roughly 2×10⁴³ terms); "slow growth" is not the same claim as "eventual convergence"', isCorrect: true },
      { text: 'Yes — growth this gradual is effectively indistinguishable from stabilization, so for all practical purposes the series can be treated as converging', isCorrect: false, misconceptionId: `${HARMONIC_SERIES}:MC-2` },
      { text: 'Yes, since a sum that increases more and more slowly must eventually approach a fixed ceiling, the same way a decelerating object eventually stops', isCorrect: false, misconceptionId: `${HARMONIC_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${HARMONIC_SERIES}:MC-2`],
    source: eb(HARMONIC_SERIES, 'Demonstration 2 — computing Hn at increasingly large n showing the sum genuinely keeps climbing past any fixed threshold, directly breaking harmonic-converges-slowly-to-finite-limit'),
  },
  {
    conceptId: HARMONIC_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the 1000th term of the harmonic series (1/1000=0.001) the same quantity as the sum of its first 1000 terms (H₁₀₀₀)?',
    choices: [
      { text: 'No — H₁₀₀₀≈ln(1000)+γ≈7.485, roughly 7,485 times larger than the individual term 1/1000=0.001; the shrinking individual term and the ever-growing running total are genuinely different objects', isCorrect: true },
      { text: 'Yes — since the harmonic series\' terms are so small, the sum of many of them should also be approximately equal to any single one of those terms', isCorrect: false, misconceptionId: `${HARMONIC_SERIES}:MC-3` },
      { text: 'Yes, because the nth term and the sum of the first n terms are simply two equivalent ways of describing the same underlying quantity', isCorrect: false, misconceptionId: `${HARMONIC_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${HARMONIC_SERIES}:MC-3`],
    source: eb(HARMONIC_SERIES, 'Demonstration 3 — computing H1000 and the term 1/1000 side by side confirming a roughly 7,485-fold difference, directly breaking partial-sum-grows-like-term'),
  },
]

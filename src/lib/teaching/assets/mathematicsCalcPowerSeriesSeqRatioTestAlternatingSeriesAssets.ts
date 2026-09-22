/**
 * Batch: power-series (math.calc), ratio-test, alternating-series (math.seq).
 *
 * math.calc.power-series is the highest-unlock-value concept in this batch
 * (6 downstream concepts: math.calc.radius-of-convergence, math.calc.
 * taylor-series, math.de.series-solution, math.prob.mgf, math.prob.
 * generating-function, math.cx.power-series-cx) and is the SECOND math.calc
 * concept authored this excursion (after math.calc.sequence-limits,
 * Batch 89) — direct continued progress on the domain this whole math.seq
 * detour was opened to unblock. math.seq.ratio-test (requires series-
 * convergence) unlocks math.calc.radius-of-convergence (shared with
 * power-series). math.seq.alternating-series (requires series-convergence)
 * has no further KG unlocks but is a standing prerequisite-adjacent sibling
 * test concept, continuing the systematic sweep of series-convergence's own
 * 8 newly-unblocked children.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/{math.calc.power-series,
 * math.seq.ratio-test,math.seq.alternating-series}.md.
 *
 *   POWER-SERIES  power-series — the ratio test is INCONCLUSIVE exactly at
 *                 both endpoints x=a±R, so each must be tested SEPARATELY
 *                 by a different method, never assumed included or excluded
 *                 from R alone; a series' convergence domain is a genuinely
 *                 DIFFERENT question from the domain of the function it may
 *                 equal inside that interval; term-by-term differentiation/
 *                 integration preserves the RADIUS but never automatically
 *                 the ENDPOINT behavior.
 *   RATIO-TEST  ratio-test — L<1 converges, L>1 diverges, L=1 is genuinely
 *                 INCONCLUSIVE (never "diverges"); the test's power is on
 *                 factorial/exponential terms (the ratio collapses
 *                 cleanly), and it UNIVERSALLY fails (always L=1) on purely
 *                 polynomial/rational series, which need a different tool.
 *   ALTERNATING-SERIES  alternating-series — the Leibniz test is a
 *                 SPECIALIZED tool (positive, decreasing, tends to 0), not
 *                 the general convergence definition restated; if terms
 *                 fail to tend to zero, the series genuinely DIVERGES (by
 *                 the divergence test), never merely "inconclusive"; the
 *                 truncation error is bounded by the single next omitted
 *                 term, with no further computation needed.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POWER_SERIES = 'math.calc.power-series'
const RATIO_TEST = 'math.seq.ratio-test'
const ALTERNATING_SERIES = 'math.seq.alternating-series'

export const MATHEMATICS_CALC_POWER_SERIES_SEQ_RATIO_TEST_ALTERNATING_SERIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POWER_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A power series ∑cₙ(x−a)ⁿ generalizes the geometric series to an arbitrary sequence of '
      + 'coefficients cₙ. Its RADIUS OF CONVERGENCE R is found via the ratio test applied to the '
      + 'terms cₙ(x−a)ⁿ: solving lim|cₙ₊₁(x−a)ⁿ⁺¹/cₙ(x−a)ⁿ|<1 for |x−a| gives |x−a|<R. The '
      + 'geometric series itself is the motivating example: ∑xⁿ has R=1, and where it converges, '
      + 'it equals 1/(1−x).\n\n'
      + 'Crucially, the ratio test is INCONCLUSIVE exactly at the two boundary points x=a−R and '
      + 'x=a+R — its limit equals exactly 1 there by construction. The candidate interval (a−R,a+R) '
      + 'is therefore only a LOWER bound on what is known; each endpoint must be substituted in '
      + 'individually and tested with a DIFFERENT method. The true interval of convergence can be '
      + 'open at both ends, closed at both ends, or half-open, and the two endpoints can give '
      + 'genuinely OPPOSITE verdicts — for ∑xⁿ/n, x=1 diverges (harmonic series) while x=−1 '
      + 'converges (alternating harmonic series).\n\n'
      + "A power series' convergence domain is a genuinely different question from the domain of "
      + 'the FUNCTION it may equal when it converges. ∑xⁿ equals 1/(1−x) only for |x|<1 — the '
      + 'function 1/(1−x) is well-defined for every real x≠1, but the SERIES at x=2 is 1+2+4+8+⋯, '
      + 'which diverges and represents nothing there. Outside the interval of convergence, the '
      + 'series and the function it equals inside simply part ways.\n\n'
      + 'Term-by-term differentiation and integration are guaranteed to PRESERVE the radius R, but '
      + 'endpoint behavior is NOT guaranteed to stay the same — differentiation tends to hurt '
      + 'endpoint convergence (an extra factor of n appears), while integration tends to help it '
      + '(an extra factor of 1/(n+1) appears). Each endpoint must be re-tested fresh after any '
      + 'term-by-term operation.',
    targetedMisconceptions: [`${POWER_SERIES}:MC-1`, `${POWER_SERIES}:MC-2`, `${POWER_SERIES}:MC-3`],
    source: eb(POWER_SERIES, 'Core Understanding — the ratio test finds the radius of convergence but is inconclusive at both endpoints requiring separate testing, a series\' convergence domain differs from the domain of the function it equals, and term-by-term differentiation/integration preserves the radius but never automatically the endpoint behavior'),
  },
  {
    conceptId: RATIO_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Ratio Test formalizes an intuition already familiar from the geometric series: if the '
      + 'ratio of successive terms EVENTUALLY behaves like a fixed constant L, the series inherits '
      + 'geometric-series-like convergence behavior. Formally, L=lim|aₙ₊₁/aₙ|: when L<1, the series '
      + 'converges ABSOLUTELY (bounded by a convergent geometric series). When L>1, the terms '
      + 'eventually GROW, so aₙ↛0, forcing divergence by the divergence test. When L=1, NEITHER '
      + 'argument applies — the test gives NO information whatsoever, since both a convergent '
      + 'series (∑1/n²) and a divergent one (∑1/n) yield L=1.\n\n'
      + "The test's genuine POWER shows up precisely where factorial or exponential terms appear: "
      + 'for aₙ=2ⁿ/n!, the ratio aₙ₊₁/aₙ=2/(n+1)→0 collapses almost immediately, since consecutive '
      + 'factorial and exponential factors cancel cleanly ((n+1)!/n!=n+1). This is exactly why the '
      + 'ratio test is the natural first choice whenever n! or rⁿ appears in aₙ.\n\n'
      + "The test's LIMITATION is equally structural: for ANY p-series aₙ=1/nᵖ, "
      + '|aₙ₊₁/aₙ|=(n/(n+1))ᵖ→1ᵖ=1 regardless of p — so the ratio test can NEVER distinguish a '
      + 'convergent p-series from a divergent one, always returning the uninformative L=1. This is '
      + 'the precise, provable reason the ratio test is the wrong tool for purely polynomial or '
      + 'rational series, where comparison-based tests are needed instead.',
    targetedMisconceptions: [`${RATIO_TEST}:MC-1`, `${RATIO_TEST}:MC-2`, `${RATIO_TEST}:MC-3`],
    source: eb(RATIO_TEST, 'Core Understanding — the ratio test decision rule (L<1 converges, L>1 diverges, L=1 inconclusive), its power on factorial/exponential series, and its universal failure (always L=1) on p-series/polynomial series'),
  },
  {
    conceptId: ALTERNATING_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Leibniz alternating series test is a SPECIALIZED tool, applicable ONLY to series with '
      + 'the alternating structure ∑(−1)ⁿaₙ: if the underlying sequence {aₙ} (ignoring sign) is '
      + 'POSITIVE, DECREASING, and tends to 0, convergence is GUARANTEED. This is a SUFFICIENT, '
      + 'not necessary, condition — a series failing one of these three requirements might still '
      + 'converge by some other means, just not via this particular test.\n\n'
      + 'All three conditions matter for a genuine structural reason: POSITIVE ensures aₙ carries '
      + 'no sign confusion before the alternating factor is applied; DECREASING ensures each '
      + 'partial sum overshoots the true sum by a progressively SHRINKING amount, so the partial '
      + 'sums squeeze inward rather than oscillating with constant or growing amplitude; TENDS TO '
      + '0 ensures the oscillation amplitude itself vanishes. If the decreasing or tends-to-zero '
      + 'condition FAILS, the series may genuinely DIVERGE — most strikingly, if aₙ↛0, the '
      + 'alternating series diverges outright by the more basic divergence test, a STRONGER '
      + 'conclusion than merely "this particular test is inconclusive."\n\n'
      + "Perhaps the most striking demonstration of the test's specialized nature: the alternating "
      + 'harmonic series ∑(−1)ⁿ⁺¹(1/n)=1−½+⅓−⋯ CONVERGES by this test (since 1/n is positive, '
      + 'decreasing, and →0), even though the corresponding series of absolute values, the '
      + 'ordinary harmonic series ∑1/n, is famously DIVERGENT — proof this test captures something '
      + 'genuinely different from any general convergence criterion for non-alternating series.\n\n'
      + 'ERROR BOUND (orientation level): for a series satisfying the Leibniz conditions, '
      + 'truncating after N terms gives a partial sum Sₙ whose distance from the true sum S is '
      + 'bounded by aₙ₊₁ — the size of the first OMITTED term. No further computation is needed '
      + 'beyond that single next term.',
    targetedMisconceptions: [`${ALTERNATING_SERIES}:MC-1`, `${ALTERNATING_SERIES}:MC-2`, `${ALTERNATING_SERIES}:MC-3`],
    source: eb(ALTERNATING_SERIES, 'Core Understanding — the Leibniz test as a specialized tool requiring positive/decreasing/tends-to-zero, a failed tends-to-zero condition meaning genuine divergence rather than inconclusiveness, and the truncation error bounded by the single next omitted term'),
  },
]

export const MATHEMATICS_CALC_POWER_SERIES_SEQ_RATIO_TEST_ALTERNATING_SERIES_PROBES: SeedProbe[] = [
  {
    conceptId: POWER_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The ratio test finds R=2 for a power series centered at a=0, so the candidate interval is (−2,2). Is the FULL interval of convergence therefore (−2,2), [−2,2], or something that still needs checking?',
    choices: [
      { text: 'It still needs checking — the ratio test is INCONCLUSIVE exactly at the two endpoints x=−2 and x=2 (its limit equals exactly 1 there), so each endpoint must be substituted into the original series and tested separately with a different method', isCorrect: true },
      { text: 'The interval is (−2,2), open at both ends, since the ratio test only ever proves strict inequality', isCorrect: false, misconceptionId: `${POWER_SERIES}:MC-1` },
      { text: 'The interval is [−2,2], closed at both ends, since finding a finite radius R always means both endpoints are included', isCorrect: false, misconceptionId: `${POWER_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${POWER_SERIES}:MC-1`],
    source: eb(POWER_SERIES, 'Demonstration 1 — resolving sum x^n/n showing x=1 diverges while x=-1 converges, directly breaking endpoints-automatically-included'),
  },
  {
    conceptId: POWER_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The series ∑xⁿ equals 1/(1−x) wherever it converges (|x|<1). Since 1/(1−2)=−1 is a perfectly well-defined number, does the series ∑xⁿ equal −1 at x=2?',
    choices: [
      { text: 'No — at x=2, the series itself is 1+2+4+8+⋯, which diverges (grows without bound); the series and the function 1/(1−x) part ways outside the interval of convergence, regardless of how well-defined the function\'s value is there', isCorrect: true },
      { text: 'Yes — since the closed-form function 1/(1−x) is defined at x=2, the series it equals must also converge there to that same value', isCorrect: false, misconceptionId: `${POWER_SERIES}:MC-2` },
      { text: 'Yes, since a power series and its closed-form function are always identical everywhere the function itself is defined', isCorrect: false, misconceptionId: `${POWER_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${POWER_SERIES}:MC-2`],
    source: eb(POWER_SERIES, 'Demonstration 2 — substituting x=2 into sum x^n directly showing the series diverges despite the function being well-defined, directly breaking series-equals-function-everywhere'),
  },
  {
    conceptId: POWER_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After differentiating ∑xⁿ/n term by term (which converges at x=−1) to get the geometric series ∑xⁿ⁻¹, is the new series still guaranteed to converge at x=−1?',
    choices: [
      { text: 'Not automatically — term-by-term differentiation preserves the RADIUS of convergence, but endpoint behavior must be re-tested fresh on the new series; in fact the geometric series diverges at x=−1 even though the original converged there', isCorrect: true },
      { text: 'Yes — since differentiation preserves the radius of convergence, it automatically preserves which endpoints converge as well', isCorrect: false, misconceptionId: `${POWER_SERIES}:MC-3` },
      { text: 'Yes, because any operation performed term by term on a power series leaves its full interval of convergence completely unchanged', isCorrect: false, misconceptionId: `${POWER_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${POWER_SERIES}:MC-3`],
    source: eb(POWER_SERIES, 'Demonstration 3 — differentiating sum x^n/n term by term and showing the endpoint at x=-1 no longer converges, directly breaking term-by-term-preserves-endpoints'),
  },
  {
    conceptId: RATIO_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The ratio test gives L=1 for both ∑1/n and ∑1/n². Since ∑1/n is known to diverge, does L=1 mean the series diverges in general?',
    choices: [
      { text: 'No — L=1 is genuinely INCONCLUSIVE; ∑1/n² also gives L=1 under the ratio test, yet it CONVERGES, proving the value L=1 alone cannot determine convergence or divergence either way', isCorrect: true },
      { text: 'Yes — whenever the ratio test produces L=1, that always means the series diverges, since the ratio is not shrinking', isCorrect: false, misconceptionId: `${RATIO_TEST}:MC-1` },
      { text: 'Yes, since L=1 is the boundary case between converging and diverging, and boundary cases always default to divergence', isCorrect: false, misconceptionId: `${RATIO_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${RATIO_TEST}:MC-1`],
    source: eb(RATIO_TEST, 'Demonstration 1 — computing the ratio test on both sum 1/n and sum 1/n^2, both giving L=1 despite opposite fates, directly breaking ratio-test-L-equals-1-means-diverges'),
  },
  {
    conceptId: RATIO_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For aₙ=n!/3ⁿ, simplifying the ratio aₙ₊₁/aₙ requires (n+1)!/n!. Does (n+1)! simplify to n, or to (n+1)·n!?',
    choices: [
      { text: '(n+1)!=(n+1)·n! — expanding explicitly before cancelling shows (n+1)!/n!=(n+1), so aₙ₊₁/aₙ=(n+1)/3→∞, correctly diverging', isCorrect: true },
      { text: '(n+1)! simplifies to n, since factorial notation just means subtracting 1 from the index each time', isCorrect: false, misconceptionId: `${RATIO_TEST}:MC-2` },
      { text: '(n+1)!/n! simplifies to 1, since the two factorials are nearly the same expression and should cancel completely', isCorrect: false, misconceptionId: `${RATIO_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${RATIO_TEST}:MC-2`],
    source: eb(RATIO_TEST, 'Demonstration 2 — expanding (n+1)!=(n+1)*n! explicitly before simplifying, directly breaking factorial-algebra-error'),
  },
  {
    conceptId: RATIO_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the ratio test a good first choice for testing the purely polynomial series ∑n²/(n³+1)?',
    choices: [
      { text: 'No — for any p-series-like or purely polynomial/rational series, |aₙ₊₁/aₙ|→1 regardless of the specific powers involved, so the ratio test ALWAYS returns the uninformative L=1 there; a comparison-based test is the right tool instead', isCorrect: true },
      { text: 'Yes — the ratio test is a universal, first-choice tool that reliably determines convergence or divergence for any series, including purely polynomial ones', isCorrect: false, misconceptionId: `${RATIO_TEST}:MC-3` },
      { text: 'Yes, since polynomial series always produce a clean, decisive ratio well away from L=1', isCorrect: false, misconceptionId: `${RATIO_TEST}:MC-3` },
    ],
    targetedMisconceptions: [`${RATIO_TEST}:MC-3`],
    source: eb(RATIO_TEST, 'Demonstration 3 — deriving that a_n=1/n^p gives L=1 for every value of p, directly breaking ratio-test-universal'),
  },
  {
    conceptId: ALTERNATING_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The alternating harmonic series ∑(−1)ⁿ⁺¹(1/n) converges by the Leibniz test. Does this mean the ordinary harmonic series ∑(1/n) (same terms, no alternating sign) must also converge, since they look so similar?',
    choices: [
      { text: 'No — the Leibniz test is a SPECIALIZED tool for the alternating structure specifically, distinct from any general convergence criterion; the ordinary harmonic series ∑1/n is famously DIVERGENT even though the alternating version of the exact same terms converges', isCorrect: true },
      { text: 'Yes — if one series built from 1/n converges, any series built from the same terms must converge as well, alternating or not', isCorrect: false, misconceptionId: `${ALTERNATING_SERIES}:MC-1` },
      { text: 'Yes, since the Leibniz test is simply the general series-convergence definition restated in a different notation', isCorrect: false, misconceptionId: `${ALTERNATING_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${ALTERNATING_SERIES}:MC-1`],
    source: eb(ALTERNATING_SERIES, 'Demonstration 1 — verifying the alternating harmonic series converges by Leibniz while the ordinary harmonic series of absolute values diverges, directly breaking Leibniz-test-assumed-general-convergence-definition'),
  },
  {
    conceptId: ALTERNATING_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For ∑(−1)ⁿ(n/(n+1)), the terms tend to 1, not 0, so the Leibniz test\'s tends-to-zero condition fails. Does this just mean the Leibniz test is inconclusive here?',
    choices: [
      { text: 'No — since the terms do not tend to zero at all (aₙ↛0), the series genuinely DIVERGES by the more basic divergence test; this is a STRONGER conclusion than "this particular test is inconclusive"', isCorrect: true },
      { text: 'Yes — a failed Leibniz condition always just means this particular test cannot be used, leaving the question of convergence completely open', isCorrect: false, misconceptionId: `${ALTERNATING_SERIES}:MC-2` },
      { text: 'Yes, and a different specialized alternating-series test would be needed to determine convergence in this case', isCorrect: false, misconceptionId: `${ALTERNATING_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${ALTERNATING_SERIES}:MC-2`],
    source: eb(ALTERNATING_SERIES, 'Demonstration 2 — showing terms tending to 1 not 0 and confirming genuine divergence via the divergence test, directly breaking failed-condition-assumed-merely-inconclusive'),
  },
  {
    conceptId: ALTERNATING_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The alternating harmonic series is truncated at N=4 (S₄=7/12≈0.5833). To bound how far this is from the true sum ln2≈0.6931, do you need to compute many more terms, or just one?',
    choices: [
      { text: 'Just one — the truncation error is bounded by the single next OMITTED term, a₅=1/5=0.2, which indeed exceeds the actual error (≈0.1098); no further terms need to be computed', isCorrect: true },
      { text: 'Many more terms are needed — estimating the truncation error for a Leibniz-convergent series generally requires substantial additional computation', isCorrect: false, misconceptionId: `${ALTERNATING_SERIES}:MC-3` },
      { text: 'The exact true sum must first be known through some other method before any error bound can be stated', isCorrect: false, misconceptionId: `${ALTERNATING_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${ALTERNATING_SERIES}:MC-3`],
    source: eb(ALTERNATING_SERIES, 'Demonstration 3 — numerically verifying the truncation error is bounded by the single next omitted term, directly breaking error-bound-assumed-to-need-many-extra-terms'),
  },
]

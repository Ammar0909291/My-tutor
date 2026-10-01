/**
 * Batch: integral-test, absolute-convergence, telescoping-series (math.seq).
 *
 * Continues the systematic sweep of math.seq's remaining leaf-node
 * concepts. math.seq.integral-test (requires series-convergence +
 * math.calc.improper-integrals, both authored) links series and integral
 * convergence via area-bounding. math.seq.absolute-convergence (requires
 * alternating-series, authored Batch 90) formalizes the convergent-but-not-
 * absolutely-convergent gap that concept's own alternating harmonic series
 * example first exposed. math.seq.telescoping-series (requires
 * partial-sums, authored Batch 88) is the third of the three sibling
 * closed-form-sum techniques (alongside Gauss pairing for arithmetic-series
 * and shift-multiply-subtract for geometric-series, both already authored).
 * After this batch, only recursive-sequences, divergent-sequence, and
 * infinite-geometric-series remain to close math.seq entirely at 21/21.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.seq.{integral-test,
 * absolute-convergence,telescoping-series}.md.
 *
 *   INTEGRAL-TEST  integral-test — the series and the integral share only
 *                 CONVERGENCE, never a numerical VALUE (∫1/x²dx=1 while
 *                 ∑1/n²=π²/6, both converge to different numbers);
 *                 MONOTONICITY is not optional — a non-decreasing function
 *                 invalidates the area-bounding argument entirely;
 *                 convergence is a TAIL property, never changed by the
 *                 starting index.
 *   ABSOLUTE-CONVERGENCE  absolute-convergence — absolute convergence is a
 *                 strictly STRONGER property, tested FIRST; a diverging
 *                 ∑|aₙ| does NOT settle whether ∑aₙ converges — conditional
 *                 convergence exists via sign-cancellation between two
 *                 infinite divergent reservoirs; rearrangement is safe only
 *                 for absolute convergence, never for conditional (Riemann
 *                 Rearrangement Theorem: it can hit ANY target).
 *   TELESCOPING-SERIES  telescoping-series — most rational terms must be
 *                 DECOMPOSED via partial fractions before any cancellation
 *                 is visible, never telescoped as originally written; only
 *                 the very FIRST and very LAST surviving terms remain
 *                 (Sₙ=b₁−bₙ₊₁, never a sum or average of the ends); not
 *                 every rational series has this difference structure —
 *                 series like ∑1/n² genuinely do not telescope.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INTEGRAL_TEST = 'math.seq.integral-test'
const ABSOLUTE_CONVERGENCE = 'math.seq.absolute-convergence'
const TELESCOPING_SERIES = 'math.seq.telescoping-series'

export const MATHEMATICS_SEQ_INTEGRAL_TEST_ABSOLUTE_CONVERGENCE_TELESCOPING_SERIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INTEGRAL_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'If f is continuous, positive, and DECREASING on [N,∞) with f(n)=aₙ, then ∑aₙ and '
      + '∫ₙ^∞f(x)dx share the identical convergence verdict — both converge, or both diverge. '
      + 'This follows from an area-bounding argument: since f is decreasing, '
      + 'f(n+1)≤∫ₙ^(n+1)f(x)dx≤f(n), and summing over consecutive intervals traps the partial '
      + 'sums and the integral by each other.\n\n'
      + "The integral's VALUE and the series' SUM are NOT the same number — this is the single "
      + 'most important warning attached to the test. ∫₁^∞(1/x²)dx=1, while ∑1/n²=π²/6≈1.6449 — '
      + 'both converge, genuinely different values. The test transfers CONVERGENCE information '
      + 'only, never a numerical value; computing an actual sum requires entirely separate '
      + 'machinery.\n\n'
      + "The test's primary payoff is DERIVING the p-series result: for f(x)=1/xᵖ (p>0), "
      + '∫₁^∞x⁻ᵖdx converges exactly when p>1 and diverges when p≤1. Its genuine practical value is '
      + 'reaching series the p-series and divergence tests cannot resolve: ∑1/(n ln n) diverges '
      + 'while ∑1/(n(ln n)²) converges — a pair the integral test handles cleanly via u=ln x.\n\n'
      + 'Two further points matter: MONOTONICITY genuinely matters — applying the test to a '
      + 'non-decreasing (e.g. oscillating) function invalidates the area-bounding argument '
      + 'entirely; and the STARTING INDEX N can be chosen freely without affecting whether the '
      + 'series or integral converges — changing N changes the numerical VALUE of both, but '
      + 'convergence is a property of the TAIL of a series, unaffected by any finite number of '
      + 'leading terms.',
    targetedMisconceptions: [`${INTEGRAL_TEST}:MC-1`, `${INTEGRAL_TEST}:MC-2`, `${INTEGRAL_TEST}:MC-3`],
    source: eb(INTEGRAL_TEST, 'Core Understanding — the Integral Test links series and integral convergence via area-bounding while their numerical values differ, monotonicity is required for the argument to be valid, and convergence is a tail property unaffected by the starting index'),
  },
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'This concept formalizes the gap math.seq.alternating-series first exposed (the alternating '
      + 'harmonic series converges even though its absolute-value counterpart diverges) into '
      + 'three distinct convergence classes: a series is ABSOLUTELY convergent if ∑|aₙ| itself '
      + 'converges (a strictly stronger property); CONDITIONALLY convergent if ∑aₙ converges but '
      + '∑|aₙ| diverges (convergence depends on the signs themselves, via cancellation); or simply '
      + 'divergent.\n\n'
      + 'Absolute convergence is provably the STRONGER property: if ∑|aₙ| converges, then ∑aₙ '
      + 'converges too. This justifies the TWO-STEP classification pipeline: first test ∑|aₙ| — if '
      + 'it converges, the series is absolutely convergent and no further test is needed; only if '
      + '∑|aₙ| diverges does ∑aₙ need to be tested DIRECTLY (via the alternating series test or the '
      + 'divergence test) to distinguish "conditionally convergent" from "divergent."\n\n'
      + 'Conditional convergence exists because of SIGN-CANCELLATION: for a conditionally '
      + 'convergent series, the sum of its positive terms alone diverges to +∞ and the sum of its '
      + 'negative terms alone diverges to −∞ — yet these two divergent quantities interleave in '
      + 'exactly the right way to produce a finite limit. Removing the signs eliminates this '
      + 'delicate cancellation mechanism entirely.\n\n'
      + 'This has a genuinely surprising practical consequence, the RIEMANN REARRANGEMENT '
      + 'THEOREM: an absolutely convergent series can be rearranged in any order without changing '
      + 'its sum, but a conditionally convergent series can be rearranged to converge to ANY '
      + 'target real number (or to diverge). The alternating harmonic series, reordered, can be '
      + 'made to sum to (3/2)ln2 instead of its standard-order sum ln2 — the identical terms, only '
      + 'reordered.',
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-1`, `${ABSOLUTE_CONVERGENCE}:MC-2`, `${ABSOLUTE_CONVERGENCE}:MC-3`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Core Understanding — the three convergence classes (absolute, conditional, divergent) via the two-step classification pipeline, conditional convergence arising from sign-cancellation between two infinite reservoirs, and the Riemann Rearrangement Theorem\'s asymmetric rearrangement safety'),
  },
  {
    conceptId: TELESCOPING_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A telescoping series is one whose terms are already, or can be made, a difference of '
      + 'consecutive values of some sequence {bₙ}: ∑aₙ is telescoping if aₙ=bₙ−bₙ₊₁ for all n. '
      + 'Writing out Sₙ=(b₁−b₂)+(b₂−b₃)+⋯+(bₙ−bₙ₊₁) — every intermediate term cancels pairwise, '
      + 'leaving only the very FIRST term b₁ and the very LAST remaining term −bₙ₊₁: Sₙ=b₁−bₙ₊₁.\n\n'
      + 'Most rational-term series do NOT visibly telescope until partial fractions reveal the '
      + 'difference structure: for aₙ=1/(n(n+1)), the term as written is a single fraction with no '
      + 'visible cancellation. Partial-fraction decomposition gives 1/(n(n+1))=1/n−1/(n+1) — and '
      + 'THIS is the telescoping form. Only after this algebraic step does the cancellation '
      + 'mechanism apply; attempting to telescope before decomposing has nothing to cancel '
      + 'against.\n\n'
      + 'The infinite sum is the limit of the surviving terms: S∞=lim(b₁−bₙ₊₁)=b₁−lim bₙ₊₁. For '
      + '1/(n(n+1))=1/n−1/(n+1): Sₙ=1−1/(n+1), so S∞=1−0=1.\n\n'
      + 'Not every rational series has this structure — the "gap" must be a difference of the SAME '
      + 'function evaluated at n and at a fixed offset. Series like ∑1/n² have NO such difference '
      + 'structure — there is no explicit sequence bₙ with bₙ−bₙ₊₁=1/n² (the natural candidate is '
      + 'itself the unknown sum being sought) — and require a genuinely different convergence '
      + 'test entirely.',
    targetedMisconceptions: [`${TELESCOPING_SERIES}:MC-1`, `${TELESCOPING_SERIES}:MC-2`, `${TELESCOPING_SERIES}:MC-3`],
    source: eb(TELESCOPING_SERIES, 'Core Understanding — the telescoping definition and derivation Sn=b1-b(n+1), requiring partial-fraction decomposition before any cancellation is visible for most rational terms, and not every rational series having the required difference structure'),
  },
]

export const MATHEMATICS_SEQ_INTEGRAL_TEST_ABSOLUTE_CONVERGENCE_TELESCOPING_SERIES_PROBES: SeedProbe[] = [
  {
    conceptId: INTEGRAL_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The Integral Test shows ∑1/n² and ∫₁^∞(1/x²)dx both converge. Since ∫₁^∞(1/x²)dx=1, does that mean ∑1/n²=1 as well?',
    choices: [
      { text: 'No — the integral and the series share only CONVERGENCE, never a numerical value; ∑1/n²=π²/6≈1.6449, genuinely different from the integral\'s value of 1, even though both converge', isCorrect: true },
      { text: 'Yes — since the Integral Test links a series to its corresponding integral, the two must always equal the identical numerical value whenever both converge', isCorrect: false, misconceptionId: `${INTEGRAL_TEST}:MC-1` },
      { text: 'Yes, because the area-bounding argument used to prove the test\'s conclusion directly establishes an equality between the integral and the series', isCorrect: false, misconceptionId: `${INTEGRAL_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${INTEGRAL_TEST}:MC-1`],
    source: eb(INTEGRAL_TEST, 'Demonstration 1 — computing integral 1/x^2 dx=1 and stating sum 1/n^2=pi^2/6 side by side, directly breaking integral-equals-series-sum'),
  },
  {
    conceptId: INTEGRAL_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can the Integral Test be applied to a positive function that oscillates (is not eventually decreasing)?',
    choices: [
      { text: 'No — MONOTONICITY is not optional; applying the test to a non-decreasing (oscillating) function invalidates the area-bounding argument entirely, since that argument specifically relies on f(n+1)≤∫f(x)dx≤f(n) for a decreasing f', isCorrect: true },
      { text: 'Yes — as long as the function is positive, the Integral Test applies regardless of whether it is increasing, decreasing, or oscillating', isCorrect: false, misconceptionId: `${INTEGRAL_TEST}:MC-2` },
      { text: 'Yes, since positivity alone is always sufficient to guarantee the area-bounding argument holds for any continuous function', isCorrect: false, misconceptionId: `${INTEGRAL_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${INTEGRAL_TEST}:MC-2`],
    source: eb(INTEGRAL_TEST, 'Demonstration 2 — showing a non-monotone positive function cannot use the integral test directly, directly breaking monotone-not-required'),
  },
  {
    conceptId: INTEGRAL_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A series diverges when tested starting from n=1. If the same series were instead tested starting from n=1,000,000, could that change it to converge?',
    choices: [
      { text: 'No — convergence is a property of the series\' TAIL, unaffected by any finite number of leading terms; the starting index changes the numerical VALUE of the sum, but never whether it converges or diverges', isCorrect: true },
      { text: 'Yes — starting from a much later index removes enough of the problematic early terms that the series could switch from diverging to converging', isCorrect: false, misconceptionId: `${INTEGRAL_TEST}:MC-3` },
      { text: 'Yes, since the starting index is a free parameter that determines the fundamental convergence behavior of any series', isCorrect: false, misconceptionId: `${INTEGRAL_TEST}:MC-3` },
    ],
    targetedMisconceptions: [`${INTEGRAL_TEST}:MC-3`],
    source: eb(INTEGRAL_TEST, 'Demonstration 3 — showing sum 1/(n ln n) diverges and dropping the n=2 term to start at n=3 leaves it divergent, directly breaking starting-index-changes-convergence'),
  },
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∑(−1)ⁿ⁺¹/n (the alternating harmonic series), ∑|aₙ|=∑1/n diverges. Does this settle the question of whether ∑aₙ itself converges?',
    choices: [
      { text: 'No — a diverging ∑|aₙ| does NOT settle the matter; Step 2 requires testing ∑aₙ directly (here, via the alternating series test, which succeeds), since sign-cancellation can still produce conditional convergence', isCorrect: true },
      { text: 'Yes — since the absolute-value series diverges, the original series ∑aₙ must also diverge, with no further testing needed', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-2` },
      { text: 'Yes, because divergence of any related series involving the same terms always forces divergence of the original series as well', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-2`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Demonstration 2 — applying the two-step pipeline to sum (-1)^(n+1)/sqrt(n) showing Step 1 failing does not settle the question, directly breaking absolute-divergence-implies-series-divergence'),
  },
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "the series converges" the same property as "the series converges absolutely"?',
    choices: [
      { text: 'No — they are genuinely different: the alternating harmonic series ∑(−1)ⁿ⁺¹/n converges, but ∑|(−1)ⁿ⁺¹/n|=∑1/n diverges, showing the two properties can split apart (this series is only CONDITIONALLY convergent)', isCorrect: true },
      { text: 'Yes — convergence and absolute convergence are always the identical property for every series, with no genuine distinction between them', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-1` },
      { text: 'Yes, since any series that converges must automatically have its absolute-value counterpart converge as well', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-1`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Demonstration 1 — classifying sum (-1)^n/n^2 as absolutely convergent against sum (-1)^(n+1)/n as only conditionally convergent, directly breaking conditional-equals-absolute'),
  },
  {
    conceptId: ABSOLUTE_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The alternating harmonic series sums to ln2 in its standard order. Can rearranging the identical terms into a different order ever change this sum?',
    choices: [
      { text: 'Yes — by the Riemann Rearrangement Theorem, a CONDITIONALLY convergent series (like this one) can be rearranged to converge to ANY target real number; a specific reordering of the alternating harmonic series sums to (3/2)ln2 instead', isCorrect: true },
      { text: 'No — reordering the terms of any convergent infinite series, absolutely or conditionally convergent, never changes its sum, exactly as with a finite sum', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-3` },
      { text: 'No, since rearrangement-invariance is a universal property of all convergent series regardless of their specific convergence classification', isCorrect: false, misconceptionId: `${ABSOLUTE_CONVERGENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${ABSOLUTE_CONVERGENCE}:MC-3`],
    source: eb(ABSOLUTE_CONVERGENCE, 'Demonstration 3 — comparing the alternating harmonic series\' standard-order sum against a specific reordering\'s different sum, directly breaking rearrangement-safe-for-all'),
  },
  {
    conceptId: TELESCOPING_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can aₙ=1/(n(n+1)), written as a single fraction, be telescoped directly as it stands?',
    choices: [
      { text: 'No — as a single fraction it has nothing visible to cancel against its neighbors; only AFTER partial-fraction decomposition into 1/n−1/(n+1) does writing out Sₙ reveal any cancellation at all', isCorrect: true },
      { text: 'Yes — any rational term can be telescoped directly as written, with the cancellation pattern becoming visible once enough terms of Sₙ are added together', isCorrect: false, misconceptionId: `${TELESCOPING_SERIES}:MC-1` },
      { text: 'Yes, since telescoping is a property of the final answer only, requiring no algebraic manipulation of the term\'s original form', isCorrect: false, misconceptionId: `${TELESCOPING_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${TELESCOPING_SERIES}:MC-1`],
    source: eb(TELESCOPING_SERIES, 'Demonstration 1 — the canonical decompose-then-collapse derivation for 1/(n(n+1)), directly breaking telescope-before-decompose'),
  },
  {
    conceptId: TELESCOPING_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Writing out S₄=(b₁−b₂)+(b₂−b₃)+(b₃−b₄)+(b₄−b₅) term by term, which specific terms survive after cancellation: b₁+b₅, or b₁−b₅?',
    choices: [
      { text: 'b₁−b₅ — the −b₂/+b₂, −b₃/+b₃, and −b₄/+b₄ pairs all cancel, leaving precisely the very first term +b₁ and the very last term −b₅', isCorrect: true },
      { text: 'b₁+b₅ — the first and last terms of the expansion are simply added together once all the middle cancellation is complete', isCorrect: false, misconceptionId: `${TELESCOPING_SERIES}:MC-2` },
      { text: 'b₄−b₁ — the surviving terms are the last and first bₙ values but in reversed order and sign from what appears in the expansion', isCorrect: false, misconceptionId: `${TELESCOPING_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${TELESCOPING_SERIES}:MC-2`],
    source: eb(TELESCOPING_SERIES, 'Demonstration 2 — the explicit four-term cancellation with surviving terms circled, directly breaking wrong-surviving-terms'),
  },
  {
    conceptId: TELESCOPING_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Having successfully telescoped several series involving 1/(n(n+1))-type terms, does ∑1/n² telescope the same way?',
    choices: [
      { text: 'No — there is no elementary sequence bₙ with bₙ−bₙ₊₁=1/n² (the only candidate is itself the unknown sum being sought); not every rational series has the required difference structure, and ∑1/n² requires a genuinely different convergence test entirely', isCorrect: true },
      { text: 'Yes — every rational-term series can eventually be telescoped, given the right partial-fraction decomposition and enough algebraic effort', isCorrect: false, misconceptionId: `${TELESCOPING_SERIES}:MC-3` },
      { text: 'Yes, since repeated success telescoping similar-looking rational series guarantees the technique generalizes to any rational-term series', isCorrect: false, misconceptionId: `${TELESCOPING_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${TELESCOPING_SERIES}:MC-3`],
    source: eb(TELESCOPING_SERIES, 'Demonstration 3 — the failed-telescope demonstration for sum 1/n^2 showing no elementary difference structure exists, directly breaking all-rational-series-telescope'),
  },
]

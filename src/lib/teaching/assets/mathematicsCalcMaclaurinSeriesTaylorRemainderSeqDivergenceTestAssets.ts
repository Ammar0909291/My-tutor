/**
 * Batch: maclaurin-series, taylor-remainder (math.calc), divergence-test (math.seq).
 *
 * math.calc.maclaurin-series and math.calc.taylor-remainder are the LAST two
 * ready math.calc concepts (both requiring taylor-series, authored Batch 91)
 * — authoring both closes math.calc's entire currently-reachable frontier
 * (only math.calc.change-of-variables remains, blocked on unauthored
 * math.linalg.determinant, outside this excursion's scope). math.seq.
 * divergence-test formalizes the divergence test already introduced
 * informally in math.seq.series-convergence's own core explanation
 * (Batch 89), continuing the systematic sweep of series-convergence's
 * newly-unblocked children.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/{math.calc.maclaurin-series,
 * math.calc.taylor-remainder,math.seq.divergence-test}.md.
 *
 *   MACLAURIN-SERIES  maclaurin-series — the Maclaurin series is the Taylor
 *                 series with a=0, nothing more; sin x's series contains
 *                 ONLY odd powers and cos x's ONLY even powers as a DIRECT
 *                 structural consequence of their own odd/even symmetry,
 *                 never a coincidence to memorize; new series are built via
 *                 substitution/differentiation/integration into the four
 *                 standard ones, never re-derived from scratch.
 *   TAYLOR-REMAINDER  taylor-remainder — the remainder Rₙ(x) is the TRUE
 *                 error between f(x) and its Taylor polynomial, never the
 *                 next series term itself (its bound uses an UNKNOWN point's
 *                 derivative, not a fixed coefficient); a valid bound M must
 *                 be the genuine worst-case maximum over the WHOLE interval,
 *                 never a convenient underestimate; the error inequality can
 *                 be solved for the minimum n BEFORE computing anything.
 *   DIVERGENCE-TEST  divergence-test — the test only ever proves DIVERGENCE,
 *                 never convergence (lim aₙ=0 is necessary but never
 *                 sufficient); lim aₙ (term limit) and lim Sₙ (partial-sum
 *                 limit) are genuinely DIFFERENT sequences, never the same
 *                 quantity; "slow divergence" is still divergence — there is
 *                 no intermediate state between converging and diverging.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const MACLAURIN_SERIES = 'math.calc.maclaurin-series'
const TAYLOR_REMAINDER = 'math.calc.taylor-remainder'
const DIVERGENCE_TEST = 'math.seq.divergence-test'

export const MATHEMATICS_CALC_MACLAURIN_SERIES_TAYLOR_REMAINDER_SEQ_DIVERGENCE_TEST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MACLAURIN_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'math.calc.taylor-series builds an approximation f(x)=∑f⁽ⁿ⁾(a)/n!·(x−a)ⁿ centered at an '
      + 'ARBITRARY point a. The Maclaurin series is the exact same construction with the center '
      + 'fixed specifically at a=0: f(x)=∑f⁽ⁿ⁾(0)/n!·xⁿ — every derivative evaluated AT ZERO. Four '
      + 'particular series are worth memorizing directly, since their coefficients at a=0 are '
      + 'unusually clean: eˣ=∑xⁿ/n! (every derivative of eˣ equals eˣ itself, e⁰=1); '
      + 'sin x=∑(−1)ⁿx²ⁿ⁺¹/(2n+1)! (only ODD powers); cos x=∑(−1)ⁿx²ⁿ/(2n)! (only EVEN powers); '
      + 'and 1/(1−x)=∑xⁿ (the geometric series, |x|<1).\n\n'
      + "The odd/even power pattern in sin x and cos x's series is not a coincidence to memorize "
      + 'separately — it is a DIRECT structural consequence of sin being an odd function '
      + '(sin(−x)=−sin x) and cos being an even function (cos(−x)=cos x). A Maclaurin series for '
      + 'an odd function can only contain odd powers of x (an even-power term is itself an even '
      + 'function, and an even function cannot sum to an odd one unless its coefficient is '
      + 'exactly zero), and symmetrically for an even function and even powers.\n\n'
      + 'Rather than re-deriving a new function\'s Maclaurin series from scratch every time (a '
      + 'genuinely tedious process requiring repeated differentiation), the four standard series '
      + 'serve as BUILDING BLOCKS: a new series can usually be obtained far more efficiently via '
      + 'SUBSTITUTION (e.g. finding e⁻ˣ²\'s series by substituting −x² into eˣ\'s series), '
      + 'DIFFERENTIATION (term-by-term), or INTEGRATION (e.g. finding ln(1+x)\'s series by '
      + 'integrating 1/(1+x)\'s geometric-series form). Recognizing which technique applies — and '
      + 'reaching for it before attempting direct differentiation — is itself the practical skill '
      + 'this concept develops.',
    targetedMisconceptions: [`${MACLAURIN_SERIES}:MC-1`, `${MACLAURIN_SERIES}:MC-2`],
    source: eb(MACLAURIN_SERIES, 'Core Understanding — the Maclaurin series as the Taylor series centered at a=0, the odd/even power parity of sin x and cos x as a direct structural consequence of their own symmetry, and building new series via substitution/differentiation/integration into the four standard ones rather than re-deriving from scratch'),
  },
  {
    conceptId: TAYLOR_REMAINDER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'math.calc.taylor-series builds the infinite series f(x)=∑f⁽ⁿ⁾(a)/n!·(x−a)ⁿ, but any REAL '
      + 'computation truncates this after finitely many terms, using the nth Taylor polynomial '
      + 'Tₙ(x) as a practical approximation. The Taylor remainder Rₙ(x)=f(x)−Tₙ(x) measures exactly '
      + 'how far off this truncated approximation is — it is the TRUE ERROR, never some additional '
      + 'term still waiting to be added in the usual sense of extending the series further.\n\n'
      + 'The Lagrange error bound gives a way to CONTROL this error without knowing f(x)\'s exact '
      + 'value: |Rₙ(x)|≤M|x−a|ⁿ⁺¹/(n+1)!, where M is any number that upper-bounds |f⁽ⁿ⁺¹⁾(t)| for '
      + 'every t between a and x. Finding a VALID M requires genuinely determining the worst-case '
      + '(maximum) size of the (n+1)th derivative over that ENTIRE interval — using anything '
      + 'smaller than the true maximum UNDERSTATES the bound, since the actual error could then '
      + 'exceed a bound built on too small an M, making the guarantee invalid. A rigorously safe '
      + 'but slightly loose M (e.g. using |sin t|≤1 for all t, rather than computing sin(0.5)\'s '
      + 'exact value) is preferable to a tighter but unverified one.\n\n'
      + 'This machinery is genuinely useful for PRECISION CONTROL: given a target accuracy (e.g. '
      + '"error under 10⁻⁶"), the inequality M|x−a|ⁿ⁺¹/(n+1)!<(target error) can be solved directly '
      + 'for the smallest sufficient n — telling you in advance exactly how many terms a '
      + 'computation needs, without first computing any terms and checking afterward.',
    targetedMisconceptions: [`${TAYLOR_REMAINDER}:MC-1`, `${TAYLOR_REMAINDER}:MC-2`],
    source: eb(TAYLOR_REMAINDER, 'Core Understanding — the Taylor remainder as the true error between f(x) and its Taylor polynomial (never the next series term), the Lagrange error bound requiring a rigorously verified genuine maximum M over the whole interval, and solving the error inequality for the minimum n before computing anything'),
  },
  {
    conceptId: DIVERGENCE_TEST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The theorem: if ∑aₙ converges to L, then the partial sums Sₙ→L and Sₙ₋₁→L, and since '
      + 'aₙ=Sₙ−Sₙ₋₁, lim aₙ=L−L=0. Used in its CONTRAPOSITIVE form — the way it is actually '
      + 'applied — if lim aₙ≠0 (or the limit does not exist), then ∑aₙ DIVERGES.\n\n'
      + 'The two-line usage protocol: (1) compute lim aₙ; (2) if nonzero or nonexistent, the series '
      + 'DIVERGES — done; if zero, the test is INCONCLUSIVE and a different test is required. This '
      + 'inconclusive case is the test\'s entire limitation: lim aₙ=0 is NECESSARY for convergence, '
      + 'but NOT SUFFICIENT — a series whose terms shrink to zero may still diverge. The harmonic '
      + 'series ∑1/n is the canonical, mandatory counterexample: 1/n→0, yet the series diverges.\n\n'
      + "The Divergence Test's practical value is SPEED: as the cheapest possible check, it should "
      + 'always be applied FIRST, before any comparison, ratio, or integral test. Two related '
      + 'confusions must be kept separate: the limit of the individual TERMS (lim aₙ) is a '
      + 'genuinely different sequence from the limit of the PARTIAL SUMS (lim Sₙ) — a convergent '
      + 'series always has lim aₙ=0, but its actual sum lim Sₙ is typically a nonzero number. And '
      + '"the harmonic series converges slowly" is not a meaningful description — ∑1/n either has '
      + 'a finite limit (converges) or it doesn\'t (diverges); its partial sums genuinely grow '
      + 'without bound (like ln n), with no intermediate state of "partial convergence."',
    targetedMisconceptions: [`${DIVERGENCE_TEST}:MC-1`, `${DIVERGENCE_TEST}:MC-2`, `${DIVERGENCE_TEST}:MC-3`],
    source: eb(DIVERGENCE_TEST, 'Core Understanding — the Divergence Test\'s proof and contrapositive usage as a one-directional divergence-only tool, the distinction between the term limit lim a_n and the partial-sum limit lim S_n, and slow divergence still being genuine divergence'),
  },
]

export const MATHEMATICS_CALC_MACLAURIN_SERIES_TAYLOR_REMAINDER_SEQ_DIVERGENCE_TEST_PROBES: SeedProbe[] = [
  {
    conceptId: MACLAURIN_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'sin(−x)=−sin(x) for every x (sin is an odd function). What does this force about the coefficient of x² in sin x\'s Maclaurin series?',
    choices: [
      { text: 'The x² coefficient must be exactly zero — an even-power term is itself an even function, and an even function cannot sum to an odd one unless its coefficient vanishes; sin x\'s series can only contain ODD powers (x, x³, x⁵, ...)', isCorrect: true },
      { text: 'The x² coefficient can be any nonzero value, since Maclaurin coefficients are computed independently and the function\'s own symmetry has no bearing on individual terms', isCorrect: false, misconceptionId: `${MACLAURIN_SERIES}:MC-1` },
      { text: 'The x² coefficient must equal the x¹ coefficient, since both are low-order terms in an odd function\'s series', isCorrect: false, misconceptionId: `${MACLAURIN_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${MACLAURIN_SERIES}:MC-1`],
    source: eb(MACLAURIN_SERIES, 'Demonstration 1 — writing out sin x\'s first three nonzero terms (all odd powers) and connecting this to sin(-x)=-sin(x) forcing every even-power coefficient to vanish, directly breaking odd-even-power-parity-violated-when-reconstructing-standard-series'),
  },
  {
    conceptId: MACLAURIN_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To find e⁻ˣ²\'s Maclaurin series, should you compute e⁻ˣ²\'s successive derivatives directly from the definition, or substitute −x² into eˣ\'s already-known series?',
    choices: [
      { text: 'Substitute −x² into eˣ=∑xⁿ/n! to get e⁻ˣ²=∑(−x²)ⁿ/n! — this reaches the identical series far more efficiently than the genuinely tedious process of computing e⁻ˣ²\'s derivatives directly from the Maclaurin definition', isCorrect: true },
      { text: 'Always compute the successive derivatives directly from the Maclaurin formula\'s own definition, since that is the only mathematically correct way to derive any new series', isCorrect: false, misconceptionId: `${MACLAURIN_SERIES}:MC-2` },
      { text: 'Either approach is equally efficient, so which one to use is purely a matter of personal preference with no genuine difference in effort', isCorrect: false, misconceptionId: `${MACLAURIN_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${MACLAURIN_SERIES}:MC-2`],
    source: eb(MACLAURIN_SERIES, 'Demonstration 2 — finding e^(-x^2)\'s Maclaurin series by substituting -x^2 into e^x\'s series, contrasted against tedious direct differentiation, directly breaking new-series-derived-via-direct-differentiation-instead-of-reusing-known-series'),
  },
  {
    conceptId: MACLAURIN_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The Maclaurin series is defined as the Taylor series with the center fixed at a=0. Does this make it a genuinely different kind of construction, requiring its own separate derivation method?',
    choices: [
      { text: 'No — it is the IDENTICAL Taylor-series construction f(x)=∑f⁽ⁿ⁾(a)/n!·(x−a)ⁿ with the single number a set to 0, giving f(x)=∑f⁽ⁿ⁾(0)/n!·xⁿ; nothing about the underlying method changes', isCorrect: true },
      { text: 'Yes — the Maclaurin series is a fundamentally different topic from the Taylor series, requiring its own distinct derivation technique unrelated to the general Taylor construction', isCorrect: false, misconceptionId: `${MACLAURIN_SERIES}:MC-2` },
      { text: 'Yes, since fixing the center at zero changes the underlying formula\'s structure into something categorically different from the general Taylor series', isCorrect: false, misconceptionId: `${MACLAURIN_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${MACLAURIN_SERIES}:MC-2`],
    source: eb(MACLAURIN_SERIES, 'Anti-analogy — the Maclaurin series is not a separate topic requiring its own derivation method distinct from the Taylor series, it is the identical construction with a fixed at zero'),
  },
  {
    conceptId: TAYLOR_REMAINDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=eˣ approximated by T₂(x)=1+x+x²/2 at a=0, is R₂(x) exactly equal to the next series term x³/3!, or something else?',
    choices: [
      { text: 'Something else — R₂(x)=eˣ−T₂(x) is the TRUE error at a given x; the Lagrange bound involves an UNKNOWN point\'s derivative value, not the fixed coefficient the next series term would use, so the two are structurally different quantities', isCorrect: true },
      { text: 'Yes — the remainder after truncating at degree 2 is always exactly the next term the infinite series would add, x³/3!', isCorrect: false, misconceptionId: `${TAYLOR_REMAINDER}:MC-1` },
      { text: 'Yes, since the remainder and the next series term are simply two different names for the identical mathematical quantity', isCorrect: false, misconceptionId: `${TAYLOR_REMAINDER}:MC-1` },
    ],
    targetedMisconceptions: [`${TAYLOR_REMAINDER}:MC-1`],
    source: eb(TAYLOR_REMAINDER, 'Demonstration 1 — showing R2(x)=e^x-T2(x) is the true error contrasted against the incorrect assumption R2(x)=x^3/3! exactly, directly breaking remainder-confused-with-the-next-series-term-rather-than-the-true-bounded-error'),
  },
  {
    conceptId: TAYLOR_REMAINDER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To bound the error approximating sin(0.5) by its degree-3 Taylor polynomial, is it acceptable to pick M by casually estimating sin(0.5)\'s own value, rather than verifying the true maximum of the relevant derivative across the whole interval?',
    choices: [
      { text: 'No — a valid M must be RIGOROUSLY verified as the genuine worst-case (maximum) of |f⁽ⁿ⁺¹⁾(t)| over the ENTIRE relevant interval; for this case, the safe choice is M=1 (since |sin t|≤1 for all t), not a smaller, unverified estimate', isCorrect: true },
      { text: 'Yes — any reasonable-looking number that seems close to the derivative\'s value works fine as M, as long as the resulting bound looks plausible', isCorrect: false, misconceptionId: `${TAYLOR_REMAINDER}:MC-2` },
      { text: 'Yes, since using a smaller M just makes the resulting error bound tighter and therefore more useful, with no downside', isCorrect: false, misconceptionId: `${TAYLOR_REMAINDER}:MC-2` },
    ],
    targetedMisconceptions: [`${TAYLOR_REMAINDER}:MC-2`],
    source: eb(TAYLOR_REMAINDER, 'Demonstration 2 — bounding the error approximating sin(0.5) using the safe rigorously-justified M=1 rather than an unverified smaller estimate, directly breaking bound-M-chosen-without-rigorously-verifying-it-is-a-true-upper-bound'),
  },
  {
    conceptId: TAYLOR_REMAINDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To guarantee approximating e^0.1 with error under 10⁻⁶ using eˣ\'s Taylor series at a=0, can the minimum number of needed terms be determined before computing any of them?',
    choices: [
      { text: 'Yes — solving the error inequality M|x−a|ⁿ⁺¹/(n+1)!<10⁻⁶ directly for the smallest sufficient n tells you in advance exactly how many terms are needed, without first computing any terms and checking afterward', isCorrect: true },
      { text: 'No — the only way to guarantee a target precision is to compute successive terms one at a time and check the running total after each one until the desired accuracy is reached', isCorrect: false, misconceptionId: `${TAYLOR_REMAINDER}:MC-2` },
      { text: 'No, since the number of terms needed for any target precision can only be determined empirically by trial and error, never analytically from the error bound formula', isCorrect: false, misconceptionId: `${TAYLOR_REMAINDER}:MC-2` },
    ],
    targetedMisconceptions: [`${TAYLOR_REMAINDER}:MC-2`],
    source: eb(TAYLOR_REMAINDER, 'Demonstration 3 — determining how many terms of e^x\'s Taylor series are needed for error under 10^-6 by solving the error inequality directly for the smallest sufficient n'),
  },
  {
    conceptId: DIVERGENCE_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∑1/n, ∑1/n², and ∑(1/2)ⁿ, all three series have terms shrinking to zero (aₙ→0). Can the Divergence Test alone distinguish which of these converge and which diverge?',
    choices: [
      { text: 'No — the Divergence Test only ever proves DIVERGENCE, never convergence; all three series give aₙ→0, yet ∑1/n diverges while ∑1/n² and ∑(1/2)ⁿ converge, proving the test cannot distinguish them and a different test is needed', isCorrect: true },
      { text: 'Yes — since all three series have terms approaching zero, the Divergence Test correctly concludes that all three of them converge', isCorrect: false, misconceptionId: `${DIVERGENCE_TEST}:MC-1` },
      { text: 'Yes, because a term limit of zero is both necessary and sufficient for the Divergence Test to confirm convergence', isCorrect: false, misconceptionId: `${DIVERGENCE_TEST}:MC-1` },
    ],
    targetedMisconceptions: [`${DIVERGENCE_TEST}:MC-1`],
    source: eb(DIVERGENCE_TEST, 'Demonstration 1 — presenting three series with a_n to 0 (one diverges, two converge), showing the Divergence Test cannot distinguish any of them, directly breaking Divergence-Test-proves-convergence'),
  },
  {
    conceptId: DIVERGENCE_TEST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For ∑(1/2)ⁿ, lim aₙ=0 (the individual terms shrink to zero) while lim Sₙ=2 (the actual sum). Are lim aₙ and lim Sₙ the same quantity?',
    choices: [
      { text: 'No — they are genuinely DIFFERENT sequences: lim aₙ is the limit of the individual terms (always 0 for a convergent series), while lim Sₙ is the limit of the running total (the actual sum, typically a nonzero number)', isCorrect: true },
      { text: 'Yes — since both use the same "lim" notation and both relate to the same series, they must refer to the identical numerical value', isCorrect: false, misconceptionId: `${DIVERGENCE_TEST}:MC-2` },
      { text: 'Yes, because if the individual terms approach 0, the running total built from those terms must also approach 0', isCorrect: false, misconceptionId: `${DIVERGENCE_TEST}:MC-2` },
    ],
    targetedMisconceptions: [`${DIVERGENCE_TEST}:MC-2`],
    source: eb(DIVERGENCE_TEST, 'Demonstration 2 — computing lim a_n=0 and lim S_n=2 side by side for sum (1/2)^n, confirming they are different numbers, directly breaking term-limit-equals-partial-sum-limit'),
  },
  {
    conceptId: DIVERGENCE_TEST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The harmonic series ∑1/n has partial sums that grow very slowly (like ln n). Is it accurate to describe this as "the harmonic series converges slowly"?',
    choices: [
      { text: 'No — the harmonic series genuinely DIVERGES (Sₙ→∞, no finite limit exists); a series either converges to a finite number or it doesn\'t, and "slow divergence" is still divergence, with no intermediate category of "partial convergence"', isCorrect: true },
      { text: 'Yes — since the partial sums grow so slowly, it is reasonable to describe the series as converging, just at a very gradual rate compared to other series', isCorrect: false, misconceptionId: `${DIVERGENCE_TEST}:MC-3` },
      { text: 'Yes, since a series whose terms shrink to zero this gradually should be classified as "converging to infinity" rather than simply diverging', isCorrect: false, misconceptionId: `${DIVERGENCE_TEST}:MC-3` },
    ],
    targetedMisconceptions: [`${DIVERGENCE_TEST}:MC-3`],
    source: eb(DIVERGENCE_TEST, 'Demonstration 3 — showing the harmonic series\' partial sums growing like ln n to infinity with no finite limit, directly breaking harmonic-converges-slowly'),
  },
]

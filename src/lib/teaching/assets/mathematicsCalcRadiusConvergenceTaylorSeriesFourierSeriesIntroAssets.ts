/**
 * Batch: radius-of-convergence, taylor-series, fourier-series-intro (math.calc).
 *
 * All three are math.calc concepts — this batch fully consumes the math.calc
 * frontier this campaign's math.seq excursion (Batches 86-90) was opened to
 * reach, leaving only math.calc.maclaurin-series and math.calc.
 * taylor-remainder (both newly ready once taylor-series is authored here)
 * plus math.calc.change-of-variables (blocked on unauthored math.linalg.
 * determinant, outside this excursion's scope) remaining in math.calc.
 * math.calc.taylor-series is the highest-value pick (2 unlocks: maclaurin-
 * series, taylor-remainder). math.calc.radius-of-convergence (requires
 * power-series + ratio-test, both authored Batch 90) and math.calc.
 * fourier-series-intro (requires definite-integral + trig-functions + math.
 * seq.series, all long-authored) round out the domain closure.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.{radius-of-convergence,
 * taylor-series,fourier-series-intro}.md.
 *
 *   RADIUS-OF-CONVERGENCE  radius-of-convergence — a ratio-test limit of 0
 *                 for EVERY x means R=INFINITY (universal convergence), the
 *                 OPPOSITE of R=0; the two endpoints x=a±R are two
 *                 genuinely DIFFERENT series once substituted and must be
 *                 checked SEPARATELY, never assumed to share the same fate.
 *   TAYLOR-SERIES  taylor-series — the Taylor series is linearization's own
 *                 DIRECT CONTINUATION with higher-derivative correction
 *                 terms, never an unrelated new formula; its coefficients
 *                 are FORCED by the function's own derivatives, never
 *                 freely chosen like a general power series; converging to
 *                 SOMETHING and converging to the function itself are
 *                 genuinely distinct claims, valid only within the radius
 *                 of convergence.
 *   FOURIER-SERIES-INTRO  fourier-series-intro — a Fourier series is
 *                 genuinely INFINITE (a finite truncation only approximates,
 *                 sometimes persistently so, per the Gibbs phenomenon); the
 *                 orthogonality integrals are a FILTER, not an arbitrary
 *                 formula — every term but one vanishes by orthogonality;
 *                 a Fourier coefficient is literally an inner-product
 *                 projection onto an orthogonal basis function.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RADIUS_OF_CONVERGENCE = 'math.calc.radius-of-convergence'
const TAYLOR_SERIES = 'math.calc.taylor-series'
const FOURIER_SERIES_INTRO = 'math.calc.fourier-series-intro'

export const MATHEMATICS_CALC_RADIUS_CONVERGENCE_TAYLOR_SERIES_FOURIER_SERIES_INTRO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RADIUS_OF_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Computing L=lim|cₙ₊₁(x−a)ⁿ⁺¹/cₙ(x−a)ⁿ| and solving L<1 for x directly determines the '
      + 'RADIUS of convergence R — the series converges absolutely for |x−a|<R and diverges for '
      + '|x−a|>R. A special case deserves explicit attention: if the ratio test\'s limit is 0 '
      + 'REGARDLESS of x (as happens whenever a factorial or similarly fast-growing denominator '
      + 'dominates), the inequality L<1 holds for EVERY value of x, meaning R=INFINITY — the series '
      + 'converges everywhere, not nowhere.\n\n'
      + 'The ratio test is, by its own nature, INCONCLUSIVE exactly where L=1 — and this happens '
      + 'precisely AT the two endpoints x=a−R and x=a+R. The radius computation says NOTHING about '
      + 'behavior at these two specific points; each endpoint must be substituted into the ORIGINAL '
      + 'series and tested SEPARATELY, typically with a different tool entirely (the alternating '
      + 'series test, a comparison test, or the divergence test) — never the ratio test that found '
      + 'R in the first place.\n\n'
      + 'Critically, the two endpoints are two GENUINELY DIFFERENT series once substituted — there '
      + 'is no structural reason they must behave the same way, and in fact they routinely don\'t. '
      + 'For ∑(x−1)ⁿ/n (R=1), x=2 gives the divergent harmonic series while x=0 gives the '
      + 'convergent alternating harmonic series — the interval is [0,2), not symmetric. The full '
      + 'INTERVAL of convergence is only complete once both endpoints have been checked '
      + 'individually and their inclusion or exclusion stated explicitly.',
    targetedMisconceptions: [`${RADIUS_OF_CONVERGENCE}:MC-1`, `${RADIUS_OF_CONVERGENCE}:MC-2`],
    source: eb(RADIUS_OF_CONVERGENCE, 'Core Understanding — a ratio-test limit of 0 for every x means R=infinity not R=0, the ratio test is inconclusive exactly at the two endpoints which must be checked separately since they are genuinely different series once substituted'),
  },
  {
    conceptId: TAYLOR_SERIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'math.calc.linearization already built the BEST LINEAR (degree-1) approximation to f near a: '
      + 'L(x)=f(a)+f\'(a)(x−a). The Taylor series CONTINUES this directly: adding a quadratic term '
      + 'f\'\'(a)/2!·(x−a)² additionally matches f\'s curvature at a; adding a cubic term matches the '
      + 'next derivative; and so on indefinitely. The Taylor series is not a new, unrelated idea, '
      + "but linearization's own natural continuation to arbitrarily many terms.\n\n"
      + 'math.calc.power-series studies GENERAL power series ∑cₙ(x−a)ⁿ where the coefficients cₙ '
      + 'can be any numbers whatsoever. The Taylor series is the SPECIFIC instance where '
      + 'cₙ=f⁽ⁿ⁾(a)/n! — computed directly from the function\'s own derivatives at a, not chosen '
      + 'freely. The coefficients are FORCED by the function once a is fixed, never a free design '
      + 'choice the way a general power series\'s coefficients are (e.g. every derivative of eˣ '
      + 'equals eˣ itself, forcing cₙ=1/n!).\n\n'
      + 'CONVERGENCE and EQUALITY to f are related but genuinely DISTINCT questions: the radius of '
      + 'convergence R tells you WHERE the series converges to SOME value — but whether that value '
      + 'actually EQUALS f(x) is a separate question. The geometric series ∑xⁿ (the Taylor series '
      + 'of f(x)=1/(1−x) at a=0) genuinely equals f(x) within |x|<1, but at x=2 the series diverges '
      + 'entirely even though f(2)=−1 is perfectly well-defined — the series and the function '
      + 'simply part ways outside the radius of convergence.',
    targetedMisconceptions: [`${TAYLOR_SERIES}:MC-1`, `${TAYLOR_SERIES}:MC-2`, `${TAYLOR_SERIES}:MC-3`],
    source: eb(TAYLOR_SERIES, 'Core Understanding — the Taylor series as linearization\'s direct continuation with coefficients forced by the function\'s own derivatives rather than freely chosen, and convergence versus equality to the function being genuinely distinct questions'),
  },
  {
    conceptId: FOURIER_SERIES_INTRO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A periodic function f (period 2π) is represented as f(x)=a₀/2+∑(aₙcos(nx)+bₙsin(nx)) — a '
      + 'genuinely INFINITE series. Except for very special functions, no finite truncation '
      + 'exactly equals f; the series (or its limit of partial sums) is genuinely required. The '
      + 'square wave (1 on (0,π), −1 on (−π,0)) has Fourier series (4/π)(sin x+sin(3x)/3+⋯), an '
      + 'infinite series of odd harmonics; no finite truncation reproduces the sharp jumps, and '
      + 'even a many-term partial sum famously OVERSHOOTS near the jump (the Gibbs phenomenon) '
      + 'rather than eliminating the error.\n\n'
      + 'The coefficients are recovered via the ORTHOGONALITY INTEGRALS aₙ=(1/π)∫f(x)cos(nx)dx and '
      + 'bₙ=(1/π)∫f(x)sin(nx)dx. These work because ∫sin(mx)sin(nx)dx=0 whenever m≠n (similarly for '
      + 'cosine pairs and every mixed pair) — ORTHOGONALITY. Substituting the full series into one '
      + 'of these integrals and integrating term by term, every term EXCEPT the one matching '
      + 'frequency n vanishes by orthogonality, leaving exactly the single coefficient being '
      + 'solved for, cleanly isolated — the coefficient formulas are the direct consequence of '
      + 'this filtering property, not an arbitrary rule.\n\n'
      + 'The functions {1,cos(x),sin(x),cos(2x),sin(2x),...} form an ORTHOGONAL set under the '
      + 'L²-inner-product ⟨f,g⟩=∫fg dx. Computing a Fourier coefficient like bₙ is literally '
      + 'computing ⟨f,sin(nx)⟩ (up to a normalizing constant) — exactly the same operation as '
      + "finding one coordinate of a vector by taking its inner product against an orthogonal "
      + 'basis vector, just applied to an infinite-dimensional space of functions instead of '
      + 'finitely many vectors.',
    targetedMisconceptions: [`${FOURIER_SERIES_INTRO}:MC-1`, `${FOURIER_SERIES_INTRO}:MC-2`, `${FOURIER_SERIES_INTRO}:MC-3`],
    source: eb(FOURIER_SERIES_INTRO, 'Core Understanding — a Fourier series is genuinely infinite (per the square wave and Gibbs phenomenon), the orthogonality integrals filter out every term but one, and a Fourier coefficient is an inner-product projection onto an orthogonal function basis'),
  },
]

export const MATHEMATICS_CALC_RADIUS_CONVERGENCE_TAYLOR_SERIES_FOURIER_SERIES_INTRO_PROBES: SeedProbe[] = [
  {
    conceptId: RADIUS_OF_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∑(x−2)ⁿ/n!, the ratio test gives lim|(x−2)/(n+1)|=0 for EVERY value of x. Does this mean the radius of convergence R=0, or R=∞?',
    choices: [
      { text: 'R=∞ — the ratio test\'s criterion is L<1, and 0<1 is satisfied unconditionally for every x, meaning the series converges everywhere, not nowhere', isCorrect: true },
      { text: 'R=0, since a ratio-test limit of 0 signals the smallest possible radius, meaning the series converges only at the single center point', isCorrect: false, misconceptionId: `${RADIUS_OF_CONVERGENCE}:MC-1` },
      { text: 'R=0, because "0" visually and intuitively signals a vanishing region of convergence', isCorrect: false, misconceptionId: `${RADIUS_OF_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${RADIUS_OF_CONVERGENCE}:MC-1`],
    source: eb(RADIUS_OF_CONVERGENCE, 'Demonstration 1 — computing the ratio test limit of 0 for every x for a factorial series, concluding R=infinity rather than R=0, directly breaking ratio-test-limit-of-zero-misinterpreted-as-radius-zero'),
  },
  {
    conceptId: RADIUS_OF_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Once you find R=∞ for a series (as above), does the radius formula itself tell you what happens at any specific boundary point of the domain?',
    choices: [
      { text: 'The radius formula only answers the |x−a|<R versus |x−a|>R question; when there ARE finite endpoints (a general R, not R=∞), the ratio test is silent exactly there and each endpoint must be substituted into the original series and tested separately with a different method', isCorrect: true },
      { text: 'Yes — once the radius is computed, that same computation automatically also determines convergence or divergence at any endpoint of the interval', isCorrect: false, misconceptionId: `${RADIUS_OF_CONVERGENCE}:MC-1` },
      { text: 'Yes, since the ratio test that found R is a complete test that leaves no further convergence questions unanswered', isCorrect: false, misconceptionId: `${RADIUS_OF_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${RADIUS_OF_CONVERGENCE}:MC-1`],
    source: eb(RADIUS_OF_CONVERGENCE, 'Mental Model — the ratio test is silent exactly at the two endpoints, that silence is a demand for a separate check, not an answer'),
  },
  {
    conceptId: RADIUS_OF_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For ∑(x−1)ⁿ/n (R=1), substituting x=2 gives the harmonic series ∑1/n (diverges), and substituting x=0 gives the alternating harmonic series ∑(−1)ⁿ/n (converges). Must both endpoints of an interval of convergence always behave the same way?',
    choices: [
      { text: 'No — the two endpoints substitute into two GENUINELY DIFFERENT series (here one non-alternating, one alternating) and must be judged independently; this series\' true interval is [0,2), not symmetric', isCorrect: true },
      { text: 'Yes — since both endpoints are the same distance from the center, they must always either both converge or both diverge', isCorrect: false, misconceptionId: `${RADIUS_OF_CONVERGENCE}:MC-2` },
      { text: 'Yes, because the radius of convergence formula is symmetric, so its two boundary points necessarily share the identical convergence behavior', isCorrect: false, misconceptionId: `${RADIUS_OF_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${RADIUS_OF_CONVERGENCE}:MC-2`],
    source: eb(RADIUS_OF_CONVERGENCE, 'Demonstration 2 — showing x=2 gives the divergent harmonic series while x=0 gives the convergent alternating harmonic series for the same series, directly breaking endpoints-assumed-to-behave-identically-without-separate-checking'),
  },
  {
    conceptId: TAYLOR_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The linearization of cos x at a=0 is the constant 1. Is the Taylor series an entirely new, unrelated formula, or an extension of this same linearization?',
    choices: [
      { text: 'An extension — adding the quadratic correction term −x²/2 to the linearization 1 gives 1−x²/2, directly continuing the same approximation with one more term; the Taylor series is linearization carried forward, never a separate idea', isCorrect: true },
      { text: 'An entirely new, unrelated formula that happens to apply to the same function, with its own separate derivation unconnected to linearization', isCorrect: false, misconceptionId: `${TAYLOR_SERIES}:MC-1` },
      { text: 'An entirely new formula, since linearization only produces a single linear approximation while the Taylor series produces an infinite sum', isCorrect: false, misconceptionId: `${TAYLOR_SERIES}:MC-1` },
    ],
    targetedMisconceptions: [`${TAYLOR_SERIES}:MC-1`],
    source: eb(TAYLOR_SERIES, 'Demonstration 1 — extending cos x\'s linearization at a=0 by adding the quadratic term to get 1-x^2/2, directly breaking Taylor-series-assumed-unrelated-to-linearization'),
  },
  {
    conceptId: TAYLOR_SERIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "For eˣ's Taylor series at a=0, can the coefficients cₙ be freely chosen or adjusted, the way a general power series's coefficients can?",
    choices: [
      { text: 'No — the coefficients are FORCED by the function\'s own derivatives: every derivative of eˣ equals eˣ itself, so f⁽ⁿ⁾(0)=1 for all n, forcing cₙ=1/n! with no freedom of choice once the function and center are fixed', isCorrect: true },
      { text: 'Yes — since a Taylor series is a specific kind of power series, its coefficients can be freely assigned the same way any general power series\'s coefficients can', isCorrect: false, misconceptionId: `${TAYLOR_SERIES}:MC-2` },
      { text: 'Yes, as long as the resulting series still converges somewhere, any choice of coefficients is equally valid for representing the function', isCorrect: false, misconceptionId: `${TAYLOR_SERIES}:MC-2` },
    ],
    targetedMisconceptions: [`${TAYLOR_SERIES}:MC-2`],
    source: eb(TAYLOR_SERIES, "Demonstration 2 — computing e^x's Taylor coefficients directly from its derivatives, forced to be 1/n!, directly breaking Taylor-coefficients-assumed-freely-chosen"),
  },
  {
    conceptId: TAYLOR_SERIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The geometric series ∑xⁿ is the Taylor series of f(x)=1/(1−x) at a=0, with radius of convergence R=1. At x=2, f(2)=−1 is a perfectly well-defined number. Does the series equal −1 there too?',
    choices: [
      { text: 'No — the series diverges entirely at x=2 (outside R=1), even though f(2)=−1 is well-defined; convergence and equality to f are genuinely distinct questions, and the series is only guaranteed to equal f WITHIN the radius of convergence', isCorrect: true },
      { text: 'Yes — since the series equals the function wherever the function itself is defined, and 1/(1−x) is defined at x=2, the series must equal −1 there as well', isCorrect: false, misconceptionId: `${TAYLOR_SERIES}:MC-3` },
      { text: 'Yes, because a Taylor series and its generating function are always identical for every value where either one is defined', isCorrect: false, misconceptionId: `${TAYLOR_SERIES}:MC-3` },
    ],
    targetedMisconceptions: [`${TAYLOR_SERIES}:MC-3`],
    source: eb(TAYLOR_SERIES, 'Demonstration 3 — verifying the geometric series equals 1/(1-x) at x=0.5 but diverges at x=2 despite the function being well-defined there, directly breaking convergence-assumed-to-guarantee-equality-everywhere'),
  },
  {
    conceptId: FOURIER_SERIES_INTRO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can a square wave\'s Fourier series be captured exactly by using only finitely many sine terms?',
    choices: [
      { text: 'No — the representation is genuinely INFINITE; no finite truncation exactly reproduces the sharp jumps, and even a many-term partial sum famously OVERSHOOTS near the jump (the Gibbs phenomenon) rather than eliminating the error as more terms are added', isCorrect: true },
      { text: 'Yes — like most series encountered in practice, only the first few terms are needed to capture the function exactly, with further terms being optional refinement', isCorrect: false, misconceptionId: `${FOURIER_SERIES_INTRO}:MC-1` },
      { text: 'Yes, since adding enough terms always eventually eliminates the overshoot near a jump discontinuity completely', isCorrect: false, misconceptionId: `${FOURIER_SERIES_INTRO}:MC-1` },
    ],
    targetedMisconceptions: [`${FOURIER_SERIES_INTRO}:MC-1`],
    source: eb(FOURIER_SERIES_INTRO, 'Demonstration 1 — the genuinely-infinite square wave and the Gibbs phenomenon\'s persistent overshoot, directly breaking Fourier-series-assumed-finite'),
  },
  {
    conceptId: FOURIER_SERIES_INTRO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When computing b₁ by multiplying the Fourier series by sin(x) and integrating, why does every term EXCEPT the n=1 term vanish?',
    choices: [
      { text: 'By ORTHOGONALITY — ∫sin(mx)sin(nx)dx=0 whenever m≠n, so multiplying by sin(x) and integrating filters out every other frequency\'s term, leaving exactly the coefficient being solved for; this is not an arbitrary formula but a direct consequence of that filtering property', isCorrect: true },
      { text: 'Because the coefficient formulas are simply memorized rules that happen to isolate one coefficient at a time, with no deeper structural reason behind them', isCorrect: false, misconceptionId: `${FOURIER_SERIES_INTRO}:MC-2` },
      { text: 'Because integrating any trigonometric expression over a full period always produces zero regardless of which term is being examined', isCorrect: false, misconceptionId: `${FOURIER_SERIES_INTRO}:MC-2` },
    ],
    targetedMisconceptions: [`${FOURIER_SERIES_INTRO}:MC-2`],
    source: eb(FOURIER_SERIES_INTRO, 'Demonstration 2 — the full b1=2 orthogonality computation for f(x)=x explicitly connecting the result to every other term vanishing by orthogonality, directly breaking orthogonality-integrals-treated-as-arbitrary-formulas'),
  },
  {
    conceptId: FOURIER_SERIES_INTRO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is computing a Fourier coefficient like b₁=(1/π)∫f(x)sin(x)dx a completely different kind of operation from finding a vector\'s coordinate along one axis of an orthogonal basis?',
    choices: [
      { text: 'No — it is structurally the SAME operation: computing bₙ is literally computing an inner product ⟨f,sin(nx)⟩ (up to a normalizing constant), exactly like finding one vector coordinate via an inner product against an orthogonal basis vector, just applied to an infinite-dimensional space of functions', isCorrect: true },
      { text: 'Yes — Fourier-coefficient computation is a specialized calculus technique entirely unrelated to the general idea of projecting onto an orthogonal basis', isCorrect: false, misconceptionId: `${FOURIER_SERIES_INTRO}:MC-3` },
      { text: 'Yes, since inner products only apply to finite-dimensional vectors and cannot meaningfully be extended to an infinite space of functions', isCorrect: false, misconceptionId: `${FOURIER_SERIES_INTRO}:MC-3` },
    ],
    targetedMisconceptions: [`${FOURIER_SERIES_INTRO}:MC-3`],
    source: eb(FOURIER_SERIES_INTRO, 'Demonstration 3 — re-expressing the identical b1=2 computation as an inner product, directly breaking Fourier-coefficients-treated-as-unrelated-to-orthogonal-projection'),
  },
]

/**
 * Batch: error-analysis, numerical-integration, splines (math.num).
 *
 * Fresh Phase 0 frontier recompute after the floating-point/interpolation/
 * qr-algorithm batch found 4 concepts ready (error-analysis,
 * numerical-integration, splines, svd); this batch selects the first 3
 * (svd remains ready and is deferred to the next batch, keeping this batch
 * at the standard 2-3 concept size). error-analysis requires only
 * floating-point (now authored); numerical-integration and splines both
 * require interpolation (now authored) — numerical-integration also
 * requires math.calc.definite-integral, already authored/certified.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.num.
 * {error-analysis,numerical-integration,splines}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.num's
 * established domain baseline (set by the floating-point/interpolation/
 * qr-algorithm batch). error-analysis's content (condition numbers,
 * backward/forward error analysis, Wilkinson's theorem) and numerical-
 * integration/splines' content (Simpson's Rule error orders, Runge's
 * phenomenon avoidance, B-spline control-point semantics) are all genuinely
 * undergraduate numerical-analysis material, consistent with every other
 * math.num concept authored so far.
 *
 *   ERROR-ANALYSIS  Roundoff and truncation are NEVER the same error
 *           source — roundoff lives at the arithmetic/storage level while
 *           truncation lives at the algorithm level, and conflating them
 *           is a language-contamination misconception; a small relative
 *           INPUT error NEVER guarantees a small relative OUTPUT error —
 *           the condition number can amplify it dramatically; and
 *           backward error analysis is NEVER inherently harder to compute
 *           than forward error — it is often a simple closed-form residual.
 *   NUMERICAL-INTEGRATION  More quadrature points is NEVER always better —
 *           diminishing returns and rounding accumulation eventually make
 *           further refinement WORSE, not better; Trapezoid and Simpson's
 *           Rule NEVER share the same accuracy order just because both use
 *           endpoint evaluations — Simpson's extra midpoint evaluation
 *           genuinely buys a higher $O(h^4)$ order; and the midpoint
 *           rectangle rule is NEVER lumped in with the inaccurate left/right
 *           rules — it independently achieves the same $O(h^2)$ order as
 *           Trapezoid.
 *   SPLINES  Higher smoothness is NEVER always better — matching smoothness
 *           to the application (and to whether data is noisy) matters more
 *           than defaulting to maximum continuity; splines avoid Runge's
 *           phenomenon specifically BECAUSE they fit piecewise LOW-degree
 *           polynomials, never some other unrelated property; and B-spline
 *           control points are NEVER interpolation points — they are
 *           weights that pull the curve toward them without the curve
 *           passing through them.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ERROR_ANALYSIS = 'math.num.error-analysis'
const NUMERICAL_INTEGRATION = 'math.num.numerical-integration'
const SPLINES = 'math.num.splines'

export const MATHEMATICS_NUM_ERROR_ANALYSIS_NUMERICAL_INTEGRATION_SPLINES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ERROR_ANALYSIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ROUNDOFF AND TRUNCATION ARE NEVER THE SAME ERROR SOURCE — ONE LIVES AT THE STORAGE LEVEL, '
      + 'THE OTHER AT THE ALGORITHM LEVEL: roundoff happens because a processor cannot store a '
      + 'value like $\\pi$ exactly — it rounds to the nearest representable double. Truncation '
      + 'happens at the algorithm level — stopping a Taylor series at degree 5 instead of '
      + 'infinitely many terms, or stopping Newton\'s method after 10 iterations. Using '
      + '"truncation error" to mean floating-point roundoff (chopping a decimal) is never '
      + 'correct — these are two independent sources: truncation error can be REDUCED by taking '
      + 'more terms or iterations, while roundoff error is fixed by the floating-point system\'s '
      + 'precision and cannot be reduced without changing precision itself.\n\n'
      + 'A SMALL RELATIVE INPUT ERROR NEVER GUARANTEES A SMALL RELATIVE OUTPUT ERROR — THE '
      + 'CONDITION NUMBER CAN AMPLIFY IT DRAMATICALLY: solving $Ax=b$ with a backward error '
      + '(residual) of $3\\times10^{-15}$ and a condition number $\\kappa(A)=5\\times10^7$ does '
      + 'NOT mean the solution is accurate to 15 decimal places. The forward error satisfies '
      + '$\\|\\tilde x-x\\|/\\|x\\|\\le\\kappa(A)\\cdot\\delta$, giving '
      + '$5\\times10^7\\times3\\times10^{-15}\\approx1.5\\times10^{-7}$ — only about 7 '
      + 'significant figures are trustworthy, not 15. Concluding an answer is accurate purely '
      + 'because the input or residual error is small, without checking the condition number\'s '
      + 'amplification, is never valid.\n\n'
      + 'BACKWARD ERROR ANALYSIS IS NEVER INHERENTLY HARDER TO COMPUTE THAN FORWARD ERROR — IT '
      + 'OFTEN HAS A SIMPLE CLOSED FORM: backward error analysis asks "what NEARBY problem does '
      + 'my algorithm solve EXACTLY?" For Gaussian elimination solving $Ax=b$, the computed '
      + '$\\tilde x$ is the exact solution to $(A+\\Delta A)\\tilde x=b$ where '
      + '$\\|\\Delta A\\|\\le O(nu)\\|A\\|$ (Wilkinson\'s theorem) — computable as the normalized '
      + 'residual $\\|A\\tilde x-b\\|/(\\|A\\|\\cdot\\|\\tilde x\\|)$, requiring only the computed '
      + '$\\tilde x$, $A$, and $b$, never the exact solution. Avoiding backward error analysis '
      + 'because it seems to require "running the algorithm in reverse" is never justified — for '
      + 'many algorithms it is USUALLY EASIER to compute than bounding the forward error directly.',
    targetedMisconceptions: [`${ERROR_ANALYSIS}:MC-1`, `${ERROR_ANALYSIS}:MC-2`, `${ERROR_ANALYSIS}:MC-3`],
    source: eb(ERROR_ANALYSIS, 'Core Understanding — roundoff and truncation never being the same error source since one lives at the storage level and the other at the algorithm level, a small relative input error never guaranteeing a small relative output error since the condition number can amplify it dramatically, and backward error analysis never being inherently harder to compute than forward error since it often has a simple closed form'),
  },
  {
    conceptId: NUMERICAL_INTEGRATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MORE QUADRATURE POINTS IS NEVER ALWAYS BETTER — DIMINISHING RETURNS AND ROUNDING '
      + 'ACCUMULATION EVENTUALLY SET IN: for $\\int_0^1e^x\\,dx$ using the Trapezoidal Rule, '
      + '$n=10$ gives error $\\approx4.2\\times10^{-4}$; $n=100$ gives $\\approx4.2\\times10^{-6}$; '
      + 'but at $n=10^6$, accumulated rounding error (roughly $n\\cdot u\\cdot|f|$ from summing $n$ '
      + 'terms) reaches $\\approx10^{-10}$, matching the theoretical truncation error — further '
      + 'refinement makes accuracy WORSE, never better. Increasing $n$ without limit, trusting '
      + "that a fast convergence rate always justifies more points, ignores that beyond a "
      + 'certain $n$ the returns diminish sharply (for smooth functions) or rounding begins to '
      + 'dominate.\n\n'
      + 'TRAPEZOID AND SIMPSON\'S RULE NEVER SHARE THE SAME ACCURACY ORDER JUST BECAUSE BOTH USE '
      + 'ENDPOINT EVALUATIONS: the Trapezoidal Rule fits a line (degree-1) per subinterval, '
      + 'giving error $O(h^2)$. Simpson\'s Rule fits a parabola (degree-2, using the midpoint as '
      + 'a third evaluation point), achieving $O(h^4)$ — a genuinely higher order. For '
      + '$\\int_0^1e^{x^2}dx$ to $(10^{-6})$ accuracy: Trapezoid needs $n\\ge666$; Simpson\'s needs '
      + 'only $n\\ge26$ — a 25x cost saving. Treating the two rules as equivalent because "both '
      + 'trap the area under a curve" misses that Simpson\'s extra midpoint point is what enables '
      + 'fitting a parabola, never a cosmetic difference.\n\n'
      + 'THE MIDPOINT RECTANGLE RULE IS NEVER LUMPED IN WITH THE INACCURATE LEFT/RIGHT RULES: the '
      + 'left rectangle rule uses $f(x_i)$ (the left endpoint) and is only $O(h)$. The midpoint '
      + 'rule uses $f((x_i+x_{i+1})/2)$ and achieves $O(h^2)$ — the SAME order as Trapezoid, with '
      + 'a smaller error constant (beating Trapezoid by a factor of 2 for the same number of '
      + 'evaluations). Dismissing "the rectangle rule" as categorically inaccurate, having only '
      + 'encountered the naive left-rectangle introduction, misses that the midpoint variant is '
      + 'genuinely competitive with Trapezoid.',
    targetedMisconceptions: [`${NUMERICAL_INTEGRATION}:MC-1`, `${NUMERICAL_INTEGRATION}:MC-2`, `${NUMERICAL_INTEGRATION}:MC-3`],
    source: eb(NUMERICAL_INTEGRATION, 'Core Understanding — more quadrature points never being always better since diminishing returns and rounding accumulation eventually set in, Trapezoid and Simpson\'s Rule never sharing the same accuracy order just because both use endpoint evaluations, and the midpoint rectangle rule never being lumped in with the inaccurate left/right rules'),
  },
  {
    conceptId: SPLINES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'HIGHER SMOOTHNESS IS NEVER ALWAYS BETTER — MATCH IT TO THE APPLICATION: a $C^0$ '
      + 'piecewise-linear curve connects data with straight lines — fast, simple, robust, error '
      + '$O(h^2)$. A $C^2$ natural cubic spline is visually smoother but costs a global '
      + 'tridiagonal solve. For 1000 noisy measurements, a $C^2$ natural cubic spline passes '
      + 'through EVERY noisy point exactly — the curve wiggles as much as the noise does. Always '
      + 'imposing $C^2$ conditions even when $C^1$ or $C^0$ suffices adds unnecessary complexity '
      + 'and can over-fit noise; the correct smoothness level matches the application — exact '
      + 'data warrants $C^2$ interpolation, noisy data warrants a smoothing approximation '
      + 'instead.\n\n'
      + 'SPLINES AVOID RUNGE\'S PHENOMENON BECAUSE THEY FIT PIECEWISE LOW-DEGREE POLYNOMIALS — '
      + 'NEVER BECAUSE OF SOME OTHER UNRELATED PROPERTY: a degree-10 global Lagrange interpolant '
      + 'through equally spaced points of $(1/(1+25x^2))$ has maximum error $\\approx10^{-3}$; '
      + 'degree-20 error $\\approx0.3$; degree-40 error $>10$ — worse with more points. A natural '
      + 'cubic spline on the same points has error $\\le Ch^4$ — stable and convergent. Each '
      + 'cubic piece only depends on the data at its two endpoints (plus knot continuity) — it '
      + 'has no incentive to pass through far-away data, unlike the global polynomial which must '
      + 'honor all points simultaneously.\n\n'
      + 'B-SPLINE CONTROL POINTS ARE NEVER INTERPOLATION POINTS — THEY ATTRACT THE CURVE WITHOUT '
      + 'IT PASSING THROUGH THEM: for a quadratic Bezier curve with control points $P_0=(0,0)$, '
      + '$P_1=(1,2)$, $P_2=(2,0)$: $B(t)=(1-t)^2P_0+2t(1-t)P_1+t^2P_2$. At $t=0$: $B=P_0$; at '
      + '$t=1$: $B=P_2$; but at $t=\\tfrac12$: $B=\\tfrac14P_0+\\tfrac12P_1+\\tfrac14P_2=(1,1)\\ne '
      + 'P_1$ — the curve does NOT pass through $P_1$. Believing B-splines and Bezier curves pass '
      + 'exactly through their control points confuses the interpolating framework (curve passes '
      + 'through every data point) with the approximating framework, where control points are '
      + 'weights in a weighted average that pull the curve toward them without touching it.',
    targetedMisconceptions: [`${SPLINES}:MC-1`, `${SPLINES}:MC-2`, `${SPLINES}:MC-3`],
    source: eb(SPLINES, 'Core Understanding — higher smoothness never being always better since matching it to the application matters, splines avoiding Runge\'s phenomenon because they fit piecewise low-degree polynomials never because of some other unrelated property, and B-spline control points never being interpolation points since they attract the curve without it passing through them'),
  },
]

export const MATHEMATICS_NUM_ERROR_ANALYSIS_NUMERICAL_INTEGRATION_SPLINES_PROBES: SeedProbe[] = [
  {
    conceptId: ERROR_ANALYSIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is truncation error the same thing as floating-point roundoff, or a different source entirely?',
    choices: [
      { text: 'A different source entirely — roundoff happens at the storage/arithmetic level (a processor cannot store π exactly) while truncation happens at the algorithm level (stopping an infinite process early); the two are independent and tracked separately', isCorrect: true },
      { text: 'The same thing — truncation error is just another name for floating-point roundoff', isCorrect: false, misconceptionId: `${ERROR_ANALYSIS}:MC-1` },
      { text: "They always occur together in equal amounts, so distinguishing them serves no practical purpose", isCorrect: false, misconceptionId: `${ERROR_ANALYSIS}:MC-1` },
    ],
    targetedMisconceptions: [`${ERROR_ANALYSIS}:MC-1`],
    source: eb(ERROR_ANALYSIS, 'Discovery Question 1 as a detection probe (verbatim) — whether truncation error is the same as roundoff, an answer treating them as the same confirming TRUNCATION-IS-ROUNDING'),
  },
  {
    conceptId: ERROR_ANALYSIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If the input\'s relative error is tiny, does that guarantee the output\'s relative error is tiny too?',
    choices: [
      { text: 'No — the condition number can amplify a tiny input error dramatically; a residual of 3×10^-15 with κ(A)=5×10^7 gives a forward error of only ~1.5×10^-7, roughly 7 trustworthy digits, not 15', isCorrect: true },
      { text: 'Yes — a tiny relative input error always guarantees a correspondingly tiny relative output error', isCorrect: false, misconceptionId: `${ERROR_ANALYSIS}:MC-2` },
      { text: "Yes, since condition numbers only matter for singular matrices, not well-posed problems", isCorrect: false, misconceptionId: `${ERROR_ANALYSIS}:MC-2` },
    ],
    targetedMisconceptions: [`${ERROR_ANALYSIS}:MC-2`],
    source: eb(ERROR_ANALYSIS, 'Discovery Question 2 as a detection probe (verbatim) — whether a tiny input error guarantees a tiny output error, an answer of "yes" confirming SMALL-RELATIVE-ERROR-MEANS-ACCURATE'),
  },
  {
    conceptId: ERROR_ANALYSIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does computing the backward error require inverting the entire algorithm?',
    choices: [
      { text: 'No — for Gaussian elimination, the backward error is the simple normalized residual ‖Ax̃-b‖/(‖A‖·‖x̃‖), computed only from the computed x̃, A, and b, never requiring the exact solution or reversing the algorithm', isCorrect: true },
      { text: 'Yes — computing a backward error always requires running the entire algorithm in reverse to find what problem it actually solved', isCorrect: false, misconceptionId: `${ERROR_ANALYSIS}:MC-3` },
      { text: "Yes, since backward error is fundamentally more expensive to compute than any forward error bound", isCorrect: false, misconceptionId: `${ERROR_ANALYSIS}:MC-3` },
    ],
    targetedMisconceptions: [`${ERROR_ANALYSIS}:MC-3`],
    source: eb(ERROR_ANALYSIS, 'Discovery Question 3 as a detection probe (verbatim) — whether computing backward error requires inverting the algorithm, an answer of "yes" confirming BACKWARD-ERROR-IS-HARDER-TO-COMPUTE'),
  },
  {
    conceptId: NUMERICAL_INTEGRATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does increasing the number of subintervals always improve the accuracy of a numerical integral, without limit?',
    choices: [
      { text: 'No — for ∫₀¹eˣdx, error keeps shrinking from n=10 to n=100, but by n=10^6 accumulated rounding error matches the truncation error and further refinement makes accuracy worse, not better', isCorrect: true },
      { text: 'Yes — increasing the number of subintervals always improves accuracy without limit, for any quadrature rule', isCorrect: false, misconceptionId: `${NUMERICAL_INTEGRATION}:MC-1` },
      { text: "Yes, since rounding error is negligible compared to truncation error at every value of n", isCorrect: false, misconceptionId: `${NUMERICAL_INTEGRATION}:MC-1` },
    ],
    targetedMisconceptions: [`${NUMERICAL_INTEGRATION}:MC-1`],
    source: eb(NUMERICAL_INTEGRATION, 'Discovery Question 1 as a detection probe (verbatim) — whether increasing n always improves accuracy without limit, an answer of "yes" confirming MORE-POINTS-ALWAYS-BETTER'),
  },
  {
    conceptId: NUMERICAL_INTEGRATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Do Trapezoid and Simpson's Rule have the same order of accuracy, since both use function values at interval endpoints?",
    choices: [
      { text: "No — Trapezoid fits a line per subinterval giving O(h²), while Simpson's Rule uses the midpoint as a third evaluation point to fit a parabola, achieving the genuinely higher O(h⁴); for ∫₀¹e^(x²)dx, Simpson's needs n≥26 versus Trapezoid's n≥666 for the same accuracy", isCorrect: true },
      { text: "Yes — Trapezoid and Simpson's Rule share exactly the same accuracy order because both use endpoint function evaluations", isCorrect: false, misconceptionId: `${NUMERICAL_INTEGRATION}:MC-2` },
      { text: "Yes, since both rules approximate the area under the same curve using the same number of evaluations per interval", isCorrect: false, misconceptionId: `${NUMERICAL_INTEGRATION}:MC-2` },
    ],
    targetedMisconceptions: [`${NUMERICAL_INTEGRATION}:MC-2`],
    source: eb(NUMERICAL_INTEGRATION, 'Discovery Question 2 as a detection probe (verbatim) — whether Trapezoid and Simpson\'s share the same order, an answer of "yes" confirming TRAPEZOID-SAME-AS-SIMPSON'),
  },
  {
    conceptId: NUMERICAL_INTEGRATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the midpoint rectangle rule just as inaccurate as the left-rectangle rule?',
    choices: [
      { text: 'No — the midpoint rule achieves O(h²), the same order as Trapezoid and with a smaller error constant, beating Trapezoid by a factor of 2; only the left/right rectangle rules are limited to O(h)', isCorrect: true },
      { text: 'Yes — every rectangle-rule variant, including the midpoint rule, shares the same O(h) accuracy as the left-rectangle rule', isCorrect: false, misconceptionId: `${NUMERICAL_INTEGRATION}:MC-3` },
      { text: "Yes, since evaluating at any single point per subinterval always produces the same error order regardless of which point is chosen", isCorrect: false, misconceptionId: `${NUMERICAL_INTEGRATION}:MC-3` },
    ],
    targetedMisconceptions: [`${NUMERICAL_INTEGRATION}:MC-3`],
    source: eb(NUMERICAL_INTEGRATION, 'Discovery Question 3 as a detection probe (verbatim) — whether the midpoint rule is as inaccurate as the left rule, an answer of "yes" confirming RECTANGLE-RULE-IS-WRONG'),
  },
  {
    conceptId: SPLINES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Should you always impose the maximum smoothness (C²) on a spline, regardless of the data?',
    choices: [
      { text: 'No — for 1000 noisy measurements, a C² natural cubic spline passes through every noisy point exactly and wiggles as much as the noise does; smoothness should match the application, with noisy data instead warranting a smoothing approximation', isCorrect: true },
      { text: 'Yes — maximum smoothness (C²) is always the correct choice for any spline, regardless of whether the underlying data is exact or noisy', isCorrect: false, misconceptionId: `${SPLINES}:MC-1` },
      { text: "Yes, since higher continuity at the knots can never make a fitted curve worse in any respect", isCorrect: false, misconceptionId: `${SPLINES}:MC-1` },
    ],
    targetedMisconceptions: [`${SPLINES}:MC-1`],
    source: eb(SPLINES, 'Discovery Question 1 as a detection probe (verbatim) — whether maximum smoothness should always be imposed, an answer of "yes" confirming MORE-SMOOTHNESS-ALWAYS-BETTER'),
  },
  {
    conceptId: SPLINES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does a B-spline curve pass through its control points?",
    choices: [
      { text: 'No — for a quadratic Bezier with control points P0,P1,P2, the curve at t=1/2 equals (1/4)P0+(1/2)P1+(1/4)P2, which is not P1; control points are weights that attract the curve without it passing through them (except at the very endpoints)', isCorrect: true },
      { text: 'Yes — B-splines and Bezier curves pass exactly through every one of their control points, the same way interpolating splines pass through data points', isCorrect: false, misconceptionId: `${SPLINES}:MC-2` },
      { text: "Yes, since a control polygon is simply a dot-to-dot outline that the curve traces exactly", isCorrect: false, misconceptionId: `${SPLINES}:MC-2` },
    ],
    targetedMisconceptions: [`${SPLINES}:MC-2`],
    source: eb(SPLINES, 'Discovery Question 3 as a detection probe (verbatim) — whether a B-spline curve passes through its control points, an answer of "yes" confirming SPLINE-CONTROL-POINTS-ARE-INTERPOLATION-POINTS'),
  },
  {
    conceptId: SPLINES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does a spline avoid Runge's phenomenon because of its piecewise low degree, or some other property?",
    choices: [
      { text: "Its piecewise low degree — a natural cubic spline's error stays bounded (≤Ch⁴) because each cubic piece only depends on its two endpoints, unlike a single global high-degree polynomial (error >10 at degree 40) which must honor every point simultaneously", isCorrect: true },
      { text: "Some other, unrelated property of splines — the degree of the pieces used has no bearing on whether Runge's phenomenon occurs", isCorrect: false, misconceptionId: `${SPLINES}:MC-3` },
      { text: "The fact that splines are always evaluated on evenly spaced knots, independent of the polynomial degree used per piece", isCorrect: false, misconceptionId: `${SPLINES}:MC-3` },
    ],
    targetedMisconceptions: [`${SPLINES}:MC-3`],
    source: eb(SPLINES, 'Discovery Question 2 as a detection probe (verbatim) — whether a spline avoids Runge\'s phenomenon due to degree or some other property, an answer naming an unrelated property confirming a misunderstanding of why piecewise low-degree fitting is what avoids it'),
  },
]

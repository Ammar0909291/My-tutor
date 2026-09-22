/**
 * Batch: logarithmic differentiation (math.calc), inverse trigonometric
 * functions and trigonometric identities (math.trig).
 *
 * Continues serving-asset coverage for math.calc (63/76 -> 64/76) and
 * opens math.trig (0/25 -> 3/25 in this campaign; math.trig already had
 * 3/25 authored from an earlier layer). math.calc.logarithmic-
 * differentiation became ready the instant math.calc.derivative-ln (prior
 * batch) was served. math.trig.inverse-trig became ready off the already-
 * authored math.trig.trig-functions and math.func.inverse-functions, and
 * directly unblocks math.calc.derivative-inverse-trig next. math.trig.
 * trig-identities is ready off trig-functions alone and unlocks
 * math.trig.trig-equations.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.logarithmic-differentiation.md,
 * math.trig.inverse-trig.md, and math.trig.trig-identities.md.
 *
 *   LOGDIFF   logarithmic-differentiation — the technique is REQUIRED
 *             only when BOTH the base and exponent vary with x
 *             simultaneously, never a universal substitute for the power
 *             rule; the final answer must be substituted back in terms
 *             of x, never left expressed in terms of the intermediate
 *             label y. Only 2 misconceptions in the EB entry: MC-1
 *             (used unnecessarily, "Moderate") gets FOUNDATIONAL and
 *             DEVELOPING, MC-2 (final substitution omitted,
 *             "Foundational") gets PROFICIENT.
 *   INVTRIG   inverse-trig — sin, cos, tan are NOT invertible on their
 *             full domains (periodicity violates injectivity), so their
 *             inverses are defined on a RESTRICTED domain/range;
 *             sin(arcsin x)=x always holds, but arcsin(sin x)=x only
 *             when x is already inside arcsin's own range — the two
 *             composition directions are genuinely asymmetric.
 *   TRIGIDENT trig-identities — the Pythagorean identity is the unit
 *             circle's own equation, never a separately memorized fact;
 *             a simplification target commonly admits MULTIPLE valid
 *             identity paths, never exactly one "correct" first move;
 *             taking a square root of a squared trig quantity requires a
 *             quadrant check, never just the positive root by reflex;
 *             sin does NOT distribute over addition like a linear
 *             function.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LOGDIFF = 'math.calc.logarithmic-differentiation'
const INVTRIG = 'math.trig.inverse-trig'
const TRIGIDENT = 'math.trig.trig-identities'

export const MATHEMATICS_CALC_LOG_DIFF_TRIG_INVERSE_IDENTITIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOGDIFF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Logarithmic differentiation is REQUIRED specifically for expressions where BOTH the base '
      + 'AND the exponent are functions of x simultaneously, like y=x^(sin x) — here, neither the '
      + 'power rule (which needs a CONSTANT exponent) nor the exponential-derivative rule (which '
      + 'needs a CONSTANT base) applies directly.\n\n'
      + 'The procedure: take ln of BOTH sides, converting the troublesome variable exponent into a '
      + 'coefficient via ln(u^v)=v·ln(u); differentiate implicitly (since d/dx[ln y]=(1/y)·y\' by '
      + 'the chain rule); solve algebraically for y\'; and finally SUBSTITUTE the original '
      + 'expression back in for y — the intermediate label y was only ever a convenience during '
      + 'the implicit-differentiation step, and the final derivative must be expressed purely in '
      + 'terms of x, never left with a lingering y.\n\n'
      + 'The technique has a SECOND, distinct use case: taking logs first also simplifies '
      + 'complicated products, quotients, and powers by converting them into sums, differences, '
      + 'and constant multiples — but it is never a universal replacement for the ordinary power '
      + 'rule when the exponent is genuinely constant.',
    targetedMisconceptions: [`${LOGDIFF}:MC-1`, `${LOGDIFF}:MC-2`],
    source: eb(LOGDIFF, 'Core Understanding — the technique is required only when base and exponent both vary, and the final answer must be substituted back in terms of x'),
  },
  {
    conceptId: INVTRIG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Sin, cos, and tan fail the horizontal-line test on their full domains, precisely because '
      + 'they are periodic: sin(0)=sin(π)=0 is a direct instance of two distinct inputs producing '
      + 'an identical output, so no single-valued inverse can exist over all reals. The remedy is '
      + 'to RESTRICT the domain to an interval where the function IS injective, then invert only '
      + 'that restricted piece: arcsin has domain [-1,1] and range [-π/2,π/2]; arccos has domain '
      + '[-1,1] and range [0,π]; arctan has domain ℝ and range (-π/2,π/2).\n\n'
      + 'There is a genuine ASYMMETRY between the two composition directions: sin(arcsin x)=x '
      + 'holds for EVERY x∈[-1,1] without exception, since arcsin\'s output always lands inside '
      + 'sin\'s restricted domain. But arcsin(sin x)=x holds ONLY when x is already inside '
      + '[-π/2,π/2] — outside that interval, sin(x) discards which "copy" of the periodic function '
      + 'x came from, and arcsin can only return the one representative angle inside its own '
      + 'range, not the original x.',
    targetedMisconceptions: [`${INVTRIG}:MC-1`, `${INVTRIG}:MC-2`, `${INVTRIG}:MC-3`],
    source: eb(INVTRIG, 'Core Understanding — trig functions are not invertible on their full domains, so their inverses are defined on a restricted domain/range, and the two composition directions are genuinely asymmetric'),
  },
  {
    conceptId: TRIGIDENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Pythagorean identity sin²θ+cos²θ=1 is not a new fact requiring separate proof — it is '
      + 'the unit circle\'s own defining equation (x²+y²=1 with (x,y)=(cosθ,sinθ)) restated in '
      + 'trigonometric notation. Dividing through by cos²θ gives 1+tan²θ=sec²θ; dividing by sin²θ '
      + 'gives cot²θ+1=csc²θ — two derived forms from the same single geometric fact.\n\n'
      + 'The angle-sum formulas let exact values be computed for angles beyond the standard '
      + 'unit-circle list, and the double-angle formulas follow by setting B=A. The central skill '
      + 'is STRATEGIC IDENTITY SELECTION: a given expression frequently admits MORE THAN ONE valid '
      + 'simplification route, never exactly one "correct" first move.\n\n'
      + 'Taking a square root of a squared trig quantity (like solving cos²θ=16/25) requires an '
      + 'explicit QUADRANT CHECK before finalizing the sign — the "take the positive root" reflex '
      + 'from earlier algebra is never sufficient on its own. And sin does NOT distribute over '
      + 'addition like a linear function: sin(A+B)≠sin(A)+sin(B) in general, since sin is '
      + 'genuinely nonlinear.',
    targetedMisconceptions: [`${TRIGIDENT}:MC-1`, `${TRIGIDENT}:MC-2`, `${TRIGIDENT}:MC-3`],
    source: eb(TRIGIDENT, 'Core Understanding — the Pythagorean identity is the unit circle\'s own equation, a simplification target admits multiple valid paths, a square root needs a quadrant check, and sin does not distribute over addition'),
  },
]

export const MATHEMATICS_CALC_LOG_DIFF_TRIG_INVERSE_IDENTITIES_PROBES: SeedProbe[] = [
  // --- math.calc.logarithmic-differentiation ------------------------------------------
  {
    conceptId: LOGDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For y=x⁵ (a constant exponent), should logarithmic differentiation be used, or does a simpler rule suffice?',
    choices: [
      { text: 'The direct power rule suffices (y\'=5x⁴, one line); logarithmic differentiation is reserved for cases where BOTH the base and exponent genuinely depend on x, not a universal replacement for the power rule', isCorrect: true },
      { text: 'Logarithmic differentiation should always be used for any expression involving an exponent, regardless of whether it is constant', isCorrect: false, misconceptionId: `${LOGDIFF}:MC-1` },
      { text: 'The power rule cannot be applied here at all, so logarithmic differentiation is the only valid option', isCorrect: false, misconceptionId: `${LOGDIFF}:MC-1` },
    ],
    targetedMisconceptions: [`${LOGDIFF}:MC-1`],
    source: eb(LOGDIFF, 'Detection probe (Blueprint B01 P41) — present the constant-exponent case and check whether logarithmic differentiation is unnecessarily applied'),
  },
  {
    conceptId: LOGDIFF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What should be checked FIRST, before choosing between the power rule and logarithmic differentiation for a given expression?',
    choices: [
      { text: 'Whether the exponent genuinely depends on x (variable) or is a fixed number (constant) — logarithmic differentiation is needed only when both the base and exponent vary with x simultaneously', isCorrect: true },
      { text: 'Nothing needs to be checked — logarithmic differentiation can always be applied safely regardless of the expression\'s structure', isCorrect: false, misconceptionId: `${LOGDIFF}:MC-1` },
      { text: 'Whether the expression contains a logarithm already, since that alone determines which technique to use', isCorrect: false, misconceptionId: `${LOGDIFF}:MC-1` },
    ],
    targetedMisconceptions: [`${LOGDIFF}:MC-1`],
    source: eb(LOGDIFF, 'Repair Action B01 — explicitly examine the exponent first, confirming whether it genuinely depends on x, before choosing a differentiation technique'),
  },
  {
    conceptId: LOGDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Solving for y\' in logarithmic differentiation gives y\'=y(cos(x)ln(x)+sin(x)/x) for y=x^(sin x). Is this the final answer?',
    choices: [
      { text: 'No — y was only a convenient label during implicit differentiation; the original expression x^(sin x) must be substituted back in for y, giving the final derivative purely in terms of x', isCorrect: true },
      { text: 'Yes — once y\' is solved for symbolically, the derivative is complete regardless of whether y still appears', isCorrect: false, misconceptionId: `${LOGDIFF}:MC-2` },
      { text: 'Yes, since y and x are interchangeable labels that can be used equally in the final answer', isCorrect: false, misconceptionId: `${LOGDIFF}:MC-2` },
    ],
    targetedMisconceptions: [`${LOGDIFF}:MC-2`],
    source: eb(LOGDIFF, 'Detection probe (Blueprint B02 P41) — present the solved-for y\' expression and check whether the final substitution is performed'),
  },

  // --- math.trig.inverse-trig ------------------------------------------
  {
    conceptId: INVTRIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is there just one angle whose sine is 0? What does that mean for trying to define "the" inverse of sine over all real numbers?',
    choices: [
      { text: 'No — sin(0)=sin(π)=0, two distinct inputs sharing one output; sine fails the horizontal line test on its full domain, so no single-valued inverse can exist without first restricting the domain', isCorrect: true },
      { text: 'Yes — sine has exactly one angle producing each output value, so it is invertible over all real numbers without restriction', isCorrect: false, misconceptionId: `${INVTRIG}:MC-1` },
      { text: 'The number of angles producing a given sine value has no bearing on whether an inverse function can be defined', isCorrect: false, misconceptionId: `${INVTRIG}:MC-1` },
    ],
    targetedMisconceptions: [`${INVTRIG}:MC-1`],
    source: eb(INVTRIG, 'Discovery Question 1 — is there just one angle whose sine is 0; list a few; what does that mean for trying to define the inverse of sine'),
  },
  {
    conceptId: INVTRIG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Compute arcsin(sin(5π/6)) step by step. Did you get back 5π/6?',
    choices: [
      { text: 'No — sin(5π/6)=1/2, and arcsin(1/2)=π/6, not 5π/6, because 5π/6 lies outside arcsin\'s range [-π/2,π/2]; arcsin can only report the representative angle inside its own range', isCorrect: true },
      { text: 'Yes — arcsin(sin(x))=x always holds for every real x, undoing the sine completely', isCorrect: false, misconceptionId: `${INVTRIG}:MC-2` },
      { text: 'Yes, since composing a function with its own inverse always returns the original input regardless of range restrictions', isCorrect: false, misconceptionId: `${INVTRIG}:MC-2` },
    ],
    targetedMisconceptions: [`${INVTRIG}:MC-2`],
    source: eb(INVTRIG, 'Discovery Question 2 — compute arcsin(sin(5π/6)) step by step; did you get back 5π/6; if not, why not, where did the periodicity get lost'),
  },
  {
    conceptId: INVTRIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Compare sin(arcsin(0.5)) to arcsin(sin(5π/6)). Both involve composing sin with arcsin — why does one return the original number and the other doesn\'t?',
    choices: [
      { text: 'sin(arcsin(0.5))=0.5 always works because arcsin\'s output is guaranteed to already be inside sin\'s domain; arcsin(sin(5π/6))≠5π/6 because 5π/6 starts OUTSIDE arcsin\'s own range — the two composition directions are genuinely asymmetric', isCorrect: true },
      { text: 'Both compositions are equally reliable, and any apparent difference is simply a computational error', isCorrect: false, misconceptionId: `${INVTRIG}:MC-3` },
      { text: 'sin(arcsin x) and arcsin(sin x) are interchangeable expressions that always simplify to x', isCorrect: false, misconceptionId: `${INVTRIG}:MC-3` },
    ],
    targetedMisconceptions: [`${INVTRIG}:MC-3`],
    source: eb(INVTRIG, 'Discovery Question 3 — compare sin(arcsin(0.5)) to arcsin(sin(5π/6)); both involve composing sin with arcsin; why does one return the original number and the other doesn\'t'),
  },

  // --- math.trig.trig-identities ------------------------------------------
  {
    conceptId: TRIGIDENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Simplify sin(2x)/(1+cos(2x)) using cos(2x)=2cos²x-1. Now try it again using cos(2x)=1-2sin²x instead. Do you reach the same final answer both times?',
    choices: [
      { text: 'Yes — both substitutions correctly reach tan(x), though one path is cleaner than the other; a simplification target commonly admits more than one valid identity path, never exactly one "correct" first move', isCorrect: true },
      { text: 'No — only one of the two double-angle cosine forms can validly be substituted into this expression', isCorrect: false, misconceptionId: `${TRIGIDENT}:MC-1` },
      { text: 'The answer cannot be determined without first being told which single identity is the "official" correct one to use', isCorrect: false, misconceptionId: `${TRIGIDENT}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIGIDENT}:MC-1`],
    source: eb(TRIGIDENT, 'Discovery Question 1 — simplify using cos(2x)=2cos²x-1, then again using cos(2x)=1-2sin²x; do you reach the same final answer both times'),
  },
  {
    conceptId: TRIGIDENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If sinθ=3/5 and θ is in Quadrant II, is cosθ positive or negative? Does the Pythagorean identity alone tell you the sign?',
    choices: [
      { text: 'Negative — the Pythagorean identity gives cos²θ=16/25, so cosθ=±4/5, but the identity alone cannot determine the sign; the quadrant information (cosine is negative in Quadrant II) forces cosθ=-4/5', isCorrect: true },
      { text: 'Positive — taking the square root of cos²θ=16/25 always gives the positive root, cosθ=4/5, regardless of quadrant', isCorrect: false, misconceptionId: `${TRIGIDENT}:MC-2` },
      { text: 'The Pythagorean identity alone, without any quadrant information, is always sufficient to determine the correct sign', isCorrect: false, misconceptionId: `${TRIGIDENT}:MC-2` },
    ],
    targetedMisconceptions: [`${TRIGIDENT}:MC-2`],
    source: eb(TRIGIDENT, 'Discovery Question 2 — if sinθ=3/5 and θ is in Quadrant II, is cosθ positive or negative; does the Pythagorean identity alone tell you the sign'),
  },
  {
    conceptId: TRIGIDENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Compute sin(60°) directly. Now compute sin(30°)+sin(30°). Are they equal?',
    choices: [
      { text: 'No — sin(60°)=√3/2≈0.866, but sin(30°)+sin(30°)=1/2+1/2=1; these disagree, proving sin does not distribute over addition the way a linear function would, and the angle-sum formula is genuinely necessary', isCorrect: true },
      { text: 'Yes — sin(A+B)=sin(A)+sin(B) always holds, exactly like a linear function distributing over addition', isCorrect: false, misconceptionId: `${TRIGIDENT}:MC-3` },
      { text: 'Yes, since trigonometric functions inherit the same distribution property that ordinary linear functions have', isCorrect: false, misconceptionId: `${TRIGIDENT}:MC-3` },
    ],
    targetedMisconceptions: [`${TRIGIDENT}:MC-3`],
    source: eb(TRIGIDENT, 'Discovery Question 3 — compute sin(60°) directly, then compute sin(30°)+sin(30°); are they equal'),
  },
]

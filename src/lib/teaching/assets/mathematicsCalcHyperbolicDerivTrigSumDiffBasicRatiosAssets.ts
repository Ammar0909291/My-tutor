/**
 * Batch: derivatives of hyperbolic functions (math.calc), sum/difference
 * formulas and basic trig ratios (math.trig).
 *
 * math.calc.hyperbolic-derivatives is the last currently-ready math.calc
 * concept on this frontier — both its prerequisites (math.trig.hyperbolic-
 * functions, math.calc.derivative-exponential) were authored in prior
 * batches. math.trig.sum-difference-formulas becomes ready off already-
 * authored math.trig.trig-identities and directly unblocks math.trig.
 * double-angle-formulas and math.trig.product-to-sum next. math.trig.
 * basic-ratios becomes ready off already-authored math.trig.right-triangle-
 * trig and directly unblocks math.trig.special-angles next.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.hyperbolic-derivatives.md,
 * math.trig.sum-difference-formulas.md, and math.trig.basic-ratios.md.
 *
 *   HYPDERIV  hyperbolic-derivatives — neither d/dx[sinh x]=cosh x nor
 *             d/dx[cosh x]=sinh x carries a negative sign, UNLIKE
 *             d/dx[cos x]=-sin x; this is forced by the exponential
 *             derivation, never copied from the trig sign pattern by
 *             analogy; the chain rule applies to a composite argument
 *             exactly as elsewhere — the inner derivative must be
 *             multiplied in, never omitted. Only 2 misconceptions in the
 *             EB entry: MC-1 (trig sign pattern wrongly transplanted,
 *             "Foundational") gets FOUNDATIONAL and DEVELOPING, MC-2
 *             (chain-rule factor omitted, "Foundational") gets PROFICIENT.
 *   SUMDIFF   sum-difference-formulas — these formulas are GENERATIVE, not
 *             a fixed lookup table: combining two of them algebraically
 *             produces genuinely new identities (e.g. product-to-sum),
 *             never just one-at-a-time computation; the cofunction
 *             identities are a direct SPECIAL CASE of the difference
 *             formula at A=90°, never a separate fact to memorize; the Law
 *             of Cosines step in the derivation needs the origin-P-Q
 *             triangle's two radius-length sides and included angle A-B
 *             explicitly identified, never skipped or misapplied.
 *   BASICRATIOS basic-ratios — Opposite and Adjacent are defined RELATIVE
 *             TO theta and swap when theta moves to the triangle's other
 *             acute vertex, while the Hypotenuse never changes; sin pairs
 *             with Opposite and cos pairs with Adjacent, never swapped;
 *             the Hypotenuse is identified by being opposite the RIGHT
 *             ANGLE, never by visual position or orientation on the page.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const HYPDERIV = 'math.calc.hyperbolic-derivatives'
const SUMDIFF = 'math.trig.sum-difference-formulas'
const BASICRATIOS = 'math.trig.basic-ratios'

export const MATHEMATICS_CALC_HYPERBOLIC_DERIV_TRIG_SUM_DIFF_BASIC_RATIOS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HYPDERIV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Both formulas are derived directly from the exponential definitions. Since sinh(x)=(e^x-e^-x)/2, '
      + 'differentiating term by term gives d/dx[sinh x]=(e^x-(-e^-x))/2=(e^x+e^-x)/2=cosh x — the chain '
      + 'rule\'s inner derivative of -1 on e^-x flips that term\'s sign, turning the original minus into a '
      + 'plus. Since cosh(x)=(e^x+e^-x)/2, the same chain-rule flip gives d/dx[cosh x]=(e^x-e^-x)/2=sinh x.\n\n'
      + 'NEITHER formula carries a negative sign — this is the one place hyperbolic functions genuinely '
      + 'differ from trig: d/dx[sin x]=cos x and d/dx[cosh x]=sinh x look structurally parallel, but '
      + 'd/dx[cos x]=-sin x has a minus sign that d/dx[cosh x]=sinh x does NOT. This is not a memorized '
      + 'exception; the exponential derivation above shows exactly why the two chain-rule sign flips '
      + 'cancel out to leave no overall minus in either hyperbolic formula.\n\n'
      + 'When the argument is a function g(x), the chain rule applies exactly as elsewhere: '
      + 'd/dx[cosh(g(x))]=sinh(g(x))·g\'(x) — both identifying g(x) and multiplying by g\'(x) are required '
      + 'together.',
    targetedMisconceptions: [`${HYPDERIV}:MC-1`, `${HYPDERIV}:MC-2`],
    source: eb(HYPDERIV, 'Core Understanding — neither hyperbolic derivative carries a negative sign, forced by the exponential derivation, and the chain rule applies exactly as with any other differentiable function'),
  },
  {
    conceptId: SUMDIFF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The derivation: place P=(cosA,sinA) and Q=(cosB,sinB) on the unit circle and compute distance PQ '
      + 'TWO independent ways. Via the coordinate distance formula, PQ²=(cosA-cosB)²+(sinA-sinB)², which '
      + 'expands and collapses (using the Pythagorean identity twice) to 2-2cosAcosB-2sinAsinB. Via the '
      + 'Law of Cosines on the triangle formed by P, Q, and the origin — two sides of length 1, included '
      + 'angle A-B — PQ²=1²+1²-2(1)(1)cos(A-B)=2-2cos(A-B). Setting these equal gives '
      + 'cos(A-B)=cosAcosB+sinAsinB — the ONE formula every other formula in this family follows from by '
      + 'substitution (B→-B, using cos(-B)=cosB and sin(-B)=-sinB) or the cofunction relationship.\n\n'
      + 'The cofunction identities fall out as a PURE special case, not a separate fact: setting A=90° in '
      + 'the difference formula, cos(90°-B)=0·cosB+1·sinB=sinB — no separate geometric argument is needed.\n\n'
      + 'These formulas are GENERATIVE, not a fixed lookup table: adding sin(A+B) and sin(A-B) directly '
      + 'gives 2sinAcosB, yielding the product-to-sum formula sinAcosB=½[sin(A+B)+sin(A-B)] — a genuinely '
      + 'new identity obtained by pure algebraic combination, with no additional geometry required.',
    targetedMisconceptions: [`${SUMDIFF}:MC-1`, `${SUMDIFF}:MC-2`, `${SUMDIFF}:MC-3`],
    source: eb(SUMDIFF, 'Core Understanding — the unit-circle derivation of cos(A-B), the cofunction identities as a pure special case, and the formulas\' generative role in producing new identities by combination'),
  },
  {
    conceptId: BASICRATIOS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The labeling procedure is angle-relative, not position-relative. Locate the right angle first — '
      + 'the side across from it is ALWAYS the Hypotenuse, regardless of orientation on the page. Then '
      + 'locate the reference angle θ: the leg directly across from θ is the Opposite side; the remaining '
      + 'leg, beside θ between its vertex and the right angle, is the Adjacent side. From these three '
      + 'labeled sides: sinθ=Opposite/Hypotenuse, cosθ=Adjacent/Hypotenuse, tanθ=Opposite/Adjacent '
      + '(SOH-CAH-TOA). When a side is missing, the Pythagorean theorem (a²+b²=c²) must be applied FIRST '
      + 'to recover it before any ratio can be computed.\n\n'
      + 'The central subtlety: Opposite and Adjacent are defined RELATIVE TO θ, and they SWAP when θ '
      + 'moves to the triangle\'s other acute vertex — while the Hypotenuse never changes, since it is '
      + 'always the side across from the right angle, independent of which acute angle is chosen as θ.',
    targetedMisconceptions: [`${BASICRATIOS}:MC-1`, `${BASICRATIOS}:MC-2`, `${BASICRATIOS}:MC-3`],
    source: eb(BASICRATIOS, 'Core Understanding — the angle-relative O/A/H labeling procedure, the three named ratios, and the subtlety that Opposite/Adjacent swap with theta while the Hypotenuse never changes'),
  },
]

export const MATHEMATICS_CALC_HYPERBOLIC_DERIV_TRIG_SUM_DIFF_BASIC_RATIOS_PROBES: SeedProbe[] = [
  // --- math.calc.hyperbolic-derivatives ------------------------------------------
  {
    conceptId: HYPDERIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You know d/dx[cos x]=-sin x. Does d/dx[cosh x] also carry a negative sign, since cosh looks similar to cos?',
    choices: [
      { text: 'No — derived directly from cosh(x)=(e^x+e^-x)/2, d/dx[cosh x]=(e^x-e^-x)/2=sinh x, with NO overall minus sign; the notational parallel to cos does not extend to this property', isCorrect: true },
      { text: 'Yes — d/dx[cosh x]=-sinh x, mirroring the trig derivative\'s negative sign exactly', isCorrect: false, misconceptionId: `${HYPDERIV}:MC-1` },
      { text: 'Yes, since any function whose name starts with "cos" must have a derivative with a negative sign', isCorrect: false, misconceptionId: `${HYPDERIV}:MC-1` },
    ],
    targetedMisconceptions: [`${HYPDERIV}:MC-1`],
    source: eb(HYPDERIV, 'Discovery Question 1 — you know d/dx[cos x]=-sin x; if cosh x looks similar to cos x, does d/dx[cosh x] also have a negative sign; derive it from the exponential definition and check'),
  },
  {
    conceptId: HYPDERIV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Differentiate sinh(x)=(e^x-e^-x)/2 term by term. What happens to the sign of the e^-x term under the chain rule, and why does the final result have no overall minus sign?',
    choices: [
      { text: 'The chain rule\'s inner derivative of -1 on e^-x flips that term\'s sign from minus to plus, giving d/dx[sinh x]=(e^x+e^-x)/2=cosh x — a sign-free result forced by this one flip, not a coincidence or a memorized exception', isCorrect: true },
      { text: 'The e^-x term keeps its original minus sign unchanged, so the derivative retains a minus sign somewhere in the final formula', isCorrect: false, misconceptionId: `${HYPDERIV}:MC-1` },
      { text: 'The sign behavior cannot be determined without first assuming the hyperbolic derivative mirrors the trig one', isCorrect: false, misconceptionId: `${HYPDERIV}:MC-1` },
    ],
    targetedMisconceptions: [`${HYPDERIV}:MC-1`],
    source: eb(HYPDERIV, 'Discovery Question 2 — when you differentiate sinh x=(e^x-e^-x)/2 term by term, what happens to the sign of the e^-x term under the chain rule'),
  },
  {
    conceptId: HYPDERIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For h(x)=cosh(3x²), what is g(x) and what is g\'(x) — and does h\'(x) include both pieces?',
    choices: [
      { text: 'g(x)=3x², g\'(x)=6x, so h\'(x)=sinh(3x²)·6x=6x·sinh(3x²) — the base formula d/dx[cosh x]=sinh x is applied to g(x) AND multiplied by g\'(x); omitting either piece produces a wrong derivative', isCorrect: true },
      { text: 'h\'(x)=sinh(3x²) — the base-case formula applies directly to the composite argument without any additional multiplication', isCorrect: false, misconceptionId: `${HYPDERIV}:MC-2` },
      { text: 'h\'(x)=6x — only the inner derivative matters, since the outer hyperbolic function does not change the rate at this order', isCorrect: false, misconceptionId: `${HYPDERIV}:MC-2` },
    ],
    targetedMisconceptions: [`${HYPDERIV}:MC-2`],
    source: eb(HYPDERIV, 'Discovery Question 3 — for h(x)=cosh(3x^2), what is g(x) and what is g\'(x), and does your answer for h\'(x) include both pieces'),
  },

  // --- math.trig.sum-difference-formulas ------------------------------------------
  {
    conceptId: SUMDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You already know sin(A+B) and sin(A-B) as separate formulas for computing individual values. Can they be combined to produce a NEW identity you have not seen stated anywhere?',
    choices: [
      { text: 'Yes — adding sin(A+B) and sin(A-B) directly gives 2sinAcosB, yielding the product-to-sum formula sinAcosB=½[sin(A+B)+sin(A-B)], a genuinely new identity obtained by pure algebraic combination', isCorrect: true },
      { text: 'No — these formulas are only useful one at a time, for computing individual exact values like cos75°', isCorrect: false, misconceptionId: `${SUMDIFF}:MC-1` },
      { text: 'No, since combining two trigonometric formulas algebraically never produces a valid new identity', isCorrect: false, misconceptionId: `${SUMDIFF}:MC-1` },
    ],
    targetedMisconceptions: [`${SUMDIFF}:MC-1`],
    source: eb(SUMDIFF, 'Discovery Question 3 — if you already know sin(A+B) and sin(A-B) separately, can you combine them to produce a new identity you haven\'t seen before'),
  },
  {
    conceptId: SUMDIFF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is cos(90°-B)=sinB a separate fact you need to memorize, or does it fall directly out of the difference formula you just derived?',
    choices: [
      { text: 'It falls directly out: substituting A=90° into cos(A-B)=cosAcosB+sinAsinB gives cos(90°-B)=0·cosB+1·sinB=sinB — the cofunction identity is exactly what the difference formula says at one specific angle, not a separate geometric fact', isCorrect: true },
      { text: 'It is a genuinely separate fact, unrelated to the sum/difference formulas, that must be memorized independently', isCorrect: false, misconceptionId: `${SUMDIFF}:MC-2` },
      { text: 'It can only be derived using a right-triangle complementary-angle argument, never from the difference formula', isCorrect: false, misconceptionId: `${SUMDIFF}:MC-2` },
    ],
    targetedMisconceptions: [`${SUMDIFF}:MC-2`],
    source: eb(SUMDIFF, 'Discovery Question 2 — is cos(90°-B)=sinB a separate fact you need to memorize, or does it fall directly out of the difference formula you just derived'),
  },
  {
    conceptId: SUMDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The distance between P=(cosA,sinA) and Q=(cosB,sinB) on the unit circle is computed both with the coordinate distance formula and with the Law of Cosines. What are the triangle\'s two known sides and its included angle for the Law of Cosines step?',
    choices: [
      { text: 'Both sides OP and OQ have length 1 (the radius), and the included angle between them is exactly A-B, the angular separation of P and Q — identifying this setup is the entire geometric content the step depends on', isCorrect: true },
      { text: 'The two known sides are PQ and the x-axis, with the included angle being A alone, independent of B', isCorrect: false, misconceptionId: `${SUMDIFF}:MC-3` },
      { text: 'The Law of Cosines step can be skipped entirely, since the coordinate distance formula alone is sufficient to derive the identity', isCorrect: false, misconceptionId: `${SUMDIFF}:MC-3` },
    ],
    targetedMisconceptions: [`${SUMDIFF}:MC-3`],
    source: eb(SUMDIFF, 'Discovery Question 1 — the distance between two points on the unit circle can be computed with the coordinate distance formula and with the Law of Cosines; what happens if you set the two results equal'),
  },

  // --- math.trig.basic-ratios ------------------------------------------
  {
    conceptId: BASICRATIOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a right triangle with legs 3 and 4 and hypotenuse 5, θ is at the vertex opposite the leg of length 3. What are sinθ and cosθ?',
    choices: [
      { text: 'sinθ=3/5 (Opposite/Hypotenuse, since the leg of length 3 is across from θ) and cosθ=4/5 (Adjacent/Hypotenuse, since the leg of length 4 is beside θ) — S pairs with Opposite, C pairs with Adjacent, never swapped', isCorrect: true },
      { text: 'sinθ=4/5 and cosθ=3/5 — the labels are reversed from the standard SOH-CAH-TOA pairing', isCorrect: false, misconceptionId: `${BASICRATIOS}:MC-1` },
      { text: 'Either pairing is acceptable, since sin and cos are interchangeable labels for the two legs', isCorrect: false, misconceptionId: `${BASICRATIOS}:MC-1` },
    ],
    targetedMisconceptions: [`${BASICRATIOS}:MC-1`],
    source: eb(BASICRATIOS, 'Demonstration 1 — the four-stage representation shift computing sin and cos on a labeled triangle, checking sin pairs with Opposite and cos pairs with Adjacent, never swapped'),
  },
  {
    conceptId: BASICRATIOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A right triangle is drawn tilted so its longest-looking side sits at the bottom of the page. Is that side necessarily the hypotenuse?',
    choices: [
      { text: 'Not necessarily by its visual position — the hypotenuse is identified by being the side directly across from the right-angle marker, a rule that holds regardless of how the triangle is rotated or which side looks longest or lowest on the page', isCorrect: true },
      { text: 'Yes — the hypotenuse is always the side that appears longest or is positioned at the bottom of the diagram', isCorrect: false, misconceptionId: `${BASICRATIOS}:MC-3` },
      { text: 'Yes, since a triangle\'s hypotenuse is defined by its visual orientation on the page, not by its relationship to the right angle', isCorrect: false, misconceptionId: `${BASICRATIOS}:MC-3` },
    ],
    targetedMisconceptions: [`${BASICRATIOS}:MC-3`],
    source: eb(BASICRATIOS, 'Discovery Question 3 — a triangle is drawn tilted so its longest-looking side is at the bottom; is that side necessarily the hypotenuse; how do you know for sure'),
  },
  {
    conceptId: BASICRATIOS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the same 3-4-5 triangle, θ is moved to the OTHER acute vertex (the one opposite the leg of length 4). Do Opposite and Adjacent stay the same as before, or do they swap? What about the Hypotenuse?',
    choices: [
      { text: 'Opposite and Adjacent SWAP (now Opposite=4, Adjacent=3), since they are defined relative to θ\'s new position, but the Hypotenuse stays fixed at 5, since it is always the side across from the right angle regardless of which acute vertex is θ', isCorrect: true },
      { text: 'Opposite and Adjacent stay exactly the same, since they are properties of the triangle\'s fixed geometry rather than of θ\'s position', isCorrect: false, misconceptionId: `${BASICRATIOS}:MC-2` },
      { text: 'All three labels — Opposite, Adjacent, and Hypotenuse — swap together whenever θ moves to a different vertex', isCorrect: false, misconceptionId: `${BASICRATIOS}:MC-2` },
    ],
    targetedMisconceptions: [`${BASICRATIOS}:MC-2`],
    source: eb(BASICRATIOS, 'Discovery Question 2 — if I move theta to the other acute angle in the same triangle, do Opposite and Adjacent stay the same, or do they swap; what about the Hypotenuse'),
  },
]

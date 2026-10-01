/**
 * Batch: derivatives of inverse trig functions (math.calc), hyperbolic
 * functions and trigonometric equations (math.trig).
 *
 * Continues serving-asset coverage for math.calc (64/76 -> 65/76) and
 * math.trig. math.calc.derivative-inverse-trig became ready the instant
 * math.trig.inverse-trig (prior batch) was served — the final currently-
 * ready math.calc concept on the derivative-trig chain. math.trig.
 * hyperbolic-functions is ready off already-authored math.alg.exponential-
 * function and math.trig.trig-functions, and directly unblocks math.calc.
 * hyperbolic-derivatives next. math.trig.trig-equations became ready off
 * the prior batch's math.trig.trig-identities and math.trig.inverse-trig.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.derivative-inverse-trig.md,
 * math.trig.hyperbolic-functions.md, and math.trig.trig-equations.md.
 *
 *   DERIVINVTRIG derivative-inverse-trig — the positive square root in
 *             arcsin's derivative is FORCED by arcsin's restricted range,
 *             never an arbitrary sign convention; applying the chain rule
 *             to a composite argument requires BOTH substituting g(x)
 *             into the outer formula AND multiplying by g'(x), never just
 *             one of the two. Only 2 misconceptions in the EB entry: MC-1
 *             (sign chosen arbitrarily, "Moderate") gets FOUNDATIONAL and
 *             DEVELOPING, MC-2 (one chain-rule modification omitted,
 *             "Foundational") gets PROFICIENT.
 *   HYPERBOLIC hyperbolic-functions — sinh and cosh are defined PURELY
 *             algebraically from e^x, never via an angle the way sin/cos
 *             are; the identity cosh²x-sinh²x=1 has a MINUS sign, forced
 *             by the algebra of squaring a sum versus a difference,
 *             never copied from the trig plus-sign identity; the
 *             hyperbolic derivative signs must be independently verified,
 *             never assumed to mirror the trig sign pattern.
 *   TRIGEQ    trig-equations — an inverse function returns ONE principal
 *             value, but an equation asks for ALL solutions, never just
 *             the calculator's single output; each trig function carries
 *             its OWN period (tan repeats every π, not 2π), never
 *             assumed uniformly 2π; a composite argument's interval must
 *             be WIDENED before dividing, never applied to the original
 *             variable directly; a root found by squaring must be
 *             checked against the ORIGINAL equation, never accepted
 *             automatically.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DERIVINVTRIG = 'math.calc.derivative-inverse-trig'
const HYPERBOLIC = 'math.trig.hyperbolic-functions'
const TRIGEQ = 'math.trig.trig-equations'

export const MATHEMATICS_CALC_DERIV_INV_TRIG_HYPERBOLIC_TRIG_EQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DERIVINVTRIG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For y=arcsin(x), the DEFINING relation is sin(y)=x. Differentiating both sides implicitly: '
      + 'cos(y)·dy/dx=1, so dy/dx=1/cos(y). Converting back to x uses the Pythagorean identity: '
      + 'cos(y)=√(1-sin²y)=√(1-x²) — taking the POSITIVE square root specifically because arcsin\'s '
      + 'restricted range is [-π/2,π/2], where cos(y)≥0 throughout. This is not an arbitrary sign '
      + 'convention; it is a direct consequence of the range restriction. The analogous derivation '
      + 'gives d/dx[arctan(x)]=1/(1+x²).\n\n'
      + 'When the argument is a function g(x) rather than bare x, the chain rule applies exactly: '
      + 'd/dx[arcsin(g(x))]=g\'(x)/√(1-[g(x)]²) — BOTH substituting g(x) into the denominator\'s '
      + 'square root AND multiplying by g\'(x). Neither modification alone produces a correct '
      + 'formula.',
    targetedMisconceptions: [`${DERIVINVTRIG}:MC-1`, `${DERIVINVTRIG}:MC-2`],
    source: eb(DERIVINVTRIG, 'Core Understanding — the positive square root is forced by arcsin\'s restricted range, and a composite argument needs both chain-rule modifications together'),
  },
  {
    conceptId: HYPERBOLIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The definitions come straight from e^x, split into even and odd parts: cosh(x)=(e^x+e^-x)/2 '
      + '(the EVEN part) and sinh(x)=(e^x-e^-x)/2 (the ODD part). There is no angle anywhere in '
      + 'these formulas — x is simply a real-number input to the exponential function, never an '
      + 'angle swept on a circle or hyperbola the way trig functions are defined.\n\n'
      + 'The Pythagorean-style identity comes from direct expansion, and the sign is FORCED, not '
      + 'chosen: expanding cosh²x-sinh²x from the exponential definitions, the e^(2x) and e^(-2x) '
      + 'terms cancel entirely, leaving exactly 1 — a MINUS sign, not the trig identity\'s plus '
      + 'sign, falling directly out of the algebra of squaring a sum versus a difference, never '
      + 'copied from the trig pattern.\n\n'
      + 'The derivative preview is stated but NOT derived here: d/dx[sinh x]=cosh x matches the '
      + 'trig pattern d/dx[sin x]=cos x exactly, but d/dx[cosh x]=sinh x, WITHOUT the minus sign '
      + 'that appears in d/dx[cos x]=-sin x — this asymmetry must be independently verified, never '
      + 'assumed from the trig pattern.',
    targetedMisconceptions: [`${HYPERBOLIC}:MC-1`, `${HYPERBOLIC}:MC-2`, `${HYPERBOLIC}:MC-3`],
    source: eb(HYPERBOLIC, 'Core Understanding — hyperbolic functions are defined purely from e^x with no angle, the identity\'s minus sign is forced by the algebra, and the derivative signs must be independently verified'),
  },
  {
    conceptId: TRIGEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An inverse trig function gives ONE angle — the principal value, chosen by convention to lie '
      + 'in a restricted range. A trig EQUATION asks a different question: not "what angle does '
      + 'the inverse function return," but "what are ALL angles that satisfy this relationship." '
      + 'Because sine, cosine, and tangent are periodic, an equation like sinθ=0.5 typically has '
      + 'two or more solutions within any single period, never just the one the inverse function '
      + 'returns.\n\n'
      + 'The reliable procedure: isolate the trig function; find the reference angle via the '
      + 'inverse function; use the ASTC rule to identify EVERY quadrant where the original equation '
      + 'is also satisfied; write every solution the interval allows, using the function\'s OWN '
      + 'period (tan repeats every π, never assumed to be 2π like sine/cosine).\n\n'
      + 'A composite argument like sin(2θ)=k requires the working interval to be WIDENED by that '
      + 'same factor BEFORE dividing, so no solutions are lost. And whenever an equation is solved '
      + 'by SQUARING both sides, every resulting candidate must be checked against the ORIGINAL '
      + 'equation, since squaring can introduce extraneous roots.',
    targetedMisconceptions: [`${TRIGEQ}:MC-1`, `${TRIGEQ}:MC-2`, `${TRIGEQ}:MC-3`, `${TRIGEQ}:MC-4`],
    source: eb(TRIGEQ, 'Core Understanding — an equation asks for all solutions never just the principal value, each trig function has its own period, a composite argument\'s interval must be widened first, and squared roots must be checked against the original'),
  },
]

export const MATHEMATICS_CALC_DERIV_INV_TRIG_HYPERBOLIC_TRIG_EQ_PROBES: SeedProbe[] = [
  // --- math.calc.derivative-inverse-trig ------------------------------------------
  {
    conceptId: DERIVINVTRIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'When converting cos(y) back into terms of x, you get ±√(1-x²). Which sign is correct, and why?',
    choices: [
      { text: 'Positive — arcsin\'s range is [-π/2,π/2], and cosine is non-negative throughout that entire interval, so cos(y)=+√(1-x²) is the ONLY valid choice, not a matter of convention', isCorrect: true },
      { text: 'Either sign is equally valid, since the choice is simply a notational convention', isCorrect: false, misconceptionId: `${DERIVINVTRIG}:MC-1` },
      { text: 'Negative, since arcsin values are typically negative for negative inputs', isCorrect: false, misconceptionId: `${DERIVINVTRIG}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVINVTRIG}:MC-1`],
    source: eb(DERIVINVTRIG, 'Discovery Question 2 — which sign is correct, and why, specifically what does arcsin\'s range tell you about the sign of cos(y)'),
  },
  {
    conceptId: DERIVINVTRIG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Rewrite y=arcsin(x) as sin(y)=x and differentiate both sides. Why is the sign of cos(y)=√(1-x²) forced rather than chosen?',
    choices: [
      { text: 'Because arcsin\'s restricted range [-π/2,π/2] is exactly where cosine is non-negative throughout, so the range restriction itself determines the sign — it is a consequence, not an arbitrary convention', isCorrect: true },
      { text: 'The sign is chosen for notational tidiness, similar to other arbitrary sign conventions in mathematics', isCorrect: false, misconceptionId: `${DERIVINVTRIG}:MC-1` },
      { text: 'There is no reason to justify the sign — it can simply be stated as a memorized fact', isCorrect: false, misconceptionId: `${DERIVINVTRIG}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVINVTRIG}:MC-1`],
    source: eb(DERIVINVTRIG, 'Repair — re-derive while explicitly stating arcsin\'s range is [-π/2,π/2], and cosine is non-negative throughout that entire interval'),
  },
  {
    conceptId: DERIVINVTRIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Differentiate arcsin(2x). Did you multiply by 2? Did you also put 2x (not just x) inside the square root?',
    choices: [
      { text: 'f\'(x)=2/√(1-4x²) — both modifications are required together: multiply by g\'(x)=2 AND substitute g(x)=2x into the denominator\'s square root; doing only one produces a wrong formula', isCorrect: true },
      { text: 'f\'(x)=2/√(1-x²) — multiplying by the chain-rule factor 2 is sufficient on its own', isCorrect: false, misconceptionId: `${DERIVINVTRIG}:MC-2` },
      { text: 'f\'(x)=1/√(1-4x²) — substituting 2x into the square root is sufficient without any additional multiplication', isCorrect: false, misconceptionId: `${DERIVINVTRIG}:MC-2` },
    ],
    targetedMisconceptions: [`${DERIVINVTRIG}:MC-2`],
    source: eb(DERIVINVTRIG, 'Discovery Question 3 — differentiate arcsin(2x); did you multiply by 2; did you also put 2x, not just x, inside the square root; check both'),
  },

  // --- math.trig.hyperbolic-functions ------------------------------------------
  {
    conceptId: HYPERBOLIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are sinh(θ) and cosh(θ) defined via some angle θ on the hyperbola, the way sin(θ) and cos(θ) are defined via an angle on the unit circle?',
    choices: [
      { text: 'No — sinh(x)=(e^x-e^-x)/2 and cosh(x)=(e^x+e^-x)/2 are defined purely algebraically from e^x; there is no angle anywhere in these formulas, unlike the genuinely angle-based trig definitions', isCorrect: true },
      { text: 'Yes — hyperbolic functions are defined via an angle swept on the hyperbola, exactly parallel to how trig functions are defined via the unit circle', isCorrect: false, misconceptionId: `${HYPERBOLIC}:MC-1` },
      { text: 'Yes, since the strong naming parallel ("hyperbolic sine," "hyperbolic cosine") implies the entire angle-based framework transfers unchanged', isCorrect: false, misconceptionId: `${HYPERBOLIC}:MC-1` },
    ],
    targetedMisconceptions: [`${HYPERBOLIC}:MC-1`],
    source: eb(HYPERBOLIC, 'Discovery Question — attempting to define sinh(θ), cosh(θ) via an angle rather than the exponential formulas'),
  },
  {
    conceptId: HYPERBOLIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know cos²θ+sin²θ=1. If you expand cosh²x-sinh²x directly from the exponential definitions, do you get a plus sign or a minus sign — and why?',
    choices: [
      { text: 'A minus sign, giving cosh²x-sinh²x=1 — expanding both squares from the exponential definitions, the e^(2x) and e^(-2x) terms cancel and force this result; the sign is a consequence of the algebra, not copied from the trig identity', isCorrect: true },
      { text: 'A plus sign, giving cosh²x+sinh²x=1, matching the trig Pythagorean identity exactly', isCorrect: false, misconceptionId: `${HYPERBOLIC}:MC-2` },
      { text: 'The sign cannot be determined without first knowing the specific numerical value of x', isCorrect: false, misconceptionId: `${HYPERBOLIC}:MC-2` },
    ],
    targetedMisconceptions: [`${HYPERBOLIC}:MC-2`],
    source: eb(HYPERBOLIC, 'Discovery Question 2 — if you expand cosh²x-sinh²x directly from the exponential definitions, do you get a plus sign or a minus sign, and why'),
  },
  {
    conceptId: HYPERBOLIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Given that d/dx[sinh x]=cosh x matches the trig pattern d/dx[sin x]=cos x, should d/dx[cosh x] be assumed to equal -sinh x, mirroring d/dx[cos x]=-sin x?',
    choices: [
      { text: 'No — this must be independently verified, never assumed by analogy; the actual (later-derived) result is d/dx[cosh x]=sinh x, with NO minus sign, breaking the trig pattern that held for sinh', isCorrect: true },
      { text: 'Yes — since one hyperbolic derivative matched the trig sign pattern, the other must also match by the same logic', isCorrect: false, misconceptionId: `${HYPERBOLIC}:MC-3` },
      { text: 'Yes, since hyperbolic and trigonometric functions always share identical derivative sign patterns across the board', isCorrect: false, misconceptionId: `${HYPERBOLIC}:MC-3` },
    ],
    targetedMisconceptions: [`${HYPERBOLIC}:MC-3`],
    source: eb(HYPERBOLIC, 'Repair — state plainly that one hyperbolic derivative matches the trig sign pattern and one does not, to be verified later, never assumed'),
  },

  // --- math.trig.trig-equations ------------------------------------------
  {
    conceptId: TRIGEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A calculator says sin⁻¹(0.5)=30°. Is 30° the ONLY angle whose sine is 0.5?',
    choices: [
      { text: 'No — marking both points on the unit circle where y=0.5 shows 30° and 150° both work; the inverse function\'s convention picked only one of two genuinely valid intersections', isCorrect: true },
      { text: 'Yes — the inverse function\'s output is always the complete and only solution to the equation sinθ=0.5', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-1` },
      { text: 'Yes, since a trigonometric equation always has exactly one solution just like a linear equation', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIGEQ}:MC-1`],
    source: eb(TRIGEQ, 'Discovery Question 1 — if a calculator says sin⁻¹(0.5)=30°, is 30° the only angle whose sine is 0.5; how would you check'),
  },
  {
    conceptId: TRIGEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does tanθ repeat every 360°, the same as sinθ?',
    choices: [
      { text: 'No — tangent repeats every 180° (π radians), genuinely different from sine and cosine\'s shared 360° (2π) period; each trig function\'s own period must be checked, never assumed uniform', isCorrect: true },
      { text: 'Yes — every trigonometric function shares the identical period of 360°', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-2` },
      { text: 'Yes, since period is a fixed universal constant that does not vary between different trig functions', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${TRIGEQ}:MC-2`],
    source: eb(TRIGEQ, 'Discovery Question 2 — does tanθ repeat every 360°, the same as sinθ; graph both and compare'),
  },
  {
    conceptId: TRIGEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Solving sinθ=1-cosθ by squaring both sides and combining with sin²+cos²=1 produces algebraic roots. If squaring can never make a false statement true, why would a root found this way ever need to be checked?',
    choices: [
      { text: 'Because squaring can introduce EXTRANEOUS roots that satisfy the squared equation but not the original — every candidate root must be substituted back into the ORIGINAL (unsquared) equation and rejected if it fails', isCorrect: true },
      { text: 'No check is needed — every algebraic root produced by squaring both sides automatically satisfies the original equation', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-3` },
      { text: 'A check is only needed if the equation involves a composite argument, never for a simple squaring case', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${TRIGEQ}:MC-3`],
    source: eb(TRIGEQ, 'Discovery Question 3 — if squaring both sides of an equation can never make a false statement true, why would a root found this way ever need to be checked'),
  },
  {
    conceptId: TRIGEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If θ must lie in [0°,360°), what values can 2θ take when solving sin(2θ)=0.5? Is that range the same as [0°,360°)?',
    choices: [
      { text: 'No — 2θ ranges over [0°,720°), a WIDENED interval; all solutions for 2θ must be found across this doubled range BEFORE dividing by 2, or legitimate solutions for θ get silently lost', isCorrect: true },
      { text: 'Yes — 2θ takes exactly the same range [0°,360°) as θ itself, so no adjustment to the interval is needed', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-4` },
      { text: 'The interval for 2θ is irrelevant; solutions can be found for θ directly within [0°,360°) without ever considering 2θ\'s own range', isCorrect: false, misconceptionId: `${TRIGEQ}:MC-4` },
    ],
    targetedMisconceptions: [`${TRIGEQ}:MC-4`],
    source: eb(TRIGEQ, 'Discovery Question 4 — if θ must lie in [0°,360°), what values can 2θ take; is that range the same as [0°,360°)'),
  },
]

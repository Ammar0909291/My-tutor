/**
 * Fifth math.calc asset batch — classifying local extrema, the quotient
 * rule, and higher-order derivatives.
 *
 * Continues serving-asset coverage for math.calc (16/76 -> 19/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.local-extrema.md,
 * math.calc.quotient-rule.md, and math.calc.higher-order-derivatives.md.
 *
 *   LOCALEXT     local-extrema — "neither" is a completely legitimate
 *                First Derivative Test outcome (no sign change at a
 *                critical point), never an incomplete or failed analysis;
 *                f''(c)=0 is genuinely INCONCLUSIVE, carrying zero default
 *                meaning — it requires an unconditional fallback to the
 *                First Derivative Test, never a guessed interpretation;
 *                the Second Derivative Test is simply INAPPLICABLE, not
 *                merely unhelpful, at a critical point where f'(c) itself
 *                is undefined.
 *   QUOTRULE     quotient-rule — the numerator's subtraction order is
 *                FIXED (f'g-fg', never fg'-f'g, since subtraction never
 *                commutes the way the Product Rule's addition does);
 *                f is always the numerator and g always the denominator,
 *                labeled explicitly before substituting, never assigned
 *                by which expression is named "first."
 *   HIGHORDER    higher-order-derivatives — a higher-order derivative
 *                means differentiating AGAIN, never squaring the prior
 *                derivative's expression; d²y/dx² means the operator
 *                d/dx applied TWICE, never (dy/dx)² read as squaring the
 *                whole fraction; the coefficient must be tracked through
 *                EVERY successive application of the power rule, never
 *                obtained by simply subtracting the order from the
 *                original exponent.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LOCALEXT = 'math.calc.local-extrema'
const QUOTRULE = 'math.calc.quotient-rule'
const HIGHORDER = 'math.calc.higher-order-derivatives'

export const MATHEMATICS_CALCULUS_LOCAL_EXTREMA_QUOTIENT_HIGHER_ORDER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOCALEXT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Two tests classify a critical point precisely. The FIRST DERIVATIVE TEST examines the sign of '
      + 'f\' immediately to the left and right of a critical point c: a change from + to − means a '
      + 'local MAXIMUM; − to + means a local MINIMUM; and — critically — NO sign change at all means '
      + 'c is NEITHER a max nor a min, a completely legitimate, common outcome the test must be '
      + 'trusted to reveal, never a failure of the procedure requiring further searching.\n\n'
      + 'THE SECOND DERIVATIVE TEST\'S ZERO CASE IS GENUINELY INCONCLUSIVE. At a critical point where '
      + 'f\'(c)=0, f\'\'(c)>0 signals a local minimum and f\'\'(c)<0 signals a local maximum — but '
      + 'f\'\'(c)=0 provides NO information whatsoever, never "probably a saddle" or any other default '
      + 'interpretation; it requires an unconditional fallback to the First Derivative Test, since the '
      + 'identical zero-second-derivative signal can correspond to a genuine extremum in one function '
      + 'and to neither in another.\n\n'
      + 'THE SECOND DERIVATIVE TEST IS SIMPLY INAPPLICABLE, NOT MERELY UNHELPFUL, at a critical point '
      + 'where f\'(c) itself is UNDEFINED (a corner or cusp, never just a point where f\'=0) — the '
      + 'test\'s own hypothesis specifically requires f\'(c)=0, and there is no f\'\'(c) to compute in '
      + 'the relevant sense when f\'(c) does not even exist; the First Derivative Test is the only '
      + 'available tool there.',
    targetedMisconceptions: [`${LOCALEXT}:MC-1`, `${LOCALEXT}:MC-2`, `${LOCALEXT}:MC-3`],
    source: eb(LOCALEXT, 'Core Understanding — "neither" and "inconclusive" are both fully legitimate outcomes never to be forced into a definite classification, and the Second Derivative Test is inapplicable, not merely unhelpful, when f\' itself is undefined'),
  },
  {
    conceptId: QUOTRULE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Quotient Rule states (f/g)\'=(f\'g-fg\')/g² — f is ALWAYS the numerator (top), g is ALWAYS '
      + 'the denominator (bottom), labeled explicitly before substituting into the formula, never '
      + 'assigned by which expression happens to be named or written "first."\n\n'
      + 'THE NUMERATOR\'S SUBTRACTION ORDER IS FIXED: f\'g-fg\', never the reverse fg\'-f\'g, which '
      + 'produces the exact NEGATIVE of the correct answer. This is a stark contrast with the Product '
      + 'Rule, where f\'g+fg\'=fg\'+f\'g and the order genuinely doesn\'t matter, because ADDITION '
      + 'commutes — SUBTRACTION does not, so the order here is never a matter of convenience or '
      + 'preference, it is required.',
    targetedMisconceptions: [`${QUOTRULE}:MC-1`, `${QUOTRULE}:MC-2`],
    source: eb(QUOTRULE, 'Core Understanding — f is always the numerator and g the denominator, labeled explicitly, and the numerator\'s subtraction order is fixed since subtraction never commutes the way the Product Rule\'s addition does'),
  },
  {
    conceptId: HIGHORDER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A higher-order derivative is an ITERATED application of the derivative operator: f\'\' means '
      + 'differentiate f\' AGAIN, never square f\'\'s value — these are entirely different operations '
      + 'producing entirely different results (for f(x)=x³: f\'\'(x)=6x, while (f\'(x))²=9x⁴, differing '
      + 'not just numerically but in degree).\n\n'
      + 'THE NOTATION d²y/dx² MEANS THE OPERATOR d/dx APPLIED TWICE, NEVER (dy/dx)² READ AS SQUARING '
      + 'THE WHOLE FRACTION. The superscript "2" attaches to the operator d/dx, not to the fraction '
      + 'dy/dx as a whole — a subtle but consequential distinction, since d²y/dx² and (dy/dx)² can '
      + 'differ in every respect (for y=x²: the former is the constant 2, the latter is 4x², a genuine '
      + 'function of x).\n\n'
      + 'COMPUTING AN nTH DERIVATIVE REQUIRES TRACKING THE COEFFICIENT THROUGH EVERY SUCCESSIVE '
      + 'APPLICATION of the power rule, never obtained by simply subtracting n from the original '
      + 'exponent while keeping the original coefficient. Each step multiplies the running coefficient '
      + 'by the CURRENT exponent before decrementing it — the third derivative of x⁵ is 60x² (from '
      + '5→20→60, i.e. 5×4×3), never simply x² (which discards the coefficient accumulation entirely).',
    targetedMisconceptions: [`${HIGHORDER}:MC-1`, `${HIGHORDER}:MC-2`, `${HIGHORDER}:MC-3`],
    source: eb(HIGHORDER, 'Core Understanding — a higher-order derivative means differentiating again never squaring, d²y/dx² means the operator applied twice never the fraction squared, and the coefficient must be tracked through every successive application'),
  },
]

export const MATHEMATICS_CALCULUS_LOCAL_EXTREMA_QUOTIENT_HIGHER_ORDER_PROBES: SeedProbe[] = [
  // --- math.calc.local-extrema --------------------------------------------------
  {
    conceptId: LOCALEXT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x³, f\'(0)=0 but f\'(x)=3x² does NOT change sign on either side of x=0. Is x=0 still a local max or min?',
    choices: [
      { text: 'Neither — since the sign of f\' does not actually change, this is a completely legitimate "neither" outcome, not a failure of the First Derivative Test', isCorrect: true },
      { text: 'It must be one of the two, since f\'(0)=0 makes it a critical point and every critical point resolves to a max or min', isCorrect: false, misconceptionId: `${LOCALEXT}:MC-1` },
      { text: 'It is a local minimum by default, since f\'(x)≥0 on both sides', isCorrect: false, misconceptionId: `${LOCALEXT}:MC-1` },
    ],
    targetedMisconceptions: [`${LOCALEXT}:MC-1`],
    source: eb(LOCALEXT, 'Detection probe (Blueprint A01) — "neither" is a completely legitimate First Derivative Test outcome when the sign of f\' does not actually change, never an incomplete or failed analysis'),
  },
  {
    conceptId: LOCALEXT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'At a critical point c, f\'\'(c)=0. What does this tell you about whether c is a local max, min, or neither?',
    choices: [
      { text: 'Nothing by itself — f\'\'(c)=0 is genuinely inconclusive, and the First Derivative Test must be used instead to determine the answer', isCorrect: true },
      { text: 'It indicates c is likely a saddle point or a "weak" extremum', isCorrect: false, misconceptionId: `${LOCALEXT}:MC-2` },
      { text: 'It indicates the function has an inflection point that is automatically neither a max nor a min', isCorrect: false, misconceptionId: `${LOCALEXT}:MC-2` },
    ],
    targetedMisconceptions: [`${LOCALEXT}:MC-2`],
    source: eb(LOCALEXT, 'Detection probe (Blueprint A02) — f\'\'(c)=0 is genuinely inconclusive, carrying zero default meaning; the same signal can correspond to entirely different classifications depending on the function'),
  },
  {
    conceptId: LOCALEXT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=|x| at its critical point x=0 (where f\'(0) is undefined), can the Second Derivative Test be applied to classify it?',
    choices: [
      { text: 'No — the Second Derivative Test requires f\'(c)=0 specifically; since f\'(0) does not even exist here, there is no f\'\'(0) to compute in the relevant sense, and the First Derivative Test must be used instead', isCorrect: true },
      { text: 'Yes — the Second Derivative Test can be applied to any critical point, whether the derivative is zero or undefined there', isCorrect: false, misconceptionId: `${LOCALEXT}:MC-3` },
      { text: 'Yes, since an undefined derivative can be treated as approaching zero for the purposes of this test', isCorrect: false, misconceptionId: `${LOCALEXT}:MC-3` },
    ],
    targetedMisconceptions: [`${LOCALEXT}:MC-3`],
    source: eb(LOCALEXT, 'Detection probe (Blueprint B03) — the Second Derivative Test is inapplicable, not merely unhelpful, at a critical point where f\' itself is undefined rather than merely zero'),
  },

  // --- math.calc.quotient-rule ------------------------------------------------------
  {
    conceptId: QUOTRULE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For h(x)=x²/(x+1), which expression should be labeled f and which should be labeled g in the Quotient Rule?',
    choices: [
      { text: 'f=x² (the numerator, always on top) and g=x+1 (the denominator, always on bottom)', isCorrect: true },
      { text: 'f=x+1 (the first expression written in the problem) and g=x²', isCorrect: false, misconceptionId: `${QUOTRULE}:MC-1` },
      { text: 'Either assignment works, since the formula gives the same final answer either way', isCorrect: false, misconceptionId: `${QUOTRULE}:MC-1` },
    ],
    targetedMisconceptions: [`${QUOTRULE}:MC-1`],
    source: eb(QUOTRULE, 'Detection probe (Blueprint B01) — f is always the numerator and g is always the denominator, labeled explicitly before substituting, never assigned by which expression is named first'),
  },
  {
    conceptId: QUOTRULE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For h(x)=sin(x)/x, does the Quotient Rule\'s numerator use the order f\'g−fg\', or does the order fg\'−f\'g work just as well?',
    choices: [
      { text: 'Only f\'g−fg\' is correct — reversing the order gives fg\'−f\'g, which is the exact NEGATIVE of the correct derivative, since subtraction does not commute', isCorrect: true },
      { text: 'Either order works and gives the same final answer, the same way either order works for the Product Rule\'s addition', isCorrect: false, misconceptionId: `${QUOTRULE}:MC-2` },
      { text: 'The order only matters when the two terms happen to be unequal in size', isCorrect: false, misconceptionId: `${QUOTRULE}:MC-2` },
    ],
    targetedMisconceptions: [`${QUOTRULE}:MC-2`],
    source: eb(QUOTRULE, 'Detection probe (Blueprint B02) — the Quotient Rule\'s subtraction order is fixed as f\'g−fg\'; reversing it gives the exact negative, since subtraction never commutes the way the Product Rule\'s addition does'),
  },
  {
    conceptId: QUOTRULE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does order matter in the Quotient Rule\'s numerator but not in the Product Rule\'s formula?',
    choices: [
      { text: 'The Quotient Rule\'s numerator uses subtraction, which does not commute (a−b≠b−a in general); the Product Rule uses addition, which does commute (a+b=b+a always)', isCorrect: true },
      { text: 'The Quotient Rule is simply a stricter, more formal rule than the Product Rule for historical reasons', isCorrect: false, misconceptionId: `${QUOTRULE}:MC-2` },
      { text: 'Order only matters in the Quotient Rule because division itself is being performed, unrelated to the numerator\'s own internal structure', isCorrect: false, misconceptionId: `${QUOTRULE}:MC-2` },
    ],
    targetedMisconceptions: [`${QUOTRULE}:MC-2`],
    source: eb(QUOTRULE, 'Detection probe — the Quotient Rule\'s numerator is order-sensitive specifically because subtraction does not commute, a direct algebraic consequence, not an arbitrary convention'),
  },

  // --- math.calc.higher-order-derivatives ------------------------------------------------
  {
    conceptId: HIGHORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x², f\'(x)=2x. What is f\'\'(x)?',
    choices: [
      { text: '2 — differentiate f\'=2x again, using the power/constant rules, giving the constant 2', isCorrect: true },
      { text: '4x² — square f\'(x)=2x to get (2x)²=4x²', isCorrect: false, misconceptionId: `${HIGHORDER}:MC-1` },
      { text: '4x — square the coefficient of f\' while keeping the same variable term', isCorrect: false, misconceptionId: `${HIGHORDER}:MC-1` },
    ],
    targetedMisconceptions: [`${HIGHORDER}:MC-1`],
    source: eb(HIGHORDER, 'Detection probe (Blueprint B01) — the second derivative means differentiating f\' again, never squaring f\'\'s expression; these are entirely different operations producing entirely different results'),
  },
  {
    conceptId: HIGHORDER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For y=x³, what is d²y/dx²?',
    choices: [
      { text: '6x — apply d/dx to y to get dy/dx=3x², THEN apply d/dx again to that result, giving 6x', isCorrect: true },
      { text: '9x⁴ — square dy/dx=3x² to get (3x²)²=9x⁴', isCorrect: false, misconceptionId: `${HIGHORDER}:MC-2` },
      { text: 'They are the same expression, just written with different notation', isCorrect: false, misconceptionId: `${HIGHORDER}:MC-2` },
    ],
    targetedMisconceptions: [`${HIGHORDER}:MC-2`],
    source: eb(HIGHORDER, 'Detection probe (Blueprint B02) — d²y/dx² means the operator d/dx applied twice, never (dy/dx)² read as squaring the whole fraction; the two can differ in every respect, even in whether the result is a constant or a genuine function'),
  },
  {
    conceptId: HIGHORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the third derivative of f(x)=x⁵?',
    choices: [
      { text: '60x² — tracking the coefficient through every step: f\'=5x⁴, f\'\'=5×4x³=20x³, f\'\'\'=20×3x²=60x², i.e. 5×4×3=60', isCorrect: true },
      { text: 'x² — subtract 3 from the original exponent 5, keeping the original coefficient 1', isCorrect: false, misconceptionId: `${HIGHORDER}:MC-3` },
      { text: '5x² — keep the original coefficient 5 and subtract 3 from the exponent', isCorrect: false, misconceptionId: `${HIGHORDER}:MC-3` },
    ],
    targetedMisconceptions: [`${HIGHORDER}:MC-3`],
    source: eb(HIGHORDER, 'Detection probe (Blueprint B03) — computing an nth derivative requires tracking the coefficient through every successive application of the power rule, never obtained by simply subtracting n from the original exponent'),
  },
]

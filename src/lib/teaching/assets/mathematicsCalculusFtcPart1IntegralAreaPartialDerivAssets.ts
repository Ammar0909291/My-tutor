/**
 * Tenth math.calc asset batch — the Fundamental Theorem of Calculus
 * (Part 1), area via integrals, and partial derivatives.
 *
 * Continues serving-asset coverage for math.calc (31/76 -> 34/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.ftc-part1.md,
 * math.calc.integral-area.md, and math.calc.partial-derivatives.md.
 *
 *   FTCPART1     ftc-part1 — the dummy variable t vanishes entirely upon
 *                differentiation, replaced by the upper limit x in the
 *                output — never appearing as f(t) in G'(x); a constant
 *                lower limit shifts G(x)'s VALUE but NEVER its rate of
 *                change, regardless of what specific constant it is; a
 *                composite upper limit u(x) requires the chain-rule
 *                factor u'(x), never omitted, never treated as though
 *                the upper limit were simply x.
 *   INTEGRALAREA integral-area — area under a curve IS the definite
 *                integral's value when f≥0, never a genuinely new
 *                operation requiring its own procedure; top-minus-bottom
 *                is REQUIRED, never an arbitrary choice — reversing which
 *                function is "on top" flips the sign of the entire
 *                result; a single unsplit integral over a sign-changing
 *                function computes SIGNED area, never automatically the
 *                genuine unsigned total — splitting at the zeros is
 *                required for that.
 *   PARTIALDERIV partial-derivatives — computing ∂f/∂x means treating
 *                every occurrence of y as a fixed CONSTANT, never
 *                differentiating y-only terms with respect to y; mixed
 *                partials f_xy and f_yx are GUARANTEED EQUAL by
 *                Clairaut's theorem for smooth functions, never expected
 *                to differ the way "order matters" does for other
 *                operations; a single partial derivative captures only
 *                ONE directional rate, never the total rate of change
 *                along a path where both variables move together.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FTCPART1 = 'math.calc.ftc-part1'
const INTEGRALAREA = 'math.calc.integral-area'
const PARTIALDERIV = 'math.calc.partial-derivatives'

export const MATHEMATICS_CALCULUS_FTC_PART1_INTEGRAL_AREA_PARTIAL_DERIV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FTCPART1, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FTC Part 1: for f continuous on [a,b] and G(x)=∫ₐˣf(t)dt, G\'(x)=f(x) — differentiation and '
      + 'integration are INVERSE operations. THE SYMBOL t IS A DUMMY VARIABLE — a placeholder with no '
      + 'meaning outside the integral, exactly like a loop index in programming — and it VANISHES '
      + 'ENTIRELY upon differentiation, replaced by the upper limit x: G\'(x)=f(x), NEVER f(t).\n\n'
      + 'THE LOWER LIMIT a, BEING A FIXED CONSTANT, HAS NO EFFECT ON THE DERIVATIVE AT ALL — it only '
      + 'shifts G(x)\'s VALUE by a constant, which differentiates to zero. Whether the lower limit is '
      + '0 or any other constant like 3 makes no difference to G\'(x); doubting or hesitating over a '
      + 'non-zero lower limit is never warranted.\n\n'
      + 'WHEN THE UPPER LIMIT IS A COMPOSITE FUNCTION u(x), THE CHAIN RULE SUPPLIES A MANDATORY EXTRA '
      + 'FACTOR: d/dx[∫ₐ^u(x)f(t)dt]=f(u(x))·u\'(x) — evaluate the integrand at u(x), THEN multiply '
      + 'by u\'(x), a factor that is never optional whenever the upper limit is anything other than '
      + 'bare x.',
    targetedMisconceptions: [`${FTCPART1}:MC-1`, `${FTCPART1}:MC-2`, `${FTCPART1}:MC-3`],
    source: eb(FTCPART1, 'Core Understanding — the dummy variable vanishes and is replaced by x, a constant lower limit never affects the derivative, and a composite upper limit always requires the chain-rule factor'),
  },
  {
    conceptId: INTEGRALAREA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'AREA UNDER A CURVE REQUIRES NO NEW DEFINITION — when f(x)≥0 on [a,b], ∫ₐᵇf(x)dx IS the area, '
      + 'the exact same number already known from the definite integral, never a genuinely new '
      + 'operation requiring a separate procedure.\n\n'
      + 'FOR AREA BETWEEN TWO CURVES f(x)≥g(x), the setup is ∫ₐᵇ[f(x)-g(x)]dx — TOP MINUS BOTTOM IS '
      + 'REQUIRED, never an arbitrary choice of order. Reversing which function is subtracted from '
      + 'which flips the sign of every strip and produces the exact negative of the correct area — '
      + 'which function is genuinely on top must be VERIFIED (checking values at multiple points) '
      + 'before setting up the integral, never assumed.\n\n'
      + 'WHEN f DIPS BELOW THE X-AXIS SOMEWHERE ON [a,b], A SINGLE UNSPLIT INTEGRAL COMPUTES SIGNED '
      + 'AREA, never automatically the genuine unsigned total — the negative region\'s contribution '
      + 'genuinely SUBTRACTS, partially or fully canceling positive contributions. Computing the '
      + 'genuine unsigned total area requires locating f\'s zeros, splitting the interval there, and '
      + 'using ∫|f(x)|dx region by region, never a single unmodified integral over the whole span.',
    targetedMisconceptions: [`${INTEGRALAREA}:MC-1`, `${INTEGRALAREA}:MC-2`, `${INTEGRALAREA}:MC-3`],
    source: eb(INTEGRALAREA, 'Core Understanding — area under a curve is the integral\'s own value with no new operation, top-minus-bottom order is required and must be verified, and signed area never automatically equals genuine unsigned total'),
  },
  {
    conceptId: PARTIALDERIV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '∂f/∂x measures how f(x,y) changes when x moves and y is deliberately FROZEN — treated exactly '
      + 'like a fixed numerical constant, never a variable. TO COMPUTE ∂f/∂x, TREAT EVERY OCCURRENCE '
      + 'OF y AS A CONSTANT and apply single-variable differentiation rules to whatever remains as a '
      + 'function of x alone — a term containing ONLY y (like -7y²) must contribute EXACTLY ZERO to '
      + '∂f/∂x, never differentiated with respect to y by reflexive habit.\n\n'
      + 'FOUR second-order partials arise: f_xx, f_yy, and the two MIXED partials f_xy and f_yx. '
      + 'CLAIRAUT\'S THEOREM GUARANTEES f_xy=f_yx for functions with continuous mixed partials — '
      + 'essentially every smooth function encountered here — so the ORDER of differentiation '
      + 'genuinely does NOT matter, never an open question expected to potentially disagree the way '
      + '"order matters" does for other operations like matrix multiplication.\n\n'
      + '∂f/∂x ANSWERS A NARROW QUESTION — how fast f changes if ONLY x moves, y held fixed — and '
      + 'must NEVER be confused with the TOTAL rate of change along an arbitrary path where BOTH x '
      + 'and y vary together. That total rate combines BOTH partials via the multivariable chain rule, '
      + 'df/dt=(∂f/∂x)(dx/dt)+(∂f/∂y)(dy/dt); a single partial alone captures only one piece of it.',
    targetedMisconceptions: [`${PARTIALDERIV}:MC-1`, `${PARTIALDERIV}:MC-2`, `${PARTIALDERIV}:MC-3`],
    source: eb(PARTIALDERIV, 'Core Understanding — computing a partial derivative requires freezing the other variable as a constant, mixed partials are guaranteed equal by Clairaut\'s theorem, and a single partial captures only one directional rate, never the total'),
  },
]

export const MATHEMATICS_CALCULUS_FTC_PART1_INTEGRAL_AREA_PARTIAL_DERIV_PROBES: SeedProbe[] = [
  // --- math.calc.ftc-part1 -----------------------------------------------------------
  {
    conceptId: FTCPART1, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For G(x)=∫₀ˣsin(t)dt, what is G\'(x)?',
    choices: [
      { text: 'sin(x) — the dummy variable t vanishes upon differentiation, replaced entirely by the upper limit x', isCorrect: true },
      { text: 'sin(t) — the derivative retains the integrand exactly as written inside the integral', isCorrect: false, misconceptionId: `${FTCPART1}:MC-1` },
      { text: 'cos(x), since differentiating always changes the trigonometric function to its cofunction', isCorrect: false, misconceptionId: `${FTCPART1}:MC-1` },
    ],
    targetedMisconceptions: [`${FTCPART1}:MC-1`],
    source: eb(FTCPART1, 'Detection probe (Blueprint B01) — the dummy variable t vanishes entirely upon differentiation, with the output expressed entirely in terms of the upper limit x, never retaining t'),
  },
  {
    conceptId: FTCPART1, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For G(x)=∫₃ˣt²dt (lower limit 3, not 0), does FTC1 still give G\'(x)=x²?',
    choices: [
      { text: 'Yes — the lower limit is a fixed constant that only shifts G(x)\'s value, never its rate of change; G\'(x)=x² regardless of the specific lower limit', isCorrect: true },
      { text: 'No — a non-zero lower limit like 3 requires an offset or correction term in the derivative', isCorrect: false, misconceptionId: `${FTCPART1}:MC-2` },
      { text: 'No, since FTC1 only applies when the lower limit is specifically 0', isCorrect: false, misconceptionId: `${FTCPART1}:MC-2` },
    ],
    targetedMisconceptions: [`${FTCPART1}:MC-2`],
    source: eb(FTCPART1, 'Detection probe (Blueprint B02) — a constant lower limit shifts G(x)\'s value but never its rate of change; FTC1 applies identically regardless of the lower limit\'s specific value'),
  },
  {
    conceptId: FTCPART1, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Find d/dx[∫₀^(x²)cos(t)dt].',
    choices: [
      { text: 'cos(x²)·2x — evaluate the integrand at the upper limit x², then multiply by the chain-rule factor 2x (the derivative of x²)', isCorrect: true },
      { text: 'cos(x²) — evaluate the integrand at the upper limit directly, with no further factor needed', isCorrect: false, misconceptionId: `${FTCPART1}:MC-3` },
      { text: 'cos(2x), differentiating the upper limit and substituting it directly into the integrand', isCorrect: false, misconceptionId: `${FTCPART1}:MC-3` },
    ],
    targetedMisconceptions: [`${FTCPART1}:MC-3`],
    source: eb(FTCPART1, 'Detection probe (Blueprint A02) — a composite upper limit u(x) requires the mandatory chain-rule factor u\'(x), never omitted, never treated as though the upper limit were simply x'),
  },

  // --- math.calc.integral-area ---------------------------------------------------------
  {
    conceptId: INTEGRALAREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To find the area under f(x)=x² on [0,2], do you need a new procedure beyond evaluating ∫₀²x²dx?',
    choices: [
      { text: 'No — the area IS the definite integral\'s value (8/3), since f≥0 on this interval; no new operation is required beyond the already-known evaluation', isCorrect: true },
      { text: 'Yes — finding area requires a fundamentally different technique from evaluating a definite integral', isCorrect: false, misconceptionId: `${INTEGRALAREA}:MC-1` },
      { text: 'Yes, since "area" and "integral" are two separate mathematical concepts that happen to share a coincidental numeric relationship', isCorrect: false, misconceptionId: `${INTEGRALAREA}:MC-1` },
    ],
    targetedMisconceptions: [`${INTEGRALAREA}:MC-1`],
    source: eb(INTEGRALAREA, 'Detection probe (Blueprint A01) — area under a curve is the definite integral\'s own value when f≥0, never a genuinely new operation requiring its own separate procedure'),
  },
  {
    conceptId: INTEGRALAREA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the area between f(x)=x+2 and g(x)=x² on [-1,2], where f is above g, can you set up the integral as ∫[g(x)-f(x)]dx just as validly as ∫[f(x)-g(x)]dx?',
    choices: [
      { text: 'No — top minus bottom is required; setting it up as g(x)-f(x) instead of f(x)-g(x) flips the sign of every strip, producing the exact negative of the correct area', isCorrect: true },
      { text: 'Yes — since subtraction is being used either way, both orders give a mathematically equivalent setup for the area', isCorrect: false, misconceptionId: `${INTEGRALAREA}:MC-2` },
      { text: 'Yes, since the final numeric answer will be identical regardless of which function is subtracted from which', isCorrect: false, misconceptionId: `${INTEGRALAREA}:MC-2` },
    ],
    targetedMisconceptions: [`${INTEGRALAREA}:MC-2`],
    source: eb(INTEGRALAREA, 'Detection probe (Blueprint A02) — top-minus-bottom order is required, never an arbitrary choice; reversing which function is on top flips the sign of the entire result'),
  },
  {
    conceptId: INTEGRALAREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '∫₋₁²x dx=1.5. Is 1.5 the genuine (unsigned) area between f(x)=x and the x-axis on [-1,2]?',
    choices: [
      { text: 'No — f is negative on [-1,0], so the unsplit integral gives SIGNED area (1.5); the genuine unsigned total requires splitting at x=0 and adding the absolute values, giving 0.5+2=2.5', isCorrect: true },
      { text: 'Yes — the definite integral\'s value always equals the genuine unsigned area, regardless of whether the function is negative anywhere on the interval', isCorrect: false, misconceptionId: `${INTEGRALAREA}:MC-3` },
      { text: 'Yes, since a single integral automatically accounts for sign changes without any need to split the interval', isCorrect: false, misconceptionId: `${INTEGRALAREA}:MC-3` },
    ],
    targetedMisconceptions: [`${INTEGRALAREA}:MC-3`],
    source: eb(INTEGRALAREA, 'Detection probe (Blueprint A03) — a single unsplit integral over a sign-changing function computes signed area, never automatically the genuine unsigned total; splitting at the zeros is required for that'),
  },

  // --- math.calc.partial-derivatives -----------------------------------------------------
  {
    conceptId: PARTIALDERIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x,y)=3x²y³-7y², find ∂f/∂x.',
    choices: [
      { text: '6xy³ — the -7y² term contains only y (no x), so treating y as a constant makes it contribute exactly 0 to ∂f/∂x', isCorrect: true },
      { text: '6xy³-14y — differentiating the -7y² term with respect to y instead of treating it as a constant', isCorrect: false, misconceptionId: `${PARTIALDERIV}:MC-1` },
      { text: '6xy³-14yx, applying the derivative to every visible term regardless of which variable is being held fixed', isCorrect: false, misconceptionId: `${PARTIALDERIV}:MC-1` },
    ],
    targetedMisconceptions: [`${PARTIALDERIV}:MC-1`],
    source: eb(PARTIALDERIV, 'Detection probe (Blueprint A01) — computing ∂f/∂x requires treating every occurrence of y as a fixed constant; a term containing only y must contribute exactly zero'),
  },
  {
    conceptId: PARTIALDERIV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x,y)=x²y+eˣʸ, computing f_xy and f_yx via two independent orders, should you expect these to potentially disagree?',
    choices: [
      { text: 'No — Clairaut\'s theorem guarantees f_xy=f_yx for smooth functions with continuous mixed partials; computing both is a confirming check, never a race between two potentially different answers', isCorrect: true },
      { text: 'Yes — since the order of differentiation is being changed, the two mixed partials should generally be expected to give different results', isCorrect: false, misconceptionId: `${PARTIALDERIV}:MC-2` },
      { text: 'Yes, since mixed partial derivatives behave like non-commutative operations such as matrix multiplication', isCorrect: false, misconceptionId: `${PARTIALDERIV}:MC-2` },
    ],
    targetedMisconceptions: [`${PARTIALDERIV}:MC-2`],
    source: eb(PARTIALDERIV, 'Detection probe (Blueprint A03) — Clairaut\'s theorem guarantees f_xy=f_yx for smooth functions, so the order of differentiation genuinely does not matter, never an open question expected to disagree'),
  },
  {
    conceptId: PARTIALDERIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x,y)=x²+y² moving along the path x=t, y=t, is ∂f/∂x=2t the complete rate of change of f along this path?',
    choices: [
      { text: 'No — the total rate df/dt combines BOTH partials via the chain rule: df/dt=(∂f/∂x)(dx/dt)+(∂f/∂y)(dy/dt)=2t·1+2t·1=4t, which genuinely differs from ∂f/∂x=2t alone', isCorrect: true },
      { text: 'Yes — a single partial derivative always captures the complete rate of change of a function along any path through that point', isCorrect: false, misconceptionId: `${PARTIALDERIV}:MC-3` },
      { text: 'Yes, since ∂f/∂x already accounts for both variables changing simultaneously along a path', isCorrect: false, misconceptionId: `${PARTIALDERIV}:MC-3` },
    ],
    targetedMisconceptions: [`${PARTIALDERIV}:MC-3`],
    source: eb(PARTIALDERIV, 'Detection probe (Blueprint B-MC3) — a single partial derivative captures only one directional rate, never the total rate of change along a path where both variables move together; the multivariable chain rule combines both'),
  },
]

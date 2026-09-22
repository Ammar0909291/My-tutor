/**
 * Eleventh math.calc asset batch — the Fundamental Theorem of Calculus
 * (Part 2), the gradient, and arc length.
 *
 * Continues serving-asset coverage for math.calc (34/76 -> 37/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.ftc-part2.md,
 * math.calc.gradient.md, and math.calc.arc-length.md.
 *
 *   FTCPART2     ftc-part2 — the bracket [F(x)]ₐᵇ means F(b)-F(a), the
 *                UPPER bound first minus the LOWER bound, never the
 *                reverse (which negates the entire answer); the +C
 *                constant CANCELS algebraically in the subtraction and
 *                must NEVER appear in a definite-integral's final
 *                answer; both bounds must be evaluated and subtracted —
 *                evaluating only one bound and stopping is never a
 *                complete answer.
 *   GRADIENT     gradient — the gradient vector describes DIRECTION and
 *                RATE of change, never the function's own scalar VALUE
 *                at that point; the gradient points PERPENDICULAR to a
 *                level curve, never along it, since moving along a level
 *                curve is the zero-change direction while the gradient
 *                is specifically the maximum-change direction; a zero
 *                gradient marks a genuine candidate critical point, never
 *                an unremarkable computational outcome to move past
 *                without comment.
 *   ARCLENGTH    arc-length — the arc-length formula is the SAME
 *                Riemann-sum-as-a-limit construction already known from
 *                the definite integral, never an unrelated new formula;
 *                the integrand √(1+[f'(x)]²) is required because the
 *                Pythagorean theorem combines BOTH horizontal and
 *                vertical components — the bare derivative f'(x) alone
 *                is NEVER sufficient; the parametric arc-length formula
 *                is a direct generalization reducing to the explicit-
 *                function formula, never an unrelated alternative
 *                requiring separate memorization.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FTCPART2 = 'math.calc.ftc-part2'
const GRADIENT = 'math.calc.gradient'
const ARCLENGTH = 'math.calc.arc-length'

export const MATHEMATICS_CALCULUS_FTC_PART2_GRADIENT_ARC_LENGTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FTCPART2, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FTC Part 2 (the Evaluation Theorem): ∫ₐᵇf(x)dx=F(b)-F(a), where F is ANY antiderivative of f. '
      + 'THE BRACKET [F(x)]ₐᵇ MEANS F(b)-F(a) — THE UPPER BOUND FIRST, MINUS THE LOWER BOUND — never '
      + 'the reverse; reversing the order (F(a)-F(b)) negates the entire answer, since '
      + 'F(a)-F(b)=-(F(b)-F(a)).\n\n'
      + 'THE ARBITRARY CONSTANT +C CANCELS ALGEBRAICALLY IN THE SUBTRACTION and must NEVER appear in '
      + 'a definite-integral\'s final answer: [F(x)+C]ₐᵇ=(F(b)+C)-(F(a)+C)=F(b)-F(a), with the two '
      + 'copies of C canceling regardless of which specific antiderivative (which value of C) was '
      + 'chosen — this is genuinely different from the indefinite integral, which always requires +C.\n\n'
      + 'BOTH BOUNDS MUST BE EVALUATED AND SUBTRACTED — evaluating the antiderivative at only ONE '
      + 'bound and presenting that single value is never a complete answer; the definite integral is '
      + 'a genuinely two-evaluation, subtraction-based procedure, never a single-point evaluation the '
      + 'way differentiation is.',
    targetedMisconceptions: [`${FTCPART2}:MC-1`, `${FTCPART2}:MC-2`, `${FTCPART2}:MC-3`],
    source: eb(FTCPART2, 'Core Understanding — the bracket means upper bound minus lower bound, the constant C always cancels and must never appear, and both bounds must be evaluated and subtracted'),
  },
  {
    conceptId: GRADIENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The gradient ∇f=(∂f/∂x, ∂f/∂y, ...) packages a multivariable function\'s partial derivatives '
      + 'into a single vector. THE GRADIENT DESCRIBES DIRECTION AND RATE OF CHANGE, NEVER THE '
      + 'FUNCTION\'S OWN SCALAR VALUE at that point — ∇f(2,3) reveals how f is changing near (2,3), '
      + 'never what f(2,3) itself equals; these are genuinely different kinds of objects (a vector '
      + 'versus a scalar) answering different questions.\n\n'
      + 'THE GRADIENT POINTS PERPENDICULAR TO A LEVEL CURVE, NEVER ALONG IT. Moving along a level '
      + 'curve keeps f constant — a zero rate of change in that direction — while the gradient '
      + 'specifically captures the direction of MAXIMUM change; the direction of zero change and the '
      + 'direction of maximum change are always perpendicular to one another, never parallel.\n\n'
      + 'A ZERO GRADIENT MARKS A GENUINE CANDIDATE CRITICAL POINT, never an unremarkable computational '
      + 'outcome to move past without comment. ∇f=(0,0) means every partial derivative there is zero, '
      + 'so every directional rate of change also vanishes — the direct multivariable analogue of the '
      + 'single-variable f\'(c)=0 condition.',
    targetedMisconceptions: [`${GRADIENT}:MC-1`, `${GRADIENT}:MC-2`, `${GRADIENT}:MC-3`],
    source: eb(GRADIENT, 'Core Understanding — the gradient describes direction and rate never the function\'s value, it points perpendicular to level curves never along them, and a zero gradient marks a genuine candidate critical point'),
  },
  {
    conceptId: ARCLENGTH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Arc length is THE SAME limiting idea as the definite integral\'s own Riemann-sum construction, '
      + 'applied to LENGTHS instead of AREAS — never an unrelated new formula to memorize in '
      + 'isolation. Partitioning the curve into short straight-line segments and applying the '
      + 'Pythagorean theorem, the sum of segment lengths becomes a Riemann sum converging to '
      + 'L=∫ₐᵇ√(1+[f\'(x)]²)dx.\n\n'
      + 'THE INTEGRAND √(1+[f\'(x)]²) IS REQUIRED — NEVER THE BARE DERIVATIVE f\'(x) ALONE. The '
      + 'Pythagorean-theorem derivation combines BOTH the horizontal component (dx) and the vertical '
      + 'component (dy=f\'(x)dx) of each tiny segment; the derivative alone captures only the '
      + 'vertical-to-horizontal RATE, never the actual straight-line distance traveled — integrating '
      + 'f\'(x) alone measures net vertical change, a genuinely different quantity from length.\n\n'
      + 'THE PARAMETRIC ARC-LENGTH FORMULA L=∫√([x\'(t)]²+[y\'(t)]²)dt IS A DIRECT GENERALIZATION, '
      + 'never an unrelated alternative requiring separate memorization — it reduces to the '
      + 'explicit-function formula as a special case when x(t)=t.',
    targetedMisconceptions: [`${ARCLENGTH}:MC-1`, `${ARCLENGTH}:MC-2`, `${ARCLENGTH}:MC-3`],
    source: eb(ARCLENGTH, 'Core Understanding — arc length is the same Riemann-sum construction applied to lengths, the Pythagorean integrand is required and never the bare derivative alone, and the parametric formula is a direct generalization never an unrelated alternative'),
  },
]

export const MATHEMATICS_CALCULUS_FTC_PART2_GRADIENT_ARC_LENGTH_PROBES: SeedProbe[] = [
  // --- math.calc.ftc-part2 -----------------------------------------------------------
  {
    conceptId: FTCPART2, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∫₁³(2x)dx with F(x)=x², is the correct evaluation F(1)-F(3), or F(3)-F(1)?',
    choices: [
      { text: 'F(3)-F(1)=9-1=8 — the bracket [F(x)]₁³ means the UPPER bound first, minus the lower bound', isCorrect: true },
      { text: 'F(1)-F(3)=1-9=-8 — evaluating the lower bound first since it is encountered first in the integral symbol', isCorrect: false, misconceptionId: `${FTCPART2}:MC-1` },
      { text: 'Either order is acceptable since subtraction gives an equally valid answer either way', isCorrect: false, misconceptionId: `${FTCPART2}:MC-1` },
    ],
    targetedMisconceptions: [`${FTCPART2}:MC-1`],
    source: eb(FTCPART2, 'Detection probe (Blueprint B01) — the bracket [F(x)]ₐᵇ means F(b)-F(a), upper bound first minus lower bound; reversing the order negates the entire answer'),
  },
  {
    conceptId: FTCPART2, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Evaluating ∫₀²(3x²)dx using F(x)=x³+C, should the final answer include +C?',
    choices: [
      { text: 'No — the two copies of C cancel exactly in the subtraction (F(2)+C)-(F(0)+C)=8-0=8, regardless of which value of C was chosen', isCorrect: true },
      { text: 'Yes — every antiderivative must carry +C, so the definite integral\'s final answer should be written as "8+C"', isCorrect: false, misconceptionId: `${FTCPART2}:MC-2` },
      { text: 'Yes, since omitting C would make the answer a specific antiderivative\'s value rather than the general one', isCorrect: false, misconceptionId: `${FTCPART2}:MC-2` },
    ],
    targetedMisconceptions: [`${FTCPART2}:MC-2`],
    source: eb(FTCPART2, 'Detection probe (Blueprint B02) — the constant C cancels algebraically in the subtraction and must never appear in a definite-integral\'s final numeric answer'),
  },
  {
    conceptId: FTCPART2, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Evaluating ∫₁⁴(2x)dx, a student computes F(4)=16 and stops, reporting 16 as the answer. Is this correct?',
    choices: [
      { text: 'No — F(1)=1 must also be evaluated and subtracted: F(4)-F(1)=16-1=15 is the complete answer, never a single bound\'s value alone', isCorrect: true },
      { text: 'Yes — evaluating the antiderivative at the upper bound alone gives the complete definite-integral answer', isCorrect: false, misconceptionId: `${FTCPART2}:MC-3` },
      { text: 'Yes, since the lower bound only matters when it is non-zero', isCorrect: false, misconceptionId: `${FTCPART2}:MC-3` },
    ],
    targetedMisconceptions: [`${FTCPART2}:MC-3`],
    source: eb(FTCPART2, 'Detection probe (Blueprint B03) — both bounds must be evaluated and subtracted; evaluating only one bound and presenting that value is never a complete answer'),
  },

  // --- math.calc.gradient ---------------------------------------------------------
  {
    conceptId: GRADIENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x,y)=x²y+3y² at (1,2), does ∇f(1,2) tell you what f(1,2) equals?',
    choices: [
      { text: 'No — ∇f(1,2) is a vector describing the direction and rate at which f is changing near (1,2), never the scalar value f(1,2) itself', isCorrect: true },
      { text: 'Yes — the gradient evaluated at a point reveals that point\'s function value', isCorrect: false, misconceptionId: `${GRADIENT}:MC-1` },
      { text: 'Yes, since both f and ∇f are "evaluated at a point" using the same underlying computation', isCorrect: false, misconceptionId: `${GRADIENT}:MC-1` },
    ],
    targetedMisconceptions: [`${GRADIENT}:MC-1`],
    source: eb(GRADIENT, 'Detection probe (Blueprint A01) — the gradient describes direction and rate of change, never the function\'s own scalar value at that point'),
  },
  {
    conceptId: GRADIENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x,y)=x²+y² with circular level curves, does the gradient at a point on a level curve point ALONG that curve, or across it?',
    choices: [
      { text: 'Across it — perpendicular to the level curve, since moving along the curve keeps f constant (zero change) while the gradient specifically points in the maximum-change direction', isCorrect: true },
      { text: 'Along it — the gradient follows the direction of the level curve at every point', isCorrect: false, misconceptionId: `${GRADIENT}:MC-2` },
      { text: 'Along it, since the level curve is the most visually prominent direction on a contour map', isCorrect: false, misconceptionId: `${GRADIENT}:MC-2` },
    ],
    targetedMisconceptions: [`${GRADIENT}:MC-2`],
    source: eb(GRADIENT, 'Detection probe (Blueprint A02) — the gradient points perpendicular to a level curve, never along it, since zero-change and maximum-change directions are geometrically perpendicular'),
  },
  {
    conceptId: GRADIENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Computing ∇f(a,b)=(0,0) for some function f, what should you conclude?',
    choices: [
      { text: '(a,b) is a genuine candidate critical point — every partial derivative is zero there, so every directional rate of change vanishes, the direct multivariable analogue of f\'(c)=0', isCorrect: true },
      { text: 'Nothing significant — a zero gradient is simply an unremarkable computational outcome with no further interpretation needed', isCorrect: false, misconceptionId: `${GRADIENT}:MC-3` },
      { text: 'The function is undefined at (a,b), since the gradient failed to produce a nonzero result', isCorrect: false, misconceptionId: `${GRADIENT}:MC-3` },
    ],
    targetedMisconceptions: [`${GRADIENT}:MC-3`],
    source: eb(GRADIENT, 'Detection probe (Blueprint B03) — a zero gradient marks a genuine candidate critical point, never an unremarkable computational outcome to move past without comment'),
  },

  // --- math.calc.arc-length -----------------------------------------------------------
  {
    conceptId: ARCLENGTH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the arc-length formula L=∫√(1+[f\'(x)]²)dx an independent new formula, unrelated to the Riemann-sum-as-a-limit idea already known from the definite integral?',
    choices: [
      { text: 'No — it is the SAME limit-of-sums construction, applied to straight-line segment lengths (via the Pythagorean theorem) instead of rectangle areas', isCorrect: true },
      { text: 'Yes — arc length is derived through an entirely separate mathematical process unrelated to Riemann sums', isCorrect: false, misconceptionId: `${ARCLENGTH}:MC-1` },
      { text: 'Yes, since arc length concerns curve lengths while the definite integral concerns areas, two unrelated geometric quantities', isCorrect: false, misconceptionId: `${ARCLENGTH}:MC-1` },
    ],
    targetedMisconceptions: [`${ARCLENGTH}:MC-1`],
    source: eb(ARCLENGTH, 'Detection probe (Blueprint A01) — the arc-length formula is the same Riemann-sum-as-a-limit construction already known from the definite integral, applied to segment lengths instead of areas'),
  },
  {
    conceptId: ARCLENGTH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could arc length be computed by integrating just f\'(x) directly, rather than √(1+[f\'(x)]²)?',
    choices: [
      { text: 'No — the Pythagorean theorem combines BOTH the horizontal (dx) and vertical (dy=f\'(x)dx) components of each segment; f\'(x) alone measures only the rate, never the actual straight-line distance traveled', isCorrect: true },
      { text: 'Yes — since f\'(x) already measures the curve\'s steepness, integrating it directly gives the correct path length', isCorrect: false, misconceptionId: `${ARCLENGTH}:MC-2` },
      { text: 'Yes, since the derivative captures everything relevant about how much extra distance the curve\'s steepness contributes', isCorrect: false, misconceptionId: `${ARCLENGTH}:MC-2` },
    ],
    targetedMisconceptions: [`${ARCLENGTH}:MC-2`],
    source: eb(ARCLENGTH, 'Detection probe (Blueprint A02) — the arc-length integrand requires the Pythagorean combination √(1+[f\'(x)]²); the bare derivative f\'(x) alone is never sufficient, since it measures net vertical change, not length'),
  },
  {
    conceptId: ARCLENGTH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the parametric arc-length formula L=∫√([x\'(t)]²+[y\'(t)]²)dt an unrelated alternative technique requiring separate memorization from the explicit-function formula?',
    choices: [
      { text: 'No — it is a direct generalization of the explicit-function formula, reducing to it exactly when x(t)=t', isCorrect: true },
      { text: 'Yes — the parametric formula applies to a genuinely different kind of curve, requiring its own independent derivation and memorization', isCorrect: false, misconceptionId: `${ARCLENGTH}:MC-3` },
      { text: 'Yes, since parametric curves and explicit-function curves are fundamentally unrelated mathematical objects', isCorrect: false, misconceptionId: `${ARCLENGTH}:MC-3` },
    ],
    targetedMisconceptions: [`${ARCLENGTH}:MC-3`],
    source: eb(ARCLENGTH, 'Detection probe (Blueprint A03) — the parametric arc-length formula is a direct generalization of the explicit-function formula, reducing to it as a special case, never an unrelated alternative'),
  },
]

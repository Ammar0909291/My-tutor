/**
 * Twelfth math.calc asset batch — the directional derivative,
 * u-substitution, and volume of revolution.
 *
 * Continues serving-asset coverage for math.calc (37/76 -> 40/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.directional-derivative.md,
 * math.calc.u-substitution.md, and math.calc.volume-revolution.md.
 *
 *   DIRDERIV     directional-derivative — the direction vector u MUST be
 *                a unit vector — a non-unit vector must be normalized
 *                first, or the formula gives an incorrectly scaled
 *                result; the maximum RATE of increase is the gradient's
 *                MAGNITUDE (a scalar), never the gradient vector's raw
 *                components reported directly.
 *   USUB         u-substitution — before rewriting anything, du (or a
 *                constant multiple of it) must be VERIFIED present as a
 *                factor in the integrand — substitution simply cannot
 *                proceed when this differential is genuinely absent, no
 *                matter how natural the choice of u seems; a definite
 *                integral's bounds must be CONVERTED from x-values to
 *                u-values at the moment of substitution, never left as
 *                the original x-limits.
 *   VOLUMEREV    volume-revolution — a region with a genuine GAP from the
 *                axis of revolution requires the washer method (outer
 *                radius squared minus inner radius squared), never the
 *                disk method alone, which would overcount the hollow
 *                interior as solid material; the shell method is a
 *                genuine, often more efficient alternative for vertical-
 *                axis revolutions, never merely an inferior substitute
 *                that must be overlooked in favor of an inverse-function
 *                rewrite.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DIRDERIV = 'math.calc.directional-derivative'
const USUB = 'math.calc.u-substitution'
const VOLUMEREV = 'math.calc.volume-revolution'

export const MATHEMATICS_CALCULUS_DIRECTIONAL_DERIV_USUB_VOLUME_REV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DIRDERIV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The directional derivative D_uf=∇f·u measures the rate of change of f at a point, moving in '
      + 'the direction of a UNIT vector u. REQUIRING u TO BE A UNIT VECTOR IS NOT A TECHNICALITY — '
      + 'the formula measures rate of change PER UNIT DISTANCE, so a non-unit vector scales the result '
      + 'by that vector\'s own length, producing a physically meaningless number unless normalized '
      + 'first. A dot product is computable for any two vectors regardless of length, but the RESULT '
      + 'is only meaningful for a genuine unit direction vector.\n\n'
      + 'THE DIRECTIONAL DERIVATIVE IS MAXIMIZED WHEN u POINTS IN THE SAME DIRECTION AS ∇f, giving '
      + 'D_uf=|∇f| — the gradient\'s own MAGNITUDE, a single scalar number. THE MAXIMUM RATE OF '
      + 'INCREASE IS THIS MAGNITUDE, NEVER THE GRADIENT VECTOR\'S RAW COMPONENTS reported directly — '
      + 'the maximizing DIRECTION (a normalized vector) and the maximum VALUE (a scalar, the '
      + 'magnitude) are two genuinely different answers to two different questions, both derived from '
      + 'the same gradient.\n\n'
      + 'The ordinary partial derivatives f_x and f_y are themselves SPECIAL CASE directional '
      + 'derivatives along the coordinate axes: f_x=D_(1,0)f and f_y=D_(0,1)f.',
    targetedMisconceptions: [`${DIRDERIV}:MC-1`, `${DIRDERIV}:MC-2`],
    source: eb(DIRDERIV, 'Core Understanding — the direction vector must be normalized to a unit vector, and the maximum rate of increase is the gradient\'s magnitude, never its raw components'),
  },
  {
    conceptId: USUB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Integration by substitution is the DIRECT REVERSE of the Chain Rule: set u=g(x), du=g\'(x)dx, '
      + 'rewrite in terms of u, evaluate, and back-substitute. THE SINGLE MOST CONSEQUENTIAL STEP IS '
      + 'VERIFICATION — before rewriting anything, g\'(x) (possibly scaled by a constant) must '
      + 'genuinely appear as a factor in the integrand. IF IT DOES NOT, SUBSTITUTION CANNOT PROCEED, '
      + 'no matter how natural the choice of u seems — the integral cannot be expressed purely in '
      + 'terms of u without a leftover, unconvertible x.\n\n'
      + 'When a constant mismatch exists (e.g. the integrand has x²dx but du=3x²dx), the correct '
      + 'response is to ADJUST the relationship algebraically (x²dx=⅓du), never to alter what du '
      + 'itself equals.\n\n'
      + 'FOR DEFINITE INTEGRALS, THE BOUNDS MUST BE CONVERTED FROM x-VALUES TO THEIR CORRESPONDING '
      + 'u-VALUES at the SAME moment the variable is substituted (x=a↦u=g(a), x=b↦u=g(b)) — never '
      + 'left as the original x-limits once the integrand is rewritten in terms of u; converting '
      + 'limits is part of the substitution itself, never an optional final step.',
    targetedMisconceptions: [`${USUB}:MC-1`, `${USUB}:MC-2`, `${USUB}:MC-3`],
    source: eb(USUB, 'Core Understanding — du must be verified present before rewriting, a constant mismatch is adjusted algebraically never altering du itself, and definite-integral bounds must be converted to u-values at the moment of substitution'),
  },
  {
    conceptId: VOLUMEREV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Volume by revolution is the same limiting idea as area-by-strips, one dimension up. THE DISK '
      + 'METHOD (V=π∫f(x)²dx) APPLIES ONLY WHEN THE REGION TOUCHES THE AXIS DIRECTLY. A REGION WITH A '
      + 'GENUINE GAP FROM THE AXIS REQUIRES THE WASHER METHOD (V=π∫[f(x)²-g(x)²]dx), subtracting the '
      + 'hollow inner volume — using the disk method alone on a gapped region OVERCOUNTS the hollow '
      + 'interior as if it were solid material, a substantial error, never merely an inefficiency.\n\n'
      + 'THE SHELL METHOD (V=2π∫xf(x)dx) IS A GENUINE, OFTEN MORE EFFICIENT ALTERNATIVE for revolution '
      + 'around a VERTICAL axis when the region is naturally described as y=f(x) — it avoids solving '
      + 'for the inverse function x=f⁻¹(y) that disk/washer would otherwise require. The shell method '
      + 'is never merely an inferior substitute to be overlooked in favor of forcing an unnecessary '
      + 'inverse-function rewrite; the choice among disk, washer, and shell is a matter of efficiency, '
      + 'never correctness, once the gap and axis orientation are both correctly diagnosed.',
    targetedMisconceptions: [`${VOLUMEREV}:MC-1`, `${VOLUMEREV}:MC-2`],
    source: eb(VOLUMEREV, 'Core Understanding — a genuine gap from the axis requires the washer method never the disk method alone, and the shell method is a genuine efficient alternative for vertical-axis revolutions, never an inferior substitute'),
  },
]

export const MATHEMATICS_CALCULUS_DIRECTIONAL_DERIV_USUB_VOLUME_REV_PROBES: SeedProbe[] = [
  // --- math.calc.directional-derivative --------------------------------------------
  {
    conceptId: DIRDERIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∇f=(4,1), can D_vf be computed by directly dotting ∇f with v=(3,4) without any preliminary step?',
    choices: [
      { text: 'No — v must first be normalized to a unit vector (dividing by its magnitude 5, giving (3/5, 4/5)); dotting with the un-normalized v scales the result by 5 times too large', isCorrect: true },
      { text: 'Yes — the dot product ∇f·v is the complete formula regardless of v\'s length', isCorrect: false, misconceptionId: `${DIRDERIV}:MC-1` },
      { text: 'Yes, since normalization only matters when the direction vector has a length greater than 10', isCorrect: false, misconceptionId: `${DIRDERIV}:MC-1` },
    ],
    targetedMisconceptions: [`${DIRDERIV}:MC-1`],
    source: eb(DIRDERIV, 'Detection probe (Blueprint A01) — the direction vector u must be a unit vector; a non-unit vector must be normalized first, or the formula gives an incorrectly scaled result'),
  },
  {
    conceptId: DIRDERIV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f at a point with ∇f=(4,1), what is the maximum rate of increase of f in any direction?',
    choices: [
      { text: '√17 — the magnitude |∇f|=√(4²+1²)=√17, a single scalar number', isCorrect: true },
      { text: '(4,1) — the gradient vector itself is the maximum rate', isCorrect: false, misconceptionId: `${DIRDERIV}:MC-2` },
      { text: '4, the larger of the two gradient components', isCorrect: false, misconceptionId: `${DIRDERIV}:MC-2` },
    ],
    targetedMisconceptions: [`${DIRDERIV}:MC-2`],
    source: eb(DIRDERIV, 'Detection probe (Blueprint A02) — the maximum rate of increase is the gradient\'s magnitude, a scalar, never the gradient vector\'s raw components reported directly'),
  },
  {
    conceptId: DIRDERIV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How does the ordinary partial derivative f_x relate to the directional derivative?',
    choices: [
      { text: 'f_x is the special-case directional derivative along the x-axis direction: f_x=D_(1,0)f', isCorrect: true },
      { text: 'f_x and directional derivatives are unrelated computations that happen to use similar notation', isCorrect: false, misconceptionId: `${DIRDERIV}:MC-2` },
      { text: 'f_x is always exactly half of the directional derivative in any direction', isCorrect: false, misconceptionId: `${DIRDERIV}:MC-2` },
    ],
    targetedMisconceptions: [`${DIRDERIV}:MC-2`],
    source: eb(DIRDERIV, 'Detection probe — ordinary partial derivatives are simply special-case directional derivatives measured along the coordinate axes, the directional derivative being the genuine generalization to any direction'),
  },

  // --- math.calc.u-substitution ------------------------------------------------------
  {
    conceptId: USUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Setting up u-substitution for ∫cos(x²)dx with u=x², du=2x dx. Can the substitution proceed?',
    choices: [
      { text: 'No — the factor 2x (or any constant multiple of it) is entirely absent from the integrand, so the integral cannot be expressed purely in terms of u; substitution genuinely fails here', isCorrect: true },
      { text: 'Yes — since u=x² is a natural, sensible choice, the substitution can proceed to ∫cos(u)du regardless of what factors appear elsewhere', isCorrect: false, misconceptionId: `${USUB}:MC-1` },
      { text: 'Yes, since any inner-looking expression can always be set equal to u and substituted', isCorrect: false, misconceptionId: `${USUB}:MC-1` },
    ],
    targetedMisconceptions: [`${USUB}:MC-1`],
    source: eb(USUB, 'Detection probe (Blueprint B01) — before rewriting anything, du (or a constant multiple) must be verified present as a factor in the integrand; substitution cannot proceed when it is genuinely absent'),
  },
  {
    conceptId: USUB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Evaluating ∫₀¹2x(x²+1)³dx with u=x²+1, what are the correct u-bounds?',
    choices: [
      { text: 'u=1 to u=2 — converting x=0↦u=(0)²+1=1 and x=1↦u=(1)²+1=2 at the moment of substitution', isCorrect: true },
      { text: 'u=0 to u=1 — keeping the original x-bounds unchanged on the u-integrand', isCorrect: false, misconceptionId: `${USUB}:MC-2` },
      { text: 'The bounds do not need to change since the integral\'s value is a fixed number regardless of variable', isCorrect: false, misconceptionId: `${USUB}:MC-2` },
    ],
    targetedMisconceptions: [`${USUB}:MC-2`],
    source: eb(USUB, 'Detection probe (Blueprint B02) — a definite integral\'s bounds must be converted from x-values to u-values at the moment of substitution, never left as the original x-limits'),
  },
  {
    conceptId: USUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For u=x², what is du?',
    choices: [
      { text: 'du=2x dx — applying the power rule fully, including the coefficient 2', isCorrect: true },
      { text: 'du=x dx — omitting the coefficient that the power rule produces', isCorrect: false, misconceptionId: `${USUB}:MC-3` },
      { text: 'du=x²dx, keeping the original expression unchanged', isCorrect: false, misconceptionId: `${USUB}:MC-3` },
    ],
    targetedMisconceptions: [`${USUB}:MC-3`],
    source: eb(USUB, 'Detection probe (Blueprint B03) — computing du requires applying the derivative rule completely, including any coefficient, never omitting it'),
  },

  // --- math.calc.volume-revolution -----------------------------------------------------
  {
    conceptId: VOLUMEREV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The region between f(x)=√x and g(x)=x/2 on [0,4] is revolved around the x-axis, and the region does not touch the axis everywhere. Should the disk method V=π∫f(x)²dx be used?',
    choices: [
      { text: 'No — since there is a genuine gap from the axis, the washer method V=π∫[f(x)²-g(x)²]dx is required, subtracting the hollow interior; disk-only would overcount it as solid material', isCorrect: true },
      { text: 'Yes — the disk method applies to any region being revolved around an axis, regardless of whether it touches the axis', isCorrect: false, misconceptionId: `${VOLUMEREV}:MC-1` },
      { text: 'Yes, since squaring the outer function and integrating always gives the correct volume', isCorrect: false, misconceptionId: `${VOLUMEREV}:MC-1` },
    ],
    targetedMisconceptions: [`${VOLUMEREV}:MC-1`],
    source: eb(VOLUMEREV, 'Detection probe (Blueprint Example 2) — a region with a genuine gap from the axis requires the washer method, never the disk method alone, which would overcount the hollow interior as solid'),
  },
  {
    conceptId: VOLUMEREV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Revolving f(x)=x² on [0,2] around the y-axis (a vertical axis), should you immediately solve for x=√y to force the disk/washer method?',
    choices: [
      { text: 'Not necessarily — the shell method V=2π∫xf(x)dx applies directly to f(x)=x² without any inverse-function rewrite, and is often the more efficient choice here', isCorrect: true },
      { text: 'Yes — disk/washer via an inverse-function rewrite is always the correct and only approach for vertical-axis revolutions', isCorrect: false, misconceptionId: `${VOLUMEREV}:MC-2` },
      { text: 'Yes, since the shell method is an incorrect technique for vertical-axis revolutions', isCorrect: false, misconceptionId: `${VOLUMEREV}:MC-2` },
    ],
    targetedMisconceptions: [`${VOLUMEREV}:MC-2`],
    source: eb(VOLUMEREV, 'Detection probe (Blueprint Example 3) — the shell method is a genuine, often more efficient alternative for vertical-axis revolutions, never merely an inferior substitute overlooked in favor of an inverse-function rewrite'),
  },
  {
    conceptId: VOLUMEREV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are the disk, washer, and shell methods three different techniques where only one can ever give a correct answer for a given solid?',
    choices: [
      { text: 'No — any solid of revolution can in principle be computed by any applicable method; the choice among them is a matter of computational efficiency, never correctness, once the gap and axis orientation are correctly diagnosed', isCorrect: true },
      { text: 'Yes — each solid has exactly one correct method, determined entirely by which axis it is revolved around', isCorrect: false, misconceptionId: `${VOLUMEREV}:MC-2` },
      { text: 'Yes, since the shell method and disk/washer methods measure fundamentally different quantities', isCorrect: false, misconceptionId: `${VOLUMEREV}:MC-2` },
    ],
    targetedMisconceptions: [`${VOLUMEREV}:MC-2`],
    source: eb(VOLUMEREV, 'Detection probe — all three methods reuse the same Riemann-sum-as-a-limit idea applied to different cross-sectional shapes chosen for computational convenience, never for correctness'),
  },
]

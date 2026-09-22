/**
 * Fifteenth math.calc asset batch — related rates, reduction formulas, and
 * double integrals in polar coordinates.
 *
 * Continues serving-asset coverage for math.calc (46/76 -> 49/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.related-rates.md,
 * math.calc.reduction-formulas.md, and math.calc.double-integrals.md.
 *
 *   RELATEDRATES  related-rates — differentiate symbolically FIRST, with
 *                 every quantity kept as a variable, and substitute given
 *                 numbers ONLY AFTER; a zero or undefined rate at a given
 *                 instant is a genuine feature, never a setup error. Only
 *                 2 misconceptions in the EB entry: MC-1 (early
 *                 substitution, "the single most common and most
 *                 destructive error in this topic") gets FOUNDATIONAL and
 *                 DEVELOPING, MC-2 (degenerate result distrusted) gets
 *                 PROFICIENT.
 *   REDUCTIONFORM reduction-formulas — a reduction formula's output still
 *                 contains an integral of the identical form and must be
 *                 applied repeatedly to a genuine base case, never treated
 *                 as complete after one application; the chain stops at
 *                 n=0 or n=1, never pushed further. Only 2 misconceptions
 *                 in the EB entry: MC-1 (stopped after one application,
 *                 "Foundational") gets FOUNDATIONAL and DEVELOPING, MC-2
 *                 (reduced past the base case) gets PROFICIENT.
 *   DOUBLEINTPOLAR double-integrals — the polar area element is r dr dθ,
 *                 never plain dr dθ, since a polar grid's cells genuinely
 *                 grow with distance from the origin; bounds for a disk,
 *                 annulus, or sector are read directly from the region's
 *                 geometry, never derived by mechanical Cartesian
 *                 translation; polar conversion helps only when the
 *                 region or integrand shows genuine circular/radial
 *                 symmetry, never applied automatically.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RELATEDRATES = 'math.calc.related-rates'
const REDUCTIONFORM = 'math.calc.reduction-formulas'
const DOUBLEINTPOLAR = 'math.calc.double-integrals'

export const MATHEMATICS_CALCULUS_RELATED_RATES_REDUCTION_FORMULAS_DOUBLE_INTEGRALS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RELATEDRATES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Related rates problems connect the rates of change of several quantities related by some '
      + 'equation — typically geometric, like a sphere\'s volume and radius — via implicit '
      + 'differentiation, applied specifically with respect to TIME. The method: identify the '
      + 'relating equation (e.g. V=(4/3)πr³ for a sphere); differentiate BOTH sides with respect '
      + 'to t, treating each variable as an implicit function of time, so dV/dt=4πr²(dr/dt) (a '
      + 'Chain Rule application, since r itself depends on t); then substitute the GIVEN numerical '
      + 'values to solve for the UNKNOWN rate.\n\n'
      + 'A crucial ordering rule: substitute numbers ONLY AFTER differentiating symbolically — '
      + 'substituting a specific numerical value for a variable BEFORE differentiating would '
      + 'incorrectly treat that variable as a CONSTANT (with derivative 0), destroying the very '
      + 'relationship the problem asks about. Rates can genuinely be ZERO or UNDEFINED at a '
      + 'specified instant (e.g. a ball at the peak of its trajectory has vertical velocity 0) — '
      + 'this is not an error signal, but a real feature of the specific instant being examined.',
    targetedMisconceptions: [`${RELATEDRATES}:MC-1`, `${RELATEDRATES}:MC-2`],
    source: eb(RELATEDRATES, 'Core Understanding — differentiate symbolically first and substitute numbers only afterward, and a degenerate rate at a given instant is a real feature, never a setup error'),
  },
  {
    conceptId: REDUCTIONFORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A reduction formula is not a new integration technique — it is integration by parts '
      + 'applied ONCE, in a specific strategic way, then packaged so the same trade does not need '
      + 'to be re-derived every time. Splitting sin^n(x)=sin^(n-1)(x)·sin(x) and choosing '
      + 'u=sin^(n-1)(x), dv=sin(x)dx produces, after one application of integration by parts and a '
      + 'Pythagorean substitution, a formula relating ∫sin^n(x)dx to ∫sin^(n-2)(x)dx — the SAME '
      + 'integral form, but with the power reduced by 2.\n\n'
      + 'Because the new integral has the identical shape as the original, the formula can be '
      + 'applied to ITSELF again, and again, in a chain — each application peeling off one layer '
      + 'of the power — until the exponent reaches a BASE CASE (n=0, giving ∫1dx, or n=1, giving '
      + '∫sin(x)dx=-cos(x)) that is directly, elementarily integrable without any further '
      + 'reduction. The chain must stop there: attempting to reduce past n=0 or n=1 either '
      + 'requires a negative exponent (a different kind of integral entirely) or is simply '
      + 'redundant, since the integral is already solved.',
    targetedMisconceptions: [`${REDUCTIONFORM}:MC-1`, `${REDUCTIONFORM}:MC-2`],
    source: eb(REDUCTIONFORM, 'Core Understanding — a reduction formula must be applied repeatedly to a genuine base case, and the chain stops there, never pushed further'),
  },
  {
    conceptId: DOUBLEINTPOLAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For regions naturally described by DISTANCE FROM THE ORIGIN and ANGLE (disks, annuli, '
      + 'circular sectors), or integrands featuring x²+y², switching to POLAR COORDINATES '
      + 'dramatically simplifies both the region\'s description and the integrand itself.\n\n'
      + 'The central technical subtlety is the polar area element. A small "rectangular-looking" '
      + 'piece of polar area is NOT actually a small rectangle of dimensions dr×dθ — it is a '
      + 'slightly curved wedge whose angular "width" in actual area depends on how far out from '
      + 'the origin it sits: an identical angular sweep dθ carves out MORE actual area far from '
      + 'the origin than close to it. This radius-dependent widening is precisely compensated by '
      + 'an extra factor of r: dA=r·dr·dθ, never simply dr·dθ.\n\n'
      + 'Bounds for a polar region are read directly from the region\'s NATIVE geometric '
      + 'description, never derived by mechanically translating Cartesian bounds step by step: a '
      + 'full disk of radius R has θ∈[0,2π), r∈[0,R]; an annulus between radii R₁<R₂ has '
      + 'r∈[R₁,R₂] with θ still full-circle. Polar conversion helps only when the region or '
      + 'integrand shows genuine circular/radial symmetry — for a simple rectangular region with '
      + 'an ordinary polynomial integrand, Cartesian coordinates usually remain simpler.',
    targetedMisconceptions: [`${DOUBLEINTPOLAR}:MC-1`, `${DOUBLEINTPOLAR}:MC-2`, `${DOUBLEINTPOLAR}:MC-3`],
    source: eb(DOUBLEINTPOLAR, 'Core Understanding — the polar area element requires the extra factor of r, bounds are read directly from the region\'s geometry, and polar conversion is applied only when circular/radial symmetry genuinely justifies it'),
  },
]

export const MATHEMATICS_CALCULUS_RELATED_RATES_REDUCTION_FORMULAS_DOUBLE_INTEGRALS_PROBES: SeedProbe[] = [
  // --- math.calc.related-rates ------------------------------------------
  {
    conceptId: RELATEDRATES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a sphere with V=(4/3)πr³, a student substitutes r=5 directly into the equation BEFORE differentiating with respect to t. What happens to dV/dt?',
    choices: [
      { text: 'It becomes 0, since the equation is now a fixed number and differentiating a constant always gives 0 — the substitution destroyed the rate relationship entirely', isCorrect: true },
      { text: 'It correctly gives the instantaneous rate of change at r=5', isCorrect: false, misconceptionId: `${RELATEDRATES}:MC-1` },
      { text: 'Substituting early has no effect on the final derivative', isCorrect: false, misconceptionId: `${RELATEDRATES}:MC-1` },
    ],
    targetedMisconceptions: [`${RELATEDRATES}:MC-1`],
    source: eb(RELATEDRATES, 'Detection probe (Blueprint B01 P41) — present the inflating balloon and check whether a number is substituted before differentiating'),
  },
  {
    conceptId: RELATEDRATES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In a related-rates problem, when is it safe to substitute the given numerical values into the differentiated equation?',
    choices: [
      { text: 'Only AFTER differentiating symbolically, with every variable still a letter — substituting before differentiating treats that quantity as a constant', isCorrect: true },
      { text: 'At any point — substituting before or after differentiating gives the same result', isCorrect: false, misconceptionId: `${RELATEDRATES}:MC-1` },
      { text: 'As early as possible, to simplify the algebra before differentiating', isCorrect: false, misconceptionId: `${RELATEDRATES}:MC-1` },
    ],
    targetedMisconceptions: [`${RELATEDRATES}:MC-1`],
    source: eb(RELATEDRATES, 'Repair Action B01 — re-work the problem keeping the variable symbolic throughout differentiation, substituting numerical values only at the final step'),
  },
  {
    conceptId: RELATEDRATES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the sliding-ladder problem, at the exact instant the ladder lies flat (y=0), the computation for dy/dt produces a division by zero. Does this signal a setup mistake?',
    choices: [
      { text: 'No — it genuinely reflects the top of the ladder moving infinitely fast right as it touches the ground; a degenerate result at a specific instant is a real feature, not an error', isCorrect: true },
      { text: 'Yes — a correctly-posed related-rates problem should always yield a finite, well-defined numerical answer', isCorrect: false, misconceptionId: `${RELATEDRATES}:MC-2` },
      { text: 'Yes, since division by zero always indicates an algebraic error somewhere in the setup', isCorrect: false, misconceptionId: `${RELATEDRATES}:MC-2` },
    ],
    targetedMisconceptions: [`${RELATEDRATES}:MC-2`],
    source: eb(RELATEDRATES, 'Detection probe (Blueprint B02 P41) — present the sliding ladder at the instant it lies flat and check whether the division-by-zero result is incorrectly treated as a mistake'),
  },

  // --- math.calc.reduction-formulas ------------------------------------------
  {
    conceptId: REDUCTIONFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Applying the reduction formula once to ∫sin⁴(x)dx gives -sin³(x)cos(x)/4 + (3/4)∫sin²(x)dx. Is this a complete final answer?',
    choices: [
      { text: 'No — the trailing integral ∫sin²(x)dx is still unevaluated; the formula must be applied again to that remaining integral', isCorrect: true },
      { text: 'Yes — once the formula has been applied, the result is the finished answer', isCorrect: false, misconceptionId: `${REDUCTIONFORM}:MC-1` },
      { text: 'Yes, since the reduction formula always produces a complete answer in a single application', isCorrect: false, misconceptionId: `${REDUCTIONFORM}:MC-1` },
    ],
    targetedMisconceptions: [`${REDUCTIONFORM}:MC-1`],
    source: eb(REDUCTIONFORM, 'Detection probe (Blueprint A01 hook) — check whether the reduction is repeated until fully resolved, not stopped after one application'),
  },
  {
    conceptId: REDUCTIONFORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many times must a reduction formula generally be applied to fully evaluate ∫sin⁶(x)dx?',
    choices: [
      { text: 'Repeatedly, checking after each application whether an integral sign still remains, until reaching the elementary base case (n=0 or n=1)', isCorrect: true },
      { text: 'Exactly once, regardless of the starting exponent', isCorrect: false, misconceptionId: `${REDUCTIONFORM}:MC-1` },
      { text: 'It cannot be determined in advance how many applications a reduction formula will ever need', isCorrect: false, misconceptionId: `${REDUCTIONFORM}:MC-1` },
    ],
    targetedMisconceptions: [`${REDUCTIONFORM}:MC-1`],
    source: eb(REDUCTIONFORM, 'Repair Action B01 — re-apply the formula to the remaining integral, repeating until a genuinely elementary result is reached'),
  },
  {
    conceptId: REDUCTIONFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Having reduced a chain down to ∫sin¹(x)dx, should the reduction formula be applied one more time?',
    choices: [
      { text: 'No — n=1 is the base case; ∫sin(x)dx=-cos(x) is directly, elementarily integrable, and applying the formula further would require a nonsensical negative-exponent integral', isCorrect: true },
      { text: 'Yes — the reduction formula should always be applied until n reaches a negative value', isCorrect: false, misconceptionId: `${REDUCTIONFORM}:MC-2` },
      { text: 'Yes, since the chain only terminates when the coefficient in front of the integral becomes zero', isCorrect: false, misconceptionId: `${REDUCTIONFORM}:MC-2` },
    ],
    targetedMisconceptions: [`${REDUCTIONFORM}:MC-2`],
    source: eb(REDUCTIONFORM, 'Detection probe (Blueprint A03 hook) — this directly targets continuing to apply the reduction formula past the natural base case'),
  },

  // --- math.calc.double-integrals ------------------------------------------
  {
    conceptId: DOUBLEINTPOLAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Computing the area of a disk of radius R via ∫₀^{2π}∫₀^R 1 dr dθ (with no extra factor) gives 2πR. Is this the correct area formula?',
    choices: [
      { text: 'No — the polar area element requires an extra factor of r, dA=r dr dθ; correctly, ∫₀^{2π}∫₀^R r dr dθ=πR², matching the known circle-area formula, while 2πR has the wrong dimensions entirely', isCorrect: true },
      { text: 'Yes — dA converts to polar coordinates as simply dr dθ, with no additional factor needed', isCorrect: false, misconceptionId: `${DOUBLEINTPOLAR}:MC-1` },
      { text: 'Yes, since the integrand alone determines the area regardless of the coordinate system used', isCorrect: false, misconceptionId: `${DOUBLEINTPOLAR}:MC-1` },
    ],
    targetedMisconceptions: [`${DOUBLEINTPOLAR}:MC-1`],
    source: eb(DOUBLEINTPOLAR, 'Demonstration — computing a disk\'s area with and without the factor of r, compared against the known circle-area formula πR²'),
  },
  {
    conceptId: DOUBLEINTPOLAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For an annulus between radii 1 and 3, what is the most direct way to determine the r and θ bounds for a polar double integral?',
    choices: [
      { text: 'Read them directly from the region\'s geometry: r∈[1,3], θ∈[0,2π) — no Cartesian translation needed', isCorrect: true },
      { text: 'First write Cartesian inequalities describing the annulus, then algebraically translate each one into polar form step by step', isCorrect: false, misconceptionId: `${DOUBLEINTPOLAR}:MC-2` },
      { text: 'Bounds cannot be determined for an annulus without first converting it into a rectangular region', isCorrect: false, misconceptionId: `${DOUBLEINTPOLAR}:MC-2` },
    ],
    targetedMisconceptions: [`${DOUBLEINTPOLAR}:MC-2`],
    source: eb(DOUBLEINTPOLAR, 'Tutor Recovery Strategy — describe the region directly (how far out, through what angles) rather than starting from Cartesian inequalities'),
  },
  {
    conceptId: DOUBLEINTPOLAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a simple rectangular region with a plain polynomial integrand, should the integral be converted to polar coordinates?',
    choices: [
      { text: 'No — polar conversion helps specifically when the region or integrand shows circular/radial symmetry; a rectangular region with a polynomial integrand is already straightforward in Cartesian coordinates', isCorrect: true },
      { text: 'Yes — polar coordinates should always be used once the technique is known, regardless of the region\'s shape', isCorrect: false, misconceptionId: `${DOUBLEINTPOLAR}:MC-3` },
      { text: 'Yes, since polar coordinates are strictly more powerful than Cartesian coordinates for every double integral', isCorrect: false, misconceptionId: `${DOUBLEINTPOLAR}:MC-3` },
    ],
    targetedMisconceptions: [`${DOUBLEINTPOLAR}:MC-3`],
    source: eb(DOUBLEINTPOLAR, 'Tutor Recovery Strategy — check whether the Cartesian approach is already straightforward for the given region before converting'),
  },
]

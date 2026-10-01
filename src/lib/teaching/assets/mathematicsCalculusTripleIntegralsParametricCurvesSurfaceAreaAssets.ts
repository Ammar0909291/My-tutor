/**
 * Sixteenth math.calc asset batch — triple integrals (cylindrical/spherical),
 * parametric curves, and surface area of revolution.
 *
 * Continues serving-asset coverage for math.calc (49/76 -> 52/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.triple-integrals.md,
 * math.calc.parametric-curves.md, and math.calc.surface-area-integral.md.
 *
 *   TRIPLEINT     triple-integrals — bounds must form a genuine nested
 *                 hierarchy (each variable depends only on variables
 *                 integrated later), never a circular dependency;
 *                 cylindrical needs one extra factor r, spherical needs
 *                 TWO independent factors (ρ² and sinφ), never just one.
 *                 Only 2 misconceptions in the EB entry: MC-1 (circular
 *                 bound dependency) gets FOUNDATIONAL and DEVELOPING,
 *                 MC-2 (scaling factor omitted) gets PROFICIENT.
 *   PARAMCURVES   parametric-curves — a parametric curve is a path with a
 *                 direction of travel, not just a shape; not every
 *                 parametric curve is a function (the circle fails the
 *                 vertical line test); eliminating the parameter can
 *                 silently lose direction and any t-range restriction.
 *   SURFAREAINT   surface-area-integral — the surface-area-of-revolution
 *                 formula is circumference (2πf(x)) TIMES arc length
 *                 (√(1+[f'(x)]²)), never circumference alone; f'(x) must
 *                 be squared correctly before substituting into the
 *                 square root. Only 2 misconceptions in the EB entry:
 *                 MC-1 (arc-length factor omitted, "Foundational") gets
 *                 FOUNDATIONAL and DEVELOPING, MC-2 (squaring slip) gets
 *                 PROFICIENT.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TRIPLEINT = 'math.calc.triple-integrals'
const PARAMCURVES = 'math.calc.parametric-curves'
const SURFAREAINT = 'math.calc.surface-area-integral'

export const MATHEMATICS_CALCULUS_TRIPLE_INTEGRALS_PARAMETRIC_CURVES_SURFACE_AREA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRIPLEINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A triple integral ∭_E f(x,y,z) dV integrates over a 3D region E, evaluated as three '
      + 'nested single-variable integrals. Setting up correct bounds demands careful analysis of '
      + 'E\'s shape: the OUTERMOST integral\'s bounds must be CONSTANTS, the MIDDLE integral\'s '
      + 'bounds may depend on the outermost variable, and the INNERMOST integral\'s bounds may '
      + 'depend on BOTH outer variables — a genuine NESTED hierarchy, where each variable\'s '
      + 'bounds depend only on variables integrated LATER, never on variables at the same or a '
      + 'more-inner stage.\n\n'
      + 'For regions with CIRCULAR symmetry around the z-axis, converting to CYLINDRICAL '
      + 'coordinates (r,θ,z) uses volume element dV=r dr dθ dz — the extra factor of r is '
      + 'essential, carried unchanged from 2D polar coordinates. For regions with SPHERICAL '
      + 'symmetry, converting to SPHERICAL coordinates (ρ,φ,θ) uses volume element '
      + 'dV=ρ²sinφ dρ dφ dθ — TWO independent scaling factors are required together: ρ² (from the '
      + 'radial direction, since a sphere\'s surface area grows with the square of its radius) AND '
      + 'sinφ (from how circles of constant longitude shrink toward the poles). Omitting either '
      + 'factor produces an incorrect volume element.',
    targetedMisconceptions: [`${TRIPLEINT}:MC-1`, `${TRIPLEINT}:MC-2`],
    source: eb(TRIPLEINT, 'Core Understanding — bounds must form a genuine nested hierarchy, and cylindrical needs one factor while spherical needs two independent factors'),
  },
  {
    conceptId: PARAMCURVES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A parametric curve is a PATH, not merely a shape: x=f(t) and y=g(t) together describe '
      + 'where a point is located at "time" t, and plotting the resulting (x,y) points IN THE '
      + 'ORDER t visits them traces out a trajectory with a direction of travel built in. Some '
      + 'curves — the canonical example is the full circle x=cos t, y=sin t — cannot be written as '
      + 'y=f(x) for any function f, because they fail the vertical line test (a vertical line at '
      + 'x=0.5 crosses the unit circle twice), yet they are perfectly well-defined and plottable '
      + 'once a third variable is introduced. Parametric curves are therefore strictly MORE '
      + 'general than function graphs.\n\n'
      + '"Eliminating the parameter" — solving one equation for t and substituting into the other '
      + 'to recover a Cartesian equation — recovers the SHAPE traced, but always risks losing two '
      + 'things a bare shape does not carry: the DIRECTION of travel (two different '
      + 'parametrizations can trace the identical shape in opposite directions) and any '
      + 'RESTRICTION on the t-range (a parametrization confined to t∈[0,π] might trace only half a '
      + 'circle, while its eliminated equation x²+y²=1 describes the full circle with no memory of '
      + 'that restriction).',
    targetedMisconceptions: [`${PARAMCURVES}:MC-1`, `${PARAMCURVES}:MC-2`, `${PARAMCURVES}:MC-3`],
    source: eb(PARAMCURVES, 'Core Understanding — a parametric curve carries a direction of travel, need not be a function, and eliminating the parameter can silently lose direction and any t-range restriction'),
  },
  {
    conceptId: SURFAREAINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The surface area of revolution formula S=2π∫ₐᵇ f(x)√(1+[f\'(x)]²)dx is a direct '
      + 'multiplicative combination of two already-understood pieces. Picture the curve y=f(x) '
      + 'split into infinitesimal straight-line segments, each of length ds=√(1+[f\'(x)]²)dx (the '
      + 'arc-length differential). When that tiny segment is rotated about the x-axis, it sweeps '
      + 'out a thin circular BAND whose lateral surface area is (to first order) its circumference '
      + '(2πf(x), since f(x) is the radius at that point) times its own slant length (the arc-'
      + 'length differential ds). Summing all these thin bands via integration gives the total '
      + 'surface area — the formula is genuinely "circumference times arc length," never '
      + 'circumference alone.\n\n'
      + 'Computing an actual surface area requires finding f\'(x) FIRST, squaring it correctly '
      + '([f\'(x)]², not f\'(x) itself), and substituting into the square root BEFORE integrating — '
      + 'the square-root expression cannot be simplified or evaluated without this derivative step '
      + 'done carefully.',
    targetedMisconceptions: [`${SURFAREAINT}:MC-1`, `${SURFAREAINT}:MC-2`],
    source: eb(SURFAREAINT, 'Core Understanding — the formula is circumference times arc length, never circumference alone, and the derivative must be squared correctly before substituting'),
  },
]

export const MATHEMATICS_CALCULUS_TRIPLE_INTEGRALS_PARAMETRIC_CURVES_SURFACE_AREA_PROBES: SeedProbe[] = [
  // --- math.calc.triple-integrals ------------------------------------------
  {
    conceptId: TRIPLEINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the region 0≤x≤1, 0≤y≤x, 0≤z≤x+y, is it valid to instead set up the x-bounds as depending on y while the y-bounds also depend on x?',
    choices: [
      { text: 'No — that creates a circular dependency; the correct hierarchy has x (outermost) using only constants, y (middle) depending only on x, and z (innermost) depending on both', isCorrect: true },
      { text: 'Yes — as long as three integral signs are written, any dependency structure between the bounds is valid', isCorrect: false, misconceptionId: `${TRIPLEINT}:MC-1` },
      { text: 'Yes, since bounds may reference any other variable in the integral regardless of iteration order', isCorrect: false, misconceptionId: `${TRIPLEINT}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIPLEINT}:MC-1`],
    source: eb(TRIPLEINT, 'Discovery Question 1 — does the innermost variable\'s bounds depend on variables still "outside" it, or could there be a circular dependency hiding in a proposed setup'),
  },
  {
    conceptId: TRIPLEINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When setting up nested triple-integral bounds, what must be verified for each variable?',
    choices: [
      { text: 'That its bounds depend only on variables integrated LATER (still "outside" it in the iteration order), never on variables at the same or a more-inner stage', isCorrect: true },
      { text: 'That its bounds are always numerical constants, regardless of the region\'s shape', isCorrect: false, misconceptionId: `${TRIPLEINT}:MC-1` },
      { text: 'Nothing extra — writing three nested integral signs automatically enforces a valid dependency structure', isCorrect: false, misconceptionId: `${TRIPLEINT}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIPLEINT}:MC-1`],
    source: eb(TRIPLEINT, 'Tutor Recovery Strategy — explicitly trace, for each variable, which OTHER variables its bounds are allowed to depend on given the chosen iteration order'),
  },
  {
    conceptId: TRIPLEINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Converting a triple integral over a solid sphere to spherical coordinates, a student writes only ρ dρ dφ dθ (a single factor of ρ) for the volume element. Is this correct?',
    choices: [
      { text: 'No — spherical coordinates need TWO independent factors together, ρ²sinφ dρ dφ dθ: ρ² from radial growth and sinφ from polar shrinkage, not just one', isCorrect: true },
      { text: 'Yes — since polar coordinates in 2D need only one extra factor, spherical coordinates in 3D need exactly one too', isCorrect: false, misconceptionId: `${TRIPLEINT}:MC-2` },
      { text: 'Yes, since any coordinate conversion always requires exactly one scaling factor regardless of dimension', isCorrect: false, misconceptionId: `${TRIPLEINT}:MC-2` },
    ],
    targetedMisconceptions: [`${TRIPLEINT}:MC-2`],
    source: eb(TRIPLEINT, 'Discovery Question 2 — you already know polar coordinates in 2D need exactly one extra factor; does spherical in 3D also need exactly one, or could more than one independent distortion be happening at once'),
  },

  // --- math.calc.parametric-curves ------------------------------------------
  {
    conceptId: PARAMCURVES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'x=cos t, y=sin t and x=cos t, y=-sin t both trace the unit circle. Are they the same parametric curve?',
    choices: [
      { text: 'No — at t=π/2, the first gives (0,1) and the second gives (0,-1), a different point at the same t, meaning the two trace opposite rotational directions', isCorrect: true },
      { text: 'Yes, since they produce the exact same set of (x,y) points', isCorrect: false, misconceptionId: `${PARAMCURVES}:MC-1` },
      { text: 'Yes — direction of travel is not part of what a parametric curve specifies, only the resulting shape', isCorrect: false, misconceptionId: `${PARAMCURVES}:MC-1` },
    ],
    targetedMisconceptions: [`${PARAMCURVES}:MC-1`],
    source: eb(PARAMCURVES, 'Detection probe (Blueprint B01 P41) — x=cos t,y=sin t and x=cos t,y=-sin t both trace the unit circle; are they the same parametric curve'),
  },
  {
    conceptId: PARAMCURVES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'x=cos t, y=sin t traces the unit circle. Is this circle the graph of a function y=f(x)?',
    choices: [
      { text: 'No — applying the vertical line test to the shape itself: at x=0.5, x²+y²=1 gives y=±√0.75, two y-values for one x, so it fails the test even though cos t and sin t are individually functions of t', isCorrect: true },
      { text: 'Yes — since the circle is expressed with cos and sin, and those are functions, the circle must be a function too', isCorrect: false, misconceptionId: `${PARAMCURVES}:MC-2` },
      { text: 'Yes, since any curve built from parametric functions is automatically itself a function', isCorrect: false, misconceptionId: `${PARAMCURVES}:MC-2` },
    ],
    targetedMisconceptions: [`${PARAMCURVES}:MC-2`],
    source: eb(PARAMCURVES, 'Detection probe (Blueprint B02 P41) — x=cos t,y=sin t traces the unit circle; is this circle the graph of a function y=f(x)'),
  },
  {
    conceptId: PARAMCURVES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'x=cos t, y=sin t for t∈[0,π] eliminates to x²+y²=1. Does this equation fully describe the original curve?',
    choices: [
      { text: 'No — t∈[0,π] traces only the top half of the circle (since sin t≥0 throughout), while x²+y²=1 alone describes the full circle with no memory of that restriction', isCorrect: true },
      { text: 'Yes — the eliminated equation is a complete, equivalent description of the parametrization', isCorrect: false, misconceptionId: `${PARAMCURVES}:MC-3` },
      { text: 'Yes, since eliminating the parameter never discards any information about the original curve', isCorrect: false, misconceptionId: `${PARAMCURVES}:MC-3` },
    ],
    targetedMisconceptions: [`${PARAMCURVES}:MC-3`],
    source: eb(PARAMCURVES, 'Detection probe (Blueprint B03 P41) — x=cos t,y=sin t for t∈[0,π] eliminates to x²+y²=1; does this equation fully describe the original curve'),
  },

  // --- math.calc.surface-area-integral ------------------------------------------
  {
    conceptId: SURFAREAINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=√x on [1,4], is S=2π∫₁⁴√x dx (omitting the square-root arc-length factor) the correct surface-area-of-revolution setup?',
    choices: [
      { text: 'No — the arc-length factor √(1+[f\'(x)]²) is essential; omitting it computes a different geometric quantity entirely, not merely an approximation', isCorrect: true },
      { text: 'Yes — surface-area-of-revolution problems always integrate just a multiple of f(x), like volume-of-revolution problems do', isCorrect: false, misconceptionId: `${SURFAREAINT}:MC-1` },
      { text: 'Yes, since the arc-length factor is an optional refinement that can be dropped for a close-enough estimate', isCorrect: false, misconceptionId: `${SURFAREAINT}:MC-1` },
    ],
    targetedMisconceptions: [`${SURFAREAINT}:MC-1`],
    source: eb(SURFAREAINT, 'Detection probe (Blueprint A01 hook) — present the correct full formula alongside the incorrect simplified attempt that omits the square-root factor'),
  },
  {
    conceptId: SURFAREAINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a constant function f(x)=r (a cylinder), f\'(x)=0. What should the arc-length factor √(1+[f\'(x)]²) equal, and what does this confirm about the formula?',
    choices: [
      { text: 'It equals 1, giving S=2π∫₀ʰ r·1 dx=2πrh, the familiar cylinder surface area — confirming the arc-length factor is a genuine, necessary part of the "circumference times arc length" formula', isCorrect: true },
      { text: 'It equals 0, since a flat profile contributes no surface area at all', isCorrect: false, misconceptionId: `${SURFAREAINT}:MC-1` },
      { text: 'The factor is undefined for a constant function, so this sanity check cannot be performed', isCorrect: false, misconceptionId: `${SURFAREAINT}:MC-1` },
    ],
    targetedMisconceptions: [`${SURFAREAINT}:MC-1`],
    source: eb(SURFAREAINT, 'Demonstration — the cylinder sanity check, confirming the arc-length factor reduces to exactly 1 for a perfectly flat, horizontal profile'),
  },
  {
    conceptId: SURFAREAINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=x³, f\'(x)=3x². What should be substituted into the square root: √(1+3x²) or √(1+[3x²]²)=√(1+9x⁴)?',
    choices: [
      { text: '√(1+9x⁴) — f\'(x) must be squared correctly ([3x²]²=9x⁴) as an explicit separate step before substituting into the square root', isCorrect: true },
      { text: '√(1+3x²) — the derivative is substituted directly into the square root without squaring it', isCorrect: false, misconceptionId: `${SURFAREAINT}:MC-2` },
      { text: 'Either form is acceptable, since squaring f\'(x) is an optional simplification', isCorrect: false, misconceptionId: `${SURFAREAINT}:MC-2` },
    ],
    targetedMisconceptions: [`${SURFAREAINT}:MC-2`],
    source: eb(SURFAREAINT, 'Detection probe (Blueprint A03 hook) — present the full derivative-and-squaring step and ask the learner to verify each piece independently'),
  },
]

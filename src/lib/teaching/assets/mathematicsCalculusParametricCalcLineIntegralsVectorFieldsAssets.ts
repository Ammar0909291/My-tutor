/**
 * Seventeenth math.calc asset batch — parametric calculus, line integrals,
 * and vector fields.
 *
 * Continues serving-asset coverage for math.calc (52/76 -> 55/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.parametric-calculus.md,
 * math.calc.line-integrals.md, and math.calc.vector-fields.md.
 *
 *   PARAMCALC     parametric-calculus — dy/dx for a parametric curve is
 *                 (dy/dt)/(dx/dt), never dy/dt alone; arc length requires
 *                 SQUARING each derivative term before summing under the
 *                 root, never just adding them. Only 2 misconceptions in
 *                 the EB entry: MC-1 (missing division, "Foundational")
 *                 gets FOUNDATIONAL and DEVELOPING, MC-2 (missing
 *                 squaring, also "Foundational") gets PROFICIENT.
 *   LINEINTEGRALS line-integrals — the scalar line integral (built from a
 *                 norm, ds) is unchanged under path reversal, while the
 *                 vector line integral (built from d𝐫, direction-
 *                 sensitive) flips sign; ds and d𝐫 must never be
 *                 conflated; a parametrization's traced direction must be
 *                 explicitly checked against the stated endpoints.
 *   VECTORFIELDS  vector-fields — a vector field is any assignment of a
 *                 vector to each point, never automatically a gradient;
 *                 finding one potential function settles path-
 *                 independence for EVERY path at once, no multi-path
 *                 verification needed; when the necessary condition
 *                 fails, no potential function exists at all — not an
 *                 approximate or partial one.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PARAMCALC = 'math.calc.parametric-calculus'
const LINEINTEGRALS = 'math.calc.line-integrals'
const VECTORFIELDS = 'math.calc.vector-fields'

export const MATHEMATICS_CALCULUS_PARAMETRIC_CALC_LINE_INTEGRALS_VECTOR_FIELDS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PARAMCALC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For a curve given parametrically by x=x(t), y=y(t), the derivative dy/dx is found via '
      + 'dy/dx=(dy/dt)/(dx/dt) (provided dx/dt≠0) — a direct consequence of the chain rule, since '
      + 'dy/dt=(dy/dx)(dx/dt), and solving for dy/dx gives exactly this ratio. Computing dy/dx '
      + 'therefore requires the DIVISION step — never dy/dt reported alone, since t and x are '
      + 'genuinely different variables related by a possibly non-trivial rate dx/dt.\n\n'
      + 'The ARC LENGTH of the curve from t=α to t=β is L=∫√((dx/dt)²+(dy/dt)²)dt — a direct '
      + 'generalization of "distance traveled equals speed integrated over time," where the square '
      + 'root\'s content is the Pythagorean combination of the horizontal and vertical velocity '
      + 'components; each term must be SQUARED before summing, never simply added.\n\n'
      + 'The SECOND derivative d²y/dx² is NOT obtained by naively repeating the first-derivative '
      + 'pattern: since dy/dx is itself some expression in terms of t, computing d²y/dx² genuinely '
      + 'requires TWO separate steps — differentiate that first-derivative expression with respect '
      + 'to t, THEN divide the result by dx/dt AGAIN.',
    targetedMisconceptions: [`${PARAMCALC}:MC-1`, `${PARAMCALC}:MC-2`],
    source: eb(PARAMCALC, 'Core Understanding — dy/dx requires dividing by dx/dt, arc length requires squaring each derivative term before summing, and the second derivative is a genuine two-step process'),
  },
  {
    conceptId: LINEINTEGRALS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Line integrals extend ordinary single-variable integration to integrating along an '
      + 'arbitrary curve C in space, parametrized as r(t)=(x(t),y(t),z(t)) for t∈[a,b]. There are '
      + 'two structurally different quantities to integrate. The SCALAR line integral ∫_C f ds '
      + 'uses the arc-length element ds=‖r\'(t)‖dt — built from a NORM, always nonnegative, '
      + 'capturing f\'s values weighted by distance traveled. The VECTOR line integral '
      + '∫_C F·dr uses the vector differential dr=r\'(t)dt — retaining the actual direction of '
      + 'travel, dotted against a force field F to capture work done.\n\n'
      + 'The two integrals behave genuinely differently under path reversal. Reversing direction '
      + 'along C leaves the scalar line integral completely UNCHANGED — arc length and f\'s values '
      + 'along the geometric path don\'t care which way you walked it. But reversing direction '
      + 'FLIPS THE SIGN of the vector line integral — work done moving WITH a force is positive, '
      + 'work done moving AGAINST the same force along the same path is negative. This follows '
      + 'directly from ds being built from a norm (direction-independent) while dr retains the '
      + 'actual tangent vector (whose direction flips under reversal). A parametrization\'s traced '
      + 'direction must always be explicitly checked against the problem\'s stated endpoints, '
      + 'never assumed automatic.',
    targetedMisconceptions: [`${LINEINTEGRALS}:MC-1`, `${LINEINTEGRALS}:MC-2`, `${LINEINTEGRALS}:MC-3`],
    source: eb(LINEINTEGRALS, 'Core Understanding — the scalar line integral is unchanged under path reversal while the vector line integral flips sign, ds and dr must never be conflated, and a parametrization\'s direction must be explicitly checked'),
  },
  {
    conceptId: VECTORFIELDS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A vector field F(x,y,z) is simply an assignment of a vector to every point in a region — a '
      + '"wind map" or "flow map" — with NO requirement that it come from differentiating any '
      + 'scalar function at all. The gradient ∇f is one particular, special kind of vector field; '
      + 'most vector fields (rotational fields, for instance) are not gradients of anything.\n\n'
      + 'A field F is called CONSERVATIVE if there exists a scalar potential function f with '
      + 'F=∇f — a genuinely restrictive, testable property, not a default. When it holds, the '
      + 'Fundamental Theorem for Line Integrals says ∫_C F·dr=f(end)-f(start) — the line integral '
      + 'depends ONLY on the two endpoints, never on which path connects them. Finding an explicit '
      + 'f is therefore a single, complete proof of path-independence for EVERY possible path at '
      + 'once, never merely suggestive evidence requiring further checks on additional paths.\n\n'
      + 'Testing for conservativeness uses a necessary condition (∂P/∂y=∂Q/∂x for F=(P,Q)). When '
      + 'this condition fails, no potential function exists AT ALL — not an approximate one, not a '
      + 'partial one. The clearest confirming signature is a nonzero line integral around a closed '
      + 'loop; a conservative field\'s closed-loop integral is always exactly zero, so any nonzero '
      + 'result is direct, conclusive proof no shortcut is available.',
    targetedMisconceptions: [`${VECTORFIELDS}:MC-1`, `${VECTORFIELDS}:MC-2`, `${VECTORFIELDS}:MC-3`],
    source: eb(VECTORFIELDS, 'Core Understanding — a vector field is not automatically a gradient, finding one potential function settles every path at once, and a failed conservativeness test means no potential exists at all'),
  },
]

export const MATHEMATICS_CALCULUS_PARAMETRIC_CALC_LINE_INTEGRALS_VECTOR_FIELDS_PROBES: SeedProbe[] = [
  // --- math.calc.parametric-calculus ------------------------------------------
  {
    conceptId: PARAMCALC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For x(t)=t², y(t)=t³, computing dy/dt=3t², is this already the correct value for dy/dx?',
    choices: [
      { text: 'No — dy/dx=(dy/dt)/(dx/dt)=3t²/2t=3t/2; reporting dy/dt alone omits the required division by dx/dt', isCorrect: true },
      { text: 'Yes — dy/dt already directly gives the slope dy/dx', isCorrect: false, misconceptionId: `${PARAMCALC}:MC-1` },
      { text: 'Yes, since t and x can be treated as the same variable for this computation', isCorrect: false, misconceptionId: `${PARAMCALC}:MC-1` },
    ],
    targetedMisconceptions: [`${PARAMCALC}:MC-1`],
    source: eb(PARAMCALC, 'Detection probe (Blueprint A01 hook) — check whether the division by dx/dt is correctly performed'),
  },
  {
    conceptId: PARAMCALC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does finding the slope of a parametric curve require a division step, when dy/dt already looks like a rate of change?',
    choices: [
      { text: 'Because t and x are genuinely different variables; dy/dt measures change against t, and converting to a slope against x requires dividing by dx/dt via the chain rule', isCorrect: true },
      { text: 'Division is not actually required — dy/dt already answers the "slope in terms of x" question directly', isCorrect: false, misconceptionId: `${PARAMCALC}:MC-1` },
      { text: 'The division step is an optional simplification that can be skipped for a close-enough estimate', isCorrect: false, misconceptionId: `${PARAMCALC}:MC-1` },
    ],
    targetedMisconceptions: [`${PARAMCALC}:MC-1`],
    source: eb(PARAMCALC, 'Repair Action B01 — re-derive the formula from the chain rule relation dy/dt=(dy/dx)(dx/dt), solving explicitly for dy/dx'),
  },
  {
    conceptId: PARAMCALC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Setting up the arc-length integrand for a parametric curve, is √(dx/dt+dy/dt) (no squaring) the correct expression?',
    choices: [
      { text: 'No — the correct integrand is √((dx/dt)²+(dy/dt)²); each derivative term must be squared before summing, reflecting the Pythagorean combination of velocity components', isCorrect: true },
      { text: 'Yes — the two derivative terms are simply added directly under the square root', isCorrect: false, misconceptionId: `${PARAMCALC}:MC-2` },
      { text: 'Yes, since squaring the terms would only be needed if the curve were three-dimensional', isCorrect: false, misconceptionId: `${PARAMCALC}:MC-2` },
    ],
    targetedMisconceptions: [`${PARAMCALC}:MC-2`],
    source: eb(PARAMCALC, 'Detection probe (Blueprint A02 hook) — this directly targets omitting the squaring step in the arc-length formula'),
  },

  // --- math.calc.line-integrals ------------------------------------------
  {
    conceptId: LINEINTEGRALS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Reversing the direction of travel along a curve C, does the scalar line integral ∫_C f ds change value?',
    choices: [
      { text: 'No — ds=‖r\'(t)‖dt is built from a norm, which is direction-independent; arc length and f\'s values along the geometric path don\'t care which way it was walked', isCorrect: true },
      { text: 'Yes — both the scalar and vector line integral flip sign under path reversal', isCorrect: false, misconceptionId: `${LINEINTEGRALS}:MC-1` },
      { text: 'Yes, since reversing any integral\'s direction of traversal always flips its sign', isCorrect: false, misconceptionId: `${LINEINTEGRALS}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEINTEGRALS}:MC-1`],
    source: eb(LINEINTEGRALS, 'Discovery Question 1 — if you reverse the direction of travel along a curve, does the scalar line integral change value? What about the vector line integral?'),
  },
  {
    conceptId: LINEINTEGRALS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the structural difference between ds=‖r\'(t)‖dt and dr=r\'(t)dt, and why does it matter?',
    choices: [
      { text: 'ds is a nonnegative scalar (a norm), while dr is a full vector retaining direction; that difference is exactly why ds is unchanged under path reversal while dr (and thus the vector line integral) flips sign', isCorrect: true },
      { text: 'They are interchangeable notations for the same quantity, differing only in how they are written', isCorrect: false, misconceptionId: `${LINEINTEGRALS}:MC-2` },
      { text: 'ds is used only for vector fields and dr only for scalar functions', isCorrect: false, misconceptionId: `${LINEINTEGRALS}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEINTEGRALS}:MC-2`],
    source: eb(LINEINTEGRALS, 'Discovery Question 2 — what\'s the structural difference between ds and dr — one is a number, one is a vector — and why would that matter for reversal behavior'),
  },
  {
    conceptId: LINEINTEGRALS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A problem states a curve runs from point A to point B. After writing a parametrization r(t) for t∈[a,b], how should its direction be verified?',
    choices: [
      { text: 'Check explicitly whether r(a) gives point A (the stated starting point) — nothing about writing a parametrization automatically guarantees it traces the stated direction', isCorrect: true },
      { text: 'No verification is needed — any parametrization of the same curve automatically traces the direction stated in the problem', isCorrect: false, misconceptionId: `${LINEINTEGRALS}:MC-3` },
      { text: 'Direction only needs to be checked for scalar line integrals, never for vector line integrals', isCorrect: false, misconceptionId: `${LINEINTEGRALS}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEINTEGRALS}:MC-3`],
    source: eb(LINEINTEGRALS, 'Discovery Question 3 — how would you check whether your parametrization actually traces the curve in the stated direction, rather than the opposite one'),
  },

  // --- math.calc.vector-fields ------------------------------------------
  {
    conceptId: VECTORFIELDS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Presented with the rotational field F(x,y)=(-y,x), must some potential function f exist simply because F is "a vector field"?',
    choices: [
      { text: 'No — being a gradient is a special, testable property a vector field might or might not have; most vector fields, including rotational ones, are not gradients of anything', isCorrect: true },
      { text: 'Yes — every vector field is automatically the gradient of some scalar function', isCorrect: false, misconceptionId: `${VECTORFIELDS}:MC-1` },
      { text: 'Yes, since "vector field" and "conservative vector field" mean the same thing', isCorrect: false, misconceptionId: `${VECTORFIELDS}:MC-1` },
    ],
    targetedMisconceptions: [`${VECTORFIELDS}:MC-1`],
    source: eb(VECTORFIELDS, 'Discovery Question 1 — is every vector field automatically the gradient of some scalar function, or is being a gradient a special, extra property a field might or might not have'),
  },
  {
    conceptId: VECTORFIELDS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Having found a function f with ∇f=F, has path-independence been proven for every possible path at once, or does a second path still need checking to be sure?',
    choices: [
      { text: 'It has been proven for every path at once — the Fundamental Theorem for Line Integrals guarantees ∫_C F·dr=f(end)-f(start) regardless of which path connects the two endpoints', isCorrect: true },
      { text: 'A second and third path should still be tested to confirm the values agree before trusting the result', isCorrect: false, misconceptionId: `${VECTORFIELDS}:MC-2` },
      { text: 'Finding f only proves path-independence for the specific path already used in the computation', isCorrect: false, misconceptionId: `${VECTORFIELDS}:MC-2` },
    ],
    targetedMisconceptions: [`${VECTORFIELDS}:MC-2`],
    source: eb(VECTORFIELDS, 'Discovery Question 2 — if I find a function f with ∇f=F, have I proven the line integral is path-independent for every possible path at once, or do I still need to check a few specific paths'),
  },
  {
    conceptId: VECTORFIELDS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A field fails the necessary condition for conservativeness (∂P/∂y≠∂Q/∂x). Could it still have some approximate or partial potential function usable as a shortcut?',
    choices: [
      { text: 'No — when the necessary condition fails, no potential function exists at all; this is confirmed by a nonzero closed-loop line integral, since a genuine potential would force every closed loop to integrate to exactly zero', isCorrect: true },
      { text: 'Yes — an approximate potential function can usually still be found and used, even when the exact test fails', isCorrect: false, misconceptionId: `${VECTORFIELDS}:MC-3` },
      { text: 'Yes, since failing the necessary condition only means the potential function is harder to find, not that none exists', isCorrect: false, misconceptionId: `${VECTORFIELDS}:MC-3` },
    ],
    targetedMisconceptions: [`${VECTORFIELDS}:MC-3`],
    source: eb(VECTORFIELDS, 'Discovery Question 3 — if a field fails the necessary condition for conservativeness, could it still have some rough potential function that gets close, or does none exist at all'),
  },
]

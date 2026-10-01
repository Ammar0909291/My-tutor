/**
 * Eighteenth math.calc asset batch — Green's Theorem, curl and divergence,
 * and surface integrals.
 *
 * Continues serving-asset coverage for math.calc (55/76 -> 58/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.greens-theorem.md,
 * math.calc.curl-divergence.md, and math.calc.surface-integrals.md.
 *
 *   GREENSTHM     greens-theorem — the theorem assumes COUNTERCLOCKWISE
 *                 orientation (reversing it negates the result); the
 *                 partial-derivative term order (∂Q/∂x minus ∂P/∂y) is
 *                 fixed, never interchangeable; continuity must hold
 *                 throughout the ENTIRE region D, never just along the
 *                 boundary curve C.
 *   CURLDIVERG    curl-divergence — divergence is a SCALAR (flux/
 *                 spreading), curl is a VECTOR (rotation) — genuinely
 *                 different output types, never conflated; the two are
 *                 independent (zero one tells nothing about the other);
 *                 zero curl is necessary but NOT always sufficient for
 *                 conservativeness (a domain hole can hide a real
 *                 obstruction).
 *   SURFACEINT    surface-integrals — dS requires the cross-product
 *                 magnitude ‖r_x×r_y‖, never plain dx dy; the combined
 *                 vector element r_x×r_y already carries direction AND
 *                 magnitude, needing no separate unit-normal step before
 *                 dotting with F; flux flips sign under orientation
 *                 reversal while the scalar surface integral does not.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GREENSTHM = 'math.calc.greens-theorem'
const CURLDIVERG = 'math.calc.curl-divergence'
const SURFACEINT = 'math.calc.surface-integrals'

export const MATHEMATICS_CALCULUS_GREENS_THEOREM_CURL_DIVERGENCE_SURFACE_INTEGRALS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GREENSTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Green\'s Theorem trades a boundary computation for an interior one: ∮_C P dx+Q dy = '
      + '∬_D (∂Q/∂x - ∂P/∂y) dA. This requires THREE hypotheses, all of which must be verified '
      + 'before applying the conclusion: C is SIMPLE and CLOSED; C is traversed '
      + 'COUNTERCLOCKWISE (the region D stays on the LEFT while walking along C) — the theorem\'s '
      + 'assumed POSITIVE orientation; and P,Q are continuous throughout the ENTIRE region D, not '
      + 'merely along the boundary curve C itself — a singularity anywhere INSIDE D invalidates '
      + 'the hypothesis entirely.\n\n'
      + 'Orientation is not a free choice: reversing the SAME curve to traverse clockwise instead '
      + 'reverses the sign of the line integral — applying the theorem\'s formula unchanged to a '
      + 'clockwise curve, without accounting for this sign flip, produces the wrong (negated) '
      + 'answer. The partial-derivative term order (∂Q/∂x minus ∂P/∂y, never the reverse) is fixed '
      + 'by the theorem, not an arbitrary or interchangeable convention.',
    targetedMisconceptions: [`${GREENSTHM}:MC-1`, `${GREENSTHM}:MC-2`, `${GREENSTHM}:MC-3`],
    source: eb(GREENSTHM, 'Core Understanding — the theorem assumes counterclockwise orientation, the term order is fixed, and continuity must hold throughout the entire region, never just the boundary'),
  },
  {
    conceptId: CURLDIVERG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DIVERGENCE, ∇·F=∂P/∂x+∂Q/∂y+∂R/∂z, is a SCALAR — a single number at each point measuring '
      + 'how much the field is spreading outward (positive) or converging inward (negative), like '
      + 'a local source or sink. CURL, ∇×F, is a VECTOR — pointing along the local axis of '
      + 'rotation, with magnitude measuring rotational strength. Curl and divergence measure '
      + 'fundamentally DIFFERENT things and are computed from entirely different combinations of '
      + 'the same underlying partial derivatives — knowing one tells the learner nothing about the '
      + 'other, and a field can have any combination of zero/nonzero curl and divergence.\n\n'
      + 'While every conservative field automatically has ∇×F=0 (the curl of a gradient is always '
      + 'zero), the CONVERSE does not always hold. On a domain with a "hole" (a point the field is '
      + 'undefined on), a field can have curl exactly zero EVERYWHERE it is defined and still fail '
      + 'to be conservative, with a nonzero closed-loop line integral around that hole. Zero curl '
      + 'is therefore NECESSARY but not always SUFFICIENT for conservativeness.',
    targetedMisconceptions: [`${CURLDIVERG}:MC-1`, `${CURLDIVERG}:MC-2`, `${CURLDIVERG}:MC-3`],
    source: eb(CURLDIVERG, 'Core Understanding — divergence is a scalar and curl is a vector, the two are independent, and zero curl is necessary but not always sufficient for conservativeness'),
  },
  {
    conceptId: SURFACEINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A surface S, parametrized by TWO parameters, r(x,y)=(x,y,f(x,y)) over a domain D, has TWO '
      + 'tangent vectors at each point — r_x and r_y — and their CROSS PRODUCT\'s magnitude plays '
      + 'the exact same role line integrals\' single tangent vector\'s magnitude played for arc '
      + 'length: dS=‖r_x×r_y‖ dx dy, never simply dx dy.\n\n'
      + 'The scalar surface integral ∬_S f dS reduces to an ordinary double integral over D once '
      + 'dS is known. The vector surface integral (flux) ∬_S F·dS uses the combined vector '
      + 'element dS=(r_x×r_y) dx dy, which ALREADY carries both direction and magnitude together '
      + '— dotting F directly into r_x×r_y requires no separate unit-normal computation '
      + 'beforehand.\n\n'
      + 'Just as reversing a curve\'s direction flips a vector line integral\'s sign while leaving '
      + 'the scalar line integral unchanged, reversing a surface\'s chosen orientation (r_y×r_x '
      + 'instead of r_x×r_y) flips the flux\'s sign while leaving the scalar surface integral '
      + '(which uses only the magnitude) completely unaffected.',
    targetedMisconceptions: [`${SURFACEINT}:MC-1`, `${SURFACEINT}:MC-2`, `${SURFACEINT}:MC-3`],
    source: eb(SURFACEINT, 'Core Understanding — dS requires the cross-product magnitude, the combined vector element needs no separate unit-normal step, and flux flips sign under orientation reversal while the scalar integral does not'),
  },
]

export const MATHEMATICS_CALCULUS_GREENS_THEOREM_CURL_DIVERGENCE_SURFACE_INTEGRALS_PROBES: SeedProbe[] = [
  // --- math.calc.greens-theorem ------------------------------------------
  {
    conceptId: GREENSTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For P=-y, Q=x around the unit circle, counterclockwise traversal gives +2π. Does traversing the SAME curve clockwise instead also give +2π?',
    choices: [
      { text: 'No — it gives -2π; reversing orientation negates the line integral, and Green\'s Theorem\'s formula specifically assumes counterclockwise traversal', isCorrect: true },
      { text: 'Yes — the direction a closed curve is traversed doesn\'t affect Green\'s Theorem\'s result', isCorrect: false, misconceptionId: `${GREENSTHM}:MC-1` },
      { text: 'Yes, since Green\'s Theorem\'s formula is independent of the curve\'s traversal direction', isCorrect: false, misconceptionId: `${GREENSTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${GREENSTHM}:MC-1`],
    source: eb(GREENSTHM, 'Discovery Question 1 — if you traverse a closed curve clockwise instead of counterclockwise, does the line integral\'s value stay the same, or change'),
  },
  {
    conceptId: GREENSTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For P=-y, Q=x, does it matter whether the double-integral side computes ∂Q/∂x-∂P/∂y or the swapped ∂P/∂x-∂Q/∂y?',
    choices: [
      { text: 'Yes — the correct order gives 1-(-1)=2, matching the line-integral side; the swapped order gives 0-0=0, a completely different, wrong value', isCorrect: true },
      { text: 'No — the two partial-derivative terms can be subtracted in either order with no effect on the result', isCorrect: false, misconceptionId: `${GREENSTHM}:MC-2` },
      { text: 'No, since P and Q are interchangeable labels that can be swapped freely in the formula', isCorrect: false, misconceptionId: `${GREENSTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${GREENSTHM}:MC-2`],
    source: eb(GREENSTHM, 'Discovery Question 2 — does it matter whether you compute ∂Q/∂x-∂P/∂y or the swapped order; try both on a specific example and compare'),
  },
  {
    conceptId: GREENSTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For P=-y/(x²+y²), Q=x/(x²+y²) (a singularity at the origin), if P and Q are well-behaved everywhere ON the unit circle C itself, does Green\'s Theorem apply directly to the region D it encloses?',
    choices: [
      { text: 'No — the continuity hypothesis must hold throughout the ENTIRE region D, not just along C; the singularity at the origin lies INSIDE D and invalidates the hypothesis', isCorrect: true },
      { text: 'Yes — the continuity hypothesis only needs to hold along the boundary curve C itself', isCorrect: false, misconceptionId: `${GREENSTHM}:MC-3` },
      { text: 'Yes, since any singularity strictly inside the region has no bearing on whether the theorem\'s hypotheses are satisfied', isCorrect: false, misconceptionId: `${GREENSTHM}:MC-3` },
    ],
    targetedMisconceptions: [`${GREENSTHM}:MC-3`],
    source: eb(GREENSTHM, 'Discovery Question 3 — does the continuity hypothesis need to hold just along the boundary curve C, or throughout the entire region D that C encloses'),
  },

  // --- math.calc.curl-divergence ------------------------------------------
  {
    conceptId: CURLDIVERG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For F(x,y,z)=(x,y,z), divergence is the single number 3. Should curl of the same field also be reported as "a number"?',
    choices: [
      { text: 'No — curl is always a VECTOR, here (0,0,0); divergence (a dot product) produces a scalar while curl (a cross product) produces a vector, a difference in output TYPE, not just computational detail', isCorrect: true },
      { text: 'Yes — curl and divergence are two flavors of the same kind of measurement, both reported as single numbers', isCorrect: false, misconceptionId: `${CURLDIVERG}:MC-1` },
      { text: 'Yes, since both operators are built from the identical partial derivatives, so they must have the same output type', isCorrect: false, misconceptionId: `${CURLDIVERG}:MC-1` },
    ],
    targetedMisconceptions: [`${CURLDIVERG}:MC-1`],
    source: eb(CURLDIVERG, 'Discovery Question 1 — divergence gives a single number, curl gives a vector; why might these be fundamentally different kinds of measurements'),
  },
  {
    conceptId: CURLDIVERG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a field has zero curl everywhere, does that tell you anything about whether its divergence is also zero?',
    choices: [
      { text: 'No — curl and divergence are independent properties computed from different arrangements of the same partial derivatives; a field can have any combination of zero/nonzero curl and divergence', isCorrect: true },
      { text: 'Yes — zero curl everywhere implies zero divergence everywhere', isCorrect: false, misconceptionId: `${CURLDIVERG}:MC-2` },
      { text: 'Yes, since curl and divergence are computed from the same field and must therefore be correlated', isCorrect: false, misconceptionId: `${CURLDIVERG}:MC-2` },
    ],
    targetedMisconceptions: [`${CURLDIVERG}:MC-2`],
    source: eb(CURLDIVERG, 'Discovery Question 2 — if a field has zero curl everywhere, does that tell you anything about whether its divergence is also zero'),
  },
  {
    conceptId: CURLDIVERG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For F(x,y)=(-y/(x²+y²),x/(x²+y²)) on ℝ²\\{(0,0)}, curl is exactly zero everywhere the field is defined. Is F therefore guaranteed to be conservative?',
    choices: [
      { text: 'No — the closed-loop line integral around the unit circle is 2π≠0, proving F is NOT conservative despite passing the curl test everywhere; zero curl is necessary but not sufficient when the domain has a hole', isCorrect: true },
      { text: 'Yes — zero curl everywhere the field is defined always guarantees conservativeness', isCorrect: false, misconceptionId: `${CURLDIVERG}:MC-3` },
      { text: 'Yes, since the curl test is both necessary and sufficient for conservativeness in every case', isCorrect: false, misconceptionId: `${CURLDIVERG}:MC-3` },
    ],
    targetedMisconceptions: [`${CURLDIVERG}:MC-3`],
    source: eb(CURLDIVERG, 'Discovery Question 3 — if a field has curl exactly zero at every point where it\'s defined, is it guaranteed to be conservative, or could something about the domain itself matter'),
  },

  // --- math.calc.surface-integrals ------------------------------------------
  {
    conceptId: SURFACEINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the tilted plane z=4-x-y over D=[0,1]×[0,1], is ∬_D 1 dx dy=1 (the flat shadow\'s area) the correct surface area?',
    choices: [
      { text: 'No — dS requires the cross-product magnitude ‖r_x×r_y‖=√3, giving the correct surface area ∬_D√3 dx dy=√3, larger than the flat shadow since the surface is tilted', isCorrect: true },
      { text: 'Yes — dS converts to dx dy directly, with no additional scaling factor needed', isCorrect: false, misconceptionId: `${SURFACEINT}:MC-1` },
      { text: 'Yes, since a surface\'s true area always equals its shadow region\'s flat area regardless of tilt', isCorrect: false, misconceptionId: `${SURFACEINT}:MC-1` },
    ],
    targetedMisconceptions: [`${SURFACEINT}:MC-1`],
    source: eb(SURFACEINT, 'Discovery Question 1 — a surface has two tangent vectors at each point; what single quantity built from both might play ds\'s role for dS'),
  },
  {
    conceptId: SURFACEINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Once r_x×r_y has been computed, must it first be normalized to a unit vector before dotting with F to get flux?',
    choices: [
      { text: 'No — r_x×r_y already carries both direction and magnitude together; dotting F directly into it gives flux with no separate unit-normal step needed', isCorrect: true },
      { text: 'Yes — flux requires first computing the unit normal separately, then multiplying by dS', isCorrect: false, misconceptionId: `${SURFACEINT}:MC-2` },
      { text: 'Yes, since dotting F into an un-normalized cross product always produces an incorrect flux value', isCorrect: false, misconceptionId: `${SURFACEINT}:MC-2` },
    ],
    targetedMisconceptions: [`${SURFACEINT}:MC-2`],
    source: eb(SURFACEINT, 'Discovery Question 2 — once you\'ve computed r_x×r_y, do you need to do anything further to it before dotting it with F, or does it already carry everything you need'),
  },
  {
    conceptId: SURFACEINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For F=(0,0,1) through a tilted plane, r_x×r_y=(1,1,1) gives flux +1. Reversing orientation to r_y×r_x=(-1,-1,-1), does the flux stay +1?',
    choices: [
      { text: 'No — it becomes -1; reversing orientation flips the flux\'s sign, while the scalar surface integral (surface area) uses only the magnitude and is completely unaffected', isCorrect: true },
      { text: 'Yes — flux, like the scalar surface integral, is unaffected by which way the surface\'s normal is oriented', isCorrect: false, misconceptionId: `${SURFACEINT}:MC-3` },
      { text: 'Yes, since surface integrals generalize line integrals, so every orientation rule from line integrals carries over identically to both the scalar and vector surface cases', isCorrect: false, misconceptionId: `${SURFACEINT}:MC-3` },
    ],
    targetedMisconceptions: [`${SURFACEINT}:MC-3`],
    source: eb(SURFACEINT, 'Discovery Question 3 — if you flip which way a surface\'s normal points, does the scalar surface integral change? Does the flux change'),
  },
]

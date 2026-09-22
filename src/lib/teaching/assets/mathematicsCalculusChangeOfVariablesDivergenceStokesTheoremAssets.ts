/**
 * Nineteenth math.calc asset batch — change of variables (Jacobian), the
 * Divergence Theorem, and Stokes' Theorem.
 *
 * Continues serving-asset coverage for math.calc (58/76 -> 61/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.change-of-variables.md,
 * math.calc.divergence-theorem.md, and math.calc.stokes-theorem.md.
 *
 *   CHANGEOFVAR   change-of-variables — the Jacobian matrix must use a
 *                 CONSISTENT convention (rows = outputs, columns = inputs);
 *                 the ABSOLUTE VALUE of the Jacobian is required in the
 *                 formula, never the signed value, since area can never
 *                 be negative; a nonlinear transformation's Jacobian
 *                 genuinely VARIES from point to point, never constant
 *                 like the linear case.
 *   DIVERGENCETHM divergence-theorem — check the divergence first: a
 *                 simple constant divergence often makes the volume-
 *                 integral route dramatically easier than a direct
 *                 surface computation; the theorem requires a genuinely
 *                 CLOSED surface (no gaps) — an open surface like a
 *                 hemisphere without its base is never directly eligible.
 *   STOKESTHM     stokes-theorem — the boundary curve's traversal
 *                 direction must be consistent with the surface's normal
 *                 via the right-hand rule, never assumed automatic;
 *                 Green's Theorem is Stokes' Theorem's flat 2D special
 *                 case, not a separate coincidentally-similar result;
 *                 check both sides for an easier computation before
 *                 committing (a zero curl trivializes the surface side).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CHANGEOFVAR = 'math.calc.change-of-variables'
const DIVERGENCETHM = 'math.calc.divergence-theorem'
const STOKESTHM = 'math.calc.stokes-theorem'

export const MATHEMATICS_CALCULUS_CHANGE_OF_VARIABLES_DIVERGENCE_STOKES_THEOREM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHANGEOFVAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For a substitution (x,y)=T(u,v), the Jacobian determinant ∂(x,y)/∂(u,v) is computed exactly '
      + 'as an ordinary 2×2 determinant (rows = output variables x,y, columns = input variables '
      + 'u,v), but with partial-derivative entries rather than plain numbers. The matrix must be '
      + 'set up with this CONSISTENT convention for the determinant to correctly represent the '
      + 'transformation.\n\n'
      + 'The change-of-variables formula is ∬_R f(x,y) dA = ∬_R\' f(T(u,v)) |∂(x,y)/∂(u,v)| du dv '
      + '— the ABSOLUTE VALUE of the Jacobian is essential, never optional. A negative Jacobian '
      + 'indicates the transformation reverses orientation, but AREA itself is never negative, so '
      + 'taking the absolute value correctly produces a genuine, positive area-scaling factor '
      + 'regardless of orientation.\n\n'
      + 'The Jacobian\'s MAGNITUDE is the LOCAL area-scaling factor. For a LINEAR transformation, '
      + 'the Jacobian is CONSTANT everywhere; but for a NONLINEAR transformation (like polar '
      + 'coordinates, Jacobian=r), the Jacobian genuinely VARIES from point to point and must be '
      + 'evaluated separately at each location, never assumed uniform across the whole region.',
    targetedMisconceptions: [`${CHANGEOFVAR}:MC-1`, `${CHANGEOFVAR}:MC-2`, `${CHANGEOFVAR}:MC-3`],
    source: eb(CHANGEOFVAR, 'Core Understanding — the Jacobian matrix needs a consistent row/column convention, the formula requires the absolute value, and a nonlinear transformation\'s Jacobian varies pointwise'),
  },
  {
    conceptId: DIVERGENCETHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Divergence Theorem states ∭_E ∇·F dV = ∬_S F·dS, where E is a solid 3D region and S is '
      + 'its CLOSED boundary surface, oriented with an OUTWARD-pointing normal. It relates the '
      + 'TOTAL divergence accumulated throughout E\'s interior to the total FLUX through its '
      + 'entire boundary.\n\n'
      + 'Practically, the theorem lets a learner CONVERT between a surface flux integral and a '
      + 'volume integral, choosing whichever is easier: computing ∇·F and integrating over a '
      + 'simple solid region is often far easier than directly parametrizing a complicated '
      + 'boundary surface — checking the divergence FIRST, before committing to a direct surface '
      + 'computation, is the load-bearing strategic habit.\n\n'
      + 'The theorem requires S to be a genuinely CLOSED surface, fully enclosing E with NO gaps. '
      + 'An OPEN surface — a single hemisphere missing its flat circular base, for instance — is '
      + 'NOT the boundary of any solid region on its own, so the Divergence Theorem does NOT apply '
      + 'directly to it. Such cases require adding a "capping" surface to genuinely close it, then '
      + 'subtracting the cap\'s separately computed contribution.',
    targetedMisconceptions: [`${DIVERGENCETHM}:MC-1`, `${DIVERGENCETHM}:MC-2`],
    source: eb(DIVERGENCETHM, 'Core Understanding — check the divergence first for a shortcut, and the theorem requires a genuinely closed surface, never an open one applied directly'),
  },
  {
    conceptId: STOKESTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Stokes\' Theorem states ∬_S(∇×F)·dS = ∮_C F·dr, where S is an oriented surface and C is its '
      + 'BOUNDARY curve, oriented CONSISTENTLY with S\'s normal direction via the right-hand rule: '
      + 'if the fingers curl along C\'s traversal direction, the thumb must point along S\'s chosen '
      + 'normal. This consistency is a procedural check that must be explicitly performed, never '
      + 'assumed automatic from merely stating "let C be the boundary of S."\n\n'
      + 'This is the direct 3D GENERALIZATION of Green\'s Theorem, not a separate, unrelated '
      + 'result: when S is a FLAT region in the xy-plane, ∇×F\'s z-component is the ONLY one '
      + 'contributing, and that single component reduces EXACTLY to Green\'s Theorem\'s scalar '
      + 'curl expression ∂Q/∂x-∂P/∂y.\n\n'
      + 'Stokes\' Theorem lets a learner CONVERT between a line integral and a surface integral, '
      + 'choosing whichever side is computationally easier. When ∇×F is especially simple (most '
      + 'dramatically, zero everywhere), the surface-integral side collapses immediately, entirely '
      + 'avoiding a potentially complicated direct parametrization of C — checking BOTH sides '
      + 'before committing to a computation path is the load-bearing strategic habit, since '
      + 'nothing about the theorem\'s symmetric-looking statement signals which side is easier.',
    targetedMisconceptions: [`${STOKESTHM}:MC-1`, `${STOKESTHM}:MC-2`],
    source: eb(STOKESTHM, 'Core Understanding — the boundary curve\'s orientation must be checked against the surface\'s normal via the right-hand rule, Green\'s Theorem is the flat special case, and both sides should be checked for an easier route'),
  },
]

export const MATHEMATICS_CALCULUS_CHANGE_OF_VARIABLES_DIVERGENCE_STOKES_THEOREM_PROBES: SeedProbe[] = [
  // --- math.calc.change-of-variables ------------------------------------------
  {
    conceptId: CHANGEOFVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Building the Jacobian matrix for (x,y)=T(u,v), how should the rows and columns be assigned?',
    choices: [
      { text: 'Rows are the output variables x,y; columns are the input variables u,v — this consistent convention must be fixed, since all four entries are structurally similar partial derivatives easy to place inconsistently', isCorrect: true },
      { text: 'Rows and columns can be assigned in any order, since the determinant\'s value is unaffected by which convention is used', isCorrect: false, misconceptionId: `${CHANGEOFVAR}:MC-1` },
      { text: 'Rows are always u,v and columns are always x,y, regardless of which variables are being solved for', isCorrect: false, misconceptionId: `${CHANGEOFVAR}:MC-1` },
    ],
    targetedMisconceptions: [`${CHANGEOFVAR}:MC-1`],
    source: eb(CHANGEOFVAR, 'Discovery Question 3 — how does building the Jacobian matrix here compare to building an ordinary 2×2 matrix from math.linalg.determinant'),
  },
  {
    conceptId: CHANGEOFVAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A substitution\'s Jacobian works out to -3 at some point. What value should be used as the area-scaling factor in the change-of-variables formula?',
    choices: [
      { text: '3 — the absolute value |-3| is required; area itself is never negative, even though the Jacobian\'s sign correctly encodes orientation in other contexts', isCorrect: true },
      { text: '-3 — the signed value is used directly in the formula, since it correctly encodes the transformation\'s orientation', isCorrect: false, misconceptionId: `${CHANGEOFVAR}:MC-2` },
      { text: 'Either -3 or 3 is acceptable, since the sign has no effect on the final integral\'s value', isCorrect: false, misconceptionId: `${CHANGEOFVAR}:MC-2` },
    ],
    targetedMisconceptions: [`${CHANGEOFVAR}:MC-2`],
    source: eb(CHANGEOFVAR, 'Discovery Question 1 — if the Jacobian works out to a negative number at some point, what should the actual area-scaling factor be'),
  },
  {
    conceptId: CHANGEOFVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For polar coordinates (a nonlinear substitution), the Jacobian is r. Does this single value apply everywhere in the region, the way a linear substitution\'s constant Jacobian would?',
    choices: [
      { text: 'No — for a NONLINEAR transformation, the Jacobian genuinely varies from point to point (here, with r); it must be evaluated separately at each location, unlike a linear substitution\'s constant Jacobian', isCorrect: true },
      { text: 'Yes — once computed at one point, the Jacobian applies uniformly across the entire region, just as it does for a linear substitution', isCorrect: false, misconceptionId: `${CHANGEOFVAR}:MC-3` },
      { text: 'Yes, since every valid substitution must have a Jacobian that is constant throughout its domain', isCorrect: false, misconceptionId: `${CHANGEOFVAR}:MC-3` },
    ],
    targetedMisconceptions: [`${CHANGEOFVAR}:MC-3`],
    source: eb(CHANGEOFVAR, 'Discovery Question 2 — for a nonlinear substitution, is the Jacobian the same everywhere, or does it depend on which point you evaluate it at'),
  },

  // --- math.calc.divergence-theorem ------------------------------------------
  {
    conceptId: DIVERGENCETHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For F=(x,y,z) and E the solid unit ball, ∇·F=3 (a simple constant). Should the flux be computed by directly parametrizing the unit sphere, or via the Divergence Theorem\'s volume-integral route?',
    choices: [
      { text: 'Via the volume-integral route — since ∇·F=3 is a simple constant, ∭_E 3 dV=3·Vol(E)=4π is dramatically simpler than directly parametrizing and integrating over the curved sphere', isCorrect: true },
      { text: 'By directly parametrizing the sphere, since checking the divergence first offers no strategic advantage over the direct surface computation', isCorrect: false, misconceptionId: `${DIVERGENCETHM}:MC-1` },
      { text: 'It makes no difference which route is chosen, since both always require an equal amount of computational work', isCorrect: false, misconceptionId: `${DIVERGENCETHM}:MC-1` },
    ],
    targetedMisconceptions: [`${DIVERGENCETHM}:MC-1`],
    source: eb(DIVERGENCETHM, 'Discovery Question 1 — for a field with a simple, constant divergence, would you rather compute the flux directly or compute a volume integral of that constant'),
  },
  {
    conceptId: DIVERGENCETHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a single hemisphere S (just the curved surface, no flat circular base), can the Divergence Theorem be applied directly to ∬_S F·dS?',
    choices: [
      { text: 'No — a hemisphere without its base does not fully enclose any solid region by itself; the correct approach adds the flat base (forming a closed surface), applies the theorem to the combination, then subtracts the base\'s separately computed flux', isCorrect: true },
      { text: 'Yes — any surface that looks like it wraps around a shape counts as closed enough for the theorem to apply directly', isCorrect: false, misconceptionId: `${DIVERGENCETHM}:MC-2` },
      { text: 'Yes, since the theorem\'s closed-surface requirement only matters for surfaces with sharp corners, not smooth ones like a hemisphere', isCorrect: false, misconceptionId: `${DIVERGENCETHM}:MC-2` },
    ],
    targetedMisconceptions: [`${DIVERGENCETHM}:MC-2`],
    source: eb(DIVERGENCETHM, 'Discovery Question 2 — does a single hemisphere, just the curved part with no flat base, fully enclose a solid region by itself, the way a complete sphere does'),
  },
  {
    conceptId: DIVERGENCETHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For F=(x³,y³,z³) over the solid cube [0,1]³, would six separate face-by-face surface integrals or a single volume integral of the divergence be less work — and does the Divergence Theorem let you choose?',
    choices: [
      { text: 'The single volume integral ∭_E(3x²+3y²+3z²)dV is less work, and the Divergence Theorem licenses replacing all six separate face computations with exactly that one integral', isCorrect: true },
      { text: 'The six separate face integrals must always be computed individually; the Divergence Theorem cannot replace them with a single volume integral', isCorrect: false, misconceptionId: `${DIVERGENCETHM}:MC-1` },
      { text: 'Both routes require identical effort, since a closed cube\'s boundary offers no genuine computational shortcut', isCorrect: false, misconceptionId: `${DIVERGENCETHM}:MC-1` },
    ],
    targetedMisconceptions: [`${DIVERGENCETHM}:MC-1`],
    source: eb(DIVERGENCETHM, 'Discovery Question 3 — for a cube\'s flux through all six faces, would six separate surface integrals or one volume integral be less work, and does the Divergence Theorem let you choose'),
  },

  // --- math.calc.stokes-theorem ------------------------------------------
  {
    conceptId: STOKESTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A hemisphere has an outward, upward-pointing normal. Viewed from above, which direction should its equatorial boundary circle be traversed to be consistent with that normal via the right-hand rule?',
    choices: [
      { text: 'Counterclockwise, viewed from above — curling the right hand\'s fingers in that direction makes the thumb point up, matching the surface\'s chosen outward normal', isCorrect: true },
      { text: 'Either direction is equally valid, since the boundary curve is simply whatever curve traces the surface\'s edge', isCorrect: false, misconceptionId: `${STOKESTHM}:MC-1` },
      { text: 'Clockwise, viewed from above, since that direction always matches an outward-pointing normal', isCorrect: false, misconceptionId: `${STOKESTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${STOKESTHM}:MC-1`],
    source: eb(STOKESTHM, 'Discovery Question 1 — if a surface\'s normal points outward and upward, which direction should its boundary curve be traversed to match, via the right-hand rule'),
  },
  {
    conceptId: STOKESTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A vector field has ∇×F=0 everywhere, and C is a genuinely complicated closed curve. Should ∮_C F·dr be computed by directly parametrizing C?',
    choices: [
      { text: 'No — Stokes\' Theorem immediately gives ∮_C F·dr=∬_S 0 dS=0 for ANY surface bounded by C, entirely bypassing the need to parametrize C directly', isCorrect: true },
      { text: 'Yes — the line-integral side must always be computed directly, regardless of what the curl happens to be', isCorrect: false, misconceptionId: `${STOKESTHM}:MC-2` },
      { text: 'Yes, since checking the curl before choosing a computation side offers no strategic advantage', isCorrect: false, misconceptionId: `${STOKESTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${STOKESTHM}:MC-2`],
    source: eb(STOKESTHM, 'Discovery Question 3 — if you know curl F=0 everywhere and need to evaluate a complicated line integral, is there a shortcut before attempting to parametrize the curve directly'),
  },
  {
    conceptId: STOKESTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When a surface S lies entirely flat in the xy-plane, does the full 3D curl vector ∇×F contribute all three of its components to the surface integral, or just one — and which theorem does the reduced expression match?',
    choices: [
      { text: 'Just the z-component contributes (since dS points purely in the z-direction there), and that single component reduces exactly to ∂Q/∂x-∂P/∂y — Green\'s Theorem\'s own scalar curl expression, confirming Green\'s Theorem as Stokes\' Theorem\'s flat special case', isCorrect: true },
      { text: 'All three components of curl always contribute equally, regardless of the surface\'s orientation in space', isCorrect: false, misconceptionId: `${STOKESTHM}:MC-1` },
      { text: 'The reduction to a flat surface has no relationship to Green\'s Theorem; the two are separate, coincidentally similar results', isCorrect: false, misconceptionId: `${STOKESTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${STOKESTHM}:MC-1`],
    source: eb(STOKESTHM, 'Discovery Question 2 — when a surface lies entirely flat in the xy-plane, does the full 3D curl contribute all three components or just one, and which theorem does that reduced expression look exactly like'),
  },
]

/**
 * Twenty-ninth batch — the last five. This CLOSES math.geom, which
 * closes MATHEMATICS: every authored Educational Brain entry in the
 * subject now has serving assets behind it.
 *
 * Four of these five are differential geometry, and they share one
 * shape of error: treating a LOCAL, POINTWISE quantity as though it
 * were global or constant. Curvature is defined at a point. The first
 * fundamental form varies across a surface. Gaussian curvature changes
 * sign from place to place. The one exception is the Euler
 * characteristic — genuinely global, and the registers record it being
 * assumed local instead, i.e. the same confusion running backwards.
 *
 *   PROOF     geometric-proof — the plane-geometry entry, and the one
 *             concept in this batch a school learner meets.
 *   CURVES    differential-geometry-curves, curvature, frenet-serret
 *   SURFACES  differential-geometry-surfaces
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GPROOF = 'math.geom.geometric-proof'
const DGC = 'math.geom.differential-geometry-curves'
const CURV = 'math.geom.curvature'
const FS = 'math.geom.frenet-serret'
const DGS = 'math.geom.differential-geometry-surfaces'

export const MATHEMATICS_DIFF_GEOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GPROOF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A geometric proof establishes a claim from definitions, postulates and theorems '
      + 'already proved. The two-column layout is a convenience: statements on the left, '
      + 'REASONS on the right.\n\n'
      + 'The reason column is the proof. A list of true statements with the justifications '
      + 'left blank has shown nothing — anyone can write down facts, and what convinces is '
      + 'the chain of WHY. "AB = CD" is a claim; "AB = CD, because the perpendicular bisector '
      + 'makes them equal" is an argument, and only the second half does any work.\n\n'
      + 'The proof runs to what was ASKED, not to the first interesting result. Showing two '
      + 'triangles congruent when the goal was that two angles are equal leaves the last step '
      + 'missing — congruence gives it by corresponding parts, and saying so is part of the '
      + 'proof rather than an obvious extra. And a paragraph proof is not less rigorous than '
      + 'two columns; the layout is presentation, and the same reasoning in prose is the form '
      + 'working mathematicians actually use.',
    targetedMisconceptions: [`${GPROOF}:MC-1`, `${GPROOF}:MC-2`],
    source: eb(GPROOF, 'Identity + Misconception register — the reason column IS the proof; finish the goal'),
  },
  {
    conceptId: DGC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A parametrised curve r(t) traces a path as t runs. Its derivative r′(t) is the '
      + 'VELOCITY — a vector with both direction and speed — and the unit tangent is '
      + 'T = r′/|r′|, which keeps the direction and throws the speed away.\n\n'
      + 'Those are not the same object, and the difference is the whole reason for the '
      + 'division. Two cars on the same road at different speeds have the same T and quite '
      + 'different r′. Treating velocity as already unit-length silently assumes |r′| = 1, '
      + 'which is true only under one very particular parametrisation.\n\n'
      + 'That parametrisation is by ARC LENGTH, s, and switching to it is not relabelling. '
      + 'Under s the curve is traversed at unit speed, so |r′(s)| = 1 always, and formulas '
      + 'that would otherwise carry correction factors collapse to their clean form — which '
      + 'is exactly why curvature is defined there. In three dimensions every component is '
      + 'treated alike: z is differentiated and normed with x and y, and there is nothing '
      + 'special about it.',
    targetedMisconceptions: [`${DGC}:MC-1`, `${DGC}:MC-2`],
    source: eb(DGC, 'Identity + Misconception register — velocity is not the unit tangent; arc length is not relabelling'),
  },
  {
    conceptId: CURV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Curvature κ measures how fast a curve turns. Under arc-length parametrisation it is '
      + 'κ = |T′(s)| — the rate at which the unit tangent changes direction. A straight line '
      + 'has κ = 0; a circle of radius R has κ = 1/R everywhere, so a tight circle curves '
      + 'hard and a vast one barely at all.\n\n'
      + 'It is a LOCAL quantity, defined AT A POINT. Asking "the curvature of this curve" is '
      + 'usually the wrong question — for anything but a line or a circle it varies along the '
      + 'path, and a parabola curves most sharply at its vertex and flattens away from it.\n\n'
      + 'The definition needs unit speed, and applying |T′| to an arbitrary parametrisation '
      + 'measures how fast you are DRIVING as well as how sharply the road bends. Rather than '
      + 'reparametrising every time — usually impossible in closed form — use the general '
      + 'formula κ = |r′ × r″| / |r′|³. That cross product is doing different work from the '
      + 'one in the Frenet frame, and the |r′|³ in the denominator is precisely the '
      + 'speed-correction that arc length would have made unnecessary.',
    targetedMisconceptions: [`${CURV}:MC-1`, `${CURV}:MC-3`],
    source: eb(CURV, 'Identity + Misconception register — curvature is local; the general formula corrects for speed'),
  },
  {
    conceptId: FS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Frenet-Serret frame attaches three perpendicular unit vectors to each point of a '
      + 'space curve. T is the unit TANGENT, pointing along the motion. N is the NORMAL, '
      + 'T′/|T′|, pointing toward the centre of the turn. B = T × N is the BINORMAL, '
      + 'perpendicular to both.\n\n'
      + 'Their roles are distinct and easy to swap. T and N span the plane the curve is '
      + 'momentarily turning in — the osculating plane — while B is perpendicular to it and '
      + 'so points out of the turn entirely. If B were in that plane it could not complete '
      + 'the frame, and the three would not be independent.\n\n'
      + 'Two numbers describe the motion, and they are INDEPENDENT. Curvature κ says how '
      + 'sharply the curve turns within the osculating plane; TORSION τ says how fast that '
      + 'plane itself twists out of position. A circle has constant κ and ZERO torsion — it '
      + 'never leaves its plane — while a helix has both constant and non-zero. So torsion '
      + 'cannot be derived from curvature: it measures the escape from flatness that '
      + 'curvature says nothing about, and together they determine the curve up to position.',
    targetedMisconceptions: [`${FS}:MC-1`, `${FS}:MC-2`],
    source: eb(FS, 'Identity + Misconception register — B leaves the osculating plane; torsion is independent of curvature'),
  },
  {
    conceptId: DGS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A surface\'s intrinsic geometry — lengths, angles and areas measured within it — is '
      + 'carried by the FIRST FUNDAMENTAL FORM. It is built from the tangent vectors at a '
      + 'point, so it VARIES from place to place; treating it as one fixed matrix for the '
      + 'whole surface assumes the surface is flat, which is the case it was invented to '
      + 'move past.\n\n'
      + 'GAUSSIAN CURVATURE K is the product of the two principal curvatures, and its SIGN '
      + 'is the shape. Positive on a sphere, where the surface bends the same way in every '
      + 'direction; ZERO on a cylinder, which is why paper rolls without stretching; NEGATIVE '
      + 'on a saddle, which curves up one way and down the other. It is not always positive, '
      + 'and one surface can carry all three signs — a torus does.\n\n'
      + 'Gauss\'s Theorema Egregium says K is INTRINSIC: bending a surface without stretching '
      + 'leaves it unchanged, which is why a flat map of the sphere must distort. The Gauss-'
      + 'Bonnet theorem then ties the total curvature to the EULER CHARACTERISTIC — and that '
      + 'is genuinely global and topological. Dent a sphere however you like and χ stays 2; '
      + 'only cutting or gluing changes it, so bending cannot.',
    targetedMisconceptions: [`${DGS}:MC-1`, `${DGS}:MC-2`],
    source: eb(DGS, 'Identity + Misconception register — the form varies; K takes all three signs; χ survives bending'),
  },
]

export const MATHEMATICS_DIFF_GEOM_PROBES: SeedProbe[] = [
  // --- math.geom.geometric-proof ------------------------------------------------------
  {
    conceptId: GPROOF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a two-column proof, what does the right-hand column carry?',
    choices: [
      { text: 'The REASONS — which is where the proving actually happens', isCorrect: true },
      { text: 'A restatement of each step, for tidiness', isCorrect: false, misconceptionId: `${GPROOF}:MC-1` },
      { text: 'The diagram labels', isCorrect: false, misconceptionId: `${GPROOF}:MC-1` },
    ],
    targetedMisconceptions: [`${GPROOF}:MC-1`],
    source: eb(GPROOF, 'Assessment gate — the reason column is the proof'),
  },
  {
    conceptId: GPROOF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You were asked to prove two ANGLES equal and have proved the triangles congruent. Are you finished?',
    choices: [
      { text: 'No — congruence gives it by corresponding parts, and saying so is the last step of the proof', isCorrect: true },
      { text: 'Yes — congruence is the substantial result', isCorrect: false, misconceptionId: `${GPROOF}:MC-2` },
      { text: 'Yes — the rest is obvious and can be left to the reader', isCorrect: false, misconceptionId: `${GPROOF}:MC-2` },
    ],
    targetedMisconceptions: [`${GPROOF}:MC-2`],
    source: eb(GPROOF, 'Misconception register — the proof runs to what was asked'),
  },
  {
    conceptId: GPROOF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is a paragraph proof less rigorous than a two-column one?',
    choices: [
      { text: 'No — the layout is presentation; prose is the form working mathematicians use', isCorrect: true },
      { text: 'Yes — only two columns are properly rigorous', isCorrect: false, misconceptionId: `${GPROOF}:MC-3` },
      { text: 'Yes — prose allows steps to be skipped', isCorrect: false, misconceptionId: `${GPROOF}:MC-3` },
    ],
    targetedMisconceptions: [`${GPROOF}:MC-3`],
    source: eb(GPROOF, 'Transfer probe — layout is not rigour'),
  },

  // --- math.geom.differential-geometry-curves --------------------------------------------
  {
    conceptId: DGC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How is the unit tangent T obtained from r′(t)?',
    choices: [
      { text: 'T = r′/|r′| — divide out the speed, keeping only the direction', isCorrect: true },
      { text: 'T = r′ — the velocity is already the unit tangent', isCorrect: false, misconceptionId: `${DGC}:MC-1` },
      { text: 'T = r″', isCorrect: false },
    ],
    targetedMisconceptions: [`${DGC}:MC-1`],
    source: eb(DGC, 'Assessment gate — velocity carries speed, T does not'),
  },
  {
    conceptId: DGC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two cars drive the same road at different speeds. What differs?',
    choices: [
      { text: 'Their velocities r′ differ; their unit tangents T are the same', isCorrect: true },
      { text: 'Nothing — velocity and unit tangent are the same object', isCorrect: false, misconceptionId: `${DGC}:MC-1` },
      { text: 'Their unit tangents differ but the velocities match', isCorrect: false, misconceptionId: `${DGC}:MC-1` },
    ],
    targetedMisconceptions: [`${DGC}:MC-1`],
    source: eb(DGC, 'Misconception register — the division is the whole point'),
  },
  {
    conceptId: DGC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What does reparametrising by ARC LENGTH actually buy you?',
    choices: [
      { text: 'Unit speed — |r′(s)| = 1 always, so formulas lose their correction factors', isCorrect: true },
      { text: 'Nothing but a new name for the parameter', isCorrect: false, misconceptionId: `${DGC}:MC-2` },
      { text: 'It makes the curve shorter', isCorrect: false, misconceptionId: `${DGC}:MC-2` },
    ],
    targetedMisconceptions: [`${DGC}:MC-2`],
    source: eb(DGC, 'Transfer probe — arc length is not relabelling'),
  },

  // --- math.geom.curvature ------------------------------------------------------------------
  {
    conceptId: CURV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the curvature of a circle of radius R?',
    choices: [
      { text: '1/R — so a tight circle curves hard and a vast one barely at all', isCorrect: true },
      { text: 'R', isCorrect: false },
      { text: 'Zero — a circle closes on itself', isCorrect: false },
    ],
    targetedMisconceptions: [`${CURV}:MC-3`],
    source: eb(CURV, 'Assessment gate — curvature is the reciprocal of the radius'),
  },
  {
    conceptId: CURV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is "the curvature of a parabola"?',
    choices: [
      { text: 'An ill-posed question — curvature is LOCAL; a parabola curves most at its vertex and flattens away', isCorrect: true },
      { text: 'A single number for the whole curve', isCorrect: false, misconceptionId: `${CURV}:MC-3` },
      { text: 'Zero, since it is not closed', isCorrect: false, misconceptionId: `${CURV}:MC-3` },
    ],
    targetedMisconceptions: [`${CURV}:MC-3`],
    source: eb(CURV, 'Misconception register — curvature is defined at a point'),
  },
  {
    conceptId: CURV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does the general formula divide by |r′|³?',
    choices: [
      { text: 'It corrects for speed — |T′| alone would also measure how fast you are driving, not just how the road bends', isCorrect: true },
      { text: 'It is a normalisation constant with no meaning', isCorrect: false, misconceptionId: `${CURV}:MC-1` },
      { text: 'Because the cross product is the same one used in the Frenet frame', isCorrect: false, misconceptionId: `${CURV}:MC-2` },
    ],
    targetedMisconceptions: [`${CURV}:MC-1`, `${CURV}:MC-2`],
    source: eb(CURV, 'Transfer probe — the denominator is the speed correction'),
  },

  // --- math.geom.frenet-serret ----------------------------------------------------------------
  {
    conceptId: FS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which vector points toward the centre of the turn?',
    choices: [
      { text: 'The NORMAL N', isCorrect: true },
      { text: 'The binormal B', isCorrect: false, misconceptionId: `${FS}:MC-1` },
      { text: 'The tangent T', isCorrect: false, misconceptionId: `${FS}:MC-1` },
    ],
    targetedMisconceptions: [`${FS}:MC-1`],
    source: eb(FS, 'Assessment gate — N points into the turn'),
  },
  {
    conceptId: FS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Where does the binormal B sit relative to the osculating plane?',
    choices: [
      { text: 'PERPENDICULAR to it — T and N span that plane, so B must leave it to complete the frame', isCorrect: true },
      { text: 'Inside it, alongside T and N', isCorrect: false, misconceptionId: `${FS}:MC-1` },
      { text: 'Along the curve, parallel to T', isCorrect: false, misconceptionId: `${FS}:MC-1` },
    ],
    targetedMisconceptions: [`${FS}:MC-1`],
    source: eb(FS, 'Misconception register — B leaves the osculating plane'),
  },
  {
    conceptId: FS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A circle has constant curvature. What is its torsion, and what does that show?',
    choices: [
      { text: 'Zero — it never leaves its plane, so torsion is INDEPENDENT of curvature', isCorrect: true },
      { text: 'Equal to its curvature, since torsion follows from κ', isCorrect: false, misconceptionId: `${FS}:MC-2` },
      { text: 'Also constant and non-zero, like a helix', isCorrect: false, misconceptionId: `${FS}:MC-2` },
    ],
    targetedMisconceptions: [`${FS}:MC-2`],
    source: eb(FS, 'Transfer probe — torsion measures escape from flatness'),
  },

  // --- math.geom.differential-geometry-surfaces -------------------------------------------------
  {
    conceptId: DGS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the Gaussian curvature of a cylinder?',
    choices: [
      { text: 'Zero — which is why paper rolls without stretching', isCorrect: true },
      { text: 'Positive, like a sphere', isCorrect: false, misconceptionId: `${DGS}:MC-2` },
      { text: 'Negative, like a saddle', isCorrect: false, misconceptionId: `${DGS}:MC-2` },
    ],
    targetedMisconceptions: [`${DGS}:MC-2`],
    source: eb(DGS, 'Assessment gate — a cylinder is intrinsically flat'),
  },
  {
    conceptId: DGS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is Gaussian curvature always positive?',
    choices: [
      { text: 'No — zero on a cylinder, negative on a saddle, and a torus carries all three signs', isCorrect: true },
      { text: 'Yes — curvature measures bending, which is a positive quantity', isCorrect: false, misconceptionId: `${DGS}:MC-2` },
      { text: 'Yes, except at isolated points', isCorrect: false, misconceptionId: `${DGS}:MC-2` },
    ],
    targetedMisconceptions: [`${DGS}:MC-2`],
    source: eb(DGS, 'Misconception register — K takes all three signs'),
  },
  {
    conceptId: DGS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You dent a sphere without tearing it. What happens to its Euler characteristic?',
    choices: [
      { text: 'Nothing — χ stays 2; it is topological, and only cutting or gluing changes it', isCorrect: true },
      { text: 'It changes, since the shape changed', isCorrect: false, misconceptionId: `${DGS}:MC-3` },
      { text: 'It changes wherever the Gaussian curvature changed sign', isCorrect: false, misconceptionId: `${DGS}:MC-3` },
    ],
    targetedMisconceptions: [`${DGS}:MC-3`],
    source: eb(DGS, 'Transfer probe — χ survives bending'),
  },
]

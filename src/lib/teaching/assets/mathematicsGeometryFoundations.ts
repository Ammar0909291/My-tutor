/**
 * Geometry's actual beginning.
 *
 * Eight concepts already served in geometry — angle, circle, triangle, slope and
 * the rest — but every one of them assumes point, line and plane, and those had
 * no serving content at all. A learner could be taught what a triangle's angles
 * sum to before anything had told them what a line IS.
 *
 * These are the undefined terms and the first things built from them. They are
 * genuinely hard to teach well precisely because they are so basic: a point has
 * no size, a line has no thickness, and both are idealisations of marks that
 * obviously DO have size and thickness. Each explanation names that gap rather
 * than pretending the drawing is the object, because pretending is what leaves
 * learners believing a line is a thin rectangle.
 *
 * Each carries one explanation and three closed-choice probes — the contract.
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PT = 'math.geom.point'
const LN = 'math.geom.line'
const SEG = 'math.geom.line-segment'
const RAY = 'math.geom.ray'
const PL = 'math.geom.plane'
const ATYPE = 'math.geom.angle-types'
const AMEAS = 'math.geom.angle-measurement'
const PERP = 'math.geom.perpendicular-lines'

export const MATHEMATICS_GEOMETRY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Press a sharp pencil onto paper. The dot you made has width — put it under a '
      + 'microscope and it is a blob. A mathematical point does not. It has a position and '
      + 'nothing else: no width, no height, no size at all.\n\n'
      + 'That sounds like a technicality until you try to say where two lines cross. If the '
      + 'crossing had any size, there would be a small region that is "the meeting", and you '
      + 'could ask which part of it is really the intersection. A point with no size makes '
      + 'the question go away.\n\n'
      + 'So the dot on your page is a PICTURE of a point, the way a photograph is a picture '
      + 'of a person. We draw it big enough to see. Everything in geometry is built from '
      + 'these positions, which is why it is worth being fussy about them once.',
    targetedMisconceptions: [`${PT}:MC-point-has-size`],
    source: eb(PT, 'Identity + Misconception register — the drawing is not the object'),
  },
  {
    conceptId: LN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A line is perfectly straight, has no thickness, and goes on forever in BOTH '
      + 'directions. The arrowheads you draw on each end are not decoration — they are the '
      + 'notation saying "this does not stop here".\n\n'
      + 'What you actually draw is a short thick smudge that ends at the edge of the paper. '
      + 'That is fine. It stands for the line the way a map stands for a country.\n\n'
      + 'One fact does the heavy lifting later: through any two points there is exactly ONE '
      + 'line. Not none, not several. That is why two points are enough to pin a line down, '
      + 'and why "the line through A and B" is an unambiguous thing to say.',
    targetedMisconceptions: [`${LN}:MC-line-is-finite`],
    source: eb(LN, 'Identity — infinite extent, and the two-point determination'),
  },
  {
    conceptId: SEG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A line segment is the part of a line between two points, including those two points. '
      + 'It stops. That is the whole difference from a line, and it is the reason a segment '
      + 'is the only one of the three that has a length.\n\n'
      + 'Its two ends are called endpoints, and the segment is named after them: the segment '
      + 'from A to B. Ask how long a line is and the question has no answer; ask how long '
      + 'segment AB is and it does.\n\n'
      + 'Almost everything you measure is really a segment — the side of a triangle, the '
      + 'radius of a circle, the edge of a box. Lines and rays are what you use to talk '
      + 'about direction and position; segments are what you use to talk about size.',
    targetedMisconceptions: [`${SEG}:MC-segment-vs-line`],
    source: eb(SEG, 'Identity — endpoints, and why only a segment has length'),
  },
  {
    conceptId: RAY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A ray starts somewhere and goes on forever in one direction. A torch beam is the '
      + 'usual picture: it has a definite beginning at the bulb and no end you can point to.\n\n'
      + 'The starting point is called the endpoint, and it matters which end it is. Ray AB '
      + 'starts at A and heads out through B. Ray BA starts at B and heads the other way. '
      + 'Those are different rays, even though they lie on the same line — so unlike a '
      + 'segment, the order of the letters is not optional.\n\n'
      + 'Rays are what angles are made of. Two rays sharing an endpoint form an angle, and '
      + 'the shared point becomes its vertex.',
    targetedMisconceptions: [`${RAY}:MC-ray-order-irrelevant`],
    source: eb(RAY, 'Identity + Misconception register — naming order carries direction'),
  },
  {
    conceptId: PL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A plane is a perfectly flat surface with no thickness, going on forever in every '
      + 'direction. A tabletop is the everyday picture, but a tabletop has edges and a '
      + 'few millimetres of wood; a plane has neither.\n\n'
      + 'The useful fact is how one gets pinned down: three points that are not all on the '
      + 'same line determine exactly one plane. That is why a three-legged stool never '
      + 'wobbles and a four-legged one might — three feet always land on a single plane, a '
      + 'fourth has to be lucky.\n\n'
      + 'Most of the geometry ahead of you happens inside one plane. Saying so out loud '
      + 'matters, because several familiar facts quietly stop being true otherwise — two '
      + 'lines that never meet must be parallel in a plane, but in space they can simply '
      + 'pass by each other.',
    targetedMisconceptions: [`${PL}:MC-plane-is-bounded`],
    source: eb(PL, 'Identity — three non-collinear points, and why "in a plane" is stated'),
  },
  {
    conceptId: ATYPE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Angles get names by size, and the right angle is the reference every other name is '
      + 'measured against.\n\n'
      + 'A right angle is exactly 90° — the corner of this page. Less than that is acute; '
      + 'more than 90° but less than a straight line is obtuse; exactly 180° is straight, '
      + 'the two arms pointing opposite ways; and beyond 180° is reflex, the big angle on '
      + 'the outside.\n\n'
      + 'Two things trip people up. Size is about the OPENING between the arms, not how long '
      + 'they are drawn — a 40° angle with short arms is bigger than a 30° one with long '
      + 'arms. And every pair of arms makes two angles, the one inside and the reflex one '
      + 'outside; which you mean has to be clear from the marking.',
    targetedMisconceptions: [`${ATYPE}:MC-arm-length-is-size`],
    source: eb(ATYPE, 'Identity + Misconception register — classification by opening, not by drawing'),
  },
  {
    conceptId: AMEAS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Measuring an angle means measuring turn, not distance. Put the protractor\'s centre '
      + 'exactly on the vertex, lay its zero line along one arm, and read where the other '
      + 'arm crosses the scale.\n\n'
      + 'A full turn is 360°, which is why a right angle is 90° — a quarter of the way '
      + 'round. That number is a historical choice, not a law of nature; 360 was picked '
      + 'because it divides so neatly.\n\n'
      + 'The classic mistake is the protractor\'s two scales. Both run 0 to 180, in opposite '
      + 'directions, so every reading has two candidates — 60 and 120, say. Decide first '
      + 'whether the angle is acute or obtuse by LOOKING at it, then pick the reading that '
      + 'agrees. The eye settles it; the scale only refines it.',
    targetedMisconceptions: [`${AMEAS}:MC-wrong-protractor-scale`],
    source: eb(AMEAS, 'Identity + Misconception register — the two-scale protractor error'),
  },
  {
    conceptId: PERP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Two lines are perpendicular when they meet at a right angle. The corner of a room, '
      + 'the cross of a window frame, the axes on a graph — all perpendicular.\n\n'
      + 'Meeting at 90° once means meeting at 90° all round: the four angles at the '
      + 'crossing are all right angles, so you only ever have to check one. We write it '
      + 'AB ⊥ CD, and mark it on a diagram with a small square rather than an arc.\n\n'
      + 'Perpendicular is about ANGLE, not about looking upright. A line drawn at a slant '
      + 'across the page can be perpendicular to another slanted line, and two lines can '
      + 'both look vertical without being perpendicular to anything. Later this becomes the '
      + 'shortest-distance idea: the closest a point ever gets to a line is along the '
      + 'perpendicular.',
    targetedMisconceptions: [`${PERP}:MC-perpendicular-means-upright`],
    source: eb(PERP, 'Identity + Misconception register — perpendicularity is orientation-free'),
  },
]

export const MATHEMATICS_GEOMETRY_PROBES: SeedProbe[] = [
  // ── point ─────────────────────────────────────────────────────────────────
  {
    conceptId: PT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does a mathematical point have?',
    choices: [
      { text: 'A position, and nothing else — no width, no height', isCorrect: true },
      { text: 'A very small width and height', isCorrect: false, misconceptionId: `${PT}:MC-point-has-size` },
    ],
    targetedMisconceptions: [`${PT}:MC-point-has-size`],
    source: eb(PT, 'Assessment gate — a point has no size at all'),
  },
  {
    conceptId: PT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The dot you draw with a pencil clearly has width. Does that contradict the definition of a point?',
    choices: [
      { text: 'No — the dot is a picture of the point, drawn big enough to see', isCorrect: true },
      { text: 'Yes — so points really do have a small size', isCorrect: false, misconceptionId: `${PT}:MC-point-has-size` },
    ],
    targetedMisconceptions: [`${PT}:MC-point-has-size`],
    source: eb(PT, 'Assessment gate — the drawing represents, it does not equal'),
  },
  {
    conceptId: PT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is it useful that the crossing of two lines has no size?',
    choices: [
      { text: 'Because a region with size would leave it unclear which part is really the meeting', isCorrect: true },
      { text: 'It is not useful; it is just a convention', isCorrect: false, misconceptionId: `${PT}:MC-arbitrary-convention` },
    ],
    targetedMisconceptions: [`${PT}:MC-arbitrary-convention`],
    source: eb(PT, 'Assessment gate — why sizelessness earns its keep'),
  },

  // ── line ──────────────────────────────────────────────────────────────────
  {
    conceptId: LN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What do the arrowheads on a drawn line mean?',
    choices: [
      { text: 'It carries on forever in both directions', isCorrect: true },
      { text: 'It points from one end to the other', isCorrect: false, misconceptionId: `${LN}:MC-arrows-as-direction` },
    ],
    targetedMisconceptions: [`${LN}:MC-arrows-as-direction`],
    source: eb(LN, 'Assessment gate — arrowheads are notation for infinite extent'),
  },
  {
    conceptId: LN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How long is a line?',
    choices: [
      { text: 'It has no length — it never ends, so the question has no answer', isCorrect: true },
      { text: 'As long as it is drawn on the page', isCorrect: false, misconceptionId: `${LN}:MC-line-is-finite` },
    ],
    targetedMisconceptions: [`${LN}:MC-line-is-finite`],
    source: eb(LN, 'Assessment gate — only a segment has a length'),
  },
  {
    conceptId: LN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many different lines pass through two given points?',
    choices: [
      { text: 'Exactly one', isCorrect: true },
      { text: 'Infinitely many', isCorrect: false, misconceptionId: `${LN}:MC-many-lines-two-points` },
      { text: 'Two — one each way', isCorrect: false, misconceptionId: `${LN}:MC-arrows-as-direction` },
    ],
    targetedMisconceptions: [`${LN}:MC-many-lines-two-points`],
    source: eb(LN, 'Assessment gate — two points determine a unique line'),
  },

  // ── line-segment ──────────────────────────────────────────────────────────
  {
    conceptId: SEG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these has a measurable length?',
    choices: [
      { text: 'A line segment', isCorrect: true },
      { text: 'A line', isCorrect: false, misconceptionId: `${SEG}:MC-segment-vs-line` },
      { text: 'A ray', isCorrect: false, misconceptionId: `${SEG}:MC-ray-has-length` },
    ],
    targetedMisconceptions: [`${SEG}:MC-segment-vs-line`],
    source: eb(SEG, 'Assessment gate — only the bounded object has a length'),
  },
  {
    conceptId: SEG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does segment AB include the points A and B themselves?',
    choices: [
      { text: 'Yes — the endpoints are part of the segment', isCorrect: true },
      { text: 'No — it is only the part strictly between them', isCorrect: false, misconceptionId: `${SEG}:MC-endpoints-excluded` },
    ],
    targetedMisconceptions: [`${SEG}:MC-endpoints-excluded`],
    source: eb(SEG, 'Assessment gate — endpoints belong to the segment'),
  },
  {
    conceptId: SEG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The side of a triangle — line, ray, or segment?',
    choices: [
      { text: 'A segment — it runs between two corners and stops', isCorrect: true },
      { text: 'A line', isCorrect: false, misconceptionId: `${SEG}:MC-segment-vs-line` },
    ],
    targetedMisconceptions: [`${SEG}:MC-segment-vs-line`],
    source: eb(SEG, 'Assessment gate — recognising segments in familiar figures'),
  },

  // ── ray ───────────────────────────────────────────────────────────────────
  {
    conceptId: RAY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many endpoints does a ray have?',
    choices: [
      { text: 'One — it starts somewhere and never ends', isCorrect: true },
      { text: 'Two', isCorrect: false, misconceptionId: `${RAY}:MC-ray-as-segment` },
      { text: 'None', isCorrect: false, misconceptionId: `${RAY}:MC-ray-as-line` },
    ],
    targetedMisconceptions: [`${RAY}:MC-ray-as-segment`],
    source: eb(RAY, 'Assessment gate — one endpoint distinguishes a ray'),
  },
  {
    conceptId: RAY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are ray AB and ray BA the same ray?',
    choices: [
      { text: 'No — they start at different points and head opposite ways', isCorrect: true },
      { text: 'Yes — they lie on the same line', isCorrect: false, misconceptionId: `${RAY}:MC-ray-order-irrelevant` },
    ],
    targetedMisconceptions: [`${RAY}:MC-ray-order-irrelevant`],
    source: eb(RAY, 'Assessment gate — the first letter names the endpoint'),
  },
  {
    conceptId: RAY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What are the two arms of an angle?',
    choices: [
      { text: 'Two rays sharing an endpoint, which becomes the vertex', isCorrect: true },
      { text: 'Two lines that cross', isCorrect: false, misconceptionId: `${RAY}:MC-angle-from-lines` },
    ],
    targetedMisconceptions: [`${RAY}:MC-angle-from-lines`],
    source: eb(RAY, 'Assessment gate — angles are built from rays'),
  },

  // ── plane ─────────────────────────────────────────────────────────────────
  {
    conceptId: PL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many points, not all on one line, are needed to fix a single plane?',
    choices: [
      { text: 'Three', isCorrect: true },
      { text: 'Two', isCorrect: false, misconceptionId: `${PL}:MC-two-points-determine` },
      { text: 'Four', isCorrect: false, misconceptionId: `${PL}:MC-four-points-determine` },
    ],
    targetedMisconceptions: [`${PL}:MC-two-points-determine`],
    source: eb(PL, 'Assessment gate — three non-collinear points determine a plane'),
  },
  {
    conceptId: PL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a plane have edges, like a tabletop does?',
    choices: [
      { text: 'No — it carries on forever in every direction', isCorrect: true },
      { text: 'Yes — it is a flat shape with a boundary', isCorrect: false, misconceptionId: `${PL}:MC-plane-is-bounded` },
    ],
    targetedMisconceptions: [`${PL}:MC-plane-is-bounded`],
    source: eb(PL, 'Assessment gate — the tabletop picture and where it fails'),
  },
  {
    conceptId: PL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does a three-legged stool never wobble, while a four-legged one might?',
    choices: [
      { text: 'Three feet always lie on one plane; a fourth has to happen to reach it', isCorrect: true },
      { text: 'Because three legs are stronger', isCorrect: false, misconceptionId: `${PL}:MC-non-geometric-reason` },
    ],
    targetedMisconceptions: [`${PL}:MC-non-geometric-reason`],
    source: eb(PL, 'Assessment gate — the determination fact in a physical setting'),
  },

  // ── angle-types ───────────────────────────────────────────────────────────
  {
    conceptId: ATYPE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'An angle measures 115°. What type is it?',
    choices: [
      { text: 'Obtuse — more than 90° but less than 180°', isCorrect: true },
      { text: 'Acute', isCorrect: false, misconceptionId: `${ATYPE}:MC-acute-obtuse-swap` },
      { text: 'Reflex', isCorrect: false, misconceptionId: `${ATYPE}:MC-reflex-threshold` },
    ],
    targetedMisconceptions: [`${ATYPE}:MC-acute-obtuse-swap`],
    source: eb(ATYPE, 'Assessment gate — classifying against the 90° and 180° marks'),
  },
  {
    conceptId: ATYPE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Angle A is 40° drawn with long arms. Angle B is 70° drawn with short arms. Which is bigger?',
    choices: [
      { text: 'B — size is the opening between the arms, not how long they are drawn', isCorrect: true },
      { text: 'A, because its arms are longer', isCorrect: false, misconceptionId: `${ATYPE}:MC-arm-length-is-size` },
    ],
    targetedMisconceptions: [`${ATYPE}:MC-arm-length-is-size`],
    source: eb(ATYPE, 'Assessment gate — arm length is irrelevant to angle size'),
  },
  {
    conceptId: ATYPE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two arms point in exactly opposite directions. What angle do they make?',
    choices: [
      { text: '180° — a straight angle', isCorrect: true },
      { text: '0°, because they are on the same line', isCorrect: false, misconceptionId: `${ATYPE}:MC-straight-is-zero` },
      { text: '360°', isCorrect: false, misconceptionId: `${ATYPE}:MC-full-turn` },
    ],
    targetedMisconceptions: [`${ATYPE}:MC-straight-is-zero`],
    source: eb(ATYPE, 'Assessment gate — the straight angle'),
  },

  // ── angle-measurement ─────────────────────────────────────────────────────
  {
    conceptId: AMEAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Where does the centre of the protractor go?',
    choices: [
      { text: 'Exactly on the vertex, where the two arms meet', isCorrect: true },
      { text: 'At the end of one of the arms', isCorrect: false, misconceptionId: `${AMEAS}:MC-centre-misplaced` },
    ],
    targetedMisconceptions: [`${AMEAS}:MC-centre-misplaced`],
    source: eb(AMEAS, 'Assessment gate — placing the protractor'),
  },
  {
    conceptId: AMEAS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'An angle clearly looks acute, and the protractor arm sits between the readings 60 and 120. Which is correct?',
    choices: [
      { text: '60 — decide acute or obtuse by looking first, then pick the reading that agrees', isCorrect: true },
      { text: '120 — always read the outer scale', isCorrect: false, misconceptionId: `${AMEAS}:MC-wrong-protractor-scale` },
    ],
    targetedMisconceptions: [`${AMEAS}:MC-wrong-protractor-scale`],
    source: eb(AMEAS, 'Assessment gate — resolving the two-scale ambiguity by eye'),
  },
  {
    conceptId: AMEAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A full turn is 360°. What is a quarter turn?',
    choices: [
      { text: '90° — a right angle', isCorrect: true },
      { text: '45°', isCorrect: false, misconceptionId: `${AMEAS}:MC-fraction-of-turn` },
    ],
    targetedMisconceptions: [`${AMEAS}:MC-fraction-of-turn`],
    source: eb(AMEAS, 'Assessment gate — degrees as fractions of a full turn'),
  },

  // ── perpendicular-lines ───────────────────────────────────────────────────
  {
    conceptId: PERP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two lines are perpendicular. What angle do they meet at?',
    choices: [
      { text: '90°', isCorrect: true },
      { text: '180°', isCorrect: false, misconceptionId: `${PERP}:MC-perpendicular-is-straight` },
    ],
    targetedMisconceptions: [`${PERP}:MC-perpendicular-is-straight`],
    source: eb(PERP, 'Assessment gate — perpendicular means a right angle'),
  },
  {
    conceptId: PERP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two slanted lines cross at 90°, neither of them upright on the page. Are they perpendicular?',
    choices: [
      { text: 'Yes — perpendicular is about the angle, not about how the page is turned', isCorrect: true },
      { text: 'No — one of them has to be vertical', isCorrect: false, misconceptionId: `${PERP}:MC-perpendicular-means-upright` },
    ],
    targetedMisconceptions: [`${PERP}:MC-perpendicular-means-upright`],
    source: eb(PERP, 'Assessment gate — perpendicularity is orientation-free'),
  },
  {
    conceptId: PERP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two perpendicular lines cross. You check one angle and it is 90°. What about the other three?',
    choices: [
      { text: 'All 90° too — one right angle at a crossing forces the rest', isCorrect: true },
      { text: 'Each must be measured separately', isCorrect: false, misconceptionId: `${PERP}:MC-check-all-four` },
    ],
    targetedMisconceptions: [`${PERP}:MC-check-all-four`],
    source: eb(PERP, 'Assessment gate — one right angle determines the crossing'),
  },
]

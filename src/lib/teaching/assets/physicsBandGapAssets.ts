/**
 * PHYSICS: the bands that could be TAUGHT but never QUIZZED.
 *
 * ── THE DEFECT, MEASURED 2026-08-25 ─────────────────────────────────────────
 * Physics was recorded as the subject that already MET the asset contract —
 * "745 closed-choice probes across 238 concepts, ~3.13 each", quoted in
 * `assetContract.ts` itself as the proof that the shortfall elsewhere was a
 * property of a seed template rather than of the subject.
 *
 * That number counts per CONCEPT. `scripts/assets/contract-audit.ts` counts per
 * (concept, gradeBand), which is the unit a learner actually meets, and the
 * picture changes completely:
 *
 *     261 taught pairs, 238 at contract, 23 short — 21 of them with ZERO
 *     gradeable probes at the band being taught.
 *
 * And they are not obscure corners. They are the first eleven concepts a
 * physics learner meets — units, scalars/vectors, velocity, acceleration,
 * force, all three of Newton's laws, momentum, impulse, power — at MIDDLE and
 * ADULT. Every probe for them is authored at HIGH.
 *
 * ── WHY THAT IS FATAL RATHER THAN MERELY UNTIDY ─────────────────────────────
 * `matcher.ts` scores a probe from a base of 50: +25 for an exact band, +10 at
 * one band's distance, against `DEFAULT_CONFIDENCE_THRESHOLD = 65`. An
 * adjacent band scores 60 and is REFUSED, not merely ranked lower. So a MIDDLE
 * learner is taught force and offered no gradeable question at all — the pool
 * is empty, not thin.
 *
 * The runtime then behaves correctly and the learner still loses:
 * `withholdUngradedGateQuestion` strips the model's prose question rather than
 * present something with no server answer key, so the turn teaches and asks
 * nothing. Mastery needs `correctAtCheck >= 1` and `correctAtPractice >= 2`,
 * which no unasked question can supply. This is the same defect
 * `mathematicsBandGapAssets.ts` closed for five mathematics pairs — read its
 * header for the full derivation; this file is that fix applied to the 23
 * physics pairs the cross-subject audit found.
 *
 * The bands are correct and are deliberately NOT removed. Teaching Newton's
 * First Law to a twelve-year-old and to a returning adult in different words
 * is the entire point of having bands; what was missing is the questions.
 *
 * ── HOW THESE WERE WRITTEN ──────────────────────────────────────────────────
 * Each set is written against the explanation ALREADY SERVING that exact band,
 * not against the concept in general — the MIDDLE probes for acceleration ask
 * about the "change-meter" the MIDDLE explanation builds, and the ADULT ones
 * about a = Δv/Δt as a rate of a rate, because a probe that tests something the
 * learner was never told is a trap rather than a check.
 *
 * Distractors carry the `misconceptionId` already ACTIVE for that concept, so a
 * wrong answer routes to the repair that exists. Where a concept's registry is
 * numbered (MC-1..MC-4) and this session could not verify which numbered row a
 * given error corresponds to, the distractor is left WITHOUT an id rather than
 * given a plausible-looking one: a misconception id that points at the wrong
 * repair is worse than none, and the corpus has already shipped that defect
 * once (a distractor tagged with a register entry that did not describe it).
 *
 * Every stem was checked against the probes already serving the concept at
 * other bands so none repeats a question the learner may meet later.
 *
 * Seeded as DRAFT by `scripts/brain/seed-knowledge-assets.ts --draft`. Nothing
 * here reaches a learner until a human promotes it through
 * `/api/admin/knowledge-assets`.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'physics'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what} (band-gap set, cross-subject contract audit 2026-08-25)`

// ═══════════════════════════════════════════════════════════════════════════
// phys.meas.units @ MIDDLE — taught via "everyone's hands are a different size"
// ═══════════════════════════════════════════════════════════════════════════
const UNITS_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two people measure the same table. One says "four hands wide", the other says "1.2 metres". Which measurement can a carpenter anywhere in the world build from, and why?',
    choices: [
      { text: '1.2 metres — a metre is the same length for everyone, everywhere', isCorrect: true },
      { text: 'Four hands — it is measured on the actual table, so it is more direct' , isCorrect: false },
      { text: 'Either one, as long as the person measured carefully', isCorrect: false },
    ],
    correctValue: 'metres',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'the agreed-ruler purpose of a unit system; careful measurement with a personal ruler is still unusable'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Speed is measured in metres per second. Which base units is it built from?',
    choices: [
      { text: 'The metre (length) and the second (time)', isCorrect: true },
      { text: 'Only the metre — "per second" is just how you say it', isCorrect: false },
      { text: 'Speed is its own base unit, like the metre and the kilogram', isCorrect: false },
    ],
    correctValue: 'metre and second',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'derived units are algebra on the seven bases — the MIDDLE explanation\'s "every word is built from letters"'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A student writes: "The base unit of mass is the gram, because the kilogram is a thousand grams and base units should be the small one." What is wrong with this?',
    choices: [
      { text: 'The base unit really is the kilogram, prefix and all — it was fixed that way historically and never changed', isCorrect: true },
      { text: 'Nothing is wrong — the gram is the base and the kilogram is derived', isCorrect: false, misconceptionId: 'phys.meas.units:MC-4' },
      { text: 'Mass has no base unit; it is derived from length and time', isCorrect: false },
    ],
    correctValue: 'kilogram',
    targetedMisconceptions: ['phys.meas.units:MC-4'],
    source: src('phys.meas.units', 'MC-4 the kilogram historical anomaly, named in the ADULT explanation and checked here at MIDDLE'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.meas.units @ ADULT — taught as "smallest set from which everything builds"
// ═══════════════════════════════════════════════════════════════════════════
const UNITS_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is kelvin, rather than degrees Celsius, the SI base unit of temperature?',
    choices: [
      { text: 'Its zero is absolute — the point where thermal motion stops — so ratios and products behave correctly in equations', isCorrect: true },
      { text: 'It is simply the older of the two scales, so it was adopted first', isCorrect: false },
      { text: 'Because its degrees are finer, giving more precise measurements', isCorrect: false, misconceptionId: 'phys.meas.units:MC-1' },
    ],
    correctValue: 'absolute zero',
    targetedMisconceptions: ['phys.meas.units:MC-1'],
    source: src('phys.meas.units', 'MC-1 absolute zero — a kelvin and a Celsius degree are the SAME size, so "finer" is exactly the wrong reason'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Force has SI units kg·m·s⁻². Reading that dimensionally, what does it tell you force IS?',
    choices: [
      { text: 'Mass multiplied by an acceleration — the units are the definition, written out', isCorrect: true },
      { text: 'A base quantity in its own right that happens to be written in other units', isCorrect: false },
      { text: 'Mass divided by a time, since seconds appear underneath', isCorrect: false },
    ],
    correctValue: 'mass times acceleration',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'the ADULT explanation\'s claim that everything else is algebra on the seven bases, checked in the reverse direction'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A colleague proposes adding "speed" to the list of SI base quantities, alongside length and time. What is the objection?',
    choices: [
      { text: 'It would be redundant — speed is already fully determined by length and time, and the base set is meant to be the smallest sufficient one', isCorrect: true },
      { text: 'There is no objection; the number of base quantities is arbitrary', isCorrect: false },
      { text: 'Speed cannot be measured directly enough to serve as a base quantity', isCorrect: false },
    ],
    correctValue: 'redundant',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'the engineering question the ADULT explanation opens with: the SMALLEST set from which everything can be built'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.meas.scalars-vectors @ MIDDLE — taught via the "which way?" test
// ═══════════════════════════════════════════════════════════════════════════
const SV_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.meas.scalars-vectors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Apply the "which way?" test: for which of these does asking "in which direction?" actually make sense?',
    choices: [
      { text: 'The push you give a door', isCorrect: true },
      { text: 'The mass of a bag of rice', isCorrect: false, misconceptionId: 'phys.meas.scalars-vectors:MC-4' },
      { text: 'The temperature of a cup of tea', isCorrect: false, misconceptionId: 'phys.meas.scalars-vectors:MC-4' },
    ],
    correctValue: 'the push',
    targetedMisconceptions: ['phys.meas.scalars-vectors:MC-4'],
    source: src('phys.meas.scalars-vectors', 'MC-4 all-quantities-are-numbers, tested with the MIDDLE explanation\'s own which-way instrument'),
  },
  {
    conceptId: 'phys.meas.scalars-vectors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You walk 500 metres north. Someone else walks 500 metres south. Both walked the same distance. Did both have the same displacement?',
    choices: [
      { text: 'No — the sizes match but the directions are opposite, and displacement includes direction', isCorrect: true },
      { text: 'Yes — both numbers are 500, so the quantities are equal', isCorrect: false, misconceptionId: 'phys.meas.scalars-vectors:MC-4' },
      { text: 'No, because walking south always counts as a smaller displacement', isCorrect: false },
    ],
    correctValue: 'no — opposite directions',
    targetedMisconceptions: ['phys.meas.scalars-vectors:MC-4'],
    source: src('phys.meas.scalars-vectors', 'two vectors of equal magnitude are different vectors — the half of "size AND direction" that gets dropped'),
  },
  {
    conceptId: 'phys.meas.scalars-vectors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Sort these three into scalars and vectors: time taken, force applied, velocity.',
    choices: [
      { text: 'Scalar: time taken. Vectors: force applied, velocity', isCorrect: true },
      { text: 'Scalars: time taken, force applied. Vector: velocity', isCorrect: false },
      { text: 'Scalars: time taken, velocity. Vector: force applied', isCorrect: false },
    ],
    correctValue: 'time scalar; force and velocity vectors',
    targetedMisconceptions: [],
    source: src('phys.meas.scalars-vectors', 'the MIDDLE explanation names displacement, velocity and force as its three vector examples'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.velocity @ MIDDLE — taught via the walk-to-the-wall round trip
// ═══════════════════════════════════════════════════════════════════════════
const VEL_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You walk 10 m to a tree and 10 m back, taking 20 seconds in total. What is your average velocity for the whole trip?',
    choices: [
      { text: '0 m/s — you finished where you started, so the net change of position is zero', isCorrect: true },
      { text: '1 m/s — 20 metres covered in 20 seconds', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: '0.5 m/s — 10 metres each way in 20 seconds', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
    ],
    correctValue: '0 m/s',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'MC-SPEED-IS-VELOCITY; both distractors compute a SPEED, which is what the misconception does'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'On the same there-and-back walk (20 m of ground covered in 20 s), what was your average SPEED?',
    choices: [
      { text: '1 m/s — speed uses the total ground covered, which was 20 m', isCorrect: true },
      { text: '0 m/s — the same as the velocity', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: '2 m/s', isCorrect: false },
    ],
    correctValue: '1 m/s',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'the same trip asked the OTHER way — a learner who has separated the two questions can answer both'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A car\'s speedometer reads a steady 50 km/h while the car drives once around a roundabout. Is the car\'s velocity staying the same?',
    choices: [
      { text: 'No — the direction keeps changing, and velocity includes direction', isCorrect: true },
      { text: 'Yes — the speedometer reading never changes, so the velocity does not either', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: 'Only if the driver brakes', isCorrect: false },
    ],
    correctValue: 'no — direction changes',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'MC-SPEED-IS-VELOCITY in its second form — constant speed with changing velocity'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.velocity @ ADULT — taught as "prediction needs a direction"
// ═══════════════════════════════════════════════════════════════════════════
const VEL_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Speed and velocity are defined with the same denominator. What exactly differs?',
    choices: [
      { text: 'The numerator: speed uses distance (every metre travelled), velocity uses displacement (the straight arrow from start to finish)', isCorrect: true },
      { text: 'The denominator: velocity divides by a shorter time', isCorrect: false },
      { text: 'Nothing formally — "velocity" is the technical word for the same quantity', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
    ],
    correctValue: 'the numerator',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'the ADULT explanation\'s central claim, checked directly'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A driver completes one full lap of a 4 km circuit in 2 minutes. Average speed and average velocity for the lap?',
    choices: [
      { text: 'Speed 120 km/h; velocity zero — the lap ends where it began', isCorrect: true },
      { text: 'Both 120 km/h', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: 'Both zero, since the car returned to the start', isCorrect: false },
    ],
    correctValue: 'speed 120 km/h, velocity 0',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    // 4 km in 2 min = 4 km in (1/30) h = 120 km/h. Re-derived, not recalled.
    source: src('phys.mech.velocity', 'the ADULT explanation\'s own full-lap case, with the speed made numerical so the answer is checkable'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Momentum, Newton\'s laws and orbital mechanics are all written in terms of velocity rather than speed. Why does the vector version earn its extra complexity?',
    choices: [
      { text: 'Because those laws predict WHERE something will be and how it will turn, and neither is determined by a bare number', isCorrect: true },
      { text: 'Because velocity is measured more accurately than speed', isCorrect: false },
      { text: 'Convention only — the same laws could be written with speed and would give the same predictions', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
    ],
    correctValue: 'prediction needs direction',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'the ADULT explanation\'s framing — why physics KEEPS two quantities'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.displacement @ MIDDLE — one mcq already exists here; +2 to reach 3
// ═══════════════════════════════════════════════════════════════════════════
const DISP_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.displacement', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You walk 8 m east, then 3 m west. What is your displacement from the start?',
    choices: [
      { text: '5 m east', isCorrect: true },
      { text: '11 m east', isCorrect: false, misconceptionId: 'phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE' },
      { text: '5 m west', isCorrect: false },
    ],
    correctValue: '5 m east',
    // 8 east then 3 west: +8 - 3 = +5 east. Distance would be 8 + 3 = 11.
    targetedMisconceptions: ['phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE'],
    source: src('phys.mech.displacement', 'MC-DISPLACEMENT-IS-DISTANCE; the 11 m distractor is exactly the distance, so a wrong answer names the error'),
  },
  {
    conceptId: 'phys.mech.displacement', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two friends travel from home to the same park. One cycles straight there along a 2 km road; the other wanders a winding 5 km route. Compare their displacements.',
    choices: [
      { text: 'Their displacements are identical — same start, same finish; only the distances differ', isCorrect: true },
      { text: 'The wanderer has the bigger displacement, because they covered more ground', isCorrect: false, misconceptionId: 'phys.mech.displacement:MC-DISPLACEMENT-IS-PATH' },
      { text: 'You cannot compare them without knowing how long each took', isCorrect: false },
    ],
    correctValue: 'identical displacements',
    targetedMisconceptions: ['phys.mech.displacement:MC-DISPLACEMENT-IS-PATH'],
    source: src('phys.mech.displacement', 'MC-DISPLACEMENT-IS-PATH; displacement is start-and-finish only, which the path length cannot change'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.acceleration @ MIDDLE — taught as the "change-meter"
// ═══════════════════════════════════════════════════════════════════════════
const ACC_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A racing car holds a rock-steady 200 km/h down a straight. A bicycle pulls away from a red light. Which one has the bigger acceleration?',
    choices: [
      { text: 'The bicycle — its velocity is changing, and the car\'s is not', isCorrect: true },
      { text: 'The racing car — it is going far faster', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ACCELERATION-IS-SPEED' },
      { text: 'Both the same, since both are moving forwards', isCorrect: false },
    ],
    correctValue: 'the bicycle',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ACCELERATION-IS-SPEED'],
    source: src('phys.mech.acceleration', 'MC-ACCELERATION-IS-SPEED, the MIDDLE explanation\'s own racing-car/bicycle conflict, asked back'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A bus is slowing down as it comes into a stop. What does the change-meter read?',
    choices: [
      { text: 'It reads something — slowing down IS a change of velocity, just a negative one', isCorrect: true },
      { text: 'Zero — braking is deceleration, which is a separate thing from acceleration', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-DECELERATION-SEPARATE' },
      { text: 'Zero, because the bus is about to stop', isCorrect: false },
    ],
    correctValue: 'negative acceleration',
    targetedMisconceptions: ['phys.mech.acceleration:MC-DECELERATION-SEPARATE'],
    source: src('phys.mech.acceleration', 'MC-DECELERATION-SEPARATE — braking as negative acceleration, stated in the MIDDLE explanation'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A car goes around a bend at a perfectly steady 30 km/h. Is it accelerating?',
    choices: [
      { text: 'Yes — its direction is changing, so its velocity is changing even though the number is not', isCorrect: true },
      { text: 'No — the speedometer needle never moves', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ACCELERATION-IS-SPEED' },
      { text: 'Only if the driver is also pressing the accelerator pedal', isCorrect: false },
    ],
    correctValue: 'yes',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ACCELERATION-IS-SPEED'],
    source: src('phys.mech.acceleration', 'the turning case, named in the MIDDLE explanation as the third thing that moves the change-meter'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.acceleration @ ADULT — taught as a = Δv/Δt, a rate of a rate
// ═══════════════════════════════════════════════════════════════════════════
const ACC_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A key is released from rest. At the exact instant of release, v = 0. What is its acceleration at that instant?',
    choices: [
      { text: '9.8 m/s² downward — a is the RATE v is changing, which does not depend on the value of v', isCorrect: true },
      { text: 'Zero — it is not moving yet, so nothing is accelerating', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION' },
      { text: 'Undefined, because you cannot divide by a zero velocity', isCorrect: false },
    ],
    correctValue: '9.8 m/s² downward',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION'],
    source: src('phys.mech.acceleration', 'MC-ZERO-VELOCITY-ZERO-ACCELERATION, the ADULT explanation\'s dropped-key case'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A train speeds up from 12 m/s to 30 m/s in 6 seconds. What is its average acceleration?',
    choices: [
      { text: '3 m/s²', isCorrect: true },
      { text: '5 m/s²', isCorrect: false },
      { text: '18 m/s²', isCorrect: false },
    ],
    correctValue: '3 m/s^2',
    // Δv = 30 − 12 = 18 m/s; Δt = 6 s; a = 18/6 = 3 m/s². The 5 distractor is
    // 30/6 (using final v instead of Δv); 18 is Δv with the division forgotten.
    targetedMisconceptions: ['phys.mech.acceleration:MC-ACCELERATION-IS-SPEED'],
    source: src('phys.mech.acceleration', 'a = Δv/Δt applied numerically; the 5 m/s² distractor is the MC-ACCELERATION-IS-SPEED slip of using v instead of Δv'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A satellite circles the Earth at constant orbital speed. Is it accelerating, and what does that imply about the net force on it?',
    choices: [
      { text: 'Yes — the velocity vector is continuously turning, so there must be a non-zero net force (gravity) toward the centre', isCorrect: true },
      { text: 'No — constant speed means zero acceleration, so the net force is zero', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ACCELERATION-IS-SPEED' },
      { text: 'Yes, but no force is needed once it is already in orbit', isCorrect: false },
    ],
    correctValue: 'yes — centripetal acceleration',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ACCELERATION-IS-SPEED'],
    source: src('phys.mech.acceleration', 'the ADULT explanation\'s second consequence — circular motion at constant speed IS accelerated motion'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.force @ MIDDLE — taught as "name both objects"
// ═══════════════════════════════════════════════════════════════════════════
const FORCE_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Apply the two-object test to "the Earth pulls the dropped apple down". Which two objects are interacting?',
    choices: [
      { text: 'The Earth and the apple', isCorrect: true },
      { text: 'The apple and the air only', isCorrect: false },
      { text: 'Just the apple — gravity is something the apple has', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-IS-IMPETUS' },
    ],
    correctValue: 'Earth and apple',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-IS-IMPETUS'],
    source: src('phys.mech.force', 'the MIDDLE explanation\'s test — a force an object HAS by itself is the impetus error'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A ball has just left a kicker\'s foot and is flying through the air. Someone says "the kick\'s force is still in the ball, pushing it along." Use the two-object test on that claim.',
    choices: [
      { text: 'It fails — the foot is no longer touching the ball, so there is no second object; the kick is over and what continues is the motion', isCorrect: true },
      { text: 'It passes — the foot and the ball are the two objects, and the force is stored inside', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-IS-IMPETUS' },
      { text: 'It passes — the ball and the air are the two objects providing the forward push', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-CAUSES-MOTION' },
    ],
    correctValue: 'fails — no second object',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-IS-IMPETUS', 'phys.mech.force:MC-FORCE-CAUSES-MOTION'],
    source: src('phys.mech.force', 'MC-FORCE-IS-IMPETUS via the foot-leaves-ball conflict evidence taught at this band'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A book lies still on a table. Which is true?',
    choices: [
      { text: 'Two forces act on it — the Earth pulling down and the table pushing up — and they cancel', isCorrect: true },
      { text: 'No forces act on it, because it is not moving', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-CAUSES-MOTION' },
      { text: 'Only gravity acts on it; the table does not push', isCorrect: false },
    ],
    correctValue: 'two forces cancelling',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-CAUSES-MOTION'],
    source: src('phys.mech.force', 'zero NET force is not zero forces — the MC-FORCE-CAUSES-MOTION reading of a stationary object'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.force @ ADULT — taught as vector / interaction / change
// ═══════════════════════════════════════════════════════════════════════════
const FORCE_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A crate slides across a floor at a perfectly constant velocity. What does that tell you about the forces on it?',
    choices: [
      { text: 'The NET force is zero — constant velocity requires no net force, though individual forces (push, friction) are certainly acting', isCorrect: true },
      { text: 'There must be a net forward force, otherwise it would stop', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-CAUSES-MOTION' },
      { text: 'No forces of any kind are acting on it', isCorrect: false },
    ],
    correctValue: 'zero net force',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-CAUSES-MOTION'],
    source: src('phys.mech.force', 'the ADULT explanation\'s third consequence — force is about CHANGE, not maintenance'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two forces of 10 N act on the same object, one to the left and one to the right. Are they the same force?',
    choices: [
      { text: 'No — force is a vector, so equal magnitudes in opposite directions are different forces; here they sum to zero', isCorrect: true },
      { text: 'Yes — both are 10 N, and magnitude is what defines a force', isCorrect: false },
      { text: 'Yes, and they therefore add to 20 N', isCorrect: false },
    ],
    correctValue: 'no — vectors',
    targetedMisconceptions: [],
    source: src('phys.mech.force', 'the ADULT explanation\'s first consequence, stated as its own worked case'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Can an object exert a net force on ITSELF — for example, can you lift yourself by pulling up on your own belt?',
    choices: [
      { text: 'No — a force is an interaction between two objects, so an internal pair acts on the same body and cancels', isCorrect: true },
      { text: 'Yes, if you pull hard enough — force is force regardless of what exerts it', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-IS-IMPETUS' },
      { text: 'Yes, but only briefly, until the stored force runs out', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-IS-IMPETUS' },
    ],
    correctValue: 'no',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-IS-IMPETUS'],
    source: src('phys.mech.force', 'the ADULT explanation\'s second consequence — no object can exert a force on itself'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-first-law @ MIDDLE — taught via friction as the hidden force
// ═══════════════════════════════════════════════════════════════════════════
const N1_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A puck slides much further on smooth ice than on concrete. What does that tell you about why things normally stop?',
    choices: [
      { text: 'They stop because friction acts on them — remove most of the friction and most of the stopping goes too', isCorrect: true },
      { text: 'They stop because the motion inside them runs out, and ice just holds more of it', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
      { text: 'They stop because a push is needed to keep anything moving, and ice needs less push', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
    ],
    correctValue: 'friction',
    targetedMisconceptions: ['phys.mech.newtons-first-law:MC-1'],
    source: src('phys.mech.newtons-first-law', 'MC-1 motion-needs-a-force; the MIDDLE explanation\'s own ice-vs-concrete evidence, asked back'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A satellite in empty space switches its engines OFF. What happens to it?',
    choices: [
      { text: 'It keeps moving at the same speed in a straight line — nothing is needed to keep it going', isCorrect: true },
      { text: 'It gradually slows down and stops, because nothing is pushing it any more', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
      { text: 'It stops immediately the moment the engines cut out', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
    ],
    correctValue: 'keeps going',
    targetedMisconceptions: ['phys.mech.newtons-first-law:MC-1'],
    source: src('phys.mech.newtons-first-law', 'MC-1; the engines-off satellite is the MIDDLE explanation\'s clinching case'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Complete the sentence the way Newton\'s First Law does: "A force is what ____ motion."',
    choices: [
      { text: 'CHANGES', isCorrect: true },
      { text: 'MAINTAINS', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
      { text: 'CONTAINS', isCorrect: false },
    ],
    correctValue: 'changes',
    targetedMisconceptions: ['phys.mech.newtons-first-law:MC-1'],
    source: src('phys.mech.newtons-first-law', 'the one-word reframe the MIDDLE explanation ends on: force changes motion, it does not maintain it'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-first-law @ ADULT — the returning-adult "it never felt true"
// ═══════════════════════════════════════════════════════════════════════════
const N1_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: '"Objects in motion stay in motion" never matches what you see on Earth: everything slows down. What is the missing piece that makes the law and the observation agree?',
    choices: [
      { text: 'Friction and air resistance are forces — once you count them, every slowdown is the law WORKING, not failing', isCorrect: true },
      { text: 'The law is an idealisation that simply does not apply on Earth', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
      { text: 'Objects carry a finite supply of motion that gradually runs out', isCorrect: false, misconceptionId: 'phys.mech.newtons-first-law:MC-1' },
    ],
    correctValue: 'friction and air are forces',
    targetedMisconceptions: ['phys.mech.newtons-first-law:MC-1'],
    source: src('phys.mech.newtons-first-law', 'MC-1; the returning-adult explanation\'s exact reconciliation, asked back'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The First Law covers two states as equally "unchanged". Which two?',
    choices: [
      { text: 'At rest, and moving at constant velocity in a straight line', isCorrect: true },
      { text: 'At rest, and slowing down steadily', isCorrect: false },
      { text: 'Moving forwards, and moving backwards', isCorrect: false },
    ],
    correctValue: 'rest and constant velocity',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-first-law', 'the law\'s two protected states — rest is not privileged over uniform motion'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A car takes a bend at a rigidly constant 60 km/h. Does the First Law say a net force is acting?',
    choices: [
      { text: 'Yes — "unchanged" means constant speed IN A STRAIGHT LINE, and the direction is changing, so something must be acting', isCorrect: true },
      { text: 'No — the speed is constant, so nothing has changed', isCorrect: false },
      { text: 'No — the First Law only concerns objects speeding up or slowing down', isCorrect: false },
    ],
    correctValue: 'yes',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-first-law', 'the straight-line clause, which is the half of the law most often dropped'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-second-law @ MIDDLE — taught via the shopping trolley
// ═══════════════════════════════════════════════════════════════════════════
const N2_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You push a loaded trolley exactly as hard as you pushed the empty one, and it barely creeps forward. Why?',
    choices: [
      { text: 'Its mass is bigger, and acceleration = net force ÷ mass, so the same push gives less acceleration', isCorrect: true },
      { text: 'Heavy things need more force just to hold their speed', isCorrect: false },
      { text: 'The push gets used up faster on a heavier trolley', isCorrect: false },
    ],
    correctValue: 'bigger mass',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'the MIDDLE explanation\'s trolley experience, turned into a check'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You keep the push the same but DOUBLE the mass of the trolley. What happens to its acceleration?',
    choices: [
      { text: 'It halves', isCorrect: true },
      { text: 'It doubles', isCorrect: false },
      { text: 'It stays the same, because the push has not changed', isCorrect: false },
    ],
    correctValue: 'halves',
    // a = F/m: doubling m with F fixed halves a. Stated in the MIDDLE text.
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'the inverse half of a = F/m, which the direct half often hides'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You push a box forward with 20 N while friction pushes back with 8 N. Which force decides how it accelerates?',
    choices: [
      { text: 'Neither on its own — the NET force, 12 N forward, is what the box responds to', isCorrect: true },
      { text: 'Your 20 N push, because that is the force being applied', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-SINGLE-FORCE' },
      { text: 'The 8 N friction, because it is the one resisting', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-SINGLE-FORCE' },
    ],
    correctValue: '12 N net',
    // 20 − 8 = 12 N forward.
    targetedMisconceptions: ['phys.mech.newtons-second-law:MC-SINGLE-FORCE'],
    source: src('phys.mech.newtons-second-law', 'MC-SINGLE-FORCE; "what you push minus what pushes back", from the MIDDLE explanation'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-second-law @ ADULT — ΣF = ma read in both directions
// ═══════════════════════════════════════════════════════════════════════════
const N2_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 1500 kg car and a 60 kg cyclist. The car experiences a 3000 N net force; the cyclist 300 N. Which accelerates harder?',
    choices: [
      { text: 'The cyclist — 5 m/s² against the car\'s 2 m/s²; only the RATIO decides', isCorrect: true },
      { text: 'The car — it has ten times the net force', isCorrect: false },
      { text: 'They are equal, since force and mass both scale up together', isCorrect: false },
    ],
    correctValue: 'the cyclist',
    // Car: 3000/1500 = 2 m/s². Cyclist: 300/60 = 5 m/s². Re-derived.
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'the ADULT explanation\'s boundary case — a large force on a large mass can accelerate LESS'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Set ΣF = 0 in the Second Law. What law do you recover, and what does it permit?',
    choices: [
      { text: 'The First Law — a = 0, meaning constant velocity, which includes uniform motion and not only rest', isCorrect: true },
      { text: 'Nothing meaningful; the equation is undefined when the net force vanishes', isCorrect: false },
      { text: 'The First Law, which requires the object to be at rest', isCorrect: false },
    ],
    correctValue: 'the First Law',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'the ADULT explanation\'s statement that the First Law is the ΣF = 0 special case'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The same object is taken to the Moon. Which quantity in ΣF = ma changes, and which does not?',
    choices: [
      { text: 'Its weight changes (gravity is weaker), its mass does not — m in ΣF = ma is unchanged', isCorrect: true },
      { text: 'Both change — mass and weight are the same quantity in different units', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT' },
      { text: 'Neither changes; only the acceleration due to gravity is different', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT' },
    ],
    correctValue: 'weight changes, mass does not',
    targetedMisconceptions: ['phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT'],
    source: src('phys.mech.newtons-second-law', 'MC-MASS-IS-WEIGHT, checked where it actually bites — the m in the law itself'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-third-law @ MIDDLE — the object-swap recipe
// ═══════════════════════════════════════════════════════════════════════════
const N3_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Use the swap recipe. The force is "the swimmer pushes the water backward." What is its partner?',
    choices: [
      { text: 'The water pushes the swimmer forward', isCorrect: true },
      { text: 'The swimmer pushes the water forward', isCorrect: false },
      { text: 'The swimmer pushes herself forward', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
    ],
    correctValue: 'water pushes swimmer forward',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR'],
    source: src('phys.mech.newtons-third-law', 'the MIDDLE explanation\'s A-pushes-B → B-pushes-A recipe, applied to its own swimmer case'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A lorry collides with a small car. Which one pushes harder during the collision?',
    choices: [
      { text: 'Neither — the two pushes are exactly equal in size and opposite in direction', isCorrect: true },
      { text: 'The lorry, because it is much heavier', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE' },
      { text: 'The car, because it is the one thrown backwards', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE' },
    ],
    correctValue: 'equal',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE'],
    source: src('phys.mech.newtons-third-law', 'MC-BIGGER-EXERTS-MORE; the different OUTCOMES come from different masses, not different forces'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You push a wall and feel pressure on your palm. Where does the wall\'s push act?',
    choices: [
      { text: 'On your hand — the partner force always acts on the OTHER object', isCorrect: true },
      { text: 'On the wall, cancelling out your push', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
      { text: 'Nowhere — walls do not push, they only resist', isCorrect: false },
    ],
    correctValue: 'on your hand',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR'],
    source: src('phys.mech.newtons-third-law', 'MC-SAME-OBJECT-PAIR at the point it is born — the wall case from the MIDDLE explanation'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-third-law @ ADULT — the two unlocking puzzles
// ═══════════════════════════════════════════════════════════════════════════
const N3_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If every force has an equal and opposite partner, why does anything ever accelerate instead of everything cancelling?',
    choices: [
      { text: 'The two forces act on DIFFERENT objects, and cancellation only happens between forces on the same body', isCorrect: true },
      { text: 'They do cancel, and motion comes from a separate non-paired force', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
      { text: 'The partner force is slightly smaller, leaving a surplus', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE' },
    ],
    correctValue: 'different objects',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR'],
    source: src('phys.mech.newtons-third-law', 'the ADULT explanation\'s first puzzle — the P75 boundary item on why pairs do not cancel'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A rocket accelerates in empty space with nothing to push against. What is it pushing on?',
    choices: [
      { text: 'Its own exhaust gas — the rocket pushes the gas backward, and the partner force (gas pushes rocket) drives it forward', isCorrect: true },
      { text: 'The residual air, which is thin but always present', isCorrect: false },
      { text: 'Nothing — rockets work by internal pressure alone, without a Third Law pair', isCorrect: false },
    ],
    correctValue: 'its exhaust gas',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-third-law', 'the ADULT explanation\'s second puzzle — the P76 rocket transfer item'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'In that lorry–car collision the forces are equal, yet the car is wrecked and the lorry is dented. Which law explains the different outcomes?',
    choices: [
      { text: 'The Second Law — equal forces on very different masses produce very different accelerations, a = F/m', isCorrect: true },
      { text: 'The Third Law, which makes the force on the smaller object larger', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE' },
      { text: 'Neither — the outcome depends only on how the vehicles are built', isCorrect: false },
    ],
    correctValue: 'the Second Law',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE'],
    source: src('phys.mech.newtons-third-law', 'separating equal FORCES from unequal EFFECTS — the reconciliation MC-BIGGER-EXERTS-MORE is missing'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.momentum @ MIDDLE — "how hard is this thing to stop?"
// ═══════════════════════════════════════════════════════════════════════════
const MOM_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A 1000 kg lorry rolls at 2 m/s. A 0.1 kg tennis ball flies at 50 m/s. Which has more momentum?',
    choices: [
      { text: 'The lorry — 2000 units against the ball\'s 5', isCorrect: true },
      { text: 'The tennis ball — it is going twenty-five times faster', isCorrect: false, misconceptionId: 'phys.mech.momentum:MC-MOMENTUM-IS-SPEED' },
      { text: 'They are equal, since one is heavy and the other is fast', isCorrect: false },
    ],
    correctValue: 'the lorry',
    // 1000 × 2 = 2000; 0.1 × 50 = 5. The MIDDLE explanation's own numbers.
    targetedMisconceptions: ['phys.mech.momentum:MC-MOMENTUM-IS-SPEED'],
    source: src('phys.mech.momentum', 'MC-MOMENTUM-IS-SPEED, using the lorry/tennis-ball conflict evidence taught at this band'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 4 kg skateboard rolls at 3 m/s. What is its momentum?',
    choices: [
      { text: '12 kg·m/s', isCorrect: true },
      { text: '7 kg·m/s', isCorrect: false },
      { text: '3 kg·m/s', isCorrect: false, misconceptionId: 'phys.mech.momentum:MC-MOMENTUM-IS-SPEED' },
    ],
    correctValue: '12',
    // p = mv = 4 × 3 = 12. The 7 distractor ADDS instead of multiplying; the
    // 3 distractor reports the velocity, which is the misconception itself.
    targetedMisconceptions: ['phys.mech.momentum:MC-MOMENTUM-IS-SPEED'],
    source: src('phys.mech.momentum', 'p = m × v applied once, with an additive slip and the speed-only answer as distractors'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two identical balls roll at the same speed, one east and one west. Do they have the same momentum?',
    choices: [
      { text: 'No — the sizes match but the directions are opposite, and momentum has a direction', isCorrect: true },
      { text: 'Yes — same mass, same speed, so same momentum', isCorrect: false, misconceptionId: 'phys.mech.momentum:MC-MOMENTUM-IS-SCALAR' },
      { text: 'You cannot say without knowing which one started first', isCorrect: false },
    ],
    correctValue: 'no — opposite directions',
    targetedMisconceptions: ['phys.mech.momentum:MC-MOMENTUM-IS-SCALAR'],
    source: src('phys.mech.momentum', 'MC-MOMENTUM-IS-SCALAR; the MIDDLE explanation ends on exactly this — stopping means pushing against the way it moves'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.momentum @ ADULT — the accounting currency of interactions
// ═══════════════════════════════════════════════════════════════════════════
const MOM_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does physics single out the product m × v rather than mass or velocity alone?',
    choices: [
      { text: 'Because it is the quantity interactions can only EXCHANGE — whatever one object gains, the other loses exactly', isCorrect: true },
      { text: 'Because it is the easiest combination to measure', isCorrect: false },
      { text: 'Because it equals the kinetic energy, which is already conserved', isCorrect: false },
    ],
    correctValue: 'it is exchanged, never created',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'the ADULT explanation\'s opening question, asked back'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Which law guarantees that the momentum one object gains in a collision is exactly what the other loses?',
    choices: [
      { text: 'The Third Law — equal and opposite forces acting over the same contact time', isCorrect: true },
      { text: 'The First Law — objects keep doing what they were doing', isCorrect: false },
      { text: 'Conservation of energy, since no energy is created either', isCorrect: false },
    ],
    correctValue: 'the Third Law',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'the mechanism the ADULT explanation gives for conservation, rather than conservation as an assertion'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 2 kg ball moving right at 3 m/s and a 2 kg ball moving left at 3 m/s collide head-on. What is the total momentum before the collision?',
    choices: [
      { text: 'Zero — the directions are opposite, so +6 and −6 cancel', isCorrect: true },
      { text: '12 kg·m/s — you add the two magnitudes', isCorrect: false, misconceptionId: 'phys.mech.momentum:MC-MOMENTUM-IS-SCALAR' },
      { text: '6 kg·m/s', isCorrect: false, misconceptionId: 'phys.mech.momentum:MC-MOMENTUM-IS-SCALAR' },
    ],
    correctValue: '0',
    // +2×3 = +6 and −2×3 = −6; the vector sum is 0. Adding magnitudes gives 12,
    // which is precisely what treating momentum as a scalar produces.
    targetedMisconceptions: ['phys.mech.momentum:MC-MOMENTUM-IS-SCALAR'],
    source: src('phys.mech.momentum', 'MC-MOMENTUM-IS-SCALAR; "add the m×v of everything before, WITH directions" made numerical'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.impulse @ MIDDLE — the airbag
// ═══════════════════════════════════════════════════════════════════════════
const IMP_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.impulse', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'An airbag and a bare steering wheel bring a passenger to the same stop — the same change of momentum. How does the airbag help?',
    choices: [
      { text: 'It stretches the collision over a longer time, and since the impulse is fixed, a longer time means a smaller peak force', isCorrect: true },
      { text: 'It reduces the total change of momentum the passenger goes through', isCorrect: false },
      { text: 'It absorbs the force, so no force reaches the passenger at all', isCorrect: false, misconceptionId: 'phys.mech.impulse:MC-IMPULSE-IS-FORCE' },
    ],
    correctValue: 'longer time, smaller force',
    targetedMisconceptions: ['phys.mech.impulse:MC-IMPULSE-IS-FORCE'],
    source: src('phys.mech.impulse', 'MC-IMPULSE-IS-FORCE via the airbag safety principle taught at this band'),
  },
  {
    conceptId: 'phys.mech.impulse', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why do you bend your knees when you land from a jump?',
    choices: [
      { text: 'Bending lengthens the time you take to stop, so the force on your legs is smaller for the same momentum change', isCorrect: true },
      { text: 'Bending reduces how much momentum you have on landing', isCorrect: false },
      { text: 'Bending makes you lighter at the moment of impact', isCorrect: false },
    ],
    correctValue: 'longer stopping time',
    targetedMisconceptions: ['phys.mech.impulse:MC-IMPULSE-IS-FORCE'],
    source: src('phys.mech.impulse', 'the same principle transferred to a second everyday case, as the explanation itself does'),
  },
  {
    conceptId: 'phys.mech.impulse', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In J = F × Δt, which quantity is fixed by how much the momentum has to change, and which two can trade against each other?',
    choices: [
      { text: 'J is fixed; F and Δt trade — make one bigger and the other gets smaller', isCorrect: true },
      { text: 'F is fixed; J and Δt trade', isCorrect: false, misconceptionId: 'phys.mech.impulse:MC-IMPULSE-IS-FORCE' },
      { text: 'All three are fixed once the collision starts', isCorrect: false },
    ],
    correctValue: 'J fixed; F and Δt trade',
    targetedMisconceptions: ['phys.mech.impulse:MC-IMPULSE-IS-FORCE'],
    source: src('phys.mech.impulse', 'MC-IMPULSE-IS-FORCE stated structurally — the trade is the whole content of the concept'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.power @ MIDDLE — torch vs floodlight
// ═══════════════════════════════════════════════════════════════════════════
const POW_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 2000 W kettle runs for 3 minutes; a 40 W bulb runs for 10 hours. Which uses more POWER, and which may use more total energy?',
    choices: [
      { text: 'The kettle uses far more power; the bulb, running so much longer, can use a comparable or greater total energy', isCorrect: true },
      { text: 'The kettle wins on both — more power always means more energy', isCorrect: false, misconceptionId: 'phys.mech.power:MC-POWER-IS-ENERGY' },
      { text: 'The bulb wins on both, since it is switched on for longer', isCorrect: false, misconceptionId: 'phys.mech.power:MC-POWER-IS-ENERGY' },
    ],
    correctValue: 'kettle more power; bulb comparable energy',
    targetedMisconceptions: ['phys.mech.power:MC-POWER-IS-ENERGY'],
    source: src('phys.mech.power', 'MC-POWER-IS-ENERGY; the kettle/bulb pair from the MIDDLE explanation, asked as a two-part comparison'),
  },
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A torch and a floodlight run off similar batteries. Which drains its battery faster, and why?',
    choices: [
      { text: 'The floodlight — it converts stored energy at a much higher RATE every second', isCorrect: true },
      { text: 'The torch — smaller batteries always drain faster', isCorrect: false },
      { text: 'Both at the same rate, since the batteries are similar', isCorrect: false, misconceptionId: 'phys.mech.power:MC-POWER-IS-ENERGY' },
    ],
    correctValue: 'the floodlight',
    targetedMisconceptions: ['phys.mech.power:MC-POWER-IS-ENERGY'],
    source: src('phys.mech.power', 'the MIDDLE explanation\'s torch/floodlight anchor, checked for the RATE reading'),
  },
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two lifts raise the same load through the same height. Lift A takes 10 s, lift B takes 20 s. Compare the ENERGY transferred and the POWER.',
    choices: [
      { text: 'Same energy; lift A has twice the power, because it does the same job in half the time', isCorrect: true },
      { text: 'Lift A transfers twice the energy, because it is the more powerful one', isCorrect: false, misconceptionId: 'phys.mech.power:MC-POWER-IS-ENERGY' },
      { text: 'Same energy and same power — the job is identical', isCorrect: false, misconceptionId: 'phys.mech.power:MC-POWER-IS-ENERGY' },
    ],
    correctValue: 'same energy, A has double the power',
    // Same load and height ⇒ same work. P = W/t, so halving t doubles P.
    targetedMisconceptions: ['phys.mech.power:MC-POWER-IS-ENERGY'],
    source: src('phys.mech.power', 'MC-POWER-IS-ENERGY isolated: energy held constant so only the rate can differ'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.kinematics-1d @ ADULT — three readings of one v–t graph
// ═══════════════════════════════════════════════════════════════════════════
const KIN_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.kinematics-1d', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'On a velocity–time graph under constant acceleration, what do the SLOPE and the AREA under the line represent?',
    choices: [
      { text: 'Slope is the acceleration; area is the displacement', isCorrect: true },
      { text: 'Slope is the velocity; area is the acceleration', isCorrect: false },
      { text: 'Slope is the displacement; area is the average velocity', isCorrect: false },
    ],
    correctValue: 'slope = a, area = s',
    targetedMisconceptions: [],
    source: src('phys.mech.kinematics-1d', 'the ADULT explanation\'s central picture — the two readings the equations come from'),
  },
  {
    conceptId: 'phys.mech.kinematics-1d', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A car\'s acceleration varies continuously through a journey. Can you use s = ut + ½at² over the whole trip?',
    choices: [
      { text: 'No — those equations read a straight v–t line; curve it and the slope-and-area formulas simply stop describing it', isCorrect: true },
      { text: 'Yes — they apply to any motion, with a taken as the average acceleration', isCorrect: false, misconceptionId: 'phys.mech.kinematics-1d:MC-APPLIES-ALWAYS' },
      { text: 'Yes — they are definitions, so they hold universally', isCorrect: false, misconceptionId: 'phys.mech.kinematics-1d:MC-APPLIES-ALWAYS' },
    ],
    correctValue: 'no — constant a only',
    targetedMisconceptions: ['phys.mech.kinematics-1d:MC-APPLIES-ALWAYS'],
    source: src('phys.mech.kinematics-1d', 'MC-APPLIES-ALWAYS; the ADULT explanation derives the restriction rather than asserting it'),
  },
  {
    conceptId: 'phys.mech.kinematics-1d', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A car accelerates uniformly from rest at 2 m/s² for 5 s. How far does it travel, and what is its final speed?',
    choices: [
      { text: '25 m, reaching 10 m/s', isCorrect: true },
      { text: '50 m, reaching 10 m/s', isCorrect: false },
      { text: '10 m, reaching 25 m/s', isCorrect: false },
    ],
    correctValue: '25 m and 10 m/s',
    // v = u + at = 0 + 2(5) = 10 m/s. s = ut + ½at² = 0 + ½(2)(25) = 25 m.
    // The 50 m distractor is v×t, i.e. the rectangle instead of the triangle —
    // exactly the area misreading the explanation warns about.
    targetedMisconceptions: ['phys.mech.kinematics-1d:MC-DISPLACEMENT-CONFUSION'],
    source: src('phys.mech.kinematics-1d', 'both equations applied once; the 50 m distractor is the rectangle-not-triangle area error'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.kinetic-energy @ ADULT — ½mv² derived from work
// ═══════════════════════════════════════════════════════════════════════════
const KE_ADULT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A car doubles its speed. By what factor does its kinetic energy change?',
    choices: [
      { text: 'It quadruples — v is squared in ½mv²', isCorrect: true },
      { text: 'It doubles — energy scales with speed', isCorrect: false, misconceptionId: 'phys.mech.kinetic-energy:MC-KE-LINEAR' },
      { text: 'It stays the same, since the mass has not changed', isCorrect: false },
    ],
    correctValue: 'quadruples',
    // ½m(2v)² = ½m·4v² = 4 × ½mv².
    targetedMisconceptions: ['phys.mech.kinetic-energy:MC-KE-LINEAR'],
    source: src('phys.mech.kinetic-energy', 'MC-KE-LINEAR, the error the square in the formula exists to prevent'),
  },
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'An object moves LEFTWARD at 5 m/s, which you write as v = −5 m/s. Is its kinetic energy negative?',
    choices: [
      { text: 'No — v is squared, so (−5)² = 25 gives the same positive energy as +5 m/s would', isCorrect: true },
      { text: 'Yes — a negative velocity gives a negative kinetic energy', isCorrect: false, misconceptionId: 'phys.mech.kinetic-energy:MC-KE-NEGATIVE' },
      { text: 'Yes, and that is how kinetic energy encodes direction', isCorrect: false, misconceptionId: 'phys.mech.kinetic-energy:MC-KE-NEGATIVE' },
    ],
    correctValue: 'no',
    targetedMisconceptions: ['phys.mech.kinetic-energy:MC-KE-NEGATIVE'],
    source: src('phys.mech.kinetic-energy', 'MC-KE-NEGATIVE; the ADULT explanation\'s point that v² kills the sign, unlike momentum'),
  },
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Where does the ½ in ½mv² come from?',
    choices: [
      { text: 'From the derivation: work Fd = (ma)d, with v² = 2ad giving ad = v²/2, so the accumulated work is exactly ½mv²', isCorrect: true },
      { text: 'It is a conversion constant chosen to make the SI units come out right', isCorrect: false },
      { text: 'From averaging the initial and final speeds of a moving object', isCorrect: false },
    ],
    correctValue: 'from the work derivation',
    targetedMisconceptions: [],
    source: src('phys.mech.kinetic-energy', 'the ADULT explanation opens with exactly this question; the answer is the derivation, not a convention'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.hookes-law @ MIDDLE — one mcq already exists here; +2 to reach 3
// ═══════════════════════════════════════════════════════════════════════════
const HOOKE_MIDDLE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.hookes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A spring stretches 4 cm when you hang a 2 N weight on it. How far will it stretch under 6 N, while Hooke\'s Law still holds?',
    choices: [
      { text: '12 cm', isCorrect: true },
      { text: '8 cm', isCorrect: false },
      { text: '6 cm', isCorrect: false },
    ],
    correctValue: '12 cm',
    // Direct proportionality: tripling F from 2 N to 6 N triples x, 4 → 12 cm.
    // 8 cm would be doubling; 6 cm reads the force off as a length.
    targetedMisconceptions: [],
    source: src('phys.mech.hookes-law', 'the direct proportionality the MIDDLE explanation demonstrates with hanging weights'),
  },
  {
    conceptId: 'phys.mech.hookes-law', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What does a LARGE spring constant k tell you about a spring?',
    choices: [
      { text: 'It is stiff — it fights back hard, so the same force produces a SMALLER extension (x = F/k)', isCorrect: true },
      { text: 'It is stretchy — a bigger k means a bigger extension for the same force', isCorrect: false, misconceptionId: 'phys.mech.hookes-law:MC-KBIG-MEANS-MORE-EXTENSION' },
      { text: 'It tells you the spring\'s natural length, not its stiffness', isCorrect: false },
    ],
    correctValue: 'stiff — smaller extension',
    targetedMisconceptions: ['phys.mech.hookes-law:MC-KBIG-MEANS-MORE-EXTENSION'],
    source: src('phys.mech.hookes-law', 'MC-KBIG-MEANS-MORE-EXTENSION; k sits in the denominator of x = F/k, which is where the intuition inverts'),
  },
]

/**
 * Every band-gap probe, in the order the audit reported the pairs. Exported as
 * one array because `seed-knowledge-assets.ts` and the contract tests both scan
 * for a `*_PROBES` export, and splitting them would only make a partial import
 * possible.
 */
export const PHYSICS_BAND_GAP_PROBES: SeedProbe[] = [
  ...UNITS_MIDDLE, ...UNITS_ADULT,
  ...SV_MIDDLE,
  ...VEL_MIDDLE, ...VEL_ADULT,
  ...DISP_MIDDLE,
  ...ACC_MIDDLE, ...ACC_ADULT,
  ...FORCE_MIDDLE, ...FORCE_ADULT,
  ...N1_MIDDLE, ...N1_ADULT,
  ...N2_MIDDLE, ...N2_ADULT,
  ...N3_MIDDLE, ...N3_ADULT,
  ...MOM_MIDDLE, ...MOM_ADULT,
  ...IMP_MIDDLE,
  ...POW_MIDDLE,
  ...KIN_ADULT,
  ...KE_ADULT,
  ...HOOKE_MIDDLE,
]

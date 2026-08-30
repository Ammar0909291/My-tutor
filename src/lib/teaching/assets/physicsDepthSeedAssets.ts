/**
 * PHYSICS: probe DEPTH — lifting (concept, band) pairs off the bare mastery
 * minimum.
 *
 * ── THE DEFECT, MEASURED AGAINST PRODUCTION 2026-08-30 ──────────────────────
 * `assetContract.ts` sets the floor at three closed-choice probes, and states
 * in its own header exactly what three buys: "the minimum that lets a PERFECT
 * learner finish", "deliberately NOT padded for a learner who answers
 * wrongly".
 *
 * Mastery needs `correctAtCheck >= 1` plus `correctAtPractice >= 2`, and the
 * gate never re-asks a probe it has spent (`excludeProbeStem`). So at exactly
 * three there is ZERO slack. One wrong answer and the pool can no longer
 * supply three more correct ones — the learner is now unable to certify that
 * concept however well they answer for the rest of the lesson. A learner who
 * needs remediation is precisely the learner the concept then refuses to
 * certify, which inverts what the gate is for.
 *
 * ── THE NUMBER, AND A CORRECTION TO THE ONE QUOTED FIRST ────────────────────
 * The worklist that opened this work counted rows in `asset_identity` and
 * reported 209 pairs at exactly three (physics 123). That count includes
 * probes a gate CANNOT grade — `short_answer` and `checkpoint` rows carry
 * fewer than two choices, and `contract-audit.ts`'s own `isGradeable` excludes
 * them, because correctness for free text has no deterministic source.
 *
 * Re-counted on the gradeable basis, joining `probe_assets` and requiring
 * `jsonb_array_length(choices) >= 2`:
 *
 *     physics    235 pairs at 3,  22 at 4,   3 at 5,  1 at 6
 *     chemistry   86 pairs at 3,  72 at 4,  27 at 5,  1 at 6
 *
 * So 257 physics pairs and 158 chemistry pairs sit below five, not 123 and 86.
 * The real shortfall is roughly twice what the row count implied. That is
 * recorded here rather than quietly absorbed, because the whole point of the
 * (concept, band) unit is that a total which looks healthy can hide a pool
 * that is empty where the learner actually stands.
 *
 * ── WHY THESE PAIRS FIRST ───────────────────────────────────────────────────
 * Physics at MIDDLE and ADULT: units, scalars/vectors, velocity, displacement,
 * acceleration, force, all three of Newton's laws, momentum, impulse, power,
 * kinematics, kinetic energy, Hooke's Law. They are the first concepts any
 * physics learner meets, and every one of them was at zero slack. These are
 * the same 21 pairs `physicsBandGapAssets.ts` rescued from having ZERO
 * gradeable probes; this file is the second half of that job — having a pool
 * at all, and having a pool that survives a wrong answer, are different
 * properties.
 *
 * ── HOW THE IDENTITIES WERE CHOSEN (this is not cosmetic) ───────────────────
 * `buildProbeSlugResolver` appends a difficulty segment ONLY to a
 * (conceptId, probeKind, gradeBand) slot holding more than one probe. So
 * adding a second probe to a slot that currently holds exactly one CHANGES
 * that slot's canonical identity, orphaning the row already seeded under the
 * old slug — the orphan stays ACTIVE, and the concept ends up serving the same
 * question under two identities. That inflates the count while REDUCING the
 * number of distinct questions, which is the opposite of this file's purpose.
 *
 * Every addition here therefore goes into a slot that is already a ladder
 * (two or more probes) or opens a brand-new slot. No existing singleton is
 * converted. `physicsDepthContract.test.ts` asserts this against the whole
 * corpus, so a later batch cannot break it by accident.
 *
 * ── DISTRACTORS ─────────────────────────────────────────────────────────────
 * Four options wherever the question supports four. A production probe rated
 * 4/10 by hand offered "Elastic — kinetic energy is conserved in every
 * collision" as its wrong option; that is a giveaway, not a distractor. Every
 * wrong option below is an error a physics learner actually makes — a dropped
 * sign, a swapped division, mass mistaken for weight, "it is momentarily at
 * rest so it is not accelerating", "the heavier one exerts more force".
 *
 * Stems are self-contained. A production probe asked for a drift velocity with
 * options in mm/s and no current, no wire and no carrier density anywhere in
 * the stem. Every number a question needs is in the question.
 *
 * `misconceptionId` is attached ONLY where a blueprint's own Misconception
 * Registry names that exact error (grep `^### MC-` in
 * `docs/curriculum/blueprints/{concept}.md`). Where no registry entry
 * describes it, the distractor carries NO id rather than a plausible-looking
 * one: an id pointing at the wrong repair is worse than none, and this corpus
 * has already shipped that defect once.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'physics'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what} (probe-depth set, gradeable-basis audit 2026-08-30)`

// ═══════════════════════════════════════════════════════════════════════════
// phys.meas.units — MIDDLE (mcq ladder F,D) and ADULT (mcq ladder P,A)
// ═══════════════════════════════════════════════════════════════════════════
const UNITS: SeedProbe[] = [
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A room is measured as 2500 millimetres across. What is that length in metres?',
    choices: [
      { text: '2.5 m', isCorrect: true },
      { text: '25 m — divide by 100', isCorrect: false },
      { text: '250 m — move the decimal point one place', isCorrect: false },
      { text: '2 500 000 m — multiply by 1000, because metres are bigger', isCorrect: false },
    ],
    correctValue: '2.5 m',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'prefix arithmetic: milli means a thousandth, so you divide by 1000; the direction of the conversion is the error, not the factor'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A student measures the width of a desk and writes the answer as "4.5". The teacher marks it wrong even though the number itself is right. Why?',
    choices: [
      { text: 'A measurement is a number AND a unit — 4.5 could be metres, feet or paces, so on its own it says nothing', isCorrect: true },
      { text: 'Measurements should always be rounded to a whole number', isCorrect: false },
      { text: '4.5 should have been written as the fraction 4 1/2', isCorrect: false },
      { text: 'A desk cannot be 4.5 of anything — the measurement must be a mistake', isCorrect: false },
    ],
    correctValue: 'a number without a unit is not a measurement',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'the agreed-ruler purpose of a unit system, asked in the direction where the unit is MISSING rather than disputed'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which of these is NOT one of the seven SI base units?',
    choices: [
      { text: 'The newton — it is derived, standing for kg·m·s⁻²', isCorrect: true },
      { text: 'The kilogram', isCorrect: false },
      { text: 'The second', isCorrect: false },
      { text: 'The ampere', isCorrect: false },
    ],
    correctValue: 'newton',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'base versus derived, tested by elimination — the newton is the derived unit learners most often assume is basic'),
  },
  {
    conceptId: 'phys.meas.units', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A component is labelled 4.7 µF (microfarads). Written in farads, what is that?',
    choices: [
      { text: '4.7 × 10⁻⁶ F', isCorrect: true },
      { text: '4.7 × 10⁻³ F — micro is the same as milli', isCorrect: false },
      { text: '4.7 × 10⁻⁹ F', isCorrect: false },
      { text: '4.7 × 10⁶ F', isCorrect: false },
    ],
    correctValue: '4.7e-6 F',
    targetedMisconceptions: [],
    source: src('phys.meas.units', 'SI prefixes are part of the unit system; milli/micro/nano confusion and prefix-sign inversion are the two errors that survive into adult work'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.meas.scalars-vectors @ MIDDLE — mcq ladder F,D,P; new misconception slot
// ═══════════════════════════════════════════════════════════════════════════
const SCALARS_VECTORS: SeedProbe[] = [
  {
    conceptId: 'phys.meas.scalars-vectors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A cockpit display shows four readings: air temperature 12 °C, fuel mass 4000 kg, wind 30 km/h from the west, altitude 9000 m. Which one is a vector?',
    choices: [
      { text: 'The wind, 30 km/h from the west — it carries a size and a direction', isCorrect: true },
      { text: 'The temperature — it can go up or down, so it has a direction', isCorrect: false },
      { text: 'The altitude — it is measured upwards from the ground', isCorrect: false },
      { text: 'The fuel mass — it points down, because it has weight', isCorrect: false },
    ],
    correctValue: 'the wind',
    targetedMisconceptions: [],
    source: src('phys.meas.scalars-vectors', 'the which-way test applied to a real instrument panel; "goes up or down" and "measured upwards" are the two false directions learners find in scalars'),
  },
  {
    conceptId: 'phys.meas.scalars-vectors', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A student says: "Speed is a scalar and velocity is a vector, so the velocity is always the bigger number." What is wrong with that?',
    choices: [
      { text: 'Nothing is added by being a vector — at any instant the size of the velocity IS the speed. The difference is that velocity also states a direction', isCorrect: true },
      { text: 'It is the other way round — the velocity is always the smaller number', isCorrect: false },
      { text: 'It is correct: a vector has two parts, so it counts for twice as much', isCorrect: false },
      { text: 'They can never be compared, because they are measured in different units', isCorrect: false },
    ],
    correctValue: 'same size, velocity adds direction',
    targetedMisconceptions: [],
    source: src('phys.meas.scalars-vectors', 'the vector-is-a-bigger-quantity error: direction is extra INFORMATION, not extra magnitude, and the units are identical'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.velocity — MIDDLE (mcq ladder F,D) and ADULT (mcq ladder P,A)
// ═══════════════════════════════════════════════════════════════════════════
const VELOCITY: SeedProbe[] = [
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A cyclist rides 20 km in the first hour, then rests for the whole second hour. What is the average speed over the two hours?',
    choices: [
      { text: '10 km/h — the resting hour is still part of the time', isCorrect: true },
      { text: '20 km/h — you were only moving for one hour, so that is the speed', isCorrect: false },
      { text: '40 km/h', isCorrect: false },
      { text: '0 km/h — the cyclist finished at rest', isCorrect: false },
    ],
    correctValue: '10 km/h',
    targetedMisconceptions: [],
    source: src('phys.mech.velocity', 'average speed divides by the TOTAL time, stopped time included; dropping the rest is the standard slip'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two runners start together and finish together at a point 100 m from the start. One ran straight there; the other zig-zagged and covered 130 m of ground. Compare their average speeds and their average velocities.',
    choices: [
      { text: 'Same average velocity — same displacement in the same time — but the zig-zagger had the greater average speed', isCorrect: true },
      { text: 'Everything is the same: they started and finished together', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: 'The zig-zagger had the greater average velocity, because velocity counts the whole route', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: 'The straight runner had the greater average speed, because a straight line is the fastest route', isCorrect: false },
    ],
    correctValue: 'same velocity, zig-zagger faster in speed',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'MC-SPEED-IS-VELOCITY: the one case where the two answers genuinely differ is when the path is longer than the displacement'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A drone flies 40 m due east in 8 s. State its average velocity.',
    choices: [
      { text: '5 m/s due east', isCorrect: true },
      { text: '5 m/s', isCorrect: false, misconceptionId: 'phys.mech.velocity:MC-SPEED-IS-VELOCITY' },
      { text: '320 m/s', isCorrect: false },
      { text: '0.2 m/s due east', isCorrect: false },
    ],
    correctValue: '5 m/s east',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'MC-SPEED-IS-VELOCITY tested on the ANSWER FORM: a velocity quoted without a direction is an incomplete answer, not merely an untidy one'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does INSTANTANEOUS velocity mean?',
    choices: [
      { text: 'The velocity at one particular moment — what a speedometer reading plus the direction of travel gives you', isCorrect: true },
      { text: 'Total distance divided by total time for the journey', isCorrect: false },
      { text: 'The fastest velocity reached at any point in the journey', isCorrect: false },
      { text: 'The velocity an object would have if nothing slowed it down', isCorrect: false },
    ],
    correctValue: 'velocity at one moment',
    targetedMisconceptions: [],
    source: src('phys.mech.velocity', 'instantaneous versus average, with the average-velocity definition offered as the distractor it usually is'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.displacement @ MIDDLE — mcq ladder F,D
// ═══════════════════════════════════════════════════════════════════════════
const DISPLACEMENT: SeedProbe[] = [
  {
    conceptId: 'phys.mech.displacement', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A runner completes exactly four laps of a 400 m track and stops on the line they started from. What is the distance travelled, and what is the displacement?',
    choices: [
      { text: 'Distance 1600 m, displacement 0 m', isCorrect: true },
      { text: 'Distance 1600 m, displacement 1600 m', isCorrect: false, misconceptionId: 'phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE' },
      { text: 'Distance 0 m, displacement 1600 m', isCorrect: false },
      { text: 'Distance 400 m, displacement 0 m', isCorrect: false },
    ],
    correctValue: '1600 m and 0 m',
    targetedMisconceptions: ['phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE'],
    source: src('phys.mech.displacement', 'MC-DISPLACEMENT-IS-DISTANCE at its cleanest: a closed loop makes the two answers maximally different'),
  },
  {
    conceptId: 'phys.mech.displacement', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Can a journey ever have a displacement LARGER than the distance travelled?',
    choices: [
      { text: 'No — the straight-line gap can at most equal the length of the path, and they are equal only when the path is a straight line with no doubling back', isCorrect: true },
      { text: 'Yes, if the object travels fast enough', isCorrect: false },
      { text: 'Yes, whenever the object changes direction', isCorrect: false, misconceptionId: 'phys.mech.displacement:MC-DISPLACEMENT-IS-PATH' },
      { text: 'They are always exactly equal, so neither can be larger', isCorrect: false, misconceptionId: 'phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE' },
    ],
    correctValue: 'no — displacement can never exceed distance',
    targetedMisconceptions: ['phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE', 'phys.mech.displacement:MC-DISPLACEMENT-IS-PATH'],
    source: src('phys.mech.displacement', 'the inequality itself — asked as a bound rather than a calculation, which is where the always-equal belief becomes visible'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.acceleration — MIDDLE (mcq ladder F,D) and ADULT (mcq ladder P,A)
// ═══════════════════════════════════════════════════════════════════════════
const ACCELERATION: SeedProbe[] = [
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A lift starts from rest, speeds up for 3 s, runs at a steady speed for 10 s, then slows to a stop over 2 s. During which part is its acceleration zero?',
    choices: [
      { text: 'The 10 s at steady speed — the velocity is not changing then', isCorrect: true },
      { text: 'The last 2 s — it is slowing down, so it is not accelerating', isCorrect: false },
      { text: 'None of it — the lift is moving the whole time, so it is always accelerating', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ACCELERATION-IS-SPEED' },
      { text: 'The first 3 s — it starts from rest, so it has no acceleration yet', isCorrect: false },
    ],
    correctValue: 'the steady-speed section',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ACCELERATION-IS-SPEED'],
    source: src('phys.mech.acceleration', 'MC-ACCELERATION-IS-SPEED, plus the slowing-down-is-not-acceleration error, put in the same question so they can be told apart'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A ball is thrown straight up. At the very top of its flight it is, for an instant, not moving at all. What is its acceleration at that instant?',
    choices: [
      { text: 'About 9.8 m/s² downwards — gravity is still acting, which is exactly why it does not stay up there', isCorrect: true },
      { text: 'Zero, because its speed is zero at that moment', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION' },
      { text: 'Zero, because it is changing from going up to going down', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION' },
      { text: 'Upwards, because it is still on the way up', isCorrect: false },
    ],
    correctValue: '9.8 m/s² downwards',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION'],
    source: src('phys.mech.acceleration', 'MC-ZERO-VELOCITY-ZERO-ACCELERATION at the top of flight — the instant where the belief is most persuasive and most wrong'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A cyclist slows steadily from 8 m/s to 2 m/s over 3 s. What is the acceleration?',
    choices: [
      { text: '−2 m/s² — the minus sign says the change opposes the motion', isCorrect: true },
      { text: '2 m/s² — acceleration is a size, so the sign can be dropped', isCorrect: false },
      { text: '−6 m/s² — the velocity fell by 6', isCorrect: false },
      { text: '−0.5 m/s² — 3 s divided by the 6 m/s change', isCorrect: false },
    ],
    correctValue: '-2 m/s^2',
    targetedMisconceptions: [],
    source: src('phys.mech.acceleration', 'a = Δv/Δt with a deceleration: the three wrong options are the dropped sign, the un-divided Δv, and the inverted fraction'),
  },
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Acceleration is defined as the rate of change of which quantity?',
    choices: [
      { text: 'Velocity — so a change of direction counts as an acceleration even at constant speed', isCorrect: true },
      { text: 'Speed', isCorrect: false, misconceptionId: 'phys.mech.acceleration:MC-ACCELERATION-IS-SPEED' },
      { text: 'Position', isCorrect: false },
      { text: 'Distance travelled', isCorrect: false },
    ],
    correctValue: 'velocity',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ACCELERATION-IS-SPEED'],
    source: src('phys.mech.acceleration', 'MC-ACCELERATION-IS-SPEED at the definition: rate of change of POSITION is velocity, which is why that option is tempting and wrong'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.force — MIDDLE (mcq ladder F,D) and ADULT (mcq ladder P,D)
// ═══════════════════════════════════════════════════════════════════════════
const FORCE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Three of these are forces and one is not. Which one is NOT a force?',
    choices: [
      { text: 'The speed of the trolley', isCorrect: true },
      { text: 'The friction the ground applies to a sliding box', isCorrect: false },
      { text: 'The weight of a bag of sand', isCorrect: false },
      { text: 'The pull of a rope on a sledge', isCorrect: false },
    ],
    correctValue: 'speed',
    targetedMisconceptions: [],
    source: src('phys.mech.force', 'sorting forces from other quantities; speed is the non-force learners most often add to a force list'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A bag of shopping is labelled "3 kilograms". Held in your hand, it pulls down with a force of about 30 newtons. What is the difference between the 3 kg and the 30 N?',
    choices: [
      { text: 'The 3 kg is how much matter the bag contains; the 30 N is the force gravity pulls it down with — a different quantity, in a different unit', isCorrect: true },
      { text: 'There is no real difference — kilograms and newtons are two names for the same thing', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT' },
      { text: 'They are the same measurement, just written on different scales, like centimetres and inches', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT' },
      { text: 'The 30 N is a mistake — the pull should also be 3, because the bag is 3 kg', isCorrect: false },
    ],
    correctValue: 'mass versus weight',
    targetedMisconceptions: ['phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT'],
    source: src('phys.mech.force', 'MC-MASS-IS-WEIGHT (registered on newtons-second-law, which is where the repair lives) reached from the force side, where the learner meets it first'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'One newton is defined as the force that does what?',
    choices: [
      { text: 'Gives a mass of 1 kg an acceleration of 1 m/s²', isCorrect: true },
      { text: 'Weighs exactly 1 kg at sea level', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT' },
      { text: 'Moves a 1 kg mass through a distance of 1 metre', isCorrect: false },
      { text: 'Holds a 1 kg mass still against gravity', isCorrect: false },
    ],
    correctValue: '1 kg at 1 m/s^2',
    targetedMisconceptions: ['phys.mech.newtons-second-law:MC-MASS-IS-WEIGHT'],
    source: src('phys.mech.force', 'the newton IS F = ma written as a definition; the work-done option (force × distance) is the other unit learners fold into it'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A box on a frictionless floor is pulled by two forces at once: 20 N due east and 8 N due north. What is the resultant force?',
    choices: [
      { text: 'About 21.5 N, pointing between east and north', isCorrect: true },
      { text: '28 N — add the two sizes together', isCorrect: false },
      { text: '12 N due east — subtract the smaller from the larger', isCorrect: false },
      { text: '160 N — multiply them', isCorrect: false },
    ],
    correctValue: '21.5 N',
    targetedMisconceptions: [],
    source: src('phys.mech.force', 'forces at right angles combine by Pythagoras (√(20²+8²) = √464 ≈ 21.5); adding and subtracting sizes are the two habits carried over from forces on one line'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-first-law — MIDDLE (mcq ladder D,F) and ADULT (mcq P,A)
// ═══════════════════════════════════════════════════════════════════════════
const N1: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Explain seat belts in terms of the First Law. When a car crashes and stops suddenly, why do you need one?',
    choices: [
      { text: 'The car stops, but you carry on at the speed you were travelling. The belt is what supplies the force to stop you', isCorrect: true },
      { text: 'The belt makes the car stop more quickly', isCorrect: false },
      { text: 'The belt cancels out the force of the crash', isCorrect: false },
      { text: 'Without a belt, gravity would pull you forwards', isCorrect: false },
    ],
    correctValue: 'you keep moving; the belt supplies the stopping force',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-first-law', 'the everyday case where continuing unchanged is dangerous rather than obvious; "cancels the crash force" is the standard cancellation story'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A ball is rolled across a level floor and gradually comes to a stop. Does that DISPROVE Newton’s First Law?',
    choices: [
      { text: 'No — friction and air resistance are real forces acting on the ball, so the resultant force is not zero', isCorrect: true },
      { text: 'Yes — it shows that moving things naturally slow down and stop on their own', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-CAUSES-MOTION' },
      { text: 'Yes, unless the floor is perfectly flat', isCorrect: false },
      { text: 'No — the ball simply ran out of the inertia it was given', isCorrect: false, misconceptionId: 'phys.mech.force:MC-FORCE-IS-IMPETUS' },
    ],
    correctValue: 'no — friction is a force',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-CAUSES-MOTION', 'phys.mech.force:MC-FORCE-IS-IMPETUS'],
    source: src('phys.mech.newtons-first-law', 'the everyday counter-example, which is how the law is usually rejected; the ran-out-of-inertia option is impetus theory in its modern wording'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A passenger standing in a bus lurches forward when the driver brakes sharply. How does the First Law account for this?',
    choices: [
      { text: 'The bus slows, but the passenger keeps moving at the old velocity until something acts on them — no forward force is needed', isCorrect: true },
      { text: 'Braking produces a forward force that throws the passenger down the bus', isCorrect: false },
      { text: 'The passenger’s inertia acts as a force pushing them forward', isCorrect: false },
      { text: 'The brakes transfer their force through the floor into the passenger', isCorrect: false },
    ],
    correctValue: 'the passenger continues; no forward force',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-first-law', 'inertia is a PROPERTY, not a force — the "inertial force" wording is the most durable adult version of the error'),
  },
  {
    conceptId: 'phys.mech.newtons-first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The First Law states the condition under which an object’s velocity does not change. What is that condition?',
    choices: [
      { text: 'The resultant of all the forces on it is zero', isCorrect: true },
      { text: 'No forces act on it at all', isCorrect: false },
      { text: 'It is not touching anything', isCorrect: false },
      { text: 'Its mass is large enough to resist being moved', isCorrect: false },
    ],
    correctValue: 'zero resultant force',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-first-law', 'zero RESULTANT, not zero forces — a book on a table has two large forces on it and satisfies the law perfectly'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-second-law — MIDDLE (mcq ladder F,D) and ADULT (mcq P,A)
// ═══════════════════════════════════════════════════════════════════════════
const N2: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 5 kg box is pushed along a smooth floor by a resultant force of 10 N. What is its acceleration?',
    choices: [
      { text: '2 m/s²', isCorrect: true },
      { text: '50 m/s² — multiply the force by the mass', isCorrect: false },
      { text: '0.5 m/s² — divide the mass by the force', isCorrect: false },
      { text: '15 m/s² — add them', isCorrect: false },
    ],
    correctValue: '2 m/s^2',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'a = F/m with the three arithmetic routes learners actually take when the relation is not yet secure'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two sledges are pulled across the snow with exactly the same force. One of them accelerates twice as fast as the other. What does that tell you about their masses?',
    choices: [
      { text: 'The one accelerating twice as fast has HALF the mass', isCorrect: true },
      { text: 'It has twice the mass', isCorrect: false },
      { text: 'They have the same mass — the difference must be coming from the force', isCorrect: false },
      { text: 'It has four times the mass', isCorrect: false },
    ],
    correctValue: 'half the mass',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'the inverse half of F = ma, read backwards from the acceleration; "twice the mass" is the error of reading the proportionality the direct way'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A resultant force of 24 N acts on a 6 kg mass. What acceleration does it produce?',
    choices: [
      { text: '4 m/s²', isCorrect: true },
      { text: '144 m/s²', isCorrect: false },
      { text: '0.25 m/s²', isCorrect: false },
      { text: '18 m/s²', isCorrect: false },
    ],
    correctValue: '4 m/s^2',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'the plain calculation at ADULT band, with the multiply / invert / subtract slips as distractors'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In F = ma, which force does the F stand for?',
    choices: [
      { text: 'The RESULTANT of every force acting on the object', isCorrect: true },
      { text: 'The force you apply — the push or pull you supply yourself', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-SINGLE-FORCE' },
      { text: 'Whichever single force is the largest', isCorrect: false, misconceptionId: 'phys.mech.newtons-second-law:MC-SINGLE-FORCE' },
      { text: 'The force of gravity on the object', isCorrect: false },
    ],
    correctValue: 'the resultant force',
    targetedMisconceptions: ['phys.mech.newtons-second-law:MC-SINGLE-FORCE'],
    source: src('phys.mech.newtons-second-law', 'MC-SINGLE-FORCE named directly: this is the substitution error that makes every friction problem come out wrong'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.newtons-third-law — MIDDLE (mcq ladder F,D) and ADULT (mcq P,A)
// ═══════════════════════════════════════════════════════════════════════════
const N3: SeedProbe[] = [
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You step off a small boat onto a jetty, and the boat drifts backwards away from you. Why?',
    choices: [
      { text: 'To step forwards you push backwards on the boat, and the boat pushes you forwards by exactly as much', isCorrect: true },
      { text: 'The water pushes the boat away as soon as your weight comes off it', isCorrect: false },
      { text: 'Your weight tips the boat, and it slides out from under you', isCorrect: false },
      { text: 'The boat was drifting anyway — stepping off has nothing to do with it', isCorrect: false },
    ],
    correctValue: 'you push the boat back, it pushes you forward',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-third-law', 'the swap recipe applied where the reaction is VISIBLE because the second object is free to move'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'If the two forces in every action-reaction pair are equal and opposite, why does anything ever move? Why don’t they all just cancel out?',
    choices: [
      { text: 'The two forces act on DIFFERENT objects, so they never appear in the same object’s total and can never cancel each other', isCorrect: true },
      { text: 'One of the pair is always slightly bigger than the other', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE' },
      { text: 'They cancel only when the two objects have the same mass', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
      { text: 'They act one after the other rather than at the same time', isCorrect: false },
    ],
    correctValue: 'they act on different objects',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR', 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE'],
    source: src('phys.mech.newtons-third-law', 'MC-SAME-OBJECT-PAIR asked as the paradox it produces — the everything-cancels objection is the same error wearing a different hat'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A book rests on a table. The Earth pulls the book down. Which force is that pull’s Third-Law PARTNER?',
    choices: [
      { text: 'The book’s gravitational pull upwards on the Earth', isCorrect: true },
      { text: 'The table’s upward push on the book', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
      { text: 'The weight of the book acting downwards', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
      { text: 'The book’s downward push on the table', isCorrect: false },
    ],
    correctValue: 'the book pulls the Earth up',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR'],
    source: src('phys.mech.newtons-third-law', 'MC-SAME-OBJECT-PAIR in its canonical form — the table’s push is a genuine force, balancing the weight, and is NOT its partner because both act on the book'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The two forces of a Third-Law pair always act:',
    choices: [
      { text: 'On two different objects, one on each', isCorrect: true },
      { text: 'On the same object, where they cancel out', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR' },
      { text: 'On whichever object is heavier', isCorrect: false, misconceptionId: 'phys.mech.newtons-third-law:MC-BIGGER-EXERTS-MORE' },
      { text: 'Only when the two objects are in physical contact', isCorrect: false },
    ],
    correctValue: 'on two different objects',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR'],
    source: src('phys.mech.newtons-third-law', 'the structural rule stated plainly; the contact option is the belief that rules out gravitational and magnetic pairs'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.momentum — MIDDLE (mcq ladder F,D) and ADULT (mcq ladder P,A)
// ═══════════════════════════════════════════════════════════════════════════
const MOMENTUM: SeedProbe[] = [
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A trolley of mass 2 kg has a momentum of 10 kg m/s. How fast is it moving?',
    choices: [
      { text: '5 m/s', isCorrect: true },
      { text: '20 m/s — multiply the momentum by the mass', isCorrect: false },
      { text: '0.2 m/s — divide the mass by the momentum', isCorrect: false },
      { text: '12 m/s', isCorrect: false },
    ],
    correctValue: '5 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'p = mv rearranged for v — the direction the relation is usually NOT practised in, which is where the inverted division shows up'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two shopping trolleys roll towards each other and lock together in the crash. A student expects the pair to stop dead every time. When is that actually right?',
    choices: [
      { text: 'Only when the two momenta were equal in size and opposite in direction before the crash, so they add to zero', isCorrect: true },
      { text: 'Always — once they are stuck together neither can keep moving', isCorrect: false },
      { text: 'Only when the two trolleys have the same mass', isCorrect: false },
      { text: 'Never — something joined together always keeps moving', isCorrect: false },
    ],
    correctValue: 'only when the momenta cancel',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'momentum is a vector, so cancelling needs equal m×v, not equal m; "same mass" is the near-miss that feels sufficient and is not'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 1200 kg car travels at 15 m/s. What is its momentum?',
    choices: [
      { text: '18 000 kg m/s', isCorrect: true },
      { text: '135 000 kg m/s — using ½mv²', isCorrect: false },
      { text: '80 kg m/s — dividing the mass by the speed', isCorrect: false },
      { text: '1215 kg m/s', isCorrect: false },
    ],
    correctValue: '18000 kg m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'p = mv, with the kinetic-energy formula offered as the distractor: ½ × 1200 × 15² = 135 000, a number that looks like a plausible answer and is an energy'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Momentum is a vector quantity. What practical difference does that make when you add up the momentum of two objects moving towards each other?',
    choices: [
      { text: 'Their momenta have opposite signs, so they partly or wholly cancel — the total can be small or zero even though both objects are moving fast', isCorrect: true },
      { text: 'None — you add the two sizes together as you would any other numbers', isCorrect: false },
      { text: 'It means momentum can never be negative', isCorrect: false },
      { text: 'It means momentum is measured in newtons rather than kg m/s', isCorrect: false },
    ],
    correctValue: 'opposite directions subtract',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'why the vector nature is not decoration: it is the whole reason conservation gives a useful answer in a head-on collision'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.impulse @ MIDDLE — mcq ladder D,P
// ═══════════════════════════════════════════════════════════════════════════
const IMPULSE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.impulse', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Impulse is measured in newton-seconds (N s). Which two quantities multiplied together give that unit?',
    choices: [
      { text: 'Force multiplied by the time it acts for', isCorrect: true },
      { text: 'Force multiplied by the distance moved', isCorrect: false },
      { text: 'Mass multiplied by acceleration', isCorrect: false },
      { text: 'Force divided by the time it acts for', isCorrect: false },
    ],
    correctValue: 'force times time',
    targetedMisconceptions: [],
    source: src('phys.mech.impulse', 'the unit read as the definition; force × distance is work and mass × acceleration is force, so both distractors are real quantities in the wrong slot'),
  },
  {
    conceptId: 'phys.mech.impulse', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 0.2 kg ball hits a wall travelling at 6 m/s and bounces straight back at 4 m/s. How big is the change in its momentum?',
    choices: [
      { text: '2.0 kg m/s — the ball ends up going the other way, so the two momenta subtract as +1.2 and −0.8', isCorrect: true },
      { text: '0.4 kg m/s — the ball simply slowed from 6 m/s to 4 m/s', isCorrect: false },
      { text: '1.2 kg m/s — the momentum it arrived with', isCorrect: false },
      { text: '0.8 kg m/s — the momentum it left with', isCorrect: false },
    ],
    correctValue: '2.0 kg m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.impulse', 'a bounce is a REVERSAL, not a slowing: treating 6 and 4 as speeds on the same side is the single most common impulse error'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.power @ MIDDLE — mcq ladder D,P
// ═══════════════════════════════════════════════════════════════════════════
const POWER: SeedProbe[] = [
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Power is measured in watts. What does one watt mean?',
    choices: [
      { text: 'One joule of energy transferred every second', isCorrect: true },
      { text: 'One joule of energy in total', isCorrect: false },
      { text: 'One newton of force applied every second', isCorrect: false },
      { text: 'One joule of energy for every metre moved', isCorrect: false },
    ],
    correctValue: 'one joule per second',
    targetedMisconceptions: [],
    source: src('phys.mech.power', 'the watt as a RATE; "one joule in total" is power collapsed into energy, which is the confusion the kettle-versus-bulb probe attacks from the other side'),
  },
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A crane lifts a crate weighing 500 N through a height of 4 m, and takes 10 s to do it. What is the crane’s useful output power?',
    choices: [
      { text: '200 W — the work done is 500 × 4 = 2000 J, and 2000 J in 10 s is 200 J each second', isCorrect: true },
      { text: '2000 W — the work done, quoted as the power', isCorrect: false },
      { text: '20 W', isCorrect: false },
      { text: '12.5 W — 500 N divided by 40', isCorrect: false },
    ],
    correctValue: '200 W',
    targetedMisconceptions: [],
    source: src('phys.mech.power', 'the two-step calculation where the failure is stopping after step one: 2000 is a real number in this problem and it is an energy, not a power'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.kinematics-1d @ ADULT — mcq ladder P,D
// ═══════════════════════════════════════════════════════════════════════════
const KINEMATICS: SeedProbe[] = [
  {
    conceptId: 'phys.mech.kinematics-1d', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You know the initial velocity, the acceleration and the TIME, and you want the final velocity. Which constant-acceleration equation gives it in one step?',
    choices: [
      { text: 'v = u + at', isCorrect: true },
      { text: 's = ut + ½at²', isCorrect: false },
      { text: 'v² = u² + 2as', isCorrect: false },
      { text: 's = ½(u + v)t', isCorrect: false },
    ],
    correctValue: 'v = u + at',
    targetedMisconceptions: [],
    source: src('phys.mech.kinematics-1d', 'selecting the equation by which variable is ABSENT — v² = u² + 2as is the trap here because it also gives v, but needs a distance nobody supplied'),
  },
  {
    conceptId: 'phys.mech.kinematics-1d', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A car braking uniformly from 30 m/s comes to rest in 75 m. What is its acceleration?',
    choices: [
      { text: '−6 m/s²', isCorrect: true },
      { text: '+6 m/s² — the size is right, so the sign does not matter', isCorrect: false },
      { text: '−0.4 m/s² — 30 divided by 75', isCorrect: false },
      { text: '−2.5 m/s²', isCorrect: false },
    ],
    correctValue: '-6 m/s^2',
    targetedMisconceptions: [],
    source: src('phys.mech.kinematics-1d', 'v² = u² + 2as with no time given: 0 = 30² + 2a(75) gives a = −6. The dropped sign is the error that survives into the next question'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.kinetic-energy @ ADULT — misconception_probe ladder P,A
// (mcq is a SINGLETON here, so the additions go into the ladder that exists)
// ═══════════════════════════════════════════════════════════════════════════
const KINETIC_ENERGY: SeedProbe[] = [
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 2 kg book and a 4 kg book are both dropped and both reach the ground at 5 m/s. A student concludes they must have the same kinetic energy, "because they are going at the same speed". What is wrong?',
    choices: [
      { text: 'Kinetic energy depends on mass as well as speed: ½ × 2 × 5² = 25 J against ½ × 4 × 5² = 50 J', isCorrect: true },
      { text: 'Nothing is wrong — equal speeds always mean equal kinetic energy', isCorrect: false },
      { text: 'The heavier book has LESS kinetic energy, because it took longer to speed up', isCorrect: false },
      { text: 'Both have zero kinetic energy, because they are about to stop', isCorrect: false },
    ],
    correctValue: '25 J and 50 J',
    targetedMisconceptions: [],
    source: src('phys.mech.kinetic-energy', 'the speed-only reading of ½mv²; the numbers are given so the learner can see the factor of two rather than be told it'),
  },
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.ADULT, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A student describes a parked car as having "kinetic energy stored up, ready to be used". What is wrong with that description?',
    choices: [
      { text: 'Kinetic energy is the energy of MOTION. A parked car has v = 0, so its kinetic energy is exactly zero — what is stored is chemical energy in the fuel', isCorrect: true },
      { text: 'Nothing is wrong — a heavy object always has kinetic energy because of its mass', isCorrect: false },
      { text: 'The kinetic energy of a parked car equals its weight', isCorrect: false },
      { text: 'The kinetic energy is stored in the engine until the car is started', isCorrect: false },
    ],
    correctValue: 'zero — kinetic energy is energy of motion',
    targetedMisconceptions: [],
    source: src('phys.mech.kinetic-energy', 'kinetic energy treated as a stored substance a heavy object simply has; naming the fuel gives the belief somewhere correct to go'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// phys.mech.hookes-law @ MIDDLE — mcq ladder D,F
// ═══════════════════════════════════════════════════════════════════════════
const HOOKES_LAW: SeedProbe[] = [
  {
    conceptId: 'phys.mech.hookes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A spring stretches 6 cm when a 3 N weight hangs from it. A student then hangs 12 N on the same spring and expects 24 cm, but measures only 15 cm. What is the most likely explanation?',
    choices: [
      { text: 'The spring has been stretched past its limit of proportionality, so Hooke’s Law no longer describes it', isCorrect: true },
      { text: 'The measurement must simply have been careless', isCorrect: false },
      { text: 'Springs always stretch proportionally less as the load grows', isCorrect: false },
      { text: 'The spring constant got bigger because there was more weight on it', isCorrect: false },
    ],
    correctValue: 'past the limit of proportionality',
    targetedMisconceptions: [],
    source: src('phys.mech.hookes-law', 'the law has a RANGE; the third option is the belief that the departure is itself a smooth rule, which is why it is offered rather than omitted'),
  },
  {
    conceptId: 'phys.mech.hookes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two identical springs hang side by side and share the SAME total load between them. Compared with one spring carrying the whole load on its own, how far does each spring stretch?',
    choices: [
      { text: 'Half as far — each spring only carries half the force', isCorrect: true },
      { text: 'Exactly the same — the load has not changed', isCorrect: false },
      { text: 'Twice as far — there are two springs sharing the work', isCorrect: false },
      { text: 'A quarter as far', isCorrect: false },
    ],
    correctValue: 'half as far',
    targetedMisconceptions: [],
    source: src('phys.mech.hookes-law', 'x = F/k applied to the force each spring actually feels; "the load has not changed" is true of the TOTAL and false of the share, which is the step being tested'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 2 — the eight HIGH-band concepts measured as ONE ANSWER SHORT.
//
// Session A's decomposition of the 60-session physics corpus: 14 sessions
// failed to verify, 8 of them with checkCorrect 1 and practiceCorrect 1 after
// running the full turn budget. Keyed probes served in those eight sessions:
// 3, 3, 3, 3, 3, 3, 3, 3 — the entire pool, spent, and nothing banked. Across
// all 60, mastered sessions earned 3.00 credits from 3.02 probes: 45 of 46
// answered EVERY authored probe correctly.
//
// Three probes, three credits required, no re-asking, makes the required
// success rate exactly 1.00. Physics mastery has been asking a struggling
// learner to go three for three. These are the eight concepts where that was
// measured rather than inferred.
// ═══════════════════════════════════════════════════════════════════════════

const ELECTRIC_FIELD: SeedProbe[] = [
  {
    conceptId: 'phys.em.electric-field', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A test charge of +2.0 × 10⁻⁶ C is placed at a point and experiences a force of 0.050 N to the right. What is the electric field strength at that point?',
    choices: [
      { text: '2.5 × 10⁴ N/C to the right', isCorrect: true },
      { text: '0.050 N/C to the right — the field is the force', isCorrect: false },
      { text: '1.0 × 10⁻⁷ N/C to the right — force multiplied by charge', isCorrect: false },
      { text: '4.0 × 10⁻⁵ N/C to the right — charge divided by force', isCorrect: false },
    ],
    correctValue: '2.5e4 N/C',
    targetedMisconceptions: [],
    source: src('phys.em.electric-field', 'E = F/q as a definition rather than a formula to recall; the field-is-the-force option is the one that survives into every later problem'),
  },
  {
    conceptId: 'phys.em.electric-field', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A charge of +4.0 nC sits at x = 0 and a charge of −4.0 nC sits at x = 0.20 m. What is the net electric field at the midpoint, x = 0.10 m? (k = 8.99 × 10⁹ N m²/C²)',
    choices: [
      { text: 'About 7.2 × 10³ N/C, pointing from the positive charge towards the negative one — both contributions point the same way, so they ADD', isCorrect: true },
      { text: 'Zero — the charges are equal and opposite, so their fields cancel', isCorrect: false },
      { text: 'About 3.6 × 10³ N/C — only the nearer charge contributes', isCorrect: false },
      { text: 'Zero — the midpoint is equidistant from both charges', isCorrect: false },
    ],
    correctValue: '7.2e3 N/C from + to -',
    targetedMisconceptions: [],
    source: src('phys.em.electric-field', 'superposition where equal and opposite charges REINFORCE: the field points away from + and towards −, which is the same direction at the midpoint. Cancellation is the intuition imported from adding the charges themselves'),
  },
]

const REFRIGERATORS: SeedProbe[] = [
  {
    conceptId: 'phys.therm.refrigerators', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a working refrigerator, where does the heat taken out of the food compartment actually end up?',
    choices: [
      { text: 'Released into the room through the coils at the back, together with the energy the compressor used', isCorrect: true },
      { text: 'Destroyed — that is what the refrigerant does to it', isCorrect: false },
      { text: 'Converted back into electrical energy and returned to the supply', isCorrect: false },
      { text: 'Stored permanently in the coolant, which is why it must be replaced', isCorrect: false },
    ],
    correctValue: 'released into the room',
    targetedMisconceptions: [],
    source: src('phys.therm.refrigerators', 'a refrigerator MOVES heat and cannot destroy it; the destroyed-heat option is the belief that makes the open-door question below feel paradoxical'),
  },
  {
    conceptId: 'phys.therm.refrigerators', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A refrigerator is left running with its door wide open in a small kitchen that is sealed and well insulated. What happens to the kitchen temperature over the next few hours?',
    choices: [
      { text: 'It RISES — the fridge dumps out everything it removes PLUS the compressor work, so the room gains energy overall', isCorrect: true },
      { text: 'It falls — that is what a refrigerator does', isCorrect: false },
      { text: 'It stays the same — the heat removed and the heat released cancel exactly', isCorrect: false },
      { text: 'It falls at first and then holds steady once the fridge reaches its set point', isCorrect: false },
    ],
    correctValue: 'the kitchen gets warmer',
    targetedMisconceptions: [],
    source: src('phys.therm.refrigerators', 'Q_H = Q_C + W stated as a room-scale consequence; the exactly-cancel option is the energy balance with the compressor work left out, which is the whole content of the question'),
  },
]

const STRESS_STRAIN: SeedProbe[] = [
  {
    conceptId: 'phys.mech.stress-strain', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A wire of cross-sectional area 2.0 × 10⁻⁶ m² is pulled by a tensile force of 60 N. What is the tensile stress in the wire?',
    choices: [
      { text: '3.0 × 10⁷ Pa (30 MPa)', isCorrect: true },
      { text: '60 Pa — stress is just the applied force', isCorrect: false },
      { text: '1.2 × 10⁻⁴ Pa — force multiplied by area', isCorrect: false },
      { text: '3.3 × 10⁻⁸ Pa — area divided by force', isCorrect: false },
    ],
    correctValue: '3.0e7 Pa',
    targetedMisconceptions: [],
    source: src('phys.mech.stress-strain', 'σ = F/A on a realistically small area, so the multiply and invert slips produce numbers that are obviously wrong once the unit is read'),
  },
  {
    conceptId: 'phys.mech.stress-strain', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A steel wire of length 2.0 m and cross-section 1.0 × 10⁻⁶ m² carries a load of 100 N. Steel has a Young modulus of 200 GPa. By how much does the wire extend?',
    choices: [
      { text: '1.0 mm', isCorrect: true },
      { text: '2.0 mm', isCorrect: false },
      { text: '0.5 mm', isCorrect: false },
      { text: '1.0 m — the wire doubles in length', isCorrect: false },
    ],
    correctValue: '1.0 mm',
    targetedMisconceptions: [],
    source: src('phys.mech.stress-strain', 'ΔL = FL/(AE) = 100 × 2.0 / (1.0e-6 × 200e9) = 1.0 × 10⁻³ m. The 1.0 m option is the same arithmetic with the prefix dropped, which is the error that survives a correct method'),
  },
]

const SPRING_MASS: SeedProbe[] = [
  {
    conceptId: 'phys.wave.spring-mass', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 0.20 kg mass hangs from a spring of stiffness 80 N/m and oscillates freely. What is the angular frequency of the oscillation?',
    choices: [
      { text: '20 rad/s', isCorrect: true },
      { text: '400 rad/s — k divided by m, without the square root', isCorrect: false },
      { text: '0.05 rad/s — m divided by k', isCorrect: false },
      { text: '2.0 rad/s', isCorrect: false },
    ],
    correctValue: '20 rad/s',
    targetedMisconceptions: [],
    source: src('phys.wave.spring-mass', 'ω = √(k/m) = √(80/0.20) = √400 = 20. The un-rooted and inverted options are the two ways the relation is misremembered'),
  },
  {
    conceptId: 'phys.wave.spring-mass', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The mass on a spring-mass oscillator is QUADRUPLED and the spring is left unchanged. What happens to the period of oscillation?',
    choices: [
      { text: 'It doubles — T = 2π√(m/k), so the period follows the square root of the mass', isCorrect: true },
      { text: 'It quadruples, in step with the mass', isCorrect: false },
      { text: 'It is unchanged — like a pendulum, the period does not depend on the mass', isCorrect: false },
      { text: 'It halves — a heavier mass is harder to move, so the oscillation is quicker', isCorrect: false },
    ],
    correctValue: 'the period doubles',
    targetedMisconceptions: [],
    source: src('phys.wave.spring-mass', 'the square-root dependence, with the PENDULUM result offered as the distractor — a simple pendulum genuinely is mass-independent, and carrying that across is the specific cross-concept error here'),
  },
]

const EULER_LAGRANGE: SeedProbe[] = [
  {
    conceptId: 'phys.mech.euler-lagrange-equation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A Lagrangian contains the velocity q̇ but the coordinate q itself appears nowhere in it. What does the Euler–Lagrange equation tell you immediately?',
    choices: [
      { text: 'Since ∂L/∂q = 0, the equation reduces to d/dt(∂L/∂q̇) = 0 — so the momentum conjugate to q is CONSERVED', isCorrect: true },
      { text: 'That q̇ must be zero, so the coordinate never changes', isCorrect: false },
      { text: 'That the Lagrangian itself is zero along the motion', isCorrect: false },
      { text: 'That q was chosen badly and the problem must be set up again in different coordinates', isCorrect: false },
    ],
    correctValue: 'the conjugate momentum is conserved',
    targetedMisconceptions: [],
    source: src('phys.mech.euler-lagrange-equation', 'a cyclic coordinate: the conserved quantity falls straight out of the equation. Reading "q does not appear" as "q does not change" is the substitution that hides the whole result'),
  },
]

const THERMO_PROCESSES: SeedProbe[] = [
  {
    conceptId: 'phys.therm.thermodynamic-processes', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'An ideal gas is taken around a complete closed cycle on a P–V diagram and ends exactly where it started. What is ΔU over the whole cycle, and what does the area enclosed by the loop represent?',
    choices: [
      { text: 'ΔU = 0, because internal energy is a state function; the enclosed area is the NET WORK done over the cycle', isCorrect: true },
      { text: 'ΔU equals the enclosed area, since that is the energy the cycle gained', isCorrect: false },
      { text: 'ΔU = 0, and the enclosed area is the energy destroyed by friction in the cycle', isCorrect: false },
      { text: 'ΔU equals the net heat supplied, and the enclosed area is zero for a closed loop', isCorrect: false },
    ],
    correctValue: 'ΔU = 0; the area is the net work',
    targetedMisconceptions: [],
    source: src('phys.therm.thermodynamic-processes', 'state function versus path function in the one situation that separates them cleanly; reading the enclosed area as an energy CHANGE rather than as work is the standard conflation'),
  },
]

const BINDING_ENERGY: SeedProbe[] = [
  {
    conceptId: 'phys.mod.binding-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The measured mass of any nucleus is LESS than the total mass of the separate protons and neutrons that make it up. What is the missing mass called, and what became of it?',
    choices: [
      { text: 'The mass defect — it was carried away as the binding energy released when the nucleus formed, following E = mc²', isCorrect: true },
      { text: 'Experimental error — the difference is too small to be real', isCorrect: false },
      { text: 'The mass of the orbiting electrons, which is counted separately', isCorrect: false },
      { text: 'It was converted into the strong nuclear force holding the nucleus together', isCorrect: false },
    ],
    correctValue: 'the mass defect',
    targetedMisconceptions: [],
    source: src('phys.mod.binding-energy', 'mass defect and binding energy as the SAME quantity in two units; "turned into the force" is the answer that sounds mechanistic and stops the E = mc² step from happening'),
  },
  {
    conceptId: 'phys.mod.binding-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The curve of binding energy PER NUCLEON rises steeply for light nuclei, peaks around iron-56, then falls slowly for heavy nuclei. What does that single shape explain?',
    choices: [
      { text: 'Both fusion and fission: light nuclei release energy by fusing UP towards the peak, and heavy nuclei release it by splitting DOWN towards the peak', isCorrect: true },
      { text: 'Only fusion — fission releases energy for a completely unrelated reason', isCorrect: false },
      { text: 'That iron cannot take part in any nuclear reaction at all', isCorrect: false },
      { text: 'That splitting any nucleus releases energy, which is why fission works for every element', isCorrect: false },
    ],
    correctValue: 'both fusion and fission move towards the peak',
    targetedMisconceptions: [],
    source: src('phys.mod.binding-energy', 'the peak read as a DESTINATION both directions move towards — the one idea that makes fusion and fission a single fact rather than two memorised ones'),
  },
]

const QUANTUM_TUNNELING: SeedProbe[] = [
  {
    conceptId: 'phys.qm.quantum-tunneling', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is actually meant by saying a particle has "tunnelled" through a barrier that its energy is too low to cross?',
    choices: [
      { text: 'Its wavefunction decays inside the barrier but is still non-zero on the far side, so there is a finite probability of finding the particle beyond it', isCorrect: true },
      { text: 'It briefly gains enough energy to pass over the top of the barrier', isCorrect: false },
      { text: 'It travels around the barrier rather than through it', isCorrect: false },
      { text: 'It physically breaks a hole through the barrier and passes through the gap', isCorrect: false },
    ],
    correctValue: 'the wavefunction is non-zero beyond the barrier',
    targetedMisconceptions: [],
    source: src('phys.qm.quantum-tunneling', 'tunnelling as a statement about the wavefunction, not about the particle acquiring energy; the over-the-top option is the same borrowed-energy story the concept\'s existing PROFICIENT probe attacks from the other side'),
  },
  {
    conceptId: 'phys.qm.quantum-tunneling', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'An electron and a proton, each with the same energy, meet identical rectangular barriers. Which tunnels through more readily, and why?',
    choices: [
      { text: 'The electron — the decay constant κ = √(2m(V₀ − E))/ħ grows with mass, so the much heavier proton\'s wavefunction dies away far faster inside the barrier', isCorrect: true },
      { text: 'The proton — it carries far more momentum, so it drives further into the barrier', isCorrect: false },
      { text: 'Equally — transmission depends only on the height and width of the barrier', isCorrect: false },
      { text: 'The proton — being heavier it is more energetic, and energy is what beats a barrier', isCorrect: false },
    ],
    correctValue: 'the electron',
    targetedMisconceptions: [],
    source: src('phys.qm.quantum-tunneling', 'mass in the exponent is why tunnelling is an electron phenomenon and essentially never a macroscopic one; the barrier-only option is the reading that makes that fact impossible to derive'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 3 — phys.therm @ HIGH, all sixteen short pairs.
//
// Thermodynamics carries an unusually rich set of authored short_answer and
// checkpoint items (the blueprint's P4-a..f and MP-1..5 ladders) and exactly
// three probes a gate can grade. That gap is the whole reason the row count
// overstated the pool: seven PROBE rows, three gradeable. The content was
// there; what was missing was a keyed answer.
// ═══════════════════════════════════════════════════════════════════════════

const THERM: SeedProbe[] = [
  // ── calorimetry ──────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.calorimetry', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How much heat is needed to raise the temperature of 0.50 kg of water from 20 °C to 60 °C? (c = 4200 J kg⁻¹ K⁻¹)',
    choices: [
      { text: '84 000 J', isCorrect: true },
      { text: '126 000 J — using the final temperature as ΔT', isCorrect: false },
      { text: '2100 J — leaving ΔT out altogether', isCorrect: false },
      { text: '168 000 J — using 1 kg instead of 0.50 kg', isCorrect: false },
    ],
    correctValue: '84000 J',
    targetedMisconceptions: [],
    source: src('phys.therm.calorimetry', 'Q = mcΔT with ΔT as a DIFFERENCE; using 60 rather than 40 is the single most common substitution error in the whole topic'),
  },
  {
    conceptId: 'phys.therm.calorimetry', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A calorimetry calculation sets the heat lost by the hot body exactly equal to the heat gained by the cold one. What physical assumption is that equation making?',
    choices: [
      { text: 'That no heat leaks to or from the surroundings — the two bodies are the entire energy budget', isCorrect: true },
      { text: 'That both substances have the same specific heat capacity', isCorrect: false },
      { text: 'That the two masses are equal', isCorrect: false },
      { text: 'That heat can only flow between substances of the same kind', isCorrect: false },
    ],
    correctValue: 'no heat exchanged with the surroundings',
    targetedMisconceptions: [],
    source: src('phys.therm.calorimetry', 'the closed-system assumption named rather than assumed; it is what the lagging, the lid and the symmetric start-and-finish temperatures in a real experiment are all for'),
  },

  // ── carnot-cycle ─────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.carnot-cycle', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is special about the Carnot cycle compared with every other cycle running between the same two temperatures?',
    choices: [
      { text: 'It sets the MAXIMUM efficiency any cycle between those two temperatures can have — every real cycle does worse', isCorrect: true },
      { text: 'It is the only cycle that conserves energy', isCorrect: false },
      { text: 'It is the cycle used in petrol car engines', isCorrect: false },
      { text: 'It is the cheapest cycle to build', isCorrect: false },
    ],
    correctValue: 'it is the upper limit',
    targetedMisconceptions: [],
    source: src('phys.therm.carnot-cycle', 'the Carnot result as a BOUND rather than a design; the conserves-energy option is the first law wandering into a second-law question'),
  },
  {
    conceptId: 'phys.therm.carnot-cycle', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A Carnot engine runs between T_H = 500 K and T_C = 300 K. You may either raise T_H by 50 K or lower T_C by 50 K, but not both. Which gives the greater efficiency, and what does it become?',
    choices: [
      { text: 'Lowering T_C wins: η = 1 − 250/500 = 0.500, against 1 − 300/550 = 0.455 for raising T_H', isCorrect: true },
      { text: 'Raising T_H wins, because efficiency is governed by the hot reservoir', isCorrect: false },
      { text: 'They are identical — the same 50 K appears in both', isCorrect: false },
      { text: 'Neither changes the efficiency, which depends only on the temperature DIFFERENCE', isCorrect: false },
    ],
    correctValue: 'lowering T_C, to 0.500',
    targetedMisconceptions: [],
    source: src('phys.therm.carnot-cycle', 'η = 1 − T_C/T_H is a RATIO, so equal absolute shifts are not equally effective; the difference-only option is the reading that makes the two proposals look identical'),
  },

  // ── entropy ──────────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.entropy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In statistical terms, what does the entropy of a system actually count?',
    choices: [
      { text: 'The number of microscopic arrangements the particles can take while the system still looks the same from outside', isCorrect: true },
      { text: 'The total quantity of heat the system contains', isCorrect: false },
      { text: 'The temperature of the system, measured on a different scale', isCorrect: false },
      { text: 'How untidy the object looks to the eye', isCorrect: false },
    ],
    correctValue: 'the number of microstates',
    targetedMisconceptions: [],
    source: src('phys.therm.entropy', 'S = k ln Ω stated in words; "heat contained" is the caloric leftover, and "untidy to the eye" is the popular-science gloss that stops the counting idea from forming'),
  },
  {
    conceptId: 'phys.therm.entropy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A gas is compressed slowly and reversibly, and its entropy falls by 20 J/K. Does that violate the second law?',
    choices: [
      { text: 'No — the surroundings gained at least 20 J/K in the same process, so the TOTAL entropy did not fall', isCorrect: true },
      { text: 'Yes — entropy is never allowed to decrease anywhere', isCorrect: false },
      { text: 'No — entropy may decrease freely in any closed system', isCorrect: false },
      { text: 'No — the second law only applies to processes that happen quickly', isCorrect: false },
    ],
    correctValue: 'no — the total did not fall',
    targetedMisconceptions: [],
    source: src('phys.therm.entropy', 'the second law constrains the TOTAL, which is what makes refrigerators, freezing and living cells possible; this is the same structure as the concept\'s existing cooling-coffee probe, asked about a system being acted on rather than one cooling'),
  },

  // ── first-law ────────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A gas absorbs 800 J of heat and does 300 J of work on its surroundings. What is the change in its internal energy?',
    choices: [
      { text: '+500 J', isCorrect: true },
      { text: '+1100 J — adding the work instead of subtracting it', isCorrect: false },
      { text: '−500 J', isCorrect: false },
      { text: '+300 J — only the work counts, since heat is not energy', isCorrect: false },
    ],
    correctValue: '+500 J',
    targetedMisconceptions: [],
    source: src('phys.therm.first-law', 'ΔU = Q − W with the sign convention exercised in the direction the concept\'s existing FOUNDATIONAL probe does not cover'),
  },
  {
    conceptId: 'phys.therm.first-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is the first law written with ΔU as a change of state, while Q and W are not given the same status?',
    choices: [
      { text: 'Internal energy depends only on the state the gas is in; Q and W each depend on the PATH taken, and only their combination is fixed by the endpoints', isCorrect: true },
      { text: 'Because Q and W are harder to measure accurately', isCorrect: false },
      { text: 'Because Q and W are always equal to each other', isCorrect: false },
      { text: 'Because ΔU is always zero in any real process', isCorrect: false },
    ],
    correctValue: 'state function versus path functions',
    targetedMisconceptions: [],
    source: src('phys.therm.first-law', 'the distinction that makes the whole P–V diagram method work; without it a learner sees three symbols of equal standing'),
  },

  // ── heat-engines ─────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.heat-engines', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many thermal reservoirs does a heat engine need in order to produce work continuously, and why?',
    choices: [
      { text: 'Two — a hot one to draw heat from and a cold one to reject heat to; with only one, no net work can be extracted over a complete cycle', isCorrect: true },
      { text: 'One — the hot reservoir supplies everything the engine needs', isCorrect: false },
      { text: 'Three — hot, cold, and one to store the work produced', isCorrect: false },
      { text: 'None — an engine can run on the internal energy it already contains', isCorrect: false },
    ],
    correctValue: 'two',
    targetedMisconceptions: [],
    source: src('phys.therm.heat-engines', 'the one-reservoir engine is exactly what the Kelvin statement of the second law forbids; naming the cold reservoir as REQUIRED is what makes rejected heat stop looking like waste to be engineered away'),
  },
  {
    conceptId: 'phys.therm.heat-engines', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Per cycle, an engine takes 2400 J from the hot reservoir and delivers 600 J of useful work. How much heat does it reject, and what is its efficiency?',
    choices: [
      { text: 'Rejects 1800 J, efficiency 25%', isCorrect: true },
      { text: 'Rejects 1800 J, efficiency 33% — dividing the work by the heat rejected', isCorrect: false },
      { text: 'Rejects 600 J, efficiency 25%', isCorrect: false },
      { text: 'Rejects 3000 J, efficiency 25% — adding the work to the heat taken in', isCorrect: false },
    ],
    correctValue: '1800 J and 25%',
    targetedMisconceptions: [],
    source: src('phys.therm.heat-engines', 'Q_C = Q_H − W = 1800 and η = W/Q_H = 0.25; the 33% option divides by the wrong quantity, which is the error that makes efficiencies look better than they are'),
  },

  // ── heat-transfer ────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.heat-transfer', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A metal handrail and a wooden one have been sitting in the same room all day, so they are at the same temperature. Why does the metal feel colder?',
    choices: [
      { text: 'Metal conducts heat away from your hand much faster, so your skin cools quickly — what you feel is the rate of heat loss, not the temperature', isCorrect: true },
      { text: 'The metal really is colder; metals settle at a lower temperature than wood', isCorrect: false },
      { text: 'The wood has absorbed heat from the air and the metal has not', isCorrect: false },
      { text: 'Metal is denser, and denser materials are always at a lower temperature', isCorrect: false },
    ],
    correctValue: 'metal conducts heat away faster',
    targetedMisconceptions: [],
    source: src('phys.therm.heat-transfer', 'the skin is a rate detector, not a thermometer — the everyday observation that most reliably teaches a learner that temperature and heat flow are different questions'),
  },
  {
    conceptId: 'phys.therm.heat-transfer', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A vacuum flask has a vacuum between its double walls AND a silvered inner surface. Which mechanism is the silvering there to defeat?',
    choices: [
      { text: 'Radiation — the vacuum already stops conduction and convection, but infrared radiation crosses it freely', isCorrect: true },
      { text: 'Conduction', isCorrect: false },
      { text: 'Convection', isCorrect: false },
      { text: 'Evaporation of the liquid inside', isCorrect: false },
    ],
    correctValue: 'radiation',
    targetedMisconceptions: [],
    source: src('phys.therm.heat-transfer', 'the flask is a three-mechanism design where each feature answers a different mechanism; the concept\'s existing probe covers radiation crossing a vacuum, and this asks what an engineer DOES about it'),
  },

  // ── ideal-gas-law ────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.ideal-gas-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A fixed mass of gas is held at constant volume while its absolute temperature is raised from 300 K to 600 K. What happens to its pressure?',
    choices: [
      { text: 'It doubles', isCorrect: true },
      { text: 'It halves', isCorrect: false },
      { text: 'It quadruples', isCorrect: false },
      { text: 'It is unchanged — the container has not changed size', isCorrect: false },
    ],
    correctValue: 'the pressure doubles',
    targetedMisconceptions: [],
    source: src('phys.therm.ideal-gas-law', 'P ∝ T at fixed V and n, on an ABSOLUTE scale where the doubling is unambiguous — the concept\'s existing probe attacks the Celsius version of the same question'),
  },
  {
    conceptId: 'phys.therm.ideal-gas-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A sealed rigid canister of gas reads 100 kPa at 27 °C. It is warmed to 127 °C. What is the new pressure?',
    choices: [
      { text: 'About 133 kPa', isCorrect: true },
      { text: 'About 470 kPa — scaling by 127/27', isCorrect: false },
      { text: '100 kPa — the canister is sealed, so nothing changes', isCorrect: false },
      { text: 'About 75 kPa', isCorrect: false },
    ],
    correctValue: '133 kPa',
    targetedMisconceptions: [],
    source: src('phys.therm.ideal-gas-law', 'P₂ = P₁ × T₂/T₁ = 100 × 400/300 = 133 kPa. The 470 option is the same method in Celsius, and it is wrong by more than a factor of three — which is the point'),
  },

  // ── internal-energy ──────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.internal-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For an IDEAL gas, the internal energy depends on which quantity alone?',
    choices: [
      { text: 'The absolute temperature', isCorrect: true },
      { text: 'The pressure alone', isCorrect: false },
      { text: 'The volume alone', isCorrect: false },
      { text: 'The pressure and volume separately, not their combination', isCorrect: false },
    ],
    correctValue: 'temperature',
    targetedMisconceptions: [],
    source: src('phys.therm.internal-energy', 'the property that makes ΔU = 0 for an isothermal ideal-gas process — the step every isothermal-work problem silently depends on'),
  },
  {
    conceptId: 'phys.therm.internal-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two samples of the same monatomic ideal gas sit at the same temperature, but sample B contains twice as many moles as sample A. Compare their total internal energies and their AVERAGE molecular kinetic energies.',
    choices: [
      { text: 'B has twice the internal energy, but the average kinetic energy per molecule is identical in both', isCorrect: true },
      { text: 'B has twice the internal energy and twice the average molecular kinetic energy', isCorrect: false },
      { text: 'Both quantities are the same in the two samples', isCorrect: false },
      { text: 'The internal energies are equal, but B has twice the average molecular kinetic energy', isCorrect: false },
    ],
    correctValue: 'twice the total, same per molecule',
    targetedMisconceptions: [],
    source: src('phys.therm.internal-energy', 'extensive versus intensive: U = (3/2)nRT scales with n, while (3/2)k_BT per molecule does not. Conflating them is why "hotter" and "more energy" get used interchangeably'),
  },

  // ── kinetic-theory ───────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.kinetic-theory', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In kinetic theory, what produces the pressure a gas exerts on the walls of its container?',
    choices: [
      { text: 'Countless molecular collisions with the walls, each delivering a tiny impulse; the pressure is their average effect', isCorrect: true },
      { text: 'The weight of the gas pressing outwards', isCorrect: false },
      { text: 'The molecules repelling one another and pushing the walls apart', isCorrect: false },
      { text: 'The gas straining to expand into any vacuum beyond the walls', isCorrect: false },
    ],
    correctValue: 'molecular collisions with the walls',
    targetedMisconceptions: [],
    source: src('phys.therm.kinetic-theory', 'pressure as a time-averaged impulse rate; the mutual-repulsion story is the model that makes an IDEAL gas — whose molecules do not interact — look self-contradictory'),
  },
  {
    conceptId: 'phys.therm.kinetic-theory', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The absolute temperature of a gas sample is doubled. By what factor does the root-mean-square molecular speed change?',
    choices: [
      { text: 'By √2, about 1.41 — v_rms goes as the square root of the absolute temperature', isCorrect: true },
      { text: 'By 2, in step with the temperature', isCorrect: false },
      { text: 'By 4', isCorrect: false },
      { text: 'It does not change; only the number of collisions changes', isCorrect: false },
    ],
    correctValue: 'by sqrt(2)',
    targetedMisconceptions: [],
    source: src('phys.therm.kinetic-theory', 'temperature tracks the mean square speed, so the SPEED follows a square root; reading the proportionality straight through is the standard error'),
  },

  // ── phase-transitions ────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.phase-transitions', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How much energy is required to melt 0.20 kg of ice that is already at 0 °C? (Latent heat of fusion = 3.34 × 10⁵ J/kg)',
    choices: [
      { text: '6.7 × 10⁴ J', isCorrect: true },
      { text: '3.34 × 10⁵ J — the latent heat is the answer as it stands', isCorrect: false },
      { text: '1.7 × 10⁶ J — dividing by the mass instead of multiplying', isCorrect: false },
      { text: '0 J — no energy is needed, because the temperature does not change', isCorrect: false },
    ],
    correctValue: '6.7e4 J',
    targetedMisconceptions: [],
    source: src('phys.therm.phase-transitions', 'Q = mL = 0.20 × 3.34e5 = 6.68e4 J. The 0 J option is the belief that no temperature change means no energy transfer, which is the whole idea of latent heat'),
  },
  {
    conceptId: 'phys.therm.phase-transitions', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Water is boiling steadily. Energy is being supplied the whole time, yet the thermometer stays at 100 °C. Where is that energy going?',
    choices: [
      { text: 'Into pulling the molecules apart against their mutual attraction — it raises potential energy, not kinetic energy, so the temperature does not move', isCorrect: true },
      { text: 'It is being lost to the surroundings as fast as it arrives', isCorrect: false },
      { text: 'It is stored as pressure in the vapour above the liquid', isCorrect: false },
      { text: 'The thermometer is simply too slow to follow the rise', isCorrect: false },
    ],
    correctValue: 'into potential energy, breaking bonds',
    targetedMisconceptions: [],
    source: src('phys.therm.phase-transitions', 'the kinetic/potential split is what makes a flat section on a heating curve intelligible; the instrument-lag option is the answer a learner reaches for when energy must go SOMEWHERE visible'),
  },

  // ── second-law ───────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these is a correct statement of the second law of thermodynamics?',
    choices: [
      { text: 'No process is possible whose only result is the transfer of heat from a colder body to a hotter one', isCorrect: true },
      { text: 'Energy can be neither created nor destroyed', isCorrect: false },
      { text: 'The entropy of any system, taken on its own, always increases', isCorrect: false },
      { text: 'Heat keeps flowing until everything reaches zero temperature', isCorrect: false },
    ],
    correctValue: 'the Clausius statement',
    targetedMisconceptions: [],
    source: src('phys.therm.second-law', 'the first law is offered as the distractor because it is the statement most often produced when the second is asked for; "any system" quietly drops the word TOTAL, which is the load-bearing word'),
  },
  {
    conceptId: 'phys.therm.second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A glass falls and smashes. The reverse — the fragments leaping up and reassembling — would conserve energy perfectly well. What actually forbids it?',
    choices: [
      { text: 'The second law: the assembled glass corresponds to overwhelmingly fewer microscopic arrangements, so the total entropy would have to fall', isCorrect: true },
      { text: 'The first law forbids it, because energy would have to be created', isCorrect: false },
      { text: 'Conservation of momentum forbids it', isCorrect: false },
      { text: 'Nothing forbids it — the fragments simply never have enough energy', isCorrect: false },
    ],
    correctValue: 'the second law',
    targetedMisconceptions: [],
    source: src('phys.therm.second-law', 'the arrow of time as a counting statement, on the example where energy conservation is obviously satisfied — which is what forces the second law to be doing the work'),
  },

  // ── specific-heat ────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.specific-heat', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Water has one of the highest specific heat capacities of any common substance. What does that mean in practice?',
    choices: [
      { text: 'It takes a great deal of energy to change water\'s temperature, so it warms up and cools down slowly', isCorrect: true },
      { text: 'Water reaches high temperatures more easily than other substances', isCorrect: false },
      { text: 'Water boils at a lower temperature than other substances', isCorrect: false },
      { text: 'Water conducts heat better than other substances', isCorrect: false },
    ],
    correctValue: 'it warms and cools slowly',
    targetedMisconceptions: [],
    source: src('phys.therm.specific-heat', 'a high c is thermal INERTIA, not eagerness to get hot; the reaches-high-temperatures option reads the word "high" off the wrong quantity'),
  },
  {
    conceptId: 'phys.therm.specific-heat', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 2.0 kg block of metal absorbs 18 000 J of heat and its temperature rises by 20 °C. What is its specific heat capacity?',
    choices: [
      { text: '450 J kg⁻¹ K⁻¹', isCorrect: true },
      { text: '900 J kg⁻¹ K⁻¹ — leaving the mass out', isCorrect: false },
      { text: '180 J kg⁻¹ K⁻¹', isCorrect: false },
      { text: '720 000 J kg⁻¹ K⁻¹ — multiplying instead of dividing', isCorrect: false },
    ],
    correctValue: '450 J/kg/K',
    targetedMisconceptions: [],
    source: src('phys.therm.specific-heat', 'Q = mcΔT rearranged for c: 18000/(2.0 × 20) = 450, which is close to real steel — the concept\'s existing probes never ask for c itself'),
  },

  // ── temperature ──────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.temperature', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two objects have been left in contact long enough to reach thermal equilibrium. Which quantity must they now share?',
    choices: [
      { text: 'Their temperature', isCorrect: true },
      { text: 'Their total internal energy', isCorrect: false },
      { text: 'Their heat capacity', isCorrect: false },
      { text: 'Their mass', isCorrect: false },
    ],
    correctValue: 'temperature',
    targetedMisconceptions: [],
    source: src('phys.therm.temperature', 'equilibrium equalises TEMPERATURE, not energy — a swimming pool and a teaspoon in equilibrium hold wildly different amounts of internal energy'),
  },

  // ── thermal-expansion ────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.thermal-expansion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Railway track is laid in sections with small gaps between them. A 25 m steel rail (α = 12 × 10⁻⁶ K⁻¹) warms by 30 °C. By how much does it lengthen?',
    choices: [
      { text: '9.0 mm', isCorrect: true },
      { text: '0.9 mm', isCorrect: false },
      { text: '90 mm', isCorrect: false },
      { text: '0.36 mm — leaving the length out of the calculation', isCorrect: false },
    ],
    correctValue: '9.0 mm',
    targetedMisconceptions: [],
    source: src('phys.therm.thermal-expansion', 'ΔL = αL₀ΔT = 12e-6 × 25 × 30 = 9.0e-3 m. The distractors are the same figure at the wrong power of ten, which is exactly how this calculation fails in practice'),
  },

  // ── third-law ────────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which temperature scale does the third law give a genuine physical meaning to, and why?',
    choices: [
      { text: 'The absolute (Kelvin) scale — the third law fixes a real zero, the lowest temperature that can exist', isCorrect: true },
      { text: 'The Celsius scale, because its zero is the freezing point of water', isCorrect: false },
      { text: 'The Fahrenheit scale', isCorrect: false },
      { text: 'Any of them — the scales are interchangeable, so none is more physical', isCorrect: false },
    ],
    correctValue: 'the Kelvin scale',
    targetedMisconceptions: [],
    source: src('phys.therm.third-law', 'why absolute zero is a different kind of zero from the freezing point of water; the interchangeable-scales option is true of conversions and false of what a zero MEANS'),
  },
  {
    conceptId: 'phys.therm.third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Practical cooling methods remove a fixed FRACTION of whatever energy remains at each step. Why does that make absolute zero unreachable rather than merely hard?',
    choices: [
      { text: 'Repeatedly taking a fraction of what is left never reaches zero in a finite number of steps — and each step removes less than the last, so no finite process ever arrives', isCorrect: true },
      { text: 'Because refrigeration equipment is not yet good enough, though one day it will be', isCorrect: false },
      { text: 'Because reaching 0 K would violate conservation of energy', isCorrect: false },
      { text: 'Because no thermometer can read a temperature that low', isCorrect: false },
    ],
    correctValue: 'a finite number of steps never gets there',
    targetedMisconceptions: [],
    source: src('phys.therm.third-law', 'unreachable in PRINCIPLE, not in engineering; the equipment option is the reading that makes the third law sound like a temporary limitation'),
  },

  // ── zeroth-law ───────────────────────────────────────────────────────────
  {
    conceptId: 'phys.therm.zeroth-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why is the Zeroth Law what allows a thermometer to work at all?',
    choices: [
      { text: 'It guarantees the relation is TRANSITIVE, so a thermometer that agrees with two separate objects tells you those objects would agree with each other', isCorrect: true },
      { text: 'Because it states that heat always flows from hot to cold', isCorrect: false },
      { text: 'Because it defines the size of one kelvin', isCorrect: false },
      { text: 'Because it guarantees a thermometer never changes the temperature of what it measures', isCorrect: false },
    ],
    correctValue: 'transitivity',
    targetedMisconceptions: [],
    source: src('phys.therm.zeroth-law', 'transitivity is the whole content of the law and the reason one instrument can be compared across objects it never touches at the same time'),
  },
  {
    conceptId: 'phys.therm.zeroth-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is this law numbered ZEROTH rather than fourth?',
    choices: [
      { text: 'It was recognised as logically prior to the other three only after they had already been named — the first, second and third all assume temperature is well defined, which is what this law establishes', isCorrect: true },
      { text: 'It was the first of the four to be discovered', isCorrect: false },
      { text: 'It is regarded as the least important of the four', isCorrect: false },
      { text: 'It applies only at zero temperature', isCorrect: false },
    ],
    correctValue: 'logically prior, named later',
    targetedMisconceptions: [],
    source: src('phys.therm.zeroth-law', 'the numbering records a LOGICAL dependency, not a chronology; "discovered first" is the natural reading and is precisely backwards'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 4 — phys.wave @ HIGH, all sixteen short pairs.
//
// phys.wave.wave-properties is the one pair in this domain whose mcq slot
// holds exactly ONE probe, so its two additions go into the misconception_probe
// ladder instead. Adding them to mcq would have re-identified the probe already
// seeded there — see this file's header, and batch 3, where the corpus-wide
// guard caught exactly that.
// ═══════════════════════════════════════════════════════════════════════════

const WAVE: SeedProbe[] = [
  {
    conceptId: 'phys.wave.beats', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two steady tones of slightly different frequency sound together and the loudness rises and falls over and over. What causes that throbbing?',
    choices: [
      { text: 'The two waves drift in and out of step, so they alternately reinforce and cancel one another', isCorrect: true },
      { text: 'One of the two sources is periodically getting louder', isCorrect: false },
      { text: 'The ear tires and recovers in a cycle', isCorrect: false },
      { text: 'The two waves collide and bounce off each other', isCorrect: false },
    ],
    correctValue: 'drifting in and out of phase',
    targetedMisconceptions: [],
    source: src('phys.wave.beats', 'beats as a phase phenomenon rather than a property of either source; the collide-and-bounce option is the particle picture of waves that superposition has to displace'),
  },
  {
    conceptId: 'phys.wave.beats', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A guitar string sounded against a 330 Hz tuning fork gives 3 beats per second. The player TIGHTENS the string slightly and now hears 5 beats per second. What was the string\'s original frequency?',
    choices: [
      { text: '333 Hz — it was already sharp, and tightening took it further away', isCorrect: true },
      { text: '327 Hz — it was flat, and tightening was the right move', isCorrect: false },
      { text: '330 Hz — the beats come from the fork alone', isCorrect: false },
      { text: '335 Hz', isCorrect: false },
    ],
    correctValue: '333 Hz',
    targetedMisconceptions: [],
    source: src('phys.wave.beats', 'the beat frequency gives the SIZE of the mismatch but not its sign; changing the tension and watching which way the beats move is the only way to resolve it, and is what a tuner actually does'),
  },

  {
    conceptId: 'phys.wave.damped-oscillations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What separates CRITICAL damping from OVER-damping in practical terms?',
    choices: [
      { text: 'Critical damping returns the system to equilibrium in the shortest possible time without overshooting; an over-damped system also does not overshoot, but takes longer', isCorrect: true },
      { text: 'A critically damped system overshoots exactly once, then stops', isCorrect: false },
      { text: 'An over-damped system never returns to equilibrium at all', isCorrect: false },
      { text: 'They are two names for the same behaviour', isCorrect: false },
    ],
    correctValue: 'fastest return without overshoot',
    targetedMisconceptions: [],
    source: src('phys.wave.damped-oscillations', 'critical damping is a FASTEST-return condition, not a most-damped one; "more damping is always better" is the intuition that makes over-damping look like an improvement'),
  },
  {
    conceptId: 'phys.wave.damped-oscillations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Car suspensions are designed to sit close to critical damping. Why not use very light damping instead, which wastes far less energy?',
    choices: [
      { text: 'The car would keep bouncing after every bump — the wheels would repeatedly lose contact with the road, which costs both comfort and grip', isCorrect: true },
      { text: 'Light damping would overstress and eventually snap the springs', isCorrect: false },
      { text: 'Light damping raises the natural frequency into the audible range', isCorrect: false },
      { text: 'There is no reason — heavier damping is simply always better', isCorrect: false },
    ],
    correctValue: 'it would keep oscillating',
    targetedMisconceptions: [],
    source: src('phys.wave.damped-oscillations', 'the engineering reason a damping REGIME is chosen rather than minimised — a worn shock absorber is a lightly damped suspension, and it is a safety fault'),
  },

  {
    conceptId: 'phys.wave.doppler-effect', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A siren emitting 500 Hz moves towards a stationary listener at 34 m/s. The speed of sound is 340 m/s. What frequency does the listener hear?',
    choices: [
      { text: 'About 556 Hz', isCorrect: true },
      { text: 'About 455 Hz — using v + v_s in the denominator', isCorrect: false },
      { text: '500 Hz — the source frequency is what it is', isCorrect: false },
      { text: '534 Hz', isCorrect: false },
    ],
    correctValue: '556 Hz',
    targetedMisconceptions: [],
    source: src('phys.wave.doppler-effect', "f' = f·v/(v − v_s) = 500 × 340/306 ≈ 556 Hz. The 455 Hz option puts the sign the wrong way and predicts a DROP for an approaching source, which the everyday observation immediately contradicts"),
  },
  {
    conceptId: 'phys.wave.doppler-effect', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'For sound, a moving source and a moving listener at the SAME speed do not give exactly the same frequency shift. Why not?',
    choices: [
      { text: 'The air itself picks out a rest frame: a moving source bunches the wavefronts closer together, while a moving listener simply meets more of them per second. The two mechanisms give different formulas', isCorrect: true },
      { text: 'They do give exactly the same shift — the difference is only apparent', isCorrect: false },
      { text: 'Only a moving source produces any shift at all', isCorrect: false },
      { text: 'The difference is caused by wind moving the air', isCorrect: false },
    ],
    correctValue: 'the medium defines a rest frame',
    targetedMisconceptions: [],
    source: src('phys.wave.doppler-effect', 'the asymmetry is a statement about the MEDIUM, and it is exactly what disappears for light — which is why the relativistic Doppler formula depends only on relative velocity'),
  },

  {
    conceptId: 'phys.wave.forced-oscillations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A driven oscillator is left running until the transient has died away. At what frequency is it then oscillating?',
    choices: [
      { text: 'At the DRIVING frequency — not at its own natural frequency', isCorrect: true },
      { text: 'At its own natural frequency, whatever the driver does', isCorrect: false },
      { text: 'At the average of the driving and natural frequencies', isCorrect: false },
      { text: 'At whichever of the two frequencies is higher', isCorrect: false },
    ],
    correctValue: 'the driving frequency',
    targetedMisconceptions: [],
    source: src('phys.wave.forced-oscillations', 'the steady state belongs to the DRIVER; the natural frequency only decides how large the response is, not how fast it happens. This is the single most common error in the topic'),
  },
  {
    conceptId: 'phys.wave.forced-oscillations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two identical oscillators are each driven at resonance, one lightly damped and one heavily damped. Compare their peak amplitudes and the widths of their resonance curves.',
    choices: [
      { text: 'The lightly damped one peaks much higher AND its peak is much narrower — light damping gives a tall, sharp resonance', isCorrect: true },
      { text: 'The peaks reach the same height; only the widths differ', isCorrect: false },
      { text: 'The heavily damped one peaks higher, because it absorbs more energy from the driver', isCorrect: false },
      { text: 'Damping changes neither the height nor the width', isCorrect: false },
    ],
    correctValue: 'taller and narrower',
    targetedMisconceptions: [],
    source: src('phys.wave.forced-oscillations', 'height and sharpness are the same parameter seen twice, which is why a high-Q system is both violent at resonance and easy to miss when tuning'),
  },

  {
    conceptId: 'phys.wave.interference', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What must be true of two sources for them to produce a STABLE interference pattern?',
    choices: [
      { text: 'They must be coherent — the same frequency, holding a constant phase relationship', isCorrect: true },
      { text: 'They must have exactly equal amplitudes', isCorrect: false },
      { text: 'They must be the same distance from the screen', isCorrect: false },
      { text: 'They must have different frequencies, or the pattern would not vary', isCorrect: false },
    ],
    correctValue: 'coherence',
    targetedMisconceptions: [],
    source: src('phys.wave.interference', 'coherence is the condition; equal amplitude only affects how COMPLETE the cancellation is, which is what the concept\'s existing unequal-amplitude probe covers'),
  },
  {
    conceptId: 'phys.wave.interference', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'At the dark fringes of an interference pattern, no light arrives. Where has that energy gone?',
    choices: [
      { text: 'Nowhere — it is redistributed into the bright fringes, which are brighter than either source alone. Added over the whole pattern, the energy is unchanged', isCorrect: true },
      { text: 'It is converted into heat where the waves cancel', isCorrect: false },
      { text: 'It is destroyed — that is what destructive interference means', isCorrect: false },
      { text: 'It is absorbed by the screen at those points', isCorrect: false },
    ],
    correctValue: 'redistributed into the bright fringes',
    targetedMisconceptions: [],
    source: src('phys.wave.interference', 'the energy-conservation question destructive interference always raises; "destroyed" is the reading the word DESTRUCTIVE actively encourages'),
  },

  {
    conceptId: 'phys.wave.longitudinal-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A sound wave travels through air. Which two quantities reach a maximum at the SAME points in the wave?',
    choices: [
      { text: 'Pressure and density — both peak at the compressions', isCorrect: true },
      { text: 'Pressure and particle displacement', isCorrect: false },
      { text: 'Particle displacement and density', isCorrect: false },
      { text: 'Particle velocity and particle displacement', isCorrect: false },
    ],
    correctValue: 'pressure and density',
    targetedMisconceptions: [],
    source: src('phys.wave.longitudinal-waves', 'pressure and displacement are a quarter-cycle out of step — displacement is ZERO at a compression — which is why a pressure graph and a displacement graph of the same sound look nothing alike'),
  },
  {
    conceptId: 'phys.wave.longitudinal-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Longitudinal mechanical waves travel through liquids and gases, but transverse mechanical waves generally do not. Why?',
    choices: [
      { text: 'A transverse wave needs the medium to resist SHEAR, and fluids do not. Fluids do resist compression, which is all a longitudinal wave requires', isCorrect: true },
      { text: 'Longitudinal waves travel faster, so they get through before the medium can absorb them', isCorrect: false },
      { text: 'Because liquids and gases have no fixed surface for a transverse wave to move', isCorrect: false },
      { text: 'Because longitudinal waves have much longer wavelengths', isCorrect: false },
    ],
    correctValue: 'fluids resist compression but not shear',
    targetedMisconceptions: [],
    source: src('phys.wave.longitudinal-waves', 'the restoring force is what decides which wave a medium can carry; this is exactly why seismic S-waves do not cross the Earth\'s liquid outer core, which is how the core was discovered'),
  },

  {
    conceptId: 'phys.wave.pendulum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A simple pendulum has a period of 2.0 s. Its length is then QUADRUPLED. What is the new period?',
    choices: [
      { text: '4.0 s', isCorrect: true },
      { text: '8.0 s — the period follows the length directly', isCorrect: false },
      { text: '1.0 s', isCorrect: false },
      { text: '2.0 s — the period does not depend on the length', isCorrect: false },
    ],
    correctValue: '4.0 s',
    targetedMisconceptions: [],
    source: src('phys.wave.pendulum', 'T = 2π√(L/g), so quadrupling L doubles T. The 8.0 s option reads the proportionality straight through, which is the same slip as the spring-mass mass question'),
  },
  {
    conceptId: 'phys.wave.pendulum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A pendulum clock keeping perfect time on Earth is taken to the Moon, where g is about one sixth of its value on Earth. Does it run fast or slow, and by roughly what factor?',
    choices: [
      { text: 'Slow, by a factor of about √6 ≈ 2.4 — the period goes as 1/√g', isCorrect: true },
      { text: 'Slow, by a factor of 6', isCorrect: false },
      { text: 'Fast, by a factor of about 2.4 — weaker gravity means less resistance to swinging', isCorrect: false },
      { text: 'Unchanged — a pendulum\'s period does not depend on the mass, so gravity cannot matter either', isCorrect: false },
    ],
    correctValue: 'slow by about 2.4x',
    targetedMisconceptions: [],
    source: src('phys.wave.pendulum', 'the last option is the interesting one: mass-independence is genuinely true and is regularly over-generalised into gravity-independence, which is exactly backwards — g is the only external quantity in T = 2π√(L/g)'),
  },

  {
    conceptId: 'phys.wave.shm', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the defining condition for a motion to count as simple harmonic motion?',
    choices: [
      { text: 'The restoring force is proportional to the displacement and always directed back towards equilibrium — equivalently, a = −ω²x', isCorrect: true },
      { text: 'The motion repeats itself at regular intervals', isCorrect: false },
      { text: 'The speed of the object stays constant throughout', isCorrect: false },
      { text: 'The path traced out is a circle', isCorrect: false },
    ],
    correctValue: 'a = -omega^2 x',
    targetedMisconceptions: [],
    source: src('phys.wave.shm', 'periodicity is NECESSARY and nowhere near sufficient — a bouncing ball repeats and is not SHM. The definition is about the force law, not the shape of the motion'),
  },
  {
    conceptId: 'phys.wave.shm', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'In simple harmonic motion, where is the acceleration greatest, and where is it zero?',
    choices: [
      { text: 'Greatest at maximum displacement (±A), and zero at the equilibrium position', isCorrect: true },
      { text: 'Greatest at the equilibrium position, and zero at ±A', isCorrect: false },
      { text: 'Constant throughout the oscillation', isCorrect: false },
      { text: 'Greatest halfway between equilibrium and maximum displacement', isCorrect: false },
    ],
    correctValue: 'greatest at +/-A, zero at equilibrium',
    targetedMisconceptions: [],
    source: src('phys.wave.shm', 'the second option is the SPEED answer given to the acceleration question — speed and acceleration are exactly out of step in SHM, and swapping them is the standard error'),
  },

  {
    conceptId: 'phys.wave.shm-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A mass on a spring oscillates in SHM with amplitude A. At what displacement is the kinetic energy exactly equal to the potential energy?',
    choices: [
      { text: 'At x = A/√2, about 0.71A', isCorrect: true },
      { text: 'At x = A/2 — halfway out', isCorrect: false },
      { text: 'At x = A, the point of maximum displacement', isCorrect: false },
      { text: 'At x = 0, the equilibrium position', isCorrect: false },
    ],
    correctValue: 'A/sqrt(2)',
    targetedMisconceptions: [],
    source: src('phys.wave.shm-energy', 'PE = ½kx² is half of ½kA² when x² = A²/2. The A/2 option splits the DISPLACEMENT in half rather than the energy, and energy goes as the square'),
  },
  {
    conceptId: 'phys.wave.shm-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The amplitude of an SHM oscillator is doubled while the spring is unchanged. What happens to its total energy?',
    choices: [
      { text: 'It quadruples — the total energy is ½kA², so it goes as the square of the amplitude', isCorrect: true },
      { text: 'It doubles, in step with the amplitude', isCorrect: false },
      { text: 'It halves', isCorrect: false },
      { text: 'It is unchanged — energy is conserved in SHM', isCorrect: false },
    ],
    correctValue: 'it quadruples',
    targetedMisconceptions: [],
    source: src('phys.wave.shm-energy', 'the last option conflates conservation DURING an oscillation with the effect of setting up a different oscillation — a real and specific confusion, not a throwaway'),
  },

  {
    conceptId: 'phys.wave.sound-intensity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The decibel scale is logarithmic. An increase of 10 dB corresponds to what change in sound intensity?',
    choices: [
      { text: 'Ten times the intensity', isCorrect: true },
      { text: 'Ten joules more energy per second', isCorrect: false },
      { text: 'Twice the intensity', isCorrect: false },
      { text: 'A hundred times the intensity', isCorrect: false },
    ],
    correctValue: 'ten times',
    targetedMisconceptions: [],
    source: src('phys.wave.sound-intensity', 'the decibel as a RATIO in disguise; reading +10 dB as an additive amount of energy is what makes the scale look arbitrary rather than useful'),
  },
  {
    conceptId: 'phys.wave.sound-intensity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'You double your distance from a small sound source in the open air. By roughly how much does the sound intensity LEVEL fall?',
    choices: [
      { text: 'About 6 dB — the intensity falls to a quarter, and 10·log₁₀(4) ≈ 6', isCorrect: true },
      { text: 'About 3 dB — the intensity halves', isCorrect: false },
      { text: '10 dB', isCorrect: false },
      { text: '20 dB', isCorrect: false },
    ],
    correctValue: 'about 6 dB',
    targetedMisconceptions: [],
    source: src('phys.wave.sound-intensity', 'the inverse-square law and the decibel definition composed — two correct steps, and the 3 dB option is what you get from halving instead of quartering'),
  },

  {
    conceptId: 'phys.wave.sound-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Sound travels faster through warm air than through cold air. What is responsible?',
    choices: [
      { text: 'The molecules are moving faster at higher temperature, so a disturbance is handed on more quickly — the speed goes as √T', isCorrect: true },
      { text: 'Warm air is denser, and denser media carry sound faster', isCorrect: false },
      { text: 'Warm air is at higher pressure, which pushes the wave along', isCorrect: false },
      { text: 'Sound has a shorter wavelength in warm air', isCorrect: false },
    ],
    correctValue: 'faster molecular motion',
    targetedMisconceptions: [],
    source: src('phys.wave.sound-waves', 'warm air is LESS dense, so the density option is not merely wrong but backwards; sound speed in a gas depends on temperature and not on pressure at all'),
  },
  {
    conceptId: 'phys.wave.sound-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A sound wave passes from air into water, where it travels about 4.3 times faster. What happens to its frequency and to its wavelength?',
    choices: [
      { text: 'The frequency is unchanged — it is set by the source — so the wavelength must grow by the same factor of about 4.3', isCorrect: true },
      { text: 'Both the frequency and the wavelength increase by about 4.3', isCorrect: false },
      { text: 'The frequency increases by 4.3 and the wavelength is unchanged', isCorrect: false },
      { text: 'Both are unchanged; only the speed differs', isCorrect: false },
    ],
    correctValue: 'frequency fixed, wavelength grows',
    targetedMisconceptions: [],
    source: src('phys.wave.sound-waves', 'which of v = fλ is pinned by the SOURCE and which by the MEDIUM — the last option quietly denies that v = fλ has to hold at all'),
  },

  {
    conceptId: 'phys.wave.standing-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A string of length 1.2 m is fixed at both ends and vibrates in its fundamental mode. What is the wavelength of that standing wave?',
    choices: [
      { text: '2.4 m — the fundamental fits exactly half a wavelength between the fixed ends', isCorrect: true },
      { text: '1.2 m — one whole wavelength fits on the string', isCorrect: false },
      { text: '0.6 m', isCorrect: false },
      { text: '4.8 m', isCorrect: false },
    ],
    correctValue: '2.4 m',
    targetedMisconceptions: [],
    source: src('phys.wave.standing-waves', 'λ = 2L for the fundamental; the 1.2 m answer is what you get from picturing a full wave on the string rather than the single loop the fundamental actually is'),
  },
  {
    conceptId: 'phys.wave.standing-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A standing wave is made of two travelling waves, each of which carries energy. Why does the standing wave transport no net energy along the string?',
    choices: [
      { text: 'The two travelling waves carry equal energy in OPPOSITE directions, so the net transport is zero; the energy simply moves between kinetic and potential form in place', isCorrect: true },
      { text: 'Because the ends of the string are fixed and cannot move', isCorrect: false },
      { text: 'Because the amplitude of a standing wave is zero', isCorrect: false },
      { text: 'Because a standing wave is only a pattern, not a real wave', isCorrect: false },
    ],
    correctValue: 'equal and opposite energy transport',
    targetedMisconceptions: [],
    source: src('phys.wave.standing-waves', 'a standing wave is not a wave that fails to move — it is two that cancel their transport, which is why the energy still sloshes locally between KE and PE'),
  },

  {
    conceptId: 'phys.wave.superposition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two pulses of equal size and opposite sign travel towards each other along a rope. At the instant they exactly overlap, the rope looks completely flat. What has happened to the energy at that instant?',
    choices: [
      { text: 'It is all KINETIC — the rope is flat but every part of it is moving fast, which is why the pulses reappear a moment later', isCorrect: true },
      { text: 'It has been destroyed by the cancellation', isCorrect: false },
      { text: 'It has been converted into heat in the rope', isCorrect: false },
      { text: 'It is stored in the tension of the rope', isCorrect: false },
    ],
    correctValue: 'entirely kinetic',
    targetedMisconceptions: [],
    source: src('phys.wave.superposition', 'the flat instant is the moment cancellation looks like destruction; the pulses emerging unchanged afterwards is the observation the correct answer has to explain'),
  },
  {
    conceptId: 'phys.wave.superposition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The principle of superposition holds only for LINEAR waves. What does that restriction mean physically?',
    choices: [
      { text: 'The medium responds in proportion to the disturbance, so waves pass through one another unchanged — at very large amplitudes the response stops being proportional and this fails', isCorrect: true },
      { text: 'That the waves must travel along a straight line', isCorrect: false },
      { text: 'That the waves must all have the same frequency', isCorrect: false },
      { text: 'That the medium must be one-dimensional, like a rope or a string', isCorrect: false },
    ],
    correctValue: 'the medium responds proportionally',
    targetedMisconceptions: [],
    source: src('phys.wave.superposition', '"linear" is a statement about the MEDIUM, not the geometry; reading it as "in a straight line" is the word-level trap, and it hides the fact that superposition has a limit at all'),
  },

  {
    conceptId: 'phys.wave.transverse-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Light can be polarised but sound in air cannot. What does that tell you about the two?',
    choices: [
      { text: 'Light is transverse, so its oscillation has a direction across the line of travel that a filter can select; sound in air is longitudinal, and there is no such direction to select', isCorrect: true },
      { text: 'Sound is transverse and light is longitudinal', isCorrect: false },
      { text: 'Both can in fact be polarised; the difference is only practical', isCorrect: false },
      { text: 'It tells you nothing about the waves, only about the filters available', isCorrect: false },
    ],
    correctValue: 'light is transverse',
    targetedMisconceptions: [],
    source: src('phys.wave.transverse-waves', 'polarisation is the experimental test that distinguishes the two wave types, which is how light was established as transverse in the first place'),
  },
  {
    conceptId: 'phys.wave.transverse-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A transverse wave on a rope has amplitude 5 cm and wavelength 40 cm. How far does one single point on the rope travel during one complete period?',
    choices: [
      { text: '20 cm — four amplitudes: up 5, down 10, back up 5', isCorrect: true },
      { text: '40 cm — a point travels one wavelength per period', isCorrect: false },
      { text: '5 cm — one amplitude', isCorrect: false },
      { text: '10 cm — up and back down', isCorrect: false },
    ],
    correctValue: '20 cm',
    targetedMisconceptions: [],
    source: src('phys.wave.transverse-waves', 'the WAVE advances one wavelength per period; the MEDIUM does not advance at all and travels four amplitudes. The 40 cm option is that confusion exactly, and it is the same one the duck-on-a-pond probe attacks'),
  },

  {
    conceptId: 'phys.wave.wave-speed', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A guitar string is tightened, with nothing else changed. What happens to the speed of waves on the string, and to the pitch of the note?',
    choices: [
      { text: 'Both rise — v = √(T/μ), so more tension means faster waves, and a higher wave speed on the same length gives a higher fundamental frequency', isCorrect: true },
      { text: 'The wave speed rises but the pitch falls', isCorrect: false },
      { text: 'Both fall', isCorrect: false },
      { text: 'The wave speed is unchanged; only the pitch rises', isCorrect: false },
    ],
    correctValue: 'both rise',
    targetedMisconceptions: [],
    source: src('phys.wave.wave-speed', 'the chain from tension to speed to pitch, on the instrument where a learner has already felt the result; the last option is pitch treated as independent of anything mechanical'),
  },
  {
    conceptId: 'phys.wave.wave-speed', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Waves travel at 24 m/s along a string. The string is replaced with one of the same length and under the same tension, but with FOUR times the mass per unit length. What is the new wave speed?',
    choices: [
      { text: '12 m/s', isCorrect: true },
      { text: '6 m/s — dividing by the factor of four', isCorrect: false },
      { text: '48 m/s', isCorrect: false },
      { text: '96 m/s', isCorrect: false },
    ],
    correctValue: '12 m/s',
    targetedMisconceptions: [],
    source: src('phys.wave.wave-speed', 'v = √(T/μ), so quadrupling μ HALVES the speed. The 6 m/s option divides straight through, which is the same square-root omission as the spring-mass and pendulum questions elsewhere in this domain'),
  },

  // wave-properties: the mcq slot holds exactly ONE probe, so these go into the
  // misconception_probe ladder instead. See this section's header.
  {
    conceptId: 'phys.wave.wave-properties', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A student says: "If you make a wave bigger, it must also get longer — amplitude and wavelength go together." Is that right?',
    choices: [
      { text: 'No — amplitude and wavelength are independent. A loud low note and a quiet low note have the same wavelength and very different amplitudes', isCorrect: true },
      { text: 'Yes — a bigger wave is bigger in every dimension', isCorrect: false },
      { text: 'Yes, but only for sound waves', isCorrect: false },
      { text: 'No — they are related, but inversely: a bigger amplitude means a shorter wavelength', isCorrect: false },
    ],
    correctValue: 'they are independent',
    targetedMisconceptions: [],
    source: src('phys.wave.wave-properties', 'amplitude and wavelength are separate parameters of the same wave; treating "bigger" as one undifferentiated idea is what makes loudness and pitch impossible to keep apart'),
  },
  {
    conceptId: 'phys.wave.wave-properties', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A student says: "A wave carries the medium along with it — that is how it gets from one place to another." What is wrong?',
    choices: [
      { text: 'A wave transports ENERGY, not matter. Each part of the medium oscillates about a fixed position and ends up exactly where it started', isCorrect: true },
      { text: 'Nothing is wrong — that is precisely how a wave travels', isCorrect: false },
      { text: 'It is right for water waves but wrong for sound', isCorrect: false },
      { text: 'The medium does travel, but far more slowly than the wave', isCorrect: false },
    ],
    correctValue: 'energy travels, matter does not',
    targetedMisconceptions: [],
    source: src('phys.wave.wave-properties', 'the energy-not-matter rule stated as a general claim, where the concept\'s existing duck probe stages the same idea as a single observation; the water-waves exception is the version that survives the duck'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 5 — phys.mech @ HIGH, first seventeen short pairs.
// ═══════════════════════════════════════════════════════════════════════════

const MECH_A: SeedProbe[] = [
  {
    conceptId: 'phys.mech.acceleration', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A car\'s velocity–time graph is a single straight line sloping downwards. It crosses the time axis and carries on below it. Describe the motion.',
    choices: [
      { text: 'The acceleration is constant the whole time: the car slows, stops for an instant, then speeds up in the opposite direction', isCorrect: true },
      { text: 'The acceleration reverses direction at the moment the line crosses the axis', isCorrect: false },
      { text: 'The car stops permanently where the graph meets the axis', isCorrect: false },
      { text: 'The acceleration is zero at the crossing, because the velocity is zero there', isCorrect: false },
    ],
    correctValue: 'constant acceleration through a reversal',
    targetedMisconceptions: ['phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION'],
    source: src('phys.mech.acceleration', 'a straight line has ONE gradient, so nothing about the acceleration changes at the crossing; the last option is MC-ZERO-VELOCITY-ZERO-ACCELERATION read off a graph'),
  },
  {
    conceptId: 'phys.mech.angular-kinematics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A wheel starts from rest and reaches an angular velocity of 20 rad/s in 5.0 s, with constant angular acceleration. Through what angle does it turn in that time?',
    choices: [
      { text: '50 rad', isCorrect: true },
      { text: '100 rad — angular velocity multiplied by time', isCorrect: false },
      { text: '20 rad', isCorrect: false },
      { text: '4 rad — the angular acceleration', isCorrect: false },
    ],
    correctValue: '50 rad',
    targetedMisconceptions: [],
    source: src('phys.mech.angular-kinematics', 'θ = ½αt² with α = 4 rad/s². The 100 rad option uses the FINAL angular velocity as though it had applied throughout, which is the rotational form of the same error made in linear kinematics'),
  },
  {
    conceptId: 'phys.mech.angular-momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A spinning skater pulls her arms in, halving her moment of inertia. What happens to her angular velocity and to her rotational kinetic energy?',
    choices: [
      { text: 'Angular velocity doubles and kinetic energy DOUBLES — she does work with her muscles pulling her arms in against the outward pull', isCorrect: true },
      { text: 'Angular velocity doubles and the kinetic energy is unchanged, because energy is conserved', isCorrect: false },
      { text: 'Angular velocity halves and the kinetic energy halves with it', isCorrect: false },
      { text: 'Both are unchanged — pulling the arms in is an internal rearrangement', isCorrect: false },
    ],
    correctValue: 'omega doubles, KE doubles',
    targetedMisconceptions: [],
    source: src('phys.mech.angular-momentum', 'L = Iω is conserved and KE = L²/2I is NOT — halving I doubles the energy, and the missing work comes from the skater. The energy-is-conserved option is the most reasonable-sounding wrong answer in rotational mechanics'),
  },
  {
    conceptId: 'phys.mech.bernoulli', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Bernoulli\'s equation is a statement of which conservation law, applied to a flowing fluid?',
    choices: [
      { text: 'Conservation of energy, written per unit volume of fluid', isCorrect: true },
      { text: 'Conservation of mass', isCorrect: false },
      { text: 'Conservation of momentum', isCorrect: false },
      { text: 'Conservation of angular momentum', isCorrect: false },
    ],
    correctValue: 'energy per unit volume',
    targetedMisconceptions: [],
    source: src('phys.mech.bernoulli', 'the terms are a kinetic, a potential and a pressure energy density; conservation of MASS is the continuity equation, which is the other half of the pair and the distractor most often swapped in'),
  },
  {
    conceptId: 'phys.mech.bernoulli', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A shower curtain billows INWARDS, towards the running shower, rather than being pushed away. Why?',
    choices: [
      { text: 'The fast-moving air and water inside the shower lower the pressure there, so the higher still-air pressure outside pushes the curtain in', isCorrect: true },
      { text: 'The falling water strikes the curtain and drags it inwards', isCorrect: false },
      { text: 'The curtain picks up static charge and is attracted to the water', isCorrect: false },
      { text: 'Hot air rises and pulls the curtain up and inwards behind it', isCorrect: false },
    ],
    correctValue: 'lower pressure inside',
    targetedMisconceptions: [],
    source: src('phys.mech.bernoulli', 'the everyday case where the fluid moves TOWARDS the fast-flow region, which is the opposite of what pushing intuition predicts and is why this observation is worth the question'),
  },
  {
    conceptId: 'phys.mech.buoyancy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A block floats in water with exactly one third of its volume above the surface. What is the density of the block? (Water: 1000 kg/m³)',
    choices: [
      { text: 'About 667 kg/m³', isCorrect: true },
      { text: 'About 333 kg/m³ — matching the fraction ABOVE the surface', isCorrect: false },
      { text: '1500 kg/m³', isCorrect: false },
      { text: '1000 kg/m³ — anything that floats matches the water', isCorrect: false },
    ],
    correctValue: '667 kg/m^3',
    targetedMisconceptions: [],
    source: src('phys.mech.buoyancy', 'for a floating body the SUBMERGED fraction equals the density ratio: two thirds under gives 667 kg/m³. Reading the fraction off the visible part is the natural mistake, and it is the part you can see'),
  },
  {
    conceptId: 'phys.mech.canonical-transformations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What exactly does a canonical transformation preserve?',
    choices: [
      { text: 'The FORM of Hamilton\'s equations — the new coordinates and momenta obey the same equations of motion that the old ones did', isCorrect: true },
      { text: 'The numerical value of the Hamiltonian', isCorrect: false },
      { text: 'The kinetic energy of the system', isCorrect: false },
      { text: 'The coordinates themselves, which are merely relabelled', isCorrect: false },
    ],
    correctValue: 'the form of Hamilton equations',
    targetedMisconceptions: [],
    source: src('phys.mech.canonical-transformations', 'the value of H may well change; what may not is the STRUCTURE. Expecting the Hamiltonian to be invariant is what makes generating functions look arbitrary'),
  },
  {
    conceptId: 'phys.mech.canonical-transformations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is the practical payoff of looking for a canonical transformation in the first place?',
    choices: [
      { text: 'Finding coordinates in which more of them are cyclic — each cyclic coordinate hands you a conserved momentum, and enough of them make the problem exactly solvable', isCorrect: true },
      { text: 'Making the numerical value of the Hamiltonian as small as possible', isCorrect: false },
      { text: 'Removing the need to supply initial conditions', isCorrect: false },
      { text: 'Converting a quantum problem into a classical one', isCorrect: false },
    ],
    correctValue: 'more cyclic coordinates',
    targetedMisconceptions: [],
    source: src('phys.mech.canonical-transformations', 'the motive, without which the machinery is a change of variables for its own sake; this is the idea Hamilton–Jacobi theory pushes to its limit'),
  },
  {
    conceptId: 'phys.mech.center-of-mass', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A firework shell is launched on a parabolic path and explodes in mid-air into many fragments. Ignoring air resistance, what does the centre of mass of all the fragments do afterwards?',
    choices: [
      { text: 'It carries on along exactly the same parabola the unexploded shell would have followed — the explosion forces are internal and cannot move it', isCorrect: true },
      { text: 'It stops at the point of the explosion', isCorrect: false },
      { text: 'It falls straight down from the point of the explosion', isCorrect: false },
      { text: 'It ceases to be defined once the shell is no longer a single object', isCorrect: false },
    ],
    correctValue: 'it continues on the same parabola',
    targetedMisconceptions: [],
    source: src('phys.mech.center-of-mass', 'internal forces cannot shift the centre of mass — the cleanest demonstration there is, because the fragments visibly go everywhere and their average does not'),
  },
  {
    conceptId: 'phys.mech.circular-motion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 0.50 kg ball on the end of a 2.0 m string is swung in a horizontal circle at a steady 4.0 m/s. What centripetal force is required?',
    choices: [
      { text: '4.0 N', isCorrect: true },
      { text: '8.0 N', isCorrect: false },
      { text: '1.0 N', isCorrect: false },
      { text: '16 N — using v² and forgetting both the mass and the radius', isCorrect: false },
    ],
    correctValue: '4.0 N',
    targetedMisconceptions: [],
    source: src('phys.mech.circular-motion', 'F = mv²/r = 0.50 × 16 / 2.0 = 4.0 N; the concept\'s existing probes ask about DIRECTION and about whether there is acceleration at all, never for the size of the force'),
  },
  {
    conceptId: 'phys.mech.circular-motion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A ball is being whirled in a horizontal circle on a string when the string suddenly snaps. Which way does the ball travel immediately afterwards?',
    choices: [
      { text: 'Straight ahead along the tangent — in the direction it happened to be moving at that instant', isCorrect: true },
      { text: 'Radially outwards, away from the centre', isCorrect: false },
      { text: 'It carries on curving for a short while before straightening out', isCorrect: false },
      { text: 'Radially inwards, since the centripetal force was pointing that way', isCorrect: false },
    ],
    correctValue: 'along the tangent',
    targetedMisconceptions: [],
    source: src('phys.mech.circular-motion', 'the outward option is centrifugal force treated as real; the keep-curving option is impetus theory. Both are among the most persistent errors in mechanics and both are settled by the First Law'),
  },
  {
    conceptId: 'phys.mech.collisions-elastic', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which quantities are conserved in an ELASTIC collision, and which of those is lost in an inelastic one?',
    choices: [
      { text: 'Momentum and kinetic energy are both conserved in an elastic collision; in an inelastic one momentum is still conserved but kinetic energy is not', isCorrect: true },
      { text: 'Momentum only, in both cases — kinetic energy is never conserved in a real collision', isCorrect: false },
      { text: 'Kinetic energy in both, but momentum only in the elastic case', isCorrect: false },
      { text: 'Total energy and mass, which is what makes a collision elastic', isCorrect: false },
    ],
    correctValue: 'momentum always; KE only when elastic',
    targetedMisconceptions: [],
    source: src('phys.mech.collisions-elastic', 'momentum survives every collision and kinetic energy does not — the asymmetry is the whole reason the elastic/inelastic distinction exists, and the third option is it exactly reversed'),
  },
  {
    conceptId: 'phys.mech.collisions-elastic', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A light ball collides head-on and elastically with a stationary ball of very much greater mass. What happens, approximately?',
    choices: [
      { text: 'The light ball bounces back at almost its original speed, and the heavy one barely moves', isCorrect: true },
      { text: 'Both move forward afterwards, each at about half the original speed', isCorrect: false },
      { text: 'The light ball stops dead and the heavy one moves off', isCorrect: false },
      { text: 'They move off together, since the heavy ball cannot be pushed aside', isCorrect: false },
    ],
    correctValue: 'the light ball rebounds',
    targetedMisconceptions: [],
    source: src('phys.mech.collisions-elastic', 'the limiting case of the elastic formulae — a ball bouncing off a wall. The stops-dead option is the EQUAL-mass result, which the concept\'s existing probe covers and which is regularly over-generalised'),
  },
  {
    conceptId: 'phys.mech.collisions-inelastic', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 2.0 kg trolley moving at 3.0 m/s runs into a stationary 4.0 kg trolley and the two move off locked together. What is their common speed?',
    choices: [
      { text: '1.0 m/s', isCorrect: true },
      { text: '1.5 m/s — halving the original speed because the trolleys joined', isCorrect: false },
      { text: '3.0 m/s — momentum is conserved, so the speed is too', isCorrect: false },
      { text: '0.5 m/s', isCorrect: false },
    ],
    correctValue: '1.0 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.collisions-inelastic', 'p = 2.0 × 3.0 = 6.0 kg m/s shared over 6.0 kg gives 1.0 m/s. The 3.0 m/s option conserves the wrong quantity, and the 1.5 m/s option halves for the wrong reason — the masses are not equal'),
  },
  {
    conceptId: 'phys.mech.conservation-of-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 2.0 kg ball is dropped from a height of 5.0 m. Ignoring air resistance, how fast is it moving just before it lands? (g = 9.8 m/s²)',
    choices: [
      { text: 'About 9.9 m/s', isCorrect: true },
      { text: '98 m/s — using 2gh without taking the square root', isCorrect: false },
      { text: '49 m/s', isCorrect: false },
      { text: 'About 19.8 m/s — twice the correct answer, because the mass is 2 kg', isCorrect: false },
    ],
    correctValue: '9.9 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.conservation-of-energy', 'mgh = ½mv² gives v = √(2gh) = √98 ≈ 9.9 m/s, and the MASS CANCELS — the last option is offered because the stem supplies a mass that the answer does not need'),
  },
  {
    conceptId: 'phys.mech.conservation-of-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Energy is said to be conserved, yet a bouncing ball always ends up motionless on the floor. State precisely what conservation is claiming here.',
    choices: [
      { text: 'The energy has been transferred, not lost — into heat and sound in the ball, the floor and the air. Add all of it up and the total is unchanged', isCorrect: true },
      { text: 'Energy is only conserved in frictionless situations, and this is not one', isCorrect: false },
      { text: 'The ball\'s energy was destroyed on each impact with the floor', isCorrect: false },
      { text: 'Conservation applies to isolated single objects, and the ball is not isolated', isCorrect: false },
    ],
    correctValue: 'transferred to heat and sound',
    targetedMisconceptions: [],
    source: src('phys.mech.conservation-of-energy', 'the everyday observation that looks like a counter-example; the frictionless-only option is a real belief and it quietly makes the law useless for anything actual'),
  },
  {
    conceptId: 'phys.mech.conservative-forces', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which of these is a CONSERVATIVE force?',
    choices: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Sliding friction', isCorrect: false },
      { text: 'Air resistance', isCorrect: false },
      { text: 'The drag on an open parachute', isCorrect: false },
    ],
    correctValue: 'gravity',
    targetedMisconceptions: [],
    source: src('phys.mech.conservative-forces', 'sorting by example before the formal test; all three wrong options are dissipative, and grouping them is itself the thing being learnt'),
  },
  {
    conceptId: 'phys.mech.conservative-forces', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is the defining test for whether a force is conservative?',
    choices: [
      { text: 'The work it does around any CLOSED path is zero — equivalently, the work between two points does not depend on the route taken', isCorrect: true },
      { text: 'It always points towards a fixed centre', isCorrect: false },
      { text: 'It never does negative work on an object', isCorrect: false },
      { text: 'It conserves the momentum of the system it acts on', isCorrect: false },
    ],
    correctValue: 'zero work around a closed loop',
    targetedMisconceptions: [],
    source: src('phys.mech.conservative-forces', 'the closed-loop test is what makes a potential energy definable at all; "conserves momentum" is the answer the WORD conservative suggests and it is a different conservation law entirely'),
  },
  {
    conceptId: 'phys.mech.cyclic-coordinates-conservation-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What general connection does Noether\'s theorem state?',
    choices: [
      { text: 'Every continuous symmetry of the Lagrangian corresponds to a conserved quantity', isCorrect: true },
      { text: 'Every conserved quantity makes a coordinate cyclic in every coordinate system', isCorrect: false },
      { text: 'Any symmetry of the Lagrangian forces the Hamiltonian to be zero', isCorrect: false },
      { text: 'Conservation laws hold only for motion along closed orbits', isCorrect: false },
    ],
    correctValue: 'symmetry implies conservation',
    targetedMisconceptions: [],
    source: src('phys.mech.cyclic-coordinates-conservation-laws', 'the second option reverses the dependence: a coordinate is cyclic in SOME coordinate systems and not others, while the conservation law itself is coordinate-free'),
  },
  {
    conceptId: 'phys.mech.cyclic-coordinates-conservation-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A Lagrangian has no explicit dependence on time — t appears nowhere in it, only the coordinates and their velocities. Which quantity is conserved?',
    choices: [
      { text: 'Energy (the Hamiltonian)', isCorrect: true },
      { text: 'Linear momentum', isCorrect: false },
      { text: 'Angular momentum', isCorrect: false },
      { text: 'Electric charge', isCorrect: false },
    ],
    correctValue: 'energy',
    targetedMisconceptions: [],
    source: src('phys.mech.cyclic-coordinates-conservation-laws', 'the symmetry-to-conservation pairing least often stated in this form: translation gives momentum, rotation gives angular momentum, and TIME-translation gives energy'),
  },
  {
    conceptId: 'phys.mech.displacement', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A hiker walks 6.0 km due east and then 8.0 km due north. What is the MAGNITUDE of the displacement from the start?',
    choices: [
      { text: '10 km', isCorrect: true },
      { text: '14 km — adding the two legs, which is the distance walked', isCorrect: false },
      { text: '2 km — subtracting them', isCorrect: false },
      { text: '48 km', isCorrect: false },
    ],
    correctValue: '10 km',
    targetedMisconceptions: ['phys.mech.displacement:MC-DISPLACEMENT-IS-DISTANCE'],
    source: src('phys.mech.displacement', 'MC-DISPLACEMENT-IS-DISTANCE where the legs are at right angles: 14 km is the genuine distance walked, so the distractor is a correct answer to a different question'),
  },
  {
    conceptId: 'phys.mech.displacement', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'On a POSITION–time graph, what represents the displacement between two instants?',
    choices: [
      { text: 'The change in the position coordinate between them — the vertical gap between the two points on the curve', isCorrect: true },
      { text: 'The area under the curve between those two times', isCorrect: false },
      { text: 'The gradient of the curve midway between them', isCorrect: false },
      { text: 'The total length of the curve traced out between them', isCorrect: false },
    ],
    correctValue: 'the change in position',
    targetedMisconceptions: ['phys.mech.displacement:MC-DISPLACEMENT-IS-PATH'],
    source: src('phys.mech.displacement', 'the area option is the VELOCITY-time graph rule imported wholesale, and the curve-length option is MC-DISPLACEMENT-IS-PATH reappearing as a graph-reading habit'),
  },
  {
    conceptId: 'phys.mech.equilibrium', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A uniform plank 4.0 m long, weighing 200 N, rests on a support at each end. A person weighing 400 N stands 1.0 m from the left support. What upward force does the LEFT support provide?',
    choices: [
      { text: '400 N', isCorrect: true },
      { text: '300 N — splitting the total load equally between the supports', isCorrect: false },
      { text: '200 N', isCorrect: false },
      { text: '600 N — the whole load, since the person is nearer this support', isCorrect: false },
    ],
    correctValue: '400 N',
    targetedMisconceptions: [],
    source: src('phys.mech.equilibrium', 'moments about the right-hand support: 4R_L = 200 × 2.0 + 400 × 3.0 = 1600, so R_L = 400 N and R_R = 200 N. Splitting the 600 N equally ignores where the load sits, which is the entire content of a moments problem'),
  },
  {
    conceptId: 'phys.mech.escape-velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Escape velocity from the Earth is about 11.2 km/s. Must a rocket actually reach that speed in order to leave the Earth?',
    choices: [
      { text: 'No — escape velocity is the speed an UNPOWERED projectile would need from a single launch. A rocket under continuous thrust can leave at any speed, given enough fuel', isCorrect: true },
      { text: 'Yes — nothing can ever leave the Earth below that speed', isCorrect: false },
      { text: 'Yes, but only objects heavier than about a kilogram', isCorrect: false },
      { text: 'No, because escape velocity applies only to light and other radiation', isCorrect: false },
    ],
    correctValue: 'no — thrust changes the problem',
    targetedMisconceptions: [],
    source: src('phys.mech.escape-velocity', 'escape velocity is derived from energy conservation with NO further work done; a rocket keeps doing work, which is why real launches never approach 11.2 km/s at low altitude'),
  },
  {
    conceptId: 'phys.mech.escape-velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Escape velocity from a body of mass M and radius R is √(2GM/R). A body is compressed to half its radius with no change in mass. What happens to its escape velocity?',
    choices: [
      { text: 'It increases by a factor of √2, about 1.4', isCorrect: true },
      { text: 'It doubles', isCorrect: false },
      { text: 'It halves', isCorrect: false },
      { text: 'It is unchanged, because the mass has not changed', isCorrect: false },
    ],
    correctValue: 'x sqrt(2)',
    targetedMisconceptions: [],
    source: src('phys.mech.escape-velocity', 'R sits under a square root, so halving it multiplies the escape velocity by √2 — and repeating the compression is the road to the radius at which it reaches c'),
  },
  {
    conceptId: 'phys.mech.free-body-diagram', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A box is dragged across a rough floor at CONSTANT velocity by a horizontal rope. How many forces belong on the box\'s free-body diagram, and what are they?',
    choices: [
      { text: 'Four: weight down, normal force up, rope tension forward, friction backward', isCorrect: true },
      { text: 'Three: weight, normal force and tension — there is no friction, because the velocity is not changing', isCorrect: false },
      { text: 'Five: the four above plus a forward "force of motion" keeping the box going', isCorrect: false },
      { text: 'Two: the weight and the rope tension', isCorrect: false },
    ],
    correctValue: 'four forces',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-IS-IMPETUS'],
    source: src('phys.mech.free-body-diagram', 'the five-force option is MC-FORCE-IS-IMPETUS drawn on paper, and the three-force option reads constant velocity as "no friction" rather than as "friction exactly balances the pull"'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 6 — phys.mech @ HIGH, second seventeen short pairs.
// ═══════════════════════════════════════════════════════════════════════════

const MECH_B: SeedProbe[] = [
  {
    conceptId: 'phys.mech.friction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 5.0 kg crate slides across a level floor with a coefficient of kinetic friction of 0.30. What is the frictional force on it? (g = 9.8 m/s²)',
    choices: [
      { text: 'About 15 N', isCorrect: true },
      { text: '1.5 N — multiplying the coefficient by the mass instead of the weight', isCorrect: false },
      { text: '49 N — the weight, since friction opposes it', isCorrect: false },
      { text: '16.3 N — dividing the weight by the coefficient', isCorrect: false },
    ],
    correctValue: '14.7 N',
    targetedMisconceptions: [],
    source: src('phys.mech.friction', 'f = μN with N = mg = 49 N, giving 14.7 N. Using the MASS in place of the normal force is the standard slip and it is out by a factor of g'),
  },
  {
    conceptId: 'phys.mech.generalized-coordinates', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A double pendulum swings in a vertical plane: two rigid rods joined end to end, the upper one pinned to a fixed point. How many generalised coordinates does it need?',
    choices: [
      { text: 'Two — one angle for each rod', isCorrect: true },
      { text: 'Four — the x and y of each bob', isCorrect: false },
      { text: 'One — the whole thing swings as a unit', isCorrect: false },
      { text: 'Six — three coordinates for each rod', isCorrect: false },
    ],
    correctValue: 'two',
    targetedMisconceptions: [],
    source: src('phys.mech.generalized-coordinates', 'the four-coordinate answer counts Cartesian positions and ignores the two rigid-rod constraints, which is exactly the bookkeeping generalised coordinates exist to remove'),
  },
  {
    conceptId: 'phys.mech.gravitational-field', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The gravitational field strength at the Earth\'s surface is 9.8 N/kg. What is it at a point two Earth radii from the CENTRE of the Earth?',
    choices: [
      { text: 'About 2.5 N/kg', isCorrect: true },
      { text: '4.9 N/kg — half the surface value, since the distance has doubled', isCorrect: false },
      { text: '9.8 N/kg — the field of the Earth is the same everywhere', isCorrect: false },
      { text: '19.6 N/kg', isCorrect: false },
    ],
    correctValue: '2.45 N/kg',
    targetedMisconceptions: [],
    source: src('phys.mech.gravitational-field', 'inverse SQUARE: doubling r quarters the field, not halves it. Measuring from the centre rather than the surface is the second thing this question is checking'),
  },
  {
    conceptId: 'phys.mech.gravitational-field', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is g quoted sometimes as 9.8 m/s² and sometimes as 9.8 N/kg?',
    choices: [
      { text: 'They are the same quantity: force per unit mass is dimensionally and numerically identical to the free-fall acceleration it produces', isCorrect: true },
      { text: 'It is a coincidence of the SI system that the two numbers agree', isCorrect: false },
      { text: 'm/s² is for objects that are falling and N/kg for objects that are stationary', isCorrect: false },
      { text: 'N/kg is a rounded approximation used when precision is not needed', isCorrect: false },
    ],
    correctValue: 'the same quantity in two forms',
    targetedMisconceptions: [],
    source: src('phys.mech.gravitational-field', 'field strength and free-fall acceleration are one quantity, which is why a stationary object still sits in a field of 9.8 N/kg; the falling-versus-stationary option is the belief that makes field lines look like they switch off'),
  },
  {
    conceptId: 'phys.mech.gravitational-potential', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In the convention that goes with U = −GMm/r, where is the gravitational potential energy taken to be zero?',
    choices: [
      { text: 'At infinity — infinitely far from every mass', isCorrect: true },
      { text: 'At the surface of the Earth', isCorrect: false },
      { text: 'At the centre of the Earth', isCorrect: false },
      { text: 'At the height from which the object was released', isCorrect: false },
    ],
    correctValue: 'at infinity',
    targetedMisconceptions: [],
    source: src('phys.mech.gravitational-potential', 'the zero at infinity is what makes every bound U negative — the concept\'s existing probe asks WHY it is negative, and this asks what choice produced the sign'),
  },
  {
    conceptId: 'phys.mech.gravitational-potential', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which takes more energy: lifting a satellite from the Earth\'s surface (radius R) out to 2R from the centre, or lifting it from 2R out to 3R?',
    choices: [
      { text: 'From R to 2R — it needs GMm/2R against GMm/6R, three times as much', isCorrect: true },
      { text: 'From 2R to 3R, because you are working against gravity for longer', isCorrect: false },
      { text: 'They are equal — the same increase in radius in both cases', isCorrect: false },
      { text: 'It cannot be decided without knowing the satellite\'s mass', isCorrect: false },
    ],
    correctValue: 'R to 2R, three times as much',
    targetedMisconceptions: [],
    source: src('phys.mech.gravitational-potential', 'U goes as 1/r, so equal STEPS in radius are not equal steps in energy; the equal-steps option is the linear intuition mgh leaves behind'),
  },
  {
    conceptId: 'phys.mech.hamilton-jacobi-equation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the Hamilton–Jacobi method actually trying to achieve?',
    choices: [
      { text: 'A canonical transformation to new variables that are all CONSTANT, so that finding the transformation is the same as solving the motion', isCorrect: true },
      { text: 'A numerical approximation to the trajectory', isCorrect: false },
      { text: 'A way of quantising the system', isCorrect: false },
      { text: 'The elimination of the potential energy from the problem', isCorrect: false },
    ],
    correctValue: 'transform to constant variables',
    targetedMisconceptions: [],
    source: src('phys.mech.hamilton-jacobi-equation', 'the goal is what makes the machinery intelligible: if the new coordinates never change, the transformation itself IS the solution'),
  },
  {
    conceptId: 'phys.mech.hamilton-jacobi-equation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Hamilton\'s equations give 2n ordinary differential equations. The Hamilton–Jacobi equation replaces them with a single PARTIAL differential equation. When is that a good trade?',
    choices: [
      { text: 'When the PDE separates — each separation constant is then a conserved quantity, and a complete solution delivers the whole motion at once', isCorrect: true },
      { text: 'Always, because partial differential equations are easier to solve numerically', isCorrect: false },
      { text: 'When you want to avoid having to write down a Hamiltonian at all', isCorrect: false },
      { text: 'When the system has too many degrees of freedom, since the PDE reduces their number', isCorrect: false },
    ],
    correctValue: 'when it separates',
    targetedMisconceptions: [],
    source: src('phys.mech.hamilton-jacobi-equation', 'separability is the whole bargain, which is why the concept\'s existing probe asks whether separation is always available — it is not'),
  },
  {
    conceptId: 'phys.mech.hamiltonian', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Under what conditions is the Hamiltonian equal to the total energy of the system?',
    choices: [
      { text: 'When the relation between the generalised and Cartesian coordinates carries no explicit time dependence, and the potential does not depend on velocity', isCorrect: true },
      { text: 'Always — H is defined to be the total energy', isCorrect: false },
      { text: 'Whenever the system is conservative, and under no other condition', isCorrect: false },
      { text: 'Only for a single free particle', isCorrect: false },
    ],
    correctValue: 'time-independent constraints',
    targetedMisconceptions: [],
    source: src('phys.mech.hamiltonian', 'H = E is a theorem with hypotheses, not a definition — the concept\'s existing bead-on-an-outward-moving-wire probe is exactly the case where the hypothesis fails'),
  },
  {
    conceptId: 'phys.mech.hamiltons-equations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a system with n degrees of freedom, how many equations does the Hamiltonian formulation produce, and of what order?',
    choices: [
      { text: '2n first-order equations, in place of the n second-order Euler–Lagrange equations', isCorrect: true },
      { text: 'n first-order equations, so it is strictly simpler than the Lagrangian version', isCorrect: false },
      { text: '2n second-order equations', isCorrect: false },
      { text: 'n² equations, one for every pair of coordinates', isCorrect: false },
    ],
    correctValue: '2n first-order',
    targetedMisconceptions: [],
    source: src('phys.mech.hamiltons-equations', 'the trade is ORDER for NUMBER, not a straight reduction; expecting fewer equations is what makes the Hamiltonian formulation look like a step backwards'),
  },
  {
    conceptId: 'phys.mech.hamiltons-equations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What does the phase-space picture give you that configuration space does not?',
    choices: [
      { text: 'A single point fixes the entire future: position and momentum together are a complete state, which is why phase-space trajectories never cross', isCorrect: true },
      { text: 'Fewer dimensions to keep track of', isCorrect: false },
      { text: 'Automatic conservation of energy, whatever the Hamiltonian', isCorrect: false },
      { text: 'Freedom from having to specify initial conditions', isCorrect: false },
    ],
    correctValue: 'a point is a complete state',
    targetedMisconceptions: [],
    source: src('phys.mech.hamiltons-equations', 'phase space has MORE dimensions and buys determinism per point; the never-crossing property follows and is what makes the flow picture usable'),
  },
  {
    conceptId: 'phys.mech.hookes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How much elastic potential energy is stored in a spring of stiffness 400 N/m when it is extended by 0.10 m?',
    choices: [
      { text: '2.0 J', isCorrect: true },
      { text: '40 J — force multiplied by extension, without the factor of a half', isCorrect: false },
      { text: '4.0 J — leaving out the half', isCorrect: false },
      { text: '20 J', isCorrect: false },
    ],
    correctValue: '2.0 J',
    targetedMisconceptions: [],
    source: src('phys.mech.hookes-law', 'E = ½kx² = ½ × 400 × 0.010 = 2.0 J. The ½ is there because the force GROWS as you stretch, so the work is the area under a triangle — dropping it is the most common energy error in this topic'),
  },
  {
    conceptId: 'phys.mech.hookes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two identical springs are joined END TO END in series, and the same load is hung from the pair. Compared with a single spring, how far does the combination stretch, and what is its effective stiffness?',
    choices: [
      { text: 'Twice as far, and the effective stiffness is HALVED — each spring feels the full load and contributes its own extension', isCorrect: true },
      { text: 'Half as far, and the effective stiffness is doubled', isCorrect: false },
      { text: 'The same distance, since the load has not changed', isCorrect: false },
      { text: 'Four times as far, and the stiffness is quartered', isCorrect: false },
    ],
    correctValue: 'twice as far, half the stiffness',
    targetedMisconceptions: [],
    source: src('phys.mech.hookes-law', 'in SERIES each spring carries the full load, the opposite of the side-by-side case where each carries half; "two springs must be stronger" is the intuition both arrangements are testing from different sides'),
  },
  {
    conceptId: 'phys.mech.impulse', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'On a force–time graph for a collision, what does the AREA under the curve represent, and why does that matter?',
    choices: [
      { text: 'The impulse, and therefore the change in momentum — which is what makes a violently varying collision force usable, since only the area matters', isCorrect: true },
      { text: 'The average force during the collision', isCorrect: false },
      { text: 'The work done during the collision', isCorrect: false },
      { text: 'The momentum of the object, rather than its change', isCorrect: false },
    ],
    correctValue: 'the impulse',
    targetedMisconceptions: [],
    source: src('phys.mech.impulse', 'area under FORCE–TIME is impulse; area under force–DISTANCE is work. Swapping the two graphs is the standard confusion, and both are areas under a force curve'),
  },
  {
    conceptId: 'phys.mech.inclined-plane', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A block is released on a FRICTIONLESS incline of angle θ. What is its acceleration down the slope?',
    choices: [
      { text: 'g sin θ — and it does not depend on the mass of the block at all', isCorrect: true },
      { text: 'g cos θ', isCorrect: false },
      { text: 'g, whatever the angle — gravity is the only force acting', isCorrect: false },
      { text: 'g sin θ, but larger for a heavier block', isCorrect: false },
    ],
    correctValue: 'g sin(theta)',
    targetedMisconceptions: [],
    source: src('phys.mech.inclined-plane', 'the mass cancels exactly as it does in free fall, of which this is the tilted version; g cos θ is the NORMAL direction, and picking the wrong component is the standard resolution error'),
  },
  {
    conceptId: 'phys.mech.keplers-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A hypothetical planet orbits the Sun with a semi-major axis of 4 AU. Roughly what is its orbital period, in Earth years?',
    choices: [
      { text: 'About 8 years', isCorrect: true },
      { text: '4 years — the period follows the distance directly', isCorrect: false },
      { text: '16 years — the period goes as the square of the distance', isCorrect: false },
      { text: '64 years — the period goes as the cube of the distance', isCorrect: false },
    ],
    correctValue: '8 years',
    targetedMisconceptions: [],
    source: src('phys.mech.keplers-laws', 'T² = a³ in these units gives T = 4^1.5 = 8. The 16 and 64 options apply the square and the cube to the PERIOD instead of splitting them across the two sides'),
  },
  {
    conceptId: 'phys.mech.keplers-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Kepler produced three laws from Tycho Brahe\'s observations. What did Newton add to them?',
    choices: [
      { text: 'He DERIVED them, from the inverse-square law of gravitation together with his laws of motion — showing why they hold and where they need correcting', isCorrect: true },
      { text: 'He measured the planetary orbits far more accurately', isCorrect: false },
      { text: 'He showed that they apply only within the Solar System', isCorrect: false },
      { text: 'He replaced them with three different laws of his own', isCorrect: false },
    ],
    correctValue: 'he derived them from gravitation',
    targetedMisconceptions: [],
    source: src('phys.mech.keplers-laws', 'the difference between an empirical regularity and an explanation; Newton\'s derivation is also what reveals the corrections Kepler could not see, such as the two bodies orbiting their common centre of mass'),
  },
  {
    conceptId: 'phys.mech.kinematics-1d', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A stone is dropped from rest. How does the distance it falls during the THIRD second compare with the distance it falls during the first second?',
    choices: [
      { text: 'Five times as far', isCorrect: true },
      { text: 'Three times as far', isCorrect: false },
      { text: 'Nine times as far', isCorrect: false },
      { text: 'The same — it falls the same distance in every second', isCorrect: false },
    ],
    correctValue: 'five times',
    targetedMisconceptions: [],
    source: src('phys.mech.kinematics-1d', 's ∝ t² gives cumulative 4.9, 19.6, 44.1 m, so the individual seconds go 4.9, 14.7, 24.5 — the odd-number rule. The 9× option applies t² to the interval rather than to the elapsed time'),
  },
  {
    conceptId: 'phys.mech.moment-of-inertia', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A 2.0 kg point mass sits at the end of a light rod of length 0.50 m, and the assembly rotates about the far end of the rod. What is the moment of inertia?',
    choices: [
      { text: '0.50 kg m²', isCorrect: true },
      { text: '1.0 kg m² — mass multiplied by radius', isCorrect: false },
      { text: '0.25 kg m² — the radius squared, with the mass left out', isCorrect: false },
      { text: '2.0 kg m² — the mass, since a point has no extent', isCorrect: false },
    ],
    correctValue: '0.50 kg m^2',
    targetedMisconceptions: [],
    source: src('phys.mech.moment-of-inertia', 'I = mr² = 2.0 × 0.25 = 0.50. The distance enters SQUARED, which is the whole reason the distribution of mass matters more than its amount'),
  },
  {
    conceptId: 'phys.mech.momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is momentum conserved in a collision? Give the reason in terms of Newton\'s laws.',
    choices: [
      { text: 'By the Third Law the two objects push on each other with equal and opposite forces, for exactly the same length of time — so their momentum changes are equal and opposite and cancel', isCorrect: true },
      { text: 'Because kinetic energy is conserved, and momentum follows from it', isCorrect: false },
      { text: 'Because neither object changes its mass during the collision', isCorrect: false },
      { text: 'Because no external force can act on a system during a collision', isCorrect: false },
    ],
    correctValue: 'equal and opposite impulses',
    targetedMisconceptions: [],
    source: src('phys.mech.momentum', 'conservation of momentum is the Third Law plus equal contact times, which is why it survives collisions in which kinetic energy does not — the second option gets the dependency exactly backwards'),
  },
  {
    conceptId: 'phys.mech.newtons-second-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Newton wrote the second law as F = dp/dt rather than F = ma. In what circumstances do the two forms give different answers?',
    choices: [
      { text: 'Whenever the mass is changing — a rocket burning fuel, a trolley being loaded as it rolls, or a particle at relativistic speed. F = ma assumes the mass is constant', isCorrect: true },
      { text: 'They never differ; F = dp/dt is simply an older notation', isCorrect: false },
      { text: 'F = dp/dt applies only to rotational problems', isCorrect: false },
      { text: 'They differ only at very low speeds, where momentum is small', isCorrect: false },
    ],
    correctValue: 'when the mass changes',
    targetedMisconceptions: [],
    source: src('phys.mech.newtons-second-law', 'F = ma is the special case of a general law; a rocket is the everyday counter-example, and it is the reason rocket motion needs its own equation'),
  },
  {
    conceptId: 'phys.mech.newtons-third-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A horse refuses to pull a cart, reasoning that whatever force it exerts on the cart, the cart exerts an equal and opposite force back, so the pair can never accelerate. What is wrong with the argument?',
    choices: [
      { text: 'The two forces act on DIFFERENT bodies and so never appear in the same total. What accelerates the cart is the horse\'s pull on it; what accelerates the horse is the ground\'s friction on its hooves', isCorrect: true },
      { text: 'The horse\'s pull is in fact slightly larger than the cart\'s pull back', isCorrect: false },
      { text: 'The reaction force arrives a moment after the action, leaving time to move', isCorrect: false },
      { text: 'The Third Law does not apply when one of the objects is alive and supplying the effort', isCorrect: false },
    ],
    correctValue: 'the forces act on different bodies',
    targetedMisconceptions: ['phys.mech.newtons-third-law:MC-SAME-OBJECT-PAIR'],
    source: src('phys.mech.newtons-third-law', 'MC-SAME-OBJECT-PAIR in its oldest and most persuasive form; naming the GROUND as the source of the horse\'s forward force is what actually resolves it'),
  },
  {
    conceptId: 'phys.mech.normal-force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 70 kg person stands on a bathroom scale in a lift that is accelerating UPWARDS at 2.0 m/s². What does the scale read, in newtons? (g = 9.8 m/s²)',
    choices: [
      { text: 'About 826 N', isCorrect: true },
      { text: '686 N — the person\'s weight, since their mass has not changed', isCorrect: false },
      { text: '546 N', isCorrect: false },
      { text: '140 N — mass times the lift\'s acceleration', isCorrect: false },
    ],
    correctValue: '826 N',
    targetedMisconceptions: [],
    source: src('phys.mech.normal-force', 'N − mg = ma gives N = m(g + a) = 70 × 11.8 = 826 N. The scale reads the NORMAL FORCE, not the weight, which is the whole reason it changes in a lift while the mass does not'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 7 — phys.mech @ HIGH, the last seventeen short pairs. Domain complete.
// ═══════════════════════════════════════════════════════════════════════════

const MECH_C: SeedProbe[] = [
  {
    conceptId: 'phys.mech.orbital-mechanics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A satellite moves in a stable circular orbit at constant speed. It is nevertheless accelerating. In what direction?',
    choices: [
      { text: 'Towards the centre of the Earth, at every instant', isCorrect: true },
      { text: 'Forwards along its path, in the direction it is travelling', isCorrect: false },
      { text: 'Away from the Earth, which is what stops it falling', isCorrect: false },
      { text: 'It is not accelerating — its speed is constant', isCorrect: false },
    ],
    correctValue: 'towards the centre',
    targetedMisconceptions: [],
    source: src('phys.mech.orbital-mechanics', 'constant SPEED with changing direction is still acceleration; the outward option is centrifugal force treated as a real force holding the satellite up'),
  },
  {
    conceptId: 'phys.mech.orbital-mechanics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To raise a satellite into a HIGHER circular orbit you fire the engine and speed it up. Once it has settled into the new orbit, is it moving faster or slower than before?',
    choices: [
      { text: 'Slower — orbital speed falls as √(GM/r), so a higher orbit is a slower one. The energy went into gravitational potential', isCorrect: true },
      { text: 'Faster — you fired the engine, so it must be going faster', isCorrect: false },
      { text: 'At exactly the same speed, in a bigger circle', isCorrect: false },
      { text: 'It depends on the mass of the satellite', isCorrect: false },
    ],
    correctValue: 'slower',
    targetedMisconceptions: [],
    source: src('phys.mech.orbital-mechanics', 'the orbital paradox: adding energy lowers the speed because it raises r faster than it feeds kinetic energy — genuinely counter-intuitive and central to every orbital transfer'),
  },
  {
    conceptId: 'phys.mech.poisson-brackets', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A quantity f has no explicit time dependence and satisfies {f, H} = 0. What does that tell you about f?',
    choices: [
      { text: 'It is a constant of the motion — conserved along every trajectory', isCorrect: true },
      { text: 'That f itself is zero', isCorrect: false },
      { text: 'That f depends only on position and not on momentum', isCorrect: false },
      { text: 'That f cannot be measured while the system evolves', isCorrect: false },
    ],
    correctValue: 'it is conserved',
    targetedMisconceptions: [],
    source: src('phys.mech.poisson-brackets', 'df/dt = {f, H} makes the bracket a conservation TEST, which is why the concept\'s existing L_z probe is interesting: a bracket can vanish without either quantity doing so'),
  },
  {
    conceptId: 'phys.mech.poisson-brackets', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is the relationship between the classical Poisson bracket and the quantum commutator?',
    choices: [
      { text: 'The classical bracket {A, B} corresponds to the commutator [Â, B̂] divided by iħ — the same algebraic structure, which is why {x, p} = 1 and [x̂, p̂] = iħ', isCorrect: true },
      { text: 'They are unrelated pieces of mathematics that happen to share a notation', isCorrect: false },
      { text: 'The commutator is the classical limit of the Poisson bracket', isCorrect: false },
      { text: 'They are numerically equal for every pair of observables', isCorrect: false },
    ],
    correctValue: 'bracket -> commutator/(i hbar)',
    targetedMisconceptions: [],
    source: src('phys.mech.poisson-brackets', 'the direction matters: the classical bracket is the ħ → 0 limit of the commutator, not the other way round, which is what the third option reverses'),
  },
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A motor delivers a steady 1500 W. How much work does it do in 20 s?',
    choices: [
      { text: '30 000 J', isCorrect: true },
      { text: '75 J — dividing the power by the time', isCorrect: false },
      { text: '1500 J — the power is the work', isCorrect: false },
      { text: '300 J', isCorrect: false },
    ],
    correctValue: '30000 J',
    targetedMisconceptions: [],
    source: src('phys.mech.power', 'W = Pt, the relation used in the direction the concept\'s existing probes never take it — they all ask for a power'),
  },
  {
    conceptId: 'phys.mech.power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A car travels at a steady 25 m/s against a total resistive force of 600 N. What power must the engine deliver to keep it going?',
    choices: [
      { text: '15 kW', isCorrect: true },
      { text: '24 W — dividing the force by the speed', isCorrect: false },
      { text: '600 W — the resistive force, since the car is not accelerating', isCorrect: false },
      { text: '625 W', isCorrect: false },
    ],
    correctValue: '15000 W',
    targetedMisconceptions: [],
    source: src('phys.mech.power', 'P = Fv = 600 × 25 = 15 kW. The car does no NET work on itself at constant speed, which is exactly why the engine\'s output goes entirely into overcoming resistance — the situation the concept\'s existing constant-velocity probe sets up'),
  },
  {
    conceptId: 'phys.mech.pressure-fluids', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the pressure due to the water alone at a depth of 3.0 m in a freshwater lake? (ρ = 1000 kg/m³, g = 9.8 m/s²)',
    choices: [
      { text: 'About 29 kPa', isCorrect: true },
      { text: '3000 Pa — density multiplied by depth, without g', isCorrect: false },
      { text: '9800 Pa — the pressure at 1 m, for any depth', isCorrect: false },
      { text: '2940 Pa', isCorrect: false },
    ],
    correctValue: '29400 Pa',
    targetedMisconceptions: [],
    source: src('phys.mech.pressure-fluids', 'p = ρgh = 1000 × 9.8 × 3.0 = 29.4 kPa, and it depends on depth and nothing else — which is the point of the concept\'s existing barrel-versus-test-tube probe'),
  },
  {
    conceptId: 'phys.mech.pressure-fluids', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A hydraulic lift has a small piston of area 0.010 m² and a large piston of area 0.50 m². A force of 200 N is applied to the small piston. What weight can be supported on the large one?',
    choices: [
      { text: '10 000 N — the pressure is the same throughout, so the force scales with the area ratio of 50', isCorrect: true },
      { text: '200 N — force is transmitted unchanged through the fluid', isCorrect: false },
      { text: '4 N — the force divided by the area ratio', isCorrect: false },
      { text: '10 000 N, and the lift therefore produces energy from nothing', isCorrect: false },
    ],
    correctValue: '10000 N',
    targetedMisconceptions: [],
    source: src('phys.mech.pressure-fluids', 'Pascal\'s principle multiplies FORCE and not energy — the small piston travels 50 times further, which is why the last option, with the right number and the wrong conclusion, is offered'),
  },
  {
    conceptId: 'phys.mech.projectile-motion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A ball is launched at 20 m/s at 30° above the horizontal. What is the VERTICAL component of its initial velocity?',
    choices: [
      { text: '10 m/s', isCorrect: true },
      { text: '17.3 m/s — using the cosine instead of the sine', isCorrect: false },
      { text: '20 m/s — the whole launch speed acts upwards at first', isCorrect: false },
      { text: '6.7 m/s', isCorrect: false },
    ],
    correctValue: '10 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.projectile-motion', '20 sin 30° = 10 m/s. Swapping sine and cosine is the single most common projectile error and 17.3 is the horizontal component, so the distractor is a correct answer to the other half of the question'),
  },
  {
    conceptId: 'phys.mech.relative-motion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Car A travels east at 30 m/s and car B travels east at 20 m/s on the same straight road. What is B\'s velocity RELATIVE TO A?',
    choices: [
      { text: '10 m/s west — from A\'s point of view, B is falling behind', isCorrect: true },
      { text: '10 m/s east', isCorrect: false },
      { text: '50 m/s east — adding the two speeds', isCorrect: false },
      { text: '50 m/s west', isCorrect: false },
    ],
    correctValue: '10 m/s west',
    targetedMisconceptions: [],
    source: src('phys.mech.relative-motion', 'v_BA = v_B − v_A = −10 m/s. Adding rather than subtracting is the error for objects moving the SAME way, and the sign is what says which of them appears to fall behind'),
  },
  {
    conceptId: 'phys.mech.relative-motion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two cars approach the same junction along roads at right angles, each travelling at 15 m/s. What is the magnitude of one car\'s velocity relative to the other?',
    choices: [
      { text: 'About 21 m/s', isCorrect: true },
      { text: '30 m/s — adding the two speeds', isCorrect: false },
      { text: '0 m/s — they are travelling at the same speed', isCorrect: false },
      { text: '15 m/s — the relative speed is just the speed of either one', isCorrect: false },
    ],
    correctValue: '21.2 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.relative-motion', 'the subtraction is a VECTOR one: √(15² + 15²) ≈ 21.2 m/s. Equal speeds giving zero relative velocity is only true for equal VELOCITIES, which is what the zero option quietly assumes'),
  },
  {
    conceptId: 'phys.mech.rolling-motion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A wheel rolls along the ground without slipping. What is the velocity of the point of the wheel that is touching the ground, at that instant?',
    choices: [
      { text: 'Zero — that point is instantaneously at rest, which is exactly what rolling without slipping means', isCorrect: true },
      { text: 'The same as the velocity of the wheel\'s centre', isCorrect: false },
      { text: 'Twice the velocity of the centre', isCorrect: false },
      { text: 'Equal in size to the centre\'s velocity but pointing backwards', isCorrect: false },
    ],
    correctValue: 'zero',
    targetedMisconceptions: [],
    source: src('phys.mech.rolling-motion', 'the contact point is the instantaneous axis of rotation; the TOP of the wheel is the point moving at 2v, so that distractor is a correct answer about a different point'),
  },
  {
    conceptId: 'phys.mech.rotational-dynamics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the rotational counterpart of Newton\'s second law, and which quantity takes the place of mass?',
    choices: [
      { text: 'τ = Iα, with the moment of inertia I in the role of mass', isCorrect: true },
      { text: 'τ = mα — mass plays the same role in rotation as in translation', isCorrect: false },
      { text: 'F = Iα', isCorrect: false },
      { text: 'τ = Iω', isCorrect: false },
    ],
    correctValue: 'tau = I alpha',
    targetedMisconceptions: [],
    source: src('phys.mech.rotational-dynamics', 'τ = Iω is the ANGULAR MOMENTUM, not the rotational F = ma — the same slip as writing F = mv, and it is the one that makes rotational problems come out dimensionally wrong'),
  },
  {
    conceptId: 'phys.mech.satellites', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What provides the centripetal force that keeps a satellite in its orbit?',
    choices: [
      { text: 'The Earth\'s gravitational pull on the satellite', isCorrect: true },
      { text: 'The satellite\'s own engines, firing continuously', isCorrect: false },
      { text: 'The thin outer atmosphere pushing on it', isCorrect: false },
      { text: 'The Earth\'s magnetic field', isCorrect: false },
    ],
    correctValue: 'gravity',
    targetedMisconceptions: [],
    source: src('phys.mech.satellites', 'gravity is the centripetal force rather than something opposing it — the belief that engines are needed is the same one that makes orbital "weightlessness" look like an absence of gravity'),
  },
  {
    conceptId: 'phys.mech.satellites', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What orbital period must a geostationary satellite have?',
    choices: [
      { text: 'About 24 hours — one rotation of the Earth, so it keeps pace with a point on the ground', isCorrect: true },
      { text: 'About 90 minutes, like the ISS', isCorrect: false },
      { text: '12 hours, so that it passes over twice a day', isCorrect: false },
      { text: 'One year, matching the Earth\'s orbit of the Sun', isCorrect: false },
    ],
    correctValue: '24 hours',
    targetedMisconceptions: [],
    source: src('phys.mech.satellites', 'the period is what "geostationary" means, and Kepler\'s third law then FIXES the altitude — which is why the concept\'s existing probe asks whether any altitude will do'),
  },
  {
    conceptId: 'phys.mech.surface-tension', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does a small droplet of water in free fall take up a spherical shape?',
    choices: [
      { text: 'A sphere has the smallest surface area for a given volume, and surface tension acts to minimise surface area', isCorrect: true },
      { text: 'The surrounding air pushes on it equally from every direction', isCorrect: false },
      { text: 'Water molecules repel one another and spread out as evenly as they can', isCorrect: false },
      { text: 'Gravity acts equally in all directions on a falling object', isCorrect: false },
    ],
    correctValue: 'minimum surface area',
    targetedMisconceptions: [],
    source: src('phys.mech.surface-tension', 'the sphere comes from ATTRACTION between molecules minimising area, not from external pressure — the repulsion option gets the sign of the intermolecular force backwards'),
  },
  {
    conceptId: 'phys.mech.surface-tension', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A steel needle can be laid carefully on water and will stay on the surface, although steel is about eight times denser than water. What holds it up?',
    choices: [
      { text: 'Surface tension — the surface film is deformed but not broken, and it supports the needle. This is not flotation', isCorrect: true },
      { text: 'Buoyancy, exactly as for a floating boat', isCorrect: false },
      { text: 'A layer of air trapped underneath the needle', isCorrect: false },
      { text: 'Water is denser at the surface than lower down', isCorrect: false },
    ],
    correctValue: 'surface tension',
    targetedMisconceptions: [],
    source: src('phys.mech.surface-tension', 'the needle displaces nothing like its own weight of water, so buoyancy cannot be the answer; adding a drop of detergent sinks it immediately, which is the experiment that settles it'),
  },
  {
    conceptId: 'phys.mech.tension', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 10 kg mass hangs from a rope inside a lift that is accelerating DOWNWARDS at 3.0 m/s². What is the tension in the rope? (g = 9.8 m/s²)',
    choices: [
      { text: '68 N', isCorrect: true },
      { text: '98 N — the weight, since the mass has not changed', isCorrect: false },
      { text: '128 N — adding the two accelerations', isCorrect: false },
      { text: '30 N — mass times the lift\'s acceleration', isCorrect: false },
    ],
    correctValue: '68 N',
    targetedMisconceptions: [],
    source: src('phys.mech.tension', 'mg − T = ma gives T = m(g − a) = 68 N. The 128 N option is the same problem with the sign of the acceleration reversed, which is the answer for a lift accelerating UPWARDS'),
  },
  {
    conceptId: 'phys.mech.torque', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A force of 40 N is applied at the end of a 0.25 m spanner, at 60° to the spanner. What torque does it apply to the bolt?',
    choices: [
      { text: 'About 8.7 N·m', isCorrect: true },
      { text: '10 N·m — treating the force as perpendicular to the spanner', isCorrect: false },
      { text: '5.0 N·m — using the cosine of the angle', isCorrect: false },
      { text: '0 N·m — only a perpendicular force produces any torque at all', isCorrect: false },
    ],
    correctValue: '8.66 N m',
    targetedMisconceptions: [],
    source: src('phys.mech.torque', 'τ = rF sin θ = 0.25 × 40 × 0.866 ≈ 8.7 N·m. The 10 N·m option ignores the angle entirely and is the answer for θ = 90°, which is what most spanner diagrams show'),
  },
  {
    conceptId: 'phys.mech.universal-gravitation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two 5.0 kg masses sit 0.50 m apart. What is the gravitational force between them? (G = 6.67 × 10⁻¹¹ N m² kg⁻²)',
    choices: [
      { text: 'About 6.7 × 10⁻⁹ N', isCorrect: true },
      { text: 'About 3.3 × 10⁻⁹ N — using the distance rather than its square', isCorrect: false },
      { text: 'About 1.7 × 10⁻⁹ N', isCorrect: false },
      { text: '6.67 × 10⁻¹¹ N — the constant itself', isCorrect: false },
    ],
    correctValue: '6.67e-9 N',
    targetedMisconceptions: [],
    source: src('phys.mech.universal-gravitation', 'F = Gm₁m₂/r² = 6.67e-11 × 25 / 0.25 = 6.67e-9 N — small enough to show why gravity between everyday objects is never noticed, and why the constant had to be measured with a torsion balance'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A car covers the first 30 km of a journey at 60 km/h and the next 30 km at 30 km/h. What is its average speed for the whole 60 km?',
    choices: [
      { text: '40 km/h — the journey takes 0.5 h plus 1.0 h, so 60 km in 1.5 h', isCorrect: true },
      { text: '45 km/h — the average of the two speeds', isCorrect: false },
      { text: '90 km/h — the two speeds added', isCorrect: false },
      { text: '30 km/h — the slower speed governs the whole trip', isCorrect: false },
    ],
    correctValue: '40 km/h',
    targetedMisconceptions: [],
    source: src('phys.mech.velocity', 'average speed is TOTAL distance over TOTAL time, and the slower leg takes twice as long, so it carries more weight. Averaging the two speeds is the standard error and gives 45'),
  },
  {
    conceptId: 'phys.mech.velocity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'On a VELOCITY–time graph, what does the area between the curve and the time axis represent?',
    choices: [
      { text: 'The displacement — with any area below the axis counting as negative', isCorrect: true },
      { text: 'The acceleration', isCorrect: false },
      { text: 'The total distance travelled, whichever side of the axis the area lies on', isCorrect: false },
      { text: 'The average velocity over that interval', isCorrect: false },
    ],
    correctValue: 'the displacement',
    targetedMisconceptions: ['phys.mech.velocity:MC-SPEED-IS-VELOCITY'],
    source: src('phys.mech.velocity', 'signed area gives DISPLACEMENT and unsigned area gives distance — the third option is MC-SPEED-IS-VELOCITY in graph form, and it is right about the arithmetic and wrong about the quantity'),
  },
  {
    conceptId: 'phys.mech.viscosity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What does the viscosity of a fluid measure?',
    choices: [
      { text: 'Its internal resistance to flow — how strongly one layer of the fluid drags on the layer sliding past it', isCorrect: true },
      { text: 'Its density', isCorrect: false },
      { text: 'Its surface tension', isCorrect: false },
      { text: 'How much it can be compressed', isCorrect: false },
    ],
    correctValue: 'resistance to shear flow',
    targetedMisconceptions: [],
    source: src('phys.mech.viscosity', 'viscosity is about SHEAR between layers, not about heaviness — the concept\'s existing mercury probe exists precisely because density and viscosity are independent'),
  },
  {
    conceptId: 'phys.mech.viscosity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A small sphere falling through a viscous liquid reaches terminal velocity. What is true at that point?',
    choices: [
      { text: 'The weight is exactly balanced by buoyancy plus viscous drag, so the resultant force and the acceleration are both zero', isCorrect: true },
      { text: 'The drag has grown larger than the weight, which is what stops the sphere speeding up', isCorrect: false },
      { text: 'The sphere has run out of energy', isCorrect: false },
      { text: 'Buoyancy alone has grown enough to balance the weight', isCorrect: false },
    ],
    correctValue: 'forces balance, zero acceleration',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-CAUSES-MOTION'],
    source: src('phys.mech.viscosity', 'terminal velocity is BALANCE, not excess — drag exceeding weight would decelerate the sphere; the run-out-of-energy option is MC-FORCE-CAUSES-MOTION applied to a falling body'),
  },
  {
    conceptId: 'phys.mech.work', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A porter carries a 20 kg suitcase at a steady height along a level corridor for 30 m. How much work does the porter do on the suitcase against gravity?',
    choices: [
      { text: 'Zero — the supporting force is vertical and the displacement is horizontal, so they are perpendicular', isCorrect: true },
      { text: '5880 J — weight multiplied by distance', isCorrect: false },
      { text: '600 J — mass multiplied by distance', isCorrect: false },
      { text: '196 J', isCorrect: false },
    ],
    correctValue: 'zero',
    targetedMisconceptions: [],
    source: src('phys.mech.work', 'W = Fd cos θ with θ = 90° gives zero, however tiring the task feels. The physical definition of work and the everyday sense of it come apart most sharply here'),
  },
  {
    conceptId: 'phys.mech.work-energy-theorem', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'State the work–energy theorem.',
    choices: [
      { text: 'The NET work done on an object equals the change in its kinetic energy', isCorrect: true },
      { text: 'The net work done on an object equals its total energy', isCorrect: false },
      { text: 'The net work done on an object equals the change in its potential energy', isCorrect: false },
      { text: 'The net work done on an object equals its change in momentum', isCorrect: false },
    ],
    correctValue: 'net work equals change in KE',
    targetedMisconceptions: [],
    source: src('phys.mech.work-energy-theorem', 'the theorem names KINETIC energy specifically and NET work specifically; the momentum option is the impulse–momentum theorem, which is its exact structural twin and is regularly substituted for it'),
  },
  {
    conceptId: 'phys.mech.work-energy-theorem', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 1200 kg car braking from 20 m/s comes to rest after skidding 40 m. What average braking force acted on it?',
    choices: [
      { text: '6000 N', isCorrect: true },
      { text: '12 000 N — leaving out the factor of a half in the kinetic energy', isCorrect: false },
      { text: '3000 N', isCorrect: false },
      { text: '600 N — mass divided by the distance', isCorrect: false },
    ],
    correctValue: '6000 N',
    targetedMisconceptions: [],
    source: src('phys.mech.work-energy-theorem', '½ × 1200 × 20² = 240 kJ dissipated over 40 m gives 6000 N. Solving this with the kinematic equations takes three steps; the theorem takes one, which is the reason it earns its name'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 8 — the six phys.mech HIGH pairs the mcq ladder could not hold.
//
// Each of these already has THREE mcq rungs occupied and needs two probes, so
// one addition goes into the single free rung and the other opens a brand-new
// misconception_probe slot. None of the six has a misconception_probe at HIGH
// today, so nothing is re-identified — a new slot has no existing row to orphan.
// ═══════════════════════════════════════════════════════════════════════════

const MECH_D: SeedProbe[] = [
  {
    conceptId: 'phys.mech.conservation-of-angular-momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Under exactly what condition is the angular momentum of a system conserved?',
    choices: [
      { text: 'When no net external TORQUE acts on it', isCorrect: true },
      { text: 'When no net external force acts on it', isCorrect: false },
      { text: 'When its moment of inertia stays constant', isCorrect: false },
      { text: 'Always — angular momentum is conserved unconditionally', isCorrect: false },
    ],
    correctValue: 'no net external torque',
    targetedMisconceptions: [],
    source: src('phys.mech.conservation-of-angular-momentum', 'the condition is on TORQUE, not force: a force through the axis exerts no torque, and the skater changes her moment of inertia freely without breaking conservation'),
  },
  {
    conceptId: 'phys.mech.conservation-of-angular-momentum', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says: "Angular momentum is conserved, so a spinning skater\'s angular velocity cannot change." What is wrong?',
    choices: [
      { text: 'The conserved quantity is the PRODUCT L = Iω, not ω on its own. Pulling her arms in cuts I, so ω must rise to keep the product fixed', isCorrect: true },
      { text: 'Nothing is wrong — her rate of spin genuinely cannot change', isCorrect: false },
      { text: 'It is the other way round: ω is conserved and I is what changes', isCorrect: false },
      { text: 'Both I and ω are conserved separately, so neither can change', isCorrect: false },
    ],
    correctValue: 'the product is conserved, not omega',
    targetedMisconceptions: [],
    source: src('phys.mech.conservation-of-angular-momentum', 'a conservation law pins a product and leaves its factors free — the same structure as pV in an isothermal process, and the same place learners fix the wrong quantity'),
  },
  {
    conceptId: 'phys.mech.conservation-of-momentum', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 60 kg astronaut is at rest in deep space and throws a 2.0 kg tool away at 15 m/s. What is the astronaut\'s recoil speed?',
    choices: [
      { text: '0.50 m/s', isCorrect: true },
      { text: '15 m/s — equal and opposite to the tool', isCorrect: false },
      { text: '30 m/s', isCorrect: false },
      { text: '0.033 m/s', isCorrect: false },
    ],
    correctValue: '0.50 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.conservation-of-momentum', 'the total momentum stays zero, so 60v = 2.0 × 15 gives v = 0.50 m/s. Equal and opposite MOMENTA do not mean equal and opposite speeds, which is what the 15 m/s option assumes'),
  },
  {
    conceptId: 'phys.mech.conservation-of-momentum', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says: "Momentum is only conserved in elastic collisions — inelastic ones lose energy, so they must lose momentum too." What is wrong?',
    choices: [
      { text: 'Momentum is conserved in BOTH. What an inelastic collision loses is kinetic energy, to heat and deformation — the two conservation laws are independent', isCorrect: true },
      { text: 'Nothing is wrong — losing energy does mean losing momentum', isCorrect: false },
      { text: 'It is backwards: momentum is conserved only in inelastic collisions', isCorrect: false },
      { text: 'Neither quantity is really conserved in any collision between real objects', isCorrect: false },
    ],
    correctValue: 'momentum is conserved in both',
    targetedMisconceptions: [],
    source: src('phys.mech.conservation-of-momentum', 'energy and momentum are separate ledgers; treating them as one is what makes an inelastic collision look like it breaks a conservation law rather than defining a category'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Three forces act on a single point object and it stays in equilibrium. What must be true of them?',
    choices: [
      { text: 'They add as VECTORS to zero — drawn head to tail they close into a triangle', isCorrect: true },
      { text: 'All three must have the same magnitude', isCorrect: false },
      { text: 'They must all act along the same straight line', isCorrect: false },
      { text: 'Two of them must cancel exactly, and the third must be zero', isCorrect: false },
    ],
    correctValue: 'they form a closed triangle',
    targetedMisconceptions: [],
    source: src('phys.mech.force', 'the closed-triangle condition is what makes three-force equilibrium solvable by drawing; the last option is the two-force case over-generalised, and it is the reason a third force feels like it must be redundant'),
  },
  {
    conceptId: 'phys.mech.force', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says: "Anything that is moving must have a force pushing it in the direction it is going, or it would not still be moving." What is wrong?',
    choices: [
      { text: 'Motion at constant velocity needs no force at all. A force is required only to CHANGE a velocity — that is the First Law', isCorrect: true },
      { text: 'Nothing is wrong — that is what keeps things moving', isCorrect: false },
      { text: 'The force is supplied at the start and is then gradually used up as the object travels', isCorrect: false },
      { text: 'It is true, but only for objects heavier than about a kilogram', isCorrect: false },
    ],
    correctValue: 'no force is needed for constant velocity',
    targetedMisconceptions: ['phys.mech.force:MC-FORCE-CAUSES-MOTION', 'phys.mech.force:MC-FORCE-IS-IMPETUS'],
    source: src('phys.mech.force', 'MC-FORCE-CAUSES-MOTION in the stem and MC-FORCE-IS-IMPETUS in the third option — the two are the same belief at different stages of repair, and separating them is what tells you which one the learner still holds'),
  },
  {
    conceptId: 'phys.mech.kinematics-2d', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A boat that moves at 4.0 m/s in still water is pointed straight across a river that flows at 3.0 m/s. What is the boat\'s speed relative to the bank?',
    choices: [
      { text: '5.0 m/s', isCorrect: true },
      { text: '7.0 m/s — adding the two speeds', isCorrect: false },
      { text: '1.0 m/s — subtracting them', isCorrect: false },
      { text: '4.0 m/s — the current only changes the direction, not the speed', isCorrect: false },
    ],
    correctValue: '5.0 m/s',
    targetedMisconceptions: [],
    source: src('phys.mech.kinematics-2d', 'the two velocities are PERPENDICULAR, so they combine by Pythagoras rather than by adding or subtracting — the 3-4-5 numbers make the vector step visible rather than arithmetic'),
  },
  {
    conceptId: 'phys.mech.kinematics-2d', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says: "A projectile\'s horizontal motion must slow down, because gravity is pulling on it the whole time." What is wrong?',
    choices: [
      { text: 'Gravity acts vertically only. With air resistance ignored, the horizontal velocity never changes — the two axes are completely independent', isCorrect: true },
      { text: 'Nothing is wrong — gravity slows everything down eventually', isCorrect: false },
      { text: 'The horizontal motion actually speeds up as the projectile falls', isCorrect: false },
      { text: 'Gravity acts along the projectile\'s curved path, so it slows the motion along that path', isCorrect: false },
    ],
    correctValue: 'the axes are independent',
    targetedMisconceptions: [],
    source: src('phys.mech.kinematics-2d', 'axis independence is the whole method of 2D kinematics; the last option is gravity imagined as acting along the trajectory, which is the picture the curved path invites'),
  },
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two objects have exactly the same kinetic energy. Object A has four times the mass of object B. How do their speeds compare?',
    choices: [
      { text: 'B is moving twice as fast as A', isCorrect: true },
      { text: 'B is moving four times as fast as A', isCorrect: false },
      { text: 'A is moving twice as fast as B', isCorrect: false },
      { text: 'They are moving at the same speed', isCorrect: false },
    ],
    correctValue: 'B is twice as fast',
    targetedMisconceptions: [],
    source: src('phys.mech.kinetic-energy', 'equal ½mv² with four times the mass needs half the speed, because v goes as 1/√m — the four-times option carries the mass ratio straight across without the square root'),
  },
  {
    conceptId: 'phys.mech.kinetic-energy', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says: "A car at 100 km/h has twice the kinetic energy it had at 50 km/h." What is wrong, and why does it matter on the road?',
    choices: [
      { text: 'It has FOUR times as much, because kinetic energy goes as the square of the speed — which is why braking distance grows so sharply with speed', isCorrect: true },
      { text: 'Nothing is wrong — doubling the speed doubles the energy', isCorrect: false },
      { text: 'It has half as much, because it spends less time on the road', isCorrect: false },
      { text: 'It cannot be answered without knowing the mass of the car', isCorrect: false },
    ],
    correctValue: 'four times',
    targetedMisconceptions: [],
    source: src('phys.mech.kinetic-energy', 'the RATIO needs no mass, which is what the last option misses; the square law is also the single most consequential piece of physics in road safety'),
  },
  {
    conceptId: 'phys.mech.potential-energy', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 2.0 kg book is lifted 1.5 m onto a shelf. How much gravitational potential energy does it gain? (g = 9.8 m/s²)',
    choices: [
      { text: 'About 29 J', isCorrect: true },
      { text: '3.0 J — mass multiplied by height', isCorrect: false },
      { text: '19.6 J — leaving the height out', isCorrect: false },
      { text: '13.1 J', isCorrect: false },
    ],
    correctValue: '29.4 J',
    targetedMisconceptions: [],
    source: src('phys.mech.potential-energy', 'ΔU = mgΔh = 2.0 × 9.8 × 1.5 = 29.4 J; the concept\'s existing probes ask about the CHOICE of reference level and about a ramp, never for a plain value'),
  },
  {
    conceptId: 'phys.mech.potential-energy', subjectSlug: S, probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student says: "Gravitational potential energy is stored inside the object, like fuel in a tank." What is wrong?',
    choices: [
      { text: 'It belongs to the SYSTEM of the object and the Earth together — it is a property of their separation, not something the object carries', isCorrect: true },
      { text: 'Nothing is wrong — that is exactly where it is kept', isCorrect: false },
      { text: 'It is stored in the air surrounding the object', isCorrect: false },
      { text: 'It is stored in the object\'s mass, and the object weighs fractionally more when raised', isCorrect: false },
    ],
    correctValue: 'it belongs to the system',
    targetedMisconceptions: [],
    source: src('phys.mech.potential-energy', 'PE as a relationship rather than a substance is what makes the arbitrary zero level sensible — the concept\'s existing two-students probe shows the consequence, and this asks for the reason behind it'),
  },
]

/**
 * Every probe-depth probe. One array, in the order the audit reported the
 * pairs — `seed-knowledge-assets.ts`, the cold-start bootstrap and the
 * contract tests all scan for a `*_PROBES` export, so splitting them would
 * only make a partial import possible.
 */
export const PHYSICS_DEPTH_PROBES: SeedProbe[] = [
  ...UNITS,
  ...SCALARS_VECTORS,
  ...VELOCITY,
  ...DISPLACEMENT,
  ...ACCELERATION,
  ...FORCE,
  ...N1,
  ...N2,
  ...N3,
  ...MOMENTUM,
  ...IMPULSE,
  ...POWER,
  ...KINEMATICS,
  ...KINETIC_ENERGY,
  ...HOOKES_LAW,
  // Batch 2 — the eight HIGH-band concepts measured one answer short.
  ...ELECTRIC_FIELD, ...REFRIGERATORS, ...STRESS_STRAIN, ...SPRING_MASS,
  ...EULER_LAGRANGE, ...THERMO_PROCESSES, ...BINDING_ENERGY, ...QUANTUM_TUNNELING,
  // Batch 3 — phys.therm @ HIGH, all sixteen short pairs.
  ...THERM,
  // Batch 4 — phys.wave @ HIGH, all sixteen short pairs.
  ...WAVE,
  // Batch 5 — phys.mech @ HIGH, first seventeen short pairs.
  ...MECH_A,
  // Batch 6 — phys.mech @ HIGH, second seventeen short pairs.
  ...MECH_B,
  // Batch 7 — phys.mech @ HIGH, the last seventeen. Domain complete.
  ...MECH_C,
  // Batch 8 — the six phys.mech HIGH pairs the mcq ladder could not hold.
  ...MECH_D,
]

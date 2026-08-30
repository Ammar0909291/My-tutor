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


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 9 — phys.em @ HIGH, first seventeen short pairs.
// ═══════════════════════════════════════════════════════════════════════════

const EM_A: SeedProbe[] = [
  {
    conceptId: 'phys.em.ac-basics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does it mean to call a current ALTERNATING?',
    choices: [
      { text: 'Its direction reverses periodically — many times a second for a mains supply', isCorrect: true },
      { text: 'Its size varies, but it always flows the same way round the circuit', isCorrect: false },
      { text: 'It flows in short bursts with gaps in between', isCorrect: false },
      { text: 'It alternates between the two wires of the supply, using one at a time', isCorrect: false },
    ],
    correctValue: 'the direction reverses',
    targetedMisconceptions: [],
    source: src('phys.em.ac-basics', 'the defining feature is REVERSAL, not variation — a pulsing DC supply varies in size and is not alternating, which is what the second option describes'),
  },
  {
    conceptId: 'phys.em.ac-basics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is mains electricity distributed as AC rather than DC?',
    choices: [
      { text: 'AC voltage can be stepped up and down by transformers, which need a CHANGING flux — high transmission voltage means low current, and heating loss goes as I²R', isCorrect: true },
      { text: 'AC travels faster along the wires than DC does', isCorrect: false },
      { text: 'AC is inherently safer, at any voltage', isCorrect: false },
      { text: 'DC cannot be generated in large quantities', isCorrect: false },
    ],
    correctValue: 'transformers and low transmission current',
    targetedMisconceptions: [],
    source: src('phys.em.ac-basics', 'the transformer argument is the whole reason for the choice, and it rests on Faraday\'s law needing a change; modern HVDC links exist precisely because that argument weakened'),
  },
  {
    conceptId: 'phys.em.amperes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What two quantities does Ampère\'s law relate?',
    choices: [
      { text: 'The line integral of the magnetic field around a closed loop, and the total current threading that loop', isCorrect: true },
      { text: 'The magnetic field and the voltage around the loop', isCorrect: false },
      { text: 'The current and the electric flux through the loop', isCorrect: false },
      { text: 'The magnetic field and the area enclosed by the loop', isCorrect: false },
    ],
    correctValue: 'B around a loop and the enclosed current',
    targetedMisconceptions: [],
    source: src('phys.em.amperes-law', 'what matters is the current THREADING the loop, which is why the concept\'s existing probe about a loop enclosing only one of two wires works the way it does'),
  },
  {
    conceptId: 'phys.em.amperes-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Maxwell added a displacement-current term to Ampère\'s law. What problem did it fix?',
    choices: [
      { text: 'The original law is inconsistent for a CHARGING CAPACITOR — the current stops at the plates, so two surfaces spanning the same loop disagree. The new term restored consistency and predicted electromagnetic waves', isCorrect: true },
      { text: 'It corrected a sign error in the original statement', isCorrect: false },
      { text: 'It extended the law to work inside magnetic materials', isCorrect: false },
      { text: 'It made the law valid at relativistic speeds', isCorrect: false },
    ],
    correctValue: 'the charging capacitor inconsistency',
    targetedMisconceptions: [],
    source: src('phys.em.amperes-law', 'the capacitor gap is the concrete failure, and the fix is what makes light a consequence of electromagnetism rather than a separate subject'),
  },
  {
    conceptId: 'phys.em.biot-savart', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the Biot–Savart law let you calculate?',
    choices: [
      { text: 'The magnetic field a current produces, by adding up the contribution of every small element of that current', isCorrect: true },
      { text: 'The force a magnetic field exerts on a current-carrying wire', isCorrect: false },
      { text: 'The emf induced in a loop by a changing field', isCorrect: false },
      { text: 'The electric field produced by a stationary charge', isCorrect: false },
    ],
    correctValue: 'the field produced by a current',
    targetedMisconceptions: [],
    source: src('phys.em.biot-savart', 'Biot–Savart produces a field; F = IL × B consumes one. Confusing the two is the standard error and the second option is exactly that swap'),
  },
  {
    conceptId: 'phys.em.biot-savart', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The magnetic field at the centre of a circular loop of radius R carrying current I is μ₀I/2R. The radius is doubled with the current unchanged. What happens to the field at the centre?',
    choices: [
      { text: 'It halves', isCorrect: true },
      { text: 'It falls to a quarter — the Biot–Savart element law goes as 1/r²', isCorrect: false },
      { text: 'It doubles', isCorrect: false },
      { text: 'It is unchanged, because the current has not changed', isCorrect: false },
    ],
    correctValue: 'it halves',
    targetedMisconceptions: [],
    source: src('phys.em.biot-savart', 'the ELEMENT law goes as 1/r², but the loop is longer in proportion to R, so one power cancels — this is the concept\'s own 1/r²-versus-result distinction, checked at the centre where the integral is clean'),
  },
  {
    conceptId: 'phys.em.capacitance', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the capacitance of a capacitor measure?',
    choices: [
      { text: 'How much charge it stores for each volt across it', isCorrect: true },
      { text: 'The largest voltage it can withstand before breaking down', isCorrect: false },
      { text: 'The current it is able to supply', isCorrect: false },
      { text: 'The energy it holds when fully charged', isCorrect: false },
    ],
    correctValue: 'charge per volt',
    targetedMisconceptions: [],
    source: src('phys.em.capacitance', 'C = Q/V is a RATIO, fixed by geometry, and does not depend on how much charge is actually on the plates — the energy option conflates it with ½CV²'),
  },
  {
    conceptId: 'phys.em.capacitance', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 3 μF and a 6 μF capacitor are connected in PARALLEL. What is the equivalent capacitance?',
    choices: [
      { text: '9 μF', isCorrect: true },
      { text: '2 μF — using the reciprocal rule', isCorrect: false },
      { text: '4.5 μF — the average of the two', isCorrect: false },
      { text: '18 μF — the product', isCorrect: false },
    ],
    correctValue: '9 uF',
    targetedMisconceptions: [],
    source: src('phys.em.capacitance', 'capacitors ADD in parallel and take reciprocals in series — the opposite of resistors, which is why the 2 μF option is offered: it is the correct SERIES answer for these two values'),
  },
  {
    conceptId: 'phys.em.coulombs-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How does the electrostatic force between two point charges depend on the distance between them?',
    choices: [
      { text: 'It falls off as the inverse SQUARE of the distance', isCorrect: true },
      { text: 'It falls off in inverse proportion to the distance', isCorrect: false },
      { text: 'It grows in proportion to the distance', isCorrect: false },
      { text: 'It does not depend on the distance at all', isCorrect: false },
    ],
    correctValue: 'inverse square',
    targetedMisconceptions: [],
    source: src('phys.em.coulombs-law', 'the inverse-square dependence is what the concept\'s existing doubling and tripling probes exercise; this asks for the relation itself, which is what those probes assume'),
  },
  {
    conceptId: 'phys.em.coulombs-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Point charges of +3.0 μC and −2.0 μC are 0.30 m apart. What is the MAGNITUDE of the force between them? (k = 8.99 × 10⁹ N m² C⁻²)',
    choices: [
      { text: 'About 0.60 N', isCorrect: true },
      { text: 'About 0.18 N — using the distance rather than its square', isCorrect: false },
      { text: 'About 1.8 N', isCorrect: false },
      { text: 'About 6.0 N', isCorrect: false },
    ],
    correctValue: '0.599 N',
    targetedMisconceptions: [],
    source: src('phys.em.coulombs-law', 'F = kq₁q₂/r² = 8.99e9 × 6.0e-12 / 0.090 ≈ 0.60 N. Using r rather than r² gives 0.18 N, which is out by exactly the factor of 0.30 the square supplies'),
  },
  {
    conceptId: 'phys.em.dc-circuits', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a SERIES circuit, which quantity is the same at every point?',
    choices: [
      { text: 'The current', isCorrect: true },
      { text: 'The potential difference across each component', isCorrect: false },
      { text: 'The resistance of each component', isCorrect: false },
      { text: 'The power dissipated in each component', isCorrect: false },
    ],
    correctValue: 'the current',
    targetedMisconceptions: [],
    source: src('phys.em.dc-circuits', 'same current in series, same voltage in parallel — swapping the two is the most common circuit error, and the second option is the PARALLEL answer'),
  },
  {
    conceptId: 'phys.em.dc-circuits', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 6.0 V battery of negligible internal resistance drives a 4.0 Ω resistor and a 2.0 Ω resistor in SERIES. What is the potential difference across the 4.0 Ω resistor?',
    choices: [
      { text: '4.0 V', isCorrect: true },
      { text: '6.0 V — the full battery voltage appears across each component', isCorrect: false },
      { text: '2.0 V', isCorrect: false },
      { text: '1.5 V — the current in the circuit', isCorrect: false },
    ],
    correctValue: '4.0 V',
    targetedMisconceptions: [],
    source: src('phys.em.dc-circuits', 'total R = 6.0 Ω gives I = 1.0 A, so V = 4.0 V. The full-voltage option is the parallel rule applied to a series circuit and it violates Kirchhoff\'s loop rule immediately'),
  },
  {
    conceptId: 'phys.em.dielectrics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the principal effect of sliding a dielectric between the plates of a capacitor?',
    choices: [
      { text: 'The capacitance increases, by a factor equal to the dielectric constant', isCorrect: true },
      { text: 'The capacitance decreases, because the gap is now obstructed', isCorrect: false },
      { text: 'The plate separation effectively increases', isCorrect: false },
      { text: 'Current begins to flow directly between the plates', isCorrect: false },
    ],
    correctValue: 'capacitance increases by kappa',
    targetedMisconceptions: [],
    source: src('phys.em.dielectrics', 'a dielectric is an INSULATOR that increases capacitance; the current option is the belief that it works by conducting, which would destroy the capacitor rather than improve it'),
  },
  {
    conceptId: 'phys.em.dielectrics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What happens inside the dielectric material that makes the capacitance rise?',
    choices: [
      { text: 'Its molecules polarise and set up a field OPPOSING the plates\' field. The net field, and so the voltage for a given charge, is reduced — and C = Q/V therefore rises', isCorrect: true },
      { text: 'It conducts a small current that carries extra charge onto the plates', isCorrect: false },
      { text: 'It increases the amount of charge the plates can physically hold', isCorrect: false },
      { text: 'It reduces the plate area that is needed for a given capacitance', isCorrect: false },
    ],
    correctValue: 'polarisation reduces the net field',
    targetedMisconceptions: [],
    source: src('phys.em.dielectrics', 'the mechanism is polarisation reducing V rather than anything increasing Q — which is why the effect depends on frequency, the point the concept\'s existing water probe makes'),
  },
  {
    conceptId: 'phys.em.electric-charge', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'An object carries a net charge of −3.2 × 10⁻¹⁹ C. How many excess electrons does it hold? (e = 1.60 × 10⁻¹⁹ C)',
    choices: [
      { text: 'Two', isCorrect: true },
      { text: 'About 3.2 — charge does not have to come in whole electrons', isCorrect: false },
      { text: 'One half', isCorrect: false },
      { text: 'Twenty', isCorrect: false },
    ],
    correctValue: '2 electrons',
    targetedMisconceptions: [],
    source: src('phys.em.electric-charge', 'the answer must be a WHOLE number, which is what quantisation means; the half-electron option is the arithmetic done upside down and is impossible on physical grounds as well as numerical ones'),
  },
  {
    conceptId: 'phys.em.electric-charge', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Charge is described as both QUANTISED and CONSERVED. What does each of those mean?',
    choices: [
      { text: 'Quantised: it exists only in whole multiples of e. Conserved: the total charge of an isolated system never changes, although charge can be moved from place to place', isCorrect: true },
      { text: 'Quantised: it can only be created in pairs. Conserved: it cannot be moved from one object to another', isCorrect: false },
      { text: 'Quantised: it is always negative, since electrons carry it. Conserved: it never leaks away', isCorrect: false },
      { text: 'They are two names for the same property', isCorrect: false },
    ],
    correctValue: 'whole multiples of e; total unchanged',
    targetedMisconceptions: [],
    source: src('phys.em.electric-charge', 'two independent claims regularly merged into one vague idea of charge being "fixed"; the concept\'s existing rubbing probes depend on conservation and say nothing about quantisation'),
  },
  {
    conceptId: 'phys.em.electric-current', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A charge of 12 C passes a point in a wire in 4.0 s. What is the current at that point?',
    choices: [
      { text: '3.0 A', isCorrect: true },
      { text: '48 A — charge multiplied by time', isCorrect: false },
      { text: '0.33 A — time divided by charge', isCorrect: false },
      { text: '12 A — the charge is the current', isCorrect: false },
    ],
    correctValue: '3.0 A',
    targetedMisconceptions: [],
    source: src('phys.em.electric-current', 'I = Q/t is the definition of the ampere; the concept\'s existing probes are all about where current goes in a circuit and never ask what it IS'),
  },
  {
    conceptId: 'phys.em.electric-current', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The drift velocity of electrons in a copper wire is roughly 0.1 mm per second, yet a lamp lights the instant the switch is closed. How can both be true?',
    choices: [
      { text: 'The electric field is established all the way round the circuit at close to the speed of light, so electrons EVERYWHERE — including those already inside the lamp — start moving almost at once', isCorrect: true },
      { text: 'Individual electrons actually travel much faster than the drift velocity suggests', isCorrect: false },
      { text: 'The current is carried by the field itself rather than by electrons', isCorrect: false },
      { text: 'There is a delay, but it is far too short for anyone to notice', isCorrect: false },
    ],
    correctValue: 'the field propagates near c',
    targetedMisconceptions: [],
    source: src('phys.em.electric-current', 'the wire is already full of electrons, so none has to travel from the switch to the lamp — the water-pipe analogy gets this right and is why it is worth keeping'),
  },
  {
    conceptId: 'phys.em.electric-dipole', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two equal and opposite charges of magnitude q are separated by a distance d. What is the electric dipole moment?',
    choices: [
      { text: 'qd, pointing from the negative charge towards the positive one', isCorrect: true },
      { text: 'q/d, pointing from positive to negative', isCorrect: false },
      { text: '2qd', isCorrect: false },
      { text: 'q + d', isCorrect: false },
    ],
    correctValue: 'qd',
    targetedMisconceptions: [],
    source: src('phys.em.electric-dipole', 'the magnitude is a product and the direction is a convention worth stating; the total charge is zero, so p is the only thing left that describes the pair'),
  },
  {
    conceptId: 'phys.em.electric-dipole', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A dipole sits in a UNIFORM electric field. What is the net force on it, and the net torque?',
    choices: [
      { text: 'Net force zero — the two charges feel equal and opposite forces — but in general a non-zero torque, which turns the dipole into line with the field', isCorrect: true },
      { text: 'Both are zero, so the dipole does nothing at all', isCorrect: false },
      { text: 'Both are non-zero, so the dipole accelerates and spins', isCorrect: false },
      { text: 'The force is non-zero and the torque is zero', isCorrect: false },
    ],
    correctValue: 'zero force, non-zero torque',
    targetedMisconceptions: [],
    source: src('phys.em.electric-dipole', 'zero force with non-zero torque is the combination that makes a compass needle work and it is genuinely unfamiliar; a NON-uniform field is what adds a net force'),
  },
  {
    conceptId: 'phys.em.electric-potential', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Electric potential at a point is defined as which quantity?',
    choices: [
      { text: 'The electric potential energy per unit positive charge placed at that point', isCorrect: true },
      { text: 'The force per unit charge at that point', isCorrect: false },
      { text: 'The total energy stored in the field there', isCorrect: false },
      { text: 'The charge per volt at that point', isCorrect: false },
    ],
    correctValue: 'energy per unit charge',
    targetedMisconceptions: [],
    source: src('phys.em.electric-potential', 'force per unit charge is the FIELD, not the potential — the two are constantly interchanged, and the concept\'s existing 500 V/m probe is exactly about the relation between them'),
  },
  {
    conceptId: 'phys.em.electric-potential', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How much work is needed to move a charge of 2.0 μC through a potential difference of 12 V?',
    choices: [
      { text: '2.4 × 10⁻⁵ J', isCorrect: true },
      { text: '6.0 J — the potential difference divided by the charge', isCorrect: false },
      { text: '24 J — leaving the micro prefix out', isCorrect: false },
      { text: '1.7 × 10⁻⁷ J', isCorrect: false },
    ],
    correctValue: '2.4e-5 J',
    targetedMisconceptions: [],
    source: src('phys.em.electric-potential', 'W = qV = 2.0e-6 × 12 = 2.4e-5 J. Dropping the micro prefix gives an answer a million times too large, which is the error the units are there to catch'),
  },
  {
    conceptId: 'phys.em.electrical-power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A 60 W lamp is left on for 5.0 hours. How much energy does it use, in kilowatt-hours?',
    choices: [
      { text: '0.30 kWh', isCorrect: true },
      { text: '300 kWh — treating 60 W as 60 kW', isCorrect: false },
      { text: '12 kWh — dividing the hours by the power', isCorrect: false },
      { text: '3.0 kWh', isCorrect: false },
    ],
    correctValue: '0.30 kWh',
    targetedMisconceptions: [],
    source: src('phys.em.electrical-power', '0.060 kW × 5.0 h = 0.30 kWh. The kilowatt-hour is a unit of ENERGY despite reading like a power, which is why it belongs in this concept and not in a units one'),
  },
  {
    conceptId: 'phys.em.electrical-power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Electricity is transmitted across country at very high voltage. Why?',
    choices: [
      { text: 'For a given delivered power, higher voltage means lower current — and the heating loss in the cables goes as I²R, so raising the voltage cuts the losses sharply', isCorrect: true },
      { text: 'Higher voltage makes the electricity travel faster along the lines', isCorrect: false },
      { text: 'High voltage is needed to overcome the resistance of very long cables', isCorrect: false },
      { text: 'It allows thinner insulation to be used, which saves money', isCorrect: false },
    ],
    correctValue: 'lower current, I squared R losses',
    targetedMisconceptions: [],
    source: src('phys.em.electrical-power', 'the SQUARE in I²R is what makes the saving worth the transformers; the overcome-resistance option treats voltage as a push that gets used up along the line'),
  },
  {
    conceptId: 'phys.em.electromagnetic-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In an electromagnetic wave travelling through a vacuum, how are the electric field, the magnetic field and the direction of travel arranged?',
    choices: [
      { text: 'All three are mutually perpendicular', isCorrect: true },
      { text: 'E and B are parallel to each other, and both are perpendicular to the direction of travel', isCorrect: false },
      { text: 'E and B both point along the direction of travel', isCorrect: false },
      { text: 'E is perpendicular to the travel direction and B lies along it', isCorrect: false },
    ],
    correctValue: 'mutually perpendicular',
    targetedMisconceptions: [],
    source: src('phys.em.electromagnetic-waves', 'the mutual perpendicularity is what makes the wave transverse and polarisable; the third option would make it longitudinal, which is the shape sound has taught learners to expect'),
  },
  {
    conceptId: 'phys.em.electromagnetic-waves', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Which listing puts these parts of the electromagnetic spectrum in order from LONGEST wavelength to shortest?',
    choices: [
      { text: 'Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma', isCorrect: true },
      { text: 'Gamma, X-ray, ultraviolet, visible, infrared, microwave, radio', isCorrect: false },
      { text: 'Radio, microwave, visible, infrared, ultraviolet, gamma, X-ray', isCorrect: false },
      { text: 'Microwave, radio, infrared, visible, X-ray, ultraviolet, gamma', isCorrect: false },
    ],
    correctValue: 'radio to gamma',
    targetedMisconceptions: [],
    source: src('phys.em.electromagnetic-waves', 'the second option is the correct FREQUENCY order, which is the same list reversed — offering it tests whether the learner tracked which quantity was asked for'),
  },
  {
    conceptId: 'phys.em.emf', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What does the emf of a source actually measure?',
    choices: [
      { text: 'The energy the source gives to each coulomb of charge it drives round the circuit', isCorrect: true },
      { text: 'The force the source exerts on the electrons', isCorrect: false },
      { text: 'The current the source is able to supply', isCorrect: false },
      { text: 'The resistance inside the source', isCorrect: false },
    ],
    correctValue: 'energy per coulomb',
    targetedMisconceptions: [],
    source: src('phys.em.emf', 'emf is energy per unit charge and is measured in volts, not newtons — the name is the trap, and the concept\'s existing probe quotes a learner making exactly that mistake'),
  },
  {
    conceptId: 'phys.em.emf', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A cell of emf 1.5 V and internal resistance 0.50 Ω is connected across a 2.5 Ω resistor. What is the terminal potential difference?',
    choices: [
      { text: '1.25 V', isCorrect: true },
      { text: '1.5 V — the emf, since that is what the cell provides', isCorrect: false },
      { text: '0.25 V — the voltage lost inside the cell', isCorrect: false },
      { text: '1.0 V', isCorrect: false },
    ],
    correctValue: '1.25 V',
    targetedMisconceptions: [],
    source: src('phys.em.emf', 'I = 1.5/3.0 = 0.50 A, so the internal drop is 0.25 V and the terminals read 1.25 V. The emf appears at the terminals only when no current flows, which is what "open-circuit reading" means'),
  },
  {
    conceptId: 'phys.em.energy-capacitor', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How much energy is stored in a 100 μF capacitor charged to 20 V?',
    choices: [
      { text: '0.020 J', isCorrect: true },
      { text: '0.040 J — leaving out the factor of a half', isCorrect: false },
      { text: '2.0 × 10⁻³ J — using CV rather than CV²', isCorrect: false },
      { text: '1.0 J', isCorrect: false },
    ],
    correctValue: '0.020 J',
    targetedMisconceptions: [],
    source: src('phys.em.energy-capacitor', 'E = ½CV² = ½ × 1.0e-4 × 400 = 0.020 J. Both wrong options are the formula with one factor missing, and each is out by a different amount'),
  },
  {
    conceptId: 'phys.em.energy-capacitor', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is the energy stored in a capacitor ½CV² rather than simply CV²?',
    choices: [
      { text: 'The voltage RISES as charge accumulates, from zero up to V. The work done is the area under that straight line — a triangle, hence the half', isCorrect: true },
      { text: 'The half accounts for the energy lost as heat while charging', isCorrect: false },
      { text: 'Because half the charge sits on each plate', isCorrect: false },
      { text: 'It is an empirical correction factor measured from real capacitors', isCorrect: false },
    ],
    correctValue: 'the area under a rising line',
    targetedMisconceptions: [],
    source: src('phys.em.energy-capacitor', 'exactly the same half as in ½kx² for a spring — a force or voltage that grows linearly does half the work a constant one would. The heat option is a real loss and a wrong explanation for this factor'),
  },
  {
    conceptId: 'phys.em.faradays-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'According to Faraday\'s law, what induces an emf in a circuit?',
    choices: [
      { text: 'A CHANGING magnetic flux through the circuit', isCorrect: true },
      { text: 'A large magnetic flux through the circuit', isCorrect: false },
      { text: 'The mere presence of a magnetic field near the circuit', isCorrect: false },
      { text: 'A current in a nearby wire, whether that current is steady or not', isCorrect: false },
    ],
    correctValue: 'a changing flux',
    targetedMisconceptions: [],
    source: src('phys.em.faradays-law', 'CHANGE is the whole content of the law — the concept\'s existing still-magnet probe is the direct test, and this asks for the rule that probe applies'),
  },
  {
    conceptId: 'phys.em.faradays-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A coil of 200 turns experiences a flux change of 4.0 × 10⁻³ Wb in 0.020 s. What is the average induced emf?',
    choices: [
      { text: '40 V', isCorrect: true },
      { text: '0.20 V — leaving the number of turns out', isCorrect: false },
      { text: '4.0 V', isCorrect: false },
      { text: '1600 V — multiplying by the time instead of dividing', isCorrect: false },
    ],
    correctValue: '40 V',
    targetedMisconceptions: [],
    source: src('phys.em.faradays-law', 'ε = N ΔΦ/Δt = 200 × 4.0e-3 / 0.020 = 40 V. Omitting N is what makes a 200-turn coil behave like a single loop, and it is the most common slip in this calculation'),
  },
  {
    conceptId: 'phys.em.gauss-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Gauss\'s law relates the electric flux through a closed surface to what?',
    choices: [
      { text: 'The total charge ENCLOSED by that surface, divided by ε₀', isCorrect: true },
      { text: 'The total charge anywhere in the neighbourhood of the surface', isCorrect: false },
      { text: 'The area of the surface', isCorrect: false },
      { text: 'The field strength at the centre of the surface', isCorrect: false },
    ],
    correctValue: 'the enclosed charge over epsilon-nought',
    targetedMisconceptions: [],
    source: src('phys.em.gauss-law', 'ENCLOSED is the load-bearing word and it is what makes the next question answerable; nearby charge affects the field on the surface without contributing to the flux'),
  },
  {
    conceptId: 'phys.em.gauss-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A point charge sits just OUTSIDE a closed surface. What is the net electric flux through that surface?',
    choices: [
      { text: 'Zero — every field line that enters the surface also leaves it', isCorrect: true },
      { text: 'Proportional to the charge, as it would be inside', isCorrect: false },
      { text: 'It depends on how far away the charge is', isCorrect: false },
      { text: 'It depends on the shape of the surface', isCorrect: false },
    ],
    correctValue: 'zero',
    targetedMisconceptions: [],
    source: src('phys.em.gauss-law', 'the cleanest test of the word ENCLOSED: the field on the surface is emphatically not zero, and the net flux is. Distance and shape both feel relevant and neither is'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 10 — phys.em @ HIGH, the last seventeen. Domain complete.
// ═══════════════════════════════════════════════════════════════════════════

const EM_B: SeedProbe[] = [
  {
    conceptId: 'phys.em.kirchhoffs-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Kirchhoff\'s CURRENT law, applied at a junction, is a statement of the conservation of what?',
    choices: [
      { text: 'Charge — none can accumulate at a junction, so what flows in must flow out', isCorrect: true },
      { text: 'Energy', isCorrect: false },
      { text: 'Voltage', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
    ],
    correctValue: 'charge',
    targetedMisconceptions: [],
    source: src('phys.em.kirchhoffs-laws', 'current law is charge, voltage law is energy — swapping them is the standard error, and knowing which is which is what tells you when each applies'),
  },
  {
    conceptId: 'phys.em.kirchhoffs-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'At a junction, currents of 3.0 A and 2.0 A flow IN, and 1.5 A flows OUT along one branch. Only one further branch leaves the junction. What current does it carry?',
    choices: [
      { text: '3.5 A out', isCorrect: true },
      { text: '6.5 A out — adding all three given currents', isCorrect: false },
      { text: '0.5 A out', isCorrect: false },
      { text: '5.0 A out — the total flowing in, ignoring the branch already accounted for', isCorrect: false },
    ],
    correctValue: '3.5 A',
    targetedMisconceptions: [],
    source: src('phys.em.kirchhoffs-laws', '3.0 + 2.0 − 1.5 = 3.5 A. Signs are the whole difficulty of applying the junction rule, and each distractor drops a different one'),
  },
  {
    conceptId: 'phys.em.lc-circuits', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In an oscillating LC circuit, energy moves back and forth between which two stores?',
    choices: [
      { text: 'The electric field of the capacitor and the magnetic field of the inductor', isCorrect: true },
      { text: 'Heat in the resistor and charge on the capacitor', isCorrect: false },
      { text: 'The kinetic and potential energy of the electrons themselves', isCorrect: false },
      { text: 'The battery and the capacitor', isCorrect: false },
    ],
    correctValue: 'capacitor E field and inductor B field',
    targetedMisconceptions: [],
    source: src('phys.em.lc-circuits', 'an IDEAL LC circuit has no resistor and no battery, so both of those distractors describe a circuit that is not this one — the oscillation is between two FIELDS'),
  },
  {
    conceptId: 'phys.em.lc-circuits', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'An LC circuit has L = 2.0 mH and C = 50 μF. What is its angular resonant frequency?',
    choices: [
      { text: 'About 3.2 × 10³ rad/s', isCorrect: true },
      { text: '1.0 × 10⁻⁷ rad/s — the product LC itself', isCorrect: false },
      { text: '1.0 × 10⁷ rad/s — the reciprocal of LC, without the square root', isCorrect: false },
      { text: '100 rad/s', isCorrect: false },
    ],
    correctValue: '3162 rad/s',
    targetedMisconceptions: [],
    source: src('phys.em.lc-circuits', 'ω = 1/√(LC) with LC = 1.0e-7 s², so ω ≈ 3162 rad/s. Missing the square root gives 1.0e7, which is out by more than three orders of magnitude'),
  },
  {
    conceptId: 'phys.em.lenzs-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does Lenz\'s law tell you about an induced current?',
    choices: [
      { text: 'It flows in whichever direction OPPOSES the change that produced it', isCorrect: true },
      { text: 'It flows in whichever direction reinforces the change that produced it', isCorrect: false },
      { text: 'It always flows clockwise when viewed from the magnet', isCorrect: false },
      { text: 'How large it is, but not which way it flows', isCorrect: false },
    ],
    correctValue: 'it opposes the change',
    targetedMisconceptions: [],
    source: src('phys.em.lenzs-law', 'Lenz gives the DIRECTION and Faraday gives the size; the reinforcing option is what the next question shows would create energy from nothing'),
  },
  {
    conceptId: 'phys.em.lenzs-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Lenz\'s law is said to be a consequence of a more fundamental principle. Which one, and why?',
    choices: [
      { text: 'Conservation of energy — if the induced current reinforced the change instead of opposing it, the motion would accelerate itself and generate energy from nothing', isCorrect: true },
      { text: 'Conservation of charge', isCorrect: false },
      { text: 'Newton\'s third law', isCorrect: false },
      { text: 'Conservation of momentum', isCorrect: false },
    ],
    correctValue: 'conservation of energy',
    targetedMisconceptions: [],
    source: src('phys.em.lenzs-law', 'the minus sign in Faraday\'s law is energy conservation written into the equation — which is also why a magnet falling down a copper pipe is slowed rather than sped up'),
  },
  {
    conceptId: 'phys.em.magnetic-dipole', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A flat coil of N turns and area A carries a current I. What is its magnetic dipole moment?',
    choices: [
      { text: 'NIA, directed perpendicular to the plane of the coil', isCorrect: true },
      { text: 'NI/A', isCorrect: false },
      { text: 'IA/N', isCorrect: false },
      { text: 'N + IA', isCorrect: false },
    ],
    correctValue: 'NIA',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-dipole', 'the moment is a product of all three, and its direction is along the coil AXIS rather than in its plane — which is what makes a current loop equivalent to a small bar magnet'),
  },
  {
    conceptId: 'phys.em.magnetic-dipole', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A dipole in a UNIFORM magnetic field feels no net force. So why is a small bar magnet pulled towards the pole of a strong magnet?',
    choices: [
      { text: 'The field there is NON-uniform: the nearer pole of the small magnet sits in a stronger field than the far pole, so the two forces no longer cancel', isCorrect: true },
      { text: 'Because a bar magnet carries a net magnetic charge after all', isCorrect: false },
      { text: 'Because the dipole moment grows as the magnet approaches the pole', isCorrect: false },
      { text: 'Because a magnetic field does work on anything magnetic', isCorrect: false },
    ],
    correctValue: 'the field is non-uniform',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-dipole', 'attraction requires a field GRADIENT, which is why the everyday behaviour of magnets and the uniform-field result look contradictory until the gradient is named'),
  },
  {
    conceptId: 'phys.em.magnetic-field', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In what unit is magnetic flux DENSITY measured?',
    choices: [
      { text: 'The tesla', isCorrect: true },
      { text: 'The weber', isCorrect: false },
      { text: 'The henry', isCorrect: false },
      { text: 'The farad', isCorrect: false },
    ],
    correctValue: 'tesla',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-field', 'the weber is the unit of FLUX, and one tesla is one weber per square metre — mixing the two is what makes flux and flux density interchangeable in a learner\'s notes'),
  },
  {
    conceptId: 'phys.em.magnetic-field', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A proton enters a uniform magnetic field travelling at right angles to it. What path does it follow, and why does its SPEED not change?',
    choices: [
      { text: 'A circle — the magnetic force is always perpendicular to the velocity, so it does no work and cannot change the speed', isCorrect: true },
      { text: 'A parabola, exactly like a projectile under gravity', isCorrect: false },
      { text: 'A straight line at constant speed, since the field does no work', isCorrect: false },
      { text: 'An inward spiral, slowing as it loses energy to the field', isCorrect: false },
    ],
    correctValue: 'a circle at constant speed',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-field', 'a constant-magnitude force perpendicular to v gives circular motion, not a parabola — the parabola is what a constant force in a FIXED direction gives, which is the gravity case being imported'),
  },
  {
    conceptId: 'phys.em.magnetic-flux', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How is the magnetic flux through a flat surface calculated?',
    choices: [
      { text: 'B × A × cos θ, where θ is the angle between the field and the NORMAL to the surface', isCorrect: true },
      { text: 'B × A × sin θ, with θ measured from the normal', isCorrect: false },
      { text: 'B divided by A', isCorrect: false },
      { text: 'B added to A', isCorrect: false },
    ],
    correctValue: 'BA cos(theta) from the normal',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-flux', 'the angle is measured from the NORMAL, not from the surface — which is why a field lying in the plane of a loop gives zero flux, and why the sine version gets every generator problem backwards'),
  },
  {
    conceptId: 'phys.em.magnetic-flux', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A rectangular loop measuring 0.20 m by 0.30 m sits in a uniform 0.40 T field, with the field at 60° to the PLANE of the loop. What is the flux through it?',
    choices: [
      { text: 'About 0.021 Wb', isCorrect: true },
      { text: 'About 0.012 Wb — measuring the 60° from the normal instead of from the plane', isCorrect: false },
      { text: '0.024 Wb — ignoring the angle altogether', isCorrect: false },
      { text: 'Zero', isCorrect: false },
    ],
    correctValue: '0.0208 Wb',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-flux', 'at 60° to the PLANE the field is 30° from the normal, so Φ = 0.40 × 0.060 × cos 30° ≈ 0.021 Wb. Reading the stated angle off the wrong reference is the error, and the 0.012 option is exactly that'),
  },
  {
    conceptId: 'phys.em.magnetic-force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In F = qvB sin θ, between which two directions is the angle θ measured?',
    choices: [
      { text: 'The velocity of the charge and the magnetic field', isCorrect: true },
      { text: 'The velocity and the resulting force', isCorrect: false },
      { text: 'The magnetic field and the resulting force', isCorrect: false },
      { text: 'The magnetic field and the length of the wire only', isCorrect: false },
    ],
    correctValue: 'between v and B',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-force', 'the FORCE is perpendicular to both v and B by construction, so the angles involving it are always 90° — which is why the second and third options are not merely wrong but degenerate'),
  },
  {
    conceptId: 'phys.em.magnetic-force', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 0.50 m length of wire carrying 3.0 A lies perpendicular to a uniform 0.20 T magnetic field. What force acts on it?',
    choices: [
      { text: '0.30 N', isCorrect: true },
      { text: '3.0 N', isCorrect: false },
      { text: '0.030 N', isCorrect: false },
      { text: '1.2 N', isCorrect: false },
    ],
    correctValue: '0.30 N',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-force', 'F = BIL = 0.20 × 3.0 × 0.50 = 0.30 N — the motor-effect calculation, which the concept\'s existing parallel-wire probes assume without ever asking for'),
  },
  {
    conceptId: 'phys.em.magnetic-materials', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these materials is FERROMAGNETIC?',
    choices: [
      { text: 'Iron', isCorrect: true },
      { text: 'Copper', isCorrect: false },
      { text: 'Aluminium', isCorrect: false },
      { text: 'Glass', isCorrect: false },
    ],
    correctValue: 'iron',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-materials', 'copper and aluminium are the two metals learners most often expect to be magnetic because they are metals — which is exactly what the concept\'s existing foil-and-pipe probe tests in the laboratory'),
  },
  {
    conceptId: 'phys.em.magnetic-materials', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Heating a permanent magnet above its Curie temperature destroys its magnetism. Why?',
    choices: [
      { text: 'Thermal agitation randomises the aligned magnetic domains, so their moments average out to nothing', isCorrect: true },
      { text: 'The metal melts and loses its structure', isCorrect: false },
      { text: 'The electrons are boiled off the surface of the metal', isCorrect: false },
      { text: 'The magnetic field leaks away into the surrounding air', isCorrect: false },
    ],
    correctValue: 'domains are randomised',
    targetedMisconceptions: [],
    source: src('phys.em.magnetic-materials', 'the Curie point is far below the melting point, so the melting option is checkably wrong; the field-leaks-away option treats the field as a stored substance rather than as a consequence of alignment'),
  },
  {
    conceptId: 'phys.em.maxwells-equations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Maxwell\'s set contains four equations. One of them has no source term at all. What does that equation assert?',
    choices: [
      { text: 'That there are no magnetic monopoles — magnetic field lines have no beginning and no end', isCorrect: true },
      { text: 'That magnetic fields are always zero in a vacuum', isCorrect: false },
      { text: 'That electric charge is conserved', isCorrect: false },
      { text: 'That the magnetic field is always perpendicular to the electric field', isCorrect: false },
    ],
    correctValue: 'no magnetic monopoles',
    targetedMisconceptions: [],
    source: src('phys.em.maxwells-equations', 'the absent source term is the ABSENCE of magnetic charge, which is why the concept\'s existing cut-a-magnet-in-half result comes out as it does'),
  },
  {
    conceptId: 'phys.em.maxwells-equations', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Maxwell\'s equations predict electromagnetic waves travelling at 1/√(μ₀ε₀). Why was that number so significant when it was first computed?',
    choices: [
      { text: 'It matched the measured speed of LIGHT — identifying light as an electromagnetic wave, from two constants measured in laboratory electricity experiments', isCorrect: true },
      { text: 'It showed that light must slow down when travelling through a vacuum', isCorrect: false },
      { text: 'It predicted that radio waves would travel faster than light', isCorrect: false },
      { text: 'It confirmed the existence of the luminiferous aether', isCorrect: false },
    ],
    correctValue: 'it equalled the speed of light',
    targetedMisconceptions: [],
    source: src('phys.em.maxwells-equations', 'two constants from static electricity and magnetism producing the speed of light is the unification itself, and it is the step the equations are remembered for'),
  },
  {
    conceptId: 'phys.em.mutual-inductance', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In what unit is mutual inductance measured?',
    choices: [
      { text: 'The henry', isCorrect: true },
      { text: 'The weber', isCorrect: false },
      { text: 'The tesla', isCorrect: false },
      { text: 'The farad', isCorrect: false },
    ],
    correctValue: 'henry',
    targetedMisconceptions: [],
    source: src('phys.em.mutual-inductance', 'one henry is one weber-turn per ampere, so the weber is the near-miss that shows the definition has not been unpacked'),
  },
  {
    conceptId: 'phys.em.mutual-inductance', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why does a transformer produce nothing at all from a steady DC supply?',
    choices: [
      { text: 'Mutual induction needs a CHANGING flux. A steady current makes a constant flux, so no emf is induced in the secondary at all', isCorrect: true },
      { text: 'Direct current cannot pass through the primary winding', isCorrect: false },
      { text: 'The iron core is unable to carry a steady magnetic field', isCorrect: false },
      { text: 'The secondary coil has too much resistance for direct current', isCorrect: false },
    ],
    correctValue: 'no changing flux',
    targetedMisconceptions: [],
    source: src('phys.em.mutual-inductance', 'the same CHANGE requirement as Faraday\'s law, met here as an engineering consequence — the DC-cannot-flow option is doubly wrong, since DC flows through the primary very freely and that is what burns it out'),
  },
  {
    conceptId: 'phys.em.ohms-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A resistor carries a current of 0.25 A when 6.0 V is applied across it. What is its resistance?',
    choices: [
      { text: '24 Ω', isCorrect: true },
      { text: '1.5 Ω — multiplying the voltage by the current', isCorrect: false },
      { text: '0.042 Ω — dividing the current by the voltage', isCorrect: false },
      { text: '6.25 Ω', isCorrect: false },
    ],
    correctValue: '24 ohm',
    targetedMisconceptions: [],
    source: src('phys.em.ohms-law', 'R = V/I = 6.0/0.25 = 24 Ω; the concept\'s existing probes are all about whether a component OBEYS the law and never ask for a plain resistance'),
  },
  {
    conceptId: 'phys.em.ohms-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A filament lamp is described as not obeying Ohm\'s law, yet V = IR is still written for it. What exactly is it that fails?',
    choices: [
      { text: 'V = IR still DEFINES a resistance at any instant, but for a lamp that resistance is not constant — it rises as the filament heats, so V is not proportional to I', isCorrect: true },
      { text: 'The equation V = IR is simply invalid for a lamp', isCorrect: false },
      { text: 'The current flows in the opposite direction to the applied voltage', isCorrect: false },
      { text: 'The lamp has no resistance at all until it lights up', isCorrect: false },
    ],
    correctValue: 'R is not constant',
    targetedMisconceptions: [],
    source: src('phys.em.ohms-law', 'Ohm\'s LAW is the claim of proportionality; V = IR is the DEFINITION of resistance and never fails. Collapsing the two is why a non-ohmic component looks like a broken equation'),
  },
  {
    conceptId: 'phys.em.potentiometer', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why can a potentiometer measure the emf of a cell more accurately than a voltmeter can?',
    choices: [
      { text: 'At the null point it draws NO current from the cell, so there is no voltage lost across the cell\'s internal resistance', isCorrect: true },
      { text: 'Because the potentiometer wire is much longer than a voltmeter\'s coil', isCorrect: false },
      { text: 'Because a galvanometer is inherently more sensitive than a voltmeter', isCorrect: false },
      { text: 'Because it makes the measurement with alternating rather than direct current', isCorrect: false },
    ],
    correctValue: 'no current is drawn at balance',
    targetedMisconceptions: [],
    source: src('phys.em.potentiometer', 'zero current is the entire advantage, and it connects directly to the emf concept\'s terminal-pd result: the emf only appears at the terminals when no current flows'),
  },
  {
    conceptId: 'phys.em.potentiometer', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'On a potentiometer wire, a standard cell of 1.018 V balances at 60.0 cm. At what length would a 1.50 V cell balance, with the driver circuit unchanged?',
    choices: [
      { text: 'About 88 cm', isCorrect: true },
      { text: 'About 41 cm', isCorrect: false },
      { text: 'About 92 cm', isCorrect: false },
      { text: '100 cm — the full length of the wire', isCorrect: false },
    ],
    correctValue: '88.4 cm',
    targetedMisconceptions: [],
    source: src('phys.em.potentiometer', 'the potential gradient is 1.018/60.0 V/cm, so 1.50 V balances at 88.4 cm. The 41 cm option inverts the ratio, giving a SHORTER length for a LARGER emf — which the method makes impossible'),
  },
  {
    conceptId: 'phys.em.rc-circuits', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the time constant of an RC circuit, and what does it tell you?',
    choices: [
      { text: 'τ = RC — the time for the capacitor to reach about 63% of its final charge while charging', isCorrect: true },
      { text: 'τ = RC — the time for the capacitor to become COMPLETELY charged', isCorrect: false },
      { text: 'τ = R/C — the time to reach full charge', isCorrect: false },
      { text: 'τ = C/R — the time to reach half charge', isCorrect: false },
    ],
    correctValue: 'RC, 63% of final charge',
    targetedMisconceptions: [],
    source: src('phys.em.rc-circuits', 'exponential charging never COMPLETES, which is what the second option quietly denies — it has the right formula and the wrong meaning, and that is the harder half to get right'),
  },
  {
    conceptId: 'phys.em.rc-circuits', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A 2.0 MΩ resistor charges a 5.0 μF capacitor from a battery. Roughly how long does the capacitor voltage take to reach about 63% of the supply voltage?',
    choices: [
      { text: '10 s', isCorrect: true },
      { text: '0.4 s — dividing rather than multiplying', isCorrect: false },
      { text: '100 s', isCorrect: false },
      { text: '2.5 s', isCorrect: false },
    ],
    correctValue: '10 s',
    targetedMisconceptions: [],
    source: src('phys.em.rc-circuits', 'τ = RC = 2.0e6 × 5.0e-6 = 10 s. The prefixes cancel exactly, which is the point: megohms with microfarads give seconds'),
  },
  {
    conceptId: 'phys.em.resistivity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the difference between resistance and resistivity?',
    choices: [
      { text: 'Resistance depends on the object\'s length and cross-section; resistivity is a property of the MATERIAL alone, independent of shape', isCorrect: true },
      { text: 'They are the same quantity expressed in different units', isCorrect: false },
      { text: 'Resistivity depends on how much current is flowing; resistance does not', isCorrect: false },
      { text: 'Resistance is the material property and resistivity depends on the shape', isCorrect: false },
    ],
    correctValue: 'shape-dependent versus material property',
    targetedMisconceptions: [],
    source: src('phys.em.resistivity', 'the last option is the pair exactly swapped, which is the most common way this distinction is misremembered; the concept\'s existing 1 m versus 2 m probe only makes sense once it is straight'),
  },
  {
    conceptId: 'phys.em.resistivity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A wire of resistance R is stretched uniformly to twice its original length, with no metal lost. What is its new resistance?',
    choices: [
      { text: '4R', isCorrect: true },
      { text: '2R — the length has doubled', isCorrect: false },
      { text: 'R/2', isCorrect: false },
      { text: 'R — stretching does not change the material', isCorrect: false },
    ],
    correctValue: '4R',
    targetedMisconceptions: [],
    source: src('phys.em.resistivity', 'the volume is fixed, so doubling the length HALVES the cross-section, and R = ρL/A picks up both factors. The 2R option counts only the length, which is the half of the change that is visible'),
  },
  {
    conceptId: 'phys.em.self-inductance', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does an inductor oppose?',
    choices: [
      { text: 'Any CHANGE in the current through it', isCorrect: true },
      { text: 'The current through it, whether steady or changing', isCorrect: false },
      { text: 'The voltage applied across it', isCorrect: false },
      { text: 'Current in one direction only, like a diode', isCorrect: false },
    ],
    correctValue: 'a change in current',
    targetedMisconceptions: [],
    source: src('phys.em.self-inductance', 'an ideal inductor offers no opposition at all to a STEADY current, which is what the concept\'s existing long-time RL probe measures; opposing the current itself is the description of a resistor'),
  },
  {
    conceptId: 'phys.em.self-inductance', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'How much energy is stored in the magnetic field of a 0.50 H inductor carrying a steady current of 4.0 A?',
    choices: [
      { text: '4.0 J', isCorrect: true },
      { text: '8.0 J — leaving out the factor of a half', isCorrect: false },
      { text: '2.0 J — using LI rather than LI²', isCorrect: false },
      { text: '1.0 J', isCorrect: false },
    ],
    correctValue: '4.0 J',
    targetedMisconceptions: [],
    source: src('phys.em.self-inductance', 'E = ½LI² = ½ × 0.50 × 16 = 4.0 J — the exact structural twin of ½CV² for a capacitor, and the half arises for the same reason'),
  },
  {
    conceptId: 'phys.em.solenoid', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The field inside a long solenoid is B = μ₀nI. What does n stand for?',
    choices: [
      { text: 'The number of turns per unit LENGTH of the solenoid', isCorrect: true },
      { text: 'The total number of turns on the solenoid', isCorrect: false },
      { text: 'The number of layers the coil is wound in', isCorrect: false },
      { text: 'The number of turns per unit area of the cross-section', isCorrect: false },
    ],
    correctValue: 'turns per unit length',
    targetedMisconceptions: [],
    source: src('phys.em.solenoid', 'per unit LENGTH is why stretching a solenoid weakens its field without unwinding a single turn — the concept\'s existing total-turns probe is exactly this distinction in the laboratory'),
  },
  {
    conceptId: 'phys.em.solenoid', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is the magnetic flux density inside a long air-cored solenoid wound with 500 turns per metre and carrying 2.0 A? (μ₀ = 4π × 10⁻⁷ T m A⁻¹)',
    choices: [
      { text: 'About 1.3 × 10⁻³ T', isCorrect: true },
      { text: 'About 1.3 × 10⁻⁶ T', isCorrect: false },
      { text: 'About 1.3 T', isCorrect: false },
      { text: 'About 6.3 × 10⁻⁴ T — leaving the current out', isCorrect: false },
    ],
    correctValue: '1.26e-3 T',
    targetedMisconceptions: [],
    source: src('phys.em.solenoid', 'B = μ₀nI = 4π×10⁻⁷ × 500 × 2.0 ≈ 1.26 mT — worth computing once, because it shows how many turns an MRI magnet needs to reach several tesla'),
  },
  {
    conceptId: 'phys.em.wheatstone-bridge', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A Wheatstone bridge is balanced and its galvanometer reads zero. What does that tell you?',
    choices: [
      { text: 'The two mid-points of the bridge are at the same potential, so the resistance ratio in one arm equals the ratio in the other', isCorrect: true },
      { text: 'No current is flowing anywhere in the bridge', isCorrect: false },
      { text: 'The supply has failed or become disconnected', isCorrect: false },
      { text: 'All four resistances are equal to one another', isCorrect: false },
    ],
    correctValue: 'equal potentials, equal ratios',
    targetedMisconceptions: [],
    source: src('phys.em.wheatstone-bridge', 'current still flows freely through both arms at balance — only the BRIDGE branch carries none. Reading "galvanometer zero" as "circuit dead" is the standard misreading'),
  },
  {
    conceptId: 'phys.em.wheatstone-bridge', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A Wheatstone bridge balances with P = 200 Ω, Q = 50 Ω and R = 120 Ω, where P/Q = R/S. What is the unknown resistance S?',
    choices: [
      { text: '30 Ω', isCorrect: true },
      { text: '480 Ω — inverting the ratio', isCorrect: false },
      { text: '60 Ω', isCorrect: false },
      { text: '15 Ω', isCorrect: false },
    ],
    correctValue: '30 ohm',
    targetedMisconceptions: [],
    source: src('phys.em.wheatstone-bridge', 'S = RQ/P = 120 × 50 / 200 = 30 Ω. The 480 Ω option is the same three numbers with the ratio the other way up, which is the error the balance condition\'s symmetry invites'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 11 — phys.mod @ HIGH, all nineteen short pairs. Domain complete.
// ═══════════════════════════════════════════════════════════════════════════

const MOD: SeedProbe[] = [
  {
    conceptId: 'phys.mod.atomic-spectra', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why does every element produce its own distinctive set of spectral lines?',
    choices: [
      { text: 'Its electron energy levels are unique to it, and each line is a specific jump between two of those levels', isCorrect: true },
      { text: 'Because each element has a different number of protons, and protons emit the light', isCorrect: false },
      { text: 'Because different elements are heated to different temperatures', isCorrect: false },
      { text: 'Because heavier atoms always emit longer wavelengths', isCorrect: false },
    ],
    correctValue: 'unique energy levels',
    targetedMisconceptions: [],
    source: src('phys.mod.atomic-spectra', 'the lines come from ELECTRON transitions, not from the nucleus — which is why spectroscopy identifies elements and is the basis of the concept\'s existing absorption/emission probe'),
  },
  {
    conceptId: 'phys.mod.bohr-model', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What was the genuinely NEW postulate in Bohr\'s model of the atom?',
    choices: [
      { text: 'Electrons may occupy only certain allowed orbits, with quantised angular momentum, and radiate only when jumping between them', isCorrect: true },
      { text: 'That electrons orbit the nucleus, in the way planets orbit the Sun', isCorrect: false },
      { text: 'That the nucleus carries a positive charge', isCorrect: false },
      { text: 'That electrons behave as waves rather than particles', isCorrect: false },
    ],
    correctValue: 'quantised allowed orbits',
    targetedMisconceptions: [],
    source: src('phys.mod.bohr-model', 'orbiting electrons and a positive nucleus were already Rutherford\'s; QUANTISATION is Bohr\'s addition, and the matter-wave option is de Broglie a decade later'),
  },
  {
    conceptId: 'phys.mod.compton-effect', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the Compton effect demonstrate about X-rays?',
    choices: [
      { text: 'They behave as PARTICLES carrying momentum, colliding with electrons and rebounding as billiard balls would', isCorrect: true },
      { text: 'That they are waves, since only waves can change wavelength', isCorrect: false },
      { text: 'That they have a rest mass', isCorrect: false },
      { text: 'That they travel more slowly than visible light', isCorrect: false },
    ],
    correctValue: 'photons carry momentum',
    targetedMisconceptions: [],
    source: src('phys.mod.compton-effect', 'momentum without rest mass is the surprising part, and the rest-mass option is the natural but wrong way to supply it — the concept\'s existing probe asks the same question from the classical-wave side'),
  },
  {
    conceptId: 'phys.mod.de-broglie', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the de Broglie wavelength of a particle in terms of its momentum p and the Planck constant h?',
    choices: [
      { text: 'λ = h/p', isCorrect: true },
      { text: 'λ = hp', isCorrect: false },
      { text: 'λ = p/h', isCorrect: false },
      { text: 'λ = h/m, using the mass rather than the momentum', isCorrect: false },
    ],
    correctValue: 'lambda = h/p',
    targetedMisconceptions: [],
    source: src('phys.mod.de-broglie', 'the INVERSE relation is what makes everyday objects have unmeasurably short wavelengths — the point of the concept\'s existing baseball probe, which this relation is needed to answer'),
  },
  {
    conceptId: 'phys.mod.diode-rectification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does a single diode do to an alternating supply?',
    choices: [
      { text: 'It conducts in one direction only, so only the half-cycles of one polarity get through — half-wave rectification', isCorrect: true },
      { text: 'It converts the alternating supply into a smooth steady DC voltage', isCorrect: false },
      { text: 'It doubles the frequency of the supply', isCorrect: false },
      { text: 'It blocks the current completely in both directions', isCorrect: false },
    ],
    correctValue: 'half-wave rectification',
    targetedMisconceptions: [],
    source: src('phys.mod.diode-rectification', 'a diode alone gives a PULSING output, not a steady one — believing otherwise is what makes the smoothing capacitor in the next question look unnecessary'),
  },
  {
    conceptId: 'phys.mod.diode-rectification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is a smoothing capacitor placed across the output of a rectifier?',
    choices: [
      { text: 'The rectified output still pulses. The capacitor charges at each peak and discharges through the load between peaks, cutting the ripple', isCorrect: true },
      { text: 'It converts whatever AC remains into DC', isCorrect: false },
      { text: 'It protects the diode against reverse voltage', isCorrect: false },
      { text: 'It raises the output above the peak voltage of the supply', isCorrect: false },
    ],
    correctValue: 'it reduces ripple',
    targetedMisconceptions: [],
    source: src('phys.mod.diode-rectification', 'the capacitor smooths a signal that is already unidirectional; describing it as "converting AC to DC" gives it the diode\'s job and leaves the ripple unexplained'),
  },
  {
    conceptId: 'phys.mod.energy-bands', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In band theory, what distinguishes a conductor from an insulator?',
    choices: [
      { text: 'In a conductor the highest occupied band is only partly filled, or bands overlap, so electrons have empty states to move into. In an insulator a full band is separated from the next by a wide gap', isCorrect: true },
      { text: 'Conductors simply contain more electrons than insulators', isCorrect: false },
      { text: 'Insulators contain no free electrons at any temperature whatsoever', isCorrect: false },
      { text: 'Conductors are made of atoms that are smaller', isCorrect: false },
    ],
    correctValue: 'partly filled band versus a wide gap',
    targetedMisconceptions: [],
    source: src('phys.mod.energy-bands', 'conduction needs EMPTY STATES nearby, not more electrons — a full band conducts nothing however many electrons it holds, which is the whole insight'),
  },
  {
    conceptId: 'phys.mod.energy-bands', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Roughly what band gap marks a semiconductor off from an insulator, and why does the boundary sit where it does?',
    choices: [
      { text: 'About 1 eV against several eV. At room temperature the thermal energy scale kT is about 0.025 eV, so a 1 eV gap is crossed by a small but useful fraction of electrons and a 5 eV gap effectively never is', isCorrect: true },
      { text: 'There is no numerical boundary — the terms are purely conventional', isCorrect: false },
      { text: 'Insulators have a band gap of exactly zero', isCorrect: false },
      { text: 'Semiconductors have gaps of several hundred eV', isCorrect: false },
    ],
    correctValue: '~1 eV versus several eV',
    targetedMisconceptions: [],
    source: src('phys.mod.energy-bands', 'the boundary is set by kT at room temperature, which is why the same material can be a semiconductor in one regime and an insulator in another — a zero gap describes a CONDUCTOR, not an insulator'),
  },
  {
    conceptId: 'phys.mod.extrinsic-semiconductors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is meant by DOPING a semiconductor?',
    choices: [
      { text: 'Deliberately adding a tiny, controlled quantity of a different element in order to change the number of mobile charge carriers', isCorrect: true },
      { text: 'Heating the material until electrons are freed', isCorrect: false },
      { text: 'Applying a strong electric field across the crystal', isCorrect: false },
      { text: 'Removing impurities in order to purify the crystal', isCorrect: false },
    ],
    correctValue: 'adding controlled impurity',
    targetedMisconceptions: [],
    source: src('phys.mod.extrinsic-semiconductors', 'doping ADDS impurity on purpose, which is the opposite of the last option — and the quantities are tiny, roughly one atom in a million, which is why control matters more than amount'),
  },
  {
    conceptId: 'phys.mod.extrinsic-semiconductors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Silicon sits in group 14. Which group must a dopant come from to produce p-type material, and what does it contribute?',
    choices: [
      { text: 'Group 13, such as boron — one fewer valence electron than silicon, so it leaves holes as the majority carriers', isCorrect: true },
      { text: 'Group 15, such as phosphorus, contributing extra electrons', isCorrect: false },
      { text: 'Group 13, contributing extra electrons', isCorrect: false },
      { text: 'Group 16, contributing extra holes', isCorrect: false },
    ],
    correctValue: 'group 13, holes',
    targetedMisconceptions: [],
    source: src('phys.mod.extrinsic-semiconductors', 'p-type comes from a group to the LEFT of silicon and n-type from the right; the group-15 option is the correct n-type answer and is the swap that makes junction diagrams come out backwards'),
  },
  {
    conceptId: 'phys.mod.intrinsic-semiconductors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In a pure, undoped semiconductor at room temperature, how do the numbers of free electrons and holes compare?',
    choices: [
      { text: 'They are exactly equal — every electron promoted to the conduction band leaves a hole behind', isCorrect: true },
      { text: 'There are far more free electrons than holes', isCorrect: false },
      { text: 'There are far more holes than free electrons', isCorrect: false },
      { text: 'There are free electrons but no holes at all', isCorrect: false },
    ],
    correctValue: 'exactly equal',
    targetedMisconceptions: [],
    source: src('phys.mod.intrinsic-semiconductors', 'electrons and holes are created strictly in PAIRS in an intrinsic material, which is precisely what doping breaks — and the reason "intrinsic" is worth a separate concept'),
  },
  {
    conceptId: 'phys.mod.intrinsic-semiconductors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Heating a metal makes it conduct WORSE, while heating an intrinsic semiconductor makes it conduct BETTER. Why the difference?',
    choices: [
      { text: 'A metal already has a fixed number of carriers, so extra heat only increases scattering. In a semiconductor heat promotes many more carriers across the gap, and that gain outweighs the extra scattering', isCorrect: true },
      { text: 'Semiconductors expand more than metals when heated', isCorrect: false },
      { text: 'Metals lose electrons from their surface when heated', isCorrect: false },
      { text: 'Semiconductors have a negative resistance at all temperatures', isCorrect: false },
    ],
    correctValue: 'carrier number versus scattering',
    targetedMisconceptions: [],
    source: src('phys.mod.intrinsic-semiconductors', 'two competing effects with different winners is the whole answer, and it is the mechanism behind the thermistor — the concept\'s existing heating probe asks for the OBSERVATION and this asks for the cause'),
  },
  {
    conceptId: 'phys.mod.nuclear-fission', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes a fission CHAIN reaction possible?',
    choices: [
      { text: 'Each fission event releases further neutrons, and those neutrons can trigger fissions in other nuclei', isCorrect: true },
      { text: 'The fission fragments are themselves radioactive', isCorrect: false },
      { text: 'Each fission releases a large amount of energy as heat', isCorrect: false },
      { text: 'The fuel has been enriched before use', isCorrect: false },
    ],
    correctValue: 'released neutrons trigger more fissions',
    targetedMisconceptions: [],
    source: src('phys.mod.nuclear-fission', 'the chain needs a self-reproducing TRIGGER, and neutrons are it — energy release and fragment radioactivity are consequences of fission and would not sustain anything'),
  },
  {
    conceptId: 'phys.mod.nuclear-fusion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why does nuclear fusion require such extraordinarily high temperatures?',
    choices: [
      { text: 'Both nuclei are positively charged. They need enough kinetic energy to overcome their mutual electrostatic repulsion and get close enough for the strong nuclear force to take over', isCorrect: true },
      { text: 'To melt the fuel so that the nuclei can move freely', isCorrect: false },
      { text: 'Because heat is itself the energy source that drives the reaction', isCorrect: false },
      { text: 'Only to ionise the fuel into a plasma, which is the sole requirement', isCorrect: false },
    ],
    correctValue: 'to overcome Coulomb repulsion',
    targetedMisconceptions: [],
    source: src('phys.mod.nuclear-fusion', 'the Coulomb barrier is the whole engineering problem; ionisation happens far below fusion temperatures, so the last option names a real step and stops short of the reason'),
  },
  {
    conceptId: 'phys.mod.nuclear-models', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the LIQUID-DROP model of the nucleus successfully account for?',
    choices: [
      { text: 'The broad trend of binding energy with mass number, and fission — by treating the nucleus as an incompressible drop held together by something like surface tension', isCorrect: true },
      { text: 'The magic numbers of particularly stable nuclei', isCorrect: false },
      { text: 'The spin of individual nucleons', isCorrect: false },
      { text: 'The existence of quarks inside protons and neutrons', isCorrect: false },
    ],
    correctValue: 'binding-energy trend and fission',
    targetedMisconceptions: [],
    source: src('phys.mod.nuclear-models', 'magic numbers are exactly what the liquid-drop model CANNOT explain and the shell model can — the two models are kept because each covers the other\'s failures'),
  },
  {
    conceptId: 'phys.mod.nuclear-reactions', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In any nuclear reaction equation, which two quantities must balance on the two sides?',
    choices: [
      { text: 'The mass number A and the atomic number Z', isCorrect: true },
      { text: 'The number of neutrons and the total mass in kilograms', isCorrect: false },
      { text: 'The total energy and the number of protons only', isCorrect: false },
      { text: 'The number of electrons and the mass number', isCorrect: false },
    ],
    correctValue: 'A and Z',
    targetedMisconceptions: [],
    source: src('phys.mod.nuclear-reactions', 'the total MASS deliberately does not balance — that difference is the Q-value, and treating mass as conserved is what makes the energy release impossible to locate'),
  },
  {
    conceptId: 'phys.mod.photons', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the energy of a single photon of frequency f?',
    choices: [
      { text: 'hf, where h is the Planck constant', isCorrect: true },
      { text: 'h/f', isCorrect: false },
      { text: 'hf²', isCorrect: false },
      { text: 'hc, independent of the frequency', isCorrect: false },
    ],
    correctValue: 'E = hf',
    targetedMisconceptions: [],
    source: src('phys.mod.photons', 'E = hf is the relation the concept\'s existing two-laser probe depends on; h/f is the shape of the de Broglie relation borrowed into the wrong place'),
  },
  {
    conceptId: 'phys.mod.pn-junction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the DEPLETION REGION of a p-n junction?',
    choices: [
      { text: 'A thin zone either side of the junction that diffusion and recombination have emptied of mobile charge carriers', isCorrect: true },
      { text: 'A region where the silicon itself is physically absent', isCorrect: false },
      { text: 'The region through which current flows most easily', isCorrect: false },
      { text: 'The metal contact attached at each end of the device', isCorrect: false },
    ],
    correctValue: 'a zone emptied of mobile carriers',
    targetedMisconceptions: [],
    source: src('phys.mod.pn-junction', 'what is depleted is the mobile CARRIERS, not the material — and it is the region of LEAST conduction, which is the opposite of the third option and the reason a diode blocks at all'),
  },
  {
    conceptId: 'phys.mod.pn-junction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Under REVERSE bias, why does a p-n junction pass almost no current?',
    choices: [
      { text: 'The applied voltage pulls the majority carriers away from the junction, widening the depletion region — so almost none can cross', isCorrect: true },
      { text: 'The junction is physically damaged by reverse voltage', isCorrect: false },
      { text: 'The depletion region disappears under reverse bias', isCorrect: false },
      { text: 'Current does flow, but the connecting wires are too thin to carry it', isCorrect: false },
    ],
    correctValue: 'the depletion region widens',
    targetedMisconceptions: [],
    source: src('phys.mod.pn-junction', 'forward bias NARROWS the depletion region and reverse bias widens it; getting that backwards is what makes rectification look arbitrary rather than mechanical'),
  },
  {
    conceptId: 'phys.mod.radioactive-decay', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the half-life of a radioactive isotope mean?',
    choices: [
      { text: 'The time for half of the nuclei present to decay — the same length of time whatever the starting amount', isCorrect: true },
      { text: 'The time until the sample becomes completely safe', isCorrect: false },
      { text: 'Half the time it takes the entire sample to decay', isCorrect: false },
      { text: 'The time for the activity to fall to zero', isCorrect: false },
    ],
    correctValue: 'time for half the nuclei to decay',
    targetedMisconceptions: [],
    source: src('phys.mod.radioactive-decay', 'independence from the starting amount is what makes half-life a constant of the isotope; exponential decay never reaches zero, so the last two options both assume a finish that does not exist'),
  },
  {
    conceptId: 'phys.mod.radioactivity', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Rank alpha, beta and gamma radiation by penetrating power, from LEAST penetrating to most.',
    choices: [
      { text: 'Alpha, then beta, then gamma', isCorrect: true },
      { text: 'Gamma, then beta, then alpha', isCorrect: false },
      { text: 'Beta, then alpha, then gamma', isCorrect: false },
      { text: 'They all penetrate matter equally', isCorrect: false },
    ],
    correctValue: 'alpha < beta < gamma',
    targetedMisconceptions: [],
    source: src('phys.mod.radioactivity', 'penetration runs opposite to IONISING power, which is why the concept\'s existing probe about an alpha source being the more dangerous one — once inside the body — is not a contradiction'),
  },
  {
    conceptId: 'phys.mod.semiconductor-classification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these materials is a semiconductor?',
    choices: [
      { text: 'Silicon', isCorrect: true },
      { text: 'Copper', isCorrect: false },
      { text: 'Rubber', isCorrect: false },
      { text: 'Glass', isCorrect: false },
    ],
    correctValue: 'silicon',
    targetedMisconceptions: [],
    source: src('phys.mod.semiconductor-classification', 'one conductor and two insulators as the alternatives, so the sorting is across the whole classification the concept names rather than within one half of it'),
  },
  {
    conceptId: 'phys.mod.semiconductor-classification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is silicon, rather than a good metal, the basis of modern electronics?',
    choices: [
      { text: 'Its conductivity can be CONTROLLED — by doping and by an applied voltage — which is what makes a switchable device possible. A metal\'s conductivity cannot be modulated that way', isCorrect: true },
      { text: 'Because silicon conducts electricity better than copper does', isCorrect: false },
      { text: 'Because silicon is cheaper than any metal', isCorrect: false },
      { text: 'Because silicon does not heat up when current flows through it', isCorrect: false },
    ],
    correctValue: 'its conductivity can be controlled',
    targetedMisconceptions: [],
    source: src('phys.mod.semiconductor-classification', 'the useful property is CONTROLLABILITY, not high conductivity — silicon is a far worse conductor than copper, which is exactly why the first distractor is worth offering'),
  },
  {
    conceptId: 'phys.mod.wave-particle-duality', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does wave–particle duality actually claim?',
    choices: [
      { text: 'One and the same entity shows wave behaviour in some experiments and particle behaviour in others — which appears depends on what is measured', isCorrect: true },
      { text: 'That light is a wave and matter is made of particles', isCorrect: false },
      { text: 'That an entity is a wave while it is moving and a particle when it is stationary', isCorrect: false },
      { text: 'That the theory is incomplete, and one of the two descriptions will eventually turn out to be the right one', isCorrect: false },
    ],
    correctValue: 'behaviour depends on the measurement',
    targetedMisconceptions: [],
    source: src('phys.mod.wave-particle-duality', 'the last option treats duality as a temporary embarrassment rather than a result; it is the belief the concept\'s existing alternation probe attacks from a different angle'),
  },
  {
    conceptId: 'phys.mod.x-rays', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How are X-rays produced in an X-ray tube?',
    choices: [
      { text: 'Fast electrons are decelerated abruptly on striking a metal target, giving a continuous spectrum, together with characteristic lines from inner-shell electron transitions', isCorrect: true },
      { text: 'By the radioactive decay of the metal target', isCorrect: false },
      { text: 'By heating the target until it glows brightly enough', isCorrect: false },
      { text: 'By passing very high-frequency alternating current through a filament', isCorrect: false },
    ],
    correctValue: 'electron deceleration at a target',
    targetedMisconceptions: [],
    source: src('phys.mod.x-rays', 'an X-ray tube contains nothing radioactive and switches off completely, which is the practical consequence of the correct answer; the glowing-target option is thermal radiation, which never reaches X-ray energies at any attainable temperature'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 12 — phys.opt @ HIGH, all fourteen short pairs. Domain complete.
// ═══════════════════════════════════════════════════════════════════════════

const OPT: SeedProbe[] = [
  {
    conceptId: 'phys.opt.brewsters-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Unpolarised light strikes a glass surface at exactly Brewster\'s angle. What is special about the REFLECTED light?',
    choices: [
      { text: 'It is completely plane-polarised, with its electric field perpendicular to the plane of incidence', isCorrect: true },
      { text: 'It is completely absorbed by the glass', isCorrect: false },
      { text: 'It reaches its maximum possible intensity', isCorrect: false },
      { text: 'It is entirely unpolarised, whatever the incoming light was', isCorrect: false },
    ],
    correctValue: 'completely plane-polarised',
    targetedMisconceptions: [],
    source: src('phys.opt.brewsters-law', 'Brewster\'s angle is where the reflected beam is fully polarised, and the intensity there is in fact LOW rather than maximal — which is exactly why polarising sunglasses work on glare'),
  },
  {
    conceptId: 'phys.opt.brewsters-law', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'When light is incident at Brewster\'s angle, what is the angle between the reflected ray and the refracted ray?',
    choices: [
      { text: 'Exactly 90°', isCorrect: true },
      { text: '0° — the two rays travel together', isCorrect: false },
      { text: '45°, whatever the medium', isCorrect: false },
      { text: 'It depends on the refractive index, and has no fixed value', isCorrect: false },
    ],
    correctValue: '90 degrees',
    targetedMisconceptions: [],
    source: src('phys.opt.brewsters-law', 'the right angle is what makes the polarisation total — the dipoles that would radiate the parallel component are oscillating along the reflected direction and cannot radiate along it'),
  },
  {
    conceptId: 'phys.opt.diffraction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Under what condition is diffraction most noticeable?',
    choices: [
      { text: 'When the aperture or obstacle is comparable in size to the wavelength', isCorrect: true },
      { text: 'When the aperture is very much larger than the wavelength', isCorrect: false },
      { text: 'When the light source is very bright', isCorrect: false },
      { text: 'When the light is a single pure colour', isCorrect: false },
    ],
    correctValue: 'aperture comparable to the wavelength',
    targetedMisconceptions: [],
    source: src('phys.opt.diffraction', 'the size COMPARISON is the condition, which is why sound diffracts round a doorway and light does not — monochromatic light makes the pattern clearer without making diffraction any stronger'),
  },
  {
    conceptId: 'phys.opt.dispersion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is dispersion?',
    choices: [
      { text: 'The splitting of white light into its component colours, because the refractive index of the medium varies with wavelength', isCorrect: true },
      { text: 'The spreading out of a light beam as it travels away from its source', isCorrect: false },
      { text: 'The loss of intensity of light with distance', isCorrect: false },
      { text: 'The scattering of light by dust and small particles', isCorrect: false },
    ],
    correctValue: 'refractive index varies with wavelength',
    targetedMisconceptions: [],
    source: src('phys.opt.dispersion', 'dispersion is a property of the MEDIUM, not of the beam — the spreading and scattering options are two other real phenomena that the word suggests and does not mean'),
  },
  {
    conceptId: 'phys.opt.dispersion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'White light passing through a triangular prism disperses into a spectrum, but white light passing through a rectangular glass block does not emerge dispersed. Why the difference?',
    choices: [
      { text: 'The block\'s two faces are PARALLEL, so whatever separation occurs at the first face is undone at the second. A prism\'s faces are not parallel, so the separation accumulates', isCorrect: true },
      { text: 'A rectangular block is made from a different kind of glass', isCorrect: false },
      { text: 'The block is too thin for dispersion to build up', isCorrect: false },
      { text: 'Dispersion requires at least one curved surface', isCorrect: false },
    ],
    correctValue: 'parallel faces undo the separation',
    targetedMisconceptions: [],
    source: src('phys.opt.dispersion', 'the block does disperse internally and then un-disperses; the colours emerge parallel but very slightly displaced. Believing the block simply does not disperse is what makes prism geometry look like a material property'),
  },
  {
    conceptId: 'phys.opt.lens-power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A converging lens has a focal length of 25 cm. What is its power?',
    choices: [
      { text: '+4.0 D', isCorrect: true },
      { text: '+0.040 D — using the focal length in centimetres', isCorrect: false },
      { text: '+25 D', isCorrect: false },
      { text: '+0.25 D', isCorrect: false },
    ],
    correctValue: '+4.0 D',
    targetedMisconceptions: [],
    source: src('phys.opt.lens-power', 'P = 1/f with f in METRES: 1/0.25 = 4.0 D. Leaving the focal length in centimetres gives 0.040 D, an error of exactly one hundred, and the dioptre is defined so that this cannot be fudged'),
  },
  {
    conceptId: 'phys.opt.lens-power', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A spectacle prescription reads −2.5 D. What does the sign tell you, and which condition is being corrected?',
    choices: [
      { text: 'A DIVERGING lens, correcting short sight — the eye focuses too strongly, so the correction must reduce the total power', isCorrect: true },
      { text: 'A converging lens, correcting long sight', isCorrect: false },
      { text: 'A diverging lens, correcting long sight', isCorrect: false },
      { text: 'The sign simply records which eye the lens is for', isCorrect: false },
    ],
    correctValue: 'diverging, short sight',
    targetedMisconceptions: [],
    source: src('phys.opt.lens-power', 'the sign carries physical content, and the concept\'s existing −5 D versus +2 D probe depends on that; pairing the correct lens type with the WRONG condition is the more instructive of the two ways to get this wrong'),
  },
  {
    conceptId: 'phys.opt.lenses', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'An object stands 15 cm from a converging lens of focal length 10 cm. Where is the image formed, and what kind is it?',
    choices: [
      { text: '30 cm on the far side of the lens — a real, inverted image, twice the size of the object', isCorrect: true },
      { text: '6 cm from the lens, real and inverted', isCorrect: false },
      { text: '30 cm on the SAME side as the object — a virtual, upright image', isCorrect: false },
      { text: '25 cm on the far side — the object distance plus the focal length', isCorrect: false },
    ],
    correctValue: '30 cm, real, inverted, magnified',
    targetedMisconceptions: [],
    source: src('phys.opt.lenses', '1/v = 1/f + 1/u with u = −15 cm gives 1/v = 1/10 − 1/15 = 1/30, so v = +30 cm and m = v/u = −2. The object sits between f and 2f, which is the case that magnifies — the last option adds the distances, which is the arithmetic shortcut the lens equation exists to replace'),
  },
  {
    conceptId: 'phys.opt.mirrors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What kind of image does a PLANE mirror always form?',
    choices: [
      { text: 'Virtual, upright, the same size as the object, and as far behind the mirror as the object is in front', isCorrect: true },
      { text: 'Real, inverted, and the same size', isCorrect: false },
      { text: 'Virtual, inverted, and magnified', isCorrect: false },
      { text: 'Real, upright, and diminished', isCorrect: false },
    ],
    correctValue: 'virtual, upright, same size',
    targetedMisconceptions: [],
    source: src('phys.opt.mirrors', 'a plane mirror image can never be caught on a screen, which is what VIRTUAL means; the left-right reversal people notice is not an inversion, and the inverted options trade on that confusion'),
  },
  {
    conceptId: 'phys.opt.mirrors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A car wing mirror is convex and carries the warning "objects in mirror are closer than they appear". Why is it convex, and why does that warning follow?',
    choices: [
      { text: 'Convex gives a much wider field of view, but the image is DIMINISHED — and the eye reads a smaller image as a more distant object', isCorrect: true },
      { text: 'Convex mirrors magnify, so objects look nearer than they really are', isCorrect: false },
      { text: 'The warning is only about the curvature distorting shapes near the edge', isCorrect: false },
      { text: 'Convex mirrors form real images that appear to sit beyond the glass', isCorrect: false },
    ],
    correctValue: 'wide field, diminished image',
    targetedMisconceptions: [],
    source: src('phys.opt.mirrors', 'the wide field of view is bought with magnification below one, and the warning exists precisely because the trade-off misleads the eye — the second option has the sign of the magnification backwards'),
  },
  {
    conceptId: 'phys.opt.nature-of-light', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the speed of light in a vacuum, to three significant figures?',
    choices: [
      { text: '3.00 × 10⁸ m/s', isCorrect: true },
      { text: '3.00 × 10⁶ m/s', isCorrect: false },
      { text: '3.00 × 10¹⁰ m/s', isCorrect: false },
      { text: '1.50 × 10⁸ m/s', isCorrect: false },
    ],
    correctValue: '3.00e8 m/s',
    targetedMisconceptions: [],
    source: src('phys.opt.nature-of-light', 'the 3.00e10 option is the value in centimetres per second, which appears in older texts and is the near-miss most likely to be half-remembered'),
  },
  {
    conceptId: 'phys.opt.nature-of-light', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Which single observation is hardest for a purely WAVE model of light to account for?',
    choices: [
      { text: 'The photoelectric effect — emission depends on a frequency threshold and not on intensity, whereas a wave of any frequency should eventually deliver enough energy if you wait', isCorrect: true },
      { text: 'Diffraction round the edge of an obstacle', isCorrect: false },
      { text: 'Refraction on entering glass', isCorrect: false },
      { text: 'Interference between two coherent beams', isCorrect: false },
    ],
    correctValue: 'the photoelectric effect',
    targetedMisconceptions: [],
    source: src('phys.opt.nature-of-light', 'all three distractors are the phenomena the wave model explains BEST, which is what makes the question a real test — the concept\'s existing intense-red-light probe stages exactly this failure'),
  },
  {
    conceptId: 'phys.opt.optical-instruments', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a refracting astronomical telescope in normal adjustment, how is the angular magnification calculated?',
    choices: [
      { text: 'The focal length of the objective divided by the focal length of the eyepiece', isCorrect: true },
      { text: 'The focal length of the eyepiece divided by that of the objective', isCorrect: false },
      { text: 'The two focal lengths multiplied together', isCorrect: false },
      { text: 'The diameter of the objective divided by the diameter of the eyepiece', isCorrect: false },
    ],
    correctValue: 'f_objective / f_eyepiece',
    targetedMisconceptions: [],
    source: src('phys.opt.optical-instruments', 'the ratio inverted gives magnifications below one for every real telescope, which is a check the learner can apply themselves; the diameter option confuses magnification with light-gathering'),
  },
  {
    conceptId: 'phys.opt.optical-instruments', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Research telescopes are built with enormous objective mirrors, even though magnification could be raised simply by fitting a shorter-focus eyepiece. Why the expense?',
    choices: [
      { text: 'A larger aperture collects more light AND resolves finer detail. Magnification without either of those just enlarges a blur', isCorrect: true },
      { text: 'Large mirrors are easier to manufacture than large lenses, and that is the whole reason', isCorrect: false },
      { text: 'A bigger mirror produces higher magnification directly', isCorrect: false },
      { text: 'A bigger mirror reduces the blurring caused by the Earth\'s rotation', isCorrect: false },
    ],
    correctValue: 'light gathering and resolution',
    targetedMisconceptions: [],
    source: src('phys.opt.optical-instruments', 'empty magnification is the idea being tested; the mirrors-versus-lenses option is a true statement about construction offered as though it were the optical reason'),
  },
  {
    conceptId: 'phys.opt.polarization', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does it mean to say that light is POLARISED?',
    choices: [
      { text: 'Its electric field oscillates in one particular direction, rather than in all directions perpendicular to its travel', isCorrect: true },
      { text: 'It travels in one direction only', isCorrect: false },
      { text: 'It has been separated into its component colours', isCorrect: false },
      { text: 'It consists of a single wavelength', isCorrect: false },
    ],
    correctValue: 'the E field oscillates in one direction',
    targetedMisconceptions: [],
    source: src('phys.opt.polarization', 'polarisation is about the ORIENTATION of the oscillation, not the direction of travel and not the colour — the single-wavelength option is monochromatic, an independent property'),
  },
  {
    conceptId: 'phys.opt.polarization', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Unpolarised light of intensity I₀ passes through an ideal polariser, then through a second polariser at 60° to the first. What intensity emerges?',
    choices: [
      { text: 'I₀/8', isCorrect: true },
      { text: 'I₀/4 — halving at each polariser', isCorrect: false },
      { text: 'I₀/2 — the second polariser makes no further difference', isCorrect: false },
      { text: '0.25 I₀ — applying Malus\'s law to the original beam without the first halving', isCorrect: false },
    ],
    correctValue: 'I0/8',
    targetedMisconceptions: [],
    source: src('phys.opt.polarization', 'the first polariser HALVES unpolarised light, then Malus gives cos²60° = 0.25: I₀/2 × 0.25 = I₀/8. Applying Malus at the first polariser too is the standard error, and it is what the last option does'),
  },
  {
    conceptId: 'phys.opt.reflection', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the law of reflection state?',
    choices: [
      { text: 'The angle of incidence equals the angle of reflection, both measured from the NORMAL, and the incident ray, reflected ray and normal all lie in one plane', isCorrect: true },
      { text: 'The angle of incidence equals the angle of reflection, both measured from the surface', isCorrect: false },
      { text: 'The reflected ray is always perpendicular to the incident ray', isCorrect: false },
      { text: 'The angle of reflection depends on the wavelength of the light', isCorrect: false },
    ],
    correctValue: 'equal angles from the normal',
    targetedMisconceptions: [],
    source: src('phys.opt.reflection', 'the second option gives the same NUMBER only by coincidence and the wrong number in general — the concept\'s existing "30° with the surface" probe is built on precisely that trap'),
  },
  {
    conceptId: 'phys.opt.reflection', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A ray strikes a plane mirror. The mirror is then rotated by 10° while the incident ray stays exactly where it was. Through what angle does the reflected ray turn?',
    choices: [
      { text: '20° — twice the rotation of the mirror', isCorrect: true },
      { text: '10° — the same as the mirror', isCorrect: false },
      { text: '5° — half the rotation of the mirror', isCorrect: false },
      { text: '0° — the reflected ray is fixed by the incident ray', isCorrect: false },
    ],
    correctValue: '20 degrees',
    targetedMisconceptions: [],
    source: src('phys.opt.reflection', 'rotating the mirror by θ rotates the NORMAL by θ, and the angle of incidence and reflection each change by θ — so the reflected ray moves by 2θ. This doubling is the whole basis of the optical lever and of galvanometer mirror scales'),
  },
  {
    conceptId: 'phys.opt.refraction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the refractive index of a medium?',
    choices: [
      { text: 'The ratio of the speed of light in a vacuum to its speed in that medium', isCorrect: true },
      { text: 'The ratio of the angle of incidence to the angle of refraction', isCorrect: false },
      { text: 'The fraction of the incident light that is transmitted rather than reflected', isCorrect: false },
      { text: 'The number of times a ray bends as it crosses the medium', isCorrect: false },
    ],
    correctValue: 'ratio of speeds',
    targetedMisconceptions: [],
    source: src('phys.opt.refraction', 'the ratio of the SINES of the angles equals n, but the ratio of the angles themselves does not — the second option is Snell\'s law with the sines dropped, and it is accurate only for very small angles'),
  },
  {
    conceptId: 'phys.opt.refraction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Light travelling in air meets a glass surface (n = 1.50) at 30° to the normal. What is the angle of refraction inside the glass?',
    choices: [
      { text: 'About 19.5°', isCorrect: true },
      { text: 'About 48.6° — multiplying by the refractive index instead of dividing', isCorrect: false },
      { text: '30° — the angle does not change', isCorrect: false },
      { text: '20° — dividing the angle itself by 1.50', isCorrect: false },
    ],
    correctValue: '19.5 degrees',
    targetedMisconceptions: [],
    source: src('phys.opt.refraction', 'sin r = sin 30° / 1.50 = 0.3333, so r = 19.5°. The 20° option divides the ANGLE rather than its sine, which lands close enough to look right and is a different operation'),
  },
  {
    conceptId: 'phys.opt.total-internal-reflection', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which TWO conditions must both hold for total internal reflection to occur?',
    choices: [
      { text: 'The light must be travelling from the denser medium into the less dense one, AND the angle of incidence must exceed the critical angle', isCorrect: true },
      { text: 'The light must be a single colour, and above the critical angle', isCorrect: false },
      { text: 'The surface must be highly polished, and the light must be intense', isCorrect: false },
      { text: 'The two media must have equal refractive indices, and the angle must be large', isCorrect: false },
    ],
    correctValue: 'denser to rarer, above the critical angle',
    targetedMisconceptions: [],
    source: src('phys.opt.total-internal-reflection', 'BOTH conditions are needed, and the direction is the one learners drop — which is what the concept\'s existing air-into-glass probe tests: no angle whatsoever produces TIR going that way'),
  },
  {
    conceptId: 'phys.opt.total-internal-reflection', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is the critical angle for a glass–air boundary, with n_glass = 1.50?',
    choices: [
      { text: 'About 41.8°', isCorrect: true },
      { text: 'About 48.2° — taking the inverse sine of 1.50 minus the result', isCorrect: false },
      { text: 'About 33.3°', isCorrect: false },
      { text: '60°', isCorrect: false },
    ],
    correctValue: '41.8 degrees',
    targetedMisconceptions: [],
    source: src('phys.opt.total-internal-reflection', 'sin C = 1/1.50 = 0.667, so C = 41.8°. The 48.2° option is its complement, which is what you get from measuring the angle from the surface rather than from the normal'),
  },
  {
    conceptId: 'phys.opt.wave-optics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What path difference between two coherent sources produces CONSTRUCTIVE interference?',
    choices: [
      { text: 'A whole number of wavelengths', isCorrect: true },
      { text: 'An odd number of half wavelengths', isCorrect: false },
      { text: 'Any path difference at all, provided the sources are coherent', isCorrect: false },
      { text: 'Zero path difference, and nothing else', isCorrect: false },
    ],
    correctValue: 'a whole number of wavelengths',
    targetedMisconceptions: [],
    source: src('phys.opt.wave-optics', 'the second option is the DESTRUCTIVE condition, and swapping the two is the single most common error in this topic; the last option is right about one case and wrong that it is the only one'),
  },
  {
    conceptId: 'phys.opt.wave-optics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A soap film shows shifting bands of colour, and the colours change as the film drains and thins. What causes that?',
    choices: [
      { text: 'Light reflected from the front and back surfaces interferes. The thickness decides which wavelengths reinforce, so as the film thins the reinforced colour shifts', isCorrect: true },
      { text: 'The soap changes colour chemically as water drains out of it', isCorrect: false },
      { text: 'The film disperses the light, as a prism does', isCorrect: false },
      { text: 'The film scatters different colours at different rates', isCorrect: false },
    ],
    correctValue: 'thin-film interference',
    targetedMisconceptions: [],
    source: src('phys.opt.wave-optics', 'thin-film interference is the everyday sighting of the concept, and the prism option is the plausible substitute — dispersion would give a fixed spectrum, not colours that change as the thickness changes'),
  },
  {
    conceptId: 'phys.opt.youngs-experiment', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What did Young\'s double-slit experiment establish about the nature of light?',
    choices: [
      { text: 'That it behaves as a WAVE — only waves produce an interference pattern of alternating bright and dark fringes', isCorrect: true },
      { text: 'That light travels in straight lines', isCorrect: false },
      { text: 'That light has a finite speed', isCorrect: false },
      { text: 'That white light is a mixture of colours', isCorrect: false },
    ],
    correctValue: 'light behaves as a wave',
    targetedMisconceptions: [],
    source: src('phys.opt.youngs-experiment', 'all three distractors are genuine results about light established by other experiments, so the question tests which experiment showed WHAT rather than what is true of light'),
  },
  {
    conceptId: 'phys.opt.youngs-experiment', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'In a double-slit experiment the slits are 0.50 mm apart and the screen is 2.0 m away. With light of wavelength 600 nm, what is the spacing between adjacent bright fringes?',
    choices: [
      { text: '2.4 mm', isCorrect: true },
      { text: '0.24 mm', isCorrect: false },
      { text: '24 mm', isCorrect: false },
      { text: '1.2 mm — leaving the screen distance at 1.0 m', isCorrect: false },
    ],
    correctValue: '2.4 mm',
    targetedMisconceptions: [],
    source: src('phys.opt.youngs-experiment', 'y = λD/d = 600e-9 × 2.0 / 0.50e-3 = 2.4 mm. The two wrong powers of ten are what a mishandled milli or nano prefix produces, and the answer is a length you could actually measure with a ruler'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 13 — phys.qm @ HIGH, all sixteen short pairs. Domain complete.
// ═══════════════════════════════════════════════════════════════════════════

const QM: SeedProbe[] = [
  {
    conceptId: 'phys.qm.angular-momentum-addition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two angular momenta j₁ and j₂ are combined. What values may the total j take?',
    choices: [
      { text: 'Every value from |j₁ − j₂| up to j₁ + j₂, in integer steps', isCorrect: true },
      { text: 'Only j₁ + j₂ — angular momenta simply add', isCorrect: false },
      { text: 'Only |j₁ − j₂|', isCorrect: false },
      { text: 'The average of j₁ and j₂', isCorrect: false },
    ],
    correctValue: 'from |j1-j2| to j1+j2',
    targetedMisconceptions: [],
    source: src('phys.qm.angular-momentum-addition', 'the whole LADDER of values is the result; treating angular momenta as ordinary vectors that just add gives only the maximum, which is the top rung and not the answer'),
  },
  {
    conceptId: 'phys.qm.angular-momentum-addition', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Two angular momenta of j₁ = 1 and j₂ = 1 are coupled. How many states are there in total, and how do they divide between the allowed values of j?',
    choices: [
      { text: 'Nine states: j = 2 with five, j = 1 with three, and j = 0 with one', isCorrect: true },
      { text: 'Nine states, all of them with j = 2', isCorrect: false },
      { text: 'Six states: j = 2 and j = 1 only', isCorrect: false },
      { text: 'Three states, one for each allowed value of j', isCorrect: false },
    ],
    correctValue: '9 states as 5 + 3 + 1',
    targetedMisconceptions: [],
    source: src('phys.qm.angular-momentum-addition', 'the count must be preserved: (2j₁+1)(2j₂+1) = 9 before coupling, and 5 + 3 + 1 = 9 after. That arithmetic check is the fastest way to catch a wrong decomposition'),
  },
  {
    conceptId: 'phys.qm.density-matrix', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For any valid density matrix ρ, what does Tr(ρ) equal, and why?',
    choices: [
      { text: 'One — the diagonal entries are probabilities, and they must sum to one', isCorrect: true },
      { text: 'Zero', isCorrect: false },
      { text: 'The energy of the state', isCorrect: false },
      { text: 'The number of particles described', isCorrect: false },
    ],
    correctValue: 'Tr(rho) = 1',
    targetedMisconceptions: [],
    source: src('phys.qm.density-matrix', 'normalisation for a density matrix is a TRACE condition rather than an integral, and it is what makes the next question — Tr(ρ²) — a meaningful comparison'),
  },
  {
    conceptId: 'phys.qm.density-matrix', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Which single computed quantity tells you whether a density matrix describes a PURE state or a mixed one?',
    choices: [
      { text: 'Tr(ρ²) — it equals one for a pure state and is strictly less than one for a mixed state', isCorrect: true },
      { text: 'Tr(ρ) — one for a pure state, less than one for a mixed state', isCorrect: false },
      { text: 'The determinant of ρ', isCorrect: false },
      { text: 'The dimension of the matrix', isCorrect: false },
    ],
    correctValue: 'Tr(rho squared)',
    targetedMisconceptions: [],
    source: src('phys.qm.density-matrix', 'Tr(ρ) is one for EVERY valid state and so distinguishes nothing — offering it is the point, since the two traces look interchangeable until you notice that one is a normalisation and the other is a purity'),
  },
  {
    conceptId: 'phys.qm.harmonic-oscillator-qm', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How are the energy levels of the quantum harmonic oscillator spaced?',
    choices: [
      { text: 'Equally — every adjacent pair is separated by ħω, all the way up', isCorrect: true },
      { text: 'They crowd closer together as n rises, as hydrogen\'s levels do', isCorrect: false },
      { text: 'They spread further apart as n rises', isCorrect: false },
      { text: 'They have no regular pattern', isCorrect: false },
    ],
    correctValue: 'equally spaced by hbar omega',
    targetedMisconceptions: [],
    source: src('phys.qm.harmonic-oscillator-qm', 'even spacing is what makes the oscillator the model for photons and phonons; the crowding pattern belongs to HYDROGEN, and importing it here is the standard cross-system error'),
  },
  {
    conceptId: 'phys.qm.hydrogen-atom-qm', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the basic quantum treatment of hydrogen — ignoring fine structure — which quantum number alone fixes the ENERGY of a level?',
    choices: [
      { text: 'The principal quantum number n', isCorrect: true },
      { text: 'The orbital quantum number l', isCorrect: false },
      { text: 'n and l together', isCorrect: false },
      { text: 'The magnetic quantum number m', isCorrect: false },
    ],
    correctValue: 'n alone',
    targetedMisconceptions: [],
    source: src('phys.qm.hydrogen-atom-qm', 'the l-degeneracy is special to the pure Coulomb potential — in every multi-electron atom the energy DOES depend on l, so "n and l together" is the right answer to a question about a different atom'),
  },
  {
    conceptId: 'phys.qm.identical-particles', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What happens to the total wavefunction when two identical particles are exchanged?',
    choices: [
      { text: 'It is symmetric — unchanged — for bosons, and antisymmetric — it changes sign — for fermions', isCorrect: true },
      { text: 'It is always symmetric, since the particles are indistinguishable', isCorrect: false },
      { text: 'It is always antisymmetric', isCorrect: false },
      { text: 'It depends on the potential the particles are sitting in', isCorrect: false },
    ],
    correctValue: 'symmetric for bosons, antisymmetric for fermions',
    targetedMisconceptions: [],
    source: src('phys.qm.identical-particles', 'the exchange behaviour is fixed by the SPIN of the particles and by nothing else — not by the potential, and not by indistinguishability alone, which would suggest symmetry for everything'),
  },
  {
    conceptId: 'phys.qm.identical-particles', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why does the antisymmetry requirement forbid two identical fermions from occupying the same single-particle state?',
    choices: [
      { text: 'Putting both particles in the same state makes the antisymmetrised wavefunction identically ZERO — so the probability of that configuration is zero', isCorrect: true },
      { text: 'Because the two fermions repel each other electrostatically', isCorrect: false },
      { text: 'Because their spins are unable to align', isCorrect: false },
      { text: 'Because the energy of such a configuration would be infinite', isCorrect: false },
    ],
    correctValue: 'the wavefunction vanishes',
    targetedMisconceptions: [],
    source: src('phys.qm.identical-particles', 'the exclusion is a statement about the wavefunction VANISHING, not about a force — which is why it applies just as strictly to neutral fermions like neutrons, where the electrostatic story has nothing to say'),
  },
  {
    conceptId: 'phys.qm.operators', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why must an operator representing a physical observable be Hermitian?',
    choices: [
      { text: 'Because a Hermitian operator has real eigenvalues, and any measured result has to be a real number', isCorrect: true },
      { text: 'Because it has to commute with the Hamiltonian', isCorrect: false },
      { text: 'Because it has to be invertible', isCorrect: false },
      { text: 'Because the wavefunction has to stay normalised', isCorrect: false },
    ],
    correctValue: 'real eigenvalues',
    targetedMisconceptions: [],
    source: src('phys.qm.operators', 'commuting with H makes an observable CONSERVED, which is a different and much stronger property that most observables do not have — offering it tests whether the two requirements have been separated'),
  },
  {
    conceptId: 'phys.qm.particle-in-box', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How does the energy of a particle in an infinite square well depend on the quantum number n?',
    choices: [
      { text: 'It goes as n² — so the levels spread further apart as n rises', isCorrect: true },
      { text: 'It goes as n, giving equally spaced levels', isCorrect: false },
      { text: 'It goes as 1/n²', isCorrect: false },
      { text: 'It goes as 1/n, as hydrogen\'s levels do', isCorrect: false },
    ],
    correctValue: 'E goes as n squared',
    targetedMisconceptions: [],
    source: src('phys.qm.particle-in-box', 'three different n-dependences appear across the standard solvable systems — n² for the box, n for the oscillator, −1/n² for hydrogen — and mixing them up is the commonest error in this part of the syllabus'),
  },
  {
    conceptId: 'phys.qm.pauli-exclusion', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To which particles does the Pauli exclusion principle apply?',
    choices: [
      { text: 'Fermions — particles of half-integer spin, such as electrons, protons and neutrons', isCorrect: true },
      { text: 'All particles without exception', isCorrect: false },
      { text: 'Bosons only', isCorrect: false },
      { text: 'Charged particles only', isCorrect: false },
    ],
    correctValue: 'fermions',
    targetedMisconceptions: [],
    source: src('phys.qm.pauli-exclusion', 'bosons do the OPPOSITE and crowd into the same state, which is what makes a laser and a Bose-Einstein condensate possible; the charged-particles option fails on the neutron, which is excluded and neutral'),
  },
  {
    conceptId: 'phys.qm.perturbation-theory', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the essential idea of perturbation theory?',
    choices: [
      { text: 'Start from a problem you can solve exactly, add a small extra term, and compute corrections to the energies and states order by order in that term', isCorrect: true },
      { text: 'Solve the full problem numerically to whatever accuracy is needed', isCorrect: false },
      { text: 'Replace the awkward potential with a simpler one and accept the resulting error', isCorrect: false },
      { text: 'Average the energy over a family of trial wavefunctions', isCorrect: false },
    ],
    correctValue: 'corrections order by order',
    targetedMisconceptions: [],
    source: src('phys.qm.perturbation-theory', 'the last option is the VARIATIONAL method, which is the neighbouring approximation technique — the two are regularly conflated, and they answer different questions'),
  },
  {
    conceptId: 'phys.qm.s-matrix-basics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the S-matrix relate?',
    choices: [
      { text: 'The asymptotic INCOMING states of a scattering process to the asymptotic OUTGOING states', isCorrect: true },
      { text: 'The bound states of a potential to their energies', isCorrect: false },
      { text: 'Position to momentum', isCorrect: false },
      { text: 'The wavefunction at two different times while it is inside the interaction region', isCorrect: false },
    ],
    correctValue: 'incoming to outgoing asymptotic states',
    targetedMisconceptions: [],
    source: src('phys.qm.s-matrix-basics', 'the S-matrix deliberately says nothing about what happens DURING the interaction — only about what goes in and what comes out, which is exactly why it survives when the interior dynamics are unknown'),
  },
  {
    conceptId: 'phys.qm.s-matrix-basics', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'In terms of the S-matrix, what is a scattering RESONANCE?',
    choices: [
      { text: 'A pole of the S-matrix at a complex energy — the real part gives the resonance energy and the imaginary part its width, and hence the lifetime of the state', isCorrect: true },
      { text: 'A zero of the S-matrix', isCorrect: false },
      { text: 'An energy at which the S-matrix stops being unitary', isCorrect: false },
      { text: 'The energy at which the cross-section falls to zero', isCorrect: false },
    ],
    correctValue: 'a complex-energy pole',
    targetedMisconceptions: [],
    source: src('phys.qm.s-matrix-basics', 'a resonance is where the cross-section PEAKS, so the last option has the physics inverted; unitarity holds at every real energy, which rules out the third'),
  },
  {
    conceptId: 'phys.qm.scattering-theory-born-approximation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the first Born approximation, the scattering amplitude is essentially what?',
    choices: [
      { text: 'The Fourier transform of the scattering potential, evaluated at the momentum transfer', isCorrect: true },
      { text: 'The value of the potential at the origin', isCorrect: false },
      { text: 'The square of the wavefunction far from the target', isCorrect: false },
      { text: 'The total cross-section divided by 4π', isCorrect: false },
    ],
    correctValue: 'Fourier transform of the potential',
    targetedMisconceptions: [],
    source: src('phys.qm.scattering-theory-born-approximation', 'the Fourier relationship is why scattering experiments MAP a potential — measuring the amplitude across momentum transfers is measuring the transform, which is the whole logic of structure determination'),
  },
  {
    conceptId: 'phys.qm.scattering-theory-born-approximation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'At which incident energies is the Born approximation expected to work best, and why?',
    choices: [
      { text: 'At HIGH energy — the incoming plane wave is then barely disturbed by the potential, which is exactly the assumption the approximation makes', isCorrect: true },
      { text: 'At very low energy, where the particle interacts with the potential for longest', isCorrect: false },
      { text: 'Close to a resonance, where the amplitude is largest', isCorrect: false },
      { text: 'At any energy at all, provided the potential is short-ranged', isCorrect: false },
    ],
    correctValue: 'high energy',
    targetedMisconceptions: [],
    source: src('phys.qm.scattering-theory-born-approximation', 'the approximation replaces the true wave inside the potential with the undisturbed incoming one, so it is best where the disturbance is LEAST; low energy and resonances are the two regimes where it fails hardest'),
  },
  {
    conceptId: 'phys.qm.selection-rules', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What are the electric-dipole selection rules for l and m in a one-electron atom?',
    choices: [
      { text: 'Δl = ±1, and Δm = 0 or ±1', isCorrect: true },
      { text: 'Δl = 0 or ±1, and Δm = ±1', isCorrect: false },
      { text: 'Δl = ±2, and Δm = 0', isCorrect: false },
      { text: 'There is no restriction on either', isCorrect: false },
    ],
    correctValue: 'delta l = +/-1, delta m = 0 or +/-1',
    targetedMisconceptions: [],
    source: src('phys.qm.selection-rules', 'Δl = 0 is FORBIDDEN for an electric-dipole transition while Δm = 0 is allowed — the first distractor swaps exactly that asymmetry, which is what makes the 2s→1s transition forbidden'),
  },
  {
    conceptId: 'phys.qm.uncertainty-principle', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What inequality does the position–momentum uncertainty relation state?',
    choices: [
      { text: 'Δx · Δp ≥ ħ/2', isCorrect: true },
      { text: 'Δx · Δp ≤ ħ/2', isCorrect: false },
      { text: 'Δx · Δp = ħ, exactly', isCorrect: false },
      { text: 'Δx / Δp ≥ ħ/2', isCorrect: false },
    ],
    correctValue: 'product >= hbar/2',
    targetedMisconceptions: [],
    source: src('phys.qm.uncertainty-principle', 'the direction of the inequality is the content: there is a FLOOR on the product and no ceiling, so a badly prepared state can have both uncertainties large. The equality holds only for a Gaussian'),
  },
  {
    conceptId: 'phys.qm.variational-method', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the variational principle guarantee about the energy computed from ANY normalised trial wavefunction?',
    choices: [
      { text: 'It is always greater than or equal to the true ground-state energy', isCorrect: true },
      { text: 'It is always less than or equal to the true ground-state energy', isCorrect: false },
      { text: 'It is exactly equal to the true ground-state energy', isCorrect: false },
      { text: 'It may fall on either side, with no bound either way', isCorrect: false },
    ],
    correctValue: 'an upper bound',
    targetedMisconceptions: [],
    source: src('phys.qm.variational-method', 'the bound is one-sided and that is what makes the method useful: a lower trial energy is always a better one, so improvement can be recognised without knowing the answer'),
  },
  {
    conceptId: 'phys.qm.variational-method', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why does the variational method estimate the ENERGY far more accurately than it estimates the wavefunction?',
    choices: [
      { text: 'The energy is STATIONARY at the true state, so an error of first order in the wavefunction produces an error only of second order in the energy', isCorrect: true },
      { text: 'Because the energy is a single number while the wavefunction is a whole function', isCorrect: false },
      { text: 'Because the trial wavefunction has been normalised', isCorrect: false },
      { text: 'Because energies can be measured and wavefunctions cannot', isCorrect: false },
    ],
    correctValue: 'the energy is stationary at the true state',
    targetedMisconceptions: [],
    source: src('phys.qm.variational-method', 'second-order accuracy in the energy is the precise reason a visibly imperfect trial function still gives a good number — which is what the concept\'s existing looks-similar probe observes without explaining'),
  },
  {
    conceptId: 'phys.qm.wave-function', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does |ψ(x)|² represent?',
    choices: [
      { text: 'The probability DENSITY of finding the particle at x — it must be multiplied by a length before it becomes a probability', isCorrect: true },
      { text: 'The probability itself of finding the particle at x', isCorrect: false },
      { text: 'The energy density of the particle at x', isCorrect: false },
      { text: 'The particle\'s charge, spread out in space', isCorrect: false },
    ],
    correctValue: 'probability density',
    targetedMisconceptions: [],
    source: src('phys.qm.wave-function', 'the density-versus-probability distinction is exactly what the concept\'s existing |ψ(0)|² = 0.5 nm⁻¹ probe turns on — the unit in that stem is the clue, and reading a density as a probability makes it look greater than one'),
  },
  {
    conceptId: 'phys.qm.wkb-approximation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What condition must hold for the WKB approximation to be valid?',
    choices: [
      { text: 'The potential must vary SLOWLY on the scale of the local de Broglie wavelength', isCorrect: true },
      { text: 'The potential must be exactly constant', isCorrect: false },
      { text: 'The particle\'s energy must lie below the top of the barrier', isCorrect: false },
      { text: 'The particle must be non-relativistic', isCorrect: false },
    ],
    correctValue: 'slowly varying potential',
    targetedMisconceptions: [],
    source: src('phys.qm.wkb-approximation', 'a constant potential needs no approximation at all — it is solved exactly — so the second option describes the case WKB was invented to move beyond'),
  },
  {
    conceptId: 'phys.qm.wkb-approximation', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The WKB tunnelling probability is dominated by an exponential factor. What sits in that exponent?',
    choices: [
      { text: 'The INTEGRAL of the local decay constant across the whole classically forbidden region — so the shape of the barrier matters, not merely its height', isCorrect: true },
      { text: 'The height of the barrier alone', isCorrect: false },
      { text: 'The width of the barrier alone', isCorrect: false },
      { text: 'The ratio of the particle\'s energy to the barrier height', isCorrect: false },
    ],
    correctValue: 'the integral of kappa across the barrier',
    targetedMisconceptions: [],
    source: src('phys.qm.wkb-approximation', 'the integral is what generalises the rectangular-barrier result to an arbitrary shape, and it is the entire reason WKB is used for alpha decay, where the Coulomb barrier is anything but rectangular'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH 14 — phys.particle @ HIGH, all sixteen short pairs. Domain complete.
// ═══════════════════════════════════════════════════════════════════════════

const PARTICLE: SeedProbe[] = [
  {
    conceptId: 'phys.particle.accelerators-detectors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why do particle physicists keep building accelerators of ever higher energy?',
    choices: [
      { text: 'Creating a heavy particle needs at least its rest energy, by E = mc², and higher energy also resolves shorter distances', isCorrect: true },
      { text: 'To push the particles past the speed of light', isCorrect: false },
      { text: 'To heat the target hot enough to break its atoms apart', isCorrect: false },
      { text: 'Because low-energy beams cannot be steered by magnets', isCorrect: false },
    ],
    correctValue: 'energy creates mass and resolves small distances',
    targetedMisconceptions: [],
    source: src('phys.particle.accelerators-detectors', 'two independent reasons, both following from relativity and quantum mechanics; the faster-than-light option is the one a learner reaches for when energy is read as speed'),
  },
  {
    conceptId: 'phys.particle.accelerators-detectors', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A charged particle leaves a curved track in a detector sitting in a magnetic field. What does the curvature tell you?',
    choices: [
      { text: 'The ratio of its momentum to its charge — and the DIRECTION of the curve gives the sign of that charge', isCorrect: true },
      { text: 'Its mass, read off directly', isCorrect: false },
      { text: 'Its lifetime before decaying', isCorrect: false },
      { text: 'Its speed, and nothing else', isCorrect: false },
    ],
    correctValue: 'momentum over charge, and the sign',
    targetedMisconceptions: [],
    source: src('phys.particle.accelerators-detectors', 'r = p/(qB), so a single track gives p/q and never the mass on its own — which is why identifying a particle needs a second measurement, and why the concept\'s existing invariant-mass probe matters'),
  },
  {
    conceptId: 'phys.particle.antimatter', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How does an antiparticle differ from its corresponding particle?',
    choices: [
      { text: 'Same mass and same spin, but opposite sign of electric charge and of the other additive quantum numbers', isCorrect: true },
      { text: 'It has the opposite mass — negative rather than positive', isCorrect: false },
      { text: 'It travels backwards in time and therefore cannot be detected', isCorrect: false },
      { text: 'It is an ordinary particle that happens to carry negative energy', isCorrect: false },
    ],
    correctValue: 'same mass, opposite charges',
    targetedMisconceptions: [],
    source: src('phys.particle.antimatter', 'the MASS is identical, which is why annihilation releases 2mc² and why the negative-mass option is checkably wrong; antiparticles are routinely detected, which rules out the third'),
  },
  {
    conceptId: 'phys.particle.antimatter', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why is the matter–antimatter asymmetry of the universe regarded as an unsolved problem?',
    choices: [
      { text: 'Known physics makes matter and antimatter in very nearly equal amounts. An almost-equal early universe should have annihilated into radiation, leaving no matter at all — so the small surviving imbalance is unexplained', isCorrect: true },
      { text: 'Because antimatter has never actually been observed', isCorrect: false },
      { text: 'Because the existence of antimatter would violate conservation of energy', isCorrect: false },
      { text: 'Because the Standard Model forbids antimatter outright', isCorrect: false },
    ],
    correctValue: 'near-equal production versus a matter universe',
    targetedMisconceptions: [],
    source: src('phys.particle.antimatter', 'the puzzle is a QUANTITATIVE mismatch, not an absence — antimatter is produced daily in laboratories, so the second and fourth options are contradicted by routine experiment'),
  },
  {
    conceptId: 'phys.particle.conservation-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Besides energy, momentum and electric charge, which quantities must also be conserved in Standard-Model particle reactions?',
    choices: [
      { text: 'Baryon number, and each lepton flavour number separately', isCorrect: true },
      { text: 'Total mass and total volume', isCorrect: false },
      { text: 'Colour charge, and nothing further', isCorrect: false },
      { text: 'The magnitude of the spin, and nothing further', isCorrect: false },
    ],
    correctValue: 'baryon number and lepton flavour number',
    targetedMisconceptions: [],
    source: src('phys.particle.conservation-laws', 'MASS is emphatically not conserved — it converts to energy freely — which is the option that makes an otherwise sensible list wrong, and it is the additive quantum numbers that do the ruling-out work'),
  },
  {
    conceptId: 'phys.particle.conservation-laws', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Free neutron decay is written n → p + e⁻ + ν̄ₑ. Check the baryon and lepton numbers on each side.',
    choices: [
      { text: 'Baryon number 1 → 1, and lepton number 0 → (+1) + (−1) = 0. Both are conserved', isCorrect: true },
      { text: 'Baryon number is not conserved, since a proton is not a neutron', isCorrect: false },
      { text: 'Lepton number is not conserved, because an electron appears where there was none', isCorrect: false },
      { text: 'Neither is conserved, which is why the decay needs the weak force', isCorrect: false },
    ],
    correctValue: 'both conserved',
    targetedMisconceptions: [],
    source: src('phys.particle.conservation-laws', 'the ANTINEUTRINO is what balances the electron, which is the whole reason it had to be postulated; the third option is exactly the reasoning that led Pauli to predict the neutrino in the first place'),
  },
  {
    conceptId: 'phys.particle.electroweak-unification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which two of the four fundamental forces does electroweak theory unify?',
    choices: [
      { text: 'Electromagnetism and the weak nuclear force', isCorrect: true },
      { text: 'The strong and the weak nuclear forces', isCorrect: false },
      { text: 'Electromagnetism and gravity', isCorrect: false },
      { text: 'The strong nuclear force and electromagnetism', isCorrect: false },
    ],
    correctValue: 'electromagnetism and the weak force',
    targetedMisconceptions: [],
    source: src('phys.particle.electroweak-unification', 'the name says which two, and the other three pairings are all things physics has NOT achieved — which is what the concept\'s existing all-four-forces probe is checking'),
  },
  {
    conceptId: 'phys.particle.electroweak-unification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If electromagnetism and the weak force are really one force, why do they look nothing alike in ordinary experiments?',
    choices: [
      { text: 'The symmetry is BROKEN at low energy: the W and Z are very heavy, so the weak force is short-ranged and feeble, while the massless photon is not. At very high energy the two behave alike', isCorrect: true },
      { text: 'They only look different because the weak force is harder to measure accurately', isCorrect: false },
      { text: 'They are not genuinely unified — "electroweak" is just a convenient label', isCorrect: false },
      { text: 'Because electromagnetism acts on charge and the weak force does not act on charged particles at all', isCorrect: false },
    ],
    correctValue: 'symmetry breaking at low energy',
    targetedMisconceptions: [],
    source: src('phys.particle.electroweak-unification', 'unification is a statement about HIGH energy, and symmetry breaking is what hides it at everyday energies — without that step, unification and observation simply contradict each other'),
  },
  {
    conceptId: 'phys.particle.feynman-diagrams', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is a VERTEX in a Feynman diagram?',
    choices: [
      { text: 'A point where lines meet — one interaction — and each one contributes a factor of the coupling strength to the amplitude', isCorrect: true },
      { text: 'The position in space at which the collision physically took place', isCorrect: false },
      { text: 'The instant at which a particle decays', isCorrect: false },
      { text: 'The detector that recorded the event', isCorrect: false },
    ],
    correctValue: 'an interaction point carrying a coupling factor',
    targetedMisconceptions: [],
    source: src('phys.particle.feynman-diagrams', 'the axes of a Feynman diagram are not a map of space, which is exactly what the concept\'s existing do-the-lines-represent-paths probe establishes — a vertex is a term in a calculation'),
  },
  {
    conceptId: 'phys.particle.feynman-diagrams', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why do Feynman diagrams with more vertices usually contribute less to the final result?',
    choices: [
      { text: 'Every vertex brings another factor of the coupling constant, which in QED is about 1/137 — so each extra vertex shrinks the contribution', isCorrect: true },
      { text: 'Because they are more difficult to draw correctly', isCorrect: false },
      { text: 'Because they violate conservation laws', isCorrect: false },
      { text: 'Because they describe processes that cannot physically happen', isCorrect: false },
    ],
    correctValue: 'each vertex costs a factor of the coupling',
    targetedMisconceptions: [],
    source: src('phys.particle.feynman-diagrams', 'this is why perturbation theory works at all in QED and why it fails for the strong force at low energy, where the coupling is not small'),
  },
  {
    conceptId: 'phys.particle.four-forces', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Rank the four fundamental forces by relative strength, strongest first.',
    choices: [
      { text: 'Strong, electromagnetic, weak, gravitational', isCorrect: true },
      { text: 'Gravitational, electromagnetic, weak, strong', isCorrect: false },
      { text: 'Electromagnetic, strong, gravitational, weak', isCorrect: false },
      { text: 'They are all of broadly comparable strength', isCorrect: false },
    ],
    correctValue: 'strong > EM > weak > gravity',
    targetedMisconceptions: [],
    source: src('phys.particle.four-forces', 'gravity is the WEAKEST by an enormous margin, which is counter-intuitive because it is the one force everybody feels — the reversed ordering is the everyday intuition written out'),
  },
  {
    conceptId: 'phys.particle.four-forces', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Gravity is by far the weakest of the four forces, yet it governs the large-scale structure of the universe. How?',
    choices: [
      { text: 'It is always attractive, so it never cancels, and its range is unlimited. Electric charges cancel out over any large body, and both nuclear forces are extremely short-ranged', isCorrect: true },
      { text: 'Because gravity grows stronger with distance', isCorrect: false },
      { text: 'Because gravity acts only on very large masses and ignores small ones', isCorrect: false },
      { text: 'Because the other three forces switch off outside the atom', isCorrect: false },
    ],
    correctValue: 'never cancels, unlimited range',
    targetedMisconceptions: [],
    source: src('phys.particle.four-forces', 'strength and REACH are different properties, and cancellation is the decisive one — electromagnetism is vastly stronger and neutralises itself, which is why gravity wins at scale'),
  },
  {
    conceptId: 'phys.particle.gauge-bosons', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which carrier goes with which force — electromagnetism, the strong force, the weak force, in that order?',
    choices: [
      { text: 'Photon, gluon, and the W and Z bosons', isCorrect: true },
      { text: 'Gluon, photon, and the W and Z bosons', isCorrect: false },
      { text: 'Photon, the W and Z bosons, and gluon', isCorrect: false },
      { text: 'Graviton, gluon, and photon', isCorrect: false },
    ],
    correctValue: 'photon, gluon, W and Z',
    targetedMisconceptions: [],
    source: src('phys.particle.gauge-bosons', 'the two wrong orderings swap exactly one pair each, which is how this list is actually misremembered; the graviton option also slips in a particle that has never been detected'),
  },
  {
    conceptId: 'phys.particle.gauge-bosons', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Why does the electromagnetic force reach across the universe while the weak force reaches only about 10⁻¹⁸ m?',
    choices: [
      { text: 'The photon is massless, so its range is unlimited; the W and Z are very massive, and the range of a force goes roughly as ħ/(mc)', isCorrect: true },
      { text: 'Because photons travel at the speed of light and W bosons do not', isCorrect: false },
      { text: 'Because electric charge is conserved and weak charge is not', isCorrect: false },
      { text: 'Because the weak force is defined to act only inside the nucleus', isCorrect: false },
    ],
    correctValue: 'carrier mass sets the range',
    targetedMisconceptions: [],
    source: src('phys.particle.gauge-bosons', 'carrier MASS sets range — the single most useful quantitative idea in the topic, and the reason the W and Z had to be heavy before they were ever found'),
  },
  {
    conceptId: 'phys.particle.hadron-quark-model', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What quark content makes a baryon, and what makes a meson?',
    choices: [
      { text: 'A baryon is three quarks; a meson is one quark and one antiquark', isCorrect: true },
      { text: 'A baryon is two quarks; a meson is three', isCorrect: false },
      { text: 'A baryon is a quark and an antiquark; a meson is three quarks', isCorrect: false },
      { text: 'Both are three quarks, differing only in mass', isCorrect: false },
    ],
    correctValue: 'baryon qqq, meson q-antiq',
    targetedMisconceptions: [],
    source: src('phys.particle.hadron-quark-model', 'the third option is the pair exactly swapped, which is the standard confusion; the quark–antiquark structure is also why mesons are so short-lived'),
  },
  {
    conceptId: 'phys.particle.hadron-quark-model', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A proton is made of two up quarks and one down quark. Up carries +2/3 and down −1/3. What total charge does that give?',
    choices: [
      { text: '+1, as observed', isCorrect: true },
      { text: '+2/3', isCorrect: false },
      { text: '0', isCorrect: false },
      { text: '+5/3 — adding the magnitudes without the down quark\'s sign', isCorrect: false },
    ],
    correctValue: '+1',
    targetedMisconceptions: [],
    source: src('phys.particle.hadron-quark-model', '2/3 + 2/3 − 1/3 = 1 exactly. Reproducing the observed integer charge from thirds is the arithmetic that made the quark model credible, and the +5/3 option is the same sum with a dropped sign'),
  },
  {
    conceptId: 'phys.particle.higgs-mechanism', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the Higgs mechanism explain?',
    choices: [
      { text: 'How the W and Z bosons and the fundamental fermions acquire mass, without wrecking the gauge symmetry the theory is built on', isCorrect: true },
      { text: 'The origin of all the mass in ordinary matter', isCorrect: false },
      { text: 'Why gravity exists at all', isCorrect: false },
      { text: 'Why quarks are confined inside hadrons', isCorrect: false },
    ],
    correctValue: 'mass for the W, Z and fermions',
    targetedMisconceptions: [],
    source: src('phys.particle.higgs-mechanism', 'the second option is the popular-press version and it is wrong by about two orders of magnitude — see the next probe, which is the correction'),
  },
  {
    conceptId: 'phys.particle.higgs-mechanism', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Almost all the mass of an everyday object does NOT come from the Higgs field. Where does it come from?',
    choices: [
      { text: 'The binding energy of the gluon field inside protons and neutrons. The quarks\' own Higgs-given masses account for only a small percentage of a nucleon\'s mass', isCorrect: true },
      { text: 'From the Higgs field — essentially all of it', isCorrect: false },
      { text: 'From the electrons in the atoms', isCorrect: false },
      { text: 'From the weak nuclear force', isCorrect: false },
    ],
    correctValue: 'gluon binding energy',
    targetedMisconceptions: [],
    source: src('phys.particle.higgs-mechanism', 'the three light quarks in a proton total a few MeV against the proton\'s 938 — the rest is field energy, which is E = mc² operating in the direction people find hardest'),
  },
  {
    conceptId: 'phys.particle.leptons', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many CHARGED leptons are there, and what are they?',
    choices: [
      { text: 'Three — the electron, the muon and the tau, each paired with its own neutrino', isCorrect: true },
      { text: 'One — the electron; the others are composite', isCorrect: false },
      { text: 'Two — the electron and the muon', isCorrect: false },
      { text: 'Six charged leptons, matching the six quarks', isCorrect: false },
    ],
    correctValue: 'three charged leptons',
    targetedMisconceptions: [],
    source: src('phys.particle.leptons', 'six LEPTONS in total but only three of them charged, the other three being neutrinos — collapsing that distinction is what produces the last option'),
  },
  {
    conceptId: 'phys.particle.leptons', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What property most sharply separates leptons from quarks?',
    choices: [
      { text: 'Leptons carry no colour charge, so they take no part in the strong interaction and are never confined — they exist as free particles', isCorrect: true },
      { text: 'Leptons are lighter than quarks', isCorrect: false },
      { text: 'Leptons carry no electric charge', isCorrect: false },
      { text: 'Leptons are not fermions', isCorrect: false },
    ],
    correctValue: 'no colour charge',
    targetedMisconceptions: [],
    source: src('phys.particle.leptons', 'mass is not the divide — the tau is heavier than a proton, which is what the concept\'s existing tau probe turns on. Colour is the property that decides confinement'),
  },
  {
    conceptId: 'phys.particle.neutrinos', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why are neutrinos so extraordinarily difficult to detect?',
    choices: [
      { text: 'They carry no electric charge and no colour, so they interact only through the weak force and gravity — and the weak cross-section is tiny', isCorrect: true },
      { text: 'They travel faster than light and outrun the detector', isCorrect: false },
      { text: 'They carry no energy to deposit', isCorrect: false },
      { text: 'They exist for far too short a time to be caught', isCorrect: false },
    ],
    correctValue: 'weak interaction only',
    targetedMisconceptions: [],
    source: src('phys.particle.neutrinos', 'the difficulty follows from WHICH forces act on them, not from speed or lifetime — neutrinos are in fact extremely long-lived, which rules out the last option outright'),
  },
  {
    conceptId: 'phys.particle.neutrinos', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Neutrino oscillation — a neutrino changing flavour in flight — was a major discovery. What does it establish?',
    choices: [
      { text: 'That neutrinos have non-zero mass, which the original Standard Model did not permit', isCorrect: true },
      { text: 'That neutrinos travel faster than light', isCorrect: false },
      { text: 'That there are more than three neutrino flavours', isCorrect: false },
      { text: 'That neutrinos are their own antiparticles', isCorrect: false },
    ],
    correctValue: 'neutrinos have mass',
    targetedMisconceptions: [],
    source: src('phys.particle.neutrinos', 'oscillation requires the flavour states to be mixtures of states with DIFFERENT masses, so at least two masses are non-zero; whether neutrinos are their own antiparticles is a separate and still-open question'),
  },
  {
    conceptId: 'phys.particle.particle-classification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What distinguishes a hadron from a lepton?',
    choices: [
      { text: 'A hadron is built from quarks and feels the strong force; a lepton is fundamental and does not feel it', isCorrect: true },
      { text: 'Hadrons are heavy and leptons are light, by definition', isCorrect: false },
      { text: 'Hadrons are electrically charged and leptons are neutral', isCorrect: false },
      { text: 'Hadrons are fermions and leptons are bosons', isCorrect: false },
    ],
    correctValue: 'composite and strongly interacting versus fundamental',
    targetedMisconceptions: [],
    source: src('phys.particle.particle-classification', 'the division is by STRUCTURE and by which force acts, not by mass or charge — the neutron is a neutral hadron and the tau is a lepton heavier than a proton, so two of the distractors have visible counter-examples'),
  },
  {
    conceptId: 'phys.particle.particle-classification', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Particles are also split into fermions and bosons. Which property does that split use, and what follows from it?',
    choices: [
      { text: 'Spin: half-integer spin makes a fermion, which obeys the exclusion principle; integer spin makes a boson, which may share a state freely', isCorrect: true },
      { text: 'Mass: heavy particles are fermions and light ones bosons', isCorrect: false },
      { text: 'Electric charge: charged particles are fermions and neutral ones bosons', isCorrect: false },
      { text: 'Both kinds obey exclusion; the split is only a naming convention', isCorrect: false },
    ],
    correctValue: 'spin, and exclusion versus sharing',
    targetedMisconceptions: [],
    source: src('phys.particle.particle-classification', 'the spin-statistics connection is what makes matter take up space and lasers possible from a single property; the neutrino is neutral and a fermion, which kills the charge option'),
  },
  {
    conceptId: 'phys.particle.quarks', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many quark flavours are there, and what electric charges do they carry?',
    choices: [
      { text: 'Six — up, charm and top at +2/3, and down, strange and bottom at −1/3', isCorrect: true },
      { text: 'Three, all carrying +1/3', isCorrect: false },
      { text: 'Six, all carrying a charge of ±1', isCorrect: false },
      { text: 'Four, matching the four fundamental forces', isCorrect: false },
    ],
    correctValue: 'six, at +2/3 and -1/3',
    targetedMisconceptions: [],
    source: src('phys.particle.quarks', 'fractional charge is the striking feature and it comes in exactly two values; the three-quark option is the original 1964 model, which is a historically real answer and no longer the right one'),
  },
  {
    conceptId: 'phys.particle.quarks', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'Six quark flavours exist, yet essentially all ordinary matter is built from just up and down. Why?',
    choices: [
      { text: 'The other four are far heavier and decay within a tiny fraction of a second, through the weak interaction, into the lightest ones — so only up and down survive in stable matter', isCorrect: true },
      { text: 'The other four do not really exist and are mathematical conveniences', isCorrect: false },
      { text: 'The other four carry no electric charge', isCorrect: false },
      { text: 'The other four exist only inside neutron stars', isCorrect: false },
    ],
    correctValue: 'the heavier flavours decay',
    targetedMisconceptions: [],
    source: src('phys.particle.quarks', 'the heavier flavours are made routinely in colliders and are entirely real, which rules out the second option; their absence from matter is a LIFETIME fact, not an existence one'),
  },
  {
    conceptId: 'phys.particle.standard-model', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many fundamental matter particles (fermions) does the Standard Model contain, counting antiparticles separately from particles?',
    choices: [
      { text: 'Twelve — six quarks and six leptons', isCorrect: true },
      { text: 'Three — the proton, the neutron and the electron', isCorrect: false },
      { text: 'Four, one for each fundamental force', isCorrect: false },
      { text: 'Twenty-four', isCorrect: false },
    ],
    correctValue: 'twelve',
    targetedMisconceptions: [],
    source: src('phys.particle.standard-model', 'the proton and neutron option is the pre-quark picture, which is what many learners still carry from chemistry; twenty-four is the count WITH antiparticles included'),
  },
  {
    conceptId: 'phys.particle.standard-model', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The Standard Model arranges its matter particles into three GENERATIONS. What distinguishes them?',
    choices: [
      { text: 'Each generation repeats the same pattern of charges with progressively larger masses. Only the first is stable, and why there are exactly three is unexplained', isCorrect: true },
      { text: 'Each generation carries a different set of electric charges', isCorrect: false },
      { text: 'Later generations contain more particles than earlier ones', isCorrect: false },
      { text: 'The generations are ordered by the date on which they were discovered', isCorrect: false },
    ],
    correctValue: 'same charges, larger masses',
    targetedMisconceptions: [],
    source: src('phys.particle.standard-model', 'the repetition is exact in every property EXCEPT mass, which is what makes "why three?" a real question rather than a bookkeeping one'),
  },
  {
    conceptId: 'phys.particle.strong-interaction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the charge of the strong interaction called, and how many kinds are there?',
    choices: [
      { text: 'Colour, and there are three — conventionally red, green and blue, with three matching anticolours', isCorrect: true },
      { text: 'Colour, and there are two, like positive and negative charge', isCorrect: false },
      { text: 'Electric charge, of which there are two', isCorrect: false },
      { text: 'Flavour, of which there are six', isCorrect: false },
    ],
    correctValue: 'colour, three kinds',
    targetedMisconceptions: [],
    source: src('phys.particle.strong-interaction', 'THREE charges rather than two is the structural difference from electromagnetism, and it is what allows a three-quark baryon to be colour-neutral at all'),
  },
  {
    conceptId: 'phys.particle.strong-interaction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What does ASYMPTOTIC FREEDOM mean for the strong interaction?',
    choices: [
      { text: 'The coupling gets WEAKER at short distance and high energy, so quarks move almost freely inside a hadron — the opposite of how electromagnetism behaves', isCorrect: true },
      { text: 'Quarks become free once they are pulled far enough apart', isCorrect: false },
      { text: 'The strong force becomes infinitely large at very short range', isCorrect: false },
      { text: 'Quarks escape their hadron at low energy', isCorrect: false },
    ],
    correctValue: 'weaker at short distance',
    targetedMisconceptions: [],
    source: src('phys.particle.strong-interaction', 'asymptotic freedom and confinement are the same behaviour at opposite ends: weak when close, strong when far. The second option is that behaviour exactly inverted, and it is what the concept\'s existing pulling-apart probe establishes'),
  },
  {
    conceptId: 'phys.particle.weak-interaction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What can the weak interaction do that no other fundamental force can?',
    choices: [
      { text: 'Change the FLAVOUR of a quark or a lepton — turning a down quark into an up quark, which is what makes beta decay possible', isCorrect: true },
      { text: 'Hold the nucleus together against electrostatic repulsion', isCorrect: false },
      { text: 'Act across an unlimited range', isCorrect: false },
      { text: 'Act on electrically neutral particles', isCorrect: false },
    ],
    correctValue: 'change quark and lepton flavour',
    targetedMisconceptions: [],
    source: src('phys.particle.weak-interaction', 'flavour change is the weak force\'s unique capability; holding the nucleus together is the STRONG force, and gravity also acts on neutral particles, so two distractors name real effects belonging elsewhere'),
  },
  {
    conceptId: 'phys.particle.weak-interaction', subjectSlug: S, probeKind: 'mcq',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'What is beta-minus decay at the QUARK level?',
    choices: [
      { text: 'A down quark turns into an up quark, emitting a W⁻ boson, which then decays into an electron and an electron antineutrino', isCorrect: true },
      { text: 'An up quark turns into a down quark, emitting a W⁺ boson', isCorrect: false },
      { text: 'An electron is ejected from the atom\'s electron shell', isCorrect: false },
      { text: 'A neutron splits into a proton and an electron that were already inside it', isCorrect: false },
    ],
    correctValue: 'down to up, emitting a W-minus',
    targetedMisconceptions: [],
    source: src('phys.particle.weak-interaction', 'the second option is beta-PLUS decay, a real process in the wrong place; the fourth is the pre-quark picture in which the electron pre-exists inside the neutron, which is the belief the quark account replaces'),
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
  // Batch 9 — phys.em @ HIGH, first seventeen short pairs.
  ...EM_A,
  // Batch 10 — phys.em @ HIGH, the last seventeen. Domain complete.
  ...EM_B,
  // Batch 11 — phys.mod @ HIGH, all nineteen short pairs. Domain complete.
  ...MOD,
  // Batch 12 — phys.opt @ HIGH, all fourteen short pairs. Domain complete.
  ...OPT,
  // Batch 13 — phys.qm @ HIGH, all sixteen short pairs. Domain complete.
  ...QM,
  // Batch 14 — phys.particle @ HIGH, all sixteen short pairs. Domain complete.
  ...PARTICLE,
]

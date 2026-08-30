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
]

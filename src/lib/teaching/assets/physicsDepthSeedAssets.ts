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
]

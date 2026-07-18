/**
 * Authored Knowledge Assets — the Explanation Memory authoring loop
 * (owner-directed, 2026-07-17).
 *
 * Sibling to brainSeedAssets.ts, deliberately a SEPARATE collection: that
 * file's contract is "nothing here is invented — transcribed verbatim from
 * the frozen educational-brain concept entries." Every asset below is
 * instead NEWLY AUTHORED against a concept's Teaching Blueprint — same
 * interfaces, same seed pipeline, same canonicalSlug convention, different
 * provenance (each item cites the blueprint file + section it teaches
 * from, and targeted misconceptions use the blueprint's own MC slugs).
 *
 * Authoring rules applied to every explanation:
 *   - Pedagogically distinct per concept (intuition / contrast / worked
 *     example / first-principles / repair) — never rewrites of each other.
 *   - Teaches understanding, anticipates the blueprint's misconceptions,
 *     builds on prerequisites the blueprint declares, self-contained.
 *   - Grade-band variants are different TEACHING, not reworded copies.
 *   - Probes are distractor-mapped to blueprint misconception slugs
 *     (assessment/03 distractor science), never duplicating an existing
 *     probe in brainSeedAssets.ts or the blueprint verbatim.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

// ─── phys.meas.units ─────────────────────────────────────────────────────────
const UNITS = 'phys.meas.units'
const UNITS_SRC = 'docs/curriculum/blueprints/phys.meas.units.md'

const UNITS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: UNITS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive / everyday: why shared units exist at all (need before names)
    content:
      'Imagine ordering a table "four hands wide" from a carpenter with ' +
      'bigger hands than yours. You\'d get the wrong table — not because ' +
      'anyone measured badly, but because you weren\'t using the same ruler. ' +
      'That\'s the whole reason SI units exist: the world agreed on ONE ruler ' +
      'for each kind of quantity, so a metre in Tokyo is exactly a metre in ' +
      'Delhi. There are only seven of these agreed base units — metre for ' +
      'length, kilogram for mass, second for time, ampere for current, ' +
      'kelvin for temperature, mole for amount of substance, candela for ' +
      'light intensity. Every other unit you will ever meet is built out of ' +
      'these seven, the way every word is built from letters.',
    targetedMisconceptions: [`${UNITS}:MC-3`],
    source: `${UNITS_SRC} — §1 Learning Objective + §5 Protocol Library (need-creation opening; "SI" banned-jargon rule respected: introduced after the need)`,
  },
  {
    conceptId: UNITS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Contrast / classification: base vs derived vs non-SI — the discrimination skill
    content:
      'Three boxes sort every unit you\'ll meet. Box 1 — the seven SI base ' +
      'units (m, kg, s, A, K, mol, cd): defined directly, owing nothing to ' +
      'any other unit. Box 2 — SI derived units: legal combinations of Box 1, ' +
      'like m/s for speed or the newton (kg·m/s²) for force. Box 3 — ' +
      'everyday units that are NOT SI at all: litres, hours, centimetres, ' +
      'degrees Celsius. The traps all live at the box boundaries: the litre ' +
      'feels official but is Box 3; the centimetre contains "metre" but is a ' +
      'multiple, not a base; the kilogram — despite carrying a prefix — IS ' +
      'the Box-1 mass unit (the gram is not); and kelvin, not Celsius, is ' +
      'the Box-1 temperature unit, because its zero is real: the coldest ' +
      'anything can be, not the freezing point of one particular liquid.',
    targetedMisconceptions: [`${UNITS}:MC-1`, `${UNITS}:MC-3`, `${UNITS}:MC-4`],
    source: `${UNITS_SRC} — §6 Misconception Engine MC-1/MC-3/MC-4 (contrast repair chains P17/P33 rendered as teaching text)`,
  },
  {
    conceptId: UNITS,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: MC-2 mass vs weight — the blueprint's partial-repair boundary respected
    content:
      'You say "I weigh 70 kilograms" — everyone does — but physics splits ' +
      'that sentence in two. The kilogram measures MASS: how much matter you ' +
      'are made of, the same on Earth, on the Moon, or floating in deep ' +
      'space. WEIGHT is different: it\'s the force gravity exerts on that ' +
      'mass, so it has a force unit (the newton), and it CHANGES with where ' +
      'you are — about 686 N here, 113 N on the Moon, zero in deep space, ' +
      'while your mass stays 70 kg everywhere. For now, keep one clean rule: ' +
      'kg = amount of matter; newtons = gravity\'s pull on it. The full ' +
      'story of forces comes when we reach Newton\'s laws.',
    targetedMisconceptions: [`${UNITS}:MC-2`],
    source: `${UNITS_SRC} — §6 MC-2 (partial repair only, per the blueprint's explicit deferral note — full repair deferred to force/Newton blueprints)`,
  },
  {
    conceptId: UNITS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles / returning adult: why exactly seven, why kelvin, why the kg anomaly
    content:
      'The SI system answers one engineering question: what is the smallest ' +
      'set of quantities from which every measurable thing can be built? The ' +
      'answer settled at seven — length, mass, time, current, temperature, ' +
      'amount of substance, luminous intensity. Everything else is algebra ' +
      'on those seven: speed is length/time, force is mass×length/time². Two ' +
      'quirks are worth knowing because they trip everyone. Kelvin is the ' +
      'temperature base because its zero is absolute — the point where ' +
      'thermal motion stops — whereas 0 °C is just where water happens to ' +
      'freeze; scales with arbitrary zeros break the algebra. And the ' +
      'kilogram, prefix and all, is the mass base unit — a historical ' +
      'accident from the original platinum standard, and the only base unit ' +
      'with a prefix baked into its name.',
    targetedMisconceptions: [`${UNITS}:MC-1`, `${UNITS}:MC-4`],
    source: `${UNITS_SRC} — §5 Protocol Library (adult register) + §6 MC-1 (absolute-zero argument P28) + MC-4 (historical anomaly P28)`,
  },
]

const UNITS_PROBES: SeedProbe[] = [
  {
    conceptId: UNITS,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which of these is the SI base unit for temperature?',
    choices: [
      { text: 'kelvin (K)', isCorrect: true },
      { text: 'degree Celsius (°C)', isCorrect: false, misconceptionId: `${UNITS}:MC-1` },
      { text: 'degree Fahrenheit (°F)', isCorrect: false },
    ],
    correctValue: 'kelvin',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${UNITS}:MC-1`],
    source: `${UNITS_SRC} — §3 Diagnostic Battery DB-2a / §6 MC-1 (distractor-mapped)`,
  },
  {
    conceptId: UNITS,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Sort test: which ONE of these is an SI base unit?',
    choices: [
      { text: 'second (s)', isCorrect: true },
      { text: 'litre (L)', isCorrect: false, misconceptionId: `${UNITS}:MC-3` },
      { text: 'gram (g)', isCorrect: false, misconceptionId: `${UNITS}:MC-4` },
      { text: 'hour (h)', isCorrect: false, misconceptionId: `${UNITS}:MC-3` },
    ],
    correctValue: 'second',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${UNITS}:MC-3`, `${UNITS}:MC-4`],
    source: `${UNITS_SRC} — §6 MC-3/MC-4 discrimination training (P33) as a single sort item`,
  },
]

// ─── phys.mech.velocity ──────────────────────────────────────────────────────
const VEL = 'phys.mech.velocity'
const VEL_SRC = 'docs/curriculum/blueprints/phys.mech.velocity.md'

const VEL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VEL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: two different questions about the same journey
    content:
      'Walk to a wall six metres away and walk back. Two honest questions ' +
      'about that trip give two different answers. "How much ground did you ' +
      'cover?" — twelve metres; divide by your time and you get your SPEED. ' +
      '"Where did you end up, compared to where you started?" — exactly ' +
      'where you began; zero metres of net change, so your VELOCITY for the ' +
      'trip is zero, no matter how fast you walked. Velocity isn\'t a fancier ' +
      'word for speed — it answers a different question: net change of ' +
      'position (with its direction), per unit time.',
    targetedMisconceptions: [`${VEL}:MC-SPEED-IS-VELOCITY`],
    source: `${VEL_SRC} — §6 MC-SPEED-IS-VELOCITY (walk-to-the-wall conflict evidence P28, rendered as first-exposure teaching)`,
  },
  {
    conceptId: VEL,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    // Worked example: the train problem, both quantities computed side by side
    content:
      'A train goes 80 km east, then 30 km west, in 2 hours total. Work both ' +
      'quantities and watch them separate. Average speed = total distance / ' +
      'time = (80 + 30) km / 2 h = 55 km/h — distances ADD because speed ' +
      'only cares about ground covered. Average velocity = displacement / ' +
      'time: the train ends up 80 − 30 = 50 km EAST of its start, so ' +
      'velocity = 50 km / 2 h = 25 km/h east — the west leg SUBTRACTS, and ' +
      'the answer carries a direction. Same train, same two hours: 55 km/h ' +
      'but only 25 km/h east. Whenever a journey doubles back at all, speed ' +
      'and velocity must disagree; they only match on a one-way straight line.',
    targetedMisconceptions: [`${VEL}:MC-SPEED-IS-VELOCITY`],
    source: `${VEL_SRC} — §7 Assessment Battery P76 transfer item, expanded into a full worked example with reasoning per step`,
  },
  {
    conceptId: VEL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: why physics bothers with the distinction (vector reasoning)
    content:
      'Physics keeps two motion quantities because prediction needs more ' +
      'than a number — it needs a direction. Speed (total distance / time) ' +
      'is a scalar: one number, fine for a car\'s odometer or a running ' +
      'pace. Velocity (displacement / time) is a vector: it encodes where ' +
      'you\'ll BE, which is what every later law needs — momentum, forces, ' +
      'orbits all consume velocity, not speed. The definitions differ only ' +
      'in the numerator: distance accumulates every metre travelled; ' +
      'displacement is the straight arrow from start to finish and cancels ' +
      'backtracking. A full lap at race pace: enormous speed, velocity zero ' +
      '— and that is not a paradox but the design: the two numerators answer ' +
      'different questions.',
    targetedMisconceptions: [`${VEL}:MC-SPEED-IS-VELOCITY`],
    source: `${VEL_SRC} — §6 bridge/replacement text (P30/P31) + §7 P78 explain item, taught first-principles for the adult register`,
  },
]

const VEL_PROBES: SeedProbe[] = [
  {
    conceptId: VEL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A swimmer swims one full length of a pool and back to the start block in 100 s, swimming hard the whole way. Her average velocity for the swim is…',
    choices: [
      { text: 'zero — she ends where she started, so displacement is zero', isCorrect: true },
      { text: 'the same as her average speed', isCorrect: false, misconceptionId: `${VEL}:MC-SPEED-IS-VELOCITY` },
      { text: 'twice her average speed, because she covered the pool twice', isCorrect: false },
    ],
    correctValue: 'zero',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${VEL}:MC-SPEED-IS-VELOCITY`],
    source: `${VEL_SRC} — §9 Retrieval Schedule interval-4 scenario recast as a distractor-mapped MCQ (not duplicated from §7/§8 items)`,
  },
]

// ─── phys.mech.acceleration ──────────────────────────────────────────────────
const ACC = 'phys.mech.acceleration'
const ACC_SRC = 'docs/curriculum/blueprints/phys.mech.acceleration.md'

const ACC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ACC,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: change-meter, not speed-meter
    content:
      'Your speedometer tells you how fast you\'re going. Acceleration is a ' +
      'different instrument: a CHANGE-meter. It asks only one thing — is the ' +
      'velocity different now than a moment ago, and how quickly is it ' +
      'becoming different? A racing car cruising at a rock-steady 200 km/h ' +
      'scores ZERO on the change-meter: huge speed, nothing changing. A ' +
      'bicycle pulling away from a red light scores high: small speed, ' +
      'changing fast. Speeding up, braking, and turning a corner all move ' +
      'the change-meter — braking is just negative acceleration, and turning ' +
      'counts because the DIRECTION of velocity is changing even when the ' +
      'number isn\'t. Fast and accelerating are simply different things.',
    targetedMisconceptions: [`${ACC}:MC-ACCELERATION-IS-SPEED`],
    source: `${ACC_SRC} — §6 MC-ACCELERATION-IS-SPEED (racing-car vs bicycle conflict evidence P28 as first-exposure teaching)`,
  },
  {
    conceptId: ACC,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    // Worked example: two-phase motorcycle problem incl. negative acceleration
    content:
      'A motorcycle goes from 5 m/s to 35 m/s in 6 s, then brakes from ' +
      '35 m/s to rest in 3.5 s. One formula handles both phases: a = Δv/Δt. ' +
      'Phase 1: Δv = 35 − 5 = +30 m/s over 6 s → a = +5 m/s² — every second, ' +
      'the motorcycle gains 5 m/s. Phase 2: Δv = 0 − 35 = −35 m/s over ' +
      '3.5 s → a = −10 m/s² — every second it LOSES 10 m/s. Note what the ' +
      'signs are doing: "deceleration" isn\'t a separate quantity with its ' +
      'own formula, just acceleration with a negative Δv. And note phase 2 ' +
      'is the LARGER acceleration in magnitude, even though the bike is ' +
      'slowing down — the change-rate is what counts, not the speed.',
    targetedMisconceptions: [`${ACC}:MC-ACCELERATION-IS-SPEED`],
    source: `${ACC_SRC} — §7 Assessment Battery P76 transfer item + P75 boundary item, expanded into a stepped worked example`,
  },
  {
    conceptId: ACC,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: the ball-at-the-top classic (zero velocity ≠ zero acceleration)
    content:
      'Throw a ball straight up and freeze the film at the very top, where ' +
      'its velocity is exactly zero. Most people say its acceleration must ' +
      'be zero too. Run the film one frame either side: an instant ago it ' +
      'moved upward; an instant later it moves downward. Velocity went ' +
      'up → zero → down. It was CHANGING the whole time — including at the ' +
      'top — because gravity never pauses just because the ball does. So at ' +
      'the top: velocity = 0 AND acceleration = 9.8 m/s² downward, both at ' +
      'once. The two quantities are independent — ask them separately: "is ' +
      'it moving?" (velocity) and "is its motion changing?" (acceleration). ' +
      'A parked car answers no/no; the ball at the top answers no/YES.',
    targetedMisconceptions: [`${ACC}:MC-ZERO-VELOCITY-ZERO-ACCELERATION`],
    source: `${ACC_SRC} — §6 MC-ZERO-VELOCITY-ZERO-ACCELERATION (full repair chain P28→P30→P31 rendered as one teaching text)`,
  },
  {
    conceptId: ACC,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: rate-of-change-of-a-rate, the derivative view
    content:
      'Position tells you where. Velocity is the rate position changes. ' +
      'Acceleration is the rate VELOCITY changes — a rate of a rate, which ' +
      'is why it feels one step more abstract and why intuition slips. Two ' +
      'consequences fall straight out of the definition a = Δv/Δt. First, ' +
      'the size of v is irrelevant: a jet at constant 900 km/h has a = 0, ' +
      'while a dropped key has a = 9.8 m/s² from the moment it\'s released — ' +
      'even at the instant v = 0. Second, direction changes count as ' +
      'acceleration: circular motion at constant speed is accelerated ' +
      'motion, because the velocity VECTOR is turning. Keep the two ' +
      'questions separate — how fast (v), and how is that changing (a) — ' +
      'and every "paradox" in kinematics dissolves.',
    targetedMisconceptions: [`${ACC}:MC-ACCELERATION-IS-SPEED`, `${ACC}:MC-ZERO-VELOCITY-ZERO-ACCELERATION`],
    source: `${ACC_SRC} — §6 both misconceptions' bridge texts (P30) unified into a first-principles adult explanation`,
  },
]

const ACC_PROBES: SeedProbe[] = [
  {
    conceptId: ACC,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A ball thrown straight up is at the highest point of its flight. Which statement is true?',
    choices: [
      { text: 'v = 0 and a = 9.8 m/s² downward', isCorrect: true },
      { text: 'v = 0 and a = 0', isCorrect: false, misconceptionId: `${ACC}:MC-ZERO-VELOCITY-ZERO-ACCELERATION` },
      { text: 'v ≠ 0 and a = 0', isCorrect: false },
    ],
    correctValue: 'v = 0 and a = 9.8 m/s² downward',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ACC}:MC-ZERO-VELOCITY-ZERO-ACCELERATION`],
    source: `${ACC_SRC} — §6 discrimination pair 1 (P33), distractor-mapped`,
  },
  {
    conceptId: ACC,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Which object has the greatest acceleration right now?',
    choices: [
      { text: 'A scooter going from rest to 8 m/s in 2 s', isCorrect: true },
      { text: 'An airliner cruising at a constant 900 km/h', isCorrect: false, misconceptionId: `${ACC}:MC-ACCELERATION-IS-SPEED` },
      { text: 'A train holding a steady 160 km/h', isCorrect: false, misconceptionId: `${ACC}:MC-ACCELERATION-IS-SPEED` },
    ],
    correctValue: 'the scooter',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ACC}:MC-ACCELERATION-IS-SPEED`],
    source: `${ACC_SRC} — §6 MC-ACCELERATION-IS-SPEED trigger scenario as a fresh distractor-mapped item (not the blueprint's own car/bicycle wording)`,
  },
]

// ─── phys.mech.force ─────────────────────────────────────────────────────────
const FORCE = 'phys.mech.force'
const FORCE_SRC = 'docs/curriculum/blueprints/phys.mech.force.md'

const FORCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FORCE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: force as a two-object interaction, happening NOW
    content:
      'A force is never a thing an object HAS — it\'s always something ' +
      'happening BETWEEN two objects, right now. Every real force lets you ' +
      'answer two questions: what\'s pushing or pulling, and what\'s being ' +
      'pushed or pulled? Your hand and the door. The Earth and the dropped ' +
      'apple. If you can\'t name both objects, the force isn\'t real. That\'s ' +
      'the test that catches the oldest mistake in physics: "the kicked ' +
      'ball keeps flying because the kick\'s force is still in it." The ' +
      'moment your foot leaves the ball, name the second object — there ' +
      'isn\'t one. The kick is over; nothing stores it. What the flying ball ' +
      'has is motion, and motion continues on its own until some NEW ' +
      'interaction — air, grass, a wall — pushes back.',
    targetedMisconceptions: [`${FORCE}:MC-FORCE-IS-IMPETUS`],
    source: `${FORCE_SRC} — §1 Learning Objective (two-object interaction test) + §6 MC-FORCE-IS-IMPETUS (foot-leaves-ball conflict evidence P28)`,
  },
  {
    conceptId: FORCE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Classification: contact vs non-contact + net force
    content:
      'Every force in mechanics falls into one of two families. CONTACT ' +
      'forces need touching: friction, tension in a rope, the "normal" ' +
      'push of a floor on your feet, an applied shove. NON-CONTACT forces ' +
      'act across space through fields: gravity, magnetic, electric. Either ' +
      'way, the two-object rule holds — the floor pushes YOU, the Earth ' +
      'pulls the BALL. Objects usually feel several forces at once, so ' +
      'physics adds them as vectors into one NET force, and only the net ' +
      'force determines what happens to the motion. Careful with the ' +
      'subtlety in that word: net force zero does NOT mean no forces — a ' +
      'book on a table feels gravity down and the table\'s push up, two ' +
      'real forces cancelling to a net of zero. That\'s why it just sits ' +
      'there.',
    targetedMisconceptions: [],
    source: `${FORCE_SRC} — §1 Learning Objective items 2–3 (contact/non-contact classification + net-force-zero clause) rendered as teaching text`,
  },
  {
    conceptId: FORCE,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: force needed to keep moving (Aristotle vs Newton)
    content:
      'Here\'s the belief to put on the table: "something must keep pushing ' +
      'a moving object, or it stops." It feels obviously true — everything ' +
      'you\'ve ever thrown eventually stopped. Now watch a hockey puck on ' +
      'smooth ice: nothing touches it horizontally, no engine, no ongoing ' +
      'push — and it just keeps going. If a "forward force" were carrying ' +
      'it, name the two objects that force acts between. You can\'t; there ' +
      'is no second object. The resolution: motion needs NO force to ' +
      'continue — force is only needed to CHANGE motion. Things on Earth ' +
      'stop because real, nameable forces stop them: friction from the ' +
      'ground, drag from the air. Aristotle guessed "moving things need ' +
      'movers"; Newton saw that the movers were only ever needed to start, ' +
      'stop, or steer.',
    targetedMisconceptions: [`${FORCE}:MC-FORCE-CAUSES-MOTION`],
    source: `${FORCE_SRC} — §6 MC-FORCE-CAUSES-MOTION (hockey-puck conflict evidence P28 + bridge P30 + replacement P31 as one repair text)`,
  },
  {
    conceptId: FORCE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: force defined by what it does (changes motion), vector nature
    content:
      'Define force by its effect, and the concept snaps into focus: a ' +
      'force is an interaction between two objects that changes — or tends ' +
      'to change — a state of motion. Three consequences follow. It\'s a ' +
      'VECTOR: a 10 N push left and a 10 N push right are different forces, ' +
      'and their sum is zero. It\'s an INTERACTION: no object can exert a ' +
      'force on itself, and every force names a partner (which is why "the ' +
      'ball carries the kick\'s force" fails — the interaction ended when ' +
      'contact did). And it\'s about CHANGE: constant velocity needs no net ' +
      'force at all; only starting, stopping, and turning do. Most errors ' +
      'in mechanics trace back to violating one of these three — treating ' +
      'force as a stored substance, forgetting a partner object, or ' +
      'demanding a force for motion that isn\'t changing.',
    targetedMisconceptions: [`${FORCE}:MC-FORCE-IS-IMPETUS`, `${FORCE}:MC-FORCE-CAUSES-MOTION`],
    source: `${FORCE_SRC} — §1 Learning Objective boundary statement, taught first-principles; both §6 misconceptions pre-empted structurally`,
  },
]

const FORCE_PROBES: SeedProbe[] = [
  {
    conceptId: FORCE,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A football is in mid-flight after being kicked (ignore air resistance). What horizontal force acts on it?',
    choices: [
      { text: 'None — no object is interacting with it horizontally', isCorrect: true },
      { text: 'The force of the kick, still carried inside the ball', isCorrect: false, misconceptionId: `${FORCE}:MC-FORCE-IS-IMPETUS` },
      { text: 'A forward "motion force" that keeps it flying', isCorrect: false, misconceptionId: `${FORCE}:MC-FORCE-CAUSES-MOTION` },
    ],
    correctValue: 'none',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FORCE}:MC-FORCE-IS-IMPETUS`, `${FORCE}:MC-FORCE-CAUSES-MOTION`],
    source: `${FORCE_SRC} — §6 both misconceptions, one dual-mapped item (each distractor diagnoses a different MC)`,
  },
  {
    conceptId: FORCE,
    subjectSlug: 'physics',
    probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH,
    stem: 'A book rests on a table. Someone says "there are no forces on it — it isn\'t moving." Name the two forces actually acting on the book, and explain why it stays still anyway.',
    correctValue: 'Gravity (Earth pulls book down) and the normal force (table pushes book up); they are equal and opposite, so the NET force is zero — zero net force, not zero forces.',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [],
    source: `${FORCE_SRC} — §1 Learning Objective item 3 (net force zero ≠ no forces), authored as an explain probe`,
  },
]


// ─── phys.mech.newtons-second-law ────────────────────────────────────────────
const N2 = 'phys.mech.newtons-second-law'
const N2_SRC = 'docs/curriculum/blueprints/phys.mech.newtons-second-law.md'

const N2_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: N2,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: same push, different stuff — the a = F/m feel
    content:
      'Push an empty shopping trolley and it leaps forward. Push a fully ' +
      'loaded one exactly as hard and it barely creeps. Same push, ' +
      "different response — the difference is the trolley's mass. Newton's " +
      'Second Law is just that experience turned into a recipe: ' +
      'acceleration = net force ÷ mass. Twice the push, twice the ' +
      'acceleration. Twice the mass, HALF the acceleration. And the word ' +
      '"net" matters: the trolley only responds to the leftover force after ' +
      'friction has taken its bite — what you push minus what pushes back.',
    targetedMisconceptions: [`${N2}:MC-SINGLE-FORCE`],
    source: `${N2_SRC} — §5 Protocol Library concrete opening + §6 MC-SINGLE-FORCE bridge (net-force emphasis at first exposure)`,
  },
  {
    conceptId: N2,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    // Worked example: the blueprint's car transfer item, three explicit steps
    content:
      'A 1200 kg car has a 3000 N driving force and 600 N of total ' +
      'resistance (friction + air). How fast does it accelerate, and how ' +
      'long to reach 20 m/s? Three steps, never skip step 2. Step 1 — list ' +
      'forces with direction: +3000 N forward, −600 N backward. Step 2 — ' +
      'NET force: 3000 − 600 = 2400 N forward. (Using 3000 here is the ' +
      'classic error: the car only "feels" the leftover after resistance.) ' +
      'Step 3 — a = ΣF/m = 2400/1200 = 2 m/s². Then time: gaining 2 m/s ' +
      'every second, reaching 20 m/s takes t = 20/2 = 10 s. Notice the ' +
      'units carry the meaning: newtons ÷ kilograms literally equals m/s².',
    targetedMisconceptions: [`${N2}:MC-SINGLE-FORCE`],
    source: `${N2_SRC} — §7 Assessment Battery P76 transfer item expanded into the three-step ΣF procedure (§6 replacement text P31)`,
  },
  {
    conceptId: N2,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: mass vs weight inside F = ma
    content:
      'An astronaut "weighs less on the Moon" — so does she have less mass ' +
      'there? Count her atoms: exactly the same ones she had on Earth; ' +
      'nothing left her body on the trip. Her MASS — the amount of matter, ' +
      'her resistance to being accelerated — is unchanged, say 60 kg ' +
      'everywhere in the universe. What changed is her WEIGHT: the ' +
      "gravitational force on that mass, W = mg. Earth's g gives " +
      '60 × 9.8 ≈ 588 N; the Moon\'s weaker g gives about 96 N. Same mass, ' +
      'different pull. In F = ma the m is ALWAYS mass in kilograms — if a ' +
      'problem hands you a weight in newtons, divide by g first to recover ' +
      'the mass before you do anything else.',
    targetedMisconceptions: [`${N2}:MC-MASS-IS-WEIGHT`],
    source: `${N2_SRC} — §6 MC-MASS-IS-WEIGHT (same-atoms conflict evidence P28 + bridge P30 + replacement P31 as one repair text)`,
  },
  {
    conceptId: N2,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: the law as the definition of dynamics, limits included
    content:
      "Newton's Second Law is the engine of mechanics: ΣF = ma connects " +
      'the causes (forces) to the effect (change of motion) through one ' +
      'property of the object (mass). Read it in both directions. Forward: ' +
      'sum every force as a vector — applied pushes, friction, gravity, ' +
      'supports — and the object MUST accelerate at exactly ΣF/m, no vote. ' +
      'Backward: measure an acceleration and you\'ve measured the net ' +
      'force. Two boundary cases carry most of the meaning: ΣF = 0 gives ' +
      'a = 0 — which is the First Law appearing as a special case, balance ' +
      'meaning constant velocity, not rest — and a large force on a large ' +
      'mass can produce a smaller acceleration than a modest force on a ' +
      'small one, because only the RATIO decides.',
    targetedMisconceptions: [`${N2}:MC-SINGLE-FORCE`],
    source: `${N2_SRC} — §7 P75 boundary item + §6 bridge texts, unified as a first-principles adult treatment`,
  },
]

const N2_PROBES: SeedProbe[] = [
  {
    conceptId: N2,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'You push a 5 kg box with 10 N while friction resists with 4 N. What acceleration does the box get?',
    choices: [
      { text: '1.2 m/s² — the box feels the net force, 6 N', isCorrect: true },
      { text: '2 m/s² — divide the 10 N push by 5 kg', isCorrect: false, misconceptionId: `${N2}:MC-SINGLE-FORCE` },
      { text: '0.8 m/s² — divide the friction by 5 kg', isCorrect: false },
    ],
    correctValue: '1.2 m/s²',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${N2}:MC-SINGLE-FORCE`],
    source: `${N2_SRC} — §6 MC-SINGLE-FORCE conflict scenario recast with fresh numbers, distractor-mapped`,
  },
  {
    conceptId: N2,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: "A suitcase is labelled '18 kg' on Earth. An airline moves its hub to a Moon base. What does the label read there, and what HAS changed?",
    choices: [
      { text: 'Still 18 kg — mass is unchanged; only its weight (the force mg) is smaller', isCorrect: true },
      { text: 'About 3 kg — things have less mass on the Moon', isCorrect: false, misconceptionId: `${N2}:MC-MASS-IS-WEIGHT` },
    ],
    correctValue: '18 kg; weight changed, mass did not',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${N2}:MC-MASS-IS-WEIGHT`],
    source: `${N2_SRC} — §7 P79 predict item (suitcase) recast as a distractor-mapped probe`,
  },
]

// ─── phys.mech.newtons-third-law ─────────────────────────────────────────────
const N3 = 'phys.mech.newtons-third-law'
const N3_SRC = 'docs/curriculum/blueprints/phys.mech.newtons-third-law.md'

const N3_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: N3,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: forces come in pairs, swap the objects
    content:
      'Push a wall. You feel the wall push back on your hand — that ' +
      "pressure on your palm IS the wall's answer, and it's exactly as " +
      'strong as your push. Every force in the universe works like this: ' +
      'forces come in PAIRS, one on each of the two things interacting. ' +
      'The recipe for finding the partner force is a simple swap: if the ' +
      'force is "A pushes B", its partner is "B pushes A" — same size, ' +
      'opposite direction, and always on the OTHER object. A swimmer ' +
      'pushes the water backward; the water pushes the swimmer forward — ' +
      "that second one, on the swimmer, is what actually moves her. You " +
      'can\'t touch anything without it touching you back, equally.',
    targetedMisconceptions: [`${N3}:MC-SAME-OBJECT-PAIR`],
    source: `${N3_SRC} — §5 Protocol Library concrete opening (wall/swimmer) + §6 replacement text P31 (the object-swap recipe)`,
  },
  {
    conceptId: N3,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: weight + normal force is NOT a third-law pair
    content:
      "Here's the trap nearly everyone falls into. A book rests on a " +
      "table. Weight pulls it down, the table's normal force pushes it up, " +
      'equal and opposite — so they\'re an action-reaction pair, right? ' +
      'No — and the test is WHICH OBJECT each force acts on. Both of those ' +
      'act on the BOOK. A Third-Law pair always has one force on EACH of ' +
      'two objects. Try the removal test: take the table away. The weight ' +
      'is still there (the book falls) — but a real reaction partner can ' +
      'never outlive its force. The true partner of "Earth pulls book ' +
      'down" is "book pulls EARTH up" — acting on the planet itself. The ' +
      "table's push balancing the weight is a different story: two forces " +
      'on ONE object cancelling — that\'s the First Law (balance), not the ' +
      'Third (pairs).',
    targetedMisconceptions: [`${N3}:MC-SAME-OBJECT-PAIR`],
    source: `${N3_SRC} — §6 MC-SAME-OBJECT-PAIR (removal-test conflict evidence P28 + bridge P30, rendered as one repair text)`,
  },
  {
    conceptId: N3,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    // Repair: truck vs car — equal forces, unequal effects (accessible from
    // middle band; the HIGH repair slot is held by the weight/normal pair)
    content:
      'A truck and a small car collide head-on. Which one hits harder? ' +
      'Instinct screams "the truck" — but the Third Law allows no ' +
      'exceptions: during the crash the truck\'s force on the car and the ' +
      "car's force on the truck are EQUAL in size, every instant, " +
      'regardless of mass or speed. So why is the car wrecked and the ' +
      'truck barely dented? Because the LAWS divide the labour: the Third ' +
      'Law fixes the forces equal; the SECOND Law converts the same force ' +
      'into wildly different accelerations — a = F/m, and the car\'s m is ' +
      'small, so it gets flung. Equal force, unequal consequence. The ' +
      'damage difference is a mass story, never a force story.',
    targetedMisconceptions: [`${N3}:MC-BIGGER-EXERTS-MORE`],
    source: `${N3_SRC} — §6 MC-BIGGER-EXERTS-MORE (full P28→P30→P31 chain as one repair text)`,
  },
  {
    conceptId: N3,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: why pairs never cancel + rocket propulsion
    content:
      'Two puzzles unlock the Third Law completely. First: if every force ' +
      'has an equal opposite partner, why doesn\'t everything cancel and ' +
      'nothing ever move? Because the two forces act on DIFFERENT objects ' +
      '— cancellation only happens between forces on the same body. Your ' +
      'push acts on the trolley; the trolley\'s push-back acts on YOU. ' +
      'Each object responds only to the forces on itself. Second: how does ' +
      'a rocket accelerate in empty space with nothing to push against? ' +
      'It carries its own something: it hurls exhaust gas backward ' +
      '(rocket pushes gas), and the pair force — gas pushes rocket — ' +
      'drives it forward. No road, no air, no wall required: just the ' +
      'other half of an interaction it created itself.',
    targetedMisconceptions: [`${N3}:MC-SAME-OBJECT-PAIR`],
    source: `${N3_SRC} — §7 P75 boundary item (why pairs don't cancel) + P76 rocket transfer item, taught first-principles`,
  },
]

const N3_PROBES: SeedProbe[] = [
  {
    conceptId: N3,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: "A book rests on a table. Earth's gravity pulls the book down. What is the Third-Law reaction to that force?",
    choices: [
      { text: 'The book pulls the Earth upward', isCorrect: true },
      { text: "The table's normal force pushes the book upward", isCorrect: false, misconceptionId: `${N3}:MC-SAME-OBJECT-PAIR` },
      { text: 'There is no reaction — gravity acts alone', isCorrect: false },
    ],
    correctValue: 'the book pulls the Earth upward',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${N3}:MC-SAME-OBJECT-PAIR`],
    source: `${N3_SRC} — §7 P74 classify item, distractor-mapped to the same-object trap`,
  },
  {
    conceptId: N3,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A lorry collides with a parked bicycle. During the impact, how do the forces compare?',
    choices: [
      { text: 'Exactly equal in size, opposite in direction — the bicycle just accelerates far more', isCorrect: true },
      { text: 'The lorry exerts a much larger force because it is heavier and moving', isCorrect: false, misconceptionId: `${N3}:MC-BIGGER-EXERTS-MORE` },
    ],
    correctValue: 'equal and opposite',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${N3}:MC-BIGGER-EXERTS-MORE`],
    source: `${N3_SRC} — §6 discrimination pairs (mosquito–lorry) recast, distractor-mapped`,
  },
]

// ─── phys.mech.momentum ──────────────────────────────────────────────────────
const MOM = 'phys.mech.momentum'
const MOM_SRC = 'docs/curriculum/blueprints/phys.mech.momentum.md'

const MOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MOM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: "how hard to stop" — mass amplifies motion
    content:
      'Momentum answers one question: how hard is this thing to stop? Two ' +
      'ingredients multiply together — how much stuff is moving (mass) and ' +
      'how fast it\'s going (velocity): p = m × v. That multiplication is ' +
      'why a lorry rolling at walking pace is more dangerous than a tennis ' +
      'ball at motorway speed: 1000 kg × 2 m/s = 2000 units of momentum ' +
      'against 0.1 kg × 50 m/s = just 5. The faster object loses, ' +
      'overwhelmingly, because mass counts every bit as much as speed. ' +
      "That's also why momentum carries a direction: stopping something " +
      'means pushing against the way it\'s moving.',
    targetedMisconceptions: [`${MOM}:MC-MOMENTUM-IS-SPEED`],
    source: `${MOM_SRC} — Component 3 MC-MOMENTUM-IS-SPEED (tennis-ball vs truck conflict evidence P28 as first-exposure teaching)`,
  },
  {
    conceptId: MOM,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    // Worked example: comparing momenta + direction/sign handling
    content:
      'Compare three movers. (a) 0.1 kg tennis ball at 50 m/s east: ' +
      'p = 0.1 × 50 = 5 kg·m/s east. (b) 1000 kg truck at 2 m/s east: ' +
      'p = 1000 × 2 = 2000 kg·m/s east — four hundred times the ball, at ' +
      'one twenty-fifth the speed. (c) A 70 kg sprinter at 10 m/s WEST: ' +
      'direction now matters — call east positive and her momentum is ' +
      'p = 70 × (−10) = −700 kg·m/s. The sign isn\'t bookkeeping ' +
      'decoration: momenta ADD as vectors, so the truck and the sprinter ' +
      'together carry 2000 + (−700) = 1300 kg·m/s east. Drop the ' +
      'directions and every multi-object problem gives wrong answers.',
    targetedMisconceptions: [`${MOM}:MC-MOMENTUM-IS-SPEED`, `${MOM}:MC-MOMENTUM-IS-SCALAR`],
    source: `${MOM_SRC} — Component 3 both MCs' conflict evidence, expanded into a signed three-object worked example`,
  },
  {
    conceptId: MOM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: why m×v is THE conserved bookkeeping quantity
    content:
      'Why does physics single out m × v, of all combinations? Because ' +
      "it's the quantity that interactions can only EXCHANGE, never create " +
      'or destroy. When two objects push on each other, the Third Law makes ' +
      'their forces equal-and-opposite over the same contact time, so ' +
      'whatever momentum one gains the other loses, exactly — the total is ' +
      'untouched. That makes momentum the accounting currency of every ' +
      'collision, recoil, and explosion: add the m×v of everything before ' +
      '(with directions), and the after-total must match, no matter how ' +
      'violent or messy the event. Mass alone isn\'t conserved in motion ' +
      'terms; velocity alone certainly isn\'t; their product is the thing ' +
      'the universe keeps books on.',
    targetedMisconceptions: [`${MOM}:MC-MOMENTUM-IS-SCALAR`],
    source: `${MOM_SRC} — Component 1 Concept Spine (conservation preview) + Component 3, taught first-principles for the adult register`,
  },
]

const MOM_PROBES: SeedProbe[] = [
  {
    conceptId: MOM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which has more momentum: a 0.5 kg football kicked at 30 m/s, or a 900 kg car creeping at 1 m/s?',
    choices: [
      { text: 'The car — 900 kg·m/s beats the ball\'s 15 kg·m/s', isCorrect: true },
      { text: 'The football — it is moving 30 times faster', isCorrect: false, misconceptionId: `${MOM}:MC-MOMENTUM-IS-SPEED` },
      { text: 'They are equal — speed and mass trade off exactly', isCorrect: false },
    ],
    correctValue: 'the car',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MOM}:MC-MOMENTUM-IS-SPEED`],
    source: `${MOM_SRC} — Component 3 MC-MOMENTUM-IS-SPEED, fresh numbers (not the blueprint's tennis-ball/truck pair), distractor-mapped`,
  },
]


// ─── math.arith.addition ─────────────────────────────────────────────────────
const ADD = 'math.arith.addition'
const ADD_SRC = 'docs/curriculum/blueprints/math.arith.addition.md'

const ADD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ADD,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    // Intuitive: addition as combining groups (blueprint TA-A01 concrete opening)
    content:
      'Addition is putting groups together and counting what you get. You ' +
      'have 4 marbles, a friend gives you 3 more — push the two piles into ' +
      'one pile and count: 7. And here\'s a secret that makes adding ' +
      'easier forever: it doesn\'t matter which pile you start with. ' +
      '4 + 3 and 3 + 4 make exactly the same big pile — try it with your ' +
      'hands and see. Adding zero is easy too: someone gives you zero ' +
      'marbles, your pile just... stays the same. 5 + 0 = 5.',
    targetedMisconceptions: [`${ADD}:MC-2`, `${ADD}:MC-3`],
    source: `${ADD_SRC} — Component 4 TA-A01 (Concrete Opening: Combining Groups) + TA-A03/TA-A04 (commutativity, zero identity)`,
  },
  {
    conceptId: ADD,
    subjectSlug: 'mathematics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.ELEMENTARY,
    // Worked example: column addition with carrying — MC-1's territory
    content:
      "Let's add 47 + 35 in columns, and watch what happens when a column " +
      'overflows. Ones column first: 7 + 5 = 12. But a single column can ' +
      'only hold ONE digit — and 12 is really "1 ten and 2 ones". So the 2 ' +
      'stays in the ones place, and the 1 ten moves house: it CARRIES into ' +
      'the tens column, where the tens live. Now the tens: 4 + 3 = 7, plus ' +
      'the carried 1 makes 8. Answer: 82. The carry isn\'t a trick — it\'s ' +
      'just "ten ones equals one ten" being enforced. (Writing 712 by ' +
      'jamming the whole 12 into the ones place is the classic slip: it ' +
      'treats each column as its own separate sum and forgets the columns ' +
      'share one number system.)',
    targetedMisconceptions: [`${ADD}:MC-1`],
    source: `${ADD_SRC} — Component 4 TA-A02 (Worked Example Pair: Column Addition with Carrying) + Component 2 MC-1 surface pattern (47+35→712)`,
  },
  {
    conceptId: ADD,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    // Repair: zero annihilates (over-generalized from multiplication)
    content:
      'Quick check: what is 6 + 0? If "0" is whispering "the answer is 0" ' +
      'to you, that rule belongs to a different operation — MULTIPLYING by ' +
      'zero gives zero, because six groups of nothing is nothing. But ' +
      'ADDING zero means adding nothing to what you already have: you have ' +
      '6 sweets, nobody gives you any more, you still have 6. Zero is ' +
      "addition's do-nothing number: a + 0 is always just a. Test the " +
      'difference on 5: 5 + 0 = 5 (still five sweets), but 5 × 0 = 0 (five ' +
      'bags with nothing inside). Same zero, two completely different jobs.',
    targetedMisconceptions: [`${ADD}:MC-3`],
    source: `${ADD_SRC} — Component 5 TA-B03 (Repair: ZERO-ANNIHILATES) + Component 2 MC-3 root cause (overgeneralised a×0=0)`,
  },
]

const ADD_PROBES: SeedProbe[] = [
  {
    conceptId: ADD,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 38 + 26?',
    choices: [
      { text: '64', isCorrect: true },
      { text: '514', isCorrect: false, misconceptionId: `${ADD}:MC-1` },
      { text: '54', isCorrect: false },
    ],
    correctValue: '64',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ADD}:MC-1`],
    source: `${ADD_SRC} — Component 2 MC-1 surface pattern (jam-the-column error 8+6→514), fresh numbers, distractor-mapped`,
  },
]

// ─── math.alg.equation ───────────────────────────────────────────────────────
const EQN = 'math.alg.equation'
const EQN_SRC = 'docs/curriculum/blueprints/math.alg.equation.md'

const EQN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EQN,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: the = sign turns math into a claim; balance-scale image
    content:
      'An equation is not a calculation waiting to happen — it\'s a CLAIM. ' +
      'The equals sign says: "whatever is on my left weighs exactly the ' +
      'same as whatever is on my right." Picture an old balance scale: ' +
      '2x + 3 = 7 claims that a mystery weight doubled, plus 3, balances ' +
      'against 7. Solving the equation means finding the mystery value ' +
      'that makes the claim TRUE — here x = 2, because 2·2 + 3 really is ' +
      "7. That's the whole difference from an expression like 2x + 3 " +
      'alone: an expression is just a recipe you can evaluate; an equation ' +
      'is a statement that can be true or false, and your job is to find ' +
      'what makes it true.',
    targetedMisconceptions: [`${EQN}:MC-1`],
    source: `${EQN_SRC} — Component 1 Cognitive Map + Component 2 MC-1 (EQUATION-IS-EXPRESSION), balance-scale framing from Protocol A`,
  },
  {
    conceptId: EQN,
    subjectSlug: 'mathematics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.MIDDLE,
    // Worked example: solve fully, marking the "simplified ≠ solved" checkpoint
    content:
      'Solve 2x + 3 = 7, and notice where most people stop too early. ' +
      'Step 1 — keep the balance: subtract 3 from BOTH sides: 2x = 4. ' +
      'Pause here, because this is the trap: 2x = 4 is tidier, but it ' +
      "still isn't an answer — it says 'twice the mystery number is 4', " +
      'and the question was "what is x?" Step 2 — divide both sides by 2: ' +
      'x = 2. THAT is solved: x standing alone, with its value exposed. ' +
      'Step 3 — always check the claim: 2(2) + 3 = 7 ✓. The rule of ' +
      'thumb: you\'re done when the variable is alone on one side, not ' +
      'when the equation merely looks simpler.',
    targetedMisconceptions: [`${EQN}:MC-2`],
    source: `${EQN_SRC} — Component 5 TA-B02 (SOLVING-MEANS-SIMPLIFYING repair) rendered as a worked example with the stop-early checkpoint`,
  },
  {
    conceptId: EQN,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Deeper: the three solution regimes (unique / none / all)
    content:
      'Because an equation is a claim, it can relate to truth three ' +
      'different ways — and only one of them is the familiar case. ' +
      'x + 3 = 7 is true for exactly ONE value (x = 4): a unique solution. ' +
      'x + 1 = x is true for NO value at all — subtract x from both sides ' +
      'and you get 1 = 0, an impossibility; the claim is simply false ' +
      'always. And x + 3 = x + 3 is true for EVERY value — it\'s an ' +
      "identity; the claim can't fail. All three are legitimate outcomes, " +
      'and the algebra itself tells you which regime you\'re in: solving ' +
      'ends with the variable pinned (unique), with a contradiction like ' +
      '1 = 0 (none), or with something trivially true like 0 = 0 (all ' +
      'values). Expecting exactly one solution every time is a habit, not ' +
      'a law.',
    targetedMisconceptions: [`${EQN}:MC-3`],
    source: `${EQN_SRC} — Component 2 MC-3 (SOLUTION-IS-UNIQUE-ALWAYS) + Component 5 TA-B03, taught as the three-regimes framework`,
  },
]

const EQN_PROBES: SeedProbe[] = [
  {
    conceptId: EQN,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'You are solving 3x + 2 = 14 and reach the line 3x = 12. Are you done?',
    choices: [
      { text: 'Not yet — divide by 3 to get x = 4; solved means x alone', isCorrect: true },
      { text: 'Yes — the equation is now simplified', isCorrect: false, misconceptionId: `${EQN}:MC-2` },
      { text: 'Yes — 3x = 12 is the solution', isCorrect: false, misconceptionId: `${EQN}:MC-2` },
    ],
    correctValue: 'not yet; x = 4',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EQN}:MC-2`],
    source: `${EQN_SRC} — Component 2 MC-2 trigger signature with fresh numbers, distractor-mapped`,
  },
  {
    conceptId: EQN,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'How many solutions does the equation x + 5 = x have?',
    choices: [
      { text: 'None — subtracting x leaves 5 = 0, which is never true', isCorrect: true },
      { text: 'Exactly one — every equation has one solution', isCorrect: false, misconceptionId: `${EQN}:MC-3` },
      { text: 'x = 5', isCorrect: false, misconceptionId: `${EQN}:MC-1` },
    ],
    correctValue: 'none',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EQN}:MC-3`],
    source: `${EQN_SRC} — Component 2 MC-3 trigger (x+1=x variant), distractor-mapped incl. an MC-1 evaluate-the-expression distractor`,
  },
]

// ─── math.found.set ──────────────────────────────────────────────────────────
const SET = 'math.found.set'
const SET_SRC = 'docs/curriculum/blueprints/math.found.set.md'

const SET_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SET,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: membership is the ONLY thing a set knows
    content:
      'A set is the simplest container in mathematics: it only knows one ' +
      'thing about anything — in, or out. Not first-or-last, not ' +
      'how-many-times: just membership. That\'s why {1, 2, 3} and ' +
      '{3, 2, 1} are the SAME set — asking "is 2 in there?" gets the same ' +
      'yes either way, and order was never recorded. It\'s also why ' +
      '{1, 2, 1} is just {1, 2} with two elements: a set can\'t contain ' +
      'the same thing "twice" — either 1 is in, or it isn\'t; there\'s no ' +
      'counter. If you\'re picturing a list or an array, swap the picture ' +
      'for a club-membership register: the register cares who\'s a member, ' +
      'never in what order they joined or how many membership cards they ' +
      'printed.',
    targetedMisconceptions: [`${SET}:MC-1`],
    source: `${SET_SRC} — Component 3 TA-A01 (Set as Sorted Collection) + Component 2 MC-1 (order/repetition, list overgeneralisation)`,
  },
  {
    conceptId: SET,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // The well-definedness test + empty set as a real object
    content:
      'Two refinements turn the set idea from casual to precise. First, ' +
      'the membership test must be a genuine YES/NO question. "The set of ' +
      'all even numbers" qualifies — hand me any number, I can answer. ' +
      '"The set of tall people" does NOT — is 175 cm tall? There\'s no ' +
      'fact of the matter, so no set. Mathematical sets require ' +
      'well-defined membership, not vibes. Second, the empty set ∅ is a ' +
      'real, respectable object: the set whose membership test always ' +
      'answers NO — like a club with a rulebook but zero members; the club ' +
      'still exists. And watch the notation trap: {∅} is NOT empty — it\'s ' +
      'a box containing one thing (an empty box), so |{∅}| = 1 while ' +
      '|∅| = 0. The container and the contents are different levels.',
    targetedMisconceptions: [`${SET}:MC-2`, `${SET}:MC-3`],
    source: `${SET_SRC} — Component 2 MC-2 (YES/NO membership criterion) + MC-3 (∅ vs {∅} counting exercise), rendered as teaching text`,
  },
]

const SET_PROBES: SeedProbe[] = [
  {
    conceptId: SET,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'How many elements does the set {a, b, a, c, b} have?',
    choices: [
      { text: '3 — a set only records which things are members: {a, b, c}', isCorrect: true },
      { text: '5 — count every symbol written', isCorrect: false, misconceptionId: `${SET}:MC-1` },
    ],
    correctValue: '3',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SET}:MC-1`],
    source: `${SET_SRC} — Component 2 MC-1 trigger ({1,2,1} claim) with fresh symbols, distractor-mapped`,
  },
  {
    conceptId: SET,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the cardinality (number of elements) of {∅}?',
    choices: [
      { text: '1 — it contains one element, which happens to be the empty set', isCorrect: true },
      { text: '0 — it is the empty set', isCorrect: false, misconceptionId: `${SET}:MC-3` },
    ],
    correctValue: '1',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SET}:MC-3`],
    source: `${SET_SRC} — Component 2 MC-3 (|{∅}| = 0 error), distractor-mapped`,
  },
]


// ─── phys.meas.scalars-vectors ───────────────────────────────────────────────
const SV = 'phys.meas.scalars-vectors'
const SV_SRC = 'docs/curriculum/blueprints/phys.meas.scalars-vectors.md'

const SV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SV,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: two kinds of questions — how much vs how much AND which way
    content:
      'Some measurements answer one question; others answer two. "How hot ' +
      'is the tea?" — 70 degrees. Done. Temperature, mass, time: one ' +
      'number tells the whole story. These are SCALARS. But try giving ' +
      'someone directions with "walk 500 metres" — they immediately ask ' +
      '"which WAY?" Some quantities are incomplete without a direction: ' +
      'displacement, velocity, force. These are VECTORS — a size AND a ' +
      'direction, welded together. The quick test for any quantity: does ' +
      'asking "in which direction?" make sense? "In which direction is ' +
      'the mass?" — nonsense, scalar. "In which direction is the push?" — ' +
      'essential, vector.',
    targetedMisconceptions: [`${SV}:MC-4`],
    source: `${SV_SRC} — §5 Protocol Library concrete opening + §6 MC-4 (all-quantities-are-numbers), the which-way test`,
  },
  {
    conceptId: SV,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: MC-1 speed/velocity via circular track + MC-2 distance/displacement
    content:
      'Everyday English treats speed/velocity and distance/displacement as ' +
      'synonyms — physics splits both pairs, and a car on a circular track ' +
      'shows why. Lap at a perfectly steady 60 km/h: your SPEED never ' +
      'changes. But your VELOCITY is changing every instant — because ' +
      "velocity includes direction, and your direction is sweeping around " +
      'the circle. Same split for the path: after one full lap your ' +
      'DISTANCE is the whole track length — say 400 m of tyre wear — but ' +
      'your DISPLACEMENT is ZERO: the straight arrow from start-point to ' +
      'end-point has no length, because they\'re the same point. Rule: ' +
      'distance and speed are scalars (path and its rate); displacement ' +
      'and velocity are their vector siblings (net change with direction, ' +
      'and its rate).',
    targetedMisconceptions: [`${SV}:MC-1`, `${SV}:MC-2`],
    source: `${SV_SRC} — §6 MC-1 (circular-track conflict P28/P07) + MC-2 (path vs directed straight-line), one unified repair`,
  },
  {
    conceptId: SV,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Negative vectors: sign IS direction on a line
    content:
      'A negative vector isn\'t a wrong or missing quantity — the minus ' +
      'sign IS the direction. On a straight road, pick east as positive. ' +
      'A displacement of +30 m means 30 m east; −30 m means 30 m WEST — ' +
      'equally real, equally valid. The sign is doing the same job an ' +
      'arrow does on a diagram. This is why a ball thrown upward can have ' +
      'velocity +12 m/s on the way up and −12 m/s coming back through the ' +
      'same point: same size, opposite direction, and the sign carries ' +
      'that fact through the algebra. Refusing negative values for vector ' +
      'quantities is refusing half the directions in the universe; for ' +
      'scalars like mass or distance, by contrast, negatives genuinely ' +
      'are meaningless.',
    targetedMisconceptions: [`${SV}:MC-3`],
    source: `${SV_SRC} — §6 MC-3 (negative-vector refusal; number-line root cause addressed by making sign = direction explicit)`,
  },
]

const SV_PROBES: SeedProbe[] = [
  {
    conceptId: SV,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A car drives one full lap of a 400 m circular track at a constant 60 km/h. Which statement is correct?',
    choices: [
      { text: 'Its speed was constant, but its velocity was changing the whole time', isCorrect: true },
      { text: 'Its velocity was constant because its speed was constant', isCorrect: false, misconceptionId: `${SV}:MC-1` },
      { text: 'Its displacement for the lap is 400 m', isCorrect: false, misconceptionId: `${SV}:MC-2` },
    ],
    correctValue: 'speed constant, velocity changing',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SV}:MC-1`, `${SV}:MC-2`],
    source: `${SV_SRC} — §6 MC-1/MC-2 circular-track scenario as one dual-mapped item`,
  },
  {
    conceptId: SV,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Taking east as positive, a hiker\'s displacement is −2 km. What does this mean?',
    choices: [
      { text: 'She ended up 2 km west of her start — the sign is the direction', isCorrect: true },
      { text: 'The measurement is invalid — displacement cannot be negative', isCorrect: false, misconceptionId: `${SV}:MC-3` },
      { text: 'She walked 2 km less than planned', isCorrect: false },
    ],
    correctValue: '2 km west',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SV}:MC-3`],
    source: `${SV_SRC} — §6 MC-3, distractor-mapped`,
  },
]

// ─── math.arith.multiplication ───────────────────────────────────────────────
const MUL = 'math.arith.multiplication'
const MUL_SRC = 'docs/curriculum/blueprints/math.arith.multiplication.md'

const MUL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MUL,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    // Intuitive: groups-of, distinguished from adding
    content:
      'Multiplication counts GROUPS. 3 × 4 doesn\'t mean "3 and 4" — it ' +
      'means "3 groups, with 4 in each group". Picture 3 plates with 4 ' +
      'strawberries on each: count them all — 4, 8, 12. That\'s why ' +
      '3 × 4 = 12 while 3 + 4 = 7: adding puts two piles together once; ' +
      'multiplying repeats a whole pile again and again. When you see ×, ' +
      'ask "how many groups, and how big is each?" — never just squash ' +
      'the two numbers together.',
    targetedMisconceptions: [`${MUL}:MC-1`],
    source: `${MUL_SRC} — Component 4 concrete opening (groups-of model) + Component 2 MC-1 (ADDITION-CONFUSION, 3×4=7)`,
  },
  {
    conceptId: MUL,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    // Visual/spatial: the array proof of commutativity
    content:
      'Here\'s a fair question: "3 groups of 4 sweets" and "4 groups of 3 ' +
      'sweets" LOOK completely different on the table — so why is ' +
      '3 × 4 = 4 × 3? Arrange the sweets in a rectangle: 3 rows, 4 ' +
      'columns. Count by rows: 3 rows of 4 → 3 × 4. Now just TURN YOUR ' +
      'HEAD sideways: the same rectangle is 4 rows of 3 → 4 × 3. Not one ' +
      'sweet moved. The two descriptions were different, but they were ' +
      'always describing the same rectangle — that\'s why the totals must ' +
      'match, for any two numbers, forever. The picture IS the proof.',
    targetedMisconceptions: [`${MUL}:MC-2`],
    source: `${MUL_SRC} — Component 2 MC-2 (COMMUTATIVITY-FALSE: models differ physically, totals don't) via the rotation-of-array argument`,
  },
  {
    conceptId: MUL,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    // Repair: a×0 — the mirror image of addition's zero
    content:
      'Zero plays opposite roles in adding and multiplying, and mixing ' +
      'them up is the most common slip there is. ADDING zero changes ' +
      'nothing: 7 + 0 = 7 — you got no new sweets, your pile stands. ' +
      'MULTIPLYING by zero wipes everything out: 7 × 0 means "7 groups ' +
      'with NOTHING in each group" — seven empty plates hold zero sweets ' +
      'total, so 7 × 0 = 0. Ask the groups question every time: how many ' +
      'groups (7), how big is each (0)? Seven nothings is nothing. So ' +
      'a + 0 = a, but a × 0 = 0 — same zero, opposite superpowers.',
    targetedMisconceptions: [`${MUL}:MC-3`],
    source: `${MUL_SRC} — Component 2 MC-3 (ZERO-IDENTITY-CONFUSION, a×0=a from additive overgeneralisation) + repair protocol`,
  },
]

const MUL_PROBES: SeedProbe[] = [
  {
    conceptId: MUL,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 6 × 0?',
    choices: [
      { text: '0 — six groups with nothing in each is nothing', isCorrect: true },
      { text: '6 — the zero changes nothing', isCorrect: false, misconceptionId: `${MUL}:MC-3` },
    ],
    correctValue: '0',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MUL}:MC-3`],
    source: `${MUL_SRC} — Component 2 MC-3 surface pattern, distractor-mapped`,
  },
  {
    conceptId: MUL,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY,
    stem: 'What is 3 × 4?',
    choices: [
      { text: '12 — three groups of four: 4, 8, 12', isCorrect: true },
      { text: '7 — put the 3 and the 4 together', isCorrect: false, misconceptionId: `${MUL}:MC-1` },
    ],
    correctValue: '12',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${MUL}:MC-1`],
    source: `${MUL_SRC} — Component 2 MC-1 exact surface pattern (3×4=7), distractor-mapped`,
  },
]

// ─── math.arith.subtraction ──────────────────────────────────────────────────
const SUB = 'math.arith.subtraction'
const SUB_SRC = 'docs/curriculum/blueprints/math.arith.subtraction.md'

const SUB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SUB,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    // Intuitive: taking away + order matters (anti-commutativity early)
    content:
      'Subtraction is taking away — and unlike adding, the ORDER is part ' +
      'of the story. 8 − 3 asks: start with 8 sweets, give 3 away, what\'s ' +
      'left? Five. But 3 − 8 is a different story with a different ' +
      'starting pile: start with only 3 and try to give away 8 — you ' +
      "can't even finish (you'd owe 5). With adding, 3 + 8 and 8 + 3 tell " +
      'the same combining story. With taking away, who STARTS with the ' +
      'sweets completely changes what happens — so never flip a ' +
      'subtraction around to make it easier.',
    targetedMisconceptions: [`${SUB}:MC-2`],
    source: `${SUB_SRC} — Component 4 concrete opening + Component 2 MC-2 (COMMUTATIVITY-ASSUMED, 3−8 = 8−3)`,
  },
  {
    conceptId: SUB,
    subjectSlug: 'mathematics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.ELEMENTARY,
    // Worked example: 53−28 with borrowing, exposing both MC-1 and MC-3
    content:
      "Let's do 53 − 28 in columns, slowly, because two traps live here. " +
      'Ones column: 3 − 8. You can\'t take 8 from 3 — and the WRONG move ' +
      'is to quietly flip it to 8 − 3 = 5 (that answers a different ' +
      'question!). The right move is to BORROW: go next door to the tens. ' +
      'The 5 tens lend one ten to the ones — but a loan isn\'t free: the ' +
      'tens column drops from 5 to 4, and you must write that down. Now ' +
      'the ones have 13: 13 − 8 = 5. Tens column — using the reduced 4, ' +
      'not the original 5: 4 − 2 = 2. Answer: 25. Check by adding back: ' +
      '25 + 28 = 53 ✓. Both traps are bookkeeping: don\'t reverse the ' +
      'digits, and don\'t forget the lender lost a ten.',
    targetedMisconceptions: [`${SUB}:MC-1`, `${SUB}:MC-3`],
    source: `${SUB_SRC} — Component 2 MC-1 (SMALLER-FROM-LARGER, 53−28→35) + MC-3 (BORROW-NOT-REDUCED), one stepped worked example`,
  },
  {
    conceptId: SUB,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    // Repair: smaller-from-larger, with the addition-check as the detector
    content:
      'A very common habit: whenever a column looks impossible, subtract ' +
      'the smaller digit from the larger one and move on — 53 − 28: ones ' +
      'become 8 − 3 = 5, tens 5 − 2 = 3, answer 35. It feels tidy, but ' +
      "here's the detector every subtraction carries built-in: the answer " +
      'plus what you took away must rebuild what you started with. Check: ' +
      '35 + 28 = 63. Not 53. The habit quietly answered a DIFFERENT ' +
      'question. The 3 in the ones place means the pile is short there — ' +
      'and the fix is borrowing from the tens (53 is just 40 + 13 in ' +
      'disguise), not reversing who takes from whom. Reversed columns ' +
      'always fail the add-back check; borrowed ones always pass it.',
    targetedMisconceptions: [`${SUB}:MC-1`],
    source: `${SUB_SRC} — Component 2 MC-1 root cause (reverses to avoid negatives) + Component 5 repair, taught via the add-back verification`,
  },
]

const SUB_PROBES: SeedProbe[] = [
  {
    conceptId: SUB,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 62 − 37?',
    choices: [
      { text: '25', isCorrect: true },
      { text: '35 — take the smaller digit from the larger in each column', isCorrect: false, misconceptionId: `${SUB}:MC-1` },
      { text: '15 — borrow, and also drop the tens by one extra', isCorrect: false },
    ],
    correctValue: '25',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SUB}:MC-1`],
    source: `${SUB_SRC} — Component 2 MC-1 surface pattern with fresh numbers, distractor-mapped`,
  },
]


// ─── math.arith.division ─────────────────────────────────────────────────────
const DIV = 'math.arith.division'
const DIV_SRC = 'docs/curriculum/blueprints/math.arith.division.md'

const DIV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DIV,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    // Intuitive: sharing — and why the roles can't swap
    content:
      'Division is fair sharing. 12 ÷ 4 asks: share 12 biscuits among 4 ' +
      'friends — how many does each friend get? Three each. And notice the ' +
      'two numbers have completely different JOBS: one is the pile, one is ' +
      'the people. Swap them and the story changes utterly — 4 ÷ 12 shares ' +
      'just 4 biscuits among 12 friends: now each gets only a piece of a ' +
      'biscuit, nowhere near 3. Adding and multiplying let you swap ' +
      "numbers freely; dividing never does. Before you divide, always ask: " +
      "what's being shared, and who's sharing it?",
    targetedMisconceptions: [`${DIV}:MC-1`],
    source: `${DIV_SRC} — Component 4 concrete opening (sharing model) + Component 2 MC-1 (DIVISION-COMMUTATIVE, 12÷4 = 4÷12)`,
  },
  {
    conceptId: DIV,
    subjectSlug: 'mathematics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.ELEMENTARY,
    // Worked example: remainder as part of the answer
    content:
      'Share 13 sweets among 4 children. Deal them out like cards: one ' +
      'each (4 gone), two each (8 gone), three each (12 gone). One sweet ' +
      'remains — not enough for another full round. The complete answer is ' +
      '"3 each, remainder 1", written 13 ÷ 4 = 3 r 1. The remainder isn\'t ' +
      'a mistake or something to hide — it\'s the honest leftover, part of ' +
      'the answer. Check it the multiplication way: 4 × 3 = 12, plus the ' +
      'leftover 1, rebuilds 13 ✓. Dropping the remainder ("13 ÷ 4 = 3") ' +
      'fails that check: 4 × 3 = 12, and a sweet has vanished. Every ' +
      'division answer must rebuild the pile: divisor × quotient + ' +
      'remainder = what you started with.',
    targetedMisconceptions: [`${DIV}:MC-3`],
    source: `${DIV_SRC} — Component 2 MC-3 (REMAINDER-IGNORED) + Component 4 dealing-out model, with the rebuild check as the verifier`,
  },
  {
    conceptId: DIV,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    // Repair: division by zero — via the inverse definition (blueprint's own argument)
    content:
      'Why is dividing by zero forbidden, rather than just zero or "the ' +
      'number itself"? Because every division is secretly a multiplication ' +
      'question: 12 ÷ 4 = 3 exactly because 3 × 4 = 12. So 7 ÷ 0 asks: ' +
      '"what number times 0 gives 7?" Try anything — 5 × 0 = 0, ' +
      '100 × 0 = 0, a million × 0 = 0. Every candidate gives 0, never 7. ' +
      'There is NO answer, so mathematics says: undefined. And 0 ÷ 0 fails ' +
      'the opposite way: EVERY number times 0 gives 0, so every number ' +
      '"works" — no single answer can be chosen. Not zero, not the ' +
      'number, not infinity: division by zero has no defined value because ' +
      'the multiplication question behind it has no (unique) solution.',
    targetedMisconceptions: [`${DIV}:MC-2`],
    source: `${DIV_SRC} — Component 2 MC-2 (DIVISION-BY-ZERO-DEFINED) + the blueprint's inverse-definition argument (a÷b=c requires c×b=a)`,
  },
]

const DIV_PROBES: SeedProbe[] = [
  {
    conceptId: DIV,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 17 ÷ 5?',
    choices: [
      { text: '3 remainder 2 — five threes are 15, and 2 are left over', isCorrect: true },
      { text: '3 — the leftover doesn\'t count', isCorrect: false, misconceptionId: `${DIV}:MC-3` },
    ],
    correctValue: '3 r 2',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${DIV}:MC-3`],
    source: `${DIV_SRC} — Component 2 MC-3 with fresh numbers, distractor-mapped`,
  },
  {
    conceptId: DIV,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is 9 ÷ 0?',
    choices: [
      { text: 'Undefined — no number times 0 can ever give 9', isCorrect: true },
      { text: '0', isCorrect: false, misconceptionId: `${DIV}:MC-2` },
      { text: '9', isCorrect: false, misconceptionId: `${DIV}:MC-2` },
    ],
    correctValue: 'undefined',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DIV}:MC-2`],
    source: `${DIV_SRC} — Component 2 MC-2 both surface patterns as distractors`,
  },
]

// ─── phys.mech.kinematics-1d ─────────────────────────────────────────────────
const KIN = 'phys.mech.kinematics-1d'
const KIN_SRC = 'docs/curriculum/blueprints/phys.mech.kinematics-1d.md'

const KIN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KIN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: the SUVAT contract — five quantities, one condition
    content:
      'One-dimensional kinematics is a bookkeeping system for five ' +
      'quantities: displacement (s), initial velocity (u), final velocity ' +
      '(v), acceleration (a), and time (t) — the "SUVAT" family. The ' +
      'equations linking them (v = u + at, s = ut + ½at², v² = u² + 2as) ' +
      'come with ONE non-negotiable condition in their contract: the ' +
      'acceleration must be CONSTANT for the whole interval — same value ' +
      'at every instant. A dropped stone qualifies (a = g throughout). A ' +
      'car in city traffic — accelerate, brake, idle — does not: no single ' +
      '"a" describes that trip, and forcing one into the equations gives ' +
      'an answer that\'s confidently wrong. First question, every problem: ' +
      'is the acceleration the same the whole time? Only then pick an ' +
      'equation.',
    targetedMisconceptions: [`${KIN}:MC-APPLIES-ALWAYS`],
    source: `${KIN_SRC} — §5 Protocol Library + §6 MC-APPLIES-ALWAYS (traffic-light conflict evidence P28, taught as the contract condition)`,
  },
  {
    conceptId: KIN,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    // Worked example: ball up and back — s is displacement, sign discipline
    content:
      'A ball is thrown straight up at 20 m/s and caught at the same ' +
      'height. Total flight time? Use v = u + at with sign discipline: ' +
      'take UP as positive, so u = +20 m/s, a = −9.8 m/s² (gravity acts ' +
      'downward the whole flight). At the catch, the ball is back where it ' +
      'started — s = 0, because s is DISPLACEMENT, final minus initial ' +
      'position, not the 40+ metres of path it travelled. From ' +
      's = ut + ½at²: 0 = 20t − 4.9t², so t(20 − 4.9t) = 0 → t = 0 (the ' +
      'throw) or t ≈ 4.1 s (the catch). Notice how much work the signs ' +
      'did: gravity stayed −9.8 even while the ball rose, and s = 0 ' +
      'encoded "came back" without any special cases.',
    targetedMisconceptions: [`${KIN}:MC-DISPLACEMENT-CONFUSION`],
    source: `${KIN_SRC} — §6 MC-DISPLACEMENT-CONFUSION (up-and-back conflict evidence P28) expanded into a full signed SUVAT solution`,
  },
  {
    conceptId: KIN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: where the equations come from (area under v-t)
    content:
      'The kinematic equations aren\'t axioms to memorize — they\'re three ' +
      'readings of one picture: the velocity-time graph under constant ' +
      'acceleration, which is simply a straight line. Its slope is a, so ' +
      'v = u + at is just "start at u, climb at rate a". Displacement is ' +
      'the AREA under the line — a trapezium: average height × width = ' +
      '½(u + v)t, and substituting v = u + at turns that into ' +
      's = ut + ½at². Eliminate t between the two and you get ' +
      'v² = u² + 2as for problems where time is unknown. Seeing them as ' +
      'one straight line explains the constant-a restriction perfectly: ' +
      'curve the line (varying a) and the slope and area formulas for ' +
      'straight lines simply stop describing it — that\'s when you ' +
      'integrate instead.',
    targetedMisconceptions: [`${KIN}:MC-APPLIES-ALWAYS`],
    source: `${KIN_SRC} — §6 bridge text (area under v-t graph) expanded into the full derivation-from-one-picture treatment`,
  },
]

const KIN_PROBES: SeedProbe[] = [
  {
    conceptId: KIN,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A ball is thrown up 15 m and caught at the same height. In the kinematic equations, what is s for the whole flight?',
    choices: [
      { text: '0 — s is displacement, and the ball ended where it began', isCorrect: true },
      { text: '30 m — it travelled 15 m up and 15 m down', isCorrect: false, misconceptionId: `${KIN}:MC-DISPLACEMENT-CONFUSION` },
      { text: '15 m — the height it reached', isCorrect: false },
    ],
    correctValue: '0',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KIN}:MC-DISPLACEMENT-CONFUSION`],
    source: `${KIN_SRC} — §6 discrimination pair 1, distractor-mapped`,
  },
  {
    conceptId: KIN,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'For which journey can you safely use v = u + at with a single value of a?',
    choices: [
      { text: 'A stone falling freely from a cliff', isCorrect: true },
      { text: 'A car driving through stop-and-go city traffic', isCorrect: false, misconceptionId: `${KIN}:MC-APPLIES-ALWAYS` },
      { text: 'A driver braking harder and harder to a stop', isCorrect: false, misconceptionId: `${KIN}:MC-APPLIES-ALWAYS` },
    ],
    correctValue: 'the freely falling stone',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${KIN}:MC-APPLIES-ALWAYS`],
    source: `${KIN_SRC} — §6 discrimination pairs (P33), distractor-mapped`,
  },
]


// ─── math.found.logic ────────────────────────────────────────────────────────
const LOGIC = 'math.found.logic'
const LOGIC_SRC = 'docs/curriculum/blueprints/math.found.logic.md'

const LOGIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOGIC,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: IF-THEN as a promise — when is the promise BROKEN?
    content:
      'An IF-THEN statement is a promise, and it\'s only FALSE when the ' +
      'promise is broken. "IF it rains, THEN I\'ll drive you to school." ' +
      'When is that a lie? Only one case: it rained AND I didn\'t drive ' +
      'you. Now the sneaky cases — suppose it never rained. Did I break ' +
      'the promise? No! I promised nothing about sunny days. Whether I ' +
      'drove you anyway or not, the promise stands unbroken — so the ' +
      'statement counts as TRUE whenever the IF-part doesn\'t happen. ' +
      'That feels strange at first, but it\'s just this: a promise about ' +
      'rainy days can only be tested on rainy days. IF P THEN Q is false ' +
      'in exactly one situation — P true, Q false — and true in all ' +
      'three others.',
    targetedMisconceptions: [`${LOGIC}:MC-1`],
    source: `${LOGIC_SRC} — Component 6 MC-1 (false-when-P-false, truth-table rows 3-4) via the promise framing from the Protocol Library`,
  },
  {
    conceptId: LOGIC,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: converse confusion (P→Q vs Q→P)
    content:
      'Here\'s the most seductive wrong move in logic: from "IF it\'s a ' +
      'dog, THEN it\'s an animal", concluding "IF it\'s an animal, THEN ' +
      'it\'s a dog." Swapping the two halves gives the CONVERSE — a ' +
      'genuinely different statement that can be false while the original ' +
      'is true (a cat is an animal; it is stubbornly not a dog). The ' +
      'arrow of an IF-THEN points one way only: P → Q says every P is a ' +
      'Q, but says nothing about whether every Q is a P. Whenever you\'re ' +
      'tempted to flip, run a quick zoo test: find a Q that isn\'t a P ' +
      '(an animal that isn\'t a dog), and the converse dies while the ' +
      'original lives on. What IS always equivalent is the CONTRAPOSITIVE ' +
      '— "IF not-Q, THEN not-P" ("if it\'s not an animal, it\'s not a ' +
      'dog") — flip AND negate, and truth survives.',
    targetedMisconceptions: [`${LOGIC}:MC-2`],
    source: `${LOGIC_SRC} — Component 6 MC-2 (converse confusion) + Protocol C repair, with the contrapositive contrast`,
  },
  {
    conceptId: LOGIC,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Deeper: examples vs proof — the asymmetry of evidence
    content:
      'In mathematics, examples and counterexamples have wildly unequal ' +
      'power — and the asymmetry runs OPPOSITE to everyday life. To prove ' +
      'a universal claim ("every even number greater than 2 is a sum of ' +
      'two primes") true, a million confirming examples prove NOTHING ' +
      'final: the million-and-first could still fail; the claim covers ' +
      'infinitely many cases and you checked finitely many. But to prove ' +
      'it FALSE, one single counterexample is total, instant victory. ' +
      'One broken case kills a universal claim forever. So the honest ' +
      'division of labour is: examples are for EXPLORING and building ' +
      'confidence; proofs (arguments covering every case at once) are for ' +
      'establishing truth; counterexamples are for demolition. "I found ' +
      'one where it works" is the start of an investigation — never the ' +
      'end of one.',
    targetedMisconceptions: [`${LOGIC}:MC-3`],
    source: `${LOGIC_SRC} — Component 6 MC-3 (single example proves true) via the asymmetry-of-evidence treatment`,
  },
]

const LOGIC_PROBES: SeedProbe[] = [
  {
    conceptId: LOGIC,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: '"IF a number is divisible by 4, THEN it is even." Which conclusion is valid?',
    choices: [
      { text: 'A number NOT even is certainly not divisible by 4 (contrapositive)', isCorrect: true },
      { text: 'An even number is certainly divisible by 4 (converse)', isCorrect: false, misconceptionId: `${LOGIC}:MC-2` },
      { text: 'The statement is false for the number 3, since 3 is not divisible by 4', isCorrect: false, misconceptionId: `${LOGIC}:MC-1` },
    ],
    correctValue: 'the contrapositive',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LOGIC}:MC-1`, `${LOGIC}:MC-2`],
    source: `${LOGIC_SRC} — Component 6 MC-1/MC-2 as one dual-mapped item (6 is even but not divisible by 4 kills the converse)`,
  },
  {
    conceptId: LOGIC,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student checks that n² + n + 41 is prime for n = 1, 2, 3, … 10 and declares the formula "always gives primes." What is the status of that claim?',
    choices: [
      { text: 'Unproven — ten examples cannot establish a claim about all numbers (and indeed n = 41 fails)', isCorrect: true },
      { text: 'Proven — ten checks with no failures is convincing evidence', isCorrect: false, misconceptionId: `${LOGIC}:MC-3` },
    ],
    correctValue: 'unproven',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LOGIC}:MC-3`],
    source: `${LOGIC_SRC} — Component 6 MC-3, Euler's classic polynomial as the trap`,
  },
]

// ─── math.alg.expression ─────────────────────────────────────────────────────
const EXPR = 'math.alg.expression'
const EXPR_SRC = 'docs/curriculum/blueprints/math.alg.expression.md'

const EXPR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXPR,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    // Intuitive: expression = machine/recipe, not a question to solve
    content:
      'An expression like 3x + 2 is a MACHINE, not a question. Feed it a ' +
      'number, it hands one back: feed in x = 4, out comes 3·4 + 2 = 14; ' +
      'feed in x = 10, out comes 32. Nothing here needs "solving" — ' +
      "there's no equals sign, so no claim is being made and no mystery " +
      'value is hiding. The x is a SLOT, not a secret: it stands ready to ' +
      'hold any number you choose. Only when someone bolts on an equals ' +
      'sign — 3x + 2 = 14 — does it become an equation, a claim that\'s ' +
      'true for some inputs and false for others, and only THEN does ' +
      '"find x" mean anything. Expression: a recipe you evaluate. ' +
      'Equation: a claim you satisfy.',
    targetedMisconceptions: [`${EXPR}:MC-1`, `${EXPR}:MC-2`],
    source: `${EXPR_SRC} — Component 2 MC-1 (EXPRESSION-IS-EQUATION) + MC-2 (VARIABLE-IS-FIXED), machine/slot framing from Protocol A`,
  },
  {
    conceptId: EXPR,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    // Repair: unlike terms combined (3x + 2y = 5xy; 3x + 2 = 5x)
    content:
      'Why isn\'t 3x + 2y just 5xy? Give the letters jobs: x = the price ' +
      'of an apple, y = the price of a banana. Then 3x + 2y is the cost ' +
      'of 3 apples and 2 bananas. Can you shorten that to "5 apple-' +
      'bananas"? There\'s no such fruit — the two costs stay separate ' +
      'until you know actual prices. Same with 3x + 2: three apples plus ' +
      '2 rupees isn\'t 5 of anything. The rule underneath: only LIKE ' +
      'terms — same letter, same power — can be combined, because ' +
      '3x + 2x really is 5 of the same thing (5 apples: 5x). Test any ' +
      'simplification by substituting a number: at x = 2, y = 3, the ' +
      'original 3x + 2y = 12, but 5xy = 30. Different numbers, so the ' +
      '"simplification" was actually a different expression.',
    targetedMisconceptions: [`${EXPR}:MC-3`],
    source: `${EXPR_SRC} — Component 2 MC-3 (UNLIKE-TERMS-COMBINED) + TA-B03 repair, with the substitution check as verifier`,
  },
]

const EXPR_PROBES: SeedProbe[] = [
  {
    conceptId: EXPR,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Simplify 4x + 3, if possible.',
    choices: [
      { text: 'It is already as simple as it gets — 4x and 3 are unlike terms', isCorrect: true },
      { text: '7x', isCorrect: false, misconceptionId: `${EXPR}:MC-3` },
      { text: 'x = −3/4', isCorrect: false, misconceptionId: `${EXPR}:MC-1` },
    ],
    correctValue: 'already simplified',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EXPR}:MC-1`, `${EXPR}:MC-3`],
    source: `${EXPR_SRC} — Component 2 MC-1/MC-3 as one dual-mapped item (solve-the-expression distractor + unlike-terms distractor)`,
  },
]

// ─── phys.mech.kinematics-2d ─────────────────────────────────────────────────
const KIN2 = 'phys.mech.kinematics-2d'
const KIN2_SRC = 'docs/curriculum/blueprints/phys.mech.kinematics-2d.md'

const KIN2_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KIN2,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: two independent 1D movies sharing a clock
    content:
      'Two-dimensional motion sounds like a new subject; it\'s actually ' +
      'the old one, run twice at once. Picture the classic demo: one ball ' +
      'DROPPED from a table edge exactly as an identical ball is fired ' +
      'HORIZONTALLY from the same height. They hit the floor at the same ' +
      'instant, every time. The horizontal firing bought the second ball ' +
      'sideways travel — but not one extra millisecond of hang time, ' +
      'because horizontal motion and vertical motion never talk to each ' +
      'other. Gravity works the y-axis; nothing works the x-axis; each ' +
      'axis runs its own independent 1D story. The ONLY thing the two ' +
      'stories share is the clock. So every 2D problem is: split into x ' +
      'and y, solve two 1D problems you already know how to do, and let ' +
      'the shared time t stitch them back together.',
    targetedMisconceptions: [`${KIN2}:MC-AXES-COUPLED`],
    source: `${KIN2_SRC} — MC-AXES-COUPLED (independence conflict evidence P28 + two-tracks bridge P30, taught via the drop-vs-fire demo)`,
  },
  {
    conceptId: KIN2,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    // Worked example: horizontal launch, full decomposition discipline
    content:
      'A ball is thrown horizontally at 10 m/s from a 20 m cliff. Where ' +
      'and how fast does it land? Split the axes and keep them apart. ' +
      'Y-AXIS (finds the time): u_y = 0 (thrown horizontally), a_y = ' +
      '9.8 m/s² down, y = 20 m. From y = ½gt²: 20 = 4.9t² → t = 2.02 s. ' +
      'X-AXIS (uses that time): constant vₓ = 10 m/s, so range x = ' +
      '10 × 2.02 = 20.2 m. Landing velocity: vₓ is still 10 (nothing ' +
      'touched it); v_y = gt = 19.8 m/s; only NOW combine them — ' +
      '|v| = √(10² + 19.8²) ≈ 22.2 m/s. Notice the discipline: the 10 m/s ' +
      'never entered a y-equation, gravity never entered an x-equation, ' +
      'and the magnitude |v| appeared only at the very end, as a report — ' +
      'never inside the component algebra.',
    targetedMisconceptions: [`${KIN2}:MC-AXES-COUPLED`, `${KIN2}:MC-TOTAL-VELOCITY-COMPONENT`],
    source: `${KIN2_SRC} — MC-AXES-COUPLED conflict scenario (cliff launch) expanded to a full solution + MC-TOTAL-VELOCITY-COMPONENT replacement rule (magnitude last)`,
  },
  {
    conceptId: KIN2,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: using |v| inside component equations
    content:
      'A ball moves with vₓ = 3 m/s and v_y = 4 m/s. Its speed is ' +
      '√(3² + 4²) = 5 m/s — and that 5 is precisely the number you must ' +
      'NOT use inside the axis equations. Try it: x = 5t predicts 5 m of ' +
      'horizontal travel in one second. Reality: the ball moves 3 m ' +
      'horizontally (and 4 m vertically) in that second. The 5 m/s is ' +
      'real — it\'s the diagonal, how fast the ball moves along its ' +
      'slanted path — but each AXIS only sees its own shadow of that ' +
      'motion: the x-axis sees 3, the y-axis sees 4. Components live in ' +
      'the equations; the magnitude is bookkeeping you do at the end, ' +
      'via Pythagoras, for the final answer. Write vₓ and v_y as separate ' +
      'quantities from the first line and |v| can never sneak in.',
    targetedMisconceptions: [`${KIN2}:MC-TOTAL-VELOCITY-COMPONENT`],
    source: `${KIN2_SRC} — MC-TOTAL-VELOCITY-COMPONENT (3-4-5 conflict evidence P28 + shadow framing of bridge P30)`,
  },
]

const KIN2_PROBES: SeedProbe[] = [
  {
    conceptId: KIN2,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Ball A is dropped from a table at the same instant ball B is fired horizontally from the same height. Which lands first?',
    choices: [
      { text: 'Both land together — horizontal motion cannot affect the vertical fall', isCorrect: true },
      { text: 'Ball A — ball B\'s speed keeps it in the air longer', isCorrect: false, misconceptionId: `${KIN2}:MC-AXES-COUPLED` },
      { text: 'Ball B — its extra velocity drives it down faster', isCorrect: false, misconceptionId: `${KIN2}:MC-AXES-COUPLED` },
    ],
    correctValue: 'both together',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KIN2}:MC-AXES-COUPLED`],
    source: `${KIN2_SRC} — MC-AXES-COUPLED independence, drop-vs-fire demo as the probe`,
  },
]


// ─── phys.mech.work ──────────────────────────────────────────────────────────
const WORK = 'phys.mech.work'
const WORK_SRC = 'docs/curriculum/blueprints/phys.mech.work.md'

const WORK_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WORK,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: work = energy moved in the direction of travel; cosθ as "useful fraction"
    content:
      'In physics, "work" has nothing to do with effort or tiredness — it ' +
      'measures ENERGY TRANSFERRED to an object along its direction of ' +
      'motion. Push a trolley forward as it rolls forward: energy flows ' +
      'in — positive work. Hold a heavy suitcase perfectly still for ten ' +
      'exhausting minutes: your arms ache, but zero energy moved into the ' +
      "suitcase's motion, so the physics-work is ZERO. And when a force " +
      'pulls at an angle, only the slice of it pointing along the motion ' +
      'counts: pulling a sledge with a rope angled upward, part of your ' +
      'pull tries to lift the sledge — useless for forward travel. The ' +
      'formula W = Fd·cosθ does the slicing automatically: cosθ is the ' +
      '"useful fraction" of the force — 1 when perfectly aligned, 0 when ' +
      'perpendicular (a sideways force moves nothing forward).',
    targetedMisconceptions: [`${WORK}:MC-FULL-FORCE`],
    source: `${WORK_SRC} — §5 Protocol Library opening + §6 MC-FULL-FORCE (sledge conflict evidence P28, cosθ-as-useful-fraction bridge)`,
  },
  {
    conceptId: WORK,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: negative work is real and means energy removal
    content:
      'Can work be negative? It must be — otherwise brakes couldn\'t ' +
      'work. Slide a box across a floor: friction points BACKWARD, at ' +
      '180° to the motion, so W = Fd·cos180° = −Fd. That minus sign is ' +
      'physics, not bookkeeping: negative work means the force is TAKING ' +
      'energy OUT of the object\'s motion. If friction\'s work were ' +
      'positive it would be feeding energy in — the box would speed up as ' +
      'it slid, which nothing in the universe does. Same for gravity ' +
      'while a ball rises: gravity points down, motion is up, W < 0, and ' +
      'the ball duly slows. The angle tells the story every time: force ' +
      'helping the motion (θ < 90°) → positive work, energy in; force ' +
      'fighting the motion (θ > 90°) → negative work, energy out; force ' +
      'sideways (θ = 90°) → no work at all.',
    targetedMisconceptions: [`${WORK}:MC-WORK-ALWAYS-POSITIVE`],
    source: `${WORK_SRC} — §6 MC-WORK-ALWAYS-POSITIVE (friction conflict evidence P28 + angle-regimes replacement P31)`,
  },
]

const WORK_PROBES: SeedProbe[] = [
  {
    conceptId: WORK,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A box slides 5 m to the right while friction acts on it. The work done by friction is…',
    choices: [
      { text: 'Negative — friction opposes the motion and removes energy', isCorrect: true },
      { text: 'Positive — friction is a real force doing real work', isCorrect: false, misconceptionId: `${WORK}:MC-WORK-ALWAYS-POSITIVE` },
      { text: 'Zero — friction only acts on the surface', isCorrect: false },
    ],
    correctValue: 'negative',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${WORK}:MC-WORK-ALWAYS-POSITIVE`],
    source: `${WORK_SRC} — §7 P74 classify item, distractor-mapped`,
  },
  {
    conceptId: WORK,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'You pull a sledge 12 m with a 50 N rope at 25° above the horizontal. What work do you do on the sledge?',
    choices: [
      { text: 'About 544 J — only the component along the motion counts: 50·cos25°·12', isCorrect: true },
      { text: '600 J — force times distance: 50 × 12', isCorrect: false, misconceptionId: `${WORK}:MC-FULL-FORCE` },
    ],
    correctValue: '≈544 J',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${WORK}:MC-FULL-FORCE`],
    source: `${WORK_SRC} — §6 MC-FULL-FORCE conflict scenario verbatim numbers, distractor-mapped`,
  },
]

// ─── phys.mech.kinetic-energy ────────────────────────────────────────────────
const KE = 'phys.mech.kinetic-energy'
const KE_SRC = 'docs/curriculum/blueprints/phys.mech.kinetic-energy.md'

const KE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: the square is the whole story — braking distances
    content:
      'Kinetic energy is the energy of being in motion — KE = ½mv² — and ' +
      'the entire personality of that formula lives in the little ². ' +
      'Because speed is SQUARED, doubling your speed doesn\'t double the ' +
      'energy: it quadruples it. Triple the speed, nine times the energy. ' +
      'This is why motorway speeds are so unforgiving: a car at 100 km/h ' +
      'carries FOUR times the kinetic energy of the same car at 50 km/h, ' +
      'and the brakes — which drain energy at a roughly fixed rate per ' +
      'metre — need four times the distance to empty the tank. Your ' +
      'intuition, trained on "a bit faster = a bit more", systematically ' +
      'underestimates fast objects. Trust the square, not the gut.',
    targetedMisconceptions: [`${KE}:MC-KE-LINEAR`],
    source: `${KE_SRC} — Component 3 MC-KE-LINEAR (2 J vs 8 J conflict evidence P28 + braking-distance bridge P30)`,
  },
  {
    conceptId: KE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // First-principles: why ½mv², and why KE can't be negative
    content:
      'Where does ½mv² come from? From work. Accelerate a mass m from ' +
      'rest with constant force F over distance d: the work done is Fd = ' +
      '(ma)d, and kinematics gives v² = 2ad, so ad = v²/2 — substitute ' +
      'and the energy delivered is exactly ½mv². Kinetic energy is just ' +
      'the accumulated work it took to get the object moving, stored in ' +
      'the motion itself. Two properties fall out immediately. KE can ' +
      'never be negative: m is positive and v² is a square — a leftward ' +
      'velocity of −5 m/s gives the same ½m(25) as a rightward +5; energy ' +
      'of motion has magnitude but no direction (unlike momentum, which ' +
      'keeps the sign). And KE is frame-dependent but always ≥ 0 in every ' +
      'frame: the minimum, zero, means simply "not moving in this frame."',
    targetedMisconceptions: [`${KE}:MC-KE-NEGATIVE`],
    source: `${KE_SRC} — Component 1 Concept Spine (work-energy derivation) + Component 3 MC-KE-NEGATIVE (v² kills the sign)`,
  },
]

const KE_PROBES: SeedProbe[] = [
  {
    conceptId: KE,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A cyclist doubles her speed from 4 m/s to 8 m/s. Her kinetic energy…',
    choices: [
      { text: 'quadruples — speed is squared in ½mv²', isCorrect: true },
      { text: 'doubles — twice the speed, twice the energy', isCorrect: false, misconceptionId: `${KE}:MC-KE-LINEAR` },
      { text: 'increases by half', isCorrect: false },
    ],
    correctValue: 'quadruples',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${KE}:MC-KE-LINEAR`],
    source: `${KE_SRC} — Component 3 MC-KE-LINEAR trigger, fresh numbers, distractor-mapped`,
  },
]

// ─── phys.mech.potential-energy ──────────────────────────────────────────────
const PE = 'phys.mech.potential-energy'
const PE_SRC = 'docs/curriculum/blueprints/phys.mech.potential-energy.md'

const PE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: stored by position; the zero is YOUR choice, only Δ matters
    content:
      'Gravitational potential energy is energy stored by POSITION: lift ' +
      'a book and you bank energy (GPE = mgh) that gravity will pay back ' +
      'the moment you let go. Now the part that confuses everyone: h ' +
      'measured from WHERE? Here\'s the secret — you choose. Measure a ' +
      '1 kg book from the floor (1 m below it): GPE = 10 J. Your friend ' +
      'measures from the tabletop it\'s sitting on: GPE = 0 J. You\'re ' +
      'BOTH right, because GPE is like altitude on a hiking map: sea ' +
      'level is a convention, and only CHANGES in height decide how hard ' +
      'the climb is. Physics only ever cashes in ΔGPE — the change — and ' +
      'that number comes out identical whatever zero level you picked. ' +
      'Choose the reference that makes the problem easiest, say it out ' +
      'loud, and stay consistent.',
    targetedMisconceptions: [`${PE}:MC-GPE-ABSOLUTE`],
    source: `${PE_SRC} — Component 3 MC-GPE-ABSOLUTE (two-students conflict evidence P28 + Celsius/Fahrenheit bridge P30)`,
  },
  {
    conceptId: PE,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: h is VERTICAL height, not path length (ramp vs ladder)
    content:
      'Two movers lift identical 20 kg boxes onto the same 1.5 m platform. ' +
      'One hauls straight up a ladder; the other pushes up a long, gentle ' +
      '6 m ramp. Who stored more energy in their box? Neither — the h in ' +
      'mgh is the VERTICAL height gained, and both boxes rose exactly ' +
      '1.5 m. The ramp\'s 6 m is path length, not height; walking a ' +
      'longer, shallower route changes how the effort FEELS (smaller ' +
      'force, longer distance) but not the energy banked, which depends ' +
      'only on where the box ENDS UP vertically relative to where it ' +
      'started. Gravity is direction-picky in the cleanest way: it only ' +
      'notices up-and-down. Horizontal travel is free as far as GPE is ' +
      'concerned — carry the box a kilometre across a flat floor and its ' +
      'stored energy hasn\'t changed by a joule.',
    targetedMisconceptions: [`${PE}:MC-HEIGHT-VERTICAL-ONLY`],
    source: `${PE_SRC} — Component 3 MC-HEIGHT-VERTICAL-ONLY (ramp-vs-ladder repair rendered as teaching text)`,
  },
]

const PE_PROBES: SeedProbe[] = [
  {
    conceptId: PE,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two students compute the GPE of the same book on the same shelf. One gets 30 J (measuring from the floor), the other 0 J (measuring from the shelf). Who is right?',
    choices: [
      { text: 'Both — GPE depends on the chosen reference level; only changes in GPE are physical', isCorrect: true },
      { text: 'The one using the floor — the ground is the true zero', isCorrect: false, misconceptionId: `${PE}:MC-GPE-ABSOLUTE` },
      { text: 'Neither — the book has one true GPE they both missed', isCorrect: false, misconceptionId: `${PE}:MC-GPE-ABSOLUTE` },
    ],
    correctValue: 'both',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PE}:MC-GPE-ABSOLUTE`],
    source: `${PE_SRC} — Component 3 MC-GPE-ABSOLUTE conflict scenario as the probe, distractor-mapped`,
  },
]


// ─── phys.mech.conservation-of-energy ────────────────────────────────────────
const COE = 'phys.mech.conservation-of-energy'
const COE_SRC = 'docs/curriculum/blueprints/phys.mech.conservation-of-energy.md'

const COE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: energy accounting; friction doesn't destroy, it converts
    content:
      'Conservation of energy is an accounting law: energy is never ' +
      'created or destroyed, only moved between accounts. For a sliding ' +
      'or falling object the two big accounts are motion (KE) and height ' +
      '(PE), and on a frictionless ramp the books are simple: every joule ' +
      'leaving the height account arrives in the motion account, so ' +
      'KE + PE stays constant. Add friction and students often think the ' +
      'law breaks — it doesn\'t. Friction is a third account: HEAT. The ' +
      'joules that go missing from KE + PE show up, to the last one, as ' +
      'warmth in the surfaces (touch a bike brake after a long descent). ' +
      'So the honest ledger reads KE_i + PE_i = KE_f + PE_f + heat ' +
      'dissipated. Total energy: always conserved. MECHANICAL energy ' +
      '(KE + PE alone): conserved only when nothing like friction is ' +
      'skimming into the heat account.',
    targetedMisconceptions: [`${COE}:MC-FRICTION-CONSERVES`],
    source: `${COE_SRC} — MC-FRICTION-CONSERVES (mechanical-vs-total ledger, heat as the third account, brake-heat anchor)`,
  },
  {
    conceptId: COE,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: path independence for gravity
    content:
      'Ball A slides down a steep, short frictionless ramp; Ball B slides ' +
      'down a long, gentle frictionless slope. Both start from rest at ' +
      '4 m. Which is faster at the bottom? The pull to say "A — steeper!" ' +
      'is strong, but energy accounting doesn\'t read maps: gravity banks ' +
      'energy by HEIGHT alone, mgh, and both balls cashed in exactly the ' +
      'same 4 m of height. Equal deposits, equal withdrawals: identical ' +
      'final speeds (√(2gh) ≈ 8.9 m/s). The steep ramp gets there SOONER ' +
      '— bigger acceleration, shorter trip — but arrival speed is fixed ' +
      'by the height drop, not the route. This is what makes gravity a ' +
      '"conservative" force: only start and end positions matter. The ' +
      'exception proves the rule: add friction and path suddenly DOES ' +
      'matter, because a longer path gives friction more metres to skim ' +
      'heat from the ledger.',
    targetedMisconceptions: [`${COE}:MC-PATH-MATTERS`],
    source: `${COE_SRC} — MC-PATH-MATTERS (steep-vs-gentle ramp conflict evidence, conservative-force boundary incl. the friction exception)`,
  },
]

const COE_PROBES: SeedProbe[] = [
  {
    conceptId: COE,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A block slides down a ramp WITH friction. Comparing the bottom to the top, which is true?',
    choices: [
      { text: 'Total energy is conserved, but mechanical energy (KE+PE) decreased — the difference became heat', isCorrect: true },
      { text: 'KE + PE at the bottom equals KE + PE at the top — conservation always holds for KE+PE', isCorrect: false, misconceptionId: `${COE}:MC-FRICTION-CONSERVES` },
      { text: 'Energy was destroyed by friction', isCorrect: false },
    ],
    correctValue: 'total conserved; mechanical decreased into heat',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COE}:MC-FRICTION-CONSERVES`],
    source: `${COE_SRC} — MC-FRICTION-CONSERVES, distractor-mapped`,
  },
  {
    conceptId: COE,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Two frictionless slides start at the same height: one steep and short, one long and gentle. How do the exit speeds compare?',
    choices: [
      { text: 'Equal — gravity pays out by height drop alone; the path does not matter', isCorrect: true },
      { text: 'The steep slide gives a higher exit speed', isCorrect: false, misconceptionId: `${COE}:MC-PATH-MATTERS` },
    ],
    correctValue: 'equal',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COE}:MC-PATH-MATTERS`],
    source: `${COE_SRC} — MC-PATH-MATTERS conflict scenario as the probe`,
  },
]

// ─── phys.mech.conservation-of-momentum ──────────────────────────────────────
const COM = 'phys.mech.conservation-of-momentum'
const COM_SRC = 'docs/curriculum/blueprints/phys.mech.conservation-of-momentum.md'

const COM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: momentum transfers, never vanishes — check the TOTAL
    content:
      'In any collision, momentum behaves like money changing hands: it ' +
      'moves between the objects but the TOTAL never changes. Car A ' +
      '(1000 kg at 15 m/s) rams stationary Car B (2000 kg) and they ' +
      'lock together. A slowed down dramatically — did its momentum ' +
      '"get lost in the crash"? Follow the books: before, the total was ' +
      '1000 × 15 = 15,000 kg·m/s. After, the 3000 kg wreck moves at ' +
      '15,000 / 3000 = 5 m/s — total still exactly 15,000. Everything A ' +
      'lost, B gained, joule-for-joule... no — momentum-for-momentum: ' +
      'this works even in crashes where kinetic ENERGY really is lost to ' +
      'heat and crumpling. The habit to build: never audit one object; ' +
      'always sum the whole system before and after, with directions. ' +
      'The single-object ledger lies; the total never does.',
    targetedMisconceptions: [`${COM}:MC-MOMENTUM-LOST`],
    source: `${COM_SRC} — MC-MOMENTUM-LOST (sticking-cars conflict evidence P28, transferred-not-lost bridge)`,
  },
  {
    conceptId: COM,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: the no-external-force fine print (ball vs wall)
    content:
      'Conservation of momentum has fine print, and here\'s the case that ' +
      'reads it aloud: a 3 kg ball flies east at 10 m/s, hits a wall, and ' +
      'bounces back west at 10 m/s. Before: +30 kg·m/s. After: −30. The ' +
      'total flipped by 60 — momentum was NOT conserved for the ball. ' +
      'Broken law? No: the law only applies to systems with NO net ' +
      'EXTERNAL force, and the wall — bolted to the building, bolted to ' +
      'the Earth — is outside the "ball system", hammering it with an ' +
      'external impulse. Widen the ledger to ball + wall + Earth and ' +
      'conservation returns (the planet absorbed that 60, its unmeasurably ' +
      'tiny recoil hidden by its enormous mass). Practical rule: before ' +
      'invoking conservation, draw the system boundary and ask "is ' +
      'anything OUTSIDE it pushing in?" Colliding ice pucks: no — ' +
      'conserve away. Ball vs wall, ball in mid-fall under gravity: yes — ' +
      'the shortcut is off the table, or the system must grow.',
    targetedMisconceptions: [`${COM}:MC-INTERNAL-EXTERNAL`],
    source: `${COM_SRC} — MC-INTERNAL-EXTERNAL (ball-vs-wall conflict evidence P28 + system-boundary rule)`,
  },
]

const COM_PROBES: SeedProbe[] = [
  {
    conceptId: COM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 2 kg cart moving east at 6 m/s hits and sticks to a 4 kg cart at rest (frictionless track). What is the final speed of the pair?',
    choices: [
      { text: '2 m/s — total momentum 12 kg·m/s shared by 6 kg', isCorrect: true },
      { text: '6 m/s — the moving cart keeps its speed', isCorrect: false },
      { text: '3 m/s — the average of 6 and 0', isCorrect: false, misconceptionId: `${COM}:MC-MOMENTUM-LOST` },
    ],
    correctValue: '2 m/s',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COM}:MC-MOMENTUM-LOST`],
    source: `${COM_SRC} — mastery-bank sticking-carts item, distractor-mapped`,
  },
]

// ─── phys.mech.work-energy-theorem ───────────────────────────────────────────
const WET = 'phys.mech.work-energy-theorem'
const WET_SRC = 'docs/curriculum/blueprints/phys.mech.work-energy-theorem.md'

const WET_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WET,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    // Intuitive: W_net = ΔKE, every force gets a vote
    content:
      'The work-energy theorem is the bridge between forces and motion ' +
      'energy: the NET work done on an object equals its change in ' +
      'kinetic energy, W_net = ΔKE. The word to respect is NET: every ' +
      'force acting gets a vote, not just the one you\'re pushing with. ' +
      'A 5 kg box pushed with 30 N against 10 N of friction over 4 m: ' +
      'your push contributes +120 J, friction votes −40 J, so the box\'s ' +
      'KE grows by only the net +80 J. Skip friction\'s vote and you\'ll ' +
      'predict speeds the box never reaches. The theorem is really the ' +
      'energy version of Newton\'s second law — and its power is that it ' +
      'skips the play-by-play: no acceleration, no time needed. Total up ' +
      'the work, and the speed change falls out.',
    targetedMisconceptions: [`${WET}:MC-PARTIAL-WORK`],
    source: `${WET_SRC} — MC-PARTIAL-WORK (30 N / 10 N / 4 m conflict scenario, every-force-votes framing)`,
  },
  {
    conceptId: WET,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    // Repair: W_net = 0 means KE unchanged, not zero
    content:
      'A box slides at a steady 5 m/s while you push with 8 N against ' +
      'exactly 8 N of friction. Net force zero, so net work zero — does ' +
      'the theorem say the box must be at rest? Read the equation ' +
      'carefully: W_net = ΔKE — the CHANGE in kinetic energy. Zero net ' +
      'work means KE didn\'t CHANGE, not that KE is zero: the box keeps ' +
      'every joule it already had and cruises on at 5 m/s. (That\'s the ' +
      "First Law wearing energy clothing: balanced forces, unchanged " +
      'motion.) The confusion is reading Δ as a value instead of a ' +
      'difference. KE_final = KE_initial + W_net — zero net work just ' +
      'freezes the account balance; only NEGATIVE net work drains it ' +
      'toward rest.',
    targetedMisconceptions: [`${WET}:MC-WET-ZERO-SPEED`],
    source: `${WET_SRC} — MC-WET-ZERO-SPEED (balanced 8 N cruise conflict evidence, Δ-is-a-difference repair)`,
  },
]

const WET_PROBES: SeedProbe[] = [
  {
    conceptId: WET,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A moving box experiences zero NET work over some displacement. What do we know about the box at the end?',
    choices: [
      { text: 'Its speed is unchanged — ΔKE = 0 means the KE it had is the KE it keeps', isCorrect: true },
      { text: 'It is at rest — zero work means zero kinetic energy', isCorrect: false, misconceptionId: `${WET}:MC-WET-ZERO-SPEED` },
      { text: 'No forces acted on it at all', isCorrect: false },
    ],
    correctValue: 'speed unchanged',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${WET}:MC-WET-ZERO-SPEED`],
    source: `${WET_SRC} — MC-WET-ZERO-SPEED, distractor-mapped`,
  },
  {
    conceptId: WET,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A 4 kg box starts at rest. Applied force 20 N, friction 8 N, displacement 5 m. What is the change in its kinetic energy?',
    choices: [
      { text: '+60 J — net work: (20 − 8) × 5', isCorrect: true },
      { text: '+100 J — the applied force did 20 × 5', isCorrect: false, misconceptionId: `${WET}:MC-PARTIAL-WORK` },
    ],
    correctValue: '+60 J',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${WET}:MC-PARTIAL-WORK`],
    source: `${WET_SRC} — mastery-bank item (20 N / 8 N / 5 m), distractor-mapped`,
  },
]

// ─── math.alg.linear-equation-1var ───────────────────────────────────────────
const LE1 = 'math.alg.linear-equation-1var'
const LE1_SRC = 'docs/curriculum/blueprints/math.alg.linear-equation-1var.md'

const LE1_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LE1,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A linear equation like 3x + 5 = 20 is a balance scale that is ' +
      'currently level: whatever is on the left weighs exactly the same ' +
      'as whatever is on the right. Solving means finding what x must ' +
      'weigh — and the ONE rule is that anything you do to one pan, you ' +
      'must do identically to the other, or the scale tips and the ' +
      'equation stops being true. Take 5 off the left? Take 5 off the ' +
      'right too: 3x = 15. Split the left pan into 3 equal parts? Split ' +
      'the right the same way: x = 5. Check by putting 5 back in the ' +
      'original: 3(5) + 5 = 20. It balances — that substitution check is ' +
      'how YOU know the answer is right without asking anyone.',
    targetedMisconceptions: [`${LE1}:MC-1`],
    source: `${LE1_SRC} — Component 1 threshold concept (balance invariant) + WE-1; guards MC-1 BALANCE-NOT-MAINTAINED`,
  },
  {
    conceptId: LE1,
    subjectSlug: 'mathematics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Solve 3x + 5 = 20 step by step. Goal: get x alone. Step 1 — the ' +
      '+5 is in the way, so undo it with its inverse: subtract 5 from ' +
      'BOTH sides. Left: 3x + 5 − 5 = 3x. Right: 20 − 5 = 15. Now ' +
      '3x = 15. Step 2 — x is multiplied by 3, so undo with the inverse: ' +
      'divide BOTH sides by 3. x = 5. Notice the order: constant first, ' +
      'coefficient second. If you divide by 3 first you get ' +
      'x + 5/3 = 20/3 — still true, but now everything is fractions. ' +
      'Subtracting the constant first keeps the arithmetic clean. ' +
      'Step 3 — verify: 3(5) + 5 = 15 + 5 = 20. ✓',
    targetedMisconceptions: [`${LE1}:MC-2`],
    source: `${LE1_SRC} — WE-1 (P07 worked example progression); repairs MC-2 WRONG-OPERATION-ORDER via the fractional-intermediate contrast`,
  },
  {
    conceptId: LE1,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Try this: from 3x + 5 = 20, a student "moves the 5 over" and ' +
      'writes 3x = 20 + 5 = 25, so x = 25/3. Check it: 3(25/3) + 5 = ' +
      '25 + 5 = 30 — not 20. The scale tipped. Here is the trap: there ' +
      'is no "moving" in algebra. What LOOKS like a term hopping across ' +
      'the equals sign is really the same operation applied to both ' +
      'sides: subtracting 5 from both sides makes the +5 vanish on the ' +
      'left and turns 20 into 20 − 5 on the right. The sign "changes" ' +
      'only because the term arrives on the other side already ' +
      'subtracted. If you always write the both-sides step instead of ' +
      'teleporting terms, this error becomes impossible.',
    targetedMisconceptions: [`${LE1}:MC-3`, `${LE1}:MC-1`],
    source: `${LE1_SRC} — MC-3 SIGN-ERROR-TRANSPOSING (root cause: moving-as-relocation; repair via substitution conflict evidence + both-sides reframe)`,
  },
]

const LE1_PROBES: SeedProbe[] = [
  {
    conceptId: LE1,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Solve: 4x + 7 = 31. What is x?',
    choices: [
      { text: 'x = 6 — subtract 7 from both sides (4x = 24), then divide by 4', isCorrect: true },
      { text: 'x = 9.5 — move the 7 over: 4x = 31 + 7 = 38', isCorrect: false, misconceptionId: `${LE1}:MC-3` },
      { text: 'x = 24 — subtract 7 from the left side only', isCorrect: false, misconceptionId: `${LE1}:MC-1` },
    ],
    correctValue: 'x = 6',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LE1}:MC-1`, `${LE1}:MC-3`],
    source: `${LE1_SRC} — two-step ladder rung 4, distractors mapped to MC-1/MC-3`,
  },
  {
    conceptId: LE1,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A student solving 5x − 3 = 12 writes "5x = 12 − 3 = 9" as their first step. What went wrong?',
    choices: [
      { text: 'The −3 must be undone by ADDING 3 to both sides: 5x = 15', isCorrect: true },
      { text: 'Nothing — terms change sign when they cross the equals sign, so −3 becomes part of the right side', isCorrect: false, misconceptionId: `${LE1}:MC-3` },
    ],
    correctValue: '5x = 15',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LE1}:MC-3`],
    source: `${LE1_SRC} — MC-3 error-analysis probe (subtraction-side variant)`,
  },
]

// ─── math.found.natural-numbers ──────────────────────────────────────────────
const NAT = 'math.found.natural-numbers'
const NAT_SRC = 'docs/curriculum/blueprints/math.found.natural-numbers.md'

const NAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NAT,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The natural numbers are the counting numbers — but "does ℕ ' +
      'include 0?" has no universal answer, and that is a feature to ' +
      'learn, not a bug. Two live conventions coexist: many school ' +
      'curricula define ℕ = {1, 2, 3, …}, while ISO 80000-2 and most ' +
      'set theory and computer science define ℕ = {0, 1, 2, …} (0 is ' +
      'the natural size of the empty collection). Neither is "the" ' +
      'truth; a proof or textbook simply declares its convention up ' +
      'front, and careful writers use ℕ⁺ or ℤ⁺ when they mean strictly ' +
      'positive. The mature habit: before using ℕ in any argument, ' +
      'check which convention the source fixed — several classic ' +
      '"errors" are really two texts using different ℕ.',
    targetedMisconceptions: [`${NAT}:MC-1`],
    source: `${NAT_SRC} — MC-1 ZERO-MEMBERSHIP (NCERT vs ISO 80000-2 convention conflict rendered as convention-awareness teaching)`,
  },
  {
    conceptId: NAT,
    subjectSlug: 'mathematics',
    familyKind: 'faq',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Why bother with Peano axioms when everyone can count? Because ' +
      'informal counting leaves the structure unspecified in ways that ' +
      'matter. Try to define "the counting numbers" without axioms and ' +
      'nothing you say rules out a number line that loops back on ' +
      'itself, or has two separate chains. Peano nails it down: there ' +
      'is a first element; every element has a unique successor; the ' +
      'successor is never the first element (no loops); distinct ' +
      'elements have distinct successors (no merging); and — the ' +
      'payoff axiom — any property that holds for the first element ' +
      'and is preserved by succession holds for ALL of them. That last ' +
      'one, induction, is not decoration: it is the license behind ' +
      'every proof-by-induction you will ever write. Counting tells ' +
      'you what ℕ feels like; the axioms tell you what you may PROVE ' +
      'about it.',
    targetedMisconceptions: [`${NAT}:MC-2`],
    source: `${NAT_SRC} — MC-2 PEANO-INFORMAL (repair: what informal counting fails to rule out — cycles/merging — and P5 induction as the payoff)`,
  },
  {
    conceptId: NAT,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"Well-ordered" trips people up: it sounds like it should mean ' +
      '"neatly finite." It actually means every NON-EMPTY SUBSET has a ' +
      'least element — it says nothing about a greatest one. ℕ is ' +
      'well-ordered AND infinite: pick any subset (the even numbers, ' +
      'the primes, numbers above a trillion) and it has a smallest ' +
      'member, yet the whole set marches on forever. Contrast ℤ: the ' +
      'set of ALL integers has no smallest element (…−3, −2, −1 keeps ' +
      'descending), so ℤ is NOT well-ordered — having a floor at one ' +
      'end is a special property of ℕ, and it is exactly what makes ' +
      '"take the least counterexample" proofs work there.',
    targetedMisconceptions: [`${NAT}:MC-3`],
    source: `${NAT_SRC} — MC-3 WELL-ORDER-FINITE (min-of-every-subset vs finite conflation; ℤ contrast as discrimination evidence)`,
  },
]

const NAT_PROBES: SeedProbe[] = [
  {
    conceptId: NAT,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is 0 a natural number?',
    choices: [
      { text: 'It depends on the convention in use: ISO/set theory include 0; many school curricula start at 1 — a careful text declares which', isCorrect: true },
      { text: 'No — natural numbers always start at 1, in every text', isCorrect: false, misconceptionId: `${NAT}:MC-1` },
      { text: 'Yes — every modern definition includes 0', isCorrect: false, misconceptionId: `${NAT}:MC-1` },
    ],
    correctValue: 'convention-dependent',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NAT}:MC-1`],
    source: `${NAT_SRC} — MC-1 probe; both absolutist answers are distractors`,
  },
  {
    conceptId: NAT,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'ℕ is well-ordered: every non-empty subset has a least element. Does that mean ℕ is finite?',
    choices: [
      { text: 'No — well-ordering guarantees a minimum for each subset, not a maximum for the set; ℕ is well-ordered and infinite', isCorrect: true },
      { text: 'Yes — a set with a smallest element must end somewhere', isCorrect: false, misconceptionId: `${NAT}:MC-3` },
    ],
    correctValue: 'no — well-ordered and infinite',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NAT}:MC-3`],
    source: `${NAT_SRC} — MC-3 probe, distractor-mapped`,
  },
]

// ─── math.found.integers ─────────────────────────────────────────────────────
const INT = 'math.found.integers'
const INT_SRC = 'docs/curriculum/blueprints/math.found.integers.md'

const INT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INT,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '−3 is not an instruction to take something away — it is a ' +
      'NUMBER, as real a citizen of ℤ as 3 is. The cleanest way to see ' +
      'it: −3 is defined as THE number that, added to 3, gives 0. A ' +
      'debt of $3 is not "a subtraction waiting to happen"; it is a ' +
      'balance you can hold, compare, and add: owing 3 and owning 3 ' +
      'cancels to exactly nothing, (−3) + 3 = 0. Once negatives are ' +
      'first-class elements, ℤ = {…, −2, −1, 0, 1, 2, …} becomes one ' +
      'unified line where every element has an additive opposite — ' +
      'which is precisely the property ℕ lacked and the reason ℤ was ' +
      'built: in ℤ, every subtraction problem finally has an answer.',
    targetedMisconceptions: [`${INT}:MC-1`],
    source: `${INT_SRC} — MC-1 NEGATIVE-AS-SUBTRACTION (element-not-operation repair; (−n)+n=0 as the defining property)`,
  },
  {
    conceptId: INT,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"ℤ is just ℕ with negatives bolted on, same rules" — tempting, ' +
      'and wrong in both directions. ℤ GAINS a property ℕ lacks: ' +
      'closure under subtraction (5 − 9 = −4 stays inside ℤ). But ℤ ' +
      'also LOSES one: well-ordering — ℤ itself has no least element, ' +
      'so least-counterexample arguments that work in ℕ fail in ℤ. And ' +
      'one thing NEITHER set has: closure under division — 1 ÷ 3 lands ' +
      'outside both, which is exactly the gap the rationals will fill. ' +
      'Extending a number system is always a trade, never a pure ' +
      'upgrade: audit which properties survive the extension instead ' +
      'of assuming they all do.',
    targetedMisconceptions: [`${INT}:MC-2`],
    source: `${INT_SRC} — MC-2 RING-CONFUSION (property audit: gains subtraction-closure, loses well-ordering, never had division-closure)`,
  },
  {
    conceptId: INT,
    subjectSlug: 'mathematics',
    familyKind: 'faq',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Quick check: is every integer either positive or negative? No — ' +
      'and the exception is the most important element in the set. 0 ' +
      'is neither positive nor negative, yet it is fully an integer: ' +
      'it is the additive identity, the fixed point the whole line is ' +
      'built around (n + 0 = n, and each pair n, −n cancels TO 0). ' +
      'Thinking of ℤ as "positives ∪ negatives" silently deletes 0 and ' +
      'breaks arguments that quantify over all integers — "every ' +
      'integer has a sign" is false at exactly one point. Say instead: ' +
      'ℤ = negatives ∪ {0} ∪ positives, three parts, with 0 doing the ' +
      'load-bearing work.',
    targetedMisconceptions: [`${INT}:MC-3`],
    source: `${INT_SRC} — MC-3 ZERO-ASYMMETRY (0 as additive identity, not a missing category)`,
  },
]

const INT_PROBES: SeedProbe[] = [
  {
    conceptId: INT,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Which operation is ℤ NOT closed under?',
    choices: [
      { text: 'Division — 1 ÷ 3 is not an integer', isCorrect: true },
      { text: 'Subtraction — 5 − 9 leaves the integers', isCorrect: false, misconceptionId: `${INT}:MC-1` },
      { text: 'None — ℤ is closed under all four operations', isCorrect: false, misconceptionId: `${INT}:MC-2` },
    ],
    correctValue: 'division',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${INT}:MC-1`, `${INT}:MC-2`],
    source: `${INT_SRC} — MC-2 closure probe, distractor-mapped`,
  },
  {
    conceptId: INT,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'True or false: every integer is either positive or negative.',
    choices: [
      { text: 'False — 0 is an integer and is neither; it is the additive identity', isCorrect: true },
      { text: 'True — the integers are the positive and negative whole numbers', isCorrect: false, misconceptionId: `${INT}:MC-3` },
    ],
    correctValue: 'false — 0 is neither',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INT}:MC-3`],
    source: `${INT_SRC} — MC-3 probe, distractor-mapped`,
  },
]


// ─── phys.em.electric-charge ─────────────────────────────────────────────────
const CHG = 'phys.em.electric-charge'
const CHG_SRC = 'docs/curriculum/blueprints/phys.em.electric-charge.md'

const CHG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHG,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Electric charge obeys strict bookkeeping: every electron that ' +
      'appears somewhere came from somewhere. Rub a rubber rod with fur ' +
      'and the rod ends up at −40e while the fur reads +40e — add them ' +
      'and you get exactly zero, the same total as before you started. ' +
      'Rubbing did not CREATE charge; it moved loosely bound electrons ' +
      'from the fur onto the rod. One object is negative because it ' +
      'gained electrons, the other positive because it lost the very ' +
      'same electrons. That is conservation of charge, and it is ' +
      'absolute: no physical process — friction, chemistry, even ' +
      'nuclear reactions — changes the net charge of an isolated ' +
      'system. Charging is always redistribution, never creation.',
    targetedMisconceptions: [`${CHG}:MC-CHARGE-IS-CREATED-BY-RUBBING`],
    source: `${CHG_SRC} — MC-CHARGE-IS-CREATED-BY-RUBBING (P28 rod/fur ledger + P31 replacement as teaching text)`,
  },
  {
    conceptId: CHG,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Here is an honest historical accident: "conventional current" ' +
      'points from + to −, but in a metal wire nothing positive is ' +
      'moving at all. Protons are locked in the crystal lattice; only ' +
      'electrons are free, and they drift OPPOSITE to the conventional ' +
      'arrow. Benjamin Franklin picked the sign convention a century ' +
      'before anyone discovered the electron — he guessed, and the ' +
      'guess stuck. The convention still works perfectly for circuit ' +
      'math (the equations are consistent either way), so we keep it. ' +
      'Just hold both facts at once: the arrows on a circuit diagram ' +
      'are a useful fiction; the physical carriers in metals are ' +
      'electrons going the other way. (In salt solutions both ion ' +
      'signs move; only in semiconductors do "holes" act like real ' +
      'positive carriers.)',
    targetedMisconceptions: [`${CHG}:MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE`],
    source: `${CHG_SRC} — MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE (P28/P30 Franklin-convention bridge, s6 historical framing)`,
  },
]

const CHG_PROBES: SeedProbe[] = [
  {
    conceptId: CHG,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A rubber rod rubbed with fur ends up with charge −40e. What is the charge on the fur?',
    choices: [
      { text: '+40e — the electrons the rod gained came from the fur; total charge is conserved', isCorrect: true },
      { text: '0 — the fur is unchanged; the rubbing created the rod\'s charge', isCorrect: false, misconceptionId: `${CHG}:MC-CHARGE-IS-CREATED-BY-RUBBING` },
      { text: '−40e — both objects become negative from friction', isCorrect: false, misconceptionId: `${CHG}:MC-CHARGE-IS-CREATED-BY-RUBBING` },
    ],
    correctValue: '+40e',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CHG}:MC-CHARGE-IS-CREATED-BY-RUBBING`],
    source: `${CHG_SRC} — P28 conflict-evidence scenario as probe, distractor-mapped`,
  },
  {
    conceptId: CHG,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In a copper wire carrying conventional current to the right, what is physically moving?',
    choices: [
      { text: 'Electrons drifting to the LEFT — conventional current direction is a historical convention', isCorrect: true },
      { text: 'Positive charges (protons) moving to the right, as the current arrow shows', isCorrect: false, misconceptionId: `${CHG}:MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE` },
    ],
    correctValue: 'electrons drifting left',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CHG}:MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE`],
    source: `${CHG_SRC} — MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE probe, distractor-mapped`,
  },
]

// ─── phys.em.coulombs-law ────────────────────────────────────────────────────
const COUL = 'phys.em.coulombs-law'
const COUL_SRC = 'docs/curriculum/blueprints/phys.em.coulombs-law.md'

const COUL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COUL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Coulomb\'s law is a recipe in two separate parts — and mixing ' +
      'them is the classic error. Part 1, the magnitude: ' +
      'F = k|q₁||q₂|/r², computed with ABSOLUTE values, always a ' +
      'positive number (a "negative amount of force" is meaningless). ' +
      'Part 2, the direction: read it from the signs — like charges ' +
      'repel, opposite charges attract. If you plug signed charges ' +
      'into the scalar formula and get F < 0, you haven\'t discovered ' +
      'attraction, you\'ve broken the recipe. Signed charges belong ' +
      'only in the vector form F⃗ = kq₁q₂/r² r̂, where the sign of the ' +
      'product q₁q₂ automatically flips the direction vector — there ' +
      'the sign has a job; in the scalar magnitude it has none.',
    targetedMisconceptions: [`${COUL}:MC-COULOMBS-LAW-USES-SIGNED-CHARGES-FOR-MAGNITUDE`],
    source: `${COUL_SRC} — MC-COULOMBS-LAW-USES-SIGNED-CHARGES-FOR-MAGNITUDE (P30 two-part recipe bridge + P31 replacement)`,
  },
  {
    conceptId: COUL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Quick prediction: double BOTH charges — what happens to the ' +
      'force? If you said "doubles," run the math: ' +
      'F = k(2q₁)(2q₂)/r² = 4·kq₁q₂/r². It QUADRUPLES. The formula ' +
      'multiplies the charges (q₁ × q₂), it doesn\'t add them — so each ' +
      'charge scales the force independently and the factors multiply: ' +
      'doubling one charge doubles F; doubling both is 2 × 2 = 4. Same ' +
      'logic handles any combination: triple one and halve the other ' +
      'and F becomes 3 × 0.5 = 1.5 times as large. Whenever a formula ' +
      'has a product, think "multiply the scale factors," never "add ' +
      'the changes."',
    targetedMisconceptions: [`${COUL}:MC-DOUBLING-BOTH-CHARGES-DOUBLES-FORCE`],
    source: `${COUL_SRC} — MC-DOUBLING-BOTH-CHARGES-DOUBLES-FORCE (P28 algebra conflict + P31 scale-factor rule)`,
  },
]

const COUL_PROBES: SeedProbe[] = [
  {
    conceptId: COUL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two charges attract with force F. Both charges are doubled (distance unchanged). The new force is:',
    choices: [
      { text: '4F — force is proportional to the PRODUCT q₁q₂, so the factors multiply: 2 × 2', isCorrect: true },
      { text: '2F — doubling the charges doubles the force', isCorrect: false, misconceptionId: `${COUL}:MC-DOUBLING-BOTH-CHARGES-DOUBLES-FORCE` },
      { text: 'F — the changes cancel out', isCorrect: false },
    ],
    correctValue: '4F',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${COUL}:MC-DOUBLING-BOTH-CHARGES-DOUBLES-FORCE`],
    source: `${COUL_SRC} — MC-DOUBLING-BOTH-CHARGES-DOUBLES-FORCE probe, distractor-mapped`,
  },
  {
    conceptId: COUL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student computes F = kq₁q₂/r² with q₁ = +2 μC and q₂ = −3 μC and reports "the force magnitude is negative." What is the correct reading?',
    choices: [
      { text: 'Magnitude uses absolute values and is always positive; the opposite signs tell you separately that the force is attractive', isCorrect: true },
      { text: 'The negative result is correct — a negative force means attraction', isCorrect: false, misconceptionId: `${COUL}:MC-COULOMBS-LAW-USES-SIGNED-CHARGES-FOR-MAGNITUDE` },
    ],
    correctValue: 'positive magnitude; direction from signs',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COUL}:MC-COULOMBS-LAW-USES-SIGNED-CHARGES-FOR-MAGNITUDE`],
    source: `${COUL_SRC} — signed-magnitude error-analysis probe, distractor-mapped`,
  },
]

// ─── phys.em.ohms-law ────────────────────────────────────────────────────────
const OHM = 'phys.em.ohms-law'
const OHM_SRC = 'docs/curriculum/blueprints/phys.em.ohms-law.md'

const OHM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OHM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Get the grammar right and half of circuit confusion disappears: ' +
      'current flows THROUGH a component; voltage appears ACROSS it. ' +
      'Current (amps) is a flow rate — how much charge passes per ' +
      'second, like litres per second through a pipe. Voltage (volts) ' +
      'is a pressure difference between two points — energy per unit ' +
      'of charge. They are different kinds of quantity, which is why ' +
      'you measure them differently: an ammeter sits IN the path ' +
      '(series — the flow must pass through it), a voltmeter connects ' +
      'to TWO points (parallel — it compares them). "12 V flows ' +
      'through the resistor" is a category error, like saying "the ' +
      'pressure flows through the pipe." Ohm\'s law V = IR RELATES the ' +
      'two — it does not make them interchangeable.',
    targetedMisconceptions: [`${OHM}:MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE`],
    source: `${OHM_SRC} — MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE (P30 water analogy + s6 through/across language rule)`,
  },
  {
    conceptId: OHM,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Ohm\'s "law" is not a law of nature — it is a good description ' +
      'of certain materials. Test it on a silicon diode: below about ' +
      '0.7 V, almost no current; at 0.7 V, current surges; compute ' +
      'R = V/I along the way and you get 700 Ω, then 100 Ω, then ' +
      '10 Ω — the "resistance" collapses as voltage rises. V = IR with ' +
      'constant R simply fails there. A material is OHMIC when its I-V ' +
      'graph is a straight line through the origin (metals and ' +
      'ordinary resistors at steady temperature); diodes, LEDs, ' +
      'transistors, and thermistors are deliberately NON-ohmic — that ' +
      'is what makes rectifiers and amplifiers possible. So use V = IR ' +
      'confidently on resistors, and check the I-V curve before ' +
      'trusting it on anything else.',
    targetedMisconceptions: [`${OHM}:MC-OHMS-LAW-IS-UNIVERSAL`],
    source: `${OHM_SRC} — MC-OHMS-LAW-IS-UNIVERSAL (P28 diode measurement conflict + s6 I-V graph discrimination)`,
  },
]

const OHM_PROBES: SeedProbe[] = [
  {
    conceptId: OHM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which statement uses current and voltage correctly?',
    choices: [
      { text: '"2 A flows through the resistor, and 12 V appears across it"', isCorrect: true },
      { text: '"12 V flows through the resistor"', isCorrect: false, misconceptionId: `${OHM}:MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE` },
      { text: '"2 A of voltage drops across the resistor"', isCorrect: false, misconceptionId: `${OHM}:MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE` },
    ],
    correctValue: 'through for current, across for voltage',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${OHM}:MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE`],
    source: `${OHM_SRC} — P33 discrimination pairs rendered as probe`,
  },
  {
    conceptId: OHM,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A diode passes 1 mA at 0.7 V and 100 mA at 1.0 V. Does Ohm\'s law (constant R) describe this device?',
    choices: [
      { text: 'No — R = V/I changes from 700 Ω to 10 Ω; the diode is non-ohmic and V = IR with fixed R does not apply', isCorrect: true },
      { text: 'Yes — V = IR is a universal law that applies to every electrical device', isCorrect: false, misconceptionId: `${OHM}:MC-OHMS-LAW-IS-UNIVERSAL` },
    ],
    correctValue: 'non-ohmic',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${OHM}:MC-OHMS-LAW-IS-UNIVERSAL`],
    source: `${OHM_SRC} — P28 conflict-evidence measurement as probe, distractor-mapped`,
  },
]

// ─── phys.wave.shm ───────────────────────────────────────────────────────────
const SHM = 'phys.wave.shm'
const SHM_SRC = 'docs/curriculum/blueprints/phys.wave.shm.md'

const SHM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SHM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Watch a pendulum honestly and you will see the defining feature ' +
      'of simple harmonic motion: it is NEVER moving at constant speed. ' +
      'It creeps at the top of each swing — momentarily at rest at the ' +
      'extremes — and whips through the bottom at maximum speed. The ' +
      'restoring force explains it: F = −kx is biggest at the extremes ' +
      '(hardest pull back, zero speed) and zero at the centre (no pull, ' +
      'top speed). The velocity follows v = ω√(A² − x²): at x = ±A it ' +
      'is exactly zero; at x = 0 it peaks at Aω. So the motion is a ' +
      'perpetual trade — speed for displacement and back — repeated ' +
      'every cycle, sinusoidally, not uniformly.',
    targetedMisconceptions: [`${SHM}:MC-SHM-CONSTANT-VELOCITY`],
    source: `${SHM_SRC} — MC-SHM-CONSTANT-VELOCITY (P28 pendulum observation + P31 v = ω√(A²−x²) endpoints)`,
  },
  {
    conceptId: SHM,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"A bigger swing must take longer" sounds obvious — and is ' +
      'famously false for SHM. Galileo timed a swinging chandelier ' +
      'against his own pulse: wide swings and narrow swings took the ' +
      'SAME time. Look at the period formulas — T = 2π√(m/k) for a ' +
      'spring-mass, T = 2π√(L/g) for a pendulum — amplitude appears in ' +
      'neither. The mechanism: a larger displacement means a ' +
      'proportionally larger restoring force (F = −kx), so the mass ' +
      'covers the longer distance proportionally faster, and the two ' +
      'effects cancel exactly. This isochronous property is why ' +
      'pendulum clocks keep time even as their swing slowly dies down. ' +
      'Amplitude sets how FAR and how FAST the oscillator moves — ' +
      'never how LONG a cycle takes.',
    targetedMisconceptions: [`${SHM}:MC-PERIOD-DEPENDS-ON-AMPLITUDE`],
    source: `${SHM_SRC} — MC-PERIOD-DEPENDS-ON-AMPLITUDE (P28 Galileo chandelier + P30 exact-cancellation bridge + s6 clock framing)`,
  },
]

const SHM_PROBES: SeedProbe[] = [
  {
    conceptId: SHM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A mass on a spring oscillates in SHM with amplitude A. Where is its speed greatest?',
    choices: [
      { text: 'At the equilibrium position x = 0, where v = Aω', isCorrect: true },
      { text: 'At the extremes x = ±A, where the force is largest', isCorrect: false },
      { text: 'Its speed is the same everywhere in the cycle', isCorrect: false, misconceptionId: `${SHM}:MC-SHM-CONSTANT-VELOCITY` },
    ],
    correctValue: 'x = 0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SHM}:MC-SHM-CONSTANT-VELOCITY`],
    source: `${SHM_SRC} — MC-SHM-CONSTANT-VELOCITY probe, distractor-mapped`,
  },
  {
    conceptId: SHM,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'The same spring-mass system is set oscillating first with amplitude 2 cm, then with amplitude 8 cm. How do the periods compare?',
    choices: [
      { text: 'Identical — T = 2π√(m/k) contains no amplitude; SHM is isochronous', isCorrect: true },
      { text: 'The 8 cm oscillation takes longer — a bigger swing takes more time', isCorrect: false, misconceptionId: `${SHM}:MC-PERIOD-DEPENDS-ON-AMPLITUDE` },
    ],
    correctValue: 'same period',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SHM}:MC-PERIOD-DEPENDS-ON-AMPLITUDE`],
    source: `${SHM_SRC} — P33 discrimination pair (2 cm vs 8 cm) as probe`,
  },
]

// ─── phys.wave.wave-properties ───────────────────────────────────────────────
const WAV = 'phys.wave.wave-properties'
const WAV_SRC = 'docs/curriculum/blueprints/phys.wave.wave-properties.md'

const WAV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WAV,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A wave is a travelling PATTERN, not travelling stuff. Watch a ' +
      'duck when a ripple passes: it bobs up and down and stays where ' +
      'it is — the water under it oscillates in place while the ' +
      'disturbance moves on, handing energy from particle to particle. ' +
      'The stadium wave is the perfect model: every person just stands ' +
      'and sits at their own seat, yet the wave sweeps around the ' +
      'whole stadium. That split — pattern moves at v = fλ, particles ' +
      'only oscillate about fixed positions — is the core idea of wave ' +
      'motion: energy is transferred, matter is not. (Even a tsunami ' +
      'crossing the Pacific is a propagating displacement pattern, not ' +
      'a wall of water making the trip.)',
    targetedMisconceptions: [`${WAV}:MC-WAVE-CARRIES-MATTER`],
    source: `${WAV_SRC} — MC-WAVE-CARRIES-MATTER (P28 duck/surfer/tsunami evidence + s6 stadium-wave anchor)`,
  },
  {
    conceptId: WAV,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Does a higher-pitched note travel faster? Test it: middle C ' +
      '(262 Hz) and the C an octave up (524 Hz) both cross the room at ' +
      'the same ~343 m/s — otherwise music heard from the back row ' +
      'would arrive scrambled. Wave speed belongs to the MEDIUM (string ' +
      'tension and density, air temperature, rock rigidity), not to the ' +
      'source. Frequency belongs to the SOURCE — how often it wiggles. ' +
      'The formula v = fλ is not "f drives v"; with v pinned by the ' +
      'medium, it is a trade between f and λ: double the frequency and ' +
      'the wavelength halves, speed unchanged. One sentence to keep: ' +
      'speed is the medium\'s decision, frequency is the source\'s ' +
      'decision, and wavelength is what balances the books.',
    targetedMisconceptions: [`${WAV}:MC-HIGHER-FREQUENCY-FASTER`],
    source: `${WAV_SRC} — MC-HIGHER-FREQUENCY-FASTER (P28 octave/same-speed evidence + s6 medium-vs-source split)`,
  },
]

const WAV_PROBES: SeedProbe[] = [
  {
    conceptId: WAV,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A wave passes a duck floating on a pond. What does the duck do?',
    choices: [
      { text: 'Bobs up and down in place — the wave pattern moves, the water (and duck) oscillate locally', isCorrect: true },
      { text: 'Gets carried along with the wave toward the shore', isCorrect: false, misconceptionId: `${WAV}:MC-WAVE-CARRIES-MATTER` },
      { text: 'Moves backward, against the wave', isCorrect: false },
    ],
    correctValue: 'bobs in place',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${WAV}:MC-WAVE-CARRIES-MATTER`],
    source: `${WAV_SRC} — P28 duck scenario as probe, distractor-mapped`,
  },
  {
    conceptId: WAV,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In the same air, the frequency of a sound is doubled from 200 Hz to 400 Hz. What happens to its speed and wavelength?',
    choices: [
      { text: 'Speed stays 343 m/s (set by the medium); wavelength halves (λ = v/f)', isCorrect: true },
      { text: 'The wave travels twice as fast — higher frequency means higher speed', isCorrect: false, misconceptionId: `${WAV}:MC-HIGHER-FREQUENCY-FASTER` },
    ],
    correctValue: 'same speed, half wavelength',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${WAV}:MC-HIGHER-FREQUENCY-FASTER`],
    source: `${WAV_SRC} — P33 discrimination pair (200 vs 2000 Hz) adapted, distractor-mapped`,
  },
]

// ─── phys.mech.friction ──────────────────────────────────────────────────────
const FRIC = 'phys.mech.friction'
const FRIC_SRC = 'docs/curriculum/blueprints/phys.mech.friction.md'

const FRIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FRIC,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Friction is f = \u03bcN — and the N is where students lose marks. N ' +
      'is the NORMAL force: how hard the two surfaces actually press ' +
      'together, read off the free-body diagram every single time. On ' +
      'flat ground with no vertical push it happens to equal the ' +
      'weight, mg — which is why the shortcut \u201cfriction is \u03bc times ' +
      'weight\u201d ever seems to work. Tilt the surface and the shortcut ' +
      'breaks: on a 30\u00b0 incline the block presses in with only ' +
      'mg cos\u03b8, so friction shrinks as the slope steepens. Push that ' +
      'shortcut to the limit — a block against a near-vertical wall ' +
      'would still \u201chave\u201d huge friction from its full weight, yet it ' +
      'barely touches the wall at all. Weight pulls DOWN; friction ' +
      'cares only about the press INTO the surface.',
    targetedMisconceptions: [`${FRIC}:MC-FRICTION-USES-WEIGHT`],
    source: `${FRIC_SRC} — \u00a76 MC-FRICTION-USES-WEIGHT (P28 near-vertical-wall limit + P30 read-N-off-the-diagram rule)`,
  },
  {
    conceptId: FRIC,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'You push a box with 20 N. It doesn\u2019t move. Maximum static ' +
      'friction \u03bc_sN is 40 N — so is friction 40 N right now? Run the ' +
      'check: 40 N of friction against your 20 N push would leave a ' +
      'net 20 N BACKWARD — the box would accelerate into your hand. It ' +
      'doesn\u2019t. So friction must be exactly 20 N: static friction is a ' +
      'RESPONSIVE force that supplies just enough to prevent sliding ' +
      'and not a newton more. \u03bc_sN is its ceiling, reached only at the ' +
      'instant of slipping. Procedure: compute what force balance ' +
      'requires first; if that is \u2264 \u03bc_sN, that IS the friction; only ' +
      'if the demand exceeds the ceiling does the object slide (and ' +
      'friction drops to kinetic, \u03bc_kN — which is why a stuck crate ' +
      'suddenly feels easier once it starts moving).',
    targetedMisconceptions: [`${FRIC}:MC-STATIC-ALWAYS-MAX`],
    source: `${FRIC_SRC} — \u00a76 MC-STATIC-ALWAYS-MAX (P28 backward-acceleration conflict + P30 responsive-force bridge; P79 \u03bc_s>\u03bc_k tie-in)`,
  },
]

const FRIC_PROBES: SeedProbe[] = [
  {
    conceptId: FRIC,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A box rests on a 30\u00b0 incline. What normal force does the surface exert?',
    choices: [
      { text: 'N = mg cos 30\u00b0 — only the component pressing into the slope', isCorrect: true },
      { text: 'N = mg — the surface always supports the full weight', isCorrect: false, misconceptionId: `${FRIC}:MC-FRICTION-USES-WEIGHT` },
      { text: 'N = mg sin 30\u00b0 — the component along the slope', isCorrect: false },
    ],
    correctValue: 'mg cos 30\u00b0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FRIC}:MC-FRICTION-USES-WEIGHT`],
    source: `${FRIC_SRC} — P74 classify probe (incline normal force), distractor-mapped`,
  },
  {
    conceptId: FRIC,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'You push a stationary box with 20 N. Maximum static friction is 40 N. How large is the friction force right now?',
    choices: [
      { text: '20 N — static friction matches the push, up to its 40 N ceiling', isCorrect: true },
      { text: '40 N — static friction always equals \u03bc_sN', isCorrect: false, misconceptionId: `${FRIC}:MC-STATIC-ALWAYS-MAX` },
    ],
    correctValue: '20 N',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FRIC}:MC-STATIC-ALWAYS-MAX`],
    source: `${FRIC_SRC} — P33 discrimination pair (20 N push / 40 N max) as probe`,
  },
]

// ─── phys.mech.circular-motion ───────────────────────────────────────────────
const CIRC = 'phys.mech.circular-motion'
const CIRC_SRC = 'docs/curriculum/blueprints/phys.mech.circular-motion.md'

const CIRC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CIRC,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Drive around a roundabout at a perfectly steady 30 km/h. Your ' +
      'speedometer never moves — yet you are accelerating the entire ' +
      'time. How? Acceleration is the rate of change of VELOCITY, and ' +
      'velocity is a vector: magnitude AND direction. On the circle ' +
      'your direction changes every instant, so your velocity changes ' +
      'every instant, so there must be an acceleration — pointed ' +
      'toward the centre, magnitude v\u00b2/r. You can feel its cause: the ' +
      'seat and door pushing you sideways, the net inward force ' +
      'F = mv\u00b2/r that keeps bending your path. Constant speed does ' +
      'NOT mean constant velocity — that one distinction unlocks all ' +
      'of circular motion.',
    targetedMisconceptions: [`${CIRC}:MC-CONSTANT-SPEED-NO-ACCELERATION`],
    source: `${CIRC_SRC} — MC-CONSTANT-SPEED-NO-ACCELERATION (P30 roundabout bridge + P28 vector-velocity evidence)`,
  },
  {
    conceptId: CIRC,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Swing a ball on a string and cut the string: which way does the ' +
      'ball fly? If a \u201ccentrifugal force\u201d were really pushing it ' +
      'outward, it would shoot radially away from the centre. It ' +
      'doesn\u2019t — it flies off along the TANGENT, continuing the ' +
      'straight line it was on when released. That outward \u201cpush\u201d you ' +
      'feel in a turning car is your inertia trying to go straight ' +
      'while the car turns under you; it is the door pushing you IN, ' +
      'not a force pushing you OUT. Rule for free-body diagrams in an ' +
      'inertial frame: draw only real forces — tension, weight, ' +
      'normal, friction — and their net inward component supplies the ' +
      'centripetal mv\u00b2/r. Never draw a centrifugal arrow: if it ' +
      'existed, it would cancel the tension and the ball would move in ' +
      'a straight line, not a circle.',
    targetedMisconceptions: [`${CIRC}:MC-CENTRIFUGAL-REAL`],
    source: `${CIRC_SRC} — MC-CENTRIFUGAL-REAL (P28 cut-string tangent evidence + P31 real-forces-only diagram rule)`,
  },
]

const CIRC_PROBES: SeedProbe[] = [
  {
    conceptId: CIRC,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A ball whirls in a horizontal circle on a string at constant speed. The string is cut. The ball initially flies:',
    choices: [
      { text: 'Along the tangent — it keeps the straight-line velocity it had at release', isCorrect: true },
      { text: 'Radially outward — the centrifugal force flings it away from the centre', isCorrect: false, misconceptionId: `${CIRC}:MC-CENTRIFUGAL-REAL` },
      { text: 'It stops — nothing is making it move anymore', isCorrect: false },
    ],
    correctValue: 'tangent',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CIRC}:MC-CENTRIFUGAL-REAL`],
    source: `${CIRC_SRC} — P28 cut-string scenario as probe, distractor-mapped`,
  },
  {
    conceptId: CIRC,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A car rounds a curve at constant speed. Is it accelerating?',
    choices: [
      { text: 'Yes — its direction (hence velocity) changes; centripetal acceleration v\u00b2/r points toward the centre', isCorrect: true },
      { text: 'No — constant speed means zero acceleration, so the net force is zero', isCorrect: false, misconceptionId: `${CIRC}:MC-CONSTANT-SPEED-NO-ACCELERATION` },
    ],
    correctValue: 'yes, centripetal',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CIRC}:MC-CONSTANT-SPEED-NO-ACCELERATION`],
    source: `${CIRC_SRC} — MC-CONSTANT-SPEED-NO-ACCELERATION probe, distractor-mapped`,
  },
]

// ─── phys.em.electric-current ────────────────────────────────────────────────
const CUR = 'phys.em.electric-current'
const CUR_SRC = 'docs/curriculum/blueprints/phys.em.electric-current.md'

const CUR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CUR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Does a bulb \u201cuse up\u201d current? Measure it: put an ammeter before ' +
      'the bulb and after it — same reading. In a series circuit with ' +
      'two bulbs, every ammeter along the loop agrees. Charge cannot ' +
      'pile up inside a device (where would it go?), so every electron ' +
      'that enters comes back out. Think of marbles flowing through a ' +
      'pipe: the pipe resists the flow but consumes no marbles. What ' +
      'the bulb actually spends is ENERGY — each coulomb drops some ' +
      'potential energy crossing the bulb (that is the voltage drop) ' +
      'and it leaves as light and heat. So in series: current is the ' +
      'same everywhere; voltage is what gets divided among the ' +
      'devices. Current is the messenger; voltage \u00d7 charge is the ' +
      'payload.',
    targetedMisconceptions: [`${CUR}:MC-CURRENT-USED-UP-BY-DEVICES`],
    source: `${CUR_SRC} — MC-CURRENT-USED-UP-BY-DEVICES (P28 ammeter-both-sides evidence + P30 marble-pipe bridge)`,
  },
  {
    conceptId: CUR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Which way do electrons actually go around a circuit? They are ' +
      'negative, so they are ATTRACTED to the + terminal: electrons ' +
      'flow from \u2212 through the external wire to +. Conventional ' +
      'current is defined the other way (+ to \u2212) because the ' +
      'convention was fixed a century before the electron was ' +
      'discovered — an unlucky but harmless guess. Keep two arrows in ' +
      'your head (draw them in different colours once and the ' +
      'confusion dies): red for conventional current + \u2192 \u2212, blue for ' +
      'electron flow \u2212 \u2192 +, always opposite. Circuit analysis ' +
      'always uses the red arrow, and the physics comes out identical ' +
      'either way — just never claim the two arrows are the same ' +
      'direction.',
    targetedMisconceptions: [`${CUR}:MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS`],
    source: `${CUR_SRC} — MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS (P28 attraction argument + s6 two-colour arrow exercise)`,
  },
]

const CUR_PROBES: SeedProbe[] = [
  {
    conceptId: CUR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two bulbs are connected in series. An ammeter reads 0.5 A before the first bulb. What does an ammeter read after the second bulb?',
    choices: [
      { text: '0.5 A — current is the same everywhere in a series loop; charge is conserved', isCorrect: true },
      { text: 'Less than 0.5 A — each bulb uses up some of the current', isCorrect: false, misconceptionId: `${CUR}:MC-CURRENT-USED-UP-BY-DEVICES` },
      { text: '0.25 A — the two bulbs share the current equally', isCorrect: false, misconceptionId: `${CUR}:MC-CURRENT-USED-UP-BY-DEVICES` },
    ],
    correctValue: '0.5 A',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CUR}:MC-CURRENT-USED-UP-BY-DEVICES`],
    source: `${CUR_SRC} — P28 series-ammeter evidence as probe, distractor-mapped`,
  },
  {
    conceptId: CUR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In the external wire of a battery circuit, which way do the ELECTRONS move?',
    choices: [
      { text: 'From the \u2212 terminal to the + terminal — opposite to conventional current', isCorrect: true },
      { text: 'From the + terminal to the \u2212 terminal, the same direction as conventional current', isCorrect: false, misconceptionId: `${CUR}:MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS` },
    ],
    correctValue: 'minus to plus',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CUR}:MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS`],
    source: `${CUR_SRC} — MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS probe, distractor-mapped`,
  },
]

// ─── math.alg.quadratic-equation ─────────────────────────────────────────────
const QUAD = 'math.alg.quadratic-equation'
const QUAD_SRC = 'docs/curriculum/blueprints/math.alg.quadratic-equation.md'

const QUAD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QUAD,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Before solving any quadratic ax\u00b2 + bx + c = 0, make one ' +
      'decision: which tool? Factoring is fast — WHEN the roots are ' +
      'nice. Try factoring first only if the numbers look friendly; if ' +
      'no integer pair works, do not sit there hunting — compute the ' +
      'discriminant \u0394 = b\u00b2 \u2212 4ac and let it route you. \u0394 a perfect ' +
      'square (0, 1, 4, 9, \u2026): factoring would have worked, and the ' +
      'formula gives the same rational roots. \u0394 positive but not a ' +
      'perfect square: two irrational roots — factoring over integers ' +
      'was never possible; the formula x = (\u2212b \u00b1 \u221a\u0394)/2a is the ' +
      'only path. \u0394 negative: no real roots at all. The quadratic ' +
      'formula always works; factoring is an optional shortcut for the ' +
      'friendly cases — never a dead end you are trapped in.',
    targetedMisconceptions: [`${QUAD}:MC-1`],
    source: `${QUAD_SRC} — MC-1 FACTORING-IS-UNIVERSAL (A01 decision tree + A03 discriminant cases rendered as teaching text)`,
  },
  {
    conceptId: QUAD,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The most common quadratic-formula error is a sign slip on b. ' +
      'Solve x\u00b2 \u2212 5x + 6 = 0: here a = 1, b = \u22125, c = 6. The formula ' +
      'starts with \u2212b, and \u2212(\u22125) = +5 — the minus in the formula and ' +
      'the minus in b cancel. Writing \u2212b = \u22125 double-counts the sign ' +
      'and wrecks both roots. Armour against it: before substituting, ' +
      'write the three values on their own line (a = 1, b = \u22125, ' +
      'c = 6), then substitute with brackets around every value: ' +
      'x = (\u2212(\u22125) \u00b1 \u221a((\u22125)\u00b2 \u2212 4\u00b71\u00b76))/(2\u00b71) = (5 \u00b1 \u221a1)/2, ' +
      'giving x = 3 and x = 2. Check by factoring: (x \u2212 2)(x \u2212 3) — ' +
      'same answer. The brackets are not decoration; they are the fix.',
    targetedMisconceptions: [`${QUAD}:MC-2`],
    source: `${QUAD_SRC} — MC-2 NEGATIVE-b-FORMULA-ERROR (B02 repair: bracket-substitution discipline, factoring cross-check)`,
  },
]

const QUAD_PROBES: SeedProbe[] = [
  {
    conceptId: QUAD,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In solving x\u00b2 \u2212 7x + 10 = 0 with the quadratic formula, what is the value of \u2212b?',
    choices: [
      { text: '+7 — b is \u22127, so \u2212b = \u2212(\u22127) = 7', isCorrect: true },
      { text: '\u22127 — b stays as it appears in the equation', isCorrect: false, misconceptionId: `${QUAD}:MC-2` },
      { text: '10 — b is the constant term', isCorrect: false },
    ],
    correctValue: '+7',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${QUAD}:MC-2`],
    source: `${QUAD_SRC} — MC-2 probe, distractor-mapped`,
  },
  {
    conceptId: QUAD,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'You try to factor x\u00b2 + 3x + 1 = 0 and no integer pair works. What is the right next move?',
    choices: [
      { text: 'Compute \u0394 = 9 \u2212 4 = 5 (not a perfect square) and use the quadratic formula — integer factoring was never possible', isCorrect: true },
      { text: 'Keep trying factor pairs — every quadratic factors if you search long enough', isCorrect: false, misconceptionId: `${QUAD}:MC-1` },
    ],
    correctValue: 'discriminant then formula',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${QUAD}:MC-1`],
    source: `${QUAD_SRC} — MC-1 FACTORING-IS-UNIVERSAL probe (non-factorable trigger), distractor-mapped`,
  },
]

// ─── math.arith.exponentiation ───────────────────────────────────────────────
const EXP = 'math.arith.exponentiation'
const EXP_SRC = 'docs/curriculum/blueprints/math.arith.exponentiation.md'

const EXP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXP,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Fold a sheet of paper once: 2 layers. Fold again: 4. Again: 8. ' +
      'That is exponentiation — 2\u00b3 means the layer count DOUBLED three ' +
      'times: 2 \u00d7 2 \u00d7 2 = 8. The exponent counts MULTIPLICATIONS, not ' +
      'anything else: it is not 2 \u00d7 3 = 6 (that multiplies the base by ' +
      'the exponent) and not 2 + 2 + 2 = 6 (that is repeated addition, ' +
      'which is multiplication\u2019s job). The safe habit while learning: ' +
      'expand every power into its chain before computing — ' +
      '5\u00b2 = 5 \u00d7 5 = 25, 3\u2074 = 3 \u00d7 3 \u00d7 3 \u00d7 3 = 81. Ten seconds of ' +
      'writing the chain beats every shortcut error, and after enough ' +
      'chains the correct meaning becomes automatic.',
    targetedMisconceptions: [`${EXP}:MC-1`, `${EXP}:MC-2`],
    source: `${EXP_SRC} — Component 3 paper-folding anchor + MC-1/MC-2 expand-the-chain repair`,
  },
  {
    conceptId: EXP,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Why is a\u2070 = 1 and not 0? Walk DOWN the powers of 2 and watch ' +
      'the pattern: 2\u00b3 = 8, 2\u00b2 = 4, 2\u00b9 = 2 — each step down divides ' +
      'by 2. Keep the pattern going one more step: 2\u2070 = 2 \u00f7 2 = 1. ' +
      'Not zero — one. The intuition \u201cno factors means nothing, so ' +
      'zero\u201d picks the wrong \u201cnothing\u201d: an empty PRODUCT is 1 (the ' +
      'number that changes nothing under multiplication), just as an ' +
      'empty sum is 0 (the number that changes nothing under ' +
      'addition). The convention also keeps the exponent rules ' +
      'working: a\u00b3 \u00f7 a\u00b3 must equal a\u2070, and anything divided by ' +
      'itself is 1.',
    targetedMisconceptions: [`${EXP}:MC-3`],
    source: `${EXP_SRC} — MC-3 ZERO-EXPONENT-GIVES-ZERO (B03 repair: divide-down pattern + empty-product identity)`,
  },
]

const EXP_PROBES: SeedProbe[] = [
  {
    conceptId: EXP,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is 2\u00b3?',
    choices: [
      { text: '8 — three multiplications: 2 \u00d7 2 \u00d7 2', isCorrect: true },
      { text: '6 — multiply the base by the exponent: 2 \u00d7 3', isCorrect: false, misconceptionId: `${EXP}:MC-1` },
      { text: '9 — the exponent squares the base', isCorrect: false },
    ],
    correctValue: '8',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${EXP}:MC-1`, `${EXP}:MC-2`],
    source: `${EXP_SRC} — MC-1 trigger item (2\u00b3), distractor-mapped`,
  },
  {
    conceptId: EXP,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is 7\u2070?',
    choices: [
      { text: '1 — stepping down the powers divides by 7 each time, and 7\u00b9 \u00f7 7 = 1; the empty product is 1', isCorrect: true },
      { text: '0 — with no sevens multiplied, there is nothing, so zero', isCorrect: false, misconceptionId: `${EXP}:MC-3` },
    ],
    correctValue: '1',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EXP}:MC-3`],
    source: `${EXP_SRC} — MC-3 probe, distractor-mapped`,
  },
]

// ─── math.arith.fraction-equivalence ─────────────────────────────────────────
const FEQ = 'math.arith.fraction-equivalence'
const FEQ_SRC = 'docs/curriculum/blueprints/math.arith.fraction-equivalence.md'

const FEQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FEQ,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'To make a fraction equivalent to 1/3, you MULTIPLY top and ' +
      'bottom by the same number: 1/3 = 2/6 = 3/9 — cutting every ' +
      'piece into smaller pieces without changing how much you have. ' +
      'The tempting shortcut — ADD the same number to top and bottom — ' +
      'feels fair but changes the amount: 1/3 is about 0.333, while ' +
      '(1+1)/(3+1) = 2/4 = 0.5. Half a pizza is more than a third! ' +
      '\u201cSame thing to both parts\u201d is an equation-solving rule; a ' +
      'fraction is a RATIO, and only scaling (multiplying or dividing ' +
      'both parts) keeps a ratio the same. Adding shifts the balance ' +
      'between top and bottom — multiplying preserves it.',
    targetedMisconceptions: [`${FEQ}:MC-1`],
    source: `${FEQ_SRC} — MC-1 (root cause: symmetry heuristic from equations; P28 conflict 1/3 vs 2/4 + P30 ratio-scaling bridge)`,
  },
  {
    conceptId: FEQ,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Is 6/8 \u201cwrong\u201d because it isn\u2019t simplified? No — 6/8 and 3/4 ' +
      'are two NAMES for the same amount. Put both on a number line ' +
      'and they land on exactly the same point; cross-multiply and ' +
      '6 \u00d7 4 = 24 = 8 \u00d7 3 confirms it. \u201cAlways simplify your answer\u201d ' +
      'is a tidiness convention — like writing your name instead of ' +
      'your full legal name — not a rule that the other forms are ' +
      'false. In fact you constantly need the NON-simplified names: to ' +
      'add 3/4 + 1/8 you must first rename 3/4 as 6/8. Simplified = ' +
      'simplest name; equivalent = any correct name for the same ' +
      'value.',
    targetedMisconceptions: [`${FEQ}:MC-2`],
    source: `${FEQ_SRC} — MC-2 (root cause: always-simplify instruction; P07 number-line + P30 many-names bridge + P33 discrimination)`,
  },
]

const FEQ_PROBES: SeedProbe[] = [
  {
    conceptId: FEQ,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Which fraction is equivalent to 1/3?',
    choices: [
      { text: '3/9 — multiply top and bottom by 3', isCorrect: true },
      { text: '2/4 — add 1 to the top and 1 to the bottom', isCorrect: false, misconceptionId: `${FEQ}:MC-1` },
      { text: '3/1 — swap the top and bottom', isCorrect: false },
    ],
    correctValue: '3/9',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FEQ}:MC-1`],
    source: `${FEQ_SRC} — DB-2 diagnostic item, distractor-mapped`,
  },
  {
    conceptId: FEQ,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Is 6/8 equivalent to 3/4?',
    choices: [
      { text: 'Yes — they are two names for the same value (6\u00d74 = 8\u00d73); simplifying just finds the simplest name', isCorrect: true },
      { text: 'No — 6/8 is not simplified, so it is a different (or invalid) fraction', isCorrect: false, misconceptionId: `${FEQ}:MC-2` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FEQ}:MC-2`],
    source: `${FEQ_SRC} — MC-2 diagnostic trigger as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.nouns ───────────────────────────────────────────────────────
const NOUN = 'eng.grammar.nouns'
const NOUN_SRC = 'docs/curriculum/blueprints/eng.grammar.nouns.md'

const NOUN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NOUN,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A noun names something — but \u201csomething\u201d is bigger than \u201ca ' +
      'thing you can hold.\u201d Can you touch happiness? Freedom? ' +
      'Courage? No — yet they are all nouns, because grammatically ' +
      'they behave exactly like table or book: they take articles ' +
      '(\u201ca feeling of freedom\u201d), they can be the subject of a ' +
      'sentence (\u201cHonesty matters\u201d), they fill the same slots ' +
      '(\u201cI have a book\u201d / \u201cI have knowledge\u201d). So the full ' +
      'definition: a noun names a person, a place, a thing, OR an ' +
      'idea. Concrete nouns name what your senses can find; abstract ' +
      'nouns name qualities, states, and concepts — just as real a ' +
      'category, only invisible.',
    targetedMisconceptions: [`${NOUN}:MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS`],
    source: `${NOUN_SRC} — MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS (P28 touch-happiness conflict + P33 book/knowledge slot pairs)`,
  },
  {
    conceptId: NOUN,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cAn information\u201d? \u201cMany furnitures\u201d? The countable/uncountable ' +
      'split feels random, but there is a learnable pattern under it. ' +
      'Countable nouns name things you can count as separate units: ' +
      'one chair, two chairs; one fact, several facts. Uncountable ' +
      'nouns name what English treats as a mass or a category — ' +
      'substances (water, rice), abstractions (information, advice), ' +
      'whole collections (furniture, luggage). Test any noun: can you ' +
      'naturally say \u201cone \u2026, two \u2026s\u201d? \u201cOne chair, two chairs\u201d ' +
      'works; \u201cone furniture, two furnitures\u201d does not — furniture is ' +
      'measured, not counted: \u201csome furniture,\u201d \u201ca piece of ' +
      'furniture,\u201d \u201cmuch information.\u201d A few words must be learned ' +
      'individually, but the substance/abstraction/collection pattern ' +
      'carries you most of the way.',
    targetedMisconceptions: [`${NOUN}:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY`],
    source: `${NOUN_SRC} — MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY (P28 count-test conflict + P30 mass-pattern bridge)`,
  },
]

const NOUN_PROBES: SeedProbe[] = [
  {
    conceptId: NOUN,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which of these is a noun?',
    choices: [
      { text: 'All of them — \u201ctable\u201d is a concrete noun and \u201chappiness\u201d and \u201cfreedom\u201d are abstract nouns', isCorrect: true },
      { text: 'Only \u201ctable\u201d — nouns are things you can touch', isCorrect: false, misconceptionId: `${NOUN}:MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS` },
      { text: 'None — \u201chappiness\u201d and \u201cfreedom\u201d are feelings, not words that name things', isCorrect: false, misconceptionId: `${NOUN}:MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS` },
    ],
    correctValue: 'all — concrete and abstract',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NOUN}:MC-NOUNS-ARE-ONLY-PHYSICAL-THINGS`],
    source: `${NOUN_SRC} — abstract-noun recognition probe, distractor-mapped`,
  },
  {
    conceptId: NOUN,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence is correct?',
    choices: [
      { text: '\u201cShe gave me a piece of advice\u201d — advice is uncountable, so it is measured, not counted', isCorrect: true },
      { text: '\u201cShe gave me an advice\u201d — advice is a noun, so it takes a/an like any other', isCorrect: false, misconceptionId: `${NOUN}:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY` },
    ],
    correctValue: 'a piece of advice',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${NOUN}:MC-COUNTABLE-VS-UNCOUNTABLE-IS-ARBITRARY`],
    source: `${NOUN_SRC} — uncountable-noun usage probe, distractor-mapped`,
  },
]

// ─── eng.grammar.articles-and-determiners ────────────────────────────────────
const ART = 'eng.grammar.articles-and-determiners'
const ART_SRC = 'docs/curriculum/blueprints/eng.grammar.articles-and-determiners.md'

const ART_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ART,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The a/an rule is about SOUND, not spelling. Say the next word ' +
      'aloud: if it STARTS with a vowel sound, use \u201can\u201d; consonant ' +
      'sound, use \u201ca.\u201d Spelling misleads exactly where learners trip: ' +
      '\u201cuniversity\u201d is spelled with a u but is pronounced ' +
      '\u201cYOO-niversity\u201d — a consonant /j/ sound — so it is \u201ca ' +
      'university.\u201d \u201cHour\u201d is spelled with an h, but the h is silent ' +
      'and the word opens with a vowel sound — so \u201can hour.\u201d Compare: ' +
      '\u201can umbrella\u201d (true vowel sound) but \u201ca university\u201d; \u201ca ' +
      'horse\u201d (spoken h) but \u201can hour.\u201d The letter-check shortcut ' +
      'works most of the time — the ear-check works every time. Learn ' +
      'the handful of divergers by ear: university, European, hour, ' +
      'honest.',
    targetedMisconceptions: [`${ART}:MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND`],
    source: `${ART_SRC} — MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND (P28 say-it-aloud conflict + P33 university/umbrella, hour/horse pairs)`,
  },
  {
    conceptId: ART,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'When do you need \u201cthe\u201d? Run one test: can your listener ' +
      'already identify exactly WHICH one you mean? If yes — because ' +
      'you mentioned it before, the context singles it out, or it is ' +
      'one of a kind — use \u201cthe.\u201d If you are introducing something ' +
      'new or speaking generally, use \u201ca/an\u201d (or no article for ' +
      'plurals and uncountables). Watch the switch happen in two ' +
      'sentences: \u201cI saw A dog in the park. THE dog was friendly.\u201d ' +
      'First mention: your listener doesn\u2019t know which dog — \u201ca.\u201d ' +
      'Second mention: now you both know — \u201cthe.\u201d One-of-a-kind ' +
      'things are always identifiable, so it is always \u201cthe sun,\u201d ' +
      '\u201cthe moon.\u201d Not a habit of always or never — a fresh ' +
      'identifiability test each time, and it is completely learnable ' +
      'even if your first language has no articles.',
    targetedMisconceptions: [`${ART}:MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED`],
    source: `${ART_SRC} — MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED (P30 identifiability test + P33 a-dog/the-dog switch)`,
  },
]

const ART_PROBES: SeedProbe[] = [
  {
    conceptId: ART,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which phrase is correct?',
    choices: [
      { text: '\u201cA university\u201d and \u201can hour\u201d — the choice follows the starting SOUND, not the first letter', isCorrect: true },
      { text: '\u201cAn university\u201d and \u201ca hour\u201d — u is a vowel and h is a consonant', isCorrect: false, misconceptionId: `${ART}:MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND` },
      { text: '\u201cAn university\u201d and \u201can hour\u201d — both start with special words', isCorrect: false, misconceptionId: `${ART}:MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND` },
    ],
    correctValue: 'a university, an hour',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ART}:MC-A-AN-DEPENDS-ON-SPELLING-NOT-SOUND`],
    source: `${ART_SRC} — P33 discrimination pairs as probe, distractor-mapped`,
  },
  {
    conceptId: ART,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'You are telling a friend about a dog you saw for the first time. Which is the natural first sentence?',
    choices: [
      { text: '\u201cI saw a dog in the park\u201d — first mention, the listener can\u2019t yet identify which dog', isCorrect: true },
      { text: '\u201cI saw the dog in the park\u201d — dogs always take \u201cthe\u201d', isCorrect: false, misconceptionId: `${ART}:MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED` },
    ],
    correctValue: 'a dog',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ART}:MC-THE-IS-ALWAYS-NEEDED-OR-NEVER-NEEDED`],
    source: `${ART_SRC} — P28 first-mention scenario as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.present-tenses ──────────────────────────────────────────────
const PRES = 'eng.grammar.present-tenses'
const PRES_SRC = 'docs/curriculum/blueprints/eng.grammar.present-tenses.md'

const PRES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRES,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Surprise: the \u201csimple present\u201d is usually NOT about right now. ' +
      '\u201cI eat dinner\u201d does not describe this moment — it describes a ' +
      'HABIT (something you do regularly). For an action in progress ' +
      'at this second, English uses the present continuous: \u201cI am ' +
      'eating dinner.\u201d The split: simple present = habits, routines, ' +
      'and general truths (\u201cI walk to school every day,\u201d \u201cwater ' +
      'boils at 100\u00b0C,\u201d \u201cthe sun rises in the east\u201d); present ' +
      'continuous (am/is/are + -ing) = happening now (\u201cLook, the sun ' +
      'is rising!\u201d). Quick test before you speak: is this something ' +
      'that happens REGULARLY, or something happening AS I SPEAK? ' +
      'Regular \u2192 simple. Right now \u2192 continuous.',
    targetedMisconceptions: [`${PRES}:MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW`],
    source: `${PRES_SRC} — MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW (P30 habit-vs-in-progress split + P33 breakfast/sunrise pairs)`,
  },
  {
    conceptId: PRES,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cI have visited Paris\u201d and \u201cI visited Paris\u201d — same thing? ' +
      'Try adding a date: \u201cI visited Paris in 2019\u201d sounds fine; \u201cI ' +
      'have visited Paris in 2019\u201d sounds broken. That broken ' +
      'sentence exposes the real difference. The simple past pins an ' +
      'action to a SPECIFIC, finished time — it lives entirely back ' +
      'then. The present perfect (have/has + past participle) ' +
      'deliberately gives NO specific time, because its job is to ' +
      'connect the past to NOW: \u201cI have visited Paris\u201d = it is part ' +
      'of my experience as I stand here; \u201cShe has lost her keys\u201d = ' +
      'they are still missing now. That is why the present perfect ' +
      'refuses time stamps like \u201cyesterday\u201d or \u201cin 2019\u201d — the ' +
      'moment you name the time, you have left \u201cnow\u201d and the simple ' +
      'past takes over.',
    targetedMisconceptions: [`${PRES}:MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE`],
    source: `${PRES_SRC} — MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE (P28 add-in-2019 conflict as the centrepiece + P33 keys pair)`,
  },
]

const PRES_PROBES: SeedProbe[] = [
  {
    conceptId: PRES,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'You are on the phone, eating as you talk. Which is correct for what is happening right now?',
    choices: [
      { text: '\u201cI am eating dinner\u201d — present continuous for an action in progress', isCorrect: true },
      { text: '\u201cI eat dinner\u201d — present tense means happening in the present', isCorrect: false, misconceptionId: `${PRES}:MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW` },
      { text: '\u201cI ate dinner\u201d — eating started in the past', isCorrect: false },
    ],
    correctValue: 'I am eating dinner',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PRES}:MC-SIMPLE-PRESENT-MEANS-HAPPENING-RIGHT-NOW`],
    source: `${PRES_SRC} — P28 eating-now scenario as probe, distractor-mapped`,
  },
  {
    conceptId: PRES,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence is correct?',
    choices: [
      { text: '\u201cI visited Paris in 2019\u201d — a specific past time takes the simple past', isCorrect: true },
      { text: '\u201cI have visited Paris in 2019\u201d — present perfect and simple past are interchangeable', isCorrect: false, misconceptionId: `${PRES}:MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE` },
    ],
    correctValue: 'I visited Paris in 2019',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PRES}:MC-PRESENT-PERFECT-IS-JUST-PAST-TENSE`],
    source: `${PRES_SRC} — P28 time-marker conflict as probe, distractor-mapped`,
  },
]

// ─── phys.therm.temperature ──────────────────────────────────────────────────
const TEMP = 'phys.therm.temperature'
const TEMP_SRC = 'docs/curriculum/blueprints/phys.therm.temperature.md'

const TEMP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TEMP,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Temperature and heat are different quantities — here is the ' +
      'puzzle that splits them. Take 1 kg of iron at 80\u00b0C and 10 kg ' +
      'of water at 20\u00b0C. Which is hotter? The iron. Which holds more ' +
      'thermal energy? The water, by far — it has ten times the mass. ' +
      'Yet when they touch, heat flows FROM the iron TO the water: ' +
      'from hot to cold, regardless of which side owns more energy. ' +
      'Temperature is like pressure — it sets the DIRECTION of flow; ' +
      'heat is the fluid that flows. A match flame is hotter than a ' +
      'warm bath but stores far less energy. Temperature is intensive ' +
      '(independent of amount); thermal energy is extensive (scales ' +
      'with mass). Same temperature = zero net flow — that is ' +
      'literally the definition.',
    targetedMisconceptions: [`${TEMP}:MC-TEMPERATURE-IS-HEAT`],
    source: `${TEMP_SRC} — MC-TEMPERATURE-IS-HEAT (P28 iron/water block puzzle + s6 pressure/fluid analogy)`,
  },
  {
    conceptId: TEMP,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Is 20\u00b0C \u201ctwice as hot\u201d as 10\u00b0C? Feed it to the gas law and ' +
      'watch it fail: pressure should double if temperature doubles — ' +
      'but convert to Kelvin (283 K \u2192 293 K) and the real change is ' +
      '3.5%, nowhere near doubling. Celsius\u2019s zero is a convention ' +
      '(water\u2019s ice point), not a physical zero — the true floor, ' +
      'absolute zero, sits at \u2212273.15\u00b0C. Ratios measured from an ' +
      'arbitrary zero mean nothing. The working rule: DIFFERENCES are ' +
      'fine in Celsius (the offset cancels — thermal expansion \u0394T = ' +
      '30\u00b0C is legitimate); RATIOS and multiplicative formulas (gas ' +
      'laws, Carnot efficiency, KE \u221d T) demand Kelvin. Example of the ' +
      'stakes: a \u201c200\u00b0C hot / 100\u00b0C cold\u201d engine looks 50% ' +
      'efficient in Celsius; in Kelvin it is 1 \u2212 373/473 = 21%.',
    targetedMisconceptions: [`${TEMP}:MC-CELSIUS-RATIO-VALID`],
    source: `${TEMP_SRC} — MC-CELSIUS-RATIO-VALID (P28 gas-law check + P33 Carnot/expansion discrimination + s6 differences-vs-ratios rule)`,
  },
]

const TEMP_PROBES: SeedProbe[] = [
  {
    conceptId: TEMP,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 200\u00b0C steel nail is dropped into a 20\u00b0C swimming pool. Which way does heat flow?',
    choices: [
      { text: 'From nail to pool — heat flows from higher to lower temperature, even though the pool holds far more thermal energy', isCorrect: true },
      { text: 'From pool to nail — the pool has much more heat to give', isCorrect: false, misconceptionId: `${TEMP}:MC-TEMPERATURE-IS-HEAT` },
      { text: 'No flow — they balance because the pool\u2019s size compensates its lower temperature', isCorrect: false, misconceptionId: `${TEMP}:MC-TEMPERATURE-IS-HEAT` },
    ],
    correctValue: 'nail to pool',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TEMP}:MC-TEMPERATURE-IS-HEAT`],
    source: `${TEMP_SRC} — P33 nail/pool discrimination pair as probe`,
  },
  {
    conceptId: TEMP,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A gas is heated from 10\u00b0C to 20\u00b0C at constant volume. Its absolute pressure roughly:',
    choices: [
      { text: 'Rises about 3.5% — gas laws use Kelvin: 293/283 \u2248 1.035', isCorrect: true },
      { text: 'Doubles — the temperature went from 10 to 20, twice as hot', isCorrect: false, misconceptionId: `${TEMP}:MC-CELSIUS-RATIO-VALID` },
    ],
    correctValue: '\u22483.5% rise',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TEMP}:MC-CELSIUS-RATIO-VALID`],
    source: `${TEMP_SRC} — P28 gas-law conflict evidence as probe`,
  },
]

// ─── phys.opt.refraction ─────────────────────────────────────────────────────
const REFR = 'phys.opt.refraction'
const REFR_SRC = 'docs/curriculum/blueprints/phys.opt.refraction.md'

const REFR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REFR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Why does light bend toward the normal entering glass? March a ' +
      'column of soldiers at an angle into a muddy field. The soldiers ' +
      'who reach the mud first slow down while their row-mates are ' +
      'still striding on dry ground — so the whole column pivots ' +
      'toward the mud boundary\u2019s normal. Light does exactly this: the ' +
      'edge of the wavefront that enters the denser (slower) medium ' +
      'first lags, and the front swings toward the normal. Snell\u2019s ' +
      'law just quantifies the pivot: with air\u2192glass at 45\u00b0, ' +
      'sin\u03b8\u2082 = (1/1.5)\u00d7sin45\u00b0 gives \u03b8\u2082 = 28\u00b0 — closer to the ' +
      'normal. Reverse the trip (glass\u2192air, soldiers leaving the mud) ' +
      'and the front speeds up and bends AWAY from the normal. Into ' +
      'denser \u2192 toward; into less dense \u2192 away.',
    targetedMisconceptions: [`${REFR}:MC-DENSER-MEDIUM-MEANS-BENDS-AWAY-FROM-NORMAL`],
    source: `${REFR_SRC} — MC-2 (P30 marching-soldiers bridge + P28 Snell 45\u00b0\u219228\u00b0 numeric check)`,
  },
  {
    conceptId: REFR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'What actually changes when light crosses into water — speed, ' +
      'wavelength, or frequency? Watch the boundary: every crest that ' +
      'arrives from the air side produces exactly one crest on the ' +
      'water side. If frequency changed, crests would pile up or run ' +
      'out at the interface — they don\u2019t, ever. Frequency is fixed by ' +
      'the SOURCE (the oscillating emitter) and no passive boundary ' +
      'can change it. What changes is the speed (v = c/n) and, since ' +
      'the same number of crests now travel slower, they bunch up: ' +
      '\u03bb = \u03bb\u2080/n. Concretely: 600 nm orange light (f = 5\u00d710\u00b9\u2074 Hz) ' +
      'enters water and keeps f = 5\u00d710\u00b9\u2074 Hz while \u03bb compresses to ' +
      '451 nm. Even dispersion — violet bending more than red — is n ' +
      'depending on frequency, never frequency changing.',
    targetedMisconceptions: [`${REFR}:MC-REFRACTION-CHANGES-FREQUENCY`],
    source: `${REFR_SRC} — MC-1 (P28 crest-conservation argument + 600\u2192451 nm measurement + P31 replacement)`,
  },
]

const REFR_PROBES: SeedProbe[] = [
  {
    conceptId: REFR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Light passes from air into water. Which quantity is UNCHANGED?',
    choices: [
      { text: 'Frequency — it is set by the source; only speed and wavelength change (v = c/n, \u03bb = \u03bb\u2080/n)', isCorrect: true },
      { text: 'Wavelength — colour cannot change, so \u03bb stays fixed', isCorrect: false },
      { text: 'Nothing — speed, wavelength, and frequency all change in the new medium', isCorrect: false, misconceptionId: `${REFR}:MC-REFRACTION-CHANGES-FREQUENCY` },
    ],
    correctValue: 'frequency',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${REFR}:MC-REFRACTION-CHANGES-FREQUENCY`],
    source: `${REFR_SRC} — MC-1 what-changes-at-boundary probe, distractor-mapped`,
  },
  {
    conceptId: REFR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A ray of light passes from air into glass at 45\u00b0 to the normal. The refracted ray:',
    choices: [
      { text: 'Bends TOWARD the normal (\u03b8\u2082 \u2248 28\u00b0) — entering a denser, slower medium turns the wavefront toward the normal', isCorrect: true },
      { text: 'Bends AWAY from the normal — denser material pushes the light away', isCorrect: false, misconceptionId: `${REFR}:MC-DENSER-MEDIUM-MEANS-BENDS-AWAY-FROM-NORMAL` },
    ],
    correctValue: 'toward the normal',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REFR}:MC-DENSER-MEDIUM-MEANS-BENDS-AWAY-FROM-NORMAL`],
    source: `${REFR_SRC} — MC-2 bending-direction probe with Snell numbers, distractor-mapped`,
  },
]

// ─── math.geom.triangle ──────────────────────────────────────────────────────
const TRI = 'math.geom.triangle'
const TRI_SRC = 'docs/curriculum/blueprints/math.geom.triangle.md'

const TRI_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRI,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Every triangle\u2019s three angles add to exactly 180\u00b0 — tiny ' +
      'triangle or billboard-sized, skinny or fat, always 180\u00b0. Prove ' +
      'it to your own hands: cut any paper triangle, tear off the ' +
      'three corners, and lay them point-to-point along a ruler\u2019s ' +
      'edge — together they form a perfect straight line, and a ' +
      'straight line is 180\u00b0. (360\u00b0 belongs to quadrilaterals and ' +
      'full turns — a triangle is half of that.) This single fact is ' +
      'the workhorse of triangle problems: given any two angles, the ' +
      'third is forced — 180\u00b0 minus the two you know. It is also your ' +
      'error detector: if your \u201canswers\u201d for a triangle\u2019s angles ' +
      'total anything but 180\u00b0, something upstream is wrong.',
    targetedMisconceptions: [`${TRI}:MC-1`],
    source: `${TRI_SRC} — MC-1 ANGLE-SUM-NOT-180 (torn-corners concrete proof; 360\u00b0 contrast)`,
  },
  {
    conceptId: TRI,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Can a triangle be BOTH right-angled AND isosceles? Draw it: ' +
      'make a 90\u00b0 corner with two equal arms and join the ends — a ' +
      '90-45-45 triangle. Two equal sides: isosceles \u2713. One right ' +
      'angle: right-angled \u2713. Both at once. The trap is treating the ' +
      'triangle labels as one exclusive menu. They are really two ' +
      'independent questions: (1) By SIDES — scalene (all different), ' +
      'isosceles (two equal), equilateral (all three equal). (2) By ' +
      'ANGLES — acute (all under 90\u00b0), right (one exactly 90\u00b0), ' +
      'obtuse (one over 90\u00b0). Every triangle answers BOTH questions: ' +
      'a right scalene, an obtuse isosceles, an acute equilateral. ' +
      'Classify twice, then combine.',
    targetedMisconceptions: [`${TRI}:MC-2`],
    source: `${TRI_SRC} — MC-2 TRIANGLE-TYPE-IS-EXCLUSIVE (B02 repair: 90-45-45 construction + two-axis classification)`,
  },
]

const TRI_PROBES: SeedProbe[] = [
  {
    conceptId: TRI,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Two angles of a triangle are 65\u00b0 and 45\u00b0. What is the third angle?',
    choices: [
      { text: '70\u00b0 — the three angles sum to 180\u00b0: 180 \u2212 65 \u2212 45', isCorrect: true },
      { text: '250\u00b0 — the angles sum to 360\u00b0: 360 \u2212 65 \u2212 45', isCorrect: false, misconceptionId: `${TRI}:MC-1` },
      { text: 'It depends on the size of the triangle', isCorrect: false, misconceptionId: `${TRI}:MC-1` },
    ],
    correctValue: '70\u00b0',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${TRI}:MC-1`],
    source: `${TRI_SRC} — MC-1 trigger item (two angles given), distractor-mapped`,
  },
  {
    conceptId: TRI,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A triangle has angles 90\u00b0, 45\u00b0, 45\u00b0 and two equal sides. How should it be classified?',
    choices: [
      { text: 'Both right-angled AND isosceles — side-type and angle-type are independent classifications', isCorrect: true },
      { text: 'That triangle is impossible — a triangle is either right-angled or isosceles, not both', isCorrect: false, misconceptionId: `${TRI}:MC-2` },
    ],
    correctValue: 'right isosceles',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TRI}:MC-2`],
    source: `${TRI_SRC} — MC-2 trigger item (right isosceles), distractor-mapped`,
  },
]

// ─── phys.mech.projectile-motion ─────────────────────────────────────────────
const PROJ = 'phys.mech.projectile-motion'
const PROJ_SRC = 'docs/curriculum/blueprints/phys.mech.projectile-motion.md'

const PROJ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROJ,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Does a heavier ball land sooner? Watch where the mass goes in ' +
      'the math: gravity pulls with F = mg, and acceleration is ' +
      'a = F/m = mg/m = g. The mass CANCELS. Every projectile — golf ' +
      'ball or cannonball — falls with the same g = 9.8 m/s\u00b2, which ' +
      'is exactly why the SUVAT equations for projectiles contain no ' +
      'mass term at all: the trajectory is fixed by launch speed, ' +
      'angle, and g alone. Two balls thrown horizontally at the same ' +
      'speed from the same height hit the ground at the same instant, ' +
      'the same distance out — Galileo\u2019s Leaning Tower insight. ' +
      '(Everyday experience disagrees only because of air resistance: ' +
      'drop a coin and a sheet of paper, then FOLD the paper small and ' +
      'repeat — the gap nearly vanishes.)',
    targetedMisconceptions: [`${PROJ}:MC-HEAVIER-FALLS-FASTER`],
    source: `${PROJ_SRC} — MC-HEAVIER-FALLS-FASTER (P28 mass-cancellation + s6 folded-paper experiment)`,
  },
  {
    conceptId: PROJ,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Which launch angle throws farthest? Not the steepest. Range is ' +
      'a TRADE: a shallow launch has plenty of horizontal speed but ' +
      'almost no flight time; a steep launch buys long flight time at ' +
      'the cost of horizontal speed; straight up (90\u00b0) is the extreme ' +
      'case — maximum air time, zero horizontal progress, and the ' +
      'ball lands on your head. The formula R = v\u2080\u00b2 sin 2\u03b8/g settles ' +
      'it: sin 2\u03b8 peaks at 2\u03b8 = 90\u00b0, so \u03b8 = 45\u00b0 is the optimal ' +
      'balance. Bonus symmetry worth keeping: complementary angles ' +
      'give EQUAL range — 30\u00b0 and 60\u00b0 land in the same spot, the ' +
      '60\u00b0 shot just three times higher on the way. Height maximises ' +
      'at 90\u00b0; RANGE maximises at 45\u00b0 — two different questions.',
    targetedMisconceptions: [`${PROJ}:MC-MAX-RANGE-90DEG`],
    source: `${PROJ_SRC} — MC-MAX-RANGE-90DEG (P30 trade-off bridge + P33 30\u00b0/60\u00b0 complementary pair)`,
  },
]

const PROJ_PROBES: SeedProbe[] = [
  {
    conceptId: PROJ,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 1 kg ball and a 5 kg ball are thrown horizontally at the same speed from the same height (no air resistance). Which lands first?',
    choices: [
      { text: 'They land together — a = F/m = g for both; trajectories are mass-independent', isCorrect: true },
      { text: 'The 5 kg ball — heavier objects fall faster', isCorrect: false, misconceptionId: `${PROJ}:MC-HEAVIER-FALLS-FASTER` },
      { text: 'The 1 kg ball — lighter objects respond to gravity more quickly', isCorrect: false },
    ],
    correctValue: 'together',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PROJ}:MC-HEAVIER-FALLS-FASTER`],
    source: `${PROJ_SRC} — MC-HEAVIER-FALLS-FASTER probe, distractor-mapped`,
  },
  {
    conceptId: PROJ,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'On level ground (no air resistance), which launch angle gives the greatest RANGE?',
    choices: [
      { text: '45\u00b0 — the optimal trade between horizontal speed and flight time (R = v\u2080\u00b2 sin 2\u03b8/g)', isCorrect: true },
      { text: '90\u00b0 — launching straight up keeps the ball in the air longest, so it goes farthest', isCorrect: false, misconceptionId: `${PROJ}:MC-MAX-RANGE-90DEG` },
    ],
    correctValue: '45\u00b0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PROJ}:MC-MAX-RANGE-90DEG`],
    source: `${PROJ_SRC} — MC-MAX-RANGE-90DEG probe, distractor-mapped`,
  },
]

// ─── phys.mech.universal-gravitation ─────────────────────────────────────────
const GRAV = 'phys.mech.universal-gravitation'
const GRAV_SRC = 'docs/curriculum/blueprints/phys.mech.universal-gravitation.md'

const GRAV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GRAV,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      '\u201cAstronauts float because there\u2019s no gravity in space\u201d — run ' +
      'the number and it collapses. The ISS orbits just 400 km up; ' +
      'gravity there is g = 9.8 \u00d7 (6370/6770)\u00b2 \u2248 8.7 m/s\u00b2 — 88% of ' +
      'surface gravity, very much switched on. Astronauts feel ' +
      'weightless because station and crew are in continuous FREE ' +
      'FALL together, forever falling around the Earth while moving ' +
      'sideways fast enough to keep missing it. Newton\u2019s deeper ' +
      'point: the same F = Gm\u2081m\u2082/r\u00b2 that drops an apple holds the ' +
      'Moon in orbit — at the Moon\u2019s distance gravity has thinned to ' +
      '0.0027 m/s\u00b2, tiny but exactly enough. The force weakens with ' +
      'distance but reaches zero only at infinite range: gravity ' +
      'never switches off.',
    targetedMisconceptions: [`${GRAV}:MC-GRAVITY-STOPS`],
    source: `${GRAV_SRC} — MC-GRAVITY-STOPS (P28 ISS 88% computation + P30 apple-and-Moon bridge)`,
  },
  {
    conceptId: GRAV,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Double the distance — does gravity halve? No: it QUARTERS. The ' +
      'law is inverse-SQUARE, F = Gm\u2081m\u2082/r\u00b2, and the geometry ' +
      'explains why: gravity\u2019s influence spreads over the surface of ' +
      'a sphere, and a sphere\u2019s area is 4\u03c0r\u00b2 — double the radius and ' +
      'the same influence is spread over FOUR times the area. So the ' +
      'scaling rule is: multiply r by k, divide F by k\u00b2. Double r \u2192 ' +
      'F/4. Triple r \u2192 F/9. HALVE r \u2192 4F. Check yourself with ' +
      'numbers whenever unsure: at r = 1, F\u2080; at r = 2, F\u2080/4; at ' +
      'r = 3, F\u2080/9 — if your answers read F\u2080/2 and F\u2080/3, the ' +
      'inverse-linear habit is driving and needs overwriting.',
    targetedMisconceptions: [`${GRAV}:MC-INVERSE-LINEAR`],
    source: `${GRAV_SRC} — MC-INVERSE-LINEAR (P30 sphere-area bridge + P33 k\u00b2 scaling triplet)`,
  },
]

const GRAV_PROBES: SeedProbe[] = [
  {
    conceptId: GRAV,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why do astronauts on the ISS (400 km altitude) feel weightless?',
    choices: [
      { text: 'They are in continuous free fall with the station — gravity there is still ~88% of surface gravity', isCorrect: true },
      { text: 'There is no gravity in space — it stops beyond the atmosphere', isCorrect: false, misconceptionId: `${GRAV}:MC-GRAVITY-STOPS` },
      { text: 'The station\u2019s speed generates an anti-gravity force that cancels weight', isCorrect: false },
    ],
    correctValue: 'free fall',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GRAV}:MC-GRAVITY-STOPS`],
    source: `${GRAV_SRC} — MC-GRAVITY-STOPS probe, distractor-mapped`,
  },
  {
    conceptId: GRAV,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Two masses attract with force F. The distance between them is doubled. The new force is:',
    choices: [
      { text: 'F/4 — inverse-square: doubling r quadruples r\u00b2', isCorrect: true },
      { text: 'F/2 — twice as far means half the force', isCorrect: false, misconceptionId: `${GRAV}:MC-INVERSE-LINEAR` },
    ],
    correctValue: 'F/4',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GRAV}:MC-INVERSE-LINEAR`],
    source: `${GRAV_SRC} — P33 doubling pair as probe, distractor-mapped`,
  },
]

// ─── phys.therm.heat-transfer ────────────────────────────────────────────────
const HT = 'phys.therm.heat-transfer'
const HT_SRC = 'docs/curriculum/blueprints/phys.therm.heat-transfer.md'

const HT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HT,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Heat is a verb, not a noun. If heat were a substance stored ' +
      'inside things, a hot metal block would weigh more than a cold ' +
      'one — put it on a precision balance and it doesn\u2019t, ever. (The ' +
      '18th-century \u201ccaloric fluid\u201d theory died on exactly this kind ' +
      'of evidence.) What an object HAS is internal energy — the total ' +
      'thermal energy of its jiggling atoms. HEAT is the name for ' +
      'energy IN TRANSIT from a hotter body to a colder one. Say \u201cthe ' +
      'metal transferred 100 J of heat to the water\u201d — correct; say ' +
      '\u201cthe water now contains 100 J of heat\u201d — malformed: once the ' +
      'transfer ends there is no heat left, only the water\u2019s raised ' +
      'internal energy. (Work can raise internal energy too — rubbing ' +
      'your hands warms them with zero heat transfer.)',
    targetedMisconceptions: [`${HT}:MC-HEAT-IS-A-SUBSTANCE`],
    source: `${HT_SRC} — MC-HEAT-IS-A-SUBSTANCE (P28 weigh-the-heat conflict + s6 verb-not-noun rule + P33 work pair)`,
  },
  {
    conceptId: HT,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A thermos flask is a three-part proof that conduction, ' +
      'convection, and radiation are genuinely different processes. ' +
      'The vacuum gap blocks conduction AND convection — both need a ' +
      'medium (atoms coupling; fluid circulating) and a vacuum has ' +
      'none. But heat still leaks by RADIATION, which needs no medium ' +
      'at all — so the walls are silvered to reflect it. You could not ' +
      'block two mechanisms and separately blunt the third if they ' +
      'were the same physics. They even scale differently: conduction ' +
      'goes as \u0394T, radiation as T\u2074 — negligible at room temperature, ' +
      'dominant in a furnace. Sorting question for any scenario: is ' +
      'there matter connecting the bodies (conduction)? A moving ' +
      'fluid (convection)? Or nothing but space — like the Sun ' +
      'heating Earth across 150 million km of vacuum (radiation)?',
    targetedMisconceptions: [`${HT}:MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE`],
    source: `${HT_SRC} — MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE (P28 thermos design analysis + P30 \u0394T vs T\u2074 scaling)`,
  },
]

const HT_PROBES: SeedProbe[] = [
  {
    conceptId: HT,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The Sun heats the Earth across 150 million km of vacuum. Which mechanism carries the energy?',
    choices: [
      { text: 'Radiation — electromagnetic waves need no medium; vacuum rules out conduction and convection', isCorrect: true },
      { text: 'Convection — hot solar material rises toward the Earth', isCorrect: false, misconceptionId: `${HT}:MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE` },
      { text: 'Conduction — space transmits the vibrations from atom to atom', isCorrect: false, misconceptionId: `${HT}:MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE` },
    ],
    correctValue: 'radiation',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HT}:MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE`],
    source: `${HT_SRC} — P33 Sun-Earth discrimination pair as probe`,
  },
  {
    conceptId: HT,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Hot metal transfers 100 J to cool water. Which statement is correctly phrased?',
    choices: [
      { text: '\u201cThe water\u2019s internal energy increased by 100 J; heat was the transfer\u201d', isCorrect: true },
      { text: '\u201cThe water now contains 100 J of heat\u201d — the heat is stored inside it', isCorrect: false, misconceptionId: `${HT}:MC-HEAT-IS-A-SUBSTANCE` },
    ],
    correctValue: 'internal energy increased',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HT}:MC-HEAT-IS-A-SUBSTANCE`],
    source: `${HT_SRC} — P33 malformed-question pair as probe`,
  },
]

// ─── math.geom.angle ─────────────────────────────────────────────────────────
const ANG = 'math.geom.angle'
const ANG_SRC = 'docs/curriculum/blueprints/math.geom.angle.md'

const ANG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANG,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'An angle measures TURN — how far one ray has rotated from the ' +
      'other — and nothing else. The drawn rays are just arrows ' +
      'showing direction; their length is an artist\u2019s choice. Open a ' +
      'small pocket fan and a giant stage fan to the same spread: ' +
      'same angle, wildly different sizes. Extend an angle\u2019s rays ' +
      'twice as long with a ruler — the opening between them hasn\u2019t ' +
      'turned any further, so the angle is unchanged. When comparing ' +
      'two angles, ignore how long the sides are drawn and how much ' +
      'paper sits between them; ask only: which pair of rays is ' +
      'rotated further apart? A tiny drawn 90\u00b0 beats a huge drawn ' +
      '60\u00b0 every time.',
    targetedMisconceptions: [`${ANG}:MC-1`],
    source: `${ANG_SRC} — MC-1 ANGLE-DEPENDS-ON-RAY-LENGTH (TA-B01 repair: turn-not-length; extend-the-rays demonstration)`,
  },
  {
    conceptId: ANG,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'In the name \u2220ABC, where is the corner? At B — always the ' +
      'MIDDLE letter, never the first. The three letters trace a ' +
      'path: start at a point on one ray (A), travel to the vertex ' +
      '(B), leave along the other ray (C). The turn happens at the ' +
      'middle of the journey, so the middle letter names the vertex. ' +
      'Reading left-to-right makes A feel special — resist it: \u2220ABC ' +
      'and \u2220CBA are the SAME angle (same journey, walked backwards), ' +
      'which only works because the vertex letter stays in the ' +
      'middle. So for \u2220PQR, the vertex is Q; to draw \u2220XYZ, put the ' +
      'corner at Y. Middle letter = the point of the V.',
    targetedMisconceptions: [`${ANG}:MC-3`],
    source: `${ANG_SRC} — MC-3 ANGLE-VERTEX-IS-FIRST-LETTER (TA-B03 repair: path-through-the-vertex reading + \u2220ABC=\u2220CBA check)`,
  },
]

const ANG_PROBES: SeedProbe[] = [
  {
    conceptId: ANG,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Angle 1 is drawn with 10 cm rays opened 60\u00b0. Angle 2 is drawn with 2 cm rays opened 90\u00b0. Which angle is bigger?',
    choices: [
      { text: 'Angle 2 — an angle measures the turn between the rays; drawn length is irrelevant', isCorrect: true },
      { text: 'Angle 1 — its sides are much longer, so it is the bigger angle', isCorrect: false, misconceptionId: `${ANG}:MC-1` },
      { text: 'They cannot be compared without knowing the areas', isCorrect: false, misconceptionId: `${ANG}:MC-1` },
    ],
    correctValue: 'Angle 2 (90\u00b0)',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ANG}:MC-1`],
    source: `${ANG_SRC} — MC-1 comparison probe, distractor-mapped`,
  },
  {
    conceptId: ANG,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u2220PQR, at which point is the vertex?',
    choices: [
      { text: 'Q — the middle letter always names the vertex (\u2220PQR = \u2220RQP)', isCorrect: true },
      { text: 'P — the first letter names the vertex', isCorrect: false, misconceptionId: `${ANG}:MC-3` },
    ],
    correctValue: 'Q',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ANG}:MC-3`],
    source: `${ANG_SRC} — MC-3 trigger item (\u2220PQR), distractor-mapped`,
  },
]

// ─── eng.grammar.past-tenses ─────────────────────────────────────────────────
const PAST = 'eng.grammar.past-tenses'
const PAST_SRC = 'docs/curriculum/blueprints/eng.grammar.past-tenses.md'

const PAST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PAST,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Most English verbs form the past with -ed: walk \u2192 walked, ' +
      'play \u2192 played. But a set of very common verbs refuse the rule ' +
      'and carry their own past forms: go \u2192 went (never \u201cgoed\u201d), ' +
      'eat \u2192 ate, see \u2192 saw, have \u2192 had, be \u2192 was/were. Here is ' +
      'the encouraging part: saying \u201cgoed\u201d is not a random mistake — ' +
      'it is proof you have correctly learned the general -ed ' +
      'pattern, the same over-regularizing stage every child ' +
      'acquiring English passes through. The next step is simply a ' +
      'memorized list: the irregulars are few enough to learn and ' +
      'frequent enough that you meet them constantly. Habit to build: ' +
      'before adding -ed, ask \u201cis this one of the irregular ' +
      'regulars?\u201d',
    targetedMisconceptions: [`${PAST}:MC-ALL-PAST-TENSE-VERBS-ADD-ED`],
    source: `${PAST_SRC} — MC-ALL-PAST-TENSE-VERBS-ADD-ED (P30 regular/irregular split + s6 over-regularization-as-progress framing)`,
  },
  {
    conceptId: PAST,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Compare: \u201cI was eating dinner when the phone rang\u201d vs \u201cI ate ' +
      'dinner, then answered the phone.\u201d Different movies. The past ' +
      'continuous (was/were + -ing) films an action ALREADY IN ' +
      'PROGRESS at a past moment — the perfect background for an ' +
      'interruption: eating was ongoing, the ring cut in. The simple ' +
      'past films completed actions in sequence — one finished, the ' +
      'next began. Choose by asking: was the action mid-flow at that ' +
      'moment (continuous), or done-and-dusted (simple)? Two ongoing ' +
      'actions at once take double continuous: \u201cWhile she was ' +
      'studying, her sister was cooking.\u201d A chain of finished events ' +
      'takes simple past: \u201cShe studied, then cooked dinner.\u201d The ' +
      'interrupted-action sentence is where the choice changes the ' +
      'meaning — reserve was/were + -ing for the action that got ' +
      'interrupted.',
    targetedMisconceptions: [`${PAST}:MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE`],
    source: `${PAST_SRC} — MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE (P28 in-progress-vs-completed conflict + P33 pairs)`,
  },
]

const PAST_PROBES: SeedProbe[] = [
  {
    conceptId: PAST,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is the past tense of \u201cgo\u201d?',
    choices: [
      { text: '\u201cWent\u201d — go is irregular and keeps its own memorized past form', isCorrect: true },
      { text: '\u201cGoed\u201d — past tense verbs add -ed', isCorrect: false, misconceptionId: `${PAST}:MC-ALL-PAST-TENSE-VERBS-ADD-ED` },
      { text: '\u201cGoned\u201d — add -ed to the participle', isCorrect: false, misconceptionId: `${PAST}:MC-ALL-PAST-TENSE-VERBS-ADD-ED` },
    ],
    correctValue: 'went',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PAST}:MC-ALL-PAST-TENSE-VERBS-ADD-ED`],
    source: `${PAST_SRC} — P28 goed conflict as probe, distractor-mapped`,
  },
  {
    conceptId: PAST,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Your dinner was interrupted by a phone call. Which sentence shows that eating was still in progress when the phone rang?',
    choices: [
      { text: '\u201cI was eating dinner when the phone rang\u201d — past continuous marks the ongoing, interrupted action', isCorrect: true },
      { text: 'Either sentence — \u201cI ate dinner when the phone rang\u201d means exactly the same thing', isCorrect: false, misconceptionId: `${PAST}:MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE` },
    ],
    correctValue: 'I was eating dinner when the phone rang',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PAST}:MC-PAST-CONTINUOUS-AND-SIMPLE-PAST-ARE-INTERCHANGEABLE`],
    source: `${PAST_SRC} — P28 interrupted-action conflict as probe, distractor-mapped`,
  },
]

// ─── phys.therm.first-law ────────────────────────────────────────────────────
const FLAW = 'phys.therm.first-law'
const FLAW_SRC = 'docs/curriculum/blueprints/phys.therm.first-law.md'

const FLAW_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FLAW,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Adiabatic does NOT mean constant temperature — a diesel engine ' +
      'proves it every stroke. Compression is fast enough that no heat ' +
      'gets in or out (Q = 0), yet the gas soars from 300 K to about ' +
      '909 K — hot enough to ignite fuel with no spark plug. How can T ' +
      'rise with zero heat? Because heat is only ONE way to change ' +
      'internal energy; the first law reads \u0394U = Q + W_on, and the ' +
      'piston\u2019s WORK pours straight into U, raising T. Keep the two ' +
      'conditions apart: ISOTHERMAL means \u0394T = 0 — a thermostat ' +
      'strategy that requires heat to leak in/out as work is done. ' +
      'ADIABATIC means Q = 0 — an insulation strategy, with T free to ' +
      'change and changing dramatically. Compress adiabatically: T ' +
      'rises. Expand adiabatically: the gas spends its own internal ' +
      'energy doing work, and T falls.',
    targetedMisconceptions: [`${FLAW}:MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE`],
    source: `${FLAW_SRC} — MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE (P28 diesel WE-2 + s6 insulated-vs-thermostat contrast)`,
  },
  {
    conceptId: FLAW,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'W = P\u0394V is not a new kind of work — it IS F \u00d7 d in disguise. ' +
      'Check with numbers: gas at P = 2\u00d710\u2075 Pa pushes a piston of ' +
      'area 0.01 m\u00b2 through 0.05 m. Mechanics way: F = PA = 2000 N, ' +
      'W = Fd = 100 J. Thermodynamics way: \u0394V = A\u00d7d = 5\u00d710\u207b\u2074 m\u00b3, ' +
      'W = P\u0394V = 100 J. Same number, same physics — P\u0394V just ' +
      'rewrites F\u00d7d using P = F/A. The general truth is W = \u222bP dV: ' +
      'the AREA under the process curve on a P-V diagram. Constant ' +
      'pressure collapses it to P\u0394V; variable pressure does not — an ' +
      'isothermal expansion needs W = nRT ln(V\u2082/V\u2081). Before using ' +
      'the simple formula, always ask: is P actually constant along ' +
      'this process?',
    targetedMisconceptions: [`${FLAW}:MC-WORK-IS-ONLY-MECHANICAL`],
    source: `${FLAW_SRC} — MC-WORK-IS-ONLY-MECHANICAL (P28 piston double-computation + P31 area-under-curve generalization)`,
  },
]

const FLAW_PROBES: SeedProbe[] = [
  {
    conceptId: FLAW,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An ideal gas in a perfectly insulated cylinder is rapidly compressed. What happens to its temperature?',
    choices: [
      { text: 'It rises — Q = 0, so all the work done on the gas becomes internal energy (\u0394U = W_on)', isCorrect: true },
      { text: 'It stays constant — no heat enters, so the temperature cannot change', isCorrect: false, misconceptionId: `${FLAW}:MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE` },
      { text: 'It falls — compression squeezes the heat out', isCorrect: false },
    ],
    correctValue: 'rises',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FLAW}:MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE`],
    source: `${FLAW_SRC} — P33 insulated-compression pair as probe`,
  },
  {
    conceptId: FLAW,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'An ideal gas expands isothermally from 10 L to 20 L. Can you compute the work as W = P\u0394V?',
    choices: [
      { text: 'No — P varies during an isothermal expansion; use W = nRT ln(V\u2082/V\u2081), the area under the P-V curve', isCorrect: true },
      { text: 'Yes — W = P\u0394V works for every gas process', isCorrect: false, misconceptionId: `${FLAW}:MC-WORK-IS-ONLY-MECHANICAL` },
    ],
    correctValue: 'no — P varies',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FLAW}:MC-WORK-IS-ONLY-MECHANICAL`],
    source: `${FLAW_SRC} — P33 isothermal-expansion pair as probe`,
  },
]

// ─── math.geom.circle ────────────────────────────────────────────────────────
const CIRCL = 'math.geom.circle'
const CIRCL_SRC = 'docs/curriculum/blueprints/math.geom.circle.md'

const CIRCL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CIRCL,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Anchor one fact and the circle formulas stop tangling: the ' +
      'RADIUS r is the circle\u2019s own defining distance — centre to ' +
      'edge — and the diameter is just two radii end to end, d = 2r. ' +
      'The standard formulas are written in r: circumference C = 2\u03c0r, ' +
      'area A = \u03c0r\u00b2. The classic slips — C = 2\u03c0d or A = \u03c0d\u00b2 — ' +
      'double-count the 2 that is already inside d. Catch them with a ' +
      'sanity check: for r = 1, C = 2\u03c0 \u2248 6.28; writing C = 2\u03c0d = 4\u03c0 ' +
      'doubles it. Working habit: whatever the problem hands you, ' +
      'convert to r FIRST (given d = 10, write r = 5 before touching ' +
      'any formula), then use C = 2\u03c0r (equivalently \u03c0d) and A = \u03c0r\u00b2 ' +
      '— never \u03c0d\u00b2.',
    targetedMisconceptions: [`${CIRCL}:MC-1`],
    source: `${CIRCL_SRC} — MC-1 RADIUS-DIAMETER-CONFUSION (convert-to-r-first discipline + double-counting diagnosis)`,
  },
  {
    conceptId: CIRCL,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u03c0 is not 3.14 — 3.14 is a convenient approximation of \u03c0, the ' +
      'way \u201cabout 6 feet\u201d approximates a person\u2019s height. \u03c0 is an ' +
      'exact number (the true ratio of any circle\u2019s circumference to ' +
      'its diameter) whose decimals never end and never repeat, so ' +
      'ANY decimal you write is already rounded. That is why exact ' +
      'answers keep the symbol: a circle of radius 3 has area 9\u03c0, ' +
      'exactly — writing 28.26 is an approximation, and marking ' +
      'schemes distinguish the two. Treat \u03c0 like x in algebra: it ' +
      'multiplies, factors, and cancels symbolically (2\u03c0r \u00d7 3 = 6\u03c0r; ' +
      '\u03c0r\u00b2/\u03c0 = r\u00b2). Reach for 3.14 only at the final step, and only ' +
      'when the question asks for a decimal.',
    targetedMisconceptions: [`${CIRCL}:MC-2`],
    source: `${CIRCL_SRC} — MC-2 PI-IS-APPROXIMATE-ONLY (exact-symbol vs approximation; \u03c0-as-algebraic-symbol bridge)`,
  },
]

const CIRCL_PROBES: SeedProbe[] = [
  {
    conceptId: CIRCL,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A circle has diameter 10. What is its area?',
    choices: [
      { text: '25\u03c0 — first convert: r = 5, then A = \u03c0r\u00b2', isCorrect: true },
      { text: '100\u03c0 — A = \u03c0d\u00b2 with d = 10', isCorrect: false, misconceptionId: `${CIRCL}:MC-1` },
      { text: '10\u03c0 — A = \u03c0d', isCorrect: false, misconceptionId: `${CIRCL}:MC-1` },
    ],
    correctValue: '25\u03c0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CIRCL}:MC-1`],
    source: `${CIRCL_SRC} — MC-1 formula-substitution probe, distractor-mapped`,
  },
  {
    conceptId: CIRCL,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A question asks for the EXACT area of a circle with radius 3. Which answer is exact?',
    choices: [
      { text: '9\u03c0 — keeping the symbol keeps the value exact; any decimal is rounded', isCorrect: true },
      { text: '28.26 — using \u03c0 = 3.14, which is what \u03c0 equals', isCorrect: false, misconceptionId: `${CIRCL}:MC-2` },
    ],
    correctValue: '9\u03c0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CIRCL}:MC-2`],
    source: `${CIRCL_SRC} — MC-2 exact-vs-approximate probe, distractor-mapped`,
  },
]

// ─── eng.grammar.future-tenses ───────────────────────────────────────────────
const FUT = 'eng.grammar.future-tenses'
const FUT_SRC = 'docs/curriculum/blueprints/eng.grammar.future-tenses.md'

const FUT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FUT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cWill\u201d and \u201cgoing to\u201d both point at the future, but they ' +
      'carry different backstories. \u201cGoing to\u201d signals a PRIOR PLAN ' +
      'or a prediction from visible present evidence: \u201cI\u2019m going to ' +
      'visit my grandmother this weekend\u201d (already arranged); \u201cLook ' +
      'at those dark clouds — it\u2019s going to rain\u201d (the evidence is in ' +
      'front of you). \u201cWill\u201d signals a decision born THIS instant, a ' +
      'promise, or a general belief: the phone rings and you say ' +
      '\u201cI\u2019ll get it!\u201d — no plan existed two seconds ago; \u201cI think it ' +
      'will rain this week\u201d — opinion, not visible evidence. Casual ' +
      'speech blurs them constantly and that\u2019s fine; but when the ' +
      'moment of decision matters, the forms disagree: \u201cI\u2019m going to ' +
      'get it!\u201d for a ringing phone sounds oddly premeditated.',
    targetedMisconceptions: [`${FUT}:MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE`],
    source: `${FUT_SRC} — MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE (P30 plan/evidence vs spontaneous split + P33 clouds/phone pairs)`,
  },
  {
    conceptId: FUT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Can a present-tense verb talk about the future? Read this: ' +
      '\u201cThe train leaves at 6pm tonight.\u201d \u201cLeaves\u201d is grammatically ' +
      'simple present — yet the departure hasn\u2019t happened. English ' +
      'systematically borrows present forms for two future jobs: ' +
      'simple present for SCHEDULED, timetabled events (\u201cthe movie ' +
      'starts at 8\u201d, \u201cthe flight departs at noon\u201d) and present ' +
      'continuous for CONFIRMED personal arrangements (\u201cI\u2019m meeting ' +
      'her tomorrow\u201d). Context, not the verb form, carries the time: ' +
      '\u201cI\u2019m meeting her right now\u201d is present; add \u201ctomorrow\u201d and ' +
      'the same form is future. So the future toolbox has four tools ' +
      '— will, going to, present continuous (arrangements), simple ' +
      'present (schedules) — not two.',
    targetedMisconceptions: [`${FUT}:MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME`],
    source: `${FUT_SRC} — MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME (P28 train-leaves conflict + P33 now/tomorrow contrast)`,
  },
]

const FUT_PROBES: SeedProbe[] = [
  {
    conceptId: FUT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'The phone suddenly rings while you are talking with a friend. What do you most naturally say?',
    choices: [
      { text: '\u201cI\u2019ll get it!\u201d — \u201cwill\u201d fits a decision made at the moment of speaking', isCorrect: true },
      { text: 'Either — \u201cwill\u201d and \u201cgoing to\u201d always mean exactly the same thing', isCorrect: false, misconceptionId: `${FUT}:MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE` },
      { text: '\u201cI get it!\u201d — simple present for present events', isCorrect: false },
    ],
    correctValue: "I'll get it",
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FUT}:MC-WILL-AND-GOING-TO-ARE-FULLY-INTERCHANGEABLE`],
    source: `${FUT_SRC} — P28 spontaneous-decision scenario as probe`,
  },
  {
    conceptId: FUT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u201cThe train leaves at 6pm tonight,\u201d what time does the sentence refer to?',
    choices: [
      { text: 'The future — simple present is used for scheduled/timetabled events even though the form is present', isCorrect: true },
      { text: 'It must be wrong — only \u201cwill\u201d or \u201cgoing to\u201d can express future time', isCorrect: false, misconceptionId: `${FUT}:MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME` },
    ],
    correctValue: 'future (scheduled event)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FUT}:MC-PRESENT-TENSE-CANNOT-EXPRESS-FUTURE-TIME`],
    source: `${FUT_SRC} — P28 train-leaves conflict as probe`,
  },
]

// ─── math.arith.fraction-multiplication ──────────────────────────────────────
const FMUL = 'math.arith.fraction-multiplication'
const FMUL_SRC = 'docs/curriculum/blueprints/math.arith.fraction-multiplication.md'

const FMUL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FMUL,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      '1/2 \u00d7 1/3 asks: what is a THIRD of a HALF? Draw a rectangle. ' +
      'Cut it in half one way and shade a half; cut it in thirds the ' +
      'other way and shade a third. The overlap — where both shadings ' +
      'cross — is 1 cell out of 6: the grid has 2 \u00d7 3 = 6 cells total ' +
      '(multiply the denominators) and 1 \u00d7 1 = 1 doubly-shaded cell ' +
      '(multiply the numerators). So the rule multiply-top-times-top, ' +
      'bottom-times-bottom is just reading the grid. The ' +
      'addition-style answer \u201c2/5\u201d fails a sanity check that should ' +
      'run every time: a fraction OF a half must be SMALLER than a ' +
      'half, and 2/5 is not smaller than 1/2 the right way — the true ' +
      'product 1/6 is. No common denominators here: that machinery ' +
      'belongs to addition, where you combine like-sized pieces.',
    targetedMisconceptions: [`${FMUL}:MC-1`],
    source: `${FMUL_SRC} — MC-1 (P28 area-model conflict + smaller-than-either reasonableness check + P30 grid-count bridge)`,
  },
  {
    conceptId: FMUL,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'What is 3 \u00d7 2/5? Three copies of two-fifths: 2/5 + 2/5 + 2/5 ' +
      '= 6/5. The rule: the whole number multiplies the NUMERATOR ' +
      '(3 \u00d7 2 = 6) and the denominator stays 5 — because the SIZE of ' +
      'the pieces (fifths) hasn\u2019t changed, only how many you have. ' +
      'Writing 3 \u00d7 2/5 = 2/15 slides the 3 under the bar, which ' +
      'answers a totally different question (it divides by 3 instead ' +
      'of multiplying). Anchor: any whole number is a fraction over ' +
      '1 — write 3 as 3/1 and multiply straight across: 3/1 \u00d7 2/5 = ' +
      '6/5. Sanity check: three copies of something must be BIGGER ' +
      'than one copy — 6/5 is bigger than 2/5; 2/15 is smaller, so ' +
      'it cannot be right.',
    targetedMisconceptions: [`${FMUL}:MC-3`],
    source: `${FMUL_SRC} — MC-3 (repeated-addition anchor + 3-as-3/1 bridge + bigger-than-one-copy check)`,
  },
]

const FMUL_PROBES: SeedProbe[] = [
  {
    conceptId: FMUL,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 1/2 \u00d7 1/3?',
    choices: [
      { text: '1/6 — multiply tops (1\u00d71) and bottoms (2\u00d73); a third of a half is small', isCorrect: true },
      { text: '2/5 — add the tops and add the bottoms', isCorrect: false, misconceptionId: `${FMUL}:MC-1` },
      { text: '3/6 — make common denominators first', isCorrect: false, misconceptionId: `${FMUL}:MC-1` },
    ],
    correctValue: '1/6',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FMUL}:MC-1`],
    source: `${FMUL_SRC} — DB-1 diagnostic item, distractor-mapped`,
  },
  {
    conceptId: FMUL,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 3 \u00d7 2/5?',
    choices: [
      { text: '6/5 — three copies of two-fifths: the numerator triples, the piece size (fifths) stays', isCorrect: true },
      { text: '2/15 — the 3 multiplies the denominator', isCorrect: false, misconceptionId: `${FMUL}:MC-3` },
    ],
    correctValue: '6/5',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FMUL}:MC-3`],
    source: `${FMUL_SRC} — MC-3 trigger item, distractor-mapped`,
  },
]

// ─── math.geom.right-triangle ────────────────────────────────────────────────
const RTRI = 'math.geom.right-triangle'
const RTRI_SRC = 'docs/curriculum/blueprints/math.geom.right-triangle.md'

const RTRI_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RTRI,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The hypotenuse has exactly one definition: the side OPPOSITE ' +
      'the right angle. Not \u201cthe longest-looking side in the ' +
      'picture,\u201d not \u201cthe slanted one\u201d — textbook drawings usually ' +
      'put the right angle at the bottom corner so the hypotenuse ' +
      'happens to slope, and eyes learn the wrong shortcut. Rotate ' +
      'the triangle so the hypotenuse sits flat on the ground and it ' +
      'is still the hypotenuse. Finding it is a two-step ritual: ' +
      '(1) locate the little square marking the 90\u00b0 corner; ' +
      '(2) walk across the triangle to the side that does NOT touch ' +
      'that corner. (It IS always the longest side — the biggest ' +
      'angle faces the biggest side — but that is a consequence to ' +
      'check with, not the definition to search by.)',
    targetedMisconceptions: [`${RTRI}:MC-1`],
    source: `${RTRI_SRC} — MC-1 HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE (B01: rotate-the-triangle + two-step ritual)`,
  },
  {
    conceptId: RTRI,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'In a right triangle, one acute angle is 35\u00b0 — what is the ' +
      'other? Not 180 \u2212 35 = 145\u00b0: a 145\u00b0 angle plus the 90\u00b0 right ' +
      'angle already overflows the triangle\u2019s entire 180\u00b0 budget. ' +
      'The right angle spends 90\u00b0 of the 180\u00b0 up front, leaving ' +
      'exactly 90\u00b0 for the two acute angles TOGETHER: they are ' +
      'complementary, so the other angle is 90 \u2212 35 = 55\u00b0. The same ' +
      'budget argument kills a related idea — a triangle with TWO ' +
      'right angles: 90 + 90 = 180 spends everything, leaving 0\u00b0 for ' +
      'the third corner, and the two \u201csides\u201d would run parallel and ' +
      'never meet. One right angle per triangle, and its acute pair ' +
      'always sums to 90\u00b0.',
    targetedMisconceptions: [`${RTRI}:MC-2`, `${RTRI}:MC-3`],
    source: `${RTRI_SRC} — MC-2 ACUTE-ANGLES-SUM-TO-180 + MC-3 TWO-RIGHT-ANGLES-POSSIBLE (B02/B03: 180\u00b0-budget argument)`,
  },
]

const RTRI_PROBES: SeedProbe[] = [
  {
    conceptId: RTRI,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A right triangle is drawn with its right angle at the TOP and one side vertical. Which side is the hypotenuse?',
    choices: [
      { text: 'The side opposite the right angle — regardless of how the triangle is rotated', isCorrect: true },
      { text: 'The slanted side — the hypotenuse always slopes', isCorrect: false, misconceptionId: `${RTRI}:MC-1` },
      { text: 'The vertical side — it looks longest in this drawing', isCorrect: false, misconceptionId: `${RTRI}:MC-1` },
    ],
    correctValue: 'opposite the right angle',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${RTRI}:MC-1`],
    source: `${RTRI_SRC} — MC-1 non-standard-orientation probe, distractor-mapped`,
  },
  {
    conceptId: RTRI,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'One acute angle of a right triangle is 35\u00b0. What is the other acute angle?',
    choices: [
      { text: '55\u00b0 — the right angle uses 90\u00b0, so the two acute angles share the remaining 90\u00b0', isCorrect: true },
      { text: '145\u00b0 — subtract from 180\u00b0', isCorrect: false, misconceptionId: `${RTRI}:MC-2` },
    ],
    correctValue: '55\u00b0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RTRI}:MC-2`],
    source: `${RTRI_SRC} — MC-2 trigger item, distractor-mapped`,
  },
]

// ─── eng.grammar.prepositions ────────────────────────────────────────────────
const PREP = 'eng.grammar.prepositions'
const PREP_SRC = 'docs/curriculum/blueprints/eng.grammar.prepositions.md'

const PREP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PREP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Prepositions are relationship words — and location is only ' +
      'their most photogenic job. \u201cThe keys are IN the box\u201d: ' +
      'location, easy to picture. But \u201cthe meeting is AT 3pm\u201d places ' +
      'nothing in space — it anchors an event in TIME. Same little ' +
      'words, several kinds of relationship: place (in the box, on ' +
      'the table, under the bed), time (at 3pm, on Monday, in 2020, ' +
      'during lunch, since May), means (by train, with a hammer), ' +
      'company (with my friend), topic (about physics), and more ' +
      '(of, for, despite, without). Watch \u201cin\u201d switch hats: \u201cin the ' +
      'kitchen\u201d is where, \u201cin January\u201d is when. When a preposition ' +
      'refuses to make spatial sense, don\u2019t force a picture — ask ' +
      'what RELATIONSHIP it is drawing instead.',
    targetedMisconceptions: [`${PREP}:MC-PREPOSITIONS-ONLY-SHOW-LOCATION`],
    source: `${PREP_SRC} — MC-PREPOSITIONS-ONLY-SHOW-LOCATION (P28 at-3pm conflict + P33 in-box/in-2020 pair)`,
  },
  {
    conceptId: PREP,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Why \u201cgood AT math\u201d and not \u201cgood IN math\u201d? Honestly: no deep ' +
      'reason — it is the conventional pairing English settled on, ' +
      'and that is the real lesson. Many adjective- and ' +
      'verb-preposition combinations are IDIOMS to memorize as fixed ' +
      'pairs, not puzzles to reason out: interested IN, afraid OF ' +
      '(never \u201cafraid from,\u201d a classic transfer error from other ' +
      'languages), proud OF, depend ON, believe IN, listen TO. Logic ' +
      'and translation from your first language will both betray you ' +
      'here — each language wired its own pairings. The good news: ' +
      'the list is bounded, the pairs are extremely frequent (so ' +
      'practice comes free), and learning them AS pairs — record ' +
      '\u201cdepend on,\u201d never bare \u201cdepend\u201d — is a normal part of ' +
      'vocabulary, not a failure to find the hidden rule. There ' +
      'isn\u2019t one.',
    targetedMisconceptions: [`${PREP}:MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING`],
    source: `${PREP_SRC} — MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING (P28 good-at conflict + s6 bounded-memorization framing)`,
  },
]

const PREP_PROBES: SeedProbe[] = [
  {
    conceptId: PREP,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u201cThe meeting is at 3pm,\u201d what relationship does \u201cat\u201d express?',
    choices: [
      { text: 'Time — prepositions cover time, means, and other relationships, not just location', isCorrect: true },
      { text: 'Location — prepositions always show where something is', isCorrect: false, misconceptionId: `${PREP}:MC-PREPOSITIONS-ONLY-SHOW-LOCATION` },
      { text: 'None — \u201cat\u201d is not a preposition here', isCorrect: false },
    ],
    correctValue: 'time',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PREP}:MC-PREPOSITIONS-ONLY-SHOW-LOCATION`],
    source: `${PREP_SRC} — P28 conflict item as probe`,
  },
  {
    conceptId: PREP,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which is the correct English expression?',
    choices: [
      { text: '\u201cShe is afraid OF spiders\u201d — afraid + of is a fixed conventional pairing to memorize', isCorrect: true },
      { text: '\u201cShe is afraid FROM spiders\u201d — fear comes from the spiders, so logic says \u201cfrom\u201d', isCorrect: false, misconceptionId: `${PREP}:MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING` },
    ],
    correctValue: 'afraid of',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PREP}:MC-PREPOSITION-CHOICE-IS-PREDICTABLE-FROM-MEANING`],
    source: `${PREP_SRC} — P33 afraid-of/afraid-from pair as probe`,
  },
]

// ─── math.prob.classical-probability ─────────────────────────────────────────
const CPROB = 'math.prob.classical-probability'
const CPROB_SRC = 'docs/curriculum/blueprints/math.prob.classical-probability.md'

const CPROB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CPROB,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The classical formula P(A) = |A|/|\u03a9| — favorable outcomes over ' +
      'total outcomes — comes with a licence condition people forget ' +
      'to read: every outcome must be EQUALLY LIKELY. A biased coin ' +
      'that lands heads 70% of the time still has two outcomes, ' +
      '{H, T}; count them and the formula says 1/2 — flatly wrong, ' +
      'because the outcomes were never equally likely. \u201cTwo outcomes, ' +
      'so 50-50\u201d confuses listing with symmetry. Equal likelihood is ' +
      'a PREcondition you must justify from the physical setup — a ' +
      'fair die\u2019s symmetry, a well-shuffled deck, a balanced spinner ' +
      '— before counting is allowed. No symmetry, no classical ' +
      'formula: you need measured frequencies instead.',
    targetedMisconceptions: [`${CPROB}:MC-1`],
    source: `${CPROB_SRC} — MC-1 (biased-coin probe + equally-likely-as-precondition bridge)`,
  },
  {
    conceptId: CPROB,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two technical words in the classical formula trip students. ' +
      '\u201cFAVORABLE\u201d does not mean \u201cthe outcomes I want\u201d — it means ' +
      'every outcome where the event OCCURS. For A = \u201croll at least ' +
      '3,\u201d the favorable set is {3, 4, 5, 6}: four outcomes, ' +
      '|A| = 4, P(A) = 4/6 — whether or not you were hoping for a 6. ' +
      'Write the event as a SET and count its members; preference is ' +
      'irrelevant. And the SAMPLE SPACE must be built from ' +
      'non-overlapping building blocks: writing \u03a9 = {1, 2, 3, 4, 5, ' +
      '6, \u201cany even number\u201d} and claiming |\u03a9| = 7 double-counts — ' +
      '\u201cany even\u201d overlaps 2, 4, 6, which are already listed. Each ' +
      'trial produces exactly ONE outcome; \u03a9 lists those atomic ' +
      'results once each, and events are subsets you count within it.',
    targetedMisconceptions: [`${CPROB}:MC-2`, `${CPROB}:MC-3`],
    source: `${CPROB_SRC} — MC-2 (favorable = membership in A) + MC-3 (mutual-exclusivity of \u03a9)`,
  },
]

const CPROB_PROBES: SeedProbe[] = [
  {
    conceptId: CPROB,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A biased coin lands heads 70% of the time. Since there are two outcomes {H, T}, is P(heads) = 1/2?',
    choices: [
      { text: 'No — the classical formula requires EQUALLY LIKELY outcomes; a biased coin has none, so P(H) = 0.7', isCorrect: true },
      { text: 'Yes — two outcomes always means 50-50', isCorrect: false, misconceptionId: `${CPROB}:MC-1` },
    ],
    correctValue: 'no — outcomes not equally likely',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CPROB}:MC-1`],
    source: `${CPROB_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: CPROB,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Event A = \u201croll at least 3\u201d on a fair die. How many favorable outcomes are there?',
    choices: [
      { text: '4 — favorable means every outcome where A occurs: {3, 4, 5, 6}', isCorrect: true },
      { text: '1 — favorable means the outcome I want, and I want a 6', isCorrect: false, misconceptionId: `${CPROB}:MC-2` },
    ],
    correctValue: '4',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CPROB}:MC-2`],
    source: `${CPROB_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── math.alg.like-terms ─────────────────────────────────────────────────────
const LIKE = 'math.alg.like-terms'
const LIKE_SRC = 'docs/curriculum/blueprints/math.alg.like-terms.md'

const LIKE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LIKE,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Combining like terms is fruit-counting: 3 apples + 2 apples = ' +
      '5 apples, but 3 apples + 2 bananas is just\u2026 3 apples and 2 ' +
      'bananas. In algebra the \u201cfruit\u201d is the variable part: 3x + 2x ' +
      '= 5x (same fruit), but 3x + 2y stays 3x + 2y — there is no 5x, ' +
      'no 5y, and definitely no 5xy hiding in it. Test with numbers: ' +
      'at x = 10, y = 1, 3x + 2y = 32, while \u201c5xy\u201d = 50 — not the ' +
      'same expression. Two terms are LIKE only when their variable ' +
      'parts match EXACTLY — same letters, same exponents. Then you ' +
      'add the coefficients and leave the variable part untouched: ' +
      'it is the label on the box, not a number in the sum.',
    targetedMisconceptions: [`${LIKE}:MC-1`],
    source: `${LIKE_SRC} — MC-1 VARIABLE-PARTS-IGNORED (B01: fruit-counting anchor + numeric substitution check)`,
  },
  {
    conceptId: LIKE,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Two exponent traps in combining terms. Trap 1: 3x\u00b2 + 2x\u00b2 is ' +
      'NOT 5x\u2074. Adding like terms adds the COUNTS: three x\u00b2-boxes ' +
      'plus two x\u00b2-boxes is five x\u00b2-boxes — 5x\u00b2. Exponents add only ' +
      'when you MULTIPLY powers (x\u00b2 \u00b7 x\u00b2 = x\u2074); addition never ' +
      'touches the exponent. Check at x = 2: 3(4) + 2(4) = 20 = ' +
      '5x\u00b2 \u2713, while 5x\u2074 = 80 \u2717. Trap 2: x + x\u00b2 does not combine ' +
      'at all — \u201cboth have x\u201d is not enough; x and x\u00b2 are different ' +
      'variable parts (different fruit), so neither 2x nor 2x\u00b2 is ' +
      'right, and x + x\u00b2 is already fully simplified. Rule of thumb: ' +
      'like terms differ ONLY in their coefficient.',
    targetedMisconceptions: [`${LIKE}:MC-2`, `${LIKE}:MC-3`],
    source: `${LIKE_SRC} — MC-2 EXPONENT-ADDS-WHEN-COMBINING + MC-3 UNLIKE-TERMS-FORCED (B02/B03: count-vs-multiply split + substitution checks)`,
  },
]

const LIKE_PROBES: SeedProbe[] = [
  {
    conceptId: LIKE,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Simplify: 3x\u00b2 + 2x\u00b2',
    choices: [
      { text: '5x\u00b2 — add the coefficients; the variable part is the unchanged label', isCorrect: true },
      { text: '5x\u2074 — add the coefficients and the exponents', isCorrect: false, misconceptionId: `${LIKE}:MC-2` },
      { text: 'It cannot be simplified', isCorrect: false },
    ],
    correctValue: '5x\u00b2',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LIKE}:MC-2`],
    source: `${LIKE_SRC} — MC-2 trigger item, distractor-mapped`,
  },
  {
    conceptId: LIKE,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Simplify: x + x\u00b2',
    choices: [
      { text: 'It is already simplified — x and x\u00b2 have different variable parts, so they are not like terms', isCorrect: true },
      { text: '2x\u00b2 (or 2x) — both terms have x, so they combine', isCorrect: false, misconceptionId: `${LIKE}:MC-3` },
    ],
    correctValue: 'already simplified',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LIKE}:MC-3`],
    source: `${LIKE_SRC} — MC-3 trigger item, distractor-mapped`,
  },
]

// ─── eng.grammar.adjectives ──────────────────────────────────────────────────
const ADJ = 'eng.grammar.adjectives'
const ADJ_SRC = 'docs/curriculum/blueprints/eng.grammar.adjectives.md'

const ADJ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ADJ,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Adjectives describe nouns from TWO positions, and both count. ' +
      'The obvious one sits right before the noun: \u201cthe RED ball,\u201d ' +
      '\u201ca HAPPY child\u201d (attributive). The other stands after a ' +
      'linking verb and describes the subject from a distance: \u201cThe ' +
      'ball IS red,\u201d \u201cThe child SEEMS happy\u201d (predicate). Same word, ' +
      'same describing job — only the seating changed. The linking ' +
      'verbs to watch for: is/are, seems, looks, feels, becomes, ' +
      'tastes, sounds — they connect a subject to its description ' +
      'rather than reporting an action. So when hunting adjectives ' +
      'in a sentence, check both seats: directly before nouns, AND ' +
      'right after linking verbs.',
    targetedMisconceptions: [`${ADJ}:MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN`],
    source: `${ADJ_SRC} — MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN (P30 attributive/predicate split + P33 pairs)`,
  },
  {
    conceptId: ADJ,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Say \u201ca wooden old table.\u201d Now say \u201can old wooden table.\u201d One ' +
      'of those made your ear itch — and native speakers could not ' +
      'tell you WHY, because the rule they are obeying was never ' +
      'taught to them. English stacks adjectives in a conventional ' +
      'order: OPINION \u2192 SIZE \u2192 AGE \u2192 SHAPE \u2192 COLOR \u2192 ORIGIN \u2192 ' +
      'MATERIAL \u2192 PURPOSE. Hence \u201ca lovely (opinion) small (size) ' +
      'old (age) round (shape) red (color) French (origin) wooden ' +
      '(material) dining (purpose) table\u201d flows, while any scramble ' +
      'of it clunks: \u201cbig red ball\u201d yes, \u201cred big ball\u201d no. Here is ' +
      'your unfair advantage as a learner: natives need years of ' +
      'exposure to absorb this feel — you get the explicit checklist ' +
      'today. When stacking two or more adjectives, run the order ' +
      'once before speaking.',
    targetedMisconceptions: [`${ADJ}:MC-ADJECTIVE-ORDER-DOESNT-MATTER`],
    source: `${ADJ_SRC} — MC-ADJECTIVE-ORDER-DOESNT-MATTER (P28 wooden-old ear test + P31 explicit order checklist)`,
  },
]

const ADJ_PROBES: SeedProbe[] = [
  {
    conceptId: ADJ,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u201cThe child seems happy,\u201d is \u201chappy\u201d an adjective?',
    choices: [
      { text: 'Yes — a predicate adjective after the linking verb \u201cseems,\u201d describing \u201cchild\u201d', isCorrect: true },
      { text: 'No — adjectives must come directly before the noun they describe', isCorrect: false, misconceptionId: `${ADJ}:MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN` },
      { text: 'No — \u201chappy\u201d is a verb here', isCorrect: false },
    ],
    correctValue: 'yes — predicate adjective',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ADJ}:MC-ADJECTIVES-MUST-COME-BEFORE-THE-NOUN`],
    source: `${ADJ_SRC} — P33 seems-happy pair as probe`,
  },
  {
    conceptId: ADJ,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which phrase sounds natural to a fluent English speaker?',
    choices: [
      { text: '\u201cAn old wooden table\u201d — age comes before material in the conventional adjective order', isCorrect: true },
      { text: 'Both are equally natural — adjective order doesn\u2019t matter in English', isCorrect: false, misconceptionId: `${ADJ}:MC-ADJECTIVE-ORDER-DOESNT-MATTER` },
    ],
    correctValue: 'an old wooden table',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ADJ}:MC-ADJECTIVE-ORDER-DOESNT-MATTER`],
    source: `${ADJ_SRC} — P28 ear-test conflict as probe`,
  },
]

// ─── math.arith.order-of-operations ──────────────────────────────────────────
const OOP = 'math.arith.order-of-operations'
const OOP_SRC = 'docs/curriculum/blueprints/math.arith.order-of-operations.md'

const OOP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OOP,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Why isn\u2019t 3 + 4 \u00d7 2 just \u201cread left to right\u201d = 14? Because ' +
      'math gave multiplication a higher RANK, and for a reason: ' +
      '4 \u00d7 2 is shorthand for 4 + 4 — a package deal that must be ' +
      'unwrapped before it can join an addition. So 3 + 4 \u00d7 2 means ' +
      '3 + (4 + 4) = 11. Without ranks, the same expression would ' +
      'mean different things to different readers — the rules are a ' +
      'shared contract, not a trick. The ladder: parentheses first ' +
      '(they override everything), then exponents, then ' +
      'multiplication/division, then addition/subtraction. Reading ' +
      'order still matters WITHIN a rank — but between ranks, the ' +
      'higher rank always goes first, wherever it sits in the line.',
    targetedMisconceptions: [`${OOP}:MC-1`, `${OOP}:MC-2`],
    source: `${OOP_SRC} — MC-1 LEFT-TO-RIGHT-ONLY + MC-2 ADDITION-BEFORE-MULTIPLICATION (B01/B02: package-deal rationale + shared-contract framing)`,
  },
  {
    conceptId: OOP,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'The M-before-D trap: 12 \u00f7 4 \u00d7 3. If \u201cmultiplication comes ' +
      'before division\u201d (the letter order in PEMDAS/BODMAS seems to ' +
      'say so!), you\u2019d compute 12 \u00f7 (4 \u00d7 3) = 1. Wrong. ' +
      'Multiplication and division are the SAME rank — equal ' +
      'partners, like addition and subtraction — and equal ranks are ' +
      'processed left to right: (12 \u00f7 4) \u00d7 3 = 9. The acronym\u2019s ' +
      'letters are a memory aid, not a strict queue: read MD as one ' +
      'tier and AS as one tier. Same trap on the bottom rung: ' +
      '10 \u2212 3 + 2 is (10 \u2212 3) + 2 = 9, not 10 \u2212 (3 + 2) = 5. Two ' +
      'tiers of rank, left-to-right inside each tier.',
    targetedMisconceptions: [`${OOP}:MC-3`],
    source: `${OOP_SRC} — MC-3 MULTIPLICATION-BEFORE-DIVISION-ALWAYS (B03: same-rank left-to-right rule + acronym-as-memory-aid caveat)`,
  },
]

const OOP_PROBES: SeedProbe[] = [
  {
    conceptId: OOP,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 3 + 4 \u00d7 2?',
    choices: [
      { text: '11 — multiplication outranks addition: 3 + 8', isCorrect: true },
      { text: '14 — work left to right: 7 \u00d7 2', isCorrect: false, misconceptionId: `${OOP}:MC-1` },
    ],
    correctValue: '11',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${OOP}:MC-1`, `${OOP}:MC-2`],
    source: `${OOP_SRC} — MC-1 trigger expression, distractor-mapped`,
  },
  {
    conceptId: OOP,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is 12 \u00f7 4 \u00d7 3?',
    choices: [
      { text: '9 — \u00d7 and \u00f7 are the same rank, so work left to right: (12 \u00f7 4) \u00d7 3', isCorrect: true },
      { text: '1 — multiplication comes before division: 12 \u00f7 (4 \u00d7 3)', isCorrect: false, misconceptionId: `${OOP}:MC-3` },
    ],
    correctValue: '9',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${OOP}:MC-3`],
    source: `${OOP_SRC} — MC-3 trigger expression, distractor-mapped`,
  },
]

// ─── math.arith.ratios ───────────────────────────────────────────────────────
const RAT = 'math.arith.ratios'
const RAT_SRC = 'docs/curriculum/blueprints/math.arith.ratios.md'

const RAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RAT,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A ratio is a directed comparison — the ORDER is half the ' +
      'information. \u201c3 apples to 5 oranges\u201d (3:5) and \u201c5 oranges to ' +
      '3 apples\u201d (5:3) describe the same fruit bowl, but as RATIOS ' +
      'they are different statements, the way \u201cI am taller than you\u201d ' +
      'and \u201cyou are taller than me\u201d are different claims. The first ' +
      'number always belongs to the first-named thing. This matters ' +
      'the moment ratios do work: a recipe of 1 part syrup to 4 ' +
      'parts water (1:4) makes juice; 4:1 makes syrup soup. Habit to ' +
      'build: before writing any ratio, say out loud WHICH quantity ' +
      'is being compared TO which — then keep that order everywhere ' +
      'downstream.',
    targetedMisconceptions: [`${RAT}:MC-1`],
    source: `${RAT_SRC} — MC-1 ratio-commutativity (order-as-information; recipe consequence)`,
  },
  {
    conceptId: RAT,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A bag has 6 red and 10 blue marbles. \u201cThe ratio of red to ' +
      'blue\u201d is 6:10 — PART to PART. \u201cThe fraction of marbles that ' +
      'are red\u201d is 6/16 — PART to WHOLE. Different questions, ' +
      'different answers; mixing them is the classic ratio error. ' +
      'Check which is being asked: does the sentence name TWO parts ' +
      '(red to blue), or one part against the TOTAL? And when you ' +
      'simplify 6:10 to 3:5, nothing shrinks — the bag still holds ' +
      '6 red and 10 blue; 3:5 just states the same RELATIONSHIP in ' +
      'smallest terms, exactly like 6/10 = 3/5 as fractions: \u201cfor ' +
      'every 3 red there are 5 blue.\u201d Simplifying renames the ' +
      'comparison; it never changes the quantities.',
    targetedMisconceptions: [`${RAT}:MC-2`, `${RAT}:MC-3`],
    source: `${RAT_SRC} — MC-2 part-to-part vs part-to-whole + MC-3 simplification-changes-quantities (same-relationship reframe)`,
  },
]

const RAT_PROBES: SeedProbe[] = [
  {
    conceptId: RAT,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A bag has 6 red and 10 blue marbles. What is the ratio of red to blue?',
    choices: [
      { text: '6:10 (= 3:5) — part to part, in the order named', isCorrect: true },
      { text: '10:6 — order doesn\u2019t matter in a ratio', isCorrect: false, misconceptionId: `${RAT}:MC-1` },
      { text: '6:16 — red compared to all the marbles', isCorrect: false, misconceptionId: `${RAT}:MC-2` },
    ],
    correctValue: '6:10',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${RAT}:MC-1`, `${RAT}:MC-2`],
    source: `${RAT_SRC} — MC-1/MC-2 combined probe, distractor-mapped`,
  },
  {
    conceptId: RAT,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'The ratio 6:10 is simplified to 3:5. Did the number of items change?',
    choices: [
      { text: 'No — 3:5 describes the same relationship in smallest terms; the quantities are untouched', isCorrect: true },
      { text: 'Yes — the 6 items became 3 items and the 10 became 5', isCorrect: false, misconceptionId: `${RAT}:MC-3` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RAT}:MC-3`],
    source: `${RAT_SRC} — MC-3 probe, distractor-mapped`,
  },
]

// ─── math.found.rational-numbers ─────────────────────────────────────────────
const RATL = 'math.found.rational-numbers'
const RATL_SRC = 'docs/curriculum/blueprints/math.found.rational-numbers.md'

const RATL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RATL,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A rational number is not a fraction — it is the VALUE that ' +
      'infinitely many fractions share. 1/2, 2/4, 3/6, 50/100 are ' +
      'four names for one number: one single point on the number ' +
      'line. Simplifying doesn\u2019t \u201cchange the number\u201d — it switches ' +
      'to the shortest name (the canonical form p/q in lowest terms, ' +
      'convenient but no more \u201creal\u201d than the others). Formally, ℚ\u2019s ' +
      'elements are these families of equivalent fractions: a/b and ' +
      'c/d name the same rational exactly when ad = bc — the ' +
      'cross-multiplication test. This number-vs-name split is the ' +
      'gateway idea for everything after: adding fractions is ' +
      'CHOOSING convenient names (common denominators) for numbers ' +
      'that never moved.',
    targetedMisconceptions: [`${RATL}:MC-1`],
    source: `${RATL_SRC} — MC-1 FRACTION-UNIQUE (TA-B01: value-vs-name split; ad = bc equivalence test)`,
  },
  {
    conceptId: RATL,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Is 1/3 = 0.333\u2026 \u201cnot really rational\u201d because the decimal ' +
      'never ends? Backwards: rationality is about the FRACTION ' +
      'form, not the decimal\u2019s length. 1/3 is one integer over ' +
      'another — rational by definition; its endless decimal is just ' +
      'an artifact of base ten (in base 3 it is exactly 0.1). The ' +
      'real rule: a rational\u2019s decimal either TERMINATES (when the ' +
      'denominator\u2019s only prime factors are 2 and 5, like 1/4 = ' +
      '0.25) or REPEATS forever in a block (1/3 = 0.3\u0305, 1/7 = ' +
      '0.142857\u0305). What rationals can never do is run forever WITHOUT ' +
      'repeating — that behaviour belongs to the irrationals (\u221a2, ' +
      '\u03c0). So: repeating = rational; non-repeating-forever = ' +
      'irrational; \u201cnever ends\u201d alone decides nothing.',
    targetedMisconceptions: [`${RATL}:MC-3`],
    source: `${RATL_SRC} — MC-3 RATIONAL-TERMINATING (TA-B03: terminate-or-repeat dichotomy; base-dependence of decimals)`,
  },
]

const RATL_PROBES: SeedProbe[] = [
  {
    conceptId: RATL,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Are 1/2 and 2/4 the same rational number?',
    choices: [
      { text: 'Yes — they are two names for one value (cross-check: 1\u00d74 = 2\u00d72); one point on the number line', isCorrect: true },
      { text: 'No — they are written differently, so they are different rational numbers', isCorrect: false, misconceptionId: `${RATL}:MC-1` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${RATL}:MC-1`],
    source: `${RATL_SRC} — MC-1 trigger as probe, distractor-mapped`,
  },
  {
    conceptId: RATL,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The decimal of 1/3 never ends (0.333\u2026). Is 1/3 rational?',
    choices: [
      { text: 'Yes — it is an integer over an integer; rational decimals either terminate or repeat, and 0.333\u2026 repeats', isCorrect: true },
      { text: 'No — a truly rational number must have a terminating decimal', isCorrect: false, misconceptionId: `${RATL}:MC-3` },
    ],
    correctValue: 'yes — repeating decimal',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RATL}:MC-3`],
    source: `${RATL_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── phys.em.dc-circuits ─────────────────────────────────────────────────────
const DCC = 'phys.em.dc-circuits'
const DCC_SRC = 'docs/curriculum/blueprints/phys.em.dc-circuits.md'

const DCC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DCC,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Parallel branches share the VOLTAGE, not the current — that is ' +
      'the defining feature to build on. Put 2 \u03a9 and 8 \u03a9 in parallel ' +
      'across 10 V: each branch feels the full 10 V, so each draws ' +
      'its own current: I\u2081 = 10/2 = 5 A through the easy path, I\u2082 = ' +
      '10/8 = 1.25 A through the hard one. Nothing like an equal ' +
      'split — the current divides INVERSELY with resistance, like ' +
      'traffic between a four-lane highway and a narrow lane under ' +
      'the same pressure. Divider shortcut for two branches: I\u2081/I\u2082 = ' +
      'R\u2082/R\u2081. Equal currents happen only in the special case of ' +
      'equal resistances; the general rule is each branch computes ' +
      'V/R for itself, and the totals add.',
    targetedMisconceptions: [`${DCC}:MC-SAME-CURRENT-IN-PARALLEL-BRANCHES`],
    source: `${DCC_SRC} — MC-SAME-CURRENT-IN-PARALLEL-BRANCHES (P28 2\u03a9/8\u03a9 computation + s6 parallel-pipes analogy)`,
  },
  {
    conceptId: DCC,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Does every resistor in a series loop get the battery\u2019s full ' +
      '12 V? A voltmeter settles it: across R\u2081 = 4 \u03a9 it reads 4 V; ' +
      'across R\u2082 = 8 \u03a9 it reads 8 V; only across the battery does it ' +
      'read 12 V. The supply voltage is a BUDGET spent around the ' +
      'loop: with I = 12/12 = 1 A flowing, each resistor drops ' +
      'V = IR — more resistance, bigger share — and the drops sum ' +
      'exactly back to the supply (Kirchhoff\u2019s voltage law). Like a ' +
      'river descending over successive rocks, the total height loss ' +
      'equals the sum of the individual drops — no rock gets the ' +
      'whole descent. Series: current identical everywhere, voltage ' +
      'divided by resistance share (V_k/V = R_k/R_total).',
    targetedMisconceptions: [`${DCC}:MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES`],
    source: `${DCC_SRC} — MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES (s6 voltmeter measurement + P30 river-descent bridge)`,
  },
]

const DCC_PROBES: SeedProbe[] = [
  {
    conceptId: DCC,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'R\u2081 = 2 \u03a9 and R\u2082 = 8 \u03a9 are in parallel across 10 V. What are the branch currents?',
    choices: [
      { text: 'I\u2081 = 5 A, I\u2082 = 1.25 A — same voltage on each branch; current is V/R per branch', isCorrect: true },
      { text: 'Both carry the same current — parallel branches split the current equally', isCorrect: false, misconceptionId: `${DCC}:MC-SAME-CURRENT-IN-PARALLEL-BRANCHES` },
      { text: 'I\u2081 = 1.25 A, I\u2082 = 5 A — the bigger resistor takes more current', isCorrect: false },
    ],
    correctValue: '5 A and 1.25 A',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DCC}:MC-SAME-CURRENT-IN-PARALLEL-BRANCHES`],
    source: `${DCC_SRC} — P28 numeric case as probe, distractor-mapped`,
  },
  {
    conceptId: DCC,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A 12 V battery drives R\u2081 = 4 \u03a9 and R\u2082 = 8 \u03a9 in SERIES. What does a voltmeter read across R\u2081?',
    choices: [
      { text: '4 V — the supply divides in proportion to resistance (V\u2081 = IR\u2081 = 1 A \u00d7 4 \u03a9); drops sum to 12 V', isCorrect: true },
      { text: '12 V — every element in the circuit gets the full battery voltage', isCorrect: false, misconceptionId: `${DCC}:MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES` },
    ],
    correctValue: '4 V',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DCC}:MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES`],
    source: `${DCC_SRC} — s6 voltmeter measurement as probe, distractor-mapped`,
  },
]

// ─── phys.opt.lenses ─────────────────────────────────────────────────────────
const LENS = 'phys.opt.lenses'
const LENS_SRC = 'docs/curriculum/blueprints/phys.opt.lenses.md'

const LENS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LENS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A \u201cconverging\u201d lens does not converge everything — the label ' +
      'describes what it does to PARALLEL rays only. Hold a ' +
      'magnifying glass (convex, f = +20 cm) close over printed text ' +
      '(object inside F, say u = \u221210 cm) and the lens formula gives ' +
      '1/v = 1/20 \u2212 1/10 \u2192 v = \u221220 cm: NEGATIVE, meaning the image ' +
      'sits on the SAME side as the object — a virtual, magnified ' +
      'image, and the exit beam actually DIVERGES. The lens still ' +
      'bends every ray toward the axis, just not enough to make them ' +
      'cross. So never classify an image from the lens type alone: ' +
      'compute v from 1/v = 1/f + 1/u and let its sign answer — ' +
      'v > 0 real (beam converges), v < 0 virtual (beam diverges). ' +
      'Object beyond F: projector mode. Inside F: magnifying-glass ' +
      'mode. Same lens.',
    targetedMisconceptions: [`${LENS}:MC-CONVEX-ALWAYS-CONVERGES`],
    source: `${LENS_SRC} — MC-CONVEX-ALWAYS-CONVERGES (P28 TA-3 case-6 computation + s6 magnifying-glass observation)`,
  },
  {
    conceptId: LENS,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Lens magnification is m = v/u — do NOT import the mirror\u2019s ' +
      'm = \u2212v/u. The stray minus flips your answer\u2019s orientation: ' +
      'with v = +60 cm, u = \u221230 cm, the lens formula gives m = ' +
      '60/(\u221230) = \u22122 (inverted, correct — the ray diagram agrees); ' +
      'the smuggled mirror formula gives +2 (erect, wrong). The ' +
      'geometric reason the formulas differ: a mirror\u2019s object and ' +
      'image live on the SAME side of the reflecting surface, which ' +
      'plants a negative in the derivation; a lens transmits, object ' +
      'and image on OPPOSITE sides, no geometric negative. Write ' +
      'them as a pair and keep them apart forever: LENS m = v/u; ' +
      'MIRROR m = \u2212v/u.',
    targetedMisconceptions: [`${LENS}:MC-MAGNIFICATION-MIRROR-SIGN`],
    source: `${LENS_SRC} — MC-MAGNIFICATION-MIRROR-SIGN (P28 WE-1 double-computation + P30 same-side/opposite-side geometry)`,
  },
]

const LENS_PROBES: SeedProbe[] = [
  {
    conceptId: LENS,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An object is placed INSIDE the focal length of a convex lens (u = \u221210 cm, f = +20 cm). The image is:',
    choices: [
      { text: 'Virtual, same side, magnified — v = \u221220 cm; the exit beam diverges (magnifying-glass mode)', isCorrect: true },
      { text: 'Real and converging — a convex lens always converges the light to a real image', isCorrect: false, misconceptionId: `${LENS}:MC-CONVEX-ALWAYS-CONVERGES` },
    ],
    correctValue: 'virtual, magnified',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LENS}:MC-CONVEX-ALWAYS-CONVERGES`],
    source: `${LENS_SRC} — MC-CONVEX-ALWAYS-CONVERGES probe (case-6 numbers), distractor-mapped`,
  },
  {
    conceptId: LENS,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'For a LENS with v = +60 cm and u = \u221230 cm, what is the magnification?',
    choices: [
      { text: 'm = v/u = \u22122 — inverted; the lens formula has no minus sign', isCorrect: true },
      { text: 'm = \u2212v/u = +2 — erect; magnification is always \u2212v/u', isCorrect: false, misconceptionId: `${LENS}:MC-MAGNIFICATION-MIRROR-SIGN` },
    ],
    correctValue: '\u22122 (inverted)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LENS}:MC-MAGNIFICATION-MIRROR-SIGN`],
    source: `${LENS_SRC} — MC-MAGNIFICATION-MIRROR-SIGN probe (WE-1 numbers), distractor-mapped`,
  },
]

// ─── eng.grammar.subject-verb-agreement ──────────────────────────────────────
const SVA = 'eng.grammar.subject-verb-agreement'
const SVA_SRC = 'docs/curriculum/blueprints/eng.grammar.subject-verb-agreement.md'

const SVA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SVA,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cThe box of toys ARE on the floor\u201d — sounds plausible, and is ' +
      'wrong. The verb must agree with the TRUE subject, and the true ' +
      'subject here is BOX (singular), not the nearby \u201ctoys.\u201d The ' +
      'phrase \u201cof toys\u201d is a prepositional hitchhiker describing the ' +
      'box; it has no vote on the verb. The reliable trick: mentally ' +
      'CROSS OUT every phrase between subject and verb, then listen — ' +
      '\u201cThe box \u2026 IS on the floor.\u201d Same cure for the classic \u201cOne ' +
      'of the students HAVE finished\u201d: cross out \u201cof the students\u201d ' +
      'and the subject is ONE — \u201cOne \u2026 HAS finished.\u201d The nearest ' +
      'noun is a decoy precisely because it sits next to the verb; ' +
      'the subject can be several words away and still owns the ' +
      'agreement.',
    targetedMisconceptions: [`${SVA}:MC-AGREE-WITH-THE-NEAREST-NOUN`],
    source: `${SVA_SRC} — MC-AGREE-WITH-THE-NEAREST-NOUN (P30 cross-out-the-phrase technique + P33 box/one pairs)`,
  },
  {
    conceptId: SVA,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A team has many players — so \u201cthe team ARE playing well\u201d? In ' +
      'standard American English, no: collective nouns (team, family, ' +
      'group, committee, audience) name a group acting as ONE unit ' +
      'and take a SINGULAR verb — \u201cThe team IS playing well,\u201d \u201cThe ' +
      'committee HAS decided,\u201d \u201cThe family IS coming to dinner.\u201d ' +
      'The logic \u201cmany people = plural verb\u201d is reasonable but loses ' +
      'to convention: the noun packages the group into a single ' +
      'grammatical thing. (British English does often say \u201cthe team ' +
      'ARE\u201d to spotlight the individual members — a genuine dialect ' +
      'difference, not an error — but the American default is ' +
      'singular.) Default rule: group word acting as one unit \u2192 ' +
      'singular verb.',
    targetedMisconceptions: [`${SVA}:MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS`],
    source: `${SVA_SRC} — MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS (P30 unit-packaging bridge + British-variant honesty)`,
  },
]

const SVA_PROBES: SeedProbe[] = [
  {
    conceptId: SVA,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence is correct?',
    choices: [
      { text: '\u201cThe box of toys IS on the floor\u201d — the true subject is \u201cbox\u201d (singular); \u201cof toys\u201d has no vote', isCorrect: true },
      { text: '\u201cThe box of toys ARE on the floor\u201d — the verb agrees with \u201ctoys,\u201d the noun next to it', isCorrect: false, misconceptionId: `${SVA}:MC-AGREE-WITH-THE-NEAREST-NOUN` },
    ],
    correctValue: 'The box of toys is on the floor',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SVA}:MC-AGREE-WITH-THE-NEAREST-NOUN`],
    source: `${SVA_SRC} — P33 box-of-toys pair as probe`,
  },
  {
    conceptId: SVA,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In standard American English, which is the default?',
    choices: [
      { text: '\u201cThe team IS practicing\u201d — collective nouns act as one unit and take a singular verb', isCorrect: true },
      { text: '\u201cThe team ARE practicing\u201d — a team is many people, so the verb must be plural', isCorrect: false, misconceptionId: `${SVA}:MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS` },
    ],
    correctValue: 'The team is practicing',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SVA}:MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS`],
    source: `${SVA_SRC} — P33 team pair as probe`,
  },
]

// ─── math.calc.limits ────────────────────────────────────────────────────────
const LIM = 'math.calc.limits'
const LIM_SRC = 'docs/curriculum/blueprints/math.calc.limits.md'

const LIM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LIM,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A limit asks where a function is HEADING, not where it IS. ' +
      'Take f(x) = (x\u00b2\u22121)/(x\u22121) at x = 1: plugging in gives 0/0 — ' +
      'undefined. Yet walk x toward 1 and watch the outputs: f(0.9) = ' +
      '1.9, f(0.99) = 1.99, f(1.01) = 2.01 — the function is heading ' +
      'to 2 from both sides, so lim_{x\u21921} f(x) = 2, even though f(1) ' +
      'does not exist. (Algebraically the ratio simplifies to x + 1 ' +
      'everywhere except the single missing point — the graph is a ' +
      'line with a hole in it.) The limit and the value are separate ' +
      'questions: for nice continuous functions they happen to agree, ' +
      'which is why the habit \u201climit = plug in\u201d forms — and exactly ' +
      'why holes, jumps, and piecewise functions break it. A limit ' +
      'never requires f(a) to be defined; it only requires the ' +
      'approach to settle.',
    targetedMisconceptions: [`${LIM}:MC-1`, `${LIM}:MC-2`],
    source: `${LIM_SRC} — MC-1 LIMIT-IS-THE-FUNCTION-VALUE + MC-2 LIMIT-REQUIRES-f(a)-DEFINED (TA-B01: hole-in-the-line construction)`,
  },
  {
    conceptId: LIM,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A two-sided limit exists only when BOTH one-sided approaches ' +
      'agree — checking one side is half a proof. The standard trap: ' +
      'f(x) = |x|/x near 0. From the right, every value is +1, so ' +
      'lim_{x\u21920\u207a} = 1. Report that as \u201cthe limit\u201d and you\u2019ve missed ' +
      'the left side: for negative x, |x|/x = \u22121, so lim_{x\u21920\u207b} = ' +
      '\u22121. The two sides disagree \u2192 lim_{x\u21920} does NOT exist — the ' +
      'graph jumps. Procedure to internalize: compute left, compute ' +
      'right, compare. Equal \u2192 that shared value is the limit. ' +
      'Different \u2192 no two-sided limit, full stop. One-sided limits ' +
      'are real, useful objects — but only their agreement earns the ' +
      'unqualified word \u201climit.\u201d',
    targetedMisconceptions: [`${LIM}:MC-3`],
    source: `${LIM_SRC} — MC-3 ONE-SIDED-EQUALS-TWO-SIDED (TA-B02: |x|/x jump case + left-right-compare procedure)`,
  },
]

const LIM_PROBES: SeedProbe[] = [
  {
    conceptId: LIM,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'f(x) = (x\u00b2\u22124)/(x\u22122) is undefined at x = 2. What is lim_{x\u21922} f(x)?',
    choices: [
      { text: '4 — the ratio simplifies to x + 2 away from the point; the approach settles at 4 even though f(2) is undefined', isCorrect: true },
      { text: 'It does not exist — a limit requires f(2) to be defined', isCorrect: false, misconceptionId: `${LIM}:MC-2` },
      { text: '0/0 — plug in x = 2', isCorrect: false, misconceptionId: `${LIM}:MC-1` },
    ],
    correctValue: '4',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LIM}:MC-1`, `${LIM}:MC-2`],
    source: `${LIM_SRC} — MC-2 surface-form case as probe, distractor-mapped`,
  },
  {
    conceptId: LIM,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For f(x) = |x|/x, the right-hand limit at 0 is +1. What is lim_{x\u21920} f(x)?',
    choices: [
      { text: 'It does not exist — the left-hand limit is \u22121, and the two sides must agree', isCorrect: true },
      { text: '+1 — the right-hand limit is the limit', isCorrect: false, misconceptionId: `${LIM}:MC-3` },
    ],
    correctValue: 'does not exist',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LIM}:MC-3`],
    source: `${LIM_SRC} — MC-3 surface-form case as probe, distractor-mapped`,
  },
]

// ─── math.calc.derivative-intro ──────────────────────────────────────────────
const DRV = 'math.calc.derivative-intro'
const DRV_SRC = 'docs/curriculum/blueprints/math.calc.derivative-intro.md'

const DRV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DRV,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '\u201cSpeed at one instant makes no sense — you need a time ' +
      'interval!\u201d That objection is correct about measurement and is ' +
      'exactly the puzzle the derivative solves. Your speedometer ' +
      'reads 60 km/h RIGHT NOW — what does that even mean? Not change ' +
      'divided by zero time. It means: measure the average speed over ' +
      'a shrinking window — the last second, the last tenth, the last ' +
      'thousandth — and watch the averages HEAD somewhere: 59.1, ' +
      '59.9, 59.99\u2026 \u2192 60. The derivative is that destination — the ' +
      'LIMIT of average rates as the window shrinks — never a ' +
      'division by an interval of zero. The same move builds the ' +
      'tangent slope: you truly cannot make a slope from one point, ' +
      'so take a second point on the curve, compute the two-point ' +
      'slope, and slide the second point toward the first; the ' +
      'slopes\u2019 destination is the tangent\u2019s slope. The limit ' +
      'manufactures the missing second point.',
    targetedMisconceptions: [`${DRV}:MC-2`, `${DRV}:MC-1`],
    source: `${DRV_SRC} — MC-2 INSTANTANEOUS-IS-UNDEFINED + MC-1 TANGENT-IS-JUST-ONE-POINT (TA-B01/B02: shrinking-window + sliding-secant constructions)`,
  },
  {
    conceptId: DRV,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Computing [f(x+h)\u2212f(x)]/h at h = 0.001 and calling the result ' +
      'the derivative confuses an APPROXIMATION with the exact value. ' +
      'For f(x) = x\u00b2 at x = 1, h = 0.001 gives 2.001 — close to 2, ' +
      'but 2.001 is not the derivative; it is one secant slope. Do ' +
      'the algebra with h left as a symbol: [(x+h)\u00b2 \u2212 x\u00b2]/h = ' +
      '(2xh + h\u00b2)/h = 2x + h. NOW take the limit as h \u2192 0: exactly ' +
      '2x, so exactly 2 at x = 1. The limit is a PROCESS completed ' +
      'symbolically, not a small number plugged in: any specific h, ' +
      'however tiny, leaves a leftover +h in the answer. Small-h ' +
      'evaluation is how computers approximate; the limit is how ' +
      'mathematics gets it exact.',
    targetedMisconceptions: [`${DRV}:MC-3`],
    source: `${DRV_SRC} — MC-3 DIFFERENCE-QUOTIENT-IS-THE-DERIVATIVE (TA-B02: symbolic 2x + h computation vs numeric 2.001)`,
  },
]

const DRV_PROBES: SeedProbe[] = [
  {
    conceptId: DRV,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For f(x) = x\u00b2, a student computes [f(1.001) \u2212 f(1)]/0.001 = 2.001 and reports \u201cthe derivative at 1 is 2.001.\u201d What is right?',
    choices: [
      { text: 'The derivative is exactly 2 — the difference quotient simplifies to 2 + h, and the LIMIT as h \u2192 0 removes the leftover h', isCorrect: true },
      { text: '2.001 is the derivative — h = 0.001 is small enough to be exact', isCorrect: false, misconceptionId: `${DRV}:MC-3` },
    ],
    correctValue: 'exactly 2',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DRV}:MC-3`],
    source: `${DRV_SRC} — MC-3 surface form as probe, distractor-mapped`,
  },
  {
    conceptId: DRV,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: '\u201cYou can\u2019t find the slope of a tangent — it only touches ONE point, and slope needs two.\u201d How does calculus answer this?',
    choices: [
      { text: 'Take a second point on the CURVE, compute the secant slope, and slide it toward the first: the limit of those slopes defines the tangent slope', isCorrect: true },
      { text: 'It can\u2019t be answered — tangent lines genuinely have no slope', isCorrect: false, misconceptionId: `${DRV}:MC-1` },
    ],
    correctValue: 'limit of secant slopes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DRV}:MC-1`],
    source: `${DRV_SRC} — MC-1 surface form as probe, distractor-mapped`,
  },
]

// ─── math.func.function-concept ──────────────────────────────────────────────
const FUNC = 'math.func.function-concept'
const FUNC_SRC = 'docs/curriculum/blueprints/math.func.function-concept.md'

const FUNC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FUNC,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'f(x) is NOT f times x. In algebra, side-by-side letters ' +
      'multiply (2x, 3a) — function notation breaks that convention ' +
      'and nobody warns you. Here f is a RULE\u2019S NAME, and f(x) reads ' +
      '\u201cthe output of rule f at input x.\u201d If f(x) = x + 2, then f(3) ' +
      'means \u201cfeed 3 into the rule\u201d: 3 + 2 = 5. Try the ' +
      'multiplication reading instead — f(3) = 3f — and you get an ' +
      'equation with an unknown number f that leads nowhere: the ' +
      'notation was never arithmetic. Picture f as a machine with a ' +
      'slot: f(3) is what falls out when you drop 3 in. That reading ' +
      'makes sense of everything later: f(a+1) means feed in a+1, ' +
      'f(g(x)) means chain two machines — none of it is ' +
      'multiplication.',
    targetedMisconceptions: [`${FUNC}:MC-3`],
    source: `${FUNC_SRC} — MC-3 f(x)-means-f-times-x (P28 contradiction + P30 rule-name bridge + machine model)`,
  },
  {
    conceptId: FUNC,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Is f(x) = x\u00b2 disqualified as a function because f(2) and ' +
      'f(\u22122) both equal 4? Read the definition carefully: each INPUT ' +
      'gets exactly one output. Check: does 2 have one output? Yes — ' +
      '4. Does \u22122 have one output? Yes — 4. Every input behaves; x\u00b2 ' +
      'is a function. Two inputs SHARING an output is perfectly ' +
      'legal. The stricter property — each output coming from only ' +
      'one input — has its own name: ONE-TO-ONE, and x\u00b2 is a ' +
      'function that is not one-to-one. The two ideas are ' +
      'independent axes, giving four kinds of relation: function & ' +
      'one-to-one (x\u00b3), function & not one-to-one (x\u00b2), not a ' +
      'function at all (x = y\u00b2 read as y in terms of x, one input \u2192 ' +
      'two outputs). The arrow direction is everything: function ' +
      'restricts INPUT\u2192output; one-to-one restricts output\u2190input.',
    targetedMisconceptions: [`${FUNC}:MC-4`],
    source: `${FUNC_SRC} — MC-4 one-to-one-is-the-definition (P28 input-by-input check + P30 orthogonal-axes bridge + P31 2\u00d72 table)`,
  },
]

const FUNC_PROBES: SeedProbe[] = [
  {
    conceptId: FUNC,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'If f(x) = x + 2, what is f(3)?',
    choices: [
      { text: '5 — feed 3 into the rule: 3 + 2', isCorrect: true },
      { text: '3f — f(3) means f multiplied by 3', isCorrect: false, misconceptionId: `${FUNC}:MC-3` },
      { text: '3x + 2 — multiply the rule by 3', isCorrect: false, misconceptionId: `${FUNC}:MC-3` },
    ],
    correctValue: '5',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FUNC}:MC-3`],
    source: `${FUNC_SRC} — DB-3 evaluation task as probe, distractor-mapped`,
  },
  {
    conceptId: FUNC,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'f(2) = 4 and f(\u22122) = 4 for f(x) = x\u00b2. Is x\u00b2 a function?',
    choices: [
      { text: 'Yes — each input has exactly one output; two inputs may share an output (it just isn\u2019t one-to-one)', isCorrect: true },
      { text: 'No — the same output appearing twice violates the definition of a function', isCorrect: false, misconceptionId: `${FUNC}:MC-4` },
    ],
    correctValue: 'yes — not one-to-one, still a function',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FUNC}:MC-4`],
    source: `${FUNC_SRC} — MC-4 diagnostic trigger as probe, distractor-mapped`,
  },
]

// ─── phys.mod.photoelectric-effect ───────────────────────────────────────────
const PHOT = 'phys.mod.photoelectric-effect'
const PHOT_SRC = 'docs/curriculum/blueprints/phys.mod.photoelectric-effect.md'

const PHOT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHOT,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Double the brightness of the light on a metal surface — do the ' +
      'ejected electrons come out faster? No. The experiment is ' +
      'unambiguous: doubling intensity doubles the NUMBER of ' +
      'electrons per second (photocurrent) and leaves their maximum ' +
      'kinetic energy exactly unchanged. The photon model explains ' +
      'it: intensity = photons per second; each photon still carries ' +
      'the same energy E = h\u03bd, set by FREQUENCY alone. One photon ' +
      'ejects one electron with KE_max = h\u03bd \u2212 \u03c6 (the work function ' +
      '\u03c6 is the escape fee). More photons \u2192 more electrons, same ' +
      'energy each. The clean split to memorize: frequency controls ' +
      'the ENERGY of each electron; intensity controls the COUNT.',
    targetedMisconceptions: [`${PHOT}:MC-BRIGHTER-LIGHT-FASTER-ELECTRONS`],
    source: `${PHOT_SRC} — MC-1 (P28 intensity-doubling experiment + P30 photon-count bridge; KE_max = h\u03bd \u2212 \u03c6)`,
  },
  {
    conceptId: PHOT,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Shine an extremely bright red lamp (below the threshold ' +
      'frequency) on the metal for an hour. Electrons eventually? ' +
      'Never — not one, ever, and this refusal broke classical ' +
      'physics. The wave picture said energy accumulates in the ' +
      'surface until an electron saves up enough; it predicted a ' +
      'delay, then emission. Reality: below threshold, nothing, at ' +
      'any intensity, for any duration — and above threshold, ' +
      'emission is essentially instantaneous even in dim light. The ' +
      'photon story: each red photon carries h\u03bd_red < \u03c6 — it knocks ' +
      'on the door without the key, and photons do NOT pool their ' +
      'energy. A billion underpowered knocks opens nothing; one ' +
      'photon with h\u03bd \u2265 \u03c6 opens the door immediately. Energy comes ' +
      'in indivisible packets — that is the whole revolution.',
    targetedMisconceptions: [`${PHOT}:MC-ANY-FREQUENCY-WORKS-WITH-ENOUGH-INTENSITY`],
    source: `${PHOT_SRC} — MC-2 (P28 no-emission-below-threshold + instantaneous emission + P30 no-pooling bridge)`,
  },
]

const PHOT_PROBES: SeedProbe[] = [
  {
    conceptId: PHOT,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Light above threshold frequency shines on a metal. The intensity is doubled (same frequency). What changes?',
    choices: [
      { text: 'The photocurrent doubles; KE_max is unchanged — each photon still carries the same h\u03bd', isCorrect: true },
      { text: 'The electrons come out with twice the kinetic energy — brighter light, faster electrons', isCorrect: false, misconceptionId: `${PHOT}:MC-BRIGHTER-LIGHT-FASTER-ELECTRONS` },
      { text: 'Both the current and KE_max double', isCorrect: false, misconceptionId: `${PHOT}:MC-BRIGHTER-LIGHT-FASTER-ELECTRONS` },
    ],
    correctValue: 'current doubles, KE_max unchanged',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHOT}:MC-BRIGHTER-LIGHT-FASTER-ELECTRONS`],
    source: `${PHOT_SRC} — MC-1 P33 discrimination options as probe`,
  },
  {
    conceptId: PHOT,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A very bright red lamp (below threshold frequency) shines on a metal for one hour. Are electrons emitted?',
    choices: [
      { text: 'No — each photon carries h\u03bd < \u03c6 and photons never pool energy; below threshold there is no emission at any intensity or duration', isCorrect: true },
      { text: 'Yes, eventually — the energy accumulates in the surface until electrons have enough', isCorrect: false, misconceptionId: `${PHOT}:MC-ANY-FREQUENCY-WORKS-WITH-ENOUGH-INTENSITY` },
    ],
    correctValue: 'no — never',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHOT}:MC-ANY-FREQUENCY-WORKS-WITH-ENOUGH-INTENSITY`],
    source: `${PHOT_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── math.trig.right-triangle-trig ───────────────────────────────────────────
const RTT = 'math.trig.right-triangle-trig'
const RTT_SRC = 'docs/curriculum/blueprints/math.trig.right-triangle-trig.md'

const RTT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RTT,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'SOH-CAH-TOA only works if you label the sides correctly — and ' +
      'the labels are RELATIVE TO THE ANGLE, not to how the triangle ' +
      'is drawn. From your chosen angle \u03b8: the HYPOTENUSE is fixed ' +
      '(always across from the right angle, always the longest); the ' +
      'OPPOSITE side is the one \u03b8 does NOT touch — across the ' +
      'triangle from it; the ADJACENT side is the one \u03b8 DOES touch ' +
      'that isn\u2019t the hypotenuse. Switch to the other acute angle ' +
      'and opposite/adjacent swap jobs — that is why sin(30\u00b0) = ' +
      'cos(60\u00b0). Ritual for every problem: mark \u03b8, mark the right ' +
      'angle, find the hypotenuse first, then ask \u201cdoes \u03b8 touch this ' +
      'side?\u201d — touches \u2192 adjacent, doesn\u2019t \u2192 opposite. Never ' +
      'label by position on the page; rotated triangles are the ' +
      'standard exam trap.',
    targetedMisconceptions: [`${RTT}:MC-1`],
    source: `${RTT_SRC} — MC-1 OPPOSITE-ADJACENT-SWAP (TA-B01: relative-to-angle labelling ritual; sin30=cos60 check)`,
  },
  {
    conceptId: RTT,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two guard rails for SOH-CAH-TOA. First: it applies to RIGHT ' +
      'triangles only. \u201cHypotenuse\u201d is literally defined as the side ' +
      'opposite the 90\u00b0 angle — a triangle without a right angle has ' +
      'no hypotenuse, so opposite/hypotenuse is meaningless there ' +
      '(the longest side is not a substitute; non-right triangles ' +
      'need the sine or cosine rule instead). Check for the little ' +
      'square before writing any ratio. Second: keep TOA separate ' +
      'from SOH — tan \u03b8 = opposite/ADJACENT, not ' +
      'opposite/hypotenuse. In a 3-4-5 triangle at the angle ' +
      'opposite the 3: sin = 3/5, tan = 3/4. The prominent 5 lures ' +
      'every ratio toward it; only sine and cosine are allowed to ' +
      'use it. Quick self-check: tan must exceed sin for the same ' +
      'angle (its denominator is smaller).',
    targetedMisconceptions: [`${RTT}:MC-2`, `${RTT}:MC-3`],
    source: `${RTT_SRC} — MC-2 TRIG-APPLIES-TO-ALL-TRIANGLES + MC-3 TAN-IS-OPP-OVER-HYP (TA-B02/B03: no-hypotenuse argument + 3-4-5 contrast)`,
  },
]

const RTT_PROBES: SeedProbe[] = [
  {
    conceptId: RTT,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a 3-4-5 right triangle, consider the angle opposite the side of length 3. What is tan of that angle?',
    choices: [
      { text: '3/4 — tan = opposite/adjacent', isCorrect: true },
      { text: '3/5 — tan = opposite/hypotenuse', isCorrect: false, misconceptionId: `${RTT}:MC-3` },
      { text: '4/5 — tan = adjacent/hypotenuse', isCorrect: false },
    ],
    correctValue: '3/4',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RTT}:MC-3`],
    source: `${RTT_SRC} — MC-3 trigger item (3-4-5), distractor-mapped`,
  },
  {
    conceptId: RTT,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A triangle has sides 5, 7, 8 and NO right angle. Can you find an angle with sin \u03b8 = 5/8 (opposite over longest side)?',
    choices: [
      { text: 'No — SOH-CAH-TOA requires a right triangle; without a 90\u00b0 angle there is no hypotenuse (use the sine/cosine rule instead)', isCorrect: true },
      { text: 'Yes — the longest side acts as the hypotenuse in any triangle', isCorrect: false, misconceptionId: `${RTT}:MC-2` },
    ],
    correctValue: 'no — right triangles only',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RTT}:MC-2`],
    source: `${RTT_SRC} — MC-2 surface form as probe, distractor-mapped`,
  },
]

// ─── math.trig.trig-functions ────────────────────────────────────────────────
const TRIG = 'math.trig.trig-functions'
const TRIG_SRC = 'docs/curriculum/blueprints/math.trig.trig-functions.md'

const TRIG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRIG,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Is sin(120\u00b0) undefined because 120\u00b0 is \u201ctoo big for a ' +
      'triangle\u201d? Only if you stop at the right-triangle definition. ' +
      'The unit circle upgrades it: put an angle\u2019s arm at the origin, ' +
      'sweep counterclockwise from the positive x-axis, and read off ' +
      'the arm\u2019s tip — cos is its x-coordinate, sin its ' +
      'y-coordinate. Now EVERY angle works: sin(120\u00b0) = \u221a3/2 (the ' +
      'tip is high in the second quadrant), sin(270\u00b0) = \u22121, ' +
      'sin(\u221230\u00b0) = \u22121/2 (sweep clockwise), sin(400\u00b0) = sin(40\u00b0) ' +
      '(a full lap plus 40\u00b0). The right-triangle picture survives ' +
      'inside the first quadrant as a special case; the circle is ' +
      'the real definition, and it is what lets sin and cos describe ' +
      'waves, rotations, and anything periodic.',
    targetedMisconceptions: [`${TRIG}:MC-3`],
    source: `${TRIG_SRC} — MC-3 DOMAIN-RESTRICTED-TO-FIRST-QUADRANT (TA-B03: unit-circle extension; right-triangle as special case)`,
  },
  {
    conceptId: TRIG,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two period traps. First: \u201csin repeats every 360\u201d is only true ' +
      'in DEGREES. In radians — the default for real-number inputs — ' +
      'the period is 2\u03c0 \u2248 6.28, because 360\u00b0 IS 2\u03c0 radians. ' +
      'sin(x + 360) with x in radians adds 57+ full laps plus a bit ' +
      '— not a period. Always ask which unit the variable is in ' +
      'before quoting a period. Second: not every trig function has ' +
      'period 2\u03c0. tan repeats every \u03c0, half as often as you\u2019d ' +
      'guess: moving half a circle flips BOTH sin and cos (both gain ' +
      'a minus sign), and in the ratio tan = sin/cos the two minus ' +
      'signs cancel — tan(x + \u03c0) = (\u2212sin x)/(\u2212cos x) = tan x. So: ' +
      'sin, cos \u2192 period 2\u03c0 (or 360\u00b0); tan \u2192 period \u03c0 (or 180\u00b0).',
    targetedMisconceptions: [`${TRIG}:MC-1`, `${TRIG}:MC-2`],
    source: `${TRIG_SRC} — MC-1 PERIOD-IS-360-IN-RADIANS + MC-2 TAN-PERIOD-IS-2PI (TA-B01/B02: unit check + sign-cancellation trace)`,
  },
]

const TRIG_PROBES: SeedProbe[] = [
  {
    conceptId: TRIG,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Working in radians, what is the period of sin(x)?',
    choices: [
      { text: '2\u03c0 — the radian equivalent of 360\u00b0', isCorrect: true },
      { text: '360 — sine always repeats every 360 units', isCorrect: false, misconceptionId: `${TRIG}:MC-1` },
      { text: '\u03c0 — half a circle', isCorrect: false, misconceptionId: `${TRIG}:MC-2` },
    ],
    correctValue: '2\u03c0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TRIG}:MC-1`],
    source: `${TRIG_SRC} — MC-1 trigger as probe, distractor-mapped`,
  },
  {
    conceptId: TRIG,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is sin(120\u00b0) defined?',
    choices: [
      { text: 'Yes — on the unit circle sin is the y-coordinate of the angle\u2019s tip, defined for every angle; sin(120\u00b0) = \u221a3/2', isCorrect: true },
      { text: 'No — sine only exists for angles under 90\u00b0, inside a right triangle', isCorrect: false, misconceptionId: `${TRIG}:MC-3` },
    ],
    correctValue: 'yes, \u221a3/2',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TRIG}:MC-3`],
    source: `${TRIG_SRC} — MC-3 surface form as probe, distractor-mapped`,
  },
]

// ─── phys.wave.doppler-effect ────────────────────────────────────────────────
const DOP = 'phys.wave.doppler-effect'
const DOP_SRC = 'docs/curriculum/blueprints/phys.wave.doppler-effect.md'

const DOP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DOP,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'An approaching siren sounds higher-pitched — but its sound is ' +
      'NOT travelling faster. Wave speed is the medium\u2019s property: ' +
      'sound moves at ~343 m/s through the air whether the ambulance ' +
      'is parked or racing at 30 m/s. What the motion changes is the ' +
      'SPACING of the wavefronts: moving toward you, the source ' +
      'chases its own waves and piles the crests closer together in ' +
      'front (like a boat\u2019s bow wave) — shorter wavelength — while ' +
      'stretching them out behind. With v fixed and \u03bb compressed, ' +
      'v = f\u03bb forces the observed frequency UP in front and DOWN ' +
      'behind. The Doppler effect is a wavelength shift heard as a ' +
      'pitch shift — the speed never budges.',
    targetedMisconceptions: [`${DOP}:MC-DOPPLER-CHANGES-SPEED`],
    source: `${DOP_SRC} — MC-DOPPLER-CHANGES-SPEED (P28 medium-sets-speed + s6 bow-wave anchor + P30 v = f\u03bb argument)`,
  },
  {
    conceptId: DOP,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The Doppler effect is not a sound trick — it works for EVERY ' +
      'wave, and half of modern measurement is built on that fact. ' +
      'Light: galaxies receding from us arrive red-shifted ' +
      '(wavelengths stretched) — Hubble read the expansion of the ' +
      'universe straight off those shifts in 1929. Microwaves: a ' +
      'police radar gun clocks your car from the frequency shift of ' +
      'its reflected ~24 GHz beam. Ultrasound: Doppler scans measure ' +
      'blood-flow speed from shifts in reflected sound. Weather ' +
      'radar reads wind the same way. If something oscillates, the ' +
      'oscillation propagates, and the source or observer moves — ' +
      'there is a Doppler shift. (For light near light-speed the ' +
      'formula gains relativistic corrections, but the effect is the ' +
      'same physics.)',
    targetedMisconceptions: [`${DOP}:MC-DOPPLER-ONLY-FOR-SOUND`],
    source: `${DOP_SRC} — MC-DOPPLER-ONLY-FOR-SOUND (P28 redshift/radar/ultrasound catalogue + s6 universality rule)`,
  },
]

const DOP_PROBES: SeedProbe[] = [
  {
    conceptId: DOP,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An ambulance approaches you at 30 m/s with its siren on. How fast does its sound travel through the air toward you?',
    choices: [
      { text: '~343 m/s — wave speed is set by the medium; the motion compresses wavelengths, raising the PITCH, not the speed', isCorrect: true },
      { text: '~373 m/s — the ambulance\u2019s speed adds to the sound\u2019s speed', isCorrect: false, misconceptionId: `${DOP}:MC-DOPPLER-CHANGES-SPEED` },
    ],
    correctValue: '343 m/s',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DOP}:MC-DOPPLER-CHANGES-SPEED`],
    source: `${DOP_SRC} — P33 approaching-siren pair as probe`,
  },
  {
    conceptId: DOP,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does the Doppler effect apply to light?',
    choices: [
      { text: 'Yes — receding galaxies are red-shifted (how Hubble found cosmic expansion); radar guns and Doppler ultrasound use the same physics', isCorrect: true },
      { text: 'No — the Doppler effect is specific to sound waves', isCorrect: false, misconceptionId: `${DOP}:MC-DOPPLER-ONLY-FOR-SOUND` },
    ],
    correctValue: 'yes — all waves',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DOP}:MC-DOPPLER-ONLY-FOR-SOUND`],
    source: `${DOP_SRC} — MC-DOPPLER-ONLY-FOR-SOUND probe, distractor-mapped`,
  },
]

// ─── phys.wave.standing-waves ────────────────────────────────────────────────
const STW = 'phys.wave.standing-waves'
const STW_SRC = 'docs/curriculum/blueprints/phys.wave.standing-waves.md'

const STW_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STW,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'In a standing wave, what exactly is \u201cstanding\u201d? The PATTERN — ' +
      'never the medium. Watch a guitar string in slow motion: the ' +
      'nodes are pinned, truly motionless forever, but every other ' +
      'point vibrates up and down in place, and the antinodes swing ' +
      'hardest, oscillating between +2A and \u22122A. The equation splits ' +
      'the two roles cleanly: y = 2A sin(kx) \u00b7 cos(\u03c9t) — the sin(kx) ' +
      'factor is the frozen spatial envelope (where nodes and ' +
      'antinodes LIVE), the cos(\u03c9t) factor is the vigorous ' +
      'oscillation everyone inside the envelope performs. At an ' +
      'antinode: y = 2A at t = 0, zero a quarter-period later, \u22122A ' +
      'at half a period — anything but at rest. \u201cStanding\u201d means the ' +
      'nodal pattern doesn\u2019t TRAVEL, unlike an ordinary wave; the ' +
      'medium is as busy as ever.',
    targetedMisconceptions: [`${STW}:MC-STANDING-WAVE-IS-STATIONARY`],
    source: `${STW_SRC} — MC-STANDING-WAVE-IS-STATIONARY (P28 antinode time-trace + P30 pattern-vs-medium split)`,
  },
  {
    conceptId: STW,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'One formula does NOT fit all pipes — the ends decide. Rule ' +
      'pair: an OPEN end forces an ANTINODE (air free to move); a ' +
      'CLOSED end forces a NODE (air pinned). A pipe open at both ' +
      'ends fits antinode-to-antinode patterns: all harmonics, f_n = ' +
      'nv/2L, n = 1, 2, 3\u2026 A pipe closed at ONE end must fit a node ' +
      'at the bottom AND an antinode at the top — only quarter-wave ' +
      'patterns \u03bb = 4L, 4L/3, 4L/5\u2026 survive: f = v/4L and ONLY the ' +
      'odd multiples (no second harmonic exists — blow across a test ' +
      'tube and measure: the even resonances simply aren\u2019t there). ' +
      'Same length, different fundamentals too: open-open 50 cm pipe ' +
      '\u2192 340 Hz; close one end \u2192 170 Hz. Draw the end conditions ' +
      'first; the allowed harmonics follow automatically.',
    targetedMisconceptions: [`${STW}:MC-ALL-PIPES-SAME-HARMONICS`],
    source: `${STW_SRC} — MC-ALL-PIPES-SAME-HARMONICS (P30 boundary-condition filter + s6 open\u2194antinode/closed\u2194node rules + P33 50 cm pipe pair)`,
  },
]

const STW_PROBES: SeedProbe[] = [
  {
    conceptId: STW,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a standing wave on a string, which points of the medium never move?',
    choices: [
      { text: 'Only the nodes — every other point oscillates in place, antinodes with maximum amplitude', isCorrect: true },
      { text: 'All of them — a standing wave means the medium is at rest', isCorrect: false, misconceptionId: `${STW}:MC-STANDING-WAVE-IS-STATIONARY` },
      { text: 'The antinodes — they are where the pattern stands still', isCorrect: false, misconceptionId: `${STW}:MC-STANDING-WAVE-IS-STATIONARY` },
    ],
    correctValue: 'only the nodes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STW}:MC-STANDING-WAVE-IS-STATIONARY`],
    source: `${STW_SRC} — P33 zero-velocity discrimination as probe`,
  },
  {
    conceptId: STW,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A pipe closed at one end has fundamental 170 Hz. What is its next resonant frequency?',
    choices: [
      { text: '510 Hz — a closed-end pipe supports only odd harmonics (3 \u00d7 170)', isCorrect: true },
      { text: '340 Hz — the second harmonic is always double the fundamental', isCorrect: false, misconceptionId: `${STW}:MC-ALL-PIPES-SAME-HARMONICS` },
    ],
    correctValue: '510 Hz',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${STW}:MC-ALL-PIPES-SAME-HARMONICS`],
    source: `${STW_SRC} — P33 closed-pipe pair as probe`,
  },
]

// ─── phys.mech.torque ────────────────────────────────────────────────────────
const TORQ = 'phys.mech.torque'
const TORQ_SRC = 'docs/curriculum/blueprints/phys.mech.torque.md'

const TORQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TORQ,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Push a door at its edge, then push equally hard right next to ' +
      'the hinge — the difference you feel IS torque. Same 10 N ' +
      'force: at r = 0.8 m from the hinge it delivers \u03c4 = 8 N\u00b7m; at ' +
      'r = 0.05 m, just 0.5 N\u00b7m — sixteen times weaker. Torque is ' +
      'not force; it is force \u00d7 moment arm, \u03c4 = rF sin\u03b8, the ' +
      '\u201cturning effectiveness\u201d of a force about a pivot. The moment ' +
      'arm r is a full multiplier, which is why door handles sit at ' +
      'the far edge and wrenches are long: distance is as good as ' +
      'muscle. A small force far out can out-turn a big force close ' +
      'in — 10 N at 1 m (10 N\u00b7m) beats 50 N at 0.1 m (5 N\u00b7m).',
    targetedMisconceptions: [`${TORQ}:MC-TORQUE-IS-FORCE`],
    source: `${TORQ_SRC} — MC-TORQUE-IS-FORCE (P28 door-hinge 16\u00d7 computation + P33 50N/10N inversion + s6 door anchor)`,
  },
  {
    conceptId: TORQ,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The sin\u03b8 in \u03c4 = rF sin\u03b8 is not fine print — drop it and whole ' +
      'answers go wrong. Push 10 N along a 0.5 m lever STRAIGHT ' +
      'TOWARD the pivot (\u03b8 = 0\u00b0): the torque is exactly zero — a ' +
      'force aimed through the pivot has no turning effect at all, ' +
      'however hard you push (try spinning a wheel by pushing toward ' +
      'its axle). Only the component of force PERPENDICULAR to the ' +
      'lever turns anything, and sin\u03b8 measures precisely that ' +
      'fraction: \u03b8 = 90\u00b0 \u2192 full rF; \u03b8 = 30\u00b0 \u2192 half; \u03b8 = 0\u00b0 or ' +
      '180\u00b0 \u2192 nothing. Writing \u03c4 = rF is legal only after checking ' +
      'the force really is perpendicular — otherwise sin\u03b8 stays in ' +
      'the formula.',
    targetedMisconceptions: [`${TORQ}:MC-TORQUE-PERPENDICULAR-ONLY`],
    source: `${TORQ_SRC} — MC-TORQUE-PERPENDICULAR-ONLY (P28 \u03b8 = 0\u00b0 zero-torque conflict + P30 perpendicular-component bridge)`,
  },
]

const TORQ_PROBES: SeedProbe[] = [
  {
    conceptId: TORQ,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which produces more torque about a pivot: 50 N applied at r = 0.1 m, or 10 N applied (perpendicular) at r = 1 m?',
    choices: [
      { text: '10 N at 1 m — \u03c4 = 10 N\u00b7m beats 5 N\u00b7m; moment arm multiplies the force', isCorrect: true },
      { text: '50 N at 0.1 m — the bigger force always wins', isCorrect: false, misconceptionId: `${TORQ}:MC-TORQUE-IS-FORCE` },
      { text: 'They are equal', isCorrect: false },
    ],
    correctValue: '10 N at 1 m',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TORQ}:MC-TORQUE-IS-FORCE`],
    source: `${TORQ_SRC} — P33 discrimination pair as probe`,
  },
  {
    conceptId: TORQ,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A 10 N force acts on a 0.5 m lever, directed straight toward the pivot (\u03b8 = 0\u00b0). What torque does it produce?',
    choices: [
      { text: 'Zero — \u03c4 = rF sin\u03b8 and sin 0\u00b0 = 0; a force through the pivot has no turning effect', isCorrect: true },
      { text: '5 N\u00b7m — \u03c4 = rF; the angle factor barely matters', isCorrect: false, misconceptionId: `${TORQ}:MC-TORQUE-PERPENDICULAR-ONLY` },
    ],
    correctValue: 'zero',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TORQ}:MC-TORQUE-PERPENDICULAR-ONLY`],
    source: `${TORQ_SRC} — P28 \u03b8 = 0\u00b0 case as probe`,
  },
]

// ─── eng.vocab.prefixes ──────────────────────────────────────────────────────
const PFX = 'eng.vocab.prefixes'
const PFX_SRC = 'docs/curriculum/blueprints/eng.vocab.prefixes.md'

const PFX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PFX,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Prefixes are a vocabulary superpower — WHEN they are really ' +
      'there. \u201cRe-\u201d means \u201cagain\u201d in redo and rewrite\u2026 so does ' +
      '\u201crelax\u201d mean \u201clax again\u201d? There is no base word \u201clax\u201d being ' +
      'modified — the \u201cre\u201d in relax is just the word\u2019s first two ' +
      'letters, not a working prefix. Same with \u201cuncle\u201d: not ' +
      '\u201cnot-cle.\u201d The test before trusting any prefix reading: ' +
      'remove the suspected prefix and check whether a real, ' +
      'recognizable base word remains. redo \u2192 do \u2713 (\u201cdo again\u201d); ' +
      'unhappy \u2192 happy \u2713 (\u201cnot happy\u201d); relax \u2192 \u201clax\u201d? result \u2192 ' +
      '\u201csult\u201d? No — so no prefix meaning applies. Prefixes ARE ' +
      'reliable; the skill is confirming one is actually on duty.',
    targetedMisconceptions: [`${PFX}:MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING`],
    source: `${PFX_SRC} — MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING (P28 relax conflict + P31 remove-and-check test)`,
  },
  {
    conceptId: PFX,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Does \u201csubmarine\u201d mean \u201cnot a marine\u201d? Prefixes do far more ' +
      'than negate. Negation (un-, non-, dis-, in-/im-) is just one ' +
      'category of a richer menu: LOCATION — sub- = under ' +
      '(submarine), super- = above, inter- = between (international), ' +
      'trans- = across; TIME — pre- = before (prehistoric), post- = ' +
      'after, re- = again; NUMBER — bi- = two (bicycle), tri- = ' +
      'three, multi- = many; DEGREE — over- = too much (overcooked), ' +
      'under- = too little. When you meet a prefixed word, ask which ' +
      'CATEGORY the prefix belongs to before assuming \u201copposite\u201d: ' +
      'unhappy negates, but submarine locates, prehistoric dates, ' +
      'and bicycle counts. Reading prefixes by category unlocks ' +
      'hundreds of words per prefix.',
    targetedMisconceptions: [`${PFX}:MC-PREFIXES-ONLY-NEGATE-MEANING`],
    source: `${PFX_SRC} — MC-PREFIXES-ONLY-NEGATE-MEANING (P28 submarine conflict + P30 category menu)`,
  },
]

const PFX_PROBES: SeedProbe[] = [
  {
    conceptId: PFX,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In which word does \u201cre-\u201d actually function as the prefix meaning \u201cagain\u201d?',
    choices: [
      { text: '\u201cRewrite\u201d — removing re- leaves the real base word \u201cwrite\u201d: write again', isCorrect: true },
      { text: '\u201cRelax\u201d — re- always means again, so relax = lax again', isCorrect: false, misconceptionId: `${PFX}:MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING` },
      { text: 'Both equally — any word starting with re- uses the prefix', isCorrect: false, misconceptionId: `${PFX}:MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING` },
    ],
    correctValue: 'rewrite',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PFX}:MC-A-PREFIX-ALWAYS-HAS-ONE-FIXED-MEANING`],
    source: `${PFX_SRC} — P33 redo/relax pair as probe`,
  },
  {
    conceptId: PFX,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What does the prefix \u201csub-\u201d add in \u201csubmarine\u201d?',
    choices: [
      { text: 'Location: under (the sea) — prefixes express location, time, number, and degree, not only negation', isCorrect: true },
      { text: 'Negation: not a marine — prefixes reverse the base word\u2019s meaning', isCorrect: false, misconceptionId: `${PFX}:MC-PREFIXES-ONLY-NEGATE-MEANING` },
    ],
    correctValue: 'under',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PFX}:MC-PREFIXES-ONLY-NEGATE-MEANING`],
    source: `${PFX_SRC} — P28 submarine conflict as probe`,
  },
]

// ─── math.linalg.matrix-multiplication ───────────────────────────────────────
const MMUL = 'math.linalg.matrix-multiplication'
const MMUL_SRC = 'docs/curriculum/blueprints/math.linalg.matrix-multiplication.md'

const MMUL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MMUL,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Matrix multiplication is NOT element-by-element like scalar ' +
      'multiplication — it is rows-dotted-with-columns, and that ' +
      'demands a structural handshake: A(m\u00d7n) times B(p\u00d7q) only ' +
      'works when n = p — the inner numbers must match. Two matrices ' +
      'each 2\u00d73 CANNOT multiply as written (3 \u2260 2); the outer ' +
      'dimensions being equal is irrelevant. Why the rule exists: ' +
      'entry C_ij is the dot product of A\u2019s row i with B\u2019s column j — ' +
      'a dot product needs both vectors to have the SAME LENGTH, so ' +
      'A\u2019s row length (n) must equal B\u2019s column length (p). Before ' +
      'multiplying anything, write the dimensions side by side: ' +
      '(m\u00d7n)(p\u00d7q) — inner numbers (n, p) must agree; the result ' +
      'takes the outer numbers, m\u00d7q.',
    targetedMisconceptions: [`${MMUL}:MC-1`],
    source: `${MMUL_SRC} — MC-1 DIMENSION-RULE-IGNORED (TA-B01: dot-product length requirement as the structural reason)`,
  },
  {
    conceptId: MMUL,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Two traps once the dimension rule is clear. First: entry C_ij ' +
      'comes from ROW i of A dotted with COLUMN j of B — not column ' +
      'i of A with row j of B. Mixing the roles up computes a ' +
      'completely different (and usually undefined) pairing. Keep ' +
      'the mnemonic literal: \u201crow of the first, column of the ' +
      'second, always.\u201d Second, and more consequential: AB = BA is ' +
      'NOT generally true, unlike ordinary numbers. The entry formula ' +
      'itself is asymmetric between A and B (row-from-A meets ' +
      'column-from-B), so swapping the order changes which vectors ' +
      'get dotted with which — often changing even the RESULT\u2019S ' +
      'dimensions, let alone its values. Always compute AB and BA ' +
      'separately; never assume they match.',
    targetedMisconceptions: [`${MMUL}:MC-2`, `${MMUL}:MC-3`],
    source: `${MMUL_SRC} — MC-2 ROW-COLUMN-ORDER-REVERSED + MC-3 ASSUMES-COMMUTATIVITY (TA-B02: row-of-first/column-of-second mnemonic + asymmetric-formula argument)`,
  },
]

const MMUL_PROBES: SeedProbe[] = [
  {
    conceptId: MMUL,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Matrix A is 2\u00d73 and matrix B is 2\u00d73. Can you compute AB?',
    choices: [
      { text: 'No — the inner dimensions (3 and 2) don\u2019t match; multiplication requires A\u2019s columns to equal B\u2019s rows', isCorrect: true },
      { text: 'Yes — the result is 2\u00d73, since both matrices are 2\u00d73', isCorrect: false, misconceptionId: `${MMUL}:MC-1` },
    ],
    correctValue: 'no — dimensions incompatible',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MMUL}:MC-1`],
    source: `${MMUL_SRC} — MC-1 trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: MMUL,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For two square matrices A and B, is AB always equal to BA?',
    choices: [
      { text: 'No — matrix multiplication is generally non-commutative; AB and BA must be computed separately', isCorrect: true },
      { text: 'Yes — multiplication always commutes, just like with ordinary numbers', isCorrect: false, misconceptionId: `${MMUL}:MC-3` },
    ],
    correctValue: 'no, not in general',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MMUL}:MC-3`],
    source: `${MMUL_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.conjunctions ─────────────────────────────────────────────────
const CONJ = 'eng.grammar.conjunctions'
const CONJ_SRC = 'docs/curriculum/blueprints/eng.grammar.conjunctions.md'

const CONJ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONJ,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Not all conjunctions play the same role. COORDINATING ' +
      'conjunctions — and, but, or, so (remember FANBOYS: for, and, ' +
      'nor, but, or, yet, so) — join two EQUAL ideas that could each ' +
      'stand alone: \u201cI was tired, AND I went to bed.\u201d ' +
      'SUBORDINATING conjunctions — because, although, when, if, ' +
      'since — join a DEPENDENT clause to an independent one, ' +
      'creating an unequal, specific relationship (cause, contrast, ' +
      'time, condition): \u201cBECAUSE I was tired, I went to bed\u201d states ' +
      'a CAUSE that \u201cand\u201d cannot express — swap in \u201cand\u201d and the ' +
      'cause-and-effect link vanishes into a flat list. Test any ' +
      'conjunction: can the piece it introduces stand alone as a ' +
      'full sentence? Yes \u2192 coordinating. No (it needs the other ' +
      'clause to complete its meaning) \u2192 subordinating.',
    targetedMisconceptions: [`${CONJ}:MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY`],
    source: `${CONJ_SRC} — MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY (P28 because-vs-and conflict + P30 FANBOYS/subordinating split)`,
  },
  {
    conceptId: CONJ,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Comma placement with conjunctions follows two learnable rules, ' +
      'not guesswork. Rule 1 (coordinating): the comma goes BEFORE ' +
      'the conjunction when joining two full sentences — \u201cI was ' +
      'tired, but I kept working\u201d (never \u201ctired but, I kept\u201d). ' +
      'Rule 2 (subordinating): the comma\u2019s position depends on ORDER ' +
      '— if the subordinate clause comes FIRST, a comma follows it: ' +
      '\u201cAlthough I was tired, I kept working.\u201d If it comes SECOND, ' +
      'usually no comma at all: \u201cI kept working although I was ' +
      'tired.\u201d So the checklist is: (1) what type of conjunction? ' +
      '(2) if subordinating, which clause comes first? Two questions, ' +
      'not a feeling.',
    targetedMisconceptions: [`${CONJ}:MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM`],
    source: `${CONJ_SRC} — MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM (P30 type+order checklist + P33 pairs)`,
  },
]

const CONJ_PROBES: SeedProbe[] = [
  {
    conceptId: CONJ,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence uses \u201cbecause\u201d correctly to show a cause-and-effect relationship?',
    choices: [
      { text: '\u201cBecause I was tired, I went to bed\u201d — \u201cbecause\u201d is subordinating and can express cause where \u201cand\u201d cannot', isCorrect: true },
      { text: '\u201cI was tired because I went to bed\u201d and \u201cI was tired and I went to bed\u201d mean the same thing', isCorrect: false, misconceptionId: `${CONJ}:MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY` },
    ],
    correctValue: 'Because I was tired, I went to bed',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CONJ}:MC-ALL-CONJUNCTIONS-WORK-THE-SAME-WAY`],
    source: `${CONJ_SRC} — P28 because-vs-and conflict as probe`,
  },
  {
    conceptId: CONJ,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which comma placement is correct?',
    choices: [
      { text: '\u201cI was tired, but I kept working\u201d — comma BEFORE the coordinating conjunction', isCorrect: true },
      { text: '\u201cI was tired but, I kept working\u201d — comma AFTER the conjunction', isCorrect: false, misconceptionId: `${CONJ}:MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM` },
    ],
    correctValue: 'I was tired, but I kept working',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CONJ}:MC-COMMA-PLACEMENT-WITH-CONJUNCTIONS-IS-RANDOM`],
    source: `${CONJ_SRC} — P28 comma-after-but conflict as probe`,
  },
]

// ─── math.abst.group-theory ──────────────────────────────────────────────────
const GRP = 'math.abst.group-theory'
const GRP_SRC = 'docs/curriculum/blueprints/math.abst.group-theory.md'

const GRP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GRP,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Is (GL_n(\u211d), \u00d7) — invertible matrices under multiplication — ' +
      'a group, even though AB \u2260 BA in general? Yes, and this is the ' +
      'single most load-bearing distinction in group theory: the ' +
      'GROUP axioms (closure, associativity, identity, inverses — ' +
      'G1\u2013G4) say nothing about commutativity. A group only becomes ' +
      'ABELIAN if it separately satisfies G5 (ab = ba for all ' +
      'elements). GL_n(\u211d) satisfies G1\u2013G4 perfectly \u2014 it is a ' +
      'perfectly good, non-abelian group. Checking whether something ' +
      'is a group means checking exactly four properties; ' +
      'commutativity is a BONUS fifth property some groups have and ' +
      'many don\u2019t (matrix groups, symmetry groups, permutation ' +
      'groups are typically non-abelian, while (\u2124, +) and (\u211d\\{0}, ' +
      '\u00d7) are abelian).',
    targetedMisconceptions: [`${GRP}:MC-1`],
    source: `${GRP_SRC} — MC-1 GROUP-NEEDS-COMMUTATIVITY (G1\u2013G4 vs G5 separation; GL_n(\u211d) as the canonical non-abelian counterexample)`,
  },
  {
    conceptId: GRP,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Two habits to break once you leave familiar number systems. ' +
      'First: the identity element is NOT always 0 or 1 — it is ' +
      'whatever element e satisfies a\u00b7e = e\u00b7a = a FOR THIS group\u2019s ' +
      'operation. In (\u2124, +) it\u2019s 0; in (\u211d\\{0}, \u00d7) it\u2019s 1; in the ' +
      'symmetric group it\u2019s the identity permutation; in 2\u00d72 ' +
      'invertible matrices it\u2019s the identity matrix I. Find it by ' +
      'solving the defining equation, never by pattern-matching to a ' +
      'familiar case. Second: the inverse is NOT always \u2212a — that ' +
      'formula is specific to additive groups. The inverse a\u207b\u00b9 is ' +
      'whatever satisfies a\u00b7a\u207b\u00b9 = e (G4) using THIS group\u2019s e and ' +
      'operation: in (\u211d\\{0}, \u00d7) the inverse of a is 1/a, not \u2212a. ' +
      'Every group question reduces to: what are e and \u00b7 here, and ' +
      'what solves the axiom from first principles?',
    targetedMisconceptions: [`${GRP}:MC-2`, `${GRP}:MC-3`],
    source: `${GRP_SRC} — MC-2 IDENTITY-MUST-BE-ZERO-OR-ONE + MC-3 INVERSE-IS-NEGATIVE (G3/G4 from-first-principles derivation)`,
  },
]

const GRP_PROBES: SeedProbe[] = [
  {
    conceptId: GRP,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In GL_n(\u211d) (invertible matrices under multiplication), AB \u2260 BA in general. Is GL_n(\u211d) still a group?',
    choices: [
      { text: 'Yes — the group axioms (closure, associativity, identity, inverses) don\u2019t require commutativity; GL_n(\u211d) is a valid non-abelian group', isCorrect: true },
      { text: 'No — a group requires ab = ba for all elements', isCorrect: false, misconceptionId: `${GRP}:MC-1` },
    ],
    correctValue: 'yes — non-abelian group',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GRP}:MC-1`],
    source: `${GRP_SRC} — MC-1 trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: GRP,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In the group (\u211d\\{0}, \u00d7) (nonzero reals under multiplication), what is the inverse of 5?',
    choices: [
      { text: '1/5 — the inverse must satisfy 5 \u00d7 a\u207b\u00b9 = 1 (the identity for this operation)', isCorrect: true },
      { text: '\u22125 — the inverse of any element is its negative', isCorrect: false, misconceptionId: `${GRP}:MC-3` },
    ],
    correctValue: '1/5',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GRP}:MC-3`],
    source: `${GRP_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── phys.qm.schrodinger-equation ────────────────────────────────────────────
const SCHR = 'phys.qm.schrodinger-equation'
const SCHR_SRC = 'docs/curriculum/blueprints/phys.qm.schrodinger-equation.md'

const SCHR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SCHR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Solve the Schr\u00f6dinger equation and you do NOT get where the ' +
      'particle will be — you get \u03c8(x,t), whose SQUARE |\u03c8(x,t)|\u00b2 is ' +
      'a probability density. Position stays genuinely unknown until ' +
      'a measurement forces a value. This is the clean parallel to ' +
      'hold onto: Newton\u2019s F = ma evolves x(t), a definite trajectory; ' +
      'Schr\u00f6dinger\u2019s equation evolves \u03c8(x,t), a probability ' +
      'amplitude — deterministic evolution of a DISTRIBUTION, not a ' +
      'point. Compute |\u03c8|\u00b2 for a two-state superposition and watch ' +
      'it visibly oscillate between locations — unmistakably a ' +
      'spread-out distribution changing shape, never a single ' +
      'tracked position.',
    targetedMisconceptions: [`${SCHR}:MC-1`],
    source: `${SCHR_SRC} — MC-1 trajectory misconception (P28 |\u03c8|\u00b2-oscillation demo + P30 Newton/Schr\u00f6dinger parallel)`,
  },
  {
    conceptId: SCHR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A \u201cstationary\u201d state sounds like it should have zero energy — ' +
      'it emphatically does not. \u201cStationary\u201d describes |\u03c8|\u00b2 staying ' +
      'CONSTANT IN TIME, never the energy. For a particle in a box, ' +
      'E\u2081 = \u03c0\u00b2\u210f\u00b2/(2mL\u00b2) — always strictly positive, and this ' +
      'zero-point energy is not a formality: it is why liquid helium ' +
      'refuses to freeze at atmospheric pressure even near absolute ' +
      'zero. And a genuine trap sits one level deeper: not every ' +
      'function satisfying the boundary conditions is a valid ' +
      'solution. Try \u03c8 = x(L\u2212x) on [0, L]: it vanishes correctly at ' +
      'both walls, but d\u00b2/dx\u00b2[x(L\u2212x)] = \u22122, a CONSTANT — while the ' +
      'equation demands \u2212k\u00b2\u03c8, which is never constant unless \u03c8 = 0. ' +
      'The function fails the actual differential equation. A valid ' +
      'solution must satisfy the equation, the boundary conditions, ' +
      'AND be normalizable — all three, not just the one that looks ' +
      'checkable by eye.',
    targetedMisconceptions: [`${SCHR}:MC-2`, `${SCHR}:MC-3`],
    source: `${SCHR_SRC} — MC-2 stationary-means-zero-energy + MC-3 any-function-is-a-solution (E\u2081 numeric check + x(L\u2212x) counter-verification)`,
  },
]

const SCHR_PROBES: SeedProbe[] = [
  {
    conceptId: SCHR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'After solving the Schr\u00f6dinger equation for \u03c8(x,t), what do you know about the particle\u2019s position?',
    choices: [
      { text: 'Its probability DISTRIBUTION, |\u03c8(x,t)|\u00b2 — not a definite trajectory; position is unknown until measured', isCorrect: true },
      { text: 'Its exact position at every time, just like solving Newton\u2019s equations gives x(t)', isCorrect: false, misconceptionId: `${SCHR}:MC-1` },
    ],
    correctValue: 'probability distribution only',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SCHR}:MC-1`],
    source: `${SCHR_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: SCHR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The ground-state wave function of a particle in a box is \u201cstationary\u201d (|\u03c8|\u00b2 doesn\u2019t change in time). Does this mean its energy E\u2081 is zero?',
    choices: [
      { text: 'No — E\u2081 = \u03c0\u00b2\u210f\u00b2/(2mL\u00b2) is always positive; \u201cstationary\u201d describes the unchanging probability density, not the energy', isCorrect: true },
      { text: 'Yes — if nothing changes in time, the energy must be zero', isCorrect: false, misconceptionId: `${SCHR}:MC-2` },
    ],
    correctValue: 'no — E\u2081 > 0',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SCHR}:MC-2`],
    source: `${SCHR_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── eng.grammar.active-and-passive-voice ────────────────────────────────────
const PASV = 'eng.grammar.active-and-passive-voice'
const PASV_SRC = 'docs/curriculum/blueprints/eng.grammar.active-and-passive-voice.md'

const PASV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PASV,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cAvoid passive voice\u201d is common writing advice — and taken too ' +
      'literally, it is wrong. \u201cThe Mona Lisa was painted in the ' +
      'early 1500s\u201d is passive, and it is the BETTER sentence: the ' +
      'painting is the point, not some unnamed painter (we all know ' +
      'it was Leonardo anyway; naming him would be redundant here). ' +
      'Passive voice earns its place whenever the doer is unknown ' +
      '(\u201cthe window was broken\u201d — no idea who), unimportant, or ' +
      'deliberately de-emphasized, and it is the standard convention ' +
      'in scientific writing where the PROCESS matters more than the ' +
      'experimenter: \u201cthe solution was heated to 100\u00b0C.\u201d The real ' +
      'advice buried inside \u201cavoid passive voice\u201d is narrower: don\u2019t ' +
      'use it needlessly when naming the doer would be clearer — not ' +
      'a blanket ban.',
    targetedMisconceptions: [`${PASV}:MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING`],
    source: `${PASV_SRC} — MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING (P28 Mona Lisa conflict + P30 doer-unknown/scientific-convention bridge)`,
  },
  {
    conceptId: PASV,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cThe boy ate the cake\u201d \u2192 swap the words \u2192 \u201cThe cake ate the ' +
      'boy\u201d? That is nonsense, not passive voice — and the tell is ' +
      'that the cake is suddenly DOING the eating. Forming a real ' +
      'passive needs THREE moves together, not a word-swap: (1) the ' +
      'original OBJECT becomes the new subject (cake), (2) the verb ' +
      'itself changes shape to \u201cbe\u201d + PAST PARTICIPLE (ate \u2192 was ' +
      'eaten), (3) optionally tack on \u201cby + original subject\u201d if the ' +
      'doer is worth keeping (by the boy). Result: \u201cThe cake was ' +
      'eaten by the boy\u201d — same meaning, opposite emphasis, and a ' +
      'genuinely restructured verb, not a word-position trick.',
    targetedMisconceptions: [`${PASV}:MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE`],
    source: `${PASV_SRC} — MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE (P28 cake-ate-the-boy nonsense-check + P31 three-step transformation)`,
  },
]

const PASV_PROBES: SeedProbe[] = [
  {
    conceptId: PASV,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which is a genuinely good use of passive voice?',
    choices: [
      { text: '\u201cThe solution was heated to 100\u00b0C\u201d — standard scientific convention; the process matters, not who performed it', isCorrect: true },
      { text: 'None — passive voice should always be eliminated from good writing', isCorrect: false, misconceptionId: `${PASV}:MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING` },
    ],
    correctValue: 'The solution was heated to 100\u00b0C',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PASV}:MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING`],
    source: `${PASV_SRC} — P33 scientific-convention pair as probe`,
  },
  {
    conceptId: PASV,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is the correct passive form of \u201cThe boy ate the cake\u201d?',
    choices: [
      { text: '\u201cThe cake was eaten by the boy\u201d — object becomes subject, verb becomes be + past participle', isCorrect: true },
      { text: '\u201cThe cake ate the boy\u201d — swap the subject and object', isCorrect: false, misconceptionId: `${PASV}:MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE` },
    ],
    correctValue: 'The cake was eaten by the boy',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PASV}:MC-JUST-SWAP-SUBJECT-AND-OBJECT-FOR-PASSIVE`],
    source: `${PASV_SRC} — P28 cake/boy conflict as probe`,
  },
]

// ─── phys.rel.time-dilation ──────────────────────────────────────────────────
const TDIL = 'phys.rel.time-dilation'
const TDIL_SRC = 'docs/curriculum/blueprints/phys.rel.time-dilation.md'

const TDIL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TDIL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Is time dilation a real effect or just light taking longer to ' +
      'reach us — an optical trick? Real, and proven by REUNITING ' +
      'clocks, which an illusion could never survive. Muons created ' +
      'high in the atmosphere have a lab-measured lifetime of only ' +
      '2.2 \u03bcs — nowhere near enough to reach sea level at nearly c. ' +
      'Yet muons arrive at sea level in exactly the numbers time ' +
      'dilation predicts: their own \u201cclock\u201d genuinely ticks slower ' +
      'from our frame. The Hafele-Keating experiment sealed it: fly ' +
      'atomic clocks around the world, land them, and compare them ' +
      'side by side with clocks that stayed put — they read GENUINELY ' +
      'different elapsed times. An illusion evaporates on reunion; ' +
      'this difference is permanently stamped on the clock face.',
    targetedMisconceptions: [`${TDIL}:MC-1`],
    source: `${TDIL_SRC} — MC-1 MC-TIME-DILATION-IS-ILLUSION (P28 muon survival + Hafele-Keating reunited-clocks evidence)`,
  },
  {
    conceptId: TDIL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The word \u201cproper\u201d misleads — it does NOT mean \u201cthe real, ' +
      'complete, bigger\u201d time. \u201cProper time\u201d (from Latin proprius, ' +
      '\u201cone\u2019s own\u201d) is just the time on the clock that travels WITH ' +
      'the object. A muon\u2019s own clock reads 2.2 \u03bcs (proper time, ' +
      '\u0394\u03c4); the lab watching it fly measures 35 \u03bcs (coordinate ' +
      'time, \u0394t). Since \u0394t = \u03b3\u0394\u03c4 and \u03b3 \u2265 1 ALWAYS, proper time is ' +
      'always the SHORTER of the two, never longer — the moving ' +
      'clock always shows less elapsed time than the stationary ' +
      'observer measures. Compute \u03b3 = 35/2.2 \u2248 16 here, matching a ' +
      'muon speed of about 0.998c. \u201cProper\u201d is a label of ownership, ' +
      'not a claim about size.',
    targetedMisconceptions: [`${TDIL}:MC-2`],
    source: `${TDIL_SRC} — MC-2 MC-PROPER-TIME-IS-LONGER (P28 muon 2.2\u03bcs/35\u03bcs numbers + P30 proprius etymology bridge)`,
  },
]

const TDIL_PROBES: SeedProbe[] = [
  {
    conceptId: TDIL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The Hafele-Keating experiment flew atomic clocks around the world and compared them to ground clocks on landing. What does the observed time difference show?',
    choices: [
      { text: 'Time dilation is a real physical effect — the clocks genuinely accumulated different elapsed times, verified after reuniting', isCorrect: true },
      { text: 'It was an optical illusion caused by the finite speed of light reaching the clocks', isCorrect: false, misconceptionId: `${TDIL}:MC-1` },
    ],
    correctValue: 'real physical effect',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TDIL}:MC-1`],
    source: `${TDIL_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: TDIL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A muon\u2019s proper lifetime is 2.2 \u03bcs; the lab measures 35 \u03bcs for the same muon. Which is longer?',
    choices: [
      { text: 'Coordinate time (the lab\u2019s 35 \u03bcs) — \u0394t = \u03b3\u0394\u03c4 with \u03b3 \u2265 1, so proper time is always the shorter one', isCorrect: true },
      { text: 'Proper time — it is the \u201creal\u201d time, so it must be the longer, more complete measurement', isCorrect: false, misconceptionId: `${TDIL}:MC-2` },
    ],
    correctValue: 'coordinate time (35 \u03bcs)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TDIL}:MC-2`],
    source: `${TDIL_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── math.nt.prime-number ────────────────────────────────────────────────────
const PRIME = 'math.nt.prime-number'
const PRIME_SRC = 'docs/curriculum/blueprints/math.nt.prime-number.md'

const PRIME_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRIME,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Is 1 a prime number? Its only divisors ARE 1 and itself — ' +
      'because they are the same number, so the argument sounds ' +
      'airtight. But the definition of prime has a second clause ' +
      'that quietly rules 1 out: a prime is a number GREATER THAN 1 ' +
      'whose only divisors are 1 and itself. 1 fails the very first ' +
      'requirement before the divisor-count question even applies. ' +
      'Why mathematicians insist on this: if 1 counted as prime, ' +
      'every number would have infinitely many \u201cprime\u201d ' +
      'factorizations (6 = 2\u00d73 = 1\u00d72\u00d73 = 1\u00d71\u00d72\u00d73\u2026), wrecking the ' +
      'Fundamental Theorem of Arithmetic\u2019s promise of a UNIQUE prime ' +
      'factorization. 1 gets its own special category: a \u201cunit,\u201d ' +
      'neither prime nor composite.',
    targetedMisconceptions: [`${PRIME}:MC-1`],
    source: `${PRIME_SRC} — MC-1 PRIME-INCLUDES-ONE (B01: greater-than-1 clause + unique-factorization rationale)`,
  },
  {
    conceptId: PRIME,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Two shortcuts that feel safe and both fail. \u201cEven numbers are ' +
      'never prime\u201d — except 2, which is prime (divisors: only 1 and ' +
      '2) and also the ONLY even prime; every other even number has ' +
      '2 as an extra divisor, but 2 itself doesn\u2019t get to divide ' +
      'anything smaller. \u201cAll odd numbers are prime\u201d fails constantly: ' +
      '9 = 3\u00d73, 15 = 3\u00d75, 21 = 3\u00d77 — all odd, all composite. And ' +
      'the last-digit heuristic (\u201c21 ends in 1, so it\u2019s prime\u201d) has no ' +
      'mathematical basis at all — 21 = 3 \u00d7 7. There is no shortcut ' +
      'that skips checking: TEST for divisors up to \u221an (for 21, ' +
      'check 2, 3; \u221a21 \u2248 4.6, and 3 divides evenly, so 21 is ' +
      'composite). Primality is decided by division, never by ' +
      'parity or the last digit.',
    targetedMisconceptions: [`${PRIME}:MC-2`, `${PRIME}:MC-3`],
    source: `${PRIME_SRC} — MC-2 ODD-EQUALS-PRIME + MC-3 LAST-DIGIT-HEURISTIC (B02/B03: 2-as-only-even-prime + 21/51/91 divisor tests)`,
  },
]

const PRIME_PROBES: SeedProbe[] = [
  {
    conceptId: PRIME,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is 1 a prime number?',
    choices: [
      { text: 'No — the definition requires a number greater than 1; 1 is neither prime nor composite (it\u2019s a \u201cunit\u201d)', isCorrect: true },
      { text: 'Yes — its only divisors are 1 and itself', isCorrect: false, misconceptionId: `${PRIME}:MC-1` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PRIME}:MC-1`],
    source: `${PRIME_SRC} — MC-1 trigger as probe, distractor-mapped`,
  },
  {
    conceptId: PRIME,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is 21 a prime number?',
    choices: [
      { text: 'No — 21 = 3 \u00d7 7, a composite number; testing divisors (not the last digit) is the only reliable method', isCorrect: true },
      { text: 'Yes — 21 ends in 1, and numbers ending in 1 are prime', isCorrect: false, misconceptionId: `${PRIME}:MC-3` },
    ],
    correctValue: 'no — composite (3\u00d77)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PRIME}:MC-3`],
    source: `${PRIME_SRC} — MC-3 trigger item (21), distractor-mapped`,
  },
]

// ─── phys.astro.black-holes ──────────────────────────────────────────────────
const BH = 'phys.astro.black-holes'
const BH_SRC = 'docs/curriculum/blueprints/phys.astro.black-holes.md'

const BH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BH,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'If the Sun instantly became a black hole of the same mass, ' +
      'would Earth get \u201csucked in\u201d? No — Earth\u2019s orbit would not ' +
      'change AT ALL. Gravity at a fixed distance depends only on ' +
      'mass and distance, F = GMm/r\u00b2, not on how compact that mass ' +
      'is (Birkhoff\u2019s theorem: outside a spherical mass, the field ' +
      'looks identical whether that mass is a diffuse star or a ' +
      'collapsed point). At 1 AU from a 1-solar-mass black hole, g = ' +
      '5.9\u00d710\u207b\u00b3 m/s\u00b2 — the exact number Earth feels today. \u201cBlack ' +
      'hole\u201d sounds like a cosmic vacuum cleaner, but the extreme GR ' +
      'effects only kick in within a few Schwarzschild radii — for ' +
      'the Sun\u2019s mass, about 3 km. Everything beyond that behaves ' +
      'exactly like ordinary gravity from an ordinary star.',
    targetedMisconceptions: [`${BH}:MC-2`],
    source: `${BH_SRC} — MC-2 (P28 Birkhoff\u2019s-theorem argument + 1 AU numeric check)`,
  },
  {
    conceptId: BH,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Would crossing a black hole\u2019s event horizon feel like hitting a ' +
      'wall? Depends entirely on the black hole\u2019s SIZE — a fact most ' +
      'popular depictions skip. Tidal force at the horizon scales as ' +
      '1/M\u00b2: for a stellar-mass black hole (horizon ~30 km), tidal ' +
      'forces there are ~10\u00b9\u2070 g — you would be spaghettified before ' +
      'crossing. But for a supermassive black hole (horizon billions ' +
      'of km across), tidal forces at the horizon are utterly ' +
      'negligible — you would cross with NO local sensation at all. ' +
      'The horizon is a causal boundary (a point of no return for ' +
      'information), not a physical surface with any stress-energy ' +
      'concentrated there. What becomes irreversible is your future, ' +
      'not your body.',
    targetedMisconceptions: [`${BH}:MC-1`],
    source: `${BH_SRC} — MC-1 (P28 tidal-force 1/M\u00b2 scaling + stellar vs. supermassive contrast)`,
  },
]

const BH_PROBES: SeedProbe[] = [
  {
    conceptId: BH,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'If the Sun instantly collapsed into a 1-solar-mass black hole, what would happen to Earth\u2019s orbit?',
    choices: [
      { text: 'Nothing — gravity at 1 AU depends only on mass and distance, identical to before (Birkhoff\u2019s theorem)', isCorrect: true },
      { text: 'Earth would be sucked in almost immediately', isCorrect: false, misconceptionId: `${BH}:MC-2` },
    ],
    correctValue: 'orbit unchanged',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BH}:MC-2`],
    source: `${BH_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: BH,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An astronaut crosses the event horizon of a supermassive black hole. What do they feel locally at that moment?',
    choices: [
      { text: 'Nothing unusual — tidal forces at a supermassive black hole\u2019s horizon are negligible; the horizon is a causal boundary, not a physical surface', isCorrect: true },
      { text: 'They are instantly crushed or destroyed on contact with the horizon', isCorrect: false, misconceptionId: `${BH}:MC-1` },
    ],
    correctValue: 'nothing locally',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BH}:MC-1`],
    source: `${BH_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
]

// ─── phys.astro.cosmology ────────────────────────────────────────────────────
const COSM = 'phys.astro.cosmology'
const COSM_SRC = 'docs/curriculum/blueprints/phys.astro.cosmology.md'

const COSM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COSM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Where did the Big Bang happen? The question itself assumes a ' +
      'location — and there isn\u2019t one. If the Big Bang were an ' +
      'ordinary explosion with a center, galaxies would recede mostly ' +
      'AWAY from that center. Instead Hubble\u2019s law is isotropic: every ' +
      'galaxy recedes proportional to its distance, in every ' +
      'direction, from EVERY vantage point — no preferred center ' +
      'shows up anywhere we look. That is because the Big Bang was ' +
      'not matter exploding INTO space; it was SPACE ITSELF expanding. ' +
      'Picture dots glued to a rubber sheet being stretched: every ' +
      'dot sees every other dot receding, and no dot is special — ' +
      'that is the universe, with every point in today\u2019s cosmos once ' +
      'part of the same compact starting state.',
    targetedMisconceptions: [`${COSM}:MC-1`],
    source: `${COSM_SRC} — MC-1 (P28 isotropic-Hubble-law evidence + s6 rubber-sheet analogy)`,
  },
  {
    conceptId: COSM,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Is the cosmic microwave background \u201cthe afterglow of the Big ' +
      'Bang\u201d — light from the very moment of creation? Close, but ' +
      'the actual origin is 380,000 years LATER. Before that, the ' +
      'universe was hot plasma, opaque to light (photons constantly ' +
      'scattered off free electrons) — no photon from t=0 could ever ' +
      'reach us; that era is permanently hidden. At 380,000 years, ' +
      'the universe cooled to ~3000 K and protons finally captured ' +
      'electrons (recombination), turning the universe transparent in ' +
      'an instant. The CMB is light released AT that transition — the ' +
      '\u201coldest light we can see,\u201d not light from the singularity — ' +
      'since redshifted by a factor of ~1100 down to today\u2019s 2.73 K. ' +
      'A separate trap: don\u2019t call this redshift a Doppler effect — ' +
      'it is space itself stretching the photon\u2019s wavelength as it ' +
      'travels, which is why redshift can correspond to an apparent ' +
      'recession faster than light with no contradiction.',
    targetedMisconceptions: [`${COSM}:MC-2`, `${COSM}:MC-3`],
    source: `${COSM_SRC} — MC-2 CMB-is-Big-Bang-light + MC-3 cosmological-redshift-is-Doppler (recombination timeline + expansion-stretching bridge)`,
  },
]

const COSM_PROBES: SeedProbe[] = [
  {
    conceptId: COSM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Where in space did the Big Bang occur?',
    choices: [
      { text: 'Nowhere in particular — space itself expanded from every point; there is no center (Hubble\u2019s law looks the same from any vantage point)', isCorrect: true },
      { text: 'At the center of the universe, and everything expanded outward from there', isCorrect: false, misconceptionId: `${COSM}:MC-1` },
    ],
    correctValue: 'no center — everywhere',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COSM}:MC-1`],
    source: `${COSM_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: COSM,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is the cosmic microwave background light from the exact moment of the Big Bang (t = 0)?',
    choices: [
      { text: 'No — it is light released at recombination, about 380,000 years later; the earlier universe was opaque and its light can never reach us', isCorrect: true },
      { text: 'Yes — it is literally the afterglow from the instant of the Big Bang explosion', isCorrect: false, misconceptionId: `${COSM}:MC-2` },
    ],
    correctValue: 'no — from recombination, t\u2248380,000 yr',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COSM}:MC-2`],
    source: `${COSM_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── eng.grammar.modals ──────────────────────────────────────────────────────
const MOD = 'eng.grammar.modals'
const MOD_SRC = 'docs/curriculum/blueprints/eng.grammar.modals.md'

const MOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MOD,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Does \u201cmust\u201d always mean \u201chave to\u201d? Compare: \u201cYou must wear a ' +
      'seatbelt\u201d (a rule, an obligation) versus \u201cShe must be tired ' +
      'after that trip\u201d — nobody is ORDERING her to be tired; the ' +
      'speaker is making a confident GUESS from evidence. Same word, ' +
      'two different jobs: obligation vs. deduction. Most modals ' +
      'carry several distinct meanings this way: \u201ccan\u201d covers ability ' +
      '(\u201cI can swim\u201d) AND permission (\u201cCan I leave early?\u201d); \u201cmay\u201d ' +
      'covers permission (\u201cYou may leave\u201d) AND possibility (\u201cIt may ' +
      'rain\u201d). Context — not the word alone — tells you which sense ' +
      'is active. Before translating or explaining a modal, ask: is ' +
      'this granting permission, stating ability, issuing an order, ' +
      'or making an inference?',
    targetedMisconceptions: [`${MOD}:MC-EACH-MODAL-HAS-ONLY-ONE-MEANING`],
    source: `${MOD_SRC} — MC-EACH-MODAL-HAS-ONLY-ONE-MEANING (P28 must-obligation-vs-deduction conflict + P33 can/may pairs)`,
  },
  {
    conceptId: MOD,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cYou must exercise more\u201d and \u201cyou should exercise more\u201d — same ' +
      'strength? No: modals expressing obligation sit on a real ' +
      'STRENGTH SPECTRUM. \u201cMust\u201d/\u201chave to\u201d signal strong, often ' +
      'non-negotiable requirement (\u201cSubmit by Friday or you\u2019ll fail\u201d); ' +
      '\u201cshould\u201d/\u201cought to\u201d signal weaker, advisory recommendation ' +
      '(\u201cyou\u2019d be wise to, but it\u2019s not required\u201d). The same ladder ' +
      'exists for possibility: \u201cmight\u201d/\u201ccould\u201d are tentative (\u201cIt ' +
      'might rain\u201d), while \u201cmust\u201d as deduction signals near-certainty ' +
      '(\u201cIt must be raining — everyone\u2019s soaked\u201d). Swapping words on ' +
      'the same rung is fine; swapping across rungs changes how ' +
      'strongly you actually mean it — treat modals as a dial, not a ' +
      'single switch.',
    targetedMisconceptions: [`${MOD}:MC-MODAL-STRENGTH-IS-ALL-THE-SAME`],
    source: `${MOD_SRC} — MC-MODAL-STRENGTH-IS-ALL-THE-SAME (P28 must-vs-should conflict + P30 strength-spectrum bridge)`,
  },
]

const MOD_PROBES: SeedProbe[] = [
  {
    conceptId: MOD,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u201cShe must be tired after that long trip,\u201d what does \u201cmust\u201d express?',
    choices: [
      { text: 'A confident deduction/guess from evidence — not an obligation', isCorrect: true },
      { text: 'An obligation — she is being told she has to be tired', isCorrect: false, misconceptionId: `${MOD}:MC-EACH-MODAL-HAS-ONLY-ONE-MEANING` },
    ],
    correctValue: 'confident deduction',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MOD}:MC-EACH-MODAL-HAS-ONLY-ONE-MEANING`],
    source: `${MOD_SRC} — P28 must-be-tired conflict as probe`,
  },
  {
    conceptId: MOD,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Do \u201cYou must submit this by Friday\u201d and \u201cYou should submit this by Friday\u201d express the same strength of obligation?',
    choices: [
      { text: 'No — \u201cmust\u201d signals a strong, non-negotiable requirement; \u201cshould\u201d signals advisory recommendation, not a strict requirement', isCorrect: true },
      { text: 'Yes — both modals express obligation, so they are interchangeable', isCorrect: false, misconceptionId: `${MOD}:MC-MODAL-STRENGTH-IS-ALL-THE-SAME` },
    ],
    correctValue: 'no — different strength',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MOD}:MC-MODAL-STRENGTH-IS-ALL-THE-SAME`],
    source: `${MOD_SRC} — P28 must-vs-should conflict as probe`,
  },
]

// ─── phys.opt.mirrors ────────────────────────────────────────────────────────
const MIR = 'phys.opt.mirrors'
const MIR_SRC = 'docs/curriculum/blueprints/phys.opt.mirrors.md'

const MIR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MIR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A shaving mirror is concave — and it shows a VIRTUAL image, ' +
      'proving concave mirrors do not always form real ones. With ' +
      'f = \u221220 cm and the object close in at u = \u221210 cm (inside the ' +
      'focal length), the mirror formula gives 1/v = 1/(\u221220) \u2212 ' +
      '1/(\u221210) = +0.05 \u2192 v = +20 cm: POSITIVE v means the image ' +
      'sits behind the mirror — virtual — and m = \u2212v/u = +2 means ' +
      'erect and magnified. That is exactly why shaving and dental ' +
      'mirrors work: get close (inside F) and a concave mirror flips ' +
      'from its \u201cfar\u201d personality (converging rays to a real image) ' +
      'to its \u201cclose\u201d personality (rays diverge on reflection, but ' +
      'their backward extensions meet behind the glass). Neither ' +
      'mirror type is \u201calways real\u201d or \u201calways virtual\u201d — for a ' +
      'concave mirror, OBJECT POSITION relative to F decides it.',
    targetedMisconceptions: [`${MIR}:MC-1`],
    source: `${MIR_SRC} — MC-1 MC-CONCAVE-MIRROR-ALWAYS-FORMS-REAL-IMAGE (P28 shaving-mirror computation + P30 two-personalities bridge)`,
  },
  {
    conceptId: MIR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'm = \u22122 — does that mean the image is HALF size? No: the sign ' +
      'and the magnitude of magnification answer two completely ' +
      'separate questions. The SIGN tells orientation (negative = ' +
      'inverted, positive = erect); the MAGNITUDE tells size ratio ' +
      '(|m| > 1 = larger, |m| < 1 = smaller, |m| = 1 = same). So ' +
      'm = \u22122 means inverted AND twice as tall — check: h\u2032 = m \u00d7 ' +
      'h_object = \u22122 \u00d7 3 cm = \u22126 cm (the minus sign = upside-down, ' +
      'the 6 = twice 3). m = \u22120.5 would mean inverted but HALF ' +
      'size — negative does not mean smaller. Read every ' +
      'magnification as two independent facts, sign then number, ' +
      'never one number telling both stories at once.',
    targetedMisconceptions: [`${MIR}:MC-2`],
    source: `${MIR_SRC} — MC-2 MC-MAGNIFICATION-SIGN-GIVES-IMAGE-SIZE (P28 h\u2032 = \u22126cm computation + P30 sign/magnitude split)`,
  },
]

const MIR_PROBES: SeedProbe[] = [
  {
    conceptId: MIR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A concave shaving mirror (f = \u221220 cm) has an object at u = \u221210 cm (inside the focal length). What kind of image forms?',
    choices: [
      { text: 'Virtual, erect, magnified — v = +20 cm (behind the mirror), m = +2', isCorrect: true },
      { text: 'Real, inverted — concave mirrors always form real images', isCorrect: false, misconceptionId: `${MIR}:MC-1` },
    ],
    correctValue: 'virtual, erect, magnified',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MIR}:MC-1`],
    source: `${MIR_SRC} — MC-1 shaving-mirror computation as probe, distractor-mapped`,
  },
  {
    conceptId: MIR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A mirror produces magnification m = \u22123. What does this tell you about the image?',
    choices: [
      { text: 'Inverted and 3\u00d7 LARGER than the object — sign gives orientation, magnitude gives size', isCorrect: true },
      { text: 'Inverted and one-third the size of the object', isCorrect: false, misconceptionId: `${MIR}:MC-2` },
    ],
    correctValue: 'inverted, 3\u00d7 larger',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MIR}:MC-2`],
    source: `${MIR_SRC} — P33 m=\u22123 discrimination pair as probe`,
  },
]

// ─── math.calc.chain-rule ────────────────────────────────────────────────────
const CHAIN = 'math.calc.chain-rule'
const CHAIN_SRC = 'docs/curriculum/blueprints/math.calc.chain-rule.md'

const CHAIN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHAIN,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The chain rule for a composite f(g(x)) has TWO factors, and ' +
      'dropping either one gives a wrong answer that looks almost ' +
      'right. d/dx[f(g(x))] = f\u2032(g(x)) \u00b7 g\u2032(x) — the outer derivative, ' +
      'evaluated AT THE INNER FUNCTION (not at bare x), MULTIPLIED by ' +
      'the inner function\u2019s own derivative. Take sin(x\u00b2): the outer ' +
      'derivative of sin is cos, evaluated at x\u00b2 \u2192 cos(x\u00b2); the inner ' +
      'function x\u00b2 has derivative 2x. Forgetting the 2x (the g\u2032(x) ' +
      'factor) gives just cos(x\u00b2) — off by exactly that factor. Two ' +
      'errors to catch: writing cos(x\u00b2) alone (inner derivative ' +
      'missing) or writing cos(x) \u00b7 2x (outer evaluated at bare x ' +
      'instead of at x\u00b2). Both factors, both plugged in correctly: ' +
      '2x \u00b7 cos(x\u00b2).',
    targetedMisconceptions: [`${CHAIN}:MC-1`, `${CHAIN}:MC-2`],
    source: `${CHAIN_SRC} — MC-1 INNER-DERIVATIVE-MISSING + MC-2 OUTER-EVALUATED-AT-X (sin(x\u00b2) worked case isolating both failure modes)`,
  },
  {
    conceptId: CHAIN,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'x\u00b7sin(x) is a PRODUCT, not a composition — the chain rule does ' +
      'not apply here at all. The giveaway: can you name an \u201couter\u201d ' +
      'function that TAKES sin(x) as its input and does something ' +
      'ELSE to it? No — x and sin(x) are simply multiplied side by ' +
      'side, two separate functions of x combined with \u00d7. That needs ' +
      'the PRODUCT rule: (uv)\u2032 = u\u2032v + uv\u2032, giving sin(x) + x\u00b7cos(x). ' +
      'Contrast with sin(x\u00b2): here x\u00b2 is FED INTO sin — sin acts ON ' +
      'the output of squaring, a genuine nesting, which is exactly ' +
      'what \u201ccomposition\u201d means and what the chain rule handles. ' +
      'Test before choosing a rule: is one function\u2019s OUTPUT the ' +
      'other\u2019s INPUT (composition \u2192 chain rule), or are two ' +
      'functions just multiplied (product \u2192 product rule)?',
    targetedMisconceptions: [`${CHAIN}:MC-3`],
    source: `${CHAIN_SRC} — MC-3 CHAIN-RULE-FOR-PRODUCTS (composition-vs-multiplication test; x\u00b7sin(x) vs sin(x\u00b2) contrast)`,
  },
]

const CHAIN_PROBES: SeedProbe[] = [
  {
    conceptId: CHAIN,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is d/dx[sin(x\u00b2)]?',
    choices: [
      { text: '2x\u00b7cos(x\u00b2) — outer derivative cos evaluated at x\u00b2, times inner derivative 2x', isCorrect: true },
      { text: 'cos(x\u00b2) — the derivative of sin', isCorrect: false, misconceptionId: `${CHAIN}:MC-1` },
      { text: '2x\u00b7cos(x) — outer derivative evaluated at bare x', isCorrect: false, misconceptionId: `${CHAIN}:MC-2` },
    ],
    correctValue: '2x cos(x\u00b2)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CHAIN}:MC-1`, `${CHAIN}:MC-2`],
    source: `${CHAIN_SRC} — MC-1/MC-2 trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: CHAIN,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'To differentiate x\u00b7sin(x), which rule applies?',
    choices: [
      { text: 'The product rule — x and sin(x) are multiplied, not nested; result: sin(x) + x\u00b7cos(x)', isCorrect: true },
      { text: 'The chain rule — treat x as outer and sin(x) as inner: cos(x)\u00b7\u2026', isCorrect: false, misconceptionId: `${CHAIN}:MC-3` },
    ],
    correctValue: 'product rule',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CHAIN}:MC-3`],
    source: `${CHAIN_SRC} — MC-3 trigger case as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.gerunds-and-infinitives ─────────────────────────────────────
const GRD = 'eng.grammar.gerunds-and-infinitives'
const GRD_SRC = 'docs/curriculum/blueprints/eng.grammar.gerunds-and-infinitives.md'

const GRD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GRD,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cSwimming is fun\u201d and \u201cI am swimming\u201d both use the identical ' +
      'spelling, \u201cswimming\u201d — but they are doing completely ' +
      'different jobs. In \u201cI am swimming,\u201d \u201cswimming\u201d is part of the ' +
      'VERB phrase, showing an action in progress (present ' +
      'continuous). In \u201cSwimming is fun,\u201d there is no other verb ' +
      'doing the action — \u201cswimming\u201d itself IS the subject, acting ' +
      'as a NOUN. That noun-role \u2013ing form has its own name: a ' +
      'GERUND. Same test works for objects: \u201cI enjoy swimming\u201d — ' +
      '\u201cswimming\u201d is the object of \u201cenjoy,\u201d a noun role, versus \u201cI am ' +
      'reading a book\u201d where \u201creading\u201d is verb, not noun. Don\u2019t judge ' +
      'by the spelling (always -ing); judge by the JOB: is it doing a ' +
      'noun\u2019s work (subject/object) or a verb\u2019s work?',
    targetedMisconceptions: [`${GRD}:MC-GERUND-IS-JUST-PRESENT-CONTINUOUS`],
    source: `${GRD_SRC} — MC-GERUND-IS-JUST-PRESENT-CONTINUOUS (P28 swimming-is-fun conflict + P30 job-not-spelling test)`,
  },
  {
    conceptId: GRD,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cI enjoy to swim\u201d — wrong, and not by accident. Specific verbs ' +
      'GOVERN whether a gerund or infinitive follows, and this must ' +
      'be learned per verb, like a vocabulary pairing: \u201cenjoy,\u201d ' +
      '\u201cavoid,\u201d \u201cfinish,\u201d \u201cmind\u201d demand a GERUND (\u201cI enjoy ' +
      'swimming,\u201d never \u201cto swim\u201d); \u201cwant,\u201d \u201cdecide,\u201d \u201chope,\u201d \u201cplan\u201d ' +
      'demand an INFINITIVE (\u201cI want to swim,\u201d never \u201cswimming\u201d); ' +
      '\u201clike,\u201d \u201cstart,\u201d \u201cbegin\u201d accept EITHER with barely any ' +
      'difference. The sharpest trap: a few verbs change MEANING by ' +
      'form — \u201cI stopped smoking\u201d means I quit the habit; \u201cI stopped ' +
      'to smoke\u201d means I paused something else IN ORDER TO smoke. ' +
      'Same verb \u201cstop,\u201d opposite story. Memorize the governance ' +
      'per verb; never assume the two forms are interchangeable.',
    targetedMisconceptions: [`${GRD}:MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE`],
    source: `${GRD_SRC} — MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE (P28 enjoy-to-swim conflict + P33 stop-smoking/stop-to-smoke meaning-change pair)`,
  },
]

const GRD_PROBES: SeedProbe[] = [
  {
    conceptId: GRD,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u201cSwimming is my favorite hobby,\u201d what role does \u201cswimming\u201d play?',
    choices: [
      { text: 'A gerund — it functions as the NOUN subject of the sentence', isCorrect: true },
      { text: 'Present continuous verb — same as in \u201cI am swimming\u201d', isCorrect: false, misconceptionId: `${GRD}:MC-GERUND-IS-JUST-PRESENT-CONTINUOUS` },
    ],
    correctValue: 'gerund (subject)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GRD}:MC-GERUND-IS-JUST-PRESENT-CONTINUOUS`],
    source: `${GRD_SRC} — P28 swimming-is-fun conflict as probe`,
  },
  {
    conceptId: GRD,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence is grammatically correct?',
    choices: [
      { text: '\u201cI enjoy swimming\u201d — \u201cenjoy\u201d governs the gerund form', isCorrect: true },
      { text: '\u201cI enjoy to swim\u201d — gerunds and infinitives are always interchangeable after any verb', isCorrect: false, misconceptionId: `${GRD}:MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE` },
    ],
    correctValue: 'I enjoy swimming',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${GRD}:MC-GERUND-AND-INFINITIVE-ARE-ALWAYS-INTERCHANGEABLE`],
    source: `${GRD_SRC} — P28 enjoy-to-swim conflict as probe`,
  },
]

// ─── math.prob.conditional-probability ───────────────────────────────────────
const CONDP = 'math.prob.conditional-probability'
const CONDP_SRC = 'docs/curriculum/blueprints/math.prob.conditional-probability.md'

const CONDP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONDP,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'P(A|B) does NOT equal P(A \u2229 B) — that is skipping the whole ' +
      'point of \u201cgiven.\u201d P(A \u2229 B) asks: out of EVERYTHING, what ' +
      'fraction is both A and B? P(A|B) asks a narrower question: ' +
      'once we already know B happened, shrink the universe down to ' +
      'just B\u2019s outcomes — what fraction of THAT smaller world is ' +
      'also A? The formula P(A|B) = P(A\u2229B)/P(B) is exactly this ' +
      'rescaling: it divides by P(B) to re-normalize B\u2019s outcomes ' +
      'into a new 100%. Concretely: 20% of people have a disease AND ' +
      'a positive test (P(A\u2229B) = 0.20), and 25% test positive overall ' +
      '(P(B) = 0.25) \u2014 given a positive test, P(disease|positive) = ' +
      '0.20/0.25 = 0.80, not 0.20. \u201cGiven B\u201d always means: rescale ' +
      'inside B.',
    targetedMisconceptions: [`${CONDP}:MC-1`],
    source: `${CONDP_SRC} — MC-1 CONDITIONAL-IS-JOINT (rescaling-inside-B interpretation; disease/positive-test worked numbers)`,
  },
  {
    conceptId: CONDP,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two guard rails for conditional probability. First: P(A|B) and ' +
      'P(B|A) are usually DIFFERENT numbers — \u201cP(rain | clouds)\u201d and ' +
      '\u201cP(clouds | rain)\u201d ask different questions (most rainy days ' +
      'are cloudy, but not every cloudy day rains), so never assume ' +
      'swapping the condition preserves the value; this asymmetry is ' +
      'the entire reason Bayes\u2019 theorem exists — to convert one ' +
      'direction into the other correctly. Second: P(A|B) is simply ' +
      'undefined if P(B) = 0 — conditioning on an impossible event is ' +
      'a divide-by-zero, not a valid probability. Before writing ANY ' +
      'conditional probability, check that the condition\u2019s ' +
      'probability is actually positive; if it isn\u2019t, the expression ' +
      'has no meaning to compute.',
    targetedMisconceptions: [`${CONDP}:MC-2`, `${CONDP}:MC-3`],
    source: `${CONDP_SRC} — MC-2 REVERSING-CONDITIONING + MC-3 ZERO-DENOMINATOR-IGNORED (asymmetry-motivates-Bayes argument + P(B)>0 validity check)`,
  },
]

const CONDP_PROBES: SeedProbe[] = [
  {
    conceptId: CONDP,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'P(disease AND positive test) = 0.20. P(positive test) = 0.25. What is P(disease | positive test)?',
    choices: [
      { text: '0.80 — rescale inside B: 0.20/0.25', isCorrect: true },
      { text: '0.20 — that\u2019s already the conditional probability', isCorrect: false, misconceptionId: `${CONDP}:MC-1` },
      { text: '0.05 — multiply the two probabilities', isCorrect: false },
    ],
    correctValue: '0.80',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CONDP}:MC-1`],
    source: `${CONDP_SRC} — MC-1 disease/test numeric case as probe, distractor-mapped`,
  },
  {
    conceptId: CONDP,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is P(clouds | rain) generally equal to P(rain | clouds)?',
    choices: [
      { text: 'No — they answer different questions and are usually different numbers; this asymmetry is why Bayes\u2019 theorem exists', isCorrect: true },
      { text: 'Yes — \u201cgiven\u201d is symmetric, so swapping the condition doesn\u2019t change the value', isCorrect: false, misconceptionId: `${CONDP}:MC-2` },
    ],
    correctValue: 'no, generally different',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CONDP}:MC-2`],
    source: `${CONDP_SRC} — MC-2 rain/clouds trigger as probe, distractor-mapped`,
  },
]

// ─── math.prob.expected-value ────────────────────────────────────────────────
const EXPV = 'math.prob.expected-value'
const EXPV_SRC = 'docs/curriculum/blueprints/math.prob.expected-value.md'

const EXPV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXPV,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A lottery pays $0 with 90% chance and $100 with 10% chance. Is ' +
      'the expected value (0 + 100)/2 = $50? No — that formula ' +
      'silently assumes both outcomes are EQUALLY likely, which they ' +
      'are not. Expected value WEIGHTS each outcome by its own ' +
      'probability: E[X] = \u03a3 x\u00b7P(X=x) = 0(0.90) + 100(0.10) = $10. ' +
      'The plain average (x\u2081+\u2026+x\u2099)/n is only correct in the special ' +
      'case where every outcome truly is equally likely (like a fair ' +
      'die) — the moment probabilities differ, you must multiply ' +
      'each value by ITS OWN probability and sum, never divide by a ' +
      'flat count.',
    targetedMisconceptions: [`${EXPV}:MC-1`],
    source: `${EXPV_SRC} — MC-1 ARITHMETIC-AVERAGE-CONFUSION (lottery 90/10 weighting example)`,
  },
  {
    conceptId: EXPV,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A die-based game has expected value $3.50 — can any single ' +
      'roll actually pay out $3.50? No, and that is completely fine: ' +
      'expected value is a LONG-RUN AVERAGE, not a promise about any ' +
      'one trial. It describes what the average payout converges to ' +
      'over thousands of repetitions, not a value you should expect ' +
      'to see on any given play. Rejecting a fractional or ' +
      'unreachable E[X] as \u201cimpossible\u201d confuses the summary ' +
      'statistic with an actual outcome. (Separately: E[X] = ' +
      '\u03a3x\u00b7P(X=x) is the DISCRETE formula — for a continuous random ' +
      'variable described by a density f(x), the sum becomes an ' +
      'integral, E[X] = \u222bx\u00b7f(x)dx, since there are no individual point ' +
      'probabilities to sum over a continuum.)',
    targetedMisconceptions: [`${EXPV}:MC-3`, `${EXPV}:MC-2`],
    source: `${EXPV_SRC} — MC-3 EXPECTED-MUST-BE-ACHIEVABLE (long-run-average reframe) + MC-2 DISCRETE-FORMULA-FOR-CONTINUOUS (sum-to-integral note)`,
  },
]

const EXPV_PROBES: SeedProbe[] = [
  {
    conceptId: EXPV,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A lottery pays $0 with probability 0.9 and $100 with probability 0.1. What is E[X]?',
    choices: [
      { text: '$10 — weight each value by its own probability: 0(0.9) + 100(0.1)', isCorrect: true },
      { text: '$50 — average the two payout values', isCorrect: false, misconceptionId: `${EXPV}:MC-1` },
    ],
    correctValue: '$10',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EXPV}:MC-1`],
    source: `${EXPV_SRC} — MC-1 lottery trigger as probe, distractor-mapped`,
  },
  {
    conceptId: EXPV,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A game has E[X] = $3.50, but no single roll can pay exactly $3.50. Is this a valid expected value?',
    choices: [
      { text: 'Yes — expected value is a long-run average, not a value any single trial must produce', isCorrect: true },
      { text: 'No — an expected value that no outcome can actually achieve is impossible', isCorrect: false, misconceptionId: `${EXPV}:MC-3` },
    ],
    correctValue: 'yes, valid',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EXPV}:MC-3`],
    source: `${EXPV_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── phys.stat.maxwell-boltzmann ─────────────────────────────────────────────
const MAXB = 'phys.stat.maxwell-boltzmann'
const MAXB_SRC = 'docs/curriculum/blueprints/phys.stat.maxwell-boltzmann.md'

const MAXB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MAXB,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Maxwell-Boltzmann distribution has THREE distinct \u201ctypical ' +
      'speeds,\u201d and they are not the same number — a common shortcut ' +
      'treats them as interchangeable. The most PROBABLE speed v_p ' +
      'is where the distribution peaks (the single most common ' +
      'value); the MEAN speed \u27e8v\u27e9 averages every molecule\u2019s speed; ' +
      'the RMS speed v_rms = \u221a\u27e8v\u00b2\u27e9 is used in pressure and kinetic ' +
      'energy formulas. Because the distribution is skewed (a long ' +
      'tail toward high speeds, a hard floor at zero), these three ' +
      'measures come out in a fixed order: v_p < \u27e8v\u27e9 < v_rms — ' +
      'always, for any temperature. Using v_p where a formula needs ' +
      'v_rms (or vice versa) introduces a real, calculable error, not ' +
      'just a rounding difference.',
    targetedMisconceptions: [`${MAXB}:MC-1`],
    source: `${MAXB_SRC} — MC-1 (P28/P30: skewed-distribution ordering v_p < \u27e8v\u27e9 < v_rms)`,
  },
  {
    conceptId: MAXB,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Does doubling the temperature double the mean molecular ' +
      'speed? No — speed scales with the SQUARE ROOT of temperature, ' +
      'not temperature itself: \u27e8v\u27e9 \u221d \u221aT. Doubling T multiplies the ' +
      'mean speed by \u221a2 \u2248 1.41, not 2. This comes straight from ' +
      'equipartition: average kinetic energy \u00bdm\u27e8v\u00b2\u27e9 \u221d T, so \u27e8v\u00b2\u27e9 ' +
      '\u221d T and \u27e8v\u27e9 \u221d \u221aT \u2014 energy is linear in T, but speed is ' +
      'energy\u2019s square root. A second trap: the high-speed \u201ctail\u201d of ' +
      'the distribution looks negligible on a graph but is never ' +
      'truly zero — it is exactly that tail that lets a small ' +
      'fraction of molecules escape a planet\u2019s atmosphere or clear ' +
      'the activation-energy barrier in a chemical reaction. \u201cSmall\u201d ' +
      'is not \u201czero\u201d in a distribution with infinite support.',
    targetedMisconceptions: [`${MAXB}:MC-4`, `${MAXB}:MC-3`],
    source: `${MAXB_SRC} — MC-4 (\u27e8v\u27e9\u221d\u221aT scaling, equipartition argument) + MC-3 (high-speed-tail-is-negligible; escape/activation-energy consequence)`,
  },
]

const MAXB_PROBES: SeedProbe[] = [
  {
    conceptId: MAXB,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For a Maxwell-Boltzmann speed distribution, which ordering is correct?',
    choices: [
      { text: 'v_p < \u27e8v\u27e9 < v_rms — the most probable, mean, and RMS speeds are three distinct values in this fixed order', isCorrect: true },
      { text: 'v_p = \u27e8v\u27e9 = v_rms — the most probable, mean, and RMS speeds are the same value', isCorrect: false, misconceptionId: `${MAXB}:MC-1` },
    ],
    correctValue: 'v_p < \u27e8v\u27e9 < v_rms',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MAXB}:MC-1`],
    source: `${MAXB_SRC} — MC-1 ordering trigger as probe, distractor-mapped`,
  },
  {
    conceptId: MAXB,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'If the absolute temperature of a gas is doubled, what happens to the mean molecular speed?',
    choices: [
      { text: 'It increases by a factor of \u221a2 \u2248 1.41 — mean speed scales as \u221aT, not T', isCorrect: true },
      { text: 'It doubles — mean speed is directly proportional to temperature', isCorrect: false, misconceptionId: `${MAXB}:MC-4` },
    ],
    correctValue: '\u00d7\u221a2',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MAXB}:MC-4`],
    source: `${MAXB_SRC} — MC-4 doubling-temperature trigger as probe, distractor-mapped`,
  },
]

// ─── phys.qm.spin ─────────────────────────────────────────────────────────────
const SPIN = 'phys.qm.spin'
const SPIN_SRC = 'docs/curriculum/blueprints/phys.qm.spin.md'

const SPIN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SPIN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Is the electron literally \u201cspinning\u201d like a tiny top? Run the ' +
      'numbers and the picture explodes: if a particle of the ' +
      'electron\u2019s known size (~10\u207b\u00b9\u2077 m) rotated fast enough to ' +
      'produce angular momentum \u210f/2, its surface would need to move ' +
      'at ~10\u00b9\u2070 m/s \u2014 thirty times the speed of light. Impossible, ' +
      'so \u201cspin\u201d cannot be actual rotation. The name is a historical ' +
      'accident: spin is a purely QUANTUM internal degree of freedom, ' +
      'arising from the relativistic Dirac equation, with no spatial ' +
      'motion behind it at all. Contrast with ORBITAL angular ' +
      'momentum L, which genuinely comes from motion (p\u00d7r) and has ' +
      'a classical limit — spin has neither a spatial source nor a ' +
      'classical limit, and it persists even for a particle sitting ' +
      'perfectly still.',
    targetedMisconceptions: [`${SPIN}:MC-1`],
    source: `${SPIN_SRC} — MC-1 Electron spin is literal rotation (P28 faster-than-light surface speed + P33 orbital-vs-spin contrast)`,
  },
  {
    conceptId: SPIN,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '\u201cSpin-\u00bd\u201d does NOT mean the spin magnitude equals \u210f/2 — that ' +
      'number is only the MAXIMUM z-projection, S_z. The actual ' +
      'magnitude follows the general angular-momentum rule ' +
      '|S\u20d7|\u00b2 = s(s+1)\u210f\u00b2: for s = \u00bd, |S\u20d7|\u00b2 = (\u00bd)(3/2)\u210f\u00b2 = ' +
      '(3/4)\u210f\u00b2, so |S\u20d7| = (\u221a3/2)\u210f \u2248 0.866\u210f \u2014 LARGER than \u210f/2. If ' +
      'the total magnitude really equaled the z-projection, all of ' +
      'the spin would point exactly along z with zero transverse ' +
      'component — but [\u015c_x, \u015c_z] \u2260 0 forbids that certainty. This ' +
      'is the same pattern as orbital angular momentum: l = 1 gives ' +
      '|L\u20d7| = \u221a2\u210f, not \u210f. The quantum number labels the LADDER ' +
      'of allowed z-values, never the length of the full vector.',
    targetedMisconceptions: [`${SPIN}:MC-2`],
    source: `${SPIN_SRC} — MC-2 Spin-\u00bd means |S\u20d7|=\u210f/2 (s(s+1)\u210f\u00b2 formula; label-vs-magnitude distinction; commutator argument)`,
  },
]

const SPIN_PROBES: SeedProbe[] = [
  {
    conceptId: SPIN,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is electron spin, physically?',
    choices: [
      { text: 'A purely quantum-mechanical intrinsic angular momentum with no spatial rotation — actual rotation would require faster-than-light surface speed', isCorrect: true },
      { text: 'The electron literally spinning on its axis like a small top', isCorrect: false, misconceptionId: `${SPIN}:MC-1` },
    ],
    correctValue: 'intrinsic quantum property, not rotation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SPIN}:MC-1`],
    source: `${SPIN_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: SPIN,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'For a spin-\u00bd electron, what is the magnitude |S\u20d7| of its spin angular momentum?',
    choices: [
      { text: '(\u221a3/2)\u210f \u2248 0.866\u210f — from |S\u20d7|\u00b2 = s(s+1)\u210f\u00b2; \u210f/2 is only the maximum z-projection', isCorrect: true },
      { text: '\u210f/2 — because the spin quantum number is \u00bd', isCorrect: false, misconceptionId: `${SPIN}:MC-2` },
    ],
    correctValue: '(\u221a3/2)\u210f',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SPIN}:MC-2`],
    source: `${SPIN_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── eng.grammar.comparatives-and-superlatives ───────────────────────────────
const COMP = 'eng.grammar.comparatives-and-superlatives'
const COMP_SRC = 'docs/curriculum/blueprints/eng.grammar.comparatives-and-superlatives.md'

const COMP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cBeautifuler\u201d and \u201cmore tall\u201d are both wrong, for opposite ' +
      'reasons: English splits comparison by word LENGTH. Count the ' +
      'syllables in \u201cbeautiful\u201d: beau-ti-ful, three — and longer ' +
      'words (typically 3+ syllables, plus some 2-syllable endings ' +
      'like -ful, -ous, -ing) take \u201cmore/most\u201d instead: more ' +
      'beautiful, most beautiful. Short words (mostly 1 syllable, ' +
      'plus many common 2-syllable ones) take -er/-est: tall \u2192 ' +
      'taller \u2192 tallest; happy \u2192 happier \u2192 happiest. Before ' +
      'comparing any adjective, count its syllables first: short \u2192 ' +
      '-er/-est; long \u2192 more/most. It is a checkable test, not a ' +
      'guess.',
    targetedMisconceptions: [`${COMP}:MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST`],
    source: `${COMP_SRC} — MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST (P28 beautifuler syllable-count conflict + P33 tall/beautiful, happy/careful pairs)`,
  },
  {
    conceptId: COMP,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cGooder\u201d and \u201cbaddest\u201d apply the regular rule correctly — to ' +
      'the wrong words. A small, fixed set of very common words ' +
      'refuse BOTH regular patterns and carry their own memorized ' +
      'forms: good \u2192 better \u2192 best; bad \u2192 worse \u2192 worst; far \u2192 ' +
      'farther/further \u2192 farthest/furthest; little \u2192 less \u2192 least; ' +
      'much/many \u2192 more \u2192 most. These cannot be derived from ' +
      'syllable-counting or any other rule — they simply must be ' +
      'learned as a short list, the same way irregular past-tense ' +
      'verbs (go\u2192went) must be. The reassuring part: the list is ' +
      'genuinely short, and these words are so frequent that ' +
      'exposure alone reinforces them quickly.',
    targetedMisconceptions: [`${COMP}:MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES`],
    source: `${COMP_SRC} — MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES (P28 gooder conflict + P31 fixed-list memorization framing)`,
  },
]

const COMP_PROBES: SeedProbe[] = [
  {
    conceptId: COMP,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is the correct comparative form of \u201cbeautiful\u201d?',
    choices: [
      { text: '\u201cMore beautiful\u201d — 3-syllable words take more/most', isCorrect: true },
      { text: '\u201cBeautifuler\u201d — add -er to any adjective', isCorrect: false, misconceptionId: `${COMP}:MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST` },
    ],
    correctValue: 'more beautiful',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COMP}:MC-ALWAYS-ADD-ER-EST-OR-ALWAYS-USE-MORE-MOST`],
    source: `${COMP_SRC} — P28 beautifuler conflict as probe`,
  },
  {
    conceptId: COMP,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is the correct comparative form of \u201cgood\u201d?',
    choices: [
      { text: '\u201cBetter\u201d — good is one of a small set of irregular, memorized forms', isCorrect: true },
      { text: '\u201cGooder\u201d — apply the regular -er rule', isCorrect: false, misconceptionId: `${COMP}:MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES` },
    ],
    correctValue: 'better',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COMP}:MC-IRREGULAR-COMPARATIVES-ARE-JUST-MISTAKES`],
    source: `${COMP_SRC} — P28 gooder conflict as probe`,
  },
]

// ─── math.calc.antiderivatives ───────────────────────────────────────────────
const ANTID = 'math.calc.antiderivatives'
const ANTID_SRC = 'docs/curriculum/blueprints/math.calc.antiderivatives.md'

const ANTID_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANTID,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '\u222bx\u00b2 dx = x\u00b3/3 \u2014 or is it? Check by differentiating BACK: ' +
      'd/dx[x\u00b3/3] = x\u00b2 \u2713. But d/dx[x\u00b3/3 + 5] = x\u00b2 too, and so does ' +
      'd/dx[x\u00b3/3 \u2212 100]. EVERY function of the form x\u00b3/3 + C ' +
      '(any constant C) differentiates back to x\u00b2, because the ' +
      'derivative of any constant is zero \u2014 differentiation cannot ' +
      '\u201csee\u201d a constant shift. So there is no single \u201cTHE ' +
      'antiderivative\u201d \u2014 there is a whole FAMILY of them, all ' +
      'differing by a vertical shift, and \u222bf(x)dx = F(x) + C names ' +
      'the entire family at once. Omitting +C isn\u2019t a minor ' +
      'formality; it silently claims there is exactly one antiderivative ' +
      'when there are infinitely many.',
    targetedMisconceptions: [`${ANTID}:MC-1`, `${ANTID}:MC-3`],
    source: `${ANTID_SRC} — MC-1 CONSTANT-OMISSION + MC-3 ANTIDERIVATIVE-IS-UNIQUE (differentiate-back verification revealing the +C family)`,
  },
  {
    conceptId: ANTID,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The reverse power rule is NOT \u222bx\u207f dx = x\u207f\u207b\u00b9/n \u2014 that ' +
      'formula subtracts from the WRONG place. Check ∫x\u00b2dx with the ' +
      'wrong version: x\u00b9/2 = x/2. Differentiate that back: 1/2, not ' +
      'x\u00b2 \u2014 fails immediately. The correct rule ADDS 1 to the ' +
      'exponent and divides by the NEW exponent: \u222bx\u207f dx = ' +
      'x\u207f\u207a\u00b9/(n+1) + C. Check: \u222bx\u00b2dx = x\u00b3/3 + C; differentiate ' +
      'back \u2014 3\u00b7x\u00b2/3 = x\u00b2 \u2713. The reverse power rule literally ' +
      'undoes the power rule for derivatives (which SUBTRACTS 1 from ' +
      'the exponent and multiplies by the old exponent) \u2014 undoing ' +
      'a subtract-and-multiply means add-and-divide, not another ' +
      'subtract.',
    targetedMisconceptions: [`${ANTID}:MC-2`],
    source: `${ANTID_SRC} — MC-2 REVERSE-POWER-RULE-WRONG (n=2 differentiate-back falsification of the wrong formula)`,
  },
]

const ANTID_PROBES: SeedProbe[] = [
  {
    conceptId: ANTID,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'What is \u222bx\u00b2 dx?',
    choices: [
      { text: 'x\u00b3/3 + C — add 1 to the exponent, divide by the new exponent, and include the constant family', isCorrect: true },
      { text: 'x\u00b3/3 — no constant needed, since this is the one correct antiderivative', isCorrect: false, misconceptionId: `${ANTID}:MC-1` },
      { text: 'x/2 + C — subtract 1 from the exponent, divide by the original exponent', isCorrect: false, misconceptionId: `${ANTID}:MC-2` },
    ],
    correctValue: 'x\u00b3/3 + C',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ANTID}:MC-1`, `${ANTID}:MC-2`],
    source: `${ANTID_SRC} — MC-1/MC-2 combined probe (x\u00b2), distractor-mapped`,
  },
  {
    conceptId: ANTID,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Both x\u00b3/3 + 5 and x\u00b3/3 \u2212 100 differentiate back to x\u00b2. What does this tell you?',
    choices: [
      { text: 'There is no single \u201cTHE\u201d antiderivative — infinitely many functions differing by a constant all work, which is exactly why +C is required', isCorrect: true },
      { text: 'One of the two must be wrong, since a function can only have one antiderivative', isCorrect: false, misconceptionId: `${ANTID}:MC-3` },
    ],
    correctValue: 'infinite family, both valid',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ANTID}:MC-3`],
    source: `${ANTID_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.negation ────────────────────────────────────────────────────
const NEG = 'eng.grammar.negation'
const NEG_SRC = 'docs/curriculum/blueprints/eng.grammar.negation.md'

const NEG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NEG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cShe not likes tea\u201d feels like a natural way to negate a ' +
      'sentence \u2014 just drop in \u201cnot.\u201d But \u201cnot\u201d cannot attach ' +
      'directly to an ordinary conjugated verb; it attaches to an ' +
      'AUXILIARY (helping) verb or to \u201cbe.\u201d If the sentence already ' +
      'has one (is, are, has, can, will), \u201cnot\u201d slots in right after ' +
      'it: \u201cShe is not coming.\u201d If there is NO auxiliary \u2014 a plain ' +
      'simple-present or simple-past main verb \u2014 you must first ' +
      'INSERT do/does/did, and the main verb drops back to its base ' +
      'form: \u201cShe does not like tea\u201d (not \u201clikes\u201d). Same fix as ' +
      'question formation: check for an auxiliary first; supply ' +
      'do/does/did if none exists, then attach \u201cnot\u201d to THAT.',
    targetedMisconceptions: [`${NEG}:MC-JUST-ADD-NOT-ANYWHERE`],
    source: `${NEG_SRC} — MC-JUST-ADD-NOT-ANYWHERE (P28 no-auxiliary conflict + P30 do-insertion bridge)`,
  },
  {
    conceptId: NEG,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cI don\u2019t have no money\u201d \u2014 doesn\u2019t that make the negative ' +
      'STRONGER? In standard English grammar, no: a clause should ' +
      'carry only ONE negative word. \u201cI don\u2019t have no money\u201d pairs ' +
      'TWO negatives (\u201cdon\u2019t\u201d and \u201cno\u201d) in the same clause \u2014 ' +
      'non-standard in formal/school English, even though it works ' +
      'as emphatic intensification in many dialects and world ' +
      'languages (this is a genuine grammar of those varieties, not ' +
      'an error there). For standard/formal English, swap the ' +
      'second negative for its neutral counterpart: no\u2192any, ' +
      'nothing\u2192anything, never\u2192ever \u2014 giving \u201cI don\u2019t have ANY ' +
      'money,\u201d \u201cShe didn\u2019t say ANYTHING.\u201d One negative word per ' +
      'clause is the rule to apply in formal writing.',
    targetedMisconceptions: [`${NEG}:MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS`],
    source: `${NEG_SRC} — MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS (P30 one-negative-per-clause rule + dialect-honesty caveat)`,
  },
]

const NEG_PROBES: SeedProbe[] = [
  {
    conceptId: NEG,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'How do you correctly negate \u201cShe likes tea\u201d (simple present, no existing auxiliary)?',
    choices: [
      { text: '\u201cShe does not like tea\u201d — insert \u201cdoes,\u201d attach \u201cnot\u201d to it, and revert the verb to base form', isCorrect: true },
      { text: '\u201cShe not likes tea\u201d — attach \u201cnot\u201d directly after the main verb', isCorrect: false, misconceptionId: `${NEG}:MC-JUST-ADD-NOT-ANYWHERE` },
    ],
    correctValue: 'She does not like tea',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NEG}:MC-JUST-ADD-NOT-ANYWHERE`],
    source: `${NEG_SRC} — P28 no-auxiliary conflict as probe`,
  },
  {
    conceptId: NEG,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence is correct in standard/formal English?',
    choices: [
      { text: '\u201cI don\u2019t have any money\u201d — one negative word per clause', isCorrect: true },
      { text: '\u201cI don\u2019t have no money\u201d — two negatives make the negation even stronger', isCorrect: false, misconceptionId: `${NEG}:MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS` },
    ],
    correctValue: 'I don\u2019t have any money',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${NEG}:MC-DOUBLE-NEGATIVES-ARE-JUST-EXTRA-EMPHASIS`],
    source: `${NEG_SRC} — P28 double-negative conflict as probe`,
  },
]

// ─── eng.grammar.word-order ───────────────────────────────────────────────────
const WORD = 'eng.grammar.word-order'
const WORD_SRC = 'docs/curriculum/blueprints/eng.grammar.word-order.md'

const WORD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WORD,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cThe ball threw the boy\u201d \u2014 does this mean the boy threw the ' +
      'ball? No: in English, it says the BALL did the throwing, ' +
      'however silly that sounds. Some languages mark WHO-DID-WHAT ' +
      'with word endings (case), letting word order shuffle freely; ' +
      'English has almost none of that, so it leans entirely on ' +
      'POSITION: Subject-Verb-Object (SVO). The noun BEFORE the verb ' +
      'is understood as the doer; the noun AFTER is the receiver \u2014 ' +
      'full stop, regardless of what makes logical sense in the real ' +
      'world. \u201cThe dog bit the cat\u201d and \u201cthe cat bit the dog\u201d use ' +
      'identical words in reverse order and mean completely different ' +
      '(and equally grammatical) things. If your first language uses ' +
      'endings instead of order, expect this to feel unusually rigid ' +
      '\u2014 it is, and that rigidity is exactly what carries the ' +
      'meaning in English.',
    targetedMisconceptions: [`${WORD}:MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES`],
    source: `${WORD_SRC} — MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES (P28 ball-threw-the-boy conflict + P33 dog/cat reversal pair)`,
  },
  {
    conceptId: WORD,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cI like very much chocolate\u201d sounds reasonable if your first ' +
      'language allows the adverb between verb and object \u2014 English ' +
      'does not. Two positioning rules to fix at once: adjectives sit ' +
      'BEFORE their noun (\u201cthe red house,\u201d never \u201cthe house red\u201d); ' +
      'manner/degree adverbs like \u201cvery much\u201d or \u201cquickly\u201d typically ' +
      'come AFTER the full verb+object, not wedged between them \u2014 ' +
      '\u201cI like chocolate very much,\u201d never splitting the verb from ' +
      'its object. English tolerates almost no daylight between a ' +
      'verb and its direct object; when in doubt, keep them ' +
      'touching and add descriptive words before the noun or after ' +
      'the whole verb phrase.',
    targetedMisconceptions: [`${WORD}:MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE`],
    source: `${WORD_SRC} — MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE (P28 very-much-chocolate conflict + P31 verb-object adjacency rule)`,
  },
]

const WORD_PROBES: SeedProbe[] = [
  {
    conceptId: WORD,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In English, \u201cThe ball threw the boy\u201d means:',
    choices: [
      { text: 'The ball did the throwing — word order (not logic) determines the subject in English', isCorrect: true },
      { text: 'The boy threw the ball — the more logical meaning wins', isCorrect: false, misconceptionId: `${WORD}:MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES` },
    ],
    correctValue: 'the ball threw (as stated)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${WORD}:MC-WORD-ORDER-IS-FLEXIBLE-LIKE-OTHER-LANGUAGES`],
    source: `${WORD_SRC} — P28 ball-threw-the-boy conflict as probe`,
  },
  {
    conceptId: WORD,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which sentence has correct English word order?',
    choices: [
      { text: '\u201cI like chocolate very much\u201d — the adverb follows the full verb+object', isCorrect: true },
      { text: '\u201cI like very much chocolate\u201d — the adverb goes between the verb and object', isCorrect: false, misconceptionId: `${WORD}:MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE` },
    ],
    correctValue: 'I like chocolate very much',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${WORD}:MC-ADJECTIVES-AND-ADVERBS-CAN-GO-ANYWHERE`],
    source: `${WORD_SRC} — P28 very-much-chocolate conflict as probe`,
  },
]

// ─── phys.mod.bohr-model ──────────────────────────────────────────────────────
const BOHR = 'phys.mod.bohr-model'
const BOHR_SRC = 'docs/curriculum/blueprints/phys.mod.bohr-model.md'

const BOHR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BOHR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Which has higher energy: n=1 (ground state) or n=3? The ' +
      'instinct \u201cn=1 is innermost, so highest energy\u201d gets it ' +
      'backwards. E\u2081 = \u221213.6 eV; E\u2083 = \u221213.6/9 = \u22121.51 eV. Since ' +
      '\u22121.51 > \u221213.6, E\u2083 is the HIGHER energy \u2014 higher n means ' +
      'LESS negative energy, meaning less tightly bound. Picture the ' +
      'energy-level diagram literally: higher n sits physically higher ' +
      'on the page, climbing toward E_\u221e = 0 (a free, just-barely-unbound ' +
      'electron). n=1 sits at the very bottom, the MOST negative, the ' +
      'tightest binding \u2014 the ground state IS the minimum-energy ' +
      'state. Confirming evidence: it takes 13.6 eV to ionize from ' +
      'n=1, but only 1.51 eV from n=3 \u2014 far easier to knock the ' +
      'electron out of the higher, less-bound state.',
    targetedMisconceptions: [`${BOHR}:MC-1`],
    source: `${BOHR_SRC} — MC-1 MC-HIGHER-N-IS-LOWER-ENERGY (P28 E\u2081/E\u2083 numeric comparison + P30 diagram-height bridge)`,
  },
  {
    conceptId: BOHR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The Bohr model is not a universal atom formula \u2014 it works ' +
      'ONLY for hydrogen-like systems: exactly one electron orbiting ' +
      'a nucleus (H, He\u207a, Li\u00b2\u207a). Add a second electron and ' +
      'electron-electron repulsion breaks the clean single-particle ' +
      'orbit picture the model depends on \u2014 helium\u2019s actual spectrum ' +
      'cannot be derived from Bohr\u2019s formula. A second boundary: the ' +
      'Balmer series (visible-light lines, transitions ending at n=2) ' +
      'is only ONE piece of hydrogen\u2019s full spectrum \u2014 the Lyman ' +
      'series (ending at n=1, ultraviolet) and Paschen series (ending ' +
      'at n=3, infrared) are equally real transitions, just outside ' +
      'the visible range historians first noticed. \u201cHydrogen\u2019s ' +
      'spectrum\u201d means every possible n\u2192n\u2032 transition, not just the ' +
      'visible slice.',
    targetedMisconceptions: [`${BOHR}:MC-3`, `${BOHR}:MC-4`],
    source: `${BOHR_SRC} — MC-3 MC-BOHR-MODEL-APPLIES-TO-ALL-ATOMS + MC-4 MC-BALMER-SERIES-IS-ALL-OF-HYDROGEN-SPECTRUM (hydrogen-like scope limit + Lyman/Paschen completeness)`,
  },
]

const BOHR_PROBES: SeedProbe[] = [
  {
    conceptId: BOHR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which hydrogen energy level has HIGHER energy: n=1 or n=3?',
    choices: [
      { text: 'n=3 (E\u2083 = \u22121.51 eV) — higher n means less negative energy, less tightly bound', isCorrect: true },
      { text: 'n=1 (E\u2081 = \u221213.6 eV) — it is the innermost orbit, closest to the nucleus', isCorrect: false, misconceptionId: `${BOHR}:MC-1` },
    ],
    correctValue: 'n=3',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BOHR}:MC-1`],
    source: `${BOHR_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: BOHR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can the Bohr model formula correctly predict the spectrum of a helium atom (2 electrons)?',
    choices: [
      { text: 'No — the Bohr model applies only to hydrogen-like (single-electron) systems; electron-electron repulsion breaks its single-particle-orbit assumption', isCorrect: true },
      { text: 'Yes — the Bohr model applies to all atoms with the same formula', isCorrect: false, misconceptionId: `${BOHR}:MC-3` },
    ],
    correctValue: 'no — hydrogen-like only',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BOHR}:MC-3`],
    source: `${BOHR_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── phys.mod.de-broglie ──────────────────────────────────────────────────────
const DEB = 'phys.mod.de-broglie'
const DEB_SRC = 'docs/curriculum/blueprints/phys.mod.de-broglie.md'

const DEB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DEB,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Is de Broglie\u2019s idea that matter behaves as a wave just an ' +
      'untested theoretical guess? No \u2014 it was directly MEASURED just ' +
      'three years after being proposed. De Broglie hypothesized ' +
      '\u03bb = h/(mv) in 1924; in 1927, Davisson and Germer fired ' +
      'electrons at a nickel crystal and measured the SCATTERING ' +
      'pattern \u2014 the diffraction maxima landed exactly where Bragg\u2019s ' +
      'law predicted using de Broglie\u2019s wavelength formula. George ' +
      'Thomson independently confirmed electron diffraction the same ' +
      'era; the discovery won the 1937 Nobel Prize. Modern electron ' +
      'microscopes routinely image at sub-nanometer resolution using ' +
      'exactly these matter waves. This is not a model or an ' +
      'assumption \u2014 it is a measured, repeatedly confirmed physical ' +
      'fact.',
    targetedMisconceptions: [`${DEB}:MC-1`],
    source: `${DEB_SRC} — MC-1 MC-MATTER-WAVES-ONLY-THEORETICAL (P28 Davisson-Germer 1927 diffraction evidence + Nobel Prize citation)`,
  },
  {
    conceptId: DEB,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Does a thrown baseball have a de Broglie wavelength? YES \u2014 ' +
      'every moving object does, by \u03bb = h/(mv). The reason you never ' +
      'SEE a baseball diffract is scale, not exemption: a 0.15 kg ' +
      'ball at 40 m/s gives \u03bb = 6.6\u00d710\u207b\u00b3\u2074/(0.15\u00d740) \u2248 ' +
      '1.1\u00d710\u207b\u00b3\u2074 m \u2014 vastly smaller than any slit or obstacle a ' +
      'baseball could ever encounter, so no observable diffraction ' +
      'ever shows up. Compare an electron: tiny mass makes its ' +
      'wavelength comparable to atomic spacings, so diffraction is ' +
      'easily seen (that is exactly the Davisson-Germer result). ' +
      'Every particle has SOME wave nature \u2014 whether it is ' +
      'observable depends entirely on whether \u03bb is large enough ' +
      'relative to the obstacles around it, not on some macroscopic ' +
      'exemption from quantum rules.',
    targetedMisconceptions: [`${DEB}:MC-2`],
    source: `${DEB_SRC} — MC-2 MC-BASEBALL-HAS-NO-WAVE-NATURE (\u03bb = h/mv numeric baseball calculation vs. electron contrast)`,
  },
]

const DEB_PROBES: SeedProbe[] = [
  {
    conceptId: DEB,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Has de Broglie\u2019s matter-wave hypothesis been experimentally confirmed?',
    choices: [
      { text: 'Yes — Davisson and Germer (1927) measured electron diffraction matching \u03bb = h/(mv); it won the 1937 Nobel Prize', isCorrect: true },
      { text: 'No — it remains an unverified theoretical assumption', isCorrect: false, misconceptionId: `${DEB}:MC-1` },
    ],
    correctValue: 'yes — Davisson-Germer 1927',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DEB}:MC-1`],
    source: `${DEB_SRC} — MC-1 probe question verbatim, distractor-mapped`,
  },
  {
    conceptId: DEB,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does a thrown baseball have a de Broglie wavelength?',
    choices: [
      { text: 'Yes — every moving object does (\u03bb = h/mv), but a baseball\u2019s \u03bb is so tiny (~10\u207b\u00b3\u2074 m) that no diffraction is ever observable', isCorrect: true },
      { text: 'No — macroscopic objects like baseballs have no wave nature at all', isCorrect: false, misconceptionId: `${DEB}:MC-2` },
    ],
    correctValue: 'yes, but unobservably tiny',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DEB}:MC-2`],
    source: `${DEB_SRC} — MC-2 probe question verbatim, distractor-mapped`,
  },
]

// ─── eng.grammar.question-formation ──────────────────────────────────────────
const QF = 'eng.grammar.question-formation'
const QF_SRC = 'docs/curriculum/blueprints/eng.grammar.question-formation.md'

const QF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QF,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cDoes she is coming?\u201d stacks TWO helping verbs where only one ' +
      'belongs. The do/does/did rule has a condition attached: use ' +
      'it ONLY when the statement has NO other auxiliary or \u201cbe\u201d verb ' +
      'already. \u201cShe likes tea\u201d has no helper \u2192 add \u201cdoes\u201d and ' +
      'invert: \u201cDoes she like tea?\u201d (verb drops to base form). But ' +
      '\u201cShe is coming\u201d ALREADY has \u201cis\u201d \u2014 just invert that existing ' +
      'word with the subject: \u201cIs she coming?\u201d Adding \u201cdoes\u201d on top ' +
      'creates a double-auxiliary error. Same logic for \u201ccan\u201d: \u201cThey ' +
      'can swim\u201d \u2192 invert \u201ccan\u201d \u2192 \u201cCan they swim?\u201d, never \u201cDo they ' +
      'can swim?\u201d Check for an existing helper FIRST; only reach ' +
      'for do/does/did when the cupboard is bare.',
    targetedMisconceptions: [`${QF}:MC-JUST-ADD-DO-TO-ANY-STATEMENT`],
    source: `${QF_SRC} — MC-JUST-ADD-DO-TO-ANY-STATEMENT (P28 double-auxiliary conflict + P33 likes-tea/is-coming pair)`,
  },
  {
    conceptId: QF,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cWhere you are going?\u201d puts the question word up front and ' +
      'stops there \u2014 but the question word ALONE never finishes the ' +
      'job. Wh-questions need the question word PLUS the exact same ' +
      'inversion (or do/does/did) that yes/no questions use: \u201cWhere ' +
      'ARE you going?\u201d (invert \u201care\u201d with \u201cyou\u201d), never \u201cWhere you ' +
      'are going?\u201d (statement order left untouched after the ' +
      'question word). Same for do-insertion cases: \u201cWhat does she ' +
      'want?\u201d (does + base verb), not \u201cWhat she wants?\u201d The question ' +
      'word signals \u201cthis is a question\u201d to the ear, but the ' +
      'grammar still requires the inversion step \u2014 skipping it is ' +
      'the single most common wh-question error.',
    targetedMisconceptions: [`${QF}:MC-WH-QUESTIONS-DONT-NEED-INVERSION`],
    source: `${QF_SRC} — MC-WH-QUESTIONS-DONT-NEED-INVERSION (P28 where-you-are-going conflict + P33 what-does-she-want pair)`,
  },
]

const QF_PROBES: SeedProbe[] = [
  {
    conceptId: QF,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'How do you correctly turn \u201cShe is coming\u201d into a question?',
    choices: [
      { text: '\u201cIs she coming?\u201d — invert the existing auxiliary \u201cis\u201d with the subject', isCorrect: true },
      { text: '\u201cDoes she is coming?\u201d — add \u201cdoes\u201d in front', isCorrect: false, misconceptionId: `${QF}:MC-JUST-ADD-DO-TO-ANY-STATEMENT` },
    ],
    correctValue: 'Is she coming?',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${QF}:MC-JUST-ADD-DO-TO-ANY-STATEMENT`],
    source: `${QF_SRC} — P28 double-auxiliary conflict as probe`,
  },
  {
    conceptId: QF,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which is the correct wh-question for \u201cYou are going [somewhere]\u201d?',
    choices: [
      { text: '\u201cWhere are you going?\u201d — question word plus inversion of \u201care\u201d with the subject', isCorrect: true },
      { text: '\u201cWhere you are going?\u201d — the question word alone is enough to signal a question', isCorrect: false, misconceptionId: `${QF}:MC-WH-QUESTIONS-DONT-NEED-INVERSION` },
    ],
    correctValue: 'Where are you going?',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${QF}:MC-WH-QUESTIONS-DONT-NEED-INVERSION`],
    source: `${QF_SRC} — P28 where-you-are-going conflict as probe`,
  },
]

// ─── math.trig.unit-circle ────────────────────────────────────────────────────
const UCIRC = 'math.trig.unit-circle'
const UCIRC_SRC = 'docs/curriculum/blueprints/math.trig.unit-circle.md'

const UCIRC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: UCIRC,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Right-triangle sin \u03b8 = opposite/hypotenuse. Unit-circle sin ' +
      '\u03b8 = y. Two different formulas \u2014 which is correct? Neither ' +
      'contradicts the other: the unit circle IS a right triangle, ' +
      'with the hypotenuse forced to length 1. Draw the radius from ' +
      'the origin to the point (x, y) on the circle, drop a vertical ' +
      'line to the x-axis, and you get a right triangle with ' +
      'hypotenuse = 1 (the radius), adjacent side = x, opposite side ' +
      '= y. Now the right-triangle formula and the unit-circle ' +
      'formula are the SAME statement: sin \u03b8 = opposite/hypotenuse = ' +
      'y/1 = y. The unit circle does not replace the right-triangle ' +
      'definition; it is the SAME definition with hypotenuse fixed ' +
      'at 1, extended to work for angles the triangle picture ' +
      'cannot reach (past 90\u00b0, negative angles, angles beyond a ' +
      'full turn).',
    targetedMisconceptions: [`${UCIRC}:MC-1`],
    source: `${UCIRC_SRC} — MC-1 UNIT-CIRCLE-CONTRADICTS-RIGHT-TRIANGLE (TA-B01: hypotenuse=1 embedding argument)`,
  },
  {
    conceptId: UCIRC,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two memory traps on the unit circle. First: which coordinate ' +
      'is sin, which is cos? Anchor on \u03b8 = 0: the point sits at ' +
      '(1, 0) \u2014 pointing along the x-axis. cos(0) = 1 (correct \u2014 ' +
      'cosine starts at its maximum), so cos must be the x-coordinate; ' +
      'sin(0) = 0, so sin is the y-coordinate. (\u201cx before y\u201d ' +
      'alphabetically matches \u201ccos before sin\u201d alphabetically \u2014 a ' +
      'handy check.) Second: which direction does \u03b8 increase? ' +
      'MATHEMATICAL convention is COUNTERCLOCKWISE \u2014 the OPPOSITE of ' +
      'a clock face or compass bearings, which is exactly why this ' +
      'trips people up. At \u03b8 = 90\u00b0 (counterclockwise from the ' +
      'positive x-axis) the point is straight UP at (0, 1), never ' +
      'down at (0, \u22121). Always rotate counterclockwise from the ' +
      'positive x-axis, never clockwise.',
    targetedMisconceptions: [`${UCIRC}:MC-2`, `${UCIRC}:MC-3`],
    source: `${UCIRC_SRC} — MC-2 X-IS-SIN-Y-IS-COS + MC-3 ANGLE-INCREASES-CLOCKWISE (\u03b8=0 anchor check + counterclockwise convention)`,
  },
]

const UCIRC_PROBES: SeedProbe[] = [
  {
    conceptId: UCIRC,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'On the unit circle, what are the coordinates of the point at \u03b8 = 90\u00b0?',
    choices: [
      { text: '(0, 1) — counterclockwise rotation from the positive x-axis puts 90\u00b0 straight up', isCorrect: true },
      { text: '(0, \u22121) — clockwise rotation puts 90\u00b0 straight down', isCorrect: false, misconceptionId: `${UCIRC}:MC-3` },
    ],
    correctValue: '(0, 1)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${UCIRC}:MC-3`],
    source: `${UCIRC_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
  {
    conceptId: UCIRC,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'At \u03b8 = 0\u00b0, the unit-circle point is (1, 0). Which is cos(0) and which is sin(0)?',
    choices: [
      { text: 'cos(0) = 1 (the x-coordinate); sin(0) = 0 (the y-coordinate)', isCorrect: true },
      { text: 'sin(0) = 1 (the y-coordinate); cos(0) = 0 (the x-coordinate)', isCorrect: false, misconceptionId: `${UCIRC}:MC-2` },
    ],
    correctValue: 'cos=x=1, sin=y=0',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${UCIRC}:MC-2`],
    source: `${UCIRC_SRC} — MC-2 trigger as probe, distractor-mapped`,
  },
]

// ─── math.linalg.determinant ──────────────────────────────────────────────────
const DET = 'math.linalg.determinant'
const DET_SRC = 'docs/curriculum/blueprints/math.linalg.determinant.md'

const DET_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DET,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'det([[3,1],[2,4]]) = 3\u00d74 \u2212 1\u00d72 = 10 \u2014 correct arithmetic, but ' +
      'what does \u201c10\u201d actually MEAN? The determinant is the SCALE ' +
      'FACTOR by which the matrix stretches or shrinks area (2D) or ' +
      'volume (3D): a matrix with determinant 10 takes any region ' +
      'and multiplies its area by exactly 10. A NEGATIVE determinant ' +
      'means the transformation also FLIPS orientation (like a ' +
      'mirror). And det(A) = 0 means the transformation SQUASHES ' +
      'everything onto a lower-dimensional space (a line, or a ' +
      'point) \u2014 area collapses to zero, which is exactly why ' +
      'det(A) = 0 signals that A is NOT invertible: you cannot undo ' +
      'a squash, since infinitely many input points landed on the ' +
      'same output point. The formula is a shortcut; the geometry is ' +
      'the meaning.',
    targetedMisconceptions: [`${DET}:MC-1`],
    source: `${DET_SRC} — MC-1 DETERMINANT-IS-JUST-A-FORMULA (TA-B01: area-scale-factor geometric interpretation)`,
  },
  {
    conceptId: DET,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Two traps that both stem from over-generalizing familiar ' +
      'rules. First: det(A+B) = det(A) + det(B) is FALSE in general ' +
      '\u2014 unlike trace, which genuinely is additive (tr(A+B) = ' +
      'tr(A)+tr(B)), the determinant is only linear in EACH ROW ' +
      'SEPARATELY, never across the whole sum; the valid ' +
      'multiplicative law is det(AB) = det(A)det(B), a completely ' +
      'different property. Check any nonzero example and the ' +
      'additive claim breaks immediately. Second: det(A) = 0 does ' +
      'NOT mean A is the zero matrix \u2014 [[1,2],[2,4]] has ' +
      'det = 1\u00d74\u22122\u00d72 = 0 while every entry is nonzero. What ' +
      'det = 0 actually signals is that the matrix\u2019s ROWS (or ' +
      'columns) are LINEARLY DEPENDENT \u2014 here row 2 is exactly twice ' +
      'row 1, so the transformation collapses 2D space onto a single ' +
      'line. \u201cZero determinant\u201d means \u201ccollapsed,\u201d never \u201cempty.\u201d',
    targetedMisconceptions: [`${DET}:MC-2`, `${DET}:MC-3`],
    source: `${DET_SRC} — MC-2 DET(A+B)=DET(A)+DET(B) (row-multilinearity-not-additivity) + MC-3 ZERO-DETERMINANT-MEANS-ZERO-MATRIX ([[1,2],[2,4]] counterexample, linear dependence)`,
  },
]

const DET_PROBES: SeedProbe[] = [
  {
    conceptId: DET,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Matrix A = [[1,2],[2,4]] has determinant 1\u00d74 \u2212 2\u00d72 = 0. What does this tell you about A?',
    choices: [
      { text: 'A\u2019s rows are linearly dependent (row 2 = 2\u00d7row 1); A collapses the plane onto a line and is not invertible — A itself is NOT the zero matrix', isCorrect: true },
      { text: 'A must be the zero matrix, since det = 0', isCorrect: false, misconceptionId: `${DET}:MC-3` },
    ],
    correctValue: 'linearly dependent rows, not invertible',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DET}:MC-3`],
    source: `${DET_SRC} — MC-3 [[1,2],[2,4]] counterexample as probe, distractor-mapped`,
  },
  {
    conceptId: DET,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is det(A+B) = det(A) + det(B) true for matrices in general?',
    choices: [
      { text: 'No — the determinant is not additive across the full matrix; it is only linear row-by-row (the valid product rule is det(AB) = det(A)det(B))', isCorrect: true },
      { text: 'Yes — determinants are linear, just like trace', isCorrect: false, misconceptionId: `${DET}:MC-2` },
    ],
    correctValue: 'no, not additive',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DET}:MC-2`],
    source: `${DET_SRC} — MC-2 trigger as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.direct-and-indirect-speech ──────────────────────────────────
const REP = 'eng.grammar.direct-and-indirect-speech'
const REP_SRC = 'docs/curriculum/blueprints/eng.grammar.direct-and-indirect-speech.md'

const REP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Converting \u201cShe said, \u2018I am tired\u2019\u201d to indirect speech is more ' +
      'than deleting the quotation marks. \u201cShe said I am tired\u201d still ' +
      'has the pronoun \u201cI\u201d and present-tense \u201cam\u201d as if SHE were ' +
      'speaking right now \u2014 but you are reporting HER words from a ' +
      'later moment. Three shifts happen together: (1) TENSE ' +
      'BACKSHIFT \u2014 present becomes past (\u201cam\u201d \u2192 \u201cwas\u201d), since you ' +
      'are reporting from later; (2) PRONOUN SHIFT \u2014 \u201cI\u201d becomes ' +
      '\u201cshe,\u201d matching who is actually speaking now (you, not her); ' +
      '(3) TIME/PLACE SHIFT \u2014 \u201ctomorrow\u201d becomes \u201cthe next day,\u201d ' +
      '\u201chere\u201d becomes \u201cthere.\u201d Correct result: \u201cShe said she was ' +
      'tired.\u201d All three shifts happen at once because they all ' +
      'flow from the same fact: you are speaking from a different ' +
      'time, place, and person than the original speaker.',
    targetedMisconceptions: [`${REP}:MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS`],
    source: `${REP_SRC} — MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS (P28 pronoun/tense conflict + P30 three-shift bridge)`,
  },
  {
    conceptId: REP,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '\u201cShe said the Earth orbited the Sun\u201d \u2014 backshifted correctly by ' +
      'the mechanical rule, but is it right? The Earth still DOES ' +
      'orbit the Sun, right now, as you report it \u2014 so English lets ' +
      'you SKIP the backshift for timeless facts: \u201cShe said the ' +
      'Earth orbits the Sun\u201d (present kept). Backshift exists to show ' +
      'a gap between when something was true and when you are ' +
      'reporting it; when nothing has changed \u2014 a scientific fact, ' +
      'or a still-current situation (\u201cHe said he LIVES in Boston,\u201d if ' +
      'he still does) \u2014 there is no gap to signal, so the rule ' +
      'becomes optional. Contrast with \u201cShe said she WAS tired\u201d: her ' +
      'tiredness was a specific, time-bound state, not a standing ' +
      'fact \u2014 backshift applies normally there. The rule follows the ' +
      'MEANING, not a mechanical switch.',
    targetedMisconceptions: [`${REP}:MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS`],
    source: `${REP_SRC} — MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS (P28 Earth-orbits conflict + P33 still-true vs time-bound pair)`,
  },
]

const REP_PROBES: SeedProbe[] = [
  {
    conceptId: REP,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Convert to indirect speech: She said, \u201cI am tired.\u201d',
    choices: [
      { text: '\u201cShe said she was tired\u201d — tense backshift (am\u2192was) and pronoun shift (I\u2192she) together', isCorrect: true },
      { text: '\u201cShe said I am tired\u201d — just remove the quotation marks', isCorrect: false, misconceptionId: `${REP}:MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS` },
    ],
    correctValue: 'She said she was tired',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${REP}:MC-INDIRECT-SPEECH-IS-JUST-REMOVING-QUOTATION-MARKS`],
    source: `${REP_SRC} — P28 pronoun/tense conflict as probe`,
  },
  {
    conceptId: REP,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Convert to indirect speech: She said, \u201cThe Earth orbits the Sun.\u201d',
    choices: [
      { text: '\u201cShe said the Earth orbits the Sun\u201d — present tense may be kept for a timeless fact still true now', isCorrect: true },
      { text: '\u201cShe said the Earth orbited the Sun\u201d — backshift is always mechanically required', isCorrect: false, misconceptionId: `${REP}:MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS` },
    ],
    correctValue: 'She said the Earth orbits the Sun',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REP}:MC-BACKSHIFT-ALWAYS-REQUIRED-REGARDLESS-OF-TRUTH-STATUS`],
    source: `${REP_SRC} — P28 Earth-orbits conflict as probe`,
  },
]

// ─── phys.wave.beats ──────────────────────────────────────────────────────────
const BEAT = 'phys.wave.beats'
const BEAT_SRC = 'docs/curriculum/blueprints/phys.wave.beats.md'

const BEAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BEAT,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Two tuning forks ring at 440 Hz and 442 Hz. Is the beat rate ' +
      'their AVERAGE, (440+442)/2 = 441 Hz? That would be one beat ' +
      'every 441 seconds \u2014 imperceptibly slow. Strike them together ' +
      'and you hear roughly TWO throbs per second instead: the beat ' +
      'frequency is the DIFFERENCE, |f\u2081 \u2212 f\u2082| = 2 Hz. The average ' +
      'is a real number too, but it answers a different question: ' +
      '441 Hz is the PITCH you hear (the carrier tone), while 2 Hz is ' +
      'the THROBBING rate of loud-soft-loud-soft. The sum-to-product ' +
      'formula produces both an average and a half-difference term; ' +
      'the ear perceives a loud peak TWICE per envelope cycle (once ' +
      'rising, once falling), doubling the half-difference back up to ' +
      'the full |f\u2081\u2212f\u2082|. Keep the two numbers strictly separate: ' +
      'average = pitch, difference = beat rate.',
    targetedMisconceptions: [`${BEAT}:MC-BEATS-FREQUENCY-IS-AVERAGE`],
    source: `${BEAT_SRC} — MC-BEATS-FREQUENCY-IS-AVERAGE (P28 440/442 Hz counting experiment + P30 pitch-vs-envelope-rate split)`,
  },
  {
    conceptId: BEAT,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Do beats require both tones to be EQUALLY loud? No \u2014 play a ' +
      '440 Hz tone at 80 dB alongside a 442 Hz tone at only 60 dB and ' +
      'you still hear throbbing, just less dramatic. With equal ' +
      'amplitudes, destructive interference drives the combined ' +
      'amplitude all the way to zero at the quiet moments \u2014 crisp, ' +
      'full-contrast beats. With UNEQUAL amplitudes A\u2081 \u2260 A\u2082, the ' +
      'quiet moments only drop to |A\u2081 \u2212 A\u2082| (never quite reaching ' +
      'zero, since the louder tone always leaves a residue) \u2014 lower ' +
      'contrast, but the throbbing RATE is unchanged, still ' +
      '|f\u2081\u2212f\u2082|. This is the exact same pattern as optical fringes ' +
      'with unequal-intensity sources: unequal amplitudes soften the ' +
      'contrast, they never eliminate the effect.',
    targetedMisconceptions: [`${BEAT}:MC-BEATS-NEED-SAME-AMPLITUDE`],
    source: `${BEAT_SRC} — MC-BEATS-NEED-SAME-AMPLITUDE (P28 80dB/60dB conflict + P30 |A\u2081\u2212A\u2082| residual-trough bridge)`,
  },
]

const BEAT_PROBES: SeedProbe[] = [
  {
    conceptId: BEAT,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two tuning forks ring at 440 Hz and 442 Hz. What beat frequency do you hear?',
    choices: [
      { text: '2 Hz — the beat frequency is |f\u2081 \u2212 f\u2082|', isCorrect: true },
      { text: '441 Hz — the beat frequency is the average of the two', isCorrect: false, misconceptionId: `${BEAT}:MC-BEATS-FREQUENCY-IS-AVERAGE` },
    ],
    correctValue: '2 Hz',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BEAT}:MC-BEATS-FREQUENCY-IS-AVERAGE`],
    source: `${BEAT_SRC} — P28 440/442 Hz case as probe, distractor-mapped`,
  },
  {
    conceptId: BEAT,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A loud 440 Hz tone and a much quieter 442 Hz tone play together. Do you still hear beats?',
    choices: [
      { text: 'Yes — at reduced contrast (the quiet moments drop to |A\u2081\u2212A\u2082|, not zero), but still at the same 2 Hz rate', isCorrect: true },
      { text: 'No — beats require both sources to have equal amplitude', isCorrect: false, misconceptionId: `${BEAT}:MC-BEATS-NEED-SAME-AMPLITUDE` },
    ],
    correctValue: 'yes, reduced contrast',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BEAT}:MC-BEATS-NEED-SAME-AMPLITUDE`],
    source: `${BEAT_SRC} — P28 unequal-amplitude conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.interjections ────────────────────────────────────────────────
const INTJ = 'eng.grammar.interjections'
const INTJ_SRC = 'docs/curriculum/blueprints/eng.grammar.interjections.md'

const INTJ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INTJ,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Does an interjection need an exclamation point and big emotion ' +
      '\u2014 like \u201cWow!\u201d or \u201cOuch!\u201d? Look at \u201cWell, I suppose that\u2019s ' +
      'true\u201d \u2014 \u201cwell\u201d is quiet and thoughtful, punctuated with just ' +
      'a comma, yet it is JUST AS MUCH an interjection: a word ' +
      'standing independently to express a reaction or emotion, big ' +
      'or small. \u201cOh, I didn\u2019t know that\u201d (mild realization), \u201cHmm, ' +
      'let me think\u201d (contemplation) \u2014 all interjections, all with a ' +
      'comma, none shouting. The exclamation point matches the ' +
      'INTENSITY of the emotion, not a rule about what counts as an ' +
      'interjection: strong feeling gets \u201c!\u201d, mild feeling gets \u201c,\u201d, ' +
      'and both are the same word class doing the same job at ' +
      'different volumes.',
    targetedMisconceptions: [`${INTJ}:MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS`],
    source: `${INTJ_SRC} — MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS (P28 well-comma conflict + P33 wow/well, ouch/hmm pairs)`,
  },
  {
    conceptId: INTJ,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Are \u201coh\u201d and \u201cwow\u201d just meaningless filler noise, not real ' +
      'words? They communicate something quite specific \u2014 \u201cwow\u201d = ' +
      'surprise, \u201couch\u201d = pain, \u201coh\u201d = realization, \u201cum\u201d = ' +
      'hesitation \u2014 which is the opposite of meaningless. ' +
      'Interjections ARE a genuine word class, the eighth one ' +
      'alongside nouns, verbs, adjectives, and the rest; they just ' +
      'work differently, standing grammatically INDEPENDENT from the ' +
      'sentence\u2019s normal subject-verb structure rather than filling a ' +
      'subject, object, or verb slot. Because they don\u2019t plug into ' +
      'the usual sentence machinery, it is tempting to write them ' +
      'off \u2014 but they carry real, specific communicative meaning, ' +
      'just delivered outside the ordinary grammar.',
    targetedMisconceptions: [`${INTJ}:MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS`],
    source: `${INTJ_SRC} — MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS (P28 meaningless-noise conflict + P30 genuine-eighth-word-class bridge)`,
  },
]

const INTJ_PROBES: SeedProbe[] = [
  {
    conceptId: INTJ,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In \u201cWell, I suppose that\u2019s true,\u201d is \u201cwell\u201d an interjection?',
    choices: [
      { text: 'Yes — interjections can express mild reactions with just a comma, not only strong emotion with an exclamation point', isCorrect: true },
      { text: 'No — interjections must be strong exclamations ending in \u201c!\u201d', isCorrect: false, misconceptionId: `${INTJ}:MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${INTJ}:MC-INTERJECTIONS-MUST-BE-EXCLAMATIONS-WITH-EXCLAMATION-POINTS`],
    source: `${INTJ_SRC} — P28 well-comma conflict as probe`,
  },
  {
    conceptId: INTJ,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is \u201couch\u201d in \u201cOuch! That hurt!\u201d meaningless filler noise?',
    choices: [
      { text: 'No — it is a genuine interjection communicating pain, a real word class standing grammatically independent', isCorrect: true },
      { text: 'Yes — interjections have no real grammatical status or meaning', isCorrect: false, misconceptionId: `${INTJ}:MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS` },
    ],
    correctValue: 'no, genuine word class',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${INTJ}:MC-INTERJECTIONS-ARE-JUST-FILLER-WITH-NO-GRAMMATICAL-STATUS`],
    source: `${INTJ_SRC} — P28 meaningless-noise conflict as probe`,
  },
]

// ─── phys.wave.superposition ─────────────────────────────────────────────────
const SUP = 'phys.wave.superposition'
const SUP_SRC = 'docs/curriculum/blueprints/phys.wave.superposition.md'

const SUP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SUP,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'When two waves meet and cancel, are they destroyed? Watch two ' +
      'ripples cross on a calm pond: at the instant they overlap the ' +
      'surface briefly shows their COMBINED pattern (possibly flat, ' +
      'if perfectly out of phase) \u2014 but keep watching and BOTH ' +
      'ripples emerge on the far side, completely unchanged, ' +
      'continuing with their original amplitude, frequency, and ' +
      'direction. Two people can hold separate conversations across ' +
      'a crowded room precisely because crossing sound waves do not ' +
      'permanently cancel each other. Superposition is a rule about ' +
      'a single MOMENT and POINT: y_total = y\u2081 + y\u2082, added there and ' +
      'then, not a permanent alteration. After the overlap ends, each ' +
      'wave simply carries on as if the other had never been there.',
    targetedMisconceptions: [`${SUP}:MC-WAVES-COLLIDE-AND-STOP`],
    source: `${SUP_SRC} — MC-WAVES-COLLIDE-AND-STOP (P28 crossing-sound-waves conversation evidence + s6 pond-ripple observation)`,
  },
  {
    conceptId: SUP,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Does superposition require both waves to share the same ' +
      'frequency? No \u2014 a piano CHORD proves otherwise: strike three ' +
      'keys at once, and three genuinely different frequencies add ' +
      'together, y_total = \u03a3y\u1d62, producing the rich complex waveform ' +
      'that reaches your ear \u2014 nobody doubts THAT works. Same-frequency ' +
      'superposition is just the SPECIAL case that produces a fixed, ' +
      'stationary interference pattern (constant maxima and minima at ' +
      'set points). Different frequencies still superpose \u2014 the sum ' +
      'is simply time-varying instead of fixed: beats (when the two ' +
      'frequencies are close) or a genuinely complex, non-sinusoidal ' +
      'waveform (music). The addition rule itself, y_total = \u03a3y\u1d62, ' +
      'never requires matching frequencies \u2014 it always holds.',
    targetedMisconceptions: [`${SUP}:MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY`],
    source: `${SUP_SRC} — MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY (P28 piano-chord evidence + P30 same-freq-as-special-case bridge)`,
  },
]

const SUP_PROBES: SeedProbe[] = [
  {
    conceptId: SUP,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two ripples on a pond cross each other and momentarily cancel at one point. What happens after they pass through?',
    choices: [
      { text: 'Both ripples continue on, completely unchanged in amplitude, frequency, and direction', isCorrect: true },
      { text: 'Both ripples are destroyed — they cancelled each other out permanently', isCorrect: false, misconceptionId: `${SUP}:MC-WAVES-COLLIDE-AND-STOP` },
    ],
    correctValue: 'both continue unchanged',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SUP}:MC-WAVES-COLLIDE-AND-STOP`],
    source: `${SUP_SRC} — s6 pond-ripple scenario as probe, distractor-mapped`,
  },
  {
    conceptId: SUP,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A piano chord plays three different frequencies at once. Do these waves superpose?',
    choices: [
      { text: 'Yes — superposition (y_total = \u03a3y\u1d62) applies to any waves regardless of frequency; different frequencies just produce a complex, non-sinusoidal sum', isCorrect: true },
      { text: 'No — superposition only works when all the waves share the same frequency', isCorrect: false, misconceptionId: `${SUP}:MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SUP}:MC-SUPERPOSITION-ONLY-FOR-SAME-FREQUENCY`],
    source: `${SUP_SRC} — P28 piano-chord evidence as probe, distractor-mapped`,
  },
]

// ─── math.geom.similar-triangles ─────────────────────────────────────────────
const SIM = 'math.geom.similar-triangles'
const SIM_SRC = 'docs/curriculum/blueprints/math.geom.similar-triangles.md'

const SIM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SIM,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Are two same-SIZE triangles with equal angles \u201csimilar\u201d or ' +
      '\u201ccongruent\u201d \u2014 does being congruent DISQUALIFY them from ' +
      'being similar? In everyday speech \u201csimilar\u201d means \u201calike but ' +
      'different\u201d \u2014 but in mathematics, similar triangles need ' +
      'equal angles and proportional sides with SOME scale factor k. ' +
      'Congruent triangles are simply the special case k = 1: same ' +
      'shape AND same size still satisfies \u201cproportional sides,\u201d it ' +
      'just happens that the proportion is 1:1. So congruence is not ' +
      'the OPPOSITE of similarity \u2014 it is a SUBSET: every congruent ' +
      'pair is automatically also similar, the way every square is ' +
      'also a rectangle. \u201cSimilar\u201d in math is the broader, inclusive ' +
      'category; \u201ccongruent\u201d narrows it to k = 1.',
    targetedMisconceptions: [`${SIM}:MC-1`],
    source: `${SIM_SRC} — MC-1 CONGRUENT-MEANS-SIMILAR (TA-B01: k=1 special-case reframe; square/rectangle analogy)`,
  },
  {
    conceptId: SIM,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two more traps once similarity criteria come up. First: does ' +
      'AA (two matching angles) really prove similarity, or do you ' +
      'need to check the third angle too? You don\u2019t \u2014 the third ' +
      'angle is FORCED: since every triangle\u2019s angles sum to 180\u00b0, ' +
      'once two angles match between triangles, the third automatically ' +
      'matches too (180\u00b0 minus the same two numbers). AA is not an ' +
      'incomplete shortcut; it is logically equivalent to AAA. ' +
      'Second: in \u25b3ABC ~ \u25b3DEF, the ORDER of letters is not decoration ' +
      '\u2014 it tells you exactly which sides correspond: A\u2194D, B\u2194E, ' +
      'C\u2194F, so AB/DE = BC/EF = AC/DF. Matching sides by their ' +
      'visual position in a drawing (\u201cboth bottom sides\u201d) instead of ' +
      'by the letter order in the similarity statement produces wrong ' +
      'ratios whenever the triangles are drawn at different ' +
      'orientations. Always read the correspondence from the ' +
      'STATEMENT, never from the picture.',
    targetedMisconceptions: [`${SIM}:MC-2`, `${SIM}:MC-3`],
    source: `${SIM_SRC} — MC-2 AA-NEEDS-THREE-ANGLES (angle-sum forces the third) + MC-3 CORRESPONDENCE-ORDER-DOESNT-MATTER (letter-order-not-picture-position rule)`,
  },
]

const SIM_PROBES: SeedProbe[] = [
  {
    conceptId: SIM,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two triangles have exactly the same angles AND exactly the same side lengths. Are they similar?',
    choices: [
      { text: 'Yes — congruent triangles (scale factor k=1) are automatically also similar', isCorrect: true },
      { text: 'No — since they are congruent, not similar, they cannot be similar too', isCorrect: false, misconceptionId: `${SIM}:MC-1` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SIM}:MC-1`],
    source: `${SIM_SRC} — MC-1 trigger as probe, distractor-mapped`,
  },
  {
    conceptId: SIM,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Two triangles share two pairs of equal angles. Is that enough to prove they are similar (AA), or must the third pair be checked too?',
    choices: [
      { text: 'AA alone is enough — the third angle is automatically forced by the 180\u00b0 angle-sum rule once two angles match', isCorrect: true },
      { text: 'The third pair of angles must also be checked before concluding similarity', isCorrect: false, misconceptionId: `${SIM}:MC-2` },
    ],
    correctValue: 'AA is sufficient',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SIM}:MC-2`],
    source: `${SIM_SRC} — MC-2 trigger as probe, distractor-mapped`,
  },
]

// ─── math.geom.slope ──────────────────────────────────────────────────────────
const SLOPE = 'math.geom.slope'
const SLOPE_SRC = 'docs/curriculum/blueprints/math.geom.slope.md'

const SLOPE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SLOPE,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Slope is \u201crise over run\u201d \u2014 \u0394y OVER \u0394x, never the other way ' +
      'around. For points (2,3) and (5,9): rise = change in y = ' +
      '9\u22123 = 6; run = change in x = 5\u22122 = 3; slope = 6/3 = 2. ' +
      'Flipping the fraction to \u0394x/\u0394y = 3/6 = 1/2 answers a ' +
      'completely different question. Anchor it physically: walk ' +
      'along the line \u2014 how far up (or down) do you climb (\u0394y, the ' +
      'RISE) for every step forward (\u0394x, the RUN)? \u201cRise\u201d ' +
      'naturally goes on top because you are measuring how much ' +
      'height you gain PER unit of horizontal travel. Write the ' +
      'formula the same way every time: m = (y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081), ' +
      'y-difference always on top.',
    targetedMisconceptions: [`${SLOPE}:MC-1`],
    source: `${SLOPE_SRC} — MC-1 DELTA-Y-OVER-DELTA-X-REVERSED (TA-B01: rise-per-run physical anchor)`,
  },
  {
    conceptId: SLOPE,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Two more slope traps. First: does slope change depending on ' +
      'WHICH two points you pick on a line? No \u2014 slope is a property ' +
      'of the WHOLE line, not of any particular pair of points on it. ' +
      'Using (0,1) and (2,5) gives slope 2; using (1,3) and (4,9) on ' +
      'the SAME line gives exactly the same slope, 2 \u2014 a straight ' +
      'line rises at one constant rate everywhere, by definition. ' +
      'Second: perpendicular lines do NOT share the same slope \u2014 ' +
      'that is the PARALLEL condition. Perpendicular slopes are ' +
      'NEGATIVE RECIPROCALS of each other: if one line has slope 3, ' +
      'the perpendicular line has slope \u22121/3 (flip and negate). ' +
      'Equal slopes mean the lines never meet (parallel); negative-' +
      'reciprocal slopes mean the lines cross at a perfect right ' +
      'angle.',
    targetedMisconceptions: [`${SLOPE}:MC-2`, `${SLOPE}:MC-3`],
    source: `${SLOPE_SRC} — MC-2 SLOPE-DEPENDS-ON-POINT-CHOICE (line-wide invariance) + MC-3 PERPENDICULAR-SLOPES-EQUAL (negative-reciprocal rule vs. parallel condition)`,
  },
]

const SLOPE_PROBES: SeedProbe[] = [
  {
    conceptId: SLOPE,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'What is the slope between (2,3) and (5,9)?',
    choices: [
      { text: '2 — (9\u22123)/(5\u22122) = 6/3', isCorrect: true },
      { text: '1/2 — (5\u22122)/(9\u22123) = 3/6', isCorrect: false, misconceptionId: `${SLOPE}:MC-1` },
    ],
    correctValue: '2',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SLOPE}:MC-1`],
    source: `${SLOPE_SRC} — MC-1 trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: SLOPE,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A line has slope 3. What is the slope of a line PERPENDICULAR to it?',
    choices: [
      { text: '\u22121/3 — the negative reciprocal', isCorrect: true },
      { text: '3 — perpendicular lines have equal slopes', isCorrect: false, misconceptionId: `${SLOPE}:MC-3` },
    ],
    correctValue: '\u22121/3',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SLOPE}:MC-3`],
    source: `${SLOPE_SRC} — MC-3 trigger as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.capitalization-rules ────────────────────────────────────────
const CAP = 'eng.grammar.capitalization-rules'
const CAP_SRC = 'docs/curriculum/blueprints/eng.grammar.capitalization-rules.md'

const CAP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    content:
      '\u201cWe went to the Beach\u201d \u2014 capitalize \u201cBeach\u201d because the trip ' +
      'felt special? Capitalization does not track how much you ' +
      'care; it tracks PROPER vs. COMMON nouns. \u201cBeach\u201d here names a ' +
      'general category of place, like \u201cpark\u201d or \u201cstore\u201d \u2014 a ' +
      'COMMON noun, lowercase. \u201cWaikiki Beach\u201d names one SPECIFIC, ' +
      'officially-named beach \u2014 a PROPER noun, capitalized. Same test ' +
      'for people-words: \u201cI love my mom\u201d keeps \u201cmom\u201d lowercase (a ' +
      'general role, common noun), but \u201cI love you, Mom\u201d capitalizes ' +
      'it \u2014 here \u201cMom\u201d is being used AS a name, in direct address, ' +
      'standing in for \u201cSarah\u201d or whatever her actual name is. Ask: ' +
      'does this word name one specific, particular thing with its ' +
      'own name, or a general category? Specific \u2192 capitalize; ' +
      'general \u2192 lowercase, no matter how emotionally significant it ' +
      'feels.',
    targetedMisconceptions: [`${CAP}:MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD`],
    source: `${CAP_SRC} — MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD (P28 Beach conflict + P33 mom/Mom, beach/Waikiki-Beach pairs)`,
  },
  {
    conceptId: CAP,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.EARLY,
    content:
      '\u201cThe dog barked. it ran to the door.\u201d \u2014 the FIRST word of the ' +
      'whole paragraph is capitalized, but the second sentence\u2019s ' +
      'first word, \u201cit,\u201d is not. The rule is NOT \u201ccapitalize once at ' +
      'the start of the document\u201d \u2014 it is \u201ccapitalize the first word ' +
      'after EVERY sentence-ending mark\u201d (period, question mark, ' +
      'exclamation point), applying fresh at every single sentence ' +
      'boundary, no matter how many sentences follow. Correct: \u201cThe ' +
      'dog barked. It ran to the door.\u201d Treat every period as a ' +
      'reset button: whatever comes right after gets capitalized, ' +
      'every time, all the way through the piece.',
    targetedMisconceptions: [`${CAP}:MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT`],
    source: `${CAP_SRC} — MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT (P28 dog-barked conflict + P31 period-as-reset-button rule)`,
  },
]

const CAP_PROBES: SeedProbe[] = [
  {
    conceptId: CAP,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.EARLY,
    stem: 'Which sentence uses capitalization correctly?',
    choices: [
      { text: '\u201cWe went to the beach\u201d — a general place category stays lowercase', isCorrect: true },
      { text: '\u201cWe went to the Beach\u201d — capitalize words that feel important', isCorrect: false, misconceptionId: `${CAP}:MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD` },
    ],
    correctValue: 'We went to the beach',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CAP}:MC-CAPITALIZE-ANY-IMPORTANT-SOUNDING-WORD`],
    source: `${CAP_SRC} — P28 Beach conflict as probe`,
  },
  {
    conceptId: CAP,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY,
    stem: 'Which is correctly capitalized: \u201cThe dog barked. It ran to the door.\u201d or \u201cThe dog barked. it ran to the door.\u201d?',
    choices: [
      { text: '\u201cThe dog barked. It ran to the door.\u201d — every new sentence needs its own capital first letter', isCorrect: true },
      { text: '\u201cThe dog barked. it ran to the door.\u201d — only the very first word of the whole text needs a capital', isCorrect: false, misconceptionId: `${CAP}:MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT` },
    ],
    correctValue: 'The dog barked. It ran to the door.',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CAP}:MC-CAPITALIZE-ONLY-THE-VERY-FIRST-WORD-OF-A-TEXT`],
    source: `${CAP_SRC} — P28 dog-barked conflict as probe`,
  },
]

// ─── math.geom.coordinate-plane ──────────────────────────────────────────────
const COORD = 'math.geom.coordinate-plane'
const COORD_SRC = 'docs/curriculum/blueprints/math.geom.coordinate-plane.md'

const COORD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COORD,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'To plot (3, \u22122): move HORIZONTALLY first, then VERTICALLY \u2014 ' +
      'never the reverse. The first number, x, is always the ' +
      'left-right position; the second number, y, is always the ' +
      'up-down position. Plotting \u201cup 3, then left 2\u201d for (3,\u22122) ' +
      'lands you at a completely different spot than the intended ' +
      'one. Memory anchor: x comes before y alphabetically, matching ' +
      '\u201cacross before up\u201d in the reading order of the pair. Practice ' +
      'the ritual every time: read the FIRST number, move that many ' +
      'units left or right; read the SECOND number, move that many ' +
      'units up or down. Order is not decoration in (x, y) \u2014 it IS ' +
      'the entire instruction.',
    targetedMisconceptions: [`${COORD}:MC-1`],
    source: `${COORD_SRC} — MC-1 AXIS-SWAP (horizontal-then-vertical reading order; alphabetical x-before-y mnemonic)`,
  },
  {
    conceptId: COORD,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Two more traps once plotting is solid. First: is (\u22124, 2) in ' +
      'Quadrant IV? No \u2014 derive quadrants from the AXES directly, ' +
      'never memorize them as isolated facts: left of the y-axis ' +
      'means x < 0; above the x-axis means y > 0; (negative, ' +
      'positive) is Quadrant II, not IV. Re-derive the sign pattern ' +
      'every time rather than guessing from a half-remembered ' +
      'number. Second: is the origin the BOTTOM-LEFT corner of the ' +
      'plane, like a ruler that starts at zero? No \u2014 the origin is ' +
      'the CENTER, and axes extend in BOTH directions from it. A ' +
      'point like (\u22123, 2) is not \u201cimpossible\u201d or \u201coff the grid\u201d \u2014 ' +
      'it sits 3 units LEFT of and 2 units ABOVE the origin, exactly ' +
      'as valid as any positive-coordinate point.',
    targetedMisconceptions: [`${COORD}:MC-2`, `${COORD}:MC-3`],
    source: `${COORD_SRC} — MC-2 QUADRANT-SIGN-ERROR (re-derive-from-axes rule) + MC-3 ORIGIN-AS-CORNER (origin-as-center reframe)`,
  },
]

const COORD_PROBES: SeedProbe[] = [
  {
    conceptId: COORD,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'To plot the point (3, \u22122), which movement is correct?',
    choices: [
      { text: 'Move 3 units right, then 2 units down', isCorrect: true },
      { text: 'Move 3 units up, then 2 units left', isCorrect: false, misconceptionId: `${COORD}:MC-1` },
    ],
    correctValue: '3 right, 2 down',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${COORD}:MC-1`],
    source: `${COORD_SRC} — MC-1 trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: COORD,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Which quadrant contains the point (\u22124, 2)?',
    choices: [
      { text: 'Quadrant II — left of the y-axis (x<0) and above the x-axis (y>0)', isCorrect: true },
      { text: 'Quadrant IV — negative x means the right side', isCorrect: false, misconceptionId: `${COORD}:MC-2` },
    ],
    correctValue: 'Quadrant II',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${COORD}:MC-2`],
    source: `${COORD_SRC} — MC-2 trigger case as probe, distractor-mapped`,
  },
]

// ─── math.geom.vectors-2d ────────────────────────────────────────────────────
const VEC2 = 'math.geom.vectors-2d'
const VEC2_SRC = 'docs/curriculum/blueprints/math.geom.vectors-2d.md'

const VEC2_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VEC2,
    subjectSlug: 'mathematics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Is the vector (3,4) the same thing as the POINT (3,4)? No \u2014 ' +
      'and this distinction unlocks everything about vectors. A ' +
      'point is a fixed LOCATION. A vector (3,4) is a DISPLACEMENT: ' +
      '\u201cmove 3 right and 4 up,\u201d regardless of where you start. Draw ' +
      'that arrow starting at the origin, or starting at (10, 20), ' +
      'or starting at (\u22125, \u22125) \u2014 all three arrows have the same ' +
      'length and the same direction, so they are ALL the SAME ' +
      'vector (3,4), just drawn (or \u201cplaced\u201d) at different tails. A ' +
      'vector is \u201cfree\u201d \u2014 it can slide anywhere in the plane without ' +
      'changing what it IS, because what defines it is the ' +
      'change-in-position it represents, never a fixed spot.',
    targetedMisconceptions: [`${VEC2}:MC-1`],
    source: `${VEC2_SRC} — MC-1 VECTOR-IS-A-POINT (TA-B01: displacement-not-location; free-vector translation invariance)`,
  },
  {
    conceptId: VEC2,
    subjectSlug: 'mathematics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two traps in vector arithmetic. First: the magnitude of ' +
      '(3,4) is NOT 3+4=7 \u2014 the components are the legs of a right ' +
      'triangle, and the vector\u2019s length is the HYPOTENUSE: ' +
      '|v| = \u221a(3\u00b2+4\u00b2) = \u221a25 = 5 (the Pythagorean theorem, applied ' +
      'to the arrow\u2019s own right-triangle shape). Second: does ' +
      'multiplying by a negative scalar make the magnitude negative? ' +
      'No \u2014 \u22122\u00d7(3,4) = (\u22126,\u22128), and its magnitude is ' +
      '\u221a((\u22126)\u00b2+(\u22128)\u00b2) = \u221a100 = 10, POSITIVE, exactly double the ' +
      'original length 5. The negative sign REVERSES the DIRECTION ' +
      '(the arrow now points the opposite way) but never touches the ' +
      'MAGNITUDE, which is a length \u2014 lengths are never negative, by ' +
      'definition. Keep direction and magnitude as two completely ' +
      'separate properties.',
    targetedMisconceptions: [`${VEC2}:MC-2`, `${VEC2}:MC-3`],
    source: `${VEC2_SRC} — MC-2 MAGNITUDE-IS-COORDINATE-SUM (Pythagorean hypotenuse) + MC-3 NEGATIVE-SCALAR-REVERSES-MAGNITUDE (direction-vs-magnitude separation)`,
  },
]

const VEC2_PROBES: SeedProbe[] = [
  {
    conceptId: VEC2,
    subjectSlug: 'mathematics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the magnitude of the vector (3, 4)?',
    choices: [
      { text: '5 — \u221a(3\u00b2+4\u00b2) = \u221a25', isCorrect: true },
      { text: '7 — 3 + 4', isCorrect: false, misconceptionId: `${VEC2}:MC-2` },
    ],
    correctValue: '5',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${VEC2}:MC-2`],
    source: `${VEC2_SRC} — MC-2 trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: VEC2,
    subjectSlug: 'mathematics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Vector (3,4) has magnitude 5. What is the magnitude of \u22122\u00d7(3,4)?',
    choices: [
      { text: '10 — magnitude is always non-negative; the scalar\u2019s sign only reverses direction, and |\u22122|\u00d75 = 10', isCorrect: true },
      { text: '\u221210 — the negative scalar makes the magnitude negative', isCorrect: false, misconceptionId: `${VEC2}:MC-3` },
    ],
    correctValue: '10',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VEC2}:MC-3`],
    source: `${VEC2_SRC} — MC-3 trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.displacement ────────────────────────────────────────────────
const DISP = 'phys.mech.displacement'
const DISP_SRC = 'docs/curriculum/blueprints/phys.mech.displacement.md'

const DISP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DISP,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Walk 3 metres forward, then walk 3 metres back to exactly where you ' +
      'started. How far did you travel? 6 metres — your feet covered 6 ' +
      'metres of ground, and that total ground covered is called distance. ' +
      'But where did you END UP compared to where you began? Right back at ' +
      'the start — zero change in position. That "change in position, ' +
      'start to finish, ignoring the journey" is displacement, and here ' +
      'it is zero even though you walked a full 6 metres. Distance asks ' +
      '"how much ground?"; displacement asks "how far, and which way, from ' +
      'start to finish?" — two different questions about the same walk.',
    targetedMisconceptions: [`${DISP}:MC-DISPLACEMENT-IS-DISTANCE`],
    source: `${DISP_SRC} — §1 Learning Objective + MC-DISPLACEMENT-IS-DISTANCE (round-trip zero-displacement anchor)`,
  },
  {
    conceptId: DISP,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Displacement is a straight-line arrow from start position to finish ' +
      'position — it never follows the road, the curve, or the zigzag you ' +
      'actually travelled. If a hiker follows a winding trail from camp to ' +
      'a lake 2 km away as the crow flies, but the trail itself is 5 km ' +
      'long, the distance walked is 5 km while the displacement is 2 km in ' +
      'the direction of the lake — a single vector, computed as ' +
      'Δx = x_final − x_initial, that would be identical even if the ' +
      'hiker had teleported straight there. Distance only ever adds up ' +
      '(it can never decrease as you move); displacement can be positive, ' +
      'negative, or exactly zero, because it depends only on the two ' +
      'endpoints, never on the path connecting them.',
    targetedMisconceptions: [`${DISP}:MC-DISPLACEMENT-IS-PATH`],
    source: `${DISP_SRC} — MC-DISPLACEMENT-IS-PATH (straight-arrow vs. actual-route contrast)`,
  },
  {
    conceptId: DISP,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'It feels natural to report "I walked 6 m, so my displacement is ' +
      '6 m" — but that quietly answers the distance question while ' +
      'labelling the answer "displacement." Test it on a round trip: walk ' +
      '3 m east, then 3 m west, back to your exact starting tile. Distance ' +
      '= 3 + 3 = 6 m (ground covered never uncounts). Displacement = ' +
      'x_final − x_initial = 0 − 0 = 0 m (you are exactly where you began). ' +
      'They cannot both be 6 m — one measures accumulated path length, the ' +
      'other measures net position change. The giveaway signal that ' +
      'distance has been substituted for displacement: a "displacement" ' +
      'answer that stays positive and grows even on a trip that clearly ' +
      'returns to the start.',
    targetedMisconceptions: [`${DISP}:MC-DISPLACEMENT-IS-DISTANCE`],
    source: `${DISP_SRC} — MC-DISPLACEMENT-IS-DISTANCE conflict_evidence [P28] rendered as teaching text`,
  },
]

const DISP_PROBES: SeedProbe[] = [
  {
    conceptId: DISP,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A runner jogs 400 m around a circular track and ends up back at the starting line. What is the runner’s displacement?',
    choices: [
      { text: '0 m — the runner returns to the exact starting position', isCorrect: true },
      { text: '400 m — that is how far the runner ran', isCorrect: false, misconceptionId: `${DISP}:MC-DISPLACEMENT-IS-DISTANCE` },
    ],
    correctValue: '0 m',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${DISP}:MC-DISPLACEMENT-IS-DISTANCE`],
    source: `${DISP_SRC} — MC-DISPLACEMENT-IS-DISTANCE trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: DISP,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A delivery van follows a winding road 12 km long to a depot that is 5 km away in a straight line from the start. What is the magnitude of the van’s displacement?',
    choices: [
      { text: '5 km — the straight-line separation between start and finish, regardless of the winding road', isCorrect: true },
      { text: '12 km — that is the length of the road actually driven', isCorrect: false, misconceptionId: `${DISP}:MC-DISPLACEMENT-IS-PATH` },
    ],
    correctValue: '5 km',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DISP}:MC-DISPLACEMENT-IS-PATH`],
    source: `${DISP_SRC} — MC-DISPLACEMENT-IS-PATH trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.free-body-diagram ───────────────────────────────────────────
const FBD = 'phys.mech.free-body-diagram'
const FBD_SRC = 'docs/curriculum/blueprints/phys.mech.free-body-diagram.md'

const FBD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FBD,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A free-body diagram answers exactly one question: for THIS object ' +
      'alone, what is touching it or pulling on it right now? Isolate the ' +
      'object — draw it as a dot or box, erase everything else from the ' +
      'scene — and add one arrow for every real force acting ON it: ' +
      'weight always (gravity never switches off), normal force if a ' +
      'surface touches it, tension if a rope pulls it, friction if a rough ' +
      'surface rubs it, an applied force if something pushes or pulls it ' +
      'directly. Nothing else goes on the diagram — not the force the ' +
      'object exerts on other things, not a leftover "force of the push" ' +
      'after contact has ended. The finished diagram is the direct input ' +
      'to ΣF = ma: add up the arrows along each axis and you have the net ' +
      'force.',
    targetedMisconceptions: [`${FBD}:MC-WRONG-OBJECT`],
    source: `${FBD_SRC} — §1 Learning Objective + TA-1/TA-2 (isolate-the-body, force-inventory checklist)`,
  },
  {
    conceptId: FBD,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A puck slides across frictionless ice at constant velocity — no ' +
      'hand, no rope, no engine touching it. A very common instinct is to ' +
      'draw a forward-pointing arrow labelled "force of motion" in the ' +
      'direction it is sliding. Test that arrow the same way you would ' +
      'test any force: every force needs a source object exerting it — so ' +
      'point to the object pushing the puck forward right now. There isn’t ' +
      'one. Motion does not require an ongoing force to continue, only to ' +
      'CHANGE (Newton’s First Law) — so the puck’s horizontal free-body ' +
      'diagram is genuinely empty: no arrow at all in the direction of ' +
      'travel. The only arrows are weight down and the ice’s normal force ' +
      'up, and they cancel.',
    targetedMisconceptions: [`${FBD}:MC-MOTION-FORCE`],
    source: `${FBD_SRC} — MC-MOTION-FORCE conflict_evidence [P28] + TA-4 misconception probe`,
  },
  {
    conceptId: FBD,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    content:
      'A 5 kg crate is pulled right along a rough horizontal floor by a ' +
      'rope with tension 20 N, while friction resists with 8 N. Isolate ' +
      'the crate: four forces act on it — weight (mg = 49 N, down), normal ' +
      'force (N, up), tension (20 N, right), friction (8 N, left, opposing ' +
      'the slide). Horizontally: ΣF_x = T − f = 20 − 8 = 12 N, so ' +
      'a = 12/5 = 2.4 m/s² to the right. Vertically: the crate does not ' +
      'accelerate up or down, so ΣF_y = 0 → N − mg = 0 → N = 49 N. Notice ' +
      'the diagram did the real work here: once every force is drawn with ' +
      'the correct direction, splitting into x- and y-equations and ' +
      'solving is almost mechanical — the hard part was refusing to add a ' +
      'phantom "pull direction" force or to include the crate’s own push on ' +
      'the floor.',
    targetedMisconceptions: [`${FBD}:MC-MOTION-FORCE`, `${FBD}:MC-WRONG-OBJECT`],
    source: `${FBD_SRC} — TA-3 "From Diagram to Equation" worked numbers`,
  },
]

const FBD_PROBES: SeedProbe[] = [
  {
    conceptId: FBD,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A puck slides across frictionless ice at constant velocity, with nothing touching it. Which horizontal force belongs on its free-body diagram?',
    choices: [
      { text: 'None — the horizontal diagram is empty; the puck coasts by inertia', isCorrect: true },
      { text: 'A forward "force of motion" in the direction it is sliding', isCorrect: false, misconceptionId: `${FBD}:MC-MOTION-FORCE` },
    ],
    correctValue: 'none',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FBD}:MC-MOTION-FORCE`],
    source: `${FBD_SRC} — TA-4 misconception probe, distractor-mapped`,
  },
  {
    conceptId: FBD,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A block rests on a table. Does the force the block exerts DOWN on the table belong on the block’s own free-body diagram?',
    choices: [
      { text: 'No — that force acts on the table, not on the block; only forces acting ON the block belong on its diagram', isCorrect: true },
      { text: 'Yes — it is one of the forces involving the block', isCorrect: false, misconceptionId: `${FBD}:MC-WRONG-OBJECT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FBD}:MC-WRONG-OBJECT`],
    source: `${FBD_SRC} — MC-WRONG-OBJECT trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.normal-force ─────────────────────────────────────────────────
const NORM = 'phys.mech.normal-force'
const NORM_SRC = 'docs/curriculum/blueprints/phys.mech.normal-force.md'

const NORM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NORM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The normal force is a surface pushing back on whatever touches it, ' +
      'always perpendicular to that surface — never along it, and not ' +
      'necessarily straight up. Stand on flat ground and the floor pushes ' +
      'straight up on you; stand on a 30° ramp and the ramp still pushes ' +
      'perpendicular to ITS surface, which is now tilted 30° from vertical ' +
      '— not straight up at all. "Normal" here means geometric, not ' +
      '"ordinary": it is the force perpendicular (normal) to the contact ' +
      'surface. Its size is found the same way every other unknown force ' +
      'is found on a free-body diagram — by writing the equilibrium or ' +
      'Second-Law equation perpendicular to the surface and solving for it ' +
      '— it is never assumed in advance.',
    targetedMisconceptions: [`${NORM}:MC-NORMAL-EQUALS-WEIGHT`],
    source: `${NORM_SRC} — §1 Learning Objective (perpendicular-to-surface definition, not always vertical)`,
  },
  {
    conceptId: NORM,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A block sits stationary on a 50° incline. Setting N = mg by habit ' +
      'and checking it against Newton’s Second Law perpendicular to the ' +
      'slope exposes the problem immediately: N − mg cos50° = 0, so the ' +
      'correct value is N = mg cos50° ≈ 0.64 mg — noticeably LESS than mg, ' +
      'not equal to it. If N really equalled mg here, there would be a ' +
      'large unbalanced force driving the block straight into the slope, ' +
      'which plainly does not happen. N = mg is a special-case result that ' +
      'only holds on a flat horizontal surface with no other vertical ' +
      'forces — on an incline, in an accelerating lift, or with a slanted ' +
      'applied force, N must be resolved fresh from the diagram every ' +
      'single time.',
    targetedMisconceptions: [`${NORM}:MC-NORMAL-EQUALS-WEIGHT`],
    source: `${NORM_SRC} — MC-NORMAL-EQUALS-WEIGHT conflict_evidence [P28], 50°-incline numbers`,
  },
  {
    conceptId: NORM,
    subjectSlug: 'physics',
    familyKind: 'common_misconception_note',
    gradeBand: GradeBand.HIGH,
    content:
      'The normal force is NOT the Newton’s-Third-Law "reaction" to weight ' +
      '— that pairing mixes up two completely separate interactions. ' +
      'Weight is the Earth–body gravitational interaction: Earth pulls the ' +
      'body down, and the body’s true Third-Law partner force is the body ' +
      'pulling the EARTH up (acting on the Earth, not on the body). The ' +
      'normal force belongs to a different interaction entirely — the ' +
      'surface–body contact: the surface pushes the body up, and its true ' +
      'partner is the body pushing the surface down. Weight and normal ' +
      'force both happen to act on the same body and often balance on a ' +
      'flat floor, but "acting on the same object and balancing" is a ' +
      'Second-Law equilibrium fact, not a Third-Law pairing — true Third-' +
      'Law pairs always act on two DIFFERENT objects.',
    targetedMisconceptions: [`${NORM}:MC-NORMAL-IS-REACTION`],
    source: `${NORM_SRC} — MC-NORMAL-IS-REACTION bridge_text [P30] (two interactions, four forces)`,
  },
]

const NORM_PROBES: SeedProbe[] = [
  {
    conceptId: NORM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A block of mass m rests stationary on a frictionless incline at angle θ to the horizontal. What is the normal force N?',
    choices: [
      { text: 'N = mg cosθ — resolved perpendicular to the slope', isCorrect: true },
      { text: 'N = mg — the normal force always equals the weight', isCorrect: false, misconceptionId: `${NORM}:MC-NORMAL-EQUALS-WEIGHT` },
    ],
    correctValue: 'mg cos(theta)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NORM}:MC-NORMAL-EQUALS-WEIGHT`],
    source: `${NORM_SRC} — MC-NORMAL-EQUALS-WEIGHT trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: NORM,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is the normal force on a body the Newton’s-Third-Law reaction to that body’s weight?',
    choices: [
      { text: 'No — weight’s Third-Law partner is the body pulling the Earth up; the normal force’s partner is the body pushing the surface down (a different interaction)', isCorrect: true },
      { text: 'Yes — they are equal and opposite forces on the body', isCorrect: false, misconceptionId: `${NORM}:MC-NORMAL-IS-REACTION` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NORM}:MC-NORMAL-IS-REACTION`],
    source: `${NORM_SRC} — MC-NORMAL-IS-REACTION trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.equilibrium ──────────────────────────────────────────────────
const EQUIL = 'phys.mech.equilibrium'
const EQUIL_SRC = 'docs/curriculum/blueprints/phys.mech.equilibrium.md'

const EQUIL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EQUIL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A see-saw with two children sitting at different distances from the ' +
      'pivot balances only when both the pushing and the twisting cancel. ' +
      'Static equilibrium needs TWO independent conditions to both hold: ' +
      'ΣF = 0 (the forces cancel, so nothing accelerates sideways or ' +
      'vertically) AND Στ = 0 (the torques cancel, so nothing starts ' +
      'spinning). Neither condition implies the other — two equal and ' +
      'opposite forces acting at DIFFERENT points on a rigid body can ' +
      'cancel perfectly as forces (ΣF = 0) while still producing a net ' +
      'twist (Στ ≠ 0), a configuration called a couple. A body is only ' +
      'truly in equilibrium when you have checked, and confirmed, both.',
    targetedMisconceptions: [`${EQUIL}:MC-ONE-CONDITION`],
    source: `${EQUIL_SRC} — Component 1 Concept Spine + MC-ONE-CONDITION conflict_evidence (100 N beam/torque example)`,
  },
  {
    conceptId: EQUIL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A 3 m beam is pivoted at its left end, carrying a 100 N weight at ' +
      '2 m and a single upward support force R at the far end (3 m). ' +
      'Force balance alone gives R = 100 N — looks solved. But check the ' +
      'torque about the left end: the weight contributes ' +
      'τ = −100×2 = −200 N·m, and R contributes ' +
      'τ = +100×3 = +300 N·m, so Στ = +100 N·m — not zero. The forces ' +
      'balance, yet the beam still rotates. Force balance prevents ' +
      'translational acceleration; torque balance separately prevents ' +
      'rotational acceleration — confirming one is never enough evidence ' +
      'for the other, and a full equilibrium check always writes both ' +
      'ΣF = 0 (each axis) and Στ = 0.',
    targetedMisconceptions: [`${EQUIL}:MC-ONE-CONDITION`],
    source: `${EQUIL_SRC} — MC-ONE-CONDITION conflict_evidence [P28], worked numbers`,
  },
  {
    conceptId: EQUIL,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    content:
      'A 4 m beam is supported at both ends (unknown upward forces R_A at ' +
      'the left end and R_B at the right end), carrying a 300 N weight ' +
      '1 m from the left. The key strategic freedom in equilibrium ' +
      'problems: torque can be taken about ANY point, including a point ' +
      'where an unknown force acts — that force then has zero moment arm ' +
      'and drops out of the equation entirely. Taking the pivot at A: ' +
      'Στ_A = 0 → R_B×4 − 300×1 = 0 → R_B = 75 N, solved in one line with ' +
      'only one unknown. Taking the pivot at the beam’s centre instead ' +
      'would leave BOTH R_A and R_B in the equation, needing a second ' +
      'equation to finish — same physics, far more algebra. Choosing the ' +
      'pivot at an unknown force is the standard efficiency trick.',
    targetedMisconceptions: [`${EQUIL}:MC-PIVOT-FIXED`],
    source: `${EQUIL_SRC} — MC-PIVOT-FIXED conflict_evidence [P28], "good pivot vs. bad pivot" comparison`,
  },
]

const EQUIL_PROBES: SeedProbe[] = [
  {
    conceptId: EQUIL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two equal-magnitude, opposite-direction forces act at different points on a rigid rod (a couple). ΣF = 0 for this system. Is the rod in static equilibrium?',
    choices: [
      { text: 'Not necessarily — a couple can still produce a net torque (Στ ≠ 0) even though the forces cancel', isCorrect: true },
      { text: 'Yes — since the forces cancel, ΣF = 0 is enough to guarantee equilibrium', isCorrect: false, misconceptionId: `${EQUIL}:MC-ONE-CONDITION` },
    ],
    correctValue: 'not necessarily',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EQUIL}:MC-ONE-CONDITION`],
    source: `${EQUIL_SRC} — MC-ONE-CONDITION discrimination_pairs (couple case), distractor-mapped`,
  },
  {
    conceptId: EQUIL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'When solving a beam-equilibrium problem with two unknown support forces, must the torque pivot be placed at a physical support?',
    choices: [
      { text: 'No — torque about any point is zero in equilibrium; placing the pivot at an unknown force eliminates it from that equation', isCorrect: true },
      { text: 'Yes — the pivot has to be at a real hinge or support', isCorrect: false, misconceptionId: `${EQUIL}:MC-PIVOT-FIXED` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EQUIL}:MC-PIVOT-FIXED`],
    source: `${EQUIL_SRC} — MC-PIVOT-FIXED trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.hookes-law ───────────────────────────────────────────────────
const HOOKE = 'phys.mech.hookes-law'
const HOOKE_SRC = 'docs/curriculum/blueprints/phys.mech.hookes-law.md'

const HOOKE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HOOKE,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Hang weights on a spring and measure how far it stretches: double ' +
      'the weight and it stretches almost exactly double, triple the ' +
      'weight and it stretches almost exactly triple. That direct ' +
      'proportionality is Hooke’s Law: F = kx, where x is the extension ' +
      '(how much longer than natural length) and k is the spring constant ' +
      '— a fixed number, measured in newtons per metre, that describes ' +
      'how stiff that particular spring is. A large k means the spring ' +
      'fights back hard for every millimetre of stretch (hard to extend, ' +
      'a stiff spring); a small k means it gives way easily under the ' +
      'same force (a soft spring). Rearranged as x = F/k, a bigger k ' +
      'always produces a SMALLER extension for the same applied force, ' +
      'never a bigger one.',
    targetedMisconceptions: [`${HOOKE}:MC-KBIG-MEANS-MORE-EXTENSION`],
    source: `${HOOKE_SRC} — Component 1 MC-KBIG-MEANS-MORE-EXTENSION (k as stiffness, x = F/k inverse relationship)`,
  },
  {
    conceptId: HOOKE,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Hooke’s Law is a model that only works inside a limited range, not ' +
      'a universal law of springs. Stretch a spring gently and F = kx ' +
      'tracks it perfectly — the force-vs-extension graph is a straight ' +
      'line. But keep stretching past the elastic limit and the spring ' +
      'deforms permanently: it no longer returns to its original length ' +
      'when released, the graph curves away from that straight line, and ' +
      'F = kx with the ORIGINAL k simply stops predicting the right ' +
      'force. This is not a failure of physics — it is what it means to ' +
      'know a model’s limits: F = kx is an excellent, precise description ' +
      'within the elastic region, and a stress-strain analysis is needed ' +
      'to describe what happens beyond it.',
    targetedMisconceptions: [`${HOOKE}:MC-HOOKES-ALWAYS-LINEAR`],
    source: `${HOOKE_SRC} — Component 1 MC-HOOKES-ALWAYS-LINEAR (elastic limit boundary)`,
  },
  {
    conceptId: HOOKE,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    content:
      'A 0.5 kg mass hangs at rest from a vertical spring. Before Hooke’s ' +
      'Law can even be applied, the spring FORCE itself has to come from ' +
      'equilibrium, not be assumed: since the mass is stationary, ' +
      'ΣF = 0 → spring force (up) = weight (down) = mg = 0.5×9.8 = 4.9 N. ' +
      'Now Hooke’s Law connects that force to the stretch: if the spring ' +
      'constant is k = 49 N/m, then x = F/k = 4.9/49 = 0.1 m — the spring ' +
      'stretches 10 cm to hold the mass in place. Notice the two-step ' +
      'structure: equilibrium finds the force the spring must be exerting; ' +
      'Hooke’s Law then converts that force into a physical extension.',
    targetedMisconceptions: [],
    source: `${HOOKE_SRC} — Component 2 PD-1 prerequisite worked numbers (equilibrium → F = kx chain)`,
  },
]

const HOOKE_PROBES: SeedProbe[] = [
  {
    conceptId: HOOKE,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A stiff spring (large k = 1000 N/m) and a soft spring (small k = 50 N/m) each feel the same 10 N force. Which stretches MORE?',
    choices: [
      { text: 'The soft spring (k = 50 N/m) — x = F/k, so the smaller k gives the larger extension', isCorrect: true },
      { text: 'The stiff spring (k = 1000 N/m) — bigger k means it stretches more', isCorrect: false, misconceptionId: `${HOOKE}:MC-KBIG-MEANS-MORE-EXTENSION` },
    ],
    correctValue: 'the soft spring',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${HOOKE}:MC-KBIG-MEANS-MORE-EXTENSION`],
    source: `${HOOKE_SRC} — MC-KBIG-MEANS-MORE-EXTENSION discrimination_pairs, distractor-mapped`,
  },
  {
    conceptId: HOOKE,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A spring calibrated as F = kx for small extensions is stretched far past its elastic limit. Does F = kx (with the original k) still correctly predict the force?',
    choices: [
      { text: 'No — beyond the elastic limit the spring deforms permanently and the linear F = kx model no longer applies', isCorrect: true },
      { text: 'Yes — Hooke’s Law applies to any extension of any spring', isCorrect: false, misconceptionId: `${HOOKE}:MC-HOOKES-ALWAYS-LINEAR` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HOOKE}:MC-HOOKES-ALWAYS-LINEAR`],
    source: `${HOOKE_SRC} — MC-HOOKES-ALWAYS-LINEAR trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.power ─────────────────────────────────────────────────────────
const POWR = 'phys.mech.power'
const POWR_SRC = 'docs/curriculum/blueprints/phys.mech.power.md'

const POWR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POWR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Two cranes each lift an identical 500 kg load 10 m straight up — ' +
      'Crane A takes 20 s, Crane B takes only 5 s. The WORK done is ' +
      'identical for both: W = mgh = 500×9.8×10 = 49 000 J, because work ' +
      'only depends on the force and the distance moved, not on how fast ' +
      'it happened. But power — the RATE of doing work, P = W/t — tells a ' +
      'completely different story: Crane A delivers 49 000/20 = 2450 W, ' +
      'Crane B delivers 49 000/5 = 9800 W, four times more power for the ' +
      'exact same job. Power measures speed of energy delivery, not total ' +
      'energy delivered — a high-power machine does not necessarily do ' +
      'more work, it does the same work faster.',
    targetedMisconceptions: [`${POWR}:MC-POWER-IS-ENERGY`],
    source: `${POWR_SRC} — Component 3 MC-POWER-IS-ENERGY conflict_evidence [P28] (two-crane comparison)`,
  },
  {
    conceptId: POWR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A car cruises at a perfectly constant 30 m/s on a flat road, engine ' +
      'exerting 4000 N to overcome air resistance and friction. Because ' +
      'the acceleration is zero, it is tempting to think the power must be ' +
      'zero too — but zero acceleration does not mean zero force, and the ' +
      'engine is still actively doing work every second just to maintain ' +
      'that speed against resistance. Using P = W/t: in 1 s the car moves ' +
      '30 m, so W = 4000×30 = 120 000 J and P = 120 000 W. Using the ' +
      'equivalent instantaneous formula P = Fv directly: ' +
      '4000×30 = 120 000 W — exactly matching. P = Fv holds at ANY instant, ' +
      'accelerating or not; it simply measures the force times the ' +
      'velocity at that moment.',
    targetedMisconceptions: [`${POWR}:MC-POWER-CONSTANT-V`],
    source: `${POWR_SRC} — Component 3 MC-POWER-CONSTANT-V conflict_evidence [P28] (constant-velocity car, P=W/t vs P=Fv cross-check)`,
  },
  {
    conceptId: POWR,
    subjectSlug: 'physics',
    familyKind: 'real_world_example',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A torch and a floodlight can both run off similar batteries — which ' +
      'one drains its battery faster? The floodlight, because it draws far ' +
      'more power: it converts stored chemical energy into light energy ' +
      'at a much higher RATE every second, even though, left running long ' +
      'enough, the dim torch could eventually use just as much total ' +
      'energy. That is the everyday feel of power versus energy: a ' +
      '2000 W kettle running for 3 minutes and a 40 W bulb running for ' +
      '10 hours can use similar total energy, but the kettle demands its ' +
      'energy in a fast, high-power burst while the bulb spreads the same ' +
      'amount thin over a whole day.',
    targetedMisconceptions: [`${POWR}:MC-POWER-IS-ENERGY`],
    source: `${POWR_SRC} — Component 3 MC-POWER-IS-ENERGY s6_path analogy (torch vs. floodlight)`,
  },
]

const POWR_PROBES: SeedProbe[] = [
  {
    conceptId: POWR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two cranes lift identical loads through the identical height. Crane A takes 20 s; Crane B takes 5 s. How do their WORK DONE and POWER compare?',
    choices: [
      { text: 'Same work done; Crane B has 4× the power of Crane A', isCorrect: true },
      { text: 'Crane B did more work because it has more power', isCorrect: false, misconceptionId: `${POWR}:MC-POWER-IS-ENERGY` },
    ],
    correctValue: 'same work, 4x power',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${POWR}:MC-POWER-IS-ENERGY`],
    source: `${POWR_SRC} — MC-POWER-IS-ENERGY trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: POWR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A car moves at a perfectly constant velocity on a flat road (acceleration = 0), with the engine exerting a nonzero force to overcome resistance. Is the power delivered by the engine zero?',
    choices: [
      { text: 'No — P = Fv is nonzero whenever both force and velocity are nonzero, regardless of acceleration', isCorrect: true },
      { text: 'Yes — zero acceleration means zero power', isCorrect: false, misconceptionId: `${POWR}:MC-POWER-CONSTANT-V` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${POWR}:MC-POWER-CONSTANT-V`],
    source: `${POWR_SRC} — MC-POWER-CONSTANT-V trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.tension ──────────────────────────────────────────────────────
const TENS = 'phys.mech.tension'
const TENS_SRC = 'docs/curriculum/blueprints/phys.mech.tension.md'

const TENS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TENS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Try pushing a block across the floor with a length of rope — the ' +
      'rope just goes slack and does nothing, because a rope can only ' +
      'PULL, never push. That pull is tension, and it always acts on an ' +
      'attached object pointing AWAY from the object, along the rope, ' +
      'toward wherever the rope is anchored. For an idealised massless, ' +
      'inextensible rope running over a frictionless pulley, the tension ' +
      'is the SAME number all the way along the rope — the pull the rope ' +
      'exerts on one end is identical in magnitude to the pull it exerts ' +
      'on the other end, even if the two ends are attached to completely ' +
      'different masses. That single fact is what lets you connect two ' +
      'separate free-body diagrams (one per object) into one solvable ' +
      'system.',
    targetedMisconceptions: [`${TENS}:MC-ROPE-PUSHES`],
    source: `${TENS_SRC} — §1 Learning Objective (pull-only, same-magnitude-throughout) + MC-ROPE-PUSHES`,
  },
  {
    conceptId: TENS,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A 5 kg mass hangs from a rope over a pulley, connected to a lighter ' +
      'mass on the other side, and the system is clearly accelerating — ' +
      'yet it is tempting to set tension T = m·g = 50 N anyway, the same ' +
      'value it would have if the mass just hung at rest. Test that ' +
      'assumption with Newton’s Second Law on the hanging mass: ' +
      'm g − T = m a → 50 − 50 = 5a → a = 0. That predicts NO ' +
      'acceleration — but the system visibly moves. T = mg can only be ' +
      'correct when a = 0 (true equilibrium); the moment the system ' +
      'accelerates, the net force ON that mass (mg − T) is what DRIVES ' +
      'the acceleration, so T must come out smaller than mg, not equal to ' +
      'it. The only reliable method: write ΣF = ma separately for each ' +
      'body and solve the resulting equations for T.',
    targetedMisconceptions: [`${TENS}:MC-TENSION-EQUALS-WEIGHT`],
    source: `${TENS_SRC} — MC-TENSION-EQUALS-WEIGHT conflict_evidence [P28], worked numbers`,
  },
  {
    conceptId: TENS,
    subjectSlug: 'physics',
    familyKind: 'worked_example',
    gradeBand: GradeBand.HIGH,
    content:
      'Two blocks are connected by a rope over a frictionless pulley: ' +
      'a 5 kg mass hanging freely and a 3 kg mass hanging on the other ' +
      'side. Draw a separate free-body diagram for each mass. For the ' +
      'heavier (5 kg) mass, taking downward as positive: 5g − T = 5a. For ' +
      'the lighter (3 kg) mass, taking upward as positive since it rises: ' +
      'T − 3g = 3a. Both share the same T (tension is uniform along an ' +
      'ideal rope) and the same magnitude of a (the rope is inextensible, ' +
      'so both masses speed up together). Adding the two equations ' +
      'eliminates T directly: 5g − 3g = 8a → a = 2g/8 = 2.45 m/s². ' +
      'Substituting back: T = 3(g + a) = 3(9.8 + 2.45) ≈ 36.75 N — ' +
      'between the two weights (29.4 N and 49 N), exactly as it must be ' +
      'for an accelerating system, never equal to either mass’s weight ' +
      'alone.',
    targetedMisconceptions: [`${TENS}:MC-TENSION-EQUALS-WEIGHT`],
    source: `${TENS_SRC} — §5 two-body connected-system worked solution pattern (Atwood-style)`,
  },
]

const TENS_PROBES: SeedProbe[] = [
  {
    conceptId: TENS,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 5 kg mass hangs from a rope over a pulley in a system that is accelerating (not at rest). What is the tension T?',
    choices: [
      { text: 'Found from ΣF = ma on the mass — generally T ≠ mg while the system accelerates', isCorrect: true },
      { text: 'T = mg = 49 N, same as if the mass were at rest', isCorrect: false, misconceptionId: `${TENS}:MC-TENSION-EQUALS-WEIGHT` },
    ],
    correctValue: 'T = m(g ± a), not mg',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TENS}:MC-TENSION-EQUALS-WEIGHT`],
    source: `${TENS_SRC} — MC-TENSION-EQUALS-WEIGHT trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: TENS,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can a taut rope exert a pushing force on the object it is attached to?',
    choices: [
      { text: 'No — a rope can only pull, along its length, away from the object; it goes slack under any attempted push', isCorrect: true },
      { text: 'Yes — a rope can push just like it can pull', isCorrect: false, misconceptionId: `${TENS}:MC-ROPE-PUSHES` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${TENS}:MC-ROPE-PUSHES`],
    source: `${TENS_SRC} — MC-ROPE-PUSHES trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.inclined-plane ───────────────────────────────────────────────
const INCL = 'phys.mech.inclined-plane'
const INCL_SRC = 'docs/curriculum/blueprints/phys.mech.inclined-plane.md'

const INCL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INCL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The single trick that makes incline problems solvable is rotating ' +
      'your axes to match the slope instead of staying horizontal and ' +
      'vertical: pick one axis running along the slope (parallel) and one ' +
      'perpendicular to it, then resolve weight into these tilted axes. ' +
      'Weight mg splits into mg sinθ pulling the object DOWN the slope ' +
      '(parallel component) and mg cosθ pressing the object INTO the ' +
      'slope (perpendicular component). Write Newton’s Second Law along ' +
      'each rotated axis separately: the perpendicular equation gives you ' +
      'the normal force N = mg cosθ (since there is no acceleration ' +
      'perpendicular to the slope), and the parallel equation — once you ' +
      'know N and hence friction — gives you the acceleration along the ' +
      'slope. Trying to solve the same problem with plain horizontal and ' +
      'vertical axes instead tangles every equation together.',
    targetedMisconceptions: [`${INCL}:MC-FRICTION-WRONG-N`],
    source: `${INCL_SRC} — §1 Learning Objective (rotated-axis resolution, N before friction)`,
  },
  {
    conceptId: INCL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Friction is always f = μN — but on an incline it is easy to ' +
      'accidentally substitute the full weight mg for N instead of the ' +
      'perpendicular component mg cosθ. Push that shortcut to its limit: ' +
      'imagine the incline steepened all the way to a vertical wall ' +
      '(θ = 90°). The correct normal force there is N = mg cos90° = 0 — a ' +
      'vertical wall cannot press back on an object resting against it ' +
      'with nothing else holding it up, so there is genuinely no friction ' +
      'available. But the shortcut f = μmg would still predict a large ' +
      'nonzero friction force even at 90°, which is physically impossible ' +
      '— proof the shortcut is wrong for anything but a flat floor. The ' +
      'correct two-step method: find N = mg cosθ from the perpendicular ' +
      'equilibrium equation first, THEN compute f = μN = μ mg cosθ.',
    targetedMisconceptions: [`${INCL}:MC-FRICTION-WRONG-N`],
    source: `${INCL_SRC} — MC-FRICTION-WRONG-N conflict_evidence [P28] (90°-wall limiting case)`,
  },
  {
    conceptId: INCL,
    subjectSlug: 'physics',
    familyKind: 'common_misconception_note',
    gradeBand: GradeBand.HIGH,
    content:
      'Friction is not fixed to "always point up the slope" — it always ' +
      'OPPOSES whichever way the object is actually moving (or about to ' +
      'move) relative to the surface, so its direction flips depending on ' +
      'the situation. A block sliding DOWN a slope feels friction acting ' +
      'UP the slope, opposing that downward slide. But push the same ' +
      'block UP the slope instead, and friction now acts DOWN the slope, ' +
      'opposing the upward motion — the exact opposite direction from the ' +
      'first case. Before drawing the friction arrow on any incline ' +
      'problem, always state out loud which way the object is sliding (or ' +
      'tending to slide) first, then draw friction pointing the other ' +
      'way.',
    targetedMisconceptions: [`${INCL}:MC-FRICTION-DIRECTION`],
    source: `${INCL_SRC} — MC-FRICTION-DIRECTION bridge_text [P30] (motion-direction-first rule)`,
  },
]

const INCL_PROBES: SeedProbe[] = [
  {
    conceptId: INCL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A block sits on a 30° incline with coefficient of friction μ. What is the correct expression for the friction force?',
    choices: [
      { text: 'f = μ mg cos30° — using the normal force N = mg cos30°', isCorrect: true },
      { text: 'f = μ mg — using the full weight directly', isCorrect: false, misconceptionId: `${INCL}:MC-FRICTION-WRONG-N` },
    ],
    correctValue: 'μ mg cos(30°)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INCL}:MC-FRICTION-WRONG-N`],
    source: `${INCL_SRC} — MC-FRICTION-WRONG-N trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: INCL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A block is sliding UP an incline (being pushed). Which direction does friction act on it?',
    choices: [
      { text: 'Down the slope — friction always opposes the direction of actual sliding, which here is upward', isCorrect: true },
      { text: 'Up the slope — friction always acts up the slope regardless of motion direction', isCorrect: false, misconceptionId: `${INCL}:MC-FRICTION-DIRECTION` },
    ],
    correctValue: 'down the slope',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${INCL}:MC-FRICTION-DIRECTION`],
    source: `${INCL_SRC} — MC-FRICTION-DIRECTION trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.impulse ──────────────────────────────────────────────────────
const IMP = 'phys.mech.impulse'
const IMP_SRC = 'docs/curriculum/blueprints/phys.mech.impulse.md'

const IMP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IMP,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Compare a force of 1000 N acting for just 0.001 s against a force ' +
      'of only 10 N acting for a full 1 s. Which one delivers the bigger ' +
      'impulse? Impulse is J = F·Δt — force AND time both matter equally ' +
      '— so the first gives J = 1000×0.001 = 1 N·s while the second gives ' +
      'J = 10×1 = 10 N·s: the gentler, longer-lasting force wins by a ' +
      'factor of ten, despite being a hundred times weaker at any single ' +
      'instant. Impulse is never just "how hard," it is "how hard, for ' +
      'how long" — exactly why a dripping tap can fill far more of a ' +
      'bucket over a day than a single splash ever could, even though ' +
      'each drop individually is tiny.',
    targetedMisconceptions: [`${IMP}:MC-IMPULSE-IS-FORCE`],
    source: `${IMP_SRC} — Component 3 MC-IMPULSE-IS-FORCE conflict_evidence [P28] (1000 N × 0.001 s vs 10 N × 1 s)`,
  },
  {
    conceptId: IMP,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A 0.2 kg ball moves east at 5 m/s, bounces off a wall, and returns ' +
      'west at 5 m/s. Taking the magnitudes and subtracting, |5| − |5| = 0, ' +
      'suggests nothing happened to its momentum — but the ball plainly ' +
      'reversed direction completely. The fix is to always keep the sign: ' +
      'call east positive, so Δp = m(v_final − v_initial) = ' +
      '0.2×(−5 − 5) = 0.2×(−10) = −2 kg·m/s. The impulse the wall exerted ' +
      'was 2 N·s WESTWARD, not zero — a bounce-back is actually one of ' +
      'the LARGEST possible impulses for a given speed, precisely because ' +
      'the velocity has to swing all the way from +5 to −5, not just to ' +
      'zero. Momentum change must always be computed with signed ' +
      'velocities, never with magnitudes taken before subtracting.',
    targetedMisconceptions: [`${IMP}:MC-DELTAP-DIRECTION`],
    source: `${IMP_SRC} — Component 3 MC-DELTAP-DIRECTION conflict_evidence [P28] (bouncing-ball sign convention)`,
  },
  {
    conceptId: IMP,
    subjectSlug: 'physics',
    familyKind: 'real_world_example',
    gradeBand: GradeBand.MIDDLE,
    content:
      'An airbag and a bare steering wheel can absorb exactly the same ' +
      'change in a passenger’s momentum during a crash — same Δp — yet ' +
      'one is survivable and the other often is not, because they differ ' +
      'in the TIME over which that momentum change happens. The airbag ' +
      'inflates and gently extends the collision over a fraction of a ' +
      'second longer than bare metal would; since J = FΔt is fixed by how ' +
      'much momentum has to change, stretching Δt out means the peak ' +
      'force F drops sharply. Same impulse, longer time, dramatically ' +
      'smaller force on the body — the entire safety principle behind ' +
      'airbags, crumple zones, and even bending your knees when you land ' +
      'a jump.',
    targetedMisconceptions: [`${IMP}:MC-IMPULSE-IS-FORCE`],
    source: `${IMP_SRC} — Component 3 MC-IMPULSE-IS-FORCE s6_path analogy (airbag safety principle)`,
  },
]

const IMP_PROBES: SeedProbe[] = [
  {
    conceptId: IMP,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Force A: 500 N for 0.002 s. Force B: 5 N for 0.5 s. Which delivers the larger impulse?',
    choices: [
      { text: 'Force B — J = 5×0.5 = 2.5 N·s, larger than Force A’s J = 500×0.002 = 1 N·s', isCorrect: true },
      { text: 'Force A — it is a much bigger force, so it must deliver more impulse', isCorrect: false, misconceptionId: `${IMP}:MC-IMPULSE-IS-FORCE` },
    ],
    correctValue: 'Force B',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IMP}:MC-IMPULSE-IS-FORCE`],
    source: `${IMP_SRC} — MC-IMPULSE-IS-FORCE discrimination_pairs, distractor-mapped`,
  },
  {
    conceptId: IMP,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A ball moving east at 5 m/s bounces directly back west at 5 m/s. What is the magnitude of its momentum change, taking east as positive?',
    choices: [
      { text: '|m×(−5) − m×5| = 10m — the velocities must be subtracted WITH signs, not as magnitudes', isCorrect: true },
      { text: 'Zero — the speed before and after is the same, 5 m/s', isCorrect: false, misconceptionId: `${IMP}:MC-DELTAP-DIRECTION` },
    ],
    correctValue: '10m (nonzero)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IMP}:MC-DELTAP-DIRECTION`],
    source: `${IMP_SRC} — MC-DELTAP-DIRECTION trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.collisions-elastic ───────────────────────────────────────────
const CELAS = 'phys.mech.collisions-elastic'
const CELAS_SRC = 'docs/curriculum/blueprints/phys.mech.collisions-elastic.md'

const CELAS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CELAS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      '"Elastic" in physics has nothing to do with rubber bands — a ' +
      'rubber ball bouncing off the floor actually loses 20–30% of its ' +
      'kinetic energy to heat and deformation, making it only PARTIALLY ' +
      'elastic, not the textbook case at all. A true elastic collision ' +
      'is defined by two conditions holding simultaneously: total ' +
      'momentum is conserved (true of every isolated collision, always) ' +
      'AND total kinetic energy is conserved (true only for this special ' +
      'case). Rigid billiard balls and colliding gas molecules come very ' +
      'close to genuinely elastic; almost every everyday macroscopic ' +
      'collision — cars, clay, people — is not. Before writing the ' +
      'elastic-collision formulas, always confirm KE conservation is ' +
      'actually justified for the situation.',
    targetedMisconceptions: [`${CELAS}:MC-ALL-COLLISIONS-ELASTIC`],
    source: `${CELAS_SRC} — Component 1 MC-ALL-COLLISIONS-ELASTIC (billiard-ball vs. rubber-ball vs. clay contrast)`,
  },
  {
    conceptId: CELAS,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'In a 1D elastic collision where a moving ball strikes an ' +
      'IDENTICAL stationary ball head-on, a common guess is that both ' +
      'balls end up stopped — but that would leave zero total momentum ' +
      'after the collision when there was clearly nonzero momentum ' +
      'before, which is impossible. The actual formulas for equal masses ' +
      '(m₁ = m₂) give v₁f = 0 and v₂f = v₁ᵢ: the moving ball stops ' +
      'completely and the previously-stationary ball takes off at exactly ' +
      'the first ball’s original speed — a clean velocity EXCHANGE, not a ' +
      'mutual stop. This is precisely the classic billiards result (the ' +
      'cue ball stops dead; the object ball rolls away) and the ' +
      'principle behind a Newton’s cradle, where pulling back and ' +
      'releasing one ball sends exactly one ball swinging out the far ' +
      'side.',
    targetedMisconceptions: [`${CELAS}:MC-ELASTIC-EQUAL-MASSES-BOTH-STOP`],
    source: `${CELAS_SRC} — Component 1 MC-ELASTIC-EQUAL-MASSES-BOTH-STOP (velocity-exchange formula, billiards/Newton's-cradle framing)`,
  },
]

const CELAS_PROBES: SeedProbe[] = [
  {
    conceptId: CELAS,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A rubber ball bounces off a hard floor and loses 25% of its kinetic energy to heat and deformation. Is this collision elastic?',
    choices: [
      { text: 'No — kinetic energy is not fully conserved, so it is (partially) inelastic, not elastic', isCorrect: true },
      { text: 'Yes — rubber is elastic, so any rubber-ball bounce is an elastic collision', isCorrect: false, misconceptionId: `${CELAS}:MC-ALL-COLLISIONS-ELASTIC` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CELAS}:MC-ALL-COLLISIONS-ELASTIC`],
    source: `${CELAS_SRC} — MC-ALL-COLLISIONS-ELASTIC trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: CELAS,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In a 1D elastic collision, a moving ball strikes an identical stationary ball head-on. What happens?',
    choices: [
      { text: 'The moving ball stops completely; the stationary ball moves off at the first ball’s original speed (velocities exchange)', isCorrect: true },
      { text: 'Both balls end up stationary after the collision', isCorrect: false, misconceptionId: `${CELAS}:MC-ELASTIC-EQUAL-MASSES-BOTH-STOP` },
    ],
    correctValue: 'velocities exchange',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CELAS}:MC-ELASTIC-EQUAL-MASSES-BOTH-STOP`],
    source: `${CELAS_SRC} — MC-ELASTIC-EQUAL-MASSES-BOTH-STOP trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.collisions-inelastic ─────────────────────────────────────────
const CINEL = 'phys.mech.collisions-inelastic'
const CINEL_SRC = 'docs/curriculum/blueprints/phys.mech.collisions-inelastic.md'

const CINEL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CINEL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A 1000 kg car moving east at 20 m/s crashes into a stationary ' +
      '1500 kg car and the two lock together — crumpling severely. Before ' +
      'the crash, momentum is 1000×20 = 20 000 kg·m/s. After sticking, ' +
      'the combined 2500 kg mass moves at v_f = 20 000/2500 = 8 m/s, so ' +
      'momentum after is 2500×8 = 20 000 kg·m/s — EXACTLY conserved, ' +
      'despite all that visible crumpling. What the crash actually loses ' +
      'is kinetic energy: ½×1000×20² − ½×2500×8² = 200 000 − 80 000 = ' +
      '120 000 J, converted into heat, sound, and permanently bent metal. ' +
      'Momentum is conserved in every isolated collision, elastic or not; ' +
      'crumpling and deformation are exactly where the missing KINETIC ' +
      'ENERGY goes, never where momentum "disappears" to.',
    targetedMisconceptions: [`${CINEL}:MC-MOMENTUM-LOST-INELASTIC`],
    source: `${CINEL_SRC} — Component 1 MC-MOMENTUM-LOST-INELASTIC conflict_evidence [P28] (car-crash momentum/KE numbers)`,
  },
  {
    conceptId: CINEL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'It’s tempting to assume that when two objects "stick together" in ' +
      'a perfectly inelastic collision, they must end up at rest — but ' +
      'that is only true in one special case. Two equal-mass objects, one ' +
      'at rest and one moving at 6 m/s, stick together and move off at ' +
      'v_f = (m×6 + m×0)/(2m) = 3 m/s — very much still moving, at HALF ' +
      'the original speed, not zero. The combined object only ends up ' +
      'genuinely at rest when the two initial momenta exactly cancel ' +
      '(equal magnitude, opposite direction) — m₁u₁ + m₂u₂ = 0. In every ' +
      'other case, treat "sticking" as momentum AVERAGING across the ' +
      'combined mass, which is usually nonzero: v_f = ' +
      '(m₁u₁ + m₂u₂)/(m₁ + m₂), solved fresh each time, never assumed to ' +
      'be zero.',
    targetedMisconceptions: [`${CINEL}:MC-PERFECTLY-INELASTIC-ZERO-VELOCITY`],
    source: `${CINEL_SRC} — Component 1 MC-PERFECTLY-INELASTIC-ZERO-VELOCITY conflict_evidence [P28] (equal-mass sticking example)`,
  },
]

const CINEL_PROBES: SeedProbe[] = [
  {
    conceptId: CINEL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two cars collide and stick together, crumpling severely. Is total momentum conserved in this collision?',
    choices: [
      { text: 'Yes — momentum is conserved in any isolated collision; the crumpling converts kinetic energy to heat/deformation, not momentum', isCorrect: true },
      { text: 'No — momentum is lost because the cars crumpled so much', isCorrect: false, misconceptionId: `${CINEL}:MC-MOMENTUM-LOST-INELASTIC` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CINEL}:MC-MOMENTUM-LOST-INELASTIC`],
    source: `${CINEL_SRC} — MC-MOMENTUM-LOST-INELASTIC trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: CINEL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A moving object collides perfectly inelastically (sticks) with an equal-mass object at rest. Does the combined object stop?',
    choices: [
      { text: 'No — generally not; it moves at half the original speed, and only stops if the two initial momenta exactly cancel', isCorrect: true },
      { text: 'Yes — sticking together always brings the combined object to rest', isCorrect: false, misconceptionId: `${CINEL}:MC-PERFECTLY-INELASTIC-ZERO-VELOCITY` },
    ],
    correctValue: 'no, generally nonzero',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CINEL}:MC-PERFECTLY-INELASTIC-ZERO-VELOCITY`],
    source: `${CINEL_SRC} — MC-PERFECTLY-INELASTIC-ZERO-VELOCITY trigger case as probe, distractor-mapped`,
  },
]

// ─── eng.phonics.alphabet-recognition ────────────────────────────────────────
const ALPHA = 'eng.phonics.alphabet-recognition'
const ALPHA_SRC = 'docs/curriculum/blueprints/eng.phonics.alphabet-recognition.md'

const ALPHA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALPHA,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    content:
      'Every letter has two "costumes" — a big (capital) one and a small ' +
      '(lowercase) one — but underneath the costume it is the same letter ' +
      'with the same name and sound. Big B, little b: B... b... B... b — ' +
      'same name, same sound, just written two ways, like how you can write ' +
      'your own name in big letters or small letters and it is still your ' +
      'name. So check the letter’s name and sound first, then just notice ' +
      'which costume (case) it happens to be wearing — never treat case as ' +
      'a different letter.',
    targetedMisconceptions: [`${ALPHA}:MC-CASE-ARE-DIFFERENT-LETTERS`],
    source: `${ALPHA_SRC} — MC-CASE-ARE-DIFFERENT-LETTERS (P30 costume bridge + P28 B/b conflict evidence)`,
  },
  {
    conceptId: ALPHA,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.EARLY,
    content:
      '"b" and "d" are mirror images of each other — the exact same curve ' +
      'and stick, just facing opposite directions — which is exactly why ' +
      'they are so easy to mix up, and almost every beginning reader does. ' +
      'Make a fist with your left hand and stick your thumb up: that is a ' +
      '"b" shape, with the loop on the left. Your right hand, thumb up: ' +
      'that is a "d" shape, loop on the right. Before naming a letter that ' +
      'could be either one, always check WHICH WAY the loop or tail points ' +
      '— do not just check what shape it is, since both letters share the ' +
      'same shape.',
    targetedMisconceptions: [`${ALPHA}:MC-SHAPE-CONFUSION-MIRROR-LETTERS`],
    source: `${ALPHA_SRC} — MC-SHAPE-CONFUSION-MIRROR-LETTERS (P30 mirror-image bridge + Component 1 hand-shape check)`,
  },
  {
    conceptId: ALPHA,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — same two misconceptions, no child framing (foundations/03 §5 adult-register guard)
    content:
      'Each of the 26 letters has two written forms — a capital and a ' +
      'lowercase — that share one name and one sound; the shapes differ, ' +
      'the letter does not. Where this genuinely gets tricky is a small set ' +
      'of mirror-image pairs: "b" and "d", "p" and "q" share the exact same ' +
      'curve-and-stick shape, just facing opposite directions. Confusing ' +
      'these is not a sign of difficulty — it is the single most common, ' +
      'fully expected point of confusion for any new reader of the Latin ' +
      'alphabet, at any age. The reliable check: identify which direction ' +
      'the loop or tail points before naming the letter, rather than ' +
      'judging by shape alone.',
    targetedMisconceptions: [
      `${ALPHA}:MC-CASE-ARE-DIFFERENT-LETTERS`,
      `${ALPHA}:MC-SHAPE-CONFUSION-MIRROR-LETTERS`,
    ],
    source: `${ALPHA_SRC} — Component 8 adult/S9 adaptive flag (no shape/transfer assumption) + both misconceptions, adult register`,
  },
]

const ALPHA_PROBES: SeedProbe[] = [
  {
    conceptId: ALPHA,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.EARLY,
    stem: 'Here is a big "M" and a little "m". Are they the same letter, or two different letters?',
    choices: [
      { text: 'The same letter — same name and sound, just two different "costumes"', isCorrect: true },
      { text: 'Two different letters, because they look different', isCorrect: false, misconceptionId: `${ALPHA}:MC-CASE-ARE-DIFFERENT-LETTERS` },
    ],
    correctValue: 'the same letter',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ALPHA}:MC-CASE-ARE-DIFFERENT-LETTERS`],
    source: `${ALPHA_SRC} — P28 B/b conflict as probe`,
  },
  {
    conceptId: ALPHA,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY,
    stem: 'Is this letter "b" or "d"? [shows a letter with the loop on the right side]',
    choices: [
      { text: '"d" — the loop points right, like a fist with the right thumb up', isCorrect: true },
      { text: '"b" — it has a loop and a stick, so it must be "b"', isCorrect: false, misconceptionId: `${ALPHA}:MC-SHAPE-CONFUSION-MIRROR-LETTERS` },
    ],
    correctValue: 'd',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ALPHA}:MC-SHAPE-CONFUSION-MIRROR-LETTERS`],
    source: `${ALPHA_SRC} — TA-4 mirror-letter discrimination as probe`,
  },
]

// ─── eng.phonics.rhyming ──────────────────────────────────────────────────────
const RHYME = 'eng.phonics.rhyming'
const RHYME_SRC = 'docs/curriculum/blueprints/eng.phonics.rhyming.md'

const RHYME_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RHYME,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    content:
      'Rhyming is about what you HEAR, not what you SEE written down. Say ' +
      '"bear" out loud, then say "chair" out loud — they sound the same at ' +
      'the end, even though "bear" ends in the letters "ear" and "chair" ' +
      'ends in "air". Now say "love" and "move" — those are spelled the ' +
      'same way at the end ("-ove") but do NOT actually sound the same. Two ' +
      'words rhyme when their ENDING SOUNDS match, no matter how the letters ' +
      'are arranged — so always close your eyes and listen, instead of ' +
      'picturing the spelling.',
    targetedMisconceptions: [`${RHYME}:MC-SPELLING-MUST-MATCH`],
    source: `${RHYME_SRC} — MC-SPELLING-MUST-MATCH (P28 bear/chair vs. love/move conflict evidence)`,
  },
  {
    conceptId: RHYME,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.EARLY,
    content:
      'Rhyming words match at the END of the word, not the beginning. "Sun" ' +
      'and "sit" both start the same way, but check their endings: sun ends ' +
      'in "-un", sit ends in "-it" — different, so they do NOT rhyme. Now ' +
      'check "sun" and "fun": both end in "-un" — same, so THOSE rhyme. ' +
      'Words that match at the beginning instead have a different name ' +
      '(alliteration), but that is not rhyming. To check a rhyme, always ' +
      'compare the LAST chunk of sound in each word and ignore how the word ' +
      'starts.',
    targetedMisconceptions: [`${RHYME}:MC-FIRST-SOUND-IS-ENOUGH`],
    source: `${RHYME_SRC} — MC-FIRST-SOUND-IS-ENOUGH (P28 sun/sit vs. sun/fun conflict evidence)`,
  },
  {
    conceptId: RHYME,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Two words rhyme when their ending SOUNDS match — full stop. Two ' +
      'traps to watch for. First: spelling can mislead in either direction. ' +
      '"Bear" and "chair" look nothing alike at the end but rhyme perfectly; ' +
      '"love" and "move" share the identical spelling "-ove" but do not ' +
      'rhyme at all — judge by ear, never by eye. Second: rhyme is an ' +
      'ending match, not a beginning match. "Sun" and "sit" share their ' +
      'first sound, but that is alliteration, a different device entirely; ' +
      'a genuine rhyme — "sun" and "fun" — shares its LAST sound. Isolate ' +
      'the final sound-chunk of each word before comparing.',
    targetedMisconceptions: [
      `${RHYME}:MC-SPELLING-MUST-MATCH`,
      `${RHYME}:MC-FIRST-SOUND-IS-ENOUGH`,
    ],
    source: `${RHYME_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const RHYME_PROBES: SeedProbe[] = [
  {
    conceptId: RHYME,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.EARLY,
    stem: 'Do "love" and "move" rhyme?',
    choices: [
      { text: 'No — say them out loud: they are spelled alike but do not sound alike at the end', isCorrect: true },
      { text: 'Yes — they are both spelled "-ove" at the end', isCorrect: false, misconceptionId: `${RHYME}:MC-SPELLING-MUST-MATCH` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${RHYME}:MC-SPELLING-MUST-MATCH`],
    source: `${RHYME_SRC} — P28 love/move conflict as probe`,
  },
  {
    conceptId: RHYME,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY,
    stem: 'Which word rhymes with "sun": "sit" or "fun"?',
    choices: [
      { text: '"fun" — both words end in the same "-un" sound', isCorrect: true },
      { text: '"sit" — both words start with the same sound', isCorrect: false, misconceptionId: `${RHYME}:MC-FIRST-SOUND-IS-ENOUGH` },
    ],
    correctValue: 'fun',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${RHYME}:MC-FIRST-SOUND-IS-ENOUGH`],
    source: `${RHYME_SRC} — P28 sun/sit vs. sun/fun conflict as probe`,
  },
]

// ─── eng.phonics.blending-segmenting ──────────────────────────────────────────
const BLEND = 'eng.phonics.blending-segmenting'
const BLEND_SRC = 'docs/curriculum/blueprints/eng.phonics.blending-segmenting.md'

const BLEND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BLEND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.EARLY,
    content:
      'Blending means gliding sounds together smoothly, without a pause ' +
      'between them — not naming letters one at a time. Say the letter ' +
      'names fast, "buh... ah... tuh" — that does not turn into a real ' +
      'word. Now stretch and glide the actual SOUNDS together with no stop: ' +
      '"bbbaaat" → "bat". Stopping between sounds, especially adding an ' +
      'extra "uh" after sounds like b, t, or k, breaks the word apart ' +
      'instead of joining it — so glide each sound directly into the next ' +
      'one until they merge into a word.',
    targetedMisconceptions: [`${BLEND}:MC-BLENDING-IS-JUST-FAST-LETTERS`],
    source: `${BLEND_SRC} — MC-BLENDING-IS-JUST-FAST-LETTERS (P28 buh-ah-tuh vs. bbbaaat conflict evidence)`,
  },
  {
    conceptId: BLEND,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.EARLY,
    content:
      'Segmenting a word fully means breaking it all the way down to its ' +
      'smallest individual sounds (phonemes) — syllables are a bigger, ' +
      'in-between chunk, a useful first step but not the finish line. ' +
      'Splitting "rabbit" into "rab" and "bit" finds the syllables — good ' +
      'start — but "rab" can still be broken down further into its ' +
      'separate sounds. After finding syllables, always keep breaking each ' +
      'syllable down further into its individual sounds, checking that no ' +
      'chunk can be split any smaller.',
    targetedMisconceptions: [`${BLEND}:MC-SEGMENTING-STOPS-AT-SYLLABLES`],
    source: `${BLEND_SRC} — MC-SEGMENTING-STOPS-AT-SYLLABLES (P28 rabbit/rab-bit conflict evidence)`,
  },
  {
    conceptId: BLEND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Blending is gliding individual sounds together with no pause between ' +
      'them, not reciting letter names in sequence. Naming letters quickly — ' +
      '"buh, ah, tuh" — never resolves into a word; stretching the actual ' +
      'sounds without a break — "bbbaaat" — resolves immediately into ' +
      '"bat". Segmenting is the reverse skill, and the common shortfall is ' +
      'stopping at the syllable level: splitting "rabbit" into "rab" and ' +
      '"bit" finds the syllables, a genuine intermediate step, but a full ' +
      'segmentation continues down to the individual phonemes — ' +
      '/r/-/æ/-/b/-/ɪ/-/t/. After finding syllables, always check whether ' +
      'each one can still be split further.',
    targetedMisconceptions: [
      `${BLEND}:MC-BLENDING-IS-JUST-FAST-LETTERS`,
      `${BLEND}:MC-SEGMENTING-STOPS-AT-SYLLABLES`,
    ],
    source: `${BLEND_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const BLEND_PROBES: SeedProbe[] = [
  {
    conceptId: BLEND,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.EARLY,
    stem: 'Which way of saying the sounds in "sun" turns into the real word?',
    choices: [
      { text: 'Gliding the sounds together with no stops: "ssssuuunnn" → "sun"', isCorrect: true },
      { text: 'Saying the letter names quickly: "suh... uh... nuh"', isCorrect: false, misconceptionId: `${BLEND}:MC-BLENDING-IS-JUST-FAST-LETTERS` },
    ],
    correctValue: 'gliding the sounds together',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BLEND}:MC-BLENDING-IS-JUST-FAST-LETTERS`],
    source: `${BLEND_SRC} — P28 buh-ah-tuh vs. bbbaaat conflict as probe`,
  },
  {
    conceptId: BLEND,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.EARLY,
    stem: 'You split "rabbit" into "rab" and "bit". Is that the full, smallest-sound segmentation, or is there more to do?',
    choices: [
      { text: 'There is more to do — each syllable can still be broken into individual sounds: /r/-/æ/-/b/-/ɪ/-/t/', isCorrect: true },
      { text: 'That is fully segmented — syllables are the smallest chunk', isCorrect: false, misconceptionId: `${BLEND}:MC-SEGMENTING-STOPS-AT-SYLLABLES` },
    ],
    correctValue: 'there is more to do',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BLEND}:MC-SEGMENTING-STOPS-AT-SYLLABLES`],
    source: `${BLEND_SRC} — P28 rabbit/rab-bit conflict as probe`,
  },
]

// ─── eng.phonics.consonants ───────────────────────────────────────────────────
const CONS = 'eng.phonics.consonants'
const CONS_SRC = 'docs/curriculum/blueprints/eng.phonics.consonants.md'

const CONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'The letters "c" and "g" each represent TWO different sounds, ' +
      'depending on which letter comes right after them — and this is a ' +
      'real, learnable pattern, not randomness. Say "cat" — "c" makes a ' +
      'hard /k/ sound. Say "city" — there, "c" makes a soft /s/ sound. The ' +
      'pattern: usually a HARD sound before a, o, u ("cat", "cot", "cut", ' +
      '"gum") and a SOFT sound before e, i, y ("city", "cent", "gem", ' +
      '"giant"). Before saying the sound for "c" or "g", check the very ' +
      'next letter — that tells you which sound to use.',
    targetedMisconceptions: [`${CONS}:MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS`],
    source: `${CONS_SRC} — MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS (P28 cat/city conflict evidence + hard/soft pattern rule)`,
  },
  {
    conceptId: CONS,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Most single consonant letters do reliably represent one sound in ' +
      'isolation — but English also has silent letters and letter-' +
      'combinations that break the simple one-letter-one-sound pattern. ' +
      'Say "knife" out loud, naturally: you do not actually hear a /k/ ' +
      'sound at the start — it starts right on the /n/. That silent "k" ' +
      'is a real exception, not proof the whole system is unpredictable: ' +
      'learn the reliable single-consonant sounds as the solid foundation ' +
      'first, and treat exceptions like silent letters as a separate, ' +
      'smaller list learned on top of that foundation.',
    targetedMisconceptions: [`${CONS}:MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND`],
    source: `${CONS_SRC} — MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND (P28 knife silent-k conflict evidence)`,
  },
  {
    conceptId: CONS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      '"C" and "g" each carry two sounds, governed by a real, learnable ' +
      'rule: hard before a/o/u ("cat", "cot", "cut", "gum"), soft before ' +
      'e/i/y ("city", "cent", "gem", "giant"). Check the letter immediately ' +
      'following before committing to a sound. Separately: most single ' +
      'consonants are reliable one-letter-one-sound, but English carries a ' +
      'layer of silent letters and digraphs on top of that reliable core — ' +
      'the silent "k" in "knife" is a genuine, learnable exception, not ' +
      'evidence the whole system is arbitrary. Treat the core pattern as ' +
      'solid and the exceptions as a separate, shorter list learned ' +
      'alongside it.',
    targetedMisconceptions: [
      `${CONS}:MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS`,
      `${CONS}:MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND`,
    ],
    source: `${CONS_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CONS_PROBES: SeedProbe[] = [
  {
    conceptId: CONS,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What sound does "c" make in "cent"?',
    choices: [
      { text: 'A soft /s/ sound — "c" before e, i, or y is usually soft', isCorrect: true },
      { text: 'A hard /k/ sound — "c" always makes the same sound', isCorrect: false, misconceptionId: `${CONS}:MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS` },
    ],
    correctValue: '/s/',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CONS}:MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS`],
    source: `${CONS_SRC} — P28 cat/city hard/soft-c pattern as probe`,
  },
  {
    conceptId: CONS,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Do you hear a /k/ sound at the start of "knife" when you say it naturally?',
    choices: [
      { text: 'No — the "k" is silent; the word starts right on the /n/ sound', isCorrect: true },
      { text: 'Yes — every letter must make its own sound, so the "k" must be pronounced', isCorrect: false, misconceptionId: `${CONS}:MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND` },
    ],
    correctValue: 'no, the k is silent',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CONS}:MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND`],
    source: `${CONS_SRC} — P28 knife silent-k conflict as probe`,
  },
]

// ─── eng.phonics.consonant-blends ────────────────────────────────────────────
const CBL = 'eng.phonics.consonant-blends'
const CBL_SRC = 'docs/curriculum/blueprints/eng.phonics.consonant-blends.md'

const CBL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CBL,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A consonant blend is two or three separate consonant sounds said ' +
      'right next to each other, with each one still fully pronounced. Say ' +
      '"stop" very slowly, stretching the beginning: /s/... /t/... /ɒ/... ' +
      '/p/ — that is TWO separate consonant sounds at the start, not one. ' +
      'For any blend, say each consonant sound separately and slowly ' +
      'first, then speed them up without dropping any one of them — ' +
      'dropping the /s/ from "stop" leaves you with the completely ' +
      'different word "top".',
    targetedMisconceptions: [`${CBL}:MC-BLEND-IS-ONE-FUSED-SOUND`],
    source: `${CBL_SRC} — MC-BLEND-IS-ONE-FUSED-SOUND (P28 stop/top conflict evidence)`,
  },
  {
    conceptId: CBL,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Blends and digraphs look similar on the page — both are two ' +
      'consonant letters written together — but they behave completely ' +
      'differently when spoken. Say "st" in "stop" slowly: you hear TWO ' +
      'different sounds, /s/ then /t/ — that is a blend, and it keeps both ' +
      'sounds. Now say "sh" in "ship" slowly: you hear only ONE sound the ' +
      'whole time, not /s/ followed by /h/ — that is a digraph, a brand-new ' +
      'merged sound. Test any two-consonant combination by saying it ' +
      'slowly: two separate sounds means blend; one new sound means ' +
      'digraph.',
    targetedMisconceptions: [`${CBL}:MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING`],
    source: `${CBL_SRC} — MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING (P28 st/sh conflict evidence)`,
  },
  {
    conceptId: CBL,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A consonant blend is two or three consonant sounds said in quick ' +
      'sequence, each one fully preserved — "stop" keeps both /s/ and /t/, ' +
      'and dropping either one changes the word entirely ("top", "sop"). ' +
      'This is the opposite of a digraph, where two letters merge into one ' +
      'brand-new sound: "sh" is not /s/ followed by /h/, it is the single ' +
      'sound /ʃ/. Since both patterns look identical on the page — two ' +
      'consonant letters together — the reliable test is always to say the ' +
      'combination slowly: two audible sounds means blend, one merged ' +
      'sound means digraph.',
    targetedMisconceptions: [
      `${CBL}:MC-BLEND-IS-ONE-FUSED-SOUND`,
      `${CBL}:MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING`,
    ],
    source: `${CBL_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CBL_PROBES: SeedProbe[] = [
  {
    conceptId: CBL,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Say "stop" slowly. How many separate consonant sounds do you hear at the start?',
    choices: [
      { text: 'Two — /s/ then /t/, both fully pronounced', isCorrect: true },
      { text: 'One fused sound', isCorrect: false, misconceptionId: `${CBL}:MC-BLEND-IS-ONE-FUSED-SOUND` },
    ],
    correctValue: 'two',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CBL}:MC-BLEND-IS-ONE-FUSED-SOUND`],
    source: `${CBL_SRC} — P28 stop conflict as probe`,
  },
  {
    conceptId: CBL,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Is "sh" in "ship" a blend (two sounds) or a digraph (one sound)?',
    choices: [
      { text: 'A digraph — it is one single sound, /ʃ/, not /s/ followed by /h/', isCorrect: true },
      { text: 'A blend — you can hear /s/ then /h/ separately', isCorrect: false, misconceptionId: `${CBL}:MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING` },
    ],
    correctValue: 'digraph',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CBL}:MC-BLENDS-AND-DIGRAPHS-ARE-THE-SAME-THING`],
    source: `${CBL_SRC} — P28 st/sh conflict as probe`,
  },
]

// ─── eng.phonics.short-vowels ─────────────────────────────────────────────────
const SVOW = 'eng.phonics.short-vowels'
const SVOW_SRC = 'docs/curriculum/blueprints/eng.phonics.short-vowels.md'

const SVOW_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SVOW,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Every vowel letter has a NAME (what you say reciting the alphabet — ' +
      '"a" says "ay") and a different SOUND it makes inside real words. Say ' +
      'the letter "a" as its name — "ay" — then say the word "cat" out ' +
      'loud the way you normally talk. The middle sound in "cat" is not ' +
      '"ay" — it is shorter, /æ/. In a short, closed one-syllable word ' +
      '(ending in a consonant, no silent e), use the vowel\'s SHORT sound, ' +
      'not its alphabet name.',
    targetedMisconceptions: [`${SVOW}:MC-VOWEL-LETTER-NAME-IS-THE-SOUND`],
    source: `${SVOW_SRC} — MC-VOWEL-LETTER-NAME-IS-THE-SOUND (P28 letter-name-vs-cat conflict evidence)`,
  },
  {
    conceptId: SVOW,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'It is not just about how many syllables a word has — it is about ' +
      'whether the syllable is CLOSED (ends in a consonant, no final e) or ' +
      'has a silent "e" at the end that changes the vowel to its long ' +
      'sound. "Cap" and "cape" are both one syllable — say them both ' +
      'slowly: "cap" has the short /æ/ sound, "cape" has the long /eɪ/ ' +
      'sound, because of that one extra silent letter. Before assuming a ' +
      'one-syllable word has a short vowel, check whether it ends in a ' +
      'silent "e" — if it does, expect the long vowel sound instead.',
    targetedMisconceptions: [`${SVOW}:MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL`],
    source: `${SVOW_SRC} — MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL (P28 cap/cape conflict evidence)`,
  },
  {
    conceptId: SVOW,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Each vowel letter has an alphabet NAME ("a" says "ay") that is ' +
      'distinct from the SOUND it represents inside a real word. In a ' +
      'closed syllable — one that ends in a consonant with no silent e — ' +
      'the vowel takes its short sound instead: "cat" uses /æ/, not the ' +
      'letter name "ay". The distinguishing factor for one-syllable words ' +
      'is not syllable count but syllable structure: "cap" (closed, no ' +
      'silent e) keeps the short /æ/, while "cape" (silent e present) ' +
      'shifts to the long /eɪ/. Always check for a trailing silent e before ' +
      'assuming a short vowel.',
    targetedMisconceptions: [
      `${SVOW}:MC-VOWEL-LETTER-NAME-IS-THE-SOUND`,
      `${SVOW}:MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL`,
    ],
    source: `${SVOW_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SVOW_PROBES: SeedProbe[] = [
  {
    conceptId: SVOW,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What vowel sound is in the middle of "cat"?',
    choices: [
      { text: 'The short /æ/ sound', isCorrect: true },
      { text: 'The letter name, "ay"', isCorrect: false, misconceptionId: `${SVOW}:MC-VOWEL-LETTER-NAME-IS-THE-SOUND` },
    ],
    correctValue: '/æ/',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SVOW}:MC-VOWEL-LETTER-NAME-IS-THE-SOUND`],
    source: `${SVOW_SRC} — P28 letter-name-vs-cat conflict as probe`,
  },
  {
    conceptId: SVOW,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Do "cap" and "cape" have the same vowel sound, since both are one syllable?',
    choices: [
      { text: 'No — "cap" has a short /æ/, "cape" has a long /eɪ/ because of the silent e', isCorrect: true },
      { text: 'Yes — both are one-syllable words, so both use the short vowel', isCorrect: false, misconceptionId: `${SVOW}:MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SVOW}:MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL`],
    source: `${SVOW_SRC} — P28 cap/cape conflict as probe`,
  },
]

// ─── eng.phonics.digraphs ─────────────────────────────────────────────────────
const DGR = 'eng.phonics.digraphs'
const DGR_SRC = 'docs/curriculum/blueprints/eng.phonics.digraphs.md'

const DGR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DGR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Digraphs are the opposite of blends: TWO letters that together make ' +
      'just ONE brand-new sound, not two sounds said in sequence. Try to ' +
      'say "s" then "h" separately for "sh" — now say the word "ship" the ' +
      'way you normally talk. There is no full /s/ sound followed by a ' +
      'full /h/ sound — it is one single sound, /ʃ/, the whole time. For a ' +
      'digraph, treat the two letters as ONE unit representing ONE sound — ' +
      'never try to sound out each letter separately.',
    targetedMisconceptions: [`${DGR}:MC-DIGRAPH-IS-A-BLEND`],
    source: `${DGR_SRC} — MC-DIGRAPH-IS-A-BLEND (P28 s+h vs. ship conflict evidence)`,
  },
  {
    conceptId: DGR,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A vowel digraph is two vowel letters working together to make ONE ' +
      'vowel sound — often following the pattern "when two vowels go ' +
      'walking, the first one does the talking" (its long sound), like in ' +
      '"rain" or "boat." But read "said" — does "ai" make the same sound ' +
      'there as in "rain"? It does not; "said" is an exception. For a vowel ' +
      'digraph, try the long-first-vowel-sound pattern first, but stay ' +
      'ready to adjust for known exception words — vowel teams are less ' +
      'perfectly reliable than consonant digraphs.',
    targetedMisconceptions: [`${DGR}:MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES`],
    source: `${DGR_SRC} — MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES (P28 rain/said conflict evidence)`,
  },
  {
    conceptId: DGR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A digraph is two letters that merge into one new sound, unlike a ' +
      'blend, which keeps two sounds distinct. "Sh" in "ship" is not /s/ ' +
      'followed by /h/ — it is the single sound /ʃ/; treat any digraph as ' +
      'one indivisible unit rather than sounding out each letter. Vowel ' +
      'digraphs follow a looser version of this idea: two vowels together ' +
      'often produce the first vowel\'s long sound ("rain", "boat"), but ' +
      'this pattern has real exceptions ("said", "bread") that must be ' +
      'learned individually — vowel teams are simply less reliable than ' +
      'consonant digraphs, which almost never break their pattern.',
    targetedMisconceptions: [
      `${DGR}:MC-DIGRAPH-IS-A-BLEND`,
      `${DGR}:MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES`,
    ],
    source: `${DGR_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const DGR_PROBES: SeedProbe[] = [
  {
    conceptId: DGR,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Say "ship" naturally. Do you hear a full /s/ sound followed by a full /h/ sound, or one single sound?',
    choices: [
      { text: 'One single sound, /ʃ/, the whole time', isCorrect: true },
      { text: 'Two separate sounds, /s/ then /h/', isCorrect: false, misconceptionId: `${DGR}:MC-DIGRAPH-IS-A-BLEND` },
    ],
    correctValue: 'one sound, /ʃ/',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${DGR}:MC-DIGRAPH-IS-A-BLEND`],
    source: `${DGR_SRC} — P28 s+h vs. ship conflict as probe`,
  },
  {
    conceptId: DGR,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Does "ai" make the same sound in "said" as it does in "rain"?',
    choices: [
      { text: 'No — "said" is an exception to the usual long-vowel-team pattern', isCorrect: true },
      { text: 'Yes — vowel teams always make the same sound in every word', isCorrect: false, misconceptionId: `${DGR}:MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DGR}:MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES`],
    source: `${DGR_SRC} — P28 rain/said conflict as probe`,
  },
]

// ─── eng.phonics.long-vowels-silent-e ─────────────────────────────────────────
const LVSE = 'eng.phonics.long-vowels-silent-e'
const LVSE_SRC = 'docs/curriculum/blueprints/eng.phonics.long-vowels-silent-e.md'

const LVSE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LVSE,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Read "cap." Now read "cape." Do they have the same vowel sound? The ' +
      'only spelling difference is that final "e" — and it changes ' +
      'everything. The final "e" itself is not pronounced, that part is ' +
      'true, but it has an important JOB: it signals that the vowel ' +
      'earlier in the word should say its long sound (its alphabet name) ' +
      'instead of its short sound. It is silent, but not meaningless. ' +
      'Whenever you see a word ending in a single consonant + silent e, ' +
      'expect the earlier vowel to say its long sound.',
    targetedMisconceptions: [`${LVSE}:MC-SILENT-E-DOES-NOTHING`],
    source: `${LVSE_SRC} — MC-SILENT-E-DOES-NOTHING (P28 cap/cape conflict evidence)`,
  },
  {
    conceptId: LVSE,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'The silent-e-makes-the-vowel-long pattern is the MOST common reason ' +
      'a word ends in silent e, but it is not the only one. The rule says ' +
      'the earlier vowel should be long — so read "have": does the "a" ' +
      'actually say its long sound ("hay-v"), or does it stay short? It ' +
      'stays short. A small set of common words (have, give, live, love, ' +
      'come, some, done) keep a short vowel despite the final e. Apply the ' +
      'silent-e-long-vowel rule as the default expectation, but check known ' +
      'high-frequency exception words separately.',
    targetedMisconceptions: [`${LVSE}:MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL`],
    source: `${LVSE_SRC} — MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL (P28 have exception conflict evidence)`,
  },
  {
    conceptId: LVSE,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A final silent "e" is unpronounced but functional: it signals that ' +
      'the earlier vowel in the word should take its long (alphabet-name) ' +
      'sound rather than its short sound — "cap" (short /æ/) versus "cape" ' +
      '(long /eɪ/), with the silent e as the only spelling difference. This ' +
      'is the most common reason a word ends in e, but not the only one: a ' +
      'short list of common words — have, give, live, love, come, some, ' +
      'done — keep a short vowel despite the final e, largely because ' +
      'English spelling avoids ending words in certain letters (v, u) even ' +
      'when the sound does not call for an e. Apply the rule as the ' +
      'default, and hold the exception list separately.',
    targetedMisconceptions: [
      `${LVSE}:MC-SILENT-E-DOES-NOTHING`,
      `${LVSE}:MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL`,
    ],
    source: `${LVSE_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const LVSE_PROBES: SeedProbe[] = [
  {
    conceptId: LVSE,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'What is the only spelling difference between "cap" and "cape", and what does it do?',
    choices: [
      { text: 'The final "e" — it is silent itself but makes the earlier vowel say its long sound', isCorrect: true },
      { text: 'The final "e" — it does nothing at all', isCorrect: false, misconceptionId: `${LVSE}:MC-SILENT-E-DOES-NOTHING` },
    ],
    correctValue: 'the silent e signals a long vowel',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${LVSE}:MC-SILENT-E-DOES-NOTHING`],
    source: `${LVSE_SRC} — P28 cap/cape conflict as probe`,
  },
  {
    conceptId: LVSE,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Does the "a" in "have" say its long sound, the way the silent-e rule would predict?',
    choices: [
      { text: 'No — "have" is a common exception; the vowel stays short despite the final e', isCorrect: true },
      { text: 'Yes — any word ending in e must have a long vowel', isCorrect: false, misconceptionId: `${LVSE}:MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LVSE}:MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL`],
    source: `${LVSE_SRC} — P28 have exception conflict as probe`,
  },
]

// ─── eng.phonics.sight-words ──────────────────────────────────────────────────
const SIGHT = 'eng.phonics.sight-words'
const SIGHT_SRC = 'docs/curriculum/blueprints/eng.phonics.sight-words.md'

const SIGHT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SIGHT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      '"Sight word" means a word taught for instant, automatic recognition ' +
      'because of how common it is — NOT necessarily because it is ' +
      'unreadable by sounding out. Try "and": sound it out, /æ/-/n/-/d/ — ' +
      'that works perfectly. Many sight words (and, big, can, get) are ' +
      'fully phonetically regular; only some (said, was, of, the) have ' +
      'genuinely irregular spelling-sound patterns that truly require ' +
      'memorization. For any sight word, first try sounding it out — only ' +
      'fall back to pure memorization for the genuinely irregular ones.',
    targetedMisconceptions: [`${SIGHT}:MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL`],
    source: `${SIGHT_SRC} — MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL (P28 and/was conflict evidence)`,
  },
  {
    conceptId: SIGHT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Sight-word recognition needs to be fast, but it still has to ' +
      'process every letter, in order — glancing at just the shape, ' +
      'length, or first letter is not enough. You read this as "was" — ' +
      'look letter by letter: w-a-s. Now look at "saw": s-a-w — same three ' +
      'letters, different order, a completely different word. Even when ' +
      'reading a sight word quickly, make sure your eyes move across every ' +
      'letter in order — do not rely on shape or length alone, especially ' +
      'for words with a common "twin" like "there"/"three".',
    targetedMisconceptions: [`${SIGHT}:MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH`],
    source: `${SIGHT_SRC} — MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH (P28 was/saw conflict evidence)`,
  },
  {
    conceptId: SIGHT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      '"Sight word" describes a word taught for instant, automatic ' +
      'recognition due to its frequency — not necessarily because it is ' +
      'phonetically irregular. Most high-frequency words (and, big, can, ' +
      'get) decode perfectly normally; only a genuinely irregular subset ' +
      '(said, was, of, the) resists standard sounding-out and needs direct ' +
      'memorization. Separately, fast recognition still requires processing ' +
      'every letter in sequence, not just overall shape or length — "was" ' +
      'and "saw" share identical letters in reversed order and are ' +
      'frequently confused by readers relying on a quick glance rather than ' +
      'a full letter-by-letter check.',
    targetedMisconceptions: [
      `${SIGHT}:MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL`,
      `${SIGHT}:MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH`,
    ],
    source: `${SIGHT_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SIGHT_PROBES: SeedProbe[] = [
  {
    conceptId: SIGHT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Can the sight word "and" be sounded out phonetically?',
    choices: [
      { text: 'Yes — /æ/-/n/-/d/ works perfectly; not all sight words are irregular', isCorrect: true },
      { text: 'No — sight words can never be sounded out, they must be memorized', isCorrect: false, misconceptionId: `${SIGHT}:MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SIGHT}:MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL`],
    source: `${SIGHT_SRC} — P28 and/was conflict as probe`,
  },
  {
    conceptId: SIGHT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Is "was" the same word as "saw"?',
    choices: [
      { text: 'No — same three letters, but in reversed order, so they are different words', isCorrect: true },
      { text: 'Yes — they look similar enough at a glance', isCorrect: false, misconceptionId: `${SIGHT}:MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SIGHT}:MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH`],
    source: `${SIGHT_SRC} — P28 was/saw conflict as probe`,
  },
]

// ─── eng.phonics.syllable-types ───────────────────────────────────────────────
const SYLT = 'eng.phonics.syllable-types'
const SYLT_SRC = 'docs/curriculum/blueprints/eng.phonics.syllable-types.md'

const SYLT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYLT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A long word is not a mystery to guess at — it is just a sequence of ' +
      'syllables, and every syllable follows one of six reliable patterns ' +
      'you already partly know from single-syllable words. Take ' +
      '"reptile": split it into syllables instead of guessing from the ' +
      'whole shape — rep-tile. "Rep" is a closed syllable (short vowel), ' +
      '"tile" is a silent-e syllable (long vowel) — both patterns you ' +
      'already know. For any multisyllabic word, divide it into syllables ' +
      'first, then decode syllable-by-syllable.',
    targetedMisconceptions: [`${SYLT}:MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE`],
    source: `${SYLT_SRC} — MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE (P28 reptile/repeat conflict evidence)`,
  },
  {
    conceptId: SYLT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'There are six different syllable TYPES, and each one signals a ' +
      'different vowel sound. You read "ba" in "baby" with a short vowel, ' +
      'like "bat" — but does "ba-by" have a consonant closing off that ' +
      'first syllable, the way "bat" does? It does not. Closed syllables ' +
      '(ending in a consonant) get the short vowel, but OPEN syllables ' +
      '(ending in the vowel itself) get the LONG vowel instead, like "ba" ' +
      'in "baby" or "go" in "going". Before applying a vowel-sound rule to ' +
      'any syllable, first identify which of the six types it actually is.',
    targetedMisconceptions: [`${SYLT}:MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN`],
    source: `${SYLT_SRC} — MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN (P28 baby/bat conflict evidence)`,
  },
  {
    conceptId: SYLT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A multisyllabic word is decodable, not a shape to guess at wholesale ' +
      '— split it into syllables and apply the same single-syllable rules ' +
      'you already know to each chunk. "Reptile" splits into "rep" (closed ' +
      'syllable, short vowel) and "tile" (silent-e syllable, long vowel), ' +
      'both fully regular. The key skill is not memorizing one dominant ' +
      'pattern but correctly identifying which of six syllable types ' +
      '(closed, open, silent-e, vowel-team, r-controlled, consonant-le) ' +
      'each syllable actually is before applying its vowel rule — "ba" in ' +
      '"baby" is open (long vowel), not closed like "bat" (short vowel), ' +
      'despite superficial similarity.',
    targetedMisconceptions: [
      `${SYLT}:MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE`,
      `${SYLT}:MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN`,
    ],
    source: `${SYLT_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SYLT_PROBES: SeedProbe[] = [
  {
    conceptId: SYLT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'How should you approach reading the long word "reptile"?',
    choices: [
      { text: 'Split it into syllables (rep-tile) and decode each one using known patterns', isCorrect: true },
      { text: 'Guess the whole word from its general shape', isCorrect: false, misconceptionId: `${SYLT}:MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE` },
    ],
    correctValue: 'split into syllables and decode each',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SYLT}:MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE`],
    source: `${SYLT_SRC} — P28 reptile/repeat conflict as probe`,
  },
  {
    conceptId: SYLT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Does the first syllable of "baby" ("ba") use a short vowel, like "bat" does?',
    choices: [
      { text: 'No — "ba" is an open syllable (no closing consonant), so it uses the long vowel sound', isCorrect: true },
      { text: 'Yes — every syllable follows the same short-vowel pattern', isCorrect: false, misconceptionId: `${SYLT}:MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SYLT}:MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN`],
    source: `${SYLT_SRC} — P28 baby/bat conflict as probe`,
  },
]

// ─── eng.phonics.decoding-fluency ──────────────────────────────────────────────
const DFLU = 'eng.phonics.decoding-fluency'
const DFLU_SRC = 'docs/curriculum/blueprints/eng.phonics.decoding-fluency.md'

const DFLU_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DFLU,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Fluent reading has three parts working together: ACCURACY (reading ' +
      'words correctly), AUTOMATICITY (reading quickly, without effortful ' +
      'sounding-out for known patterns), and PROSODY (reading with the ' +
      'natural rhythm and intonation of speech). Reading every word ' +
      'correctly but so slowly that it takes a full minute for two ' +
      'sentences, with no sense of whether it was a question or a ' +
      'statement, is not yet fluent — accuracy alone, without speed and ' +
      'expression, still blocks comprehension, because so much effort goes ' +
      'into decoding that little is left for understanding meaning.',
    targetedMisconceptions: [`${DFLU}:MC-ACCURATE-EQUALS-FLUENT`],
    source: `${DFLU_SRC} — MC-ACCURATE-EQUALS-FLUENT (P28 slow-but-accurate conflict evidence)`,
  },
  {
    conceptId: DFLU,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Speed is only valuable when it comes WITH accuracy and expression. ' +
      'Reading very fast but skipping the word "because" and reading the ' +
      'final period as if it were not there means the sentence cannot be ' +
      'explained clearly afterward — rushing past unfamiliar words or ' +
      'ignoring punctuation actually breaks fluency, even though it feels ' +
      'fast. Read at a pace that lets you keep every word accurate and ' +
      'honor punctuation pauses — true fluency is fast enough to support ' +
      'understanding, not fast at any cost.',
    targetedMisconceptions: [`${DFLU}:MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL`],
    source: `${DFLU_SRC} — MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL (P28 rushed-reading conflict evidence)`,
  },
  {
    conceptId: DFLU,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Fluency is accuracy, automaticity, and prosody together, not any one ' +
      'of them alone. Reading every word correctly but at a halting, ' +
      'effortful pace with no clear sentence-level intonation still blocks ' +
      'comprehension, since decoding consumes the mental effort that ' +
      'understanding meaning requires. The opposite failure is just as ' +
      'real: maximizing raw speed by skipping unfamiliar words or ignoring ' +
      'punctuation produces fast but inaccurate, unclear reading. Genuine ' +
      'fluency is a pace that preserves full accuracy and honors ' +
      'punctuation-signaled phrasing — speed that emerges from practice, ' +
      'not speed pursued at the expense of the other two components.',
    targetedMisconceptions: [
      `${DFLU}:MC-ACCURATE-EQUALS-FLUENT`,
      `${DFLU}:MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL`,
    ],
    source: `${DFLU_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const DFLU_PROBES: SeedProbe[] = [
  {
    conceptId: DFLU,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student reads every word in a passage correctly, but it takes almost a minute for two sentences with no clear expression. Is this reading fluent?',
    choices: [
      { text: 'No — fluency needs accuracy, automaticity, AND expression together, not accuracy alone', isCorrect: true },
      { text: 'Yes — getting every word right is the whole goal of fluent reading', isCorrect: false, misconceptionId: `${DFLU}:MC-ACCURATE-EQUALS-FLUENT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DFLU}:MC-ACCURATE-EQUALS-FLUENT`],
    source: `${DFLU_SRC} — P28 slow-but-accurate conflict as probe`,
  },
  {
    conceptId: DFLU,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student reads very fast but skips the word "because" and ignores the ending period. Is this fluent reading?',
    choices: [
      { text: 'No — speed without accuracy and without honoring punctuation is not real fluency', isCorrect: true },
      { text: 'Yes — reading fast is the main sign of fluency', isCorrect: false, misconceptionId: `${DFLU}:MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DFLU}:MC-FLUENCY-MEANS-READING-FAST-ABOVE-ALL`],
    source: `${DFLU_SRC} — P28 rushed-reading conflict as probe`,
  },
]

// ─── phys.mech.center-of-mass ───────────────────────────────────────────────
const CMASS = 'phys.mech.center-of-mass'
const CMASS_SRC = 'docs/curriculum/blueprints/phys.mech.center-of-mass.md'

const CMASS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CMASS,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A dumbbell has a 1 kg mass at x = 0 and a 9 kg mass at x = 1 m. The ' +
      'geometric centre — the midpoint of the rod — sits at 0.5 m, but ' +
      'the centre of mass is nowhere near there: x_CM = ' +
      '(1×0 + 9×1)/(1+9) = 0.9 m, pulled almost all the way to the heavy ' +
      'end. Centre of mass is a MASS-WEIGHTED average position, not a ' +
      'geometric one — think of it as the exact point you could balance ' +
      'the object on a single finger; heavier parts pull that balance ' +
      'point toward themselves. Only for a uniform, evenly-distributed ' +
      'object does the centre of mass happen to land exactly on the ' +
      'geometric centre; for a ring or hollow sphere, the centre of mass ' +
      'sits in the empty space at the middle, not in the material at ' +
      'all.',
    targetedMisconceptions: [`${CMASS}:MC-CMASS-IS-GEOMETRIC-CENTRE`],
    source: `${CMASS_SRC} — Component 1 MC-CMASS-IS-GEOMETRIC-CENTRE conflict_evidence [P28] (dumbbell worked numbers)`,
  },
  {
    conceptId: CMASS,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A 1 kg part moving at 10 m/s and a 4 kg part moving at 2 m/s ' +
      'belong to the same system — averaging the two speeds directly ' +
      'gives (10+2)/2 = 6 m/s, but that is not the centre-of-mass ' +
      'velocity. The correct calculation weights each velocity by its ' +
      'own mass: v_CM = (1×10 + 4×2)/(1+4) = 18/5 = 3.6 m/s — noticeably ' +
      'different from the plain average, because the heavier 4 kg part ' +
      'should count for more. In fact v_CM = p_total/M, the system’s ' +
      'total momentum divided by its total mass — which is exactly why ' +
      'the centre of mass of an ISOLATED system moves at constant ' +
      'velocity no matter how wildly the individual parts collide or ' +
      'interact inside it, since internal forces can never change the ' +
      'system’s total momentum.',
    targetedMisconceptions: [`${CMASS}:MC-CMASS-VELOCITY-SUM`],
    source: `${CMASS_SRC} — Component 1 MC-CMASS-VELOCITY-SUM conflict_evidence [P28] (mass-weighted velocity vs. simple average)`,
  },
]

const CMASS_PROBES: SeedProbe[] = [
  {
    conceptId: CMASS,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 1 kg mass sits at x = 0 m and a 9 kg mass sits at x = 1 m on a light rod. Where is the centre of mass?',
    choices: [
      { text: 'x = 0.9 m — the mass-weighted average, pulled toward the heavier 9 kg mass', isCorrect: true },
      { text: 'x = 0.5 m — the geometric midpoint of the rod', isCorrect: false, misconceptionId: `${CMASS}:MC-CMASS-IS-GEOMETRIC-CENTRE` },
    ],
    correctValue: '0.9 m',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CMASS}:MC-CMASS-IS-GEOMETRIC-CENTRE`],
    source: `${CMASS_SRC} — MC-CMASS-IS-GEOMETRIC-CENTRE trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: CMASS,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A 1 kg part of a system moves at 10 m/s and a 4 kg part moves at 2 m/s. What is the centre-of-mass velocity?',
    choices: [
      { text: '3.6 m/s — the mass-weighted average, (1×10 + 4×2)/(1+4)', isCorrect: true },
      { text: '6 m/s — the simple average of the two speeds', isCorrect: false, misconceptionId: `${CMASS}:MC-CMASS-VELOCITY-SUM` },
    ],
    correctValue: '3.6 m/s',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CMASS}:MC-CMASS-VELOCITY-SUM`],
    source: `${CMASS_SRC} — MC-CMASS-VELOCITY-SUM trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.angular-kinematics ───────────────────────────────────────────
const AKIN = 'phys.mech.angular-kinematics'
const AKIN_SRC = 'docs/curriculum/blueprints/phys.mech.angular-kinematics.md'

const AKIN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: AKIN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Spin a bicycle wheel and watch a single spoke: the tip near the ' +
      'rim visibly sweeps through space far faster than a point close to ' +
      'the hub, even though the whole wheel is rotating together as one ' +
      'rigid piece. That is the key split in rotational motion: every ' +
      'point on a rigid rotating body shares the exact same angular ' +
      'velocity ω (they all sweep through the same angle in the same ' +
      'time), but their TANGENTIAL speed v = rω depends on r, the ' +
      'distance from the axis — a point right at the axis (r = 0) has ' +
      'zero tangential speed no matter how fast the object spins, while a ' +
      'point at the rim moves fastest. This is exactly why the outer edge ' +
      'of an old vinyl record wears down faster than the label near the ' +
      'centre: same ω for the whole disc, but a much larger v at the ' +
      'larger radius.',
    targetedMisconceptions: [`${AKIN}:MC-SAME-TANGENTIAL`],
    source: `${AKIN_SRC} — Component 3 MC-SAME-TANGENTIAL conflict_evidence [P28] (disc radius/speed numbers, record-wear example)`,
  },
]

const AKIN_PROBES: SeedProbe[] = [
  {
    conceptId: AKIN,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A rigid disc rotates at ω = 4 rad/s. Point A is at r = 0.2 m from the axis; point B is at r = 0.5 m. How do their tangential speeds compare?',
    choices: [
      { text: 'They differ (v_A = 0.8 m/s, v_B = 2 m/s) — same ω, but v = rω depends on r', isCorrect: true },
      { text: 'They are the same, since both points are on the same rotating disc', isCorrect: false, misconceptionId: `${AKIN}:MC-SAME-TANGENTIAL` },
    ],
    correctValue: 'different (v = r*omega)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${AKIN}:MC-SAME-TANGENTIAL`],
    source: `${AKIN_SRC} — MC-SAME-TANGENTIAL trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.moment-of-inertia ────────────────────────────────────────────
const MOI = 'phys.mech.moment-of-inertia'
const MOI_SRC = 'docs/curriculum/blueprints/phys.mech.moment-of-inertia.md'

const MOI_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MOI,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A solid cylinder and a hollow cylinder can have exactly the same ' +
      'mass (4 kg) and the same radius (0.3 m) and still resist changes ' +
      'in spin completely differently: I_solid = ½MR² = 0.18 kg·m², but ' +
      'I_hollow = MR² = 0.36 kg·m² — exactly double, despite identical ' +
      'mass and identical radius. The reason is that moment of inertia is ' +
      'I = Σmr², weighting every bit of mass by the SQUARE of its ' +
      'distance from the axis — in the hollow cylinder every gram of ' +
      'mass sits out at the maximum radius, while in the solid cylinder ' +
      'much of the mass is packed in close to the axis where it barely ' +
      'contributes to I. Moment of inertia is never just "how much mass" ' +
      '— it depends just as heavily on HOW that mass is distributed ' +
      'relative to the spin axis.',
    targetedMisconceptions: [`${MOI}:MC-I-IS-MASS`],
    source: `${MOI_SRC} — Component 3 MC-I-IS-MASS conflict_evidence [P28] (solid vs. hollow cylinder, equal mass/radius)`,
  },
]

const MOI_PROBES: SeedProbe[] = [
  {
    conceptId: MOI,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A solid cylinder and a hollow cylinder have the SAME mass and the SAME radius, rotating about the same central axis. Do they have the same moment of inertia?',
    choices: [
      { text: 'No — the hollow cylinder has twice the moment of inertia, because all its mass sits at the maximum radius', isCorrect: true },
      { text: 'Yes — moment of inertia depends only on total mass, and their masses are equal', isCorrect: false, misconceptionId: `${MOI}:MC-I-IS-MASS` },
    ],
    correctValue: 'no, hollow has 2x I',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MOI}:MC-I-IS-MASS`],
    source: `${MOI_SRC} — MC-I-IS-MASS trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.rotational-dynamics ──────────────────────────────────────────
const RDYN = 'phys.mech.rotational-dynamics'
const RDYN_SRC = 'docs/curriculum/blueprints/phys.mech.rotational-dynamics.md'

const RDYN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RDYN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Apply the exact same torque, τ = 4 N·m, to two different discs — ' +
      'Disc A with a large moment of inertia I = 2 kg·m², and Disc B with ' +
      'a small I = 0.5 kg·m². If torque alone decided angular ' +
      'acceleration, both would spin up identically. They don’t: ' +
      'α_A = τ/I = 4/2 = 2 rad/s², while α_B = 4/0.5 = 8 rad/s² — Disc B ' +
      'accelerates four times faster on the exact same torque. The ' +
      'rotational analogue of Newton’s Second Law makes this explicit: ' +
      'τ = Iα, rearranged as α = τ/I. Torque is the rotational "push"; I ' +
      'is the rotational "resistance to being pushed" — exactly the way F ' +
      'and m combine in a = F/m. This is precisely why a heavy flywheel ' +
      'resists spinning up even under a large torque, and why flywheels ' +
      'are used to store rotational energy stably.',
    targetedMisconceptions: [`${RDYN}:MC-ALPHA-EQUALS-TORQUE`],
    source: `${RDYN_SRC} — Component 3 MC-ALPHA-EQUALS-TORQUE conflict_evidence [P28] (two-disc τ=Iα comparison)`,
  },
]

const RDYN_PROBES: SeedProbe[] = [
  {
    conceptId: RDYN,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The same net torque τ = 4 N·m is applied to Disc A (I = 2 kg·m²) and Disc B (I = 0.5 kg·m²). Do they get the same angular acceleration?',
    choices: [
      { text: 'No — α = τ/I, so Disc B (smaller I) accelerates four times faster than Disc A', isCorrect: true },
      { text: 'Yes — same torque always produces the same angular acceleration', isCorrect: false, misconceptionId: `${RDYN}:MC-ALPHA-EQUALS-TORQUE` },
    ],
    correctValue: 'no, B accelerates 4x faster',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${RDYN}:MC-ALPHA-EQUALS-TORQUE`],
    source: `${RDYN_SRC} — MC-ALPHA-EQUALS-TORQUE trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.angular-momentum ─────────────────────────────────────────────
const AMOM = 'phys.mech.angular-momentum'
const AMOM_SRC = 'docs/curriculum/blueprints/phys.mech.angular-momentum.md'

const AMOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: AMOM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A small top spinning at ω = 20 rad/s with I = 0.1 kg·m² has ' +
      'angular momentum L = 0.1×20 = 2 kg·m²/s. A massive flywheel ' +
      'spinning twenty times SLOWER, at just ω = 1 rad/s but with a much ' +
      'larger I = 5 kg·m², has L = 5×1 = 5 kg·m²/s — more than double the ' +
      'top’s angular momentum despite spinning far more slowly. Angular ' +
      'momentum is L = Iω, so BOTH the rotational inertia and the ' +
      'rotation rate matter, exactly the way ordinary momentum p = mv ' +
      'means a slow-moving truck can carry more momentum than a ' +
      'fast-moving bicycle. Never judge angular momentum from ω alone — ' +
      'two objects spinning at the same ω can have wildly different L if ' +
      'their moments of inertia differ.',
    targetedMisconceptions: [`${AMOM}:MC-L-IS-OMEGA`],
    source: `${AMOM_SRC} — Component 3 MC-L-IS-OMEGA conflict_evidence [P28] (top vs. flywheel, p=mv analogy)`,
  },
]

const AMOM_PROBES: SeedProbe[] = [
  {
    conceptId: AMOM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Object A: I = 0.1 kg·m², ω = 20 rad/s. Object B: I = 5 kg·m², ω = 1 rad/s. Which has more angular momentum?',
    choices: [
      { text: 'Object B — L = Iω gives B a larger L (5 kg·m²/s) than A (2 kg·m²/s), despite spinning much slower', isCorrect: true },
      { text: 'Object A — it spins much faster, so it must have more angular momentum', isCorrect: false, misconceptionId: `${AMOM}:MC-L-IS-OMEGA` },
    ],
    correctValue: 'Object B',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${AMOM}:MC-L-IS-OMEGA`],
    source: `${AMOM_SRC} — MC-L-IS-OMEGA trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.conservation-of-angular-momentum ─────────────────────────────
const CAMOM = 'phys.mech.conservation-of-angular-momentum'
const CAMOM_SRC = 'docs/curriculum/blueprints/phys.mech.conservation-of-angular-momentum.md'

const CAMOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAMOM,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A figure skater spinning on (nearly frictionless) ice pulls her ' +
      'arms in and speeds up dramatically — with no push from the ice, no ' +
      'external torque acting on her at all. Where does the extra spin ' +
      'come from? Angular momentum L = Iω stays exactly constant when no ' +
      'external torque acts, so pulling her arms in reduces her moment of ' +
      'inertia I (mass moves closer to the spin axis) — and since ' +
      'L = Iω must stay fixed, a smaller I forces a larger ω. No external ' +
      'agent is needed at all: she redistributed her OWN mass, and ' +
      'internal forces are perfectly capable of changing I (and hence ω) ' +
      'even though they can never change the total L itself.',
    targetedMisconceptions: [`${CAMOM}:MC-ANGULAR-SPEED-FREE`],
    source: `${CAMOM_SRC} — Component 3 MC-ANGULAR-SPEED-FREE conflict_evidence [P28] (skater arms-in example)`,
  },
]

const CAMOM_PROBES: SeedProbe[] = [
  {
    conceptId: CAMOM,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A figure skater spinning on frictionless ice pulls her arms inward and spins faster. What external torque caused this speed-up?',
    choices: [
      { text: 'None — angular momentum is conserved; pulling her arms in reduced her moment of inertia I, and since L = Iω is constant, ω increased', isCorrect: true },
      { text: 'The ice must be exerting an external torque to make her spin faster', isCorrect: false, misconceptionId: `${CAMOM}:MC-ANGULAR-SPEED-FREE` },
    ],
    correctValue: 'no external torque needed',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CAMOM}:MC-ANGULAR-SPEED-FREE`],
    source: `${CAMOM_SRC} — MC-ANGULAR-SPEED-FREE trigger case as probe, distractor-mapped`,
  },
]

// ─── eng.reading.print-to-meaning ─────────────────────────────────────────────
const PTM = 'eng.reading.print-to-meaning'
const PTM_SRC = 'docs/curriculum/blueprints/eng.reading.print-to-meaning.md'

const PTM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PTM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Reading accurately and fluently is necessary but NOT sufficient for ' +
      'comprehension. You read that whole paragraph perfectly — every word ' +
      'right, nice pace, good expression. Now, without looking back: what ' +
      'was the paragraph actually about? It is entirely possible to decode ' +
      'every word correctly while your attention is elsewhere, producing ' +
      'accurate sound without processed meaning. After — or while — ' +
      'reading, actively check: can I explain what this said in my own ' +
      'words? Correct pronunciation alone does not confirm understanding.',
    targetedMisconceptions: [`${PTM}:MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION`],
    source: `${PTM_SRC} — MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION (P28 fluent-but-unable-to-summarize conflict evidence)`,
  },
  {
    conceptId: PTM,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Comprehension exists on a SPECTRUM, not as an all-or-nothing switch. ' +
      'You said you did not understand this paragraph at all — but you ' +
      'just correctly told me who the main character was and what they ' +
      'wanted. Is that "nothing," or a partial understanding you can build ' +
      'on? You might fully understand the main idea but be unsure about ' +
      'one specific word. Notice what you DID understand, identify the ' +
      'SPECIFIC gaps, and apply a targeted strategy — rereading a confusing ' +
      'sentence, using context clues — rather than treating any confusion ' +
      'as total failure.',
    targetedMisconceptions: [`${PTM}:MC-COMPREHENSION-IS-ALL-OR-NOTHING`],
    source: `${PTM_SRC} — MC-COMPREHENSION-IS-ALL-OR-NOTHING (P28 partial-understanding conflict evidence)`,
  },
  {
    conceptId: PTM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Accurate, fluent oral reading is necessary but not sufficient for ' +
      'comprehension — it is entirely possible to decode every word ' +
      'correctly while attention drifts elsewhere, producing correct sound ' +
      'without processed meaning. After reading, actively check whether you ' +
      'can restate the content in your own words, rather than treating ' +
      'correct pronunciation as proof of understanding. Separately, ' +
      'comprehension is not binary: partial understanding — grasping the ' +
      'main idea while missing one specific detail or word — is a normal, ' +
      'workable state, not a failure. The productive move is identifying ' +
      'the specific gap and applying a targeted strategy (rereading, ' +
      'context clues, self-questioning) rather than discarding everything ' +
      'you did understand.',
    targetedMisconceptions: [
      `${PTM}:MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION`,
      `${PTM}:MC-COMPREHENSION-IS-ALL-OR-NOTHING`,
    ],
    source: `${PTM_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const PTM_PROBES: SeedProbe[] = [
  {
    conceptId: PTM,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student reads a paragraph aloud with perfect accuracy and expression but cannot say what it was about afterward. Did they comprehend it?',
    choices: [
      { text: 'No — accurate, fluent reading does not by itself guarantee comprehension', isCorrect: true },
      { text: 'Yes — reading every word correctly and with good expression means they understood it', isCorrect: false, misconceptionId: `${PTM}:MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PTM}:MC-READING-ALOUD-CORRECTLY-EQUALS-COMPREHENSION`],
    source: `${PTM_SRC} — P28 fluent-but-unable-to-summarize conflict as probe`,
  },
  {
    conceptId: PTM,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student says they "understood nothing" about a paragraph, but they correctly identified the main character and what that character wanted. What does this suggest?',
    choices: [
      { text: 'They have a partial understanding to build on, not zero comprehension', isCorrect: true },
      { text: 'They are right — any confusion means total failure to comprehend', isCorrect: false, misconceptionId: `${PTM}:MC-COMPREHENSION-IS-ALL-OR-NOTHING` },
    ],
    correctValue: 'partial understanding',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PTM}:MC-COMPREHENSION-IS-ALL-OR-NOTHING`],
    source: `${PTM_SRC} — P28 partial-understanding conflict as probe`,
  },
]

// ─── eng.reading.reading-fluency ───────────────────────────────────────────────
const RFLU = 'eng.reading.reading-fluency'
const RFLU_SRC = 'docs/curriculum/blueprints/eng.reading.reading-fluency.md'

const RFLU_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RFLU,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Reading fluency has THREE components working together: ACCURACY ' +
      '(reading words correctly), appropriate RATE (not too slow, not ' +
      'rushed), and EXPRESSION (intonation and phrasing that reflects the ' +
      'text\'s meaning). You read that passage very fast — nice pace! But ' +
      'you skipped two words and read it in a flat monotone. Speed alone, ' +
      'without accuracy and meaningful expression, is not fluency — it can ' +
      'work against comprehension if words are skipped to go faster. Judge ' +
      'fluency by all three components together, not by speed alone.',
    targetedMisconceptions: [`${RFLU}:MC-READING-FLUENCY-IS-JUST-SPEED`],
    source: `${RFLU_SRC} — MC-READING-FLUENCY-IS-JUST-SPEED (P28 fast-but-flat conflict evidence)`,
  },
  {
    conceptId: RFLU,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'While reading widely builds vocabulary and general experience, ' +
      'REPEATED READING of the same specific passage — reading it multiple ' +
      'times in a row — is a targeted, evidence-based technique that ' +
      'noticeably builds automaticity and expression on that text. You have ' +
      'read many different books this month, one time each — do you notice ' +
      'your reading getting smoother on any SPECIFIC passage, the way it ' +
      'would if you read the SAME short passage several times in a row? To ' +
      'deliberately build fluency, practice repeated reading of the same ' +
      'short passage, in addition to reading widely.',
    targetedMisconceptions: [`${RFLU}:MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE`],
    source: `${RFLU_SRC} — MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE (P28 many-books-once-each conflict evidence)`,
  },
  {
    conceptId: RFLU,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Fluency is a three-part construct — accuracy, appropriate rate, and ' +
      'expression reflecting meaning — not speed alone; fast but flat, ' +
      'error-prone reading is not genuinely fluent, and can undermine ' +
      'comprehension. Separately, fluency does not develop merely from ' +
      'accumulating volume: reading many different texts once each builds ' +
      'vocabulary and general exposure, but REPEATED reading of the same ' +
      'specific passage is the evidence-based technique that targets ' +
      'automaticity and expression on that text. Deliberate fluency practice ' +
      'means rereading a short passage multiple times, alongside — not ' +
      'instead of — broad reading.',
    targetedMisconceptions: [
      `${RFLU}:MC-READING-FLUENCY-IS-JUST-SPEED`,
      `${RFLU}:MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE`,
    ],
    source: `${RFLU_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const RFLU_PROBES: SeedProbe[] = [
  {
    conceptId: RFLU,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student reads very fast, skips two words, and reads in a flat monotone. Is this fluent reading?',
    choices: [
      { text: 'No — fluency needs accuracy and expression together with rate, not speed alone', isCorrect: true },
      { text: 'Yes — reading quickly is the main sign of fluency', isCorrect: false, misconceptionId: `${RFLU}:MC-READING-FLUENCY-IS-JUST-SPEED` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RFLU}:MC-READING-FLUENCY-IS-JUST-SPEED`],
    source: `${RFLU_SRC} — P28 fast-but-flat conflict as probe`,
  },
  {
    conceptId: RFLU,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Will reading many different new books, one time each, build the same fluency gains as rereading one short passage several times?',
    choices: [
      { text: 'No — repeated reading of the same passage is a distinct, targeted technique for building fluency', isCorrect: true },
      { text: 'Yes — any reading volume builds fluency the same way', isCorrect: false, misconceptionId: `${RFLU}:MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RFLU}:MC-FLUENCY-DEVELOPS-AUTOMATICALLY-FROM-JUST-READING-MORE`],
    source: `${RFLU_SRC} — P28 many-books-once-each conflict as probe`,
  },
]

// ─── eng.reading.literal-comprehension ─────────────────────────────────────────
const LCOM = 'eng.reading.literal-comprehension'
const LCOM_SRC = 'docs/curriculum/blueprints/eng.reading.literal-comprehension.md'

const LCOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LCOM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Literal comprehension means accurately understanding information ' +
      'that is EXPLICITLY STATED in the text — it does NOT require ' +
      'memorizing or reproducing the exact original wording. The text says ' +
      '"The volcano erupted in 1883, killing thousands." You can say "A ' +
      'volcano exploded in 1883 and many people died" and still show ' +
      'genuine literal comprehension — the key facts are preserved, even ' +
      'though the wording changed. Demonstrate literal comprehension by ' +
      'accurately restating explicit facts in your own words, not by ' +
      'memorizing the original sentence.',
    targetedMisconceptions: [`${LCOM}:MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING`],
    source: `${LCOM_SRC} — MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING (P28 volcano paraphrase conflict evidence)`,
  },
  {
    conceptId: LCOM,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Literal comprehension requires INTEGRATING individual word meanings ' +
      'into an accurate understanding of what the sentence explicitly ' +
      'states as a WHOLE. You know what every single word in "Only some of ' +
      'the students passed the exam" means. But can you tell me exactly ' +
      'who did what — did ALL the students pass, or only SOME? Knowing ' +
      'every word\'s meaning is necessary but not sufficient; after ' +
      'confirming you know each word, deliberately check whether you have ' +
      'correctly combined them into what the sentence as a whole states — ' +
      'including qualifying details like "only some" versus "all".',
    targetedMisconceptions: [`${LCOM}:MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT`],
    source: `${LCOM_SRC} — MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT (P28 only-some-vs-all conflict evidence)`,
  },
  {
    conceptId: LCOM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Literal comprehension is accurate understanding of explicitly stated ' +
      'information, demonstrated by restating it in one\'s own words — not ' +
      'by reproducing the source text verbatim. "The volcano erupted in ' +
      '1883, killing thousands" can be correctly paraphrased as "A volcano ' +
      'exploded in 1883 and many people died" without any loss of literal ' +
      'accuracy. Separately, knowing every individual word in a sentence ' +
      'does not guarantee correct comprehension of the sentence as a whole ' +
      '— "only some of the students passed" is frequently misread as "all ' +
      'students passed" despite full word-level familiarity. Literal ' +
      'comprehension requires integrating word meanings into the actual ' +
      'stated proposition, including qualifying details.',
    targetedMisconceptions: [
      `${LCOM}:MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING`,
      `${LCOM}:MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT`,
    ],
    source: `${LCOM_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const LCOM_PROBES: SeedProbe[] = [
  {
    conceptId: LCOM,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'The text says "The volcano erupted in 1883, killing thousands." A student says "A volcano exploded in 1883 and many people died." Does this show literal comprehension?',
    choices: [
      { text: 'Yes — the key explicit facts are preserved, even though the wording changed', isCorrect: true },
      { text: 'No — literal comprehension requires the exact original wording', isCorrect: false, misconceptionId: `${LCOM}:MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LCOM}:MC-LITERAL-COMPREHENSION-MEANS-MEMORIZING-EXACT-WORDING`],
    source: `${LCOM_SRC} — P28 volcano paraphrase conflict as probe`,
  },
  {
    conceptId: LCOM,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student knows every word in "Only some of the students passed the exam" but says it means "all students passed." Does knowing every word guarantee correct comprehension?',
    choices: [
      { text: 'No — the words must be correctly combined, including qualifying details like "only some" vs. "all"', isCorrect: true },
      { text: 'Yes — knowing every word\'s meaning is enough to understand the sentence', isCorrect: false, misconceptionId: `${LCOM}:MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LCOM}:MC-IF-I-UNDERSTAND-THE-WORDS-I-UNDERSTAND-THE-TEXT`],
    source: `${LCOM_SRC} — P28 only-some-vs-all conflict as probe`,
  },
]

// ─── eng.reading.main-idea-and-details ─────────────────────────────────────────
const MIDT = 'eng.reading.main-idea-and-details'
const MIDT_SRC = 'docs/curriculum/blueprints/eng.reading.main-idea-and-details.md'

const MIDT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MIDT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'The first sentence often grabs your attention, but the main idea has ' +
      'to be the one thing that EVERY sentence in the paragraph is helping ' +
      'to explain. A paragraph opens with "The lion\'s roar shook the ' +
      'grass" — a vivid detail — but sentences 2 through 5 are really about ' +
      'lion pride hierarchy. To find the main idea, do not just read ' +
      'sentence one. Read the whole paragraph and ask: "What is the one ' +
      'idea that ALL of these sentences are supporting?" A detail only ' +
      'covers itself; the main idea has to be big enough to cover ' +
      'everything.',
    targetedMisconceptions: [`${MIDT}:MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA`],
    source: `${MIDT_SRC} — MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA (P28 lion-roar conflict evidence)`,
  },
  {
    conceptId: MIDT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Sometimes a writer states the main idea in one sentence — that is a ' +
      'stated main idea. But often the writer just shows you three or four ' +
      'pieces of evidence and expects YOU to notice the pattern and put it ' +
      'into your own words — that is an implied main idea. Three sentences ' +
      'each describe a different way people in a town helped after a ' +
      'flood, with no sentence saying "the town came together." Ask ' +
      'yourself: is there one sentence that already says the big idea, or ' +
      'do I need to notice the pattern and say it myself? Both are valid — ' +
      'an implied main idea in your own words counts just as much as a ' +
      'quoted one.',
    targetedMisconceptions: [`${MIDT}:MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE`],
    source: `${MIDT_SRC} — MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE (P28 flood-town implied-idea conflict evidence)`,
  },
  {
    conceptId: MIDT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'The main idea of a paragraph is the single idea every sentence in it ' +
      'is working to support — not necessarily the content of the opening ' +
      'sentence, which often serves as a hook or a narrow illustrative ' +
      'detail rather than the controlling idea itself. Confirm a candidate ' +
      'main idea by checking whether it covers every sentence in the ' +
      'paragraph, not just the first. Separately, a main idea need not be ' +
      'stated verbatim anywhere in the text: a stated main idea appears in ' +
      'one explicit sentence, while an implied main idea must be ' +
      'synthesized by the reader from a pattern across several supporting ' +
      'details — both are equally legitimate, and forcing a search for an ' +
      'exact quotable sentence will fail on implied-main-idea passages.',
    targetedMisconceptions: [
      `${MIDT}:MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA`,
      `${MIDT}:MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE`,
    ],
    source: `${MIDT_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const MIDT_PROBES: SeedProbe[] = [
  {
    conceptId: MIDT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A paragraph opens with "The lion\'s roar shook the grass," but sentences 2-5 are about lion pride hierarchy. Is the first sentence the main idea?',
    choices: [
      { text: 'No — check whether it covers every sentence; here it is just an opening detail', isCorrect: true },
      { text: 'Yes — the first sentence is always the main idea', isCorrect: false, misconceptionId: `${MIDT}:MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MIDT}:MC-A-FIRST-SENTENCE-IS-ALWAYS-THE-MAIN-IDEA`],
    source: `${MIDT_SRC} — P28 lion-roar conflict as probe`,
  },
  {
    conceptId: MIDT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Three sentences each describe a different way townspeople helped after a flood, but no sentence says "the town came together." Can this paragraph still have a main idea?',
    choices: [
      { text: 'Yes — an implied main idea, put in your own words, is just as valid as a stated one', isCorrect: true },
      { text: 'No — if no sentence states it directly, there is no main idea', isCorrect: false, misconceptionId: `${MIDT}:MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MIDT}:MC-MAIN-IDEA-MUST-BE-STATED-WORD-FOR-WORD-SOMEWHERE`],
    source: `${MIDT_SRC} — P28 flood-town implied-idea conflict as probe`,
  },
]

// ─── eng.reading.inference-in-reading ──────────────────────────────────────────
const INFR = 'eng.reading.inference-in-reading'
const INFR_SRC = 'docs/curriculum/blueprints/eng.reading.inference-in-reading.md'

const INFR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INFR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A good inference is not just a plausible guess about life in general ' +
      '— it is a conclusion you can defend by pointing to specific clues IN ' +
      'THE TEXT plus something you already know. A character "grabbed her ' +
      'coat, checked the sky, and slammed the door" — no weather is ' +
      'mentioned. "She was late for work" is plausible but untethered; "it ' +
      'might rain" is grounded in the actual clues (checking the sky, ' +
      'grabbing a coat). Every inference should be traceable back to: "The ' +
      'text said ___, and I know ___, so I can conclude ___."',
    targetedMisconceptions: [`${INFR}:MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE`],
    source: `${INFR_SRC} — MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE (P28 coat-and-sky conflict evidence)`,
  },
  {
    conceptId: INFR,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'You do not need the text to state something in exact words to ' +
      'reasonably conclude it. "Tom\'s hands shook as he opened the ' +
      'envelope. He read the letter twice before setting it down without a ' +
      'word." The text never says "Tom felt nervous" — and that is exactly ' +
      'what makes this an inference rather than a literal fact. Shaking ' +
      'hands, reading something twice, and silence are physical signs of ' +
      'strong emotion; connecting them to a feeling is a real, legitimate ' +
      'reading skill, not "making things up," as long as the conclusion is ' +
      'well-supported by the details actually given.',
    targetedMisconceptions: [`${INFR}:MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT`],
    source: `${INFR_SRC} — MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT (P28 Tom-shaking-hands conflict evidence)`,
  },
  {
    conceptId: INFR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A valid inference must be traceable to specific textual clues ' +
      'combined with background knowledge — not any real-world-plausible ' +
      'idea that happens to come to mind independent of what the text ' +
      'actually says. The reliable check: "the text said ___, and I know ' +
      '___, so I can conclude ___." The opposite failure is equally real: ' +
      'refusing to draw any conclusion beyond what is printed verbatim. ' +
      'Authors routinely convey internal states (fear, nervousness, joy) ' +
      'entirely through observable behavior, and connecting specific ' +
      'described details to a reasonable conclusion is a legitimate, ' +
      'expected reading skill — not speculation — provided the details ' +
      'genuinely support it.',
    targetedMisconceptions: [
      `${INFR}:MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE`,
      `${INFR}:MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT`,
    ],
    source: `${INFR_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const INFR_PROBES: SeedProbe[] = [
  {
    conceptId: INFR,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A character "grabbed her coat, checked the sky, and slammed the door." A student infers "she was late for work." Is this a well-grounded inference?',
    choices: [
      { text: 'No — nothing in the text supports lateness; "it might rain" is the inference the clues actually support', isCorrect: true },
      { text: 'Yes — any plausible real-world explanation counts as an inference', isCorrect: false, misconceptionId: `${INFR}:MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INFR}:MC-INFERENCE-MEANS-ANY-GUESS-THAT-FEELS-PLAUSIBLE`],
    source: `${INFR_SRC} — P28 coat-and-sky conflict as probe`,
  },
  {
    conceptId: INFR,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: '"Tom\'s hands shook as he opened the envelope." The text never says Tom felt nervous. Can a reader still reasonably conclude he was nervous?',
    choices: [
      { text: 'Yes — physical signs of emotion, described in the text, support that conclusion even though the word is never used', isCorrect: true },
      { text: 'No — if the text never states a feeling directly, you cannot know it', isCorrect: false, misconceptionId: `${INFR}:MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INFR}:MC-IF-ITS-NOT-STATED-EXPLICITLY-YOU-CANT-KNOW-IT`],
    source: `${INFR_SRC} — P28 Tom-shaking-hands conflict as probe`,
  },
]

// ─── eng.reading.summarizing ────────────────────────────────────────────────────
const SUMM = 'eng.reading.summarizing'
const SUMM_SRC = 'docs/curriculum/blueprints/eng.reading.summarizing.md'

const SUMM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SUMM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Copying sentences, even the "important" ones, only proves you can ' +
      'find text — it does not prove you understood it. A real summary ' +
      'requires you to process the meaning and rebuild it in your own ' +
      'words. After identifying the main idea and key details, close or ' +
      'cover the original text and restate what you remember in your own ' +
      'words and sentence structure. If you find yourself needing to peek ' +
      'back at exact phrasing, that is a signal to re-read for ' +
      'understanding rather than for exact words to copy.',
    targetedMisconceptions: [`${SUMM}:MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES`],
    source: `${SUMM_SRC} — MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES (P28 copy-vs-restate conflict evidence)`,
  },
  {
    conceptId: SUMM,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'A summary\'s whole purpose is compression — capturing the essential ' +
      'content in much less space. If your summary is nearly as long as ' +
      'the original, it has not done its job. A passage might have 3 ' +
      'essential supporting details and 2 minor illustrative ones (a color ' +
      'mentioned once, an incidental aside) — before including a detail in ' +
      'your summary, ask: does the main idea actually depend on this ' +
      'detail, or is it just interesting extra flavor? Keep only the ' +
      'load-bearing details — the ones that would change the reader\'s ' +
      'understanding if removed.',
    targetedMisconceptions: [`${SUMM}:MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL`],
    source: `${SUMM_SRC} — MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL (P28 essential-vs-minor-detail conflict evidence)`,
  },
  {
    conceptId: SUMM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A genuine summary requires processing the source content and ' +
      'rebuilding it in your own words and sentence structure — stringing ' +
      'together verbatim quotations, even of the most important-looking ' +
      'sentences, demonstrates that you located content, not that you ' +
      'understood it. Test yourself by covering the original and restating ' +
      'what you retain; needing to check exact phrasing signals incomplete ' +
      'understanding, not a summarizing shortcut. Separately, a summary\'s ' +
      'defining purpose is compression: it must retain only the main idea ' +
      'and genuinely load-bearing details, deliberately dropping minor or ' +
      'illustrative details — a summary approaching the original\'s length ' +
      'has failed at its core function regardless of accuracy.',
    targetedMisconceptions: [
      `${SUMM}:MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES`,
      `${SUMM}:MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL`,
    ],
    source: `${SUMM_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SUMM_PROBES: SeedProbe[] = [
  {
    conceptId: SUMM,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student writes a "summary" by copying three sentences word-for-word from the original passage. Does this demonstrate understanding?',
    choices: [
      { text: 'No — copying only proves the reader can locate text, not that they understood it', isCorrect: true },
      { text: 'Yes — selecting the important sentences and reproducing them is a valid summary', isCorrect: false, misconceptionId: `${SUMM}:MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SUMM}:MC-A-SUMMARY-MEANS-COPYING-THE-IMPORTANT-SENTENCES`],
    source: `${SUMM_SRC} — P28 copy-vs-restate conflict as probe`,
  },
  {
    conceptId: SUMM,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A student\'s summary is nearly as long as the original passage because it includes every detail. Is this a good summary?',
    choices: [
      { text: 'No — a summary must compress by dropping minor details and keeping only load-bearing ones', isCorrect: true },
      { text: 'Yes — including every detail from the original makes a summary more complete', isCorrect: false, misconceptionId: `${SUMM}:MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SUMM}:MC-A-GOOD-SUMMARY-INCLUDES-EVERY-DETAIL-FROM-THE-ORIGINAL`],
    source: `${SUMM_SRC} — P28 essential-vs-minor-detail conflict as probe`,
  },
]

// ─── eng.reading.text-structure ─────────────────────────────────────────────────
const TSTR = 'eng.reading.text-structure'
const TSTR_SRC = 'docs/curriculum/blueprints/eng.reading.text-structure.md'

const TSTR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TSTR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Paragraph breaks are about formatting on the page; text structure is ' +
      'about how the IDEAS are connected underneath. "Heavy rain fell for ' +
      'three days, so the river rose above its banks, which flooded the ' +
      'nearby farms" is a single, unbroken sentence — but it clearly shows ' +
      'one thing leading to another, a cause-effect pattern. Ignore where ' +
      'the paragraph breaks are for a moment. Ask instead: what is the ' +
      'logical relationship between the ideas — time order (sequence), one ' +
      'thing causing the next (cause-effect), two things compared ' +
      '(compare-contrast), a difficulty and a fix (problem-solution), or ' +
      'just describing features (description)?',
    targetedMisconceptions: [`${TSTR}:MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS`],
    source: `${TSTR_SRC} — MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS (P28 flood cause-effect conflict evidence)`,
  },
  {
    conceptId: TSTR,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Short, simple passages often use just one pattern all the way ' +
      'through — but longer or more complex texts frequently combine ' +
      'patterns, with different sections doing different organizational ' +
      'jobs. Paragraph 1 explains why a lake became polluted (cause-effect: ' +
      'factory runoff caused fish die-offs); paragraph 2 describes three ' +
      'different cleanup solutions being tried (problem-solution). Before ' +
      'locking in one structure label for an entire passage, check each ' +
      'section separately — it is completely normal and correct to say ' +
      '"this passage uses cause-effect first, then problem-solution" rather ' +
      'than forcing one label onto the whole thing.',
    targetedMisconceptions: [`${TSTR}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN`],
    source: `${TSTR_SRC} — MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN (P28 polluted-lake two-pattern conflict evidence)`,
  },
  {
    conceptId: TSTR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Text structure refers to the logical relationship connecting a ' +
      'passage\'s ideas — sequence, cause-effect, compare-contrast, ' +
      'problem-solution, or description — not the physical placement of ' +
      'paragraph breaks. A single unbroken sentence can display a clear ' +
      'cause-effect chain, while a multi-paragraph essay can remain purely ' +
      'descriptive throughout; formatting and structure are independent ' +
      'variables. Separately, longer or more complex texts commonly shift ' +
      'structural patterns across sections rather than committing to one ' +
      'pattern throughout — accurately describing such a text requires ' +
      'naming each section\'s pattern individually rather than forcing a ' +
      'single overall label that fits no section well.',
    targetedMisconceptions: [
      `${TSTR}:MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS`,
      `${TSTR}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN`,
    ],
    source: `${TSTR_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const TSTR_PROBES: SeedProbe[] = [
  {
    conceptId: TSTR,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: '"Heavy rain fell for three days, so the river rose, which flooded the farms" is one unbroken sentence. Does it have a text structure?',
    choices: [
      { text: 'Yes — it shows a clear cause-effect pattern, independent of paragraph breaks', isCorrect: true },
      { text: 'No — it is only one paragraph, so there is no real structure to identify', isCorrect: false, misconceptionId: `${TSTR}:MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS` },
    ],
    correctValue: 'yes, cause-effect',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TSTR}:MC-TEXT-STRUCTURE-IS-JUST-ABOUT-PARAGRAPH-BREAKS`],
    source: `${TSTR_SRC} — P28 flood cause-effect conflict as probe`,
  },
  {
    conceptId: TSTR,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Paragraph 1 explains why a lake became polluted (cause-effect); paragraph 2 describes cleanup solutions (problem-solution). What is "the" structure of this passage?',
    choices: [
      { text: 'It uses two patterns — cause-effect in the first part, problem-solution in the second', isCorrect: true },
      { text: 'It must be classified under one single structure label overall', isCorrect: false, misconceptionId: `${TSTR}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN` },
    ],
    correctValue: 'two patterns, one per section',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TSTR}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-STRUCTURE-PATTERN`],
    source: `${TSTR_SRC} — P28 polluted-lake two-pattern conflict as probe`,
  },
]

// ─── eng.reading.genre-recognition ─────────────────────────────────────────────
const GNRC = 'eng.reading.genre-recognition'
const GNRC_SRC = 'docs/curriculum/blueprints/eng.reading.genre-recognition.md'

const GNRC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GNRC,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Identifying genre from one surface feature is like assuming any ' +
      'building with a pointed roof must be a church — plenty of houses ' +
      'have pointed roofs too. A nonfiction informational text about ocean ' +
      'animals written with poetic line breaks does not become a poem just ' +
      'because it has line breaks. Genre is really determined by the ' +
      'text\'s overall PURPOSE — to inform with verified facts, to tell an ' +
      'invented story, to persuade — and its full set of structural ' +
      'conventions, not any one visible trait like line breaks or ' +
      'dialogue.',
    targetedMisconceptions: [`${GNRC}:MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE`],
    source: `${GNRC_SRC} — MC-A (P28 ocean-animals-poem conflict evidence)`,
  },
  {
    conceptId: GNRC,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Assuming every text fits exactly one genre box is like assuming ' +
      'every dish must be purely "sweet" or purely "savory" — but plenty ' +
      'of dishes are deliberately both. A memoir uses story structure ' +
      '(usually fiction\'s territory) to tell true events — that is ' +
      'narrative nonfiction, a genuine hybrid. Do not force every text ' +
      'into one fixed genre; if it combines conventions from more than one ' +
      'genre, name it as a hybrid rather than picking just one category ' +
      'that does not fully fit.',
    targetedMisconceptions: [`${GNRC}:MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP`],
    source: `${GNRC_SRC} — MC-B (P30 sweet-and-savory hybrid-genre bridge)`,
  },
  {
    conceptId: GNRC,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Genre is determined by a text\'s overall purpose and full set of ' +
      'structural conventions, not by any single surface feature — line ' +
      'breaks do not make a text a poem, and a serious tone does not make ' +
      'a text nonfiction; a nonfiction piece can be formatted with line ' +
      'breaks, and a fictionalized biography can read with complete ' +
      'gravity. Separately, genres are not always mutually exclusive: many ' +
      'texts deliberately blend conventions from more than one genre — ' +
      'narrative nonfiction (a memoir using story structure to convey ' +
      'true events) is a recognized hybrid, not an error of ' +
      'classification. Identify genre by checking purpose and multiple ' +
      'conventions together, and name a genuine hybrid as such rather than ' +
      'forcing a single ill-fitting label.',
    targetedMisconceptions: [
      `${GNRC}:MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE`,
      `${GNRC}:MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP`,
    ],
    source: `${GNRC_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const GNRC_PROBES: SeedProbe[] = [
  {
    conceptId: GNRC,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A nonfiction informational text about ocean animals is written with poetic line breaks. Is it a poem?',
    choices: [
      { text: 'No — its purpose and content are informational nonfiction; line breaks alone do not make it a poem', isCorrect: true },
      { text: 'Yes — any text with line breaks is a poem', isCorrect: false, misconceptionId: `${GNRC}:MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GNRC}:MC-A-A-TEXTS-GENRE-CAN-BE-IDENTIFIED-FROM-ONE-SURFACE-FEATURE-ALONE`],
    source: `${GNRC_SRC} — P28 ocean-animals-poem conflict as probe`,
  },
  {
    conceptId: GNRC,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A memoir uses story structure (rising action, climax, resolution) to tell true events from the author\'s life. Must this be classified as purely fiction or purely nonfiction?',
    choices: [
      { text: 'No — it can be named as narrative nonfiction, a genuine hybrid combining both genres\' conventions', isCorrect: true },
      { text: 'Yes — every text must fit into exactly one fixed genre with no overlap', isCorrect: false, misconceptionId: `${GNRC}:MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP` },
    ],
    correctValue: 'no, it is a hybrid (narrative nonfiction)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GNRC}:MC-B-EVERY-TEXT-BELONGS-TO-EXACTLY-ONE-FIXED-GENRE-WITH-NO-OVERLAP`],
    source: `${GNRC_SRC} — P30 sweet-and-savory hybrid-genre conflict as probe`,
  },
]

// ─── eng.reading.authors-purpose-and-tone ──────────────────────────────────────
const APT = 'eng.reading.authors-purpose-and-tone'
const APT_SRC = 'docs/curriculum/blueprints/eng.reading.authors-purpose-and-tone.md'

const APT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: APT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Purposes are not always neatly separate — a text can entertain ' +
      'while also persuading, or inform while also entertaining through an ' +
      'engaging style. A humorous personal essay can use funny anecdotes ' +
      'AND argue for a specific viewpoint about how to live a happier life ' +
      'at the same time. Instead of forcing one label, ask which purpose ' +
      'is PRIMARY, then check whether a secondary purpose is also clearly ' +
      'present, and name both if so, rather than picking just one and ' +
      'ignoring the rest.',
    targetedMisconceptions: [`${APT}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN`],
    source: `${APT_SRC} — MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN (P28 humorous-persuasive-essay conflict evidence)`,
  },
  {
    conceptId: APT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Tone is about the AUTHOR\'s attitude, shown through specific word ' +
      'choices and style — not about how you personally happen to feel ' +
      'reading it. "The battle resulted in significant casualties on both ' +
      'sides" uses clinical, detached, factual language — that is the ' +
      'author\'s tone. Different readers might feel sad, feel nothing, or ' +
      'feel angry reading the same passage, but that varying reaction is ' +
      'not the tone. To identify tone, point to specific words or phrases ' +
      'as evidence — do not just report your own emotional reaction.',
    targetedMisconceptions: [`${APT}:MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL`],
    source: `${APT_SRC} — MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL (P28 clinical-battle-description conflict evidence)`,
  },
  {
    conceptId: APT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A text\'s purpose need not be a single, exclusive category: a piece ' +
      'can entertain while simultaneously persuading, or inform while ' +
      'entertaining through style — identify the primary purpose, then ' +
      'check separately for a genuine secondary purpose rather than ' +
      'forcing one label. Tone, distinct from purpose, is the attitude the ' +
      'author conveys through specific word choice and style — a property ' +
      'of the text itself, evidenced by concrete word choices — not the ' +
      'reader\'s personal emotional reaction, which varies between readers ' +
      'and is not what "tone" analysis measures.',
    targetedMisconceptions: [
      `${APT}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN`,
      `${APT}:MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL`,
    ],
    source: `${APT_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const APT_PROBES: SeedProbe[] = [
  {
    conceptId: APT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A humorous personal essay uses funny anecdotes and also argues for a specific viewpoint about happiness. Does this text have only one purpose?',
    choices: [
      { text: 'No — it can have a primary purpose and a genuine secondary purpose at the same time', isCorrect: true },
      { text: 'Yes — every text must be classified under exactly one purpose', isCorrect: false, misconceptionId: `${APT}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN` },
    ],
    correctValue: 'no, it can have both',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${APT}:MC-A-TEXT-CAN-ONLY-HAVE-ONE-PURPOSE-INFORM-OR-PERSUADE-OR-ENTERTAIN`],
    source: `${APT_SRC} — P28 humorous-persuasive-essay conflict as probe`,
  },
  {
    conceptId: APT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: '"The battle resulted in significant casualties on both sides" is written in clinical, detached language. If one reader feels sad and another feels nothing, has the author\'s tone changed?',
    choices: [
      { text: 'No — the author\'s tone (clinical, detached) is fixed in the word choices; reader reactions can vary without changing it', isCorrect: true },
      { text: 'Yes — tone is whatever emotion each individual reader happens to feel', isCorrect: false, misconceptionId: `${APT}:MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${APT}:MC-TONE-IS-JUST-WHATEVER-EMOTION-THE-READER-HAPPENS-TO-FEEL`],
    source: `${APT_SRC} — P28 clinical-battle-description conflict as probe`,
  },
]

// ─── eng.reading.predicting-and-confirming ─────────────────────────────────────
const PRED = 'eng.reading.predicting-and-confirming'
const PRED_SRC = 'docs/curriculum/blueprints/eng.reading.predicting-and-confirming.md'

const PRED_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRED,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Making an ungrounded guess and calling it a "prediction" is like a ' +
      'weather forecaster predicting rain by picking a card at random, ' +
      'instead of looking at the clouds and pressure already visible. A ' +
      'text titled "The Drought That Changed the Village" opens with ' +
      'cracked, dry farmland — "the story is about a dragon" is an ' +
      'ungrounded guess, while "the story is probably about how the ' +
      'village deals with water shortage" uses the actual clues in front ' +
      'of you. Before predicting, look for the title, headings, and ' +
      'opening details — be ready to explain which clue led you there.',
    targetedMisconceptions: [`${PRED}:MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES`],
    source: `${PRED_SRC} — MC-A (P28 drought-village conflict evidence)`,
  },
  {
    conceptId: PRED,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Defending an original prediction against contradicting evidence is ' +
      'like a detective who, having named one suspect early on, ignores ' +
      'every new clue that points elsewhere just to avoid admitting the ' +
      'first guess was wrong. Predicting "this character will succeed ' +
      'easily" after paragraph one, then reading a later paragraph showing ' +
      'repeated failure, means the new information contradicts the ' +
      'prediction. A prediction is a working hypothesis, not a commitment ' +
      '— when new text clearly contradicts it, revise the prediction ' +
      'rather than defending it.',
    targetedMisconceptions: [`${PRED}:MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED`],
    source: `${PRED_SRC} — MC-B (P28 easy-success-then-failure conflict evidence)`,
  },
  {
    conceptId: PRED,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A genuine prediction is grounded in specific available clues — ' +
      'title, headings, opening details — reasoned toward a likely ' +
      'continuation, not an ungrounded guess that happens to sound ' +
      'plausible. Separately, a prediction functions as a working ' +
      'hypothesis rather than a fixed commitment: when subsequent text ' +
      'clearly contradicts an earlier prediction, the correct response is ' +
      'to revise the prediction based on the new evidence, not to defend ' +
      'or selectively reinterpret the original guess to preserve it — the ' +
      'same evidence-updating discipline that distinguishes careful ' +
      'reasoning from confirmation bias.',
    targetedMisconceptions: [
      `${PRED}:MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES`,
      `${PRED}:MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED`,
    ],
    source: `${PRED_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const PRED_PROBES: SeedProbe[] = [
  {
    conceptId: PRED,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A text titled "The Drought That Changed the Village" opens describing cracked, dry farmland. Which is the better prediction: "the story is about a dragon" or "the story is about a water shortage"?',
    choices: [
      { text: '"The story is about a water shortage" — grounded in the title and opening clues', isCorrect: true },
      { text: '"The story is about a dragon" — any guess counts as a prediction', isCorrect: false, misconceptionId: `${PRED}:MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES` },
    ],
    correctValue: 'water shortage prediction',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PRED}:MC-A-A-PREDICTION-IS-JUST-A-GUESS-AND-DOESNT-NEED-TO-BE-BASED-ON-TEXT-CLUES`],
    source: `${PRED_SRC} — P28 drought-village conflict as probe`,
  },
  {
    conceptId: PRED,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A reader predicted "this character will succeed easily," then read a paragraph showing the character failing repeatedly. What should the reader do?',
    choices: [
      { text: 'Revise the prediction based on the new evidence', isCorrect: true },
      { text: 'Keep defending the original prediction despite the contradicting evidence', isCorrect: false, misconceptionId: `${PRED}:MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED` },
    ],
    correctValue: 'revise the prediction',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PRED}:MC-B-ONCE-A-PREDICTION-IS-MADE-IT-SHOULD-BE-DEFENDED-RATHER-THAN-REVISED`],
    source: `${PRED_SRC} — P28 easy-success-then-failure conflict as probe`,
  },
]

// ─── eng.reading.skimming-and-scanning ──────────────────────────────────────────
const SKIM = 'eng.reading.skimming-and-scanning'
const SKIM_SRC = 'docs/curriculum/blueprints/eng.reading.skimming-and-scanning.md'

const SKIM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SKIM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Treating skimming and scanning as the same technique is like using ' +
      'a telescope and a magnifying glass interchangeably — a telescope ' +
      'helps you see the big picture from far away (skimming for general ' +
      'idea), while a magnifying glass helps you zoom in on one tiny ' +
      'specific detail (scanning for a specific fact). Before rapidly ' +
      'reading a text, identify your actual purpose: do you need the ' +
      'general idea (skim — headings, topic sentences), or one specific ' +
      'piece of information (scan — search only for that word or number)?',
    targetedMisconceptions: [`${SKIM}:MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES`],
    source: `${SKIM_SRC} — MC-A (telescope-vs-magnifying-glass anchor)`,
  },
  {
    conceptId: SKIM,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Assuming a skim or scan gives the same understanding as careful ' +
      'reading is like assuming glancing at a building\'s outline from ' +
      'across the street tells you everything about its interior layout — ' +
      'you get a rough shape, not the actual detail. If a task requires ' +
      'explaining the three reasons an author gives and how they connect, ' +
      'skimming the headings alone will not be enough. Before deciding to ' +
      'skim or scan, ask: does this task need genuine understanding of ' +
      'nuance or connections? If so, switch to full, careful reading.',
    targetedMisconceptions: [`${SKIM}:MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING`],
    source: `${SKIM_SRC} — MC-B (building-outline-from-across-the-street anchor)`,
  },
  {
    conceptId: SKIM,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Skimming and scanning are distinct techniques suited to distinct ' +
      'purposes: skimming samples a text\'s structure (headings, topic ' +
      'sentences) for its general idea, while scanning searches for one ' +
      'specific target while ignoring surrounding text — selecting the ' +
      'wrong one wastes time and yields the wrong kind of result. Neither ' +
      'technique substitutes for full, careful reading when a task ' +
      'genuinely requires understanding nuance, connections, or complex ' +
      'reasoning — both are appropriate only for previewing or locating, ' +
      'not for deep comprehension.',
    targetedMisconceptions: [
      `${SKIM}:MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES`,
      `${SKIM}:MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING`,
    ],
    source: `${SKIM_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SKIM_PROBES: SeedProbe[] = [
  {
    conceptId: SKIM,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'You need to find one specific date in a long article. Should you skim or scan?',
    choices: [
      { text: 'Scan — search only for the specific date, ignoring surrounding text', isCorrect: true },
      { text: 'Skim — skimming and scanning are the same technique either way', isCorrect: false, misconceptionId: `${SKIM}:MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES` },
    ],
    correctValue: 'scan',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SKIM}:MC-A-SKIMMING-AND-SCANNING-ARE-THE-SAME-TECHNIQUE-WITH-DIFFERENT-NAMES`],
    source: `${SKIM_SRC} — telescope-vs-magnifying-glass technique-match as probe`,
  },
  {
    conceptId: SKIM,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A task asks you to explain how an author\'s three reasons connect to each other. Is skimming the headings enough for this task?',
    choices: [
      { text: 'No — this requires full careful reading to understand the connections between reasons', isCorrect: true },
      { text: 'Yes — skimming gives the same depth of understanding as careful reading', isCorrect: false, misconceptionId: `${SKIM}:MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SKIM}:MC-B-SKIMMING-OR-SCANNING-GIVES-THE-SAME-DEPTH-OF-UNDERSTANDING-AS-CAREFUL-READING`],
    source: `${SKIM_SRC} — building-outline-from-across-the-street conflict as probe`,
  },
]

// ─── eng.reading.close-reading ──────────────────────────────────────────────────
const CLRD = 'eng.reading.close-reading'
const CLRD_SRC = 'docs/curriculum/blueprints/eng.reading.close-reading.md'

const CLRD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CLRD,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Close reading is not measured by how many times you read something ' +
      'or how slowly you go — it is measured by how deeply you analyze ' +
      'what is there. One student reads a passage slowly three times but ' +
      'can only restate the literal plot afterward; another reads it once ' +
      'but can point to three specific word choices and explain what each ' +
      'contributes to tone or characterization. The second student did ' +
      'close reading. Instead of just re-reading, actively annotate and ' +
      'question: why did the author choose THIS specific word instead of ' +
      'an obvious alternative?',
    targetedMisconceptions: [`${CLRD}:MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES`],
    source: `${CLRD_SRC} — MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES (P28 slow-reader-vs-attentive-reader conflict evidence)`,
  },
  {
    conceptId: CLRD,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Not every word rewards equal analytical attention — some words are ' +
      'functional and ordinary, while others are doing special work: ' +
      'unusual word choices, repeated motifs, positions emphasized at a ' +
      'sentence\'s end, or surprising shifts in tone. Trying to ' +
      'close-read every single word produces an unfocused, exhausting ' +
      'analysis that misses the details that actually reward attention. ' +
      'Scan first for details that stand out — unusual choices, ' +
      'repetitions, emphasized positions — and focus your deep analysis ' +
      'there instead of spreading equal effort across everything.',
    targetedMisconceptions: [`${CLRD}:MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED`],
    source: `${CLRD_SRC} — MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED (P28 exhaustive-vs-strategic-attention conflict evidence)`,
  },
  {
    conceptId: CLRD,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Close reading is defined by analytical depth, not by reading speed ' +
      'or repetition count — reading a passage three times slowly while ' +
      'only extracting the literal plot is not close reading, while a ' +
      'single attentive pass that identifies specific word choices and ' +
      'their function in tone or characterization genuinely is. ' +
      'Separately, not every detail in a text merits equal analytical ' +
      'attention: skilled close reading identifies which details are ' +
      'doing special work — unusual diction, repeated motifs, ' +
      'structurally emphasized positions, tonal shifts — and concentrates ' +
      'analysis there, rather than distributing uniform effort across ' +
      'ordinary, functional language.',
    targetedMisconceptions: [
      `${CLRD}:MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES`,
      `${CLRD}:MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED`,
    ],
    source: `${CLRD_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CLRD_PROBES: SeedProbe[] = [
  {
    conceptId: CLRD,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'One student reads a passage slowly three times but can only restate the plot. Another reads it once and can explain what three specific word choices contribute to tone. Who did close reading?',
    choices: [
      { text: 'The second student — close reading is defined by analytical depth, not speed or repetition', isCorrect: true },
      { text: 'The first student — reading slowly and multiple times is what close reading means', isCorrect: false, misconceptionId: `${CLRD}:MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES` },
    ],
    correctValue: 'the second student',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CLRD}:MC-CLOSE-READING-MEANS-READING-SLOWLY-OR-RE-READING-MULTIPLE-TIMES`],
    source: `${CLRD_SRC} — P28 slow-reader-vs-attentive-reader conflict as probe`,
  },
  {
    conceptId: CLRD,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Should a close reader give every single word in a passage equally deep analysis?',
    choices: [
      { text: 'No — focus deep analysis on standout details (unusual word choices, repetitions, emphasized positions), not every word equally', isCorrect: true },
      { text: 'Yes — every detail in a text is equally significant and must be analyzed', isCorrect: false, misconceptionId: `${CLRD}:MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CLRD}:MC-EVERY-DETAIL-IN-A-TEXT-IS-EQUALLY-SIGNIFICANT-AND-MUST-BE-ANALYZED`],
    source: `${CLRD_SRC} — P28 exhaustive-vs-strategic-attention conflict as probe`,
  },
]

// ─── eng.reading.compare-and-contrast-texts ────────────────────────────────────
const CCTX = 'eng.reading.compare-and-contrast-texts'
const CCTX_SRC = 'docs/curriculum/blueprints/eng.reading.compare-and-contrast-texts.md'

const CCTX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CCTX,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Two summaries placed next to each other are not a comparison — they ' +
      'are just two summaries. A genuine comparison explicitly connects ' +
      'the texts: "Both texts describe a character facing a difficult ' +
      'choice, but Text A\'s character chooses based on duty while Text ' +
      'B\'s character chooses based on personal desire." After summarizing ' +
      'each text separately (just the first step), go further: pick ' +
      'specific dimensions to compare — theme, structure, tone — and ' +
      'write sentences that explicitly connect the two texts on each one, ' +
      'using comparison language like "both... but" or "unlike Text A...".',
    targetedMisconceptions: [`${CCTX}:MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER`],
    source: `${CCTX_SRC} — MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER (P28 back-to-back-summaries conflict evidence)`,
  },
  {
    conceptId: CCTX,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Sharing a topic does not mean two texts are mostly alike — the SAME ' +
      'event or theme can be handled in completely different ways. A ' +
      'neutral, fact-based news report and a dramatic, emotionally-charged ' +
      'survivor account can cover the identical historical event while ' +
      'differing completely in structure and tone. A genuine comparison ' +
      'investigates differences just as rigorously as similarities, ' +
      'independently examining structure, tone, purpose, and perspective ' +
      'for each text, even when the topic is identical.',
    targetedMisconceptions: [`${CCTX}:MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME`],
    source: `${CCTX_SRC} — MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME (P28 news-report-vs-survivor-account conflict evidence)`,
  },
  {
    conceptId: CCTX,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Genuine comparison requires explicitly connecting two texts on ' +
      'shared dimensions — theme, structure, tone, character choices — ' +
      'using direct comparison language; two summaries placed sequentially ' +
      'with no linking analysis do not constitute a comparison, regardless ' +
      'of how thorough each summary is individually. Separately, sharing a ' +
      'topic does not imply similar treatment: the same event or theme can ' +
      'be rendered through substantially different structure, tone, ' +
      'purpose, and perspective. Each dimension must be independently ' +
      'investigated for both texts rather than assumed similar because the ' +
      'topic is shared.',
    targetedMisconceptions: [
      `${CCTX}:MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER`,
      `${CCTX}:MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME`,
    ],
    source: `${CCTX_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CCTX_PROBES: SeedProbe[] = [
  {
    conceptId: CCTX,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A student writes a summary of Text A, then a separate summary of Text B, with no sentences linking them. Is this a genuine comparison?',
    choices: [
      { text: 'No — a genuine comparison explicitly connects the texts on shared dimensions using comparison language', isCorrect: true },
      { text: 'Yes — summarizing both texts one after another is what comparing means', isCorrect: false, misconceptionId: `${CCTX}:MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CCTX}:MC-COMPARING-TWO-TEXTS-MEANS-SUMMARIZING-BOTH-ONE-AFTER-ANOTHER`],
    source: `${CCTX_SRC} — P28 back-to-back-summaries conflict as probe`,
  },
  {
    conceptId: CCTX,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A news report and a survivor\'s personal account both cover the same historical event. Does sharing a topic mean these two texts must be mostly similar?',
    choices: [
      { text: 'No — they can differ substantially in structure, tone, and perspective despite the shared topic', isCorrect: true },
      { text: 'Yes — two texts on the same topic must be mostly the same', isCorrect: false, misconceptionId: `${CCTX}:MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CCTX}:MC-TWO-TEXTS-ON-THE-SAME-TOPIC-MUST-BE-MOSTLY-THE-SAME`],
    source: `${CCTX_SRC} — P28 news-report-vs-survivor-account conflict as probe`,
  },
]

// ─── eng.reading.critical-reading ───────────────────────────────────────────────
const CRIT = 'eng.reading.critical-reading'
const CRIT_SRC = 'docs/curriculum/blueprints/eng.reading.critical-reading.md'

const CRIT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CRIT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      '"Critical" in critical reading does not mean "negative" or ' +
      '"fault-finding" — it means evaluative: carefully examining ' +
      'evidence, assumptions, and credibility rather than accepting claims ' +
      'at face value. A well-researched, carefully-argued article with ' +
      'strong evidence and no significant flaws can still receive a ' +
      'genuine critical reading that concludes "this argument is ' +
      'well-supported because the evidence comes from credible sources." ' +
      'Do not force disagreement to prove you are "being critical" — your ' +
      'conclusion should follow from genuine evaluation, not be decided in ' +
      'advance.',
    targetedMisconceptions: [`${CRIT}:MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT`],
    source: `${CRIT_SRC} — MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT (P28 well-argued-article conflict evidence)`,
  },
  {
    conceptId: CRIT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Citing something is not the same as citing something credible. A ' +
      'passage citing "a study" with no name, sample size, or date is far ' +
      'weaker evidence than a passage citing a specific, recent, ' +
      'peer-reviewed study — even though both LOOK like they are backing ' +
      'up a claim with evidence. When you see a citation or statistic, ask: ' +
      'is the source specific and identifiable? Is it recent and relevant? ' +
      'You have to evaluate the quality of the citation itself, not just ' +
      'its presence.',
    targetedMisconceptions: [`${CRIT}:MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE`],
    source: `${CRIT_SRC} — MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE (P28 vague-study-vs-named-study conflict evidence)`,
  },
  {
    conceptId: CRIT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      '"Critical" reading means evaluative analysis of evidence, ' +
      'assumptions, and credibility — not manufactured fault-finding. A ' +
      'genuinely rigorous evaluation can validly conclude that a ' +
      'well-argued, well-sourced text is credible; the process, not a ' +
      'predetermined negative verdict, is what makes reading "critical." ' +
      'Separately, the mere presence of a citation or statistic does not ' +
      'establish credibility — a vague, unattributed reference to "a ' +
      'study" carries far less evidentiary weight than a specific, ' +
      'current, relevant, peer-reviewed source. Genuine critical reading ' +
      'evaluates a citation\'s specificity, currency, and relevance rather ' +
      'than treating its mere existence as proof.',
    targetedMisconceptions: [
      `${CRIT}:MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT`,
      `${CRIT}:MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE`,
    ],
    source: `${CRIT_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CRIT_PROBES: SeedProbe[] = [
  {
    conceptId: CRIT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A student critically reads a well-researched, well-argued article and concludes it is credible and well-supported. Did the student fail at critical reading by not finding fault with it?',
    choices: [
      { text: 'No — critical reading means evaluating evidence, which can validly conclude a text is credible', isCorrect: true },
      { text: 'Yes — critical reading requires finding something wrong with or disagreeing with the text', isCorrect: false, misconceptionId: `${CRIT}:MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CRIT}:MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT`],
    source: `${CRIT_SRC} — P28 well-argued-article conflict as probe`,
  },
  {
    conceptId: CRIT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A passage cites "a study" with no name, sample size, or date to support its claim. Does citing a study automatically make the claim credible?',
    choices: [
      { text: 'No — the citation\'s specificity, currency, and relevance must be evaluated; a vague citation is weak evidence', isCorrect: true },
      { text: 'Yes — if a text cites sources or statistics, its claims are automatically credible', isCorrect: false, misconceptionId: `${CRIT}:MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CRIT}:MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE`],
    source: `${CRIT_SRC} — P28 vague-study-vs-named-study conflict as probe`,
  },
]

// ─── eng.reading.evaluating-sources ─────────────────────────────────────────────
const EVSR = 'eng.reading.evaluating-sources'
const EVSR_SRC = 'docs/curriculum/blueprints/eng.reading.evaluating-sources.md'

const EVSR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EVSR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Professional appearance is easy to fake and expensive to produce ' +
      'even with false content — polished design tells you nothing about ' +
      'whether the underlying claims are actually true. A slick website ' +
      'with no named author and a domain registered anonymously last month ' +
      'can make the same claim as a plainer site with a named, credentialed ' +
      'author and cited peer-reviewed studies. Real credibility comes from ' +
      'authorship (who wrote it, and are they qualified?), evidence (what ' +
      'supports the claims?), and track record — not from how nice the ' +
      'website looks.',
    targetedMisconceptions: [`${EVSR}:MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL`],
    source: `${EVSR_SRC} — MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL (P28 slick-vs-plain-site conflict evidence)`,
  },
  {
    conceptId: EVSR,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Credibility is not a fixed, all-or-nothing label stamped on an ' +
      'entire source forever — it varies by specific claim and topic. A ' +
      'generally reputable news source can cite one specific claim outside ' +
      'its usual expertise without adequate sourcing, while a source with a ' +
      'known bias on political topics can still accurately report a simple ' +
      'verifiable sports score. Instead of labeling a whole source ' +
      '"reliable" or "unreliable" forever, evaluate each specific claim on ' +
      'its own merits.',
    targetedMisconceptions: [`${EVSR}:MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE`],
    source: `${EVSR_SRC} — MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE (P28 reputable-source-single-error conflict evidence)`,
  },
  {
    conceptId: EVSR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Source credibility is determined by authorship qualifications, ' +
      'cited evidence, and track record — not by visual polish, which is ' +
      'inexpensive to produce regardless of content accuracy. Separately, ' +
      'credibility is not a fixed, binary property of an entire source: it ' +
      'varies by specific claim and topic, since even generally reliable ' +
      'sources can be under-sourced outside their area of expertise, and ' +
      'generally biased sources can accurately report simple, verifiable ' +
      'facts. Evaluate each claim on its own merits — authorship, evidence, ' +
      'and specific relevance — rather than applying a single blanket ' +
      'judgment to an entire source.',
    targetedMisconceptions: [
      `${EVSR}:MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL`,
      `${EVSR}:MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE`,
    ],
    source: `${EVSR_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const EVSR_PROBES: SeedProbe[] = [
  {
    conceptId: EVSR,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A slick, professionally-designed website makes a health claim with no named author or cited studies. Is it credible because it looks professional?',
    choices: [
      { text: 'No — check authorship, cited evidence, and track record, not visual polish', isCorrect: true },
      { text: 'Yes — professional design and official appearance signal reliability', isCorrect: false, misconceptionId: `${EVSR}:MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${EVSR}:MC-A-SOURCE-IS-CREDIBLE-IF-IT-LOOKS-PROFESSIONAL-OR-OFFICIAL`],
    source: `${EVSR_SRC} — P28 slick-vs-plain-site conflict as probe`,
  },
  {
    conceptId: EVSR,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A generally reputable news source makes one specific claim outside its usual expertise without adequate sourcing. Does this make the entire source unreliable forever?',
    choices: [
      { text: 'No — evaluate each specific claim on its own merits; credibility varies by claim and topic', isCorrect: true },
      { text: 'Yes — a source is either completely reliable or completely unreliable', isCorrect: false, misconceptionId: `${EVSR}:MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${EVSR}:MC-A-SOURCE-IS-EITHER-COMPLETELY-RELIABLE-OR-COMPLETELY-UNRELIABLE`],
    source: `${EVSR_SRC} — P28 reputable-source-single-error conflict as probe`,
  },
]

// ─── phys.mech.stress-strain ────────────────────────────────────────────────
const SSTR = 'phys.mech.stress-strain'
const SSTR_SRC = 'docs/curriculum/blueprints/phys.mech.stress-strain.md'

const SSTR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SSTR,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A 1000 N force applied to a steel bar with a 0.01 m² cross-section ' +
      'produces stress σ = 1000/0.01 = 100 000 Pa. Apply that exact same ' +
      '1000 N to a much thinner bar, cross-section only 0.001 m², and the ' +
      'stress jumps to 1 000 000 Pa — ten times higher, purely because ' +
      'the force is now concentrated over ten times less area, even ' +
      'though the force itself never changed. Stress is FORCE PER UNIT ' +
      'AREA, σ = F/A, never force alone — exactly why a pin held with the ' +
      'same push as a fingertip hurts far more: the same force squeezed ' +
      'through the pin’s tiny area produces enormous stress, while spread ' +
      'across your palm it produces almost none. A material fails when ' +
      'its stress exceeds its ultimate tensile strength, a property ' +
      'measured in pascals, never in newtons alone.',
    targetedMisconceptions: [`${SSTR}:MC-STRESS-IS-FORCE`],
    source: `${SSTR_SRC} — Component 1 MC-STRESS-IS-FORCE conflict_evidence [P28] (thick vs. thin bar, same force)`,
  },
  {
    conceptId: SSTR,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Young’s modulus E and spring constant k are easy to blur together, ' +
      'but they answer genuinely different questions. E = σ/ε is a pure ' +
      'MATERIAL property — steel is always E ≈ 200 GPa whether you test a ' +
      'short thick rod or a long thin wire, the same way "steel" always ' +
      'means the same substance no matter how it’s shaped. Spring ' +
      'constant k = EA/L, by contrast, mixes that material property ' +
      'together with the OBJECT’s own geometry (its area A and length L) ' +
      '— so a short, thick steel rod and a long, thin steel wire share ' +
      'the identical E but have wildly different k values (the rod is far ' +
      'stiffer to physically deform). Confusing the two leads to treating ' +
      'a geometry change as if it changed the material itself, when only ' +
      'k has moved.',
    targetedMisconceptions: [`${SSTR}:MC-YOUNG-MODULUS-IS-STIFFNESS`],
    source: `${SSTR_SRC} — Component 1 MC-YOUNG-MODULUS-IS-STIFFNESS conflict_evidence [P28] (E vs. k, geometry-independence)`,
  },
]

const SSTR_PROBES: SeedProbe[] = [
  {
    conceptId: SSTR,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The same 1000 N force is applied to two bars of different cross-sectional area: Bar A (0.01 m²) and Bar B (0.001 m², ten times smaller). Do they experience the same stress?',
    choices: [
      { text: 'No — Bar B experiences ten times more stress, since σ = F/A and its area is ten times smaller', isCorrect: true },
      { text: 'Yes — the applied force is identical, so the stress must be the same', isCorrect: false, misconceptionId: `${SSTR}:MC-STRESS-IS-FORCE` },
    ],
    correctValue: 'no, B has 10x more stress',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SSTR}:MC-STRESS-IS-FORCE`],
    source: `${SSTR_SRC} — MC-STRESS-IS-FORCE trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: SSTR,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A short, thick steel rod and a long, thin steel wire have very different spring constants k. Do they also have different Young’s moduli E?',
    choices: [
      { text: 'No — E is a material property (same for both, since both are steel); only k, which depends on geometry, differs', isCorrect: true },
      { text: 'Yes — the rod is stiffer, so it must have a larger E', isCorrect: false, misconceptionId: `${SSTR}:MC-YOUNG-MODULUS-IS-STIFFNESS` },
    ],
    correctValue: 'no, same E',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${SSTR}:MC-YOUNG-MODULUS-IS-STIFFNESS`],
    source: `${SSTR_SRC} — MC-YOUNG-MODULUS-IS-STIFFNESS trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.pressure-fluids ──────────────────────────────────────────────
const PFLU = 'phys.mech.pressure-fluids'
const PFLU_SRC = 'docs/curriculum/blueprints/phys.mech.pressure-fluids.md'

const PFLU_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PFLU,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Submerge a hollow ball with a small hole drilled in its side, and ' +
      'water rushes in from whichever direction the hole faces — top, ' +
      'bottom, or either side — proving fluid pressure is NOT a purely ' +
      'downward push. At any single point in a fluid, the pressure acts ' +
      'equally in every direction at once (this is exactly the sensation ' +
      'a diver feels: their wetsuit is squeezed evenly from all sides, ' +
      'not just from above). What "downward pressure" usually describes ' +
      'is really the FORCE on one particular surface, force = P × A, ' +
      'acting perpendicular to whatever surface you are looking at — ' +
      'downward on a horizontal surface facing up, sideways on a vertical ' +
      'wall, and so on. The pressure itself, P = P₀ + ρgd, is a scalar ' +
      'with no direction of its own; only the resulting FORCE on a ' +
      'specific surface has one.',
    targetedMisconceptions: [`${PFLU}:MC-PRESSURE-DIRECTION`],
    source: `${PFLU_SRC} — Component 1 MC-PRESSURE-DIRECTION conflict_evidence [P28] (hollow-ball-with-hole, diver analogy)`,
  },
  {
    conceptId: PFLU,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A wide barrel and a thin test tube, both filled with water to ' +
      'exactly the same height (1 m), might seem like they should have ' +
      'very different pressure at the bottom — the barrel holds a ' +
      'hundred times more water, after all. But P = ρgh = ' +
      '1000×9.8×1 = 9800 Pa in BOTH containers, identical — pressure ' +
      'depends only on depth h, the fluid’s density ρ, and gravity g, ' +
      'never on the total volume of fluid or the shape of the container. ' +
      'This is the classical "hydraulic paradox," and it’s exactly why a ' +
      'water tower’s pressure at your tap depends only on how HIGH the ' +
      'tower stands, never on how wide or large its tank is — a tall, ' +
      'narrow tower delivers more pressure than a short, enormous one.',
    targetedMisconceptions: [`${PFLU}:MC-PRESSURE-DEPENDS-ON-VOLUME`],
    source: `${PFLU_SRC} — Component 1 MC-PRESSURE-DEPENDS-ON-VOLUME conflict_evidence [P28] (barrel vs. tube, water-tower analogy)`,
  },
]

const PFLU_PROBES: SeedProbe[] = [
  {
    conceptId: PFLU,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A submerged hollow ball has a small hole drilled in its side. From which direction does water enter?',
    choices: [
      { text: 'From whichever direction the hole faces — fluid pressure acts in all directions at a given point', isCorrect: true },
      { text: 'Only from directly above, since fluid pressure acts downward', isCorrect: false, misconceptionId: `${PFLU}:MC-PRESSURE-DIRECTION` },
    ],
    correctValue: 'from whichever direction the hole faces',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PFLU}:MC-PRESSURE-DIRECTION`],
    source: `${PFLU_SRC} — MC-PRESSURE-DIRECTION trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: PFLU,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A wide barrel and a narrow test tube are both filled with water to the same height h = 1 m. Compare the water pressure at the bottom of each.',
    choices: [
      { text: 'Equal — pressure at depth h depends only on h, density, and g, never on the container’s volume or shape', isCorrect: true },
      { text: 'The barrel has much higher pressure, since it holds far more water', isCorrect: false, misconceptionId: `${PFLU}:MC-PRESSURE-DEPENDS-ON-VOLUME` },
    ],
    correctValue: 'equal',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PFLU}:MC-PRESSURE-DEPENDS-ON-VOLUME`],
    source: `${PFLU_SRC} — MC-PRESSURE-DEPENDS-ON-VOLUME trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.buoyancy ─────────────────────────────────────────────────────
const BUOY = 'phys.mech.buoyancy'
const BUOY_SRC = 'docs/curriculum/blueprints/phys.mech.buoyancy.md'

const BUOY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BUOY,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A 1 kg steel ball sinks; a 1000 kg steel ship floats — a thousand ' +
      'times heavier, yet it floats while the tiny ball sinks. Weight ' +
      'alone clearly cannot be what decides floating or sinking. The real ' +
      'factor is average DENSITY: the ship is mostly hollow, so its total ' +
      'mass spread over its total volume (steel hull plus all that empty, ' +
      'air-filled interior) works out to less than water’s density, while ' +
      'a solid steel ball’s density is far above water’s. An object ' +
      'floats when its average density is less than the fluid’s density ' +
      'and sinks when it’s greater — never a matter of comparing raw ' +
      'weights. Archimedes’ principle makes this precise: the buoyant ' +
      'force equals the weight of the fluid displaced, ' +
      'F_buoy = ρ_fluid × V_displaced × g, which depends on the fluid’s ' +
      'density and the displaced volume, not the object’s own weight at ' +
      'all.',
    targetedMisconceptions: [`${BUOY}:MC-BUOYANCY-WEIGHT`],
    source: `${BUOY_SRC} — Component 1 MC-BUOYANCY-WEIGHT conflict_evidence [P28] (1 kg ball vs. 1000 kg ship)`,
  },
  {
    conceptId: BUOY,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'It seems reasonable that an object sinking deeper should feel MORE ' +
      'buoyancy, the way water pressure itself keeps increasing with ' +
      'depth — but for a rigid, fully submerged object, buoyancy stays ' +
      'exactly constant no matter how deep it goes. The reason: buoyancy ' +
      'comes from the DIFFERENCE between the pressure pushing up on the ' +
      'object’s bottom face and the pressure pushing down on its top ' +
      'face. Both of those pressures individually increase with depth, ' +
      'but since the object’s own height (the gap between top and bottom ' +
      'face) never changes, that pressure DIFFERENCE — and therefore the ' +
      'net buoyant force, F_buoy = ρ_fluid × V_object × g — stays fixed. ' +
      'Depth only starts to matter for buoyancy when the object itself ' +
      'compresses and changes volume, like a balloon or a fish’s swim ' +
      'bladder, which a rigid steel cube never does.',
    targetedMisconceptions: [`${BUOY}:MC-BUOYANCY-PROPORTIONAL-TO-DEPTH`],
    source: `${BUOY_SRC} — Component 1 MC-BUOYANCY-PROPORTIONAL-TO-DEPTH conflict_evidence [P28] (constant V_submerged for rigid objects)`,
  },
]

const BUOY_PROBES: SeedProbe[] = [
  {
    conceptId: BUOY,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 1 kg steel ball sinks in water; a 1000 kg steel ship floats. What determines whether an object floats or sinks?',
    choices: [
      { text: 'Average density compared to the fluid’s density — not weight', isCorrect: true },
      { text: 'Weight — heavier objects sink, lighter objects float', isCorrect: false, misconceptionId: `${BUOY}:MC-BUOYANCY-WEIGHT` },
    ],
    correctValue: 'average density',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BUOY}:MC-BUOYANCY-WEIGHT`],
    source: `${BUOY_SRC} — MC-BUOYANCY-WEIGHT trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: BUOY,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A rigid steel cube is fully submerged at 1 m depth, then pushed down to 10 m depth. How does the buoyant force on it change?',
    choices: [
      { text: 'It stays the same — F_buoy = ρ_fluid × V_object × g, and V_object never changes for a rigid object', isCorrect: true },
      { text: 'It increases, since the cube sinks deeper and experiences more buoyancy at greater depth', isCorrect: false, misconceptionId: `${BUOY}:MC-BUOYANCY-PROPORTIONAL-TO-DEPTH` },
    ],
    correctValue: 'unchanged',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BUOY}:MC-BUOYANCY-PROPORTIONAL-TO-DEPTH`],
    source: `${BUOY_SRC} — MC-BUOYANCY-PROPORTIONAL-TO-DEPTH trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.bernoulli ────────────────────────────────────────────────────
const BERN = 'phys.mech.bernoulli'
const BERN_SRC = 'docs/curriculum/blueprints/phys.mech.bernoulli.md'

const BERN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BERN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      '"Fast-moving fluid has low pressure" can sound like some mysterious ' +
      'suction rule, but Bernoulli’s equation is really nothing more than ' +
      'energy conservation written for a moving fluid: for a steady, ' +
      'incompressible, non-viscous flow, P + ½ρv² + ρgh stays constant ' +
      'along a streamline — pressure energy, kinetic energy density, and ' +
      'gravitational energy density, all adding up to the same total ' +
      'everywhere. If the fluid speeds up, its kinetic-energy term ½ρv² ' +
      'necessarily grows, and since the total must stay fixed, the ' +
      'pressure term P must shrink to compensate — the low pressure is a ' +
      'CONSEQUENCE of the speed increase, not a cause that "sucks" ' +
      'anything. Exactly the same total-energy-conservation logic you ' +
      'already use for a swinging pendulum (KE trades off against PE) — ' +
      'Bernoulli is that same idea wearing a fluid-dynamics costume.',
    targetedMisconceptions: [`${BERN}:MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY`],
    source: `${BERN_SRC} — Component 1 MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY conflict_evidence [P28] (energy-conservation derivation)`,
  },
  {
    conceptId: BERN,
    subjectSlug: 'physics',
    familyKind: 'common_misconception_note',
    gradeBand: GradeBand.HIGH,
    content:
      'The popular "equal transit time" explanation for aerofoil lift — ' +
      'that air splitting at the leading edge must travel over the top ' +
      'and under the bottom and arrive together at the trailing edge, so ' +
      'the top air goes faster to cover more distance — is experimentally ' +
      'FALSE. Wind-tunnel smoke visualisation shows the air travelling ' +
      'over the top actually arrives at the trailing edge BEFORE the air ' +
      'that went underneath; there is no rendezvous requirement at all. ' +
      'Bernoulli’s equation is still correct once you know the real speed ' +
      'difference between the surfaces — it correctly converts that speed ' +
      'difference into a pressure difference and hence lift — but the ' +
      'REASON the top surface is faster is the aerofoil’s curvature, ' +
      'angle of attack, and the resulting downward deflection of air ' +
      '(Newton’s Third Law), not equal transit time.',
    targetedMisconceptions: [`${BERN}:MC-BERNOULLI-LIFT-EQUAL-TRANSIT`],
    source: `${BERN_SRC} — Component 1 MC-BERNOULLI-LIFT-EQUAL-TRANSIT conflict_evidence [P28] (wind-tunnel smoke visualisation)`,
  },
]

const BERN_PROBES: SeedProbe[] = [
  {
    conceptId: BERN,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'According to Bernoulli’s equation, why does pressure drop where fluid speed increases in a horizontal pipe?',
    choices: [
      { text: 'Because P + ½ρv² is constant — the extra kinetic-energy density must be balanced by a drop in pressure', isCorrect: true },
      { text: 'Because fast-moving fluid actively "sucks" the pressure away', isCorrect: false, misconceptionId: `${BERN}:MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY` },
    ],
    correctValue: 'energy conservation, not suction',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BERN}:MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY`],
    source: `${BERN_SRC} — MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: BERN,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does air flowing over the top and bottom of an aerofoil arrive at the trailing edge at the same time (equal transit time)?',
    choices: [
      { text: 'No — wind-tunnel evidence shows the top-surface air arrives first; there is no equal-transit requirement', isCorrect: true },
      { text: 'Yes — the air must meet up again at the trailing edge, which is why the top air moves faster', isCorrect: false, misconceptionId: `${BERN}:MC-BERNOULLI-LIFT-EQUAL-TRANSIT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BERN}:MC-BERNOULLI-LIFT-EQUAL-TRANSIT`],
    source: `${BERN_SRC} — MC-BERNOULLI-LIFT-EQUAL-TRANSIT trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.viscosity ────────────────────────────────────────────────────
const VISC = 'phys.mech.viscosity'
const VISC_SRC = 'docs/curriculum/blueprints/phys.mech.viscosity.md'

const VISC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VISC,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Mercury is roughly 13 times DENSER than water, yet it pours and ' +
      'flows almost as easily as water — its viscosity is only slightly ' +
      'higher. Honey, meanwhile, is barely 1.4 times denser than water ' +
      'but is thousands of times more VISCOUS, oozing rather than ' +
      'pouring. Density (ρ, mass per unit volume) and viscosity (η, ' +
      'resistance to flow, or how hard you must push one fluid layer past ' +
      'another) are completely independent properties with different ' +
      'physical origins — density comes from how much mass is packed into ' +
      'a given volume, while viscosity comes from how strongly ' +
      'neighbouring molecules grip each other as they try to slide past ' +
      'one another. A fluid can be dense and freely-flowing (mercury), or ' +
      'light and highly viscous (many polymer solutions) — knowing one ' +
      'property tells you essentially nothing about the other.',
    targetedMisconceptions: [`${VISC}:MC-VISCOSITY-IS-DENSITY`],
    source: `${VISC_SRC} — Component 1 MC-VISCOSITY-IS-DENSITY conflict_evidence [P28] (mercury vs. honey density/viscosity contrast)`,
  },
  {
    conceptId: VISC,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Viscosity is often treated as one fixed number for a given fluid, ' +
      'but it is one of the MOST temperature-sensitive properties in all ' +
      'of physics. Water’s viscosity drops from 1.79×10⁻³ Pa·s at 0°C to ' +
      'just 0.28×10⁻³ Pa·s at 100°C — over six times thinner when hot. ' +
      'Cold honey barely moves (η ≈ 100 Pa·s), while warm honey pours ' +
      'freely (η ≈ 0.1 Pa·s) — a thousand-fold difference from ' +
      'temperature alone. In LIQUIDS, viscosity drops sharply as ' +
      'temperature rises, because heat agitates molecules enough to break ' +
      'the intermolecular grip that resists flow. In GASES the effect ' +
      'reverses — viscosity rises weakly with temperature, since hotter ' +
      'gas molecules collide more often and transfer more momentum ' +
      'between layers. Any viscosity value quoted without a temperature ' +
      'attached is genuinely incomplete — exactly why mechanics drain an ' +
      'engine while the oil is still warm and thin, not cold and thick.',
    targetedMisconceptions: [`${VISC}:MC-VISCOSITY-CONSTANT-TEMPERATURE`],
    source: `${VISC_SRC} — Component 1 MC-VISCOSITY-CONSTANT-TEMPERATURE conflict_evidence [P28] (water/honey/air temperature dependence)`,
  },
]

const VISC_PROBES: SeedProbe[] = [
  {
    conceptId: VISC,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Mercury is about 13 times denser than water but flows almost as easily. Honey is only 1.4 times denser than water but flows far more slowly. What does this show?',
    choices: [
      { text: 'Viscosity and density are independent properties — a dense fluid can have low viscosity, and vice versa', isCorrect: true },
      { text: 'A fluid’s viscosity is directly determined by its density', isCorrect: false, misconceptionId: `${VISC}:MC-VISCOSITY-IS-DENSITY` },
    ],
    correctValue: 'independent properties',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VISC}:MC-VISCOSITY-IS-DENSITY`],
    source: `${VISC_SRC} — MC-VISCOSITY-IS-DENSITY trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: VISC,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does the viscosity of water stay the same as its temperature changes from 0°C to 100°C?',
    choices: [
      { text: 'No — water’s viscosity drops more than sixfold as it heats from 0°C to 100°C', isCorrect: true },
      { text: 'Yes — viscosity is a fixed material property that does not change with temperature', isCorrect: false, misconceptionId: `${VISC}:MC-VISCOSITY-CONSTANT-TEMPERATURE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VISC}:MC-VISCOSITY-CONSTANT-TEMPERATURE`],
    source: `${VISC_SRC} — MC-VISCOSITY-CONSTANT-TEMPERATURE trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.surface-tension ──────────────────────────────────────────────
const STEN = 'phys.mech.surface-tension'
const STEN_SRC = 'docs/curriculum/blueprints/phys.mech.surface-tension.md'

const STEN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STEN,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Surface tension γ and pressure look related but are dimensionally ' +
      'different quantities: γ is force per unit LENGTH (N/m), while ' +
      'pressure is force per unit AREA (N/m²) — they cannot simply be ' +
      'equated. What surface tension actually DOES is generate an excess ' +
      'pressure inside a curved liquid surface: a spherical water drop of ' +
      'radius r has ΔP = 2γ/r, while a soap bubble — which has TWO ' +
      'surfaces, inner and outer — has double that, ΔP = 4γ/r. For a ' +
      'water drop of radius 1 mm with γ = 0.072 N/m, that works out to ' +
      'ΔP = 2×0.072/0.001 = 144 Pa, a genuine pressure in pascals, ' +
      'produced BY the surface tension but never identical to it. The two ' +
      'quantities are linked through the Young–Laplace equation, not ' +
      'interchangeable.',
    targetedMisconceptions: [`${STEN}:MC-SURFACE-TENSION-IS-PRESSURE`],
    source: `${STEN_SRC} — Component 1 MC-SURFACE-TENSION-IS-PRESSURE conflict_evidence [P28] (drop vs. bubble ΔP formulas, worked numbers)`,
  },
  {
    conceptId: STEN,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A needle resting on water seems to prove surface tension pulls ' +
      '"outward," stretching the surface like a trampoline holding the ' +
      'needle up from below — but surface tension actually acts ' +
      'TANGENTIALLY, along the surface, never straight outward or ' +
      'straight inward through the liquid. What happens under the needle ' +
      'is that the water surface dips slightly, and the tangential pull ' +
      'along that now-curved surface develops an upward-pointing ' +
      'COMPONENT exactly like the tension in a tilted rope has a vertical ' +
      'component — the surface itself never stretches outward, it simply ' +
      'pulls along itself, and curvature converts part of that tangential ' +
      'pull into a net supporting force. On a perfectly flat surface, ' +
      'this tangential tension produces no net force on the bulk liquid ' +
      'at all — only curvature creates the perpendicular effect that ' +
      'shows up as excess pressure or, here, as a floating needle.',
    targetedMisconceptions: [`${STEN}:MC-SURFACE-TENSION-ACTS-OUTWARD`],
    source: `${STEN_SRC} — Component 1 MC-SURFACE-TENSION-ACTS-OUTWARD conflict_evidence [P28] (needle-on-water, tangential-vs-normal force)`,
  },
]

const STEN_PROBES: SeedProbe[] = [
  {
    conceptId: STEN,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A water drop of radius r has surface tension γ. What is the excess pressure inside the drop?',
    choices: [
      { text: 'ΔP = 2γ/r — related to surface tension through curvature, not equal to γ itself', isCorrect: true },
      { text: 'ΔP = γ — the pressure equals the surface tension directly', isCorrect: false, misconceptionId: `${STEN}:MC-SURFACE-TENSION-IS-PRESSURE` },
    ],
    correctValue: '2*gamma/r',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${STEN}:MC-SURFACE-TENSION-IS-PRESSURE`],
    source: `${STEN_SRC} — MC-SURFACE-TENSION-IS-PRESSURE trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: STEN,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In which direction does surface tension act on a liquid surface?',
    choices: [
      { text: 'Tangentially, along the surface — curvature then converts part of that tangential pull into a normal (perpendicular) force', isCorrect: true },
      { text: 'Outward, stretching the liquid surface away from the bulk liquid', isCorrect: false, misconceptionId: `${STEN}:MC-SURFACE-TENSION-ACTS-OUTWARD` },
    ],
    correctValue: 'tangentially',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${STEN}:MC-SURFACE-TENSION-ACTS-OUTWARD`],
    source: `${STEN_SRC} — MC-SURFACE-TENSION-ACTS-OUTWARD trigger case as probe, distractor-mapped`,
  },
]

// ─── eng.reading.reading-across-genres ─────────────────────────────────────────
const RAG = 'eng.reading.reading-across-genres'
const RAG_SRC = 'docs/curriculum/blueprints/eng.reading.reading-across-genres.md'

const RAG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RAG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Summarizing each text separately and calling it synthesis is like ' +
      'laying three separate photographs side by side and calling it a ' +
      'single portrait — the photographs are all present, but nothing has ' +
      'actually been combined into one unified image. Genuine synthesis ' +
      'integrates insights from multiple texts into one connected ' +
      'understanding: after understanding each text individually, ask what ' +
      'these texts, taken together, tell you that no single one tells you ' +
      'alone, and write statements that draw on multiple sources at once.',
    targetedMisconceptions: [`${RAG}:MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK`],
    source: `${RAG_SRC} — MC-A (three-photographs-vs-single-portrait anchor)`,
  },
  {
    conceptId: RAG,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Assuming different genres cannot be synthesized is like assuming a ' +
      'photograph and a written description of the same event have ' +
      'nothing to do with each other because one is a picture and one is ' +
      'words — different forms of the same underlying subject can ' +
      'absolutely inform each other. A poem about the emotional experience ' +
      'of drought and a scientific report on drought\'s measurable effects ' +
      'share a genuine underlying topic despite their very different ' +
      'forms; look for how each genre\'s distinct approach illuminates a ' +
      'different facet of the same shared subject.',
    targetedMisconceptions: [`${RAG}:MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED`],
    source: `${RAG_SRC} — MC-B (photograph-vs-written-description anchor)`,
  },
  {
    conceptId: RAG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Genuine synthesis across multiple texts requires integrating their ' +
      'insights into one unified understanding — separate summaries placed ' +
      'sequentially, however thorough individually, do not constitute ' +
      'synthesis, since the actual integrating work never happens on the ' +
      'page. Separately, texts in markedly different genres — a poem and a ' +
      'scientific report, for instance — can share a genuine underlying ' +
      'topic and inform a single unified understanding despite their ' +
      'different forms and conventions; genre difference describes the ' +
      'form a text takes, not a barrier around its content.',
    targetedMisconceptions: [
      `${RAG}:MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK`,
      `${RAG}:MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED`,
    ],
    source: `${RAG_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const RAG_PROBES: SeedProbe[] = [
  {
    conceptId: RAG,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A student writes three separate paragraph summaries, one per source, with no sentence connecting them. Is this genuine synthesis?',
    choices: [
      { text: 'No — genuine synthesis integrates insights across sources into one unified understanding', isCorrect: true },
      { text: 'Yes — summarizing each source separately, one after another, is what synthesis means', isCorrect: false, misconceptionId: `${RAG}:MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${RAG}:MC-A-SYNTHESIZING-MULTIPLE-TEXTS-MEANS-SUMMARIZING-EACH-ONE-SEPARATELY-BACK-TO-BACK`],
    source: `${RAG_SRC} — three-photographs-vs-single-portrait conflict as probe`,
  },
  {
    conceptId: RAG,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A poem about the emotional experience of drought and a scientific report on drought\'s measurable effects are in completely different genres. Can they still be synthesized into one understanding?',
    choices: [
      { text: 'Yes — they share a genuine underlying topic despite their different forms', isCorrect: true },
      { text: 'No — texts in different genres cannot be meaningfully connected', isCorrect: false, misconceptionId: `${RAG}:MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${RAG}:MC-B-TEXTS-IN-DIFFERENT-GENRES-CANNOT-BE-MEANINGFULLY-CONNECTED-OR-SYNTHESIZED`],
    source: `${RAG_SRC} — photograph-vs-written-description conflict as probe`,
  },
]

// ─── eng.listening.active-listening ────────────────────────────────────────────
const ACTL = 'eng.listening.active-listening'
const ACTL_SRC = 'docs/curriculum/blueprints/eng.listening.active-listening.md'

const ACTL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ACTL,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Hearing is a passive physical process — sound waves reaching your ' +
      'ears. Active listening is a deliberate, effortful process: attending ' +
      'to meaning, noticing tone and body language, and engaging to show ' +
      'and build genuine understanding. You could hear every word of a ' +
      'story and still be unable to say what it was actually about or how ' +
      'the speaker seemed to feel — that gap is the difference. Do not just ' +
      'let words reach your ears — actively attend to meaning and watch ' +
      'for nonverbal cues.',
    targetedMisconceptions: [`${ACTL}:MC-HEARING-EQUALS-LISTENING`],
    source: `${ACTL_SRC} — MC-HEARING-EQUALS-LISTENING (P28 repeat-words-vs-explain-story conflict evidence)`,
  },
  {
    conceptId: ACTL,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Active listening includes appropriate engagement signals — nodding, ' +
      'brief verbal acknowledgments like "mm-hmm," eye contact, and ' +
      'well-timed clarifying questions after the speaker finishes a ' +
      'thought. Staying completely still and silent out of worry about ' +
      'interrupting can actually make a speaker unsure whether they are ' +
      'being heard at all. These signals show the speaker you are engaged; ' +
      'they support active listening rather than violating it.',
    targetedMisconceptions: [`${ACTL}:MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT`],
    source: `${ACTL_SRC} — MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT (P28 silent-stillness-vs-engagement-signals conflict evidence)`,
  },
  {
    conceptId: ACTL,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Active listening is distinct from the passive physical act of ' +
      'hearing: it requires attending to meaning, noticing tonal and ' +
      'nonverbal cues, and engaging to build genuine understanding — one ' +
      'can hear every word spoken and still fail to grasp the point or the ' +
      'speaker\'s emotional register. Separately, active listening genuinely ' +
      'includes visible engagement signals — nodding, brief verbal ' +
      'acknowledgments, eye contact, well-timed questions after a thought ' +
      'concludes — rather than complete silence, which can read to a ' +
      'speaker as disengagement rather than respectful attention.',
    targetedMisconceptions: [
      `${ACTL}:MC-HEARING-EQUALS-LISTENING`,
      `${ACTL}:MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT`,
    ],
    source: `${ACTL_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const ACTL_PROBES: SeedProbe[] = [
  {
    conceptId: ACTL,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A listener can repeat back several words from a story but cannot say what it was about or how the speaker felt. Were they actively listening?',
    choices: [
      { text: 'No — hearing the words is not the same as actively attending to meaning', isCorrect: true },
      { text: 'Yes — hearing every word means they were listening', isCorrect: false, misconceptionId: `${ACTL}:MC-HEARING-EQUALS-LISTENING` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ACTL}:MC-HEARING-EQUALS-LISTENING`],
    source: `${ACTL_SRC} — P28 repeat-words-vs-explain-story conflict as probe`,
  },
  {
    conceptId: ACTL,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A listener stays completely silent and still, worried that nodding or saying "mm-hmm" would be rude. Is this good active listening?',
    choices: [
      { text: 'No — appropriate engagement signals like nodding and brief acknowledgments support active listening, not interrupt it', isCorrect: true },
      { text: 'Yes — active listening means staying completely silent', isCorrect: false, misconceptionId: `${ACTL}:MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ACTL}:MC-ACTIVE-LISTENING-MEANS-STAYING-SILENT`],
    source: `${ACTL_SRC} — P28 silent-stillness-vs-engagement-signals conflict as probe`,
  },
]

// ─── eng.listening.listening-for-gist ───────────────────────────────────────────
const GIST = 'eng.listening.listening-for-gist'
const GIST_SRC = 'docs/curriculum/blueprints/eng.listening.listening-for-gist.md'

const GIST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GIST,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Listening for GIST means understanding the overall topic or general ' +
      'meaning WITHOUT needing to process every single word — a ' +
      'deliberately different, more tolerant listening mode than detailed ' +
      'comprehension. Catching the words "weather," "rain," and "tomorrow" ' +
      'in an announcement lets you infer "this is a weather forecast ' +
      'mentioning rain tomorrow," even if several other words were ' +
      'unclear. For gist listening, focus on catching key content words ' +
      'and deliberately let go of needing every single word.',
    targetedMisconceptions: [`${GIST}:MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST`],
    source: `${GIST_SRC} — MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST (P28 weather-forecast conflict evidence)`,
  },
  {
    conceptId: GIST,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Listening for gist is a genuinely distinct, valuable STRATEGY, not a ' +
      'lesser stage to outgrow — even highly proficient listeners ' +
      'deliberately use gist listening to quickly preview content or decide ' +
      'what deserves closer attention, such as scanning several news ' +
      'headlines to decide which story to follow in detail. It is a ' +
      'different TOOL for a different purpose than detailed listening, not ' +
      'a weaker version of the same skill reserved for beginners.',
    targetedMisconceptions: [`${GIST}:MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING`],
    source: `${GIST_SRC} — MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING (P28 fluent-speakers-scan-headlines conflict evidence)`,
  },
  {
    conceptId: GIST,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Gist listening deliberately tolerates incomplete word-level ' +
      'understanding: catching key content words and contextual cues is ' +
      'sufficient to establish the general topic even with several ' +
      'unfamiliar words or fast speech present — it is not a failed ' +
      'attempt at full comprehension but a distinct comprehension mode ' +
      'suited to a different purpose. Separately, gist listening is not a ' +
      'lesser skill confined to beginners: skilled listeners deliberately ' +
      'employ it to preview content and decide what merits full attention, ' +
      'making it a strategic tool alongside, not beneath, detailed ' +
      'listening.',
    targetedMisconceptions: [
      `${GIST}:MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST`,
      `${GIST}:MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING`,
    ],
    source: `${GIST_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const GIST_PROBES: SeedProbe[] = [
  {
    conceptId: GIST,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A listener catches the words "weather," "rain," and "tomorrow" in an announcement but misses several other words. Can they understand the gist?',
    choices: [
      { text: 'Yes — key content words are often enough to grasp the general topic', isCorrect: true },
      { text: 'No — missing any word means you cannot understand the gist at all', isCorrect: false, misconceptionId: `${GIST}:MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GIST}:MC-MUST-UNDERSTAND-EVERY-WORD-TO-UNDERSTAND-THE-GIST`],
    source: `${GIST_SRC} — P28 weather-forecast conflict as probe`,
  },
  {
    conceptId: GIST,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Do highly fluent, skilled listeners ever use gist listening, or is it only for beginners who "can\'t" listen for detail?',
    choices: [
      { text: 'Skilled listeners deliberately use gist listening too, to preview content and decide what deserves attention', isCorrect: true },
      { text: 'Gist listening is a lower skill only needed by weaker listeners', isCorrect: false, misconceptionId: `${GIST}:MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING` },
    ],
    correctValue: 'skilled listeners use it too',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GIST}:MC-GIST-LISTENING-IS-A-LOWER-SKILL-THAN-DETAILED-LISTENING`],
    source: `${GIST_SRC} — P28 fluent-speakers-scan-headlines conflict as probe`,
  },
]

// ─── eng.listening.listening-for-detail ────────────────────────────────────────
const LDET = 'eng.listening.listening-for-detail'
const LDET_SRC = 'docs/curriculum/blueprints/eng.listening.listening-for-detail.md'

const LDET_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LDET,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Trying to catch every single word is like trying to catch every ' +
      'raindrop in a storm — you will miss things and feel overwhelmed. If ' +
      'a passage says "The museum tour starts at 2:30, right after the ' +
      'gift shop reopens from lunch," a listener told "just find out what ' +
      'time the tour starts" answers correctly with less stress than one ' +
      'trying to catch every word. Before you listen, decide exactly what ' +
      'you are listening for, and let the rest of the speech flow past ' +
      'you.',
    targetedMisconceptions: [`${LDET}:MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD`],
    source: `${LDET_SRC} — MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD (P28 museum-tour-time conflict evidence)`,
  },
  {
    conceptId: LDET,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Each detail you are asked for is usually a separate catch, like ' +
      'separate items on a shopping list — missing one item does not mean ' +
      'you failed to find any of them. Given a passage with 3 requested ' +
      'details (a name, a time, a location) where you caught 2 of 3, ' +
      'report the 2 you caught confidently rather than refusing to answer ' +
      'anything. Treat each requested detail as its own independent task; ' +
      'missing one does not erase what you caught for the others.',
    targetedMisconceptions: [`${LDET}:MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED`],
    source: `${LDET_SRC} — MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED (P28 2-of-3-details-caught conflict evidence)`,
  },
  {
    conceptId: LDET,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Listening for detail is a targeted skill: identify the specific ' +
      'information needed — a time, a name, a location — before listening, ' +
      'and let surrounding speech pass without effort to retain it; ' +
      'attempting to mentally transcribe everything produces overload and ' +
      'a higher failure rate than selective attention. Separately, a ' +
      'multi-detail listening task consists of independent sub-tasks: ' +
      'missing one requested detail among several does not invalidate the ' +
      'others successfully caught — report what was captured and, where a ' +
      'repeat listen is available, target only the missing piece.',
    targetedMisconceptions: [
      `${LDET}:MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD`,
      `${LDET}:MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED`,
    ],
    source: `${LDET_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const LDET_PROBES: SeedProbe[] = [
  {
    conceptId: LDET,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'You need to find out what time a museum tour starts from a longer announcement. Should you try to catch every word, or focus only on the time?',
    choices: [
      { text: 'Focus only on the time — decide what you need before listening and let the rest pass', isCorrect: true },
      { text: 'Try to catch every single word to be safe', isCorrect: false, misconceptionId: `${LDET}:MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD` },
    ],
    correctValue: 'focus only on the time',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LDET}:MC-LISTENING-FOR-DETAIL-MEANS-TRYING-TO-CATCH-EVERY-WORD`],
    source: `${LDET_SRC} — P28 museum-tour-time conflict as probe`,
  },
  {
    conceptId: LDET,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'A passage asks for 3 details (a name, a time, a location). You caught 2 of the 3. Should you report the 2 you caught, or refuse to answer since you missed one?',
    choices: [
      { text: 'Report the 2 you caught — missing one detail does not erase what you caught for the others', isCorrect: true },
      { text: 'Refuse to answer anything, since missing one detail means the whole task failed', isCorrect: false, misconceptionId: `${LDET}:MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED` },
    ],
    correctValue: 'report the 2 you caught',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LDET}:MC-IF-YOU-MISS-ONE-DETAIL-THE-WHOLE-LISTENING-TASK-FAILED`],
    source: `${LDET_SRC} — P28 2-of-3-details-caught conflict as probe`,
  },
]

// ─── eng.listening.following-instructions ──────────────────────────────────────
const FINS = 'eng.listening.following-instructions'
const FINS_SRC = 'docs/curriculum/blueprints/eng.listening.following-instructions.md'

const FINS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FINS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Acting on the first instruction before hearing the rest is like ' +
      'starting to dial a phone number after hearing only the first two ' +
      'digits — you are acting on incomplete information. A three-step ' +
      'instruction like "Open the drawer, take out the blue folder, and ' +
      'put it on the desk" needs to be heard in full before you begin any ' +
      'part of it. Listen to the entire instruction before beginning any ' +
      'action — hold all the steps in mind first, then execute them in the ' +
      'correct order.',
    targetedMisconceptions: [`${FINS}:MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH`],
    source: `${FINS_SRC} — MC-A (incomplete-phone-number anchor)`,
  },
  {
    conceptId: FINS,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.ELEMENTARY,
    content:
      'Assuming mention order always equals execution order is like ' +
      'assuming movie credits at the end tell you what happened first in ' +
      'the story. "Before you close the window, turn off the light" ' +
      'requires turning off the light FIRST, despite "close the window" ' +
      'being mentioned first — the word "before" reorders the steps. Listen ' +
      'for sequence markers like "before," "after," and "once you have" — ' +
      'these words tell you the TRUE order of execution, which can differ ' +
      'from the order the steps were spoken in.',
    targetedMisconceptions: [`${FINS}:MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED`],
    source: `${FINS_SRC} — MC-B (movie-credits-order anchor)`,
  },
  {
    conceptId: FINS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A complete multi-step instruction must be held in mind before any ' +
      'part of it is executed — acting on the first step heard risks ' +
      'missing subsequent steps entirely, the equivalent of dialing on ' +
      'incomplete information. Separately, execution order is not always ' +
      'identical to mention order: sequence markers such as "before," ' +
      '"after," and "once you have" can reorder steps relative to how they ' +
      'were spoken — "before you close the window, turn off the light" ' +
      'requires the second-mentioned action to occur first. Track these ' +
      'markers explicitly rather than defaulting to mention order.',
    targetedMisconceptions: [
      `${FINS}:MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH`,
      `${FINS}:MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED`,
    ],
    source: `${FINS_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const FINS_PROBES: SeedProbe[] = [
  {
    conceptId: FINS,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.ELEMENTARY,
    stem: 'Should you start acting the instant you hear the first step of a multi-step instruction?',
    choices: [
      { text: 'No — listen to the whole instruction first, then act, so you don\'t miss later steps', isCorrect: true },
      { text: 'Yes — acting immediately on the first instruction heard is the right approach', isCorrect: false, misconceptionId: `${FINS}:MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FINS}:MC-A-ACTING-IMMEDIATELY-ON-THE-FIRST-INSTRUCTION-HEARD-IS-THE-RIGHT-APPROACH`],
    source: `${FINS_SRC} — incomplete-phone-number conflict as probe`,
  },
  {
    conceptId: FINS,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.ELEMENTARY,
    stem: '"Before you close the window, turn off the light." Which action should happen first?',
    choices: [
      { text: 'Turn off the light — "before" reorders the steps despite mention order', isCorrect: true },
      { text: 'Close the window — it was mentioned first, so it happens first', isCorrect: false, misconceptionId: `${FINS}:MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED` },
    ],
    correctValue: 'turn off the light',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FINS}:MC-B-INSTRUCTIONS-ARE-ALWAYS-EXECUTED-IN-THE-SAME-ORDER-THEY-ARE-MENTIONED`],
    source: `${FINS_SRC} — movie-credits-order conflict as probe`,
  },
]

// ─── eng.listening.note-taking-while-listening ─────────────────────────────────
const NOTE = 'eng.listening.note-taking-while-listening'
const NOTE_SRC = 'docs/curriculum/blueprints/eng.listening.note-taking-while-listening.md'

const NOTE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NOTE,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Trying to write every word down while listening is like trying to ' +
      'catch every single drop from a fast-flowing faucet with your bare ' +
      'hands — you will miss others while your hands are still full. A ' +
      'student writing "the economy grew by three percent last year due to ' +
      'increased consumer spending" in full falls behind, while one writing ' +
      '"econ ↑3% ← consumer spend" captures the same key information fast ' +
      'enough to catch the next point. Use short phrases, abbreviations, ' +
      'and symbols instead of full sentences.',
    targetedMisconceptions: [`${NOTE}:MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD`],
    source: `${NOTE_SRC} — MC-A (faucet-and-cup anchor)`,
  },
  {
    conceptId: NOTE,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Writing down individual facts as they come up, with no attention to ' +
      'the speaker\'s own structural signal words ("first," "however," "the ' +
      'most important point is"), produces a flat, unordered list that is ' +
      'hard to use afterward because it does not reflect how the ideas ' +
      'actually related to each other. Capture those structural signal ' +
      'words as you take notes — they organize your notes to match how the ' +
      'speaker actually structured their ideas, not just a random sequence ' +
      'of facts.',
    targetedMisconceptions: [`${NOTE}:MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE`],
    source: `${NOTE_SRC} — MC-B (structural-signal-words conflict evidence)`,
  },
  {
    conceptId: NOTE,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Effective note-taking uses abbreviated forms — symbols, shortened ' +
      'phrases — rather than verbatim transcription, since attempting to ' +
      'capture every word causes a listener to fall behind and miss ' +
      'subsequent content while still writing the previous point. ' +
      'Separately, notes should reflect the speaker\'s own structural ' +
      'signal words (sequence markers, contrast markers, emphasis cues) ' +
      'rather than recording facts as an unordered list — capturing these ' +
      'signals as you write preserves the actual logical relationships ' +
      'between ideas, making the notes far more usable afterward.',
    targetedMisconceptions: [
      `${NOTE}:MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD`,
      `${NOTE}:MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE`,
    ],
    source: `${NOTE_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const NOTE_PROBES: SeedProbe[] = [
  {
    conceptId: NOTE,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'While listening, should you write "the economy grew by three percent last year due to increased consumer spending" in full, or "econ ↑3% ← consumer spend"?',
    choices: [
      { text: '"econ ↑3% ← consumer spend" — brief abbreviated notes keep you ready for the next point', isCorrect: true },
      { text: 'The full sentence — good notes mean writing down as much as possible word-for-word', isCorrect: false, misconceptionId: `${NOTE}:MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD` },
    ],
    correctValue: 'the abbreviated version',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NOTE}:MC-A-GOOD-NOTES-MEANS-WRITING-DOWN-AS-MUCH-AS-POSSIBLE-WORD-FOR-WORD`],
    source: `${NOTE_SRC} — faucet-and-cup conflict as probe`,
  },
  {
    conceptId: NOTE,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A speaker says "First... however... but the most important factor is...". Should your notes ignore these words and just list the facts, or capture them to show structure?',
    choices: [
      { text: 'Capture the structural signal words — they show how the ideas actually relate to each other', isCorrect: true },
      { text: 'Ignore them — note-taking is just writing down facts as they come up, with no structure needed', isCorrect: false, misconceptionId: `${NOTE}:MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE` },
    ],
    correctValue: 'capture the structural signal words',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NOTE}:MC-B-NOTE-TAKING-IS-JUST-WRITING-DOWN-RANDOM-FACTS-AS-THEY-COME-UP-WITH-NO-STRUCTURE`],
    source: `${NOTE_SRC} — structural-signal-words conflict as probe`,
  },
]

// ─── eng.listening.distinguishing-sounds-in-speech ─────────────────────────────
const DSND = 'eng.listening.distinguishing-sounds-in-speech'
const DSND_SRC = 'docs/curriculum/blueprints/eng.listening.distinguishing-sounds-in-speech.md'

const DSND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DSND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Relying entirely on context to distinguish similar sounds is like ' +
      'navigating only by asking other people for directions instead of ' +
      'ever learning to read a map — it works until you are in unfamiliar ' +
      'territory with no one to ask. "I saw the ship/sheep in the distance" ' +
      'said in a foggy harbor scene gives no context clue to tell the words ' +
      'apart. Train your ear to actually hear the specific phonetic ' +
      'contrast — a vowel length, a consonant sound — so you can ' +
      'distinguish the words even when context does not settle it.',
    targetedMisconceptions: [`${DSND}:MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT`],
    source: `${DSND_SRC} — MC-A (map-reading-vs-asking-for-directions anchor)`,
  },
  {
    conceptId: DSND,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Assuming isolated-word skill transfers automatically to connected ' +
      'speech is like assuming that identifying a single musical note ' +
      'played slowly means you can automatically pick out that same note ' +
      'within a fast, complex piece of music. "Ship" and "sheep" spoken ' +
      'carefully and separately sound clearly distinguishable, but the same ' +
      'words embedded in fast, natural speech can blur noticeably. Practice ' +
      'listening for the same contrast specifically within connected ' +
      'speech, not just in careful, isolated pronunciation.',
    targetedMisconceptions: [`${DSND}:MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH`],
    source: `${DSND_SRC} — MC-B (isolated-note-vs-fast-music anchor)`,
  },
  {
    conceptId: DSND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Distinguishing similar-sounding words by phonetic contrast alone — ' +
      'not context — is essential, since context is often genuinely ' +
      'ambiguous and provides no reliable fallback when it fails; the ear ' +
      'must be trained on the actual sound difference. Separately, ' +
      'contrasts clearly audible in careful, isolated pronunciation can ' +
      'blur or reduce substantially in fast, connected natural speech — ' +
      'isolated-word discrimination skill does not automatically transfer, ' +
      'and dedicated practice with connected-speech material is required ' +
      'to close that gap.',
    targetedMisconceptions: [
      `${DSND}:MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT`,
      `${DSND}:MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH`,
    ],
    source: `${DSND_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const DSND_PROBES: SeedProbe[] = [
  {
    conceptId: DSND,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: '"I saw the ship/sheep in the distance," said in a foggy harbor scene where either word could fit. Can context alone tell you which word was said?',
    choices: [
      { text: 'No — context is ambiguous here; you need to actually hear the phonetic contrast', isCorrect: true },
      { text: 'Yes — sentence context always lets you tell similar-sounding words apart', isCorrect: false, misconceptionId: `${DSND}:MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DSND}:MC-A-YOU-CAN-ALWAYS-TELL-SIMILAR-SOUNDING-WORDS-APART-JUST-BY-USING-SENTENCE-CONTEXT`],
    source: `${DSND_SRC} — map-reading-vs-asking-for-directions conflict as probe`,
  },
  {
    conceptId: DSND,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'You can clearly distinguish "ship" and "sheep" when each is said slowly and separately. Will you automatically distinguish them in fast, connected natural speech?',
    choices: [
      { text: 'No — connected speech can blur the contrast; this needs separate, dedicated practice', isCorrect: true },
      { text: 'Yes — if you can hear the difference in isolation, you can hear it in connected speech too', isCorrect: false, misconceptionId: `${DSND}:MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DSND}:MC-B-IF-YOU-CAN-DISTINGUISH-A-MINIMAL-PAIR-IN-CAREFUL-ISOLATED-SPEECH-YOULL-AUTOMATICALLY-DISTINGUISH-IT-IN-FAST-CONNECTED-SPEECH`],
    source: `${DSND_SRC} — isolated-note-vs-fast-music conflict as probe`,
  },
]

// ─── phys.mech.rolling-motion ───────────────────────────────────────────────
const ROLL = 'phys.mech.rolling-motion'
const ROLL_SRC = 'docs/curriculum/blueprints/phys.mech.rolling-motion.md'

const ROLL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ROLL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A tiny 1 kg sphere with radius 0.1 m and a massive 100 kg sphere ' +
      'with radius 2 m are released from the same 3 m height and roll ' +
      'down identical ramps without slipping — and they arrive at the ' +
      'bottom at EXACTLY the same speed, v = √(2gh/(1+β)) ≈ 6.55 m/s. ' +
      'Both mass and radius completely cancel out of the formula, leaving ' +
      'only β = I/(mR²), the shape factor that captures how the object’s ' +
      'mass is distributed relative to its rotation axis, and h, the ' +
      'drop height. A solid sphere (β = 2/5) always beats a solid ' +
      'cylinder (β = 1/2), which always beats a hollow sphere (β ≈ 2/3), ' +
      'which always beats a hollow cylinder (β = 1) down the SAME ramp — ' +
      'regardless of how big or heavy any of them are, because more mass ' +
      'concentrated far from the axis means more energy diverted into ' +
      'spinning instead of forward motion.',
    targetedMisconceptions: [`${ROLL}:MC-SAME-RACE`],
    source: `${ROLL_SRC} — Component 3 MC-SAME-RACE conflict_evidence [P28] (1 kg vs. 100 kg sphere, identical v_cm)`,
  },
  {
    conceptId: ROLL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A solid sphere rolling at v = 4 m/s might look like a simple ' +
      'translating object, tempting a KE calculation of just ' +
      '½mv² = ½×2×16 = 16 J — but that silently throws away real energy. ' +
      'The sphere is simultaneously SPINNING as it rolls, and that ' +
      'rotation carries its own genuine kinetic energy, ' +
      '½Iω² = ½×0.2×64 = 6.4 J for this example, bringing the TRUE total ' +
      'to 22.4 J, not 16 J. Rolling is never "the same as sliding" — every ' +
      'point of mass in a rolling object participates in the spin as well ' +
      'as the forward glide, so the complete energy budget is always ' +
      'KE_total = ½mv²_cm + ½Iω², with the rolling constraint v_cm = Rω ' +
      'connecting the two. Dropping the rotational term systematically ' +
      'under-predicts the true energy and produces the wrong final speed ' +
      'on any incline problem.',
    targetedMisconceptions: [`${ROLL}:MC-ROLLING-SAME-AS-SLIDING`],
    source: `${ROLL_SRC} — Component 3 MC-ROLLING-SAME-AS-SLIDING conflict_evidence [P28] (16 J vs. 22.4 J worked numbers)`,
  },
]

const ROLL_PROBES: SeedProbe[] = [
  {
    conceptId: ROLL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A solid sphere and a hollow cylinder of DIFFERENT mass and DIFFERENT radius are released from the same height on the same ramp, rolling without slipping. Which one reaches the bottom first?',
    choices: [
      { text: 'The solid sphere — always, regardless of mass or radius, because its smaller shape factor β = 2/5 beats the hollow cylinder’s β = 1', isCorrect: true },
      { text: 'Whichever one is heavier or has the larger radius', isCorrect: false, misconceptionId: `${ROLL}:MC-SAME-RACE` },
    ],
    correctValue: 'the solid sphere',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${ROLL}:MC-SAME-RACE`],
    source: `${ROLL_SRC} — MC-SAME-RACE trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: ROLL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A ball of mass m and radius R rolls without slipping at speed v. Is its total kinetic energy exactly ½mv²?',
    choices: [
      { text: 'No — the total is ½mv² + ½Iω², since the ball is spinning as well as translating', isCorrect: true },
      { text: 'Yes — ½mv² already accounts for all of the ball’s motion', isCorrect: false, misconceptionId: `${ROLL}:MC-ROLLING-SAME-AS-SLIDING` },
    ],
    correctValue: 'no, add rotational KE',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${ROLL}:MC-ROLLING-SAME-AS-SLIDING`],
    source: `${ROLL_SRC} — MC-ROLLING-SAME-AS-SLIDING trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.conservative-forces ──────────────────────────────────────────
const CONSV = 'phys.mech.conservative-forces'
const CONSV_SRC = 'docs/curriculum/blueprints/phys.mech.conservative-forces.md'

const CONSV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONSV,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A 1 kg block moves from a height of 2 m down to ground level by two ' +
      'completely different routes: a straight 2 m vertical drop, or a ' +
      '4 m frictionless ramp at 30°. Compute the work gravity does on ' +
      'each: the vertical drop gives W = mgh = 1×9.8×2 = 19.6 J; the ramp ' +
      'gives W = mg sinθ × d = 9.8×0.5×4 = 19.6 J — EXACTLY the same, ' +
      'despite the ramp path being twice as long. That is what makes ' +
      'gravity a CONSERVATIVE force: the work it does depends only on the ' +
      'start and end positions, never on the path length or shape taken ' +
      'between them. Gravity genuinely doesn’t care HOW you got to the ' +
      'ground, only where you started and ended — spring force and ' +
      'electric force share this property, while friction very much does ' +
      'not: a longer sliding path always means more friction work.',
    targetedMisconceptions: [`${CONSV}:MC-PATH-INDEPENDENCE-HARD`],
    source: `${CONSV_SRC} — Component 1 MC-PATH-INDEPENDENCE-HARD conflict_evidence [P28] (vertical drop vs. ramp, equal work)`,
  },
  {
    conceptId: CONSV,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Potential energy behaves like a rechargeable battery: push against ' +
      'gravity or a spring and you store energy that comes fully back out ' +
      'later as kinetic energy. It is tempting to imagine a "friction ' +
      'potential energy" working the same way — but try sliding a block ' +
      'along a rough floor and the floor merely warms up slightly; there ' +
      'is no way to "cool the floor" and recover that lost energy as ' +
      'motion again, which would violate the second law of ' +
      'thermodynamics. Potential energy only exists for CONSERVATIVE ' +
      'forces — ones with a genuine PE function satisfying F = −dU/dx, ' +
      'like gravity (U = mgh) or a spring (U = ½kx²). Friction has no ' +
      'such function; it is a one-way valve that converts mechanical ' +
      'energy irreversibly into heat, never storing it for later return.',
    targetedMisconceptions: [`${CONSV}:MC-FRICTION-HAS-PE`],
    source: `${CONSV_SRC} — Component 1 MC-FRICTION-HAS-PE conflict_evidence [P28] (floor-warming irreversibility, 2nd law)`,
  },
]

const CONSV_PROBES: SeedProbe[] = [
  {
    conceptId: CONSV,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A block moves from height 2 m to ground level via a vertical drop, then separately via a longer frictionless ramp. Does gravity do the same work in both cases?',
    choices: [
      { text: 'Yes — gravity is a conservative force, so its work depends only on the start and end heights, not the path', isCorrect: true },
      { text: 'No — the longer ramp path means gravity does more work', isCorrect: false, misconceptionId: `${CONSV}:MC-PATH-INDEPENDENCE-HARD` },
    ],
    correctValue: 'yes, same work',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CONSV}:MC-PATH-INDEPENDENCE-HARD`],
    source: `${CONSV_SRC} — MC-PATH-INDEPENDENCE-HARD trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: CONSV,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A block slides to a stop on a rough floor due to friction. Can the energy lost to friction be recovered later as kinetic energy, the way spring PE can?',
    choices: [
      { text: 'No — friction has no potential-energy function; it dissipates mechanical energy irreversibly as heat', isCorrect: true },
      { text: 'Yes — the energy is stored as "friction potential energy" and can be released again', isCorrect: false, misconceptionId: `${CONSV}:MC-FRICTION-HAS-PE` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CONSV}:MC-FRICTION-HAS-PE`],
    source: `${CONSV_SRC} — MC-FRICTION-HAS-PE trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.gravitational-field ──────────────────────────────────────────
const GFLD = 'phys.mech.gravitational-field'
const GFLD_SRC = 'docs/curriculum/blueprints/phys.mech.gravitational-field.md'

const GFLD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GFLD,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'If the gravitational field simply WERE the force, then the field ' +
      'near Earth would be 500 N for a 50 kg person standing there and a ' +
      'completely different 1000 N for a 100 kg person standing at the ' +
      'exact same spot — two different "fields" at one location, which is ' +
      'nonsensical for something meant to describe the space itself. What ' +
      'we actually measure at Earth’s surface is g = 9.8 m/s² for ' +
      'EVERYONE, regardless of their mass. The field is defined as force ' +
      'PER UNIT MASS, g = F/m (N/kg), precisely so the mass of whatever ' +
      'test object you place there cancels out, leaving a quantity that ' +
      'genuinely describes the space at that point rather than the probe ' +
      'sitting in it — g = GM/r², the same value no matter what you put ' +
      'there.',
    targetedMisconceptions: [`${GFLD}:MC-FIELD-IS-FORCE`],
    source: `${GFLD_SRC} — Component 1 MC-FIELD-IS-FORCE conflict_evidence [P28] (50 kg vs. 100 kg person, same g)`,
  },
  {
    conceptId: GFLD,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Textbook diagrams often draw gravitational field lines stopping ' +
      'right at Earth’s surface, which makes it easy to assume the field ' +
      '"only exists at ground level" — but that’s purely a drawing ' +
      'limitation, not physics. At the International Space Station’s ' +
      'altitude of 400 km, r ≈ 6770 km from Earth’s centre, and ' +
      'g = GM/r² ≈ 8.67 m/s² — still a hefty 88% of the surface value, ' +
      'which is exactly why astronauts in orbit are weightless from ' +
      'FALLING, not from escaping gravity entirely. The inverse-square ' +
      'law g = GM/r² applies at every r outside Earth without any cutoff ' +
      '— the field extends through all of space, simply growing weaker ' +
      'and weaker (never vanishing) as r increases, all the way to ' +
      'infinity.',
    targetedMisconceptions: [`${GFLD}:MC-FIELD-STOPS-AT-SURFACE`],
    source: `${GFLD_SRC} — Component 1 MC-FIELD-STOPS-AT-SURFACE conflict_evidence [P28] (ISS altitude, g still 88% of surface value)`,
  },
]

const GFLD_PROBES: SeedProbe[] = [
  {
    conceptId: GFLD,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A 50 kg person and a 100 kg person both stand at Earth’s surface. Is the gravitational field strength g the same for both of them?',
    choices: [
      { text: 'Yes — g = F/m is a property of the location (space), the same 9.8 m/s² for any mass placed there', isCorrect: true },
      { text: 'No — the heavier person experiences a stronger field, since more mass means more force', isCorrect: false, misconceptionId: `${GFLD}:MC-FIELD-IS-FORCE` },
    ],
    correctValue: 'yes, same g',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GFLD}:MC-FIELD-IS-FORCE`],
    source: `${GFLD_SRC} — MC-FIELD-IS-FORCE trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: GFLD,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'The International Space Station orbits at about 400 km altitude. Is Earth’s gravitational field essentially zero there?',
    choices: [
      { text: 'No — g at that altitude is still about 88% of its surface value; the field extends through all space, weakening as 1/r² but never stopping', isCorrect: true },
      { text: 'Yes — the gravitational field only exists near Earth’s surface', isCorrect: false, misconceptionId: `${GFLD}:MC-FIELD-STOPS-AT-SURFACE` },
    ],
    correctValue: 'no, still substantial',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GFLD}:MC-FIELD-STOPS-AT-SURFACE`],
    source: `${GFLD_SRC} — MC-FIELD-STOPS-AT-SURFACE trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.gravitational-potential ──────────────────────────────────────
const GPOT = 'phys.mech.gravitational-potential'
const GPOT_SRC = 'docs/curriculum/blueprints/phys.mech.gravitational-potential.md'

const GPOT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GPOT,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'U = mgh works beautifully for a book lifted 1.5 m off a table, but ' +
      'try applying it to a satellite at r = 3R_Earth and it gives a ' +
      'wildly wrong answer — around 1.25×10⁸m joules, not even the right ' +
      'SIGN compared to the correct U = −GMm/r ≈ −3.1×10⁷m joules. The ' +
      'reason: U = mgh secretly assumes gravity’s strength g stays ' +
      'perfectly constant, which is only true very close to Earth’s ' +
      'surface (h ≪ R_Earth ≈ 6370 km) — at r = 2R_Earth, g has already ' +
      'dropped to a quarter of its surface value, so treating it as ' +
      'constant breaks down completely. The universal formula ' +
      'U = −GMm/r, with its reference point at infinity, is valid ' +
      'EVERYWHERE and simplifies back down to the familiar U ≈ mgh (plus ' +
      'a constant) only in the special near-surface case — never the ' +
      'other way around.',
    targetedMisconceptions: [`${GPOT}:MC-MGHZERO`],
    source: `${GPOT_SRC} — Component 1 MC-MGHZERO conflict_evidence [P28] (mgh vs. −GMm/r at r=3R_Earth, wrong sign)`,
  },
  {
    conceptId: GPOT,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Seeing U = −GMm/r come out NEGATIVE feels wrong at first — how can ' +
      'energy be less than zero? The key is where the reference point ' +
      'sits: U = 0 is defined at r = infinity, not at Earth’s surface. ' +
      'Picture Earth’s gravity as digging a deep well below that zero ' +
      'line: as an object falls closer to Earth (r decreases), gravity ' +
      'does positive work on it, so the SYSTEM must lose potential ' +
      'energy — dropping further and further below zero, all the way to ' +
      'roughly −62.5 MJ per kilogram at the surface. An object with total ' +
      'energy below zero is gravitationally trapped in that well; only an ' +
      'object with total energy at or above zero has enough to climb all ' +
      'the way back out to U = 0 at infinity and genuinely escape.',
    targetedMisconceptions: [`${GPOT}:MC-POSITIVE-POTENTIAL`],
    source: `${GPOT_SRC} — Component 1 MC-POSITIVE-POTENTIAL conflict_evidence [P28] (potential-well framing, reference at infinity)`,
  },
]

const GPOT_PROBES: SeedProbe[] = [
  {
    conceptId: GPOT,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A satellite orbits at r = 3R_Earth from Earth’s centre. Should you use U = mgh or U = −GMm/r to find its gravitational potential energy?',
    choices: [
      { text: 'U = −GMm/r — the exact formula, valid everywhere; U = mgh only works when h is small compared to Earth’s radius', isCorrect: true },
      { text: 'U = mgh — it works for any height above Earth’s surface', isCorrect: false, misconceptionId: `${GPOT}:MC-MGHZERO` },
    ],
    correctValue: 'U = -GMm/r',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GPOT}:MC-MGHZERO`],
    source: `${GPOT_SRC} — MC-MGHZERO trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: GPOT,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is gravitational potential energy U = −GMm/r always negative (for r > 0)?',
    choices: [
      { text: 'Because the reference point U = 0 is defined at r = infinity, and any finite r is "below" that reference — deeper in the gravitational well', isCorrect: true },
      { text: 'It is a mistake in the formula — potential energy should always be positive', isCorrect: false, misconceptionId: `${GPOT}:MC-POSITIVE-POTENTIAL` },
    ],
    correctValue: 'reference at infinity',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GPOT}:MC-POSITIVE-POTENTIAL`],
    source: `${GPOT_SRC} — MC-POSITIVE-POTENTIAL trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.escape-velocity ──────────────────────────────────────────────
const ESCV = 'phys.mech.escape-velocity'
const ESCV_SRC = 'docs/curriculum/blueprints/phys.mech.escape-velocity.md'

const ESCV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ESCV,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Escape velocity is often pictured as something only a powered ' +
      'rocket with its engines running can achieve — but it is really a ' +
      'purely ENERGETIC condition, nothing to do with continuous thrust. ' +
      'A baseball thrown at exactly 11.2 km/s from Earth’s surface would ' +
      'escape Earth’s gravity completely with its "engines" (a hand) off ' +
      'the instant it leaves your fingers, coasting all the way to ' +
      'infinity on kinetic energy alone (ignoring air resistance). The ' +
      'condition is simply: does the launch kinetic energy meet or exceed ' +
      'the depth of the gravitational potential well, KE ≥ |U|? If so, ' +
      'total energy E ≥ 0 and the object is free forever, no further ' +
      'propulsion required — v_e = √(2GM/r) is precisely the speed at ' +
      'which that energy threshold is exactly met.',
    targetedMisconceptions: [`${ESCV}:MC-ESCAPE-REQUIRES-THRUST`],
    source: `${ESCV_SRC} — Component 1 MC-ESCAPE-REQUIRES-THRUST conflict_evidence [P28] (baseball at 11.2 km/s, energy condition)`,
  },
  {
    conceptId: ESCV,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'It seems reasonable that a heavier object should need a higher ' +
      'speed to escape a planet’s gravity — but write out the energy ' +
      'balance and the object’s own mass cancels completely: ' +
      '½mv_e² = GMm/r gives v_e² = 2GM/r, with no m left anywhere. A 1 kg ' +
      'ball and a 1000 kg rocket launched from the exact same point in ' +
      'the exact same gravitational field share the IDENTICAL escape ' +
      'speed, roughly 11.2 km/s from Earth’s surface for both — though ' +
      'the rocket obviously needs a thousand times more total ENERGY to ' +
      'reach that same speed, since E = ½mv_e² still scales with mass ' +
      'even though v_e itself does not. This mirrors Galileo’s famous ' +
      'free-fall result that all objects accelerate at the same g ' +
      'regardless of mass — escape velocity is essentially free-fall from ' +
      'infinity run in reverse, and mass cancels there for exactly the ' +
      'same underlying reason.',
    targetedMisconceptions: [`${ESCV}:MC-ESCAPE-DEPENDS-ON-MASS`],
    source: `${ESCV_SRC} — Component 1 MC-ESCAPE-DEPENDS-ON-MASS conflict_evidence [P28] (mass cancellation, Galileo free-fall analogy)`,
  },
]

const ESCV_PROBES: SeedProbe[] = [
  {
    conceptId: ESCV,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A baseball is thrown from Earth’s surface at exactly escape velocity, then the thrower lets go. Does the baseball need continued propulsion to escape Earth’s gravity?',
    choices: [
      { text: 'No — escape velocity is defined as the speed needed to escape with no further propulsion; the ball coasts to infinity on its initial kinetic energy alone', isCorrect: true },
      { text: 'Yes — only a rocket with continuously firing engines can actually escape Earth’s gravity', isCorrect: false, misconceptionId: `${ESCV}:MC-ESCAPE-REQUIRES-THRUST` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ESCV}:MC-ESCAPE-REQUIRES-THRUST`],
    source: `${ESCV_SRC} — MC-ESCAPE-REQUIRES-THRUST trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: ESCV,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A 1 kg probe and a 10 000 kg spacecraft are both launched from Earth’s surface. Do they need the same escape velocity?',
    choices: [
      { text: 'Yes — v_e = √(2GM/r) does not depend on the escaping object’s mass, though the spacecraft needs far more total energy to reach that speed', isCorrect: true },
      { text: 'No — the much heavier spacecraft needs a higher escape velocity', isCorrect: false, misconceptionId: `${ESCV}:MC-ESCAPE-DEPENDS-ON-MASS` },
    ],
    correctValue: 'yes, same v_e',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${ESCV}:MC-ESCAPE-DEPENDS-ON-MASS`],
    source: `${ESCV_SRC} — MC-ESCAPE-DEPENDS-ON-MASS trigger case as probe, distractor-mapped`,
  },
]

// ─── phys.mech.keplers-laws ──────────────────────────────────────────────────
const KEPL = 'phys.mech.keplers-laws'
const KEPL_SRC = 'docs/curriculum/blueprints/phys.mech.keplers-laws.md'

const KEPL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KEPL,
    subjectSlug: 'physics',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Textbook diagrams almost always draw planetary orbits as neat ' +
      'circles with the Sun sitting at the centre — but Kepler’s First ' +
      'Law says every orbit is actually an ELLIPSE with the Sun at one ' +
      'FOCUS, never the centre. Earth’s orbit has eccentricity e ≈ 0.017, ' +
      'nearly circular but measurably not; Mars’s is more elongated at ' +
      'e ≈ 0.093; Pluto’s reaches e ≈ 0.248, a clearly stretched ellipse. ' +
      'A circle is simply the special case where eccentricity e = 0 and ' +
      'the two foci happen to collapse onto the same central point — the ' +
      'circular orbits taught earlier are a convenient approximation, ' +
      'while Kepler’s actual law (derived from Tycho Brahe’s real ' +
      'observational data, before Newton ever wrote F = GMm/r²) covers ' +
      'the full range from perfect circles to highly stretched ellipses, ' +
      'always with the Sun at one focus and the second focus sitting ' +
      'empty.',
    targetedMisconceptions: [`${KEPL}:MC-KEPLER-CIRCULAR`],
    source: `${KEPL_SRC} — Component 1 MC-KEPLER-CIRCULAR conflict_evidence [P28] (Earth/Mars/Pluto eccentricities)`,
  },
  {
    conceptId: KEPL,
    subjectSlug: 'physics',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Equal areas in equal times" sounds like it should mean a planet ' +
      'covers equal DISTANCES in equal times — but it means something ' +
      'quite different, and the two are easy to conflate. Near perihelion ' +
      '(closest approach to the Sun), a planet moves fast and sweeps out ' +
      'a wide but SHORT sector; near aphelion (farthest point), it moves ' +
      'slowly and sweeps a narrow but LONG sector — both sectors having ' +
      'the identical AREA, but very different arc lengths. That directly ' +
      'implies the planet’s SPEED varies around its orbit: for Earth, ' +
      'roughly 30.3 km/s at perihelion versus 29.3 km/s at aphelion — a ' +
      'small but measurable and real difference. The underlying cause is ' +
      'conservation of angular momentum, r×v_⊥ = constant: as the ' +
      'distance r from the Sun shrinks near perihelion, the tangential ' +
      'speed v_⊥ must grow to compensate, and equal-areas-in-equal-times ' +
      'is exactly the geometric fingerprint of that conservation law.',
    targetedMisconceptions: [`${KEPL}:MC-SPEED-CONSTANT-ELLIPSE`],
    source: `${KEPL_SRC} — Component 1 MC-SPEED-CONSTANT-ELLIPSE conflict_evidence [P28] (Earth perihelion/aphelion speed, angular momentum)`,
  },
]

const KEPL_PROBES: SeedProbe[] = [
  {
    conceptId: KEPL,
    subjectSlug: 'physics',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'According to Kepler’s First Law, where is the Sun located relative to a planet’s elliptical orbit?',
    choices: [
      { text: 'At one focus of the ellipse (the other focus is empty) — never at the centre, except in the special circular case', isCorrect: true },
      { text: 'At the exact centre of the ellipse, for every planet', isCorrect: false, misconceptionId: `${KEPL}:MC-KEPLER-CIRCULAR` },
    ],
    correctValue: 'at one focus',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${KEPL}:MC-KEPLER-CIRCULAR`],
    source: `${KEPL_SRC} — MC-KEPLER-CIRCULAR trigger case as probe, distractor-mapped`,
  },
  {
    conceptId: KEPL,
    subjectSlug: 'physics',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Kepler’s Second Law says a planet sweeps out equal areas in equal times. Does this mean the planet moves at constant speed throughout its elliptical orbit?',
    choices: [
      { text: 'No — the planet moves fastest at perihelion (closest to the Sun) and slowest at aphelion (farthest); only equal AREAS, not equal distances, are swept in equal times', isCorrect: true },
      { text: 'Yes — equal areas in equal times means the planet travels at constant speed', isCorrect: false, misconceptionId: `${KEPL}:MC-SPEED-CONSTANT-ELLIPSE` },
    ],
    correctValue: 'no, speed varies',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${KEPL}:MC-SPEED-CONSTANT-ELLIPSE`],
    source: `${KEPL_SRC} — MC-SPEED-CONSTANT-ELLIPSE trigger case as probe, distractor-mapped`,
  },
]

// ─── eng.listening.listening-comprehension-strategies ──────────────────────────
const LCST = 'eng.listening.listening-comprehension-strategies'
const LCST_SRC = 'docs/curriculum/blueprints/eng.listening.listening-comprehension-strategies.md'

const LCST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LCST,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Expecting to understand every single word perfectly the first time ' +
      'is like expecting to see every star clearly on a slightly hazy ' +
      'night — a skilled stargazer keeps observing, and the picture often ' +
      'becomes clearer as more comes into view. A listener who freezes on ' +
      'one unfamiliar word misses the next several sentences, while one who ' +
      'makes a quick contextual guess and keeps listening usually ' +
      'understands more of the passage overall. When you hit an unfamiliar ' +
      'word, do not stop and panic — make a quick, reasonable guess and ' +
      'KEEP LISTENING.',
    targetedMisconceptions: [`${LCST}:MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME`],
    source: `${LCST_SRC} — MC-A (hazy-night-stargazer anchor)`,
  },
  {
    conceptId: LCST,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Predicting what a speaker will say next is not wild guessing, and ' +
      'it is also not something to skip entirely by treating each moment as ' +
      'unconnected to what came before. A genuine prediction is a flexible, ' +
      'revisable hypothesis grounded in the clues already given — when the ' +
      'actual content differs from your prediction, that is a normal signal ' +
      'to update your expectation, not a sign you failed. Treat predictions ' +
      'as working guesses to revise, not fixed assumptions to defend.',
    targetedMisconceptions: [`${LCST}:MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT`],
    source: `${LCST_SRC} — MC-B (revisable-hypothesis conflict evidence)`,
  },
  {
    conceptId: LCST,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Skilled listening tolerates momentary gaps: freezing on one ' +
      'unfamiliar word and losing track of subsequent content produces ' +
      'worse overall comprehension than making a quick contextual guess and ' +
      'continuing — later content frequently resolves the initial ' +
      'ambiguity. Separately, predicting upcoming content is a legitimate ' +
      'comprehension strategy grounded in available clues, functioning as a ' +
      'revisable hypothesis rather than either a random guess or a fixed ' +
      'commitment — when actual content diverges from a prediction, revise ' +
      'the prediction rather than treating the divergence as failure.',
    targetedMisconceptions: [
      `${LCST}:MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME`,
      `${LCST}:MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT`,
    ],
    source: `${LCST_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const LCST_PROBES: SeedProbe[] = [
  {
    conceptId: LCST,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A listener hears an unfamiliar word and freezes, missing the next three sentences while stuck on it. Was this the better strategy compared to guessing from context and continuing?',
    choices: [
      { text: 'No — making a quick contextual guess and continuing to listen usually leads to better overall understanding', isCorrect: true },
      { text: 'Yes — good listeners must understand every word perfectly the first time', isCorrect: false, misconceptionId: `${LCST}:MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LCST}:MC-A-GOOD-LISTENERS-UNDERSTAND-EVERY-WORD-PERFECTLY-THE-FIRST-TIME`],
    source: `${LCST_SRC} — hazy-night-stargazer conflict as probe`,
  },
  {
    conceptId: LCST,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A listener predicted what a speaker would say next, but the actual content turned out differently. Does this mean the listener failed?',
    choices: [
      { text: 'No — a prediction is a revisable hypothesis; update it when new information contradicts it', isCorrect: true },
      { text: 'Yes — predicting what comes next means you must guess randomly or assume you\'re always right', isCorrect: false, misconceptionId: `${LCST}:MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${LCST}:MC-B-PREDICTING-WHAT-COMES-NEXT-MEANS-GUESSING-RANDOMLY-OR-JUST-ASSUMING-YOURE-RIGHT`],
    source: `${LCST_SRC} — revisable-hypothesis conflict as probe`,
  },
]

// ─── eng.listening.critical-listening ──────────────────────────────────────
const CRLIS = 'eng.listening.critical-listening'
const CRLIS_SRC = 'docs/curriculum/blueprints/eng.listening.critical-listening.md'

const CRLIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CRLIS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Judging an argument by how confidently it is delivered is like ' +
      'judging a bridge’s safety by how shiny its paint job is — the ' +
      'paint tells you nothing about whether the structure underneath can ' +
      'hold weight. A confident, fluent delivery can wrap around a weak, ' +
      'unsupported argument, and a hesitant delivery can carry a ' +
      'well-supported one. Evaluate the structure (the evidence and ' +
      'reasoning), not the paint (the delivery): ask what evidence is ' +
      'actually being offered and whether the reasoning connects that ' +
      'evidence to the conclusion.',
    targetedMisconceptions: [`${CRLIS}:MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT`],
    source: `${CRLIS_SRC} — MC-A (shiny-paint-bridge anchor)`,
  },
  {
    conceptId: CRLIS,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Treating any mentioned evidence as equally strong is like treating ' +
      'a single handwritten note and an official notarized document as ' +
      'equally valid proof of the same claim — both are technically ' +
      '"evidence," but they carry very different weight. A single ' +
      'anecdote from one person is far weaker evidence than a documented, ' +
      'credible, relevant source. When a speaker cites evidence, do not ' +
      'just note that evidence was mentioned — ask how credible the ' +
      'source is and whether it is actually relevant to the specific ' +
      'claim being made.',
    targetedMisconceptions: [`${CRLIS}:MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL`],
    source: `${CRLIS_SRC} — MC-B (notarized-document-vs-handwritten-note anchor)`,
  },
  {
    conceptId: CRLIS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A speaker’s confidence and fluency say nothing about whether ' +
      'their argument is actually well-supported — a polished delivery ' +
      'can carry a weak, unsupported claim, and a hesitant delivery can ' +
      'carry a rigorously supported one. Evaluate the underlying evidence ' +
      'and reasoning, not the presentation. Separately, not all cited ' +
      '"evidence" carries equal weight: a single personal anecdote is far ' +
      'weaker support than a documented, credible, relevant source. When ' +
      'assessing a spoken argument, check the source’s credibility and ' +
      'its relevance to the specific claim being made, rather than simply ' +
      'noting that something was cited.',
    targetedMisconceptions: [
      `${CRLIS}:MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT`,
      `${CRLIS}:MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL`,
    ],
    source: `${CRLIS_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CRLIS_PROBES: SeedProbe[] = [
  {
    conceptId: CRLIS,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Speaker A delivers an argument confidently and fluently but rests it on a single unsupported personal anecdote. Speaker B delivers a similar argument hesitantly but cites a specific named study. Whose argument is actually better supported?',
    choices: [
      { text: 'Speaker B — evaluate the evidence and reasoning, not how confidently it was delivered', isCorrect: true },
      { text: 'Speaker A — the confident, fluent delivery makes the stronger argument', isCorrect: false, misconceptionId: `${CRLIS}:MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT` },
    ],
    correctValue: 'Speaker B',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CRLIS}:MC-A-A-CONFIDENT-FLUENT-SPEAKER-IS-MAKING-A-STRONGER-ARGUMENT`],
    source: `${CRLIS_SRC} — shiny-paint-bridge conflict as probe`,
  },
  {
    conceptId: CRLIS,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A speaker says "my neighbor told me this happened to them" to support a broad claim. Another speaker cites a peer-reviewed study of 500 participants to support a similar claim. Are these two pieces of evidence equally strong?',
    choices: [
      { text: 'No — a single anecdote is far weaker evidence than a documented, credible study; evaluate the source’s credibility, not just whether something was cited', isCorrect: true },
      { text: 'Yes — both speakers cited evidence, so both claims are equally supported', isCorrect: false, misconceptionId: `${CRLIS}:MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CRLIS}:MC-B-ANY-EVIDENCE-A-SPEAKER-MENTIONS-PROVES-THEIR-POINT-EQUALLY-WELL`],
    source: `${CRLIS_SRC} — notarized-document-vs-handwritten-note conflict as probe`,
  },
]

// ─── eng.grammar.pronouns ───────────────────────────────────────────────────
const PRON = 'eng.grammar.pronouns'
const PRON_SRC = 'docs/curriculum/blueprints/eng.grammar.pronouns.md'

const PRON_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PRON,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Pronouns substitute for ANY noun — people (he, she, they), things ' +
      '(it), places, ideas, or groups (they, these, those) — not just ' +
      'people. In "I bought a book. IT was expensive," "it" replaces ' +
      '"book," not a person. "It" is one of the most frequently used ' +
      'pronouns and almost always refers to non-human things, places, or ' +
      'ideas. Check what noun a pronoun is replacing — it could be a ' +
      'person, but just as often a thing, place, or idea.',
    targetedMisconceptions: [`${PRON}:MC-PRONOUNS-ONLY-REPLACE-PEOPLE`],
    source: `${PRON_SRC} — MC-PRONOUNS-ONLY-REPLACE-PEOPLE (P28 book/it conflict + P33 discrimination pairs)`,
  },
  {
    conceptId: PRON,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Reflexive pronouns (myself, yourself, himself, herself, itself, ' +
      'ourselves, themselves) are correct specifically when the subject ' +
      'performing the action and the object receiving the action are the ' +
      'SAME entity ("I hurt myself") or for emphasis directly after the ' +
      'noun/pronoun they intensify ("I myself saw it"). They are NOT ' +
      'simply more formal or emphatic substitutes for regular object ' +
      'pronouns (me, you, him, her) in general — "Give the book to me" is ' +
      'correct; "Give the book to myself" is not, unless "myself" is the ' +
      'one giving it to themselves. Use a reflexive pronoun only when the ' +
      'subject and object refer to the same entity, or for direct ' +
      'emphasis — otherwise use the regular object pronoun.',
    targetedMisconceptions: [`${PRON}:MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS`],
    source: `${PRON_SRC} — MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS (P28 giving-to-myself conflict + P30 same-entity bridge)`,
  },
  {
    conceptId: PRON,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Pronouns substitute for any noun, not just people — things, ' +
      'places, ideas, and groups all take pronouns ("it," "they," ' +
      '"these") just as readily as personal pronouns do. Separately, ' +
      'reflexive pronouns (myself, yourself, himself...) are grammatically ' +
      'correct only when the subject and object of the action are the ' +
      'same entity ("I hurt myself"), or for direct emphasis ("I myself ' +
      'saw it") — they are not a more formal or polite substitute for a ' +
      'regular object pronoun. "Please send the report to myself" is ' +
      'incorrect; it should be "to me," since the sender and the intended ' +
      'recipient are different entities.',
    targetedMisconceptions: [
      `${PRON}:MC-PRONOUNS-ONLY-REPLACE-PEOPLE`,
      `${PRON}:MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS`,
    ],
    source: `${PRON_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const PRON_PROBES: SeedProbe[] = [
  {
    conceptId: PRON,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "I bought a book. IT was expensive," what does "it" replace?',
    choices: [
      { text: '"Book" — a thing, not a person', isCorrect: true },
      { text: 'Nothing — "it" only replaces people, and "book" is not a person, so this must be a different kind of word', isCorrect: false, misconceptionId: `${PRON}:MC-PRONOUNS-ONLY-REPLACE-PEOPLE` },
    ],
    correctValue: 'book',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${PRON}:MC-PRONOUNS-ONLY-REPLACE-PEOPLE`],
    source: `${PRON_SRC} — book/it conflict as probe, distractor-mapped`,
  },
  {
    conceptId: PRON,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "Please give the form to myself" correct?',
    choices: [
      { text: 'No — the giver and receiver are different people here, so it should be "to me"; reflexive pronouns require the subject and object to be the same entity', isCorrect: true },
      { text: 'Yes — "myself" is just a more formal, polite way of saying "me"', isCorrect: false, misconceptionId: `${PRON}:MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS` },
    ],
    correctValue: 'no, should be "to me"',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PRON}:MC-REFLEXIVE-PRONOUNS-ARE-JUST-EMPHASIS`],
    source: `${PRON_SRC} — give-the-book-to-myself conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.sentence-types-by-function ─────────────────────────────────
const STYP = 'eng.grammar.sentence-types-by-function'
const STYP_SRC = 'docs/curriculum/blueprints/eng.grammar.sentence-types-by-function.md'

const STYP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STYP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Sentence type is defined by grammatical FUNCTION — declarative ' +
      '(states a fact), interrogative (asks a question), imperative ' +
      '(gives a command, often with an implied "you" subject), and ' +
      'exclamatory (expresses strong emotion) — not simply by which ' +
      'punctuation mark appears at the end. "Stop!" is a command ' +
      '(imperative) because of what it DOES, not because of the ' +
      'exclamation point; "Stop." is still a command, just punctuated ' +
      'less emphatically — same function, different punctuation. ' +
      'Determine sentence type by structure and purpose first, then ' +
      'treat punctuation as a supporting signal, not the sole test.',
    targetedMisconceptions: [`${STYP}:MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE`],
    source: `${STYP_SRC} — MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE (P28 Stop!/Stop. conflict)`,
  },
  {
    conceptId: STYP,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Interrogative sentences (questions) can be formed in TWO main ways: ' +
      'with a wh-word at the start ("What is your name?") OR by inverting ' +
      'the subject and auxiliary/helping verb with no question word at ' +
      'all ("Are you ready?" "Did she call?" "Can he swim?") — both are ' +
      'genuine, equally common question structures. Recognize a sentence ' +
      'as interrogative if it either starts with a wh-word OR inverts the ' +
      'subject and auxiliary verb, not just the wh-word pattern alone.',
    targetedMisconceptions: [`${STYP}:MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD`],
    source: `${STYP_SRC} — MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD (P28 Are-you-coming conflict)`,
  },
  {
    conceptId: STYP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Sentence type (declarative, interrogative, imperative, ' +
      'exclamatory) is defined by grammatical function and communicative ' +
      'purpose, not by the ending punctuation mark — "Stop." and "Stop!" ' +
      'are both imperative (commands); only the emphasis differs. ' +
      'Separately, interrogative sentences take two structurally distinct ' +
      'forms: wh-word questions ("What is your name?") and subject-' +
      'auxiliary inversion questions with no question word at all ("Are ' +
      'you ready?" "Did she call?") — both are equally legitimate ' +
      'question structures, and inversion-only questions should not be ' +
      'overlooked just because they lack an obvious wh-word signal.',
    targetedMisconceptions: [
      `${STYP}:MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE`,
      `${STYP}:MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD`,
    ],
    source: `${STYP_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const STYP_PROBES: SeedProbe[] = [
  {
    conceptId: STYP,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "Please sit down." a command, even though it ends in a period rather than an exclamation point?',
    choices: [
      { text: 'Yes — it is imperative (a command/request), regardless of the period ending', isCorrect: true },
      { text: 'No — without an exclamation point, it cannot be a command', isCorrect: false, misconceptionId: `${STYP}:MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE` },
    ],
    correctValue: 'yes, imperative',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STYP}:MC-PUNCTUATION-MARK-ALONE-DEFINES-SENTENCE-TYPE`],
    source: `${STYP_SRC} — please-sit-down conflict as probe, distractor-mapped`,
  },
  {
    conceptId: STYP,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "Have you finished?" interrogative, even though it does not start with a wh-word like "who" or "what"?',
    choices: [
      { text: 'Yes — it is interrogative via subject-auxiliary inversion, a valid question structure with no question word needed', isCorrect: true },
      { text: 'No — questions must start with a question word to count as interrogative', isCorrect: false, misconceptionId: `${STYP}:MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD` },
    ],
    correctValue: 'yes, interrogative',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STYP}:MC-QUESTIONS-ALWAYS-START-WITH-A-QUESTION-WORD`],
    source: `${STYP_SRC} — have-you-finished conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.phrases ─────────────────────────────────────────────────────
const PHR = 'eng.grammar.phrases'
const PHR_SRC = 'docs/curriculum/blueprints/eng.grammar.phrases.md'

const PHR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A grammatical phrase is a group of related words that function ' +
      'TOGETHER as a single unit (acting as a noun, verb, adjective, or ' +
      'adverb within the sentence), built around a HEAD word that the ' +
      'rest of the phrase modifies or complements — not just any ' +
      'consecutive string of words. "The dog" is a noun phrase (head: ' +
      'dog); "barked loudly" is a verb phrase (head: barked); but a ' +
      'random scrambled sequence like "dog the barked at" is not a ' +
      'phrase at all, since it does not function as one unified unit. ' +
      'Check whether a word group functions as one unified grammatical ' +
      'unit built around a head word — not just whether the words happen ' +
      'to sit next to each other.',
    targetedMisconceptions: [`${PHR}:MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS`],
    source: `${PHR_SRC} — MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS (P28 scrambled-sequence conflict)`,
  },
  {
    conceptId: PHR,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Phrases are word groups WITHOUT a subject-verb pair, functioning ' +
      'as a single grammatical unit ("in the morning" — a prepositional ' +
      'phrase, no subject or verb). Clauses are word groups WITH a ' +
      'subject-verb pair ("when the sun rises" — "sun" is the subject, ' +
      '"rises" is the verb), capable of forming at least a partial ' +
      'proposition. This subject-verb presence/absence is THE defining ' +
      'structural difference between the two categories — check for the ' +
      'presence of a subject-verb pair as the defining test.',
    targetedMisconceptions: [`${PHR}:MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING`],
    source: `${PHR_SRC} — MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING (P28 in-the-morning-vs-when-the-sun-rises conflict)`,
  },
  {
    conceptId: PHR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A grammatical phrase is a word group that functions as a single ' +
      'unit built around a head word ("the tall building" — head: ' +
      'building) — not simply any consecutive string of words; an ' +
      'arbitrary scrambled sequence with no unifying head and function is ' +
      'not a phrase. Separately, phrases and clauses are distinguished by ' +
      'one defining structural test: the presence or absence of a ' +
      'subject-verb pair. "In the morning" is a phrase (no subject-verb ' +
      'pair); "when the sun rises" is a clause ("sun" + "rises" is a ' +
      'subject-verb pair). Apply this test explicitly rather than treating ' +
      'phrases and clauses as interchangeable "smaller than a sentence" ' +
      'groupings.',
    targetedMisconceptions: [
      `${PHR}:MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS`,
      `${PHR}:MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING`,
    ],
    source: `${PHR_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const PHR_PROBES: SeedProbe[] = [
  {
    conceptId: PHR,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "dog the barked at" (a scrambled string from "The dog barked at the mailman") a genuine grammatical phrase?',
    choices: [
      { text: 'No — it does not function as one unified unit around a head word, unlike "the dog" or "barked at"', isCorrect: true },
      { text: 'Yes — any group of consecutive words from a sentence counts as a phrase', isCorrect: false, misconceptionId: `${PHR}:MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PHR}:MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS`],
    source: `${PHR_SRC} — scrambled-sequence conflict as probe, distractor-mapped`,
  },
  {
    conceptId: PHR,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "in the morning" a phrase or a clause?',
    choices: [
      { text: 'A phrase — it has no subject-verb pair', isCorrect: true },
      { text: 'A clause — phrases and clauses are really the same thing', isCorrect: false, misconceptionId: `${PHR}:MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING` },
    ],
    correctValue: 'phrase',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PHR}:MC-PHRASES-AND-CLAUSES-ARE-THE-SAME-THING`],
    source: `${PHR_SRC} — in-the-morning-vs-when-the-sun-rises conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.tense-consistency ──────────────────────────────────────────
const TCON = 'eng.grammar.tense-consistency'
const TCON_SRC = 'docs/curriculum/blueprints/eng.grammar.tense-consistency.md'

const TCON_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TCON,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Tense consistency doesn’t mean using ONE tense throughout — it ' +
      'means using tenses that logically and CONSISTENTLY reflect the ' +
      'actual TIME relationships of what’s being described. A MOTIVATED ' +
      'shift (genuinely describing a different time) is correct: "She ' +
      'walked to the store yesterday; tomorrow she will visit the gym." ' +
      'An UNMOTIVATED shift (switching tense without any real change in ' +
      'time reference) is the actual error: "She walked to the store ' +
      'because she needs milk" — both actions happen in the same past ' +
      'time-frame, so both should be past tense ("needed"). Check whether ' +
      'a tense shift reflects an actual change in the TIME being ' +
      'described (motivated, correct) or is an arbitrary switch within ' +
      'the same time-frame (unmotivated, an error).',
    targetedMisconceptions: [`${TCON}:MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY`],
    source: `${TCON_SRC} — MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY (P28 walked-yesterday/will-visit-tomorrow conflict)`,
  },
  {
    conceptId: TCON,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'While past tense is the most common narrative choice, present ' +
      'tense ("historical present") is a legitimate, deliberate stylistic ' +
      'option for narrating past or fictional events vividly, as if ' +
      'unfolding in real time — used in storytelling, sports commentary ' +
      '("He shoots, he scores!"), and some literary fiction. The key ' +
      'requirement is CONSISTENCY: if you choose present-tense narration, ' +
      'sustain it throughout the relevant passage rather than randomly ' +
      'mixing it with past tense. Recognize present-tense narration as a ' +
      'valid stylistic choice, not an automatic error.',
    targetedMisconceptions: [`${TCON}:MC-NARRATIVE-TENSE-CANT-BE-PRESENT`],
    source: `${TCON_SRC} — MC-NARRATIVE-TENSE-CANT-BE-PRESENT (P28 so-I-walk-into-the-room conflict)`,
  },
  {
    conceptId: TCON,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Tense consistency does not require a single tense throughout a ' +
      'passage — it requires that tense shifts reflect genuine changes in ' +
      'the time being described. A MOTIVATED shift ("She graduated last ' +
      'year; next year she will start medical school") is correct; an ' +
      'UNMOTIVATED shift within the same time-frame ("She walked to the ' +
      'store because she needs milk," which should be "needed") is the ' +
      'actual error. Separately, present-tense ("historical present") ' +
      'narration is a legitimate stylistic choice for vividly narrating ' +
      'past or fictional events — not an automatic error — provided it is ' +
      'sustained consistently rather than mixed arbitrarily with past ' +
      'tense mid-passage.',
    targetedMisconceptions: [
      `${TCON}:MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY`,
      `${TCON}:MC-NARRATIVE-TENSE-CANT-BE-PRESENT`,
    ],
    source: `${TCON_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const TCON_PROBES: SeedProbe[] = [
  {
    conceptId: TCON,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is there a tense error in "She graduated last year; next year she will start medical school"?',
    choices: [
      { text: 'No — the tense shift is motivated by a genuine change in the time being described (past graduation, future start of school)', isCorrect: true },
      { text: 'Yes — every verb in a passage must be in the exact same tense', isCorrect: false, misconceptionId: `${TCON}:MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY` },
    ],
    correctValue: 'no error',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TCON}:MC-ALL-VERBS-IN-A-PASSAGE-MUST-MATCH-EXACTLY`],
    source: `${TCON_SRC} — graduated-last-year/will-start conflict as probe, distractor-mapped`,
  },
  {
    conceptId: TCON,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "The ball flies through the air, and the crowd goes wild" grammatically wrong because it is not in past tense?',
    choices: [
      { text: 'No — this is valid historical-present narration (e.g., sports commentary style), a legitimate stylistic choice, not an error', isCorrect: true },
      { text: 'Yes — stories and accounts of events must always be told in past tense', isCorrect: false, misconceptionId: `${TCON}:MC-NARRATIVE-TENSE-CANT-BE-PRESENT` },
    ],
    correctValue: 'no, valid',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TCON}:MC-NARRATIVE-TENSE-CANT-BE-PRESENT`],
    source: `${TCON_SRC} — ball-flies-through-the-air conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.clauses ─────────────────────────────────────────────────────
const CLAU = 'eng.grammar.clauses'
const CLAU_SRC = 'docs/curriculum/blueprints/eng.grammar.clauses.md'

const CLAU_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CLAU,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A dependent clause STILL genuinely contains a subject-verb pair — ' +
      'that is what makes it a clause at all, just like an independent ' +
      'clause. The word "dependent" refers specifically to its INABILITY ' +
      'TO STAND ALONE as a complete sentence (because of a subordinating ' +
      'word like "because" or "when"), not to any lack of clause ' +
      'structure. "Because she was tired" is absolutely a clause (subject ' +
      '"she" + verb "was"), just a dependent one. Check for a ' +
      'subject-verb pair to confirm clause status first — then separately ' +
      'determine whether it can stand alone (independent) or not ' +
      '(dependent).',
    targetedMisconceptions: [`${CLAU}:MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE`],
    source: `${CLAU_SRC} — MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE (P28 because-she-was-tired conflict)`,
  },
  {
    conceptId: CLAU,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '"Independent clause" describes a STRUCTURAL UNIT (a subject-verb ' +
      'group that COULD stand alone), not a whole-sentence category. A ' +
      'single sentence can contain multiple independent clauses (a ' +
      'compound sentence: "I was tired, so I went to bed" — TWO ' +
      'independent clauses joined by "so"), or an independent clause plus ' +
      'a dependent clause (a complex sentence: "I went to bed because I ' +
      'was tired"). "Simple sentence" specifically refers to a sentence ' +
      'with ONLY ONE independent clause and no dependent clauses — a ' +
      'narrower, more specific category.',
    targetedMisconceptions: [`${CLAU}:MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY`],
    source: `${CLAU_SRC} — MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY (P28 I-was-tired-so-I-went-to-bed conflict)`,
  },
  {
    conceptId: CLAU,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A dependent clause still contains a genuine subject-verb pair — ' +
      'the subordinating word ("because," "when," "although") only ' +
      'affects whether the clause can stand alone as a complete sentence, ' +
      'not whether it counts as a clause at all. Separately, "independent ' +
      'clause" is a structural building block, not a synonym for "whole ' +
      'sentence" — a compound sentence contains two or more independent ' +
      'clauses joined together, and a complex sentence combines an ' +
      'independent clause with one or more dependent clauses. Confirm ' +
      'clause status by checking for a subject-verb pair, then separately ' +
      'assess how that clause combines with others in the larger ' +
      'sentence.',
    targetedMisconceptions: [
      `${CLAU}:MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE`,
      `${CLAU}:MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY`,
    ],
    source: `${CLAU_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CLAU_PROBES: SeedProbe[] = [
  {
    conceptId: CLAU,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "because she was tired" a genuine clause, even though it cannot stand alone as a sentence?',
    choices: [
      { text: 'Yes — it contains a subject ("she") and a verb ("was"), which makes it a genuine clause; "because" only means it cannot stand alone', isCorrect: true },
      { text: 'No — adding "because" removes its clause status entirely', isCorrect: false, misconceptionId: `${CLAU}:MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE` },
    ],
    correctValue: 'yes, a dependent clause',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CLAU}:MC-A-CLAUSE-WITH-A-SUBORDINATING-WORD-ISNT-A-CLAUSE`],
    source: `${CLAU_SRC} — because-she-was-tired conflict as probe, distractor-mapped`,
  },
  {
    conceptId: CLAU,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "I was tired, so I went to bed," how many independent clauses are there?',
    choices: [
      { text: 'Two — "I was tired" and "I went to bed," joined by "so"', isCorrect: true },
      { text: 'One — this is just a single simple sentence, and "independent clause" is another name for that', isCorrect: false, misconceptionId: `${CLAU}:MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY` },
    ],
    correctValue: 'two',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CLAU}:MC-INDEPENDENT-CLAUSE-MEANS-SIMPLE-SENTENCE-ONLY`],
    source: `${CLAU_SRC} — I-was-tired-so-I-went-to-bed conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.conditionals ────────────────────────────────────────────────
const COND = 'eng.grammar.conditionals'
const COND_SRC = 'docs/curriculum/blueprints/eng.grammar.conditionals.md'

const COND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The second conditional uses PAST TENSE FORM (if + simple past) to ' +
      'express a HYPOTHETICAL or UNREAL condition about the PRESENT or ' +
      'FUTURE, not actual past time. "If I had more money, I would ' +
      'travel" means: right now, I don’t have more money, but IF I ' +
      'imagined having it, I would travel — the past-tense verb form is a ' +
      'grammatical convention signaling unreality/distance from fact, not ' +
      'literal past time. Treat the past-tense verb form here as a ' +
      'signal of hypothetical/unreal PRESENT possibility, not as a ' +
      'reference to something that actually happened.',
    targetedMisconceptions: [`${COND}:MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME`],
    source: `${COND_SRC} — MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME (P28 if-I-had-more-money conflict)`,
  },
  {
    conceptId: COND,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The four conditional types express genuinely different degrees of ' +
      'reality: ZERO (if + present, present — general truths: "If you ' +
      'heat water, it boils"), FIRST (if + present, will + base — real ' +
      'future possibility: "If it rains, I will stay home"), SECOND (if ' +
      '+ past, would + base — hypothetical present/future: "If I had ' +
      'more time, I would help"), THIRD (if + past perfect, would have + ' +
      'past participle — counterfactual PAST, something that did NOT ' +
      'happen: "If I had studied, I would have passed"). Before forming a ' +
      'conditional sentence, identify which reality-type applies and use ' +
      'that type’s specific tense pairing.',
    targetedMisconceptions: [`${COND}:MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE`],
    source: `${COND_SRC} — MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE (P28 rains-vs-had-studied conflict)`,
  },
  {
    conceptId: COND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'The second conditional’s past-tense form ("If I had more time, I ' +
      'would help") signals hypothetical unreality about the present or ' +
      'future, not actual past time — a distancing grammatical ' +
      'convention, not a literal time reference. Separately, English’s ' +
      'four conditional types (zero, first, second, third) each express a ' +
      'genuinely different degree of reality — general truth, real future ' +
      'possibility, hypothetical present/future, or counterfactual past — ' +
      'and each requires its own specific tense pairing rather than one ' +
      'interchangeable "if" pattern.',
    targetedMisconceptions: [
      `${COND}:MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME`,
      `${COND}:MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE`,
    ],
    source: `${COND_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const COND_PROBES: SeedProbe[] = [
  {
    conceptId: COND,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "If I had more money, I would travel more," does "had" mean I HAD money in the past and don’t anymore?',
    choices: [
      { text: 'No — this describes an imagined, unreal situation right now; I currently don’t have more money', isCorrect: true },
      { text: 'Yes — the past-tense verb form always means past time', isCorrect: false, misconceptionId: `${COND}:MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME` },
    ],
    correctValue: 'no, hypothetical present',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COND}:MC-SECOND-CONDITIONAL-PAST-TENSE-MEANS-PAST-TIME`],
    source: `${COND_SRC} — if-I-had-more-money conflict as probe, distractor-mapped`,
  },
  {
    conceptId: COND,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Should "If it rains, I will stay home" and "If I had studied, I would have passed" use the same conditional structure?',
    choices: [
      { text: 'No — the first is a real future possibility (first conditional), the second is a counterfactual past that already didn’t happen (third conditional); each needs its own tense pairing', isCorrect: true },
      { text: 'Yes — all "if" sentences follow one interchangeable structure', isCorrect: false, misconceptionId: `${COND}:MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE` },
    ],
    correctValue: 'no, different conditional types',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COND}:MC-ALL-CONDITIONALS-ARE-THE-SAME-STRUCTURE`],
    source: `${COND_SRC} — rains-vs-had-studied conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.participles-and-participial-phrases ────────────────────────
const PART = 'eng.grammar.participles-and-participial-phrases'
const PART_SRC = 'docs/curriculum/blueprints/eng.grammar.participles-and-participial-phrases.md'

const PART_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PART,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A present participle (-ing form) can function as an ADJECTIVE, ' +
      'modifying a noun ("the sleeping baby" — "sleeping" describes ' +
      '"baby," just like "the tired baby" would). This is grammatically ' +
      'distinct from a GERUND (-ing form functioning as a NOUN: "Sleeping ' +
      'is healthy" — "sleeping" IS the subject). Same spelling, different ' +
      'grammatical roles — check whether the -ing word is describing a ' +
      'noun (participle/adjective) or acting AS a noun itself (gerund).',
    targetedMisconceptions: [`${PART}:MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN`],
    source: `${PART_SRC} — MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN (P28 sleeping-baby-vs-sleeping-is-healthy conflict)`,
  },
  {
    conceptId: PART,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A participial phrase must logically modify (describe an action ' +
      'performed by) the SUBJECT of the main clause that immediately ' +
      'follows it — if the subject doesn’t match who/what is actually ' +
      'doing the participial action, the sentence is a "dangling ' +
      'participle," a genuine logical error, even if the writer’s ' +
      'INTENDED meaning feels clear to them. "Walking down the street, ' +
      'the trees were beautiful" illogically attaches the walking action ' +
      'to "the trees" (the actual subject). Correct: "Walking down the ' +
      'street, I noticed the trees were beautiful."',
    targetedMisconceptions: [`${PART}:MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR`],
    source: `${PART_SRC} — MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR (P28 walking-down-the-street conflict)`,
  },
  {
    conceptId: PART,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'An -ing word functions as an adjective (present participle) when ' +
      'it modifies a noun ("the sleeping baby"), and as a noun (gerund) ' +
      'when it acts as the subject or object of a sentence ("Sleeping is ' +
      'healthy") — identical spelling, different grammatical roles, ' +
      'distinguished by function rather than form. Separately, a ' +
      'participial phrase must logically attach to the subject of the ' +
      'main clause that follows it; when it does not ("Walking down the ' +
      'street, the trees were beautiful" — the trees cannot walk), the ' +
      'sentence contains a dangling participle, a genuine logical error ' +
      'regardless of how clear the intended meaning felt to the writer.',
    targetedMisconceptions: [
      `${PART}:MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN`,
      `${PART}:MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR`,
    ],
    source: `${PART_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const PART_PROBES: SeedProbe[] = [
  {
    conceptId: PART,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "the sleeping baby," what job is "sleeping" doing?',
    choices: [
      { text: 'It is a present participle functioning as an adjective, describing "baby"', isCorrect: true },
      { text: 'It is a gerund, since any -ing word functioning this way must be a gerund', isCorrect: false, misconceptionId: `${PART}:MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN` },
    ],
    correctValue: 'participle (adjective)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${PART}:MC-PRESENT-PARTICIPLE-IS-JUST-A-GERUND-AGAIN`],
    source: `${PART_SRC} — sleeping-baby-vs-sleeping-is-healthy conflict as probe, distractor-mapped`,
  },
  {
    conceptId: PART,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is there a problem with "Walking down the street, the trees were beautiful"?',
    choices: [
      { text: 'Yes — it is a dangling participle; "the trees" (the subject) cannot walk, so the sentence needs a human subject added', isCorrect: true },
      { text: 'No — the sentence is fine since the intended meaning is clear enough', isCorrect: false, misconceptionId: `${PART}:MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR` },
    ],
    correctValue: 'yes, dangling participle',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${PART}:MC-DANGLING-PARTICIPLES-ARE-FINE-IF-MEANING-IS-CLEAR`],
    source: `${PART_SRC} — walking-down-the-street conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.pronoun-antecedent-agreement ───────────────────────────────
const PAAG = 'eng.grammar.pronoun-antecedent-agreement'
const PAAG_SRC = 'docs/curriculum/blueprints/eng.grammar.pronoun-antecedent-agreement.md'

const PAAG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PAAG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Indefinite pronouns like "everyone," "someone," "each," ' +
      '"everybody," "anybody" are grammatically SINGULAR, even though ' +
      'they refer to a group of people conceptually — this is confirmed ' +
      'by their singular verb agreement ("Everyone IS here," not ' +
      '"ARE"). Traditionally, formal grammar pairs these with "his or ' +
      'her"; modern standard usage increasingly accepts singular ' +
      '"they/their" as a gender-neutral option, but recognizing these ' +
      'words’ singular grammatical STATUS is the key point. Check an ' +
      'indefinite pronoun’s verb agreement (is/are) to confirm it’s ' +
      'singular before choosing an agreeing pronoun.',
    targetedMisconceptions: [`${PAAG}:MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL`],
    source: `${PAAG_SRC} — MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL (P28 everyone-is-vs-are conflict)`,
  },
  {
    conceptId: PAAG,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A pronoun must have a clear, single, unambiguous antecedent — when ' +
      'a sentence has two or more possible antecedents (like "Sarah" and ' +
      '"Maria," both female singular nouns the pronoun "she" could refer ' +
      'to), the reader genuinely cannot determine the intended meaning ' +
      'without additional information. This is a real communication ' +
      'failure, not something "context makes obvious," since the ' +
      'writer’s inside knowledge isn’t available to the reader. Check ' +
      'whether a pronoun has exactly ONE possible antecedent — if ' +
      'multiple candidates exist, rewrite the sentence to eliminate the ' +
      'ambiguity.',
    targetedMisconceptions: [`${PAAG}:MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR`],
    source: `${PAAG_SRC} — MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR (P28 Sarah-told-Maria conflict)`,
  },
  {
    conceptId: PAAG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Indefinite pronouns ("everyone," "someone," "each") are ' +
      'grammatically singular, confirmed by their singular verb agreement ' +
      '("Everyone is here") — modern usage increasingly accepts singular ' +
      '"their" as a gender-neutral pairing, but the pronoun itself remains ' +
      'grammatically singular regardless of which option is chosen. ' +
      'Separately, a pronoun needs exactly one identifiable antecedent; ' +
      '"Sarah told Maria that she had won the award" is genuinely ' +
      'ambiguous ("she" could be either), and assuming the intended ' +
      'meaning is "obvious from context" overlooks that the reader lacks ' +
      'the writer’s inside knowledge.',
    targetedMisconceptions: [
      `${PAAG}:MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL`,
      `${PAAG}:MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR`,
    ],
    source: `${PAAG_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const PAAG_PROBES: SeedProbe[] = [
  {
    conceptId: PAAG,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does "everyone" pair with "is" or "are" — and what does that tell you about choosing a pronoun to refer back to it?',
    choices: [
      { text: '"Is" — "everyone" is grammatically singular, so it needs a singular-agreeing pronoun choice', isCorrect: true },
      { text: '"Are" — "everyone" refers to many people, so it should be treated as plural', isCorrect: false, misconceptionId: `${PAAG}:MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL` },
    ],
    correctValue: 'is, singular',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PAAG}:MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL`],
    source: `${PAAG_SRC} — everyone-is-vs-are conflict as probe, distractor-mapped`,
  },
  {
    conceptId: PAAG,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "Sarah told Maria that she had won the award," can you tell for certain who won, just from this sentence?',
    choices: [
      { text: 'No — "she" could refer to either Sarah or Maria; the sentence needs to be rewritten to remove the ambiguity', isCorrect: true },
      { text: 'Yes — the context makes it obvious enough who "she" refers to', isCorrect: false, misconceptionId: `${PAAG}:MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR` },
    ],
    correctValue: 'no, ambiguous',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PAAG}:MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR`],
    source: `${PAAG_SRC} — Sarah-told-Maria conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.end-punctuation ─────────────────────────────────────────────
const ENDP = 'eng.grammar.end-punctuation'
const ENDP_SRC = 'docs/curriculum/blueprints/eng.grammar.end-punctuation.md'

const ENDP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENDP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'An exclamation point signals STRONG EMOTION or emphasis ' +
      '(excitement, surprise, urgency, fear, strong command) — not ' +
      'specifically loudness or volume. A quietly whispered "I can’t ' +
      'believe it!" can still carry genuine strong emotion deserving an ' +
      'exclamation point, while a loudly spoken but emotionally flat ' +
      'statement typically doesn’t need one. Use the exclamation point ' +
      'to signal genuine strong emotion or emphasis, regardless of ' +
      'whether the statement would be spoken loudly or quietly.',
    targetedMisconceptions: [`${ENDP}:MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL`],
    source: `${ENDP_SRC} — MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL (P28 whispered-shock conflict)`,
  },
  {
    conceptId: ENDP,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The presence of a wh-word doesn’t automatically make a sentence a ' +
      'question requiring a question mark — check the sentence’s actual ' +
      'FUNCTION: is it genuinely asking something that needs an answer ' +
      '(interrogative, question mark), or is it expressing strong feeling ' +
      '(exclamatory, exclamation point) or reporting a thought/statement ' +
      '(declarative, period), even though it contains a wh-word? "What a ' +
      'beautiful day!" is exclamatory, not a question, despite starting ' +
      'with "What."',
    targetedMisconceptions: [`${ENDP}:MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK`],
    source: `${ENDP_SRC} — MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK (P28 what-a-beautiful-day conflict)`,
  },
  {
    conceptId: ENDP,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'An exclamation point marks strong emotion or emphasis, not ' +
      'loudness — a quietly delivered but genuinely emotional statement ' +
      'deserves one just as much as a loud one, and a loud but ' +
      'emotionally flat statement typically does not. Separately, a ' +
      'sentence beginning with a wh-word ("what," "how," "why") is not ' +
      'automatically interrogative — check its genuine function: "What a ' +
      'beautiful day!" expresses strong feeling (exclamatory), while "What ' +
      'day is it?" genuinely asks something (interrogative). Choose end ' +
      'punctuation based on communicative function, not surface cues like ' +
      'volume or the presence of a wh-word.',
    targetedMisconceptions: [
      `${ENDP}:MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL`,
      `${ENDP}:MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK`,
    ],
    source: `${ENDP_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const ENDP_PROBES: SeedProbe[] = [
  {
    conceptId: ENDP,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Could a quietly whispered "I can’t believe it!" still deserve an exclamation point?',
    choices: [
      { text: 'Yes — exclamation points signal strong emotion, not loudness; genuine shock or excitement can be whispered', isCorrect: true },
      { text: 'No — exclamation points are only for statements said loudly', isCorrect: false, misconceptionId: `${ENDP}:MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL` },
    ],
    correctValue: 'yes',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ENDP}:MC-EXCLAMATION-POINT-MEANS-LOUD-NOT-EMOTIONAL`],
    source: `${ENDP_SRC} — whispered-shock conflict as probe, distractor-mapped`,
  },
  {
    conceptId: ENDP,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does "What a beautiful day" need a question mark, since it starts with the wh-word "What"?',
    choices: [
      { text: 'No — it expresses strong feeling, not a genuine question, so it needs an exclamation point: "What a beautiful day!"', isCorrect: true },
      { text: 'Yes — any sentence starting with a wh-word needs a question mark', isCorrect: false, misconceptionId: `${ENDP}:MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK` },
    ],
    correctValue: 'no, exclamation point',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${ENDP}:MC-ANY-SENTENCE-STARTING-WITH-A-WH-WORD-IS-A-QUESTION-MARK`],
    source: `${ENDP_SRC} — what-a-beautiful-day conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.simple-sentences ───────────────────────────────────────────
const SSEN = 'eng.grammar.simple-sentences'
const SSEN_SRC = 'docs/curriculum/blueprints/eng.grammar.simple-sentences.md'

const SSEN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SSEN,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Length is a trap here — a simple sentence can be long and dressed ' +
      'up with lots of describing words, and a compound sentence can be ' +
      'short and plain. "The exhausted, determined marathon runners from ' +
      'twelve different countries crossed the finish line together and ' +
      'collapsed onto the grass in relief" is still SIMPLE (one ' +
      'independent clause, just with a compound subject/predicate and ' +
      'extra modifiers), while "She left. He stayed." is two separate ' +
      'clauses. "Simple" isn’t about word count; it’s about how many ' +
      'independent clauses are doing the work — count independent ' +
      'clauses, not words.',
    targetedMisconceptions: [`${SSEN}:MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE`],
    source: `${SSEN_SRC} — MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE (P28 long-simple-vs-short-compound conflict)`,
  },
  {
    conceptId: SSEN,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      '"And" (or "or"/"but") has more than one job. It can join two whole ' +
      'clauses (making a compound sentence), but it can also just join ' +
      'two subjects or two verbs inside ONE clause (keeping it simple). ' +
      '"Maya and Diego finished the race and celebrated together" has one ' +
      'compound subject and one compound predicate — still just ONE ' +
      'clause, so it’s simple. When you see "and," check whether there is ' +
      'a complete subject-verb pair on BOTH sides — only then does the ' +
      'sentence become compound.',
    targetedMisconceptions: [`${SSEN}:MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE`],
    source: `${SSEN_SRC} — MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE (P28 Maya-and-Diego conflict)`,
  },
  {
    conceptId: SSEN,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A simple sentence is defined by clause count (exactly one ' +
      'independent clause), not by length — a long sentence with a ' +
      'compound subject, compound predicate, and multiple modifiers can ' +
      'still be simple, while a short sentence with two independent ' +
      'clauses is compound. Separately, the presence of "and," "or," or ' +
      '"but" does not by itself signal a compound sentence — check ' +
      'whether the conjunction joins two complete subject-verb pairs ' +
      '(compound) or merely joins two subjects, verbs, or objects within ' +
      'one clause (still simple).',
    targetedMisconceptions: [
      `${SSEN}:MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE`,
      `${SSEN}:MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE`,
    ],
    source: `${SSEN_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SSEN_PROBES: SeedProbe[] = [
  {
    conceptId: SSEN,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "The exhausted, determined marathon runners from twelve different countries crossed the finish line together and collapsed onto the grass in relief" a simple sentence, even though it is long?',
    choices: [
      { text: 'Yes — it has only one independent clause (one subject-verb pairing), just with a compound subject/predicate and extra modifiers', isCorrect: true },
      { text: 'No — it is too long to be a simple sentence', isCorrect: false, misconceptionId: `${SSEN}:MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE` },
    ],
    correctValue: 'yes, simple',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SSEN}:MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE`],
    source: `${SSEN_SRC} — long-simple-vs-short-compound conflict as probe, distractor-mapped`,
  },
  {
    conceptId: SSEN,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "Maya and Diego finished the race and celebrated together" a simple or compound sentence?',
    choices: [
      { text: 'Simple — one compound subject ("Maya and Diego") and one compound predicate ("finished...and celebrated"), but only one subject-verb pairing', isCorrect: true },
      { text: 'Compound — it has an "and" in it', isCorrect: false, misconceptionId: `${SSEN}:MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE` },
    ],
    correctValue: 'simple',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SSEN}:MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE`],
    source: `${SSEN_SRC} — Maya-and-Diego conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.comma-usage ─────────────────────────────────────────────────
const CUSE = 'eng.grammar.comma-usage'
const CUSE_SRC = 'docs/curriculum/blueprints/eng.grammar.comma-usage.md'

const CUSE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CUSE,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Breath pauses and comma rules overlap often, which is why the ' +
      '"pause test" feels like it works — but they are not the same ' +
      'thing. A comma marks a specific grammatical job: separating list ' +
      'items, joining two independent clauses, setting off an ' +
      'introductory element, or bracketing nonessential information. If ' +
      'none of those four jobs apply, no comma belongs there, breath or ' +
      'no breath — for example, "The dog that lives next door barked all ' +
      'night" takes no comma before "barked," even though many readers ' +
      'pause there, since "that lives next door" is essential information.',
    targetedMisconceptions: [`${CUSE}:MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING`],
    source: `${CUSE_SRC} — MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING (P28 dog-that-lives-next-door conflict)`,
  },
  {
    conceptId: CUSE,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The comma-before-"and" rule only applies when "and" is joining ' +
      'two COMPLETE clauses — two full subject-verb pairs that could each ' +
      'stand alone as their own sentence. "Maya ran, and jumped over the ' +
      'hurdle" incorrectly adds a comma before a compound verb (no comma ' +
      'needed); "Maya ran the race, and she won first place" correctly ' +
      'uses a comma since both sides have their own subject-verb pair. ' +
      'Before adding a comma in front of "and," "or," or "but," check ' +
      'both sides for a complete subject-verb pair.',
    targetedMisconceptions: [`${CUSE}:MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA`],
    source: `${CUSE_SRC} — MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA (P28 Maya-ran-and-jumped conflict)`,
  },
  {
    conceptId: CUSE,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A comma belongs only where it performs one of four specific ' +
      'grammatical jobs — separating list items, joining two independent ' +
      'clauses, setting off an introductory element, or bracketing ' +
      'nonessential information — not wherever a reader would naturally ' +
      'pause when speaking. Separately, a comma before "and"/"or"/"but" ' +
      'is required only when the conjunction joins two complete ' +
      'independent clauses (a full subject-verb pair on each side); when ' +
      'it merely joins two verbs, subjects, or objects within a single ' +
      'clause, no comma is needed, regardless of how the sentence sounds ' +
      'read aloud.',
    targetedMisconceptions: [
      `${CUSE}:MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING`,
      `${CUSE}:MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA`,
    ],
    source: `${CUSE_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CUSE_PROBES: SeedProbe[] = [
  {
    conceptId: CUSE,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does "The dog that lives next door barked all night" need a comma before "barked," since many readers would naturally pause there?',
    choices: [
      { text: 'No — "that lives next door" is essential information, not one of the four comma jobs, so no comma belongs there regardless of the pause', isCorrect: true },
      { text: 'Yes — a comma goes wherever you would naturally pause when reading aloud', isCorrect: false, misconceptionId: `${CUSE}:MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING` },
    ],
    correctValue: 'no comma',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CUSE}:MC-COMMA-GOES-WHEREVER-YOU-PAUSE-WHEN-SPEAKING`],
    source: `${CUSE_SRC} — dog-that-lives-next-door conflict as probe, distractor-mapped`,
  },
  {
    conceptId: CUSE,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does "Maya ran, and jumped over the hurdle" correctly use a comma before "and"?',
    choices: [
      { text: 'No — "and" here joins a compound verb ("ran...and jumped"), not two independent clauses, so no comma is needed', isCorrect: true },
      { text: 'Yes — any two clauses joined by "and" need a comma', isCorrect: false, misconceptionId: `${CUSE}:MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA` },
    ],
    correctValue: 'no comma needed',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CUSE}:MC-ANY-TWO-CLAUSES-JOINED-BY-AND-NEED-A-COMMA`],
    source: `${CUSE_SRC} — Maya-ran-and-jumped conflict as probe, distractor-mapped`,
  },
]

// ─── eng.vocab.word-recognition ──────────────────────────────────────────────
const WREC = 'eng.vocab.word-recognition'
const WREC_SRC = 'docs/curriculum/blueprints/eng.vocab.word-recognition.md'

const WREC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WREC,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Decoding (sounding out the letters correctly) and word recognition ' +
      '(connecting the printed word to a meaning you already know from ' +
      'spoken vocabulary) are two different steps. Decoding gets you TO ' +
      'the word’s pronunciation; recognition is realizing "oh, I know ' +
      'this word — I’ve heard it spoken, and here’s what it means." A ' +
      'word can be decoded perfectly and still not be recognized if it’s ' +
      'not yet part of your spoken vocabulary. After decoding an ' +
      'unfamiliar-looking printed word, always check whether you already ' +
      'know it from speech.',
    targetedMisconceptions: [`${WREC}:MC-DECODING-EQUALS-RECOGNIZING-MEANING`],
    source: `${WREC_SRC} — MC-DECODING-EQUALS-RECOGNIZING-MEANING (P28 decode-then-check conflict)`,
  },
  {
    conceptId: WREC,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A printed word looking unfamiliar doesn’t mean the WORD itself is ' +
      'unknown — it might just be a word you haven’t seen written down ' +
      'very often yet, even though you already know it perfectly well ' +
      'from listening and speaking. Decoding it can "unlock" a word you ' +
      'already have in your spoken vocabulary — like "though," which ' +
      'looks tricky in print but is instantly recognized once sounded ' +
      'out. Before assuming an unfamiliar-looking printed word is ' +
      'completely unknown, decode it fully first.',
    targetedMisconceptions: [`${WREC}:MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD`],
    source: `${WREC_SRC} — MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD (P28 though conflict)`,
  },
  {
    conceptId: WREC,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Decoding a printed word correctly and recognizing its meaning are ' +
      'two separable steps — a word can be sounded out perfectly and ' +
      'still not be recognized, if it isn’t yet part of one’s spoken ' +
      'vocabulary. Conversely, a word’s unfamiliar printed appearance ' +
      'does not mean it is genuinely unknown — decoding it fully first ' +
      'often reveals that it is already a known spoken word, simply ' +
      'unfamiliar in written form. Decode first, then separately check ' +
      'for meaning recognition, rather than assuming either that ' +
      'decoding success equals full comprehension or that an odd spelling ' +
      'equals an unknown word.',
    targetedMisconceptions: [
      `${WREC}:MC-DECODING-EQUALS-RECOGNIZING-MEANING`,
      `${WREC}:MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD`,
    ],
    source: `${WREC_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const WREC_PROBES: SeedProbe[] = [
  {
    conceptId: WREC,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A student sounds out an unfamiliar-looking word perfectly but cannot say what it means or use it. Has this student "recognized" the word?',
    choices: [
      { text: 'No — decoding (pronouncing it correctly) and recognition (connecting it to a known meaning) are two different steps; decoding success alone doesn’t mean the word is recognized', isCorrect: true },
      { text: 'Yes — decoding a word correctly means the task is done', isCorrect: false, misconceptionId: `${WREC}:MC-DECODING-EQUALS-RECOGNIZING-MEANING` },
    ],
    correctValue: 'no',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${WREC}:MC-DECODING-EQUALS-RECOGNIZING-MEANING`],
    source: `${WREC_SRC} — decode-then-check conflict as probe, distractor-mapped`,
  },
  {
    conceptId: WREC,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A student sees the word "though" and says "I don\'t know this word" without trying to sound it out. Is that a safe conclusion?',
    choices: [
      { text: 'No — decoding it first might reveal it is already a known spoken word, just unfamiliar in its written form', isCorrect: true },
      { text: 'Yes — if a printed word looks unfamiliar, it must be an unknown word', isCorrect: false, misconceptionId: `${WREC}:MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD` },
    ],
    correctValue: 'no, decode first',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${WREC}:MC-UNFAMILIAR-PRINTED-WORD-MEANS-UNKNOWN-WORD`],
    source: `${WREC_SRC} — though conflict as probe, distractor-mapped`,
  },
]

// ─── eng.writing.handwriting-and-formation ──────────────────────────────────
const HAND = 'eng.writing.handwriting-and-formation'
const HAND_SRC = 'docs/curriculum/blueprints/eng.writing.handwriting-and-formation.md'

const HAND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HAND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Stroke order and direction don’t just matter for how a single ' +
      'letter looks right now — they matter for how smoothly, quickly, ' +
      'and legibly you’ll write later, especially once letters need to ' +
      'connect (cursive) or you write for a long time. Writing an "O" ' +
      'bottom-to-top or counter-clockwise from the bottom might look the ' +
      'same at slow speed, but it builds a motor habit that breaks down ' +
      'at speed. Always start each letter at its designated starting ' +
      'point and follow the standard stroke direction, even if an ' +
      'alternate order produces a similar-looking result right now.',
    targetedMisconceptions: [`${HAND}:MC-ANY-STROKE-ORDER-WORKS`],
    source: `${HAND_SRC} — MC-ANY-STROKE-ORDER-WORKS (P28 write-five-os-fast conflict)`,
  },
  {
    conceptId: HAND,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'The baseline and other guide-lines exist to keep every letter the ' +
      'same size and sitting in the same place — this is what makes ' +
      'handwriting easy for other people (and future-you) to read ' +
      'quickly, not just a rule for its own sake. Always place letters so ' +
      'their base sits exactly on the baseline, and check tall/short ' +
      'letter categories (ascenders like "b," x-height letters like "a," ' +
      'and descenders like "p" that dip below the line) against the ' +
      'guide lines before moving on.',
    targetedMisconceptions: [`${HAND}:MC-SIZE-AND-BASELINE-DONT-MATTER`],
    source: `${HAND_SRC} — MC-SIZE-AND-BASELINE-DONT-MATTER (P28 floating-letters-vs-printed-book conflict)`,
  },
  {
    conceptId: HAND,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Consistent stroke order and direction matter for handwriting speed ' +
      'and legibility over time, even when an alternate order produces a ' +
      'similar-looking result at slow speed — the habit either supports ' +
      'or undermines fluent, joined writing later. Separately, baseline ' +
      'and guide-line placement are functional, not decorative: keeping ' +
      'every letter’s base on the baseline and respecting height ' +
      'categories (ascenders, x-height, descenders) is what makes writing ' +
      'quickly legible to a reader, not an arbitrary rule.',
    targetedMisconceptions: [
      `${HAND}:MC-ANY-STROKE-ORDER-WORKS`,
      `${HAND}:MC-SIZE-AND-BASELINE-DONT-MATTER`,
    ],
    source: `${HAND_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const HAND_PROBES: SeedProbe[] = [
  {
    conceptId: HAND,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A student writes an "O" starting from the bottom and going backward, but it looks fine right now. Does the stroke order matter?',
    choices: [
      { text: 'Yes — an inefficient stroke order slows writing down and causes problems later, especially for connected/cursive writing, even if it looks fine now', isCorrect: true },
      { text: 'No — if the letter looks the same, any stroke order works', isCorrect: false, misconceptionId: `${HAND}:MC-ANY-STROKE-ORDER-WORKS` },
    ],
    correctValue: 'yes, stroke order matters',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HAND}:MC-ANY-STROKE-ORDER-WORKS`],
    source: `${HAND_SRC} — write-five-os-fast conflict as probe, distractor-mapped`,
  },
  {
    conceptId: HAND,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does it matter whether letters sit on the baseline and are the correct height, or are the lines on the page just decorative?',
    choices: [
      { text: 'It matters — the lines keep every letter consistent in size and placement, which is what makes writing quick and easy for others to read', isCorrect: true },
      { text: 'It doesn’t matter — size and baseline placement are not important', isCorrect: false, misconceptionId: `${HAND}:MC-SIZE-AND-BASELINE-DONT-MATTER` },
    ],
    correctValue: 'yes, it matters',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${HAND}:MC-SIZE-AND-BASELINE-DONT-MATTER`],
    source: `${HAND_SRC} — floating-letters-vs-printed-book conflict as probe, distractor-mapped`,
  },
]

// ─── eng.literature.narrative-elements ──────────────────────────────────────
const NARR = 'eng.literature.narrative-elements'
const NARR_SRC = 'docs/curriculum/blueprints/eng.literature.narrative-elements.md'

const NARR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NARR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Plot isn’t a list of every single thing that happens — it’s ' +
      'specifically the chain of events connected to the story’s central ' +
      'conflict, each event causing or leading to the next, building ' +
      'toward a resolution. A story can include many incidental details ' +
      '(what a character had for breakfast, the weather on an unrelated ' +
      'day) that aren’t part of the plot at all — they’re just texture. ' +
      'To identify the plot, trace the events causally connected to the ' +
      'central conflict and skip incidental details that don’t feed into ' +
      'that chain.',
    targetedMisconceptions: [`${NARR}:MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY`],
    source: `${NARR_SRC} — MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY (P28 plot-critical-vs-incidental conflict)`,
  },
  {
    conceptId: NARR,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Setting isn’t just a factual label of where and when — it ' +
      'actively shapes atmosphere (the emotional mood a scene creates), ' +
      'constrains what characters can plausibly do, and often reinforces ' +
      'the story’s themes symbolically. The same difficult decision feels ' +
      'completely different in a warm, familiar kitchen versus an ' +
      'abandoned, storm-battered building, because setting is doing real ' +
      'narrative work, not just providing background facts. Ask not just ' +
      '"where and when" but "what mood does this setting create, and how ' +
      'does it shape what’s possible for the characters here?"',
    targetedMisconceptions: [`${NARR}:MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT`],
    source: `${NARR_SRC} — MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT (P28 kitchen-vs-storm conflict)`,
  },
  {
    conceptId: NARR,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Plot is the chain of events causally connected to a story’s ' +
      'central conflict and its resolution — not an inventory of every ' +
      'event mentioned; incidental details (background color, unrelated ' +
      'small actions) are texture, not plot. Separately, setting actively ' +
      'shapes atmosphere, constrains plausible character action, and can ' +
      'reinforce theme symbolically — it is not a neutral where/when ' +
      'label. The identical plot event reads very differently in a warm, ' +
      'familiar space versus an isolating, threatening one, precisely ' +
      'because setting performs real narrative work.',
    targetedMisconceptions: [
      `${NARR}:MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY`,
      `${NARR}:MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT`,
    ],
    source: `${NARR_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const NARR_PROBES: SeedProbe[] = [
  {
    conceptId: NARR,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'A story mentions a girl finding an old key, remembering her grandmother liked afternoon tea, then using the key to open a locked chest. Is "grandmother liked afternoon tea" part of the plot?',
    choices: [
      { text: 'No — it is an incidental detail, not causally connected to the central conflict; the plot is the discovery and using the key', isCorrect: true },
      { text: 'Yes — the plot is everything that happens in the story', isCorrect: false, misconceptionId: `${NARR}:MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY` },
    ],
    correctValue: 'no, incidental detail',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NARR}:MC-PLOT-MEANS-EVERYTHING-THAT-HAPPENS-IN-THE-STORY`],
    source: `${NARR_SRC} — plot-critical-vs-incidental conflict as probe, distractor-mapped`,
  },
  {
    conceptId: NARR,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'The same difficult decision is set once in a warm, brightly-lit kitchen and once in a storm-battered, abandoned building. Is the setting "just background" in both cases?',
    choices: [
      { text: 'No — the setting actively shapes the mood and tension differently in each version, doing real narrative work beyond stating where/when', isCorrect: true },
      { text: 'Yes — setting is just a factual label of where and when the story happens', isCorrect: false, misconceptionId: `${NARR}:MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT` },
    ],
    correctValue: 'no, setting shapes mood',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NARR}:MC-SETTING-IS-JUST-WHERE-AND-WHEN-A-STORY-HAPPENS-WITH-NO-OTHER-EFFECT`],
    source: `${NARR_SRC} — kitchen-vs-storm conflict as probe, distractor-mapped`,
  },
]

// ─── eng.communication.media-literacy ───────────────────────────────────────
const MEDL = 'eng.communication.media-literacy'
const MEDL_SRC = 'docs/curriculum/blueprints/eng.communication.media-literacy.md'

const MEDL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEDL,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Assuming media coverage simply shows what happened, with no ' +
      'constructed choices, is like assuming a photograph taken from a ' +
      'specific angle shows the "whole" unedited reality — but the ' +
      'photographer’s choice of angle, what’s included, and what’s ' +
      'cropped out are all deliberate decisions. "Protesters Clash with ' +
      'Police" and "Community Members Demand Accountability" can both be ' +
      'technically accurate headlines about the SAME event, yet create ' +
      'very different impressions. Even accurate, fact-based coverage ' +
      'involves deliberate framing, selection, and emphasis at every ' +
      'stage.',
    targetedMisconceptions: [`${MEDL}:MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED`],
    source: `${MEDL_SRC} — MC-A (P28 protesters-clash-vs-community-members-demand conflict)`,
  },
  {
    conceptId: MEDL,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Assuming emotional or dramatic presentation is automatically ' +
      'untrustworthy, while plain presentation is automatically ' +
      'trustworthy, is like assuming a polished, professional-looking ' +
      'website must be legitimate while a plain, text-only one must be a ' +
      'scam — but design polish (or its absence) is a separate question ' +
      'from whether the underlying information is accurate. ' +
      'Trustworthiness depends on sourcing, accuracy, and transparency — ' +
      'not on emotional tone or presentation style, which can vary ' +
      'independently in either direction.',
    targetedMisconceptions: [`${MEDL}:MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT`],
    source: `${MEDL_SRC} — MC-B (P28 emotionally-engaging-vs-plain-inaccurate conflict)`,
  },
  {
    conceptId: MEDL,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'All media messages are constructed through deliberate production ' +
      'choices — framing, word choice, what to include or omit — even ' +
      'when the underlying facts are accurate; treating any coverage as a ' +
      'neutral, unmediated window onto reality overlooks this. Separately, ' +
      'a message’s emotional tone or production polish is a separate ' +
      'question from its trustworthiness: an emotionally engaging, ' +
      'well-produced piece can be accurately sourced, and a plain, ' +
      'dry-toned piece can be poorly sourced. Evaluate substance ' +
      '(sourcing, accuracy, transparency), not style, when judging ' +
      'trustworthiness.',
    targetedMisconceptions: [
      `${MEDL}:MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED`,
      `${MEDL}:MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT`,
    ],
    source: `${MEDL_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const MEDL_PROBES: SeedProbe[] = [
  {
    conceptId: MEDL,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: '"Protesters Clash with Police" and "Community Members Demand Accountability" both describe the same, technically accurate underlying event. Do they create the same impression in a reader who only sees the headline?',
    choices: [
      { text: 'No — different framing choices (word choice, emphasis) shape a different impression, even though both are accurate; media coverage always involves constructed choices', isCorrect: true },
      { text: 'Yes — accurate news coverage simply shows what happened, with no constructed choices involved', isCorrect: false, misconceptionId: `${MEDL}:MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED` },
    ],
    correctValue: 'no, different impressions',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MEDL}:MC-A-NEWS-AND-MEDIA-COVERAGE-SIMPLY-SHOWS-WHAT-HAPPENED-WITH-NO-CONSTRUCTED-CHOICES-INVOLVED`],
    source: `${MEDL_SRC} — protesters-clash-vs-community-members-demand conflict as probe, distractor-mapped`,
  },
  {
    conceptId: MEDL,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'One media piece is emotionally engaging and well-produced but built on accurate, well-sourced facts. Another is plain and dry-toned but contains inaccurate, poorly sourced claims. Which is actually more trustworthy?',
    choices: [
      { text: 'The emotionally engaging piece — trustworthiness depends on accuracy and sourcing, not on emotional tone or presentation style', isCorrect: true },
      { text: 'The plain, dry-toned piece — emotionally engaging content is automatically less trustworthy than plain content', isCorrect: false, misconceptionId: `${MEDL}:MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT` },
    ],
    correctValue: 'the emotionally engaging, accurate one',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MEDL}:MC-B-EMOTIONALLY-ENGAGING-OR-ATTENTION-GRABBING-CONTENT-IS-AUTOMATICALLY-LESS-TRUSTWORTHY-THAN-PLAIN-CONTENT`],
    source: `${MEDL_SRC} — emotionally-engaging-vs-plain-inaccurate conflict as probe, distractor-mapped`,
  },
]

// ─── eng.phonetics.speech-sounds-overview ───────────────────────────────────
const SNDO = 'eng.phonetics.speech-sounds-overview'
const SNDO_SRC = 'docs/curriculum/blueprints/eng.phonetics.speech-sounds-overview.md'

const SNDO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SNDO,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Speech sounds are things your mouth DOES — letters are marks on ' +
      'paper that TRY to represent those sounds, but the match is often ' +
      'imperfect. "Ship" has 4 letters but only 3 sounds (/ʃ/-/ɪ/-/p/), ' +
      'since "sh" is one sound spelled with two letters; "box" has 3 ' +
      'letters but 4 sounds, since "x" represents two sounds. Always ' +
      'count sounds by listening, and count letters by looking — treat ' +
      'them as two separate counting tasks that sometimes give different ' +
      'answers.',
    targetedMisconceptions: [`${SNDO}:MC-SOUNDS-EQUAL-LETTERS`],
    source: `${SNDO_SRC} — MC-SOUNDS-EQUAL-LETTERS (P28 ship-letters-vs-sounds conflict)`,
  },
  {
    conceptId: SNDO,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Speech sounds are not fixed, identical stamps — they vary ' +
      'naturally by dialect, speaking speed, and neighboring sounds, ' +
      'while still being recognized as "the same sound" by listeners of ' +
      'that variety. "Butter" said with a quick flap sound in the middle ' +
      '(common in US English) versus a hard "t" (common in UK English) ' +
      'are both valid, real ways of making that sound — neither is ' +
      '"wrong." Studying speech sounds means describing this real ' +
      'variation, not policing a single "correct" version.',
    targetedMisconceptions: [`${SNDO}:MC-SPEECH-SOUNDS-ARE-FIXED-UNITS`],
    source: `${SNDO_SRC} — MC-SPEECH-SOUNDS-ARE-FIXED-UNITS (P28 butter-dialect conflict)`,
  },
  {
    conceptId: SNDO,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Speech sounds (phonemes) and letters are two distinct systems — ' +
      'one letter can represent different sounds in different words ' +
      '("c" in "cat" vs. "city"), and one sound can be spelled multiple ' +
      'ways ("f" in "fish," "phone," "laugh") — so counting letters is ' +
      'not a reliable way to count sounds. Separately, speech sounds vary ' +
      'naturally by dialect and speaking context while still being ' +
      'recognized as the same underlying sound by listeners of that ' +
      'variety; describing this variation accurately, rather than ' +
      'treating one pronunciation as the sole "correct" version, is the ' +
      'discipline of phonetics.',
    targetedMisconceptions: [
      `${SNDO}:MC-SOUNDS-EQUAL-LETTERS`,
      `${SNDO}:MC-SPEECH-SOUNDS-ARE-FIXED-UNITS`,
    ],
    source: `${SNDO_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const SNDO_PROBES: SeedProbe[] = [
  {
    conceptId: SNDO,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does the word "ship" have the same number of letters as sounds?',
    choices: [
      { text: 'No — "ship" has 4 letters but only 3 sounds, since "sh" together makes one sound', isCorrect: true },
      { text: 'Yes — the number of letters always equals the number of sounds', isCorrect: false, misconceptionId: `${SNDO}:MC-SOUNDS-EQUAL-LETTERS` },
    ],
    correctValue: 'no, 4 letters 3 sounds',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SNDO}:MC-SOUNDS-EQUAL-LETTERS`],
    source: `${SNDO_SRC} — ship-letters-vs-sounds conflict as probe, distractor-mapped`,
  },
  {
    conceptId: SNDO,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Two people from different English-speaking regions pronounce the middle sound in "butter" slightly differently. Is one of them speaking incorrectly?',
    choices: [
      { text: 'No — both are real, valid dialect variations of the same sound, not an error', isCorrect: true },
      { text: 'Yes — there is only one correct way to pronounce each sound', isCorrect: false, misconceptionId: `${SNDO}:MC-SPEECH-SOUNDS-ARE-FIXED-UNITS` },
    ],
    correctValue: 'no, both valid',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${SNDO}:MC-SPEECH-SOUNDS-ARE-FIXED-UNITS`],
    source: `${SNDO_SRC} — butter-dialect conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.compound-sentences ─────────────────────────────────────────
const CMPS = 'eng.grammar.compound-sentences'
const CMPS_SRC = 'docs/curriculum/blueprints/eng.grammar.compound-sentences.md'

const CMPS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CMPS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A compound sentence needs TWO complete independent clauses joined ' +
      'together — not just any sentence that happens to contain "and." ' +
      '"Ben and Sara studied hard and passed the exam" is simple (a ' +
      'compound subject and compound verb, still one clause); "Ben ' +
      'studied hard, and Sara passed the exam" is compound (two full ' +
      'independent clauses joined by comma + "and"). Before calling a ' +
      'sentence compound, check both sides of the joining word for a ' +
      'complete subject-verb pair that could stand alone as its own ' +
      'sentence.',
    targetedMisconceptions: [`${CMPS}:MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE`],
    source: `${CMPS_SRC} — MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE (P28 Ben-and-Sara conflict)`,
  },
  {
    conceptId: CMPS,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'A comma by itself is too weak to join two full independent ' +
      'clauses — that’s called a comma splice, and it’s a real error ' +
      '("The rain stopped, the sun came out" is incorrect). You need ' +
      'either a semicolon ALONE ("The rain stopped; the sun came out"), ' +
      'or a comma PLUS a coordinating conjunction together ("The rain ' +
      'stopped, and the sun came out"). A semicolon never needs a ' +
      'conjunction added after it for this job — it’s already strong ' +
      'enough by itself.',
    targetedMisconceptions: [`${CMPS}:MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS`],
    source: `${CMPS_SRC} — MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS (P28 rain-stopped-sun-came-out conflict)`,
  },
  {
    conceptId: CMPS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A compound sentence requires two complete independent clauses ' +
      'joined together, not merely the presence of "and"/"or"/"but" — a ' +
      'conjunction joining two subjects, verbs, or objects within one ' +
      'clause keeps a sentence simple. Separately, there are exactly ' +
      'three correct ways to join two independent clauses: comma plus a ' +
      'coordinating conjunction, a semicolon alone, or a semicolon plus a ' +
      'conjunctive adverb and comma. A bare comma with no conjunction is ' +
      'never sufficient (a comma splice), and a semicolon never requires ' +
      'an added conjunction.',
    targetedMisconceptions: [
      `${CMPS}:MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE`,
      `${CMPS}:MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS`,
    ],
    source: `${CMPS_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const CMPS_PROBES: SeedProbe[] = [
  {
    conceptId: CMPS,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "Ben and Sara studied hard and passed the exam" a compound sentence, since it contains "and"?',
    choices: [
      { text: 'No — it is simple, with one compound subject and one compound verb, but only one subject-verb pairing overall', isCorrect: true },
      { text: 'Yes — any sentence containing "and" is compound', isCorrect: false, misconceptionId: `${CMPS}:MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE` },
    ],
    correctValue: 'no, simple sentence',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CMPS}:MC-ANY-CONJUNCTION-CREATES-A-COMPOUND-SENTENCE`],
    source: `${CMPS_SRC} — Ben-and-Sara conflict as probe, distractor-mapped`,
  },
  {
    conceptId: CMPS,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "The rain stopped, the sun came out" correctly punctuated?',
    choices: [
      { text: 'No — this is a comma splice; a bare comma cannot join two independent clauses, it needs a coordinating conjunction added, or should use a semicolon instead', isCorrect: true },
      { text: 'Yes — a comma alone is always enough to join two independent clauses', isCorrect: false, misconceptionId: `${CMPS}:MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS` },
    ],
    correctValue: 'no, comma splice',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CMPS}:MC-A-SEMICOLON-AND-A-COMMA-ARE-INTERCHANGEABLE-JOINERS`],
    source: `${CMPS_SRC} — rain-stopped-sun-came-out conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.apostrophes ─────────────────────────────────────────────────
const APOS = 'eng.grammar.apostrophes'
const APOS_SRC = 'docs/curriculum/blueprints/eng.grammar.apostrophes.md'

const APOS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: APOS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Adding an apostrophe to any word ending in "s" is like putting a ' +
      '"FRAGILE" sticker on every box you ship, regardless of whether it ' +
      'actually contains something fragile — the apostrophe has a ' +
      'SPECIFIC job (marking possession or a contraction), and slapping ' +
      'it on everything that happens to end in "s" misuses it. "I have ' +
      'three dog’s" is wrong — that’s just a simple plural (more than one ' +
      'dog), which never needs an apostrophe: "I have three dogs." Before ' +
      'adding an apostrophe, ask: am I showing BELONGING, or SHORTENING ' +
      'two words? If neither, no apostrophe is needed.',
    targetedMisconceptions: [`${APOS}:MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS`],
    source: `${APOS_SRC} — MC-A (P28 three-dogs-vs-dogs-bone conflict)`,
  },
  {
    conceptId: APOS,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Applying one fixed apostrophe-placement rule regardless of ' +
      'singular versus plural is like using the same size lock for a ' +
      'single door and a set of double doors. For a SINGULAR possessor, ' +
      'the apostrophe goes before the "s": "the dog’s bone" (one dog). ' +
      'For a PLURAL possessor already ending in "s," the apostrophe goes ' +
      'AFTER the "s," with no additional s added: "the dogs’ bones" ' +
      '(multiple dogs). The placement depends on whether one or many are ' +
      'doing the possessing.',
    targetedMisconceptions: [`${APOS}:MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL`],
    source: `${APOS_SRC} — MC-B (P28 dogs-bone-vs-dogs-bones conflict)`,
  },
  {
    conceptId: APOS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'An apostrophe has two specific jobs — marking possession or ' +
      'marking omitted letters in a contraction — and never belongs on a ' +
      'simple plural just because a word ends in "s" ("three dogs," not ' +
      '"three dog’s"). Separately, possessive apostrophe placement ' +
      'depends on whether the possessor is singular or plural: singular ' +
      'takes apostrophe-then-s ("the dog’s bone"), while a plural noun ' +
      'already ending in "s" takes the apostrophe after the existing "s" ' +
      'with nothing added ("the dogs’ bones"). One fixed placement rule ' +
      'does not cover both cases.',
    targetedMisconceptions: [
      `${APOS}:MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS`,
      `${APOS}:MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL`,
    ],
    source: `${APOS_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const APOS_PROBES: SeedProbe[] = [
  {
    conceptId: APOS,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does "I have three dog\'s" need an apostrophe?',
    choices: [
      { text: 'No — this is a simple plural (more than one dog), with no possession or contraction; it should be "three dogs"', isCorrect: true },
      { text: 'Yes — any word ending in "s" needs an apostrophe before it', isCorrect: false, misconceptionId: `${APOS}:MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS` },
    ],
    correctValue: 'no apostrophe needed',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${APOS}:MC-A-ADD-AN-APOSTROPHE-BEFORE-ANY-S-AT-THE-END-OF-A-WORD-INCLUDING-SIMPLE-PLURALS`],
    source: `${APOS_SRC} — three-dogs-vs-dogs-bone conflict as probe, distractor-mapped`,
  },
  {
    conceptId: APOS,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Does the apostrophe go in the same place for "the dog\'s bone" (one dog) and "the dogs\' bones" (multiple dogs)?',
    choices: [
      { text: 'No — singular possessive takes apostrophe-then-s ("dog\'s"), while plural possessive already ending in s takes the apostrophe after the s ("dogs\'")', isCorrect: true },
      { text: 'Yes — possessive apostrophes always go in the same place regardless of singular or plural', isCorrect: false, misconceptionId: `${APOS}:MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL` },
    ],
    correctValue: 'no, placement differs',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${APOS}:MC-B-POSSESSIVE-APOSTROPHES-ALWAYS-GO-IN-THE-SAME-PLACE-REGARDLESS-OF-WHETHER-THE-NOUN-IS-SINGULAR-OR-PLURAL`],
    source: `${APOS_SRC} — dogs-bone-vs-dogs-bones conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.quotation-marks ─────────────────────────────────────────────
const QUOT = 'eng.grammar.quotation-marks'
const QUOT_SRC = 'docs/curriculum/blueprints/eng.grammar.quotation-marks.md'

const QUOT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QUOT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Placing quotation marks around indirect speech is like putting a ' +
      'museum’s "authentic artifact" label on a modern replica — ' +
      'quotation marks are a specific promise to the reader that these ' +
      'are someone’s EXACT, verbatim words, not a paraphrase. "She said, ' +
      '\'I am tired.\'" is direct speech, correctly quoted; "She said ' +
      'that she was tired" is indirect speech (a paraphrase, with the ' +
      'pronoun and tense shifted) and should NEVER be quoted. Only ever ' +
      'quote a speaker’s exact, word-for-word statement.',
    targetedMisconceptions: [`${QUOT}:MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO`],
    source: `${QUOT_SRC} — MC-A (P28 she-said-I-am-tired-vs-that-she-was-tired conflict)`,
  },
  {
    conceptId: QUOT,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Punctuation placement relative to quotation marks is a fixed ' +
      'convention, like which side of the road to drive on — within ' +
      'standard American English writing, commas and periods go INSIDE ' +
      'the closing quotation mark, every time: "I am tired," she said — ' +
      'not "I am tired", she said. Treat this as a fixed, memorized rule ' +
      'for this specific writing convention, even when the punctuation ' +
      'isn’t logically part of the quoted words themselves.',
    targetedMisconceptions: [`${QUOT}:MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE`],
    source: `${QUOT_SRC} — MC-B (P28 comma-inside-vs-outside conflict)`,
  },
  {
    conceptId: QUOT,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Quotation marks are reserved exclusively for a speaker’s exact, ' +
      'verbatim words (direct speech) — indirect/reported speech, being a ' +
      'paraphrase with shifted pronouns and tense, should never be ' +
      'quoted. Separately, standard American English convention places ' +
      'commas and periods INSIDE the closing quotation mark as a fixed, ' +
      'memorized rule, regardless of whether the punctuation is logically ' +
      'part of the quoted content — this differs from some other English ' +
      'varieties, but standard American convention is consistent on this ' +
      'point.',
    targetedMisconceptions: [
      `${QUOT}:MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO`,
      `${QUOT}:MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE`,
    ],
    source: `${QUOT_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const QUOT_PROBES: SeedProbe[] = [
  {
    conceptId: QUOT,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Should "She said that she was tired" have quotation marks around "that she was tired"?',
    choices: [
      { text: 'No — this is indirect/reported speech, a paraphrase, which should never be placed in quotation marks', isCorrect: true },
      { text: 'Yes — reported speech should also be placed in quotation marks', isCorrect: false, misconceptionId: `${QUOT}:MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO` },
    ],
    correctValue: 'no, indirect speech is never quoted',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${QUOT}:MC-A-QUOTATION-MARKS-SHOULD-BE-USED-AROUND-INDIRECT-REPORTED-SPEECH-TOO`],
    source: `${QUOT_SRC} — she-said-I-am-tired-vs-that-she-was-tired conflict as probe, distractor-mapped`,
  },
  {
    conceptId: QUOT,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In standard American English convention, where does the comma go in "I am tired" she said — inside or outside the closing quotation mark?',
    choices: [
      { text: 'Inside — standard American convention places the comma before the closing quotation mark: "I am tired," she said', isCorrect: true },
      { text: 'Outside — the comma goes after the closing quotation mark: "I am tired", she said', isCorrect: false, misconceptionId: `${QUOT}:MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE` },
    ],
    correctValue: 'inside the quotation mark',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${QUOT}:MC-B-COMMAS-AND-END-PUNCTUATION-GO-OUTSIDE-THE-CLOSING-QUOTATION-MARK-IN-AMERICAN-ENGLISH-DIALOGUE`],
    source: `${QUOT_SRC} — comma-inside-vs-outside conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.sentence-fragments ─────────────────────────────────────────
const FRAG = 'eng.grammar.sentence-fragments'
const FRAG_SRC = 'docs/curriculum/blueprints/eng.grammar.sentence-fragments.md'

const FRAG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FRAG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Having a subject and verb somewhere in a group of words is like ' +
      'having flour and water somewhere in your kitchen — necessary ' +
      'ingredients, but not automatically a finished dish. "Because the ' +
      'rain started." has a subject ("rain") and a verb ("started"), but ' +
      'is still a fragment — "because" creates an expectation that MORE ' +
      'is coming ("because the rain started... WHAT happened?"). Don’t ' +
      'just check for a subject and a verb — check whether the words ' +
      'express a genuinely COMPLETE thought that doesn’t leave the reader ' +
      'expecting more.',
    targetedMisconceptions: [`${FRAG}:MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT`],
    source: `${FRAG_SRC} — MC-A (P28 because-the-rain-started conflict)`,
  },
  {
    conceptId: FRAG,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Always trying to pad a fragment into its own standalone sentence ' +
      'is like trying to repair a puzzle piece that clearly belongs ' +
      'attached to its neighbor by gluing random extra cardboard onto it ' +
      'instead of just connecting it. "The team celebrated. Because they ' +
      'had finally won the championship." reads awkwardly as two pieces; ' +
      'the natural fix is to JOIN them: "The team celebrated because they ' +
      'had finally won the championship." When you find a fragment, first ' +
      'check whether it logically belongs attached to the sentence right ' +
      'before or after it.',
    targetedMisconceptions: [`${FRAG}:MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP`],
    source: `${FRAG_SRC} — MC-B (P28 team-celebrated-because-they-had-won conflict)`,
  },
  {
    conceptId: FRAG,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'A subject and verb being present does not automatically make a ' +
      'group of words a complete sentence — a subordinate clause like ' +
      '"because the rain started" contains both but still leaves the ' +
      'reader expecting more, since the subordinating word (because, ' +
      'although, when) creates a dependency. Separately, the most natural ' +
      'fix for a fragment is often to JOIN it to the adjacent sentence it ' +
      'logically belongs with, rather than padding it into an artificial ' +
      'standalone sentence — check whether joining reads more naturally ' +
      'before considering other fixes.',
    targetedMisconceptions: [
      `${FRAG}:MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT`,
      `${FRAG}:MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP`,
    ],
    source: `${FRAG_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const FRAG_PROBES: SeedProbe[] = [
  {
    conceptId: FRAG,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'Is "Because the rain started." a complete sentence, since it has a subject ("rain") and a verb ("started")?',
    choices: [
      { text: 'No — it is a fragment; "because" leaves the reader expecting more information about what happened as a result', isCorrect: true },
      { text: 'Yes — any group of words with a subject and a verb somewhere in it is a complete sentence', isCorrect: false, misconceptionId: `${FRAG}:MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT` },
    ],
    correctValue: 'no, fragment',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FRAG}:MC-A-A-GROUP-OF-WORDS-IS-A-COMPLETE-SENTENCE-AS-LONG-AS-IT-HAS-A-SUBJECT-AND-A-VERB-SOMEWHERE-IN-IT`],
    source: `${FRAG_SRC} — because-the-rain-started conflict as probe, distractor-mapped`,
  },
  {
    conceptId: FRAG,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'To fix "The team celebrated. Because they had finally won the championship." should you pad the fragment into its own sentence, or join it to the sentence before it?',
    choices: [
      { text: 'Join it to the sentence before it: "The team celebrated because they had finally won the championship" — this reads far more naturally', isCorrect: true },
      { text: 'Always pad the fragment out into its own standalone complete sentence', isCorrect: false, misconceptionId: `${FRAG}:MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP` },
    ],
    correctValue: 'join to the adjacent sentence',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FRAG}:MC-B-FIXING-A-FRAGMENT-ALWAYS-MEANS-ADDING-MORE-WORDS-TO-THE-SAME-STANDALONE-GROUP`],
    source: `${FRAG_SRC} — team-celebrated-because-they-had-won conflict as probe, distractor-mapped`,
  },
]

// ─── eng.grammar.word-classes-overview ──────────────────────────────────────
const WCLS = 'eng.grammar.word-classes-overview'
const WCLS_SRC = 'docs/curriculum/blueprints/eng.grammar.word-classes-overview.md'

const WCLS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WCLS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Word class is determined by how a word FUNCTIONS in a specific ' +
      'sentence, not by some fixed label attached to the word forever. ' +
      'Many English words (run, light, fast, cut, book) can serve as ' +
      'different word classes depending on their role in context — "run" ' +
      'is a verb in "I run every day" but a noun in "I went for a run." ' +
      'Before labeling a word’s class, check what JOB it’s doing in THIS ' +
      'specific sentence — don’t assume a fixed class based on the word ' +
      'alone.',
    targetedMisconceptions: [`${WCLS}:MC-WORD-CLASS-IS-FIXED-PER-WORD`],
    source: `${WCLS_SRC} — MC-WORD-CLASS-IS-FIXED-PER-WORD (P28 run-as-verb-vs-noun conflict)`,
  },
  {
    conceptId: WCLS,
    subjectSlug: 'english',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.MIDDLE,
    content:
      'Word class is determined by grammatical FUNCTION and POSITION in a ' +
      'sentence — does it take a determiner like "the"? does it show ' +
      'action or being? does it modify another word? — not by whether the ' +
      'underlying concept feels action-like or thing-like. "Arrival" ' +
      'names an event but functions grammatically as a noun in "The ' +
      'arrival surprised everyone," since it takes "the" and acts as the ' +
      'subject — not a verb, even though "arrive" feels action-like.',
    targetedMisconceptions: [`${WCLS}:MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE`],
    source: `${WCLS_SRC} — MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE (P28 arrival-vs-arrive conflict)`,
  },
  {
    conceptId: WCLS,
    subjectSlug: 'english',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.ADULT,
    // Adult-register variant — both misconceptions, no child framing
    content:
      'Word class is not a fixed, permanent label attached to a word — ' +
      'it is determined by the word’s grammatical function in a specific ' +
      'sentence, and many common English words (run, light, book) shift ' +
      'class depending on context. Separately, classification should rely ' +
      'on grammatical signals (determiners, tense marking, modification ' +
      'targets, sentence position) rather than surface meaning or topic — ' +
      '"arrival" functions as a noun despite naming an event, because it ' +
      'takes "the" and serves as the sentence’s subject.',
    targetedMisconceptions: [
      `${WCLS}:MC-WORD-CLASS-IS-FIXED-PER-WORD`,
      `${WCLS}:MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE`,
    ],
    source: `${WCLS_SRC} — both misconceptions, adult register (foundations/03 §5 adult-register guard)`,
  },
]

const WCLS_PROBES: SeedProbe[] = [
  {
    conceptId: WCLS,
    subjectSlug: 'english',
    probeKind: 'mcq',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "I went for a run," is "run" functioning as a verb, the same as in "I run every day"?',
    choices: [
      { text: 'No — here "run" functions as a noun (a thing, taking "a" before it), even though it\'s a verb in "I run every day"', isCorrect: true },
      { text: 'Yes — "run" is always a verb, no matter how it\'s used', isCorrect: false, misconceptionId: `${WCLS}:MC-WORD-CLASS-IS-FIXED-PER-WORD` },
    ],
    correctValue: 'no, noun here',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${WCLS}:MC-WORD-CLASS-IS-FIXED-PER-WORD`],
    source: `${WCLS_SRC} — run-as-verb-vs-noun conflict as probe, distractor-mapped`,
  },
  {
    conceptId: WCLS,
    subjectSlug: 'english',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.MIDDLE,
    stem: 'In "The arrival surprised everyone," is "arrival" a verb, since it describes an action-like event?',
    choices: [
      { text: 'No — "arrival" functions as a noun here; it takes "the" and acts as the sentence\'s subject, regardless of feeling action-like', isCorrect: true },
      { text: 'Yes — if a word\'s meaning is about an action, it must be a verb', isCorrect: false, misconceptionId: `${WCLS}:MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE` },
    ],
    correctValue: 'no, noun',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${WCLS}:MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE`],
    source: `${WCLS_SRC} — arrival-vs-arrive conflict as probe, distractor-mapped`,
  },
]

// ─── Batch export ────────────────────────────────────────────────────────────

export const AUTHORED_EXPLANATIONS: SeedExplanation[] = [
  ...UNITS_EXPLANATIONS,
  ...VEL_EXPLANATIONS,
  ...ACC_EXPLANATIONS,
  ...FORCE_EXPLANATIONS,
  ...N2_EXPLANATIONS,
  ...N3_EXPLANATIONS,
  ...MOM_EXPLANATIONS,
  ...ADD_EXPLANATIONS,
  ...EQN_EXPLANATIONS,
  ...SET_EXPLANATIONS,
  ...SV_EXPLANATIONS,
  ...MUL_EXPLANATIONS,
  ...SUB_EXPLANATIONS,
  ...DIV_EXPLANATIONS,
  ...KIN_EXPLANATIONS,
  ...LOGIC_EXPLANATIONS,
  ...EXPR_EXPLANATIONS,
  ...KIN2_EXPLANATIONS,
  ...WORK_EXPLANATIONS,
  ...KE_EXPLANATIONS,
  ...PE_EXPLANATIONS,
  ...COE_EXPLANATIONS,
  ...COM_EXPLANATIONS,
  ...WET_EXPLANATIONS,
  ...LE1_EXPLANATIONS,
  ...NAT_EXPLANATIONS,
  ...INT_EXPLANATIONS,
  ...CHG_EXPLANATIONS,
  ...COUL_EXPLANATIONS,
  ...OHM_EXPLANATIONS,
  ...SHM_EXPLANATIONS,
  ...WAV_EXPLANATIONS,
  ...FRIC_EXPLANATIONS,
  ...CIRC_EXPLANATIONS,
  ...CUR_EXPLANATIONS,
  ...QUAD_EXPLANATIONS,
  ...EXP_EXPLANATIONS,
  ...FEQ_EXPLANATIONS,
  ...NOUN_EXPLANATIONS,
  ...ART_EXPLANATIONS,
  ...PRES_EXPLANATIONS,
  ...TEMP_EXPLANATIONS,
  ...REFR_EXPLANATIONS,
  ...TRI_EXPLANATIONS,
  ...PROJ_EXPLANATIONS,
  ...GRAV_EXPLANATIONS,
  ...HT_EXPLANATIONS,
  ...ANG_EXPLANATIONS,
  ...PAST_EXPLANATIONS,
  ...FLAW_EXPLANATIONS,
  ...CIRCL_EXPLANATIONS,
  ...FUT_EXPLANATIONS,
  ...FMUL_EXPLANATIONS,
  ...RTRI_EXPLANATIONS,
  ...PREP_EXPLANATIONS,
  ...CPROB_EXPLANATIONS,
  ...LIKE_EXPLANATIONS,
  ...ADJ_EXPLANATIONS,
  ...OOP_EXPLANATIONS,
  ...RAT_EXPLANATIONS,
  ...RATL_EXPLANATIONS,
  ...DCC_EXPLANATIONS,
  ...LENS_EXPLANATIONS,
  ...SVA_EXPLANATIONS,
  ...LIM_EXPLANATIONS,
  ...DRV_EXPLANATIONS,
  ...FUNC_EXPLANATIONS,
  ...PHOT_EXPLANATIONS,
  ...RTT_EXPLANATIONS,
  ...TRIG_EXPLANATIONS,
  ...DOP_EXPLANATIONS,
  ...STW_EXPLANATIONS,
  ...TORQ_EXPLANATIONS,
  ...PFX_EXPLANATIONS,
  ...MMUL_EXPLANATIONS,
  ...CONJ_EXPLANATIONS,
  ...GRP_EXPLANATIONS,
  ...SCHR_EXPLANATIONS,
  ...PASV_EXPLANATIONS,
  ...TDIL_EXPLANATIONS,
  ...PRIME_EXPLANATIONS,
  ...BH_EXPLANATIONS,
  ...COSM_EXPLANATIONS,
  ...MOD_EXPLANATIONS,
  ...MIR_EXPLANATIONS,
  ...CHAIN_EXPLANATIONS,
  ...GRD_EXPLANATIONS,
  ...CONDP_EXPLANATIONS,
  ...EXPV_EXPLANATIONS,
  ...MAXB_EXPLANATIONS,
  ...SPIN_EXPLANATIONS,
  ...COMP_EXPLANATIONS,
  ...ANTID_EXPLANATIONS,
  ...NEG_EXPLANATIONS,
  ...WORD_EXPLANATIONS,
  ...BOHR_EXPLANATIONS,
  ...DEB_EXPLANATIONS,
  ...QF_EXPLANATIONS,
  ...UCIRC_EXPLANATIONS,
  ...DET_EXPLANATIONS,
  ...REP_EXPLANATIONS,
  ...BEAT_EXPLANATIONS,
  ...INTJ_EXPLANATIONS,
  ...SUP_EXPLANATIONS,
  ...SIM_EXPLANATIONS,
  ...SLOPE_EXPLANATIONS,
  ...CAP_EXPLANATIONS,
  ...COORD_EXPLANATIONS,
  ...VEC2_EXPLANATIONS,
  ...DISP_EXPLANATIONS,
  ...FBD_EXPLANATIONS,
  ...NORM_EXPLANATIONS,
  ...EQUIL_EXPLANATIONS,
  ...HOOKE_EXPLANATIONS,
  ...POWR_EXPLANATIONS,
  ...TENS_EXPLANATIONS,
  ...INCL_EXPLANATIONS,
  ...IMP_EXPLANATIONS,
  ...CELAS_EXPLANATIONS,
  ...CINEL_EXPLANATIONS,
  ...ALPHA_EXPLANATIONS,
  ...RHYME_EXPLANATIONS,
  ...BLEND_EXPLANATIONS,
  ...CONS_EXPLANATIONS,
  ...CBL_EXPLANATIONS,
  ...SVOW_EXPLANATIONS,
  ...DGR_EXPLANATIONS,
  ...LVSE_EXPLANATIONS,
  ...SIGHT_EXPLANATIONS,
  ...SYLT_EXPLANATIONS,
  ...DFLU_EXPLANATIONS,
  ...CMASS_EXPLANATIONS,
  ...AKIN_EXPLANATIONS,
  ...MOI_EXPLANATIONS,
  ...RDYN_EXPLANATIONS,
  ...AMOM_EXPLANATIONS,
  ...CAMOM_EXPLANATIONS,
  ...PTM_EXPLANATIONS,
  ...RFLU_EXPLANATIONS,
  ...LCOM_EXPLANATIONS,
  ...MIDT_EXPLANATIONS,
  ...INFR_EXPLANATIONS,
  ...SUMM_EXPLANATIONS,
  ...TSTR_EXPLANATIONS,
  ...GNRC_EXPLANATIONS,
  ...APT_EXPLANATIONS,
  ...PRED_EXPLANATIONS,
  ...SKIM_EXPLANATIONS,
  ...CLRD_EXPLANATIONS,
  ...CCTX_EXPLANATIONS,
  ...CRIT_EXPLANATIONS,
  ...EVSR_EXPLANATIONS,
  ...SSTR_EXPLANATIONS,
  ...PFLU_EXPLANATIONS,
  ...BUOY_EXPLANATIONS,
  ...BERN_EXPLANATIONS,
  ...VISC_EXPLANATIONS,
  ...STEN_EXPLANATIONS,
  ...RAG_EXPLANATIONS,
  ...ACTL_EXPLANATIONS,
  ...GIST_EXPLANATIONS,
  ...LDET_EXPLANATIONS,
  ...FINS_EXPLANATIONS,
  ...NOTE_EXPLANATIONS,
  ...DSND_EXPLANATIONS,
  ...ROLL_EXPLANATIONS,
  ...CONSV_EXPLANATIONS,
  ...GFLD_EXPLANATIONS,
  ...GPOT_EXPLANATIONS,
  ...ESCV_EXPLANATIONS,
  ...KEPL_EXPLANATIONS,
  ...LCST_EXPLANATIONS,
  ...CRLIS_EXPLANATIONS,
  ...PRON_EXPLANATIONS,
  ...STYP_EXPLANATIONS,
  ...PHR_EXPLANATIONS,
  ...TCON_EXPLANATIONS,
  ...CLAU_EXPLANATIONS,
  ...COND_EXPLANATIONS,
  ...PART_EXPLANATIONS,
  ...PAAG_EXPLANATIONS,
  ...ENDP_EXPLANATIONS,
  ...SSEN_EXPLANATIONS,
  ...CUSE_EXPLANATIONS,
  ...WREC_EXPLANATIONS,
  ...HAND_EXPLANATIONS,
  ...NARR_EXPLANATIONS,
  ...MEDL_EXPLANATIONS,
  ...SNDO_EXPLANATIONS,
  ...CMPS_EXPLANATIONS,
  ...APOS_EXPLANATIONS,
  ...QUOT_EXPLANATIONS,
  ...FRAG_EXPLANATIONS,
  ...WCLS_EXPLANATIONS,
]

export const AUTHORED_PROBES: SeedProbe[] = [
  ...UNITS_PROBES,
  ...VEL_PROBES,
  ...ACC_PROBES,
  ...FORCE_PROBES,
  ...N2_PROBES,
  ...N3_PROBES,
  ...MOM_PROBES,
  ...ADD_PROBES,
  ...EQN_PROBES,
  ...SET_PROBES,
  ...SV_PROBES,
  ...MUL_PROBES,
  ...SUB_PROBES,
  ...DIV_PROBES,
  ...KIN_PROBES,
  ...LOGIC_PROBES,
  ...EXPR_PROBES,
  ...KIN2_PROBES,
  ...WORK_PROBES,
  ...KE_PROBES,
  ...PE_PROBES,
  ...COE_PROBES,
  ...COM_PROBES,
  ...WET_PROBES,
  ...LE1_PROBES,
  ...NAT_PROBES,
  ...INT_PROBES,
  ...CHG_PROBES,
  ...COUL_PROBES,
  ...OHM_PROBES,
  ...SHM_PROBES,
  ...WAV_PROBES,
  ...FRIC_PROBES,
  ...CIRC_PROBES,
  ...CUR_PROBES,
  ...QUAD_PROBES,
  ...EXP_PROBES,
  ...FEQ_PROBES,
  ...NOUN_PROBES,
  ...ART_PROBES,
  ...PRES_PROBES,
  ...TEMP_PROBES,
  ...REFR_PROBES,
  ...TRI_PROBES,
  ...PROJ_PROBES,
  ...GRAV_PROBES,
  ...HT_PROBES,
  ...ANG_PROBES,
  ...PAST_PROBES,
  ...FLAW_PROBES,
  ...CIRCL_PROBES,
  ...FUT_PROBES,
  ...FMUL_PROBES,
  ...RTRI_PROBES,
  ...PREP_PROBES,
  ...CPROB_PROBES,
  ...LIKE_PROBES,
  ...ADJ_PROBES,
  ...OOP_PROBES,
  ...RAT_PROBES,
  ...RATL_PROBES,
  ...DCC_PROBES,
  ...LENS_PROBES,
  ...SVA_PROBES,
  ...LIM_PROBES,
  ...DRV_PROBES,
  ...FUNC_PROBES,
  ...PHOT_PROBES,
  ...RTT_PROBES,
  ...TRIG_PROBES,
  ...DOP_PROBES,
  ...STW_PROBES,
  ...TORQ_PROBES,
  ...PFX_PROBES,
  ...MMUL_PROBES,
  ...CONJ_PROBES,
  ...GRP_PROBES,
  ...SCHR_PROBES,
  ...PASV_PROBES,
  ...TDIL_PROBES,
  ...PRIME_PROBES,
  ...BH_PROBES,
  ...COSM_PROBES,
  ...MOD_PROBES,
  ...MIR_PROBES,
  ...CHAIN_PROBES,
  ...GRD_PROBES,
  ...CONDP_PROBES,
  ...EXPV_PROBES,
  ...MAXB_PROBES,
  ...SPIN_PROBES,
  ...COMP_PROBES,
  ...ANTID_PROBES,
  ...NEG_PROBES,
  ...WORD_PROBES,
  ...BOHR_PROBES,
  ...DEB_PROBES,
  ...QF_PROBES,
  ...UCIRC_PROBES,
  ...DET_PROBES,
  ...REP_PROBES,
  ...BEAT_PROBES,
  ...INTJ_PROBES,
  ...SUP_PROBES,
  ...SIM_PROBES,
  ...SLOPE_PROBES,
  ...CAP_PROBES,
  ...COORD_PROBES,
  ...VEC2_PROBES,
  ...DISP_PROBES,
  ...FBD_PROBES,
  ...NORM_PROBES,
  ...EQUIL_PROBES,
  ...HOOKE_PROBES,
  ...POWR_PROBES,
  ...TENS_PROBES,
  ...INCL_PROBES,
  ...IMP_PROBES,
  ...CELAS_PROBES,
  ...CINEL_PROBES,
  ...ALPHA_PROBES,
  ...RHYME_PROBES,
  ...BLEND_PROBES,
  ...CONS_PROBES,
  ...CBL_PROBES,
  ...SVOW_PROBES,
  ...DGR_PROBES,
  ...LVSE_PROBES,
  ...SIGHT_PROBES,
  ...SYLT_PROBES,
  ...DFLU_PROBES,
  ...CMASS_PROBES,
  ...AKIN_PROBES,
  ...MOI_PROBES,
  ...RDYN_PROBES,
  ...AMOM_PROBES,
  ...CAMOM_PROBES,
  ...PTM_PROBES,
  ...RFLU_PROBES,
  ...LCOM_PROBES,
  ...MIDT_PROBES,
  ...INFR_PROBES,
  ...SUMM_PROBES,
  ...TSTR_PROBES,
  ...GNRC_PROBES,
  ...APT_PROBES,
  ...PRED_PROBES,
  ...SKIM_PROBES,
  ...CLRD_PROBES,
  ...CCTX_PROBES,
  ...CRIT_PROBES,
  ...EVSR_PROBES,
  ...SSTR_PROBES,
  ...PFLU_PROBES,
  ...BUOY_PROBES,
  ...BERN_PROBES,
  ...VISC_PROBES,
  ...STEN_PROBES,
  ...RAG_PROBES,
  ...ACTL_PROBES,
  ...GIST_PROBES,
  ...LDET_PROBES,
  ...FINS_PROBES,
  ...NOTE_PROBES,
  ...DSND_PROBES,
  ...ROLL_PROBES,
  ...CONSV_PROBES,
  ...GFLD_PROBES,
  ...GPOT_PROBES,
  ...ESCV_PROBES,
  ...KEPL_PROBES,
  ...LCST_PROBES,
  ...CRLIS_PROBES,
  ...PRON_PROBES,
  ...STYP_PROBES,
  ...PHR_PROBES,
  ...TCON_PROBES,
  ...CLAU_PROBES,
  ...COND_PROBES,
  ...PART_PROBES,
  ...PAAG_PROBES,
  ...ENDP_PROBES,
  ...SSEN_PROBES,
  ...CUSE_PROBES,
  ...WREC_PROBES,
  ...HAND_PROBES,
  ...NARR_PROBES,
  ...MEDL_PROBES,
  ...SNDO_PROBES,
  ...CMPS_PROBES,
  ...APOS_PROBES,
  ...QUOT_PROBES,
  ...FRAG_PROBES,
  ...WCLS_PROBES,
]

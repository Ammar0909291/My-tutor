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
]

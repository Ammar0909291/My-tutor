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
]

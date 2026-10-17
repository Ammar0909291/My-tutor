/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 6 (phys.wave and phys.mech part 1, 18 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 166 of 283 physics concepts held fewer than three authored cards with
 * 3+ options (215 cards short). Owner decision 3 (2026-10-07, `turnContract.certifiesMastery`)
 * makes a 2-option card practice-only once a concept holds three such cards, so a blind guess
 * on the remaining 2-option cards would otherwise still count towards mastery. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit existing
 * identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the
 * idea of one of the concept's registered misconceptions (ids read off the concept's own
 * existing probes, so none is invented) carries that id; any other wrong answer carries no id.
 * Every stem is a NEW worked example. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Library, Replacement and
 * Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each concept in this batch holds mcq, misconception_probe, checkpoint and short_answer probes (plus a four-option card) at its own band, so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'physics'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'mcq' | 'misconception_probe' | 'true_false' | 'checkpoint' | 'step_check' | 'short_answer' | 'fill_blank' | 'numeric'

function card(
  conceptId: string,
  kind: Kind,
  band: GradeBand,
  stem: string,
  correct: string,
  wrongA: [text: string, misconception: string],
  wrongB: [text: string, misconception: string],
  note: string,
): SeedProbe {
  const id = (m: string) => `${conceptId}:${m}`
  const wrong = (w: [string, string]) => ({ text: w[0], isCorrect: false, ...(w[1] ? { misconceptionId: id(w[1]) } : {}) })
  return {
    conceptId, subjectSlug: S, probeKind: kind, gradeBand: band,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem,
    choices: [{ text: correct, isCorrect: true }, wrong(wrongA), wrong(wrongB)],
    targetedMisconceptions: [wrongA, wrongB].filter((w) => w[1]).map((w) => id(w[1])),
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Library; ${note}`,
  }
}

export const PHYSICS_CARD_DEPTH_BATCH_6: SeedProbe[] = [
  // ─── phys.wave.superposition ─────────────────────────────────────────────
  card('phys.wave.superposition', 'step_check', H,
    'Two separate lamps both emit light of the same colour. Do they produce a steady interference pattern?',
    'No: independent sources are not coherent',
    ['Yes, any two sources of the same frequency are coherent', 'MC-ANY-SAME-FREQ-IS-COHERENT'],
    ['Yes, but only when the room is dark', ''],
    'same frequency is not enough for coherence, re-asked with two lamps'),

  // ─── phys.mech.equilibrium ───────────────────────────────────────────────
  card('phys.mech.equilibrium', 'step_check', H,
    'A 4 m uniform beam weighing 100 N rests on a support at each end. What force does each support exert?',
    '50 N each: ΣF = 0 gives R_A + R_B = 100 N, and torques about one end give R_B = 50 N',
    ['Any pair of forces adding to 100 N will do, since ΣF = 0 is all that equilibrium needs', 'MC-ONE-CONDITION'],
    ['25 N each, one quarter of the weight at each end', ''],
    'equilibrium needs ΣF = 0 and Στ = 0, re-asked with a beam on two supports'),
  card('phys.mech.equilibrium', 'fill_blank', H,
    'Complete the sentence: when taking torques for a beam in equilibrium, the pivot point can be placed ____.',
    'anywhere, since the net torque is zero about every point',
    ['only at a physical support or hinge of the beam', 'MC-PIVOT-FIXED'],
    ['only at the centre of mass of the beam', ''],
    'the torque pivot is a free choice, re-asked as a completion'),

  // ─── phys.mech.collisions-inelastic ──────────────────────────────────────
  card('phys.mech.collisions-inelastic', 'step_check', H,
    'A 3 kg cart moving at 4 m/s hits a 1 kg cart at rest, and they stick. What is their common speed?',
    '3 m/s: the momentum of 12 kg·m/s is shared by 4 kg',
    ['0, since a perfectly inelastic collision brings both carts to rest', 'MC-PERFECTLY-INELASTIC-ZERO-VELOCITY'],
    ['2 m/s, the average of 4 m/s and 0', ''],
    'momentum is conserved when carts stick, re-asked with 3 kg and 1 kg'),
  card('phys.mech.collisions-inelastic', 'fill_blank', H,
    'Complete the sentence: in an inelastic collision, ____ is conserved and ____ is not.',
    'momentum; kinetic energy',
    ['kinetic energy; momentum, which is lost as heat and sound', 'MC-MOMENTUM-LOST-INELASTIC'],
    ['neither; both are partly lost as heat and sound', ''],
    'momentum is always conserved, re-asked as a completion'),

  // ─── phys.mech.center-of-mass ────────────────────────────────────────────
  card('phys.mech.center-of-mass', 'step_check', H,
    'A 4 kg mass at (0, 0) and a 1 kg mass at (5, 5) are joined by a light rod. Where is the centre of mass, in metres?',
    '(1, 1), close to the heavy mass',
    ['(2.5, 2.5), halfway between the masses, since the centre of mass is the geometric centre', 'MC-COM-IS-GEOMETRIC-CENTRE'],
    ['(4, 4), close to the light mass', ''],
    'the centre of mass is mass-weighted, re-asked with a 4 kg and a 1 kg mass'),
  card('phys.mech.center-of-mass', 'fill_blank', H,
    'Complete the sentence: the velocity of the centre of mass of masses m₁ and m₂ is ____.',
    '(m₁v₁ + m₂v₂)/(m₁ + m₂): total momentum over total mass',
    ['v₁ + v₂, the sum of the two velocities', 'MC-COM-VELOCITY-SUM'],
    ['(v₁ + v₂)/2, the simple average of the velocities of the two parts', ''],
    'the centre-of-mass velocity is momentum over mass, re-asked as a completion'),

  // ─── phys.mech.angular-kinematics ────────────────────────────────────────
  card('phys.mech.angular-kinematics', 'step_check', H,
    'A wheel spins at 120 revolutions per minute. What is ω in rad/s?',
    'About 12.6 rad/s (4π)',
    ['720 rad/s, found by converting revolutions to degrees instead of radians', 'MC-DEGREES-NOT-RADIANS'],
    ['2 rad/s, found by dividing 120 by 60 and nothing else', ''],
    'angular speed is in radians per second, re-asked with 120 rev/min'),
  card('phys.mech.angular-kinematics', 'fill_blank', H,
    'Complete the sentence: on a rotating rigid disc, a point at twice the radius has ____ tangential speed and ____ angular speed.',
    'twice the; the same',
    ['the same; twice the', 'MC-SAME-TANGENTIAL'],
    ['twice the; twice the', ''],
    'all points share ω while v = rω grows with radius, re-asked as a completion'),

  // ─── phys.mech.moment-of-inertia ─────────────────────────────────────────
  card('phys.mech.moment-of-inertia', 'step_check', H,
    'Two solid discs, both of mass 2 kg, have radii 0.2 m and 0.4 m. Which has the greater moment of inertia?',
    'The 0.4 m disc (0.16 against 0.04 kg·m²)',
    ['They are equal, since both discs have the same mass', 'MC-I-IS-MASS'],
    ['The 0.2 m disc, since a smaller disc is harder to spin', ''],
    'moment of inertia depends on mass distribution, re-asked with two discs'),

  // ─── phys.mech.rotational-dynamics ───────────────────────────────────────
  card('phys.mech.rotational-dynamics', 'step_check', H,
    'The same torque of 6 N·m acts on two discs, with I = 1 and I = 3 kg·m². What are their angular accelerations?',
    '6 rad/s² and 2 rad/s²: α = τ/I, so the larger I gives the smaller α',
    ['Both are 6 rad/s², since the torque is the same', 'MC-ALPHA-EQUALS-TORQUE'],
    ['2 rad/s² and 6 rad/s², since a larger I accelerates more', ''],
    'α = τ/I, re-asked with I = 1 and 3'),
  card('phys.mech.rotational-dynamics', 'fill_blank', H,
    'Complete the sentence: a flywheel with I = 2 kg·m² turning at 10 rad/s stores kinetic energy of ____.',
    '100 J, from ½Iω², although its centre does not move',
    ['0, since its centre of mass has zero velocity', 'MC-ROTATIONAL-KE-IGNORED'],
    ['200 J, from Iω²', ''],
    'rotational kinetic energy is ½Iω², re-asked with a flywheel'),

  // ─── phys.mech.angular-momentum ──────────────────────────────────────────
  card('phys.mech.angular-momentum', 'step_check', H,
    'A 2 kg ball circles at a radius of 0.5 m with speed 3 m/s. What is its angular momentum about the centre?',
    '3 kg·m²/s, from L = mvr',
    ['6, which is just ω in rad/s, taking angular momentum to be the angular velocity', 'MC-L-IS-OMEGA'],
    ['1.5 kg·m²/s, from L = ½mvr', ''],
    'L is not ω, re-asked with a ball on a circle'),
  card('phys.mech.angular-momentum', 'fill_blank', H,
    'Complete the sentence: a torque on a spinning gyroscope changes its angular momentum ____.',
    'in direction as well as size, so the axis precesses',
    ['only in size, since a torque can only make a spin faster or slower', 'MC-TORQUE-CHANGES-SPEED'],
    ['never, since angular momentum is always conserved', ''],
    'torque changes L as a vector, re-asked with a gyroscope'),

  // ─── phys.mech.buoyancy ──────────────────────────────────────────────────
  card('phys.mech.buoyancy', 'step_check', H,
    'A 5 kg metal cube of volume 0.001 m³ is fully submerged in water. What is the buoyant force?',
    '9.8 N: the weight of the 1 litre of water it displaces',
    ['49 N, the weight of the cube itself', 'MC-BUOYANCY-WEIGHT'],
    ['4.9 N, half of the displaced weight', ''],
    'buoyancy equals the displaced fluid\'s weight, re-asked with a 5 kg cube'),
  card('phys.mech.buoyancy', 'fill_blank', H,
    'Complete the sentence: for a rigid, fully submerged object, the buoyant force ____ as it is lowered deeper.',
    'stays the same, set by the displaced volume and fluid density',
    ['grows, since the pressure increases with depth below the surface', 'MC-BUOYANCY-PROPORTIONAL-TO-DEPTH'],
    ['falls, since the water above it pushes down more and more', ''],
    'buoyancy does not depend on depth, re-asked as a completion'),

  // ─── phys.mech.bernoulli ─────────────────────────────────────────────────
  card('phys.mech.bernoulli', 'step_check', H,
    'Water at 2 m/s in a 0.04 m² horizontal pipe enters a 0.01 m² section. What happens to the pressure there?',
    'It falls by about 30 kPa, since the speed rises to 8 m/s',
    ['It rises by about 30 kPa, since faster water pushes harder', 'MC-FASTER-MEANS-HIGHER-PRESSURE'],
    ['It stays the same, since the pipe is horizontal', ''],
    'faster flow means lower pressure, re-asked with a narrowing pipe'),

  // ─── phys.mech.viscosity ─────────────────────────────────────────────────
  card('phys.mech.viscosity', 'step_check', H,
    'Engine oil is warmed from 20 °C to 100 °C. What happens to its viscosity?',
    'It falls sharply: liquids flow more easily when warm',
    ['It stays the same, since viscosity is a fixed property of the liquid', 'MC-VISCOSITY-CONSTANT-TEMPERATURE'],
    ['It rises, since warm oil is thicker', ''],
    'viscosity depends on temperature, re-asked with engine oil'),
]

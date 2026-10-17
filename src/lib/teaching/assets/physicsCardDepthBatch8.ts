/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 8 (phys.em part 2, 12 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds mcq, misconception_probe (and, for most, checkpoint and short_answer) probes at its own band, so the new cards take the FREE slot step_check at that band (the kind is only a slot label).
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

export const PHYSICS_CARD_DEPTH_BATCH_8: SeedProbe[] = [
  card('phys.em.capacitance', 'step_check', H,
    'A 3 μF and a 6 μF capacitor are connected in series. What is the equivalent capacitance?',
    '2 μF: 1/C = 1/3 + 1/6, smaller than either',
    ['9 μF, found by adding the two values directly', 'MC-SERIES-CAPACITORS-ADD-DIRECTLY'],
    ['4.5 μF, the average of the two values', ''],
    'series capacitances combine as reciprocals, re-asked with 3 μF and 6 μF'),
  card('phys.em.gauss-law', 'step_check', H,
    'In electrostatic equilibrium, where does excess charge sit on a solid conductor, and what is E inside the metal?',
    'On the outer surface, and E = 0 inside the metal',
    ['Spread through the volume, with E largest at the centre', 'MC-E-FIELD-INSIDE-CONDUCTOR-IS-NOT-ZERO'],
    ['On the outer surface, with E largest just inside the surface', ''],
    'E is zero inside a conductor in equilibrium, re-asked with where the charge sits'),
  card('phys.em.electric-dipole', 'step_check', H,
    'At which angle to a uniform field is the potential energy of an electric dipole lowest?',
    'θ = 0°, aligned with the field, where U = −pE',
    ['θ = 90°, where the torque on the dipole is greatest', ''],
    ['θ = 180°, where the dipole points against the field', ''],
    'U = −pE cos θ is lowest when the dipole is aligned with the field'),
  card('phys.em.energy-capacitor', 'step_check', H,
    'Where is the energy of a charged parallel-plate capacitor stored?',
    'In the electric field between the plates',
    ['On the plates themselves, as the charge that sits there', 'MC-ENERGY-STORED-ON-THE-PLATES'],
    ['In the wires that connect the capacitor to the circuit', ''],
    'the energy is stored in the field, re-asked as where'),
  card('phys.em.dielectrics', 'step_check', H,
    'A dielectric with κ = 3 is slid into a capacitor that stays connected to its battery. What happens to the charge on the plates?',
    'It triples: the battery holds V fixed while C triples',
    ['It stays the same, since the charge on a capacitor is always fixed', 'MC-Q-CONSTANT-REGARDLESS-OF-BATTERY'],
    ['It falls to a third, since the dielectric takes up some of the charge', ''],
    'whether Q or V is fixed depends on the battery, re-asked with the battery connected'),
  card('phys.em.kirchhoffs-laws', 'step_check', H,
    'Currents of 5 A and 2 A enter a junction, and 3 A leaves along one branch. What flows along the remaining branch?',
    '4 A out of the junction, since charge is conserved and inflow equals outflow',
    ['10 A, found by adding all three of the currents', ''],
    ['0 A, since the currents entering and leaving cancel out', ''],
    'Kirchhoff\'s current law, re-asked with 5 A, 2 A and 3 A'),
  card('phys.em.emf', 'step_check', H,
    'A 12 V battery with internal resistance 0.5 Ω supplies 4 A. What is its terminal voltage?',
    '10 V, from V = ε − Ir = 12 − 4 × 0.5',
    ['12 V, since a battery always delivers its full emf at its terminals', 'MC-TERMINAL-VOLTAGE-EQUALS-EMF'],
    ['14 V, found by adding the internal drop to the emf', ''],
    'terminal voltage is below the emf under load, re-asked with a 12 V battery'),
  card('phys.em.magnetic-field', 'step_check', H,
    'Which statement about magnetic field lines is correct?',
    'They form closed loops, running from north to south outside the magnet and back through it',
    ['They start at the north pole and end at the south pole, like electric field lines on charges', 'MC-MAGNETIC-FIELD-LINES-COME-FROM-NORTH-POLE'],
    ['They run only outside the magnet and stop at its surface', ''],
    'magnetic field lines are closed loops, re-asked as a statement'),
  card('phys.em.biot-savart', 'step_check', H,
    'A long straight wire gives B = 1 × 10⁻⁵ T at 0.1 m. What is B at 0.2 m?',
    '5 × 10⁻⁶ T: halved, since B ∝ 1/r for a long wire',
    ['2.5 × 10⁻⁶ T: quartered, since B ∝ 1/r² for every geometry', 'MC-B-FALLS-OFF-AS-1/R-SQUARED-FOR-ALL-GEOMETRIES'],
    ['2 × 10⁻⁵ T: doubled, since the field grows with distance', ''],
    'the field of a long wire falls as 1/r, re-asked with 0.1 m to 0.2 m'),
  card('phys.em.amperes-law', 'step_check', H,
    'For which current distribution can Ampère\'s law give B directly?',
    'A long straight wire or a solenoid: the symmetry lets B come out of the integral',
    ['Any current distribution, however irregular its shape', 'MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES'],
    ['Only a single moving point charge', ''],
    'Ampère\'s law needs symmetry to be useful, re-asked as which distributions'),
  card('phys.em.faradays-law', 'step_check', H,
    'The flux through a 50-turn coil falls from 0.06 Wb to 0.02 Wb in 0.4 s. What is the average emf?',
    '5 V, from ε = NΔΦ/Δt = 50 × 0.04/0.4',
    ['0.1 V, which leaves out the 50 turns', ''],
    ['0.05 V, found by dividing the final flux by the time', ''],
    'Faraday\'s law with N turns, re-asked with 0.06 Wb to 0.02 Wb'),
  card('phys.em.lenzs-law', 'step_check', H,
    'Flux into the page through a loop is increasing. Which way does the induced current flow?',
    'Counter-clockwise: its own field points out of the page, opposing the increase',
    ['Clockwise, so that the induced field adds to the increasing flux', 'MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT'],
    ['None: no current flows while the flux is not zero', ''],
    'Lenz\'s law opposes the change in flux, re-asked with increasing flux into the page'),
]

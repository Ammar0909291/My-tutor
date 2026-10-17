/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 9 (phys.meas, phys.em part 3, 15 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds mcq and misconception_probe probes (and, for most, checkpoint and short_answer) at its own band, so the new cards take the FREE slot step_check at that band (phys.meas.vector-products already holds a step_check, so it takes fill_blank and numeric; the kind is only a slot label).
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

export const PHYSICS_CARD_DEPTH_BATCH_9: SeedProbe[] = [
  // ─── phys.meas.vector-products (step_check already used) ─────────────────
  card('phys.meas.vector-products', 'fill_blank', H,
    'Complete the sentence: the work done by a force is F·d, which is a ____ product, so work is a ____.',
    'dot; scalar',
    ['cross; vector, since work has a direction like torque', 'MC-DOT-CROSS-CONFUSION'],
    ['dot; vector, since force and displacement are both vectors', ''],
    'MC-DOT-CROSS-CONFUSION work is a dot product, re-asked as a completion'),
  card('phys.meas.vector-products', 'numeric', H,
    'Vectors a = (2, 0) and b = (0, 3) are perpendicular. What are a·b and |a × b|?',
    'a·b = 0 and |a × b| = 6: perpendicular vectors have a zero dot product',
    ['a·b = 6 and |a × b| = 6, since multiplying vectors just multiplies their sizes', 'MC-SCALAR-MULTIPLY'],
    ['a·b = 6 and |a × b| = 0, which mixes up the two products', 'MC-DOT-CROSS-CONFUSION'],
    'MC-SCALAR-MULTIPLY and MC-DOT-CROSS-CONFUSION, re-asked with perpendicular vectors'),

  // ─── phys.em.mutual-inductance ───────────────────────────────────────────
  card('phys.em.mutual-inductance', 'step_check', H,
    'An ideal transformer has 100 primary and 500 secondary turns, with 24 V and 0.5 A on the primary. What are the secondary voltage and current?',
    '120 V and 0.1 A: ×5 voltage, ÷5 current, power unchanged at 12 W',
    ['120 V and 0.5 A, so the power rises to 60 W', 'MC-TRANSFORMER-CAN-AMPLIFY-POWER'],
    ['4.8 V and 2.5 A, since a larger secondary winding lowers the voltage', ''],
    'a transformer does not amplify power, re-asked with 24 V and 0.5 A'),

  // ─── phys.em.magnetic-flux ───────────────────────────────────────────────
  card('phys.em.magnetic-flux', 'step_check', H,
    'A loop of area 0.1 m² sits in a 0.5 T field, with the field at 60° to the normal of the loop. What is the flux?',
    '0.025 Wb: Φ = BA cos θ, with θ measured from the normal',
    ['0.5, since the flux is just the strength of the field', 'MC-FLUX-IS-THE-FIELD-STRENGTH'],
    ['0.043 Wb, found by using cos 30° instead of cos 60°', ''],
    'MC-FLUX-IS-THE-FIELD-STRENGTH flux is BA cos θ, re-asked with a tilted loop'),

  // ─── phys.em.magnetic-materials ──────────────────────────────────────────
  card('phys.em.magnetic-materials', 'step_check', H,
    'Which of aluminium, copper, iron and gold is strongly attracted to a magnet?',
    'Iron, the only ferromagnetic one of the four',
    ['All four, because every metal is magnetic', 'MC-ALL-METALS-ARE-MAGNETIC'],
    ['Copper and aluminium, since they conduct best', ''],
    'MC-ALL-METALS-ARE-MAGNETIC only some metals are magnetic, re-asked with four metals'),

  // ─── phys.em.self-inductance ─────────────────────────────────────────────
  card('phys.em.self-inductance', 'step_check', H,
    'Inductor A has L = 2 H at 1 A; inductor B has L = 0.5 H at 3 A. Which stores more energy?',
    'B: U = ½LI² gives 2.25 J against 1 J',
    ['A, because it has the larger inductance', 'MC-LARGER-L-MEANS-MORE-ENERGY-STORED-AT-ALL-TIMES'],
    ['Equal, since both are inductors in the same kind of circuit', ''],
    'stored energy depends on L and I, re-asked with 2 H at 1 A and 0.5 H at 3 A'),

  // ─── phys.em.ac-basics ───────────────────────────────────────────────────
  card('phys.em.ac-basics', 'step_check', H,
    'An AC supply has V_rms = 120 V. What is its peak voltage?',
    'About 170 V: V_peak = √2 × V_rms',
    ['About 188 V, treating 120 V as the average value of the waveform', 'MC-RMS-IS-THE-AVERAGE-OF-THE-WAVEFORM'],
    ['120 V, since peak and RMS values are the same', ''],
    'RMS is not the average, re-asked with V_rms = 120 V'),

  // ─── phys.em.electrical-power ────────────────────────────────────────────
  card('phys.em.electrical-power', 'step_check', H,
    'Resistors of 10 Ω and 40 Ω are connected in parallel across 20 V. Which dissipates more power?',
    'The 10 Ω resistor: P = V²/R gives 40 W against 10 W',
    ['The 40 Ω resistor, since a higher resistance always dissipates more power', 'MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER'],
    ['Both equally, since they share the same voltage', ''],
    'the answer depends on the circuit, re-asked with 10 Ω and 40 Ω in parallel'),

  // ─── phys.em.electromagnetic-waves ───────────────────────────────────────
  card('phys.em.electromagnetic-waves', 'step_check', H,
    'Sunlight crosses about 150 million km of vacuum to reach Earth. What does this show?',
    'EM waves need no medium: changing E and B fields sustain each other',
    ['A thin aether must fill space for the light to travel through', 'MC-EM-WAVES-REQUIRE-A-MEDIUM'],
    ['Light is a stream of matter and not a wave at all', ''],
    'EM waves need no medium, re-asked with sunlight'),

  // ─── phys.em.lc-circuits ─────────────────────────────────────────────────
  card('phys.em.lc-circuits', 'step_check', H,
    'An LC circuit has L = 4 mH and C = 100 μF. What is its resonant frequency f = 1/(2π√LC)?',
    'About 250 Hz',
    ['About 1,580 Hz, which is the angular frequency in rad/s and not f', ''],
    ['About 6.3 kHz, from leaving the square root out', ''],
    'resonant frequency of an LC circuit, re-asked with 4 mH and 100 μF'),

  // ─── phys.em.magnetic-dipole ─────────────────────────────────────────────
  card('phys.em.magnetic-dipole', 'step_check', H,
    'A coil of 50 turns, area 2 × 10⁻³ m², carries 0.4 A. What is its magnetic dipole moment?',
    '0.04 A·m², from m = NIA',
    ['0.0008 A·m², which leaves out the 50 turns', ''],
    ['0.4 A·m², which ignores the area of the coil', ''],
    'the dipole moment is NIA, re-asked with a 50-turn coil'),

  // ─── phys.em.maxwells-equations ──────────────────────────────────────────
  card('phys.em.maxwells-equations', 'step_check', H,
    'A parallel-plate capacitor is charged by a current I. What is the displacement current between its plates?',
    'Equal to I: ε₀ dΦ_E/dt matches the current feeding the plates',
    ['Electrons physically cross the gap at a rate I, so it is a real current', 'MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT'],
    ['Zero, because there is no conduction in the gap', ''],
    'displacement current is a changing field and not a flow of charge, re-asked for a charging capacitor'),

  // ─── phys.em.rc-circuits ─────────────────────────────────────────────────
  card('phys.em.rc-circuits', 'step_check', H,
    'R = 10 kΩ and C = 100 μF. What is τ, and how far has the capacitor charged after one τ?',
    'τ = 1 s, and it has reached about 63% of its final voltage',
    ['τ = 10⁴ s, set by the value of R alone', 'MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R'],
    ['τ = 1 s, and the capacitor is fully charged after one τ has passed', ''],
    'τ = RC, re-asked with 10 kΩ and 100 μF'),

  // ─── phys.em.potentiometer ───────────────────────────────────────────────
  card('phys.em.potentiometer', 'step_check', H,
    'A cell balances at 75 cm on open circuit, and at 60 cm with a load connected. What does the 75 cm length measure?',
    'The cell\'s emf, since no current is drawn at balance; 60 cm gives the terminal voltage',
    ['The terminal voltage, since a potentiometer only ever measures the voltage at the terminals', 'MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE'],
    ['The voltage lost across the internal resistance of the cell', ''],
    'a potentiometer measures the emf at null, re-asked with 75 cm and 60 cm'),

  // ─── phys.meas.vector-addition ───────────────────────────────────────────
  card('phys.meas.vector-addition', 'step_check', H,
    'Two forces of 6 N act on a point, 120° apart. What is the resultant?',
    '6 N: at 120° the resultant of two equal vectors equals either of them',
    ['12 N, the arithmetic sum of the two magnitudes', 'MC-SCALAR-SUM'],
    ['More than 6 N, since a resultant is always larger than either vector', 'MC-RESULTANT-ALWAYS-LARGER'],
    'vectors add geometrically, re-asked with two 6 N forces at 120°'),
]

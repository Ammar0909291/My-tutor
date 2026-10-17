/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 16 (chem.found.concentration, chem.thermo.enthalpy, chem.atomic.orbitals, chem.kinet.arrhenius and chem.thermo.gibbs (need-two concepts), 10 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: most chemistry concepts hold fewer than three authored cards
 * with 3+ options (151 of 186 concepts, 247 cards short). Owner decision 3 (2026-10-07,
 * `turnContract.certifiesMastery`) makes a 2-option card practice-only once a concept
 * holds three such cards, so a blind guess on the remaining 2-option cards would
 * otherwise still count towards mastery. Owner decision (2026-10-17, "go ahead"): ADD
 * new 3-option cards (Path A) rather than edit existing identities, so the create-only
 * bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for each of two of the
 * concept's registered misconceptions (ids read off the concept's own existing probes,
 * so none is invented); a wrong answer that matches no registered misconception carries
 * no id. Every stem is a NEW worked example. Facts come only from the concept's
 * blueprint (docs/curriculum/blueprints/<concept>.md — Misconception Library,
 * Replacement and Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each chemistry concept in this batch already holds one three-option mcq and one two-option card in each of misconception_probe, checkpoint, step_check and true_false, so it receives two cards in the FREE slots short_answer and fill_blank (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'chemistry'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'short_answer' | 'fill_blank' | 'true_false' | 'step_check' | 'numeric'

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

export const CHEMISTRY_CARD_DEPTH_BATCH_16: SeedProbe[] = [
  // ─── chem.found.concentration ────────────────────────────────────────────
  card('chem.found.concentration', 'short_answer', H,
    'A solution is made by dissolving 10.0 g NaCl in 500.0 g of water. Which concentration formula applies, and why?',
    'Molality, because its denominator is the 0.5000 kg of solvent; "to make 500.0 mL of solution" would mean molarity',
    ['Molarity, since molality and molarity both divide the moles of solute by a volume', 'MC1'],
    ['Molarity, because 500.0 g of water is 500.0 mL, so the mass can be used as the solution volume', ''],
    'MC1 molality uses solvent mass, re-asked with 10.0 g NaCl in 500.0 g water'),
  card('chem.found.concentration', 'fill_blank', H,
    'Complete the sentence: 1 ppm by mass of lead in seawater (density 1.025 g/mL) is ____ 1 mg of lead per litre of seawater.',
    'slightly more than, because the mg/L match holds only for density near 1 g/mL',
    ['exactly equal to, since ppm is always the same as mg/L whatever the liquid', 'MC3'],
    ['exactly 1000 times smaller than, since ppm and mg/L differ by a factor of 1000', ''],
    'MC3 ppm by mass equals mg/L only near 1 g/mL, re-asked with seawater'),

  // ─── chem.thermo.enthalpy ────────────────────────────────────────────────
  card('chem.thermo.enthalpy', 'short_answer', H,
    'To find ΔH for C(s) + 2H₂(g) → CH₄(g), a student adds up three combustion equations, though the direct reaction cannot be run cleanly. Which statement is correct?',
    'The result is valid: any combination of reactions that sums to the target gives its ΔH, run in a lab or not',
    ['It is invalid, since Hess\'s law needs every step to be a reaction that can really be run in a laboratory', 'MC1'],
    ['It is valid only if no equation is multiplied, since scaling an equation changes its meaning', ''],
    'MC1 Hess\'s law is algebraic, re-asked with the formation of methane'),
  card('chem.thermo.enthalpy', 'fill_blank', H,
    'Complete the sentence: if N₂ + 3H₂ → 2NH₃ has ΔH = −92 kJ, then 2NH₃ → N₂ + 3H₂ has ΔH = ____.',
    '+92 kJ, the same size with the sign flipped, so the reverse is endothermic',
    ['−92 kJ, the same value, since the same bonds are involved in both directions', 'MC3'],
    ['+184 kJ, since the reverse absorbs twice the energy that the forward reaction released', ''],
    'MC3 reversing a reaction flips the sign of ΔH, re-asked with ammonia'),

  // ─── chem.atomic.orbitals ────────────────────────────────────────────────
  card('chem.atomic.orbitals', 'short_answer', H,
    'A 3s and a 3d orbital each have two nodes in total. Which statement is correct?',
    '3s has two radial nodes and 3d has two angular nodes: the same total (n − 1) split differently',
    ['Both have two radial nodes, since the radial node count is n − 1 for any orbital with n = 3', 'MC2'],
    ['3s has two angular nodes and 3d has two radial nodes, since s and d swap node types', ''],
    'MC2 radial nodes = n − l − 1, re-asked with 3s and 3d'),
  card('chem.atomic.orbitals', 'fill_blank', H,
    'Complete the sentence: in a carbon atom the 2s orbital lies ____ the 2p orbitals, because of shielding and penetration.',
    'lower in energy than (in hydrogen the two are degenerate)',
    ['at the same energy as, since all orbitals with the same n are degenerate', 'MC3'],
    ['higher in energy than, since s orbitals lie further from the nucleus', ''],
    'MC3 same n is not the same energy in a many-electron atom, re-asked with carbon'),

  // ─── chem.kinet.arrhenius ────────────────────────────────────────────────
  card('chem.kinet.arrhenius', 'short_answer', H,
    'A student says warming a reaction from 20 °C to 40 °C doubles the T in the Arrhenius equation. Which statement is correct?',
    'T must be in kelvin: 293 K to 313 K is only about a 7% rise, not a doubling',
    ['Yes, since 40 °C is twice 20 °C and Celsius values can be used directly', 'MC1'],
    ['No, because °C is converted to kelvin by adding 100 rather than 273', ''],
    'MC1 Arrhenius needs kelvin, re-asked as a doubling claim'),
  card('chem.kinet.arrhenius', 'fill_blank', H,
    'Complete the sentence: for a first-order reaction, the units of the pre-exponential factor A are ____.',
    's⁻¹, the same as k',
    ['kJ/mol, since A is the activation energy of the reaction', 'MC3'],
    ['none, since A is a pure number with no units', ''],
    'MC3 A has the units of k and is not an energy, re-asked as units'),

  // ─── chem.thermo.gibbs ───────────────────────────────────────────────────
  card('chem.thermo.gibbs', 'short_answer', H,
    'A reaction has ΔG° = +5 kJ/mol at 298 K, but starts with a large excess of reactants and almost no products. Which statement is correct?',
    'It can run forward: ΔG = ΔG° + RT ln Q, and a small Q makes RT ln Q strongly negative',
    ['It cannot run forward, since the sign of ΔG° settles spontaneity at every concentration', 'MC2'],
    ['It is at equilibrium, since a ΔG° of 5 kJ/mol is close enough to zero', ''],
    'MC2 spontaneity needs ΔG, not only ΔG°, re-asked with a small Q'),
  card('chem.thermo.gibbs', 'fill_blank', H,
    'Complete the sentence: a reaction with ΔH = +60 kJ/mol and ΔS = +120 J/(mol·K) becomes spontaneous above T = ____.',
    '500 K (60 000 J ÷ 120 J/K), after converting kJ to J',
    ['0.5 K (60 ÷ 120), dividing kilojoules by joules without converting', 'MC3'],
    ['7200 K (60 × 120), since the crossover multiplies ΔH by ΔS', ''],
    'MC3 convert the units before dividing, re-asked with 60 kJ and 120 J/K'),
]

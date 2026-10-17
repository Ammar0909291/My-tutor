/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 12 (phys.qm part 3 and phys.stat part 3, 11 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds mcq and misconception_probe probes at its own band, so the new cards take the FREE slot step_check at that band (the kind is only a slot label).
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

export const PHYSICS_CARD_DEPTH_BATCH_12: SeedProbe[] = [
  card('phys.qm.variational-method', 'step_check', H,
    'A trial state gives ⟨H⟩ = −14.2 eV for a system whose true ground-state energy is −13.6 eV. What does that tell you?',
    'An error: the variational principle guarantees ⟨H⟩ ≥ E₀, so a value below E₀ cannot occur',
    ['The true ground-state energy must really be −14.2 eV, since the variational method is exact', 'MC-VAR-EXACT'],
    ['Nothing is wrong: any trial state may give an energy below E₀', 'MC-VAR-ANY-STATE'],
    'the variational estimate is an upper bound on E₀, re-asked with −14.2 eV'),
  card('phys.qm.wkb-approximation', 'step_check', H,
    'When is the WKB approximation reliable?',
    'When the potential changes slowly over one de Broglie wavelength',
    ['Always: it gives the exact quantum result, and the classical limit exactly', 'MC-WKB-EXACT-CLASSICALLY'],
    ['Only when the particle\'s energy is far above the potential everywhere', ''],
    'WKB needs a slowly varying potential, re-asked as a condition'),
  card('phys.qm.scattering-theory-born-approximation', 'step_check', H,
    'When does the first Born approximation work well?',
    'For weak potentials or fast particles',
    ['For any potential and any energy, since it is the first term of an exact series', 'MC-BORN-ALWAYS-VALID'],
    ['Only for very strong potentials at low energy', ''],
    'the Born approximation needs a weak scatterer, re-asked as a condition'),
  card('phys.qm.s-matrix-basics', 'step_check', H,
    'What does unitarity of the S-matrix (S†S = 1) express?',
    'Conservation of probability: the total probability over all final states is 1',
    ['Nothing physical: unitarity is a convenient but optional property of the theory', 'MC-SMAT-UNITARITY-OPTIONAL'],
    ['That S is the same thing as the transition matrix T', 'MC-SMAT-S-IS-JUST-T'],
    'unitarity of S means probability is conserved, re-asked as what it expresses'),

  card('phys.stat.chemical-potential', 'step_check', H,
    'Two boxes of gas at the same temperature are connected, and μ_A > μ_B. In which direction do particles flow?',
    'From A to B: particles move towards lower chemical potential until the μ values are equal',
    ['From B to A: a higher μ is the more stable state, so particles gather there', 'MC-CP-HIGHER-MU-MORE-STABLE'],
    ['No flow: μ matters only for chemical reactions and not for gases in boxes', 'MC-CP-MU-ONLY-CHEMISTRY'],
    'particles flow down the chemical potential, re-asked with two boxes'),
  card('phys.stat.grand-canonical-ensemble', 'step_check', H,
    'Which statement about the fugacity z = e^(βμ) is correct?',
    'z sets the average particle number; it is not a probability',
    ['z is a probability, so it must lie between 0 and 1 and cannot exceed 1', 'MC-GCE-FUGACITY-IS-PROB'],
    ['z is the average energy per particle', ''],
    'fugacity is not a probability, re-asked as a statement'),
  card('phys.stat.fluctuations-correlations', 'step_check', H,
    'For a macroscopic gas, relative fluctuations in energy scale as 1/√N. Are they zero?',
    'No: tiny for N ~ 10²³, but real and they give response functions',
    ['Yes: for a macroscopic system they vanish entirely and carry no information', 'MC-FL-FLUCTUATIONS-NEGLIGIBLE'],
    ['No: they are large, comparable to the mean value', ''],
    'fluctuations are small but physical, re-asked with N ~ 10²³'),
  card('phys.stat.phase-transitions', 'step_check', H,
    'How accurate is Landau mean-field theory close to a critical point in low dimensions?',
    'Not exact: it neglects fluctuations, so its exponents are wrong in low dimensions',
    ['Exact in every dimension, since it is an expansion of the free energy about the transition', 'MC-PT-MF-EXACT'],
    ['Exact in one dimension only', ''],
    'mean-field theory ignores fluctuations, re-asked near a critical point'),
  card('phys.stat.phase-transitions-critical-phenomena', 'step_check', H,
    'Two different materials belong to the same universality class. What does that mean?',
    'They share the same critical exponents, though their critical temperatures can differ',
    ['They are the same material, with the same critical temperature', 'MC-CP-UNIV-MEANS-SAME'],
    ['They have the same microscopic interactions', ''],
    'universality means shared exponents, re-asked with two materials'),
  card('phys.stat.ising-model', 'step_check', H,
    'Does the 1D Ising model with short-range coupling have a phase transition at T > 0?',
    'No: thermal fluctuations destroy long-range order at any T > 0 in one dimension',
    ['Yes: it orders below a critical temperature, just like the 2D model', 'MC-IS-1D-ORDERS'],
    ['Yes: mean-field theory predicts it, and mean-field theory is accurate in 1D', 'MC-IS-MF-ACCURATE-ANY-D'],
    'the 1D Ising chain has no transition, re-asked at T > 0'),
  card('phys.stat.monte-carlo-basics', 'step_check', H,
    'Why does the Metropolis algorithm sometimes accept a move that raises the energy, with probability e^(−βΔE)?',
    'To satisfy detailed balance, so that the samples follow the Boltzmann distribution',
    ['Detailed balance is optional, so accepting only energy-lowering moves would also work', 'MC-MC-DETAILED-BALANCE-OPTIONAL'],
    ['Random choices guarantee a correct sample whatever the acceptance rule is', 'MC-MC-RANDOM-MEANS-CORRECT'],
    'Metropolis acceptance enforces detailed balance, re-asked as why uphill moves are accepted'),
]

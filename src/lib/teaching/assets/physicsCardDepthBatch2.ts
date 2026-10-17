/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 2 (phys.rel and phys.stat part 1, 15 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds true_false, misconception_probe and mcq probes at its own band, so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
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

export const PHYSICS_CARD_DEPTH_BATCH_2: SeedProbe[] = [
  // ─── phys.rel.mass-energy ────────────────────────────────────────────────
  card('phys.rel.mass-energy', 'step_check', H,
    'A 2.044 MeV photon makes an electron–positron pair; each particle has rest energy 0.511 MeV. Where does the remaining energy go?',
    'Into the kinetic energy of the pair (1.022 MeV in total), since energy is conserved',
    ['Nowhere: the pair\'s mass has simply been created from nothing', 'MC-3'],
    ['Into the positron, which carries negative energy to balance the books', 'MC-4'],
    'MC-3 and MC-4 pair production converts energy, re-asked with numbers'),

  // ─── phys.rel.postulates ─────────────────────────────────────────────────
  card('phys.rel.postulates', 'step_check', H,
    'A spaceship moving at 0.5c relative to Earth fires a light pulse backwards. How fast does Earth measure the pulse?',
    'c: light travels at c in every inertial frame',
    ['0.5c, since the ship\'s speed is taken off the speed of light', 'MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS'],
    ['1.5c, since speeds always add, as they do for two cars', ''],
    'MC-1 the speed of light does not add like other speeds, re-asked with a backward pulse'),

  // ─── phys.rel.relativistic-momentum ──────────────────────────────────────
  card('phys.rel.relativistic-momentum', 'step_check', H,
    'A massive particle has E = 5 GeV and pc = 3 GeV. What is mc²?',
    '4 GeV, from E² = (pc)² + (mc²)²',
    ['5 GeV, since E = mc² gives the mass-energy of the particle', 'MC-4'],
    ['2 GeV, found as E − pc', ''],
    'MC-4 E² = (pc)² + (mc²)² holds in every frame, re-asked with numbers'),

  // ─── phys.rel.spacetime ──────────────────────────────────────────────────
  card('phys.rel.spacetime', 'step_check', H,
    'A photon has m = 0. What does (E/c)² − |p|² = (mc)² then give?',
    'E = pc: the four-momentum inner product is zero for a photon',
    ['No solution, since an inner product like |p|² must be positive and cannot vanish', 'MC-3'],
    ['E = 0, since a photon has no mass and so no energy', ''],
    'MC-3 the Minkowski inner product is indefinite, re-asked with a photon'),

  // ─── phys.stat.boltzmann-factor ──────────────────────────────────────────
  card('phys.stat.boltzmann-factor', 'step_check', H,
    'Levels at 0, 0.05 and 0.10 eV have Boltzmann factors 1, 0.15 and 0.02. What is the probability of the 0.05 eV level?',
    'About 0.13: divide 0.15 by Z = 1 + 0.15 + 0.02',
    ['0.15, the Boltzmann factor itself', 'MC-BOLTZMANN-FACTOR-IS-A-PROBABILITY-WITHOUT-Z'],
    ['About 0.18, found by multiplying 0.15 by Z', ''],
    'MC-1 the factor must be divided by Z, re-asked with three levels'),

  // ─── phys.stat.bose-einstein ─────────────────────────────────────────────
  card('phys.stat.bose-einstein', 'step_check', H,
    'At E = μ + k_BT, which gives the larger mean occupation: Bose-Einstein or Fermi-Dirac?',
    'Bose-Einstein (about 0.58) because of its −1; Fermi-Dirac gives about 0.27',
    ['Fermi-Dirac, because the +1 sits in the denominator of the Bose-Einstein formula', 'MC-1'],
    ['They are equal at E = μ + k_BT', ''],
    'MC-1 the Bose-Einstein denominator has −1, re-asked at E = μ + k_BT'),
  card('phys.stat.bose-einstein', 'fill_blank', H,
    'Complete the sentence: a laser puts huge numbers of photons into one mode because photons are ____.',
    'bosons, which may share a quantum state',
    ['fermions, which obey Fermi-Dirac statistics because they cannot share states', 'MC-4'],
    ['neutral, so nothing stops them from sitting in the same place', ''],
    'MC-4 photons are bosons, re-asked as why a laser works'),

  // ─── phys.stat.entropy-statistical ───────────────────────────────────────
  card('phys.stat.entropy-statistical', 'step_check', H,
    'By chance, all 100 molecules of a gas end up in the left half of a box. Does this violate the second law?',
    'No: it is an extremely unlikely fluctuation; the second law is statistical',
    ['Yes, since the second law is absolute and entropy can never decrease', 'MC-2'],
    ['Yes, but only because the box is closed', ''],
    'MC-2 the second law is statistical, re-asked with 100 molecules'),
  card('phys.stat.entropy-statistical', 'fill_blank', H,
    'Complete the sentence: entropy is precisely ____.',
    'k_B times the logarithm of the number of accessible microstates',
    ['a measure of how messy or disordered a system looks', 'MC-1'],
    ['the number of accessible microstates itself, Ω', 'MC-3'],
    'MC-1 and MC-3 entropy is k_B ln Ω, re-asked as a completion'),

  // ─── phys.stat.fermi-dirac ───────────────────────────────────────────────
  card('phys.stat.fermi-dirac', 'step_check', H,
    'Which statement about E_F is correct for a metal at room temperature?',
    'E_F is where f = 1/2, and some electrons lie above it',
    ['E_F is the energy of the most energetic electron, so none lie above it', 'MC-4'],
    ['E_F rises to the thermal energy k_BT at room temperature', ''],
    'MC-4 E_F is not the top electron energy, re-asked at room temperature'),
  card('phys.stat.fermi-dirac', 'fill_blank', H,
    'Complete the sentence: for electrons in copper at 300 K, T is ____ the Fermi temperature T_F.',
    'far below it (T_F is tens of thousands of kelvin), so Fermi-Dirac statistics is essential',
    ['far above it, so Maxwell-Boltzmann is a good approximation', 'MC-1'],
    ['equal to it, so either kind of statistics works equally well', ''],
    'MC-1 metals need Fermi-Dirac statistics, re-asked with T and T_F'),

  // ─── phys.stat.free-energy ───────────────────────────────────────────────
  card('phys.stat.free-energy', 'step_check', H,
    'At constant T and V, what is the most work a system can do, in terms of F?',
    'The decrease in F: the maximum total work',
    ['The whole internal energy U, since all of it is available as work', 'MC-2'],
    ['Only the non-PdV work, which is the F version of the same limit', ''],
    'MC-2 F is the maximum work at constant T and V, re-asked as work available'),
  card('phys.stat.free-energy', 'fill_blank', H,
    'Complete the sentence: once the partition function Z is known, the free energy is F = ____.',
    '−k_BT ln Z, from which every other property follows',
    ['unrelated to Z, because F needs a separate calculation of its own', 'MC-3'],
    ['−k_BT Z, with no logarithm', ''],
    'MC-3 F = −k_BT ln Z, re-asked as a completion'),

  // ─── phys.stat.maxwell-boltzmann (undergraduate) ─────────────────────────
  card('phys.stat.maxwell-boltzmann', 'step_check', U,
    'A gas is heated from 300 K to 1200 K. By what factor does the mean molecular speed change?',
    '×2: the speed goes as √T, and T rises ×4',
    ['×4, since the speed scales directly with the temperature', 'MC-4'],
    ['×16, since the speed scales as T squared', ''],
    'MC-4 speeds scale as √T, re-asked with 300 K to 1200 K'),
  card('phys.stat.maxwell-boltzmann', 'fill_blank', U,
    'Complete the sentence: the 3D speed distribution is zero at v = 0 because it contains a factor of ____.',
    'v², which makes f(0) = 0 and puts the peak away from zero',
    ['e^(−mv²/2k_BT) alone, which is the whole distribution and is zero at v = 0', 'MC-2'],
    ['v, which comes from the one-dimensional Gaussian', ''],
    'MC-2 the v² factor creates the peak, re-asked as a completion'),
]

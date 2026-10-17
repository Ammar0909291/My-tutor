/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 1 (phys.qm and phys.rel.length-contraction, 24 cards).
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

export const PHYSICS_CARD_DEPTH_BATCH_1: SeedProbe[] = [
  // ─── phys.qm.harmonic-oscillator-qm ──────────────────────────────────────
  card('phys.qm.harmonic-oscillator-qm', 'step_check', H,
    'A quantum oscillator is cooled into its lowest state, n = 0. What energy does it still have?',
    '½ℏω: zero-point energy remains',
    ['Zero, since the lowest state is a state of rest with nothing left to give up', 'MC-1'],
    ['ℏω, one whole quantum above zero, since the lowest state is n = 1', ''],
    'MC-1 the ground state has zero-point energy, re-asked with a cooled oscillator'),
  card('phys.qm.harmonic-oscillator-qm', 'fill_blank', H,
    'Complete the sentence: for a quantum harmonic oscillator, the gap between any two adjacent levels is ____.',
    'ℏω for every n, which is why a vibrating molecule absorbs one IR frequency',
    ['larger for higher n, as in the infinite square well, so the lines spread out', 'MC-2'],
    ['smaller for higher n, as for the levels of hydrogen, so the lines crowd together', ''],
    'MC-2 equal level spacing, re-asked as a completion'),

  // ─── phys.qm.hydrogen-atom-qm ────────────────────────────────────────────
  card('phys.qm.hydrogen-atom-qm', 'step_check', H,
    'List the subshells that exist in the n = 4 level of hydrogen.',
    '4s, 4p, 4d and 4f',
    ['4s, 4p, 4d, 4f and 4g, since l can equal n', 'MC-2'],
    ['4p, 4d and 4f only, since the s subshell is not present above n = 3', ''],
    'MC-2 l runs from 0 to n − 1, re-asked as the subshells of n = 4'),
  card('phys.qm.hydrogen-atom-qm', 'fill_blank', H,
    'Complete the sentence: in the quantum 1s state of hydrogen, the electron is ____.',
    'spread out as a probability cloud, whose radial probability peaks near a₀',
    ['orbiting the nucleus at exactly a₀, like a planet circling the Sun', 'MC-1'],
    ['sitting on the nucleus, where the density is greatest', ''],
    'MC-1 the electron is not on a planetary orbit, re-asked as a completion'),

  // ─── phys.qm.operators ───────────────────────────────────────────────────
  card('phys.qm.operators', 'step_check', H,
    'The operators x̂ and p̂ act on ψ in both orders. Which statement is correct?',
    'x̂p̂ψ − p̂x̂ψ = iℏψ, so the commutator is iℏ and not zero',
    ['The two orders agree, because multiplication commutes, so [x̂, p̂] = 0', 'MC-3'],
    ['The two orders differ by ℏψ, a real number, so the commutator is real', ''],
    'MC-3 [x̂, p̂] = iℏ, re-asked with both orders applied to ψ'),
  card('phys.qm.operators', 'fill_blank', H,
    'Complete the sentence: the operator p̂ = −iℏ d/dx is Hermitian because ____.',
    '⟨ψ|p̂φ⟩ = ⟨p̂ψ|φ⟩, which integration by parts confirms despite the factor i',
    ['it has real entries only, and the i is just a convention that changes nothing', 'MC-4'],
    ['its eigenvalues are complex, which is what Hermitian means for an operator', ''],
    'MC-4 Hermitian is defined by the inner-product identity, re-asked as a completion'),

  // ─── phys.qm.particle-in-box ─────────────────────────────────────────────
  card('phys.qm.particle-in-box', 'step_check', H,
    'In the n = 3 state of a particle in a box of width L, where are the nodes of ψ (excluding the walls)?',
    'Two nodes, at x = L/3 and x = 2L/3',
    ['There are none: higher n states always have the highest probability at the centre', 'MC-3'],
    ['Three nodes, one for each unit of n, at L/4, L/2 and 3L/4', ''],
    'MC-3 an n-th state has n − 1 nodes, re-asked with n = 3'),
  card('phys.qm.particle-in-box', 'fill_blank', H,
    'Complete the sentence: in an infinite square well, the gap E₄ − E₃ equals ____ times E₁.',
    '7, since the spacing E(n+1) − E(n) is (2n + 1)E₁',
    ['1, since the spacing is constant, as it is for the harmonic oscillator', 'MC-4'],
    ['5, which is the spacing between n = 2 and n = 3', ''],
    'MC-4 the spacing grows as (2n + 1)E₁, re-asked with E₄ − E₃'),

  // ─── phys.qm.pauli-exclusion ─────────────────────────────────────────────
  card('phys.qm.pauli-exclusion', 'step_check', H,
    'How many electrons can fill the 3d subshell?',
    '10: five spatial orbitals, each holding two electrons of opposite spin',
    ['5, since each atomic orbital holds only one electron at a time', 'MC-2'],
    ['6, as for a p subshell, since the exclusion principle caps every subshell at six', ''],
    'MC-2 each spatial orbital holds two electrons, re-asked with the 3d subshell'),
  card('phys.qm.pauli-exclusion', 'fill_blank', H,
    'Complete the sentence: ⁴He atoms can all occupy one state, but electrons cannot, because ____.',
    'fermion wave functions are antisymmetric, while boson wave functions are symmetric',
    ['electrons repel each other electrically, so no two can share a state', 'MC-1'],
    ['the exclusion principle applies to every particle, and helium atoms are just neutral', 'MC-3'],
    'MC-1 and MC-3 Pauli is about antisymmetry and applies to fermions only, re-asked with ⁴He'),

  // ─── phys.qm.perturbation-theory ─────────────────────────────────────────
  card('phys.qm.perturbation-theory', 'step_check', H,
    'A static magnetic field is switched on and an atom\'s energy levels split. Which tool describes this, and what does it predict?',
    'Time-independent perturbation theory: shifted levels (Zeeman splitting)',
    ['Time-independent perturbation theory: transitions between the levels at a calculable rate', 'MC-4'],
    ['Fermi\'s golden rule: the size of the shifts in the energy levels', ''],
    'MC-4 time-independent theory shifts levels, re-asked with a magnetic field'),
  card('phys.qm.perturbation-theory', 'fill_blank', H,
    'Complete the sentence: perturbation theory is trustworthy when |⟨m|H\'|n⟩| is ____ the energy gap |Eₙ⁰ − Eₘ⁰|.',
    'much smaller than',
    ['comparable to, since the method works however strong the perturbation is', 'MC-1'],
    ['much larger than, since a strong perturbation gives the biggest correction', ''],
    'MC-1 the method needs a small perturbation, re-asked as a condition'),

  // ─── phys.qm.quantum-tunneling ───────────────────────────────────────────
  card('phys.qm.quantum-tunneling', 'step_check', H,
    'A particle of energy E tunnels through a barrier of height V₀ > E. What is the energy of the transmitted particle?',
    'E: the same as before, since energy is conserved and ψ has a tail inside the barrier',
    ['E plus V₀ − E, borrowed from the vacuum for a short time', 'MC-1'],
    ['Less than E, since crossing the barrier costs the particle some energy', ''],
    'MC-1 and MC-2 tunnelling conserves energy, re-asked with the transmitted energy'),

  // ─── phys.qm.schrodinger-equation (undergraduate) ────────────────────────
  card('phys.qm.schrodinger-equation', 'step_check', U,
    'A bound particle is in a stationary state. Which statement is correct?',
    '|ψ|² does not change in time, and the energy is an eigenvalue Eₙ > 0',
    ['Its energy must be zero, since nothing in the state changes', 'MC-2'],
    ['Its position must be fixed at a single point for all time', ''],
    'MC-2 stationary does not mean zero energy, re-asked as a statement'),
  card('phys.qm.schrodinger-equation', 'fill_blank', U,
    'Complete the sentence: for ψ = (1/√3)φ₁ + √(2/3)φ₂, an energy measurement gives E₁ with probability ____ and E₂ with probability ____.',
    '1/3 and 2/3, since each probability is |c|²',
    ['1/2 and 1/2, since a superposition gives each energy an equal chance', 'MC-4'],
    ['0.577 and 0.816, the amplitudes themselves', ''],
    'MC-4 probabilities are squared amplitudes, re-asked with unequal weights'),

  // ─── phys.qm.selection-rules ─────────────────────────────────────────────
  card('phys.qm.selection-rules', 'step_check', H,
    'Which of n, l and m is left unrestricted by the E1 selection rules?',
    'n: it may change by any amount, provided Δl = ±1',
    ['None of them: Δn = ±1 is one of the rules', 'MC-2'],
    ['l: it may change by any amount in an E1 transition', ''],
    'MC-2 Δn is unrestricted, re-asked as which quantum number is free'),
  card('phys.qm.selection-rules', 'fill_blank', H,
    'Complete the sentence: an E1-forbidden transition such as 2s → 1s is ____.',
    'strongly suppressed and slow (two-photon decay, about 0.12 s), but not impossible',
    ['impossible, so the 2s state of hydrogen can never decay to 1s', 'MC-1'],
    ['just as fast as an allowed one, since selection rules only change the colour', ''],
    'MC-1 forbidden means suppressed, re-asked as a completion'),

  // ─── phys.qm.spin (undergraduate) ────────────────────────────────────────
  card('phys.qm.spin', 'step_check', U,
    'A Stern–Gerlach magnet splits a beam of spin-1 atoms. How many spots appear?',
    '3 spots, for m_s = −1, 0 and +1',
    ['2 spots, since the magnet creates only an "up" and a "down" state', 'MC-3'],
    ['A continuous smear, as classical magnets would give', ''],
    'MC-3 the apparatus reveals the allowed values, re-asked with spin-1'),
  card('phys.qm.spin', 'fill_blank', U,
    'Complete the sentence: for an electron in |↑_z⟩, a measurement of S_x gives ____.',
    '+ℏ/2 or −ℏ/2 with equal probability, since S_x is completely uncertain',
    ['0 every time, since the spin vector is locked along z', 'MC-4'],
    ['+ℏ/2 every time, since spin-up in z is spin-up in every direction', ''],
    'MC-4 spin states are not fixed in space, re-asked with S_x'),

  // ─── phys.qm.uncertainty-principle ───────────────────────────────────────
  card('phys.qm.uncertainty-principle', 'step_check', H,
    'An electron is squeezed into a smaller and smaller region Δx. What happens to Δp?',
    'Δp grows, so that Δx·Δp stays at or above ℏ/2',
    ['Nothing: Δx and Δp are each limited on their own', 'MC-3'],
    ['Δp shrinks as well, since the electron is more precisely located', ''],
    'MC-3 the principle bounds the product, re-asked as squeezing Δx'),
  card('phys.qm.uncertainty-principle', 'fill_blank', H,
    'Complete the sentence: an excited atomic state with a short lifetime Δt has an energy that is ____.',
    'less sharply defined, so its spectral line has a natural width ΔE ≥ ℏ/(2Δt)',
    ['borrowed from the vacuum for a time Δt and then given back', 'MC-4'],
    ['exactly sharp, since the lifetime of the state is fixed', ''],
    'MC-4 ΔE·Δt gives natural linewidth, re-asked as a completion'),

  // ─── phys.qm.wave-function ───────────────────────────────────────────────
  card('phys.qm.wave-function', 'step_check', H,
    'Near x = 1.00 nm, |ψ|² = 0.4 nm⁻¹. About what is the probability of finding the particle between 1.00 and 1.10 nm?',
    'About 0.04: density × interval = 0.4 nm⁻¹ × 0.10 nm',
    ['0.4, the value of |ψ|² itself', 'MC-2'],
    ['4, found by dividing 0.4 by 0.10 nm', ''],
    'MC-2 |ψ|² is a density, re-asked with an interval'),
  card('phys.qm.wave-function', 'fill_blank', H,
    'Complete the sentence: for ψ = ψ₁ + ψ₂, the probability density is |ψ₁|² + |ψ₂|² plus ____.',
    'an interference term, 2Re(ψ₁*ψ₂)',
    ['nothing, because a superposition is only a 50/50 mixture of ψ₁ and ψ₂', 'MC-4'],
    ['a normalisation term that is always zero', ''],
    'MC-4 a superposition is not a mixture, re-asked as a completion'),

  // ─── phys.rel.length-contraction ─────────────────────────────────────────
  card('phys.rel.length-contraction', 'step_check', H,
    'A cube moves at 0.8c along x. What shape does the lab frame measure?',
    'Shorter only along x, by a factor of 0.6, with y and z unchanged',
    ['Shortened by 0.6 in all three directions, like a ball squeezed from every side', 'MC-2'],
    ['Longer along x, by a factor of 1.67', ''],
    'MC-2 contraction is longitudinal only, re-asked with a cube at 0.8c'),
]

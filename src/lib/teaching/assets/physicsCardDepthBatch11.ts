/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 11 (phys.wave part 2, phys.mech part 3, phys.qm part 2, 20 cards).
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

export const PHYSICS_CARD_DEPTH_BATCH_11: SeedProbe[] = [
  card('phys.wave.pendulum', 'step_check', H,
    'A pendulum\'s bob is replaced by one three times as heavy, with the same string length. What happens to the period?',
    'It is unchanged: T = 2π√(L/g) has no mass in it',
    ['It increases, since a heavier bob moves more slowly', 'MC-PENDULUM-PERIOD-DEPENDS-ON-MASS'],
    ['It decreases, since gravity pulls harder on a heavier bob', ''],
    'the period does not depend on mass, re-asked with a heavier bob'),
  card('phys.wave.shm-energy', 'step_check', H,
    'A mass in SHM (A = 10 cm, k = 50 N/m) is at x = 5 cm. What is its total energy?',
    '0.25 J: ½kA², the same at every position',
    ['0.0625 J: ½kx² at the present position', 'MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION'],
    ['0.1875 J: the kinetic part only', ''],
    'total energy in SHM is constant, re-asked with A = 10 cm and x = 5 cm'),
  card('phys.wave.damped-oscillations', 'step_check', H,
    'The amplitude of a damped oscillator falls to one third of its starting value. What fraction of the energy remains?',
    '1/9: the energy goes as the amplitude squared, (1/3)²',
    ['1/3, the same fraction as the amplitude', 'MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE'],
    ['1/6, found by halving the amplitude fraction', ''],
    'energy falls as amplitude squared, re-asked with a third'),
  card('phys.wave.transverse-waves', 'step_check', H,
    'A wave has crests 0.6 m apart, and each crest is 3 cm above the equilibrium level. What are λ and A?',
    'λ = 0.6 m and A = 3 cm',
    ['λ = 3 cm, the height of a crest, and A = 0.6 m', 'MC-AMPLITUDE-IS-WAVELENGTH'],
    ['λ = 0.6 m and A = 6 cm, the peak-to-trough height', ''],
    'amplitude and wavelength are different quantities, re-asked with 0.6 m and 3 cm'),
  card('phys.wave.longitudinal-waves', 'step_check', H,
    'A 440 Hz tuning fork sounds in air, where the speed of sound is 343 m/s. What is the wavelength?',
    'About 0.78 m, the distance between successive compressions',
    ['None: a longitudinal wave has no wavelength, as it has no crests', 'MC-LONGITUDINAL-NO-WAVELENGTH'],
    ['About 1.3 m, found as f ÷ v', ''],
    'longitudinal waves have a wavelength, re-asked with a 440 Hz fork'),
  card('phys.wave.sound-intensity', 'step_check', H,
    'Two identical speakers play together instead of one. By about how much does the sound level rise?',
    'About 3 dB: doubling the intensity adds 10 log 2 ≈ 3 dB',
    ['It doubles, so 60 dB becomes 120 dB', 'MC-DECIBELS-LINEAR'],
    ['About 10 dB', ''],
    'decibels are logarithmic, re-asked with a second speaker'),
  card('phys.wave.wave-speed', 'step_check', H,
    'A string vibrates at 200 Hz with λ = 0.5 m. The frequency is raised to 400 Hz on the same string at the same tension. What happens?',
    'v is still 100 m/s, and λ becomes 0.25 m',
    ['v doubles to 200 m/s, and λ stays at 0.5 m', 'MC-WAVE-SPEED-CHANGES-WITH-FREQUENCY'],
    ['v halves to 50 m/s, and λ becomes 0.125 m', ''],
    'wave speed is set by the medium, re-asked with 200 Hz and 400 Hz'),

  card('phys.mech.generalized-coordinates', 'step_check', H,
    'A particle is forced to move on the surface of a sphere. How many generalized coordinates does it need?',
    'Two (for example θ and φ): the constraint r = R removes one of the three',
    ['Three, because a constraint does not change the number of coordinates needed', 'MC-CONSTRAINT-REDUCES-FREEDOM'],
    ['One, because the particle can only move along a line', ''],
    'a constraint removes a degree of freedom, re-asked with a sphere'),
  card('phys.mech.generalized-coordinates', 'fill_blank', H,
    'Complete the sentence: a generalized coordinate may be ____.',
    'any convenient independent parameter, such as an angle or an arc length',
    ['only a Cartesian position such as x, y or z', 'MC-COORD-MUST-BE-CARTESIAN'],
    ['only a quantity with the dimensions of length', ''],
    'generalized coordinates need not be Cartesian, re-asked as a completion'),

  card('phys.mech.euler-lagrange-equation', 'step_check', H,
    'A ball is at rest at height h, with V = mgh. What is the Lagrangian L = T − V?',
    '−mgh, since T = 0 and L = 0 − mgh',
    ['+mgh, the total energy T + V', 'MC-LAGRANGIAN-IS-ENERGY'],
    ['0, since the ball is at rest', ''],
    'L = T − V is not the energy, re-asked with a ball at rest'),
  card('phys.mech.euler-lagrange-equation', 'fill_blank', H,
    'Complete the sentence: for a bead on a frictionless ring, the constraint force from the ring is ____ in the Euler–Lagrange equation.',
    'not needed, since it never appears in L',
    ['needed, since every force including the constraint force must be added', 'MC-EL-NEEDS-FORCES'],
    ['equal to the weight of the bead', ''],
    'the Euler–Lagrange method needs no constraint forces, re-asked with a bead on a ring'),

  card('phys.mech.hamiltonian', 'step_check', H,
    'For L = ½mẋ² − V(x), what are the momentum and the Hamiltonian?',
    'p = mẋ, and H = p²/(2m) + V(x)',
    ['H = L = ½mẋ² − V, since the two are the same object written in the same variables', 'MC-H-IS-L'],
    ['p = ẋ/m, and H = p²/2 + V', ''],
    'H and L are different functions, re-asked for a particle in V(x)'),
  card('phys.mech.hamiltonian', 'fill_blank', H,
    'Complete the sentence: H equals the total energy T + V only when ____.',
    'the constraints are time-independent and T is quadratic in velocities',
    ['always, since H is by definition the total energy of the system, whatever it is', 'MC-H-ALWAYS-ENERGY'],
    ['the system has no potential energy at all', ''],
    'H is not always the energy, re-asked as a condition'),

  card('phys.mech.hamiltons-equations', 'step_check', H,
    'For H = p²/(2m) + mgx, with x measured upwards, what is ṗ?',
    'ṗ = −mg: the minus sign makes it a downward force',
    ['ṗ = +mg, since both of Hamilton\'s equations carry a plus sign', 'MC-SIGN-BOTH-POSITIVE'],
    ['ṗ = p/m, which is the velocity', ''],
    'ṗ = −∂H/∂q, re-asked for a particle in gravity'),

  card('phys.mech.cyclic-coordinates-conservation-laws', 'step_check', H,
    'The coordinate φ does not appear in L, so ∂L/∂φ = 0. What follows?',
    'p_φ is conserved; φ itself can still change',
    ['φ stays constant, which is what "cyclic" means for a coordinate', 'MC-CYCLIC-MEANS-ZERO'],
    ['φ and p_φ are both zero', ''],
    'a cyclic coordinate has a conserved momentum, re-asked as what follows'),

  card('phys.mech.canonical-transformations', 'step_check', H,
    'Is the swap Q = p, P = q canonical? (Use {Q, P} = {p, q}.)',
    'No: {p, q} = −1 and not +1, so the bracket is not preserved (Q = p, P = −q would be)',
    ['Yes, since any relabelling of the variables is a canonical transformation', 'MC-CT-ANY-COORD-CHANGE'],
    ['Yes, since swapping position and momentum is how a generating function works', 'MC-CT-GENERATING-IS-POTENTIAL'],
    'canonical transformations must preserve the brackets, re-asked with a swap'),

  card('phys.mech.poisson-brackets', 'step_check', H,
    'What is the Poisson bracket {x, p²/(2m)}?',
    'p/m, the velocity',
    ['0, since x does not appear in p²/2m, so the two quantities are independent', 'MC-BRACKET-ZERO-MEANS-INDEPENDENT'],
    ['−p/m, found by reversing the order of the bracket', 'MC-BRACKET-SYMMETRIC'],
    'a bracket is not a test of independence, re-asked with {x, p²/2m}'),

  card('phys.mech.hamilton-jacobi-equation', 'step_check', H,
    'For a conservative system, S = W(q) − Et turns the Hamilton–Jacobi equation into what?',
    'An equation for W(q) alone, with E as a separation constant',
    ['A solution for every system, since the separation always works', 'MC-HJ-ALWAYS-SEPARABLE'],
    ['An ordinary equation for t alone', ''],
    'separation of variables in the Hamilton–Jacobi equation, re-asked for a conservative system'),

  card('phys.qm.angular-momentum-addition', 'step_check', H,
    'Two angular momenta j₁ = 1 and j₂ = 1 are combined. Which total j are allowed?',
    'j = 0, 1 and 2, from |j₁ − j₂| to j₁ + j₂',
    ['Only j = 2, the maximum, since angular momenta simply add', 'MC-AMA-ONE-TOTAL-J'],
    ['j = 1 and 2 only, since j = 0 would mean no angular momentum', ''],
    'MC-AMA-ONE-TOTAL-J several total j arise, re-asked with j₁ = j₂ = 1'),

  card('phys.qm.identical-particles', 'step_check', H,
    'Two electrons are in a spin singlet (antisymmetric). What must the spatial part of the wavefunction be?',
    'Symmetric: the total is antisymmetric, so the parts have opposite symmetry',
    ['Antisymmetric, since the exchange rule applies to the spatial part only and not to spin', 'MC-IP-EXCHANGE-SPATIAL-ONLY'],
    ['Zero everywhere, since two electrons cannot share a spin state', ''],
    'MC-IP-EXCHANGE-SPATIAL-ONLY the whole wavefunction is antisymmetric, re-asked with a singlet'),
]

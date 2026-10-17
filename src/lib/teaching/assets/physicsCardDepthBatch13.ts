/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 13 (phys.particle and phys.mod semiconductors, 22 cards).
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

export const PHYSICS_CARD_DEPTH_BATCH_13: SeedProbe[] = [
  // ─── phys.particle ───────────────────────────────────────────────────────
  card('phys.particle.four-forces', 'step_check', H,
    'Friction between a book and a table is best described as which kind of force?',
    'A contact force that arises from the electromagnetic force between atoms',
    ['A fifth fundamental force, alongside the other four', 'MC-2'],
    ['A residual form of the strong nuclear force', ''],
    'MC-2 friction is not fundamental, re-asked with a book on a table'),
  card('phys.particle.particle-classification', 'step_check', H,
    'A pion is a quark–antiquark pair. How is it classified?',
    'A meson, and so a hadron; baryons have three quarks',
    ['A baryon, since "hadron" and "baryon" mean the same thing', 'MC-2'],
    ['A lepton, because it is light', ''],
    'MC-2 hadron and baryon differ, re-asked with a pion'),
  card('phys.particle.antimatter', 'step_check', H,
    'What is the antiparticle of the electron?',
    'The positron: the same mass, opposite charge',
    ['The proton, since it has the opposite charge', 'MC-3'],
    ['A particle with negative mass', 'MC-1'],
    'MC-3 and MC-1 the positron has the same mass as the electron'),
  card('phys.particle.quarks', 'step_check', H,
    'Which quark flavours make up the protons and neutrons of ordinary matter?',
    'Up and down quarks only',
    ['All six flavours, in equal numbers', 'MC-3'],
    ['Up, strange and charm quarks', ''],
    'MC-3 ordinary matter holds only up and down quarks, re-asked as which flavours'),
  card('phys.particle.leptons', 'step_check', H,
    'Which charged leptons are found in ordinary atoms?',
    'The electron only',
    ['The electron, muon and tau equally', 'MC-3'],
    ['The tau, since it has the largest mass', ''],
    'MC-3 only the electron appears in everyday matter, re-asked as which leptons'),
  card('phys.particle.neutrinos', 'step_check', H,
    'Neutrinos change flavour as they travel. What does this require?',
    'That they have non-zero mass, with different masses for different states',
    ['That they are exactly massless, since massless particles oscillate', 'MC-1'],
    ['Nothing: flavour is an arbitrary label that can change freely', 'MC-3'],
    'MC-1 and MC-3 oscillation needs mass, re-asked as what it requires'),
  card('phys.particle.hadron-quark-model', 'step_check', H,
    'The proton (uud) has mass 938 MeV/c², but its quark masses add up to only about 9 MeV/c². Where does most of the mass come from?',
    'The binding energy of the strong interaction between the quarks and gluons',
    ['It is just the sum of the quark masses, and the figures quoted must be wrong', 'MC-1'],
    ['The Higgs field, which gives the proton its mass directly', ''],
    'MC-1 a hadron\'s mass is not the sum of its quark masses, re-asked with the proton'),
  card('phys.particle.gauge-bosons', 'step_check', H,
    'The W boson has a mass of about 80 GeV/c². What does that imply for the range of the weak force?',
    'A short range: a heavy mediator is exchanged only over tiny distances',
    ['A long range, since a heavy mediator carries a stronger force over larger distances', 'MC-2'],
    ['An infinite range, as for the photon', ''],
    'MC-2 a heavy mediator means short range, re-asked with the W boson'),
  card('phys.particle.strong-interaction', 'step_check', H,
    'Two quarks are pulled further apart. How does the strong force between them change?',
    'It stays large or grows, which is why free quarks are never seen',
    ['It weakens with distance, like gravity and electromagnetism', 'MC-2'],
    ['It drops to zero once they are further apart than a proton', ''],
    'MC-2 the strong force does not fall off with distance, re-asked with two quarks'),
  card('phys.particle.weak-interaction', 'step_check', H,
    'Why is the weak force called "weak"?',
    'Its coupling is far below electromagnetism, yet it drives beta decay and solar fusion',
    ['Because it hardly matters in the universe at all, having almost no effect on anything', 'MC-1'],
    ['Because it is weaker than gravity, the weakest of the four forces', ''],
    'MC-1 weak does not mean unimportant, re-asked as why it is called weak'),
  card('phys.particle.electroweak-unification', 'step_check', H,
    'Which forces does electroweak unification combine?',
    'Electromagnetism and the weak force only',
    ['All four fundamental forces, including gravity and the strong force', 'MC-3'],
    ['The strong force and electromagnetism, which are the two nuclear forces', ''],
    'MC-3 electroweak unification covers two forces, re-asked as which forces'),
  card('phys.particle.higgs-mechanism', 'step_check', H,
    'Which particles does the Higgs mechanism leave massless?',
    'The photon and the gluons',
    ['None: the Higgs field gives mass to every particle', 'MC-1'],
    ['The W and Z bosons', ''],
    'MC-1 the Higgs does not give mass to every particle, re-asked as which stay massless'),
  card('phys.particle.conservation-laws', 'step_check', H,
    'Is μ⁻ → e⁻ + γ allowed? Total lepton number is 1 on both sides.',
    'No: it would change the electron and muon lepton numbers separately',
    ['Yes: total lepton number is 1 before and after, and that is all that must be conserved', 'MC-2'],
    ['Yes: the muon is heavy and has plenty of energy to spare', 'MC-1'],
    'MC-2 and MC-1 lepton numbers are separate and energy alone is not enough, re-asked with μ → eγ'),
  card('phys.particle.feynman-diagrams', 'step_check', H,
    'What does a Feynman diagram show?',
    'A schematic: lines show particles and carriers, not paths',
    ['A literal picture of the particles\' paths through space and time', 'MC-1'],
    ['A graph of energy against momentum for the particles involved', ''],
    'MC-1 a Feynman diagram is not a picture of paths, re-asked as what it shows'),
  card('phys.particle.accelerators-detectors', 'step_check', H,
    'A collider has more than enough energy to make a Higgs boson. Is its production guaranteed in each collision?',
    'No: it is made only with a small probability, so many collisions are needed',
    ['Yes: once the threshold energy is exceeded, production is guaranteed', 'MC-2'],
    ['No: it is made only if the energy equals the threshold exactly', ''],
    'MC-2 enough energy does not guarantee production, re-asked with the Higgs boson'),
  card('phys.particle.standard-model', 'step_check', H,
    'Which statement about the Standard Model is correct?',
    'Highly successful but incomplete: no gravity and no dark matter candidate',
    ['It explains all of physics, including gravity', 'MC-1'],
    ['A theory tested so precisely cannot have any major unresolved gaps left in it', 'MC-2'],
    'MC-1 and MC-2 the Standard Model is incomplete, re-asked as a statement'),

  // ─── phys.mod semiconductors ─────────────────────────────────────────────
  card('phys.mod.energy-bands', 'step_check', H,
    'What happens to the discrete atomic energy levels when N atoms form a crystal?',
    'Each level broadens into a band of about N closely spaced levels',
    ['They stay as sharp, discrete levels, unchanged by the neighbouring atoms', 'MC-1'],
    ['They merge into one single level shared by all the atoms', ''],
    'MC-1 atomic levels broaden into bands, re-asked for N atoms'),
  card('phys.mod.semiconductor-classification', 'step_check', H,
    'When heated, how do the resistances of a metal and a pure semiconductor change?',
    'The metal\'s rises, the semiconductor\'s falls (more carriers)',
    ['Both change in the same way, since every material responds to temperature alike', 'MC-3'],
    ['The metal\'s resistance falls, while the semiconductor\'s rises', ''],
    'MC-3 metals and semiconductors respond oppositely, re-asked with heating'),
  card('phys.mod.intrinsic-semiconductors', 'step_check', H,
    'In a pure, undoped semiconductor, how do the electron and hole concentrations compare?',
    'Equal: each electron excited across the gap leaves one hole behind',
    ['Different: there are always more electrons than holes', 'MC-3'],
    ['Both are zero, since there are no carriers without doping', ''],
    'MC-3 electrons and holes come in pairs in a pure semiconductor, re-asked as a comparison'),
  card('phys.mod.extrinsic-semiconductors', 'step_check', H,
    'Phosphorus is added to silicon to make it n-type. What is the net charge of the crystal?',
    'Zero: the extra electrons are balanced by the positively charged donor ions',
    ['Negative, because of the extra electrons that have been added', 'MC-1'],
    ['Positive, because the donor atoms become ions', ''],
    'MC-1 doped material stays neutral, re-asked with phosphorus in silicon'),
  card('phys.mod.pn-junction', 'step_check', H,
    'Does diffusion across a p-n junction go on until the n and p regions are completely mixed?',
    'No: it stops at equilibrium, when the built-in field balances the diffusion',
    ['Yes: diffusion continues until the two regions are completely mixed', 'MC-2'],
    ['No: it stops only when an external battery is connected across the junction', 'MC-1'],
    'MC-2 and MC-1 the depletion region forms by itself and diffusion stops, re-asked as when diffusion ends'),
  card('phys.mod.diode-rectification', 'step_check', H,
    'A silicon diode is reverse biased. What current flows?',
    'A tiny leakage (reverse saturation) current, not exactly zero',
    ['Exactly zero, since the diode blocks completely', 'MC-3'],
    ['A current proportional to the voltage, as in a resistor', 'MC-1'],
    'MC-3 and MC-1 reverse current is small but not zero and not ohmic'),
]

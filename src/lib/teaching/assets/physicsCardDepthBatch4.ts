/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 4 (phys.mod part 1, 17 cards).
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

export const PHYSICS_CARD_DEPTH_BATCH_4: SeedProbe[] = [
  // ─── phys.mod.atomic-spectra ─────────────────────────────────────────────
  card('phys.mod.atomic-spectra', 'step_check', H,
    'Electrons in hydrogen falling to n = 1 produce which series, and in which region?',
    'The Lyman series, in the ultraviolet',
    ['The Balmer series, which contains every line in the hydrogen spectrum', 'MC-2'],
    ['The Paschen series, in the visible region', ''],
    'MC-2 each series ends on its own level, re-asked with n = 1'),
  card('phys.mod.atomic-spectra', 'fill_blank', H,
    'Complete the sentence: the dark absorption lines of hydrogen appear at ____ the wavelengths of its bright emission lines.',
    'the same wavelengths as, since the same energy gaps are involved',
    ['different wavelengths from, since absorption is a different process from emission', 'MC-1'],
    ['twice the wavelengths of, since a photon must go in as well as out', ''],
    'MC-1 emission and absorption lines coincide, re-asked as a completion'),

  // ─── phys.mod.binding-energy ─────────────────────────────────────────────
  card('phys.mod.binding-energy', 'step_check', H,
    'Assembling ⁴He releases 28.3 MeV. How much energy must be supplied to split it into 2 protons and 2 neutrons?',
    '28.3 MeV: the same energy that assembly released',
    ['None: splitting a nucleus releases the binding energy, as assembling it does', 'MC-3'],
    ['14.15 MeV, half of it, since the pieces start out loosely bound', ''],
    'MC-3 binding energy is released on assembly and required on separation'),

  // ─── phys.mod.bohr-model ─────────────────────────────────────────────────
  card('phys.mod.bohr-model', 'step_check', H,
    'Which species does E_n = −13.6 Z²/n² eV describe well?',
    'One-electron ions such as He⁺ (Z = 2) and Li²⁺ (Z = 3)',
    ['Every atom and ion, whatever its number of electrons', 'MC-3'],
    ['Neutral hydrogen only, and never any ion', ''],
    'MC-3 the Bohr formula covers hydrogen-like ions, re-asked as which species'),
  card('phys.mod.bohr-model', 'fill_blank', H,
    'Complete the sentence: in emission n_i is ____ n_f, and in absorption n_i is ____ n_f.',
    'greater than; less than',
    ['equal to; equal to, because emission and absorption are the same process', 'MC-2'],
    ['less than; greater than, because a photon always lifts the electron', ''],
    'MC-2 emission and absorption are opposite changes, re-asked as a completion'),

  // ─── phys.mod.compton-effect ─────────────────────────────────────────────
  card('phys.mod.compton-effect', 'step_check', H,
    'A photon is backscattered at 180° by an electron. By how much does its wavelength increase?',
    '2λ_C, the maximum shift (about 0.0049 nm)',
    ['Not at all: the shift is zero when the photon turns back', 'MC-4'],
    ['λ_C (about 0.0024 nm), the same as at 90°', ''],
    'MC-4 the shift is zero only for θ = 0, re-asked with 180°'),
  card('phys.mod.compton-effect', 'fill_blank', H,
    'Complete the sentence: the classical wave model of scattering predicts a wavelength shift Δλ of ____.',
    'zero, since the electron only re-radiates at the incident frequency',
    ['the same Compton shift, so no photon picture is needed', 'MC-WAVE-MODEL-PREDICTS-SAME-RESULT'],
    ['a shift that grows with the intensity of the beam', ''],
    'the wave model predicts no shift, re-asked as a completion'),

  // ─── phys.mod.de-broglie ─────────────────────────────────────────────────
  card('phys.mod.de-broglie', 'step_check', H,
    'A proton\'s speed is tripled (non-relativistic). What happens to its de Broglie wavelength?',
    'It falls to one third, since λ = h/p and the momentum p triples',
    ['It triples, since faster particles have longer wavelengths', 'MC-4'],
    ['It is unchanged, since the wavelength depends only on the mass', ''],
    'MC-4 faster means shorter wavelength, re-asked with a proton'),
  card('phys.mod.de-broglie', 'fill_blank', H,
    'Complete the sentence: electrons fired through a thin crystal form diffraction rings, which shows that matter waves are ____.',
    'experimentally confirmed, not just theoretical',
    ['only a mathematical idea with no experimental support', 'MC-1'],
    ['confirmed for photons, but never for particles with mass', ''],
    'MC-1 matter waves are experimentally confirmed, re-asked with electron diffraction'),

  // ─── phys.mod.nuclear-fission ────────────────────────────────────────────
  card('phys.mod.nuclear-fission', 'step_check', H,
    'U-235 can split into Kr + Ba, but also into other pairs such as Sr + Xe. What does this show?',
    'Fission gives a statistical spread of fragment pairs, peaking near A ≈ 95 and A ≈ 139',
    ['Only one pair is real; the others are textbook errors', 'MC-2'],
    ['Every fission splits the nucleus into equal halves of about A = 118', ''],
    'MC-2 fission has no single fragment pair, re-asked with Sr and Xe'),

  // ─── phys.mod.nuclear-fusion ─────────────────────────────────────────────
  card('phys.mod.nuclear-fusion', 'step_check', H,
    'Per kilogram of fuel, which releases more energy: D-T fusion or U-235 fission?',
    'Fusion, even though a single fission event releases more than a single fusion event',
    ['Fission, since each fission event releases more energy than a fusion event', 'MC-4'],
    ['They release the same energy per kilogram', ''],
    'MC-4 per event fission wins, per mass fusion wins'),
  card('phys.mod.nuclear-fusion', 'fill_blank', H,
    'Complete the sentence: fusion needs plasma at about 10⁸ K because the nuclei must overcome ____.',
    'their mutual Coulomb repulsion',
    ['nothing in particular: fusion is easy because it releases energy', 'MC-1'],
    ['the strong force, which pushes light nuclei apart at long range', ''],
    'MC-1 fusion releases energy but needs the Coulomb barrier overcome'),

  // ─── phys.mod.nuclear-models ─────────────────────────────────────────────
  card('phys.mod.nuclear-models', 'step_check', H,
    '¹⁵N has 7 protons and 8 neutrons. In the shell model, is it magic?',
    'Singly magic: N = 8 is a magic number, but Z = 7 is not',
    ['Not magic, since protons and neutrons share one combined filling of 15 nucleons', 'MC-3'],
    ['Doubly magic, since it sits next to ¹⁶O', ''],
    'MC-3 protons and neutrons fill separately, re-asked with ¹⁵N'),
  card('phys.mod.nuclear-models', 'fill_blank', H,
    'Complete the sentence: magic numbers show up as nuclei with unusually ____.',
    'high nucleon separation energies',
    ['high natural abundance, since magic nuclei are the most common isotopes', 'MC-4'],
    ['short half-lives, since a magic nucleus is always unstable', ''],
    'MC-4 magic does not mean common, re-asked as a completion'),

  // ─── phys.mod.nuclear-reactions ──────────────────────────────────────────
  card('phys.mod.nuclear-reactions', 'step_check', H,
    'A balanced reaction has Q = −1.2 MeV, and the projectile has 0.5 MeV of kinetic energy. Will it occur?',
    'No: Q < 0, so the projectile needs more than 1.2 MeV',
    ['Yes, since the equation is balanced, the reaction happens spontaneously', 'MC-2'],
    ['Yes, since any positive kinetic energy is enough to start it', ''],
    'MC-2 a balanced equation does not make a reaction spontaneous'),
  card('phys.mod.nuclear-reactions', 'fill_blank', H,
    'Complete the sentence: in ¹⁴C → ¹⁴N + e⁻ + ν̄ₑ, charge is conserved because the total charge is ____.',
    '+6e on both sides, counting the electron\'s −e',
    ['+6e before and +7e after, since the proton number changes', 'MC-4'],
    ['zero on both sides, since the neutrino is neutral', ''],
    'MC-4 charge is conserved over all products, re-asked as a completion'),

  // ─── phys.mod.photoelectric-effect (undergraduate) ───────────────────────
  card('phys.mod.photoelectric-effect', 'step_check', U,
    'Cs has φ = 2.1 eV and Pt has φ = 5.6 eV. Light of 3.5 eV photons shines on both. What happens?',
    'Cs emits electrons (K_max = 1.4 eV); Pt emits none',
    ['Both emit electrons, since the work function is the same for every metal', 'MC-4'],
    ['Pt emits more, since a larger work function makes a better emitter', ''],
    'MC-4 the work function is material specific, re-asked with Cs and Pt'),
]

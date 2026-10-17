/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 5 (phys.mod part 2, phys.therm, phys.mech, phys.opt part 2, phys.wave, 16 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds true_false, misconception_probe and mcq probes (or, for the formative concepts, mcq, misconception_probe, checkpoint and short_answer probes) at its own band, so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
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

export const PHYSICS_CARD_DEPTH_BATCH_5: SeedProbe[] = [
  // ─── phys.mod.photons ────────────────────────────────────────────────────
  card('phys.mod.photons', 'step_check', H,
    'A 1 mW violet laser (400 nm) and a 5 mW red laser (700 nm) are compared. Which delivers more photons per second?',
    'The red laser: it has more power, and each red photon carries less energy',
    ['The violet laser, since each of its photons is more energetic, so it must emit more of them', 'MC-BRIGHT-BEAM-HAS-MORE-ENERGETIC-PHOTONS'],
    ['Both deliver the same number, since photon count depends only on frequency', ''],
    'photon energy depends on frequency and photon count on power, re-asked as photons per second'),
  card('phys.mod.photons', 'fill_blank', H,
    'Complete the sentence: a photon of wavelength λ carries momentum p = ____.',
    'h/λ (equal to E/c), although its rest mass is zero',
    ['0, since its rest mass is zero and so it can carry no momentum', 'MC-PHOTON-HAS-NO-MOMENTUM'],
    ['hλ, the product of the Planck constant and the wavelength', ''],
    'a photon carries momentum h/λ, re-asked as a completion'),

  // ─── phys.mod.radioactive-decay ──────────────────────────────────────────
  card('phys.mod.radioactive-decay', 'step_check', H,
    'A sample starts with 800 nuclei. How many remain after three half-lives?',
    '100: each half-life halves the number left (800 → 400 → 200 → 100)',
    ['0, because decay removes half of the original amount each time and nothing is left after two', 'MC-1'],
    ['267, found by dividing 800 by 3', ''],
    'MC-1 each half-life halves what is left, re-asked with 800 nuclei'),
  card('phys.mod.radioactive-decay', 'fill_blank', H,
    'Complete the sentence: a half-life of 5 s tells us that a single nucleus ____.',
    'has a 50% chance of decaying within 5 s, and could decay at any moment',
    ['will certainly decay at exactly 5 s, which is what its half-life predicts', 'MC-3'],
    ['will decay after exactly 10 s, which is two half-lives', ''],
    'MC-3 the half-life describes an ensemble, re-asked for a single nucleus'),

  // ─── phys.mod.radioactivity ──────────────────────────────────────────────
  card('phys.mod.radioactivity', 'step_check', H,
    'In the beta-minus decay of ¹⁴C, why do the electrons emerge with a spread of energies?',
    'A third particle, the antineutrino, shares the decay energy',
    ['There is no third particle: the electron alone takes the energy, which varies at random', 'MC-2'],
    ['The electrons lose different amounts of energy in the surrounding atoms', ''],
    'MC-2 the antineutrino accompanies beta decay, re-asked with ¹⁴C'),
  card('phys.mod.radioactivity', 'fill_blank', H,
    'Complete the sentence: of the three radiations, ____ is the most ionising but the least penetrating.',
    'alpha, which is stopped by paper or skin',
    ['gamma, because it carries the most energy and so is the most dangerous', 'MC-3'],
    ['beta, since it is intermediate in every property', ''],
    'MC-3 alpha ionises most and penetrates least, re-asked as a completion'),

  // ─── phys.mod.wave-particle-duality ──────────────────────────────────────
  card('phys.mod.wave-particle-duality', 'step_check', H,
    'Electrons reach a double slit one at a time, each landing as a single dot. What builds the interference pattern?',
    'Many whole electrons, each landing where the probability wave allows',
    ['Each electron splits in two, and the halves interfere on the screen', 'MC-1'],
    ['The electrons bump into each other and are pushed into bands', ''],
    'MC-1 the electron does not split, re-asked with single-electron arrivals'),
  card('phys.mod.wave-particle-duality', 'fill_blank', H,
    'Complete the sentence: the wave and particle descriptions of light are ____.',
    'complementary: both partly true, and neither complete on its own',
    ['taken in turns, as light literally switches between wave and particle', 'MC-3'],
    ['contradictory, so one of them must eventually be abandoned', ''],
    'MC-3 duality is complementarity, not alternation, re-asked as a completion'),

  // ─── phys.mod.x-rays ─────────────────────────────────────────────────────
  card('phys.mod.x-rays', 'step_check', H,
    'In 2d sin θ = nλ, X-rays strike the crystal planes at 20° to the plane surface. What value of θ goes in the formula?',
    'θ = 20°, measured from the plane surface',
    ['θ = 70°, measured from the normal to the planes', 'MC-BRAGG-ANGLE-FROM-NORMAL'],
    ['θ = 40°, the angle between the incident and the reflected beams', ''],
    'the Bragg angle is the glancing angle, re-asked with 20°'),
  card('phys.mod.x-rays', 'fill_blank', H,
    'Complete the sentence: the shortest wavelength that a 50 kV X-ray tube can emit is λ_min = ____.',
    'hc/(eV), about 0.025 nm: no photons have a shorter wavelength',
    ['zero, since the tube emits photons of every wavelength', 'MC-ALL-PHOTON-ENERGIES-FROM-XRAY-TUBE'],
    ['about 0.25 nm, as if the tube ran at 5 kV', ''],
    'the tube voltage sets a minimum wavelength, re-asked as λ_min'),

  // ─── phys.therm.temperature ──────────────────────────────────────────────
  card('phys.therm.temperature', 'step_check', H,
    'A cup of tea at 80 °C and a swimming pool at 25 °C are compared. Which statement is correct?',
    'The tea is hotter, but the pool holds far more thermal energy',
    ['The tea holds more thermal energy, since temperature measures how much heat a body contains', 'MC-TEMPERATURE-IS-HEAT'],
    ['The pool is hotter, since it is much the bigger of the two', ''],
    'temperature is not heat, re-asked with a cup of tea and a pool'),

  // ─── phys.mech.universal-gravitation ─────────────────────────────────────
  card('phys.mech.universal-gravitation', 'step_check', H,
    'Two masses attract with force F. Their separation is tripled. What is the new force?',
    'F/9, since the force falls as 1/r²',
    ['F/3, since the force falls linearly with the distance', 'MC-INVERSE-LINEAR'],
    ['9F, since the force grows with the square of the distance', ''],
    'gravity follows an inverse-square law, re-asked with a tripled separation'),

  // ─── phys.opt.lenses ─────────────────────────────────────────────────────
  card('phys.opt.lenses', 'step_check', H,
    'An object is 5 cm from a convex lens of f = +10 cm. What does the lens do?',
    'It forms a virtual, upright image 10 cm away; the emerging rays still diverge',
    ['It forms a real image, since a convex lens always brings rays to a point', 'MC-CONVEX-ALWAYS-CONVERGES'],
    ['It forms no image, because the object is inside the focal length', ''],
    'a convex lens with the object inside f gives a virtual image'),
  card('phys.opt.lenses', 'fill_blank', H,
    'Two thin lenses of powers 2 D and 3 D are 10 cm apart instead of touching. The combined power is ____.',
    '4.4 D, from P₁ + P₂ − dP₁P₂',
    ['5 D, since powers always add whatever the separation is', 'MC-POWER-SEPARATED'],
    ['6 D, the product of the two powers', ''],
    'powers add only for lenses in contact, re-asked with a 10 cm gap'),

  // ─── phys.wave.doppler-effect ────────────────────────────────────────────
  card('phys.wave.doppler-effect', 'step_check', H,
    'A source moves towards you. How do its wavefronts reach you?',
    'Bunched closer together: a shorter wavelength and a higher observed frequency',
    ['Spread further apart, which lowers the pitch', 'MC-APPROACHING-SPREADS-WAVES'],
    ['At a higher speed through the air, which raises the pitch', 'MC-DOPPLER-CHANGES-SPEED'],
    'an approaching source bunches the wavefronts, re-asked as how they arrive'),

  // ─── phys.mech.torque ────────────────────────────────────────────────────
  card('phys.mech.torque', 'step_check', H,
    'A 30 N force acts on a 0.5 m wrench at 30° to the wrench. What is the torque?',
    '7.5 N·m: only the component perpendicular to the wrench, F sin 30°, produces torque',
    ['Zero, since only a force at exactly 90° to the wrench produces any torque', 'MC-TORQUE-PERPENDICULAR-ONLY'],
    ['13 N·m, found by using F cos 30° instead of F sin 30°', ''],
    'torque is rF sin θ, re-asked with a wrench at 30°'),
]

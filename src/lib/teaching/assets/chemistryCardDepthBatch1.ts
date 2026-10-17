/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 1 (chem.alc, chem.anal and chem.atomic (part 1), 16 cards).
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
 * and abandon the live row's identity. Each chemistry concept already uses HIGH : mcq, misconception_probe, checkpoint (plus numeric, step_check, fill_blank or true_false on some), so the new cards take the FREE slots HIGH : short_answer and, where a second card is needed, true_false.
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'chemistry'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'short_answer' | 'fill_blank' | 'true_false'

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

export const CHEMISTRY_CARD_DEPTH_BATCH_1: SeedProbe[] = [
  // ─── chem.alc.alcohols ───────────────────────────────────────────────────
  card('chem.alc.alcohols', 'short_answer', H,
    'Ethanol is shaken with aqueous NaOH, and 1-butanol is separately treated with PCC in dichloromethane. A student predicts that ethanol reacts completely with the NaOH because it has an –OH group, and that PCC gives butanoic acid. Which statement is correct?',
    'Ethanol (pKₐ ≈ 16) does not react appreciably with NaOH (K ≈ 0.5), and PCC stops at butanal',
    ['Ethanol reacts completely with NaOH, because any –OH group is acidic enough to be neutralised by a strong base', 'MC1'],
    ['PCC gives butanoic acid, because every oxidising agent takes a primary alcohol all the way to the carboxylic acid', 'MC2'],
    'MC1 pKₐ comparison, MC2 PCC vs aqueous KMnO₄, re-asked with ethanol/NaOH and 1-butanol/PCC'),
  card('chem.alc.alcohols', 'true_false', H,
    'Which statement about 2-methylpropan-2-ol (a tertiary alcohol) and acidified dichromate is correct?',
    'It is not oxidised under mild conditions, because the carbinol carbon has no α-hydrogen to remove',
    ['It is oxidised to a ketone, because three carbon groups on the carbinol carbon make it the most reactive alcohol', 'MC3'],
    ['It reacts with aqueous NaOH to give a sodium salt, because any –OH group is acidic like phenol', 'MC1'],
    'MC3 α-hydrogen requirement, MC1 alcohol vs NaOH, re-asked with 2-methylpropan-2-ol'),

  // ─── chem.alc.ethers ─────────────────────────────────────────────────────
  card('chem.alc.ethers', 'short_answer', H,
    'A student says diethyl ether cannot dissolve in water at all because it has no O–H group, and plans to make ethyl tert-butyl ether from sodium ethoxide and tert-butyl bromide. Which statement is correct?',
    'The ether oxygen accepts hydrogen bonds, so it is slightly soluble; Williamson needs a primary halide',
    ['Ethers are insoluble, because without an O–H group no hydrogen bonding with water is possible', 'MC1'],
    ['Sodium ethoxide with tert-butyl bromide works, because any halide can be the electrophile in a Williamson synthesis', 'MC2'],
    'MC1 ether H-bond acceptor, MC2 Williamson halide choice, re-asked with diethyl ether and tert-butyl bromide'),
  card('chem.alc.ethers', 'true_false', H,
    'Methyl isopropyl ether is made by Williamson synthesis and later cleaved with HI. Which statement is correct?',
    'Make it from sodium isopropoxide with methyl iodide, and HI later attacks the methyl carbon by SN2',
    ['Make it from sodium methoxide with isopropyl bromide, because any halide can serve as the electrophile', 'MC2'],
    ['HI attacks the larger isopropyl carbon, because ether cleavage always occurs at the bigger group', 'MC3'],
    'MC2 Williamson, MC3 cleavage site, re-asked with methyl isopropyl ether'),

  // ─── chem.alc.phenols ────────────────────────────────────────────────────
  card('chem.alc.phenols', 'short_answer', H,
    'Phenol is added to aqueous NaOH and, separately, treated with bromine water. A student says phenol is less acidic than water because R–OH bonds are weak acids, and that its –OH group directs incoming electrophiles to the meta position. Which statement is correct?',
    'Phenol (pKₐ ≈ 10) is more acidic than water, and –OH is an ortho/para director',
    ['Phenol is less acidic than water, because alcohol-type O–H bonds are weaker acids than H₂O', 'MC1'],
    ['The –OH group directs meta, because oxygen is electronegative and withdraws electrons from the ring', 'MC2'],
    'MC1 pKₐ scale, MC2 –OH directing effect, re-asked with NaOH and bromine water'),

  // ─── chem.anal.chromatography ────────────────────────────────────────────
  card('chem.anal.chromatography', 'short_answer', H,
    'On a TLC plate a dye has Rf = 0.08, and in size-exclusion chromatography a large protein is run with a small salt. A student says the low Rf means the dye barely interacts with the silica, and that the large protein elutes last. Which statement is correct?',
    'A low Rf means strong attraction to the stationary phase, and the large protein elutes first',
    ['A low Rf means weak interaction with the stationary phase, since the dye barely moved', 'MC1'],
    ['The large protein elutes last, because large molecules take longer to get through the column', 'MC2'],
    'MC1 Rf and affinity, MC2 SEC elution order, re-asked with a TLC dye and a protein/salt run'),

  // ─── chem.anal.gravimetric ───────────────────────────────────────────────
  card('chem.anal.gravimetric', 'short_answer', H,
    'In a sulfate determination 0.466 g of BaSO₄ (M = 233.4 g/mol) is weighed, and the sulfate ion has M = 96.06 g/mol. A student computes the mass of sulfate with the factor 233.4/96.06 and adds exactly one equivalent of BaCl₂ to avoid wasting reagent. Which statement is correct?',
    'The factor is M(SO₄²⁻)/M(BaSO₄) ≈ 0.41, giving about 0.192 g, and a slight excess of BaCl₂ drives precipitation to completion',
    ['The factor is M(BaSO₄)/M(SO₄²⁻) ≈ 2.43, so the sulfate mass is about 1.13 g', 'MC1'],
    ['Exactly one equivalent of BaCl₂ is best, because any excess precipitating agent only causes errors', 'MC3'],
    'MC1 gravimetric factor direction, MC3 deliberate excess, re-asked with 0.466 g BaSO₄'),

  // ─── chem.anal.volumetric ────────────────────────────────────────────────
  card('chem.anal.volumetric', 'short_answer', H,
    'Ethanoic acid (weak) is titrated with NaOH, and in a back-titration 0.00300 mol HCl was added to CaCO₃ and 0.00120 mol HCl remained. A student says methyl orange suits any titration, and that the 0.00120 mol is the HCl that reacted with the CaCO₃. Which statement is correct?',
    'Use phenolphthalein (the equivalence point is above pH 7), and 0.00300 − 0.00120 = 0.00180 mol HCl reacted',
    ['Methyl orange works just as well, since any indicator can be used for any titration', 'MC1'],
    ['0.00120 mol HCl reacted, because the back-titrant\'s moles equal the analyte\'s', 'MC2'],
    'MC1 indicator choice, MC2 back-titration subtraction, re-asked with ethanoic acid and CaCO₃'),

  // ─── chem.atomic.atomic-spectra ──────────────────────────────────────────
  card('chem.atomic.atomic-spectra', 'short_answer', H,
    'A student compares a hot tungsten filament with a neon discharge tube and a sodium vapour lamp. She says both glowing sources give the same kind of spectrum, and that sodium\'s absorption lines and emission lines are different fingerprints. Which statement is correct?',
    'The filament gives a continuous spectrum and neon gives lines; sodium\'s absorption and emission lines coincide',
    ['The filament and neon both give line spectra, because both glow', 'MC1'],
    ['Sodium\'s absorption lines fall at different wavelengths from its emission lines, as separate fingerprints', 'MC3'],
    'MC1 source type, MC3 emission = absorption wavelengths, re-asked with tungsten, neon and sodium'),

  // ─── chem.atomic.atomic-theory ───────────────────────────────────────────
  card('chem.atomic.atomic-theory', 'short_answer', H,
    'A student says Rutherford\'s gold-foil experiment disproved the existence of electrons, and that all boron atoms are identical because they are the same element. Which statement is correct?',
    'Rutherford kept the electrons and moved only the positive charge; ¹⁰B and ¹¹B differ in neutrons',
    ['Rutherford disproved Thomson entirely, so electrons were shown not to exist', 'MC1'],
    ['All boron atoms are identical, since atoms of the same element cannot differ in any way whatsoever', 'MC3'],
    'MC1 Rutherford revised Thomson, MC3 isotopes, re-asked with boron'),

  // ─── chem.atomic.electromagnetic-radiation ───────────────────────────────
  card('chem.atomic.electromagnetic-radiation', 'short_answer', H,
    'A student says X-rays, having a higher frequency than radio waves, must have the longer wavelength, and that a radio transmitter\'s waves carry no energy. Which statement is correct?',
    'X-rays have a shorter wavelength (c = λν), and radio photons carry a small but nonzero energy that adds up over very many photons',
    ['X-rays have the longer wavelength, since higher frequency means longer wavelength', 'MC1'],
    ['Radio waves carry no energy at all, which is why a transmitter\'s waves are harmless', 'MC3'],
    'MC1 c = λν, MC3 radio photon energy, re-asked with X-rays and a radio transmitter'),

  // ─── chem.atomic.electronic-config ───────────────────────────────────────
  card('chem.atomic.electronic-config', 'short_answer', H,
    'A student writes Mn²⁺ (Mn is [Ar]3d⁵4s²) as [Ar]3d³4s² by removing two 3d electrons, and says copper\'s [Ar]3d¹⁰4s¹ is a memorised exception with no reason behind it. Which statement is correct?',
    'Mn²⁺ is [Ar]3d⁵ (4s leaves first), and copper\'s 3d¹⁰4s¹ reflects filled-subshell stability',
    ['Mn²⁺ is [Ar]3d³4s², because the 3d electrons are removed first', 'MC1'],
    ['Copper\'s 3d¹⁰4s¹ is simply a memorised exception with no explanation behind it, so just learn it', 'MC3'],
    'MC1 4s leaves first, MC3 Cr/Cu pattern has a reason, re-asked with Mn²⁺ and Cu'),
  card('chem.atomic.electronic-config', 'true_false', H,
    'Carbon has six electrons. Which statement about its ground-state configuration is correct?',
    '1s² 2s² 2p²: 1s and 2s fill and pair first, and the two 2p electrons go into separate 2p orbitals with parallel spins',
    ['1s¹ 2s¹ 2p⁴, because Hund\'s rule puts one electron in every orbital before any pairing', 'MC2'],
    ['1s² 2s² 2p² with both 2p electrons paired in one orbital, because that gives the lowest energy', ''],
    'MC2 Hund\'s rule applies within a degenerate set only, re-asked with carbon'),

  // ─── chem.atomic.photoelectric-effect ────────────────────────────────────
  card('chem.atomic.photoelectric-effect', 'short_answer', H,
    'A zinc plate shows no emission under intense red light. A student says turning the intensity up enough will eject electrons, and that a perfect instrument could measure an electron\'s position and momentum exactly. Which statement is correct?',
    'hν must exceed the work function, so intensity only changes the count; Δx·Δp ≥ ħ/2 is intrinsic',
    ['Enough intensity will eject electrons, because many red photons can pool their energy', 'MC1'],
    ['A perfect instrument could measure both exactly, because the limit only reflects imprecise instruments', 'MC3'],
    'MC1 threshold frequency, MC3 uncertainty principle, re-asked with zinc and red light'),

  // ─── chem.atomic.quantum-numbers ─────────────────────────────────────────
  card('chem.atomic.quantum-numbers', 'short_answer', H,
    'For the n = 2 shell, a student lists l = 1, 2 and says mₛ is a property of an orbital, so an empty 2p orbital still has mₛ = +½. Which statement is correct?',
    'For n = 2 the values are l = 0 and 1 (s and p); mₛ belongs to an electron, so an empty orbital has no mₛ',
    ['The allowed values for n = 2 are l = 1 and 2', 'MC1'],
    ['An empty 2p orbital has mₛ = +½, since spin is a property of the orbital', 'MC3'],
    'MC1 l from 0, MC3 spin belongs to the electron, re-asked with n = 2'),
]

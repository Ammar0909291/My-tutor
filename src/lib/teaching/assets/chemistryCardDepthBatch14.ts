/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 14 (chem.alc.diols, chem.carb.aldehydes, chem.carb.ketones, chem.org.spectroscopy and chem.coord.cft (need-three concepts, part 3), 15 cards).
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
 * and abandon the live row's identity. Each chemistry concept in this batch holds one two-option card in each of mcq, misconception_probe, checkpoint, step_check and true_false, so the three new cards take the FREE slots short_answer, fill_blank and numeric (the kind is only a slot label).
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

export const CHEMISTRY_CARD_DEPTH_BATCH_14: SeedProbe[] = [
  // ─── chem.alc.diols ──────────────────────────────────────────────────────
  card('chem.alc.diols', 'short_answer', H,
    'Ethane-1,2-diol is treated with periodate. Which statement is correct?',
    'The C–C bond is cleaved, giving two molecules of methanal (HCHO)',
    ['Each OH is oxidised separately, giving ethanedioic acid with the C–C bond intact', 'MC1'],
    ['The product is ethanal, formed when one OH group is lost as water', ''],
    'MC1 periodate cleaves the C–C bond of a vicinal diol, re-asked with ethane-1,2-diol'),
  card('chem.alc.diols', 'fill_blank', H,
    'Complete the sentence: when cyclohexene is treated with OsO₄, the two new OH groups end up ____.',
    'on the same face (syn), through a concerted cyclic osmate ester',
    ['on opposite faces (anti), exactly as in the addition of Br₂ through a bromonium ion', 'MC2'],
    ['on the same carbon atom, giving a geminal diol', ''],
    'MC2 OsO₄ gives syn addition, re-asked with cyclohexene'),
  card('chem.alc.diols', 'numeric', H,
    'Which route correctly describes the acid-catalysed pinacol rearrangement?',
    'Carbocation, then a 1,2-methyl shift, then a ketone (pinacolone)',
    ['Carbocation, then proton loss, giving an alkene by simple dehydration like a monoalcohol', 'MC3'],
    ['Two molecules of the diol condense to give an ether', ''],
    'MC3 the second OH enables a rearrangement to a ketone, re-asked as a route'),

  // ─── chem.carb.aldehydes ─────────────────────────────────────────────────
  card('chem.carb.aldehydes', 'short_answer', H,
    'Hydride (H⁻) from NaBH₄ adds to the C=O of ethanal. Which statement is correct?',
    'H⁻ attacks the δ+ carbon, and the C=O π electrons move onto oxygen, giving an alkoxide',
    ['H⁻ attacks the oxygen, because oxygen is the δ− atom of the carbonyl group', 'MC1'],
    ['H⁻ attacks the carbon, and the oxygen is then lost as water to leave an alkene', ''],
    'MC1 nucleophiles attack the carbonyl carbon, re-asked with hydride and ethanal'),
  card('chem.carb.aldehydes', 'fill_blank', H,
    'Complete the sentence: because it is an aldehyde, hexanal is reduced by LiAlH₄ to ____.',
    'hexan-1-ol, a primary alcohol',
    ['hexan-2-ol, a secondary alcohol, as with any carbonyl reduction by a hydride', 'MC2'],
    ['hexanoic acid, a carboxylic acid, since LiAlH₄ adds an oxygen atom', ''],
    'MC2 aldehyde reduction gives a primary alcohol, re-asked with hexanal'),
  card('chem.carb.aldehydes', 'numeric', H,
    'Ethanal and benzaldehyde are each warmed with Fehling\'s solution. Which result is correct?',
    'Ethanal gives a brick-red precipitate, but benzaldehyde does not, and needs Tollens\' reagent',
    ['Both give a brick-red precipitate, since Fehling\'s solution detects every aldehyde', 'MC3'],
    ['Benzaldehyde gives the brick-red precipitate but ethanal does not, since the ring activates the CHO group', ''],
    'MC3 Fehling\'s works for aliphatic aldehydes only, re-asked with ethanal and benzaldehyde'),

  // ─── chem.carb.ketones ───────────────────────────────────────────────────
  card('chem.carb.ketones', 'short_answer', H,
    'Cyclohexanone and its enol differ in where one hydrogen sits (C–H against O–H). Which statement is correct?',
    'They are tautomers, different constitutional isomers that interconvert in a real equilibrium',
    ['They are resonance structures of one molecule, differing only in how the electrons are drawn', 'MC1'],
    ['They are stereoisomers, which differ only in the 3-D arrangement of the same bonds', ''],
    'MC1 tautomers are not resonance structures, re-asked with cyclohexanone'),
  card('chem.carb.ketones', 'fill_blank', H,
    'Complete the sentence: in the Baeyer–Villiger oxidation of methyl tert-butyl ketone, the oxygen is inserted ____.',
    'between the carbonyl carbon and the tert-butyl group, as tertiary groups migrate before methyl',
    ['at a random position, giving an unpredictable mixture of two esters', 'MC2'],
    ['between the carbonyl carbon and the methyl group, because the smaller group migrates first', ''],
    'MC2 migratory aptitude decides the position, re-asked with methyl tert-butyl ketone'),
  card('chem.carb.ketones', 'numeric', H,
    'Which of these is a valid way to make a ketone: (a) oxidising a secondary alcohol, (b) the Wacker process on an alkene, (c) hydrating an alkyne?',
    'All three, since ketones have several independent routes',
    ['Only (a), since a ketone can come only from oxidising a secondary alcohol', 'MC3'],
    ['Only (b) and (c), since alcohol oxidation gives aldehydes and never ketones', ''],
    'MC3 more than one route makes ketones, re-asked with three routes'),

  // ─── chem.org.spectroscopy ───────────────────────────────────────────────
  card('chem.org.spectroscopy', 'short_answer', U,
    'A mass spectrum has its tallest peak at m/z 43 and a small peak at the highest m/z, 58. A student calls m/z 43 the molecular ion because it is the base peak. Which statement is correct?',
    'The molecular ion is the highest-m/z peak (58); the tall m/z 43 peak is a fragment',
    ['m/z 43 is the molecular ion, because the tallest peak is always the molecular ion', 'MC1'],
    ['Neither peak is, since the molecular ion always appears at the lowest m/z', ''],
    'MC1 the molecular ion is the highest m/z, re-asked with 43 and 58'),
  card('chem.org.spectroscopy', 'fill_blank', U,
    'Complete the sentence: a ¹H NMR quartet shows that the proton has ____ neighbouring protons.',
    'three (peaks = neighbours + 1)',
    ['four, since each of the four peaks marks one neighbouring proton', 'MC2'],
    ['two, since a quartet is two pairs of peaks', ''],
    'MC2 neighbours = peaks − 1, re-asked with a quartet'),
  card('chem.org.spectroscopy', 'numeric', U,
    'An IR spectrum shows a very broad band from 2500 to 3300 cm⁻¹ and a strong peak at 1710 cm⁻¹. Which functional group is indicated?',
    'A carboxylic acid: a very broad O–H together with a C=O',
    ['An alcohol, since any broad O–H absorption means the compound is an alcohol', 'MC3'],
    ['A ketone, because 1710 cm⁻¹ is a C=O and the broad band is only background', ''],
    'MC3 broad O–H plus C=O means a carboxylic acid, re-asked with the two bands'),

  // ─── chem.coord.cft ──────────────────────────────────────────────────────
  card('chem.coord.cft', 'short_answer', U,
    'A student says a complex with a strong-field ligand is always more stable than one with a weak-field ligand. Which statement is correct?',
    'CFSE is only one contribution; charge, size, π-bonding and entropy matter too, and inertness is not stability',
    ['This is true, since CFSE alone decides how stable a complex is', 'MC1'],
    ['This is false, since CFSE has no effect on stability at all', ''],
    'MC1 CFSE does not solely determine stability, re-asked as a general claim'),
  card('chem.coord.cft', 'fill_blank', U,
    'Complete the sentence: tetrahedral complexes are almost always high-spin because Δtet is ____.',
    'only about 4/9 of Δoct, with fewer ligands and poorer overlap',
    ['larger than Δoct, as four ligands concentrate their repulsion on fewer orbitals', 'MC2'],
    ['equal to Δoct, since the same metal and ligands are involved', ''],
    'MC2 Δtet is smaller than Δoct, re-asked with the high-spin consequence'),
  card('chem.coord.cft', 'numeric', U,
    '[Zn(H₂O)₆]²⁺ is colourless, while [Ti(H₂O)₆]³⁺ (d¹) is purple. Which statement is correct?',
    'Zn²⁺ is d¹⁰ with no vacancy for a d–d transition; colour needs a partly filled d subshell',
    ['A colourless complex must be d⁰, so zinc\'s d subshell must be empty', 'MC3'],
    ['Both would be coloured with a strong enough ligand field, since colour does not depend on the d count', ''],
    'MC3 d⁰ and d¹⁰ complexes are colourless, re-asked with Zn²⁺ and Ti³⁺'),
]

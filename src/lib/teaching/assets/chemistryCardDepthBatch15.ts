/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 15 (chem.coord.bonding, chem.coord.applications, chem.coord.isomerism, chem.hyd.conformations, chem.elect.industrial and chem.hal.haloarenes (need-three and need-two concepts, part 4), 17 cards).
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
 * and abandon the live row's identity. Each chemistry concept in this batch holds one two-option card in each of mcq, misconception_probe, checkpoint, step_check and true_false (chem.hal.haloarenes also holds a third mcq that already has three options, so it receives two cards), so the new cards take the FREE slots short_answer, fill_blank and numeric (the kind is only a slot label).
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

export const CHEMISTRY_CARD_DEPTH_BATCH_15: SeedProbe[] = [
  // ─── chem.coord.bonding ──────────────────────────────────────────────────
  card('chem.coord.bonding', 'short_answer', U,
    'A student says low-spin [Fe(CN)₆]³⁻ and high-spin [FeF₆]³⁻ must use the same hybrids, because each makes six hybrids from one s, three p and two d orbitals. Which statement is correct?',
    'No: d²sp³ uses inner 3d orbitals (low-spin), sp³d² uses outer 4d orbitals (high-spin)',
    ['Yes, any scheme with one s, three p and two d gives the same six orbitals and the same magnetism', 'MC1'],
    ['No, because [Fe(CN)₆]³⁻ is octahedral while [FeF₆]³⁻ is tetrahedral', ''],
    'MC1 d²sp³ and sp³d² are different orbitals, re-asked with Fe³⁺ complexes'),
  card('chem.coord.bonding', 'fill_blank', U,
    'Complete the sentence: relative to a π-donor halide, the π-acceptor CO gives a ____ splitting Δ.',
    'larger, since back-donation lowers the t₂g level',
    ['smaller, since the halide donates more electron density and so is the stronger-field ligand', 'MC2'],
    ['the same, because both ligands bond to the metal through a lone pair', ''],
    'MC2 π-donors weaken the field and π-acceptors strengthen it, re-asked with CO and halides'),
  card('chem.coord.bonding', 'numeric', U,
    'Which statement about valence bond theory (VBT) and molecular orbital / ligand field theory (MO/LFT) is correct?',
    'VBT still predicts geometry and magnetic behaviour; MO/LFT is needed for spectra, bond energies and quantitative Δ',
    ['MO/LFT shows that VBT is wrong, so VBT should not be used for any prediction', 'MC3'],
    ['VBT can predict colour and quantitative Δ, so MO/LFT adds nothing further', ''],
    'MC3 VBT and MO/LFT answer different questions, re-asked as a comparison'),

  // ─── chem.coord.applications ─────────────────────────────────────────────
  card('chem.coord.applications', 'short_answer', U,
    'Carbon monoxide binds the Fe²⁺ of haemoglobin more strongly than O₂ does. A student says it therefore destroys the haemoglobin it binds to. Which statement is correct?',
    'CO binding is a reversible competition for the same Fe²⁺ site, so high O₂ can displace it',
    ['Haemoglobin is structurally destroyed by CO, so the blood can never carry O₂ again afterwards', 'MC1'],
    ['CO binds a different site from O₂, so O₂ can still reach the iron without any competition at all', ''],
    'MC1 CO poisoning is reversible competition, re-asked with the binding strength'),
  card('chem.coord.applications', 'fill_blank', U,
    'Complete the sentence: transplatin is clinically inactive because it ____.',
    'does react with DNA, but makes interstrand cross-links the cell repairs efficiently',
    ['cannot react with DNA, as Pt(II) is unreactive unless the two ligands are in the cis arrangement', 'MC2'],
    ['makes the same GG intrastrand cross-links as cisplatin, but cannot enter the cell at all', ''],
    'MC2 transplatin reacts but makes repairable lesions, re-asked as a definition'),
  card('chem.coord.applications', 'numeric', U,
    'Chlorophyll absorbs red and blue light and reflects green. Where does the absorption come from?',
    'The extended π system of the porphyrin ring, since Mg²⁺ is d⁰ and has no d–d transitions',
    ['The Mg²⁺ ion at the centre, which absorbs light through d–d transitions', 'MC3'],
    ['An iron ion in the ring, as in haemoglobin, since every biological pigment contains iron', ''],
    'MC3 Mg²⁺ is d⁰ so it is not the chromophore, re-asked as the source of absorption'),

  // ─── chem.coord.isomerism ────────────────────────────────────────────────
  card('chem.coord.isomerism', 'short_answer', U,
    'A student says cis- and trans-[Co(NH₃)₄Cl₂]⁺ interconvert freely at room temperature, like the gauche and anti forms of butane. Which statement is correct?',
    'They are distinct, isolable compounds; interconverting them needs bond breaking, unlike conformers',
    ['They are conformers that rotate into each other freely, so only one of them can be bottled', 'MC1'],
    ['They are enantiomers, since only mirror-image forms of a complex can be isolated', ''],
    'MC1 geometric isomers are not conformers, re-asked with cis/trans-[Co(NH₃)₄Cl₂]⁺'),
  card('chem.coord.isomerism', 'fill_blank', U,
    'Complete the sentence: the nitrito isomer of [Co(NH₃)₅(NO₂)]²⁺ converts to the nitro isomer only when ____.',
    'it is heated or irradiated, which breaks and re-forms the Co–O bond',
    ['it is left in solution, because the ligand keeps switching ends at room temperature', 'MC2'],
    ['it is dissolved in water, because the solvent swaps the ends of the ligand', ''],
    'MC2 linkage isomers are stable until activated, re-asked with the conversion condition'),
  card('chem.coord.isomerism', 'numeric', U,
    'trans-[Co(en)₂Cl₂]⁺ and cis-[Co(en)₂Cl₂]⁺ share one formula. Which statement is correct?',
    'The trans form has an internal mirror plane and is achiral; the cis form has none and is chiral (Δ/Λ)',
    ['Neither is chiral, since the formula itself contains a mirror plane', 'MC3'],
    ['Both are chiral, since any bis-chelate octahedral complex has optical isomers', ''],
    'MC3 chirality belongs to each geometric isomer, re-asked with cis and trans'),

  // ─── chem.hyd.conformations ──────────────────────────────────────────────
  card('chem.hyd.conformations', 'short_answer', U,
    'Which conformation of ethane is lower in energy, and why?',
    'Staggered: eclipsed has close non-bonded H–H contacts that cause repulsive torsional strain',
    ['Eclipsed, because the orbital overlap between the aligned C–H bonds is stabilising, as in bond formation', 'MC1'],
    ['Neither, since all conformations of ethane have the same energy when rotation is free', ''],
    'MC1 eclipsed is destabilised, re-asked as a comparison'),
  card('chem.hyd.conformations', 'fill_blank', U,
    'Complete the sentence: each carbon of ethane in a Newman projection has ____ bonds in total.',
    'four (three drawn lines plus the C–C bond along the line of sight)',
    ['six (three drawn lines from each of the two carbons)', 'MC2'],
    ['three (only the lines that are drawn count)', ''],
    'MC2 count the implied C–C bond, re-asked as a count per carbon'),
  card('chem.hyd.conformations', 'numeric', U,
    'Methylcyclohexane with its methyl group axial undergoes a ring flip. Which statement is correct?',
    'The methyl becomes equatorial, the more stable arrangement, though the axial and equatorial totals are unchanged',
    ['The methyl stays axial, since the total number of axial and equatorial bonds does not change', 'MC3'],
    ['The methyl becomes equatorial, and the two forms are equally stable since they are the same molecule', ''],
    'MC3 a ring flip swaps each substituent\'s position, re-asked with an axial methyl'),

  // ─── chem.elect.industrial ───────────────────────────────────────────────
  card('chem.elect.industrial', 'short_answer', U,
    'Molten NaCl is electrolysed in one cell and brine in another. A student says both cells give sodium metal at the cathode, since both use sodium chloride. Which statement is correct?',
    'Molten NaCl gives Na metal (Down\'s cell); in brine, water is reduced, giving H₂ and NaOH',
    ['Both cells give Na metal at the cathode, since the salt being electrolysed is the same in each', 'MC1'],
    ['Brine gives Na metal and molten NaCl gives H₂, since water is needed to free the sodium metal', ''],
    'MC1 state and competing species change the products, re-asked with molten NaCl and brine'),
  card('chem.elect.industrial', 'fill_blank', U,
    'Complete the sentence: in the Hall-Héroult process the carbon anode is ____.',
    'consumed by the oxygen released (C + O₂ → CO₂) and must be replaced',
    ['inert and permanent, since it only carries the current into the melt', 'MC2'],
    ['plated with aluminium, which is why it has to be changed regularly', ''],
    'MC2 the carbon anode reacts with the O₂, re-asked as a definition'),
  card('chem.elect.industrial', 'numeric', U,
    'A steel key is silver-plated in a cell with a pure silver bar and silver nitrate solution. Which statement is correct?',
    'The key is the cathode, where Ag⁺ is reduced, and the silver bar is the anode that dissolves',
    ['The key is the anode, since it is the object that has to receive the silver', 'MC3'],
    ['Both are cathodes, since silver is deposited on every electrode in the cell', ''],
    'MC3 the object to be plated is the cathode, re-asked with a key and a silver bar'),

  // ─── chem.hal.haloarenes (already holds one 3-option card, so it gets two) ──
  card('chem.hal.haloarenes', 'short_answer', H,
    'Chlorobenzene and 2,4-dinitrochlorobenzene are each treated with ammonia at room temperature. Which statement is correct?',
    'Only 2,4-dinitrochlorobenzene reacts: its nitro groups stabilise the Meisenheimer complex',
    ['Both react equally easily, since any aryl halide undergoes SNAr under standard conditions', 'MC3'],
    ['Only chlorobenzene reacts, since nitro groups make the ring too electron-poor to be attacked', ''],
    'MC3 SNAr needs strong electron-withdrawing groups, re-asked with two aryl chlorides'),
  card('chem.hal.haloarenes', 'fill_blank', H,
    'Complete the sentence: bromobenzene is nitrated more slowly than benzene because bromine ____.',
    'withdraws electrons by −I, which outweighs +M, though it still directs o/p',
    ['donates electrons by +M, so being an o/p director makes the ring more reactive than benzene', 'MC2'],
    ['is too large to leave room for the nitro group, so the rate falls', ''],
    'MC2 halogens are deactivating o/p directors, re-asked with bromobenzene'),
]

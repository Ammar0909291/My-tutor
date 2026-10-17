/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 9 (chem undergraduate part 1 (alc, atomic, bond, carb, coord, dblock), 12 cards).
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
 * and abandon the live row's identity. Each chemistry concept in this batch has only an UNDERGRADUATE band and already uses UNDERGRADUATE : mcq, misconception_probe, checkpoint, step_check (plus numeric, fill_blank or true_false on some), so the new cards take the FREE slots UNDERGRADUATE : short_answer and, where a second card is needed, true_false.
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'chemistry'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'short_answer' | 'fill_blank' | 'true_false' | 'step_check'

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

export const CHEMISTRY_CARD_DEPTH_BATCH_9: SeedProbe[] = [
  // ─── chem.alc.epoxides ───────────────────────────────────────────────────
  card('chem.alc.epoxides', 'short_answer', U,
    'A student says an epoxide is as unreactive as diethyl ether, and that a nucleophile always attacks the less hindered carbon of 2-methyloxirane, even under acidic conditions. Which statement is correct?',
    'Ring strain makes epoxides reactive; acid directs attack to the more substituted carbon',
    ['An epoxide is unreactive like any other ether, so it does not ring-open under mild conditions', 'MC1'],
    ['The nucleophile always attacks the less hindered carbon, in acid as well as in base', 'MC2'],
    'MC1 ring strain, MC2 regiochemistry depends on conditions, re-asked with 2-methyloxirane'),

  // ─── chem.alc.protection ─────────────────────────────────────────────────
  card('chem.alc.protection', 'short_answer', U,
    'A student ends a synthesis with the TBS ether still on the molecule, calling the protecting group a permanent change, and plans to remove a THP group with fluoride because any deprotection condition will do. Which statement is correct?',
    'A protecting group is temporary; TBS leaves with fluoride and THP with mild acid, so choose by orthogonality',
    ['The TBS ether is a permanent structural change, so the synthesis is complete with it in place', 'MC1'],
    ['Fluoride will also remove the THP group, since any deprotection condition works regardless of the other groups present', 'MC2'],
    'MC1 protecting groups are removed, MC2 orthogonal deprotection, re-asked with TBS and THP'),

  // ─── chem.atomic.quantum-mech-model ──────────────────────────────────────
  card('chem.atomic.quantum-mech-model', 'short_answer', U,
    'At one point the wave function has ψ = −0.3. A student says this is a probability of −0.3, so the electron cannot be there, and that the boundary surface of a 2p orbital is the electron\'s circular path. Which statement is correct?',
    'The probability density is |ψ|² = 0.09 (never negative), and an orbital is a 3D probability region, not a path',
    ['ψ itself is the probability, so ψ = −0.3 means the electron cannot be at that point', 'MC1'],
    ['The orbital boundary is the electron\'s orbit, a path that it follows', 'MC2'],
    'MC1 probability density is |ψ|², MC2 orbital is not an orbit, re-asked with ψ = −0.3'),
  card('chem.atomic.quantum-mech-model', 'true_false', U,
    'Which statement about the uncertainty principle is correct?',
    'Δx·Δp ≥ ħ/2 is an intrinsic property of quantum systems, and better instruments cannot beat it',
    ['It only reflects instrument imprecision, so a perfect instrument could measure position and momentum exactly', 'MC3'],
    ['It means the electron follows a definite path whose position is simply hard to see', 'MC2'],
    'MC3 uncertainty is intrinsic, MC2 no trajectory'),

  // ─── chem.bond.mo-theory ─────────────────────────────────────────────────
  card('chem.bond.mo-theory', 'short_answer', U,
    'A student says He₂ should exist because its antibonding electrons simply balance its bonding electrons, and that O₂ is diamagnetic because its Lewis structure shows every electron paired. Which statement is correct?',
    'He₂ has bond order 0 and does not form, and O₂ is paramagnetic with two unpaired π* electrons, as MO theory predicts',
    ['He₂ exists, because antibonding electrons just balance the bonding ones and leave a neutral molecule', 'MC1'],
    ['O₂ is diamagnetic, because the Lewis double bond shows every electron paired', 'MC2'],
    'MC1 bond order 0 means no molecule, MC2 O₂ is paramagnetic, re-asked with He₂ and O₂'),

  // ─── chem.carb.derivatives ───────────────────────────────────────────────
  card('chem.carb.derivatives', 'short_answer', U,
    'A student says acetamide and acetyl chloride react with water at similar rates because both contain a carbonyl, and plans to turn an amide into an acyl chloride by simple substitution. Which statement is correct?',
    'Acetyl chloride reacts violently, the amide is nearly inert, and uphill conversions need activation',
    ['They react at similar rates, since they share the same carbonyl group', 'MC1'],
    ['An amide converts to an acyl chloride as readily as the reverse, so interconversion works both ways', 'MC2'],
    'MC1 reactivity ladder, MC2 interconversion is downhill, re-asked with acetamide and acetyl chloride'),

  // ─── chem.coord.nomenclature ─────────────────────────────────────────────
  card('chem.coord.nomenclature', 'short_answer', U,
    'A student names [PtCl₄(NH₃)₂] "tetrachloridodiammineplatinum(IV)", listing the most numerous ligand first, and says the "-ate" in hexacyanidoferrate(II) means the ion contains oxygen. Which statement is correct?',
    'Ligands are listed alphabetically (diamminetetrachloridoplatinum(IV)); "-ate" marks an anionic complex',
    ['List the most numerous ligand first, as in tetrachloridodiammineplatinum(IV), since quantity sets the order', 'MC1'],
    ['"-ate" shows that the complex contains oxygen, like an oxyanion', 'MC2'],
    'MC1 alphabetical order, MC2 -ate marks an anionic complex, re-asked with [PtCl₄(NH₃)₂]'),

  // ─── chem.coord.stability ────────────────────────────────────────────────
  card('chem.coord.stability', 'short_answer', U,
    'A student says [Ni(en)₃]²⁺ is more stable than [Ni(NH₃)₆]²⁺ because each Ni–N bond in the en complex is stronger, and finds β₂ = K₁ + K₂ for K₁ = 10⁴ and K₂ = 10³. Which statement is correct?',
    'The chelate effect is mainly entropic (more particles released), and β₂ = K₁ × K₂ = 10⁷, so log β₂ = 7',
    ['Each Ni–N bond in the en complex is stronger, which is why the chelate is more stable', 'MC1'],
    ['β₂ = K₁ + K₂ = 1.1 × 10⁴, adding the stepwise constants', 'MC3'],
    'MC1 chelate effect is entropic, MC3 β is a product, re-asked with [Ni(en)₃]²⁺ and K₁, K₂'),
  card('chem.coord.stability', 'true_false', U,
    'Which statement about [Cr(H₂O)₆]³⁺ is correct?',
    'It is kinetically inert (slow exchange) with a moderate K_f; inertness and stability are independent',
    ['It must have a very large K_f, because a kinetically inert complex must also be thermodynamically very stable', 'MC2'],
    ['Its inertness comes from unusually strong individual Cr–O bonds', ''],
    'MC2 kinetic inertness vs thermodynamic stability, re-asked with [Cr(H₂O)₆]³⁺'),

  // ─── chem.dblock.first-row ───────────────────────────────────────────────
  card('chem.dblock.first-row', 'short_answer', U,
    'A student says Zn²⁺ salts are coloured because zinc is a transition metal, and writes Fe²⁺ as [Ar]3d⁴ by removing two 3d electrons. Which statement is correct?',
    'Zn²⁺ (d¹⁰) is colourless, and Fe²⁺ is [Ar]3d⁶ because the 4s electrons leave first',
    ['Zn²⁺ is coloured, because every transition metal ion is coloured', 'MC1'],
    ['Fe²⁺ is [Ar]3d⁴, because the 3d electrons are removed first', 'MC3'],
    'MC1 d⁰ and d¹⁰ are colourless, MC3 4s electrons leave first, re-asked with Zn²⁺ and Fe²⁺'),

  // ─── chem.dblock.general ─────────────────────────────────────────────────
  card('chem.dblock.general', 'short_answer', U,
    'A student says all transition metal compounds are coloured, and that manganese could reach the oxidation state +9 because "variable" means any number. Which statement is correct?',
    'd⁰/d¹⁰ compounds (Ti⁴⁺, Zn²⁺) are colourless, and Mn tops out at +7 (3d⁵4s²)',
    ['Every transition metal compound is coloured, whatever its d configuration', 'MC2'],
    ['Manganese can reach +9, since "variable oxidation state" means any whole number', 'MC3'],
    'MC2 colour needs a partly filled d subshell, MC3 bounded oxidation states, re-asked with Ti⁴⁺, Zn²⁺ and Mn'),

  // ─── chem.dblock.lanthanides ─────────────────────────────────────────────
  card('chem.dblock.lanthanides', 'short_answer', U,
    'A student says the colour of Nd³⁺ changes strongly when water is replaced by EDTA, as it does for Ti³⁺, and that the lanthanide contraction is just ordinary periodic contraction. Which statement is correct?',
    'Nd³⁺ colours come from shielded f–f transitions; the contraction is large due to poor f-shielding',
    ['Nd³⁺ colour comes from d–d transitions, so it changes strongly with the ligand, as for Ti³⁺', 'MC1'],
    ['The lanthanide contraction is the same as ordinary periodic contraction, with nothing extra to explain', 'MC2'],
    'MC1 f–f vs d–d transitions, MC2 poor f-shielding, re-asked with Nd³⁺ and EDTA'),
]

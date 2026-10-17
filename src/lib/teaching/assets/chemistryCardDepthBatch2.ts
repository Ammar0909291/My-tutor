/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 2 (chem.bio and chem.bond (part 2), 17 cards).
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
 * and abandon the live row's identity. Each chemistry concept already uses HIGH : mcq, misconception_probe, checkpoint (plus numeric, step_check or fill_blank on some), so the new cards take the FREE slots HIGH : short_answer and, where a second card is needed, true_false.
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

export const CHEMISTRY_CARD_DEPTH_BATCH_2: SeedProbe[] = [
  // ─── chem.bio.carbohydrates ──────────────────────────────────────────────
  card('chem.bio.carbohydrates', 'short_answer', H,
    'A student dissolves pure β-D-glucose in water and sees its optical rotation drift. She says the open-chain Fischer form and the cyclic Haworth form are different compounds, and that the drift means glucose is turning into a new substance. Which statement is correct?',
    'The open-chain and ring forms are one molecule in equilibrium; the drift is mutarotation',
    ['The Fischer and Haworth forms are two different compounds, so the ring is a separate sugar from open-chain glucose', 'MC1'],
    ['The drifting rotation shows an irreversible reaction making a new substance, not a shift to equilibrium', 'MC2'],
    'MC1 one molecule two drawings, MC2 mutarotation, re-asked with dissolved β-D-glucose'),

  // ─── chem.bio.lipids ─────────────────────────────────────────────────────
  card('chem.bio.lipids', 'short_answer', H,
    'Olive oil (a triglyceride) is warmed with aqueous NaOH and a student calls the result simple dissolving. She also says that "unsaturated" just means liquid at room temperature. Which statement is correct?',
    'Saponification hydrolyses the ester bonds; "unsaturated" means C=C bonds, usually giving a liquid',
    ['The oil is merely dissolved in the base and stays the same triglyceride molecule', 'MC1'],
    ['"Unsaturated" is simply a definition meaning liquid at room temperature, with no link to C=C bonds', 'MC2'],
    'MC1 saponification is hydrolysis, MC2 unsaturation vs state, re-asked with olive oil'),

  // ─── chem.bio.proteins ───────────────────────────────────────────────────
  card('chem.bio.proteins', 'short_answer', H,
    'Lemon juice curdles milk by denaturing casein. A student says denaturation breaks the peptide bonds and changes the amino acid sequence, and that every protein, including single-chain lysozyme, has a quaternary structure. Which statement is correct?',
    'Denaturation leaves the sequence intact, and single-chain lysozyme has no quaternary structure',
    ['Denaturation cuts the peptide bonds, so the amino acid sequence is changed', 'MC1'],
    ['Every protein has a quaternary structure, as a fourth level that all proteins share without exception', 'MC2'],
    'MC1 denaturation vs hydrolysis, MC2 quaternary needs several chains, re-asked with casein and lysozyme'),

  // ─── chem.bio.vitamins ───────────────────────────────────────────────────
  card('chem.bio.vitamins', 'short_answer', H,
    'A person takes large daily doses of both vitamin C and vitamin A. A student says water-soluble and fat-soluble is just a naming category, and that estradiol and progesterone, which share the steroid skeleton, are one hormone in different amounts. Which statement is correct?',
    'Vitamin A accumulates and can become toxic while excess vitamin C is excreted; the two steroids differ',
    ['Water- and fat-soluble is only a naming category with no effect on how an excess is handled by the body', 'MC1'],
    ['Estradiol and progesterone are the same hormone, differing only in the amount present', 'MC2'],
    'MC1 solubility predicts accumulation, MC2 steroids are distinct hormones, re-asked with vitamins A/C and two steroids'),

  // ─── chem.bond.coordinate-bond ───────────────────────────────────────────
  card('chem.bond.coordinate-bond', 'short_answer', H,
    'In AlCl₄⁻, formed from AlCl₃ and Cl⁻, one Al–Cl bond is a coordinate bond. A student says it must be weaker than the other three, and that mixing HCl with NaOH also forms coordinate bonds because lone pairs are present. Which statement is correct?',
    'Once formed, all four Al–Cl bonds are identical, and HCl + NaOH is ionic neutralisation, not an adduct-forming coordinate bond',
    ['The coordinate bond is weaker, because only one atom supplied the electrons', 'MC1'],
    ['HCl + NaOH forms coordinate bonds, because every reaction involving lone pairs does', 'MC3'],
    'MC1 identical once formed, MC3 coordinate bond vs neutralisation, re-asked with AlCl₄⁻'),
  card('chem.bond.coordinate-bond', 'true_false', H,
    'In the reaction AlCl₃ + Cl⁻ → AlCl₄⁻, which statement is correct?',
    'AlCl₃ accepts a lone pair from Cl⁻, so AlCl₃ is the Lewis acid and Cl⁻ is the Lewis base',
    ['AlCl₃ is the Lewis acid because it donates an electron pair to Cl⁻', 'MC2'],
    ['The new Al–Cl bond is weaker than the others, because only chlorine supplied its electrons', 'MC1'],
    'MC2 Lewis acids accept pairs, MC1 coordinate bond strength, re-asked with AlCl₃ and Cl⁻'),

  // ─── chem.bond.covalent-bonding ──────────────────────────────────────────
  card('chem.bond.covalent-bonding', 'short_answer', H,
    'A student says CCl₄ is polar because each C–Cl bond is polar, and that solid iodine (I₂) should melt at a very high temperature because covalent bonds are strong. Which statement is correct?',
    'CCl₄ is nonpolar since its dipoles cancel, and I₂ melts low as only weak forces between molecules break',
    ['CCl₄ is polar, because polar bonds always make a polar molecule', 'MC1'],
    ['I₂ melts at a very high temperature, because the strong I–I covalent bonds must break before it can melt', 'MC2'],
    'MC1 vector sum of dipoles, MC2 molecular melting reflects intermolecular forces, re-asked with CCl₄ and I₂'),
  card('chem.bond.covalent-bonding', 'true_false', H,
    'In H₃O⁺, formed from H₂O and H⁺, which statement is correct?',
    'The third O–H bond is formed from an oxygen lone pair and, once made, is identical to the other two',
    ['Every covalent bond, including this one, has each atom contributing one electron', 'MC3'],
    ['The third O–H bond is a weaker ionic bond, because the H⁺ supplied no electrons', ''],
    'MC3 coordinate (dative) covalent bonds, re-asked with H₃O⁺'),

  // ─── chem.bond.hybridization ─────────────────────────────────────────────
  card('chem.bond.hybridization', 'short_answer', H,
    'A student gives every carbon in ethanal (CH₃CHO) sp³ hybridisation because all atoms in a molecule share one hybridisation, and calls the oxygen in water sp because it has two bonds. Which statement is correct?',
    'Methyl C is sp³ and carbonyl C is sp²; water\'s oxygen has 4 domains, so it is sp³',
    ['Every carbon in ethanal is sp³, because all atoms in a molecule share one hybridisation', 'MC3'],
    ['Oxygen in water is sp, because only its two bonding pairs count as electron domains', 'MC1'],
    'MC3 per-atom hybridisation, MC1 lone pairs count, re-asked with ethanal and water'),
  card('chem.bond.hybridization', 'true_false', H,
    'Which statement about the sp³ hybridisation of carbon in methane is correct?',
    'sp³ is a model for the shape of the final bonded molecule, not a physical event that happens as atoms approach',
    ['The carbon orbitals physically mix into four sp³ hybrids at the moment the hydrogen atoms approach', 'MC2'],
    ['The hydrogens are also sp³ hybridised like carbon, because all atoms in a molecule share one hybridisation', 'MC3'],
    'MC2 hybridisation is a model, MC3 not uniform across atoms, re-asked with methane'),

  // ─── chem.bond.ionic-bonding ─────────────────────────────────────────────
  card('chem.bond.ionic-bonding', 'short_answer', H,
    'A student writes "KBr is a molecule with one K–Br bond" and says that solid KBr conducts electricity because it contains charged ions. Which statement is correct?',
    'KBr is an extended lattice, and it conducts only when molten or dissolved',
    ['KBr is a molecule with one K–Br bond, just like the discrete bonds in H₂O', 'MC1'],
    ['Solid KBr conducts electricity, because charged ions are present in it', 'MC3'],
    'MC1 lattice not molecule, MC3 conduction needs mobile ions, re-asked with KBr'),

  // ─── chem.bond.metallic-bonding ──────────────────────────────────────────
  card('chem.bond.metallic-bonding', 'short_answer', H,
    'A student says copper is held together by covalent bonds like diamond, and that copper stops conducting electricity once it melts. Which statement is correct?',
    'Metallic bonding is delocalised and non-directional, and molten copper still conducts',
    ['Metallic bonding is a form of covalent bonding, with shared electron pairs between particular atoms', 'MC1'],
    ['Copper loses its conductivity when it melts, because the electrons are no longer mobile in a liquid', 'MC2'],
    'MC1 metallic ≠ covalent, MC2 liquid metals conduct, re-asked with copper'),
  card('chem.bond.metallic-bonding', 'true_false', H,
    'A student predicts that sodium, magnesium and aluminium melt in increasing order because the valence electron count rises, and applies the same rule to claim iron melts below aluminium. Which statement is correct?',
    'The rule holds across the period 3 s/p metals, but iron\'s d electrons contribute, so it cannot be ranked by simple valence count',
    ['The valence-electron rule always works, so iron must melt below aluminium', 'MC3'],
    ['The Na < Mg < Al trend reflects directional covalent bonds that grow with the electron count', 'MC1'],
    'MC3 valence-count heuristic has limits, MC1 metallic ≠ covalent, re-asked with period 3 and iron'),

  // ─── chem.bond.polar-molecules ───────────────────────────────────────────
  card('chem.bond.polar-molecules', 'short_answer', H,
    'A student says CO₂ and BF₃ must be polar because they have polar bonds, and that CCl₄, with four polar bonds, is more polar than CH₂Cl₂, with two. Which statement is correct?',
    'CO₂ and BF₃ are nonpolar as their dipoles cancel; CH₂Cl₂ is polar, CCl₄ is not',
    ['CO₂ and BF₃ are polar, because molecules with polar bonds are polar molecules, whatever their shape', 'MC1'],
    ['CCl₄ is more polar than CH₂Cl₂, because it has more polar bonds', 'MC3'],
    'MC1 vector sum, MC3 symmetry beats bond count, re-asked with CO₂/BF₃ and CCl₄/CH₂Cl₂'),
  card('chem.bond.polar-molecules', 'true_false', H,
    'Boron trifluoride (BF₃) and nitrogen trifluoride (NF₃) each have three polar bonds. A student says NF₃ is nonpolar like BF₃ because the nitrogen lone pair does not matter. Which statement is correct?',
    'NF₃ is polar (pyramidal, lone pair adds a dipole); BF₃ is planar and nonpolar',
    ['NF₃ is nonpolar like BF₃, because a central lone pair contributes nothing to the dipole', 'MC2'],
    ['BF₃ is polar, because three polar bonds always give a polar molecule', 'MC1'],
    'MC2 lone pairs count, MC1 vector sum, re-asked with BF₃ and NF₃'),

  // ─── chem.bond.resonance ─────────────────────────────────────────────────
  card('chem.bond.resonance', 'short_answer', H,
    'A student says ozone, O₃, vibrates back and forth between O=O–O and O–O=O, and draws a new "resonance structure" by moving an oxygen atom. Which statement is correct?',
    'Ozone is one static hybrid with two equal O–O bonds; resonance moves only electrons, never atoms',
    ['Ozone switches back and forth between the two structures over time', 'MC1'],
    ['A valid resonance structure can be drawn by moving an oxygen atom to a new position in the molecule', 'MC2'],
    'MC1 static hybrid, MC2 only electrons move, re-asked with ozone'),

  // ─── chem.bond.vsepr ─────────────────────────────────────────────────────
  card('chem.bond.vsepr', 'short_answer', H,
    'A student says CO₂ has four electron domains because it has two double bonds, and that ammonia\'s molecular geometry is tetrahedral because its electron geometry is tetrahedral. Which statement is correct?',
    'CO₂ has two domains and is linear; ammonia is tetrahedral in electron geometry but pyramidal in shape',
    ['CO₂ has four domains, since each double bond counts as two', 'MC1'],
    ['Ammonia\'s molecular geometry is tetrahedral, because molecular and electron geometry are the same thing', 'MC2'],
    'MC1 region counting, MC2 electron vs molecular geometry, re-asked with CO₂ and NH₃'),
]

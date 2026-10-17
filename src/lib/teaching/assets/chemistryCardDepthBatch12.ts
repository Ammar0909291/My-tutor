/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 12 (chem.period, chem.equil, chem.bond, chem.pblock, chem.coord and chem.org (need-three concepts, part 1), 18 cards).
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
 * and abandon the live row's identity. Each chemistry concept in this batch holds one two-option card in each of mcq, misconception_probe, checkpoint, step_check and true_false (and, for periodic-properties, two in short_answer), so the three new cards take the FREE slots short_answer, fill_blank and numeric (the kind is only a slot label; periodic-properties' third card uses the UNDERGRADUATE short_answer slot).
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

export const CHEMISTRY_CARD_DEPTH_BATCH_12: SeedProbe[] = [
  // ─── chem.period.periodic-properties (short_answer is taken by two probes in HIGH, so the third card uses the UNDERGRADUATE short_answer slot) ──
  card('chem.period.periodic-properties', 'fill_blank', H,
    'Complete the sentence: periodic trends ____.',
    'follow general directions with predictable exceptions',
    ['are perfectly smooth, with no exceptions anywhere in a period, since a trend is a fixed law', 'MC3'],
    ['repeat exactly every period, so elements of one group have identical properties', 'MC4'],
    'MC3 trends have exceptions, MC4 periodic law is a pattern not an identity'),
  card('chem.period.periodic-properties', 'numeric', H,
    'Fluorine is more reactive than iodine, while caesium is more reactive than lithium. Which statement is correct?',
    'Metal reactivity rises down a group (easier electron loss) while non-metal reactivity falls (harder electron gain)',
    ['One rule covers both: reactivity always rises down a group, so iodine must be the more reactive halogen', 'MC2'],
    ['Fluorine and iodine have identical properties, since periodic law says properties repeat exactly', 'MC4'],
    'MC2 reactivity direction depends on metal or non-metal, MC4 properties vary, re-asked with F/I and Cs/Li'),
  card('chem.period.periodic-properties', 'short_answer', U,
    'A student says fluorine has the most negative electron affinity because it is the most electronegative element, and that every element becomes more reactive down its group. Which statement is correct?',
    'Cl has a more negative EA than F, and non-metals become less reactive down a group',
    ['Electron affinity and electronegativity are the same property, so F has the most negative EA of all', 'MC1'],
    ['Reactivity increases down every group, for halogens just as for alkali metals, since atoms get larger', 'MC2'],
    'MC1 EA ≠ electronegativity, MC2 reactivity direction, re-asked with F/Cl'),

  // ─── chem.equil.hydrolysis ───────────────────────────────────────────────
  card('chem.equil.hydrolysis', 'short_answer', H,
    'A student says NaCl hydrolyses because it dissolves in water, and that every salt solution is acidic. Which statement is correct?',
    'NaCl does not hydrolyse (neutral), while Na₂CO₃ solution is basic',
    ['NaCl hydrolyses, since a salt that dissolves in water has necessarily reacted with it', 'MC1'],
    ['Every salt solution is acidic, whatever acid and base it comes from, since hydrolysis releases H⁺', 'MC2'],
    'MC1 dissolving ≠ hydrolysis, MC2 pH follows parentage, re-asked with NaCl and Na₂CO₃'),
  card('chem.equil.hydrolysis', 'fill_blank', H,
    'Complete the sentence: for the conjugate base A⁻ of a weak acid HA with Ka = 2.0 × 10⁻⁵, the hydrolysis constant is ____.',
    'Kh = Kw/Ka = 5.0 × 10⁻¹⁰',
    ['Kh = Ka + Kb, the sum of the acid and base constants', 'MC3'],
    ['Kh = Ka/Kb, the ratio of the acid constant to the base constant', ''],
    'MC3 Kh = Kw/Ka, re-asked with a generic weak acid'),
  card('chem.equil.hydrolysis', 'numeric', H,
    'Ammonium chloride is dissolved in water. Which statement is correct?',
    'NH₄⁺, the conjugate acid of NH₃, hydrolyses and makes the solution acidic',
    ['The solution is basic, because NH₃ is a base and the ammonium ion keeps its basic character', 'MC4'],
    ['The solution is neutral, because NH₄Cl comes from a strong acid and a strong base', ''],
    'MC4 the cation of a weak base is acidic, re-asked with NH₄Cl'),

  // ─── chem.bond.bond-parameters ───────────────────────────────────────────
  card('chem.bond.bond-parameters', 'short_answer', H,
    'A student says a C=C bond (614 kJ/mol) should be twice as strong as C–C (348 kJ/mol), and that the longer C–C bond is the stronger one. Which statement is correct?',
    'C=C is stronger than C–C but not double (614 against 696 kJ/mol), and the triple bond is both shorter and stronger',
    ['A double bond is exactly twice as strong as a single bond', 'MC1'],
    ['The longer bond is the stronger one, because more distance gives the electrons more room to hold the atoms', 'MC3'],
    'MC1 double bond is not twice single, MC3 shorter is stronger, re-asked with C–C and C=C'),
  card('chem.bond.bond-parameters', 'fill_blank', H,
    'Complete the sentence: tabulated bond enthalpies are ____.',
    'averages that vary with the molecular environment',
    ['fixed values for each bond type, whatever the molecule it sits in', 'MC2'],
    ['multiples of the single-bond value, so a double bond is exactly twice a single bond', 'MC1'],
    'MC2 averages, MC1 not multiples, re-asked as a definition'),
  card('chem.bond.bond-parameters', 'numeric', H,
    'Which statement about C≡C (120 pm, 839 kJ/mol) and C–C (154 pm, 348 kJ/mol) is correct?',
    'The shorter bond is stronger: a higher bond order gives both a shorter length and a higher enthalpy',
    ['The longer C–C bond is stronger, because the electrons hold the atoms together across more distance', 'MC3'],
    ['C–C is stronger, since a single bond is more stable than a multiple bond', ''],
    'MC3 shorter bonds are stronger, re-asked with C≡C and C–C'),

  // ─── chem.pblock.group16 ─────────────────────────────────────────────────
  card('chem.pblock.group16', 'short_answer', U,
    'A student says water boils higher than H₂S because water molecules are smaller and pack better, and that oxygen can form an expanded octet like sulfur in SO₄²⁻. Which statement is correct?',
    'Hydrogen bonding explains water\'s boiling point, and period-2 oxygen has no d orbitals to expand its octet',
    ['Water boils higher than H₂S because its small molecules pack more tightly in the liquid and solid', 'MC1'],
    ['Oxygen can form expanded octets just like the heavier Group 16 elements, since all share ns²np⁴', 'MC3'],
    'MC1 hydrogen bonding, MC3 oxygen cannot expand its octet, re-asked with H₂O/H₂S and SO₄²⁻'),
  card('chem.pblock.group16', 'fill_blank', U,
    'Complete the sentence: SO₂ bleaching is ____.',
    'reduction-based and reversible, so colour can return in sunlight, unlike chlorine\'s bleaching',
    ['permanent, like chlorine\'s, because every bleaching agent destroys the colour for good and cannot be undone', 'MC2'],
    ['due to oxidation of the dye, which makes it permanent', ''],
    'MC2 SO₂ bleaching is reversible, re-asked as a definition'),
  card('chem.pblock.group16', 'numeric', U,
    'Which statement about the boiling points of H₂O, H₂S, H₂Se and H₂Te is correct?',
    'H₂S < H₂Se < H₂Te follows rising mass (van der Waals); water is the outlier because of hydrogen bonding',
    ['Water is highest simply because it is the smallest molecule and so packs most tightly together', 'MC1'],
    ['The boiling points fall steadily from H₂Te to H₂O, following molar mass downwards, with no outlier at all', ''],
    'MC1 hydrogen bonding explains water, re-asked with the hydride series'),

  // ─── chem.coord.werner ───────────────────────────────────────────────────
  card('chem.coord.werner', 'short_answer', U,
    'A student says [Ag(NH₃)₂]⁺ has coordination number 1 because silver is +1, and that every transition metal complex has coordination number 6. Which statement is correct?',
    'Coordination number counts the donor atoms bonded (2 here), not the oxidation state (+1), and varies by metal',
    ['The coordination number equals the oxidation state, so it is 1, since silver is +1', 'MC1'],
    ['Every transition metal complex has coordination number 6, since six ligands always fill the sphere', 'MC3'],
    'MC1 coordination number ≠ oxidation state, MC3 varies by metal, re-asked with [Ag(NH₃)₂]⁺'),
  card('chem.coord.werner', 'fill_blank', U,
    'Complete the sentence: in [Co(NH₃)₄Cl₂]Cl, ____.',
    'two Cl⁻ are ligands and one is a counter-ion, so only one Cl⁻ precipitates with AgNO₃',
    ['all three chlorides are counter-ions, so all three precipitate with AgNO₃ as free ions in the solution', 'MC2'],
    ['all three chlorides are ligands bonded to cobalt, so none precipitates with AgNO₃ from the solution', ''],
    'MC2 anions can be ligands or counter-ions, re-asked with [Co(NH₃)₄Cl₂]Cl'),
  card('chem.coord.werner', 'numeric', U,
    'Which statement about [Co(NH₃)₆]Cl₃ is correct?',
    'Cobalt is +3 (charge balance) with coordination number 6 (six NH₃), and all three Cl⁻ are counter-ions',
    ['Its coordination number is 3, equal to cobalt\'s oxidation state', 'MC1'],
    ['Two chlorides are ligands inside the coordination sphere, so only one Cl⁻ is free', ''],
    'MC1 coordination number vs oxidation state, re-asked with [Co(NH₃)₆]Cl₃'),

  // ─── chem.org.hybridization ──────────────────────────────────────────────
  card('chem.org.hybridization', 'short_answer', H,
    'A student calls the nitrogen in pyridine sp³ because nitrogen has a lone pair, and the oxygen of a ketone sp³ because it has two lone pairs and a double bond. Which statement is correct?',
    'Pyridine\'s N has 3 domains (2 bonds + a lone pair), so sp²; the carbonyl O has 3 domains too, so sp²',
    ['The nitrogen is sp³, since a lone pair always makes nitrogen sp³, exactly as it does in ammonia and in the amines', 'MC1'],
    ['The carbonyl oxygen is sp³, because the double bond counts as two domains and the lone pairs add two more', 'MC2'],
    'MC1 count domains for N, MC2 double bond counts once, re-asked with pyridine and a ketone'),
  card('chem.org.hybridization', 'fill_blank', H,
    'Complete the sentence: the central carbon of CO₂ is ____.',
    'sp, with two electron domains (a double bond counts once)',
    ['sp², because it has double bonds, and each double bond is made of one sigma and one pi', 'MC3'],
    ['sp³, because carbon always forms four bonds in its compounds, whatever it is attached to', ''],
    'MC3 count domains, re-asked with CO₂'),
  card('chem.org.hybridization', 'numeric', H,
    'In HC≡N the nitrogen has a lone pair, and in allene (H₂C=C=CH₂) the central carbon has two double bonds. Which statement is correct?',
    'Both are sp: the nitrogen has 2 domains (triple bond + lone pair) and the central carbon has 2 domains',
    ['The nitrogen is sp³ because it has a lone pair', 'MC1'],
    ['The central carbon is sp² because it has double bonds', 'MC3'],
    'MC1 and MC3 domain counting, re-asked with HCN and allene'),
]

/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 6 (chem.org, chem.pblock, chem.period, chem.poly and chem.redox (part 6), 17 cards).
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
 * and abandon the live row's identity. Each chemistry concept already uses HIGH : mcq, misconception_probe, checkpoint (plus numeric, step_check or fill_blank on some), so the new cards take the FREE slots among HIGH : short_answer and true_false.
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

export const CHEMISTRY_CARD_DEPTH_BATCH_6: SeedProbe[] = [
  // ─── chem.org.iupac ──────────────────────────────────────────────────────
  card('chem.org.iupac', 'short_answer', H,
    'For HOOC–CH(CH₂CH₃)–CH₂CH₂CH₃, a student picks the longest carbon chain (six carbons, which excludes the –COOH carbon) and writes the name "ethyl-2-pentanoic acid". Which statement is correct?',
    '2-Ethylpentanoic acid: the parent chain must include the –COOH carbon',
    ['The parent is hexane, the longest chain, with a carboxyl substituent on it', 'MC1'],
    ['"Ethyl-2-pentanoic acid" is correct, with the locant written after the substituent name', 'MC2'],
    'MC1 principal group decides the chain, MC2 locant placement, re-asked with a branched acid'),
  card('chem.org.iupac', 'true_false', H,
    'Which name is correct for CH₃CH₂CH₂CHO?',
    'Butanal, because the C=O is at the end of the chain, so it is an aldehyde',
    ['Butanone, because the suffix -one means any C=O group', 'MC3'],
    ['Butanal-1, with the locant written after the suffix', 'MC2'],
    'MC3 -al versus -one, MC2 locant placement, re-asked with CH₃CH₂CH₂CHO'),

  // ─── chem.org.mechanisms ─────────────────────────────────────────────────
  card('chem.org.mechanisms', 'short_answer', H,
    'In the propagation step Cl• + CH₄ → HCl + CH₃•, a student draws double-headed curved arrows and says the arrow shows the hydrogen atom moving. Which statement is correct?',
    'Radical steps use fish-hook arrows, each showing the movement of one electron',
    ['Double-headed arrows are correct for this radical step, as they are for ionic steps', 'MC2'],
    ['The arrow shows where the hydrogen atom goes, not where electrons move', 'MC1'],
    'MC2 fish-hook arrows for radicals, MC1 arrows track electrons, re-asked with chlorine-radical abstraction'),

  // ─── chem.org.purification ───────────────────────────────────────────────
  card('chem.org.purification', 'short_answer', H,
    'On silica TLC compound X has Rf 0.85 and Y has Rf 0.15. A sample of X melts over 65–80 °C and another sample at a sharp 82 °C (the literature value). A student says X is the more polar compound and that the 65–80 °C sample is purer because impurities raise the melting point. Which statement is correct?',
    'X is less polar (highest Rf), and the sharp 82 °C sample is purer: impurities depress melting',
    ['X is the more polar compound, because it moved further up the plate', 'MC1'],
    ['The 65–80 °C sample is purer, because impurities raise the melting point by adding extra particles to the solid', 'MC3'],
    'MC1 higher Rf = less polar on silica, MC3 impurities depress mp, re-asked with two Rf values and two melting ranges'),
  card('chem.org.purification', 'true_false', H,
    'To purify a solid by recrystallisation, which procedure is correct?',
    'Dissolve in the minimum of hot solvent, filter hot, then cool slowly so pure crystals form',
    ['Dissolve it in cold solvent and simply filter, since recrystallisation means dissolve and filter', 'MC2'],
    ['Cool the hot solution as fast as possible in ice so that the largest crystals form', ''],
    'MC2 hot dissolution and slow cooling, re-asked as a procedure choice'),

  // ─── chem.pblock.group17 ─────────────────────────────────────────────────
  card('chem.pblock.group17', 'short_answer', H,
    'A student says F₂ is the strongest oxidising agent only because fluorine has the most negative electron affinity, and that halogens become more reactive down Group 17 like the alkali metals. Which statement is correct?',
    'F₂\'s oxidising power comes from the full cycle, not EA alone, and halogen reactivity falls down the group',
    ['F₂ is the strongest oxidiser because fluorine has the highest electron affinity of all the halogens, so EA decides', 'MC1'],
    ['Halogen reactivity increases down the group, as it does for the alkali metals', 'MC3'],
    'MC1 full thermodynamic cycle, MC3 halogen reactivity falls down the group, re-asked in general terms'),
  card('chem.pblock.group17', 'true_false', H,
    'Which statement about HF and HCl is correct?',
    'HF is a weak acid because its very strong H–F bond (568 kJ/mol) is hard to break, despite fluorine\'s high electronegativity',
    ['HF is a strong acid because the H–F bond is the most polar', 'MC2'],
    ['HCl is the weaker acid because chlorine is larger than fluorine', ''],
    'MC2 acid strength follows bond strength, re-asked with HF and HCl'),

  // ─── chem.pblock.group18 ─────────────────────────────────────────────────
  card('chem.pblock.group18', 'short_answer', H,
    'A student says noble gases are unreactive simply because they have eight outer electrons, so xenon cannot form compounds, and that argon is used in welding because it does not conduct electricity. Which statement is correct?',
    'High IE₁ explains the inertness, xenon forms compounds such as XeF₂, and argon shields welds by being inert',
    ['Xenon cannot form any compounds at all, because eight outer electrons make every noble gas completely inert', 'MC1'],
    ['Argon is used in welding because it does not conduct electricity', 'MC2'],
    'MC1 inertness is an IE₁ argument, MC2 welding needs chemical inertness, re-asked with xenon and argon'),
  card('chem.pblock.group18', 'true_false', H,
    'A red-orange glowing tube and a blue-violet glowing tube are both sold as "neon" signs. Which statement is correct?',
    '"Neon sign" is a generic name; the red-orange tube contains neon, while the blue-violet one typically contains argon',
    ['Both contain only neon, since every neon sign is filled with neon gas', 'MC3'],
    ['The colours come from the glass tubing, not from the gas inside', ''],
    'MC3 neon sign is a generic term, re-asked with two sign colours'),

  // ─── chem.period.atomic-radius ───────────────────────────────────────────
  card('chem.period.atomic-radius', 'short_answer', H,
    'A student says chlorine (Z = 17) is larger than sodium (Z = 11) because it has more electrons, and that Na⁺ must be larger than the Na atom because it is positively charged. Which statement is correct?',
    'Cl is smaller than Na (Zeff rises), and Na⁺ is smaller than Na (electrons lost)',
    ['Cl is larger than Na, because more electrons make a bigger atom', 'MC1'],
    ['Na⁺ is larger than Na, because a positive charge makes the particle bigger than the neutral atom', 'MC2'],
    'MC1 radius falls across a period, MC2 cations shrink, re-asked with Na and Cl'),

  // ─── chem.period.electron-affinity ───────────────────────────────────────
  card('chem.period.electron-affinity', 'short_answer', H,
    'A student says a more negative electron affinity means a weaker tendency to gain an electron, and that forming O²⁻ from O⁻ has a negative (exothermic) second electron affinity. Which statement is correct?',
    'A more negative EA means a stronger tendency to gain an electron; the second EA of oxygen is positive',
    ['A more negative EA means a weaker tendency to gain an electron', 'MC1'],
    ['The second EA of oxygen is negative, since adding electrons is always exothermic for non-metals like oxygen', 'MC3'],
    'MC1 sign of EA, MC3 second EA is positive, re-asked with O⁻ → O²⁻'),

  // ─── chem.period.ionization-energy ───────────────────────────────────────
  card('chem.period.ionization-energy', 'short_answer', H,
    'An element\'s successive ionisation energies jump sharply between IE₃ and IE₄. A student says it has four valence electrons, and that the first IE rises steadily across period 3 with no dips. Which statement is correct?',
    'The jump after IE₃ means three valence electrons (IE₄ removes the first core electron), and period 3 shows dips at Al and S',
    ['The jump at IE₄ marks four valence electrons, so the element has four', 'MC2'],
    ['The first IE rises steadily across period 3 with no exceptions', 'MC1'],
    'MC2 count the IEs before the jump, MC1 period 3 dips, re-asked in general terms'),

  // ─── chem.period.modern-periodic-law ─────────────────────────────────────
  card('chem.period.modern-periodic-law', 'short_answer', H,
    'A student says the modern periodic law orders the elements by atomic mass, as Mendeleev did, and that hydrogen is an alkali metal because it has one outer electron. Which statement is correct?',
    'The modern law orders by atomic number (Ar before K needs no exception); hydrogen is a unique non-metal',
    ['The modern law orders the elements by atomic mass', 'MC1'],
    ['Hydrogen is an alkali metal, because one outer electron gives it the same chemistry as sodium and potassium', 'MC3'],
    'MC1 atomic number, MC3 hydrogen is unique, re-asked with Ar/K and hydrogen'),

  // ─── chem.period.valency ─────────────────────────────────────────────────
  card('chem.period.valency', 'short_answer', H,
    'A student says sulfur always has valency 6 because it is in Group 16, and that nitrogen forms NCl₅ just as phosphorus forms PCl₅. Which statement is correct?',
    'Group number is only the maximum valency (S is 2 in H₂S); nitrogen has no d orbitals, so no NCl₅',
    ['Sulfur always has valency 6 because it is in Group 16, so H₂S must contain sulfur with valency 6', 'MC1'],
    ['Nitrogen forms NCl₅ by analogy with PCl₅', 'MC2'],
    'MC1 valency varies by compound, MC2 period 2 cap, re-asked with sulfur and nitrogen'),
  card('chem.period.valency', 'true_false', H,
    'In MnO₄⁻ manganese has the oxidation state +7. Which statement is correct?',
    'The +7 is a formal bookkeeping value; manganese has not literally lost seven electrons',
    ['Manganese has literally lost seven electrons and carries a +7 charge', 'MC3'],
    ['Manganese must have valency 7 in every compound, because it is in Group 7', 'MC1'],
    'MC3 oxidation state is a formal count, MC1 valency varies, re-asked with MnO₄⁻'),

  // ─── chem.poly.addition ──────────────────────────────────────────────────
  card('chem.poly.addition', 'short_answer', H,
    'A student says nylon-6,6 and poly(ethene) differ only in chain length, and that HDPE and LDPE are identical because both come from ethene. Which statement is correct?',
    'Nylon-6,6 is condensation (water lost) and poly(ethene) is addition; LDPE and HDPE differ in structure',
    ['Addition and condensation polymers differ only in the size of the polymer chain that is formed, not in what is lost', 'MC1'],
    ['All polyethylene is the same, since it always comes from ethene', 'MC3'],
    'MC1 classify by loss of a small molecule, MC3 synthesis route sets properties, re-asked with nylon-6,6 and polyethylenes'),

  // ─── chem.redox.activity-series ──────────────────────────────────────────
  card('chem.redox.activity-series', 'short_answer', H,
    'A student says a more reactive metal has a more positive E°, and that copper wire dipped in ZnSO₄ solution would react because copper looks reactive. Which statement is correct?',
    'Reactive metals have more negative E°, and Cu (+0.34 V) cannot displace Zn²⁺ (−0.76 V)',
    ['A more reactive metal has a more positive E°, so zinc is the less reactive metal of the two', 'MC2'],
    ['Copper reacts with ZnSO₄ solution, because copper looks like a reactive metal', 'MC3'],
    'MC2 negative E° = reactive reducer, MC3 predict displacement from E°, re-asked with Cu in ZnSO₄'),
]

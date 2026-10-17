/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 7 (chem.redox, chem.sblock and chem.sol (part 7), 16 cards).
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

export const CHEMISTRY_CARD_DEPTH_BATCH_7: SeedProbe[] = [
  // ─── chem.redox.balancing ────────────────────────────────────────────────
  card('chem.redox.balancing', 'short_answer', H,
    'A student writes the oxidation of iron as Fe²⁺ + e⁻ → Fe³⁺, and for MnO₄⁻ → Mn²⁺ in acid puts 4H₂O on the reactant side because "water always goes on the reactant side". Which statement is correct?',
    'Fe²⁺ → Fe³⁺ + e⁻ (electron on the right); the 4H₂O belongs on the product side',
    ['Fe²⁺ + e⁻ → Fe³⁺ is correct, because electrons are always consumed so they sit on the left', 'MC2'],
    ['The 4H₂O belongs on the reactant side, because water is always added to the reactant side', 'MC1'],
    'MC2 electron side follows direction, MC1 H₂O placement follows the deficit, re-asked with Fe²⁺ and MnO₄⁻'),

  // ─── chem.redox.disproportionation ───────────────────────────────────────
  card('chem.redox.disproportionation', 'short_answer', H,
    'A student calls Cl₂ + 2Fe²⁺ → 2Cl⁻ + 2Fe³⁺ a disproportionation because chlorine is reactive, and says 2Cu⁺ → Cu + Cu²⁺ cannot balance because one Cu gains an electron and the other loses one. Which statement is correct?',
    'The first is ordinary redox (Cl is only reduced); 2Cu⁺ → Cu + Cu²⁺ does balance',
    ['Cl₂ + Fe²⁺ is a disproportionation, because chlorine is a reactive element', 'MC1'],
    ['2Cu⁺ → Cu + Cu²⁺ cannot balance, because one copper gains and the other copper loses electrons', 'MC3'],
    'MC1 test for simultaneous increase and decrease, MC3 balance by half-reactions, re-asked with Cl₂/Fe²⁺ and Cu⁺'),

  // ─── chem.redox.oxidation-state ──────────────────────────────────────────
  card('chem.redox.oxidation-state', 'short_answer', H,
    'A student gives oxygen the oxidation state −2 in H₂O₂ and hydrogen the state +1 in NaH. Which statement is correct?',
    'Oxygen is −1 in H₂O₂ (peroxide) and hydrogen is −1 in NaH (hydride)',
    ['Oxygen is −2 in H₂O₂, since oxygen is always −2 in every compound that contains it', 'MC2'],
    ['Hydrogen is +1 in NaH, since hydrogen is always +1 in every compound that contains it', 'MC4'],
    'MC2 peroxide exception, MC4 metal-hydride exception, re-asked with H₂O₂ and NaH'),
  card('chem.redox.oxidation-state', 'true_false', H,
    'MnO₄⁻ is converted to MnO₂ in a redox reaction. Which statement is correct?',
    'Mn goes from +7 to +4 (reduced), so MnO₄⁻ is the oxidising agent',
    ['MnO₄⁻ is oxidised, because it is the oxidising agent', 'MC3'],
    ['Mn is +7 because it literally carries a 7+ charge inside MnO₄⁻ as a physical ion', 'MC1'],
    'MC3 the oxidising agent is reduced, MC1 oxidation state is formal, re-asked with MnO₄⁻/MnO₂'),

  // ─── chem.redox.titrations ───────────────────────────────────────────────
  card('chem.redox.titrations', 'short_answer', H,
    'A student acidifies a KMnO₄ titration with HCl, and adds starch at the very start of an iodometric titration of copper(II) so the colour change is clearest. Which statement is correct?',
    'Use dilute H₂SO₄ (KMnO₄ would oxidise Cl⁻), and add starch only near the endpoint, when the solution is pale yellow',
    ['HCl is fine, since any acid just provides the acidic medium', 'MC1'],
    ['Adding starch at the very start gives the sharpest endpoint, because the complex then forms from the beginning', 'MC3'],
    'MC1 acidify with H₂SO₄ only, MC3 starch near the endpoint, re-asked with KMnO₄/HCl and iodometry'),

  // ─── chem.sblock.alkali ──────────────────────────────────────────────────
  card('chem.sblock.alkali', 'short_answer', H,
    'A student says all alkali metals burn in oxygen to give M₂O, and that lithium is the most reactive because it is at the top of the group, like fluorine. Which statement is correct?',
    'Li gives Li₂O, Na gives the peroxide Na₂O₂ and K gives a superoxide, and reactivity rises down Group 1 (Cs is the most reactive)',
    ['All alkali metals form the simple oxide M₂O when burned in oxygen', 'MC2'],
    ['Lithium is the most reactive, because reactivity falls down the group as it does for the halogens', 'MC3'],
    'MC2 oxide, peroxide, superoxide, MC3 metal reactivity rises down the group, re-asked in general terms'),

  // ─── chem.sblock.alkaline-earth ──────────────────────────────────────────
  card('chem.sblock.alkaline-earth', 'short_answer', H,
    'A student says beryllium and barium both react vigorously with cold water like Group 1 metals, and that BaSO₄ is more soluble than MgSO₄ because hydroxide solubility rises down the group. Which statement is correct?',
    'Be is inert to cold water but Ba reacts vigorously, and sulfate solubility falls down the group',
    ['Every Group 2 metal reacts vigorously with cold water, like the Group 1 metals', 'MC1'],
    ['BaSO₄ is more soluble than MgSO₄, because solubility rises down the group for every anion alike', 'MC2'],
    'MC1 progressive reactivity, MC2 anion-specific solubility trends, re-asked with Be/Ba and BaSO₄/MgSO₄'),

  // ─── chem.sblock.hydrogen ────────────────────────────────────────────────
  card('chem.sblock.hydrogen', 'short_answer', H,
    'A student says ice sinks in liquid water because solids are denser than liquids, and that hydrogen peroxide always acts as an oxidising agent. Which statement is correct?',
    'Ice floats because its open H-bonded lattice is less dense; H₂O₂ can act as a reducing agent',
    ['Ice sinks, since a solid is always denser than its own liquid, as with almost every substance', 'MC2'],
    ['H₂O₂ always acts as an oxidising agent, whatever it reacts with', 'MC3'],
    'MC2 ice is less dense, MC3 H₂O₂ role depends on the partner, re-asked in general terms'),

  // ─── chem.sblock.water ───────────────────────────────────────────────────
  card('chem.sblock.water', 'short_answer', H,
    'A student says ice is denser than liquid water, and that boiling removes both temporary and permanent hardness from hard water. Which statement is correct?',
    'Ice is less dense (open lattice), and boiling removes only temporary hardness',
    ['Ice is denser than liquid water, because solids are denser than liquids in general', 'MC1'],
    ['Boiling removes all kinds of hardness, temporary and permanent', 'MC3'],
    'MC1 ice is less dense, MC3 boiling removes only temporary hardness, re-asked in general terms'),
  card('chem.sblock.water', 'true_false', H,
    'Which statement about hard water and heavy water is correct?',
    'Hard water has dissolved Ca²⁺/Mg²⁺; heavy water is D₂O; the two are unrelated',
    ['Heavy water is water with extra dissolved minerals, like hard water', 'MC2'],
    ['Boiling softens both hard water and heavy water, since both contain extra minerals', 'MC3'],
    'MC2 hard water vs heavy water, MC3 boiling and hardness'),

  // ─── chem.sol.colligative ────────────────────────────────────────────────
  card('chem.sol.colligative', 'short_answer', H,
    'A student predicts that 0.10 molal NaCl and 0.10 molal glucose raise the boiling point equally, and uses molarity in ΔT_b = K_b·m because the solutions are dilute. Which statement is correct?',
    'NaCl (i ≈ 2) raises it about twice as much as glucose (i = 1), and the formula needs molality',
    ['NaCl and glucose raise the boiling point equally at the same concentration', 'MC2'],
    ['Molarity can replace molality in a dilute aqueous solution, so either may be used', 'MC1'],
    'MC2 van\'t Hoff factor, MC1 molality, re-asked with 0.10 molal NaCl and glucose'),
  card('chem.sol.colligative', 'true_false', H,
    'A 0.15 M NaCl solution (i ≈ 2) is at 298 K. Which statement about its osmotic pressure is correct?',
    'π = iMRT ≈ 7.3 atm, a large pressure even though the concentration is low',
    ['The osmotic pressure is negligible at such a small concentration', 'MC3'],
    ['π ≈ 3.7 atm, because NaCl counts as one particle, like glucose', 'MC2'],
    'MC3 osmotic pressure is substantial, MC2 include i, re-asked with 0.15 M NaCl'),

  // ─── chem.sol.osmosis ────────────────────────────────────────────────────
  card('chem.sol.osmosis', 'short_answer', H,
    'A red blood cell is placed in a 3% NaCl solution (hypertonic). A student says salt moves across the membrane toward the dilute side and the cell swells. Which statement is correct?',
    'Only water crosses, leaving the cell for the more concentrated solution, so the cell shrinks',
    ['The solute moves across the membrane from the concentrated to the dilute side, until concentrations equalise', 'MC1'],
    ['A hypertonic solution makes the cell swell', 'MC2'],
    'MC1 only the solvent crosses, MC2 hypertonic shrinks cells, re-asked with a red blood cell in 3% NaCl'),

  // ─── chem.sol.solubility ─────────────────────────────────────────────────
  card('chem.sol.solubility', 'short_answer', H,
    'A student says warm soda stays fizzier because gas solubility rises with temperature, and that Henry\'s law predicts more NaCl dissolves at higher pressure. Which statement is correct?',
    'Gas solubility falls as temperature rises, and Henry\'s law applies to gases, not solids',
    ['Gas solubility rises with temperature, so warm soda keeps more CO₂', 'MC1'],
    ['Henry\'s law applies to solids too, so more NaCl dissolves under higher pressure, as for gases', 'MC2'],
    'MC1 gas solubility falls when warmed, MC2 Henry\'s law is for gases, re-asked with warm soda and NaCl'),

  // ─── chem.sol.types ──────────────────────────────────────────────────────
  card('chem.sol.types', 'short_answer', H,
    'A student says a benzene–toluene mixture must dissolve more than HCl in water because it is an "ideal" solution, and that wax does not dissolve in water at all. Which statement is correct?',
    '"Ideal" describes mixing energetics, not how much dissolves, and wax has a tiny non-zero solubility',
    ['An ideal solution is more soluble than a non-ideal one', 'MC1'],
    ['Wax does not dissolve in water at all, since solubility is absolute and polarity decides everything', 'MC2'],
    'MC1 ideal is not more soluble, MC2 solubility is a continuous scale, re-asked with benzene/toluene, HCl and wax'),

  // ─── chem.sol.vapour-pressure ────────────────────────────────────────────
  card('chem.sol.vapour-pressure', 'short_answer', H,
    'A solution has x_solvent = 0.80 and the pure solvent has P° = 100 kPa. A student uses the solute mole fraction, 0.20, in Raoult\'s law, and says boiling point elevation is unrelated to vapour pressure lowering. Which statement is correct?',
    'P = x_solvent × P° = 80 kPa, and boiling point elevation follows from the lowered vapour pressure',
    ['P = 0.20 × 100 = 20 kPa, using the solute mole fraction', 'MC2'],
    ['Boiling point elevation and vapour pressure lowering are unrelated effects', 'MC3'],
    'MC2 use x_solvent, MC3 bp elevation follows from vapour pressure lowering, re-asked with x_solvent = 0.80'),
]

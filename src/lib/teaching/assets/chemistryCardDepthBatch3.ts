/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 3 (chem.carb to chem.equil (part 3), 18 cards).
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
 * and abandon the live row's identity. Each chemistry concept already uses HIGH : mcq, misconception_probe, checkpoint (plus numeric, step_check, fill_blank or true_false on some), so the new cards take the FREE slots among HIGH : short_answer, true_false and step_check.
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

export const CHEMISTRY_CARD_DEPTH_BATCH_3: SeedProbe[] = [
  // ─── chem.carb.carboxylic ────────────────────────────────────────────────
  card('chem.carb.carboxylic', 'short_answer', H,
    'A student says ethanoic acid is far more acidic than ethanol simply because both have an O–H group that can lose H⁺, and that chlorine on carbon 3 of propanoic acid raises acidity as much as chlorine on carbon 2. Which statement is correct?',
    'Carboxylate resonance explains the gap, and the inductive effect falls with distance',
    ['The acidity comes just from having an ionisable O–H bond, which both molecules share', 'MC1'],
    ['Chlorine raises acidity equally on carbon 2 and carbon 3, since the inductive effect is the same at any distance', 'MC2'],
    'MC1 resonance-stabilised carboxylate, MC2 inductive effect falls with distance, re-asked with ethanoic acid and chloropropanoic acids'),
  card('chem.carb.carboxylic', 'step_check', H,
    'Acetoacetic acid (a β-keto acid) and ethanoic acid are each warmed gently. Which statement is correct?',
    'Acetoacetic acid loses CO₂ readily via a six-membered cyclic transition state; ethanoic acid does not',
    ['Both acids lose CO₂ readily, because carboxylic acids decarboxylate under mild conditions as a rule', 'MC3'],
    ['Neither acid can lose CO₂, because a carboxyl group is always stable', ''],
    'MC3 decarboxylation needs a low-energy pathway, re-asked with acetoacetic acid and ethanoic acid'),

  // ─── chem.carb.spectro ───────────────────────────────────────────────────
  card('chem.carb.spectro', 'short_answer', H,
    'A student says every carbonyl compound shows its C=O IR stretch at exactly 1715 cm⁻¹, and that every ketone gives a McLafferty fragment in its mass spectrum. Which statement is correct?',
    'The C=O stretch shifts with structure, and McLafferty rearrangement needs an accessible γ-hydrogen',
    ['The C=O stretch is always at exactly 1715 cm⁻¹, whatever the structure around the carbonyl group is', 'MC1'],
    ['Any ketone undergoes McLafferty rearrangement, with or without a γ-hydrogen', 'MC2'],
    'MC1 carbonyl stretch shifts, MC2 McLafferty needs a γ-hydrogen, re-asked in general terms'),

  // ─── chem.dblock.oxo-species ─────────────────────────────────────────────
  card('chem.dblock.oxo-species', 'short_answer', H,
    'A student says adding dilute acid to yellow chromate, CrO₄²⁻, leaves it yellow, and that the oxidation state of vanadium in VO₂⁺ is +2. Which statement is correct?',
    'Acid turns chromate orange as dichromate forms, and in VO₂⁺ vanadium is +5, since x + 2(−2) = +1',
    ['Acid leaves chromate yellow, because its colour does not respond to a change in pH', 'MC2'],
    ['Vanadium is +2 in VO₂⁺, matching the visible 2 in the formula', 'MC3'],
    'MC2 chromate/dichromate equilibrium, MC3 oxidation state by charge balance, re-asked with CrO₄²⁻ and VO₂⁺'),

  // ─── chem.elect.batteries ────────────────────────────────────────────────
  card('chem.elect.batteries', 'short_answer', H,
    'A lead–acid battery is recharged, and a hydrogen fuel cell is described as perfectly efficient. A student says recharging refills the battery with electricity, and that the fuel cell is 100% efficient because it makes only water. Which statement is correct?',
    'Charging forces the reverse reaction, and a fuel cell\'s efficiency is capped near 83%',
    ['Charging refills the battery with electricity, like filling a water tank with water from a tap', 'MC1'],
    ['The fuel cell is 100% efficient, because its only product is water and nothing is wasted', 'MC2'],
    'MC1 charging is a reverse reaction, MC2 clean product ≠ efficient, re-asked with a lead–acid battery and a fuel cell'),
  card('chem.elect.batteries', 'step_check', H,
    'Hydrogen reacts with oxygen in a fuel cell. Which statement is correct?',
    'Hydrogen is oxidised electrochemically at a catalytic electrode near room temperature, with no flame',
    ['Hydrogen is burned in a flame as in a combustion engine, and the heat is then converted to electricity', 'MC3'],
    ['The cell stores electricity that was pumped into it like water into a tank', 'MC1'],
    'MC3 electrochemical oxidation not combustion, MC1 energy is chemical, re-asked in general terms'),

  // ─── chem.elect.concentration-cell ───────────────────────────────────────
  card('chem.elect.concentration-cell', 'short_answer', H,
    'A cell has two identical copper electrodes in 0.010 M and 1.0 M Cu²⁺ solutions. A student says it gives zero voltage because the electrodes are the same, and that copper deposits on the dilute side. Which statement is correct?',
    'E = (0.0592/2) log(1.0/0.010) ≈ 0.059 V, with copper depositing (reduction) on the more concentrated side',
    ['The cell gives no voltage, because identical electrodes mean E° = 0 and so E = 0', 'MC1'],
    ['Copper deposits on the dilute side, because that is where reduction occurs', 'MC2'],
    'MC1 Nernst gives a voltage, MC2 cathode is the more concentrated side, re-asked with 0.010 M and 1.0 M Cu²⁺'),

  // ─── chem.elect.electrolysis ─────────────────────────────────────────────
  card('chem.elect.electrolysis', 'short_answer', H,
    'Copper(II) sulfate solution and silver nitrate solution are electrolysed with the same total charge. A student says the cathode is the positive electrode and that equal masses of copper and silver are deposited. Which statement is correct?',
    'The cathode is the negative electrode; a mole of electrons gives 31.75 g of Cu but 107.9 g of Ag',
    ['The cathode is the positive electrode, as in a galvanic cell', 'MC1'],
    ['Equal masses of copper and silver are deposited, since the same charge always gives the same mass', 'MC3'],
    'MC1 cathode sign, MC3 Faraday and M/n, re-asked with copper and silver'),
  card('chem.elect.electrolysis', 'step_check', H,
    'Concentrated aqueous NaCl is electrolysed in a chloralkali cell. Which statement is correct?',
    'Hydrogen forms at the cathode because water is reduced more readily than Na⁺, and chlorine forms at the anode',
    ['Sodium metal forms at the cathode, because Na⁺ is the only cation present', 'MC2'],
    ['The cathode is the positive electrode, so chlorine forms there', 'MC1'],
    'MC2 discharge competition with water, MC1 cathode sign, re-asked with a chloralkali cell'),

  // ─── chem.elect.nernst ───────────────────────────────────────────────────
  card('chem.elect.nernst', 'short_answer', H,
    'For Zn + Cu²⁺ → Zn²⁺ + Cu, a student writes Q from each half-reaction separately and combines them. For a reaction transferring six electrons she uses 0.0592 V per decade. Which statement is correct?',
    'Write Q once from the overall equation, Q = [Zn²⁺]/[Cu²⁺], and divide 0.0592 by n',
    ['Combine separate half-cell Q terms into one four-term expression', 'MC1'],
    ['Use 0.0592 V per decade whatever n is, so a six-electron reaction changes by 0.0592 V per tenfold change', 'MC3'],
    'MC1 Q from the overall equation, MC3 divide by n, re-asked with Zn/Cu²⁺ and n = 6'),
  card('chem.elect.nernst', 'true_false', H,
    'A cell has identical copper electrodes in 0.10 M and 0.0010 M Cu²⁺ solutions (E° = 0, n = 2). Which statement is correct?',
    'E ≈ +0.059 V: although E° = 0, the concentration ratio drives the Nernst term, (0.0592/2) × log 100',
    ['The cell is dead at 0 V, because E° = 0 means the cell cannot produce any voltage', 'MC2'],
    ['E ≈ 0.118 V, because 0.0592 V is applied twice without dividing by n', 'MC3'],
    'MC2 E° = 0 is not E = 0, MC3 divide by n, re-asked with 0.10 M and 0.0010 M Cu²⁺'),

  // ─── chem.elect.standard-electrode ───────────────────────────────────────
  card('chem.elect.standard-electrode', 'short_answer', H,
    'For Fe | Fe²⁺ ‖ Ag⁺ | Ag, with E°(Fe²⁺/Fe) = −0.44 V and E°(Ag⁺/Ag) = +0.80 V, a student computes E°cell as anode minus cathode and says iron is the less reactive metal because its E° is negative. Which statement is correct?',
    'E°cell = E°cathode − E°anode = +1.24 V, and the more negative E° is the stronger reducing agent',
    ['E°cell = −0.44 − 0.80 = −1.24 V, so the cell is not spontaneous', 'MC1'],
    ['Iron is the less reactive metal, because its E° is negative and a negative value means resisting reaction', 'MC2'],
    'MC1 cathode minus anode, MC2 negative E° = stronger reducer, re-asked with Fe and Ag'),

  // ─── chem.env.ozone ──────────────────────────────────────────────────────
  card('chem.env.ozone', 'short_answer', H,
    'A student says a CFC molecule destroys ozone in the dark as soon as it reaches the stratosphere, and that each Cl• radical is used up after destroying one ozone molecule. Which statement is correct?',
    'UV must first release Cl•, which then acts as a catalyst, regenerated in the second step',
    ['CFCs react with ozone directly, with no need for any light', 'MC1'],
    ['Each Cl• is consumed after one reaction, so it destroys only one ozone molecule and is gone', 'MC2'],
    'MC1 photolysis is the necessary first step, MC2 Cl• is a catalyst, re-asked in general terms'),

  // ─── chem.equil.acids-bases ──────────────────────────────────────────────
  card('chem.equil.acids-bases', 'short_answer', H,
    'A student says H₃PO₄ and HPO₄²⁻ are a conjugate pair because both are phosphate species, and that an acid with pKₐ 4.76 is stronger than one with pKₐ 3.17. Which statement is correct?',
    'Conjugates differ by exactly one H⁺ (H₃PO₄/H₂PO₄⁻), and the lower pKₐ (3.17) is the stronger acid',
    ['H₃PO₄ and HPO₄²⁻ are a conjugate pair, since conjugates may differ by two protons', 'MC1'],
    ['The acid with pKₐ 4.76 is stronger, because a bigger pKₐ means a stronger acid', 'MC2'],
    'MC1 one proton apart, MC2 lower pKₐ is stronger, re-asked with phosphate species and two pKₐ values'),
  card('chem.equil.acids-bases', 'true_false', H,
    'Which statement about ammonia, NH₃, is correct?',
    'NH₃ is not an Arrhenius base (no OH) but is a Brønsted–Lowry and Lewis base',
    ['NH₃ cannot be a base at all, because an Arrhenius base must contain OH in its structure', 'MC3'],
    ['NH₃ is a Brønsted–Lowry acid only, because it contains hydrogen', ''],
    'MC3 base depends on the theory, re-asked with NH₃'),

  // ─── chem.equil.buffer ───────────────────────────────────────────────────
  card('chem.equil.buffer', 'short_answer', H,
    'A buffer of 0.10 M ethanoic acid and 0.10 M sodium ethanoate is diluted tenfold with pure water, and a student calls 0.10 M ethanoic acid alone a buffer too. Which statement is correct?',
    'Dilution keeps the pH but lowers capacity, and ethanoic acid alone is not a buffer',
    ['Dilution changes the pH noticeably, because adding water dilutes the acid and base', 'MC1'],
    ['Ethanoic acid alone is a buffer, because any weak acid solution resists pH change', 'MC2'],
    'MC1 dilution keeps pH, MC2 needs both HA and A⁻, re-asked with ethanoic acid/ethanoate'),
  card('chem.equil.buffer', 'true_false', H,
    'Which buffer composition gives the greatest overall capacity?',
    '[A⁻]/[HA] = 1, which resists added acid and added base equally',
    ['[A⁻]/[HA] = 10, which resists added base most strongly and so has the greatest overall capacity', 'MC3'],
    ['A solution of only the weak acid HA, since the weak acid does the buffering', 'MC2'],
    'MC3 ratio of 1 is optimal, MC2 needs both HA and A⁻'),

  // ─── chem.equil.kc-kp ────────────────────────────────────────────────────
  card('chem.equil.kc-kp', 'short_answer', H,
    'For 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), a student writes K with the coefficients as multipliers, 2[SO₃] / (2[SO₂] × [O₂]), and says Kp equals Kc. Which statement is correct?',
    'K = [SO₃]²/([SO₂]²[O₂]), with coefficients as exponents, and Kp ≠ Kc since Δn = −1',
    ['K = 2[SO₃] / (2[SO₂] × [O₂]), with the coefficients as multipliers', 'MC1'],
    ['Kp equals Kc for this reaction, since Kp always equals Kc whatever the change in gas moles', 'MC3'],
    'MC1 coefficients are exponents, MC3 Kp = Kc(RT)^Δn, re-asked with SO₂/O₂/SO₃'),
]

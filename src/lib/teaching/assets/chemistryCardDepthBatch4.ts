/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 4 (chem.equil (rest), chem.found and chem.hal (part 4), 18 cards).
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

export const CHEMISTRY_CARD_DEPTH_BATCH_4: SeedProbe[] = [
  // ─── chem.equil.kw-ph ────────────────────────────────────────────────────
  card('chem.equil.kw-ph', 'short_answer', H,
    'Pure water at 50 °C (Kw = 5.5 × 10⁻¹⁴) has [H⁺] = [OH⁻] = 2.3 × 10⁻⁷ M. A student says it is neutral only if its pH is exactly 7, and finds [H⁺] for pH 3.0 by computing 10 − 3.0. Which statement is correct?',
    'Water at 50 °C is neutral at pH ≈ 6.63, and for pH 3.0, [H⁺] = 10^(−3.0) M',
    ['Water is neutral only when its pH is exactly 7, so a pH of 6.63 means it is acidic', 'MC1'],
    ['[H⁺] for pH 3.0 is 10 − 3.0 = 7, found by subtracting the pH from 10', 'MC3'],
    'MC1 neutral is [H⁺] = [OH⁻], MC3 antilog, re-asked with water at 50 °C'),
  card('chem.equil.kw-ph', 'true_false', H,
    'A 0.0020 M solution of the strong acid HNO₃ is prepared. Which statement is correct?',
    'HNO₃ dissociates completely, so [H⁺] = 0.0020 M and pH = 2.70',
    ['HNO₃ dissociates only partially, so [H⁺] must be found from an ICE table and Ka', 'MC2'],
    ['The pH is 3.0, because 0.0020 M can be rounded up to 0.010 M', ''],
    'MC2 strong acids dissociate completely, re-asked with 0.0020 M HNO₃'),

  // ─── chem.equil.solubility ───────────────────────────────────────────────
  card('chem.equil.solubility', 'short_answer', H,
    'AgCl has Ksp = 1.8 × 10⁻¹⁰ and CaF₂ has Ksp = 3.9 × 10⁻¹¹. A student says AgCl is more soluble because its Ksp is larger, and writes Ksp(CaF₂) = s². Which statement is correct?',
    'CaF₂ is more soluble: Ksp = 4s³ gives s ≈ 2.1 × 10⁻⁴ M, against 1.3 × 10⁻⁵ M',
    ['AgCl is more soluble, because a larger Ksp always means a greater molar solubility', 'MC1'],
    ['For CaF₂, Ksp = s², so s = 6.2 × 10⁻⁶ M', 'MC2'],
    'MC1 compare solubilities not raw Ksp, MC2 stoichiometric exponents, re-asked with AgCl and CaF₂'),
  card('chem.equil.solubility', 'true_false', H,
    'Equal volumes of 2.0 × 10⁻⁵ M Ag⁺ and 2.0 × 10⁻⁵ M Cl⁻ are mixed (Ksp of AgCl = 1.8 × 10⁻¹⁰). Which statement is correct?',
    'After mixing each ion is 1.0 × 10⁻⁵ M, so Q = 1.0 × 10⁻¹⁰ < Ksp: no precipitate',
    ['Use the original 2.0 × 10⁻⁵ M values: Q = 4.0 × 10⁻¹⁰ > Ksp, so AgCl precipitates', 'MC3'],
    ['Precipitation occurs whenever any Ag⁺ and Cl⁻ are present together', ''],
    'MC3 Q uses the just-mixed concentrations, re-asked with 2.0 × 10⁻⁵ M ions'),

  // ─── chem.equil.titration ────────────────────────────────────────────────
  card('chem.equil.titration', 'short_answer', H,
    '0.10 M ethanoic acid (pKₐ 4.76) is titrated with NaOH. A student says the equivalence point is at pH 7 and that the half-equivalence point is also at pH 7. Which statement is correct?',
    'Equivalence is above pH 7, and at half-equivalence pH = pKₐ = 4.76',
    ['Neutralisation always ends at pH 7, so the equivalence point is at pH 7', 'MC1'],
    ['The half-equivalence point is at pH 7, halfway to neutral', 'MC4'],
    'MC1 equivalence pH depends on strengths, MC4 half-equivalence pH = pKₐ, re-asked with ethanoic acid'),
  card('chem.equil.titration', 'true_false', H,
    'In a weak-acid titration the equivalence point is at pH 8.8, but the indicator used changes colour at about pH 6. Which statement is correct?',
    'The endpoint (pH 6) comes before the equivalence point (pH 8.8), causing an error; an indicator such as phenolphthalein suits this titration',
    ['The endpoint and equivalence point are the same thing, so the colour change marks pH 8.8', 'MC2'],
    ['Any indicator will do, since its colour change always lands on the equivalence point', 'MC3'],
    'MC2 endpoint vs equivalence point, MC3 indicator choice, re-asked with pH 8.8 and pH 6'),

  // ─── chem.equil.weak-acid ────────────────────────────────────────────────
  card('chem.equil.weak-acid', 'short_answer', H,
    '0.10 M HF (Ka = 6.8 × 10⁻⁴) is diluted tenfold. A student says its degree of dissociation falls, and finds Kb of F⁻ from Ka + Kb = Kw. Which statement is correct?',
    'α rises on dilution while [H⁺] falls, and Kb = Kw/Ka ≈ 1.5 × 10⁻¹¹',
    ['α falls on dilution, because [H⁺] falls', 'MC1'],
    ['Kb = Kw − Ka, so Ka and Kb of a conjugate pair add to give Kw exactly', 'MC2'],
    'MC1 dilution raises α, MC2 Ka × Kb = Kw, re-asked with HF'),
  card('chem.equil.weak-acid', 'true_false', H,
    'For 0.0010 M of a weak acid with Ka = 1.8 × 10⁻⁴, the shortcut x = √(Ka·C₀) gives 4.2 × 10⁻⁴ M. Which statement is correct?',
    'x is 42% of C₀, so the 5% check fails and the quadratic must be solved, giving [H⁺] ≈ 3.4 × 10⁻⁴ M',
    ['The shortcut value 4.2 × 10⁻⁴ M is acceptable, since the 5% approximation is always valid', 'MC3'],
    ['[H⁺] = 1.8 × 10⁻⁴ M, equal to Ka', ''],
    'MC3 verify the 5% approximation, re-asked with Ka = 1.8 × 10⁻⁴ and 0.0010 M'),

  // ─── chem.found.matter ───────────────────────────────────────────────────
  card('chem.found.matter', 'short_answer', H,
    'A student says a clear sugar solution is a pure substance because it looks uniform, and that hydrogen and oxygen can combine in any ratio to give water. Which statement is correct?',
    'Uniform appearance means homogeneous, not pure, and water forms in a fixed 1 : 8 mass ratio',
    ['A uniform solution is a pure substance, because homogeneous means pure', 'MC1'],
    ['Hydrogen and oxygen can combine in any ratio to give water, so the ratio in water varies by sample', 'MC3'],
    'MC1 homogeneous ≠ pure, MC3 fixed ratio, re-asked with a sugar solution and water'),

  // ─── chem.found.mole-concept ─────────────────────────────────────────────
  card('chem.found.mole-concept', 'short_answer', H,
    'A student says one mole of copper is 63.5 g, so the mole is a mass, and converts 0.50 mol of Cu atoms to atoms by dividing by 6.022 × 10²³. Which statement is correct?',
    'The mole is a count (6.022 × 10²³ entities), and atoms = 0.50 × 6.022 × 10²³ ≈ 3.0 × 10²³',
    ['The mole is a mass: one mole is 63.5 g, so the mole is simply a unit of mass, like the gram or kilogram', 'MC1'],
    ['Atoms = 0.50 ÷ 6.022 × 10²³ ≈ 8.3 × 10⁻²⁵', 'MC3'],
    'MC1 mole is a count, MC3 moles × Avogadro, re-asked with copper'),

  // ─── chem.found.pure-substances ──────────────────────────────────────────
  card('chem.found.pure-substances', 'short_answer', H,
    'A student says a clear liquid must be a pure substance because it looks uniform, and that distilling salt water produces sodium and chlorine. Which statement is correct?',
    'Uniform means homogeneous, not pure, and distillation separates without splitting compounds',
    ['A clear, uniform liquid is a pure substance', 'MC1'],
    ['Distilling salt water produces sodium and chlorine, since distillation breaks compounds into elements', 'MC3'],
    'MC1 uniform ≠ pure, MC3 distillation is physical, re-asked with a clear liquid and salt water'),

  // ─── chem.found.significant-figures ──────────────────────────────────────
  card('chem.found.significant-figures', 'short_answer', H,
    'A student totals 12.11 g, 0.3 g and 1.256 g and reports the sum to one significant figure (the fewest in the data), and treats the exact count 4 in "4 × 2.50 g" as one significant figure. Which statement is correct?',
    'Addition keeps the fewest decimal places, so 13.7 g; the exact 4 sets no limit',
    ['The sum is 10 g, limited by 0.3 g having one significant figure', 'MC1'],
    ['4 × 2.50 g = 10 g, because the 4 counts as one significant figure and limits the answer', 'MC3'],
    'MC1 addition uses decimal places, MC3 exact numbers do not limit, re-asked with a mass total and a count'),

  // ─── chem.hal.cfcs ───────────────────────────────────────────────────────
  card('chem.hal.cfcs', 'short_answer', H,
    'A student says CH₂FCF₃ (an HFC) depletes ozone like the CFCs because it contains fluorine, and that CCl₄ is polar because it has four polar C–Cl bonds. Which statement is correct?',
    'HFCs have essentially zero ozone depletion potential, and CCl₄ is nonpolar because its dipoles cancel',
    ['Any compound with fluorine depletes the ozone layer, because fluorine is chemically similar to chlorine', 'MC1'],
    ['CCl₄ is polar, because four polar bonds always make a polar molecule', 'MC3'],
    'MC1 ODP depends on the halogen chemistry, MC3 vector sum, re-asked with an HFC and CCl₄'),

  // ─── chem.hal.elimination ────────────────────────────────────────────────
  card('chem.hal.elimination', 'short_answer', H,
    '2-Bromo-2-methylbutane reacts with potassium tert-butoxide. A student says the Zaitsev product always forms and that a strong base always gives substitution. Which statement is correct?',
    'The bulky base removes the more accessible hydrogen, giving the Hofmann product 2-methylbut-1-ene',
    ['The Zaitsev product, 2-methylbut-2-ene, forms whatever the base that is used, as Zaitsev always applies', 'MC2'],
    ['Substitution dominates, because a strong base always gives substitution', 'MC3'],
    'MC2 base bulk decides Zaitsev vs Hofmann, MC3 strong base on a tertiary halide, re-asked with 2-bromo-2-methylbutane'),
  card('chem.hal.elimination', 'step_check', H,
    'tert-Butyl bromide and 1-bromobutane are each treated with sodium ethoxide. Which statement is correct?',
    'tert-Butyl bromide gives mainly the alkene by E2 (SN2 is blocked), whereas 1-bromobutane gives mainly the SN2 ether',
    ['Both give substitution, since a strong base always gives substitution', 'MC3'],
    ['Neither can give an alkene, because alkyl halides need an acid to eliminate', ''],
    'MC3 strong base + hindered substrate gives elimination, re-asked with tert-butyl bromide and 1-bromobutane'),

  // ─── chem.hal.introduction ───────────────────────────────────────────────
  card('chem.hal.introduction', 'short_answer', H,
    'A student says fluoroalkanes are the most reactive haloalkanes because C–F is the most polar bond, and that chlorobenzene reacts with NaOH faster than chloroethane because the ring is "activated". Which statement is correct?',
    'Rate follows I > Br > Cl >> F, and chlorobenzene is less reactive than chloroethane',
    ['Fluoroalkanes are the most reactive, because C–F is the most polar bond', 'MC1'],
    ['Chlorobenzene reacts faster, because aromatic rings are activated for substitution', 'MC2'],
    'MC1 reactivity follows bond strength, MC2 haloarenes are deactivated toward nucleophiles, re-asked in general terms'),
  card('chem.hal.introduction', 'step_check', H,
    'Bromoethane is shaken with water. Which statement is correct?',
    'It is only slightly soluble but can hydrolyse slowly, so "insoluble" does not mean "no interaction"',
    ['It has no interaction with water at all, because haloalkanes are insoluble and inert', 'MC3'],
    ['It hydrolyses faster than iodoethane would, because the C–Br bond is more polar than C–I', 'MC1'],
    'MC3 low solubility is not inertness, MC1 polarity vs reactivity, re-asked with bromoethane and water'),

  // ─── chem.hal.sn1 ────────────────────────────────────────────────────────
  card('chem.hal.sn1', 'short_answer', H,
    'A student says the SN1 hydrolysis of tert-butyl bromide has rate = k[RBr][Nu], and that SN1 is better than SN2 for methyl bromide because it is a simple one-step ionisation. Which statement is correct?',
    'SN1 rate = k[RBr], and methyl bromide cannot ionise to a stable carbocation',
    ['The SN1 rate is k[RBr][Nu], the same form as SN2', 'MC2'],
    ['Methyl bromide reacts fastest by SN1, since SN1 is a simpler one-step ionisation than SN2', 'MC3'],
    'MC2 SN1 rate law, MC3 SN1 needs a stable carbocation, re-asked with tert-butyl bromide and methyl bromide'),
]

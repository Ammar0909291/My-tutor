/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 11 (chem undergraduate part 3 (sol, solid, surface, thermo), 15 cards).
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
 * and abandon the live row's identity. Each chemistry concept in this batch has only an UNDERGRADUATE band and already uses UNDERGRADUATE : mcq, misconception_probe, checkpoint (plus numeric, step_check, fill_blank or true_false on some), so the new cards take the FREE slots among UNDERGRADUATE : short_answer, true_false and step_check.
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

export const CHEMISTRY_CARD_DEPTH_BATCH_11: SeedProbe[] = [
  // ─── chem.sol.activity ───────────────────────────────────────────────────
  card('chem.sol.activity', 'short_answer', U,
    'A student says activity equals concentration exactly in any solution, and takes the ionic strength of 0.10 M CaCl₂ to be 0.10. Which statement is correct?',
    'a = γc, with γ ≈ 1 only in dilute solution; the ionic strength of 0.10 M CaCl₂ is 0.30 M',
    ['Activity always equals concentration, so a = c in any solution', 'MC1'],
    ['The ionic strength of 0.10 M CaCl₂ is 0.10, because the ionic strength equals the molar concentration', 'MC3'],
    'MC1 activity coefficient, MC3 ionic strength weights z², re-asked with 0.10 M CaCl₂'),
  card('chem.sol.activity', 'true_false', U,
    'Which statement about activity coefficients is correct?',
    'They can be below 1 (dilute electrolytes) or above 1 (positive deviation, e.g. ethanol–water)',
    ['They can never exceed 1, so γ ≤ 1 always', 'MC2'],
    ['In concentrated seawater γ = 1, so activity equals concentration there as it does in dilute solution', 'MC1'],
    'MC2 γ can exceed 1, MC1 activity differs from concentration'),

  // ─── chem.solid.crystal-systems ──────────────────────────────────────────
  card('chem.solid.crystal-systems', 'short_answer', U,
    'A student says CsCl is BCC because there is an atom at the body centre, and that an FCC unit cell holds 14 atoms because 14 positions are visible. Which statement is correct?',
    'CsCl is a distinct structure type, and an FCC cell holds 4 atoms (8 × ⅛ + 6 × ½)',
    ['CsCl is BCC, because an atom sits at the body centre', 'MC1'],
    ['An FCC cell holds 14 atoms, because all 14 visible positions count in full as whole atoms', 'MC2'],
    'MC1 CsCl is its own structure type, MC2 sharing fractions, re-asked with CsCl and FCC'),
  card('chem.solid.crystal-systems', 'true_false', U,
    'Which statement about the 6 : 6 coordination in NaCl is correct?',
    'Each Na⁺ has six nearest Cl⁻ neighbours held electrostatically; there are no discrete covalent bonds',
    ['Each sodium forms six covalent bonds to six chlorine atoms, so 6 : 6 coordination is a covalent bond count', 'MC3'],
    ['NaCl is BCC, because it has atoms at the body centre', ''],
    'MC3 coordination number is not a bond count, re-asked with NaCl'),

  // ─── chem.solid.defects ──────────────────────────────────────────────────
  card('chem.solid.defects', 'short_answer', U,
    'A student says both Schottky and Frenkel defects lower a crystal\'s density, and that F-centres occur only in fluoride salts. Which statement is correct?',
    'Frenkel defects leave density unchanged, and F-centres (colour centres) occur in alkali halides like NaCl',
    ['Both Schottky and Frenkel defects lower the crystal\'s density', 'MC1'],
    ['F-centres occur only in fluoride salts, since the F stands for fluorine and they need a fluoride lattice', 'MC3'],
    'MC1 Frenkel keeps density, MC3 F-centre means Farbzentrum, re-asked in general terms'),
  card('chem.solid.defects', 'true_false', U,
    'FeO₀.₉₅ is found to have a variable composition. Which statement is correct?',
    'It is a real non-stoichiometric compound; the law of definite proportions applies to fixed-formula molecular compounds',
    ['It cannot be a genuine compound, since it violates the law of definite proportions', 'MC2'],
    ['Its density must be lower than that of FeO, because every defect lowers density', 'MC1'],
    'MC2 non-stoichiometric compounds are real, MC1 density depends on the defect type'),

  // ─── chem.solid.ionic-solids ─────────────────────────────────────────────
  card('chem.solid.ionic-solids', 'short_answer', U,
    'A student says the ionic compound with the larger lattice energy must be the more stable in every respect, including solubility, and writes the Born–Haber lattice-energy step as Na(g) + Cl(g) → NaCl(s). Which statement is correct?',
    'Lattice energy competes with hydration enthalpy; the step starts from gaseous ions, Na⁺(g) + Cl⁻(g)',
    ['A larger lattice energy always means greater stability, whatever property is being predicted, so also higher solubility', 'MC1'],
    ['The lattice-energy step is Na(g) + Cl(g) → NaCl(s), starting from gaseous atoms', 'MC2'],
    'MC1 lattice energy is not a universal predictor, MC2 lattice-energy step uses gaseous ions, re-asked with NaCl'),

  // ─── chem.solid.packing ──────────────────────────────────────────────────
  card('chem.solid.packing', 'short_answer', U,
    'A student says HCP and CCP differ in coordination number and packing efficiency, and that simple cubic packing is denser than close packing because it looks neat. Which statement is correct?',
    'HCP and CCP both have coordination number 12 and 74% efficiency (only the stacking differs), and simple cubic is only 52% efficient',
    ['HCP and CCP differ in every respect, including coordination number and packing efficiency', 'MC1'],
    ['Simple cubic packing is denser than close packing, because its regular grid looks neater', 'MC3'],
    'MC1 HCP and CCP share 12 and 74%, MC3 compute packing efficiency, re-asked in general terms'),

  // ─── chem.solid.properties ───────────────────────────────────────────────
  card('chem.solid.properties', 'short_answer', U,
    'A student says solid NaCl conducts electricity because it contains ions, and that diamond must be a semiconductor because silicon, with the same structure, is one. Which statement is correct?',
    'Solid NaCl has immobile ions (no conduction), and diamond is an insulator (5.5 eV gap), unlike silicon',
    ['Solid NaCl conducts, because it contains charged ions', 'MC1'],
    ['Diamond is a semiconductor, because silicon has the same structure as diamond and silicon is a semiconductor', 'MC2'],
    'MC1 conduction needs mobile carriers, MC2 check the band gap, re-asked with NaCl, diamond and silicon'),
  card('chem.solid.properties', 'true_false', U,
    'A thermistor is labelled NTC. Which statement is correct?',
    'NTC means negative temperature coefficient: its resistance falls as the temperature rises',
    ['NTC means "not thermally conducting", so it carries no heat', 'MC3'],
    ['NTC means its resistance rises as the temperature rises', ''],
    'MC3 NTC/PTC give the sign of a coefficient, re-asked with a thermistor'),

  // ─── chem.surface.heterogeneous-cat ──────────────────────────────────────
  card('chem.surface.heterogeneous-cat', 'short_answer', U,
    'A student says a catalyst supplies energy to the reactants, and that the Haber process uses V₂O₅ while the Contact process uses iron. Which statement is correct?',
    'A catalyst lowers the barrier without supplying energy; Haber uses Fe and Contact uses V₂O₅',
    ['A catalyst supplies energy to the reactant molecules so that they can clear the same barrier', 'MC1'],
    ['The Haber process uses V₂O₅ and the Contact process uses Fe', 'MC2'],
    'MC1 a catalyst lowers the barrier, MC2 catalyst assignments, re-asked with Haber and Contact'),

  // ─── chem.thermo.cell-thermo ─────────────────────────────────────────────
  card('chem.thermo.cell-thermo', 'short_answer', U,
    'For a cell with E° = +1.10 V and n = 2, a student writes ΔG° = +nFE° = +212 kJ/mol, and says doubling the equation leaves ΔG° unchanged because E° is unchanged. Which statement is correct?',
    'ΔG° = −nFE° = −212 kJ/mol, and doubling the equation doubles ΔG° while E° stays 1.10 V',
    ['ΔG° = +nFE° = +212 kJ/mol, with no negative sign', 'MC1'],
    ['ΔG° stays at −212 kJ/mol when the equation is doubled, because E° is intensive and unchanged', 'MC2'],
    'MC1 ΔG° = −nFE°, MC2 ΔG° is extensive, re-asked with E° = +1.10 V and n = 2'),
  card('chem.thermo.cell-thermo', 'step_check', U,
    'A reaction has a large positive E°cell but is observed to be extremely slow. Which statement is correct?',
    'E° measures the driving force, not the rate; a high activation energy can make a favourable reaction slow',
    ['A higher E° always means a faster reaction, so the observation must be a measurement error of some kind', 'MC3'],
    ['A large positive E° means the reaction cannot be spontaneous', ''],
    'MC3 E° is not a rate, re-asked with a slow reaction of large E°'),

  // ─── chem.thermo.third-law ───────────────────────────────────────────────
  card('chem.thermo.third-law', 'short_answer', U,
    'A student says every substance has S = 0 at 0 K, and sketches entropy against temperature as a smooth rising curve with no jumps. Which statement is correct?',
    'S = 0 at 0 K holds for perfect crystals only, and S(T) jumps at phase transitions',
    ['Every substance, perfect or not, has S = 0 at 0 K', 'MC1'],
    ['Entropy rises smoothly with temperature, with no jumps at phase transitions, as a continuous curve', 'MC2'],
    'MC1 perfect crystals only, MC2 staircase of S(T), re-asked in general terms'),
  card('chem.thermo.third-law', 'true_false', U,
    'ΔCp for a reaction is roughly constant between 298 K and 350 K. Which statement is correct?',
    'The linear form ΔH(T₂) = ΔH(T₁) + ΔCp(T₂ − T₁) is exact for constant ΔCp',
    ['Only full integration of the Kirchhoff equation is acceptable; the linear form is not allowed', 'MC3'],
    ['ΔH is independent of temperature whatever the value of ΔCp', ''],
    'MC3 linear Kirchhoff form is exact for constant ΔCp, re-asked with 298–350 K'),
]

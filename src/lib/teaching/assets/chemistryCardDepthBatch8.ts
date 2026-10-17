/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 8 (chem.solid, chem.state, chem.surface and chem.thermo (part 8), 10 cards).
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
 * and abandon the live row's identity. Each chemistry concept already uses HIGH : mcq, misconception_probe, checkpoint (plus numeric, step_check, fill_blank or true_false on some), so the new cards take the FREE slots among HIGH : short_answer and true_false.
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

export const CHEMISTRY_CARD_DEPTH_BATCH_8: SeedProbe[] = [
  // ─── chem.solid.amorphous ────────────────────────────────────────────────
  card('chem.solid.amorphous', 'short_answer', H,
    'A student says window glass is really a slow-flowing liquid because it is amorphous, and that it melts at one sharp temperature like quartz. Which statement is correct?',
    'Glass is mechanically a solid, and it softens gradually above its Tg rather than melting sharply',
    ['Glass is a liquid, because "amorphous" means it has a liquid-like structure and so it flows', 'MC1'],
    ['Glass melts at one sharp temperature and absorbs a fixed latent heat of fusion, like crystalline quartz', 'MC3'],
    'MC1 liquid-like structure ≠ liquid behaviour, MC3 gradual softening, re-asked with window glass and quartz'),

  // ─── chem.state.liquids ──────────────────────────────────────────────────
  card('chem.state.liquids', 'short_answer', H,
    'A student says diethyl ether has a higher boiling point than water because its vapour pressure is higher, and that boiling and evaporation are the same process, just fast or slow. Which statement is correct?',
    'Ether has high vapour pressure and a low boiling point; evaporation is a surface process, boiling a bulk one',
    ['Higher vapour pressure means a higher boiling point, so ether must boil at a higher temperature than water does', 'MC1'],
    ['Evaporation and boiling are the same process, differing only in speed', 'MC3'],
    'MC1 vapour pressure and boiling point are inversely related, MC3 evaporation vs boiling, re-asked with ether and water'),

  // ─── chem.state.phase-diagram ────────────────────────────────────────────
  card('chem.state.phase-diagram', 'short_answer', H,
    'A student says the solid–liquid line of water slopes positively like those of other substances, and that above its critical point CO₂ is neither liquid nor gas and has no useful properties. Which statement is correct?',
    'Ice is less dense than water, so water\'s solid–liquid line slopes negatively; scCO₂ is a hybrid',
    ['Water\'s solid–liquid line slopes positively, like that of every other substance', 'MC2'],
    ['Above the critical point CO₂ is neither liquid nor gas and has no useful properties of either phase at all', 'MC3'],
    'MC2 slope follows relative densities, MC3 supercritical fluids are hybrids, re-asked with water and CO₂'),

  // ─── chem.surface.adsorption ─────────────────────────────────────────────
  card('chem.surface.adsorption', 'short_answer', H,
    'A student says silica gel absorbs water vapour into its bulk, and that physisorption increases when the temperature is raised. Which statement is correct?',
    'Silica gel adsorbs water on its surface, and physisorption falls as temperature rises (exothermic)',
    ['Adsorption and absorption are the same process, so the water enters the bulk of the gel itself', 'MC1'],
    ['Physisorption increases with temperature, since more heat means more reaction', 'MC2'],
    'MC1 adsorption is a surface process, MC2 physisorption falls with temperature, re-asked with silica gel'),

  // ─── chem.surface.surfactants ────────────────────────────────────────────
  card('chem.surface.surfactants', 'short_answer', H,
    'A student says a micelle has its tails pointing outward and its heads inward, and that surface tension keeps falling as more surfactant is added above the CMC. Which statement is correct?',
    'Heads face the water (outward), tails cluster inward, and surface tension levels off above the CMC',
    ['The tails point outward and the heads point inward in a micelle', 'MC2'],
    ['Above the CMC, surface tension continues to fall steadily as more surfactant is added to the solution', 'MC3'],
    'MC2 micelle orientation, MC3 surface tension plateaus at the CMC, re-asked in general terms'),

  // ─── chem.thermo.bond-enthalpy ───────────────────────────────────────────
  card('chem.thermo.bond-enthalpy', 'short_answer', H,
    'A student says breaking the H–H bond releases energy, like a snapping rubber band, and that a bond-enthalpy calculation of ΔH should match the experimental value exactly. Which statement is correct?',
    'Breaking bonds always needs energy, and a bond-enthalpy ΔH is only an estimate',
    ['Breaking the H–H bond releases energy, like a rubber band snapping back', 'MC1'],
    ['A bond-enthalpy calculation gives the exact ΔH, so any difference from experiment is a mistake', 'MC2'],
    'MC1 bond breaking is endothermic, MC2 average bond enthalpies are estimates, re-asked with H–H'),
  card('chem.thermo.bond-enthalpy', 'true_false', H,
    'Which statement about the bonds H–F, H–Cl, F–F and Cl–Cl is correct?',
    'H–F is stronger than H–Cl, but F–F is weaker than Cl–Cl because of lone-pair repulsion in the short F–F bond',
    ['F–F is stronger than Cl–Cl, because the most electronegative element always forms the strongest bonds', 'MC3'],
    ['Breaking the F–F bond releases energy, like a rubber band snapping', 'MC1'],
    'MC3 electronegativity does not set bond strength, MC1 bond breaking absorbs energy'),

  // ─── chem.thermo.entropy ─────────────────────────────────────────────────
  card('chem.thermo.entropy', 'short_answer', H,
    'A student says S° of O₂(g) is zero because it is an element in its standard state, and that every exothermic reaction is spontaneous. Which statement is correct?',
    'S°(O₂) is positive at 298 K; spontaneity needs ΔS_universe > 0, so some endothermic changes are spontaneous',
    ['S° is zero for any element in its standard state', 'MC2'],
    ['Every exothermic reaction is spontaneous, since a negative ΔH is always the criterion for spontaneous change', 'MC3'],
    'MC2 S° of elements is positive, MC3 ΔS_universe decides, re-asked with O₂ and exothermic reactions'),

  // ─── chem.thermo.heat-capacities ─────────────────────────────────────────
  card('chem.thermo.heat-capacities', 'short_answer', H,
    'A student says Cp equals Cv for an ideal gas because it has no intermolecular forces, and accepts γ = Cv/Cp = 0.6 for a monatomic gas. Which statement is correct?',
    'Cp = Cv + R for an ideal gas, and γ = Cp/Cv = 5/3 for a monatomic gas, which is always greater than 1',
    ['Cp = Cv for an ideal gas, since it has no intermolecular forces', 'MC1'],
    ['γ = Cv/Cp = 0.6 is a valid result for a monatomic gas', 'MC3'],
    'MC1 Cp − Cv = R, MC3 γ > 1, re-asked with a monatomic gas'),

  // ─── chem.thermo.system ──────────────────────────────────────────────────
  card('chem.thermo.system', 'short_answer', H,
    'A student says a heated metal block now contains more heat, and that temperature doubles when the amount of the substance doubles. Which statement is correct?',
    'Its internal energy rose (heat is energy in transit), and temperature is intensive',
    ['The block now contains more heat, stored inside it', 'MC1'],
    ['Temperature doubles when the amount of the substance doubles, since it scales with the amount present', 'MC2'],
    'MC1 heat is energy in transit, MC2 intensive vs extensive, re-asked with a heated block'),
]

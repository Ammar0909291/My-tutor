/**
 * PHYSICS CARD-DEPTH CAMPAIGN — Batch 10 (phys.meas part 2, phys.therm, phys.wave.spring-mass, 20 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: 166 of 283 physics concepts held fewer than three authored cards with
 * 3+ options (215 cards short). Owner decision 3 (2026-10-07, `turnContract.certifiesMastery`)
 * makes a 2-option card practice-only once a concept holds three such cards, so a blind guess
 * on the remaining 2-option cards would otherwise still count towards mastery. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit existing
 * identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the
 * idea of one of the concept's registered misconceptions (ids read off the concept's own
 * existing probes, so none is invented) carries that id; any other wrong answer carries no id.
 * Every stem is a NEW worked example. Facts come only from the concept's blueprint
 * (docs/curriculum/blueprints/<concept>.md — Misconception Library, Replacement and
 * Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each concept in this batch holds misconception_probe, mcq, checkpoint and short_answer probes (plus a four-option card) at its own band, so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'physics'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'mcq' | 'misconception_probe' | 'true_false' | 'checkpoint' | 'step_check' | 'short_answer' | 'fill_blank' | 'numeric'

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

export const PHYSICS_CARD_DEPTH_BATCH_10: SeedProbe[] = [
  // ─── phys.meas.dimensions ────────────────────────────────────────────────
  card('phys.meas.dimensions', 'step_check', H,
    'Which pair has the same dimension: kilograms and pounds, or metres and seconds?',
    'Kilograms and pounds: different units of the same dimension, mass',
    ['Neither pair: a different unit always means a different dimension', 'MC-UNITS-ARE-DIMENSIONS'],
    ['Metres and seconds, since both are read off a ruler or a clock', ''],
    'MC-UNITS-ARE-DIMENSIONS units are not dimensions, re-asked with kg, pounds, m and s'),
  card('phys.meas.dimensions', 'fill_blank', H,
    'Complete the sentence: in a valid equation, quantities can be added or equated only if they have ____.',
    'the same dimensions, such as length plus length',
    ['different dimensions, as long as both numbers are written in SI units', 'MC-ADD-ACROSS-DIMENSIONS'],
    ['the same numerical value, whatever their units', ''],
    'MC-ADD-ACROSS-DIMENSIONS only like dimensions can be added'),

  // ─── phys.meas.errors ────────────────────────────────────────────────────
  card('phys.meas.errors', 'step_check', H,
    'A scale always reads 0.5 kg too high, but gives the same reading every time. How is it best described?',
    'Precise but inaccurate: the readings agree with each other, not with the true value',
    ['Accurate, because the readings are so consistent', 'MC-PRECISION-IS-ACCURACY'],
    ['Imprecise and inaccurate, because it is wrong', ''],
    'MC-PRECISION-IS-ACCURACY precision is not accuracy, re-asked with a scale'),
  card('phys.meas.errors', 'fill_blank', H,
    'Complete the sentence: averaging many repeated readings removes ____.',
    'random scatter, but not a systematic offset',
    ['all errors, random and systematic alike, if enough readings are taken', 'MC-AVERAGING-FIXES-ALL'],
    ['systematic offsets, but not random scatter', ''],
    'MC-AVERAGING-FIXES-ALL averaging only cuts random error, re-asked as a completion'),

  // ─── phys.meas.significant-figures ───────────────────────────────────────
  card('phys.meas.significant-figures', 'step_check', H,
    'A rectangle measures 4.2 cm by 3.1 cm, and the calculator shows 13.02 cm². How should the area be reported?',
    '13 cm²: two significant figures, like the least precise input',
    ['13.02 cm², since the calculator\'s answer is the most accurate value', 'MC-RESULT-EXCEEDS-INPUTS'],
    ['13.0 cm², to three significant figures', ''],
    'MC-RESULT-EXCEEDS-INPUTS a result cannot be more precise than its inputs, re-asked with 4.2 and 3.1'),
  card('phys.meas.significant-figures', 'fill_blank', H,
    'A student reports a ruler reading of 5.2 cm as 5.2000 cm "to be more precise". What is wrong?',
    'The extra zeros claim a precision that the ruler never measured',
    ['Nothing: more digits always means a better measurement', 'MC-MORE-DIGITS-BETTER'],
    ['Zeros after the decimal point never count as significant', ''],
    'MC-MORE-DIGITS-BETTER extra digits do not add precision, re-asked with 5.2000 cm'),

  // ─── phys.meas.unit-conversion ───────────────────────────────────────────
  card('phys.meas.unit-conversion', 'step_check', H,
    'Convert 2500 g to kilograms.',
    '2.5 kg: going from grams to kilograms makes the number smaller',
    ['2,500,000 kg, found by multiplying by 1000', 'MC-INVERSE-DIRECTION'],
    ['25 kg, found by dividing by 100', ''],
    'MC-INVERSE-DIRECTION a bigger unit needs a smaller number, re-asked with g to kg'),
  card('phys.meas.unit-conversion', 'fill_blank', H,
    'Complete the sentence: 250 μm is ____.',
    '0.25 mm, since micro is 10⁻⁶ and milli is 10⁻³',
    ['250,000 mm, found by multiplying instead of dividing', 'MC-PREFIX-BLIND'],
    ['0.025 mm, which is out by a factor of ten', ''],
    'MC-PREFIX-BLIND each prefix has its own power of ten, re-asked with micrometres'),

  // ─── phys.therm.zeroth-law ───────────────────────────────────────────────
  card('phys.therm.zeroth-law', 'step_check', H,
    'Block A is in thermal equilibrium with a thermometer, and block B is in equilibrium with the same thermometer. What does the Zeroth Law say about A and B?',
    'They are in equilibrium with each other, which is what lets a thermometer define temperature',
    ['Nothing new: this follows trivially and needs no law', 'MC-ZEROTH-LAW-TRIVIAL'],
    ['They must be at different temperatures', ''],
    'MC-ZEROTH-LAW-TRIVIAL the law is what makes temperature well defined'),

  // ─── phys.therm.internal-energy ──────────────────────────────────────────
  card('phys.therm.internal-energy', 'step_check', H,
    'A gas absorbs 500 J of heat and does 200 J of work on its surroundings. What is ΔU (using ΔU = Q − W)?',
    '+300 J, from 500 − 200',
    ['+700 J, found by adding the work as well', 'MC-SIGN-CONVENTION'],
    ['−300 J, since the gas lost energy as work', ''],
    'MC-SIGN-CONVENTION work done by the gas is subtracted, re-asked with 500 J and 200 J'),

  // ─── phys.therm.ideal-gas-law ────────────────────────────────────────────
  card('phys.therm.ideal-gas-law', 'step_check', H,
    'A tyre gauge reads 200 kPa and atmospheric pressure is 100 kPa. Which pressure goes into PV = nRT?',
    '300 kPa: the absolute pressure, gauge plus atmospheric',
    ['200 kPa, the reading on the gauge', 'MC-GAUGE-PRESSURE-IN-GAS-LAW'],
    ['100 kPa, the atmospheric pressure alone', ''],
    'MC-GAUGE-PRESSURE-IN-GAS-LAW the gas law needs absolute pressure, re-asked with a tyre gauge'),

  // ─── phys.therm.specific-heat ────────────────────────────────────────────
  card('phys.therm.specific-heat', 'step_check', H,
    '1 kg of water (c = 4186 J/kg·K) and 1 kg of copper (c = 385 J/kg·K) each receive 10 kJ. Which warms more?',
    'The copper, by about 26 K against about 2.4 K for the water',
    ['They warm by the same amount, since they receive the same heat', 'MC-MORE-HEAT-MEANS-MORE-TEMPERATURE'],
    ['The water, since it holds more heat', ''],
    'MC-MORE-HEAT-MEANS-MORE-TEMPERATURE the rise depends on c, re-asked with copper and water'),

  // ─── phys.therm.thermal-expansion ────────────────────────────────────────
  card('phys.therm.thermal-expansion', 'step_check', H,
    'A steel plate is heated. Which of its dimensions change?',
    'Length, width and thickness all grow, and so does the volume',
    ['Only the length: the width and thickness stay the same', 'MC-ONLY-LENGTH-EXPANDS'],
    ['Only the area changes, not the volume', ''],
    'MC-ONLY-LENGTH-EXPANDS solids expand in every direction, re-asked with a steel plate'),
  card('phys.therm.thermal-expansion', 'fill_blank', H,
    'Complete the sentence: water is densest at about ____.',
    '4 °C, so water below that expands as it cools',
    ['0 °C, since water always contracts as it cools', 'MC-WATER-ALWAYS-EXPANDS-WITH-HEAT'],
    ['100 °C, since hot water is the most compact', ''],
    'MC-WATER-ALWAYS-EXPANDS-WITH-HEAT water is anomalous below 4 °C, re-asked as a completion'),

  // ─── phys.therm.calorimetry ──────────────────────────────────────────────
  card('phys.therm.calorimetry', 'step_check', H,
    '300 g of water at 80 °C is mixed with 100 g of water at 20 °C in an insulated container. What is the final temperature?',
    '65 °C: the mixture is weighted by mass',
    ['50 °C, the simple average of the two temperatures', 'MC-FINAL-TEMPERATURE-IS-AVERAGE'],
    ['60 °C, found by subtracting 20 from 80', ''],
    'MC-FINAL-TEMPERATURE-IS-AVERAGE the final temperature is mass weighted, re-asked with 300 g and 100 g'),

  // ─── phys.therm.second-law ───────────────────────────────────────────────
  card('phys.therm.second-law', 'step_check', H,
    'An engine takes 1000 J from a 500 K reservoir, does 600 J of work and rejects 400 J to a 300 K reservoir. Is it possible?',
    'No: 60% exceeds the Carnot limit of 40%, although energy is conserved',
    ['Yes, since energy is conserved and the second law adds nothing more', 'MC-SECOND-LAW-IS-JUST-FIRST-LAW-RESTATEMENT'],
    ['Yes, as long as the cold reservoir is cooler than 300 K', ''],
    'MC-SECOND-LAW-IS-JUST-FIRST-LAW-RESTATEMENT the second law limits efficiency, re-asked with an engine'),

  // ─── phys.therm.thermodynamic-processes ──────────────────────────────────
  card('phys.therm.thermodynamic-processes', 'step_check', H,
    '600 J of heat is added to a gas at constant volume. What are W and ΔU?',
    'W = 0, so ΔU = Q = 600 J',
    ['ΔU = 0, because the volume does not change', ''],
    ['W = 600 J, because all of the heat becomes work', ''],
    'an isochoric process does no work, re-asked with 600 J'),
  card('phys.therm.thermodynamic-processes', 'fill_blank', H,
    'Complete the sentence: a gas expands at a constant 100 kPa from 10 L to 30 L, so the work it does is W = ____.',
    '2000 J: W = PΔV = 100 kPa × 0.020 m³',
    ['2,000,000 J, found by using litres directly in W = PΔV', ''],
    ['1000 J, taking only half of the volume change', ''],
    'isobaric work is PΔV, re-asked with 10 L to 30 L'),

  // ─── phys.therm.phase-transitions ────────────────────────────────────────
  card('phys.therm.phase-transitions', 'step_check', H,
    'How much heat boils away 0.5 kg of water that is already at 100 °C? (L_v = 2.26 MJ/kg)',
    '1.13 MJ: Q = mL_v, with no change of temperature',
    ['About 0.21 MJ, found as mcΔT with a rise of 100 K', 'MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE'],
    ['2.26 MJ, which forgets the 0.5 kg', ''],
    'MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE latent heat needs no temperature change, re-asked with 0.5 kg'),

  // ─── phys.wave.spring-mass ───────────────────────────────────────────────
  card('phys.wave.spring-mass', 'step_check', H,
    'A 0.2 kg mass hangs on a spring with k = 80 N/m and oscillates. What is the period T = 2π√(m/k)?',
    'About 0.31 s',
    ['About 125 s, found by inverting the ratio inside the root', ''],
    ['About 3.2 s, which is the frequency in Hz mistaken for the period', ''],
    'the period of a spring-mass system, re-asked with 0.2 kg and 80 N/m'),
]

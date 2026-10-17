/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 3 (bio.eco, bio.bioinfo, bio.behav, bio.biotech, bio.dev and bio.plant, facet cards, 16 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5, B4)
 * The asset contract floor is 3 probes per concept; the mathematics, chemistry and physics standard is 5.
 * Biology authored 3 per concept, and the B1 card-depth campaign added one 3-option card each, so every
 * concept now holds 4. Five cards per concept are spent in phases that do not count towards mastery
 * (GUIDE / DEMONSTRATE), so a learner who stays until mastery (owner decision 4, 2026-10-07) can exhaust a
 * shallow pool and meet the same question again. This batch adds the fifth card, on a facet of the concept
 * the other four do not ask. Owner authorisation: "F it's required then go ahead" (2026-10-17).
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the idea of one of
 * the concept's registered misconceptions (ids read off the concept's own existing probes or its
 * educational-brain entry, so none is invented) carries that id; any other wrong answer carries none.
 * Every stem is a NEW scenario. Facts come only from the concept's educational-brain entry
 * (educational-brain/concepts/biology/<concept>.md — Core Understanding and Misconceptions).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a second one:
 * `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug and abandon the live row's
 * identity. Each concept in this batch holds step_check, mcq, misconception_probe and short_answer probes at its own band, so the new card takes the FREE slot fill_blank at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'biology'
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
    source: `educational-brain/concepts/biology/${conceptId}.md — Core Understanding and Misconceptions; ${note}`,
  }
}

export const BIOLOGY_DEPTH_BATCH_3: SeedProbe[] = [
  card('bio.eco.global-change-biology', 'fill_blank', H,
    'Alpine plants are found at higher altitude than a century ago as temperatures have risen. What is this?',
    'A range shift: populations moving to track suitable conditions',
    ['A phenological shift: a change in the timing of life-cycle events', ''],
    ['Biotic homogenisation: a fall in local species counts', 'M2'],
    'M2 homogenisation is a separate response, re-asked with an altitude shift'),
  card('bio.bioinfo.multiomics-statistical-genomics', 'fill_blank', H,
    'A screen of 20,000 genes at p < 0.05, with no correction, finds about 1,000 hits by chance alone. What is the remedy?',
    'Correct for multiple testing, for example by controlling the false discovery rate',
    ['Nothing: p < 0.05 means exactly the same thing in a large screen as in a single test', 'M2'],
    ['Raise the cut-off so that more hits pass', ''],
    'M2 a p-value in a high-throughput screen needs multiple-testing correction, re-asked with 20,000 genes'),
  card('bio.behav.foraging-behavior', 'fill_blank', H,
    'What does optimal foraging theory assume natural selection favours?',
    'Strategies that maximise net energy gain per unit time',
    ['Strategies that stay in a patch until it is completely depleted', 'M1'],
    ['Strategies that eat as much of every kind of food as possible', ''],
    'M1 an animal should not stay until a patch is depleted, re-asked as what the theory assumes'),
  card('bio.behav.human-behavioral-ecology-evolutionary-psych', 'fill_blank', H,
    'How should the claim that a human behaviour is an adaptation be tested?',
    'Against competing explanations, including cultural ones, using evidence',
    ['It needs no testing, because the evolutionary explanation is automatically correct', 'M1'],
    ['By observing one society for a single year', ''],
    'M1 an evolutionary explanation is not automatically correct, re-asked as how the claim should be tested'),
  card('bio.biotech.agricultural-forensic-biotechnology', 'fill_blank', H,
    'Which approach adds a gene from another species into a crop genome?',
    'Genetic engineering (transgenic modification)',
    ['Marker-assisted selective breeding', 'M1'],
    ['Conventional cross-pollination between varieties', ''],
    'M1 marker-assisted breeding is not genetic engineering, re-asked as which approach adds a foreign gene'),
  card('bio.biotech.bioprocess-engineering', 'fill_blank', H,
    'Why must pH and temperature be actively controlled in a bioreactor?',
    'The cultured organisms need specific conditions for growth and product formation',
    ['Control is an arbitrary engineering preference with no biological reason', ''],
    ['Conditions at 10,000 litres are always the same as at 1 litre', 'M1'],
    'M1 scale-up is not the same process at a bigger size, re-asked as why conditions must be controlled'),
  card('bio.biotech.gene-therapy-detail', 'fill_blank', H,
    'A viral vector delivers genes efficiently but may trigger safety problems; a non-viral vector is safer but less efficient. What should decide the choice?',
    'The balance of efficiency against safety for that particular application',
    ['Viral vectors are always better, so they should always be chosen', 'M1'],
    ['Non-viral vectors are always better, so they should always be chosen', ''],
    'M1 neither vector type is simply better, re-asked as what should decide the choice'),
  card('bio.dev.aging-senescence-biology', 'fill_blank', H,
    'What do senescent cells secrete that can harm neighbouring tissue?',
    'Inflammatory signalling molecules (the senescence-associated secretory phenotype)',
    ['Extra copies of their own DNA', ''],
    ['Nothing: senescent cells are dead, so they secrete no signals of any kind at all', 'M1'],
    'M1 senescent cells stay alive and active unlike apoptotic cells, re-asked as what senescent cells secrete'),
  card('bio.dev.organogenesis', 'fill_blank', H,
    'Which germ layer gives rise to the lining of the gut?',
    'Endoderm',
    ['Ectoderm, which also forms the skin and the nervous system', ''],
    ['Mesoderm, which also forms the muscles and the skeleton', ''],
    'the three germ layers give rise to different organs, re-asked as which layer forms the gut lining'),
  card('bio.dev.regeneration-biology', 'fill_blank', H,
    'A planarian cut in two regrows two complete worms. What does this show?',
    'Some animals can regenerate a whole body from fragments',
    ['Regeneration in planarians uses a mechanism unrelated to that in other animals', 'M1'],
    ['Mammals can also regrow whole bodies from fragments', ''],
    'M1 regenerating organisms share an underlying mechanism, re-asked with a cut planarian'),
  card('bio.eco.applied-ecology-ecosystem-services', 'fill_blank', H,
    'Water purification by wetlands is which category of ecosystem service?',
    'Regulating, because it controls water quality',
    ['Provisioning, because it supplies a product that people harvest', ''],
    ['Cultural, because people value wetlands for recreation', ''],
    'ecosystem services fall into four distinct categories, re-asked with wetland water purification'),
  card('bio.eco.biogeochemistry-advanced', 'fill_blank', H,
    'Which elements are named as the four major biogeochemical cycles?',
    'Carbon, nitrogen, phosphorus and sulfur',
    ['Carbon, hydrogen, oxygen and helium', ''],
    ['Nitrogen, phosphorus, potassium and iron', ''],
    'the sulfur cycle is the fourth major cycle, re-asked as which four cycles are named'),
  card('bio.eco.landscape-conservation-ecology', 'fill_blank', H,
    'How do wildlife corridors help fragmented populations?',
    'They restore connectivity, letting individuals move and recolonise patches',
    ['They add total habitat area, the only way fragmentation harms populations', 'M1'],
    ['They isolate each patch so that it is protected from outside animals', ''],
    'M1 fragmentation harms through lost connectivity as well as lost area, re-asked about wildlife corridors'),
  card('bio.plant.mycorrhizae-plant-symbioses', 'fill_blank', H,
    'What does a plant gain from a mycorrhizal fungus, and what does the fungus gain?',
    'The plant gains water and minerals, especially phosphate; the fungus gains sugars',
    ['The plant gains sugars from the fungus; the fungus gains water and minerals from the plant', ''],
    ['The plant gains nitrogen gas; the fungus gains oxygen', ''],
    'mycorrhizae are mutualisms in which the fungus supplies minerals and the plant supplies sugars, re-asked as who gains what'),
  card('bio.plant.plant-defense-mechanisms', 'fill_blank', H,
    'Which of these is a structural defence of a plant?',
    'Trichomes (hairs) that deter herbivores',
    ['Alkaloid toxins held in the leaves', 'M1'],
    ['A toxin made only after an attack', ''],
    'M1 structural versus chemical is a separate axis from constitutive versus induced, re-asked as which is a structural defence'),
  card('bio.plant.plant-stress-physiology', 'fill_blank', H,
    'In drought, what does stomatal closure gain and what does it cost?',
    'It saves water but also limits CO₂ uptake',
    ['It loses more water but raises CO₂ uptake', ''],
    ['It happens only in drought, since ABA acts in no other stress', 'M2'],
    'M2 ABA is not a drought-specific hormone, re-asked as the gain and cost of stomatal closure'),
]

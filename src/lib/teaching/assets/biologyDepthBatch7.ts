/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 7 (bio.micro, bio.div, bio.plant and bio.repro, facet cards, 18 cards).
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
 * identity. Each concept in this batch holds step_check, short_answer, mcq and misconception_probe probes at its own band, so the new card takes the FREE slot fill_blank at that band (the kind is only a slot label).
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

export const BIOLOGY_DEPTH_BATCH_7: SeedProbe[] = [
  card('bio.micro.microbial-growth-culture', 'fill_blank', H,
    'Which phase of a batch culture comes first, before the cell numbers start to rise?',
    'Lag phase, when the cells adjust biochemically to the new medium',
    ['Log phase, when growth is exponential', 'M2'],
    ['Stationary phase, when the numbers level off', ''],
    'M2 bacterial growth is exponential once it starts, re-asked as which phase comes first'),
  card('bio.micro.pathogenic-microbes', 'fill_blank', H,
    'Which disease-causing agent is non-cellular and made of misfolded protein?',
    'A prion',
    ['A bacterium, which is a single prokaryotic cell', ''],
    ['A fungus, which is a eukaryote with a chitin wall', ''],
    'prions are non-cellular infectious agents, re-asked as which agent is made of misfolded protein'),
  card('bio.micro.microbes-in-human-welfare', 'fill_blank', H,
    'Lactobacillus turns milk into yoghurt. Which area of human welfare is this?',
    'Food production, by fermentation',
    ['Medicine, by making antibiotics', ''],
    ['Agriculture, by fixing nitrogen in the soil', 'M2'],
    'M2 each beneficial microbe has its own specific role, re-asked with Lactobacillus and yoghurt'),
  card('bio.micro.viral-replication', 'fill_blank', U,
    'How does the lytic cycle end?',
    'The host cell bursts, releasing new virions',
    ['The viral genome stays silent in the host chromosome', 'M1'],
    ['The host digests the virus before it can multiply', ''],
    'M1 a lysogenic genome stays silent while the lytic cycle ends in lysis, re-asked as how the lytic cycle ends'),
  card('bio.micro.horizontal-gene-transfer', 'fill_blank', U,
    'How does horizontal gene transfer differ from vertical inheritance?',
    'Genes move between organisms that are not parent and offspring',
    ['Genes pass only from a parent to its offspring', ''],
    ['There is only one mechanism, which has three different names', 'M2'],
    'M2 the three transfer mechanisms are distinct, re-asked as how horizontal transfer differs from vertical inheritance'),
  card('bio.div.three-domain-system', 'fill_blank', U,
    'On what evidence did Woese divide life into three domains?',
    'Molecular evidence, mainly 16S ribosomal RNA sequences',
    ['Cell shape and size seen under the microscope', ''],
    ['The temperature at which each group lives', 'M1'],
    'M1 archaea are not just extreme bacteria and the domains rest on molecular evidence, re-asked as what evidence Woese used'),
  card('bio.div.endosymbiotic-theory', 'fill_blank', U,
    'Why do mitochondria have a double membrane?',
    'The inner membrane is the bacterium\'s own; the outer comes from the host',
    ['Two membranes were needed to store the ATP that they make', ''],
    ['Both come from the nuclear envelope', ''],
    'the double membrane fits engulfment by a host cell, re-asked as why mitochondria have two membranes'),
  card('bio.div.protist-diversity', 'fill_blank', U,
    'Which of these is a protist?',
    'Plasmodium, the malaria parasite',
    ['A mushroom, which has a chitin cell wall', 'M1'],
    ['A moss, which has alternating generations', ''],
    'M1 protists are a diverse group and include parasites like Plasmodium, re-asked as which is a protist'),
  card('bio.div.fungal-biology', 'fill_blank', U,
    'What is a mycelium?',
    'A network of hyphae that forms the body of a fungus',
    ['A single large cell containing one nucleus', ''],
    ['The spore-producing cap of a mushroom', ''],
    'a fungal body is a network of hyphae, re-asked as what a mycelium is'),
  card('bio.div.plant-diversity-alternation-of-generations', 'fill_blank', U,
    'What does the sporophyte generation make by meiosis?',
    'Haploid spores',
    ['Gametes, made by mitosis', 'M1'],
    ['Diploid zygotes, made by fusion', ''],
    'M1 the familiar plant is not always the sporophyte and the gametophyte makes gametes, re-asked as what the sporophyte makes'),
  card('bio.div.cladistics-phylogenetic-thinking', 'fill_blank', U,
    'Why do cladists use shared derived characters instead of shared ancestral ones?',
    'Ancestral traits are held by all relatives, so they cannot show closer branches',
    ['Ancestral traits are always lost before they can be compared', ''],
    ['Overall similarity in appearance is the best guide to relationship between taxa', 'M1'],
    'M1 similar appearance does not mean close relationship, re-asked as why derived characters are used'),
  card('bio.plant.plant-water-relations', 'fill_blank', H,
    'What holds water molecules together in a continuous column in the xylem?',
    'Cohesion between the water molecules',
    ['A pump in the roots pushing the water upward', 'M1'],
    ['Gravity pulling the column downward', ''],
    'M1 water is not pumped up the plant, re-asked as what holds the xylem column together'),
  card('bio.plant.photosynthesis', 'fill_blank', H,
    'What do the light-dependent reactions supply to the Calvin cycle?',
    'ATP and NADPH',
    ['Glucose and oxygen', ''],
    ['Carbon dioxide taken from water', 'M1'],
    'M1 the oxygen released comes from water and not CO2, re-asked as what the light reactions supply'),
  card('bio.plant.mineral-nutrition', 'fill_blank', H,
    'Which of these is a macronutrient that plants need in large amounts?',
    'Nitrogen',
    ['Iron, needed in trace amounts', ''],
    ['Zinc, needed in trace amounts', ''],
    'macronutrients are needed in large amounts and micronutrients only in traces, re-asked as which is a macronutrient'),
  card('bio.plant.plant-growth-hormones', 'fill_blank', H,
    'Which hormone promotes stem elongation and seed germination?',
    'Gibberellins',
    ['Abscisic acid, which promotes dormancy', ''],
    ['Ethylene, which triggers fruit ripening', ''],
    'the five plant hormone groups have distinct roles, re-asked as which hormone promotes stem elongation'),
  card('bio.plant.plant-respiration', 'fill_blank', H,
    'At the light compensation point, what is the net CO₂ exchange of a leaf?',
    'Zero: photosynthesis uses exactly the CO₂ that respiration releases',
    ['Zero, because both processes have stopped', 'M2'],
    ['Maximum CO₂ uptake, because photosynthesis is fastest', ''],
    'M2 no net exchange does not mean the processes have stopped, re-asked at the compensation point'),
  card('bio.repro.asexual-reproduction', 'fill_blank', H,
    'By which method of asexual reproduction do bacteria multiply?',
    'Binary fission',
    ['Budding, where an outgrowth becomes a new individual', ''],
    ['Fragmentation, where the body breaks into regrowing pieces', ''],
    'asexual reproduction includes binary fission in bacteria, re-asked as how bacteria multiply'),
  card('bio.repro.sexual-reproduction-plants', 'fill_blank', H,
    'Which part of a flower protects the developing bud?',
    'The sepals',
    ['The petals, which attract pollinators', ''],
    ['The stamens, which produce pollen', ''],
    'sepals protect the bud and petals attract pollinators, re-asked as which part protects the bud'),
]

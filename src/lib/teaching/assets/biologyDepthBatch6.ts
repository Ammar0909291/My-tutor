/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 6 (bio.gen, bio.eco, bio.evo and bio.micro, facet cards, 18 cards).
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

export const BIOLOGY_DEPTH_BATCH_6: SeedProbe[] = [
  card('bio.gen.mutations', 'fill_blank', H,
    'Which of these is a chromosomal mutation rather than a gene mutation?',
    'Loss of a large segment of a chromosome',
    ['A single base replaced by another base', ''],
    ['A single base inserted into a coding sequence', ''],
    'chromosomal mutations change chromosome number or large-scale structure, re-asked as which is chromosomal'),
  card('bio.gen.population-genetics', 'fill_blank', U,
    'Which change would take a population out of Hardy–Weinberg equilibrium?',
    'Selection against one genotype',
    ['Random mating among the individuals', ''],
    ['A very large population size', ''],
    'Hardy-Weinberg equilibrium needs no selection, mutation, migration or drift, re-asked as which change breaks it'),
  card('bio.gen.genetic-engineering', 'fill_blank', U,
    'What is the role of DNA ligase in making recombinant DNA?',
    'It seals the sugar–phosphate backbone, joining insert and vector covalently',
    ['It cuts DNA at specific recognition sequences', ''],
    ['It supplies the stickiness that holds the cut ends together', 'M1'],
    'M1 sticky ends hold by base pairing and ligase seals them, re-asked as the role of ligase'),
  card('bio.gen.transposable-elements', 'fill_blank', U,
    'A retrotransposon increases in copy number. How?',
    'Its RNA copy is reverse-transcribed and inserted at a new site',
    ['It is cut out and pasted elsewhere, leaving no copy behind at the old site', 'M1'],
    ['It is copied once per cell division, like an ordinary gene', ''],
    'M1 cut-and-paste does not raise copy number the way retrotransposition does, re-asked as how a retrotransposon increases'),
  card('bio.eco.population-ecology', 'fill_blank', H,
    'What does population density measure?',
    'The number of individuals per unit area',
    ['The number of species per unit area', ''],
    ['The number of births per individual per year', ''],
    'density is individuals per unit area, re-asked as what density measures'),
  card('bio.eco.ecosystem-structure-function', 'fill_blank', H,
    'Which organisms are the producers in an ecosystem?',
    'Autotrophs such as plants and algae, which make their own organic matter',
    ['Decomposers, which break down dead organic matter into inorganic nutrients', ''],
    ['Herbivores, which feed on plants and pass energy up the food chain', ''],
    'producers are autotrophs, re-asked as which organisms are the producers'),
  card('bio.eco.nutrient-cycling', 'fill_blank', H,
    'What is ecological succession?',
    'The gradual change in the species of a community over time',
    ['The cycling of energy through the ecosystem, as nutrients cycle', 'M2'],
    ['The permanent loss of nutrients from a community', ''],
    'M2 energy flows one way and does not cycle, re-asked as what succession is'),
  card('bio.eco.biodiversity-conservation', 'fill_blank', H,
    'What is meant by species diversity?',
    'The number and relative abundance of the species in an area',
    ['The variation among individuals within a single species', ''],
    ['The variety of habitats across a landscape', ''],
    'species diversity is one of three levels of biodiversity, re-asked as what species diversity means'),
  card('bio.eco.environmental-issues', 'fill_blank', H,
    'What is the main cause of climate change?',
    'Greenhouse gases such as CO₂ trapping heat, mainly from burning fossil fuels',
    ['The ozone hole, which is the same phenomenon as global warming', 'M1'],
    ['Pollution from lead in petrol', ''],
    'M1 the ozone hole is not the main cause of global warming, re-asked as the main cause of climate change'),
  card('bio.eco.community-ecology', 'fill_blank', U,
    'Two species compete for the same food. How is each of them affected?',
    'Both are harmed (−/−)',
    ['One benefits and the other is harmed (+/−)', ''],
    ['Both benefit (+/+)', ''],
    'competition harms both participants, re-asked with two species sharing a food source'),
  card('bio.evo.origin-of-life', 'fill_blank', H,
    'How does the origin of life relate to evolution?',
    'Evolution explains change in living populations, not how life began',
    ['Evolution explains how the first life began', 'M1'],
    ['They are the same theory under two different names, used by different authors', 'M1'],
    'M1 the origin of life and evolution are different questions, re-asked as how the two relate'),
  card('bio.evo.evidence-for-evolution', 'fill_blank', H,
    'What does comparing the DNA sequences of two species show?',
    'The more similar the sequences, the more recent the shared ancestor',
    ['Similar sequences simply mean that the two species must look alike on the outside', 'M2'],
    ['DNA comparison cannot say anything about relatedness', ''],
    'M2 appearance does not show relatedness and molecules do, re-asked as what DNA comparison shows'),
  card('bio.evo.natural-selection', 'fill_blank', H,
    'What must be present for natural selection to change a population?',
    'Heritable variation that affects survival or reproduction',
    ['A need among individuals, who then evolve during their lifetimes', 'M1'],
    ['Individuals that are the strongest in every case', 'M2'],
    'M1 and M2 organisms do not evolve by need and fitness is not strength, re-asked as what natural selection requires'),
  card('bio.evo.modern-synthesis-speciation', 'fill_blank', H,
    'What is allopatric speciation?',
    'Speciation after populations are separated by a geographic barrier',
    ['Speciation in the same habitat with no barrier at all', 'M2'],
    ['Speciation caused by a sudden mass extinction', ''],
    'M2 allopatric and sympatric speciation are different, re-asked as what allopatric speciation is'),
  card('bio.evo.human-evolution', 'fill_blank', H,
    'When did the last common ancestor of humans and chimpanzees live?',
    'Roughly 6–7 million years ago',
    ['It never existed: humans descended from modern chimpanzees', 'M1'],
    ['About 500,000 years ago', ''],
    'M1 humans did not evolve from modern chimpanzees, re-asked as when the common ancestor lived'),
  card('bio.evo.molecular-evolution', 'fill_blank', U,
    'What does a molecular clock assume about neutral substitutions?',
    'They accumulate at a roughly constant rate over time',
    ['They occur only at the moment of speciation', ''],
    ['They are always driven by natural selection', 'M1'],
    'M1 most molecular change is neutral, re-asked as what a molecular clock assumes'),
  card('bio.evo.evo-devo', 'fill_blank', U,
    'Why can changes in regulatory DNA produce large changes in body plan?',
    'They alter when and where developmental genes are expressed',
    ['They create entirely new genes that other species lack', 'M1'],
    ['They change the protein sequence of every gene at once', ''],
    'M1 very different organisms share genes and differ in regulation, re-asked about regulatory DNA'),
  card('bio.micro.microbial-diversity', 'fill_blank', H,
    'Which group of microorganisms is the most abundant and diverse?',
    'Bacteria',
    ['Archaea, which live only in extreme environments', ''],
    ['Fungi, which are all single-celled', ''],
    'bacteria are the most abundant and diverse microbes, re-asked as which group is most abundant'),
]

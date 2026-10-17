/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 11 (bio.eco, bio.plant, bio.evo, bio.gen, bio.neuro and bio.sys part 11, 12 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: all 199 biology concepts held fewer than three authored cards with
 * 3+ options (203 cards short). Owner decision 3 (2026-10-07, `turnContract.certifiesMastery`)
 * makes a 2-option card practice-only once a concept holds three such cards, so a blind guess
 * on the remaining 2-option cards would otherwise still count towards mastery. Owner decision
 * (2026-10-17, "go ahead"): ADD new 3-option cards (Path A) rather than edit existing
 * identities, so the create-only bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus two wrong answers. A wrong answer that states the
 * idea of one of the concept's registered misconceptions (ids read off the concept's own
 * existing probes, so none is invented) carries that id; any other wrong answer carries no id.
 * Every stem is a NEW worked example. Facts come only from the concept's own
 * Educational Brain entry (educational-brain/concepts/biology/<concept>.md — Core Understanding
 * and Misconceptions); biology has no blueprint.
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each concept in this batch holds mcq, misconception_probe and short_answer probes at its own band, so the new cards take the FREE slot step_check at that band (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
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

export const BIOLOGY_CARD_DEPTH_BATCH_11: SeedProbe[] = [
  card('bio.eco.biogeochemistry-advanced', 'step_check', H,
    'Nitrate and phosphate also occur naturally in ecosystems. What makes fertiliser runoff harmful?',
    'It raises nutrient levels far above natural levels, driving algal blooms',
    ['It introduces a substance that ecosystems have never contained before', 'M2'],
    ['The nutrients themselves are toxic and directly poison the fish in the water', 'M1'],
    'M1 and M2 runoff harms through excess of a natural nutrient and not through toxicity or novelty, re-asked about fertiliser runoff'),
  card('bio.eco.landscape-conservation-ecology', 'step_check', H,
    'In a metapopulation, one patch\'s population goes locally extinct. What may happen next?',
    'Migrants can recolonise it, so the metapopulation persists',
    ['The whole metapopulation has failed, since one patch is lost', 'M2'],
    ['The patch is permanently lost, since recolonisation never occurs', ''],
    'M2 a local extinction does not mean the metapopulation has failed, re-asked as what happens next'),
  card('bio.plant.mycorrhizae-plant-symbioses', 'step_check', H,
    'Why do legume root nodules contain leghaemoglobin?',
    'It binds oxygen to protect nitrogenase while still supplying the bacteria',
    ['It is an unrelated biochemical detail with no link to nitrogen fixation', 'M2'],
    ['It transports fixed nitrogen from the nodule to the shoot', ''],
    'M2 leghaemoglobin is functionally linked to nitrogen fixation, re-asked as why nodules contain it'),
  card('bio.plant.plant-defense-mechanisms', 'step_check', H,
    'A thorn is always present on a rose stem. How is it classified on both axes?',
    'Structural and constitutive',
    ['Chemical and constitutive, since all constitutive defences are chemical', 'M1'],
    ['Structural and induced, since thorns grow after an attack', ''],
    'M1 the structural versus chemical axis is separate from constitutive versus induced, re-asked with a rose thorn'),
  card('bio.plant.plant-stress-physiology', 'step_check', H,
    'In saline soil, a plant takes up water poorly and also accumulates toxic ions. What does this show?',
    'Salinity harms in two ways: osmotic stress and ion toxicity',
    ['Salinity acts through a single unified mechanism of damage', 'M1'],
    ['The plant has simply run out of water, so salinity is unrelated', ''],
    'M1 salinity harms through two separate components, re-asked with poor water uptake and toxic ions'),
  card('bio.evo.coevolution-species-interactions', 'step_check', H,
    'A host and its parasite evolve counter-adaptations generation after generation. What does the Red Queen idea predict?',
    'Continuing reciprocal change in which neither side gains a lasting lead',
    ['A permanent winner will eventually emerge once the race has gone on for long enough', 'M2'],
    ['Both species will converge on identical traits', ''],
    'M2 the Red Queen hypothesis does not predict a permanent winner, re-asked with a host and parasite'),
  card('bio.evo.convergent-evolution-homoplasy', 'step_check', H,
    'Cacti in the Americas and euphorbias in Africa look alike. Are they closely related?',
    'No: the resemblance arose independently in similar deserts',
    ['Yes: strong structural similarity always shows a close evolutionary relationship', 'M1'],
    ['Yes: they must have been connected recently', ''],
    'M1 structural similarity does not always show close relationship, re-asked with cacti and euphorbias'),
  card('bio.evo.macroevolution-extinction', 'step_check', H,
    'After a mass extinction, surviving lineages diversify quickly into empty niches. What explains this?',
    'Newly open ecological opportunities, not a sudden rise in mutation rate',
    ['A sudden jump in mutation rates after the extinction', 'M2'],
    ['A different kind of evolution that is not natural selection', ''],
    'M2 adaptive radiation does not require a rise in mutation rate, re-asked as what explains rapid diversification'),
  card('bio.evo.phylogeography-biogeography', 'step_check', H,
    'Continental drift predicts when related species on separate continents should have diverged. What does that make the idea?',
    'A testable prediction about when the lineages should have diverged',
    ['A purely descriptive idea that makes no testable prediction about the dates', 'M2'],
    ['Proof that every disjunct distribution is due to drift', ''],
    'M2 continental drift gives a testable biogeographic prediction, re-asked as what the prediction makes the idea'),
  card('bio.gen.genetic-testing-counseling', 'step_check', H,
    'Which statement about NIPT is accurate?',
    'It estimates risk, and a high-risk result needs diagnostic confirmation',
    ['It is a definitive diagnosis, so no further testing is needed', 'M1'],
    ['It samples placental tissue directly and carries a miscarriage risk', ''],
    'M1 NIPT is a screening test and not a diagnosis, re-asked as an accuracy check'),
  card('bio.neuro.neurodevelopment', 'step_check', H,
    'A teenager begins learning a language after the sensitive period for native-like pronunciation. What can be said?',
    'Learning is still possible, though often slower or less complete',
    ['Learning is completely impossible after the critical period closes', 'M2'],
    ['Learning is faster, since the brain has more connections', ''],
    'M2 a missed critical period does not make later learning impossible, re-asked with a teenager and a language'),
  card('bio.sys.evolutionary-systems-biology', 'step_check', H,
    'Why can a robust network also be highly evolvable?',
    'Neutral changes accumulate silently, and some later give new useful variation',
    ['It cannot: robustness and evolvability are simple opposites that trade off', 'M1'],
    ['Robust networks never change, so their evolvability is zero', ''],
    'M1 robustness and evolvability are not simple opposites, re-asked as why a robust network can be evolvable'),
]

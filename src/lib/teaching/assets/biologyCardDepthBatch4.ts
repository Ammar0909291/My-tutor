/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 4 (bio.gen, bio.eco, bio.evo and bio.micro part 4, 19 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds short_answer, mcq and misconception_probe probes at its own band (organism-environment needs two cards), so the new cards take the FREE slots step_check and fill_blank at that band (the kind is only a slot label).
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

export const BIOLOGY_CARD_DEPTH_BATCH_4: SeedProbe[] = [
  card('bio.gen.genetic-engineering', 'step_check', U,
    'Two DNA fragments with matching sticky ends are mixed. What holds them together before ligase acts?',
    'Hydrogen bonds between the complementary overhanging bases',
    ['An adhesive protein coating on each cut end', 'M2'],
    ['Covalent bonds formed by the restriction enzyme itself', ''],
    'M2 sticky ends join by base pairing and not by an adhesive coating, re-asked before ligase acts'),
  card('bio.gen.transposable-elements', 'step_check', U,
    'A DNA transposon moves by cut-and-paste. After one jump, how many copies of the element does the genome hold?',
    'The same number: it left one site and entered another',
    ['One more, because cut-and-paste adds a copy just as retrotransposition does', 'M1'],
    ['None: the element is lost when it leaves its first site', ''],
    'M1 cut-and-paste does not raise copy number like copy-and-paste, re-asked after a single jump'),
  card('bio.eco.organism-environment', 'step_check', H,
    'A student says lions and vultures share a niche because both live on the same grassland. What is wrong with this?',
    'A niche is a functional role, not a place, and their roles differ',
    ['Nothing: a niche is simply the place where an organism lives', 'M1'],
    ['Nothing: a niche is the number of individuals in the habitat', ''],
    'M1 a niche is a role and not a place, re-asked with lions and vultures'),
  card('bio.eco.organism-environment', 'fill_blank', H,
    'Two warbler species both eat insects in one tree, one on the upper branches and one on the lower. Why can they coexist?',
    'They use different parts of the tree, so their niches differ',
    ['They have exactly the same niche, which many species can share permanently', 'M2'],
    ['They are one species living in two different habitats', ''],
    'M2 species cannot permanently share one niche, re-asked with two warblers'),
  card('bio.eco.population-ecology', 'step_check', H,
    'A yeast culture grows exponentially at first in a flask with a fixed supply of sugar. What happens later?',
    'Growth slows and levels off as the sugar runs short',
    ['It keeps doubling, since growth continues while the yeast reproduce', 'M1'],
    ['It falls to zero at once, because the doubling stops', ''],
    'M1 exponential growth cannot continue indefinitely, re-asked with yeast in a flask'),
  card('bio.eco.ecosystem-structure-function', 'step_check', H,
    'A grass field captures 5,000 units of energy. About how much reaches the frogs in the chain grass → grasshopper → frog?',
    'About 50 units, after two 10% transfers',
    ['About 1,250 units, since about half passes on at each level', 'M2'],
    ['About 500 units, since only one 10% transfer applies', ''],
    'M2 only about 10% of energy passes to the next level, re-asked with a grass-grasshopper-frog chain'),
  card('bio.eco.nutrient-cycling', 'step_check', H,
    'A willow sapling grows from 2 kg to 77 kg in 200 kg of dry soil, which loses only a few grams. Where did most of the new mass come from?',
    'Mostly carbon dioxide from the air and water, built up by photosynthesis',
    ['Mostly the soil, which supplies most of a plant\'s mass', 'M1'],
    ['Mostly the minerals the roots absorb from the water', ''],
    'M1 plants do not get most of their mass from the soil, re-asked with a growing willow'),
  card('bio.eco.biodiversity-conservation', 'step_check', H,
    'A rare orchid is conserved in a botanical garden greenhouse. What kind of conservation is this?',
    'Ex-situ: it is outside its natural habitat',
    ['In-situ: the plants are alive and protected, so it counts as in-situ', 'M2'],
    ['Neither: protecting a single species is not conservation', ''],
    'M2 a zoo or garden is ex-situ and not in-situ conservation, re-asked with a greenhouse orchid'),
  card('bio.eco.environmental-issues', 'step_check', H,
    'Fertiliser runoff gives a pond extra nitrate and phosphate. What is the most likely effect on the fish?',
    'They suffocate: the algae bloom, die and rot, using up the oxygen',
    ['They thrive, since more nutrients support more growth for all aquatic life', 'M2'],
    ['They are poisoned by toxins that the algae release directly', 'M3'],
    'M2 and M3 eutrophication harms by oxygen depletion and not by toxins or extra growth, re-asked for fish in a pond'),
  card('bio.eco.community-ecology', 'step_check', U,
    'A sea star preys on the mussel that would otherwise crowd out other shore species. What happens to diversity if the sea star is removed?',
    'It falls, because mussels spread once the predator no longer checks them',
    ['It rises, because predators always reduce the number of species', 'M1'],
    ['It is unchanged, because predators and prey are independent', ''],
    'M1 keystone predators can raise diversity, re-asked with a sea star and mussels'),
  card('bio.evo.origin-of-life', 'step_check', H,
    'In the Miller-Urey experiment a spark was passed through gases standing for the early atmosphere. What did the flask hold afterwards?',
    'Simple organic molecules such as amino acids, but no living cells',
    ['Living cells that could grow, feed and reproduce on their own, like bacteria', 'M2'],
    ['Only the original gases, unchanged', ''],
    'M2 Miller-Urey made organic molecules and not living cells, re-asked as what the flask held'),
  card('bio.evo.evidence-for-evolution', 'step_check', H,
    'A dolphin and a shark both have streamlined bodies and fins, yet a dolphin is a mammal. What does the shared shape show?',
    'Convergent evolution: similar environments favoured similar shapes',
    ['Close relatedness: similar-looking bodies show a recent common ancestor', 'M2'],
    ['Vestigial structures: the fins are remnants of limbs that lost their function', ''],
    'M2 similar-looking structures do not always show close relatedness, re-asked with a dolphin and a shark'),
  card('bio.evo.natural-selection', 'step_check', H,
    'Bacteria in a flask meet an antibiotic and a few resistant cells survive. How did those cells come to be resistant?',
    'The variants were already there before the antibiotic and were selected',
    ['The bacteria changed to become resistant because they needed to survive', 'M1'],
    ['The resistant cells were the strongest and fastest-growing in the flask', 'M2'],
    'M1 and M2 selection acts on existing variation and fitness is not strength, re-asked with antibiotic resistance'),
  card('bio.evo.modern-synthesis-speciation', 'step_check', H,
    'A lab population of fruit flies shows a heritable shift in body size after 50 generations of selection, about two years. What does this show?',
    'Evolution can be observed within a few years in organisms with short generations',
    ['It cannot be evolution, because evolution always takes millions of years', 'M1'],
    ['It is speciation, since any heritable shift creates a new species', ''],
    'M1 evolution does not always take millions of years, re-asked with a lab fruit-fly population'),
  card('bio.evo.human-evolution', 'step_check', H,
    'Fossils show Australopithecus walking upright with a brain not much bigger than a chimpanzee\'s. What does this suggest?',
    'Upright walking evolved long before large brain expansion',
    ['Large brains evolved first and made upright walking possible', 'M2'],
    ['Upright walking appeared only after tools were made by large-brained ancestors', ''],
    'M2 brain expansion was not the first human adaptation, re-asked with Australopithecus fossils'),
  card('bio.evo.molecular-evolution', 'step_check', U,
    'Two species differ far more at third-codon positions, where many changes are silent, than at first and second positions. Why?',
    'Silent changes are effectively neutral, so they accumulate freely',
    ['Selection actively favours every change at third positions', 'M1'],
    ['Mutations simply arise faster at third positions than at the first two', ''],
    'M1 most molecular change is neutral and not selected, re-asked with third-codon positions'),
  card('bio.evo.evo-devo', 'step_check', U,
    'Snakes, mice and whales share many of the same developmental genes. How do such different body plans arise?',
    'Through changes in when, where and how strongly the shared genes are expressed',
    ['Each lineage needs its own set of genes, so the gene sets differ greatly', 'M1'],
    ['Only through new protein-coding genes that appear in each lineage', ''],
    'M1 very different organisms share genes and differ in regulation, re-asked with snakes, mice and whales'),
  card('bio.micro.microbial-diversity', 'step_check', H,
    'A microbiologist surveys the bacteria in the intestine of a healthy person. What does she find about most of them?',
    'Most are harmless or helpful, and many aid digestion',
    ['Most are harmful, because bacteria exist mainly as pathogens', 'M1'],
    ['Most are eukaryotes that feed on the person\'s cells', ''],
    'M1 most bacteria are not harmful, re-asked with the human gut'),
  card('bio.micro.microbial-growth-culture', 'step_check', H,
    'A broth culture starts with 1,000 cells doubling every 30 minutes in log phase. How many cells are there after 2 hours?',
    '16,000 cells, after four doublings',
    ['5,000 cells, since it adds 1,000 cells every 30 minutes', 'M2'],
    ['8,000 cells, since it doubles three times', ''],
    'M2 bacterial growth is exponential and not linear, re-asked with a 2-hour log-phase culture'),
]

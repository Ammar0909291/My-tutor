/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 5 (bio.micro, bio.div, bio.plant and bio.repro part 5, 18 cards).
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
 * and abandon the live row's identity. Each concept in this batch holds short_answer, mcq and misconception_probe probes at its own band, so the new cards take the FREE slot step_check at that band (the kind is only a slot label).
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

export const BIOLOGY_CARD_DEPTH_BATCH_5: SeedProbe[] = [
  card('bio.micro.pathogenic-microbes', 'step_check', H,
    'Which infection is an antibiotic expected to treat?',
    'A bacterial throat infection such as strep throat',
    ['Influenza, since antibiotics act against every kind of infection', 'M1'],
    ['Athlete\'s foot, since it is caused by a microbe and not a virus', ''],
    'M1 antibiotics do not treat viral infections, re-asked as which infection an antibiotic treats'),
  card('bio.micro.microbes-in-human-welfare', 'step_check', H,
    'Rhizobium bacteria live in nodules on clover roots. Which nutrient do they supply to the plant?',
    'Nitrogen, in a form the plant can use (ammonia)',
    ['Phosphorus, released by breaking down soil minerals', 'M2'],
    ['Carbon, taken from the air and handed to the plant', ''],
    'M2 Rhizobium supplies nitrogen and not other nutrients, re-asked with clover root nodules'),
  card('bio.micro.viral-replication', 'step_check', U,
    'A temperate phage infects a bacterium, and no new phage particles appear for many generations of the host. Where is the phage genome?',
    'Integrated in the host chromosome and copied each time the host divides',
    ['Directing the production of new virions that stay hidden inside the cell', 'M1'],
    ['Destroyed by the host, with a fresh infection arriving each generation', ''],
    'M1 a lysogenic genome does not immediately make virions, re-asked with a temperate phage'),
  card('bio.micro.horizontal-gene-transfer', 'step_check', U,
    'A bacterium receives a plasmid through a direct pilus connection from another bacterium. Which mechanism is this?',
    'Conjugation: the DNA passes through a direct connection',
    ['Transformation, which is just another name for any gene transfer', 'M2'],
    ['Transduction: a bacteriophage carried the DNA across', ''],
    'M2 the three transfer mechanisms are distinct, re-asked with a pilus connection'),
  card('bio.div.three-domain-system', 'step_check', U,
    'A prokaryote that makes methane in swamp mud has membrane lipids unlike those of any bacterium. How should it be classified?',
    'As an archaeon, in a domain separate from Bacteria',
    ['As a bacterium, since every prokaryote is a type of bacterium', 'M1'],
    ['As a eukaryote, because its lipids are unusual', ''],
    'M1 archaea are not a kind of bacteria, re-asked with a methane-producing prokaryote'),
  card('bio.div.endosymbiotic-theory', 'step_check', U,
    'A student says endosymbiotic theory is only a guess, because nobody saw a cell engulf a bacterium. What evidence answers this?',
    'The organelles carry circular DNA and bacterial-type ribosomes of their own',
    ['None: a theory is an unproven guess by definition', 'M1'],
    ['The organelles divide only when the nucleus divides', ''],
    'M1 a scientific theory is not an unproven guess, re-asked as what evidence answers the objection'),
  card('bio.div.protist-diversity', 'step_check', U,
    'Giant kelp, a brown alga, grows tens of metres long. What does this show about protists?',
    'Some are large and multicellular, so "simple" is not accurate',
    ['Nothing: protists are all simple, single-celled organisms', 'M1'],
    ['That kelp is really a plant, since it is large and photosynthetic', ''],
    'M1 protists are not all simple, re-asked with giant kelp'),
  card('bio.div.fungal-biology', 'step_check', U,
    'Which statement correctly compares a mushroom with a fern?',
    'The mushroom has chitin walls and absorbs food; the fern has cellulose walls',
    ['Both are plants, so both have cellulose walls and make their own food by photosynthesis', 'M1'],
    ['Both absorb their food through chitin walls, as all non-animals do', ''],
    'M1 fungi are not plants, re-asked as a comparison of a mushroom and a fern'),
  card('bio.div.plant-diversity-alternation-of-generations', 'step_check', U,
    'Which generation of a moss produces gametes by mitosis?',
    'The leafy gametophyte (haploid)',
    ['The sporophyte, the familiar plant that makes the gametes', 'M1'],
    ['Neither: moss gametes are made by meiosis', ''],
    'M1 the familiar plant is not always the sporophyte, re-asked as which moss generation makes gametes'),
  card('bio.div.cladistics-phylogenetic-thinking', 'step_check', U,
    'Bats and birds both have wings, yet bats share a more recent ancestor with mice. What best justifies grouping bats with mice?',
    'Shared derived traits such as fur and mammary glands, inherited from a common ancestor',
    ['Their overall resemblance in body form and in the way they move', 'M1'],
    ['Any single shared trait, such as living on land, is enough to define a group', 'M2'],
    'M1 and M2 grouping rests on shared derived traits and not on appearance or any trait, re-asked with bats, birds and mice'),
  card('bio.plant.plant-water-relations', 'step_check', H,
    'Stomata are open on a sunny day. What happens to water at the stomata?',
    'Water vapour leaves the leaf, and this loss pulls more water up the xylem',
    ['Water enters the leaf through them, keeping the leaf cells full', 'M2'],
    ['Guard cells pump water out of the leaf using ATP', ''],
    'M2 stomata let vapour out and do not admit water, re-asked on a sunny day'),
  card('bio.plant.photosynthesis', 'step_check', H,
    'A leaf in bright light is making glucose. What are its mitochondria doing?',
    'Still respiring, releasing energy from glucose',
    ['Idle, because plants respire only when photosynthesis is unavailable', 'M2'],
    ['Making the glucose, since photosynthesis takes place in mitochondria', ''],
    'M2 plants respire all the time, re-asked for a leaf in bright light'),
  card('bio.plant.mineral-nutrition', 'step_check', H,
    'How can a gardener tell a nitrogen deficiency from an iron deficiency by looking at the leaves?',
    'By the pattern: nitrogen shows in older leaves first and iron in the youngest',
    ['He cannot, because every deficiency shows the same yellowing everywhere', 'M2'],
    ['By the height of the plant, since deficiencies only change how tall it grows', ''],
    'M2 deficiency patterns differ by mineral, re-asked as nitrogen versus iron'),
  card('bio.plant.plant-growth-hormones', 'step_check', H,
    'Green bananas ripen faster in a bag with an overripe apple. Which hormone is responsible?',
    'Ethylene, a gas that triggers ripening',
    ['Auxin, which promotes growth in every tissue', ''],
    ['Abscisic acid, which keeps fruit firm and green', ''],
    'ethylene triggers fruit ripening, re-asked with bananas and an overripe apple'),
  card('bio.plant.plant-respiration', 'step_check', H,
    'A potted plant is sealed in a jar and kept in the dark all night. What happens to the oxygen in the jar?',
    'It falls, because the plant respires and is not photosynthesising',
    ['It stays the same, because plants are dormant at night', 'M1'],
    ['It rises, because plants release oxygen all the time', ''],
    'M1 plants respire at night and are not dormant, re-asked with a sealed jar'),
  card('bio.repro.asexual-reproduction', 'step_check', H,
    'Two genetically identical potato plants grow from tubers of one parent, one in rich soil and one in poor soil. How will they compare?',
    'They will differ in size and health, because environment shapes development too',
    ['They will be identical in every way, because they share identical DNA', 'M1'],
    ['They will differ in their DNA, since new alleles appear at each regrowth', ''],
    'M1 clones are not identical in every way, re-asked with two potato plants'),
  card('bio.repro.sexual-reproduction-plants', 'step_check', H,
    'In a flowering plant, when does fertilisation take place?',
    'When a sperm nucleus fuses with the egg in the ovule',
    ['As soon as pollen lands on the stigma', 'M1'],
    ['When the pollen tube first starts to grow down the style', ''],
    'M1 pollination and fertilisation are different events, re-asked as when fertilisation takes place'),
  card('bio.repro.human-reproductive-system', 'step_check', H,
    'A woman has a 21-day menstrual cycle. Roughly when would ovulation be expected?',
    'Around day 7, about 14 days before the next period',
    ['On day 14, since ovulation always occurs on day 14', 'M1'],
    ['On day 21, at the very end of the cycle', ''],
    'M1 ovulation is not fixed at day 14, re-asked with a 21-day cycle'),
]

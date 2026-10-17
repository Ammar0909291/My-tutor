/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 3 (bio.mol, bio.physio and bio.gen part 3, 18 cards).
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

export const BIOLOGY_CARD_DEPTH_BATCH_3: SeedProbe[] = [
  card('bio.mol.noncoding-rna', 'step_check', U,
    'A researcher finds a long stretch of DNA that is transcribed into RNA but never translated into protein. Which conclusion is best supported?',
    'It may still be functional, because non-coding RNAs regulate genes and build structures',
    ['It is evolutionary noise, because only sequences that code for protein have a function', 'M1'],
    ['It is a copying error, because every transcript has to be translated', ''],
    'M1 non-coding RNA is not junk, re-asked with an untranslated transcript'),
  card('bio.mol.signal-transduction-pathways', 'step_check', U,
    'One adrenaline molecule binds one receptor, yet a liver cell releases thousands of glucose molecules. How is this possible?',
    'Each enzyme in the cascade activates many more, amplifying the signal',
    ['The adrenaline molecule copies itself thousands of times inside the cell', 'M2'],
    ['Thousands of receptors each bound a separate adrenaline molecule', ''],
    'M2 amplification is a cascade and not the signal molecule multiplying, re-asked with adrenaline'),
  card('bio.mol.dna-damage-repair', 'step_check', U,
    'One patient lacks mismatch repair and another lacks nucleotide excision repair. Which statement is accurate?',
    'Their problems differ, since each pathway fixes a different kind of damage',
    ['Their problems are the same, since every repair defect has the same effect', 'M2'],
    ['Both are caused by radiation, which is the only source of DNA damage', 'M1'],
    'M1 and M2 repair defects differ and damage has many sources, re-asked with two pathways'),
  card('bio.mol.bioenergetics', 'step_check', U,
    'A cellular reaction has ΔG = −15 kJ/mol. What can be said about it?',
    'It is spontaneous (exergonic) and can release energy to do work',
    ['It is non-spontaneous, so it needs an input of energy to proceed', 'M1'],
    ['It is at equilibrium, so there is no net change in either direction', ''],
    'M1 a negative free-energy change means spontaneous, re-asked with a worked value'),
  card('bio.physio.respiratory-system', 'step_check', H,
    'A rescuer gives mouth-to-mouth breaths to a person who has stopped breathing. Is the air the rescuer breathes out useful to the casualty?',
    'Yes: exhaled air still holds about 16% oxygen',
    ['No: exhaled air contains almost no oxygen at all', 'M1'],
    ['Only if the rescuer first breathes in pure oxygen', ''],
    'M1 exhaled air is not oxygen-depleted, re-asked with mouth-to-mouth breathing'),
  card('bio.physio.circulatory-system', 'step_check', H,
    'Oxygen-rich blood returns from the lungs to the heart. Which vessel carries it?',
    'The pulmonary vein, which carries oxygenated blood into the left atrium',
    ['The pulmonary artery, because arteries always carry oxygenated blood', 'M1'],
    ['The aorta, which takes blood away from the left ventricle', ''],
    'M1 arteries do not always carry oxygenated blood, re-asked as which vessel returns oxygen-rich blood'),
  card('bio.physio.immune-system-intro', 'step_check', H,
    'A person recovers from one strain of a virus. Which statement about their immunity is most accurate?',
    'It may protect against that strain but not against a changed one',
    ['It lasts for life and covers every future strain of that same virus', 'M2'],
    ['It is carried by the innate system, which fades within hours', ''],
    'M2 immunity does not always last or cover every strain, re-asked after recovery from one strain'),
  card('bio.physio.digestive-system', 'step_check', H,
    'Bile salts are mixed into a fatty meal in the small intestine. What do they do?',
    'They break the fat into small droplets, giving lipase more surface to work on',
    ['They hydrolyse the fat into fatty acids and glycerol, replacing lipase', 'M1'],
    ['They neutralise the stomach acid that would stop lipase working', ''],
    'M1 bile does not chemically digest fat, re-asked as what bile salts do to a fatty meal'),
  card('bio.physio.nervous-system', 'step_check', H,
    'How does a nerve impulse move along an axon?',
    'As a wave of ions crossing the membrane, not a flow of electrons',
    ['As electrons flowing along the axon, like current in a wire', 'M1'],
    ['As a pulse of neurotransmitter released along the full axon', ''],
    'M1 impulses are not electron flow, re-asked as how an impulse moves along an axon'),
  card('bio.physio.endocrine-system', 'step_check', H,
    'After a meal, insulin acts on liver and muscle cells. What happens to the extra glucose?',
    'It is taken up by the cells and stored, not removed from the body',
    ['It is destroyed by insulin and removed from the body in the urine', 'M1'],
    ['It moves out of the cells into the blood for the brain to use', ''],
    'M1 insulin does not destroy glucose, re-asked as what happens to glucose after a meal'),
  card('bio.physio.excretory-system', 'step_check', H,
    'Which organ system removes most of the body\'s urea?',
    'The kidneys; sweat carries only a trace of it',
    ['The skin, since sweating is the main route for urea and salts', 'M2'],
    ['The lungs, which breathe urea out with the carbon dioxide', ''],
    'M2 sweating is not equivalent to kidney function, re-asked as which organ removes most urea'),
  card('bio.physio.musculoskeletal-system', 'step_check', H,
    'A muscle can only pull. How, then, is a joint such as the elbow both bent and straightened?',
    'A second muscle on the opposite side pulls it back the other way',
    ['The same muscle contracts to bend it and relaxes to straighten it', 'M2'],
    ['The bone itself bends the joint back when the muscle stops', ''],
    'M2 a single muscle cannot both flex and extend a joint, re-asked with the elbow'),
  card('bio.gen.mendelian-genetics', 'step_check', H,
    'Two heterozygous Rr round-seed pea plants are crossed (R = round, dominant). What fraction of the offspring should be wrinkled?',
    '1/4: only the rr offspring are wrinkled',
    ['1/2, because heterozygotes show both traits equally', 'M3'],
    ['3/4: the dominant trait is shown by most of the offspring', ''],
    'M3 a monohybrid cross between heterozygotes gives 3 : 1 and not 1 : 1, re-asked as the wrinkled fraction'),
  card('bio.gen.gene-interactions', 'step_check', H,
    'In roan cattle, the heterozygote has both red hairs and white hairs mixed together. Which pattern is this?',
    'Codominance: both alleles are fully expressed side by side',
    ['Incomplete dominance: the heterozygote is an intermediate blend', 'M1'],
    ['Epistasis: one gene hides the effect of another gene', ''],
    'M1 codominance is not incomplete dominance, re-asked with roan cattle'),
  card('bio.gen.chromosomal-theory-linkage', 'step_check', H,
    'Two genes lie 1 centimorgan apart on the same chromosome. How are their alleles usually inherited?',
    'Together, because crossing over rarely separates them, so only about 1% are recombinant',
    ['Independently, with 50% recombinant offspring, as if on separate chromosomes', ''],
    ['Never together, because crossing over always separates them', ''],
    'linked genes are inherited together unless crossing over separates them, re-asked at 1 centimorgan'),
  card('bio.gen.pedigree-human-genetics', 'step_check', H,
    'A couple with a 1-in-4 risk of an autosomal recessive disorder have had three affected children. What is the chance the fourth is affected?',
    '1 in 4, since each child is an independent event and earlier births change nothing',
    ['Lower than 1 in 4, since the probabilities should even out', 'M1'],
    ['Almost certain, since three affected children shows that all will be', ''],
    'M1 earlier children do not change the risk for the next, re-asked after three affected children'),
  card('bio.gen.mutations', 'step_check', H,
    'A substitution changes the codon GAA to GAG, and both specify glutamic acid. What is the effect on the protein?',
    'None: it is a silent mutation, so the protein is unchanged',
    ['Harmful: any change to the DNA damages the protein', 'M1'],
    ['A frameshift: every later amino acid in the protein changes', ''],
    'M1 not every DNA change is harmful, re-asked with a silent substitution'),
  card('bio.gen.population-genetics', 'step_check', U,
    'In a Hardy-Weinberg population the recessive allele frequency q is 0.2. What fraction of the population are heterozygous carriers?',
    '32%: 2pq = 2 × 0.8 × 0.2',
    ['8%, twice the frequency of affected individuals', 'M2'],
    ['20%, the same as the recessive allele frequency', ''],
    'M2 carrier frequency is 2pq and not twice the incidence, re-asked with q = 0.2'),
]

/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 10 (bio.gen, bio.immuno, bio.eco, bio.behav, bio.bioinfo, bio.biotech and bio.dev part 10, 21 cards).
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

export const BIOLOGY_CARD_DEPTH_BATCH_10: SeedProbe[] = [
  card('bio.gen.conservation-genetics', 'step_check', H,
    'An inbred population of 50 receives 20 individuals from a genetically distinct population. What is the main benefit?',
    'New alleles reduce inbreeding depression, so rescue works through added diversity',
    ['More individuals, which helps simply because the population is larger', 'M2'],
    ['A higher mutation rate in the whole population', ''],
    'M2 genetic rescue works by adding genetic diversity and not just numbers, re-asked with an inbred population'),
  card('bio.immuno.t-cell-development-tolerance', 'step_check', H,
    'In the thymus, a T cell that cannot recognise self-MHC at all dies by neglect. Which step is this?',
    'Positive selection, which tests whether the T cell can recognise self-MHC',
    ['Negative selection, which tests whether it binds self-MHC or self-antigen at all', 'M1'],
    ['Peripheral tolerance, which acts on mature circulating T cells', ''],
    'M1 positive and negative selection test different properties, re-asked with death by neglect'),
  card('bio.eco.population-growth-models-quantitative', 'step_check', H,
    'What does the equation dN/dt = rN(1 − N/K) give?',
    'The rate of change of population size at a given N, not N at a time',
    ['The population size N at any time t you choose to put into the equation', 'M2'],
    ['The carrying capacity K of the habitat, worked out from the growth rate', ''],
    'M2 the logistic equation gives a rate and not the size at a given time, re-asked as what the equation gives'),
  card('bio.behav.mating-systems-sexual-selection', 'step_check', H,
    'Male stags fight each other for access to females, while female peahens choose males with larger tails. How do these differ?',
    'Fighting is intrasexual competition; choosing is intersexual choice',
    ['They are the same thing, since both favour identical traits and increase mating success', 'M2'],
    ['Both are forms of natural selection acting on survival only', ''],
    'M2 intrasexual competition and intersexual choice are different, re-asked with stags and peahens'),
  card('bio.bioinfo.genome-sequencing-technologies', 'step_check', H,
    'A researcher has a close, well-assembled reference genome for a related strain and wants to find differences quickly. Which approach suits this?',
    'Reference-guided mapping, which aligns reads to the known genome',
    ['De novo assembly, since the two approaches are interchangeable', 'M1'],
    ['Neither: reads cannot be assembled at all without first using Sanger sequencing', ''],
    'M1 de novo assembly and reference-guided mapping are not interchangeable, re-asked with a known reference genome'),
  card('bio.behav.social-behavior-eusociality', 'step_check', H,
    'A species of birds lives in groups across overlapping generations, but every adult breeds. Is it eusocial?',
    'No: eusociality needs a reproductive division of labour with non-breeding helpers',
    ['Yes: overlapping generations alone make a species eusocial', 'M2'],
    ['Yes: any group-living species is eusocial', ''],
    'M2 overlapping generations alone do not make a species eusocial, re-asked with group-living birds'),
  card('bio.bioinfo.comparative-genomics', 'step_check', H,
    'A gene is present in some bacterial isolates of one species but absent from the reference strain. What does this show?',
    'The species has a pangenome: no single reference contains all its genes',
    ['Nothing: a single reference genome already fully captures a species\' genes', 'M2'],
    ['The isolates belong to different species', ''],
    'M2 a single reference genome does not capture a species\' full gene content, re-asked with a gene absent from the reference'),
  card('bio.eco.predator-prey-dynamics', 'step_check', H,
    'When prey become abundant, each predator kills more per day, and over the next months predator numbers rise. Which is which?',
    'Kill rate per predator is the functional response; predator numbers the numerical',
    ['Both are the same thing: the numerical response is just the functional response', 'M2'],
    ['Kill rate is the numerical response; predator numbers are the functional response', ''],
    'M2 the functional and numerical responses are different, re-asked with abundant prey'),
  card('bio.behav.kin-selection-altruism', 'step_check', H,
    'Two unrelated vampire bats repeatedly share blood meals when the other is hungry. Is this kin selection?',
    'No: it is reciprocal altruism, based on repeated exchange and not relatedness',
    ['Yes: kin selection and reciprocal altruism are the same mechanism', 'M2'],
    ['Yes: any helping behaviour is kin selection', ''],
    'M2 kin selection and reciprocal altruism are different mechanisms, re-asked with vampire bats'),
  card('bio.immuno.cancer-immunology-immunotherapy', 'step_check', H,
    'A checkpoint inhibitor blocks PD-1 signalling on T cells. How does it help against a tumour?',
    'It releases the brake on T cells so they can attack the tumour',
    ['It directly attacks and kills tumour cells itself', 'M1'],
    ['It adds an artificial receptor to the T cells', 'M2'],
    'M1 and M2 checkpoint inhibitors release T cells and are not CAR-T therapy, re-asked with PD-1'),
  card('bio.eco.global-change-biology', 'step_check', H,
    'Two regions each keep the same number of species, but now share the same widespread generalists instead of different local ones. What is this?',
    'Biotic homogenisation: communities become more alike',
    ['Not homogenisation, since it requires a decline in local species counts', 'M2'],
    ['A phenological shift in the timing of life-cycle events', ''],
    'M2 biotic homogenisation need not lower local species counts, re-asked with two regions'),
  card('bio.bioinfo.multiomics-statistical-genomics', 'step_check', H,
    'A study measures mRNA, proteins and small molecules in one cell type. What does comparing the layers add?',
    'Each layer captures a different molecular level, giving a fuller picture',
    ['Nothing: all three measure the same underlying thing', 'M1'],
    ['Proteins can be read directly from the transcript levels, so the layers are redundant', ''],
    'M1 transcriptomics, proteomics and metabolomics measure different things, re-asked as what comparing the layers adds'),
  card('bio.behav.foraging-behavior', 'step_check', H,
    'A bird picks a steady food source when well fed, but a variable one when near starvation. What does this show?',
    'Risk sensitivity depends on energy state; it is not a fixed preference',
    ['Birds have a fixed, universal preference for risk, so one observation must be wrong', 'M2'],
    ['Birds choose among food sources at random', ''],
    'M2 risk sensitivity is not a fixed preference, re-asked with a bird\'s energy state'),
  card('bio.behav.human-behavioral-ecology-evolutionary-psych', 'step_check', H,
    'A behaviour is found in all known human societies. Does that alone prove it evolved by natural selection?',
    'No: culture or shared circumstances could also explain it, so evidence is needed',
    ['Yes: an evolutionary explanation is automatically correct', 'M1'],
    ['Yes, because cultural evolution is only ever a byproduct of genetic evolution in humans', 'M2'],
    'M1 and M2 an evolutionary account is not automatic and culture is not just genetic, re-asked with a universal behaviour'),
  card('bio.biotech.agricultural-forensic-biotechnology', 'step_check', H,
    'A DNA profile from a crime scene matches a suspect at every tested locus. What else is needed to interpret the match?',
    'The probability that an unrelated person would match by chance',
    ['Nothing: a perfect match alone is conclusive', 'M2'],
    ['Proof that the suspect\'s DNA is identical at every base of the genome', ''],
    'M2 a match needs statistical interpretation, re-asked with a full match at every tested locus'),
  card('bio.biotech.bioprocess-engineering', 'step_check', H,
    'A culture grows well in a 1-litre flask, but at 10,000 litres parts of the tank starve for oxygen. Why?',
    'Mixing, oxygen transfer and heat removal change with scale, so they need redesign',
    ['It should not: scale-up is just the same process at a bigger size', 'M1'],
    ['The organism changes its genetic code at larger volumes', ''],
    'M1 scale-up is not simply the same process bigger, re-asked with a 1-litre and a 10,000-litre culture'),
  card('bio.biotech.gene-therapy-detail', 'step_check', H,
    'Early gene therapy trials caused leukaemia in some SCID patients through insertional mutagenesis. What did the field take from this?',
    'Safer vectors and designs followed, so the setbacks informed later progress',
    ['That gene therapy had simply failed, with no bearing on later progress in the field', 'M2'],
    ['That viral vectors can never be used again', ''],
    'M2 early setbacks did not mean the field simply failed, re-asked with the SCID trials'),
  card('bio.dev.aging-senescence-biology', 'step_check', H,
    'A cell that permanently stopped dividing remains alive and secretes inflammatory signals. How does this differ from apoptosis?',
    'Senescent cells stay alive and active; apoptotic cells self-destruct',
    ['There is no difference: both mean the cell dies', 'M1'],
    ['Senescent cells divide faster than normal cells', ''],
    'M1 senescence and apoptosis are different, re-asked with a permanently arrested cell'),
  card('bio.dev.organogenesis', 'step_check', H,
    'A new organ forms through tissue interactions, positional signals and determination. Is this a special mechanism used only by that organ?',
    'No: it reuses the general morphogenesis machinery',
    ['Yes: each organ forms by its own unrelated mechanism', 'M1'],
    ['Yes: organs form by differentiation alone, without any signals', ''],
    'M1 organ formation reuses general morphogenesis and is not organ-specific, re-asked with a new organ'),
  card('bio.dev.regeneration-biology', 'step_check', H,
    'A mouse can regrow a fingertip but not a whole limb. What does this show?',
    'Mammals keep some regenerative machinery, but much less',
    ['Mammals lack the biological machinery for regeneration entirely, in any form', 'M2'],
    ['Mammals regenerate by a mechanism unrelated to other animals', ''],
    'M2 mammals do not lack regeneration machinery entirely, re-asked with a fingertip'),
  card('bio.eco.applied-ecology-ecosystem-services', 'step_check', H,
    'Wild bees pollinate a farmer\'s crop for free. Does the service have economic value?',
    'Yes: replacing it would cost money, even with no market price',
    ['No: a service nobody pays for has no economic value', 'M2'],
    ['Only if the farmer sells the bees', ''],
    'M2 a service with no market price still has economic value, re-asked with wild-bee pollination'),
]

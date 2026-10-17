/**
 * BIOLOGY CARD-DEPTH CAMPAIGN — Batch 9 (bio.plant, bio.cell, bio.mol, bio.micro and bio.gen part 9, 21 cards).
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

export const BIOLOGY_CARD_DEPTH_BATCH_9: SeedProbe[] = [
  card('bio.plant.seed-germination-dormancy', 'step_check', H,
    'Desert wildflower seeds stay dormant after a brief shower and germinate only after lasting rain. Why is this useful?',
    'It is an adaptation that stops germination when water would soon run out',
    ['It is a defect: healthy seeds should germinate whenever water is available', 'M2'],
    ['It shows the seeds are dead and need replacing', ''],
    'M2 dormancy is an adaptive strategy and not a defect, re-asked with desert wildflower seeds'),
  card('bio.plant.plant-biotechnology-applications', 'step_check', H,
    'Breeders use DNA markers linked to a disease-resistance allele to pick seedlings, with no foreign gene inserted. How is this classified?',
    'Conventional breeding made faster, since no transgene is inserted',
    ['Genetic engineering, since DNA markers directly insert foreign genes', 'M2'],
    ['A form of plant tissue culture', ''],
    'M2 marker-assisted breeding is not genetic engineering, re-asked with DNA markers and resistance'),
  card('bio.plant.phytochrome-photoperiodic-flowering', 'step_check', H,
    'Florigen is made in a leaf. Where does it act to trigger flowering?',
    'At the shoot apex, after being transported there from the leaf',
    ['In the leaf itself, where it is produced', 'M2'],
    ['In the roots, where it is stored until needed', ''],
    'M2 florigen does not act where it is made, re-asked as where florigen acts'),
  card('bio.cell.cytoskeleton-motility', 'step_check', H,
    'How does a flagellum bend?',
    'Dynein motors make neighbouring microtubule doublets slide past each other',
    ['Its microtubules contract and shorten like muscle fibres do, bending the flagellum', 'M2'],
    ['Actin filaments grow at its tip and push it sideways', ''],
    'M2 flagellar beating is sliding and not microtubule contraction, re-asked as how a flagellum bends'),
  card('bio.cell.membrane-transport-energetics', 'step_check', H,
    'The sodium–glucose symporter moves glucose into a cell using no ATP directly. Where does its energy come from?',
    'The sodium gradient built earlier by the Na⁺/K⁺ pump using ATP',
    ['None is needed, since no ATP is used directly', 'M2'],
    ['The glucose gradient itself, which runs down its concentration', ''],
    'M2 secondary active transport still needs energy, re-asked as where the symporter\'s energy comes from'),
  card('bio.cell.anaerobic-respiration-fermentation', 'step_check', H,
    'Muscle cells short of oxygen convert pyruvate to lactate. What does this step achieve?',
    'It regenerates NAD⁺ so that glycolysis can keep making a little ATP',
    ['It makes substantial additional ATP beyond glycolysis', 'M1'],
    ['It produces the oxygen needed by the electron transport chain', ''],
    'M1 fermentation does not generate additional ATP, re-asked with lactate in muscle'),
  card('bio.mol.metabolic-regulation-integration', 'step_check', H,
    'After a large meal, which way do the body\'s glucose pathways mainly run?',
    'Towards storage, with the opposing breakdown pathway switched down',
    ['Glycogen synthesis and breakdown both run together at similar rates', 'M2'],
    ['Towards breakdown, since there is plenty of glucose to burn', ''],
    'M2 opposing pathways do not run simultaneously at similar rates, re-asked after a large meal'),
  card('bio.mol.protein-quality-control-autophagy', 'step_check', H,
    'A chaperone helps a new polypeptide fold. What is its role?',
    'It assists folding without supplying the final shape',
    ['It acts as a template and directly folds the protein into shape', 'M1'],
    ['It tags the protein with ubiquitin for degradation', ''],
    'M1 chaperones assist and do not directly fold or template, re-asked as a chaperone\'s role'),
  card('bio.cell.cell-junctions-extracellular-matrix', 'step_check', H,
    'Which junction seals neighbouring cells so substances cannot leak between them, and which anchors them against tearing?',
    'Tight junctions seal; desmosomes anchor against tearing',
    ['Both seal equally, since desmosomes and tight junctions have the same function', 'M1'],
    ['Gap junctions seal; tight junctions anchor against tearing', ''],
    'M1 tight junctions and desmosomes have different functions, re-asked as which seals and which anchors'),
  card('bio.mol.alternative-splicing-rna-diversity', 'step_check', H,
    'Humans have about 20,000 genes but far more distinct proteins. What explains the gap?',
    'One gene can give several mRNAs through alternative splicing of its exons',
    ['The gene count must be wrong, since each gene makes one protein', 'M2'],
    ['Introns code for the extra proteins', ''],
    'M2 the gene-count paradox is explained by splicing and not by faulty counting, re-asked as what explains the gap'),
  card('bio.sys.quantitative-systems-modeling', 'step_check', H,
    'A modeller varies each parameter slightly to see which changes alter the output most. What is this?',
    'Sensitivity analysis: finding which parameters most affect the output',
    ['Sensitivity analysis: simply listing all the parameters contained in the model', 'M2'],
    ['Parameter estimation: fitting the parameters to data', ''],
    'M2 sensitivity analysis is not just listing parameters, re-asked with a parameter-variation example'),
  card('bio.cell.cell-adhesion-tissue-organization', 'step_check', H,
    'Epithelial cells undergo EMT during wound healing, then the wound closes. What happens to them?',
    'They can revert to an epithelial state and rejoin the sheet',
    ['They stay mesenchymal for good, since EMT is a one-way change', 'M2'],
    ['They die, since EMT always leads to cell death', ''],
    'M2 EMT is reversible and not permanent, re-asked after a wound closes'),
  card('bio.mol.chromatin-structure-genome-organization', 'step_check', H,
    'A TAD boundary and a DNA methylation mark are both said to regulate genes. How do they differ?',
    'A TAD boundary is a 3D folding feature; methylation is a chemical mark',
    ['They are the same mechanism, just described in two different ways', 'M2'],
    ['TAD boundaries are chemical marks on histones, while methylation is a loop', ''],
    'M2 3D genome architecture is not the same as epigenetic marks, re-asked as how a TAD boundary and methylation differ'),
  card('bio.micro.microbial-metabolism-diversity', 'step_check', H,
    'Some bacteria use sulfate instead of oxygen as the final electron acceptor in respiration. How does this relate to aerobic respiration?',
    'It is the same kind of process, with a different terminal electron acceptor',
    ['It is a completely different process with no shared mechanism', 'M2'],
    ['It is fermentation, which uses no electron transport chain', ''],
    'M2 anaerobic respiration is not a completely different process, re-asked with sulfate as the acceptor'),
  card('bio.cell.cancer-biology-hallmarks', 'step_check', H,
    'One cell ignores growth-suppressor signals; another survives DNA damage by blocking apoptosis. How are these two hallmarks related?',
    'They are two distinct hallmarks that together help a cell turn cancerous',
    ['They are really the same hallmark, described in two different ways by authors', 'M2'],
    ['Neither is a hallmark, since both occur in all normal cells', ''],
    'M2 evasion of growth suppressors and resistance to apoptosis are distinct hallmarks, re-asked with two cells'),
  card('bio.micro.archaea-extremophiles', 'step_check', H,
    'A microbe lives in a boiling spring. Is it automatically an archaeon?',
    'No: some bacteria live there too, and the domain depends on molecular features',
    ['Yes: archaea are just bacteria that live in extreme environments', 'M1'],
    ['Yes: only archaea can survive in hot springs', ''],
    'M1 archaea are not just extreme bacteria, re-asked with a microbe in a boiling spring'),
  card('bio.micro.human-microbiome-detail', 'step_check', H,
    'After antibiotics, the proportions of species already in a person\'s gut shift, and dysbiosis develops. What happened?',
    'The balance of resident species changed; no new species need have invaded',
    ['New harmful bacteria have invaded, because dysbiosis always means invasion by new species', 'M2'],
    ['All gut bacteria were killed, leaving the gut sterile', ''],
    'M2 dysbiosis is not invasion by bad bacteria, re-asked after antibiotics'),
  card('bio.eco.microbial-ecology', 'step_check', H,
    'Why is a biofilm on a catheter harder to treat with antibiotics than the same bacteria floating in broth?',
    'The cells sit in a protective matrix that shields them',
    ['It is not harder: a biofilm is just many independent cells in one place', 'M1'],
    ['Biofilm cells are a different species with natural resistance', ''],
    'M1 a biofilm is more than many independent cells, re-asked with a catheter biofilm'),
  card('bio.immuno.cytokines-immune-signaling', 'step_check', H,
    'An infected cell releases interferon. What does the interferon do?',
    'It signals neighbouring cells to raise their antiviral defences',
    ['It enters the infected cell and directly destroys the virus inside it', 'M1'],
    ['It is converted into antibodies against the virus', ''],
    'M1 interferons signal and do not directly attack the virus, re-asked as what interferon does'),
  card('bio.micro.antimicrobial-resistance', 'step_check', H,
    'A resistance gene is found in two distantly related bacteria that never exchanged offspring. How did it most likely spread?',
    'By horizontal gene transfer, such as conjugation of a plasmid',
    ['By ordinary inheritance from parent to offspring', 'M2'],
    ['The antibiotic created the same mutation in both', 'M1'],
    'M1 and M2 antibiotics do not create resistance and it spreads by horizontal transfer, re-asked with two distant species'),
  card('bio.gen.quantitative-genetics-heritability', 'step_check', H,
    'A trait has heritability 0.8 in a lab population raised in identical conditions. What would its heritability be in a population living in very varied conditions?',
    'Possibly lower, since heritability depends on the population and its environment',
    ['Also 0.8, since heritability is a fixed property of the trait', 'M2'],
    ['Zero, because the trait would then be entirely environmental', ''],
    'M2 heritability is not a fixed universal property, re-asked across two environments'),
]

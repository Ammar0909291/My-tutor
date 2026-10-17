/**
 * BIOLOGY PROBE-DEPTH CAMPAIGN (B4) — Batch 1 (bio.found and bio.cell, facet cards, 12 cards).
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

export const BIOLOGY_DEPTH_BATCH_1: SeedProbe[] = [
  card('bio.found.what-is-biology', 'fill_blank', H,
    'A conservation biologist studies why a bird is declining, using both ecology and genetics. What does this show about the branches of biology?',
    'They overlap and inform one another, and real questions often need several',
    ['They are independent topics that never interact with one another', 'M2'],
    ['Only one branch can ever apply to a given question', ''],
    'M2 the branches of biology are not independent, re-asked with a declining bird'),
  card('bio.found.classification-need', 'fill_blank', H,
    'Why do biologists classify organisms in nested ranks, from domain down to species, rather than in one flat list?',
    'Nested ranks show degrees of relatedness, so any organism can be placed and found',
    ['The ranks are arbitrary labels that scientists chose only for their convenience in filing', 'M1'],
    ['The ranks are ordered by organism size, from largest to smallest', ''],
    'M1 classification reflects real relationships and is not arbitrary, re-asked about nested ranks'),
  card('bio.found.binomial-nomenclature', 'fill_blank', H,
    'The word "robin" names different birds in Britain and in North America. What does a scientific name solve?',
    'It gives each species one unambiguous two-part name, used the same way worldwide',
    ['It lets scientists use just the species word, such as "rubecula", on its own', 'M1'],
    ['It translates the common name into the local language of each country', ''],
    'M1 the species word alone does not identify an organism, re-asked with the robin example'),
  card('bio.found.five-kingdom', 'fill_blank', H,
    'Which three criteria does Whittaker\'s five-kingdom system apply together?',
    'Cell type, body organisation and mode of nutrition',
    ['Habitat, body size and colour', ''],
    ['Outward appearance, habitat and whether it looks plant-like', 'M1'],
    'M1 grouping is not by appearance, re-asked as which criteria the system uses'),
  card('bio.found.microscopy-basics', 'fill_blank', H,
    'Microscope A magnifies 400× and resolves 0.2 µm. Microscope B magnifies 1000× and resolves 0.5 µm. Which shows finer detail?',
    'A, because its smaller resolution value means finer detail',
    ['B, because it has the higher magnification', 'M1'],
    ['They show equal detail, because both are light microscopes', ''],
    'M1 higher magnification does not always reveal more detail, re-asked with two microscopes'),
  card('bio.found.biomes-levels-of-organisation', 'fill_blank', H,
    'A heart cell can contract, but a single heart cell cannot pump blood around the body. What idea does this show?',
    'Emergent properties: pumping appears only in the assembled heart',
    ['Larger organs are just bigger heart cells with the same abilities', ''],
    ['Each level has exactly the same properties as the level below it', ''],
    'emergent properties appear only at their own level, re-asked with heart cells and the heart'),
  card('bio.found.viruses-viroids-lichens', 'fill_blank', H,
    'A viroid is a short circular RNA with no protein coat. How does it differ from a virus?',
    'A virus has a protein coat around its genome; a viroid is naked RNA',
    ['A viroid is a partnership between a fungus and an alga, like a lichen', 'M2'],
    ['A viroid is a very small cell with a tiny nucleus', ''],
    'M2 viruses, viroids and lichens are three distinct entities, re-asked as how a viroid differs from a virus'),
  card('bio.cell.cell-theory', 'fill_blank', H,
    'Which statement is part of cell theory?',
    'All living things are made of cells, and the cell is the smallest living unit',
    ['Cells can still form today by spontaneous generation from non-living matter', ''],
    ['Cells arise only from pre-existing cells, a principle first stated by Schleiden', 'M2'],
    'M2 the pre-existing-cells principle is Virchow\'s and not Schleiden\'s, re-asked as which statement belongs to cell theory'),
  card('bio.cell.prokaryotic-cell', 'fill_blank', H,
    'A bacterium carries a small circular DNA molecule, separate from its main chromosome, that can carry antibiotic resistance. What is it?',
    'A plasmid',
    ['A nucleolus, which makes ribosomal RNA inside the nucleus', ''],
    ['A mitochondrion, which supplies energy to the cell', ''],
    'prokaryotic DNA includes plasmids as well as the nucleoid chromosome, re-asked with a resistance plasmid'),
  card('bio.cell.eukaryotic-cell', 'fill_blank', H,
    'Why can a eukaryotic cell run incompatible reactions at the same time?',
    'Membrane-bound compartments keep the reactions separate',
    ['All its reactions share one open mixture, so they cancel out', ''],
    ['It has only one organelle, which handles every reaction in turn', ''],
    'compartmentalisation is the key advantage of eukaryotic cells, re-asked as why incompatible reactions can coexist'),
  card('bio.cell.cell-membrane-transport', 'fill_blank', H,
    'In the fluid mosaic model, how are the phospholipids of the bilayer arranged?',
    'Heads face the water on both sides; tails face each other inside',
    ['Hydrophobic tails face the water on both sides, with the heads inside', ''],
    ['The phospholipids are scattered randomly with no fixed arrangement', ''],
    'the bilayer has hydrophilic heads outward and hydrophobic tails inward, re-asked as how the phospholipids are arranged'),
  card('bio.cell.nucleus-chromosomes', 'fill_blank', H,
    'Where in the nucleus are ribosome subunits assembled?',
    'The nucleolus, the site of rRNA synthesis',
    ['The nuclear pores, which join the two membranes', ''],
    ['The nuclear envelope, a single outer membrane', ''],
    'the nucleolus makes rRNA and assembles ribosome subunits, re-asked as where subunits are assembled'),
]

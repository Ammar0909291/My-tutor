/**
 * BIOLOGY: probe DEPTH — the same zero-slack problem physics and chemistry
 * already hit, closed the same way.
 *
 * MEASURED (`scripts/assets/contract-audit.ts --subject biology`, 2026-09-20):
 * all 108 originally-authored biology concepts sit at exactly 2 gradeable
 * probes against the 3-probe asset contract (`correctAtCheck >= 1` plus
 * `correctAtPractice >= 2`, and `excludeProbeStem` never re-asks a spent
 * probe) — so NO biology lesson on any of the 108 could ever reach verified
 * mastery: a learner who answers the second probe correctly still has zero
 * probes left for the practice gate. This is the identical shape as the
 * physics/chemistry probe-depth defects (`physicsDepthSeedAssets.ts`,
 * `chemistryDepthSeedAssets.ts`) and the fix is the same: one additional
 * gradeable probe per concept.
 *
 * ── THE SAME STRUCTURAL OBSTACLE AS CHEMISTRY, NOT PHYSICS ─────────────────
 * `biologySeedAssets.ts` gives each of the 108 concepts exactly ONE `mcq` and
 * ONE `misconception_probe`, both at gradeBand HIGH — every
 * (conceptId, probeKind, gradeBand) slot is a singleton, so there is no
 * existing ladder to extend. `buildProbeSlugResolver` promotes a slot to a
 * difficulty-suffixed slug only once it holds a SECOND probe; adding one
 * under the already-used `mcq` or `misconception_probe` kind would silently
 * re-slug the row already ACTIVE in production under the plain 4-segment
 * slug — the exact P-10 abandoned-legacy-slug defect
 * (`abandonedLegacyProbeSlugs` in brainSeedAssets.ts) that was independently
 * found and remediated in production on 2026-09-20 (45 live rows, static
 * since 2026-09-15, blocking the ENTIRE cross-subject asset bootstrap — see
 * `docs/history/` for the incident record). Reproducing that defect here
 * would be introducing it back the moment this file seeds.
 *
 * So every probe below opens a BRAND-NEW slot: `probeKind: 'short_answer'`,
 * unused anywhere in `biologySeedAssets.ts` (verified: 0 occurrences before
 * this file). No existing row is touched, no slot is promoted, no P-10 risk.
 *
 * ── WHY short_answer IS STILL A CLOSED-CHOICE, DETERMINISTICALLY-GRADED
 *    PROBE ──────────────────────────────────────────────────────────────────
 * `probeToMcq` (gateAssessment.ts) does not read `probeKind` at all — a
 * familyKind/probeKind allowlist would be a second, drifting definition of
 * "gradeable" (see chemistryDepthSeedAssets.ts's own header for the same
 * finding). It requires a non-empty stem, 2-4 choices, no empty or duplicate
 * option text, and exactly one choice marked correct. Every probe below
 * carries a full `choices` array for exactly that reason — this is NOT the
 * open-ended, ungraded `short_answer` shape used for English's voice-required
 * phonics probes (those carry no `choices` at all and are deliberately
 * excluded from the deterministic contract); it is a closed-choice item that
 * happens to be labelled `short_answer` because it reads as a short written
 * answer rather than a multiple-choice question, while grading identically.
 *
 * ── WHAT EACH PROBE TESTS, AND WHY IT IS NOT A DUPLICATE ───────────────────
 * Each of the 108 concepts already has (1) a recognition/comprehension `mcq`
 * and (2) a `misconception_probe` that names and refutes one specific wrong
 * belief. The probe added here is deliberately a third, DIFFERENT capability
 * — application or transfer of the concept to a new scenario, never a
 * restatement of either existing question — at PROFICIENT difficulty (one
 * rung above the existing FOUNDATIONAL/DEVELOPING pair), so a learner who
 * clears the first two faces a genuinely harder, differently-shaped third
 * item rather than an easy repeat. Every stem, scenario and correct answer is
 * newly authored against the concept's own already-authored core explanation
 * in `biologySeedAssets.ts` (cross-checked against it directly, not
 * invented) — no new biological claim is introduced that the concept's own
 * explanation does not already support.
 *
 * ── SCOPE OF THIS FILE, BY BATCH ─────────────────────────────────────────
 * Batch 1 (bio.found, 8 concepts, 2026-09-20): the subject's own foundational
 * domain, authored first for the same reason every other subject's
 * depth-fix and Educational Brain campaigns close one domain at a time.
 * Batch 2 (bio.cell, 14 concepts, 2026-09-20): the second domain closed,
 * same mechanism, same contract. Batch 3 (bio.mol, 14 concepts,
 * 2026-09-20): the third domain closed, same mechanism, same contract —
 * the subject's largest domain by concept count (tied with bio.cell).
 * Batch 4 (bio.physio, 8 concepts, 2026-09-20): the fourth domain
 * closed, same mechanism, same contract. Batch 5 (bio.gen, 8 concepts,
 * 2026-09-20): the fifth domain closed, same mechanism, same contract.
 * Combined: 52/108 originally-authored concepts now at the 3-probe floor.
 * The remaining 56 of the 108 (`bio.eco`/`bio.evo`/`bio.micro`/`bio.plant`/
 * `bio.repro`/`bio.immuno`/`bio.sys`/`bio.biotech`/`bio.bioinfo`/
 * `bio.dev`/`bio.div`) are NOT covered by this file and remain at 2/3
 * gradeable probes — a bounded, honestly reported partial closure, not a
 * claim of full biology probe-depth closure. The 91 concepts added by
 * the 2026-09-14 KG extension
 * (`bio.neuro`, `bio.behav`, and the expansions to the 16 pre-existing
 * domains) have ZERO seed content of any kind (0 explanations, 0 probes)
 * and are a separate, larger authoring task, not a depth-fix on existing
 * content.
 *
 * Guarded by the generic `DEPTH_TARGETS`/`DEPTH_MODULES` mechanism in
 * `src/tests/probeInventoryDepth.test.ts` (the same file physics/chemistry
 * use), which lists this file at target 3 and applies duplicate-stem,
 * misconceptionId-must-exist-in-repair, no-ladder-conversion and
 * single-correct-choice checks to every pair it finds here.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'biology'
const src = (batch: string, concept: string, what: string) =>
  `docs/biology/kg/graph.json — ${concept} (probe-depth ${batch}); ${what}`
const srcD1 = (concept: string, what: string) => src('batch 1, bio.found, 2026-09-20', concept, what)
const srcD2 = (concept: string, what: string) => src('batch 2, bio.cell, 2026-09-20', concept, what)
const srcD3 = (concept: string, what: string) => src('batch 3, bio.mol, 2026-09-20', concept, what)
const srcD4 = (concept: string, what: string) => src('batch 4, bio.physio, 2026-09-20', concept, what)
const srcD5 = (concept: string, what: string) => src('batch 5, bio.gen, 2026-09-20', concept, what)

// ═══════════════════════════════════════════════════════════════════════════
// BATCH BIO-D1 — bio.found (all 8 concepts) @ HIGH, PROFICIENT, short_answer
// ═══════════════════════════════════════════════════════════════════════════

const BIO_D1: SeedProbe[] = [
  {
    conceptId: 'bio.found.what-is-biology', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A team is investigating why a frog population is disappearing from a wetland — measuring the frogs’ hormone levels, the water’s chemistry, and the population’s size over ten years. Which combination of biology’s branches is this team drawing on?',
    choices: [
      { text: 'Physiology (hormones), ecology (water chemistry, population), all connected as biology’s branches routinely are', isCorrect: true },
      { text: 'Only genetics, since population decline is always a genetic problem', isCorrect: false },
      { text: 'Only microbiology, since wetland disease is the most likely cause', isCorrect: false },
      { text: 'Botany and taxonomy alone, since the frogs need naming first', isCorrect: false },
    ],
    correctValue: 'Physiology, ecology, and population biology together',
    targetedMisconceptions: [],
    source: srcD1('bio.found.what-is-biology', 'directly applies the explanation’s own claim that "every branch ultimately connects" to a concrete multi-branch scenario, rather than restating the branch-naming mcq or the memorisation-vs-reasoning misconception probe already on file'),
  },
  {
    conceptId: 'bio.found.characteristics-of-life', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A lab molecule increases in number, releases energy, and changes shape when the surrounding pH changes — but it has no membrane, no internal compartments, and every copy is chemically identical with no possibility of heritable variation. Applying the seven characteristics of life, is it alive?',
    choices: [
      { text: 'No — it lacks cellular organisation and cannot show heritable variation, both required alongside the others', isCorrect: true },
      { text: 'Yes — reacting to pH and releasing energy are enough on their own', isCorrect: false },
      { text: 'Yes — any molecule that increases in number is, by definition, reproducing', isCorrect: false },
      { text: 'It cannot be decided without first knowing its exact chemical formula', isCorrect: false },
    ],
    correctValue: 'No, because it lacks cellular organisation and heritable variation',
    targetedMisconceptions: [],
    source: srcD1('bio.found.characteristics-of-life', 'a novel scenario (not fire, the concept’s own worked example) forcing the same "all characteristics together, not any one alone" rule to be applied rather than recalled from the mule/fire probes already on file'),
  },
  {
    conceptId: 'bio.found.classification-need', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Two newly described beetle species share 98% of their DNA sequence and can occasionally interbreed to produce hybrid offspring. Based on how the taxonomic hierarchy reflects degree of relatedness, at which rank would biologists most likely place them together?',
    choices: [
      { text: 'The same genus — very high sequence similarity plus occasional interbreeding indicates a very close, recent common ancestor', isCorrect: true },
      { text: 'The same kingdom only — that is as close as two separate species can be placed', isCorrect: false },
      { text: 'The same phylum only — interbreeding is irrelevant to taxonomic rank', isCorrect: false },
      { text: 'They cannot share any rank, because they are already two different species', isCorrect: false },
    ],
    correctValue: 'The same genus',
    targetedMisconceptions: [],
    source: srcD1('bio.found.classification-need', 'applies the explanation’s own Panthera lion/tiger hybridisation example as a general rule — shared ancestry predicts rank — to a new pair of organisms, distinct from the most-specific-rank mcq and the arbitrary-labelling misconception probe already on file'),
  },
  {
    conceptId: 'bio.found.binomial-nomenclature', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A paper first writes the species name in full as Panthera tigris, then later in the same paragraph refers to it as "P. tigris." Is this abbreviated form acceptable under binomial nomenclature convention?',
    choices: [
      { text: 'Yes — the genus may be abbreviated to its initial after the full name has already been used once, as long as it stays unambiguous', isCorrect: true },
      { text: 'No — the full genus name must always be spelled out every time', isCorrect: false },
      { text: 'No — only the species part of the name may ever be abbreviated', isCorrect: false },
      { text: 'Yes — both parts of the name may always be abbreviated after the first use', isCorrect: false },
    ],
    correctValue: 'Yes, the genus may be abbreviated to its initial after first full use',
    targetedMisconceptions: [],
    source: srcD1('bio.found.binomial-nomenclature', 'tests the genus-abbreviation convention the explanation states explicitly ("H. sapiens" on second use) as an application judgement, distinct from the capitalisation/italics-formatting mcq and the species-name-alone misconception probe already on file'),
  },
  {
    conceptId: 'bio.found.five-kingdom', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A newly found organism is unicellular, has a true nucleus, swims using a whip-like flagellum, and makes its own food using chlorophyll. Which kingdom best fits it?',
    choices: [
      { text: 'Protista — unicellular eukaryotes are grouped here regardless of their mode of nutrition', isCorrect: true },
      { text: 'Plantae — because it photosynthesises using chlorophyll', isCorrect: false },
      { text: 'Monera — because it is unicellular', isCorrect: false },
      { text: 'Fungi — because it has a true nucleus', isCorrect: false },
    ],
    correctValue: 'Protista',
    targetedMisconceptions: [],
    source: srcD1('bio.found.five-kingdom', 'applies the explanation’s own defining criteria (cell type + body organisation, not nutrition mode alone) to a new organism combining features that could mislead toward Plantae — distinct from the Monera-identification mcq and the fungi-are-plants misconception probe already on file'),
  },
  {
    conceptId: 'bio.found.microscopy-basics', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A researcher needs to see the fine folds of a mitochondrion’s inner membrane, which are only about 20–40 nanometres apart. Light microscopy’s resolution limit is about 200 nanometres. Which imaging approach can actually resolve these folds?',
    choices: [
      { text: 'Electron microscopy, because light microscopy’s ~200 nm resolution limit cannot separate structures only 20–40 nm apart, however much it is magnified', isCorrect: true },
      { text: 'A light microscope at higher magnification, since magnification alone determines what becomes visible', isCorrect: false },
      { text: 'A dissecting (stereo) microscope with a stronger stain', isCorrect: false },
      { text: 'Any light microscope — resolution only matters for whole cells, not organelle detail', isCorrect: false },
    ],
    correctValue: 'Electron microscopy',
    targetedMisconceptions: [],
    source: srcD1('bio.found.microscopy-basics', 'reuses the explanation’s own stated resolution figures (light ~200 nm, electron ~0.1 nm) as a quantitative reasoning check on a new structure (mitochondrial cristae) rather than the cell-membrane mcq or the doubled-magnification misconception probe already on file'),
  },
  {
    conceptId: 'bio.found.biomes-levels-of-organisation', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A biologist studies the temperature, rainfall, soil chemistry, and typical vegetation across the entire Amazon region, spanning several countries — not one particular forest patch, but the whole characteristic regional type. At which level of biological organisation is this biologist working?',
    choices: [
      { text: 'Biome — a major regional ecosystem type recognised across a wide geographic area', isCorrect: true },
      { text: 'Ecosystem — one community plus its local abiotic environment in a single place', isCorrect: false },
      { text: 'Community — all the species living together in one location', isCorrect: false },
      { text: 'Population — all the members of one species across the region', isCorrect: false },
    ],
    correctValue: 'Biome',
    targetedMisconceptions: [],
    source: srcD1('bio.found.biomes-levels-of-organisation', 'distinguishes biome from the already-tested community/ecosystem confusion by testing the biome vs. ecosystem scale distinction instead — a capability the existing community-identification mcq and population-vs-community misconception probe do not cover'),
  },
  {
    conceptId: 'bio.found.viruses-viroids-lichens', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A crusty growth on a rock turns out to be a fungus and a photosynthetic alga living together, each supplying something the other lacks. A student calls this "a type of virus, since viruses are simple too." Is the student correct?',
    choices: [
      { text: 'No — this is a lichen, a mutualistic symbiosis between a fungus and an alga (or cyanobacterium); structurally and functionally unrelated to a virus', isCorrect: true },
      { text: 'Yes — lichens are a type of virus that infects rock surfaces', isCorrect: false },
      { text: 'Yes — anything lacking a true cell nucleus must be classified as viral', isCorrect: false },
      { text: 'It could be either, since lichens and viruses are both described as "simple"', isCorrect: false },
    ],
    correctValue: 'No, it is a lichen, not a virus',
    targetedMisconceptions: [],
    source: srcD1('bio.found.viruses-viroids-lichens', 'directly applies the explanation’s own clarification that "lichens are not a virus at all — they are a mutualistic symbiosis" to a scenario distinguishing it from the capsid-composition mcq and the virus-reproduction misconception probe already on file'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// BATCH BIO-D2 — bio.cell (all 14 concepts) @ PROFICIENT, short_answer.
// 13 of 14 at gradeBand HIGH (matching the existing pair on each of those
// concepts); `bio.cell.apoptosis` alone is UNDERGRADUATE, matching ITS
// existing pair — the contract is per (conceptId, gradeBand), so the new
// probe must land in the same band the concept is actually served at.
// ═══════════════════════════════════════════════════════════════════════════

const BIO_D2: SeedProbe[] = [
  {
    conceptId: 'bio.cell.cell-theory', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A textbook claims cell theory is contradicted because viruses can multiply and spread without ever having arisen from a pre-existing cell. Is this a valid objection to cell theory?',
    choices: [
      { text: 'No — viruses are not cells, so cell theory (which only makes claims about cells) is neither confirmed nor contradicted by them', isCorrect: true },
      { text: 'Yes — any biological entity that multiplies must have arisen from a pre-existing cell', isCorrect: false },
      { text: 'No — because viral particles actually contain living cellular material of their own', isCorrect: false },
      { text: 'It cannot be decided until it is known whether the virus has a DNA or an RNA genome', isCorrect: false },
    ],
    correctValue: 'No — viruses are not cells, so cell theory makes no claim about them',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.cell-theory', 'directly applies the misconception_repair’s own aside — "viruses are not counter-examples — they are not cells and cell theory makes no claim about them" — to a scenario framed as a textbook objection, distinct from the Virchow-attribution mcq and the origin-of-life misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.prokaryotic-cell', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A bacterium that has never itself been exposed to a particular antibiotic becomes resistant to it after sharing a culture with resistant bacteria, with no new mutation detected anywhere in its own chromosome. What process most likely explains this?',
    choices: [
      { text: 'Horizontal gene transfer (e.g. conjugation) — a resistance gene carried on a plasmid moved from a resistant bacterium into this one', isCorrect: true },
      { text: 'The bacterium developed a nucleus that now shields it from the antibiotic', isCorrect: false },
      { text: 'Mitosis passed the resistance gene from a neighbouring cell into this one', isCorrect: false },
      { text: 'The bacterium’s 70S ribosomes spontaneously changed shape to block the antibiotic', isCorrect: false },
    ],
    correctValue: 'Horizontal gene transfer of a plasmid-borne resistance gene',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.prokaryotic-cell', 'applies the explanation’s own plasmid/horizontal-gene-transfer fact to an antibiotic-resistance scenario, a capability distinct from the nucleoid-identification mcq and the no-nucleus-means-no-DNA misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.eukaryotic-cell', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A cell keeps its digestive enzymes inside a membrane-bound compartment, separate from the rest of the cytoplasm, so they cannot damage the cell’s own proteins and DNA before they are needed. Which key advantage of eukaryotic cell organisation does this illustrate?',
    choices: [
      { text: 'Compartmentalisation — isolating specific chemical reactions in separate membrane-bound organelles allows more biochemical complexity without interference', isCorrect: true },
      { text: 'The absence of a cell wall, which lets enzymes move freely between organelles', isCorrect: false },
      { text: 'The presence of 70S ribosomes, which regulate when enzymes activate', isCorrect: false },
      { text: 'The lack of a nucleus, which frees up space for extra enzymes', isCorrect: false },
    ],
    correctValue: 'Compartmentalisation',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.eukaryotic-cell', 'applies the explanation’s own stated key advantage — compartmentalisation isolating interfering reactions — to a lysosome-shaped scenario, distinct from the plant-vs-animal organelle-naming mcq and the all-plant-cells-photosynthesise misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.cell-membrane-transport', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A large protein hormone must leave a cell, but it is far too big to fit through any channel or carrier protein in the membrane. Which mechanism moves it out?',
    choices: [
      { text: 'Exocytosis — the protein is packaged in a vesicle that fuses with the plasma membrane, releasing its contents outside the cell', isCorrect: true },
      { text: 'Facilitated diffusion through a channel protein', isCorrect: false },
      { text: 'Osmosis, since large molecules also follow water’s own concentration gradient', isCorrect: false },
      { text: 'Simple diffusion directly through the phospholipid bilayer', isCorrect: false },
    ],
    correctValue: 'Exocytosis',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.cell-membrane-transport', 'applies the explanation’s own bulk-cargo/vesicle transport fact to a protein-secretion scenario, distinct from the active-transport-definition mcq and the glucose-enters-by-osmosis misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.nucleus-chromosomes', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Just after S phase, a human cell has completed DNA replication but has not yet divided. How many total chromatids are present in this cell?',
    choices: [
      { text: '92 — each of the 46 chromosomes now has two sister chromatids', isCorrect: true },
      { text: '46 — the chromatid count stays the same regardless of replication', isCorrect: false },
      { text: '23 — replication halves the total count', isCorrect: false },
      { text: '184 — because both replication and division have already occurred', isCorrect: false },
    ],
    correctValue: '92',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.nucleus-chromosomes', 'applies the explanation’s own worked figure — "46 chromosomes, each with two chromatids, equals 92 chromatids total" — as a quantitative check, distinct from the centromere-naming mcq and the chromosome-always-has-two-chromatids misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.mitochondria-energy', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A biologist finds that mitochondria contain their own circular DNA and 70S ribosomes, resembling free-living bacteria more than the rest of the eukaryotic cell they live in. What does this evidence support?',
    choices: [
      { text: 'The endosymbiotic theory — mitochondria descended from free-living bacteria engulfed by an ancestral host cell', isCorrect: true },
      { text: 'The idea that mitochondria are simply a modified part of the nucleus', isCorrect: false },
      { text: 'The claim that mitochondria arose spontaneously within the cytoplasm with no evolutionary history', isCorrect: false },
      { text: 'The idea that every organelle in the cell contains its own independent DNA', isCorrect: false },
    ],
    correctValue: 'The endosymbiotic theory',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.mitochondria-energy', 'applies the explanation’s own endosymbiotic-theory evidence (own DNA, 70S ribosomes, binary fission) as an inference task, distinct from the Krebs-cycle-location mcq and the mitochondria-create-energy misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.chloroplast-structure', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A plant is placed in complete darkness but given plenty of CO2, and its chloroplasts still contain fully functional Calvin cycle enzymes. Will the plant continue producing glucose?',
    choices: [
      { text: 'No — without light, the light reactions cannot supply the ATP and NADPH the Calvin cycle needs, so net photosynthesis stops even though CO2 and the enzymes are present', isCorrect: true },
      { text: 'Yes — the Calvin cycle can run independently of light as long as CO2 and its enzymes are available', isCorrect: false },
      { text: 'Yes — in darkness the light reactions simply run in reverse to supply extra ATP', isCorrect: false },
      { text: 'No — because in darkness chloroplasts lose their Calvin cycle enzymes entirely', isCorrect: false },
    ],
    correctValue: 'No, because the Calvin cycle depends on ATP and NADPH from the light reactions',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.chloroplast-structure', 'applies the explanation’s own dependency fact — "cannot run them without the ATP and NADPH supplied by the light reactions... net photosynthesis is zero in complete darkness" — to a scenario testing light/dark-reaction coupling, distinct from the thylakoid-location mcq and the oxygen-source misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.endomembrane-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A cell’s lysosomes fail to produce enough acid hydrolase enzymes, so material delivered to them cannot be broken down. Which endomembrane-system process is most directly disrupted?',
    choices: [
      { text: 'Intracellular digestion — lysosomes normally break down delivered material using acid hydrolases, so material accumulates undigested without enough enzyme', isCorrect: true },
      { text: 'Protein synthesis on the rough ER, since lysosomes make all of a cell’s ribosomal proteins', isCorrect: false },
      { text: 'Turgor pressure maintenance, which is a role only the Golgi apparatus performs', isCorrect: false },
      { text: 'Chemical detoxification, which is exclusively a lysosome function', isCorrect: false },
    ],
    correctValue: 'Intracellular digestion',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.endomembrane-system', 'applies the explanation’s own lysosome/acid-hydrolase function to an enzyme-deficiency scenario, distinct from the Golgi-sorting mcq and the all-proteins-made-on-rough-ER misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.cytoskeleton', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A vesicle loaded with cargo must travel from one end of a large neuron to the other — far too great a distance for simple diffusion. Which cytoskeletal system, combined with which kind of protein, moves it there?',
    choices: [
      { text: 'Microtubules, with motor proteins like kinesin or dynein walking along them using ATP', isCorrect: true },
      { text: 'Microfilaments (actin), moved passively by osmosis', isCorrect: false },
      { text: 'Intermediate filaments, actively transporting vesicles using GTP', isCorrect: false },
      { text: 'The nuclear lamina, forming transport channels through the cytoplasm', isCorrect: false },
    ],
    correctValue: 'Microtubules with motor proteins (kinesin/dynein)',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.cytoskeleton', 'applies the explanation’s own motor-protein/microtubule-transport fact to a long-distance vesicle-transport scenario, distinct from the spindle-fibre-identification mcq and the cytoskeleton-is-rigid misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.cell-signalling', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A damaged cell releases a growth factor that affects only neighbouring cells in the same tissue, without ever entering the bloodstream. Which type of cell signalling is this?',
    choices: [
      { text: 'Paracrine signalling — a local signal that affects nearby cells without travelling through the blood', isCorrect: true },
      { text: 'Endocrine signalling — hormones must always travel through the bloodstream to reach any target', isCorrect: false },
      { text: 'Autocrine signalling — the cell would have to be signalling only to itself', isCorrect: false },
      { text: 'Synaptic signalling — this term applies exclusively to communication between neurons', isCorrect: false },
    ],
    correctValue: 'Paracrine signalling',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.cell-signalling', 'applies the explanation’s own endocrine/paracrine/autocrine/synaptic typology to a local-signal scenario, distinct from the insulin-surface-receptor mcq and the steroid-vs-protein-hormone-permeability misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.cell-cycle', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A cell has damaged DNA, but a mutation has disabled its p53 tumour-suppressor protein, so the G1/S checkpoint fails to detect the damage. What is the most likely consequence?',
    choices: [
      { text: 'The cell proceeds to replicate its damaged DNA and divide, potentially passing mutations to daughter cells — a step toward cancer', isCorrect: true },
      { text: 'The cell will automatically repair its DNA in G2 regardless of checkpoint function', isCorrect: false },
      { text: 'The cell cycle will simply skip S phase entirely and proceed straight to mitosis', isCorrect: false },
      { text: 'The cell will remain permanently arrested in metaphase until the damage is fixed', isCorrect: false },
    ],
    correctValue: 'The cell divides with damaged DNA, risking cancer',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.cell-cycle', 'applies the explanation’s own checkpoint/p53/cancer fact to a checkpoint-failure scenario, distinct from the S-phase-timing mcq and the interphase-is-resting misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.mitosis', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'After a skin wound, new skin cells appear that are genetically identical to the surrounding tissue and rapidly restore the injured area. Which process produced these cells, and why is genetic identity expected here?',
    choices: [
      { text: 'Mitosis — it produces daughter cells genetically identical to the parent cell, exactly matched for tissue repair', isCorrect: true },
      { text: 'Meiosis — cell division for repair always halves the chromosome number first', isCorrect: false },
      { text: 'Apoptosis — programmed cell death is what generates new replacement cells', isCorrect: false },
      { text: 'Cytokinesis alone, without any prior nuclear division', isCorrect: false },
    ],
    correctValue: 'Mitosis',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.mitosis', 'applies the explanation’s own growth-and-repair purpose of mitosis to a wound-healing scenario, using meiosis/apoptosis as sibling-concept distractors, distinct from the anaphase-identification mcq and the chromosome-number-halved misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.meiosis', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Two siblings share the same parents, yet each received a different combination of maternal and paternal chromosomes, contributing to why siblings are not identical. Which specific meiotic event is chiefly responsible for this chromosome-combination variation, as opposed to the variation crossing over produces?',
    choices: [
      { text: 'Independent assortment — how each pair of homologous chromosomes lines up and separates is independent of every other pair, generating many different combinations', isCorrect: true },
      { text: 'Crossing over — the exchange of DNA segments between homologs is the only source of this variation', isCorrect: false },
      { text: 'DNA replication during meiosis I, since replication itself scrambles which chromosome goes to which cell', isCorrect: false },
      { text: 'Meiosis II’s equational division, since that is what actually separates homologous chromosomes', isCorrect: false },
    ],
    correctValue: 'Independent assortment',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.meiosis', 'applies the explanation’s own independent-assortment/2^23-combinations fact as a variation-source distinction task, distinct from the crossing-over mcq and the meiosis-I-chromatid-count misconception probe already on file'),
  },
  {
    conceptId: 'bio.cell.apoptosis', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A cell is severely damaged by physical trauma, ruptures uncontrolled, and spills its contents into the surrounding tissue, triggering local inflammation. Is this apoptosis?',
    choices: [
      { text: 'No — this describes necrosis, an uncontrolled and harmful form of cell death; apoptosis is an orderly, self-contained process that does not trigger inflammation', isCorrect: true },
      { text: 'Yes — any form of cell death, controlled or not, counts as apoptosis', isCorrect: false },
      { text: 'Yes — inflammation is a normal and expected part of apoptosis', isCorrect: false },
      { text: 'No — because apoptosis only occurs during embryonic development, never in adult tissue', isCorrect: false },
    ],
    correctValue: 'No, this is necrosis, not apoptosis',
    targetedMisconceptions: [],
    source: srcD2('bio.cell.apoptosis', 'applies the explanation’s own necrosis-vs-apoptosis contrast — "the harmful form of cell death is necrosis — accidental rupture that spills contents and causes inflammation" — to a discrimination scenario, distinct from the intrinsic-pathway/cytochrome-c mcq and the apoptosis-is-always-harmful misconception probe already on file. Note: this concept’s gradeBand is UNDERGRADUATE (unlike the other 13 bio.cell concepts, which are HIGH), matching its existing pair exactly.'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// BATCH BIO-D3 — bio.mol (all 14 concepts) @ PROFICIENT, short_answer.
// 8 of 14 at gradeBand HIGH (biomolecule-types, carbohydrates-lipids,
// proteins-structure, nucleic-acid-structure, enzymes, dna-replication,
// transcription, translation-genetic-code); 6 at UNDERGRADUATE
// (gene-regulation, epigenetics, noncoding-rna, signal-transduction-
// pathways, dna-damage-repair, bioenergetics) — matching each concept's
// own existing pair exactly, per the same per-(concept, gradeBand) rule
// established in Batch 2.
// ═══════════════════════════════════════════════════════════════════════════

const BIO_D3: SeedProbe[] = [
  {
    conceptId: 'bio.mol.biomolecule-types', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A biochemist finds an unknown biomolecule containing carbon, hydrogen, oxygen, nitrogen, and phosphorus, but no sulfur. Based on elemental composition alone, which class of biomolecule is this most likely to be?',
    choices: [
      { text: 'Nucleic acid — nitrogen and phosphorus together are characteristic of nucleotides’ bases and phosphate groups', isCorrect: true },
      { text: 'Protein — proteins are defined by containing nitrogen and phosphorus together', isCorrect: false },
      { text: 'Carbohydrate — carbohydrates always include nitrogen from their monomer bonds', isCorrect: false },
      { text: 'Lipid — lipids are identified by phosphorus content alone', isCorrect: false },
    ],
    correctValue: 'Nucleic acid',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.biomolecule-types', 'applies the explanation’s own elemental-composition distinctions (proteins add N and S; nucleic acids add N and P) as an inference task, distinct from the nucleic-acid-function mcq and the lipids-are-just-energy-storage misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.carbohydrates-lipids', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Cholesterol (a four-ring steroid) and a triglyceride (three fatty acids plus glycerol) look structurally nothing alike, yet both are classified as lipids. What is the actual basis for grouping them together?',
    choices: [
      { text: 'Both are hydrophobic — lipids are defined by insolubility in water, not by sharing one chemical structure', isCorrect: true },
      { text: 'Both are polymers built from repeating glucose monomers', isCorrect: false },
      { text: 'Both contain nitrogen and phosphorus in their core structure', isCorrect: false },
      { text: 'Both are found only in plant cell membranes', isCorrect: false },
    ],
    correctValue: 'Both are hydrophobic',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.carbohydrates-lipids', 'applies the explanation’s own stated defining criterion for lipids ("defined by being hydrophobic, not by having a common chemical structure") to a cholesterol-vs-triglyceride contrast, distinct from the cellulose-identification mcq and the starch-vs-cellulose-digestibility misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.proteins-structure', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Haemoglobin is fully functional only when four separate polypeptide chains associate together; a single isolated chain cannot carry oxygen the same way. Which level of protein structure does this describe?',
    choices: [
      { text: 'Quaternary structure — two or more polypeptide chains assembling together', isCorrect: true },
      { text: 'Primary structure — the amino acid sequence of each individual chain', isCorrect: false },
      { text: 'Secondary structure — the alpha-helix and beta-sheet folding within one chain', isCorrect: false },
      { text: 'Tertiary structure — the 3D fold of a single polypeptide chain alone', isCorrect: false },
    ],
    correctValue: 'Quaternary structure',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.proteins-structure', 'applies the explanation’s own haemoglobin example of quaternary structure as an identification task, distinct from the primary-structure-definition mcq and the denaturation-destroys-sequence misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.nucleic-acid-structure', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A sample of double-stranded DNA is found to be 22% adenine. Using Chargaff’s rules, what percentage of the DNA is guanine?',
    choices: [
      { text: '28% — %A = %T = 22% each, so %G + %C = 56%, split equally between G and C', isCorrect: true },
      { text: '22% — all four bases must be present in equal amounts', isCorrect: false },
      { text: '44% — guanine is simply the complement of adenine’s percentage', isCorrect: false },
      { text: 'Cannot be determined from adenine’s percentage alone', isCorrect: false },
    ],
    correctValue: '28%',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.nucleic-acid-structure', 'applies the explanation’s own stated Chargaff’s rules (%A=%T, %G=%C) as a quantitative reasoning task, distinct from the base-pairing mcq and the antiparallel-strands misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.enzymes', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Pepsin (a stomach enzyme) works well at pH 2, but pepsin-like activity nearly stops at pH 7, even though the enzyme molecule itself is still intact and not denatured at pH 7. What best explains this?',
    choices: [
      { text: 'Each enzyme has an optimum pH shaped by its active site chemistry; away from that optimum, catalytic efficiency drops even without denaturation', isCorrect: true },
      { text: 'All enzymes require exactly pH 7 to function, and pepsin is a rare exception', isCorrect: false },
      { text: 'pH cannot affect enzyme activity unless it causes permanent denaturation', isCorrect: false },
      { text: 'Pepsin requires pH 2 because that is when it is manufactured, not because of its active site', isCorrect: false },
    ],
    correctValue: 'Each enzyme has its own pH optimum, independent of denaturation',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.enzymes', 'applies the explanation’s own stated pH-optimum fact (pepsin at pH 2, trypsin at pH 8) to a non-denaturation activity-loss scenario, distinct from the competitive-vs-non-competitive-inhibition mcq and the enzymes-are-consumed misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.dna-replication', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'DNA polymerase can only synthesise new DNA in the 5′→3′ direction, but the double helix has two antiparallel template strands. What is the direct consequence of this for how the two new strands are made at a replication fork?',
    choices: [
      { text: 'One new strand (leading) is synthesised continuously, while the other (lagging) is made in short Okazaki fragments later joined by ligase', isCorrect: true },
      { text: 'Both new strands are synthesised continuously in the same direction, since polymerase reads both templates identically', isCorrect: false },
      { text: 'One strand is made entirely by DNA polymerase and the other entirely by RNA primase', isCorrect: false },
      { text: 'The lagging strand is simply not synthesised until after cell division', isCorrect: false },
    ],
    correctValue: 'Leading strand continuous; lagging strand in Okazaki fragments',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.dna-replication', 'applies the explanation’s own stated leading/lagging-strand mechanism as a causal-reasoning task, distinct from the RNA-primer-necessity mcq and the semi-conservative-replication misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.transcription', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A coding (sense) DNA strand reads 5′-ATG CGA TTC-3′. What is the sequence of the mRNA transcribed from the template strand paired with it, written 5′→3′?',
    choices: [
      { text: '5′-AUG CGA UUC-3′ — the mRNA matches the coding strand’s sequence, with U replacing T', isCorrect: true },
      { text: '5′-TAC GCT AAG-3′ — the mRNA is the exact complement of the coding strand, keeping thymine', isCorrect: false },
      { text: '5′-CUU AGC GUA-3′ — the mRNA is the coding strand read backward', isCorrect: false },
      { text: '5′-ATG CGA TTC-3′ — the mRNA is identical to the coding DNA strand, including thymine', isCorrect: false },
    ],
    correctValue: '5′-AUG CGA UUC-3′',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.transcription', 'applies the explanation’s own stated coding-strand/mRNA sequence-identity fact to a worked sequence example, distinct from the mRNA-processing mcq and the which-strand-is-read misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.translation-genetic-code', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A single extra nucleotide is accidentally inserted near the start of an mRNA’s coding sequence, and no stop codon is created immediately. Given that the genetic code is read as non-overlapping triplets, what is the most likely consequence for the resulting protein?',
    choices: [
      { text: 'Every codon downstream of the insertion is shifted into a new reading frame, almost certainly producing a completely different, likely non-functional amino acid sequence', isCorrect: true },
      { text: 'Only the single inserted nucleotide’s codon is affected; every codon downstream still reads normally', isCorrect: false },
      { text: 'The ribosome automatically skips the extra nucleotide and reads the original frame correctly', isCorrect: false },
      { text: 'Because the code is degenerate, the extra nucleotide has no effect on the protein produced', isCorrect: false },
    ],
    correctValue: 'A frameshift, disrupting every downstream codon',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.translation-genetic-code', 'applies the explanation’s own stated non-overlapping-triplet-reading property to a frameshift-insertion scenario, distinct from the stop-codon/termination mcq and the degenerate-code misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.gene-regulation', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A regulatory DNA sequence that increases transcription of a target gene is found 50,000 base pairs away from that gene, on the same chromosome. What kind of regulatory element does this best describe, and how can it act at such a distance?',
    choices: [
      { text: 'An enhancer — it can act at a distance because the DNA loops so the enhancer physically contacts the gene’s promoter region despite the large linear distance', isCorrect: true },
      { text: 'A promoter — promoters are commonly found tens of thousands of base pairs from their gene', isCorrect: false },
      { text: 'This cannot be a real regulatory element, since regulation only works on immediately adjacent DNA', isCorrect: false },
      { text: 'An intron located far from a gene, regulating its transcription level', isCorrect: false },
    ],
    correctValue: 'An enhancer, acting via chromatin looping',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.gene-regulation', 'applies the explanation’s own stated long-range-enhancer fact ("enhancers can be thousands of base pairs away... looping physically close") to an identification task, distinct from the lac-operon mcq and the epigenetics-changes-DNA-sequence misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.epigenetics', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A researcher claims that a mother’s high-stress diet during pregnancy will permanently and reliably reprogram her grandchildren’s gene expression, based on epigenetic inheritance. Is this claim well supported by current evidence in mammals?',
    choices: [
      { text: 'No — most epigenetic marks are erased during gametogenesis and embryogenesis, so reliable multi-generational epigenetic inheritance in mammals is limited, not a permanent guarantee', isCorrect: true },
      { text: 'Yes — epigenetic marks are never removed once established, so environmental effects reliably pass to every future generation', isCorrect: false },
      { text: 'No — epigenetic marks have no effect on gene expression at all, in any generation', isCorrect: false },
      { text: 'Yes — this is the well-established, universally accepted mechanism for all inherited traits in mammals', isCorrect: false },
    ],
    correctValue: 'No — transgenerational epigenetic inheritance is real but limited in mammals',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.epigenetics', 'applies the explanation’s own stated limit on transgenerational inheritance ("most marks are erased during gametogenesis and embryogenesis") to a claim-evaluation task, distinct from the methylation-silencing mcq and the liver-vs-neuron misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.noncoding-rna', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'In female mammals, one of the two X chromosomes in each cell is transcriptionally silenced by a long non-coding RNA that coats the chromosome. Which class of ncRNA is responsible for this X-chromosome inactivation, and does this fit the outdated "junk DNA" framing?',
    choices: [
      { text: 'lncRNA (e.g. Xist) — this is a clear functional role for non-coding RNA, directly contradicting the "junk DNA" framing', isCorrect: true },
      { text: 'tRNA — transfer RNAs are responsible for silencing entire chromosomes', isCorrect: false },
      { text: 'rRNA — ribosomal RNA physically binds and silences the X chromosome', isCorrect: false },
      { text: 'This confirms non-coding RNA is functionless "junk," since no protein is produced', isCorrect: false },
    ],
    correctValue: 'lncRNA (Xist), contradicting the junk-DNA framing',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.noncoding-rna', 'applies the explanation’s own named example (lncRNAs, "including X-chromosome inactivation via Xist") to an identification-plus-interpretation task, distinct from the miRNA-mechanism mcq and the junk-DNA misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.signal-transduction-pathways', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A single extracellular growth factor molecule binds one receptor tyrosine kinase on a cell surface, yet within minutes thousands of intracellular protein molecules become activated in response. What property of signal transduction explains this large numerical mismatch?',
    choices: [
      { text: 'Signal amplification — each step of the intracellular relay (e.g. the Ras/MAP kinase cascade) can activate many downstream molecules, multiplying the effect of one initial binding event', isCorrect: true },
      { text: 'The growth factor itself physically splits into thousands of copies once inside the cell', isCorrect: false },
      { text: 'Thousands of receptors must have been activated simultaneously for this response to occur', isCorrect: false },
      { text: 'This is not possible; signal transduction produces a strictly one-to-one response ratio', isCorrect: false },
    ],
    correctValue: 'Signal amplification through the relay cascade',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.signal-transduction-pathways', 'applies the explanation’s own stated amplification fact ("one receptor can activate thousands of downstream molecules") as a quantitative-reasoning task, distinct from the first-messenger-identification mcq and the insulin-crosses-membrane misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.dna-damage-repair', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A patient with Lynch syndrome has an inherited mutation in MLH1, a gene involved in correcting errors introduced during DNA replication, rather than in genes that repair double-strand breaks. Which DNA repair pathway is most directly disrupted?',
    choices: [
      { text: 'Mismatch repair (MMR) — MLH1 corrects replication errors, distinct from the double-strand break pathways (HR/NHEJ) disrupted in BRCA1/2 carriers', isCorrect: true },
      { text: 'Homologous recombination (HR) — the same pathway disrupted in BRCA1/2 carriers', isCorrect: false },
      { text: 'Nucleotide excision repair (NER) — the pathway for UV-induced thymine dimers', isCorrect: false },
      { text: 'Non-homologous end joining (NHEJ) — the pathway for double-strand breaks', isCorrect: false },
    ],
    correctValue: 'Mismatch repair (MMR)',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.dna-damage-repair', 'applies the explanation’s own stated MLH1/MSH2-mismatch-repair/Lynch-syndrome fact to a pathway-discrimination task distinguishing it from BRCA1/2’s own HR pathway, distinct from the thymine-dimer-repair mcq and the BRCA-without-exposure misconception probe already on file'),
  },
  {
    conceptId: 'bio.mol.bioenergetics', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A cell needs to run a reaction with ΔG = +20 kJ/mol (non-spontaneous on its own) to build a large molecule. The cell couples this reaction to ATP hydrolysis (ΔG = −30.5 kJ/mol) in the same pathway. What is the outcome, and why?',
    choices: [
      { text: 'The combined reaction becomes spontaneous overall, since the net ΔG (+20 + (−30.5) = −10.5 kJ/mol) is negative — this is coupling, not a violation of thermodynamics', isCorrect: true },
      { text: 'The reaction remains non-spontaneous, since ATP hydrolysis cannot influence an unrelated reaction’s spontaneity', isCorrect: false },
      { text: 'Coupling makes the endergonic reaction’s own ΔG become negative on its own, independent of ATP', isCorrect: false },
      { text: 'This combination violates the first law of thermodynamics by creating energy', isCorrect: false },
    ],
    correctValue: 'The coupled reaction is spontaneous overall (net ΔG < 0)',
    targetedMisconceptions: [],
    source: srcD3('bio.mol.bioenergetics', 'applies the explanation’s own stated coupled-reaction mechanism to a worked ΔG arithmetic example, distinct from the spontaneity-condition mcq and the life-violates-entropy misconception probe already on file'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// BATCH BIO-D4 — bio.physio (all 8 concepts) @ HIGH, PROFICIENT, short_answer
// ═══════════════════════════════════════════════════════════════════════════

const BIO_D4: SeedProbe[] = [
  {
    conceptId: 'bio.physio.respiratory-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A person exhales air containing 16% oxygen, while the air they inhaled contained 21% oxygen. Does this mean their body used up nearly all the inhaled oxygen?',
    choices: [
      { text: 'No — the drop from 21% to 16% shows only some oxygen was absorbed by the blood; most of the inhaled oxygen is still present in exhaled air', isCorrect: true },
      { text: 'Yes — a 5 percentage-point drop means the body consumed almost all available oxygen', isCorrect: false },
      { text: 'No — the oxygen percentage doesn’t actually change during breathing; the measurement must be an error', isCorrect: false },
      { text: 'Yes — healthy exhaled air normally contains 0% oxygen', isCorrect: false },
    ],
    correctValue: 'No, most of the inhaled oxygen remains in exhaled air',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.respiratory-system', 'applies the explanation’s own stated exhaled/inhaled oxygen percentages (21% vs 16%) as a quantitative reasoning check, distinct from the alveoli-structure mcq and the diaphragm/pressure misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.circulatory-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Blood in the renal vein is oxygenated (having already passed through systemic circulation) and flows toward the heart. Is "renal vein" classified as a vein because of its oxygen content, or something else?',
    choices: [
      { text: 'Because it carries blood TOWARD the heart — vein classification depends on direction of flow, not oxygen content', isCorrect: true },
      { text: 'Because it carries oxygenated blood — veins are defined by carrying oxygenated blood', isCorrect: false },
      { text: 'Because it has thick muscular walls — vein classification depends on wall thickness', isCorrect: false },
      { text: 'Because it lacks valves — arteries have valves and veins do not', isCorrect: false },
    ],
    correctValue: 'Direction of flow (toward the heart), not oxygen content',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.circulatory-system', 'applies the explanation’s own stated direction-not-oxygen-content classification rule to a vessel example (renal vein) beyond the pulmonary-artery case already tested, distinct from the pulmonary-artery mcq and the four-chambers misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.immune-system-intro', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A person cuts their finger. Within minutes, the area becomes red, warm, and swollen as phagocytes are recruited to the site — well before any pathogen-specific antibodies could be produced. Which type of immune response is this, and is it a sign something has gone wrong?',
    choices: [
      { text: 'Innate immunity (acute inflammation) — a fast, non-specific, protective first response, not a sign of a problem', isCorrect: true },
      { text: 'Adaptive immunity — a slow, pathogen-specific antibody response that can occur within minutes', isCorrect: false },
      { text: 'This is chronic inflammation, an unhealthy response that should be treated with antibiotics', isCorrect: false },
      { text: 'This means the innate immune system has failed and adaptive immunity must now compensate', isCorrect: false },
    ],
    correctValue: 'Innate immunity, acute inflammation — a normal protective response',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.immune-system-intro', 'applies the explanation’s own innate-vs-adaptive speed distinction and the misconception_repair’s own acute-vs-chronic-inflammation clarification jointly, distinct from the memory-cells/vaccine mcq and the antibiotics-for-viruses misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.digestive-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Bacteria in the large intestine produce vitamin K and some B vitamins. Does this mean the large intestine performs chemical digestion of food?',
    choices: [
      { text: 'No — vitamin production by gut bacteria is a separate process from digestion; the large intestine’s main roles are water and mineral reabsorption, and no significant food digestion occurs there', isCorrect: true },
      { text: 'Yes — vitamin production is itself a form of chemical digestion of food molecules', isCorrect: false },
      { text: 'No — the large intestine performs no biological processes at all, only stores waste', isCorrect: false },
      { text: 'Yes — bacteria digest the vitamins found in food, which is why they are located there', isCorrect: false },
    ],
    correctValue: 'No, vitamin production is separate from digestion',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.digestive-system', 'applies the explanation’s own stated large-intestine role (water/mineral reabsorption, vitamin production by bacteria, no significant digestion) to a discrimination task, distinct from the bile-emulsification mcq and the absorption-location misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.nervous-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A nerve impulse travels rapidly down an axon as an electrochemical wave. When it reaches a synapse, how does the signal cross the gap to the next neuron?',
    choices: [
      { text: 'The electrical signal triggers release of a chemical neurotransmitter, which crosses the gap and triggers a new electrical signal in the next neuron', isCorrect: true },
      { text: 'Electrons jump directly across the synaptic gap, continuing the same electrical current', isCorrect: false },
      { text: 'The action potential itself physically passes through the gap unchanged', isCorrect: false },
      { text: 'Na⁺ ions flow directly from one neuron’s axon into the next neuron’s dendrite across the gap', isCorrect: false },
    ],
    correctValue: 'Electrical signal converts to chemical neurotransmitter, then back to electrical',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.nervous-system', 'applies the explanation’s own stated synaptic electrical-to-chemical-to-electrical conversion to an identification task, distinct from the depolarisation-cause mcq and the stimulus-strength/impulse-size misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.endocrine-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'The hypothalamus, a region of the brain, produces hormones (such as ADH and oxytocin) and controls the pituitary gland via releasing hormones. What does this demonstrate about the relationship between the nervous and endocrine systems?',
    choices: [
      { text: 'The two systems are interlinked, not independent — the hypothalamus is nervous tissue that directly produces and controls hormones, forming a neuroendocrine system', isCorrect: true },
      { text: 'The nervous system and endocrine system operate on completely separate organs with no interaction', isCorrect: false },
      { text: 'The pituitary gland is actually part of the nervous system, not the endocrine system', isCorrect: false },
      { text: 'Hormones are a type of electrical signal identical to nerve impulses', isCorrect: false },
    ],
    correctValue: 'They form one interlinked neuroendocrine system',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.endocrine-system', 'applies the explanation’s own stated hypothalamus-as-bridge fact ("the nervous and endocrine systems are... complementary and interlinked") to an inference task, distinct from the insulin-release mcq and the insulin-destroys-glucose misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.excretory-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A person with poorly controlled diabetes has glucose in their urine, even though their kidneys’ filtration and reabsorption machinery is functioning normally. What does this reveal about kidney filtration?',
    choices: [
      { text: 'Filtration itself is non-selective for small molecules — glucose is always filtered along with urea; when blood glucose is very high, it exceeds the tubule’s maximum reabsorption capacity, so some glucose is not reabsorbed and appears in urine', isCorrect: true },
      { text: 'High blood glucose causes the glomerulus to become more selective, filtering only excess glucose', isCorrect: false },
      { text: 'Diabetes causes the kidney to intentionally filter glucose into urine as a protective mechanism', isCorrect: false },
      { text: 'Glucose in urine means the kidneys have stopped functioning entirely', isCorrect: false },
    ],
    correctValue: 'Filtration is non-selective; reabsorption capacity is exceeded',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.excretory-system', 'applies the explanation’s own stated ultrafiltration-non-selectivity/reabsorption-maximum fact ("in diabetes, blood glucose exceeds the reabsorption maximum, so glucose spills into urine") to a diagnostic-reasoning task, distinct from the glucose-absence-in-healthy-urine mcq and the sweating-as-excretion misconception probe already on file'),
  },
  {
    conceptId: 'bio.physio.musculoskeletal-system', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Astronauts in microgravity experience significant bone density loss over months in space, despite eating a calcium-rich diet. Based on how bone remodelling works, what is the most likely explanation?',
    choices: [
      { text: 'Reduced mechanical stress on bones in microgravity shifts the balance toward osteoclast (breakdown) activity over osteoblast (building) activity, so bone is broken down faster than it is rebuilt', isCorrect: true },
      { text: 'Bone is a non-living, inert structural material, so it cannot lose density regardless of environment', isCorrect: false },
      { text: 'Microgravity directly dissolves calcium phosphate out of bone through a chemical reaction', isCorrect: false },
      { text: 'A calcium-rich diet has no effect on bone density under any circumstances', isCorrect: false },
    ],
    correctValue: 'Reduced mechanical stress shifts remodelling toward net bone loss',
    targetedMisconceptions: [],
    source: srcD4('bio.physio.musculoskeletal-system', 'applies the explanation’s own stated bone-remodelling/Wolff’s-law fact ("stress stimulates bone deposition") in reverse, to a microgravity scenario, distinct from the sliding-filament mcq and the single-muscle-flex-and-extend misconception probe already on file'),
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// BATCH BIO-D5 — bio.gen (all 8 concepts) @ PROFICIENT, short_answer.
// 5 of 8 at gradeBand HIGH (mendelian-genetics, gene-interactions,
// chromosomal-theory-linkage, pedigree-human-genetics, mutations); 3 at
// UNDERGRADUATE (population-genetics, genetic-engineering,
// transposable-elements) — matching each concept's own existing pair
// exactly, per the same per-(concept, gradeBand) rule established in
// Batch 2.
// ═══════════════════════════════════════════════════════════════════════════

const BIO_D5: SeedProbe[] = [
  {
    conceptId: 'bio.gen.mendelian-genetics', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A pea plant heterozygous for both seed shape (Rr, round dominant) and seed colour (Yy, yellow dominant) is self-pollinated (RrYy × RrYy). Assuming independent assortment, what fraction of the offspring are expected to be round AND yellow?',
    choices: [
      { text: '9/16 — the dihybrid ratio 9:3:3:1 gives 9/16 showing both dominant phenotypes together', isCorrect: true },
      { text: '3/4 — the same fraction as a single Rr × Rr cross, since colour does not affect shape', isCorrect: false },
      { text: '1/2 — half of all offspring inherit at least one dominant allele of each gene', isCorrect: false },
      { text: '1/16 — only the doubly homozygous dominant genotype counts as round and yellow', isCorrect: false },
    ],
    correctValue: '9/16',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.mendelian-genetics', 'extends the explanation’s own stated Law of Independent Assortment from the single-trait 3:1 monohybrid ratio already tested to a two-trait dihybrid cross, distinct from the Tt×Tt monohybrid-ratio mcq and the dominant-means-common misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.gene-interactions', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'In Labrador retrievers, coat colour depends on two genes: the B locus (B=black, b=brown) and the E locus (E=pigment deposited, e=no pigment deposited, giving yellow regardless of the B genotype). A dog has the genotype bbee. What colour will it be, and why does its B-locus genotype not determine the outcome?',
    choices: [
      { text: 'Yellow — being ee at the epistatic E locus blocks pigment deposition entirely, masking whatever the B locus would otherwise produce', isCorrect: true },
      { text: 'Brown — the bb genotype always determines coat colour regardless of the E locus', isCorrect: false },
      { text: 'Black — E and B loci combine their effects additively, so ee cancels out to the dominant colour', isCorrect: false },
      { text: 'This genotype is impossible, since a dog cannot be homozygous recessive at two loci at once', isCorrect: false },
    ],
    correctValue: 'Yellow, because ee at the epistatic locus masks the B locus',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.gene-interactions', 'applies the explanation’s own stated epistasis example (Labrador coat colour, E locus masking B locus) as a genotype-to-phenotype inference task, distinct from the AB-blood-type/codominance mcq and the identical-twins-differ/reaction-norm misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.chromosomal-theory-linkage', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Two genes are mapped 12 centimorgans apart on the same chromosome. Based on how genetic map distance relates to crossing-over frequency, what percentage of offspring would be expected to show a recombinant (non-parental) combination of these two genes?',
    choices: [
      { text: '12% — one centimorgan is defined as a 1% recombination frequency, so 12 map units apart predicts about 12% recombinants', isCorrect: true },
      { text: '0% — genes on the same chromosome are always inherited together with no exceptions', isCorrect: false },
      { text: '50% — any two linked genes recombine exactly as often as unlinked genes', isCorrect: false },
      { text: '88% — map distance is inversely proportional to recombination frequency', isCorrect: false },
    ],
    correctValue: '12%',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.chromosomal-theory-linkage', 'applies the explanation’s own stated centimorgan/recombination-frequency relationship (from Morgan’s crossing-over work) as a quantitative reasoning task, distinct from the X-linked-recessive-haemophilia mcq and this concept’s existing misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.pedigree-human-genetics', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'In a pedigree, two unaffected parents (each a carrier) have one child affected by an autosomal recessive disorder. What is the probability that their next child will also be affected?',
    choices: [
      { text: '1/4 — both parents are Aa carriers, so a Punnett square gives a 1/4 chance of aa regardless of the previous child’s outcome', isCorrect: true },
      { text: '0 — since one child is already affected, the recessive allele has been "used up" and cannot appear again', isCorrect: false },
      { text: '1/2 — having one affected child makes each subsequent child equally likely to be affected or a carrier', isCorrect: false },
      { text: '3/4 — most children of two carriers are expected to be affected', isCorrect: false },
    ],
    correctValue: '1/4',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.pedigree-human-genetics', 'applies the explanation’s own stated carrier-cross probability rules to a fresh autosomal-recessive probability calculation independent of any earlier birth, distinct from the X-linked-recessive-father/daughters-carriers mcq and the autosomal-dominant-every-generation misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.mutations', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A karyotype shows an individual with three copies of chromosome 21 instead of the usual two. Which category of mutation does this fall under, and what is this specific condition called?',
    choices: [
      { text: 'A chromosomal mutation — specifically aneuploidy (trisomy 21), causing Down syndrome', isCorrect: true },
      { text: 'A gene (point) mutation — specifically a substitution affecting chromosome 21', isCorrect: false },
      { text: 'A frameshift mutation caused by insertion of extra genetic material', isCorrect: false },
      { text: 'This is not a mutation at all, since no DNA sequence has changed', isCorrect: false },
    ],
    correctValue: 'A chromosomal mutation (aneuploidy) — trisomy 21, Down syndrome',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.mutations', 'applies the explanation’s own stated aneuploidy/trisomy examples (Down, Turner, Klinefelter syndromes) as a classification task distinguishing chromosomal from gene-level mutations, distinct from the single-nucleotide-insertion-frameshift mcq and the most-mutations-are-neutral misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.population-genetics', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A population of 20 individuals is nearly wiped out by a natural disaster, leaving only 2 survivors whose allele frequencies happen to differ greatly, purely by chance, from the original population. Which evolutionary force does this scenario illustrate?',
    choices: [
      { text: 'Genetic drift (a bottleneck effect) — a random, chance-driven shift in allele frequencies, most powerful in small populations', isCorrect: true },
      { text: 'Natural selection — the survivors must have been better adapted than those who died', isCorrect: false },
      { text: 'Gene flow — new alleles have migrated into the population from elsewhere', isCorrect: false },
      { text: 'Mutation — the disaster directly caused new mutations in the two survivors', isCorrect: false },
    ],
    correctValue: 'Genetic drift (bottleneck effect)',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.population-genetics', 'applies the explanation’s own stated bottleneck-effect/genetic-drift fact ("most powerful in small populations") to a disaster scenario, distinct from the cystic-fibrosis carrier-frequency Hardy-Weinberg mcq and the dominant-alleles-always-increase misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.genetic-engineering', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'Before a gene of interest can be inserted into a plasmid vector, it is first amplified by PCR. Where must the primers used in this PCR reaction bind?',
    choices: [
      { text: 'To short complementary sequences flanking each side of the gene of interest, one primer per strand, defining the region to be amplified', isCorrect: true },
      { text: 'Directly to the restriction enzyme recognition site inside the plasmid vector, not the gene itself', isCorrect: false },
      { text: 'Anywhere on the template, since Taq polymerase can begin synthesis without a primer', isCorrect: false },
      { text: 'Only to the antibiotic-resistance marker gene, to confirm successful uptake before amplifying the gene of interest', isCorrect: false },
    ],
    correctValue: 'To sequences flanking the gene of interest, one primer per strand',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.genetic-engineering', 'applies the explanation’s own stated PCR mechanism (primers, thermostable polymerase, thermal cycling) to a primer-design application task, distinct from the sticky-ends-facilitate-ligation mcq and the E.-coli-insulin-identity misconception probe already on file'),
  },
  {
    conceptId: 'bio.gen.transposable-elements', subjectSlug: S, probeKind: 'short_answer',
    gradeBand: GradeBand.UNDERGRADUATE, difficulty: ProbeDifficulty.PROFICIENT,
    stem:
      'A Class II DNA transposon moves using a "cut-and-paste" mechanism via the enzyme transposase, unlike a Class I retrotransposon\'s "copy-and-paste" mechanism. Does the DNA transposon\'s movement increase its own copy number in the genome the way retrotransposition does?',
    choices: [
      { text: 'No — cut-and-paste excises the element from its original site and reinserts it elsewhere, so it relocates rather than reliably increasing in copy number, unlike retrotransposition’s copy-and-paste mechanism', isCorrect: true },
      { text: 'Yes — both mechanisms are functionally identical and always increase copy number equally', isCorrect: false },
      { text: 'Yes — cut-and-paste always duplicates the element before removing the original copy', isCorrect: false },
      { text: 'No — DNA transposons cannot actually move at all, only retrotransposons can', isCorrect: false },
    ],
    correctValue: 'No — cut-and-paste relocates the element; only copy-and-paste (retrotransposition) reliably increases copy number',
    targetedMisconceptions: [],
    source: srcD5('bio.gen.transposable-elements', 'applies the explanation’s own stated Class I (copy-and-paste, increases copy number) vs Class II (cut-and-paste) distinction to a copy-number reasoning task, distinct from the retrotransposon-mechanism mcq and the jumping-genes-randomly-destroy-genome misconception probe already on file'),
  },
]

/**
 * Every biology probe-depth probe. One array, so `seed-knowledge-assets.ts`,
 * the cold-start bootstrap and the contract tests — all of which scan for a
 * `*_PROBES` export — see the same set.
 */
export const BIOLOGY_DEPTH_PROBES: SeedProbe[] = [
  ...BIO_D1,
  ...BIO_D2,
  ...BIO_D3,
  ...BIO_D4,
  ...BIO_D5,
]

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
 * same mechanism, same contract. Combined: 22/108 originally-authored
 * concepts now at the 3-probe floor. The remaining 86 of the 108
 * (`bio.eco`/`bio.mol`/`bio.micro`/... through `bio.div`) are NOT covered
 * by this file and remain at 2/3 gradeable probes — a bounded, honestly
 * reported partial closure, not a claim of full biology probe-depth
 * closure. The 91 concepts added by the 2026-09-14 KG extension
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

/**
 * Every biology probe-depth probe. One array, so `seed-knowledge-assets.ts`,
 * the cold-start bootstrap and the contract tests — all of which scan for a
 * `*_PROBES` export — see the same set.
 */
export const BIOLOGY_DEPTH_PROBES: SeedProbe[] = [
  ...BIO_D1,
  ...BIO_D2,
]

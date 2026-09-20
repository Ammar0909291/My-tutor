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
 * ── SCOPE OF THIS BATCH ──────────────────────────────────────────────────
 * Batch 1 (this file, 2026-09-20): the 8 concepts of `bio.found` — the
 * subject's own foundational domain, authored first here for the same reason
 * every other subject's depth-fix and Educational Brain campaigns close one
 * domain at a time. The remaining 100 of the 108 originally-authored
 * concepts (`bio.cell` through `bio.div`) are NOT covered by this file and
 * remain at 2/3 gradeable probes — a bounded, honestly-reported first batch,
 * not a claim of full biology probe-depth closure. The 91 concepts added by
 * the 2026-09-14 KG extension (`bio.neuro`, `bio.behav`, and the expansions
 * to the 16 pre-existing domains) have ZERO seed content of any kind
 * (0 explanations, 0 probes) and are a separate, larger authoring task, not
 * a depth-fix on existing content.
 *
 * Guarded by `probeInventoryDepth.test.ts` pattern used for chemistry/physics
 * (duplicate-stem check, misconceptionId-must-exist-in-repair check,
 * difficulty/gradeBand sanity) — see `src/tests/biologyProbeDepth.test.ts`.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'biology'
const src = (concept: string, what: string) =>
  `docs/biology/kg/graph.json — ${concept} (probe-depth batch 1, bio.found, 2026-09-20); ${what}`

// ═══════════════════════════════════════════════════════════════════════════
// BATCH BIO-D1 — bio.found (all 8 concepts) @ HIGH, PROFICIENT, short_answer
// ═══════════════════════════════════════════════════════════════════════════

export const BIOLOGY_DEPTH_PROBES: SeedProbe[] = [
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
    source: src('bio.found.what-is-biology', 'directly applies the explanation’s own claim that "every branch ultimately connects" to a concrete multi-branch scenario, rather than restating the branch-naming mcq or the memorisation-vs-reasoning misconception probe already on file'),
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
    source: src('bio.found.characteristics-of-life', 'a novel scenario (not fire, the concept’s own worked example) forcing the same "all characteristics together, not any one alone" rule to be applied rather than recalled from the mule/fire probes already on file'),
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
    source: src('bio.found.classification-need', 'applies the explanation’s own Panthera lion/tiger hybridisation example as a general rule — shared ancestry predicts rank — to a new pair of organisms, distinct from the most-specific-rank mcq and the arbitrary-labelling misconception probe already on file'),
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
    source: src('bio.found.binomial-nomenclature', 'tests the genus-abbreviation convention the explanation states explicitly ("H. sapiens" on second use) as an application judgement, distinct from the capitalisation/italics-formatting mcq and the species-name-alone misconception probe already on file'),
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
    source: src('bio.found.five-kingdom', 'applies the explanation’s own defining criteria (cell type + body organisation, not nutrition mode alone) to a new organism combining features that could mislead toward Plantae — distinct from the Monera-identification mcq and the fungi-are-plants misconception probe already on file'),
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
    source: src('bio.found.microscopy-basics', 'reuses the explanation’s own stated resolution figures (light ~200 nm, electron ~0.1 nm) as a quantitative reasoning check on a new structure (mitochondrial cristae) rather than the cell-membrane mcq or the doubled-magnification misconception probe already on file'),
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
    source: src('bio.found.biomes-levels-of-organisation', 'distinguishes biome from the already-tested community/ecosystem confusion by testing the biome vs. ecosystem scale distinction instead — a capability the existing community-identification mcq and population-vs-community misconception probe do not cover'),
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
    source: src('bio.found.viruses-viroids-lichens', 'directly applies the explanation’s own clarification that "lichens are not a virus at all — they are a mutualistic symbiosis" to a scenario distinguishing it from the capsid-composition mcq and the virus-reproduction misconception probe already on file'),
  },
]

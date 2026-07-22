import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

// ─── bio.found.what-is-biology ───────────────────────────────────────────────
const BIOL = 'bio.found.what-is-biology'
const BIOL_SRC = 'docs/biology/kg/graph.json — bio.found.what-is-biology'
const BIOL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIOL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Biology is the science of life — the study of living organisms, how they are built, ' +
      'how they work, how they interact, and how they change over time. Its major branches ' +
      'divide that enormous subject: botany (plants), zoology (animals), microbiology ' +
      '(microorganisms), physiology (how bodies function), ecology (organism-environment ' +
      'relationships), and genetics (inheritance). Every branch ultimately connects — a ' +
      'physiologist studying the heart uses genetics; an ecologist studying forests needs ' +
      'botany. The unifying theme is that life shares common principles across every organism.',
    targetedMisconceptions: [],
    source: BIOL_SRC,
  },
  {
    conceptId: BIOL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Many students think biology is a memorisation subject — species names, organ names, ' +
      'cycle steps. That framing misses the point. Every name exists because of a discoverable ' +
      'principle: the heart has four chambers because of the physics of double circulation; ' +
      'DNA uses four bases because of the chemistry of base pairing. Memorising the name ' +
      '"mitochondria" without understanding why a cell needs separate compartments for ' +
      'high-energy chemistry is collecting stamps, not doing biology. The names are handles ' +
      'for ideas — learn the idea first, and the name sticks naturally.',
    targetedMisconceptions: [`${BIOL}:M1`],
    source: BIOL_SRC,
  },
]
const BIOL_PROBES: SeedProbe[] = [
  {
    conceptId: BIOL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which branch of biology specifically studies how organisms interact with each other and their non-living environment?',
    choices: [
      { text: 'Ecology', isCorrect: true },
      { text: 'Physiology', isCorrect: false, misconceptionId: `${BIOL}:M2` },
      { text: 'Genetics', isCorrect: false },
      { text: 'Microbiology', isCorrect: false },
    ],
    correctValue: 'Ecology',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BIOL}:M2`],
    source: BIOL_SRC,
  },
  {
    conceptId: BIOL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "Biology is just memorising names — there is no real reasoning involved." What is the best response?',
    choices: [
      { text: 'Wrong — names are handles for principles; understanding why explains what', isCorrect: true },
      { text: 'Correct — biology relies on memorising facts more than reasoning', isCorrect: false, misconceptionId: `${BIOL}:M1` },
    ],
    correctValue: 'Wrong — names are handles for principles; understanding why explains what',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BIOL}:M1`],
    source: BIOL_SRC,
  },
]

// ─── bio.found.characteristics-of-life ───────────────────────────────────────
const LIFECHARS = 'bio.found.characteristics-of-life'
const LIFECHARS_SRC = 'docs/biology/kg/graph.json — bio.found.characteristics-of-life'
const LIFECHARS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LIFECHARS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Seven properties together distinguish living from non-living matter: cellular organisation ' +
      '(life is built from cells), metabolism (chemical reactions for energy and building), ' +
      'homeostasis (maintaining a stable internal environment), growth (orderly increase in ' +
      'size/complexity), reproduction (producing offspring), response to stimuli (reacting to ' +
      'environmental signals), and heredity/evolution (passing heritable information that ' +
      'can change over generations). No single property alone is sufficient — fire grows and ' +
      'releases energy, but it has no cells, no homeostasis, no heredity. Life requires the ' +
      'whole package.',
    targetedMisconceptions: [],
    source: LIFECHARS_SRC,
  },
  {
    conceptId: LIFECHARS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Fire grows, moves, consumes "food" and produces waste — so is fire alive? No. Fire ' +
      'lacks cellular organisation, homeostasis, and heredity. It cannot reproduce offspring ' +
      'that resemble it with heritable variation. Growth in biology means an orderly, ' +
      'genetically directed increase — a crystal also grows, but not by following a genetic ' +
      'program. The key is that life uses ALL the characteristics together, governed by ' +
      'information encoded in DNA. When any major group is absent, the object is not alive, ' +
      'however lively it seems.',
    targetedMisconceptions: [`${LIFECHARS}:M1`],
    source: LIFECHARS_SRC,
  },
]
const LIFECHARS_PROBES: SeedProbe[] = [
  {
    conceptId: LIFECHARS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A mule is sterile and cannot reproduce. Does this mean a mule is not alive?',
    choices: [
      { text: 'No — a mule satisfies the other characteristics of life and is alive', isCorrect: true },
      { text: 'Yes — reproduction is essential, so a sterile organism is not alive', isCorrect: false, misconceptionId: `${LIFECHARS}:M2` },
    ],
    correctValue: 'No — a mule satisfies the other characteristics of life and is alive',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LIFECHARS}:M2`],
    source: LIFECHARS_SRC,
  },
  {
    conceptId: LIFECHARS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is fire NOT considered a living organism even though it consumes fuel, grows, and releases waste gases?',
    choices: [
      { text: 'Fire lacks cellular organisation, homeostasis, and heritable reproduction', isCorrect: true },
      { text: 'Fire is non-living only because it has no cells — the other characteristics do apply', isCorrect: false, misconceptionId: `${LIFECHARS}:M1` },
    ],
    correctValue: 'Fire lacks cellular organisation, homeostasis, and heritable reproduction',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${LIFECHARS}:M1`],
    source: LIFECHARS_SRC,
  },
]

// ─── bio.found.classification-need ───────────────────────────────────────────
const CLASSNEED = 'bio.found.classification-need'
const CLASSNEED_SRC = 'docs/biology/kg/graph.json — bio.found.classification-need'
const CLASSNEED_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CLASSNEED, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'With over 8 million known species, biology needs a filing system. Classification ' +
      'groups organisms by shared characteristics into a hierarchy: Domain → Kingdom → ' +
      'Phylum → Class → Order → Family → Genus → Species — "Dear King Philip Came Over ' +
      'For Good Soup." Each rank is more exclusive than the one above: all members of a ' +
      'genus share more features than all members of an order. Modern classification aims ' +
      'to reflect evolutionary relationships — organisms grouped together ideally share a ' +
      'common ancestor. This makes taxonomy not just a naming exercise but a map of the ' +
      'history of life.',
    targetedMisconceptions: [],
    source: CLASSNEED_SRC,
  },
  {
    conceptId: CLASSNEED, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Classification is sometimes thought of as arbitrary labelling — just scientists ' +
      'deciding which box to put things in. Actually, good classification reveals biology. ' +
      'When two organisms are placed in the same family, that predicts they will share ' +
      'biochemistry, similar immune responses, related developmental genes. Taxonomy is ' +
      'hypothesis-making: grouping lions and tigers in the same genus (Panthera) predicts ' +
      'they can hybridise — and they can (ligers and tigons). Every classification is a ' +
      'falsifiable prediction about shared ancestry and shared biology.',
    targetedMisconceptions: [`${CLASSNEED}:M1`],
    source: CLASSNEED_SRC,
  },
]
const CLASSNEED_PROBES: SeedProbe[] = [
  {
    conceptId: CLASSNEED, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which taxonomic rank is the MOST specific (fewest members)?',
    choices: [
      { text: 'Species', isCorrect: true },
      { text: 'Genus', isCorrect: false, misconceptionId: `${CLASSNEED}:M2` },
      { text: 'Family', isCorrect: false },
      { text: 'Order', isCorrect: false },
    ],
    correctValue: 'Species',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CLASSNEED}:M2`],
    source: CLASSNEED_SRC,
  },
  {
    conceptId: CLASSNEED, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Classification is described as "arbitrary labelling." What does modern phylogenetic classification actually reflect?',
    choices: [
      { text: 'Evolutionary relationships and shared ancestry', isCorrect: true },
      { text: 'Superficial physical similarities chosen by scientists', isCorrect: false, misconceptionId: `${CLASSNEED}:M1` },
    ],
    correctValue: 'Evolutionary relationships and shared ancestry',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CLASSNEED}:M1`],
    source: CLASSNEED_SRC,
  },
]

// ─── bio.found.binomial-nomenclature ─────────────────────────────────────────
const BINOMEN = 'bio.found.binomial-nomenclature'
const BINOMEN_SRC = 'docs/biology/kg/graph.json — bio.found.binomial-nomenclature'
const BINOMEN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BINOMEN, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      "Linnaeus's binomial system gives every species a two-part Latin name: Genus species. " +
      'Rules: the genus name is capitalised, the species name is lowercase, and the whole ' +
      'name is italicised (or underlined in handwriting). Humans are Homo sapiens — the ' +
      'genus Homo (upright walkers with large brains) and the species sapiens (wise). The ' +
      'same name is used worldwide, eliminating confusion from local common names: "robin" ' +
      'means a different bird in the UK (Erithacus rubecula) and the USA (Turdus migratorius). ' +
      "The binomial name is an international address that every scientist recognises.",
    targetedMisconceptions: [],
    source: BINOMEN_SRC,
  },
  {
    conceptId: BINOMEN, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often write "sapiens" as if that alone identifies the organism. It does not ' +
      '— the species name alone is meaningless without the genus. Panthera leo (lion) and ' +
      'Helianthus leo are hypothetically different organisms — the species epithet "leo" ' +
      'only means lion in the context of the genus Panthera. Always write the full binomial: ' +
      'genus + species together. On second use in a document, the genus can be abbreviated ' +
      'to its first letter: H. sapiens — but the species name alone, never.',
    targetedMisconceptions: [`${BINOMEN}:M1`],
    source: BINOMEN_SRC,
  },
]
const BINOMEN_PROBES: SeedProbe[] = [
  {
    conceptId: BINOMEN, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which of the following correctly writes a scientific name?',
    choices: [
      { text: 'Homo sapiens', isCorrect: true },
      { text: 'homo sapiens', isCorrect: false, misconceptionId: `${BINOMEN}:M2` },
      { text: 'Homo Sapiens', isCorrect: false, misconceptionId: `${BINOMEN}:M2` },
      { text: 'HOMO SAPIENS', isCorrect: false },
    ],
    correctValue: 'Homo sapiens',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BINOMEN}:M2`],
    source: BINOMEN_SRC,
  },
  {
    conceptId: BINOMEN, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student writes "sapiens" as the scientific name of humans. What is missing?',
    choices: [
      { text: 'The genus name Homo — a species epithet alone does not identify an organism', isCorrect: true },
      { text: 'Nothing — the species name alone is sufficient in most contexts', isCorrect: false, misconceptionId: `${BINOMEN}:M1` },
    ],
    correctValue: 'The genus name Homo — a species epithet alone does not identify an organism',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BINOMEN}:M1`],
    source: BINOMEN_SRC,
  },
]

// ─── bio.found.five-kingdom ───────────────────────────────────────────────────
const FIVEK = 'bio.found.five-kingdom'
const FIVEK_SRC = 'docs/biology/kg/graph.json — bio.found.five-kingdom'
const FIVEK_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FIVEK, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      "Whittaker's five-kingdom system groups all life by cell type, body organisation, and " +
      'nutrition mode. Monera: prokaryotes (bacteria, archaea) — no nucleus, unicellular. ' +
      'Protista: unicellular eukaryotes — Amoeba, Euglena. Fungi: multicellular eukaryotes ' +
      'that absorb nutrition (no chlorophyll, no photosynthesis) — mushrooms, moulds. ' +
      'Plantae: multicellular autotrophs with cell walls and chlorophyll. Animalia: ' +
      'multicellular heterotrophs that ingest food, no cell walls. The key distinctions: ' +
      'prokaryote vs eukaryote separates Monera from the rest; mode of nutrition separates ' +
      'Fungi from Plantae.',
    targetedMisconceptions: [],
    source: FIVEK_SRC,
  },
  {
    conceptId: FIVEK, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Fungi look plant-like — they stay in one place, grow upward, and form visible ' +
      'structures. But fungi are their own kingdom, not a subdivision of Plantae. The ' +
      'critical difference: plants make their own food via photosynthesis (autotrophic); ' +
      'fungi secrete digestive enzymes externally and absorb the products (absorptive ' +
      'heterotrophs). Fungi also have cell walls made of chitin, not cellulose. ' +
      'Phylogenetically, fungi are actually more closely related to animals than to plants. ' +
      '"Mushroom = plant" is a common-language error that real biology corrects immediately.',
    targetedMisconceptions: [`${FIVEK}:M1`],
    source: FIVEK_SRC,
  },
]
const FIVEK_PROBES: SeedProbe[] = [
  {
    conceptId: FIVEK, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which kingdom contains organisms that are prokaryotic?',
    choices: [
      { text: 'Monera', isCorrect: true },
      { text: 'Protista', isCorrect: false, misconceptionId: `${FIVEK}:M2` },
      { text: 'Fungi', isCorrect: false },
      { text: 'Plantae', isCorrect: false },
    ],
    correctValue: 'Monera',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${FIVEK}:M2`],
    source: FIVEK_SRC,
  },
  {
    conceptId: FIVEK, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why are fungi placed in a separate kingdom rather than with Plantae?',
    choices: [
      { text: 'Fungi are absorptive heterotrophs with chitin cell walls — they do not photosynthesise', isCorrect: true },
      { text: 'Fungi and plants are in the same kingdom — fungi are simply non-green plants', isCorrect: false, misconceptionId: `${FIVEK}:M1` },
    ],
    correctValue: 'Fungi are absorptive heterotrophs with chitin cell walls — they do not photosynthesise',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FIVEK}:M1`],
    source: FIVEK_SRC,
  },
]

// ─── bio.found.microscopy-basics ──────────────────────────────────────────────
const MICRO = 'bio.found.microscopy-basics'
const MICRO_SRC = 'docs/biology/kg/graph.json — bio.found.microscopy-basics'
const MICRO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MICRO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Two key properties determine what a microscope reveals: magnification (how many times ' +
      'larger the image appears) and resolution (the minimum distance between two points that ' +
      'can still be distinguished as separate). Resolution limits useful magnification — ' +
      'magnifying a blurry image only makes a bigger blur. Light microscopes use visible ' +
      'light; maximum useful magnification ~1,000×, resolution ~200 nm. Electron microscopes ' +
      'use electrons (shorter wavelength); resolution ~0.1 nm, revealing membrane structure ' +
      'and organelle ultrastructure. Staining makes transparent biological material visible ' +
      'by adding contrast: haematoxylin stains nuclei blue, eosin stains cytoplasm pink.',
    targetedMisconceptions: [],
    source: MICRO_SRC,
  },
  {
    conceptId: MICRO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A common mistake: "a stronger microscope just makes things bigger." Magnification and ' +
      'resolution are independent. A light microscope can magnify a bacterium 2,000× but the ' +
      'image will be useless blur — because its resolution limit (~200 nm) is larger than ' +
      'the structures you want to see. Electron microscopes are not merely "more powerful " ' +
      'light microscopes — they use a fundamentally different physics (electron beams instead ' +
      'of light) to achieve the resolution needed to image cell membranes. More magnification ' +
      'without better resolution is empty magnification.',
    targetedMisconceptions: [`${MICRO}:M1`],
    source: MICRO_SRC,
  },
]
const MICRO_PROBES: SeedProbe[] = [
  {
    conceptId: MICRO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which type of microscope would you use to observe the detailed structure of a cell membrane?',
    choices: [
      { text: 'Electron microscope', isCorrect: true },
      { text: 'Light microscope at maximum magnification', isCorrect: false, misconceptionId: `${MICRO}:M1` },
      { text: 'Dissecting (stereo) microscope', isCorrect: false },
    ],
    correctValue: 'Electron microscope',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MICRO}:M1`],
    source: MICRO_SRC,
  },
  {
    conceptId: MICRO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'If you double a light microscope\'s magnification from 500× to 1000×, will you see twice as much detail?',
    choices: [
      { text: 'Not necessarily — detail depends on resolution, which light microscopy cannot improve beyond ~200 nm', isCorrect: true },
      { text: 'Yes — higher magnification always reveals more detail', isCorrect: false, misconceptionId: `${MICRO}:M1` },
    ],
    correctValue: 'Not necessarily — detail depends on resolution, which light microscopy cannot improve beyond ~200 nm',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MICRO}:M1`],
    source: MICRO_SRC,
  },
]

// ─── bio.found.biomes-levels-of-organisation ──────────────────────────────────
const BIOLEVEL = 'bio.found.biomes-levels-of-organisation'
const BIOLEVEL_SRC = 'docs/biology/kg/graph.json — bio.found.biomes-levels-of-organisation'
const BIOLEVEL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIOLEVEL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Life is organised in a hierarchy from smallest to largest: molecules → organelles → ' +
      'cell → tissue → organ → organ system → organism → population (same species, same area) ' +
      '→ community (all species in an area) → ecosystem (community + abiotic environment) → ' +
      'biome (major regional ecosystem type) → biosphere (all life on Earth). Each level has ' +
      'emergent properties — properties that appear at that level but are absent from the ' +
      'components below. A heart cell can contract; a heart can pump; neither property ' +
      'exists at the molecular level alone.',
    targetedMisconceptions: [],
    source: BIOLEVEL_SRC,
  },
  {
    conceptId: BIOLEVEL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often think a community is just a "bigger population" — more organisms of the ' +
      'same kind. Wrong: a population is one species; a community is ALL species sharing an ' +
      'area (the oak trees, the squirrels, the fungi, the bacteria — every species together). ' +
      'Similarly, an ecosystem adds the non-living (abiotic) factors: temperature, soil, ' +
      'water, sunlight. A community of organisms in a rainforest is not the same as the ' +
      'Amazon ecosystem — the ecosystem includes the rivers, soil chemistry, and rainfall. ' +
      'Each level genuinely adds something absent from the level below.',
    targetedMisconceptions: [`${BIOLEVEL}:M1`],
    source: BIOLEVEL_SRC,
  },
]
const BIOLEVEL_PROBES: SeedProbe[] = [
  {
    conceptId: BIOLEVEL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'All the oak trees, deer, wolves, fungi, and bacteria living together in a forest represent which level of biological organisation?',
    choices: [
      { text: 'Community', isCorrect: true },
      { text: 'Population', isCorrect: false, misconceptionId: `${BIOLEVEL}:M1` },
      { text: 'Ecosystem', isCorrect: false, misconceptionId: `${BIOLEVEL}:M2` },
      { text: 'Biome', isCorrect: false },
    ],
    correctValue: 'Community',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIOLEVEL}:M1`, `${BIOLEVEL}:M2`],
    source: BIOLEVEL_SRC,
  },
  {
    conceptId: BIOLEVEL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says a community and a population are the same thing, just different sizes. What is the key distinction?',
    choices: [
      { text: 'A population is one species; a community is all species in an area', isCorrect: true },
      { text: 'They are the same — community is just an older word for a large population', isCorrect: false, misconceptionId: `${BIOLEVEL}:M1` },
    ],
    correctValue: 'A population is one species; a community is all species in an area',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIOLEVEL}:M1`],
    source: BIOLEVEL_SRC,
  },
]

// ─── bio.eco.organism-environment ────────────────────────────────────────────
const ORGENV = 'bio.eco.organism-environment'
const ORGENV_SRC = 'docs/biology/kg/graph.json — bio.eco.organism-environment'
const ORGENV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ORGENV, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      "Habitat is WHERE an organism lives; niche is HOW it lives there — its functional role " +
      '(what it eats, when it is active, how it reproduces, how it interacts with other ' +
      'species). Abiotic factors are non-living: temperature, light, water availability, soil ' +
      'chemistry, pH. Biotic factors are living: food sources, predators, competitors, ' +
      'parasites, mutualists. Organisms are adapted to their environment over evolutionary ' +
      'time — a cactus\'s spines, water-storing stem, and shallow wide roots are all ' +
      'adaptations to arid abiotic conditions. Acclimatisation is short-term physiological ' +
      'adjustment within one lifetime (not genetic).',
    targetedMisconceptions: [],
    source: ORGENV_SRC,
  },
  {
    conceptId: ORGENV, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Habitat and niche are often confused. A habitat is an address — "lives in a pond." ' +
      'A niche is a profession — "hunts mosquito larvae near the surface at dusk, competes ' +
      'with dragonfly nymphs, is preyed on by frogs." Two species can share a habitat but ' +
      'not a niche: the competitive exclusion principle states that no two species can ' +
      'occupy the exact same niche indefinitely — one will outcompete the other. When you ' +
      'hear "niche," think ecological role, not location.',
    targetedMisconceptions: [`${ORGENV}:M1`],
    source: ORGENV_SRC,
  },
]
const ORGENV_PROBES: SeedProbe[] = [
  {
    conceptId: ORGENV, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: "A lion's ecological niche includes being a top predator that hunts large herbivores on grasslands. Which of the following best describes the HABITAT of the lion?",
    choices: [
      { text: 'African savanna grassland', isCorrect: true },
      { text: 'Top predator of large herbivores', isCorrect: false, misconceptionId: `${ORGENV}:M1` },
    ],
    correctValue: 'African savanna grassland',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ORGENV}:M1`],
    source: ORGENV_SRC,
  },
  {
    conceptId: ORGENV, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can two different species permanently occupy exactly the same ecological niche in the same habitat?',
    choices: [
      { text: 'No — competitive exclusion means one species will eventually out-compete the other', isCorrect: true },
      { text: 'Yes — many species share the same niche in stable ecosystems', isCorrect: false, misconceptionId: `${ORGENV}:M2` },
    ],
    correctValue: 'No — competitive exclusion means one species will eventually out-compete the other',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORGENV}:M2`],
    source: ORGENV_SRC,
  },
]

// ─── bio.found.viruses-viroids-lichens ───────────────────────────────────────
const VIRUS = 'bio.found.viruses-viroids-lichens'
const VIRUS_SRC = 'docs/biology/kg/graph.json — bio.found.viruses-viroids-lichens'
const VIRUS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VIRUS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Viruses are acellular — not cells, not built from cells. A typical virus has a protein ' +
      'coat (capsid) surrounding a nucleic acid genome (DNA or RNA, single or double stranded, ' +
      'never both). Outside a host cell, viruses are inert crystals with no metabolism. ' +
      'Inside a host cell, they hijack the machinery to replicate. Viroids are simpler still: ' +
      'just a naked circular RNA strand with no protein coat, causing plant diseases (e.g., ' +
      'potato spindle tuber disease). Lichens are not a virus at all — they are a mutualistic ' +
      'symbiosis: a fungus provides structure and water retention; an alga (or cyanobacterium) ' +
      'provides photosynthate.',
    targetedMisconceptions: [],
    source: VIRUS_SRC,
  },
  {
    conceptId: VIRUS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Viruses can reproduce — doesn\'t that make them alive? No. Viruses do not reproduce; ' +
      'they are replicated — by the host cell\'s ribosomes, enzymes, and energy. A virus has ' +
      'no metabolism of its own. The seven characteristics of life (metabolism, homeostasis, ' +
      'cellular organisation...) are all absent in a virus outside a host. Inside a host, the ' +
      'host provides everything. A photocopier can copy itself if you run the right program, ' +
      'but the photocopier is not alive. Viruses sit at the boundary, which is why biologists ' +
      'say they are at the "edge of life" rather than clearly inside or outside it.',
    targetedMisconceptions: [`${VIRUS}:M1`],
    source: VIRUS_SRC,
  },
]
const VIRUS_PROBES: SeedProbe[] = [
  {
    conceptId: VIRUS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What do ALL viruses have in common?',
    choices: [
      { text: 'A nucleic acid genome enclosed in a protein capsid', isCorrect: true },
      { text: 'A lipid bilayer envelope', isCorrect: false, misconceptionId: `${VIRUS}:M2` },
      { text: 'Both DNA and RNA', isCorrect: false },
      { text: 'Their own ribosomes', isCorrect: false },
    ],
    correctValue: 'A nucleic acid genome enclosed in a protein capsid',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${VIRUS}:M2`],
    source: VIRUS_SRC,
  },
  {
    conceptId: VIRUS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student argues "viruses are alive because they can reproduce." What is the flaw in this reasoning?',
    choices: [
      { text: 'Viruses are replicated by the host\'s machinery — they have no metabolism of their own', isCorrect: true },
      { text: 'The student is correct — reproduction is the key criterion for life', isCorrect: false, misconceptionId: `${VIRUS}:M1` },
    ],
    correctValue: 'Viruses are replicated by the host\'s machinery — they have no metabolism of their own',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${VIRUS}:M1`],
    source: VIRUS_SRC,
  },
]

// ─── bio.cell.cell-theory ────────────────────────────────────────────────────
const CELLTH = 'bio.cell.cell-theory'
const CELLTH_SRC = 'docs/biology/kg/graph.json — bio.cell.cell-theory'
const CELLTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CELLTH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Cell theory has three tenets that emerged from 19th-century microscopy. (1) All living ' +
      'organisms are made of one or more cells. (2) The cell is the basic structural and ' +
      'functional unit of life. (3) All cells arise from pre-existing cells (Virchow, 1855). ' +
      'Schleiden (1838) established that plants are made of cells; Schwann (1839) extended ' +
      'this to animals. Virchow\'s addition — "omnis cellula e cellula" — overturned the ' +
      'idea of spontaneous generation for cells and established that life is a continuous ' +
      'chain: every cell alive today descends from the first cells.',
    targetedMisconceptions: [],
    source: CELLTH_SRC,
  },
  {
    conceptId: CELLTH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Cell theory states all cells come from pre-existing cells. Then how did the FIRST ' +
      'cells on Earth arise? This is the origin-of-life question, and it does not contradict ' +
      'cell theory — the theory describes what happens under current Earth conditions. The ' +
      'first cells arose through prebiotic chemistry in a very different early Earth ' +
      '(no oxygen, high UV, different chemistry). Once life started, cell theory has held ' +
      'without exception since. Also: viruses are not counter-examples — they are not ' +
      'cells and cell theory makes no claim about them.',
    targetedMisconceptions: [`${CELLTH}:M1`],
    source: CELLTH_SRC,
  },
]
const CELLTH_PROBES: SeedProbe[] = [
  {
    conceptId: CELLTH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Who added the principle that cells can only arise from pre-existing cells?',
    choices: [
      { text: 'Rudolf Virchow', isCorrect: true },
      { text: 'Matthias Schleiden', isCorrect: false, misconceptionId: `${CELLTH}:M2` },
      { text: 'Theodor Schwann', isCorrect: false, misconceptionId: `${CELLTH}:M2` },
      { text: 'Robert Hooke', isCorrect: false },
    ],
    correctValue: 'Rudolf Virchow',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${CELLTH}:M2`],
    source: CELLTH_SRC,
  },
  {
    conceptId: CELLTH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Cell theory says all cells come from pre-existing cells. Does this contradict the idea that the first cells arose from non-living chemistry on early Earth?',
    choices: [
      { text: 'No — cell theory describes current conditions; the origin of the first cells is a separate question', isCorrect: true },
      { text: 'Yes — cell theory is falsified by the existence of the first cells', isCorrect: false, misconceptionId: `${CELLTH}:M1` },
    ],
    correctValue: 'No — cell theory describes current conditions; the origin of the first cells is a separate question',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CELLTH}:M1`],
    source: CELLTH_SRC,
  },
]

// ─── bio.eco.population-ecology ───────────────────────────────────────────────
const POPECO = 'bio.eco.population-ecology'
const POPECO_SRC = 'docs/biology/kg/graph.json — bio.eco.population-ecology'
const POPECO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POPECO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A population is all individuals of one species in a defined area. Key attributes: ' +
      'density (number per unit area), birth rate, death rate, age structure, and sex ratio. ' +
      'Growth patterns: exponential (J-curve) when resources are unlimited — population ' +
      'doubles at a fixed rate. Logistic (S-curve) when resources are limited — growth ' +
      'slows as the population approaches carrying capacity (K), the maximum the environment ' +
      'can sustain. Population interactions: competition (both harmed), predation (one gains, ' +
      'one loses), parasitism (one gains, host harmed), mutualism (both benefit), commensalism ' +
      '(one benefits, other unaffected).',
    targetedMisconceptions: [],
    source: POPECO_SRC,
  },
  {
    conceptId: POPECO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Populations in nature do not grow exponentially for long. Exponential growth requires ' +
      'unlimited food, space, and no predators or disease — conditions that never hold in the ' +
      'real world. As density increases, food becomes limiting, disease spreads more easily, ' +
      'predators are attracted, and competition intensifies — these density-dependent factors ' +
      'slow growth. The J-curve is a useful mathematical baseline, but the S-curve (logistic) ' +
      'is what populations actually follow. Carrying capacity is not a fixed number — it ' +
      'changes when environmental conditions change.',
    targetedMisconceptions: [`${POPECO}:M1`],
    source: POPECO_SRC,
  },
]
const POPECO_PROBES: SeedProbe[] = [
  {
    conceptId: POPECO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A population growing in a resource-limited environment will produce which type of growth curve?',
    choices: [
      { text: 'S-shaped (logistic) curve', isCorrect: true },
      { text: 'J-shaped (exponential) curve', isCorrect: false, misconceptionId: `${POPECO}:M1` },
      { text: 'Straight line', isCorrect: false },
    ],
    correctValue: 'S-shaped (logistic) curve',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${POPECO}:M1`],
    source: POPECO_SRC,
  },
  {
    conceptId: POPECO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A rabbit population doubles every 3 months. Will it continue to double indefinitely?',
    choices: [
      { text: 'No — density-dependent factors (food limits, predation, disease) will eventually slow growth', isCorrect: true },
      { text: 'Yes — exponential growth continues as long as rabbits keep reproducing', isCorrect: false, misconceptionId: `${POPECO}:M1` },
    ],
    correctValue: 'No — density-dependent factors (food limits, predation, disease) will eventually slow growth',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${POPECO}:M1`],
    source: POPECO_SRC,
  },
]

// ─── bio.cell.prokaryotic-cell ────────────────────────────────────────────────
const PROKARY = 'bio.cell.prokaryotic-cell'
const PROKARY_SRC = 'docs/biology/kg/graph.json — bio.cell.prokaryotic-cell'
const PROKARY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROKARY, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Prokaryotic cells (bacteria and archaea) lack a membrane-bound nucleus — DNA sits in ' +
      'an irregular region called the nucleoid, directly in the cytoplasm. They also lack ' +
      'membrane-bound organelles. What they do have: a plasma membrane, cytoplasm, 70S ' +
      'ribosomes (smaller than eukaryotic 80S), a cell wall (peptidoglycan in bacteria), ' +
      'and often plasmids (small circular DNA), flagella for motility, and pili for ' +
      'attachment. Prokaryotes are the oldest life forms on Earth and the most abundant. ' +
      'The Gram stain (positive = purple thick wall; negative = pink thin wall) is a key ' +
      'identification tool for bacteria.',
    targetedMisconceptions: [],
    source: PROKARY_SRC,
  },
  {
    conceptId: PROKARY, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Prokaryotes have no nucleus — this does not mean they have no DNA. They absolutely ' +
      'do: a single circular chromosome containing millions of base pairs, plus optional ' +
      'plasmids. The DNA is simply not enclosed in a membrane-bound nucleus; it floats in ' +
      'the nucleoid region. Prokaryotes can also transfer DNA between individuals ' +
      '(horizontal gene transfer via conjugation, transformation, transduction) — often ' +
      'spreading antibiotic resistance genes. No nucleus ≠ no genetic material.',
    targetedMisconceptions: [`${PROKARY}:M1`],
    source: PROKARY_SRC,
  },
]
const PROKARY_PROBES: SeedProbe[] = [
  {
    conceptId: PROKARY, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which feature is found in prokaryotic cells but NOT in eukaryotic cells?',
    choices: [
      { text: 'Nucleoid region (DNA without a membrane envelope)', isCorrect: true },
      { text: 'Ribosomes', isCorrect: false },
      { text: 'Plasma membrane', isCorrect: false },
      { text: 'Cytoplasm', isCorrect: false },
    ],
    correctValue: 'Nucleoid region (DNA without a membrane envelope)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [],
    source: PROKARY_SRC,
  },
  {
    conceptId: PROKARY, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "bacteria have no genetic material because they have no nucleus." What is wrong with this?',
    choices: [
      { text: 'Bacteria have a circular chromosome in a nucleoid region — no nucleus does not mean no DNA', isCorrect: true },
      { text: 'The student is correct — genetic material requires a nucleus', isCorrect: false, misconceptionId: `${PROKARY}:M1` },
    ],
    correctValue: 'Bacteria have a circular chromosome in a nucleoid region — no nucleus does not mean no DNA',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PROKARY}:M1`],
    source: PROKARY_SRC,
  },
]

// ─── bio.cell.eukaryotic-cell ─────────────────────────────────────────────────
const EUKARY = 'bio.cell.eukaryotic-cell'
const EUKARY_SRC = 'docs/biology/kg/graph.json — bio.cell.eukaryotic-cell'
const EUKARY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EUKARY, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Eukaryotic cells (plants, animals, fungi, protists) have a membrane-bound nucleus ' +
      'and membrane-bound organelles — separate compartments specialised for different ' +
      'chemical jobs. Shared by plant and animal cells: nucleus, mitochondria, ' +
      'endoplasmic reticulum, Golgi apparatus, ribosomes, plasma membrane. Animal cells ' +
      'additionally have: centrioles, lysosomes. Plant cells additionally have: cellulose ' +
      'cell wall, chloroplasts, large central vacuole. Compartmentalisation is the key ' +
      'advantage: reactions that would interfere are isolated in separate organelles, ' +
      'allowing more biochemical complexity.',
    targetedMisconceptions: [],
    source: EUKARY_SRC,
  },
  {
    conceptId: EUKARY, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often say "plant cells have chloroplasts." This is incomplete — only plant ' +
      'cells exposed to light contain chloroplasts. Root cells, for example, live underground ' +
      'with no light access and contain no chloroplasts. They still carry out respiration ' +
      '(in mitochondria) but not photosynthesis. Similarly, not every animal cell has ' +
      'centrioles in mature form — mature red blood cells have neither a nucleus nor most ' +
      'organelles. "All plant cells have chloroplasts" is a common, testable misconception.',
    targetedMisconceptions: [`${EUKARY}:M1`],
    source: EUKARY_SRC,
  },
]
const EUKARY_PROBES: SeedProbe[] = [
  {
    conceptId: EUKARY, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which organelle is found in plant cells but NOT in typical animal cells?',
    choices: [
      { text: 'Chloroplast', isCorrect: true },
      { text: 'Mitochondrion', isCorrect: false },
      { text: 'Ribosome', isCorrect: false },
      { text: 'Golgi apparatus', isCorrect: false },
    ],
    correctValue: 'Chloroplast',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [],
    source: EUKARY_SRC,
  },
  {
    conceptId: EUKARY, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do ALL plant cells carry out photosynthesis?',
    choices: [
      { text: 'No — root cells and other cells not exposed to light lack chloroplasts and cannot photosynthesise', isCorrect: true },
      { text: 'Yes — all plant cells contain chloroplasts for photosynthesis', isCorrect: false, misconceptionId: `${EUKARY}:M1` },
    ],
    correctValue: 'No — root cells and other cells not exposed to light lack chloroplasts and cannot photosynthesise',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EUKARY}:M1`],
    source: EUKARY_SRC,
  },
]

// ─── bio.eco.ecosystem-structure-function ─────────────────────────────────────
const ECOSYS = 'bio.eco.ecosystem-structure-function'
const ECOSYS_SRC = 'docs/biology/kg/graph.json — bio.eco.ecosystem-structure-function'
const ECOSYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ECOSYS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'An ecosystem has two components — biotic (living) and abiotic (non-living). Among ' +
      'the living: producers (autotrophs — plants, algae) fix sunlight into chemical energy; ' +
      'consumers (heterotrophs) eat producers or each other; decomposers (bacteria, fungi) ' +
      'break down dead matter, returning nutrients to the soil. Energy flows through food ' +
      'chains and food webs. The 10% law: only about 10% of energy at one trophic level ' +
      'passes to the next — the rest is lost as heat. This is why food chains rarely have ' +
      'more than four or five links, and why the biomass pyramid has a broad base.',
    targetedMisconceptions: [],
    source: ECOSYS_SRC,
  },
  {
    conceptId: ECOSYS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Energy and matter behave differently in ecosystems, but students often treat them the ' +
      'same. Matter (carbon, nitrogen, phosphorus) CYCLES — it is used, decomposed, and ' +
      'reused indefinitely. Energy does NOT cycle — it flows one-way from the sun through ' +
      'producers to consumers, and is permanently lost as heat at each step. An ecosystem ' +
      'needs a continuous energy input from the sun (or chemical sources in deep-sea vents) ' +
      'to keep running. Once the energy is lost as heat, it cannot be recycled. The same ' +
      'carbon atom, however, can be in a plant today, a cow next year, the atmosphere next ' +
      'decade, and a plant again after that.',
    targetedMisconceptions: [`${ECOSYS}:M1`],
    source: ECOSYS_SRC,
  },
]
const ECOSYS_PROBES: SeedProbe[] = [
  {
    conceptId: ECOSYS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Approximately what percentage of energy is transferred from one trophic level to the next in a food chain?',
    choices: [
      { text: '10%', isCorrect: true },
      { text: '50%', isCorrect: false, misconceptionId: `${ECOSYS}:M2` },
      { text: '90%', isCorrect: false },
      { text: '100%', isCorrect: false },
    ],
    correctValue: '10%',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ECOSYS}:M2`],
    source: ECOSYS_SRC,
  },
  {
    conceptId: ECOSYS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Matter cycles through ecosystems indefinitely. Does energy also cycle?',
    choices: [
      { text: 'No — energy flows one-way and is lost as heat at each trophic level; it must be continuously replaced by the sun', isCorrect: true },
      { text: 'Yes — energy and matter both cycle through ecosystems', isCorrect: false, misconceptionId: `${ECOSYS}:M1` },
    ],
    correctValue: 'No — energy flows one-way and is lost as heat at each trophic level; it must be continuously replaced by the sun',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ECOSYS}:M1`],
    source: ECOSYS_SRC,
  },
]

// ─── bio.micro.microbial-diversity ────────────────────────────────────────────
const MICDIV = 'bio.micro.microbial-diversity'
const MICDIV_SRC = 'docs/biology/kg/graph.json — bio.micro.microbial-diversity'
const MICDIV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MICDIV, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Microorganisms include: bacteria (prokaryotes — the most abundant), archaea ' +
      '(prokaryotes in extreme environments — hot springs, salt lakes, deep sea), fungi ' +
      '(eukaryotes — moulds, yeasts), protozoa (unicellular eukaryotes — Amoeba, ' +
      'Paramecium, Plasmodium), and algae (photosynthetic eukaryotes — Chlorella). ' +
      'Viruses are sometimes grouped here but are acellular. Identification methods: ' +
      'morphology (shape, Gram stain), culture characteristics, biochemical tests, and ' +
      'molecular methods (16S rRNA sequencing for bacteria). Microbes occupy every habitat ' +
      'on Earth and drive global biogeochemical cycles.',
    targetedMisconceptions: [],
    source: MICDIV_SRC,
  },
  {
    conceptId: MICDIV, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The word "bacteria" conjures disease, but the vast majority of bacterial species are ' +
      'harmless or actively beneficial. Gut microbiota (trillions of bacteria in the human ' +
      'intestine) aid digestion, synthesise vitamins, and prime the immune system. Soil ' +
      'bacteria fix atmospheric nitrogen, making farmland fertile. Bacteria produce yoghurt, ' +
      'cheese, soy sauce, antibiotics. Of the estimated 1 trillion bacterial species on Earth, ' +
      'a handful cause the diseases we hear about. Fearing all bacteria because some are ' +
      'pathogenic is like fearing all chemicals because a few are toxic.',
    targetedMisconceptions: [`${MICDIV}:M1`],
    source: MICDIV_SRC,
  },
]
const MICDIV_PROBES: SeedProbe[] = [
  {
    conceptId: MICDIV, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which of the following is a prokaryotic microorganism?',
    choices: [
      { text: 'Bacterium (e.g. Escherichia coli)', isCorrect: true },
      { text: 'Amoeba', isCorrect: false, misconceptionId: `${MICDIV}:M2` },
      { text: 'Yeast (Saccharomyces)', isCorrect: false, misconceptionId: `${MICDIV}:M2` },
      { text: 'Paramecium', isCorrect: false },
    ],
    correctValue: 'Bacterium (e.g. Escherichia coli)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MICDIV}:M2`],
    source: MICDIV_SRC,
  },
  {
    conceptId: MICDIV, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Are most bacteria harmful to humans?',
    choices: [
      { text: 'No — the vast majority are harmless or beneficial (gut flora, soil bacteria, fermentation)', isCorrect: true },
      { text: 'Yes — bacteria evolved primarily as pathogens', isCorrect: false, misconceptionId: `${MICDIV}:M1` },
    ],
    correctValue: 'No — the vast majority are harmless or beneficial (gut flora, soil bacteria, fermentation)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MICDIV}:M1`],
    source: MICDIV_SRC,
  },
]

// ─── bio.mol.biomolecule-types ────────────────────────────────────────────────
const BIOMOL = 'bio.mol.biomolecule-types'
const BIOMOL_SRC = 'docs/biology/kg/graph.json — bio.mol.biomolecule-types'
const BIOMOL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIOMOL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Living matter is built from four classes of macromolecule, each assembled from ' +
      'monomers: carbohydrates (monosaccharide monomers — glucose; function: energy, ' +
      'structural support), proteins (amino acid monomers — 20 types; function: enzymes, ' +
      'structural, transport, immunity), lipids (glycerol + fatty acids — not a polymer; ' +
      'function: membranes, energy storage, hormones), nucleic acids (nucleotide monomers — ' +
      'function: genetic information, protein synthesis). Each class is distinguished by its ' +
      'elemental composition: all have C, H, O; proteins add N and S; nucleic acids add N ' +
      'and P. Micromolecules (water, ions, vitamins) are equally essential.',
    targetedMisconceptions: [],
    source: BIOMOL_SRC,
  },
  {
    conceptId: BIOMOL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often exclude fats from the "important biomolecules" category, or see lipids ' +
      'as purely energy storage. But phospholipids are the structural foundation of EVERY ' +
      'cell membrane — without lipids, there would be no cell boundary at all. Steroid ' +
      'hormones (testosterone, oestrogen, cortisol) that regulate reproduction, stress, ' +
      'and development are lipids. Fat-soluble vitamins (A, D, E, K) are lipids. Lipids ' +
      'are not a dietary villain — they are a fundamental class of molecule without which ' +
      'no cell could exist.',
    targetedMisconceptions: [`${BIOMOL}:M1`],
    source: BIOMOL_SRC,
  },
]
const BIOMOL_PROBES: SeedProbe[] = [
  {
    conceptId: BIOMOL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which class of biomolecule carries the genetic information of a cell?',
    choices: [
      { text: 'Nucleic acids', isCorrect: true },
      { text: 'Proteins', isCorrect: false, misconceptionId: `${BIOMOL}:M2` },
      { text: 'Carbohydrates', isCorrect: false },
      { text: 'Lipids', isCorrect: false },
    ],
    correctValue: 'Nucleic acids',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${BIOMOL}:M2`],
    source: BIOMOL_SRC,
  },
  {
    conceptId: BIOMOL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says lipids are just energy-storage molecules. What important structural role of lipids does this miss?',
    choices: [
      { text: 'Phospholipids form the bilayer of every cell membrane — without them, cells could not exist', isCorrect: true },
      { text: 'Lipids have no important structural role — they are primarily metabolic fuels', isCorrect: false, misconceptionId: `${BIOMOL}:M1` },
    ],
    correctValue: 'Phospholipids form the bilayer of every cell membrane — without them, cells could not exist',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIOMOL}:M1`],
    source: BIOMOL_SRC,
  },
]

// ─── bio.cell.cell-membrane-transport ────────────────────────────────────────
const MEMTRANS = 'bio.cell.cell-membrane-transport'
const MEMTRANS_SRC = 'docs/biology/kg/graph.json — bio.cell.cell-membrane-transport'
const MEMTRANS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEMTRANS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The fluid mosaic model describes the plasma membrane: a phospholipid bilayer with ' +
      'embedded proteins, all able to move laterally. Hydrophilic heads face outward; ' +
      'hydrophobic tails face inward. Transport across it: (1) Passive — diffusion (small ' +
      'nonpolar molecules move high→low concentration, no energy needed), osmosis (water ' +
      'moves by its own concentration gradient through aquaporins or directly through the ' +
      'bilayer), facilitated diffusion (ions and polar molecules move high→low via channel ' +
      'or carrier proteins, no energy). (2) Active — pumps move substances against their ' +
      'gradient using ATP; the Na+/K+ pump moves 3 Na+ out and 2 K+ in per ATP. ' +
      'Endocytosis/exocytosis move bulk cargo in vesicles.',
    targetedMisconceptions: [],
    source: MEMTRANS_SRC,
  },
  {
    conceptId: MEMTRANS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Osmosis is often described as "substances moving across a membrane," leading students ' +
      'to apply it to anything. Osmosis is specifically the movement of WATER (the solvent) ' +
      'across a selectively permeable membrane, driven by a water potential gradient — from ' +
      'high water potential (dilute solution) to low water potential (concentrated solution). ' +
      'Glucose, ions, and proteins do not move by osmosis — they use diffusion, facilitated ' +
      'diffusion, or active transport. A second confusion: active transport does not mean ' +
      '"fast" — it means against the concentration gradient, requiring ATP.',
    targetedMisconceptions: [`${MEMTRANS}:M1`],
    source: MEMTRANS_SRC,
  },
]
const MEMTRANS_PROBES: SeedProbe[] = [
  {
    conceptId: MEMTRANS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which process moves substances against their concentration gradient and requires ATP?',
    choices: [
      { text: 'Active transport', isCorrect: true },
      { text: 'Facilitated diffusion', isCorrect: false, misconceptionId: `${MEMTRANS}:M2` },
      { text: 'Osmosis', isCorrect: false },
      { text: 'Simple diffusion', isCorrect: false },
    ],
    correctValue: 'Active transport',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MEMTRANS}:M2`],
    source: MEMTRANS_SRC,
  },
  {
    conceptId: MEMTRANS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "glucose moves into cells by osmosis." What is wrong?',
    choices: [
      { text: 'Osmosis applies only to water — glucose enters by facilitated diffusion via carrier proteins', isCorrect: true },
      { text: 'Nothing — osmosis describes any substance crossing a membrane', isCorrect: false, misconceptionId: `${MEMTRANS}:M1` },
    ],
    correctValue: 'Osmosis applies only to water — glucose enters by facilitated diffusion via carrier proteins',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MEMTRANS}:M1`],
    source: MEMTRANS_SRC,
  },
]

// ─── bio.cell.nucleus-chromosomes ────────────────────────────────────────────
const NUCCHROM = 'bio.cell.nucleus-chromosomes'
const NUCCHROM_SRC = 'docs/biology/kg/graph.json — bio.cell.nucleus-chromosomes'
const NUCCHROM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUCCHROM, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The nucleus is bounded by the nuclear envelope — a double membrane punctuated by ' +
      'nuclear pores that regulate traffic in and out. Inside: the nucleolus (site of ' +
      'rRNA synthesis and ribosome assembly), and chromatin — DNA wrapped around histone ' +
      'proteins. When a cell prepares to divide, chromatin condenses into discrete ' +
      'chromosomes, each consisting of two sister chromatids joined at the centromere. ' +
      'Telomeres cap chromosome ends, preventing degradation. Humans have 46 chromosomes ' +
      '(23 pairs): 22 autosome pairs + 1 sex chromosome pair (XX female, XY male). The ' +
      'karyotype is the full set of an organism\'s chromosomes arranged by size.',
    targetedMisconceptions: [],
    source: NUCCHROM_SRC,
  },
  {
    conceptId: NUCCHROM, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A chromosome does not always have two chromatids. This is only true AFTER DNA ' +
      'replication (S phase of interphase) when each original chromosome has been copied ' +
      'into two identical sister chromatids joined at the centromere. Before replication, ' +
      'a chromosome is a single DNA molecule — one chromatid. After cell division, once ' +
      'chromatids separate into daughter cells, each is again called a chromosome (with one ' +
      'chromatid). The number 46 refers to chromosomes in a resting (G1) cell — in a ' +
      'dividing cell, 46 chromosomes, each with two chromatids, equals 92 chromatids total.',
    targetedMisconceptions: [`${NUCCHROM}:M1`],
    source: NUCCHROM_SRC,
  },
]
const NUCCHROM_PROBES: SeedProbe[] = [
  {
    conceptId: NUCCHROM, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What holds the two sister chromatids of a replicated chromosome together?',
    choices: [
      { text: 'Centromere', isCorrect: true },
      { text: 'Telomere', isCorrect: false, misconceptionId: `${NUCCHROM}:M2` },
      { text: 'Nucleolus', isCorrect: false },
      { text: 'Nuclear pore', isCorrect: false },
    ],
    correctValue: 'Centromere',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${NUCCHROM}:M2`],
    source: NUCCHROM_SRC,
  },
  {
    conceptId: NUCCHROM, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does a chromosome always consist of two chromatids?',
    choices: [
      { text: 'No — only after DNA replication; before replication a chromosome has just one chromatid', isCorrect: true },
      { text: 'Yes — a chromosome by definition always has two sister chromatids', isCorrect: false, misconceptionId: `${NUCCHROM}:M1` },
    ],
    correctValue: 'No — only after DNA replication; before replication a chromosome has just one chromatid',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NUCCHROM}:M1`],
    source: NUCCHROM_SRC,
  },
]

// ─── bio.cell.mitochondria-energy ────────────────────────────────────────────
const MITO = 'bio.cell.mitochondria-energy'
const MITO_SRC = 'docs/biology/kg/graph.json — bio.cell.mitochondria-energy'
const MITO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MITO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Mitochondria have a double membrane: smooth outer membrane and inner membrane folded ' +
      'into cristae (greatly increasing surface area for ATP synthesis). The matrix (interior ' +
      'fluid) contains the enzymes for the Krebs cycle and mitochondrial DNA. The inner ' +
      'membrane contains the electron transport chain and ATP synthase — the actual ATP ' +
      'production site. Mitochondria are semi-autonomous: they have their own circular DNA, ' +
      'ribosomes (70S, like bacteria), and divide by binary fission — evidence for the ' +
      'endosymbiotic theory (ancestral mitochondria were free-living alpha-proteobacteria ' +
      'engulfed by a host cell ~1.5 billion years ago).',
    targetedMisconceptions: [],
    source: MITO_SRC,
  },
  {
    conceptId: MITO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Mitochondria create energy" is a fundamental misstatement. Energy cannot be created ' +
      '— it is transformed. Mitochondria transform the chemical potential energy stored in ' +
      'glucose (and other fuel molecules) into ATP, a form of chemical energy cells can ' +
      'directly use. The energy originally came from the sun, was captured by plants in ' +
      'photosynthesis, stored in glucose, and is now released and recaptured as ATP. Every ' +
      'step is energy transformation, never energy creation. When ATP is used, the energy ' +
      'ultimately disperses as heat — consistent with the second law of thermodynamics.',
    targetedMisconceptions: [`${MITO}:M1`],
    source: MITO_SRC,
  },
]
const MITO_PROBES: SeedProbe[] = [
  {
    conceptId: MITO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In which compartment of the mitochondrion does the Krebs cycle occur?',
    choices: [
      { text: 'Matrix', isCorrect: true },
      { text: 'Inner membrane', isCorrect: false, misconceptionId: `${MITO}:M2` },
      { text: 'Cristae', isCorrect: false },
      { text: 'Outer membrane', isCorrect: false },
    ],
    correctValue: 'Matrix',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MITO}:M2`],
    source: MITO_SRC,
  },
  {
    conceptId: MITO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do mitochondria create energy?',
    choices: [
      { text: 'No — they transform chemical energy in glucose into ATP; energy is never created, only converted', isCorrect: true },
      { text: 'Yes — mitochondria generate new energy from ADP and phosphate', isCorrect: false, misconceptionId: `${MITO}:M1` },
    ],
    correctValue: 'No — they transform chemical energy in glucose into ATP; energy is never created, only converted',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MITO}:M1`],
    source: MITO_SRC,
  },
]

// ─── bio.cell.chloroplast-structure ───────────────────────────────────────────
const CHLORO = 'bio.cell.chloroplast-structure'
const CHLORO_SRC = 'docs/biology/kg/graph.json — bio.cell.chloroplast-structure'
const CHLORO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHLORO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Chloroplasts have a double membrane enclosing the stroma (fluid matrix). Inside ' +
      'the stroma: flattened membrane sacs called thylakoids, stacked into grana (singular: ' +
      'granum). Chlorophyll and other photosynthetic pigments sit in the thylakoid membranes. ' +
      'Light reactions occur in the thylakoid membranes (capturing light energy as ATP and ' +
      'NADPH). The Calvin cycle (dark reactions) occurs in the stroma, using that ATP and ' +
      'NADPH to fix CO2 into glucose. Like mitochondria, chloroplasts are semi-autonomous — ' +
      'own circular DNA, 70S ribosomes — evidence of endosymbiotic origin from ancient ' +
      'cyanobacteria.',
    targetedMisconceptions: [],
    source: CHLORO_SRC,
  },
  {
    conceptId: CHLORO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students assume photosynthesis produces oxygen "from CO2." The oxygen in photosynthesis ' +
      'actually comes from the splitting of WATER (H2O) in the light reactions — photolysis. ' +
      'The CO2 is reduced to sugar in the Calvin cycle, incorporating carbon into organic ' +
      'molecules. This distinction matters: heavy-isotope experiments (18O labelling) ' +
      'confirmed in the 1940s that the O2 released comes entirely from water, not CO2. ' +
      'Also: in darkness, chloroplasts still have the Calvin cycle enzymes but cannot run ' +
      'them without the ATP and NADPH supplied by the light reactions — so net photosynthesis ' +
      'is zero in complete darkness.',
    targetedMisconceptions: [`${CHLORO}:M1`],
    source: CHLORO_SRC,
  },
]
const CHLORO_PROBES: SeedProbe[] = [
  {
    conceptId: CHLORO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Where do the light-dependent reactions of photosynthesis occur within a chloroplast?',
    choices: [
      { text: 'Thylakoid membranes', isCorrect: true },
      { text: 'Stroma', isCorrect: false, misconceptionId: `${CHLORO}:M2` },
      { text: 'Outer membrane', isCorrect: false },
      { text: 'Nucleoid', isCorrect: false },
    ],
    correctValue: 'Thylakoid membranes',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CHLORO}:M2`],
    source: CHLORO_SRC,
  },
  {
    conceptId: CHLORO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Where does the oxygen released during photosynthesis come from?',
    choices: [
      { text: 'From the splitting of water molecules (photolysis), not from CO2', isCorrect: true },
      { text: 'From CO2 — the carbon is kept and the oxygen is released', isCorrect: false, misconceptionId: `${CHLORO}:M1` },
    ],
    correctValue: 'From the splitting of water molecules (photolysis), not from CO2',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CHLORO}:M1`],
    source: CHLORO_SRC,
  },
]

// ─── bio.cell.endomembrane-system ─────────────────────────────────────────────
const ENDO = 'bio.cell.endomembrane-system'
const ENDO_SRC = 'docs/biology/kg/graph.json — bio.cell.endomembrane-system'
const ENDO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENDO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The endomembrane system is an interconnected set of membranes that manufactures, ' +
      'modifies, packages, and ships proteins and lipids. Rough ER (studded with ribosomes) ' +
      'synthesises secretory and membrane proteins that thread into the ER lumen. Smooth ER ' +
      'synthesises lipids and detoxifies chemicals. Vesicles bud off and carry cargo to the ' +
      'Golgi apparatus — the cell\'s post office: it receives, modifies (glycosylates), sorts ' +
      'and dispatches proteins to the cell surface, lysosomes, or secretion. Lysosomes contain ' +
      'acid hydrolases for intracellular digestion. Vacuoles store water, nutrients, or waste ' +
      'products (central vacuole in plants maintains turgor).',
    targetedMisconceptions: [],
    source: ENDO_SRC,
  },
  {
    conceptId: ENDO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often think ribosomes "attach to the ER to work faster" or that the rough ' +
      'ER makes all proteins. In reality, only proteins destined for the secretory pathway ' +
      '(or cell membrane, or lysosomes) are made on ribosomes attached to the rough ER — ' +
      'the signal sequence at the protein\'s start directs the ribosome to dock on the ER. ' +
      'Cytoplasmic proteins (enzymes, cytoskeletal components) are made on free ribosomes ' +
      'and stay in the cytoplasm. The ER is not a protein factory for all proteins — it is ' +
      'a quality-control gateway specifically for proteins that need to exit the cytoplasm.',
    targetedMisconceptions: [`${ENDO}:M1`],
    source: ENDO_SRC,
  },
]
const ENDO_PROBES: SeedProbe[] = [
  {
    conceptId: ENDO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which organelle modifies, sorts, and dispatches proteins received from the endoplasmic reticulum?',
    choices: [
      { text: 'Golgi apparatus', isCorrect: true },
      { text: 'Lysosome', isCorrect: false, misconceptionId: `${ENDO}:M2` },
      { text: 'Smooth ER', isCorrect: false },
      { text: 'Vacuole', isCorrect: false },
    ],
    correctValue: 'Golgi apparatus',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ENDO}:M2`],
    source: ENDO_SRC,
  },
  {
    conceptId: ENDO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Are all proteins in a cell made on ribosomes attached to the rough ER?',
    choices: [
      { text: 'No — only secretory/membrane/lysosomal proteins; cytoplasmic proteins are made on free ribosomes', isCorrect: true },
      { text: 'Yes — all protein synthesis requires the rough ER', isCorrect: false, misconceptionId: `${ENDO}:M1` },
    ],
    correctValue: 'No — only secretory/membrane/lysosomal proteins; cytoplasmic proteins are made on free ribosomes',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENDO}:M1`],
    source: ENDO_SRC,
  },
]

// ─── bio.cell.cytoskeleton ────────────────────────────────────────────────────
const CYTO = 'bio.cell.cytoskeleton'
const CYTO_SRC = 'docs/biology/kg/graph.json — bio.cell.cytoskeleton'
const CYTO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CYTO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The cytoskeleton is a dynamic protein scaffold giving cells shape and enabling ' +
      'movement. Three types: microfilaments (actin filaments, 7 nm) — cell shape, ' +
      'muscle contraction, cytokinesis; microtubules (tubulin, 25 nm) — cell shape, ' +
      'intracellular transport highways (motor proteins walk along them), spindle ' +
      'formation in division, cilia and flagella structure; intermediate filaments ' +
      '(8-12 nm, tissue-specific) — structural reinforcement, nuclear lamina. ' +
      'Motor proteins (kinesin, dynein) use ATP to walk along microtubules carrying ' +
      'vesicle cargo. Cilia (short, many) and eukaryotic flagella (long, few) share ' +
      'the same 9+2 microtubule axoneme structure.',
    targetedMisconceptions: [],
    source: CYTO_SRC,
  },
  {
    conceptId: CYTO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The cytoskeleton sounds static — a skeleton holds things in fixed positions. ' +
      'The cytoskeleton is dynamic: actin and tubulin subunits are constantly added ' +
      'and removed. This dynamic instability is what allows a cell to change shape, ' +
      'crawl, divide, and reorganise its interior in response to signals. During ' +
      'mitosis, the spindle apparatus assembles from tubulin in minutes and then ' +
      'disassembles equally fast. A cell with a fixed, unchanging cytoskeleton could ' +
      'not move, divide, or respond to its environment. "Skeleton" is a misleading ' +
      'metaphor — "dynamic scaffold" is more accurate.',
    targetedMisconceptions: [`${CYTO}:M1`],
    source: CYTO_SRC,
  },
]
const CYTO_PROBES: SeedProbe[] = [
  {
    conceptId: CYTO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which cytoskeletal component forms the spindle fibres that pull chromosomes apart during cell division?',
    choices: [
      { text: 'Microtubules', isCorrect: true },
      { text: 'Microfilaments (actin)', isCorrect: false, misconceptionId: `${CYTO}:M2` },
      { text: 'Intermediate filaments', isCorrect: false },
    ],
    correctValue: 'Microtubules',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CYTO}:M2`],
    source: CYTO_SRC,
  },
  {
    conceptId: CYTO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is the cytoskeleton a fixed, rigid structure like a bone skeleton?',
    choices: [
      { text: 'No — it is a dynamic scaffold that constantly assembles and disassembles, enabling shape change and movement', isCorrect: true },
      { text: 'Yes — it provides a rigid fixed framework that maintains permanent cell shape', isCorrect: false, misconceptionId: `${CYTO}:M1` },
    ],
    correctValue: 'No — it is a dynamic scaffold that constantly assembles and disassembles, enabling shape change and movement',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CYTO}:M1`],
    source: CYTO_SRC,
  },
]

// ─── bio.cell.cell-signalling ─────────────────────────────────────────────────
const CELLSIG = 'bio.cell.cell-signalling'
const CELLSIG_SRC = 'docs/biology/kg/graph.json — bio.cell.cell-signalling'
const CELLSIG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CELLSIG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Cell signalling allows cells to communicate and coordinate. Sequence: (1) Signal ' +
      'molecule (ligand — hormone, neurotransmitter, growth factor) is released. ' +
      '(2) Receptor on target cell binds the ligand — surface receptors for hydrophilic ' +
      'signals (cannot cross membrane); intracellular receptors for hydrophobic signals ' +
      '(steroids cross the membrane). (3) Signal transduction: the binding event triggers ' +
      'a cascade of intracellular changes, often using second messengers (cAMP, Ca2+, ' +
      'IP3) to amplify the signal. (4) Cellular response — a change in gene expression, ' +
      'enzyme activity, or ion channel opening. Types: endocrine (hormones travel in blood), ' +
      'paracrine (local), autocrine (self), synaptic (nerve→target).',
    targetedMisconceptions: [],
    source: CELLSIG_SRC,
  },
  {
    conceptId: CELLSIG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A common assumption: a hormone or signal molecule goes directly into the cell and ' +
      'activates the response. For most hormones (peptides, proteins — insulin, adrenaline) ' +
      'this is wrong: they are too large and too hydrophilic to cross the membrane. They ' +
      'bind to a receptor ON THE SURFACE, and the receptor triggers an intracellular ' +
      'cascade using second messengers like cAMP. The hormone never enters the cell — it ' +
      'just knocks on the door, and the door opens the cellular machinery from inside. ' +
      'Only steroid hormones (lipid-soluble) and thyroid hormones diffuse directly through ' +
      'the membrane to act on intracellular receptors.',
    targetedMisconceptions: [`${CELLSIG}:M1`],
    source: CELLSIG_SRC,
  },
]
const CELLSIG_PROBES: SeedProbe[] = [
  {
    conceptId: CELLSIG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Insulin is a protein hormone. How does it affect target cells?',
    choices: [
      { text: 'By binding to a surface receptor, triggering an intracellular signalling cascade via second messengers', isCorrect: true },
      { text: 'By entering the cell and directly activating enzymes in the cytoplasm', isCorrect: false, misconceptionId: `${CELLSIG}:M1` },
    ],
    correctValue: 'By binding to a surface receptor, triggering an intracellular signalling cascade via second messengers',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CELLSIG}:M1`],
    source: CELLSIG_SRC,
  },
  {
    conceptId: CELLSIG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Which type of signal molecule can cross the plasma membrane and bind to intracellular receptors?',
    choices: [
      { text: 'Steroid hormones (hydrophobic/lipid-soluble)', isCorrect: true },
      { text: 'Protein hormones like insulin (hydrophilic)', isCorrect: false, misconceptionId: `${CELLSIG}:M1` },
    ],
    correctValue: 'Steroid hormones (hydrophobic/lipid-soluble)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CELLSIG}:M1`],
    source: CELLSIG_SRC,
  },
]

// ─── bio.cell.cell-cycle ──────────────────────────────────────────────────────
const CELLCYC = 'bio.cell.cell-cycle'
const CELLCYC_SRC = 'docs/biology/kg/graph.json — bio.cell.cell-cycle'
const CELLCYC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CELLCYC, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The cell cycle has two major phases. Interphase (~90% of the cycle): G1 ' +
      '(growth, protein synthesis), S (DNA synthesis — genome duplicated), G2 (growth, ' +
      'preparation for division). M phase: mitosis (nuclear division) + cytokinesis ' +
      '(cytoplasm division). Checkpoints patrol each transition: G1/S checkpoint (is ' +
      'DNA undamaged? enough nutrients?), G2/M checkpoint (is DNA fully replicated?), ' +
      'spindle assembly checkpoint (are all chromosomes attached to spindle?). Cyclin ' +
      'proteins accumulate and partner with CDKs (cyclin-dependent kinases) to drive ' +
      'transitions through checkpoints. Cancer often results from mutations disabling ' +
      'checkpoint proteins (tumour suppressors like p53).',
    targetedMisconceptions: [],
    source: CELLCYC_SRC,
  },
  {
    conceptId: CELLCYC, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often think a cell is "resting" during interphase. Interphase is actually ' +
      'the most metabolically active part of the cell cycle. In G1 the cell grows, ' +
      'synthesising proteins and organelles. In S phase it duplicates its entire 3-billion- ' +
      'base-pair genome — a massive biochemical task. G2 involves yet more growth and ' +
      'checking. The nucleus does not divide during interphase, but almost everything else ' +
      'is happening: interphase is preparation, not rest. Only the M phase (mitosis ' +
      'itself — prophase to telophase) involves the dramatic visible events of chromosome ' +
      'condensation and separation.',
    targetedMisconceptions: [`${CELLCYC}:M1`],
    source: CELLCYC_SRC,
  },
]
const CELLCYC_PROBES: SeedProbe[] = [
  {
    conceptId: CELLCYC, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During which phase of interphase is the cell\'s DNA replicated?',
    choices: [
      { text: 'S phase (synthesis phase)', isCorrect: true },
      { text: 'G1 phase', isCorrect: false, misconceptionId: `${CELLCYC}:M2` },
      { text: 'G2 phase', isCorrect: false },
      { text: 'M phase', isCorrect: false },
    ],
    correctValue: 'S phase (synthesis phase)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CELLCYC}:M2`],
    source: CELLCYC_SRC,
  },
  {
    conceptId: CELLCYC, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is a cell "resting" during interphase?',
    choices: [
      { text: 'No — interphase is the most active phase: the cell grows, synthesises proteins, and duplicates its entire genome', isCorrect: true },
      { text: 'Yes — the cell is resting and recovering before it divides', isCorrect: false, misconceptionId: `${CELLCYC}:M1` },
    ],
    correctValue: 'No — interphase is the most active phase: the cell grows, synthesises proteins, and duplicates its entire genome',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CELLCYC}:M1`],
    source: CELLCYC_SRC,
  },
]

// ─── bio.cell.mitosis ─────────────────────────────────────────────────────────
const MITOSIS = 'bio.cell.mitosis'
const MITOSIS_SRC = 'docs/biology/kg/graph.json — bio.cell.mitosis'
const MITOSIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MITOSIS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Mitosis produces two genetically identical daughter cells from one parent cell. ' +
      'Four stages: Prophase — chromosomes condense, spindle forms, nuclear envelope breaks ' +
      'down. Metaphase — chromosomes align at the cell equator (metaphase plate), each ' +
      'attached to spindle fibres from both poles at the centromere. Anaphase — centromeres ' +
      'split, sister chromatids pulled to opposite poles by shortening spindle fibres. ' +
      'Telophase — chromosomes arrive at poles, nuclear envelopes reform, chromosomes ' +
      'decondense. Cytokinesis (not technically a mitosis stage) divides the cytoplasm: ' +
      'cleavage furrow in animals, cell plate in plants. Result: 2 diploid (2n) cells.',
    targetedMisconceptions: [],
    source: MITOSIS_SRC,
  },
  {
    conceptId: MITOSIS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students confuse mitosis and meiosis because both involve chromosome separation. ' +
      'The key distinction: mitosis preserves chromosome number (2n → 2n × 2 cells); ' +
      'meiosis halves it (2n → n × 4 cells). Mitosis produces IDENTICAL cells for growth ' +
      'and repair. Meiosis produces GENETICALLY VARIED gametes for sexual reproduction. ' +
      'A human skin cell undergoing mitosis produces two 46-chromosome cells. A human ' +
      'testis cell undergoing meiosis produces four 23-chromosome cells, each genetically ' +
      'unique due to crossing over and independent assortment. Different purpose, different ' +
      'outcome, different mechanism.',
    targetedMisconceptions: [`${MITOSIS}:M1`],
    source: MITOSIS_SRC,
  },
]
const MITOSIS_PROBES: SeedProbe[] = [
  {
    conceptId: MITOSIS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During which stage of mitosis do sister chromatids separate and move to opposite poles?',
    choices: [
      { text: 'Anaphase', isCorrect: true },
      { text: 'Metaphase', isCorrect: false, misconceptionId: `${MITOSIS}:M2` },
      { text: 'Telophase', isCorrect: false },
      { text: 'Prophase', isCorrect: false },
    ],
    correctValue: 'Anaphase',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MITOSIS}:M2`],
    source: MITOSIS_SRC,
  },
  {
    conceptId: MITOSIS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A human cell (46 chromosomes) undergoes mitosis. How many chromosomes does each daughter cell have?',
    choices: [
      { text: '46 — mitosis preserves the chromosome number', isCorrect: true },
      { text: '23 — division must halve the chromosome number', isCorrect: false, misconceptionId: `${MITOSIS}:M1` },
    ],
    correctValue: '46 — mitosis preserves the chromosome number',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MITOSIS}:M1`],
    source: MITOSIS_SRC,
  },
]

// ─── bio.cell.meiosis ─────────────────────────────────────────────────────────
const MEIOSIS = 'bio.cell.meiosis'
const MEIOSIS_SRC = 'docs/biology/kg/graph.json — bio.cell.meiosis'
const MEIOSIS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEIOSIS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Meiosis is a two-division process (meiosis I then II) that halves the chromosome ' +
      'number and generates genetic diversity. Key events in meiosis I: homologous ' +
      'chromosomes pair (synapsis) and exchange segments (crossing over/recombination) at ' +
      'chiasmata — this shuffles alleles. Then homologs separate to opposite poles ' +
      '(reductional division: 2n → n). Meiosis II resembles mitosis: sister chromatids ' +
      'separate. Final result: 4 haploid (n) cells. Sources of variation: (1) crossing ' +
      'over (recombination), (2) independent assortment of homolog pairs — any of 2^23 ' +
      'combinations in humans. Sexual reproduction creates diversity that accelerates ' +
      'adaptation.',
    targetedMisconceptions: [],
    source: MEIOSIS_SRC,
  },
  {
    conceptId: MEIOSIS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The distinction between meiosis I and meiosis II trips students. Meiosis I is the ' +
      'REDUCTIONAL division — homologous chromosomes (different from each other in allele ' +
      'content) separate; chromosome number halves. Meiosis II is EQUATIONAL — sister ' +
      'chromatids (identical, joined at centromere) separate, exactly like mitosis. After ' +
      'meiosis I there are two haploid cells, each with replicated chromosomes. Only after ' +
      'meiosis II are there four haploid cells with unreplicated chromosomes. A common ' +
      'error: calling meiosis I "equational" because it superficially resembles cell ' +
      'division. What makes meiosis I reductional is the separation of non-identical ' +
      'homologs — not just any chromosomes.',
    targetedMisconceptions: [`${MEIOSIS}:M1`],
    source: MEIOSIS_SRC,
  },
]
const MEIOSIS_PROBES: SeedProbe[] = [
  {
    conceptId: MEIOSIS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which event in meiosis I is the primary source of genetic recombination between homologous chromosomes?',
    choices: [
      { text: 'Crossing over (exchange of segments between homologs at chiasmata)', isCorrect: true },
      { text: 'Independent assortment of sister chromatids', isCorrect: false, misconceptionId: `${MEIOSIS}:M2` },
      { text: 'DNA replication during S phase', isCorrect: false },
    ],
    correctValue: 'Crossing over (exchange of segments between homologs at chiasmata)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MEIOSIS}:M2`],
    source: MEIOSIS_SRC,
  },
  {
    conceptId: MEIOSIS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A diploid cell (2n=46) completes meiosis I. How many chromosomes does each resulting cell contain, and are they replicated?',
    choices: [
      { text: '23 chromosomes, each consisting of two sister chromatids (still replicated)', isCorrect: true },
      { text: '23 chromosomes, each a single chromatid (unreplicated)', isCorrect: false, misconceptionId: `${MEIOSIS}:M1` },
    ],
    correctValue: '23 chromosomes, each consisting of two sister chromatids (still replicated)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MEIOSIS}:M1`],
    source: MEIOSIS_SRC,
  },
]

// ─── bio.mol.carbohydrates-lipids ────────────────────────────────────────────
const CARBSLIP = 'bio.mol.carbohydrates-lipids'
const CARBSLIP_SRC = 'docs/biology/kg/graph.json — bio.mol.carbohydrates-lipids'
const CARBSLIP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CARBSLIP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Carbohydrates: monosaccharides (glucose, fructose, galactose — immediate energy); ' +
      'disaccharides (maltose, sucrose, lactose — two sugars joined by glycosidic bonds); ' +
      'polysaccharides — starch and glycogen (energy storage), cellulose (structural, ' +
      'plant cell walls), chitin (fungal walls, arthropod exoskeletons). All contain C, H, O ' +
      'in ~1:2:1 ratio. Lipids: triglycerides (three fatty acids + glycerol — energy storage, ' +
      '~2× energy density of carbohydrates); phospholipids (two fatty acids + glycerol + ' +
      'phosphate head — bilayer membranes); steroids (four-ring structure — cholesterol, ' +
      'steroid hormones); waxes (protective coatings on leaves, insects). Lipids are defined ' +
      'by being hydrophobic, not by having a common chemical structure.',
    targetedMisconceptions: [],
    source: CARBSLIP_SRC,
  },
  {
    conceptId: CARBSLIP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Starch and cellulose are both made of glucose — why are they so different? The ' +
      'linkage between glucose units differs: starch uses alpha-1,4 (and alpha-1,6) ' +
      'glycosidic bonds — a shape that coils into helices our enzymes (amylase) can ' +
      'digest. Cellulose uses beta-1,4 bonds — a shape that forms straight chains that ' +
      'hydrogen-bond into tough fibres. Humans lack cellulase (the enzyme for beta-1,4 ' +
      'bonds), so cellulose passes through us as dietary fibre. Same monomer, completely ' +
      'different function — determined entirely by which end of the glucose is connected ' +
      'to which. This is a perfect example of how chemical structure determines biological ' +
      'function.',
    targetedMisconceptions: [`${CARBSLIP}:M1`],
    source: CARBSLIP_SRC,
  },
]
const CARBSLIP_PROBES: SeedProbe[] = [
  {
    conceptId: CARBSLIP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which polysaccharide forms the structural component of plant cell walls?',
    choices: [
      { text: 'Cellulose', isCorrect: true },
      { text: 'Starch', isCorrect: false, misconceptionId: `${CARBSLIP}:M2` },
      { text: 'Glycogen', isCorrect: false },
      { text: 'Chitin', isCorrect: false },
    ],
    correctValue: 'Cellulose',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CARBSLIP}:M2`],
    source: CARBSLIP_SRC,
  },
  {
    conceptId: CARBSLIP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Starch and cellulose are both made of glucose. Why can humans digest starch but not cellulose?',
    choices: [
      { text: 'They have different glycosidic linkages (alpha vs beta) — humans lack the enzyme for beta-1,4 bonds', isCorrect: true },
      { text: 'Cellulose has different monomers — it contains fructose instead of glucose', isCorrect: false, misconceptionId: `${CARBSLIP}:M1` },
    ],
    correctValue: 'They have different glycosidic linkages (alpha vs beta) — humans lack the enzyme for beta-1,4 bonds',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CARBSLIP}:M1`],
    source: CARBSLIP_SRC,
  },
]

// ─── bio.mol.proteins-structure ───────────────────────────────────────────────
const PROTEINS = 'bio.mol.proteins-structure'
const PROTEINS_SRC = 'docs/biology/kg/graph.json — bio.mol.proteins-structure'
const PROTEINS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROTEINS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Proteins are polypeptides — chains of amino acids joined by peptide bonds between ' +
      'the amino group of one and the carboxyl group of the next. Four levels of structure: ' +
      'Primary — the amino acid sequence (determines everything else). Secondary — local ' +
      'regular shapes formed by hydrogen bonds along the backbone: alpha-helix, beta-sheet. ' +
      'Tertiary — the full 3D fold of the entire polypeptide, stabilised by R-group ' +
      'interactions (hydrophobic, ionic, disulfide bonds, H-bonds). Quaternary — two or ' +
      'more polypeptide chains together (e.g., haemoglobin: 4 chains). Denaturation ' +
      'disrupts secondary-quaternary structure (not the primary sequence), permanently ' +
      'or reversibly depending on conditions.',
    targetedMisconceptions: [],
    source: PROTEINS_SRC,
  },
  {
    conceptId: PROTEINS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Denaturation is often thought to "destroy the protein." It destroys the protein\'s ' +
      'SHAPE — not the primary structure (sequence). When you cook an egg, the albumin ' +
      'protein unfolds (tertiary/quaternary structure disrupted) and cannot refold under ' +
      'those conditions — irreversible. But the amino acid sequence is unchanged. Some ' +
      'proteins denature reversibly: chaperone proteins help them refold. An enzyme that ' +
      'is denatured loses its catalytic activity because the active site shape is lost — ' +
      'not because its amino acids are destroyed. The sequence remains; the function is ' +
      'gone.',
    targetedMisconceptions: [`${PROTEINS}:M1`],
    source: PROTEINS_SRC,
  },
]
const PROTEINS_PROBES: SeedProbe[] = [
  {
    conceptId: PROTEINS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which level of protein structure refers to the specific sequence of amino acids in a polypeptide chain?',
    choices: [
      { text: 'Primary structure', isCorrect: true },
      { text: 'Secondary structure', isCorrect: false, misconceptionId: `${PROTEINS}:M2` },
      { text: 'Tertiary structure', isCorrect: false },
      { text: 'Quaternary structure', isCorrect: false },
    ],
    correctValue: 'Primary structure',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PROTEINS}:M2`],
    source: PROTEINS_SRC,
  },
  {
    conceptId: PROTEINS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'When an enzyme is denatured by heat, what is destroyed?',
    choices: [
      { text: 'The three-dimensional shape (tertiary structure) — the amino acid sequence remains intact', isCorrect: true },
      { text: 'The amino acid sequence — heat breaks the peptide bonds', isCorrect: false, misconceptionId: `${PROTEINS}:M1` },
    ],
    correctValue: 'The three-dimensional shape (tertiary structure) — the amino acid sequence remains intact',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PROTEINS}:M1`],
    source: PROTEINS_SRC,
  },
]

// ─── bio.mol.nucleic-acid-structure ──────────────────────────────────────────
const NUCLSTRU = 'bio.mol.nucleic-acid-structure'
const NUCLSTRU_SRC = 'docs/biology/kg/graph.json — bio.mol.nucleic-acid-structure'
const NUCLSTRU_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUCLSTRU, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Nucleic acids are polymers of nucleotides. Each nucleotide: a pentose sugar (deoxyribose ' +
      'in DNA, ribose in RNA), a phosphate group, and a nitrogenous base. Bases in DNA: ' +
      'adenine (A), thymine (T), guanine (G), cytosine (C). RNA has uracil (U) instead of T. ' +
      'Watson-Crick double helix: two antiparallel DNA strands wound around each other, held ' +
      'by hydrogen bonds between complementary bases (A-T: 2 H-bonds; G-C: 3 H-bonds). ' +
      'Chargaff\'s rules: in any DNA, %A = %T and %G = %C, but %A+%T can differ from ' +
      '%G+%C (base composition varies by organism). RNA types: mRNA (carries genetic ' +
      'message), tRNA (carries amino acids), rRNA (forms ribosomes).',
    targetedMisconceptions: [],
    source: NUCLSTRU_SRC,
  },
  {
    conceptId: NUCLSTRU, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often write "A pairs with U in DNA" (confusing RNA and DNA rules) or assume ' +
      'the two strands of DNA run parallel. Both are wrong. In DNA: A-T and G-C (thymine ' +
      'in DNA, uracil only in RNA). The two strands are ANTIPARALLEL: one runs 5\'→3\', ' +
      'the other runs 3\'→5\'. This directionality is set by the sugar-phosphate backbone, ' +
      'not the bases. It matters enormously for replication: DNA polymerase can only add ' +
      'nucleotides to the 3\' end, forcing the lagging strand to be synthesised in fragments ' +
      '(Okazaki fragments). Get the antiparallel rule right and the rest of replication follows.',
    targetedMisconceptions: [`${NUCLSTRU}:M1`],
    source: NUCLSTRU_SRC,
  },
]
const NUCLSTRU_PROBES: SeedProbe[] = [
  {
    conceptId: NUCLSTRU, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a DNA double helix, adenine always pairs with which base?',
    choices: [
      { text: 'Thymine (T) — connected by 2 hydrogen bonds', isCorrect: true },
      { text: 'Uracil (U)', isCorrect: false, misconceptionId: `${NUCLSTRU}:M1` },
      { text: 'Cytosine (C)', isCorrect: false },
      { text: 'Guanine (G)', isCorrect: false },
    ],
    correctValue: 'Thymine (T) — connected by 2 hydrogen bonds',
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    targetedMisconceptions: [`${NUCLSTRU}:M1`],
    source: NUCLSTRU_SRC,
  },
  {
    conceptId: NUCLSTRU, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do the two strands of a DNA double helix run in the same direction (parallel)?',
    choices: [
      { text: 'No — they are antiparallel: one strand runs 5\'→3\' while the other runs 3\'→5\'', isCorrect: true },
      { text: 'Yes — both strands run 5\'→3\' in the same direction', isCorrect: false, misconceptionId: `${NUCLSTRU}:M2` },
    ],
    correctValue: 'No — they are antiparallel: one strand runs 5\'→3\' while the other runs 3\'→5\'',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NUCLSTRU}:M2`],
    source: NUCLSTRU_SRC,
  },
]

// ─── bio.mol.enzymes ──────────────────────────────────────────────────────────
const ENZYMES = 'bio.mol.enzymes'
const ENZYMES_SRC = 'docs/biology/kg/graph.json — bio.mol.enzymes'
const ENZYMES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENZYMES, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Enzymes are biological catalysts — proteins (mostly) that speed reactions by lowering ' +
      'activation energy without being consumed. Each enzyme has an active site with a ' +
      'specific shape that binds its substrate (induced fit model: both enzyme and substrate ' +
      'flex to fit). Factors affecting activity: temperature (optimum ~37°C for human ' +
      'enzymes — above: denaturation; below: slower kinetic energy); pH (each enzyme has ' +
      'an optimum — pepsin works at pH 2, trypsin at pH 8); substrate concentration ' +
      '(increases rate until all active sites are saturated — Vmax). Inhibition: ' +
      'competitive (inhibitor resembles substrate, blocks active site — reversible by ' +
      'more substrate); non-competitive (inhibitor binds allosteric site, changes active ' +
      'site shape — not reversed by more substrate).',
    targetedMisconceptions: [],
    source: ENZYMES_SRC,
  },
  {
    conceptId: ENZYMES, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often confuse competitive and non-competitive inhibition. The test: can ' +
      'adding MORE substrate overcome the inhibition? If yes, it is competitive — the ' +
      'inhibitor competes for the active site and more substrate wins out. If no, it is ' +
      'non-competitive — the inhibitor is bound elsewhere (allosteric site), permanently ' +
      'changing the active site shape regardless of how much substrate is present. ' +
      'Also: enzymes are NOT consumed in reactions. A single enzyme molecule can catalyse ' +
      'the same reaction millions of times. This is why cells only need tiny amounts of ' +
      'enzyme and why poisons like cyanide are so deadly — a tiny amount permanently ' +
      'blocks an enzyme used by millions of reactions.',
    targetedMisconceptions: [`${ENZYMES}:M1`],
    source: ENZYMES_SRC,
  },
]
const ENZYMES_PROBES: SeedProbe[] = [
  {
    conceptId: ENZYMES, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An inhibitor molecule binds to a site on an enzyme other than the active site, changing the enzyme\'s shape. Adding more substrate does NOT restore enzyme activity. What type of inhibition is this?',
    choices: [
      { text: 'Non-competitive inhibition', isCorrect: true },
      { text: 'Competitive inhibition', isCorrect: false, misconceptionId: `${ENZYMES}:M1` },
    ],
    correctValue: 'Non-competitive inhibition',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENZYMES}:M1`],
    source: ENZYMES_SRC,
  },
  {
    conceptId: ENZYMES, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Are enzymes consumed (used up) during the reactions they catalyse?',
    choices: [
      { text: 'No — enzymes are regenerated after each reaction and can be reused many times', isCorrect: true },
      { text: 'Yes — each enzyme molecule is used once and must be replaced', isCorrect: false, misconceptionId: `${ENZYMES}:M2` },
    ],
    correctValue: 'No — enzymes are regenerated after each reaction and can be reused many times',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ENZYMES}:M2`],
    source: ENZYMES_SRC,
  },
]

// ─── bio.evo.origin-of-life ───────────────────────────────────────────────────
const ORIGLIFE = 'bio.evo.origin-of-life'
const ORIGLIFE_SRC = 'docs/biology/kg/graph.json — bio.evo.origin-of-life'
const ORIGLIFE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ORIGLIFE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Life on Earth began roughly 3.8 billion years ago, but explaining HOW is a challenge ' +
      'because we cannot replay events. The leading framework is chemical evolution: simple ' +
      'inorganic molecules (water, ammonia, methane, CO2) in the early atmosphere and oceans ' +
      'formed progressively more complex organic molecules when energised by lightning, UV, or ' +
      'hydrothermal vents. The Miller-Urey experiment (1953) demonstrated that amino acids — ' +
      'the building blocks of proteins — form spontaneously from those simple starting materials. ' +
      'The RNA World hypothesis proposes that RNA preceded both proteins and DNA because RNA can ' +
      'both store information AND catalyse reactions, solving the chicken-and-egg puzzle of which ' +
      'came first. Once a molecule could copy itself inside a lipid membrane, natural selection ' +
      'could act — and life, as we now define it, had begun.',
    targetedMisconceptions: [],
    source: ORIGLIFE_SRC,
  },
  {
    conceptId: ORIGLIFE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A common confusion: "origin of life" is not the same as "evolution." Evolution explains ' +
      'how life CHANGED after it existed; origin of life explains how it started. Another: the ' +
      'theory of chemical evolution is NOT saying life emerged fully formed — it describes a ' +
      'gradual increase in molecular complexity over millions of years, from simple molecules ' +
      'to self-replicating ones, to membrane-enclosed replicators. The gap between "complex ' +
      'chemistry" and "simple life" remains an active research frontier, but that gap is not ' +
      'evidence against the theory — it is the question the theory is still answering.',
    targetedMisconceptions: [`${ORIGLIFE}:M1`],
    source: ORIGLIFE_SRC,
  },
]
const ORIGLIFE_PROBES: SeedProbe[] = [
  {
    conceptId: ORIGLIFE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The Miller-Urey experiment provided evidence for the origin of life by demonstrating that:',
    choices: [
      { text: 'Amino acids can form spontaneously from inorganic molecules under early-Earth conditions', isCorrect: true },
      { text: 'DNA can self-replicate without enzymes', isCorrect: false, misconceptionId: `${ORIGLIFE}:M2` },
      { text: 'Life arrived on Earth from space', isCorrect: false },
      { text: 'RNA was the first molecule to carry genetic information', isCorrect: false },
    ],
    correctValue: 'Amino acids can form spontaneously from inorganic molecules under early-Earth conditions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORIGLIFE}:M2`],
    source: ORIGLIFE_SRC,
  },
  {
    conceptId: ORIGLIFE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does the RNA World hypothesis propose that RNA preceded both DNA and proteins?',
    choices: [
      { text: 'RNA can both store genetic information AND catalyse chemical reactions, solving the chicken-and-egg problem', isCorrect: true },
      { text: 'RNA is more stable than DNA and therefore more likely to survive early-Earth conditions', isCorrect: false, misconceptionId: `${ORIGLIFE}:M3` },
    ],
    correctValue: 'RNA can both store genetic information AND catalyse chemical reactions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORIGLIFE}:M3`],
    source: ORIGLIFE_SRC,
  },
]

// ─── bio.evo.evidence-for-evolution ──────────────────────────────────────────
const EVOEVID = 'bio.evo.evidence-for-evolution'
const EVOEVID_SRC = 'docs/biology/kg/graph.json — bio.evo.evidence-for-evolution'
const EVOEVID_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EVOEVID, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Evolution is one of the most evidenced theories in all of science, supported by five ' +
      'independent lines of evidence that all point to the same conclusion. Fossil record: ' +
      'organisms in older rock layers are simpler; transitional forms (e.g., Archaeopteryx ' +
      'between dinosaurs and birds) document change. Comparative anatomy: homologous structures ' +
      '(same underlying bones in a human arm, bat wing, whale flipper) reveal common ancestry; ' +
      'vestigial structures (human tailbone, whale pelvis) are evolutionary leftovers. ' +
      'Comparative embryology: vertebrate embryos look nearly identical in early stages — ' +
      'gill slits and tails in human embryos reflect shared ancestry. Biogeography: island ' +
      'species resemble nearby mainland species, not geographically distant ones — distribution ' +
      'matches ancestry. Molecular biology: DNA sequences are most similar in closely related ' +
      'species; cytochrome c protein differs by 0 amino acids between humans and chimps, ' +
      'but by 45 between humans and yeast — exactly matching the fossil tree.',
    targetedMisconceptions: [],
    source: EVOEVID_SRC,
  },
  {
    conceptId: EVOEVID, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The phrase "just a theory" is the most damaging misconception in biology. In everyday ' +
      'speech, "theory" means a guess. In science, a theory is a well-tested explanation ' +
      'supported by extensive evidence — the opposite of a guess. Germ theory and gravitational ' +
      'theory are "just theories" by the same standard. Evolution\'s theory status means it has ' +
      'been tested against five independent evidence streams for 160 years and survived every ' +
      'test. A second misconception: "there are no transitional fossils." There are hundreds — ' +
      'Tiktaalik (fish-to-land-animal), Pakicetus (land-animal-to-whale), Archaeopteryx ' +
      '(dinosaur-to-bird). The complete absence of a fossil record would be surprising only ' +
      'because fossilisation is rare for soft-bodied organisms; the record we have is ' +
      'exactly what the theory predicts.',
    targetedMisconceptions: [`${EVOEVID}:M1`],
    source: EVOEVID_SRC,
  },
]
const EVOEVID_PROBES: SeedProbe[] = [
  {
    conceptId: EVOEVID, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The human arm, bat wing, and whale flipper have the same underlying bone arrangement. This is an example of:',
    choices: [
      { text: 'Homologous structures — evidence of common ancestry despite different functions', isCorrect: true },
      { text: 'Analogous structures — evidence of convergent evolution to similar environments', isCorrect: false, misconceptionId: `${EVOEVID}:M2` },
      { text: 'Vestigial structures — remnants of organs that have lost their original function', isCorrect: false },
      { text: 'Embryological evidence — similar structure visible only during development', isCorrect: false },
    ],
    correctValue: 'Homologous structures — evidence of common ancestry despite different functions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EVOEVID}:M2`],
    source: EVOEVID_SRC,
  },
  {
    conceptId: EVOEVID, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "evolution is just a theory, not a fact." What is wrong with this statement?',
    choices: [
      { text: 'In science, a "theory" is a well-tested explanation backed by extensive evidence — not a guess', isCorrect: true },
      { text: 'Nothing is wrong — evolution has not been tested rigorously enough to be called more than a theory', isCorrect: false, misconceptionId: `${EVOEVID}:M1` },
    ],
    correctValue: 'In science, a "theory" is a well-tested explanation backed by extensive evidence',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EVOEVID}:M1`],
    source: EVOEVID_SRC,
  },
]

// ─── bio.evo.natural-selection ────────────────────────────────────────────────
const NATSEL = 'bio.evo.natural-selection'
const NATSEL_SRC = 'docs/biology/kg/graph.json — bio.evo.natural-selection'
const NATSEL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NATSEL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Natural selection is Darwin\'s core mechanism for evolution. It works through four ' +
      'conditions, all of which must be true simultaneously. (1) Variation: individuals in a ' +
      'population differ from each other. (2) Heredity: variation is heritable — offspring ' +
      'resemble parents. (3) Differential reproduction: some variants survive and reproduce ' +
      'better than others in the current environment. (4) Time: over many generations, traits ' +
      'that improve survival become more common. Classic example: peppered moths before and ' +
      'after industrial pollution. Light moths were camouflaged on pale bark — predators ate ' +
      'fewer of them. When soot darkened the bark, dark moths survived better. No individual ' +
      'moth changed colour; the POPULATION shifted because dark moths left more offspring. ' +
      'Key insight: natural selection acts on existing variation — it cannot create new traits ' +
      'on demand. Mutation supplies new variation; selection sorts it.',
    targetedMisconceptions: [],
    source: NATSEL_SRC,
  },
  {
    conceptId: NATSEL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Three critical misconceptions about natural selection: (1) "Organisms evolve because ' +
      'they need to." Wrong — individual organisms do not evolve. Populations do, over ' +
      'generations, because heritable variants that improve survival are statistically more ' +
      'represented in each generation. No foresight, no intention. (2) "The fittest means ' +
      'the strongest." Wrong — "fitness" in biology means reproductive success in the current ' +
      'environment. A slower cheetah that avoids injury and lives to breed is fitter than a ' +
      'fast one that dies young. (3) "Acquired characteristics are inherited." A giraffe ' +
      'stretching its neck does not give its offspring a longer neck (Lamarck\'s error). ' +
      'Only heritable genetic variation matters to natural selection.',
    targetedMisconceptions: [`${NATSEL}:M1`, `${NATSEL}:M2`],
    source: NATSEL_SRC,
  },
]
const NATSEL_PROBES: SeedProbe[] = [
  {
    conceptId: NATSEL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a population of beetles, green beetles are better camouflaged on leaves than brown beetles. After several generations, the population is mostly green. What drove this change?',
    choices: [
      { text: 'Green beetles survived predation better and left more offspring, increasing the frequency of green alleles', isCorrect: true },
      { text: 'Brown beetles turned green because they needed to survive', isCorrect: false, misconceptionId: `${NATSEL}:M1` },
      { text: 'Green beetles were stronger and outcompeted brown beetles for food', isCorrect: false, misconceptionId: `${NATSEL}:M2` },
      { text: 'Mutation produced new green individuals every generation', isCorrect: false },
    ],
    correctValue: 'Green beetles survived predation better and left more offspring',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NATSEL}:M1`, `${NATSEL}:M2`],
    source: NATSEL_SRC,
  },
  {
    conceptId: NATSEL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "giraffes evolved longer necks because they kept stretching to reach high leaves, and this was passed to offspring." What is the error?',
    choices: [
      { text: 'Acquired characteristics during an organism\'s lifetime are not heritable — only genetic variation passed via reproduction matters', isCorrect: true },
      { text: 'There is no error — stretching creates heritable epigenetic changes', isCorrect: false, misconceptionId: `${NATSEL}:M3` },
    ],
    correctValue: 'Acquired characteristics during an organism\'s lifetime are not heritable',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${NATSEL}:M3`],
    source: NATSEL_SRC,
  },
]

// ─── bio.physio.respiratory-system ───────────────────────────────────────────
const RESP = 'bio.physio.respiratory-system'
const RESP_SRC = 'docs/biology/kg/graph.json — bio.physio.respiratory-system'
const RESP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RESP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The respiratory system has one job: exchange gases between the body and the environment — ' +
      'bring in O2, expel CO2. The design is optimised for this single function at every level. ' +
      'Airways (nose → trachea → bronchi → bronchioles) warm, filter, and route air. Alveoli — ' +
      'microscopic air sacs at the airway terminals — are where exchange actually happens. ' +
      'Their design maximises rate: enormous surface area (70 m² in adult lungs — the size of ' +
      'a tennis court), one-cell-thick walls (short diffusion distance), dense capillary network ' +
      '(steep concentration gradient maintained by blood flow). Ventilation (breathing) maintains ' +
      'the gradient by refreshing air: diaphragm contracts → thorax volume increases → pressure ' +
      'drops → air flows in (Boyle\'s law). Diffusion then moves O2 into blood and CO2 into ' +
      'alveolar air — passively, down concentration gradients, no energy needed for the ' +
      'exchange itself.',
    targetedMisconceptions: [],
    source: RESP_SRC,
  },
  {
    conceptId: RESP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common confusion: "we breathe in oxygen and breathe out carbon dioxide." Partly right ' +
      'but misleading. Exhaled air is still 16% O2 (inhaled is 21%) — you do not use up all ' +
      'the oxygen. You exhale LESS O2 and MORE CO2 than you inhale, because cells have consumed ' +
      'some O2 and produced CO2, which dissolved into blood and travels to the lungs. Second ' +
      'confusion: "breathing is caused by lungs expanding." The opposite is true — the lungs ' +
      'are passive elastic bags; they expand BECAUSE the diaphragm and rib muscles create ' +
      'lower pressure. The muscles drive breathing; the lungs follow.',
    targetedMisconceptions: [`${RESP}:M1`, `${RESP}:M2`],
    source: RESP_SRC,
  },
]
const RESP_PROBES: SeedProbe[] = [
  {
    conceptId: RESP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which structural feature of alveoli makes them efficient for gas exchange?',
    choices: [
      { text: 'One-cell-thick walls and a dense capillary network, giving a short diffusion distance and steep concentration gradient', isCorrect: true },
      { text: 'Thick muscular walls that actively pump gases into the bloodstream', isCorrect: false, misconceptionId: `${RESP}:M3` },
      { text: 'Large air volume that stores oxygen between breaths', isCorrect: false },
      { text: 'Mucus lining that dissolves oxygen before diffusion', isCorrect: false },
    ],
    correctValue: 'One-cell-thick walls and a dense capillary network',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RESP}:M3`],
    source: RESP_SRC,
  },
  {
    conceptId: RESP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What causes inhaled air to flow into the lungs during inhalation?',
    choices: [
      { text: 'The diaphragm contracts, increasing thorax volume and lowering air pressure, so air flows in down the pressure gradient', isCorrect: true },
      { text: 'The lungs expand actively, pulling air in like a suction pump', isCorrect: false, misconceptionId: `${RESP}:M2` },
    ],
    correctValue: 'The diaphragm contracts, increasing thorax volume and lowering air pressure',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${RESP}:M2`],
    source: RESP_SRC,
  },
]

// ─── bio.physio.circulatory-system ───────────────────────────────────────────
const CIRC = 'bio.physio.circulatory-system'
const CIRC_SRC = 'docs/biology/kg/graph.json — bio.physio.circulatory-system'
const CIRC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CIRC, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The circulatory system is a closed-loop transport network with three components: the ' +
      'heart (pump), blood vessels (pipes), and blood (fluid carrying cargo). Humans have ' +
      'double circulation — two loops running simultaneously through the same four-chambered ' +
      'heart. Pulmonary circulation: right ventricle → pulmonary arteries → lungs → pulmonary ' +
      'veins → left atrium. Here blood loses CO2 and gains O2. Systemic circulation: left ' +
      'ventricle → aorta → body tissues → vena cava → right atrium. Here O2 is delivered ' +
      'and CO2 collected. The four-chamber design keeps oxygenated and deoxygenated blood ' +
      'separate, maintaining the steep O2 gradient needed for efficient delivery. Arteries ' +
      'carry blood AWAY from the heart (thick walls, high pressure); veins return it TO ' +
      'the heart (thin walls, valves to prevent backflow); capillaries (one cell thick) ' +
      'are where all actual exchange with tissues occurs.',
    targetedMisconceptions: [],
    source: CIRC_SRC,
  },
  {
    conceptId: CIRC, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Arteries are not always oxygenated and veins are not always deoxygenated — this is ' +
      'the most common misconception in circulatory system biology. Arteries carry blood ' +
      'AWAY from the heart; veins carry blood TOWARD it. The pulmonary artery carries ' +
      'deoxygenated blood (away from the heart, toward the lungs); the pulmonary veins ' +
      'carry oxygenated blood (from the lungs, toward the heart). The rule is direction, ' +
      'not oxygen content. Second confusion: "the heart is a single pump." It is two pumps ' +
      'in one — the left side handles systemic circulation at high pressure; the right ' +
      'side handles pulmonary circulation at low pressure (so delicate lung capillaries ' +
      'are not damaged).',
    targetedMisconceptions: [`${CIRC}:M1`],
    source: CIRC_SRC,
  },
]
const CIRC_PROBES: SeedProbe[] = [
  {
    conceptId: CIRC, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The pulmonary artery carries blood from the heart to the lungs. What type of blood does it carry?',
    choices: [
      { text: 'Deoxygenated blood — because arteries carry blood AWAY from the heart, regardless of oxygen content', isCorrect: true },
      { text: 'Oxygenated blood — because arteries always carry oxygenated blood', isCorrect: false, misconceptionId: `${CIRC}:M1` },
      { text: 'A mixture of oxygenated and deoxygenated blood', isCorrect: false },
      { text: 'Blood with no oxygen at all', isCorrect: false },
    ],
    correctValue: 'Deoxygenated blood — arteries carry blood away from the heart',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CIRC}:M1`],
    source: CIRC_SRC,
  },
  {
    conceptId: CIRC, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why do humans need four heart chambers rather than two?',
    choices: [
      { text: 'Four chambers keep oxygenated and deoxygenated blood separate, maintaining the steep O2 gradient needed for efficient delivery', isCorrect: true },
      { text: 'Four chambers pump more volume — two chambers would not generate enough blood flow', isCorrect: false, misconceptionId: `${CIRC}:M2` },
    ],
    correctValue: 'Four chambers keep oxygenated and deoxygenated blood separate',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CIRC}:M2`],
    source: CIRC_SRC,
  },
]

// ─── bio.physio.immune-system-intro ──────────────────────────────────────────
const IMMUNINTRO = 'bio.physio.immune-system-intro'
const IMMUNINTRO_SRC = 'docs/biology/kg/graph.json — bio.physio.immune-system-intro'
const IMMUNINTRO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IMMUNINTRO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The immune system defends the body against pathogens (bacteria, viruses, fungi, parasites) ' +
      'using two overlapping defence strategies. Innate immunity is the fast, non-specific first ' +
      'responder — it responds the same way to any pathogen within minutes to hours. Components: ' +
      'physical barriers (skin, mucus, cilia), inflammation, fever, phagocytes (neutrophils, ' +
      'macrophages that engulf and destroy invaders), and natural killer cells. Adaptive immunity ' +
      'is the slow, specific second responder — it takes days to weeks but produces a response ' +
      'tailored to ONE specific pathogen. B cells produce antibodies that bind to specific ' +
      'antigens; T cells coordinate the response and destroy infected cells directly. Crucially, ' +
      'adaptive immunity remembers: after clearing an infection, memory B and T cells persist ' +
      'so a second encounter triggers a much faster response. This immunological memory is the ' +
      'principle behind vaccination.',
    targetedMisconceptions: [],
    source: IMMUNINTRO_SRC,
  },
  {
    conceptId: IMMUNINTRO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common misconception: "antibiotics treat all infections." Antibiotics kill bacteria — ' +
      'they have zero effect on viruses (colds, flu, COVID). Taking antibiotics for a viral ' +
      'infection does nothing to the virus; it only harms beneficial gut bacteria and ' +
      'contributes to antibiotic resistance. Second misconception: "once you are immune, ' +
      'you cannot get the disease again." This is true for some diseases (measles) but not ' +
      'others. Immunity wanes over time; some pathogens (like influenza) mutate their surface ' +
      'antigens rapidly, making previous antibodies ineffective against new strains. ' +
      'Third: "inflammation is bad." Acute inflammation is a protective response — ' +
      'increased blood flow, swelling, and phagocyte recruitment that contains and ' +
      'clears infection. Chronic inflammation is harmful; acute inflammation is essential.',
    targetedMisconceptions: [`${IMMUNINTRO}:M1`, `${IMMUNINTRO}:M2`],
    source: IMMUNINTRO_SRC,
  },
]
const IMMUNINTRO_PROBES: SeedProbe[] = [
  {
    conceptId: IMMUNINTRO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which feature of adaptive immunity explains why vaccines work?',
    choices: [
      { text: 'Memory B and T cells persist after an infection, enabling a faster and stronger response to a second encounter', isCorrect: true },
      { text: 'Antibodies produced during vaccination remain in the blood permanently at high concentrations', isCorrect: false, misconceptionId: `${IMMUNINTRO}:M3` },
      { text: 'The innate immune system learns to recognise specific pathogens after vaccination', isCorrect: false },
      { text: 'Vaccines directly kill pathogens before they can cause disease', isCorrect: false },
    ],
    correctValue: 'Memory B and T cells persist, enabling a faster response to a second encounter',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IMMUNINTRO}:M3`],
    source: IMMUNINTRO_SRC,
  },
  {
    conceptId: IMMUNINTRO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student has a cold (caused by a rhinovirus). Their doctor does not prescribe antibiotics. Why?',
    choices: [
      { text: 'Antibiotics kill bacteria, not viruses — prescribing them for a viral infection has no therapeutic effect', isCorrect: true },
      { text: 'The patient\'s immune system is too weak to respond to antibiotics at the same time', isCorrect: false, misconceptionId: `${IMMUNINTRO}:M1` },
    ],
    correctValue: 'Antibiotics kill bacteria, not viruses',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${IMMUNINTRO}:M1`],
    source: IMMUNINTRO_SRC,
  },
]

// ─── bio.plant.plant-water-relations ─────────────────────────────────────────
const PLWATER = 'bio.plant.plant-water-relations'
const PLWATER_SRC = 'docs/biology/kg/graph.json — bio.plant.plant-water-relations'
const PLWATER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PLWATER, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Plants move water from roots to leaves against gravity — up to 100 metres in the tallest ' +
      'trees — without a pump. The mechanism is the cohesion-tension theory. Transpiration ' +
      '(evaporation of water from leaf stomata) creates tension — a pulling force — at the ' +
      'top of the water column inside xylem vessels. Water molecules stick to each other ' +
      '(cohesion, due to hydrogen bonds) and to xylem walls (adhesion), so the entire ' +
      'column moves up as a continuous string when pulled at the top. Water enters roots ' +
      'by osmosis down a water potential gradient from soil (high water potential) into ' +
      'root hair cells (lower water potential). The driving force is ultimately solar energy ' +
      'via transpiration — no metabolic energy is spent by the plant on the actual upward ' +
      'water movement. Stomata control the rate: open → fast transpiration and CO2 entry ' +
      'for photosynthesis; closed → water conserved but photosynthesis stops.',
    targetedMisconceptions: [],
    source: PLWATER_SRC,
  },
  {
    conceptId: PLWATER, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "water is pumped up the plant." No pump exists. Water moves upward because ' +
      'transpiration creates a tension that pulls the entire cohesive water column. Removing ' +
      'the leaves stops water movement immediately — the pull is lost. Second confusion: ' +
      '"stomata open to let water in." Stomata are primarily for GAS exchange (CO2 in, O2 out ' +
      'for photosynthesis) — water loss through them is unavoidable but secondary. Guard cells ' +
      'control stomatal aperture via osmosis: when turgid (water-filled) they bow open; when ' +
      'flaccid (water-lost, during drought) they collapse shut, conserving water at the cost ' +
      'of stopping photosynthesis.',
    targetedMisconceptions: [`${PLWATER}:M1`, `${PLWATER}:M2`],
    source: PLWATER_SRC,
  },
]
const PLWATER_PROBES: SeedProbe[] = [
  {
    conceptId: PLWATER, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the driving force for water movement from roots to leaves in a plant?',
    choices: [
      { text: 'Transpiration from leaves creates tension that pulls the cohesive water column upward through xylem', isCorrect: true },
      { text: 'Root pressure actively pumps water upward using metabolic energy', isCorrect: false, misconceptionId: `${PLWATER}:M1` },
      { text: 'Osmosis in leaf cells directly pulls water from the roots', isCorrect: false },
      { text: 'Capillary action in narrow xylem vessels is sufficient to raise water to the leaves', isCorrect: false },
    ],
    correctValue: 'Transpiration creates tension that pulls the cohesive water column upward',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PLWATER}:M1`],
    source: PLWATER_SRC,
  },
  {
    conceptId: PLWATER, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'During a drought, stomata close. What is the direct cost of this water-conserving response?',
    choices: [
      { text: 'Photosynthesis slows or stops because CO2 can no longer enter the leaf', isCorrect: true },
      { text: 'Water cannot be absorbed by roots because transpiration has stopped', isCorrect: false, misconceptionId: `${PLWATER}:M3` },
    ],
    correctValue: 'Photosynthesis slows or stops because CO2 can no longer enter the leaf',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PLWATER}:M3`],
    source: PLWATER_SRC,
  },
]

// ─── bio.micro.microbial-growth-culture ──────────────────────────────────────
const MICGROW = 'bio.micro.microbial-growth-culture'
const MICGROW_SRC = 'docs/biology/kg/graph.json — bio.micro.microbial-growth-culture'
const MICGROW_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MICGROW, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Microbial growth means increase in population number, not increase in cell size. In a ' +
      'closed system (batch culture), bacterial populations follow a predictable four-phase ' +
      'growth curve. Lag phase: bacteria adjust to the new medium, synthesising enzymes — no ' +
      'net growth yet. Exponential (log) phase: bacteria divide at maximum rate by binary ' +
      'fission; each division doubles the population, so numbers increase geometrically ' +
      '(2→4→8→16...). Stationary phase: nutrients deplete and waste products accumulate; ' +
      'cell death equals cell division — population plateaus. Death (decline) phase: deaths ' +
      'exceed divisions as resources run out. Culturing microbes requires sterile technique ' +
      '(preventing contamination), appropriate media (nutrients), correct pH, temperature, ' +
      'and for aerobes vs. anaerobes, the right oxygen level. Aseptic technique is essential ' +
      'in all laboratory microbiological work.',
    targetedMisconceptions: [],
    source: MICGROW_SRC,
  },
  {
    conceptId: MICGROW, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common confusion: "bacteria grow slowly." In optimal conditions, E. coli divides every ' +
      '20 minutes. Starting from 1 cell, after 7 hours there are over 2 million cells — purely ' +
      'from doubling. This exponential growth is why food safety (refrigeration slowing growth, ' +
      'cooking killing bacteria) matters so much. Second confusion: "stationary phase means ' +
      'bacteria stop reproducing." Division continues — it is balanced by death. The plateau is ' +
      'dynamic, not static. Third: "sterilisation and disinfection are the same." Sterilisation ' +
      'kills ALL microorganisms including spores; disinfection reduces microbial load to safe ' +
      'levels but may not eliminate spores. Autoclaving achieves sterilisation; bleach ' +
      'achieves disinfection.',
    targetedMisconceptions: [`${MICGROW}:M1`],
    source: MICGROW_SRC,
  },
]
const MICGROW_PROBES: SeedProbe[] = [
  {
    conceptId: MICGROW, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During which phase of bacterial growth does population size increase geometrically (most rapidly)?',
    choices: [
      { text: 'Exponential (log) phase — cells are dividing at maximum rate by binary fission', isCorrect: true },
      { text: 'Lag phase — bacteria are adjusting to the new environment', isCorrect: false },
      { text: 'Stationary phase — nutrients are still plentiful', isCorrect: false, misconceptionId: `${MICGROW}:M2` },
      { text: 'Death phase — stress triggers burst reproduction before collapse', isCorrect: false },
    ],
    correctValue: 'Exponential (log) phase',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MICGROW}:M2`],
    source: MICGROW_SRC,
  },
  {
    conceptId: MICGROW, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In stationary phase, the total number of bacteria is not increasing. What is happening?',
    choices: [
      { text: 'Cell division continues but equals cell death — growth and death are balanced, not both stopped', isCorrect: true },
      { text: 'All bacteria have entered a dormant state and stopped reproducing entirely', isCorrect: false, misconceptionId: `${MICGROW}:M1` },
    ],
    correctValue: 'Cell division continues but equals cell death',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MICGROW}:M1`],
    source: MICGROW_SRC,
  },
]

// ─── bio.micro.pathogenic-microbes ───────────────────────────────────────────
const PATHMIC = 'bio.micro.pathogenic-microbes'
const PATHMIC_SRC = 'docs/biology/kg/graph.json — bio.micro.pathogenic-microbes'
const PATHMIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PATHMIC, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Pathogens are microorganisms that cause disease. The major groups differ in structure, ' +
      'treatment, and mechanism. Bacteria: single-celled prokaryotes; cause TB, cholera, ' +
      'pneumonia; treatable with antibiotics that target prokaryotic features (cell wall, ' +
      '70S ribosome) absent from host cells. Viruses: not cells at all — a protein coat ' +
      '(capsid) around genetic material (DNA or RNA); cause influenza, HIV, measles; require ' +
      'antiviral drugs or vaccines (antibiotics do nothing). Fungi: eukaryotes; cause athlete\'s ' +
      'foot, candidiasis, aspergillosis; treated with antifungals (harder to target because ' +
      'fungi are eukaryotes like us). Protists: eukaryotes; cause malaria (Plasmodium), ' +
      'sleeping sickness (Trypanosoma). Prions: misfolded proteins; cause CJD, BSE; no nucleic ' +
      'acid and essentially untreatable. Each group requires a different treatment ' +
      'strategy because each has a different biology to target.',
    targetedMisconceptions: [],
    source: PATHMIC_SRC,
  },
  {
    conceptId: PATHMIC, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The single most important misconception: "antibiotics treat infections." Antibiotics ' +
      'treat BACTERIAL infections only. Prescribing them for viral infections (colds, flu, ' +
      'most sore throats) is medically useless and contributes to antibiotic resistance — ' +
      'one of the most serious global health threats. Why is antibiotic resistance so ' +
      'dangerous? In a bacterial population, rare resistant variants survive treatment. ' +
      'Those variants reproduce, making the next generation predominantly resistant. ' +
      'This is natural selection operating in real-time. Completing antibiotic courses ' +
      '(even when feeling better) is critical because stopping early kills the sensitive ' +
      'bacteria but leaves behind any partially-resistant ones, which then breed.',
    targetedMisconceptions: [`${PATHMIC}:M1`],
    source: PATHMIC_SRC,
  },
]
const PATHMIC_PROBES: SeedProbe[] = [
  {
    conceptId: PATHMIC, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why can antibiotics kill bacteria without harming human cells?',
    choices: [
      { text: 'Antibiotics target features found only in prokaryotes (like the bacterial cell wall or 70S ribosomes) that are absent from human cells', isCorrect: true },
      { text: 'Human cells are too large for antibiotics to enter', isCorrect: false, misconceptionId: `${PATHMIC}:M2` },
      { text: 'The immune system protects human cells from antibiotic damage', isCorrect: false },
      { text: 'Antibiotics are diluted to safe concentrations before reaching human cells', isCorrect: false },
    ],
    correctValue: 'Antibiotics target prokaryotic features absent from human cells',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PATHMIC}:M2`],
    source: PATHMIC_SRC,
  },
  {
    conceptId: PATHMIC, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A patient with influenza (viral) is prescribed antibiotics by a worried relative. Is this appropriate?',
    choices: [
      { text: 'No — antibiotics have no effect on viruses; they only affect bacteria', isCorrect: true },
      { text: 'Yes — antibiotics boost the immune system to fight any infection including viral ones', isCorrect: false, misconceptionId: `${PATHMIC}:M1` },
    ],
    correctValue: 'No — antibiotics have no effect on viruses',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PATHMIC}:M1`],
    source: PATHMIC_SRC,
  },
]

// ─── bio.eco.nutrient-cycling ─────────────────────────────────────────────────
const NUTCYCLE = 'bio.eco.nutrient-cycling'
const NUTCYCLE_SRC = 'docs/biology/kg/graph.json — bio.eco.nutrient-cycling'
const NUTCYCLE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NUTCYCLE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Nutrients cycle through ecosystems indefinitely — the same carbon, nitrogen, and ' +
      'phosphorus atoms move repeatedly between living organisms, the atmosphere, soil, ' +
      'and water. Carbon cycle: CO2 from the atmosphere is fixed by photosynthesis into ' +
      'organic compounds; returned by respiration, decomposition, and combustion. ' +
      'Nitrogen cycle: N2 gas (78% of atmosphere) cannot be used directly by most organisms. ' +
      'Nitrogen-fixing bacteria (in soil and root nodules of legumes) convert N2 → ammonia ' +
      '(NH3). Nitrifying bacteria convert NH3 → nitrites → nitrates (the form plants absorb). ' +
      'Animals get nitrogen by eating plants or other animals. Decomposers return nitrogen to ' +
      'soil when organisms die. Denitrifying bacteria return nitrogen to the atmosphere as N2, ' +
      'completing the cycle. The key principle: matter is not created or destroyed — it cycles. ' +
      'Energy, by contrast, flows one-way through ecosystems (lost as heat at each trophic level).',
    targetedMisconceptions: [],
    source: NUTCYCLE_SRC,
  },
  {
    conceptId: NUTCYCLE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "energy also cycles through ecosystems." Energy does NOT cycle — it flows ' +
      'one-way and is lost as heat at every energy transfer. Only about 10% of energy passes ' +
      'from one trophic level to the next; the rest is lost as metabolic heat. This is why ' +
      'food chains are short (energy runs out) and why there are far more producers than top ' +
      'predators. MATTER cycles; ENERGY flows. Second confusion: "plants get their mass from ' +
      'soil." Plants get most of their mass from CO2 in the air, fixed by photosynthesis into ' +
      'glucose. Soil provides minerals (nitrogen, phosphorus, etc.) but very little mass. ' +
      'A tree\'s wood is mostly carbon from CO2, not carbon from soil.',
    targetedMisconceptions: [`${NUTCYCLE}:M1`, `${NUTCYCLE}:M2`],
    source: NUTCYCLE_SRC,
  },
]
const NUTCYCLE_PROBES: SeedProbe[] = [
  {
    conceptId: NUTCYCLE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why are nitrogen-fixing bacteria essential to most ecosystems?',
    choices: [
      { text: 'They convert atmospheric N2 into ammonia, making nitrogen available in a form that plants can absorb', isCorrect: true },
      { text: 'They directly supply nitrogen to plants through root contact', isCorrect: false, misconceptionId: `${NUTCYCLE}:M3` },
      { text: 'They decompose dead organisms and return nitrogen to the atmosphere', isCorrect: false },
      { text: 'They prevent nitrogen from being lost from the ecosystem', isCorrect: false },
    ],
    correctValue: 'They convert atmospheric N2 into ammonia that plants can absorb',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NUTCYCLE}:M3`],
    source: NUTCYCLE_SRC,
  },
  {
    conceptId: NUTCYCLE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "energy cycles through ecosystems just like carbon does." What is wrong with this?',
    choices: [
      { text: 'Energy flows one-way and is lost as heat at each trophic level; only matter (like carbon) cycles', isCorrect: true },
      { text: 'Nothing — both energy and carbon are cycled by decomposers back to producers', isCorrect: false, misconceptionId: `${NUTCYCLE}:M1` },
    ],
    correctValue: 'Energy flows one-way and is lost as heat; matter cycles but energy does not',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${NUTCYCLE}:M1`],
    source: NUTCYCLE_SRC,
  },
]

// ─── bio.eco.biodiversity-conservation ───────────────────────────────────────
const BIODIV = 'bio.eco.biodiversity-conservation'
const BIODIV_SRC = 'docs/biology/kg/graph.json — bio.eco.biodiversity-conservation'
const BIODIV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIODIV, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Biodiversity is the variety of life on Earth, measured at three levels: genetic ' +
      '(variation within species), species (number and evenness of species in an area), ' +
      'and ecosystem (variety of habitats and ecological communities). Biodiversity matters ' +
      'for three reasons. Ecological: diverse ecosystems are more stable and resilient — ' +
      'multiple species can fill each ecological role, so one extinction does not cause ' +
      'system collapse. Economic: wild species are the source of medicines (40% of ' +
      'pharmaceuticals derive from natural compounds), food security (genetic diversity in ' +
      'crops buffers against disease), and ecosystem services (pollination, water filtration, ' +
      'carbon storage). Ethical: many argue living species have intrinsic value independent ' +
      'of human use. The current extinction rate is estimated at 100-1000× the natural ' +
      'background rate — driven by habitat loss, invasive species, overexploitation, climate ' +
      'change, and pollution (HIPCO). Conservation strategies: in-situ (protected areas, ' +
      'national parks) and ex-situ (zoos, seed banks, botanical gardens).',
    targetedMisconceptions: [],
    source: BIODIV_SRC,
  },
  {
    conceptId: BIODIV, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A persistent misconception: "extinction is natural, so why worry?" Background ' +
      'extinction (one species per million per year) has always occurred. The current ' +
      'rate is 100-1000 times higher and is human-driven — primarily habitat destruction. ' +
      'Pace matters: natural extinction is slow enough for evolutionary recovery; the ' +
      'current rate is not. Second: "one species lost doesn\'t matter." Keystone species ' +
      'have impacts disproportionate to their numbers — removing wolves from Yellowstone ' +
      'allowed elk to overgraze river banks, causing riverbank erosion, which altered water ' +
      'temperature, which affected fish. Ecosystem interconnections mean single removals ' +
      'can cascade unpredictably.',
    targetedMisconceptions: [`${BIODIV}:M1`],
    source: BIODIV_SRC,
  },
]
const BIODIV_PROBES: SeedProbe[] = [
  {
    conceptId: BIODIV, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which of the following is an example of in-situ conservation?',
    choices: [
      { text: 'Establishing a national park to protect a habitat and its species in their natural environment', isCorrect: true },
      { text: 'Keeping endangered species in a zoo breeding programme', isCorrect: false, misconceptionId: `${BIODIV}:M2` },
      { text: 'Storing seeds of crop varieties in a seed bank', isCorrect: false },
      { text: 'Transplanting animals from a degraded habitat to a zoo', isCorrect: false },
    ],
    correctValue: 'Establishing a national park — protection in the natural environment',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIODIV}:M2`],
    source: BIODIV_SRC,
  },
  {
    conceptId: BIODIV, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "extinction has always happened naturally, so the current mass extinction is not a crisis." What is wrong with this reasoning?',
    choices: [
      { text: 'The current rate is 100-1000× the natural background rate and is human-driven, not part of normal evolutionary cycling', isCorrect: true },
      { text: 'Nothing — natural selection ensures that new species will evolve to replace extinct ones quickly', isCorrect: false, misconceptionId: `${BIODIV}:M1` },
    ],
    correctValue: 'The current rate is 100-1000× higher than natural and is human-driven',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BIODIV}:M1`],
    source: BIODIV_SRC,
  },
]

// ─── bio.eco.environmental-issues ────────────────────────────────────────────
const ENVISS = 'bio.eco.environmental-issues'
const ENVISS_SRC = 'docs/biology/kg/graph.json — bio.eco.environmental-issues'
const ENVISS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENVISS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Contemporary environmental issues arise from human activities disrupting ecosystem ' +
      'function at a global scale. Climate change: burning fossil fuels increases atmospheric ' +
      'CO2, enhancing the greenhouse effect and warming the planet — altering precipitation ' +
      'patterns, sea level, and phenological timing (species timing of breeding/migration). ' +
      'Ozone depletion: CFCs (refrigerants) destroy stratospheric ozone, which filters UV ' +
      'radiation — more UV reaches Earth, damaging DNA and increasing skin cancer and ' +
      'cataracts. The Montreal Protocol (1989) phasing out CFCs is a conservation success ' +
      'story: ozone is recovering. Eutrophication: excess nitrogen and phosphorus (from ' +
      'agricultural runoff) cause algal blooms; algae die and decomposers use up dissolved ' +
      'oxygen, creating dead zones where fish cannot survive. Deforestation: removes carbon ' +
      'sinks, destroys habitat (biodiversity loss), disrupts water cycles, and causes soil ' +
      'erosion. These issues are interconnected — solving one requires understanding all.',
    targetedMisconceptions: [],
    source: ENVISS_SRC,
  },
  {
    conceptId: ENVISS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two persistent confusions. (1) "The ozone hole and climate change are the same thing." ' +
      'They are separate problems with different mechanisms. Ozone depletion: CFCs destroy ' +
      'ozone molecules in the stratosphere, reducing UV filtration — a chemistry problem solved ' +
      'primarily by banning CFCs. Climate change: CO2 and other greenhouse gases trap infrared ' +
      'radiation in the lower atmosphere — an energy balance problem requiring reducing ' +
      'fossil fuel use. Fixing ozone does not fix climate change and vice versa. ' +
      '(2) "Eutrophication adds nutrients so must help aquatic life." It initially does — ' +
      'algae bloom explosively. But when algae die and decomposers break them down, ' +
      'oxygen is consumed faster than it can be replenished, creating hypoxic water ' +
      'where most aquatic animals die. More algae → less oxygen → less life overall.',
    targetedMisconceptions: [`${ENVISS}:M1`, `${ENVISS}:M2`],
    source: ENVISS_SRC,
  },
]
const ENVISS_PROBES: SeedProbe[] = [
  {
    conceptId: ENVISS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Eutrophication from agricultural runoff leads to fish kills in lakes. What is the sequence of events?',
    choices: [
      { text: 'Excess nutrients → algal bloom → algae die → decomposers consume dissolved oxygen → fish suffocate', isCorrect: true },
      { text: 'Excess nutrients → algae poisonous to fish → fish die from toxins', isCorrect: false, misconceptionId: `${ENVISS}:M3` },
      { text: 'Excess nutrients → water becomes too acidic for fish to survive', isCorrect: false },
      { text: 'Excess nutrients → algae block sunlight → phytoplankton die → food chain collapses', isCorrect: false },
    ],
    correctValue: 'Algal bloom → algae die → decomposers deplete dissolved oxygen → fish suffocate',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENVISS}:M3`],
    source: ENVISS_SRC,
  },
  {
    conceptId: ENVISS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is the ozone hole the main cause of global warming?',
    choices: [
      { text: 'No — ozone depletion and climate change are separate problems: ozone lets in more UV; greenhouse gases trap heat', isCorrect: true },
      { text: 'Yes — more UV through the ozone hole heats the Earth and drives global warming', isCorrect: false, misconceptionId: `${ENVISS}:M1` },
    ],
    correctValue: 'No — they are separate problems with different mechanisms',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ENVISS}:M1`],
    source: ENVISS_SRC,
  },
]

// ─── bio.micro.microbes-in-human-welfare ─────────────────────────────────────
const MICWELF = 'bio.micro.microbes-in-human-welfare'
const MICWELF_SRC = 'docs/biology/kg/graph.json — bio.micro.microbes-in-human-welfare'
const MICWELF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MICWELF, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Most microorganisms do not cause disease — the vast majority are beneficial or ' +
      'neutral, and many are essential to human welfare. Food production: Lactobacillus ' +
      'ferments milk to yogurt and cheese; Saccharomyces yeast ferments sugars to produce ' +
      'CO2 (bread rising) and alcohol (wine, beer). Industrial biotechnology: fungi and ' +
      'bacteria produce antibiotics (Penicillium → penicillin), vitamins, enzymes used in ' +
      'detergents, and biofuels. Agriculture: Rhizobium bacteria fix nitrogen in legume ' +
      'root nodules, reducing need for chemical fertilisers. Bioremediation: microbes ' +
      'metabolise pollutants — Pseudomonas species break down hydrocarbons from oil spills. ' +
      'Medicine: genetically engineered E. coli produces human insulin for diabetics, ' +
      'replacing the costly extraction from pig/cow pancreases. The human microbiome — ' +
      'trillions of microorganisms living in and on us — aids digestion, trains the immune ' +
      'system, and protects against pathogens by competing for colonisation sites.',
    targetedMisconceptions: [],
    source: MICWELF_SRC,
  },
  {
    conceptId: MICWELF, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The framing "microbes = germs = bad" is deeply wrong. Of the trillions of microbial ' +
      'species, fewer than a thousand cause human disease. Pathogenic microbes are the ' +
      'exception; beneficial ones are the norm. Your gut contains ~100 trillion bacteria ' +
      '(10× the number of your own body cells) that perform functions you cannot: ' +
      'synthesising vitamin K, digesting complex carbohydrates, and producing signals ' +
      'that regulate immunity and mood. Antibiotic treatment that kills gut bacteria ' +
      'causes collateral damage — illustrated by the rise of C. difficile infections ' +
      'after broad-spectrum antibiotic use disrupts the protective microbiome.',
    targetedMisconceptions: [`${MICWELF}:M1`],
    source: MICWELF_SRC,
  },
]
const MICWELF_PROBES: SeedProbe[] = [
  {
    conceptId: MICWELF, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Rhizobium bacteria in legume root nodules benefit agriculture by:',
    choices: [
      { text: 'Fixing atmospheric nitrogen into ammonia that the plant can absorb, reducing the need for chemical nitrogen fertilisers', isCorrect: true },
      { text: 'Breaking down soil minerals that the plant then absorbs through its roots', isCorrect: false, misconceptionId: `${MICWELF}:M2` },
      { text: 'Producing oxygen that the plant uses for respiration', isCorrect: false },
      { text: 'Protecting the plant from pathogenic soil fungi', isCorrect: false },
    ],
    correctValue: 'Fixing atmospheric nitrogen into ammonia the plant can absorb',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MICWELF}:M2`],
    source: MICWELF_SRC,
  },
  {
    conceptId: MICWELF, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "all bacteria are harmful and should be eliminated from the human body." What is wrong with this?',
    choices: [
      { text: 'The gut microbiome of trillions of bacteria is essential for digestion, immunity, and vitamin production — eliminating them would be harmful', isCorrect: true },
      { text: 'You cannot eliminate bacteria because the immune system would suppress any such treatment', isCorrect: false, misconceptionId: `${MICWELF}:M3` },
    ],
    correctValue: 'The gut microbiome is essential for health — eliminating it would cause harm',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MICWELF}:M1`],
    source: MICWELF_SRC,
  },
]

// ─── bio.mol.dna-replication ──────────────────────────────────────────────────
const DNAREP = 'bio.mol.dna-replication'
const DNAREP_SRC = 'docs/biology/kg/graph.json — bio.mol.dna-replication'
const DNAREP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DNAREP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'DNA replication is the process by which a cell copies its entire genome before dividing, ' +
      'so both daughter cells receive a complete set of genetic information. The process is ' +
      'semi-conservative: each new double helix contains one original (template) strand and one ' +
      'newly synthesised strand. Key steps: (1) Helicase unzips the double helix by breaking ' +
      'hydrogen bonds between base pairs, creating a replication fork. (2) Primase adds a short ' +
      'RNA primer to give DNA polymerase a starting point. (3) DNA polymerase III reads the ' +
      'template strand 3′→5′ and synthesises the new strand 5′→3′ by adding complementary ' +
      'nucleotides (A pairs with T; G pairs with C). (4) Because polymerase only works 5′→3′, ' +
      'one strand (leading) is synthesised continuously; the other (lagging) is synthesised in ' +
      'fragments (Okazaki fragments) that are later joined by DNA ligase. (5) DNA polymerase I ' +
      'removes RNA primers and fills gaps; ligase seals nicks. Fidelity is very high: one error ' +
      'per ~10⁹ bases, thanks to proofreading by DNA polymerase.',
    targetedMisconceptions: [],
    source: DNAREP_SRC,
  },
  {
    conceptId: DNAREP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Semi-conservative" confuses students who expect "conservative" (one daughter gets ' +
      'original DNA, one gets all new) or "dispersive" (both daughters get mixed strands). ' +
      'The Meselson-Stahl experiment (1958) proved semi-conservative: bacteria grown on ¹⁵N ' +
      '(heavy nitrogen) were switched to ¹⁴N medium. After one round, ALL DNA was intermediate ' +
      'density (one heavy strand, one light strand) — exactly the semi-conservative prediction. ' +
      'Second confusion: "DNA polymerase builds from scratch." It cannot — it can only EXTEND ' +
      'an existing chain. That is why RNA primers are needed at the start. RNA primase has no ' +
      'such limitation and can initiate new strands; polymerase then extends from the primer.',
    targetedMisconceptions: [`${DNAREP}:M1`],
    source: DNAREP_SRC,
  },
]
const DNAREP_PROBES: SeedProbe[] = [
  {
    conceptId: DNAREP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why are RNA primers necessary during DNA replication?',
    choices: [
      { text: 'DNA polymerase can only extend an existing strand — it cannot initiate synthesis; primers provide the starting 3\'–OH group', isCorrect: true },
      { text: 'RNA primers provide the nucleotides that DNA polymerase uses for synthesis', isCorrect: false, misconceptionId: `${DNAREP}:M2` },
      { text: 'Primers mark the start of each gene so DNA polymerase knows where to begin', isCorrect: false },
      { text: 'RNA is more stable than DNA at the replication fork and protects the template strand', isCorrect: false },
    ],
    correctValue: 'DNA polymerase cannot initiate synthesis — it needs a primer to extend from',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DNAREP}:M2`],
    source: DNAREP_SRC,
  },
  {
    conceptId: DNAREP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'After one round of replication, what does each daughter DNA molecule contain?',
    choices: [
      { text: 'One original template strand and one newly synthesised strand (semi-conservative)', isCorrect: true },
      { text: 'All new strands — the original DNA serves only as a temporary template and is degraded', isCorrect: false, misconceptionId: `${DNAREP}:M1` },
    ],
    correctValue: 'One original strand and one new strand — semi-conservative replication',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DNAREP}:M1`],
    source: DNAREP_SRC,
  },
]

// ─── bio.mol.transcription ────────────────────────────────────────────────────
const TRANSCR = 'bio.mol.transcription'
const TRANSCR_SRC = 'docs/biology/kg/graph.json — bio.mol.transcription'
const TRANSCR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRANSCR, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Transcription is the first step in gene expression: the information in a DNA gene is ' +
      'copied into messenger RNA (mRNA). Unlike DNA replication (which copies the whole genome), ' +
      'transcription copies only ONE gene at a time, producing mRNA that carries the instructions ' +
      'to ribosomes for protein synthesis. Steps: (1) RNA polymerase binds to the promoter — ' +
      'a specific DNA sequence marking the start of a gene — guided by transcription factors. ' +
      '(2) The double helix unwinds; RNA polymerase reads the template strand 3′→5′ and builds ' +
      'an RNA chain 5′→3′, substituting uracil (U) for thymine (T). (3) At the terminator ' +
      'sequence, RNA polymerase detaches and the mRNA is released. In eukaryotes, the pre-mRNA ' +
      'is then processed: a 5′ cap and poly-A tail are added (protecting it and enabling ' +
      'nuclear export), and introns (non-coding sequences) are spliced out, leaving only ' +
      'exons (coding sequences) in the mature mRNA.',
    targetedMisconceptions: [],
    source: TRANSCR_SRC,
  },
  {
    conceptId: TRANSCR, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common confusion: "transcription copies the whole DNA strand." Only one gene is ' +
      'transcribed at a time, and only from the template strand (also called the antisense ' +
      'or non-coding strand), not the coding strand. The coding strand (sense strand) has ' +
      'the same sequence as the resulting mRNA (with T replaced by U). Students often confuse ' +
      'which strand RNA polymerase reads. Key rule: RNA polymerase reads 3′→5′ and builds ' +
      '5′→3′ — same direction rule as DNA polymerase. Second confusion: "introns are ' +
      'errors." Introns are non-coding sequences removed during RNA processing; they are ' +
      'normal features of eukaryotic genes and some have regulatory roles.',
    targetedMisconceptions: [`${TRANSCR}:M1`],
    source: TRANSCR_SRC,
  },
]
const TRANSCR_PROBES: SeedProbe[] = [
  {
    conceptId: TRANSCR, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In eukaryotic cells, what happens to pre-mRNA after transcription and before translation?',
    choices: [
      { text: 'A 5′ cap and poly-A tail are added, and introns are spliced out, leaving only exons in the mature mRNA', isCorrect: true },
      { text: 'The pre-mRNA is immediately translated at the ribosome without modification', isCorrect: false, misconceptionId: `${TRANSCR}:M2` },
      { text: 'Exons are removed and introns are kept for the coding sequence', isCorrect: false, misconceptionId: `${TRANSCR}:M3` },
      { text: 'The mRNA is converted back to DNA before leaving the nucleus', isCorrect: false },
    ],
    correctValue: '5′ cap + poly-A tail added; introns spliced out to produce mature mRNA',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TRANSCR}:M2`, `${TRANSCR}:M3`],
    source: TRANSCR_SRC,
  },
  {
    conceptId: TRANSCR, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'RNA polymerase reads which strand of DNA during transcription?',
    choices: [
      { text: 'The template (antisense) strand, reading 3′→5′ to produce mRNA 5′→3′', isCorrect: true },
      { text: 'The coding (sense) strand, since it has the same sequence as the mRNA', isCorrect: false, misconceptionId: `${TRANSCR}:M1` },
    ],
    correctValue: 'The template strand (3′→5′), producing mRNA in the 5′→3′ direction',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TRANSCR}:M1`],
    source: TRANSCR_SRC,
  },
]

// ─── bio.physio.digestive-system ──────────────────────────────────────────────
const DIGEST = 'bio.physio.digestive-system'
const DIGEST_SRC = 'docs/biology/kg/graph.json — bio.physio.digestive-system'
const DIGEST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DIGEST, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The digestive system breaks down food into molecules small enough to absorb and ' +
      'uses two complementary processes. Mechanical digestion: physically breaks food into ' +
      'smaller pieces (chewing, stomach churning) — increases surface area for chemical ' +
      'digestion. Chemical digestion: enzymes hydrolyse large molecules into monomers. ' +
      'The gut is a tube, and each region specialises: Mouth (salivary amylase, pH ~7, ' +
      'begins starch digestion). Stomach (protease pepsin, pH 1-2, denatures proteins ' +
      'and activates pepsin — low pH essential). Small intestine (most digestion and ALL ' +
      'absorption): pancreas secretes proteases, lipase, amylase; liver secretes bile ' +
      '(emulsifies fats — not enzymatic). Villus structure maximises absorption: enormous ' +
      'surface area, rich blood supply, lacteals for fat absorption. Large intestine: ' +
      'water reabsorption; bacteria produce vitamin K and B vitamins. No digestion of ' +
      'food nutrients here — they were all absorbed earlier.',
    targetedMisconceptions: [],
    source: DIGEST_SRC,
  },
  {
    conceptId: DIGEST, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "bile digests fat." Bile emulsifies fat (breaks it into tiny droplets ' +
      'by reducing surface tension) — this dramatically increases surface area for lipase ' +
      'to act on. Bile contains no enzymes and performs no chemical breakdown itself. ' +
      'It is a detergent, not a digestive enzyme. Second confusion: "food is absorbed ' +
      'in the stomach." The stomach\'s role is mechanical churning and protein denaturation; ' +
      'virtually no absorption occurs there (only alcohol and aspirin to a small extent). ' +
      'All major nutrient absorption happens in the small intestine. Third: "the large ' +
      'intestine digests remaining food." Its primary role is water and mineral reabsorption; ' +
      'no significant enzyme activity or nutrient digestion occurs there.',
    targetedMisconceptions: [`${DIGEST}:M1`, `${DIGEST}:M2`],
    source: DIGEST_SRC,
  },
]
const DIGEST_PROBES: SeedProbe[] = [
  {
    conceptId: DIGEST, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the role of bile in fat digestion?',
    choices: [
      { text: 'Bile emulsifies fat into small droplets, increasing surface area for lipase enzymes to act on', isCorrect: true },
      { text: 'Bile chemically breaks down fat molecules by hydrolysis — it is a fat-digesting enzyme', isCorrect: false, misconceptionId: `${DIGEST}:M1` },
      { text: 'Bile neutralises stomach acid so fat-digesting enzymes can work', isCorrect: false },
      { text: 'Bile transports fatty acids from the small intestine to the liver', isCorrect: false },
    ],
    correctValue: 'Bile emulsifies fat, increasing surface area for lipase',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DIGEST}:M1`],
    source: DIGEST_SRC,
  },
  {
    conceptId: DIGEST, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Where in the digestive system does the majority of nutrient absorption take place?',
    choices: [
      { text: 'Small intestine — villi and microvilli provide enormous surface area and a rich blood supply for absorption', isCorrect: true },
      { text: 'Stomach — food is broken down there and absorbed directly into the bloodstream', isCorrect: false, misconceptionId: `${DIGEST}:M2` },
    ],
    correctValue: 'Small intestine — villi provide the surface area for absorption',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${DIGEST}:M2`],
    source: DIGEST_SRC,
  },
]

// ─── bio.plant.photosynthesis ─────────────────────────────────────────────────
const PHOTOSYNTH = 'bio.plant.photosynthesis'
const PHOTOSYNTH_SRC = 'docs/biology/kg/graph.json — bio.plant.photosynthesis'
const PHOTOSYNTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHOTOSYNTH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Photosynthesis converts light energy into chemical energy (glucose), using CO2 and ' +
      'water as raw materials. Overall equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. ' +
      'Two stages occur in the chloroplast. Light-dependent reactions (thylakoid membranes): ' +
      'light energy is absorbed by chlorophyll; water is split (photolysis), releasing O2 ' +
      'as a by-product; the energy is used to produce ATP and NADPH (energy carriers). ' +
      'Light-independent reactions / Calvin cycle (stroma): ATP and NADPH from stage 1 ' +
      'drive the fixation of CO2 into glucose via a cycle of reactions. CO2 combines with ' +
      'RuBP (a 5-carbon compound) via RuBisCO enzyme; the products are reduced using ATP ' +
      'and NADPH to produce G3P, which is used to make glucose. RuBP is regenerated to ' +
      'continue the cycle. Key point: O2 is released from water splitting, not from CO2.',
    targetedMisconceptions: [],
    source: PHOTOSYNTH_SRC,
  },
  {
    conceptId: PHOTOSYNTH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Critical misconception: "plants get their food from soil." Plants MAKE their food ' +
      'from CO2 and water — they are autotrophs. Minerals from soil (nitrogen, phosphorus) ' +
      'are used to build proteins and DNA but contribute negligible mass. A tree\'s wood ' +
      'is mainly carbon, and that carbon comes from CO2 absorbed from the air. Second: ' +
      '"plants perform photosynthesis OR respiration." Plants do BOTH simultaneously. ' +
      'At high light intensity, photosynthesis exceeds respiration (net O2 release); at ' +
      'low light (compensation point), they balance; in darkness, only respiration runs ' +
      '(net CO2 release). Plants respire continuously — they cannot store enough light energy ' +
      'to stop. Third: "the oxygen in glucose comes from CO2." Isotope labelling experiments ' +
      'showed that all released O2 comes from H2O, not CO2.',
    targetedMisconceptions: [`${PHOTOSYNTH}:M1`, `${PHOTOSYNTH}:M2`],
    source: PHOTOSYNTH_SRC,
  },
]
const PHOTOSYNTH_PROBES: SeedProbe[] = [
  {
    conceptId: PHOTOSYNTH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In photosynthesis, where does the oxygen released into the atmosphere come from?',
    choices: [
      { text: 'From the splitting of water (photolysis) in the light-dependent reactions', isCorrect: true },
      { text: 'From CO2 molecules — oxygen is released when carbon is removed from CO2 to make glucose', isCorrect: false, misconceptionId: `${PHOTOSYNTH}:M3` },
      { text: 'From both water and CO2 in equal proportions', isCorrect: false },
      { text: 'From oxygen stored in glucose during the Calvin cycle', isCorrect: false },
    ],
    correctValue: 'From the splitting of water (photolysis)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHOTOSYNTH}:M3`],
    source: PHOTOSYNTH_SRC,
  },
  {
    conceptId: PHOTOSYNTH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do plants respire? If so, when?',
    choices: [
      { text: 'Yes — plants respire continuously (day and night); in light, photosynthesis may exceed respiration but both always occur', isCorrect: true },
      { text: 'No — plants use photosynthesis for energy; they only respire when deprived of light for long periods', isCorrect: false, misconceptionId: `${PHOTOSYNTH}:M2` },
    ],
    correctValue: 'Yes — plants respire continuously, day and night',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PHOTOSYNTH}:M2`],
    source: PHOTOSYNTH_SRC,
  },
]

// ─── bio.plant.mineral-nutrition ──────────────────────────────────────────────
const PLMINERAL = 'bio.plant.mineral-nutrition'
const PLMINERAL_SRC = 'docs/biology/kg/graph.json — bio.plant.mineral-nutrition'
const PLMINERAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PLMINERAL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Plants need mineral ions from the soil for essential biochemical functions — distinct ' +
      'from the carbon, hydrogen, and oxygen they obtain from CO2 and water. Macronutrients ' +
      '(needed in large amounts): Nitrogen (N) — component of amino acids, proteins, nucleic ' +
      'acids, chlorophyll; deficiency causes yellowing (chlorosis) of older leaves first. ' +
      'Phosphorus (P) — component of nucleic acids, ATP, cell membranes; deficiency causes ' +
      'purple discolouration (anthocyanin accumulation). Potassium (K) — activates enzymes, ' +
      'required for stomatal guard cell function; deficiency causes brown leaf margins. ' +
      'Magnesium (Mg) — the central atom in chlorophyll; deficiency causes yellowing in ' +
      'younger leaves. Micronutrients (needed in trace amounts): iron (cofactor), manganese, ' +
      'zinc, copper, boron, molybdenum. Plants absorb mineral ions against concentration ' +
      'gradients by active transport (requiring ATP) via root hair cells.',
    targetedMisconceptions: [],
    source: PLMINERAL_SRC,
  },
  {
    conceptId: PLMINERAL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "plants feed from soil — all plant nutrients come from the ground." ' +
      'Plants get the BULK of their mass from CO2 and water (carbon = photosynthesis). ' +
      'Soil provides mineral ions (nitrogen, phosphorus, potassium etc.) in very small ' +
      'quantities — essential for building proteins and DNA but contributing minimal total ' +
      'mass. A plant growing in mineral-deficient but otherwise optimal conditions will ' +
      'be stunted (cannot build proteins) but will still photosynthesise, showing these ' +
      'are separate requirements. Second: "more fertiliser always helps plants grow ' +
      'faster." Beyond optimal concentrations, excess minerals cause osmotic stress — ' +
      'the soil solution becomes more concentrated than root cells, so water moves OUT ' +
      'of roots (plasmolysis), wilting the plant even in wet soil.',
    targetedMisconceptions: [`${PLMINERAL}:M1`],
    source: PLMINERAL_SRC,
  },
]
const PLMINERAL_PROBES: SeedProbe[] = [
  {
    conceptId: PLMINERAL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A plant shows yellowing of older leaves (chlorosis) first. Which mineral deficiency best explains this symptom?',
    choices: [
      { text: 'Nitrogen — needed for chlorophyll; yellowing in older leaves because nitrogen is mobile and relocated to younger growing tissue', isCorrect: true },
      { text: 'Magnesium — needed for chlorophyll; deficiency always shows in older leaves', isCorrect: false, misconceptionId: `${PLMINERAL}:M2` },
      { text: 'Potassium — needed for stomatal function; deficiency causes leaf yellowing', isCorrect: false },
      { text: 'Phosphorus — needed for ATP; without energy, chlorophyll cannot be maintained', isCorrect: false },
    ],
    correctValue: 'Nitrogen deficiency — chlorosis in older leaves because N is mobile',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PLMINERAL}:M2`],
    source: PLMINERAL_SRC,
  },
  {
    conceptId: PLMINERAL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A gardener doubles the amount of fertiliser, hoping to double plant growth. What might go wrong?',
    choices: [
      { text: 'Excess minerals increase soil solution concentration; water moves out of root cells by osmosis, wilting the plant despite wet soil', isCorrect: true },
      { text: 'Plants cannot absorb excess minerals, so the extra fertiliser is simply wasted', isCorrect: false, misconceptionId: `${PLMINERAL}:M3` },
    ],
    correctValue: 'Excess minerals cause osmotic stress — water leaves root cells and the plant wilts',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PLMINERAL}:M3`],
    source: PLMINERAL_SRC,
  },
]

// ─── bio.plant.plant-growth-hormones ─────────────────────────────────────────
const PLHORM = 'bio.plant.plant-growth-hormones'
const PLHORM_SRC = 'docs/biology/kg/graph.json — bio.plant.plant-growth-hormones'
const PLHORM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PLHORM, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Plant growth hormones (phytohormones) are chemical signals that coordinate development ' +
      'across the whole plant. Five major groups: Auxins (IAA): promote cell elongation in ' +
      'shoot tips; redistribute in response to light and gravity. In phototropism, auxin ' +
      'migrates away from light → higher concentration on shaded side → cells elongate more ' +
      'on shaded side → shoot bends toward light. At high concentration, auxins inhibit root ' +
      'growth (roots are far more sensitive than shoots). Gibberellins: promote stem elongation, ' +
      'seed germination, and breaking dormancy. Cytokinins: promote cell division, delay leaf ' +
      'senescence (used commercially to keep cut flowers fresh). Abscisic acid (ABA): "stress ' +
      'hormone" — promotes stomatal closure during drought, promotes dormancy and seed ' +
      'maturation. Ethylene: a gas; promotes fruit ripening and leaf/fruit abscission ' +
      '(falling); commercial use in ripening bananas artificially.',
    targetedMisconceptions: [],
    source: PLHORM_SRC,
  },
  {
    conceptId: PLHORM, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "auxin makes the plant grow toward light." The mechanism is subtler: ' +
      'auxin migrates AWAY from the light, concentrating on the shaded side. The shaded ' +
      'side elongates MORE — bending the shoot toward the light. Auxin does not attract ' +
      'the plant; it asymmetrically distributes to create differential growth. ' +
      'Second: "auxins always promote growth." This depends entirely on concentration ' +
      'and tissue type. The same concentration of auxin that promotes shoot elongation ' +
      'inhibits root elongation — roots are 1000× more sensitive. Commercial weed killers ' +
      '(2,4-D) exploit this: at high concentrations, auxin-like molecules cause abnormal, ' +
      'uncontrolled growth in broad-leaved weeds, killing them while narrow-leaved grasses ' +
      'are less affected.',
    targetedMisconceptions: [`${PLHORM}:M1`],
    source: PLHORM_SRC,
  },
]
const PLHORM_PROBES: SeedProbe[] = [
  {
    conceptId: PLHORM, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A shoot tip is illuminated from one side. Auxin migrates to the shaded side. What happens and why?',
    choices: [
      { text: 'The shaded side elongates more because auxin promotes cell elongation; the shoot bends toward the light', isCorrect: true },
      { text: 'The lit side elongates more because light activates auxin, causing growth toward the light source', isCorrect: false, misconceptionId: `${PLHORM}:M2` },
      { text: 'Both sides elongate equally — auxin migration is compensated by photosynthesis-driven growth on the lit side', isCorrect: false },
      { text: 'The shaded side shrinks because auxin inhibits growth there', isCorrect: false },
    ],
    correctValue: 'Shaded side elongates more → shoot bends toward the light',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PLHORM}:M2`],
    source: PLHORM_SRC,
  },
  {
    conceptId: PLHORM, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'If auxin promotes shoot elongation, why does the same auxin INHIBIT root elongation?',
    choices: [
      { text: 'Roots are far more sensitive to auxin — the concentration optimal for shoots is already inhibitory for roots', isCorrect: true },
      { text: 'Root cells lack the receptors for auxin and block its entry', isCorrect: false, misconceptionId: `${PLHORM}:M3` },
    ],
    correctValue: 'Roots are more sensitive — shoot-optimal auxin concentration is inhibitory for roots',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${PLHORM}:M3`],
    source: PLHORM_SRC,
  },
]

// ─── bio.physio.nervous-system ────────────────────────────────────────────────
const NERVSYS = 'bio.physio.nervous-system'
const NERVSYS_SRC = 'docs/biology/kg/graph.json — bio.physio.nervous-system'
const NERVSYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NERVSYS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The nervous system detects stimuli, integrates information, and coordinates responses ' +
      'through electrical signals (nerve impulses) carried by neurons. Two divisions: Central ' +
      'nervous system (CNS = brain + spinal cord) — integrates information and generates ' +
      'responses. Peripheral nervous system (PNS) — sensory neurons carry signals TO the ' +
      'CNS; motor neurons carry signals FROM the CNS to effectors (muscles, glands). ' +
      'The nerve impulse (action potential): at rest, neurons are polarised (−70 mV inside). ' +
      'A stimulus depolarises the membrane: Na⁺ channels open, Na⁺ floods in, inside becomes ' +
      'positive (+40 mV). Then K⁺ channels open, K⁺ flows out, restoring negative charge ' +
      '(repolarisation). The Na⁺/K⁺ pump restores resting potential. The impulse is all-or-nothing ' +
      '(threshold must be reached) and travels along the axon. At synapses, the electrical ' +
      'signal is converted to chemical (neurotransmitter crosses the gap) then back to ' +
      'electrical in the postsynaptic neuron.',
    targetedMisconceptions: [],
    source: NERVSYS_SRC,
  },
  {
    conceptId: NERVSYS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "nerve impulses are carried by electrons, like electrical wires." ' +
      'Nerve impulses are electrochemical — they involve ion movements (Na⁺, K⁺) across ' +
      'the membrane, not electron flow. This is why impulses are slower (up to 120 m/s ' +
      'in myelinated fibres, compared to near light-speed for electrical current) and why ' +
      'anaesthetics that block ion channels also block impulses. Second: "bigger stimulus ' +
      '= bigger impulse." Action potentials are all-or-nothing: once threshold is reached, ' +
      'the impulse is always the same size. Stronger stimuli produce MORE impulses per ' +
      'second (higher frequency), not larger ones — this is called frequency coding.',
    targetedMisconceptions: [`${NERVSYS}:M1`, `${NERVSYS}:M2`],
    source: NERVSYS_SRC,
  },
]
const NERVSYS_PROBES: SeedProbe[] = [
  {
    conceptId: NERVSYS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During an action potential, what causes the inside of the neuron to become positive (+40 mV)?',
    choices: [
      { text: 'Voltage-gated Na⁺ channels open and Na⁺ ions rush into the cell, making the inside positive', isCorrect: true },
      { text: 'K⁺ ions enter the cell, making the inside positive', isCorrect: false, misconceptionId: `${NERVSYS}:M3` },
      { text: 'The Na⁺/K⁺ pump actively moves charge inward to create the positive potential', isCorrect: false },
      { text: 'Electrons flow inward along the axon membrane, charging the inside positively', isCorrect: false },
    ],
    correctValue: 'Na⁺ channels open → Na⁺ floods in → inside becomes positive',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NERVSYS}:M3`],
    source: NERVSYS_SRC,
  },
  {
    conceptId: NERVSYS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'If you press harder on a surface, you feel more pressure. Does this mean nerve impulses from your fingers get larger?',
    choices: [
      { text: 'No — impulses are all-or-nothing; stronger stimuli produce more impulses per second (higher frequency), not larger impulses', isCorrect: true },
      { text: 'Yes — a stronger stimulus produces a proportionally larger action potential in the sensory neurons', isCorrect: false, misconceptionId: `${NERVSYS}:M2` },
    ],
    correctValue: 'No — stronger stimuli increase impulse frequency, not amplitude',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${NERVSYS}:M2`],
    source: NERVSYS_SRC,
  },
]

// ─── bio.physio.endocrine-system ──────────────────────────────────────────────
const ENDOCRINE = 'bio.physio.endocrine-system'
const ENDOCRINE_SRC = 'docs/biology/kg/graph.json — bio.physio.endocrine-system'
const ENDOCRINE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENDOCRINE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The endocrine system coordinates long-term, body-wide responses through chemical ' +
      'messengers called hormones, secreted by glands directly into the bloodstream. ' +
      'Key glands and hormones: Pituitary (master gland) — produces TSH, FSH, LH, GH, ' +
      'ADH, oxytocin; regulates other endocrine glands. Thyroid — thyroxine controls ' +
      'metabolic rate; iodine deficiency causes goitre (thyroid enlargement). ' +
      'Adrenal glands — adrenaline (medulla): fight-or-flight response (heart rate up, ' +
      'blood sugar up, digestion down); cortisol (cortex): long-term stress response. ' +
      'Pancreas — insulin (lowers blood glucose by stimulating cells to absorb it and ' +
      'liver to store as glycogen); glucagon (raises blood glucose by stimulating liver ' +
      'to convert glycogen → glucose). These two hormones maintain blood glucose homeostasis ' +
      'via negative feedback. Gonads — oestrogen and testosterone control secondary sex ' +
      'characteristics and reproductive cycles.',
    targetedMisconceptions: [],
    source: ENDOCRINE_SRC,
  },
  {
    conceptId: ENDOCRINE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "insulin lowers blood sugar by destroying glucose." Insulin does not ' +
      'destroy or consume glucose — it signals cells (especially muscle and fat cells) ' +
      'to take up glucose from the blood via glucose transporters (GLUT4), and signals ' +
      'the liver to convert glucose into glycogen for storage. The glucose is used for ' +
      'energy or stored — not destroyed. Second: "the nervous and endocrine systems ' +
      'are independent." They are complementary and interlinked. The hypothalamus is ' +
      'the bridge: it is brain tissue that produces hormones (ADH, oxytocin, releasing ' +
      'hormones controlling the pituitary). The adrenal medulla is effectively a modified ' +
      'sympathetic ganglion — nervous stimulation triggers adrenaline secretion. ' +
      'Together they form the neuroendocrine system.',
    targetedMisconceptions: [`${ENDOCRINE}:M1`],
    source: ENDOCRINE_SRC,
  },
]
const ENDOCRINE_PROBES: SeedProbe[] = [
  {
    conceptId: ENDOCRINE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Blood glucose rises after a meal. Which hormone is released and what does it do?',
    choices: [
      { text: 'Insulin — signals cells to absorb glucose from the blood and the liver to convert glucose to glycogen', isCorrect: true },
      { text: 'Glucagon — stimulates cells to use glucose more rapidly to bring levels back down', isCorrect: false, misconceptionId: `${ENDOCRINE}:M2` },
      { text: 'Adrenaline — diverts glucose from digestion to muscles to handle the metabolic load', isCorrect: false },
      { text: 'Cortisol — maintains homeostasis by breaking down blood glucose into its components', isCorrect: false },
    ],
    correctValue: 'Insulin — triggers glucose uptake by cells and glycogen storage in liver',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENDOCRINE}:M2`],
    source: ENDOCRINE_SRC,
  },
  {
    conceptId: ENDOCRINE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does insulin destroy or remove glucose from the body?',
    choices: [
      { text: 'No — insulin signals cells to absorb glucose (for energy) and the liver to store it as glycogen; glucose is used, not destroyed', isCorrect: true },
      { text: 'Yes — insulin converts glucose into a form that is excreted by the kidneys', isCorrect: false, misconceptionId: `${ENDOCRINE}:M1` },
    ],
    correctValue: 'No — insulin directs glucose into cells and storage; it is not destroyed',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ENDOCRINE}:M1`],
    source: ENDOCRINE_SRC,
  },
]

// ─── bio.physio.excretory-system ──────────────────────────────────────────────
const EXCRET = 'bio.physio.excretory-system'
const EXCRET_SRC = 'docs/biology/kg/graph.json — bio.physio.excretory-system'
const EXCRET_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXCRET, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Excretion is the removal of metabolic waste products — substances produced by the ' +
      'body\'s own chemistry that would be toxic if allowed to accumulate. The kidneys are ' +
      'the primary excretory organs, removing urea (from protein catabolism), excess salts, ' +
      'water, and some drugs. Each kidney contains ~1 million nephrons — the functional units. ' +
      'Three processes in the nephron: (1) Ultrafiltration: high blood pressure in the ' +
      'glomerulus forces small molecules (water, glucose, urea, ions) into the Bowman\'s capsule ' +
      '— large molecules (proteins, blood cells) are retained. (2) Selective reabsorption: ' +
      'all glucose, most water, and useful ions are actively reabsorbed in the proximal tubule ' +
      'and loop of Henle. (3) Secretion: some substances are actively secreted into the ' +
      'tubule (e.g., H⁺ ions, drugs). The final urine is concentrated urea solution. ' +
      'ADH (antidiuretic hormone) regulates water reabsorption in the collecting duct, ' +
      'allowing kidneys to produce concentrated urine when dehydrated.',
    targetedMisconceptions: [],
    source: EXCRET_SRC,
  },
  {
    conceptId: EXCRET, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "the kidneys filter out everything bad and keep everything good." ' +
      'Filtration is non-selective for small molecules — glucose (essential) and urea ' +
      '(toxic) are both filtered. The selectivity comes from REABSORPTION: glucose is ' +
      '100% reabsorbed in healthy kidneys; urea is mostly not. In diabetes, blood glucose ' +
      'exceeds the reabsorption maximum, so glucose "spills" into urine — this is why ' +
      'urine glucose testing detects uncontrolled diabetes. Second: "sweating is excretion." ' +
      'Sweating is primarily THERMOREGULATION — cooling the body. The salt and urea in ' +
      'sweat are incidental; the kidney remains the primary excretory organ. Excretion ' +
      'requires the substance to be a metabolic waste product produced by the body\'s own ' +
      'chemistry — which sweating partially achieves but is not its primary function.',
    targetedMisconceptions: [`${EXCRET}:M1`, `${EXCRET}:M2`],
    source: EXCRET_SRC,
  },
]
const EXCRET_PROBES: SeedProbe[] = [
  {
    conceptId: EXCRET, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Glucose is filtered from the blood into the nephron tubule. Why does healthy urine not contain glucose?',
    choices: [
      { text: 'Glucose is 100% reabsorbed in the proximal tubule by active transport before it reaches the final urine', isCorrect: true },
      { text: 'The glomerulus filters out glucose before it can enter the tubule', isCorrect: false, misconceptionId: `${EXCRET}:M3` },
      { text: 'Glucose molecules are too large to pass through the filtration membrane', isCorrect: false },
      { text: 'The kidney converts glucose to glycogen before it reaches the collecting duct', isCorrect: false },
    ],
    correctValue: 'Glucose is 100% reabsorbed in the proximal tubule',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EXCRET}:M3`],
    source: EXCRET_SRC,
  },
  {
    conceptId: EXCRET, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is sweating a form of excretion?',
    choices: [
      { text: 'Only partially — sweating is primarily thermoregulation; the kidney is the primary excretory organ for metabolic wastes', isCorrect: true },
      { text: 'Yes — sweating removes urea and salts, making it the skin\'s equivalent of kidney excretion', isCorrect: false, misconceptionId: `${EXCRET}:M2` },
    ],
    correctValue: 'Sweating is primarily thermoregulation; kidneys are the primary excretory organs',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EXCRET}:M2`],
    source: EXCRET_SRC,
  },
]

// ─── bio.physio.musculoskeletal-system ───────────────────────────────────────
const MUSCULO = 'bio.physio.musculoskeletal-system'
const MUSCULO_SRC = 'docs/biology/kg/graph.json — bio.physio.musculoskeletal-system'
const MUSCULO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MUSCULO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The musculoskeletal system provides support, protection, and movement. Bone is a ' +
      'living tissue: the matrix is mostly collagen (flexibility) mineralised with calcium ' +
      'phosphate (rigidity). Bone marrow produces blood cells; bone is continuously remodelled ' +
      'by osteoblasts (build) and osteoclasts (break down) in response to mechanical stress. ' +
      'Joints connect bones: synovial joints (shoulder, knee) allow free movement — synovial ' +
      'fluid lubricates; cartilage cushions. Muscles work in antagonistic pairs: flexors and ' +
      'extensors at the same joint. Muscles can only PULL (contract), never push. ' +
      'Skeletal muscle contraction — sliding filament theory: myosin (thick filament) ' +
      'binds actin (thin filament) and pulls it inward using ATP; the sarcomere shortens. ' +
      'Calcium ions (released from sarcoplasmic reticulum on nerve stimulation) expose ' +
      'actin binding sites; troponin-tropomyosin system controls this. Z-lines come closer; ' +
      'H zone narrows; I band narrows; A band stays constant (filaments don\'t shorten — ' +
      'they slide).',
    targetedMisconceptions: [],
    source: MUSCULO_SRC,
  },
  {
    conceptId: MUSCULO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Muscles shorten during contraction" — this is TRUE at the whole-muscle level but ' +
      'the MECHANISM is NOT the filaments shortening. In the sliding filament model, actin ' +
      'and myosin filaments REMAIN THE SAME LENGTH — the sarcomere shortens because actin ' +
      'slides OVER myosin, overlapping more. The A band (myosin length) stays constant; ' +
      'only the I band and H zone (gap regions) narrow. This is a classic case where ' +
      'the macroscopic observation (muscle shortens) has a different molecular mechanism ' +
      '(filaments slide, not shorten). Second: "bones are dead." Bone is a living tissue ' +
      'with cells, blood vessels, and nerves; it continuously remodels and responds to ' +
      'exercise (Wolf\'s law: stress stimulates bone deposition, explaining why weight-bearing ' +
      'exercise maintains bone density).',
    targetedMisconceptions: [`${MUSCULO}:M1`],
    source: MUSCULO_SRC,
  },
]
const MUSCULO_PROBES: SeedProbe[] = [
  {
    conceptId: MUSCULO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During muscle contraction, what happens to the actin and myosin filaments?',
    choices: [
      { text: 'They remain the same length — actin slides over myosin, narrowing the I band and H zone but keeping the A band constant', isCorrect: true },
      { text: 'Both actin and myosin shorten, which is why the sarcomere shortens', isCorrect: false, misconceptionId: `${MUSCULO}:M1` },
      { text: 'Myosin shortens; actin is pulled inward', isCorrect: false },
      { text: 'Actin filaments shorten by coiling around myosin', isCorrect: false },
    ],
    correctValue: 'Filaments stay the same length — they slide, narrowing the I and H zones',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MUSCULO}:M1`],
    source: MUSCULO_SRC,
  },
  {
    conceptId: MUSCULO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can a single muscle both flex and extend a joint?',
    choices: [
      { text: 'No — muscles can only pull (contract), so antagonistic pairs are needed: one flexes, the other extends', isCorrect: true },
      { text: 'Yes — the same muscle can contract or relax to produce opposing movements at a joint', isCorrect: false, misconceptionId: `${MUSCULO}:M2` },
    ],
    correctValue: 'No — muscles only pull; antagonistic pairs produce opposing movements',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MUSCULO}:M2`],
    source: MUSCULO_SRC,
  },
]

// ─── bio.gen.mendelian-genetics ───────────────────────────────────────────────
const MENDEL = 'bio.gen.mendelian-genetics'
const MENDEL_SRC = 'docs/biology/kg/graph.json — bio.gen.mendelian-genetics'
const MENDEL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MENDEL, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Gregor Mendel\'s pea plant experiments (1860s) established the fundamental laws of ' +
      'inheritance. Key vocabulary: gene (a unit of inheritance for one trait), allele ' +
      '(a variant of a gene — e.g., "tall" or "short"), genotype (the allele combination ' +
      'an organism carries), phenotype (the observable trait expressed). Homozygous: ' +
      'both alleles the same (TT or tt). Heterozygous: different alleles (Tt). ' +
      'Dominant allele (T): expressed in heterozygotes; recessive allele (t): only ' +
      'expressed when homozygous (tt). Law of Segregation: each parent passes only one ' +
      'allele per gene to each offspring (alleles separate during gamete formation). ' +
      'Law of Independent Assortment: genes on different chromosomes are inherited ' +
      'independently. A Punnett square predicts offspring ratios: Tt × Tt → 1 TT : 2 Tt : 1 tt ' +
      '(3 tall : 1 short phenotype ratio). These ratios are probabilities, not guarantees.',
    targetedMisconceptions: [],
    source: MENDEL_SRC,
  },
  {
    conceptId: MENDEL, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Three key misconceptions. (1) "Dominant means more common." Dominance describes ' +
      'which allele is expressed in heterozygotes — it has nothing to do with frequency. ' +
      'Huntington\'s disease allele is dominant and rare; the recessive cystic fibrosis ' +
      'allele is far more common in the population. (2) "Recessive alleles skip generations." ' +
      'Recessive alleles are NOT lost — carriers (Tt) have them but do not express them. ' +
      'The allele is hidden, not absent. (3) "3:1 ratio means exactly 3 tall in every 4." ' +
      'The ratio is a PROBABILITY. Each offspring is an independent event; in a small family, ' +
      'the actual ratio may differ significantly from 3:1. Large numbers produce ratios ' +
      'close to 3:1; individual families may show 4:0 or 2:2 by chance.',
    targetedMisconceptions: [`${MENDEL}:M1`, `${MENDEL}:M2`],
    source: MENDEL_SRC,
  },
]
const MENDEL_PROBES: SeedProbe[] = [
  {
    conceptId: MENDEL, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two heterozygous tall pea plants (Tt × Tt) are crossed. What is the expected phenotype ratio of offspring?',
    choices: [
      { text: '3 tall : 1 short — because TT and Tt are both tall, and only tt shows the short phenotype', isCorrect: true },
      { text: '1 tall : 1 short — because heterozygotes show both traits equally', isCorrect: false, misconceptionId: `${MENDEL}:M3` },
      { text: '1 TT : 2 Tt : 1 tt — all offspring have different genotypes, each expressed differently', isCorrect: false },
      { text: '2 tall : 2 short — Mendelian ratios always produce 50/50 outcomes', isCorrect: false },
    ],
    correctValue: '3 tall : 1 short — TT and Tt both express tall',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MENDEL}:M3`],
    source: MENDEL_SRC,
  },
  {
    conceptId: MENDEL, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Huntington\'s disease is caused by a dominant allele but is rare. Does "dominant" mean "common"?',
    choices: [
      { text: 'No — dominant means expressed in heterozygotes; frequency in a population is completely separate from dominance', isCorrect: true },
      { text: 'Yes — if Huntington\'s were truly dominant it would be the most common form; its rarity means it must act as recessive', isCorrect: false, misconceptionId: `${MENDEL}:M1` },
    ],
    correctValue: 'No — dominant refers to expression in heterozygotes, not population frequency',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MENDEL}:M1`],
    source: MENDEL_SRC,
  },
]

// ─── bio.gen.gene-interactions ────────────────────────────────────────────────
const GENEINT = 'bio.gen.gene-interactions'
const GENEINT_SRC = 'docs/biology/kg/graph.json — bio.gen.gene-interactions'
const GENEINT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GENEINT, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Mendelian genetics assumed traits are controlled by single genes with simple dominant/ ' +
      'recessive relationships. Gene interactions show the reality is more complex. ' +
      'Incomplete dominance: neither allele is fully dominant; the heterozygote shows an ' +
      'intermediate phenotype (red × white snapdragons → pink). Codominance: both alleles ' +
      'are fully expressed simultaneously (AB blood group — both A and B antigens present). ' +
      'Multiple alleles: a single gene may have more than two alleles in the population ' +
      '(ABO blood group has three alleles: Iᴬ, Iᴮ, i — though each individual only has two). ' +
      'Epistasis: one gene\'s expression depends on another gene (coat colour in Labrador ' +
      'retrievers — the E gene controls whether pigment is expressed at all; ee dogs are ' +
      'yellow regardless of their B/b alleles). Polygenic inheritance: many genes each ' +
      'contribute to a quantitative trait (human height, skin colour) — producing a ' +
      'continuous distribution, not discrete categories.',
    targetedMisconceptions: [],
    source: GENEINT_SRC,
  },
  {
    conceptId: GENEINT, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "incomplete dominance means both alleles are partially expressed." ' +
      'This confuses incomplete dominance (one functional gene product → half the product ' +
      '→ intermediate phenotype) with codominance (two different products both fully present). ' +
      'Pink snapdragons have half the red pigment of red ones — the red allele is not fully ' +
      'suppressed, it just doesn\'t produce enough pigment on its own. AB blood type is ' +
      'different: both A and B antigens are fully present — this is codominance. ' +
      'Second: "environmental factors don\'t affect genetic traits." Genotype sets a ' +
      'reaction norm; environment determines where within that range the phenotype falls. ' +
      'Identical twins (same genotype) differ in height, weight, and disease risk because ' +
      'environment acts on the genotype.',
    targetedMisconceptions: [`${GENEINT}:M1`],
    source: GENEINT_SRC,
  },
]
const GENEINT_PROBES: SeedProbe[] = [
  {
    conceptId: GENEINT, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A person with AB blood type has alleles Iᴬ and Iᴮ. Both A and B antigens are fully present on their red blood cells. This is an example of:',
    choices: [
      { text: 'Codominance — both alleles are fully expressed simultaneously', isCorrect: true },
      { text: 'Incomplete dominance — the two alleles produce an intermediate phenotype (neither A nor B alone)', isCorrect: false, misconceptionId: `${GENEINT}:M1` },
      { text: 'Epistasis — the B allele suppresses the A allele at the same locus', isCorrect: false },
      { text: 'Multiple allelism — the individual has more than two blood group alleles', isCorrect: false },
    ],
    correctValue: 'Codominance — both A and B antigens are fully expressed',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GENEINT}:M1`],
    source: GENEINT_SRC,
  },
  {
    conceptId: GENEINT, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Identical twins have the same DNA but often differ in height and weight. Does this mean genes don\'t determine these traits?',
    choices: [
      { text: 'No — genotype sets a reaction norm; the environment determines where within that range the phenotype falls', isCorrect: true },
      { text: 'Yes — if genes determined height and weight, identical twins would always be the same size', isCorrect: false, misconceptionId: `${GENEINT}:M2` },
    ],
    correctValue: 'No — genotype sets a range; environment determines the actual phenotype within it',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GENEINT}:M2`],
    source: GENEINT_SRC,
  },
]

// ─── bio.repro.asexual-reproduction ──────────────────────────────────────────
const ASEXREP = 'bio.repro.asexual-reproduction'
const ASEXREP_SRC = 'docs/biology/kg/graph.json — bio.repro.asexual-reproduction'
const ASEXREP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ASEXREP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Asexual reproduction produces offspring from a single parent, without fertilisation, ' +
      'generating genetically identical offspring (clones). Methods in the living world: ' +
      'Binary fission (bacteria): parent cell divides into two equal daughter cells. ' +
      'Budding (yeast, Hydra): new individual forms as an outgrowth of the parent. ' +
      'Fragmentation (starfish, flatworms): the body breaks into pieces, each regenerating. ' +
      'Sporulation (fungi, ferns): produces spores that germinate into new individuals. ' +
      'Vegetative propagation (plants): new plants form from roots (potatoes — tubers), ' +
      'stems (stolons in strawberries), or leaves (Bryophyllum). Parthenogenesis (some ' +
      'insects, reptiles): unfertilised egg develops into an adult. Advantages: fast, ' +
      'no mate needed, all offspring pass all genes. Disadvantage: no genetic variation — ' +
      'the entire population is vulnerable to the same disease or environmental change ' +
      '(no variation = no selection = no adaptation).',
    targetedMisconceptions: [],
    source: ASEXREP_SRC,
  },
  {
    conceptId: ASEXREP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "asexual reproduction is simpler and therefore less evolved." Asexual ' +
      'reproduction is not primitive — many highly complex organisms (aphids, komodo dragons, ' +
      'some sharks, most plants) use it selectively when conditions favour rapid expansion. ' +
      'Second: "clones are identical in every way." Clones share identical nuclear DNA ' +
      'but may differ in: epigenetic patterns (gene expression), mitochondrial DNA (from ' +
      'cytoplasm), and environmental effects on development. Dolly the sheep (first cloned ' +
      'mammal) was not an exact replica of her genetic donor — her telomeres were shorter ' +
      'and she aged faster, partly due to developmental environment differences.',
    targetedMisconceptions: [`${ASEXREP}:M1`],
    source: ASEXREP_SRC,
  },
]
const ASEXREP_PROBES: SeedProbe[] = [
  {
    conceptId: ASEXREP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the key evolutionary disadvantage of asexual reproduction?',
    choices: [
      { text: 'Offspring are genetically identical — no variation means the population cannot adapt if a new disease or environmental change occurs', isCorrect: true },
      { text: 'Asexual reproduction requires more energy than sexual reproduction', isCorrect: false, misconceptionId: `${ASEXREP}:M2` },
      { text: 'Offspring produced asexually are weaker than those produced sexually', isCorrect: false },
      { text: 'Asexual reproduction does not allow population size to increase rapidly', isCorrect: false },
    ],
    correctValue: 'No genetic variation — the population cannot adapt to new diseases or environments',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ASEXREP}:M2`],
    source: ASEXREP_SRC,
  },
  {
    conceptId: ASEXREP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Are cloned organisms (e.g., Dolly the sheep) truly identical to their genetic donors in every way?',
    choices: [
      { text: 'No — they share nuclear DNA but may differ in epigenetic patterns, mitochondrial DNA, and developmental environment effects', isCorrect: true },
      { text: 'Yes — identical nuclear DNA means identical development, appearance, and health outcomes', isCorrect: false, misconceptionId: `${ASEXREP}:M1` },
    ],
    correctValue: 'No — nuclear DNA is the same but epigenetics and mitochondrial DNA differ',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${ASEXREP}:M1`],
    source: ASEXREP_SRC,
  },
]

// ─── bio.mol.translation-genetic-code ────────────────────────────────────────
const TRANSLT = 'bio.mol.translation-genetic-code'
const TRANSLT_SRC = 'docs/biology/kg/graph.json — bio.mol.translation-genetic-code'
const TRANSLT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRANSLT, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Translation converts the mRNA sequence into a protein sequence at the ribosome. ' +
      'The genetic code: mRNA is read in triplets called codons; each codon specifies one ' +
      'amino acid (or start/stop signals). AUG is the start codon (also codes for methionine). ' +
      'UAA, UAG, UGA are stop codons. The code is: universal (almost all organisms use the ' +
      'same code), degenerate (multiple codons can specify the same amino acid — 64 codons ' +
      'but only 20 amino acids), and non-overlapping (read sequentially, one codon at a time). ' +
      'Translation steps: (1) Initiation — ribosome assembles on mRNA at AUG; the initiator ' +
      'tRNA (carrying Met) binds the P site. (2) Elongation — tRNA with anticodon ' +
      'complementary to the next mRNA codon enters the A site; peptide bond forms; ' +
      'ribosome translocates one codon. (3) Termination — stop codon enters A site; ' +
      'release factor cleaves the polypeptide; ribosome dissembles.',
    targetedMisconceptions: [],
    source: TRANSLT_SRC,
  },
  {
    conceptId: TRANSLT, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Degenerate" in the context of the genetic code means redundant, not faulty. ' +
      'Multiple codons coding for the same amino acid is beneficial — a mutation in the ' +
      'third codon position often changes the codon but NOT the amino acid (synonymous ' +
      'substitution), providing robustness against random mutations. Second confusion: ' +
      '"tRNA carries the genetic code." tRNA carries AMINO ACIDS; it is the adaptor ' +
      'molecule between mRNA (the code) and protein (the product). The anticodon on ' +
      'tRNA is complementary to the mRNA codon, matching code to amino acid. The ' +
      'ribosome provides the structural framework; aminoacyl-tRNA synthetase enzymes ' +
      'ensure each tRNA carries the correct amino acid.',
    targetedMisconceptions: [`${TRANSLT}:M1`],
    source: TRANSLT_SRC,
  },
]
const TRANSLT_PROBES: SeedProbe[] = [
  {
    conceptId: TRANSLT, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The mRNA sequence AUG-UUU-AAA-UAA codes for a protein. What is the last event in translation?',
    choices: [
      { text: 'A stop codon (UAA) enters the A site, a release factor cleaves the polypeptide, and the ribosome dissociates', isCorrect: true },
      { text: 'The ribosome falls off the mRNA once it runs out of codons to read', isCorrect: false, misconceptionId: `${TRANSLT}:M2` },
      { text: 'The last tRNA deposits its amino acid and remains bound to the ribosome', isCorrect: false },
      { text: 'mRNA is degraded, releasing the ribosome and the finished polypeptide simultaneously', isCorrect: false },
    ],
    correctValue: 'Stop codon → release factor → polypeptide cleaved → ribosome dissociates',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TRANSLT}:M2`],
    source: TRANSLT_SRC,
  },
  {
    conceptId: TRANSLT, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What does "degenerate genetic code" mean?',
    choices: [
      { text: 'Multiple codons specify the same amino acid — this provides robustness against silent mutations', isCorrect: true },
      { text: 'The genetic code contains errors and ambiguities that sometimes cause wrong amino acids to be incorporated', isCorrect: false, misconceptionId: `${TRANSLT}:M1` },
    ],
    correctValue: 'Multiple codons specify the same amino acid — redundancy, not error',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TRANSLT}:M1`],
    source: TRANSLT_SRC,
  },
]

// ─── bio.gen.chromosomal-theory-linkage ──────────────────────────────────────
const CHROMLINK = 'bio.gen.chromosomal-theory-linkage'
const CHROMLINK_SRC = 'docs/biology/kg/graph.json — bio.gen.chromosomal-theory-linkage'
const CHROMLINK_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHROMLINK, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The chromosomal theory of inheritance (Sutton & Boveri, 1902) proposed that genes are ' +
      'located on chromosomes — explaining why Mendel\'s ratios occur (chromosomes segregate ' +
      'during meiosis). Gene linkage: genes on the SAME chromosome tend to be inherited together ' +
      '(violating Mendel\'s Law of Independent Assortment, which only applies to genes on ' +
      'DIFFERENT chromosomes). Morgan\'s Drosophila experiments showed that linked genes can ' +
      'separate via crossing over (recombination): during meiosis I, homologous chromosomes ' +
      'exchange segments at chiasmata. The frequency of recombination between two genes is ' +
      'proportional to the distance between them — 1% recombination = 1 centimorgan (cM). ' +
      'Sex determination: humans have 23 pairs of chromosomes; pair 23 = sex chromosomes ' +
      '(XX = female, XY = male). Genes on the X chromosome show sex-linked inheritance — ' +
      'recessive X-linked conditions (haemophilia, colour blindness) affect males far more ' +
      'often because males have only one X chromosome and no Y-linked copy to mask the ' +
      'recessive allele.',
    targetedMisconceptions: [],
    source: CHROMLINK_SRC,
  },
  {
    conceptId: CHROMLINK, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common confusion: "sex-linked means affecting only one sex." Sex-linked means the ' +
      'gene is on a sex chromosome. Females CAN have X-linked recessive conditions but ' +
      'only if they are homozygous (X^a X^a) — needing two copies of the recessive allele, ' +
      'which is statistically less likely than males who only need one (X^a Y). Carrier ' +
      'females (X^A X^a) are unaffected themselves but pass the allele to sons (50% chance ' +
      'of affected sons). Second: "recombination frequency always predicts map distance ' +
      'accurately." This fails for very close genes (interference — crossover in one ' +
      'region inhibits nearby crossovers) and very distant genes (recombination frequency ' +
      'caps at 50% because multiple crossovers between distant genes produce apparent ' +
      'independent assortment).',
    targetedMisconceptions: [`${CHROMLINK}:M1`],
    source: CHROMLINK_SRC,
  },
]
const CHROMLINK_PROBES: SeedProbe[] = [
  {
    conceptId: CHROMLINK, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Haemophilia is caused by a recessive allele on the X chromosome. Why are males affected far more often than females?',
    choices: [
      { text: 'Males have only one X chromosome — a single recessive allele causes the condition; females need two recessive alleles (one on each X)', isCorrect: true },
      { text: 'The Y chromosome actively suppresses clotting factor production in affected males', isCorrect: false, misconceptionId: `${CHROMLINK}:M2` },
      { text: 'Females have a dominant autosomal gene that compensates for the X-linked recessive allele', isCorrect: false },
      { text: 'Males produce fewer clotting factors than females regardless of genotype', isCorrect: false },
    ],
    correctValue: 'Males have one X — one recessive allele is sufficient; females need two',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CHROMLINK}:M2`],
    source: CHROMLINK_SRC,
  },
  {
    conceptId: CHROMLINK, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Mendel\'s Law of Independent Assortment states that genes for different traits are inherited independently. When does this law NOT apply?',
    choices: [
      { text: 'When genes are on the same chromosome (linked) — they tend to be inherited together unless separated by crossing over', isCorrect: true },
      { text: 'When genes are on different chromosomes — genes close together on different chromosomes can be inherited together', isCorrect: false, misconceptionId: `${CHROMLINK}:M1` },
    ],
    correctValue: 'When genes are linked (on the same chromosome) — they violate independent assortment',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CHROMLINK}:M1`],
    source: CHROMLINK_SRC,
  },
]

// ─── bio.repro.sexual-reproduction-plants ────────────────────────────────────
const SEXPLANT = 'bio.repro.sexual-reproduction-plants'
const SEXPLANT_SRC = 'docs/biology/kg/graph.json — bio.repro.sexual-reproduction-plants'
const SEXPLANT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SEXPLANT, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Sexual reproduction in flowering plants (angiosperms) involves flowers, pollination, ' +
      'fertilisation, and seed dispersal. Flower structure: sepals (protect bud), petals ' +
      '(attract pollinators), stamens (male — anther produces pollen), carpels (female — ' +
      'stigma receives pollen, style, ovary contains ovules). Pollination: transfer of ' +
      'pollen from anther to stigma, either by wind (light, smooth pollen; inconspicuous ' +
      'flowers) or animal vectors (sticky or spiny pollen; brightly coloured flowers with ' +
      'nectar). Fertilisation — double fertilisation (unique to angiosperms): one sperm ' +
      'nucleus fuses with the egg cell → zygote; a second sperm nucleus fuses with the ' +
      'polar nuclei → triploid endosperm (food store). Seed dispersal: wind (maple, ' +
      'dandelion), animal-eaten fruit (berry), animal-attachment (burs), water (coconut), ' +
      'explosive mechanisms (peas). Germination: seed absorbs water → embryo resumes growth, ' +
      'using stored endosperm until photosynthesis can begin.',
    targetedMisconceptions: [],
    source: SEXPLANT_SRC,
  },
  {
    conceptId: SEXPLANT, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "pollination = fertilisation." Pollination is the TRANSFER of pollen to ' +
      'the stigma — it is only the first step. After landing on the stigma, pollen germinates ' +
      'and grows a pollen tube down the style to the ovary, reaching the ovule — only then ' +
      'does fertilisation (fusion of nuclei) occur. A flower can be pollinated without ' +
      'fertilisation if the pollen tube fails to grow. Second: "seeds require soil to ' +
      'germinate." Seeds require water, appropriate temperature, and oxygen — not soil. ' +
      'Seeds germinate successfully in water on cotton wool in labs. Soil provides minerals ' +
      'for later growth, not for germination itself, which uses endosperm reserves.',
    targetedMisconceptions: [`${SEXPLANT}:M1`],
    source: SEXPLANT_SRC,
  },
]
const SEXPLANT_PROBES: SeedProbe[] = [
  {
    conceptId: SEXPLANT, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In double fertilisation in angiosperms, what does the second sperm nucleus fuse with, and what does it form?',
    choices: [
      { text: 'The polar nuclei — forming the triploid endosperm, which is the seed\'s food store', isCorrect: true },
      { text: 'A second egg cell — forming a backup zygote in case the first fails to develop', isCorrect: false, misconceptionId: `${SEXPLANT}:M2` },
      { text: 'The antipodal cells — forming additional protective tissue around the seed', isCorrect: false },
      { text: 'The synergid cells — forming the pollen tube attachment point', isCorrect: false },
    ],
    correctValue: 'Polar nuclei → triploid endosperm (food store)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SEXPLANT}:M2`],
    source: SEXPLANT_SRC,
  },
  {
    conceptId: SEXPLANT, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'After pollen lands on a stigma, has fertilisation occurred?',
    choices: [
      { text: 'No — pollination has occurred. Fertilisation requires a pollen tube to grow down the style to reach the ovule in the ovary', isCorrect: true },
      { text: 'Yes — pollen landing on the stigma is sufficient for fertilisation to be complete', isCorrect: false, misconceptionId: `${SEXPLANT}:M1` },
    ],
    correctValue: 'No — pollination ≠ fertilisation; the pollen tube must grow to the ovule first',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SEXPLANT}:M1`],
    source: SEXPLANT_SRC,
  },
]

// ─── bio.repro.human-reproductive-system ─────────────────────────────────────
const HUMREPRO = 'bio.repro.human-reproductive-system'
const HUMREPRO_SRC = 'docs/biology/kg/graph.json — bio.repro.human-reproductive-system'
const HUMREPRO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HUMREPRO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Human reproduction is sexual — it combines genetic material from two parents, ' +
      'producing offspring with unique genetic combinations. Male system: testes produce ' +
      'sperm (spermatogenesis) and testosterone; sperm mature in epididymis; travel via ' +
      'vas deferens during ejaculation; seminal vesicles, prostate, and Cowper\'s glands ' +
      'add fluid (semen). Female system: ovaries produce eggs (oogenesis) and sex hormones ' +
      '(oestrogen, progesterone); one egg is released monthly at ovulation; the uterine ' +
      'tube (Fallopian tube) transports the egg toward the uterus; the uterus houses the ' +
      'developing foetus; the cervix and vagina complete the tract. Menstrual cycle (~28 days): ' +
      'controlled by FSH, LH, oestrogen, and progesterone in a negative-feedback loop. ' +
      'Follicular phase (day 1-14): FSH stimulates follicle maturation; oestrogen rises → ' +
      'LH surge → ovulation (day 14). Luteal phase (day 14-28): ruptured follicle becomes ' +
      'corpus luteum → progesterone maintains uterine lining. If no fertilisation: ' +
      'corpus luteum degenerates, progesterone drops → menstruation.',
    targetedMisconceptions: [],
    source: HUMREPRO_SRC,
  },
  {
    conceptId: HUMREPRO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "ovulation always occurs on day 14." Day 14 is the average in a 28-day ' +
      'cycle — it is not fixed. Cycle length varies between women and between cycles; ' +
      'ovulation timing tracks the LH surge, not a calendar day. Contraceptive methods ' +
      'that rely on calendar-only rhythm methods fail partly because ovulation timing ' +
      'is variable. Second: "the egg is fertilised in the uterus." Fertilisation occurs ' +
      'in the Fallopian tube (uterine tube), typically in the outer third. The zygote ' +
      'then travels to the uterus over 3-4 days, dividing as it travels, and implants ' +
      'in the uterine wall. An ectopic pregnancy (implantation in the tube) is a ' +
      'medical emergency because the tube cannot expand to accommodate the growing embryo.',
    targetedMisconceptions: [`${HUMREPRO}:M1`, `${HUMREPRO}:M2`],
    source: HUMREPRO_SRC,
  },
]
const HUMREPRO_PROBES: SeedProbe[] = [
  {
    conceptId: HUMREPRO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What hormone surge triggers ovulation in the menstrual cycle?',
    choices: [
      { text: 'LH (luteinising hormone) surge — triggered by rising oestrogen; causes the mature follicle to rupture and release the egg', isCorrect: true },
      { text: 'FSH surge — FSH stimulates the follicle to rupture and release the egg directly', isCorrect: false, misconceptionId: `${HUMREPRO}:M3` },
      { text: 'Progesterone surge — rising progesterone signals the follicle to release the egg', isCorrect: false },
      { text: 'Oestrogen surge — oestrogen directly causes the follicle to rupture', isCorrect: false },
    ],
    correctValue: 'LH surge — triggered by rising oestrogen; causes follicle to rupture',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HUMREPRO}:M3`],
    source: HUMREPRO_SRC,
  },
  {
    conceptId: HUMREPRO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Where does fertilisation of the human egg typically occur?',
    choices: [
      { text: 'In the Fallopian tube (uterine tube) — the zygote then travels to the uterus over several days before implanting', isCorrect: true },
      { text: 'In the uterus — the egg must reach the uterus before a sperm can fertilise it', isCorrect: false, misconceptionId: `${HUMREPRO}:M2` },
    ],
    correctValue: 'In the Fallopian tube — the zygote travels to the uterus after fertilisation',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${HUMREPRO}:M2`],
    source: HUMREPRO_SRC,
  },
]

// ─── bio.immuno.innate-adaptive-immunity ─────────────────────────────────────
const INNATEADAP = 'bio.immuno.innate-adaptive-immunity'
const INNATEADAP_SRC = 'docs/biology/kg/graph.json — bio.immuno.innate-adaptive-immunity'
const INNATEADAP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INNATEADAP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The immune system operates in two coordinated layers. Innate immunity is fast ' +
      '(minutes to hours), non-specific, and uses the same response for any pathogen. ' +
      'It includes physical barriers (skin, mucus), complement proteins, phagocytes ' +
      '(neutrophils, macrophages), NK cells, and inflammation. Pattern Recognition Receptors ' +
      '(PRRs) on innate cells detect conserved pathogen features (PAMPs — Pathogen-Associated ' +
      'Molecular Patterns) absent from human cells. Adaptive immunity is slow (days to weeks) ' +
      'but exquisitely specific and retains memory. B lymphocytes: stimulated by antigen → ' +
      'differentiate into plasma cells (secreting antibodies) and memory B cells. ' +
      'T lymphocytes: T helper cells (CD4⁺) coordinate the response; cytotoxic T cells ' +
      '(CD8⁺) kill infected cells directly; regulatory T cells prevent autoimmunity. ' +
      'MHC molecules (Major Histocompatibility Complex): display peptide fragments on ' +
      'cell surfaces for T cell recognition — the basis of transplant rejection when donor ' +
      'and recipient MHC types do not match.',
    targetedMisconceptions: [],
    source: INNATEADAP_SRC,
  },
  {
    conceptId: INNATEADAP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "innate and adaptive are sequential — innate first, then adaptive replaces it." ' +
      'Both layers operate simultaneously; the innate response does not hand off to the adaptive ' +
      'and stop. Innate responses continue throughout infection; adaptive responses amplify ' +
      'and refine them. Dendritic cells bridge the two: they engulf pathogens (innate) then ' +
      'travel to lymph nodes and present antigens to T cells (activating adaptive). ' +
      'Second: "you either have an immune response or you don\'t." The response is scaled — ' +
      'a small local infection triggers local innate responses; a systemic infection triggers ' +
      'systemic fever, cytokine release, and full adaptive mobilisation. Cytokine storms ' +
      '(seen in severe COVID-19 and some influenza cases) are excessive systemic immune ' +
      'activation causing more damage than the pathogen itself.',
    targetedMisconceptions: [`${INNATEADAP}:M1`],
    source: INNATEADAP_SRC,
  },
]
const INNATEADAP_PROBES: SeedProbe[] = [
  {
    conceptId: INNATEADAP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which cells bridge innate and adaptive immunity by engulfing pathogens and then presenting antigens to T lymphocytes?',
    choices: [
      { text: 'Dendritic cells — they perform innate phagocytosis then migrate to lymph nodes to activate T cells', isCorrect: true },
      { text: 'Neutrophils — the first responders; they also activate T cells after phagocytosis', isCorrect: false, misconceptionId: `${INNATEADAP}:M2` },
      { text: 'NK cells — they kill infected cells and then activate the adaptive response', isCorrect: false },
      { text: 'B cells — they engulf pathogens and present antigens to T helper cells', isCorrect: false },
    ],
    correctValue: 'Dendritic cells — innate phagocytosis, then antigen presentation to T cells',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INNATEADAP}:M2`],
    source: INNATEADAP_SRC,
  },
  {
    conceptId: INNATEADAP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does the innate immune system stop working once the adaptive immune response kicks in?',
    choices: [
      { text: 'No — both layers operate simultaneously throughout the infection; innate does not hand off and stop', isCorrect: true },
      { text: 'Yes — once adaptive immunity is activated, innate responses are suppressed to avoid redundancy', isCorrect: false, misconceptionId: `${INNATEADAP}:M1` },
    ],
    correctValue: 'No — innate and adaptive both continue; they cooperate, not replace each other',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INNATEADAP}:M1`],
    source: INNATEADAP_SRC,
  },
]

// ─── bio.immuno.antibody-structure-function ───────────────────────────────────
const ANTIBODY = 'bio.immuno.antibody-structure-function'
const ANTIBODY_SRC = 'docs/biology/kg/graph.json — bio.immuno.antibody-structure-function'
const ANTIBODY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANTIBODY, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Antibodies (immunoglobulins) are Y-shaped glycoproteins produced by plasma cells ' +
      '(differentiated B cells) that specifically recognise and bind to antigens. Structure: ' +
      'four polypeptide chains — two identical heavy chains and two identical light chains ' +
      'linked by disulfide bonds. Each arm of the Y contains a variable region (antigen- ' +
      'binding site, unique to that antibody) and a constant region (determines antibody ' +
      'class and effector function). The variable regions form the antigen-binding site — ' +
      'highly specific, fitting a single epitope (antigenic determinant) like a lock and key. ' +
      'Five antibody classes (isotypes): IgM (first responder, pentamer), IgG (most abundant, ' +
      'crosses placenta — provides maternal immunity to newborns), IgA (mucosal secretions, ' +
      'breast milk), IgE (parasites and allergy), IgD (B cell receptor). Effector mechanisms: ' +
      'neutralisation (blocks pathogen binding sites), opsonisation (coating for phagocytosis), ' +
      'complement activation (lysis), agglutination (clumping).',
    targetedMisconceptions: [],
    source: ANTIBODY_SRC,
  },
  {
    conceptId: ANTIBODY, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "antibodies directly kill pathogens." Antibodies do not directly destroy ' +
      'bacteria or viruses — they mark them, neutralise them, or activate other mechanisms ' +
      '(complement, phagocytosis) that do the killing. An antibody bound to a bacterium ' +
      'is a flag, not a weapon. Second: "one antibody type works against all pathogens." ' +
      'Each antibody binds one specific epitope. The immune system generates ~10⁶ to 10⁷ ' +
      'different antibodies (diversity created by VDJ recombination) to cover the enormous ' +
      'range of possible antigens. Third: "newborns have no immune protection." Newborns ' +
      'receive IgG from their mother through the placenta (before birth) and IgA through ' +
      'breast milk — passive immunity that protects while their own adaptive immune ' +
      'system develops.',
    targetedMisconceptions: [`${ANTIBODY}:M1`, `${ANTIBODY}:M2`],
    source: ANTIBODY_SRC,
  },
]
const ANTIBODY_PROBES: SeedProbe[] = [
  {
    conceptId: ANTIBODY, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which antibody class provides passive immunity to newborns by crossing the placenta during pregnancy?',
    choices: [
      { text: 'IgG — it is the only antibody class that can cross the placenta, providing the foetus with maternal antibodies', isCorrect: true },
      { text: 'IgM — it is the first antibody produced and is transferred to protect the newborn immediately', isCorrect: false, misconceptionId: `${ANTIBODY}:M3` },
      { text: 'IgA — found in breast milk; it is small enough to cross the placenta', isCorrect: false },
      { text: 'IgE — produced in large amounts during pregnancy to prime the newborn\'s immune system', isCorrect: false },
    ],
    correctValue: 'IgG — crosses the placenta and provides passive immunity to the foetus',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ANTIBODY}:M3`],
    source: ANTIBODY_SRC,
  },
  {
    conceptId: ANTIBODY, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do antibodies directly kill bacteria?',
    choices: [
      { text: 'No — antibodies neutralise, mark, or activate complement/phagocytes; the actual killing is done by other immune mechanisms', isCorrect: true },
      { text: 'Yes — the constant region of the antibody directly lyses the bacterial cell membrane', isCorrect: false, misconceptionId: `${ANTIBODY}:M1` },
    ],
    correctValue: 'No — antibodies are flags and neutralisers; other mechanisms do the killing',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ANTIBODY}:M1`],
    source: ANTIBODY_SRC,
  },
]

// ─── bio.immuno.vaccination-immunisation ─────────────────────────────────────
const VACCINE = 'bio.immuno.vaccination-immunisation'
const VACCINE_SRC = 'docs/biology/kg/graph.json — bio.immuno.vaccination-immunisation'
const VACCINE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VACCINE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Vaccination exploits immunological memory — the adaptive immune system\'s ability to ' +
      'respond faster and stronger to a pathogen seen before. A vaccine presents an antigen ' +
      '(or instruction to make one) in a safe context that cannot cause disease, priming the ' +
      'immune system to produce memory B and T cells. Types: Live-attenuated (weakened pathogen ' +
      '— MMR, chickenpox): strong, long-lasting immunity; cannot be given to immunocompromised ' +
      'patients. Inactivated (killed pathogen — influenza shot, polio IPV): safer but weaker; ' +
      'often needs boosters. Subunit/protein (just an antigen protein — hepatitis B, pertussis ' +
      'component): very safe; may need adjuvant to boost response. Toxoid (inactivated toxin — ' +
      'tetanus, diphtheria): protects against toxins not the bacteria themselves. mRNA ' +
      '(COVID-19 Pfizer/Moderna): instructs cells to make spike protein antigen; rapidly ' +
      'designed; mRNA degraded in days, never enters the nucleus, cannot alter DNA. ' +
      'Herd immunity: when enough of a population is immune (threshold varies by pathogen ' +
      'transmissibility — measles requires ~95%), transmission chains break, protecting ' +
      'the unvaccinated.',
    targetedMisconceptions: [],
    source: VACCINE_SRC,
  },
  {
    conceptId: VACCINE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Critical misconception: "mRNA vaccines alter your DNA." mRNA cannot alter DNA ' +
      'because: (1) mRNA is degraded within days of injection; (2) mRNA never enters the ' +
      'nucleus (where DNA is); (3) human cells have no reverse transcriptase to convert ' +
      'mRNA to DNA under normal circumstances. The mRNA instructs ribosomes in the cytoplasm ' +
      'to make spike protein — then it is degraded. Second: "natural immunity is always ' +
      'better than vaccine immunity." Natural immunity after infection is often strong but ' +
      'requires surviving the disease, which kills millions per year. Vaccines achieve ' +
      'comparable memory responses with dramatically lower risk. For some diseases ' +
      '(e.g., HPV), vaccines actually produce stronger and more durable antibody responses ' +
      'than natural infection.',
    targetedMisconceptions: [`${VACCINE}:M1`],
    source: VACCINE_SRC,
  },
]
const VACCINE_PROBES: SeedProbe[] = [
  {
    conceptId: VACCINE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why do mRNA vaccines (like COVID-19 vaccines) not alter the recipient\'s DNA?',
    choices: [
      { text: 'mRNA is degraded in the cytoplasm within days and never enters the nucleus, so it cannot interact with DNA', isCorrect: true },
      { text: 'The vaccines contain a protective chemical that prevents mRNA from reaching the nucleus', isCorrect: false, misconceptionId: `${VACCINE}:M2` },
      { text: 'DNA is too tightly wound in chromosomes for mRNA to access and modify it', isCorrect: false },
      { text: 'The immune system destroys mRNA vaccines before they can enter any cell', isCorrect: false },
    ],
    correctValue: 'mRNA stays in cytoplasm and is degraded — it never reaches the nucleus',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VACCINE}:M2`],
    source: VACCINE_SRC,
  },
  {
    conceptId: VACCINE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What is "herd immunity" and why does it protect unvaccinated people?',
    choices: [
      { text: 'When enough people are immune, transmission chains break — the pathogen cannot find enough susceptible hosts to spread', isCorrect: true },
      { text: 'Vaccinated people produce antibodies that spread to unvaccinated people through close contact', isCorrect: false, misconceptionId: `${VACCINE}:M3` },
    ],
    correctValue: 'Sufficient immune people break transmission chains — pathogen cannot find susceptible hosts',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VACCINE}:M3`],
    source: VACCINE_SRC,
  },
]

// ─── bio.gen.pedigree-human-genetics ─────────────────────────────────────────
const PEDIGREE = 'bio.gen.pedigree-human-genetics'
const PEDIGREE_SRC = 'docs/biology/kg/graph.json — bio.gen.pedigree-human-genetics'
const PEDIGREE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PEDIGREE, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Pedigree analysis traces the inheritance of traits through generations of a family, ' +
      'allowing determination of inheritance patterns without experimental crosses. Symbols: ' +
      'squares = males; circles = females; shaded = affected; horizontal line = mating; ' +
      'vertical line = offspring; Roman numerals = generations; Arabic numerals = individuals. ' +
      'Determining the pattern: Autosomal dominant — affected in every generation; affects ' +
      'both sexes equally; affected × unaffected can produce unaffected offspring. ' +
      'Autosomal recessive — may skip generations; unaffected carriers can have affected ' +
      'children; both sexes equally affected. X-linked recessive — mostly males affected; ' +
      'carrier mothers pass it to 50% of sons; affected fathers do NOT pass it to sons ' +
      '(sons get Y from father). X-linked dominant — all daughters of affected fathers ' +
      'are affected; twice as many females affected as males. Calculating probabilities: ' +
      'apply Mendelian ratios to each mating pair to find probability for next generation.',
    targetedMisconceptions: [],
    source: PEDIGREE_SRC,
  },
  {
    conceptId: PEDIGREE, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "if a trait skips a generation, it must be recessive." Skipping generations ' +
      'is evidence for but NOT proof of recessiveness — a dominant condition could appear ' +
      'absent if penetrance is incomplete (some people with the allele don\'t express the ' +
      'trait). Conversely, recessives don\'t always skip — if carrier × carrier is common. ' +
      'The correct approach: test every feature against each pattern. Second: "an unaffected ' +
      'person cannot be a carrier for a dominant condition." Incomplete penetrance means ' +
      'carriers of dominant alleles sometimes do not show the phenotype. For simple pedigree ' +
      'problems at A-level, this complication is usually excluded — but do not assume ' +
      'absence of phenotype always means absence of allele.',
    targetedMisconceptions: [`${PEDIGREE}:M1`],
    source: PEDIGREE_SRC,
  },
]
const PEDIGREE_PROBES: SeedProbe[] = [
  {
    conceptId: PEDIGREE, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a pedigree, an affected man (X-linked recessive) has all unaffected daughters. What can we conclude about the daughters?',
    choices: [
      { text: 'All daughters are carriers — they received the X-linked recessive allele from their father (his only X)', isCorrect: true },
      { text: 'The daughters are unaffected, so they did not inherit the allele from their father', isCorrect: false, misconceptionId: `${PEDIGREE}:M2` },
      { text: 'Approximately half the daughters are carriers, depending on the mother\'s genotype', isCorrect: false },
      { text: 'The daughters\' X-linked status cannot be determined without knowing the mother\'s genotype', isCorrect: false },
    ],
    correctValue: 'All daughters are carriers — father passes his only X (carrying the allele) to all daughters',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PEDIGREE}:M2`],
    source: PEDIGREE_SRC,
  },
  {
    conceptId: PEDIGREE, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A trait appears in every generation of a pedigree and affects both sexes equally. What inheritance pattern does this suggest?',
    choices: [
      { text: 'Autosomal dominant — expressed in every generation when inherited; both sexes equally affected because the gene is on an autosome', isCorrect: true },
      { text: 'X-linked dominant — X-linked traits always appear in every generation', isCorrect: false, misconceptionId: `${PEDIGREE}:M3` },
    ],
    correctValue: 'Autosomal dominant — both sexes equally, every generation when inherited',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PEDIGREE}:M3`],
    source: PEDIGREE_SRC,
  },
]

// ─── bio.gen.mutations ────────────────────────────────────────────────────────
const MUTATIONS = 'bio.gen.mutations'
const MUTATIONS_SRC = 'docs/biology/kg/graph.json — bio.gen.mutations'
const MUTATIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MUTATIONS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A mutation is any heritable change in the DNA sequence. Gene mutations affect single ' +
      'genes; chromosomal mutations affect chromosome number or structure. Gene mutation types: ' +
      'Substitution — one base replaced by another; may be synonymous (same amino acid, ' +
      'silent), missense (different amino acid, may alter protein function), or nonsense ' +
      '(creates a stop codon, truncating the protein — usually severe). ' +
      'Insertion/Deletion — adding or removing bases; if the number is not a multiple of 3, ' +
      'causes a frameshift mutation (all downstream codons are misread, usually catastrophic). ' +
      'Chromosomal: Aneuploidy — wrong chromosome number (Down syndrome = trisomy 21; ' +
      'Turner syndrome = 45,X; Klinefelter = 47,XXY); caused by non-disjunction in meiosis. ' +
      'Translocation, deletion, inversion, duplication affect chromosome segments. ' +
      'Most mutations are neutral or harmful; rare mutations are beneficial and subject to ' +
      'positive selection. Mutagens (UV, ionising radiation, some chemicals) increase mutation rate.',
    targetedMisconceptions: [],
    source: MUTATIONS_SRC,
  },
  {
    conceptId: MUTATIONS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Mutations are always harmful and cause disease." The vast majority of mutations ' +
      'are neutral — they occur in non-coding regions, produce synonymous codons, or ' +
      'are in cells that do not reproduce. Most human genetic diversity is built from ' +
      'accumulated neutral mutations. A small fraction cause disease (e.g., BRCA1 mutations, ' +
      'cystic fibrosis alleles); a tiny fraction are beneficial (CCR5-Δ32 deletion confers ' +
      'HIV resistance). Natural selection acts on this spectrum. Second: "a single base ' +
      'change always causes major disease." Haemoglobin S (sickle-cell) differs from ' +
      'normal haemoglobin by ONE amino acid substitution in one protein — yet causes ' +
      'catastrophic RBC sickling under low oxygen, illustrating how critical protein ' +
      'structure is to function.',
    targetedMisconceptions: [`${MUTATIONS}:M1`],
    source: MUTATIONS_SRC,
  },
]
const MUTATIONS_PROBES: SeedProbe[] = [
  {
    conceptId: MUTATIONS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A single nucleotide is inserted into a coding gene. This is likely to be catastrophic because:',
    choices: [
      { text: 'It causes a frameshift — all codons downstream of the insertion are misread, producing a completely altered protein', isCorrect: true },
      { text: 'Inserting a nucleotide always creates a stop codon, truncating the protein', isCorrect: false, misconceptionId: `${MUTATIONS}:M2` },
      { text: 'The insertion doubles the size of the affected amino acid, disrupting the protein\'s three-dimensional shape', isCorrect: false },
      { text: 'Single insertions prevent the ribosome from initiating translation at AUG', isCorrect: false },
    ],
    correctValue: 'Frameshift mutation — all downstream codons are misread',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MUTATIONS}:M2`],
    source: MUTATIONS_SRC,
  },
  {
    conceptId: MUTATIONS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Are most mutations in the human genome harmful?',
    choices: [
      { text: 'No — most mutations are neutral (in non-coding regions, synonymous, or in non-dividing cells); harmful mutations are the minority', isCorrect: true },
      { text: 'Yes — any change to DNA is harmful; the genome is so precisely tuned that any alteration damages function', isCorrect: false, misconceptionId: `${MUTATIONS}:M1` },
    ],
    correctValue: 'No — the vast majority of mutations are neutral; harmful ones are a minority',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MUTATIONS}:M1`],
    source: MUTATIONS_SRC,
  },
]

// ─── bio.immuno.immune-disorders ─────────────────────────────────────────────
const IMDISORD = 'bio.immuno.immune-disorders'
const IMDISORD_SRC = 'docs/biology/kg/graph.json — bio.immuno.immune-disorders'
const IMDISORD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IMDISORD, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Immune disorders arise when the immune system is overactive (attacking self or mounting ' +
      'disproportionate responses) or underactive (failing to defend against pathogens). ' +
      'Autoimmune diseases: T and B cells fail to distinguish self from non-self — attack ' +
      'the body\'s own cells. Examples: Type 1 diabetes (T cells destroy pancreatic β-cells), ' +
      'rheumatoid arthritis (joints), multiple sclerosis (myelin), lupus (multi-organ). ' +
      'Mechanism: central tolerance failure (autoreactive lymphocytes not deleted in thymus/ ' +
      'bone marrow) or peripheral tolerance failure (regulatory T cells insufficient). ' +
      'Allergies (hypersensitivity type I): IgE-mediated response to harmless antigens ' +
      '(allergens). Prior sensitisation → IgE binds mast cells. Re-exposure → allergen ' +
      'cross-links IgE → mast cell degranulation → histamine release → inflammation. ' +
      'Anaphylaxis is severe systemic mast cell degranulation (epinephrine = treatment). ' +
      'Immunodeficiency: primary (genetic — SCID, agammaglobulinaemia) or secondary ' +
      '(acquired — HIV destroys CD4⁺ T helper cells, collapsing adaptive immunity; ' +
      'AIDS is the resulting syndrome of opportunistic infections).',
    targetedMisconceptions: [],
    source: IMDISORD_SRC,
  },
  {
    conceptId: IMDISORD, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Confusion: "autoimmune diseases are caused by a weak immune system." They are caused ' +
      'by a misdirected immune system — one that is often hyperactive in the wrong direction. ' +
      'Patients with autoimmune diseases are not immunocompromised against pathogens (some ' +
      'treatments that suppress autoimmunity DO then increase infection risk, but that is a ' +
      'treatment effect, not the disease). Second: "allergies are caused by a weak immune ' +
      'system." Allergies are caused by an overactive response to harmless antigens. ' +
      'The hygiene hypothesis proposes that reduced childhood exposure to diverse microbes ' +
      '(cleaner modern environments) leaves the immune system undirected and prone to ' +
      'misdirecting at allergens — an interesting partial explanation but not the complete picture.',
    targetedMisconceptions: [`${IMDISORD}:M1`],
    source: IMDISORD_SRC,
  },
]
const IMDISORD_PROBES: SeedProbe[] = [
  {
    conceptId: IMDISORD, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In type I hypersensitivity (allergy), what triggers mast cell degranulation and histamine release?',
    choices: [
      { text: 'Cross-linking of IgE antibodies already bound to mast cells by allergen binding on re-exposure', isCorrect: true },
      { text: 'IgG antibodies activating complement on the allergen surface, triggering mast cell activation', isCorrect: false, misconceptionId: `${IMDISORD}:M2` },
      { text: 'Direct allergen binding to mast cell receptors, bypassing IgE on first exposure', isCorrect: false },
      { text: 'T helper cell cytokines instructing mast cells to degranulate in response to the allergen', isCorrect: false },
    ],
    correctValue: 'Cross-linking of mast-cell-bound IgE by allergen on re-exposure',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${IMDISORD}:M2`],
    source: IMDISORD_SRC,
  },
  {
    conceptId: IMDISORD, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does HIV directly kill infected CD4⁺ T cells, or does it cause AIDS through a different mechanism?',
    choices: [
      { text: 'HIV infects and destroys CD4⁺ T cells over years, gradually collapsing adaptive immunity until opportunistic infections define AIDS', isCorrect: true },
      { text: 'HIV causes AIDS by directly infecting and destroying all immune cell types simultaneously', isCorrect: false, misconceptionId: `${IMDISORD}:M3` },
    ],
    correctValue: 'HIV destroys CD4⁺ T cells gradually; AIDS = resulting collapse of adaptive immunity',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${IMDISORD}:M3`],
    source: IMDISORD_SRC,
  },
]

// ─── bio.mol.gene-regulation ──────────────────────────────────────────────────
const GENEREG = 'bio.mol.gene-regulation'
const GENEREG_SRC = 'docs/biology/kg/graph.json — bio.mol.gene-regulation'
const GENEREG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GENEREG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Every cell in an organism contains the same genome, yet liver cells, neurons, and ' +
      'muscle cells are structurally and functionally distinct — because they express ' +
      'different subsets of genes. Gene regulation controls which genes are transcribed ' +
      '(and how much), when, and in which cells. Prokaryotic model — lac operon (E. coli): ' +
      'a repressor protein binds the operator, blocking RNA polymerase when lactose is absent. ' +
      'When lactose is present, allolactose binds and inactivates the repressor → operon ' +
      'is transcribed → enzymes digest lactose. A classic negative-feedback off-switch. ' +
      'Eukaryotic regulation is more complex: transcription factors bind enhancers ' +
      '(regulatory sequences, may be distant from the gene) and interact with the ' +
      'mediator complex and RNA polymerase. Chromatin structure: DNA wrapped around ' +
      'histones; acetylation relaxes chromatin → transcription on; deacetylation ' +
      'compacts → transcription off. Methylation of cytosine typically silences genes. ' +
      'These epigenetic marks are heritable through cell division without changing DNA sequence.',
    targetedMisconceptions: [],
    source: GENEREG_SRC,
  },
  {
    conceptId: GENEREG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Confusion: "epigenetic changes alter DNA sequence." Epigenetic modifications ' +
      '(methylation, histone acetylation) change WHICH genes are expressed without ' +
      'altering the underlying DNA base sequence. They are like dimmer switches on ' +
      'existing wiring — not rewiring. They can be reversed; some are heritable through ' +
      'mitosis. Second: "all enhancers are near the genes they regulate." Enhancers can ' +
      'be thousands of base pairs away from their target gene — even on the same chromosome ' +
      'but looping physically close, or on a different chromosome in some cases. This ' +
      'long-range regulation was initially counterintuitive and required 3D chromatin ' +
      'structure data (Hi-C sequencing) to map reliably.',
    targetedMisconceptions: [`${GENEREG}:M1`],
    source: GENEREG_SRC,
  },
]
const GENEREG_PROBES: SeedProbe[] = [
  {
    conceptId: GENEREG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In the lac operon, what happens to gene expression when lactose is absent?',
    choices: [
      { text: 'The repressor binds the operator, blocking RNA polymerase — genes for lactose metabolism are not transcribed', isCorrect: true },
      { text: 'RNA polymerase is degraded to prevent wasteful transcription in the absence of substrate', isCorrect: false, misconceptionId: `${GENEREG}:M2` },
      { text: 'The operon is transcribed at low levels continuously regardless of lactose', isCorrect: false },
      { text: 'The promoter is methylated to silence the operon when lactose is not available', isCorrect: false },
    ],
    correctValue: 'Repressor binds operator → RNA polymerase blocked → no transcription',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GENEREG}:M2`],
    source: GENEREG_SRC,
  },
  {
    conceptId: GENEREG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does epigenetic modification change the DNA sequence?',
    choices: [
      { text: 'No — epigenetic changes (methylation, histone modifications) alter gene expression without changing the underlying DNA base sequence', isCorrect: true },
      { text: 'Yes — methylation adds a methyl group directly to a base, permanently altering the nucleotide\'s chemical identity', isCorrect: false, misconceptionId: `${GENEREG}:M1` },
    ],
    correctValue: 'No — epigenetics changes gene expression without altering the DNA sequence',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GENEREG}:M1`],
    source: GENEREG_SRC,
  },
]

// ─── bio.gen.population-genetics ─────────────────────────────────────────────
const POPGEN = 'bio.gen.population-genetics'
const POPGEN_SRC = 'docs/biology/kg/graph.json — bio.gen.population-genetics'
const POPGEN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POPGEN, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Population genetics studies allele and genotype frequencies in populations and how ' +
      'they change over time. Hardy-Weinberg equilibrium (HWE): in a non-evolving population ' +
      '(large, random mating, no selection/mutation/migration/genetic drift), allele frequencies ' +
      'remain constant across generations. Equations: p + q = 1 (allele frequencies); ' +
      'p² + 2pq + q² = 1 (genotype frequencies — p² = homozygous dominant, 2pq = ' +
      'heterozygous, q² = homozygous recessive). HWE is used to: (1) calculate carrier ' +
      'frequency for recessive diseases from disease incidence; (2) test whether a population ' +
      'IS evolving (deviation from HWE = one of the assumptions violated). Forces that change ' +
      'allele frequencies: Natural selection, Mutation, Gene flow (migration), Genetic drift ' +
      '(random sampling — most powerful in small populations: bottleneck effect, founder ' +
      'effect). Modern synthesis: evolution = change in allele frequencies across generations.',
    targetedMisconceptions: [],
    source: POPGEN_SRC,
  },
  {
    conceptId: POPGEN, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"Dominant alleles become more common over time." This is the most common misconception ' +
      'in population genetics. Dominance describes EXPRESSION in heterozygotes, not selection ' +
      'advantage or frequency trend. In HWE, a dominant allele stays at whatever frequency it ' +
      'starts at. Harmful recessive alleles can persist at surprisingly high frequencies ' +
      'because natural selection cannot "see" recessives hidden in heterozygotes (carriers). ' +
      'Cystic fibrosis allele frequency ~2% despite carriers having no reduced fitness — ' +
      'selection eliminates only the ~0.04% who are homozygous recessive, which is very slow. ' +
      '"Random genetic drift" sounds like an imprecise catch-all — but it describes the ' +
      'mathematically predictable consequence of sampling: in small populations, allele ' +
      'frequencies fluctuate MORE by chance and fixation of alleles (p=0 or p=1) is more ' +
      'likely than selection-driven fixation.',
    targetedMisconceptions: [`${POPGEN}:M1`],
    source: POPGEN_SRC,
  },
]
const POPGEN_PROBES: SeedProbe[] = [
  {
    conceptId: POPGEN, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a Hardy-Weinberg population, 9% of individuals have cystic fibrosis (autosomal recessive). What is the carrier frequency?',
    choices: [
      { text: '42% — q = √0.09 = 0.3; p = 0.7; carrier frequency 2pq = 2 × 0.7 × 0.3 = 0.42', isCorrect: true },
      { text: '18% — twice the disease frequency', isCorrect: false, misconceptionId: `${POPGEN}:M2` },
      { text: '91% — everyone who does not have the disease is a carrier', isCorrect: false },
      { text: '30% — equal to the recessive allele frequency', isCorrect: false },
    ],
    correctValue: '42% — q=0.3, p=0.7, 2pq=0.42',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${POPGEN}:M2`],
    source: POPGEN_SRC,
  },
  {
    conceptId: POPGEN, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Will a dominant allele always increase in frequency in a population over time?',
    choices: [
      { text: 'No — dominance describes expression in heterozygotes, not fitness; dominant alleles can decrease if they reduce survival/reproduction', isCorrect: true },
      { text: 'Yes — by definition, dominant alleles are always selected for over recessives', isCorrect: false, misconceptionId: `${POPGEN}:M1` },
    ],
    correctValue: 'No — dominance = expression pattern; frequency depends on fitness, not dominance',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${POPGEN}:M1`],
    source: POPGEN_SRC,
  },
]

// ─── bio.repro.fertilisation-development ─────────────────────────────────────
const FERTDEV = 'bio.repro.fertilisation-development'
const FERTDEV_SRC = 'docs/biology/kg/graph.json — bio.repro.fertilisation-development'
const FERTDEV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FERTDEV, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Fertilisation is the fusion of gametes (sperm and egg) to form a diploid zygote. ' +
      'The sperm must reach the egg in the Fallopian tube: capacitation (sperm gain ' +
      'fertilising ability in the female tract), acrosome reaction (enzymes released to ' +
      'penetrate zona pellucida), cortical reaction (membrane changes prevent polyspermy). ' +
      'Early development — cleavage: the zygote divides mitotically without growing, ' +
      'producing a morula (solid ball), then blastocyst (hollow, with inner cell mass and ' +
      'trophoblast). Implantation: the blastocyst embeds in the uterine wall (endometrium) ' +
      'around day 6-10. Gastrulation: the three primary germ layers form — ectoderm ' +
      '(skin, nervous system), mesoderm (muscle, bone, circulatory), endoderm (gut lining, ' +
      'lungs). Neurulation: the neural plate folds to form the neural tube → brain and ' +
      'spinal cord. Organogenesis follows, completing major organ formation by week 8 ' +
      '(embryo → foetus). Placenta: forms from trophoblast cells; interface for gas and ' +
      'nutrient exchange between mother and foetus without mixing blood.',
    targetedMisconceptions: [],
    source: FERTDEV_SRC,
  },
  {
    conceptId: FERTDEV, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "the mother\'s blood flows into the foetus through the placenta." ' +
      'Maternal and foetal blood circulations are separate and never mix in a healthy ' +
      'pregnancy. The placenta is a selectively permeable barrier: O2, glucose, amino ' +
      'acids, antibodies (IgG), and some drugs cross; foetal and maternal blood cells do ' +
      'not (normally). This separation is why Rh incompatibility matters: if foetal ' +
      'Rh+ blood enters the Rh− mother\'s circulation (usually only during delivery), ' +
      'she develops anti-Rh antibodies — dangerous in subsequent Rh+ pregnancies. ' +
      'Second: "identical twins are always exactly alike." Identical twins share nuclear ' +
      'DNA but differ in epigenetic patterns (which accumulate differences over a lifetime), ' +
      'position effects in the womb, and environmental exposures — leading to divergent ' +
      'disease risks despite identical genotype.',
    targetedMisconceptions: [`${FERTDEV}:M1`],
    source: FERTDEV_SRC,
  },
]
const FERTDEV_PROBES: SeedProbe[] = [
  {
    conceptId: FERTDEV, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'From which primary germ layer do the nervous system and skin derive?',
    choices: [
      { text: 'Ectoderm — it gives rise to the nervous system (via the neural tube) and the epidermis of the skin', isCorrect: true },
      { text: 'Mesoderm — it gives rise to all internal organs including brain and spinal cord', isCorrect: false, misconceptionId: `${FERTDEV}:M2` },
      { text: 'Endoderm — the innermost layer forms the most vital organs, including the brain', isCorrect: false },
      { text: 'Trophoblast — the first differentiated layer of the blastocyst forms both the nervous system and skin', isCorrect: false },
    ],
    correctValue: 'Ectoderm — nervous system (neural tube) and skin (epidermis)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${FERTDEV}:M2`],
    source: FERTDEV_SRC,
  },
  {
    conceptId: FERTDEV, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does maternal blood flow directly into the foetal circulation through the placenta?',
    choices: [
      { text: 'No — maternal and foetal blood circulations are separate; gases and nutrients diffuse across the placental barrier without blood mixing', isCorrect: true },
      { text: 'Yes — the placenta allows maternal blood to supply oxygen directly to the foetal heart for circulation', isCorrect: false, misconceptionId: `${FERTDEV}:M1` },
    ],
    correctValue: 'No — maternal and foetal circulations are separate; exchange is by diffusion',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${FERTDEV}:M1`],
    source: FERTDEV_SRC,
  },
]

// ─── bio.repro.reproductive-health ───────────────────────────────────────────
const REPHEALTH = 'bio.repro.reproductive-health'
const REPHEALTH_SRC = 'docs/biology/kg/graph.json — bio.repro.reproductive-health'
const REPHEALTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REPHEALTH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Reproductive health encompasses the full physical, mental, and social well-being ' +
      'related to the reproductive system — not merely the absence of disease. Key areas: ' +
      'Contraception: methods preventing fertilisation or implantation. Barrier methods ' +
      '(condoms, diaphragm): prevent sperm from reaching the egg. Hormonal (pill, patch, ' +
      'injection, implant): synthetic oestrogen/progesterone prevents ovulation, alters ' +
      'cervical mucus, thins endometrium. IUDs: copper (toxic to sperm) or hormonal. ' +
      'Emergency contraception: high-dose progesterone delays ovulation. Sexually transmitted ' +
      'infections (STIs): bacterial (chlamydia, gonorrhoea — antibiotic-treatable), viral ' +
      '(HIV, herpes, HPV — manageable, not curable). Condoms provide the only STI protection ' +
      'among contraceptives. Infertility: defined as failure to conceive after 12 months of ' +
      'unprotected intercourse. Causes: low sperm count, blocked Fallopian tubes, ovulatory ' +
      'dysfunction, endometriosis. IVF (in-vitro fertilisation): eggs harvested after ' +
      'hormonal stimulation, fertilised in lab, embryo implanted.',
    targetedMisconceptions: [],
    source: REPHEALTH_SRC,
  },
  {
    conceptId: REPHEALTH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "the contraceptive pill prevents pregnancy by preventing fertilisation." ' +
      'The pill\'s primary mechanism is PREVENTING OVULATION (no egg = no fertilisation). ' +
      'It also thickens cervical mucus (reducing sperm penetration) and thins the endometrium ' +
      '(reducing implantation probability). In practice, when taken perfectly, it is >99% ' +
      'effective — primarily through ovulation suppression. Second: "emergency contraception ' +
      '(morning-after pill) is an abortifacient." Plan B\'s primary mechanism is delaying ' +
      'or inhibiting ovulation — preventing fertilisation. It does not terminate an established ' +
      'pregnancy. If ovulation has already occurred, its effectiveness drops dramatically, ' +
      'not because it terminates a pregnancy but because it missed its prevention window.',
    targetedMisconceptions: [`${REPHEALTH}:M1`],
    source: REPHEALTH_SRC,
  },
]
const REPHEALTH_PROBES: SeedProbe[] = [
  {
    conceptId: REPHEALTH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which contraceptive method provides the only reliable protection against sexually transmitted infections?',
    choices: [
      { text: 'Condoms (barrier method) — they physically prevent transmission of pathogens during sexual contact', isCorrect: true },
      { text: 'The combined oral contraceptive pill — its hormonal effects also create a hostile environment for pathogens', isCorrect: false, misconceptionId: `${REPHEALTH}:M2` },
      { text: 'An intrauterine device (IUD) — it prevents fertilisation and creates an environment that kills pathogens', isCorrect: false },
      { text: 'Hormonal implants — they alter the hormonal environment to reduce susceptibility to STIs', isCorrect: false },
    ],
    correctValue: 'Condoms — the only contraceptive that also prevents STI transmission',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${REPHEALTH}:M2`],
    source: REPHEALTH_SRC,
  },
  {
    conceptId: REPHEALTH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the primary mechanism by which the combined oral contraceptive pill prevents pregnancy?',
    choices: [
      { text: 'It suppresses ovulation — preventing the release of an egg, so fertilisation cannot occur', isCorrect: true },
      { text: 'It prevents implantation — the fertilised egg cannot embed in the thickened endometrium', isCorrect: false, misconceptionId: `${REPHEALTH}:M1` },
    ],
    correctValue: 'It suppresses ovulation — no egg released, so no fertilisation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REPHEALTH}:M1`],
    source: REPHEALTH_SRC,
  },
]

// ─── bio.evo.modern-synthesis-speciation ─────────────────────────────────────
const MODSYN = 'bio.evo.modern-synthesis-speciation'
const MODSYN_SRC = 'docs/biology/kg/graph.json — bio.evo.modern-synthesis-speciation'
const MODSYN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MODSYN, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The Modern Evolutionary Synthesis (1930s-1940s) unified Darwin\'s natural selection ' +
      'with Mendelian genetics and population genetics — resolving what appeared to be ' +
      'contradictory frameworks. Evolution = change in allele frequencies over time, driven ' +
      'by natural selection, genetic drift, mutation, and gene flow. Speciation: the ' +
      'formation of new species — defined as groups that cannot interbreed to produce ' +
      'fertile offspring (biological species concept). Mechanisms: Allopatric speciation ' +
      '(geographic isolation): populations separated by a physical barrier (mountain, sea) ' +
      'accumulate different mutations and adaptations until they are reproductively isolated ' +
      'even if the barrier is removed. Sympatric speciation (same area): reproductive ' +
      'isolation without geographic barrier — polyploidy in plants (immediate speciation, ' +
      'genome doubling prevents breeding with parent species), assortative mating, or niche ' +
      'specialisation. Isolating mechanisms (prevent gene flow): pre-zygotic (different ' +
      'mating seasons, behavioural differences, mechanical incompatibility) and post-zygotic ' +
      '(hybrid inviability, hybrid sterility — mule).',
    targetedMisconceptions: [],
    source: MODSYN_SRC,
  },
  {
    conceptId: MODSYN, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "evolution always takes millions of years." Rates vary dramatically. ' +
      'Bacterial antibiotic resistance evolves in days to weeks. Peppered moth colour ' +
      'ratio shifted in decades. HIV evolves drug resistance in months. Rapid evolution ' +
      'occurs when selection pressure is strong and generation time is short. Geological ' +
      'timescales are needed for major morphological changes and speciation in long-lived ' +
      'organisms. Second: "a species is permanently fixed once defined." Species concepts ' +
      'are human frameworks applied to biological reality, which is continuous. Hybrid zones, ' +
      'ring species (herring gulls), and populations at different stages of speciation all ' +
      'challenge tidy species boundaries. The biological species concept doesn\'t apply to ' +
      'asexual organisms (bacteria) at all.',
    targetedMisconceptions: [`${MODSYN}:M1`],
    source: MODSYN_SRC,
  },
]
const MODSYN_PROBES: SeedProbe[] = [
  {
    conceptId: MODSYN, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two populations of the same species are separated by a mountain range for thousands of generations. When the mountain erodes, they cannot interbreed. What type of speciation has occurred?',
    choices: [
      { text: 'Allopatric speciation — geographic isolation led to accumulation of different mutations until reproductive isolation was established', isCorrect: true },
      { text: 'Sympatric speciation — the populations diverged in the same habitat without any geographic barrier', isCorrect: false, misconceptionId: `${MODSYN}:M2` },
      { text: 'Polyploidy — the most common form of speciation in multicellular animals', isCorrect: false },
      { text: 'Convergent evolution — the two populations evolved similar reproductive barriers independently', isCorrect: false },
    ],
    correctValue: 'Allopatric speciation — geographic isolation → reproductive isolation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MODSYN}:M2`],
    source: MODSYN_SRC,
  },
  {
    conceptId: MODSYN, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says "evolution always takes millions of years." Give a counter-example that disproves this.',
    choices: [
      { text: 'Bacterial antibiotic resistance evolves in days to weeks — demonstrating that evolution can occur rapidly under strong selection pressure', isCorrect: true },
      { text: 'The student is correct — observable evolution within a human lifetime has never been documented', isCorrect: false, misconceptionId: `${MODSYN}:M1` },
    ],
    correctValue: 'Antibiotic resistance in bacteria — evolution in days; rate depends on selection strength and generation time',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MODSYN}:M1`],
    source: MODSYN_SRC,
  },
]

// ─── bio.evo.human-evolution ──────────────────────────────────────────────────
const HUMEVO = 'bio.evo.human-evolution'
const HUMEVO_SRC = 'docs/biology/kg/graph.json — bio.evo.human-evolution'
const HUMEVO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HUMEVO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Humans evolved from a common ancestor shared with other great apes — not from modern ' +
      'chimpanzees. The human-chimpanzee last common ancestor lived ~6-7 million years ago. ' +
      'Key hominin evolution milestones: Bipedalism evolved first (~4 mya — Australopithecus ' +
      'afarensis; "Lucy") — freeing hands for tool use. Large brain expansion ~2 mya with ' +
      'Homo habilis (first stone tools). Homo erectus (~1.9 mya): first hominin to leave ' +
      'Africa, controlled fire. Homo sapiens emerged ~300,000 years ago in Africa; modern ' +
      'behaviour (symbolic art, complex tools) ~100,000-70,000 years ago. The "Out of Africa" ' +
      'model (supported by genetic and fossil evidence): anatomically modern humans migrated ' +
      'from Africa ~60,000-70,000 years ago, interbred with Neanderthals (2-4% of non-African ' +
      'human genome is Neanderthal) and Denisovans. Evidence: comparative anatomy, ' +
      'biogeography, molecular phylogenetics (mitochondrial DNA, Y chromosome), fossil record.',
    targetedMisconceptions: [],
    source: HUMEVO_SRC,
  },
  {
    conceptId: HUMEVO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Humans evolved from chimpanzees." This is the single most persistent misconception ' +
      'in human evolution. Humans and chimpanzees share a common ancestor that no longer ' +
      'exists. The lineages diverged ~6-7 million years ago; both have been evolving ' +
      'independently since. Modern chimpanzees are as evolved as modern humans — just ' +
      'in different directions. Second: "evolution is a ladder of progress, with humans ' +
      'at the top." Evolution has no directionality — it does not build toward a goal ' +
      'or endpoint. No species is "more evolved" than another in any absolute sense; ' +
      'all living species have been equally evolving since the origin of life. Humans are ' +
      'not the endpoint of evolution but one branch among millions.',
    targetedMisconceptions: [`${HUMEVO}:M1`],
    source: HUMEVO_SRC,
  },
]
const HUMEVO_PROBES: SeedProbe[] = [
  {
    conceptId: HUMEVO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which morphological feature evolved earliest in the human lineage, predating large brain expansion?',
    choices: [
      { text: 'Bipedalism — walking upright evolved ~4 mya, millions of years before the significant brain size increase', isCorrect: true },
      { text: 'Large brain — brain expansion was the first adaptation, enabling tool use which then freed the hands', isCorrect: false, misconceptionId: `${HUMEVO}:M2` },
      { text: 'Tool use — making tools was the selective pressure that drove all other human evolutionary changes', isCorrect: false },
      { text: 'Language — communication evolved first, enabling social learning that drove subsequent adaptations', isCorrect: false },
    ],
    correctValue: 'Bipedalism (~4 mya) — predates the major brain expansion by ~2 million years',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HUMEVO}:M2`],
    source: HUMEVO_SRC,
  },
  {
    conceptId: HUMEVO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Did humans evolve FROM chimpanzees?',
    choices: [
      { text: 'No — humans and chimpanzees share a common ancestor that no longer exists; both lineages have evolved independently for ~6-7 million years', isCorrect: true },
      { text: 'Yes — early Homo sapiens diverged directly from a chimpanzee-like ancestor; chimpanzees today are slightly different descendants', isCorrect: false, misconceptionId: `${HUMEVO}:M1` },
    ],
    correctValue: 'No — shared ancestor, not direct descent; both have evolved independently since divergence',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${HUMEVO}:M1`],
    source: HUMEVO_SRC,
  },
]

// ─── bio.gen.genetic-engineering ──────────────────────────────────────────────
const GENENG = 'bio.gen.genetic-engineering'
const GENENG_SRC = 'docs/biology/kg/graph.json — bio.gen.genetic-engineering'
const GENENG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GENENG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Genetic engineering is the deliberate modification of an organism\'s DNA to alter ' +
      'its characteristics. Core tools: Restriction enzymes: bacterial enzymes that cut DNA ' +
      'at specific palindromic sequences, producing sticky ends (staggered cuts) or blunt ends. ' +
      'DNA ligase: seals nicks in the sugar-phosphate backbone — joins restriction-cut fragments. ' +
      'Vectors: carriers for inserting foreign DNA into host cells. Plasmids (circular bacterial ' +
      'DNA) are the most common; others include bacteriophages and viral vectors. Recombinant ' +
      'DNA process: (1) cut gene of interest and vector with the same restriction enzyme → ' +
      'complementary sticky ends; (2) mix and ligate; (3) transform into host cells; (4) ' +
      'select for successful uptake (antibiotic resistance marker or blue-white screening). ' +
      'PCR (polymerase chain reaction): amplifies tiny amounts of DNA exponentially using ' +
      'thermostable Taq polymerase, primers, and thermal cycling. Applications: insulin ' +
      'production (E. coli expressing human insulin gene), GM crops, gene therapy, forensics.',
    targetedMisconceptions: [],
    source: GENENG_SRC,
  },
  {
    conceptId: GENENG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Confusion: "GM crops are the same as mutagenesis breeding." Traditional mutagenesis ' +
      '(radiation, chemicals) creates random mutations throughout the genome — many more ' +
      'off-target changes than genetic engineering, which inserts a specific, characterised ' +
      'gene. Paradoxically, mutagenic varieties face fewer regulatory hurdles than GM crops ' +
      'in many countries. Second: "genetic engineering creates genes from scratch." In most ' +
      'cases, genetic engineering MOVES an existing gene from one organism into another — ' +
      'the gene already existed and its protein product is already known and characterised. ' +
      'Human insulin produced by E. coli is identical to human insulin because the same ' +
      'gene (obtained by reverse-transcribing insulin mRNA to cDNA) was inserted.',
    targetedMisconceptions: [`${GENENG}:M1`],
    source: GENENG_SRC,
  },
]
const GENENG_PROBES: SeedProbe[] = [
  {
    conceptId: GENENG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why do restriction enzymes that produce "sticky ends" make recombinant DNA construction easier?',
    choices: [
      { text: 'Sticky ends are short single-stranded overhangs that base-pair with complementary ends on other fragments, increasing ligation efficiency', isCorrect: true },
      { text: 'Sticky ends are coated with adhesive proteins that physically attach the insert to the vector', isCorrect: false, misconceptionId: `${GENENG}:M2` },
      { text: 'Sticky ends denature easily, allowing the insert and vector to unfold and rejoin in any orientation', isCorrect: false },
      { text: 'Sticky ends contain recognition sequences for DNA ligase, making ligation more specific', isCorrect: false },
    ],
    correctValue: 'Sticky ends are complementary single-stranded overhangs that base-pair and facilitate ligation',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GENENG}:M2`],
    source: GENENG_SRC,
  },
  {
    conceptId: GENENG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'When E. coli is engineered to produce human insulin, does the resulting insulin differ from human insulin?',
    choices: [
      { text: 'No — the same human insulin gene (cDNA from mRNA) is inserted, producing the identical protein sequence', isCorrect: true },
      { text: 'Yes — E. coli uses a slightly different codon usage, producing a protein with some amino acid substitutions', isCorrect: false, misconceptionId: `${GENENG}:M3` },
    ],
    correctValue: 'No — the human insulin gene is inserted; E. coli produces the identical protein',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GENENG}:M3`],
    source: GENENG_SRC,
  },
]

// ─── bio.dev.gametogenesis-fertilisation-dev ──────────────────────────────────
const GAMEDEVO = 'bio.dev.gametogenesis-fertilisation-dev'
const GAMEDEVO_SRC = 'docs/biology/kg/graph.json — bio.dev.gametogenesis-fertilisation-dev'
const GAMEDEVO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GAMEDEVO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Gametogenesis is the production of gametes (sperm and eggs) via meiosis. ' +
      'Spermatogenesis: continual throughout male adult life; primary spermatocytes ' +
      '(2n) → meiosis I → secondary spermatocytes (n) → meiosis II → spermatids → ' +
      'spermatozoa (after differentiation). Produces 4 functional sperm per primary ' +
      'spermatocyte. Oogenesis: begins in the foetus; primary oocytes (2n) arrested ' +
      'in prophase I until puberty. Monthly, one oocyte completes meiosis I → ' +
      'secondary oocyte + first polar body; meiosis II is arrested at metaphase II ' +
      'and only completed upon fertilisation → egg + second polar body. Produces 1 ' +
      'egg and 2-3 polar bodies per primary oocyte (maximises cytoplasm in the ' +
      'egg). Key distinction: meiosis is not cleavage — gametogenesis produces haploid ' +
      'cells by two division rounds with one round of DNA replication; cleavage ' +
      'after fertilisation is mitotic division of the diploid zygote without growth.',
    targetedMisconceptions: [],
    source: GAMEDEVO_SRC,
  },
  {
    conceptId: GAMEDEVO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "meiosis produces 4 eggs from each primary oocyte." Meiosis in ' +
      'oogenesis produces only 1 egg — the unequal cytokinesis that produces polar ' +
      'bodies concentrates cytoplasm and organelles into one cell, which becomes ' +
      'the egg. The polar bodies (which receive minimal cytoplasm) usually degenerate. ' +
      'This contrasts with spermatogenesis, which produces 4 equal sperm per primary ' +
      'spermatocyte. Second: "eggs complete meiosis before fertilisation." The egg is ' +
      'arrested at metaphase II; fertilisation triggers completion of meiosis II. ' +
      'An "unfertilised egg" is technically a secondary oocyte still in meiotic arrest.',
    targetedMisconceptions: [`${GAMEDEVO}:M1`],
    source: GAMEDEVO_SRC,
  },
]
const GAMEDEVO_PROBES: SeedProbe[] = [
  {
    conceptId: GAMEDEVO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does oogenesis produce only 1 functional egg from each primary oocyte, while spermatogenesis produces 4 sperm?',
    choices: [
      { text: 'Unequal cytokinesis in oogenesis produces polar bodies that receive minimal cytoplasm, concentrating organelles and nutrients into one large egg', isCorrect: true },
      { text: 'Oogenesis only goes through one meiotic division, while spermatogenesis completes two divisions', isCorrect: false, misconceptionId: `${GAMEDEVO}:M2` },
      { text: 'Three of the four cells produced by meiosis in oogenesis are destroyed by apoptosis', isCorrect: false },
      { text: 'Female meiosis is less efficient than male meiosis and produces more non-viable cells', isCorrect: false },
    ],
    correctValue: 'Unequal cytokinesis → polar bodies with minimal cytoplasm; one large egg cell',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GAMEDEVO}:M2`],
    source: GAMEDEVO_SRC,
  },
  {
    conceptId: GAMEDEVO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Has meiosis been completed in an unfertilised human egg (secondary oocyte)?',
    choices: [
      { text: 'No — the secondary oocyte is arrested at metaphase II; fertilisation triggers completion of meiosis II', isCorrect: true },
      { text: 'Yes — meiosis is completed during oogenesis; the egg is a fully haploid cell ready for fertilisation', isCorrect: false, misconceptionId: `${GAMEDEVO}:M1` },
    ],
    correctValue: 'No — arrested at metaphase II; fertilisation triggers meiosis II completion',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GAMEDEVO}:M1`],
    source: GAMEDEVO_SRC,
  },
]

// ─── bio.plant.plant-respiration ──────────────────────────────────────────────
const PLRESP = 'bio.plant.plant-respiration'
const PLRESP_SRC = 'docs/biology/kg/graph.json — bio.plant.plant-respiration'
const PLRESP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PLRESP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Plants, like all living organisms, perform cellular respiration to release energy ' +
      'from organic molecules (mainly glucose) as ATP. The same three stages as in animals: ' +
      'Glycolysis (cytoplasm) → Krebs cycle (mitochondrial matrix) → oxidative phosphorylation ' +
      '(inner mitochondrial membrane). Aerobic respiration: C6H12O6 + 6O2 → 6CO2 + 6H2O + ' +
      '~36-38 ATP. Anaerobic respiration (in waterlogged roots where O2 is unavailable): ' +
      'pyruvate → ethanol + CO2 (in plants, unlike animals that produce lactic acid). ' +
      'Gas exchange in plants: stomata and lenticels allow gas movement. During the day at ' +
      'high light: rate of photosynthesis > rate of respiration → net CO2 uptake and O2 ' +
      'release. At night: only respiration → net CO2 release. At the compensation point ' +
      '(specific light intensity): photosynthesis rate = respiration rate → no net gas ' +
      'exchange. Plants in dim light may CO2-starve if respiration exceeds photosynthesis.',
    targetedMisconceptions: [],
    source: PLRESP_SRC,
  },
  {
    conceptId: PLRESP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      '"Plants only photosynthesise — they don\'t respire." Plants respire continuously, ' +
      '24 hours a day, to power all metabolic processes. During the day, photosynthesis ' +
      'masks respiration because it produces far more O2 than respiration consumes, and ' +
      'takes in far more CO2 than respiration produces. But the respiration is still ' +
      'occurring under the photosynthesis. At night, only respiration operates — plants ' +
      'release CO2 and consume O2 in the dark. This is why covering plants completely ' +
      'in a sealed container at night would eventually deplete O2. Second: "anaerobic ' +
      'respiration produces the same products in plants as in animals." Animals produce ' +
      'lactic acid under anaerobic conditions; plants (and yeast) produce ethanol + CO2. ' +
      'This is exploited in brewing and bread-making.',
    targetedMisconceptions: [`${PLRESP}:M1`],
    source: PLRESP_SRC,
  },
]
const PLRESP_PROBES: SeedProbe[] = [
  {
    conceptId: PLRESP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'At what condition will a plant show NO net gas exchange (neither net CO2 uptake nor net CO2 release)?',
    choices: [
      { text: 'At the compensation point — where the rate of photosynthesis exactly equals the rate of respiration', isCorrect: true },
      { text: 'At night — because plants stop all metabolic activity in darkness', isCorrect: false, misconceptionId: `${PLRESP}:M2` },
      { text: 'At maximum light intensity — photosynthesis uses all available CO2, leaving none to be released', isCorrect: false },
      { text: 'During drought — when stomata close, no gas exchange occurs', isCorrect: false },
    ],
    correctValue: 'At the compensation point — photosynthesis rate = respiration rate',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PLRESP}:M2`],
    source: PLRESP_SRC,
  },
  {
    conceptId: PLRESP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do plants respire at night?',
    choices: [
      { text: 'Yes — plants respire continuously day and night; in the dark, only respiration operates so they release CO2 and consume O2', isCorrect: true },
      { text: 'No — plants use the energy stored in glucose during the day; at night they are metabolically dormant', isCorrect: false, misconceptionId: `${PLRESP}:M1` },
    ],
    correctValue: 'Yes — plants respire 24/7; at night respiration dominates and CO2 is released',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PLRESP}:M1`],
    source: PLRESP_SRC,
  },
]

// ─── bio.biotech.biotech-principles ───────────────────────────────────────────
const BIOTECH = 'bio.biotech.biotech-principles'
const BIOTECH_SRC = 'docs/biology/kg/graph.json — bio.biotech.biotech-principles'
const BIOTECH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIOTECH, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Biotechnology uses biological systems, organisms, or derivatives to develop products ' +
      'and technologies for human benefit. Traditional biotechnology (thousands of years old): ' +
      'using microorganisms for fermentation — bread, cheese, beer, wine, yoghurt. Modern ' +
      'biotechnology applies molecular biology tools to engineer organisms at the genetic level. ' +
      'Three foundational principles: (1) All cells contain the same genetic code — any cell ' +
      'can in principle express any gene if given the right regulatory signals. (2) The genetic ' +
      'code is universal — a human gene placed in a bacterium will be correctly translated ' +
      'because the same codons specify the same amino acids. (3) Microorganisms can be used ' +
      'as "living factories" — bacteria and yeast grow quickly, are cheap to culture, and can ' +
      'be engineered to produce large quantities of desired proteins. Applications span: ' +
      'medicine (insulin, vaccines, monoclonal antibodies), agriculture (pest-resistant crops, ' +
      'nitrogen-fixing plants), environment (bioremediation, biofuels), and diagnostics.',
    targetedMisconceptions: [],
    source: BIOTECH_SRC,
  },
  {
    conceptId: BIOTECH, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Confusion: "biotechnology is entirely modern." Humans have used biotechnology since ' +
      'the Neolithic revolution (~10,000 BCE) — selective breeding of crops and animals, ' +
      'and fermentation processes. What changed in the 1970s was the ability to manipulate ' +
      'DNA directly (recombinant DNA technology). Second: "GM organisms inevitably spread ' +
      'uncontrollably and harm ecosystems." This is a risk that exists on a spectrum and is ' +
      'managed by containment and terminator technologies. The regulatory and ecological ' +
      'impact of any GM organism requires case-by-case evaluation; blanket assertions that ' +
      '"all GMOs are safe" or "all GMOs are dangerous" both fail to reflect the science. ' +
      'The key principle is that the trait introduced, its expression, and its ecological ' +
      'context all matter.',
    targetedMisconceptions: [`${BIOTECH}:M1`],
    source: BIOTECH_SRC,
  },
]
const BIOTECH_PROBES: SeedProbe[] = [
  {
    conceptId: BIOTECH, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why can a human insulin gene inserted into E. coli produce functional human insulin?',
    choices: [
      { text: 'The genetic code is universal — the same codons specify the same amino acids in both human and bacterial cells', isCorrect: true },
      { text: 'E. coli contains human-like ribosomes that can translate human gene sequences more accurately', isCorrect: false, misconceptionId: `${BIOTECH}:M2` },
      { text: 'The gene is modified to match E. coli\'s genetic code before insertion', isCorrect: false },
      { text: 'Human proteins and bacterial proteins are chemically identical so cross-expression is straightforward', isCorrect: false },
    ],
    correctValue: 'Universal genetic code — same codons, same amino acids in bacteria and humans',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BIOTECH}:M2`],
    source: BIOTECH_SRC,
  },
  {
    conceptId: BIOTECH, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is biotechnology a purely modern development from the 20th century?',
    choices: [
      { text: 'No — humans have used fermentation (bread, cheese, alcohol) for thousands of years; modern biotechnology adds DNA manipulation to an ancient practice', isCorrect: true },
      { text: 'Yes — biotechnology requires understanding DNA and genes, which was impossible before the discovery of the double helix in 1953', isCorrect: false, misconceptionId: `${BIOTECH}:M1` },
    ],
    correctValue: 'No — traditional biotechnology (fermentation, selective breeding) is thousands of years old',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIOTECH}:M1`],
    source: BIOTECH_SRC,
  },
]

// ─── bio.dev.morphogenesis-differentiation ───────────────────────────────────
const MORPHO = 'bio.dev.morphogenesis-differentiation'
const MORPHO_SRC = 'docs/biology/kg/graph.json — bio.dev.morphogenesis-differentiation'
const MORPHO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MORPHO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Morphogenesis is how a featureless ball of identical cells sculpts itself into a body with distinct tissues, organs, and axes. ' +
      'It is driven by two interlocked processes: differentiation — cells reading out different subsets of their shared genome to become liver, neuron, or muscle — ' +
      'and positional signals that tell each cell WHERE it sits. ' +
      'Morphogen gradients (like Bicoid or Sonic Hedgehog) diffuse from a source cell; cells close to the source see high concentration and activate one gene program, ' +
      'distant cells see low and activate another. ' +
      'Transcription factors lock in each cell\'s identity by closing off alternative gene programs — a commitment called determination. ' +
      'Cell shape changes, differential adhesion, and programmed death (apoptosis) then physically sculpt the tissue: the spaces between fingers form because those cells die on cue. ' +
      'The developmental toolkit is ancient; Hox genes governing body-axis identity are nearly identical from flies to humans.',
    targetedMisconceptions: [],
    source: MORPHO_SRC,
  },
  {
    conceptId: MORPHO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A common misconception: differentiation means some cells lose DNA that other cells keep. ' +
      'All somatic cells in your body carry identical genomes — cloning experiments proved this when nuclei from differentiated cells produced complete organisms. ' +
      'Differentiation is a matter of gene EXPRESSION, not gene PRESENCE: transcription factors and chromatin remodelling silence entire chromosomal regions so certain genes become physically inaccessible. ' +
      'A liver cell "ignores" the neuron program not because it lacks it, but because histones are tightly wound over it and it cannot be read. ' +
      'Reprogramming (iPS cells) reverses this by re-opening silenced regions — proving the DNA was always there.',
    targetedMisconceptions: [`${MORPHO}:M1`],
    source: MORPHO_SRC,
  },
]
const MORPHO_PROBES: SeedProbe[] = [
  {
    conceptId: MORPHO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Sonic Hedgehog (Shh) protein is produced by cells at the posterior margin of the developing limb bud and forms a concentration gradient. What role does this gradient play?',
    choices: [
      { text: 'It provides positional information, instructing cells to adopt anterior or posterior digit identities depending on Shh concentration', isCorrect: true },
      { text: 'It stimulates cell division equally throughout the limb bud, increasing limb size', isCorrect: false, misconceptionId: `${MORPHO}:M2` },
      { text: 'It triggers apoptosis in all cells that receive the signal, carving the digit spaces', isCorrect: false },
    ],
    correctValue: 'Positional information — different Shh concentrations specify different digit identities',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MORPHO}:M2`],
    source: MORPHO_SRC,
  },
  {
    conceptId: MORPHO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A liver cell and a neuron in the same person contain different DNA — each cell type only retains the genes it needs. True or false, and why?',
    choices: [
      { text: 'False — all somatic cells contain the same complete genome; differences arise from differential gene expression, not gene loss', isCorrect: true },
      { text: 'True — early in development, unnecessary gene sequences are excised, so specialised cells carry smaller genomes', isCorrect: false, misconceptionId: `${MORPHO}:M1` },
    ],
    correctValue: 'False — same DNA, different expression',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MORPHO}:M1`],
    source: MORPHO_SRC,
  },
]

// ─── bio.dev.stem-cells-regeneration ─────────────────────────────────────────
const STEMCELLS = 'bio.dev.stem-cells-regeneration'
const STEMCELLS_SRC = 'docs/biology/kg/graph.json — bio.dev.stem-cells-regeneration'
const STEMCELLS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STEMCELLS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Stem cells are undifferentiated cells that can both self-renew (divide to produce more stem cells) and differentiate into specialised cell types. ' +
      'Potency describes the breadth of differentiation possible: totipotent cells (the early zygote) can form any tissue including placenta; ' +
      'pluripotent cells (embryonic stem cells, ES cells) can form all three germ layers but not extra-embryonic tissue; ' +
      'multipotent adult stem cells (haematopoietic stem cells, intestinal crypts) generate a defined subset of related types. ' +
      'The niche — a specialised microenvironment of signalling molecules, adjacent cells, and extracellular matrix — maintains the stem cell state; ' +
      'removing a stem cell from its niche often triggers differentiation. ' +
      'Induced pluripotent stem cells (iPSCs) are adult somatic cells reprogrammed to pluripotency by introducing four transcription factors (Yamanaka factors: Oct4, Sox2, Klf4, c-Myc), ' +
      'bypassing the ethical constraints of embryonic cells and enabling patient-specific disease modelling and, eventually, therapy.',
    targetedMisconceptions: [],
    source: STEMCELLS_SRC,
  },
  {
    conceptId: STEMCELLS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Stem cells are often portrayed as universal repair cells that can be injected anywhere to fix any tissue. ' +
      'The reality is more constrained. Adult stem cells are multipotent, not pluripotent: a haematopoietic stem cell reliably replenishes blood cells but will not spontaneously regenerate a neuron. ' +
      'Plasticity claims from early 2000s studies (bone marrow cells becoming liver, neurons becoming muscle) largely failed reproducibility; ' +
      'the apparent transdifferentiation was mostly cell fusion artefact. ' +
      'Therapeutic success requires the right stem cell type, a permissive engraftment niche, immune compatibility, and evidence of FUNCTIONAL integration — ' +
      'not just cell survival. The majority of currently marketed "stem cell therapies" in clinics lack this evidence.',
    targetedMisconceptions: [`${STEMCELLS}:M1`],
    source: STEMCELLS_SRC,
  },
]
const STEMCELLS_PROBES: SeedProbe[] = [
  {
    conceptId: STEMCELLS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Haematopoietic stem cells (HSCs) transplanted into an irradiated mouse successfully repopulate the blood. Which statement best characterises their potency?',
    choices: [
      { text: 'Multipotent — they can generate all blood cell lineages (red cells, platelets, lymphocytes, myeloid cells) but not non-haematopoietic tissues', isCorrect: true },
      { text: 'Pluripotent — they can generate any tissue if placed in the right environment', isCorrect: false, misconceptionId: `${STEMCELLS}:M1` },
      { text: 'Totipotent — they can form both somatic and extra-embryonic tissues', isCorrect: false },
    ],
    correctValue: 'Multipotent — all blood lineages only',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${STEMCELLS}:M1`],
    source: STEMCELLS_SRC,
  },
  {
    conceptId: STEMCELLS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A clinic advertises that injecting their adult stem cell product into a damaged knee will regenerate cartilage, bone, AND nerves simultaneously. What is the key biological problem with this claim?',
    choices: [
      { text: 'Adult stem cells are multipotent, not pluripotent — a single adult stem cell type cannot reliably differentiate into all three very different tissue types', isCorrect: true },
      { text: 'Nothing — adult stem cells are pluripotent and can produce any tissue if given the correct growth factors', isCorrect: false, misconceptionId: `${STEMCELLS}:M1` },
    ],
    correctValue: 'Adult stem cells are multipotent, not pluripotent',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STEMCELLS}:M1`],
    source: STEMCELLS_SRC,
  },
]

// ─── bio.biotech.biotech-process-applications ─────────────────────────────────
const BIOTECHAPP = 'bio.biotech.biotech-process-applications'
const BIOTECHAPP_SRC = 'docs/biology/kg/graph.json — bio.biotech.biotech-process-applications'
const BIOTECHAPP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIOTECHAPP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Modern biotechnology applies molecular biology tools to produce useful products and solve practical problems across medicine, agriculture, and industry. ' +
      'The recombinant DNA toolkit — restriction enzymes, ligases, vectors, and host organisms — allows any gene to be cloned, expressed, and scaled up. ' +
      'Fermentation uses microorganisms (bacteria, yeast, mammalian cell lines) as living factories: recombinant insulin was the first product (1982), now joined by erythropoietin, monoclonal antibodies, and vaccines. ' +
      'Transgenic crops express bacterial Bt toxin for pest resistance or tolerate herbicides via modified target enzymes. ' +
      'PCR amplifies vanishingly small DNA samples for diagnostics, forensics, and pathogen detection. ' +
      'Gene therapy delivers corrective DNA to somatic cells via viral vectors or lipid nanoparticles — the mRNA COVID vaccines are a variant of this platform. ' +
      'Bioprocessing scale-up adds further engineering: bioreactor design, aseptic technique, downstream purification, and quality assurance determine whether a laboratory success becomes a manufacturable product.',
    targetedMisconceptions: [],
    source: BIOTECHAPP_SRC,
  },
  {
    conceptId: BIOTECHAPP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A persistent misconception: mRNA vaccines alter the recipient\'s DNA. ' +
      'mRNA is translated in the cytoplasm; it never enters the nucleus. ' +
      'Reverse transcription (RNA → DNA) requires a reverse transcriptase enzyme — human cells do not express one in significant amounts, and the lipid nanoparticles carry no such enzyme. ' +
      'The mRNA degrades within days by normal cellular RNase activity. ' +
      'Integration into the genome is a biological claim that requires both nuclear entry AND reverse transcription AND integration machinery — none of which are provided by the vaccine platform. ' +
      'This misconception conflates retroviral biology (which does all three) with mRNA technology (which does none of them).',
    targetedMisconceptions: [`${BIOTECHAPP}:M1`],
    source: BIOTECHAPP_SRC,
  },
]
const BIOTECHAPP_PROBES: SeedProbe[] = [
  {
    conceptId: BIOTECHAPP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Recombinant human insulin is produced by inserting the human insulin gene into E. coli. Which tool is essential for cutting both the human DNA and the bacterial plasmid at compatible sites?',
    choices: [
      { text: 'Restriction endonucleases — they cut at specific palindromic sequences, producing compatible sticky ends on both fragments', isCorrect: true },
      { text: 'DNA ligase — it cuts double-stranded DNA at any location specified by the researcher', isCorrect: false, misconceptionId: `${BIOTECHAPP}:M2` },
      { text: 'RNA polymerase — it synthesises a complementary copy of the gene for insertion', isCorrect: false },
    ],
    correctValue: 'Restriction endonucleases',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BIOTECHAPP}:M2`],
    source: BIOTECHAPP_SRC,
  },
  {
    conceptId: BIOTECHAPP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Someone claims that receiving an mRNA vaccine integrates new genetic instructions permanently into their chromosomes. What is the primary biological reason this cannot happen?',
    choices: [
      { text: 'mRNA remains in the cytoplasm, lacks reverse transcriptase, and is degraded within days — it cannot enter the nucleus or be incorporated into chromosomal DNA', isCorrect: true },
      { text: 'It can happen but only affects somatic cells, not germ cells, so it cannot be inherited', isCorrect: false, misconceptionId: `${BIOTECHAPP}:M1` },
    ],
    correctValue: 'mRNA is cytoplasmic and lacks the machinery for chromosomal integration',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIOTECHAPP}:M1`],
    source: BIOTECHAPP_SRC,
  },
]

// ─── bio.biotech.genomics-proteomics ──────────────────────────────────────────
const GENOMICS = 'bio.biotech.genomics-proteomics'
const GENOMICS_SRC = 'docs/biology/kg/graph.json — bio.biotech.genomics-proteomics'
const GENOMICS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GENOMICS, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Genomics is the large-scale study of entire genomes — their sequence, structure, and function. ' +
      'Next-generation sequencing (NGS) parallelises millions of sequencing reactions simultaneously, reducing the cost of a human genome from billions of dollars (Human Genome Project, 2003) to under a thousand. ' +
      'Comparative genomics identifies conserved regions under selection; functional genomics uses RNA-seq to measure which genes are expressed at what level in which cells under which conditions. ' +
      'Proteomics extends this to the protein level: mass spectrometry fragments proteins into peptides, measures mass-to-charge ratios, and database searches identify the protein and its post-translational modifications. ' +
      'Because one gene can produce multiple spliced mRNAs and a protein can be phosphorylated, glycosylated, or cleaved dozens of ways, the proteome is far larger and more dynamic than the genome. ' +
      'Systems biology integrates genomic, transcriptomic, proteomic, and metabolomic datasets to model how molecular interactions produce cell-level behaviour.',
    targetedMisconceptions: [],
    source: GENOMICS_SRC,
  },
  {
    conceptId: GENOMICS, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Sequencing the genome does not tell us what every gene does — the common conflation of "we have the genome" with "we understand the organism." ' +
      'The human genome contains ~20,000 protein-coding genes but ~98% of the sequence is non-coding. ' +
      'Much of this is regulatory (promoters, enhancers, insulators), some is transposable-element remnants, and some function is still unknown. ' +
      'Knowing the sequence of a disease-associated gene variant does not automatically explain the molecular mechanism, tell us which cell type it acts in, or indicate a therapeutic target — ' +
      'it is the starting point of investigation, not the endpoint.',
    targetedMisconceptions: [`${GENOMICS}:M1`],
    source: GENOMICS_SRC,
  },
]
const GENOMICS_PROBES: SeedProbe[] = [
  {
    conceptId: GENOMICS, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'RNA-seq measures which molecules in a cell sample and produces what data output?',
    choices: [
      { text: 'mRNA transcripts — it produces quantitative expression levels for each gene in the sample under the given conditions', isCorrect: true },
      { text: 'DNA sequences — it identifies mutations by comparing chromosomal DNA to a reference genome', isCorrect: false, misconceptionId: `${GENOMICS}:M2` },
      { text: 'Protein abundances — it measures translation rates by capturing nascent polypeptides', isCorrect: false },
    ],
    correctValue: 'mRNA — gene expression levels',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GENOMICS}:M2`],
    source: GENOMICS_SRC,
  },
  {
    conceptId: GENOMICS, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A researcher announces they have sequenced the complete genome of a newly discovered bacterium. Does this mean they now fully understand how the organism works?',
    choices: [
      { text: 'No — the sequence identifies gene candidates but does not reveal their functions, regulation, or interactions; experimental and computational work is still required', isCorrect: true },
      { text: 'Yes — the genome encodes all biological information, so the complete sequence provides a full functional blueprint', isCorrect: false, misconceptionId: `${GENOMICS}:M1` },
    ],
    correctValue: 'No — sequence is a starting point, not a full functional blueprint',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GENOMICS}:M1`],
    source: GENOMICS_SRC,
  },
]

// ─── bio.biotech.crispr-genome-editing ────────────────────────────────────────
const CRISPR = 'bio.biotech.crispr-genome-editing'
const CRISPR_SRC = 'docs/biology/kg/graph.json — bio.biotech.crispr-genome-editing'
const CRISPR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CRISPR, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CRISPR-Cas9 is a bacterial immune system repurposed as a precision genome-editing tool. ' +
      'The Cas9 protein is a programmable nuclease: a synthetic guide RNA (sgRNA) of ~20 nucleotides directs it to any matching DNA sequence adjacent to a PAM motif (NGG for SpCas9). ' +
      'Cas9 unwinds the double helix, checks complementarity, and if matched, cuts both strands — a blunt-ended double-strand break (DSB). ' +
      'The cell repairs the DSB by one of two pathways: NHEJ (non-homologous end joining) is fast, error-prone, and commonly introduces insertions or deletions that disrupt the reading frame — a knockout; ' +
      'HDR (homology-directed repair) uses a provided DNA template to introduce a precise edit — a knock-in, but requires the cell to be in S/G2 phase and is less efficient. ' +
      'Base editors and prime editors extend the toolkit to change single nucleotides without a DSB, improving safety for therapeutic use. ' +
      'Off-target cutting at partially matched sequences remains a key safety concern for clinical applications.',
    targetedMisconceptions: [],
    source: CRISPR_SRC,
  },
  {
    conceptId: CRISPR, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CRISPR is often described as "cut and paste" DNA editing, implying reliable, clean insertions of desired sequences. ' +
      'In practice, the default repair pathway (NHEJ) creates small random deletions or insertions that disrupt the gene — useful for knockouts, but not insertions. ' +
      'Precise insertion requires HDR, which is inefficient in most cell types (especially post-mitotic cells like neurons) and impossible without supplying a donor template. ' +
      '"Cut and paste" also understates the off-target risk: sgRNAs with partial complementarity can direct Cas9 to unintended genomic sites, and the consequences depend entirely on what sits at those sites. ' +
      'Current therapeutic editing strategies largely exploit NHEJ knockouts (e.g., disrupting BCL11A to reactivate foetal haemoglobin) precisely because insertion is harder.',
    targetedMisconceptions: [`${CRISPR}:M1`],
    source: CRISPR_SRC,
  },
]
const CRISPR_PROBES: SeedProbe[] = [
  {
    conceptId: CRISPR, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A researcher uses CRISPR-Cas9 without providing a donor DNA template. Which outcome is most likely when the DSB is repaired?',
    choices: [
      { text: 'NHEJ repair introduces small indels that disrupt the reading frame, creating a loss-of-function knockout allele', isCorrect: true },
      { text: 'HDR copies the homologous chromosome sequence precisely, restoring the original sequence', isCorrect: false, misconceptionId: `${CRISPR}:M2` },
      { text: 'The cell apoptoses because DSBs are always lethal without a repair template', isCorrect: false },
    ],
    correctValue: 'NHEJ introduces indels → frameshift knockout',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CRISPR}:M2`],
    source: CRISPR_SRC,
  },
  {
    conceptId: CRISPR, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A news article describes CRISPR as "molecular cut and paste — scientists can now insert any gene anywhere precisely and reliably." What is misleading about this description?',
    choices: [
      { text: 'Precise insertion requires HDR, which is inefficient in most cells; the default repair (NHEJ) creates random indels, and off-target cuts add further unpredictability', isCorrect: true },
      { text: 'Nothing — CRISPR can indeed insert any sequence at any position with near-perfect efficiency in all human cell types', isCorrect: false, misconceptionId: `${CRISPR}:M1` },
    ],
    correctValue: 'Precision insertion is inefficient; NHEJ and off-targets make it far from "cut and paste"',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CRISPR}:M1`],
    source: CRISPR_SRC,
  },
]

// ─── bio.bioinfo.bioinformatics-intro ─────────────────────────────────────────
const BIOINFO = 'bio.bioinfo.bioinformatics-intro'
const BIOINFO_SRC = 'docs/biology/kg/graph.json — bio.bioinfo.bioinformatics-intro'
const BIOINFO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BIOINFO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Bioinformatics is the discipline that develops algorithms and software to store, retrieve, and analyse the vast datasets produced by modern molecular biology. ' +
      'Its core objects are sequences (DNA, RNA, protein), structures (3D protein coordinates), and biological networks (gene regulation, metabolism, protein interaction). ' +
      'Databases — NCBI GenBank, UniProt, PDB — are public repositories that the research community deposits to and draws from; reproducibility depends on citing database versions and accession numbers. ' +
      'The central analytical tasks are: sequence alignment (finding similarity between sequences to infer homology, function, or evolutionary distance), ' +
      'annotation (assigning biological meaning to genomic features), ' +
      'variant calling (identifying SNPs, indels, CNVs from sequencing reads against a reference), ' +
      'and structural prediction (now transformed by AlphaFold2\'s deep learning approach to the protein-folding problem). ' +
      'Bioinformatics is not merely computational support — it sets the experimental hypotheses that wet-lab work then tests.',
    targetedMisconceptions: [],
    source: BIOINFO_SRC,
  },
  {
    conceptId: BIOINFO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Bioinformatics is sometimes treated as a black box: upload data, receive biological truth. ' +
      'Every analysis step makes biological assumptions encoded in algorithm parameters — the choice of aligner, gap penalties, significance thresholds, and reference genome version all shape results. ' +
      'A BLAST hit with E-value 0.001 means there is a 0.001 probability of that match arising by chance in a database of that size; it does NOT mean the proteins share function. ' +
      'Functional annotation by sequence similarity fails for proteins that diverged in function (same fold, different chemistry). ' +
      'AlphaFold2 predictions are structural models, not experimentally determined structures — they need experimental validation for novel binding-site claims. ' +
      'Garbage in, garbage out applies with particular force when the garbage is structured and arrives with impressive-looking statistics.',
    targetedMisconceptions: [`${BIOINFO}:M1`],
    source: BIOINFO_SRC,
  },
]
const BIOINFO_PROBES: SeedProbe[] = [
  {
    conceptId: BIOINFO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A BLAST search returns a hit with E-value = 1e-50 between a query protein and a database entry. What does this E-value indicate?',
    choices: [
      { text: 'The probability of obtaining that alignment score by chance is vanishingly small, providing strong statistical evidence of homology', isCorrect: true },
      { text: 'The two proteins are 50% identical in amino acid sequence', isCorrect: false, misconceptionId: `${BIOINFO}:M2` },
      { text: 'The two proteins share at least 50 structurally conserved residues', isCorrect: false },
    ],
    correctValue: 'E-value = probability of a chance match — very small = very significant',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BIOINFO}:M2`],
    source: BIOINFO_SRC,
  },
  {
    conceptId: BIOINFO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student runs an AlphaFold2 prediction of a novel protein and states "we now know the structure of this protein." What should they add to be scientifically accurate?',
    choices: [
      { text: '"We have a high-confidence structural model; experimental validation (X-ray crystallography, cryo-EM) is still needed to confirm it, especially at the binding site"', isCorrect: true },
      { text: 'Nothing — AlphaFold2 predictions are experimentally equivalent to crystal structures and require no further validation', isCorrect: false, misconceptionId: `${BIOINFO}:M1` },
    ],
    correctValue: 'AlphaFold2 gives a model, not an experimentally determined structure',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BIOINFO}:M1`],
    source: BIOINFO_SRC,
  },
]

// ─── bio.bioinfo.sequence-alignment ───────────────────────────────────────────
const SEQALIGN = 'bio.bioinfo.sequence-alignment'
const SEQALIGN_SRC = 'docs/biology/kg/graph.json — bio.bioinfo.sequence-alignment'
const SEQALIGN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SEQALIGN, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Sequence alignment arranges two or more DNA, RNA, or protein sequences to identify regions of similarity that reflect evolutionary, structural, or functional relationships. ' +
      'Pairwise alignment uses dynamic programming (Needleman-Wunsch for global; Smith-Waterman for local) with a scoring matrix: matches add positive scores, mismatches and gaps subtract. ' +
      'Gap penalties are critical design choices: gap-open penalties are higher than gap-extension penalties because one evolutionary insertion event produces a run of aligned gaps, not many independent ones. ' +
      'BLOSUM and PAM matrices encode the probability of each amino acid substitution observed in real sequence families; they differ in the evolutionary distance they model. ' +
      'Multiple sequence alignment (MSA, e.g., Clustal Omega, MAFFT) aligns three or more sequences simultaneously, revealing conserved columns (functionally critical) and variable columns (diverged). ' +
      'Database searching (BLAST, DIAMOND) heuristically approximates Smith-Waterman for million-sequence databases at practical speed by first matching short exact "words" then extending only promising hits.',
    targetedMisconceptions: [],
    source: SEQALIGN_SRC,
  },
  {
    conceptId: SEQALIGN, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Sequence similarity is not the same as functional equivalence, and detecting similarity is not the same as proving homology. ' +
      'Two proteins with 25% amino acid identity across 300 residues might share the same fold (homologous — descended from a common ancestor) or might be convergent (same fold, independent origin, unrelated by descent). ' +
      'Below ~30% identity (the "twilight zone") alignment scores alone cannot reliably distinguish homology from convergence — structure comparison or phylogenetic methods are needed. ' +
      'Also: a gap in an alignment represents a hypothetical insertion or deletion event, not "missing data" — treating gaps as evidence of low-quality sequence leads to incorrect evolutionary inference. ' +
      'Alignment is a hypothesis about evolutionary history, not a mathematical truth.',
    targetedMisconceptions: [`${SEQALIGN}:M1`],
    source: SEQALIGN_SRC,
  },
]
const SEQALIGN_PROBES: SeedProbe[] = [
  {
    conceptId: SEQALIGN, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a pairwise protein alignment, gap-open penalties are set higher than gap-extension penalties. What biological reasoning justifies this asymmetry?',
    choices: [
      { text: 'A single insertion/deletion evolutionary event typically produces a run of contiguous gaps, so extending an existing gap is less costly than opening a new one', isCorrect: true },
      { text: 'Longer gaps are less common in real sequences, so they should be penalised more heavily per residue', isCorrect: false, misconceptionId: `${SEQALIGN}:M2` },
      { text: 'Gap extension is free because the aligner has already paid for the gap when it was opened', isCorrect: false },
    ],
    correctValue: 'One indel event → a run of gaps; opening a gap is biologically costlier than extending it',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SEQALIGN}:M2`],
    source: SEQALIGN_SRC,
  },
  {
    conceptId: SEQALIGN, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Two proteins show 22% amino acid identity in a pairwise alignment. A student concludes they are not homologous. Is this conclusion justified?',
    choices: [
      { text: 'No — 22% falls in the "twilight zone" where similarity alone cannot distinguish homology from convergence; structural or phylogenetic evidence is needed', isCorrect: true },
      { text: 'Yes — proteins must share at least 30% identity to be considered homologous; below that threshold they are unrelated', isCorrect: false, misconceptionId: `${SEQALIGN}:M1` },
    ],
    correctValue: 'Twilight zone — similarity alone is insufficient to rule out homology',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SEQALIGN}:M1`],
    source: SEQALIGN_SRC,
  },
]

// ─── bio.bioinfo.phylogenetics-computational ──────────────────────────────────
const PHYLOCOMP = 'bio.bioinfo.phylogenetics-computational'
const PHYLOCOMP_SRC = 'docs/biology/kg/graph.json — bio.bioinfo.phylogenetics-computational'
const PHYLOCOMP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHYLOCOMP, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Computational phylogenetics infers the evolutionary relationships among taxa from molecular sequence data. ' +
      'The workflow: align sequences → choose an evolutionary model → infer a tree → assess confidence. ' +
      'Evolutionary models (GTR for DNA, LG/WAG for protein) specify the rates at which different nucleotide or amino acid substitutions occur; model selection by AIC/BIC chooses the simplest model that fits the data. ' +
      'Tree inference methods: distance-based (Neighbour-Joining — fast, no explicit model uncertainty), parsimony (fewest changes — fails under high substitution rates due to long-branch attraction), ' +
      'maximum likelihood (finds the tree topology and branch lengths that maximise the probability of the data under the model — principled but computationally intensive), ' +
      'and Bayesian inference (samples the posterior distribution of trees using MCMC — provides probability rather than just the single best tree). ' +
      'Branch support is assessed by bootstrap (ML) or posterior probabilities (Bayesian). ' +
      'Phylogenies are used for taxonomy, tracing pathogen transmission (SARS-CoV-2 lineages), inferring protein function by synteny, and dating evolutionary events with calibrated molecular clocks.',
    targetedMisconceptions: [],
    source: PHYLOCOMP_SRC,
  },
  {
    conceptId: PHYLOCOMP, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Phylogenetic trees are hypotheses about evolutionary history, not proven facts — a tree is only as reliable as the alignment, model, and data behind it. ' +
      'A persistent misreading: the root of a tree represents "the most primitive" or "least evolved" organism. ' +
      'Every tip of a fully resolved tree has been evolving for exactly the same total time since the root; none is ancestral to any other tip. ' +
      '"Primitive" applied to an extant species confuses a basal phylogenetic position with an absence of evolutionary change — bacteria have been evolving for ~3.5 billion years and are not "simple" in any biochemical sense. ' +
      'Also: a gene tree is not the same as a species tree; gene duplication, loss, lateral gene transfer, and incomplete lineage sorting can make gene histories diverge from the actual speciation history.',
    targetedMisconceptions: [`${PHYLOCOMP}:M1`],
    source: PHYLOCOMP_SRC,
  },
]
const PHYLOCOMP_PROBES: SeedProbe[] = [
  {
    conceptId: PHYLOCOMP, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a maximum-likelihood phylogenetic analysis, bootstrap values are reported at each internal node. What do high bootstrap values (e.g., 95%) indicate?',
    choices: [
      { text: 'That node\'s grouping was recovered in 95% of trees inferred from resampled datasets, indicating strong statistical support for that clade', isCorrect: true },
      { text: 'That the taxa in that clade share 95% DNA sequence identity', isCorrect: false, misconceptionId: `${PHYLOCOMP}:M2` },
      { text: 'That the Bayesian posterior probability for that clade is 0.95', isCorrect: false },
    ],
    correctValue: 'Bootstrap = % of resampled trees recovering that clade — a support measure',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHYLOCOMP}:M2`],
    source: PHYLOCOMP_SRC,
  },
  {
    conceptId: PHYLOCOMP, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student looks at a phylogenetic tree and says "sharks are more primitive than humans because they branch off earlier in the tree." What is wrong with this reasoning?',
    choices: [
      { text: 'Every tip has evolved for the same total time since the common ancestor; basal branching position does not mean "less evolved" — sharks have accumulated their own lineage\'s changes over the same 400+ million years', isCorrect: true },
      { text: 'Nothing — organisms that branch earlier in a tree have had fewer total evolutionary changes and are therefore more ancestral', isCorrect: false, misconceptionId: `${PHYLOCOMP}:M1` },
    ],
    correctValue: 'All tips have evolved equally long; basal position ≠ primitive',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PHYLOCOMP}:M1`],
    source: PHYLOCOMP_SRC,
  },
]

// ─── bio.bioinfo.structural-bioinformatics ────────────────────────────────────
const STRUCTBIO = 'bio.bioinfo.structural-bioinformatics'
const STRUCTBIO_SRC = 'docs/biology/kg/graph.json — bio.bioinfo.structural-bioinformatics'
const STRUCTBIO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STRUCTBIO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Structural bioinformatics analyses and predicts the three-dimensional architecture of biomolecules — proteins, nucleic acids, and their complexes. ' +
      'Experimentally determined structures are deposited in the Protein Data Bank (PDB); each entry records atomic coordinates, resolution, and experimental method (X-ray crystallography, NMR, cryo-EM). ' +
      'Homology modelling builds a 3D model of an unknown structure using an aligned template from the PDB; accuracy depends on sequence identity (>40% is reliable). ' +
      'AlphaFold2 (DeepMind, 2021) uses multiple-sequence alignments and geometric deep learning to predict structures with near-experimental accuracy for many protein families, ' +
      'fundamentally transforming the field; its predictions for ~200 million proteins are now publicly accessible. ' +
      'Docking algorithms predict how a small-molecule ligand positions itself in a protein binding site, guiding drug discovery. ' +
      'Molecular dynamics (MD) simulates atomic motion over nanosecond-to-microsecond timescales, revealing conformational flexibility and the energetics of binding that static structures cannot show.',
    targetedMisconceptions: [],
    source: STRUCTBIO_SRC,
  },
  {
    conceptId: STRUCTBIO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A widely held misconception: because AlphaFold2 predicts structure so accurately, the protein-structure problem is "solved." ' +
      'What AlphaFold2 predicts brilliantly is the single lowest-energy conformation of an isolated protein in near-ideal conditions. ' +
      'It does not capture: conformational ensembles (proteins fluctuate between multiple states that underlie function), ' +
      'ligand-bound states (binding changes structure — induced fit — which AlphaFold2 was not trained to predict), ' +
      'intrinsically disordered regions that have no defined structure (and often carry regulatory function), ' +
      'or the structures of protein complexes reliably (though AlphaFold-Multimer extends this). ' +
      'Drug discovery still requires experimental structures of the drug-bound target, because the apo and holo structures often differ critically at the binding pocket.',
    targetedMisconceptions: [`${STRUCTBIO}:M1`],
    source: STRUCTBIO_SRC,
  },
]
const STRUCTBIO_PROBES: SeedProbe[] = [
  {
    conceptId: STRUCTBIO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A PDB entry reports a protein structure solved by X-ray crystallography at 1.8 Å resolution. What does the resolution value indicate?',
    choices: [
      { text: 'The smallest detail resolvable in the electron density map; lower Å values mean finer detail and higher confidence in atomic positions', isCorrect: true },
      { text: 'The percentage of the protein whose coordinates are determined; 1.8 Å means 1.8% of residues could not be modelled', isCorrect: false, misconceptionId: `${STRUCTBIO}:M2` },
      { text: 'The diameter of the crystal used in data collection', isCorrect: false },
    ],
    correctValue: '1.8 Å resolution = fine detail, high-quality structure',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${STRUCTBIO}:M2`],
    source: STRUCTBIO_SRC,
  },
  {
    conceptId: STRUCTBIO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A colleague says "AlphaFold2 has solved protein structure — we no longer need X-ray crystallography or cryo-EM." What is the strongest counter-argument?',
    choices: [
      { text: 'AlphaFold2 predicts the apo structure at minimum energy; drug discovery needs the ligand-bound conformation (which changes the binding pocket) and experimental validation of key residues', isCorrect: true },
      { text: 'AlphaFold2 predictions are unreliable above 200 residues, so crystallography is still needed for large proteins', isCorrect: false, misconceptionId: `${STRUCTBIO}:M1` },
    ],
    correctValue: 'Ligand-bound structures and validation still require experiment',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STRUCTBIO}:M1`],
    source: STRUCTBIO_SRC,
  },
]

// ─── bio.sys.systems-biology-intro ────────────────────────────────────────────
const SYSBIO = 'bio.sys.systems-biology-intro'
const SYSBIO_SRC = 'docs/biology/kg/graph.json — bio.sys.systems-biology-intro'
const SYSBIO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYSBIO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Systems biology studies biological phenomena as emergent properties of networks — gene regulatory networks, metabolic networks, signalling cascades, and ecological webs — ' +
      'rather than the properties of individual components studied in isolation. ' +
      'Its core claim: network topology and dynamics produce behaviours (oscillation, bistability, robustness, adaptation) that cannot be predicted from any single component\'s characterisation. ' +
      'Key concepts: feedback loops (negative feedback dampens perturbations → homeostasis; positive feedback amplifies → switch-like transitions); ' +
      'modularity (functional sub-networks that can be rewired); ' +
      'robustness vs. fragility (biological networks are robust to many perturbations but fragile at specific "bow-tie" hubs — the same topology that makes metabolism efficient makes it vulnerable to hub-enzyme loss); ' +
      'and emergence (the circadian clock is not "in" any single gene but in the feedback topology among ~10 genes). ' +
      'Integrative multi-omics datasets (genomics, transcriptomics, proteomics, metabolomics) feed mathematical models (ODEs, Boolean networks, stochastic simulations) that generate testable predictions.',
    targetedMisconceptions: [],
    source: SYSBIO_SRC,
  },
  {
    conceptId: SYSBIO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Systems biology is sometimes equated with "using lots of data" or "running lots of experiments simultaneously." ' +
      'The distinguishing feature is not data volume but the MODELLING of interactions: systems biology builds mathematical or computational models of how components interact, then tests whether the model reproduces and predicts system-level behaviour. ' +
      'High-throughput data without a mechanistic model is descriptive — useful, but not systems biology. ' +
      'Similarly, listing network connections (a protein interaction map) is not systems biology until dynamics are modelled: the same network topology produces completely different behaviour depending on reaction rates, delays, and cooperativity. ' +
      '"Systems" names the object of study (the network) and the methodology (iterative model-experiment cycles), not the quantity of data.',
    targetedMisconceptions: [`${SYSBIO}:M1`],
    source: SYSBIO_SRC,
  },
]
const SYSBIO_PROBES: SeedProbe[] = [
  {
    conceptId: SYSBIO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A gene regulatory network contains a negative feedback loop where gene A activates gene B, and gene B represses gene A. What system-level behaviour does this topology tend to produce?',
    choices: [
      { text: 'Oscillation or homeostatic damping — negative feedback resists change and can generate periodic cycles depending on delay', isCorrect: true },
      { text: 'Bistability — the system locks into one of two stable states and switches irreversibly between them', isCorrect: false, misconceptionId: `${SYSBIO}:M2` },
      { text: 'Monotonic increase of both A and B toward maximum expression', isCorrect: false },
    ],
    correctValue: 'Negative feedback → oscillation or damping',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SYSBIO}:M2`],
    source: SYSBIO_SRC,
  },
  {
    conceptId: SYSBIO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A lab generates transcriptomics, proteomics, and metabolomics data from a single cell type under 20 conditions. A student calls this "systems biology." What is missing for this label to be accurate?',
    choices: [
      { text: 'A mathematical or computational model of how the measured components interact, used to generate and test predictions about system-level dynamics', isCorrect: true },
      { text: 'Nothing — gathering multi-omics data from the same system IS systems biology by definition', isCorrect: false, misconceptionId: `${SYSBIO}:M1` },
    ],
    correctValue: 'Systems biology requires a mechanistic model, not just large datasets',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SYSBIO}:M1`],
    source: SYSBIO_SRC,
  },
]

// ─── bio.sys.gene-regulatory-networks ─────────────────────────────────────────
const SYSGENREG = 'bio.sys.gene-regulatory-networks'
const SYSGENREG_SRC = 'docs/biology/kg/graph.json — bio.sys.gene-regulatory-networks'
const SYSGENREG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYSGENREG, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A gene regulatory network (GRN) is a graph in which nodes are genes (or their protein products) and directed edges represent regulatory interactions — activation or repression. ' +
      'The GRN encodes WHAT the genome expresses and WHEN: transcription factors bind cis-regulatory elements (enhancers, silencers) and determine which genes are on or off in each cell type and developmental stage. ' +
      'Recurring "network motifs" (small sub-graphs over-represented compared to random networks) implement specific computational functions: ' +
      'feedforward loops filter transient signals; autoregulation (a TF activating or repressing its own gene) tunes response speed; ' +
      'the bistable toggle switch (two mutually repressing TFs) underlies binary cell-fate decisions. ' +
      'GRN reconstruction uses ChIP-seq (which genomic regions does TF X bind?) combined with expression data (what happens to target genes when X is perturbed?) ' +
      'and motif scanning (do these promoters share the same binding motif?). ' +
      'Large curated GRNs (e.g., the sea urchin endomesoderm GRN mapped by Eric Davidson) serve as benchmarks for developmental decision logic.',
    targetedMisconceptions: [],
    source: SYSGENREG_SRC,
  },
  {
    conceptId: SYSGENREG, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A common conceptual error: a GRN is a static wiring diagram, like a circuit schematic. ' +
      'GRNs are dynamic: the same network topology can produce completely different output depending on initial conditions, input signal strength, and the rates of each interaction. ' +
      'A toggle switch can sit in either stable state indefinitely; which state a particular cell adopts depends on stochastic fluctuations during development and on which TF was present first — ' +
      'identical genomes produce different phenotypes partly through this combinatorial logic. ' +
      'Also: edges in a GRN represent regulatory influences inferred from experiments, not physical connections — a ChIP-seq peak means a TF bound near the gene, not that the TF necessarily changes its expression in all contexts. ' +
      'Context-dependence (co-activators, chromatin state, post-translational modifications of the TF itself) modulates every edge.',
    targetedMisconceptions: [`${SYSGENREG}:M1`],
    source: SYSGENREG_SRC,
  },
]
const SYSGENREG_PROBES: SeedProbe[] = [
  {
    conceptId: SYSGENREG, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a gene regulatory network, transcription factor A activates gene B, and B represses A (negative feedback). A signal transiently increases A. Which behaviour does this motif produce?',
    choices: [
      { text: 'A pulse of B expression followed by return to baseline — the negative feedback terminates the response after the signal passes', isCorrect: true },
      { text: 'Permanent lock-on of B expression — once activated, B stays high indefinitely', isCorrect: false, misconceptionId: `${SYSGENREG}:M2` },
      { text: 'Oscillating bursts of A and B expression with increasing amplitude over time', isCorrect: false },
    ],
    correctValue: 'Pulse response — negative feedback terminates B after the transient signal',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SYSGENREG}:M2`],
    source: SYSGENREG_SRC,
  },
  {
    conceptId: SYSGENREG, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A researcher publishes a complete wiring diagram (GRN) of a developmental process. A colleague says "now we can predict exactly which genes will be expressed in each cell at each time point." What caveat is essential?',
    choices: [
      { text: 'The diagram shows topology but not dynamics; actual expression depends on interaction rates, initial conditions, and stochastic fluctuations — prediction requires a parameterised mathematical model', isCorrect: true },
      { text: 'Nothing — a complete wiring diagram IS a complete predictive model of gene expression', isCorrect: false, misconceptionId: `${SYSGENREG}:M1` },
    ],
    correctValue: 'Topology without dynamics cannot predict expression quantitatively',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SYSGENREG}:M1`],
    source: SYSGENREG_SRC,
  },
]

// ─── bio.sys.metabolic-network-modelling ──────────────────────────────────────
const METABNET = 'bio.sys.metabolic-network-modelling'
const METABNET_SRC = 'docs/biology/kg/graph.json — bio.sys.metabolic-network-modelling'
const METABNET_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: METABNET, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Metabolic network modelling represents cellular metabolism as a system of stoichiometrically balanced reactions connecting metabolites through enzyme-catalysed steps. ' +
      'The stoichiometric matrix S (reactions × metabolites) compactly encodes all mass-balance constraints: at steady state, the net production of every internal metabolite equals zero (Sv = 0, where v is the flux vector). ' +
      'Flux Balance Analysis (FBA) uses linear programming to find the flux distribution that maximises a biological objective (usually growth rate or ATP yield) within stoichiometric and capacity constraints, ' +
      'without requiring knowledge of enzyme kinetics — a major practical advantage for genome-scale models. ' +
      'Genome-scale metabolic models (GEMs) reconstructed from annotated genomes now exist for hundreds of organisms; ' +
      'they successfully predict gene essentiality (knock out a reaction in silico → growth impossible? → essential gene) and guide metabolic engineering for biotechnology. ' +
      'Constraint-based methods are complemented by kinetic models (ODEs with Michaelis-Menten or mechanistic rate laws) when temporal dynamics and saturation effects matter.',
    targetedMisconceptions: [],
    source: METABNET_SRC,
  },
  {
    conceptId: METABNET, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FBA is sometimes described as "simulating metabolism." It is not a dynamic simulation — it finds a STEADY-STATE flux distribution that satisfies constraints and optimises the objective; ' +
      'it does not track how concentrations change over time or predict transient responses to perturbations. ' +
      'FBA also does not directly model thermodynamics (a reaction can appear feasible in the stoichiometric matrix but be thermodynamically irreversible in the cell), ' +
      'regulatory constraints (enzyme expression must be turned on for the reaction to carry flux — the model carries reactions without knowing if they are expressed), ' +
      'or saturation (kinetic effects are ignored; substrate concentrations are not tracked). ' +
      'These limitations are not defects — FBA\'s power comes from requiring only stoichiometry and an objective, both readily available. ' +
      'But it predicts the feasible solution SPACE, not a unique biological prediction, unless additional constraints are added.',
    targetedMisconceptions: [`${METABNET}:M1`],
    source: METABNET_SRC,
  },
]
const METABNET_PROBES: SeedProbe[] = [
  {
    conceptId: METABNET, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In Flux Balance Analysis (FBA), a reaction in the metabolic model is computationally deleted (constrained to zero flux). The maximum growth rate drops to zero. What does this predict about the corresponding gene?',
    choices: [
      { text: 'The gene is predicted to be essential — no alternative metabolic route can compensate for its loss under the modelled growth conditions', isCorrect: true },
      { text: 'The gene is predicted to be redundant — growth can still occur through alternative pathways', isCorrect: false, misconceptionId: `${METABNET}:M2` },
      { text: 'The gene encodes a transporter rather than a metabolic enzyme — transporters always reduce growth when deleted', isCorrect: false },
    ],
    correctValue: 'Zero growth after deletion = predicted essential gene',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${METABNET}:M2`],
    source: METABNET_SRC,
  },
  {
    conceptId: METABNET, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A student uses FBA to model how a bacterium\'s metabolite concentrations change over 60 minutes after a glucose pulse. What is the fundamental problem with this approach?',
    choices: [
      { text: 'FBA finds a steady-state flux distribution — it does not track metabolite concentrations over time; dynamic modelling (ODEs with kinetic rates) is required for temporal responses', isCorrect: true },
      { text: 'FBA can model time courses but requires at least 100 time points to be accurate', isCorrect: false, misconceptionId: `${METABNET}:M1` },
    ],
    correctValue: 'FBA is steady-state, not dynamic — metabolite concentrations are not tracked',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${METABNET}:M1`],
    source: METABNET_SRC,
  },
]

// ─── bio.sys.synthetic-biology ────────────────────────────────────────────────
const SYNTHBIO = 'bio.sys.synthetic-biology'
const SYNTHBIO_SRC = 'docs/biology/kg/graph.json — bio.sys.synthetic-biology'
const SYNTHBIO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYNTHBIO, subjectSlug: 'biology', familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Synthetic biology designs and assembles new biological parts, devices, and systems that do not exist in nature, or re-designs natural biological systems for new purposes. ' +
      'It applies engineering principles — standardisation, abstraction, modularity, decoupling design from fabrication — to biological construction. ' +
      'At the PARTS level: standardised BioBrick promoters, ribosome-binding sites, coding sequences, and terminators can be assembled combinatorially. ' +
      'At the DEVICE level: genetic circuits (toggle switches, oscillators, logic gates, feedback controllers) implement defined computational functions in cells. ' +
      'At the SYSTEM level: re-engineered metabolic pathways produce artemisinin (anti-malarial), commodity chemicals, or biofuels; ' +
      'engineered bacteria sense and report on environmental toxins; cell-based therapies use synthetic circuits to detect disease biomarkers and release therapeutics only in the diseased microenvironment. ' +
      'The design-build-test-learn (DBTL) cycle mirrors the engineering design loop, with DNA synthesis replacing construction and high-throughput assays replacing manual testing.',
    targetedMisconceptions: [],
    source: SYNTHBIO_SRC,
  },
  {
    conceptId: SYNTHBIO, subjectSlug: 'biology', familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Synthetic biology is often conflated with genetic engineering (adding single genes to organisms) or with creating life from scratch. ' +
      'The distinguishing features are: (1) SYSTEMS-level design — synthetic biology builds multi-component circuits with defined logical behaviour, not just gene transfers; ' +
      '(2) ENGINEERING methodology — abstract design, composable parts, predictive modelling, then construction; genetic engineering is typically one-off and empirical. ' +
      '"Creating life" conflates total genome synthesis (Mycoplasma mycoides genome, 2010 — transplanted into an enucleated cell that already existed) with generating the first living cell from non-living chemistry — ' +
      'the latter has not been achieved. ' +
      'The engineered organisms used in synthetic biology are fully cellular hosts (E. coli, yeast, CHO cells) whose existing cellular machinery is required for the synthetic circuit to function; ' +
      'no lab has built a self-replicating cell entirely from designed-from-scratch components.',
    targetedMisconceptions: [`${SYNTHBIO}:M1`],
    source: SYNTHBIO_SRC,
  },
]
const SYNTHBIO_PROBES: SeedProbe[] = [
  {
    conceptId: SYNTHBIO, subjectSlug: 'biology', probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A synthetic biology team designs a genetic toggle switch: TF A represses gene B, and TF B represses gene A. A transient pulse of A shifts the cell to state "B off, A on." What happens when the pulse is removed?',
    choices: [
      { text: 'The cell remains in the "B off, A on" state — mutual repression creates bistability; the switch remembers the input pulse without continuous signal', isCorrect: true },
      { text: 'The system returns to its original state — toggle switches always reset to default after the input signal is removed', isCorrect: false, misconceptionId: `${SYNTHBIO}:M2` },
      { text: 'The system oscillates indefinitely between A-on and B-on states', isCorrect: false },
    ],
    correctValue: 'Bistable — the switch is latched; state persists after the pulse',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SYNTHBIO}:M2`],
    source: SYNTHBIO_SRC,
  },
  {
    conceptId: SYNTHBIO, subjectSlug: 'biology', probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A journalist reports that "synthetic biologists at MIT created life in 2010 by building a genome from scratch." What important qualification does this statement omit?',
    choices: [
      { text: 'The synthetic genome was transplanted into an existing enucleated bacterial cell — the host cellular machinery was pre-existing; no team has constructed a self-replicating cell entirely from designed non-living components', isCorrect: true },
      { text: 'Nothing is omitted — building a complete functioning genome from synthesised DNA is equivalent to creating life from non-living matter', isCorrect: false, misconceptionId: `${SYNTHBIO}:M1` },
    ],
    correctValue: 'Genome synthesis ≠ creating life from scratch; host cell machinery was required',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SYNTHBIO}:M1`],
    source: SYNTHBIO_SRC,
  },
]

// ─── Batch export ──────────────────────────────────────────────────────────────
export const BIOLOGY_EXPLANATIONS: SeedExplanation[] = [
  ...BIOL_EXPLANATIONS,
  ...LIFECHARS_EXPLANATIONS,
  ...CLASSNEED_EXPLANATIONS,
  ...BINOMEN_EXPLANATIONS,
  ...FIVEK_EXPLANATIONS,
  ...MICRO_EXPLANATIONS,
  ...BIOLEVEL_EXPLANATIONS,
  ...ORGENV_EXPLANATIONS,
  ...VIRUS_EXPLANATIONS,
  ...CELLTH_EXPLANATIONS,
  ...POPECO_EXPLANATIONS,
  ...PROKARY_EXPLANATIONS,
  ...EUKARY_EXPLANATIONS,
  ...ECOSYS_EXPLANATIONS,
  ...MICDIV_EXPLANATIONS,
  ...BIOMOL_EXPLANATIONS,
  ...MEMTRANS_EXPLANATIONS,
  ...NUCCHROM_EXPLANATIONS,
  ...MITO_EXPLANATIONS,
  ...CHLORO_EXPLANATIONS,
  ...ENDO_EXPLANATIONS,
  ...CYTO_EXPLANATIONS,
  ...CELLSIG_EXPLANATIONS,
  ...CELLCYC_EXPLANATIONS,
  ...MITOSIS_EXPLANATIONS,
  ...MEIOSIS_EXPLANATIONS,
  ...CARBSLIP_EXPLANATIONS,
  ...PROTEINS_EXPLANATIONS,
  ...NUCLSTRU_EXPLANATIONS,
  ...ENZYMES_EXPLANATIONS,
  ...ORIGLIFE_EXPLANATIONS,
  ...EVOEVID_EXPLANATIONS,
  ...NATSEL_EXPLANATIONS,
  ...RESP_EXPLANATIONS,
  ...CIRC_EXPLANATIONS,
  ...IMMUNINTRO_EXPLANATIONS,
  ...PLWATER_EXPLANATIONS,
  ...MICGROW_EXPLANATIONS,
  ...PATHMIC_EXPLANATIONS,
  ...NUTCYCLE_EXPLANATIONS,
  ...BIODIV_EXPLANATIONS,
  ...ENVISS_EXPLANATIONS,
  ...MICWELF_EXPLANATIONS,
  ...DNAREP_EXPLANATIONS,
  ...TRANSCR_EXPLANATIONS,
  ...DIGEST_EXPLANATIONS,
  ...PHOTOSYNTH_EXPLANATIONS,
  ...PLMINERAL_EXPLANATIONS,
  ...PLHORM_EXPLANATIONS,
  ...NERVSYS_EXPLANATIONS,
  ...ENDOCRINE_EXPLANATIONS,
  ...EXCRET_EXPLANATIONS,
  ...MUSCULO_EXPLANATIONS,
  ...MENDEL_EXPLANATIONS,
  ...GENEINT_EXPLANATIONS,
  ...ASEXREP_EXPLANATIONS,
  ...TRANSLT_EXPLANATIONS,
  ...CHROMLINK_EXPLANATIONS,
  ...SEXPLANT_EXPLANATIONS,
  ...HUMREPRO_EXPLANATIONS,
  ...INNATEADAP_EXPLANATIONS,
  ...ANTIBODY_EXPLANATIONS,
  ...VACCINE_EXPLANATIONS,
  ...PEDIGREE_EXPLANATIONS,
  ...MUTATIONS_EXPLANATIONS,
  ...IMDISORD_EXPLANATIONS,
  ...GENEREG_EXPLANATIONS,
  ...POPGEN_EXPLANATIONS,
  ...FERTDEV_EXPLANATIONS,
  ...REPHEALTH_EXPLANATIONS,
  ...MODSYN_EXPLANATIONS,
  ...HUMEVO_EXPLANATIONS,
  ...GENENG_EXPLANATIONS,
  ...GAMEDEVO_EXPLANATIONS,
  ...PLRESP_EXPLANATIONS,
  ...BIOTECH_EXPLANATIONS,
  ...MORPHO_EXPLANATIONS,
  ...STEMCELLS_EXPLANATIONS,
  ...BIOTECHAPP_EXPLANATIONS,
  ...GENOMICS_EXPLANATIONS,
  ...CRISPR_EXPLANATIONS,
  ...BIOINFO_EXPLANATIONS,
  ...SEQALIGN_EXPLANATIONS,
  ...PHYLOCOMP_EXPLANATIONS,
  ...STRUCTBIO_EXPLANATIONS,
  ...SYSBIO_EXPLANATIONS,
  ...SYSGENREG_EXPLANATIONS,
  ...METABNET_EXPLANATIONS,
  ...SYNTHBIO_EXPLANATIONS,
]
export const BIOLOGY_PROBES: SeedProbe[] = [
  ...BIOL_PROBES,
  ...LIFECHARS_PROBES,
  ...CLASSNEED_PROBES,
  ...BINOMEN_PROBES,
  ...FIVEK_PROBES,
  ...MICRO_PROBES,
  ...BIOLEVEL_PROBES,
  ...ORGENV_PROBES,
  ...VIRUS_PROBES,
  ...CELLTH_PROBES,
  ...POPECO_PROBES,
  ...PROKARY_PROBES,
  ...EUKARY_PROBES,
  ...ECOSYS_PROBES,
  ...MICDIV_PROBES,
  ...BIOMOL_PROBES,
  ...MEMTRANS_PROBES,
  ...NUCCHROM_PROBES,
  ...MITO_PROBES,
  ...CHLORO_PROBES,
  ...ENDO_PROBES,
  ...CYTO_PROBES,
  ...CELLSIG_PROBES,
  ...CELLCYC_PROBES,
  ...MITOSIS_PROBES,
  ...MEIOSIS_PROBES,
  ...CARBSLIP_PROBES,
  ...PROTEINS_PROBES,
  ...NUCLSTRU_PROBES,
  ...ENZYMES_PROBES,
  ...ORIGLIFE_PROBES,
  ...EVOEVID_PROBES,
  ...NATSEL_PROBES,
  ...RESP_PROBES,
  ...CIRC_PROBES,
  ...IMMUNINTRO_PROBES,
  ...PLWATER_PROBES,
  ...MICGROW_PROBES,
  ...PATHMIC_PROBES,
  ...NUTCYCLE_PROBES,
  ...BIODIV_PROBES,
  ...ENVISS_PROBES,
  ...MICWELF_PROBES,
  ...DNAREP_PROBES,
  ...TRANSCR_PROBES,
  ...DIGEST_PROBES,
  ...PHOTOSYNTH_PROBES,
  ...PLMINERAL_PROBES,
  ...PLHORM_PROBES,
  ...NERVSYS_PROBES,
  ...ENDOCRINE_PROBES,
  ...EXCRET_PROBES,
  ...MUSCULO_PROBES,
  ...MENDEL_PROBES,
  ...GENEINT_PROBES,
  ...ASEXREP_PROBES,
  ...TRANSLT_PROBES,
  ...CHROMLINK_PROBES,
  ...SEXPLANT_PROBES,
  ...HUMREPRO_PROBES,
  ...INNATEADAP_PROBES,
  ...ANTIBODY_PROBES,
  ...VACCINE_PROBES,
  ...PEDIGREE_PROBES,
  ...MUTATIONS_PROBES,
  ...IMDISORD_PROBES,
  ...GENEREG_PROBES,
  ...POPGEN_PROBES,
  ...FERTDEV_PROBES,
  ...REPHEALTH_PROBES,
  ...MODSYN_PROBES,
  ...HUMEVO_PROBES,
  ...GENENG_PROBES,
  ...GAMEDEVO_PROBES,
  ...PLRESP_PROBES,
  ...BIOTECH_PROBES,
  ...MORPHO_PROBES,
  ...STEMCELLS_PROBES,
  ...BIOTECHAPP_PROBES,
  ...GENOMICS_PROBES,
  ...CRISPR_PROBES,
  ...BIOINFO_PROBES,
  ...SEQALIGN_PROBES,
  ...PHYLOCOMP_PROBES,
  ...STRUCTBIO_PROBES,
  ...SYSBIO_PROBES,
  ...SYSGENREG_PROBES,
  ...METABNET_PROBES,
  ...SYNTHBIO_PROBES,
]

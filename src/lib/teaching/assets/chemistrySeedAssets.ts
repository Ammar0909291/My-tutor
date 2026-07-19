/**
 * Chemistry Explanation Memory — production-quality authored teaching assets
 * for all 186 canonical chemistry concepts.
 *
 * Same interfaces and seed pipeline as brainSeedAssets.ts / authoredSeedAssets.ts.
 * Each asset teaches (not describes), builds intuition, prevents misconceptions,
 * and transitions into the next concept. Grade band: HIGH (Class 11-12 / ages 14-17)
 * as the primary audience, with UNDERGRADUATE for advanced/expert concepts.
 *
 * Source citations reference the canonical KG (docs/chemistry/kg/graph.json)
 * concept descriptions and standard chemistry pedagogy — no blueprint files
 * exist for chemistry concepts.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

// ─── chem.found.matter ───────────────────────────────────────────────────────
const MATTER = 'chem.found.matter'
const MATTER_SRC = 'docs/chemistry/kg/graph.json — chem.found.matter'

const MATTER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MATTER,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Everything around you — the air you breathe, the phone in your hand, ' +
      'the water you drink — is matter. But chemistry asks a sharper question: ' +
      'HOW PURE is it? Imagine a gold ring. Pure gold? That\'s an element — one ' +
      'type of atom only. Mix gold with copper? That\'s a mixture — you can ' +
      'separate them physically. But table salt (NaCl)? That\'s a compound — ' +
      'sodium and chlorine CHEMICALLY bonded, and you can\'t just pick them ' +
      'apart with tweezers. The whole of chemistry sits on this one distinction: ' +
      'physically mixed (can separate) vs. chemically combined (need a reaction ' +
      'to break). Master this classification and every chapter ahead clicks into ' +
      'place — bonding explains WHY compounds form, reactions explain HOW they ' +
      'break and re-form.',
    targetedMisconceptions: [`${MATTER}:MC1`],
    source: `${MATTER_SRC} — core classification of matter (elements, compounds, mixtures)`,
  },
  {
    conceptId: MATTER,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Here\'s a trap almost everyone falls into: "Air is an element because ' +
      'it\'s invisible and uniform." But air is a MIXTURE — it\'s 78% nitrogen, ' +
      '21% oxygen, plus traces of argon and CO₂. You can separate them by ' +
      'cooling air until each gas liquefies at its own boiling point. The key ' +
      'test: can you separate it WITHOUT a chemical reaction? Yes → mixture. ' +
      'No (need to break bonds) → compound. Looks uniform? That just makes it ' +
      'a HOMOGENEOUS mixture, not a pure substance. Uniformity tells you about ' +
      'appearance, not purity.',
    targetedMisconceptions: [`${MATTER}:MC1`],
    source: `${MATTER_SRC} — misconception: confusing homogeneous mixtures with pure substances`,
  },
]

const MATTER_PROBES: SeedProbe[] = [
  {
    conceptId: MATTER,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Brass is made by melting copper and zinc together. It looks completely uniform. Brass is a:',
    choices: [
      { text: 'Homogeneous mixture — physically combined, separable without chemical reaction', isCorrect: true },
      { text: 'Compound — two elements chemically bonded together', isCorrect: false, misconceptionId: `${MATTER}:MC1` },
      { text: 'Element — because it looks pure and uniform', isCorrect: false, misconceptionId: `${MATTER}:MC2` },
    ],
    correctValue: 'Homogeneous mixture',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MATTER}:MC1`, `${MATTER}:MC2`],
    source: `${MATTER_SRC} — distractor targets "uniform = pure" misconception`,
  },
  {
    conceptId: MATTER,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Sugar dissolves completely in water, making a clear solution. Is this a compound or a mixture? How would you prove it?',
    choices: [
      { text: 'Mixture — boil off the water and sugar reappears unchanged (physical separation)', isCorrect: true },
      { text: 'Compound — sugar and water combined to form something new since you can\'t see the sugar', isCorrect: false, misconceptionId: `${MATTER}:MC1` },
    ],
    correctValue: 'Mixture',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MATTER}:MC1`],
    source: `${MATTER_SRC} — dissolving ≠ chemical combination misconception probe`,
  },
]

// ─── chem.found.states-of-matter ─────────────────────────────────────────────
const STATES = 'chem.found.states-of-matter'
const STATES_SRC = 'docs/chemistry/kg/graph.json — chem.found.states-of-matter'

const STATES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STATES,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Solid, liquid, gas — you\'ve known these since childhood. But chemistry ' +
      'asks WHY. The answer is one idea: particles are ALWAYS moving, and ' +
      'temperature is just how FAST. In a solid, particles vibrate in fixed ' +
      'positions — there\'s enough attraction between them to hold the structure. ' +
      'Add heat (more kinetic energy) and eventually particles shake free enough ' +
      'to slide past each other — that\'s liquid. Add more, and they fly apart ' +
      'entirely — gas. Every phase change is the same battle: kinetic energy ' +
      '(escape) vs. intermolecular forces (hold together). When kinetic wins, ' +
      'you go up a state. When forces win, you go down. That single contest ' +
      'explains melting, boiling, freezing, condensation — all of it.',
    targetedMisconceptions: [`${STATES}:MC1`],
    source: `${STATES_SRC} — particle-level explanation of three phases and interconversion`,
  },
  {
    conceptId: STATES,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The most dangerous misconception in early chemistry: "When water boils, ' +
      'the molecules break apart into hydrogen and oxygen." NO. Boiling is a ' +
      'PHYSICAL change — H₂O molecules stay intact, they just fly apart FROM ' +
      'EACH OTHER. The bonds BETWEEN water molecules (intermolecular) break; ' +
      'the bonds WITHIN water molecules (O-H covalent bonds) stay untouched. ' +
      'Proof: steam condenses back to water with no chemical reaction. If ' +
      'the molecules had broken, you\'d need to recombine H₂ and O₂ (which ' +
      'requires a spark and is explosive). Physical change = molecules stay ' +
      'whole, arrangement changes. Chemical change = molecules break and ' +
      'new ones form.',
    targetedMisconceptions: [`${STATES}:MC1`],
    source: `${STATES_SRC} — misconception: boiling breaks molecules apart (confusing inter/intramolecular)`,
  },
]

const STATES_PROBES: SeedProbe[] = [
  {
    conceptId: STATES,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'When ice melts into water, what happens at the particle level?',
    choices: [
      { text: 'H₂O molecules stay intact but gain enough energy to slide past each other', isCorrect: true },
      { text: 'H₂O molecules break into H₂ and O₂ which dissolve in the liquid', isCorrect: false, misconceptionId: `${STATES}:MC1` },
      { text: 'The atoms get bigger as they absorb heat energy', isCorrect: false, misconceptionId: `${STATES}:MC2` },
    ],
    correctValue: 'H₂O molecules stay intact',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STATES}:MC1`, `${STATES}:MC2`],
    source: `${STATES_SRC} — distractor targets "molecules break during phase change"`,
  },
  {
    conceptId: STATES,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says: "Particles in a solid don\'t move at all — that\'s why solids are rigid." What\'s wrong with this?',
    choices: [
      { text: 'Particles in a solid DO move — they vibrate about fixed positions; rigidity comes from strong intermolecular forces holding positions fixed, not from zero motion', isCorrect: true },
      { text: 'Nothing is wrong — solid particles are completely stationary until heated', isCorrect: false, misconceptionId: `${STATES}:MC3` },
    ],
    correctValue: 'Particles vibrate in fixed positions',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STATES}:MC3`],
    source: `${STATES_SRC} — misconception: solid particles are motionless`,
  },
]

// ─── chem.found.pure-substances ──────────────────────────────────────────────
const PURE = 'chem.found.pure-substances'
const PURE_SRC = 'docs/chemistry/kg/graph.json — chem.found.pure-substances'

const PURE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PURE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A pure substance has a FIXED composition — every sample is identical ' +
      'at the molecular level. There are exactly two kinds: elements (only one ' +
      'type of atom — oxygen gas O₂, diamond C) and compounds (two or more ' +
      'elements in a FIXED ratio — water is always H₂O, never H₃O). A mixture? ' +
      'No fixed ratio — you can make weak tea or strong tea, but you can\'t make ' +
      '"weak water." The practical test: pure substances have SHARP melting/boiling ' +
      'points (ice melts at exactly 0°C); mixtures melt over a RANGE (chocolate ' +
      'softens gradually). This is how labs check purity — if your substance melts ' +
      'over a 2-degree range instead of sharply, it\'s contaminated. Separation ' +
      'techniques (filtration, distillation, chromatography) exploit PHYSICAL ' +
      'differences between mixture components — different boiling points, different ' +
      'solubilities, different particle sizes.',
    targetedMisconceptions: [`${PURE}:MC1`],
    source: `${PURE_SRC} — elements/compounds as pure substances; separation techniques`,
  },
  {
    conceptId: PURE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common trap: "Oxygen is a pure substance, so it must be an element." ' +
      'Correct conclusion, wrong reasoning! O₂ is an element because it contains ' +
      'ONLY oxygen atoms. But CO₂ is ALSO a pure substance — it\'s a compound ' +
      '(fixed ratio, one formula). "Pure" doesn\'t mean "element." Pure means ' +
      'fixed composition. Elements AND compounds are both pure. The real question ' +
      'is: one type of atom (element) or multiple types in fixed ratio (compound)? ' +
      'Another trap: "I can\'t see the components, so it must be pure." Nope — ' +
      'salt water looks identical throughout but is a mixture (variable ratio: ' +
      'you choose how much salt to add).',
    targetedMisconceptions: [`${PURE}:MC1`, `${PURE}:MC2`],
    source: `${PURE_SRC} — misconception: "pure" means element; invisible components mean pure`,
  },
]

const PURE_PROBES: SeedProbe[] = [
  {
    conceptId: PURE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which of these is a pure substance?',
    choices: [
      { text: 'Carbon dioxide (CO₂) — fixed composition, one formula', isCorrect: true },
      { text: 'Filtered seawater — clear and uniform after filtering', isCorrect: false, misconceptionId: `${PURE}:MC2` },
      { text: 'Air — invisible and everywhere', isCorrect: false, misconceptionId: `${PURE}:MC2` },
    ],
    correctValue: 'Carbon dioxide',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PURE}:MC2`],
    source: `${PURE_SRC} — distractor targets "clear/uniform = pure" misconception`,
  },
  {
    conceptId: PURE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Your lab partner says: "Distilled water is a mixture because hydrogen and oxygen are different elements combined together." What\'s the flaw?',
    choices: [
      { text: 'Water is a COMPOUND (pure substance) — H and O are chemically bonded in a fixed 2:1 ratio, not physically mixed', isCorrect: true },
      { text: 'Correct — any time you combine different elements you get a mixture', isCorrect: false, misconceptionId: `${PURE}:MC1` },
    ],
    correctValue: 'Water is a compound (pure substance)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PURE}:MC1`],
    source: `${PURE_SRC} — misconception: combining different elements always = mixture`,
  },
]

// ─── chem.found.measurement ──────────────────────────────────────────────────
const MEAS = 'chem.found.measurement'
const MEAS_SRC = 'docs/chemistry/kg/graph.json — chem.found.measurement'

const MEAS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEAS,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Science runs on NUMBERS, and numbers without units are meaningless — ' +
      '"the mass is 5" tells you nothing. SI gives us seven base units (metre, ' +
      'kilogram, second, ampere, kelvin, mole, candela) from which every other ' +
      'unit is DERIVED. Pressure in pascals? That\'s kg/(m·s²). Energy in joules? ' +
      'kg·m²/s². You don\'t need to memorize these — just know that every unit ' +
      'traces back to the seven. Prefixes scale them: kilo (10³), milli (10⁻³), ' +
      'micro (10⁻⁶), nano (10⁻⁹). The real skill in chemistry is CONVERTING: ' +
      'always multiply by a fraction that equals 1 (like 1000 mL / 1 L). If ' +
      'units cancel correctly, your conversion is right. If they don\'t cancel, ' +
      'you flipped the fraction — dimensional analysis catches errors before ' +
      'you even touch a calculator.',
    targetedMisconceptions: [`${MEAS}:MC1`],
    source: `${MEAS_SRC} — SI base/derived units, prefixes, dimensional analysis`,
  },
  {
    conceptId: MEAS,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often confuse ACCURACY with PRECISION. Picture a dartboard: ' +
      'accuracy = hitting the bullseye (your average is close to the true value). ' +
      'Precision = darts clustered tightly (repeated measurements agree with each ' +
      'other). You can be precise but inaccurate — all darts in a tight group in ' +
      'the wrong corner. A common lab error: "My measurements are very consistent ' +
      'so they must be correct." No! Consistent means precise. Correct means ' +
      'accurate. You need BOTH. A systematic error (like a poorly calibrated ' +
      'balance) gives precise but inaccurate results. Random error (shaky hands) ' +
      'gives imprecise results but no systematic bias.',
    targetedMisconceptions: [`${MEAS}:MC1`],
    source: `${MEAS_SRC} — misconception: confusing accuracy with precision`,
  },
]

const MEAS_PROBES: SeedProbe[] = [
  {
    conceptId: MEAS,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A student measures the boiling point of water five times and gets: 102.1°C, 102.0°C, 102.1°C, 102.0°C, 102.1°C. The true value is 100.0°C. These measurements are:',
    choices: [
      { text: 'Precise but not accurate — tightly clustered but far from the true value', isCorrect: true },
      { text: 'Accurate but not precise — close to true value on average', isCorrect: false, misconceptionId: `${MEAS}:MC1` },
      { text: 'Both accurate and precise — consistent results are always correct', isCorrect: false, misconceptionId: `${MEAS}:MC1` },
    ],
    correctValue: 'Precise but not accurate',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MEAS}:MC1`],
    source: `${MEAS_SRC} — distractor targets "consistent = correct" misconception`,
  },
  {
    conceptId: MEAS,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Convert 0.025 kg to milligrams. Show your unit-cancellation steps.',
    choices: [
      { text: '25,000 mg (0.025 kg × 1000 g/kg × 1000 mg/g)', isCorrect: true },
      { text: '25 mg (just move the decimal three places)', isCorrect: false, misconceptionId: `${MEAS}:MC2` },
    ],
    correctValue: '25000 mg',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MEAS}:MC2`],
    source: `${MEAS_SRC} — misconception: treating prefix conversion as single ×1000 regardless of direction`,
  },
]

// ─── chem.atomic.atomic-theory ───────────────────────────────────────────────
const ATTHY = 'chem.atomic.atomic-theory'
const ATTHY_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.atomic-theory'

const ATTHY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ATTHY,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Chemistry\'s biggest idea came from a simple observation: when you ' +
      'react hydrogen with oxygen, it\'s ALWAYS 1g H₂ per 8g O₂. Never 1:7, ' +
      'never 1:9 — always 1:8. Dalton\'s explanation: matter is made of ' +
      'indivisible atoms, each element\'s atoms have a fixed mass, and compounds ' +
      'form in whole-number ratios. This explains the Law of Definite Proportions ' +
      '(water is always 11.1% H, 88.9% O by mass) and the Law of Multiple ' +
      'Proportions (CO vs CO₂: same elements, different fixed ratios). ' +
      'Dalton was wrong about atoms being indivisible — we now know they have ' +
      'substructure (electrons, protons, neutrons) — but his core insight that ' +
      'chemical combination happens in fixed whole-number ratios remains the ' +
      'foundation of stoichiometry. Every balanced equation you\'ll ever write ' +
      'traces back to this one idea: atoms combine in countable, fixed ratios.',
    targetedMisconceptions: [`${ATTHY}:MC1`],
    source: `${ATTHY_SRC} — Dalton's atomic theory, laws of chemical combination`,
  },
  {
    conceptId: ATTHY,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'A stubborn misconception: "Dalton proved atoms exist." He didn\'t — he ' +
      'proposed atoms as a MODEL that explained experimental mass ratios. Real ' +
      'proof came much later (Brownian motion, 1905; electron microscopy, 1930s). ' +
      'Dalton\'s model was also WRONG about atoms being "solid indivisible spheres" — ' +
      'Thomson found electrons (1897), Rutherford found the nucleus (1911), ' +
      'Bohr added energy levels (1913). Each model REPLACED the previous one ' +
      'when experiments showed it couldn\'t explain new data. This is how science ' +
      'works: models aren\'t "true," they\'re "useful until broken." Dalton\'s ' +
      'model is still useful for stoichiometry but breaks when you need to ' +
      'explain emission spectra or chemical bonding.',
    targetedMisconceptions: [`${ATTHY}:MC1`],
    source: `${ATTHY_SRC} — misconception: Dalton "proved" atoms exist / atomic models are sequential "truths"`,
  },
]

const ATTHY_PROBES: SeedProbe[] = [
  {
    conceptId: ATTHY,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Carbon forms two oxides: CO (where 12g C combines with 16g O) and CO₂ (where 12g C combines with 32g O). The ratio of oxygen masses combining with a fixed mass of carbon is 16:32 = 1:2. This illustrates:',
    choices: [
      { text: 'Law of Multiple Proportions — same elements combine in different simple whole-number ratios', isCorrect: true },
      { text: 'Law of Definite Proportions — a compound always has the same composition', isCorrect: false, misconceptionId: `${ATTHY}:MC2` },
      { text: 'Law of Conservation of Mass — mass is neither created nor destroyed', isCorrect: false },
    ],
    correctValue: 'Law of Multiple Proportions',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ATTHY}:MC2`],
    source: `${ATTHY_SRC} — distractor targets confusion between Definite and Multiple Proportions`,
  },
  {
    conceptId: ATTHY,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student claims: "Dalton\'s atomic theory is completely wrong because atoms are NOT indivisible." Do you agree?',
    choices: [
      { text: 'Partially — atoms ARE divisible (subatomic particles exist), but Dalton\'s core idea of fixed whole-number ratios in compounds is still valid and foundational to stoichiometry', isCorrect: true },
      { text: 'Completely agree — since atoms can be split, nothing Dalton said is useful anymore', isCorrect: false, misconceptionId: `${ATTHY}:MC1` },
    ],
    correctValue: 'Partially',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ATTHY}:MC1`],
    source: `${ATTHY_SRC} — misconception: one wrong postulate invalidates the entire model`,
  },
]

// ─── chem.found.significant-figures ──────────────────────────────────────────
const SIGFIG = 'chem.found.significant-figures'
const SIGFIG_SRC = 'docs/chemistry/kg/graph.json — chem.found.significant-figures'

const SIGFIG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SIGFIG,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Every measurement has a limit — your ruler can\'t measure to infinite ' +
      'decimal places. Significant figures tell you HOW MUCH of a number you ' +
      'actually measured vs. guessed. Rules: all non-zero digits count (234 = 3 ' +
      'sig figs). Zeros BETWEEN non-zeros count (204 = 3 sig figs). Leading ' +
      'zeros never count (0.003 = 1 sig fig — those zeros are just placeholders). ' +
      'Trailing zeros after a decimal count (2.30 = 3 sig figs — that last zero ' +
      'means "I measured to the hundredths place"). WHY care? Because when you ' +
      'multiply two measurements, your answer can\'t be more precise than your ' +
      'WORST measurement. If you measure length as 2.5 cm (2 sig figs) and width ' +
      'as 3.14 cm (3 sig figs), the area is 7.9 cm² — NOT 7.850, because your ' +
      'length was only good to 2 figures.',
    targetedMisconceptions: [`${SIGFIG}:MC1`],
    source: `${SIGFIG_SRC} — significant figures rules and propagation in calculations`,
  },
  {
    conceptId: SIGFIG,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The #1 sig-fig mistake: treating zeros AFTER a whole number as ' +
      'significant. Is 200 one sig fig, two, or three? The answer: YOU CAN\'T ' +
      'TELL without more context. That\'s exactly why scientific notation exists — ' +
      '2 × 10² (1 sig fig), 2.0 × 10² (2 sig figs), 2.00 × 10² (3 sig figs). ' +
      'In plain "200" the ambiguity is real. Second trap: in addition/subtraction, ' +
      'you round to the fewest DECIMAL PLACES (not sig figs!). 12.11 + 0.3 = 12.4 ' +
      '(one decimal place), not 12 (one sig fig). Different operations, different ' +
      'rules: multiply/divide → match fewest sig figs; add/subtract → match ' +
      'fewest decimal places.',
    targetedMisconceptions: [`${SIGFIG}:MC1`, `${SIGFIG}:MC2`],
    source: `${SIGFIG_SRC} — misconception: ambiguous trailing zeros; wrong rounding rule for addition`,
  },
]

const SIGFIG_PROBES: SeedProbe[] = [
  {
    conceptId: SIGFIG,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'How many significant figures are in 0.00470?',
    choices: [
      { text: '3 (the 4, 7, and trailing 0 after decimal count; leading zeros are placeholders)', isCorrect: true },
      { text: '5 (count all digits)', isCorrect: false, misconceptionId: `${SIGFIG}:MC1` },
      { text: '2 (only count non-zero digits)', isCorrect: false, misconceptionId: `${SIGFIG}:MC3` },
    ],
    correctValue: '3',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SIGFIG}:MC1`, `${SIGFIG}:MC3`],
    source: `${SIGFIG_SRC} — distractor targets "count all digits" and "only non-zeros" misconceptions`,
  },
  {
    conceptId: SIGFIG,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: '12.52 + 1.7 = ? (Express with correct significant figures.)',
    choices: [
      { text: '14.2 (addition: round to fewest decimal places, which is 1)', isCorrect: true },
      { text: '14 (round to 2 sig figs because 1.7 has only 2)', isCorrect: false, misconceptionId: `${SIGFIG}:MC2` },
    ],
    correctValue: '14.2',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SIGFIG}:MC2`],
    source: `${SIGFIG_SRC} — misconception: using sig-fig rule instead of decimal-places rule for addition`,
  },
]

// ─── chem.found.mole-concept ─────────────────────────────────────────────────
const MOLE = 'chem.found.mole-concept'
const MOLE_SRC = 'docs/chemistry/kg/graph.json — chem.found.mole-concept'

const MOLE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MOLE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Atoms are too small to count individually — even a speck of carbon has ' +
      'billions of billions of atoms. Chemists needed a COUNTING UNIT big enough ' +
      'to be practical, the way "dozen" counts eggs. That unit is the mole: ' +
      '6.022 × 10²³ particles (Avogadro\'s number). Why that specific number? ' +
      'Because it\'s chosen so that 1 mole of any element weighs exactly its ' +
      'atomic mass in grams. Carbon\'s atomic mass is 12 u → 1 mol of C atoms = ' +
      '12 grams. Oxygen is 16 u → 1 mol = 16 g. This connects the MICROSCOPIC ' +
      '(atomic mass units, too small to weigh) to the MACROSCOPIC (grams, what ' +
      'your lab balance reads). The mole is a BRIDGE: atoms on one side, grams ' +
      'on the other. Formula: moles = mass(g) / molar mass(g/mol). Every ' +
      'stoichiometry calculation starts here.',
    targetedMisconceptions: [`${MOLE}:MC1`],
    source: `${MOLE_SRC} — mole concept, Avogadro's number, molar mass bridge`,
  },
  {
    conceptId: MOLE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The biggest mole misconception: "One mole of any substance has the same ' +
      'MASS." Wrong — one mole always has the same NUMBER of particles (6.022 × 10²³), ' +
      'but different MASSES. 1 mol of H₂ = 2 g. 1 mol of O₂ = 32 g. Same count, ' +
      'wildly different mass — because oxygen atoms are 16× heavier than hydrogen atoms. ' +
      'Think of it like a dozen: a dozen ping-pong balls and a dozen bowling balls ' +
      'are both 12 objects, but they don\'t weigh the same. The mole counts PARTICLES, ' +
      'not grams. Another trap: confusing molar mass of an ATOM with molar mass of a ' +
      'MOLECULE. Oxygen atom (O) = 16 g/mol. Oxygen molecule (O₂) = 32 g/mol. Always ' +
      'check: am I counting atoms or molecules?',
    targetedMisconceptions: [`${MOLE}:MC1`, `${MOLE}:MC2`],
    source: `${MOLE_SRC} — misconception: "same moles = same mass" and atom vs molecule molar mass`,
  },
]

const MOLE_PROBES: SeedProbe[] = [
  {
    conceptId: MOLE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which contains more molecules: 2g of H₂ (molar mass 2 g/mol) or 32g of O₂ (molar mass 32 g/mol)?',
    choices: [
      { text: '2g of H₂ contains more — that\'s 1 mol (6.022×10²³ molecules) vs. 32g O₂ which is also 1 mol; they\'re EQUAL', isCorrect: true },
      { text: '32g of O₂ — it\'s heavier so it must contain more molecules', isCorrect: false, misconceptionId: `${MOLE}:MC1` },
      { text: '2g of H₂ — hydrogen is smaller so more fit in 2g', isCorrect: false, misconceptionId: `${MOLE}:MC3` },
    ],
    correctValue: 'They are equal (both 1 mol)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MOLE}:MC1`, `${MOLE}:MC3`],
    source: `${MOLE_SRC} — distractor targets "heavier = more molecules" misconception`,
  },
  {
    conceptId: MOLE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says: "18g of water and 18g of glucose contain the same number of molecules because they have the same mass." Is this correct?',
    choices: [
      { text: 'No — 18g water = 1 mol (molar mass 18), 18g glucose = 0.1 mol (molar mass 180). Same mass, very different number of molecules.', isCorrect: true },
      { text: 'Yes — same mass means same number of molecules for any substance', isCorrect: false, misconceptionId: `${MOLE}:MC1` },
    ],
    correctValue: 'No — different molar masses mean different moles',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MOLE}:MC1`],
    source: `${MOLE_SRC} — misconception: equal mass = equal moles regardless of substance`,
  },
]

// ─── chem.found.stoichiometry ────────────────────────────────────────────────
const STOICH = 'chem.found.stoichiometry'
const STOICH_SRC = 'docs/chemistry/kg/graph.json — chem.found.stoichiometry'

const STOICH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STOICH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Stoichiometry is the "recipe math" of chemistry. Just like a recipe says ' +
      '"2 eggs + 1 cup flour → 12 cookies," a balanced equation says ' +
      '"2H₂ + O₂ → 2H₂O" — meaning 2 molecules of hydrogen react with 1 molecule ' +
      'of oxygen to produce 2 molecules of water. Those coefficients are MOLE RATIOS. ' +
      'So if you start with 4 moles of H₂, you need 2 moles of O₂ and you\'ll get ' +
      '4 moles of H₂O. The method is always the same: (1) Balance the equation. ' +
      '(2) Convert what you HAVE to moles. (3) Use the mole ratio to find moles of ' +
      'what you WANT. (4) Convert moles to whatever unit the question asks. ' +
      'The limiting reagent is whichever runs out first — like running out of eggs ' +
      'before flour. Everything else is just this 4-step pattern applied to different ' +
      'situations.',
    targetedMisconceptions: [`${STOICH}:MC1`],
    source: `${STOICH_SRC} — stoichiometric method, mole ratios, limiting reagent`,
  },
  {
    conceptId: STOICH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The #1 stoichiometry mistake: comparing MASSES instead of MOLES to find ' +
      'the limiting reagent. If you have 10g of H₂ and 10g of O₂, students say ' +
      '"equal mass, so neither limits." Wrong! 10g H₂ = 5 mol. 10g O₂ = 0.3125 mol. ' +
      'The equation 2H₂ + O₂ → 2H₂O needs a 2:1 mole ratio. 5 mol H₂ would need ' +
      '2.5 mol O₂, but you only have 0.3125 mol O₂. Oxygen is the limiting reagent ' +
      'despite having equal mass! The rule: ALWAYS convert to moles first, then ' +
      'compare using the equation\'s mole ratio. Mass comparisons mean nothing because ' +
      'different substances have different molar masses. Another trap: using ' +
      'coefficients as MASS ratios — "2H₂ + O₂" does NOT mean "2g H₂ + 1g O₂."',
    targetedMisconceptions: [`${STOICH}:MC1`, `${STOICH}:MC2`],
    source: `${STOICH_SRC} — misconception: comparing masses directly; reading coefficients as mass ratios`,
  },
]

const STOICH_PROBES: SeedProbe[] = [
  {
    conceptId: STOICH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'For the reaction N₂ + 3H₂ → 2NH₃, if you start with 1 mol N₂ and 2 mol H₂, what is the limiting reagent?',
    choices: [
      { text: 'H₂ — you need 3 mol H₂ per mol N₂ but only have 2, so hydrogen runs out first', isCorrect: true },
      { text: 'N₂ — there\'s less of it (1 mol vs 2 mol)', isCorrect: false, misconceptionId: `${STOICH}:MC1` },
      { text: 'Neither — both will be completely consumed', isCorrect: false, misconceptionId: `${STOICH}:MC3` },
    ],
    correctValue: 'H₂',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${STOICH}:MC1`],
    source: `${STOICH_SRC} — distractor targets "less moles = limiting" without checking ratio`,
  },
  {
    conceptId: STOICH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In 2Mg + O₂ → 2MgO, a student says "the coefficient 2 means we need 2 grams of magnesium." What\'s wrong?',
    choices: [
      { text: 'Coefficients represent MOLES (or molecules), not grams — 2 means 2 moles of Mg (= 48.6g), not 2g', isCorrect: true },
      { text: 'Nothing wrong — coefficients directly give the mass in grams', isCorrect: false, misconceptionId: `${STOICH}:MC2` },
    ],
    correctValue: 'Coefficients represent moles, not grams',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${STOICH}:MC2`],
    source: `${STOICH_SRC} — misconception: reading coefficients as grams`,
  },
]

// ─── chem.found.concentration ────────────────────────────────────────────────
const CONC = 'chem.found.concentration'
const CONC_SRC = 'docs/chemistry/kg/graph.json — chem.found.concentration'

const CONC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONC,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Concentration answers one question: how much solute is dissolved in how ' +
      'much solution? The most common unit in chemistry is MOLARITY (M) = moles ' +
      'of solute per litre of SOLUTION (not solvent!). A 1M NaCl solution has ' +
      '1 mol of NaCl dissolved in enough water to make exactly 1 litre total. ' +
      'Other units exist for different purposes: molality (mol/kg solvent) doesn\'t ' +
      'change with temperature (volume does, mass doesn\'t); mole fraction ' +
      '(dimensionless) is useful for vapor pressure calculations; ppm/ppb for ' +
      'trace quantities. The practical skill: DILUTION. When you add water, the ' +
      'moles of solute don\'t change — only the volume increases. So M₁V₁ = M₂V₂. ' +
      'This formula works because "moles = M × V" and moles are conserved.',
    targetedMisconceptions: [`${CONC}:MC1`],
    source: `${CONC_SRC} — molarity, molality, mole fraction, dilution formula`,
  },
  {
    conceptId: CONC,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The classic concentration mistake: confusing "per litre of SOLUTION" with ' +
      '"per litre of SOLVENT." Molarity is moles per litre of FINAL SOLUTION ' +
      '(solute + solvent together). If you dissolve 58.5g NaCl in 1L of water, ' +
      'the total solution volume is MORE than 1L (the salt takes up space), so ' +
      'the molarity is LESS than 1M. To make exactly 1M, you dissolve the salt ' +
      'first, then add water UNTIL the total volume reaches 1L (using a volumetric ' +
      'flask). This also means molarity changes with temperature — liquids expand ' +
      'when heated, so the same moles in a larger volume = lower molarity. That\'s ' +
      'why molality (per kg solvent, mass doesn\'t expand) exists.',
    targetedMisconceptions: [`${CONC}:MC1`],
    source: `${CONC_SRC} — misconception: molarity denominator is solvent volume, not solution volume`,
  },
]

const CONC_PROBES: SeedProbe[] = [
  {
    conceptId: CONC,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'To prepare 500 mL of 0.2M NaOH, how many moles of NaOH do you need?',
    choices: [
      { text: '0.1 mol (M = mol/L, so mol = 0.2 × 0.5L = 0.1)', isCorrect: true },
      { text: '0.2 mol (0.2M means 0.2 moles regardless of volume)', isCorrect: false, misconceptionId: `${CONC}:MC2` },
      { text: '100 mol (0.2 × 500 = 100)', isCorrect: false, misconceptionId: `${CONC}:MC3` },
    ],
    correctValue: '0.1 mol',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CONC}:MC2`, `${CONC}:MC3`],
    source: `${CONC_SRC} — distractor targets "M = moles flat" and "forgot to convert mL to L"`,
  },
  {
    conceptId: CONC,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student dissolves 40g NaOH (molar mass 40) in 1 litre of water and says "this is exactly 1M." Is that correct?',
    choices: [
      { text: 'No — adding 40g of solid to 1L water makes the total volume MORE than 1L. The molarity is slightly less than 1M.', isCorrect: true },
      { text: 'Yes — 40g/40 g/mol = 1 mol in 1L = 1M', isCorrect: false, misconceptionId: `${CONC}:MC1` },
    ],
    correctValue: 'No — total volume exceeds 1L',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CONC}:MC1`],
    source: `${CONC_SRC} — misconception: treating solvent volume as solution volume`,
  },
]

// ─── Batch export ────────────────────────────────────────────────────────────

export const CHEMISTRY_EXPLANATIONS: SeedExplanation[] = [
  ...MATTER_EXPLANATIONS,
  ...STATES_EXPLANATIONS,
  ...PURE_EXPLANATIONS,
  ...MEAS_EXPLANATIONS,
  ...ATTHY_EXPLANATIONS,
  ...SIGFIG_EXPLANATIONS,
  ...MOLE_EXPLANATIONS,
  ...STOICH_EXPLANATIONS,
  ...CONC_EXPLANATIONS,
]

export const CHEMISTRY_PROBES: SeedProbe[] = [
  ...MATTER_PROBES,
  ...STATES_PROBES,
  ...PURE_PROBES,
  ...MEAS_PROBES,
  ...ATTHY_PROBES,
  ...SIGFIG_PROBES,
  ...MOLE_PROBES,
  ...STOICH_PROBES,
  ...CONC_PROBES,
]

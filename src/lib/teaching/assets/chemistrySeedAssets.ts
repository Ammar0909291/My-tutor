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

// ─── chem.atomic.subatomic-particles ─────────────────────────────────────────
const SUBAT = 'chem.atomic.subatomic-particles'
const SUBAT_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.subatomic-particles'

const SUBAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SUBAT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'An atom isn\'t a solid ball — it\'s mostly empty space with three players: ' +
      'PROTONS (positive, in the nucleus), NEUTRONS (neutral, in the nucleus), ' +
      'and ELECTRONS (negative, orbiting far away). Atomic number (Z) = number of ' +
      'protons = defines the element. Carbon is ALWAYS Z=6. Change the proton count, ' +
      'you change the element. Mass number (A) = protons + neutrons. Electrons don\'t ' +
      'count toward mass (they\'re ~1/1836 the mass of a proton). ISOTOPES are atoms ' +
      'of the same element (same Z) with different numbers of neutrons — Carbon-12 ' +
      'and Carbon-14 are both carbon (6 protons) but C-14 has 2 extra neutrons. ' +
      'Same chemistry, different mass. This matters because atomic masses on the ' +
      'periodic table are WEIGHTED AVERAGES of all naturally occurring isotopes.',
    targetedMisconceptions: [`${SUBAT}:MC1`],
    source: `${SUBAT_SRC} — proton/neutron/electron properties, Z, A, isotopes`,
  },
  {
    conceptId: SUBAT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Isotopes have different chemical properties because they have ' +
      'different masses." Wrong — chemical properties depend on ELECTRONS (and ' +
      'therefore on proton count, since neutral atoms have electrons = protons). ' +
      'Isotopes have the same number of electrons, same electron configuration, ' +
      'same chemistry. They differ only in PHYSICAL properties (mass, density, ' +
      'rate of diffusion) and nuclear properties (radioactivity). C-12 and C-14 ' +
      'form the same bonds, same molecules — C-14 just happens to be radioactive. ' +
      'Second trap: "The mass number on the periodic table is A." No — it\'s the ' +
      'weighted average atomic mass (like 35.45 for chlorine, a mix of Cl-35 and Cl-37).',
    targetedMisconceptions: [`${SUBAT}:MC1`, `${SUBAT}:MC2`],
    source: `${SUBAT_SRC} — misconception: isotopes differ chemically; periodic table shows mass number`,
  },
]

const SUBAT_PROBES: SeedProbe[] = [
  {
    conceptId: SUBAT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'An atom has 17 protons, 18 neutrons, and 17 electrons. Its atomic number and mass number are:',
    choices: [
      { text: 'Z = 17, A = 35 (Z = protons; A = protons + neutrons)', isCorrect: true },
      { text: 'Z = 17, A = 52 (A = protons + neutrons + electrons)', isCorrect: false, misconceptionId: `${SUBAT}:MC1` },
      { text: 'Z = 35, A = 17 (Z is the bigger number)', isCorrect: false, misconceptionId: `${SUBAT}:MC3` },
    ],
    correctValue: 'Z=17, A=35',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SUBAT}:MC1`],
    source: `${SUBAT_SRC} — distractor targets "electrons count toward mass number"`,
  },
  {
    conceptId: SUBAT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Deuterium (²H) and protium (¹H) are isotopes of hydrogen. A student says they react differently with oxygen. Is this correct?',
    choices: [
      { text: 'No — both form water (H₂O/D₂O) via the same chemistry; isotopes share electron configuration and therefore chemical behaviour', isCorrect: true },
      { text: 'Yes — different mass means different reactions', isCorrect: false, misconceptionId: `${SUBAT}:MC2` },
    ],
    correctValue: 'No — same chemistry',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SUBAT}:MC2`],
    source: `${SUBAT_SRC} — misconception: isotopes have different chemical properties`,
  },
]

// ─── chem.atomic.electromagnetic-radiation ───────────────────────────────────
const EMR = 'chem.atomic.electromagnetic-radiation'
const EMR_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.electromagnetic-radiation'

const EMR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EMR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Light is a wave — it has wavelength (λ, distance between crests) and ' +
      'frequency (ν, crests per second). They\'re linked: c = λν, where c is ' +
      'the speed of light (3×10⁸ m/s). Higher frequency means shorter wavelength ' +
      'and MORE energy. The electromagnetic spectrum is all frequencies: radio → ' +
      'microwave → infrared → VISIBLE → UV → X-ray → gamma. Chemistry cares ' +
      'because atoms absorb and emit light at SPECIFIC frequencies — that\'s how ' +
      'we know what\'s inside stars. The key equation: E = hν (Planck). Energy ' +
      'comes in packets (photons), each carrying energy proportional to frequency. ' +
      'This means violet light (high ν) carries more energy per photon than red ' +
      'light (low ν) — which is why UV burns skin but radio waves don\'t.',
    targetedMisconceptions: [`${EMR}:MC1`],
    source: `${EMR_SRC} — wave nature of light, c=λν, E=hν, EM spectrum`,
  },
  {
    conceptId: EMR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common mistake: "All electromagnetic radiation is visible light." No — ' +
      'visible light is a TINY slice of the EM spectrum (400-700 nm). Radio waves, ' +
      'microwaves, infrared, UV, X-rays, and gamma rays are all the SAME thing ' +
      '(oscillating electric and magnetic fields) at different frequencies. ' +
      'Another trap: "Higher wavelength = higher energy." OPPOSITE. Energy ∝ ' +
      'frequency, and frequency = c/λ. So SHORTER wavelength = HIGHER frequency = ' +
      'MORE energy. Gamma rays (short λ) are deadly. Radio waves (long λ) pass ' +
      'through you harmlessly. Always remember: λ and E are INVERSELY related.',
    targetedMisconceptions: [`${EMR}:MC1`, `${EMR}:MC2`],
    source: `${EMR_SRC} — misconception: longer wavelength = more energy; all EM is visible`,
  },
]

const EMR_PROBES: SeedProbe[] = [
  {
    conceptId: EMR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which photon carries MORE energy: one with λ = 200 nm or one with λ = 600 nm?',
    choices: [
      { text: '200 nm — shorter wavelength means higher frequency and therefore higher energy (E = hν = hc/λ)', isCorrect: true },
      { text: '600 nm — longer wavelength means more energy', isCorrect: false, misconceptionId: `${EMR}:MC1` },
      { text: 'Same energy — all photons carry the same energy regardless of wavelength', isCorrect: false, misconceptionId: `${EMR}:MC3` },
    ],
    correctValue: '200 nm',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EMR}:MC1`],
    source: `${EMR_SRC} — distractor targets "longer λ = more energy" misconception`,
  },
  {
    conceptId: EMR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Calculate the frequency of light with wavelength 500 nm. (c = 3×10⁸ m/s)',
    choices: [
      { text: '6×10¹⁴ Hz (ν = c/λ = 3×10⁸ / 500×10⁻⁹ = 6×10¹⁴)', isCorrect: true },
      { text: '6×10⁵ Hz (forgot to convert nm to m: 3×10⁸ / 500 = 6×10⁵)', isCorrect: false, misconceptionId: `${EMR}:MC4` },
    ],
    correctValue: '6×10¹⁴ Hz',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EMR}:MC4`],
    source: `${EMR_SRC} — misconception: forgetting nm→m conversion in c=λν`,
  },
]

// ─── chem.thermo.system ──────────────────────────────────────────────────────
const THSYS = 'chem.thermo.system'
const THSYS_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.system'

const THSYS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: THSYS,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Thermodynamics starts by drawing a boundary. The SYSTEM is whatever you\'re ' +
      'studying (the reaction in a beaker). Everything else is SURROUNDINGS. Three ' +
      'types: OPEN (exchanges matter AND energy — boiling pot without lid), CLOSED ' +
      '(energy but not matter — sealed flask you can heat), ISOLATED (neither — ' +
      'a perfect thermos). STATE FUNCTIONS depend only on WHERE you are, not how you ' +
      'got there — temperature, pressure, volume, internal energy (U), enthalpy (H), ' +
      'entropy (S). PATH FUNCTIONS depend on HOW — heat (q) and work (w). Think GPS ' +
      'vs. odometer: your GPS location is a state function (same position regardless ' +
      'of route); your odometer reading is a path function (depends on which roads ' +
      'you took). This distinction matters because ΔH for a reaction is the SAME ' +
      'regardless of intermediate steps (Hess\'s Law) — that\'s the power of state functions.',
    targetedMisconceptions: [`${THSYS}:MC1`],
    source: `${THSYS_SRC} — system types, state vs path functions, extensive vs intensive`,
  },
  {
    conceptId: THSYS,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Dangerous confusion: "Heat is a state function because temperature is." ' +
      'NO. Temperature IS a state function (depends only on current state). But ' +
      'HEAT (q) is a PATH function — the amount of heat transferred depends on ' +
      'HOW you carry out the process (constant pressure vs. constant volume gives ' +
      'different q values for the same initial→final state). The fix: if you can ' +
      'define it as "property of the system right now" → state function. If it ' +
      'only exists DURING a process (transfer, flow) → path function. Internal ' +
      'energy U is a state function; the q and w that change U are path functions. ' +
      'But their SUM (q + w = ΔU) is a state function — path functions can combine ' +
      'to give state function changes.',
    targetedMisconceptions: [`${THSYS}:MC1`],
    source: `${THSYS_SRC} — misconception: heat is a state function because temperature is`,
  },
]

const THSYS_PROBES: SeedProbe[] = [
  {
    conceptId: THSYS,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A sealed, perfectly insulated container with a gas inside is best described as:',
    choices: [
      { text: 'Isolated system — no exchange of matter or energy with surroundings', isCorrect: true },
      { text: 'Closed system — sealed means closed', isCorrect: false, misconceptionId: `${THSYS}:MC2` },
      { text: 'Open system — gas molecules move freely inside', isCorrect: false, misconceptionId: `${THSYS}:MC3` },
    ],
    correctValue: 'Isolated system',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${THSYS}:MC2`],
    source: `${THSYS_SRC} — distractor targets "sealed = closed" (ignoring insulation = no energy exchange)`,
  },
  {
    conceptId: THSYS,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is heat (q) a state function or a path function? Justify.',
    choices: [
      { text: 'Path function — the heat transferred depends on how the process is carried out (e.g., constant P vs constant V give different q)', isCorrect: true },
      { text: 'State function — it depends only on temperature, which is a state function', isCorrect: false, misconceptionId: `${THSYS}:MC1` },
    ],
    correctValue: 'Path function',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${THSYS}:MC1`],
    source: `${THSYS_SRC} — misconception: heat is a state function`,
  },
]

// ─── chem.state.kinetic-theory ───────────────────────────────────────────────
const KMT = 'chem.state.kinetic-theory'
const KMT_SRC = 'docs/chemistry/kg/graph.json — chem.state.kinetic-theory'

const KMT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KMT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The Kinetic Molecular Theory explains gas behavior from FIVE postulates: ' +
      '(1) Gas molecules are in constant random motion. (2) Volume of individual ' +
      'molecules is negligible compared to container volume. (3) No intermolecular ' +
      'forces (molecules don\'t attract/repel each other). (4) Collisions are ' +
      'perfectly elastic (no energy lost). (5) Average kinetic energy is ' +
      'proportional to absolute temperature: KE_avg = (3/2)kT. THIS is what ' +
      'temperature fundamentally IS — average kinetic energy. Gas pressure? ' +
      'That\'s molecules hitting the walls — more hits or harder hits = more ' +
      'pressure. Heat the gas → molecules move faster → hit walls harder → ' +
      'pressure increases. These postulates describe an IDEAL gas — real gases ' +
      'deviate when molecules are close (high P) or slow (low T).',
    targetedMisconceptions: [`${KMT}:MC1`],
    source: `${KMT_SRC} — KMT postulates, pressure as momentum transfer, T∝KE`,
  },
  {
    conceptId: KMT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Major trap: "All gas molecules at the same temperature move at the same ' +
      'speed." WRONG. Temperature determines AVERAGE KE, but individual molecules ' +
      'have a distribution of speeds (Maxwell-Boltzmann distribution). Some are ' +
      'fast, some slow, some in between. The distribution shifts right (faster ' +
      'average) as T increases but always has a spread. Also: same temperature ' +
      'means same average KE (½mv²), NOT same speed. Since KE = ½mv², lighter ' +
      'molecules move FASTER at the same temperature. H₂ molecules zoom at ~1700 m/s ' +
      'at room temperature; O₂ at only ~480 m/s. Same average KE, very different ' +
      'speeds — because mass differs.',
    targetedMisconceptions: [`${KMT}:MC1`, `${KMT}:MC2`],
    source: `${KMT_SRC} — misconception: same T = same speed; all molecules move identically`,
  },
]

const KMT_PROBES: SeedProbe[] = [
  {
    conceptId: KMT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'At the same temperature, which gas has molecules with higher average speed: H₂ (molar mass 2) or N₂ (molar mass 28)?',
    choices: [
      { text: 'H₂ — same average KE (= ½mv²) but lighter mass means higher speed', isCorrect: true },
      { text: 'N₂ — heavier molecules have more momentum so they move faster', isCorrect: false, misconceptionId: `${KMT}:MC2` },
      { text: 'Same speed — same temperature means same speed', isCorrect: false, misconceptionId: `${KMT}:MC1` },
    ],
    correctValue: 'H₂',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KMT}:MC1`, `${KMT}:MC2`],
    source: `${KMT_SRC} — distractor targets "same T = same speed" misconception`,
  },
  {
    conceptId: KMT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'According to KMT, what happens to gas pressure when you halve the container volume at constant temperature?',
    choices: [
      { text: 'Pressure doubles — same number of molecules hitting half the wall area means twice as many collisions per unit area', isCorrect: true },
      { text: 'Pressure stays the same — temperature didn\'t change so molecules hit just as hard', isCorrect: false, misconceptionId: `${KMT}:MC3` },
    ],
    correctValue: 'Pressure doubles',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${KMT}:MC3`],
    source: `${KMT_SRC} — misconception: pressure depends only on temperature, not volume`,
  },
]

// ─── chem.env.atmosphere ─────────────────────────────────────────────────────
const ATMO = 'chem.env.atmosphere'
const ATMO_SRC = 'docs/chemistry/kg/graph.json — chem.env.atmosphere'

const ATMO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ATMO,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Earth\'s atmosphere is a mixture (not a compound!) of gases: ~78% N₂, ' +
      '~21% O₂, ~0.9% Ar, ~0.04% CO₂, plus trace amounts of water vapor, ' +
      'neon, helium, methane. It\'s layered by temperature profile: TROPOSPHERE ' +
      '(0-12 km, where weather happens, T decreases with altitude), STRATOSPHERE ' +
      '(12-50 km, contains the ozone layer, T increases because O₃ absorbs UV), ' +
      'MESOSPHERE (T drops again), THERMOSPHERE (T rises due to direct solar ' +
      'absorption). The ozone layer (O₃) absorbs harmful UV-B/C radiation — ' +
      'without it, life on land would be impossible. The greenhouse effect is ' +
      'NATURAL and essential: CO₂, H₂O, CH₄ trap outgoing IR radiation, keeping ' +
      'Earth ~33°C warmer than it would be otherwise. The problem isn\'t the ' +
      'greenhouse effect — it\'s the ENHANCED effect from burning fossil fuels.',
    targetedMisconceptions: [`${ATMO}:MC1`],
    source: `${ATMO_SRC} — atmospheric composition, layers, ozone, greenhouse effect`,
  },
  {
    conceptId: ATMO,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two widespread misconceptions: (1) "The ozone hole causes global warming." ' +
      'No — they\'re separate problems. The ozone hole (caused by CFCs) lets more ' +
      'UV through. Global warming (caused by CO₂/CH₄) traps more IR heat. Different ' +
      'gases, different mechanisms, different parts of the spectrum. (2) "The ' +
      'greenhouse effect is bad." The NATURAL greenhouse effect is essential — without ' +
      'it Earth would average -18°C (frozen). The problem is the ENHANCED effect: ' +
      'humans adding extra CO₂ beyond what the carbon cycle can absorb, shifting the ' +
      'equilibrium temperature upward. The chemistry is simple: CO₂ absorbs specific ' +
      'IR wavelengths (its molecular bonds vibrate at those frequencies), re-emitting ' +
      'energy in all directions — some back toward Earth.',
    targetedMisconceptions: [`${ATMO}:MC1`, `${ATMO}:MC2`],
    source: `${ATMO_SRC} — misconception: ozone hole = global warming; greenhouse effect is inherently bad`,
  },
]

const ATMO_PROBES: SeedProbe[] = [
  {
    conceptId: ATMO,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does temperature INCREASE with altitude in the stratosphere?',
    choices: [
      { text: 'Ozone (O₃) absorbs UV radiation, converting it to heat', isCorrect: true },
      { text: 'It\'s closer to the sun so it gets more heat', isCorrect: false, misconceptionId: `${ATMO}:MC3` },
      { text: 'Hot air rises from the troposphere and accumulates there', isCorrect: false, misconceptionId: `${ATMO}:MC4` },
    ],
    correctValue: 'Ozone absorbs UV',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ATMO}:MC3`, `${ATMO}:MC4`],
    source: `${ATMO_SRC} — distractor targets "closer to sun = hotter" misconception`,
  },
  {
    conceptId: ATMO,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student claims: "If we could fix the ozone hole, it would solve global warming." Evaluate this claim.',
    choices: [
      { text: 'Incorrect — ozone depletion (UV problem, caused by CFCs) and global warming (IR trapping, caused by CO₂/CH₄) are separate phenomena with different causes and solutions', isCorrect: true },
      { text: 'Correct — the ozone hole lets in extra heat which causes warming', isCorrect: false, misconceptionId: `${ATMO}:MC1` },
    ],
    correctValue: 'Incorrect — separate problems',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ATMO}:MC1`],
    source: `${ATMO_SRC} — misconception: conflating ozone depletion with climate change`,
  },
]

// ─── chem.surface.colloids ───────────────────────────────────────────────────
const COLL = 'chem.surface.colloids'
const COLL_SRC = 'docs/chemistry/kg/graph.json — chem.surface.colloids'

const COLL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COLL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Between true solutions (particles < 1 nm, transparent, pass through filter ' +
      'paper) and suspensions (particles > 1000 nm, settle out, opaque) lies a ' +
      'middle ground: COLLOIDS (1-1000 nm). Milk, fog, smoke, jelly, paint — all ' +
      'colloids. They look uniform to the naked eye but reveal their particle ' +
      'nature through the TYNDALL EFFECT: shine a beam of light through milk and ' +
      'you SEE the beam (particles scatter light); do the same through salt water ' +
      'and you don\'t (too small to scatter). Colloids are classified by dispersed ' +
      'phase and medium: sol (solid in liquid), aerosol (liquid in gas), emulsion ' +
      '(liquid in liquid), foam (gas in liquid). LYOPHILIC colloids (starch, gum) ' +
      'love the solvent and form spontaneously; LYOPHOBIC (gold sol, sulfur sol) ' +
      'need special methods and are stabilized by surface charges.',
    targetedMisconceptions: [`${COLL}:MC1`],
    source: `${COLL_SRC} — colloidal state, Tyndall effect, types, lyophilic/lyophobic`,
  },
  {
    conceptId: COLL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Students often think: "If it looks uniform, it\'s a true solution." ' +
      'Wrong — colloids ALSO look uniform (homogeneous to the naked eye). ' +
      'The test isn\'t appearance — it\'s the TYNDALL EFFECT (light scattering) ' +
      'or filterability (colloids pass through filter paper but not a ' +
      'semi-permeable membrane; true solutions pass through both). Another ' +
      'misconception: "Brownian motion of colloidal particles is caused by ' +
      'the particles hitting each other." No — it\'s caused by SOLVENT molecules ' +
      '(much smaller) constantly bombarding the colloidal particles from all ' +
      'sides with unequal force. The randomness comes from the statistical ' +
      'imbalance of millions of solvent-molecule impacts.',
    targetedMisconceptions: [`${COLL}:MC1`, `${COLL}:MC2`],
    source: `${COLL_SRC} — misconception: uniform=solution; Brownian motion from particle-particle collisions`,
  },
]

const COLL_PROBES: SeedProbe[] = [
  {
    conceptId: COLL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which observation distinguishes a colloid from a true solution?',
    choices: [
      { text: 'A beam of light becomes visible when passed through a colloid (Tyndall effect) but not through a true solution', isCorrect: true },
      { text: 'A colloid looks cloudy while a true solution is transparent', isCorrect: false, misconceptionId: `${COLL}:MC1` },
      { text: 'A colloid settles on standing while a solution doesn\'t', isCorrect: false, misconceptionId: `${COLL}:MC3` },
    ],
    correctValue: 'Tyndall effect',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${COLL}:MC1`, `${COLL}:MC3`],
    source: `${COLL_SRC} — distractor targets "colloids look cloudy" and "colloids settle"`,
  },
  {
    conceptId: COLL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What causes the random zigzag motion (Brownian motion) of colloidal particles?',
    choices: [
      { text: 'Unequal bombardment by solvent molecules from all sides — the net force from millions of random hits causes erratic movement', isCorrect: true },
      { text: 'Colloidal particles colliding with each other as they move randomly', isCorrect: false, misconceptionId: `${COLL}:MC2` },
    ],
    correctValue: 'Solvent molecule bombardment',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COLL}:MC2`],
    source: `${COLL_SRC} — misconception: Brownian motion from inter-particle collisions`,
  },
]

// ─── chem.period.classification ──────────────────────────────────────────────
const PERCL = 'chem.period.classification'
const PERCL_SRC = 'docs/chemistry/kg/graph.json — chem.period.classification'

const PERCL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PERCL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Humans have known about elements since antiquity, but ORGANIZING them was ' +
      'the breakthrough. First came Döbereiner\'s TRIADS (1829): groups of three ' +
      'elements where the middle one\'s atomic mass ≈ average of the other two ' +
      '(Li-Na-K, Ca-Sr-Ba). Pattern spotted, but only worked for a few triads. ' +
      'Then Newlands\' OCTAVES (1866): elements arranged by mass repeat properties ' +
      'every 8th element (like musical notes). Worked up to calcium, then broke. ' +
      'Mendeleev (1869) cracked it: arrange by INCREASING ATOMIC MASS, and ' +
      'properties repeat PERIODICALLY. His genius: he left GAPS for undiscovered ' +
      'elements and predicted their properties (eka-silicon = germanium, eka-aluminium ' +
      '= gallium). When found, they matched almost perfectly — the periodic law was ' +
      'proven. Limitation: atomic mass ordering put some elements in the wrong group ' +
      '(Ar/K, Co/Ni). Fixed later by Moseley: the TRUE organizer is ATOMIC NUMBER, ' +
      'not mass.',
    targetedMisconceptions: [`${PERCL}:MC1`],
    source: `${PERCL_SRC} — triads, octaves, Mendeleev's table, predictions and limitations`,
  },
  {
    conceptId: PERCL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "Mendeleev arranged elements by atomic NUMBER." No — he used ' +
      'atomic MASS (the concept of atomic number didn\'t exist until Moseley, 1913). ' +
      'Mendeleev\'s table was organized by increasing mass with periodic property ' +
      'repetition as the guiding principle. He even REVERSED the mass order for ' +
      'tellurium/iodine to keep chemical properties aligned — a bold move that only ' +
      'made sense later when atomic number was discovered. The modern periodic law ' +
      '(Moseley) states: properties are periodic functions of ATOMIC NUMBER, not ' +
      'mass. This resolved all of Mendeleev\'s anomalies (Ar-18 before K-19 despite ' +
      'Ar being heavier; Co-27 before Ni-28 despite Co being heavier).',
    targetedMisconceptions: [`${PERCL}:MC1`],
    source: `${PERCL_SRC} — misconception: Mendeleev used atomic number (he used mass)`,
  },
]

const PERCL_PROBES: SeedProbe[] = [
  {
    conceptId: PERCL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What was the main limitation of Mendeleev\'s periodic table that led to the modern table?',
    choices: [
      { text: 'It was arranged by atomic mass, which placed some elements in wrong groups (e.g., Ar/K anomaly) — solved by using atomic number instead', isCorrect: true },
      { text: 'It had too many gaps and couldn\'t predict new elements', isCorrect: false, misconceptionId: `${PERCL}:MC2` },
      { text: 'It didn\'t include noble gases at all because they hadn\'t been discovered', isCorrect: false },
    ],
    correctValue: 'Atomic mass ordering caused misplacements',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PERCL}:MC2`],
    source: `${PERCL_SRC} — distractor targets "Mendeleev couldn't predict elements" (he predicted many correctly)`,
  },
  {
    conceptId: PERCL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says: "Mendeleev arranged elements by atomic number." Is this historically accurate?',
    choices: [
      { text: 'No — Mendeleev used atomic MASS (1869). Atomic number wasn\'t discovered until Moseley (1913). The modern table uses atomic number.', isCorrect: true },
      { text: 'Yes — Mendeleev was the first to use atomic number as the organizing principle', isCorrect: false, misconceptionId: `${PERCL}:MC1` },
    ],
    correctValue: 'No — he used atomic mass',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${PERCL}:MC1`],
    source: `${PERCL_SRC} — misconception: attributing atomic number organization to Mendeleev`,
  },
]

// ─── chem.atomic.atomic-spectra ──────────────────────────────────────────────
const SPEC = 'chem.atomic.atomic-spectra'
const SPEC_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.atomic-spectra'

const SPEC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SPEC,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Heat a gas until it glows and pass the light through a prism — you don\'t ' +
      'get a continuous rainbow. You get DISCRETE colored lines at specific ' +
      'wavelengths: a LINE SPECTRUM. Each element has its own unique fingerprint ' +
      'of lines (that\'s how we identify elements in stars). WHY discrete lines? ' +
      'Because electrons can only exist at specific ENERGY LEVELS. When an electron ' +
      'drops from a higher level to a lower one, it emits a photon with EXACTLY ' +
      'the energy difference: E_photon = E_high − E_low = hν. Different jumps give ' +
      'different frequencies (colors). For hydrogen: jumps to n=1 → Lyman series (UV), ' +
      'to n=2 → Balmer series (visible), to n=3 → Paschen series (IR). The Rydberg ' +
      'equation predicts every line: 1/λ = R(1/n₁² − 1/n₂²). Bohr explained this ' +
      'by quantizing angular momentum — electrons orbit only at specific radii.',
    targetedMisconceptions: [`${SPEC}:MC1`],
    source: `${SPEC_SRC} — emission/absorption spectra, hydrogen series, Rydberg equation`,
  },
  {
    conceptId: SPEC,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Electrons emit light while in an orbit." No — an electron in a ' +
      'stable orbit emits NOTHING. Emission happens only during a TRANSITION ' +
      'from higher to lower energy level. An electron sitting in n=3 is stable ' +
      'and silent; the photon is released in the instant it jumps to n=2 or n=1. ' +
      'This is crucial: atoms don\'t glow just because electrons are orbiting. ' +
      'They glow because something EXCITED the electrons first (heat, electricity), ' +
      'and now those electrons are falling back down. ABSORPTION is the reverse: ' +
      'a photon with exactly the right energy is absorbed, bumping the electron UP. ' +
      'Same lines, same frequencies — but dark lines on a bright background instead ' +
      'of bright lines on a dark background.',
    targetedMisconceptions: [`${SPEC}:MC1`],
    source: `${SPEC_SRC} — misconception: electrons emit while orbiting (they emit only during transitions)`,
  },
]

const SPEC_PROBES: SeedProbe[] = [
  {
    conceptId: SPEC,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'The Balmer series of hydrogen produces VISIBLE light. These lines correspond to electron transitions ending at:',
    choices: [
      { text: 'n = 2 (transitions from n=3,4,5... down to n=2 produce visible wavelengths)', isCorrect: true },
      { text: 'n = 1 (the lowest energy level produces visible light)', isCorrect: false, misconceptionId: `${SPEC}:MC2` },
      { text: 'n = 3 (the third shell is in the visible range)', isCorrect: false },
    ],
    correctValue: 'n = 2',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SPEC}:MC2`],
    source: `${SPEC_SRC} — distractor targets "n=1 = visible" (n=1 transitions are UV/Lyman)`,
  },
  {
    conceptId: SPEC,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says: "Hydrogen atoms constantly emit light because their electron is always orbiting the nucleus." What\'s wrong?',
    choices: [
      { text: 'Electrons in stable orbits emit NO radiation — light is emitted ONLY when an electron transitions from a higher to a lower energy level', isCorrect: true },
      { text: 'Nothing wrong — orbiting charges always emit electromagnetic radiation', isCorrect: false, misconceptionId: `${SPEC}:MC1` },
    ],
    correctValue: 'Stable orbits emit nothing',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SPEC}:MC1`],
    source: `${SPEC_SRC} — misconception: orbiting = radiating (classical vs Bohr model)`,
  },
]

// ─── chem.atomic.photoelectric-effect ────────────────────────────────────────
const PHOTO = 'chem.atomic.photoelectric-effect'
const PHOTO_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.photoelectric-effect'

const PHOTO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHOTO,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Shine UV light on a metal surface and electrons fly off. Classic wave theory ' +
      'says: brighter light = more energy = electrons should fly off faster. But ' +
      'experiments showed: (1) Below a threshold frequency (ν₀), NO electrons are ' +
      'ejected regardless of intensity. (2) Above ν₀, electrons are ejected ' +
      'INSTANTLY, even at very low intensity. (3) Increasing intensity increases ' +
      'the NUMBER of electrons, not their speed. Einstein\'s explanation: light is ' +
      'PARTICLES (photons), each carrying E = hν. One photon hits one electron. ' +
      'If hν < work function (φ), nothing happens — not enough energy in a single ' +
      'packet. If hν ≥ φ, the electron escapes with KE = hν − φ. More photons ' +
      '(brighter) = more electrons, not faster electrons. This proved light has ' +
      'PARTICLE nature alongside its wave nature — wave-particle duality.',
    targetedMisconceptions: [`${PHOTO}:MC1`],
    source: `${PHOTO_SRC} — photoelectric effect, Einstein's explanation, work function, de Broglie`,
  },
  {
    conceptId: PHOTO,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The intuition trap: "Brighter light should give electrons more energy ' +
      '(just like a brighter lamp makes a room hotter)." This ONLY works if ' +
      'light is a continuous wave. But light is quantized — each photon acts ' +
      'alone. A dim UV source (few photons, each high energy) ejects electrons; ' +
      'a blindingly bright red lamp (billions of photons, each too low-energy) ' +
      'ejects ZERO. It\'s like throwing balls at bottles: one bowling ball knocks ' +
      'a bottle over; a million ping-pong balls don\'t. Energy per particle matters, ' +
      'not total energy delivered. The frequency sets the energy per photon; ' +
      'intensity sets how many photons arrive. These are INDEPENDENT controls.',
    targetedMisconceptions: [`${PHOTO}:MC1`],
    source: `${PHOTO_SRC} — misconception: brighter light = more energetic electrons (intensity ≠ frequency)`,
  },
]

const PHOTO_PROBES: SeedProbe[] = [
  {
    conceptId: PHOTO,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A metal has a work function of 4.0 eV. You shine light of 3.5 eV photon energy on it. What happens?',
    choices: [
      { text: 'No electrons are ejected — each photon has less energy than the work function, regardless of how bright the light is', isCorrect: true },
      { text: 'Electrons are ejected slowly — they get some energy, just not much', isCorrect: false, misconceptionId: `${PHOTO}:MC1` },
      { text: 'If you make it bright enough, electrons will eventually be ejected', isCorrect: false, misconceptionId: `${PHOTO}:MC1` },
    ],
    correctValue: 'No electrons ejected',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHOTO}:MC1`],
    source: `${PHOTO_SRC} — distractor targets "intensity compensates for insufficient frequency"`,
  },
  {
    conceptId: PHOTO,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'If you double the INTENSITY of UV light above the threshold frequency, what changes about the ejected electrons?',
    choices: [
      { text: 'The NUMBER of ejected electrons doubles (more photons = more one-on-one ejection events), but each electron\'s KE stays the same', isCorrect: true },
      { text: 'Each electron is ejected with double the kinetic energy (more energy delivered to the surface)', isCorrect: false, misconceptionId: `${PHOTO}:MC1` },
    ],
    correctValue: 'Number doubles, KE unchanged',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHOTO}:MC1`],
    source: `${PHOTO_SRC} — misconception: intensity affects electron KE (it affects count only)`,
  },
]

// ─── chem.elect.conductance ──────────────────────────────────────────────────
const ELCOND = 'chem.elect.conductance'
const ELCOND_SRC = 'docs/chemistry/kg/graph.json — chem.elect.conductance'

const ELCOND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ELCOND,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Dissolve NaCl in water and it conducts electricity — ions are the charge ' +
      'carriers. CONDUCTANCE (G = 1/R) measures how easily current flows; ' +
      'CONDUCTIVITY (κ) removes the cell geometry: κ = G × (l/A) where l is ' +
      'electrode distance and A is area. But the key quantity in chemistry is ' +
      'MOLAR CONDUCTIVITY: Λ_m = κ/c (conductivity per mole of dissolved electrolyte). ' +
      'Why? Because diluting a solution changes κ (fewer ions per volume) but ' +
      'Λ_m tells you how well EACH mole conducts. For STRONG electrolytes (fully ' +
      'dissociated: NaCl, HCl), Λ_m increases slightly with dilution (less inter-ionic ' +
      'drag) and approaches a finite limit Λ°_m. For WEAK electrolytes (partially ' +
      'dissociated: CH₃COOH), Λ_m shoots up on dilution because dilution shifts ' +
      'equilibrium toward more dissociation — more ions per mole.',
    targetedMisconceptions: [`${ELCOND}:MC1`],
    source: `${ELCOND_SRC} — conductance, conductivity, molar conductivity, Kohlrausch`,
  },
  {
    conceptId: ELCOND,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Diluting any electrolyte increases its conductivity κ." WRONG for ' +
      'STRONG electrolytes: κ actually DECREASES on dilution because the number of ' +
      'ions per unit volume decreases even though each ion moves more freely. What ' +
      'INCREASES on dilution is MOLAR conductivity Λ_m (per-mole efficiency). ' +
      'For weak electrolytes, κ can go either way — more dissociation adds ions, ' +
      'but dilution removes them from a given volume. Don\'t confuse κ (per-volume ' +
      'quantity, depends on concentration) with Λ_m (per-mole quantity, increases ' +
      'for both strong and weak on dilution, but for different reasons). ' +
      'Kohlrausch\'s law: Λ°_m = ν₊λ°₊ + ν₋λ°₋ — at infinite dilution, each ion ' +
      'contributes independently regardless of its partner.',
    targetedMisconceptions: [`${ELCOND}:MC1`],
    source: `${ELCOND_SRC} — misconception: dilution always increases conductivity (κ vs Λ_m confusion)`,
  },
]

const ELCOND_PROBES: SeedProbe[] = [
  {
    conceptId: ELCOND,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'On diluting a strong electrolyte like KCl, what happens to its conductivity (κ) and molar conductivity (Λ_m)?',
    choices: [
      { text: 'κ decreases (fewer ions per unit volume) while Λ_m increases (less interionic drag per mole)', isCorrect: true },
      { text: 'Both κ and Λ_m increase (dilution always helps conductance)', isCorrect: false, misconceptionId: `${ELCOND}:MC1` },
      { text: 'Both decrease (less solute means less of everything)', isCorrect: false, misconceptionId: `${ELCOND}:MC2` },
    ],
    correctValue: 'κ decreases, Λ_m increases',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ELCOND}:MC1`, `${ELCOND}:MC2`],
    source: `${ELCOND_SRC} — distractor targets "dilution increases κ" and "both decrease" misconceptions`,
  },
  {
    conceptId: ELCOND,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does Λ_m for acetic acid (weak electrolyte) increase much more dramatically with dilution than for NaCl (strong electrolyte)?',
    choices: [
      { text: 'Dilution shifts the dissociation equilibrium rightward for weak electrolytes, creating MORE ions per mole — strong electrolytes are already fully dissociated so only interionic effects change', isCorrect: true },
      { text: 'Acetic acid molecules get further apart so they conduct better — NaCl ions are already separate', isCorrect: false, misconceptionId: `${ELCOND}:MC3` },
    ],
    correctValue: 'Equilibrium shift creates more ions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ELCOND}:MC3`],
    source: `${ELCOND_SRC} — misconception: molar conductivity increase is about spacing, not dissociation`,
  },
]

// ─── chem.thermo.first-law ───────────────────────────────────────────────────
const THFL = 'chem.thermo.first-law'
const THFL_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.first-law'

const THFL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: THFL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The First Law is conservation of energy in disguise: energy can\'t be ' +
      'created or destroyed, only converted. For a system: ΔU = q + w (IUPAC ' +
      'sign convention: q positive = heat IN, w positive = work done ON the ' +
      'system). The internal energy U is everything inside — kinetic + potential ' +
      'of all particles. At CONSTANT VOLUME: w = 0 (no expansion), so ΔU = q_v — ' +
      'heat measured in a bomb calorimeter IS ΔU directly. At CONSTANT PRESSURE ' +
      '(most real reactions — open beaker): the system does PΔV work pushing ' +
      'the atmosphere, so q_p = ΔU + PΔV = ΔH (enthalpy). That\'s why we use ' +
      'ΔH for reactions: it\'s the heat you MEASURE at constant pressure. ' +
      'The key formula connecting them: ΔH = ΔU + ΔnRT (where Δn = moles of ' +
      'gas products − moles of gas reactants).',
    targetedMisconceptions: [`${THFL}:MC1`],
    source: `${THFL_SRC} — first law, ΔU = q + w, PV work, ΔH = ΔU + ΔnRT`,
  },
  {
    conceptId: THFL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "ΔH and ΔU are always the same." They\'re only the same ' +
      'when Δn_gas = 0 (no net change in moles of gas). If a reaction PRODUCES ' +
      'gas (Δn > 0), the system does PΔV work pushing the atmosphere, so ' +
      'ΔH > ΔU — some internal energy went into expansion work instead of heat. ' +
      'If gases are consumed (Δn < 0), surroundings do work ON the system, ' +
      'so ΔH < ΔU. Example: C(s) + O₂(g) → CO₂(g), Δn = 0, so ΔH ≈ ΔU. ' +
      'But 2C(s) + O₂(g) → 2CO(g), Δn = +1, so ΔH = ΔU + RT ≈ ΔU + 2.5 kJ. ' +
      'The sign convention trap: in IUPAC, w = +PΔV for work done ON system ' +
      '(compression); some textbooks use w = −PΔV (work done BY system). ' +
      'Check which convention before plugging in numbers.',
    targetedMisconceptions: [`${THFL}:MC1`, `${THFL}:MC2`],
    source: `${THFL_SRC} — misconception: ΔH = ΔU always; sign convention confusion`,
  },
]

const THFL_PROBES: SeedProbe[] = [
  {
    conceptId: THFL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'For the reaction N₂(g) + 3H₂(g) → 2NH₃(g), Δn_gas = 2 − 4 = −2. Which is true?',
    choices: [
      { text: 'ΔH < ΔU — moles of gas decrease, so ΔnRT is negative and ΔH = ΔU + (−2)RT', isCorrect: true },
      { text: 'ΔH > ΔU — the reaction produces something so enthalpy must be larger', isCorrect: false, misconceptionId: `${THFL}:MC1` },
      { text: 'ΔH = ΔU — they\'re always equal for gas-phase reactions', isCorrect: false, misconceptionId: `${THFL}:MC1` },
    ],
    correctValue: 'ΔH < ΔU',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${THFL}:MC1`],
    source: `${THFL_SRC} — distractor targets "ΔH = ΔU always" misconception`,
  },
  {
    conceptId: THFL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In a bomb calorimeter (constant volume), you measure the heat released as 400 kJ. Is this ΔH or ΔU?',
    choices: [
      { text: 'ΔU — at constant volume, no PV work is done, so q_v = ΔU directly', isCorrect: true },
      { text: 'ΔH — heat measured in any calorimeter is always ΔH', isCorrect: false, misconceptionId: `${THFL}:MC2` },
    ],
    correctValue: 'ΔU',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${THFL}:MC2`],
    source: `${THFL_SRC} — misconception: calorimetric heat is always ΔH (only true at constant P)`,
  },
]

// ─── chem.state.gas-laws ─────────────────────────────────────────────────────
const GASL = 'chem.state.gas-laws'
const GASL_SRC = 'docs/chemistry/kg/graph.json — chem.state.gas-laws'

const GASL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GASL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Gas behavior boils down to four variables: P, V, n, T. The gas laws ' +
      'describe what happens when you fix some and change others. BOYLE: fix T ' +
      'and n → PV = constant (squeeze the gas, pressure rises). CHARLES: fix P ' +
      'and n → V/T = constant (heat the gas, it expands). GAY-LUSSAC: fix V ' +
      'and n → P/T = constant (heat a rigid container, pressure rises). ' +
      'AVOGADRO: fix T and P → V/n = constant (more moles, more volume). ' +
      'Combine them all: PV = nRT (ideal gas equation). R = 8.314 J/(mol·K) = ' +
      '0.0821 L·atm/(mol·K). T must ALWAYS be in Kelvin (K = °C + 273.15). ' +
      'This equation predicts any one variable if you know the other three. ' +
      'It fails at high P (molecules have volume) and low T (intermolecular ' +
      'forces matter) — that\'s where van der Waals corrections come in.',
    targetedMisconceptions: [`${GASL}:MC1`],
    source: `${GASL_SRC} — Boyle, Charles, Gay-Lussac, Avogadro, PV=nRT`,
  },
  {
    conceptId: GASL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The deadliest gas-law mistake: using CELSIUS in PV = nRT. The ideal gas ' +
      'law requires ABSOLUTE temperature (Kelvin). Why? Because Charles\'s Law ' +
      'says V ∝ T — at 0°C volume would be zero, which is physically impossible. ' +
      'The correct zero is 0 K (−273.15°C), where molecular motion stops and ' +
      'volume would truly reach zero for an ideal gas. If you use °C, you get ' +
      'absurd results (negative volumes, wrong pressures). Always convert first: ' +
      'T(K) = T(°C) + 273.15. Second trap: STP has changed! Old STP: 0°C, 1 atm, ' +
      'molar volume 22.4 L. IUPAC STP: 0°C, 1 bar (not 1 atm), molar volume ' +
      '22.7 L. Check which your textbook uses before quoting 22.4 L.',
    targetedMisconceptions: [`${GASL}:MC1`, `${GASL}:MC2`],
    source: `${GASL_SRC} — misconception: using °C in PV=nRT; outdated STP values`,
  },
]

const GASL_PROBES: SeedProbe[] = [
  {
    conceptId: GASL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A gas occupies 10 L at 27°C and 1 atm. What volume does it occupy at 127°C and 1 atm?',
    choices: [
      { text: '13.3 L — V₁/T₁ = V₂/T₂ → 10/300 = V₂/400 → V₂ = 13.3 L (must use Kelvin)', isCorrect: true },
      { text: '47 L — V₁/T₁ = V₂/T₂ → 10/27 = V₂/127 → V₂ = 47 L (used °C directly)', isCorrect: false, misconceptionId: `${GASL}:MC1` },
      { text: '5 L — doubled temperature halves the volume at constant pressure', isCorrect: false, misconceptionId: `${GASL}:MC3` },
    ],
    correctValue: '13.3 L',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GASL}:MC1`, `${GASL}:MC3`],
    source: `${GASL_SRC} — distractor targets "using °C" and "T doubles so V halves" misconceptions`,
  },
  {
    conceptId: GASL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why can\'t we use Celsius temperature directly in PV = nRT?',
    choices: [
      { text: 'Because gas volume is proportional to ABSOLUTE temperature — at 0°C gases still have significant volume; only at 0 K would ideal gas volume reach zero', isCorrect: true },
      { text: 'It\'s just a convention — you could use °C if you changed the value of R', isCorrect: false, misconceptionId: `${GASL}:MC1` },
    ],
    correctValue: 'V ∝ T requires absolute scale',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${GASL}:MC1`],
    source: `${GASL_SRC} — misconception: Celsius works if you adjust R`,
  },
]

// ─── chem.atomic.bohr-model ──────────────────────────────────────────────────
const BOHR = 'chem.atomic.bohr-model'
const BOHR_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.bohr-model'

const BOHR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BOHR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Bohr took Rutherford\'s nuclear atom and added ONE rule: electrons can only ' +
      'orbit at specific ALLOWED radii where angular momentum = n(h/2π). This single ' +
      'quantization condition gives: (1) Energy levels: E_n = −13.6/n² eV (for H). ' +
      'n=1 is most stable (ground state); energy INCREASES (becomes less negative) ' +
      'as n increases. (2) Radii: r_n = 0.529 × n² Å — orbits get MUCH bigger at ' +
      'higher n. (3) Spectrum explained: electron jumping from n=3→2 releases ' +
      'ΔE = 13.6(1/4 − 1/9) = 1.89 eV → red light (656 nm, Hα line). Every spectral ' +
      'line is a specific n₂→n₁ transition. LIMITATIONS: works perfectly for H (one ' +
      'electron), but fails for multi-electron atoms (can\'t explain splitting of lines, ' +
      'Zeeman effect, or chemical bonding). Replaced by quantum mechanics, but the ' +
      'energy-level picture remains conceptually useful.',
    targetedMisconceptions: [`${BOHR}:MC1`],
    source: `${BOHR_SRC} — Bohr postulates, energy levels, radii, limitations`,
  },
  {
    conceptId: BOHR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Dangerous half-truth: "Electrons orbit like planets." Bohr used circular ' +
      'orbits as a MODEL, but electrons don\'t have definite paths — quantum ' +
      'mechanics shows they exist as probability clouds (orbitals, not orbits). ' +
      'Bohr\'s model works for ENERGY predictions in hydrogen but fails on ' +
      'everything else. Another trap: "n=1 has the most energy because it\'s ' +
      'closest to the nucleus." OPPOSITE — n=1 is the LOWEST energy (most ' +
      'negative: −13.6 eV). Being close to the nucleus means MORE tightly bound, ' +
      'which means you\'d need MORE energy to remove the electron. Lower n = lower ' +
      'energy = more stable. Think of it as a deeper well: ground floor is the ' +
      'lowest energy, not the highest.',
    targetedMisconceptions: [`${BOHR}:MC1`, `${BOHR}:MC2`],
    source: `${BOHR_SRC} — misconception: electrons orbit like planets; n=1 has most energy`,
  },
]

const BOHR_PROBES: SeedProbe[] = [
  {
    conceptId: BOHR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In the hydrogen atom, which energy level has the MOST negative (lowest) energy?',
    choices: [
      { text: 'n = 1 (E₁ = −13.6 eV — closest to nucleus, most tightly bound)', isCorrect: true },
      { text: 'n = ∞ (furthest from nucleus means lowest energy)', isCorrect: false, misconceptionId: `${BOHR}:MC2` },
      { text: 'n = 1 has the highest energy because it\'s closest to the positive nucleus', isCorrect: false, misconceptionId: `${BOHR}:MC2` },
    ],
    correctValue: 'n = 1',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${BOHR}:MC2`],
    source: `${BOHR_SRC} — distractor targets "close to nucleus = high energy" misconception`,
  },
  {
    conceptId: BOHR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does the Bohr model fail for helium (2 electrons) while working perfectly for hydrogen (1 electron)?',
    choices: [
      { text: 'Bohr\'s model cannot account for electron-electron repulsion — with 2+ electrons, interelectronic forces make the problem unsolvable with simple circular orbits', isCorrect: true },
      { text: 'Helium\'s nucleus is too heavy for the Bohr equations to work', isCorrect: false, misconceptionId: `${BOHR}:MC3` },
    ],
    correctValue: 'Electron-electron repulsion',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BOHR}:MC3`],
    source: `${BOHR_SRC} — misconception: Bohr fails due to nuclear mass (it fails due to multi-electron interactions)`,
  },
]

// ─── chem.kinet.rate ─────────────────────────────────────────────────────────
const RATE = 'chem.kinet.rate'
const RATE_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.rate'

const RATE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RATE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Thermodynamics tells you IF a reaction can happen; KINETICS tells you HOW ' +
      'FAST. Rate = change in concentration per unit time. For A → B: rate = ' +
      '−Δ[A]/Δt = +Δ[B]/Δt (negative for reactant because it\'s decreasing). ' +
      'Average rate is over an interval; INSTANTANEOUS rate is the slope of the ' +
      'concentration-vs-time curve at one point (the derivative). Five factors ' +
      'affect rate: (1) Concentration — more molecules, more collisions. ' +
      '(2) Temperature — faster molecules, more energetic collisions. ' +
      '(3) Surface area — more exposed surface, more contact. (4) Catalyst — ' +
      'provides an alternative pathway with lower activation energy. ' +
      '(5) Nature of reactants — ionic reactions in solution are often instantaneous; ' +
      'covalent bond-breaking reactions are slower. For stoichiometry like ' +
      '2A + B → 3C: rate = −(1/2)Δ[A]/Δt = −Δ[B]/Δt = +(1/3)Δ[C]/Δt.',
    targetedMisconceptions: [`${RATE}:MC1`],
    source: `${RATE_SRC} — average/instantaneous rate, factors affecting rate`,
  },
  {
    conceptId: RATE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Two major traps: (1) "Rate of disappearance of A equals rate of appearance ' +
      'of B." Only true if the stoichiometric coefficients are equal! For ' +
      '2A → B, A disappears TWICE as fast as B appears. You must divide by the ' +
      'coefficient: rate = −(1/2)d[A]/dt = d[B]/dt. (2) "Doubling concentration ' +
      'always doubles the rate." Only true for FIRST-ORDER reactions. For second ' +
      'order (rate ∝ [A]²), doubling [A] QUADRUPLES the rate. For zero order, ' +
      'doubling [A] has NO effect. You can\'t know the order from the balanced ' +
      'equation — it must be determined EXPERIMENTALLY. The stoichiometric ' +
      'coefficients do NOT tell you the rate law.',
    targetedMisconceptions: [`${RATE}:MC1`, `${RATE}:MC2`],
    source: `${RATE_SRC} — misconception: rate equals for all species; coefficients = order`,
  },
]

const RATE_PROBES: SeedProbe[] = [
  {
    conceptId: RATE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'For the reaction 2NO₂ → 2NO + O₂, if d[O₂]/dt = 0.05 M/s, what is −d[NO₂]/dt?',
    choices: [
      { text: '0.10 M/s — O₂ appears at 1/1 coefficient rate, NO₂ disappears at 2/1 = twice that rate', isCorrect: true },
      { text: '0.05 M/s — rate is the same for all species in a reaction', isCorrect: false, misconceptionId: `${RATE}:MC1` },
      { text: '0.025 M/s — NO₂ has coefficient 2 so divide by 2', isCorrect: false, misconceptionId: `${RATE}:MC3` },
    ],
    correctValue: '0.10 M/s',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RATE}:MC1`, `${RATE}:MC3`],
    source: `${RATE_SRC} — distractor targets "all species change at same rate" misconception`,
  },
  {
    conceptId: RATE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student looks at the reaction 2A + B → C and says "the reaction is second order in A and first order in B because the coefficients are 2 and 1." Is this correct?',
    choices: [
      { text: 'No — reaction order must be determined experimentally, not from stoichiometric coefficients. The balanced equation shows overall mole ratios, not the rate law.', isCorrect: true },
      { text: 'Yes — stoichiometric coefficients directly give the reaction order', isCorrect: false, misconceptionId: `${RATE}:MC2` },
    ],
    correctValue: 'No — order is experimental',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RATE}:MC2`],
    source: `${RATE_SRC} — misconception: coefficients = reaction order`,
  },
]

// ─── chem.sol.types ──────────────────────────────────────────────────────────
const SOLT = 'chem.sol.types'
const SOLT_SRC = 'docs/chemistry/kg/graph.json — chem.sol.types'

const SOLT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SOLT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A solution is a homogeneous mixture at the molecular level. The component ' +
      'present in larger amount is the SOLVENT; the one dissolved is the SOLUTE. ' +
      'Solutions aren\'t limited to liquids: air is a gas-in-gas solution, soda ' +
      'water is gas-in-liquid, brass is solid-in-solid. WHY does something dissolve? ' +
      '"Like dissolves like" — polar solvents (water) dissolve polar/ionic solutes ' +
      '(NaCl, sugar); nonpolar solvents (hexane) dissolve nonpolar solutes (oil, ' +
      'grease). The thermodynamic reason: dissolution happens when the energy ' +
      'released by solute-solvent interactions (solvation) compensates for the ' +
      'energy needed to break solute-solute and solvent-solvent interactions. ' +
      'IDEAL solutions follow Raoult\'s Law perfectly (P_A = x_A · P°_A); real ' +
      'solutions deviate positively (weaker interactions → higher vapor pressure) ' +
      'or negatively (stronger interactions → lower VP, like HCl+H₂O).',
    targetedMisconceptions: [`${SOLT}:MC1`],
    source: `${SOLT_SRC} — solution types, like-dissolves-like, ideal vs non-ideal`,
  },
  {
    conceptId: SOLT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "Dissolving is a chemical reaction." For ionic/molecular ' +
      'solutes in water: dissolving is usually PHYSICAL. NaCl dissociates into ' +
      'Na⁺ and Cl⁻ ions (no new bonds formed — the ionic crystal just separates ' +
      'and gets hydrated). Sugar molecules separate and get surrounded by water ' +
      '(hydrogen bonding, no covalent change). You can get them back by evaporation. ' +
      'Exception: some "dissolving" IS reactive (HCl in water → H₃O⁺ + Cl⁻ involves ' +
      'proton transfer — a chemical change). The test: can you recover the original ' +
      'substance by physical means? Yes → physical dissolution. No → chemical reaction. ' +
      'Another trap: "Solutions are always liquids." Wrong — alloys (solid solutions), ' +
      'air (gaseous solution), and even hydrogen dissolved in palladium (gas in solid) ' +
      'are all solutions.',
    targetedMisconceptions: [`${SOLT}:MC1`, `${SOLT}:MC2`],
    source: `${SOLT_SRC} — misconception: dissolving = chemical reaction; solutions = liquids only`,
  },
]

const SOLT_PROBES: SeedProbe[] = [
  {
    conceptId: SOLT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Oil does not dissolve in water but dissolves readily in hexane. This is best explained by:',
    choices: [
      { text: '"Like dissolves like" — oil and hexane are both nonpolar, so their intermolecular forces are compatible', isCorrect: true },
      { text: 'Hexane reacts with oil to form a new compound that is soluble', isCorrect: false, misconceptionId: `${SOLT}:MC1` },
      { text: 'Hexane is a stronger solvent than water', isCorrect: false, misconceptionId: `${SOLT}:MC3` },
    ],
    correctValue: 'Like dissolves like',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SOLT}:MC1`, `${SOLT}:MC3`],
    source: `${SOLT_SRC} — distractor targets "dissolving = reaction" and "stronger solvent" misconceptions`,
  },
  {
    conceptId: SOLT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A solution shows a vapor pressure LOWER than predicted by Raoult\'s Law. What does this indicate about solute-solvent interactions?',
    choices: [
      { text: 'Solute-solvent interactions are STRONGER than solute-solute and solvent-solvent — molecules escape less readily (negative deviation)', isCorrect: true },
      { text: 'Solute-solvent interactions are weaker — molecules are held less tightly in solution', isCorrect: false, misconceptionId: `${SOLT}:MC4` },
    ],
    correctValue: 'Stronger interactions (negative deviation)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SOLT}:MC4`],
    source: `${SOLT_SRC} — misconception: lower VP = weaker interactions (opposite is true)`,
  },
]

// ─── chem.thermo.enthalpy ────────────────────────────────────────────────────
const ENTH = 'chem.thermo.enthalpy'
const ENTH_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.enthalpy'

const ENTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENTH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Enthalpy (H) is the heat content at constant pressure. ΔH < 0 → EXOTHERMIC ' +
      '(releases heat — combustion, neutralization). ΔH > 0 → ENDOTHERMIC (absorbs ' +
      'heat — dissolving NH₄NO₃, photosynthesis). Standard enthalpy of formation ' +
      '(ΔH°_f) is the enthalpy change when 1 mole of a compound forms from its ' +
      'elements in their standard states. By definition, ΔH°_f of any element in ' +
      'its standard state = 0. HESS\'S LAW: since H is a state function, ΔH for a ' +
      'reaction is the SAME regardless of path. So: ΔH°_rxn = Σ ΔH°_f(products) − ' +
      'Σ ΔH°_f(reactants). This is incredibly powerful — you can calculate ΔH for ' +
      'reactions you\'ve never measured, just from tabulated formation enthalpies. ' +
      'Alternatively: ΔH ≈ Σ(bonds broken) − Σ(bonds formed) — breaking bonds ' +
      'costs energy, forming bonds releases it.',
    targetedMisconceptions: [`${ENTH}:MC1`],
    source: `${ENTH_SRC} — enthalpy, Hess's law, ΔH°f, bond energy method`,
  },
  {
    conceptId: ENTH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The bond-energy trap: "Breaking bonds releases energy." WRONG — breaking ' +
      'bonds ALWAYS requires energy input (endothermic). Forming bonds ALWAYS ' +
      'releases energy (exothermic). A reaction is exothermic overall when the ' +
      'energy released by forming new bonds EXCEEDS the energy needed to break ' +
      'old ones. Students confuse this because explosions "break things apart," ' +
      'but the energy in an explosion comes from the NEW bonds formed in the ' +
      'products (CO₂, H₂O) being much stronger than the old bonds broken in the ' +
      'fuel. Another trap: "Exothermic reactions are spontaneous and endothermic ' +
      'are not." False — spontaneity depends on ΔG (= ΔH − TΔS), not ΔH alone. ' +
      'Melting ice is endothermic but spontaneous above 0°C (entropy drives it).',
    targetedMisconceptions: [`${ENTH}:MC1`, `${ENTH}:MC2`],
    source: `${ENTH_SRC} — misconception: breaking bonds releases energy; exothermic = spontaneous`,
  },
]

const ENTH_PROBES: SeedProbe[] = [
  {
    conceptId: ENTH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In the reaction H₂(g) + ½O₂(g) → H₂O(l), we break H-H and O=O bonds and form O-H bonds. The reaction is exothermic because:',
    choices: [
      { text: 'Energy released by forming 2 O-H bonds exceeds energy needed to break 1 H-H and ½ O=O bonds', isCorrect: true },
      { text: 'Breaking the H-H bond releases energy which powers the reaction', isCorrect: false, misconceptionId: `${ENTH}:MC1` },
      { text: 'All combustion reactions are exothermic by definition regardless of bond energies', isCorrect: false },
    ],
    correctValue: 'Forming bonds releases more than breaking costs',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENTH}:MC1`],
    source: `${ENTH_SRC} — distractor targets "breaking bonds releases energy" misconception`,
  },
  {
    conceptId: ENTH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Given: ΔH°f[CO₂(g)] = −393 kJ/mol, ΔH°f[H₂O(l)] = −286 kJ/mol, ΔH°f[C₂H₆(g)] = −85 kJ/mol. Calculate ΔH° for C₂H₆ + 7/2 O₂ → 2CO₂ + 3H₂O.',
    choices: [
      { text: '−1559 kJ/mol: [2(−393) + 3(−286)] − [(−85) + 0] = −786 − 858 + 85 = −1559', isCorrect: true },
      { text: '−1644 kJ/mol: forgot that ΔH°f of reactant is subtracted, not added', isCorrect: false, misconceptionId: `${ENTH}:MC3` },
    ],
    correctValue: '−1559 kJ/mol',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENTH}:MC3`],
    source: `${ENTH_SRC} — misconception: adding all ΔH°f without proper products-minus-reactants formula`,
  },
]

// ─── chem.thermo.entropy ─────────────────────────────────────────────────────
const ENTR = 'chem.thermo.entropy'
const ENTR_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.entropy'

const ENTR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENTR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Entropy (S) measures the NUMBER OF WAYS particles can be arranged — more ' +
      'ways = higher entropy. Gas > liquid > solid (gas molecules can be anywhere ' +
      'in the container; solid molecules are locked in place). The Second Law: the ' +
      'total entropy of the universe ALWAYS increases for a spontaneous process. ' +
      'A reaction can decrease the system\'s entropy IF the surroundings\' entropy ' +
      'increases by more (heat released warms the surroundings, giving their ' +
      'molecules more arrangements). ΔS°_rxn = Σ S°(products) − Σ S°(reactants). ' +
      'Key patterns: more moles of gas → higher S; dissolution → higher S; higher ' +
      'temperature → higher S; larger/more complex molecules → higher S. ' +
      'Entropy is NOT "disorder" in the colloquial sense — it\'s a precise ' +
      'statistical mechanical quantity: S = k_B ln(W), where W is the number ' +
      'of microstates.',
    targetedMisconceptions: [`${ENTR}:MC1`],
    source: `${ENTR_SRC} — entropy, second law, standard entropy, spontaneity`,
  },
  {
    conceptId: ENTR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Biggest entropy misconception: "The Second Law says everything tends toward ' +
      'disorder, so life and crystals violate it." Wrong on two counts: (1) The ' +
      'Second Law applies to the UNIVERSE (system + surroundings), not the system ' +
      'alone. Living things maintain low internal entropy by EXPORTING entropy to ' +
      'surroundings (heat, CO₂). (2) "Disorder" is a misleading translation of ' +
      'entropy — what actually increases is the number of MICROSTATES. A crystal ' +
      'forming from solution decreases system entropy but releases heat (exothermic), ' +
      'increasing surroundings\' entropy by more. The universe\'s total entropy still ' +
      'increases. Never judge spontaneity by system entropy alone — you need ΔS_universe ' +
      'or equivalently ΔG = ΔH − TΔS (which packages both system and surroundings).',
    targetedMisconceptions: [`${ENTR}:MC1`, `${ENTR}:MC2`],
    source: `${ENTR_SRC} — misconception: 2nd law applies to system alone; life violates it`,
  },
]

const ENTR_PROBES: SeedProbe[] = [
  {
    conceptId: ENTR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which process has the LARGEST positive ΔS?',
    choices: [
      { text: 'CaCO₃(s) → CaO(s) + CO₂(g) — a solid produces a gas (large entropy increase)', isCorrect: true },
      { text: 'H₂O(l) → H₂O(s) — freezing increases order so must increase entropy', isCorrect: false, misconceptionId: `${ENTR}:MC1` },
      { text: 'N₂(g) + 3H₂(g) → 2NH₃(g) — moles of gas decrease (4→2) so ΔS < 0', isCorrect: false },
    ],
    correctValue: 'CaCO₃ decomposition (gas produced)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENTR}:MC1`],
    source: `${ENTR_SRC} — distractor targets "freezing increases entropy" misconception`,
  },
  {
    conceptId: ENTR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says: "Living organisms violate the Second Law because they maintain internal order." Evaluate this.',
    choices: [
      { text: 'Incorrect — organisms are OPEN systems that export entropy to surroundings (heat, waste). The total entropy of organism + surroundings still increases. The 2nd Law applies to the universe, not the system alone.', isCorrect: true },
      { text: 'Correct — biological systems are exceptions to the Second Law', isCorrect: false, misconceptionId: `${ENTR}:MC2` },
    ],
    correctValue: 'Incorrect — open system exports entropy',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ENTR}:MC2`],
    source: `${ENTR_SRC} — misconception: life violates the second law`,
  },
]

// ─── chem.env.air-pollution ──────────────────────────────────────────────────
const AIRPOL = 'chem.env.air-pollution'
const AIRPOL_SRC = 'docs/chemistry/kg/graph.json — chem.env.air-pollution'

const AIRPOL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: AIRPOL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Air pollutants are PRIMARY (emitted directly: CO, SO₂, NO, particulates) or ' +
      'SECONDARY (formed by reactions in the atmosphere: O₃, PAN, H₂SO₄). ' +
      'PHOTOCHEMICAL SMOG forms when sunlight drives reactions between NOₓ and VOCs: ' +
      'NO₂ + UV → NO + O; O + O₂ → O₃ (ground-level ozone — a lung irritant, ' +
      'distinct from protective stratospheric ozone). ACID RAIN: SO₂ and NOₓ ' +
      'react with water vapor to form H₂SO₄ and HNO₃, lowering rain pH below 5.6. ' +
      'Effects: corrodes limestone/marble, acidifies lakes (killing fish), damages ' +
      'plant cuticles. CO is dangerous because it binds hemoglobin 200× more ' +
      'strongly than O₂ — even small concentrations prevent oxygen transport. ' +
      'Control strategies: catalytic converters (2CO + 2NO → 2CO₂ + N₂), scrubbers ' +
      '(remove SO₂ from flue gas), electrostatic precipitators (remove particulates).',
    targetedMisconceptions: [`${AIRPOL}:MC1`],
    source: `${AIRPOL_SRC} — primary/secondary pollutants, smog, acid rain, control`,
  },
  {
    conceptId: AIRPOL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "Ozone is always bad/always good." It\'s BOTH — location ' +
      'matters. In the stratosphere (20-30 km), O₃ absorbs UV-B/C and protects ' +
      'life — depletion there is harmful. At ground level (troposphere), O₃ is a ' +
      'toxic pollutant that irritates lungs and damages crops — formation there ' +
      '(from NOₓ + sunlight) is harmful. Same molecule, different effects based ' +
      'purely on WHERE it is. "Good up high, bad nearby." Another misconception: ' +
      '"CO₂ is a pollutant." In the classical air-pollution sense, CO₂ is NOT a ' +
      'pollutant (it\'s non-toxic at ambient levels and is a natural atmospheric ' +
      'component). It IS a greenhouse gas contributing to climate change — but ' +
      'that\'s a different problem from air pollution. Don\'t conflate them.',
    targetedMisconceptions: [`${AIRPOL}:MC1`],
    source: `${AIRPOL_SRC} — misconception: ozone is uniformly good or bad; CO₂ = classical pollutant`,
  },
]

const AIRPOL_PROBES: SeedProbe[] = [
  {
    conceptId: AIRPOL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Photochemical smog is classified as a SECONDARY pollutant because:',
    choices: [
      { text: 'It forms from chemical reactions in the atmosphere (NOₓ + VOCs + sunlight → O₃ + PAN), not emitted directly', isCorrect: true },
      { text: 'It is the second most dangerous pollutant after CO', isCorrect: false, misconceptionId: `${AIRPOL}:MC2` },
      { text: 'It affects only the secondary target organs (lungs, not blood)', isCorrect: false },
    ],
    correctValue: 'Formed by atmospheric reactions, not emitted directly',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${AIRPOL}:MC2`],
    source: `${AIRPOL_SRC} — distractor targets "secondary = second most important" misconception`,
  },
  {
    conceptId: AIRPOL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student says: "We should eliminate all ozone since it causes smog." What\'s wrong with this statement?',
    choices: [
      { text: 'Ground-level O₃ is harmful (smog component), but stratospheric O₃ is essential (UV shield). We need to reduce tropospheric O₃ while protecting stratospheric O₃ — they require opposite actions.', isCorrect: true },
      { text: 'Nothing wrong — ozone is always a pollutant that should be eliminated', isCorrect: false, misconceptionId: `${AIRPOL}:MC1` },
    ],
    correctValue: 'Location determines whether ozone is helpful or harmful',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${AIRPOL}:MC1`],
    source: `${AIRPOL_SRC} — misconception: ozone is uniformly bad`,
  },
]

// ─── chem.env.water-soil ─────────────────────────────────────────────────────
const WATSOL = 'chem.env.water-soil'
const WATSOL_SRC = 'docs/chemistry/kg/graph.json — chem.env.water-soil'

const WATSOL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WATSOL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Water pollution is measured by BIOCHEMICAL OXYGEN DEMAND (BOD): the O₂ ' +
      'consumed by microbes decomposing organic matter in 5 days at 20°C. ' +
      'High BOD = lots of organic waste = less dissolved O₂ for fish. ' +
      'EUTROPHICATION: excess nutrients (N, P from fertilizers/sewage) → algal ' +
      'bloom → algae die → decomposition consumes O₂ → fish die. Heavy metals ' +
      '(Hg, Pb, Cd) are dangerous because they BIOACCUMULATE — each level of the ' +
      'food chain concentrates them further (mercury in fish is 10,000× water levels). ' +
      'GREEN CHEMISTRY (Anastas & Warner, 12 principles) aims to prevent pollution ' +
      'at source: atom economy (minimize waste atoms), use catalysts over ' +
      'stoichiometric reagents, design for degradation, avoid toxic solvents. ' +
      'The shift: from "treat pollution after creation" to "design processes that ' +
      'don\'t create pollution."',
    targetedMisconceptions: [`${WATSOL}:MC1`],
    source: `${WATSOL_SRC} — BOD, eutrophication, heavy metals, green chemistry principles`,
  },
  {
    conceptId: WATSOL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "High dissolved oxygen means the water is polluted." OPPOSITE — high ' +
      'dissolved O₂ means the water is CLEAN and can support aquatic life. It\'s ' +
      'high BOD (biochemical oxygen DEMAND — how much O₂ microbes consume) that ' +
      'indicates pollution. Polluted water has high BOD and LOW dissolved O₂. ' +
      'Another misconception: "Eutrophication is caused by toxic chemicals." No — ' +
      'it\'s caused by NUTRIENTS (nitrogen, phosphorus) that are individually harmless ' +
      'but trigger explosive algal growth. The algae themselves aren\'t toxic (usually); ' +
      'the problem is what happens when they die — decomposition bacteria consume all ' +
      'available oxygen, creating dead zones. It\'s an indirect mechanism, not direct ' +
      'poisoning.',
    targetedMisconceptions: [`${WATSOL}:MC1`, `${WATSOL}:MC2`],
    source: `${WATSOL_SRC} — misconception: high O₂ = polluted; eutrophication = toxic chemicals`,
  },
]

const WATSOL_PROBES: SeedProbe[] = [
  {
    conceptId: WATSOL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A water sample has a BOD of 350 mg/L. This indicates:',
    choices: [
      { text: 'Heavy organic pollution — microbes need 350 mg of O₂ per litre to decompose the organic waste present', isCorrect: true },
      { text: 'Very clean water — high BOD means lots of oxygen available', isCorrect: false, misconceptionId: `${WATSOL}:MC1` },
      { text: 'The water contains 350 mg/L of dissolved oxygen', isCorrect: false, misconceptionId: `${WATSOL}:MC3` },
    ],
    correctValue: 'Heavy organic pollution',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${WATSOL}:MC1`, `${WATSOL}:MC3`],
    source: `${WATSOL_SRC} — distractor targets "high BOD = clean" and "BOD = dissolved O₂" misconceptions`,
  },
  {
    conceptId: WATSOL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A lake receives runoff from farmland rich in nitrogen and phosphorus fertilizers. Why might fish start dying even though the fertilizers themselves are non-toxic?',
    choices: [
      { text: 'Eutrophication: nutrients trigger algal bloom → algae die → microbial decomposition consumes dissolved O₂ → fish suffocate from lack of oxygen (not direct toxicity)', isCorrect: true },
      { text: 'The fertilizers directly poison the fish by accumulating in their tissues', isCorrect: false, misconceptionId: `${WATSOL}:MC2` },
    ],
    correctValue: 'Eutrophication (oxygen depletion)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${WATSOL}:MC2`],
    source: `${WATSOL_SRC} — misconception: eutrophication is direct chemical poisoning`,
  },
]

// ─── chem.surface.emulsions ──────────────────────────────────────────────────
const EMUL = 'chem.surface.emulsions'
const EMUL_SRC = 'docs/chemistry/kg/graph.json — chem.surface.emulsions'

const EMUL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EMUL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Mix oil and water vigorously — you get an EMULSION (tiny droplets of one ' +
      'liquid dispersed in another). But wait — leave it alone and it separates. ' +
      'WHY? Because oil-water interfaces are energetically unfavorable. EMULSIFYING ' +
      'AGENTS (surfactants) solve this: molecules with a hydrophilic HEAD (loves ' +
      'water) and a hydrophobic TAIL (loves oil). They sit at the oil-water ' +
      'interface, reducing surface tension and preventing droplets from merging. ' +
      'Soap, detergents, lecithin (in egg yolk — that\'s why egg makes mayonnaise ' +
      'stable). Two types: OIL-IN-WATER (O/W: oil droplets in water — milk, cream) ' +
      'and WATER-IN-OIL (W/O: water droplets in oil — butter, cold cream). Test: ' +
      'O/W is dilutable with water; W/O is dilutable with oil. GELS are the reverse ' +
      'concept: a solid network trapping liquid (jelly, agar).',
    targetedMisconceptions: [`${EMUL}:MC1`],
    source: `${EMUL_SRC} — emulsion types, emulsifying agents, O/W vs W/O, gels`,
  },
  {
    conceptId: EMUL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "Emulsions are permanent — once mixed, they stay mixed." ' +
      'No — emulsions are THERMODYNAMICALLY UNSTABLE. They\'re stabilized ' +
      'KINETICALLY by emulsifiers that slow down coalescence, but given enough ' +
      'time (or heat/salt), they can break (creaming, flocculation, coalescence). ' +
      'That\'s why old milk separates and why salad dressing needs shaking. ' +
      'Only MICROEMULSIONS (particle size < 100 nm, formed spontaneously) are ' +
      'thermodynamically stable. Regular emulsions (1-1000 nm) always need an ' +
      'emulsifier AND mechanical energy (mixing) to form and are inherently ' +
      'metastable — the emulsifier is a kinetic barrier, not a thermodynamic solution.',
    targetedMisconceptions: [`${EMUL}:MC1`],
    source: `${EMUL_SRC} — misconception: emulsions are thermodynamically stable permanent mixtures`,
  },
]

const EMUL_PROBES: SeedProbe[] = [
  {
    conceptId: EMUL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Milk is an emulsion of fat droplets in water. Adding a few drops of water to milk has no effect, but adding oil causes separation. This confirms milk is:',
    choices: [
      { text: 'Oil-in-water (O/W) type — the continuous phase is water, so it\'s dilutable with water but not oil', isCorrect: true },
      { text: 'Water-in-oil (W/O) type — milk contains mostly water so the water must be dispersed', isCorrect: false, misconceptionId: `${EMUL}:MC2` },
      { text: 'A true solution — milk is transparent and homogeneous', isCorrect: false, misconceptionId: `${EMUL}:MC3` },
    ],
    correctValue: 'O/W emulsion',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EMUL}:MC2`, `${EMUL}:MC3`],
    source: `${EMUL_SRC} — distractor targets "mostly water = W/O" and "milk is a solution" misconceptions`,
  },
  {
    conceptId: EMUL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does mayonnaise (an emulsion) eventually separate if stored too long?',
    choices: [
      { text: 'Emulsions are thermodynamically unstable — the emulsifier (lecithin) provides only a kinetic barrier against coalescence, which weakens over time', isCorrect: true },
      { text: 'The emulsifier breaks down chemically and stops working — if it stayed intact the emulsion would last forever', isCorrect: false, misconceptionId: `${EMUL}:MC1` },
    ],
    correctValue: 'Thermodynamic instability (kinetic barrier only)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EMUL}:MC1`],
    source: `${EMUL_SRC} — misconception: emulsions are permanent if emulsifier is present`,
  },
]

// ─── chem.thermo.heat-capacities ─────────────────────────────────────────────
const HEATC = 'chem.thermo.heat-capacities'
const HEATC_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.heat-capacities'

const HEATC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HEATC,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Heat capacity asks: how much energy to raise 1 mole by 1 K? For gases, ' +
      'the answer depends on the CONDITIONS. At constant volume (C_v), all heat ' +
      'goes into raising internal energy (kinetic energy of motion). At constant ' +
      'pressure (C_p), some heat also does expansion work (PΔV), so C_p is always ' +
      'BIGGER than C_v — you need extra energy to both heat AND expand. For an ' +
      'ideal gas: C_p − C_v = R (exactly, from ΔH = ΔU + RT for 1 mole). The ratio ' +
      'γ = C_p/C_v tells you molecular complexity: monatomic gases (He, Ar) have ' +
      'γ = 1.67 (only translational motion — 3 degrees of freedom). Diatomic gases ' +
      '(N₂, O₂) have γ = 1.4 (translational + rotational — 5 degrees of freedom). ' +
      'The EQUIPARTITION THEOREM says each degree of freedom contributes ½R to C_v — ' +
      'more ways to store energy (rotation, vibration) means more heat needed for ' +
      'the same temperature rise.',
    targetedMisconceptions: [`${HEATC}:MC1`],
    source: `${HEATC_SRC} — Cp, Cv, γ=Cp/Cv, equipartition theorem`,
  },
  {
    conceptId: HEATC,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "C_p and C_v are the same thing, just measured differently." ' +
      'No — they represent genuinely different physical processes. C_v: heat a ' +
      'RIGID sealed container — 100% of the heat raises the kinetic energy of ' +
      'molecules (temperature). C_p: heat a gas in a piston that can expand — some ' +
      'heat goes into PUSHING the piston (doing work against atmospheric pressure), ' +
      'so LESS is left to raise temperature for the same heat input... meaning ' +
      'you need MORE heat to achieve the same ΔT. That\'s why C_p > C_v. Second trap: ' +
      '"Diatomic gases store energy the same way as monatomic." No — monatomic gases ' +
      'can only translate (move through space); diatomic gases can ALSO rotate (tumble) ' +
      'and vibrate (stretch/compress the bond), giving them more places to "hide" energy, ' +
      'hence higher heat capacity.',
    targetedMisconceptions: [`${HEATC}:MC1`, `${HEATC}:MC2`],
    source: `${HEATC_SRC} — misconception: Cp=Cv; monatomic and diatomic store energy identically`,
  },
]

const HEATC_PROBES: SeedProbe[] = [
  {
    conceptId: HEATC,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is Cp always greater than Cv for an ideal gas?',
    choices: [
      { text: 'At constant pressure, some heat energy does expansion work (PΔV) instead of raising temperature, so more total heat is needed for the same ΔT', isCorrect: true },
      { text: 'Cp and Cv measure different gases, so they can\'t be directly compared', isCorrect: false, misconceptionId: `${HEATC}:MC1` },
      { text: 'Pressure itself requires extra energy to maintain', isCorrect: false, misconceptionId: `${HEATC}:MC3` },
    ],
    correctValue: 'Expansion work at constant pressure',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HEATC}:MC3`],
    source: `${HEATC_SRC} — distractor targets "pressure requires energy to maintain" misconception`,
  },
  {
    conceptId: HEATC,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does a diatomic gas like N₂ have a higher molar heat capacity than a monatomic gas like He?',
    choices: [
      { text: 'N₂ can store energy in rotational and vibrational motion in addition to translation, giving it more degrees of freedom to absorb heat', isCorrect: true },
      { text: 'N₂ molecules are heavier, so they simply need more energy to move at all', isCorrect: false, misconceptionId: `${HEATC}:MC2` },
    ],
    correctValue: 'More degrees of freedom (rotation, vibration)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HEATC}:MC2`],
    source: `${HEATC_SRC} — misconception: heat capacity differences are about mass, not degrees of freedom`,
  },
]

// ─── chem.state.molar-mass-gas ───────────────────────────────────────────────
const MMGAS = 'chem.state.molar-mass-gas'
const MMGAS_SRC = 'docs/chemistry/kg/graph.json — chem.state.molar-mass-gas'

const MMGAS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MMGAS,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'You can find a gas\'s molar mass WITHOUT knowing its formula — just measure ' +
      'its density! Rearrange PV = nRT using n = mass/M: PM = (mass/V)RT = dRT, ' +
      'so M = dRT/P. Measure density at known T and P, solve for M. This tells you ' +
      'the MOLECULAR (actual) molar mass, which combined with the EMPIRICAL formula ' +
      '(from % composition) tells you the TRUE molecular formula. Example: empirical ' +
      'formula CH₂O (mass 30) but measured molar mass is 180 → multiply by 6 → ' +
      'true formula C₆H₁₂O₆ (glucose). GRAHAM\'S LAW connects effusion rate to molar ' +
      'mass: rate₁/rate₂ = √(M₂/M₁) — lighter gases effuse (escape through a tiny ' +
      'hole) FASTER, because at a given temperature they move faster (same KE, ' +
      'lower mass = higher velocity). This is literally how uranium isotopes were ' +
      'separated (UF₆ gas, tiny mass difference, thousands of effusion stages).',
    targetedMisconceptions: [`${MMGAS}:MC1`],
    source: `${MMGAS_SRC} — molar mass via density, empirical vs molecular formula, Graham's law`,
  },
  {
    conceptId: MMGAS,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Heavier gases effuse faster because they have more momentum." ' +
      'BACKWARDS. At a given temperature, ALL gas molecules have the same AVERAGE ' +
      'kinetic energy (½mv² = constant). If mass is bigger, velocity must be SMALLER ' +
      'to keep KE the same. So LIGHTER gases move faster and effuse faster — that\'s ' +
      'the entire point of Graham\'s Law: rate ∝ 1/√M. Helium (M=4) effuses much ' +
      'faster than CO₂ (M=44) — that\'s why helium balloons deflate overnight while ' +
      'CO₂-filled ones stay inflated longer; He atoms are small AND fast, easily ' +
      'escaping through microscopic pores in the balloon material. Second trap: ' +
      '"Empirical formula and molecular formula are always the same." Only when ' +
      'the simplest whole-number ratio already matches the true formula (like H₂O). ' +
      'Otherwise the molecular formula is a whole-number MULTIPLE of the empirical one.',
    targetedMisconceptions: [`${MMGAS}:MC1`, `${MMGAS}:MC2`],
    source: `${MMGAS_SRC} — misconception: heavier gases effuse faster; empirical = molecular formula always`,
  },
]

const MMGAS_PROBES: SeedProbe[] = [
  {
    conceptId: MMGAS,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Hydrogen gas (M=2) effuses through a pinhole 4 times faster than gas X. What is the molar mass of gas X?',
    choices: [
      { text: '32 g/mol — Graham\'s law: rate_H2/rate_X = √(M_X/M_H2) → 4 = √(M_X/2) → M_X = 32', isCorrect: true },
      { text: '8 g/mol — rate ratio 4 means mass ratio 4, so M_X = 2×4 = 8', isCorrect: false, misconceptionId: `${MMGAS}:MC3` },
      { text: '0.5 g/mol — heavier gas means slower rate, so divide instead of multiply', isCorrect: false, misconceptionId: `${MMGAS}:MC1` },
    ],
    correctValue: '32 g/mol',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${MMGAS}:MC3`],
    source: `${MMGAS_SRC} — distractor targets linear (not square-root) rate-mass relationship`,
  },
  {
    conceptId: MMGAS,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does a helium balloon deflate faster than an air-filled balloon of the same size?',
    choices: [
      { text: 'Helium atoms are lighter, so at the same temperature they move faster (same average KE, lower mass → higher velocity) and effuse through pores more readily', isCorrect: true },
      { text: 'Helium atoms are heavier and push through the rubber pores more forcefully', isCorrect: false, misconceptionId: `${MMGAS}:MC1` },
    ],
    correctValue: 'Lighter atoms move faster at same T',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MMGAS}:MC1`],
    source: `${MMGAS_SRC} — misconception: heavier particles effuse faster`,
  },
]

// ─── chem.state.real-gases ───────────────────────────────────────────────────
const REALG = 'chem.state.real-gases'
const REALG_SRC = 'docs/chemistry/kg/graph.json — chem.state.real-gases'

const REALG_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REALG,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The ideal gas law assumes molecules have ZERO volume and ZERO attraction. ' +
      'Real gases break both assumptions, especially at HIGH pressure (molecules ' +
      'squeezed close, their own volume matters) and LOW temperature (molecules ' +
      'move slowly enough for attractions to matter). Van der Waals fixed both: ' +
      '(P + an²/V²)(V − nb) = nRT. The "a" term ADDS pressure back (real gas has ' +
      'lower measured pressure than ideal because attractive forces pull molecules ' +
      'inward, away from walls, reducing wall impacts). The "b" term SUBTRACTS ' +
      'volume (real molecules occupy space, so less "free" volume is available for ' +
      'motion than the container size suggests). COMPRESSIBILITY FACTOR Z = PV/nRT ' +
      'measures deviation: Z=1 is ideal. Z<1 means attractive forces dominate ' +
      '(gas is MORE compressible than ideal — pulled together). Z>1 means molecular ' +
      'volume dominates (gas resists compression more than ideal).',
    targetedMisconceptions: [`${REALG}:MC1`],
    source: `${REALG_SRC} — deviations from ideal, Z factor, van der Waals, critical constants`,
  },
  {
    conceptId: REALG,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "Real gases always deviate in the same direction from ideal ' +
      'behavior." No — deviation depends on conditions. At MODERATE pressure, ' +
      'attractive forces dominate → Z < 1 (gas compresses more easily than ideal). ' +
      'At VERY HIGH pressure, molecular volume dominates → Z > 1 (gas resists ' +
      'further compression because molecules are already touching). The curve for ' +
      'real gases dips BELOW Z=1 first, then rises ABOVE it as pressure increases — ' +
      'it\'s not a simple one-directional deviation. Second trap: "All gases deviate ' +
      'equally from ideal behavior." No — gases with stronger intermolecular forces ' +
      '(like NH₃, which hydrogen bonds) deviate MORE than gases with weak forces ' +
      '(like He, which barely interacts). This is why He is the "most ideal" real gas ' +
      'while NH₃ and CO₂ deviate significantly even at moderate pressures.',
    targetedMisconceptions: [`${REALG}:MC1`, `${REALG}:MC2`],
    source: `${REALG_SRC} — misconception: deviation is uniform/directionless; all gases deviate equally`,
  },
]

const REALG_PROBES: SeedProbe[] = [
  {
    conceptId: REALG,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'At very high pressure, a real gas shows Z > 1 (PV > nRT). This is because:',
    choices: [
      { text: 'Molecular volume becomes significant — the gas resists further compression more than the ideal law predicts', isCorrect: true },
      { text: 'Intermolecular attractions become stronger at high pressure, pulling molecules together', isCorrect: false, misconceptionId: `${REALG}:MC1` },
      { text: 'The gas begins to liquefy, which increases apparent volume', isCorrect: false },
    ],
    correctValue: 'Molecular volume dominates',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REALG}:MC1`],
    source: `${REALG_SRC} — distractor targets "attraction explains Z>1" (attraction explains Z<1)`,
  },
  {
    conceptId: REALG,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Which gas would you expect to deviate MOST from ideal behavior at room temperature: He or NH₃? Why?',
    choices: [
      { text: 'NH₃ — it has strong hydrogen bonding (large intermolecular attraction), while He has almost no intermolecular forces, making it nearly ideal', isCorrect: true },
      { text: 'He — smaller atoms are more affected by pressure and volume corrections', isCorrect: false, misconceptionId: `${REALG}:MC2` },
    ],
    correctValue: 'NH₃ (stronger intermolecular forces)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REALG}:MC2`],
    source: `${REALG_SRC} — misconception: smaller atoms deviate more (deviation tracks intermolecular force strength)`,
  },
]

// ─── chem.atomic.quantum-numbers ─────────────────────────────────────────────
const QNUM = 'chem.atomic.quantum-numbers'
const QNUM_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.quantum-numbers'

const QNUM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QNUM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Four numbers completely describe an electron\'s "address" in an atom — like a ' +
      'postal address gets more specific at each level. PRINCIPAL (n = 1,2,3...): ' +
      'the "floor" — determines overall energy and size, bigger n = further from ' +
      'nucleus, higher energy. AZIMUTHAL (l = 0 to n−1): the "room shape" — ' +
      'determines the ORBITAL TYPE (l=0 is s, l=1 is p, l=2 is d, l=3 is f) and ' +
      'sub-shell energy. MAGNETIC (m_l = −l to +l): the "orientation" — which ' +
      'specific orbital within a sub-shell (p has 3 orientations: px, py, pz). ' +
      'SPIN (m_s = +½ or −½): each orbital holds exactly 2 electrons, spinning ' +
      'opposite ways (Pauli exclusion). So for n=2, l can be 0 or 1 (2s or 2p sub-shells); ' +
      'for l=1, m_l can be −1, 0, +1 (three p orbitals); each orbital holds 2 electrons ' +
      'of opposite spin. This four-number system uniquely identifies every electron ' +
      'in every atom — no two electrons in the same atom share all four values.',
    targetedMisconceptions: [`${QNUM}:MC1`],
    source: `${QNUM_SRC} — n, l, ml, ms quantum numbers, physical significance`,
  },
  {
    conceptId: QNUM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "l can range from 0 to n." WRONG — l ranges from 0 to n−1. For n=1, ' +
      'only l=0 is allowed (1s only — no 1p exists!). For n=2, l can be 0 or 1 ' +
      '(2s and 2p exist, but NOT 2d). This is why the periodic table has the shape ' +
      'it does — d orbitals don\'t appear until n=3 (3d), f orbitals not until n=4 (4f). ' +
      'Second trap: "m_l values run from 0 to l." Wrong — m_l runs from −l to +l, ' +
      'INCLUDING zero, giving (2l+1) possible values. For l=1 (p), that\'s −1, 0, +1 ' +
      '= 3 orbitals. For l=2 (d), that\'s −2,−1,0,+1,+2 = 5 orbitals. Memorize the ' +
      'PATTERN, not a number: number of orbitals in a sub-shell = 2l+1.',
    targetedMisconceptions: [`${QNUM}:MC1`, `${QNUM}:MC2`],
    source: `${QNUM_SRC} — misconception: l ranges 0 to n; ml ranges 0 to l`,
  },
]

const QNUM_PROBES: SeedProbe[] = [
  {
    conceptId: QNUM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which sub-shell does NOT exist: 1p, 2p, 3d, or 4f?',
    choices: [
      { text: '1p — for n=1, l can only be 0 (l goes from 0 to n−1), so only 1s exists', isCorrect: true },
      { text: '3d — d orbitals never exist for any n value below 4', isCorrect: false, misconceptionId: `${QNUM}:MC3` },
      { text: '4f — f orbitals never exist for any n below 5', isCorrect: false },
    ],
    correctValue: '1p does not exist',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${QNUM}:MC3`],
    source: `${QNUM_SRC} — distractor targets wrong minimum-n rules for d and f sub-shells`,
  },
  {
    conceptId: QNUM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'How many orbitals are in the 3d sub-shell (l=2)?',
    choices: [
      { text: '5 orbitals — number of orbitals = 2l+1 = 2(2)+1 = 5, with ml values −2,−1,0,+1,+2', isCorrect: true },
      { text: '2 orbitals — ml only takes values 0 and l', isCorrect: false, misconceptionId: `${QNUM}:MC2` },
    ],
    correctValue: '5 orbitals',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${QNUM}:MC2`],
    source: `${QNUM_SRC} — misconception: ml range starts at 0, not −l`,
  },
]

// ─── chem.atomic.orbitals ────────────────────────────────────────────────────
const ORBIT = 'chem.atomic.orbitals'
const ORBIT_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.orbitals'

const ORBIT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ORBIT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'An orbital is a PROBABILITY CLOUD — the 3D region where you\'re 90-95% likely ' +
      'to find an electron. Not a path, not a fixed location — a fuzzy region shaped ' +
      'by quantum mechanics. S ORBITALS are spherical — 1s is a solid ball, 2s is a ' +
      'ball with a spherical shell of near-zero probability inside it (a RADIAL NODE). ' +
      'P ORBITALS are dumbbell-shaped, with TWO lobes and a node (zero probability ' +
      'plane) through the nucleus — this is an ANGULAR NODE. Three p orbitals (px, py, pz) ' +
      'point along the three axes. D ORBITALS are more complex — four have a cloverleaf ' +
      'shape (4 lobes), one (dz²) looks like a p orbital with a donut around the middle. ' +
      'Total nodes = n−1 (radial + angular combined). More nodes = higher energy within ' +
      'the same n. Orbital SHAPE (angular part) determines how atoms bond directionally — ' +
      'that\'s the foundation of molecular geometry.',
    targetedMisconceptions: [`${ORBIT}:MC1`],
    source: `${ORBIT_SRC} — s/p/d/f orbital shapes, radial/angular nodes, energy diagrams`,
  },
  {
    conceptId: ORBIT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The most persistent misconception in chemistry: "An orbital is the PATH an ' +
      'electron travels, like a planet\'s orbit." This is the Bohr picture, and it\'s ' +
      'WRONG. Electrons don\'t travel in defined paths — Heisenberg\'s uncertainty ' +
      'principle says you can\'t know both position and momentum precisely. An orbital ' +
      'is a STATISTICAL description — a 3D probability distribution built from millions ' +
      'of hypothetical position measurements. The electron doesn\'t "orbit" through the ' +
      'dumbbell shape of a p orbital — it has some probability of BEING FOUND anywhere ' +
      'within that shape at any instant, with zero probability exactly at the node. ' +
      'Second trap: "p orbitals have a hole in the middle where the electron never goes." ' +
      'More precisely: the node is a plane (2D) of zero probability, but the two LOBES ' +
      'on either side are part of the SAME orbital, same electron, not "two electrons ' +
      'in two lobes."',
    targetedMisconceptions: [`${ORBIT}:MC1`, `${ORBIT}:MC2`],
    source: `${ORBIT_SRC} — misconception: orbitals are orbital paths; p-orbital lobes are separate electrons`,
  },
]

const ORBIT_PROBES: SeedProbe[] = [
  {
    conceptId: ORBIT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What does a "node" in an atomic orbital represent?',
    choices: [
      { text: 'A region (point, plane, or surface) where the probability of finding the electron is exactly zero', isCorrect: true },
      { text: 'The exact path the electron travels around the nucleus', isCorrect: false, misconceptionId: `${ORBIT}:MC1` },
      { text: 'A boundary where the electron changes from one orbital to another', isCorrect: false },
    ],
    correctValue: 'Zero probability region',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORBIT}:MC1`],
    source: `${ORBIT_SRC} — distractor targets orbit-path misconception applied to nodes`,
  },
  {
    conceptId: ORBIT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A 2p orbital has two lobes separated by a nodal plane. A student says "one electron lives in each lobe." Is this correct?',
    choices: [
      { text: 'No — a single 2p orbital describes ONE electron\'s probability distribution across BOTH lobes; the electron has zero probability exactly at the node but nonzero probability in either lobe', isCorrect: true },
      { text: 'Yes — each lobe represents a separate electron location, like two rooms', isCorrect: false, misconceptionId: `${ORBIT}:MC2` },
    ],
    correctValue: 'No — one orbital, one electron\'s full distribution',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORBIT}:MC2`],
    source: `${ORBIT_SRC} — misconception: p-orbital lobes house separate electrons`,
  },
]

// ─── chem.kinet.photochemistry ───────────────────────────────────────────────
const PHOTOC = 'chem.kinet.photochemistry'
const PHOTOC_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.photochemistry'

const PHOTOC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PHOTOC,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Some reactions need LIGHT, not heat, to start. A PRIMARY photochemical process ' +
      'is direct: a photon is absorbed and immediately breaks a bond or excites a ' +
      'molecule (Cl₂ + hν → 2Cl•). SECONDARY processes follow — the excited species ' +
      'reacts further without needing more light (Cl• + H₂ → HCl + H•, a chain reaction). ' +
      'QUANTUM YIELD (Φ) = molecules reacted / photons absorbed. Φ=1 means perfect ' +
      'efficiency. Chain reactions can give Φ >> 1 (one photon triggers thousands of ' +
      'reactions via propagation) — the H₂+Cl₂ reaction has Φ up to 10⁶! Or Φ < 1 if ' +
      'excited molecules lose energy without reacting (fluorescence, collisions). ' +
      'BEER-LAMBERT LAW connects light absorption to concentration: A = εcl (absorbance ' +
      '= molar absorptivity × concentration × path length) — this is how spectrophotometers ' +
      'measure concentration. Photochemical ozone formation (NO₂ + hν → NO + O) is the ' +
      'seed reaction for smog.',
    targetedMisconceptions: [`${PHOTOC}:MC1`],
    source: `${PHOTOC_SRC} — primary/secondary processes, quantum yield, Beer-Lambert`,
  },
  {
    conceptId: PHOTOC,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Quantum yield can never exceed 1 — you can\'t get more product molecules ' +
      'than photons absorbed." FALSE for CHAIN REACTIONS. One photon creates ONE radical ' +
      '(primary step), but that radical can propagate a chain reacting thousands of times ' +
      'before termination — each propagation step consumes no additional photons. So Φ ' +
      'measures TOTAL molecules reacted per photon ABSORBED (not "per photon needed"), ' +
      'and a self-sustaining chain can make this number huge. Second trap: "All light ' +
      'that hits a molecule gets absorbed." No — only photons matching the molecule\'s ' +
      'exact energy gap (electronic transition energy) get absorbed; the rest pass through ' +
      'or scatter. This is why colored substances absorb specific wavelengths (giving ' +
      'them their complementary color) while transmitting others.',
    targetedMisconceptions: [`${PHOTOC}:MC1`],
    source: `${PHOTOC_SRC} — misconception: quantum yield ≤ 1 always (false for chain reactions)`,
  },
]

const PHOTOC_PROBES: SeedProbe[] = [
  {
    conceptId: PHOTOC,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The H₂ + Cl₂ photochemical reaction has a quantum yield of about 10⁶. This means:',
    choices: [
      { text: 'Each absorbed photon triggers a chain reaction producing about a million HCl molecules before the chain terminates', isCorrect: true },
      { text: 'The reaction is impossible since quantum yield can never exceed 1', isCorrect: false, misconceptionId: `${PHOTOC}:MC1` },
      { text: 'A million photons are needed to make just one HCl molecule', isCorrect: false, misconceptionId: `${PHOTOC}:MC2` },
    ],
    correctValue: 'One photon triggers a million-step chain',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${PHOTOC}:MC1`, `${PHOTOC}:MC2`],
    source: `${PHOTOC_SRC} — distractor targets "Φ≤1 always" and inverted quantum yield definition`,
  },
  {
    conceptId: PHOTOC,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A colored solution absorbs green light strongly but transmits red and blue light. Why doesn\'t it absorb ALL wavelengths equally?',
    choices: [
      { text: 'Absorption occurs only when photon energy exactly matches an electronic transition energy gap in the molecule — other wavelengths pass through unabsorbed', isCorrect: true },
      { text: 'The solution is too dilute to absorb every wavelength — a concentrated solution would absorb all colors', isCorrect: false, misconceptionId: `${PHOTOC}:MC3` },
    ],
    correctValue: 'Only matching-energy photons are absorbed',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PHOTOC}:MC3`],
    source: `${PHOTOC_SRC} — misconception: selective absorption is a concentration effect, not an energy-matching effect`,
  },
]

// ─── chem.kinet.rate-law ─────────────────────────────────────────────────────
const RATEL = 'chem.kinet.rate-law'
const RATEL_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.rate-law'

const RATEL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RATEL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The rate law expresses HOW rate depends on concentration: rate = k[A]^m[B]^n. ' +
      'The exponents m, n are the ORDER with respect to each reactant — found ONLY ' +
      'by experiment, never by looking at the balanced equation. Overall order = m+n. ' +
      'The INITIAL RATE METHOD finds these: run several trials, changing ONE ' +
      'concentration at a time while holding others fixed, and observe how the rate ' +
      'changes. If doubling [A] doubles the rate → order 1 in A. If doubling [A] ' +
      'quadruples the rate → order 2 in A. If doubling [A] does nothing → order 0 in A. ' +
      'The rate constant k has UNITS that depend on overall order (this is a giveaway ' +
      'clue): zero order → mol/(L·s); first order → 1/s; second order → L/(mol·s). ' +
      'Once you know the rate law, you integrate it to predict concentration over time — ' +
      'that\'s where half-life formulas come from.',
    targetedMisconceptions: [`${RATEL}:MC1`],
    source: `${RATEL_SRC} — rate law, order, rate constant units, initial-rate method`,
  },
  {
    conceptId: RATEL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Recurring trap: "The rate law exponents equal the stoichiometric coefficients." ' +
      'FALSE in general — only true for ELEMENTARY reactions (single-step mechanisms). ' +
      'Most reactions you balance are OVERALL equations representing multiple steps, ' +
      'and the rate law reflects only the SLOWEST (rate-determining) step\'s stoichiometry. ' +
      'For 2NO + O₂ → 2NO₂, the coefficients are 2 and 1, but the EXPERIMENTAL rate law ' +
      'is rate = k[NO]²[O₂] — coincidentally matching here, but you can\'t assume this ' +
      'without experimental data. For H₂ + Br₂ → 2HBr, the actual rate law is ' +
      'rate = k[H₂][Br₂]^(1/2) / (1 + k\'[HBr]/[Br₂]) — nothing like the simple ' +
      'coefficients (1,1) would suggest! Always determine rate laws EXPERIMENTALLY.',
    targetedMisconceptions: [`${RATEL}:MC1`],
    source: `${RATEL_SRC} — misconception: rate law exponents = stoichiometric coefficients`,
  },
]

const RATEL_PROBES: SeedProbe[] = [
  {
    conceptId: RATEL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In an experiment, doubling [A] while keeping [B] constant quadruples the rate. Doubling [B] while keeping [A] constant doubles the rate. The rate law is:',
    choices: [
      { text: 'rate = k[A]²[B]¹ — quadrupling from doubling means order 2 in A; doubling from doubling means order 1 in B', isCorrect: true },
      { text: 'rate = k[A][B] — matches typical stoichiometric coefficients', isCorrect: false, misconceptionId: `${RATEL}:MC1` },
      { text: 'rate = k[A]⁴[B]² — directly use the multiplication factors as exponents', isCorrect: false, misconceptionId: `${RATEL}:MC2` },
    ],
    correctValue: 'rate = k[A]²[B]',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RATEL}:MC1`, `${RATEL}:MC2`],
    source: `${RATEL_SRC} — distractor targets "exponent = coefficient" and "exponent = rate multiplier"`,
  },
  {
    conceptId: RATEL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'For 2NO₂ + F₂ → 2NO₂F, can you determine the rate law directly from the balanced equation?',
    choices: [
      { text: 'No — the rate law must be determined experimentally, since this equation likely represents multiple elementary steps and the rate law reflects only the slowest step', isCorrect: true },
      { text: 'Yes — rate = k[NO₂]²[F₂] follows directly from the coefficients', isCorrect: false, misconceptionId: `${RATEL}:MC1` },
    ],
    correctValue: 'No — requires experimental determination',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RATEL}:MC1`],
    source: `${RATEL_SRC} — misconception: overall balanced equation gives rate law directly`,
  },
]

// ─── chem.kinet.arrhenius ────────────────────────────────────────────────────
const ARRH = 'chem.kinet.arrhenius'
const ARRH_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.arrhenius'

const ARRH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ARRH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Why does heating a reaction speed it up so dramatically — often DOUBLING the ' +
      'rate for just a 10°C rise? The Arrhenius equation: k = Ae^(−Ea/RT). Ea is the ' +
      'ACTIVATION ENERGY — the energy barrier reactants must climb before they can ' +
      'become products (even for exothermic reactions!). A is the FREQUENCY FACTOR — ' +
      'related to how often molecules collide with the correct orientation. The ' +
      'exponential term e^(−Ea/RT) is the fraction of molecules with enough energy to ' +
      'react — and this fraction is EXTREMELY sensitive to temperature because it\'s ' +
      'exponential, not linear. COLLISION THEORY explains why: for a reaction to occur, ' +
      'molecules must (1) collide, (2) with enough energy (≥ Ea), (3) with the correct ' +
      'orientation. Raising T doesn\'t just increase collision frequency slightly — it ' +
      'dramatically increases the FRACTION of collisions with energy ≥ Ea (the tail of ' +
      'the Maxwell-Boltzmann distribution). Plotting ln k vs 1/T gives a straight line ' +
      'with slope −Ea/R — the standard way to find activation energy experimentally.',
    targetedMisconceptions: [`${ARRH}:MC1`],
    source: `${ARRH_SRC} — Arrhenius equation, Ea, frequency factor, collision theory`,
  },
  {
    conceptId: ARRH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Major misconception: "Exothermic reactions have zero activation energy since ' +
      'they release energy overall." FALSE. Even highly exothermic reactions (like ' +
      'combustion) need an initial energy input (a spark, a match) to start — that\'s ' +
      'the activation energy. Paper doesn\'t spontaneously combust at room temperature ' +
      'despite the reaction being hugely exothermic, BECAUSE Ea is high — you need to ' +
      'supply that energy first (with a match) before the exothermic release takes over. ' +
      'Ea is about the PATHWAY (the energy hill reactants must climb), completely ' +
      'independent of the overall ΔH (start vs. end energy). Second trap: "A catalyst ' +
      'changes ΔH of the reaction." No — catalysts only LOWER Ea by providing an alternative ' +
      'pathway; ΔH (determined by reactant/product energies, a state function) is unchanged. ' +
      'The catalyst makes the SAME reaction faster, not a different, more favorable one.',
    targetedMisconceptions: [`${ARRH}:MC1`, `${ARRH}:MC2`],
    source: `${ARRH_SRC} — misconception: exothermic = zero Ea; catalysts change ΔH`,
  },
]

const ARRH_PROBES: SeedProbe[] = [
  {
    conceptId: ARRH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Combustion of paper is highly exothermic (releases lots of energy), yet paper doesn\'t spontaneously catch fire at room temperature. This is because:',
    choices: [
      { text: 'The reaction has a significant activation energy barrier — a spark or flame is needed to supply enough energy for molecules to react, even though the overall process releases energy', isCorrect: true },
      { text: 'Exothermic reactions require the addition of a catalyst before they can begin', isCorrect: false, misconceptionId: `${ARRH}:MC2` },
      { text: 'The reaction is actually endothermic at room temperature and only becomes exothermic when heated', isCorrect: false },
    ],
    correctValue: 'Activation energy barrier exists independent of ΔH',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ARRH}:MC1`],
    source: `${ARRH_SRC} — distractor targets "exothermic reactions have no activation barrier"`,
  },
  {
    conceptId: ARRH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A catalyst speeds up a reaction by lowering Ea from 100 kJ/mol to 60 kJ/mol. What happens to ΔH of the reaction?',
    choices: [
      { text: 'ΔH is unchanged — the catalyst only provides an alternative pathway with lower Ea; ΔH depends only on the energy of reactants and products (a state function)', isCorrect: true },
      { text: 'ΔH decreases by 40 kJ/mol, matching the drop in Ea', isCorrect: false, misconceptionId: `${ARRH}:MC2` },
    ],
    correctValue: 'ΔH unchanged',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ARRH}:MC2`],
    source: `${ARRH_SRC} — misconception: catalysts change reaction thermodynamics (ΔH)`,
  },
]

// ─── chem.sol.solubility ─────────────────────────────────────────────────────
const SOLUB = 'chem.sol.solubility'
const SOLUB_SRC = 'docs/chemistry/kg/graph.json — chem.sol.solubility'

const SOLUB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SOLUB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Solubility depends on temperature and pressure, but DIFFERENTLY for solids vs. ' +
      'gases. Most SOLIDS become more soluble as temperature rises (dissolution is ' +
      'often endothermic — extra thermal energy helps break the solid\'s lattice). ' +
      'GASES do the opposite — solubility DECREASES with rising temperature (that\'s ' +
      'why a warm soda goes flat faster, and why warm water holds less dissolved ' +
      'oxygen, stressing fish in summer). HENRY\'S LAW governs gas solubility: ' +
      'P_gas = K_H × x_gas (partial pressure is proportional to mole fraction dissolved). ' +
      'Higher pressure pushes MORE gas into solution — that\'s why soda is bottled ' +
      'under pressure (CO₂ stays dissolved) and why deep-sea divers must decompress ' +
      'slowly (nitrogen dissolved in blood at high pressure would form dangerous ' +
      'bubbles if pressure drops too fast — "the bends"). Henry\'s Law breaks down for ' +
      'gases that react with the solvent (like NH₃ or HCl in water — these don\'t follow ' +
      'simple physical dissolution).',
    targetedMisconceptions: [`${SOLUB}:MC1`],
    source: `${SOLUB_SRC} — solubility factors, Henry's law, carbonation, diving applications`,
  },
  {
    conceptId: SOLUB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Big trap: "All substances become more soluble when heated, just like sugar in ' +
      'water." This is true for MOST solids but the OPPOSITE for gases. Heating soda ' +
      'releases dissolved CO₂ (goes flat); heating a river in summer reduces dissolved ' +
      'O₂ (stressing fish, worsened by warmer water also needing MORE oxygen for faster ' +
      'fish metabolism — a double stress). The reason: gas dissolution is typically ' +
      'EXOTHERMIC (gas molecules losing kinetic energy as they enter solution), so by ' +
      'Le Chatelier\'s principle, heating (adding energy) shifts equilibrium AWAY from ' +
      'the dissolved state. Second trap: "Henry\'s Law says solubility is proportional ' +
      'to pressure for ALL gases." Only for gases that DON\'T react with the solvent. ' +
      'CO₂ in water partially reacts (forms carbonic acid), so its true behavior deviates ' +
      'from ideal Henry\'s Law at high concentrations.',
    targetedMisconceptions: [`${SOLUB}:MC1`],
    source: `${SOLUB_SRC} — misconception: gases behave like solids (more soluble when heated)`,
  },
]

const SOLUB_PROBES: SeedProbe[] = [
  {
    conceptId: SOLUB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does a bottle of soda go flat faster when left in a warm room compared to a cold refrigerator?',
    choices: [
      { text: 'Gas solubility decreases as temperature increases — warming shifts equilibrium away from dissolved CO₂, releasing it as bubbles', isCorrect: true },
      { text: 'Heat breaks the chemical bonds holding CO₂ in the liquid, similar to how heat dissolves sugar faster', isCorrect: false, misconceptionId: `${SOLUB}:MC1` },
    ],
    correctValue: 'Gas solubility decreases with temperature',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${SOLUB}:MC1`],
    source: `${SOLUB_SRC} — distractor targets applying solid-solubility intuition to gases`,
  },
  {
    conceptId: SOLUB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A deep-sea diver must ascend slowly to avoid "the bends." Explain using Henry\'s Law.',
    choices: [
      { text: 'At depth, high pressure dissolves more N₂ in blood (Henry\'s Law). Rapid ascent drops pressure suddenly, and dissolved N₂ can\'t escape gradually — it forms bubbles in blood/tissue, which is dangerous.', isCorrect: true },
      { text: 'Deep water is colder, which makes more gas dissolve; ascending warms the diver and gas escapes safely regardless of speed', isCorrect: false, misconceptionId: `${SOLUB}:MC2` },
    ],
    correctValue: 'Pressure drop releases dissolved N₂ as bubbles',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${SOLUB}:MC2`],
    source: `${SOLUB_SRC} — misconception: attributing the bends to temperature rather than pressure change`,
  },
]

// ─── chem.thermo.gibbs ───────────────────────────────────────────────────────
const GIBBS = 'chem.thermo.gibbs'
const GIBBS_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.gibbs'

const GIBBS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GIBBS,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Neither ΔH nor ΔS alone predicts spontaneity — you need BOTH, combined as ' +
      'Gibbs Free Energy: ΔG = ΔH − TΔS. ΔG < 0 → spontaneous (products favored). ' +
      'ΔG > 0 → non-spontaneous (as written; reverse is spontaneous). ΔG = 0 → ' +
      'equilibrium. This single equation resolves the classic puzzle: why do SOME ' +
      'endothermic reactions happen spontaneously (like ice melting above 0°C, or ' +
      'dissolving NH₄NO₃ which cools the solution)? Because even though ΔH > 0 ' +
      '(unfavorable), if ΔS > 0 enough (favorable) and T is large enough, TΔS can ' +
      'OUTWEIGH ΔH, making ΔG negative overall. Four combinations: ΔH<0,ΔS>0 → always ' +
      'spontaneous. ΔH>0,ΔS<0 → never spontaneous. ΔH<0,ΔS<0 → spontaneous only at LOW T. ' +
      'ΔH>0,ΔS>0 → spontaneous only at HIGH T. The link to equilibrium: ΔG° = −RT ln K — ' +
      'a very negative ΔG° means K is huge (reaction goes essentially to completion).',
    targetedMisconceptions: [`${GIBBS}:MC1`],
    source: `${GIBBS_SRC} — Gibbs free energy, spontaneity criteria, ΔG°=−RTlnK`,
  },
  {
    conceptId: GIBBS,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The classic trap: "Exothermic reactions (ΔH<0) are always spontaneous." False! ' +
      'If ΔS is sufficiently negative and T is high, TΔS can outweigh a negative ΔH, ' +
      'making ΔG positive (non-spontaneous). Example: 2H₂(g) + O₂(g) → 2H₂O(l) is ' +
      'strongly exothermic (ΔH very negative) AND has ΔS very negative (3 mol gas → ' +
      '2 mol liquid, big entropy DECREASE) — at very high temperature, this reaction ' +
      'could theoretically become non-spontaneous. Second trap: "Spontaneous means fast." ' +
      'NO — spontaneity (ΔG<0) tells you the reaction is THERMODYNAMICALLY FAVORABLE, ' +
      'not that it happens quickly. Diamond → graphite is spontaneous (ΔG<0) but takes ' +
      'geological timescales because of a huge activation energy barrier (a KINETIC ' +
      'limitation, unrelated to thermodynamic favorability). Thermodynamics answers ' +
      '"can it happen?"; kinetics answers "how fast?"',
    targetedMisconceptions: [`${GIBBS}:MC1`, `${GIBBS}:MC2`],
    source: `${GIBBS_SRC} — misconception: exothermic = always spontaneous; spontaneous = fast`,
  },
]

const GIBBS_PROBES: SeedProbe[] = [
  {
    conceptId: GIBBS,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A reaction has ΔH = +40 kJ/mol and ΔS = +100 J/(mol·K). At what approximate temperature does it become spontaneous?',
    choices: [
      { text: 'Above 400 K — ΔG = ΔH − TΔS = 0 when T = ΔH/ΔS = 40000/100 = 400 K; above this, TΔS > ΔH making ΔG negative', isCorrect: true },
      { text: 'It is never spontaneous since ΔH is positive', isCorrect: false, misconceptionId: `${GIBBS}:MC1` },
      { text: 'It is always spontaneous since ΔS is positive', isCorrect: false, misconceptionId: `${GIBBS}:MC3` },
    ],
    correctValue: 'Above ~400 K',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GIBBS}:MC1`, `${GIBBS}:MC3`],
    source: `${GIBBS_SRC} — distractor targets "ΔH sign alone determines spontaneity" from both directions`,
  },
  {
    conceptId: GIBBS,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Diamond converting to graphite has ΔG < 0 (spontaneous) at room temperature, yet diamonds don\'t turn into graphite in your lifetime. Explain.',
    choices: [
      { text: 'Spontaneity (ΔG<0) only tells you the reaction is thermodynamically favorable, not how fast it happens — this reaction has an enormous activation energy barrier making it kinetically negligible', isCorrect: true },
      { text: 'The calculation must be wrong — if it were truly spontaneous, it would happen quickly', isCorrect: false, misconceptionId: `${GIBBS}:MC2` },
    ],
    correctValue: 'Spontaneous ≠ fast (kinetics vs thermodynamics)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GIBBS}:MC2`],
    source: `${GIBBS_SRC} — misconception: conflating thermodynamic spontaneity with reaction rate`,
  },
]

// ─── chem.thermo.third-law ───────────────────────────────────────────────────
const THIRDL = 'chem.thermo.third-law'
const THIRDL_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.third-law'

const THIRDL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: THIRDL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Unlike enthalpy (which has no absolute zero — we only measure ΔH), entropy DOES ' +
      'have a true zero point. The Third Law: a perfect crystal at 0 K has EXACTLY ZERO ' +
      'entropy (S=0). Why? At 0 K, all thermal motion stops, and a perfect crystal has ' +
      'only ONE possible arrangement (W=1 microstate) — so S = k_B ln(1) = 0. This gives ' +
      'us ABSOLUTE entropies: unlike ΔH (which needs a reference), we can calculate S° ' +
      'for any substance by measuring heat capacity from 0 K up to the temperature of ' +
      'interest and integrating: S°(T) = ∫(C_p/T)dT. This is why entropy tables list ' +
      'ABSOLUTE values (S° for O₂ gas = 205 J/mol·K) while enthalpy tables list ΔH°_f ' +
      '(relative to elements). Some substances have RESIDUAL entropy even at 0 K — ' +
      'CO has S(0)>0 because the crystal can freeze in a random C-O/O-C orientation ' +
      'mixture, so it\'s NOT a perfect single arrangement.',
    targetedMisconceptions: [`${THIRDL}:MC1`],
    source: `${THIRDL_SRC} — third law, absolute entropy, residual entropy, Kirchhoff's equation`,
  },
  {
    conceptId: THIRDL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Misconception: "Entropy tables and enthalpy tables work the same way — both use ' +
      'arbitrary reference points." FALSE. Enthalpy has no absolute zero — we always ' +
      'measure ΔH RELATIVE to elements in standard states (ΔH°_f of an element = 0 by ' +
      'convention, an arbitrary choice). But entropy has a TRUE physical zero (perfect ' +
      'crystal at 0 K), so entropy tables list ABSOLUTE values, not relative ones. This ' +
      'is why you\'ll see S°(O₂) = 205 J/(mol·K) as a standalone number, while ΔH°_f(O₂) = 0 ' +
      'by definition (it\'s already an element). Second trap: "All substances have zero ' +
      'entropy at 0 K." Only PERFECT crystals do. Glasses (amorphous solids, frozen in a ' +
      'disordered structure) and molecules with orientational disorder (like CO, N₂O) ' +
      'retain RESIDUAL entropy even at absolute zero because they never reach a single ' +
      'perfectly ordered microstate.',
    targetedMisconceptions: [`${THIRDL}:MC1`, `${THIRDL}:MC2`],
    source: `${THIRDL_SRC} — misconception: entropy uses arbitrary reference like enthalpy; all substances reach S=0`,
  },
]

const THIRDL_PROBES: SeedProbe[] = [
  {
    conceptId: THIRDL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Why can we tabulate ABSOLUTE standard entropies (S°) but only RELATIVE standard enthalpies of formation (ΔH°f)?',
    choices: [
      { text: 'The Third Law gives entropy a true zero point (perfect crystal at 0 K has S=0); enthalpy has no such natural zero, so we must define it relative to elements by convention', isCorrect: true },
      { text: 'It\'s an arbitrary historical convention with no physical justification', isCorrect: false, misconceptionId: `${THIRDL}:MC1` },
    ],
    correctValue: 'Third Law gives entropy a true zero',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${THIRDL}:MC1`],
    source: `${THIRDL_SRC} — distractor targets "arbitrary convention" (there is a physical basis)`,
  },
  {
    conceptId: THIRDL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Carbon monoxide (CO) has nonzero residual entropy at 0 K. Why doesn\'t it obey the simple Third Law prediction of S=0?',
    choices: [
      { text: 'CO crystals can freeze with molecules randomly oriented as C-O or O-C (nearly identical dipole moments), so the crystal isn\'t in a single perfectly ordered microstate — W>1 even at 0 K', isCorrect: true },
      { text: 'The Third Law only applies to elements, not compounds like CO', isCorrect: false, misconceptionId: `${THIRDL}:MC2` },
    ],
    correctValue: 'Orientational disorder in the crystal',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${THIRDL}:MC2`],
    source: `${THIRDL_SRC} — misconception: Third Law scope limited to elements`,
  },
]

// ─── chem.env.ozone ───────────────────────────────────────────────────────────
const OZONE = 'chem.env.ozone'
const OZONE_SRC = 'docs/chemistry/kg/graph.json — chem.env.ozone'

const OZONE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: OZONE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The CHAPMAN CYCLE naturally creates and destroys stratospheric ozone: UV splits ' +
      'O₂ → 2O; O + O₂ → O₃ (formation); UV splits O₃ → O₂ + O (destruction); ' +
      'O + O₃ → 2O₂ (destruction). Normally this cycle is in balance. CFCs (chlorofluorocarbons, ' +
      'once used in refrigerants/aerosols) disrupted it: UV breaks C-Cl bonds in the ' +
      'stratosphere, releasing Cl radicals. Cl acts as a CATALYST in a destructive cycle: ' +
      'Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂ (net: O₃ + O → 2O₂, and Cl is REGENERATED — ' +
      'one Cl atom can destroy ~100,000 ozone molecules before being removed). The POLAR ' +
      'VORTEX over Antarctica creates extremely cold conditions where polar stratospheric ' +
      'clouds form, providing surfaces that dramatically accelerate this chemistry each ' +
      'spring — creating the "ozone hole." The Montreal Protocol (1987) phased out CFCs ' +
      'globally, and the ozone layer is now recovering — one of humanity\'s clearest ' +
      'environmental success stories.',
    targetedMisconceptions: [`${OZONE}:MC1`],
    source: `${OZONE_SRC} — Chapman cycle, CFC catalytic destruction, polar vortex, Montreal Protocol`,
  },
  {
    conceptId: OZONE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Misconception: "One CFC molecule destroys one ozone molecule, so damage is ' +
      'proportional to CFC quantity released." Actually MUCH worse — Cl acts CATALYTICALLY, ' +
      'meaning it\'s regenerated after each destruction cycle and can destroy roughly ' +
      '100,000 ozone molecules before finally being removed from the stratosphere ' +
      '(by reacting with methane or other species to form stable HCl). This is why even ' +
      'small amounts of CFCs caused massive ozone depletion. Second trap: "The ozone hole ' +
      'is a permanent hole, like a puncture." No — it\'s a seasonal, cyclical depletion ' +
      '(worst in Antarctic spring, September-November) caused by the specific chemistry ' +
      'that requires polar stratospheric clouds (only present in extreme cold) plus ' +
      'returning sunlight to drive the photochemistry. It partially recovers each year ' +
      'as conditions change, and — thanks to the Montreal Protocol — the multi-decade ' +
      'trend is now improving.',
    targetedMisconceptions: [`${OZONE}:MC1`, `${OZONE}:MC2`],
    source: `${OZONE_SRC} — misconception: 1:1 CFC-ozone destruction; ozone hole is a permanent static hole`,
  },
]

const OZONE_PROBES: SeedProbe[] = [
  {
    conceptId: OZONE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is a single chlorine atom from CFC breakdown able to destroy roughly 100,000 ozone molecules?',
    choices: [
      { text: 'Cl acts as a catalyst — it is regenerated at the end of each destruction cycle (Cl+O₃→ClO+O₂; ClO+O→Cl+O₂) and can repeat the cycle many times before being removed', isCorrect: true },
      { text: 'One chlorine atom physically breaks apart 100,000 ozone molecules through direct collisions', isCorrect: false, misconceptionId: `${OZONE}:MC1` },
    ],
    correctValue: 'Catalytic regeneration',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${OZONE}:MC1`],
    source: `${OZONE_SRC} — distractor targets stoichiometric (1:1) misconception vs catalytic mechanism`,
  },
  {
    conceptId: OZONE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'The Antarctic ozone hole is worst in September-November (Antarctic spring) and partially recovers other times of year. What does this seasonal pattern tell you?',
    choices: [
      { text: 'The ozone hole is not a permanent static hole but a dynamic, cyclical depletion driven by conditions (polar stratospheric clouds forming in extreme cold + returning sunlight) that peak seasonally', isCorrect: true },
      { text: 'CFCs are only released into the atmosphere during Antarctic spring', isCorrect: false, misconceptionId: `${OZONE}:MC2` },
    ],
    correctValue: 'Seasonal/dynamic depletion, not a permanent static hole',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${OZONE}:MC2`],
    source: `${OZONE_SRC} — misconception: ozone hole is a permanent puncture rather than a cyclical phenomenon`,
  },
]

// ─── chem.atomic.electronic-config ───────────────────────────────────────────
const ECONF = 'chem.atomic.electronic-config'
const ECONF_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.electronic-config'

const ECONF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ECONF,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Electronic configuration is the "seating chart" of electrons in an atom, ' +
      'built with three rules. AUFBAU PRINCIPLE: fill lowest energy orbitals first ' +
      '(follow the (n+l) rule — 4s fills before 3d because 4s has lower n+l). ' +
      'PAULI EXCLUSION: max 2 electrons per orbital, and they must have opposite ' +
      'spin. HUND\'S RULE: within a sub-shell (like the three 2p orbitals), electrons ' +
      'spread out singly across all orbitals FIRST before any pairing up — this ' +
      'minimizes repulsion, like strangers on a bus spreading to empty rows before ' +
      'sitting next to someone. So carbon (6 electrons): 1s² 2s² 2p² means the two ' +
      '2p electrons go in DIFFERENT p orbitals (not paired), both spinning the same ' +
      'way. This single seating chart explains almost everything about an element\'s ' +
      'chemistry — how many bonds it forms, its position in the periodic table, its ' +
      'reactivity, all follow from where the OUTERMOST (valence) electrons sit.',
    targetedMisconceptions: [`${ECONF}:MC1`],
    source: `${ECONF_SRC} — Aufbau, Pauli exclusion, Hund's rule, filling order`,
  },
  {
    conceptId: ECONF,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Persistent trap: "Orbitals fill in strict numerical order: 1s, 2s, 2p, 3s, 3p, ' +
      '3d, 4s..." WRONG. The actual order follows increasing (n+l): 4s (n+l=4) fills ' +
      'BEFORE 3d (n+l=5), even though 3 < 4. That\'s why potassium is [Ar]4s¹, not ' +
      '[Ar]3d¹. This trips up almost every beginner. Use the diagonal filling ' +
      'rule/Madelung rule chart, not simple counting. Second trap, equally important: ' +
      '"When forming ions, remove electrons in the same order they were added ' +
      '(reverse Aufbau)." FALSE — for transition metals, once 3d electrons are ' +
      'present, 4s electrons are actually higher in energy and are removed FIRST ' +
      'when forming cations. So Fe (electron config [Ar]4s²3d⁶) loses electrons to ' +
      'form Fe²⁺ as [Ar]3d⁶ (both 4s electrons gone), NOT by removing 3d electrons ' +
      'first as naive reverse-filling would suggest.',
    targetedMisconceptions: [`${ECONF}:MC1`, `${ECONF}:MC2`],
    source: `${ECONF_SRC} — misconception: strict numerical filling order; ions lose electrons in reverse fill order`,
  },
]

const ECONF_PROBES: SeedProbe[] = [
  {
    conceptId: ECONF,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Which orbital fills BEFORE 3d in a ground-state atom?',
    choices: [
      { text: '4s — it has lower (n+l) value than 3d (4+0=4 vs 3+2=5), so it fills first despite having a higher principal quantum number', isCorrect: true },
      { text: 'Nothing — 3d always fills immediately after 3p since 3 comes before 4', isCorrect: false, misconceptionId: `${ECONF}:MC1` },
    ],
    correctValue: '4s',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ECONF}:MC1`],
    source: `${ECONF_SRC} — distractor targets strict numerical (not n+l) filling assumption`,
  },
  {
    conceptId: ECONF,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Iron\'s ground-state configuration is [Ar]4s²3d⁶. What is the configuration of Fe²⁺?',
    choices: [
      { text: '[Ar]3d⁶ — both 4s electrons are removed first when forming the cation, since 4s becomes higher energy than 3d once occupied', isCorrect: true },
      { text: '[Ar]4s²3d⁴ — electrons are removed from 3d first since it was filled last', isCorrect: false, misconceptionId: `${ECONF}:MC2` },
    ],
    correctValue: '[Ar]3d⁶',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ECONF}:MC2`],
    source: `${ECONF_SRC} — misconception: ions lose electrons in reverse of filling order`,
  },
]

// ─── chem.atomic.quantum-mech-model ──────────────────────────────────────────
const QMM = 'chem.atomic.quantum-mech-model'
const QMM_SRC = 'docs/chemistry/kg/graph.json — chem.atomic.quantum-mech-model'

const QMM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QMM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Bohr\'s model worked for hydrogen but broke everywhere else. Schrödinger\'s ' +
      'quantum mechanical model replaced fixed orbits with a WAVE EQUATION: Ĥψ = Eψ. ' +
      'Solving it gives ψ (the wavefunction) — and |ψ|² gives the PROBABILITY of ' +
      'finding the electron at any point. This naturally produces the quantum numbers ' +
      '(n, l, m_l) as mathematical solutions, not assumed postulates. Two foundational ' +
      'principles justify this shift: DE BROGLIE (1924) showed matter has wave ' +
      'properties (λ = h/mv) — if electrons are waves, they can\'t have a precise orbit, ' +
      'only a standing-wave pattern (which is exactly what an orbital shape represents). ' +
      'HEISENBERG UNCERTAINTY (1927): Δx·Δp ≥ h/4π — you fundamentally cannot know ' +
      'both position and momentum precisely simultaneously. This isn\'t a measurement ' +
      'limitation — it\'s built into reality at the quantum scale. Together these ' +
      'principles FORCE the probabilistic picture: orbitals, not orbits.',
    targetedMisconceptions: [`${QMM}:MC1`],
    source: `${QMM_SRC} — Schrödinger equation, de Broglie, Heisenberg uncertainty`,
  },
  {
    conceptId: QMM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Misconception: "Heisenberg uncertainty is just a limitation of our measuring ' +
      'instruments — with better technology we could measure both position and ' +
      'momentum precisely." FALSE. This is a fundamental property of nature, not an ' +
      'engineering problem. It arises from the wave nature of matter itself: a wave ' +
      'with a precisely defined wavelength (momentum) is necessarily spread out over ' +
      'all space (no defined position), and vice versa — this is mathematics, not ' +
      'instrument error. Second trap: "De Broglie\'s matter waves mean electrons ' +
      'physically oscillate like ocean waves." No — the "wave" is a PROBABILITY ' +
      'amplitude wave (ψ), not a physical undulation of the particle through space. ' +
      'The electron doesn\'t wiggle; the probability of finding it at different ' +
      'locations follows a wave pattern (which is why electron diffraction experiments ' +
      'show interference patterns — a purely wave phenomenon — even from single ' +
      'electrons sent one at a time).',
    targetedMisconceptions: [`${QMM}:MC1`, `${QMM}:MC2`],
    source: `${QMM_SRC} — misconception: uncertainty is measurement error; matter waves are physical oscillations`,
  },
]

const QMM_PROBES: SeedProbe[] = [
  {
    conceptId: QMM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'The Heisenberg Uncertainty Principle states that we cannot simultaneously know an electron\'s exact position and momentum. This is because:',
    choices: [
      { text: 'It is a fundamental property of quantum systems arising from wave-particle duality, not a limitation of measurement technology', isCorrect: true },
      { text: 'Our current instruments are not precise enough — future technology will overcome this limit', isCorrect: false, misconceptionId: `${QMM}:MC1` },
    ],
    correctValue: 'Fundamental property, not instrument limitation',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${QMM}:MC1`],
    source: `${QMM_SRC} — distractor targets "measurement limitation" misconception`,
  },
  {
    conceptId: QMM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Electron diffraction experiments show interference patterns even when electrons are sent one at a time through a double slit. What does this reveal about de Broglie\'s "matter waves"?',
    choices: [
      { text: 'Each individual electron behaves as a probability wave, interfering with itself statistically — the wave represents probability amplitude, not a physical oscillation of the particle', isCorrect: true },
      { text: 'Electrons must be physically vibrating as they travel through space, like tiny ocean waves', isCorrect: false, misconceptionId: `${QMM}:MC2` },
    ],
    correctValue: 'Wave = probability amplitude, not physical oscillation',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${QMM}:MC2`],
    source: `${QMM_SRC} — misconception: matter waves are literal physical undulations`,
  },
]

// ─── chem.period.modern-periodic-law ─────────────────────────────────────────
const MODPER = 'chem.period.modern-periodic-law'
const MODPER_SRC = 'docs/chemistry/kg/graph.json — chem.period.modern-periodic-law'

const MODPER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MODPER,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Moseley (1913) fixed Mendeleev\'s table by proving: properties of elements are ' +
      'a periodic function of ATOMIC NUMBER (not mass). This resolved every anomaly — ' +
      'Ar (Z=18) correctly comes before K (Z=19) even though Ar is slightly heavier, ' +
      'because we order by protons, not mass. The modern table\'s STRUCTURE directly ' +
      'reflects electron configuration: PERIODS (rows) = principal quantum number n ' +
      '(period 3 = elements filling n=3 orbitals). GROUPS (columns) = same number of ' +
      'valence electrons = similar chemistry (Group 1 alkali metals all have 1 valence ' +
      'electron, all form +1 ions). BLOCKS: s-block (Groups 1-2, filling s orbitals), ' +
      'p-block (Groups 13-18, filling p orbitals), d-block (transition metals, filling d), ' +
      'f-block (lanthanides/actinides, filling f). The table isn\'t arbitrary — it\'s a ' +
      'direct map of quantum mechanical electron filling, which is WHY elements in the ' +
      'same group behave similarly.',
    targetedMisconceptions: [`${MODPER}:MC1`],
    source: `${MODPER_SRC} — modern periodic law (atomic number), periods/groups/blocks structure`,
  },
  {
    conceptId: MODPER,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Elements in the same PERIOD (row) have similar chemistry because they\'re ' +
      'close together." FALSE — elements in the same GROUP (column) share chemistry, ' +
      'not the same period. Sodium (period 3, group 1) and chlorine (period 3, group 17) ' +
      'are in the SAME period but have wildly different properties (reactive metal vs. ' +
      'reactive nonmetal). Sodium and potassium (both group 1, different periods) share ' +
      'nearly identical chemistry (both form +1 ions, both react violently with water). ' +
      'The key insight: chemistry depends on VALENCE electron count and configuration ' +
      '(constant down a group), not on being physically "near" other elements on the ' +
      'chart. Second trap: "The periodic table is just a historical curiosity, ' +
      'memorized facts." No — it\'s a direct consequence of quantum mechanics; you can ' +
      'PREDICT an unknown element\'s properties just from its position, because position ' +
      'encodes electron configuration.',
    targetedMisconceptions: [`${MODPER}:MC1`],
    source: `${MODPER_SRC} — misconception: same period = similar chemistry (it's same group)`,
  },
]

const MODPER_PROBES: SeedProbe[] = [
  {
    conceptId: MODPER,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Sodium (Na) and potassium (K) share very similar chemical properties. This is because they:',
    choices: [
      { text: 'Are in the same GROUP (both Group 1) and therefore have the same number of valence electrons (1)', isCorrect: true },
      { text: 'Are in the same PERIOD and are therefore chemically similar', isCorrect: false, misconceptionId: `${MODPER}:MC1` },
      { text: 'Have similar atomic masses', isCorrect: false },
    ],
    correctValue: 'Same group, same valence electron count',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MODPER}:MC1`],
    source: `${MODPER_SRC} — distractor targets "same period = similar chemistry" misconception`,
  },
  {
    conceptId: MODPER,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why do sodium (Group 1, Period 3) and chlorine (Group 17, Period 3) have completely different chemical behavior despite being in the same period?',
    choices: [
      { text: 'They have very different numbers of valence electrons (1 vs 7) and therefore very different reactivity patterns — period position alone doesn\'t determine chemistry, group (valence electron count) does', isCorrect: true },
      { text: 'They can\'t actually be that different since they\'re in the same row of the table', isCorrect: false, misconceptionId: `${MODPER}:MC1` },
    ],
    correctValue: 'Different valence electron counts (different groups)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${MODPER}:MC1`],
    source: `${MODPER_SRC} — misconception: period proximity implies chemical similarity`,
  },
]

// ─── chem.period.periodic-properties ─────────────────────────────────────────
const PERPROP = 'chem.period.periodic-properties'
const PERPROP_SRC = 'docs/chemistry/kg/graph.json — chem.period.periodic-properties'

const PERPROP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PERPROP,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Atomic size, ionization energy, and electron affinity all trace back to ONE ' +
      'idea: EFFECTIVE NUCLEAR CHARGE (Z_eff) — how strongly the nucleus actually pulls ' +
      'on the outermost electrons after accounting for shielding by inner electrons. ' +
      'ACROSS a period (left to right): protons increase but shielding stays roughly ' +
      'constant (same shell) → Z_eff increases → electrons pulled in tighter → ATOMIC ' +
      'RADIUS DECREASES. DOWN a group: new shells add (more shielding) despite more ' +
      'protons → outer electrons are further from nucleus → RADIUS INCREASES. Same logic ' +
      'flips for IONIZATION ENERGY (energy to remove an electron): higher Z_eff = ' +
      'harder to remove = ionization energy INCREASES across a period, DECREASES down ' +
      'a group. Think of it as a tug-of-war: more protons pulling harder (across) vs. ' +
      'more distance and shielding weakening the pull (down).',
    targetedMisconceptions: [`${PERPROP}:MC1`],
    source: `${PERPROP_SRC} — atomic radius, ionization energy, electron affinity, Z_eff`,
  },
  {
    conceptId: PERPROP,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "More protons always means smaller atomic radius, everywhere on the ' +
      'table." Only true WITHIN a period. Down a group, protons increase too, but the ' +
      'radius INCREASES — because a whole new electron shell is added, and shielding ' +
      'from inner electrons dominates over the extra nuclear charge. You must separate ' +
      'the TWO trends (across vs. down) — they have opposite reasons. Second trap: ' +
      '"Cations are always smaller and anions always bigger than their parent atom, ' +
      'by the same logic in every case." True in general, but the MAGNITUDE varies: ' +
      'removing an electron from a full shell (like Na → Na⁺, removing the entire 3s ' +
      'shell) causes a HUGE radius drop, while removing an electron from a partially ' +
      'filled shell causes a smaller change. Always check WHICH shell is affected, not ' +
      'just count electrons.',
    targetedMisconceptions: [`${PERPROP}:MC1`, `${PERPROP}:MC2`],
    source: `${PERPROP_SRC} — misconception: more protons = smaller radius universally; ion size change is uniform`,
  },
]

const PERPROP_PROBES: SeedProbe[] = [
  {
    conceptId: PERPROP,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Lithium (Z=3) has a larger atomic radius than fluorine (Z=9), even though fluorine has more protons. Why?',
    choices: [
      { text: 'Fluorine has much higher effective nuclear charge (more protons, same shell, minimal extra shielding), pulling its valence electrons in much tighter than lithium\'s single valence electron', isCorrect: true },
      { text: 'More protons should always mean a larger radius since there\'s more nuclear material', isCorrect: false, misconceptionId: `${PERPROP}:MC3` },
    ],
    correctValue: 'Higher Z_eff in F pulls electrons in tighter',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PERPROP}:MC3`],
    source: `${PERPROP_SRC} — distractor targets "more protons = bigger atom" misconception`,
  },
  {
    conceptId: PERPROP,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Sodium\'s radius is 186 pm; Na⁺ is only 102 pm — a dramatic drop. Explain why the drop is so large.',
    choices: [
      { text: 'Removing Na\'s single valence electron eliminates the entire outermost (n=3) shell, so Na⁺ has one fewer occupied shell than Na — a structural change, not just "one less electron"', isCorrect: true },
      { text: 'Removing any single electron from any atom always causes approximately the same percentage radius decrease', isCorrect: false, misconceptionId: `${PERPROP}:MC2` },
    ],
    correctValue: 'Loss of an entire electron shell',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PERPROP}:MC2`],
    source: `${PERPROP_SRC} — misconception: ionization causes uniform radius change regardless of shell structure`,
  },
]

// ─── chem.equil.concept ──────────────────────────────────────────────────────
const EQCON = 'chem.equil.concept'
const EQCON_SRC = 'docs/chemistry/kg/graph.json — chem.equil.concept'

const EQCON_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EQCON,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Equilibrium is DYNAMIC, not static. In a closed system, forward and reverse ' +
      'reactions both keep happening — but at EQUAL RATES, so concentrations stop ' +
      'changing (even though molecules keep converting back and forth constantly). ' +
      'Think of a busy escalator: people keep going up and down, but if the number ' +
      'going up equals the number going down each minute, the crowd size on each floor ' +
      'stays constant — that\'s equilibrium, not "nothing happening." Equilibrium can ' +
      'be reached from EITHER direction — start with pure reactants or pure products, ' +
      'you\'ll reach the SAME equilibrium composition (at the same temperature). This is ' +
      'only possible in a CLOSED system — an open system (where products escape, like ' +
      'CO₂ bubbling out of an open beaker) never reaches true equilibrium. Signs you\'re ' +
      'at equilibrium: constant color, constant pressure, constant concentrations — ' +
      'but the REACTION hasn\'t stopped, it\'s just balanced.',
    targetedMisconceptions: [`${EQCON}:MC1`],
    source: `${EQCON_SRC} — dynamic equilibrium concept, reversibility, closed system requirement`,
  },
  {
    conceptId: EQCON,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The single most damaging misconception in this topic: "Equilibrium means the ' +
      'reaction has stopped." Absolutely not — both forward and reverse reactions are ' +
      'still happening at full speed, they\'re just happening at EQUAL rates so no NET ' +
      'change is observable. If you could tag molecules with radioactive isotopes, ' +
      'you\'d see constant interconversion even at "equilibrium." Second trap: ' +
      '"Equilibrium means equal concentrations of reactants and products." FALSE — ' +
      'equilibrium means CONSTANT concentrations, which could be 99% reactants and 1% ' +
      'product (equilibrium lies far left) or the reverse. The RATIO is fixed by K, ' +
      'not by any rule that it must be 50/50. A reaction can be "at equilibrium" while ' +
      'still being almost entirely reactants, if K is very small.',
    targetedMisconceptions: [`${EQCON}:MC1`, `${EQCON}:MC2`],
    source: `${EQCON_SRC} — misconception: equilibrium = reaction stopped; equilibrium = equal concentrations`,
  },
]

const EQCON_PROBES: SeedProbe[] = [
  {
    conceptId: EQCON,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A reaction reaches equilibrium in a sealed flask. What is actually happening at the molecular level?',
    choices: [
      { text: 'Forward and reverse reactions continue at equal rates, so concentrations appear constant even though molecules keep converting', isCorrect: true },
      { text: 'All reactions have completely stopped — no molecules are converting in either direction', isCorrect: false, misconceptionId: `${EQCON}:MC1` },
      { text: 'The concentrations of reactants and products have become exactly equal', isCorrect: false, misconceptionId: `${EQCON}:MC2` },
    ],
    correctValue: 'Forward/reverse continue at equal rates',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EQCON}:MC1`, `${EQCON}:MC2`],
    source: `${EQCON_SRC} — distractor targets "reaction stopped" and "equal concentrations" misconceptions`,
  },
  {
    conceptId: EQCON,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A reaction at equilibrium has 95% reactants and 5% products. Is this truly "at equilibrium"?',
    choices: [
      { text: 'Yes — equilibrium means constant concentrations over time, not equal concentrations; K is simply small for this reaction, meaning it favors reactants heavily', isCorrect: true },
      { text: 'No — true equilibrium requires roughly equal amounts of reactants and products', isCorrect: false, misconceptionId: `${EQCON}:MC2` },
    ],
    correctValue: 'Yes — equilibrium ≠ equal concentrations',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${EQCON}:MC2`],
    source: `${EQCON_SRC} — misconception: equilibrium requires roughly equal concentrations`,
  },
]

// ─── chem.equil.kc-kp ────────────────────────────────────────────────────────
const KCKP = 'chem.equil.kc-kp'
const KCKP_SRC = 'docs/chemistry/kg/graph.json — chem.equil.kc-kp'

const KCKP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KCKP,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The equilibrium constant K quantifies WHERE equilibrium lies — a fixed number ' +
      '(at a given temperature) equal to [products]^coeff / [reactants]^coeff at ' +
      'equilibrium. K_c uses concentrations (mol/L); K_p uses partial pressures (for ' +
      'gases) — connected by K_p = K_c(RT)^Δn. LARGE K (>>1) means products dominate at ' +
      'equilibrium (reaction goes essentially to completion). SMALL K (<<1) means ' +
      'reactants dominate (reaction barely proceeds). K depends ONLY on TEMPERATURE — ' +
      'not on initial concentrations, not on catalysts, not on pressure changes (though ' +
      'those can shift WHERE equilibrium lands, K itself stays fixed at constant T). ' +
      'Pure solids and liquids are OMITTED from K expressions (their "concentration" — ' +
      'density — doesn\'t change). The REACTION QUOTIENT Q uses the SAME formula but with ' +
      'CURRENT (non-equilibrium) concentrations — comparing Q to K tells you which ' +
      'direction the reaction will shift (Q<K → forward; Q>K → reverse).',
    targetedMisconceptions: [`${KCKP}:MC1`],
    source: `${KCKP_SRC} — Kc, Kp, relationship, temperature dependence, reaction quotient`,
  },
  {
    conceptId: KCKP,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Critical trap: "Adding a catalyst changes K." FALSE. A catalyst speeds up BOTH ' +
      'forward and reverse reactions EQUALLY, so equilibrium is reached FASTER but the ' +
      'equilibrium position (and K) is completely unchanged. Catalysts affect kinetics, ' +
      'not thermodynamics. Second trap: "Adding more reactant changes K." Also false — ' +
      'adding reactant shifts the POSITION of equilibrium (more product forms, per Le ' +
      'Chatelier), but the VALUE of K stays the same because the new equilibrium state ' +
      'still satisfies the same ratio. Only TEMPERATURE changes K (since K relates to ' +
      'ΔG° via ΔG° = −RT ln K, and ΔG° itself is temperature-dependent). Third trap: ' +
      '"Solid reactants/products should appear in K expressions with their molar ' +
      'concentration." No — pure solids and liquids have essentially constant "activity" ' +
      '(effectively 1), so they\'re omitted entirely from K expressions, not included ' +
      'as a fixed number.',
    targetedMisconceptions: [`${KCKP}:MC1`, `${KCKP}:MC2`],
    source: `${KCKP_SRC} — misconception: catalysts/concentration changes affect K (only temperature does)`,
  },
]

const KCKP_PROBES: SeedProbe[] = [
  {
    conceptId: KCKP,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Adding a catalyst to a reaction at equilibrium will:',
    choices: [
      { text: 'Have no effect on K or the equilibrium position — it speeds up both forward and reverse rates equally, reaching equilibrium faster but not changing it', isCorrect: true },
      { text: 'Increase K by making the forward reaction proceed faster than the reverse', isCorrect: false, misconceptionId: `${KCKP}:MC1` },
      { text: 'Shift equilibrium toward products since catalysts favor product formation', isCorrect: false, misconceptionId: `${KCKP}:MC1` },
    ],
    correctValue: 'No effect on K or equilibrium position',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KCKP}:MC1`],
    source: `${KCKP_SRC} — distractor targets "catalyst affects K" misconception`,
  },
  {
    conceptId: KCKP,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'For the reaction CaCO₃(s) ⇌ CaO(s) + CO₂(g), why does the equilibrium expression only include [CO₂] and not CaCO₃ or CaO?',
    choices: [
      { text: 'Pure solids have constant activity (effectively 1) regardless of the amount present, so they are omitted from the K expression entirely', isCorrect: true },
      { text: 'Solids are simply included as a fixed constant value equal to their molar mass', isCorrect: false, misconceptionId: `${KCKP}:MC3` },
    ],
    correctValue: 'Pure solids/liquids are omitted (constant activity)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KCKP}:MC3`],
    source: `${KCKP_SRC} — misconception: solids included as a fixed numeric term rather than omitted`,
  },
]

// ─── chem.equil.kw-ph ────────────────────────────────────────────────────────
const KWPH = 'chem.equil.kw-ph'
const KWPH_SRC = 'docs/chemistry/kg/graph.json — chem.equil.kw-ph'

const KWPH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KWPH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Even "pure" water ionizes slightly: H₂O ⇌ H⁺ + OH⁻ (or more accurately, ' +
      '2H₂O ⇌ H₃O⁺ + OH⁻). At 25°C, K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴. Since pure water ' +
      'produces equal H⁺ and OH⁻, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M — this defines NEUTRAL. ' +
      'pH = −log[H⁺] compresses this huge range into a workable scale: pH 7 is neutral, ' +
      '<7 is acidic (more H⁺), >7 is basic (more OH⁻, less H⁺). K_w is a CONSTANT at a ' +
      'given temperature — in ANY aqueous solution, [H⁺][OH⁻] always equals K_w. So if ' +
      'you know [H⁺], you automatically know [OH⁻] = K_w/[H⁺]. Adding acid increases ' +
      '[H⁺], which (to keep the product constant) forces [OH⁻] DOWN — acid and base ' +
      'aren\'t independent, they\'re coupled through this single equilibrium. K_w ' +
      'increases with temperature (water\'s self-ionization is endothermic), so neutral ' +
      'pH is actually LESS than 7 at higher temperatures.',
    targetedMisconceptions: [`${KWPH}:MC1`],
    source: `${KWPH_SRC} — Kw, pH scale, neutral point, temperature dependence`,
  },
  {
    conceptId: KWPH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Big trap: "Neutral pH is always exactly 7, at any temperature." FALSE — pH 7 is ' +
      'neutral only at 25°C. Water\'s self-ionization is endothermic, so heating water ' +
      'increases K_w, meaning MORE H⁺ and OH⁻ form (equally, so it\'s still neutral) but ' +
      'at a HIGHER concentration — giving a LOWER pH for "neutral" at higher temperature ' +
      '(e.g., neutral pH ≈ 6.14 at 50°C, still equal [H⁺]=[OH⁻], just not 7). "Neutral" ' +
      'is defined by [H⁺]=[OH⁻], NOT by "pH=7" as an absolute rule. Second trap: "Acids ' +
      'have zero OH⁻ ions." False — even strongly acidic solutions contain SOME OH⁻ ' +
      '(vanishingly small, but never truly zero, because K_w must always be satisfied). ' +
      'A pH=1 solution ([H⁺]=0.1M) still has [OH⁻] = 10⁻¹⁴/0.1 = 10⁻¹³ M — tiny but ' +
      'nonzero.',
    targetedMisconceptions: [`${KWPH}:MC1`, `${KWPH}:MC2`],
    source: `${KWPH_SRC} — misconception: neutral pH is always exactly 7; acids have zero OH⁻`,
  },
]

const KWPH_PROBES: SeedProbe[] = [
  {
    conceptId: KWPH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'At 50°C, Kw increases to 5.5×10⁻¹⁴ (from 1.0×10⁻¹⁴ at 25°C). What is the pH of NEUTRAL water at 50°C?',
    choices: [
      { text: 'About 6.63 — [H⁺]=[OH⁻]=√Kw=√(5.5×10⁻¹⁴)≈2.35×10⁻⁷, so pH=−log(2.35×10⁻⁷)≈6.63 (still neutral despite pH<7)', isCorrect: true },
      { text: 'Exactly 7.00 — neutral water always has pH 7 regardless of temperature', isCorrect: false, misconceptionId: `${KWPH}:MC1` },
    ],
    correctValue: '≈6.63 (still neutral, [H+]=[OH-])',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KWPH}:MC1`],
    source: `${KWPH_SRC} — distractor targets "neutral = pH 7 always" misconception`,
  },
  {
    conceptId: KWPH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does a strongly acidic solution (pH=1) contain ANY hydroxide ions (OH⁻)?',
    choices: [
      { text: 'Yes — a tiny but nonzero amount. Since [H+][OH-] = Kw always holds, [OH-] = Kw/[H+] = 10⁻¹⁴/0.1 = 10⁻¹³ M', isCorrect: true },
      { text: 'No — acidic solutions contain zero hydroxide ions by definition', isCorrect: false, misconceptionId: `${KWPH}:MC2` },
    ],
    correctValue: 'Yes — tiny nonzero amount',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KWPH}:MC2`],
    source: `${KWPH_SRC} — misconception: acids have absolutely zero OH⁻`,
  },
]

// ─── chem.kinet.mechanism ────────────────────────────────────────────────────
const MECH = 'chem.kinet.mechanism'
const MECH_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.mechanism'

const MECH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MECH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A balanced equation shows the overall transformation, but rarely the ACTUAL ' +
      'molecular process. A reaction MECHANISM breaks it into ELEMENTARY STEPS — each ' +
      'representing one actual molecular collision or rearrangement. Species that appear ' +
      'in intermediate steps but cancel out overall are INTERMEDIATES (formed then ' +
      'consumed — never appear in the overall equation). The RATE-DETERMINING STEP (RDS) ' +
      'is the SLOWEST elementary step — like a highway with one narrow bridge, the ' +
      'overall traffic flow rate is set by the bottleneck, not the fast sections. The ' +
      'RDS\'s stoichiometry directly gives the experimental rate law (for elementary ' +
      'steps ONLY, unlike overall equations). A valid mechanism must: (1) sum to the ' +
      'overall balanced equation, (2) have elementary steps consistent with molecularity ' +
      '(unimolecular, bimolecular — termolecular is very rare, requiring 3 simultaneous ' +
      'collisions), (3) predict the experimentally observed rate law via its RDS.',
    targetedMisconceptions: [`${MECH}:MC1`],
    source: `${MECH_SRC} — reaction mechanisms, intermediates, rate-determining step`,
  },
  {
    conceptId: MECH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "A catalyst appears in the overall balanced equation." No — like ' +
      'intermediates, catalysts are CONSUMED in an early step and REGENERATED in a ' +
      'later step, so they cancel out of the overall equation too. The difference: ' +
      'an intermediate is FORMED then consumed (appears as a product first, then ' +
      'reactant); a catalyst is CONSUMED then regenerated (appears as a reactant first, ' +
      'then product). Both are invisible in the overall equation but both are essential ' +
      'to the mechanism — check the mechanism steps, not the overall equation, to find ' +
      'them. Second trap: "Multiple mechanisms could equally well explain the same rate ' +
      'law, so mechanism determination is arbitrary/unfalsifiable." Partially true — ' +
      'multiple mechanisms CAN be consistent with one rate law, which is why chemists ' +
      'say a mechanism is never "proven," only "not yet disproven" — but mechanisms are ' +
      'tested against MULTIPLE lines of evidence (isotope labeling, intermediate ' +
      'detection, stereochemistry) that can rule out incorrect proposals.',
    targetedMisconceptions: [`${MECH}:MC1`, `${MECH}:MC2`],
    source: `${MECH_SRC} — misconception: catalysts appear in overall equation; mechanisms are arbitrary`,
  },
]

const MECH_PROBES: SeedProbe[] = [
  {
    conceptId: MECH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In a two-step mechanism, Step 1: A + B → C (slow); Step 2: C → D (fast). What is the experimental rate law?',
    choices: [
      { text: 'rate = k[A][B] — the rate-determining step (slowest, Step 1) sets the overall rate, and its molecularity gives the rate law directly', isCorrect: true },
      { text: 'rate = k[C] — the rate law comes from the fast step since that\'s what produces the final product', isCorrect: false, misconceptionId: `${MECH}:MC3` },
      { text: 'rate = k[A][B][C] — include all species from both steps', isCorrect: false },
    ],
    correctValue: 'rate = k[A][B]',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MECH}:MC3`],
    source: `${MECH_SRC} — distractor targets "fast step determines rate" misconception`,
  },
  {
    conceptId: MECH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A proposed mechanism includes a catalyst X. Should X appear in the overall balanced equation for the reaction?',
    choices: [
      { text: 'No — X is consumed in an early step and regenerated in a later step, so it cancels out of the overall equation, just like an intermediate cancels out (but in the opposite order: reactant-then-product vs. product-then-reactant)', isCorrect: true },
      { text: 'Yes — catalysts must appear in the overall equation since they participate directly in the reaction', isCorrect: false, misconceptionId: `${MECH}:MC1` },
    ],
    correctValue: 'No — catalysts cancel out like intermediates',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MECH}:MC1`],
    source: `${MECH_SRC} — misconception: catalysts show up in the overall stoichiometric equation`,
  },
]

// ─── chem.kinet.integrated-rate ──────────────────────────────────────────────
const INTRATE = 'chem.kinet.integrated-rate'
const INTRATE_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.integrated-rate'

const INTRATE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INTRATE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The differential rate law (rate = k[A]^n) tells you the SPEED at any instant, ' +
      'but doesn\'t directly give concentration at a future time. INTEGRATING solves ' +
      'this. For ZERO ORDER: [A] = [A]₀ − kt (linear decrease — plot [A] vs t is a ' +
      'straight line). For FIRST ORDER: ln[A] = ln[A]₀ − kt (plot ln[A] vs t is linear); ' +
      'half-life t½ = 0.693/k — CONSTANT, independent of starting concentration (this ' +
      'is the special hallmark of first-order kinetics, used for radioactive decay and ' +
      'many drug elimination processes). For SECOND ORDER: 1/[A] = 1/[A]₀ + kt (plot ' +
      '1/[A] vs t is linear); half-life DEPENDS on starting concentration ' +
      '(t½ = 1/(k[A]₀)) — gets LONGER as reaction proceeds and concentration drops. ' +
      'The PRACTICAL use: plot your data three ways (linear, ln, reciprocal) — whichever ' +
      'gives a straight line reveals the reaction order, and the slope gives you k.',
    targetedMisconceptions: [`${INTRATE}:MC1`],
    source: `${INTRATE_SRC} — integrated rate laws, half-life formulas by order`,
  },
  {
    conceptId: INTRATE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Big trap: "Half-life is always constant, regardless of reaction order." FALSE — ' +
      'this is ONLY true for first-order reactions. For zero order, half-life DECREASES ' +
      'as the reaction proceeds (t½ = [A]₀/2k — smaller [A]₀ means smaller t½, so ' +
      'successive half-lives get SHORTER). For second order, half-life INCREASES as the ' +
      'reaction proceeds (t½ = 1/(k[A]₀) — as [A]₀ decreases each round, t½ grows). ' +
      'This constant-half-life property is UNIQUE to first order and is exactly why it\'s ' +
      'used to identify first-order kinetics experimentally (radioactive decay always ' +
      'shows constant half-life — that\'s strong evidence it\'s first order). Second trap: ' +
      '"You determine reaction order by looking at the balanced equation exponents." As ' +
      'covered before — always experimental, never assumed from stoichiometry, even ' +
      'when choosing which integrated rate law to test.',
    targetedMisconceptions: [`${INTRATE}:MC1`],
    source: `${INTRATE_SRC} — misconception: constant half-life applies to all reaction orders`,
  },
]

const INTRATE_PROBES: SeedProbe[] = [
  {
    conceptId: INTRATE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A radioactive isotope has a half-life of 10 days regardless of how much sample you start with. This constant half-life property indicates the decay is:',
    choices: [
      { text: 'First order — constant half-life independent of starting concentration is the defining signature of first-order kinetics', isCorrect: true },
      { text: 'Zero order — the amount decreasing at a constant rate implies zero order', isCorrect: false, misconceptionId: `${INTRATE}:MC2` },
      { text: 'It could be any order — half-life is always constant regardless of order', isCorrect: false, misconceptionId: `${INTRATE}:MC1` },
    ],
    correctValue: 'First order',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${INTRATE}:MC1`, `${INTRATE}:MC2`],
    source: `${INTRATE_SRC} — distractor targets "half-life always constant" and "constant decrease = zero order" misconceptions`,
  },
  {
    conceptId: INTRATE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'For a second-order reaction, does each successive half-life get longer, shorter, or stay the same as the reaction proceeds?',
    choices: [
      { text: 'Longer — t½ = 1/(k[A]) depends inversely on the current concentration, and as [A] decreases through the reaction, each successive half-life takes more time', isCorrect: true },
      { text: 'Stays the same — half-life is always constant for any reaction order, just like first order', isCorrect: false, misconceptionId: `${INTRATE}:MC1` },
    ],
    correctValue: 'Longer (increasing half-lives)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${INTRATE}:MC1`],
    source: `${INTRATE_SRC} — misconception: applying first-order constant-half-life property universally`,
  },
]

// ─── chem.kinet.catalysis ────────────────────────────────────────────────────
const CATAL = 'chem.kinet.catalysis'
const CATAL_SRC = 'docs/chemistry/kg/graph.json — chem.kinet.catalysis'

const CATAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CATAL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A catalyst speeds up a reaction by providing an ALTERNATIVE PATHWAY with lower ' +
      'activation energy — it does NOT get consumed overall (it\'s regenerated at the ' +
      'end) and does NOT change ΔH or K (only kinetics, not thermodynamics — covered ' +
      'earlier). HOMOGENEOUS catalysis: catalyst is in the SAME phase as reactants ' +
      '(dissolved acid catalyzing an ester hydrolysis in solution) — works by forming a ' +
      'reactive intermediate. HETEROGENEOUS catalysis: catalyst is in a DIFFERENT phase ' +
      '(solid catalyst, gas reactants — like the solid Pt/Pd/Rh in a car\'s catalytic ' +
      'converter) — works through ADSORPTION: reactant molecules stick to the catalyst ' +
      'surface, weakening their own bonds and aligning them favorably for reaction, then ' +
      'products desorb. ENZYMES are biological catalysts — highly specific (lock-and-key ' +
      'or induced-fit binding to a substrate), can accelerate reactions by factors of ' +
      'millions to trillions, and are themselves proteins that fold to create precisely ' +
      'shaped active sites.',
    targetedMisconceptions: [`${CATAL}:MC1`],
    source: `${CATAL_SRC} — homogeneous/heterogeneous catalysis, enzymes, mechanism`,
  },
  {
    conceptId: CATAL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "A catalyst makes a non-spontaneous reaction happen." FALSE — a catalyst ' +
      'can ONLY speed up a reaction that is already thermodynamically favorable (ΔG<0). ' +
      'It cannot make ΔG negative if it wasn\'t already; it just gets you to the (already ' +
      'favorable) equilibrium faster. If a reaction is non-spontaneous, no catalyst will ' +
      'make it happen spontaneously — you\'d need to supply energy (couple it to another ' +
      'reaction, apply electricity, etc.), which is a fundamentally different intervention. ' +
      'Second trap: "More catalyst always means a proportionally faster reaction, without ' +
      'limit." For heterogeneous catalysis, rate depends on available SURFACE AREA — once ' +
      'all reactant molecules are adsorbed onto available catalyst sites, adding MORE ' +
      'catalyst (without more surface area exposed) won\'t help further; the rate can ' +
      'plateau (saturation kinetics), similar to enzyme kinetics reaching V_max.',
    targetedMisconceptions: [`${CATAL}:MC1`, `${CATAL}:MC2`],
    source: `${CATAL_SRC} — misconception: catalysts enable non-spontaneous reactions; unlimited rate increase with more catalyst`,
  },
]

const CATAL_PROBES: SeedProbe[] = [
  {
    conceptId: CATAL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A reaction has ΔG = +50 kJ/mol (non-spontaneous). Can a catalyst make this reaction proceed spontaneously?',
    choices: [
      { text: 'No — a catalyst only lowers activation energy to speed up an already-favorable reaction; it cannot change ΔG or make a non-spontaneous reaction spontaneous', isCorrect: true },
      { text: 'Yes — a sufficiently effective catalyst can overcome any thermodynamic barrier', isCorrect: false, misconceptionId: `${CATAL}:MC1` },
    ],
    correctValue: 'No — catalysts cannot change thermodynamic favorability',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CATAL}:MC1`],
    source: `${CATAL_SRC} — distractor targets "catalysts make anything happen" misconception`,
  },
  {
    conceptId: CATAL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In a heterogeneous catalytic reaction, doubling the amount of solid catalyst (while keeping surface area exposed to reactants the same, e.g. by stacking pellets) has what effect on rate?',
    choices: [
      { text: 'Little to no effect — heterogeneous catalysis depends on available SURFACE AREA in contact with reactants, not the bulk quantity of catalyst material', isCorrect: true },
      { text: 'The rate doubles — more catalyst always proportionally speeds up the reaction', isCorrect: false, misconceptionId: `${CATAL}:MC2` },
    ],
    correctValue: 'Little effect (surface area matters, not bulk amount)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CATAL}:MC2`],
    source: `${CATAL_SRC} — misconception: catalyst quantity (not surface area) determines rate enhancement`,
  },
]

// ─── chem.surface.adsorption ─────────────────────────────────────────────────
const ADSORB = 'chem.surface.adsorption'
const ADSORB_SRC = 'docs/chemistry/kg/graph.json — chem.surface.adsorption'

const ADSORB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ADSORB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Adsorption is molecules sticking to a SURFACE (different from absorption, where ' +
      'molecules penetrate INTO the bulk — activated charcoal ADSORBS gases onto its ' +
      'surface, while a sponge ABSORBS water into its structure). Two types: PHYSISORPTION ' +
      '(weak van der Waals forces, low heat release ~20-40 kJ/mol, reversible, multilayer ' +
      'possible, not very selective, decreases with temperature) and CHEMISORPTION ' +
      '(actual chemical bonds form, much higher heat release ~80-400 kJ/mol, often ' +
      'irreversible, strictly monolayer, highly selective/specific to certain surfaces, ' +
      'INCREASES with temperature initially since bond formation needs some activation ' +
      'energy). Adsorption depends on SURFACE AREA — that\'s why activated charcoal is ' +
      'porous (huge internal surface area per gram, ~500-1500 m²/g) and why catalysts are ' +
      'often finely divided or supported on porous materials. This underlies gas masks, ' +
      'water purification, and heterogeneous catalysis.',
    targetedMisconceptions: [`${ADSORB}:MC1`],
    source: `${ADSORB_SRC} — adsorption vs absorption, physisorption vs chemisorption`,
  },
  {
    conceptId: ADSORB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Common confusion: "Adsorption and absorption are the same process, just spelled ' +
      'differently." No — they describe fundamentally different locations. Adsorption is ' +
      'a SURFACE phenomenon (molecules accumulate ON the surface, 2D-like); absorption is ' +
      'a BULK phenomenon (molecules distribute THROUGHOUT the material, 3D). Silica gel ' +
      'packets in shoe boxes ADSORB moisture onto their vast internal surface; a paper ' +
      'towel ABSORBS spilled water into its fibers. Second trap: "All adsorption weakens ' +
      'with increasing temperature, following simple physical intuition." Only true for ' +
      'PHYSISORPTION (van der Waals forces weaken with more thermal agitation). ' +
      'CHEMISORPTION often INCREASES initially with temperature because forming actual ' +
      'chemical bonds requires activation energy — heat helps overcome this barrier, up ' +
      'to a point, before eventually decreasing at very high temperatures as bonds start ' +
      'breaking (desorption dominates).',
    targetedMisconceptions: [`${ADSORB}:MC1`, `${ADSORB}:MC2`],
    source: `${ADSORB_SRC} — misconception: adsorption = absorption; all adsorption decreases with temperature`,
  },
]

const ADSORB_PROBES: SeedProbe[] = [
  {
    conceptId: ADSORB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Silica gel packets placed in a shoebox absorb moisture from the air onto their porous surface. This process is more accurately called:',
    choices: [
      { text: 'Adsorption — moisture molecules accumulate ON the vast internal surface of the porous silica, not distributed throughout its bulk structure', isCorrect: true },
      { text: 'Absorption — since the packet takes up moisture from its surroundings, the terms are interchangeable', isCorrect: false, misconceptionId: `${ADSORB}:MC1` },
    ],
    correctValue: 'Adsorption (surface phenomenon)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ADSORB}:MC1`],
    source: `${ADSORB_SRC} — distractor targets conflating adsorption with absorption`,
  },
  {
    conceptId: ADSORB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A gas undergoing chemisorption on a metal surface shows increasing adsorption as temperature rises from 25°C to 150°C, unlike typical physisorption. Why?',
    choices: [
      { text: 'Chemisorption involves forming actual chemical bonds, which requires activation energy — moderate heating helps overcome this barrier, unlike physisorption\'s weak van der Waals forces which simply weaken with more thermal agitation', isCorrect: true },
      { text: 'This is impossible — all forms of adsorption must decrease with increasing temperature without exception', isCorrect: false, misconceptionId: `${ADSORB}:MC2` },
    ],
    correctValue: 'Chemisorption requires activation energy, unlike physisorption',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ADSORB}:MC2`],
    source: `${ADSORB_SRC} — misconception: all adsorption behaves like physisorption (monotonic decrease with T)`,
  },
]

// ─── chem.thermo.cell-thermo ──────────────────────────────────────────────────
const CELLTH = 'chem.thermo.cell-thermo'
const CELLTH_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.cell-thermo'

const CELLTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CELLTH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Electrochemistry links THREE thermodynamic quantities through one bridge equation: ' +
      'ΔG° = −nFE°_cell (n = moles of electrons transferred, F = Faraday constant ' +
      '96,485 C/mol). A POSITIVE cell potential (E°>0) means a NEGATIVE ΔG° (spontaneous) ' +
      '— this is why a battery with positive voltage can do work spontaneously. This also ' +
      'connects to K via the earlier relation ΔG° = −RT ln K, giving: E°_cell = ' +
      '(RT/nF) ln K — a cell\'s voltage directly tells you the equilibrium constant of its ' +
      'underlying redox reaction. The NERNST EQUATION extends this to NON-standard ' +
      'conditions: E = E° − (RT/nF) ln Q — as the reaction proceeds and Q approaches K, E ' +
      'approaches zero (a "dead" battery is one that has REACHED equilibrium, Q=K, E=0 — ' +
      'no more driving force). Temperature dependence of E° connects to ΔS° via ' +
      '(∂E°/∂T) = ΔS°/nF — measuring how voltage changes with temperature reveals the ' +
      'entropy change of the cell reaction.',
    targetedMisconceptions: [`${CELLTH}:MC1`],
    source: `${CELLTH_SRC} — ΔG°=−nFE°, Nernst equation, E°-K relationship`,
  },
  {
    conceptId: CELLTH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "A dead battery (E=0) means the reactants are completely used up." FALSE — ' +
      'a dead battery has reached EQUILIBRIUM (Q=K), which typically still has substantial ' +
      'reactant AND product present (unless K is extremely large). E=0 doesn\'t mean ' +
      '"empty," it means "no more driving force for net current flow" — forward and ' +
      'reverse electron transfer rates have become equal, just like chemical equilibrium. ' +
      'Second trap: "A more negative ΔG° always means a bigger cell voltage." Not exactly ' +
      '— the relationship ΔG° = −nFE° means voltage ALSO depends on n (electrons ' +
      'transferred). A reaction with very negative ΔG° but large n could have a smaller ' +
      'E° than a reaction with less negative ΔG° but smaller n. Always account for n when ' +
      'comparing ΔG° values to voltages across different reactions.',
    targetedMisconceptions: [`${CELLTH}:MC1`, `${CELLTH}:MC2`],
    source: `${CELLTH_SRC} — misconception: dead battery = reactants exhausted; ΔG° and E° comparisons ignore n`,
  },
]

const CELLTH_PROBES: SeedProbe[] = [
  {
    conceptId: CELLTH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A battery reads E = 0 V (dead). What does this tell you about the reactants inside?',
    choices: [
      { text: 'The cell reaction has reached equilibrium (Q=K) — substantial reactant may still remain, but there is no more net driving force for current flow', isCorrect: true },
      { text: 'All the original reactants have been completely consumed', isCorrect: false, misconceptionId: `${CELLTH}:MC1` },
    ],
    correctValue: 'Reached equilibrium, not necessarily depleted',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CELLTH}:MC1`],
    source: `${CELLTH_SRC} — distractor targets "dead battery = empty" misconception`,
  },
  {
    conceptId: CELLTH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Reaction A has ΔG° = −200 kJ/mol with n=4 electrons transferred. Reaction B has ΔG° = −100 kJ/mol with n=1. Which has the larger cell potential E°?',
    choices: [
      { text: 'Reaction B — E° = −ΔG°/(nF); despite A having more negative ΔG°, dividing by n=4 gives a smaller E° than B\'s division by n=1', isCorrect: true },
      { text: 'Reaction A — more negative ΔG° always means a larger E° regardless of n', isCorrect: false, misconceptionId: `${CELLTH}:MC2` },
    ],
    correctValue: 'Reaction B (smaller n gives larger E° here)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CELLTH}:MC2`],
    source: `${CELLTH_SRC} — misconception: comparing ΔG° directly to E° while ignoring n`,
  },
]

// ─── chem.period.ionization-energy ───────────────────────────────────────────
const IONE = 'chem.period.ionization-energy'
const IONE_SRC = 'docs/chemistry/kg/graph.json — chem.period.ionization-energy'

const IONE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IONE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Ionization energy (IE) is the energy needed to remove an electron from a ' +
      'gaseous atom: X(g) → X⁺(g) + e⁻. SUCCESSIVE ionization energies always ' +
      'increase (IE₁ < IE₂ < IE₃...) because removing an electron from an ' +
      'increasingly positive ion is progressively harder — fewer electrons repel ' +
      'each other, and the same nuclear charge now pulls on fewer electrons ' +
      '(higher effective charge per electron). But there\'s a dramatic JUMP when ' +
      'you cross into a new (inner, more stable) shell: sodium\'s IE₂ is about 10× ' +
      'IE₁ because IE₂ requires breaking into the stable, full n=2 shell after the ' +
      'single 3s electron is gone. These jumps are how we EXPERIMENTALLY confirm ' +
      'shell structure — the size of the jump tells you exactly how many valence ' +
      'electrons an atom has, matching the group number.',
    targetedMisconceptions: [`${IONE}:MC1`],
    source: `${IONE_SRC} — ionization energy trends, successive IEs, shell structure evidence`,
  },
  {
    conceptId: IONE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Ionization energy increases perfectly smoothly across a period, no ' +
      'exceptions." False — there are two well-known dips. Be(IE) > B(IE) even though ' +
      'B has more protons: removing from B\'s single 2p electron is EASIER than ' +
      'disturbing Be\'s stable, full 2s² sub-shell. Similarly N(IE) > O(IE): N\'s ' +
      'half-filled 2p³ is extra stable (each orbital singly occupied, minimal ' +
      'repulsion), while O\'s 2p⁴ has one PAIRED orbital, and removing that paired ' +
      'electron is easier due to electron-electron repulsion in the same orbital. ' +
      'These aren\'t random exceptions — they follow directly from stable ' +
      'half-filled/fully-filled sub-shell configurations. Second trap: "Removing the ' +
      'FIRST electron is always the same difficulty as removing electrons from a ' +
      'similar atom." Depends entirely on which sub-shell that electron sits in.',
    targetedMisconceptions: [`${IONE}:MC1`, `${IONE}:MC2`],
    source: `${IONE_SRC} — misconception: smooth monotonic IE trend (ignoring Be/B and N/O exceptions)`,
  },
]

const IONE_PROBES: SeedProbe[] = [
  {
    conceptId: IONE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Nitrogen has a HIGHER first ionization energy than oxygen, even though oxygen has more protons. Why?',
    choices: [
      { text: 'Nitrogen\'s half-filled 2p³ configuration is extra stable (each orbital singly occupied); oxygen\'s 2p⁴ has a paired electron that is easier to remove due to electron-electron repulsion', isCorrect: true },
      { text: 'This is impossible — more protons always means higher ionization energy across a period', isCorrect: false, misconceptionId: `${IONE}:MC1` },
    ],
    correctValue: 'Nitrogen\'s half-filled stability',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IONE}:MC1`],
    source: `${IONE_SRC} — distractor targets assumption of strictly monotonic IE increase`,
  },
  {
    conceptId: IONE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Sodium\'s IE₂ (10,000 kJ/mol) is dramatically larger than IE₁ (496 kJ/mol) — nearly 20 times bigger. What does this jump reveal?',
    choices: [
      { text: 'After losing its single 3s valence electron, the next electron must come from the stable, full n=2 shell — breaking into a completed inner shell requires vastly more energy', isCorrect: true },
      { text: 'IE₂ is always about 20 times IE₁ for every element, regardless of electron configuration', isCorrect: false, misconceptionId: `${IONE}:MC2` },
    ],
    correctValue: 'Reveals shell structure (breaking into full inner shell)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IONE}:MC2`],
    source: `${IONE_SRC} — misconception: IE jump ratios are universal rather than structure-dependent`,
  },
]

// ─── chem.period.electron-affinity ───────────────────────────────────────────
const EAFF = 'chem.period.electron-affinity'
const EAFF_SRC = 'docs/chemistry/kg/graph.json — chem.period.electron-affinity'

const EAFF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EAFF,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Electron affinity (EA) measures the energy CHANGE when an atom GAINS an ' +
      'electron: X(g) + e⁻ → X⁻(g). Most atoms RELEASE energy (EA negative by the ' +
      'ΔH convention, or reported as positive "affinity" in older texts — check ' +
      'your textbook\'s sign convention!) because the added electron experiences net ' +
      'attraction to the nucleus. ELECTRONEGATIVITY is related but distinct — it\'s a ' +
      'dimensionless number (Pauling scale, 0.7-4.0) describing an atom\'s tendency to ' +
      'attract electrons WITHIN A BOND (a relative, comparative property), while ' +
      'electron affinity is a measurable energy for an ISOLATED atom gaining an ' +
      'electron. Both increase across a period (more protons pulling harder) and ' +
      'decrease down a group (more shielding, electron added further away). Fluorine ' +
      'has the highest electronegativity (4.0) but NOT the most negative electron ' +
      'affinity — chlorine\'s EA is actually more negative than fluorine\'s, because ' +
      'fluorine\'s very small atomic size creates significant electron-electron ' +
      'repulsion when adding yet another electron to an already crowded 2p subshell.',
    targetedMisconceptions: [`${EAFF}:MC1`],
    source: `${EAFF_SRC} — electron affinity vs electronegativity, periodic trends`,
  },
  {
    conceptId: EAFF,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Electron affinity and electronegativity are the same thing, just ' +
      'different names." No — electronegativity is a relative, unitless number ' +
      'describing bonding behavior; electron affinity is a measurable energy for a ' +
      'free atom. They correlate but aren\'t identical, and can even DISAGREE on ' +
      'ranking (fluorine has the highest electronegativity but not the most negative ' +
      'EA — chlorine does, due to fluorine\'s small size causing electron crowding). ' +
      'Second trap: "All atoms release energy when gaining an electron." False — noble ' +
      'gases and some others have POSITIVE (unfavorable) electron affinity because ' +
      'their stable, full sub-shells strongly resist adding an extra electron — you\'d ' +
      'have to force it in, requiring energy INPUT rather than release. This is exactly ' +
      'why noble gases don\'t readily form anions.',
    targetedMisconceptions: [`${EAFF}:MC1`, `${EAFF}:MC2`],
    source: `${EAFF_SRC} — misconception: EA and electronegativity are identical; EA always favorable`,
  },
]

const EAFF_PROBES: SeedProbe[] = [
  {
    conceptId: EAFF,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Chlorine has a more negative (more favorable) electron affinity than fluorine, even though fluorine is more electronegative. Why?',
    choices: [
      { text: 'Fluorine\'s very small atomic size causes significant electron-electron repulsion when adding another electron to its already crowded 2p subshell, partially offsetting the favorable nuclear attraction', isCorrect: true },
      { text: 'This is a measurement error — electron affinity and electronegativity should always rank elements identically', isCorrect: false, misconceptionId: `${EAFF}:MC1` },
    ],
    correctValue: 'Fluorine\'s small size causes electron repulsion',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EAFF}:MC1`],
    source: `${EAFF_SRC} — distractor targets assumption that EA and electronegativity must rank identically`,
  },
  {
    conceptId: EAFF,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Would neon (a noble gas) release or absorb energy when forced to gain an electron?',
    choices: [
      { text: 'Absorb energy (positive/unfavorable electron affinity) — neon\'s full, stable 2p⁶ configuration strongly resists adding an extra electron', isCorrect: true },
      { text: 'Release energy — all atoms release energy when gaining an electron, without exception', isCorrect: false, misconceptionId: `${EAFF}:MC2` },
    ],
    correctValue: 'Absorb energy (unfavorable)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${EAFF}:MC2`],
    source: `${EAFF_SRC} — misconception: all electron affinities are energetically favorable`,
  },
]

// ─── chem.period.atomic-radius ───────────────────────────────────────────────
const ARAD = 'chem.period.atomic-radius'
const ARAD_SRC = 'docs/chemistry/kg/graph.json — chem.period.atomic-radius'

const ARAD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ARAD,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Atomic radius is tricky to define (electron clouds don\'t have a sharp edge), ' +
      'so chemists use operational definitions: COVALENT radius (half the distance ' +
      'between nuclei in a covalently bonded pair), METALLIC radius (half the distance ' +
      'between nuclei in a metal lattice), or VAN DER WAALS radius (half the distance ' +
      'between non-bonded touching atoms). ISOELECTRONIC SPECIES (same number of ' +
      'electrons) offer a clean comparison: Na⁺, Mg²⁺, Al³⁺, F⁻, O²⁻, N³⁻ ALL have 10 ' +
      'electrons (neon configuration), but different radii — MORE protons pulling on ' +
      'the SAME number of electrons means a SMALLER radius. So among this isoelectronic ' +
      'series, N³⁻ (7 protons, 10 electrons) is largest, and Al³⁺ (13 protons, 10 ' +
      'electrons) is smallest — same electron count, but the greater positive charge ' +
      'compresses the electron cloud more tightly.',
    targetedMisconceptions: [`${ARAD}:MC1`],
    source: `${ARAD_SRC} — radius definitions, isoelectronic series comparison`,
  },
  {
    conceptId: ARAD,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Among isoelectronic ions, the one with MORE electrons is bigger." This ' +
      'confuses the comparison — isoelectronic means they ALL have the SAME number of ' +
      'electrons by definition (that\'s what "iso-electronic" means). The variable is ' +
      'PROTONS (nuclear charge), not electrons. More protons = stronger pull on the ' +
      'same electron count = smaller radius. Students sometimes think "more charge = ' +
      'bigger ion" by analogy to macroscopic objects (more stuff = bigger), but at the ' +
      'atomic scale MORE positive charge means TIGHTER electron binding, hence SMALLER ' +
      'size. Second trap: "Ionic radius trends always mirror atomic radius trends within ' +
      'a period." Not necessarily — crossing from cations to anions within a period ' +
      'causes a big radius JUMP (cations are smaller than the parent atom; anions are ' +
      'larger), so ionic radius trends have a discontinuity that atomic radius trends ' +
      'don\'t.',
    targetedMisconceptions: [`${ARAD}:MC1`, `${ARAD}:MC2`],
    source: `${ARAD_SRC} — misconception: more charge = bigger isoelectronic ion; ionic/atomic trends identical`,
  },
]

const ARAD_PROBES: SeedProbe[] = [
  {
    conceptId: ARAD,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Among the isoelectronic species N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ (all with 10 electrons), which has the SMALLEST radius?',
    choices: [
      { text: 'Al³⁺ — with 13 protons pulling on only 10 electrons, it has the highest effective nuclear charge per electron among this group, compressing the electron cloud most tightly', isCorrect: true },
      { text: 'N³⁻ — it has the most negative charge, so by analogy to "more charge = bigger" it should be smallest', isCorrect: false, misconceptionId: `${ARAD}:MC1` },
    ],
    correctValue: 'Al³⁺',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ARAD}:MC1`],
    source: `${ARAD_SRC} — distractor targets "more charge = bigger" misconception applied to isoelectronic species`,
  },
  {
    conceptId: ARAD,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is Na⁺ (102 pm) much smaller than the neutral Na atom (186 pm), while Cl⁻ (181 pm) is much larger than the neutral Cl atom (99 pm)?',
    choices: [
      { text: 'Cations lose their outermost shell (losing electrons reduces electron-electron repulsion, letting remaining electrons pull in tighter), while anions gain electrons (increasing repulsion, expanding the cloud) — same "charge added" direction, opposite radius effect', isCorrect: true },
      { text: 'Both should get smaller when charged, since adding or removing charge always compresses atoms', isCorrect: false, misconceptionId: `${ARAD}:MC2` },
    ],
    correctValue: 'Cations shrink, anions expand',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ARAD}:MC2`],
    source: `${ARAD_SRC} — misconception: assuming charge changes always shrink radius`,
  },
]

// ─── chem.period.valency ─────────────────────────────────────────────────────
const VALEN = 'chem.period.valency'
const VALEN_SRC = 'docs/chemistry/kg/graph.json — chem.period.valency'

const VALEN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VALEN,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Valency is the combining capacity of an atom — how many bonds it typically ' +
      'forms, usually determined by how many electrons it needs to gain, lose, or ' +
      'share to reach a stable (often noble-gas-like) configuration. OXIDATION STATE ' +
      'is a related but more precise bookkeeping tool: the hypothetical charge an atom ' +
      'would have if all bonds were 100% ionic (electrons assigned entirely to the more ' +
      'electronegative atom). Rules: elements in their elemental form = 0. Simple ' +
      'monatomic ions = their charge. Oxygen is usually −2 (except in peroxides, −1, or ' +
      'OF₂, +2). Hydrogen is usually +1 (except in metal hydrides like NaH, where it\'s ' +
      '−1). The SUM of oxidation states in a neutral compound = 0; in a polyatomic ion, ' +
      'it equals the ion\'s charge. Oxidation state is essential for identifying redox ' +
      'reactions (oxidation = increase in oxidation state; reduction = decrease) even ' +
      'when electron transfer isn\'t obviously "complete" (as in purely covalent bonds).',
    targetedMisconceptions: [`${VALEN}:MC1`],
    source: `${VALEN_SRC} — valency, oxidation state rules, redox bookkeeping`,
  },
  {
    conceptId: VALEN,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Oxidation state represents the REAL charge on an atom in a molecule." ' +
      'FALSE for covalent compounds — oxidation state is a BOOKKEEPING FICTION, an ' +
      'accounting convention that assumes complete electron transfer even in bonds ' +
      'that are actually shared (covalent). In CH₄, carbon is assigned oxidation state ' +
      '−4 (as if it took all 4 bonding electron pairs), but carbon doesn\'t actually ' +
      'carry a real −4 charge — the bonds are covalent, electrons are SHARED, not ' +
      'transferred. Oxidation state is a useful TOOL for tracking electron flow in ' +
      'redox reactions, not a literal physical charge measurement (that would be a ' +
      'partial charge from electronegativity difference, a much smaller and different ' +
      'quantity). Second trap: "Hydrogen is always +1." Exception: in metal hydrides ' +
      '(NaH, CaH₂), hydrogen is −1 because the metal is far less electronegative than ' +
      'hydrogen there — always check what hydrogen is bonded to.',
    targetedMisconceptions: [`${VALEN}:MC1`, `${VALEN}:MC2`],
    source: `${VALEN_SRC} — misconception: oxidation state = real charge; hydrogen always +1`,
  },
]

const VALEN_PROBES: SeedProbe[] = [
  {
    conceptId: VALEN,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In CH₄ (methane), carbon is assigned oxidation state −4. Does carbon actually carry a real −4 charge?',
    choices: [
      { text: 'No — oxidation state is a bookkeeping convention that assumes complete electron transfer, but the C-H bonds are covalent (shared electrons), so carbon does not carry a literal −4 charge', isCorrect: true },
      { text: 'Yes — oxidation state directly measures the actual electric charge on each atom in a molecule', isCorrect: false, misconceptionId: `${VALEN}:MC1` },
    ],
    correctValue: 'No — it\'s a bookkeeping convention, not a real charge',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VALEN}:MC1`],
    source: `${VALEN_SRC} — distractor targets "oxidation state = literal charge" misconception`,
  },
  {
    conceptId: VALEN,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the oxidation state of hydrogen in NaH (sodium hydride)?',
    choices: [
      { text: '−1 — sodium is less electronegative than hydrogen here, so hydrogen is assigned the electrons in this bond, breaking the usual "hydrogen is +1" pattern', isCorrect: true },
      { text: '+1 — hydrogen is always assigned +1 in every compound without exception', isCorrect: false, misconceptionId: `${VALEN}:MC2` },
    ],
    correctValue: '−1',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VALEN}:MC2`],
    source: `${VALEN_SRC} — misconception: hydrogen oxidation state is universally +1`,
  },
]

// ─── chem.equil.le-chatelier ─────────────────────────────────────────────────
const LECHAT = 'chem.equil.le-chatelier'
const LECHAT_SRC = 'docs/chemistry/kg/graph.json — chem.equil.le-chatelier'

const LECHAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LECHAT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Le Chatelier\'s Principle: if you disturb a system at equilibrium, it shifts to ' +
      'PARTIALLY counteract the disturbance (never fully cancels it — that would mean ' +
      'nothing changed at all). Three main disturbances: CONCENTRATION — add reactant, ' +
      'equilibrium shifts forward (toward products) to consume some of the excess. ' +
      'PRESSURE/VOLUME (gas reactions only) — compress the system, equilibrium shifts ' +
      'toward the side with FEWER gas molecules (reduces the "crowding"). TEMPERATURE — ' +
      'treat heat as a reactant (endothermic) or product (exothermic); adding heat shifts ' +
      'equilibrium toward the ENDOTHERMIC direction (the side that "absorbs" the extra ' +
      'heat). Crucially: temperature is the ONLY disturbance that changes K itself — ' +
      'concentration and pressure changes shift the POSITION of equilibrium but K stays ' +
      'fixed (as covered earlier). Adding an INERT gas at constant volume changes total ' +
      'pressure but doesn\'t affect partial pressures of reactants/products, so NO shift ' +
      'occurs.',
    targetedMisconceptions: [`${LECHAT}:MC1`],
    source: `${LECHAT_SRC} — Le Chatelier's principle, concentration/pressure/temperature disturbances`,
  },
  {
    conceptId: LECHAT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Major trap: "Adding an inert gas to an equilibrium mixture always shifts the ' +
      'equilibrium." Depends entirely on the CONDITIONS. At CONSTANT VOLUME, adding ' +
      'inert gas increases total pressure but does NOT change the partial pressures or ' +
      'concentrations of reactants/products — no shift occurs (Le Chatelier only responds ' +
      'to changes in the actual reacting species\' concentrations/pressures). At CONSTANT ' +
      'PRESSURE, adding inert gas forces the container to EXPAND (to keep total pressure ' +
      'constant), which DOES dilute the reacting species — this behaves like a pressure ' +
      'decrease, shifting equilibrium toward the side with MORE gas molecules. Same ' +
      'action (add inert gas), opposite outcomes depending on whether volume or pressure ' +
      'is held fixed. Second trap: "Le Chatelier\'s principle explains WHY equilibrium ' +
      'shifts (the mechanism)." It only PREDICTS the direction — the actual mechanism is ' +
      'that the disturbance makes Q≠K temporarily, and the system responds by reacting ' +
      'until Q=K again.',
    targetedMisconceptions: [`${LECHAT}:MC1`, `${LECHAT}:MC2`],
    source: `${LECHAT_SRC} — misconception: inert gas always shifts equilibrium (depends on constant V vs P)`,
  },
]

const LECHAT_PROBES: SeedProbe[] = [
  {
    conceptId: LECHAT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Adding an inert gas (like argon) to an equilibrium mixture at CONSTANT VOLUME will:',
    choices: [
      { text: 'Cause no shift — partial pressures/concentrations of the actual reacting species are unchanged, even though total pressure increases', isCorrect: true },
      { text: 'Shift equilibrium toward the side with fewer gas moles, since total pressure increased', isCorrect: false, misconceptionId: `${LECHAT}:MC1` },
      { text: 'Shift equilibrium toward the side with more gas moles', isCorrect: false, misconceptionId: `${LECHAT}:MC1` },
    ],
    correctValue: 'No shift (at constant volume)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${LECHAT}:MC1`],
    source: `${LECHAT_SRC} — distractor targets "any pressure increase shifts equilibrium" misconception`,
  },
  {
    conceptId: LECHAT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'For an exothermic reaction A ⇌ B + heat, does raising the temperature increase or decrease K?',
    choices: [
      { text: 'Decrease K — treating heat as a product, adding more heat shifts equilibrium backward (toward reactant A), meaning at the new (higher) temperature, less product is favored, so K decreases', isCorrect: true },
      { text: 'K is unaffected by temperature — only concentration and pressure changes affect K', isCorrect: false, misconceptionId: `${LECHAT}:MC2` },
    ],
    correctValue: 'K decreases for exothermic reactions when heated',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${LECHAT}:MC2`],
    source: `${LECHAT_SRC} — misconception: temperature does not affect K (only temperature does, uniquely)`,
  },
]

// ─── chem.equil.acids-bases ──────────────────────────────────────────────────
const ACBASE = 'chem.equil.acids-bases'
const ACBASE_SRC = 'docs/chemistry/kg/graph.json — chem.equil.acids-bases'

const ACBASE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ACBASE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Three theories, each broader than the last. ARRHENIUS (narrowest): acids produce ' +
      'H⁺ in water, bases produce OH⁻ in water — works fine for aqueous solutions but ' +
      'fails for non-aqueous chemistry. BRØNSTED-LOWRY (broader): acid = proton (H⁺) ' +
      'DONOR, base = proton ACCEPTOR — works in any solvent, and introduces CONJUGATE ' +
      'PAIRS (an acid and the base formed after it donates H⁺ differ by exactly one ' +
      'proton: HCl/Cl⁻, NH₄⁺/NH₃). LEWIS (broadest): acid = electron pair ACCEPTOR, ' +
      'base = electron pair DONOR — this explains acid-base behavior with NO protons ' +
      'involved at all, like BF₃ (electron-deficient boron, accepts a lone pair) reacting ' +
      'with NH₃ (donates its lone pair). Every Brønsted-Lowry acid-base reaction IS also ' +
      'a Lewis acid-base reaction, but Lewis theory captures MORE reactions (like metal ' +
      'ion complexation, Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺, where NH₃ acts as a Lewis base ' +
      'donating electron pairs to the metal).',
    targetedMisconceptions: [`${ACBASE}:MC1`],
    source: `${ACBASE_SRC} — Arrhenius, Brønsted-Lowry, Lewis acid-base theories`,
  },
  {
    conceptId: ACBASE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "A strong conjugate acid always has a strong conjugate base." OPPOSITE ' +
      'relationship — a STRONG acid has a WEAK conjugate base (HCl is a strong acid; ' +
      'Cl⁻ is an extremely weak base, barely reacting with water at all). This is ' +
      'because a strong acid readily gives up its proton — meaning its conjugate base ' +
      'has little tendency to grab that proton back. Conversely, a WEAK acid (like ' +
      'acetic acid) has a relatively STRONGER conjugate base (acetate ion, which does ' +
      'have some tendency to accept a proton back — that\'s why acetate solutions are ' +
      'measurably basic). Second trap: "Every acid-base reaction must involve H⁺ ' +
      'transfer." False for Lewis acid-base reactions — BF₃ + NH₃ → F₃B-NH₃ involves NO ' +
      'protons at all, just a coordinate covalent bond forming from NH₃\'s lone pair ' +
      'filling boron\'s empty orbital. Lewis theory is the most general framework precisely ' +
      'because it doesn\'t require protons.',
    targetedMisconceptions: [`${ACBASE}:MC1`, `${ACBASE}:MC2`],
    source: `${ACBASE_SRC} — misconception: strong acid = strong conjugate base; acid-base always involves H⁺`,
  },
]

const ACBASE_PROBES: SeedProbe[] = [
  {
    conceptId: ACBASE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'HCl is a strong acid. What can you conclude about its conjugate base, Cl⁻?',
    choices: [
      { text: 'Cl⁻ is an extremely weak base — strong acids readily donate their proton, meaning the resulting conjugate base has little tendency to reclaim it', isCorrect: true },
      { text: 'Cl⁻ must also be a strong base, since strong acids produce strong conjugate bases', isCorrect: false, misconceptionId: `${ACBASE}:MC1` },
    ],
    correctValue: 'Cl⁻ is a very weak base',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ACBASE}:MC1`],
    source: `${ACBASE_SRC} — distractor targets "strong acid → strong conjugate base" misconception`,
  },
  {
    conceptId: ACBASE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'BF₃ reacts with NH₃ to form F₃B-NH₃, with no protons transferred at all. Is this an acid-base reaction?',
    choices: [
      { text: 'Yes — by Lewis theory, BF₃ (electron-pair acceptor, boron has an empty orbital) is the acid and NH₃ (electron-pair donor) is the base; no protons are required for this classification', isCorrect: true },
      { text: 'No — a reaction can only be called acid-base if H⁺ is transferred between species', isCorrect: false, misconceptionId: `${ACBASE}:MC2` },
    ],
    correctValue: 'Yes — Lewis acid-base reaction',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ACBASE}:MC2`],
    source: `${ACBASE_SRC} — misconception: restricting acid-base classification to proton-transfer reactions only`,
  },
]

// ─── chem.equil.solubility ───────────────────────────────────────────────────
const KSPEQ = 'chem.equil.solubility'
const KSPEQ_SRC = 'docs/chemistry/kg/graph.json — chem.equil.solubility'

const KSPEQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: KSPEQ,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'For SPARINGLY soluble salts (like AgCl), a tiny equilibrium exists between the ' +
      'solid and its dissolved ions: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq). The solubility product ' +
      'K_sp = [Ag⁺][Cl⁻] — the solid is omitted (constant activity, as with any pure ' +
      'solid in K expressions). A SMALL K_sp means very little dissolves. You can compute ' +
      'MOLAR SOLUBILITY (s, in mol/L) from K_sp — for a 1:1 salt like AgCl, K_sp = s², so ' +
      's = √K_sp. For a 1:2 salt like PbCl₂: K_sp = [Pb²⁺][Cl⁻]² = s(2s)² = 4s³. The ' +
      'COMMON ION EFFECT: adding a common ion (like extra Cl⁻ from NaCl) to a saturated ' +
      'AgCl solution SHIFTS equilibrium backward (Le Chatelier), DECREASING AgCl\'s ' +
      'solubility — this is why seawater (rich in common ions) can precipitate certain ' +
      'salts more readily than fresh water. Compare Q (ion product using current ' +
      'concentrations) to K_sp: Q<K_sp means more can dissolve (unsaturated); Q>K_sp ' +
      'means precipitation will occur (supersaturated).',
    targetedMisconceptions: [`${KSPEQ}:MC1`],
    source: `${KSPEQ_SRC} — Ksp, molar solubility calculation, common ion effect`,
  },
  {
    conceptId: KSPEQ,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Comparing K_sp values directly tells you which salt is MORE soluble, ' +
      'always." Only valid for salts with the SAME stoichiometric ratio (like comparing ' +
      'two 1:1 salts, AgCl vs. AgBr, where s=√K_sp for both). But comparing a 1:1 salt\'s ' +
      'K_sp to a 1:2 salt\'s K_sp directly can be MISLEADING — the molar solubility ' +
      'formula differs (s vs. (K_sp/4)^(1/3)), so a numerically SMALLER K_sp for a 1:2 ' +
      'salt could still mean HIGHER actual solubility than a 1:1 salt with a larger K_sp. ' +
      'Always convert to molar solubility (s) before comparing across different ' +
      'stoichiometries. Second trap: "Adding a common ion has no effect if the amount ' +
      'added is small." Even a small common ion addition shifts equilibrium (Le ' +
      'Chatelier applies at any magnitude) — the EXTENT of the solubility decrease ' +
      'scales with how much common ion is added, but the DIRECTION (decrease) is always ' +
      'true regardless of amount.',
    targetedMisconceptions: [`${KSPEQ}:MC1`],
    source: `${KSPEQ_SRC} — misconception: comparing Ksp directly across different stoichiometries`,
  },
]

const KSPEQ_PROBES: SeedProbe[] = [
  {
    conceptId: KSPEQ,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Salt A (1:1 stoichiometry) has Ksp = 1×10⁻¹⁰. Salt B (1:2 stoichiometry, like PbCl₂) has Ksp = 4×10⁻⁹. Which has HIGHER molar solubility?',
    choices: [
      { text: 'Cannot assume from Ksp alone — must calculate: Salt A: s=√(10⁻¹⁰)≈10⁻⁵ M; Salt B: s=(Ksp/4)^(1/3)=(10⁻⁹)^(1/3)≈10⁻³ M. Salt B is actually far MORE soluble despite similar-looking Ksp values.', isCorrect: true },
      { text: 'Salt B, simply because it has the larger numerical Ksp value', isCorrect: false, misconceptionId: `${KSPEQ}:MC1` },
    ],
    correctValue: 'Salt B has much higher molar solubility (must calculate, not compare Ksp directly)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${KSPEQ}:MC1`],
    source: `${KSPEQ_SRC} — distractor targets directly comparing Ksp across different stoichiometries`,
  },
  {
    conceptId: KSPEQ,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A saturated AgCl solution has some NaCl added (common ion Cl⁻). What happens to the amount of dissolved AgCl?',
    choices: [
      { text: 'It decreases — the added Cl⁻ shifts the AgCl(s) ⇌ Ag⁺+Cl⁻ equilibrium backward (Le Chatelier), causing some AgCl to precipitate out of solution', isCorrect: true },
      { text: 'It stays the same, since Ksp is a constant and doesn\'t change with added ions', isCorrect: false, misconceptionId: `${KSPEQ}:MC2` },
    ],
    correctValue: 'AgCl solubility decreases',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${KSPEQ}:MC2`],
    source: `${KSPEQ_SRC} — misconception: constant Ksp means solubility itself never changes with conditions`,
  },
]

// ─── chem.bond.ionic-bonding ──────────────────────────────────────────────────
const IONB = 'chem.bond.ionic-bonding'
const IONB_SRC = 'docs/chemistry/kg/graph.json — chem.bond.ionic-bonding'

const IONB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IONB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Ionic bonding happens when the electronegativity difference between two atoms ' +
      'is LARGE (>1.7 on the Pauling scale, roughly) — one atom essentially takes ' +
      'electron(s) from the other. Metal atoms (low ionization energy — easy to lose ' +
      'electrons) transfer electrons to nonmetal atoms (high electron affinity — eager ' +
      'to gain electrons). Sodium (1 valence electron, wants to lose it to reach noble-gas ' +
      'configuration) gives its electron to chlorine (7 valence electrons, wants one ' +
      'more) — Na⁺ and Cl⁻ form, held together by ELECTROSTATIC ATTRACTION (opposite ' +
      'charges attract). This isn\'t a "bond" between two specific atoms like covalent ' +
      'bonding — it\'s a 3D LATTICE where each Na⁺ is surrounded by multiple Cl⁻ and ' +
      'vice versa, all held by the same electrostatic force radiating in all directions. ' +
      'This is why ionic compounds have HIGH melting points (breaking the lattice ' +
      'requires overcoming attraction to MANY neighboring ions, not just one bond) and ' +
      'conduct electricity only when MOLTEN or DISSOLVED (ions need to be free to move).',
    targetedMisconceptions: [`${IONB}:MC1`],
    source: `${IONB_SRC} — ionic bond formation, lattice structure, properties`,
  },
  {
    conceptId: IONB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "NaCl is made of individual NaCl molecules, like water is made of H₂O ' +
      'molecules." FALSE. NaCl doesn\'t exist as discrete molecules — it\'s an extended ' +
      'CRYSTAL LATTICE where each Na⁺ ion is surrounded by 6 Cl⁻ neighbors (and vice ' +
      'versa), continuing throughout the entire crystal. "NaCl" is the EMPIRICAL FORMULA ' +
      '(simplest ratio, 1:1) representing the whole lattice, not a molecular formula for ' +
      'an isolated unit. This is why ionic solids don\'t have a "molecular mass" in the ' +
      'true sense — chemists use FORMULA MASS instead. Second trap: "Ionic bonding is ' +
      '100% ionic and covalent bonding is 100% covalent — a clean binary distinction." ' +
      'Real bonds exist on a SPECTRUM. Even "ionic" NaCl has some covalent character ' +
      '(the electron isn\'t 100% transferred, there\'s slight electron sharing), and ' +
      '"covalent" bonds between different elements have some ionic character (polar ' +
      'covalent bonds, like H-Cl). Electronegativity difference is a continuous spectrum, ' +
      'not a switch.',
    targetedMisconceptions: [`${IONB}:MC1`, `${IONB}:MC2`],
    source: `${IONB_SRC} — misconception: NaCl exists as discrete molecules; ionic/covalent is a binary distinction`,
  },
]

const IONB_PROBES: SeedProbe[] = [
  {
    conceptId: IONB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why does solid NaCl NOT conduct electricity, but molten NaCl (or NaCl dissolved in water) DOES conduct?',
    choices: [
      { text: 'In the solid lattice, ions are locked in fixed positions and cannot move to carry charge; melting or dissolving frees the ions to move and carry electrical current', isCorrect: true },
      { text: 'Solid NaCl has no charged particles at all; charged ions only form when NaCl is melted or dissolved', isCorrect: false, misconceptionId: `${IONB}:MC3` },
    ],
    correctValue: 'Ion mobility, not ion existence, is the key',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${IONB}:MC3`],
    source: `${IONB_SRC} — distractor targets "solid ionic compounds have no ions" misconception`,
  },
  {
    conceptId: IONB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does NaCl exist as discrete "NaCl molecules," similar to how water exists as discrete H₂O molecules?',
    choices: [
      { text: 'No — NaCl is an extended 3D ionic lattice where each ion is surrounded by multiple oppositely charged neighbors; "NaCl" represents the simplest ratio (empirical formula), not an isolated molecular unit', isCorrect: true },
      { text: 'Yes — like water, table salt is made of discrete NaCl molecular units bonded ionically', isCorrect: false, misconceptionId: `${IONB}:MC1` },
    ],
    correctValue: 'No — extended lattice, not discrete molecules',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${IONB}:MC1`],
    source: `${IONB_SRC} — misconception: ionic compounds exist as discrete molecules like covalent compounds`,
  },
]

// ─── chem.bond.covalent-bonding ──────────────────────────────────────────────
const COVB = 'chem.bond.covalent-bonding'
const COVB_SRC = 'docs/chemistry/kg/graph.json — chem.bond.covalent-bonding'

const COVB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COVB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'When electronegativity difference is SMALL (typically two nonmetals), neither ' +
      'atom can fully pull electrons away from the other — instead they SHARE electron ' +
      'pairs. Each shared pair counts toward BOTH atoms\' octets simultaneously. A ' +
      'single bond shares 1 pair (2 electrons); double bond shares 2 pairs (4 electrons); ' +
      'triple bond shares 3 pairs (6 electrons) — MORE shared pairs means SHORTER, ' +
      'STRONGER bonds (triple bonds are shortest/strongest, single bonds longest/weakest ' +
      'between the same two atom types). If electronegativity difference is small but ' +
      'NONZERO (like C-H or O-H), the bond is POLAR COVALENT — electrons spend more time ' +
      'near the more electronegative atom, creating partial charges (δ+ and δ−) without ' +
      'full electron transfer. If the two atoms are IDENTICAL (like H-H or Cl-Cl), the ' +
      'bond is perfectly NONPOLAR (equal sharing). Covalent compounds form discrete ' +
      'MOLECULES (unlike ionic lattices) — this is why they typically have LOWER melting ' +
      'points (you only need to overcome weaker intermolecular forces BETWEEN molecules, ' +
      'not the strong bond WITHIN each molecule).',
    targetedMisconceptions: [`${COVB}:MC1`],
    source: `${COVB_SRC} — covalent bond formation, bond order, polar vs nonpolar covalent`,
  },
  {
    conceptId: COVB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Critical trap: "Low melting point means covalent bonds are WEAK." FALSE — the ' +
      'covalent bonds WITHIN a molecule (like the O-H bonds in water) are actually quite ' +
      'strong (~460 kJ/mol for O-H). What melts at low temperature is breaking the ' +
      'WEAKER intermolecular forces BETWEEN separate water molecules (hydrogen bonds, ' +
      '~20 kJ/mol) — NOT the covalent bonds within each molecule. When ice melts or ' +
      'water boils, the H₂O molecules stay intact (as covered in states-of-matter) — ' +
      'only intermolecular attractions break. Confusing intramolecular (within, strong) ' +
      'with intermolecular (between, weak) forces is one of the most common errors in ' +
      'chemistry. Second trap: "Double bonds are twice as strong as single bonds, exactly." ' +
      'Not exactly double — a C=C double bond (~610 kJ/mol) is stronger than a C-C single ' +
      'bond (~350 kJ/mol) but LESS than double (~700 would be exactly double) because the ' +
      'second bond (a π bond) is weaker than the first (a σ bond) due to less effective ' +
      'orbital overlap.',
    targetedMisconceptions: [`${COVB}:MC1`, `${COVB}:MC2`],
    source: `${COVB_SRC} — misconception: low melting point = weak covalent bonds (confuses inter/intramolecular)`,
  },
]

const COVB_PROBES: SeedProbe[] = [
  {
    conceptId: COVB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Water (H₂O) has a relatively low boiling point (100°C) compared to many ionic compounds. Does this mean the O-H covalent bonds within water molecules are weak?',
    choices: [
      { text: 'No — the O-H covalent bonds are actually quite strong (~460 kJ/mol); boiling only breaks the much weaker hydrogen bonds BETWEEN separate water molecules, not the bonds within each molecule', isCorrect: true },
      { text: 'Yes — the low boiling point directly indicates that O-H covalent bonds are weak', isCorrect: false, misconceptionId: `${COVB}:MC1` },
    ],
    correctValue: 'No — intermolecular forces (weak) break, not covalent bonds (strong)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COVB}:MC1`],
    source: `${COVB_SRC} — distractor targets confusing boiling point with covalent bond strength`,
  },
  {
    conceptId: COVB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A C-C single bond has energy ~350 kJ/mol. Is a C=C double bond exactly double that (~700 kJ/mol)?',
    choices: [
      { text: 'No — a C=C double bond is about 610 kJ/mol, stronger than single but less than exactly double, because the second (π) bond involves less effective orbital overlap than the first (σ) bond', isCorrect: true },
      { text: 'Yes — bond energy scales exactly linearly with bond order (single, double, triple)', isCorrect: false, misconceptionId: `${COVB}:MC2` },
    ],
    correctValue: 'No — not exactly double (π bonds are weaker than σ)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COVB}:MC2`],
    source: `${COVB_SRC} — misconception: bond energy scales exactly linearly with bond order`,
  },
]

// ─── chem.bond.metallic-bonding ──────────────────────────────────────────────
const METB = 'chem.bond.metallic-bonding'
const METB_SRC = 'docs/chemistry/kg/graph.json — chem.bond.metallic-bonding'

const METB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: METB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Metallic bonding is a THIRD kind of bonding, distinct from both ionic and ' +
      'covalent. Picture a lattice of metal CATIONS sitting in a "sea" of DELOCALIZED ' +
      'electrons — valence electrons aren\'t owned by any one atom, they flow freely ' +
      'throughout the entire metal structure. This "electron sea" model explains ' +
      'metals\' signature properties: ELECTRICAL CONDUCTIVITY (free electrons carry ' +
      'charge easily, even in the solid state — unlike ionic solids which need melting), ' +
      'THERMAL CONDUCTIVITY (mobile electrons transfer kinetic energy quickly), ' +
      'MALLEABILITY/DUCTILITY (metal cations can slide past each other without breaking ' +
      'bonds, since the electron sea just flows around them — unlike ionic crystals, ' +
      'which SHATTER when layers shift because like-charged ions suddenly repel), and ' +
      'METALLIC LUSTER (free electrons absorb and re-emit light at almost all ' +
      'wavelengths). Bond STRENGTH varies with the number of delocalized electrons per ' +
      'atom and ionic radius — this is why transition metals (multiple valence electrons) ' +
      'tend to have higher melting points than alkali metals (just 1 valence electron).',
    targetedMisconceptions: [`${METB}:MC1`],
    source: `${METB_SRC} — electron sea model, metallic properties, malleability vs ionic brittleness`,
  },
  {
    conceptId: METB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Metals conduct electricity because their atoms are packed close together, ' +
      'letting electrons hop between them." Not quite — the KEY feature isn\'t proximity, ' +
      'it\'s DELOCALIZATION. Metal valence electrons aren\'t bound to any specific atom ' +
      'at all — they behave more like a fluid, free to move throughout the ENTIRE metal ' +
      'structure in response to any electric field, without needing to "hop" between ' +
      'discrete atomic sites one at a time. This is fundamentally different from, say, ' +
      'semiconductors, where electrons DO have to jump between more localized states. ' +
      'Second trap: "Metals and ionic compounds are both brittle since they\'re both ' +
      'made of a lattice of ions/cations." FALSE — this is exactly where the two differ ' +
      'most dramatically. When you deform a METAL lattice, cations slide past each other ' +
      'and the electron sea simply flows to accommodate the new shape (malleable). When ' +
      'you deform an IONIC lattice, ions of the SAME charge get forced next to each ' +
      'other, causing violent repulsion and SHATTERING (brittle) — the electron sea is ' +
      'what makes metals uniquely deformable.',
    targetedMisconceptions: [`${METB}:MC1`, `${METB}:MC2`],
    source: `${METB_SRC} — misconception: conductivity from proximity not delocalization; metals brittle like ionic solids`,
  },
]

const METB_PROBES: SeedProbe[] = [
  {
    conceptId: METB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why can a metal like copper be hammered into a new shape (malleable) while an ionic crystal like NaCl shatters when struck?',
    choices: [
      { text: 'In a metal, cations can slide past each other while the delocalized electron sea flows to accommodate the change; in NaCl, sliding forces like-charged ions adjacent, causing strong repulsion and fracture', isCorrect: true },
      { text: 'Metal atoms are simply softer and weaker than ionic compounds', isCorrect: false, misconceptionId: `${METB}:MC2` },
    ],
    correctValue: 'Electron sea flows during deformation; ionic lattice fractures',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${METB}:MC2`],
    source: `${METB_SRC} — distractor targets vague "metals are softer" rather than structural mechanism`,
  },
  {
    conceptId: METB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'What specifically allows metals to conduct electricity even as solids, unlike ionic compounds which require melting or dissolving?',
    choices: [
      { text: 'Metal valence electrons are fully DELOCALIZED (not bound to any specific atom) and free to flow throughout the entire structure, unlike ionic solids where charged ions are locked in fixed lattice positions', isCorrect: true },
      { text: 'Metal atoms are simply packed closer together than ionic compounds, letting electrons hop between adjacent atoms', isCorrect: false, misconceptionId: `${METB}:MC1` },
    ],
    correctValue: 'Electron delocalization, not atomic proximity',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${METB}:MC1`],
    source: `${METB_SRC} — misconception: attributing metallic conductivity to proximity rather than delocalization`,
  },
]

// ─── chem.redox.oxidation-state ──────────────────────────────────────────────
const REDOX = 'chem.redox.oxidation-state'
const REDOX_SRC = 'docs/chemistry/kg/graph.json — chem.redox.oxidation-state'

const REDOX_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REDOX,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Redox reactions involve electron transfer, tracked via oxidation state changes. ' +
      'OXIDATION = increase in oxidation state (losing electrons, or "losing" them in the ' +
      'bookkeeping sense). REDUCTION = decrease in oxidation state (gaining electrons). ' +
      'Memory aid: OIL RIG (Oxidation Is Loss, Reduction Is Gain) — of electrons. These ' +
      'ALWAYS happen together (you can\'t have one without the other) — if something is ' +
      'oxidized, something else must be reduced, since electrons don\'t vanish, they ' +
      'transfer. The species that GETS oxidized (loses electrons) is called the REDUCING ' +
      'AGENT (it "causes" reduction in the other species by donating electrons). The ' +
      'species that GETS reduced is the OXIDIZING AGENT. In Zn + Cu²⁺ → Zn²⁺ + Cu: Zn is ' +
      'oxidized (0 → +2), so Zn is the reducing agent. Cu²⁺ is reduced (+2 → 0), so Cu²⁺ ' +
      'is the oxidizing agent. This vocabulary trips people up constantly — the "agent" ' +
      'label describes what CAUSES the change in the OTHER species, which is the opposite ' +
      'of what happens to itself.',
    targetedMisconceptions: [`${REDOX}:MC1`],
    source: `${REDOX_SRC} — oxidation/reduction, OIL RIG, oxidizing/reducing agents`,
  },
  {
    conceptId: REDOX,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The most common vocabulary trap in redox chemistry: "The oxidizing agent IS ' +
      'oxidized." BACKWARDS — the oxidizing agent CAUSES oxidation (in something else) ' +
      'by ACCEPTING electrons, which means the oxidizing agent itself is REDUCED. This is ' +
      'genuinely counterintuitive vocabulary — "agent" describes the ROLE (what it does ' +
      'to the OTHER substance), not what happens to itself. Memory trick: the oxidizing ' +
      'agent gets REDUCED (opposite of its name); the reducing agent gets OXIDIZED ' +
      '(opposite of its name). Second trap: "In every redox reaction, you need to see ' +
      'obvious electron transfer, like ionic compounds forming." False for COVALENT ' +
      'redox reactions — combustion (CH₄ + 2O₂ → CO₂ + 2H₂O) is a classic redox reaction, ' +
      'but electrons are shared, not transferred wholesale. We STILL assign oxidation ' +
      'states using electronegativity-based bookkeeping (carbon goes from −4 to +4, a ' +
      'big oxidation) even though no ions are literally formed — the oxidation state ' +
      'FRAMEWORK still applies to covalent bonds.',
    targetedMisconceptions: [`${REDOX}:MC1`, `${REDOX}:MC2`],
    source: `${REDOX_SRC} — misconception: oxidizing agent is itself oxidized; redox requires literal ion formation`,
  },
]

const REDOX_PROBES: SeedProbe[] = [
  {
    conceptId: REDOX,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, Cu²⁺ is the oxidizing agent. What happens to Cu²⁺ itself?',
    choices: [
      { text: 'It is REDUCED (gains 2 electrons, oxidation state goes from +2 to 0) — the "oxidizing agent" causes oxidation in Zn while itself being reduced', isCorrect: true },
      { text: 'It is oxidized, since it is called the "oxidizing" agent', isCorrect: false, misconceptionId: `${REDOX}:MC1` },
    ],
    correctValue: 'Cu²⁺ is reduced',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${REDOX}:MC1`],
    source: `${REDOX_SRC} — distractor targets the classic "oxidizing agent is oxidized" vocabulary trap`,
  },
  {
    conceptId: REDOX,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is CH₄ + 2O₂ → CO₂ + 2H₂O (combustion) a redox reaction, even though no discrete ions are formed and all bonds are covalent?',
    choices: [
      { text: 'Yes — oxidation states still change (carbon: −4→+4, oxygen: 0→−2), showing electron density shifts even in covalent bonds; redox applies to the oxidation-state framework, not just literal ion formation', isCorrect: true },
      { text: 'No — redox reactions require actual electron transfer between separate ions, which doesn\'t happen in covalent combustion', isCorrect: false, misconceptionId: `${REDOX}:MC2` },
    ],
    correctValue: 'Yes — combustion is a redox reaction',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REDOX}:MC2`],
    source: `${REDOX_SRC} — misconception: redox reactions require literal ionic electron transfer`,
  },
]

// ─── chem.equil.weak-acid ────────────────────────────────────────────────────
const WEAKAB = 'chem.equil.weak-acid'
const WEAKAB_SRC = 'docs/chemistry/kg/graph.json — chem.equil.weak-acid'

const WEAKAB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WEAKAB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Unlike strong acids (100% dissociated), weak acids only PARTIALLY dissociate: ' +
      'HA ⇌ H⁺ + A⁻, governed by K_a = [H⁺][A⁻]/[HA]. A LARGER K_a means a STRONGER ' +
      '(more dissociated) weak acid. For a simple weak acid problem, use the ICE table ' +
      '(Initial-Change-Equilibrium) and the approximation [H⁺] ≈ √(K_a × C) when the ' +
      'acid is weak enough that x (amount dissociated) is small compared to initial ' +
      'concentration C — check this assumption holds (usually if K_a/C < 0.05, error is ' +
      'under 5%). PERCENT DISSOCIATION = ([H⁺]/C) × 100% — INCREASES with DILUTION ' +
      '(counterintuitively!) because Le Chatelier shifts the equilibrium toward MORE ' +
      'dissociation as concentration drops (more "room" for the reaction to proceed ' +
      'forward, even though absolute [H⁺] decreases). Weak bases work identically with ' +
      'K_b: B + H₂O ⇌ BH⁺ + OH⁻. And K_a × K_b = K_w for a conjugate acid-base pair — a ' +
      'powerful shortcut connecting the two.',
    targetedMisconceptions: [`${WEAKAB}:MC1`],
    source: `${WEAKAB_SRC} — Ka/Kb, ICE table method, percent dissociation, Ka×Kb=Kw`,
  },
  {
    conceptId: WEAKAB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Diluting a weak acid decreases the PERCENT dissociation, just like diluting ' +
      'anything makes it weaker." OPPOSITE for percent dissociation — while [H⁺] does ' +
      'decrease in absolute terms upon dilution, the FRACTION of acid that dissociates ' +
      'actually INCREASES (Le Chatelier: diluting shifts equilibrium toward MORE product ' +
      'particles, i.e., more dissociation, since that side has more total dissolved ' +
      'species). Don\'t confuse "more diluted, so less acidic overall" (true — pH still ' +
      'rises with dilution) with "percent dissociation decreases" (false — percent ' +
      'dissociation rises). Second trap: "Weak acid means low K_a means very little acid ' +
      'reacts, period." K_a tells you the EQUILIBRIUM position, not whether a reaction ' +
      'with a STRONG base will go to completion — weak acid + strong base reactions still ' +
      'proceed essentially completely because the strong base consumes H⁺ as fast as it\'s ' +
      'produced, continuously pulling the weak acid\'s equilibrium forward (Le Chatelier ' +
      'again) until the weak acid is essentially fully neutralized.',
    targetedMisconceptions: [`${WEAKAB}:MC1`, `${WEAKAB}:MC2`],
    source: `${WEAKAB_SRC} — misconception: dilution decreases percent dissociation; Ka limits total reaction extent`,
  },
]

const WEAKAB_PROBES: SeedProbe[] = [
  {
    conceptId: WEAKAB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'When you dilute a weak acid solution with water, what happens to the PERCENT dissociation (not the absolute [H⁺])?',
    choices: [
      { text: 'It increases — Le Chatelier shifts equilibrium toward more dissociated species as concentration drops, even though the absolute [H⁺] decreases', isCorrect: true },
      { text: 'It decreases — dilution always makes any process "weaker" including dissociation', isCorrect: false, misconceptionId: `${WEAKAB}:MC1` },
    ],
    correctValue: 'Percent dissociation increases',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${WEAKAB}:MC1`],
    source: `${WEAKAB_SRC} — distractor targets "dilution always decreases dissociation" misconception`,
  },
  {
    conceptId: WEAKAB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A weak acid (small Ka) is titrated with a strong base (NaOH). Does the reaction go to completion despite the acid being "weak"?',
    choices: [
      { text: 'Yes — the strong base consumes H⁺ as fast as it forms, continuously pulling the weak acid\'s equilibrium forward via Le Chatelier, so the neutralization proceeds essentially to completion', isCorrect: true },
      { text: 'No — a small Ka means the reaction can never proceed very far, regardless of what it\'s reacting with', isCorrect: false, misconceptionId: `${WEAKAB}:MC2` },
    ],
    correctValue: 'Yes — reaction goes essentially to completion',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${WEAKAB}:MC2`],
    source: `${WEAKAB_SRC} — misconception: small Ka limits total reaction extent regardless of the other reactant`,
  },
]

// ─── chem.equil.buffer ───────────────────────────────────────────────────────
const BUFFER = 'chem.equil.buffer'
const BUFFER_SRC = 'docs/chemistry/kg/graph.json — chem.equil.buffer'

const BUFFER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BUFFER,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A buffer RESISTS pH change when small amounts of acid or base are added. It needs ' +
      'BOTH a weak acid AND its conjugate base present together (like CH₃COOH + CH₃COO⁻, ' +
      'or a weak base + its conjugate acid). Why does it work? Add acid (H⁺) → the ' +
      'conjugate base (CH₃COO⁻) soaks it up: CH₃COO⁻ + H⁺ → CH₃COOH. Add base (OH⁻) → the ' +
      'weak acid neutralizes it: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. Either way, the added ' +
      'strong acid/base gets converted into the WEAK components already present, causing ' +
      'only a small pH shift instead of a dramatic one. The HENDERSON-HASSELBALCH ' +
      'equation calculates buffer pH directly: pH = pKa + log([A⁻]/[HA]) — when ' +
      '[A⁻]=[HA] (equal amounts), pH = pKa exactly, which is the buffer\'s point of MAXIMUM ' +
      'capacity (best resistance to pH change in both directions). BUFFER CAPACITY (how ' +
      'much acid/base it can absorb before failing) depends on the ABSOLUTE concentrations ' +
      'of the weak acid/base pair — more concentrated buffers resist more total addition, ' +
      'even at the same pH.',
    targetedMisconceptions: [`${BUFFER}:MC1`],
    source: `${BUFFER_SRC} — buffer mechanism, Henderson-Hasselbalch, buffer capacity`,
  },
  {
    conceptId: BUFFER,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "A buffer keeps pH COMPLETELY constant no matter how much acid or base you ' +
      'add." FALSE — buffers RESIST change but have a LIMITED capacity. Add enough strong ' +
      'acid/base and you\'ll eventually consume ALL of one buffer component (say, all the ' +
      'CH₃COO⁻ gets converted to CH₃COOH), at which point the buffer is "exhausted" and ' +
      'pH will change rapidly with any further addition — just like an unbuffered ' +
      'solution. This is why buffer capacity matters, not just buffer PRESENCE. Second ' +
      'trap: "You can make a buffer from just a weak acid alone, without adding its ' +
      'conjugate base." A weak acid ALONE (in water) is NOT a buffer — it only partially ' +
      'dissociates, creating some conjugate base naturally, but this small self-generated ' +
      'amount provides very poor buffering. A true buffer needs SIGNIFICANT quantities of ' +
      'BOTH the weak acid AND its conjugate base together (usually made by adding a salt ' +
      'of the conjugate base, like sodium acetate, to the weak acid solution).',
    targetedMisconceptions: [`${BUFFER}:MC1`, `${BUFFER}:MC2`],
    source: `${BUFFER_SRC} — misconception: buffers have unlimited capacity; weak acid alone is a buffer`,
  },
]

const BUFFER_PROBES: SeedProbe[] = [
  {
    conceptId: BUFFER,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A CH₃COOH/CH₃COO⁻ buffer has all its CH₃COO⁻ converted to CH₃COOH after excessive strong acid addition. What happens if MORE strong acid is added?',
    choices: [
      { text: 'The pH will drop rapidly, just like adding acid to an unbuffered solution — the buffer is exhausted since the conjugate base component is gone', isCorrect: true },
      { text: 'The pH will still stay roughly constant, since buffers resist pH change indefinitely regardless of how much acid is added', isCorrect: false, misconceptionId: `${BUFFER}:MC1` },
    ],
    correctValue: 'pH drops rapidly (buffer exhausted)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BUFFER}:MC1`],
    source: `${BUFFER_SRC} — distractor targets "buffers resist pH change indefinitely" misconception`,
  },
  {
    conceptId: BUFFER,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is a solution containing ONLY acetic acid (CH₃COOH) dissolved in water, with nothing else added, a good buffer?',
    choices: [
      { text: 'No — a weak acid alone only partially self-dissociates, generating a very small amount of conjugate base naturally, which is insufficient for meaningful buffering; you need significant added conjugate base (e.g., sodium acetate) to make a true buffer', isCorrect: true },
      { text: 'Yes — any weak acid solution automatically functions as a buffer since it partially dissociates into its conjugate base', isCorrect: false, misconceptionId: `${BUFFER}:MC2` },
    ],
    correctValue: 'No — needs significant added conjugate base',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BUFFER}:MC2`],
    source: `${BUFFER_SRC} — misconception: any weak acid solution alone constitutes a buffer`,
  },
]

// ─── chem.equil.hydrolysis ───────────────────────────────────────────────────
const HYDROL = 'chem.equil.hydrolysis'
const HYDROL_SRC = 'docs/chemistry/kg/graph.json — chem.equil.hydrolysis'

const HYDROL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HYDROL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Not all salts give NEUTRAL solutions when dissolved in water — some make the ' +
      'solution acidic or basic through SALT HYDROLYSIS, where an ion reacts with water. ' +
      'Four cases: (1) Strong acid + strong base salt (NaCl) → NEUTRAL, neither ion ' +
      'reacts with water. (2) Strong acid + weak base salt (NH₄Cl) → ACIDIC, the cation ' +
      '(NH₄⁺) is itself a weak acid: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺. (3) Weak acid + strong base ' +
      'salt (CH₃COONa) → BASIC, the anion (CH₃COO⁻) is a weak base: CH₃COO⁻ + H₂O ⇌ ' +
      'CH₃COOH + OH⁻. (4) Weak acid + weak base salt (CH₃COONH₄) → depends on the ' +
      'RELATIVE strengths of Ka and Kb — if Ka(conjugate acid) > Kb(conjugate base), ' +
      'net acidic; if Kb > Ka, net basic; if equal, neutral. The underlying principle: ' +
      'the conjugate of a WEAK acid/base is itself a measurably strong enough base/acid to ' +
      'shift water\'s own equilibrium (Kw) noticeably, while the conjugate of a STRONG ' +
      'acid/base is too weak to do anything (spectator ion).',
    targetedMisconceptions: [`${HYDROL}:MC1`],
    source: `${HYDROL_SRC} — salt hydrolysis, four cases by parent acid/base strength`,
  },
  {
    conceptId: HYDROL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "All salt solutions are neutral, since salts are formed by neutralization." ' +
      'FALSE — "neutralization" describes the REACTION (acid + base → salt + water), not ' +
      'the resulting solution\'s pH. Only salts of strong-acid+strong-base pairs give truly ' +
      'neutral solutions. NH₄Cl (from strong HCl + weak NH₃) is genuinely ACIDIC in ' +
      'solution — this trips up students who assume "salt = neutral" as a blanket rule. ' +
      'Second trap: "Cl⁻ from NaCl reacts with water just like NH₄⁺ does, contributing to ' +
      'hydrolysis." No — Cl⁻ is the conjugate base of the STRONG acid HCl, meaning it has ' +
      'essentially ZERO tendency to grab a proton back from water (as established earlier: ' +
      'strong acid → very weak conjugate base). Only conjugates of WEAK acids/bases ' +
      'hydrolyze measurably; conjugates of STRONG acids/bases are essentially inert ' +
      '"spectator" ions in water.',
    targetedMisconceptions: [`${HYDROL}:MC1`, `${HYDROL}:MC2`],
    source: `${HYDROL_SRC} — misconception: all salts are neutral; strong-acid conjugate bases hydrolyze too`,
  },
]

const HYDROL_PROBES: SeedProbe[] = [
  {
    conceptId: HYDROL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'NH₄Cl is formed from the reaction of strong acid HCl with weak base NH₃. What is the pH of an NH₄Cl solution?',
    choices: [
      { text: 'Acidic — NH₄⁺ (conjugate acid of the weak base NH₃) hydrolyzes water, producing excess H₃O⁺', isCorrect: true },
      { text: 'Neutral — all salts formed from acid-base neutralization reactions give neutral solutions', isCorrect: false, misconceptionId: `${HYDROL}:MC1` },
    ],
    correctValue: 'Acidic',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HYDROL}:MC1`],
    source: `${HYDROL_SRC} — distractor targets "all salts are neutral" misconception`,
  },
  {
    conceptId: HYDROL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does Cl⁻ (from dissolved NaCl) undergo hydrolysis with water, similar to how CH₃COO⁻ does?',
    choices: [
      { text: 'No — Cl⁻ is the conjugate base of the STRONG acid HCl, so it has essentially no tendency to reclaim a proton from water, unlike CH₃COO⁻ (conjugate base of the weak acid acetic acid)', isCorrect: true },
      { text: 'Yes — all anions from dissolved salts hydrolyze water to some measurable degree', isCorrect: false, misconceptionId: `${HYDROL}:MC2` },
    ],
    correctValue: 'No — Cl⁻ does not hydrolyze (spectator ion)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HYDROL}:MC2`],
    source: `${HYDROL_SRC} — misconception: strong-acid conjugate bases also hydrolyze measurably`,
  },
]

// ─── chem.equil.titration ────────────────────────────────────────────────────
const TITR = 'chem.equil.titration'
const TITR_SRC = 'docs/chemistry/kg/graph.json — chem.equil.titration'

const TITR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TITR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A titration slowly adds a solution of known concentration (titrant) to an unknown ' +
      'to find its concentration, tracked via a TITRATION CURVE (pH vs. volume added). ' +
      'The EQUIVALENCE POINT is where moles of acid exactly equal moles of base ' +
      '(stoichiometrically complete reaction) — NOT necessarily pH 7! For strong acid + ' +
      'strong base, equivalence point IS pH 7 (salt formed doesn\'t hydrolyze). For weak ' +
      'acid + strong base, equivalence point is BASIC (pH>7, because the salt formed ' +
      'hydrolyzes to give a basic solution, as covered in salt hydrolysis). For strong ' +
      'acid + weak base, equivalence point is ACIDIC (pH<7). The curve\'s STEEPEST point ' +
      '(inflection point) marks the equivalence point graphically. An INDICATOR is chosen ' +
      'so its color-change range (pKa ± 1) overlaps the steep vertical jump — NOT ' +
      'necessarily so its color changes exactly AT pH 7. The half-equivalence point (half ' +
      'the acid neutralized) is special: pH = pKa exactly there (from Henderson-Hasselbalch, ' +
      'when [A⁻]=[HA]) — a quick way to determine an unknown weak acid\'s Ka from its curve.',
    targetedMisconceptions: [`${TITR}:MC1`],
    source: `${TITR_SRC} — titration curves, equivalence point, indicator selection`,
  },
  {
    conceptId: TITR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Major trap: "The equivalence point is always at pH 7." FALSE — this is only true ' +
      'for strong acid + strong base titrations. Weak acid + strong base gives a BASIC ' +
      'equivalence point (the salt formed hydrolyzes to make the solution basic), and ' +
      'strong acid + weak base gives an ACIDIC equivalence point. Choosing phenolphthalein ' +
      '(changes color around pH 8-10) for a weak-acid/strong-base titration is CORRECT ' +
      'precisely because the equivalence point IS basic there, not despite it. Second trap: ' +
      '"An indicator must change color exactly at pH 7 to be a good choice." No — the ' +
      'indicator just needs its color-change range to fall within the STEEP VERTICAL ' +
      'JUMP of the titration curve (which could be centered anywhere from pH 4 to pH 10 ' +
      'depending on the acid/base strengths), not at any fixed universal value.',
    targetedMisconceptions: [`${TITR}:MC1`, `${TITR}:MC2`],
    source: `${TITR_SRC} — misconception: equivalence point is always pH 7; indicators must change at pH 7`,
  },
]

const TITR_PROBES: SeedProbe[] = [
  {
    conceptId: TITR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a titration of weak acetic acid with strong NaOH, what is the pH at the equivalence point?',
    choices: [
      { text: 'Greater than 7 (basic) — the sodium acetate salt formed hydrolyzes, since acetate is the conjugate base of a weak acid', isCorrect: true },
      { text: 'Exactly 7 — all acid-base titrations reach neutral pH at the equivalence point', isCorrect: false, misconceptionId: `${TITR}:MC1` },
    ],
    correctValue: 'Greater than 7 (basic)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TITR}:MC1`],
    source: `${TITR_SRC} — distractor targets "equivalence point is always pH 7" misconception`,
  },
  {
    conceptId: TITR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is phenolphthalein (color change range pH 8-10) an appropriate indicator for a weak acid/strong base titration, rather than an indicator that changes at pH 7?',
    choices: [
      { text: 'The equivalence point for this titration is basic (around pH 8-9), so an indicator whose range overlaps the steep vertical jump AT that basic pH gives the most accurate endpoint', isCorrect: true },
      { text: 'It is not actually appropriate — a pH 7 indicator would always be the correct universal choice for any titration', isCorrect: false, misconceptionId: `${TITR}:MC2` },
    ],
    correctValue: 'Matches the actual (basic) equivalence point of this titration',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${TITR}:MC2`],
    source: `${TITR_SRC} — misconception: indicators must always change color at pH 7 regardless of titration type`,
  },
]

// ─── chem.bond.vsepr ─────────────────────────────────────────────────────────
const VSEPR = 'chem.bond.vsepr'
const VSEPR_SRC = 'docs/chemistry/kg/graph.json — chem.bond.vsepr'

const VSEPR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VSEPR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'VSEPR (Valence Shell Electron Pair Repulsion) predicts molecular SHAPE with one ' +
      'simple rule: electron pairs around a central atom REPEL each other and arrange ' +
      'themselves as FAR APART as possible in 3D space. Count the total electron ' +
      'domains (bonding pairs + lone pairs) around the central atom: 2 domains → linear ' +
      '(180°); 3 domains → trigonal planar (120°); 4 domains → tetrahedral (109.5°); 5 ' +
      'domains → trigonal bipyramidal; 6 domains → octahedral. Crucially, LONE PAIRS ' +
      'count toward the ELECTRON GEOMETRY (which determines the angles) but are ' +
      'INVISIBLE in the reported MOLECULAR GEOMETRY (which only names the shape traced ' +
      'by the ATOMS). Water (O with 2 bonding pairs + 2 lone pairs) has TETRAHEDRAL ' +
      'electron geometry but BENT molecular geometry (the two lone pairs are still there, ' +
      'pushing the H atoms together, but we don\'t "see" them when naming the shape). Lone ' +
      'pairs repel MORE strongly than bonding pairs (they\'re held closer to the nucleus, ' +
      'less spread out), which is why water\'s H-O-H angle (104.5°) is slightly LESS than ' +
      'perfect tetrahedral (109.5°) — the lone pairs squeeze the bonding pairs closer.',
    targetedMisconceptions: [`${VSEPR}:MC1`],
    source: `${VSEPR_SRC} — VSEPR theory, electron domains, electron vs molecular geometry`,
  },
  {
    conceptId: VSEPR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Molecular geometry and electron geometry are always the same thing, just ' +
      'different names." FALSE whenever lone pairs are present. Ammonia (NH₃): N has 3 ' +
      'bonding pairs + 1 lone pair = 4 total domains = TETRAHEDRAL electron geometry, but ' +
      'the MOLECULAR geometry (what atoms you actually see/draw) is TRIGONAL PYRAMIDAL — ' +
      'the lone pair occupies one "corner" of the tetrahedron but is invisible in the ' +
      'named shape. They\'re only identical when there are ZERO lone pairs (like CH₄, ' +
      'both tetrahedral). Second trap: "Double and triple bonds count as multiple electron ' +
      'domains, proportional to bond order." No — for VSEPR purposes, a double or triple ' +
      'bond STILL counts as just ONE electron domain (one region of electron density), ' +
      'not two or three. CO₂ (O=C=O) has only 2 electron domains around carbon (2 double ' +
      'bonds = 2 domains, not 4), giving LINEAR geometry.',
    targetedMisconceptions: [`${VSEPR}:MC1`, `${VSEPR}:MC2`],
    source: `${VSEPR_SRC} — misconception: electron/molecular geometry always identical; multiple bonds count as multiple domains`,
  },
]

const VSEPR_PROBES: SeedProbe[] = [
  {
    conceptId: VSEPR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Ammonia (NH₃) has 3 bonding pairs and 1 lone pair around nitrogen. What is its MOLECULAR geometry (not electron geometry)?',
    choices: [
      { text: 'Trigonal pyramidal — the electron geometry is tetrahedral (4 domains), but the molecular shape only describes the 3 visible N-H bonds, not the invisible lone pair', isCorrect: true },
      { text: 'Tetrahedral — molecular geometry always matches electron geometry exactly', isCorrect: false, misconceptionId: `${VSEPR}:MC1` },
    ],
    correctValue: 'Trigonal pyramidal',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VSEPR}:MC1`],
    source: `${VSEPR_SRC} — distractor targets conflating electron geometry with molecular geometry`,
  },
  {
    conceptId: VSEPR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'CO₂ has the structure O=C=O with two double bonds around carbon. How many electron domains does carbon have for VSEPR purposes?',
    choices: [
      { text: '2 domains — each double bond counts as ONE electron domain regardless of bond order, giving carbon 2 total domains and linear geometry', isCorrect: true },
      { text: '4 domains — each double bond counts as 2 domains since it contains 2 bonding pairs', isCorrect: false, misconceptionId: `${VSEPR}:MC2` },
    ],
    correctValue: '2 domains (linear geometry)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VSEPR}:MC2`],
    source: `${VSEPR_SRC} — misconception: multiple bonds count as multiple separate electron domains`,
  },
]

// ─── chem.bond.hybridization ─────────────────────────────────────────────────
const HYBRID = 'chem.bond.hybridization'
const HYBRID_SRC = 'docs/chemistry/kg/graph.json — chem.bond.hybridization'

const HYBRID_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HYBRID,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Pure atomic orbitals (s, p, d) don\'t always point in the right directions to ' +
      'explain observed molecular shapes — carbon\'s actual 2s and three 2p orbitals ' +
      'aren\'t naturally arranged tetrahedrally. HYBRIDIZATION is the mathematical mixing ' +
      'of atomic orbitals into NEW hybrid orbitals with the correct geometry to match ' +
      'VSEPR predictions. sp³ (mix 1 s + 3 p) → 4 equivalent orbitals, tetrahedral ' +
      '(109.5°) — methane\'s carbon. sp² (mix 1 s + 2 p) → 3 equivalent orbitals, ' +
      'trigonal planar (120°), LEAVES ONE unhybridized p orbital — this leftover p ' +
      'orbital is what forms π bonds in double bonds (ethene\'s carbons). sp (mix 1 s + 1 ' +
      'p) → 2 equivalent orbitals, linear (180°), leaves TWO unhybridized p orbitals for ' +
      'TWO π bonds — this is why triple bonds work (one σ + two π). The number of hybrid ' +
      'orbitals ALWAYS equals the number of electron domains (VSEPR connection): 4 ' +
      'domains → sp³, 3 domains → sp², 2 domains → sp. Hybridization EXPLAINS why real ' +
      'molecular geometries match VSEPR predictions at the orbital level.',
    targetedMisconceptions: [`${HYBRID}:MC1`],
    source: `${HYBRID_SRC} — sp/sp²/sp³ hybridization, connection to VSEPR and bond types`,
  },
  {
    conceptId: HYBRID,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Hybridization is a real physical process that atoms undergo, like a chemical ' +
      'reaction." Not quite — hybridization is a MATHEMATICAL MODEL (a way of combining ' +
      'wavefunctions) that conveniently explains observed geometries, not necessarily a ' +
      'literal physical event that "happens" to an atom. It\'s a useful approximation, ' +
      'not a measurable physical transformation you could observe in real time. Second ' +
      'trap: "All π bonds require unhybridized p orbitals from BOTH atoms perfectly ' +
      'aligned, and this alignment is automatic/free." Actually, π bond formation via ' +
      'unhybridized p orbitals REQUIRES the two p orbitals to be PARALLEL, which is ' +
      'exactly why double bonds are RIGID (no free rotation around them — rotating would ' +
      'misalign the p orbitals and break the π bond). This is the structural basis for ' +
      'cis/trans isomerism: single bonds (sp³-sp³, only σ) rotate freely, but double bonds ' +
      '(with a π component) are locked in place.',
    targetedMisconceptions: [`${HYBRID}:MC1`, `${HYBRID}:MC2`],
    source: `${HYBRID_SRC} — misconception: hybridization is a literal physical process; double bonds rotate freely`,
  },
]

const HYBRID_PROBES: SeedProbe[] = [
  {
    conceptId: HYBRID,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A carbon atom in ethene (H₂C=CH₂) has 3 electron domains (2 C-H bonds + 1 C=C bond, treating the double bond as one domain). What hybridization does this carbon have?',
    choices: [
      { text: 'sp² — 3 electron domains means sp² hybridization (mixing 1 s + 2 p orbitals), leaving one unhybridized p orbital for the π bond', isCorrect: true },
      { text: 'sp³ — carbon always uses sp³ hybridization by default', isCorrect: false, misconceptionId: `${HYBRID}:MC3` },
    ],
    correctValue: 'sp²',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HYBRID}:MC3`],
    source: `${HYBRID_SRC} — distractor targets assuming carbon defaults to sp³ regardless of domain count`,
  },
  {
    conceptId: HYBRID,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Why can\'t the two carbons in a C=C double bond rotate freely relative to each other, unlike a C-C single bond?',
    choices: [
      { text: 'The π bond requires unhybridized p orbitals on both carbons to remain PARALLEL for effective overlap; rotating would misalign these p orbitals and break the π bond', isCorrect: true },
      { text: 'Double bonds are simply "stronger" in a way that mechanically locks rotation, unrelated to orbital orientation', isCorrect: false, misconceptionId: `${HYBRID}:MC2` },
    ],
    correctValue: 'π bond requires parallel p orbital alignment',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${HYBRID}:MC2`],
    source: `${HYBRID_SRC} — misconception: double bond rigidity is generic "strength" rather than orbital alignment`,
  },
]

// ─── chem.bond.resonance ─────────────────────────────────────────────────────
const RESON = 'chem.bond.resonance'
const RESON_SRC = 'docs/chemistry/kg/graph.json — chem.bond.resonance'

const RESON_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RESON,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Some molecules can\'t be accurately drawn with just ONE Lewis structure. Ozone ' +
      '(O₃) experimentally has TWO IDENTICAL O-O bond lengths (128 pm, in between a ' +
      'single bond ~148pm and double bond ~121pm) — but any single Lewis structure ' +
      'shows one O-O as single and the other as double, which would predict two DIFFERENT ' +
      'lengths. The resolution: RESONANCE — the true structure is a BLEND (hybrid) of ' +
      'multiple valid Lewis structures, not a rapid flipping between them (a common ' +
      'misconception addressed below). The REAL molecule is a single, unchanging ' +
      'structure with bond properties INTERMEDIATE between the resonance forms — like ' +
      'a mule being a blend of horse and donkey, not an animal that alternates between ' +
      'being a horse and a donkey. Resonance structures must have the SAME atomic ' +
      'positions and same number of electrons — only electron/bond arrangement differs. ' +
      'More resonance structures (especially ones with favorable charge distribution) ' +
      'generally means more STABILITY (delocalization energy) — this is why benzene\'s ' +
      'ring, with extensive resonance, is unusually stable.',
    targetedMisconceptions: [`${RESON}:MC1`],
    source: `${RESON_SRC} — resonance structures, hybrid concept, bond length averaging`,
  },
  {
    conceptId: RESON,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'The single most damaging misconception about resonance: "The molecule rapidly ' +
      'FLIPS or OSCILLATES between the different resonance structures over time." FALSE. ' +
      'There is only ONE real structure — the resonance HYBRID — which is static and ' +
      'unchanging, with bond properties that are the WEIGHTED AVERAGE of all contributing ' +
      'structures. The individual "resonance structures" we draw are not real, ' +
      'interconvertible molecules; they\'re just our imperfect NOTATION attempting to ' +
      'represent one true delocalized structure using tools (Lewis structures) that were ' +
      'designed for localized bonding. No bond is ever literally "single" then "double" ' +
      'at different moments in ozone — both O-O bonds are PERMANENTLY intermediate in ' +
      'character, always. Second trap: "All possible resonance structures contribute ' +
      'EQUALLY to the hybrid." False — structures with formal charges on more ' +
      'electronegative atoms, fewer formal charges overall, and complete octets ' +
      'contribute MORE than less favorable structures; the hybrid is a weighted, not ' +
      'equal, average.',
    targetedMisconceptions: [`${RESON}:MC1`, `${RESON}:MC2`],
    source: `${RESON_SRC} — misconception: molecule oscillates between resonance forms; all forms contribute equally`,
  },
]

const RESON_PROBES: SeedProbe[] = [
  {
    conceptId: RESON,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Ozone (O₃) has two resonance structures with the double bond on different sides. What does this tell you about the actual molecule?',
    choices: [
      { text: 'The real molecule is a single, static hybrid with both O-O bonds having identical, intermediate bond length/order — it does NOT flip between the two drawn structures over time', isCorrect: true },
      { text: 'The molecule rapidly oscillates between the two structures, spending equal time as each', isCorrect: false, misconceptionId: `${RESON}:MC1` },
    ],
    correctValue: 'Static hybrid with intermediate, identical bonds',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${RESON}:MC1`],
    source: `${RESON_SRC} — distractor targets "molecule oscillates between resonance forms" misconception`,
  },
  {
    conceptId: RESON,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A molecule has three possible resonance structures: one with no formal charges, and two with formal charges on less electronegative atoms. Do all three contribute equally to the true hybrid?',
    choices: [
      { text: 'No — the structure with no formal charges contributes MORE to the hybrid (is more stable/favorable) than the charge-separated structures; the hybrid is a weighted average, not an equal one', isCorrect: true },
      { text: 'Yes — every valid resonance structure contributes exactly equally regardless of formal charges', isCorrect: false, misconceptionId: `${RESON}:MC2` },
    ],
    correctValue: 'No — weighted by stability, not equal contribution',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${RESON}:MC2`],
    source: `${RESON_SRC} — misconception: all resonance structures contribute equally to the hybrid`,
  },
]

// ─── chem.bond.bond-parameters ───────────────────────────────────────────────
const BPARAM = 'chem.bond.bond-parameters'
const BPARAM_SRC = 'docs/chemistry/kg/graph.json — chem.bond.bond-parameters'

const BPARAM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BPARAM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Bonds have measurable, characteristic properties. BOND LENGTH (distance between ' +
      'nuclei) DECREASES as bond order increases (triple < double < single) and DECREASES ' +
      'as atoms get smaller (across a period). BOND ENERGY (energy to break the bond, ' +
      'always endothermic for breaking) INCREASES as bond order increases and as bond ' +
      'length decreases (shorter, tighter bonds are generally stronger). BOND ANGLE ' +
      'reflects the geometry around the atom (covered in VSEPR). DIPOLE MOMENT (μ = q × d, ' +
      'a vector quantity) measures how unevenly charge is distributed within a bond or ' +
      'molecule — it has both MAGNITUDE and DIRECTION. Critically: a molecule can have ' +
      'individually POLAR bonds but be NONPOLAR OVERALL if the bond dipoles cancel by ' +
      'symmetry (like CO₂\'s two polar C=O bonds pointing in exactly opposite directions, ' +
      'canceling to zero net dipole) — you must vector-sum ALL bond dipoles, accounting ' +
      'for molecular geometry, not just look at individual bond polarities.',
    targetedMisconceptions: [`${BPARAM}:MC1`],
    source: `${BPARAM_SRC} — bond length, bond energy, bond angle, dipole moment`,
  },
  {
    conceptId: BPARAM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "If a molecule has polar bonds, the molecule itself must be polar." FALSE — ' +
      'CO₂ has two polar C=O bonds (oxygen more electronegative, pulling electron density ' +
      'away from carbon), but the molecule is LINEAR and symmetric, so the two bond ' +
      'dipoles point in exactly opposite directions and cancel VECTORIALLY, giving a net ' +
      'molecular dipole of ZERO — CO₂ is nonpolar overall despite having polar bonds. ' +
      'CCl₄ (tetrahedral, symmetric) is another classic example: polar C-Cl bonds, ' +
      'nonpolar molecule. You must consider molecular GEOMETRY (from VSEPR), not just bond ' +
      'polarity, to determine overall molecular polarity. Second trap: "Bond energy and ' +
      'bond enthalpy are exactly numerically identical always." Close but subtly ' +
      'different — bond DISSOCIATION energy is measured for one specific bond in one ' +
      'specific molecule, while average bond ENERGY (used in tables) is an average across ' +
      'many different molecules containing that bond type, since the exact energy varies ' +
      'slightly depending on the rest of the molecule\'s structure.',
    targetedMisconceptions: [`${BPARAM}:MC1`],
    source: `${BPARAM_SRC} — misconception: polar bonds always mean polar molecule (ignoring geometric cancellation)`,
  },
]

const BPARAM_PROBES: SeedProbe[] = [
  {
    conceptId: BPARAM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'CCl₄ has four polar C-Cl bonds (Cl is more electronegative than C). Is the CCl₄ molecule itself polar?',
    choices: [
      { text: 'No — the tetrahedral symmetry causes the four bond dipoles to cancel vectorially, giving zero net molecular dipole despite the individually polar bonds', isCorrect: true },
      { text: 'Yes — any molecule containing polar bonds is automatically a polar molecule', isCorrect: false, misconceptionId: `${BPARAM}:MC1` },
    ],
    correctValue: 'No — nonpolar overall due to symmetric cancellation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BPARAM}:MC1`],
    source: `${BPARAM_SRC} — distractor targets "polar bonds = polar molecule" misconception`,
  },
  {
    conceptId: BPARAM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Water (bent geometry) has two polar O-H bonds. Unlike CO₂ (linear, nonpolar), water IS a polar molecule overall. Why the difference?',
    choices: [
      { text: 'Water\'s bent geometry means the two O-H bond dipoles do NOT point in exactly opposite directions, so they don\'t fully cancel — there\'s a net dipole pointing toward oxygen; CO₂\'s linear symmetry causes complete cancellation', isCorrect: true },
      { text: 'Water\'s O-H bonds are simply more polar than CO₂\'s C=O bonds, which is why water ends up polar overall', isCorrect: false, misconceptionId: `${BPARAM}:MC2` },
    ],
    correctValue: 'Geometry (bent vs linear) determines whether dipoles cancel',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BPARAM}:MC2`],
    source: `${BPARAM_SRC} — misconception: individual bond polarity magnitude (not geometry) determines molecular polarity`,
  },
]

// ─── chem.bond.coordinate-bond ───────────────────────────────────────────────
const COORDB = 'chem.bond.coordinate-bond'
const COORDB_SRC = 'docs/chemistry/kg/graph.json — chem.bond.coordinate-bond'

const COORDB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COORDB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A COORDINATE (dative) bond is a covalent bond where BOTH shared electrons come ' +
      'from ONE atom, rather than one electron from each (as in ordinary covalent bonds). ' +
      'Classic example: NH₃ + H⁺ → NH₄⁺ — nitrogen\'s lone pair is donated entirely to the ' +
      'incoming H⁺ (which has zero electrons to contribute, being a bare proton). Once ' +
      'formed, though, a coordinate bond is INDISTINGUISHABLE from any other covalent bond ' +
      '— all four N-H bonds in NH₄⁺ are identical in length and strength; you can\'t point ' +
      'to "the coordinate one" after formation. The DISTINCTION only matters for tracking ' +
      'the bond\'s ORIGIN (electron source), not its final properties. This concept ' +
      'explains many important structures: H₃O⁺ (water\'s lone pair bonds to H⁺), NH₄⁺, ' +
      'and — critically for later topics — the entire foundation of COORDINATION ' +
      'COMPOUNDS/complexes, where ligands donate electron pairs to a central metal ion ' +
      '(Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺, each N-Cu bond is coordinate, with nitrogen donating ' +
      'both electrons).',
    targetedMisconceptions: [`${COORDB}:MC1`],
    source: `${COORDB_SRC} — coordinate/dative bonding, formation and post-formation equivalence`,
  },
  {
    conceptId: COORDB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "A coordinate bond is somehow weaker or different in character from a ' +
      'normal covalent bond, even after formation." FALSE — once formed, a coordinate ' +
      'bond IS a normal covalent bond, full stop. In NH₄⁺, you cannot experimentally ' +
      'distinguish which of the four N-H bonds was "originally" coordinate (formed from ' +
      'N\'s lone pair + H⁺) versus the three that were "originally" ordinary covalent ' +
      'bonds (formed during NH₃\'s synthesis) — all four are chemically and physically ' +
      'IDENTICAL. The "coordinate" label describes only the bond\'s FORMATION HISTORY, a ' +
      'bookkeeping detail, not a permanent structural feature. Second trap: "Coordinate ' +
      'bonding is rare and only relevant to a few obscure examples." Actually, it\'s the ' +
      'foundational bonding type for ALL transition metal coordination complexes ' +
      '(hemoglobin\'s iron-nitrogen bonds, chlorophyll\'s magnesium-nitrogen bonds, and ' +
      'countless industrial catalysts) — it\'s one of the most biologically and ' +
      'industrially important bonding concepts in chemistry.',
    targetedMisconceptions: [`${COORDB}:MC1`, `${COORDB}:MC2`],
    source: `${COORDB_SRC} — misconception: coordinate bonds are permanently distinguishable/weaker; rare in importance`,
  },
]

const COORDB_PROBES: SeedProbe[] = [
  {
    conceptId: COORDB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In NH₄⁺, one N-H bond formed as a coordinate bond (N donated both electrons to H⁺) while the other three formed as ordinary covalent bonds. Can you experimentally distinguish which bond is which today?',
    choices: [
      { text: 'No — all four N-H bonds are identical in length, strength, and every measurable property; the "coordinate" label only describes formation history, not a lasting structural difference', isCorrect: true },
      { text: 'Yes — the coordinate bond remains measurably weaker than the other three even after formation', isCorrect: false, misconceptionId: `${COORDB}:MC1` },
    ],
    correctValue: 'No — all four bonds are identical',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COORDB}:MC1`],
    source: `${COORDB_SRC} — distractor targets "coordinate bonds remain distinguishable/weaker" misconception`,
  },
  {
    conceptId: COORDB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is coordinate (dative) bonding a rare, obscure phenomenon relevant to only a few specific molecules?',
    choices: [
      { text: 'No — it is the foundational bonding mechanism for ALL transition metal coordination complexes, including biologically vital structures like hemoglobin and chlorophyll', isCorrect: true },
      { text: 'Yes — coordinate bonding is limited to a small handful of textbook examples like NH₄⁺ and has little broader significance', isCorrect: false, misconceptionId: `${COORDB}:MC2` },
    ],
    correctValue: 'No — it underlies coordination chemistry broadly',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${COORDB}:MC2`],
    source: `${COORDB_SRC} — misconception: coordinate bonding has narrow/limited significance`,
  },
]

// ─── chem.equil.complex-equil ────────────────────────────────────────────────
const COMPLEQ = 'chem.equil.complex-equil'
const COMPLEQ_SRC = 'docs/chemistry/kg/graph.json — chem.equil.complex-equil'

const COMPLEQ_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLEQ,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Metal ions in solution don\'t sit alone — they bond with LIGANDS (electron-pair ' +
      'donors, using coordinate bonding as covered before) to form COMPLEX IONS: ' +
      'Cu²⁺ + 4NH₃ ⇌ [Cu(NH₃)₄]²⁺. This is an EQUILIBRIUM, governed by the FORMATION ' +
      'CONSTANT K_f = [complex]/([metal][ligand]ⁿ) — a LARGE K_f means the complex is ' +
      'very stable (formation strongly favored). The reverse process (complex breaking ' +
      'apart) uses the DISSOCIATION CONSTANT K_d = 1/K_f. Complex formation dramatically ' +
      'INCREASES a metal salt\'s effective solubility — AgCl is nearly insoluble (small ' +
      'K_sp), but adding excess NH₃ forms [Ag(NH₃)₂]⁺, which pulls the AgCl ⇌ Ag⁺+Cl⁻ ' +
      'equilibrium FORWARD (Le Chatelier — removing Ag⁺ as it forms the complex), ' +
      'dissolving MUCH more AgCl than water alone would allow. This coupled-equilibria ' +
      'principle (one equilibrium shifting another by consuming a shared species) ' +
      'underlies qualitative analysis schemes for identifying metal ions and many ' +
      'industrial metal extraction/purification processes.',
    targetedMisconceptions: [`${COMPLEQ}:MC1`],
    source: `${COMPLEQ_SRC} — formation constant Kf, ligand binding, coupled equilibria with Ksp`,
  },
  {
    conceptId: COMPLEQ,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Since AgCl has a tiny Ksp, it can never meaningfully dissolve, regardless ' +
      'of what else is added to the solution." FALSE — this ignores COUPLED EQUILIBRIA. ' +
      'Adding excess ammonia continuously removes free Ag⁺ (by trapping it as ' +
      '[Ag(NH₃)₂]⁺), which — by Le Chatelier — pulls the AgCl dissolution equilibrium ' +
      'forward relentlessly, dissolving progressively more solid AgCl even though Ksp ' +
      'itself hasn\'t changed. Ksp only limits solubility in a system where free Ag⁺ has ' +
      'nowhere else to go; once a competing equilibrium consumes it, much more can ' +
      'dissolve. Second trap: "A large formation constant Kf means the complex forms ' +
      'FAST." Kf (like K in general) is a THERMODYNAMIC quantity describing the position ' +
      'of equilibrium, not the KINETIC rate of getting there — a complex could have huge ' +
      'Kf (thermodynamically very stable once formed) but form slowly if the ligand ' +
      'substitution mechanism has a high activation energy.',
    targetedMisconceptions: [`${COMPLEQ}:MC1`, `${COMPLEQ}:MC2`],
    source: `${COMPLEQ_SRC} — misconception: Ksp is an absolute solubility limit; large Kf implies fast formation`,
  },
]

const COMPLEQ_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLEQ,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Solid AgCl (very small Ksp) is added to water — barely any dissolves. What happens if excess NH₃ is then added?',
    choices: [
      { text: 'More AgCl dissolves — NH₃ traps free Ag⁺ as [Ag(NH₃)₂]⁺, continuously removing Ag⁺ and pulling the AgCl dissolution equilibrium forward via Le Chatelier', isCorrect: true },
      { text: 'No change — Ksp is fixed, so the same tiny amount of AgCl will always be the maximum that can dissolve, regardless of other additions', isCorrect: false, misconceptionId: `${COMPLEQ}:MC1` },
    ],
    correctValue: 'More AgCl dissolves via coupled equilibria',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COMPLEQ}:MC1`],
    source: `${COMPLEQ_SRC} — distractor targets treating Ksp as an absolute, uncoupled solubility ceiling`,
  },
  {
    conceptId: COMPLEQ,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A metal complex has an extremely large formation constant Kf (10²⁰). Does this mean the complex forms quickly when the metal ion and ligand are mixed?',
    choices: [
      { text: 'Not necessarily — Kf describes the thermodynamic equilibrium position (how stable the complex is once formed), not the kinetic rate of formation, which depends on the reaction mechanism and its activation energy', isCorrect: true },
      { text: 'Yes — a large equilibrium constant always guarantees the reaction proceeds rapidly', isCorrect: false, misconceptionId: `${COMPLEQ}:MC2` },
    ],
    correctValue: 'Not necessarily — thermodynamics ≠ kinetics',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COMPLEQ}:MC2`],
    source: `${COMPLEQ_SRC} — misconception: large K implies fast kinetics`,
  },
]

// ─── chem.sblock.hydrogen ────────────────────────────────────────────────────
const HYDR = 'chem.sblock.hydrogen'
const HYDR_SRC = 'docs/chemistry/kg/graph.json — chem.sblock.hydrogen'

const HYDR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HYDR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Hydrogen is chemistry\'s great misfit — it doesn\'t truly belong to ANY group, ' +
      'despite usually being drawn atop Group 1. It has just 1 electron (like Group 1: ' +
      'can lose it to form H⁺) but is only ONE electron short of a full shell (like Group ' +
      '17: can gain one to form H⁻, called a HYDRIDE ion). This dual nature means ' +
      'hydrogen forms compounds spanning both families: with reactive metals (NaH, CaH₂ — ' +
      'ionic hydrides, H is −1) and with nonmetals (HCl, H₂O, CH₄ — covalent compounds, H ' +
      'is +1). THREE ISOTOPES exist with dramatically different relative mass differences ' +
      '(more significant than for any other element, since doubling/tripling mass from 1 ' +
      'to 2 or 3 is huge proportionally): protium (¹H, no neutrons, 99.98% abundance), ' +
      'deuterium (²H or D, 1 neutron, ~0.02%), tritium (³H or T, 2 neutrons, radioactive, ' +
      'trace). Hydrogen gas (H₂) is used industrially in the Haber process (making ' +
      'ammonia), hydrogenation of oils, and increasingly as a clean fuel (H₂ + ½O₂ → H₂O, ' +
      'releasing energy with water as the only product).',
    targetedMisconceptions: [`${HYDR}:MC1`],
    source: `${HYDR_SRC} — hydrogen's dual nature, isotopes, hydride formation`,
  },
  {
    conceptId: HYDR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Hydrogen belongs firmly in Group 1 (like sodium/potassium), full stop." ' +
      'Misleading — hydrogen shares SOME Group 1 similarities (1 valence electron, forms ' +
      '+1 ions) but is fundamentally DIFFERENT in crucial ways: hydrogen is a gas at room ' +
      'temperature (alkali metals are solids), hydrogen doesn\'t form a metallic lattice, ' +
      'and hydrogen can ALSO gain an electron to form H⁻ (something alkali metals ' +
      'essentially never do, since they have very low electron affinity). Its placement ' +
      'atop Group 1 in most periodic tables is a positional convenience (1 valence ' +
      'electron), not a claim that hydrogen truly behaves like an alkali metal. Second ' +
      'trap: "Deuterium and protium are chemically indistinguishable, being isotopes." ' +
      'Mostly true (isotopes share chemistry, as established earlier), BUT hydrogen is ' +
      'the UNIQUE exception where the mass difference is so proportionally huge (D is ' +
      'literally double the mass of H) that reaction RATES can differ measurably (the ' +
      '"kinetic isotope effect") — D-containing bonds break more slowly than H-containing ' +
      'ones, a subtle but real, measurable difference unique to hydrogen\'s isotopes.',
    targetedMisconceptions: [`${HYDR}:MC1`, `${HYDR}:MC2`],
    source: `${HYDR_SRC} — misconception: hydrogen is a true Group 1 member; isotopes are always chemically identical`,
  },
]

const HYDR_PROBES: SeedProbe[] = [
  {
    conceptId: HYDR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Why is hydrogen\'s placement in the periodic table considered ambiguous, despite usually being shown at the top of Group 1?',
    choices: [
      { text: 'Hydrogen shares SOME Group 1 traits (1 valence electron, forms +1 ions) but also behaves like Group 17 in some ways (can gain an electron to form H⁻), and lacks other defining metallic properties of Group 1 elements', isCorrect: true },
      { text: 'It isn\'t actually ambiguous — hydrogen is unambiguously and completely a typical Group 1 alkali metal in every respect', isCorrect: false, misconceptionId: `${HYDR}:MC1` },
    ],
    correctValue: 'Hydrogen has dual/hybrid character, fitting neither group cleanly',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${HYDR}:MC1`],
    source: `${HYDR_SRC} — distractor targets treating hydrogen as a straightforward Group 1 element`,
  },
  {
    conceptId: HYDR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Deuterium (²H) and protium (¹H) are isotopes with identical electron configurations. Do reactions involving D-containing bonds proceed at exactly the same rate as H-containing bonds?',
    choices: [
      { text: 'Not always — hydrogen\'s isotopes are a special case where the proportionally huge mass difference (D is double the mass of H) causes a measurable "kinetic isotope effect," with D-bonds typically breaking more slowly', isCorrect: true },
      { text: 'Yes — since isotopes are chemically identical by definition, reaction rates are always identical too', isCorrect: false, misconceptionId: `${HYDR}:MC2` },
    ],
    correctValue: 'Not always — kinetic isotope effect exists for H/D',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${HYDR}:MC2`],
    source: `${HYDR_SRC} — misconception: overextending "isotopes have identical chemistry" to reaction kinetics`,
  },
]

// ─── chem.anal.chromatography ────────────────────────────────────────────────
const CHROMA = 'chem.anal.chromatography'
const CHROMA_SRC = 'docs/chemistry/kg/graph.json — chem.anal.chromatography'

const CHROMA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHROMA,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Chromatography separates mixtures by exploiting DIFFERENTIAL AFFINITY between ' +
      'two phases: a STATIONARY PHASE (fixed — paper, silica gel, a column packing) and a ' +
      'MOBILE PHASE (moving — a solvent, or a gas). Components that interact MORE ' +
      'strongly with the stationary phase move SLOWER (they keep getting "stuck" and ' +
      'released); components that prefer the mobile phase move FASTER, racing ahead. This ' +
      'differential speed physically separates a mixture into distinct bands/spots. In ' +
      'paper chromatography, the RETENTION FACTOR R_f = (distance traveled by ' +
      'compound)/(distance traveled by solvent front) is a CHARACTERISTIC, reproducible ' +
      'value for a given compound under fixed conditions (same solvent, same paper, same ' +
      'temperature) — used to identify unknown substances by comparing to known R_f ' +
      'values. Column chromatography scales this up for larger-scale purification. ' +
      'Gas chromatography (GC) separates volatile compounds by boiling point and column ' +
      'interaction, widely used in forensics, drug testing, and environmental analysis.',
    targetedMisconceptions: [`${CHROMA}:MC1`],
    source: `${CHROMA_SRC} — chromatography principle, Rf value, types (paper/column/GC)`,
  },
  {
    conceptId: CHROMA,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "A compound that moves FARTHER up the paper (higher R_f) is interacting ' +
      'MORE strongly with the stationary phase." BACKWARDS — a HIGH R_f means the ' +
      'compound moved a LARGE fraction of the solvent\'s distance, meaning it spent MORE ' +
      'time in the MOBILE phase (weaker attraction to the stationary phase). A LOW R_f ' +
      'means the compound is strongly attracted to (and repeatedly held back by) the ' +
      'stationary phase, so it barely moves. Higher R_f = weaker stationary-phase ' +
      'affinity, not stronger. Second trap: "R_f values are universal constants for a ' +
      'compound, true across any chromatography setup." False — R_f depends on the ' +
      'SPECIFIC solvent, stationary phase material, temperature, and even paper batch ' +
      'used. R_f is only reproducible/comparable when conditions are IDENTICAL — that\'s ' +
      'why forensic/analytical labs must run a known reference sample alongside the ' +
      'unknown under the exact same conditions, rather than relying on a published table ' +
      'value from a different setup.',
    targetedMisconceptions: [`${CHROMA}:MC1`, `${CHROMA}:MC2`],
    source: `${CHROMA_SRC} — misconception: high Rf means strong stationary-phase affinity; Rf is a universal constant`,
  },
]

const CHROMA_PROBES: SeedProbe[] = [
  {
    conceptId: CHROMA,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In paper chromatography, Compound A has Rf = 0.85 and Compound B has Rf = 0.15. Which compound is more strongly attracted to the stationary phase (paper)?',
    choices: [
      { text: 'Compound B — its low Rf means it moved very little relative to the solvent front, indicating it was repeatedly held back by strong attraction to the stationary phase', isCorrect: true },
      { text: 'Compound A — its high Rf means it is more strongly attracted to and held by the stationary phase', isCorrect: false, misconceptionId: `${CHROMA}:MC1` },
    ],
    correctValue: 'Compound B (low Rf = strong stationary-phase attraction)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CHROMA}:MC1`],
    source: `${CHROMA_SRC} — distractor targets inverting the Rf-to-affinity relationship`,
  },
  {
    conceptId: CHROMA,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A forensic lab wants to identify an unknown compound by comparing its Rf value to a published reference table from a different lab\'s experiment. Is this a reliable identification method?',
    choices: [
      { text: 'No — Rf values depend on the specific solvent, stationary phase, and temperature used; reliable comparison requires running a known reference sample under IDENTICAL conditions alongside the unknown, not comparing to a different setup\'s published value', isCorrect: true },
      { text: 'Yes — Rf is a fixed physical constant for each compound, comparable across any chromatography setup', isCorrect: false, misconceptionId: `${CHROMA}:MC2` },
    ],
    correctValue: 'No — Rf is condition-dependent, not a universal constant',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${CHROMA}:MC2`],
    source: `${CHROMA_SRC} — misconception: Rf is a universal, condition-independent constant`,
  },
]

// ─── chem.anal.gravimetric ───────────────────────────────────────────────────
const GRAVI = 'chem.anal.gravimetric'
const GRAVI_SRC = 'docs/chemistry/kg/graph.json — chem.anal.gravimetric'

const GRAVI_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GRAVI,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Gravimetric analysis determines a substance\'s quantity by converting it into a ' +
      'pure, weighable SOLID and measuring its MASS precisely — "gravimetric" literally ' +
      'means "by weight." The general procedure: (1) dissolve the sample, (2) add a ' +
      'PRECIPITATING REAGENT that selectively converts the analyte into an insoluble ' +
      'compound (e.g., adding AgNO₃ to precipitate Cl⁻ as AgCl), (3) filter, wash ' +
      '(removing impurities without dissolving the precipitate), and dry the precipitate ' +
      'completely, (4) weigh the pure, dry precipitate on an analytical balance. From the ' +
      'precipitate\'s mass and known STOICHIOMETRY, back-calculate the original analyte\'s ' +
      'mass/concentration — this is essentially advanced stoichiometry applied ' +
      'analytically. For accuracy, the precipitate must have LOW SOLUBILITY (minimal loss ' +
      'to the filtrate — small Ksp is essential), be easily filterable (large, well-formed ' +
      'crystals rather than a fine, hard-to-filter colloidal precipitate), and be chemically ' +
      'STABLE during drying (no decomposition or moisture retention that would introduce ' +
      'mass errors).',
    targetedMisconceptions: [`${GRAVI}:MC1`],
    source: `${GRAVI_SRC} — gravimetric analysis procedure, precipitate requirements`,
  },
  {
    conceptId: GRAVI,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "The washing step in gravimetric analysis is just for making the precipitate ' +
      'look cleaner — a cosmetic step with no analytical importance." FALSE — washing is ' +
      'CRITICAL for accuracy: it removes soluble impurities (like excess precipitating ' +
      'reagent or byproduct salts) that would otherwise add extra, incorrect mass to your ' +
      'measurement, systematically inflating your calculated analyte amount. But the wash ' +
      'solution must be chosen carefully — using PURE WATER to wash AgCl, for instance, ' +
      'could cause some AgCl to dissolve back into solution (even though Ksp is small, ' +
      'repeated washing with large volumes can cause measurable loss), so analysts often ' +
      'use a dilute solution containing a common ion (like dilute HNO₃ or NaCl solution ' +
      'at controlled concentration) to suppress solubility via the common ion effect while ' +
      'still washing away impurities. Second trap: "Any precipitate works for gravimetric ' +
      'analysis as long as it\'s insoluble." Also needs correct crystal habit (not a fine, ' +
      'gelatinous colloid that clogs filters and traps impurities) and thermal stability at ' +
      'drying temperature.',
    targetedMisconceptions: [`${GRAVI}:MC1`, `${GRAVI}:MC2`],
    source: `${GRAVI_SRC} — misconception: washing is cosmetic only; any insoluble precipitate suffices`,
  },
]

const GRAVI_PROBES: SeedProbe[] = [
  {
    conceptId: GRAVI,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In a gravimetric determination of chloride via AgCl precipitation, why is the washing step analytically important, not just cosmetic?',
    choices: [
      { text: 'Washing removes soluble impurities (excess AgNO₃, byproduct salts) that would otherwise add extra mass to the weighed precipitate, causing a systematically inflated (incorrect) result', isCorrect: true },
      { text: 'Washing has no real effect on accuracy — it just makes the final precipitate look more presentable', isCorrect: false, misconceptionId: `${GRAVI}:MC1` },
    ],
    correctValue: 'Washing removes mass-inflating soluble impurities',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GRAVI}:MC1`],
    source: `${GRAVI_SRC} — distractor targets treating the washing step as purely cosmetic`,
  },
  {
    conceptId: GRAVI,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is having a very low Ksp the ONLY requirement for a compound to be suitable as a gravimetric precipitate?',
    choices: [
      { text: 'No — the precipitate must also form large, easily filterable crystals (not a fine colloidal solid) and remain chemically stable during drying, without decomposing or retaining moisture', isCorrect: true },
      { text: 'Yes — as long as Ksp is small enough, any precipitate is automatically suitable for gravimetric analysis', isCorrect: false, misconceptionId: `${GRAVI}:MC2` },
    ],
    correctValue: 'No — filterability and thermal stability also matter',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GRAVI}:MC2`],
    source: `${GRAVI_SRC} — misconception: low Ksp alone is sufficient for gravimetric suitability`,
  },
]

// ─── chem.surface.heterogeneous-cat ──────────────────────────────────────────
const HETCAT = 'chem.surface.heterogeneous-cat'
const HETCAT_SRC = 'docs/chemistry/kg/graph.json — chem.surface.heterogeneous-cat'

const HETCAT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HETCAT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Heterogeneous catalysis (solid catalyst, gas/liquid reactants) proceeds through ' +
      'FIVE steps: (1) DIFFUSION — reactant molecules travel to the catalyst surface. ' +
      '(2) ADSORPTION — reactants stick to active sites on the surface (usually via ' +
      'chemisorption, as covered earlier), which WEAKENS their internal bonds by ' +
      'redistributing electron density into the metal surface. (3) REACTION — the weakened, ' +
      'surface-bound reactants react with each other (having the correct geometry and ' +
      'reduced activation energy because of the adsorption-induced bond weakening — this ' +
      'IS the mechanism behind why catalysts lower Ea). (4) DESORPTION — the product ' +
      'detaches from the surface, freeing the active site. (5) DIFFUSION AWAY — product ' +
      'molecules leave the surface region. The RATE-LIMITING step is often adsorption or ' +
      'desorption, not the surface reaction itself, which is why catalyst SURFACE AREA and ' +
      'ACTIVE SITE availability matter so much (as covered in catalysis basics). This ' +
      'mechanism explains CATALYST POISONING: if an impurity binds irreversibly to active ' +
      'sites (like sulfur poisoning a platinum catalytic converter), it permanently blocks ' +
      'those sites from ever catalyzing the intended reaction.',
    targetedMisconceptions: [`${HETCAT}:MC1`],
    source: `${HETCAT_SRC} — five-step heterogeneous catalysis mechanism, catalyst poisoning`,
  },
  {
    conceptId: HETCAT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Adsorption onto the catalyst surface has no effect on the reactant ' +
      'molecules themselves — the catalyst just holds them close together." FALSE — ' +
      'chemisorption actively WEAKENS the internal bonds of the adsorbed reactant ' +
      'molecule by redistributing its electron density into the metal\'s surface orbitals. ' +
      'This bond-weakening IS the mechanism by which activation energy is lowered — it\'s ' +
      'not just proximity/concentration effect (though that helps too), it\'s genuine ' +
      'chemical activation of the reactant through the adsorption bond itself. Second ' +
      'trap: "Catalyst poisoning is reversible — you can always regenerate a poisoned ' +
      'catalyst by simple cleaning." Often FALSE for irreversible poisoning (like sulfur ' +
      'compounds binding strongly and permanently to platinum active sites) — this ' +
      'requires expensive catalyst REPLACEMENT, not just cleaning, which is why unleaded ' +
      'gasoline and low-sulfur fuel standards exist specifically to protect catalytic ' +
      'converters from permanent poisoning.',
    targetedMisconceptions: [`${HETCAT}:MC1`, `${HETCAT}:MC2`],
    source: `${HETCAT_SRC} — misconception: adsorption is passive proximity only; poisoning is always reversible`,
  },
]

const HETCAT_PROBES: SeedProbe[] = [
  {
    conceptId: HETCAT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'How does chemisorption of a reactant onto a heterogeneous catalyst surface actually lower the activation energy for reaction?',
    choices: [
      { text: 'Chemisorption redistributes the reactant\'s electron density into the metal surface, actively weakening its internal bonds — this bond-weakening directly lowers the energy needed to complete the reaction, not just proximity to another reactant', isCorrect: true },
      { text: 'The catalyst simply holds reactant molecules close together, increasing collision frequency, with no actual effect on the reactants\' bonds', isCorrect: false, misconceptionId: `${HETCAT}:MC1` },
    ],
    correctValue: 'Chemisorption weakens reactant bonds directly',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${HETCAT}:MC1`],
    source: `${HETCAT_SRC} — distractor targets treating catalysis as purely a proximity/concentration effect`,
  },
  {
    conceptId: HETCAT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A car\'s catalytic converter has been poisoned by sulfur compounds from leaded/high-sulfur fuel. Can this typically be fixed by simply cleaning the converter?',
    choices: [
      { text: 'No — sulfur often binds irreversibly (strongly and permanently) to the platinum active sites, requiring expensive catalyst replacement rather than simple cleaning', isCorrect: true },
      { text: 'Yes — catalyst poisoning is always a reversible surface contamination that cleaning can fully remove', isCorrect: false, misconceptionId: `${HETCAT}:MC2` },
    ],
    correctValue: 'No — irreversible poisoning requires replacement',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HETCAT}:MC2`],
    source: `${HETCAT_SRC} — misconception: catalyst poisoning is always reversible with cleaning`,
  },
]

// ─── chem.org.iupac ───────────────────────────────────────────────────────────
const IUPAC = 'chem.org.iupac'
const IUPAC_SRC = 'docs/chemistry/kg/graph.json — chem.org.iupac'

const IUPAC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IUPAC,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'IUPAC nomenclature gives every organic molecule ONE unambiguous name, built like ' +
      'a structured sentence. Four steps: (1) Find the LONGEST continuous carbon chain ' +
      'containing the principal functional group — this sets the PARENT name (meth-1C, ' +
      'eth-2C, prop-3C, but-4C, pent-5C...). (2) Identify the SUFFIX for the highest- ' +
      'priority functional group present (-ol for alcohol, -al for aldehyde, -one for ' +
      'ketone, -oic acid for carboxylic acid — there\'s a strict priority order when ' +
      'multiple groups compete). (3) Number the chain to give the principal group (and ' +
      'then other substituents) the LOWEST possible locants — start numbering from ' +
      'whichever end achieves this. (4) List substituents ALPHABETICALLY as prefixes with ' +
      'their locant numbers (2-chloro-3-methylpentane, not 3-methyl-2-chloropentane, even ' +
      'though chloro was found second — alphabetical order in the NAME, not order of ' +
      'discovery). This systematic approach means any chemist worldwide, given a ' +
      'structure, generates the IDENTICAL name — no ambiguity, no memorized "common ' +
      'names" required (though common names like "acetone" persist alongside for very ' +
      'familiar compounds).',
    targetedMisconceptions: [`${IUPAC}:MC1`],
    source: `${IUPAC_SRC} — IUPAC naming rules, parent chain, suffix priority, numbering, substituent ordering`,
  },
  {
    conceptId: IUPAC,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "The parent chain is simply the longest chain drawn in the structure, no ' +
      'other consideration." FALSE — the parent chain MUST contain the principal ' +
      'functional group (the one determining the suffix), even if a longer chain exists ' +
      'elsewhere that doesn\'t include it. For example, if a molecule has a 6-carbon chain ' +
      'but the -OH group sits on a branch off a shorter 5-carbon path that includes it, ' +
      'you\'d need the chain that CONTAINS the OH to name it as an "-ol." Second trap: ' +
      '"Number the chain from whichever end is more convenient, or always from the left ' +
      'as drawn." No — you MUST number to give the principal functional group (then other ' +
      'substituents, if there\'s a tie) the LOWEST possible locant, regardless of how the ' +
      'structure happens to be drawn on paper. Third trap: "List substituents in the ' +
      'order you found them while scanning the structure." No — substituents are always ' +
      'listed ALPHABETICALLY in the final name, completely independent of their position ' +
      'along the chain or the order you identified them.',
    targetedMisconceptions: [`${IUPAC}:MC1`, `${IUPAC}:MC2`],
    source: `${IUPAC_SRC} — misconception: parent chain ignores functional group location; arbitrary numbering/ordering`,
  },
]

const IUPAC_PROBES: SeedProbe[] = [
  {
    conceptId: IUPAC,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A molecule has a 6-carbon chain, but its -OH group is on a branch connected via a 5-carbon path. Which chain should be chosen as the parent for IUPAC naming?',
    choices: [
      { text: 'The 5-carbon chain — the parent chain must contain the principal functional group (here, -OH), even if a longer chain exists elsewhere that doesn\'t include it', isCorrect: true },
      { text: 'The 6-carbon chain — the parent is always simply the longest continuous chain in the structure, regardless of functional group location', isCorrect: false, misconceptionId: `${IUPAC}:MC1` },
    ],
    correctValue: 'The chain containing the principal functional group (5-carbon)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IUPAC}:MC1`],
    source: `${IUPAC_SRC} — distractor targets "longest chain regardless of functional group" misconception`,
  },
  {
    conceptId: IUPAC,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'While naming a molecule, you identify a chloro substituent at position 3 before noticing a methyl substituent at position 2. In the final IUPAC name, which comes first: "3-chloro-2-methyl..." or "2-methyl-3-chloro..."?',
    choices: [
      { text: '2-methyl-3-chloro... — substituents are always listed ALPHABETICALLY in the name (chloro before methyl alphabetically? No — "chloro" < "methyl" alphabetically, so actually 3-chloro-2-methyl is correct)', isCorrect: false },
      { text: 'Substituents are always ordered alphabetically by name, not by the order they were identified or their locant number — "chloro" comes before "methyl" alphabetically, so it is 3-chloro-2-methyl... regardless of discovery order', isCorrect: true },
    ],
    correctValue: 'Alphabetical ordering (chloro before methyl), independent of discovery order',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IUPAC}:MC2`],
    source: `${IUPAC_SRC} — misconception: substituents ordered by discovery/position rather than alphabetically`,
  },
]

// ─── chem.solid.crystal-systems ──────────────────────────────────────────────
const CRYST = 'chem.solid.crystal-systems'
const CRYST_SRC = 'docs/chemistry/kg/graph.json — chem.solid.crystal-systems'

const CRYST_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CRYST,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Crystalline solids have their particles arranged in a repeating, ORDERED 3D ' +
      'pattern (unlike AMORPHOUS solids like glass, which lack long-range order). The ' +
      'UNIT CELL is the smallest repeating "brick" that, stacked in all directions, ' +
      'builds the entire crystal — defined by edge lengths (a, b, c) and angles (α, β, γ) ' +
      'between them. Seven crystal systems exist based on unit cell symmetry: CUBIC ' +
      '(a=b=c, all angles 90°, highest symmetry — NaCl, diamond), TETRAGONAL (a=b≠c, all ' +
      '90°), ORTHORHOMBIC (a≠b≠c, all 90°), and others with non-90° angles (monoclinic, ' +
      'triclinic, hexagonal, rhombohedral). Within cubic, THREE packing arrangements ' +
      'matter: SIMPLE CUBIC (1 atom/unit cell, atoms only at corners, 52% packing ' +
      'efficiency — rare, only polonium), BODY-CENTERED CUBIC (BCC, 2 atoms/cell, adds one ' +
      'atom in the center, 68% efficiency — iron, chromium), FACE-CENTERED CUBIC (FCC, 4 ' +
      'atoms/cell, adds atoms on each face center, 74% efficiency — the maximum possible ' +
      'for spheres, copper, aluminum, gold). Higher packing efficiency generally means ' +
      'higher density and often correlates with certain mechanical properties.',
    targetedMisconceptions: [`${CRYST}:MC1`],
    source: `${CRYST_SRC} — unit cell, seven crystal systems, cubic packing types (SC/BCC/FCC)`,
  },
  {
    conceptId: CRYST,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "A unit cell with atoms at all 8 corners contains 8 whole atoms." FALSE — ' +
      'each CORNER atom is SHARED among 8 adjacent unit cells (since 8 unit cells meet at ' +
      'every corner point in the 3D lattice), so each corner atom contributes only 1/8 to ' +
      'THIS unit cell. A simple cubic cell has 8 corners × 1/8 = exactly 1 atom per cell, ' +
      'NOT 8. Similarly, a FACE-CENTERED atom is shared between 2 cells (contributes 1/2), ' +
      'and a BODY-CENTERED atom belongs entirely to 1 cell (contributes the full 1). This ' +
      'fractional-sharing accounting is essential for correctly calculating density, ' +
      'packing efficiency, and formula units per cell — always sum FRACTIONAL ' +
      'contributions, never count visible atoms at face value. Second trap: "All solids ' +
      'are crystalline with a definite melting point." Amorphous solids (glass, many ' +
      'plastics) lack long-range periodic order and instead SOFTEN gradually over a ' +
      'temperature range rather than melting sharply at one temperature — a key ' +
      'distinguishing physical test.',
    targetedMisconceptions: [`${CRYST}:MC1`, `${CRYST}:MC2`],
    source: `${CRYST_SRC} — misconception: corner atoms count fully (not fractionally); all solids are crystalline`,
  },
]

const CRYST_PROBES: SeedProbe[] = [
  {
    conceptId: CRYST,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A simple cubic unit cell has one atom at each of its 8 corners. How many atoms actually belong to this ONE unit cell?',
    choices: [
      { text: '1 atom — each corner atom is shared among 8 adjacent unit cells, contributing only 1/8 each; 8 corners × 1/8 = 1 whole atom', isCorrect: true },
      { text: '8 atoms — all 8 visible corner atoms belong entirely to this unit cell', isCorrect: false, misconceptionId: `${CRYST}:MC1` },
    ],
    correctValue: '1 atom',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CRYST}:MC1`],
    source: `${CRYST_SRC} — distractor targets counting all visible corner atoms as fully belonging to one cell`,
  },
  {
    conceptId: CRYST,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Glass, when heated, softens gradually over a temperature range rather than melting sharply at one specific temperature. What does this indicate about its structure?',
    choices: [
      { text: 'Glass is amorphous (non-crystalline) — it lacks the long-range, periodic atomic ordering that crystalline solids have, which is why it doesn\'t exhibit a sharp melting point', isCorrect: true },
      { text: 'This is unusual — all solids, whether crystalline or not, should have a sharp, well-defined melting point', isCorrect: false, misconceptionId: `${CRYST}:MC2` },
    ],
    correctValue: 'Amorphous structure (no long-range order)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${CRYST}:MC2`],
    source: `${CRYST_SRC} — misconception: assuming all solids are crystalline with sharp melting points`,
  },
]

// ─── chem.dblock.general ─────────────────────────────────────────────────────
const DBLOCK = 'chem.dblock.general'
const DBLOCK_SRC = 'docs/chemistry/kg/graph.json — chem.dblock.general'

const DBLOCK_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DBLOCK,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Transition metals (d-block) share a family of signature properties, ALL traceable ' +
      'to their PARTIALLY FILLED d orbitals. MULTIPLE OXIDATION STATES: unlike s-block ' +
      'metals (usually one fixed charge), transition metals commonly show several ' +
      'oxidation states (Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺) because d-electrons have SIMILAR energy to ' +
      'the outer s-electrons, so varying numbers can be removed with comparable ease. ' +
      'COLORED COMPOUNDS: partially filled d orbitals allow electrons to absorb specific ' +
      'visible-light photons and jump between d-orbital energy levels (d-d transitions) — ' +
      'the color you SEE is the complementary color of what\'s ABSORBED. Fully filled ' +
      '(d¹⁰, like Zn²⁺) or fully empty (d⁰, like Sc³⁺) configurations are typically ' +
      'COLORLESS — no d-d transition is possible. CATALYTIC ACTIVITY: variable oxidation ' +
      'states let transition metals temporarily accept/donate electrons during a reaction ' +
      'cycle (Fe in the Haber process, Pt in catalytic converters), then return to their ' +
      'original state. PARAMAGNETISM: unpaired d-electrons create a magnetic moment, ' +
      'causing many transition metal compounds to be weakly attracted to magnetic fields.',
    targetedMisconceptions: [`${DBLOCK}:MC1`],
    source: `${DBLOCK_SRC} — variable oxidation states, color, catalysis, paramagnetism (d-orbital basis)`,
  },
  {
    conceptId: DBLOCK,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "All transition metal compounds are colored, without exception." FALSE — ' +
      'compounds with a FULLY FILLED (d¹⁰) or FULLY EMPTY (d⁰) d-subshell are typically ' +
      'colorless, because color requires an electron to JUMP between different d-orbital ' +
      'energy levels (a d-d transition), which is impossible if all d-orbitals are ' +
      'completely full (no empty orbital to jump TO) or completely empty (no electron ' +
      'available to jump). Zn²⁺ (d¹⁰, fully filled) and Sc³⁺ (d⁰, fully empty) form ' +
      'colorless compounds despite being transition-metal-family ions. Second trap: "The ' +
      'color of a transition metal ion is the SAME color as the light it absorbs." ' +
      'BACKWARDS — the color you observe is the COMPLEMENTARY color to what\'s absorbed. ' +
      'If a compound absorbs red light, it appears GREEN (red\'s complement) — the ' +
      'transmitted/reflected wavelengths (everything EXCEPT what was absorbed) reach your ' +
      'eye.',
    targetedMisconceptions: [`${DBLOCK}:MC1`, `${DBLOCK}:MC2`],
    source: `${DBLOCK_SRC} — misconception: all transition metal compounds are colored; observed color = absorbed color`,
  },
]

const DBLOCK_PROBES: SeedProbe[] = [
  {
    conceptId: DBLOCK,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Zn²⁺ has a d¹⁰ (fully filled) electron configuration, yet zinc is classified as a transition metal family element. Are Zn²⁺ compounds typically colored?',
    choices: [
      { text: 'No — with a fully filled d subshell, there is no empty d orbital for an electron to jump to (no possible d-d transition), so Zn²⁺ compounds are typically colorless', isCorrect: true },
      { text: 'Yes — all transition metal ions produce colored compounds without exception, since color is the defining trait of the d-block', isCorrect: false, misconceptionId: `${DBLOCK}:MC1` },
    ],
    correctValue: 'No — Zn²⁺ compounds are colorless (d¹⁰)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DBLOCK}:MC1`],
    source: `${DBLOCK_SRC} — distractor targets "all transition metal compounds are colored" misconception`,
  },
  {
    conceptId: DBLOCK,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A copper(II) sulfate solution absorbs red-orange light and appears blue to our eyes. Does this mean the solution absorbed blue light?',
    choices: [
      { text: 'No — the observed color (blue) is the COMPLEMENT of the absorbed color (red-orange); the solution absorbs red-orange wavelengths and transmits/reflects the remaining wavelengths, which combine to appear blue', isCorrect: true },
      { text: 'Yes — the color you see directly indicates the color of light that was absorbed', isCorrect: false, misconceptionId: `${DBLOCK}:MC2` },
    ],
    correctValue: 'No — observed color is complementary to absorbed color',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DBLOCK}:MC2`],
    source: `${DBLOCK_SRC} — misconception: observed color equals absorbed color rather than its complement`,
  },
]

// ─── chem.pblock.group13 ─────────────────────────────────────────────────────
const G13 = 'chem.pblock.group13'
const G13_SRC = 'docs/chemistry/kg/graph.json — chem.pblock.group13'

const G13_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: G13,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Group 13 (boron family: B, Al, Ga, In, Tl) has 3 valence electrons, suggesting a ' +
      '+3 oxidation state — but this simple picture breaks down going DOWN the group. ' +
      'Boron is a METALLOID (semiconductor-like properties, covalent compounds, notably ' +
      'ELECTRON-DEFICIENT — BF₃ has only 6 electrons around B, not a full octet, making it ' +
      'a strong LEWIS ACID that readily accepts an electron pair from bases like NH₃ or ' +
      'F⁻). Aluminum onward, these become true METALS. A key trend: the INERT PAIR EFFECT ' +
      '— as you go DOWN the group, the ns² electron pair becomes increasingly reluctant to ' +
      'participate in bonding (poor shielding from filled d/f orbitals in heavier elements ' +
      'means the ns² pair is held unusually tightly), so heavier elements INCREASINGLY ' +
      'favor the +1 oxidation state over +3. Thallium, the heaviest, strongly PREFERS +1 ' +
      '(Tl⁺ is more stable than Tl³⁺) — opposite of boron\'s exclusive +3. This is a ' +
      'striking counterexample to naive "same group = same oxidation state" thinking.',
    targetedMisconceptions: [`${G13}:MC1`],
    source: `${G13_SRC} — Group 13 trends, boron's electron deficiency, inert pair effect`,
  },
  {
    conceptId: G13,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "All Group 13 elements behave identically, forming +3 ions predictably, just ' +
      'like alkali metals reliably form +1." FALSE — the inert pair effect causes a real ' +
      'DIVERGENCE down the group. Boron and aluminum favor +3; thallium strongly favors ' +
      '+1 (Tl⁺ compounds are MORE stable and common than Tl³⁺ ones) — this is the ' +
      'OPPOSITE trend from what naive periodic table pattern-matching would suggest. ' +
      'Second trap: "BF₃ is unstable/reactive because boron has an incomplete octet, so ' +
      'it must readily decompose." Not decomposition — BF₃ is actually quite stable AS IS, ' +
      'but its incomplete octet makes it a powerful LEWIS ACID, eager to ACCEPT an ' +
      'electron pair from a Lewis base (forming a coordinate bond, as covered earlier) ' +
      'rather than falling apart on its own. "Electron-deficient" describes its BONDING ' +
      'TENDENCY (accepting electrons), not inherent instability of the molecule itself.',
    targetedMisconceptions: [`${G13}:MC1`, `${G13}:MC2`],
    source: `${G13_SRC} — misconception: uniform +3 behavior across the group; electron deficiency means instability`,
  },
]

const G13_PROBES: SeedProbe[] = [
  {
    conceptId: G13,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Thallium (heaviest Group 13 element) strongly prefers the +1 oxidation state over +3, unlike boron which is exclusively +3. What explains this?',
    choices: [
      { text: 'The inert pair effect — poor shielding from filled d/f orbitals in heavier elements causes the outermost ns² electron pair to be held unusually tightly, making it reluctant to participate in bonding', isCorrect: true },
      { text: 'This is inconsistent with periodic trends — all Group 13 elements should behave identically, favoring +3 exclusively', isCorrect: false, misconceptionId: `${G13}:MC1` },
    ],
    correctValue: 'Inert pair effect',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${G13}:MC1`],
    source: `${G13_SRC} — distractor targets assuming uniform group behavior regardless of the inert pair effect`,
  },
  {
    conceptId: G13,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'BF₃ has only 6 electrons around boron (an incomplete octet). Does this mean BF₃ is inherently unstable and prone to spontaneous decomposition?',
    choices: [
      { text: 'No — BF₃ is a stable molecule as-is; its incomplete octet instead makes it a strong Lewis acid, eager to accept an electron pair from a Lewis base (like NH₃) to form a coordinate bond, rather than being prone to falling apart', isCorrect: true },
      { text: 'Yes — any molecule with an incomplete octet around the central atom is inherently unstable and will spontaneously decompose', isCorrect: false, misconceptionId: `${G13}:MC2` },
    ],
    correctValue: 'No — BF₃ is stable but reactive as a Lewis acid',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G13}:MC2`],
    source: `${G13_SRC} — misconception: incomplete octet implies inherent molecular instability`,
  },
]

// ─── chem.pblock.group14 ─────────────────────────────────────────────────────
const G14 = 'chem.pblock.group14'
const G14_SRC = 'docs/chemistry/kg/graph.json — chem.pblock.group14'

const G14_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: G14,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Group 14 (carbon family: C, Si, Ge, Sn, Pb) shows a dramatic METAL-NONMETAL ' +
      'TRANSITION down the group: carbon is a nonmetal (forms the backbone of ALL organic ' +
      'chemistry via strong C-C and C-H covalent bonds, and uniquely CATENATES — forms ' +
      'long chains/rings of itself — better than any other element due to its small size ' +
      'and strong C-C bond), silicon is a metalloid/semiconductor (the foundation of ALL ' +
      'modern electronics, forms strong Si-O bonds making silicates the dominant mineral ' +
      'class in Earth\'s crust), and tin/lead are true metals. CARBON has THREE distinct ' +
      'allotropes with wildly different properties from the SAME element: DIAMOND ' +
      '(tetrahedral sp³ network, each carbon bonded to 4 others — extremely hard, ' +
      'nonconducting), GRAPHITE (sp² layers, each carbon bonded to 3 others with ' +
      'delocalized electrons between layers — soft, slippery, ELECTRICALLY CONDUCTING), ' +
      'and FULLERENES/nanotubes (curved sp² cage structures). Same element, wildly ' +
      'different structures, wildly different properties — a striking demonstration that ' +
      'PROPERTIES come from STRUCTURE, not just elemental identity.',
    targetedMisconceptions: [`${G14}:MC1`],
    source: `${G14_SRC} — metal-nonmetal transition, carbon catenation, diamond/graphite allotropes`,
  },
  {
    conceptId: G14,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Diamond and graphite, being made of the SAME element (pure carbon), should ' +
      'have identical or very similar properties." FALSE — they demonstrate that ' +
      'STRUCTURE, not just elemental composition, determines properties. Diamond\'s sp³ ' +
      'tetrahedral network (every carbon strongly bonded to 4 neighbors in a rigid 3D ' +
      'lattice) makes it the hardest known natural material and a perfect electrical ' +
      'insulator (all 4 valence electrons per carbon are locked into localized bonds, none ' +
      'free to move). Graphite\'s sp² LAYERED structure (each carbon bonded to only 3 ' +
      'neighbors within a flat sheet, with the 4th electron delocalized ACROSS the entire ' +
      'sheet) makes it soft and slippery (layers slide past each other easily — used as a ' +
      'lubricant) AND electrically conductive (delocalized electrons move freely WITHIN ' +
      'each layer, though not easily between layers). Second trap: "Carbon is the only ' +
      'element that can form chains, so catenation is unique to carbon exclusively." ' +
      'Silicon CAN catenate too (forming silanes, Si-Si chains), but much less extensively ' +
      '— Si-Si bonds are weaker than C-C bonds (larger atomic size means less effective ' +
      'orbital overlap), so silicon chains are far shorter and less stable.',
    targetedMisconceptions: [`${G14}:MC1`, `${G14}:MC2`],
    source: `${G14_SRC} — misconception: same element means same properties; catenation is exclusively carbon's trait`,
  },
]

const G14_PROBES: SeedProbe[] = [
  {
    conceptId: G14,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Diamond is an electrical insulator, but graphite (also pure carbon) conducts electricity. What structural difference explains this?',
    choices: [
      { text: 'In diamond, all 4 valence electrons per carbon are locked in localized sp³ bonds (no free carriers); in graphite\'s sp² layers, one electron per carbon is delocalized across the sheet, free to carry current', isCorrect: true },
      { text: 'This is impossible — since both are pure carbon, they must have identical electrical properties', isCorrect: false, misconceptionId: `${G14}:MC1` },
    ],
    correctValue: 'Different bonding structure (localized vs delocalized electrons)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G14}:MC1`],
    source: `${G14_SRC} — distractor targets assuming identical elemental composition guarantees identical properties`,
  },
  {
    conceptId: G14,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Is carbon the ONLY element in Group 14 capable of catenation (forming chains of itself)?',
    choices: [
      { text: 'No — silicon can also catenate (forming silane chains, Si-Si bonds), but much less extensively than carbon, since larger silicon atoms form weaker Si-Si bonds with less effective orbital overlap', isCorrect: true },
      { text: 'Yes — catenation is a property unique and exclusive to carbon among all elements', isCorrect: false, misconceptionId: `${G14}:MC2` },
    ],
    correctValue: 'No — silicon catenates too, just less extensively',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${G14}:MC2`],
    source: `${G14_SRC} — misconception: catenation is exclusively a carbon phenomenon`,
  },
]

// ─── chem.pblock.group15 ─────────────────────────────────────────────────────
const G15 = 'chem.pblock.group15'
const G15_SRC = 'docs/chemistry/kg/graph.json — chem.pblock.group15'

const G15_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: G15,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Group 15 (nitrogen family: N, P, As, Sb, Bi) has 5 valence electrons, allowing a ' +
      'range of oxidation states from −3 (gaining 3 electrons for a full octet, as in NH₃) ' +
      'up to +5 (losing/sharing all 5, as in HNO₃, H₃PO₄). NITROGEN is unusually UNREACTIVE ' +
      'as N₂ gas despite being essential for life — this is because of its exceptionally ' +
      'strong N≡N TRIPLE BOND (bond energy ~945 kJ/mol, one of the strongest bonds known), ' +
      'requiring extreme conditions (high pressure, high temperature, iron catalyst — the ' +
      'Haber process) to break it and "fix" nitrogen into usable compounds like ammonia. ' +
      'PHOSPHORUS shows striking ALLOTROPY: white phosphorus (P₄ tetrahedral molecules, ' +
      'highly reactive, toxic, glows in the dark via slow oxidation — hence "phosphorescence") ' +
      'versus red phosphorus (polymeric chain structure, much more stable and less ' +
      'reactive, used in match heads). Nitrogen and phosphorus compounds are central to ' +
      'agriculture (fertilizers, via the Haber-Bosch nitrogen fixation process) and biology ' +
      '(DNA\'s phosphate backbone, proteins\' nitrogen-containing amino groups).',
    targetedMisconceptions: [`${G15}:MC1`],
    source: `${G15_SRC} — nitrogen's inertness (triple bond), phosphorus allotropes, oxidation state range`,
  },
  {
    conceptId: G15,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Nitrogen gas (N₂) is unreactive because nitrogen itself is an unreactive ' +
      'element, generally speaking." MISLEADING — nitrogen COMPOUNDS (NH₃, HNO₃, amino ' +
      'acids) are extremely reactive and biologically vital; it\'s specifically the N₂ ' +
      'MOLECULE\'s exceptionally strong triple bond that makes elemental N₂ hard to break ' +
      'apart, not nitrogen atoms being generally unreactive. Once "fixed" (the N≡N bond is ' +
      'broken and nitrogen incorporated into a compound), nitrogen chemistry becomes rich ' +
      'and varied. This distinction (molecular form vs. elemental reactivity) matters — the ' +
      'SAME element can be inert in one molecular form (N₂) and highly reactive in another ' +
      '(NH₃, NO₂). Second trap: "White and red phosphorus are basically the same thing, ' +
      'just different colors/names for convenience." FALSE — they have GENUINELY different ' +
      'molecular structures (discrete P₄ tetrahedra vs. an extended polymeric chain), ' +
      'giving them dramatically different reactivity, toxicity, and stability — analogous ' +
      'to the diamond/graphite carbon allotrope difference covered earlier.',
    targetedMisconceptions: [`${G15}:MC1`, `${G15}:MC2`],
    source: `${G15_SRC} — misconception: N2 inertness implies nitrogen itself is unreactive; P allotropes are just color variants`,
  },
]

const G15_PROBES: SeedProbe[] = [
  {
    conceptId: G15,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'N₂ gas is very unreactive, yet nitrogen compounds like NH₃ and amino acids are chemically reactive/biologically vital. How do you reconcile this?',
    choices: [
      { text: 'It\'s specifically the N≡N triple bond in the N₂ molecule that is exceptionally strong and hard to break — once nitrogen is "fixed" into a compound, its chemistry becomes rich and reactive; the element itself isn\'t generally inert', isCorrect: true },
      { text: 'This is a contradiction — if N₂ is unreactive, all nitrogen-containing compounds should also be unreactive', isCorrect: false, misconceptionId: `${G15}:MC1` },
    ],
    correctValue: 'N2\'s inertness is specific to its strong triple bond, not the element generally',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G15}:MC1`],
    source: `${G15_SRC} — distractor targets conflating N2 molecular inertness with general elemental unreactivity`,
  },
  {
    conceptId: G15,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'White phosphorus is highly reactive and toxic; red phosphorus is much more stable and used safely in match heads. Are these just different colored versions of the identical substance?',
    choices: [
      { text: 'No — they have genuinely different molecular structures (white phosphorus is discrete P₄ tetrahedra; red phosphorus is a polymeric chain structure), which is what causes their dramatically different reactivity and stability', isCorrect: true },
      { text: 'Yes — white and red phosphorus are chemically identical, differing only in appearance/color', isCorrect: false, misconceptionId: `${G15}:MC2` },
    ],
    correctValue: 'No — genuinely different molecular structures (allotropes)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G15}:MC2`],
    source: `${G15_SRC} — misconception: phosphorus allotropes are merely color variants of the same structure`,
  },
]

// ─── chem.pblock.group16 ─────────────────────────────────────────────────────
const G16 = 'chem.pblock.group16'
const G16_SRC = 'docs/chemistry/kg/graph.json — chem.pblock.group16'

const G16_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: G16,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Group 16 (oxygen family/chalcogens: O, S, Se, Te, Po) has 6 valence electrons, ' +
      'typically forming −2 ions or covalent compounds with 2 bonds. OXYGEN is special ' +
      'among its group: its small size and high electronegativity let it form STRONG ' +
      'π-bonds (double bonds, like O=O and C=O), which heavier group members (S, Se, Te) ' +
      'largely CANNOT do as effectively — their larger atomic size means poor p-orbital ' +
      'overlap for π-bonding, so they instead favor forming LONGER CHAINS/RINGS of single ' +
      'bonds (S₈ rings — sulfur\'s common form — rather than S=S=S=S... double-bonded ' +
      'chains). This size-driven bonding difference explains oxygen\'s diatomic O₂ gas ' +
      'versus sulfur\'s solid S₈ crown-shaped rings at room temperature, despite both being ' +
      'in the same group. OZONE (O₃) is oxygen\'s important allotrope (covered earlier in ' +
      'the atmosphere chemistry unit). Sulfur compounds are industrially vital: SULFURIC ' +
      'ACID (H₂SO₄) is the world\'s most-produced industrial chemical, made via the ' +
      'CONTACT PROCESS (S → SO₂ → SO₃ → H₂SO₄, using a vanadium pentoxide catalyst for the ' +
      'SO₂→SO₃ step).',
    targetedMisconceptions: [`${G16}:MC1`],
    source: `${G16_SRC} — oxygen's π-bonding vs sulfur's catenation, S8 rings, contact process`,
  },
  {
    conceptId: G16,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Since oxygen and sulfur are in the same group with the same valence electron ' +
      'count, they should form structurally analogous molecules — oxygen as O₂ implies ' +
      'sulfur should similarly prefer S₂." FALSE — sulfur\'s larger atomic size makes ' +
      'effective p-orbital π-overlap (needed for double bonds like O=O) much weaker, so ' +
      'S=S double bonds are comparatively unstable. Instead, sulfur favors forming ' +
      'extended chains/rings of SINGLE bonds (most commonly the S₈ crown ring), a strategy ' +
      'oxygen doesn\'t need because its strong π-bonding lets it achieve stability as a ' +
      'simple diatomic molecule. Same group, same valence count, but genuinely DIFFERENT ' +
      'preferred bonding strategies due to size effects — same lesson as boron\'s inert ' +
      'pair effect and carbon/silicon\'s catenation difference: periodic trends predict ' +
      'general PATTERNS, not identical structural behavior down a group. Second trap: ' +
      '"H₂SO₄ production via the contact process happens in one simple direct step from ' +
      'sulfur." No — it requires THREE distinct steps (S→SO₂ combustion, SO₂→SO₃ ' +
      'catalytic oxidation, SO₃+H₂O→H₂SO₄), with the middle step specifically requiring ' +
      'a V₂O₅ catalyst because SO₂→SO₃ has an otherwise high activation energy.',
    targetedMisconceptions: [`${G16}:MC1`, `${G16}:MC2`],
    source: `${G16_SRC} — misconception: same group implies identical molecular structure; contact process is a single step`,
  },
]

const G16_PROBES: SeedProbe[] = [
  {
    conceptId: G16,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Oxygen exists as diatomic O₂ (with a strong double bond) at room temperature, but sulfur (same group, same valence electron count) exists as S₈ rings of single bonds. Why the structural difference?',
    choices: [
      { text: 'Sulfur\'s larger atomic size gives much weaker p-orbital overlap for π-bonding, making S=S double bonds comparatively unstable; sulfur instead favors extended single-bonded ring/chain structures for stability', isCorrect: true },
      { text: 'This is inconsistent with periodic trends — elements in the same group with the same valence electron count should always form structurally identical molecules', isCorrect: false, misconceptionId: `${G16}:MC1` },
    ],
    correctValue: 'Sulfur\'s larger size weakens π-bonding, favoring single-bonded rings',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${G16}:MC1`],
    source: `${G16_SRC} — distractor targets assuming same-group elements must form identical structures`,
  },
  {
    conceptId: G16,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does the Contact Process convert elemental sulfur directly into sulfuric acid (H₂SO₄) in one single step?',
    choices: [
      { text: 'No — it requires THREE distinct steps: S burns to SO₂, SO₂ is catalytically oxidized to SO₃ (using a V₂O₅ catalyst, since this step has high activation energy), and SO₃ reacts with water to form H₂SO₄', isCorrect: true },
      { text: 'Yes — sulfur reacts directly and completely with water and oxygen in a single combined step to form sulfuric acid', isCorrect: false, misconceptionId: `${G16}:MC2` },
    ],
    correctValue: 'No — three distinct steps, with a catalyst required',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G16}:MC2`],
    source: `${G16_SRC} — misconception: industrial sulfuric acid production is a single-step process`,
  },
]

// ─── chem.sblock.alkali ──────────────────────────────────────────────────────
const ALKALI = 'chem.sblock.alkali'
const ALKALI_SRC = 'docs/chemistry/kg/graph.json — chem.sblock.alkali'

const ALKALI_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALKALI,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Alkali metals (Group 1: Li, Na, K, Rb, Cs) are the periodic table\'s most ' +
      'CHEMICALLY UNIFORM group — each has exactly 1 valence electron, and each ' +
      'reliably forms a +1 ion by losing it. REACTIVITY INCREASES down the group ' +
      '(opposite of the general "more protons = harder to remove electron" intuition ' +
      'from ionization energy trends) because the single valence electron gets ' +
      'progressively FARTHER from the nucleus (more shells, more shielding), making it ' +
      'progressively EASIER to remove — cesium reacts almost explosively with water, ' +
      'while lithium reacts comparatively gently. All react vigorously with water: ' +
      '2M + 2H₂O → 2MOH + H₂ (releasing flammable hydrogen gas — the source of the ' +
      'characteristic "fizz" and, for heavier members, dramatic fire/explosion). All are ' +
      'SOFT metals (can be cut with a knife — weak metallic bonding since only 1 ' +
      'delocalized electron per atom), have LOW melting points (weak metallic bonds again), ' +
      'and low DENSITY (Li, Na, K actually float on water — briefly, before reacting). ' +
      'FLAME TESTS give characteristic colors (Li=crimson, Na=yellow, K=lilac) from ' +
      'electrons jumping between energy levels when heated, useful for QUALITATIVE ' +
      'identification.',
    targetedMisconceptions: [`${ALKALI}:MC1`],
    source: `${ALKALI_SRC} — alkali metal properties, reactivity trend, water reaction, flame tests`,
  },
  {
    conceptId: ALKALI,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Reactivity of alkali metals should DECREASE down the group, since ' +
      'ionization energy generally... wait, actually more protons should make removal ' +
      'harder." This confuses TWO competing periodic trends. Within alkali metals, going ' +
      'down the group, ionization energy actually DECREASES (not increases) because the ' +
      'extra electron SHELLS (shielding) dominate over the extra protons — the valence ' +
      'electron is farther away and more shielded, so it\'s progressively EASIER to ' +
      'remove despite more protons being present. This is the SAME general "ionization ' +
      'energy decreases down a group" trend covered earlier (ionization-energy concept) — ' +
      'reactivity for alkali metals tracks INVERSELY with ionization energy (easier ' +
      'electron loss = more reactive), so LOWER ionization energy down the group means ' +
      'HIGHER reactivity down the group. Second trap: "All alkali metal + water reactions ' +
      'are similarly mild, like sodium\'s well-known fizzing demonstration." FALSE — the ' +
      'reaction becomes progressively MORE violent down the group (Li: gentle fizzing, ' +
      'Na: fizzing with occasional flame, K: ignites the hydrogen gas reliably, Rb/Cs: ' +
      'genuinely explosive) — this trend directly follows from the increasing reactivity ' +
      'trend.',
    targetedMisconceptions: [`${ALKALI}:MC1`, `${ALKALI}:MC2`],
    source: `${ALKALI_SRC} — misconception: reactivity should decrease with more protons; all alkali-water reactions are similar`,
  },
]

const ALKALI_PROBES: SeedProbe[] = [
  {
    conceptId: ALKALI,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Cesium (bottom of Group 1) reacts far more violently with water than lithium (top of Group 1). Why does reactivity INCREASE down the group, despite cesium having more protons?',
    choices: [
      { text: 'Cesium\'s valence electron is much farther from the nucleus (more shells, more shielding), making it progressively easier to remove despite the greater nuclear charge — ionization energy decreases down the group', isCorrect: true },
      { text: 'This is an exception to periodic trends — more protons should always mean lower reactivity, but alkali metals are a rare exception with no clear explanation', isCorrect: false, misconceptionId: `${ALKALI}:MC1` },
    ],
    correctValue: 'Decreasing ionization energy down the group (shielding effect)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ALKALI}:MC1`],
    source: `${ALKALI_SRC} — distractor targets treating the reactivity trend as an unexplained periodic anomaly`,
  },
  {
    conceptId: ALKALI,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is the reaction of potassium with water similar in violence to sodium\'s well-known gentle fizzing reaction?',
    choices: [
      { text: 'No — potassium reacts noticeably more violently than sodium, often igniting the hydrogen gas produced, following the trend of increasing reactivity down Group 1', isCorrect: true },
      { text: 'Yes — all alkali metals react with water in essentially the same mild, fizzing manner regardless of position in the group', isCorrect: false, misconceptionId: `${ALKALI}:MC2` },
    ],
    correctValue: 'No — potassium reacts more violently than sodium',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ALKALI}:MC2`],
    source: `${ALKALI_SRC} — misconception: uniform mild reactivity across all alkali metals with water`,
  },
]

// ─── chem.pblock.group17 ─────────────────────────────────────────────────────
const G17 = 'chem.pblock.group17'
const G17_SRC = 'docs/chemistry/kg/graph.json — chem.pblock.group17'

const G17_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: G17,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Halogens (Group 17: F, Cl, Br, I) have 7 valence electrons — just ONE short of a ' +
      'full octet, making them extremely reactive NONMETALS eager to gain (or share) that ' +
      'one electron. Unlike alkali metals (reactivity increases down the group), halogen ' +
      'REACTIVITY DECREASES down the group — fluorine is the most reactive element in the ' +
      'entire periodic table (its extremely small size and high electron affinity make it ' +
      'gain an electron easily), while iodine is comparatively mild. This makes chemical ' +
      'sense via DISPLACEMENT REACTIONS: a more reactive halogen displaces a less ' +
      'reactive one from its salt (Cl₂ + 2NaBr → 2NaCl + Br₂ — chlorine, being more ' +
      'reactive/higher up, displaces bromide), but the reverse NEVER happens spontaneously. ' +
      'Halogens exist as diatomic molecules (F₂, Cl₂, Br₂, I₂) held by a single covalent ' +
      'bond, with physical STATE varying dramatically down the group at room temperature: ' +
      'F₂ and Cl₂ are gases, Br₂ is famously the only nonmetal that\'s LIQUID at room ' +
      'temperature, I₂ is a solid (with visible violet vapor upon sublimation) — this ' +
      'progression follows increasing molecular size/mass, hence stronger London ' +
      'dispersion forces between molecules.',
    targetedMisconceptions: [`${G17}:MC1`],
    source: `${G17_SRC} — halogen reactivity trend, displacement reactions, physical states`,
  },
  {
    conceptId: G17,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Halogen reactivity increases down the group, just like alkali metal ' +
      'reactivity does — same group direction, same trend." FALSE — this is a critical ' +
      'DIFFERENCE, not a similarity. Alkali metals get MORE reactive down the group ' +
      'because they LOSE an electron more easily as it gets farther from the nucleus. ' +
      'Halogens get LESS reactive down the group because they need to GAIN an electron, ' +
      'and a larger atom (down the group) has its nucleus farther from the incoming ' +
      'electron\'s destination, with more shielding — making electron GAIN progressively ' +
      'harder, not easier. Same "farther from nucleus, more shielding" physical cause, ' +
      'but OPPOSITE consequence depending on whether the group loses or gains electrons. ' +
      'Second trap: "Any halogen can displace any other halogen from its salt, regardless ' +
      'of direction." FALSE — displacement only works in ONE direction: MORE reactive ' +
      '(higher up) displaces LESS reactive (lower down). Iodine cannot displace chlorine ' +
      'from NaCl — that reaction simply doesn\'t occur, since it would require iodine to be ' +
      'more reactive than chlorine, which is backwards.',
    targetedMisconceptions: [`${G17}:MC1`, `${G17}:MC2`],
    source: `${G17_SRC} — misconception: halogen reactivity trend matches alkali metals; displacement works both directions`,
  },
]

const G17_PROBES: SeedProbe[] = [
  {
    conceptId: G17,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Alkali metal reactivity INCREASES down Group 1, but halogen reactivity DECREASES down Group 17. Why are these trends opposite, given both groups have similar "farther from nucleus" size trends?',
    choices: [
      { text: 'Alkali metals must LOSE an electron (easier when farther from nucleus, less nuclear pull); halogens must GAIN an electron (harder when farther from nucleus, since incoming electron feels weaker attraction and more shielding)', isCorrect: true },
      { text: 'This must be an error — both groups should show the exact same reactivity trend direction since they\'re both influenced by atomic size', isCorrect: false, misconceptionId: `${G17}:MC1` },
    ],
    correctValue: 'Opposite electron gain/loss requirements cause opposite trends',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${G17}:MC1`],
    source: `${G17_SRC} — distractor targets assuming all groups must share the same reactivity-trend direction`,
  },
  {
    conceptId: G17,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can iodine (I₂) displace chlorine from a sodium chloride (NaCl) solution?',
    choices: [
      { text: 'No — displacement only works when a MORE reactive halogen displaces a LESS reactive one; since chlorine is more reactive than iodine (higher up in the group), iodine cannot displace chlorine — only the reverse (Cl2 displacing I⁻) works', isCorrect: true },
      { text: 'Yes — any halogen can displace any other halogen from its salt in either direction', isCorrect: false, misconceptionId: `${G17}:MC2` },
    ],
    correctValue: 'No — displacement only works in the more-reactive-to-less-reactive direction',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G17}:MC2`],
    source: `${G17_SRC} — misconception: halogen displacement reactions are bidirectional`,
  },
]

// ─── chem.pblock.group18 ─────────────────────────────────────────────────────
const G18 = 'chem.pblock.group18'
const G18_SRC = 'docs/chemistry/kg/graph.json — chem.pblock.group18'

const G18_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: G18,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Noble gases (Group 18: He, Ne, Ar, Kr, Xe, Rn) have COMPLETE valence shells (full ' +
      'octet, or duet for helium) — the most stable electron configuration possible, ' +
      'which is exactly WHY every other element\'s bonding behavior is explained by ' +
      '"trying to achieve a noble gas configuration." This completeness makes noble gases ' +
      'exceptionally UNREACTIVE (historically called "inert gases," though this term is ' +
      'now understood to be not-quite-absolute — see below). They exist as MONATOMIC ' +
      'gases (single atoms, no molecular bonding needed since they\'re already stable) with ' +
      'only very weak London dispersion forces between them, giving them the LOWEST ' +
      'boiling points of any element group. Uses exploit their inertness: helium in ' +
      'weather balloons and MRI cooling (liquid He, near absolute zero), argon as an inert ' +
      'atmosphere for welding and incandescent light bulbs (prevents the hot filament from ' +
      'reacting with oxygen), neon in illuminated signage (its characteristic red-orange ' +
      'glow from electrical excitation).',
    targetedMisconceptions: [`${G18}:MC1`],
    source: `${G18_SRC} — noble gas properties, complete valence shells, monatomic nature, industrial uses`,
  },
  {
    conceptId: G18,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Noble gases NEVER form any chemical compounds, ever — they are perfectly ' +
      'and completely inert." FALSE in an absolute sense — this was believed true until ' +
      '1962, when Neil Bartlett synthesized XePtF₆, the first noble gas compound, proving ' +
      'that heavier noble gases (Xe, Kr — with more, larger, more loosely-held electron ' +
      'shells) CAN be forced to react under the right conditions with extremely powerful ' +
      'oxidizers (like PtF₆ or F₂ itself, forming XeF₂, XeF₄, XeF₆). Lighter noble gases ' +
      '(He, Ne, Ar) remain essentially unreactive under any normal laboratory conditions ' +
      '(their electrons are held far too tightly), but "noble gases never react" is now ' +
      'known to be an OVERSTATEMENT for the heavier members. The term "inert gases" has ' +
      'accordingly been mostly replaced by "noble gases" in modern usage, acknowledging ' +
      'this nuance (noble = generally aloof/unreactive, not absolutely inert). Second ' +
      'trap: "Since they\'re unreactive, noble gases have no practical industrial uses." ' +
      'FALSE — their very inertness IS their most valuable industrial property, exploited ' +
      'precisely because they won\'t react with whatever they\'re protecting or cooling.',
    targetedMisconceptions: [`${G18}:MC1`, `${G18}:MC2`],
    source: `${G18_SRC} — misconception: noble gases are absolutely and completely unreactive; unreactivity means no uses`,
  },
]

const G18_PROBES: SeedProbe[] = [
  {
    conceptId: G18,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In 1962, Neil Bartlett synthesized XePtF₆, a genuine xenon compound. What does this discovery tell us about noble gas reactivity?',
    choices: [
      { text: 'Heavier noble gases (like Xe) CAN be forced to react under extreme conditions with powerful oxidizers, even though they were historically believed to be completely inert — "noble" is not absolute for all members', isCorrect: true },
      { text: 'This must have been a measurement error, since noble gases are proven to be completely and permanently unreactive under all conditions', isCorrect: false, misconceptionId: `${G18}:MC1` },
    ],
    correctValue: 'Heavier noble gases can react under extreme conditions',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${G18}:MC1`],
    source: `${G18_SRC} — distractor targets the absolute-inertness misconception`,
  },
  {
    conceptId: G18,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Given that noble gases are chemically unreactive, does this mean they have no useful industrial applications?',
    choices: [
      { text: 'No — their inertness IS their most valuable property, used precisely because they won\'t react: argon protects hot metal filaments/welds from oxidation, helium safely cools MRI magnets without reacting', isCorrect: true },
      { text: 'Yes — since they don\'t react with anything, noble gases are essentially useless for practical applications', isCorrect: false, misconceptionId: `${G18}:MC2` },
    ],
    correctValue: 'No — inertness itself is industrially valuable',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${G18}:MC2`],
    source: `${G18_SRC} — misconception: chemical inertness implies no practical/industrial value`,
  },
]

// ─── chem.redox.balancing ────────────────────────────────────────────────────
const REDBAL = 'chem.redox.balancing'
const REDBAL_SRC = 'docs/chemistry/kg/graph.json — chem.redox.balancing'

const REDBAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REDBAL,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Redox equations often can\'t be balanced by simple inspection (unlike straightforward ' +
      'synthesis reactions) — the ION-ELECTRON (half-reaction) METHOD handles them ' +
      'systematically. Steps: (1) Split into two HALF-REACTIONS (oxidation and reduction ' +
      'separately). (2) Balance atoms OTHER than O and H first. (3) Balance OXYGEN by ' +
      'adding H₂O. (4) Balance HYDROGEN by adding H⁺ (in acidic solution) or, for basic ' +
      'solution, add H⁺ first then neutralize by adding equal OH⁻ to both sides (converting ' +
      'H⁺+OH⁻ pairs into H₂O). (5) Balance CHARGE by adding electrons (e⁻) to whichever side ' +
      'has more positive charge. (6) MULTIPLY each half-reaction so that electrons LOST in ' +
      'oxidation exactly EQUAL electrons GAINED in reduction (the electrons must cancel when ' +
      'combined — nothing "extra" left over). (7) ADD the two half-reactions together, ' +
      'canceling the electrons and any species appearing identically on both sides. This ' +
      'systematic method works even for complex reactions (like MnO₄⁻ + Fe²⁺ in acidic ' +
      'solution) where trial-and-error balancing would be nearly impossible.',
    targetedMisconceptions: [`${REDBAL}:MC1`],
    source: `${REDBAL_SRC} — ion-electron half-reaction balancing method, acidic/basic conditions`,
  },
  {
    conceptId: REDBAL,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Once each individual half-reaction is separately balanced (atoms AND charge), ' +
      'you can just add them together directly, done." Missing the CRITICAL step: before ' +
      'adding, you must MULTIPLY each half-reaction by an appropriate integer so the number ' +
      'of electrons in the oxidation half-reaction EXACTLY MATCHES the number in the ' +
      'reduction half-reaction. If oxidation loses 2 electrons per event and reduction gains ' +
      '5 electrons per event, you\'d multiply the oxidation half-reaction by 5 and the ' +
      'reduction half-reaction by 2, giving 10 electrons on each side — only THEN can they ' +
      'cancel cleanly when combined. Skipping this step leaves "leftover" uncancelled ' +
      'electrons in your final equation, which is never a valid balanced overall equation ' +
      '(free electrons don\'t appear in a real, complete redox reaction). Second trap: ' +
      '"Balancing for basic solution is fundamentally different from acidic — you need an ' +
      'entirely separate method from scratch." Not quite — the standard approach is to first ' +
      'balance AS IF in acidic solution (using H⁺), then ADD OH⁻ to both sides equal to the ' +
      'number of H⁺ present, converting H⁺+OH⁻ pairs into H₂O — a conversion step, not a ' +
      'separate method.',
    targetedMisconceptions: [`${REDBAL}:MC1`, `${REDBAL}:MC2`],
    source: `${REDBAL_SRC} — misconception: skipping electron-matching step; basic-solution balancing requires a separate method`,
  },
]

const REDBAL_PROBES: SeedProbe[] = [
  {
    conceptId: REDBAL,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'You have two balanced half-reactions: oxidation loses 3 electrons per event, reduction gains 2 electrons per event. Before adding them together, what must you do?',
    choices: [
      { text: 'Multiply the oxidation half-reaction by 2 and the reduction half-reaction by 3, so both involve exactly 6 electrons, which will then cancel cleanly when the half-reactions are added', isCorrect: true },
      { text: 'Simply add them as-is — the electrons will roughly balance out on average', isCorrect: false, misconceptionId: `${REDBAL}:MC1` },
    ],
    correctValue: 'Multiply to find the least common multiple of electrons (here, 6)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REDBAL}:MC1`],
    source: `${REDBAL_SRC} — distractor targets skipping the electron-matching multiplication step`,
  },
  {
    conceptId: REDBAL,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Do you need a completely different, from-scratch balancing method for redox reactions in BASIC solution compared to acidic solution?',
    choices: [
      { text: 'No — the standard approach balances as if in acidic solution first (using H⁺), then adds OH⁻ to both sides equal to the H⁺ count, converting H⁺+OH⁻ into H₂O — a conversion step, not a separate method', isCorrect: true },
      { text: 'Yes — basic solution balancing requires an entirely separate, unrelated procedure with no connection to the acidic method', isCorrect: false, misconceptionId: `${REDBAL}:MC2` },
    ],
    correctValue: 'No — basic solution builds on the acidic method with an extra conversion step',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REDBAL}:MC2`],
    source: `${REDBAL_SRC} — misconception: basic-solution balancing is an unrelated, separate method`,
  },
]

// ─── chem.thermo.bond-enthalpy ───────────────────────────────────────────────
const BONDH = 'chem.thermo.bond-enthalpy'
const BONDH_SRC = 'docs/chemistry/kg/graph.json — chem.thermo.bond-enthalpy'

const BONDH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BONDH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Bond enthalpy quantifies energy for one MOLE of a specific bond broken in the GAS ' +
      'phase — always a POSITIVE (endothermic) value, since breaking bonds always requires ' +
      'energy (as established in the enthalpy concept). AVERAGE bond enthalpy tables ' +
      '(published values) are exactly that — AVERAGES across many different molecules ' +
      'containing that bond type, since the true energy varies slightly depending on the ' +
      'rest of each specific molecule\'s structure (a C-H bond in methane isn\'t IDENTICAL ' +
      'in energy to a C-H bond in ethanol, though they\'re close). Using average bond ' +
      'enthalpies, you can ESTIMATE ΔH_rxn = Σ(bond enthalpies BROKEN, reactants) − ' +
      'Σ(bond enthalpies FORMED, products) — this gives a reasonable APPROXIMATION, not an ' +
      'exact value (unlike the exact Hess\'s Law method using ΔH°_f values). This estimation ' +
      'method is especially useful when formation enthalpies aren\'t available/tabulated, ' +
      'or for quick qualitative reasoning about whether a reaction should be roughly ' +
      'exothermic or endothermic based on comparing overall bond strength of reactants ' +
      'versus products.',
    targetedMisconceptions: [`${BONDH}:MC1`],
    source: `${BONDH_SRC} — average bond enthalpy, ΔH estimation from bonds broken/formed`,
  },
  {
    conceptId: BONDH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Bond enthalpy calculations using tabulated average values give the EXACT same ' +
      'ΔH as the precise Hess\'s Law method using ΔH°_f values." FALSE — bond enthalpy ' +
      'estimation is inherently APPROXIMATE, because average bond enthalpies are averaged ' +
      'across many different molecular environments, while a specific reaction\'s ACTUAL ' +
      'bonds have slightly different true energies depending on their exact molecular ' +
      'context (neighboring atoms, hybridization, etc.). The Hess\'s Law method (using ' +
      'measured, compound-specific ΔH°_f values) gives the precise, experimentally-anchored ' +
      'answer; bond enthalpy estimation gives a useful but APPROXIMATE ballpark figure — ' +
      'don\'t expect them to match exactly, and prefer Hess\'s Law when precision matters. ' +
      'Second trap: "Bond enthalpy calculations work equally well for reactions involving ' +
      'solids or liquids, not just gases." Bond enthalpy VALUES are specifically defined for ' +
      'GAS-PHASE bond breaking — applying them directly to reactions involving solids or ' +
      'liquids introduces additional error, since you\'d also need to account for the extra ' +
      'energy of vaporization/sublimation not captured by pure bond-breaking enthalpies.',
    targetedMisconceptions: [`${BONDH}:MC1`, `${BONDH}:MC2`],
    source: `${BONDH_SRC} — misconception: bond enthalpy estimation matches Hess's Law exactly; applies equally to all phases`,
  },
]

const BONDH_PROBES: SeedProbe[] = [
  {
    conceptId: BONDH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'You calculate ΔH for a reaction two ways: using average bond enthalpies (gives −250 kJ/mol) and using precise Hess\'s Law with ΔH°f values (gives −242 kJ/mol). Which is more likely accurate, and why the discrepancy?',
    choices: [
      { text: 'The Hess\'s Law value (−242) is more accurate — it uses precise, compound-specific measured values, while bond enthalpies are AVERAGES across many molecules, introducing approximation error', isCorrect: true },
      { text: 'They should be identical — any discrepancy indicates a calculation error, since both methods give exactly precise results', isCorrect: false, misconceptionId: `${BONDH}:MC1` },
    ],
    correctValue: 'Hess\'s Law is more precise; bond enthalpy is an approximation',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${BONDH}:MC1`],
    source: `${BONDH_SRC} — distractor targets expecting exact agreement between approximate and precise methods`,
  },
  {
    conceptId: BONDH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can you directly apply standard gas-phase bond enthalpy values to estimate ΔH for a reaction where one reactant is a solid?',
    choices: [
      { text: 'Not without extra care — bond enthalpies are defined for gas-phase bond breaking; applying them directly to solids ignores the additional energy needed for sublimation/phase change, introducing more error', isCorrect: true },
      { text: 'Yes — bond enthalpy values apply identically and without adjustment regardless of the physical state of the reactants', isCorrect: false, misconceptionId: `${BONDH}:MC2` },
    ],
    correctValue: 'Not directly — phase changes introduce additional energy not captured',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${BONDH}:MC2`],
    source: `${BONDH_SRC} — misconception: bond enthalpy applies uniformly regardless of physical state`,
  },
]

// ─── chem.sblock.alkaline-earth ──────────────────────────────────────────────
const ALKEARTH = 'chem.sblock.alkaline-earth'
const ALKEARTH_SRC = 'docs/chemistry/kg/graph.json — chem.sblock.alkaline-earth'

const ALKEARTH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALKEARTH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Alkaline earth metals (Group 2: Be, Mg, Ca, Sr, Ba) have 2 valence electrons, ' +
      'forming +2 ions. They\'re LESS reactive than their Group 1 neighbors (same period) ' +
      'because removing a SECOND electron (after the first) requires more energy — the ' +
      'ion is becoming increasingly positive, holding remaining electrons more tightly. ' +
      'But the same "reactivity increases down the group" trend from Group 1 still applies ' +
      'here (same shielding logic): magnesium reacts with cold water only very slowly, ' +
      'while barium reacts vigorously. BERYLLIUM is anomalous (small size, high charge ' +
      'density) — it forms significantly COVALENT compounds rather than purely ionic ones ' +
      '(BeCl₂ is covalent, unlike the ionic MgCl₂), similar to how lithium (Group 1\'s ' +
      'smallest, most anomalous member) shows a "diagonal relationship" with magnesium. ' +
      'Calcium and magnesium compounds are biologically essential (Ca²⁺ in bones/teeth and ' +
      'muscle contraction signaling; Mg²⁺ at the center of chlorophyll, essential for ' +
      'photosynthesis) and geologically abundant (limestone/CaCO₃, dolomite).',
    targetedMisconceptions: [`${ALKEARTH}:MC1`],
    source: `${ALKEARTH_SRC} — Group 2 properties, reactivity trends, beryllium anomaly, biological roles`,
  },
  {
    conceptId: ALKEARTH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Group 2 metals should be MORE reactive than Group 1 metals in the same ' +
      'period, since they have more valence electrons to potentially lose/react with." ' +
      'BACKWARDS — Group 2 metals are generally LESS reactive than their Group 1 ' +
      'neighbors, because forming a +2 ion requires removing TWO electrons (the second ' +
      'removal is always harder than the first, since you\'re pulling an electron away ' +
      'from an already-positive ion with stronger effective attraction). "More valence ' +
      'electrons" doesn\'t automatically mean "more reactive" — what matters is how EASILY ' +
      'those electrons can be removed, and removing a second electron is inherently harder ' +
      'than removing the first. Second trap: "All Group 2 elements form purely ionic ' +
      'compounds, no exceptions, since they\'re metals." Beryllium is a notable exception — ' +
      'its unusually small size and high charge density give it significant covalent ' +
      'character in its compounds (like BeCl₂), distinguishing it from the more typically ' +
      'ionic behavior of its heavier group-mates (MgCl₂, CaCl₂).',
    targetedMisconceptions: [`${ALKEARTH}:MC1`, `${ALKEARTH}:MC2`],
    source: `${ALKEARTH_SRC} — misconception: more valence electrons means more reactive; all Group 2 compounds are ionic`,
  },
]

const ALKEARTH_PROBES: SeedProbe[] = [
  {
    conceptId: ALKEARTH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Sodium (Group 1) is more reactive than magnesium (Group 2), even though magnesium has more valence electrons. Why?',
    choices: [
      { text: 'Magnesium must remove TWO electrons to form Mg²⁺, and removing the second electron requires significantly more energy than the first (since it\'s pulled from an already-positive ion) — reactivity depends on ease of electron removal, not electron count', isCorrect: true },
      { text: 'This must be an error — having more valence electrons should always make an element more reactive', isCorrect: false, misconceptionId: `${ALKEARTH}:MC1` },
    ],
    correctValue: 'Removing the second electron is harder, reducing reactivity',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ALKEARTH}:MC1`],
    source: `${ALKEARTH_SRC} — distractor targets assuming more valence electrons directly means more reactivity`,
  },
  {
    conceptId: ALKEARTH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Is BeCl₂ (beryllium chloride) purely ionic, like typical Group 2 metal chlorides such as MgCl₂ and CaCl₂?',
    choices: [
      { text: 'No — beryllium\'s unusually small size and high charge density give BeCl₂ significant covalent character, unlike the more purely ionic chlorides of heavier Group 2 members', isCorrect: true },
      { text: 'Yes — all Group 2 metal chlorides are purely ionic without exception, since they are all metals reacting with a nonmetal', isCorrect: false, misconceptionId: `${ALKEARTH}:MC2` },
    ],
    correctValue: 'No — BeCl₂ has significant covalent character',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ALKEARTH}:MC2`],
    source: `${ALKEARTH_SRC} — misconception: all Group 2 metal halides are purely ionic without exception`,
  },
]

// ─── chem.redox.activity-series ──────────────────────────────────────────────
const ACTSER = 'chem.redox.activity-series'
const ACTSER_SRC = 'docs/chemistry/kg/graph.json — chem.redox.activity-series'

const ACTSER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ACTSER,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'The activity series ranks metals by how readily they LOSE electrons (get ' +
      'oxidized) — a practical, EXPERIMENTALLY-derived ordering closely related to ' +
      'standard reduction potentials (E°, covered in electrochemical thermodynamics ' +
      'earlier) but often taught as a simpler qualitative list: K > Na > Ca > Mg > Al > ' +
      'Zn > Fe > Pb > (H) > Cu > Ag > Au. A metal HIGHER in the series will DISPLACE (via ' +
      'a single-replacement reaction) any metal BELOW it from its salt solution: Zn + ' +
      'CuSO₄ → ZnSO₄ + Cu (zinc, above copper, displaces it) — but copper CANNOT displace ' +
      'zinc from ZnSO₄ (reverse never happens spontaneously). Metals ABOVE hydrogen react ' +
      'with dilute acids to release H₂ gas (Zn + 2HCl → ZnCl₂ + H₂); metals BELOW hydrogen ' +
      '(Cu, Ag, Au — the "noble metals") do NOT react with dilute acids this way, which is ' +
      'exactly why gold and silver remain untarnished/unreactive for jewelry and why copper ' +
      'pipes don\'t dissolve in typical household acidic conditions. This series is ' +
      'essentially the same "electron-losing tendency" concept as reduction potentials, ' +
      'presented as a memorizable practical ranking.',
    targetedMisconceptions: [`${ACTSER}:MC1`],
    source: `${ACTSER_SRC} — activity series, single displacement, reaction with acids`,
  },
  {
    conceptId: ACTSER,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Any metal can displace any other metal from solution — it just depends on ' +
      'concentration or conditions, not a fixed hierarchy." FALSE for standard conditions ' +
      '— the activity series reflects an inherent THERMODYNAMIC ordering (related to E° ' +
      'values), and displacement genuinely only proceeds SPONTANEOUSLY in one direction ' +
      '(higher displaces lower), not the reverse, regardless of concentration tweaks under ' +
      'normal conditions. Copper metal placed in a zinc sulfate solution will NOT dissolve ' +
      'to displace zinc, no matter how concentrated the solution or how long you wait — ' +
      'the reaction is thermodynamically unfavorable in that direction (ΔG>0). Second ' +
      'trap: "Metals below hydrogen in the activity series don\'t react with ANY acid, ' +
      'ever." Not quite — they don\'t react with acids via simple H⁺ displacement (the ' +
      'standard mechanism relevant here), but SOME (like copper, silver) CAN react with ' +
      'strongly OXIDIZING acids (concentrated HNO₃, hot concentrated H₂SO₄) via a ' +
      'completely different mechanism (the acid\'s anion, not H⁺, acts as the oxidizer) — ' +
      'this is a genuinely different reaction pathway, not a contradiction of the activity ' +
      'series\' basic H⁺-displacement rule.',
    targetedMisconceptions: [`${ACTSER}:MC1`, `${ACTSER}:MC2`],
    source: `${ACTSER_SRC} — misconception: displacement direction is flexible with conditions; below-H metals never react with any acid`,
  },
]

const ACTSER_PROBES: SeedProbe[] = [
  {
    conceptId: ACTSER,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'A piece of copper metal is placed in a concentrated zinc sulfate (ZnSO₄) solution. Will copper displace zinc, dissolving into solution as Cu²⁺ while Zn metal deposits?',
    choices: [
      { text: 'No — zinc is above copper in the activity series, so copper cannot spontaneously displace zinc regardless of concentration; only the reverse (Zn displacing Cu²⁺) is thermodynamically favorable', isCorrect: true },
      { text: 'Yes — if the zinc sulfate solution is concentrated enough, copper will displace zinc from solution', isCorrect: false, misconceptionId: `${ACTSER}:MC1` },
    ],
    correctValue: 'No — displacement only proceeds in one direction regardless of concentration',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ACTSER}:MC1`],
    source: `${ACTSER_SRC} — distractor targets assuming concentration can reverse the direction of spontaneous displacement`,
  },
  {
    conceptId: ACTSER,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Copper is below hydrogen in the activity series and doesn\'t react with dilute HCl. Does this mean copper never reacts with ANY acid under any circumstances?',
    choices: [
      { text: 'No — copper doesn\'t react via the standard H⁺-displacement mechanism with dilute non-oxidizing acids, but it CAN react with strongly oxidizing acids (like concentrated HNO₃) via a completely different mechanism where the acid\'s anion acts as the oxidizer', isCorrect: true },
      { text: 'Yes — being below hydrogen in the activity series means copper is completely unreactive toward every acid without exception', isCorrect: false, misconceptionId: `${ACTSER}:MC2` },
    ],
    correctValue: 'No — copper reacts with oxidizing acids via a different mechanism',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${ACTSER}:MC2`],
    source: `${ACTSER_SRC} — misconception: below-hydrogen metals are universally unreactive with all acids`,
  },
]

// ─── chem.bond.mo-theory ─────────────────────────────────────────────────────
const MOTHY = 'chem.bond.mo-theory'
const MOTHY_SRC = 'docs/chemistry/kg/graph.json — chem.bond.mo-theory'

const MOTHY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MOTHY,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Molecular Orbital (MO) Theory offers a MORE ACCURATE (though more complex) model ' +
      'of bonding than simple Lewis structures/VSEPR by treating electrons as belonging to ' +
      'the WHOLE MOLECULE, not localized bonds. When two atomic orbitals combine, they form ' +
      'TWO molecular orbitals: a BONDING orbital (lower energy, electron density ' +
      'concentrated BETWEEN nuclei, stabilizing) and an ANTIBONDING orbital (higher energy, ' +
      'a node between nuclei, destabilizing — marked with an asterisk, σ*). Fill MOs from ' +
      'lowest to highest energy (Aufbau again), and calculate BOND ORDER = ' +
      '(bonding electrons − antibonding electrons)/2. Bond order 0 means the molecule ' +
      'CANNOT exist stably (He₂ has bond order 0 — this is WHY helium doesn\'t form He₂, ' +
      'something Lewis structures alone can\'t easily explain). MO theory correctly ' +
      'predicts O₂\'s PARAMAGNETISM (weakly attracted to magnets, due to two unpaired ' +
      'electrons in its π* antibonding orbitals) — a genuine experimental fact that simple ' +
      'Lewis structures (which draw O₂ with all electrons paired) completely FAIL to ' +
      'predict, making this a classic demonstration of MO theory\'s superior explanatory ' +
      'power for certain molecules.',
    targetedMisconceptions: [`${MOTHY}:MC1`],
    source: `${MOTHY_SRC} — bonding/antibonding MOs, bond order, O2 paramagnetism as key evidence`,
  },
  {
    conceptId: MOTHY,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "MO theory and Lewis structure/VSEPR theory are competing, contradictory ' +
      'models — one must be simply wrong." Better framing: they\'re models at different ' +
      'levels of SOPHISTICATION, each useful for different purposes. Lewis/VSEPR is ' +
      'simpler, faster, and gets most everyday predictions right (molecular shape, basic ' +
      'reactivity) — it\'s the right tool for routine work. MO theory is more accurate and ' +
      'necessary when Lewis structures fail to explain real experimental observations (like ' +
      'O₂\'s paramagnetism, or why He₂ doesn\'t exist despite each He atom "wanting" more ' +
      'electrons). Choose the right tool for the question at hand — don\'t discard the ' +
      'simpler model just because a more complex one exists; use the simpler one until it ' +
      'demonstrably fails. Second trap: "A bond order of 0 just means a very weak bond, ' +
      'still forms but barely." No — bond order 0 specifically means the molecule CANNOT ' +
      'exist as a stable species — the bonding and antibonding contributions exactly ' +
      'cancel, providing ZERO net stabilization over the two separate atoms, which is ' +
      'exactly why He₂ genuinely doesn\'t form under normal conditions (not "forms weakly," ' +
      'but doesn\'t form at all as a stable molecule).',
    targetedMisconceptions: [`${MOTHY}:MC1`, `${MOTHY}:MC2`],
    source: `${MOTHY_SRC} — misconception: MO and Lewis theories are contradictory rather than complementary; bond order 0 means "weak" not "nonexistent"`,
  },
]

const MOTHY_PROBES: SeedProbe[] = [
  {
    conceptId: MOTHY,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A simple Lewis structure for O₂ draws all electrons as paired, predicting O₂ should NOT be attracted to a magnetic field. But O₂ IS experimentally paramagnetic (weakly magnetic). How does MO theory resolve this discrepancy?',
    choices: [
      { text: 'MO theory correctly places two electrons unpaired in O₂\'s π* antibonding orbitals, explaining the observed paramagnetism — something the simpler Lewis structure model fails to predict', isCorrect: true },
      { text: 'This is an experimental error — O₂ cannot actually be paramagnetic if its Lewis structure shows all paired electrons', isCorrect: false, misconceptionId: `${MOTHY}:MC1` },
    ],
    correctValue: 'MO theory correctly predicts unpaired electrons (paramagnetism)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MOTHY}:MC1`],
    source: `${MOTHY_SRC} — distractor targets dismissing experimental data that contradicts the simpler model`,
  },
  {
    conceptId: MOTHY,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'MO theory calculates a bond order of 0 for He₂ (two helium atoms). Does this mean He₂ forms a very weak, barely-detectable bond?',
    choices: [
      { text: 'No — bond order 0 means the bonding and antibonding contributions exactly cancel, providing zero net stabilization; He₂ does not exist as a stable molecule under normal conditions, not merely "weakly"', isCorrect: true },
      { text: 'Yes — bond order 0 simply indicates an unusually weak bond that still technically forms', isCorrect: false, misconceptionId: `${MOTHY}:MC2` },
    ],
    correctValue: 'No — bond order 0 means no stable molecule forms',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${MOTHY}:MC2`],
    source: `${MOTHY_SRC} — misconception: bond order 0 indicates a weak bond rather than no stable bond at all`,
  },
]

// ─── chem.bond.polar-molecules ───────────────────────────────────────────────
const POLARM = 'chem.bond.polar-molecules'
const POLARM_SRC = 'docs/chemistry/kg/graph.json — chem.bond.polar-molecules'

const POLARM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POLARM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Building on bond parameters and VSEPR covered earlier: a molecule\'s overall ' +
      'polarity requires combining BOTH bond polarity AND molecular geometry. The recipe: ' +
      '(1) Determine if individual bonds are polar (electronegativity difference between ' +
      'bonded atoms). (2) Determine the molecular geometry (VSEPR). (3) Vector-sum ALL bond ' +
      'dipoles according to that geometry — if they cancel by symmetry, the molecule is ' +
      'NONPOLAR overall (even with polar bonds); if they don\'t fully cancel, there\'s a NET ' +
      'DIPOLE and the molecule is POLAR. Polar molecules have important CONSEQUENCES: they ' +
      'experience DIPOLE-DIPOLE intermolecular forces (positive end of one molecule ' +
      'attracts negative end of another), generally giving HIGHER boiling/melting points ' +
      'than similarly-sized nonpolar molecules (weaker London-dispersion-only forces), ' +
      'and they dissolve well in OTHER polar solvents (like dissolving like — connects to ' +
      'the solution types concept). Polar molecules also align in an electric field (used ' +
      'in microwave ovens: water\'s polarity lets microwaves rapidly flip/rotate water ' +
      'molecules, generating frictional heat).',
    targetedMisconceptions: [`${POLARM}:MC1`],
    source: `${POLARM_SRC} — determining overall molecular polarity, consequences for physical properties`,
  },
  {
    conceptId: POLARM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "You can determine a molecule\'s overall polarity just by counting how many ' +
      'polar bonds it has — more polar bonds means more polar molecule, simple addition." ' +
      'FALSE — as established with CO₂ vs. H₂O earlier, GEOMETRY determines whether bond ' +
      'dipoles ADD or CANCEL. A molecule with MANY polar bonds arranged symmetrically ' +
      '(CCl₄, CO₂, SF₆) can be completely nonpolar, while a molecule with just ONE or TWO ' +
      'polar bonds arranged asymmetrically (HCl, H₂O) is clearly polar. Count of polar ' +
      'bonds tells you nothing without knowing the geometric arrangement. Second trap: ' +
      '"Nonpolar molecules have absolutely NO intermolecular attraction to each other." ' +
      'FALSE — even perfectly nonpolar molecules (like N₂ or CH₄) experience LONDON ' +
      'DISPERSION FORCES (temporary, fluctuating dipoles from momentary electron ' +
      'distribution imbalances) — this is why nonpolar substances still condense into ' +
      'liquids/solids at low enough temperature (liquid nitrogen exists!) rather than ' +
      'remaining gases forever; the intermolecular force is just WEAKER than dipole-dipole ' +
      'or hydrogen bonding, not absent entirely.',
    targetedMisconceptions: [`${POLARM}:MC1`, `${POLARM}:MC2`],
    source: `${POLARM_SRC} — misconception: polarity is determined by counting polar bonds; nonpolar means zero intermolecular force`,
  },
]

const POLARM_PROBES: SeedProbe[] = [
  {
    conceptId: POLARM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'SF₆ has six polar S-F bonds (fluorine is very electronegative), while HCl has just one polar bond. Which molecule is actually polar overall?',
    choices: [
      { text: 'HCl — despite having far fewer polar bonds than SF₆, HCl\'s single bond dipole has nothing to cancel with, while SF₆\'s highly symmetric octahedral geometry causes all six dipoles to cancel exactly, making SF₆ nonpolar overall', isCorrect: true },
      { text: 'SF₆ — since it has more polar bonds (six vs. one), it must be the more polar molecule overall', isCorrect: false, misconceptionId: `${POLARM}:MC1` },
    ],
    correctValue: 'HCl is polar; SF₆ is nonpolar despite having more polar bonds',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${POLARM}:MC1`],
    source: `${POLARM_SRC} — distractor targets counting polar bonds instead of considering geometric cancellation`,
  },
  {
    conceptId: POLARM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Nitrogen gas (N₂) is a completely nonpolar molecule. Does this mean N₂ molecules experience ZERO intermolecular attraction to each other, and should therefore never condense into a liquid?',
    choices: [
      { text: 'No — even nonpolar molecules experience London dispersion forces (temporary fluctuating dipoles), which is why liquid nitrogen exists at sufficiently low temperature; the intermolecular force is weaker than dipole-dipole, but not zero', isCorrect: true },
      { text: 'Yes — nonpolar molecules by definition have zero intermolecular attraction and can never be liquefied under any conditions', isCorrect: false, misconceptionId: `${POLARM}:MC2` },
    ],
    correctValue: 'No — London dispersion forces still exist for nonpolar molecules',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${POLARM}:MC2`],
    source: `${POLARM_SRC} — misconception: nonpolar molecules have zero intermolecular force`,
  },
]

// ─── chem.solid.packing ──────────────────────────────────────────────────────
const PACK = 'chem.solid.packing'
const PACK_SRC = 'docs/chemistry/kg/graph.json — chem.solid.packing'

const PACK_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PACK,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Building on crystal systems: how do spheres (atoms) pack MOST EFFICIENTLY in 3D? ' +
      'Start with one layer of spheres touching in a hexagonal pattern (each sphere ' +
      'touches 6 neighbors in-plane). The NEXT layer nestles into the DEPRESSIONS of the ' +
      'first — but there are two distinct choices for a THIRD layer, giving two different ' +
      'CLOSE-PACKED structures: HEXAGONAL CLOSE PACKING (HCP: layers ABABAB..., third ' +
      'layer directly above the first) and CUBIC CLOSE PACKING (CCP, same as ' +
      'face-centered-cubic FCC: layers ABCABC..., third layer offset from both previous ' +
      'ones). BOTH achieve the theoretical MAXIMUM packing efficiency for identical spheres ' +
      '— exactly 74.05% of space filled, mathematically proven to be the best possible ' +
      '(Kepler\'s conjecture) — with COORDINATION NUMBER 12 (each atom touches 12 nearest ' +
      'neighbors) in both arrangements. The difference is purely in the STACKING SEQUENCE ' +
      '(ABAB vs ABCABC), affecting subtle mechanical properties (like how easily layers ' +
      'slip past each other) even though overall density/efficiency is identical. Many ' +
      'metals crystallize in one of these two close-packed structures (Mg, Zn: HCP; Cu, Al, ' +
      'Au: CCP/FCC) precisely because maximizing packing efficiency minimizes energy.',
    targetedMisconceptions: [`${PACK}:MC1`],
    source: `${PACK_SRC} — hexagonal close packing, cubic close packing, coordination number, packing efficiency`,
  },
  {
    conceptId: PACK,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Hexagonal close packing (HCP) and cubic close packing (CCP) have different ' +
      'packing efficiencies, since they have different names and different unit cell ' +
      'shapes." FALSE — both achieve the EXACT SAME maximum packing efficiency (74.05%) ' +
      'and the SAME coordination number (12) — they represent the two mathematically ' +
      'distinct ways to achieve the theoretical BEST possible sphere packing, differing ' +
      'only in stacking SEQUENCE (ABAB vs ABCABC), not in overall density. The names ' +
      'reflect different unit cell descriptions of otherwise equally-efficient ' +
      'arrangements. Second trap: "Simple cubic packing (52% efficient) and close packing ' +
      '(74% efficient) differ because simple cubic atoms are somehow smaller or arranged ' +
      'differently in size." No — packing efficiency differences come purely from ' +
      'GEOMETRIC ARRANGEMENT (how spheres of the SAME size are positioned relative to each ' +
      'other), not from any difference in atom size. Simple cubic leaves large gaps ' +
      'because atoms only touch along cell edges; close packing eliminates most of these ' +
      'gaps through the nested hexagonal layer arrangement.',
    targetedMisconceptions: [`${PACK}:MC1`, `${PACK}:MC2`],
    source: `${PACK_SRC} — misconception: HCP and CCP have different efficiencies; packing efficiency reflects atom size differences`,
  },
]

const PACK_PROBES: SeedProbe[] = [
  {
    conceptId: PACK,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Magnesium crystallizes in HCP (ABAB stacking) while copper crystallizes in CCP/FCC (ABCABC stacking). Which metal has the more efficiently packed crystal structure?',
    choices: [
      { text: 'Neither — both HCP and CCP achieve the identical maximum packing efficiency of 74.05% and coordination number 12; they differ only in stacking sequence, not overall density', isCorrect: true },
      { text: 'Copper — CCP/FCC is inherently more efficient than HCP due to its cubic unit cell', isCorrect: false, misconceptionId: `${PACK}:MC1` },
    ],
    correctValue: 'Neither — identical packing efficiency',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${PACK}:MC1`],
    source: `${PACK_SRC} — distractor targets assuming different close-packing names imply different efficiencies`,
  },
  {
    conceptId: PACK,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Simple cubic packing is only 52% efficient, while close packing (HCP/CCP) reaches 74%. Does this difference arise because close-packed atoms are somehow smaller?',
    choices: [
      { text: 'No — packing efficiency differences come purely from GEOMETRIC ARRANGEMENT of identically-sized spheres; simple cubic leaves large unfilled gaps, while close packing eliminates most gaps through nested layer positioning', isCorrect: true },
      { text: 'Yes — close-packed structures use smaller atoms that fit together more tightly than simple cubic structures', isCorrect: false, misconceptionId: `${PACK}:MC2` },
    ],
    correctValue: 'No — purely a geometric arrangement difference, same atom size',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PACK}:MC2`],
    source: `${PACK_SRC} — misconception: packing efficiency differences reflect atom size rather than arrangement`,
  },
]

// ─── chem.solid.defects ──────────────────────────────────────────────────────
const DEFECT = 'chem.solid.defects'
const DEFECT_SRC = 'docs/chemistry/kg/graph.json — chem.solid.defects'

const DEFECT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DEFECT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Real crystals are never perfectly ordered — DEFECTS (irregularities in the ideal ' +
      'lattice pattern) are not just tolerated but often ESSENTIAL for useful material ' +
      'properties. POINT DEFECTS occur at single lattice sites: VACANCY (an atom missing ' +
      'entirely from its expected position — decreases density slightly), INTERSTITIAL ' +
      '(an extra atom squeezed into a gap between regular lattice positions — increases ' +
      'density slightly), and SUBSTITUTIONAL (a different atom replacing the expected one ' +
      'at a lattice site — this is exactly how ALLOYS and DOPED SEMICONDUCTORS work). ' +
      'Ionic crystals show two special defect PAIRS that preserve overall electrical ' +
      'neutrality: FRENKEL defect (a cation leaves its site and squeezes into an ' +
      'interstitial gap — common when there\'s a large size difference between cation and ' +
      'anion, like AgBr) and SCHOTTKY defect (both a cation AND anion vacancy occur ' +
      'together, in stoichiometric ratio — common when cation and anion are similar size, ' +
      'like NaCl). Defects genuinely INCREASE conductivity (vacant/interstitial sites let ' +
      'ions or electrons move more easily) and are deliberately engineered into ' +
      'semiconductors via DOPING (substitutional defects) to precisely control electrical ' +
      'properties — the entire foundation of modern electronics.',
    targetedMisconceptions: [`${DEFECT}:MC1`],
    source: `${DEFECT_SRC} — point defects, Frenkel/Schottky defects, doping applications`,
  },
  {
    conceptId: DEFECT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Crystal defects are always undesirable flaws that should be minimized or ' +
      'eliminated for a "good" material." FALSE in general — while some applications DO ' +
      'want minimal defects (like ultra-pure silicon wafers before doping), MANY of the ' +
      'most useful materials properties come DIRECTLY from deliberately introduced defects: ' +
      'doped semiconductors (substitutional defects controlling conductivity), alloys ' +
      '(substitutional defects like carbon in steel dramatically increasing hardness), and ' +
      'colored gemstones (point defects/impurities creating characteristic colors — ruby\'s ' +
      'red comes from Cr³⁺ substitutional defects in aluminum oxide). Defects are a design ' +
      'TOOL, not just an unavoidable flaw. Second trap: "Frenkel and Schottky defects are ' +
      'essentially the same thing, just different names for any ionic crystal ' +
      'imperfection." FALSE — they\'re structurally distinct: Frenkel involves an ion ' +
      'MOVING to an interstitial site (density roughly unchanged, since the ion is still ' +
      'present, just relocated), while Schottky involves ions LEAVING the crystal entirely ' +
      '(both a cation AND anion vacancy, density DECREASES since mass is genuinely lost ' +
      'from that region) — they occur under different size-ratio conditions and have ' +
      'different physical consequences.',
    targetedMisconceptions: [`${DEFECT}:MC1`, `${DEFECT}:MC2`],
    source: `${DEFECT_SRC} — misconception: defects are always undesirable flaws; Frenkel and Schottky are interchangeable`,
  },
]

const DEFECT_PROBES: SeedProbe[] = [
  {
    conceptId: DEFECT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Silicon computer chips are deliberately "doped" with trace amounts of phosphorus or boron atoms (substitutional defects). Is this defect introduction a manufacturing flaw to be avoided?',
    choices: [
      { text: 'No — doping is a deliberate, essential engineering technique; substitutional defects precisely control the semiconductor\'s electrical conductivity, forming the foundation of all modern electronics', isCorrect: true },
      { text: 'Yes — any crystal defect, including doping, represents an undesirable flaw that reduces the material\'s quality and should be minimized wherever possible', isCorrect: false, misconceptionId: `${DEFECT}:MC1` },
    ],
    correctValue: 'No — doping is a deliberate, beneficial engineering technique',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DEFECT}:MC1`],
    source: `${DEFECT_SRC} — distractor targets treating all crystal defects as undesirable flaws`,
  },
  {
    conceptId: DEFECT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'AgBr commonly shows Frenkel defects, while NaCl commonly shows Schottky defects. Are these two defect types essentially the same phenomenon with different names?',
    choices: [
      { text: 'No — Frenkel involves an ion moving to an interstitial site (density roughly unchanged), while Schottky involves both a cation and anion vacancy (ions leaving entirely, density decreases); they occur under different cation/anion size-ratio conditions', isCorrect: true },
      { text: 'Yes — Frenkel and Schottky defects are interchangeable terms describing the same underlying structural imperfection', isCorrect: false, misconceptionId: `${DEFECT}:MC2` },
    ],
    correctValue: 'No — structurally and physically distinct defect types',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${DEFECT}:MC2`],
    source: `${DEFECT_SRC} — misconception: conflating Frenkel and Schottky defects as identical`,
  },
]

// ─── chem.solid.amorphous ────────────────────────────────────────────────────
const AMORPH = 'chem.solid.amorphous'
const AMORPH_SRC = 'docs/chemistry/kg/graph.json — chem.solid.amorphous'

const AMORPH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: AMORPH,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Amorphous solids lack the LONG-RANGE periodic order of crystals — particles are ' +
      'randomly arranged (like a "frozen liquid"), though they often retain SHORT-RANGE ' +
      'order (individual molecular units, like SiO₄ tetrahedra in glass, keep their local ' +
      'shape, just not their long-range repeating pattern). This structural difference ' +
      'produces distinctly different behavior from crystals: amorphous solids SOFTEN ' +
      'GRADUALLY over a temperature range (no sharp melting point — as covered in crystal ' +
      'systems) because different regions have different local bonding strengths that ' +
      'break at slightly different temperatures, unlike a crystal where identical, uniform ' +
      'bonds all break simultaneously at one exact temperature. Amorphous solids are also ' +
      'generally ISOTROPIC (same physical properties measured in every direction — glass ' +
      'shatters unpredictably in any orientation), while crystals are often ANISOTROPIC ' +
      '(properties differ by direction — mica cleaves cleanly along specific planes because ' +
      'those planes have systematically weaker bonding than others). Common amorphous ' +
      'materials: glass (SiO₂-based, rapidly cooled to prevent crystallization), most ' +
      'plastics, rubber.',
    targetedMisconceptions: [`${AMORPH}:MC1`],
    source: `${AMORPH_SRC} — amorphous vs crystalline structure, isotropic vs anisotropic, gradual softening`,
  },
  {
    conceptId: AMORPH,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Glass is technically a liquid that flows very, very slowly over time — old ' +
      'windowpanes are thicker at the bottom because the glass has flowed downward over ' +
      'centuries." This is a WIDESPREAD popular myth, but it\'s FALSE. Glass at room ' +
      'temperature is a rigid amorphous SOLID, not a slow-flowing liquid — it does not ' +
      'measurably flow on any human timescale (the viscosity of room-temperature glass is ' +
      'so astronomically high that any flow would take far longer than the age of the ' +
      'universe to become noticeable). The uneven thickness seen in some old windowpanes ' +
      'is actually due to imperfect historical manufacturing techniques (older glass-making ' +
      'processes, like crown glass, naturally produced panes of variable thickness, which ' +
      'installers often placed thick-side-down for stability) — a manufacturing artifact, ' +
      'not evidence of glass flow. Second trap: "Amorphous solids have completely random ' +
      'structure at every scale, with no order whatsoever." Not quite — amorphous solids ' +
      'typically retain SHORT-RANGE order (individual molecular building blocks keep their ' +
      'local shape/bonding), losing only the LONG-RANGE repeating periodicity that defines ' +
      'true crystals.',
    targetedMisconceptions: [`${AMORPH}:MC1`, `${AMORPH}:MC2`],
    source: `${AMORPH_SRC} — misconception: glass is a slow-flowing liquid; amorphous solids have zero structural order`,
  },
]

const AMORPH_PROBES: SeedProbe[] = [
  {
    conceptId: AMORPH,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Some old cathedral windows have glass that is thicker at the bottom than the top. Does this prove that glass is a very slowly flowing liquid at room temperature?',
    choices: [
      { text: 'No — this is a widespread myth; room-temperature glass is a rigid amorphous solid that does not measurably flow. The uneven thickness comes from imperfect historical manufacturing techniques, not centuries of flow', isCorrect: true },
      { text: 'Yes — this is direct physical evidence that glass, though appearing solid, is actually flowing extremely slowly as a liquid over centuries', isCorrect: false, misconceptionId: `${AMORPH}:MC1` },
    ],
    correctValue: 'No — glass does not flow; the thickness variation is a manufacturing artifact',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${AMORPH}:MC1`],
    source: `${AMORPH_SRC} — distractor targets the popular "glass is a slow liquid" myth`,
  },
  {
    conceptId: AMORPH,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In glass (SiO₂-based), individual SiO₄ tetrahedra retain their characteristic local shape, but the tetrahedra are randomly oriented relative to each other throughout the material. Does this describe complete structural randomness at every scale?',
    choices: [
      { text: 'No — this describes SHORT-RANGE order (the local tetrahedral shape is maintained) combined with a LACK of LONG-RANGE order (no repeating periodic pattern across the material) — not total randomness at every scale', isCorrect: true },
      { text: 'Yes — amorphous solids like glass have absolutely no structural order at any scale, from the atomic level upward', isCorrect: false, misconceptionId: `${AMORPH}:MC2` },
    ],
    correctValue: 'No — short-range order exists despite lack of long-range order',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${AMORPH}:MC2`],
    source: `${AMORPH_SRC} — misconception: amorphous solids have zero order at any structural scale`,
  },
]

// ─── chem.coord.werner ───────────────────────────────────────────────────────
const WERNER = 'chem.coord.werner'
const WERNER_SRC = 'docs/chemistry/kg/graph.json — chem.coord.werner'

const WERNER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WERNER,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Before Werner (1893), chemists were baffled by compounds like CoCl₃·6NH₃ — simple ' +
      'valence theory couldn\'t explain why cobalt (normally +3, forming 3 bonds) could ' +
      'combine with SIX extra ammonia molecules seemingly beyond its normal bonding ' +
      'capacity. Werner\'s revolutionary insight: metals have TWO SEPARATE types of ' +
      'valence. PRIMARY VALENCE (= oxidation state, satisfied by anions like Cl⁻, forming ' +
      'IONIZABLE bonds that dissociate in water) and SECONDARY VALENCE (= COORDINATION ' +
      'NUMBER, the fixed number of ligands directly bonded to the metal via coordinate ' +
      'bonds, as covered earlier — these are NON-IONIZABLE, staying attached even in ' +
      'solution). For [Co(NH₃)₆]Cl₃: primary valence = 3 (three Cl⁻ ions, freely dissociable, ' +
      'detected by AgNO₃ precipitation test), secondary valence = 6 (six NH₃ ligands, ' +
      'tightly bound directly to Co, NOT freely dissociable, invisible to simple ' +
      'precipitation tests). Werner predicted (and was later confirmed by X-ray ' +
      'crystallography, decades after his death) that 6-coordinate complexes are ' +
      'OCTAHEDRAL in geometry — a genuinely predictive theory, not just a descriptive ' +
      'patch, earning Werner the 1913 Nobel Prize.',
    targetedMisconceptions: [`${WERNER}:MC1`],
    source: `${WERNER_SRC} — Werner's coordination theory, primary vs secondary valence, predicted octahedral geometry`,
  },
  {
    conceptId: WERNER,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "All the chloride ions and ammonia molecules in CoCl₃·6NH₃ behave identically ' +
      'when dissolved in water — they\'re all just "attached" to cobalt in the same way." ' +
      'FALSE — this was exactly the puzzle Werner solved. Experimentally, dissolving ' +
      '[Co(NH₃)₆]Cl₃ in water and adding AgNO₃ precipitates ALL THREE chloride ions ' +
      'immediately (as AgCl) — they behave as genuinely FREE, ionizable Cl⁻ ions (primary ' +
      'valence). But the six NH₃ molecules do NOT dissociate or react with AgNO₃ at all — ' +
      'they remain PERMANENTLY bound directly to the cobalt center (secondary valence, ' +
      'coordinate bonds). These are fundamentally DIFFERENT types of attachment with ' +
      'different chemical behavior, not interchangeable "generic bonding." Second trap: ' +
      '"Werner\'s theory was purely descriptive, just explaining what was already known ' +
      'with no new predictions." FALSE — Werner correctly PREDICTED the octahedral ' +
      'geometry for 6-coordinate complexes based on isomer-counting logic, YEARS before ' +
      'X-ray crystallography existed to directly confirm 3D molecular structures — a ' +
      'genuine, falsifiable scientific prediction that turned out to be correct.',
    targetedMisconceptions: [`${WERNER}:MC1`, `${WERNER}:MC2`],
    source: `${WERNER_SRC} — misconception: all ligands/ions behave identically; Werner's theory was purely descriptive`,
  },
]

const WERNER_PROBES: SeedProbe[] = [
  {
    conceptId: WERNER,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'When [Co(NH₃)₆]Cl₃ is dissolved in water and treated with AgNO₃, all three chloride ions precipitate as AgCl, but none of the six ammonia molecules react or dissociate. What does this reveal?',
    choices: [
      { text: 'The three Cl⁻ ions represent primary valence (freely ionizable, not directly bonded to cobalt), while the six NH₃ molecules represent secondary valence (coordination number, tightly bound via coordinate bonds directly to cobalt)', isCorrect: true },
      { text: 'This is inconsistent behavior — all species attached to a metal complex should behave identically in solution', isCorrect: false, misconceptionId: `${WERNER}:MC1` },
    ],
    correctValue: 'Distinguishes primary valence (Cl⁻) from secondary valence (NH₃)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${WERNER}:MC1`],
    source: `${WERNER_SRC} — distractor targets expecting uniform behavior from all attached species`,
  },
  {
    conceptId: WERNER,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Was Werner\'s coordination theory merely a description that fit already-known facts, with no genuine predictive power?',
    choices: [
      { text: 'No — Werner correctly predicted the octahedral geometry for 6-coordinate complexes using isomer-counting logic, years before X-ray crystallography existed to directly verify 3D structures — a genuine, falsifiable prediction later confirmed', isCorrect: true },
      { text: 'Yes — Werner\'s theory only explained observations that were already fully understood, without making any new testable predictions', isCorrect: false, misconceptionId: `${WERNER}:MC2` },
    ],
    correctValue: 'No — Werner made a genuine, later-confirmed prediction',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${WERNER}:MC2`],
    source: `${WERNER_SRC} — misconception: Werner's theory was purely descriptive with no predictive value`,
  },
]

// ─── chem.coord.nomenclature ─────────────────────────────────────────────────
const COORDNOM = 'chem.coord.nomenclature'
const COORDNOM_SRC = 'docs/chemistry/kg/graph.json — chem.coord.nomenclature'

const COORDNOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COORDNOM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Naming coordination complexes follows systematic IUPAC rules, similar in spirit to ' +
      'organic nomenclature but with its own conventions. Key rules: (1) List LIGANDS ' +
      'ALPHABETICALLY (by ligand name, ignoring any multiplying prefix) BEFORE the metal ' +
      'name. (2) Use MULTIPLYING PREFIXES for ligand count: di-/tri-/tetra- for SIMPLE ' +
      'ligands (like chloro, ammine), but bis-/tris-/tetrakis- for COMPLEX ligand names ' +
      'that already contain a prefix-like syllable or are themselves polysyllabic ' +
      '(like ethylenediamine — "bis(ethylenediamine)" avoids the ambiguous ' +
      '"diethylenediamine," which could be misread). (3) ANIONIC ligands end in "-o" ' +
      '(chloro for Cl⁻, cyano for CN⁻, hydroxo for OH⁻); NEUTRAL ligands mostly keep their ' +
      'molecular name (with exceptions: aqua for H₂O, ammine for NH₃, carbonyl for CO). ' +
      '(4) If the OVERALL complex ion is ANIONIC (negative charge), the metal name gets ' +
      'the SUFFIX "-ate" (ferrate, cuprate — sometimes using the Latin root instead of the ' +
      'English element name). (5) The metal\'s OXIDATION STATE is given in Roman numerals ' +
      'in parentheses immediately after the metal name.',
    targetedMisconceptions: [`${COORDNOM}:MC1`],
    source: `${COORDNOM_SRC} — coordination complex nomenclature rules, ligand naming, oxidation state notation`,
  },
  {
    conceptId: COORDNOM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Always use di-/tri-/tetra- as multiplying prefixes for ligand count, ' +
      'regardless of the ligand\'s name complexity." FALSE — for ligands whose names ' +
      'already contain syllables resembling multiplying prefixes, or that are themselves ' +
      'complex/polysyllabic (like ethylenediamine, or any ligand name in parentheses), you ' +
      'MUST use bis-/tris-/tetrakis- instead, specifically to avoid ambiguity. ' +
      '"Diethylenediamine" would be confusingly ambiguous (does "di" apply to ' +
      '"ethylenediamine" as a whole, or is it part of a different, unrelated ligand name?) ' +
      '— "bis(ethylenediamine)" with parentheses removes all doubt. Second trap: "The ' +
      'complex ion\'s charge and the metal\'s oxidation state are always the same number, ' +
      'interchangeable in naming." Not necessarily identical numerically — the OXIDATION ' +
      'STATE (Roman numeral, describing just the metal\'s formal charge) and the overall ' +
      'COMPLEX ION CHARGE (describing the entire assembly of metal + ligands) are related ' +
      'but distinct quantities — you calculate one from the other using the sum of ligand ' +
      'charges, they don\'t automatically match unless all ligands happen to be neutral.',
    targetedMisconceptions: [`${COORDNOM}:MC1`, `${COORDNOM}:MC2`],
    source: `${COORDNOM_SRC} — misconception: always use simple di-/tri- prefixes; oxidation state equals complex charge`,
  },
]

const COORDNOM_PROBES: SeedProbe[] = [
  {
    conceptId: COORDNOM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A complex contains two ethylenediamine ligands. Should this be named "diethylenediamine" or "bis(ethylenediamine)"?',
    choices: [
      { text: 'bis(ethylenediamine) — since ethylenediamine is a complex/polysyllabic ligand name, the bis- prefix with parentheses is required to avoid the ambiguity that "diethylenediamine" would create', isCorrect: true },
      { text: 'diethylenediamine — di-/tri-/tetra- prefixes are always used regardless of ligand name complexity', isCorrect: false, misconceptionId: `${COORDNOM}:MC1` },
    ],
    correctValue: 'bis(ethylenediamine)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COORDNOM}:MC1`],
    source: `${COORDNOM_SRC} — distractor targets using simple prefixes universally regardless of ligand name complexity`,
  },
  {
    conceptId: COORDNOM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In [Co(NH₃)₄Cl₂]⁺, is the overall complex ion charge (+1) automatically the same number as cobalt\'s oxidation state?',
    choices: [
      { text: 'No — cobalt\'s oxidation state here is +3 (calculated from: +1 overall charge = Co oxidation state + 4(0, neutral NH₃) + 2(−1, each Cl⁻), so Co = +1+2 = +3), distinct from the complex\'s overall +1 charge', isCorrect: true },
      { text: 'Yes — the overall complex charge and the metal\'s oxidation state are always numerically identical', isCorrect: false, misconceptionId: `${COORDNOM}:MC2` },
    ],
    correctValue: 'No — Co oxidation state (+3) differs from overall complex charge (+1)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COORDNOM}:MC2`],
    source: `${COORDNOM_SRC} — misconception: conflating overall complex charge with the metal's oxidation state`,
  },
]

// ─── chem.org.hybridization ──────────────────────────────────────────────────
const ORGHYB = 'chem.org.hybridization'
const ORGHYB_SRC = 'docs/chemistry/kg/graph.json — chem.org.hybridization'

const ORGHYB_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ORGHYB,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Building on the general hybridization concept: in organic chemistry, carbon\'s ' +
      'hybridization state DIRECTLY determines a molecule\'s geometry, bond angles, and ' +
      'reactivity pattern. sp³ CARBON (4 single bonds, tetrahedral, 109.5°) is found in ' +
      'ALKANES (saturated hydrocarbons) — relatively unreactive, undergoes substitution ' +
      'reactions. sp² CARBON (1 double bond + 2 single bonds, trigonal planar, 120°) is ' +
      'found in ALKENES — the flat geometry and exposed π-electron cloud makes double ' +
      'bonds significantly more reactive, readily undergoing ADDITION reactions (breaking ' +
      'the weaker π bond while keeping the σ bond intact). sp CARBON (1 triple bond OR 2 ' +
      'double bonds, linear, 180°) is found in ALKYNES — even MORE reactive due to two ' +
      'exposed π bonds. A useful shortcut: count the GROUPS attached to a carbon (via ' +
      'single, double, or triple bonds, treating each multiple bond as ONE group for this ' +
      'purpose) — 4 groups = sp³, 3 groups = sp², 2 groups = sp — directly matching the ' +
      'VSEPR electron-domain-counting logic covered earlier, just applied specifically to ' +
      'carbon-centered organic structures.',
    targetedMisconceptions: [`${ORGHYB}:MC1`],
    source: `${ORGHYB_SRC} — carbon hybridization in alkanes/alkenes/alkynes, geometry-reactivity connection`,
  },
  {
    conceptId: ORGHYB,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "A carbon with a double bond must be sp hybridized, since double bonds seem ' +
      'more "special"/higher-energy than single bonds." FALSE — a carbon with exactly ONE ' +
      'double bond (plus two single bonds, like in ethene\'s CH₂=CH₂) is sp² hybridized, ' +
      'NOT sp. sp hybridization requires either a TRIPLE bond (one σ + two π, as in ' +
      'ethyne HC≡CH) or TWO SEPARATE double bonds on the same carbon (as in an allene, ' +
      'CH₂=C=CH₂, the central carbon). The rule is about counting total attached GROUPS, ' +
      'not simply "does a double bond exist somewhere." Second trap: "All carbons in a ' +
      'molecule must share the SAME hybridization state." FALSE — different carbons ' +
      'within the SAME molecule can have DIFFERENT hybridizations depending on their ' +
      'individual local bonding environment. For example, in CH₂=CH-CH₃ (propene), the ' +
      'two double-bonded carbons are sp², while the terminal CH₃ carbon (all single bonds) ' +
      'is sp³ — hybridization is assessed PER CARBON, not for the whole molecule at once.',
    targetedMisconceptions: [`${ORGHYB}:MC1`, `${ORGHYB}:MC2`],
    source: `${ORGHYB_SRC} — misconception: any double bond means sp hybridization; all carbons in a molecule share one hybridization`,
  },
]

const ORGHYB_PROBES: SeedProbe[] = [
  {
    conceptId: ORGHYB,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'What is the hybridization of the carbon atoms in ethene (CH₂=CH₂), which has one double bond per carbon?',
    choices: [
      { text: 'sp² — each carbon has 3 attached groups (2 H atoms + 1 double-bonded C, counting the double bond as one group), giving trigonal planar geometry', isCorrect: true },
      { text: 'sp — any carbon involved in a double bond is automatically sp hybridized', isCorrect: false, misconceptionId: `${ORGHYB}:MC1` },
    ],
    correctValue: 'sp²',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ORGHYB}:MC1`],
    source: `${ORGHYB_SRC} — distractor targets assuming any double bond implies sp hybridization`,
  },
  {
    conceptId: ORGHYB,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In propene (CH₂=CH-CH₃), do all three carbon atoms share the exact same hybridization state?',
    choices: [
      { text: 'No — the two double-bonded carbons (CH₂= and =CH-) are sp² hybridized, while the terminal methyl carbon (-CH₃, all single bonds) is sp³ hybridized; hybridization is assessed per carbon based on its local bonding', isCorrect: true },
      { text: 'Yes — every carbon in a single molecule must share the same overall hybridization state', isCorrect: false, misconceptionId: `${ORGHYB}:MC2` },
    ],
    correctValue: 'No — different carbons can have different hybridizations within one molecule',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORGHYB}:MC2`],
    source: `${ORGHYB_SRC} — misconception: assuming molecule-wide uniform hybridization rather than per-carbon assessment`,
  },
]

// ─── chem.hyd.alkanes ─────────────────────────────────────────────────────────
const ALKANE = 'chem.hyd.alkanes'
const ALKANE_SRC = 'docs/chemistry/kg/graph.json — chem.hyd.alkanes'

const ALKANE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALKANE,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Alkanes (general formula CₙH₂ₙ₊₂) are SATURATED hydrocarbons — every carbon is sp³ ' +
      'hybridized with 4 single bonds, "saturated" meaning no more hydrogen could possibly ' +
      'be added (maximum hydrogen content for that carbon skeleton). Being made entirely ' +
      'of strong, nonpolar C-C and C-H σ bonds, alkanes are RELATIVELY UNREACTIVE — they ' +
      'don\'t readily undergo addition reactions (no π bond to attack) and resist most ' +
      'common reagents. Their main reactions are COMBUSTION (burning completely in excess ' +
      'oxygen: CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + energy — the basis of most fossil fuel energy) and ' +
      'FREE RADICAL HALOGENATION (reaction with Cl₂/Br₂ under UV light, via a chain ' +
      'mechanism: initiation, propagation, termination — substituting one H for a halogen ' +
      'atom). Physical properties follow chain length predictably: boiling point INCREASES ' +
      'with chain length (more surface area for London dispersion forces, the ONLY ' +
      'intermolecular force present, since alkanes are nonpolar). BRANCHING decreases ' +
      'boiling point (a more compact, spherical shape has LESS surface contact area between ' +
      'molecules than a long straight chain, weakening the dispersion forces).',
    targetedMisconceptions: [`${ALKANE}:MC1`],
    source: `${ALKANE_SRC} — alkane structure/saturation, combustion, free radical halogenation, boiling point trends`,
  },
  {
    conceptId: ALKANE,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Branching should INCREASE an alkane\'s boiling point, since more branches ' +
      'means a bigger, heavier molecule with more atoms." FALSE — for ISOMERS (same ' +
      'molecular formula, same total number of atoms), branching DECREASES boiling point, ' +
      'not increases it. This is because branching makes the molecule\'s shape more ' +
      'COMPACT/spherical rather than long and straight — and spherical shapes have LESS ' +
      'surface-to-surface contact area between neighboring molecules than elongated ' +
      'shapes, which weakens the (already weak) London dispersion forces holding molecules ' +
      'together. n-pentane (straight chain, bp 36°C) boils higher than neopentane (highly ' +
      'branched, same formula C₅H₁₂, bp 9.5°C) — SAME number of atoms, dramatically ' +
      'different boiling point purely from shape/surface-area differences. Second trap: ' +
      '"Alkanes are completely unreactive, essentially inert like noble gases." FALSE — ' +
      'they combust readily (releasing enormous energy, which is precisely why they\'re ' +
      'used as fuels) and undergo free radical halogenation — "relatively unreactive under ' +
      'MILD conditions" is more accurate than "completely inert."',
    targetedMisconceptions: [`${ALKANE}:MC1`, `${ALKANE}:MC2`],
    source: `${ALKANE_SRC} — misconception: branching increases boiling point; alkanes are completely inert`,
  },
]

const ALKANE_PROBES: SeedProbe[] = [
  {
    conceptId: ALKANE,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'n-pentane (straight chain, C₅H₁₂) has a higher boiling point (36°C) than neopentane (highly branched, also C₅H₁₂, bp 9.5°C). Why, given they have the same molecular formula?',
    choices: [
      { text: 'Branching makes neopentane more compact/spherical, reducing surface contact area between molecules and weakening the London dispersion forces compared to the elongated straight-chain n-pentane', isCorrect: true },
      { text: 'This must be an error — since both have the same formula (same mass), they should have identical boiling points', isCorrect: false, misconceptionId: `${ALKANE}:MC1` },
    ],
    correctValue: 'Branching reduces surface area, weakening dispersion forces',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ALKANE}:MC1`],
    source: `${ALKANE_SRC} — distractor targets assuming same formula must mean same boiling point`,
  },
  {
    conceptId: ALKANE,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Alkanes are described as "relatively unreactive." Does this mean alkanes never undergo any chemical reactions at all?',
    choices: [
      { text: 'No — alkanes readily undergo combustion (releasing large amounts of energy, the basis for fossil fuel use) and free radical halogenation under UV light; "relatively unreactive" refers to resistance under mild conditions, not complete inertness', isCorrect: true },
      { text: 'Yes — alkanes are essentially completely inert, like noble gases, and undergo no meaningful chemical reactions', isCorrect: false, misconceptionId: `${ALKANE}:MC2` },
    ],
    correctValue: 'No — alkanes combust and undergo radical halogenation',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${ALKANE}:MC2`],
    source: `${ALKANE_SRC} — misconception: alkanes are completely chemically inert`,
  },
]

// ─── chem.org.isomerism ──────────────────────────────────────────────────────
const ISOM = 'chem.org.isomerism'
const ISOM_SRC = 'docs/chemistry/kg/graph.json — chem.org.isomerism'

const ISOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ISOM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Isomers share the SAME molecular formula but different structures — same "parts ' +
      'list," different "assembly." Two major categories: STRUCTURAL (constitutional) ' +
      'isomers differ in how atoms are CONNECTED (different bonding pattern entirely) — ' +
      'chain isomers (different carbon skeleton branching, like n-butane vs. isobutane), ' +
      'position isomers (same skeleton, functional group at a different position, like ' +
      '1-propanol vs. 2-propanol), and functional group isomers (same formula, entirely ' +
      'DIFFERENT functional group, like ethanol C₂H₆O vs. dimethyl ether C₂H₆O — an ' +
      'alcohol and an ether with identical formula!). STEREOISOMERS have the SAME ' +
      'connectivity but different 3D SPATIAL arrangement — GEOMETRIC (cis/trans, arising ' +
      'from restricted rotation around double bonds, as covered in hybridization) and ' +
      'OPTICAL isomers (non-superimposable mirror images, called ENANTIOMERS, arising from ' +
      'a CHIRAL center — typically a carbon bonded to 4 DIFFERENT groups). Optical isomers ' +
      'have IDENTICAL physical properties (melting point, boiling point, density) except ' +
      'for how they rotate plane-polarized light (one rotates it clockwise/+, the mirror ' +
      'image rotates it counterclockwise/− by the exact same amount) — this subtle ' +
      'difference is CRUCIAL in biology/pharmacology, since enzymes are themselves chiral ' +
      'and often interact very differently with each enantiomer.',
    targetedMisconceptions: [`${ISOM}:MC1`],
    source: `${ISOM_SRC} — structural isomerism types, stereoisomerism (geometric/optical), chirality`,
  },
  {
    conceptId: ISOM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Enantiomers (optical isomers/mirror images) are essentially identical ' +
      'compounds with no real practical difference, since they have the same physical ' +
      'properties (melting point, density, etc)." DANGEROUSLY FALSE in biological contexts ' +
      '— while their bulk physical properties ARE identical, enantiomers can have WILDLY ' +
      'different BIOLOGICAL effects, because biological receptors/enzymes are themselves ' +
      'chiral and interact differently with each mirror-image form (like a right hand only ' +
      'fitting comfortably into a right-handed glove, not a left one). The most notorious ' +
      'historical example: thalidomide — one enantiomer was an effective sedative, while ' +
      'the OTHER enantiomer caused severe birth defects. This real, tragic case is exactly ' +
      'why modern pharmaceutical development must carefully test and often isolate ' +
      'individual enantiomers, not just "the compound" generically. Second trap: "Cis/trans ' +
      'isomers and optical isomers (enantiomers) are basically the same phenomenon, just ' +
      'different names." FALSE — they arise from fundamentally different structural causes: ' +
      'cis/trans comes from restricted ROTATION around a double bond (or ring), while ' +
      'optical isomerism comes from a CHIRAL CENTER (asymmetric carbon) creating ' +
      'non-superimposable mirror images — different mechanisms, different consequences.',
    targetedMisconceptions: [`${ISOM}:MC1`, `${ISOM}:MC2`],
    source: `${ISOM_SRC} — misconception: enantiomers have no practical difference; cis-trans and optical isomerism are equivalent`,
  },
]

const ISOM_PROBES: SeedProbe[] = [
  {
    conceptId: ISOM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Two enantiomers of a drug have identical melting points, boiling points, and densities. Does this mean they will have identical effects when taken by a patient?',
    choices: [
      { text: 'Not necessarily — biological receptors and enzymes are chiral and can interact very differently with each enantiomer, potentially causing dramatically different biological effects (as tragically demonstrated by thalidomide)', isCorrect: true },
      { text: 'Yes — since their physical properties are identical, their biological effects must also be identical', isCorrect: false, misconceptionId: `${ISOM}:MC1` },
    ],
    correctValue: 'Not necessarily — biological effects can differ dramatically',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ISOM}:MC1`],
    source: `${ISOM_SRC} — distractor targets assuming identical physical properties implies identical biological effects`,
  },
  {
    conceptId: ISOM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Are cis/trans isomerism and optical isomerism (enantiomers) caused by the same underlying structural feature?',
    choices: [
      { text: 'No — cis/trans isomerism arises from restricted rotation around a double bond (or ring), while optical isomerism arises from a chiral center (asymmetric carbon bonded to four different groups) — fundamentally different mechanisms', isCorrect: true },
      { text: 'Yes — both are simply different names for the same general phenomenon of stereoisomerism with no meaningful structural distinction', isCorrect: false, misconceptionId: `${ISOM}:MC2` },
    ],
    correctValue: 'No — different structural origins (double bond restriction vs. chirality)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ISOM}:MC2`],
    source: `${ISOM_SRC} — misconception: conflating cis-trans and optical isomerism as the same phenomenon`,
  },
]

// ─── chem.org.electronic-effects ─────────────────────────────────────────────
const ELECEFF = 'chem.org.electronic-effects'
const ELECEFF_SRC = 'docs/chemistry/kg/graph.json — chem.org.electronic-effects'

const ELECEFF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ELECEFF,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Organic reactivity is heavily shaped by how electron density shifts through a ' +
      'molecule\'s bonds. INDUCTIVE EFFECT: electron density shifts through σ (single) ' +
      'bonds due to electronegativity differences — a strongly electronegative atom (like ' +
      'Cl in chloroacetic acid) PULLS electron density toward itself through the bond ' +
      'chain (−I, electron-withdrawing), while electropositive groups PUSH electron ' +
      'density away (+I, electron-donating, like alkyl groups). This effect WEAKENS ' +
      'rapidly with distance (roughly halving every carbon away) since it works only ' +
      'through direct bond-to-bond transmission. MESOMERIC (RESONANCE) EFFECT: electron ' +
      'density shifts through π (multiple bond/conjugated) systems via delocalization — ' +
      'groups that DONATE electron density into a π system are +M (like -NH₂, -OH ' +
      'attached to a benzene ring, using their lone pair), while groups that WITHDRAW ' +
      'electron density from a π system are −M (like -NO₂, -C=O, pulling density away via ' +
      'resonance). Unlike the inductive effect, mesomeric effects DON\'T weaken with ' +
      'distance in the same way — they operate through the WHOLE conjugated system ' +
      'uniformly, following the resonance structures. Both effects work TOGETHER (and ' +
      'sometimes in OPPOSING directions for the same substituent) to determine overall ' +
      'reactivity and acidity/basicity.',
    targetedMisconceptions: [`${ELECEFF}:MC1`],
    source: `${ELECEFF_SRC} — inductive effect (σ, distance-dependent) vs mesomeric/resonance effect (π, delocalized)`,
  },
  {
    conceptId: ELECEFF,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "The inductive and mesomeric effects always point in the SAME direction for ' +
      'any given substituent, reinforcing each other." FALSE for several important groups ' +
      '— the halogens (like -Cl attached to benzene) show a CLASSIC conflict: inductively, ' +
      'Cl is electronegative and WITHDRAWS electron density (−I effect, as expected). But ' +
      'mesomerically, Cl has lone pairs that can DONATE into the aromatic π system (+M ' +
      'effect, via resonance) — the SAME atom pulling one way inductively while pushing ' +
      'the other way mesomerically! For halogens on benzene, the +M effect typically ' +
      'dominates for directing WHERE further reactions occur (ortho/para-directing), even ' +
      'though the −I effect makes the ring overall slightly less reactive than unsubstituted ' +
      'benzene — these are two SEPARATE questions (directing effect vs. overall ' +
      'reactivity) that can have different answers. Second trap: "Inductive effects, being ' +
      'through σ bonds, extend indefinitely with full strength throughout a molecule, no ' +
      'matter how far." FALSE — inductive effects weaken RAPIDLY with distance (roughly ' +
      'halving with each additional bond away from the electronegative group), becoming ' +
      'essentially negligible beyond 2-3 bonds — this distance-decay is a KEY ' +
      'distinguishing feature from the mesomeric effect, which doesn\'t decay the same way ' +
      'within a conjugated system.',
    targetedMisconceptions: [`${ELECEFF}:MC1`, `${ELECEFF}:MC2`],
    source: `${ELECEFF_SRC} — misconception: inductive/mesomeric always align; inductive effect has no distance decay`,
  },
]

const ELECEFF_PROBES: SeedProbe[] = [
  {
    conceptId: ELECEFF,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Chlorine attached to a benzene ring shows a −I (inductive, electron-withdrawing) effect but a +M (mesomeric, electron-donating) effect. Can the same substituent have effects pointing in opposite directions?',
    choices: [
      { text: 'Yes — chlorine is electronegative (withdraws density inductively through σ bonds) but also has lone pairs that can donate into the π system via resonance (+M); these are genuinely different mechanisms that can conflict for the same atom', isCorrect: true },
      { text: 'No — a single substituent must have inductive and mesomeric effects that always point in the same, consistent direction', isCorrect: false, misconceptionId: `${ELECEFF}:MC1` },
    ],
    correctValue: 'Yes — the two effects can genuinely conflict',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${ELECEFF}:MC1`],
    source: `${ELECEFF_SRC} — distractor targets assuming inductive and mesomeric effects must always align`,
  },
  {
    conceptId: ELECEFF,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does the inductive effect of an electronegative substituent remain at full strength no matter how many carbons away you measure it in a chain?',
    choices: [
      { text: 'No — the inductive effect weakens rapidly with distance (roughly halving with each additional bond), becoming essentially negligible beyond 2-3 bonds from the electronegative group', isCorrect: true },
      { text: 'Yes — inductive effects transmit through σ bonds at full, undiminished strength regardless of distance from the source', isCorrect: false, misconceptionId: `${ELECEFF}:MC2` },
    ],
    correctValue: 'No — inductive effect decays rapidly with distance',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ELECEFF}:MC2`],
    source: `${ELECEFF_SRC} — misconception: inductive effect has no distance dependence`,
  },
]

// ─── chem.org.aromaticity ────────────────────────────────────────────────────
const AROM = 'chem.org.aromaticity'
const AROM_SRC = 'docs/chemistry/kg/graph.json — chem.org.aromaticity'

const AROM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: AROM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Benzene (C₆H₆) puzzled chemists for decades — its structure seemed like it should ' +
      'behave like a highly reactive triene (3 alternating double bonds), but it\'s ' +
      'actually remarkably UNREACTIVE and stable (resists addition reactions that normal ' +
      'alkenes undergo easily). The resolution: benzene isn\'t really alternating single ' +
      'and double bonds at all — it\'s a RESONANCE HYBRID (as covered earlier) where all 6 ' +
      'C-C bonds are IDENTICAL (bond length exactly between single and double), with 6 ' +
      'delocalized π electrons spread evenly around the entire ring in a continuous ' +
      'electron cloud above and below the ring plane. HÜCKEL\'S RULE formalizes when a ' +
      'planar, fully conjugated ring gains this special "aromatic" stability: it must have ' +
      '4n+2 π electrons (n = 0,1,2...) — giving 2, 6, 10, 14... So benzene\'s 6 π electrons ' +
      '(n=1) qualifies. This extra stability (called RESONANCE/DELOCALIZATION ENERGY, ' +
      'roughly 150 kJ/mol more stable than a hypothetical non-delocalized "cyclohexatriene") ' +
      'is WHY benzene prefers SUBSTITUTION reactions (replacing one H, preserving the ' +
      'stable ring) over ADDITION reactions (which would destroy the aromatic system) — ' +
      'the opposite reactivity pattern from ordinary alkenes.',
    targetedMisconceptions: [`${AROM}:MC1`],
    source: `${AROM_SRC} — benzene structure, resonance hybrid, Hückel's rule (4n+2), substitution vs addition preference`,
  },
  {
    conceptId: AROM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Benzene genuinely HAS alternating single and double bonds, just like the ' +
      'simplified structure drawn in textbooks — three C=C double bonds and three C-C ' +
      'single bonds fixed in specific positions." FALSE — as established with resonance ' +
      'earlier, this drawing is a NOTATIONAL CONVENIENCE, not the true structure. The real ' +
      'molecule has all 6 bonds EXACTLY IDENTICAL (measured bond length 139 pm, precisely ' +
      'intermediate between typical single ~154pm and double ~134pm bonds) — there is NO ' +
      'alternation in the actual physical structure; it\'s a single delocalized system, ' +
      'often more accurately drawn as a hexagon with a circle inside representing the ' +
      'delocalized π cloud. Second trap: "Any ring with alternating double bonds ' +
      'automatically qualifies as aromatic and gains extra stability." FALSE — you must ' +
      'satisfy ALL of Hückel\'s criteria: the ring must be PLANAR (allowing p-orbital ' +
      'overlap), fully CONJUGATED (continuous ring of p orbitals, no sp³ carbons breaking ' +
      'the cycle), AND have exactly 4n+2 π electrons. Cyclobutadiene (4 π electrons, which ' +
      'is 4n with n=1, NOT 4n+2) is actually ANTIAROMATIC — destabilized rather than ' +
      'stabilized, despite superficially "looking" similar to benzene with alternating ' +
      'double bonds.',
    targetedMisconceptions: [`${AROM}:MC1`, `${AROM}:MC2`],
    source: `${AROM_SRC} — misconception: benzene has literal alternating bonds; any conjugated ring is automatically aromatic`,
  },
]

const AROM_PROBES: SeedProbe[] = [
  {
    conceptId: AROM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'X-ray crystallography shows all six C-C bonds in benzene have IDENTICAL length (139 pm), intermediate between typical single and double bond lengths. What does this tell you about benzene\'s true structure?',
    choices: [
      { text: 'Benzene is a resonance hybrid with 6 delocalized π electrons spread evenly around the ring — it does NOT literally have alternating single and double bonds as sometimes drawn for convenience', isCorrect: true },
      { text: 'This is a measurement artifact — benzene genuinely has three distinct double bonds and three distinct single bonds, just measured with imprecise instruments', isCorrect: false, misconceptionId: `${AROM}:MC1` },
    ],
    correctValue: 'Benzene has a delocalized, non-alternating structure',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${AROM}:MC1`],
    source: `${AROM_SRC} — distractor targets insisting on literal alternating bonds despite structural evidence`,
  },
  {
    conceptId: AROM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Cyclobutadiene has a ring with alternating double bonds, similar in appearance to benzene, but has only 4 π electrons (not 6). Is cyclobutadiene aromatic and extra-stable like benzene?',
    choices: [
      { text: 'No — 4 π electrons corresponds to 4n (n=1), not 4n+2, failing Hückel\'s rule; cyclobutadiene is actually ANTIAROMATIC (destabilized), despite superficially resembling benzene\'s alternating-bond appearance', isCorrect: true },
      { text: 'Yes — any planar ring with alternating double bonds automatically qualifies as aromatic and gains extra stability, regardless of electron count', isCorrect: false, misconceptionId: `${AROM}:MC2` },
    ],
    correctValue: 'No — cyclobutadiene is antiaromatic (fails Hückel\'s rule)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${AROM}:MC2`],
    source: `${AROM_SRC} — misconception: superficial resemblance to benzene guarantees aromaticity`,
  },
]

// ─── chem.bond.intermolecular ────────────────────────────────────────────────
const IMF = 'chem.bond.intermolecular'
const IMF_SRC = 'docs/chemistry/kg/graph.json — chem.bond.intermolecular'

const IMF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IMF,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Intermolecular forces (IMFs) are the WEAK attractions BETWEEN separate molecules ' +
      '(as distinguished from the strong covalent bonds WITHIN a molecule, covered ' +
      'earlier). Three main types, in increasing strength: LONDON DISPERSION (present in ' +
      'ALL molecules, even nonpolar ones — temporary fluctuating electron distributions ' +
      'create momentary dipoles that induce matching dipoles in neighbors; STRENGTH ' +
      'increases with molecular size/more electrons, since bigger electron clouds ' +
      'fluctuate more). DIPOLE-DIPOLE (only in POLAR molecules — permanent partial charges ' +
      'attract oppositely-charged ends of neighboring molecules, as covered in polar ' +
      'molecules). HYDROGEN BONDING (a SPECIAL, particularly strong case of dipole-dipole, ' +
      'requiring H bonded DIRECTLY to N, O, or F — these small, highly electronegative ' +
      'atoms create an unusually concentrated, nearly-bare positive charge on the tiny ' +
      'hydrogen, allowing exceptionally strong attraction to a lone pair on a neighboring ' +
      'N/O/F). Hydrogen bonding explains water\'s anomalously high boiling point (100°C, ' +
      'vs. the much lower boiling points of similarly-sized molecules like H₂S, which lacks ' +
      'H-bonding) and ice\'s unusual property of being LESS dense than liquid water (the ' +
      'rigid hydrogen-bonded lattice in ice holds molecules farther apart than the more ' +
      'randomly-packed liquid).',
    targetedMisconceptions: [`${IMF}:MC1`],
    source: `${IMF_SRC} — London dispersion, dipole-dipole, hydrogen bonding, water anomalies`,
  },
  {
    conceptId: IMF,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "London dispersion forces are negligibly weak and don\'t matter much compared ' +
      'to dipole-dipole or hydrogen bonding — only polar molecules have meaningful ' +
      'intermolecular attraction." FALSE — while London forces ARE the weakest force ' +
      '(per-interaction), they can become DOMINANT for large molecules with many ' +
      'electrons. Iodine (I₂, nonpolar, only London forces) is a SOLID at room temperature, ' +
      'while HCl (polar, has dipole-dipole PLUS London forces, but far fewer electrons) is ' +
      'a GAS — the sheer number of electrons in I₂\'s large, polarizable electron cloud ' +
      'gives it stronger overall intermolecular attraction than the smaller polar HCl ' +
      'molecule, despite HCl having the "extra" dipole-dipole contribution. Molecular SIZE ' +
      'can outweigh polarity type. Second trap: "Any molecule containing H, N, O, or F ' +
      'atoms exhibits hydrogen bonding." FALSE — hydrogen bonding REQUIRES H bonded ' +
      'DIRECTLY to N, O, or F (not merely present somewhere in the molecule). CH₃F ' +
      '(fluoromethane) does NOT hydrogen bond significantly, because its hydrogens are ' +
      'bonded to CARBON, not directly to the fluorine — the fluorine itself can still ' +
      'accept a hydrogen bond FROM another molecule\'s O-H or N-H, but CH₃F\'s own hydrogens ' +
      'can\'t DONATE one, since they\'re attached to carbon, a much less electronegative ' +
      'atom.',
    targetedMisconceptions: [`${IMF}:MC1`, `${IMF}:MC2`],
    source: `${IMF_SRC} — misconception: London forces are always negligible; presence of H/N/O/F alone implies hydrogen bonding`,
  },
]

const IMF_PROBES: SeedProbe[] = [
  {
    conceptId: IMF,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Iodine (I₂, nonpolar) is a solid at room temperature, while HCl (polar) is a gas. Since HCl has dipole-dipole forces AND I₂ has only weaker London dispersion forces, why does I₂ have the higher effective intermolecular attraction?',
    choices: [
      { text: 'I₂\'s much larger, more polarizable electron cloud (many more electrons than HCl) gives it stronger London dispersion forces overall, outweighing HCl\'s smaller size despite HCl having the additional dipole-dipole contribution', isCorrect: true },
      { text: 'This is impossible — polar molecules must always have stronger intermolecular forces than nonpolar molecules, regardless of size', isCorrect: false, misconceptionId: `${IMF}:MC1` },
    ],
    correctValue: 'Molecular size/electron count can outweigh polarity type',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${IMF}:MC1`],
    source: `${IMF_SRC} — distractor targets assuming polar always beats nonpolar in intermolecular force strength`,
  },
  {
    conceptId: IMF,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'CH₃F contains both carbon-bonded hydrogens and a fluorine atom. Does CH₃F exhibit hydrogen bonding as a hydrogen bond DONOR (using its own hydrogens)?',
    choices: [
      { text: 'No — hydrogen bonding as a donor requires H bonded DIRECTLY to N, O, or F; CH₃F\'s hydrogens are bonded to carbon, not fluorine, so they cannot donate a hydrogen bond, even though the fluorine could still ACCEPT one from another molecule', isCorrect: true },
      { text: 'Yes — since the molecule contains both hydrogen and fluorine atoms somewhere, it automatically exhibits full hydrogen bonding behavior as both donor and acceptor', isCorrect: false, misconceptionId: `${IMF}:MC2` },
    ],
    correctValue: 'No — H must be directly bonded to N/O/F to donate a hydrogen bond',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${IMF}:MC2`],
    source: `${IMF_SRC} — misconception: mere presence of H and F anywhere in the molecule implies hydrogen bonding`,
  },
]

// ─── chem.org.spectroscopy ───────────────────────────────────────────────────
const ORGSPEC = 'chem.org.spectroscopy'
const ORGSPEC_SRC = 'docs/chemistry/kg/graph.json — chem.org.spectroscopy'

const ORGSPEC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ORGSPEC,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Spectroscopy identifies molecular structure by studying how molecules interact ' +
      'with electromagnetic radiation (building on the electromagnetic radiation and ' +
      'atomic spectra concepts covered earlier, now applied to WHOLE MOLECULES rather ' +
      'than isolated atoms). Three key organic techniques: IR (INFRARED) SPECTROSCOPY ' +
      'detects BOND VIBRATIONS — specific functional groups absorb IR radiation at ' +
      'CHARACTERISTIC frequencies as their bonds stretch/bend (O-H ~3200-3550 cm⁻¹, broad; ' +
      'C=O ~1700 cm⁻¹, sharp; C≡C/C≡N ~2100-2260 cm⁻¹) — this identifies WHICH functional ' +
      'groups are present, like a molecular fingerprint. NMR (NUCLEAR MAGNETIC RESONANCE) ' +
      'detects the magnetic environment of specific nuclei (usually ¹H or ¹³C) — different ' +
      'CHEMICAL ENVIRONMENTS (how shielded/deshielded a nucleus is by nearby electron ' +
      'density) give different CHEMICAL SHIFTS, revealing the molecule\'s CONNECTIVITY and ' +
      'symmetry (how many distinct types of hydrogen/carbon exist, and their relative ' +
      'ratios via integration/peak splitting). MASS SPECTROMETRY fragments the molecule ' +
      'and measures the mass-to-charge ratio of resulting pieces, revealing the MOLECULAR ' +
      'MASS (from the parent/molecular ion peak) and structural clues from characteristic ' +
      'fragmentation patterns. Together, these three techniques let chemists deduce a ' +
      'complete unknown structure without ever needing to grow crystals for X-ray analysis.',
    targetedMisconceptions: [`${ORGSPEC}:MC1`],
    source: `${ORGSPEC_SRC} — IR spectroscopy (functional groups), NMR (connectivity), mass spectrometry (mass/fragments)`,
  },
  {
    conceptId: ORGSPEC,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "IR spectroscopy tells you the exact, complete structure of an unknown ' +
      'molecule by itself." FALSE — IR primarily reveals WHICH FUNCTIONAL GROUPS are ' +
      'present (a carbonyl? an O-H? a nitrile?), but does NOT directly tell you how those ' +
      'groups are CONNECTED to the rest of the molecule, or the overall carbon skeleton. ' +
      'For that, you typically need NMR (connectivity information) and mass spectrometry ' +
      '(overall molecular mass and fragmentation pattern) as complementary techniques — ' +
      'real structure determination almost always COMBINES multiple spectroscopic methods, ' +
      'not relying on just one. Second trap: "A taller/more intense NMR peak always means ' +
      'a more IMPORTANT or chemically reactive type of hydrogen." FALSE — NMR peak INTENSITY ' +
      '(area/integration) is proportional to the NUMBER of equivalent hydrogens producing ' +
      'that peak, NOT their chemical importance or reactivity. A tall peak simply means ' +
      '"many hydrogens in this particular chemical environment" — like a CH₃ group\'s 3 ' +
      'equivalent hydrogens giving a proportionally larger peak than a single OH hydrogen, ' +
      'regardless of which is more chemically significant for the molecule\'s reactivity.',
    targetedMisconceptions: [`${ORGSPEC}:MC1`, `${ORGSPEC}:MC2`],
    source: `${ORGSPEC_SRC} — misconception: single technique gives complete structure; NMR peak height indicates chemical importance`,
  },
]

const ORGSPEC_PROBES: SeedProbe[] = [
  {
    conceptId: ORGSPEC,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'An IR spectrum shows a strong absorption at 1700 cm⁻¹ (indicating a C=O group is present). Can you determine the complete molecular structure from this IR data alone?',
    choices: [
      { text: 'No — IR primarily identifies which functional groups are present (here, a carbonyl), but not how they connect to the rest of the molecule; NMR and mass spectrometry are typically needed as complementary techniques for full structure determination', isCorrect: true },
      { text: 'Yes — a single IR spectrum provides complete structural information sufficient to fully determine any unknown molecule', isCorrect: false, misconceptionId: `${ORGSPEC}:MC1` },
    ],
    correctValue: 'No — IR alone is insufficient for complete structure determination',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORGSPEC}:MC1`],
    source: `${ORGSPEC_SRC} — distractor targets over-relying on a single spectroscopic technique`,
  },
  {
    conceptId: ORGSPEC,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In an NMR spectrum, a CH₃ group\'s peak is roughly three times taller than an adjacent OH peak. Does this mean the CH₃ hydrogens are more chemically important or reactive than the OH hydrogen?',
    choices: [
      { text: 'No — NMR peak intensity (integration) is proportional to the NUMBER of equivalent hydrogens producing that peak (3 for CH₃ vs. 1 for OH), not their chemical importance or reactivity', isCorrect: true },
      { text: 'Yes — a taller NMR peak always indicates a more chemically significant or reactive type of hydrogen in the molecule', isCorrect: false, misconceptionId: `${ORGSPEC}:MC2` },
    ],
    correctValue: 'No — peak height reflects hydrogen count, not importance',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${ORGSPEC}:MC2`],
    source: `${ORGSPEC_SRC} — misconception: NMR peak height indicates chemical significance rather than hydrogen count`,
  },
]

// ─── chem.org.purification ───────────────────────────────────────────────────
const PURIF = 'chem.org.purification'
const PURIF_SRC = 'docs/chemistry/kg/graph.json — chem.org.purification'

const PURIF_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PURIF,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Organic purification techniques exploit PHYSICAL PROPERTY DIFFERENCES between a ' +
      'desired compound and its impurities. DISTILLATION separates liquids by BOILING ' +
      'POINT differences (simple distillation for widely-different boiling points; ' +
      'fractional distillation, using a fractionating column with repeated ' +
      'vaporization-condensation cycles, for CLOSE boiling points that simple distillation ' +
      'can\'t cleanly separate). RECRYSTALLIZATION purifies SOLIDS by exploiting SOLUBILITY ' +
      'differences at different temperatures: dissolve the impure solid in a HOT solvent ' +
      '(where it\'s highly soluble), then cool SLOWLY — the desired compound crystallizes ' +
      'out in pure form as solubility drops with temperature, while impurities (present in ' +
      'much smaller amounts, below their own solubility limit) STAY dissolved in the ' +
      'remaining liquid (the "mother liquor") and get filtered away. EXTRACTION (typically ' +
      'liquid-liquid) separates compounds based on differential SOLUBILITY between two ' +
      'immiscible solvents (like water and an organic solvent) — "like dissolves like" ' +
      'means a compound partitions preferentially into whichever solvent better matches ' +
      'its polarity. SUBLIMATION purifies solids that convert directly to vapor without ' +
      'melting (like solid CO₂ or naphthalene), leaving non-subliming impurities behind.',
    targetedMisconceptions: [`${PURIF}:MC1`],
    source: `${PURIF_SRC} — distillation, recrystallization, extraction, sublimation techniques`,
  },
  {
    conceptId: PURIF,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "In recrystallization, cooling the hot saturated solution as FAST as possible ' +
      '(rapid cooling, like an ice bath) gives the purest, best crystals." Actually the ' +
      'OPPOSITE is generally true for PURITY (though rapid cooling does give MORE crystal ' +
      'mass/yield) — SLOW cooling allows crystals to form more SELECTIVELY and ORDERLY, ' +
      'excluding impurities from the growing crystal lattice as it forms gradually. Rapid ' +
      'cooling causes crystals to form too quickly and haphazardly, often TRAPPING ' +
      'impurities within the crystal structure (occlusion) rather than leaving them ' +
      'properly dissolved in the mother liquor. There\'s a genuine purity-vs-yield ' +
      'trade-off: slow cooling maximizes purity but sacrifices some yield (product left in ' +
      'solution); rapid cooling maximizes yield but risks lower purity. Second trap: ' +
      '"Simple distillation can effectively separate any two liquids, regardless of how ' +
      'close their boiling points are." FALSE — simple distillation only works well when ' +
      'boiling points differ substantially (roughly >25°C apart); for CLOSE boiling points, ' +
      'you need FRACTIONAL distillation\'s repeated vaporization-condensation cycles ' +
      '(essentially many small simple distillations stacked together) to achieve adequate ' +
      'separation.',
    targetedMisconceptions: [`${PURIF}:MC1`, `${PURIF}:MC2`],
    source: `${PURIF_SRC} — misconception: rapid cooling maximizes purity; simple distillation works for any boiling point difference`,
  },
]

const PURIF_PROBES: SeedProbe[] = [
  {
    conceptId: PURIF,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'During recrystallization, does cooling the hot saturated solution as RAPIDLY as possible (e.g., using an ice bath) produce the PUREST crystals?',
    choices: [
      { text: 'No — rapid cooling increases crystal YIELD but tends to trap impurities within the rapidly-forming crystal structure (occlusion); SLOW cooling generally produces purer crystals by allowing selective, orderly crystal growth', isCorrect: true },
      { text: 'Yes — the faster the solution cools, the purer and better-formed the resulting crystals will be', isCorrect: false, misconceptionId: `${PURIF}:MC1` },
    ],
    correctValue: 'No — slow cooling generally gives purer crystals (yield vs. purity trade-off)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PURIF}:MC1`],
    source: `${PURIF_SRC} — distractor targets assuming rapid cooling maximizes both yield and purity simultaneously`,
  },
  {
    conceptId: PURIF,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Two liquids have boiling points only 3°C apart. Will simple distillation effectively separate them into pure components?',
    choices: [
      { text: 'No — simple distillation only works well for substantially different boiling points (roughly >25°C apart); such close boiling points require fractional distillation\'s repeated vaporization-condensation cycles for adequate separation', isCorrect: true },
      { text: 'Yes — simple distillation can cleanly separate any two liquids regardless of how close their boiling points are', isCorrect: false, misconceptionId: `${PURIF}:MC2` },
    ],
    correctValue: 'No — fractional distillation is needed for close boiling points',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${PURIF}:MC2`],
    source: `${PURIF_SRC} — misconception: simple distillation is universally adequate regardless of boiling point closeness`,
  },
]

// ─── chem.elect.galvanic-cell ────────────────────────────────────────────────
const GALV = 'chem.elect.galvanic-cell'
const GALV_SRC = 'docs/chemistry/kg/graph.json — chem.elect.galvanic-cell'

const GALV_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GALV,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'A galvanic (voltaic) cell converts a SPONTANEOUS redox reaction into usable ' +
      'electrical energy by physically SEPARATING the oxidation and reduction ' +
      'half-reactions into two compartments, forcing electrons to travel through an ' +
      'external wire (doing electrical work) rather than transferring directly on contact. ' +
      'Structure: the ANODE (where OXIDATION occurs, electrons are RELEASED — by ' +
      'convention, negative terminal in a galvanic cell) and CATHODE (where REDUCTION ' +
      'occurs, electrons are CONSUMED — positive terminal). Memory aid: "AN OX, RED CAT" ' +
      '(ANode=OXidation, REDuction=CAThode) — this holds true regardless of cell type. A ' +
      'SALT BRIDGE (containing an inert electrolyte) completes the circuit internally, ' +
      'allowing ions to flow and maintain ELECTRICAL NEUTRALITY in both half-cells as the ' +
      'reaction proceeds (without it, charge would build up and stop the reaction almost ' +
      'immediately). Conventionally, electrons flow through the EXTERNAL wire from anode ' +
      'to cathode, while (by convention) CURRENT is defined as flowing the opposite ' +
      'direction (cathode to anode externally) since current direction is historically ' +
      'defined by positive charge flow, opposite to actual electron movement.',
    targetedMisconceptions: [`${GALV}:MC1`],
    source: `${GALV_SRC} — galvanic cell structure, anode/cathode, salt bridge function, electron flow direction`,
  },
  {
    conceptId: GALV,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "The anode is ALWAYS the negative terminal and cathode ALWAYS positive, in ' +
      'every type of electrochemical cell." FALSE as a universal rule — this is true for ' +
      'GALVANIC (spontaneous, energy-producing) cells specifically, but REVERSES for ' +
      'ELECTROLYTIC cells (non-spontaneous, energy-CONSUMING, driven by an external power ' +
      'source): there, the anode is connected to the power source\'s POSITIVE terminal ' +
      '(forcing oxidation to happen there against its natural tendency), making the anode ' +
      'POSITIVE and cathode NEGATIVE — opposite polarity from galvanic cells! The reliable, ' +
      'UNIVERSAL rule across BOTH cell types is "AN OX, RED CAT" (anode=oxidation, ' +
      'cathode=reduction) — polarity (+/−) depends on cell TYPE, but the ' +
      'oxidation/reduction assignment to anode/cathode never changes. Second trap: "Without ' +
      'a salt bridge, the reaction simply proceeds more slowly." FALSE — without a salt ' +
      'bridge (or another ion-flow pathway), charge builds up almost IMMEDIATELY in each ' +
      'compartment (positive ions accumulating at the anode, negative at the cathode), ' +
      'creating an opposing electric field that essentially STOPS the reaction very ' +
      'quickly, not merely slowing it down gradually.',
    targetedMisconceptions: [`${GALV}:MC1`, `${GALV}:MC2`],
    source: `${GALV_SRC} — misconception: anode/cathode polarity is fixed regardless of cell type; missing salt bridge just slows reaction`,
  },
]

const GALV_PROBES: SeedProbe[] = [
  {
    conceptId: GALV,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In an electrolytic cell (non-spontaneous, driven by an external power source), is the anode positive or negative, and how does this compare to a galvanic cell?',
    choices: [
      { text: 'The anode is POSITIVE in an electrolytic cell (connected to the power source\'s positive terminal), OPPOSITE to a galvanic cell where the anode is negative — but "anode=oxidation, cathode=reduction" remains true in both', isCorrect: true },
      { text: 'The anode is always negative in every type of electrochemical cell, galvanic or electrolytic, with no exceptions', isCorrect: false, misconceptionId: `${GALV}:MC1` },
    ],
    correctValue: 'Anode is positive in electrolytic cells (opposite of galvanic)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${GALV}:MC1`],
    source: `${GALV_SRC} — distractor targets assuming anode polarity is fixed across all cell types`,
  },
  {
    conceptId: GALV,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'A student removes the salt bridge from a galvanic cell mid-experiment. Does the reaction simply proceed more slowly afterward, or does something more dramatic happen?',
    choices: [
      { text: 'The reaction stops almost immediately — without the salt bridge, charge builds up rapidly in each compartment, creating an opposing electric field that halts further electron flow, rather than merely slowing the process gradually', isCorrect: true },
      { text: 'The reaction just proceeds more slowly, continuing at a reduced rate indefinitely', isCorrect: false, misconceptionId: `${GALV}:MC2` },
    ],
    correctValue: 'Reaction stops almost immediately, not just slows',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${GALV}:MC2`],
    source: `${GALV_SRC} — misconception: missing salt bridge merely slows the reaction rather than halting it`,
  },
]

// ─── chem.redox.disproportionation ───────────────────────────────────────────
const DISPROP = 'chem.redox.disproportionation'
const DISPROP_SRC = 'docs/chemistry/kg/graph.json — chem.redox.disproportionation'

const DISPROP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DISPROP,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'In a disproportionation reaction, the SAME element (in the SAME starting oxidation ' +
      'state) simultaneously gets BOTH oxidized AND reduced — one atom of that element ' +
      'increases in oxidation state while another identical atom decreases, in the same ' +
      'reaction. Classic example: 2Cu⁺ → Cu²⁺ + Cu (copper(I) is unstable, disproportionates ' +
      'into copper(II) and copper metal — one Cu⁺ is oxidized to Cu²⁺, another Cu⁺ is ' +
      'reduced to Cu⁰). Another: 3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O (in hot concentrated ' +
      'base, chlorine — oxidation state 0 — disproportionates into chloride, −1, and ' +
      'chlorate, +5). This ONLY happens when an element has an INTERMEDIATE oxidation ' +
      'state that is thermodynamically LESS STABLE than both a higher and lower oxidation ' +
      'state simultaneously available to it — the element essentially "prefers" to split ' +
      'into two more stable extremes rather than stay in the unstable middle. The REVERSE ' +
      'process (two different oxidation states of the SAME element combining into one ' +
      'intermediate state) is called COMPROPORTIONATION.',
    targetedMisconceptions: [`${DISPROP}:MC1`],
    source: `${DISPROP_SRC} — disproportionation mechanism, intermediate oxidation state instability, comproportionation`,
  },
  {
    conceptId: DISPROP,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Disproportionation requires two DIFFERENT elements reacting together, like ' +
      'any normal redox reaction." FALSE — disproportionation is specifically defined by ' +
      'involving the SAME element in the SAME starting oxidation state splitting into TWO ' +
      'different final oxidation states. This is what makes it a special, distinct ' +
      'category, not just "a redox reaction" — you need to verify the oxidizing and ' +
      'reducing species trace back to the SAME element/oxidation state before applying ' +
      'this label. Second trap: "Any element can disproportionate under any conditions, ' +
      'since disproportionation is a general universal reaction type." FALSE — ' +
      'disproportionation only occurs when an element\'s INTERMEDIATE oxidation state is ' +
      'genuinely thermodynamically unstable relative to splitting into higher/lower states ' +
      '— this depends on the SPECIFIC element and its available oxidation states\' relative ' +
      'stabilities (related to standard reduction potentials), and doesn\'t happen for ' +
      'every element in every intermediate oxidation state.',
    targetedMisconceptions: [`${DISPROP}:MC1`, `${DISPROP}:MC2`],
    source: `${DISPROP_SRC} — misconception: disproportionation requires different elements; happens universally regardless of stability`,
  },
]

const DISPROP_PROBES: SeedProbe[] = [
  {
    conceptId: DISPROP,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In the reaction 2Cu⁺ → Cu²⁺ + Cu, is this classified as a disproportionation reaction?',
    choices: [
      { text: 'Yes — the SAME element (copper) starting in the SAME oxidation state (+1) splits into two different final oxidation states (+2 and 0), which is the defining feature of disproportionation', isCorrect: true },
      { text: 'No — disproportionation requires two different elements to be involved, and this reaction only involves copper', isCorrect: false, misconceptionId: `${DISPROP}:MC1` },
    ],
    correctValue: 'Yes — classic disproportionation of Cu(I)',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${DISPROP}:MC1`],
    source: `${DISPROP_SRC} — distractor targets assuming disproportionation requires multiple different elements`,
  },
  {
    conceptId: DISPROP,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Does every element in an intermediate oxidation state automatically undergo disproportionation, given enough time?',
    choices: [
      { text: 'No — disproportionation only occurs when the specific intermediate oxidation state is genuinely thermodynamically unstable relative to the higher/lower states, which depends on the particular element involved, not a universal rule', isCorrect: true },
      { text: 'Yes — disproportionation is a universal tendency that all elements in intermediate oxidation states will eventually undergo', isCorrect: false, misconceptionId: `${DISPROP}:MC2` },
    ],
    correctValue: 'No — depends on specific element/oxidation-state stability',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${DISPROP}:MC2`],
    source: `${DISPROP_SRC} — misconception: disproportionation is a universal tendency rather than element-specific`,
  },
]

// ─── chem.redox.titrations ───────────────────────────────────────────────────
const REDOXTITR = 'chem.redox.titrations'
const REDOXTITR_SRC = 'docs/chemistry/kg/graph.json — chem.redox.titrations'

const REDOXTITR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REDOXTITR,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Redox titrations determine unknown concentrations using a redox reaction instead ' +
      'of an acid-base neutralization (building on the general titration concept covered ' +
      'earlier). The key difference: instead of tracking pH, you track ELECTRON TRANSFER ' +
      'completeness. Common redox titrants: POTASSIUM PERMANGANATE (KMnO₄) — famously ' +
      'SELF-INDICATING, since MnO₄⁻ is intensely purple but Mn²⁺ (its reduced product in ' +
      'acidic conditions) is nearly colorless, so the endpoint is signaled by the FIRST ' +
      'persistent faint pink color (excess unreacted MnO₄⁻ appearing once all the analyte ' +
      'is consumed) — no separate indicator needed. IODOMETRIC titrations use sodium ' +
      'thiosulfate (Na₂S₂O₃) to titrate I₂ (2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻), typically WITH a ' +
      'starch indicator (forms an intense blue-black complex with I₂, disappearing sharply ' +
      'at the endpoint when the last trace of I₂ is consumed — starch is added near the ' +
      'END of the titration, not the start, for a sharper, more sensitive endpoint). ' +
      'Stoichiometric calculations require BALANCING the redox equation first (via the ' +
      'ion-electron method covered earlier) to get the correct MOLE RATIO between titrant ' +
      'and analyte.',
    targetedMisconceptions: [`${REDOXTITR}:MC1`],
    source: `${REDOXTITR_SRC} — KMnO4 self-indicating titrations, iodometric titrations with starch, stoichiometry`,
  },
  {
    conceptId: REDOXTITR,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Since KMnO₄ titrations are self-indicating, you can just assume a 1:1 mole ' +
      'ratio between titrant and analyte, like a simple neutralization." FALSE — the mole ' +
      'ratio between MnO₄⁻ and the analyte depends entirely on the SPECIFIC balanced redox ' +
      'equation (which depends on how many electrons each species transfers) — this is ' +
      'often NOT 1:1. For example, MnO₄⁻ reacting with Fe²⁺ (MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + ' +
      '5Fe³⁺ + 4H₂O) has a 1:5 ratio, not 1:1, because MnO₄⁻ (Mn: +7→+2, gains 5 electrons) ' +
      'and Fe²⁺ (Fe: +2→+3, loses 1 electron) require 5 Fe²⁺ ions to supply enough ' +
      'electrons for 1 MnO₄⁻ ion. Always derive the mole ratio from the properly BALANCED ' +
      'equation, never assume it. Second trap: "Starch indicator should be added at the ' +
      'very BEGINNING of an iodometric titration, just like phenolphthalein in an acid-base ' +
      'titration." FALSE — starch is deliberately added NEAR THE END (when the solution has ' +
      'faded to a pale straw-yellow, signaling I₂ is nearly consumed) because the ' +
      'starch-iodine complex can be slow to reversibly break down and may give a less sharp, ' +
      'less accurate endpoint if it forms too early in the titration with high I₂ ' +
      'concentration present.',
    targetedMisconceptions: [`${REDOXTITR}:MC1`, `${REDOXTITR}:MC2`],
    source: `${REDOXTITR_SRC} — misconception: assuming 1:1 mole ratio without balancing; adding starch indicator too early`,
  },
]

const REDOXTITR_PROBES: SeedProbe[] = [
  {
    conceptId: REDOXTITR,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'In the balanced equation MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O, what is the mole ratio of MnO₄⁻ to Fe²⁺ needed for the titration calculation?',
    choices: [
      { text: '1:5 — MnO₄⁻ gains 5 electrons (Mn: +7→+2) while each Fe²⁺ loses only 1 electron (Fe: +2→+3), so 5 Fe²⁺ ions are needed to balance the electron transfer for each MnO₄⁻', isCorrect: true },
      { text: '1:1 — redox titrations, like acid-base titrations, always assume a simple 1:1 mole ratio between titrant and analyte', isCorrect: false, misconceptionId: `${REDOXTITR}:MC1` },
    ],
    correctValue: '1:5',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${REDOXTITR}:MC1`],
    source: `${REDOXTITR_SRC} — distractor targets assuming a universal 1:1 titrant-analyte ratio`,
  },
  {
    conceptId: REDOXTITR,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In an iodometric titration with sodium thiosulfate, should starch indicator be added at the very START of the titration, like phenolphthalein in an acid-base titration?',
    choices: [
      { text: 'No — starch should be added NEAR THE END (when the solution has faded to pale straw-yellow), since adding it too early with high I₂ concentration can give a less sharp, less accurate endpoint due to the slow-to-reverse starch-iodine complex', isCorrect: true },
      { text: 'Yes — indicators should always be added at the start of any titration for consistent results', isCorrect: false, misconceptionId: `${REDOXTITR}:MC2` },
    ],
    correctValue: 'No — starch is added near the end for a sharper endpoint',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${REDOXTITR}:MC2`],
    source: `${REDOXTITR_SRC} — misconception: all titration indicators should be added at the start regardless of type`,
  },
]

// ─── chem.anal.volumetric ────────────────────────────────────────────────────
const VOLUM = 'chem.anal.volumetric'
const VOLUM_SRC = 'docs/chemistry/kg/graph.json — chem.anal.volumetric'

const VOLUM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VOLUM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Volumetric analysis is the broader category encompassing all TITRATION-based ' +
      'quantitative techniques (acid-base, redox, complexometric, precipitation) — ' +
      'determining an unknown quantity by measuring the VOLUME of a reagent of KNOWN ' +
      'concentration needed to complete a reaction. Precision depends on careful technique ' +
      'and equipment: a BURETTE (delivers precise, variable volumes, readable to ±0.05 mL ' +
      'or better) dispenses the titrant; a PIPETTE (delivers one FIXED, highly precise ' +
      'volume) measures the analyte into the flask; a VOLUMETRIC FLASK (one precise total ' +
      'volume mark) prepares standard solutions. A PRIMARY STANDARD is a substance pure ' +
      'and stable enough to weigh directly and dissolve to make a solution of KNOWN, ' +
      'precisely calculated concentration WITHOUT needing separate standardization (must ' +
      'be: high purity, stable in air, non-hygroscopic, high molar mass for weighing ' +
      'precision, and react in a clean, known stoichiometry) — like potassium hydrogen ' +
      'phthalate (KHP) for acid-base work. A SECONDARY STANDARD (like NaOH, which absorbs ' +
      'CO₂/moisture from air and isn\'t pure enough to weigh directly) must itself be ' +
      'STANDARDIZED first by titrating it against a primary standard, before it can ' +
      'reliably be used to titrate other unknowns.',
    targetedMisconceptions: [`${VOLUM}:MC1`],
    source: `${VOLUM_SRC} — burette/pipette/volumetric flask precision, primary vs secondary standards`,
  },
  {
    conceptId: VOLUM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "You can dissolve a precisely weighed amount of NaOH in water and immediately ' +
      'trust its concentration as accurately known, just like any other soluble solid." ' +
      'FALSE — NaOH is HYGROSCOPIC (absorbs moisture from air) and reacts with atmospheric ' +
      'CO₂ (forming Na₂CO₃ contamination), meaning a weighed sample of solid NaOH is NEVER ' +
      'quite as pure as its label suggests by the time you weigh it — its true purity is ' +
      'uncertain. This makes NaOH a SECONDARY standard requiring its own standardization ' +
      '(titrating it against a reliable PRIMARY standard like KHP) before it can be ' +
      'trusted for further titrations — you cannot simply calculate its concentration ' +
      'from mass and volume alone. Second trap: "A burette and a pipette serve essentially ' +
      'the same measuring function, interchangeably." FALSE — a pipette delivers ONE fixed, ' +
      'highly precise volume (used to measure a known analyte amount into the flask), while ' +
      'a burette delivers VARIABLE, precisely-readable volumes (used to titrate — add the ' +
      'reagent gradually until the endpoint, tracking exactly how much was needed). Using ' +
      'one where the other is needed would defeat the purpose of the specific measurement.',
    targetedMisconceptions: [`${VOLUM}:MC1`, `${VOLUM}:MC2`],
    source: `${VOLUM_SRC} — misconception: NaOH can be weighed as a primary standard; burette and pipette are interchangeable`,
  },
]

const VOLUM_PROBES: SeedProbe[] = [
  {
    conceptId: VOLUM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Can you weigh out solid NaOH precisely and immediately calculate an accurately known solution concentration, treating it as a primary standard?',
    choices: [
      { text: 'No — NaOH is hygroscopic and reacts with atmospheric CO₂, making its true purity uncertain by the time it\'s weighed; it must be treated as a secondary standard and standardized against a reliable primary standard like KHP first', isCorrect: true },
      { text: 'Yes — any pure solid can be weighed directly to calculate an exactly known solution concentration', isCorrect: false, misconceptionId: `${VOLUM}:MC1` },
    ],
    correctValue: 'No — NaOH requires standardization as a secondary standard',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${VOLUM}:MC1`],
    source: `${VOLUM_SRC} — distractor targets treating any weighable solid as an automatic primary standard`,
  },
  {
    conceptId: VOLUM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'Can a burette and a pipette be used interchangeably in a titration setup, since both are precision glassware for measuring liquid volumes?',
    choices: [
      { text: 'No — a pipette delivers one FIXED precise volume (for measuring the analyte), while a burette delivers VARIABLE, precisely-readable volumes (for gradually titrating the reagent until the endpoint) — they serve distinct, non-interchangeable roles', isCorrect: true },
      { text: 'Yes — both deliver precise volumes of liquid and can be used for either measuring the analyte or titrating the reagent', isCorrect: false, misconceptionId: `${VOLUM}:MC2` },
    ],
    correctValue: 'No — distinct roles (fixed volume vs. variable/titrating volume)',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${VOLUM}:MC2`],
    source: `${VOLUM_SRC} — misconception: burette and pipette are functionally interchangeable`,
  },
]

// ─── chem.coord.cft ───────────────────────────────────────────────────────────
const CFT = 'chem.coord.cft'
const CFT_SRC = 'docs/chemistry/kg/graph.json — chem.coord.cft'

const CFT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CFT,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Crystal Field Theory (CFT) explains transition metal complex COLOR and MAGNETISM by ' +
      'treating ligands as simple point negative charges approaching the metal\'s d ' +
      'orbitals. In a FREE metal ion, all 5 d orbitals have EQUAL energy (degenerate). But ' +
      'when ligands approach in an OCTAHEDRAL arrangement (6 ligands along the x/y/z axes), ' +
      'they REPEL electrons in d orbitals pointing directly AT them (dz², dx²−y² — these ' +
      'orbitals lie ALONG the axes) more than orbitals pointing BETWEEN the axes (dxy, dxz, ' +
      'dyz) — splitting the 5 orbitals into two energy groups: higher-energy e_g (2 ' +
      'orbitals) and lower-energy t₂g (3 orbitals), separated by the CRYSTAL FIELD ' +
      'SPLITTING ENERGY (Δ₀). This splitting is EXACTLY what causes color (as covered in ' +
      'd-block general properties) — an electron absorbs a specific-energy photon to jump ' +
      'from t₂g to e_g, and Δ₀\'s SIZE determines WHICH wavelength gets absorbed (hence ' +
      'which color you see). Whether electrons fill orbitals to MINIMIZE pairing (HIGH ' +
      'SPIN, small Δ₀, weak-field ligands) or fill the lower set FIRST before pairing ' +
      '(LOW SPIN, large Δ₀, strong-field ligands) determines the complex\'s MAGNETIC ' +
      'behavior — more unpaired electrons (high spin) means stronger paramagnetism.',
    targetedMisconceptions: [`${CFT}:MC1`],
    source: `${CFT_SRC} — crystal field splitting, eg/t2g orbitals, high spin vs low spin, color connection`,
  },
  {
    conceptId: CFT,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "All 5 d orbitals split into completely SEPARATE, individually distinct ' +
      'energy levels — five different energies." FALSE for the octahedral case — they ' +
      'split into just TWO energy groups: the higher e_g set (2 orbitals, dz² and dx²−y², ' +
      'which happen to have the SAME energy as each other, both pointing along axes) and ' +
      'the lower t₂g set (3 orbitals, dxy/dxz/dyz, also equal energy to each other, ' +
      'pointing between axes) — not five separate levels. Second trap: "A larger crystal ' +
      'field splitting (Δ₀) always means MORE unpaired electrons and stronger ' +
      'paramagnetism." BACKWARDS — a LARGER Δ₀ (strong-field ligands like CN⁻) makes it ' +
      'more energetically favorable to PAIR electrons in the lower t₂g set rather than pay ' +
      'the large energy cost to promote them to e_g — this gives LOW SPIN (FEWER unpaired ' +
      'electrons, weaker paramagnetism). A SMALLER Δ₀ (weak-field ligands like F⁻) makes ' +
      'promotion to e_g relatively cheap compared to electron-pairing energy, favoring HIGH ' +
      'SPIN (MORE unpaired electrons). Larger splitting favors PAIRING (low spin), not more ' +
      'unpaired electrons.',
    targetedMisconceptions: [`${CFT}:MC1`, `${CFT}:MC2`],
    source: `${CFT_SRC} — misconception: five separate energy levels instead of two groups; larger Δ0 means more unpaired electrons`,
  },
]

const CFT_PROBES: SeedProbe[] = [
  {
    conceptId: CFT,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In an octahedral crystal field, how many distinct energy levels do the 5 d orbitals split into?',
    choices: [
      { text: '2 — a lower-energy t2g set (3 orbitals) and a higher-energy eg set (2 orbitals), not five separate individual energies', isCorrect: true },
      { text: '5 — all five d orbitals become individually distinct in energy', isCorrect: false, misconceptionId: `${CFT}:MC1` },
    ],
    correctValue: '2 energy levels (t2g and eg)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CFT}:MC1`],
    source: `${CFT_SRC} — distractor targets assuming all five d orbitals become individually distinct`,
  },
  {
    conceptId: CFT,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'A strong-field ligand like CN⁻ produces a LARGE crystal field splitting (Δ₀). Does this result in MORE unpaired electrons (high spin) or FEWER unpaired electrons (low spin)?',
    choices: [
      { text: 'Fewer unpaired electrons (low spin) — the large Δ0 makes pairing electrons in the lower t2g set more favorable than paying the large energy cost to promote them to eg', isCorrect: true },
      { text: 'More unpaired electrons (high spin) — larger splitting should push more electrons into the higher eg set, leaving them unpaired', isCorrect: false, misconceptionId: `${CFT}:MC2` },
    ],
    correctValue: 'Fewer unpaired electrons (low spin)',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${CFT}:MC2`],
    source: `${CFT_SRC} — misconception: larger splitting energy leads to more unpaired electrons rather than pairing`,
  },
]

// ─── chem.coord.bonding ──────────────────────────────────────────────────────
const COORDBOND = 'chem.coord.bonding'
const COORDBOND_SRC = 'docs/chemistry/kg/graph.json — chem.coord.bonding'

const COORDBOND_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COORDBOND,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Beyond simple Crystal Field Theory (which treats ligands as point charges), a more ' +
      'complete picture uses VALENCE BOND THEORY and MOLECULAR ORBITAL concepts to explain ' +
      'coordination complex GEOMETRY and BONDING. The metal uses HYBRID ORBITALS (building ' +
      'on hybridization covered earlier) to accept electron pairs from ligands via ' +
      'coordinate bonds: d²sp³ or sp³d² hybridization gives OCTAHEDRAL geometry (6 ' +
      'ligands), dsp² gives SQUARE PLANAR (4 ligands, common for d8 metals like Pt²⁺, Ni²⁺ ' +
      'with strong-field ligands), sp³ gives TETRAHEDRAL (4 ligands, common for d10 or ' +
      'weak-field cases). LIGAND FIELD THEORY extends Crystal Field Theory by ' +
      'acknowledging that ligand-metal bonding has GENUINE COVALENT CHARACTER (some real ' +
      'orbital overlap/sharing), not just pure electrostatic point-charge repulsion — this ' +
      'more sophisticated model better explains the actual observed SPECTROCHEMICAL SERIES ' +
      '(the experimentally-ranked order of ligands from weak-field to strong-field: I⁻ < ' +
      'Br⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ < CO), since pure electrostatics alone cannot ' +
      'fully explain why some NEUTRAL ligands like CO produce STRONGER splitting than some ' +
      'charged ones like Cl⁻.',
    targetedMisconceptions: [`${COORDBOND}:MC1`],
    source: `${COORDBOND_SRC} — hybridization in complexes, ligand field theory, spectrochemical series`,
  },
  {
    conceptId: COORDBOND,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Since Crystal Field Theory treats ligands as pure point charges, a NEGATIVELY ' +
      'CHARGED ligand (like Cl⁻) should always produce a STRONGER field (bigger splitting) ' +
      'than a NEUTRAL ligand (like CO or NH₃), since charged species should interact more ' +
      'strongly." FALSE — the actual experimental spectrochemical series shows NEUTRAL CO ' +
      'is a much STRONGER-field ligand than charged Cl⁻, directly contradicting simple ' +
      'point-charge electrostatic reasoning. This is precisely why pure Crystal Field ' +
      'Theory is insufficient and Ligand Field Theory (acknowledging real covalent ' +
      'orbital overlap, including π-backbonding where the metal donates electron density ' +
      'BACK into empty ligand orbitals, as with CO) is needed for a fully accurate ' +
      'picture. Second trap: "All 4-coordinate complexes have the same geometry (either ' +
      'always tetrahedral or always square planar)." FALSE — geometry depends on the ' +
      'metal\'s d-electron count AND the ligand field strength: d8 metals with STRONG-field ' +
      'ligands favor SQUARE PLANAR (like [Ni(CN)₄]²⁻), while d10 metals or WEAK-field ' +
      'ligands favor TETRAHEDRAL (like [NiCl₄]²⁻) — same coordination number (4), genuinely ' +
      'different geometries depending on electronic configuration and ligand strength.',
    targetedMisconceptions: [`${COORDBOND}:MC1`, `${COORDBOND}:MC2`],
    source: `${COORDBOND_SRC} — misconception: charged ligands always split more than neutral ones; all 4-coordinate complexes share one geometry`,
  },
]

const COORDBOND_PROBES: SeedProbe[] = [
  {
    conceptId: COORDBOND,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'CO (neutral) is a much STRONGER-field ligand than Cl⁻ (negatively charged), according to the experimental spectrochemical series. Does simple point-charge electrostatic reasoning (pure Crystal Field Theory) explain this?',
    choices: [
      { text: 'No — pure electrostatics would predict the charged Cl⁻ should interact more strongly; CO\'s stronger field arises from genuine covalent bonding effects like π-backbonding, which requires Ligand Field Theory (beyond simple CFT) to explain', isCorrect: true },
      { text: 'Yes — charged ligands should always produce stronger crystal field splitting than neutral ligands, consistent with simple point-charge reasoning', isCorrect: false, misconceptionId: `${COORDBOND}:MC1` },
    ],
    correctValue: 'No — requires covalent bonding effects beyond simple CFT',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COORDBOND}:MC1`],
    source: `${COORDBOND_SRC} — distractor targets assuming pure electrostatics fully explains the spectrochemical series`,
  },
  {
    conceptId: COORDBOND,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Both [Ni(CN)4]2- and [NiCl4]2- have 4-coordinate nickel complexes. Must they have the SAME geometry (either both tetrahedral or both square planar)?',
    choices: [
      { text: 'No — [Ni(CN)4]2- (strong-field CN⁻ ligands) adopts square planar geometry, while [NiCl4]2- (weak-field Cl⁻ ligands) adopts tetrahedral geometry; geometry depends on both d-electron count and ligand field strength, not just coordination number', isCorrect: true },
      { text: 'Yes — any complex with 4 ligands must adopt the same fixed geometry, whether tetrahedral or square planar, regardless of the specific ligands involved', isCorrect: false, misconceptionId: `${COORDBOND}:MC2` },
    ],
    correctValue: 'No — geometry depends on ligand field strength and d-electron count',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COORDBOND}:MC2`],
    source: `${COORDBOND_SRC} — misconception: coordination number alone determines geometry regardless of ligand identity`,
  },
]

// ─── chem.coord.applications ─────────────────────────────────────────────────
const COORDAPP = 'chem.coord.applications'
const COORDAPP_SRC = 'docs/chemistry/kg/graph.json — chem.coord.applications'

const COORDAPP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COORDAPP,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Coordination chemistry isn\'t just theoretical — it underlies critical biological ' +
      'and industrial processes. BIOLOGICAL: HEMOGLOBIN uses an Fe²⁺ center coordinated to ' +
      'a porphyrin ring (4 nitrogen donors) plus a protein histidine (5th position) and ' +
      'reversibly binds O₂ at the 6th position — the coordinate bond to O₂ must be strong ' +
      'enough to hold oxygen but weak enough to RELEASE it in tissues (a delicately tuned ' +
      'equilibrium). CHLOROPHYLL uses a similar porphyrin structure but with Mg²⁺ instead ' +
      'of Fe²⁺, essential for capturing light energy in photosynthesis. VITAMIN B12 uses a ' +
      'Co³⁺ center. INDUSTRIAL: EDTA (a hexadentate chelating ligand, binding through 6 ' +
      'donor atoms simultaneously) is used to sequester unwanted metal ions — in water ' +
      'softening, food preservation (binding trace metal ions that would otherwise catalyze ' +
      'spoilage reactions), and treating heavy metal poisoning (chelation therapy, binding ' +
      'toxic Pb²⁺ or Hg²⁺ for safe excretion). ELECTROPLATING uses coordination complexes ' +
      'of the plating metal (like [Ag(CN)₂]⁻ for silver plating) to control deposition rate ' +
      'and produce a smoother, more even metal coating than simple metal salts would allow.',
    targetedMisconceptions: [`${COORDAPP}:MC1`],
    source: `${COORDAPP_SRC} — hemoglobin/chlorophyll/B12 coordination, EDTA chelation, electroplating applications`,
  },
  {
    conceptId: COORDAPP,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Since EDTA effectively removes/binds metal ions, a STRONGER binding affinity ' +
      '(higher stability constant) is always better for every application." FALSE — the ' +
      'OPTIMAL binding strength depends entirely on the APPLICATION\'s purpose. For heavy ' +
      'metal chelation therapy, you want EDTA to bind toxic Pb²⁺/Hg²⁺ tightly enough to ' +
      'safely remove them via excretion — but EDTA can ALSO bind essential biological metal ' +
      'ions (like Ca²⁺, Zn²⁺) too strongly if not carefully dosed, potentially causing ' +
      'harmful DEFICIENCIES of needed minerals — chelation therapy requires careful ' +
      'medical control, not maximal binding strength applied indiscriminately. Second ' +
      'trap: "Hemoglobin\'s oxygen binding should be as STRONG as possible for maximum ' +
      'oxygen-carrying efficiency." FALSE — hemoglobin\'s Fe-O₂ coordinate bond is ' +
      'deliberately TUNED to an intermediate strength: strong enough to pick up O₂ in the ' +
      'lungs (high O₂ concentration) but weak enough to RELEASE it in tissues (lower O₂ ' +
      'concentration, where it\'s needed) — if binding were maximally strong, hemoglobin ' +
      'would hoard oxygen and never deliver it to tissues, which would be catastrophically ' +
      'non-functional despite superficially seeming "better."',
    targetedMisconceptions: [`${COORDAPP}:MC1`, `${COORDAPP}:MC2`],
    source: `${COORDAPP_SRC} — misconception: stronger binding is always better; hemoglobin should bind O2 maximally strongly`,
  },
]

const COORDAPP_PROBES: SeedProbe[] = [
  {
    conceptId: COORDAPP,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'In chelation therapy for heavy metal poisoning, is administering the MAXIMUM possible amount of a very strong chelating agent like EDTA always the safest, most effective approach?',
    choices: [
      { text: 'No — EDTA can also bind essential biological metal ions (like Ca2+, Zn2+) too strongly if overdosed, potentially causing harmful mineral deficiencies; careful medical dosing is required, not maximal binding applied indiscriminately', isCorrect: true },
      { text: 'Yes — a stronger chelating agent in higher doses is always safer and more effective for removing toxic metals from the body', isCorrect: false, misconceptionId: `${COORDAPP}:MC1` },
    ],
    correctValue: 'No — overdosing risks depleting essential minerals too',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COORDAPP}:MC1`],
    source: `${COORDAPP_SRC} — distractor targets assuming stronger/more chelation is unconditionally better`,
  },
  {
    conceptId: COORDAPP,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Would hemoglobin function BETTER as an oxygen transporter if its Fe-O2 coordinate bond were as strong as possible?',
    choices: [
      { text: 'No — hemoglobin\'s binding strength is deliberately tuned to be strong enough to pick up O2 in the lungs but weak enough to release it in tissues; maximal binding strength would cause hemoglobin to hoard oxygen and never deliver it', isCorrect: true },
      { text: 'Yes — maximizing the Fe-O2 bond strength would let hemoglobin carry and deliver oxygen more efficiently throughout the body', isCorrect: false, misconceptionId: `${COORDAPP}:MC2` },
    ],
    correctValue: 'No — an intermediate, tuned binding strength is essential for function',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${COORDAPP}:MC2`],
    source: `${COORDAPP_SRC} — misconception: maximizing binding strength always improves biological function`,
  },
]

// ─── chem.coord.stability ────────────────────────────────────────────────────
const STABCON = 'chem.coord.stability'
const STABCON_SRC = 'docs/chemistry/kg/graph.json — chem.coord.stability'

const STABCON_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: STABCON,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Building on the formation constant (K_f) covered in complex equilibria: STABILITY ' +
      'CONSTANTS quantify HOW MUCH more stable a complex is compared to the separated ' +
      'metal ion and ligands. A crucial pattern: CHELATE complexes (where one ligand binds ' +
      'through MULTIPLE donor atoms simultaneously, like EDTA\'s 6 donor atoms, or ' +
      'ethylenediamine\'s 2) are DRAMATICALLY more stable than analogous complexes with the ' +
      'SAME donor atom TYPE but as separate monodentate ligands — this is the CHELATE ' +
      'EFFECT. For example, [Ni(en)₃]²⁺ (3 bidentate ethylenediamine ligands, 6 total N ' +
      'donors) is far more stable than [Ni(NH₃)₆]²⁺ (6 separate monodentate NH₃ ligands, ' +
      'also 6 total N donors) — SAME number and type of donor atoms, but chelation wins ' +
      'decisively. The reason is fundamentally ENTROPIC: releasing 3 chelating ligand ' +
      'molecules (en) to bind produces MORE total free particles in solution than binding ' +
      '6 separate NH₃ molecules would release (1 chelate replacing effectively 2 ' +
      'monodentate ligands means a net INCREASE in the number of independent solution ' +
      'species/particles) — favorable entropy change (ΔS > 0) drives spontaneity (ΔG = ΔH − ' +
      'TΔS) even when the bond enthalpies themselves are similar.',
    targetedMisconceptions: [`${STABCON}:MC1`],
    source: `${STABCON_SRC} — stability constants, chelate effect, entropic origin`,
  },
  {
    conceptId: STABCON,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "The chelate effect makes chelate complexes more stable because chelating ' +
      'ligands form STRONGER individual metal-donor BONDS than monodentate ligands with ' +
      'the same donor atom." FALSE — the individual metal-nitrogen bond strength in ' +
      '[Ni(en)₃]²⁺ is roughly SIMILAR to the metal-nitrogen bond strength in [Ni(NH₃)₆]²⁺ ' +
      '(comparable ΔH contributions per bond) — the dramatic stability difference comes ' +
      'from ENTROPY, not enthalpy/bond-strength differences. Releasing 3 en molecules into ' +
      'solution (when the complex forms, displacing 6 water molecules) creates a NET ' +
      'INCREASE in the total number of free particles (more disorder/entropy) compared to ' +
      'releasing 6 separate NH₃ ligands to bind (which itself displaces 6 waters, but ' +
      'without the additional favorable particle-count change from chelation) — the ' +
      'entropic term (−TΔS in ΔG=ΔH−TΔS) drives the extra stability, an often-overlooked ' +
      'thermodynamic subtlety. Second trap: "Larger chelate rings (more atoms in the ring) ' +
      'are always more stable than smaller ones." FALSE — 5- and 6-membered chelate rings ' +
      'are generally the MOST stable (optimal geometric strain/flexibility balance); much ' +
      'larger rings actually become LESS stable due to increased conformational strain and ' +
      'entropy loss from restricting a longer, floppier chain into a ring shape.',
    targetedMisconceptions: [`${STABCON}:MC1`, `${STABCON}:MC2`],
    source: `${STABCON_SRC} — misconception: chelate effect is due to stronger bonds not entropy; bigger rings are always more stable`,
  },
]

const STABCON_PROBES: SeedProbe[] = [
  {
    conceptId: STABCON,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: '[Ni(en)3]2+ is much more stable than [Ni(NH3)6]2+, even though both have 6 total Ni-N bonds of similar individual strength. What explains this "chelate effect"?',
    choices: [
      { text: 'The chelate effect is primarily ENTROPIC — releasing 3 chelating en molecules (replacing 6 waters) creates a net increase in total free particles in solution compared to releasing 6 separate NH3 ligands, favoring the chelate thermodynamically', isCorrect: true },
      { text: 'Each individual Ni-N bond in the en complex is significantly stronger (higher bond enthalpy) than in the NH3 complex', isCorrect: false, misconceptionId: `${STABCON}:MC1` },
    ],
    correctValue: 'Entropic effect from particle count change, not stronger individual bonds',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${STABCON}:MC1`],
    source: `${STABCON_SRC} — distractor targets attributing the chelate effect to bond strength rather than entropy`,
  },
  {
    conceptId: STABCON,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Does making a chelate ring LARGER (more atoms in the ring) always increase complex stability?',
    choices: [
      { text: 'No — 5- and 6-membered chelate rings are generally the most stable due to optimal geometric strain/flexibility; much larger rings become less stable from increased conformational strain and entropy loss', isCorrect: true },
      { text: 'Yes — larger chelate rings always provide greater stability by binding the metal more extensively', isCorrect: false, misconceptionId: `${STABCON}:MC2` },
    ],
    correctValue: 'No — 5/6-membered rings are optimal, not the largest possible',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${STABCON}:MC2`],
    source: `${STABCON_SRC} — misconception: bigger chelate rings are unconditionally more stable`,
  },
]

// ─── chem.coord.isomerism ────────────────────────────────────────────────────
const COORDISOM = 'chem.coord.isomerism'
const COORDISOM_SRC = 'docs/chemistry/kg/graph.json — chem.coord.isomerism'

const COORDISOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COORDISOM,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Coordination complexes show isomerism types beyond simple organic structural/ ' +
      'stereoisomerism (building on that earlier concept). IONIZATION ISOMERS swap which ' +
      'species is INSIDE the coordination sphere (bonded to the metal) versus OUTSIDE as a ' +
      'free counter-ion: [Co(NH₃)₅Br]SO₄ vs. [Co(NH₃)₅SO₄]Br — same overall formula, but ' +
      'different ions dissociate in solution, giving genuinely different chemical tests ' +
      '(the first gives a precipitate with BaCl₂ testing for free SO₄²⁻; the second doesn\'t, ' +
      'but instead gives a precipitate with AgNO₃ testing for free Br⁻). GEOMETRIC (cis- ' +
      'trans) ISOMERS occur in square planar and octahedral complexes with 2+ different ' +
      'ligand types — cis (adjacent, 90° apart) vs. trans (opposite, 180° apart) ' +
      'arrangements are genuinely different, non-interconvertible compounds with different ' +
      'physical/chemical properties (cisplatin, the cis isomer, is a potent anticancer drug; ' +
      'the trans isomer is essentially therapeutically INACTIVE — same formula, ' +
      'dramatically different biological effect). OPTICAL ISOMERS occur in octahedral ' +
      'complexes lacking a plane of symmetry (often with 3 bidentate chelating ligands, ' +
      'like [Co(en)₃]³⁺), forming genuine non-superimposable mirror images (enantiomers), ' +
      'exactly analogous to organic chirality.',
    targetedMisconceptions: [`${COORDISOM}:MC1`],
    source: `${COORDISOM_SRC} — ionization isomers, geometric (cis/trans) isomers, optical isomers in complexes`,
  },
  {
    conceptId: COORDISOM,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Trap: "Cisplatin and its trans isomer, having the identical molecular formula and ' +
      'the same types of bonds, should have essentially the SAME biological activity." ' +
      'DANGEROUSLY FALSE — this is a striking real-world parallel to the enantiomer/drug ' +
      'safety lesson covered earlier. Cis-platin (cis-[Pt(NH₃)₂Cl₂]) is a highly effective, ' +
      'widely-used anticancer drug (works by binding DNA in a specific geometric way that ' +
      'disrupts replication), while trans-platin is essentially THERAPEUTICALLY INACTIVE ' +
      'for this purpose (the different geometry prevents the same critical DNA-binding ' +
      'interaction) — identical formula, dramatically different biological consequence, ' +
      'purely from geometric isomerism. Second trap: "Ionization isomers are basically the ' +
      'same compound, since they share the identical overall chemical formula." FALSE — ' +
      'they are genuinely DIFFERENT compounds with measurably different chemical behavior ' +
      '(different species precipitate with different test reagents, as shown above) — ' +
      'sharing an overall formula does NOT mean sharing identical chemistry when the atoms ' +
      'are arranged/bonded differently (inside vs. outside the coordination sphere).',
    targetedMisconceptions: [`${COORDISOM}:MC1`, `${COORDISOM}:MC2`],
    source: `${COORDISOM_SRC} — misconception: cis/trans platin have same biological activity; ionization isomers are the same compound`,
  },
]

const COORDISOM_PROBES: SeedProbe[] = [
  {
    conceptId: COORDISOM,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: 'Cisplatin (cis-[Pt(NH3)2Cl2]) is a potent anticancer drug, but its geometric isomer trans-platin is essentially therapeutically inactive. Since both have the identical molecular formula, should they have the same biological activity?',
    choices: [
      { text: 'No — the different spatial arrangement (cis vs trans) changes how the molecule binds DNA, a specific geometric interaction that only the cis isomer can perform effectively; identical formula does not guarantee identical biological activity', isCorrect: true },
      { text: 'Yes — since cis-platin and trans-platin share the same molecular formula and bond types, they should be equally effective anticancer drugs', isCorrect: false, misconceptionId: `${COORDISOM}:MC1` },
    ],
    correctValue: 'No — geometric isomerism causes dramatically different biological activity',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COORDISOM}:MC1`],
    source: `${COORDISOM_SRC} — distractor targets assuming identical formula guarantees identical biological effect`,
  },
  {
    conceptId: COORDISOM,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.UNDERGRADUATE,
    stem: '[Co(NH3)5Br]SO4 and [Co(NH3)5SO4]Br share the identical overall chemical formula. Are they the same compound?',
    choices: [
      { text: 'No — they are genuinely different ionization isomers with measurably different chemistry: the first releases free SO42- (testable with BaCl2), the second releases free Br- (testable with AgNO3) — different atoms occupy the coordination sphere vs. the outer counter-ion position', isCorrect: true },
      { text: 'Yes — sharing an identical overall formula means they are the same compound, just written differently', isCorrect: false, misconceptionId: `${COORDISOM}:MC2` },
    ],
    correctValue: 'No — genuinely different compounds despite identical formula',
    difficulty: ProbeDifficulty.ADVANCED,
    targetedMisconceptions: [`${COORDISOM}:MC2`],
    source: `${COORDISOM_SRC} — misconception: identical overall formula implies identical compound`,
  },
]

// ─── chem.hal.introduction ───────────────────────────────────────────────────
const HALINTRO = 'chem.hal.introduction'
const HALINTRO_SRC = 'docs/chemistry/kg/graph.json — chem.hal.introduction'

const HALINTRO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HALINTRO,
    subjectSlug: 'chemistry',
    familyKind: 'core_explanation',
    gradeBand: GradeBand.HIGH,
    content:
      'Haloalkanes (R-X, halogen bonded to an sp³ carbon) and haloarenes (halogen bonded ' +
      'DIRECTLY to an aromatic ring carbon) look superficially similar but behave very ' +
      'DIFFERENTLY in reactions — this difference traces directly back to hybridization ' +
      'and resonance (both covered earlier). In haloalkanes, the C-X bond is a simple, ' +
      'fairly reactive σ bond between sp³ carbon and halogen — the halogen readily leaves ' +
      'as a NUCLEOPHILE/LEAVING GROUP in substitution reactions (SN1/SN2 mechanisms). In ' +
      'haloarenes, the halogen\'s lone pair can DELOCALIZE into the aromatic π system ' +
      '(resonance donation, the +M effect covered in electronic effects) — this gives the ' +
      'C-X bond PARTIAL DOUBLE BOND CHARACTER, making it SHORTER, STRONGER, and much more ' +
      'RESISTANT to substitution than a comparable haloalkane bond. Additionally, the sp² ' +
      'carbon in haloarenes holds electrons closer to the nucleus than sp³ carbon (higher ' +
      's-character means orbitals are more compact/tightly held), further strengthening the ' +
      'bond. Classification by carbon type mirrors organic naming conventions: PRIMARY ' +
      '(halogen on a carbon attached to only 1 other carbon), SECONDARY (2 other carbons), ' +
      'TERTIARY (3 other carbons) — this classification strongly predicts REACTION ' +
      'MECHANISM preference (primary favors SN2; tertiary favors SN1).',
    targetedMisconceptions: [`${HALINTRO}:MC1`],
    source: `${HALINTRO_SRC} — haloalkanes vs haloarenes reactivity difference, C-X bond character, primary/secondary/tertiary classification`,
  },
  {
    conceptId: HALINTRO,
    subjectSlug: 'chemistry',
    familyKind: 'misconception_repair',
    gradeBand: GradeBand.HIGH,
    content:
      'Trap: "Haloarenes (aryl halides) should be MORE reactive toward nucleophilic ' +
      'substitution than haloalkanes, since the aromatic ring provides extra stabilization ' +
      'for the reaction to proceed." BACKWARDS — haloarenes are actually MUCH LESS reactive ' +
      'toward standard nucleophilic substitution than haloalkanes (chlorobenzene resists ' +
      'the same substitution conditions that readily convert chloroethane). This is ' +
      'precisely because of the resonance donation (+M effect) strengthening the C-X bond ' +
      '(partial double bond character), which makes the halogen a much POORER leaving ' +
      'group in haloarenes — the aromatic ring\'s stabilization works AGAINST substitution ' +
      'here, not for it (special conditions, like very high temperature/pressure with ' +
      'strong nucleophiles, or specific catalyzed pathways, are needed to force haloarene ' +
      'substitution). Second trap: "The classification primary/secondary/tertiary for ' +
      'haloalkanes refers to how many HALOGENS are attached to the carbon." FALSE — it ' +
      'refers to how many OTHER CARBON atoms are attached to the halogen-bearing carbon, ' +
      'completely independent of halogen count (which is typically just 1 in simple ' +
      'monohalogenated compounds).',
    targetedMisconceptions: [`${HALINTRO}:MC1`, `${HALINTRO}:MC2`],
    source: `${HALINTRO_SRC} — misconception: haloarenes are more reactive than haloalkanes; primary/secondary refers to halogen count`,
  },
]

const HALINTRO_PROBES: SeedProbe[] = [
  {
    conceptId: HALINTRO,
    subjectSlug: 'chemistry',
    probeKind: 'mcq',
    gradeBand: GradeBand.HIGH,
    stem: 'Chlorobenzene (a haloarene) resists the same nucleophilic substitution conditions that readily convert chloroethane (a haloalkane) to a different product. Why is chlorobenzene so much less reactive?',
    choices: [
      { text: 'Chlorine\'s lone pair delocalizes into the aromatic π system (resonance, +M effect), giving the C-Cl bond partial double-bond character that strengthens it and makes chlorine a much poorer leaving group', isCorrect: true },
      { text: 'This is inconsistent — the aromatic ring should provide extra stabilization that makes chlorobenzene MORE reactive toward substitution, not less', isCorrect: false, misconceptionId: `${HALINTRO}:MC1` },
    ],
    correctValue: 'Resonance strengthens the C-Cl bond, reducing reactivity',
    difficulty: ProbeDifficulty.PROFICIENT,
    targetedMisconceptions: [`${HALINTRO}:MC1`],
    source: `${HALINTRO_SRC} — distractor targets assuming aromatic stabilization increases substitution reactivity`,
  },
  {
    conceptId: HALINTRO,
    subjectSlug: 'chemistry',
    probeKind: 'misconception_probe',
    gradeBand: GradeBand.HIGH,
    stem: 'In classifying a haloalkane as primary, secondary, or tertiary, does this classification depend on how many HALOGEN atoms are attached to the carbon?',
    choices: [
      { text: 'No — it depends on how many OTHER CARBON atoms are attached to the halogen-bearing carbon, completely independent of the number of halogens present', isCorrect: true },
      { text: 'Yes — primary means one halogen, secondary means two halogens, and tertiary means three halogens attached to that carbon', isCorrect: false, misconceptionId: `${HALINTRO}:MC2` },
    ],
    correctValue: 'No — classification is based on attached carbons, not halogens',
    difficulty: ProbeDifficulty.DEVELOPING,
    targetedMisconceptions: [`${HALINTRO}:MC2`],
    source: `${HALINTRO_SRC} — misconception: primary/secondary/tertiary classification is based on halogen count`,
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
  ...SUBAT_EXPLANATIONS,
  ...EMR_EXPLANATIONS,
  ...THSYS_EXPLANATIONS,
  ...KMT_EXPLANATIONS,
  ...ATMO_EXPLANATIONS,
  ...COLL_EXPLANATIONS,
  ...PERCL_EXPLANATIONS,
  ...SPEC_EXPLANATIONS,
  ...PHOTO_EXPLANATIONS,
  ...ELCOND_EXPLANATIONS,
  ...THFL_EXPLANATIONS,
  ...GASL_EXPLANATIONS,
  ...BOHR_EXPLANATIONS,
  ...RATE_EXPLANATIONS,
  ...SOLT_EXPLANATIONS,
  ...ENTH_EXPLANATIONS,
  ...ENTR_EXPLANATIONS,
  ...AIRPOL_EXPLANATIONS,
  ...WATSOL_EXPLANATIONS,
  ...EMUL_EXPLANATIONS,
  ...HEATC_EXPLANATIONS,
  ...MMGAS_EXPLANATIONS,
  ...REALG_EXPLANATIONS,
  ...QNUM_EXPLANATIONS,
  ...ORBIT_EXPLANATIONS,
  ...PHOTOC_EXPLANATIONS,
  ...RATEL_EXPLANATIONS,
  ...ARRH_EXPLANATIONS,
  ...SOLUB_EXPLANATIONS,
  ...GIBBS_EXPLANATIONS,
  ...THIRDL_EXPLANATIONS,
  ...OZONE_EXPLANATIONS,
  ...ECONF_EXPLANATIONS,
  ...QMM_EXPLANATIONS,
  ...MODPER_EXPLANATIONS,
  ...PERPROP_EXPLANATIONS,
  ...EQCON_EXPLANATIONS,
  ...KCKP_EXPLANATIONS,
  ...KWPH_EXPLANATIONS,
  ...MECH_EXPLANATIONS,
  ...INTRATE_EXPLANATIONS,
  ...CATAL_EXPLANATIONS,
  ...ADSORB_EXPLANATIONS,
  ...CELLTH_EXPLANATIONS,
  ...IONE_EXPLANATIONS,
  ...EAFF_EXPLANATIONS,
  ...ARAD_EXPLANATIONS,
  ...VALEN_EXPLANATIONS,
  ...LECHAT_EXPLANATIONS,
  ...ACBASE_EXPLANATIONS,
  ...KSPEQ_EXPLANATIONS,
  ...IONB_EXPLANATIONS,
  ...COVB_EXPLANATIONS,
  ...METB_EXPLANATIONS,
  ...REDOX_EXPLANATIONS,
  ...WEAKAB_EXPLANATIONS,
  ...BUFFER_EXPLANATIONS,
  ...HYDROL_EXPLANATIONS,
  ...TITR_EXPLANATIONS,
  ...VSEPR_EXPLANATIONS,
  ...HYBRID_EXPLANATIONS,
  ...RESON_EXPLANATIONS,
  ...BPARAM_EXPLANATIONS,
  ...COORDB_EXPLANATIONS,
  ...COMPLEQ_EXPLANATIONS,
  ...HYDR_EXPLANATIONS,
  ...CHROMA_EXPLANATIONS,
  ...GRAVI_EXPLANATIONS,
  ...HETCAT_EXPLANATIONS,
  ...IUPAC_EXPLANATIONS,
  ...CRYST_EXPLANATIONS,
  ...DBLOCK_EXPLANATIONS,
  ...G13_EXPLANATIONS,
  ...G14_EXPLANATIONS,
  ...G15_EXPLANATIONS,
  ...G16_EXPLANATIONS,
  ...ALKALI_EXPLANATIONS,
  ...G17_EXPLANATIONS,
  ...G18_EXPLANATIONS,
  ...REDBAL_EXPLANATIONS,
  ...BONDH_EXPLANATIONS,
  ...ALKEARTH_EXPLANATIONS,
  ...ACTSER_EXPLANATIONS,
  ...MOTHY_EXPLANATIONS,
  ...POLARM_EXPLANATIONS,
  ...PACK_EXPLANATIONS,
  ...DEFECT_EXPLANATIONS,
  ...AMORPH_EXPLANATIONS,
  ...WERNER_EXPLANATIONS,
  ...COORDNOM_EXPLANATIONS,
  ...ORGHYB_EXPLANATIONS,
  ...ALKANE_EXPLANATIONS,
  ...ISOM_EXPLANATIONS,
  ...ELECEFF_EXPLANATIONS,
  ...AROM_EXPLANATIONS,
  ...IMF_EXPLANATIONS,
  ...ORGSPEC_EXPLANATIONS,
  ...PURIF_EXPLANATIONS,
  ...GALV_EXPLANATIONS,
  ...DISPROP_EXPLANATIONS,
  ...REDOXTITR_EXPLANATIONS,
  ...VOLUM_EXPLANATIONS,
  ...CFT_EXPLANATIONS,
  ...COORDBOND_EXPLANATIONS,
  ...COORDAPP_EXPLANATIONS,
  ...STABCON_EXPLANATIONS,
  ...COORDISOM_EXPLANATIONS,
  ...HALINTRO_EXPLANATIONS,
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
  ...SUBAT_PROBES,
  ...EMR_PROBES,
  ...THSYS_PROBES,
  ...KMT_PROBES,
  ...ATMO_PROBES,
  ...COLL_PROBES,
  ...PERCL_PROBES,
  ...SPEC_PROBES,
  ...PHOTO_PROBES,
  ...ELCOND_PROBES,
  ...THFL_PROBES,
  ...GASL_PROBES,
  ...BOHR_PROBES,
  ...RATE_PROBES,
  ...SOLT_PROBES,
  ...ENTH_PROBES,
  ...ENTR_PROBES,
  ...AIRPOL_PROBES,
  ...WATSOL_PROBES,
  ...EMUL_PROBES,
  ...HEATC_PROBES,
  ...MMGAS_PROBES,
  ...REALG_PROBES,
  ...QNUM_PROBES,
  ...ORBIT_PROBES,
  ...PHOTOC_PROBES,
  ...RATEL_PROBES,
  ...ARRH_PROBES,
  ...SOLUB_PROBES,
  ...GIBBS_PROBES,
  ...THIRDL_PROBES,
  ...OZONE_PROBES,
  ...ECONF_PROBES,
  ...QMM_PROBES,
  ...MODPER_PROBES,
  ...PERPROP_PROBES,
  ...EQCON_PROBES,
  ...KCKP_PROBES,
  ...KWPH_PROBES,
  ...MECH_PROBES,
  ...INTRATE_PROBES,
  ...CATAL_PROBES,
  ...ADSORB_PROBES,
  ...CELLTH_PROBES,
  ...IONE_PROBES,
  ...EAFF_PROBES,
  ...ARAD_PROBES,
  ...VALEN_PROBES,
  ...LECHAT_PROBES,
  ...ACBASE_PROBES,
  ...KSPEQ_PROBES,
  ...IONB_PROBES,
  ...COVB_PROBES,
  ...METB_PROBES,
  ...REDOX_PROBES,
  ...WEAKAB_PROBES,
  ...BUFFER_PROBES,
  ...HYDROL_PROBES,
  ...TITR_PROBES,
  ...VSEPR_PROBES,
  ...HYBRID_PROBES,
  ...RESON_PROBES,
  ...BPARAM_PROBES,
  ...COORDB_PROBES,
  ...COMPLEQ_PROBES,
  ...HYDR_PROBES,
  ...CHROMA_PROBES,
  ...GRAVI_PROBES,
  ...HETCAT_PROBES,
  ...IUPAC_PROBES,
  ...CRYST_PROBES,
  ...DBLOCK_PROBES,
  ...G13_PROBES,
  ...G14_PROBES,
  ...G15_PROBES,
  ...G16_PROBES,
  ...ALKALI_PROBES,
  ...G17_PROBES,
  ...G18_PROBES,
  ...REDBAL_PROBES,
  ...BONDH_PROBES,
  ...ALKEARTH_PROBES,
  ...ACTSER_PROBES,
  ...MOTHY_PROBES,
  ...POLARM_PROBES,
  ...PACK_PROBES,
  ...DEFECT_PROBES,
  ...AMORPH_PROBES,
  ...WERNER_PROBES,
  ...COORDNOM_PROBES,
  ...ORGHYB_PROBES,
  ...ALKANE_PROBES,
  ...ISOM_PROBES,
  ...ELECEFF_PROBES,
  ...AROM_PROBES,
  ...IMF_PROBES,
  ...ORGSPEC_PROBES,
  ...PURIF_PROBES,
  ...GALV_PROBES,
  ...DISPROP_PROBES,
  ...REDOXTITR_PROBES,
  ...VOLUM_PROBES,
  ...CFT_PROBES,
  ...COORDBOND_PROBES,
  ...COORDAPP_PROBES,
  ...STABCON_PROBES,
  ...COORDISOM_PROBES,
  ...HALINTRO_PROBES,
]

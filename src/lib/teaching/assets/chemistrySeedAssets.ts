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
]

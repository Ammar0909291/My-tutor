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
]

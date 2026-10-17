/**
 * CHEMISTRY CARD-DEPTH CAMPAIGN — Batch 13 (chem.hyd.alkanes, chem.org.isomerism, chem.bond.intermolecular, chem.elect.galvanic-cell, chem.elect.corrosion and chem.hal.sn2 (need-three concepts, part 2), 18 cards).
 *
 * WHY THIS EXISTS (docs/history/learner-experience-backlog-plan-2026-10-16.md §3-§5)
 * Measured 2026-10-16: most chemistry concepts hold fewer than three authored cards
 * with 3+ options (151 of 186 concepts, 247 cards short). Owner decision 3 (2026-10-07,
 * `turnContract.certifiesMastery`) makes a 2-option card practice-only once a concept
 * holds three such cards, so a blind guess on the remaining 2-option cards would
 * otherwise still count towards mastery. Owner decision (2026-10-17, "go ahead"): ADD
 * new 3-option cards (Path A) rather than edit existing identities, so the create-only
 * bootstrap delivers them with no content sync.
 *
 * WHAT A CARD IS HERE
 * Three options: the correct answer plus one wrong answer for each of two of the
 * concept's registered misconceptions (ids read off the concept's own existing probes,
 * so none is invented); a wrong answer that matches no registered misconception carries
 * no id. Every stem is a NEW worked example. Facts come only from the concept's
 * blueprint (docs/curriculum/blueprints/<concept>.md — Misconception Library,
 * Replacement and Discrimination-pair entries).
 *
 * SLOTS (the P-10 constraint)
 * A (conceptId, probeKind, gradeBand) slot that already holds a probe must never gain a
 * second one: `buildProbeSlugResolver` would promote the whole slot to a 5-segment slug
 * and abandon the live row's identity. Each chemistry concept in this batch holds one two-option card in each of mcq, misconception_probe, checkpoint, step_check and true_false, so the three new cards take the FREE slots short_answer, fill_blank and numeric (the kind is only a slot label).
 * Serving never filters by probeKind (`probeToMcq` is the predicate), so the kind is
 * only a slot label.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'chemistry'
const H = GradeBand.HIGH
const U = GradeBand.UNDERGRADUATE

type Kind = 'short_answer' | 'fill_blank' | 'true_false' | 'step_check' | 'numeric'

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
    source: `docs/curriculum/blueprints/${conceptId}.md — Misconception Library; ${note}`,
  }
}

export const CHEMISTRY_CARD_DEPTH_BATCH_13: SeedProbe[] = [
  // ─── chem.hyd.alkanes ────────────────────────────────────────────────────
  card('chem.hyd.alkanes', 'short_answer', H,
    'In the radical chlorination of ethane, a student says the first step, Cl₂ → 2 Cl•, is where the product C₂H₅Cl forms. Which statement is correct?',
    'Initiation only makes radicals; C₂H₅Cl forms in propagation, when C₂H₅• reacts with Cl₂',
    ['The product forms in initiation, since the Cl• atoms formed there attack ethane at once', 'MC1'],
    ['The product forms only in termination, when two radicals combine and end the chain', ''],
    'MC1 initiation makes no product, re-asked with ethane'),
  card('chem.hyd.alkanes', 'fill_blank', H,
    'Complete the sentence: in ethane at room temperature, the staggered form is ____ the eclipsed form.',
    'lower in energy than (by about 12 kJ/mol), although rotation between them is fast',
    ['equal in energy to the eclipsed form, since rotation about C–C is free', 'MC3'],
    ['locked in place, with no rotation to the eclipsed form, because the C–C barrier is over 250 kJ/mol', ''],
    'MC3 free rotation does not mean equal energy, re-asked with ethane'),
  card('chem.hyd.alkanes', 'numeric', H,
    'Propane reacts separately with chlorine and with bromine. Which outcome is correct?',
    'Chlorine gives a mixture of 1- and 2-chloropropane; bromine mostly 2-bromopropane',
    ['Chlorine is more electronegative and so choosier, giving almost only 2-chloropropane', 'MC2'],
    ['Both halogens give the same mixture, because the halogen does not affect which hydrogen is taken', ''],
    'MC2 the less reactive Br• is the more selective, re-asked with propane'),

  // ─── chem.org.isomerism ──────────────────────────────────────────────────
  card('chem.org.isomerism', 'short_answer', H,
    'Compound P is (R) and rotates plane-polarised light to the right (+). Compound Q is also (R) but rotates it to the left (−). Which statement is correct?',
    'Both can exist: R/S comes from CIP rules, while the sign of rotation must be measured by polarimetry',
    ['Q cannot exist, because every (R) compound is dextrorotatory, R meaning clockwise rotation', 'MC1'],
    ['P and Q must be enantiomers of each other, since their rotations are opposite', ''],
    'MC1 R/S does not predict the sign of rotation, re-asked with P and Q'),
  card('chem.org.isomerism', 'fill_blank', H,
    'Complete the sentence: a pure sample of meso-2,3-dibromobutane is optically inactive because ____.',
    'the molecule is itself achiral, with an internal plane of symmetry',
    ['its two stereocentres rotate light in opposite directions and cancel each other out exactly', 'MC2'],
    ['it is a 50:50 mixture of two enantiomers whose rotations cancel', ''],
    'MC2 meso is one achiral molecule, not cancelling contributions, re-asked with meso-2,3-dibromobutane'),
  card('chem.org.isomerism', 'numeric', H,
    'Cis- and trans-but-2-ene, and the staggered and eclipsed forms of ethane, are each different arrangements of the same atoms. Which statement is correct?',
    'Only cis/trans-but-2-ene: they swap by bond breaking (~200+ kJ/mol), ethane\'s forms by rotation (~12 kJ/mol)',
    ['All four forms are true stereoisomers, since each pair has the same atoms in different 3-D arrangements, which is all that stereoisomerism requires', 'MC3'],
    ['Only the ethane pair is stereoisomeric, because rotation about a bond is what creates stereoisomers and but-2-ene cannot rotate', ''],
    'MC3 conformers are the same compound, re-asked with but-2-ene versus ethane'),

  // ─── chem.bond.intermolecular ────────────────────────────────────────────
  card('chem.bond.intermolecular', 'short_answer', H,
    'When liquid water boils, a student says the O–H covalent bonds break, because a hydrogen bond is just a strong covalent bond. Which statement is correct?',
    'Boiling overcomes the hydrogen bonds (~20 kJ/mol); the O–H bonds (~464 kJ/mol) stay intact, so the steam is still H₂O',
    ['Boiling breaks the O–H bonds, since a hydrogen bond is a covalent bond of the same kind', 'MC1'],
    ['Boiling overcomes only the London dispersion forces, since the hydrogen bonds are too strong to break', ''],
    'MC1 hydrogen bonds are not covalent bonds, re-asked with boiling water'),
  card('chem.bond.intermolecular', 'fill_blank', H,
    'Complete the sentence: liquid pentane, a nonpolar hydrocarbon, is held together by ____.',
    'London dispersion forces, the only intermolecular force it has',
    ['no intermolecular forces at all, since it has no polarity', 'MC2'],
    ['dipole-dipole forces, because every molecule has some permanent dipole', ''],
    'MC2 nonpolar molecules still have dispersion forces, re-asked with pentane'),
  card('chem.bond.intermolecular', 'numeric', H,
    'Most solids sink in their own liquid, yet ice floats on liquid water. Which statement is correct?',
    'Water is the exception: ice\'s open hydrogen-bonded lattice is less dense than liquid water',
    ['Every solid is denser than its liquid, so ice floats only because air bubbles are trapped in it', 'MC3'],
    ['Ice floats because there are no hydrogen bonds in the solid, which leaves gaps between its molecules', ''],
    'MC3 ice is less dense than water, re-asked with the general rule'),

  // ─── chem.elect.galvanic-cell ────────────────────────────────────────────
  card('chem.elect.galvanic-cell', 'short_answer', H,
    'In a cell made from Al (E° = −1.66 V) and Zn (E° = −0.76 V), which electrode is the anode?',
    'Aluminium, because its more negative E° means oxidation happens there',
    ['Zinc, because it is the less negative metal and so the more easily oxidised of the two', 'MC1'],
    ['Whichever electrode is drawn on the left of the cell diagram, whatever the E° values are', ''],
    'MC1 check the direction from E°, re-asked with Al and Zn'),
  card('chem.elect.galvanic-cell', 'fill_blank', H,
    'Complete the sentence: scaling Zn + Cu²⁺ → Zn²⁺ + Cu up to 2Zn + 2Cu²⁺ → 2Zn²⁺ + 2Cu changes n to ____.',
    '4, while E°cell stays the same',
    ['2, because n is a property of the Zn/Cu pair and cannot change', 'MC2'],
    ['4, and E°cell doubles along with it, since the equation has been doubled', ''],
    'MC2 n follows the balanced equation as written, re-asked with the doubled Zn/Cu equation'),
  card('chem.elect.galvanic-cell', 'numeric', H,
    'Which statement about the circuit of a working Zn|Cu cell with a KNO₃ salt bridge is correct?',
    'Electrons flow only in the external wire, while K⁺ and NO₃⁻ ions move through the salt bridge to keep each half-cell neutral',
    ['Electrons pass through both the wire and the salt bridge, and together these complete the circuit', 'MC3'],
    ['The salt bridge supplies the electrons that flow through the wire, as its ions react at the electrodes', ''],
    'MC3 the salt bridge carries ions, not electrons, re-asked with KNO₃'),

  // ─── chem.elect.corrosion ────────────────────────────────────────────────
  card('chem.elect.corrosion', 'short_answer', H,
    'Food cans are tin-plated steel. Once a dent exposes the iron and the can stays damp, what happens?',
    'Tin (E° = −0.14 V) is less negative than iron, so it is only a barrier and the exposed iron corrodes faster',
    ['The tin sacrifices itself and keeps protecting the iron through the dent, as zinc does', 'MC1'],
    ['Corrosion is unchanged, since a damaged coating of any metal leaves the iron as if it had no coating', ''],
    'MC1 tin is a barrier only, zinc is sacrificial, re-asked with a dented can'),
  card('chem.elect.corrosion', 'fill_blank', H,
    'Complete the sentence: the Fe²⁺ ions released at the anodic site ____.',
    'migrate through the water to the cathodic site, where the rust forms',
    ['stay where they form, so the rust sits exactly on the spot where the iron dissolved', 'MC2'],
    ['are reduced back to iron at the same spot, so no metal is lost overall and the rust is only a surface stain', ''],
    'MC2 rust and metal loss are in different places, re-asked with the migrating Fe²⁺'),
  card('chem.elect.corrosion', 'numeric', H,
    'A buried steel pipeline is connected to a block of magnesium. Which statement about this cathodic protection is correct?',
    'The pipeline is forced to be the cathode and resists oxidation, while the magnesium (the anode) corrodes in its place',
    ['"Cathodic protection" means the cathode is the part guarded, so the magnesium is protected and the pipe is the anode', 'MC3'],
    ['The magnesium block works as a barrier coating, keeping the water off the pipe', ''],
    'MC3 the structure becomes the cathode and the anode corrodes, re-asked with a magnesium block'),

  // ─── chem.hal.sn2 ────────────────────────────────────────────────────────
  card('chem.hal.sn2', 'short_answer', H,
    'Two chiral bromides react: (i) a primary one with a strong nucleophile in a polar aprotic solvent; (ii) a secondary one in a polar protic solvent. Which statement is correct?',
    '(i) gives clean inversion by pure SN2, while (ii) gives only partial inversion because SN1 competes',
    ['Both give 100% inversion, because any SN2 pathway always inverts cleanly whatever the substrate and the solvent', 'MC1'],
    ['(ii) gives clean inversion and (i) gives racemisation, since aprotic solvents favour carbocations', ''],
    'MC1 clean inversion needs a primary substrate and an aprotic solvent, re-asked with two bromides'),
  card('chem.hal.sn2', 'fill_blank', H,
    'Complete the sentence: in methanol, toward a primary haloalkane, iodide is ____ fluoride as a nucleophile.',
    'a faster nucleophile than, because I⁻ sheds its solvent more easily despite being the weaker base',
    ['a slower nucleophile than, because fluoride is the stronger base and so the better nucleophile', 'MC2'],
    ['an equal nucleophile to, because both are halide ions of the same charge', ''],
    'MC2 nucleophilicity in a protic solvent differs from basicity, re-asked with I⁻ and F⁻'),
  card('chem.hal.sn2', 'numeric', H,
    'Which energy profile describes the concerted SN2 reaction of CH₃Br with OH⁻?',
    'One hump (a single transition state) and no dip, as bond making and breaking are simultaneous',
    ['Two humps with a dip between them, the dip being a carbocation intermediate', 'MC3'],
    ['A smooth downhill slope with no maximum at all, because the overall reaction is exothermic and so needs no barrier', ''],
    'MC3 SN2 has one transition state and no intermediate, re-asked as a profile'),
]

/**
 * CHEMISTRY: probe DEPTH — the same zero-slack problem, and a different
 * structural obstacle.
 *
 * ── WHY CHEMISTRY IS ON THE SAME CRITICAL PATH ──────────────────────────────
 * Session A's 12-concept chemistry baseline against the deployed app (commit
 * 71624d4) reproduced the physics ceiling almost exactly: mean keyed probes
 * served 2.82, and mean turns after the last keyed probe 1.8 when the learner
 * mastered against 8.3 when they did not. Two of the three failures served
 * their entire three-probe pool, got ONE wrong, and then sat through five
 * silent turns.
 *
 * Mastery needs three graded correct answers and `excludeProbeStem` never
 * re-asks a spent probe. At exactly three there is no slack at all, so the
 * learner who needs remediation is the learner the concept then refuses to
 * certify. That is not subject-specific, and neither is the fix.
 *
 * ── THE OBSTACLE THAT IS SPECIFIC TO CHEMISTRY ──────────────────────────────
 * `physicsDepthSeedAssets.ts` could put almost every addition into a free
 * difficulty rung of an mcq slot that was ALREADY a ladder. Chemistry cannot:
 * its seed template gave each concept exactly ONE probe of each kind, so
 * measured across all 186 concepts, EVERY (conceptId, probeKind, gradeBand)
 * slot is a singleton and there is not one ladder in the subject.
 *
 * That matters because `buildProbeSlugResolver` appends a difficulty segment
 * only to a slot holding more than one probe. Adding a second probe to a
 * one-probe slot therefore re-identifies the probe already seeded there: the
 * old row stays ACTIVE under the old slug, the same question serves under two
 * identities, and the count rises while the number of distinct questions
 * falls. Doing that across 158 pairs would have produced 158 duplicate serves.
 *
 * So every probe here opens a BRAND-NEW slot, which has no existing row to
 * orphan. `numeric` and `fill_blank` are unused across all 186 chemistry
 * concepts, which is what makes them available.
 *
 * ── WHY A NON-mcq KIND IS STILL SERVED, VERIFIED RATHER THAN ASSUMED ────────
 * Selection does not filter on probe kind. `teachingActionRepository` filters
 * candidates with `probeToMcq` ITSELF — its own comment explains why: "A
 * familyKind allowlist would be a second, drifting definition of gradeable."
 * And `probeToMcq` (gateAssessment.ts) never reads the kind. It requires a
 * non-empty stem, between 2 and 4 choices, no empty option text, no duplicate
 * option text, and exactly one choice marked correct.
 *
 * Chemistry's own corpus already relies on this: its existing gradeable pools
 * span mcq, misconception_probe, checkpoint and step_check together.
 *
 * The kinds are chosen to be honest about the item, not merely to be free:
 * `numeric` carries calculations whose options are quantities, and
 * `fill_blank` carries genuine completion stems. Neither is a relabelled mcq.
 *
 * ── QUALITY BAR, unchanged from the physics file ────────────────────────────
 * Four options where the question supports four; every distractor an error a
 * chemistry learner actually makes; exactly one keyed answer; stems that are
 * answerable from what they state; no learner name and no turn-scoped
 * discourse; and no stem repeating one the same concept already asks.
 * `misconceptionId` is attached only where a blueprint registry names that
 * exact error. Guarded by `probeInventoryDepth.test.ts` across the whole
 * corpus.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'chemistry'
const src = (concept: string, what: string) =>
  `docs/curriculum/blueprints/${concept}.md — Misconception Registry; ${what} (probe-depth set, chemistry 2026-08-30)`

// ═══════════════════════════════════════════════════════════════════════════
// BATCH C1 — chem.alc, chem.anal, chem.atomic, chem.bio, chem.bond @ HIGH
// ═══════════════════════════════════════════════════════════════════════════

const CHEM_A: SeedProbe[] = [
  {
    conceptId: 'chem.alc.alcohols', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many structural isomers have the molecular formula C₄H₉OH?',
    choices: [
      { text: 'Four — butan-1-ol, butan-2-ol, 2-methylpropan-1-ol and 2-methylpropan-2-ol', isCorrect: true },
      { text: 'Two — a straight chain and a branched one', isCorrect: false },
      { text: 'Three', isCorrect: false },
      { text: 'Five', isCorrect: false },
    ],
    correctValue: '4',
    targetedMisconceptions: [],
    source: src('chem.alc.alcohols', 'chain branching AND position of the –OH both generate isomers, so counting only one of the two gives two or three — the concept\'s existing probes are all about oxidation and never about structure'),
  },
  {
    conceptId: 'chem.alc.ethers', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Ethers boil at much lower temperatures than alcohols of similar molecular mass, because an ether molecule cannot ______ another ether molecule.',
    choices: [
      { text: 'donate a hydrogen bond to — it has no O–H group, only an oxygen that can accept one', isCorrect: true },
      { text: 'form any dipole–dipole attraction with', isCorrect: false },
      { text: 'dissolve in', isCorrect: false },
      { text: 'form a covalent bond with', isCorrect: false },
    ],
    correctValue: 'donate a hydrogen bond',
    targetedMisconceptions: [],
    source: src('chem.alc.ethers', 'an ether ACCEPTS hydrogen bonds and cannot donate them, which is why it dissolves in water yet boils low — the second option denies dipole attraction altogether, which would make the C–O–C bond non-polar'),
  },
  {
    conceptId: 'chem.alc.phenols', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Phenol reacts with excess bromine water to give an immediate white precipitate. How many bromine atoms substitute onto the ring?',
    choices: [
      { text: 'Three — at the 2, 4 and 6 positions', isCorrect: true },
      { text: 'One', isCorrect: false },
      { text: 'Two', isCorrect: false },
      { text: 'Six — every ring position', isCorrect: false },
    ],
    correctValue: '3',
    targetedMisconceptions: [],
    source: src('chem.alc.phenols', 'the –OH group activates the ring so strongly that substitution runs to completion at all three available ortho and para positions, with no catalyst — benzene itself needs a halogen carrier and gives mono-substitution'),
  },
  {
    conceptId: 'chem.alc.phenols', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Phenol undergoes electrophilic substitution far more readily than benzene because the –OH group ______ the ring.',
    choices: [
      { text: 'donates electron density into — an oxygen lone pair delocalises into the ring system', isCorrect: true },
      { text: 'withdraws electron density from', isCorrect: false },
      { text: 'removes all electron density from', isCorrect: false },
      { text: 'has no electronic effect on', isCorrect: false },
    ],
    correctValue: 'donates electron density into',
    targetedMisconceptions: [],
    source: src('chem.alc.phenols', 'the same lone-pair delocalisation explains BOTH the ring activation and the acidity of phenol, which is what the concept\'s existing pKa probes assume; oxygen being electronegative makes "withdraws" the intuitive and wrong answer'),
  },
  {
    conceptId: 'chem.anal.chromatography', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'On a chromatogram a spot travels 4.5 cm from the origin while the solvent front travels 9.0 cm. What is the Rf value of that spot?',
    choices: [
      { text: '0.50', isCorrect: true },
      { text: '2.0 — solvent distance divided by spot distance', isCorrect: false },
      { text: '4.5 — the distance the spot travelled', isCorrect: false },
      { text: '0.045', isCorrect: false },
    ],
    correctValue: '0.50',
    targetedMisconceptions: [],
    source: src('chem.anal.chromatography', 'Rf = spot distance / solvent front distance, so it can never exceed 1 — which makes the 2.0 option self-evidently wrong once that bound is known, and it is the bound that gives Rf its diagnostic value'),
  },
  {
    conceptId: 'chem.anal.chromatography', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In paper chromatography the paper, with the water bound to it, is the ______ phase, and the solvent rising through it is the ______ phase.',
    choices: [
      { text: 'stationary … mobile', isCorrect: true },
      { text: 'mobile … stationary', isCorrect: false },
      { text: 'stationary … stationary', isCorrect: false },
      { text: 'mobile … mobile', isCorrect: false },
    ],
    correctValue: 'stationary then mobile',
    targetedMisconceptions: [],
    source: src('chem.anal.chromatography', 'separation depends on a compound partitioning BETWEEN the two phases, so which is which decides the whole interpretation — and the reversed option is what makes a normal-phase result read like a reversed-phase one'),
  },
  {
    conceptId: 'chem.anal.gravimetric', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A chloride determination yields 1.435 g of dry silver chloride (M = 143.5 g/mol). How many moles of chloride ion were in the original sample?',
    choices: [
      { text: '0.0100 mol', isCorrect: true },
      { text: '0.100 mol', isCorrect: false },
      { text: '1.435 mol — the mass, read as a mole count', isCorrect: false },
      { text: '143.5 mol', isCorrect: false },
    ],
    correctValue: '0.0100 mol',
    targetedMisconceptions: [],
    source: src('chem.anal.gravimetric', 'n = m/M = 1.435/143.5 = 0.0100 mol, and AgCl carries one chloride per formula unit so the ratio is 1:1 — the whole method depends on that stoichiometric link being stated rather than assumed'),
  },
  {
    conceptId: 'chem.anal.gravimetric', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In a gravimetric determination the precipitate is filtered, washed, and then heated and reweighed repeatedly until it reaches ______.',
    choices: [
      { text: 'constant mass — successive weighings agreeing, which shows all the water has gone', isCorrect: true },
      { text: 'a fixed volume', isCorrect: false },
      { text: 'its melting point', isCorrect: false },
      { text: 'a neutral pH', isCorrect: false },
    ],
    correctValue: 'constant mass',
    targetedMisconceptions: [],
    source: src('chem.anal.gravimetric', 'constant mass is the experimental TEST that drying is complete; without it, residual water is weighed as product and every result is high — which is the commonest source of error in the technique'),
  },
  {
    conceptId: 'chem.anal.volumetric', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: '25.0 cm³ of sodium hydroxide solution is exactly neutralised by 20.0 cm³ of 0.100 mol/dm³ hydrochloric acid. The reaction is 1:1. What is the concentration of the alkali?',
    choices: [
      { text: '0.0800 mol/dm³', isCorrect: true },
      { text: '0.125 mol/dm³ — the volume ratio taken the other way up', isCorrect: false },
      { text: '0.100 mol/dm³ — the same as the acid', isCorrect: false },
      { text: '0.0500 mol/dm³', isCorrect: false },
    ],
    correctValue: '0.0800 mol/dm^3',
    targetedMisconceptions: [],
    source: src('chem.anal.volumetric', 'moles of acid = 0.0200 × 0.100 = 2.00e-3, in 0.0250 dm³ of alkali gives 0.0800 mol/dm³. The LARGER volume must hold the LOWER concentration, which is the sanity check that catches the inverted ratio'),
  },
  {
    conceptId: 'chem.anal.volumetric', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A solution whose concentration is known accurately because it was made by weighing a pure, stable, non-hygroscopic solid is called a ______ solution.',
    choices: [
      { text: 'primary standard', isCorrect: true },
      { text: 'saturated', isCorrect: false },
      { text: 'buffer', isCorrect: false },
      { text: 'molar', isCorrect: false },
    ],
    correctValue: 'primary standard',
    targetedMisconceptions: [],
    source: src('chem.anal.volumetric', 'this is precisely why sodium hydroxide cannot be one — it absorbs water and carbon dioxide from the air, which is the point of the concept\'s existing weigh-out-NaOH probe'),
  },
  {
    conceptId: 'chem.atomic.atomic-spectra', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'An emission spectrum shows bright lines on a dark background. An absorption spectrum of the same element shows ______.',
    choices: [
      { text: 'dark lines on a continuous background, at exactly the same wavelengths', isCorrect: true },
      { text: 'bright lines, but at completely different wavelengths', isCorrect: false },
      { text: 'a uniformly dark field with no features at all', isCorrect: false },
      { text: 'an unbroken rainbow with no lines of any kind', isCorrect: false },
    ],
    correctValue: 'dark lines at the same wavelengths',
    targetedMisconceptions: [],
    source: src('chem.atomic.atomic-spectra', 'the wavelengths MATCH because the same energy gaps govern both absorption and emission — which is what makes stellar absorption spectra usable for identifying elements millions of light years away'),
  },
  {
    conceptId: 'chem.atomic.atomic-theory', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Dalton postulated that all atoms of a given element are identical in every respect. That postulate was overturned by the discovery of ______.',
    choices: [
      { text: 'isotopes — atoms of one element differing in neutron number and therefore in mass', isCorrect: true },
      { text: 'the electron', isCorrect: false },
      { text: 'the nucleus', isCorrect: false },
      { text: 'ions', isCorrect: false },
    ],
    correctValue: 'isotopes',
    targetedMisconceptions: [],
    source: src('chem.atomic.atomic-theory', 'the electron and the nucleus overturned Dalton\'s INDIVISIBILITY postulate, not his identical-atoms one — so both are real refutations of a different claim, which is what makes them worth offering'),
  },
  {
    conceptId: 'chem.atomic.bohr-model', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The ground state of hydrogen lies at −13.6 eV, and level energies go as −13.6/n² eV. What is the energy of the n = 2 level?',
    choices: [
      { text: '−3.4 eV', isCorrect: true },
      { text: '−6.8 eV — halving rather than dividing by n²', isCorrect: false },
      { text: '−27.2 eV', isCorrect: false },
      { text: '+3.4 eV', isCorrect: false },
    ],
    correctValue: '-3.4 eV',
    targetedMisconceptions: [],
    source: src('chem.atomic.bohr-model', '−13.6/4 = −3.4 eV. The energy stays NEGATIVE because the electron is bound, so the +3.4 option is wrong about the physics rather than the arithmetic'),
  },
  {
    conceptId: 'chem.atomic.bohr-model', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the Bohr model, an atom emits a photon when an electron ______.',
    choices: [
      { text: 'drops from a higher allowed orbit to a lower one, the photon carrying exactly the energy difference', isCorrect: true },
      { text: 'jumps from a lower allowed orbit to a higher one', isCorrect: false },
      { text: 'travels steadily around a single allowed orbit', isCorrect: false },
      { text: 'leaves the atom altogether', isCorrect: false },
    ],
    correctValue: 'drops to a lower orbit',
    targetedMisconceptions: [],
    source: src('chem.atomic.bohr-model', 'the second option is ABSORPTION, offered because the direction is what learners reverse; the third is what classical physics predicted would radiate continuously, and Bohr\'s postulate that it does not is the whole model'),
  },
  {
    conceptId: 'chem.atomic.electromagnetic-radiation', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Moving across the electromagnetic spectrum towards LONGER wavelengths, the frequency ______ and the energy of each photon ______.',
    choices: [
      { text: 'decreases … decreases', isCorrect: true },
      { text: 'increases … increases', isCorrect: false },
      { text: 'decreases … increases', isCorrect: false },
      { text: 'increases … decreases', isCorrect: false },
    ],
    correctValue: 'decreases and decreases',
    targetedMisconceptions: [],
    source: src('chem.atomic.electromagnetic-radiation', 'both follow from c = fλ and E = hf, so frequency and photon energy always move together and both oppose wavelength — the two mixed options are the result of tracking one relation and forgetting the other'),
  },
  {
    conceptId: 'chem.atomic.electronic-config', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the maximum number of electrons a p sub-shell can hold?',
    choices: [
      { text: 'Six — three orbitals, each taking two electrons', isCorrect: true },
      { text: 'Two', isCorrect: false },
      { text: 'Three — one per orbital', isCorrect: false },
      { text: 'Ten', isCorrect: false },
    ],
    correctValue: '6',
    targetedMisconceptions: [],
    source: src('chem.atomic.electronic-config', 'the count is orbitals times two, so the three-option forgets spin pairing and the ten-option is the d sub-shell — the concept\'s existing probes are all about filling ORDER and never about capacity'),
  },
  {
    conceptId: 'chem.atomic.photoelectric-effect', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A metal has a work function of 3.0 eV. A photon of energy 5.0 eV strikes its surface. What is the maximum kinetic energy of the emitted electron?',
    choices: [
      { text: '2.0 eV', isCorrect: true },
      { text: '8.0 eV — adding the two energies', isCorrect: false },
      { text: '5.0 eV — the whole photon energy is transferred', isCorrect: false },
      { text: '1.7 eV', isCorrect: false },
    ],
    correctValue: '2.0 eV',
    targetedMisconceptions: [],
    source: src('chem.atomic.photoelectric-effect', 'KE_max = hf − φ = 5.0 − 3.0 = 2.0 eV. The 5.0 eV option ignores the escape cost entirely, which is exactly what the work function exists to charge'),
  },
  {
    conceptId: 'chem.atomic.quantum-numbers', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many orbitals are there altogether in the n = 3 shell?',
    choices: [
      { text: 'Nine — one 3s, three 3p and five 3d', isCorrect: true },
      { text: 'Three, one for each value of l', isCorrect: false },
      { text: 'Eighteen — the electron capacity of the shell', isCorrect: false },
      { text: 'Five', isCorrect: false },
    ],
    correctValue: '9',
    targetedMisconceptions: [],
    source: src('chem.atomic.quantum-numbers', 'n² orbitals in shell n, holding 2n² electrons — the eighteen-option gives the ELECTRON count where the ORBITAL count was asked, which is the same factor-of-two confusion as the p sub-shell probe'),
  },
  {
    conceptId: 'chem.atomic.subatomic-particles', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'An ion contains 26 protons, 30 neutrons and 23 electrons. What are its charge and its mass number?',
    choices: [
      { text: 'Charge 3+, mass number 56', isCorrect: true },
      { text: 'Charge 3−, mass number 56', isCorrect: false },
      { text: 'Charge 3+, mass number 49 — protons plus electrons', isCorrect: false },
      { text: 'Charge 3+, mass number 79 — all three particle counts added', isCorrect: false },
    ],
    correctValue: '3+ and 56',
    targetedMisconceptions: [],
    source: src('chem.atomic.subatomic-particles', 'FEWER electrons than protons means a POSITIVE ion, which is the sign learners invert; mass number counts protons and neutrons only, since electrons contribute negligible mass'),
  },
  {
    conceptId: 'chem.atomic.subatomic-particles', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Almost all of an atom\'s mass sits in its ______, while almost all of its volume is ______.',
    choices: [
      { text: 'nucleus … empty space', isCorrect: true },
      { text: 'electron cloud … the nucleus', isCorrect: false },
      { text: 'nucleus … filled by protons', isCorrect: false },
      { text: 'electron cloud … empty space', isCorrect: false },
    ],
    correctValue: 'nucleus and empty space',
    targetedMisconceptions: [],
    source: src('chem.atomic.subatomic-particles', 'the mass-volume split is the whole result of the gold-foil experiment, and it is what makes a nucleus roughly 10⁻¹⁵ m across inside an atom of 10⁻¹⁰ m'),
  },
  {
    conceptId: 'chem.bio.carbohydrates', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Glucose is C₆H₁₂O₆. Maltose is a disaccharide formed from two glucose units by a condensation reaction. How many carbon atoms does one maltose molecule contain?',
    choices: [
      { text: 'Twelve', isCorrect: true },
      { text: 'Six', isCorrect: false },
      { text: 'Eleven — one carbon is lost with the water', isCorrect: false },
      { text: 'Twenty-four', isCorrect: false },
    ],
    correctValue: '12',
    targetedMisconceptions: [],
    source: src('chem.bio.carbohydrates', 'condensation releases H₂O, so the disaccharide is C₁₂H₂₂O₁₁ — the OXYGEN count drops by one and the carbon count does not, which is what the eleven-carbon option gets wrong'),
  },
  {
    conceptId: 'chem.bio.carbohydrates', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Starch and cellulose are both polymers of glucose. Starch is built from ______ glycosidic links and cellulose from ______ ones.',
    choices: [
      { text: 'α … β', isCorrect: true },
      { text: 'β … α', isCorrect: false },
      { text: 'α … α', isCorrect: false },
      { text: 'β … β', isCorrect: false },
    ],
    correctValue: 'alpha then beta',
    targetedMisconceptions: [],
    source: src('chem.bio.carbohydrates', 'one anomeric difference is why humans digest starch and not cellulose, from an identical monomer — the concept\'s existing anomer probe establishes that α and β are genuinely different compounds, and this is the consequence'),
  },
  {
    conceptId: 'chem.bio.lipids', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many fatty acid chains are esterified to a single glycerol molecule in a triglyceride?',
    choices: [
      { text: 'Three — glycerol has three hydroxyl groups', isCorrect: true },
      { text: 'One', isCorrect: false },
      { text: 'Two', isCorrect: false },
      { text: 'Six', isCorrect: false },
    ],
    correctValue: '3',
    targetedMisconceptions: [],
    source: src('chem.bio.lipids', 'the number comes from glycerol\'s three –OH groups, which is also why hydrolysing one triglyceride yields three soap molecules — the arithmetic the concept\'s existing saponification probe depends on'),
  },
  {
    conceptId: 'chem.bio.lipids', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Boiling a triglyceride with aqueous sodium hydroxide gives glycerol together with the sodium ______ of the fatty acids. The reaction is called ______.',
    choices: [
      { text: 'salts … saponification', isCorrect: true },
      { text: 'esters … esterification', isCorrect: false },
      { text: 'alcohols … reduction', isCorrect: false },
      { text: 'amides … condensation', isCorrect: false },
    ],
    correctValue: 'salts and saponification',
    targetedMisconceptions: [],
    source: src('chem.bio.lipids', 'alkaline hydrolysis of an ester gives the carboxylate SALT, not the free acid — which is what makes the product a soap; the esterification option is the reverse reaction offered under its own name'),
  },
  {
    conceptId: 'chem.bio.nucleic-acids', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A sample of double-stranded DNA is found to be 30% adenine by base count. What percentage of its bases are guanine?',
    choices: [
      { text: '20%', isCorrect: true },
      { text: '30% — the same as adenine', isCorrect: false },
      { text: '40%', isCorrect: false },
      { text: '70%', isCorrect: false },
    ],
    correctValue: '20%',
    targetedMisconceptions: [],
    source: src('chem.bio.nucleic-acids', 'Chargaff\'s rules: A = T = 30%, leaving 40% shared equally between G and C, so G = 20%. The 30% option applies the pairing rule to the wrong partner, which is the step that has to be done in order'),
  },
  {
    conceptId: 'chem.bio.nucleic-acids', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In double-stranded DNA, adenine always pairs with ______ and guanine always pairs with ______.',
    choices: [
      { text: 'thymine … cytosine', isCorrect: true },
      { text: 'uracil … cytosine', isCorrect: false },
      { text: 'cytosine … thymine', isCorrect: false },
      { text: 'guanine … adenine', isCorrect: false },
    ],
    correctValue: 'thymine and cytosine',
    targetedMisconceptions: [],
    source: src('chem.bio.nucleic-acids', 'uracil replaces thymine in RNA, not DNA, so the second option is correct for a different molecule — which is exactly the distinction the concept\'s existing DNA-versus-RNA probe draws'),
  },
  {
    conceptId: 'chem.bio.proteins', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many peptide bonds are there in a linear tripeptide?',
    choices: [
      { text: 'Two', isCorrect: true },
      { text: 'Three — one per amino acid', isCorrect: false },
      { text: 'One', isCorrect: false },
      { text: 'Four', isCorrect: false },
    ],
    correctValue: '2',
    targetedMisconceptions: [],
    source: src('chem.bio.proteins', 'n residues give n − 1 bonds in a linear chain, the same counting as fence posts and rails — assuming one bond per residue is the natural and wrong reading'),
  },
  {
    conceptId: 'chem.bio.proteins', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two amino acids join in a condensation reaction that forms a ______ bond and releases ______.',
    choices: [
      { text: 'peptide … water', isCorrect: true },
      { text: 'glycosidic … water', isCorrect: false },
      { text: 'peptide … carbon dioxide', isCorrect: false },
      { text: 'ester … water', isCorrect: false },
    ],
    correctValue: 'peptide and water',
    targetedMisconceptions: [],
    source: src('chem.bio.proteins', 'the glycosidic and ester options are the corresponding links in carbohydrates and lipids — all three are condensations releasing water, so naming the right one is what distinguishes the biomolecule classes'),
  },
  {
    conceptId: 'chem.bio.vitamins', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Vitamin C is water-soluble, so an excess intake is largely ______. Vitamin A is fat-soluble, so an excess is instead ______.',
    choices: [
      { text: 'excreted in the urine … stored in body fat and the liver', isCorrect: true },
      { text: 'stored in body fat … excreted in the urine', isCorrect: false },
      { text: 'excreted in the urine … also excreted in the urine', isCorrect: false },
      { text: 'stored in the liver … also stored in the liver', isCorrect: false },
    ],
    correctValue: 'excreted then stored',
    targetedMisconceptions: [],
    source: src('chem.bio.vitamins', 'solubility decides the fate of an excess, and it is why fat-soluble vitamins can accumulate to toxicity while water-soluble ones rarely do — the concept\'s existing over-supplementation probe rests on this'),
  },
  {
    conceptId: 'chem.bio.vitamins', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The four fat-soluble vitamins are conventionally listed as A, D, E and ______.',
    choices: [
      { text: 'K', isCorrect: true },
      { text: 'C', isCorrect: false },
      { text: 'B12', isCorrect: false },
      { text: 'B6', isCorrect: false },
    ],
    correctValue: 'K',
    targetedMisconceptions: [],
    source: src('chem.bio.vitamins', 'A, D, E and K is the standard grouping, and every distractor here is a genuinely WATER-soluble vitamin — so the item tests the classification rather than the letter'),
  },
  {
    conceptId: 'chem.bond.coordinate-bond', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In a coordinate (dative covalent) bond, the two shared electrons come from ______.',
    choices: [
      { text: 'one atom alone — the donor, which supplies a lone pair to an atom that has an empty orbital', isCorrect: true },
      { text: 'one electron from each of the two atoms, as in an ordinary covalent bond', isCorrect: false },
      { text: 'the surrounding solvent', isCorrect: false },
      { text: 'neither atom — the bond is purely electrostatic', isCorrect: false },
    ],
    correctValue: 'one atom alone, the donor',
    targetedMisconceptions: [],
    source: src('chem.bond.coordinate-bond', 'ORIGIN is the only difference from an ordinary covalent bond — once formed the two are indistinguishable, which is what the concept\'s existing NH₄⁺ probe establishes'),
  },
]


// ═══════════════════════════════════════════════════════════════════════════
// BATCH C2 — chem.bond, chem.carb, chem.dblock, chem.elect, chem.env @ HIGH
// ═══════════════════════════════════════════════════════════════════════════

const CHEM_B: SeedProbe[] = [
  {
    conceptId: 'chem.bond.covalent-bonding', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A covalent bond forms when two atoms ______.',
    choices: [
      { text: 'share a pair of electrons, each atom typically contributing one', isCorrect: true },
      { text: 'transfer a pair of electrons from one atom to the other', isCorrect: false },
      { text: 'release their electrons into a shared sea of delocalised electrons', isCorrect: false },
      { text: 'attract one another because they carry opposite charges', isCorrect: false },
    ],
    correctValue: 'share a pair of electrons',
    targetedMisconceptions: [],
    source: src('chem.bond.covalent-bonding', 'the three wrong options are ionic, metallic and ionic-again — offering all three bonding models against each other is what makes the classification the thing being tested'),
  },
  {
    conceptId: 'chem.bond.hybridization', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many sigma bonds and how many pi bonds are there in one molecule of ethene, H₂C=CH₂?',
    choices: [
      { text: 'Five sigma and one pi', isCorrect: true },
      { text: 'Four sigma and two pi', isCorrect: false },
      { text: 'Six sigma and no pi', isCorrect: false },
      { text: 'Five sigma and two pi', isCorrect: false },
    ],
    correctValue: '5 sigma, 1 pi',
    targetedMisconceptions: [],
    source: src('chem.bond.hybridization', 'four C–H sigma bonds plus one C–C sigma, and the double bond contributes exactly ONE pi on top — a double bond is never two pi bonds, which is what the last option assumes'),
  },
  {
    conceptId: 'chem.bond.ionic-bonding', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'An ionic bond forms when electrons are ______ from one atom to another, and the resulting ions are then held together by ______.',
    choices: [
      { text: 'transferred … electrostatic attraction', isCorrect: true },
      { text: 'shared … covalent bonds', isCorrect: false },
      { text: 'transferred … magnetic attraction', isCorrect: false },
      { text: 'shared … electrostatic attraction', isCorrect: false },
    ],
    correctValue: 'transferred and electrostatic attraction',
    targetedMisconceptions: [],
    source: src('chem.bond.ionic-bonding', 'the attraction is between IONS and acts in every direction, which is why NaCl is a lattice rather than a molecule — the point of the concept\'s existing discrete-molecules probe'),
  },
  {
    conceptId: 'chem.bond.ionic-bonding', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Magnesium forms Mg²⁺ and chlorine forms Cl⁻. What is the empirical formula of magnesium chloride?',
    choices: [
      { text: 'MgCl₂', isCorrect: true },
      { text: 'MgCl', isCorrect: false },
      { text: 'Mg₂Cl', isCorrect: false },
      { text: 'Mg₂Cl₃', isCorrect: false },
    ],
    correctValue: 'MgCl2',
    targetedMisconceptions: [],
    source: src('chem.bond.ionic-bonding', 'the formula follows from CHARGE BALANCE — two singly charged anions per doubly charged cation — and the Mg₂Cl option has the ratio exactly inverted'),
  },
  {
    conceptId: 'chem.bond.metallic-bonding', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In a metal, positive ions sit in a regular lattice surrounded by ______.',
    choices: [
      { text: 'a sea of delocalised electrons, free to move throughout the whole structure', isCorrect: true },
      { text: 'fixed pairs of shared electrons, one pair per bond', isCorrect: false },
      { text: 'negative ions, alternating with the positive ones', isCorrect: false },
      { text: 'empty space, the ions being held by their own attraction', isCorrect: false },
    ],
    correctValue: 'a sea of delocalised electrons',
    targetedMisconceptions: [],
    source: src('chem.bond.metallic-bonding', 'delocalisation explains conduction AND malleability from one idea — layers slide without breaking directional bonds, since there are none; the third option describes an ionic lattice, which shatters instead'),
  },
  {
    conceptId: 'chem.bond.polar-molecules', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A molecule may contain strongly polar bonds and still be non-polar overall, if its shape makes the individual bond dipoles ______.',
    choices: [
      { text: 'cancel one another out, summing to zero as vectors', isCorrect: true },
      { text: 'add together to give a larger overall dipole', isCorrect: false },
      { text: 'become purely covalent', isCorrect: false },
      { text: 'rotate freely so that no direction is preferred', isCorrect: false },
    ],
    correctValue: 'cancel out',
    targetedMisconceptions: [],
    source: src('chem.bond.polar-molecules', 'bond dipoles are VECTORS, so symmetry can cancel them — which is exactly why the concept\'s existing SF₆ and CO₂ probes are non-polar despite very polar bonds'),
  },
  {
    conceptId: 'chem.bond.resonance', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Resonance structures of one species differ only in the placement of ______; the positions of the ______ are identical in every structure.',
    choices: [
      { text: 'electrons … nuclei', isCorrect: true },
      { text: 'nuclei … electrons', isCorrect: false },
      { text: 'electrons … electrons', isCorrect: false },
      { text: 'nuclei … nuclei', isCorrect: false },
    ],
    correctValue: 'electrons and nuclei',
    targetedMisconceptions: [],
    source: src('chem.bond.resonance', 'moving an ATOM produces a different isomer, not a resonance structure — that is the single rule that decides whether two drawings are resonance forms at all'),
  },
  {
    conceptId: 'chem.bond.resonance', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The carbonate ion CO₃²⁻ is described by three equivalent resonance structures, each with one C=O and two C–O bonds. What is the bond order of each carbon–oxygen bond in the real ion?',
    choices: [
      { text: 'About 1.33 — four bonds shared over three positions', isCorrect: true },
      { text: 'Exactly 1, since most of the structures show a single bond', isCorrect: false },
      { text: 'Exactly 2, since a double bond is present', isCorrect: false },
      { text: 'Exactly 1.5', isCorrect: false },
    ],
    correctValue: '1.33',
    targetedMisconceptions: [],
    source: src('chem.bond.resonance', '(1 + 1 + 2)/3 = 4/3: all three bonds are IDENTICAL and intermediate, which is why the ion has three equal bond lengths. The 1.5 option is the benzene answer, correct for two resonance forms and not three'),
  },
  {
    conceptId: 'chem.bond.vsepr', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'VSEPR predicts molecular shape by arranging the electron pairs around a central atom so that they are ______.',
    choices: [
      { text: 'as far apart from one another as possible', isCorrect: true },
      { text: 'as close together as possible', isCorrect: false },
      { text: 'all in a single flat plane', isCorrect: false },
      { text: 'aligned along the existing bond directions', isCorrect: false },
    ],
    correctValue: 'as far apart as possible',
    targetedMisconceptions: [],
    source: src('chem.bond.vsepr', 'mutual REPULSION is the whole mechanism, and it is why lone pairs — which repel more strongly — distort a shape rather than leaving it alone'),
  },
  {
    conceptId: 'chem.bond.vsepr', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A central atom has four bonding pairs and no lone pairs. What bond angle does VSEPR predict?',
    choices: [
      { text: '109.5°', isCorrect: true },
      { text: '90° — four pairs at right angles', isCorrect: false },
      { text: '120°', isCorrect: false },
      { text: '180°', isCorrect: false },
    ],
    correctValue: '109.5 degrees',
    targetedMisconceptions: [],
    source: src('chem.bond.vsepr', 'four pairs go TETRAHEDRAL rather than square, because three dimensions allow a wider separation than 90° — the 90° option is the flat-drawing intuition, and 120° and 180° are the three- and two-pair answers'),
  },
  {
    conceptId: 'chem.carb.alpha-reactions', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The alpha carbon of a carbonyl compound is the carbon ______.',
    choices: [
      { text: 'directly bonded to the carbonyl carbon', isCorrect: true },
      { text: 'two atoms away from the carbonyl carbon', isCorrect: false },
      { text: 'that IS the carbonyl carbon', isCorrect: false },
      { text: 'at the far end of the carbon chain', isCorrect: false },
    ],
    correctValue: 'adjacent to the carbonyl carbon',
    targetedMisconceptions: [],
    source: src('chem.carb.alpha-reactions', 'the whole topic depends on locating the alpha position, since that is where the acidic hydrogen sits — the concept\'s existing acidity probe assumes it has been located correctly'),
  },
  {
    conceptId: 'chem.carb.alpha-reactions', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two molecules of ethanal (CH₃CHO) undergo an aldol reaction. How many carbon atoms does the aldol product contain?',
    choices: [
      { text: 'Four', isCorrect: true },
      { text: 'Two — the same as the starting aldehyde', isCorrect: false },
      { text: 'Three', isCorrect: false },
      { text: 'Six', isCorrect: false },
    ],
    correctValue: '4',
    targetedMisconceptions: [],
    source: src('chem.carb.alpha-reactions', 'an aldol joins two carbonyl molecules with no loss of carbon, so the chain simply doubles — which is what makes it a carbon–carbon bond-forming reaction worth having'),
  },
  {
    conceptId: 'chem.carb.carboxylic', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Carboxylic acids are far more acidic than alcohols because the ______ is stabilised by delocalisation across two oxygen atoms.',
    choices: [
      { text: 'carboxylate anion left after the proton has gone', isCorrect: true },
      { text: 'undissociated carboxylic acid molecule', isCorrect: false },
      { text: 'alkyl chain attached to the acid group', isCorrect: false },
      { text: 'hydrogen atom being lost', isCorrect: false },
    ],
    correctValue: 'the carboxylate anion',
    targetedMisconceptions: [],
    source: src('chem.carb.carboxylic', 'acidity is decided by the stability of the CONJUGATE BASE, not of the acid — stabilising the acid itself would make it LESS acidic, so the second option gets the direction backwards'),
  },
  {
    conceptId: 'chem.carb.named-reactions', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A Grignard reagent added to a ketone, followed by acidic work-up, gives a ______ alcohol.',
    choices: [
      { text: 'tertiary', isCorrect: true },
      { text: 'primary', isCorrect: false },
      { text: 'secondary', isCorrect: false },
      { text: 'no alcohol at all — the ketone is unchanged', isCorrect: false },
    ],
    correctValue: 'tertiary',
    targetedMisconceptions: [],
    source: src('chem.carb.named-reactions', 'the carbonyl carbon already carries two alkyl groups and the Grignard adds a third — methanal gives primary, other aldehydes secondary, ketones tertiary, so both wrong classes are correct answers for a different carbonyl'),
  },
  {
    conceptId: 'chem.carb.named-reactions', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'The Wittig reaction converts the C=O of an aldehyde or ketone into a ______.',
    choices: [
      { text: 'carbon–carbon double bond — an alkene', isCorrect: true },
      { text: 'carboxylic acid', isCorrect: false },
      { text: 'secondary alcohol', isCorrect: false },
      { text: 'ether linkage', isCorrect: false },
    ],
    correctValue: 'an alkene',
    targetedMisconceptions: [],
    source: src('chem.carb.named-reactions', 'the value of the Wittig is that it puts the double bond in a KNOWN position, which is what the concept\'s existing pent-1-ene probe is about — an alcohol dehydration cannot promise that'),
  },
  {
    conceptId: 'chem.carb.spectro', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A strong, sharp infrared absorption close to 1715 cm⁻¹ indicates the presence of a ______ group.',
    choices: [
      { text: 'C=O carbonyl', isCorrect: true },
      { text: 'O–H hydroxyl', isCorrect: false },
      { text: 'C–H alkyl', isCorrect: false },
      { text: 'C≡N nitrile', isCorrect: false },
    ],
    correctValue: 'C=O carbonyl',
    targetedMisconceptions: [],
    source: src('chem.carb.spectro', 'the carbonyl stretch near 1715 cm⁻¹ is the single most diagnostic IR band in organic chemistry — O–H is a broad band near 3300 and a nitrile is near 2250, so each distractor is a real band in the wrong place'),
  },
  {
    conceptId: 'chem.dblock.oxo-species', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the oxidation state of manganese in the permanganate ion, MnO₄⁻?',
    choices: [
      { text: '+7', isCorrect: true },
      { text: '+4 — one for each oxygen', isCorrect: false },
      { text: '−1 — the charge on the ion', isCorrect: false },
      { text: '+8', isCorrect: false },
    ],
    correctValue: '+7',
    targetedMisconceptions: [],
    source: src('chem.dblock.oxo-species', 'x + 4(−2) = −1 gives x = +7. The +8 option forgets the ion\'s own charge and the −1 option reads the ion charge as the metal\'s, which are the two ways this balance is dropped'),
  },
  {
    conceptId: 'chem.elect.batteries', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In any electrochemical cell, oxidation takes place at the ______ and reduction at the ______.',
    choices: [
      { text: 'anode … cathode', isCorrect: true },
      { text: 'cathode … anode', isCorrect: false },
      { text: 'anode … anode', isCorrect: false },
      { text: 'cathode … cathode', isCorrect: false },
    ],
    correctValue: 'anode and cathode',
    targetedMisconceptions: [],
    source: src('chem.elect.batteries', 'the definition is by REACTION and not by sign — which is why the anode is negative in a galvanic cell and positive in an electrolytic one, and why memorising the sign instead of the reaction fails in half of all problems'),
  },
  {
    conceptId: 'chem.elect.concentration-cell', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A concentration cell drives current until the two half-cell concentrations become ______, at which point its EMF is ______.',
    choices: [
      { text: 'equal … zero', isCorrect: true },
      { text: 'equal … a maximum', isCorrect: false },
      { text: 'maximally different … zero', isCorrect: false },
      { text: 'maximally different … a maximum', isCorrect: false },
    ],
    correctValue: 'equal and zero',
    targetedMisconceptions: [],
    source: src('chem.elect.concentration-cell', 'the cell is driven entirely by the concentration DIFFERENCE, so equalising it is exactly what discharges the cell — which is why its E° is zero while its actual EMF is not'),
  },
  {
    conceptId: 'chem.elect.conductance', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Molar conductivity is defined as the conductivity of a solution divided by its ______.',
    choices: [
      { text: 'concentration', isCorrect: true },
      { text: 'volume', isCorrect: false },
      { text: 'cell constant', isCorrect: false },
      { text: 'resistance', isCorrect: false },
    ],
    correctValue: 'concentration',
    targetedMisconceptions: [],
    source: src('chem.elect.conductance', 'dividing by concentration is what removes the trivial effect of having more ions present, so molar conductivity can reveal how well each ion actually moves — the point of the concept\'s existing dilution probes'),
  },
  {
    conceptId: 'chem.elect.conductance', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.ADVANCED,
    stem: 'A solution has conductivity 0.0100 S cm⁻¹ at a concentration of 0.100 mol dm⁻³. What is its molar conductivity, in S cm² mol⁻¹?',
    choices: [
      { text: '100', isCorrect: true },
      { text: '0.100 — dividing by the concentration in mol dm⁻³ without converting', isCorrect: false },
      { text: '1000', isCorrect: false },
      { text: '10', isCorrect: false },
    ],
    correctValue: '100',
    targetedMisconceptions: [],
    source: src('chem.elect.conductance', '0.100 mol dm⁻³ is 1.00e-4 mol cm⁻³, so 0.0100 / 1.00e-4 = 100 S cm² mol⁻¹. The unit conversion is the whole difficulty, and skipping it is out by a factor of a thousand'),
  },
  {
    conceptId: 'chem.elect.electrolysis', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How much charge must pass to deposit one mole of copper metal from Cu²⁺ ions? (Faraday constant = 96 500 C mol⁻¹)',
    choices: [
      { text: '193 000 C', isCorrect: true },
      { text: '96 500 C — one Faraday per mole', isCorrect: false },
      { text: '48 250 C', isCorrect: false },
      { text: '2 C', isCorrect: false },
    ],
    correctValue: '193000 C',
    targetedMisconceptions: [],
    source: src('chem.elect.electrolysis', 'Cu²⁺ needs TWO electrons per atom, so two Faradays per mole — the charge on the ion is the factor most often left out, and it doubles the answer'),
  },
  {
    conceptId: 'chem.elect.nernst', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'By the Nernst equation, a cell potential falls BELOW its standard value E° whenever the reaction quotient Q is ______ one.',
    choices: [
      { text: 'greater than', isCorrect: true },
      { text: 'less than', isCorrect: false },
      { text: 'equal to', isCorrect: false },
      { text: 'never — Q cannot affect the potential', isCorrect: false },
    ],
    correctValue: 'greater than',
    targetedMisconceptions: [],
    source: src('chem.elect.nernst', 'E = E° − (RT/nF)ln Q, so Q > 1 makes ln Q positive and subtracts — which is precisely why a battery\'s voltage sags as products accumulate, the point of the concept\'s existing discharge probe'),
  },
  {
    conceptId: 'chem.elect.standard-electrode', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Every standard electrode potential is quoted relative to the ______, which is defined as exactly 0.00 V.',
    choices: [
      { text: 'standard hydrogen electrode', isCorrect: true },
      { text: 'standard oxygen electrode', isCorrect: false },
      { text: 'copper electrode', isCorrect: false },
      { text: 'lithium electrode', isCorrect: false },
    ],
    correctValue: 'standard hydrogen electrode',
    targetedMisconceptions: [],
    source: src('chem.elect.standard-electrode', 'the zero is a CONVENTION rather than a measurement — no single electrode potential can be measured alone, only differences, which is why a reference has to be chosen and fixed'),
  },
  {
    conceptId: 'chem.elect.standard-electrode', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The more NEGATIVE a species\' standard electrode potential, the more readily it is ______ — that is, the stronger a ______ agent it is.',
    choices: [
      { text: 'oxidised … reducing', isCorrect: true },
      { text: 'reduced … oxidising', isCorrect: false },
      { text: 'oxidised … oxidising', isCorrect: false },
      { text: 'reduced … reducing', isCorrect: false },
    ],
    correctValue: 'oxidised and reducing',
    targetedMisconceptions: [],
    source: src('chem.elect.standard-electrode', 'two inversions are available and all four combinations are offered, because the agent is named for what it does to the OTHER species — which is why lithium, the most negative in the table, is the strongest reducing agent'),
  },
  {
    conceptId: 'chem.env.air-pollution', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A primary pollutant is released directly into the air. A ______ pollutant is instead formed there, by reaction between substances already present.',
    choices: [
      { text: 'secondary', isCorrect: true },
      { text: 'tertiary', isCorrect: false },
      { text: 'natural', isCorrect: false },
      { text: 'particulate', isCorrect: false },
    ],
    correctValue: 'secondary',
    targetedMisconceptions: [],
    source: src('chem.env.air-pollution', 'the distinction is by ORIGIN, not by chemical type or severity — which is why photochemical smog is classified as secondary, the fact the concept\'s existing probe asks about'),
  },
  {
    conceptId: 'chem.env.air-pollution', subjectSlug: S, probeKind: 'numeric',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Carbon monoxide is dangerous at very low concentrations because it binds to haemoglobin roughly how many times more strongly than oxygen does?',
    choices: [
      { text: 'About 200 times more strongly', isCorrect: true },
      { text: 'About twice as strongly', isCorrect: false },
      { text: 'About 20 times more strongly', isCorrect: false },
      { text: 'About 2000 times more strongly', isCorrect: false },
    ],
    correctValue: 'about 200x',
    targetedMisconceptions: [],
    source: src('chem.env.air-pollution', 'the ORDER OF MAGNITUDE is what explains toxicity at a few hundred ppm, which the concept\'s existing lethality probe states without giving the reason — a factor of two would make CO merely unpleasant'),
  },
  {
    conceptId: 'chem.env.atmosphere', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The atmospheric layer closest to the ground, in which weather occurs and temperature falls with increasing altitude, is the ______.',
    choices: [
      { text: 'troposphere', isCorrect: true },
      { text: 'stratosphere', isCorrect: false },
      { text: 'mesosphere', isCorrect: false },
      { text: 'thermosphere', isCorrect: false },
    ],
    correctValue: 'troposphere',
    targetedMisconceptions: [],
    source: src('chem.env.atmosphere', 'the falling temperature is what allows convection, and convection is what makes weather — so the layer and its temperature profile are one fact rather than two'),
  },
  {
    conceptId: 'chem.env.atmosphere', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The ozone layer lies in the ______, and its absorption of ultraviolet light is why temperature RISES with altitude through that layer.',
    choices: [
      { text: 'stratosphere', isCorrect: true },
      { text: 'troposphere', isCorrect: false },
      { text: 'mesosphere', isCorrect: false },
      { text: 'exosphere', isCorrect: false },
    ],
    correctValue: 'stratosphere',
    targetedMisconceptions: [],
    source: src('chem.env.atmosphere', 'the rising temperature is caused BY the ozone, which is what the concept\'s existing probe asks; it also suppresses convection, and that is why the stratosphere is stable and long-lived pollutants persist there'),
  },
  {
    conceptId: 'chem.env.ozone', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The formula of ozone is ______, whereas ordinary atmospheric oxygen is ______.',
    choices: [
      { text: 'O₃ … O₂', isCorrect: true },
      { text: 'O₂ … O₃', isCorrect: false },
      { text: 'O₃ … O₃', isCorrect: false },
      { text: 'O₂ … O₂', isCorrect: false },
    ],
    correctValue: 'O3 and O2',
    targetedMisconceptions: [],
    source: src('chem.env.ozone', 'two allotropes of one element with completely different chemistry — the same atoms in a different arrangement, which is why one is essential to breathe and the other is toxic at ground level'),
  },
  {
    conceptId: 'chem.env.ozone', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Ozone high in the stratosphere is protective because it absorbs ______, while ozone at ground level is counted as a pollutant.',
    choices: [
      { text: 'ultraviolet radiation, before it reaches the surface', isCorrect: true },
      { text: 'infrared radiation', isCorrect: false },
      { text: 'visible light', isCorrect: false },
      { text: 'carbon dioxide', isCorrect: false },
    ],
    correctValue: 'ultraviolet radiation',
    targetedMisconceptions: [],
    source: src('chem.env.ozone', 'good-up-high and bad-down-low is one substance judged by LOCATION, and the infrared option is the greenhouse mechanism — a different problem the concept\'s existing probe warns against merging with this one'),
  },
  {
    conceptId: 'chem.env.water-soil', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A HIGH biochemical oxygen demand in a water sample indicates a high level of ______.',
    choices: [
      { text: 'biodegradable organic pollution, which micro-organisms consume oxygen to break down', isCorrect: true },
      { text: 'dissolved oxygen already present in the water', isCorrect: false },
      { text: 'dissolved heavy metals', isCorrect: false },
      { text: 'dissolved salt', isCorrect: false },
    ],
    correctValue: 'biodegradable organic pollution',
    targetedMisconceptions: [],
    source: src('chem.env.water-soil', 'BOD measures oxygen DEMAND, so a high value means the water is heavily polluted and heading for oxygen depletion — reading it as the oxygen present inverts the meaning entirely'),
  },
  {
    conceptId: 'chem.env.water-soil', subjectSlug: S, probeKind: 'fill_blank',
    gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Nitrate and phosphate running off farmland into a lake causes ______: rapid algal growth, followed by decay and severe oxygen depletion.',
    choices: [
      { text: 'eutrophication', isCorrect: true },
      { text: 'acidification', isCorrect: false },
      { text: 'desalination', isCorrect: false },
      { text: 'ozone depletion', isCorrect: false },
    ],
    correctValue: 'eutrophication',
    targetedMisconceptions: [],
    source: src('chem.env.water-soil', 'the damage comes from the DECAY that follows the growth, not from the nutrients themselves — which is why adding fertiliser to water kills fish, and it is the sequence the concept\'s existing runoff probe traces'),
  },
]

/**
 * Every chemistry probe-depth probe. One array, so `seed-knowledge-assets.ts`,
 * the cold-start bootstrap and the contract tests — all of which scan for a
 * `*_PROBES` export — see the same set.
 */
export const CHEMISTRY_DEPTH_PROBES: SeedProbe[] = [
  ...CHEM_A,
  ...CHEM_B,
]

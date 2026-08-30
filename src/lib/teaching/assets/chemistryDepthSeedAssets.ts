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

/**
 * Every chemistry probe-depth probe. One array, so `seed-knowledge-assets.ts`,
 * the cold-start bootstrap and the contract tests — all of which scan for a
 * `*_PROBES` export — see the same set.
 */
export const CHEMISTRY_DEPTH_PROBES: SeedProbe[] = [
  ...CHEM_A,
]

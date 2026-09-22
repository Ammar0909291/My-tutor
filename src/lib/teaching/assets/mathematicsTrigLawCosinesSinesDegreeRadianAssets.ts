/**
 * Batch: Law of Cosines, Law of Sines, and degree-radian conversion (all
 * math.trig).
 *
 * math.trig.law-of-cosines and math.trig.law-of-sines both become ready
 * off already-authored math.trig.right-triangle-trig; neither unblocks
 * anything further per the KG. math.trig.degree-radian-conversion becomes
 * ready off already-authored math.trig.angle-measure (prior batch); it
 * likewise unblocks nothing further per the live KG (a documented
 * Blueprint/KG unlocks-field asymmetry — the Blueprint names special-
 * angles/trig-functions/unit-circle as future consumers, but none of
 * their KG requires fields actually lists this concept).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.trig.law-of-cosines.md,
 * math.trig.law-of-sines.md, and math.trig.degree-radian-conversion.md.
 *
 *   LAWCOS    law-of-cosines — the formula is Pythagoras PLUS a correction
 *             term, c²=a²+b²-2abcosC, never a plus sign copied from the
 *             Pythagorean pattern; arccos NEVER has an ambiguous case,
 *             its range [0°,180°] covers every possible triangle angle,
 *             never requiring a second-solution check the way arcsin
 *             does; SSS/SAS require the Law of Cosines while AAS/ASA
 *             require the Law of Sines, never whichever law was most
 *             recently practiced.
 *   LAWSIN    law-of-sines — a/sinA=b/sinB=c/sinC pairs each side with the
 *             angle DIRECTLY OPPOSITE it, never an adjacent angle; the
 *             law applies to AAS/ASA (a complete opposite pair), never to
 *             SAS/SSS which lack one; in the SSA ambiguous case, arcsin
 *             returns only ONE of two possibly-valid solutions, so BOTH
 *             B and 180°-B must be checked, never just the calculator's
 *             bare output.
 *   DEGRAD    degree-radian-conversion — both conversion factors come
 *             from the SAME single equation 2π rad=360°, never two
 *             independently memorized facts; formulas like s=rθ require
 *             θ in RADIANS specifically because radian measure IS the
 *             ratio arc-length/radius, never a degree value substituted
 *             directly; 180°=π rad is the half-circle anchor, and
 *             360°=2π rad follows by doubling — never conflating the two.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LAWCOS = 'math.trig.law-of-cosines'
const LAWSIN = 'math.trig.law-of-sines'
const DEGRAD = 'math.trig.degree-radian-conversion'

export const MATHEMATICS_TRIG_LAW_COSINES_SINES_DEGREE_RADIAN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LAWCOS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Law of Cosines is a corrected Pythagorean theorem: c²=a²+b²-2abcosC. Setting C=90° gives '
      + 'cosC=0, collapsing the formula exactly to c²=a²+b², confirming the Pythagorean theorem as the '
      + 'special case — the -2abcosC term is a MINUS-sign correction, never a plus sign copied from the '
      + 'Pythagorean pattern. For an acute angle the correction shortens c below the Pythagorean '
      + 'prediction; for obtuse, it lengthens c beyond it.\n\n'
      + 'Rearranged as cosC=(a²+b²-c²)/(2ab), the formula finds a missing angle from three known sides '
      + '(SSS). Unlike the Law of Sines\' SSA ambiguous case, the Law of Cosines NEVER produces an '
      + 'ambiguous result: arccos returns a unique value in [0°,180°] for any valid input, so whatever '
      + 'value it produces IS the correct angle — including a genuinely obtuse one when cosC is '
      + 'negative, with no second solution ever needing to be checked.\n\n'
      + 'Law SELECTION is structural, not a matter of preference: SAS (two sides and their included '
      + 'angle) and SSS (all three sides) require the Law of Cosines, since neither configuration '
      + 'contains a complete angle-side-opposite pair; AAS and ASA are solved faster by the Law of '
      + 'Sines instead.',
    targetedMisconceptions: [`${LAWCOS}:MC-1`, `${LAWCOS}:MC-2`, `${LAWCOS}:MC-3`],
    source: eb(LAWCOS, 'Core Understanding — the Law of Cosines is Pythagoras plus a minus-sign correction term, arccos never produces an ambiguous result across its full 0-to-180-degree range, and SSS/SAS require Cosines while AAS/ASA require Sines'),
  },
  {
    conceptId: LAWSIN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Law of Sines extends right-triangle sine to any triangle: dropping an altitude h from one '
      + 'vertex creates two right triangles sharing h, giving sinA=h/c and sinC=h/a; setting csinA=asinC '
      + 'equal yields a/sinA=c/sinC, and repeating with a different altitude gives the full '
      + 'a/sinA=b/sinB=c/sinC. In this ratio, side a is paired with the angle DIRECTLY OPPOSITE it, '
      + 'never a merely adjacent angle — for every side, the vertex it does NOT touch is the angle it '
      + 'pairs with.\n\n'
      + 'The law applies when a complete angle-side-opposite pair is known: AAS (two angles plus a '
      + 'non-included side) or ASA (two angles plus the included side, third angle found via the angle '
      + 'sum). It does NOT apply directly to SAS or SSS, since neither configuration supplies a complete '
      + 'opposite pair — the Law of Cosines handles those instead.\n\n'
      + 'The central subtlety is the AMBIGUOUS CASE (SSA): given angle A, opposite side a, and adjacent '
      + 'side b, sinB=(bsinA)/a can have TWO valid solutions in [0°,180°) — B₁=arcsin(bsinA/a) and its '
      + 'supplement B₂=180°-B₁ — because arcsin, by convention, returns only the first-quadrant value, '
      + 'discarding the equally valid obtuse angle with the same sine. BOTH must be checked for triangle '
      + 'validity (angle sum under 180°) before either is discarded, never just the calculator\'s bare '
      + 'output.',
    targetedMisconceptions: [`${LAWSIN}:MC-1`, `${LAWSIN}:MC-2`, `${LAWSIN}:MC-3`],
    source: eb(LAWSIN, 'Core Understanding — the Law of Sines pairs each side with the angle directly opposite it, applies only to AAS/ASA configurations with a complete opposite pair, and the SSA ambiguous case requires checking both arcsin solutions'),
  },
  {
    conceptId: DEGRAD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Degrees and radians are two units for the same rotation, related by ONE anchor fact: '
      + '2π rad=360°. Dividing by 360 gives 1°=π/180 rad (multiply degrees by π/180 to convert to '
      + 'radians); dividing by 2π gives 1 rad=180°/π (multiply radians by 180/π to convert to degrees). '
      + 'Both factors come from the SAME single equation — there is nothing to memorize beyond '
      + '2π rad=360° itself and which direction the division went. A size-check anchor makes the '
      + 'direction self-correcting: degrees are the "bigger" unit (360 per circle) while radians are '
      + '"smaller" (2π≈6.28 per circle), so degrees→radians must SHRINK the number, and radians→degrees '
      + 'must GROW it.\n\n'
      + 'Radians are not merely alternate notation — formulas like arc length s=rθ, sector area '
      + 'A=½r²θ, and angular velocity ω=θ/t all require θ in RADIANS specifically, because radian '
      + 'measure IS the ratio (arc length)/(radius). Substituting a degree value directly produces an '
      + 'answer wrong by a factor of roughly 57.3 — never a valid computation.\n\n'
      + 'A straight angle (180°) traces a semicircular arc of length πr, giving angle πr/r=π radians — '
      + 'so 180°=π rad is the half-circle anchor, and 360°=2π rad follows by doubling. Confusing the '
      + 'half-circle fact with the full-circle fact (believing 360°=π) is a linguistic compression '
      + 'error, never a valid derivation.',
    targetedMisconceptions: [`${DEGRAD}:MC-1`, `${DEGRAD}:MC-2`, `${DEGRAD}:MC-3`],
    source: eb(DEGRAD, 'Core Understanding — both conversion factors derive from the single equation 2 pi radians equals 360 degrees, geometric formulas require radians specifically because a radian is the ratio arc-length over radius, and 180 degrees equals pi radians is the half-circle anchor'),
  },
]

export const MATHEMATICS_TRIG_LAW_COSINES_SINES_DEGREE_RADIAN_PROBES: SeedProbe[] = [
  // --- math.trig.law-of-cosines ------------------------------------------
  {
    conceptId: LAWCOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If cosC=-0.5 comes from an SSS problem, is there more than one possible value of C between 0° and 180°, the way there can be for the Law of Sines?',
    choices: [
      { text: 'No — arccos(-0.5)=120° directly, and arccos never has an ambiguous case, since its range [0°,180°] already covers the entire possible range of triangle angles; a negative cosine simply means the angle IS obtuse, with nothing more to check', isCorrect: true },
      { text: 'Yes — just like the Law of Sines\' SSA case, arccos also returns two possible solutions that must both be checked for validity', isCorrect: false, misconceptionId: `${LAWCOS}:MC-2` },
      { text: 'Yes, since arccos is restricted to returning only acute angles, so a negative cosine value must be paired with a separately-computed obtuse alternative', isCorrect: false, misconceptionId: `${LAWCOS}:MC-2` },
    ],
    targetedMisconceptions: [`${LAWCOS}:MC-2`],
    source: eb(LAWCOS, 'Discovery Question 2 — if cosC=-0.5 from an SSS problem, is there more than one possible value of C between 0 and 180, the way there can be for the Law of Sines'),
  },
  {
    conceptId: LAWCOS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You know two angles and a side (AAS). Do you actually need the Law of Cosines here, or would the Law of Sines work directly and more simply?',
    choices: [
      { text: 'The Law of Sines works directly — AAS provides a complete angle-side-opposite pair, so a ratio side/sin(its angle) is immediately usable; the Law of Cosines would require finding a third piece of information first, unnecessary extra work for this configuration', isCorrect: true },
      { text: 'The Law of Cosines is always the correct choice regardless of configuration, since it is the more general and powerful formula', isCorrect: false, misconceptionId: `${LAWCOS}:MC-3` },
      { text: 'Neither law applies to an AAS configuration; a completely different geometric technique is required', isCorrect: false, misconceptionId: `${LAWCOS}:MC-3` },
    ],
    targetedMisconceptions: [`${LAWCOS}:MC-3`],
    source: eb(LAWCOS, 'Discovery Question 3 — you know two angles and a side; do you actually need the Law of Cosines here, or would the Law of Sines work directly and more simply'),
  },
  {
    conceptId: LAWCOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Set C=90° in the Law of Cosines formula c²=a²+b²-2abcosC. What do you get? Does it match a formula you already know?',
    choices: [
      { text: 'cos90°=0, so c²=a²+b²-0=a²+b² — exactly the Pythagorean theorem; this confirms the MINUS sign in -2abcosC is correct, since a plus sign would instead give c²=a²+b²+2ab, which is structurally wrong for a right angle', isCorrect: true },
      { text: 'c²=a²+b²+2ab, matching an expanded binomial square rather than the Pythagorean theorem', isCorrect: false, misconceptionId: `${LAWCOS}:MC-1` },
      { text: 'The formula cannot be checked against any known result, since the Law of Cosines only applies to non-right triangles', isCorrect: false, misconceptionId: `${LAWCOS}:MC-1` },
    ],
    targetedMisconceptions: [`${LAWCOS}:MC-1`],
    source: eb(LAWCOS, 'Discovery Question 1 — set C=90 degrees in the Law of Cosines formula; what do you get; does it match a formula you already know'),
  },

  // --- math.trig.law-of-sines ------------------------------------------
  {
    conceptId: LAWSIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If sinB=3/4, is B definitely acute? What other angle between 0° and 180° also has sine equal to 3/4?',
    choices: [
      { text: 'No — arcsin(3/4)≈48.59° gives only the acute solution, but its supplement 180°-48.59°≈131.41° ALSO has sine 3/4; both must be checked for triangle validity in the SSA case, never just the calculator\'s single bare output', isCorrect: true },
      { text: 'Yes — B is always acute whenever the Law of Sines gives sinB=3/4, since arcsin never returns an obtuse angle for any input', isCorrect: false, misconceptionId: `${LAWSIN}:MC-2` },
      { text: 'There is no other angle with the same sine value; each sine value corresponds to exactly one angle between 0° and 180°', isCorrect: false, misconceptionId: `${LAWSIN}:MC-2` },
    ],
    targetedMisconceptions: [`${LAWSIN}:MC-2`],
    source: eb(LAWSIN, 'Discovery Question 2 — if sinB=3/4, is B definitely acute; what other angle between 0 and 180 also has sine equal to 3/4'),
  },
  {
    conceptId: LAWSIN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In the ratio a/sinA, does side a touch vertex A, or is it the side across from it?',
    choices: [
      { text: 'Side a is the side ACROSS from vertex A (the vertex it does NOT touch) — never a side merely adjacent to or near A; this opposite-pairing is what makes the ratio a valid instance of the Law of Sines', isCorrect: true },
      { text: 'Side a touches vertex A directly, since the lowercase-uppercase pairing convention names the side that connects to that specific vertex', isCorrect: false, misconceptionId: `${LAWSIN}:MC-3` },
      { text: 'It does not matter which side is paired with which angle, as long as all three sides and angles appear somewhere in the proportion', isCorrect: false, misconceptionId: `${LAWSIN}:MC-3` },
    ],
    targetedMisconceptions: [`${LAWSIN}:MC-3`],
    source: eb(LAWSIN, 'Discovery Question 3 — in the ratio a/sinA, does side a touch vertex A, or is it the side across from it'),
  },
  {
    conceptId: LAWSIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Given A=40°, B=70°, a=15, can you find b directly from a ratio, or do you need more information first?',
    choices: [
      { text: 'Yes, directly — this is AAS, a complete angle-side-opposite pair (a and A) is already known, so a/sinA=b/sinB solves for b immediately without needing any further information', isCorrect: true },
      { text: 'No — this configuration is SAS or SSS in disguise, so the Law of Cosines must be applied first before any ratio can be set up', isCorrect: false, misconceptionId: `${LAWSIN}:MC-1` },
      { text: 'The Law of Sines cannot be applied to any configuration involving exactly two angles and one side, regardless of which side is given', isCorrect: false, misconceptionId: `${LAWSIN}:MC-1` },
    ],
    targetedMisconceptions: [`${LAWSIN}:MC-1`],
    source: eb(LAWSIN, 'Discovery Question 1 — given A=40, B=70, a=15, can you find b directly from a ratio, or do you need more information first'),
  },

  // --- math.trig.degree-radian-conversion ------------------------------------------
  {
    conceptId: DEGRAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If 2π radians equals 360°, what do you get when you divide both sides by 360? What do you get when you divide both sides by 2π?',
    choices: [
      { text: 'Dividing by 360 gives 1°=π/180 rad (the degrees-to-radians factor); dividing by 2π gives 1 rad=180°/π (the radians-to-degrees factor) — both factors come from the SAME single equation, never two independently memorized facts', isCorrect: true },
      { text: 'Dividing by 360 gives the radians-to-degrees factor 180/π, and dividing by 2π gives the degrees-to-radians factor π/180 — the reverse pairing', isCorrect: false, misconceptionId: `${DEGRAD}:MC-1` },
      { text: 'The two divisions give the same factor, since 2π and 360 are just two different names for a full circle', isCorrect: false, misconceptionId: `${DEGRAD}:MC-1` },
    ],
    targetedMisconceptions: [`${DEGRAD}:MC-1`],
    source: eb(DEGRAD, 'Discovery Question 1 — if 2pi radians equals 360 degrees, what do you get when you divide both sides by 360; what do you get when you divide both sides by 2pi'),
  },
  {
    conceptId: DEGRAD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A circle has radius 2 and a sector angle of 90°. Try computing the sector area by plugging 90 directly into A=½r²θ. Now convert 90° to radians first and try again. Why is one answer about 57 times bigger?',
    choices: [
      { text: 'The formula A=½r²θ requires θ in RADIANS, since radian measure IS the ratio (arc length)/(radius); converting first gives A=½×4×(π/2)=π≈3.14, the correct answer, while substituting the bare degree value 90 gives the wrong A=180, off by the conversion factor ≈57.3', isCorrect: true },
      { text: 'Both substitutions are equally valid, since the formula A=½r²θ works correctly with θ expressed in either degrees or radians', isCorrect: false, misconceptionId: `${DEGRAD}:MC-2` },
      { text: 'The degree substitution is correct, and the radian version is the one that produces a spurious result due to π being an irrational number', isCorrect: false, misconceptionId: `${DEGRAD}:MC-2` },
    ],
    targetedMisconceptions: [`${DEGRAD}:MC-2`],
    source: eb(DEGRAD, 'Discovery Question 3 — a circle has radius 2 and a sector angle of 90 degrees; try computing the sector area by plugging 90 directly into A=half r^2 theta; now convert first and compare'),
  },
  {
    conceptId: DEGRAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is it correct to say 360°=π radians?',
    choices: [
      { text: 'No — this confuses the half-circle fact with the full-circle fact; a straight angle (180°) traces a semicircular arc of length πr, giving 180°=π rad, and doubling both sides gives the correct full-circle fact 360°=2π rad, never 360°=π', isCorrect: true },
      { text: 'Yes — a full circle corresponds to exactly π radians, since π is the fundamental constant associated with any circle', isCorrect: false, misconceptionId: `${DEGRAD}:MC-3` },
      { text: 'Yes, since half of 360 is 180, and 180 rounds to approximately the same order of magnitude as π when expressed in radians', isCorrect: false, misconceptionId: `${DEGRAD}:MC-3` },
    ],
    targetedMisconceptions: [`${DEGRAD}:MC-3`],
    source: eb(DEGRAD, 'Discovery Question implied by MC-3 — anchoring the half-circle fact 180 degrees equals pi radians before doubling to the full-circle fact 360 degrees equals 2 pi radians'),
  },
]

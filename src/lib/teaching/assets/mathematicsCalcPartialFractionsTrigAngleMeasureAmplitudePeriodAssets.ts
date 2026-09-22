/**
 * Batch: partial fraction decomposition (math.calc), angle measure, and
 * amplitude/period/phase shift (both math.trig).
 *
 * math.calc.partial-fractions becomes ready off already-authored
 * math.calc.trig-substitution (prior batch), math.alg.rational-expressions,
 * and math.alg.polynomial-roots — closing math.calc's entire frontier for
 * the third consecutive batch. math.trig.angle-measure becomes ready off
 * already-authored math.geom.angle-measurement, and math.trig.amplitude-
 * period-phase becomes ready off already-authored math.trig.trig-functions.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.partial-fractions.md,
 * math.trig.angle-measure.md, and math.trig.amplitude-period-phase.md.
 *
 *   PARTIALFRAC partial-fractions — decomposition is the fraction-combining
 *             process run in REVERSE, never a genuinely new operation; the
 *             form is dictated entirely by the denominator's factorization
 *             — repeated factors need multiple terms and irreducible
 *             quadratics need a LINEAR numerator, never a single
 *             constant-numerator term per factor regardless of type; the
 *             purpose is making each piece integrable, never a purely
 *             algebraic exercise disconnected from integration.
 *   ANGLEMEASURE angle-measure — a full 360° rotation is INVISIBLE to where
 *             the terminal side ends up, so coterminal angles point to the
 *             SAME position, never different ones; the arc-length formula
 *             s=rθ requires θ in RADIANS specifically, never degrees
 *             substituted directly; a negative angle means CLOCKWISE
 *             rotation, never the supplement or complement of the
 *             positive angle.
 *   AMPPERIODPHASE amplitude-period-phase — the period is 2π/|B|, never
 *             simply B itself; the phase shift is -C/B (requiring
 *             factoring first), never the bare value of C, so a positive C
 *             produces a LEFT shift, the opposite of what the sign might
 *             suggest; amplitude is always |A|, a non-negative distance,
 *             never a negative value even when A itself is negative.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PARTIALFRAC = 'math.calc.partial-fractions'
const ANGLEMEASURE = 'math.trig.angle-measure'
const AMPPERIODPHASE = 'math.trig.amplitude-period-phase'

export const MATHEMATICS_CALC_PARTIAL_FRACTIONS_TRIG_ANGLE_MEASURE_AMPLITUDE_PERIOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PARTIALFRAC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Partial fraction decomposition runs the fraction-combining process in REVERSE, never a genuinely '
      + 'new operation: combining A/(x-a)+B/(x-b) into a single fraction over a common denominator is the '
      + 'forward direction; decomposition starts from that combined result p(x)/q(x) and works backward '
      + 'to recover the original simple pieces.\n\n'
      + 'The decomposition\'s form is dictated directly by the denominator\'s factorization, never '
      + 'guessed: for each DISTINCT LINEAR factor (x-a), one term A/(x-a). For each REPEATED linear '
      + 'factor (x-a)^k, k SEPARATE terms — A₁/(x-a)+A₂/(x-a)²+...+Aₖ/(x-a)^k, one term per power up to '
      + 'the multiplicity. For each IRREDUCIBLE quadratic factor (x²+bx+c), a term (Bx+C)/(x²+bx+c) — a '
      + 'LINEAR, not merely constant, numerator, since a constant alone cannot match every possible '
      + 'numerator arising from that factor type.\n\n'
      + 'Each resulting piece is integrable via already-known techniques — this is the whole POINT: '
      + 'A/(x-a) integrates directly to A·ln|x-a|+C; (Bx+C)/(x²+bx+c) integrates via completing the '
      + 'square and the arctangent-producing trig-substitution technique. Decomposing a complicated '
      + 'rational function converts an intractable integral into a SUM of already-solvable pieces — '
      + 'never a purely algebraic exercise disconnected from that purpose.',
    targetedMisconceptions: [`${PARTIALFRAC}:MC-1`, `${PARTIALFRAC}:MC-2`, `${PARTIALFRAC}:MC-3`],
    source: eb(PARTIALFRAC, 'Core Understanding — partial fractions run the combining process backward, the form is dictated entirely by the denominator\'s factorization, and each piece is decomposed specifically to become integrable'),
  },
  {
    conceptId: ANGLEMEASURE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An angle in standard position has its vertex at the origin and initial side on the positive '
      + 'x-axis, measured by a signed rotation — positive (counterclockwise) or negative (clockwise). '
      + 'Two angles sharing the same terminal side are COTERMINAL, differing by a full revolution: '
      + 'α=θ+360°k for any integer k. A full 360° rotation brings the terminal side back to EXACTLY the '
      + 'same position — any multiple of 360° is INVISIBLE to where the terminal side actually points, '
      + 'so 30° and 390° point to the SAME ray, never different ones.\n\n'
      + 'When an arc of radius r subtends angle θ in RADIANS specifically, the arc length is s=rθ — this '
      + 'requires radians because one radian is DEFINED as the angle where arc length equals radius, so '
      + 's=rθ directly produces s in the same length units as r; substituting degrees directly produces a '
      + 'numerically meaningless result, never a valid arc length.\n\n'
      + 'A NEGATIVE angle means CLOCKWISE rotation from the positive x-axis — never the supplement or '
      + 'complement of the corresponding positive angle. -60° (clockwise, terminal side in Q4) and 120° '
      + '(the supplement of 60°, terminal side in Q2) are genuinely different terminal positions, despite '
      + 'the surface-level "opposite of 60°" framing both might seem to share.',
    targetedMisconceptions: [`${ANGLEMEASURE}:MC-1`, `${ANGLEMEASURE}:MC-2`, `${ANGLEMEASURE}:MC-3`],
    source: eb(ANGLEMEASURE, 'Core Understanding — a full 360-degree rotation is invisible to the terminal side\'s position so coterminal angles share the same location, the arc-length formula requires radians specifically, and a negative angle means clockwise rotation rather than a supplement'),
  },
  {
    conceptId: AMPPERIODPHASE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The standard form y=Asin(Bx+C)+D layers four INDEPENDENT transformations on the base graph '
      + 'y=sinx (amplitude 1, period 2π, no shift), each controlled by exactly one parameter. The PERIOD '
      + 'is 2π/|B|, never simply B itself — B is a rate multiplier (how many cycles fit where one used '
      + 'to), so for y=sin(4x), 4 full cycles fit in [0,2π], making each individual cycle\'s period '
      + '2π/4=π/2, DIVIDED by B, not equal to it.\n\n'
      + 'The PHASE SHIFT requires factoring B out first: rewriting Bx+C as B(x+C/B) shows the shift is '
      + 'read as x-(-C/B), so the shift is -C/B, never the bare value of C — a POSITIVE C therefore '
      + 'produces a shift to the LEFT, the opposite of what the sign might visually suggest. Skipping the '
      + 'factoring step is the single most reliable route to a sign error.\n\n'
      + 'The AMPLITUDE is always |A|, a non-negative distance — a negative A flips the graph vertically '
      + '(a reflection), but the wave\'s actual height above and below the midline cannot be negative; '
      + 'y=-2sin(x) has amplitude 2, never amplitude -2, with the reflection carried as a separate, '
      + 'orientation-only fact.',
    targetedMisconceptions: [`${AMPPERIODPHASE}:MC-1`, `${AMPPERIODPHASE}:MC-2`, `${AMPPERIODPHASE}:MC-3`],
    source: eb(AMPPERIODPHASE, 'Core Understanding — the period is 2 pi over the absolute value of B rather than B itself, the phase shift is minus C over B requiring factoring first, and amplitude is always the absolute value of A, a non-negative distance'),
  },
]

export const MATHEMATICS_CALC_PARTIAL_FRACTIONS_TRIG_ANGLE_MEASURE_AMPLITUDE_PERIOD_PROBES: SeedProbe[] = [
  // --- math.calc.partial-fractions ------------------------------------------
  {
    conceptId: PARTIALFRAC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is partial fraction decomposition a genuinely new algebraic operation, or is it the fraction-combining process you already know, run backward?',
    choices: [
      { text: 'It is the combining process run backward — recombining the claimed decomposition 4/3/(x-1)+5/3/(x+2) via a common denominator reconstructs exactly (3x+1)/((x-1)(x+2)), confirming the reverse relationship concretely, never an unrelated new operation', isCorrect: true },
      { text: 'It is an entirely new algebraic operation, unrelated to combining fractions over a common denominator', isCorrect: false, misconceptionId: `${PARTIALFRAC}:MC-1` },
      { text: 'It is a technique that only coincidentally resembles fraction combining but works by a fundamentally different mechanism', isCorrect: false, misconceptionId: `${PARTIALFRAC}:MC-1` },
    ],
    targetedMisconceptions: [`${PARTIALFRAC}:MC-1`],
    source: eb(PARTIALFRAC, 'Discovery Question 1 — is partial fraction decomposition a genuinely new algebraic operation, or is it the fraction-combining process you already know, run backward'),
  },
  {
    conceptId: PARTIALFRAC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the purpose of decomposing a fraction into partial fractions purely algebraic simplification, or does it serve a specific purpose related to integration?',
    choices: [
      { text: 'It serves a specific integration purpose — the original combined fraction like (5x-1)/((x-2)(x+3)) often has no obvious antiderivative, but its decomposed pieces are each directly integrable via the basic logarithm rule, converting an intractable integral into a sum of solvable pieces', isCorrect: true },
      { text: 'It is purely an algebraic simplification exercise, disconnected from any integration purpose', isCorrect: false, misconceptionId: `${PARTIALFRAC}:MC-3` },
      { text: 'Decomposition makes a fraction look simpler visually but has no effect at all on whether it can be integrated', isCorrect: false, misconceptionId: `${PARTIALFRAC}:MC-3` },
    ],
    targetedMisconceptions: [`${PARTIALFRAC}:MC-3`],
    source: eb(PARTIALFRAC, 'Discovery Question 3 — is the purpose of decomposing a fraction into partial fractions purely algebraic simplification, or does it serve a specific purpose related to integration'),
  },
  {
    conceptId: PARTIALFRAC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a REPEATED linear factor (x-a)², does the decomposition include just one term, or does it need a separate term for each power up to the multiplicity?',
    choices: [
      { text: 'It needs a separate term for each power up to the multiplicity: A₁/(x-a)+A₂/(x-a)², two SEPARATE terms — never just one term with a constant numerator, since the factorization\'s multiplicity dictates exactly how many terms are required', isCorrect: true },
      { text: 'Just one term, A/(x-a)², is always sufficient regardless of the factor\'s multiplicity', isCorrect: false, misconceptionId: `${PARTIALFRAC}:MC-2` },
      { text: 'Repeated linear factors cannot be decomposed at all and must be left combined in the original fraction', isCorrect: false, misconceptionId: `${PARTIALFRAC}:MC-2` },
    ],
    targetedMisconceptions: [`${PARTIALFRAC}:MC-2`],
    source: eb(PARTIALFRAC, 'Discovery Question 2 — for a repeated linear factor (x-a)^2, does the decomposition include just one term, or does it need a separate term for each power up to the multiplicity'),
  },

  // --- math.trig.angle-measure ------------------------------------------
  {
    conceptId: ANGLEMEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you rotate a full 360° starting from the positive x-axis, where do you end up facing? What does that tell you about 30° versus 390°?',
    choices: [
      { text: 'You end up facing the SAME direction you started — a full 360° rotation is invisible to the terminal side\'s position, so 30° and 390°=30°+360° point to the identical terminal ray, never different ones', isCorrect: true },
      { text: 'You end up facing a completely different direction, so 30° and 390° must point to two visibly different terminal sides', isCorrect: false, misconceptionId: `${ANGLEMEASURE}:MC-1` },
      { text: 'The ending direction depends entirely on whether the rotation is measured in degrees or radians, not on the number of full revolutions completed', isCorrect: false, misconceptionId: `${ANGLEMEASURE}:MC-1` },
    ],
    targetedMisconceptions: [`${ANGLEMEASURE}:MC-1`],
    source: eb(ANGLEMEASURE, 'Discovery Question 1 — if you rotate a full 360 degrees starting from the positive x-axis, where do you end up facing; what does that tell you about 30 versus 390'),
  },
  {
    conceptId: ANGLEMEASURE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In the formula s=rθ, does it matter whether θ is measured in degrees or radians? Try computing a wheel of radius 10 cm rotating 30° both ways and compare.',
    choices: [
      { text: 'Yes, it matters — θ must be in RADIANS: converting 30° to π/6 radians gives the correct s=10×π/6≈5.24 cm; substituting the bare degree value 30 directly gives the meaningless s=300, since a radian is specifically DEFINED as the angle where arc length equals radius', isCorrect: true },
      { text: 'No — the formula s=rθ works identically regardless of whether θ is expressed in degrees or radians, since both are just numbers representing the same angle', isCorrect: false, misconceptionId: `${ANGLEMEASURE}:MC-2` },
      { text: 'The formula requires degrees specifically, since radians would produce a result in the wrong units entirely', isCorrect: false, misconceptionId: `${ANGLEMEASURE}:MC-2` },
    ],
    targetedMisconceptions: [`${ANGLEMEASURE}:MC-2`],
    source: eb(ANGLEMEASURE, 'Discovery Question 2 — in the formula s=r*theta, does it matter whether theta is measured in degrees or radians; try computing a wheel\'s arc length both ways and compare'),
  },
  {
    conceptId: ANGLEMEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is -60° the same terminal position as 120° (the supplement of 60°)? Draw both and check.',
    choices: [
      { text: 'No — -60° is 60° CLOCKWISE from the positive x-axis, landing in Q4, while 120° (the supplement of 60°) lands in Q2; these are genuinely different terminal positions, since "negative" means clockwise rotation direction, never the supplement or complement of the angle', isCorrect: true },
      { text: 'Yes — a negative angle is always equivalent to the supplement of its positive counterpart, since "negative" means "the opposite value"', isCorrect: false, misconceptionId: `${ANGLEMEASURE}:MC-3` },
      { text: 'Yes, since -60° and 120° both differ from 60° by the same total rotation amount, making them equivalent terminal positions', isCorrect: false, misconceptionId: `${ANGLEMEASURE}:MC-3` },
    ],
    targetedMisconceptions: [`${ANGLEMEASURE}:MC-3`],
    source: eb(ANGLEMEASURE, 'Discovery Question 3 — is -60 degrees the same terminal position as 120 degrees, the supplement of 60 degrees; draw both and check'),
  },

  // --- math.trig.amplitude-period-phase ------------------------------------------
  {
    conceptId: AMPPERIODPHASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If B=4 in y=sin(4x), how many full cycles fit in [0,2π]? Does that mean the period IS 4, or something else?',
    choices: [
      { text: 'Four full cycles fit in [0,2π], so each individual cycle\'s period is 2π/4=π/2 — the period is DIVIDED by B, never simply equal to B itself; B is a rate multiplier (how fast the wave runs), not a length', isCorrect: true },
      { text: 'The period equals B directly, so the period of y=sin(4x) is 4', isCorrect: false, misconceptionId: `${AMPPERIODPHASE}:MC-1` },
      { text: 'The period cannot be determined from B alone; it requires knowing the amplitude A first', isCorrect: false, misconceptionId: `${AMPPERIODPHASE}:MC-1` },
    ],
    targetedMisconceptions: [`${AMPPERIODPHASE}:MC-1`],
    source: eb(AMPPERIODPHASE, 'Discovery Question 1 — if B=4 in y=sin(4x), how many full cycles fit in [0,2pi]; does that mean the period is 4, or something else'),
  },
  {
    conceptId: AMPPERIODPHASE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the amplitude of y=-3sin(x)? Is it -3, or something else — and why?',
    choices: [
      { text: 'The amplitude is 3 (=|-3|), never -3 — amplitude answers "how far does the wave travel from the midline," a distance that is always non-negative; the negative sign of A produces a separate, orientation-only reflection, not folded into the amplitude itself', isCorrect: true },
      { text: 'The amplitude is -3, exactly matching the signed coefficient in front of sin(x)', isCorrect: false, misconceptionId: `${AMPPERIODPHASE}:MC-3` },
      { text: 'The amplitude cannot be determined for any equation with a negative leading coefficient', isCorrect: false, misconceptionId: `${AMPPERIODPHASE}:MC-3` },
    ],
    targetedMisconceptions: [`${AMPPERIODPHASE}:MC-3`],
    source: eb(AMPPERIODPHASE, 'Discovery Question 3 — what is the amplitude of y=-3sin(x); is it -3, or something else, and why'),
  },
  {
    conceptId: AMPPERIODPHASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For y=sin(x+π/2), does the graph shift left or right? What does factoring x+π/2=x-(-π/2) tell you?',
    choices: [
      { text: 'The graph shifts LEFT by π/2 — factoring shows the shift is -(-π/2)=π/2 read as x-(-π/2), so the true phase shift is -C/B=-π/2, meaning LEFT; a positive C in the equation produces a leftward shift, the opposite of what the visible "+" sign might suggest', isCorrect: true },
      { text: 'The graph shifts RIGHT by π/2, since the "+" sign in x+π/2 directly indicates a rightward shift by that amount', isCorrect: false, misconceptionId: `${AMPPERIODPHASE}:MC-2` },
      { text: 'The graph does not shift at all; adding a constant inside the sine function only affects the amplitude, not the horizontal position', isCorrect: false, misconceptionId: `${AMPPERIODPHASE}:MC-2` },
    ],
    targetedMisconceptions: [`${AMPPERIODPHASE}:MC-2`],
    source: eb(AMPPERIODPHASE, 'Discovery Question 2 — for y=sin(x+pi/2), does the graph shift left or right; what does factoring x+pi/2=x-(-pi/2) tell you'),
  },
]

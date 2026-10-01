/**
 * Batch: double-angle formulas, product-to-sum/sum-to-product formulas, and
 * exact values at special angles (all math.trig).
 *
 * math.trig.double-angle-formulas and math.trig.product-to-sum both become
 * ready off already-authored math.trig.sum-difference-formulas (prior
 * batch); product-to-sum directly unblocks math.calc.trig-integrals next
 * (its other prerequisite, math.calc.u-substitution, is already authored),
 * reopening the math.calc frontier that closed at the end of the prior
 * batch. math.trig.special-angles becomes ready off already-authored
 * math.trig.basic-ratios (prior batch).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.trig.double-angle-formulas.md,
 * math.trig.product-to-sum.md, and math.trig.special-angles.md.
 *
 *   DOUBLEANGLE double-angle-formulas — sin(2θ)=2sinθcosθ is a PRODUCT of
 *             two different values, never simply 2sinθ; the three
 *             algebraically-identical forms of cos(2θ) should be chosen
 *             by which minimizes steps given what is known, never
 *             defaulted to one memorized form; tan(2θ)'s denominator
 *             (1-tan²θ) is essential — it correctly signals where the
 *             function is undefined, never decorative or droppable.
 *   PRODUCTTOSUM product-to-sum — each of the four products (sin·cos,
 *             cos·sin, cos·cos, sin·sin) needs its OWN specific
 *             add-or-subtract pairing of sum/difference formulas, never
 *             the same combination reused blindly across all four;
 *             sum-to-product requires a genuine NEW substitution
 *             (A=(X+Y)/2, B=(X-Y)/2), never just "the same formula read
 *             backward"; these conversions describe a real physical
 *             phenomenon (acoustic beating), never purely abstract
 *             symbol manipulation with no physical meaning.
 *   SPECIALANGLES special-angles — the exact-value table is DERIVED from
 *             the 45-45-90 and 30-60-90 triangles, never merely
 *             memorized as an arbitrary list; trig values are NOT always
 *             positive beyond Q1 — the sign must be attached via ASTC
 *             after finding the quadrant, never assumed positive by
 *             default; the Q2 formula (180°-α) and Q3 formula (180°+α)
 *             are visually similar but distinct, never interchangeable.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DOUBLEANGLE = 'math.trig.double-angle-formulas'
const PRODUCTTOSUM = 'math.trig.product-to-sum'
const SPECIALANGLES = 'math.trig.special-angles'

export const MATHEMATICS_TRIG_DOUBLE_ANGLE_PRODUCT_TO_SUM_SPECIAL_ANGLES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DOUBLEANGLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Every double-angle formula falls out of setting A=B=θ in the already-known sum formulas — no new '
      + 'geometric argument is needed. From sin(A+B)=sinAcosB+cosAsinB with A=B=θ: '
      + 'sin(θ+θ)=sinθcosθ+cosθsinθ=2sinθcosθ. So sin2θ=2sinθcosθ is a PRODUCT of two different values, '
      + 'never simply 2sinθ — doubling the angle is not the same as doubling the function\'s output.\n\n'
      + 'Three equivalent forms of cos2θ exist, each optimal for a different situation. From '
      + 'cos(A+B)=cosAcosB-sinAsinB with A=B=θ: cos2θ=cos²θ-sin²θ (Form 1, needs both). Substituting the '
      + 'Pythagorean identity: cos2θ=2cos²θ-1 (Form 2, needs only cosθ) or cos2θ=1-2sin²θ (Form 3, needs '
      + 'only sinθ). All three are algebraically identical — choosing among them is purely about which '
      + 'minimizes steps given what is available.\n\n'
      + 'tan2θ=2tanθ/(1-tan²θ) follows the same substitution. The DENOMINATOR is essential, not '
      + 'decorative: it becomes zero exactly where tan2θ is genuinely undefined, correctly signaling '
      + 'that behavior rather than lying about where the function is defined.',
    targetedMisconceptions: [`${DOUBLEANGLE}:MC-1`, `${DOUBLEANGLE}:MC-2`, `${DOUBLEANGLE}:MC-3`],
    source: eb(DOUBLEANGLE, 'Core Understanding — every double-angle formula is a direct special case (A=B=theta) of the sum formulas, cos2theta has three algebraically-equivalent forms chosen by efficiency, and tan2theta\'s denominator correctly marks where it is undefined'),
  },
  {
    conceptId: PRODUCTTOSUM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Adding or subtracting pairs of the four sum/difference formulas in every combination produces all '
      + 'four product-to-sum identities, each by the SAME technique but requiring its OWN specific '
      + 'pairing: sinAcosB=½[sin(A+B)+sin(A-B)] (add the sines); cosAsinB=½[sin(A+B)-sin(A-B)] (subtract '
      + 'the sines instead); cosAcosB=½[cos(A+B)+cos(A-B)] (add the cosines); '
      + 'sinAsinB=½[cos(A-B)-cos(A+B)] (subtract the cosines — note the ORDER: cos(A-B) first). Each of '
      + 'these four products needs its own re-derivation of which pair and which operation, never a '
      + 'single memorized pattern applied uniformly.\n\n'
      + 'Sum-to-product is the REVERSE direction, and it requires a genuinely NEW substitution, not just '
      + 'reading a formula backward: starting from a sum sinX+sinY, introduce A=(X+Y)/2 and B=(X-Y)/2, so '
      + 'X=A+B and Y=A-B. Then sinX+sinY=sin(A+B)+sin(A-B)=2sinAcosB, which in terms of X,Y becomes '
      + 'sinX+sinY=2sin((X+Y)/2)cos((X-Y)/2). This substitution step is new content, not a free '
      + 'relabeling.\n\n'
      + 'These conversions are not purely abstract algebra — sum-to-product literally describes acoustic '
      + 'beating: two tones at close frequencies combine into a fast oscillation (the average frequency) '
      + 'whose amplitude is slowly modulated (the half-difference frequency), the audible "beat" heard '
      + 'when two nearly-tuned instruments play together.',
    targetedMisconceptions: [`${PRODUCTTOSUM}:MC-1`, `${PRODUCTTOSUM}:MC-2`, `${PRODUCTTOSUM}:MC-3`],
    source: eb(PRODUCTTOSUM, 'Core Understanding — each of the four product-to-sum formulas needs its own specific add-or-subtract pairing, sum-to-product requires a genuinely new substitution rather than a free reversal, and the conversions describe real acoustic beating'),
  },
  {
    conceptId: SPECIALANGLES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The exact-value table is DERIVED, never merely memorized: placing the 45-45-90 and 30-60-90 '
      + 'triangles on the unit circle (scaled so the hypotenuse equals 1) and reading off Opposite, '
      + 'Adjacent, and Hypotenuse for each gives sin30°=1/2, cos30°=√3/2, tan30°=√3/3; '
      + 'sin45°=cos45°=√2/2, tan45°=1; sin60°=√3/2, cos60°=1/2, tan60°=√3. The sin column is strictly '
      + 'increasing from 0° to 90° (0, 1/2, √2/2, √3/2, 1) — this alone settles which of sin30°/sin60° is '
      + 'larger without recalling either value in isolation.\n\n'
      + 'Extending beyond 90° needs TWO ingredients together: the reference angle α (Q1: α=θ; Q2: '
      + 'α=180°-θ; Q3: α=θ-180°; Q4: α=360°-θ), which recovers the MAGNITUDE from the first-quadrant '
      + 'table, and the ASTC sign rule (All positive Q1, Sine positive Q2, Tangent positive Q3, Cosine '
      + 'positive Q4), which supplies the SIGN. Trig values are NOT always positive beyond Q1 — that is '
      + 'only true in the first quadrant; ASTC must be applied every time. ASTC is not an arbitrary '
      + 'mnemonic — it directly encodes the sign of the x-coordinate (cosine) and y-coordinate (sine) in '
      + 'each quadrant of the unit circle.\n\n'
      + 'The Q2 formula (180°-α) and Q3 formula (180°+α) are visually similar but genuinely distinct: Q2 '
      + 'sits just BEFORE 180° (subtract), Q3 sits just PAST it (add) — 210°=180°+30° is in Q3, never '
      + '180°-30°=150° (which is Q2).',
    targetedMisconceptions: [`${SPECIALANGLES}:MC-1`, `${SPECIALANGLES}:MC-2`, `${SPECIALANGLES}:MC-3`],
    source: eb(SPECIALANGLES, 'Core Understanding — the exact-value table is derived from two special triangles rather than memorized, extending beyond 90 degrees needs both the reference angle for magnitude and ASTC for sign, and the Q2/Q3 formulas are visually similar but distinct'),
  },
]

export const MATHEMATICS_TRIG_DOUBLE_ANGLE_PRODUCT_TO_SUM_SPECIAL_ANGLES_PROBES: SeedProbe[] = [
  // --- math.trig.double-angle-formulas ------------------------------------------
  {
    conceptId: DOUBLEANGLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If sin(A+B)=sinAcosB+cosAsinB, what do you get when you set A=B=θ? Is it 2sinθ, or something else?',
    choices: [
      { text: 'sin(θ+θ)=sinθcosθ+cosθsinθ=2sinθcosθ — a PRODUCT of sinθ and cosθ, never just 2sinθ; doubling the angle is not the same as doubling the function\'s output', isCorrect: true },
      { text: '2sinθ — doubling the angle simply doubles the sine value, the same way doubling the input to a linear function doubles its output', isCorrect: false, misconceptionId: `${DOUBLEANGLE}:MC-1` },
      { text: 'sin²θ — setting A=B=θ squares the original sine value', isCorrect: false, misconceptionId: `${DOUBLEANGLE}:MC-1` },
    ],
    targetedMisconceptions: [`${DOUBLEANGLE}:MC-1`],
    source: eb(DOUBLEANGLE, 'Discovery Question 1 — if sin(A+B)=sinAcosB+cosAsinB, what do you get when you set A=B=theta; is it 2sintheta, or something else'),
  },
  {
    conceptId: DOUBLEANGLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You are only given cosθ (not sinθ). Which of the three forms of cos2θ lets you answer in one step, without finding sinθ first?',
    choices: [
      { text: 'Form 2, cos2θ=2cos²θ-1 — it needs only cosθ, giving the answer directly; Form 1 (cos²θ-sin²θ) would require the unnecessary extra step of finding sinθ first', isCorrect: true },
      { text: 'Form 1, cos²θ-sin²θ — this is the standard form and should always be used first regardless of what is given', isCorrect: false, misconceptionId: `${DOUBLEANGLE}:MC-2` },
      { text: 'None of the three forms can be used without both sinθ and cosθ known simultaneously', isCorrect: false, misconceptionId: `${DOUBLEANGLE}:MC-2` },
    ],
    targetedMisconceptions: [`${DOUBLEANGLE}:MC-2`],
    source: eb(DOUBLEANGLE, 'Discovery Question 2 — if you\'re only given cos theta, which of the three forms of cos2theta lets you answer in one step, without finding sin theta first'),
  },
  {
    conceptId: DOUBLEANGLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If tanθ=1, is tan2θ a finite number or undefined? Check both 2tanθ and the full formula 2tanθ/(1-tan²θ).',
    choices: [
      { text: 'tan2θ is undefined — the denominator 1-tan²θ=1-1=0, matching tan2θ=tan90°; 2tanθ=2 alone is a perfectly ordinary finite number, but that is NOT the same quantity as tan2θ, and dropping the denominator hides exactly where the real function breaks', isCorrect: true },
      { text: 'tan2θ=2, the same as 2tanθ, since the denominator (1-tan²θ) does not affect the result here', isCorrect: false, misconceptionId: `${DOUBLEANGLE}:MC-3` },
      { text: 'tan2θ cannot be determined at all without a calculator, since the double-angle formula only applies to sine and cosine', isCorrect: false, misconceptionId: `${DOUBLEANGLE}:MC-3` },
    ],
    targetedMisconceptions: [`${DOUBLEANGLE}:MC-3`],
    source: eb(DOUBLEANGLE, 'Discovery Question 3 — if tan theta=1, is tan2theta a finite number or undefined; check both 2tantheta and the full formula 2tantheta/(1-tan^2theta)'),
  },

  // --- math.trig.product-to-sum ------------------------------------------
  {
    conceptId: PRODUCTTOSUM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You already derived sinAcosB=½[sin(A+B)+sin(A-B)] by ADDING two sine formulas. Does the SAME add-and-halve pattern give you cosAcosB, or does cosAcosB need a different pairing?',
    choices: [
      { text: 'cosAcosB needs its OWN derivation — adding the two COSINE formulas (not sine) gives cos(A+B)+cos(A-B)=2cosAcosB, so cosAcosB=½[cos(A+B)+cos(A-B)]; each of the four products requires re-deriving which pair and which operation, never reusing the sinAcosB pattern blindly', isCorrect: true },
      { text: 'Yes — the exact same combination that produced sinAcosB (adding the two sine formulas) also produces cosAcosB, since all four product-to-sum formulas share an identical derivation pattern', isCorrect: false, misconceptionId: `${PRODUCTTOSUM}:MC-1` },
      { text: 'cosAcosB cannot be derived by this technique at all and must be looked up separately', isCorrect: false, misconceptionId: `${PRODUCTTOSUM}:MC-1` },
    ],
    targetedMisconceptions: [`${PRODUCTTOSUM}:MC-1`],
    source: eb(PRODUCTTOSUM, 'Discovery Question 1 — you already derived sinAcosB by adding two sine formulas; what do you get if you subtract them instead; does the same pattern extend to all four products'),
  },
  {
    conceptId: PRODUCTTOSUM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If X=A+B and Y=A-B, can you just "read the product-to-sum formula backward" to get the sum-to-product formula, or is something more required?',
    choices: [
      { text: 'Something more is required — you must solve for A=(X+Y)/2 and B=(X-Y)/2 and substitute back; this is a genuinely NEW substitution step, not a free relabeling, since the product-to-sum formula\'s right side uses A,B while the sum-to-product formula\'s left side needs X,Y', isCorrect: true },
      { text: 'Yes — the sum-to-product formula is simply the product-to-sum formula with the equation flipped left-to-right, requiring no additional algebraic step', isCorrect: false, misconceptionId: `${PRODUCTTOSUM}:MC-2` },
      { text: 'No relationship exists between the two directions at all; they must be derived by entirely independent methods', isCorrect: false, misconceptionId: `${PRODUCTTOSUM}:MC-2` },
    ],
    targetedMisconceptions: [`${PRODUCTTOSUM}:MC-2`],
    source: eb(PRODUCTTOSUM, 'Discovery Question 2 — if X=A+B and Y=A-B, can you solve for A and B in terms of X and Y; what formula does that let you rewrite'),
  },
  {
    conceptId: PRODUCTTOSUM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two speakers play tones at 440 Hz and 444 Hz. Based on the sum-to-product identity, what would you predict you hear?',
    choices: [
      { text: 'A single fast oscillation near the average frequency (442 Hz) whose amplitude rises and falls slowly (the audible "beat") — this is exactly the physical phenomenon the sum-to-product identity describes, not merely an abstract algebraic manipulation', isCorrect: true },
      { text: 'Two completely separate, independent pitches with no interaction between them at all', isCorrect: false, misconceptionId: `${PRODUCTTOSUM}:MC-3` },
      { text: 'Silence, since the two frequencies are close enough to cancel each other out entirely', isCorrect: false, misconceptionId: `${PRODUCTTOSUM}:MC-3` },
    ],
    targetedMisconceptions: [`${PRODUCTTOSUM}:MC-3`],
    source: eb(PRODUCTTOSUM, 'Discovery Question 3 — two speakers play tones at 440 Hz and 444 Hz; what do you predict you would hear, two separate pitches, or something else'),
  },

  // --- math.trig.special-angles ------------------------------------------
  {
    conceptId: SPECIALANGLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Without recalling either value directly, can you tell whether sin30° or sin60° is larger, just from knowing 30°<60° and that sine increases from 0° to 90°?',
    choices: [
      { text: 'Yes — since sine is strictly increasing from 0° to 90° (0, 1/2, √2/2, √3/2, 1) and 30°<60°, sin30° MUST be the smaller value (1/2) and sin60° the larger (√3/2), settling the pairing without recalling either value from scratch', isCorrect: true },
      { text: 'No — the two values must simply be memorized independently, since there is no structural relationship between them', isCorrect: false, misconceptionId: `${SPECIALANGLES}:MC-1` },
      { text: 'sin30°=√3/2 and sin60°=1/2, since larger angles correspond to smaller sine values throughout the entire range 0° to 90°', isCorrect: false, misconceptionId: `${SPECIALANGLES}:MC-1` },
    ],
    targetedMisconceptions: [`${SPECIALANGLES}:MC-1`],
    source: eb(SPECIALANGLES, 'Discovery Question 1 — without recalling either value directly, can you tell whether sin30 or sin60 is larger, just from knowing 30<60 and that sine increases from 0 to 90'),
  },
  {
    conceptId: SPECIALANGLES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '210° and 150° both have reference angle 30°. Do they give the same trig values, or different ones?',
    choices: [
      { text: 'Different — 150° is in Q2 (sign pattern +,-,- for sin,cos,tan) while 210° is in Q3 (sign pattern -,-,+); the magnitude is identical (from the shared reference angle 30°) but the signs genuinely differ between the two quadrants', isCorrect: true },
      { text: 'The same values in every respect, since both angles share the same reference angle of 30°', isCorrect: false, misconceptionId: `${SPECIALANGLES}:MC-3` },
      { text: '210°=180°-30°=150°, so the two angles are actually identical and trivially share the same values', isCorrect: false, misconceptionId: `${SPECIALANGLES}:MC-3` },
    ],
    targetedMisconceptions: [`${SPECIALANGLES}:MC-3`],
    source: eb(SPECIALANGLES, 'Discovery Question 3 — 210 and 150 both have reference angle 30; do they give the same trig values, or different ones; what\'s the difference'),
  },
  {
    conceptId: SPECIALANGLES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is cos150° positive or negative? What tells you the sign, separately from the magnitude?',
    choices: [
      { text: 'Negative — 150° is in Q2, where ASTC says only Sine is positive (cosine is negative there), so cos150°=-cos30°=-√3/2; the sign comes from ASTC applied to the quadrant, found FIRST, separately from the reference-angle magnitude', isCorrect: true },
      { text: 'Positive — trig values evaluated at any angle are always positive, matching the pattern seen throughout the first quadrant', isCorrect: false, misconceptionId: `${SPECIALANGLES}:MC-2` },
      { text: 'The sign cannot be determined without a calculator, since ASTC only applies to angles less than 90°', isCorrect: false, misconceptionId: `${SPECIALANGLES}:MC-2` },
    ],
    targetedMisconceptions: [`${SPECIALANGLES}:MC-2`],
    source: eb(SPECIALANGLES, 'Discovery Question 2 — is cos150 positive or negative; what tells you the sign, separately from the magnitude'),
  },
]

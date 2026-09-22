/**
 * Batch: Pythagorean identities, reciprocal/quotient identities, reference
 * angles, and graphs of trig functions (all math.trig).
 *
 * All four become ready off already-authored prerequisites
 * (math.trig.trig-identities + math.trig.unit-circle for pythagorean-
 * identities; math.trig.trig-identities for reciprocal-identities;
 * math.trig.unit-circle for reference-angles; math.trig.amplitude-period-
 * phase, prior batch, for trig-graphs). None unblocks a further concept
 * per the live KG. Authoring all four in one batch — the entire remaining
 * frontier — brings math.trig to 25/25 in this campaign's own asset
 * layer, the third mathematics domain closed by this campaign after
 * math.cat and math.abst.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.trig.pythagorean-identities.md,
 * math.trig.reciprocal-identities.md, math.trig.reference-angles.md, and
 * math.trig.trig-graphs.md.
 *
 *   PYTHID    pythagorean-identities — sin²θ+cos²θ=1 holds for EVERY real
 *             θ, never restricted to acute angles in a right triangle;
 *             the identity form should MATCH the functions already in
 *             the problem, never defaulting to the fundamental form when
 *             a tan/sec or cot/csc form gives the answer in one step; a
 *             square root of a squared quantity recovers only magnitude,
 *             never the sign, which must come from the quadrant.
 *   RECIPID   reciprocal-identities — the "co" prefix does NOT signal a
 *             connection to cosine — csc is sine's reciprocal, never
 *             cosine's; cot is tangent's RECIPROCAL (tan·cot=1), never
 *             another name for tan itself; a reciprocal function is
 *             genuinely undefined wherever its primary partner is zero,
 *             never a large number or zero itself.
 *   REFANGLE  reference-angles — the reference-angle formula genuinely
 *             DEPENDS on the quadrant (Q1: θ; Q2: 180°-θ; Q3: θ-180°;
 *             Q4: 360°-θ), never one universal subtraction; the trig
 *             value needs BOTH the reference angle's magnitude AND
 *             ASTC's sign as two separate lookups, never the magnitude
 *             copied unchanged; a reference angle is ALWAYS acute, never
 *             large just because the original angle is large.
 *   TRIGGRAPHS trig-graphs — tan has period π, not 2π, since cosine's
 *             zeros (which generate tan's asymptotes) are spaced π
 *             apart, never assumed to share sin/cos's 2π period; cos
 *             starts at its MAXIMUM (0,1), never at zero like sin; a
 *             phase shift's direction comes from the factored -C/B
 *             value, never the visually-suggested sign of C.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PYTHID = 'math.trig.pythagorean-identities'
const RECIPID = 'math.trig.reciprocal-identities'
const REFANGLE = 'math.trig.reference-angles'
const TRIGGRAPHS = 'math.trig.trig-graphs'

export const MATHEMATICS_TRIG_PYTHAGOREAN_RECIPROCAL_REFERENCE_GRAPHS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PYTHID, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Three equivalent Pythagorean forms exist — sin²θ+cos²θ=1 (use when sin/cos appear), '
      + '1+tan²θ=sec²θ (use when tan/sec appear), 1+cot²θ=csc²θ (use when cot/csc appear) — and ALL '
      + 'THREE hold for EVERY real θ, never restricted to acute angles in a right triangle: at θ=150°, '
      + 'sin(150°)=1/2 and cos(150°)=-√3/2, and (1/2)²+(-√3/2)²=1/4+3/4=1, confirming the identity with '
      + 'no right triangle in sight.\n\n'
      + 'Identity SELECTION matches the form to what\'s already in the problem: given tanθ=3, finding '
      + 'sec²θ=1+tan²θ=1+9=10 takes ONE step, never the longer route of extracting sin and cos '
      + 'separately from the fundamental form.\n\n'
      + 'Solving sin²θ=1-cos²θ for sinθ gives ±√(1-cos²θ) — taking a square root of a squared quantity '
      + 'produces the MAGNITUDE only (|sinθ|), never the sign; the actual sign must be recovered '
      + 'SEPARATELY from the given quadrant via ASTC. Given cosθ=4/5 with θ in Q4, sin²θ=9/25 gives '
      + 'sinθ=±3/5, but Q4 requires sinθ<0, so sinθ=-3/5, never the bare positive root.',
    targetedMisconceptions: [`${PYTHID}:MC-1`, `${PYTHID}:MC-2`, `${PYTHID}:MC-3`],
    source: eb(PYTHID, 'Core Understanding — the Pythagorean identity holds for every real angle never just acute ones, the identity form should be selected to match the functions present, and a square root recovers magnitude only while sign comes from the quadrant'),
  },
  {
    conceptId: RECIPID, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Cosecant, secant, and cotangent are EXACT RECIPROCALS of sine, cosine, and tangent — never '
      + 'separate independent facts. cscθ=1/sinθ (sine\'s reciprocal), secθ=1/cosθ (cosine\'s '
      + 'reciprocal), cotθ=1/tanθ=cosθ/sinθ (tangent\'s reciprocal). The "co" prefix in cosecant and '
      + 'cotangent does NOT signal a connection to cosine — cosecant is sine\'s reciprocal, and '
      + 'cotangent is tangent\'s reciprocal. The safe anchor is the shared first LETTER: secant and '
      + 'cosine both begin with "c" and pair together; cosecant and sine are the other pair.\n\n'
      + 'Cotangent is NOT another name for tangent — it is tangent\'s flipped fraction, and tanθ·cotθ=1 '
      + 'always, verifying the reciprocal relationship directly (e.g. tanθ=3/4 gives cotθ=4/3, and '
      + '(3/4)(4/3)=1).\n\n'
      + 'Each reciprocal function is genuinely UNDEFINED wherever its primary partner is zero: tanθ and '
      + 'secθ are undefined wherever cosθ=0; cotθ and cscθ are undefined wherever sinθ=0. Undefined '
      + 'means genuinely undefined — not zero, not a large number — since dividing by zero produces no '
      + 'number at all.',
    targetedMisconceptions: [`${RECIPID}:MC-1`, `${RECIPID}:MC-2`, `${RECIPID}:MC-3`],
    source: eb(RECIPID, 'Core Understanding — the co prefix does not mean cosine since cosecant pairs with sine via the shared-letter anchor, cotangent is tangent\'s reciprocal never a synonym, and each reciprocal function is undefined wherever its primary partner is zero'),
  },
  {
    conceptId: REFANGLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The reference angle is the ACUTE angle between an angle\'s terminal side and the x-axis. The '
      + 'formula for computing it genuinely DEPENDS on which quadrant the angle falls in — there is no '
      + 'single universal subtraction: Q1, the reference angle IS θ itself; Q2, 180°-θ; Q3, θ-180°; Q4, '
      + '360°-θ. Angles 150° (Q2), 210° (Q3), and 330° (Q4) all share the identical reference angle 30°, '
      + 'despite requiring three genuinely different formulas — proving the FORMULA, not the reference '
      + 'angle itself, is what varies by quadrant.\n\n'
      + 'Once the reference angle is found, the trig value of the original angle needs TWO separate '
      + 'lookups: the MAGNITUDE from the reference angle\'s Q1 value, and the SIGN from ASTC. At the '
      + 'same reference angle 30° in Q2, sin(150°)=+sin(30°)=+1/2 (sign unchanged) but '
      + 'cos(150°)=-cos(30°)=-√3/2 (sign flipped) — proving the sign must be checked per-function, never '
      + 'copied unchanged along with the magnitude.\n\n'
      + 'A reference angle is ALWAYS acute, however far the original angle has traveled: for 300° (deep '
      + 'in Q4, close to a full revolution), the reference angle is 360°-300°=60°, genuinely acute — the '
      + 'formula measures the distance back to the NEAREST axis, never a fraction of the whole angle\'s '
      + 'size.',
    targetedMisconceptions: [`${REFANGLE}:MC-1`, `${REFANGLE}:MC-2`, `${REFANGLE}:MC-3`],
    source: eb(REFANGLE, 'Core Understanding — the reference-angle formula genuinely depends on the quadrant, the trig value needs both the reference angle\'s magnitude and ASTC\'s sign as separate lookups, and a reference angle is always acute regardless of the original angle\'s size'),
  },
  {
    conceptId: TRIGGRAPHS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'y=sinx starts at (0,0), rises to (π/2,1), returns to zero at π, falls to (3π/2,-1), closes at '
      + '(2π,0) — amplitude 1, period 2π. y=cosx has the SAME amplitude and period but starts at its '
      + 'MAXIMUM, (0,1) — never at zero like sin — related by cosx=sin(x+π/2). On the unit circle at '
      + 'θ=0, the point is (1,0): cos is the x-coordinate (=1), sin is the y-coordinate (=0), a direct '
      + 'consequence of the unit-circle definitions, never an arbitrary rule.\n\n'
      + 'y=tanx has period π, NOT 2π: since tanx=sinx/cosx is undefined wherever cosx=0 (at '
      + 'x=π/2+kπ, spaced exactly π apart), each such zero generates a new vertical asymptote. Marking '
      + 'two consecutive asymptotes at -π/2 and π/2 (exactly π apart) confirms the period is π — never '
      + '2π, despite sin and cos sharing that period.\n\n'
      + 'For a transformed sinusoid y=Asin(Bx+C)+D, the five-key-point algorithm computes amplitude, '
      + 'period T=2π/|B|, phase shift φ=-C/B, and midline D. The phase shift\'s direction comes from '
      + 'this FACTORED -C/B value, never the visually-suggested sign of C: sin(x+π/2)=sin(x-(-π/2)) '
      + 'confirms a shift of -π/2, a LEFT shift, despite the visible "+" sign.',
    targetedMisconceptions: [`${TRIGGRAPHS}:MC-1`, `${TRIGGRAPHS}:MC-2`, `${TRIGGRAPHS}:MC-3`],
    source: eb(TRIGGRAPHS, 'Core Understanding — tangent has period pi rather than 2 pi because cosine\'s zeros generating its asymptotes are pi apart, cosine starts at its maximum rather than at zero like sine, and a phase shift\'s direction comes from the factored -C/B value rather than the visible sign of C'),
  },
]

export const MATHEMATICS_TRIG_PYTHAGOREAN_RECIPROCAL_REFERENCE_GRAPHS_PROBES: SeedProbe[] = [
  // --- math.trig.pythagorean-identities ------------------------------------------
  {
    conceptId: PYTHID, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is sin²(150°)+cos²(150°) equal to 1? Does 150° live in a right triangle?',
    choices: [
      { text: 'Yes, it equals 1 — sin(150°)=1/2 and cos(150°)=-√3/2 give (1/2)²+(-√3/2)²=1/4+3/4=1; the identity holds for EVERY real angle, obtuse or otherwise, with no right triangle required anywhere', isCorrect: true },
      { text: 'No — the identity only holds for acute angles that genuinely appear inside a right triangle, so 150° is outside its valid range', isCorrect: false, misconceptionId: `${PYTHID}:MC-1` },
      { text: 'The identity cannot be evaluated at 150° at all, since sine and cosine are undefined for angles greater than 90°', isCorrect: false, misconceptionId: `${PYTHID}:MC-1` },
    ],
    targetedMisconceptions: [`${PYTHID}:MC-1`],
    source: eb(PYTHID, 'Discovery Question 1 — is sin^2(150) + cos^2(150) equal to 1; does 150 degrees live in a right triangle'),
  },
  {
    conceptId: PYTHID, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If you know tanθ and want secθ, is there a faster identity than sin²θ+cos²θ=1?',
    choices: [
      { text: 'Yes — 1+tan²θ=sec²θ gives the answer in ONE step (e.g. tanθ=3 gives sec²θ=1+9=10), never requiring the longer route of extracting sin and cos separately from the fundamental form first', isCorrect: true },
      { text: 'No — the fundamental form sin²θ+cos²θ=1 is always the correct and only identity to use, regardless of which functions are already known', isCorrect: false, misconceptionId: `${PYTHID}:MC-2` },
      { text: 'No, since the tan/sec identity is only valid for a restricted set of angles unlike the fundamental sin/cos form', isCorrect: false, misconceptionId: `${PYTHID}:MC-2` },
    ],
    targetedMisconceptions: [`${PYTHID}:MC-2`],
    source: eb(PYTHID, 'Discovery Question 2 — if you know tan theta and want sec theta, is there a faster identity than sin^2theta+cos^2theta=1'),
  },
  {
    conceptId: PYTHID, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When you take √(1-cos²θ), do you get sinθ, or something else? What extra information do you need to pin down the sign?',
    choices: [
      { text: 'You get |sinθ|, the magnitude only, never sinθ itself with a determined sign — the sign requires the QUADRANT of θ (via ASTC) as separate information the square root operation cannot supply', isCorrect: true },
      { text: 'You get sinθ directly, with the correct sign automatically determined by the positive convention of the square root symbol', isCorrect: false, misconceptionId: `${PYTHID}:MC-3` },
      { text: 'You always get the negative value, -sinθ, since the expression involves subtracting cos²θ from 1', isCorrect: false, misconceptionId: `${PYTHID}:MC-3` },
    ],
    targetedMisconceptions: [`${PYTHID}:MC-3`],
    source: eb(PYTHID, 'Discovery Question 3 — when you take the square root of 1-cos^2theta, do you get sintheta, or something else; what extra information do you need to pin down the sign'),
  },

  // --- math.trig.reciprocal-identities ------------------------------------------
  {
    conceptId: RECIPID, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "co" in "cosecant" mean it\'s paired with cosine? What does cscθ actually equal?',
    choices: [
      { text: 'No — cscθ=1/sinθ, sine\'s reciprocal, never cosine\'s; the safe anchor is the shared first LETTER: secant and cosine both start with "c" (paired: sec=1/cos), while cosecant pairs with sine instead', isCorrect: true },
      { text: 'Yes — cscθ=1/cosθ, since the "co" prefix directly indicates a pairing with cosine, exactly parallel to how "cosine" itself is named', isCorrect: false, misconceptionId: `${RECIPID}:MC-1` },
      { text: 'Yes, and additionally secθ=1/sinθ, since both reciprocal functions with a "c" involved pair with the opposite of their apparent name', isCorrect: false, misconceptionId: `${RECIPID}:MC-1` },
    ],
    targetedMisconceptions: [`${RECIPID}:MC-1`],
    source: eb(RECIPID, 'Discovery Question 1 — does co in cosecant mean it\'s paired with cosine; what does csc theta actually equal'),
  },
  {
    conceptId: RECIPID, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is sec(90°)? Before computing, is cos(90°) zero? What does that tell you?',
    choices: [
      { text: 'sec(90°) is UNDEFINED — cos(90°)=0, and secθ=1/cosθ, so dividing by zero produces no number at all; undefined means genuinely undefined, never a large number or zero itself', isCorrect: true },
      { text: 'sec(90°)=0, matching the value of cos(90°) directly, since secant and cosine are closely related functions', isCorrect: false, misconceptionId: `${RECIPID}:MC-3` },
      { text: 'sec(90°) is an extremely large but finite positive number, approaching infinity as a limit but never actually undefined', isCorrect: false, misconceptionId: `${RECIPID}:MC-3` },
    ],
    targetedMisconceptions: [`${RECIPID}:MC-3`],
    source: eb(RECIPID, 'Discovery Question 3 — what is sec(90 degrees); before computing, is cos(90 degrees) zero; what does that tell you'),
  },
  {
    conceptId: RECIPID, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If tanθ=3/4, is cotθ also 3/4, or something different? Check by multiplying them together.',
    choices: [
      { text: 'cotθ=4/3, the FLIPPED fraction, never the same value as tanθ — verified directly by tanθ·cotθ=(3/4)(4/3)=1, confirming cotangent is tangent\'s reciprocal, not another name for the same function', isCorrect: true },
      { text: 'cotθ=3/4, the exact same value as tanθ, since cotangent and tangent are simply two different names for the identical function', isCorrect: false, misconceptionId: `${RECIPID}:MC-2` },
      { text: 'cotθ cannot be determined from tanθ alone; it requires separately knowing both sinθ and cosθ first', isCorrect: false, misconceptionId: `${RECIPID}:MC-2` },
    ],
    targetedMisconceptions: [`${RECIPID}:MC-2`],
    source: eb(RECIPID, 'Discovery Question 2 — if tan theta=3/4, is cot theta also 3/4, or something different; check by multiplying them together'),
  },

  // --- math.trig.reference-angles ------------------------------------------
  {
    conceptId: REFANGLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '150°, 210°, and 330° all have reference angle 30°, but you compute it a different way for each. What\'s different about the formula, and what\'s the same about the result?',
    choices: [
      { text: 'The FORMULA differs by quadrant (Q2: 180°-150°=30°; Q3: 210°-180°=30°; Q4: 360°-330°=30°) while the RESULT is identical (30°) — proving the formula, not the reference angle itself, is what varies by quadrant; there is no single universal subtraction', isCorrect: true },
      { text: 'The same formula (180° minus the angle) works identically for all three, since they all reduce to the same reference angle by coincidence', isCorrect: false, misconceptionId: `${REFANGLE}:MC-1` },
      { text: 'The formulas are genuinely different AND the results should also be different; 30° is only an approximation shared by chance', isCorrect: false, misconceptionId: `${REFANGLE}:MC-1` },
    ],
    targetedMisconceptions: [`${REFANGLE}:MC-1`],
    source: eb(REFANGLE, 'Discovery Question 1 — 150, 210, and 330 all have reference angle 30, but you compute it a different way for each; what\'s different about the formula, and what\'s the same about the result'),
  },
  {
    conceptId: REFANGLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'sin(150°) and cos(150°) share the same reference angle, 30°. Compute both — do they come out with the same sign, or different signs?',
    choices: [
      { text: 'Different signs — sin(150°)=+sin(30°)=+1/2 (unchanged, since sine is positive in Q2) but cos(150°)=-cos(30°)=-√3/2 (flipped, since cosine is negative in Q2); the sign must be checked per-function via ASTC, never copied unchanged along with the magnitude', isCorrect: true },
      { text: 'The same sign for both — once the reference angle\'s magnitude is found, that value (with its sign) applies identically to every trig function at that angle', isCorrect: false, misconceptionId: `${REFANGLE}:MC-2` },
      { text: 'Both are negative, since 150° is beyond 90° and all trig functions become negative past the first quadrant', isCorrect: false, misconceptionId: `${REFANGLE}:MC-2` },
    ],
    targetedMisconceptions: [`${REFANGLE}:MC-2`],
    source: eb(REFANGLE, 'Discovery Question 2 — sin(150) and cos(150) share the same reference angle, 30; compute both, do they come out with the same sign, or different signs, why'),
  },
  {
    conceptId: REFANGLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '300° is a big angle — almost a full revolution. What\'s its reference angle? Is it big too?',
    choices: [
      { text: 'No, it is small — the reference angle for 300° (Q4) is 360°-300°=60°, genuinely acute, even though 300° is deep into its quadrant; the reference angle always measures the distance back to the NEAREST axis, never a fraction of the whole angle\'s size', isCorrect: true },
      { text: 'Yes, the reference angle should also be large — a big original angle produces a correspondingly big (obtuse or reflex) reference angle', isCorrect: false, misconceptionId: `${REFANGLE}:MC-3` },
      { text: 'The reference angle cannot be computed for angles this close to a full revolution; it is only defined for angles under 180°', isCorrect: false, misconceptionId: `${REFANGLE}:MC-3` },
    ],
    targetedMisconceptions: [`${REFANGLE}:MC-3`],
    source: eb(REFANGLE, 'Discovery Question 3 — 300 degrees is a big angle, almost a full revolution; what\'s its reference angle; is it big too'),
  },

  // --- math.trig.trig-graphs ------------------------------------------
  {
    conceptId: TRIGGRAPHS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Where are the first two vertical asymptotes of tanx on either side of the origin? How far apart are they?',
    choices: [
      { text: 'At -π/2 and π/2, exactly π apart — since tanx=sinx/cosx is undefined wherever cosx=0, and cosine\'s zeros are spaced π apart; this confirms tangent\'s period is π, never 2π despite sin and cos sharing that period', isCorrect: true },
      { text: 'At -π and π, exactly 2π apart, matching the same period as sinx and cosx', isCorrect: false, misconceptionId: `${TRIGGRAPHS}:MC-1` },
      { text: 'Tangent has no vertical asymptotes at all; it is continuous and defined everywhere like sine and cosine', isCorrect: false, misconceptionId: `${TRIGGRAPHS}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIGGRAPHS}:MC-1`],
    source: eb(TRIGGRAPHS, 'Discovery Question 1 — where are the first two vertical asymptotes of tanx on either side of the origin; how far apart are they'),
  },
  {
    conceptId: TRIGGRAPHS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For y=sin(x+π/2), does the graph shift left or right? What does factoring the argument tell you?',
    choices: [
      { text: 'LEFT — factoring gives sin(x+π/2)=sin(x-(-π/2)), so the shift is -π/2, a leftward shift; the visible "+" sign does NOT indicate rightward motion here, the true direction comes from the factored -C/B value', isCorrect: true },
      { text: 'RIGHT — the "+" sign in x+π/2 directly indicates a rightward shift by π/2, matching everyday intuition about adding a positive quantity', isCorrect: false, misconceptionId: `${TRIGGRAPHS}:MC-3` },
      { text: 'The graph does not shift at all; adding a constant inside sin only changes the amplitude, not the horizontal position', isCorrect: false, misconceptionId: `${TRIGGRAPHS}:MC-3` },
    ],
    targetedMisconceptions: [`${TRIGGRAPHS}:MC-3`],
    source: eb(TRIGGRAPHS, 'Discovery Question 3 — for y=sin(x+pi/2), does the graph shift left or right; what does factoring the argument tell you'),
  },
  {
    conceptId: TRIGGRAPHS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'At x=0, is cosx equal to 0 or to 1? What about sinx? Why do they differ?',
    choices: [
      { text: 'cos(0)=1 and sin(0)=0 — on the unit circle at θ=0, the point is (1,0): cos is the x-coordinate (=1, the MAXIMUM), sin is the y-coordinate (=0); this is a direct consequence of the unit-circle definitions, never an arbitrary rule', isCorrect: true },
      { text: 'Both cos(0) and sin(0) equal 0, since both graphs start at the origin in identical fashion', isCorrect: false, misconceptionId: `${TRIGGRAPHS}:MC-2` },
      { text: 'cos(0)=0 and sin(0)=1, the reverse pairing, since cosine is the "co-function" and starts where sine ends', isCorrect: false, misconceptionId: `${TRIGGRAPHS}:MC-2` },
    ],
    targetedMisconceptions: [`${TRIGGRAPHS}:MC-2`],
    source: eb(TRIGGRAPHS, 'Discovery Question 2 — at x=0, is cosx equal to 0 or to 1; what about sinx; why do they differ'),
  },
]

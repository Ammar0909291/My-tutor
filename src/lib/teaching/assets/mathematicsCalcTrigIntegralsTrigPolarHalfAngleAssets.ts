/**
 * Batch: trigonometric integrals (math.calc), polar form of complex
 * numbers, and half-angle formulas (both math.trig).
 *
 * math.calc.trig-integrals becomes ready off already-authored
 * math.calc.u-substitution and math.trig.product-to-sum (prior batch),
 * reopening the math.calc domain and directly unblocking
 * math.calc.trig-substitution next. math.trig.polar-form-complex becomes
 * ready off already-authored math.found.complex-numbers, math.trig.trig-
 * functions, and math.geom.polar-coordinates, and directly unblocks
 * math.trig.de-moivres-theorem, math.trig.eulers-formula, and
 * math.cx.complex-numbers-analysis (opening a new domain) next.
 * math.trig.half-angle-formulas becomes ready off already-authored
 * math.trig.double-angle-formulas (prior batch).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.trig-integrals.md,
 * math.trig.polar-form-complex.md, and math.trig.half-angle-formulas.md.
 *
 *   TRIGINT   trig-integrals — an ODD exponent leaves a single leftover
 *             factor that matches u-substitution's du, never a technique
 *             that works regardless of parity; when BOTH exponents are
 *             even, there is no stray factor to peel, so double-angle
 *             reduction is required instead, never a stalled substitution
 *             attempt; the correct strategy is selected by parity
 *             case-analysis EVERY time, never assumed universal from one
 *             prior success.
 *   POLARCOMPLEX polar-form-complex — the raw arctan output must be
 *             adjusted by the true quadrant of (a,b) before being reported
 *             as the argument, never accepted as-is outside Q1; the
 *             modulus is a DISTANCE requiring a square root, never the
 *             sum of squares alone; multiplying complex numbers in polar
 *             form MULTIPLIES the moduli and ADDS the arguments, never
 *             adds the moduli.
 *   HALFANGLE half-angle-formulas — sin(θ/2) is a radical expression
 *             derived from cosθ, never simply half of sinθ; the ± sign is
 *             determined by the quadrant of θ/2 itself, never by the
 *             quadrant of the original θ; the boundary test at θ=0
 *             reliably distinguishes which formula belongs to sine versus
 *             cosine, never guessed from memory alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TRIGINT = 'math.calc.trig-integrals'
const POLARCOMPLEX = 'math.trig.polar-form-complex'
const HALFANGLE = 'math.trig.half-angle-formulas'

export const MATHEMATICS_CALC_TRIG_INTEGRALS_TRIG_POLAR_HALF_ANGLE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TRIGINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For ∫sinⁿx cosᵐx dx, the strategy is selected by CHECKING THE PARITY of the exponents — never '
      + 'assumed from a prior success. When n is ODD, write sinⁿx=sinⁿ⁻¹x·sinx, where n-1 is now EVEN. '
      + 'Convert sinⁿ⁻¹x using sin²x=1-cos²x, leaving the entire integrand as a polynomial in cosx times '
      + 'the single leftover factor sinx dx — exactly the du needed for u=cosx. An ODD leftover power is '
      + 'what makes this substitution work; it is not a technique that works regardless of parity.\n\n'
      + 'When BOTH exponents are even, there is no single stray factor to peel off — every factor pairs '
      + 'up evenly, so substitution stalls. Instead, apply sin²x=(1-cos2x)/2 and cos²x=(1+cos2x)/2 '
      + '(direct consequences of the already-mastered product-to-sum/double-angle family) to rewrite the '
      + 'integrand in terms of cos2x, cos4x, etc., reducing the power before integrating — a genuinely '
      + 'different strategy from the substitution case, applying even to a SAME-argument even power like '
      + 'sin²x alone.\n\n'
      + '∫tanⁿx secᵐx dx requires its own analogous parity-based case analysis: if m is EVEN, split off '
      + 'sec²x and substitute u=tanx; if n is ODD, split off secx·tanx and substitute u=secx — the same '
      + 'parity-driven principle applied to a different function pair.',
    targetedMisconceptions: [`${TRIGINT}:MC-1`, `${TRIGINT}:MC-2`, `${TRIGINT}:MC-3`],
    source: eb(TRIGINT, 'Core Understanding — an odd exponent produces a leftover factor that matches u-substitution, both-even exponents require double-angle power reduction instead, and the correct strategy is selected by checking parity every time'),
  },
  {
    conceptId: POLARCOMPLEX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A complex number z=a+bi is plotted as the point (a,b) in the Argand plane. The modulus '
      + '|z|=r=√(a²+b²) is the DISTANCE from the origin — always requiring the square root, since a '
      + 'distance is never reported as the sum of squares alone. The argument arg(z)=θ is the angle '
      + 'counterclockwise from the positive real axis, giving the polar form z=r(cosθ+isinθ)=re^(iθ).\n\n'
      + 'Converting Cartesian to polar requires care with the argument: the raw reference angle '
      + 'φ=arctan(|b/a|) always lies in [0,π/2] regardless of which quadrant (a,b) is actually in, '
      + 'because arctan\'s range is restricted to (-π/2,π/2). The TRUE argument θ must be reconstructed '
      + 'from φ using the actual quadrant of (a,b): Q1 keeps θ=φ, Q2 uses θ=π-φ, Q3 uses θ=π+φ, Q4 uses '
      + 'θ=2π-φ. Reporting the raw arctan output as the argument outside Q1 is the single most common '
      + 'error on this concept.\n\n'
      + 'The payoff of polar form: multiplication becomes geometrically simple — '
      + '(r₁e^(iθ₁))(r₂e^(iθ₂))=r₁r₂e^(i(θ₁+θ₂)) — MULTIPLY the moduli, ADD the arguments, never add the '
      + 'moduli. This is a direct consequence of the exponential law. De Moivre\'s theorem, '
      + 'zⁿ=rⁿ(cos nθ+i sin nθ), follows immediately by applying this rule n times.',
    targetedMisconceptions: [`${POLARCOMPLEX}:MC-1`, `${POLARCOMPLEX}:MC-2`, `${POLARCOMPLEX}:MC-3`],
    source: eb(POLARCOMPLEX, 'Core Understanding — the argument must be quadrant-adjusted from the raw arctan output, the modulus is a distance requiring a square root, and polar multiplication multiplies moduli while adding arguments'),
  },
  {
    conceptId: HALFANGLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The half-angle formulas are the power-reducing identities read backward. Starting from '
      + 'sin²θ=(1-cos2θ)/2 and cos²θ=(1+cos2θ)/2, set α=θ/2 so 2α=θ. Substituting throughout: '
      + 'sin²(θ/2)=(1-cosθ)/2 and cos²(θ/2)=(1+cosθ)/2. Taking square roots: '
      + 'sin(θ/2)=±√((1-cosθ)/2), cos(θ/2)=±√((1+cosθ)/2). This is exactly the double-angle derivation '
      + 'run in reverse — sin(θ/2) is a radical expression derived from cosθ, NEVER simply half of sinθ '
      + '(sin is not linear).\n\n'
      + 'The ± sign is determined by the quadrant of θ/2 ITSELF, never by the quadrant of the original '
      + 'θ — these can genuinely differ: if θ=270° (Q3), then θ/2=135°, which is in Q2, where sin is '
      + 'positive. Determining the sign requires computing θ/2 numerically FIRST, then checking which '
      + 'quadrant that specific value lands in.\n\n'
      + 'A boundary check at θ=0 reliably distinguishes which formula belongs to which function: '
      + 'sin(0)=0 and cos(0)=1. Testing (1-cos0)/2=0 matches sin(0/2)=0, confirming (1-cosθ) belongs to '
      + 'the SINE formula; testing (1+cos0)/2=1 matches cos(0/2)=1, confirming (1+cosθ) belongs to the '
      + 'COSINE formula — a reliable check whenever the two nearly-symmetric forms are confused. The '
      + 'rationalized tangent form tan(θ/2)=(1-cosθ)/sinθ carries its own correct sign automatically, '
      + 'sidestepping the quadrant question entirely.',
    targetedMisconceptions: [`${HALFANGLE}:MC-1`, `${HALFANGLE}:MC-2`, `${HALFANGLE}:MC-3`],
    source: eb(HALFANGLE, 'Core Understanding — the half-angle formulas are the power-reducing identities read backward via the substitution 2alpha=theta, the sign is determined by the quadrant of theta/2 not theta, and a boundary test at theta=0 sorts the two formulas'),
  },
]

export const MATHEMATICS_CALC_TRIG_INTEGRALS_TRIG_POLAR_HALF_ANGLE_PROBES: SeedProbe[] = [
  // --- math.calc.trig-integrals ------------------------------------------
  {
    conceptId: TRIGINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For ∫sin²x cos²x dx (both exponents even), can you use u=sinx or u=cosx directly, the same way you would for ∫sin³x cos²x dx (n odd)?',
    choices: [
      { text: 'No — peeling one factor from an even exponent leaves an odd power stranded with no clean pairing for du; the odd-power substitution technique specifically requires an ODD leftover power to isolate the matching factor, which both-even integrands do not have', isCorrect: true },
      { text: 'Yes — once u-substitution has worked on one sin/cos integral, it works identically for any combination of exponents, odd or even', isCorrect: false, misconceptionId: `${TRIGINT}:MC-1` },
      { text: 'Yes, since u=sinx always produces a valid du regardless of what power of cosx remains', isCorrect: false, misconceptionId: `${TRIGINT}:MC-1` },
    ],
    targetedMisconceptions: [`${TRIGINT}:MC-1`],
    source: eb(TRIGINT, 'Discovery Question 3 — if substitution worked for sin^3x cos^2x dx, will the same substitution work for sin^2x cos^2x dx; try it and see what happens'),
  },
  {
    conceptId: TRIGINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the double-angle identity sin²x=(1-cos2x)/2 require the two trig functions to have DIFFERENT arguments (like sin3x cosx), or does it apply to sin²x all by itself?',
    choices: [
      { text: 'It applies to sin²x by itself, a SAME-argument even power — the identical double-angle reduction resolves ∫sin²x cos²x dx=∫(1-cos4x)/8 dx just as it resolves different-argument products, since it is the same formula family applied the same way', isCorrect: true },
      { text: 'It only applies when the two trig functions have genuinely different arguments multiplied together, never to a single function raised to an even power', isCorrect: false, misconceptionId: `${TRIGINT}:MC-2` },
      { text: 'Double-angle reduction cannot be used for integration at all — it only converts products into sums for algebraic simplification', isCorrect: false, misconceptionId: `${TRIGINT}:MC-2` },
    ],
    targetedMisconceptions: [`${TRIGINT}:MC-2`],
    source: eb(TRIGINT, 'Discovery Question 2 — does the double-angle identity sin^2x=(1-cos2x)/2 require the two trig functions to have different arguments, or does it apply to sin^2x all by itself'),
  },
  {
    conceptId: TRIGINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You successfully solved several ∫sinⁿx cosᵐx dx integrals using odd-power substitution. Should you expect the SAME technique to work for every trig integral in this family, regardless of the exponents?',
    choices: [
      { text: 'No — the correct strategy is selected by a parity check EVERY time: substitution requires an odd leftover power, while both-even exponents require double-angle reduction instead; repeated success with one technique never certifies it universally', isCorrect: true },
      { text: 'Yes — once a technique has succeeded on several problems in this family, it becomes the standard universal method for every remaining case', isCorrect: false, misconceptionId: `${TRIGINT}:MC-3` },
      { text: 'Yes, since all trigonometric integrals of this form are solved by exactly one fixed procedure regardless of the specific exponents involved', isCorrect: false, misconceptionId: `${TRIGINT}:MC-3` },
    ],
    targetedMisconceptions: [`${TRIGINT}:MC-3`],
    source: eb(TRIGINT, 'Discovery Question 1 — for sin^3x cos^2x dx, if you split off one factor of sinx, what is left, and is that leftover power even or odd (used here to probe the universal-technique assumption)'),
  },

  // --- math.trig.polar-form-complex ------------------------------------------
  {
    conceptId: POLARCOMPLEX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'z=-1+i is plotted in the second quadrant. Can its true argument possibly be a negative angle like -π/4, the raw arctan(1/-1) output?',
    choices: [
      { text: 'No — a Q2 argument must fall in the range (π/2,π); the raw arctan output only ever lies in (-π/2,π/2), so it must be adjusted using the Q2 rule θ=π-φ (with φ=π/4) to get the true argument 3π/4', isCorrect: true },
      { text: 'Yes — the raw arctan output is always the correct argument for any complex number, in every quadrant', isCorrect: false, misconceptionId: `${POLARCOMPLEX}:MC-1` },
      { text: 'Yes, since the argument of a complex number in Q2 is always negative by definition', isCorrect: false, misconceptionId: `${POLARCOMPLEX}:MC-1` },
    ],
    targetedMisconceptions: [`${POLARCOMPLEX}:MC-1`],
    source: eb(POLARCOMPLEX, 'Discovery Question 1 — if z=-1+i is plotted in the second quadrant, can its true argument possibly be a negative angle like -pi/4; what range of angles must a Q2 argument actually fall in'),
  },
  {
    conceptId: POLARCOMPLEX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If multiplying by z₂ scales a shape by r₂, and you already scaled it by r₁, what is the OVERALL scaling factor when you multiply two complex numbers in polar form — r₁+r₂, or r₁×r₂?',
    choices: [
      { text: 'r₁×r₂ — scaling by r₁ and then by r₂ COMPOSES multiplicatively, exactly like scaling a photograph by 2x then by 3x gives 6x overall, never 5x; polar multiplication multiplies the moduli, it never adds them', isCorrect: true },
      { text: 'r₁+r₂ — combining two complex numbers by multiplication adds their moduli, the same way combining them by Cartesian addition adds their components', isCorrect: false, misconceptionId: `${POLARCOMPLEX}:MC-3` },
      { text: 'Neither — the moduli are unaffected by multiplication; only the arguments change when two complex numbers are multiplied', isCorrect: false, misconceptionId: `${POLARCOMPLEX}:MC-3` },
    ],
    targetedMisconceptions: [`${POLARCOMPLEX}:MC-3`],
    source: eb(POLARCOMPLEX, 'Discovery Question 3 — if multiplying by z2 scales a shape by r2, and you already scaled it by r1, what is the overall scaling factor, r1+r2, or r1 times r2'),
  },
  {
    conceptId: POLARCOMPLEX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is |z| for z=3+4i a distance, or the square of a distance? What formula computes a distance from a right triangle\'s two legs?',
    choices: [
      { text: '|z| is a distance, computed via the Pythagorean-theorem hypotenuse √(a²+b²)=√(3²+4²)=√25=5 — the square root is always required; reporting 3²+4²=25 alone gives the squared modulus, not the modulus itself', isCorrect: true },
      { text: '|z| is the square of a distance, so |z|=3²+4²=25 is the fully correct final answer with no further step needed', isCorrect: false, misconceptionId: `${POLARCOMPLEX}:MC-2` },
      { text: 'The modulus cannot be computed from a and b alone; it requires knowing the argument θ first', isCorrect: false, misconceptionId: `${POLARCOMPLEX}:MC-2` },
    ],
    targetedMisconceptions: [`${POLARCOMPLEX}:MC-2`],
    source: eb(POLARCOMPLEX, 'Discovery Question 2 — is |z| a distance, or the square of a distance; what formula computes a distance from a right triangle\'s two legs'),
  },

  // --- math.trig.half-angle-formulas ------------------------------------------
  {
    conceptId: HALFANGLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You know sin²θ=(1-cos2θ)/2. If you set α=θ/2 so that 2α=θ, what formula do you get for sin²(θ/2) — and is sin(θ/2) simply half of sinθ?',
    choices: [
      { text: 'sin²(θ/2)=(1-cosθ)/2, so sin(θ/2)=±√((1-cosθ)/2) — a radical expression derived from cosθ, NEVER simply ½sinθ; sin(45°)≈0.707 while ½sin(90°)=0.5 are genuinely different numbers, proving the scaling shortcut fails', isCorrect: true },
      { text: 'sin(θ/2)=½sinθ — halving the angle halves the sine value directly, the same way halving the input to a linear function halves its output', isCorrect: false, misconceptionId: `${HALFANGLE}:MC-1` },
      { text: 'sin²(θ/2) cannot be expressed in terms of cosθ at all; it requires an entirely separate derivation unrelated to the double-angle identities', isCorrect: false, misconceptionId: `${HALFANGLE}:MC-1` },
    ],
    targetedMisconceptions: [`${HALFANGLE}:MC-1`],
    source: eb(HALFANGLE, 'Discovery Question 1 — you know sin^2theta=(1-cos2theta)/2; if you set alpha=theta/2 so that 2alpha=theta, what formula do you get for sin^2(theta/2)'),
  },
  {
    conceptId: HALFANGLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If θ=270°, what is the actual numeric value of θ/2 — and which quadrant does THAT value fall into, for determining the sign of sin(θ/2)?',
    choices: [
      { text: 'θ/2=135°, which is in Q2, where sin is positive — the sign is determined by the quadrant of θ/2 ITSELF (computed numerically first), never by the quadrant of the original θ (which is Q3, a different quadrant entirely)', isCorrect: true },
      { text: 'Since θ=270° is in Q3, the sign of sin(θ/2) is determined directly by Q3\'s sign rule, without needing to compute θ/2 separately', isCorrect: false, misconceptionId: `${HALFANGLE}:MC-2` },
      { text: 'θ/2 always lands in the same quadrant as θ, so Q3\'s sign rule applies to both angles identically', isCorrect: false, misconceptionId: `${HALFANGLE}:MC-2` },
    ],
    targetedMisconceptions: [`${HALFANGLE}:MC-2`],
    source: eb(HALFANGLE, 'Discovery Question 2 — if theta=270 degrees, what is the actual numeric value of theta/2, and which quadrant does that value fall into'),
  },
  {
    conceptId: HALFANGLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'At θ=0, sin(0)=0 and cos(0)=1. Which of the two half-angle formulas, (1-cosθ) or (1+cosθ), must belong to the SINE formula?',
    choices: [
      { text: '(1-cosθ) belongs to sine — testing (1-cos0)/2=0 matches sin(0/2)=sin(0)=0 exactly; (1+cosθ) belongs to cosine, since (1+cos0)/2=1 matches cos(0/2)=cos(0)=1 — this boundary test reliably sorts the two nearly-symmetric formulas', isCorrect: true },
      { text: '(1+cosθ) belongs to sine and (1-cosθ) belongs to cosine, the reverse pairing from the boundary test', isCorrect: false, misconceptionId: `${HALFANGLE}:MC-3` },
      { text: 'The boundary test at θ=0 cannot distinguish the two formulas, since both give the same result at that specific angle', isCorrect: false, misconceptionId: `${HALFANGLE}:MC-3` },
    ],
    targetedMisconceptions: [`${HALFANGLE}:MC-3`],
    source: eb(HALFANGLE, 'Discovery Question 3 — at theta=0, sin(0)=0 and cos(0)=1; which of the two half-angle formulas, (1-costheta) or (1+costheta), gives 0 when you plug in theta=0'),
  },
]

/**
 * MATHEMATICS — probe DEPTH, batch 7: math.trig (25 (concept, band) pairs, 49 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified. math.trig.trig-equations already
 * held four probes, so it gains one (its mcq ladder's unused DEVELOPING rung).
 *
 * Every value below was worked by hand, e.g. c² = 25 + 64 − 80·cos 60° = 49,
 * cos C = (49 + 64 − 169)/112 = −1/2 for the 7-8-13 triangle, the SSA case
 * A = 30°, a = 6, b = 10 (sin B = 5/6, both B ≈ 56.4° and B ≈ 123.6° fit),
 * cos 2θ = 2(1/3)² − 1 = −7/9, sin 15° = (√6 − √2)/4, sin 75° = (√6 + √2)/4,
 * and z₁z₂ = 6(cos 90° + i sin 90°) = 6i.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, gradeBand: GradeBand, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

const M = 'mcq' as const
const X = 'misconception_probe' as const

export const MATHEMATICS_DEPTH_TRIG_PROBES: SeedProbe[] = [
  q('math.trig.amplitude-period-phase', HIGH, M, D, 'What is the period of y = 3 sin(2x)?', 'π', ['2π', '3', '4π'], 'period 2π/B with B = 2; the 3 is the amplitude'),
  q('math.trig.amplitude-period-phase', HIGH, M, A, 'What is the phase shift of y = 2 cos(3x − π)?', 'π/3 to the right', ['π to the right', 'π/3 to the left', '3π to the right'], 'factor 3(x − π/3)'),

  q('math.trig.angle-measure', HIGH, M, D, 'Which angle is coterminal with 45°?', '405°', ['135°', '−45°', '225°'], 'add a full turn of 360°'),
  q('math.trig.angle-measure', HIGH, M, A, 'A circle has radius 3 m. How long is the arc cut off by a central angle of 2 radians?', '6 m', ['1.5 m', '360 m', '3 m'], 's = rθ with θ in radians'),

  q('math.trig.basic-ratios', HIGH, M, P, 'In a right triangle, the side opposite θ is 5 and the hypotenuse is 13. What is cos θ?', '12/13', ['5/13', '5/12', '13/12'], 'the adjacent side is √(169 − 25) = 12'),
  q('math.trig.basic-ratios', HIGH, M, A, 'If sin θ = 3/5 for an acute angle θ, what is tan θ?', '3/4', ['4/3', '3/5', '4/5'], 'a 3-4-5 triangle: opposite 3, adjacent 4'),

  q('math.trig.de-moivres-theorem', HIGH, M, D, 'By De Moivre\'s theorem, what is (cos 20° + i sin 20°)³?', 'cos 60° + i sin 60°', ['cos 20° + i sin 60°', '3 cos 20° + 3i sin 20°', 'cos 23° + i sin 23°'], 'multiply the angle by the power'),
  q('math.trig.de-moivres-theorem', HIGH, M, A, 'What are all the complex fourth roots of 16?', '2, −2, 2i and −2i', ['2 and −2 only', '2 only', '4, −4, 4i and −4i'], 'modulus 2, angles 0°, 90°, 180°, 270°'),

  q('math.trig.degree-radian-conversion', HIGH, M, D, 'What is 135° in radians?', '3π/4', ['2π/3', '5π/4', '135π'], 'multiply by π/180'),
  q('math.trig.degree-radian-conversion', HIGH, M, A, 'What is the area of a sector of radius 4 with central angle π/4?', '2π', ['4π', 'π', '8π'], 'A = ½r²θ = ½ · 16 · π/4'),

  q('math.trig.double-angle-formulas', HIGH, M, D, 'If sin θ = 3/5 and cos θ = 4/5, what is sin 2θ?', '24/25', ['6/5', '7/25', '12/25'], 'sin 2θ = 2 sin θ cos θ'),
  q('math.trig.double-angle-formulas', HIGH, M, A, 'If cos θ = 1/3, what is cos 2θ?', '−7/9', ['2/3', '7/9', '1/9'], 'cos 2θ = 2cos²θ − 1'),

  q('math.trig.eulers-formula', HIGH, M, P, 'What does e^(iπ/2) equal?', 'i', ['1', '−1', '−i'], 'cos(π/2) + i sin(π/2)'),
  q('math.trig.eulers-formula', HIGH, M, A, 'Write 2e^(iπ/3) in the form a + bi.', '1 + i√3', ['√3 + i', '2 + 2i', '1 + i'], '2(cos 60° + i sin 60°)'),

  q('math.trig.half-angle-formulas', HIGH, M, D, 'Which expression equals cos²(θ/2)?', '(1 + cos θ)/2', ['(1 − cos θ)/2', '(cos θ)/2', '(1 + cos 2θ)/2'], 'the half-angle form of cos² from cos 2α = 2cos²α − 1'),
  q('math.trig.half-angle-formulas', HIGH, M, A, 'Using a half-angle formula with θ = 30°, what is sin 15°?', '(√6 − √2)/4', ['(√6 + √2)/4', '1/4', '√3/4'], '√((1 − cos 30°)/2), positive in Quadrant I'),

  q('math.trig.hyperbolic-functions', HIGH, M, D, 'What is cosh 0?', '1', ['0', 'e', '2'], '(e⁰ + e⁰)/2'),
  q('math.trig.hyperbolic-functions', HIGH, M, A, 'What is d/dx[cosh x]?', 'sinh x', ['−sinh x', 'cosh x', '−cosh x'], 'differentiate (eˣ + e⁻ˣ)/2; no minus sign, unlike cos'),

  q('math.trig.inverse-trig', HIGH, M, D, 'What is arccos(−1/2)?', '2π/3', ['−π/3', '4π/3', 'π/3'], 'arccos returns an angle in [0, π]'),
  q('math.trig.inverse-trig', HIGH, M, A, 'What is arctan(tan(3π/4))?', '−π/4', ['3π/4', 'π/4', '−3π/4'], 'arctan returns an angle in (−π/2, π/2) with the same tangent'),

  q('math.trig.law-of-cosines', HIGH, M, D, 'A triangle has a = 5, b = 8 and C = 60°. What is c?', '7', ['√89', '13', '3'], 'c² = 25 + 64 − 80 cos 60° = 49'),
  q('math.trig.law-of-cosines', HIGH, M, A, 'A triangle has sides 7, 8 and 13. What is the angle opposite the side of length 13?', '120°', ['60°', '90°', '150°'], 'cos C = (49 + 64 − 169)/112 = −1/2'),

  q('math.trig.law-of-sines', HIGH, M, D, 'In a triangle, A = 30°, B = 90° and a = 5. What is b?', '10', ['2.5', '5√3', '5'], 'b = a sin B / sin A = 5 · 1 / ½'),
  q('math.trig.law-of-sines', HIGH, M, A, 'Given A = 30°, a = 6 and b = 10, how many triangles are possible?', '2', ['0', '1', 'Infinitely many'], 'sin B = 5/6; both B ≈ 56.4° and B ≈ 123.6° leave room for C'),

  q('math.trig.polar-form-complex', HIGH, M, D, 'What is the modulus of 5 − 12i?', '13', ['17', '7', '169'], '√(25 + 144)'),
  q('math.trig.polar-form-complex', HIGH, M, A, 'z₁ = 2(cos 30° + i sin 30°) and z₂ = 3(cos 60° + i sin 60°). What is z₁z₂?', '6i', ['5i', '6', '6(cos 30° + i sin 30°)'], 'multiply moduli, add arguments: 6(cos 90° + i sin 90°)'),

  q('math.trig.product-to-sum', HIGH, M, D, 'Which expression equals 2 sin A cos B?', 'sin(A + B) + sin(A − B)', ['sin(A + B) − sin(A − B)', 'cos(A − B) + cos(A + B)', 'sin(2AB)'], 'add the sine sum and difference formulas'),
  q('math.trig.product-to-sum', HIGH, M, A, 'Write cos 3x cos x as a sum.', '½(cos 4x + cos 2x)', ['cos 4x + cos 2x', '½(cos 4x − cos 2x)', 'cos(3x²)'], 'cos A cos B = ½[cos(A + B) + cos(A − B)]'),

  q('math.trig.pythagorean-identities', HIGH, M, D, 'If tan θ = 2, what is sec²θ?', '5', ['3', '4', '1'], '1 + tan²θ = sec²θ'),
  q('math.trig.pythagorean-identities', HIGH, M, A, 'If sin θ = −5/13 and θ is in Quadrant IV, what is cos θ?', '12/13', ['−12/13', '8/13', '−8/13'], 'cos is positive in Quadrant IV'),

  q('math.trig.reciprocal-identities', HIGH, M, D, 'If cos θ = 2/5, what is sec θ?', '5/2', ['2/5', '−5/2', '3/5'], 'sec θ = 1/cos θ'),
  q('math.trig.reciprocal-identities', HIGH, M, A, 'At which angle is csc θ undefined?', '180°', ['90°', '45°', '270°'], 'csc θ = 1/sin θ and sin 180° = 0'),

  q('math.trig.reference-angles', HIGH, M, D, 'What is the reference angle of 225°?', '45°', ['135°', '225°', '65°'], '225° − 180°'),
  q('math.trig.reference-angles', HIGH, M, A, 'What is the reference angle of 5π/3?', 'π/3', ['2π/3', '5π/3', 'π/6'], '2π − 5π/3'),

  q('math.trig.right-triangle-trig', HIGH, X, F, 'A right triangle has legs 6 and 8. Which side is the hypotenuse?', 'The side of length 10, opposite the right angle', ['The leg of length 8, the longest one drawn', 'Whichever side sits at the bottom', 'The leg of length 6'], 'the hypotenuse is fixed by the right angle, not by position'),
  q('math.trig.right-triangle-trig', HIGH, X, D, 'A 10 m ladder makes a 60° angle with the ground. How high up the wall does it reach?', '5√3 m', ['5 m', '10√3 m', '20 m'], 'height is opposite the 60° angle, so use sine, not cosine'),

  q('math.trig.special-angles', HIGH, M, P, 'What is tan 60°?', '√3', ['1/√3', '1', '√3/2'], '(√3/2)/(1/2)'),
  q('math.trig.special-angles', HIGH, M, A, 'What is sin 240°?', '−√3/2', ['√3/2', '−1/2', '1/2'], 'reference angle 60°, sine negative in Quadrant III'),

  q('math.trig.sum-difference-formulas', HIGH, M, D, 'Which expression equals cos(A − B)?', 'cos A cos B + sin A sin B', ['cos A cos B − sin A sin B', 'cos A − cos B', 'sin A cos B − cos A sin B'], 'the difference formula flips the sign to +'),
  q('math.trig.sum-difference-formulas', HIGH, M, A, 'Using sin(45° + 30°), what is sin 75°?', '(√6 + √2)/4', ['(√6 − √2)/4', '√2/2 + 1/2', '3/4'], 'sin 45° cos 30° + cos 45° sin 30°'),

  q('math.trig.trig-equations', HIGH, M, D, 'How many solutions does tan θ = 1 have in [0°, 360°)?', '2', ['1', '4', '3'], '45° and 225°, since tan repeats every 180°'),

  q('math.trig.trig-functions', HIGH, X, F, 'Is sin 200° positive or negative?', 'Negative, since 200° lies in Quadrant III', ['Positive, since sine is always positive', 'Undefined, since 200° is more than 90°', 'Zero'], 'sine is defined for every angle, and its sign follows the quadrant'),
  q('math.trig.trig-functions', HIGH, X, P, 'What is sin(−30°)?', '−1/2', ['1/2', 'Undefined, since angles cannot be negative', '√3/2'], 'sine is odd: sin(−θ) = −sin θ'),

  q('math.trig.trig-graphs', HIGH, M, D, 'What is the period of y = tan x?', 'π', ['2π', 'π/2', '1'], 'tan repeats every 180°'),
  q('math.trig.trig-graphs', HIGH, M, A, 'What is the maximum value of y = 2 + 3 cos x?', '5', ['3', '2', '6'], 'cos x peaks at 1'),

  q('math.trig.trig-identities', HIGH, M, D, 'Simplify (1 − cos²θ)/sin θ.', 'sin θ', ['cos θ', '1', 'sin²θ'], '1 − cos²θ = sin²θ'),
  q('math.trig.trig-identities', HIGH, M, A, 'Simplify (sin θ + cos θ)².', '1 + sin 2θ', ['1', 'sin²θ + cos²θ', '1 + 2 sin θ'], 'expand: sin² + cos² + 2 sin θ cos θ'),

  q('math.trig.unit-circle', HIGH, X, F, 'On the unit circle, what are the coordinates of the point at 180°?', '(−1, 0)', ['(0, −1)', '(1, 0)', '(0, 1)'], 'halfway round, on the negative x-axis'),
  q('math.trig.unit-circle', HIGH, X, P, 'At θ = 60° on the unit circle, which pair is (cos θ, sin θ)?', '(1/2, √3/2)', ['(√3/2, 1/2)', '(1/2, 1/2)', '(√3, 1)'], 'x is cos, y is sin; a steep angle has the larger y'),
]

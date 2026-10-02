/**
 * MATHEMATICS — probe DEPTH, batch 16: math.cx (31 (concept, band) pairs, 62 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every value was worked by hand, e.g. (1 + 2i)/(1 − i) = (−1 + 3i)/2,
 * Res(1/(z² + 1)², i) = 1/(4i) so ∫ dx/(x² + 1)² = π/2, ∮ eᶻ/z³ = 2πi · ½,
 * Res(cos z/z³, 0) = −½, v = 2xy + y for u = x² − y² + x, v = y² − x² for
 * u = 2xy, and Rouché: |3z + 1| ≤ 7 < 32 on |z| = 2, |z⁵ + 1| ≤ 2 < 5 on |z| = 1.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH, UNDERGRADUATE: UG } = GradeBand
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, gradeBand: GradeBand, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_COMPLEX_ANALYSIS_PROBES: SeedProbe[] = [
  q('math.cx.analytic-continuation', UG, D, 'Σ zⁿ = 1/(1 − z) for |z| < 1. What is its analytic continuation to ℂ \\ {1}?', '1/(1 − z)', ['None exists beyond |z| < 1', 'The series Σ zⁿ itself', '1/(1 + z)'], 'the closed form is holomorphic away from z = 1'),
  q('math.cx.analytic-continuation', UG, A, 'Γ is continued from Re z > 0 by Γ(z) = Γ(z + 1)/z. Where does the continuation fail?', 'At z = 0, −1, −2, …', ['Only at z = 0', 'Nowhere', 'On the whole half-plane Re z < 0'], 'each step divides by a factor that vanishes at a non-positive integer'),

  q('math.cx.analytic-functions', UG, D, 'Which function is entire?', 'eᶻ', ['1/z', 'z̄', '|z|²'], 'complex-differentiable on all of ℂ'),
  q('math.cx.analytic-functions', UG, A, 'Where is f(z) = 1/(z² + 1) holomorphic?', 'Everywhere except z = ±i', ['Everywhere', 'Everywhere except z = ±1', 'Everywhere except z = 0'], 'z² + 1 = 0 at ±i'),

  q('math.cx.argument-principle', UG, D, 'f has 3 zeros and 1 pole inside C, counted with multiplicity, and none on C. What is (1/2πi)∮_C f′/f dz?', '2', ['4', '3', '−2'], 'zeros minus poles'),
  q('math.cx.argument-principle', UG, A, 'As z goes once round |z| = 1, how many times does f(z) = z³ wind around 0?', '3', ['1', '0', '6'], 'the argument grows by 3 · 2π'),

  q('math.cx.cauchy-goursat', UG, D, 'Which assumption of the classical Cauchy theorem does Goursat\'s version drop?', 'That f′ is continuous', ['That f is holomorphic', 'That the contour is closed', 'That the domain is open'], 'holomorphy alone is enough'),
  q('math.cx.cauchy-goursat', UG, A, 'f is holomorphic on an open set containing a triangle T and its interior. What is ∮ f dz around ∂T?', '0', ['2πi', 'The area of T', 'It depends on f'], 'Goursat\'s lemma'),

  q('math.cx.cauchy-integral-formula', UG, D, 'What is ∮ eᶻ/(z − 1) dz around |z| = 2?', '2πie', ['0', '2πi', 'e'], '2πi · f(1) with f = eᶻ'),
  q('math.cx.cauchy-integral-formula', UG, A, 'What is ∮ cos z / z dz around |z| = 1?', '2πi', ['0', '2π', 'πi'], '2πi · cos 0'),

  q('math.cx.cauchy-riemann', UG, D, 'Which pair (u, v) satisfies the Cauchy–Riemann equations?', 'u = x² − y², v = 2xy', ['u = x² + y², v = 2xy', 'u = x, v = −y', 'u = x² − y², v = −2xy'], 'u_x = v_y and u_y = −v_x'),
  q('math.cx.cauchy-riemann', UG, A, 'u = x² − y² + x. Which v makes u + iv holomorphic?', 'v = 2xy + y', ['v = 2xy', 'v = −2xy − y', 'v = x² + y'], 'v_y = u_x = 2x + 1 and v_x = −u_y = 2y'),

  q('math.cx.cauchy-theorem', UG, D, 'What is ∮ z² dz around |z| = 1?', '0', ['2πi', 'π', '1'], 'z² is entire'),
  q('math.cx.cauchy-theorem', UG, A, 'What is ∮ 1/(z − 5) dz around |z| = 3?', '0', ['2πi', '−2πi', '1/2'], 'the only singularity, z = 5, lies outside'),

  q('math.cx.complex-function', HIGH, D, 'For f(z) = z² with z = x + iy, what are u and v?', 'u = x² − y², v = 2xy', ['u = x², v = y²', 'u = x² + y², v = 2xy', 'u = x² − y², v = xy'], '(x + iy)² = x² − y² + 2ixy'),
  q('math.cx.complex-function', HIGH, A, 'What is f(1 + i) for f(z) = z² + 1?', '1 + 2i', ['3', '2 + 2i', '1'], '(1 + i)² = 2i'),

  q('math.cx.complex-integration', UG, D, 'What is ∫ z dz along the straight line from 0 to 1 + i?', 'i', ['1 + i', '0', '2i'], 'z²/2 from 0 to 1 + i: (2i)/2'),
  q('math.cx.complex-integration', UG, A, '|f| ≤ 3 on a path of length 2π. By the ML bound, |∫ f dz| is at most what?', '6π', ['3', '2π', '9π'], 'M · L'),

  q('math.cx.complex-numbers-analysis', HIGH, D, 'What is (2 + 3i)(1 − i)?', '5 + i', ['2 − 3i', '−1 + i', '5 − i'], '2 − 2i + 3i − 3i²'),
  q('math.cx.complex-numbers-analysis', HIGH, A, 'What is (1 + 2i)/(1 − i)?', '(−1 + 3i)/2', ['(3 + i)/2', '1 + 2i', '(−1 − 3i)/2'], 'multiply top and bottom by 1 + i'),

  q('math.cx.conformal-mapping', UG, D, 'Where does f(z) = z² fail to be conformal?', 'At z = 0', ['Nowhere', 'Everywhere', 'On the circle |z| = 1'], 'f′(0) = 0'),
  q('math.cx.conformal-mapping', UG, A, 'By what factor does f(z) = eᶻ scale small lengths near z = 1?', 'e', ['1', 'e²', '0'], '|f′(1)| = e'),

  q('math.cx.essential-singularity', UG, D, 'Which function has an essential singularity at z = 0?', 'sin(1/z)', ['1/z²', 'sin z / z', '(eᶻ − 1)/z'], 'infinitely many negative powers'),
  q('math.cx.essential-singularity', UG, A, 'How many negative powers of z appear in the Laurent series of e^(1/z) about 0?', 'Infinitely many', ['One', 'None', 'Two'], 'Σ z⁻ⁿ/n!'),

  q('math.cx.fundamental-theorem-algebra', UG, D, 'How many complex roots, counted with multiplicity, does z⁷ − 3z + 1 have?', '7', ['1', '3', 'It depends on the coefficients'], 'one per degree'),
  q('math.cx.fundamental-theorem-algebra', UG, A, 'A polynomial of degree 5 with real coefficients must have at least how many real roots?', '1', ['0', '5', '2'], 'non-real roots come in conjugate pairs'),

  q('math.cx.harmonic-functions', UG, D, 'Which function is the real part of a holomorphic function?', 'eˣ cos y', ['eˣ cos x', 'x² + y²', 'x³'], 'Re(eᶻ); it is harmonic'),
  q('math.cx.harmonic-functions', UG, A, 'u = 2xy is harmonic. Which v is a harmonic conjugate of u?', 'v = y² − x²', ['v = x² − y²', 'v = 2xy', 'v = x² + y²'], 'v_y = u_x = 2y and v_x = −u_y = −2x'),

  q('math.cx.higher-derivatives', UG, D, 'By Cauchy\'s formula, f⁽ⁿ⁾(z₀) equals what?', '(n!/2πi) ∮ f(z)/(z − z₀)ⁿ⁺¹ dz', ['(1/2πi) ∮ f(z)/(z − z₀)ⁿ dz', 'n! ∮ f(z)/(z − z₀) dz', '(n!/2πi) ∮ f(z)(z − z₀)ⁿ dz'], 'differentiate under the integral n times'),
  q('math.cx.higher-derivatives', UG, A, 'What is ∮ eᶻ/z³ dz around |z| = 1?', 'πi', ['2πi', '0', '2πi/3'], '(2πi/2!) · f″(0) with f = eᶻ'),

  q('math.cx.identity-theorem', UG, D, 'f is entire and f(1/n) = 0 for every n ≥ 1. What is f?', 'Identically 0', ['sin(π/z)', 'It could be any entire function', 'z'], 'the zeros accumulate at 0, inside the domain'),
  q('math.cx.identity-theorem', UG, A, 'Two entire functions agree on the real interval [0, 1]. What follows?', 'They agree on all of ℂ', ['They agree only on [0, 1]', 'They agree only on ℝ', 'They agree only near [0, 1]'], 'agreement on a set with a limit point'),

  q('math.cx.laurent-series', UG, D, 'What is the coefficient of z⁻¹ in the Laurent series of eᶻ/z² about 0?', '1', ['1/2', '0', '2'], '1/z² + 1/z + 1/2 + ⋯'),
  q('math.cx.laurent-series', UG, A, 'On 0 < |z| < 1, what is the Laurent series of 1/(z(1 − z))?', '1/z + 1 + z + z² + ⋯', ['1 + z + z² + ⋯', '1/z − 1 − z − ⋯', 'z + z² + z³ + ⋯'], '(1/z) · Σ zⁿ'),

  q('math.cx.liouville-theorem', UG, D, 'f is entire and |f(z)| ≤ 10 for every z. What is f?', 'A constant', ['A polynomial of degree at most 10', 'Identically 0', 'Any entire function'], 'bounded and entire'),
  q('math.cx.liouville-theorem', UG, A, 'f is entire and Re f(z) ≤ 3 everywhere. What follows?', 'f is constant', ['f is a polynomial', 'Nothing in particular', 'Only Im f is bounded'], 'e^f is entire with |e^f| ≤ e³'),

  q('math.cx.maximum-modulus', UG, D, 'f is holomorphic and non-constant on a neighbourhood of the closed unit disc. Where does |f| reach its maximum on the disc?', 'On the boundary |z| = 1', ['At the centre', 'At some interior point', 'At a zero of f'], 'the maximum modulus principle'),
  q('math.cx.maximum-modulus', UG, A, 'What is the maximum of |z² + 1| on |z| ≤ 1?', '2', ['1', '√2', '0'], 'on the boundary, at z = ±1'),

  q('math.cx.mobius-transformation', UG, D, 'What is the image of 0 under f(z) = (z − 1)/(z + 1)?', '−1', ['1', '0', '∞'], '(0 − 1)/(0 + 1)'),
  q('math.cx.mobius-transformation', UG, A, 'Which Möbius map sends 0 ↦ 0, 1 ↦ 1 and ∞ ↦ ∞?', 'z ↦ z', ['z ↦ 1/z', 'z ↦ −z', 'z ↦ z²'], 'three points fix a Möbius map'),

  q('math.cx.morera-theorem', UG, D, 'f is continuous on D and ∮ f dz = 0 around every closed triangle in D. What does Morera\'s theorem conclude?', 'f is holomorphic on D', ['f is constant', 'f is identically 0', 'f is real-valued'], 'the converse of Cauchy–Goursat'),
  q('math.cx.morera-theorem', UG, A, 'Entire functions fₙ converge uniformly on compact sets to f. What is f?', 'Entire', ['Only continuous', 'A polynomial', 'Possibly not differentiable'], 'integrals pass to the limit, then Morera'),

  q('math.cx.poles', UG, D, 'What is the order of the pole of 1/(z²(z − 3)) at z = 0?', '2', ['1', '3', '0'], 'the factor z²'),
  q('math.cx.poles', UG, A, 'What is the order of the pole of sin z / z⁴ at z = 0?', '3', ['4', '5', '1'], 'sin z = z − ⋯ cancels one power'),

  q('math.cx.power-series-cx', UG, D, 'What is the radius of convergence of Σ zⁿ/2ⁿ?', '2', ['1/2', '1', '∞'], 'a geometric series in z/2'),
  q('math.cx.power-series-cx', UG, A, 'What is the radius of convergence of the Taylor series of 1/(1 + z²) about 0?', '1', ['∞', '2', '0'], 'the nearest singularities are ±i'),

  q('math.cx.real-integral-residues', UG, D, 'Using residues, what is ∫ dx/(x² + 4) over the whole real line?', 'π/2', ['π', 'π/4', '2π'], '2πi · Res at 2i = 2πi/(4i)'),
  q('math.cx.real-integral-residues', UG, A, 'Using residues, what is ∫ dx/(x² + 1)² over the whole real line?', 'π/2', ['π', 'π/4', '2π'], 'Res at i is 1/(4i)'),

  q('math.cx.residue-theorem', UG, D, 'What is ∮ dz/(z(z − 1)) around |z| = 2?', '0', ['2πi', '−2πi', '4πi'], 'residues −1 and 1 cancel'),
  q('math.cx.residue-theorem', UG, A, 'What is ∮ dz/(z(z − 1)) around |z| = 1/2?', '−2πi', ['0', '2πi', '−πi'], 'only z = 0 is inside, residue −1'),

  q('math.cx.residue', UG, D, 'What is the residue of z/(z² + 1) at z = i?', '1/2', ['i', '1/(2i)', '2'], 'i/(2i)'),
  q('math.cx.residue', UG, A, 'What is the residue of cos z / z³ at z = 0?', '−1/2', ['1/2', '0', '1'], 'cos z = 1 − z²/2 + ⋯'),

  q('math.cx.riemann-mapping', UG, D, 'Which domain is NOT conformally equivalent to the unit disc?', 'All of ℂ', ['The upper half-plane', 'The interior of a square', 'The strip 0 < Im z < 1'], 'the theorem needs a proper simply connected subset'),
  q('math.cx.riemann-mapping', UG, A, 'Which map sends the upper half-plane onto the unit disc?', 'z ↦ (z − i)/(z + i)', ['z ↦ z²', 'z ↦ eᶻ', 'z ↦ 1/z'], 'the Cayley transform'),

  q('math.cx.riemann-surface', UG, D, 'How many sheets does the Riemann surface of √z have?', '2', ['1', 'Infinitely many', '4'], 'one loop flips the sign, two loops restore it'),
  q('math.cx.riemann-surface', UG, A, 'Going once counterclockwise around 0, z^(1/3) is multiplied by what?', 'e^(2πi/3)', ['−1', '1', 'e^(πi/3)'], 'the argument grows by 2π, divided by 3'),

  q('math.cx.riemann-zeta', UG, D, 'What is ζ(2)?', 'π²/6', ['π/2', '∞', '1'], 'the Basel problem'),
  q('math.cx.riemann-zeta', UG, A, 'Where are the trivial zeros of ζ(s)?', 'At s = −2, −4, −6, …', ['On the line Re s = 1/2', 'At s = 0', 'At s = 1'], 'the functional equation\'s sine factor'),

  q('math.cx.rouche-theorem', UG, D, 'Comparing with z⁵, how many zeros does z⁵ + 3z + 1 have in |z| < 2?', '5', ['1', '0', '3'], '|3z + 1| ≤ 7 < 32 = |z⁵| on |z| = 2'),
  q('math.cx.rouche-theorem', UG, A, 'Comparing with 5z, how many zeros does z⁵ + 5z + 1 have in |z| < 1?', '1', ['5', '0', '2'], '|z⁵ + 1| ≤ 2 < 5 = |5z| on |z| = 1'),

  q('math.cx.singularities', UG, D, 'What kind of singularity does (1 − cos z)/z² have at 0?', 'Removable', ['A pole of order 2', 'Essential', 'A branch point'], 'it tends to 1/2'),
  q('math.cx.singularities', UG, A, 'What kind of singularity does e^(1/z²) have at 0?', 'Essential', ['A pole of order 2', 'Removable', 'A branch point'], 'Σ z⁻²ⁿ/n! has infinitely many negative powers'),
]

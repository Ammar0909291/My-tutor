/**
 * MATHEMATICS — probe DEPTH, batch 19: math.fnal (18 (concept, band) pairs, 36 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every answer is a standard fact checked against its definition, e.g. the
 * operator norm of (x, y) ↦ (2x, 3y) is 3, ‖Dxⁿ‖ = n with ‖xⁿ‖ = 1 on [0, 1],
 * Γ(5) = 4! = 24 and Γ(½) = √π, ⟨δ′, φ⟩ = −φ′(0), and the right shift on ℓ²
 * has the closed unit disc as its spectrum.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand: UG, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_FUNCTIONAL_ANALYSIS_PROBES: SeedProbe[] = [
  q('math.fnal.banach-space', D, 'Which space is a Banach space?', 'C([0, 1]) with the sup norm', ['C([0, 1]) with the L¹ norm', 'The polynomials on [0, 1] with the sup norm', 'ℚ with |x − y|'], 'uniform limits of continuous functions are continuous'),
  q('math.fnal.banach-space', A, 'For which p is ℓᵖ complete?', 'Every p with 1 ≤ p ≤ ∞', ['Only p = 2', 'Only finite p', 'Only p ≥ 2'], 'the Riesz–Fischer argument works for each p'),

  q('math.fnal.bounded-operator', D, 'With the Euclidean norm, what is the operator norm of T(x, y) = (2x, 3y)?', '3', ['2', '5', '√13'], 'the largest stretch, along the y-axis'),
  q('math.fnal.bounded-operator', A, 'On polynomials over [0, 1] with the sup norm, is differentiation f ↦ f′ bounded?', 'No, ‖xⁿ‖ = 1 but ‖(xⁿ)′‖ = n', ['Yes, every linear map is bounded', 'Yes, since [0, 1] is compact', 'Only on polynomials of degree 1'], 'no constant bounds n'),

  q('math.fnal.closed-graph-theorem', D, 'T: X → Y is linear between Banach spaces and has a closed graph. What follows?', 'T is bounded', ['T is compact', 'T is invertible', 'Nothing in particular'], 'the closed graph theorem'),
  q('math.fnal.closed-graph-theorem', A, 'Differentiation from C¹[0, 1] into C[0, 1], both with the sup norm, has a closed graph but is unbounded. Which hypothesis fails?', 'Its domain is not complete under the sup norm', ['It is not linear', 'Its graph is not closed', 'C[0, 1] is not complete'], 'C¹ is not closed in C[0, 1]'),

  q('math.fnal.compact-operator-spectrum', D, 'Which operator on ℓ² is compact?', 'diag(1, 1/2, 1/3, …)', ['The identity', 'The right shift', 'diag(1, 1, 1, …)'], 'its diagonal entries tend to 0'),
  q('math.fnal.compact-operator-spectrum', A, 'What is the only possible accumulation point of the eigenvalues of a compact operator?', '0', ['1', '∞', 'Any complex number'], 'the Riesz–Schauder theory'),

  q('math.fnal.completeness', D, 'Which normed space is NOT complete?', 'The polynomials on [0, 1] with the sup norm', ['ℝⁿ with any norm', 'ℓ²', 'C([0, 1]) with the sup norm'], 'Taylor polynomials of eˣ converge to a non-polynomial'),
  q('math.fnal.completeness', A, 'What must every finite-dimensional normed space be?', 'Complete', ['Incomplete', 'A Hilbert space', 'One-dimensional'], 'all norms are equivalent there'),

  q('math.fnal.convolution', D, 'What is f ∗ δ, convolution with the Dirac delta?', 'f', ['0', 'δ', 'The constant f(0)'], 'δ is the identity for convolution'),
  q('math.fnal.convolution', A, 'f and g lie in L¹(ℝ). Where does f ∗ g lie, and with what bound?', 'In L¹, with ‖f ∗ g‖₁ ≤ ‖f‖₁‖g‖₁', ['In L², with ‖f ∗ g‖₂ = ‖f‖₁‖g‖₁', 'In L¹, with ‖f ∗ g‖₁ = ‖f‖₁ + ‖g‖₁', 'Only in L^∞'], 'Young\'s inequality with p = q = r = 1'),

  q('math.fnal.dense-subspace', D, 'Which subspace is dense in ℓ²?', 'The sequences with finitely many nonzero terms', ['The constant sequences', 'The multiples of (1, 0, 0, …)', 'The sequences whose terms are all 0 or 1'], 'truncate the tail'),
  q('math.fnal.dense-subspace', A, 'A bounded linear operator is 0 on a dense subspace. What is it on the whole space?', '0', ['It cannot be determined', 'The identity', 'Bounded but possibly nonzero'], 'continuity extends equalities from a dense set'),

  q('math.fnal.distributions', D, 'What is the distributional derivative of the Heaviside step H?', 'The Dirac delta δ', ['0', 'H itself', 'It is undefined'], '⟨H′, φ⟩ = −∫₀^∞ φ′ = φ(0)'),
  q('math.fnal.distributions', A, 'For a test function φ, what is ⟨δ′, φ⟩?', '−φ′(0)', ['φ′(0)', 'φ(0)', '0'], 'move the derivative onto φ with a minus sign'),

  q('math.fnal.dual-space-functional', D, 'What is the dual of ℓ¹?', 'ℓ^∞', ['ℓ¹', 'ℓ²', 'c₀'], 'bounded sequences act by pairing'),
  q('math.fnal.dual-space-functional', A, 'For 1 < p < ∞, what is the dual of ℓᵖ?', 'ℓ^q with 1/p + 1/q = 1', ['ℓᵖ itself', 'ℓ^∞', 'ℓ¹'], 'Hölder\'s inequality'),

  q('math.fnal.fourier-transform', D, 'What does Plancherel\'s theorem say about the Fourier transform on L²(ℝ)?', 'With the right normalization it preserves the L² norm', ['It is bounded only on L¹', 'It doubles the norm', 'It is a compact operator'], 'a unitary operator'),
  q('math.fnal.fourier-transform', A, 'What does the Fourier transform turn convolution into?', 'Pointwise multiplication', ['Addition', 'Convolution again', 'Differentiation'], 'the convolution theorem'),

  q('math.fnal.hahn-banach', D, 'f is a bounded linear functional on a subspace M of a normed space X. What does Hahn–Banach give?', 'An extension to all of X with the same norm', ['A unique extension', 'An extension with twice the norm', 'An extension only when X is a Hilbert space'], 'norm-preserving extension'),
  q('math.fnal.hahn-banach', A, 'For x ≠ 0 in a normed space X, what does Hahn–Banach guarantee?', 'A functional f with ‖f‖ = 1 and f(x) = ‖x‖', ['A functional with f(x) = 0', 'A functional with ‖f‖ = ‖x‖ and f(x) = 1', 'Nothing in general'], 'the dual separates points'),

  q('math.fnal.hilbert-space', D, 'Which space is a Hilbert space?', 'L²([0, 1])', ['L¹([0, 1])', 'C([0, 1]) with the sup norm', 'ℓ^∞'], 'its norm comes from ∫ f ḡ'),
  q('math.fnal.hilbert-space', A, 'Which identity holds exactly when a norm comes from an inner product?', 'The parallelogram law ‖x + y‖² + ‖x − y‖² = 2‖x‖² + 2‖y‖²', ['The triangle inequality', '‖x + y‖ = ‖x‖ + ‖y‖', 'Hölder\'s inequality'], 'Jordan–von Neumann'),

  q('math.fnal.normed-space', D, 'What is the sup norm of (3, −7, 2)?', '7', ['12', '√62', '3'], 'the largest absolute entry'),
  q('math.fnal.normed-space', A, 'Which formula is a norm on ℝ²?', 'max(|x|, |y|)', ['|x|', 'x + y', '(|x| + |y|)²'], '|x| is 0 at (0, 1), which is not the zero vector'),

  q('math.fnal.open-mapping-theorem', D, 'T is a bounded linear bijection between Banach spaces. What is T⁻¹?', 'Bounded', ['Unbounded', 'Nonlinear', 'It may not exist'], 'the bounded inverse theorem'),
  q('math.fnal.open-mapping-theorem', A, 'What does the open mapping theorem say about a surjective bounded linear map between Banach spaces?', 'It maps open sets to open sets', ['It is injective', 'It is compact', 'It maps closed sets to closed sets'], 'the open mapping theorem'),

  q('math.fnal.riesz-representation', D, 'On ℝ³ with the dot product, f(x) = 2x₁ − x₃. Which y gives f(x) = x · y?', '(2, 0, −1)', ['(2, −1)', '(2, 0, 1)', '(1, 0, −1)'], 'read off the coefficients'),
  q('math.fnal.riesz-representation', A, 'On a Hilbert space, f(x) = ⟨x, y⟩. What is ‖f‖?', '‖y‖', ['‖y‖²', '1', '2‖y‖'], 'Cauchy–Schwarz, with equality at x = y'),

  q('math.fnal.special-functions', D, 'What is Γ(5)?', '24', ['120', '5', '4'], 'Γ(n) = (n − 1)!'),
  q('math.fnal.special-functions', A, 'What is Γ(1/2)?', '√π', ['1/2', 'π', '1'], 'the Gaussian integral'),

  q('math.fnal.spectral-theory', D, 'Where does the spectrum of a bounded self-adjoint operator lie?', 'In ℝ', ['On the unit circle', 'Anywhere in ℂ', 'At 0 only'], '⟨Tx, x⟩ is real'),
  q('math.fnal.spectral-theory', A, 'What is the spectrum of the right shift on ℓ²?', 'The closed unit disc', ['{0}', 'The unit circle', '{1}'], 'it has no eigenvalues, yet T − λ fails to be onto for |λ| ≤ 1'),

  q('math.fnal.uniform-boundedness', D, 'Bounded operators Tₙ on a Banach space satisfy supₙ ‖Tₙx‖ < ∞ for every x. What follows?', 'supₙ ‖Tₙ‖ < ∞', ['Tₙ → 0', 'Every Tₙ is compact', 'Nothing in general'], 'the uniform boundedness principle'),
  q('math.fnal.uniform-boundedness', A, 'Bounded linear Tₙ on a Banach space converge pointwise to T. What is T?', 'A bounded linear operator', ['Possibly unbounded', 'Compact', 'Zero'], 'Banach–Steinhaus'),
]

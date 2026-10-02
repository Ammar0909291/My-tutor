/**
 * MATHEMATICS — probe DEPTH, batch 18: math.top (23 (concept, band) pairs, 46 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every invariant below is standard and was checked, e.g. χ = 2 − 2g = −4 for
 * genus 3, π₁(T²) = ℤ × ℤ, H₁ of a wedge of two circles is ℤ² while its π₁
 * is the free group on two generators, a 2-point set has 4 topologies, and
 * V − E + F = 4 − 6 + 4 = 2 for the boundary of a tetrahedron.
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

export const MATHEMATICS_DEPTH_TOPOLOGY_PROBES: SeedProbe[] = [
  q('math.top.basis', D, 'Which collection is a basis for the standard topology on ℝ?', 'All open intervals (a, b)', ['All closed intervals [a, b]', 'All half-lines (a, ∞)', 'All single points'], 'every open set is a union of open intervals'),
  q('math.top.basis', A, 'Which topology on ℝ do the half-open intervals [a, b) generate?', 'The lower-limit topology, strictly finer than the standard one', ['The standard topology', 'The discrete topology', 'The indiscrete topology'], '[a, b) is not open in the standard topology'),

  q('math.top.cohomology', D, 'What is H¹(S²; ℤ)?', '0', ['ℤ', 'ℤ²', 'ℤ/2ℤ'], 'the sphere has no 1-dimensional holes'),
  q('math.top.cohomology', A, 'What is H¹(S¹; ℤ)?', 'ℤ', ['0', 'ℤ²', 'ℤ/2ℤ'], 'one loop, dual to H₁ = ℤ'),

  q('math.top.compactness', D, 'Which space is compact?', 'The circle S¹', ['ℝ', '(0, 1)', 'ℤ with the discrete topology'], 'closed and bounded in ℝ²'),
  q('math.top.compactness', A, 'Which subsets of a compact Hausdorff space must be compact?', 'Every closed subset', ['Every subset', 'Every open subset', 'Every dense subset'], 'closed subsets of compact spaces are compact'),

  q('math.top.connectedness', D, 'Which subspace of ℝ² is connected?', 'The unit circle', ['Two disjoint discs', 'ℤ²', 'The hyperbola xy = 1'], 'the hyperbola has two separate branches'),
  q('math.top.connectedness', A, 'The topologist\'s sine curve is connected but not path-connected. What does that show?', 'Connected does not imply path-connected', ['Path-connected does not imply connected', 'The curve is not connected', 'Connected and path-connected are the same'], 'path-connected always implies connected, not the reverse'),

  q('math.top.continuity-top', D, 'Which condition defines continuity of f: X → Y?', 'The preimage of every open set is open', ['The image of every open set is open', 'The preimage of every set is open', 'f is a bijection'], 'preimages, not images'),
  q('math.top.continuity-top', A, 'With which topology on X is every function from X to any space continuous?', 'The discrete topology', ['The indiscrete topology', 'The standard topology', 'The cofinite topology'], 'every preimage is open'),

  q('math.top.covering-space', D, 'What is the universal cover of the circle?', 'ℝ, via t ↦ (cos 2πt, sin 2πt)', ['The closed disc', 'The circle itself', 'ℝ²'], 'ℝ is simply connected'),
  q('math.top.covering-space', A, 'z ↦ z³ on the unit circle is a covering map. How many sheets does it have?', '3', ['1', 'Infinitely many', '6'], 'each point has three cube roots'),

  q('math.top.euler-characteristic', D, 'What is the Euler characteristic of a sphere?', '2', ['0', '1', '−2'], 'V − E + F for any polyhedral sphere'),
  q('math.top.euler-characteristic', A, 'What is the Euler characteristic of the closed orientable surface of genus 3?', '−4', ['−6', '0', '4'], '2 − 2g'),

  q('math.top.fundamental-group', D, 'What is the fundamental group of the circle?', 'ℤ', ['0', 'ℤ/2ℤ', 'ℤ²'], 'loops counted by winding number'),
  q('math.top.fundamental-group', A, 'What is the fundamental group of the torus S¹ × S¹?', 'ℤ × ℤ', ['ℤ', 'The free group on two generators', '0'], 'π₁ of a product is the product'),

  q('math.top.homeomorphism', D, 'Which pair of spaces are homeomorphic?', '(0, 1) and ℝ', ['[0, 1] and ℝ', 'The circle and [0, 1]', 'ℝ and ℝ²'], 'x ↦ tan(π(x − ½))'),
  q('math.top.homeomorphism', A, 'Why is [0, 1) not homeomorphic to (0, 1)?', 'Removing 0 leaves [0, 1) connected, but removing any point disconnects (0, 1)', ['They have different lengths', 'One is bounded and the other is not', 'They have different cardinalities'], 'cut points are preserved by homeomorphisms'),

  q('math.top.homology', D, 'What is H₀ of a space with 4 path components?', 'ℤ⁴', ['ℤ', '0', 'ℤ⁸'], 'one ℤ per path component'),
  q('math.top.homology', A, 'What is H₁ of the wedge of two circles?', 'ℤ²', ['ℤ', '0', 'The free group on two generators'], 'H₁ is the abelianised π₁'),

  q('math.top.homotopy-equivalence', D, 'Which space is homotopy equivalent to a point?', 'ℝ³', ['The circle', 'The torus', 'Two points'], 'ℝ³ is contractible'),
  q('math.top.homotopy-equivalence', A, 'ℝ² \\ {0} is homotopy equivalent to which space?', 'The circle', ['A point', 'ℝ²', 'Two points'], 'deformation retract onto the unit circle'),

  q('math.top.homotopy', D, 'f, g: X → ℝ² are continuous. Which map is a homotopy from f to g?', 'H(x, t) = (1 − t)f(x) + t g(x)', ['H(x, t) = t f(x)g(x)', 'H(x, t) = f(x) + g(x)', 'H(x, t) = t f(x)'], 'the straight-line homotopy: H(·, 0) = f, H(·, 1) = g'),
  q('math.top.homotopy', A, 'Are any two continuous maps from the circle to ℝ² homotopic?', 'Yes, because ℝ² is convex', ['No, only equal maps are', 'Only constant maps are', 'Only if both maps are injective'], 'the straight-line homotopy stays in ℝ²'),

  q('math.top.interior-closure', D, 'What is the interior of [0, 1] in ℝ?', '(0, 1)', ['[0, 1]', 'The empty set', '{0, 1}'], 'no neighbourhood of 0 or 1 fits inside'),
  q('math.top.interior-closure', A, 'What is the closure of ℚ in ℝ?', 'ℝ', ['ℚ', 'The empty set', 'The irrationals'], 'ℚ is dense'),

  q('math.top.manifold', D, 'What is the dimension of the sphere S² as a manifold?', '2', ['3', '1', '0'], 'it looks locally like ℝ², even though it sits in ℝ³'),
  q('math.top.manifold', A, 'Which space is NOT a manifold?', 'Two lines crossing at a point, like the letter X', ['The circle', 'An open disc', 'The torus'], 'the crossing point has no neighbourhood like ℝ'),

  q('math.top.open-sets', D, 'Which subset of ℝ is both open and closed?', 'ℝ itself', ['[0, 1]', '(0, 1)', 'ℚ'], 'ℝ is connected, so only ∅ and ℝ'),
  q('math.top.open-sets', A, 'What is the boundary of ℚ in ℝ?', 'ℝ', ['The empty set', 'ℚ', 'The irrationals'], 'closure ℝ, interior empty'),

  q('math.top.product-space', D, 'What is S¹ × S¹ homeomorphic to?', 'The torus', ['The sphere', 'The disc', 'The circle'], 'a circle of circles'),
  q('math.top.product-space', A, 'In the product topology on ℝ × ℝ, what is a basic open set?', 'U × V with U and V open in ℝ', ['U × V with U and V closed', 'Any union of closed rectangles', 'Only open discs centred at the origin'], 'products of open sets form the basis'),

  q('math.top.quotient-space', D, 'What is [0, 1] with 0 and 1 identified homeomorphic to?', 'The circle', ['The interval', 'A point', 'The figure-eight'], 'glue the two ends'),
  q('math.top.quotient-space', A, 'A square has both pairs of opposite sides glued without a twist. What space results?', 'The torus', ['The sphere', 'The Klein bottle', 'The Möbius band'], 'a twist on one pair would give the Klein bottle'),

  q('math.top.separation-axioms', D, 'What does a Hausdorff (T₂) space guarantee?', 'Any two distinct points have disjoint open neighbourhoods', ['Every point is an open set', 'Any two disjoint closed sets can be separated', 'The space is metrizable'], 'separating points'),
  q('math.top.separation-axioms', A, 'Which space is NOT Hausdorff?', 'ℝ with the cofinite topology', ['ℝ with the standard topology', 'Any metric space', 'Any discrete space'], 'any two nonempty open sets meet'),

  q('math.top.simplicial-complex', D, 'How many edges does a 2-simplex (a filled triangle) have?', '3', ['2', '1', '6'], 'one per pair of its 3 vertices'),
  q('math.top.simplicial-complex', A, 'What is V − E + F for the boundary of a tetrahedron?', '2', ['0', '4', '1'], '4 − 6 + 4'),

  q('math.top.smooth-manifold', D, 'What is the dimension of the tangent space at a point of a smooth n-manifold?', 'n', ['n + 1', '2n', '1'], 'tangent vectors have n independent directions'),
  q('math.top.smooth-manifold', A, 'Two charts of a smooth atlas overlap. What must the transition map be?', 'Smooth, with a smooth inverse', ['Merely continuous', 'Linear', 'The identity'], 'that is what makes the atlas smooth'),

  q('math.top.topological-space', D, 'X = {a, b}. Which collection is a topology on X?', '{∅, {a}, {a, b}}', ['{∅, {a}}', '{{a}, {a, b}}', '{∅, {a}, {b}}'], 'it must contain ∅ and X and be closed under unions and intersections'),
  q('math.top.topological-space', A, 'How many topologies are there on a 2-element set?', '4', ['2', '3', '16'], 'indiscrete, discrete and the two Sierpiński topologies'),

  q('math.top.tychonoff', D, 'What does Tychonoff\'s theorem say?', 'Any product of compact spaces is compact in the product topology', ['Any product of connected spaces is compact', 'Only finite products of compact spaces are compact', 'Any product of Hausdorff spaces is compact'], 'arbitrary products, product topology'),
  q('math.top.tychonoff', A, 'Is [0, 1]^ℕ with the product topology compact?', 'Yes, by Tychonoff\'s theorem', ['No, it is infinite-dimensional', 'No, it is unbounded', 'Only with the box topology'], 'a product of compact intervals'),

  q('math.top.van-kampen', D, 'X = U ∪ V with U, V open and simply connected and U ∩ V path-connected. What is π₁(X)?', 'Trivial', ['ℤ', 'π₁(U ∩ V)', 'ℤ ∗ ℤ'], 'the free product of two trivial groups'),
  q('math.top.van-kampen', A, 'What is π₁ of the wedge of two circles?', 'The free group on two generators', ['ℤ × ℤ', 'ℤ', 'Trivial'], 'ℤ ∗ ℤ, amalgamated over a trivial intersection'),
]

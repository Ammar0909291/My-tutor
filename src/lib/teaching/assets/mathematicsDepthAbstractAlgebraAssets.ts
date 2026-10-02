/**
 * MATHEMATICS — probe DEPTH, batch 14: math.abst (37 (concept, band) pairs, 74 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every answer was checked by hand, e.g. 3 · 5 = 15 ≡ 1 in (ℤ/7ℤ)*, the
 * order of (1 2)(3 4 5) is lcm(2, 3) = 6, Burnside on a 3-bead 2-colour
 * necklace gives (8 + 2 + 2)/3 = 4, (2x + 1)² = 4x² + 4x + 1 ≡ 1 in ℤ/4ℤ[x],
 * n₃ for |G| = 12 is 1 or 4, and (1 2)(2 3) = (1 2 3) applying the right
 * factor first.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const UG = GradeBand.UNDERGRADUATE
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand: UG, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

const M = 'mcq' as const
const X = 'misconception_probe' as const

export const MATHEMATICS_DEPTH_ABSTRACT_ALGEBRA_PROBES: SeedProbe[] = [
  q('math.abst.algebraic-extension', M, D, 'What is the minimal polynomial of √2 over ℚ?', 'x² − 2', ['x − √2', 'x⁴ − 4', 'x² + 2'], 'monic, irreducible over ℚ, with √2 as a root'),
  q('math.abst.algebraic-extension', M, A, 'What is [ℚ(∛2) : ℚ]?', '3', ['2', '6', '1'], 'x³ − 2 is irreducible by Eisenstein'),

  q('math.abst.algebraic-structure', M, D, 'What kind of structure is (ℤ, +)?', 'An abelian group', ['A field', 'A ring', 'Not a group'], 'one operation, associative, with identity 0 and inverses'),
  q('math.abst.algebraic-structure', M, A, 'With both ordinary addition and multiplication, what kind of structure is ℤ?', 'A commutative ring that is not a field', ['A field', 'Only a group', 'Not a ring'], '2 has no multiplicative inverse in ℤ'),

  q('math.abst.alternating-group', M, D, 'What is |A₄|?', '12', ['24', '4', '6'], 'half of 4! = 24'),
  q('math.abst.alternating-group', M, A, 'Is the 4-cycle (1 2 3 4) in A₄?', 'No, it is a product of three transpositions, so it is odd', ['Yes, every cycle is even', 'Yes, it has length 4, an even number', 'Only in A₅'], '(1 2 3 4) = (1 4)(1 3)(1 2)'),

  q('math.abst.binary-operation', M, D, 'Which rule is a binary operation on ℤ?', 'a ∗ b = a − b', ['a ∗ b = a/b', 'a ∗ b = √(ab)', 'a ∗ b = aᵇ'], 'it must give an integer for every pair of integers'),
  q('math.abst.binary-operation', M, A, 'How many binary operations are there on a set with 2 elements?', '16', ['4', '8', '2'], '2 choices for each of the 4 ordered pairs'),

  q('math.abst.burnside-lemma', M, D, 'By Burnside\'s lemma, the number of orbits of G acting on X equals what?', 'The average number of fixed points, (1/|G|) Σ |Fix(g)|', ['|X|/|G|', 'Σ |Fix(g)|', '|G| · |X|'], 'average over the group'),
  q('math.abst.burnside-lemma', M, A, 'Three beads on a ring are coloured with 2 colours, counted up to rotation. How many distinct necklaces are there?', '4', ['8', '3', '6'], 'identity fixes 8, each rotation fixes 2: (8 + 2 + 2)/3'),

  q('math.abst.coset', M, D, 'In ℤ, what is the coset 2 + 5ℤ?', '{…, −3, 2, 7, 12, …}', ['{2, 5}', '{0, 5, 10, …}', '{2, 7, 12} only'], 'every integer that leaves remainder 2 on division by 5'),
  q('math.abst.coset', M, A, 'H has 4 elements in a group of order 20. How many left cosets of H are there?', '5', ['4', '16', '80'], 'the index |G|/|H|'),

  q('math.abst.cyclic-group', M, D, 'Which element generates ℤ/6ℤ?', '5', ['2', '3', '4'], 'gcd(5, 6) = 1'),
  q('math.abst.cyclic-group', M, A, 'How many generators does ℤ/12ℤ have?', '4', ['12', '6', '2'], '1, 5, 7 and 11 are coprime to 12'),

  q('math.abst.euclidean-domain', M, D, 'Which ring is a Euclidean domain?', 'ℤ[i], with norm a² + b²', ['ℤ[x]', 'ℤ[√−5]', 'ℤ/6ℤ'], 'the Gaussian integers allow division with a smaller remainder'),
  q('math.abst.euclidean-domain', M, A, 'In ℚ[x], what is gcd(x² − 1, x² − 3x + 2)?', 'x − 1', ['x + 1', '1', 'x² − 1'], '(x − 1)(x + 1) and (x − 1)(x − 2)'),

  q('math.abst.field-extension', M, D, 'What is [ℚ(√2, √3) : ℚ]?', '4', ['2', '5', '6'], 'the tower law: 2 · 2'),
  q('math.abst.field-extension', M, A, 'What is [ℂ : ℝ]?', '2', ['1', '∞', '4'], 'basis {1, i}'),

  q('math.abst.field', M, D, 'Which ring is a field?', 'ℤ/7ℤ', ['ℤ/6ℤ', 'ℤ', 'ℤ[x]'], '7 is prime, so every nonzero class is invertible'),
  q('math.abst.field', M, A, 'In ℤ/7ℤ, what is the multiplicative inverse of 3?', '5', ['4', '3', '1/3'], '3 · 5 = 15 ≡ 1'),

  q('math.abst.finite-field', M, D, 'Which number can be the order of a finite field?', '8', ['6', '10', '12'], 'orders are prime powers'),
  q('math.abst.finite-field', M, A, 'How many elements does the multiplicative group of 𝔽₉ have?', '8', ['9', '3', '6'], 'all nonzero elements'),

  q('math.abst.first-isomorphism-theorem', M, D, 'φ: G → H is a surjective homomorphism with kernel K. Which isomorphism holds?', 'G/K ≅ H', ['G ≅ H', 'K ≅ H', 'G ≅ K × H'], 'the first isomorphism theorem'),
  q('math.abst.first-isomorphism-theorem', M, A, 'det: GL₂(ℝ) → ℝ* is onto with kernel SL₂(ℝ). What is GL₂(ℝ)/SL₂(ℝ) isomorphic to?', 'The nonzero reals under multiplication', ['SL₂(ℝ)', 'The reals under addition', 'The trivial group'], 'G/ker φ ≅ im φ'),

  q('math.abst.galois-correspondence', M, D, '[K : F] = 8 and H ≤ Gal(K/F) has order 2. What is the degree of the fixed field K^H over F?', '4', ['2', '8', '16'], '[K : K^H] = |H| = 2'),
  q('math.abst.galois-correspondence', M, A, 'Which subgroups correspond to intermediate fields that are Galois over F?', 'The normal subgroups', ['The abelian subgroups', 'The cyclic subgroups', 'All subgroups'], 'the fundamental theorem of Galois theory'),

  q('math.abst.galois-group', M, D, 'What is |Gal(ℚ(√2)/ℚ)|?', '2', ['1', '4', 'Infinite'], 'the identity and √2 ↦ −√2'),
  q('math.abst.galois-group', M, A, 'What is Gal(ℚ(√2, √3)/ℚ) isomorphic to?', 'ℤ/2ℤ × ℤ/2ℤ', ['ℤ/4ℤ', 'S₃', 'ℤ/2ℤ'], 'flip each square root independently; no element has order 4'),

  q('math.abst.galois-theory', M, D, 'What is Gal(𝔽₈/𝔽₂) isomorphic to?', 'ℤ/3ℤ', ['ℤ/8ℤ', 'ℤ/7ℤ', 'S₃'], 'generated by Frobenius, of order [𝔽₈ : 𝔽₂] = 3'),
  q('math.abst.galois-theory', M, A, 'Why is the general quintic not solvable by radicals?', 'Its Galois group S₅ is not solvable', ['A quintic has no roots', 'Its roots are irrational', 'Its degree is odd'], 'the roots exist; radicals cannot express them'),

  q('math.abst.group-action', M, D, 'S₃ acts on {1, 2, 3}. What is the orbit of 1?', '{1, 2, 3}', ['{1}', '{1, 2}', 'S₃ itself'], 'some permutation sends 1 to each point'),
  q('math.abst.group-action', M, A, 'A group of order 24 acts on X, and the orbit of x has 6 elements. What is |Stab(x)|?', '4', ['6', '18', '144'], 'orbit–stabilizer: |G| = |Orb| · |Stab|'),

  q('math.abst.group-homomorphism', M, D, 'φ: ℤ → ℤ/4ℤ sends n to n mod 4. What is ker φ?', '4ℤ', ['{0}', 'ℤ', '{0, 4}'], 'all multiples of 4'),
  q('math.abst.group-homomorphism', M, A, 'g has order 6 and φ is a homomorphism. Which order can φ(g) have?', '3', ['4', '5', '12'], 'the order of φ(g) divides 6'),

  q('math.abst.group-inverse', M, D, 'In ℤ/9ℤ under addition, what is the inverse of 4?', '5', ['4', '1/4', '9'], '4 + 5 ≡ 0'),
  q('math.abst.group-inverse', M, A, 'In S₃, what is the inverse of (1 2 3)?', '(1 3 2)', ['(1 2 3)', '(1 2)', '(2 3)'], 'run the cycle backwards'),

  q('math.abst.group-isomorphism', M, D, 'Which group is isomorphic to ℤ/6ℤ?', 'ℤ/2ℤ × ℤ/3ℤ', ['S₃', 'ℤ/2ℤ × ℤ/2ℤ', 'ℤ/3ℤ'], '(1, 1) has order lcm(2, 3) = 6'),
  q('math.abst.group-isomorphism', M, A, 'Which map is an isomorphism from (ℝ, +) to (ℝ>0, ×)?', 'x ↦ eˣ', ['x ↦ x²', 'x ↦ |x|', 'x ↦ x + 1'], 'e^(a + b) = eᵃeᵇ, and it is a bijection'),

  q('math.abst.group-operation', M, D, 'In ℤ/6ℤ, what is 4 + 5?', '3', ['9', '1', '20'], '9 mod 6'),
  q('math.abst.group-operation', M, A, 'In the multiplicative group (ℤ/7ℤ)*, what is 3 · 5?', '1', ['15', '8', '2'], '15 mod 7'),

  q('math.abst.group-order', M, D, 'What is the order of 4 in ℤ/10ℤ?', '5', ['4', '10', '2'], '10/gcd(4, 10)'),
  q('math.abst.group-order', M, A, 'What is the order of (1 2)(3 4 5) in S₅?', '6', ['5', '2', '3'], 'lcm of the disjoint cycle lengths'),

  q('math.abst.group-theory', X, F, 'Is (ℤ, ·), the integers under multiplication, a group?', 'No, 2 has no inverse in ℤ', ['Yes, it is associative with identity 1', 'Yes, it is closed', 'No, it is not closed'], 'every element needs an inverse inside the set'),
  q('math.abst.group-theory', X, P, 'In a group, ab = ac. What follows?', 'b = c', ['Nothing, unless the group is abelian', 'a = e', 'b = c only when a = e'], 'multiply on the left by a⁻¹; no commutativity needed'),

  q('math.abst.ideal', M, D, 'Which subset is an ideal of ℤ?', '3ℤ', ['{0, 1}', 'ℕ', 'The odd integers'], 'closed under addition and absorbs multiplication'),
  q('math.abst.ideal', M, A, 'In ℤ, what is the ideal ⟨4, 6⟩?', '2ℤ', ['24ℤ', '10ℤ', '4ℤ'], 'generated by gcd(4, 6)'),

  q('math.abst.lagrange-theorem', M, D, '|G| = 15. Which number could be the order of a subgroup?', '5', ['4', '6', '10'], 'subgroup orders divide 15'),
  q('math.abst.lagrange-theorem', M, A, '|G| = p, a prime. What can you conclude?', 'G is cyclic', ['G is S_p', 'G has a subgroup of order 2', 'G is non-abelian'], 'any non-identity element has order p'),

  q('math.abst.normal-subgroup', M, D, 'Which subgroup is normal in every group G?', 'The centre Z(G)', ['Any cyclic subgroup', 'Any subgroup of order 2', 'Any subgroup'], 'central elements commute with all of G'),
  q('math.abst.normal-subgroup', M, A, 'H ≤ G has index 2. Is H normal in G?', 'Yes, always', ['Only if G is abelian', 'Only if H is cyclic', 'Never'], 'the left and right cosets are both H and G \\ H'),

  q('math.abst.pid', M, D, 'Which ring is a principal ideal domain?', 'ℤ', ['ℤ[x]', 'ℤ[√−5]', 'ℚ[x, y]'], 'every ideal of ℤ is nℤ'),
  q('math.abst.pid', M, A, 'In ℚ[x], which single polynomial generates the ideal ⟨x² − 1, x + 1⟩?', 'x + 1', ['1', 'x − 1', 'x² − 1'], 'the gcd, since x + 1 divides x² − 1'),

  q('math.abst.polynomial-ring', M, D, 'What is the degree of (2x² + 1)(3x³ − x) in ℤ[x]?', '5', ['6', '3', '2'], 'leading terms 2 · 3 ≠ 0, degrees add'),
  q('math.abst.polynomial-ring', M, A, 'In (ℤ/4ℤ)[x], what is (2x + 1)²?', '1', ['4x² + 4x + 1', '2x² + 1', 'x² + 1'], '4x² + 4x + 1 with 4 ≡ 0'),

  q('math.abst.prime-ideal', M, D, 'Which ideal of ℤ is prime?', '7ℤ', ['6ℤ', '4ℤ', '9ℤ'], 'nℤ is prime exactly when n is prime (or 0)'),
  q('math.abst.prime-ideal', M, A, 'Is ⟨x⟩ a prime ideal of ℤ[x]?', 'Yes, since ℤ[x]/⟨x⟩ ≅ ℤ is an integral domain', ['No, because it is maximal', 'No, because x is not a prime number', 'Only in ℚ[x]'], 'prime but not maximal: ℤ is not a field'),

  q('math.abst.quotient-group', M, D, '|G| = 24 and N ⊴ G has order 6. What is |G/N|?', '4', ['18', '144', '6'], 'divide, do not subtract'),
  q('math.abst.quotient-group', M, A, 'What is (ℤ/12ℤ)/⟨4⟩ isomorphic to?', 'ℤ/4ℤ', ['ℤ/3ℤ', 'ℤ/2ℤ × ℤ/2ℤ', 'ℤ/8ℤ'], '⟨4⟩ = {0, 4, 8}; a quotient of a cyclic group is cyclic'),

  q('math.abst.quotient-ring', M, D, 'In ℤ[x]/⟨x² + 1⟩, what is the class of x²?', '−1', ['0', '1', 'x² + 1'], 'x² + 1 ≡ 0'),
  q('math.abst.quotient-ring', M, A, 'What is ℝ[x]/⟨x² + 1⟩ isomorphic to?', 'ℂ', ['ℝ', 'ℝ × ℝ', 'ℤ'], 'x plays the role of i'),

  q('math.abst.ring-homomorphism', M, D, 'Which map ℤ → ℤ/5ℤ is a ring homomorphism?', 'n ↦ n mod 5', ['n ↦ 2n mod 5', 'n ↦ n² mod 5', 'n ↦ n + 1 mod 5'], 'it must respect both + and ·'),
  q('math.abst.ring-homomorphism', M, A, 'φ: ℤ[x] → ℤ evaluates at x = 2. What is φ(x² + 3)?', '7', ['5', 'x² + 3', '4'], '2² + 3'),

  q('math.abst.ring-theory', M, D, 'Which element of ℤ/6ℤ is a zero divisor?', '2', ['1', '5', 'None of them'], '2 · 3 ≡ 0'),
  q('math.abst.ring-theory', M, A, 'Which ring has no zero divisors?', 'ℤ', ['ℤ/6ℤ', 'The 2×2 real matrices', 'ℤ × ℤ'], '(1, 0)(0, 1) = 0 in ℤ × ℤ'),

  q('math.abst.second-isomorphism-theorem', M, D, 'H ≤ G and N ⊴ G. Which isomorphism does the second isomorphism theorem give?', 'HN/N ≅ H/(H ∩ N)', ['HN/H ≅ N', 'H/N ≅ HN', 'G/N ≅ H'], 'the diamond isomorphism'),
  q('math.abst.second-isomorphism-theorem', M, A, 'In ℤ, H = 6ℤ and N = 10ℤ. What is the order of (H + N)/N?', '5', ['2', '30', '3'], 'H + N = 2ℤ, and 2ℤ/10ℤ ≅ 6ℤ/30ℤ'),

  q('math.abst.subgroup', M, D, 'Which subset is a subgroup of ℤ/8ℤ?', '{0, 2, 4, 6}', ['{0, 1, 2, 3}', '{1, 3, 5, 7}', '{0, 3, 6}'], 'closed under addition mod 8 and contains 0'),
  q('math.abst.subgroup', M, A, 'How many subgroups does ℤ/12ℤ have?', '6', ['12', '4', '2'], 'one for each divisor of 12'),

  q('math.abst.sylow-theorems', M, D, '|G| = 15. How many Sylow 5-subgroups can G have?', '1', ['3', '6', '15'], 'n₅ ≡ 1 mod 5 and n₅ divides 3'),
  q('math.abst.sylow-theorems', M, A, '|G| = 12. Which values can n₃ take?', '1 or 4', ['1 or 2', '1, 2 or 4', '3 only'], 'n₃ ≡ 1 mod 3 and n₃ divides 4'),

  q('math.abst.symmetric-group', M, D, 'What is |S₄|?', '24', ['16', '12', '4'], '4!'),
  q('math.abst.symmetric-group', M, A, 'Applying the right factor first, what is (1 2)(2 3) in S₃?', '(1 2 3)', ['(1 3 2)', '(1 3)', 'The identity'], '1 → 2, 2 → 3, 3 → 1'),

  q('math.abst.ufd', M, D, 'Which ring is NOT a unique factorization domain?', 'ℤ[√−5]', ['ℤ', 'ℚ[x]', 'ℤ[x]'], '6 factors in two different ways'),
  q('math.abst.ufd', M, A, 'In ℤ[√−5], 6 = 2 · 3 = (1 + √−5)(1 − √−5). What does this show?', 'Factorization into irreducibles is not unique there', ['2 is not irreducible', '√−5 is a unit', '6 is prime'], 'all four factors are irreducible and not associates'),
]

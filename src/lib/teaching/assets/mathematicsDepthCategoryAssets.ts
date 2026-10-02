/**
 * MATHEMATICS — probe DEPTH, batch 23: math.cat (15 (concept, band) pairs, 30 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every answer was checked against the definitions, e.g. the equalizer of
 * x² and x on ℝ is {0, 1}, the coequalizer of f ≡ 1 and g(a) = 1, g(b) = 2 is
 * a single point, the list monad flattens [[1, 2], [3]] to [1, 2, 3], and
 * the contravariant power set functor is represented by a 2-element set.
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

export const MATHEMATICS_DEPTH_CATEGORY_PROBES: SeedProbe[] = [
  q('math.cat.adjunction', D, 'F ⊣ U for the free group functor F and the forgetful functor U. Which bijection defines the adjunction?', 'Hom_Grp(F(X), G) ≅ Hom_Set(X, U(G))', ['Hom_Grp(G, F(X)) ≅ Hom_Set(U(G), X)', 'Hom_Set(F(X), G) ≅ Hom_Grp(X, U(G))', 'F(U(G)) = G for every group G'], 'a homomorphism out of a free group is a function on its generators'),
  q('math.cat.adjunction', A, 'Which functor is left adjoint to the forgetful functor from K-vector spaces to sets?', 'The free vector space functor, sending X to the space with basis X', ['The dual space functor', 'The forgetful functor itself', 'The power set functor'], 'a linear map is fixed by its values on a basis'),

  q('math.cat.category', D, 'In a category, f: A → B and g: B → C. What are the domain and codomain of g ∘ f?', 'A → C', ['C → A', 'B → B', 'A → B'], 'f first, then g'),
  q('math.cat.category', A, 'The group ℤ/3ℤ is viewed as a category with one object. How many morphisms does it have?', '3', ['1', '9', '0'], 'one morphism per group element'),

  q('math.cat.equalizer', D, 'In Set, what is the equalizer of f(x) = x² and g(x) = x on ℝ?', '{0, 1} with its inclusion', ['{0} alone', 'All of ℝ', '{1} alone'], 'the set where x² = x'),
  q('math.cat.equalizer', A, 'In Set, f, g: {a, b} → {1, 2} with f(a) = f(b) = 1, g(a) = 1 and g(b) = 2. What is their coequalizer?', 'A single point', ['{1, 2}', 'The empty set', '{a}'], 'identify f(b) = 1 with g(b) = 2'),

  q('math.cat.functor-category', D, 'In the functor category [C, D], what are the morphisms?', 'Natural transformations', ['Functors', 'Objects of D', 'Morphisms of C'], 'the objects are functors C → D'),
  q('math.cat.functor-category', A, 'θ: F ⇒ G and η: G ⇒ H. What is the component of η ∘ θ at X?', 'η_X ∘ θ_X', ['θ_X ∘ η_X', 'H(θ_X)', 'η_X alone'], 'vertical composition, componentwise'),

  q('math.cat.functor', D, 'Where does the covariant power set functor P: Set → Set send f: A → B?', 'To the image map P(f)(S) = f(S)', ['To the preimage map', 'To f itself', 'To the empty map'], 'subsets are pushed forward'),
  q('math.cat.functor', A, 'Hom(−, X) is a contravariant functor. Where does it send f: A → B?', 'To Hom(B, X) → Hom(A, X), h ↦ h ∘ f', ['To Hom(A, X) → Hom(B, X), h ↦ f ∘ h', 'To postcomposition with f', 'To f⁻¹'], 'precomposition reverses the direction'),

  q('math.cat.higher-category', D, 'In a 2-category, what are the 2-morphisms?', 'Morphisms between 1-morphisms', ['Morphisms between objects', 'The objects themselves', 'Functors between 2-categories'], 'arrows between arrows'),
  q('math.cat.higher-category', A, 'Viewing Cat as a 2-category, what are its objects, 1-morphisms and 2-morphisms?', 'Categories, functors and natural transformations', ['Functors, categories and natural transformations', 'Sets, functions and relations', 'Categories, natural transformations and functors'], 'one level up at each step'),

  q('math.cat.limits', D, 'In Set, what is the limit of the discrete diagram with two objects A and B?', 'The product A × B', ['The disjoint union A ⊔ B', 'The intersection A ∩ B', 'The set Hom(A, B)'], 'a product is a limit over a discrete diagram'),
  q('math.cat.limits', A, 'What is the limit of the empty diagram?', 'A terminal object', ['An initial object', 'It is never defined', 'Always a zero object'], 'a cone over nothing is just an object'),

  q('math.cat.monad', D, 'A monad on C is a functor T with which two natural transformations?', 'A unit η: 1 ⇒ T and a multiplication μ: T² ⇒ T', ['A counit ε: T ⇒ 1 and a comultiplication', 'An inverse T⁻¹ and an identity', 'Two adjoint functors F and U'], 'the monoid laws for an endofunctor'),
  q('math.cat.monad', A, 'In the list monad on Set, what does the multiplication μ do to [[1, 2], [3]]?', 'It flattens it to [1, 2, 3]', ['It gives [[1, 2, 3]]', 'It gives [1, 2]', 'It gives [[1], [2], [3]]'], 'μ concatenates a list of lists'),

  q('math.cat.morphism-types', D, 'In Set, which morphisms are the epimorphisms?', 'The surjective functions', ['The injective functions', 'Only the bijections', 'All functions'], 'right-cancellable maps'),
  q('math.cat.morphism-types', A, 'Which morphism is always an isomorphism?', 'One with a two-sided inverse', ['One that is both monic and epic', 'One with a left inverse', 'One that is injective on underlying sets'], 'ℤ ↪ ℚ in Ring is monic and epic but not invertible'),

  q('math.cat.natural-transformation', D, 'η: F ⇒ G with F, G: C → D. For f: X → Y, what does naturality require?', 'G(f) ∘ η_X = η_Y ∘ F(f)', ['F(f) ∘ η_X = η_Y ∘ G(f)', 'η_X = η_Y', 'G(f) = F(f)'], 'the naturality square commutes'),
  q('math.cat.natural-transformation', A, 'Which family of maps is natural in finite-dimensional vector spaces V?', 'V → V**, v ↦ (φ ↦ φ(v))', ['V → V* through a chosen inner product', 'V → V* through a chosen basis', 'V → Kⁿ through a chosen basis'], 'it uses no choices'),

  q('math.cat.pullback', D, 'In Set, what is the pullback of f: A → C and g: B → C?', '{(a, b) ∈ A × B : f(a) = g(b)}', ['A × B', 'A ⊔ B', 'f(A) ∩ g(B)'], 'pairs that agree in C'),
  q('math.cat.pullback', A, 'In Set, what is the pullback of two inclusions A ↪ C and B ↪ C?', 'A ∩ B', ['A ∪ B', 'A × B', 'C'], 'pairs (a, b) with a = b'),

  q('math.cat.representable-functor', D, 'Which object represents the forgetful functor U: Grp → Set?', 'ℤ, since Hom(ℤ, G) ≅ U(G)', ['The trivial group', 'ℤ/2ℤ', 'ℚ'], 'a homomorphism from ℤ is fixed by the image of 1'),
  q('math.cat.representable-functor', A, 'Which set represents the contravariant power set functor (X ↦ subsets of X)?', 'A 2-element set {0, 1}', ['The empty set', 'A 1-element set', 'ℕ'], 'subsets correspond to characteristic functions'),

  q('math.cat.tensor-product', D, 'In the monoidal category (Set, ×), what is the unit object?', 'A one-element set', ['The empty set', 'ℕ', '{0, 1}'], '1 × A ≅ A'),
  q('math.cat.tensor-product', A, 'In the monoidal category of K-vector spaces with ⊗, what is the unit object?', 'The field K itself', ['The zero space', 'K²', 'The dual space'], 'K ⊗ V ≅ V'),

  q('math.cat.topos', D, 'In the topos Set, what is the subobject classifier Ω?', 'A two-element set {true, false}', ['A one-element set', 'The empty set', 'ℕ'], 'subsets correspond to maps into {true, false}'),
  q('math.cat.topos', A, 'Which category is a topos?', 'Sheaves of sets on a topological space', ['Grp', 'Top', 'K-vector spaces'], 'Grothendieck toposes'),

  q('math.cat.yoneda-lemma', D, 'By the Yoneda lemma, Nat(Hom(A, −), F) is in bijection with what?', 'F(A)', ['F itself', 'Hom(A, A)', 'The empty set'], 'evaluate at the identity of A'),
  q('math.cat.yoneda-lemma', A, 'What property does the Yoneda embedding of C into presheaves on C have?', 'It is fully faithful', ['It is an equivalence of categories', 'It forgets the morphisms', 'It is surjective on objects'], 'Hom(y(A), y(B)) ≅ Hom(A, B)'),
]

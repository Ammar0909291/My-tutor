/**
 * Sixth math.cat asset batch — representable-functor and monad.
 *
 * Continues serving-asset coverage for math.cat (10/15 -> 12/15).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.representable-functor.md
 * and math.cat.monad.md.
 *
 *   REPFUNCTOR   representable-functor — a genuine natural isomorphism,
 *                the universal element is eta_A(id_A) specifically, and
 *                representing objects are unique only up to isomorphism.
 *   MONAD        monad — arises directly from any adjunction, mu is
 *                built from the counit, functional-programming monads
 *                are genuine instances.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const REPFUNCTOR = 'math.cat.representable-functor'
const MONAD = 'math.cat.monad'

export const MATHEMATICS_CATEGORY_MONAD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REPFUNCTOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Representability requires a genuine NATURAL ISOMORPHISM, never a loose resemblance to '
      + 'Hom-sets. For U:Grp→Set, claiming U ≅ Hom_Grp(Z,-): VERIFY at each group G that a '
      + 'homomorphism Z→G is determined entirely by where the generator 1 goes (any element of '
      + 'G), giving a genuine BIJECTION Hom(Z,G) ≅ U(G), natural in G. Representability demands a '
      + 'checkable bijection at EVERY object plus naturality, never a vague structural '
      + 'similarity.\n\n'
      + 'The universal element is the SPECIFIC eta_A(id_A), never any convenient element of F(A). '
      + 'For U ≅ Hom(Z,-): the universal element is u = eta_Z(id_Z) = 1 ∈ Z — the generator '
      + 'itself. This one element is genuinely universal: for ANY group G and ANY g in G, there '
      + 'is a UNIQUE homomorphism Z→G sending 1↦g, recovering the whole isomorphism.\n\n'
      + 'The representing object is unique UP TO ISOMORPHISM, never unambiguously unique. Any '
      + 'group isomorphic to (but not literally equal to) Z could ALSO represent U — the standard '
      + 'categorical uniqueness caveat, already familiar from limit theory\'s own universal-cone '
      + 'uniqueness.',
    targetedMisconceptions: [`${REPFUNCTOR}:MC-1`, `${REPFUNCTOR}:MC-2`, `${REPFUNCTOR}:MC-3`],
    source: eb(REPFUNCTOR, 'Core Understanding — representability requires a genuine natural isomorphism, the universal element is eta_A(id_A), representing objects are unique up to isomorphism'),
  },
  {
    conceptId: MONAD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A monad\'s structure ARISES DIRECTLY from any adjunction, never arbitrarily imposed. Given '
      + 'the free⊣forgetful adjunction F⊣U: T=UF:Set→Set sends a set A to U(F(A)). The unit '
      + 'eta_A:A→T(A) is EXACTLY the adjunction\'s own unit, directly reused, never a new '
      + 'construction.\n\n'
      + 'The multiplication mu is built directly from the adjunction\'s counit, never an '
      + 'unrelated new construction. For the free-group monad, mu_A:T^2(A)→T(A) FLATTENS a free '
      + 'group built on top of another free group\'s underlying set — a "word of words" — into a '
      + 'single free group\'s word, directly analogous to flattening a list of lists.\n\n'
      + 'Functional-programming monads are GENUINE INSTANCES, never coincidental name-sharing. '
      + 'Haskell\'s Maybe type is a genuine functor with unit eta_A(a)=Just(a) and multiplication '
      + 'flattening Just(Just(a))↦Just(a). Checking the unit law: '
      + 'mu(eta(Just(a))) = mu(Just(Just(a))) = Just(a) — exactly as required, the same '
      + 'associativity and unit laws as the general definition and the free-group monad.',
    targetedMisconceptions: [`${MONAD}:MC-1`, `${MONAD}:MC-2`, `${MONAD}:MC-3`],
    source: eb(MONAD, 'Core Understanding — a monad arises directly from any adjunction, mu is built from the counit, functional-programming monads are genuine instances'),
  },
]

export const MATHEMATICS_CATEGORY_MONAD_PROBES: SeedProbe[] = [
  // --- math.cat.representable-functor ---------------------------------------
  {
    conceptId: REPFUNCTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does "the values of F look like they could come from a Hom-set" count as showing F is representable?',
    choices: [
      { text: 'No — representability requires a genuine natural isomorphism verified at every object, not a loose resemblance', isCorrect: true },
      { text: 'Yes — a resembling shape is sufficient evidence', isCorrect: false, misconceptionId: `${REPFUNCTOR}:MC-1` },
      { text: 'Yes, as long as F is a covariant functor', isCorrect: false, misconceptionId: `${REPFUNCTOR}:MC-1` },
    ],
    targetedMisconceptions: [`${REPFUNCTOR}:MC-1`],
    source: eb(REPFUNCTOR, 'Assessment gate — representability requires a genuine natural isomorphism'),
  },
  {
    conceptId: REPFUNCTOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For U ≅ Hom(Z,-) with U(Z)=Z, is the universal element just any convenient element of Z, like 2 or 5?',
    choices: [
      { text: 'No — the universal element is specifically eta_Z(id_Z) = 1, the generator itself, the only element that reconstructs the whole isomorphism', isCorrect: true },
      { text: 'Yes — any element of Z works equally well as "the universal element"', isCorrect: false, misconceptionId: `${REPFUNCTOR}:MC-2` },
      { text: 'Yes, since all elements of Z play a symmetric role', isCorrect: false, misconceptionId: `${REPFUNCTOR}:MC-2` },
    ],
    targetedMisconceptions: [`${REPFUNCTOR}:MC-2`],
    source: eb(REPFUNCTOR, 'Misconception register — the universal element is eta_A(id_A) specifically'),
  },
  {
    conceptId: REPFUNCTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is Z the unique object (in an absolute sense) that represents U:Grp→Set?',
    choices: [
      { text: 'No — any group isomorphic to Z (but not literally equal to it) could also represent U; the representing object is unique only up to isomorphism', isCorrect: true },
      { text: 'Yes — Z is the one and only literal object that can represent U', isCorrect: false, misconceptionId: `${REPFUNCTOR}:MC-3` },
      { text: 'Yes, since representing objects are always singleton-unique', isCorrect: false, misconceptionId: `${REPFUNCTOR}:MC-3` },
    ],
    targetedMisconceptions: [`${REPFUNCTOR}:MC-3`],
    source: eb(REPFUNCTOR, 'Transfer probe — representing objects are unique only up to isomorphism'),
  },

  // --- math.cat.monad --------------------------------------------------------
  {
    conceptId: MONAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a monad\'s functor+unit+multiplication structure an arbitrary imposed structure with no deeper origin?',
    choices: [
      { text: 'No — it arises directly and automatically from any adjunction, with the unit reused unchanged from the adjunction\'s own unit', isCorrect: true },
      { text: 'Yes — the monad axioms are an independent structure chosen separately from any adjunction', isCorrect: false, misconceptionId: `${MONAD}:MC-1` },
      { text: 'Yes, since not every adjunction produces a valid monad', isCorrect: false, misconceptionId: `${MONAD}:MC-1` },
    ],
    targetedMisconceptions: [`${MONAD}:MC-1`],
    source: eb(MONAD, 'Assessment gate — a monad\'s structure arises directly from any adjunction'),
  },
  {
    conceptId: MONAD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the monad\'s multiplication mu:T^2⇒T an unrelated new construction, invented separately from the adjunction?',
    choices: [
      { text: 'No — mu is built directly from the adjunction\'s counit, and concretely performs a flattening operation on the doubled structure', isCorrect: true },
      { text: 'Yes — mu has no connection to the adjunction\'s counit', isCorrect: false, misconceptionId: `${MONAD}:MC-2` },
      { text: 'Yes, it must be separately defined for each monad from scratch', isCorrect: false, misconceptionId: `${MONAD}:MC-2` },
    ],
    targetedMisconceptions: [`${MONAD}:MC-2`],
    source: eb(MONAD, 'Misconception register — mu is built directly from the adjunction\'s counit'),
  },
  {
    conceptId: MONAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does Haskell\'s Maybe monad share only a name with the mathematical monad, or does it satisfy the same laws?',
    choices: [
      { text: 'It genuinely satisfies the same associativity and unit laws — a real instance of the identical abstract structure, not coincidental terminology', isCorrect: true },
      { text: 'It shares only the name — programming monads follow fundamentally different rules', isCorrect: false, misconceptionId: `${MONAD}:MC-3` },
      { text: 'It is a metaphor for the mathematical monad, not a literal instance', isCorrect: false, misconceptionId: `${MONAD}:MC-3` },
    ],
    targetedMisconceptions: [`${MONAD}:MC-3`],
    source: eb(MONAD, 'Transfer probe — functional-programming monads are genuine instances of the same structure'),
  },
]

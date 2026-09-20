/**
 * Fifth math.cat asset batch — adjunction and yoneda-lemma.
 *
 * Continues serving-asset coverage for math.cat (8/15 -> 10/15). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.adjunction.md and
 * math.cat.yoneda-lemma.md.
 *
 *   ADJUNCTION   adjunction — the hom-set bijection is the correct
 *                relationship, never an inverse expectation; left/right
 *                are specific; adjoint functors arise everywhere.
 *   YONEDA       yoneda-lemma — the bijection is a genuine constructive
 *                correspondence; the extraction recipe evaluates
 *                specifically at A using the identity; determination is
 *                up to isomorphism, never literal identity.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ADJUNCTION = 'math.cat.adjunction'
const YONEDA = 'math.cat.yoneda-lemma'

export const MATHEMATICS_CATEGORY_ADJUNCTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ADJUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'F(U(G)) (forgetful then free) is much bigger and freer than G — NOT a way of "undoing" U. '
      + 'The adjunction F⊣U explains what relationship DOES hold instead: '
      + 'Hom_Grp(FA,B) ≅ Hom_Set(A,UB) — maps OUT of the free group correspond exactly to '
      + 'ordinary functions of the underlying data. The counit ε_G:F(UG)→G is a canonical, '
      + 'always-present morphism, never an isomorphism, capturing exactly how much freedom was '
      + 'added.\n\n'
      + 'Left and right adjoint directions are SPECIFIC, never interchangeable. For F:Set→Grp '
      + '(free) and U:Grp→Set (forgetful): F⊣U means F is the LEFT adjoint — maps OUT of the '
      + 'free object F(A) correspond to simpler maps of the underlying data A. The left adjoint '
      + 'is specifically the one whose maps out correspond to simpler data, matching the F⊣G '
      + 'notation directly.\n\n'
      + 'Adjunctions are a PERVASIVE cross-mathematics pattern, never an isolated construction. '
      + 'The exact free-forgetful pattern recurs across mathematics — product/exponential, '
      + 'direct image/inverse image, colimit/constant functor — each a genuinely DIFFERENT '
      + 'mathematical situation exhibiting the identical abstract structure ("adjoint functors '
      + 'arise everywhere" — Mac Lane).',
    targetedMisconceptions: [`${ADJUNCTION}:MC-1`, `${ADJUNCTION}:MC-2`, `${ADJUNCTION}:MC-3`],
    source: eb(ADJUNCTION, 'Core Understanding — the hom-set bijection is the correct relationship, left/right adjoint are specific, adjunctions recur everywhere'),
  },
  {
    conceptId: YONEDA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Yoneda bijection Nat(Hom(A,-),F) ≅ F(A) is a genuine, CONSTRUCTIVE two-way '
      + 'correspondence, never a mere cardinality coincidence. For every s in F(A), defining '
      + 'η^(s)_A(id_A)=s and building the rest via naturality genuinely produces a valid natural '
      + 'transformation. Conversely, ANY η:Hom(A,-)⇒F is entirely determined by η_A(id_A) — '
      + 'built explicitly in both directions.\n\n'
      + 'The extraction recipe evaluates SPECIFICALLY at A using id_A, never at an arbitrary '
      + 'object or morphism. The correct extraction of the element of F(A) is η_A(id_A). '
      + 'Evaluating a different component, like η_Y(f), gives a valid element but of the WRONG '
      + 'SET entirely (of F(Y), not F(A)). The recipe is specific: evaluate at A, applied to '
      + 'id_A.\n\n'
      + 'The embedding consequence is determination UP TO ISOMORPHISM, never literal identity. '
      + 'If Hom(A,-) ≅ Hom(B,-), the embedding forces A ≅ B as OBJECTS — an isomorphism, not '
      + 'identity. A (an object) and Hom(A,-) (a functor to Set) remain genuinely DIFFERENT '
      + 'KINDS of entities. A\'s isomorphism class is fully recoverable from the functor it '
      + 'represents, but that determination is mediated by isomorphism, never literal identity.',
    targetedMisconceptions: [`${YONEDA}:MC-1`, `${YONEDA}:MC-2`, `${YONEDA}:MC-3`],
    source: eb(YONEDA, 'Core Understanding — the bijection is genuinely constructive, extraction evaluates at A using the identity, determination is up to isomorphism'),
  },
]

export const MATHEMATICS_CATEGORY_ADJUNCTION_PROBES: SeedProbe[] = [
  // --- math.cat.adjunction --------------------------------------------------
  {
    conceptId: ADJUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the free functor F and forgetful functor U on groups, should F and U "undo" each other, so F(U(G)) equals G?',
    choices: [
      { text: 'No — the adjunction\'s hom-set bijection Hom(FA,B)≅Hom(A,UB) is the correct relationship, mediated by a non-isomorphism counit', isCorrect: true },
      { text: 'Yes — free and forgetful are inverse operations, just like other inverse-pair patterns', isCorrect: false, misconceptionId: `${ADJUNCTION}:MC-1` },
      { text: 'Yes, for any finitely generated group G', isCorrect: false, misconceptionId: `${ADJUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${ADJUNCTION}:MC-1`],
    source: eb(ADJUNCTION, 'Assessment gate — the hom-set bijection is the correct relationship, never an inverse expectation'),
  },
  {
    conceptId: ADJUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For F:Set→Grp (free) and U:Grp→Set (forgetful) with F⊣U, which functor is the LEFT adjoint?',
    choices: [
      { text: 'F — the left adjoint is the one whose maps OUT correspond to simpler underlying data, matching the F⊣U notation', isCorrect: true },
      { text: 'U — since it maps into the "simpler" category Set', isCorrect: false, misconceptionId: `${ADJUNCTION}:MC-2` },
      { text: 'Either one, since left/right is an arbitrary labeling choice', isCorrect: false, misconceptionId: `${ADJUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${ADJUNCTION}:MC-2`],
    source: eb(ADJUNCTION, 'Misconception register — left and right adjoint directions are specific, never interchangeable'),
  },
  {
    conceptId: ADJUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the free/forgetful adjunction a one-off curiosity specific to groups?',
    choices: [
      { text: 'No — the same hom-set-bijection pattern recurs across mathematics (product/exponential, direct/inverse image, colimit/constant), a pervasive organizing structure', isCorrect: true },
      { text: 'Yes — it is a special algebraic trick unique to groups and sets', isCorrect: false, misconceptionId: `${ADJUNCTION}:MC-3` },
      { text: 'Yes, since no other pair of functors satisfies a similar bijection', isCorrect: false, misconceptionId: `${ADJUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${ADJUNCTION}:MC-3`],
    source: eb(ADJUNCTION, 'Transfer probe — adjunctions are a pervasive cross-mathematics pattern'),
  },

  // --- math.cat.yoneda-lemma -------------------------------------------------
  {
    conceptId: YONEDA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Yoneda bijection Nat(Hom(A,-),F) ≅ F(A) simply an observation that both sides have the same cardinality?',
    choices: [
      { text: 'No — it is a genuine, explicit, two-way constructive correspondence, built in both directions', isCorrect: true },
      { text: 'Yes — the two sets just happen to be the same size', isCorrect: false, misconceptionId: `${YONEDA}:MC-1` },
      { text: 'Yes, and no explicit map between them can be given in general', isCorrect: false, misconceptionId: `${YONEDA}:MC-1` },
    ],
    targetedMisconceptions: [`${YONEDA}:MC-1`],
    source: eb(YONEDA, 'Assessment gate — the bijection is a genuine constructive two-way correspondence'),
  },
  {
    conceptId: YONEDA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given η:Hom(A,-)⇒F, is the corresponding element of F(A) found by evaluating any component at any morphism?',
    choices: [
      { text: 'No — the recipe specifically evaluates the component at A, applied to id_A; evaluating elsewhere lands in the wrong set entirely', isCorrect: true },
      { text: 'Yes — any component and morphism works equally well', isCorrect: false, misconceptionId: `${YONEDA}:MC-2` },
      { text: 'Yes, as long as the morphism is an isomorphism', isCorrect: false, misconceptionId: `${YONEDA}:MC-2` },
    ],
    targetedMisconceptions: [`${YONEDA}:MC-2`],
    source: eb(YONEDA, 'Misconception register — the extraction recipe evaluates specifically at A using the identity'),
  },
  {
    conceptId: YONEDA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If Hom(A,-) ≅ Hom(B,-) (a natural isomorphism), does this mean A is literally the same object as the functor Hom(A,-)?',
    choices: [
      { text: 'No — it means A ≅ B as objects; A and Hom(A,-) remain genuinely different kinds of entities, connected by a determination up to isomorphism', isCorrect: true },
      { text: 'Yes — A and Hom(A,-) are literally the same mathematical object', isCorrect: false, misconceptionId: `${YONEDA}:MC-3` },
      { text: 'Yes, since the functor fully captures every property of A', isCorrect: false, misconceptionId: `${YONEDA}:MC-3` },
    ],
    targetedMisconceptions: [`${YONEDA}:MC-3`],
    source: eb(YONEDA, 'Transfer probe — determination up to isomorphism, never literal identity'),
  },
]

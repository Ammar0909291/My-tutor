/**
 * Seventh math.cat asset batch — tensor-product, topos, higher-category.
 *
 * Completes serving-asset coverage for math.cat (12/15 -> 15/15). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.tensor-product.md,
 * math.cat.topos.md, and math.cat.higher-category.md.
 *
 *   TENSOR    tensor-product — (Vect,⊗,k) is the concrete instance the
 *             abstract axioms generalize; monoidal laws hold up to
 *             coherent natural isomorphism; symmetric structure is extra.
 *   TOPOS     topos — all three conditions (limits, exponentials,
 *             subobject classifier) are independently required; Ω is
 *             defined by its universal property; internal logic is
 *             generally intuitionistic.
 *   HIGHERCAT higher-category — a 2-category's hom-categories are
 *             literally [C,D]; ∞-category composition is associative up
 *             to homotopy; HoTT's proofs-as-paths is a genuine
 *             correspondence.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TENSOR = 'math.cat.tensor-product'
const TOPOS = 'math.cat.topos'
const HIGHERCAT = 'math.cat.higher-category'

export const MATHEMATICS_CATEGORY_CLOSURE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TENSOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '(Vect,⊗,k) IS THE CONCRETE INSTANCE the abstract monoidal-category definition generalizes, '
      + 'never an unrelated new structure. The vector-space tensor product\'s already-verified '
      + 'multilinearity is EXACTLY the bifunctoriality ⊗:Vect×Vect→Vect demands: linear maps '
      + 'f:V→V\', g:W→W\' combine to f⊗g:V⊗W→V\'⊗W\'. The field k serves as the unit object I, '
      + 'since k⊗V≅V.\n\n'
      + 'The monoidal laws hold UP TO COHERENT NATURAL ISOMORPHISM, never literal equality. For '
      + 'A={1,2}, B={a}, C={x,y}: (A×B)×C has elements like ((1,a),x), while A×(B×C) has elements '
      + 'like (1,(a,x)) — GENUINELY DIFFERENT sets as raw data. Yet ((1,a),x)↦(1,(a,x)) is a '
      + 'canonical, natural bijection — a genuine isomorphism, never a claim of literal equality.\n\n'
      + 'Symmetric monoidal structure is ADDITIONAL, SEPARATELY-VERIFIED data, never automatic. In '
      + 'Set, the swap map (a,b)↦(b,a) is a natural isomorphism confirming (Set,×,{*}) IS symmetric '
      + 'monoidal — but this required verifying an EXTRA map with its own hexagon coherence '
      + 'condition, never merely observing that a monoidal structure automatically commutes.',
    targetedMisconceptions: [`${TENSOR}:MC-1`, `${TENSOR}:MC-2`, `${TENSOR}:MC-3`],
    source: eb(TENSOR, 'Core Understanding — Vect is the concrete instance, monoidal laws hold up to natural isomorphism, symmetric structure is additional data'),
  },
  {
    conceptId: TOPOS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ALL THREE topos conditions are INDEPENDENTLY REQUIRED, never just finite limits with minor '
      + 'add-ons. Verifying Set is a topos requires checking (1) finite limits exist, (2) '
      + 'exponentials B^A exist via the currying adjunction Hom(C×A,B)≅Hom(C,B^A), AND (3) the '
      + 'subobject classifier Ω={0,1} exists. Dropping any ONE would NOT qualify as a topos.\n\n'
      + 'Ω is DEFINED BY its universal subset-classifying property, never an arbitrary choice. For '
      + 'X={a,b,c}, S={a,c}: χ_S(a)=1, χ_S(b)=0, χ_S(c)=1. Conversely, for ANY function '
      + 'f:X→{0,1}, f^-1(1) recovers a UNIQUE subset. This bijective correspondence holds for '
      + 'EVERY subset of EVERY set — the universal property Ω={0,1} must satisfy, not a '
      + 'convention.\n\n'
      + 'A topos\'s internal logic is GENERALLY INTUITIONISTIC, never automatically classical. In '
      + 'the topos of sheaves on a topological space, Ω is generally NOT the two-element set — '
      + 'there can be a statement P for which neither P nor "not P" is internally true everywhere, '
      + 'so the classical law of excluded middle FAILS internally.',
    targetedMisconceptions: [`${TOPOS}:MC-1`, `${TOPOS}:MC-2`, `${TOPOS}:MC-3`],
    source: eb(TOPOS, 'Core Understanding — all three conditions are independently required, Ω is defined by its universal property, internal logic is generally intuitionistic'),
  },
  {
    conceptId: HIGHERCAT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A 2-category\'s hom-categories are LITERALLY [C,D], never an unrelated invention. In Cat, '
      + 'the "2-category of categories": objects are categories, morphisms are functors, '
      + '2-morphisms are natural transformations. The hom-category Cat(C,D) — all functors C→D '
      + 'with natural transformations between them — IS EXACTLY [C,D], the functor-category '
      + 'construction already mastered, reused one level up.\n\n'
      + '∞-category composition is associative UP TO HOMOTOPY, never strictly. In an ordinary '
      + 'category, (h∘g)∘f=h∘(g∘f) is a literal equation. In an ∞-category, the two composites '
      + 'need only be CONNECTED BY A HOMOTOPY H (continuous, H(·,0) giving one composite, H(·,1) '
      + 'giving the other) — a coherent witness they are "the same up to a specified path," never '
      + 'literally identical.\n\n'
      + 'HoTT\'s "proofs are paths" is a GENUINE FORMAL CORRESPONDENCE, never a metaphor. In HoTT, '
      + 'a type A is a space; a term a:A is a point; a proof of a=b is LITERALLY a path '
      + 'H:[0,1]→A with H(0)=a, H(1)=b — using EXACTLY the same homotopy machinery. Two different '
      + 'proofs of a=b can correspond to genuinely DIFFERENT, non-homotopic paths — a real, '
      + 'checkable, higher-dimensional phenomenon with no analogue in ordinary equality.',
    targetedMisconceptions: [`${HIGHERCAT}:MC-1`, `${HIGHERCAT}:MC-2`, `${HIGHERCAT}:MC-3`],
    source: eb(HIGHERCAT, 'Core Understanding — a 2-category\'s hom-categories are literally [C,D], ∞-category composition is associative up to homotopy, HoTT\'s proofs-as-paths is a genuine correspondence'),
  },
]

export const MATHEMATICS_CATEGORY_CLOSURE_PROBES: SeedProbe[] = [
  // --- math.cat.tensor-product ------------------------------------------------
  {
    conceptId: TENSOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the categorical monoidal-category definition an unrelated abstract structure, disconnected from the vector-space tensor product already studied?',
    choices: [
      { text: 'No — (Vect,⊗,k) is precisely the concrete instance the abstract axioms generalize, with the already-verified multilinearity being exactly the required bifunctoriality', isCorrect: true },
      { text: 'Yes — the categorical definition is a wholly separate, unrelated abstract structure', isCorrect: false, misconceptionId: `${TENSOR}:MC-1` },
      { text: 'Yes, since bifunctoriality has nothing to do with multilinearity', isCorrect: false, misconceptionId: `${TENSOR}:MC-1` },
    ],
    targetedMisconceptions: [`${TENSOR}:MC-1`],
    source: eb(TENSOR, 'Assessment gate — (Vect,⊗,k) is the concrete instance the abstract definition generalizes'),
  },
  {
    conceptId: TENSOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the associativity law (A×B)×C ≅ A×(B×C) mean these are literally the same set?',
    choices: [
      { text: 'No — they are genuinely different sets as raw data (e.g. ((1,a),x) vs (1,(a,x))); the law holds via a canonical natural isomorphism, never literal equality', isCorrect: true },
      { text: 'Yes — the "≅" symbol here just means literal equality', isCorrect: false, misconceptionId: `${TENSOR}:MC-2` },
      { text: 'Yes, since monoidal laws are always stated as strict equations', isCorrect: false, misconceptionId: `${TENSOR}:MC-2` },
    ],
    targetedMisconceptions: [`${TENSOR}:MC-2`],
    source: eb(TENSOR, 'Misconception register — monoidal laws hold up to coherent natural isomorphism, never literal equality'),
  },
  {
    conceptId: TENSOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every monoidal category automatically satisfy A⊗B ≅ B⊗A, since the familiar examples (Set, Vect, Ab) all do?',
    choices: [
      { text: 'No — symmetric monoidal structure is additional, separately-verified data (e.g. checking the swap map is natural and satisfies its own hexagon coherence), never automatic', isCorrect: true },
      { text: 'Yes — being monoidal already guarantees commutativity up to isomorphism', isCorrect: false, misconceptionId: `${TENSOR}:MC-3` },
      { text: 'Yes, since no non-symmetric monoidal category could exist', isCorrect: false, misconceptionId: `${TENSOR}:MC-3` },
    ],
    targetedMisconceptions: [`${TENSOR}:MC-3`],
    source: eb(TENSOR, 'Transfer probe — symmetric monoidal structure is additional, separately-verified data'),
  },

  // --- math.cat.topos ----------------------------------------------------------
  {
    conceptId: TOPOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is "topos" essentially just "a category with finite limits," with exponentials and a subobject classifier as minor add-ons?',
    choices: [
      { text: 'No — all three conditions (finite limits, exponentials, subobject classifier) are independently required; dropping any one disqualifies the category', isCorrect: true },
      { text: 'Yes — finite limits are the real content, and the other two conditions are secondary', isCorrect: false, misconceptionId: `${TOPOS}:MC-1` },
      { text: 'Yes, since exponentials follow automatically once finite limits exist', isCorrect: false, misconceptionId: `${TOPOS}:MC-1` },
    ],
    targetedMisconceptions: [`${TOPOS}:MC-1`],
    source: eb(TOPOS, 'Assessment gate — all three topos conditions are independently required'),
  },
  {
    conceptId: TOPOS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is Ω={0,1} in Set simply a conventional choice of "the truth values," with no deeper universal property connecting it to subsets?',
    choices: [
      { text: 'No — Ω is defined by, and only by, the universal bijective subset-classifying correspondence it must satisfy (every subset gives a unique characteristic function and vice versa)', isCorrect: true },
      { text: 'Yes — {0,1} is chosen purely by convention from logic', isCorrect: false, misconceptionId: `${TOPOS}:MC-2` },
      { text: 'Yes, since any two-element set would work identically with no further property required', isCorrect: false, misconceptionId: `${TOPOS}:MC-2` },
    ],
    targetedMisconceptions: [`${TOPOS}:MC-2`],
    source: eb(TOPOS, 'Misconception register — the subobject classifier is defined by its universal property, never an arbitrary choice'),
  },
  {
    conceptId: TOPOS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does every topos, being "set-like," automatically satisfy the classical law of excluded middle internally?',
    choices: [
      { text: 'No — a topos\'s internal logic is generally intuitionistic; in sheaf toposes, excluded middle can genuinely fail internally', isCorrect: true },
      { text: 'Yes — "set-like" guarantees classical logic in every topos', isCorrect: false, misconceptionId: `${TOPOS}:MC-3` },
      { text: 'Yes, since Ω always behaves exactly like the two-element Boolean set', isCorrect: false, misconceptionId: `${TOPOS}:MC-3` },
    ],
    targetedMisconceptions: [`${TOPOS}:MC-3`],
    source: eb(TOPOS, 'Transfer probe — a topos\'s internal logic is generally intuitionistic, never automatically classical'),
  },

  // --- math.cat.higher-category --------------------------------------------------
  {
    conceptId: HIGHERCAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a 2-category\'s hom-category structure an unrelated new invention, distinct from the functor category [C,D] already studied?',
    choices: [
      { text: 'No — Cat(C,D) (functors with natural transformations between them) IS EXACTLY [C,D], the already-mastered functor category, reused one level up', isCorrect: true },
      { text: 'Yes — 2-categories introduce a wholly separate hom-structure unrelated to functor categories', isCorrect: false, misconceptionId: `${HIGHERCAT}:MC-1` },
      { text: 'Yes, since functor categories only apply to ordinary categories, not 2-categories', isCorrect: false, misconceptionId: `${HIGHERCAT}:MC-1` },
    ],
    targetedMisconceptions: [`${HIGHERCAT}:MC-1`],
    source: eb(HIGHERCAT, 'Assessment gate — a 2-category\'s hom-categories are literally [C,D]'),
  },
  {
    conceptId: HIGHERCAT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Must composition in an ∞-category still be strictly associative, exactly like an ordinary category?',
    choices: [
      { text: 'No — the two composites need only be connected by a homotopy witness (a coherent path between them), replacing the strict on-the-nose equation', isCorrect: true },
      { text: 'Yes — strict associativity is required in every kind of category, including ∞-categories', isCorrect: false, misconceptionId: `${HIGHERCAT}:MC-2` },
      { text: 'Yes, since "category" always implies the ordinary strict axioms with no relaxation', isCorrect: false, misconceptionId: `${HIGHERCAT}:MC-2` },
    ],
    targetedMisconceptions: [`${HIGHERCAT}:MC-2`],
    source: eb(HIGHERCAT, 'Misconception register — ∞-category composition is associative up to homotopy, never strictly'),
  },
  {
    conceptId: HIGHERCAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is HoTT\'s "proofs are paths" idea merely a suggestive metaphor with no formal mathematical content?',
    choices: [
      { text: 'No — a proof of a=b is literally a path H:[0,1]→A with H(0)=a, H(1)=b, using the exact same homotopy machinery, and two proofs can be genuinely non-homotopic', isCorrect: true },
      { text: 'Yes — it is a poetic way of describing equality with no checkable formal structure', isCorrect: false, misconceptionId: `${HIGHERCAT}:MC-3` },
      { text: 'Yes, since all proofs of the same equality must be identical, making "paths" just a figure of speech', isCorrect: false, misconceptionId: `${HIGHERCAT}:MC-3` },
    ],
    targetedMisconceptions: [`${HIGHERCAT}:MC-3`],
    source: eb(HIGHERCAT, 'Transfer probe — HoTT\'s proofs-as-paths is a genuine, formal correspondence, never a metaphor'),
  },
]

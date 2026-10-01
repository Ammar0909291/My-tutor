/**
 * Third math.cat asset batch — functor-category and limits.
 *
 * Continues serving-asset coverage for math.cat (4/15 -> 6/15). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.functor-category.md and
 * math.cat.limits.md.
 *
 *   FUNCATG   functor-category — functors as objects, natural
 *             transformations as morphisms, pointwise composition and
 *             pointwise axiom inheritance.
 *   LIMITS    limits — limit-preservation is a genuine extra property;
 *             universality needs a UNIQUE factoring map; discrete
 *             diagrams are one shape among many.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FUNCATG = 'math.cat.functor-category'
const LIMITS = 'math.cat.limits'

export const MATHEMATICS_CATEGORY_STRUCTURE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FUNCATG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'In the functor category [C,D], functors F,G:C→D are OBJECTS on equal footing, and a '
      + 'natural transformation η:F⇒G is the SINGLE MORPHISM connecting object F to object G — '
      + 'never the reverse. G itself is not a "morphism" from F to G; G is an object, exactly '
      + 'like F.\n\n'
      + 'Composition is built POINTWISE, one component at a time. For C={X,Y} with θ:F⇒G, '
      + 'η:G⇒H: the composite η∘θ:F⇒H has two components, each built individually: '
      + '(η∘θ)_X = η_X∘θ_X and, separately, (η∘θ)_Y = η_Y∘θ_Y — ordinary compositions of '
      + "morphisms IN D. There is no single, whole-transformation operation that bypasses this "
      + 'component-by-component construction.\n\n'
      + "[C,D]'s category axioms are INHERITED pointwise, never assumed automatic from naming. "
      + 'Checking θ∘id_F = θ reduces, at each component X, to θ_X∘id_F(X) = θ_X in D — simply '
      + "D's own identity law, applied pointwise. Associativity works the same way, both sides "
      + 'reducing to η_X∘θ_X∘ψ_X at each component. This "categories built from functors and '
      + 'natural transformations" level-shift is exactly what makes higher category theory '
      + 'possible.',
    targetedMisconceptions: [`${FUNCATG}:MC-1`, `${FUNCATG}:MC-2`, `${FUNCATG}:MC-3`],
    source: eb(FUNCATG, 'Core Understanding — functors are objects and natural transformations are morphisms, composition is pointwise, axioms are inherited pointwise'),
  },
  {
    conceptId: LIMITS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A limit is the universal cone over a diagram: an object L with maps into every diagram '
      + 'object, such that any other cone factors through L via a UNIQUE map — existence of some '
      + 'factoring map is never enough; universality specifically demands uniqueness. For '
      + 'L = A×B in Set, any other cone (C,π\'_A,π\'_B) has the unique factoring map '
      + 'u(c) = (π\'_A(c),π\'_B(c)) — any other candidate would have to agree with u on every '
      + 'coordinate.\n\n'
      + 'Discrete diagrams (giving products) are only ONE diagram shape among many. For '
      + 'f(x)=x^2, g(x)=2x+3 on R: the equalizer E={x:f(x)=g(x)}={-1,3} is the limit of the '
      + 'genuinely NON-DISCRETE two-parallel-arrows diagram R⇉R — the same universal-cone '
      + 'definition, applied to a different diagram shape, produces equalizers, pullbacks, and '
      + 'pushouts, never just products.\n\n'
      + 'And limit-preservation is a genuinely SEPARATE, non-automatic property of a functor: '
      + 'the forgetful functor U:Top→Set DOES preserve products (a genuinely provable fact), but '
      + 'the connected-components functor π0:Top→Set generally does NOT preserve products in the '
      + 'analogous sense. Being a functor is never enough to guarantee limit-preservation — it '
      + 'must be checked or proven for each specific functor.',
    targetedMisconceptions: [`${LIMITS}:MC-1`, `${LIMITS}:MC-2`, `${LIMITS}:MC-3`],
    source: eb(LIMITS, 'Core Understanding — universality needs a unique factoring map, discrete diagrams are one shape among many, limit-preservation is a separate property'),
  },
]

export const MATHEMATICS_CATEGORY_STRUCTURE_PROBES: SeedProbe[] = [
  // --- math.cat.functor-category ----------------------------------------------
  {
    conceptId: FUNCATG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the functor category [C,D], for functors F,G and η:F⇒G, which of F, G, η is the morphism?',
    choices: [
      { text: 'η — F and G are both objects, and η is the single morphism connecting them', isCorrect: true },
      { text: 'G — since it is the "target" functor', isCorrect: false, misconceptionId: `${FUNCATG}:MC-1` },
      { text: 'Both F and G are morphisms, and η is the object', isCorrect: false, misconceptionId: `${FUNCATG}:MC-1` },
    ],
    targetedMisconceptions: [`${FUNCATG}:MC-1`],
    source: eb(FUNCATG, 'Assessment gate — functors are objects, natural transformations are morphisms'),
  },
  {
    conceptId: FUNCATG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For θ:F⇒G and η:G⇒H, is the composite η∘θ computed as one single operation on the two whole transformations?',
    choices: [
      { text: 'No — it is built pointwise, one component at a time: (η∘θ)_X = η_X∘θ_X at each object X', isCorrect: true },
      { text: 'Yes — it is a single indivisible operation on θ and η as wholes', isCorrect: false, misconceptionId: `${FUNCATG}:MC-2` },
      { text: 'Yes, since natural transformations compose exactly like ordinary functions', isCorrect: false, misconceptionId: `${FUNCATG}:MC-2` },
    ],
    targetedMisconceptions: [`${FUNCATG}:MC-2`],
    source: eb(FUNCATG, 'Misconception register — composition is built pointwise, never a whole-transformation operation'),
  },
  {
    conceptId: FUNCATG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does naming functors as objects and natural transformations as morphisms automatically make [C,D] a genuine category?',
    choices: [
      { text: 'No — the axioms must be verified, reducing pointwise to D\'s own already-established identity and associativity laws', isCorrect: true },
      { text: 'Yes — naming the objects and morphisms is sufficient', isCorrect: false, misconceptionId: `${FUNCATG}:MC-3` },
      { text: 'Yes, as long as C and D are both finite', isCorrect: false, misconceptionId: `${FUNCATG}:MC-3` },
    ],
    targetedMisconceptions: [`${FUNCATG}:MC-3`],
    source: eb(FUNCATG, 'Transfer probe — the category axioms are verified pointwise, never assumed automatic'),
  },

  // --- math.cat.limits ----------------------------------------------------
  {
    conceptId: LIMITS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does every functor between categories automatically preserve limits?',
    choices: [
      { text: 'No — limit-preservation is a genuinely separate property that must be checked or proven for each specific functor', isCorrect: true },
      { text: 'Yes — being a functor already means "structure-preserving," which covers limits automatically', isCorrect: false, misconceptionId: `${LIMITS}:MC-1` },
      { text: 'Yes, as long as the functor is covariant', isCorrect: false, misconceptionId: `${LIMITS}:MC-1` },
    ],
    targetedMisconceptions: [`${LIMITS}:MC-1`],
    source: eb(LIMITS, 'Assessment gate — limit-preservation is a genuine, non-automatic property'),
  },
  {
    conceptId: LIMITS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You found SOME map from an arbitrary cone to a candidate limit object. Is that enough to certify the candidate is a genuine limit?',
    choices: [
      { text: 'No — universality requires the factoring map to be UNIQUE, not merely to exist', isCorrect: true },
      { text: 'Yes — existence of a factoring map is exactly what universality means', isCorrect: false, misconceptionId: `${LIMITS}:MC-2` },
      { text: 'Yes, as long as the map is a homomorphism', isCorrect: false, misconceptionId: `${LIMITS}:MC-2` },
    ],
    targetedMisconceptions: [`${LIMITS}:MC-2`],
    source: eb(LIMITS, 'Misconception register — universality needs a unique factoring map, never merely some map'),
  },
  {
    conceptId: LIMITS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The equalizer of f(x)=x^2 and g(x)=2x+3 is the limit of a diagram with two parallel arrows R⇉R. Does this mean equalizers are not "real" limits, since only products (discrete diagrams) are?',
    choices: [
      { text: 'No — the same universal-cone definition applies to any diagram shape; discrete diagrams giving products are just one shape among many', isCorrect: true },
      { text: 'Yes — only discrete-diagram limits (products) count as genuine limits', isCorrect: false, misconceptionId: `${LIMITS}:MC-3` },
      { text: 'Yes, equalizers are a separate, unrelated categorical construction', isCorrect: false, misconceptionId: `${LIMITS}:MC-3` },
    ],
    targetedMisconceptions: [`${LIMITS}:MC-3`],
    source: eb(LIMITS, 'Transfer probe — discrete diagrams are one shape among many, never the only diagram shape'),
  },
]

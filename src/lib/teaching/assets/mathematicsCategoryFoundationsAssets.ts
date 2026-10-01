/**
 * First math.cat asset batch — category and morphism-types.
 *
 * Opens serving-asset coverage for math.cat (0/15 before this batch, all
 * expert/research-tier, cross-cutting foundational structures). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.category.md and
 * math.cat.morphism-types.md.
 *
 *   CATEGORY   category — the four ingredients, and that each named
 *              category chooses its own structure-preservation rule
 *              rather than inheriting Set's anything-goes one.
 *   MORPHISM   morphism-types — mono/epi as element-free cancellation
 *              properties, and why "mono=injective" is a Set-specific
 *              theorem, never a universal definition.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CAT = 'math.cat.category'
const MORPH = 'math.cat.morphism-types'

export const MATHEMATICS_CATEGORY_FOUNDATIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A category has four ingredients: objects, morphisms Hom(A,B) between them, a composition '
      + 'rule, and an identity morphism at each object. Set, Grp, Top and Vect_k are all '
      + 'instances of this one pattern — but each makes its OWN choice about what a morphism must '
      + 'preserve.\n\n'
      + 'In Set, any function between two sets counts — no extra requirement. In Grp, a morphism '
      + 'must be a group homomorphism: phi(n) = n mod 6 from Z to Z/6Z qualifies, but '
      + 'psi(n) = n^2 mod 6 does not, since psi(1+1) = psi(2) = 4 while psi(1)+psi(1) = 2. Being a '
      + "category doesn't specify the preservation rule — Grp requires homomorphism, Top requires "
      + "continuity, Vect_k requires linearity — and it must be checked directly, never assumed to "
      + "inherit Set's permissive rule.\n\n"
      + 'Associativity, h∘(g∘f) = (h∘g)∘f, is about REGROUPING the same left-to-right sequence f '
      + 'then g then h — never about reordering which morphism comes first (that would be '
      + 'commutativity, a completely different and generally false question, since domains and '
      + "codomains typically don't even match in reverse order). And every object gets its OWN "
      + 'identity morphism: 1_A and 1_B are generally different morphisms (different domains and '
      + 'codomains), even though both play the analogous "do nothing" role.',
    targetedMisconceptions: [`${CAT}:MC-1`, `${CAT}:MC-2`, `${CAT}:MC-3`],
    source: eb(CAT, 'Core Understanding — per-category structure-preservation, associativity vs. commutativity, per-object identity'),
  },
  {
    conceptId: MORPH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A monomorphism f:A→B is LEFT-CANCELLABLE (f∘g = f∘h implies g = h, for all g,h:C→A); an '
      + 'epimorphism is RIGHT-CANCELLABLE. Neither definition mentions elements of A or B at all — '
      + 'they are stated purely via composition, making them meaningful in ANY category, even one '
      + 'with no underlying sets.\n\n'
      + '"Mono = injective" in Set is a THEOREM, not a definition: if f is mono but not injective, '
      + 'f(a1)=f(a2) for a1≠a2 — defining g,h:{*}→A by g(*)=a1, h(*)=a2 gives f∘g=f∘h but g≠h, '
      + "contradicting mono. This proof genuinely uses Set's own structure (functions out of a "
      + 'one-point set correspond exactly to elements) — the coincidence is a fact DERIVED about '
      + 'Set specifically, not part of the general categorical definition.\n\n'
      + "Mono and epi together do NOT always give an isomorphism: in the category of rings, Z↪Q "
      + 'is both mono (injective) and epi (any two ring maps out of Q agreeing on Z agree '
      + 'everywhere, since every rational is a ratio of integers) — yet it has no inverse ring '
      + 'homomorphism Q→Z, since sending 1/2 anywhere consistent would force a rational inverse of '
      + '2 inside Z. Whether mono+epi implies isomorphism is a CATEGORY-BY-CATEGORY fact: true in '
      + 'Set and in groups, false in rings.',
    targetedMisconceptions: [`${MORPH}:MC-1`, `${MORPH}:MC-2`, `${MORPH}:MC-3`],
    source: eb(MORPH, 'Core Understanding — element-free cancellation, mono=injective as a Set theorem, mono+epi does not universally give iso'),
  },
]

export const MATHEMATICS_CATEGORY_FOUNDATIONS_PROBES: SeedProbe[] = [
  // --- math.cat.category --------------------------------------------------
  {
    conceptId: CAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In Grp, does every function between two groups\' underlying sets automatically count as a morphism?',
    choices: [
      { text: 'No — it must be a group homomorphism, preserving the group operation', isCorrect: true },
      { text: 'Yes — any function qualifies, exactly as in Set', isCorrect: false, misconceptionId: `${CAT}:MC-1` },
      { text: 'Yes, as long as it is continuous', isCorrect: false },
    ],
    targetedMisconceptions: [`${CAT}:MC-1`],
    source: eb(CAT, 'Assessment gate — each category has its own structure-preservation requirement'),
  },
  {
    conceptId: CAT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f:A→B, g:B→C, h:C→D, does the associativity axiom h∘(g∘f) = (h∘g)∘f say anything about whether f∘g equals g∘f?',
    choices: [
      { text: 'No — associativity only regroups the same f-then-g-then-h sequence; reordering is a separate (and generally false) question', isCorrect: true },
      { text: 'Yes — associativity means composition can be freely reordered', isCorrect: false, misconceptionId: `${CAT}:MC-2` },
      { text: 'Yes — it proves f∘g = g∘f in every category', isCorrect: false, misconceptionId: `${CAT}:MC-2` },
    ],
    targetedMisconceptions: [`${CAT}:MC-2`],
    source: eb(CAT, 'Misconception register — associativity is regrouping, never reordering'),
  },
  {
    conceptId: CAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For distinct objects A and B in a category, are the identity morphisms 1_A and 1_B the same morphism?',
    choices: [
      { text: 'No — each object has its own distinct identity morphism, generally different from another object\'s', isCorrect: true },
      { text: 'Yes — there is one universal identity morphism shared by every object', isCorrect: false, misconceptionId: `${CAT}:MC-3` },
      { text: 'Only when A and B are isomorphic', isCorrect: false, misconceptionId: `${CAT}:MC-3` },
    ],
    targetedMisconceptions: [`${CAT}:MC-3`],
    source: eb(CAT, 'Transfer probe — identity is a per-object structure'),
  },

  // --- math.cat.morphism-types ---------------------------------------------
  {
    conceptId: MORPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How is a monomorphism f:A→B defined?',
    choices: [
      { text: 'Left-cancellable: f∘g = f∘h implies g = h, for all g,h:C→A — stated purely via composition, no elements', isCorrect: true },
      { text: 'As a function that is injective on elements, by definition, in any category', isCorrect: false, misconceptionId: `${MORPH}:MC-1` },
      { text: 'As any morphism with an inverse', isCorrect: false },
    ],
    targetedMisconceptions: [`${MORPH}:MC-1`],
    source: eb(MORPH, 'Assessment gate — mono is defined by cancellation, element-free'),
  },
  {
    conceptId: MORPH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "monomorphism = injective" true by definition in every category, or is it something that must be proven?',
    choices: [
      { text: 'It is a theorem specific to Set (proved using Set\'s one-point sets), not part of the general categorical definition', isCorrect: true },
      { text: 'It is true by definition in every category', isCorrect: false, misconceptionId: `${MORPH}:MC-1` },
      { text: 'It is never true in any category', isCorrect: false },
    ],
    targetedMisconceptions: [`${MORPH}:MC-1`],
    source: eb(MORPH, 'Misconception register — mono=injective is a Set-specific proven fact'),
  },
  {
    conceptId: MORPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The inclusion Z↪Q (as rings) is both mono and epi. Does this make it an isomorphism?',
    choices: [
      { text: 'No — it has no inverse ring homomorphism Q→Z, showing mono+epi does not universally imply isomorphism', isCorrect: true },
      { text: 'Yes — mono and epi together always give an isomorphism', isCorrect: false, misconceptionId: `${MORPH}:MC-2` },
      { text: 'Yes, because Z and Q have the same cardinality-like structure', isCorrect: false, misconceptionId: `${MORPH}:MC-2` },
    ],
    targetedMisconceptions: [`${MORPH}:MC-2`],
    source: eb(MORPH, 'Transfer probe — mono+epi is category-dependent, not a universal law'),
  },
]

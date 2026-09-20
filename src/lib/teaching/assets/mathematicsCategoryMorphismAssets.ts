/**
 * Second math.cat asset batch — functor and natural-transformation.
 *
 * Continues serving-asset coverage for math.cat (2/15 -> 4/15). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.functor.md and
 * math.cat.natural-transformation.md.
 *
 *   FUNCTOR   functor — covariant vs. contravariant composition order,
 *             and why forgetful-then-free is never a round trip.
 *   NATTRANS  natural-transformation — why a per-object family must
 *             pass the naturality square for EVERY morphism, never
 *             assumed automatic.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FUNCTOR = 'math.cat.functor'
const NATTRANS = 'math.cat.natural-transformation'

export const MATHEMATICS_CATEGORY_MORPHISM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FUNCTOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A functor F:C→D maps objects and morphisms together, satisfying F(g∘f) = F(g)∘F(f) and '
      + 'F(1_A) = 1_F(A). Covariant functors preserve composition order; contravariant functors '
      + 'reverse BOTH the arrow direction AND the composition order TOGETHER — never one without '
      + 'the other.\n\n'
      + 'The dual-space functor sends T:V→W to T*:W*→V* (arrow reversed), with T*(φ) = φ∘T. For '
      + 'S:U→V, T:V→W: (T∘S)* = S*∘T* — the composite\'s dual reverses the ORDER, exactly the '
      + 'contravariant law, never T*∘S* as a naive covariant guess would give. Contrast the '
      + 'covariant forgetful functor U:Grp→Set, where U(g∘f) = U(g)∘U(f) preserves order — the '
      + 'two reversals in a contravariant functor always come together.\n\n'
      + 'Forgetful-then-free does NOT recover the original object: U discards a group\'s specific '
      + 'relations (keeping only the underlying set), and the free functor F builds the freest '
      + 'possible group on that bare set, with no way to know what relations were discarded. '
      + 'F(U(G)) is generally NOT isomorphic to G. And a functor is only GUARANTEED to preserve '
      + 'composition and identity — whether it preserves other properties (like sending an '
      + 'injective morphism to an injective one) is never automatic and requires separate proof.',
    targetedMisconceptions: [`${FUNCTOR}:MC-1`, `${FUNCTOR}:MC-2`, `${FUNCTOR}:MC-3`],
    source: eb(FUNCTOR, 'Core Understanding — contravariant reverses both arrow and order, forgetful-then-free is not a round trip, only composition/identity are guaranteed'),
  },
  {
    conceptId: NATTRANS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A natural transformation η:F⇒G assigns each object X a component morphism η_X:F(X)→G(X), '
      + 'satisfying naturality: η_Y∘F(f) = G(f)∘η_X for EVERY morphism f:X→Y — never just some '
      + 'sample morphisms.\n\n'
      + 'An arbitrary per-object family is NOT automatically natural. On Vect_k, the uniform '
      + 'formula η_V(v)(φ) = φ(v) (identity to double-dual) makes the naturality square commute '
      + 'for every linear map. Contrast a basis-dependent family θ_V:V→V* (matching basis vectors '
      + 'to dual basis vectors, an arbitrary choice per object): a perfectly well-defined family, '
      + 'but checking the square for a specific f:V→W generally FAILS, since nothing forces the '
      + 'basis choices to be compatible with f\'s action. A valid per-object family is never '
      + 'automatically natural — the square must genuinely be verified.\n\n'
      + 'Naturality is stated with a UNIVERSAL quantifier — for ALL f, never for SOME f. A family '
      + 'could pass the square for a few special morphisms while genuinely failing for others, so '
      + 'checking only a handful, however many, never suffices. And tracing the square carefully: '
      + 'from F(X), going RIGHT to F(Y) then DOWN to G(Y) gives η_Y∘F(f); going DOWN to G(X) then '
      + 'RIGHT to G(Y) gives G(f)∘η_X — both land at G(Y) and must agree, but writing '
      + 'F(f)∘η_Y instead mismatches which functor\'s image composes with which component.',
    targetedMisconceptions: [`${NATTRANS}:MC-1`, `${NATTRANS}:MC-2`, `${NATTRANS}:MC-3`],
    source: eb(NATTRANS, 'Core Understanding — arbitrary families are not automatically natural, naturality is a for-ALL claim, the square\'s two paths must be traced correctly'),
  },
]

export const MATHEMATICS_CATEGORY_MORPHISM_PROBES: SeedProbe[] = [
  // --- math.cat.functor -----------------------------------------------------
  {
    conceptId: FUNCTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a contravariant functor and S:U→V, T:V→W, what is (T∘S)* equal to?',
    choices: [
      { text: 'S*∘T* — the dual reverses the composition order, matching the reversed arrow direction', isCorrect: true },
      { text: 'T*∘S* — the order is preserved, exactly as for a covariant functor', isCorrect: false, misconceptionId: `${FUNCTOR}:MC-1` },
      { text: '(S∘T)*, since composition itself is commutative', isCorrect: false },
    ],
    targetedMisconceptions: [`${FUNCTOR}:MC-1`],
    source: eb(FUNCTOR, 'Assessment gate — contravariant functors reverse arrow direction and composition order together'),
  },
  {
    conceptId: FUNCTOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a group G, does applying the forgetful functor U then the free functor F recover G — i.e. is F(U(G)) isomorphic to G?',
    choices: [
      { text: 'No — U discards G\'s specific relations, and F has no way to know they were ever there, generally producing a bigger, freer group', isCorrect: true },
      { text: 'Yes — forgetful and free are inverse operations', isCorrect: false, misconceptionId: `${FUNCTOR}:MC-2` },
      { text: 'Yes, as long as G is finite', isCorrect: false, misconceptionId: `${FUNCTOR}:MC-2` },
    ],
    targetedMisconceptions: [`${FUNCTOR}:MC-2`],
    source: eb(FUNCTOR, 'Misconception register — forgetful-then-free is never an inverse round trip'),
  },
  {
    conceptId: FUNCTOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A functor F is known to satisfy F(g∘f) = F(g)∘F(f) and F(1_A) = 1_F(A). Does this alone guarantee F sends every injective morphism to an injective morphism?',
    choices: [
      { text: 'No — the functor definition only guarantees composition and identity are preserved; other properties need separate proof', isCorrect: true },
      { text: 'Yes — being structure-preserving automatically covers injectivity too', isCorrect: false, misconceptionId: `${FUNCTOR}:MC-3` },
      { text: 'Yes, for covariant functors specifically', isCorrect: false, misconceptionId: `${FUNCTOR}:MC-3` },
    ],
    targetedMisconceptions: [`${FUNCTOR}:MC-3`],
    source: eb(FUNCTOR, 'Transfer probe — only composition and identity are guaranteed by the functor laws'),
  },

  // --- math.cat.natural-transformation ---------------------------------------
  {
    conceptId: NATTRANS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You have a well-defined family of isomorphisms θ_V:V→V*, one per vector space, built by picking a basis at each V. Is this automatically a natural transformation?',
    choices: [
      { text: 'No — it must be checked against the naturality square, and a basis-dependent choice generally fails it', isCorrect: true },
      { text: 'Yes — every object having a valid morphism is enough', isCorrect: false, misconceptionId: `${NATTRANS}:MC-1` },
      { text: 'Yes, since isomorphisms are always natural', isCorrect: false, misconceptionId: `${NATTRANS}:MC-1` },
    ],
    targetedMisconceptions: [`${NATTRANS}:MC-1`],
    source: eb(NATTRANS, 'Assessment gate — a per-object family is not automatically natural'),
  },
  {
    conceptId: NATTRANS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You have verified the naturality square for five specific morphisms and it commutes every time. Have you proven η is a natural transformation?',
    choices: [
      { text: 'No — naturality is a for-ALL claim; a family can pass several sample morphisms yet fail on others', isCorrect: true },
      { text: 'Yes — five checks is more than enough evidence', isCorrect: false, misconceptionId: `${NATTRANS}:MC-2` },
      { text: 'Yes, since the square commuting once implies it always commutes', isCorrect: false, misconceptionId: `${NATTRANS}:MC-2` },
    ],
    targetedMisconceptions: [`${NATTRANS}:MC-2`],
    source: eb(NATTRANS, 'Misconception register — naturality must hold for every morphism, never just samples'),
  },
  {
    conceptId: NATTRANS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the naturality square for η:F⇒G and f:X→Y, going RIGHT then DOWN from F(X) gives which composite?',
    choices: [
      { text: 'η_Y∘F(f) — apply F(f) first (right), then η_Y (down)', isCorrect: true },
      { text: 'F(f)∘η_Y — the order is reversed from what "right then down" traces', isCorrect: false, misconceptionId: `${NATTRANS}:MC-3` },
      { text: 'G(f)∘η_X — this is actually the down-then-right path', isCorrect: false, misconceptionId: `${NATTRANS}:MC-3` },
    ],
    targetedMisconceptions: [`${NATTRANS}:MC-3`],
    source: eb(NATTRANS, 'Transfer probe — tracing the naturality square correctly, right-then-down vs. down-then-right'),
  },
]

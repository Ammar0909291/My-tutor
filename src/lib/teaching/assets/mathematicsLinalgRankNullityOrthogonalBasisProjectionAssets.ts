/**
 * Batch: rank-nullity, orthogonal-basis, projection (math.linalg).
 *
 * Continuing math.linalg (38/61 -> 41/61). Fresh frontier recompute found
 * 14 ready concepts. rank-nullity is a long-pending convergence finally
 * ready this batch — its four prerequisites (rank, null-space,
 * column-space, dimension) were authored across Batches 111, 112, and
 * 114. Also selected orthogonal-basis (highest unlock value: opens
 * gram-schmidt and projection) and projection itself (already
 * independently ready via orthogonality+inner-product; unlocks
 * least-squares).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{rank-nullity,orthogonal-basis,projection}.md.
 *
 *   RANK-NULLITY  rank(T)+nullity(T)=dim(V), where dim(V) is ALWAYS the
 *           DOMAIN's dimension — for a matrix, the COLUMN count, never
 *           the row count; injectivity requires EXACT equality
 *           rank(T)=dim(V), never merely "high" or "close to full" rank
 *           — even one short of full rank forces a nonzero nullity and
 *           breaks injectivity completely.
 *   ORTHOGONAL-BASIS  orthogonal (mutually zero dot products) and
 *           orthonormal (orthogonal AND unit length) are DISTINCT —
 *           orthonormal is strictly stronger, never conflated; the
 *           coordinate shortcut cᵢ=⟨v,eᵢ⟩ works ONLY because
 *           orthogonality kills cross terms and unit length simplifies
 *           the rest — it FAILS SILENTLY, with no error or warning, on a
 *           non-orthonormal basis; mutually orthogonal vectors are
 *           automatically independent, but still need exactly n vectors
 *           to span an n-dimensional space.
 *   PROJECTION  projW(v) is characterized ENTIRELY by its residual
 *           v−projW(v) being ORTHOGONAL to every vector in W — the
 *           defining property, not an incidental check; the
 *           single-vector formula proju(v)=(v·u/u·u)u lands along u's
 *           direction, NEVER v's — the final multiplication must always
 *           use u; the sum-of-projections formula requires an ORTHOGONAL
 *           basis, never valid for a general, non-orthogonal spanning
 *           set.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RANK_NULLITY = 'math.linalg.rank-nullity'
const ORTHOGONAL_BASIS = 'math.linalg.orthogonal-basis'
const PROJECTION = 'math.linalg.projection'

export const MATHEMATICS_LINALG_RANK_NULLITY_ORTHOGONAL_BASIS_PROJECTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RANK_NULLITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'dim(V) IS ALWAYS THE DOMAIN — COLUMNS FOR A MATRIX, NEVER ROWS: for a 3×5 matrix A (3 rows, '
      + '5 columns) with rank(A)=2: dim(V)=n=5 (the number of COLUMNS, since V=ℝ⁵ is the domain), '
      + 'giving nullity(A)=5−2=3. Using the row count (3) instead produces 3−2=1 — WRONG, because '
      + 'dim(V) always refers to the DOMAIN’s dimension (columns for a matrix acting as '
      + 'A:ℝⁿ→ℝᵐ), NEVER the codomain’s row count.\n\n'
      + 'INJECTIVITY NEEDS RANK TO EXACTLY EQUAL dim(V) — ONE SHORT STILL BREAKS IT: for a 4×4 '
      + 'matrix A with rank(A)=4 (full rank): dim(V)=4, giving nullity(A)=4−4=0 — so ker(A)={0}, '
      + 'and A IS injective. But if rank(A)=3 for the SAME 4×4 matrix: nullity(A)=4−3=1≠0 — A is '
      + 'NOT injective, despite rank 3 being "mostly full." Checking only whether rank is "large" '
      + 'or "reasonably high" without the EXACT comparison to dim(V) misses that even ONE LESS than '
      + 'full rank forces a nonzero nullity, and hence a nontrivial kernel, breaking injectivity '
      + 'entirely.',
    targetedMisconceptions: [`${RANK_NULLITY}:MC-1`, `${RANK_NULLITY}:MC-2`],
    source: eb(RANK_NULLITY, 'Core Understanding — dim(V) always referring to the domain’s (column) dimension for a matrix, and injectivity requiring exact rank-to-dim(V) equality rather than merely a high or close-to-full rank'),
  },
  {
    conceptId: ORTHOGONAL_BASIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ORTHONORMAL IS ORTHOGONAL PLUS UNIT LENGTH — ALWAYS CHECK BOTH SEPARATELY: for v₁=(3,4), '
      + 'v₂=(4,-3) in ℝ²: v₁·v₂=12−12=0 — an ORTHOGONAL basis. But ‖v₁‖=5≠1 — NOT orthonormal. '
      + 'Normalizing (e₁=(3/5,4/5), e₂=(4/5,-3/5), both unit length) converts it to a genuine '
      + 'orthonormal basis WITHOUT changing any directions or the mutual-orthogonality '
      + 'relationships. Treating "orthogonal" and "orthonormal" as synonymous misses that '
      + 'orthonormal ADDITIONALLY requires unit length — a genuinely separate check.\n\n'
      + 'THE SHORTCUT GIVES COORDINATES FOR FREE — BUT ONLY IN A GENUINELY ORTHONORMAL BASIS: '
      + 'taking the inner product of v=Σcᵢvᵢ with eⱼ: ⟨v,eⱼ⟩=Σᵢcᵢ⟨eᵢ,eⱼ⟩. Since ⟨eᵢ,eⱼ⟩=0 for i≠j '
      + '(orthogonality) AND ⟨eⱼ,eⱼ⟩=1 (unit length), EVERY term vanishes except i=j, leaving '
      + '⟨v,eⱼ⟩=cⱼ DIRECTLY — no system-solving required.\n\n'
      + 'THE SHORTCUT ISN’T A UNIVERSAL BASIS TRICK — IT SILENTLY GIVES A WRONG ANSWER IF THE '
      + 'BASIS ISN’T ACTUALLY ORTHONORMAL: for the NON-orthogonal basis u₁=(1,0), u₂=(1,1): '
      + 'applying the shortcut anyway to v=(1,7) gives ⟨v,u₁⟩=1, ⟨v,u₂⟩=8 — but '
      + '1·u₁+8·u₂=(9,8)≠(1,7) — the WRONG answer, silently produced without any error. The '
      + 'shortcut’s validity depends ENTIRELY on the cross terms vanishing, which only happens '
      + 'for a truly orthonormal basis. Orthogonality also gives independence for free, but you '
      + 'still need enough vectors to span — n mutually orthogonal vectors don’t automatically '
      + 'form a basis unless their count matches the space’s dimension.',
    targetedMisconceptions: [`${ORTHOGONAL_BASIS}:MC-1`, `${ORTHOGONAL_BASIS}:MC-2`, `${ORTHOGONAL_BASIS}:MC-3`],
    source: eb(ORTHOGONAL_BASIS, 'Core Understanding — orthogonal and orthonormal as distinct conditions, the coordinate shortcut cᵢ=⟨v,eᵢ⟩ working only because orthogonality and unit length together cancel cross terms, and the shortcut failing silently on a non-orthonormal basis'),
  },
  {
    conceptId: PROJECTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE RESIDUAL IS ALWAYS ORTHOGONAL TO THE SUBSPACE — THAT’S THE WHOLE DEFINITION: for '
      + 'W=span((1,0,0)) and v=(3,4,5): projW(v)=(3,0,0). The residual v−projW(v)=(0,4,5) — '
      + 'checking (0,4,5)·(1,0,0)=0, confirming the residual is orthogonal to every vector in W. '
      + 'This orthogonality is not an incidental property to verify afterward — it IS the defining '
      + 'characterization of "closest point," and any correctly computed projection must satisfy '
      + 'it.\n\n'
      + 'THE PROJECTION LANDS WHERE u IS, NEVER WHERE v IS: proju(v)=(v·u/u·u)u for u=(1,1), '
      + 'v=(4,0): (4/2)(1,1)=(2,2) — a scalar multiple of u, lying ON the line through u. '
      + 'Mistakenly multiplying the scalar by v instead gives (4/2)(4,0)=(8,0) — a point along v’s '
      + 'OWN direction, which CANNOT be correct since the projection must land IN W=span(u). The '
      + 'scalar v·u/u·u tells you HOW FAR along u to go — the final multiplication must always use '
      + 'u, never v.\n\n'
      + 'SUMMING PROJECTIONS ONLY WORKS FOR ORTHOGONAL DIRECTIONS — NEVER JUST ANY SPANNING SET: for '
      + 'W=span(e₁,e₂) with e₁=(1,0,0), e₂=(0,1,0) (orthonormal) and v=(3,4,5): '
      + 'projW(v)=⟨v,e₁⟩e₁+⟨v,e₂⟩e₂=(3,4,0). This sum works BECAUSE e₁,e₂ are mutually orthogonal; '
      + 'using a NON-orthogonal spanning set for the SAME plane and naively summing individual '
      + 'projections would NOT give the correct joint projection — the individual projections would '
      + '"interfere," since non-orthogonal directions aren’t independent in the sense the sum '
      + 'formula requires.',
    targetedMisconceptions: [`${PROJECTION}:MC-1`, `${PROJECTION}:MC-2`, `${PROJECTION}:MC-3`],
    source: eb(PROJECTION, 'Core Understanding — the projection defined by its residual being orthogonal to the subspace, the single-vector formula landing along u rather than v, and the sum-of-projections formula requiring an orthogonal basis'),
  },
]

export const MATHEMATICS_LINALG_RANK_NULLITY_ORTHOGONAL_BASIS_PROJECTION_PROBES: SeedProbe[] = [
  {
    conceptId: RANK_NULLITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a 3×5 matrix A (3 rows, 5 columns) with rank(A)=2, what is dim(V) in the Rank-Nullity theorem, and what is the nullity?',
    choices: [
      { text: 'dim(V)=5 (the number of COLUMNS, since V=ℝ⁵ is the domain), giving nullity(A)=5−2=3; dim(V) always refers to the domain, never the codomain’s row count', isCorrect: true },
      { text: 'dim(V)=3 (the number of rows), giving nullity(A)=3−2=1, since V should be identified with however many rows the matrix has', isCorrect: false, misconceptionId: `${RANK_NULLITY}:MC-1` },
      { text: "dim(V) could be taken as either the row count or column count interchangeably, since both describe the matrix's overall size equally well", isCorrect: false, misconceptionId: `${RANK_NULLITY}:MC-1` },
    ],
    targetedMisconceptions: [`${RANK_NULLITY}:MC-1`],
    source: eb(RANK_NULLITY, 'Demonstration 1 — the 3×5 matrix’s nullity computation, contrasting the correct column-based dim(V)=5 against the incorrect row-based 3, directly breaking DIM-V-COMPUTED-FROM-ROWS-INSTEAD-OF-COLUMNS'),
  },
  {
    conceptId: RANK_NULLITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 4×4 matrix A has rank(A)=3 — "mostly full" rank. Does this guarantee A is injective?',
    choices: [
      { text: 'No — injectivity requires EXACT equality rank(A)=dim(V)=4; with rank(A)=3, nullity(A)=4−3=1≠0, so a nontrivial kernel exists and A is NOT injective, despite the rank being "mostly full"', isCorrect: true },
      { text: 'Yes — a rank of 3 out of 4 is high enough to be considered "close to full rank," which is sufficient to guarantee injectivity', isCorrect: false, misconceptionId: `${RANK_NULLITY}:MC-2` },
      { text: "Yes, because injectivity is a matter of degree, and a matrix with mostly full rank is mostly injective in practice", isCorrect: false, misconceptionId: `${RANK_NULLITY}:MC-2` },
    ],
    targetedMisconceptions: [`${RANK_NULLITY}:MC-2`],
    source: eb(RANK_NULLITY, 'Demonstration 2 — the 4×4 matrix’s rank-4-vs-rank-3 side-by-side comparison, showing exact equality alone yields injectivity, directly breaking INJECTIVITY-CHECKED-VIA-HIGH-RANK-RATHER-THAN-EXACT-EQUALITY'),
  },
  {
    conceptId: RANK_NULLITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A data-encoding scheme is modeled as a 6×10 matrix A (6 outputs, 10 inputs) with rank(A)=10. Is this encoding scheme reversible (injective)?',
    choices: [
      { text: 'Yes — dim(V)=10 (the domain’s dimension, the number of columns/inputs), and rank(A)=10 exactly equals dim(V), giving nullity(A)=0, so ker(A)={0} and the encoding is injective (reversible)', isCorrect: true },
      { text: "No — since A has only 6 rows, dim(V) should be taken as 6, and rank(A)=10 exceeding that is an impossible or invalid situation for the theorem", isCorrect: false, misconceptionId: `${RANK_NULLITY}:MC-1` },
      { text: 'It cannot be determined from rank alone without also knowing the exact row count relative to the column count', isCorrect: false, misconceptionId: `${RANK_NULLITY}:MC-1` },
    ],
    targetedMisconceptions: [`${RANK_NULLITY}:MC-1`],
    source: eb(RANK_NULLITY, 'Assessment Signals Rung 3 — determining a data-encoding scheme’s reversibility via the exact rank-to-dim(V) comparison using the domain’s (column) dimension, directly breaking DIM-V-COMPUTED-FROM-ROWS-INSTEAD-OF-COLUMNS'),
  },
  {
    conceptId: ORTHOGONAL_BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'v₁=(3,4) and v₂=(4,-3) satisfy v₁·v₂=0. Is {v₁,v₂} an orthonormal basis?',
    choices: [
      { text: 'No — it is orthogonal (v₁·v₂=0) but NOT orthonormal, since ‖v₁‖=5≠1; orthonormal additionally requires unit length, a genuinely separate check from orthogonality alone', isCorrect: true },
      { text: 'Yes — "orthogonal" and "orthonormal" mean the same thing, so any mutually perpendicular set of vectors automatically qualifies as orthonormal', isCorrect: false, misconceptionId: `${ORTHOGONAL_BASIS}:MC-2` },
      { text: "Yes, because once vectors are confirmed mutually orthogonal, their lengths are automatically guaranteed to be 1", isCorrect: false, misconceptionId: `${ORTHOGONAL_BASIS}:MC-2` },
    ],
    targetedMisconceptions: [`${ORTHOGONAL_BASIS}:MC-2`],
    source: eb(ORTHOGONAL_BASIS, 'Demonstration 1 — the orthogonal-but-not-orthonormal verification and normalization for v₁=(3,4), v₂=(4,-3), directly breaking ORTHOGONAL-CONFLATED-WITH-ORTHONORMAL'),
  },
  {
    conceptId: ORTHOGONAL_BASIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the non-orthogonal basis u₁=(1,0), u₂=(1,1) and v=(1,7), applying the shortcut cᵢ=⟨v,uᵢ⟩ gives c₁=1, c₂=8. Does 1·u₁+8·u₂ reconstruct v?',
    choices: [
      { text: 'No — 1·u₁+8·u₂=(9,8)≠(1,7); the shortcut cᵢ=⟨v,eᵢ⟩ depends ENTIRELY on orthonormality to cancel cross terms, and silently gives a wrong answer with no error when applied to a non-orthonormal basis', isCorrect: true },
      { text: "Yes — the formula cᵢ=⟨v,eᵢ⟩ works for finding coordinates in any basis, orthonormal or not, so the reconstruction should always succeed", isCorrect: false, misconceptionId: `${ORTHOGONAL_BASIS}:MC-1` },
      { text: 'Yes, because the inner product automatically adjusts for any basis structure, guaranteeing a correct reconstruction regardless of orthogonality', isCorrect: false, misconceptionId: `${ORTHOGONAL_BASIS}:MC-1` },
    ],
    targetedMisconceptions: [`${ORTHOGONAL_BASIS}:MC-1`],
    source: eb(ORTHOGONAL_BASIS, 'Demonstration 3 — the shortcut applied to the non-orthogonal basis {(1,0),(1,1)}, producing a demonstrably wrong reconstruction (9,8)≠(1,7), directly breaking ONB-COORDINATE-SHORTCUT-OVERGENERALIZED'),
  },
  {
    conceptId: ORTHOGONAL_BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You find 3 mutually orthogonal nonzero vectors in ℝ⁴. Do they automatically form a basis for ℝ⁴?',
    choices: [
      { text: 'No — orthogonality guarantees independence for free, but a basis for the 4-dimensional space ℝ⁴ requires exactly 4 vectors; 3 orthogonal vectors span only a 3-dimensional subspace, not all of ℝ⁴', isCorrect: true },
      { text: 'Yes — any set of mutually orthogonal nonzero vectors automatically forms a basis for the full space, regardless of how many vectors are in the set', isCorrect: false, misconceptionId: `${ORTHOGONAL_BASIS}:MC-3` },
      { text: 'Yes, because orthogonality guarantees both independence and spanning simultaneously for any nonzero vector count', isCorrect: false, misconceptionId: `${ORTHOGONAL_BASIS}:MC-3` },
    ],
    targetedMisconceptions: [`${ORTHOGONAL_BASIS}:MC-3`],
    source: eb(ORTHOGONAL_BASIS, 'Teaching Sequence discovery question 3 and Tutor Actions — requiring the vector count to match the space’s dimension before declaring a basis, directly breaking ORTHOGONAL-VECTORS-ASSUMED-AUTOMATICALLY-SPANNING'),
  },
  {
    conceptId: PROJECTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For W=span((1,0,0)) and v=(3,4,5), projW(v)=(3,0,0). What property must the residual v−projW(v)=(0,4,5) satisfy for this to be a valid projection?',
    choices: [
      { text: 'The residual must be ORTHOGONAL to every vector in W — checking (0,4,5)·(1,0,0)=0 confirms this; orthogonality of the residual IS the defining characterization of "closest point," not an incidental property to check afterward', isCorrect: true },
      { text: "The residual doesn't need to satisfy any particular property, since projection is defined purely by the formula's output regardless of the leftover vector", isCorrect: false, misconceptionId: `${PROJECTION}:MC-3` },
      { text: 'The residual should have the same magnitude as the projection itself for the computation to be considered valid', isCorrect: false, misconceptionId: `${PROJECTION}:MC-3` },
    ],
    targetedMisconceptions: [`${PROJECTION}:MC-3`],
    source: eb(PROJECTION, 'Demonstration 1 — the direct residual-orthogonality verification for W=span((1,0,0)), v=(3,4,5), directly breaking RESIDUAL-ORTHOGONALITY-CHECK-SKIPPED'),
  },
  {
    conceptId: PROJECTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Computing proju(v)=(v·u/u·u)u for u=(1,1), v=(4,0): the scalar v·u/u·u=4/2=2. Should the final answer be 2u=(2,2) or 2v=(8,0)?',
    choices: [
      { text: '2u=(2,2) — the projection must land IN W=span(u), so the final multiplication always uses u; 2v=(8,0) is not even a multiple of u=(1,1) and cannot be the correct projection', isCorrect: true },
      { text: '2v=(8,0) — since v is the vector being projected, the scalar should be applied to v to produce the final projected result', isCorrect: false, misconceptionId: `${PROJECTION}:MC-1` },
      { text: "Either 2u or 2v is an equally valid answer, since both represent a scaled version of one of the two vectors involved in the formula", isCorrect: false, misconceptionId: `${PROJECTION}:MC-1` },
    ],
    targetedMisconceptions: [`${PROJECTION}:MC-1`],
    source: eb(PROJECTION, 'Demonstration 2 — the correct-versus-incorrect final-multiplication contrast for u=(1,1), v=(4,0), showing 2v=(8,0) is not even a multiple of u, directly breaking PROJECTION-FORMULA-FINAL-MULTIPLICATION-MISAPPLIED'),
  },
  {
    conceptId: PROJECTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To project v=(3,4,5) onto the xy-plane W using a NON-orthogonal spanning set like (1,0,0) and (1,1,0), can the sum-of-individual-projections formula still be used directly?',
    choices: [
      { text: 'No — the sum-of-projections formula requires an ORTHOGONAL basis to work correctly; using a non-orthogonal spanning set for the same plane and naively summing individual projections would NOT give the correct joint projection, since the directions "interfere"', isCorrect: true },
      { text: 'Yes — the sum-of-individual-projections shortcut works for any spanning set of the subspace, orthogonal or not, since it always reconstructs the joint projection correctly', isCorrect: false, misconceptionId: `${PROJECTION}:MC-2` },
      { text: "Yes, because summing projections onto individual spanning vectors is mathematically equivalent regardless of whether those vectors are orthogonal to each other", isCorrect: false, misconceptionId: `${PROJECTION}:MC-2` },
    ],
    targetedMisconceptions: [`${PROJECTION}:MC-2`],
    source: eb(PROJECTION, 'Demonstration 3 — the orthonormal-basis sum-projection computation for the xy-plane, contrasted with the caveat about non-orthogonal spanning sets, directly breaking SUM-OF-PROJECTIONS-FORMULA-OVERGENERALIZED-TO-NON-ORTHOGONAL-BASES'),
  },
]

/**
 * Batch: dual-space, tensor, matrix-addition (math.linalg).
 *
 * Continuing math.linalg (56/61 -> 59/61). Fresh frontier recompute found
 * all 5 remaining concepts simultaneously ready. Selected dual-space and
 * tensor (both require only vector-space + linear-map, closing that
 * convergence outright — dual-space also directly unlocks tensor) plus
 * matrix-addition (its own independent single-prerequisite concept,
 * requiring only matrix). Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.linalg.{dual-
 * space,tensor,matrix-addition}.md.
 *
 *   DUAL-SPACE  V*=Hom(V,F) requires ONLY linearity, never geometric
 *           structure like an inner product or norm; the dual basis PROVES
 *           dim(V*)=dim(V) by explicit construction, never assumed, and
 *           lives in a genuinely different space from V itself; the
 *           algebraic and analytic duals COINCIDE in finite dimensions but
 *           genuinely DIVERGE in infinite ones, never assumed identical.
 *   TENSOR  vectors, covectors, and matrices are SPECIAL CASES of one
 *           multilinear-map framework of type (r,s), never three separate
 *           kinds of objects; the tensor product must be VERIFIED
 *           genuinely multilinear, never treated as merely a symbolic
 *           pairing; tensors have real physics applications and a vast
 *           categorical generalization, never an obscure abstraction.
 *   MATRIX-ADDITION  adding matrices of the SAME dimensions combines
 *           CORRESPONDING entries; the operation is UNDEFINED for
 *           mismatched dimensions, never a partial or forced computation;
 *           fixed-size matrices under addition satisfy every VECTOR SPACE
 *           axiom. matrix-addition.md lists only 2 misconceptions (MC-1,
 *           MC-2) — a 3rd PROFICIENT probe below re-targets MC-2 with a
 *           fresh worked example, following this campaign's established
 *           2-misconception fallback.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DUAL_SPACE = 'math.linalg.dual-space'
const TENSOR = 'math.linalg.tensor'
const MATRIX_ADDITION = 'math.linalg.matrix-addition'

export const MATHEMATICS_LINALG_DUAL_SPACE_TENSOR_MATRIX_ADDITION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DUAL_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'V* REQUIRES ONLY LINEARITY — NEVER GEOMETRIC STRUCTURE: on V=ℝ³: f(x,y,z)=2x−3y+z is '
      + 'verified linear via the SAME additivity and homogeneity checks already used for ordinary '
      + 'linear maps — NO norm, inner product, or geometric structure of any kind was invoked. A '
      + 'linear functional is simply a linear map whose codomain happens to be F itself; '
      + 'V*=Hom(V,F) is a vector space under pointwise addition and scalar multiplication of '
      + 'functionals — nothing beyond math.linalg.linear-map’s own linearity check is needed.\n\n'
      + 'THE DUAL BASIS PROVES dim(V*)=dim(V) BY EXPLICIT CONSTRUCTION — NEVER ASSUMED: for V=ℝ³ '
      + 'with standard basis e₁,e₂,e₃: the coordinate functionals f¹(x,y,z)=x, f²(x,y,z)=y, '
      + 'f³(x,y,z)=z satisfy fⁱ(eⱼ)=δᵢⱼ exactly. Any functional f(x,y,z)=ax+by+cz equals '
      + 'af¹+bf²+cf³ (SPANNING), and evaluating a combination at e₁,e₂,e₃ forces all coefficients '
      + 'to zero when the combination is the zero functional (INDEPENDENCE). Since V* has a basis '
      + 'of exactly n elements, dim(V*)=n=dim(V) — a GENUINE, CONSTRUCTED equality, never merely '
      + 'asserted. Critically, fⁱ (a FUNCTION living in V*) is NOT the same object as eᵢ (a VECTOR '
      + 'living in V) — they’re related ONLY by the δᵢⱼ pairing condition, never identified with '
      + 'each other.\n\n'
      + 'ALGEBRAIC AND ANALYTIC DUALS COINCIDE IN FINITE DIMENSIONS, DIVERGE IN INFINITE ONES — '
      + 'NEVER ALWAYS THE SAME: in finite dimensions (e.g. V=ℝ³), EVERY linear functional is '
      + 'automatically bounded/continuous — the algebraic dual V*=Hom(V,F) and the analytic dual '
      + '(bounded functionals on a normed space) are LITERALLY the same space here. But for V=the '
      + 'space of finite-support real sequences: the algebraic dual Hom(V,ℝ) is DRAMATICALLY '
      + 'LARGER than the span of coordinate functionals — since every v∈V has finitely many '
      + 'nonzero coordinates, ANY assignment of values (even wildly unbounded ones) to '
      + 'f¹(e₁),f²(e₂),… defines a VALID linear functional. Requiring BOUNDEDNESS excludes most of '
      + 'these — boundedness is a FREE, automatic condition in finite dimensions but a genuinely '
      + 'RESTRICTIVE extra requirement in infinite ones.',
    targetedMisconceptions: [`${DUAL_SPACE}:MC-1`, `${DUAL_SPACE}:MC-2`, `${DUAL_SPACE}:MC-3`],
    source: eb(DUAL_SPACE, 'Core Understanding — V* requiring only linearity never geometric structure, the dual basis proving dim(V*)=dim(V) by explicit construction while living in a genuinely different space, and the algebraic and analytic duals coinciding in finite dimensions but diverging in infinite ones'),
  },
  {
    conceptId: TENSOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'VECTORS, COVECTORS, AND MATRICES ARE SPECIAL CASES OF ONE MULTILINEAR-MAP FRAMEWORK — NEVER '
      + 'THREE SEPARATE KINDS OF OBJECTS: a vector v∈V, viewed as the functional v(f)=f(v) on V*, '
      + 'is genuinely linear in f — a type (1,0) tensor. A covector f∈V* is the linear map v↦f(v) '
      + '— type (0,1). A matrix A (representing a linear map V→V) is the bilinear map A(f,v)=f(Av) '
      + '— linear in f AND v separately — type (1,1). Treating vectors, covectors, and matrices as '
      + 'three fundamentally different kinds of mathematical objects that merely happen to share '
      + 'some algebraic similarities is WRONG — they are three SPECIAL CASES of one unifying '
      + 'multilinear-map framework, distinguished only by their type (r,s).\n\n'
      + 'THE TENSOR PRODUCT MUST BE VERIFIED GENUINELY MULTILINEAR — NEVER TREATED AS MERELY A '
      + 'SYMBOLIC PAIRING: given vectors u,v∈V, u⊗v is defined by (u⊗v)(f,g)=f(u)g(v) for f,g∈V*. '
      + 'Checking linearity in the first slot: (u⊗v)(af₁+bf₂,g)=(af₁+bf₂)(u)·g(v)='
      + 'a[f₁(u)g(v)]+b[f₂(u)g(v)]=a(u⊗v)(f₁,g)+b(u⊗v)(f₂,g) — genuinely linear. Believing u⊗v is '
      + 'merely a formal, symbolic pairing of u and v with no independent multilinear-map meaning '
      + 'is WRONG — it must be, and here IS, directly verified as a genuine type (2,0) tensor via '
      + 'its defining formula, never merely asserted from notation.\n\n'
      + 'TENSORS HAVE REAL PHYSICS APPLICATIONS AND A VAST CATEGORICAL GENERALIZATION — NEVER AN '
      + 'OBSCURE, INSIGNIFICANT ABSTRACTION: the metric tensor g in general relativity is a type '
      + '(0,2) tensor, giving spacetime’s inner-product structure at each point — a genuine, '
      + 'load-bearing application of this exact multilinear-map framework, never a toy example. '
      + 'Separately, math.cat.tensor-product extends ⊗ from vector spaces to entire categories, '
      + 'where it becomes part of the structure of a "monoidal category." Assuming tensors are an '
      + 'obscure abstraction with no real physical or further-mathematical significance is WRONG — '
      + 'they are the working language of general relativity and generalize far beyond vector '
      + 'spaces.',
    targetedMisconceptions: [`${TENSOR}:MC-1`, `${TENSOR}:MC-2`, `${TENSOR}:MC-3`],
    source: eb(TENSOR, 'Core Understanding — vectors, covectors, and matrices as special cases of one multilinear-map framework of type (r,s), the tensor product verified genuinely multilinear via its defining formula, and tensors’ real physics applications and vast categorical generalization'),
  },
  {
    conceptId: MATRIX_ADDITION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'MATRIX ADDITION COMBINES TWO MATRICES OF THE SAME DIMENSIONS BY ADDING CORRESPONDING '
      + 'ENTRIES: if A and B are both m×n, then (A+B)ᵢⱼ=Aᵢⱼ+Bᵢⱼ for every position (i,j) — reusing '
      + 'math.linalg.matrix’s own indexed grid structure directly, this is the exact '
      + 'two-dimensional analog of math.linalg.vector-addition’s component-wise rule. The '
      + 'operation is UNDEFINED for matrices of different dimensions — there is no meaningful way '
      + 'to line up entries that don’t correspond position-for-position, exactly as '
      + 'math.linalg.vector-addition treats a dimension mismatch as a genuine type error rather '
      + 'than an incomplete answer.\n\n'
      + 'MATRICES OF A FIXED SIZE, UNDER ADDITION (AND SCALAR MULTIPLICATION), SATISFY EVERY '
      + 'VECTOR SPACE AXIOM: associativity, commutativity, a zero matrix as additive identity, '
      + 'additive inverses, and distributivity. This means matrices genuinely ARE vectors in the '
      + 'more general sense: the same underlying algebraic structure math.linalg.vector-addition '
      + 'established for ordered tuples applies identically here, just with entries arranged in a '
      + 'rectangular grid rather than a single row or column.',
    targetedMisconceptions: [`${MATRIX_ADDITION}:MC-1`, `${MATRIX_ADDITION}:MC-2`],
    source: eb(MATRIX_ADDITION, 'Core Understanding — matrix addition combining same-dimension matrices by adding corresponding entries while being undefined for mismatched dimensions, and fixed-size matrices under addition satisfying every vector space axiom'),
  },
]

export const MATHEMATICS_LINALG_DUAL_SPACE_TENSOR_MATRIX_ADDITION_PROBES: SeedProbe[] = [
  {
    conceptId: DUAL_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To verify f(x,y,z)=2x−3y+z is a valid element of V*=Hom(V,F) for V=ℝ³, what must be checked?',
    choices: [
      { text: 'Only additivity and homogeneity (linearity) — the SAME checks already used for ordinary linear maps; no norm, inner product, or geometric structure of any kind is needed', isCorrect: true },
      { text: 'That f is defined using an inner product or norm on V, since a dual space functional requires geometric structure to be meaningful', isCorrect: false, misconceptionId: `${DUAL_SPACE}:MC-1` },
      { text: "That f preserves distances between vectors, since the dual space is fundamentally a geometric construction", isCorrect: false, misconceptionId: `${DUAL_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${DUAL_SPACE}:MC-1`],
    source: eb(DUAL_SPACE, 'Demonstration 1 — the linearity-only verification of f(x,y,z)=2x−3y+z on ℝ³, directly breaking DUAL-SPACE-REQUIRES-GEOMETRIC-STRUCTURE'),
  },
  {
    conceptId: DUAL_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the dual basis functional f¹ satisfying f¹(e_j)=δ_1j, is f¹ essentially the same object as the basis vector e₁, just in different notation?',
    choices: [
      { text: 'No — f¹ is a FUNCTION living in V*, while e₁ is a VECTOR living in V; they are related ONLY by the δᵢⱼ pairing condition, never identified with each other', isCorrect: true },
      { text: 'Yes — the matching index and the δᵢⱼ pairing condition mean f¹ and e₁ are fundamentally the same object, just written with different notation', isCorrect: false, misconceptionId: `${DUAL_SPACE}:MC-2` },
      { text: "Yes, since both f¹ and e₁ occupy the same position in their respective ordered lists, making them interchangeable", isCorrect: false, misconceptionId: `${DUAL_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${DUAL_SPACE}:MC-2`],
    source: eb(DUAL_SPACE, 'Demonstration 2 — the explicit dual basis construction for ℝ³, verifying spanning and independence while distinguishing the function fⁱ from the vector eᵢ, directly breaking DUAL-BASIS-CONFLATED-WITH-ORIGINAL-BASIS'),
  },
  {
    conceptId: DUAL_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For V=the space of finite-support real sequences, does the algebraic dual Hom(V,ℝ) coincide with the analytic dual (bounded functionals only), the same way they coincide for V=ℝ³?',
    choices: [
      { text: 'No — the algebraic dual is DRAMATICALLY LARGER here, since any assignment of values (even unbounded ones) to f¹(e₁),f²(e₂),… defines a valid linear functional; boundedness is a restrictive extra requirement only in infinite dimensions, never a free condition like in ℝ³', isCorrect: true },
      { text: 'Yes — the algebraic and analytic duals always coincide for any vector space, regardless of its dimension being finite or infinite', isCorrect: false, misconceptionId: `${DUAL_SPACE}:MC-3` },
      { text: "Yes, since boundedness is automatically satisfied by every linear functional regardless of the underlying space's dimension", isCorrect: false, misconceptionId: `${DUAL_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${DUAL_SPACE}:MC-3`],
    source: eb(DUAL_SPACE, 'Demonstration 3 — the finite-support sequence space example, showing the algebraic dual is dramatically larger than the bounded-functionals-only analytic dual, directly breaking ALGEBRAIC-AND-ANALYTIC-DUAL-ASSUMED-IDENTICAL'),
  },
  {
    conceptId: TENSOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are a vector v∈V, a covector f∈V*, and a matrix A (representing a linear map V→V) three fundamentally different kinds of mathematical objects?',
    choices: [
      { text: 'No — they are special cases of one unifying multilinear-map framework: v is type (1,0), f is type (0,1), and A is type (1,1), distinguished only by their type (r,s)', isCorrect: true },
      { text: 'Yes — vectors, covectors, and matrices are three separate kinds of objects that merely happen to share some algebraic similarities', isCorrect: false, misconceptionId: `${TENSOR}:MC-1` },
      { text: "Yes, since each is defined using entirely different notation and computational rules with no unifying structure", isCorrect: false, misconceptionId: `${TENSOR}:MC-1` },
    ],
    targetedMisconceptions: [`${TENSOR}:MC-1`],
    source: eb(TENSOR, 'Demonstration 1 — the vector/covector/matrix three-way unification as tensors of types (1,0), (0,1), (1,1), directly breaking VECTORS-COVECTORS-MATRICES-TREATED-AS-SEPARATE'),
  },
  {
    conceptId: TENSOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given u,v∈V with u⊗v defined by (u⊗v)(f,g)=f(u)g(v), is u⊗v merely a formal symbolic pairing of u and v, or does it have independent meaning that can be verified?',
    choices: [
      { text: 'It has independent, verifiable meaning — checking (u⊗v)(af₁+bf₂,g)=a(u⊗v)(f₁,g)+b(u⊗v)(f₂,g) directly confirms u⊗v is genuinely linear in its first slot, a real multilinear map, never merely a symbolic pairing', isCorrect: true },
      { text: 'It is merely a formal, symbolic pairing of u and v with no independent multilinear-map meaning beyond the notation itself', isCorrect: false, misconceptionId: `${TENSOR}:MC-2` },
      { text: "It is simply a shorthand for writing u and v next to each other, with its multilinearity assumed rather than verifiable", isCorrect: false, misconceptionId: `${TENSOR}:MC-2` },
    ],
    targetedMisconceptions: [`${TENSOR}:MC-2`],
    source: eb(TENSOR, 'Demonstration 2 — the u⊗v first-slot linearity verification via its defining formula, directly breaking TENSOR-PRODUCT-TREATED-AS-MERELY-SYMBOLIC'),
  },
  {
    conceptId: TENSOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are tensors an obscure mathematical abstraction with no real physical or further-mathematical significance?',
    choices: [
      { text: 'No — the metric tensor g in general relativity is a type (0,2) tensor giving spacetime’s inner-product structure, a genuine load-bearing application; tensors also generalize into the categorical framework of monoidal categories', isCorrect: true },
      { text: 'Yes — tensors are a purely theoretical construction confined to abstract algebra courses, with no meaningful physics application or further generalization', isCorrect: false, misconceptionId: `${TENSOR}:MC-3` },
      { text: "Yes, since the metric tensor in general relativity is only a loose, informal analogy rather than the same mathematical structure developed here", isCorrect: false, misconceptionId: `${TENSOR}:MC-3` },
    ],
    targetedMisconceptions: [`${TENSOR}:MC-3`],
    source: eb(TENSOR, 'Demonstration 3 — the metric-tensor physics application paired with the categorical-generalization preview, directly breaking TENSORS-ASSUMED-INSIGNIFICANT'),
  },
  {
    conceptId: MATRIX_ADDITION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can a 2×3 matrix be added to a 3×2 matrix?',
    choices: [
      { text: 'No — matrix addition is UNDEFINED for matrices of different dimensions; there is no valid position-by-position correspondence between a 2×3 shape and a 3×2 shape', isCorrect: true },
      { text: 'Yes — the entries can be paired up in some arbitrary but workable order, even though the two matrices have different dimensions', isCorrect: false, misconceptionId: `${MATRIX_ADDITION}:MC-1` },
      { text: "Yes, by treating the 3×2 matrix as if it were transposed to 2×3 first, then adding entry by entry", isCorrect: false, misconceptionId: `${MATRIX_ADDITION}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX_ADDITION}:MC-1`],
    source: eb(MATRIX_ADDITION, 'Demonstration 1 — attempting to add a 2×3 matrix to a 3×2 matrix and showing there is no valid position-by-position correspondence, directly breaking MISMATCHED-DIMENSION-MATRICES-ADDED-VIA-ARBITRARY-PAIRING'),
  },
  {
    conceptId: MATRIX_ADDITION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[1,2],[3,4]] and B=[[5,6],[7,8]], what is A+B?',
    choices: [
      { text: '[[6,8],[10,12]] — each entry (i,j) of the sum comes from entry (i,j) of BOTH A and B, matched by EXACT row-column position, never by transposing or otherwise misaligning either grid', isCorrect: true },
      { text: '[[6,9],[9,12]] — pairing entries as if one matrix’s rows were matched against the other’s columns (an implicit transpose) before adding', isCorrect: false, misconceptionId: `${MATRIX_ADDITION}:MC-2` },
      { text: "[[6,10],[8,12]] — swapping the off-diagonal entries of B before pairing positions with A", isCorrect: false, misconceptionId: `${MATRIX_ADDITION}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX_ADDITION}:MC-2`],
    source: eb(MATRIX_ADDITION, 'Demonstration 2 — using a physical grid overlay to add [[1,2],[3,4]]+[[5,6],[7,8]]=[[6,8],[10,12]], confirming each entry’s position matches exactly, directly breaking MATRIX-ADDITION-ENTRY-POSITIONS-MISALIGNED'),
  },
  {
    conceptId: MATRIX_ADDITION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a different pair C=[[2,0],[1,3]] and D=[[4,5],[6,7]], what is C+D?',
    choices: [
      { text: '[[6,5],[7,10]] — each entry (i,j) of the sum comes from entry (i,j) of BOTH C and D by exact position, never from a transposed or otherwise misaligned reading of either grid', isCorrect: true },
      { text: '[[6,1],[5,10]] — pairing C’s rows against D’s columns (an implicit transpose of one matrix) before adding entry by entry', isCorrect: false, misconceptionId: `${MATRIX_ADDITION}:MC-2` },
      { text: "[[9,7],[3,8]] — adding D's entries in reverse row order against C's original row order", isCorrect: false, misconceptionId: `${MATRIX_ADDITION}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX_ADDITION}:MC-2`],
    source: eb(MATRIX_ADDITION, 'Assessment Signals Rung 1/2 — a fresh position-alignment worked example (C=[[2,0],[1,3]], D=[[4,5],[6,7]]) distinct from Demonstration 2’s matrices, directly breaking MATRIX-ADDITION-ENTRY-POSITIONS-MISALIGNED a second, independent way since matrix-addition.md registers only two misconceptions'),
  },
]

/**
 * Batch: linear-map, subspace, inner-product (math.linalg).
 *
 * Continuing math.linalg (23/61 -> 26/61). Fresh frontier recompute found
 * 9 ready concepts. Selected the three concepts building directly on
 * vector-space (authored Batch 109) with the highest combined downstream
 * value: linear-map (unlocks kernel-image, matrix-representation),
 * subspace (unlocks null-space, column-space), and inner-product (unlocks
 * inner-product-space) — together opening 5 further concepts.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{linear-map,subspace,inner-product}.md.
 *
 *   LINEAR-MAP  T:V→W is linear only when BOTH additivity T(u+v)=T(u)+T(v)
 *           and homogeneity T(cv)=cT(v) are VERIFIED DIRECTLY — never
 *           assumed from resemblance to prior examples; T(0)=0 necessarily
 *           follows, disqualifying translation despite its resemblance to
 *           rotation/reflection/dilation; a linear map is COMPLETELY
 *           determined by its action on a basis, with no remaining freedom
 *           to independently specify T elsewhere; homogeneity checked only
 *           at c=1 or c=0 proves nothing — a genuinely distinguishing
 *           scalar is required.
 *   SUBSPACE  the 3-condition test (0∈W, closed under addition, closed
 *           under scalar multiplication) is what determines subspace
 *           membership — the ZERO CHECK must come FIRST, since it is the
 *           cheapest, most decisive test and disqualifies most
 *           non-subspaces (shifted/affine sets) instantly; a nonzero
 *           constant anywhere in a defining equation (non-homogeneous)
 *           ALWAYS kills the zero check, while the zero check alone is
 *           NECESSARY but not SUFFICIENT — non-linear conditions can pass
 *           it yet still fail closure.
 *   INNER-PRODUCT  the dot product is ONE EXAMPLE satisfying symmetry,
 *           bilinearity, and positive-definiteness — never the definition
 *           itself; the axioms apply equally to abstract spaces with no
 *           numeric components at all (function-space integrals); POSITIVE-
 *           DEFINITENESS must be checked EXPLICITLY and separately, since a
 *           symmetric bilinear form can still go negative somewhere and
 *           fail; the complex case requires CONJUGATE symmetry, not plain
 *           symmetry, specifically so ⟨v,v⟩ comes out real.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LINEAR_MAP = 'math.linalg.linear-map'
const SUBSPACE = 'math.linalg.subspace'
const INNER_PRODUCT = 'math.linalg.inner-product'

export const MATHEMATICS_LINALG_LINEAR_MAP_SUBSPACE_INNER_PRODUCT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LINEAR_MAP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BOTH PROPERTIES VERIFIED DIRECTLY — NEVER ASSUMED FROM RESEMBLANCE: a function T:V→W is '
      + 'LINEAR exactly when T(u+v)=T(u)+T(v) (additivity) and T(cv)=cT(v) (homogeneity) hold for '
      + 'ALL u,v∈V and ALL scalars c. A necessary consequence follows immediately: '
      + 'T(0)=T(0·v)=0·T(v)=0 — any map sending the origin elsewhere cannot be linear. This '
      + 'disqualifies translation, S(x,y)=(x+1,y): S(0,0)=(1,0)≠(0,0), so despite resembling '
      + 'rotation, reflection, and dilation (all centered at the origin and genuinely linear), '
      + 'translation is NEVER a linear map — resemblance to already-known linear examples is not a '
      + 'valid test.\n\n'
      + 'BASIS IMAGES DECIDE EVERYTHING ELSE — NO ROOM LEFT TO CHOOSE FREELY: if e₁,…,eₙ is a basis '
      + 'for V, every v∈V writes uniquely as v=c₁e₁+⋯+cₙeₙ, so by linearity '
      + 'T(v)=c₁T(e₁)+⋯+cₙT(eₙ). Once T(e₁),…,T(eₙ) are known, T(v) is FORCED for every v∈V — there '
      + 'is no remaining freedom to independently specify T at any other point; any claimed extra '
      + 'rule inconsistent with the basis-forced value cannot describe a genuine linear map.\n\n'
      + 'TEST HOMOGENEITY WITH A SCALAR THAT COULD ACTUALLY FAIL IT: checking T(cv)=cT(v) only at '
      + 'c=1 (trivially true for every function) or c=0 proves nothing about the general property — '
      + 'a genuinely distinguishing scalar, such as c=−2, is required to expose whether homogeneity '
      + 'actually holds. For finite-dimensional V,W with chosen bases, T is represented by the '
      + 'matrix A whose j-th column is T(eⱼ)’s coordinate vector; computing T(v) via basis '
      + 'decomposition and computing Av directly are literally the same arithmetic, differently '
      + 'notated.',
    targetedMisconceptions: [`${LINEAR_MAP}:MC-1`, `${LINEAR_MAP}:MC-2`, `${LINEAR_MAP}:MC-3`],
    source: eb(LINEAR_MAP, 'Core Understanding — additivity and homogeneity verified directly rather than assumed from resemblance, a linear map completely determined by its basis images, and homogeneity requiring a genuinely distinguishing scalar to test'),
  },
  {
    conceptId: SUBSPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ZERO CHECK FIRST, EVERY TIME — IT’S THE CHEAPEST, MOST DECISIVE TEST: a SUBSPACE W of a '
      + 'vector space V over field F is a subset that is ITSELF a vector space under the inherited '
      + 'operations. The 3-CONDITION TEST determines membership: (1) 0∈W; (2) u,v∈W⟹u+v∈W (closed '
      + 'under addition); (3) u∈W, k∈F⟹k·u∈W (closed under scalar multiplication). The remaining '
      + 'vector-space axioms come free — they are identities holding for ALL vectors of V and '
      + 'cannot fail on a subset — so only CLOSURE and the ZERO VECTOR genuinely need checking, '
      + 'with the zero check performed FIRST since it disqualifies most non-subspaces (shifted, '
      + 'affine sets) instantly: a line like y=2x+1 looks closed-under-addition-friendly, but (0,0) '
      + 'fails 0=2(0)+1, disqualifying it without needing to test closure at all.\n\n'
      + 'HOMOGENEOUS (=0) IS A CANDIDATE; NON-HOMOGENEOUS (=c≠0) IS NEVER A SUBSPACE: solution sets '
      + 'of HOMOGENEOUS linear systems (Ax=0) are ALWAYS subspaces. A NONZERO CONSTANT anywhere in '
      + 'the defining equation kills the zero check ({(x,y,z):x+y+z=1} fails at the origin).\n\n'
      + 'OPERATION-PROOF — NOTHING YOU ADD OR SCALE CAN ESCAPE A GENUINE SUBSPACE: the zero check '
      + 'alone is NECESSARY, not SUFFICIENT. NON-LINEAR conditions can pass it yet fail closure — '
      + '{(x,y):y=x²} contains 0 but (1,1)+(2,4)=(3,5), and 5≠9. Every subspace of ℝⁿ is flat, '
      + 'unbounded, and through the origin: discs, quadrants, shifted lines, and curves are all '
      + 'excluded by the three conditions.',
    targetedMisconceptions: [`${SUBSPACE}:MC-1`, `${SUBSPACE}:MC-2`, `${SUBSPACE}:MC-3`],
    source: eb(SUBSPACE, 'Core Understanding — the 3-condition subspace test with the zero check performed first, the homogeneous-vs-non-homogeneous distinction that decides subspace-hood, and the zero check being necessary but not sufficient on its own'),
  },
  {
    conceptId: INNER_PRODUCT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE DOT PRODUCT IS ONE MEMBER OF THE FAMILY, NOT THE WHOLE FAMILY: a (real) inner product on '
      + 'a vector space V is a function ⟨·,·⟩:V×V→ℝ satisfying symmetry (⟨u,v⟩=⟨v,u⟩), bilinearity '
      + '(linear in each argument), and positive-definiteness (⟨v,v⟩≥0, equality iff v=0). '
      + 'math.linalg.dot-product’s own Σuᵢvᵢ satisfies all three and is the MOTIVATING special '
      + 'case — but the axiomatic definition applies equally to spaces with no literal numeric '
      + 'components at all: on continuous functions, ⟨f,g⟩=∫₀¹f(x)g(x)dx satisfies all three, a '
      + 'genuine inner product where "dot product" has no direct meaning at all. Every inner '
      + 'product induces a norm ‖v‖=√⟨v,v⟩, well-defined precisely because positive-definiteness '
      + 'guarantees a non-negative quantity under the square root.\n\n'
      + 'SYMMETRIC AND BILINEAR IS NOT ENOUGH — POSITIVE-DEFINITENESS MUST BE CHECKED TOO: for '
      + '⟨u,v⟩=u₁v₁−u₂v₂ on ℝ², symmetry and bilinearity both hold easily — but at v=(0,1): '
      + '⟨v,v⟩=0−1=−1<0, a NEGATIVE self-pairing for a nonzero vector. This form satisfies two of '
      + 'the three axioms yet is genuinely NOT a valid inner product; positive-definiteness must be '
      + 'checked EXPLICITLY, separately from symmetry and bilinearity, precisely because it is the '
      + 'axiom most often overlooked when the other two already "look fine."\n\n'
      + 'COMPLEX INNER PRODUCTS CONJUGATE ON THE SWAP — PLAIN SYMMETRY DOESN’T SURVIVE TO ℂ: on '
      + 'ℂⁿ, ⟨u,v⟩=Σuᵢv̄ᵢ gives ⟨v,v⟩=Σ|vᵢ|², always a non-negative REAL number even though the vᵢ '
      + 'are complex. Checking ⟨u,v⟩=⟨v,u⟩ literally FAILS in general for complex vectors, but the '
      + 'WEAKER conjugate-symmetric identity ⟨v,u⟩=conj(⟨u,v⟩) holds exactly — the complex '
      + 'generalization replaces plain symmetry with this conjugate form specifically so ⟨v,v⟩ '
      + 'comes out real.',
    targetedMisconceptions: [`${INNER_PRODUCT}:MC-1`, `${INNER_PRODUCT}:MC-2`, `${INNER_PRODUCT}:MC-3`],
    source: eb(INNER_PRODUCT, 'Core Understanding — the dot product as one example among the three inner-product axioms, positive-definiteness requiring explicit separate verification, and the complex case requiring conjugate symmetry rather than plain symmetry'),
  },
]

export const MATHEMATICS_LINALG_LINEAR_MAP_SUBSPACE_INNER_PRODUCT_PROBES: SeedProbe[] = [
  {
    conceptId: LINEAR_MAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Rotation, reflection, and dilation are all linear maps. Is translation, S(x,y)=(x+1,y), also automatically a linear map by the same pattern?',
    choices: [
      { text: 'No — a linear map must satisfy T(0)=0, but S(0,0)=(1,0)≠(0,0); translation fails this necessary consequence directly, so resemblance to the other three transformations is not a valid test', isCorrect: true },
      { text: 'Yes — since rotation, reflection, and dilation are all linear, translation should follow the same pattern as another familiar geometric transformation', isCorrect: false, misconceptionId: `${LINEAR_MAP}:MC-1` },
      { text: "Yes, because any transformation that shifts, rotates, or resizes points in a plane automatically qualifies as linear by virtue of being a geometric transformation", isCorrect: false, misconceptionId: `${LINEAR_MAP}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_MAP}:MC-1`],
    source: eb(LINEAR_MAP, 'Demonstration 1 — T(x,y)=(2x+y,x-y) passing both properties directly while S(x,y)=(x+1,y) fails immediately since S(0,0)≠(0,0), directly breaking ALL-TRANSFORMATIONS-ASSUMED-LINEAR'),
  },
  {
    conceptId: LINEAR_MAP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given T(1,0)=(3,1) and T(0,1)=(-2,4) for a linear map T, could T(1,1) independently be defined as (0,0)?',
    choices: [
      { text: 'No — linearity already FORCES T(1,1)=T(1,0)+T(0,1)=(3,1)+(-2,4)=(1,5); a claimed extra rule of (0,0) is inconsistent with this basis-forced value and cannot describe a genuine linear map', isCorrect: true },
      { text: 'Yes — since (1,1) is a different input than either (1,0) or (0,1), its output value can be assigned independently without contradicting the map’s linearity', isCorrect: false, misconceptionId: `${LINEAR_MAP}:MC-2` },
      { text: "Yes, because a linear map only constrains its values at the basis vectors themselves, leaving every other input free to be defined arbitrarily", isCorrect: false, misconceptionId: `${LINEAR_MAP}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_MAP}:MC-2`],
    source: eb(LINEAR_MAP, 'Demonstration 2 — showing a claimed additional rule T(1,1)=(0,0) is inconsistent since linearity already forces T(1,1)=(1,5), directly breaking BASIS-DETERMINATION-NOT-ENFORCED'),
  },
  {
    conceptId: LINEAR_MAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To verify homogeneity T(cv)=cT(v) for a candidate map, is checking only c=1 sufficient to confirm the property holds generally?',
    choices: [
      { text: 'No — c=1 gives T(v)=T(v), trivially true for every function regardless of linearity; a genuinely distinguishing scalar, such as c=-2, is needed to actually expose whether homogeneity holds or fails', isCorrect: true },
      { text: 'Yes — if T(1·v)=1·T(v) holds, that single check is enough to guarantee T(cv)=cT(v) holds for every other scalar c as well', isCorrect: false, misconceptionId: `${LINEAR_MAP}:MC-3` },
      { text: "Yes, because c=1 is the standard test value used to confirm any scaling property in mathematics, regardless of what specific property is being checked", isCorrect: false, misconceptionId: `${LINEAR_MAP}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR_MAP}:MC-3`],
    source: eb(LINEAR_MAP, 'Demonstration 3 — checking homogeneity for T(x,y)=(2x+y,x-y) only at c=1 or c=0 proves nothing, while c=-2 genuinely confirms the property, directly breaking HOMOGENEITY-CHECKED-WITH-UNIT-SCALAR-ONLY'),
  },
  {
    conceptId: SUBSPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the unit disc in ℝ², {(x,y):x²+y²≤1}, a subspace of ℝ²?',
    choices: [
      { text: 'No — despite containing the origin and looking "nice," the unit disc fails closure under scalar multiplication (scaling a boundary point by a large enough constant leaves the disc), so geometric containment alone is not sufficient for subspace membership', isCorrect: true },
      { text: 'Yes — since the disc sits neatly inside ℝ² and visually looks like a well-behaved set, it automatically qualifies as a subspace', isCorrect: false, misconceptionId: `${SUBSPACE}:MC-1` },
      { text: 'Yes, because the disc contains the origin, and containing the origin is by itself sufficient to establish subspace status', isCorrect: false, misconceptionId: `${SUBSPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${SUBSPACE}:MC-1`],
    source: eb(SUBSPACE, 'Demonstration 1 — the six-subset gallery showing the unit disc fails both addition and scalar closure despite visual "niceness" and origin-containment, directly breaking ANY-SUBSET-IS-SUBSPACE'),
  },
  {
    conceptId: SUBSPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A set W is verified to be closed under both addition and scalar multiplication. Is checking whether 0∈W still necessary?',
    choices: [
      { text: 'Yes — the zero check is the FIRST test that should be applied, since closure alone can LOOK satisfied on a shifted (affine) set before the zero check catches it; a line like y=2x+1 can appear closure-friendly yet fails the zero check instantly', isCorrect: true },
      { text: 'No — once closure under both addition and scalar multiplication has been confirmed, the zero vector is automatically guaranteed to be a member without any further check needed', isCorrect: false, misconceptionId: `${SUBSPACE}:MC-2` },
      { text: "No, because the zero vector check is a redundant formality that closure conditions already fully account for in every case", isCorrect: false, misconceptionId: `${SUBSPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${SUBSPACE}:MC-2`],
    source: eb(SUBSPACE, 'Demonstration 2 — contrasting W₁={(x,2x)} (passes the zero check) against W₂={(x,2x+1)} (fails it instantly despite the same slope and shape), directly breaking ZERO-CHECK-OMITTED'),
  },
  {
    conceptId: SUBSPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does defining a set by the linear equation x+y+z=1 in ℝ³ guarantee it is a subspace?',
    choices: [
      { text: 'No — the equation is NON-HOMOGENEOUS (a nonzero constant, 1, appears on the right side), which kills the zero check at the origin (0+0+0=0≠1); only HOMOGENEOUS conditions (=0) can give subspaces', isCorrect: true },
      { text: 'Yes — any set defined by a linear equation in the coordinates is automatically a subspace, regardless of what constant appears on the right-hand side', isCorrect: false, misconceptionId: `${SUBSPACE}:MC-3` },
      { text: "Yes, because linear equations always produce flat geometric objects, and every flat geometric object in ℝ³ qualifies as a subspace", isCorrect: false, misconceptionId: `${SUBSPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${SUBSPACE}:MC-3`],
    source: eb(SUBSPACE, 'Demonstration 3 — contrasting the homogeneous {(x,y,z):x+y+z=0} (subspace) against the non-homogeneous {(x,y,z):x+y+z=1} (not a subspace, fails the zero check), directly breaking NONHOMOGENEOUS-AS-SUBSPACE'),
  },
  {
    conceptId: INNER_PRODUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can polynomials or continuous functions have a genuine inner product, even though they have no numeric components to literally "dot" together?',
    choices: [
      { text: 'Yes — the axiomatic definition (symmetry, bilinearity, positive-definiteness) applies equally to abstract spaces with no numeric components; ⟨f,g⟩=∫₀¹f(x)g(x)dx satisfies all three axioms directly on continuous functions, a genuine inner product where "dot product" has no direct meaning', isCorrect: true },
      { text: "No — an inner product is fundamentally just a renaming of the dot product, so it only makes sense for vectors with numeric components that can actually be paired and multiplied", isCorrect: false, misconceptionId: `${INNER_PRODUCT}:MC-1` },
      { text: 'No, since only spaces where elements can be written as tuples of real numbers can support the inner product axioms', isCorrect: false, misconceptionId: `${INNER_PRODUCT}:MC-1` },
    ],
    targetedMisconceptions: [`${INNER_PRODUCT}:MC-1`],
    source: eb(INNER_PRODUCT, 'Demonstration 1 — verifying ⟨f,g⟩=∫₀¹f(x)g(x)dx on continuous functions satisfies all three axioms directly, a genuine inner product on an infinite-dimensional space, directly breaking INNER-PRODUCT-IS-JUST-DOT-PRODUCT'),
  },
  {
    conceptId: INNER_PRODUCT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The form ⟨u,v⟩=u₁v₁−u₂v₂ on ℝ² is symmetric and bilinear. Is that enough to guarantee it is a valid inner product?',
    choices: [
      { text: 'No — positive-definiteness must be checked EXPLICITLY and separately; at v=(0,1), ⟨v,v⟩=0−1=−1<0, a negative self-pairing for a nonzero vector, so this form fails positive-definiteness despite passing symmetry and bilinearity', isCorrect: true },
      { text: 'Yes — once a bilinear form is confirmed symmetric and bilinear, those two properties are sufficient to guarantee it qualifies as a valid inner product', isCorrect: false, misconceptionId: `${INNER_PRODUCT}:MC-2` },
      { text: "Yes, because any bilinear form built from products of vector components automatically satisfies non-negativity for every vector", isCorrect: false, misconceptionId: `${INNER_PRODUCT}:MC-2` },
    ],
    targetedMisconceptions: [`${INNER_PRODUCT}:MC-2`],
    source: eb(INNER_PRODUCT, 'Demonstration 2 — showing ⟨u,v⟩=u₁v₁−u₂v₂ passes symmetry and bilinearity but fails positive-definiteness at v=(0,1), directly breaking ANY-SYMMETRIC-BILINEAR-FORM-QUALIFIES'),
  },
  {
    conceptId: INNER_PRODUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a complex inner product on ℂⁿ, does ⟨u,v⟩=⟨v,u⟩ hold exactly, the same as in the real case?',
    choices: [
      { text: 'No — plain symmetry literally fails for complex vectors in general (e.g. u=(1,0), v=(i,0) gives -i≠i); the WEAKER conjugate-symmetric identity ⟨v,u⟩=conj(⟨u,v⟩) holds instead, specifically so ⟨v,v⟩ comes out real', isCorrect: true },
      { text: 'Yes — the real case’s symmetry formula ⟨u,v⟩=⟨v,u⟩ carries over unchanged to the complex case, since inner products behave identically regardless of whether the underlying field is real or complex', isCorrect: false, misconceptionId: `${INNER_PRODUCT}:MC-3` },
      { text: "Yes, because complex numbers satisfy the same algebraic symmetry properties as real numbers under multiplication and addition", isCorrect: false, misconceptionId: `${INNER_PRODUCT}:MC-3` },
    ],
    targetedMisconceptions: [`${INNER_PRODUCT}:MC-3`],
    source: eb(INNER_PRODUCT, 'Demonstration 3 — showing plain symmetry fails for u=(1,0), v=(i,0) on ℂⁿ (-i≠i) while conjugate symmetry holds exactly, directly breaking COMPLEX-INNER-PRODUCT-IS-PLAIN-SYMMETRIC'),
  },
]

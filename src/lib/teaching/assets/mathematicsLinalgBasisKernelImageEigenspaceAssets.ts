/**
 * Batch: basis, kernel-image, eigenspace (math.linalg).
 *
 * Continuing math.linalg (32/61 -> 35/61). Fresh frontier recompute found
 * 11 ready concepts. Selected basis for its highest unlock value (opens
 * dimension, coordinates), plus kernel-image (closes the linear-map
 * family opened Batch 110) and eigenspace (closes the eigenvalues+
 * null-space family, combining Batch 103's eigenvalues with Batch 111's
 * null-space) — both terminal leaves with no further unlocks but
 * completing their own concept families.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.linalg.{basis,kernel-image,eigenspace}.md.
 *
 *   BASIS  a basis requires BOTH spanning AND independence SIMULTANEOUSLY
 *           — checking only one, however visually obvious, never
 *           establishes a basis; a vector space has INFINITELY MANY valid
 *           bases, never a single unique "the" basis; coordinates are
 *           ALWAYS relative to a specified basis — the SAME vector has
 *           genuinely DIFFERENT coordinates in different bases, never an
 *           absolute property of the vector alone.
 *   KERNEL-IMAGE  ker(T) can contain MANY nonzero vectors, never assumed
 *           to automatically equal just {0} — "0 maps to 0" does not mean
 *           nothing else does; injectivity is tested EXACTLY via
 *           ker(T)={0}, never by spot-checking a few input pairs, which
 *           can miss a genuine collision entirely; im(T) can be a PROPER
 *           subspace of the codomain, never assumed to automatically fill
 *           it.
 *   EIGENSPACE  Eλ=ker(A−λI) is computed by directly reusing the
 *           null-space technique applied to A−λI; GEOMETRIC multiplicity
 *           (dim(Eλ), found by row reduction) can genuinely DIFFER from
 *           ALGEBRAIC multiplicity (root repetition in the characteristic
 *           polynomial) — algebraic ≥ geometric ALWAYS, never the
 *           reverse, and equality for EVERY eigenvalue is exactly what
 *           characterizes a diagonalizable matrix.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BASIS = 'math.linalg.basis'
const KERNEL_IMAGE = 'math.linalg.kernel-image'
const EIGENSPACE = 'math.linalg.eigenspace'

export const MATHEMATICS_LINALG_BASIS_KERNEL_IMAGE_EIGENSPACE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BASIS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SPANNING IS ONLY HALF THE TEST — INDEPENDENCE IS THE OTHER HALF, ALWAYS CHECK BOTH: for '
      + '{(1,0),(0,1),(1,1)} in ℝ²: this SPANS ℝ² (already reachable using just the first two '
      + 'vectors), but (1,1)=1·(1,0)+1·(0,1) is a nontrivial dependency — NOT independent. This set '
      + 'FAILS to be a basis despite spanning perfectly well, because a basis requires BOTH '
      + 'spanning AND independence SIMULTANEOUSLY — checking only spanning and stopping is never '
      + 'sufficient.\n\n'
      + 'THERE IS NO "THE" BASIS — ONLY "A" BASIS, ONE CHOICE AMONG INFINITELY MANY: beyond the '
      + 'standard basis {(1,0),(0,1)} for ℝ², the set {(1,1),(1,-1)} ALSO satisfies both conditions '
      + '— a GENUINELY DIFFERENT, equally valid basis. So is {(3,1),(1,2)}. There is NO limit to how '
      + 'many valid bases a space can have; "the standard basis" is one convenient, commonly-used '
      + 'choice among infinitely many, never the ONLY one.\n\n'
      + 'COORDINATES BELONG TO THE VECTOR-BASIS PAIRING, NEVER TO THE VECTOR ALONE: for v=(5,3): in '
      + 'the STANDARD basis, coordinates are simply (5,3). In the basis {(1,1),(1,-1)}: using '
      + 'c₁=(a+b)/2=4, c₂=(a-b)/2=1 — coordinates are (4,1) in THIS basis. The SAME geometric vector '
      + 'v=(5,3) has coordinates (5,3) in one basis and (4,1) in another — coordinates NEVER belong '
      + 'to the vector alone; they depend entirely on WHICH basis describes it.',
    targetedMisconceptions: [`${BASIS}:MC-1`, `${BASIS}:MC-2`, `${BASIS}:MC-3`],
    source: eb(BASIS, 'Core Understanding — a basis requiring both spanning and independence simultaneously, a vector space having infinitely many valid bases, and coordinates depending entirely on which basis is chosen rather than belonging to the vector alone'),
  },
  {
    conceptId: KERNEL_IMAGE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SOLVE T(v)=0 COMPLETELY — DON’T ASSUME THE KERNEL IS JUST ZERO: for T(x,y)=(x+y,x+y) on '
      + 'ℝ²: ker(T) is ALL (x,y) with x+y=0 — the ENTIRE LINE {(t,-t):t∈ℝ}, NOT just {(0,0)}. Many '
      + 'nonzero vectors (like (1,-1)) map to zero under this T. The reflex "0 maps to 0, so the '
      + 'kernel is just {0}" ignores that OTHER nonzero vectors can ALSO map to zero whenever T is '
      + 'not injective — the kernel’s actual size must be computed directly, never assumed.\n\n'
      + 'THE KERNEL CRITERION IS EXACT — IT REPLACES ANY NEED TO SPOT-CHECK INDIVIDUAL PAIRS: for '
      + 'the same T: since ker(T) is the whole line (not just {0}), T is NOT injective — confirmed '
      + 'directly by T(1,-1)=(0,0)=T(0,0), two DIFFERENT inputs giving the SAME output. Testing only '
      + 'a FEW specific input pairs for collisions is an INCOMPLETE method that could miss a genuine '
      + 'collision entirely; the kernel criterion ker(T)={0}⟺T injective is EXACT and complete.\n\n'
      + 'CHECK THE IMAGE DIRECTLY — IT MIGHT NOT FILL THE WHOLE CODOMAIN: for the same T: im(T) is '
      + 'ALL outputs (x+y,x+y), which is ALWAYS of the form (s,s) — the DIAGONAL LINE {(s,s):s∈ℝ} '
      + 'in ℝ², NOT all of ℝ². Since (1,2) is not on this diagonal, it is NOT achievable by any '
      + 'input — T is therefore NOT surjective. Assuming the image automatically fills the codomain '
      + 'misses that many linear maps have genuinely smaller, proper-subspace images.',
    targetedMisconceptions: [`${KERNEL_IMAGE}:MC-1`, `${KERNEL_IMAGE}:MC-2`, `${KERNEL_IMAGE}:MC-3`],
    source: eb(KERNEL_IMAGE, 'Core Understanding — the kernel potentially containing many nonzero vectors, injectivity tested exactly via ker(T)={0} rather than spot-checking, and the image potentially being a proper subspace of the codomain'),
  },
  {
    conceptId: EIGENSPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE EIGENSPACE REUSES THE NULL-SPACE TECHNIQUE DIRECTLY: Eλ=ker(A−λI) is the set of ALL '
      + 'eigenvectors for a specific eigenvalue λ (plus the zero vector) — a subspace of ℝⁿ, found '
      + 'by row-reducing (A−λI) and parameterizing free variables exactly as math.linalg.null-space '
      + 'already established, applied here to the specific matrix A−λI rather than A itself.\n\n'
      + 'ALGEBRAIC MULTIPLICITY IS A CEILING — GEOMETRIC MULTIPLICITY CAN FALL SHORT OF IT, NEVER '
      + 'EXCEED IT: the algebraic multiplicity of λ is how many times it appears as a root of the '
      + 'characteristic polynomial; the geometric multiplicity is dim(Eλ) — how many linearly '
      + 'independent eigenvectors actually correspond to λ. For A=[[3,1],[0,3]], λ=3 has algebraic '
      + 'multiplicity 2, but row-reducing A−3I=[[0,1],[0,0]] gives rank 1, so dim(E₃)=2−1=1 — '
      + 'geometric multiplicity STRICTLY LESS than algebraic multiplicity. These two counts are '
      + 'computed by genuinely DIFFERENT methods (polynomial-root counting versus '
      + 'null-space-dimension counting) and need not agree; a geometric multiplicity claim must '
      + 'come from actually row-reducing (A−λI), never assumed to match the algebraic count.\n\n'
      + 'EQUAL MULTIPLICITIES EVERYWHERE MEANS DIAGONALIZABLE; ANY GAP MEANS DEFECTIVE: algebraic '
      + 'multiplicity ≥ geometric multiplicity, NEVER the reverse. When this holds with EQUALITY for '
      + 'EVERY eigenvalue of A, the matrix is DIAGONALIZABLE.',
    targetedMisconceptions: [`${EIGENSPACE}:MC-1`, `${EIGENSPACE}:MC-2`],
    source: eb(EIGENSPACE, 'Core Understanding — Eλ=ker(A−λI) computed via the null-space technique, geometric multiplicity potentially falling strictly short of algebraic multiplicity, and equality everywhere characterizing diagonalizability'),
  },
]

export const MATHEMATICS_LINALG_BASIS_KERNEL_IMAGE_EIGENSPACE_PROBES: SeedProbe[] = [
  {
    conceptId: BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The set {(1,0),(0,1),(1,1)} in ℝ² spans ℝ². Does that alone confirm it is a basis?',
    choices: [
      { text: 'No — a basis requires BOTH spanning AND independence simultaneously; this set is not independent since (1,1)=1·(1,0)+1·(0,1) is a nontrivial dependency, so despite spanning perfectly well it fails to be a basis', isCorrect: true },
      { text: 'Yes — since spanning is the primary defining property of a basis, a set that spans the space automatically qualifies as a basis', isCorrect: false, misconceptionId: `${BASIS}:MC-1` },
      { text: "Yes, because any set of vectors that reaches every point in the space through some combination is by definition a valid basis for that space", isCorrect: false, misconceptionId: `${BASIS}:MC-1` },
    ],
    targetedMisconceptions: [`${BASIS}:MC-1`],
    source: eb(BASIS, 'Demonstration 1 — the {(1,0),(0,1),(1,1)} spanning-but-dependent counterexample, isolating the redundant vector, directly breaking SPANNING-SET-IS-AUTOMATICALLY-A-BASIS'),
  },
  {
    conceptId: BASIS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The standard basis {(1,0),(0,1)} works for ℝ². Is this the ONLY valid basis for ℝ², or could other sets also qualify?',
    choices: [
      { text: 'A vector space has INFINITELY MANY valid bases — {(1,1),(1,-1)} and {(3,1),(1,2)} are both genuinely different, equally valid bases for ℝ²; the standard basis is just one convenient choice among infinitely many', isCorrect: true },
      { text: 'The standard basis {(1,0),(0,1)} is the single, unique correct basis for ℝ², and no other set of vectors can serve this role', isCorrect: false, misconceptionId: `${BASIS}:MC-2` },
      { text: "Every vector space has exactly one true basis, even though other sets might approximate its properties without being genuinely valid alternatives", isCorrect: false, misconceptionId: `${BASIS}:MC-2` },
    ],
    targetedMisconceptions: [`${BASIS}:MC-2`],
    source: eb(BASIS, 'Demonstration 2 — three distinct valid bases for ℝ² (standard, {(1,1),(1,-1)}, {(3,1),(1,2)}), each independently verified, directly breaking ONLY-ONE-BASIS-EXISTS'),
  },
  {
    conceptId: BASIS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The vector v=(5,3) has coordinates (5,3) in the standard basis. Are these the same coordinates v would have in the basis {(1,1),(1,-1)}?',
    choices: [
      { text: 'No — in {(1,1),(1,-1)}, solving gives c₁=(5+3)/2=4, c₂=(5-3)/2=1, so v’s coordinates are (4,1) in this basis; the same geometric vector has genuinely different coordinates depending on which basis describes it', isCorrect: true },
      { text: 'Yes — a vector’s coordinates are a fixed property of the vector itself, so v=(5,3) has coordinates (5,3) no matter which basis is used to describe it', isCorrect: false, misconceptionId: `${BASIS}:MC-3` },
      { text: "Yes, because coordinates only change when the vector itself changes, not when a different basis is chosen to represent it", isCorrect: false, misconceptionId: `${BASIS}:MC-3` },
    ],
    targetedMisconceptions: [`${BASIS}:MC-3`],
    source: eb(BASIS, 'Demonstration 3 — v=(5,3)’s coordinates computed in the standard basis versus {(1,1),(1,-1)}, confirmed to differ ((5,3) vs (4,1)), directly breaking COORDINATES-ARE-BASIS-INDEPENDENT'),
  },
  {
    conceptId: KERNEL_IMAGE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For T(x,y)=(x+y,x+y) on ℝ², does ker(T) contain only the zero vector (0,0)?',
    choices: [
      { text: 'No — ker(T) is ALL (x,y) with x+y=0, the ENTIRE LINE {(t,-t):t∈ℝ}; many nonzero vectors like (1,-1) also map to zero, since T is not injective', isCorrect: true },
      { text: "Yes — since 0 always maps to 0 under any linear map, the kernel of T automatically contains only the zero vector and nothing else", isCorrect: false, misconceptionId: `${KERNEL_IMAGE}:MC-1` },
      { text: 'Yes, because a linear map can never send a nonzero input to the zero output, so the kernel is always trivial', isCorrect: false, misconceptionId: `${KERNEL_IMAGE}:MC-1` },
    ],
    targetedMisconceptions: [`${KERNEL_IMAGE}:MC-1`],
    source: eb(KERNEL_IMAGE, 'Demonstration 1 — the full kernel computation for T(x,y)=(x+y,x+y), finding the entire line {(t,-t)}, directly breaking KERNEL-ASSUMED-TO-BE-ONLY-ZERO'),
  },
  {
    conceptId: KERNEL_IMAGE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To check whether T(x,y)=(x+y,x+y) is injective, is testing a few specific input pairs for collisions a reliable method, or is there a more definitive test?',
    choices: [
      { text: 'There is a more definitive test — the kernel criterion ker(T)={0}⟺T injective is EXACT and complete; since ker(T) is the whole line {(t,-t)}, not just {0}, T is definitively NOT injective, confirmed by T(1,-1)=(0,0)=T(0,0)', isCorrect: true },
      { text: "Testing a handful of specific input pairs for collisions is a reliable and sufficient way to determine injectivity, since any genuine collision would likely show up in a reasonable sample", isCorrect: false, misconceptionId: `${KERNEL_IMAGE}:MC-2` },
      { text: 'Spot-checking input pairs is the standard and only available method for testing injectivity in linear maps', isCorrect: false, misconceptionId: `${KERNEL_IMAGE}:MC-2` },
    ],
    targetedMisconceptions: [`${KERNEL_IMAGE}:MC-2`],
    source: eb(KERNEL_IMAGE, 'Demonstration 2 — the exact kernel-based injectivity test contrasted with a flawed spot-checking approach, using the same T, directly breaking INJECTIVITY-CHECKED-BY-SPOT-CHECKING-RATHER-THAN-KERNEL'),
  },
  {
    conceptId: KERNEL_IMAGE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For T(x,y)=(x+y,x+y) on ℝ², does im(T) fill the entire codomain ℝ², or is it a smaller subspace?',
    choices: [
      { text: 'It is a smaller, proper subspace — im(T) is always of the form (s,s), the DIAGONAL LINE {(s,s):s∈ℝ}, not all of ℝ²; since (1,2) is not on this diagonal, it is unreachable by any input, so T is not surjective', isCorrect: true },
      { text: 'It fills the entire codomain — the image of a linear map always covers every point in the codomain, regardless of the specific map', isCorrect: false, misconceptionId: `${KERNEL_IMAGE}:MC-3` },
      { text: "It fills the entire codomain, because outputs of a linear map are assumed to cover everything the codomain contains unless explicitly restricted", isCorrect: false, misconceptionId: `${KERNEL_IMAGE}:MC-3` },
    ],
    targetedMisconceptions: [`${KERNEL_IMAGE}:MC-3`],
    source: eb(KERNEL_IMAGE, 'Demonstration 3 — the full image computation for T(x,y)=(x+y,x+y), finding the diagonal line and confirming (1,2) is unreachable, directly breaking IMAGE-ASSUMED-TO-BE-THE-ENTIRE-CODOMAIN'),
  },
  {
    conceptId: EIGENSPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A=[[2,0],[0,2]], to find the eigenspace E₂ for λ=2, what matrix should be row-reduced?',
    choices: [
      { text: 'A−2I — the eigenspace Eλ=ker(A−λI) is computed by directly reusing the null-space technique applied to A−λI; here A−2I is the zero matrix, so every vector satisfies (A−2I)v=0, giving E₂=ℝ²', isCorrect: true },
      { text: 'A itself, without subtracting λI first, since the eigenspace can be found directly from the original matrix without any modification', isCorrect: false, misconceptionId: `${EIGENSPACE}:MC-2` },
      { text: 'The characteristic polynomial’s coefficient matrix, since that is what determines the eigenspace rather than any row reduction of A−λI', isCorrect: false, misconceptionId: `${EIGENSPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${EIGENSPACE}:MC-2`],
    source: eb(EIGENSPACE, 'Demonstration 1 — for A=[[2,0],[0,2]], λ=2, showing A−2I is the zero matrix so E₂=ℝ², dim(E₂)=2, directly breaking GEOMETRIC-MULTIPLICITY-COMPUTED-WITHOUT-ROW-REDUCTION'),
  },
  {
    conceptId: EIGENSPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[3,1],[0,3]], λ=3 has algebraic multiplicity 2 (a repeated root of the characteristic polynomial). Does this guarantee the eigenspace E₃ has dimension 2?',
    choices: [
      { text: 'No — row-reducing A−3I=[[0,1],[0,0]] gives rank 1, so dim(E₃)=2−1=1, strictly LESS than the algebraic multiplicity; algebraic and geometric multiplicity are computed by genuinely different methods and need not agree', isCorrect: true },
      { text: 'Yes — algebraic multiplicity and geometric multiplicity must always match exactly for any eigenvalue of any matrix', isCorrect: false, misconceptionId: `${EIGENSPACE}:MC-1` },
      { text: "Yes, because once a root's repetition count is known from the characteristic polynomial, that number directly determines the eigenspace's dimension with no further computation needed", isCorrect: false, misconceptionId: `${EIGENSPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${EIGENSPACE}:MC-1`],
    source: eb(EIGENSPACE, 'Demonstration 2 — for A=[[3,1],[0,3]], showing algebraic multiplicity 2 but geometric multiplicity 1 via row reduction, directly breaking ALGEBRAIC-AND-GEOMETRIC-MULTIPLICITY-ASSUMED-ALWAYS-EQUAL'),
  },
  {
    conceptId: EIGENSPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A=diag(2,2,5), λ=2 has algebraic multiplicity 2 and geometric multiplicity 2 (equal), and λ=5 has both multiplicities 1 (equal). What does this confirm about A?',
    choices: [
      { text: 'A is diagonalizable — when algebraic multiplicity equals geometric multiplicity for EVERY eigenvalue, the matrix is diagonalizable; this multiplicity match directly confirms it with no further test needed', isCorrect: true },
      { text: 'A cannot be diagonalized, since having a repeated eigenvalue (λ=2 with multiplicity 2) always prevents diagonalizability regardless of the geometric multiplicity', isCorrect: false, misconceptionId: `${EIGENSPACE}:MC-1` },
      { text: 'Nothing can be concluded about diagonalizability from multiplicity counts alone; a separate, unrelated test is always required', isCorrect: false, misconceptionId: `${EIGENSPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${EIGENSPACE}:MC-1`],
    source: eb(EIGENSPACE, 'Demonstration 3 — for A=diag(2,2,5), both eigenvalues having matching algebraic and geometric multiplicities, confirming diagonalizability directly, completing the contrast against Demonstration 2’s strict-inequality case'),
  },
]

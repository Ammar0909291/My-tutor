/**
 * Batch: riesz-representation, compact-operator-spectrum, fourier-transform
 * (math.fnal) — 13/18 -> 16/18.
 *
 * Fresh Phase 0 frontier recompute after hahn-banach, closed-graph-
 * theorem, and uniform-boundedness were authored: the remaining 5
 * math.fnal leaf concepts stayed simultaneously ready (riesz-
 * representation, compact-operator-spectrum, fourier-transform,
 * distributions, special-functions). This batch takes the first 3,
 * leaving distributions and special-functions as the domain's final
 * 2-concept closing batch.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.fnal.riesz-representation.md,
 * math.fnal.compact-operator-spectrum.md, and
 * math.fnal.fourier-transform.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * riesz-representation and compact-operator-spectrum declare no KG
 * cross-links (confirmed cross_links: none in their own Identity
 * sections). fourier-transform's two cross-links (math.de.fourier-
 * transform, math.de.fourier-series) are both authored — genuine
 * transfer targets, though not themselves referenced by these detection
 * probes (which target the EB's own Discovery Questions per the
 * established probe-authoring convention).
 *
 * All 3 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RIESZ_REPRESENTATION = 'math.fnal.riesz-representation'
const COMPACT_OPERATOR_SPECTRUM = 'math.fnal.compact-operator-spectrum'
const FOURIER_TRANSFORM = 'math.fnal.fourier-transform'

export const MATHEMATICS_FNAL_RIESZ_REPRESENTATION_COMPACT_OPERATOR_FOURIER_TRANSFORM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RIESZ_REPRESENTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE REPRESENTING VECTOR y IS UNIQUE — NEVER POSSIBLY NON-UNIQUE: if a functional can be '
      + 'written as the inner product with y₁ AND with y₂ for ALL x, then the inner product of x '
      + 'with (y₁−y₂) is 0 for all x; taking x=(y₁−y₂) gives the squared norm of (y₁−y₂) equal to '
      + '0, so y₁=y₂. Believing two different y values could represent the same bounded functional '
      + 'is WRONG — the inner product\'s POSITIVE-DEFINITENESS forces uniqueness directly; there is '
      + 'exactly one representing vector for each bounded linear functional.\n\n'
      + 'THE RIESZ THEOREM IS A COMPLETE CHARACTERIZATION — NEVER LEAVES SOME BOUNDED FUNCTIONALS '
      + 'UNREPRESENTED: for H=L²([0,1]) and the functional that integrates a fixed function h times '
      + 'g over [0,1]: by Cauchy-Schwarz this functional is bounded, and the representing vector is '
      + 'exactly h itself, with the functional\'s norm equal to h\'s L² norm. Believing there could '
      + 'exist a bounded linear functional on a Hilbert space that is NOT of this inner-product form '
      + 'for any vector is WRONG — the theorem rules this out entirely: "multiply by h and '
      + 'integrate" is the ONLY form a bounded functional on L² can take, with no exceptions.\n\n'
      + 'SELF-DUALITY IS A SPECIFICALLY HILBERT-STRUCTURE CONSEQUENCE — NEVER A GENERAL '
      + 'BANACH-SPACE PROPERTY: the Riesz theorem gives a Hilbert space isomorphic to its own dual '
      + 'via a conjugate-linear isometric isomorphism. But the dual of ℓ¹ is ℓ^∞, genuinely '
      + 'different from ℓ¹ as Banach spaces (different norms and topologies) — ℓ¹ is a valid Banach '
      + 'space but has NO inner product compatible with its norm, so it is NOT Hilbert and NOT '
      + 'self-dual. Treating self-duality as a property holding for ALL Banach spaces is WRONG — it '
      + 'is made possible SPECIFICALLY by the inner product\'s symmetric structure, and fails for '
      + 'most Banach spaces.',
    targetedMisconceptions: [`${RIESZ_REPRESENTATION}:MC-1`, `${RIESZ_REPRESENTATION}:MC-2`, `${RIESZ_REPRESENTATION}:MC-3`],
    source: eb(RIESZ_REPRESENTATION, 'Core Understanding — the representing vector y being unique never possibly non-unique, the Riesz theorem being a complete characterization never leaving some bounded functionals unrepresented, and self-duality being a specifically Hilbert-structure consequence never a general Banach-space property'),
  },
  {
    conceptId: COMPACT_OPERATOR_SPECTRUM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BOUNDED NEVER IMPLIES COMPACT IN INFINITE DIMENSIONS: the identity operator I on square-'
      + 'summable sequences is bounded (norm 1) but NOT compact — the standard basis vectors form a '
      + 'bounded sequence each of norm 1, with distance √2 between any two distinct ones, so NO '
      + 'subsequence of their images converges. Contrast: the Volterra operator (integrating a '
      + 'function from 0 to x) on L²([0,1]) IS compact — by Arzelà-Ascoli, the image of the unit '
      + 'ball is equicontinuous and uniformly bounded, hence precompact. Believing that every '
      + 'bounded linear operator on an infinite-dimensional Banach space is compact is WRONG — '
      + 'compactness is a STRICTLY STRONGER property; in finite dimensions every bounded operator '
      + 'happens to be compact (Bolzano-Weierstrass), but this collapses entirely once the space is '
      + 'infinite-dimensional.\n\n'
      + "A COMPACT OPERATOR'S NONZERO SPECTRUM ACCUMULATES ONLY AT 0 — NEVER AT ANY NONZERO POINT: "
      + 'for the diagonal operator that divides the nth coordinate by n on square-summable '
      + 'sequences: eigenvalues 1, 1/2, 1/3, ... with one-dimensional eigenspaces, forming a '
      + 'sequence accumulating ONLY at 0. Believing a compact operator can have nonzero eigenvalues '
      + 'accumulating at some nonzero point is WRONG — the spectral discreteness theorem guarantees '
      + 'the nonzero spectrum is at most countable, with 0 as the ONLY possible accumulation point, '
      + 'and every nonzero eigenspace is finite-dimensional — a genuine extension of finite-'
      + 'dimensional linear algebra\'s full picture, with 0 as the sole new complication.\n\n'
      + "THE FREDHOLM ALTERNATIVE'S DICHOTOMY REQUIRES COMPACTNESS — NEVER APPLIES TO A GENERAL "
      + 'BOUNDED OPERATOR: for the compact diagonal operator above and the value 1/2: the equation '
      + '(1/2 times identity minus T)x=y becomes solvable for every coordinate EXCEPT the second, '
      + 'which requires the second coordinate of y to be 0. This is EXACTLY the Fredholm '
      + 'alternative\'s dichotomy case: 1/2 IS an eigenvalue, so solvability requires y to be '
      + 'orthogonal to that eigenspace. Believing the Fredholm alternative\'s unique-solvability-or-'
      + 'eigenvalue dichotomy holds for GENERAL bounded operators (not just compact ones) is WRONG — '
      + 'the unilateral shift, for instance, has NO eigenvalues at all yet is also not bijective, '
      + 'breaking the clean dichotomy; compactness is what makes the operator "almost finite-'
      + 'dimensional" enough for the sharp alternative to hold.',
    targetedMisconceptions: [`${COMPACT_OPERATOR_SPECTRUM}:MC-1`, `${COMPACT_OPERATOR_SPECTRUM}:MC-2`, `${COMPACT_OPERATOR_SPECTRUM}:MC-3`],
    source: eb(COMPACT_OPERATOR_SPECTRUM, 'Core Understanding — bounded never implying compact in infinite dimensions, a compact operator\'s nonzero spectrum accumulating only at 0 never at any nonzero point, and the Fredholm alternative\'s dichotomy requiring compactness never applying to a general bounded operator'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE L² FOURIER TRANSFORM REQUIRES EXTENSION BY DENSITY — NEVER THE SAME DIRECT INTEGRAL '
      + 'FORMULA AS THE CLASSICAL L¹ TRANSFORM: the function sin(t)/t is in L²(R) but NOT in L¹ '
      + '(its absolute integral diverges). The classical improper-integral formula CANNOT be '
      + 'applied directly. Instead, the L² transform is built by approximating the function with a '
      + 'sequence of functions in both L¹ and L² converging to it in L² norm, and taking the L²-'
      + 'limit of their transforms (guaranteed to converge by Plancherel\'s norm-preservation on '
      + 'the dense subset). Believing the L² Fourier transform is essentially the same construction '
      + 'as the L¹-based classical integral, just applied to a bigger class of functions using the '
      + 'same formula, is WRONG — L² genuinely requires this density-based extension, not direct '
      + 'integration.\n\n'
      + '"UNITARY" MEANS EXACT NORM PRESERVATION — NEVER CONFLATED WITH MERE BIJECTIVITY: doubling '
      + 'every function value (T(f)=2f) on L²(R) is BIJECTIVE (invertible, by halving), but it '
      + 'scales the norm by 2, NOT norm-preserving, hence NOT unitary, despite being perfectly '
      + 'bijective. Contrast with Plancherel: the Fourier transform preserves the L² norm EXACTLY, '
      + 'no scaling factor whatsoever. Believing "unitary" just means "invertible" or "bijective" '
      + 'is WRONG — unitary is a STRICTLY STRONGER property, specifically requiring exact norm '
      + 'preservation; a bijective linear map can rescale norms arbitrarily and remain invertible, '
      + 'but never remain unitary while doing so.\n\n'
      + '"DIAGONALIZES DIFFERENTIATION" IS A PRECISE FACT ABOUT OPERATOR DIAGONALIZATION — NEVER A '
      + 'LOOSE METAPHOR: the classical property that the Fourier transform of a derivative equals iω '
      + 'times the Fourier transform of the original function, reinterpreted here: the '
      + 'differentiation operator on L²(R), expressed in the "frequency basis" via the Fourier '
      + 'transform (a genuine change of orthonormal basis), becomes SIMPLE MULTIPLICATION by iω — '
      + 'exactly analogous to a diagonal matrix multiplying each basis vector by its own eigenvalue. '
      + 'Believing the "Fourier-transform-diagonalizes-differentiation" connection is a loose figure '
      + 'of speech is WRONG — it is a precise, formal fact about operator diagonalization via a '
      + 'genuine Hilbert-space basis change, the actual foundation of spectral theory for '
      + 'differential operators.',
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-1`, `${FOURIER_TRANSFORM}:MC-2`, `${FOURIER_TRANSFORM}:MC-3`],
    source: eb(FOURIER_TRANSFORM, 'Core Understanding — the L2 Fourier transform requiring extension by density never the same direct integral formula as the classical L1 transform, unitary meaning exact norm preservation never conflated with mere bijectivity, and diagonalizes differentiation being a precise fact about operator diagonalization never a loose metaphor'),
  },
]

export const MATHEMATICS_FNAL_RIESZ_REPRESENTATION_COMPACT_OPERATOR_FOURIER_TRANSFORM_PROBES: SeedProbe[] = [
  {
    conceptId: RIESZ_REPRESENTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If f(x)=⟨x,y⟩, is y the unique representing vector, or could two different y values represent the same f?',
    choices: [
      { text: "y is UNIQUE — if two vectors y₁ and y₂ both represent the same functional for all x, then the inner product of x with (y₁−y₂) is 0 for all x, and taking x=(y₁−y₂) forces its squared norm to be 0, so y₁=y₂; the inner product's positive-definiteness forces this directly", isCorrect: true },
      { text: "Two different y values could represent the same functional f, so the representing vector is not necessarily unique", isCorrect: false, misconceptionId: `${RIESZ_REPRESENTATION}:MC-1` },
      { text: "Since algebraic representations often admit multiple valid forms, the representing vector should be expected to have the same flexibility here", isCorrect: false, misconceptionId: `${RIESZ_REPRESENTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${RIESZ_REPRESENTATION}:MC-1`],
    source: eb(RIESZ_REPRESENTATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the representing vector y is unique, an answer allowing two different y values confirming REPRESENTING-VECTOR-NOT-UNIQUE'),
  },
  {
    conceptId: RIESZ_REPRESENTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "On L²([0,1]), could there be a bounded linear functional that is NOT of the form 'integrate against some L² function'?",
    choices: [
      { text: "No — the Riesz theorem is a COMPLETE characterization: \"multiply by h and integrate\" for some fixed h in L² is the ONLY form a bounded functional on L² can take, with no exceptions; the theorem rules out any escaping functional entirely", isCorrect: true },
      { text: "Yes, there could exist a bounded linear functional on L² that cannot be written as integration against any L² function", isCorrect: false, misconceptionId: `${RIESZ_REPRESENTATION}:MC-2` },
      { text: "Since the theorem's exhaustiveness is easy to underestimate without seeing its proof, it should be treated as covering only some, not all, bounded functionals", isCorrect: false, misconceptionId: `${RIESZ_REPRESENTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${RIESZ_REPRESENTATION}:MC-2`],
    source: eb(RIESZ_REPRESENTATION, 'Discovery Question 2 as a detection probe (verbatim) — whether some bounded functionals on L2 escape the inner-product form, an answer of "yes" confirming SOME-BOUNDED-FUNCTIONALS-NOT-INNER-PRODUCT-FORM'),
  },
  {
    conceptId: RIESZ_REPRESENTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are all Banach spaces self-dual, or is self-duality special to Hilbert spaces?',
    choices: [
      { text: "Self-duality is special to Hilbert spaces — it is made possible SPECIFICALLY by the inner product's symmetric structure; the dual of ℓ¹ is ℓ^∞, genuinely different from ℓ¹ as Banach spaces, since ℓ¹ has no compatible inner product and so is not self-dual", isCorrect: true },
      { text: "All Banach spaces are self-dual, since completeness alone is sufficient to guarantee a space is isomorphic to its own dual", isCorrect: false, misconceptionId: `${RIESZ_REPRESENTATION}:MC-3` },
      { text: "Since the Riesz self-duality result is memorable and general-sounding, it should be expected to generalize to every Banach space regardless of whether it has an inner product", isCorrect: false, misconceptionId: `${RIESZ_REPRESENTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${RIESZ_REPRESENTATION}:MC-3`],
    source: eb(RIESZ_REPRESENTATION, 'Discovery Question 3 as a detection probe (verbatim) — whether all Banach spaces are self-dual or self-duality is special to Hilbert spaces, an answer of "all Banach spaces" confirming ALL-BANACH-SPACES-SELF-DUAL'),
  },
  {
    conceptId: COMPACT_OPERATOR_SPECTRUM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In infinite-dimensional spaces, is every bounded operator compact?',
    choices: [
      { text: "No — the identity operator on square-summable sequences is bounded (norm 1) but NOT compact, since the standard basis vectors form a bounded sequence with no convergent subsequence of images; compactness is STRICTLY STRONGER than boundedness once the space is infinite-dimensional", isCorrect: true },
      { text: "Yes, every bounded linear operator on an infinite-dimensional Banach space is automatically compact", isCorrect: false, misconceptionId: `${COMPACT_OPERATOR_SPECTRUM}:MC-1` },
      { text: "Since bounded and compact coincide in finite dimensions via Bolzano-Weierstrass, that same equivalence should carry over to infinite-dimensional spaces", isCorrect: false, misconceptionId: `${COMPACT_OPERATOR_SPECTRUM}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPACT_OPERATOR_SPECTRUM}:MC-1`],
    source: eb(COMPACT_OPERATOR_SPECTRUM, 'Discovery Question 1 as a detection probe (verbatim) — whether every bounded operator is compact in infinite dimensions, an answer of "yes" confirming BOUNDED-IMPLIES-COMPACT-IN-INFINITE-DIMENSIONS'),
  },
  {
    conceptId: COMPACT_OPERATOR_SPECTRUM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can a compact operator on an infinite-dimensional space have a nonzero eigenvalue that is an accumulation point of other eigenvalues?',
    choices: [
      { text: "No — the spectral discreteness theorem guarantees a compact operator's nonzero spectrum is at most countable with 0 as the ONLY possible accumulation point; the diagonal operator dividing by n has eigenvalues 1, 1/2, 1/3, ... accumulating only at 0, never at any nonzero point", isCorrect: true },
      { text: "Yes, a compact operator's nonzero eigenvalues can accumulate at some nonzero point, not just at 0", isCorrect: false, misconceptionId: `${COMPACT_OPERATOR_SPECTRUM}:MC-2` },
      { text: "Since an infinite sequence of eigenvalues seems free to accumulate anywhere without a precisely stated theorem, nonzero accumulation points should be considered possible", isCorrect: false, misconceptionId: `${COMPACT_OPERATOR_SPECTRUM}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPACT_OPERATOR_SPECTRUM}:MC-2`],
    source: eb(COMPACT_OPERATOR_SPECTRUM, 'Discovery Question 2 as a detection probe (verbatim) — whether a compact operator can have eigenvalues accumulating at a nonzero point, an answer of "yes" confirming COMPACT-SPECTRUM-NOT-NECESSARILY-DISCRETE'),
  },
  {
    conceptId: COMPACT_OPERATOR_SPECTRUM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the Fredholm alternative's dichotomy hold for general bounded operators, or only compact ones?",
    choices: [
      { text: "Only compact ones — the unilateral shift, a general bounded (non-compact) operator, has NO eigenvalues at all yet is also not bijective, breaking the clean either/or dichotomy; compactness is what makes the operator \"almost finite-dimensional\" enough for the sharp alternative to hold", isCorrect: true },
      { text: "The Fredholm alternative's unique-solvability-or-eigenvalue dichotomy holds for general bounded operators, not just compact ones", isCorrect: false, misconceptionId: `${COMPACT_OPERATOR_SPECTRUM}:MC-3` },
      { text: "Since the dichotomy feels like a generic linear-algebra fact, it should be expected to hold for any bounded operator regardless of compactness", isCorrect: false, misconceptionId: `${COMPACT_OPERATOR_SPECTRUM}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPACT_OPERATOR_SPECTRUM}:MC-3`],
    source: eb(COMPACT_OPERATOR_SPECTRUM, 'Discovery Question 3 as a detection probe (verbatim) — whether the Fredholm alternative holds for general bounded operators or only compact ones, an answer of "general bounded operators" confirming FREDHOLM-ALTERNATIVE-APPLIES-TO-ALL-OPERATORS'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the L² Fourier transform essentially the same object as the L¹-based classical Fourier transform, just applied to a bigger class of functions using the same integral formula?',
    choices: [
      { text: "No — L² genuinely requires a density-based extension; sin(t)/t is in L² but NOT L¹ (its absolute integral diverges), so the classical improper-integral formula cannot apply directly, and the L² transform must instead be built as an L²-limit of transforms of an approximating L¹∩L² sequence", isCorrect: true },
      { text: "Yes, the L² Fourier transform is essentially the same construction as the L¹-based classical integral, just applied to a bigger class of functions using the same formula", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-1` },
      { text: "Since the defining integral formula is central to the L¹ theory, it should be expected to extend automatically and directly to every L² function as well", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-1` },
    ],
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-1`],
    source: eb(FOURIER_TRANSFORM, 'Discovery Question 1 as a detection probe (verbatim) — whether the L2 Fourier transform is the same construction as the classical L1 integral formula, an answer of "yes" confirming L2-TRANSFORM-CONFLATED-WITH-CLASSICAL-INTEGRAL-FORMULA'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does 'unitary' just mean the same thing as 'invertible' or 'bijective'?",
    choices: [
      { text: "No — unitary is a STRICTLY STRONGER property requiring exact norm preservation; T(f)=2f on L² is bijective (invertible by halving) but scales the norm by 2, so it is NOT unitary, while the Fourier transform's Plancherel property preserves the L² norm EXACTLY", isCorrect: true },
      { text: "Yes, 'unitary' means the same thing as 'invertible' or 'bijective' for a linear map", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-2` },
      { text: "Since both terms describe \"nice,\" structure-preserving bijections, they should be treated as interchangeable descriptions of the same property", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-2` },
    ],
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-2`],
    source: eb(FOURIER_TRANSFORM, 'Discovery Question 2 as a detection probe (verbatim) — whether unitary just means invertible or bijective, an answer of "yes" confirming UNITARY-CONFLATED-WITH-INVERTIBLE'),
  },
  {
    conceptId: FOURIER_TRANSFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the connection between the Fourier transform and 'diagonalizing differential operators' merely a loose metaphor?",
    choices: [
      { text: "No — it is a precise, formal fact about operator diagonalization via a genuine Hilbert-space basis change; the differentiation operator, expressed in the frequency basis via the Fourier transform, becomes SIMPLE MULTIPLICATION by iω, exactly analogous to a diagonal matrix acting on its eigenbasis", isCorrect: true },
      { text: "Yes, the Fourier-transform-diagonalizes-differentiation connection is a loose figure of speech used informally, not a precise mathematical fact", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-3` },
      { text: "Since 'diagonalizes' is often used loosely in popular explanations of the Fourier transform, that same loose, non-technical usage should apply here too", isCorrect: false, misconceptionId: `${FOURIER_TRANSFORM}:MC-3` },
    ],
    targetedMisconceptions: [`${FOURIER_TRANSFORM}:MC-3`],
    source: eb(FOURIER_TRANSFORM, 'Discovery Question 3 as a detection probe (verbatim) — whether the diagonalization connection is a loose metaphor, an answer of "yes" confirming DIAGONALIZATION-TREATED-AS-METAPHOR'),
  },
]

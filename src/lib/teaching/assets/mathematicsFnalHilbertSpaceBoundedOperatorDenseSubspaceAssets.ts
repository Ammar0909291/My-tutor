/**
 * Batch: hilbert-space, bounded-operator, dense-subspace (math.fnal) — 4/18 -> 7/18.
 *
 * Fresh Phase 0 frontier recompute after banach-space was authored: all
 * 3 of its direct dependents became ready simultaneously (hilbert-space
 * and bounded-operator each additionally require an already-authored
 * math.linalg concept; dense-subspace requires only banach-space), so
 * this batch closes all 3 at once.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.fnal.hilbert-space.md,
 * math.fnal.bounded-operator.md, and math.fnal.dense-subspace.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * hilbert-space's cross-link math.linalg.inner-product is authored
 * (math.meas.l2-space is also authored per its own EB entry's Curriculum
 * Feedback, though not itself the chosen probe target). bounded-
 * operator's cross-link (math.linalg.linear-map) is authored.
 * dense-subspace's cross-link (math.real.weierstrass-approximation) is
 * authored.
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

const HILBERT_SPACE = 'math.fnal.hilbert-space'
const BOUNDED_OPERATOR = 'math.fnal.bounded-operator'
const DENSE_SUBSPACE = 'math.fnal.dense-subspace'

export const MATHEMATICS_FNAL_HILBERT_SPACE_BOUNDED_OPERATOR_DENSE_SUBSPACE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HILBERT_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"HILBERT SPACE" ADDS NOTHING BEYOND COMBINING INNER-PRODUCT-SPACE AND COMPLETENESS — NEVER '
      + 'A NEW INDEPENDENT IDEA: Rⁿ with the dot product is an inner product space, inducing the '
      + 'Euclidean norm; since (Rⁿ, Euclidean norm) is already known to be complete, Rⁿ with the '
      + 'dot product IS a Hilbert space — no additional argument beyond citing the two '
      + 'already-established facts, exactly paralleling how Banach space combined normed-space-ness '
      + 'with completeness.\n\n'
      + 'THE PROJECTION THEOREM GUARANTEES EXISTENCE AND UNIQUENESS OF THE NEAREST POINT — NEVER '
      + 'EXISTENCE ALONE: for the xy-plane C (closed convex) inside R³ and v=(1,2,5): the nearest '
      + 'point of C to v is (1,2,0) (dropping a perpendicular), and it is the UNIQUE closest point — '
      + 'no other point of the plane is as close. Recalling only that a nearest point EXISTS, '
      + 'without recognizing uniqueness is equally essential, is WRONG — without uniqueness, "the '
      + 'projection" would be ambiguous, a set of equally-close candidates rather than a single '
      + 'well-defined point, making the theorem far less useful.\n\n'
      + 'EVERY HILBERT SPACE IS BANACH, BUT NOT CONVERSELY — NEVER TREAT THE TWO LABELS AS '
      + 'INTERCHANGEABLE: Rⁿ with the dot product is Hilbert, hence automatically Banach (its '
      + 'induced norm makes it complete). But the space of continuous functions on [0,1] with the '
      + 'sup-norm is a genuine Banach space (complete) with NO inner product whose induced norm '
      + 'equals the sup-norm — provable via the parallelogram law, which specific continuous '
      + 'functions can be chosen to violate under the sup-norm. Assuming "Hilbert space" and '
      + '"Banach space" are just two names for the same class is WRONG — Hilbert is the strictly '
      + 'SMALLER subclass whose norm specifically arises from an inner product.',
    targetedMisconceptions: [`${HILBERT_SPACE}:MC-1`, `${HILBERT_SPACE}:MC-2`, `${HILBERT_SPACE}:MC-3`],
    source: eb(HILBERT_SPACE, 'Core Understanding — Hilbert space adding nothing beyond combining inner-product-space and completeness, the Projection Theorem guaranteeing existence AND uniqueness of the nearest point never existence alone, and every Hilbert space being Banach but not conversely'),
  },
  {
    conceptId: BOUNDED_OPERATOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BOUNDED AND CONTINUOUS ARE THE SAME FACT FOR LINEAR MAPS — NEVER TWO INDEPENDENT '
      + 'PROPERTIES: for T(x,y)=(3x,y), the operator norm ‖T‖=3 (maximized at (1,0)). Then for ANY '
      + 'two points, the distance between their images is bounded by 3 times the distance between '
      + 'the original points — a direct Lipschitz bound with the SAME constant ‖T‖=3, immediately '
      + 'giving continuity everywhere. Believing boundedness and continuity are two unrelated '
      + 'properties requiring separate verification for a linear map is WRONG — linearity forces '
      + 'them together, since ONE global constant (‖T‖) controls the behavior everywhere at once; '
      + 'this equivalence is special to linear maps and fails for general nonlinear functions.\n\n'
      + 'B(X,Y)\'S COMPLETENESS DEPENDS ONLY ON Y\'S COMPLETENESS — NEVER ON BOTH X AND Y: for '
      + 'T₁(x,y)=(3x,y) (‖T₁‖=3) and T₂(x,y)=(x,2y) (‖T₂‖=2) on R²: their sum (T₁+T₂)(x,y)=(4x,3y) '
      + 'has ‖T₁+T₂‖=4, satisfying the operator-norm triangle inequality ‖T₁‖+‖T₂‖=5. Since Y=R² is '
      + 'Banach, the space of bounded operators from R² to R² is GUARANTEED to be Banach as well, '
      + 'REGARDLESS of X\'s completeness. Assuming B(X,Y)\'s Banach-space status depends on both X '
      + 'and Y being complete is WRONG — a Cauchy sequence of operators is controlled pointwise by '
      + 'where it sends vectors, landing in the (complete) TARGET space Y; X\'s completeness plays '
      + 'no role in this argument.\n\n'
      + 'THE OPERATOR NORM IS A SUPREMUM OVER THE ENTIRE UNIT BALL — NEVER JUST THE BASIS VECTORS\' '
      + 'IMAGES: for T(x,y)=(3x,y) restricted to the unit ball, the norm of T(x,y) is maximized at '
      + '(1,0), giving ‖T‖=3 — but (1,0) IS a basis vector here only coincidentally; in general the '
      + 'maximizing vector need not be a basis vector at all. Computing ‖T‖ by checking only the '
      + 'images of the basis vectors and taking their max is WRONG — the supremum must range over '
      + 'ALL unit vectors, though basis knowledge (a linear map is fully determined by its basis '
      + 'images) does make the computation tractable, never automatic.',
    targetedMisconceptions: [`${BOUNDED_OPERATOR}:MC-1`, `${BOUNDED_OPERATOR}:MC-2`, `${BOUNDED_OPERATOR}:MC-3`],
    source: eb(BOUNDED_OPERATOR, 'Core Understanding — bounded and continuous being the same fact for linear maps never two independent properties, B(X,Y)\'s completeness depending only on Y\'s completeness never on both X and Y, and the operator norm being a supremum over the entire unit ball never just the basis vectors\' images'),
  },
  {
    conceptId: DENSE_SUBSPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'DENSITY IS ONE DEFINITION, STATED ONCE, APPLYING UNIFORMLY IN EVERY BANACH SPACE — NEVER '
      + 'REDEFINED PER EXAMPLE: in X=R, S=the rationals: for ANY real number x and any ε>0, a '
      + 'rational s within ε of x always exists (a sufficiently long decimal truncation) — '
      + 'confirming the closure of the rationals equals R, using EXACTLY the general '
      + 'ε-approximation condition, with no special machinery beyond the definition itself. '
      + 'Believing the density definition must be adapted separately for each specific Banach space '
      + 'is WRONG — a Banach space\'s own norm gives the identical condition whether X is R, '
      + 'C([a,b]), or Lᵖ.\n\n'
      + 'WEIERSTRASS\'S THEOREM IS LITERALLY A DENSITY STATEMENT, WITH AN EXPLICIT WITNESS ALREADY '
      + 'IN HAND — NEVER MERELY ANALOGOUS: the Bernstein construction for f(x)=x² is DIRECTLY the '
      + 'density witness this concept\'s definition requires: taking X=C([0,1]), S=polynomials, the '
      + 'Bernstein polynomials for increasing n give an EXPLICIT sequence in S whose sup-norm '
      + 'distance from f goes to 0, directly witnessing that f lies in the closure of S. Believing '
      + 'Weierstrass\'s theorem is merely SIMILAR to a density claim, rather than a literal instance '
      + 'of this concept\'s definition, is WRONG — it is EXACTLY the statement that the closure of '
      + 'the polynomials equals C([a,b]), with an already-computable witness, never a new existence '
      + 'argument.\n\n'
      + 'WEIERSTRASS, C∞-IN-Lᵖ, AND TRIGONOMETRIC-IN-L² ARE THE SAME PATTERN IN DIFFERENT SPACES — '
      + 'NEVER THREE UNRELATED FACTS: tabulated in uniform language: (1) Weierstrass: X=C([a,b]), '
      + 'S=polynomials — dense via the Bernstein witness. (2) Smoothing: X=Lᵖ(μ), S=C∞ — dense via '
      + 'mollification. (3) Fourier: X=L², S=trigonometric polynomials — dense via Fourier partial '
      + 'sums. Despite entirely different specific spaces and approximating families, each is '
      + 'checked against the IDENTICAL closure-equals-X criterion. Believing these are three '
      + 'unrelated named theorems to memorize separately is WRONG — they are one recurring density '
      + 'pattern, instantiated three times.',
    targetedMisconceptions: [`${DENSE_SUBSPACE}:MC-1`, `${DENSE_SUBSPACE}:MC-2`, `${DENSE_SUBSPACE}:MC-3`],
    source: eb(DENSE_SUBSPACE, 'Core Understanding — density being one definition stated once applying uniformly in every Banach space, Weierstrass\'s theorem being literally a density statement with an explicit witness already in hand, and Weierstrass/smoothing-in-Lp/Fourier-in-L2 being the same pattern in different spaces never three unrelated facts'),
  },
]

export const MATHEMATICS_FNAL_HILBERT_SPACE_BOUNDED_OPERATOR_DENSE_SUBSPACE_PROBES: SeedProbe[] = [
  {
    conceptId: HILBERT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Are 'Hilbert space' and 'Banach space' just two different names for the same class of spaces?",
    choices: [
      { text: "No — the space of continuous functions on [0,1] with the sup-norm is a genuine Banach space (complete) with NO inner product whose induced norm equals the sup-norm, provable via the parallelogram law; Hilbert is the strictly SMALLER subclass whose norm specifically arises from an inner product", isCorrect: true },
      { text: "Yes, Hilbert space and Banach space are just two different names referring to exactly the same class of spaces", isCorrect: false, misconceptionId: `${HILBERT_SPACE}:MC-1` },
      { text: "Since both are defined as \"complete X\" spaces, the extra inner-product-origin requirement should not distinguish them as separate classes", isCorrect: false, misconceptionId: `${HILBERT_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${HILBERT_SPACE}:MC-1`],
    source: eb(HILBERT_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether Hilbert space and Banach space are just two names for the same class, an answer of "yes" confirming HILBERT-AND-BANACH-TREATED-AS-SYNONYMOUS'),
  },
  {
    conceptId: HILBERT_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Projection Theorem guarantee only that a nearest point exists, or also that it is unique?',
    choices: [
      { text: "It guarantees BOTH existence and uniqueness — for the xy-plane in R³ and v=(1,2,5), the nearest point (1,2,0) is not just guaranteed to exist but is the UNIQUE closest point; without uniqueness, \"the projection\" would be ambiguous rather than a single well-defined point", isCorrect: true },
      { text: "The Projection Theorem guarantees only that a nearest point exists, without also guaranteeing that it is unique", isCorrect: false, misconceptionId: `${HILBERT_SPACE}:MC-2` },
      { text: "Since existence results are more commonly emphasized in introductory treatments, the uniqueness part should be treated as a secondary or optional detail", isCorrect: false, misconceptionId: `${HILBERT_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${HILBERT_SPACE}:MC-2`],
    source: eb(HILBERT_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether the Projection Theorem guarantees existence alone or also uniqueness, an answer of "existence alone" confirming PROJECTION-THEOREM-UNIQUENESS-OVERLOOKED'),
  },
  {
    conceptId: HILBERT_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can every norm be written as the square root of some inner product?',
    choices: [
      { text: "No — this is a special property some norms lack; the sup-norm on continuous functions provably fails the parallelogram law for specific chosen functions, proving it has no hidden inner product underneath, even though it is a perfectly legitimate norm", isCorrect: true },
      { text: "Yes, every norm on a vector space can be written as the square root of some inner product", isCorrect: false, misconceptionId: `${HILBERT_SPACE}:MC-3` },
      { text: "Since the Euclidean norm's inner-product origin is so familiar, that same origin should generalize to every other norm as well", isCorrect: false, misconceptionId: `${HILBERT_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${HILBERT_SPACE}:MC-3`],
    source: eb(HILBERT_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether every norm can be written as the square root of some inner product, an answer of "yes" confirming ALL-NORMS-ASSUMED-TO-ARISE-FROM-AN-INNER-PRODUCT'),
  },
  {
    conceptId: BOUNDED_OPERATOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Are 'bounded' and 'continuous' two independent properties you'd need to check separately for a linear map?",
    choices: [
      { text: "No — for a linear map, linearity forces them together via ONE global constant (‖T‖); for T(x,y)=(3x,y) with ‖T‖=3, the same constant 3 directly gives a Lipschitz bound proving continuity everywhere, so boundedness and continuity are the SAME fact, not independent checks", isCorrect: true },
      { text: "Yes, bounded and continuous are two unrelated properties requiring separate verification for a linear map", isCorrect: false, misconceptionId: `${BOUNDED_OPERATOR}:MC-1` },
      { text: "Since for general nonlinear functions boundedness and continuity are genuinely unrelated, that same relationship should hold for linear maps too", isCorrect: false, misconceptionId: `${BOUNDED_OPERATOR}:MC-1` },
    ],
    targetedMisconceptions: [`${BOUNDED_OPERATOR}:MC-1`],
    source: eb(BOUNDED_OPERATOR, 'Discovery Question 1 as a detection probe (verbatim) — whether bounded and continuous are independent properties for a linear map, an answer of "yes" confirming BOUNDED-AND-CONTINUOUS-TREATED-AS-INDEPENDENT'),
  },
  {
    conceptId: BOUNDED_OPERATOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does B(X,Y) being a Banach space depend on whether X itself is complete?',
    choices: [
      { text: "No — B(X,Y)'s completeness depends ONLY on Y's completeness; a Cauchy sequence of operators is controlled pointwise by where it sends vectors, landing in the (complete) TARGET space Y, so B(R²,R²) is guaranteed Banach whenever R² (the target) is, regardless of the source space's completeness", isCorrect: true },
      { text: "Yes, B(X,Y)'s status as a Banach space depends on both X and Y being complete", isCorrect: false, misconceptionId: `${BOUNDED_OPERATOR}:MC-2` },
      { text: "Since intuition suggests everything involved in a construction should need to be complete, both X and Y should be required to be complete for B(X,Y) to be Banach", isCorrect: false, misconceptionId: `${BOUNDED_OPERATOR}:MC-2` },
    ],
    targetedMisconceptions: [`${BOUNDED_OPERATOR}:MC-2`],
    source: eb(BOUNDED_OPERATOR, 'Discovery Question 2 as a detection probe (verbatim) — whether B(X,Y) being Banach depends on X being complete, an answer of "yes" confirming B-X-Y-COMPLETENESS-ASSUMED-TO-NEED-BOTH-SPACES-COMPLETE'),
  },
  {
    conceptId: BOUNDED_OPERATOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you compute ‖T‖ by checking only the images of the basis vectors?',
    choices: [
      { text: "No — the operator norm is a supremum over the ENTIRE unit ball, not just basis vectors; for T(x,y)=(3x,y), the maximizing vector (1,0) happens to be a basis vector only coincidentally, and in general the maximizing vector need not be a basis vector at all", isCorrect: true },
      { text: "Yes, ‖T‖ can be correctly computed by checking only the images of the basis vectors and taking their maximum", isCorrect: false, misconceptionId: `${BOUNDED_OPERATOR}:MC-3` },
      { text: "Since basis vectors are the natural first thing to check and this shortcut sometimes works, it should be treated as a generally valid way to compute ‖T‖", isCorrect: false, misconceptionId: `${BOUNDED_OPERATOR}:MC-3` },
    ],
    targetedMisconceptions: [`${BOUNDED_OPERATOR}:MC-3`],
    source: eb(BOUNDED_OPERATOR, 'Discovery Question 3 as a detection probe (verbatim) — whether the operator norm can be computed by checking only basis-vector images, an answer of "yes" confirming OPERATOR-NORM-COMPUTED-ONLY-AT-BASIS-VECTORS'),
  },
  {
    conceptId: DENSE_SUBSPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does the definition of 'dense subspace' need to be adapted separately for each specific Banach space it's applied to?",
    choices: [
      { text: "No — density is ONE definition, stated once, applying uniformly in EVERY Banach space; in X=R with S=the rationals, the same general epsilon-approximation condition confirms density, with no special machinery beyond the Banach space's own norm, whether X is R, C([a,b]), or Lᵖ", isCorrect: true },
      { text: "Yes, the definition of dense subspace must be adapted separately for each specific Banach space it is applied to", isCorrect: false, misconceptionId: `${DENSE_SUBSPACE}:MC-1` },
      { text: "Since each named approximation theorem is often taught as its own standalone result, the underlying density definition should also be treated as specific to each theorem", isCorrect: false, misconceptionId: `${DENSE_SUBSPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${DENSE_SUBSPACE}:MC-1`],
    source: eb(DENSE_SUBSPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether the density definition needs per-space adaptation, an answer of "yes" confirming DENSITY-DEFINITION-ASSUMED-SPACE-SPECIFIC'),
  },
  {
    conceptId: DENSE_SUBSPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is Weierstrass's theorem a separate result merely similar to a density claim, or literally an instance of this concept's density definition?",
    choices: [
      { text: "It is LITERALLY an instance, never merely analogous — the Bernstein construction for f(x)=x² is DIRECTLY the density witness the definition requires, giving an explicit sequence of polynomials whose sup-norm distance from f goes to 0, exactly the statement that the closure of the polynomials equals C([a,b])", isCorrect: true },
      { text: "Weierstrass's theorem is a separate result merely similar to a density claim, rather than a literal instance of the density definition", isCorrect: false, misconceptionId: `${DENSE_SUBSPACE}:MC-2` },
      { text: "Since Weierstrass's theorem is typically taught in isolation before any general density framework, it should be treated as a distinct result rather than an instance of that framework", isCorrect: false, misconceptionId: `${DENSE_SUBSPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${DENSE_SUBSPACE}:MC-2`],
    source: eb(DENSE_SUBSPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether Weierstrass\'s theorem is merely analogous to density or literally an instance of it, an answer treating it as merely analogous confirming WEIERSTRASS-TREATED-AS-MERELY-ANALOGOUS-TO-DENSITY'),
  },
  {
    conceptId: DENSE_SUBSPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are Weierstrass, the C∞-in-Lᵖ result, and the Fourier trigonometric-density-in-L² result three unrelated facts, or instances of the same pattern?',
    choices: [
      { text: "They are instances of the SAME pattern — despite entirely different specific spaces and approximating families (polynomials in C([a,b]), smooth functions in Lᵖ, trigonometric polynomials in L²), each is checked against the IDENTICAL closure-equals-X density criterion", isCorrect: true },
      { text: "Weierstrass, the C∞-in-Lᵖ result, and the Fourier trigonometric-density result are three unrelated facts that must be memorized separately", isCorrect: false, misconceptionId: `${DENSE_SUBSPACE}:MC-3` },
      { text: "Since different course units or textbook chapters present these results with no explicit unifying framework, they should be treated as genuinely separate, unrelated theorems", isCorrect: false, misconceptionId: `${DENSE_SUBSPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${DENSE_SUBSPACE}:MC-3`],
    source: eb(DENSE_SUBSPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether Weierstrass, C-infinity-in-Lp, and Fourier-in-L2 are unrelated facts or instances of the same pattern, an answer treating them as unrelated confirming NAMED-DENSITY-THEOREMS-TREATED-AS-UNRELATED'),
  },
]

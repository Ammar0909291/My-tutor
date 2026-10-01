/**
 * Batch: dual-space-functional, open-mapping-theorem, spectral-theory
 * (math.fnal) — 7/18 -> 10/18.
 *
 * Fresh Phase 0 frontier recompute after bounded-operator, hilbert-space,
 * and banach-space were all authored: 7 concepts became ready
 * simultaneously (dual-space-functional, open-mapping-theorem, uniform-
 * boundedness, riesz-representation, spectral-theory, fourier-transform,
 * special-functions). Following the established up-to-3-per-batch
 * convention, this batch prioritizes the 3 that themselves unlock
 * further math.fnal concepts (dual-space-functional -> hahn-banach;
 * open-mapping-theorem -> closed-graph-theorem; spectral-theory ->
 * compact-operator-spectrum), leaving the 4 domain-leaf concepts
 * (uniform-boundedness, riesz-representation, fourier-transform,
 * special-functions) for a subsequent batch.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.fnal.dual-space-functional.md,
 * math.fnal.open-mapping-theorem.md, and math.fnal.spectral-theory.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * dual-space-functional's cross-link (math.linalg.dual-space) is
 * authored. open-mapping-theorem's cross-link (math.real.baire-category)
 * is authored. spectral-theory's two cross-links (math.linalg.eigenvalues,
 * math.linalg.spectral-theorem) are both authored — genuine transfer
 * targets.
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

const DUAL_SPACE_FUNCTIONAL = 'math.fnal.dual-space-functional'
const OPEN_MAPPING_THEOREM = 'math.fnal.open-mapping-theorem'
const SPECTRAL_THEORY = 'math.fnal.spectral-theory'

export const MATHEMATICS_FNAL_DUAL_SPACE_FUNCTIONAL_OPEN_MAPPING_SPECTRAL_THEORY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DUAL_SPACE_FUNCTIONAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A FUNCTIONAL IS JUST A BOUNDED OPERATOR WITH SCALAR TARGET — NEVER A FUNDAMENTALLY '
      + 'DIFFERENT OBJECT: on X=R², f(x,y)=x+2y=(1,2)·(x,y): Cauchy-Schwarz gives '
      + '|f(x,y)|≤√5·‖(x,y)‖, with equality at (1,2)/√5, so ‖f‖=√5 — computed via the EXACT same '
      + 'sup-based operator-norm definition as any bounded operator, with NO new machinery. '
      + 'Believing a functional is a fundamentally different kind of object requiring new theory is '
      + 'WRONG — it is simply the special case where the target space is the scalars, with every '
      + 'prior fact about bounded operators applying unchanged.\n\n'
      + "X* IS ALWAYS BANACH, REGARDLESS OF WHETHER X IS COMPLETE — NEVER REQUIRING X ITSELF "
      + 'COMPLETE: let X be polynomials on [0,1] with the sup-norm — NOT complete (a Cauchy sequence '
      + 'of Taylor polynomials for eˣ converges to eˣ, which escapes X). Yet X* (the space of bounded '
      + 'functionals on X) IS STILL a genuine Banach space, since the general fact that B(X,Y) is '
      + 'Banach whenever Y is Banach (no condition on X) applies with the scalar field as target '
      + '(always complete). Believing X* can only be Banach if X itself is already complete is WRONG '
      + '— X*\'s Banach status comes ENTIRELY from the scalar field\'s completeness, independent of '
      + 'X.\n\n'
      + 'REFLEXIVITY IS SPECIAL, NEVER AUTOMATIC FOR EVERY SPACE: the dual of L² is isomorphic to L² '
      + '(self-dual, since 1/2+1/2=1), and L² IS reflexive: its double dual is isomorphic back to L². '
      + 'But the dual of L¹ is isomorphic to L^∞, and the dual of L^∞ is a substantially LARGER, '
      + 'structurally different space than L¹ — L¹ is famously NOT reflexive. Believing every normed '
      + 'or Banach space automatically satisfies X isomorphic to its double dual is WRONG — '
      + 'reflexivity is a genuinely special, checkable property some spaces have (like Lᵖ, 1<p<∞) '
      + 'and others provably lack (like L¹).',
    targetedMisconceptions: [`${DUAL_SPACE_FUNCTIONAL}:MC-1`, `${DUAL_SPACE_FUNCTIONAL}:MC-2`, `${DUAL_SPACE_FUNCTIONAL}:MC-3`],
    source: eb(DUAL_SPACE_FUNCTIONAL, 'Core Understanding — a functional being just a bounded operator with scalar target never a fundamentally different object, X-star always being Banach regardless of whether X is complete, and reflexivity being special never automatic for every space'),
  },
  {
    conceptId: OPEN_MAPPING_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"OPEN" IS ABOUT IMAGES — THE OPPOSITE DIRECTION FROM CONTINUITY\'S PREIMAGES, NEVER THE '
      + 'SAME PROPERTY: for T(x,y)=(x,0) on R² (a bounded, continuous PROJECTION, but NOT '
      + 'surjective — its image is only the x-axis): T is certainly continuous (preimages of open '
      + 'sets are open, guaranteed for any bounded operator). But taking the open unit disk D: T(D) '
      + 'is an open interval on the x-axis, which has EMPTY INTERIOR in R² — NOT an open subset of '
      + 'the codomain. T fails to be open. Believing boundedness/continuity of an operator already '
      + 'guarantees images of open sets are open is WRONG — "open" concerns images, "continuous" '
      + 'concerns preimages, genuinely opposite directions, and one does not imply the other.\n\n'
      + 'COMPLETENESS OF BOTH SPACES IS ESSENTIAL TO THE BOUNDED-INVERSE COROLLARY — NEVER ASSUMED '
      + 'TO HOLD FOR MERELY NORMED SPACES: let X be finitely-supported sequences with the sup norm '
      + '(NOT complete), and T a linear, bounded, bijective map onto X that divides the nth '
      + 'coordinate by n, with inverse that multiplies the nth coordinate by n. Testing the standard '
      + 'basis vector scaled by 1/n as input: applying the inverse gives a vector of norm 1, while '
      + 'the input had norm 1/n — a ratio that grows without bound as n increases. T⁻¹ is UNBOUNDED, '
      + 'despite T being bijective and bounded. Believing the bounded-inverse corollary holds for '
      + 'bijective bounded operators between ANY normed spaces is WRONG — completeness of BOTH '
      + 'spaces is essential, and this space\'s incompleteness is exactly why the corollary fails '
      + 'here.\n\n'
      + 'SURJECTIVITY IS A NECESSARY HYPOTHESIS FOR OPENNESS — NEVER AUTOMATIC FOR EVERY BOUNDED '
      + 'OPERATOR BETWEEN BANACH SPACES: the same projection T(x,y)=(x,0) from above fails to be '
      + 'open PRECISELY because it is not surjective. Believing every bounded linear operator '
      + 'between Banach spaces is automatically open regardless of surjectivity is WRONG — '
      + 'surjectivity is not a technical footnote, it is a REQUIRED hypothesis of the theorem\'s '
      + 'conclusion.',
    targetedMisconceptions: [`${OPEN_MAPPING_THEOREM}:MC-1`, `${OPEN_MAPPING_THEOREM}:MC-2`, `${OPEN_MAPPING_THEOREM}:MC-3`],
    source: eb(OPEN_MAPPING_THEOREM, 'Core Understanding — open being about images the opposite direction from continuity\'s preimages never the same property, completeness of both spaces being essential to the bounded-inverse corollary never assumed for merely normed spaces, and surjectivity being a necessary hypothesis for openness never automatic'),
  },
  {
    conceptId: SPECTRAL_THEORY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE SPECTRUM IS DEFINED VIA INVERTIBILITY, NEVER A DETERMINANT — AND A SPECTRAL POINT NEED '
      + 'NOT BE AN EIGENVALUE: on the space of square-summable sequences, the right shift operator S '
      + '(shifting every entry one place to the right, filling in a 0 at the start), with ‖S‖=1: S '
      + 'is INJECTIVE (Sx=0 forces x=0) but NOT SURJECTIVE (the sequence starting with 1 followed by '
      + 'all zeros is never in S\'s range) — so S has no inverse, meaning 0 is in the spectrum of S. '
      + 'But Sx=0 forces x=0 — there is NO nonzero eigenvector for the value 0. So 0 is in the '
      + 'spectrum yet 0 is NOT an eigenvalue. Believing every spectral value must have a '
      + 'corresponding eigenvector is WRONG — in finite dimensions rank-nullity forces "not '
      + 'invertible" and "has an eigenvector" to coincide, but in infinite dimensions this '
      + 'equivalence BREAKS: a spectral value can arise purely from a failure of surjectivity, with '
      + 'no eigenvector attached at all.\n\n'
      + 'SELF-ADJOINT OPERATORS HAVE REAL SPECTRUM, VERIFIED VIA OPERATOR-THEORETIC ARGUMENTS — '
      + 'NEVER VIA A CHARACTERISTIC POLYNOMIAL: on L²[0,1], the multiplication operator that sends '
      + 'f(x) to x·f(x) is self-adjoint and bounded. For a value outside [0,1]: subtracting that '
      + 'value times the identity acts as multiplication by (x minus that value), invertible with a '
      + 'bounded inverse. For a value inside [0,1]: the corresponding inverse function is UNBOUNDED '
      + 'near that point — no bounded inverse. So the spectrum of this operator is exactly [0,1], '
      + 'entirely real, verified with NO characteristic polynomial computed anywhere. Assuming that '
      + 'verifying a self-adjoint operator\'s spectrum is real requires computing something '
      + 'analogous to a characteristic polynomial is WRONG — the infinite-dimensional proof uses '
      + 'direct invertibility arguments instead, since no polynomial exists for a general '
      + 'operator.\n\n'
      + 'THE SPECTRAL THEOREM\'S SPECTRAL MEASURE IS A QUALITATIVELY DIFFERENT OBJECT — NEVER '
      + 'MERELY A FINITE SUM WITH MORE TERMS: continuing with the multiplication operator: for any '
      + 'value in [0,1], being an eigenvector would force the function to be zero everywhere except '
      + 'at that single point, but a single point has ZERO measure in L²[0,1], so the function must '
      + 'be the zero function — this operator has NO eigenvectors whatsoever, yet its spectrum is '
      + 'the entire continuous interval [0,1]. Contrast this with the finite-dimensional spectral '
      + 'theorem\'s decomposition using actual eigenvalues and eigenvectors. Believing the general '
      + 'Spectral Theorem\'s spectral measure is essentially the finite eigenvalue/eigenvector '
      + 'decomposition with more terms is WRONG — when there are NO eigenvectors to sum over at '
      + 'all, the spectral measure is doing something a finite (or even countable) sum structurally '
      + 'cannot do; it is a genuinely different kind of "diagonalization."',
    targetedMisconceptions: [`${SPECTRAL_THEORY}:MC-1`, `${SPECTRAL_THEORY}:MC-2`, `${SPECTRAL_THEORY}:MC-3`],
    source: eb(SPECTRAL_THEORY, 'Core Understanding — the spectrum being defined via invertibility never a determinant with a spectral point needing not be an eigenvalue, self-adjoint operators having real spectrum verified via operator-theoretic arguments never a characteristic polynomial, and the Spectral Theorem\'s spectral measure being a qualitatively different object never merely a finite sum with more terms'),
  },
]

export const MATHEMATICS_FNAL_DUAL_SPACE_FUNCTIONAL_OPEN_MAPPING_SPECTRAL_THEORY_PROBES: SeedProbe[] = [
  {
    conceptId: DUAL_SPACE_FUNCTIONAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a functional a fundamentally different kind of object from a bounded operator, requiring new machinery to study?',
    choices: [
      { text: "No — a functional is simply the special case of a bounded operator whose target is scalars; for f(x,y)=x+2y on R², its norm √5 is computed via the EXACT same sup-based operator-norm formula used for any bounded operator, with no new machinery required", isCorrect: true },
      { text: "Yes, a functional is a fundamentally different kind of object from a bounded operator, requiring entirely new theory to study", isCorrect: false, misconceptionId: `${DUAL_SPACE_FUNCTIONAL}:MC-1` },
      { text: "Since functionals are often introduced with new notation and vocabulary, they should be treated as a genuinely separate object from bounded operators", isCorrect: false, misconceptionId: `${DUAL_SPACE_FUNCTIONAL}:MC-1` },
    ],
    targetedMisconceptions: [`${DUAL_SPACE_FUNCTIONAL}:MC-1`],
    source: eb(DUAL_SPACE_FUNCTIONAL, 'Discovery Question 1 as a detection probe (verbatim) — whether a functional is fundamentally different from a bounded operator, an answer of "yes" confirming FUNCTIONAL-ASSUMED-FUNDAMENTALLY-DIFFERENT-FROM-BOUNDED-OPERATOR'),
  },
  {
    conceptId: DUAL_SPACE_FUNCTIONAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does X* need X itself to already be a Banach space, in order for X* to be Banach?',
    choices: [
      { text: "No — X*'s Banach status comes ENTIRELY from the scalar field's completeness, independent of X; even for X being polynomials on [0,1] with the sup-norm (NOT complete), X* is still guaranteed Banach, since the target (scalars) is always complete", isCorrect: true },
      { text: "Yes, X* can only be a Banach space if X itself is already a complete, Banach space", isCorrect: false, misconceptionId: `${DUAL_SPACE_FUNCTIONAL}:MC-2` },
      { text: "Since the whole construction of X* is built from X, it should require X itself to already be complete for the construction to succeed", isCorrect: false, misconceptionId: `${DUAL_SPACE_FUNCTIONAL}:MC-2` },
    ],
    targetedMisconceptions: [`${DUAL_SPACE_FUNCTIONAL}:MC-2`],
    source: eb(DUAL_SPACE_FUNCTIONAL, 'Discovery Question 2 as a detection probe (verbatim) — whether X-star needs X itself to already be Banach, an answer of "yes" confirming DUAL-SPACE-COMPLETENESS-ASSUMED-TO-REQUIRE-X-COMPLETE'),
  },
  {
    conceptId: DUAL_SPACE_FUNCTIONAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is every normed or Banach space automatically reflexive, with X isomorphic to its own double dual?',
    choices: [
      { text: "No — reflexivity is a special, checkable property; L² IS reflexive (its double dual is isomorphic back to L²), but L¹ is famously NOT reflexive (its dual is L^∞, whose own dual is substantially larger and structurally different from L¹)", isCorrect: true },
      { text: "Yes, every normed or Banach space automatically satisfies X isomorphic to its double dual", isCorrect: false, misconceptionId: `${DUAL_SPACE_FUNCTIONAL}:MC-3` },
      { text: "Since the dual and double dual are always well-defined constructions, that should mean they always recover the original space", isCorrect: false, misconceptionId: `${DUAL_SPACE_FUNCTIONAL}:MC-3` },
    ],
    targetedMisconceptions: [`${DUAL_SPACE_FUNCTIONAL}:MC-3`],
    source: eb(DUAL_SPACE_FUNCTIONAL, 'Discovery Question 3 as a detection probe (verbatim) — whether every space is automatically reflexive, an answer of "yes" confirming EVERY-SPACE-ASSUMED-REFLEXIVE'),
  },
  {
    conceptId: OPEN_MAPPING_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does boundedness (continuity) of a linear operator already guarantee that it maps open sets to open sets?',
    choices: [
      { text: "No — 'open' concerns images while 'continuous' concerns preimages, genuinely opposite directions; T(x,y)=(x,0) on R² is bounded and continuous (a projection), yet the image of the open unit disk has EMPTY INTERIOR, so T fails to be open despite being continuous", isCorrect: true },
      { text: "Yes, boundedness/continuity of a linear operator already guarantees that images of open sets are open", isCorrect: false, misconceptionId: `${OPEN_MAPPING_THEOREM}:MC-1` },
      { text: "Since 'open' and 'continuous' both sound like general topological niceness properties, they should be treated as essentially the same requirement", isCorrect: false, misconceptionId: `${OPEN_MAPPING_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${OPEN_MAPPING_THEOREM}:MC-1`],
    source: eb(OPEN_MAPPING_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether boundedness already guarantees open images, an answer of "yes" confirming OPEN-MAPPING-CONFLATED-WITH-CONTINUITY'),
  },
  {
    conceptId: OPEN_MAPPING_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the bounded-inverse corollary hold for any bijective bounded linear operator, even between merely normed (not necessarily complete) spaces?',
    choices: [
      { text: "No — completeness of BOTH spaces is essential; on the incomplete space of finitely-supported sequences, a bijective bounded linear map T dividing each coordinate by its index has an inverse T⁻¹ that is genuinely UNBOUNDED, tested on a sequence of shrinking-norm vectors whose ratio grows without bound", isCorrect: true },
      { text: "Yes, the bounded-inverse corollary holds for any bijective bounded linear operator, regardless of whether the spaces involved are complete", isCorrect: false, misconceptionId: `${OPEN_MAPPING_THEOREM}:MC-2` },
      { text: "Since the corollary's statement is often remembered as just \"bijective and bounded implies bounded inverse,\" the completeness requirement should not be essential to it", isCorrect: false, misconceptionId: `${OPEN_MAPPING_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${OPEN_MAPPING_THEOREM}:MC-2`],
    source: eb(OPEN_MAPPING_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether the bounded-inverse corollary holds for merely normed spaces, an answer of "yes" confirming COMPLETENESS-NOT-REQUIRED-FOR-BOUNDED-INVERSE-COROLLARY'),
  },
  {
    conceptId: OPEN_MAPPING_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is every bounded linear operator between Banach spaces automatically open, regardless of whether it is surjective?',
    choices: [
      { text: "No — surjectivity is a REQUIRED hypothesis, not a technical footnote; the non-surjective projection T(x,y)=(x,0) is bounded and continuous between Banach spaces yet fails to be open PRECISELY because its image (the x-axis) is not all of R²", isCorrect: true },
      { text: "Yes, every bounded linear operator between Banach spaces is automatically open, regardless of surjectivity", isCorrect: false, misconceptionId: `${OPEN_MAPPING_THEOREM}:MC-3` },
      { text: "Since the theorem's name emphasizes \"mapping\" in general, surjectivity should not be a specific requirement for openness", isCorrect: false, misconceptionId: `${OPEN_MAPPING_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${OPEN_MAPPING_THEOREM}:MC-3`],
    source: eb(OPEN_MAPPING_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether every bounded operator between Banach spaces is automatically open regardless of surjectivity, an answer of "yes" confirming SURJECTIVITY-NOT-REQUIRED-FOR-OPENNESS'),
  },
  {
    conceptId: SPECTRAL_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If λ is in the spectrum of T, does that mean T must have an eigenvector for λ?',
    choices: [
      { text: "No — on the square-summable sequences, the right-shift operator S is injective but NOT surjective, so 0 is in its spectrum, yet Sx=0 forces x=0, meaning there is NO nonzero eigenvector for 0; in infinite dimensions, a spectral value can arise purely from a failure of surjectivity", isCorrect: true },
      { text: "Yes, every value in the spectrum of T must have a corresponding eigenvector", isCorrect: false, misconceptionId: `${SPECTRAL_THEORY}:MC-1` },
      { text: "Since rank-nullity guarantees \"not invertible\" and \"has an eigenvector\" coincide, that same guarantee should carry over from finite to infinite dimensions", isCorrect: false, misconceptionId: `${SPECTRAL_THEORY}:MC-1` },
    ],
    targetedMisconceptions: [`${SPECTRAL_THEORY}:MC-1`],
    source: eb(SPECTRAL_THEORY, 'Discovery Question 1 as a detection probe (verbatim) — whether a spectral point must have a corresponding eigenvector, an answer of "yes" confirming SPECTRUM-POINT-ASSUMED-TO-BE-EIGENVALUE'),
  },
  {
    conceptId: SPECTRAL_THEORY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "To check that a self-adjoint operator's spectrum is real, do I need to compute something like a characteristic polynomial, just for a bigger case?",
    choices: [
      { text: "No — the infinite-dimensional proof uses direct OPERATOR-THEORETIC invertibility arguments instead; for the multiplication operator on L²[0,1], its spectrum [0,1] is verified by checking directly when multiplication by (x minus a value) has a bounded inverse, with NO characteristic polynomial computed anywhere", isCorrect: true },
      { text: "Yes, verifying a self-adjoint operator's spectrum is real requires computing something analogous to a characteristic polynomial, just scaled up", isCorrect: false, misconceptionId: `${SPECTRAL_THEORY}:MC-2` },
      { text: "Since the finite-dimensional proof method relies on a characteristic polynomial, that same proof method should generalize to infinite-dimensional operators", isCorrect: false, misconceptionId: `${SPECTRAL_THEORY}:MC-2` },
    ],
    targetedMisconceptions: [`${SPECTRAL_THEORY}:MC-2`],
    source: eb(SPECTRAL_THEORY, 'Discovery Question 2 as a detection probe (verbatim) — whether checking a self-adjoint operator\'s real spectrum needs a characteristic-polynomial-style computation, an answer of "yes" confirming REAL-SPECTRUM-PROOF-METHOD-ASSUMED-POLYNOMIAL-BASED'),
  },
  {
    conceptId: SPECTRAL_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the general Spectral Theorem's spectral measure basically the finite-dimensional construction, just with more terms?",
    choices: [
      { text: "No — it is a qualitatively DIFFERENT object; the multiplication operator on L²[0,1] has NO eigenvectors whatsoever (any candidate would have to vanish outside a single measure-zero point) yet its spectrum is the entire continuous interval [0,1], something a finite or even countable sum structurally cannot represent", isCorrect: true },
      { text: "Yes, the general Spectral Theorem's spectral measure is essentially the finite eigenvalue/eigenvector decomposition, just extended with more terms", isCorrect: false, misconceptionId: `${SPECTRAL_THEORY}:MC-3` },
      { text: "Since both \"measure\" and \"sum\" aggregate values in some sense, the spectral measure should be understood as the same construction as a finite sum, merely scaled up", isCorrect: false, misconceptionId: `${SPECTRAL_THEORY}:MC-3` },
    ],
    targetedMisconceptions: [`${SPECTRAL_THEORY}:MC-3`],
    source: eb(SPECTRAL_THEORY, 'Discovery Question 3 as a detection probe (verbatim) — whether the spectral measure is basically the finite construction with more terms, an answer of "yes" confirming SPECTRAL-MEASURE-TREATED-AS-EXTENDED-FINITE-SUM'),
  },
]

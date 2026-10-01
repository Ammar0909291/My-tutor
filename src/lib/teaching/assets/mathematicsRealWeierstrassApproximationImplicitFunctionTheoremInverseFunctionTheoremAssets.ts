/**
 * Batch: weierstrass-approximation, implicit-function-theorem,
 * inverse-function-theorem (math.real).
 *
 * Fresh Phase 0 frontier recompute after the cauchy-sequence/lipschitz-
 * continuity/uniform-convergence batch found 7 ready concepts; this batch
 * prioritizes weierstrass-approximation (uniform-convergence's own fresh
 * unlock, requiring uniform-convergence + compactness, both authored),
 * plus implicit-function-theorem and inverse-function-theorem (both
 * requiring differentiability-rigorous + math.linalg.matrix-inverse,
 * already certified) — closing out the differentiability-rigorous
 * chain entirely. completeness-metric, pointwise-convergence,
 * riemann-integrability, and series-rigorous remain ready and are
 * deferred to the next batch. Transcribed from the frozen Educational
 * Brain entries at educational-brain/concepts/mathematics/math.real.
 * {weierstrass-approximation,implicit-function-theorem,
 * inverse-function-theorem}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   WEIERSTRASS-APPROXIMATION  "Uniformly approximated" means the
 *           worst-case error shrinks to zero across the ENTIRE domain at
 *           once, NEVER merely at individual points the way pointwise
 *           approximation allows; Bernstein polynomials give an EXPLICIT,
 *           computable formula, NEVER merely an abstract existence
 *           argument; and Stone-Weierstrass's vast generalization is
 *           NEVER unconditional — it requires compactness and
 *           point-separation as genuine hypotheses.
 *   IMPLICIT-FUNCTION-THEOREM  Invertibility of the partial derivative
 *           with respect to y is the essential, NON-AUTOMATIC hypothesis
 *           — y is NEVER guaranteed to be a genuine function of x near
 *           just any solution point; the theorem supplies the
 *           justification implicit differentiation has ALWAYS SILENTLY
 *           ASSUMED, NEVER a fact the informal procedure earns for free;
 *           and the same invertibility condition yields an EXPLICIT
 *           derivative formula, NEVER merely an existence guarantee with
 *           no further information.
 *   INVERSE-FUNCTION-THEOREM  The theorem is the 1D inverse-derivative
 *           rule generalized — "invertible" becomes the Jacobian matrix
 *           having a NONZERO DETERMINANT, NEVER merely having some
 *           nonzero entries; the derivative formula is the genuine MATRIX
 *           inverse, NEVER an entrywise reciprocal; and local
 *           invertibility at EVERY point does NOT sum to global
 *           invertibility — the guarantee is honestly and strictly local.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const WEIERSTRASS_APPROXIMATION = 'math.real.weierstrass-approximation'
const IMPLICIT_FUNCTION_THEOREM = 'math.real.implicit-function-theorem'
const INVERSE_FUNCTION_THEOREM = 'math.real.inverse-function-theorem'

export const MATHEMATICS_REAL_WEIERSTRASS_APPROXIMATION_IMPLICIT_FUNCTION_THEOREM_INVERSE_FUNCTION_THEOREM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: WEIERSTRASS_APPROXIMATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"UNIFORMLY APPROXIMATED" MEANS THE WORST-CASE ERROR SHRINKS TO ZERO ACROSS THE ENTIRE '
      + 'DOMAIN AT ONCE: for $f(x)=|x|$ on $[-1,1]$ (continuous but NOT differentiable at 0): '
      + 'the theorem guarantees polynomials whose worst-case distance from $f$, including right '
      + 'at the non-smooth corner at 0, shrinks to zero. This is genuinely strong: mere POINTWISE '
      + 'approximation would leave open the possibility of much slower convergence right at the '
      + 'problematic point.\n\n'
      + 'BERNSTEIN POLYNOMIALS GIVE AN EXPLICIT, COMPUTABLE FORMULA, NEVER MERELY AN ABSTRACT '
      + 'EXISTENCE ARGUMENT: for $f(x)=x^2$ on $[0,1]$, the degree-2 Bernstein polynomial works '
      + 'out to $(0.5x+0.5x^2)$ — an EXPLICIT, computable polynomial anyone can write down and '
      + 'evaluate (at $x=0.5$: this gives 0.375 versus the true value 0.25, a rough but genuine '
      + 'approximation at this low degree). Intuitively, the Bernstein polynomial is a WEIGHTED '
      + "AVERAGE of f's values at grid points, with binomial weights concentrating increasingly "
      + 'sharply around $x$ as the degree grows.\n\n'
      + "COMPACTNESS IS EXACTLY WHAT MAKES STONE-WEIERSTRASS'S VAST GENERALIZATION WORK "
      + '(ORIENTATION LEVEL): Stone-Weierstrass generalizes to ANY compact Hausdorff space and '
      + 'any algebra of continuous functions that SEPARATES POINTS. Applied to the circle with '
      + 'trigonometric polynomials (which separate points, since distinct points have different '
      + 'coordinates): every continuous function on the circle can be uniformly approximated by '
      + 'trigonometric polynomials — a DIFFERENT instance of the SAME theorem, with the circle\'s '
      + "compactness playing the identical structural role [a,b]'s compactness played originally.",
    targetedMisconceptions: [`${WEIERSTRASS_APPROXIMATION}:MC-1`, `${WEIERSTRASS_APPROXIMATION}:MC-2`, `${WEIERSTRASS_APPROXIMATION}:MC-3`],
    source: eb(WEIERSTRASS_APPROXIMATION, 'Core Understanding — uniformly approximated meaning the worst-case error shrinks to zero across the entire domain at once, Bernstein polynomials giving an explicit computable formula never merely an abstract existence argument, and compactness being exactly what makes Stone-Weierstrass\'s vast generalization work'),
  },
  {
    conceptId: IMPLICIT_FUNCTION_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'INVERTIBILITY OF THE PARTIAL DERIVATIVE WITH RESPECT TO Y IS THE ESSENTIAL, NON-AUTOMATIC '
      + 'HYPOTHESIS: for $F(x,y)=x^2+y^2-1$ (the unit circle) at $(0,1)$: $F(0,1)=0$, and the '
      + 'partial derivative with respect to $y$ equals $(2y=2)$, nonzero — INVERTIBLE, so the '
      + 'theorem guarantees $y$ is locally a genuine function of $x$ near $(0,1)$ (indeed '
      + '$y=\\sqrt{1-x^2}$). Contrast $(1,0)$: that same partial derivative equals 0 — NOT '
      + 'invertible, and indeed NO such function exists there (the circle has a VERTICAL tangent, '
      + 'where $x$ cannot be solved for a single-valued $y(x)$).\n\n'
      + 'THE THEOREM SUPPLIES THE JUSTIFICATION IMPLICIT DIFFERENTIATION HAS ALWAYS SILENTLY '
      + 'ASSUMED: for the same circle near $(0,1)$: the informal implicit-differentiation '
      + 'procedure differentiates directly to get $dy/dx=-x/y$ — valid ONLY because the partial '
      + 'derivative with respect to $y$ is nonzero at $(0,1)$. Had this been zero (as at $(1,0)$), '
      + "the SAME steps would produce a formula undefined there, for a y(x) that DOESN'T "
      + "ACTUALLY EXIST — confirming the theorem's hypothesis is the genuine prerequisite the "
      + 'informal procedure never states but always relies on.\n\n'
      + 'THE SAME INVERTIBILITY CONDITION YIELDS AN EXPLICIT DERIVATIVE FORMULA, NEVER MERE '
      + 'EXISTENCE (ORIENTATION LEVEL): the general formula expresses the derivative of $y$ in '
      + 'terms of the two partial derivatives of $F$. For the circle at $(0,1)$: this gives '
      + 'exactly $-x/y$ — EXACTLY matching the implicit-differentiation result, but obtained '
      + 'here directly from the GENERAL invertibility-based formula, not an ad hoc chain-rule '
      + 'manipulation. The theorem does more than certify existence — it hands you the '
      + 'derivative formula directly.',
    targetedMisconceptions: [`${IMPLICIT_FUNCTION_THEOREM}:MC-1`, `${IMPLICIT_FUNCTION_THEOREM}:MC-2`, `${IMPLICIT_FUNCTION_THEOREM}:MC-3`],
    source: eb(IMPLICIT_FUNCTION_THEOREM, "Core Understanding — invertibility of the partial derivative with respect to y being the essential non-automatic hypothesis, the theorem supplying the justification implicit differentiation has always silently assumed, and the same invertibility condition yielding an explicit derivative formula never mere existence"),
  },
  {
    conceptId: INVERSE_FUNCTION_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE THEOREM IS THE 1D INVERSE-DERIVATIVE RULE, GENERALIZED: for a single-variable function '
      + 'with nonzero derivative at a point, that function is locally invertible with a known '
      + 'derivative formula for the inverse. The multivariable theorem generalizes exactly this: '
      + '"invertible derivative" becomes "invertible Jacobian MATRIX" (nonzero determinant, not '
      + 'merely a nonzero scalar), and the reciprocal becomes the matrix inverse. For '
      + '$f(x,y)=(x+y^2,y+x^2)$ at $(1,1)$: the Jacobian matrix there has determinant $-3$, '
      + 'nonzero — invertible, so $f$ is locally invertible near $(1,1)$, with the derivative of '
      + "the inverse obtained PURELY from inverting the Jacobian, with NO need for an explicit "
      + 'formula for the inverse function itself.\n\n'
      + 'THE DERIVATIVE FORMULA IS THE GENUINE MATRIX INVERSE, NEVER AN ENTRYWISE RECIPROCAL: '
      + 'computing the Jacobian\'s inverse requires the actual matrix-inversion procedure (via '
      + 'the determinant and adjugate, or row reduction) — never taking the reciprocal of each '
      + 'entry separately. The $-3$-determinant example above shows this concretely: the correct '
      + 'inverse mixes ALL four entries via the determinant, producing values that bear no '
      + 'resemblance to simple reciprocals of the original entries.\n\n'
      + 'LOCAL INVERTIBILITY EVERYWHERE DOES NOT SUM TO GLOBAL INVERTIBILITY: for '
      + '$f(x,y)=(e^x\\cos y,e^x\\sin y)$ (the real form of the complex exponential): the '
      + "Jacobian's determinant equals $e^{2x}$, strictly positive EVERYWHERE — the theorem "
      + 'applies locally at EVERY point. Yet $f$ is periodic in $y$ with period $(2\\pi)$ — $f$ '
      + 'genuinely FAILS to be globally injective, despite satisfying the theorem\'s local '
      + "hypothesis everywhere. The theorem's guarantee is honestly and strictly local, never "
      + 'automatically extending to a global statement.',
    targetedMisconceptions: [`${INVERSE_FUNCTION_THEOREM}:MC-1`, `${INVERSE_FUNCTION_THEOREM}:MC-2`, `${INVERSE_FUNCTION_THEOREM}:MC-3`],
    source: eb(INVERSE_FUNCTION_THEOREM, 'Core Understanding — the theorem being the 1D inverse-derivative rule generalized with invertibility meaning nonzero determinant, the derivative formula being the genuine matrix inverse never an entrywise reciprocal, and local invertibility everywhere never summing to global invertibility'),
  },
]

export const MATHEMATICS_REAL_WEIERSTRASS_APPROXIMATION_IMPLICIT_FUNCTION_THEOREM_INVERSE_FUNCTION_THEOREM_PROBES: SeedProbe[] = [
  {
    conceptId: WEIERSTRASS_APPROXIMATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Does 'uniformly approximated by polynomials' mean roughly the same as approximated pointwise at each individual x?",
    choices: [
      { text: 'No — for |x| on [-1,1], the theorem guarantees the WORST-CASE error across the entire interval (including at the non-smooth corner at 0) shrinks to zero, a genuinely stronger guarantee than mere pointwise convergence at each x separately', isCorrect: true },
      { text: 'Yes — uniform approximation and pointwise approximation are essentially the same, differing only in phrasing', isCorrect: false, misconceptionId: `${WEIERSTRASS_APPROXIMATION}:MC-1` },
      { text: "Yes, since both notions guarantee the same rate of convergence at every point of the domain", isCorrect: false, misconceptionId: `${WEIERSTRASS_APPROXIMATION}:MC-1` },
    ],
    targetedMisconceptions: [`${WEIERSTRASS_APPROXIMATION}:MC-1`],
    source: eb(WEIERSTRASS_APPROXIMATION, 'Discovery Question 1 as a detection probe (verbatim) — whether uniform approximation means the same as pointwise, an answer of "yes" confirming UNIFORM-APPROXIMATION-ASSUMED-SAME-AS-POINTWISE'),
  },
  {
    conceptId: WEIERSTRASS_APPROXIMATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the Weierstrass approximation theorem\'s proof only show that some approximating polynomials exist abstractly, without a way to construct them?',
    choices: [
      { text: 'No — the Bernstein polynomial for f(x)=x² of degree 2 works out to the explicit formula 0.5x+0.5x², a genuine computable recipe anyone can write down and evaluate, never merely an abstract existence claim', isCorrect: true },
      { text: 'Yes — the proof only establishes that approximating polynomials exist in principle, with no explicit construction available', isCorrect: false, misconceptionId: `${WEIERSTRASS_APPROXIMATION}:MC-2` },
      { text: "Yes, since polynomial approximation theorems are inherently non-constructive by their nature", isCorrect: false, misconceptionId: `${WEIERSTRASS_APPROXIMATION}:MC-2` },
    ],
    targetedMisconceptions: [`${WEIERSTRASS_APPROXIMATION}:MC-2`],
    source: eb(WEIERSTRASS_APPROXIMATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the proof only shows abstract existence, an answer of "yes" confirming WEIERSTRASS-PROOF-ASSUMED-PURELY-ABSTRACT'),
  },
  {
    conceptId: WEIERSTRASS_APPROXIMATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Stone-Weierstrass generalization apply to any topological space and any collection of functions, without any hypothesis like compactness or point-separation?',
    choices: [
      { text: 'No — Stone-Weierstrass requires a COMPACT Hausdorff space and a point-separating algebra of functions; applied to the circle with trigonometric polynomials, both hypotheses genuinely hold, playing the same structural role compactness played on [a,b]', isCorrect: true },
      { text: 'Yes — Stone-Weierstrass generalizes completely unconditionally, applying to any space and any collection of continuous functions whatsoever', isCorrect: false, misconceptionId: `${WEIERSTRASS_APPROXIMATION}:MC-3` },
      { text: "Yes, since the original theorem's compactness requirement was only needed for the specific case of [a,b], not for the general version", isCorrect: false, misconceptionId: `${WEIERSTRASS_APPROXIMATION}:MC-3` },
    ],
    targetedMisconceptions: [`${WEIERSTRASS_APPROXIMATION}:MC-3`],
    source: eb(WEIERSTRASS_APPROXIMATION, 'Discovery Question 3 as a detection probe (verbatim) — whether Stone-Weierstrass applies unconditionally, an answer of "yes" confirming STONE-WEIERSTRASS-ASSUMED-UNCONDITIONAL'),
  },
  {
    conceptId: IMPLICIT_FUNCTION_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is y always guaranteed to be a genuine function of x near any solution (a,b) of F(x,y)=0?',
    choices: [
      { text: 'No — on the unit circle at (0,1), the partial derivative with respect to y is nonzero (invertible), so y is locally a function of x there; but at (1,0), that same partial derivative is zero, and no such function exists (a vertical tangent)', isCorrect: true },
      { text: 'Yes — y is always guaranteed to be a genuine function of x near any solution point of F(x,y)=0', isCorrect: false, misconceptionId: `${IMPLICIT_FUNCTION_THEOREM}:MC-1` },
      { text: "Yes, since any equation relating x and y can always be locally solved for y in terms of x", isCorrect: false, misconceptionId: `${IMPLICIT_FUNCTION_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${IMPLICIT_FUNCTION_THEOREM}:MC-1`],
    source: eb(IMPLICIT_FUNCTION_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether y is always guaranteed to be a function of x, an answer of "yes" confirming Y-ASSUMED-ALWAYS-A-FUNCTION-OF-X'),
  },
  {
    conceptId: IMPLICIT_FUNCTION_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is implicit differentiation's procedure valid to perform regardless of whether this theorem's hypothesis holds?",
    choices: [
      { text: 'No — the algebra of implicit differentiation looks identical whether or not the hypothesis holds, but at a point where the partial derivative with respect to y is zero, the same steps produce a meaningless formula for a y(x) that does not actually exist there', isCorrect: true },
      { text: "Yes — implicit differentiation's algebraic procedure is valid to apply regardless of whether the theorem's invertibility hypothesis holds", isCorrect: false, misconceptionId: `${IMPLICIT_FUNCTION_THEOREM}:MC-2` },
      { text: "Yes, since the chain-rule steps in implicit differentiation are purely algebraic and never depend on any underlying existence theorem", isCorrect: false, misconceptionId: `${IMPLICIT_FUNCTION_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${IMPLICIT_FUNCTION_THEOREM}:MC-2`],
    source: eb(IMPLICIT_FUNCTION_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether implicit differentiation is valid regardless of the hypothesis, an answer of "yes" confirming IMPLICIT-DIFFERENTIATION-ASSUMED-ALWAYS-VALID'),
  },
  {
    conceptId: IMPLICIT_FUNCTION_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the Implicit Function Theorem only guarantee y(x) exists, with no further information about its derivative?",
    choices: [
      { text: "No — the same invertibility condition also yields an explicit derivative formula; for the circle at (0,1), the general formula gives exactly -x/y, matching implicit differentiation's own result but derived directly from the invertibility-based formula", isCorrect: true },
      { text: 'Yes — the theorem only certifies that y(x) exists, providing no additional information about its derivative', isCorrect: false, misconceptionId: `${IMPLICIT_FUNCTION_THEOREM}:MC-3` },
      { text: "Yes, since computing the derivative of an implicitly defined function always requires a separate, unrelated technique", isCorrect: false, misconceptionId: `${IMPLICIT_FUNCTION_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${IMPLICIT_FUNCTION_THEOREM}:MC-3`],
    source: eb(IMPLICIT_FUNCTION_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether the theorem only guarantees existence with no derivative information, an answer of "yes" confirming THEOREM-ASSUMED-EXISTENCE-ONLY'),
  },
  {
    conceptId: INVERSE_FUNCTION_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If Df(x) is invertible at every point of the domain, does that guarantee f is globally invertible?',
    choices: [
      { text: 'No — f(x,y)=(eˣcos y, eˣsin y) has Jacobian determinant e^(2x)>0 everywhere, satisfying the local hypothesis at every point, yet f is periodic in y with period 2π, so it genuinely fails to be globally injective', isCorrect: true },
      { text: 'Yes — if the Jacobian is invertible at every single point of the domain, the function must be globally invertible', isCorrect: false, misconceptionId: `${INVERSE_FUNCTION_THEOREM}:MC-1` },
      { text: "Yes, since local invertibility at every point necessarily composes into one consistent global inverse", isCorrect: false, misconceptionId: `${INVERSE_FUNCTION_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${INVERSE_FUNCTION_THEOREM}:MC-1`],
    source: eb(INVERSE_FUNCTION_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether local invertibility everywhere guarantees global invertibility, an answer of "yes" confirming LOCAL-INVERTIBILITY-EVERYWHERE-CONFLATED-WITH-GLOBAL'),
  },
  {
    conceptId: INVERSE_FUNCTION_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To apply the theorem, is it enough that some entries of Df(a) are nonzero, or must the whole matrix be invertible?',
    choices: [
      { text: 'The whole matrix must be invertible — a matrix with ALL nonzero entries, like [[1,1],[1,1]], can still have a ZERO determinant and fail to be invertible; the hypothesis is about the determinant, never individual entries', isCorrect: true },
      { text: "It is enough that some entries of the Jacobian are nonzero — that alone satisfies the theorem's hypothesis", isCorrect: false, misconceptionId: `${INVERSE_FUNCTION_THEOREM}:MC-2` },
      { text: "Some nonzero entries suffice, since a matrix with any nonzero entry always has a nonzero determinant", isCorrect: false, misconceptionId: `${INVERSE_FUNCTION_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${INVERSE_FUNCTION_THEOREM}:MC-2`],
    source: eb(INVERSE_FUNCTION_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether some nonzero entries suffice for the hypothesis, an answer of "yes, some entries suffice" confirming JACOBIAN-INVERTIBILITY-CONFUSED-WITH-NONZERO-ENTRIES'),
  },
  {
    conceptId: INVERSE_FUNCTION_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is D(f⁻¹)(f(a)) computed by taking the entrywise reciprocal of Df(a)'s entries?",
    choices: [
      { text: 'No — it is the genuine matrix inverse, computed via the determinant and adjugate (or row reduction); for the matrix [[1,2],[2,1]] with determinant -3, the correct inverse mixes all four entries, producing values that bear no resemblance to simple entrywise reciprocals', isCorrect: true },
      { text: 'Yes — the derivative of the inverse function is computed by taking the reciprocal of each entry of Df(a) individually', isCorrect: false, misconceptionId: `${INVERSE_FUNCTION_THEOREM}:MC-3` },
      { text: "Yes, since matrix inversion in this formula reduces to entrywise reciprocals whenever the matrix is diagonal or symmetric", isCorrect: false, misconceptionId: `${INVERSE_FUNCTION_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${INVERSE_FUNCTION_THEOREM}:MC-3`],
    source: eb(INVERSE_FUNCTION_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether the inverse-derivative formula is computed as an entrywise reciprocal, an answer of "yes" confirming INVERSE-DERIVATIVE-FORMULA-MISAPPLIED-AS-ENTRYWISE-RECIPROCAL'),
  },
]

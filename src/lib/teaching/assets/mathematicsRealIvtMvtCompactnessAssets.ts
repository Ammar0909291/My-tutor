/**
 * Batch: ivt, mvt, compactness (math.real).
 *
 * Fresh Phase 0 frontier recompute after the connectedness/
 * differentiability-rigorous/riemann-integral batch found 12 ready
 * concepts; this batch prioritizes math.real.ivt above all else — it is
 * the concept math.num's 5 blocked concepts transitively need
 * (math.num.root-finding requires math.calc.continuity + math.real.ivt;
 * authoring ivt makes root-finding ready, which cascades to unblock
 * math.num.newtons-method, math.num.runge-kutta, math.num.stiff-ode —
 * math.num.euler-method separately still needs math.de.euler-method, a
 * different domain not yet opened). Also closes mvt and compactness, both
 * requiring only already-authored prerequisites (differentiability-
 * rigorous and open-sets respectively). Transcribed from the frozen
 * Educational Brain entries at educational-brain/concepts/mathematics/
 * math.real.{ivt,mvt,compactness}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   IVT  The Intermediate Value Theorem's proof is NEVER new work — it is
 *           connectedness's own corollary, cited rather than re-derived;
 *           proving existence via IVT is NEVER the same task as
 *           computation — a sign change alone suffices, with no solving
 *           or approximating required; and the informal "a continuous
 *           curve can't jump over a value" picture is a correct intuition
 *           but NEVER itself a proof — it restates the conclusion without
 *           justifying it.
 *   MVT  The Mean Value Theorem is NEVER proven by an argument independent
 *           of Rolle's Theorem — it is Rolle's Theorem applied to one
 *           specific auxiliary function that subtracts off the secant
 *           line; a zero derivative throughout an interval forces a
 *           function to be EXACTLY constant, NEVER merely approximately
 *           flat; and the rigorous and applied versions of MVT are NEVER
 *           different facts — they describe the identical result, one
 *           trusted informally and one actually proven.
 *   COMPACTNESS  Compactness demands EVERY open cover succeed — finding
 *           some cover that reduces to a finite subcover is NEVER
 *           sufficient, while one failing cover is a complete disproof;
 *           the Heine-Borel theorem requires closed AND bounded together,
 *           NEVER boundedness alone; and a sequence's limit must land
 *           back INSIDE the set being tested for sequential compactness,
 *           NEVER merely converge to some real number outside it.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const IVT = 'math.real.ivt'
const MVT = 'math.real.mvt'
const COMPACTNESS = 'math.real.compactness'

export const MATHEMATICS_REAL_IVT_MVT_COMPACTNESS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IVT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "IVT'S PROOF IS NOT NEW WORK — IT IS CONNECTEDNESS'S OWN COROLLARY, CITED RATHER THAN "
      + 'RE-DERIVED: connectedness theory already established that continuous images of connected '
      + 'sets are connected, and that connected subsets of R are exactly the intervals. Applying '
      + 'these to $[a,b]$ (connected, being an interval): the image of $[a,b]$ under a continuous '
      + 'function $f$ is connected, hence an interval. Since $f(a)$ and $f(b)$ are both in that '
      + 'image, EVERY value strictly between them is also in the image — some point in $(a,b)$ '
      + 'maps to that value. This IS the proof; this concept\'s job is naming the theorem and '
      + 'using it, not re-deriving what connectedness already proved.\n\n'
      + 'EXISTENCE IS NOT THE SAME TASK AS COMPUTATION: for $f(x)=x^3-x-1$: at $x=1$, $f$ is '
      + 'negative; at $x=2$, $f$ is positive. Since $f$ is continuous on $[1,2]$ and changes '
      + 'sign, IVT guarantees some point in $(1,2)$ where $f$ equals zero — a COMPLETE rigorous '
      + 'existence proof, with NO algebraic solving or approximation. IVT guarantees a root '
      + 'exists but says nothing about WHERE beyond that interval, nor how to find it — those are '
      + 'separate tasks.\n\n'
      + 'THE INFORMAL "CAN\'T JUMP" PICTURE IS A CORRECT INTUITION, NEVER ITSELF A PROOF: "a '
      + 'continuous curve from a negative value to a positive value can\'t jump over zero without '
      + 'crossing it" feels obviously true, but stating it that way is CIRCULAR — it restates '
      + "IVT's conclusion as a picture without justifying WHY continuity forbids the jump. The "
      + 'connectedness-based argument supplies the actual justification: the image must be an '
      + 'interval (a connected subset of R), and an interval containing a negative and a positive '
      + 'value cannot skip zero by definition of "interval" — the picture is a correct intuition '
      + 'pump, but the interval-structure argument is what makes it a proof.',
    targetedMisconceptions: [`${IVT}:MC-1`, `${IVT}:MC-2`, `${IVT}:MC-3`],
    source: eb(IVT, "Core Understanding — IVT's proof never being new work since it is connectedness's own corollary, existence never being the same task as computation, and the informal can't-jump picture being a correct intuition never itself a proof"),
  },
  {
    conceptId: MVT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE MVT IS ROLLE'S THEOREM APPLIED TO ONE SPECIFIC AUXILIARY FUNCTION, NEVER A SEPARATE "
      + "ARGUMENT: Rolle's Theorem states that if $f$ is continuous on $[a,b]$, differentiable on "
      + '$(a,b)$, and $f(a)=f(b)$, then some point in $(a,b)$ has derivative zero. Constructing '
      + 'the auxiliary function $g(x)=f(x)-f(a)-\\frac{f(b)-f(a)}{b-a}(x-a)$: this subtracts off '
      + "the secant line, so g(a)=0 and g(b)=0 BY CONSTRUCTION. Rolle's Theorem applies directly "
      + "to g: some point c has g'(c)=0; since g'(x)=f'(x) minus the secant slope, this means "
      + "f'(c) equals exactly that slope — exactly MVT's conclusion, DERIVED, not asserted.\n\n"
      + "A ZERO DERIVATIVE EVERYWHERE FORCES A FUNCTION TO BE EXACTLY CONSTANT, NEVER JUST "
      + "APPROXIMATELY FLAT: if f'(x)=0 throughout an interval, for ANY two points x1 less than "
      + "x2, MVT gives some c with f'(c) equal to the average rate of change between them. Since "
      + "f'(c)=0, this forces f(x2)=f(x1) EXACTLY, for every such pair — f takes the identical "
      + 'value everywhere on the interval, a precise, provable equality, never an '
      + 'approximation.\n\n'
      + 'THE RIGOROUS AND APPLIED MVT DESCRIBE THE IDENTICAL FACT: the informal calculus '
      + 'treatment already established MVT informally (tangent parallel to secant; instantaneous '
      + 'rate equals average rate somewhere), TRUSTING the theorem\'s existence claim without '
      + 'proving it. For $f(x)=x^2$ on $[1,4]$ (finding $c=2.5$ by solving $f\'(c)=5$ '
      + 'informally): the auxiliary function here satisfies the same endpoint conditions, and '
      + "Rolle's Theorem gives the identical c=2.5 — MATCHING that value exactly, but now DERIVED "
      + 'from Rolle\'s Theorem rather than simply asserted to exist.',
    targetedMisconceptions: [`${MVT}:MC-1`, `${MVT}:MC-2`, `${MVT}:MC-3`],
    source: eb(MVT, "Core Understanding — the MVT being Rolle's Theorem applied to one specific auxiliary function never a separate argument, a zero derivative everywhere forcing a function to be exactly constant never just approximately flat, and the rigorous and applied MVT describing the identical fact"),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COMPACTNESS DEMANDS EVERY COVER SUCCEED — ONE FAILING COVER IS A COMPLETE DISPROOF: for '
      + 'the open interval (0,1), the cover consisting of intervals (1/n,1) for n=2,3,4,... '
      + 'genuinely covers (0,1) (every point eventually falls in one of these), yet ANY finite '
      + 'subcollection, using values of n up to some N, has union (1/N,1) — missing points like '
      + '1/(N+1). No finite subcover exists for THIS cover, and that alone proves (0,1) is NOT '
      + 'compact, regardless of how other covers of (0,1) (like the trivial single-set cover) '
      + 'happen to behave.\n\n'
      + 'HEINE-BOREL NEEDS BOTH CONDITIONS TOGETHER, NEITHER SUFFICES ALONE: (0,1) is bounded but '
      + 'NOT closed (missing limit points 0 and 1) — this failure of closedness alone already '
      + 'rules out compactness by Heine-Borel, matching the direct cover argument above. Contrast '
      + '[0,1]: closed (complement is open) AND bounded — compact by Heine-Borel.\n\n'
      + "THE SEQUENCE'S LIMIT MUST LAND BACK INSIDE THE SET, NOT JUST SOMEWHERE IN R: the "
      + 'sequence 1/n lies entirely in (0,1) and converges (as an ordinary real sequence) to 0 — '
      + 'but 0 is not in (0,1), so this convergence provides NO evidence of (0,1)\'s sequential '
      + 'compactness. The IDENTICAL sequence 1/n, viewed inside [0,1], converges to 0, which IS '
      + 'in [0,1] — here it DOES count as genuine sequential-compactness evidence. The same '
      + 'numerical behavior means something different depending on whether the limit actually '
      + 'belongs to the set being tested.',
    targetedMisconceptions: [`${COMPACTNESS}:MC-1`, `${COMPACTNESS}:MC-2`, `${COMPACTNESS}:MC-3`],
    source: eb(COMPACTNESS, 'Core Understanding — compactness demanding every cover succeed since one failing cover is a complete disproof, Heine-Borel needing both closed and bounded together neither sufficing alone, and a sequence\'s limit needing to land back inside the set never just somewhere in R'),
  },
]

export const MATHEMATICS_REAL_IVT_MVT_COMPACTNESS_PROBES: SeedProbe[] = [
  {
    conceptId: IVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does proving IVT require new argument beyond what connectedness already established?',
    choices: [
      { text: 'No — IVT is a direct corollary: connectedness already shows continuous images of connected sets are connected and that connected subsets of R are intervals; applying these two facts to [a,b] is the entire proof', isCorrect: true },
      { text: 'Yes — IVT requires an entirely new proof technique, separate from anything connectedness established', isCorrect: false, misconceptionId: `${IVT}:MC-1` },
      { text: "Yes, since IVT is a foundational axiom that cannot be derived from any other theorem", isCorrect: false, misconceptionId: `${IVT}:MC-1` },
    ],
    targetedMisconceptions: [`${IVT}:MC-1`],
    source: eb(IVT, 'Discovery Question 1 as a detection probe (verbatim) — whether IVT requires new argument beyond connectedness, an answer of "yes" confirming IVT-ASSUMED-TO-NEED-SEPARATE-PROOF'),
  },
  {
    conceptId: IVT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does applying IVT to prove a root exists also require finding or approximating that root's value?",
    choices: [
      { text: 'No — for f(x)=x³-x-1, checking f(1)<0 and f(2)>0 completes a rigorous existence proof via IVT with zero algebraic solving; IVT guarantees existence but says nothing about locating the value, which is a separate task', isCorrect: true },
      { text: 'Yes — an IVT-based existence proof always also requires solving for or approximating the guaranteed value', isCorrect: false, misconceptionId: `${IVT}:MC-2` },
      { text: "Yes, since proving something exists is logically inseparable from computing its exact location", isCorrect: false, misconceptionId: `${IVT}:MC-2` },
    ],
    targetedMisconceptions: [`${IVT}:MC-2`],
    source: eb(IVT, 'Discovery Question 2 as a detection probe (verbatim) — whether an IVT existence proof also requires computation, an answer of "yes" confirming IVT-ASSUMED-TO-REQUIRE-COMPUTATION'),
  },
  {
    conceptId: IVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is the informal 'continuous curves can't skip values' picture, by itself, a valid proof of IVT?",
    choices: [
      { text: "No — the picture is circular, restating IVT's conclusion rather than justifying it; the actual justification is that the image of a connected interval must itself be an interval, which by definition cannot skip a value between two contained values", isCorrect: true },
      { text: 'Yes — the "curve can\'t jump" picture is itself a complete and valid proof of IVT', isCorrect: false, misconceptionId: `${IVT}:MC-3` },
      { text: "Yes, since visualizing a continuous curve is mathematically equivalent to a rigorous proof by definition", isCorrect: false, misconceptionId: `${IVT}:MC-3` },
    ],
    targetedMisconceptions: [`${IVT}:MC-3`],
    source: eb(IVT, 'Discovery Question 3 as a detection probe (verbatim) — whether the informal picture is itself a valid proof, an answer of "yes" confirming INFORMAL-PICTURE-ASSUMED-TO-BE-A-PROOF'),
  },
  {
    conceptId: MVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is the Mean Value Theorem proven by an argument independent of Rolle's Theorem?",
    choices: [
      { text: "No — MVT is proven by constructing an auxiliary function that subtracts off the secant line, making its values equal at both endpoints, then applying Rolle's Theorem directly to that function; MVT's conclusion is derived, not independently argued", isCorrect: true },
      { text: "Yes — the Mean Value Theorem has its own proof technique entirely separate from Rolle's Theorem", isCorrect: false, misconceptionId: `${MVT}:MC-1` },
      { text: "Yes, since MVT and Rolle's Theorem are two unrelated results that happen to share superficial similarities", isCorrect: false, misconceptionId: `${MVT}:MC-1` },
    ],
    targetedMisconceptions: [`${MVT}:MC-1`],
    source: eb(MVT, "Discovery Question 1 as a detection probe (verbatim) — whether MVT is proven independently of Rolle's Theorem, an answer of \"yes\" confirming MVT-PROVEN-INDEPENDENTLY-OF-ROLLE"),
  },
  {
    conceptId: MVT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does f′=0 throughout an interval only guarantee f is 'roughly flat,' or something stronger?",
    choices: [
      { text: 'Something stronger — applying MVT to any two points in the interval with f\'=0 forces f(x2)=f(x1) EXACTLY for every pair, meaning f is exactly constant throughout, never merely approximately flat', isCorrect: true },
      { text: 'Only roughly flat — a zero derivative throughout an interval merely suggests the function stays approximately the same value', isCorrect: false, misconceptionId: `${MVT}:MC-2` },
      { text: "Only roughly flat, since exact constancy would require checking every single point individually, which is impossible", isCorrect: false, misconceptionId: `${MVT}:MC-2` },
    ],
    targetedMisconceptions: [`${MVT}:MC-2`],
    source: eb(MVT, 'Discovery Question 2 as a detection probe (verbatim) — whether a zero derivative only guarantees approximate constancy, an answer of "only roughly flat" confirming ZERO-DERIVATIVE-ASSUMED-ONLY-APPROXIMATE-CONSTANCY'),
  },
  {
    conceptId: MVT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do the applied and rigorous versions of the Mean Value Theorem prove two genuinely different facts?',
    choices: [
      { text: 'No — for f(x)=x² on [1,4], both the informally-trusted applied version and the rigorous auxiliary-function-based proof land on the identical value c=2.5; they describe the same fact, one trusted and one actually derived', isCorrect: true },
      { text: 'Yes — the rigorous (Rolle-based) MVT and the informally applied MVT are two separate, unrelated results', isCorrect: false, misconceptionId: `${MVT}:MC-3` },
      { text: "Yes, since a rigorously proven version of a theorem always describes a strictly stronger claim than an informally trusted one", isCorrect: false, misconceptionId: `${MVT}:MC-3` },
    ],
    targetedMisconceptions: [`${MVT}:MC-3`],
    source: eb(MVT, 'Discovery Question 3 as a detection probe (verbatim) — whether the applied and rigorous MVT prove different facts, an answer of "yes, different facts" confirming RIGOROUS-AND-APPLIED-MVT-TREATED-AS-DIFFERENT-FACTS'),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If I find one open cover of a set that reduces to a finite subcover, does that prove the set is compact?',
    choices: [
      { text: 'No — compactness requires EVERY open cover to have a finite subcover, not just one convenient cover; (0,1) has some covers that reduce finitely, but the cover {(1/n,1)} does not, which alone proves (0,1) is not compact', isCorrect: true },
      { text: 'Yes — finding one open cover that reduces to a finite subcover is sufficient to prove a set is compact', isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-1` },
      { text: "Yes, since compactness only requires that some suitable cover exists with the finite-subcover property", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPACTNESS}:MC-1`],
    source: eb(COMPACTNESS, 'Discovery Question 1 as a detection probe (verbatim) — whether one reducible cover proves compactness, an answer of "yes" confirming SOME-COVER-REDUCIBLE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS'),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a bounded subset of Rⁿ automatically compact?',
    choices: [
      { text: 'No — (0,1) is bounded but not closed (missing limit points 0 and 1), so by Heine-Borel it fails to be compact; both closed AND bounded are independently required, with [0,1] succeeding where (0,1) fails', isCorrect: true },
      { text: 'Yes — boundedness alone is sufficient to guarantee compactness for any subset of Rⁿ', isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-2` },
      { text: "Yes, since closedness is automatically implied whenever a set is bounded in Euclidean space", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPACTNESS}:MC-2`],
    source: eb(COMPACTNESS, 'Discovery Question 2 as a detection probe (verbatim) — whether a bounded subset of Rⁿ is automatically compact, an answer of "yes" confirming BOUNDED-ALONE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS'),
  },
  {
    conceptId: COMPACTNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a sequence in K having a convergent subsequence, converging to any real number, prove K is sequentially compact?',
    choices: [
      { text: 'No — the sequence 1/n converges to 0, but 0 is not in (0,1), so this provides no evidence of sequential compactness for (0,1); the identical sequence viewed inside [0,1] DOES count, since 0 belongs to [0,1] — the limit must land back inside the set itself', isCorrect: true },
      { text: 'Yes — a sequence in K converging to any real number, regardless of whether that limit is in K, is sufficient evidence of sequential compactness', isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-3` },
      { text: "Yes, since ordinary convergence as real numbers is identical to sequential compactness by definition", isCorrect: false, misconceptionId: `${COMPACTNESS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPACTNESS}:MC-3`],
    source: eb(COMPACTNESS, 'Discovery Question 3 as a detection probe (verbatim) — whether convergence to any real number proves sequential compactness, an answer of "yes" confirming SEQUENCE-CONVERGENCE-TO-ANY-LIMIT-ASSUMED-SUFFICIENT-FOR-SEQUENTIAL-COMPACTNESS'),
  },
]

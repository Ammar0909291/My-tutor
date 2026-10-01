/**
 * Batch: hahn-banach, closed-graph-theorem, uniform-boundedness
 * (math.fnal) — 10/18 -> 13/18.
 *
 * Fresh Phase 0 frontier recompute after dual-space-functional, open-
 * mapping-theorem, and spectral-theory were authored: all 8 remaining
 * math.fnal concepts became ready simultaneously (hahn-banach, closed-
 * graph-theorem, uniform-boundedness, riesz-representation, compact-
 * operator-spectrum, fourier-transform, distributions, special-
 * functions) — every one a domain leaf (unlocks=[]). Following the
 * established up-to-3-per-batch convention, this batch takes the first 3
 * of the 8, leaving the remaining 5 for subsequent batches.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.fnal.hahn-banach.md,
 * math.fnal.closed-graph-theorem.md, and math.fnal.uniform-boundedness.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * None of these 3 concepts declare a KG cross-link (all confirmed
 * cross_links: none in their own Identity sections), so all probes stay
 * self-contained by design, not as a discrepancy fallback.
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

const HAHN_BANACH = 'math.fnal.hahn-banach'
const CLOSED_GRAPH_THEOREM = 'math.fnal.closed-graph-theorem'
const UNIFORM_BOUNDEDNESS = 'math.fnal.uniform-boundedness'

export const MATHEMATICS_FNAL_HAHN_BANACH_CLOSED_GRAPH_UNIFORM_BOUNDEDNESS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: HAHN_BANACH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE EXTENSION PRESERVES THE EXACT NORM — NEVER MERELY "SOME EXTENSION EXISTS": for '
      + 'X=C([0,1]), M=the span of the constant function 1, f(α·1)=α with norm 1 on M: the concrete '
      + 'extension that evaluates g at 0 satisfies |g(0)|≤‖g‖ (so its norm is at most 1) and equals '
      + '1 on the constant function (achieving the bound), giving an extended norm EXACTLY equal to '
      + 'the original functional\'s norm. Believing the theorem only guarantees SOME extension '
      + 'exists, without the norm being preserved exactly, is WRONG — the extension\'s norm EQUALS '
      + 'the original functional\'s norm, not merely bounded by it; this exact equality is the '
      + 'theorem\'s actual strength.\n\n'
      + 'GEOMETRIC SEPARATION OF CONVEX SETS GENUINELY REQUIRES HAHN-BANACH — NEVER AUTOMATIC IN '
      + 'INFINITE DIMENSIONS: in R², an open half-plane and a closed half-plane are separated by a '
      + 'simple linear functional. This finite-dimensional case is intuitive, but in INFINITE '
      + 'dimensions, where geometric intuition fails, the Hahn-Banach geometric form is the DEEP '
      + 'TOOL that still guarantees such a separator exists. Believing disjoint convex sets can '
      + 'always be separated by a hyperplane in infinite-dimensional spaces WITHOUT needing '
      + 'Hahn-Banach as the underlying machinery is WRONG — the geometric form IS the Hahn-Banach '
      + 'theorem, not an independent, automatically-true fact.\n\n'
      + 'THE DUAL SEPARATES EVERY NONZERO POINT — NEVER ASSUME SOME ELEMENT ESCAPES ALL BOUNDED '
      + 'FUNCTIONALS: for any nonzero vector x in any normed space, applying Hahn-Banach to the '
      + 'norm-1 functional defined on the span of x extends to a norm-1 functional on ALL of the '
      + 'space that sends x to its own norm (nonzero). Believing there could exist a nonzero element '
      + 'that every bounded linear functional maps to 0 is WRONG — Hahn-Banach guarantees the dual '
      + 'is RICH ENOUGH to see every nonzero element, making the norm of x equal to the supremum of '
      + '|f(x)| over norm-1 functionals f a genuine identity, never merely an inequality.',
    targetedMisconceptions: [`${HAHN_BANACH}:MC-1`, `${HAHN_BANACH}:MC-2`, `${HAHN_BANACH}:MC-3`],
    source: eb(HAHN_BANACH, 'Core Understanding — the extension preserving the exact norm never merely some extension existing, geometric separation of convex sets genuinely requiring Hahn-Banach never automatic in infinite dimensions, and the dual separating every nonzero point never assuming some element escapes all bounded functionals'),
  },
  {
    conceptId: CLOSED_GRAPH_THEOREM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"CLOSED GRAPH IMPLIES BOUNDED" REQUIRES T DEFINED ON ALL OF X — NEVER JUST A PROPER '
      + 'SUBSPACE: for T on square-summable sequences that multiplies the nth entry by n: a direct '
      + 'estimate on the standard basis vectors shows the operator norm grows without bound, so T is '
      + 'UNBOUNDED. Yet checking the graph condition entry-by-entry, the graph IS closed. This does '
      + 'NOT contradict the theorem, because T is only actually defined on the subset where the '
      + 'output stays square-summable, a PROPER subspace, not all of the sequence space. Believing a '
      + 'closed graph implies boundedness even when T is defined only on a proper subspace of a '
      + 'Banach space is WRONG — the "full-domain" hypothesis is genuinely necessary, and this exact '
      + 'operator is the standard counterexample when it\'s dropped.\n\n'
      + 'COMPLETENESS OF BOTH SPACES IS REQUIRED — NEVER ASSUME CLOSED GRAPH IMPLIES BOUNDED FOR '
      + 'ANY NORMED SPACES: let T(f)=f′ act on continuously differentiable functions equipped with '
      + 'ONLY the sup-norm (not the stronger norm that also controls the derivative) — NOT complete. '
      + 'The graph is still closed in the same sequential sense, yet T is NOT bounded (a sequence of '
      + 'functions shrinking to 0 in sup-norm while their derivatives stay bounded away from 0 shows '
      + 'the ratio blowing up). Believing a closed graph always implies boundedness for linear '
      + 'operators between ANY two normed spaces (complete or not) is WRONG — the theorem\'s '
      + 'conclusion requires BOTH spaces to be Banach; drop completeness and the closed-graph '
      + 'condition can hold for a genuinely unbounded operator.\n\n'
      + 'CLOSED GRAPH IS A JOINT CONDITION ON PAIRS — NEVER SIMPLY THE SAME AS CONTINUITY\'S '
      + 'ONE-SIDED DEFINITION: continuity says a convergent input sequence forces the outputs to '
      + 'converge to the operator\'s value at the limit; closed graph says, ADDITIONALLY, that IF '
      + 'the inputs converge AND the outputs converge to SOME value (not necessarily the operator\'s '
      + 'value yet), THEN that value must equal the operator\'s value there. For an everywhere-'
      + 'defined operator these turn out equivalent (continuity forces the outputs to the right '
      + 'value, and uniqueness of limits then gives the match automatically) — but treating "closed '
      + 'graph" and "continuous at every point" as IDENTICAL definitions, rather than recognizing '
      + 'the theorem precisely encodes their equivalence under completeness, misses the actual '
      + 'content of what makes the theorem non-trivial.',
    targetedMisconceptions: [`${CLOSED_GRAPH_THEOREM}:MC-1`, `${CLOSED_GRAPH_THEOREM}:MC-2`, `${CLOSED_GRAPH_THEOREM}:MC-3`],
    source: eb(CLOSED_GRAPH_THEOREM, 'Core Understanding — closed graph implying bounded requiring T defined on all of X never just a proper subspace, completeness of both spaces being required never assumed for any normed spaces, and closed graph being a joint condition on pairs never simply the same as continuity\'s one-sided definition'),
  },
  {
    conceptId: UNIFORM_BOUNDEDNESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'POINTWISE BOUNDEDNESS NEVER TRIVIALLY GIVES UNIFORM BOUNDEDNESS — THE UBP IS A GENUINELY '
      + 'DEEP THEOREM: for a sequence of functionals Tₙ on the space of absolutely summable '
      + 'sequences that sum the first n weighted entries: for a specific input whose entries decay '
      + 'like 1/k², the running sum diverges, so pointwise boundedness FAILS for this input — and '
      + 'correspondingly the operator norms grow without bound, uniform boundedness also fails. When '
      + 'the hypothesis holds on a Banach space, though, the conclusion is forced: the UBP says '
      + 'pointwise boundedness on a COMPLETE space collapses into a SINGLE global bound on ALL '
      + 'operator norms simultaneously. Believing that if each operator\'s output at a fixed input '
      + 'is finite, the same bound automatically works for every operator in the family (treating '
      + 'UBP as a tautology) is WRONG — this is a genuinely non-trivial theorem, not an immediate '
      + 'consequence of the per-point estimates.\n\n'
      + 'COMPLETENESS OF X, VIA THE BAIRE CATEGORY THEOREM, IS THE ESSENTIAL MECHANISM — NEVER '
      + 'ASSUME THE PRINCIPLE HOLDS FOR ANY NORMED SPACE: on the space of finitely-supported '
      + 'sequences with the sup norm (NOT complete), the operator Tₙ that multiplies the nth entry '
      + 'by n: for each fixed input (finitely many nonzero entries), Tₙ eventually gives 0 for all '
      + 'large n — POINTWISE bounded. But the operator norm of Tₙ is at least n (achieved at the nth '
      + 'basis vector), so the supremum over n is infinite — UNIFORMLY UNBOUNDED, exactly what the '
      + 'UBP would rule out on a COMPLETE space. Believing the Uniform Boundedness Principle holds '
      + 'for any normed space, including non-Banach ones, is WRONG — the Baire Category theorem '
      + '(which requires completeness) is exactly the mechanism that fails here, since an incomplete '
      + 'metric space CAN be a countable union of nowhere-dense sets.\n\n'
      + 'A POINTWISE-CONVERGENT OPERATOR SEQUENCE HAS AUTOMATICALLY UNIFORMLY BOUNDED NORMS — NEVER '
      + 'ASSUME OTHERWISE WITHOUT INVOKING UBP: for the functionals that integrate a continuous '
      + 'function against sin(nt) on [0,1]: the Riemann-Lebesgue lemma gives convergence to 0 for '
      + 'EACH fixed function, so the outputs are pointwise bounded; UBP then IMMEDIATELY guarantees '
      + 'a single uniform bound on all the operator norms — no individual norm bound is needed to '
      + 'state pointwise convergence, yet UBP supplies one anyway. Believing that when an operator '
      + 'sequence converges pointwise but its norms aren\'t individually verified bounded, the limit '
      + 'operator could still somehow be unbounded is WRONG — UBP already forces a uniform bound on '
      + 'the sequence\'s norms from pointwise convergence alone, which then directly bounds the '
      + 'limit operator.',
    targetedMisconceptions: [`${UNIFORM_BOUNDEDNESS}:MC-1`, `${UNIFORM_BOUNDEDNESS}:MC-2`, `${UNIFORM_BOUNDEDNESS}:MC-3`],
    source: eb(UNIFORM_BOUNDEDNESS, 'Core Understanding — pointwise boundedness never trivially giving uniform boundedness since the UBP is a genuinely deep theorem, completeness of X via the Baire Category theorem being the essential mechanism never assumed for any normed space, and a pointwise-convergent operator sequence automatically having uniformly bounded norms'),
  },
]

export const MATHEMATICS_FNAL_HAHN_BANACH_CLOSED_GRAPH_UNIFORM_BOUNDEDNESS_PROBES: SeedProbe[] = [
  {
    conceptId: HAHN_BANACH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the Hahn-Banach theorem only guarantee SOME extension exists, or does it guarantee an extension that preserves the exact norm?',
    choices: [
      { text: "It guarantees an extension that preserves the EXACT norm — for f defined as evaluation on the span of the constant function in C([0,1]), the concrete extension (evaluate at 0) achieves an extended norm EXACTLY equal to the original functional's norm, not merely bounded by it", isCorrect: true },
      { text: "The theorem only guarantees that some extension exists, without necessarily preserving the original functional's exact norm", isCorrect: false, misconceptionId: `${HAHN_BANACH}:MC-1` },
      { text: "Since \"an extension exists\" is the easier fact to state, that weaker guarantee should be treated as the theorem's actual content", isCorrect: false, misconceptionId: `${HAHN_BANACH}:MC-1` },
    ],
    targetedMisconceptions: [`${HAHN_BANACH}:MC-1`],
    source: eb(HAHN_BANACH, 'Discovery Question 1 as a detection probe (verbatim) — whether Hahn-Banach only guarantees some extension or an exact-norm-preserving one, an answer choosing mere existence confirming HAHN-BANACH-EXTENSION-WEAKENED-TO-MERE-EXISTENCE'),
  },
  {
    conceptId: HAHN_BANACH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In infinite-dimensional spaces, can two disjoint convex sets always be separated by a hyperplane, even without the Hahn-Banach theorem?',
    choices: [
      { text: "No — the geometric separation form IS the Hahn-Banach theorem itself, not an independent, automatically-true fact; while finite-dimensional separation (like two half-planes in R²) is intuitive, infinite-dimensional separation genuinely requires Hahn-Banach's machinery as the deep underlying tool", isCorrect: true },
      { text: "Yes, disjoint convex sets in infinite-dimensional spaces can always be separated by a hyperplane, regardless of the Hahn-Banach theorem", isCorrect: false, misconceptionId: `${HAHN_BANACH}:MC-2` },
      { text: "Since the finite-dimensional geometric picture is so intuitive, that same separation should just automatically extend to infinite dimensions without needing extra machinery", isCorrect: false, misconceptionId: `${HAHN_BANACH}:MC-2` },
    ],
    targetedMisconceptions: [`${HAHN_BANACH}:MC-2`],
    source: eb(HAHN_BANACH, 'Discovery Question 2 as a detection probe (verbatim) — whether hyperplane separation in infinite dimensions is automatic without Hahn-Banach, an answer of "yes" confirming HYPERPLANE-SEPARATION-ASSUMED-FREE-IN-INFINITE-DIMENSIONS'),
  },
  {
    conceptId: HAHN_BANACH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Could there be a nonzero element of a Banach space that every bounded linear functional sends to 0?',
    choices: [
      { text: "No — Hahn-Banach guarantees the dual is RICH ENOUGH to separate points; applying the theorem to the norm-1 functional on the span of any nonzero x extends to a norm-1 functional on the whole space that sends x to its own (nonzero) norm", isCorrect: true },
      { text: "Yes, there could exist a nonzero element that every bounded linear functional maps to 0", isCorrect: false, misconceptionId: `${HAHN_BANACH}:MC-3` },
      { text: "Since the corollary that the dual separates points isn't immediately obvious without seeing its derivation, it should be treated as uncertain whether such an element could exist", isCorrect: false, misconceptionId: `${HAHN_BANACH}:MC-3` },
    ],
    targetedMisconceptions: [`${HAHN_BANACH}:MC-3`],
    source: eb(HAHN_BANACH, 'Discovery Question 3 as a detection probe (verbatim) — whether a nonzero element could escape every bounded linear functional, an answer of "yes" confirming DUAL-MIGHT-NOT-SEPARATE-POINTS'),
  },
  {
    conceptId: CLOSED_GRAPH_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If T is defined on a proper subspace of a Banach space (not all of it), does a closed graph still imply boundedness?',
    choices: [
      { text: "No — the \"full-domain\" hypothesis is genuinely necessary; the operator that multiplies the nth entry of a square-summable sequence by n has a closed graph but is UNBOUNDED, because it is only actually defined on a proper subspace where outputs stay square-summable, not all of the space", isCorrect: true },
      { text: "Yes, a closed graph implies boundedness even when T is defined only on a proper subspace of a Banach space", isCorrect: false, misconceptionId: `${CLOSED_GRAPH_THEOREM}:MC-1` },
      { text: "Since the theorem's slogan is often remembered simply as \"closed graph implies bounded,\" the domain requirement should not matter for the conclusion to hold", isCorrect: false, misconceptionId: `${CLOSED_GRAPH_THEOREM}:MC-1` },
    ],
    targetedMisconceptions: [`${CLOSED_GRAPH_THEOREM}:MC-1`],
    source: eb(CLOSED_GRAPH_THEOREM, 'Discovery Question 1 as a detection probe (verbatim) — whether a closed graph on a proper subspace still implies boundedness, an answer of "yes" confirming CLOSED-GRAPH-IMPLIES-BOUNDED-ON-SUBDOMAINS'),
  },
  {
    conceptId: CLOSED_GRAPH_THEOREM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a closed graph imply boundedness for linear operators between any two normed spaces, complete or not?',
    choices: [
      { text: "No — the theorem's conclusion requires BOTH spaces to be Banach; the differentiation operator on continuously differentiable functions under ONLY the sup-norm (not complete) has a closed graph yet is NOT bounded, as shown by a sequence with shrinking sup-norm but non-shrinking derivative norm", isCorrect: true },
      { text: "Yes, a closed graph always implies boundedness for linear operators between any two normed spaces, whether or not they are complete", isCorrect: false, misconceptionId: `${CLOSED_GRAPH_THEOREM}:MC-2` },
      { text: "Since the \"closed graph implies bounded\" slogan is stated concisely, the completeness of the spaces involved should not matter for it to hold", isCorrect: false, misconceptionId: `${CLOSED_GRAPH_THEOREM}:MC-2` },
    ],
    targetedMisconceptions: [`${CLOSED_GRAPH_THEOREM}:MC-2`],
    source: eb(CLOSED_GRAPH_THEOREM, 'Discovery Question 2 as a detection probe (verbatim) — whether a closed graph implies boundedness for any normed spaces regardless of completeness, an answer of "yes" confirming CLOSED-GRAPH-IMPLIES-BOUNDED-WITHOUT-COMPLETENESS'),
  },
  {
    conceptId: CLOSED_GRAPH_THEOREM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Are 'closed graph' and 'continuous at every point' identical conditions?",
    choices: [
      { text: "Not identical in general — closed graph is a JOINT condition on pairs (if inputs converge AND outputs converge to some value, that value must be the operator's value), while continuity is one-sided; the two happen to coincide for everywhere-defined operators between Banach spaces, but that coincidence IS the theorem's content, not a given definitional identity", isCorrect: true },
      { text: "Yes, closed graph and continuous at every point are simply the same condition, stated in two different ways", isCorrect: false, misconceptionId: `${CLOSED_GRAPH_THEOREM}:MC-3` },
      { text: "Since both conditions are stated using similar convergence language, they should be treated as definitionally the same property", isCorrect: false, misconceptionId: `${CLOSED_GRAPH_THEOREM}:MC-3` },
    ],
    targetedMisconceptions: [`${CLOSED_GRAPH_THEOREM}:MC-3`],
    source: eb(CLOSED_GRAPH_THEOREM, 'Discovery Question 3 as a detection probe (verbatim) — whether closed graph and continuous at every point are identical conditions, an answer of "yes" confirming CLOSED-GRAPH-CONFUSED-WITH-CONTINUITY-DEFINITION'),
  },
  {
    conceptId: UNIFORM_BOUNDEDNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If ‖Tₐx‖<∞ for each fixed x, does this automatically mean the same bound works for all α, or do we need extra structure?',
    choices: [
      { text: "Extra structure is needed — the UBP is a genuinely non-trivial theorem, not a tautology; on a Banach space, pointwise boundedness DOES collapse into a single uniform bound, but this is a deep result requiring completeness, never an immediate consequence of the per-point estimates alone", isCorrect: true },
      { text: "Yes, if each individual bound is finite, the same bound automatically works for the whole family of operators, with no extra structure needed", isCorrect: false, misconceptionId: `${UNIFORM_BOUNDEDNESS}:MC-1` },
      { text: "Since \"bounded at every point\" sounds like it should obviously imply \"bounded everywhere at once,\" the UBP should be treated as an immediate, trivial consequence", isCorrect: false, misconceptionId: `${UNIFORM_BOUNDEDNESS}:MC-1` },
    ],
    targetedMisconceptions: [`${UNIFORM_BOUNDEDNESS}:MC-1`],
    source: eb(UNIFORM_BOUNDEDNESS, 'Discovery Question 1 as a detection probe (verbatim) — whether pointwise boundedness automatically gives a uniform bound, an answer of "yes, automatically" confirming POINTWISE-BOUND-ASSUMED-UNIFORM'),
  },
  {
    conceptId: UNIFORM_BOUNDEDNESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the UBP hold for any normed space X, or does completeness genuinely matter?',
    choices: [
      { text: "Completeness genuinely matters — on the space of finitely-supported sequences (NOT complete) with the operator that multiplies the nth entry by n, each fixed input is pointwise bounded, yet the operator norms grow without bound (uniformly unbounded), exactly because the Baire Category mechanism requiring completeness fails here", isCorrect: true },
      { text: "Yes, the Uniform Boundedness Principle holds for any normed space X, including ones that are not complete", isCorrect: false, misconceptionId: `${UNIFORM_BOUNDEDNESS}:MC-2` },
      { text: "Since the theorem's statement is often remembered without explicitly mentioning completeness, that hypothesis should not actually be essential to the conclusion", isCorrect: false, misconceptionId: `${UNIFORM_BOUNDEDNESS}:MC-2` },
    ],
    targetedMisconceptions: [`${UNIFORM_BOUNDEDNESS}:MC-2`],
    source: eb(UNIFORM_BOUNDEDNESS, 'Discovery Question 2 as a detection probe (verbatim) — whether the UBP holds for any normed space or requires completeness, an answer of "yes, any normed space" confirming UBP-ASSUMED-INDEPENDENT-OF-COMPLETENESS'),
  },
  {
    conceptId: UNIFORM_BOUNDEDNESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If Tₙ is a pointwise-convergent sequence of bounded operators, must the limit operator be bounded?',
    choices: [
      { text: "Yes — UBP already guarantees a single uniform bound on the sequence's norms from pointwise convergence alone (e.g. via the Riemann-Lebesgue-lemma example), and this uniform bound then directly bounds the limit operator; no additional individual norm check is needed", isCorrect: true },
      { text: "Not necessarily — even if Tₙx converges pointwise for every x, the limit operator T could still turn out to be unbounded", isCorrect: false, misconceptionId: `${UNIFORM_BOUNDEDNESS}:MC-3` },
      { text: "Since the connection between pointwise convergence and boundedness requires an explicit invocation of UBP that's easy to overlook, the limit's boundedness should be treated as uncertain without checking each operator's norm individually", isCorrect: false, misconceptionId: `${UNIFORM_BOUNDEDNESS}:MC-3` },
    ],
    targetedMisconceptions: [`${UNIFORM_BOUNDEDNESS}:MC-3`],
    source: eb(UNIFORM_BOUNDEDNESS, 'Discovery Question 3 as a detection probe (verbatim) — whether a pointwise-convergent operator sequence\'s limit must be bounded, an answer of "not necessarily" confirming POINTWISE-CONVERGENT-LIMIT-NOT-AUTOMATICALLY-BOUNDED'),
  },
]

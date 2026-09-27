/**
 * Batch: normed-space, convolution (math.fnal) — OPENS the math.fnal domain (0/18).
 *
 * Fresh Phase 0 frontier recompute after math.meas reached 13/13
 * completion: math.fnal is one of the 3 remaining Mathematics domains
 * (fnal 18, top 23, cx 31) and its own frontier has exactly 2 concepts
 * ready simultaneously: normed-space (requires math.linalg.vector-space
 * + math.linalg.norm, both already authored) and convolution (requires
 * math.meas.lebesgue-integral, already authored this campaign). Both
 * roots are otherwise unrelated within math.fnal's own dependency graph
 * (normed-space unlocks completeness -> banach-space -> most of the rest
 * of the domain; convolution has no further math.fnal unlocks), so this
 * batch closes both available roots at once.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.fnal.normed-space.md and
 * math.fnal.convolution.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching the established
 * convention for expert-tier pure-mathematics domains (math.cat,
 * math.abst, math.meas) — functional analysis is genuinely undergraduate
 * /early-graduate real-analysis-adjacent content.
 *
 * normed-space's two KG cross-links (math.linalg.norm,
 * math.real.metric-space) are BOTH authored — genuine transfer targets.
 * convolution's cross-link used for its mastery gate (math.de.fourier-
 * transform) is authored; its other declared cross-link
 * (math.de.convolution-theorem) is also authored per its own EB entry's
 * Curriculum Feedback, though not itself the chosen probe target.
 *
 * Both EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NORMED_SPACE = 'math.fnal.normed-space'
const CONVOLUTION = 'math.fnal.convolution'

export const MATHEMATICS_FNAL_NORMED_SPACE_CONVOLUTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NORMED_SPACE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A NORM IS NEVER A SINGLE, SPACE-INDEPENDENT UNAMBIGUOUS QUANTITY — A VECTOR SPACE CAN CARRY '
      + 'MULTIPLE VALID NORMS: for v=(3,4) in R², the Euclidean norm gives ‖v‖₂=5, but the sup-norm '
      + 'gives ‖v‖∞=max(3,4)=4 — a genuinely DIFFERENT number for the SAME vector. Both '
      + 'independently satisfy all three norm axioms (definiteness, homogeneity, triangle '
      + 'inequality). Asking for "the norm" of (3,4) without specifying which norm is meaningless — '
      + 'a "normed space" always refers to the PAIR (vector space, specific norm), NEVER the vector '
      + 'space alone; Rⁿ alone supports infinitely many valid norms.\n\n'
      + "THE INDUCED METRIC'S AXIOMS FOLLOW DIRECTLY FROM THE NORM'S OWN AXIOMS — NEVER ASSUMED "
      + 'WITHOUT VERIFICATION: d(x,y)=‖x−y‖\'s symmetry, d(x,y)=d(y,x), follows because '
      + '‖x−y‖=‖−(y−x)‖=|−1|·‖y−x‖=‖y−x‖ — DIRECTLY from the norm\'s own homogeneity axiom with '
      + 'α=−1, never an independent fact requiring separate proof. Asserting the induced metric '
      + 'satisfies the metric axioms without tracing each one back to the specific norm axiom that '
      + 'justifies it is WRONG — the mechanism is a direct, step-by-step consequence, not a '
      + 'coincidence.\n\n'
      + 'THE HOMOGENEITY AXIOM MUST BE CHECKED WITH A NEGATIVE SCALAR, NEVER ONLY POSITIVE ONES: '
      + 'for v=(3,4) with α=−2: ‖−2v‖₂=‖(−6,−8)‖₂=√(36+64)=10=|−2|·5 — the ABSOLUTE VALUE |α|=2 '
      + 'correctly makes the result positive even though α itself is negative. Testing homogeneity '
      + 'only with positive scalars misses that ‖αx‖=|α|‖x‖ requires the absolute value precisely '
      + 'BECAUSE norms are always nonnegative — ‖−3v‖=3‖v‖, NEVER −3‖v‖, since a norm can never be '
      + 'negative regardless of the scalar\'s sign.',
    targetedMisconceptions: [`${NORMED_SPACE}:MC-1`, `${NORMED_SPACE}:MC-2`, `${NORMED_SPACE}:MC-3`],
    source: eb(NORMED_SPACE, 'Core Understanding — a norm never being a single space-independent unambiguous quantity since a vector space can carry multiple valid norms, the induced metric\'s axioms following directly from the norm\'s own axioms never assumed without verification, and the homogeneity axiom needing to be checked with a negative scalar never only positive ones'),
  },
  {
    conceptId: CONVOLUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CONVOLUTION IS GENUINELY COMMUTATIVE — NEVER TREATED AS ASYMMETRIC DESPITE THE '
      + 'FLIP-AND-SLIDE PICTURE: for f(x)=g(x)=the indicator function of [0,1]: (f*g)(x)=x on '
      + '[0,1], =2−x on [1,2], else 0 — the "triangle function." The construction LOOKS asymmetric '
      + '(one function held fixed, the other flipped and slid), but substituting u=x−y gives the '
      + 'integral of f(x−y)g(y)dy equal to the integral of f(u)g(x−u)du, which is exactly (g*f)(x) '
      + '— genuinely proving f*g=g*f. Believing f*g and g*f could differ, based on the '
      + 'construction\'s visual asymmetry, is WRONG — a simple change of variables proves the order '
      + 'never actually matters.\n\n'
      + "YOUNG'S INEQUALITY'S EXPONENT RELATIONSHIP IS A GENUINE TRADE-OFF — NEVER AN ARBITRARY "
      + 'FORMULA: the norm of f*g in Lʳ is bounded by the norm of f in Lᵖ times the norm of g in '
      + 'Lᵠ, with 1/r=1/p+1/q−1. For f,g in L¹ (p=q=1): 1/r=1+1−1=1, so r=1 — predicting f*g is in '
      + 'L¹, matching the actual bounded, compactly supported triangle function. For p=1,q=∞ '
      + 'instead: 1/r=1+0−1=0, so r=∞ — a WEAKER but still meaningful conclusion, without assuming '
      + 'g is integrable at all. Treating this exponent relationship as an arbitrary formula to '
      + 'memorize is WRONG — it precisely balances how much integrability each input contributes '
      + 'to the output.\n\n'
      + 'THE CONVOLUTION THEOREM IS A REAL, OFTEN DRAMATIC SIMPLIFICATION — NEVER A MERE '
      + 'CURIOSITY: computing (f*g)(x) directly required a careful piecewise overlap-integral for '
      + 'EVERY x. Using the fact that the Fourier transform of f*g equals the Fourier transform of '
      + 'f times the Fourier transform of g instead replaces that with a SIMPLE pointwise product '
      + 'of two individually simpler transforms. Believing the convolution theorem is mostly a '
      + 'computational curiosity with limited practical value is WRONG — transform, multiply, and '
      + 'transform back is often far easier than computing the convolution integral directly, which '
      + 'is precisely why convolution is central to signal processing.',
    targetedMisconceptions: [`${CONVOLUTION}:MC-1`, `${CONVOLUTION}:MC-2`, `${CONVOLUTION}:MC-3`],
    source: eb(CONVOLUTION, 'Core Understanding — convolution being genuinely commutative never treated as asymmetric despite the flip-and-slide picture, Young\'s inequality\'s exponent relationship being a genuine trade-off never an arbitrary formula, and the convolution theorem being a real often dramatic simplification never a mere curiosity'),
  },
]

export const MATHEMATICS_FNAL_NORMED_SPACE_CONVOLUTION_PROBES: SeedProbe[] = [
  {
    conceptId: NORMED_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the vector (3,4), is its "norm" simply and unambiguously the number 5?',
    choices: [
      { text: "No — a vector space can carry multiple valid norms; the Euclidean norm of (3,4) is 5, but the sup-norm gives max(3,4)=4, a genuinely different number for the same vector; \"the norm\" is meaningless without specifying which norm is meant", isCorrect: true },
      { text: "Yes, the norm of (3,4) is unambiguously 5, regardless of which norm function is being used", isCorrect: false, misconceptionId: `${NORMED_SPACE}:MC-1` },
      { text: "Since \"the norm of a vector\" is commonly used as an everyday phrase, it should refer to a single unambiguous number independent of any specific norm choice", isCorrect: false, misconceptionId: `${NORMED_SPACE}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMED_SPACE}:MC-1`],
    source: eb(NORMED_SPACE, 'Discovery Question 1 as a detection probe (verbatim) — whether the norm of (3,4) is simply and unambiguously 5, an answer of "yes" confirming NORM-TREATED-AS-SPACE-INDEPENDENT-UNIQUE-QUANTITY'),
  },
  {
    conceptId: NORMED_SPACE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does the induced metric's symmetry need independent proof, or does it follow directly from a specific norm axiom?",
    choices: [
      { text: "It follows directly from a specific norm axiom — d(x,y)=‖x−y‖'s symmetry follows because ‖x−y‖=‖−(y−x)‖=|−1|·‖y−x‖=‖y−x‖, a direct consequence of the norm's own homogeneity axiom with α=−1, never an independent fact requiring separate proof", isCorrect: true },
      { text: "Yes, the induced metric's symmetry requires its own independent proof, separate from any specific norm axiom", isCorrect: false, misconceptionId: `${NORMED_SPACE}:MC-2` },
      { text: "Since the formula d(x,y)=‖x−y‖ looks self-evidently symmetric, that should be treated as sufficient without tracing it back to a specific norm axiom", isCorrect: false, misconceptionId: `${NORMED_SPACE}:MC-2` },
    ],
    targetedMisconceptions: [`${NORMED_SPACE}:MC-2`],
    source: eb(NORMED_SPACE, 'Discovery Question 2 as a detection probe (verbatim) — whether the induced metric\'s symmetry needs independent proof or follows from a norm axiom, an answer requiring independent proof confirming INDUCED-METRIC-AXIOMS-ASSUMED-WITHOUT-VERIFICATION'),
  },
  {
    conceptId: NORMED_SPACE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When checking homogeneity, is it enough to test only positive scalars?',
    choices: [
      { text: "No — homogeneity must be checked with a negative scalar too; for v=(3,4) with α=−2, ‖−2v‖₂=√(36+64)=10=|−2|·5, where the ABSOLUTE VALUE |α|=2 correctly makes the result positive even though α itself is negative — testing only positive scalars misses this", isCorrect: true },
      { text: "Yes, testing homogeneity only with positive scalars is sufficient to fully verify the axiom", isCorrect: false, misconceptionId: `${NORMED_SPACE}:MC-3` },
      { text: "Since positive-scalar examples dominate early practice, checking those alone should be enough to confirm homogeneity holds in general", isCorrect: false, misconceptionId: `${NORMED_SPACE}:MC-3` },
    ],
    targetedMisconceptions: [`${NORMED_SPACE}:MC-3`],
    source: eb(NORMED_SPACE, 'Discovery Question 3 as a detection probe (verbatim) — whether testing homogeneity with only positive scalars is enough, an answer of "yes" confirming NORM-AXIOMS-CHECKED-ONLY-FOR-POSITIVE-SCALARS'),
  },
  {
    conceptId: CONVOLUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Could f*g and g*f be genuinely different functions, given how asymmetric the flip-and-slide construction looks?',
    choices: [
      { text: "No — despite the visually asymmetric construction, substituting u=x−y in the convolution integral directly proves f*g=g*f; for f=g=the indicator of [0,1], both give the identical triangle function, confirming the order never actually matters", isCorrect: true },
      { text: "Yes, f*g and g*f could genuinely be different functions, since the flip-and-slide construction treats the two functions asymmetrically", isCorrect: false, misconceptionId: `${CONVOLUTION}:MC-1` },
      { text: "Since one function is held fixed while the other is flipped and slid, that visual asymmetry should mean the result depends on which function plays each role", isCorrect: false, misconceptionId: `${CONVOLUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${CONVOLUTION}:MC-1`],
    source: eb(CONVOLUTION, 'Discovery Question 1 as a detection probe (verbatim) — whether f*g and g*f could be genuinely different given the asymmetric construction, an answer of "yes" confirming CONVOLUTION-ASSUMED-NON-COMMUTATIVE'),
  },
  {
    conceptId: CONVOLUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Is Young's inequality's exponent relationship an arbitrary formula, or a genuine trade-off?",
    choices: [
      { text: "It is a genuine trade-off — for f,g in L¹ (p=q=1), 1/r=1+1−1=1 gives r=1 (matching the actual bounded triangle function), while for p=1,q=∞, 1/r=1+0−1=0 gives r=∞, a weaker but still meaningful conclusion; the relationship precisely balances each input's integrability contribution", isCorrect: true },
      { text: "Young's inequality's exponent relationship is an arbitrary formula to memorize, with no deeper balancing logic behind it", isCorrect: false, misconceptionId: `${CONVOLUTION}:MC-2` },
      { text: "Since the formula is often presented as a fixed relationship to apply mechanically, it should be treated as an arbitrary rule rather than expressing any specific trade-off", isCorrect: false, misconceptionId: `${CONVOLUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${CONVOLUTION}:MC-2`],
    source: eb(CONVOLUTION, 'Discovery Question 2 as a detection probe (verbatim) — whether Young\'s inequality\'s exponent relationship is arbitrary or a genuine trade-off, an answer treating it as arbitrary confirming YOUNGS-INEQUALITY-EXPONENTS-ASSUMED-ARBITRARY'),
  },
  {
    conceptId: CONVOLUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the convolution theorem mostly a curiosity, or a genuine practical simplification?',
    choices: [
      { text: "It is a genuine, often dramatic simplification — computing (f*g)(x) directly requires a careful piecewise overlap-integral for every x, while the convolution theorem replaces that with a SIMPLE pointwise product of two individually simpler Fourier transforms, which is why it is central to signal processing", isCorrect: true },
      { text: "The convolution theorem is mostly a computational curiosity with limited practical value beyond an interesting mathematical identity", isCorrect: false, misconceptionId: `${CONVOLUTION}:MC-3` },
      { text: "Since the convolution theorem is an abstract identity, it should be treated as mathematical trivia rather than a tool with genuine practical impact", isCorrect: false, misconceptionId: `${CONVOLUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${CONVOLUTION}:MC-3`],
    source: eb(CONVOLUTION, 'Discovery Question 3 as a detection probe (verbatim) — whether the convolution theorem is mostly a curiosity or a genuine practical simplification, an answer treating it as a curiosity confirming CONVOLUTION-THEOREM-ASSUMED-MERE-CURIOSITY'),
  },
]

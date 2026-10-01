/**
 * Batch: polynomial functions (evaluation, sign-change search, end-behavior
 * limits), vertex form of a quadratic, and even/odd functions (all
 * math.func).
 *
 * math.func.polynomial-function becomes ready off already-authored
 * math.func.quadratic-function (prior batch) and math.alg.polynomial, and
 * directly unblocks math.func.end-behavior, math.func.rational-root, and
 * math.func.rational-function next. math.func.vertex-form becomes ready
 * off already-authored math.func.quadratic-function and math.alg.
 * completing-the-square. math.func.even-odd-functions becomes ready off
 * already-authored math.func.graph-of-function (two batches prior).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.polynomial-function.md,
 * math.func.vertex-form.md, and math.func.even-odd-functions.md.
 *
 *   POLYFUNC  polynomial-function — end-behavior tells you what happens
 *             at the EXTREMES, never the entire shape — a dip or bump in
 *             the interior can be completely hidden from an end-behavior
 *             claim alone; a sign change between two evaluated points
 *             guarantees a root ONLY because polynomials are continuous,
 *             never a universal rule safe for functions with breaks or
 *             jumps; evaluating p(3) (input known) and solving p(x)=3
 *             (output known) run in OPPOSITE directions, never the same
 *             procedure.
 *   VERTEXFORM vertex-form — the sign inside the bracket in a(x-h)²+k is
 *             OPPOSITE to what it might visually suggest — the vertex is
 *             at x=h exactly as written, never negated; k is a minimum
 *             or maximum depending ENTIRELY on the sign of a, never a
 *             fixed universal minimum; the vertex and the y-intercept are
 *             GENUINELY DIFFERENT points unless h=0, never conflated as
 *             the same "key point."
 *   EVENODD   even-odd-functions — the algebraic test f(-x) versus f(x)
 *             versus -f(x) is the ground truth, applied to the WHOLE
 *             function, never a per-term or per-exponent shortcut for a
 *             sum with mixed parity; failing both the even and odd tests
 *             means NEITHER — a genuine, complete third category, never
 *             "both"; even symmetry is about the y-AXIS and odd is about
 *             the ORIGIN — x-axis symmetry is structurally IMPOSSIBLE for
 *             any nonzero function, never a valid classification.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POLYFUNC = 'math.func.polynomial-function'
const VERTEXFORM = 'math.func.vertex-form'
const EVENODD = 'math.func.even-odd-functions'

export const MATHEMATICS_FUNCTIONS_POLYNOMIAL_VERTEX_FORM_EVEN_ODD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POLYFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Evaluating a polynomial is ordinary SUBSTITUTION, never a new procedure: p(x)=2x³-5x²+x+3 at x=2 '
      + 'means replacing every x with 2 and computing, p(2)=16-20+2+3=1.\n\n'
      + 'A sign change between two evaluated points guarantees a root between them — BECAUSE polynomials '
      + 'are CONTINUOUS: if p(-1)=-5 and p(0)=3, p(x) cannot jump from negative to positive without '
      + 'passing through zero, since a polynomial graph has no breaks, holes, or jumps. This safety '
      + 'depends entirely on continuity — applying the identical sign-change rule to a function with a '
      + 'genuine break (like 1/x, undefined at x=0) can produce a false conclusion, never a universally '
      + 'safe shortcut.\n\n'
      + 'End-behavior tells you what happens at the EXTREMES, never the entire shape in between: '
      + 'p(x)=x⁴-5x²+4 goes up on both ends (even degree, positive leading coefficient), but evaluating '
      + 'p(1.5)=-2.1875 reveals a dip below the x-axis that "up on both ends" completely conceals. Full '
      + 'shape prediction needs BOTH end-behavior (the extremes) AND strategic evaluation (the interior) '
      + 'together — neither tool alone is sufficient.\n\n'
      + 'Evaluating p(3) (input known, find the output) and solving p(x)=3 (output known, find the '
      + 'input) run in OPPOSITE directions through the identical expression, never the same procedure '
      + 'despite the similar notation.',
    targetedMisconceptions: [`${POLYFUNC}:MC-1`, `${POLYFUNC}:MC-2`, `${POLYFUNC}:MC-3`],
    source: eb(POLYFUNC, 'Core Understanding — end-behavior describes only the extremes never the full shape, a sign-change root guarantee depends specifically on continuity, and evaluating at a known input differs from solving for an unknown input'),
  },
  {
    conceptId: VERTEXFORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'In f(x)=a(x-h)²+k, the vertex is at x=h — the vertex is never read directly from standard-form '
      + 'coefficients b and c, and requires the genuine formula h=-b/(2a), k=f(h), or completing the '
      + 'square. The sign INSIDE the bracket is OPPOSITE to what it might visually suggest: x-h=0 exactly '
      + 'when x=h, so (x-3)² has vertex x=3 (never -3), and (x+2)²=(x-(-2))² has vertex x=-2. The minus '
      + 'sign is part of the formula\'s structure, never a signal to negate h.\n\n'
      + 'k is the function\'s value AT the vertex — but whether that value is a minimum or a maximum '
      + 'depends ENTIRELY on the sign of a: a>0 opens up, the vertex is the LOWEST point, k is the '
      + 'MINIMUM; a<0 opens down, the vertex is the HIGHEST point, k is the MAXIMUM. The identical '
      + 'numeric value of k can be either, depending purely on the sign of a — there is no universal '
      + 'rule that k is always the minimum.\n\n'
      + 'The vertex (h,k) and the y-intercept f(0)=ah²+k are GENUINELY DIFFERENT points unless h=0 — the '
      + 'vertex is a structural feature (the extremum), while the y-intercept is an evaluation at one '
      + 'specific input, never the same "key point" question.',
    targetedMisconceptions: [`${VERTEXFORM}:MC-1`, `${VERTEXFORM}:MC-2`, `${VERTEXFORM}:MC-3`],
    source: eb(VERTEXFORM, 'Core Understanding — the vertex is never read directly from standard-form coefficients, the sign inside the bracket is opposite to what it visually suggests, and k is a minimum or maximum depending entirely on the sign of a, while the vertex and y-intercept remain genuinely different points'),
  },
  {
    conceptId: EVENODD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'f is even iff f(-x)=f(x) for EVERY x; f is odd iff f(-x)=-f(x) for EVERY x — universal claims '
      + 'verified by substituting -x into the ENTIRE expression and simplifying, never by checking one '
      + 'convenient number or applying a per-term exponent shortcut. For f(x)=x²+x: f(-x)=x²-x, which '
      + 'equals neither f(x) nor -f(x) — the exponent shortcut that works for a single monomial fails '
      + 'for a sum with mixed-parity terms.\n\n'
      + 'A function can be NEITHER even nor odd — this is a genuine, complete third category, never a '
      + 'failure state requiring further classification. Failing BOTH the even test and the odd test '
      + 'means NEITHER, never "both": for f(x)=eˣ, f(-x)=e⁻ˣ matches neither eˣ nor -eˣ, so f is simply '
      + 'neither — the only function that is both even and odd is f(x)=0.\n\n'
      + 'Even symmetry means reflection across the y-AXIS; odd symmetry means 180° rotation about the '
      + 'ORIGIN; x-axis symmetry is structurally IMPOSSIBLE for any nonzero function, since it would '
      + 'require both (x,y) and (x,-y) on the graph for the same x — two different outputs for one '
      + 'input, directly violating the vertical line test.',
    targetedMisconceptions: [`${EVENODD}:MC-1`, `${EVENODD}:MC-2`, `${EVENODD}:MC-3`],
    source: eb(EVENODD, 'Core Understanding — the algebraic parity test must be applied to the whole function rather than a per-term shortcut, failing both tests means the genuine third category neither rather than both, and even symmetry is about the y-axis while x-axis symmetry is structurally impossible'),
  },
]

export const MATHEMATICS_FUNCTIONS_POLYNOMIAL_VERTEX_FORM_EVEN_ODD_PROBES: SeedProbe[] = [
  // --- math.func.polynomial-function ------------------------------------------
  {
    conceptId: POLYFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'p(x)=x⁴-5x²+4 goes up on both ends. Does the graph ever dip below the x-axis?',
    choices: [
      { text: 'Yes — evaluating p(1.5)=(1.5)⁴-5(1.5)²+4=-2.1875 directly reveals a dip below the x-axis; end-behavior told the truth about the far edges, but it never promised anything about the middle, which is what evaluation is for', isCorrect: true },
      { text: 'No — since the graph goes up on both ends, it must stay non-negative everywhere in between, matching the pattern set by the extremes', isCorrect: false, misconceptionId: `${POLYFUNC}:MC-1` },
      { text: 'The graph cannot be analyzed for interior dips without first knowing all of its roots exactly', isCorrect: false, misconceptionId: `${POLYFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${POLYFUNC}:MC-1`],
    source: eb(POLYFUNC, 'Detection probe for MC-1 — p(x)=x^4-5x^2+4 goes up on both ends; does the graph ever dip below the x-axis'),
  },
  {
    conceptId: POLYFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=1/x, f(-1)=-1 and f(1)=1 — opposite signs. Does that guarantee a root somewhere in (-1,1)?',
    choices: [
      { text: 'No — 1/x is undefined (and jumps) at x=0, so it is NOT continuous on (-1,1); the sign-change rule requires no gaps between the two points, and this guarantee holds automatically for polynomials but is not automatically safe for other function families', isCorrect: true },
      { text: 'Yes — opposite signs at two points always guarantee a root between them for any function, regardless of whether it has breaks or jumps', isCorrect: false, misconceptionId: `${POLYFUNC}:MC-2` },
      { text: 'Yes, since f(x)=1/x is a simple algebraic expression and all such expressions are automatically continuous everywhere', isCorrect: false, misconceptionId: `${POLYFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${POLYFUNC}:MC-2`],
    source: eb(POLYFUNC, 'Detection probe for MC-2 — for f(x)=1/x, f(-1)=-1 and f(1)=1, opposite signs; does that guarantee a root somewhere in (-1,1)'),
  },
  {
    conceptId: POLYFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'p(x)=x²-4. What is p(3)? And separately: for what value of x is p(x)=3?',
    choices: [
      { text: 'p(3)=9-4=5 (direct substitution, one determined output); solving p(x)=3 means x²-4=3, so x²=7, giving x=±√7 — a genuinely different task requiring equation-solving, never answered by re-evaluating at x=3', isCorrect: true },
      { text: 'Both questions are answered identically by substituting 3 for x in the formula, since "p(3)" and "p(x)=3" refer to the same operation', isCorrect: false, misconceptionId: `${POLYFUNC}:MC-3` },
      { text: 'p(3)=3 by definition, and solving p(x)=3 gives x=3 as well, since both expressions reference the same numeral', isCorrect: false, misconceptionId: `${POLYFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${POLYFUNC}:MC-3`],
    source: eb(POLYFUNC, 'Discovery Question 3 — what\'s the difference between the question what does p output when I put in 3, and the question what input makes p output 3; are they ever the same question'),
  },

  // --- math.func.vertex-form ------------------------------------------
  {
    conceptId: VERTEXFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x²-6x+5, is the vertex (-6,5)?',
    choices: [
      { text: 'No — the correct vertex requires h=-(-6)/(2(1))=3 and k=f(3)=9-18+5=-4, giving vertex (3,-4); the vertex is never read directly from the visible coefficients b and c, and must be computed via the genuine formula', isCorrect: true },
      { text: 'Yes — the vertex of a quadratic in standard form ax²+bx+c is always the point (b,c), reading the coefficients directly', isCorrect: false, misconceptionId: `${VERTEXFORM}:MC-1` },
      { text: 'Yes, since the vertex coordinates always match the linear and constant coefficients exactly, regardless of the value of a', isCorrect: false, misconceptionId: `${VERTEXFORM}:MC-1` },
    ],
    targetedMisconceptions: [`${VERTEXFORM}:MC-1`],
    source: eb(VERTEXFORM, 'Detection probe for MC-1 — for f(x)=x^2-6x+5, is the vertex (-6,5)'),
  },
  {
    conceptId: VERTEXFORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=(x-3)², is the vertex at (-3,0) or (3,0)? Find the x that makes the bracket equal to zero.',
    choices: [
      { text: '(3,0) — the bracket x-3 equals zero exactly at x=3, so the vertex is at x=3, sign included, exactly as written; the visible minus sign is part of the formula\'s structure, never a signal to negate h', isCorrect: true },
      { text: '(-3,0) — the minus sign inside the bracket directly indicates the vertex\'s x-coordinate is negative 3', isCorrect: false, misconceptionId: `${VERTEXFORM}:MC-2` },
      { text: 'Neither — a squared expression like (x-3)² has no single identifiable vertex point', isCorrect: false, misconceptionId: `${VERTEXFORM}:MC-2` },
    ],
    targetedMisconceptions: [`${VERTEXFORM}:MC-2`],
    source: eb(VERTEXFORM, 'Discovery Question 1 — for f(x)=(x-3)^2, is the vertex at (-3,0) or (3,0); find the x that makes the bracket equal to zero'),
  },
  {
    conceptId: VERTEXFORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=-2(x-1)²+8, is 8 the minimum value of f?',
    choices: [
      { text: 'No — a=-2<0, so the parabola opens DOWN, meaning the vertex is the HIGHEST point; 8 is the MAXIMUM, not the minimum; checking the sign of a first is required, since the same numeric value of k can be either a minimum or a maximum', isCorrect: true },
      { text: 'Yes — the vertex value k is always the minimum of a quadratic function, regardless of the sign of a', isCorrect: false, misconceptionId: `${VERTEXFORM}:MC-3` },
      { text: 'Yes, since a negative leading coefficient always produces a minimum rather than a maximum', isCorrect: false, misconceptionId: `${VERTEXFORM}:MC-3` },
    ],
    targetedMisconceptions: [`${VERTEXFORM}:MC-3`],
    source: eb(VERTEXFORM, 'Detection probe for MC-3 — for f(x)=-2(x-1)^2+8, is 8 the minimum value of f'),
  },

  // --- math.func.even-odd-functions ------------------------------------------
  {
    conceptId: EVENODD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is f(x)=x²+x even, odd, or neither? Does the exponent shortcut that worked for x² alone still work here?',
    choices: [
      { text: 'Neither — f(-x)=(-x)²+(-x)=x²-x, which equals neither f(x)=x²+x nor -f(x)=-x²-x; the exponent shortcut works only for a single monomial, never for a sum with mixed-parity terms, which must be tested as a whole', isCorrect: true },
      { text: 'Even — since it contains an x² term, and even exponents make a function even regardless of any other terms present', isCorrect: false, misconceptionId: `${EVENODD}:MC-1` },
      { text: 'Odd — since it contains an x term, and odd exponents make a function odd regardless of any other terms present', isCorrect: false, misconceptionId: `${EVENODD}:MC-1` },
    ],
    targetedMisconceptions: [`${EVENODD}:MC-1`],
    source: eb(EVENODD, 'Discovery Question 1 — is f(x)=x^2+x even, odd, or neither; does the exponent shortcut that worked for x^2 alone still work here'),
  },
  {
    conceptId: EVENODD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=eˣ: f(-x)=e⁻ˣ≠eˣ and e⁻ˣ≠-eˣ. Is f both even and odd?',
    choices: [
      { text: 'No — failing both tests means f is NEITHER even nor odd, a genuine and complete third category; the ONLY function that is both even and odd is f(x)=0, so any other function failing both tests is simply neither', isCorrect: true },
      { text: 'Yes — since f(-x) does not equal f(x) exactly and does not equal -f(x) exactly, f must combine properties of both classifications', isCorrect: false, misconceptionId: `${EVENODD}:MC-2` },
      { text: 'Yes, since eˣ is always positive, which is a shared property of both even and odd functions in general', isCorrect: false, misconceptionId: `${EVENODD}:MC-2` },
    ],
    targetedMisconceptions: [`${EVENODD}:MC-2`],
    source: eb(EVENODD, 'Detection probe for MC-2 — for f(x)=e^x, f(-x)=e^-x which does not equal e^x and does not equal -e^x; is f both even and odd'),
  },
  {
    conceptId: EVENODD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the graph of f(x)=x² symmetric about the x-axis or the y-axis? What would x-axis symmetry require of the function\'s outputs?',
    choices: [
      { text: 'The y-axis — points like (1,1) and (-1,1) are mirror images across the vertical y-axis; x-axis symmetry would require BOTH (1,1) and (1,-1) on the graph for the same x=1, which is structurally IMPOSSIBLE for a genuine function (only one output per input)', isCorrect: true },
      { text: 'The x-axis — even functions are, by definition, symmetric about the horizontal x-axis', isCorrect: false, misconceptionId: `${EVENODD}:MC-3` },
      { text: 'Both axes simultaneously, since an even function like x² is fully symmetric in every direction', isCorrect: false, misconceptionId: `${EVENODD}:MC-3` },
    ],
    targetedMisconceptions: [`${EVENODD}:MC-3`],
    source: eb(EVENODD, 'Discovery Question 3 — is the graph of f(x)=x^2 symmetric about the x-axis or the y-axis; what would x-axis symmetry require of the function\'s outputs'),
  },
]

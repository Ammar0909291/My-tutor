/**
 * Batch: generating-functions, divide-conquer-recurrence, graph-types
 * (math.disc).
 *
 * Continues math.disc (15/32 -> 18/32) after the stars-bars/pigeonhole/
 * derangements batch. Fresh frontier recompute found 13 ready concepts;
 * these 3 selected for downstream value: generating-functions unlocks 2
 * further concepts (ogf, egf), divide-conquer-recurrence unlocks
 * algorithm-complexity (itself unlocking complexity-classes — a 2-deep
 * chain, even though its own EB entry's Curriculum Feedback notes a
 * Blueprint/KG discrepancy on this exact unlock, resolved toward the live
 * KG's `requires` field, which is what this frontier computation reads
 * from directly), and graph-types closes another leaf of the graph-theory
 * subtree. Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.disc.{generating-functions,
 * divide-conquer-recurrence,graph-types}.md.
 *
 * Grade band: generating-functions (EB difficulty "expert," the highest
 * seen in this domain) and divide-conquer-recurrence (EB difficulty
 * "proficient") both directly require math.disc.recurrence-relation and
 * math.seq.series, both already seeded GradeBand.UNDERGRADUATE throughout
 * this campaign — GradeBand.UNDERGRADUATE adopted for both. graph-types
 * (EB difficulty "developing") has sole prerequisite math.disc.graph,
 * itself GradeBand.HIGH — GradeBand.HIGH retained, consistent with the
 * domain's graph-theory subtree.
 *
 *   GENERATING-FUNCTIONS  A(x)=Σaₙxⁿ is a FORMAL power series never
 *           requiring numerical evaluation — only its coefficients carry
 *           meaning; solving a recurrence via generating functions is
 *           algebra on the WHOLE series, a genuinely DIFFERENT technique
 *           from the characteristic-equation method, never a restatement
 *           of it; OGF and EGF are NEVER interchangeable notations — the
 *           same closed form can represent entirely different sequences
 *           depending on which convention is read.
 *   DIVIDE-CONQUER-RECURRENCE  The Master Theorem requires a UNIFORM
 *           split and a POLYNOMIALLY comparable f(n) — outside those
 *           conditions it gives NO answer at all, never an inconclusive
 *           hint; log_b(a) and log_a(b) are RECIPROCALS, never
 *           interchangeable; Case 1 (leaves dominate) and Case 3 (root
 *           dominates) are OPPOSITE directions of the same comparison,
 *           never to be confused.
 *   GRAPH-TYPES  Bipartite describes EDGE structure (which pairs can be
 *           adjacent), never connectivity — a bipartite graph can be
 *           fully connected; Kₙ's completeness (every pair) and Kₘ,ₙ's
 *           completeness (every CROSS-pair only) are genuinely DIFFERENT
 *           maximality notions, never the same; the Handshaking Lemma
 *           Σdeg(v)=2|E| is a UNIVERSAL algebraic identity holding across
 *           simple graphs, multigraphs, pseudographs, and digraphs, never
 *           a simple-undirected-graph-only curiosity.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GENERATING_FUNCTIONS = 'math.disc.generating-functions'
const DIVIDE_CONQUER_RECURRENCE = 'math.disc.divide-conquer-recurrence'
const GRAPH_TYPES = 'math.disc.graph-types'

export const MATHEMATICS_DISC_GENERATING_FUNCTIONS_DIVIDE_CONQUER_RECURRENCE_GRAPH_TYPES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GENERATING_FUNCTIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A(x)=Σaₙxⁿ IS A FORMAL POWER SERIES NEVER REQUIRING NUMERICAL EVALUATION — ONLY ITS '
      + 'COEFFICIENTS CARRY MEANING: for the constant sequence aₙ=1, A(x)=Σxⁿ=1/(1-x). '
      + 'Re-expanding 1/(1-x) as a power series recovers coefficient 1 at every power of x — that '
      + 'correspondence, not any numerical value of x, is the entire content of the claim. No '
      + 'convergence check and no plugging in a specific x is ever required for A(x) to validly '
      + 'encode the sequence.\n\n'
      + 'SOLVING A RECURRENCE VIA GENERATING FUNCTIONS IS ALGEBRA ON THE WHOLE SERIES, A GENUINELY '
      + 'DIFFERENT TECHNIQUE FROM THE CHARACTERISTIC-EQUATION METHOD, NEVER A RESTATEMENT OF IT: '
      + 'for the Fibonacci recurrence Fₙ=Fₙ₋₁+Fₙ₋₂, writing F(x)=ΣFₙxⁿ and manipulating the SERIES '
      + 'itself — shifting indices, multiplying by powers of x, using the recurrence to relate F(x) '
      + 'to itself — produces the algebraic equation solvable directly for F(x)=x/(1-x-x²). No '
      + 'characteristic equation and no ansatz Fₙ=rⁿ appears anywhere in this derivation; the '
      + 'equation solved is for an entire generating function, never for a scalar r. Both '
      + 'techniques can solve the SAME recurrence via completely different routes — mastering one '
      + 'never means mastering the other.\n\n'
      + 'OGF AND EGF ARE NEVER INTERCHANGEABLE NOTATIONS — THE SAME CLOSED FORM CAN REPRESENT '
      + 'ENTIRELY DIFFERENT SEQUENCES: the EGF for labeled permutations, B(x)=Σn!·xⁿ/n!=Σxⁿ=1/(1-x), '
      + 'is the IDENTICAL closed form as the OGF for the constant sequence aₙ=1, yet the two encode '
      + 'entirely different combinatorial meanings — 1/(1-x) is simultaneously the OGF of aₙ=1 and '
      + 'the EGF of aₙ=n!. Dividing by n! is part of what the generating function MEANS (a '
      + 'convention suited to labeled structures), never an arbitrary notational choice layered on '
      + 'top.',
    targetedMisconceptions: [`${GENERATING_FUNCTIONS}:MC-1`, `${GENERATING_FUNCTIONS}:MC-2`, `${GENERATING_FUNCTIONS}:MC-3`],
    source: eb(GENERATING_FUNCTIONS, 'Core Understanding — a generating function as a formal power series never requiring numerical evaluation, solving a recurrence via series manipulation as a genuinely different technique from the characteristic-equation method, and OGF/EGF as never-interchangeable conventions where the identical closed form can mean entirely different sequences'),
  },
  {
    conceptId: DIVIDE_CONQUER_RECURRENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE MASTER THEOREM REQUIRES A UNIFORM SPLIT AND A POLYNOMIALLY COMPARABLE f(n) — OUTSIDE '
      + 'THOSE CONDITIONS IT GIVES NO ANSWER AT ALL, NEVER AN INCONCLUSIVE HINT: for T(n)=aT(n/b)+f(n), '
      + 'the theorem applies cleanly to merge sort (T(n)=2T(n/2)+n, Case 2, Θ(n log n)) — but it '
      + 'CANNOT be applied to T(n)=T(n/3)+T(2n/3)+n (a non-uniform split, unequal subproblem sizes), '
      + 'which requires the recursion-tree method instead. The theorem\'s applicability conditions '
      + 'are genuine LIMITS, never fine print to skip past.\n\n'
      + 'log_b(a) AND log_a(b) ARE RECIPROCALS, NEVER INTERCHANGEABLE: for a=8, b=2, log₂8=3 while '
      + 'log₈2=1/3 — genuinely different values, differing by a factor of 9. Since a and b appear '
      + 'symmetrically to the eye in T(n)=aT(n/b)+f(n), it is easy to swap them, but the critical '
      + 'exponent c*=log_b(a) uses a genuinely asymmetric formula: b is always the base, a is '
      + 'always the argument, never the reverse.\n\n'
      + 'CASE 1 (LEAVES DOMINATE) AND CASE 3 (ROOT DOMINATES) ARE OPPOSITE DIRECTIONS OF THE SAME '
      + 'COMPARISON, NEVER TO BE CONFUSED: at level ℓ of the recursion tree, there are a^ℓ '
      + 'subproblems each doing f(n/b^ℓ) work. If f(n) grows SLOWER than n^c* (Case 1), the LEAVES '
      + '(n^c* of them) dominate the total cost, giving T(n)=Θ(n^c*) — for T(n)=8T(n/2)+n², c*=3, '
      + 'f(n)=n² is smaller, so the leaves dominate: Θ(n³). If f(n) grows FASTER than n^c* (Case 3, '
      + 'with a regularity condition), the ROOT dominates instead, giving T(n)=Θ(f(n)) — the '
      + 'opposite direction of the identical polynomial-gap comparison, never the same case despite '
      + 'sharing the same structural form.',
    targetedMisconceptions: [`${DIVIDE_CONQUER_RECURRENCE}:MC-1`, `${DIVIDE_CONQUER_RECURRENCE}:MC-2`, `${DIVIDE_CONQUER_RECURRENCE}:MC-3`],
    source: eb(DIVIDE_CONQUER_RECURRENCE, 'Core Understanding — the Master Theorem giving no answer at all outside its uniform-split/polynomial-f(n) preconditions never an inconclusive hint, log_b(a) and log_a(b) as never-interchangeable reciprocals, and Case 1 versus Case 3 as opposite directions of the identical comparison never to be confused'),
  },
  {
    conceptId: GRAPH_TYPES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BIPARTITE DESCRIBES EDGE STRUCTURE, NEVER CONNECTIVITY — A BIPARTITE GRAPH CAN BE FULLY '
      + 'CONNECTED: for K₂,₃ with parts {A,B} and {1,2,3} and all 6 cross-edges present, tracing '
      + 'A→1→B→2 confirms full connectivity — K₂,₃ is both bipartite AND connected. Bipartiteness '
      + 'is a claim about WHICH PAIRS can be adjacent (only cross-part pairs, never within-part), '
      + 'never a claim that the two parts are separate disconnected pieces; cross-edges between the '
      + 'parts are exactly what bipartiteness allows and often requires.\n\n'
      + 'Kₙ\'S COMPLETENESS (EVERY PAIR) AND Kₘ,ₙ\'S COMPLETENESS (EVERY CROSS-PAIR ONLY) ARE '
      + 'GENUINELY DIFFERENT MAXIMALITY NOTIONS, NEVER THE SAME: in K₄, every pair among the 4 '
      + 'vertices is adjacent, including any 3 forming a triangle K₃ as a subgraph. In K₂,₃, ONLY '
      + 'the 6 cross-pairs are adjacent — no triangle can exist, since any 3 vertices necessarily '
      + 'include either 2 from the same part (never adjacent) or fail to close a triangle. "Complete" '
      + 'means "every pair whatsoever" for Kₙ but "every CROSS-pair, given the bipartite '
      + 'constraint" for Kₘ,ₙ — two different words sharing one label.\n\n'
      + 'THE HANDSHAKING LEMMA Σdeg(v)=2|E| IS A UNIVERSAL ALGEBRAIC IDENTITY, NEVER A '
      + 'SIMPLE-UNDIRECTED-GRAPH-ONLY CURIOSITY: for a digraph with edges (A,B), (B,C), (C,A): '
      + 'deg⁺(A)=1, deg⁻(A)=1, similarly for B and C, giving Σdeg⁺=Σdeg⁻=3=|E| and '
      + 'Σ(deg⁺+deg⁻)=6=2|E| — the Lemma holds identically in its adapted digraph form. It extends '
      + 'to every graph variant with the appropriately adapted degree definition (multigraph: each '
      + 'parallel edge counts separately; pseudograph: a loop contributes 2 to its own vertex), '
      + 'since each edge always contributes exactly 1 to each of its two endpoints regardless of '
      + 'graph type — directly implying the number of odd-degree vertices in any graph is always '
      + 'even, since 2|E| is always even.',
    targetedMisconceptions: [`${GRAPH_TYPES}:MC-1`, `${GRAPH_TYPES}:MC-2`, `${GRAPH_TYPES}:MC-3`],
    source: eb(GRAPH_TYPES, 'Core Understanding — bipartiteness as a claim about edge structure never connectivity, Kₙ and Kₘ,ₙ as genuinely different completeness/maximality notions sharing one word, and the Handshaking Lemma as a universal algebraic identity extending across every graph variant never a simple-graph-only curiosity'),
  },
]

export const MATHEMATICS_DISC_GENERATING_FUNCTIONS_DIVIDE_CONQUER_RECURRENCE_GRAPH_TYPES_PROBES: SeedProbe[] = [
  {
    conceptId: GENERATING_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a generating function A(x) need to converge for some specific numerical value of x to be a valid, useful object?',
    choices: [
      { text: 'No — A(x) is a formal power series, a bookkeeping device whose coefficients carry the sequence\'s information; no convergence check or numerical evaluation is required for it to validly encode the sequence', isCorrect: true },
      { text: 'Yes — a generating function must converge at some specific x to be considered valid, just like any other function', isCorrect: false, misconceptionId: `${GENERATING_FUNCTIONS}:MC-1` },
      { text: "Yes, since a generating function is fundamentally meant to be evaluated at a number to produce a useful answer", isCorrect: false, misconceptionId: `${GENERATING_FUNCTIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${GENERATING_FUNCTIONS}:MC-1`],
    source: eb(GENERATING_FUNCTIONS, 'Misconceptions MC-1 detection probe — whether a generating function must converge numerically, an answer of "yes" confirming GENERATING-FUNCTION-REQUIRES-NUMERICAL-EVALUATION'),
  },
  {
    conceptId: GENERATING_FUNCTIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If two completely different methods (the characteristic-equation method and generating functions) can both solve the same recurrence, does that mean they are secretly the same method wearing different notation?',
    choices: [
      { text: 'No — the generating-function derivation solves an algebraic equation for the entire series F(x) via index-shifting and self-reference, with no characteristic equation or ansatz Fₙ=rⁿ appearing anywhere; they are genuinely distinct techniques that happen to solve the same problem', isCorrect: true },
      { text: 'Yes — since both methods solve the same recurrence, they must fundamentally be the same underlying method presented differently', isCorrect: false, misconceptionId: `${GENERATING_FUNCTIONS}:MC-2` },
      { text: "Yes, because any two valid ways of solving the identical equation are necessarily equivalent procedures", isCorrect: false, misconceptionId: `${GENERATING_FUNCTIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${GENERATING_FUNCTIONS}:MC-2`],
    source: eb(GENERATING_FUNCTIONS, 'Misconceptions MC-2 detection probe — whether generating functions and characteristic equations are secretly the same method, an answer of "yes" confirming GENERATING-FUNCTIONS-CONFLATED-WITH-CHARACTERISTIC-EQUATIONS'),
  },
  {
    conceptId: GENERATING_FUNCTIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The closed form 1/(1-x) is the OGF of the constant sequence aₙ=1 and also the EGF of the sequence aₙ=n! (labeled permutations). Are OGF and EGF just arbitrary notational variants carrying the identical information?',
    choices: [
      { text: 'No — the same closed form 1/(1-x) represents two entirely different sequences depending on whether it is read as an OGF (aₙ=1) or an EGF (aₙ=n!); the coefficient-recovery convention is part of what the generating function means, not an arbitrary choice', isCorrect: true },
      { text: 'Yes — OGF and EGF are simply two equivalent ways of writing the same generating function, carrying identical sequence information', isCorrect: false, misconceptionId: `${GENERATING_FUNCTIONS}:MC-3` },
      { text: "Yes, since dividing by n! is just a minor normalization that doesn't change which sequence is being encoded", isCorrect: false, misconceptionId: `${GENERATING_FUNCTIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${GENERATING_FUNCTIONS}:MC-3`],
    source: eb(GENERATING_FUNCTIONS, 'Misconceptions MC-3 detection probe — the dual-meaning 1/(1-x) example, an answer of "yes" (interchangeable) confirming OGF-EGF-TREATED-AS-INTERCHANGEABLE'),
  },
  {
    conceptId: DIVIDE_CONQUER_RECURRENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can the Master Theorem be applied directly to T(n)=T(n/3)+T(2n/3)+n, which divides a problem into pieces of two DIFFERENT sizes?',
    choices: [
      { text: 'No — the Master Theorem requires a UNIFORM split (every subproblem the same size n/b); this non-uniform split disqualifies it entirely, giving no answer at all, and the recursion-tree method must be used instead', isCorrect: true },
      { text: 'Yes — the Master Theorem can always be applied to any divide-and-conquer recurrence regardless of how the problem is split', isCorrect: false, misconceptionId: `${DIVIDE_CONQUER_RECURRENCE}:MC-1` },
      { text: "Yes, since the Master Theorem is a universal solver for any recurrence of the general divide-and-conquer form", isCorrect: false, misconceptionId: `${DIVIDE_CONQUER_RECURRENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${DIVIDE_CONQUER_RECURRENCE}:MC-1`],
    source: eb(DIVIDE_CONQUER_RECURRENCE, 'Misconceptions MC-1 detection probe — a non-uniform-split recurrence, an assumption the Master Theorem still applies confirming MASTER-THEOREM-ALWAYS-APPLIES'),
  },
  {
    conceptId: DIVIDE_CONQUER_RECURRENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is log₂8 the same number as log₈2?',
    choices: [
      { text: 'No — log₂8=3 while log₈2=1/3; they are reciprocals of each other, genuinely different values, not interchangeable', isCorrect: true },
      { text: 'Yes — log₂8 and log₈2 give the same value since they involve the same two numbers', isCorrect: false, misconceptionId: `${DIVIDE_CONQUER_RECURRENCE}:MC-2` },
      { text: "Yes, since swapping the base and the argument of a logarithm doesn't change its value", isCorrect: false, misconceptionId: `${DIVIDE_CONQUER_RECURRENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${DIVIDE_CONQUER_RECURRENCE}:MC-2`],
    source: eb(DIVIDE_CONQUER_RECURRENCE, 'Misconceptions MC-2 detection probe — log₂8 versus log₈2 for a=8,b=2, an answer of "yes" (same value) confirming WRONG-CRITICAL-EXPONENT'),
  },
  {
    conceptId: DIVIDE_CONQUER_RECURRENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For T(n)=8T(n/2)+n² (so c*=log₂8=3, and f(n)=n² grows slower than n³), does the leaves or the root of the recursion tree dominate the total cost, and what is T(n)?',
    choices: [
      { text: 'The leaves dominate (Case 1, since f(n)=n² is polynomially smaller than n^c*=n³), giving T(n)=Θ(n³)', isCorrect: true },
      { text: 'The root dominates (Case 3), giving T(n)=Θ(n²)', isCorrect: false, misconceptionId: `${DIVIDE_CONQUER_RECURRENCE}:MC-3` },
      { text: "Since f(n) is a valid comparison function, the root always dominates regardless of which side is polynomially larger", isCorrect: false, misconceptionId: `${DIVIDE_CONQUER_RECURRENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${DIVIDE_CONQUER_RECURRENCE}:MC-3`],
    source: eb(DIVIDE_CONQUER_RECURRENCE, 'Misconceptions MC-3 detection probe — T(n)=8T(n/2)+n², confusing Case 1 (leaves dominate) with Case 3 (root dominates) confirming CASE-BOUNDARY-CONFUSION'),
  },
  {
    conceptId: GRAPH_TYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is K₂,₃ (a complete bipartite graph with parts {A,B} and {1,2,3}) connected?',
    choices: [
      { text: 'Yes — bipartiteness is about which pairs CAN be adjacent (only cross-part pairs), not about connectivity; tracing A→1→B→2 confirms K₂,₃ is fully connected despite being bipartite', isCorrect: true },
      { text: 'No — since the graph has two separate parts, it must be disconnected into two pieces', isCorrect: false, misconceptionId: `${GRAPH_TYPES}:MC-1` },
      { text: "No, because bipartite graphs by definition consist of two disconnected components", isCorrect: false, misconceptionId: `${GRAPH_TYPES}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_TYPES}:MC-1`],
    source: eb(GRAPH_TYPES, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — "is K₂,₃ connected," an answer of "no" confirming BIPARTITE-MEANS-TWO-COMPONENTS'),
  },
  {
    conceptId: GRAPH_TYPES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is K₃ (a triangle) a subgraph of K₂,₃?',
    choices: [
      { text: 'No — K₂,₃\'s bipartite structure forbids same-part pairs entirely, so no triangle (which requires an edge within one part) can exist; K₂,₃\'s "complete" means every CROSS-pair only, a genuinely different notion from K₃\'s "every pair whatsoever"', isCorrect: true },
      { text: 'Yes — since K₂,₃ is a complete graph with enough vertices, it must contain a K₃ triangle as a subgraph', isCorrect: false, misconceptionId: `${GRAPH_TYPES}:MC-2` },
      { text: "Yes, because both K₃ and K₂,₃ are described as 'complete,' so K₂,₃ contains every smaller complete graph including K₃", isCorrect: false, misconceptionId: `${GRAPH_TYPES}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_TYPES}:MC-2`],
    source: eb(GRAPH_TYPES, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — "is K₃ a subgraph of K₂,₃," an answer of "yes" confirming COMPLETE-MEANS-ALL-EDGES-POSSIBLE'),
  },
  {
    conceptId: GRAPH_TYPES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the Handshaking Lemma (Σdeg(v)=2|E|) apply to a directed graph?',
    choices: [
      { text: 'Yes — adapted to Σdeg⁺(v)=Σdeg⁻(v)=|E| (each directed edge contributes 1 to its tail\'s out-degree and 1 to its head\'s in-degree), so Σ(deg⁺+deg⁻)=2|E| still holds; the Lemma is a universal algebraic identity, not specific to undirected graphs', isCorrect: true },
      { text: 'No — the Handshaking Lemma only applies to simple undirected graphs, since directed edges do not represent mutual "handshakes"', isCorrect: false, misconceptionId: `${GRAPH_TYPES}:MC-3` },
      { text: "It's uncertain whether the Lemma extends beyond ordinary undirected graphs at all", isCorrect: false, misconceptionId: `${GRAPH_TYPES}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_TYPES}:MC-3`],
    source: eb(GRAPH_TYPES, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — "does the Handshaking Lemma apply to a directed graph," an answer of "no" or uncertainty confirming HANDSHAKING-IS-ABOUT-HANDSHAKES'),
  },
]

/**
 * Batch: linear-recurrence, graph-coloring, planar-graph (math.disc).
 *
 * Continues math.disc (24/32 -> 27/32) after the complexity-classes/ogf/
 * egf batch. Fresh frontier recompute found the domain's final 8 concepts
 * ALL simultaneously ready — no further KG unlocks remain to differentiate
 * selection. Selected linear-recurrence, graph-coloring, and planar-graph,
 * leaving graph-representation, boolean-circuits, predicate-logic-disc,
 * catalan-numbers, and stirling-numbers for the closing batch(es).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.disc.{linear-recurrence,
 * graph-coloring,planar-graph}.md.
 *
 * Grade band: linear-recurrence (EB difficulty "proficient") directly
 * requires math.disc.recurrence-relation, already seeded
 * GradeBand.UNDERGRADUATE — GradeBand.UNDERGRADUATE adopted. graph-coloring
 * and planar-graph (both EB difficulty "proficient") have sole prerequisite
 * math.disc.graph, GradeBand.HIGH — GradeBand.HIGH retained, consistent
 * with the domain's graph-theory subtree.
 *
 *   LINEAR-RECURRENCE  A characteristic root r is a NUMBER; the term it
 *           contributes, rⁿ, is a FUNCTION of n — never confused, never
 *           the same object; a repeated root of multiplicity m needs m
 *           genuinely INDEPENDENT terms (rⁿ, nrⁿ, ..., n^(m-1)rⁿ), never
 *           m copies of the same term; the general solution with
 *           undetermined constants is NEVER a finished answer until
 *           initial conditions are applied to pin down the one specific
 *           sequence.
 *   GRAPH-COLORING  Greedy coloring's output is order-dependent and gives
 *           only an UPPER bound on χ(G), never automatically the exact
 *           chromatic number without an independent lower bound; the Four
 *           Color Theorem's difficulty is ENTIRELY in the upper-bound
 *           direction (the lower bound via K₄ is trivial), never a
 *           symmetric difficulty; P(G,k) is a POLYNOMIAL FUNCTION and
 *           χ(G) is a single INTEGER derived from it (its smallest
 *           positive root), never interchangeable notation for the same
 *           idea.
 *   PLANAR-GRAPH  The edge-density bounds are NECESSARY, never SUFFICIENT
 *           conditions — violating one proves non-planarity, but
 *           satisfying one proves nothing either way; Euler's formula
 *           V-E+F=2 requires CONNECTIVITY, needing the +C correction for
 *           disconnected graphs, never applied reflexively; Kuratowski's
 *           theorem requires a SUBDIVISION of K₅ or K₃,₃ (permitting
 *           inserted pass-through vertices), never the stricter "literal
 *           strict subgraph" reading.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LINEAR_RECURRENCE = 'math.disc.linear-recurrence'
const GRAPH_COLORING = 'math.disc.graph-coloring'
const PLANAR_GRAPH = 'math.disc.planar-graph'

export const MATHEMATICS_DISC_LINEAR_RECURRENCE_GRAPH_COLORING_PLANAR_GRAPH_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LINEAR_RECURRENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A CHARACTERISTIC ROOT r IS A NUMBER; THE TERM IT CONTRIBUTES, rⁿ, IS A FUNCTION OF n — '
      + 'NEVER CONFUSED, NEVER THE SAME OBJECT: substituting the trial solution aₙ=rⁿ into a linear '
      + 'recurrence with constant coefficients produces the characteristic polynomial equation, '
      + 'whose roots are found via polynomial-root machinery. Each DISTINCT root r contributes the '
      + 'FUNCTION rⁿ to the general solution — verified directly by substitution, aₙ=rⁿ genuinely '
      + 'satisfies the recurrence exactly when r solves the characteristic equation. The solution '
      + 'to the recurrence is this function of n, never the root itself.\n\n'
      + 'A REPEATED ROOT OF MULTIPLICITY m NEEDS m GENUINELY INDEPENDENT TERMS, NEVER m COPIES OF '
      + 'THE SAME TERM: for aₙ=6aₙ₋₁-9aₙ₋₂ (double root r=3), writing c₁3ⁿ+c₂3ⁿ=(c₁+c₂)3ⁿ collapses '
      + 'to a SINGLE effective term, unable to fit two independent initial conditions. The correct '
      + 'additional independent solution is n·3ⁿ (verified directly by substitution to satisfy the '
      + 'recurrence, distinct from 3ⁿ alone) — a multiplicity-m root needs rⁿ, nrⁿ, ..., n^(m-1)rⁿ, '
      + 'never fewer genuinely distinct functions.\n\n'
      + 'THE GENERAL SOLUTION WITH UNDETERMINED CONSTANTS IS NEVER A FINISHED ANSWER UNTIL INITIAL '
      + 'CONDITIONS ARE APPLIED: for the Fibonacci recurrence, Fₙ=Aφⁿ+Bψⁿ (roots φ=(1+√5)/2, '
      + 'ψ=(1-√5)/2) represents an entire FAMILY of sequences — the all-zero sequence and the '
      + 'genuine Fibonacci sequence both satisfy this general form for different constant choices. '
      + 'Only after substituting F₀=0, F₁=1 does the family collapse to Binet\'s exact formula '
      + 'Fₙ=(φⁿ-ψⁿ)/√5, the ONE specific sequence actually being solved for. For non-homogeneous '
      + 'recurrences, initial conditions must be applied to the FULL solution (homogeneous plus '
      + 'particular), never to the homogeneous part alone.',
    targetedMisconceptions: [`${LINEAR_RECURRENCE}:MC-1`, `${LINEAR_RECURRENCE}:MC-2`, `${LINEAR_RECURRENCE}:MC-3`],
    source: eb(LINEAR_RECURRENCE, 'Core Understanding — a characteristic root as a number versus the function it contributes never confused, a repeated root of multiplicity m needing m genuinely independent terms never fewer, and the general solution never a finished answer until initial conditions pin down the specific sequence'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      "GREEDY COLORING'S OUTPUT IS ORDER-DEPENDENT AND GIVES ONLY AN UPPER BOUND ON χ(G), NEVER "
      + 'AUTOMATICALLY THE EXACT CHROMATIC NUMBER: the greedy algorithm (assign each vertex the '
      + 'smallest color not used by its already-colored neighbors) gives χ(G)≤Δ(G)+1, but a '
      + 'poorly-chosen vertex ordering can use more colors than the true minimum requires. '
      + 'Establishing χ(G)=k exactly requires TWO separate arguments: an UPPER bound (an explicit '
      + 'k-coloring) AND a LOWER bound (clique number ω(G) or an odd-cycle argument proving no '
      + '(k-1)-coloring works) — for K₄, an explicit 4-coloring gives χ(K₄)≤4, and K₄\'s own '
      + '4-clique structure gives χ(K₄)≥4, so together χ(K₄)=4 is genuinely established; greedy\'s '
      + 'output alone never suffices.\n\n'
      + 'THE FOUR COLOR THEOREM\'S DIFFICULTY IS ENTIRELY IN THE UPPER-BOUND DIRECTION, NEVER A '
      + 'SYMMETRIC DIFFICULTY: the lower bound for planar graphs generally (some planar graph needs '
      + '4 colors) is trivial — K₄ is planar and χ(K₄)=4. But the upper bound (4 colors ALWAYS '
      + 'suffice for EVERY planar graph) resisted proof for 124 years, finally settled in 1976 via '
      + '1,200 hours of computer verification checking 1,936 reducible configurations, with no '
      + 'known short human-checkable proof today — a fundamentally different scale of difficulty '
      + 'from the trivial lower bound.\n\n'
      + 'P(G,k) IS A POLYNOMIAL FUNCTION AND χ(G) IS A SINGLE INTEGER DERIVED FROM IT, NEVER '
      + 'INTERCHANGEABLE NOTATION FOR THE SAME IDEA: the chromatic polynomial P(K₃,k)=k(k-1)(k-2) '
      + 'evaluates to P(K₃,1)=0, P(K₃,2)=0, P(K₃,3)=6 — so χ(K₃)=3 is the SMALLEST positive integer '
      + 'k where the polynomial first becomes positive, never the polynomial itself. Saying "the '
      + 'chromatic polynomial is 3" conflates a function with the specific integer its smallest '
      + 'positive root reveals.',
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-1`, `${GRAPH_COLORING}:MC-2`, `${GRAPH_COLORING}:MC-3`],
    source: eb(GRAPH_COLORING, "Core Understanding — greedy coloring's order-dependent output as only an upper bound never automatically the exact chromatic number, the Four Color Theorem's difficulty as entirely upper-bound-sided never symmetric, and the chromatic polynomial as a function genuinely distinct from the chromatic number it derives"),
  },
  {
    conceptId: PLANAR_GRAPH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE EDGE-DENSITY BOUNDS ARE NECESSARY, NEVER SUFFICIENT CONDITIONS: E≤3V-6 (simple planar '
      + 'graphs) and E≤2V-4 (triangle-free planar graphs) are valid non-planarity tests only in the '
      + '"if violated, definitely non-planar" direction. K₅ (V=5,E=10) violates 3V-6=9, immediately '
      + 'confirming non-planarity. K₃,₃ (V=6,E=9) SATISFIES the general bound (3V-6=12≥9) — '
      + 'inconclusive — but K₃,₃ is bipartite (triangle-free), and the tighter bound 2V-4=8<9 IS '
      + 'violated, correctly confirming non-planarity via the sharper test. Satisfying a bound '
      + "NEVER, by itself, proves planarity — it only means that particular test didn't catch "
      + 'anything.\n\n'
      + "EULER'S FORMULA V-E+F=2 REQUIRES CONNECTIVITY, NEEDING THE +C CORRECTION FOR DISCONNECTED "
      + 'GRAPHS, NEVER APPLIED REFLEXIVELY: for two disjoint triangles (not connected to each '
      + 'other), V=6, E=6, F=3 (two inner triangular faces plus one shared outer face), giving '
      + '6-6+3=3, matching C+1=1+2=3 for C=2 components — NOT the standard connected-graph value '
      + '2. The connectivity precondition is load-bearing, never incidental, and the corrected '
      + 'formula V-E+F=C+1 reduces to the standard form only when C=1.\n\n'
      + "KURATOWSKI'S THEOREM REQUIRES A SUBDIVISION OF K₅ OR K₃,₃, NEVER THE STRICTER LITERAL "
      + 'STRICT-SUBGRAPH READING: a graph is planar iff it contains no SUBDIVISION of K₅ or K₃,₃ — '
      + 'inserting 2 new degree-2 pass-through vertices onto one of K₅\'s edges produces a 7-vertex, '
      + '11-edge graph that is STILL non-planar, topologically equivalent to K₅ despite K₅ no '
      + 'longer appearing as a literal, unmodified subgraph. Restricting the theorem to strict '
      + 'subgraphs alone would MISS these subdivided cases, which are equally topologically '
      + 'non-planar — "subdivision" is a strictly WEAKER, more permissive requirement than "strict '
      + 'subgraph."',
    targetedMisconceptions: [`${PLANAR_GRAPH}:MC-1`, `${PLANAR_GRAPH}:MC-2`, `${PLANAR_GRAPH}:MC-3`],
    source: eb(PLANAR_GRAPH, "Core Understanding — the edge-density bounds as necessary never sufficient conditions for planarity, Euler's formula requiring connectivity and the +C correction for disconnected graphs never applied reflexively, and Kuratowski's theorem requiring a subdivision never the stricter literal strict-subgraph reading"),
  },
]

export const MATHEMATICS_DISC_LINEAR_RECURRENCE_GRAPH_COLORING_PLANAR_GRAPH_PROBES: SeedProbe[] = [
  {
    conceptId: LINEAR_RECURRENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If r solves the characteristic equation of a linear recurrence, is r itself the answer to the recurrence, or is it something else derived from r?',
    choices: [
      { text: 'r is a number; the term it contributes to the general solution is the FUNCTION rⁿ, verified by direct substitution to satisfy the recurrence — the solution is this function, never the root itself', isCorrect: true },
      { text: 'r itself is the answer — once you find the characteristic root, that number is the sequence\'s value', isCorrect: false, misconceptionId: `${LINEAR_RECURRENCE}:MC-1` },
      { text: "r and the sequence aₙ are the same thing, since r is what the recurrence 'equals'", isCorrect: false, misconceptionId: `${LINEAR_RECURRENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_RECURRENCE}:MC-1`],
    source: eb(LINEAR_RECURRENCE, 'Misconceptions MC-1 detection probe (Discovery Question 1) — whether the characteristic root r is itself the recurrence\'s answer, confirming CHARACTERISTIC-ROOT-IS-THE-TERM'),
  },
  {
    conceptId: LINEAR_RECURRENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For aₙ=6aₙ₋₁-9aₙ₋₂, the characteristic equation has a double root r=3. Is the general solution c₁3ⁿ+c₂3ⁿ correct?',
    choices: [
      { text: 'No — c₁3ⁿ+c₂3ⁿ collapses to (c₁+c₂)3ⁿ, a single effective term; the correct general solution is c₁3ⁿ+c₂n·3ⁿ, since n·3ⁿ is a genuinely independent second solution verified by direct substitution', isCorrect: true },
      { text: 'Yes — writing two copies of 3ⁿ with different constants gives two independent solutions for the double root', isCorrect: false, misconceptionId: `${LINEAR_RECURRENCE}:MC-2` },
      { text: "Yes, since a repeated root just means the same term appears twice with different coefficients", isCorrect: false, misconceptionId: `${LINEAR_RECURRENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_RECURRENCE}:MC-2`],
    source: eb(LINEAR_RECURRENCE, 'Misconceptions MC-2 detection probe — a double root\'s general solution written as two copies of the same term, confirming REPEATED-ROOT-OMITS-POLYNOMIAL-FACTOR'),
  },
  {
    conceptId: LINEAR_RECURRENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the general solution Fₙ=Aφⁿ+Bψⁿ, by itself, already tell you the ONE specific sequence a problem is asking about?',
    choices: [
      { text: 'No — the general solution represents an entire family of sequences (both the all-zero sequence and the true Fibonacci sequence satisfy it for different A,B); only applying the initial conditions (e.g. F₀=0, F₁=1) pins down the one specific sequence, yielding Binet\'s formula', isCorrect: true },
      { text: 'Yes — the general solution with undetermined constants is already the complete, final answer', isCorrect: false, misconceptionId: `${LINEAR_RECURRENCE}:MC-3` },
      { text: "Yes, since deriving the general form is the main mathematical achievement and the constants are just a formality", isCorrect: false, misconceptionId: `${LINEAR_RECURRENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR_RECURRENCE}:MC-3`],
    source: eb(LINEAR_RECURRENCE, 'Misconceptions MC-3 detection probe (Discovery Question 3) — whether the general solution alone identifies the specific sequence, confirming GENERAL-SOLUTION-WITHOUT-INITIAL-CONDITIONS-IS-THE-ANSWER'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You run greedy coloring on a graph and it uses 4 colors. Is χ(G)=4?',
    choices: [
      { text: 'Not necessarily — greedy only gives an UPPER bound (χ(G)≤4), which is order-dependent; establishing χ(G)=4 exactly requires an independent LOWER bound (e.g. a 4-clique or odd-cycle argument) confirming the same value', isCorrect: true },
      { text: 'Yes — whatever count greedy coloring produces is automatically the chromatic number', isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-1` },
      { text: "Yes, since greedy always finds the minimum number of colors needed", isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-1`],
    source: eb(GRAPH_COLORING, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — greedy coloring uses 4 colors, an answer of "yes" confirming CHROMATIC-NUMBER-EQUALS-GREEDY-COLORS'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can you sketch a short proof that every planar graph is 4-colorable (the Four Color Theorem)?',
    choices: [
      { text: 'No short proof is known — the lower bound (K₄ needs 4 colors) is trivial, but the upper bound (4 always suffices for every planar graph) resisted proof for 124 years and was only settled in 1976 via computer verification of 1,936 configurations, with no known short human-checkable proof today', isCorrect: true },
      { text: 'Yes — since K₄ is planar and needs 4 colors, a short direct argument establishes the full theorem', isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-2` },
      { text: "It's essentially obvious and doesn't require a real proof at all", isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-2`],
    source: eb(GRAPH_COLORING, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — attempting a short proof of the Four Color Theorem, confirming FOUR-COLOR-THEOREM-IS-OBVIOUS'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the chromatic polynomial of K₃ (a triangle)?',
    choices: [
      { text: 'P(K₃,k)=k(k-1)(k-2) — a polynomial expression; evaluating it gives P(K₃,1)=0, P(K₃,2)=0, P(K₃,3)=6, so χ(K₃)=3 is the smallest k where it first becomes positive', isCorrect: true },
      { text: '3 — the chromatic polynomial of a triangle is 3', isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-3` },
      { text: "3, since the chromatic polynomial and the chromatic number are the same value for this graph", isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-3`],
    source: eb(GRAPH_COLORING, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — the chromatic polynomial of K₃, an answer of "3" confirming CHROMATIC-POLYNOMIAL-IS-CHROMATIC-NUMBER'),
  },
  {
    conceptId: PLANAR_GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two disjoint triangles are drawn in the plane (not connected to each other). What does V-E+F equal?',
    choices: [
      { text: '3 — with V=6, E=6, F=3 (two inner faces plus one shared outer face), the corrected formula for C=2 components gives V-E+F=C+1=3, not the standard connected-graph value 2', isCorrect: true },
      { text: '2 — applying the standard Euler formula V-E+F=2 directly', isCorrect: false, misconceptionId: `${PLANAR_GRAPH}:MC-1` },
      { text: "2, since Euler's formula V-E+F=2 holds for any planar graph regardless of connectivity", isCorrect: false, misconceptionId: `${PLANAR_GRAPH}:MC-1` },
    ],
    targetedMisconceptions: [`${PLANAR_GRAPH}:MC-1`],
    source: eb(PLANAR_GRAPH, "Misconceptions MC-1 detection probe (verbatim, Blueprint) — two disjoint triangles' V-E+F value, an answer of 2 confirming EULER-FORMULA-FOR-DISCONNECTED"),
  },
  {
    conceptId: PLANAR_GRAPH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A graph contains K₅\'s five high-degree vertices, but with extra degree-2 vertices inserted along some of K₅\'s original edges. Is this still relevant to Kuratowski\'s theorem?',
    choices: [
      { text: 'Yes — this is a SUBDIVISION of K₅, topologically equivalent to K₅ despite the inserted pass-through vertices; Kuratowski\'s theorem is written precisely to catch subdivisions, not just literal unmodified K₅', isCorrect: true },
      { text: 'No — since K₅ no longer appears as a strict, unmodified subgraph, Kuratowski\'s theorem does not apply', isCorrect: false, misconceptionId: `${PLANAR_GRAPH}:MC-2` },
      { text: "No, because Kuratowski's theorem only recognizes K₅ or K₃,₃ appearing exactly as originally defined", isCorrect: false, misconceptionId: `${PLANAR_GRAPH}:MC-2` },
    ],
    targetedMisconceptions: [`${PLANAR_GRAPH}:MC-2`],
    source: eb(PLANAR_GRAPH, "Misconceptions MC-2 detection probe (verbatim, Blueprint) — K₅ with inserted pass-through vertices, an answer of 'no' confirming KURATOWSKI-SUBDIVISION-VS-SUBGRAPH"),
  },
  {
    conceptId: PLANAR_GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A graph satisfies E≤3V-6. Is it necessarily planar?',
    choices: [
      { text: 'No — E≤3V-6 is a NECESSARY but not sufficient condition; K₃,₃ satisfies this bound (3V-6=12≥9) yet is non-planar (confirmed instead by the tighter triangle-free bound 2V-4=8<9); satisfying the bound leaves planarity undetermined', isCorrect: true },
      { text: 'Yes — any graph satisfying E≤3V-6 is guaranteed to be planar', isCorrect: false, misconceptionId: `${PLANAR_GRAPH}:MC-3` },
      { text: "Yes, since the edge-density bound is a complete test for planarity in both directions", isCorrect: false, misconceptionId: `${PLANAR_GRAPH}:MC-3` },
    ],
    targetedMisconceptions: [`${PLANAR_GRAPH}:MC-3`],
    source: eb(PLANAR_GRAPH, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — a graph satisfying E≤3V-6, an answer of "yes" (necessarily planar) confirming E-LESS-THAN-3V-MINUS-6-IS-SUFFICIENT'),
  },
]

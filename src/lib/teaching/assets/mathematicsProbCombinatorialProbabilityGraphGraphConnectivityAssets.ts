/**
 * Batch: combinatorial-probability (math.prob), graph, connectivity
 * (math.graph).
 *
 * Closes math.prob to 47/49 (its final 2 concepts — characteristic-
 * function, convergence-types — remain genuinely blocked on unauthored
 * math.de/math.real) by authoring combinatorial-probability, now
 * unblocked by math.disc's full completion (math.disc.permutations and
 * math.disc.combinations are both authored). Also OPENS the math.graph
 * domain (0/16) with its root concept (graph) and its direct child
 * (connectivity) — both unblocked directly by math.disc's own completed
 * graph-theory subtree, per the campaign handover's recommendation.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.prob.combinatorial-
 * probability.md and educational-brain/concepts/mathematics/math.graph.
 * {graph,connectivity}.md.
 *
 * Grade band: combinatorial-probability requires math.prob.classical-
 * probability plus math.disc.permutations/combinations, all already
 * GradeBand.HIGH — GradeBand.HIGH retained, consistent with math.prob's
 * domain convention. math.graph.graph and math.graph.connectivity both
 * cross-link directly to already-authored math.disc siblings
 * (math.disc.graph, math.disc.graph-connectivity), both GradeBand.HIGH —
 * GradeBand.HIGH adopted as the math.graph domain's own convention,
 * paralleling math.disc's graph-theory subtree.
 *
 *   COMBINATORIAL-PROBABILITY  "Does order matter?" is the FIRST,
 *           decisive question for any counting-based probability problem
 *           — never skipped; |Ω| and |A| must use the SAME counting
 *           model throughout, never mixed ordered/unordered; complementary
 *           counting is often the CLEANEST route for "at least one/at
 *           least k" events, never merely a fallback for when direct
 *           counting fails.
 *   GRAPH (math.graph)  A graph's ORDER (vertex count) and SIZE (edge
 *           count) are INDEPENDENT counts, never linked or required to
 *           match; a WEIGHTED graph's connectivity structure is UNTOUCHED
 *           by adding weights — weights are decoration on top of an
 *           existing edge, never a redefinition of which vertices
 *           connect; in a MULTIGRAPH, degree counts EDGE-INCIDENCES, never
 *           distinct neighbors — two parallel edges to the same neighbor
 *           contribute 2 to degree, not 1.
 *   CONNECTIVITY (math.graph)  Vertex/edge connectivity (κ,λ) are
 *           QUANTITATIVE refinements of the binary connected/disconnected
 *           fact, never redundant with it — two "connected" graphs can
 *           have wildly different robustness; κ(G)≤λ(G)≤δ(G) is a GENERAL
 *           THEOREM true for every graph, never a coincidental pattern
 *           from one symmetric example; Menger's theorem is an EXACT,
 *           checkable equality between a minimum and a maximum, never a
 *           loose correlation between "more paths" and "more connected."
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMBINATORIAL_PROBABILITY = 'math.prob.combinatorial-probability'
const GRAPH = 'math.graph.graph'
const CONNECTIVITY = 'math.graph.connectivity'

export const MATHEMATICS_PROB_COMBINATORIAL_PROBABILITY_GRAPH_GRAPH_CONNECTIVITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMBINATORIAL_PROBABILITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      '"DOES ORDER MATTER?" IS THE FIRST, DECISIVE QUESTION, NEVER SKIPPED: for 5 people applying '
      + 'for 3 IDENTICAL committee seats, "Alice, Bob, Carol" and "Carol, Alice, Bob" form the SAME '
      + 'committee — order does NOT matter, so only C(5,3)=10 applies, never P(5,3)=5×4×3=60. '
      + 'Contrast choosing a president, VP, and treasurer from 8 people: these ARE distinct roles, '
      + 'so P(8,3)=336 applies — the SAME n=8,r=3 numbers, but genuinely different counts '
      + '(336=56×3!, since each unordered group of 3 corresponds to 3!=6 ordered role-assignments).\n\n'
      + '|Ω| AND |A| MUST USE THE SAME COUNTING MODEL THROUGHOUT, NEVER MIXED: for P(all 5 cards '
      + 'are hearts) from a 5-card hand, choosing UNORDERED combinations throughout: '
      + '|Ω|=C(52,5)=2,598,960 and |A|=C(13,5)=1,287, giving P=1,287/2,598,960≈0.000495. Computing '
      + '|Ω| as ordered (52×51×50×49×48) while leaving |A| unordered (or vice versa) produces a '
      + 'WRONG answer — both counts must consistently use the SAME model, ordered or unordered, '
      + 'never a mismatch of the two.\n\n'
      + 'COMPLEMENTARY COUNTING IS OFTEN THE CLEANEST ROUTE, NEVER MERELY A FALLBACK FOR WHEN '
      + 'DIRECT COUNTING FAILS: for P(at least 2 of 10 people share a birthday), directly summing '
      + '"exactly 2," "exactly 3," etc. requires many cases. The COMPLEMENT "all 10 birthdays '
      + 'different" is one clean computation: P(all different)=(365×364×...×356)/365¹⁰, then '
      + 'P(at least 2 share)=1-P(all different) — dramatically simpler, never more work than the '
      + 'direct case-by-case sum.',
    targetedMisconceptions: [`${COMBINATORIAL_PROBABILITY}:MC-1`, `${COMBINATORIAL_PROBABILITY}:MC-2`, `${COMBINATORIAL_PROBABILITY}:MC-3`],
    source: eb(COMBINATORIAL_PROBABILITY, 'Core Understanding — "does order matter" as the first decisive question never skipped, |Ω| and |A| requiring the same counting model throughout never mixed, and complementary counting as often the cleanest route never merely a fallback'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      "A GRAPH'S ORDER (VERTEX COUNT) AND SIZE (EDGE COUNT) ARE INDEPENDENT COUNTS, NEVER LINKED "
      + 'OR REQUIRED TO MATCH: a 5-cycle has order n=|V|=5 and size m=|E|=5 (order equals size here '
      + '— a coincidence specific to cycles). A star graph on the SAME 5 vertices has order 5 but '
      + 'size only 4 (4 edges from the hub to each leaf) — order and size are determined '
      + 'independently by which edges actually exist, never by each other; high order can coexist '
      + 'with low size.\n\n'
      + "A WEIGHTED GRAPH'S CONNECTIVITY STRUCTURE IS UNTOUCHED BY ADDING WEIGHTS — WEIGHTS ARE "
      + 'DECORATION ON TOP OF AN EXISTING EDGE, NEVER A REDEFINITION OF WHICH VERTICES CONNECT: '
      + 'drawing the identical road network twice — once with distances labeled, once without — '
      + 'shows the SAME pairs of towns connected in both drawings; only the labels differ. Adding '
      + 'weights never changes which vertices are connected to which; the underlying connectivity '
      + 'skeleton is identical with or without the numeric labels.\n\n'
      + 'IN A MULTIGRAPH, DEGREE COUNTS EDGE-INCIDENCES, NEVER DISTINCT NEIGHBORS: if vertex X has '
      + 'two separate edges to vertex Y and no other edges, deg(X)=2 (two edge-incidences), NOT 1 '
      + '(one distinct neighbor) — two different airlines both flying nonstop between the same two '
      + 'cities are two SEPARATE edges connecting one neighbor pair. The Handshaking Lemma '
      + '(Σdeg(v)=2m) still holds exactly, since it was always defined via edge-incidences, never '
      + 'via neighbor-counts, and every edge (weighted, multigraph, or plain) still has exactly two '
      + 'endpoints.',
    targetedMisconceptions: [`${GRAPH}:MC-1`, `${GRAPH}:MC-2`, `${GRAPH}:MC-3`],
    source: eb(GRAPH, "Core Understanding — a graph's order and size as independent counts never linked, a weighted graph's connectivity structure untouched by weights never redefined by them, and multigraph degree counting edge-incidences never distinct neighbors"),
  },
  {
    conceptId: CONNECTIVITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'VERTEX/EDGE CONNECTIVITY (κ,λ) ARE QUANTITATIVE REFINEMENTS OF THE BINARY CONNECTED/'
      + 'DISCONNECTED FACT, NEVER REDUNDANT WITH IT: a star graph (one hub, several leaves) and a '
      + '4-cycle are BOTH connected in the binary sense — yet removing the star\'s single hub '
      + 'disconnects it entirely (κ(star)=1), while the 4-cycle survives removal of any ONE vertex, '
      + 'requiring 2 vertices (e.g. two opposite ones) to disconnect it (κ(C₄)=2). The same binary '
      + 'fact ("connected") hides genuinely different robustness, which κ (minimum vertices to '
      + 'remove) and λ (minimum edges to remove) quantify.\n\n'
      + 'κ(G)≤λ(G)≤δ(G) IS A GENERAL THEOREM TRUE FOR EVERY GRAPH, NEVER A COINCIDENTAL PATTERN '
      + 'FROM ONE SYMMETRIC EXAMPLE: for the 4-cycle, δ=2 (minimum degree), λ=2, κ=2 — all equal '
      + 'here, a special case of the inequality (common in symmetric graphs), but the inequality '
      + 'itself has an independent structural proof for each step: removing all δ edges at a '
      + 'minimum-degree vertex always isolates it (λ≤δ); removing the two endpoints of a minimum '
      + 'edge cut costs at most as much as removing the edges themselves (κ≤λ). This holds for '
      + 'EVERY graph, never merely the one it was checked against.\n\n'
      + "MENGER'S THEOREM IS AN EXACT, CHECKABLE EQUALITY BETWEEN A MINIMUM AND A MAXIMUM, NEVER A "
      + 'LOOSE CORRELATION: κ(G) EQUALS the maximum number of internally-disjoint paths (sharing no '
      + 'vertices except endpoints) between any two non-adjacent vertices. For the 4-cycle, κ=2, '
      + 'and between non-adjacent vertices A and C there are EXACTLY 2 internally-disjoint paths '
      + '(A-B-C and A-D-C) — matching κ=2 exactly, never "roughly 2" or merely correlated with it.',
    targetedMisconceptions: [`${CONNECTIVITY}:MC-1`, `${CONNECTIVITY}:MC-2`, `${CONNECTIVITY}:MC-3`],
    source: eb(CONNECTIVITY, "Core Understanding — vertex/edge connectivity as quantitative refinements of the binary connected fact never redundant with it, κ≤λ≤δ as a general theorem true for every graph never a coincidental single-example pattern, and Menger's theorem as an exact checkable equality never a loose correlation"),
  },
]

export const MATHEMATICS_PROB_COMBINATORIAL_PROBABILITY_GRAPH_GRAPH_CONNECTIVITY_PROBES: SeedProbe[] = [
  {
    conceptId: COMBINATORIAL_PROBABILITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Five people apply for 3 identical committee seats — does the order in which they\'re named matter?',
    choices: [
      { text: 'No — "Alice, Bob, Carol" and "Carol, Alice, Bob" form the same committee, so only C(5,3)=10 applies, never P(5,3)=5×4×3=60', isCorrect: true },
      { text: 'Yes — choosing 3 people from 5 always requires P(5,3)=60, since selecting distinct people inherently involves an ordered process', isCorrect: false, misconceptionId: `${COMBINATORIAL_PROBABILITY}:MC-1` },
      { text: "Yes, since the multiplication rule (5×4×3) should be applied whenever items are being picked one at a time", isCorrect: false, misconceptionId: `${COMBINATORIAL_PROBABILITY}:MC-1` },
    ],
    targetedMisconceptions: [`${COMBINATORIAL_PROBABILITY}:MC-1`],
    source: eb(COMBINATORIAL_PROBABILITY, 'Misconceptions MC-1 detection probe (Discovery Question 1) — 5 people for 3 identical committee seats, an assumption order matters confirming ORDER-ALWAYS-MATTERS-WHEN-PICKING-ITEMS'),
  },
  {
    conceptId: COMBINATORIAL_PROBABILITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If |Ω| is counted using ordered sequences, must |A| also use ordered sequences, or can it use a different model?',
    choices: [
      { text: '|A| must also use ordered sequences — |Ω| and |A| must consistently use the SAME counting model throughout (both ordered or both unordered); mixing models produces a wrong probability', isCorrect: true },
      { text: '|A| can use whichever model is more convenient, independent of how |Ω| was counted', isCorrect: false, misconceptionId: `${COMBINATORIAL_PROBABILITY}:MC-2` },
      { text: "It doesn't matter which model each uses, since the final probability ratio corrects for any mismatch automatically", isCorrect: false, misconceptionId: `${COMBINATORIAL_PROBABILITY}:MC-2` },
    ],
    targetedMisconceptions: [`${COMBINATORIAL_PROBABILITY}:MC-2`],
    source: eb(COMBINATORIAL_PROBABILITY, 'Misconceptions MC-2 detection probe (Discovery Question 2) — whether |A| can use a different model from |Ω|, an answer allowing inconsistency confirming |Ω|-AND-|A|-COUNTED-SEPARATELY-WITHOUT-CONSISTENCY-CHECK'),
  },
  {
    conceptId: COMBINATORIAL_PROBABILITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is complementary counting just a harder, roundabout way to solve "at least one" problems?',
    choices: [
      { text: 'No — for P(at least 2 of 10 people share a birthday), the complement "all 10 different" is one clean computation, while directly summing "exactly 2," "exactly 3," etc. requires many cases; the complement is often the CLEANEST route, not a compromise', isCorrect: true },
      { text: 'Yes — directly summing all the "exactly k" cases is more thorough and mathematically preferable to using the complement', isCorrect: false, misconceptionId: `${COMBINATORIAL_PROBABILITY}:MC-3` },
      { text: "Yes, since complementary counting is only a shortcut used when the direct method is too difficult to attempt", isCorrect: false, misconceptionId: `${COMBINATORIAL_PROBABILITY}:MC-3` },
    ],
    targetedMisconceptions: [`${COMBINATORIAL_PROBABILITY}:MC-3`],
    source: eb(COMBINATORIAL_PROBABILITY, 'Misconceptions MC-3 detection probe (Discovery Question 3) — whether complementary counting is just a harder roundabout method, an answer of "yes" confirming COMPLEMENTARY-COUNTING-IS-JUST-HARDER'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a graph has order 6, does it necessarily have size 6 too?',
    choices: [
      { text: 'No — order (vertex count) and size (edge count) are independent counts; a graph with order 6 could have any size from 0 up to C(6,2)=15, determined entirely by which edges actually exist', isCorrect: true },
      { text: 'Yes — a graph\'s order and size must always be equal', isCorrect: false, misconceptionId: `${GRAPH}:MC-1` },
      { text: "Yes, since every vertex in a graph must connect to exactly one edge", isCorrect: false, misconceptionId: `${GRAPH}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH}:MC-1`],
    source: eb(GRAPH, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a graph with order 6, an assumption size must also be 6 confirming ORDER-SIZE-ASSUMED-EQUAL'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does adding distances to a road network\'s edges change which towns are connected to which?',
    choices: [
      { text: 'No — a weighted graph is the SAME underlying graph with numeric labels added on top; the connectivity structure (which vertices connect to which) is completely unchanged by adding or removing weights', isCorrect: true },
      { text: 'Yes — adding weights to a graph\'s edges creates a fundamentally different structure', isCorrect: false, misconceptionId: `${GRAPH}:MC-2` },
      { text: "Yes, since a weighted graph is a different kind of mathematical object from an unweighted one", isCorrect: false, misconceptionId: `${GRAPH}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH}:MC-2`],
    source: eb(GRAPH, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — adding distances to a road network, an answer of "yes" (changes connectivity) confirming WEIGHTED-GRAPH-DIFFERENT-OBJECT'),
  },
  {
    conceptId: GRAPH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In a multigraph, vertex X has two distinct edges to vertex Y and no other edges. What is deg(X)?',
    choices: [
      { text: '2 — degree counts edge-incidences, not distinct neighbors; each of the two separate edges to Y contributes 1 to deg(X)', isCorrect: true },
      { text: '1 — since X has only one distinct neighbor (Y), regardless of how many edges connect them', isCorrect: false, misconceptionId: `${GRAPH}:MC-3` },
      { text: "1, because degree in any graph counts the number of distinct vertices reachable in one step", isCorrect: false, misconceptionId: `${GRAPH}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH}:MC-3`],
    source: eb(GRAPH, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — a multigraph vertex with two edges to the same neighbor, an answer of 1 confirming MULTIGRAPH-DEGREE-BY-NEIGHBOR-COUNT'),
  },
  {
    conceptId: CONNECTIVITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Once you know a graph is "connected" in the binary sense, does that already tell you everything meaningful about its connection structure?',
    choices: [
      { text: 'No — a star graph and a 4-cycle are both connected, yet removing the star\'s single hub disconnects it entirely (κ=1) while the cycle survives any single-vertex removal (κ=2); connectivity as a number reveals genuinely different robustness the binary fact hides', isCorrect: true },
      { text: 'Yes — once a graph is known to be connected, no further meaningful distinction about its connection structure remains', isCorrect: false, misconceptionId: `${CONNECTIVITY}:MC-1` },
      { text: "Yes, since 'connected' is a complete classification that captures all relevant structural information", isCorrect: false, misconceptionId: `${CONNECTIVITY}:MC-1` },
    ],
    targetedMisconceptions: [`${CONNECTIVITY}:MC-1`],
    source: eb(CONNECTIVITY, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether binary connectedness is sufficient, an answer of "yes" confirming BINARY-CONNECTEDNESS-ASSUMED-SUFFICIENT'),
  },
  {
    conceptId: CONNECTIVITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could κ, λ, and δ appear in any order for some graph, or is κ(G)≤λ(G)≤δ(G) a general theorem?',
    choices: [
      { text: 'It is a general theorem, true for every graph — removing all δ edges at a minimum-degree vertex always isolates it (λ≤δ), and removing a minimum edge cut\'s two endpoints costs at most as much as removing the edges themselves (κ≤λ)', isCorrect: true },
      { text: 'Any order is possible — the inequality just happens to hold for symmetric examples that have been checked so far', isCorrect: false, misconceptionId: `${CONNECTIVITY}:MC-2` },
      { text: "It's a pattern observed empirically on specific graphs, not something provable for graphs in general", isCorrect: false, misconceptionId: `${CONNECTIVITY}:MC-2` },
    ],
    targetedMisconceptions: [`${CONNECTIVITY}:MC-2`],
    source: eb(CONNECTIVITY, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether κ≤λ≤δ could appear in any order, an answer of "yes" confirming KAPPA-LAMBDA-DELTA-INEQUALITY-ASSUMED-COINCIDENTAL'),
  },
  {
    conceptId: CONNECTIVITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is Menger's theorem a loose intuitive statement about paths and connectivity being correlated, or a precise, checkable equality?",
    choices: [
      { text: 'A precise, checkable equality — for the 4-cycle, κ=2 exactly, and the maximum number of internally-disjoint paths between non-adjacent vertices A and C is ALSO exactly 2 (A-B-C and A-D-C); the two numbers match exactly, never merely "roughly"', isCorrect: true },
      { text: 'A loose statement — more disjoint paths generally correlates with higher connectivity, but the exact numbers need not match', isCorrect: false, misconceptionId: `${CONNECTIVITY}:MC-3` },
      { text: "A rough heuristic, since path counts and vertex connectivity measure related but ultimately different things", isCorrect: false, misconceptionId: `${CONNECTIVITY}:MC-3` },
    ],
    targetedMisconceptions: [`${CONNECTIVITY}:MC-3`],
    source: eb(CONNECTIVITY, "Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether Menger's theorem is a loose correlation, an answer of 'a loose statement' confirming MENGERS-THEOREM-ASSUMED-LOOSE-CORRELATION"),
  },
]

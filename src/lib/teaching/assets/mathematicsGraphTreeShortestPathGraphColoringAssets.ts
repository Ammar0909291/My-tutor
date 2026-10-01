/**
 * Batch: tree, shortest-path, graph-coloring (math.graph).
 *
 * Continues math.graph (2/16 -> 5/16) after the opening graph+connectivity
 * batch. Fresh frontier recompute found 14 ready concepts; these 3
 * selected for downstream value: tree unlocks minimum-spanning-tree,
 * shortest-path unlocks maximum-flow (already independently ready via
 * connectivity), and graph-coloring closes another leaf. Transcribed from
 * the frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.graph.{tree,shortest-path,graph-coloring}.md.
 *
 * Grade band: tree (EB difficulty "proficient") has sole prerequisite
 * math.disc.graph-trees, GradeBand.HIGH — GradeBand.HIGH retained.
 * shortest-path (EB difficulty "proficient") requires BOTH math.graph.graph
 * (GradeBand.HIGH) and math.disc.asymptotic-notation (GradeBand.
 * UNDERGRADUATE, whose Big-O complexity-analysis machinery is central to
 * this concept's own algorithm-comparison content) — GradeBand.
 * UNDERGRADUATE adopted, matching the precedent set for other math.disc/
 * math.graph concepts whose core content is inseparable from an
 * undergraduate-level prerequisite. graph-coloring (EB difficulty
 * "expert") has sole prerequisite math.disc.graph-coloring, GradeBand.HIGH
 * — GradeBand.HIGH retained despite the "expert" label, since (unlike
 * math.disc.complexity-classes and similar) no prerequisite here actually
 * pulls into undergraduate content; grade band follows the prerequisite
 * chain, never a subjective difficulty impression alone.
 *
 *   TREE (math.graph)  Any TWO of {connected, acyclic, m=n-1} force the
 *           THIRD — this is a proof TOOL, never three independent
 *           conditions each requiring separate verification; a vertex's
 *           multiplicity in its own Prüfer sequence directly encodes
 *           deg(v)-1, never an opaque code requiring full decoding first;
 *           Cayley's formula nⁿ⁻² counts LABELED trees (distinct vertex
 *           names), never the much smaller, structurally different count
 *           of unlabeled tree shapes.
 *   SHORTEST-PATH  Dijkstra's finalization invariant depends ENTIRELY on
 *           non-negative weights — it silently breaks with a negative
 *           edge, never remaining correct; Bellman-Ford's convergence is
 *           guaranteed in EXACTLY n-1 rounds, with the nth round serving
 *           negative-cycle DETECTION, never further convergence; a
 *           negative cycle in Floyd-Warshall is provable ONLY from a
 *           negative DIAGONAL entry, never from an off-diagonal one (which
 *           just means a cheap directed path exists).
 *   GRAPH-COLORING (math.graph)  χ(G)≥ω(G) is a LOWER BOUND, never an
 *           equality — triangle-free graphs (Mycielski construction) can
 *           have arbitrarily large chromatic number despite ω=2; the Five
 *           Color Theorem's Kempe-chain proof does NOT extend to four
 *           colors — the fifth color's buffer role is exactly what
 *           Heawood's 1890 correction shows is missing; Vizing's theorem
 *           (Δ≤χ'≤Δ+1) applies ONLY to simple graphs, never multigraphs,
 *           which instead need Shannon's looser bound.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const TREE = 'math.graph.tree'
const SHORTEST_PATH = 'math.graph.shortest-path'
const GRAPH_COLORING = 'math.graph.graph-coloring'

export const MATHEMATICS_GRAPH_TREE_SHORTEST_PATH_GRAPH_COLORING_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: TREE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'ANY TWO OF {CONNECTED, ACYCLIC, m=n-1} FORCE THE THIRD — A PROOF TOOL, NEVER THREE '
      + 'INDEPENDENT CONDITIONS EACH REQUIRING SEPARATE VERIFICATION: a connected graph with n-1 '
      + 'edges cannot fail to be acyclic — a cycle among connected vertices would force at least as '
      + 'many edges as vertices in that cyclic portion, exceeding n-1 once connectivity to the rest '
      + 'is added. So being handed information matching ONE characterization (e.g. "connected, '
      + 'n-1 edges") lets you immediately conclude ALL the others (acyclic, unique paths, every '
      + 'edge a bridge) without separately checking each — a problem stated in terms of a different '
      + 'characterization than the one memorized is not actually a different problem.\n\n'
      + "A VERTEX'S MULTIPLICITY IN ITS OWN PRÜFER SEQUENCE DIRECTLY ENCODES deg(v)-1, NEVER AN "
      + 'OPAQUE CODE REQUIRING FULL DECODING FIRST: for the tree on {1,2,3,4,5} with edges '
      + '{1,3},{2,3},{3,4},{4,5}, the Prüfer sequence is (3,3,4) — vertex 3 appears twice, so '
      + 'deg(3)=2+1=3; vertex 4 appears once, so deg(4)=1+1=2; vertices 1,2,5 (absent from the '
      + 'sequence) are leaves with deg=1. Check: 3+2+1+1+1=8=2×4=2(n-1) ✓. A leaf never appears in '
      + 'the sequence (it is removed, not recorded), and each recording corresponds to one of a '
      + "vertex's OTHER edges being pruned away — the sequence is transparent information about the "
      + 'tree, never an opaque symbol string readable only after full decoding.\n\n'
      + "CAYLEY'S FORMULA nⁿ⁻² COUNTS LABELED TREES, NEVER THE MUCH SMALLER COUNT OF UNLABELED TREE "
      + 'SHAPES: for n=3, Cayley predicts 3¹=3 labeled trees — direct listing confirms exactly 3 '
      + '({1-2,2-3}, {1-3,3-2}, {1-2,1-3}) — but all three are the SAME unlabeled shape (a path of '
      + 'length 2) once vertex labels are ignored, so there is exactly ONE nonisomorphic tree shape '
      + 'on 3 vertices, never three. "How many trees on n vertices" is genuinely ambiguous between '
      + 'these two questions, and Cayley\'s exponential formula answers only the labeled one.',
    targetedMisconceptions: [`${TREE}:MC-1`, `${TREE}:MC-2`, `${TREE}:MC-3`],
    source: eb(TREE, "Core Understanding — any two of the tree's three characterizing properties forcing the third as a proof tool never independent conditions, a Prüfer sequence's multiplicities directly encoding degree information never an opaque code, and Cayley's formula counting labeled trees never the much smaller unlabeled-shape count"),
  },
  {
    conceptId: SHORTEST_PATH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "DIJKSTRA'S FINALIZATION INVARIANT DEPENDS ENTIRELY ON NON-NEGATIVE WEIGHTS — IT SILENTLY "
      + 'BREAKS WITH A NEGATIVE EDGE, NEVER REMAINING CORRECT: once Dijkstra extracts vertex u '
      + '(finalizing d[u]), every future relaxation can only ever INCREASE a candidate distance '
      + "through u, never decrease d[u] itself below its already-extracted value — but this "
      + "guarantee relies entirely on every edge weight being ≥0. A negative edge from a LATER "
      + "vertex can reduce an ALREADY-finalized vertex's true shortest distance below what Dijkstra "
      + 'already sealed, returning a wrong answer; Dijkstra requires w(e)≥0 for every edge, never '
      + 'merely "mostly non-negative."\n\n'
      + "BELLMAN-FORD'S CONVERGENCE IS GUARANTEED IN EXACTLY n-1 ROUNDS, WITH THE nTH ROUND SERVING "
      + 'NEGATIVE-CYCLE DETECTION, NEVER FURTHER CONVERGENCE: after k relaxation rounds, d[v] '
      + 'equals the true shortest-path weight using AT MOST k edges; since any simple shortest path '
      + '(in a negative-cycle-free graph) uses at most n-1 edges, n-1 rounds already achieve full '
      + 'correctness. A final, nth relaxation pass serves a COMPLETELY DIFFERENT purpose: if any '
      + 'edge still relaxes after n-1 rounds, a negative cycle is reachable — this is diagnostic, '
      + 'never additional convergence work.\n\n'
      + 'A NEGATIVE CYCLE IN FLOYD-WARSHALL IS PROVABLE ONLY FROM A NEGATIVE DIAGONAL ENTRY, NEVER '
      + 'FROM AN OFF-DIAGONAL ONE: d[v][v]<0 for some v proves a negative cycle through v, since '
      + 'such a cycle must both start and end at v — its evidence appears only on the diagonal. An '
      + 'off-diagonal negative entry d[i][j]<0 simply means a cheap directed path exists from i to '
      + 'j, with NO cyclic claim implied at all; treating any negative distance-matrix entry as '
      + 'cycle evidence is never correct.',
    targetedMisconceptions: [`${SHORTEST_PATH}:MC-1`, `${SHORTEST_PATH}:MC-2`, `${SHORTEST_PATH}:MC-3`],
    source: eb(SHORTEST_PATH, "Core Understanding — Dijkstra's finalization invariant depending entirely on non-negative weights never remaining correct with a negative edge, Bellman-Ford's convergence guaranteed in exactly n-1 rounds with the nth round serving detection never more convergence, and a negative cycle in Floyd-Warshall provable only from a diagonal entry never an off-diagonal one"),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'χ(G)≥ω(G) IS A LOWER BOUND, NEVER AN EQUALITY: a clique of size ω needs ω distinct colors, '
      + 'giving the genuine lower bound χ(G)≥ω(G) — but the Mycielski construction produces '
      + 'triangle-free graphs (ω=2) with arbitrarily large chromatic number, the smallest example '
      + 'being the Grötzsch graph (11 vertices, triangle-free, χ=4). Sparseness in one structural '
      + 'sense (no triangles) never bounds chromatic number from above; the bound runs in only ONE '
      + "direction, and BROOKS' THEOREM (for a connected graph, χ(G)≤Δ(G) unless G is a complete "
      + 'graph or an odd cycle) supplies the genuine upper-bound direction instead.\n\n'
      + 'THE FIVE COLOR THEOREM\'S KEMPE-CHAIN PROOF DOES NOT EXTEND TO FOUR COLORS — THE FIFTH '
      + "COLOR'S BUFFER ROLE IS EXACTLY WHAT HEAWOOD'S 1890 CORRECTION SHOWS IS MISSING: the Five "
      + 'Color proof removes a degree-≤5 vertex v, 5-colors the rest by induction, then reintroduces '
      + 'v — if all 5 neighbor colors are used, a Kempe chain swap (along a connected two-color '
      + 'component) frees a color, because a FIFTH color is always available as a buffer preventing '
      + 'chain entanglement. With only FOUR colors, no such buffer exists, and two Kempe chains CAN '
      + 'become entangled in a way no simple local swap resolves — exactly the gap in Kempe\'s own '
      + '1879 attempt that Heawood found in 1890, which is why the real Four Color proof needed an '
      + 'entirely different, exhaustive, computer-assisted approach.\n\n'
      + "VIZING'S THEOREM (Δ≤χ'≤Δ+1) APPLIES ONLY TO SIMPLE GRAPHS, NEVER MULTIGRAPHS: Vizing's "
      + "proof structure (an augmenting-path recoloring argument) genuinely requires the absence of "
      + 'parallel edges to go through. For multigraphs with maximum edge multiplicity μ, Shannon\'s '
      + 'theorem instead gives χ\'≤⌊3Δ/2⌋, which can be FAR LARGER than Δ+1 — applying Vizing\'s '
      + 'tighter simple-graph bound to a multigraph with high edge multiplicity is never valid, even '
      + 'though the two bounds can coincidentally agree in low-multiplicity cases.',
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-1`, `${GRAPH_COLORING}:MC-2`, `${GRAPH_COLORING}:MC-3`],
    source: eb(GRAPH_COLORING, "Core Understanding — χ(G)≥ω(G) as a lower bound never an equality (with the Mycielski/Grötzsch counterexample), the Five Color Theorem's Kempe-chain proof never extending to four colors due to the missing buffer color, and Vizing's theorem applying only to simple graphs never multigraphs which need Shannon's looser bound instead"),
  },
]

export const MATHEMATICS_GRAPH_TREE_SHORTEST_PATH_GRAPH_COLORING_PROBES: SeedProbe[] = [
  {
    conceptId: TREE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can a connected graph with n-1 edges fail to be a tree?',
    choices: [
      { text: 'No — connected plus n-1 edges already forces acyclicity; a cycle among connected vertices would force at least as many edges as vertices in that cyclic portion, exceeding n-1 once the rest is connected', isCorrect: true },
      { text: 'Yes — you would still need to separately check for cycles even after confirming the graph is connected with n-1 edges', isCorrect: false, misconceptionId: `${TREE}:MC-1` },
      { text: "Yes, since connectedness and edge count are independent from acyclicity and must always be verified separately", isCorrect: false, misconceptionId: `${TREE}:MC-1` },
    ],
    targetedMisconceptions: [`${TREE}:MC-1`],
    source: eb(TREE, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a connected graph with n-1 edges, hesitation or "yes" confirming TREE-REQUIRES-THREE-PROPERTIES'),
  },
  {
    conceptId: TREE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Given Prüfer sequence (3,3,4) on n=5 vertices, what is the degree of vertex 3?',
    choices: [
      { text: '3 — vertex 3 appears twice in the sequence, and a vertex\'s multiplicity plus 1 gives its degree, so deg(3)=2+1=3, readable directly without decoding the full tree', isCorrect: true },
      { text: 'The degree cannot be determined without first fully decoding the sequence into the actual tree', isCorrect: false, misconceptionId: `${TREE}:MC-2` },
      { text: "The Prüfer sequence has no relationship to vertex degrees; it's purely a structural fingerprint", isCorrect: false, misconceptionId: `${TREE}:MC-2` },
    ],
    targetedMisconceptions: [`${TREE}:MC-2`],
    source: eb(TREE, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — the Prüfer sequence (3,3,4), an inability to state degree without decoding confirming PRUFER-SEQUENCE-ENCODES-STRUCTURE-NOT-DEGREES'),
  },
  {
    conceptId: TREE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many labeled trees exist on n=3 vertices, and how many DIFFERENT-SHAPED (unlabeled) trees exist on 3 vertices?',
    choices: [
      { text: '3 labeled trees (Cayley\'s formula: 3¹=3) but only 1 unlabeled shape — all three labeled trees are the same path shape once vertex labels are ignored', isCorrect: true },
      { text: '3 labeled trees and 3 unlabeled shapes — the same count applies to both questions', isCorrect: false, misconceptionId: `${TREE}:MC-3` },
      { text: "Cayley's formula directly answers both the labeled and unlabeled counting questions with the same number", isCorrect: false, misconceptionId: `${TREE}:MC-3` },
    ],
    targetedMisconceptions: [`${TREE}:MC-3`],
    source: eb(TREE, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — labeled versus unlabeled tree counts for n=3, giving the same answer to both confirming CAYLEY-COUNTS-UNLABELED-TREES'),
  },
  {
    conceptId: SHORTEST_PATH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a vertex has been "finalized" by Dijkstra, what would have to be true for a LATER edge to still improve its distance? Can that happen with negative weights?',
    choices: [
      { text: 'Yes — with a negative edge, a later relaxation could reduce an already-finalized vertex\'s true shortest distance below its sealed value, since Dijkstra\'s finalization invariant only holds when every edge weight is non-negative', isCorrect: true },
      { text: 'No — once Dijkstra extracts and finalizes a vertex, its distance remains correct regardless of any negative edges elsewhere in the graph', isCorrect: false, misconceptionId: `${SHORTEST_PATH}:MC-1` },
      { text: "No, since Dijkstra's algorithm produces correct shortest paths for any combination of edge weights", isCorrect: false, misconceptionId: `${SHORTEST_PATH}:MC-1` },
    ],
    targetedMisconceptions: [`${SHORTEST_PATH}:MC-1`],
    source: eb(SHORTEST_PATH, 'Misconceptions MC-1 detection probe (Discovery Question 1) — whether a negative edge can violate Dijkstra\'s finalization, an answer of "no" confirming DIJKSTRA-WORKS-WITH-NEGATIVE-EDGES'),
  },
  {
    conceptId: SHORTEST_PATH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "If Bellman-Ford's own invariant guarantees correctness after n-1 rounds, what is the nth round actually checking?",
    choices: [
      { text: 'Negative-cycle detection — since any simple shortest path (in a negative-cycle-free graph) uses at most n-1 edges, round n-1 already achieves full convergence; if any edge still relaxes on round n, a negative cycle is reachable', isCorrect: true },
      { text: "Further convergence — the nth round is needed to fully stabilize distances that the first n-1 rounds didn't finish computing", isCorrect: false, misconceptionId: `${SHORTEST_PATH}:MC-2` },
      { text: "The same thing every prior round checks, just one more pass for extra safety", isCorrect: false, misconceptionId: `${SHORTEST_PATH}:MC-2` },
    ],
    targetedMisconceptions: [`${SHORTEST_PATH}:MC-2`],
    source: eb(SHORTEST_PATH, 'Misconceptions MC-2 detection probe (Discovery Question 2) — what the nth Bellman-Ford round checks, an answer treating it as more convergence confirming BELLMAN-FORD-NEEDS-MORE-THAN-N-MINUS-1-ROUNDS'),
  },
  {
    conceptId: SHORTEST_PATH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a negative entry ANYWHERE in the Floyd-Warshall distance matrix prove a negative cycle, or only a negative entry in a SPECIFIC location?',
    choices: [
      { text: 'Only a negative DIAGONAL entry d[v][v]<0 proves a negative cycle (through v, since such a cycle must start and end at v); an off-diagonal negative entry d[i][j]<0 simply means a cheap directed path from i to j exists, with no cyclic claim implied', isCorrect: true },
      { text: 'Any negative entry anywhere in the matrix, diagonal or off-diagonal, proves a negative cycle exists', isCorrect: false, misconceptionId: `${SHORTEST_PATH}:MC-3` },
      { text: "A negative off-diagonal entry is actually the primary signal of a negative cycle, more so than the diagonal", isCorrect: false, misconceptionId: `${SHORTEST_PATH}:MC-3` },
    ],
    targetedMisconceptions: [`${SHORTEST_PATH}:MC-3`],
    source: eb(SHORTEST_PATH, 'Misconceptions MC-3 detection probe (Discovery Question 3) — whether any negative matrix entry proves a negative cycle, an answer of "anywhere" confirming FLOYD-WARSHALL-NEGATIVE-CYCLE-FROM-OFF-DIAGONAL'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a graph has no triangle (ω=2), is χ≤3 guaranteed?',
    choices: [
      { text: 'No — the Grötzsch graph (11 vertices, triangle-free, ω=2) has χ=4; the Mycielski construction shows triangle-free graphs can have arbitrarily large chromatic number, so ω=2 gives no upper bound at all on χ', isCorrect: true },
      { text: 'Yes — a triangle-free graph is guaranteed to be 3-colorable', isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-1` },
      { text: "Yes, since χ(G) always equals ω(G) exactly for any graph", isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-1`],
    source: eb(GRAPH_COLORING, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a triangle-free graph, an assumption χ≤3 is guaranteed confirming CHROMATIC-NUMBER-EQUALS-CLIQUE-NUMBER'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does the Kempe-chain argument used to prove the Five Color Theorem fail when attempted with only four colors?',
    choices: [
      { text: 'With five colors, a fifth "buffer" color is always available to prevent two Kempe chains from becoming entangled during the swap; with only four colors, no such buffer exists, and two chains CAN become entangled in a way no simple local swap can resolve — exactly the gap Heawood found in Kempe\'s 1879 attempt', isCorrect: true },
      { text: 'The identical Kempe-chain swapping argument also works with four colors, just requiring more careful bookkeeping', isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-2` },
      { text: "It doesn't fail — Kempe's original 1879 four-color proof was actually correct as stated", isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-2`],
    source: eb(GRAPH_COLORING, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — why the Kempe-chain argument fails at four colors, an inability to identify the failure or an assumption it "also works" confirming FIVE-COLOR-PROOF-EXTENDS-TO-FOUR'),
  },
  {
    conceptId: GRAPH_COLORING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two vertices are joined by 4 parallel edges in a multigraph. Does Vizing\'s theorem bound χ\'≤Δ+1=5 for this multigraph?',
    choices: [
      { text: 'No — Vizing\'s theorem applies ONLY to simple graphs; for multigraphs with edge multiplicity μ, Shannon\'s theorem gives χ\'≤⌊3Δ/2⌋ instead, which can be far larger than Δ+1 for high-multiplicity cases', isCorrect: true },
      { text: 'Yes — Vizing\'s theorem\'s Δ≤χ\'≤Δ+1 bound applies to any graph, including multigraphs with parallel edges', isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-3` },
      { text: "Yes, since the term 'graph' in Vizing's theorem is understood to include multigraphs as a special case", isCorrect: false, misconceptionId: `${GRAPH_COLORING}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_COLORING}:MC-3`],
    source: eb(GRAPH_COLORING, "Misconceptions MC-3 detection probe (verbatim, Blueprint) — 4 parallel edges between two vertices, an answer of \"yes\" (Vizing applies) confirming VIZING-HOLDS-FOR-MULTIGRAPHS"),
  },
]

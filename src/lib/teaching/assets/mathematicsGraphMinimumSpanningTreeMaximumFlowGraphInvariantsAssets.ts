/**
 * Batch: minimum-spanning-tree, maximum-flow, graph-invariants (math.graph).
 *
 * Continues math.graph (5/16 -> 8/16) after the tree/shortest-path/
 * graph-coloring batch. Fresh frontier recompute found 11 ready concepts,
 * ALL leaves (none list any `unlocks`) — the domain has reached its
 * post-hub layer, so this batch was selected for balanced coverage
 * (a classic optimization algorithm, a duality theorem, and a structural
 * toolkit concept) rather than further unblocking value. Transcribed from
 * the frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.graph.{minimum-spanning-tree,maximum-flow,
 * graph-invariants}.md.
 *
 * Grade band: all three retain GradeBand.HIGH. minimum-spanning-tree (EB
 * difficulty "proficient") has sole prerequisite math.disc.spanning-tree,
 * itself GradeBand.HIGH. maximum-flow (EB difficulty "expert") has sole
 * prerequisite math.graph.connectivity, GradeBand.HIGH. graph-invariants
 * (EB difficulty "proficient") has sole prerequisite math.graph.graph,
 * GradeBand.HIGH. None of the three has a prerequisite that itself pulls
 * into undergraduate content, so — per the established convention — grade
 * band follows the prerequisite chain, never the EB difficulty label alone,
 * and all three stay HIGH despite "proficient"/"expert" labels.
 *
 *   MINIMUM-SPANNING-TREE (math.graph)  Kruskal's and Prim's are BOTH
 *           RESTRICTED greedy strategies, never unrestricted "always pick
 *           globally cheapest" — each applies exactly one structural
 *           restriction (cycle-avoidance, frontier-crossing) that
 *           independently implements the cut property; MST uniqueness is
 *           earned specifically by DISTINCT weights as a SUFFICIENT, never
 *           a NECESSARY, condition — some repeated-weight graphs still have
 *           a unique MST; an MST minimizes TOTAL weight, never per-vertex
 *           reachability from one source — it answers a different question
 *           than a shortest-path tree and the two trees can differ
 *           structurally on the same graph.
 *   MAXIMUM-FLOW  A backward residual edge represents CANCELLABLE
 *           committed flow, never a literal physical reverse pipe; the
 *           minimum cut extracted from the final residual graph is never
 *           guaranteed UNIQUE — multiple partitions can share the identical
 *           minimum capacity; the bipartite-matching-to-flow reduction
 *           works ONLY because of bipartite structure's two-sided layering
 *           and does NOT extend to general (non-bipartite) matching, which
 *           needs Edmonds' blossom algorithm instead.
 *   GRAPH-INVARIANTS  A matching invariant (even several at once) NEVER
 *           proves isomorphism — only a mismatch proves non-isomorphism;
 *           it is a one-way filter, and $C_6$ vs $C_3\sqcup C_3$ share
 *           order/size/degree-sequence yet are not isomorphic; diameter
 *           (longest shortest-path) and girth (shortest cycle length) are
 *           UNRELATED quantities, never the same measurement, and can move
 *           independently (a tree has finite diameter but infinite girth);
 *           isomorphism is a STRUCTURE-PRESERVING BIJECTION, never literal
 *           vertex/edge-set equality — completely disjoint labels can still
 *           be the identical abstract graph.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const MST = 'math.graph.minimum-spanning-tree'
const MAX_FLOW = 'math.graph.maximum-flow'
const GRAPH_INVARIANTS = 'math.graph.graph-invariants'

export const MATHEMATICS_GRAPH_MINIMUM_SPANNING_TREE_MAXIMUM_FLOW_GRAPH_INVARIANTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      "KRUSKAL'S AND PRIM'S ARE BOTH RESTRICTED GREEDY STRATEGIES, NEVER UNRESTRICTED "
      + '"ALWAYS PICK THE GLOBALLY CHEAPEST EDGE": Kruskal\'s restriction is cycle-avoidance — sort '
      + 'edges ascending, add each one unless it creates a cycle; Prim\'s restriction is '
      + 'frontier-crossing — only ever consider edges with exactly one endpoint already in the '
      + 'growing tree. Both restrictions, independently, are exactly what implements the CUT '
      + 'PROPERTY (the minimum-weight edge crossing any cut belongs to every MST): Kruskal\'s added '
      + 'edge is always the cheapest crossing SOME cut with no cheaper alternative yet available; '
      + "Prim's added edge is literally the cheapest edge crossing the CURRENT frontier cut. Neither "
      + 'algorithm is "just greedy" in the naive sense — a genuinely unrestricted greedy rule (pick '
      + 'the cheapest unused edge anywhere, ignoring cycles and frontiers alike) would produce '
      + 'invalid, disconnected results.\n\n'
      + 'MST UNIQUENESS IS EARNED SPECIFICALLY BY DISTINCT WEIGHTS AS A SUFFICIENT, NEVER A '
      + 'NECESSARY, CONDITION: if all edge weights are distinct, the MST is provably unique — but '
      + 'this is a one-directional implication, not a biconditional. $K_3$ with all three edges '
      + 'weight 1 has THREE tied, competing spanning trees (dropping any one edge), so its MST is '
      + 'NOT unique despite the tie; a path $P_3$ has only ONE spanning tree in existence (itself), '
      + 'so its MST IS unique despite having repeated weights too — because there was never a '
      + 'competing tree to tie against. Checking whether weights are distinct is never a substitute '
      + 'for checking whether a genuinely competing minimum-weight tree actually exists.\n\n'
      + 'AN MST MINIMIZES TOTAL WEIGHT, NEVER PER-VERTEX REACHABILITY FROM ONE SOURCE — A '
      + 'FUNDAMENTALLY DIFFERENT OBJECTIVE FROM A SHORTEST-PATH TREE: an MST answers "what is the '
      + 'cheapest way to connect every vertex together, period," while a shortest-path tree (e.g. '
      + "Dijkstra's tree from source $s$) answers \"what is the fastest way to REACH each vertex "
      + 'FROM $s$ specifically." These can produce structurally DIFFERENT trees on the identical '
      + "graph — a city's cheapest-to-build road network need not contain any commuter's fastest "
      + 'individual route between two specific points, and treating "cheapest overall network" and '
      + '"fastest point-to-point route" as the same question is never valid.',
    targetedMisconceptions: [`${MST}:MC-1`, `${MST}:MC-2`, `${MST}:MC-3`],
    source: eb(MST, "Core Understanding — Kruskal's and Prim's as both restricted (never unrestricted) greedy strategies each independently implementing the cut property, MST uniqueness earned specifically by distinct weights as a sufficient never necessary condition, and an MST minimizing total weight never per-vertex reachability from one source unlike a shortest-path tree"),
  },
  {
    conceptId: MAX_FLOW, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A BACKWARD RESIDUAL EDGE REPRESENTS CANCELLABLE COMMITTED FLOW, NEVER A LITERAL PHYSICAL '
      + 'REVERSE PIPE: the residual graph records, for each original edge, a forward residual '
      + 'capacity (remaining unused capacity) and a backward residual capacity (the amount of '
      + 'ALREADY-SENT flow that could be un-committed and rerouted elsewhere). Sending flow along a '
      + 'backward residual edge $(b,a)$ — even where NO original edge from $b$ to $a$ exists — simply '
      + 'DECREASES the previously-recorded forward flow $f(a,b)$, freeing that capacity for a better '
      + 'route. This is pure bookkeeping for cancellation, never a genuine physical reverse channel; '
      + 'the water-through-pipes intuition that introduces flow networks actively misleads once '
      + 'applied to the residual graph.\n\n'
      + 'THE MINIMUM CUT EXTRACTED FROM THE FINAL RESIDUAL GRAPH IS NEVER GUARANTEED UNIQUE — '
      + 'MULTIPLE PARTITIONS CAN SHARE THE IDENTICAL MINIMUM CAPACITY: the Max-Flow Min-Cut Theorem\'s '
      + 'canonical construction (the set of vertices reachable from $s$ in the final residual graph) '
      + 'gives ONE valid minimum cut, but a network with two independent bottleneck structures of '
      + 'equal capacity can have a second, entirely different partition achieving the SAME minimum '
      + 'value. The construction procedure outputting a single answer is never evidence that no other '
      + 'minimum cut exists — that must be checked separately, on the network\'s own structure.\n\n'
      + 'THE BIPARTITE-MATCHING-TO-FLOW REDUCTION WORKS ONLY BECAUSE OF BIPARTITE STRUCTURE\'S '
      + 'TWO-SIDED LAYERING, AND DOES NOT EXTEND TO GENERAL (NON-BIPARTITE) MATCHING: building a '
      + 'unit-capacity network with source behind side $A$ and sink behind side $B$ forces every unit '
      + 'of flow to cross the $A$-$B$ boundary exactly once, making integer flow value exactly equal '
      + "matching size — but this construction depends entirely on the graph HAVING two sides with no "
      + 'internal edges. A general graph containing an odd cycle (e.g. $C_5$) has no such bipartition '
      + 'at all, so the construction has no analogue to build, and general matching genuinely requires '
      + "Edmonds' substantially more intricate blossom algorithm instead — the elegant bipartite "
      + 'reduction is never a universal matching technique.',
    targetedMisconceptions: [`${MAX_FLOW}:MC-1`, `${MAX_FLOW}:MC-2`, `${MAX_FLOW}:MC-3`],
    source: eb(MAX_FLOW, 'Core Understanding — a backward residual edge representing cancellable committed flow never a literal physical reverse pipe, the minimum cut from the final residual graph never guaranteed unique, and the bipartite matching reduction working only because of bipartite two-sided layering never extending to general non-bipartite matching'),
  },
  {
    conceptId: GRAPH_INVARIANTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A MATCHING INVARIANT (EVEN SEVERAL AT ONCE) NEVER PROVES ISOMORPHISM — IT IS A ONE-WAY '
      + 'FILTER, ONLY A MISMATCH PROVES NON-ISOMORPHISM: a graph invariant is any property that '
      + 'isomorphic graphs must agree on, so $I(G_1)\\neq I(G_2)$ instantly proves $G_1\\not\\cong '
      + 'G_2$ — but the converse direction is FALSE. $C_6$ (the 6-cycle) and $C_3\\sqcup C_3$ (two '
      + 'disjoint triangles) share identical order ($n=6$), size ($m=6$), and degree sequence '
      + '$(2,2,2,2,2,2)$ — yet $C_6$ has ONE connected component while $C_3\\sqcup C_3$ has TWO, so '
      + 'they are genuinely NOT isomorphic despite three matching invariants. Matching invariants '
      + 'raise suspicion of isomorphism without ever confirming it; only an explicit adjacency-'
      + 'preserving bijection settles the question.\n\n'
      + 'DIAMETER AND GIRTH ARE UNRELATED QUANTITIES, NEVER THE SAME MEASUREMENT, AND CAN MOVE '
      + 'INDEPENDENTLY: diameter is the MAXIMUM shortest-path distance between any two vertices; '
      + 'girth is the length of the SHORTEST cycle in the graph — two structurally unconnected '
      + 'computations. On $C_6$: diameter $=3$ (opposite vertices are 3 steps apart), girth $=6$ '
      + '(the cycle itself is the only, hence shortest, cycle). A TREE makes the independence starkest: '
      + 'diameter is finite (any two vertices connect via a finite path) while girth is INFINITE (no '
      + 'cycle exists at all) — these two numbers genuinely do not track each other.\n\n'
      + 'ISOMORPHISM IS A STRUCTURE-PRESERVING BIJECTION, NEVER LITERAL VERTEX/EDGE-SET EQUALITY: '
      + '$G_1\\cong G_2$ requires a bijection $f:V_1\\to V_2$ preserving adjacency in both directions '
      + '— it says nothing about the vertex SETS themselves being equal or even overlapping. The path '
      + '$a\\text{-}b\\text{-}c$ on $\\{a,b,c\\}$ and the path $(1\\text{-}2\\text{-}3)$ on $\\{1,2,3\\}$ '
      + 'are isomorphic via $f(a)=1,f(b)=2,f(c)=3$ despite having ENTIRELY DISJOINT vertex sets — '
      + 'isomorphism is about preserved STRUCTURE, and completely different labels never disqualify '
      + 'two graphs from being the identical abstract shape.',
    targetedMisconceptions: [`${GRAPH_INVARIANTS}:MC-1`, `${GRAPH_INVARIANTS}:MC-2`, `${GRAPH_INVARIANTS}:MC-3`],
    source: eb(GRAPH_INVARIANTS, 'Core Understanding — a matching invariant never proving isomorphism as a one-way filter only a mismatch proving non-isomorphism, diameter and girth as unrelated quantities never the same measurement able to move independently, and isomorphism as a structure-preserving bijection never literal vertex/edge-set equality'),
  },
]

export const MATHEMATICS_GRAPH_MINIMUM_SPANNING_TREE_MAXIMUM_FLOW_GRAPH_INVARIANTS_PROBES: SeedProbe[] = [
  {
    conceptId: MST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Do Prim\'s and Kruskal\'s algorithms always add edges to the MST in the same ORDER?',
    choices: [
      { text: 'No — they can process edges in different orders (Kruskal\'s sorts globally and skips cycle-forming edges; Prim\'s only considers frontier-crossing edges) while landing on the same MST when weights are distinct', isCorrect: true },
      { text: 'Yes — since both are greedy algorithms solving the same problem, they must add edges in identical order', isCorrect: false, misconceptionId: `${MST}:MC-1` },
      { text: "Yes, because unrestricted greedy edge selection always produces one single canonical order", isCorrect: false, misconceptionId: `${MST}:MC-1` },
    ],
    targetedMisconceptions: [`${MST}:MC-1`],
    source: eb(MST, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether Prim\'s and Kruskal\'s always add edges in the same order, an answer of "yes" or inability to explain a difference confirming GREEDY-ALWAYS-GIVES-MST'),
  },
  {
    conceptId: MST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '$K_3$ (a triangle) has all edges weight 1 — is its MST unique? A path $P_3$ also has all edges weight 1 — is ITS MST unique?',
    choices: [
      { text: '$K_3$: NOT unique (three tied competing spanning trees exist, each dropping one edge). $P_3$: unique (it has only ONE spanning tree in existence — itself — so there is never a competing tree to tie against)', isCorrect: true },
      { text: 'Both are automatically non-unique, since repeated edge weights always mean the MST cannot be unique', isCorrect: false, misconceptionId: `${MST}:MC-2` },
      { text: "Both are automatically unique, since distinct weights are required for non-uniqueness to even be possible", isCorrect: false, misconceptionId: `${MST}:MC-2` },
    ],
    targetedMisconceptions: [`${MST}:MC-2`],
    source: eb(MST, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — $K_3$ versus $P_3$ both weight-1-everywhere, an answer treating both the same confirming UNIQUE-WEIGHTS-NOT-REQUIRED-FOR-UNIQUENESS'),
  },
  {
    conceptId: MST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If an MST is built for a city road network, does the path between two specific cities IN THE MST give the shortest route between them?',
    choices: [
      { text: 'Not necessarily — the MST minimizes TOTAL connection cost across the whole network, a different objective from a shortest-path tree, which minimizes each individual path length from one source; the two trees can differ structurally on the same graph', isCorrect: true },
      { text: 'Yes — the cheapest overall network to build must also contain the fastest route between any two of its cities', isCorrect: false, misconceptionId: `${MST}:MC-3` },
      { text: "Yes, since minimizing total weight and minimizing each individual path length from any point are the same optimization problem", isCorrect: false, misconceptionId: `${MST}:MC-3` },
    ],
    targetedMisconceptions: [`${MST}:MC-3`],
    source: eb(MST, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether the MST path between two cities gives the shortest route, an answer of "yes" confirming MST-GIVES-SHORTEST-PATHS'),
  },
  {
    conceptId: MAX_FLOW, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A backward residual edge $(b,a)$ has capacity 3, but there is no original edge from $b$ to $a$. What does sending flow along it physically represent?',
    choices: [
      { text: 'Cancelling 3 units of previously-committed forward flow $f(a,b)$, freeing that capacity to be rerouted elsewhere — a bookkeeping operation, never a physical reverse flow through a real pipe', isCorrect: true },
      { text: 'A genuine physical reverse channel that lets flow travel from b back to a through the actual network', isCorrect: false, misconceptionId: `${MAX_FLOW}:MC-1` },
      { text: "An error in the network model, since no edge from b to a should ever carry flow", isCorrect: false, misconceptionId: `${MAX_FLOW}:MC-1` },
    ],
    targetedMisconceptions: [`${MAX_FLOW}:MC-1`],
    source: eb(MAX_FLOW, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a backward residual edge with no corresponding original edge, an inability to answer or invented physical reverse pipe confirming BACKWARD-EDGES-ARE-PHYSICAL'),
  },
  {
    conceptId: MAX_FLOW, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The canonical construction gives minimum cut $(S^*,T^*)$ with capacity $k$. Could there be a different partition with the same capacity $k$?',
    choices: [
      { text: 'Yes — a network engineered with two independent bottleneck structures of equal capacity can have a second, entirely different partition achieving the identical minimum capacity; the canonical construction gives one valid answer, never proof of uniqueness', isCorrect: true },
      { text: 'No — the reachable-set-in-the-residual-graph construction always produces the unique minimum cut', isCorrect: false, misconceptionId: `${MAX_FLOW}:MC-2` },
      { text: "No, since the Max-Flow Min-Cut Theorem guarantees exactly one minimum cut per network", isCorrect: false, misconceptionId: `${MAX_FLOW}:MC-2` },
    ],
    targetedMisconceptions: [`${MAX_FLOW}:MC-2`],
    source: eb(MAX_FLOW, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether a different partition could share the minimum cut\'s capacity, an answer of "no" by default confirming MIN-CUT-IS-UNIQUE'),
  },
  {
    conceptId: MAX_FLOW, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can the bipartite matching reduction be applied directly to find a maximum matching in $C_5$ (a 5-cycle)?',
    choices: [
      { text: 'No — $C_5$ contains an odd cycle and has no bipartition, so there is no source-behind-A/sink-behind-B structure to build; general matching in such graphs genuinely requires Edmonds\' blossom algorithm instead', isCorrect: true },
      { text: 'Yes — the unit-capacity flow reduction that works for bipartite graphs generalizes directly to any graph, including odd cycles', isCorrect: false, misconceptionId: `${MAX_FLOW}:MC-3` },
      { text: "Yes, since max-flow techniques solve maximum matching for any graph structure without qualification", isCorrect: false, misconceptionId: `${MAX_FLOW}:MC-3` },
    ],
    targetedMisconceptions: [`${MAX_FLOW}:MC-3`],
    source: eb(MAX_FLOW, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether the bipartite reduction applies to $C_5$, an answer of "yes" without qualification confirming MAX-FLOW-SOLVES-GENERAL-MATCHING'),
  },
  {
    conceptId: GRAPH_INVARIANTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two graphs on 6 vertices both have degree sequence (2,2,2,2,2,2). Must they be isomorphic?',
    choices: [
      { text: 'No — $C_6$ (one 6-cycle) and $C_3\\sqcup C_3$ (two disjoint triangles) share this exact degree sequence, order, and size, yet differ in number of connected components (1 versus 2), so they are not isomorphic', isCorrect: true },
      { text: 'Yes — matching degree sequence on the same number of vertices is sufficient to guarantee isomorphism', isCorrect: false, misconceptionId: `${GRAPH_INVARIANTS}:MC-1` },
      { text: "Yes, since degree sequence encodes everything about a graph's local and global structure", isCorrect: false, misconceptionId: `${GRAPH_INVARIANTS}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_INVARIANTS}:MC-1`],
    source: eb(GRAPH_INVARIANTS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — two graphs on 6 vertices sharing degree sequence (2,2,2,2,2,2), an answer of "yes" confirming EQUAL-INVARIANTS-MEANS-ISOMORPHIC'),
  },
  {
    conceptId: GRAPH_INVARIANTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the diameter and girth of $C_6$ (the 6-cycle)?',
    choices: [
      { text: 'Diameter = 3 (the two vertices directly opposite on the cycle are 3 steps apart); girth = 6 (the cycle itself is the only, hence shortest, cycle) — two genuinely different numbers measuring unrelated things', isCorrect: true },
      { text: 'Both equal the same value, since diameter and girth measure the same "how big" property of a graph', isCorrect: false, misconceptionId: `${GRAPH_INVARIANTS}:MC-2` },
      { text: "Diameter and girth cannot be meaningfully distinguished for a cycle graph specifically", isCorrect: false, misconceptionId: `${GRAPH_INVARIANTS}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_INVARIANTS}:MC-2`],
    source: eb(GRAPH_INVARIANTS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — the diameter and girth of $C_6$, giving the same value for both or an inability to distinguish them confirming DIAMETER-EQUALS-GIRTH'),
  },
  {
    conceptId: GRAPH_INVARIANTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the path $a\\text{-}b\\text{-}c$ (vertices $\\{a,b,c\\}$) isomorphic to the path $(1\\text{-}2\\text{-}3)$ (vertices $\\{1,2,3\\}$)?',
    choices: [
      { text: 'Yes — the bijection $f(a)=1, f(b)=2, f(c)=3$ preserves every adjacency; isomorphism is about structure, never about literal vertex labels, so entirely disjoint vertex sets never disqualify two graphs from being isomorphic', isCorrect: true },
      { text: 'No — the two graphs cannot be isomorphic because their vertex sets are literally different', isCorrect: false, misconceptionId: `${GRAPH_INVARIANTS}:MC-3` },
      { text: "No, since isomorphism requires the exact same vertex labels to be shared between both graphs", isCorrect: false, misconceptionId: `${GRAPH_INVARIANTS}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_INVARIANTS}:MC-3`],
    source: eb(GRAPH_INVARIANTS, "Misconceptions MC-3 detection probe (verbatim, Blueprint) — two 3-vertex paths with disjoint vertex sets, an answer of \"no\" because the vertex sets differ confirming ISOMORPHISM-IS-SAME-AS-EQUAL-GRAPHS"),
  },
]

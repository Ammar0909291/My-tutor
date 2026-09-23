/**
 * Batch: graph-operations, eulerian-circuit, hamiltonian-cycle (math.graph).
 *
 * Continues math.graph (8/16 -> 11/16). Fresh frontier recompute found 8
 * ready concepts, all leaves (none list further unlocks). This batch closes
 * the Eulerian/Hamiltonian pair together (they are directly cross-linked
 * siblings, both building on math.disc.euler-hamiltonian and explicitly
 * dividing Dirac's-theorem depth between themselves per their own EB
 * Blueprint References) plus graph-operations, the last remaining direct
 * child of math.graph.graph. Transcribed from the frozen Educational Brain
 * entries at educational-brain/concepts/mathematics/math.graph.
 * {graph-operations,eulerian-circuit,hamiltonian-cycle}.md.
 *
 * Grade band: all three retain GradeBand.HIGH. graph-operations (EB
 * difficulty "proficient") has sole prerequisite math.graph.graph, itself
 * GradeBand.HIGH. eulerian-circuit (EB difficulty "proficient") and
 * hamiltonian-cycle (EB difficulty "expert") both have sole prerequisite
 * math.disc.euler-hamiltonian, itself GradeBand.HIGH. None of the three has
 * a prerequisite that itself pulls into undergraduate content, so — per the
 * established convention — grade band follows the prerequisite chain,
 * never the EB difficulty label alone, and all three stay HIGH despite
 * "proficient"/"expert" labels.
 *
 *   GRAPH-OPERATIONS  The complement of a bipartite graph is NEVER
 *           guaranteed bipartite — flipping every edge/non-edge relation
 *           can introduce brand-new odd cycles ($\bar{C}_6$ contains
 *           triangles); an INDUCED subgraph $G[S]$ is fully FORCED by the
 *           chosen vertex set (every qualifying edge included), never a
 *           free additional choice like an arbitrary subgraph; edge
 *           contraction does NOT automatically stay within simple graphs —
 *           contracting endpoints that share a common neighbor genuinely
 *           creates a multi-edge, simplified away only by deliberate
 *           convention, never automatically.
 *   EULERIAN-CIRCUIT  Euler's theorem is a per-VERTEX degree-parity test,
 *           never a total-edge-count test — a graph can have an even
 *           number of edges overall while still failing at the individual
 *           vertex level ($K_4$: 6 edges, but every vertex has odd degree
 *           3); Dirac's/Ore's theorems are SUFFICIENT, never NECESSARY —
 *           $C_n$ is Hamiltonian while badly failing Dirac's threshold for
 *           large $n$; Eulerian and Hamiltonian properties are LOGICALLY
 *           INDEPENDENT, never one implying the other, despite a sharp
 *           complexity-class gap between deciding them ($O(n+m)$ vs.
 *           NP-complete).
 *   HAMILTONIAN-CYCLE  Dirac's theorem is a targeted SUFFICIENT condition
 *           for a dense subclass, never a contradiction of the general
 *           NP-completeness result for Hamiltonian cycle existence;
 *           FAILING Dirac's condition proves NOTHING about non-existence —
 *           $P_4$'s failure is not itself the proof of its non-Hamiltonian
 *           status, direct inspection is; proving EXISTENCE (even
 *           efficiently, via Dirac's theorem) never also solves the
 *           strictly harder TSP optimal-weight question — existence and
 *           optimization sit on genuinely different difficulty tiers.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GRAPH_OPERATIONS = 'math.graph.graph-operations'
const EULERIAN_CIRCUIT = 'math.graph.eulerian-circuit'
const HAMILTONIAN_CYCLE = 'math.graph.hamiltonian-cycle'

export const MATHEMATICS_GRAPH_OPERATIONS_EULERIAN_CIRCUIT_HAMILTONIAN_CYCLE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GRAPH_OPERATIONS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE COMPLEMENT OF A BIPARTITE GRAPH IS NEVER GUARANTEED BIPARTITE — FLIPPING EVERY '
      + 'EDGE/NON-EDGE RELATION CAN INTRODUCE BRAND-NEW ODD CYCLES: complementation feels symmetric '
      + 'and "clean," inviting the assumption that nice structural properties survive the flip — but '
      + '$C_6$ (bipartite: 6 vertices, alternating two-coloring) has complement $\\bar{C}_6$ containing '
      + 'TRIANGLES, which are odd cycles, so $\\bar{C}_6$ is genuinely NOT bipartite despite $C_6$ '
      + 'being bipartite. Bipartiteness of a complement must always be checked INDEPENDENTLY, never '
      + 'assumed to transfer.\n\n'
      + 'AN INDUCED SUBGRAPH $G[S]$ IS FULLY FORCED BY THE CHOSEN VERTEX SET, NEVER A FREE '
      + 'ADDITIONAL CHOICE LIKE AN ARBITRARY SUBGRAPH: once $S$ is fixed, $G[S]$ MUST include every '
      + 'single edge of $G$ between two $S$-vertices — there is no freedom left. For $G=K_4$ and '
      + '$S=\\{1,2,3\\}$, since $K_4$ has every possible edge, $G[S]$ MUST be $K_3$ — it cannot be '
      + 'any other 3-vertex graph with some edges removed. An ARBITRARY subgraph on the same vertex '
      + 'set, by contrast, is a genuinely separate, freely-chosen edge selection that could omit some '
      + 'of those forced edges.\n\n'
      + 'EDGE CONTRACTION DOES NOT AUTOMATICALLY STAY WITHIN SIMPLE GRAPHS — CONTRACTING ENDPOINTS '
      + 'THAT SHARE A COMMON NEIGHBOR GENUINELY CREATES A MULTI-EDGE, SIMPLIFIED AWAY ONLY BY '
      + 'DELIBERATE CONVENTION: contracting edge $\\{1,2\\}$ in $K_4$ merges 1 and 2 into $w$; since '
      + 'BOTH 1 and 2 were adjacent to vertex 3 (and both to vertex 4), the raw contraction genuinely '
      + 'produces TWO edges from $w$ to 3 and TWO edges from $w$ to 4 — a true multigraph — before '
      + 'anyone chooses, BY CONVENTION, to simplify each pair down to one edge, yielding the simple '
      + 'graph $K_3$. That $K_4/e=K_3$ came out simple was never automatic; it is the result of an '
      + 'explicit simplification step applied after a genuine multi-edge appeared.',
    targetedMisconceptions: [`${GRAPH_OPERATIONS}:MC-1`, `${GRAPH_OPERATIONS}:MC-2`, `${GRAPH_OPERATIONS}:MC-3`],
    source: eb(GRAPH_OPERATIONS, "Core Understanding — the complement of a bipartite graph never guaranteed bipartite since complementation can introduce new odd cycles, an induced subgraph being fully forced by the chosen vertex set never a free additional choice like an arbitrary subgraph, and edge contraction never automatically staying simple since a shared common neighbor genuinely creates a multi-edge simplified away only by convention"),
  },
  {
    conceptId: EULERIAN_CIRCUIT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      "EULER'S THEOREM IS A PER-VERTEX DEGREE-PARITY TEST, NEVER A TOTAL-EDGE-COUNT TEST: a "
      + 'connected graph has an Eulerian circuit if and only if EVERY INDIVIDUAL VERTEX has even '
      + 'degree — this is a vertex-by-vertex requirement, not a claim about the edge total. $K_4$ has '
      + '6 edges (an even total) but EVERY vertex has degree 3 (odd), so NO Eulerian circuit exists '
      + 'despite the even edge count. The Handshaking Lemma\'s $\\sum\\deg(v)=2m$ makes the TOTAL '
      + 'trivially even always — that triviality is never the same fact as the much stronger, genuinely '
      + 'informative per-vertex parity condition Euler\'s theorem actually demands.\n\n'
      + "DIRAC'S AND ORE'S THEOREMS ARE SUFFICIENT, NEVER NECESSARY, FOR HAMILTONICITY: Dirac's "
      + 'theorem ($\\delta(G)\\ge n/2\\Rightarrow$ Hamiltonian) is a ONE-WAY implication. The cycle '
      + 'graph $C_n$ has minimum degree $\\delta=2$, arbitrarily far below $n/2$ for large $n$ — badly '
      + 'FAILING Dirac\'s condition — yet $C_n$ IS ITSELF a Hamiltonian cycle by definition. Failing '
      + 'the sufficient condition proves absolutely nothing about non-existence; it only means this '
      + 'particular shortcut does not apply, never that the graph lacks a Hamiltonian cycle.\n\n'
      + 'EULERIAN AND HAMILTONIAN PROPERTIES ARE LOGICALLY INDEPENDENT, NEVER ONE IMPLYING THE '
      + 'OTHER, DESPITE A SHARP COMPLEXITY-CLASS GAP BETWEEN DECIDING THEM: two triangles sharing a '
      + 'single vertex have every vertex at even degree (Eulerian) yet the shared vertex would need '
      + 'visiting twice in any cycle covering both triangles, so NO Hamiltonian cycle exists — '
      + 'Eulerian without Hamiltonian. The two properties must always be checked INDEPENDENTLY, each '
      + 'via its own specific test, and this independence is compounded by a genuine complexity '
      + 'asymmetry: Eulerian circuit existence is decidable in $O(n+m)$ time via degree-counting alone, '
      + 'while Hamiltonian cycle existence is NP-complete, with no known polynomial algorithm — two '
      + 'superficially similar "visit everything once" problems occupying starkly different '
      + 'complexity tiers.',
    targetedMisconceptions: [`${EULERIAN_CIRCUIT}:MC-1`, `${EULERIAN_CIRCUIT}:MC-2`, `${EULERIAN_CIRCUIT}:MC-3`],
    source: eb(EULERIAN_CIRCUIT, "Core Understanding — Euler's theorem as a per-vertex degree-parity test never a total-edge-count test, Dirac's and Ore's theorems as sufficient never necessary conditions for Hamiltonicity, and Eulerian and Hamiltonian properties as logically independent never one implying the other despite a sharp complexity-class gap between deciding them"),
  },
  {
    conceptId: HAMILTONIAN_CYCLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      "DIRAC'S THEOREM IS A TARGETED SUFFICIENT CONDITION FOR A DENSE SUBCLASS, NEVER A "
      + 'CONTRADICTION OF THE GENERAL NP-COMPLETENESS RESULT: Dirac\'s theorem guarantees a '
      + 'Hamiltonian cycle exists whenever EVERY vertex has degree $\\ge n/2$ — an efficiently-'
      + 'checkable condition covering a SPECIFIC, broad class of "dense enough" graphs. This does not '
      + 'contradict the fact that Hamiltonian cycle existence is NP-complete IN GENERAL: the theorem '
      + 'carves out one efficiently-decidable subclass, leaving graphs OUTSIDE that subclass exactly '
      + 'as hard as the general problem was always known to be.\n\n'
      + "FAILING DIRAC'S CONDITION PROVES NOTHING ABOUT NON-EXISTENCE — DIRECT INSPECTION IS WHAT "
      + 'PROVES IT, NEVER THE FAILED TEST ITSELF: the path graph $P_4$ has endpoint degree 1, far '
      + 'below $n/2=2$, so Dirac\'s condition FAILS — and $P_4$ genuinely has no Hamiltonian cycle, '
      + 'but that absence is established by DIRECT INSPECTION (a path literally contains no cycle), '
      + 'never by the failed Dirac test alone. Adding just ONE edge (connecting the two endpoints, '
      + 'forming $C_4$) flips every vertex to degree $2\\ge n/2=2$ — Dirac\'s condition now HOLDS, '
      + 'correctly guaranteeing a Hamiltonian cycle — showing how sensitive the test\'s applicability '
      + 'is to structure the theorem itself says nothing about when it fails.\n\n'
      + 'PROVING EXISTENCE, EVEN EFFICIENTLY VIA DIRAC\'S THEOREM, NEVER ALSO SOLVES THE STRICTLY '
      + 'HARDER TSP OPTIMAL-WEIGHT QUESTION: knowing (via Dirac\'s theorem) that a weighted graph '
      + 'definitely HAS a Hamiltonian cycle says nothing about which one is CHEAPEST. Finding the '
      + 'minimum-weight Hamiltonian cycle (the Traveling Salesman Problem) is NP-hard in general — a '
      + 'strictly harder question than mere existence, on a genuinely different difficulty tier; only '
      + 'in the special metric case (triangle-inequality-satisfying weights) do efficient bounded-'
      + 'factor approximation algorithms exist, and even then the exact optimum remains hard to find.',
    targetedMisconceptions: [`${HAMILTONIAN_CYCLE}:MC-1`, `${HAMILTONIAN_CYCLE}:MC-2`, `${HAMILTONIAN_CYCLE}:MC-3`],
    source: eb(HAMILTONIAN_CYCLE, "Core Understanding — Dirac's theorem as a targeted sufficient condition for a dense subclass never a contradiction of general NP-completeness, failing Dirac's condition proving nothing about non-existence with direct inspection being what actually proves it, and proving existence even efficiently never also solving the strictly harder TSP optimal-weight question"),
  },
]

export const MATHEMATICS_GRAPH_OPERATIONS_EULERIAN_CIRCUIT_HAMILTONIAN_CYCLE_PROBES: SeedProbe[] = [
  {
    conceptId: GRAPH_OPERATIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the complement of $C_6$ (the bipartite 6-cycle) also bipartite?',
    choices: [
      { text: 'No — $\\bar{C}_6$ contains triangles (odd cycles), so it is not bipartite, despite $C_6$ itself being bipartite; complementation can introduce structure never present in the original graph', isCorrect: true },
      { text: 'Yes — since complementation is a clean, symmetric operation, bipartiteness always transfers to the complement', isCorrect: false, misconceptionId: `${GRAPH_OPERATIONS}:MC-1` },
      { text: "Yes, because the complement of any bipartite graph must also be bipartite by definition", isCorrect: false, misconceptionId: `${GRAPH_OPERATIONS}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPH_OPERATIONS}:MC-1`],
    source: eb(GRAPH_OPERATIONS, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether the complement of $C_6$ is bipartite, an answer of "yes" confirming COMPLEMENT-PRESERVES-BIPARTITE'),
  },
  {
    conceptId: GRAPH_OPERATIONS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For $G=K_4$ and $S=\\{1,2,3\\}$, is $G[S]$ necessarily $K_3$, or could it be any 3-vertex graph with some edges removed?',
    choices: [
      { text: '$G[S]$ MUST be $K_3$ — since $K_4$ has every possible edge, all three edges among $\\{1,2,3\\}$ are forced into the induced subgraph; there is no freedom to omit any of them', isCorrect: true },
      { text: 'It could be any 3-vertex graph on $\\{1,2,3\\}$ with some edges freely removed, since the induced subgraph allows any edge selection', isCorrect: false, misconceptionId: `${GRAPH_OPERATIONS}:MC-2` },
      { text: "The induced subgraph operator gives the same freedom to choose edges as an arbitrary subgraph does", isCorrect: false, misconceptionId: `${GRAPH_OPERATIONS}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPH_OPERATIONS}:MC-2`],
    source: eb(GRAPH_OPERATIONS, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — $G[S]$ for $K_4$ and $S=\\{1,2,3\\}$, a belief it could be any 3-vertex graph confirming INDUCED-SUBGRAPH-VS-SUBGRAPH'),
  },
  {
    conceptId: GRAPH_OPERATIONS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When contracting edge $\\{u,v\\}$ in a graph where $u$ and $v$ share a common neighbor $w$, does the result stay a simple graph automatically?',
    choices: [
      { text: 'No — contracting creates a genuine multi-edge (two edges from the merged vertex to $w$), which is then simplified to a single edge only by deliberate convention, never automatically', isCorrect: true },
      { text: 'Yes — edge contraction always produces a simple graph regardless of shared common neighbors', isCorrect: false, misconceptionId: `${GRAPH_OPERATIONS}:MC-3` },
      { text: "Yes, since the contraction operation is defined to prevent multi-edges from ever appearing", isCorrect: false, misconceptionId: `${GRAPH_OPERATIONS}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPH_OPERATIONS}:MC-3`],
    source: eb(GRAPH_OPERATIONS, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — contracting an edge whose endpoints share a common neighbor, an answer of "yes" without qualification confirming CONTRACTION-ALWAYS-SIMPLE'),
  },
  {
    conceptId: EULERIAN_CIRCUIT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a graph has 6 edges (an even number), does it necessarily have an Eulerian circuit?',
    choices: [
      { text: 'No — $K_4$ has 6 edges (even) but every vertex has degree 3 (odd), so no Eulerian circuit exists; the requirement is per-vertex even degree, never a total-edge-count condition', isCorrect: true },
      { text: 'Yes — an even total number of edges is enough to guarantee an Eulerian circuit exists', isCorrect: false, misconceptionId: `${EULERIAN_CIRCUIT}:MC-1` },
      { text: "Yes, since the Handshaking Lemma's even total directly proves Eulerian circuit existence", isCorrect: false, misconceptionId: `${EULERIAN_CIRCUIT}:MC-1` },
    ],
    targetedMisconceptions: [`${EULERIAN_CIRCUIT}:MC-1`],
    source: eb(EULERIAN_CIRCUIT, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a graph with 6 edges, an answer of "yes" without checking individual vertex degrees confirming EULERIAN-CIRCUIT-REQUIRES-EVEN-NUMBER-OF-EDGES'),
  },
  {
    conceptId: EULERIAN_CIRCUIT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A cycle graph $C_7$ has minimum degree 2, well below $n/2=3.5$. Is $C_7$ Hamiltonian?',
    choices: [
      { text: 'Yes — $C_7$ IS itself a Hamiltonian cycle by construction, despite badly failing Dirac\'s condition; failing a sufficient condition proves nothing about non-existence', isCorrect: true },
      { text: 'No — since $C_7$ fails Dirac\'s degree threshold, it cannot be Hamiltonian', isCorrect: false, misconceptionId: `${EULERIAN_CIRCUIT}:MC-2` },
      { text: "No, because Dirac's condition failing is proof that no Hamiltonian cycle exists", isCorrect: false, misconceptionId: `${EULERIAN_CIRCUIT}:MC-2` },
    ],
    targetedMisconceptions: [`${EULERIAN_CIRCUIT}:MC-2`],
    source: eb(EULERIAN_CIRCUIT, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether $C_7$ is Hamiltonian despite failing Dirac\'s condition, an answer of "no" confirming DIRAC-IMPLIES-HAMILTONICITY-IS-NECESSARY'),
  },
  {
    conceptId: EULERIAN_CIRCUIT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a graph has an Eulerian circuit, must it also have a Hamiltonian cycle?',
    choices: [
      { text: 'No — two triangles sharing a single vertex have every vertex at even degree (Eulerian) but the shared vertex would need visiting twice in any cycle covering both triangles, so no Hamiltonian cycle exists; the two properties are logically independent', isCorrect: true },
      { text: 'Yes — an Eulerian circuit guarantees a Hamiltonian cycle also exists on the same graph', isCorrect: false, misconceptionId: `${EULERIAN_CIRCUIT}:MC-3` },
      { text: "Yes, since both properties describe visiting everything exactly once and so must go together", isCorrect: false, misconceptionId: `${EULERIAN_CIRCUIT}:MC-3` },
    ],
    targetedMisconceptions: [`${EULERIAN_CIRCUIT}:MC-3`],
    source: eb(EULERIAN_CIRCUIT, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether an Eulerian circuit implies a Hamiltonian cycle, an answer of "yes" or hesitation without a counterexample confirming EULERIAN-IMPLIES-HAMILTONIAN'),
  },
  {
    conceptId: HAMILTONIAN_CYCLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Dirac\'s theorem contradict the claim that determining Hamiltonian cycle existence is NP-complete in general?',
    choices: [
      { text: 'No — Dirac\'s theorem identifies one specific, efficiently-checkable sufficient condition (a dense subclass), leaving the fully general problem for graphs outside that subclass exactly as NP-complete as it was always known to be', isCorrect: true },
      { text: 'Yes — Dirac\'s theorem provides an efficient algorithm that resolves Hamiltonian cycle existence for any graph', isCorrect: false, misconceptionId: `${HAMILTONIAN_CYCLE}:MC-1` },
      { text: "Yes, since an efficient sufficient condition existing means the general problem cannot truly be NP-complete", isCorrect: false, misconceptionId: `${HAMILTONIAN_CYCLE}:MC-1` },
    ],
    targetedMisconceptions: [`${HAMILTONIAN_CYCLE}:MC-1`],
    source: eb(HAMILTONIAN_CYCLE, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether Dirac\'s theorem contradicts general NP-completeness, an answer of "yes" treating the theorem as a universal algorithm confirming DIRAC-THEOREM-ASSUMED-TO-CONTRADICT-NP-COMPLETENESS'),
  },
  {
    conceptId: HAMILTONIAN_CYCLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A path graph $P_4$ (vertices 1-2-3-4 in a line) has endpoint degree 1, far below $n/2=2$. Does this prove $P_4$ has no Hamiltonian cycle?',
    choices: [
      { text: 'No — the failed Dirac test itself proves nothing; $P_4$ genuinely has no Hamiltonian cycle, but that is established by direct inspection (a path contains no cycle at all), not by the failed sufficient condition', isCorrect: true },
      { text: 'Yes — failing Dirac\'s degree condition is itself sufficient proof that no Hamiltonian cycle exists', isCorrect: false, misconceptionId: `${HAMILTONIAN_CYCLE}:MC-2` },
      { text: "Yes, since Dirac's theorem gives a two-way test for Hamiltonicity, not just a one-way guarantee", isCorrect: false, misconceptionId: `${HAMILTONIAN_CYCLE}:MC-2` },
    ],
    targetedMisconceptions: [`${HAMILTONIAN_CYCLE}:MC-2`],
    source: eb(HAMILTONIAN_CYCLE, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — $P_4$ failing Dirac\'s condition, treating the failed condition itself as proof rather than checking directly confirming FAILED-DIRAC-CONDITION-ASSUMED-TO-PROVE-NON-EXISTENCE'),
  },
  {
    conceptId: HAMILTONIAN_CYCLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Dirac\'s theorem efficiently guarantees the weighted wheel graph $W_5$ has a Hamiltonian cycle. Does this also mean finding the CHEAPEST such cycle is efficiently solvable?',
    choices: [
      { text: 'No — proving existence (via Dirac\'s theorem) is a strictly easier question than finding the minimum-weight cycle (TSP), which is NP-hard in general; existence and optimal-weight sit on genuinely different difficulty tiers', isCorrect: true },
      { text: 'Yes — since Dirac\'s theorem efficiently proves a Hamiltonian cycle exists, finding the cheapest one is also efficiently solvable', isCorrect: false, misconceptionId: `${HAMILTONIAN_CYCLE}:MC-3` },
      { text: "Yes, because proving existence and finding the optimal solution are the same computational problem", isCorrect: false, misconceptionId: `${HAMILTONIAN_CYCLE}:MC-3` },
    ],
    targetedMisconceptions: [`${HAMILTONIAN_CYCLE}:MC-3`],
    source: eb(HAMILTONIAN_CYCLE, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether Dirac\'s existence guarantee also solves TSP, an answer of "yes" confirming EXISTENCE-ASSUMED-TO-SOLVE-TSP'),
  },
]

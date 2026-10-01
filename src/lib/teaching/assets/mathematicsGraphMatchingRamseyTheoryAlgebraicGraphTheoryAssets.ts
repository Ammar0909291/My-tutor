/**
 * Batch: matching, ramsey-theory, algebraic-graph-theory (math.graph).
 *
 * Continues math.graph (11/16 -> 14/16), leaving only extremal-graph-theory
 * and random-graph before domain certification. Fresh frontier recompute
 * found 5 ready concepts; these 3 selected to close out the domain's
 * remaining classical-theorem and cross-domain-bridge content.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.graph.
 * {matching,ramsey-theory,algebraic-graph-theory}.md.
 *
 * Grade band: matching (EB difficulty "expert") has sole prerequisite
 * math.graph.graph, GradeBand.HIGH — HIGH retained. ramsey-theory (EB
 * difficulty "expert") requires math.disc.pigeonhole (HIGH) and
 * math.graph.graph (HIGH) — both HIGH, so HIGH retained. algebraic-graph-
 * theory (EB difficulty "expert") requires math.graph.graph (HIGH) AND
 * math.linalg.eigenvalues (GradeBand.UNDERGRADUATE) — the Laplacian
 * eigenvalue machinery is inseparable from the eigenvalue prerequisite's
 * own undergraduate content, so GradeBand.UNDERGRADUATE is adopted, per the
 * established convention that a genuinely undergraduate-level prerequisite
 * in the chain overrides an otherwise-HIGH domain baseline.
 *
 *   MATCHING  A MAXIMAL matching (cannot be locally extended) is NEVER
 *           automatically a MAXIMUM matching (globally largest) — the gap
 *           can be a full factor of two, and only Berge's theorem (no
 *           augmenting path exists) genuinely certifies maximum; Hall's
 *           condition must hold for EVERY subset $S\subseteq A$
 *           collectively, never just individual vertices — the true
 *           bottleneck is almost always a multi-vertex subset; König's
 *           equality ($\nu=\tau$) holds ONLY for bipartite graphs, never
 *           general graphs, which satisfy only the weaker Gallai
 *           inequality $\nu\le\tau\le2\nu$.
 *   RAMSEY-THEORY  Proving $R(3,3)\le6$ via Pigeonhole is only HALF the
 *           proof of $R(3,3)=6$ — the lower bound (an explicit $K_5$
 *           2-coloring avoiding any monochromatic triangle) is a logically
 *           independent, equally necessary second half, never optional;
 *           the Erdős probabilistic method proves EXISTENCE without ever
 *           CONSTRUCTING the object — showing the average is favorable
 *           never hands you the specific coloring; only a small handful of
 *           exact Ramsey numbers are known at all, and $R(5,5)$ remains
 *           genuinely OPEN, never a confidently-known fact just because
 *           $R(3,3)$ was easy.
 *   ALGEBRAIC-GRAPH-THEORY  Eigenvalue machinery is NEVER directly
 *           applicable to a graph itself — it requires first building the
 *           Laplacian $L=D-A$ as the essential bridge matrix; the match
 *           between eigenvalue-0's multiplicity and the connected-
 *           component count is a GENERAL THEOREM holding for EVERY graph,
 *           never a coincidence specific to one worked example; $\lambda_2$
 *           is NEVER merely a binary connected/disconnected indicator —
 *           its actual MAGNITUDE quantifies robustness of connectivity via
 *           the Cheeger inequality.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const MATCHING = 'math.graph.matching'
const RAMSEY_THEORY = 'math.graph.ramsey-theory'
const ALGEBRAIC_GRAPH_THEORY = 'math.graph.algebraic-graph-theory'

export const MATHEMATICS_GRAPH_MATCHING_RAMSEY_THEORY_ALGEBRAIC_GRAPH_THEORY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MATCHING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A MAXIMAL MATCHING IS NEVER AUTOMATICALLY A MAXIMUM MATCHING — THE GAP CAN BE A FULL '
      + 'FACTOR OF TWO: "maximal" means no edge can be LOCALLY added without breaking the matching '
      + 'property; "maximum" means no LARGER matching exists ANYWHERE in the graph — a strictly '
      + 'stronger, global claim. On the path $1$-$2$-$3$-$4$-$5$-$6$, the matching '
      + '$\\{\\{2,3\\},\\{5,6\\}\\}$ (size 2) is maximal — no further edge fits — while '
      + '$\\{\\{1,2\\},\\{3,4\\},\\{5,6\\}\\}$ (size 3) is a strictly larger perfect matching. '
      + "ONLY BERGE'S THEOREM (a matching is maximum if and only if no $M$-augmenting path exists) "
      + 'genuinely certifies maximum — greedily reaching a dead end never does.\n\n'
      + "HALL'S CONDITION MUST HOLD FOR EVERY SUBSET $S\\subseteq A$ COLLECTIVELY, NEVER JUST "
      + 'INDIVIDUAL VERTICES — THE TRUE BOTTLENECK IS ALMOST ALWAYS MULTI-VERTEX: checking that '
      + 'each single vertex in $A$ merely HAS a neighbor is never sufficient. For $A=\\{a_1,a_2\\}$, '
      + '$B=\\{b_1\\}$ with edges $a_1b_1,a_2b_1$: every individual vertex has a neighbor, yet the '
      + 'SUBSET $S=\\{a_1,a_2\\}$ has $|N(S)|=1<2=|S|$ — Hall\'s condition genuinely fails on this '
      + 'two-element subset, so no perfect matching saturating $A$ can exist, even though the '
      + "singleton check alone would have missed it entirely.\n\n"
      + "KÖNIG'S EQUALITY ($\\nu=\\tau$) HOLDS ONLY FOR BIPARTITE GRAPHS, NEVER GENERAL GRAPHS, "
      + 'WHICH SATISFY ONLY THE WEAKER GALLAI INEQUALITY: König\'s theorem proves maximum matching '
      + 'size EQUALS minimum vertex cover size, specifically for bipartite graphs. The triangle '
      + '$K_3$ (non-bipartite) has $\\nu(K_3)=1$ (only one edge can be chosen without sharing a '
      + 'vertex) but $\\tau(K_3)=2$ (any single vertex covers only 2 of the 3 edges) — the equality '
      + 'genuinely FAILS once bipartiteness is dropped, and only the two-sided Gallai inequality '
      + '$\\nu\\le\\tau\\le2\\nu$ remains valid; matching general graphs optimally requires Edmonds\' '
      + 'substantially more intricate blossom algorithm instead.',
    targetedMisconceptions: [`${MATCHING}:MC-1`, `${MATCHING}:MC-2`, `${MATCHING}:MC-3`],
    source: eb(MATCHING, "Core Understanding — a maximal matching never automatically a maximum matching with the gap possibly a full factor of two and only Berge's theorem genuinely certifying maximum, Hall's condition needing to hold for every subset collectively never just individual vertices since the true bottleneck is almost always multi-vertex, and König's equality holding only for bipartite graphs never general graphs which satisfy only the weaker Gallai inequality"),
  },
  {
    conceptId: RAMSEY_THEORY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'PROVING $R(3,3)\\le6$ VIA PIGEONHOLE IS ONLY HALF THE PROOF OF $R(3,3)=6$ — THE LOWER '
      + 'BOUND IS A LOGICALLY INDEPENDENT, EQUALLY NECESSARY SECOND HALF, NEVER OPTIONAL: the upper '
      + 'bound (fixing a vertex in $K_6$, applying Pigeonhole to its 5 edges) shows every 2-coloring '
      + 'of $K_6$ contains a monochromatic triangle — but this alone only proves $R(3,3)\\le6$, '
      + 'leaving the TRUE value potentially far smaller. The lower bound requires the OPPOSITE kind '
      + 'of evidence entirely: an EXPLICIT 2-coloring of $K_5$ (a red 5-cycle plus its complementary '
      + 'blue 5-cycle) that avoids ANY monochromatic triangle — since a 5-cycle has girth 5, neither '
      + 'color contains one. Only BOTH directions together pin down $R(3,3)=6$ exactly.\n\n'
      + 'THE ERDŐS PROBABILISTIC METHOD PROVES EXISTENCE WITHOUT EVER CONSTRUCTING THE OBJECT — '
      + 'SHOWING THE AVERAGE IS FAVORABLE NEVER HANDS YOU THE SPECIFIC COLORING: to show '
      + '$R(s,s)>n$, it suffices that the EXPECTED number of monochromatic $K_s$\'s under a random '
      + '2-coloring of $K_n$ is less than 1 — this forces SOME coloring among all possibilities to '
      + 'achieve zero monochromatic $K_s$\'s, since the average cannot be below 1 unless some outcome '
      + 'hits exactly 0. This argument never identifies WHICH coloring achieves it, nor how to find '
      + 'one — it is a pure existence proof, genuinely different from a constructive algorithm, even '
      + 'though it yields the best known general lower bound for large $s$.\n\n'
      + 'ONLY A SMALL HANDFUL OF EXACT RAMSEY NUMBERS ARE KNOWN AT ALL, AND $R(5,5)$ REMAINS '
      + 'GENUINELY OPEN, NEVER A CONFIDENTLY-KNOWN FACT JUST BECAUSE $R(3,3)$ WAS EASY: known exact '
      + 'classical 2-color Ramsey numbers extend only up through $R(4,5)=25$ — $R(5,5)$ itself is '
      + 'known only to lie between 43 and 48, unresolved, with upper and lower bounds for $R(s,s)$ '
      + 'diverging exponentially as $s$ grows. The clean resolution of a small case like $R(3,3)=6$ '
      + 'is never evidence that Ramsey computation stays tractable as cliques grow even slightly '
      + 'larger.',
    targetedMisconceptions: [`${RAMSEY_THEORY}:MC-1`, `${RAMSEY_THEORY}:MC-2`, `${RAMSEY_THEORY}:MC-3`],
    source: eb(RAMSEY_THEORY, "Core Understanding — proving $R(3,3)\\le6$ via Pigeonhole being only half the proof of $R(3,3)=6$ since the lower bound is a logically independent equally necessary second half never optional, the Erdős probabilistic method proving existence without ever constructing the object, and only a small handful of exact Ramsey numbers being known at all with $R(5,5)$ remaining genuinely open"),
  },
  {
    conceptId: ALGEBRAIC_GRAPH_THEORY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EIGENVALUE MACHINERY IS NEVER DIRECTLY APPLICABLE TO A GRAPH ITSELF — IT REQUIRES FIRST '
      + 'BUILDING THE LAPLACIAN AS THE ESSENTIAL BRIDGE MATRIX: a graph, by itself, is a purely '
      + 'combinatorial object (vertices, edges, degrees) with no matrix to take eigenvalues of. The '
      + 'LAPLACIAN $L=D-A$ (degree matrix minus adjacency matrix) packages that combinatorial data '
      + 'into a single symmetric matrix, and it is specifically THIS construction — never the '
      + 'adjacency matrix alone, nor "the graph" treated loosely as if it already were a matrix — '
      + 'that carries the eigenvalue-to-connectivity relationships developed here.\n\n'
      + "THE MATCH BETWEEN EIGENVALUE-0'S MULTIPLICITY AND THE CONNECTED-COMPONENT COUNT IS A "
      + 'GENERAL THEOREM HOLDING FOR EVERY GRAPH, NEVER A COINCIDENCE SPECIFIC TO ONE WORKED '
      + 'EXAMPLE: for ANY graph, the all-ones vector $\\mathbf{1}$ satisfies $L\\mathbf{1}=0$ since '
      + 'each row of $D-A$ sums to $\\deg(v)-\\deg(v)=0$, so $\\lambda_1=0$ is always an eigenvalue — '
      + 'and more strikingly, its MULTIPLICITY exactly equals the number of connected components, '
      + 'EVERY time, for every graph, never merely for the specific example where it was first '
      + 'verified. A 2-component graph will always show multiplicity exactly 2, without exception.\n\n'
      + '$\\lambda_2$ IS NEVER MERELY A BINARY CONNECTED/DISCONNECTED INDICATOR — ITS ACTUAL '
      + 'MAGNITUDE QUANTIFIES ROBUSTNESS OF CONNECTIVITY VIA THE CHEEGER INEQUALITY: $\\lambda_2$ '
      + '(the algebraic connectivity, or Fiedler value) is zero exactly when the graph is '
      + 'disconnected — but beyond that zero/nonzero distinction, its actual SIZE grows larger as '
      + 'the graph becomes more robustly, densely connected. $P_3$\'s fragile connectivity '
      + '($\\lambda_2=1$, disconnected by removing just one edge) contrasts sharply with $K_3$\'s '
      + 'robust connectivity ($\\lambda_2=3$, no single edge removal disconnects it) — the magnitude '
      + 'itself, not just its sign, carries genuine quantitative structural information, used '
      + "directly in spectral clustering via the Fiedler vector.",
    targetedMisconceptions: [`${ALGEBRAIC_GRAPH_THEORY}:MC-1`, `${ALGEBRAIC_GRAPH_THEORY}:MC-2`, `${ALGEBRAIC_GRAPH_THEORY}:MC-3`],
    source: eb(ALGEBRAIC_GRAPH_THEORY, "Core Understanding — eigenvalue machinery never directly applicable to a graph itself requiring first building the Laplacian as the essential bridge matrix, the match between eigenvalue-0's multiplicity and connected-component count being a general theorem holding for every graph never a coincidence specific to one example, and lambda-2 never merely a binary connectivity indicator since its actual magnitude quantifies robustness via the Cheeger inequality"),
  },
]

export const MATHEMATICS_GRAPH_MATCHING_RAMSEY_THEORY_ALGEBRAIC_GRAPH_THEORY_PROBES: SeedProbe[] = [
  {
    conceptId: MATCHING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "If I can't add any more edges to a matching $M$ without breaking the matching property, is $M$ necessarily maximum?",
    choices: [
      { text: 'No — this only proves $M$ is maximal (locally cannot be extended), never maximum (globally largest); on the path $1$-$2$-$3$-$4$-$5$-$6$, $\\{\\{2,3\\},\\{5,6\\}\\}$ is maximal but a strictly larger perfect matching exists', isCorrect: true },
      { text: 'Yes — a matching that cannot be extended by one more edge must be the largest matching in the graph', isCorrect: false, misconceptionId: `${MATCHING}:MC-1` },
      { text: "Yes, since maximal and maximum are equivalent terms for the same matching property", isCorrect: false, misconceptionId: `${MATCHING}:MC-1` },
    ],
    targetedMisconceptions: [`${MATCHING}:MC-1`],
    source: eb(MATCHING, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — a matching that cannot be extended, an answer of "yes" confirming MAXIMAL-EQUALS-MAXIMUM'),
  },
  {
    conceptId: MATCHING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '$A=\\{a_1,a_2\\}$, $B=\\{b_1\\}$, with edges $a_1b_1$ and $a_2b_1$. Every vertex in $A$ has a neighbor. Does a perfect matching saturating $A$ exist?',
    choices: [
      { text: 'No — checking the SUBSET $S=\\{a_1,a_2\\}$ gives $N(S)=\\{b_1\\}$, so $|N(S)|=1<2=|S|$; Hall\'s condition fails on this two-element subset even though every individual vertex has a neighbor', isCorrect: true },
      { text: 'Yes — since every individual vertex in A has at least one neighbor, a perfect matching saturating A must exist', isCorrect: false, misconceptionId: `${MATCHING}:MC-2` },
      { text: "Yes, because checking that each vertex has some neighbor is sufficient to guarantee Hall's condition holds", isCorrect: false, misconceptionId: `${MATCHING}:MC-2` },
    ],
    targetedMisconceptions: [`${MATCHING}:MC-2`],
    source: eb(MATCHING, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — $A=\\{a_1,a_2\\}$, $B=\\{b_1\\}$ with every vertex individually having a neighbor, an answer of "yes" confirming HALL-CONDITION-ONLY-FOR-SINGLETONS'),
  },
  {
    conceptId: MATCHING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the triangle $K_3$, is the maximum matching size equal to the minimum vertex cover size?',
    choices: [
      { text: 'No — $\\nu(K_3)=1$ (only one edge can be chosen without sharing a vertex) but $\\tau(K_3)=2$ (any single vertex covers only 2 of the 3 edges); König\'s equality genuinely fails on this non-bipartite graph, and only the Gallai inequality $\\nu\\le\\tau\\le2\\nu$ applies', isCorrect: true },
      { text: 'Yes — König\'s theorem guarantees maximum matching size equals minimum vertex cover size for any graph, bipartite or not', isCorrect: false, misconceptionId: `${MATCHING}:MC-3` },
      { text: "Yes, since König's equality is a universal fact about matchings and covers", isCorrect: false, misconceptionId: `${MATCHING}:MC-3` },
    ],
    targetedMisconceptions: [`${MATCHING}:MC-3`],
    source: eb(MATCHING, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether König\'s equality holds for $K_3$, an answer of "yes" by default confirming KÖNIG-HOLDS-FOR-ALL-GRAPHS'),
  },
  {
    conceptId: RAMSEY_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "You've proven $R(3,3)\\le6$ via Pigeonhole. Does this alone tell you $R(3,3)=6$?",
    choices: [
      { text: 'No — this only establishes an upper bound (a ceiling); a matching lower-bound construction (an explicit $K_5$ 2-coloring avoiding any monochromatic triangle) is still required to prove the true value actually reaches 6', isCorrect: true },
      { text: 'Yes — proving the upper bound $R(3,3)\\le6$ via Pigeonhole is sufficient to establish the exact value', isCorrect: false, misconceptionId: `${RAMSEY_THEORY}:MC-1` },
      { text: "Yes, since an upper-bound proof alone always pins down the exact Ramsey number", isCorrect: false, misconceptionId: `${RAMSEY_THEORY}:MC-1` },
    ],
    targetedMisconceptions: [`${RAMSEY_THEORY}:MC-1`],
    source: eb(RAMSEY_THEORY, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether the upper bound alone proves $R(3,3)=6$, an answer of "yes" confirming RAMSEY-NUMBER-R-3-3-IS-5'),
  },
  {
    conceptId: RAMSEY_THEORY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "The expected number of monochromatic $K_s$'s under a random coloring is less than 1, so a good coloring exists. Can you write down that specific coloring?",
    choices: [
      { text: 'No — the argument only shows the AVERAGE count is below 1, which forces at least one outcome among all possible colorings to achieve zero, but identifies neither which coloring that is nor how to find it', isCorrect: true },
      { text: 'Yes — the probabilistic argument itself directly hands you the specific coloring that achieves zero monochromatic cliques', isCorrect: false, misconceptionId: `${RAMSEY_THEORY}:MC-2` },
      { text: "Yes, since proving existence probabilistically is equivalent to constructing the object explicitly", isCorrect: false, misconceptionId: `${RAMSEY_THEORY}:MC-2` },
    ],
    targetedMisconceptions: [`${RAMSEY_THEORY}:MC-2`],
    source: eb(RAMSEY_THEORY, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — an expected count under 1 implying existence, a belief the argument hands over the specific coloring confirming PROBABILISTIC-EXISTENCE-IS-CONSTRUCTION'),
  },
  {
    conceptId: RAMSEY_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is $R(5,5)$?',
    choices: [
      { text: 'Not known exactly — only that it lies somewhere between 43 and 48; only a small handful of exact classical Ramsey numbers are known at all, and $R(5,5)$ remains genuinely open', isCorrect: true },
      { text: 'A specific exact number, since all small Ramsey numbers like $R(5,5)$ have been fully computed', isCorrect: false, misconceptionId: `${RAMSEY_THEORY}:MC-3` },
      { text: "The same value as $R(3,3)$, since small Ramsey numbers tend to converge to one figure", isCorrect: false, misconceptionId: `${RAMSEY_THEORY}:MC-3` },
    ],
    targetedMisconceptions: [`${RAMSEY_THEORY}:MC-3`],
    source: eb(RAMSEY_THEORY, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — asking for $R(5,5)$\'s value, a confidently-stated specific number confirming RAMSEY-NUMBERS-ARE-KNOWN-FOR-ALL-SMALL-VALUES'),
  },
  {
    conceptId: ALGEBRAIC_GRAPH_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can you apply eigenvalue tools directly to a graph, or do you need to convert it into a matrix first?',
    choices: [
      { text: 'You need to convert it into a matrix first — specifically the Laplacian $L=D-A$, which is the essential bridge that makes eigenvalue/eigenvector machinery meaningful for a purely combinatorial graph at all', isCorrect: true },
      { text: 'Eigenvalue tools apply directly to a graph itself, without needing to first construct any matrix from it', isCorrect: false, misconceptionId: `${ALGEBRAIC_GRAPH_THEORY}:MC-1` },
      { text: "A graph and its Laplacian matrix are essentially the same object for eigenvalue purposes", isCorrect: false, misconceptionId: `${ALGEBRAIC_GRAPH_THEORY}:MC-1` },
    ],
    targetedMisconceptions: [`${ALGEBRAIC_GRAPH_THEORY}:MC-1`],
    source: eb(ALGEBRAIC_GRAPH_THEORY, 'Misconceptions MC-1 detection probe (verbatim, Blueprint) — whether eigenvalue tools apply directly to a graph, a belief they do without first constructing the Laplacian confirming EIGENVALUE-TOOLS-ASSUMED-DIRECTLY-APPLICABLE-TO-GRAPHS'),
  },
  {
    conceptId: ALGEBRAIC_GRAPH_THEORY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the match between eigenvalue-0\'s multiplicity and the number of connected components a coincidence for one example, or a general fact?',
    choices: [
      { text: 'A general fact — this multiplicity-to-component-count match is a theorem holding for EVERY graph, always, never an artifact specific to the particular example where it was first verified', isCorrect: true },
      { text: 'A coincidence — the match just happened to hold for the specific graph examined, and cannot be assumed for other graphs', isCorrect: false, misconceptionId: `${ALGEBRAIC_GRAPH_THEORY}:MC-2` },
      { text: "It depends on the graph, and must be re-verified separately in every new case", isCorrect: false, misconceptionId: `${ALGEBRAIC_GRAPH_THEORY}:MC-2` },
    ],
    targetedMisconceptions: [`${ALGEBRAIC_GRAPH_THEORY}:MC-2`],
    source: eb(ALGEBRAIC_GRAPH_THEORY, 'Misconceptions MC-2 detection probe (verbatim, Blueprint) — whether the multiplicity-component match is coincidental or general, an answer treating it as coincidental confirming MULTIPLICITY-COMPONENT-MATCH-ASSUMED-COINCIDENTAL'),
  },
  {
    conceptId: ALGEBRAIC_GRAPH_THEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does $\\lambda_2$ only tell you whether a graph is connected, or does its actual size tell you more?',
    choices: [
      { text: 'Its actual magnitude tells you more — beyond the zero/nonzero connected-or-not distinction, larger $\\lambda_2$ values quantify more ROBUST connectivity via the Cheeger inequality (e.g. $P_3$\'s fragile $\\lambda_2=1$ versus $K_3$\'s robust $\\lambda_2=3$)', isCorrect: true },
      { text: 'It only ever distinguishes connected from disconnected graphs, with no further information carried by its size', isCorrect: false, misconceptionId: `${ALGEBRAIC_GRAPH_THEORY}:MC-3` },
      { text: "Its magnitude is meaningless beyond confirming that the graph is nonzero and therefore connected", isCorrect: false, misconceptionId: `${ALGEBRAIC_GRAPH_THEORY}:MC-3` },
    ],
    targetedMisconceptions: [`${ALGEBRAIC_GRAPH_THEORY}:MC-3`],
    source: eb(ALGEBRAIC_GRAPH_THEORY, 'Misconceptions MC-3 detection probe (verbatim, Blueprint) — whether $\\lambda_2$\'s size carries information beyond connected-or-not, a belief it is purely a binary indicator confirming LAMBDA-2-ASSUMED-BINARY-CONNECTIVITY-INDICATOR'),
  },
]

# math.graph.algebraic-graph-theory

## Identity
- **KG id**: `math.graph.algebraic-graph-theory`
- **Domain**: math.graph
- **Requires**: `math.graph.graph`, `math.linalg.eigenvalues`
- **Unlocks**: none
- **Cross-links**: `math.linalg.eigenvalues`
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 7

## Learning Objective
Construct the graph Laplacian $L=D-A$ (degree matrix minus adjacency matrix) for a given graph,
reusing `math.graph.graph`'s own vertex/edge/degree definitions, and compute its eigenvalues via
`math.linalg.eigenvalues`'s own machinery; verify that $\lambda_1=0$ is ALWAYS an eigenvalue of $L$
with multiplicity equal to the graph's number of CONNECTED COMPONENTS; and recognize, at
orientation level, that the second-smallest eigenvalue $\lambda_2$ quantifies how robustly
connected the graph is, via the Cheeger inequality.

## Core Understanding
`math.graph.graph` describes graphs purely combinatorially — vertices, edges, degrees, nothing
algebraic. The LAPLACIAN $L=D-A$ (where $D$ is the diagonal degree matrix and $A$ is the adjacency
matrix) packages this combinatorial data into a single SYMMETRIC matrix, making
`math.linalg.eigenvalues`'s entire eigenvalue/eigenvector toolkit directly applicable — a purely
combinatorial object now has algebraic invariants (its eigenvalues) that turn out to encode
genuinely combinatorial information about the graph's structure.

For ANY graph, the all-ones vector $\mathbf{1}$ satisfies $L\mathbf{1}=(D-A)\mathbf{1}=0$, since
each row of $D-A$ sums to $\deg(v)-\deg(v)=0$ — so $\lambda_1=0$ is ALWAYS an eigenvalue, with
eigenvector $\mathbf{1}$. More strikingly, the MULTIPLICITY of eigenvalue $0$ (how many linearly
independent eigenvectors it has) exactly equals the number of CONNECTED COMPONENTS of the graph —
a fact about the graph's combinatorial connectivity, read off PURELY from an algebraic quantity
(eigenvalue multiplicity), with no need to trace paths through the graph directly.

The SECOND-smallest eigenvalue $\lambda_2$ (the "algebraic connectivity" or Fiedler value) is zero
exactly when the graph is disconnected, matching the multiplicity fact above, and grows LARGER as
the graph becomes more robustly, densely connected. The Cheeger inequality makes this qualitative
intuition precise, bounding $\lambda_2$ in terms of the graph's edge expansion (how hard it is to
disconnect by removing few edges) — and the eigenvector for $\lambda_2$ (the Fiedler vector) is
used in SPECTRAL CLUSTERING to partition a graph's vertices into well-connected groups, at
orientation level; full derivation of the Cheeger inequality and the clustering algorithm is
deferred beyond this concept's core scope.

## Mental Models
- **"The Laplacian is the bridge that turns a purely combinatorial graph into a matrix, unlocking
  every eigenvalue tool already known."**
- **"$\lambda_1=0$'s multiplicity is a theorem, not a coincidence — it exactly counts connected
  components, every time."**
- **"$\lambda_2$'s SIZE, not just its sign, measures how robustly connected the graph is."**

## Why Students Fail

### MC-1: EIGENVALUE-TOOLS-ASSUMED-DIRECTLY-APPLICABLE-TO-GRAPHS
- **Surface form**: believes eigenvalue machinery applies directly to a graph without first
  converting it into a matrix like the Laplacian.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity). The
  connection between "a graph" and "a matrix" is a conceptual bridge that must be explicitly built;
  without it, the graph and its Laplacian can be conflated as the same object.
- **Repair**: re-walk the Laplacian construction and eigenvalue computation for a specific small
  graph, re-anchoring on the Laplacian as the essential bridge making eigenvalues meaningful for a
  graph at all.

### MC-2: MULTIPLICITY-COMPONENT-MATCH-ASSUMED-COINCIDENTAL
- **Surface form**: believes the match between eigenvalue-0 multiplicity and connected-component
  count is coincidental for particular examples, missing that it is a general guaranteed theorem.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity). A single
  striking coincidence in one worked example does not automatically read as a universal theorem
  without an explicit statement that it holds for EVERY graph.
- **Repair**: re-verify the exact multiplicity-2 match for a specific 2-component graph, re-anchoring
  on "this is a general theorem, holding for every graph," not an artifact of the chosen example.

### MC-3: LAMBDA-2-ASSUMED-BINARY-CONNECTIVITY-INDICATOR
- **Surface form**: believes $\lambda_2$ only distinguishes connected from disconnected graphs,
  missing that its magnitude quantifies robustness of connectivity via the Cheeger inequality.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Moderate severity). The
  zero-vs-nonzero distinction (disconnected vs. connected) is the first fact learned about
  $\lambda_2$, and it is easy to stop there without recognizing the further gradation the actual
  numeric VALUE carries.
- **Repair**: contrast a fragile graph's small $\lambda_2$ against a robustly-connected graph's
  large $\lambda_2$, re-anchoring on the magnitude carrying genuine quantitative information.

## Misconceptions

### MC-1: EIGENVALUE-TOOLS-ASSUMED-DIRECTLY-APPLICABLE-TO-GRAPHS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: MULTIPLICITY-COMPONENT-MATCH-ASSUMED-COINCIDENTAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: LAMBDA-2-ASSUMED-BINARY-CONNECTIVITY-INDICATOR
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A vibrating drum's tone: how a shape resonates (its eigenvalues) reveals facts about its
  physical structure — the Laplacian's eigenvalues reveal a graph's connectivity structure the same
  way."**
- **Anti-analogy**: this is NOT "compute eigenvalues of the adjacency matrix directly and call it a
  day" — the LAPLACIAN specifically (not $A$ alone) is what carries the zero-eigenvalue/
  connected-components relationship; a different matrix built from the same graph would not
  automatically carry the same guarantee.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: construct the Laplacian for the path graph $P_3$ and compute
  its eigenvalues $0,1,3$ via `math.linalg.eigenvalues`'s own characteristic-polynomial method.
- **Demonstration 2 (targets MC-2)**: for a 2-component graph ($P_2$ disjoint from an isolated
  vertex), verify the Laplacian's eigenvalue $0$ has multiplicity exactly 2, matching the 2
  connected components exactly.
- **Demonstration 3 (targets MC-3)**: contrast $P_3$'s $\lambda_2=1$ (fragile — removing one edge
  disconnects it) against $K_3$'s $\lambda_2=3$ (robust — no single edge removal disconnects it).

## Discovery Questions
1. "Can you apply eigenvalue tools directly to a graph, or do you need to convert it into a matrix
   first?"
2. "Is the match between eigenvalue-0's multiplicity and the number of connected components a
   coincidence for one example, or a general fact?"
3. "Does $\lambda_2$ only tell you whether a graph is connected, or does its actual size tell you
   more?"

## Teaching Sequence
1. **Anchor**: connect to `math.graph.graph`'s own vertex/edge/degree data and
   `math.linalg.eigenvalues`'s own $Av=\lambda v$ machinery, framing the Laplacian as the bridge
   between the two.
2. **Conflict evidence**: the exact multiplicity-2 verification for a 2-component graph, breaking
   MC-2 directly.
3. **Contrast pair**: $P_3$'s fragile connectivity against $K_3$'s robust connectivity, isolating
   MC-3 via the $\lambda_2$ magnitude comparison.
4. **Mastery gate**: require a Laplacian construction with eigenvalue computation, a multiplicity-
   components verification, and a qualitative $\lambda_2$-robustness judgment under transfer, at
   the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept eigenvalue reasoning applied directly to a graph without the learner first
  constructing the Laplacian.
- When eigenvalue-0's multiplicity matches component count in one example, require the learner to
  state this holds generally, not just for that graph.

## Voice Teaching Notes
- Say "which matrix are you actually applying eigenvalues to?" whenever eigenvalue reasoning is
  attempted directly on a graph.
- When $\lambda_2$ is discussed, ask "does its size tell you anything beyond connected-or-not?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs the Laplacian for a given graph and
  computes its eigenvalues.
- **Rung 2 (application)**: learner correctly verifies that eigenvalue-0's multiplicity matches the
  graph's connected-component count.
- **Rung 3 (transfer)**: learner correctly predicts, qualitatively, whether a novel graph's
  $\lambda_2$ would be small or large based on its connectivity structure, and connects this to the
  Fiedler vector's role in spectral clustering.

## Tutor Recovery Strategy
- If MC-1 recurs, re-construct the Laplacian explicitly for the specific graph in question before
  any eigenvalue computation.
- If MC-2 recurs, re-verify the multiplicity-components match for the specific graph in question.
- If MC-3 recurs, re-contrast the specific fragile-vs-robust graph pair in question via their
  $\lambda_2$ values.

## Memory Hooks
- "The Laplacian is the bridge — no matrix, no eigenvalues."
- "Zero's multiplicity counts components — always, not just this once."
- "$\lambda_2$'s size measures robustness, not just connected-or-not."

## Transfer Connections
- `math.graph.graph` (already authored, this campaign): supplies the vertex/edge/degree data
  assembled into the Laplacian.
- `math.linalg.eigenvalues` (Tier-1 cross-link, already authored, this campaign): supplies the
  eigenvalue/eigenvector machinery this concept applies directly to the Laplacian matrix — genuinely
  incorporated, not merely flagged, matching the Blueprint's own confirmed cross-link-probe mode.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.graph.algebraic-graph-theory.md`, reused by
  reference for its Laplacian-construction demonstration, its multiplicity-verification conflict
  evidence, its fragile-vs-robust connectivity contrast, and its three-misconception registry
  (birth types independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own cross-link-probe-mode probe (a social-
  network two-cluster-bridge scenario, predicting $\lambda_2$ qualitatively via Cheeger-inequality
  intuition and connecting to `math.linalg.eigenvalues`'s own machinery).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `graph`/`eigenvalues`, unlocks none, cross_links `eigenvalues`, expert/analyze,
  mastery_threshold 0.7, estimated_hours 7) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-13 (Batch 76): authored. Unblocked by `math.linalg.eigenvalues` (Batch 75), which
  REOPENED this previously-parked domain. Companion batch concepts: `math.linalg.linear-system`,
  `math.linalg.matrix-inverse`, `math.linalg.angle-vectors`. `math.graph` moves toward **15/16**
  this batch — only `random-graph` (needs `math.prob.probability-axioms`, unauthored) remains
  before DOMAIN CERTIFICATION.

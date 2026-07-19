# Teaching Blueprint: Algebraic Graph Theory (`math.graph.algebraic-graph-theory`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.algebraic-graph-theory` |
| name | Algebraic Graph Theory |
| domain | Graph Theory |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.graph.graph`, `math.linalg.eigenvalues` |
| unlocks | none |
| cross_links | `math.linalg.eigenvalues` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — computing the Laplacian and its eigenvalues for one small specific graph before naming the general theory |
| description (KG) | Laplacian $L=D-A$ ($D=$ degree matrix). Eigenvalues of $L$: $\lambda_1=0$ (multiplicity = connected components). Cheeger inequality relates $\lambda_2$ to edge expansion. Graph Fourier transform. Eigenvalues of $A$ determine walks, spectral clustering. |

## Component 1 — Learning Objectives

- LO1: Construct the **graph Laplacian** $L=D-A$ (degree matrix minus adjacency matrix) for a given graph (from `math.graph.graph`'s own vertex/edge/degree definitions), and compute its EIGENVALUES via `math.linalg.eigenvalues`'s own machinery — recognizing that turning a purely COMBINATORIAL object (a graph) into a MATRIX is precisely what makes linear-algebraic tools like eigenvalues applicable to it at all.
- LO2: Verify that $\lambda_1=0$ is ALWAYS an eigenvalue of $L$ (with eigenvector the all-ones vector), and that its MULTIPLICITY equals the number of CONNECTED COMPONENTS of the graph — a genuinely combinatorial fact (connectivity) read off from a purely algebraic quantity (eigenvalue multiplicity).
- LO3 (orientation level — full Cheeger-inequality and spectral-clustering derivation deferred): recognize, without full derivation, that the SECOND-smallest eigenvalue $\lambda_2$ (the "algebraic connectivity" or Fiedler value) relates to how well-connected/expansive the graph is (via the Cheeger inequality), previewing spectral clustering's use of eigenvectors to partition a graph into well-connected pieces.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` ($G=(V,E)$, degree $\deg(v)$, the handshaking lemma) and `math.linalg.eigenvalues` ($Av=\lambda v$, eigenvalues as scaling factors along eigenvector directions).

## Component 3 — Core Explanation

**The Laplacian converts a graph into a matrix, unlocking `math.linalg.eigenvalues`'s machinery**: `math.graph.graph` describes graphs purely combinatorially — vertices, edges, degrees. The Laplacian $L=D-A$ (where $D$ is the diagonal degree matrix and $A$ is the adjacency matrix) packages this combinatorial data into a single SYMMETRIC matrix, making `math.linalg.eigenvalues`'s entire eigenvalue/eigenvector toolkit directly applicable — a purely combinatorial object now has algebraic invariants (its eigenvalues) that turn out to encode genuinely combinatorial information about the graph's structure.

**Zero is always an eigenvalue, and its multiplicity counts connected components**: for ANY graph, the all-ones vector $\mathbf{1}$ satisfies $L\mathbf{1}=(D-A)\mathbf{1}=0$ (since each row of $D-A$ sums to $\deg(v)-\deg(v)=0$), so $\lambda_1=0$ is ALWAYS an eigenvalue, with eigenvector $\mathbf{1}$. More strikingly, the MULTIPLICITY of eigenvalue $0$ (how many linearly independent eigenvectors it has) exactly equals the number of CONNECTED COMPONENTS of the graph — a fact about the graph's combinatorial connectivity, read off PURELY from an algebraic quantity (eigenvalue multiplicity), with no need to trace paths through the graph directly.

**$\lambda_2$ measures how well-connected the graph is (orientation level)**: the SECOND-smallest eigenvalue $\lambda_2$ (called the "algebraic connectivity" or Fiedler value) is zero exactly when the graph is disconnected (matching the multiplicity fact above), and grows LARGER as the graph becomes more robustly, densely connected. The Cheeger inequality makes this qualitative intuition precise, bounding $\lambda_2$ in terms of the graph's "edge expansion" (how hard it is to disconnect the graph by removing few edges) — and the eigenvector associated with $\lambda_2$ (the Fiedler vector) is used in SPECTRAL CLUSTERING to partition a graph's vertices into well-connected groups. Full derivation of the Cheeger inequality and the spectral clustering algorithm is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the Laplacian and computing its eigenvalues, breaking MC-1)**: for the path graph $P_3$ with vertices $\{1,2,3\}$ and edges $\{1\text{-}2,2\text{-}3\}$: degrees are $\deg(1)=1,\deg(2)=2,\deg(3)=1$, so $D=\begin{pmatrix}1&0&0\\0&2&0\\0&0&1\end{pmatrix}$, and $A=\begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix}$, giving $L=D-A=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}$. Applying `math.linalg.eigenvalues`'s own characteristic-polynomial method: $\det(L-\lambda I)=0$ gives eigenvalues $\lambda=0,1,3$ — turning this purely combinatorial 3-vertex path into a matrix made these algebraic invariants computable at all, exactly as promised.

**Example 2 (LO2 — verifying $\lambda_1=0$'s multiplicity counts components, breaking MC-2)**: for a graph with TWO separate components — say $P_2$ (vertices $\{1,2\}$, edge $1$-$2$) disjoint from an isolated vertex $\{3\}$ — the Laplacian is $L=\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}$ (block-diagonal, since there's no edge connecting vertex $3$ to the others). Its eigenvalues are $0,0,2$ — eigenvalue $0$ has MULTIPLICITY $2$, EXACTLY matching this graph's $2$ connected components ($\{1,2\}$ and $\{3\}$), confirming the general fact directly: connectivity (a combinatorial property) is read off from eigenvalue multiplicity (a purely algebraic quantity) with no separate connectivity-tracing needed.

**Example 3 (LO3, orientation level — $\lambda_2$ as a connectivity measure, breaking MC-3)**: contrast $P_3$'s eigenvalues from Example 1 ($0,1,3$, so $\lambda_2=1$) against the complete graph $K_3$ (all three vertices mutually connected), whose Laplacian eigenvalues are $0,3,3$ (so $\lambda_2=3$, much LARGER). $K_3$ is intuitively "harder to disconnect" (removing any single edge still leaves it connected) than the path $P_3$ (removing the middle edge disconnects it immediately) — and this qualitative difference in ROBUSTNESS of connectivity is reflected QUANTITATIVELY in $\lambda_2$: larger $\lambda_2$ for the more robustly-connected graph, smaller $\lambda_2$ for the more fragile one, exactly the qualitative content the Cheeger inequality makes precise.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Laplacian Is What Makes Eigenvalue Tools Applicable to a Graph At All (Primitive P11: Representation Shift)

State: "a graph, by itself, is a purely combinatorial object — vertices and edges, nothing algebraic. The Laplacian $L=D-A$ is the bridge that turns it into a matrix, unlocking every eigenvalue tool you already know from `math.linalg.eigenvalues`." Walk Example 1's construction and eigenvalue computation for $P_3$.

- **MC-1 hook**: ask "does `math.linalg.eigenvalues`'s eigenvalue machinery apply DIRECTLY to a graph, without first converting it into a matrix like the Laplacian?" — a "yes" answer reveals MC-1 (missing that the Laplacian is the essential bridge converting a combinatorial graph into an algebraic matrix, making eigenvalues meaningful at all).

### Teaching Action A02 — Eigenvalue Multiplicity Genuinely Encodes Connectivity (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a 2-component graph's Laplacian has eigenvalue $0$ with EXACT multiplicity $2$, matching the component count precisely, not approximately. State: "this isn't a coincidence for one example — the multiplicity of eigenvalue $0$ always equals the number of connected components, a genuinely combinatorial fact readable directly from a purely algebraic computation."

- **MC-2 hook**: ask "is the fact that eigenvalue $0$'s multiplicity equals the number of connected components merely a coincidence for particular graphs, rather than a general guaranteed relationship?" — a "yes" answer reveals MC-2 (missing that this multiplicity-equals-components fact holds for EVERY graph, a genuine theorem, not a coincidence).

### Teaching Action A03 — $\lambda_2$ Distinguishes Robustly- From Fragile-Connected Graphs (Primitive P06: Contrast Pair)

Contrast $P_3$'s small $\lambda_2=1$ (fragile — one edge removal disconnects it) against $K_3$'s large $\lambda_2=3$ (robust — no single edge removal disconnects it). State: "$\lambda_2$ isn't just '0 versus nonzero' — its actual SIZE quantifies how robustly connected a graph is, with larger values corresponding to graphs that are harder to disconnect."

- **MC-3 hook**: ask "does $\lambda_2$ only distinguish connected graphs (nonzero) from disconnected ones (zero), without conveying any further information about HOW well-connected a connected graph is?" — a "yes" answer reveals MC-3 (missing that $\lambda_2$'s actual magnitude quantifies robustness of connectivity, via the Cheeger inequality).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the Laplacian $L$ for the star graph $S_3$ (one central vertex connected to 3 leaves).
  2. Compute the eigenvalues of your answer to problem 1, and verify $\lambda_1=0$ appears with multiplicity $1$ (since $S_3$ is connected).
  3. For a graph with 3 connected components, state (without necessarily computing it in full) what multiplicity you'd expect for eigenvalue $0$ of its Laplacian.
  4. Explain, in one or two sentences, why $\lambda_2$ being small versus large conveys more information than merely "connected versus disconnected."
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.linalg.eigenvalues`)**: "A social network is modeled as a graph where two 'clusters' of tightly-connected users are joined by only a single 'bridge' edge between them. (a) Without computing exact eigenvalues, predict qualitatively whether this graph's $\lambda_2$ would be small or large, and justify your prediction using the Cheeger-inequality intuition about edge expansion. (b) Explain, citing `math.linalg.eigenvalues`'s own eigenvalue/eigenvector machinery directly, why computing this graph's Laplacian eigenvalues requires nothing conceptually new beyond what you already know about eigenvalues — only a new MATRIX (the Laplacian) to apply that machinery to. (c) Explain how the Fiedler vector (the eigenvector for $\lambda_2$) could be used to automatically detect the two clusters via spectral clustering, without manually inspecting the graph's structure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EIGENVALUE-TOOLS-ASSUMED-DIRECTLY-APPLICABLE-TO-GRAPHS | Believing eigenvalue machinery applies directly to a graph without first converting it into a matrix like the Laplacian, missing that the Laplacian is the essential algebraic bridge | Foundational |
| MC-2 | MULTIPLICITY-COMPONENT-MATCH-ASSUMED-COINCIDENTAL | Believing the match between eigenvalue-0 multiplicity and connected-component count is coincidental for particular examples, missing that it is a general guaranteed theorem | High |
| MC-3 | LAMBDA-2-ASSUMED-BINARY-CONNECTIVITY-INDICATOR | Believing $\lambda_2$ only distinguishes connected from disconnected graphs, missing that its magnitude quantifies robustness of connectivity via the Cheeger inequality | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Eigenvalue Tools Assumed Directly Applicable to Graphs") → P41 (detect: ask whether eigenvalue machinery applies directly to a graph without a matrix conversion step) → P64 (conceptual shift: re-walk Example 1's Laplacian construction and eigenvalue computation for $P_3$, re-anchoring on "the Laplacian is the essential bridge making eigenvalues meaningful for a graph").
- **B02 (targets MC-2)**: P27 (name it: "Multiplicity-Component Match Assumed Coincidental") → P41 (detect: ask whether the multiplicity-components match is coincidental) → P64 (conceptual shift: re-walk Example 2's exact multiplicity-2 verification for a 2-component graph, re-anchoring on "this is a general theorem, holding for every graph").
- **B03 (targets MC-3)**: P27 (name it: "Lambda-2 Assumed Binary Connectivity Indicator") → P41 (detect: ask whether $\lambda_2$ only distinguishes connected from disconnected) → P64 (conceptual shift: re-walk Example 3's $P_3$-versus-$K_3$ contrast, re-anchoring on "$\lambda_2$'s magnitude quantifies robustness, per the Cheeger inequality").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (vertices, edges, degree, the handshaking lemma — the combinatorial data assembled into the Laplacian) and `math.linalg.eigenvalues` ($Av=\lambda v$, the eigenvalue/eigenvector machinery this concept applies to the Laplacian matrix).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.linalg.eigenvalues`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored (also a direct prerequisite). $P76_{mode}=$ **cross-link probe**, engaging `math.linalg.eigenvalues`'s own eigenvalue/eigenvector machinery directly in Component 3's bridging argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the Laplacian construction and the exact multiplicity-components verification) and LO3 kept orientation-level, appropriately previewing the Cheeger inequality and spectral clustering qualitatively without deriving the Cheeger bound or the clustering algorithm itself.
- **Division of labor**: `math.graph.graph` owns the purely combinatorial vertex/edge/degree data; `math.linalg.eigenvalues` owns the general eigenvalue/eigenvector machinery. This concept owns the SPECIFIC bridge (the Laplacian construction) connecting these two, and the resulting combinatorial-from-algebraic facts (multiplicity-equals-components, $\lambda_2$-as-connectivity-measure) — deliberately using small, easily hand-verifiable graphs ($P_3$, a 2-component graph, $K_3$) across all three examples so every eigenvalue claim can be checked directly by computing the characteristic polynomial, not merely asserted.
- Example 3's deliberate choice to compare $P_3$ (a "fragile" tree) against $K_3$ (a "robust" complete graph) — both on exactly 3 vertices — was chosen to isolate CONNECTIVITY ROBUSTNESS as the single variable driving the $\lambda_2$ difference, rather than confounding it with a difference in graph size.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.eigenvalues` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: Laplacian and eigenvalue computation on one small graph precedes the general theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

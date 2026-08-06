# Blueprint: math.disc.graph-types

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.graph-types |
| name | Graph Types |
| Domain | math.disc |
| Difficulty | developing |
| Bloom level | understand |
| Estimated hours | 2 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.disc.graph |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student classifies graphs by structural type: distinguishes simple graphs from multigraphs and pseudographs; identifies complete graphs Kₙ (every pair adjacent), bipartite graphs (vertices 2-colourable, no odd cycles), and complete bipartite graphs Kₘ,ₙ; recognises directed graphs (digraphs) and weighted graphs; computes degree sequences and verifies the handshaking lemma (Σdeg(v) = 2|E|); and uses the handshaking lemma to deduce parity constraints (number of odd-degree vertices is even).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw five small graphs side by side: (1) K₄: 4 vertices each connected to the other 3; (2) K₂,₃: 2+3 vertices with all 6 cross-edges, no edges within each part; (3) Multigraph: 2 vertices connected by 3 parallel edges; (4) Digraph: 3 vertices with directed arrows (some mutual, some one-way); (5) Weighted graph: 4 vertices with edge labels 5, 3, 8, 2; annotate: "Same vertex set + edge set can represent wildly different structures depending on the type of graph chosen")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | BIPARTITE-MEANS-TWO-COMPONENTS | Student thinks a bipartite graph has two disconnected components; doesn't realise a bipartite graph CAN be connected — the two parts are vertex colour classes, not components; K₂,₃ is connected and bipartite | Type 3 — language contamination ("bi" + "partite" = two parts; students interpret "parts" as separate components, forgetting that cross-edges (which bipartite allows and requires) connect the two parts into a single connected graph) |
| MC-2 | COMPLETE-MEANS-ALL-EDGES-POSSIBLE | Student conflates "complete" with "as many edges as possible given constraints"; applies it to bipartite graphs, saying K₃ is a subset of K₂,₃; misses that in Kₙ EVERY pair of the n vertices is adjacent, while in Kₘ,ₙ only cross-partition pairs are adjacent — the two are different maximality notions | Type 5 — instruction-induced (Kₙ is always introduced first as "the complete graph"; then Kₘ,ₙ is introduced with the same word "complete" in a different sense; without explicitly naming the two different maximality criteria, students conflate them) |
| MC-3 | HANDSHAKING-IS-ABOUT-HANDSHAKES | Student treats the handshaking lemma as a combinatorial curiosity about social events, not a universal algebraic identity about any graph; misses that it applies to directed, weighted, and multigraphs with appropriate degree definitions (in-degree + out-degree for digraphs, multiplicity-counted for multigraphs) | Type 3 — language contamination (the "handshaking" mnemonic — each edge represents two people shaking hands — is vivid but domain-specific; students don't extend it to digraphs where "handshaking" is asymmetric or to multigraphs where multiple handshakes between the same pair count separately) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Special graph families:**

**Complete graph Kₙ:** n vertices, every pair connected by exactly one edge. |E| = C(n,2) = n(n−1)/2. Every vertex has degree n−1. Example: K₄ has 6 edges.

**Bipartite graph:** vertex set partitioned into X and Y such that every edge goes from X to Y (no edges within X, no edges within Y). Characterisation: G is bipartite ⟺ G has no odd-length cycle.

**Complete bipartite graph Kₘ,ₙ:** |X|=m, |Y|=n, every vertex in X adjacent to every vertex in Y. |E|=mn.

**Multigraph:** allows multiple edges (parallel edges) between the same pair of vertices. **Pseudograph:** also allows loops (edges from a vertex to itself).

**Directed graph (digraph):** each edge is an ordered pair (u,v) — has a direction. In-degree deg⁺(v) = edges INTO v; out-degree deg⁻(v) = edges OUT of v.

**Weighted graph:** each edge e carries a weight w(e) ∈ ℝ. Used to model distances, costs, capacities.

**Handshaking lemma:** For any graph G=(V,E):
Σ_{v∈V} deg(v) = 2|E|.
Proof: each edge contributes 1 to deg(u) and 1 to deg(v) → total contribution = 2 per edge.
Corollary: the number of odd-degree vertices is EVEN (since the sum is 2|E|, which is even).

**P49 checkpoint:**
- CORRECT → "Kₙ: all C(n,2) edges. Bipartite: 2-colourable, no odd cycle. Kₘ,ₙ: mn cross-edges. Digraph: directed edges. Handshaking: Σdeg=2|E|, so #odd-degree vertices is even." → A02
- PARTIAL (MC-1: bipartite = two components) → "A bipartite graph is NOT necessarily disconnected. K₂,₃ is bipartite AND connected: every vertex in the 2-part is adjacent to all 3 vertices in the 3-part. The DEFINITION of bipartite is: vertex set can be partitioned into X and Y such that every edge goes between X and Y. Connected bipartite graphs are common (K₂,₃, cycles C₄, C₆, …). Disconnected bipartite graphs exist too, but bipartiteness is about colouring, not connectivity." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Is K₃,₃ bipartite? YES — it has two parts of size 3. Is K₅ bipartite? NO — every vertex has degree 4, and the odd cycle K₃ (triangle) is a subgraph. Verify handshaking for K₄: Σdeg = 4·3 = 12 = 2·6 = 2|E|. ✓" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Degree sequences and structural constraints:**

**Degree sequence:** the sorted (descending) list of all vertex degrees. Example: K₄ = [3,3,3,3]. K₂,₃ = [3,3,2,2,2] (the 2-part vertices have degree 3; the 3-part have degree 2).

**Erdős-Gallai theorem:** a sequence d₁≥d₂≥…≥dₙ is the degree sequence of a SIMPLE graph iff Σdᵢ is even and for each k: Σᵢ₌₁ᵏ dᵢ ≤ k(k−1) + Σᵢ₌ₖ₊₁ⁿ min(dᵢ,k).

**Digraph handshaking:** Σ deg⁺(v) = Σ deg⁻(v) = |E| (each directed edge contributes 1 to out-degree of tail, 1 to in-degree of head).

**Regular graphs:** every vertex has the same degree r → called r-regular. Kₙ is (n−1)-regular. A regular bipartite graph exists iff both parts have the same size or degree constraints are compatible.

**Applications of bipartite recognition:**
A graph G is bipartite ⟺ it contains no odd cycle ⟺ BFS 2-colouring succeeds (alternating colours, contradiction = odd cycle).

**P49 checkpoint:**
- CORRECT → "Degree sequence encodes structure. Erdős-Gallai: degree sequence of simple graph iff sum even + k-sum bound. Digraph: Σout = Σin = |E|. Bipartite: no odd cycle, 2-colourable by BFS." → Gate (P91)
- PARTIAL (MC-3: handshaking only for simple graphs) → "The handshaking lemma extends to ALL graph types: multigraph — each parallel edge contributes to both endpoints' degree (count multiplicity); pseudograph — a loop at v contributes 2 to deg(v) (one for each endpoint, which happen to be the same vertex); digraph — replace degree with in-degree + out-degree at each vertex, and Σ(in + out) = 2|E|. The algebraic identity Σdeg=2|E| holds in all cases." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Degree sequence [4,3,3,2,2]: sum=14 (even). Is it graphical? Apply Erdős-Gallai at k=1: d₁=4 ≤ 0 + min(3,1)+min(3,1)+min(2,1)+min(2,1) = 0+1+1+1+1 = 4. ✓ At k=2: 4+3=7 ≤ 2·1 + min(3,2)+min(2,2)+min(2,2) = 2+2+2+2 = 8. ✓ Valid degree sequence." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Bipartite ≠ disconnected. Draw K₂,₃ on paper: label left vertices {A,B}, right vertices {1,2,3}. Edges: A-1, A-2, A-3, B-1, B-2, B-3. Is this connected? YES — you can walk from A to 1 to B to 2 to A (a cycle). The bipartite PROPERTY is about edge direction: every edge crosses between the two colour classes; it says NOTHING about connectivity."
Step 2 — "Complete Kₙ vs. complete bipartite Kₘ,ₙ: in Kₙ every PAIR of vertices is adjacent (including same-part pairs). In Kₘ,ₙ only CROSS-PART pairs are adjacent. Both are 'complete' in the sense that they have the maximum edges consistent with their structural constraints. K₃ is NOT a subgraph of K₂,₃ because K₃ requires a triangle (edge within the 2-part), which K₂,₃ forbids."
Step 3 — "Bipartite recognition test: try to 2-colour the graph with BFS. Assign vertex s colour 0. All neighbours of s get colour 1. All neighbours of those get colour 0. If any edge connects two vertices of the same colour → odd cycle found → NOT bipartite. If colouring succeeds → bipartite."

**TB-R02 (MC-3 HANDSHAKING EXTENSION):**
Step 1 — "The algebraic reason: Σ_{v} deg(v) counts, for each edge {u,v}, exactly which vertices it contributes to. Each undirected edge {u,v} contributes 1 to deg(u) and 1 to deg(v) — a total of 2, always, regardless of how many edges exist between u and v (multigraph) or whether u=v (loop contributes 2 to deg(u))."
Step 2 — "Digraph version: each directed edge (u→v) contributes 1 to out-degree of u and 1 to in-degree of v. So Σout-degree = |E| = Σin-degree. Also Σ(out+in) = 2|E|."
Step 3 — "Parity corollary proof: 2|E| = Σdeg(v) = Σ_{even deg} + Σ_{odd deg}. The first sum is even (sum of even numbers). Therefore Σ_{odd deg} must be even. Since the sum of an odd number of odd integers is odd, we need an EVEN count of odd-degree vertices."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. For K₅: compute |E|, the degree of every vertex, and verify the handshaking lemma. Is K₅ bipartite? Justify.
2. Draw K₂,₄ and K₃,₃. For each: list the degree sequence, compute |E|, and verify the handshaking lemma.
3. A graph has 10 vertices, each with degree 3 (3-regular). How many edges does it have? Show your reasoning.
4. Prove: in any graph, the number of vertices with odd degree is even. (Use the handshaking lemma.)
5. A bipartite graph G has parts X and Y with |X|=4, |Y|=6. What is the maximum number of edges G can have? What graph achieves this maximum, and what are its degree sequences for each part?

**P55 — Reflect & Consolidate:** "Kₙ: all C(n,2) edges, degree n−1. Bipartite: 2-colour partition, no odd cycles; Kₘ,ₙ: mn cross-edges. Multigraph: parallel edges. Digraph: in-degree + out-degree. Handshaking: Σdeg=2|E|; #odd-degree vertices is even. Bipartite test: BFS 2-colouring."

**P76 — Transfer Probe (Independence mode):**
(a) Ramsey theory: R(s,t) is the smallest n such that every 2-colouring of the edges of Kₙ contains a monochromatic Kₛ or Kₜ. The simplest case R(3,3)=6: show that any 2-colouring of K₆'s edges contains a monochromatic triangle. (b) Turán's theorem: the maximum number of edges in a simple n-vertex graph with no Kₙ₊₁ subgraph is achieved by the complete r-partite Turán graph T(n,r). For r=2 (triangle-free): ex(n,K₃) = ⌊n²/4⌋. Prove the triangle-free case by showing any graph exceeding ⌊n²/4⌋ edges must contain a triangle. (c) Friendship theorem: if any two vertices of G have exactly one common neighbour, then G is a "windmill" (several triangles sharing a common hub vertex). Explain the key step in Ramsey's proof: assuming G is regular and using eigenvector analysis of the adjacency matrix.

**P75 — Mastery Assessment:**
"(a) Prove that if G is a simple graph on n vertices with more than C(n−1,2) edges, then G is connected. (b) A 4-regular bipartite graph has equal-sized parts. Find the smallest possible number of vertices. Justify. (c) A tournament is a directed graph obtained by orienting each edge of Kₙ. Show that every tournament has a Hamiltonian path (a directed path through all vertices). (d) The Petersen graph has 10 vertices, each of degree 3. How many edges does it have? Is it bipartite? Justify your answer about bipartiteness using the cycle characterisation."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW bipartite characterisation via odd cycles and the handshaking corollary
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.graph; reassign

**P78 — Completion:** Graph Types certified. Student classifies Kₙ, Kₘ,ₙ, bipartite, directed, weighted, and multigraphs; applies the handshaking lemma to derive degree-sum constraints; recognises that bipartite graphs may be connected; and uses odd-cycle characterisation of bipartite graphs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Ramsey theory and 2-colourings; Turán's extremal theorem; Friendship theorem
Skill tested: Connect basic graph-type classification to extremal combinatorics and spectral graph theory

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

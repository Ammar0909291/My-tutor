# Blueprint: math.disc.planar-graph

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.planar-graph |
| name | Planar Graphs |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 4 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.disc.graph |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines planarity (a graph is planar iff it can be drawn in the plane with no edge crossings); applies Euler's formula V−E+F=2 for connected planar graphs and derives the edge-density bound E≤3V−6; uses the bound E≤2V−4 for triangle-free planar graphs; applies Kuratowski's theorem (G is planar iff it contains no subdivision of K₅ or K₃,₃ as a subgraph) and Wagner's theorem (no K₅ or K₃,₃ minor) to certify non-planarity; verifies K₅ and K₃,₃ are non-planar; and computes the genus and outerplanarity of small graphs.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw K₄ in its standard "diamond" planar embedding: 3 vertices of a triangle with 1 inside, all edges crossing-free; then draw K₅ and attempt to redraw it without crossings, failing each time; annotate "V=5, E=10, but 3V−6=9 < 10 — violates the planar edge bound, so K₅ is non-planar"; draw K₃,₃ with 6 vertices, 9 edges: "2V−4=8 < 9 — violates the triangle-free bound, so K₃,₃ is non-planar")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | EULER-FORMULA-FOR-DISCONNECTED | Student applies V−E+F=2 to a disconnected planar graph; the correct formula for a disconnected planar graph with C connected components is V−E+F=C+1; for C=1 (connected) this reduces to the standard V−E+F=2 | Type 5 — instruction-induced (Euler's formula is always stated and proved for connected graphs; students then apply it reflexively to any planar graph without checking connectivity; a disconnected graph splits a plane face differently — each component adds one face region "internally") |
| MC-2 | KURATOWSKI-SUBDIVISION-VS-SUBGRAPH | Student confuses "contains K₅ or K₃,₃ as a subgraph" with "contains a subdivision of K₅ or K₃,₃"; the correct statement is SUBDIVISION — intermediate vertices may be inserted on edges; a graph with K₅ as a strict subgraph is obviously non-planar, but K₅ subdivisions (with extra degree-2 vertices on edges) are just as non-planar; both directions of Kuratowski's theorem use "subdivision," not "subgraph" | Type 4 — notation-induced ("contains K₅ or K₃,₃" is the common shorthand; "subdivision" is the precise term; students memorise the shorthand and then apply it as if a strict subgraph were required, missing the case where K₅ is hidden inside a larger graph with extra vertices on the edges) |
| MC-3 | E-LESS-THAN-3V-MINUS-6-IS-SUFFICIENT | Student treats E≤3V−6 as a SUFFICIENT condition for planarity — concluding "this graph satisfies E≤3V−6, so it is planar"; the bound is necessary but NOT sufficient; there exist non-planar graphs satisfying E≤3V−6 if they are not simple, and the inequality is a quick NON-PLANARITY test only in the direction "if E>3V−6 then definitely non-planar" | Type 5 — instruction-induced (the bound is taught as a non-planarity test — "if violated then non-planar"; students flip the logic to "if satisfied then planar"; K₃,₃ itself satisfies E=9=3·6−6+3=12 not quite — actually K₃,₃: V=6, E=9, 3V−6=12, so K₃,₃ DOES satisfy the 3V−6 bound, confirming that the bound is not sufficient; the tighter triangle-free bound 2V−4 catches K₃,₃) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Euler's formula and edge-density bounds:**

**Planarity:** G is planar if it can be embedded in the plane (equivalently, on a sphere) with no edge crossings. A specific drawing without crossings is a plane graph; the regions it creates are called faces (including the unbounded outer face).

**Euler's formula:** For a connected plane graph: V − E + F = 2.

**Proof (by induction on E):** Base: E=0, one vertex, one face → 1−0+1=2. ✓. Inductive step: if G has a cycle, remove one cycle edge → F decreases by 1, E decreases by 1, V unchanged: (V)−(E−1)+(F−1)=V−E+F=2. ✓. If G is a tree, F=1 always, and V−E=1 for trees → V−E+1=2. ✓.

**Edge bounds for simple planar graphs:**
Every face of a simple planar graph is bounded by ≥3 edges; each edge borders ≤2 faces → 3F ≤ 2E. Combined with F=2−V+E: 3(2−V+E) ≤ 2E → 6−3V+3E ≤ 2E → **E ≤ 3V−6**.

For triangle-free graphs (no 3-cycle): every face bounded by ≥4 edges → 4F ≤ 2E → **E ≤ 2V−4**.

**Non-planarity of K₅ and K₃,₃:**
- K₅: V=5, E=10. 3V−6=9 < 10 → E>3V−6 → K₅ is NOT planar.
- K₃,₃: V=6, E=9. 3V−6=12 ≥ 9 (bound not violated!). But K₃,₃ is bipartite (no odd cycles) → triangle-free → E≤2V−4=8 < 9 → K₃,₃ is NOT planar.

**Key planar graphs:** K₄ (V=4,E=6: planar), K₂,₃ (V=5,E=6: planar), all trees, all outerplanar graphs.

**P49 checkpoint:**
- CORRECT → "Euler: V−E+F=2 for connected planar. E≤3V−6 for simple planar. K₅: E=10>9=3·5−6, non-planar. K₃,₃: triangle-free bound E=9>8=2·6−4, non-planar. Bound is necessary, not sufficient." → A02
- PARTIAL (MC-3: bound is sufficient) → "E≤3V−6 is NECESSARY for planarity — if a graph violates it, it CANNOT be planar. But it is NOT SUFFICIENT — satisfying it does not guarantee planarity. Key counter-direction: K₃,₃ has V=6, E=9, and 3V−6=12 ≥ 9, so it SATISFIES the 3V−6 bound — yet K₃,₃ is non-planar. For K₃,₃ you need the tighter TRIANGLE-FREE bound: 2V−4=8 < 9. The correct reasoning chain: E>3V−6 → definitely non-planar. E≤3V−6 → maybe planar, further checking needed (Kuratowski's theorem)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Petersen graph: V=10, E=15. 3V−6=24 ≥ 15 — bound satisfied. Triangle-free? Petersen graph HAS 5-cycles (not triangle-free, wait — it has girth 5, so it IS triangle-free). E=15, 2V−4=16 ≥ 15 — even the triangle-free bound is satisfied! Yet the Petersen graph is non-planar (contains a K₃,₃ subdivision). This confirms: density bounds are not sufficient for planarity." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Kuratowski's theorem, Wagner's theorem, and genus:**

**Kuratowski's theorem:** G is planar iff it contains NO SUBDIVISION of K₅ or K₃,₃ as a subgraph. (A subdivision of H is obtained by inserting degree-2 vertices into H's edges.)

**Wagner's theorem:** G is planar iff it contains neither K₅ nor K₃,₃ as a MINOR. (A minor is obtained by deleting vertices/edges and contracting edges — a coarser relation than subdivision.)

**Why K₅ and K₃,₃?** They are the minimal non-planar graphs (every proper subgraph of each is planar, and both are non-planar). There are exactly two "obstruction archetypes" for planarity, corresponding to two non-planar graph families.

**Outerplanar graphs:** all vertices lie on the outer face. Outerplanar iff no K₄ or K_{2,3} minor. For outerplanar: E ≤ 2V−3.

**Genus and surfaces:** The genus g of a graph is the minimum number of handles needed on a sphere to embed it without crossings. Euler's formula generalises: V−E+F=2−2g. K₅: genus 1 (embeds on a torus). The genus of Kₙ is ⌈(n−3)(n−4)/12⌉.

**Planarity testing algorithms:** Hopcroft–Tarjan (1974): O(V) algorithm for planarity testing. Outputs either a planar embedding or a Kuratowski subgraph certificate of non-planarity.

**P49 checkpoint:**
- CORRECT → "Kuratowski: planar iff no K₅/K₃,₃ SUBDIVISION. Wagner: iff no K₅/K₃,₃ MINOR. Outerplanar: all vertices on outer face, E≤2V−3. Genus g: V−E+F=2−2g. O(V) planarity testing." → Gate (P91)
- PARTIAL (MC-2: subdivision vs. subgraph) → "SUBDIVISION of K₅: start with K₅ and insert any number of degree-2 vertices into any of its 10 edges. The resulting graph still has the same 'topological shape' as K₅ and is equally non-planar. Kuratowski's theorem says: G is non-planar iff some such subdivided K₅ (or K₃,₃) appears as a SUBGRAPH of G. This is more general than 'K₅ appears as a strict subgraph' — it catches the case where K₅ is embedded inside G with extra vertices on its edges." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Prove the Petersen graph is non-planar by finding a K₃,₃ subdivision: label the outer 5-cycle 1-2-3-4-5 and the inner pentagram with {6=center-connections}. Select vertices {1,3,5} as one part and {2,4,6} as the other. Trace 9 vertex-disjoint paths connecting each pair — they exist within the Petersen graph's structure → K₃,₃ subdivision found → non-planar by Kuratowski." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Euler's formula requires CONNECTIVITY. For a disconnected plane graph with C connected components: V−E+F=1+C. Verify: two disjoint triangles in the plane: V=6, E=6, F=3 (two inner triangles + one outer face), C=2: 6−6+3=3=1+2. ✓. Before applying Euler's formula: check if the graph is connected; if not, count components or add the correction term."
Step 2 — "The edge-density bound as a non-planarity TEST only: the inequality E≤3V−6 is a filter. If a graph FAILS the test (E>3V−6): definitely non-planar, stop. If a graph PASSES the test: undetermined — either planar (and you need to exhibit the embedding) or non-planar (and you need to find a K₅/K₃,₃ subdivision). The two tests work in cascade: first check 3V−6, then check 2V−4 for triangle-free, then apply Kuratowski."
Step 3 — "Verification of F for specific planar graphs: for any planar embedding, count faces including the unbounded outer face. K₄ in its planar embedding (one vertex inside the triangle of three others): V=4, E=6, F=4 (three inner triangular faces + one outer triangular face): 4−6+4=2. ✓. A square with diagonal: V=4, E=5, F=3: 4−5+3=2. ✓."

**TB-R02 (MC-2 SUBDIVISION PRECISION):**
Step 1 — "Subdivision construction: take K₅ (5 vertices, 10 edges). Insert 2 new degree-2 vertices on one of its edges → 7 vertices, 11 edges, still non-planar. This 7-vertex graph is a K₅ SUBDIVISION. If it appears as a subgraph of some larger graph G, then G contains a K₅ subdivision and is non-planar by Kuratowski."
Step 2 — "Practical recognition: to find a K₅ subdivision in G, look for 5 vertices of degree ≥3 in G. These will be the 'branch vertices' of the subdivision. The subdividing paths connecting them (through degree-2 vertices) form the edges of the original K₅. For K₃,₃: look for a bipartition {u₁,u₂,u₃},{v₁,v₂,v₃} of 6 high-degree vertices with 9 internally vertex-disjoint paths connecting all uᵢ–vⱼ pairs."
Step 3 — "Wagner vs. Kuratowski: a MINOR allows contraction (merging an edge into a single vertex), which is more powerful than insertion. Every subdivision is also a minor, but not vice versa: you can reach K₅ by contracting edges without ever having a K₅ subdivision present. For certifying non-planarity, either theorem works; for algorithmic purposes, minors are often easier to detect (polynomial time by Robertson-Seymour)."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. A connected plane graph has V=12, E=18. Apply Euler's formula to find F. How many faces are there? If every face has ≥4 edges on its boundary, derive the tightest possible upper bound on E given V=12.
2. Prove that K₃,₃ is non-planar in two ways: (a) using the triangle-free edge bound E≤2V−4; (b) using Euler's formula directly — assume K₃,₃ is planar, derive the number of faces via Euler, then show a contradiction using the minimum-face-size argument.
3. Which of the following are planar? For each, either exhibit a planar drawing or prove non-planarity using edge bounds or Kuratowski: (a) K₄; (b) K₅ minus one edge; (c) K_{2,4}; (d) the Petersen graph; (e) a 3-regular bipartite graph on 8 vertices.
4. A graph G has V=8, E=12, and every face in a plane embedding has exactly 4 edges on its boundary. Find F using Euler's formula and verify consistency with the face-edge incidence count 4F=2E.
5. Prove that every planar graph has at least one vertex of degree ≤5. (Hint: suppose all degrees ≥6, derive a lower bound on E using handshaking, and compare with the planar upper bound E≤3V−6 to get a contradiction.)

**P55 — Reflect & Consolidate:** "Euler: V−E+F=2 (connected planar). E≤3V−6 for simple planar; E≤2V−4 for triangle-free planar. K₅ (E=10>3·5−6=9) and K₃,₃ (E=9>2·6−4=8) are non-planar. Kuratowski: planar iff no K₅ or K₃,₃ SUBDIVISION. Minimum degree ≤5 in any planar graph → Four Color Theorem proof strategy."

**P76 — Transfer Probe (Independence mode):**
(a) Fáry's theorem: every planar graph can be drawn with ALL edges as straight line segments (no curves needed). Prove for triangulations (maximal planar graphs) by induction: find a vertex v of degree ≤5, remove it, triangulate the resulting face, apply induction to get a straight-line embedding of G−v, then show v can be re-inserted in the interior of its face with straight edges to all its neighbors. (b) Crossing number: the crossing number cr(G) is the minimum number of crossings over all drawings of G in the plane. Prove cr(K₅)=1 (draw K₅ with exactly one crossing — it exists; show 0 crossings is impossible since K₅ is non-planar). Show cr(Kₙ) ≥ (1/5)C(n,2)C(n−2,2)/4 using the crossing-number inequality: for every graph G with E>3V, cr(G)≥E³/(33.75V²). (c) Topological graph theory: a graph G embeds on an orientable surface of genus g iff V−E+F=2−2g (Euler characteristic 2−2g). The genus of the complete graph Kₙ is γ(Kₙ)=⌈(n−3)(n−4)/12⌉. Compute γ(K₅)=1 and γ(K₆)=1, verifying that K₅ and K₆ both embed on a torus but not a sphere.

**P75 — Mastery Assessment:**
"(a) A connected plane graph has all faces triangles and V=10. Find E and F using Euler's formula together with the triangulation constraint 3F=2E. (b) Prove the five-color theorem: every planar graph is 5-colorable. (Hint: planar graph has a vertex of degree ≤5; remove it; apply induction; reinsert and argue that 5 colors suffice by using the minimal-degree bound and the structure of the degree-5 case.) (c) Is the graph with vertices {a,b,c,d,e,f} and edge set forming a 3×2 grid (a-b-c on top, d-e-f on bottom, with rungs a-d, b-e, c-f) planar? Prove your answer. (d) A simple connected planar graph G has V=6, E=12. Is this possible? If so, exhibit such a graph; if not, prove it violates a planar constraint."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the edge-density bounds and Kuratowski subdivision definition
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.graph; reassign

**P78 — Completion:** Planar Graphs certified. Student applies Euler's formula for connected plane graphs; derives and uses edge-density bounds (E≤3V−6, E≤2V−4) as non-planarity tests; proves K₅ and K₃,₃ are non-planar; states Kuratowski's theorem correctly (subdivision, not subgraph); and computes face counts for given planar embeddings.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Fáry's theorem (straight-line embedding); crossing number lower bounds; genus and surfaces
Skill tested: Connect planar graph theory to its geometric realization, to crossing-number combinatorics, and to topological generalisations via genus

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

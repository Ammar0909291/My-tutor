# Teaching Blueprint: Graph (`math.graph.graph`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.graph` |
| name | Graph |
| domain | Graph Theory |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.found.set-theory` |
| unlocks | `math.graph.connectivity`, `math.graph.tree` |
| cross_links | `math.disc.graph` (**authored** — verified via `ls docs/curriculum/blueprints/math.disc.graph.md`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | A (Abstract) — this concept extends the already-concretely-grounded vertex/edge/degree model from `math.disc.graph` into formal order/size terminology and generalized graph families, so entry is at the abstract/terminological stage rather than re-deriving from diagrams |
| description (KG) | A graph G=(V,E) with vertex set V and edge set E⊆V×V. Basic parameters: n=|V| (order), m=|E| (size). Degree deg(v): edges incident to v. Handshaking: ∑deg(v)=2m. Extends to directed, weighted, and multigraphs. |

## Component 1 — Learning Objectives

- LO1: State a graph's **order** ($n=|V|$, the number of vertices) and **size** ($m=|E|$, the number of edges) for a given graph, correctly distinguishing these two related-but-different counts.
- LO2: Restate the Handshaking Lemma in order/size notation ($\sum_v \deg(v) = 2m$) and apply it using $m$ explicitly, building on the vertex/edge/degree vocabulary already established in `math.disc.graph`.
- LO3: Distinguish four graph families by their edge structure — simple undirected, directed, **weighted** (edges carry a numeric value, e.g. distance or cost), and **multigraph** (multiple edges permitted between the same pair of vertices) — and correctly classify a given real-world network as the appropriate family.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-theory` (V and E as sets, E⊆V×V). This concept also assumes and directly builds on the vertex/edge/undirected-vs-directed/degree/Handshaking-Lemma content already taught in the sibling concept `math.disc.graph` — see Component 7 for the precise division of labor between the two.

## Component 3 — Core Explanation

A graph's **order**, $n=|V|$, is simply the number of vertices. Its **size**, $m=|E|$, is the number of edges. These are easy to conflate since both are "a count for the graph," but they measure different things — a graph with high order (many vertices) can have low size (few edges, e.g. mostly isolated vertices), or vice versa is impossible past a maximum (a simple graph on $n$ vertices has at most $\binom{n}{2}$ edges), but low order can still carry disproportionately many edges relative to a sparse large graph.

Restating the **Handshaking Lemma** using this order/size notation: $\sum_{v\in V}\deg(v) = 2m$ — identical content to `math.disc.graph`'s $\sum\deg=2|E|$, just written with the size symbol $m$ in place of $|E|$.

**Beyond simple undirected/directed graphs**, real networks often need richer structures:
- A **weighted graph** attaches a numeric label (weight) to each edge — e.g. a road network where each edge's weight is the distance or travel time between two intersections.
- A **multigraph** permits **more than one edge** between the same pair of vertices — e.g. multiple direct flight routes operated by different airlines between the same two cities, each a distinct edge even though they connect the identical vertex pair.

These extensions keep the same vertex/edge/degree/order/size vocabulary, but relax or enrich what an "edge" is allowed to be.

## Component 4 — Worked Examples

**Example 1 (LO1 — order and size)**: A graph has V={A,B,C,D,E} and E={{A,B},{B,C},{C,D},{D,E},{E,A}} (a 5-cycle). Order: $n=|V|=5$. Size: $m=|E|=5$.

**Example 2 (LO2 — Handshaking Lemma in order/size notation)**: For the graph in Example 1, every vertex has degree 2 (each touches exactly two of the cycle's edges). Check: $\sum\deg(v) = 5\times 2=10 = 2m = 2(5)=10$. ✓

**Example 3 (LO3 — classifying graph families)**: A city's public-transit map has bus stops as vertices; between some stop pairs there are *two* separate bus routes (two distinct edges, a multigraph feature), and each edge is labeled with its average travel time (a weight). This network is therefore best modeled as a **weighted multigraph** — neither a simple graph nor a plain directed graph captures both features at once.

## Component 5 — Teaching Actions

### Teaching Action A01 — Order, Size, and the Handshaking Lemma Restated (Primitive P11: Representation Shift)

Briefly recall the vertex/edge/degree vocabulary from `math.disc.graph`. Shift representation to the order/size terminology: "the number of vertices gets its own name, **order** ($n$), and the number of edges gets its own name, **size** ($m$)." Work Example 1 together, counting $n$ and $m$ explicitly and contrasting them (5 vertices, 5 edges — coincidentally equal for this specific graph, but conceptually independent counts).

Restate the Handshaking Lemma with the new symbol: $\sum\deg(v)=2m$ — identical fact to the one already learned, now expressed in the field's standard order/size notation.

- **MC-1 hook**: ask "if a graph has order 6, does it necessarily have size 6 too?" — a "yes" answer reveals MC-1 (believing order and size must be equal or are otherwise linked by default, rather than being independent counts constrained only by the graph's actual edge set).

### Teaching Action A02 — Weighted and Multigraph Extensions (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-2, weighted vs. unweighted)**: Present the same 5-vertex road network twice: once as a plain (unweighted) graph — just "connected or not" — and once with each edge labeled with a distance in km. Ask: "does adding weights change which vertices are connected to which?" (No — the *underlying* graph structure, who's connected to whom, is identical; weights add extra information *on top of* that structure, they don't redefine it.) This directly breaks MC-2 (believing a weighted graph is a fundamentally different kind of mathematical object rather than the same graph with extra edge-labels).

**Contrast 2 (targets MC-3, multigraph vs. simple graph degree counting)**: Present a multigraph with two distinct edges both connecting vertices X and Y (e.g., two different bus routes). Ask for deg(X). A student following the *simple*-graph rule ("count distinct neighbor vertices") might answer 1 (since Y is the only neighbor) — but the correct multigraph rule counts each *edge* separately, so if there are two X–Y edges, they each contribute to deg(X), giving deg(X)≥2 from this pair alone. State the rule explicitly: "in a multigraph, degree counts **edges**, not distinct neighboring vertices — the Handshaking Lemma still holds exactly as stated, precisely because it was always defined in terms of edge-incidences, not neighbor-counts."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A graph has V={P,Q,R,S} and E={{P,Q},{Q,R},{R,S},{S,P},{P,R}}. State its order and size.
  2. Using the graph in problem 1, verify the Handshaking Lemma using the order/size notation ($\sum\deg=2m$).
  3. A delivery network has warehouses as vertices, with edges labeled by delivery cost between each warehouse pair, and sometimes two different delivery contractors both serving the same warehouse pair (two separate edges). Classify this network among simple/directed/weighted/multigraph, and justify each part of the classification.
  4. In a multigraph, vertex X has three edges to vertex Y and one edge to vertex Z (no other edges). What is deg(X)?
- **P76 (Transfer Probe, mode = cross-link probe against `math.disc.graph`)**: "Recall from your earlier lesson on graphs (`math.disc.graph`) that a graph G=(V,E) with 5 edges and four known vertex degrees 2, 3, 1, 3 has a fifth vertex of degree 1, found via $\sum\deg=2|E|=10$. Restate that exact same graph and calculation now using this lesson's order/size notation: what is $m$ for that graph, and what does $\sum\deg(v)=2m$ give you? Then extend it: if this same road network additionally had one road pair served by two separate bike-path *and* car-road edges between the same two towns (turning it into a multigraph), how would the size $m$ and the degree sum change, and would the Handshaking Lemma still hold exactly?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ORDER-SIZE-ASSUMED-EQUAL | Believing a graph's order (vertex count) and size (edge count) must be equal or otherwise directly linked, rather than independent counts | Moderate |
| MC-2 | WEIGHTED-GRAPH-DIFFERENT-OBJECT | Believing a weighted graph is a fundamentally different kind of mathematical structure rather than the same underlying graph with numeric labels added to its edges | Moderate |
| MC-3 | MULTIGRAPH-DEGREE-BY-NEIGHBOR-COUNT | In a multigraph, counting a vertex's degree by its number of distinct neighboring vertices rather than by its number of incident edges | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Order/Size Conflation") → P41 (detect: give a graph with clearly different vertex and edge counts, e.g. order 6, size 4, and ask if that's possible) → P64 (conceptual shift: re-anchor on the definitions as two independent counts, one over $V$, one over $E$, constrained only by the actual edges present, not by each other).
- **B02 (targets MC-2)**: P27 (name it: "Weighted-Graph Object Confusion") → P41 (detect: ask whether adding distances to a road network's edges changes which towns are connected to which) → P64 (conceptual shift: re-derive from "a weight is extra data attached to an edge that already exists — the connectivity structure underneath is untouched").
- **B03 (targets MC-3)**: P27 (name it: "Neighbor-Count Degree in a Multigraph") → P41 (detect: give a multigraph with 2 parallel edges between the same pair and ask for one endpoint's degree — an answer of 1, rather than 2, reveals MC-3) → P64 (conceptual shift: re-anchor on the Handshaking Lemma's own definition — degree was always defined by edge-incidence, and a multigraph simply allows more incidences between the same pair than a simple graph does).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-theory` (V and E as sets, E⊆V×V).
- **Unlocks**: `math.graph.connectivity` (paths and connectedness build on the order/size/degree vocabulary formalized here), `math.graph.tree` (trees are connected acyclic graphs with the specific order/size relation $m=n-1$, a direct extension of this concept's order/size framing).
- **Cross-link**: KG lists `math.disc.graph` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.disc.graph.md` **is already authored**. This is the first blueprint in the corpus whose named cross-link target is confirmed present, enabling a genuine **cross-link probe** (P76 above) that directly reuses that concept's own worked example (the 5-edge, degree-2/3/1/3-known graph) and asks the learner to re-derive the identical result in this concept's order/size vocabulary, then extend it to a multigraph — testing that the learner recognizes these two concepts as complementary vocabularies for one underlying idea, not two separate topics. Division of labor: `math.disc.graph` owns the foundational vertex/edge/directed-vs-undirected/self-loop/degree/Handshaking-Lemma content; this concept owns order/size terminology and the weighted/multigraph extensions, deliberately not re-teaching the foundational material to avoid duplicating that blueprint's Teaching Actions.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/understand tag places this at the compact "2 main TAs + gate" tier, matching `math.disc.graph`'s own sizing — appropriate since this concept is explicitly framed as a *terminology and extension* layer on top of already-taught foundational content, not a large independent topic.
- This blueprint was deliberately scoped to avoid re-teaching `math.disc.graph`'s vertex/edge/directed-vs-undirected/self-loop content — the KG's two nearly-identical-sounding graph concepts (`math.disc.graph` and `math.graph.graph`) were reconciled by assigning `math.disc.graph` ownership of the foundational definitions and this concept ownership of order/size notation plus the weighted/multigraph generalizations, which the KG's own description text for this concept (order/size explicitly named, "extends to directed, weighted, and multigraphs") supports as the intended differentiation.
- This is the first authored blueprint in the batch-57/58/59 sequence whose cross-link target was already on disk, making it the first genuine test of the cross-link-probe mechanism established as a design rule early in this corpus's authoring — the probe was written to require the learner to actually retrieve and reuse the other blueprint's specific worked example, not merely gesture at a shared topic.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set-theory`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.graph` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, genuinely references `math.disc.graph`'s content) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: extends already-concrete sibling concept) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

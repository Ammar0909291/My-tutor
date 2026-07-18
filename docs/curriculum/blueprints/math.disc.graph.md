# Teaching Blueprint: Graph (`math.disc.graph`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.graph` |
| name | Graph |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.found.set-theory` |
| unlocks | `math.disc.graph-connectivity`, `math.disc.graph-trees` |
| cross_links | `math.graph.graph` (**not yet authored** — verified via `ls docs/curriculum/blueprints/math.graph.graph.md` returning no file; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — vertex/edge diagrams drawn first, before the ordered-pair formalism |
| description (KG) | A graph G=(V,E) consists of vertices V and edges E⊆V×V. Undirected: edges are unordered pairs; directed: ordered pairs. Degree of vertex: number of incident edges. Handshaking lemma: ∑deg = 2|E|. |

## Component 1 — Learning Objectives

- LO1: Define a graph G=(V,E) as a set of vertices V and a set of edges E, and distinguish undirected (unordered-pair edges) from directed (ordered-pair edges) graphs.
- LO2: Compute the degree of a vertex (number of incident edges, with a self-loop counting twice) in a given graph diagram or edge list.
- LO3: State and apply the Handshaking Lemma (∑ᵥ deg(v) = 2|E|) to solve for an unknown quantity (number of edges, a missing degree, or to detect an impossible degree sequence).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-theory` (sets, ordered pairs, Cartesian products E⊆V×V). No arithmetic beyond addition/doubling is required, but LO3 leans on comfort manipulating a simple linear equation (∑deg = 2|E|).

## Component 3 — Core Explanation

A **graph** G=(V,E) is a pair: a set of **vertices** V (also called nodes, drawn as dots) and a set of **edges** E connecting pairs of vertices (drawn as lines or arrows).

- **Undirected graph**: each edge is an *unordered* pair {u,v} — a connection with no direction, like a two-way road or a friendship. Edge {u,v} = edge {v,u}; drawn as a plain line.
- **Directed graph** (digraph): each edge is an *ordered* pair (u,v) — a connection with direction, like a one-way street or "follows on social media." (u,v) ≠ (v,u) in general; drawn as an arrow from u to v.

The **degree** of a vertex v, deg(v), is the number of edges incident to (touching) v. In an undirected graph, a **self-loop** (an edge from v to itself) contributes **2** to deg(v), not 1 — because both "ends" of the loop attach at v.

**The Handshaking Lemma**: for any undirected graph, the sum of all vertex degrees equals twice the number of edges:
$$\sum_{v \in V} \deg(v) = 2|E|$$
This holds because every edge has exactly two endpoints, and each endpoint contributes 1 to that vertex's degree count — so summing degrees counts every edge exactly twice. A direct corollary: the sum of degrees is always even, and therefore the number of vertices with **odd** degree is always even (never 1, 3, 5, ...).

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — undirected)**: G has V={A,B,C,D}, E={{A,B},{A,C},{B,C},{C,D}}.
- deg(A) = 2 (edges to B, C), deg(B) = 2 (edges to A, C), deg(C) = 3 (edges to A, B, D), deg(D) = 1 (edge to C).
- Check: 2+2+3+1 = 8 = 2×4 = 2|E|. ✓ Handshaking Lemma confirmed.

**Example 2 (LO1 — directed)**: G has V={X,Y}, E={(X,Y),(Y,X),(X,X)}. This is directed: (X,Y) and (Y,X) are *different* edges (arrow X→Y and a separate arrow Y→X), coexisting without contradiction. (X,X) is a self-loop at X.

**Example 3 (LO3 — solving via Handshaking Lemma)**: An undirected graph has 5 edges and four vertices of known degree 2, 3, 1, and 3. What is the degree of the fifth vertex?
$\sum \deg(v) = 2|E| = 2(5) = 10$. Known sum = 2+3+1+3 = 9. Fifth vertex: $\deg = 10 - 9 = 1$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Vertices, Edges, and the Undirected/Directed Distinction (Primitive P11: Representation Shift)

Draw four dots labeled A, B, C, D. Draw a plain line between A and B: "This is an **edge** — a connection. Right now it has no direction: going from A to B is exactly the same fact as going from B to A. This is an **undirected** graph." Add lines A–C, B–C, C–D. State the formal pair: G=(V,E), V={A,B,C,D}, E={{A,B},{A,C},{B,C},{C,D}} — shift from the picture to the formal set notation, showing each line *is* an unordered pair in E.

Then redraw with arrows: A→B only (no B→A arrow). "Now direction matters — this is a **directed** graph (digraph). The edge is the *ordered* pair (A,B), and (A,B) ≠ (B,A) — having one doesn't give you the other for free." Contrast: "A friendship (undirected: if I'm your friend, you're mine) versus a 'follows' relationship on social media (directed: I can follow you without you following me)."

State the degree definition: "deg(v) = number of edges touching v." Count deg(A)=2, deg(C)=3 on the undirected diagram together.

- **MC-1 hook**: ask "In the directed graph, if there's an arrow A→B, is there automatically an arrow B→A?" — students who answer yes reveal MC-1 (treating directed edges as automatically symmetric, i.e., not distinguishing (u,v) from (v,u)).

### Teaching Action A02 — Self-Loops and the Handshaking Lemma (Primitive P06: Contrast Pair)

**Contrast 1 (self-loop degree)**: Draw a vertex E with a plain edge to F, and a self-loop at F (an edge from F back to F). Ask: "deg(F) — is it 1 (one loop) or 2?" State the rule: a self-loop touches its vertex at **both ends**, so it contributes 2 to that vertex's degree. deg(F) = 1 (from the edge to E) + 2 (from the self-loop) = 3. This directly breaks **MC-2** (counting a self-loop as contributing only 1 to degree) by showing the "both ends touch here" reasoning concretely.

**Contrast 2 (sum of degrees vs. number of edges)**: Return to Example 1's graph (4 vertices, 4 edges, degree sum 8). Ask: "The graph has 4 edges. Is the sum of all degrees 4, or something else?" Walk through: each of the 4 edges has 2 endpoints, so it gets counted once at *each* end — 4 edges × 2 endpoints = 8, matching the actual sum computed from individual degrees. State the Handshaking Lemma formally: $\sum \deg(v) = 2|E|$. This directly breaks **MC-3** (believing ∑deg = |E| rather than 2|E|) by re-deriving the factor of 2 from the "every edge has two ends" argument rather than presenting the formula as a memorized fact.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A graph has V={P,Q,R} and E={{P,Q},{Q,R},{P,R}}. State whether it's directed or undirected, and give deg(Q).
  2. A directed graph has edges (X,Y) and (X,Z) only. Is there an edge (Y,X)? Why or why not?
  3. A vertex has a self-loop and two ordinary edges. What is its degree?
  4. An undirected graph has 6 edges. Vertices have degrees 3, 2, 2, and one unknown vertex. Find the unknown degree.
- **P76 (Transfer Probe, mode = independence)**: "A gathering of 7 people shakes hands with each other in various pairs — some pairs shake hands, some don't. Model this as a graph: what are the vertices, what are the edges, and is it directed or undirected? If the total number of handshakes given-and-received (each handshake counted once per participant) is 20, how many actual handshakes (edges) occurred?" (Answer: vertices = people, edges = handshake pairs, undirected since a handshake is mutual; 20 = 2|E| → |E| = 10.) *Component 7 note: this probe intentionally mirrors the classic "handshake" framing of the Handshaking Lemma itself rather than cross-linking to `math.graph.graph`, since that blueprint does not yet exist.*
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action (below) before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIRECTED-EDGE-ASSUMED-SYMMETRIC | Believing an edge (u,v) in a directed graph implies (v,u) also exists | Moderate |
| MC-2 | SELF-LOOP-DEGREE-ONE | Counting a self-loop as contributing 1 (not 2) to a vertex's degree | Moderate |
| MC-3 | HANDSHAKE-SUM-EQUALS-EDGES | Believing ∑deg(v) = \|E\| rather than 2\|E\| | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Assumed Symmetry") → P41 (detect: present a directed graph with (A,B) only and ask if (B,A) exists) → P64 (conceptual shift: re-anchor on the "one-way street" analogy — a one-way street from A to B does not create a road back from B to A).
- **B02 (targets MC-2)**: P27 (name it: "Self-Loop Undercounting") → P41 (detect: ask for the degree of a vertex with exactly one self-loop and no other edges — correct answer 2, not 1) → P64 (conceptual shift: "both ends of the loop attach at this same vertex — count each attachment").
- **B03 (targets MC-3)**: P27 (name it: "Single-Counting the Handshake") → P41 (detect: give a 3-edge graph and ask for ∑deg without listing individual degrees first — if they answer 3, MC-3 is present) → P64 (conceptual shift: re-derive from "each edge has 2 endpoints, so contributes 2 to the total, not 1").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-theory` (V and E as sets; E⊆V×V as a subset of the Cartesian product, giving the ordered-pair definition of directed edges formal grounding).
- **Unlocks**: `math.disc.graph-connectivity` (paths, connectedness build directly on the vertex/edge/degree vocabulary here), `math.disc.graph-trees` (trees are connected acyclic graphs — a specialization of this concept).
- **Cross-link**: KG lists `math.graph.graph` as a cross-link target. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.graph.graph.md`. Per the established P76_mode rule, this blueprint uses **independence** mode for its transfer probe rather than fabricating a cross-reference to unauthored content. A future revision, once `math.graph.graph` is authored, may add a genuine cross-link probe connecting this concept's foundational vertex/edge/degree definitions to that concept's likely broader graph-theory content (paths, cycles, graph isomorphism, etc.).

## Component 8 — Teaching Notes

- estimated_hours = 3 with a "developing/understand" tag places this at the compact end of the sizing heuristic: 2 main TAs (A01, A02) + gate (A03), rather than 3 main TAs, since the content — vertex/edge/degree/Handshaking-Lemma — is narrow and each TA already carries a built-in contrast/misconception-breaking structure.
- The undirected/directed distinction (A01) and the self-loop/Handshaking-Lemma pair (A02) were deliberately kept as two separate TAs rather than merged, because MC-1 (directed-edge symmetry) is a fundamentally different error mode from MC-2/MC-3 (both about correctly counting degree) — collapsing them would blur two independent diagnostic signals.
- The Handshaking Lemma's parity corollary (number of odd-degree vertices is always even) was mentioned in Component 3 for completeness but deliberately not made a separate teaching action or assessment item at this developing/understand level — it is a natural extension question for a future `math.disc.graph-connectivity` or degree-sequence blueprint, not core to this concept's three learning objectives.

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set-theory`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.graph.graph` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01, A02, A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: diagrams before formal notation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

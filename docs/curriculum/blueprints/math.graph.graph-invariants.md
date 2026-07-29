# Teaching Blueprint: Graph Invariants (`math.graph.graph-invariants`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.graph-invariants` |
| name | Graph Invariants |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.graph.graph` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner already fluent in graph definition, order, size, and degree; invariants are abstract properties of graphs defined by formal graph-theoretic quantities |
| description (KG) | Graph invariants are properties preserved under graph isomorphism. Key invariants: degree sequence, girth, diameter, connectivity, chromatic number, independence number. Isomorphic graphs have identical invariants; equal invariants do not imply isomorphism. |

## Component 1 — Learning Objectives

- LO1: Define **graph isomorphism** ($G_1\cong G_2$: a bijection $f:V_1\to V_2$ preserving adjacency); define a **graph invariant** (any property preserved by isomorphism); list six standard invariants — degree sequence, order, size, number of connected components, girth, diameter.
- LO2: **Compute** the degree sequence, girth, diameter, and connectivity $\kappa(G)$ of a given graph; use differences in any single invariant to **prove non-isomorphism** between two graphs without exhaustive bijection search.
- LO3: Explain why equal invariants do NOT imply isomorphism (give an explicit pair of non-isomorphic graphs with identical degree sequence, $n$, $m$, and girth); recognize that the **graph isomorphism problem** has no known polynomial-time algorithm, motivating the study of efficiently-computable invariants.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` (graph definition: $G=(V,E)$, order $n=|V|$, size $m=|E|$, degree $\deg(v)$, Handshaking Lemma, directed/undirected/weighted). No further prerequisites.

## Component 3 — Core Explanation

**Graph isomorphism.** Two graphs $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$ are **isomorphic** ($G_1\cong G_2$) if there exists a bijection $f:V_1\to V_2$ such that $\{u,v\}\in E_1\iff\{f(u),f(v)\}\in E_2$. Isomorphic graphs are "the same graph drawn differently." Isomorphism is an equivalence relation.

**Graph invariant.** A **graph invariant** is any function $I$ from graphs to some set such that $G_1\cong G_2\Rightarrow I(G_1)=I(G_2)$. Invariants used to DISPROVE isomorphism: if $I(G_1)\neq I(G_2)$ then $G_1\not\cong G_2$. They cannot PROVE isomorphism (no simple complete set of polynomial invariants is known).

**Key invariants**:

| Invariant | Definition | Complexity to compute |
|---|---|---|
| Order $n$ | $|V|$ | $O(1)$ |
| Size $m$ | $|E|$ | $O(1)$ |
| Degree sequence | Sorted list of degrees $(\deg(v_1)\ge\cdots\ge\deg(v_n))$ | $O(n+m)$ |
| Number of components | Connected components | $O(n+m)$ via BFS/DFS |
| Girth | Length of shortest cycle ($\infty$ if acyclic) | $O(n(n+m))$ |
| Diameter | $\max_{u,v} d(u,v)$ where $d$ is shortest-path distance | $O(n(n+m))$ via BFS from each vertex |
| Connectivity $\kappa(G)$ | Minimum vertex cut size | $O(n\cdot\text{max-flow})$ |
| Chromatic number $\chi(G)$ | Minimum colors to properly color vertices | NP-hard |

**Non-isomorphic graphs with equal simple invariants**: The two graphs on $V=\{1,2,3,4,5,6\}$ with degree sequence $(3,3,3,3,3,3)$ (all vertices cubic): $K_{3,3}$ (complete bipartite, girth 4, planar? No — non-planar) and the prism graph $K_3\square K_2$ (girth 3, planar). These have same $n=6$, $m=9$, degree sequence $(3,3,3,3,3,3)$ — but $K_{3,3}$ has girth 4 and $K_3\square K_2$ has girth 3, distinguishing them.

A simpler pair: $C_6$ (6-cycle) vs. $C_3\cup C_3$ (two disjoint triangles): same $n=6$, $m=6$, degree sequence $(2,2,2,2,2,2)$, but $C_6$ is connected (1 component) and $C_3\cup C_3$ has 2 components — distinguished by the number-of-components invariant.

## Component 4 — Worked Examples

**Example 1 (LO1–LO2 — verifying isomorphism by invariants)**: Are $G_1=C_4$ (4-cycle: $1-2-3-4-1$) and $G_2=K_{1,3}$ (star: center $c$ connected to $a,b,d$) isomorphic? Degree sequence of $G_1$: $(2,2,2,2)$. Degree sequence of $G_2$: $(3,1,1,1)$. These differ → $G_1\not\cong G_2$. Also: both have $n=4$, $m=4$, one component — invariants $n$, $m$, components are insufficient; the degree sequence distinguishes them immediately.

**Example 2 (LO2 — computing girth and diameter)**: For the Petersen graph (10 vertices, 15 edges, 3-regular): girth = 5 (no triangles or 4-cycles, but 5-cycles exist). Diameter = 2 (any two vertices at distance $\le2$). These two values together with the degree sequence $(3,\ldots,3)$ and $n=10$, $m=15$ essentially characterize the Petersen graph uniquely among small cubic graphs.

**Example 3 (LO3 — equal invariants, non-isomorphic)**: Consider $G_1=C_6$ (6-cycle) and $G_2=C_3\cup C_3$. Both have $n=6$, $m=6$, degree sequence $(2,2,2,2,2,2)$. Girth: $C_6$ has girth 6 (no shorter cycles); $C_3\cup C_3$ has girth 3. So girth distinguishes them. Now consider $G_3=K_{3,3}$ and $G_4=K_3\square K_2$ (prism): same $n=6$, $m=9$, degree sequence $(3,3,3,3,3,3)$. Girth: $K_{3,3}$ has girth 4 (shortest cycle = 4-cycle); $K_3\square K_2$ has girth 3 (contains triangles). Girth distinguishes them. In general, to find non-isomorphic graphs with EQUAL girth, $n$, $m$, and degree sequence requires larger, more complex constructions (Ramanujan graphs, cages).

## Component 5 — Teaching Actions

### Teaching Action A01 — Isomorphism via Bijection (Primitive P11: Representation Shift)

Present two graphs on 5 vertices: $G_1=C_5$ and $G_2$ (a different 5-cycle with vertices relabeled). Ask: "are these the same graph?" — lead to the bijection definition. Draw the bijection explicitly. Contrast: two graphs can look different yet be isomorphic (different drawings, same structure).

- **MC-1 hook**: after establishing isomorphism, ask "if two graphs have the same degree sequence, are they isomorphic?" — present the $C_6$ vs. $C_3\cup C_3$ example; degree sequence matches, but connectivity differs.

### Teaching Action A02 — Computing Invariants Systematically (Primitive P25: Deductive)

Build the invariant table. For a given graph, compute degree sequence (sort degrees), girth (BFS from each vertex to find shortest cycle), diameter (BFS from each vertex, take max). Work Example 2 (Petersen graph).

- **MC-2 hook**: ask "is the diameter the same as the girth?" — No: diameter = max shortest-path distance between any two vertices; girth = length of shortest CYCLE; they measure different things.

### Teaching Action A03 — Limits of Invariants (Primitive P16: Counterexample)

Work Example 3 explicitly. State: "no combination of polynomial-time invariants currently known can certify isomorphism in general — this is the graph isomorphism problem, famous for sitting in between P and NP for decades (Babai 2015: quasi-polynomial time)."

- **MC-3 hook**: ask "if all standard invariants match, does that mean the graphs are isomorphic?" — No (Example 3 demonstrates); only an explicit bijection certifies isomorphism.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Compute the degree sequence of $K_5$ and verify the Handshaking Lemma.
  2. Show that $C_4$ and $K_{1,3}$ are not isomorphic using two different invariants.
  3. Compute the girth and diameter of the Petersen graph. (State facts: girth = 5, diameter = 2; verify by showing a 5-cycle exists and no shorter cycle exists, and that any two vertices have distance $\le2$.)
  4. Give an example of two non-isomorphic graphs on 6 vertices with identical order, size, and degree sequence but different connectivity.
  5. Explain why proving $G_1\cong G_2$ requires more than matching invariants, and describe what a complete proof requires (an explicit bijection verifying adjacency preservation).
- **P76 (Transfer Probe, mode = independence)**: "The **reconstruction conjecture** (Kelly–Ulam, open since 1960) states: every graph on $\ge3$ vertices is uniquely determined (up to isomorphism) by its **deck** — the multiset of subgraphs obtained by deleting one vertex at a time. (a) Compute the deck of $C_4$ (four subgraphs, each obtained by deleting one vertex). (b) Show that $K_3$ cannot be reconstructed from its deck by the same method (it has fewer than 3 vertices, excluded by the conjecture). (c) Explain why the degree sequence is a **reconstructible invariant** (can be recovered from the deck) — this means the reconstruction conjecture would imply the degree sequence is sufficient to determine the graph, combined with connectivity data."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Graph Invariants — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EQUAL-INVARIANTS-MEANS-ISOMORPHIC | Believing that matching degree sequences (or any other invariant) is sufficient to conclude isomorphism — any single invariant, or any finite set, may match for non-isomorphic graphs | Critical |
| MC-2 | DIAMETER-EQUALS-GIRTH | Confusing diameter (maximum shortest-path distance between vertex pairs) with girth (length of shortest cycle); these measure completely different structural properties | Foundational |
| MC-3 | ISOMORPHISM-IS-SAME-AS-EQUAL-GRAPHS | Believing isomorphic means the graphs have the same vertex and edge sets (set equality) rather than a bijective adjacency-preserving map; graph isomorphism allows completely different vertex labels while preserving structure | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Equal Invariants Do Not Imply Isomorphism") → P41 (detect: ask whether two 6-vertex, 6-edge cubic-free graphs with the same degree sequence must be isomorphic) → P64 (conceptual shift: exhibit $C_6$ and $K_3\cup K_3$: same $n,m$, degree sequence $(2,\ldots,2)$, but girth 6 vs. 3 and 1 vs. 2 components — the invariant TABLE has multiple columns; the more columns match without a bijection, the more likely isomorphism becomes, but never certain).
- **B02 (targets MC-2)**: P27 (name it: "Diameter and Girth Are Different Invariants") → P41 (detect: ask for the diameter and girth of $C_6$) → P64 (conceptual shift: $C_6$ has diameter = 3 (vertices on opposite sides of the 6-cycle) and girth = 6 (the cycle itself is the shortest cycle); for a tree (acyclic), girth is $\infty$ but diameter is finite — completely different quantities that happen to have the same name "diameter" in common usage but in graph theory are defined precisely and separately).
- **B03 (targets MC-3)**: P27 (name it: "Isomorphism Is a Bijection, Not Set Equality") → P41 (detect: ask whether the graph $G_1$ with $V_1=\{a,b,c\}$, $E_1=\{\{a,b\},\{b,c\}\}$ (path $a-b-c$) is isomorphic to $G_2$ with $V_2=\{1,2,3\}$, $E_2=\{\{1,2\},\{2,3\}\}$) → P64 (conceptual shift: these are isomorphic — the bijection $f(a)=1, f(b)=2, f(c)=3$ preserves adjacency; they are NOT the same graph set-theoretically ($V_1\neq V_2$), but they are the same abstract structure; this is exactly the content of isomorphism).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (order, size, degree, adjacency).
- **Unlocks**: none listed in the KG.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The most important single lesson in this blueprint is that invariants prove non-isomorphism but cannot alone prove isomorphism — this is the asymmetry that makes graph isomorphism a deep computational problem. Anchor on MC-1 and return to it in every example.
- The Petersen graph is the canonical example for graph invariants in every combinatorics course — girth 5, diameter 2, 3-regular, 10 vertices — and appears repeatedly in the graph theory curriculum; establishing it here seeds future references.
- The reconstruction conjecture transfer probe is appropriate at this level: it frames invariant theory in the context of a famous open problem (which DOES have a name and is easily explained), requiring the student to apply the deck concept combinatorially without needing to know the proof of the conjecture.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.graph.graph`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient, formal invariant definitions on abstract graphs) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1–LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires explicit non-isomorphism proof by two invariants, reconstruction-deck computation — not just invariant listing | PASS |

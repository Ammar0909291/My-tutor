# Teaching Blueprint: Graph Coloring (`math.graph.graph-coloring`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.graph-coloring` |
| name | Graph Coloring |
| domain | Graph Theory |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.disc.graph-coloring` |
| unlocks | none |
| cross_links | `math.disc.graph-coloring` |
| CPA_entry_stage | A (Abstract) — expert learner; chromatic number and graph coloring theory involve formal combinatorial arguments, NP-hardness, and structural theorems requiring abstract analysis |
| description (KG) | Graph coloring: assignment of colors to vertices so no two adjacent vertices share a color. Chromatic number $\chi(G)$. Brooks' theorem ($\chi(G)\le\Delta(G)$ unless complete graph or odd cycle). Four Color Theorem (planar graphs, $\chi\le4$). Edge coloring: chromatic index $\chi'(G)$, Vizing's theorem ($\Delta\le\chi'\le\Delta+1$). |

## Component 1 — Learning Objectives

- LO1: Define a **proper vertex coloring** and the **chromatic number** $\chi(G)$; compute or bound $\chi(G)$ for small graphs (cliques, cycles, bipartite graphs, Petersen graph); state the **greedy coloring bound** $\chi(G)\le\Delta(G)+1$ and **Brooks' theorem** ($\chi(G)\le\Delta(G)$ for connected graphs that are neither $K_n$ nor an odd cycle).
- LO2: State the **Four Color Theorem** (every planar graph is 4-colorable); prove the **Five Color Theorem** (constructively, using the contraction argument); explain why 4-colorability remains non-trivially hard to prove despite the theorem.
- LO3: Define **edge coloring** and the **chromatic index** $\chi'(G)$; state **Vizing's theorem** ($\Delta(G)\le\chi'(G)\le\Delta(G)+1$); classify a given graph as Class 1 ($\chi'=\Delta$) or Class 2 ($\chi'=\Delta+1$); state that determining the class is NP-hard in general.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph-coloring` (basic vertex coloring definition, map-coloring motivation, chromatic number concept). Requires familiarity with planar graphs (for the Four Color Theorem section) and inductive proofs. No further prerequisites.

## Component 3 — Core Explanation

**Vertex coloring.** A **proper $k$-coloring** of $G$ is a function $c:V\to\{1,\ldots,k\}$ such that $c(u)\ne c(v)$ whenever $\{u,v\}\in E$. The **chromatic number** $\chi(G)$ is the minimum $k$ for which a proper $k$-coloring exists.

Standard values:
- $\chi(K_n)=n$ (complete graph: all vertices adjacent, all colors distinct).
- $\chi(C_n)=2$ if $n$ even (bipartite); $\chi(C_n)=3$ if $n$ odd.
- $\chi(G)=2$ iff $G$ is bipartite (and non-empty).
- $\chi(\text{Petersen})=3$ (not bipartite — odd cycles; 3-colorable by explicit construction).

**Greedy bound.** The **greedy coloring algorithm** (color vertices in order, assign smallest available color) uses at most $\Delta(G)+1$ colors, so $\chi(G)\le\Delta(G)+1$.

**Brooks' Theorem** (1941). Let $G$ be a connected graph. Then $\chi(G)\le\Delta(G)$ unless $G$ is a complete graph $K_n$ or an odd cycle $C_{2k+1}$. Proof idea: if $G$ is neither $K_n$ nor an odd cycle, one can find an ordering of vertices such that the greedy algorithm uses at most $\Delta(G)$ colors (by ensuring the last vertex has two non-adjacent neighbors, allowing color reuse).

**Lower bounds on $\chi(G)$.**
- $\chi(G)\ge\omega(G)$ (clique number): a clique requires $\omega$ distinct colors.
- $\chi(G)\ge n/\alpha(G)$: independence number argument.
- There exist triangle-free graphs with arbitrarily large chromatic number (Mycielski construction), showing $\omega(G)$ does not determine $\chi(G)$.

**Four Color Theorem** (Appel–Haken 1976). Every planar graph has $\chi\le4$. Original proof: computer-assisted verification of 1,936 reducible configurations. Robertson–Seymour–Sanders–Thomas (1997) simplified to 633 configurations. No short human-checkable proof is currently known.

**Five Color Theorem** (Kempe 1879, corrected Heawood 1890). Every planar graph is 5-colorable.
Proof: by induction on $n$. Base $n\le5$: trivial. Inductive step: any planar graph has a vertex $v$ with $\deg(v)\le5$ (by Euler's formula: $\sum\deg\ge2m$ and $m\le3n-6$ for planar). Case 1: $\deg(v)\le4$: remove $v$, 5-color the remaining graph, reintroduce $v$ (at most 4 neighbors use $\le4$ colors — one color remains). Case 2: $\deg(v)=5$ and all 5 neighbors use all 5 colors: use **Kempe chains** (connected components in $G[c_i\cup c_j]$) to swap colors and free up a color for $v$. The key lemma: the Kempe chain for colors $c_1, c_3$ through $v_1$ and the chain for $c_2, c_4$ through $v_2$ cannot both block — one swap succeeds. QED.

**Edge coloring.** A **proper edge coloring** assigns colors to edges so that no two edges sharing a vertex have the same color. The **chromatic index** $\chi'(G)$ is the minimum number of colors needed.

**Vizing's Theorem** (1964). For any simple graph $G$: $\Delta(G)\le\chi'(G)\le\Delta(G)+1$.
- **Class 1**: $\chi'=\Delta$ (e.g., $K_{2n}$, bipartite graphs — König's edge-coloring theorem).
- **Class 2**: $\chi'=\Delta+1$ (e.g., $K_{2n+1}$, Petersen graph).
- Determining whether a graph is Class 1 or Class 2 is NP-hard in general (Holyer 1981).

## Component 4 — Worked Examples

**Example 1 (LO1 — chromatic number and Brooks' theorem)**: Petersen graph ($n=10$, 3-regular, $\Delta=3$). Check for bipartiteness: Petersen has odd girth 5, so it is not bipartite → $\chi\ge3$. Does a 3-coloring exist? Yes (explicit: color the outer 5-cycle alternately with colors 1,2,1,2,3 breaking the odd cycle, then extend inward). So $\chi(\text{Petersen})=3$. Brooks' theorem: $\Delta=3$, Petersen is not $K_4$ and not $C_5$ → $\chi\le3$. Greedy bound: $\chi\le4=\Delta+1=4$. Brooks gives the tight bound: $\chi\le3$. Combined: $\chi=3$. ✓

**Example 2 (LO2 — Five Color Theorem construction)**: Graph $G$ on 6 vertices: $K_6$ minus one edge (say $\{5,6\}$ removed). $n=6$: not a small base case. Vertex 5 has degree 4, vertex 6 has degree 4; all others have degree 5. Find $v$ with $\deg\le5$: all qualify. Pick $v=5$ ($\deg=4$). Remove $v=5$; 5-color the remaining $K_5$-minus-something. In remaining graph ($G-v=$ 5 vertices), reintroduce $v=5$: its 4 neighbors use $\le4$ distinct colors; since we have 5 colors, one color is free for $v=5$. Result: valid 5-coloring. Note: $\chi(K_6)=6$ and $\chi(K_6-e)=5$, so 5 colors are needed here — the Five Color Theorem is tight for this graph.

**Example 3 (LO3 — edge coloring and Vizing)**: $K_4$ ($n=4$, $\Delta=3$). Vizing: $3\le\chi'(K_4)\le4$. $K_4$ has $n=4$ vertices (even); by König's edge-coloring theorem: bipartite graphs satisfy $\chi'=\Delta$, but $K_4$ is not bipartite. In fact $\chi'(K_4)=3$? No: $K_4$ has 6 edges, and a color class is a matching of size at most 2; 3 color classes cover at most 6 edges. With $\Delta=3$, try: one color class $\{12,34\}$, second $\{13,24\}$, third $\{14,23\}$ — three color classes, each a perfect matching. $\chi'(K_4)=3=\Delta$: Class 1. Contrast: $K_3$ ($\Delta=2$, 3 edges): matchings have size $\le1$; need 3 colors to cover 3 edges, one per edge. $\chi'(K_3)=3=\Delta+1=3$: Class 2.

## Component 5 — Teaching Actions

### Teaching Action A01 — Chromatic Number from Cliques Up (Primitive P11: Representation Shift)

Start with map-coloring intuition (four countries sharing borders). Abstract to graph. Compute $\chi$ for $K_4$, $C_5$, $K_{2,3}$, and Petersen by combining lower bounds (clique/independence) with upper bounds (greedy/Brooks). Emphasize that $\chi$ is a property of the graph's structure, not of any particular coloring.

- **MC-1 hook**: ask "If a graph has no triangle ($\omega=2$), is $\chi\le3$?" — No: Mycielski's construction produces triangle-free graphs with chromatic number arbitrarily large. The smallest example: the Grötzsch graph (11 vertices, triangle-free, $\chi=4$). Clique number gives a lower bound on $\chi$, not an equality.

### Teaching Action A02 — Five Color Theorem: Kempe Chains in Action (Primitive P25: Deductive)

Work the inductive proof step by step. When $\deg(v)=5$ and all 5 colors appear at $v$'s neighbors: draw the Kempe chain between $v_1$ (color 1) and $v_3$ (color 3) and the chain between $v_2$ (color 2) and $v_4$ (color 4). Explain: these two chains cannot BOTH pass through $v$ (since $v$ is removed and they are in $G-v$), so swapping one of them frees a color for $v$. The planarity is used to ensure the chains don't cross and interfere.

- **MC-2 hook**: ask "Why does this proof fail for 4-coloring (the Four Color Theorem)?" — The analogous Kempe-chain argument for 4 colors was attempted by Kempe in 1879 but contains an error (Heawood 1890 found the gap): in the 4-color version, two Kempe chains CAN be entangled in a planar graph, and swapping one chain may require verifying the other is not broken — this verification requires the full planarity machinery used in the computer-assisted proof.

### Teaching Action A03 — Vizing's Theorem and Class 1 vs. Class 2 (Primitive P16: Counterexample)

State Vizing's theorem. Show Class 1 example ($K_4$) and Class 2 example ($K_3$). Then ask: "Can we always quickly determine which class a graph is in?" — No: Holyer (1981) proved this is NP-hard. So even though we know $\chi'\in\{\Delta, \Delta+1\}$, deciding which value it is is computationally intractable. Contrast with the vertex-coloring NP-hardness: determining $\chi(G)$ exactly is also NP-hard, but even APPROXIMATING it is hard.

- **MC-3 hook**: ask "Does Vizing's theorem apply to multigraphs?" — No: Vizing's theorem holds for SIMPLE graphs only. For multigraphs with maximum edge multiplicity $\mu$, Shannon's theorem gives $\chi'\le\lfloor3\Delta/2\rfloor$ as the upper bound, not $\Delta+1$.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\chi(G)$ for the **wheel graph** $W_5$ (a central vertex connected to all 5 vertices of $C_5$). First give lower and upper bounds, then exhibit an optimal coloring.
  2. Brooks' theorem says $\chi(G)\le\Delta(G)$ unless $G$ is $K_n$ or an odd cycle. Give two explicit exceptions: (a) a complete graph where $\chi=\Delta+1$, and (b) an odd cycle where $\chi=3=\Delta+1$. Verify in each case.
  3. Apply the Five Color Theorem proof to the following planar graph ($n=6$, add edges $\{v,1\},\{v,2\},\{v,3\},\{v,4\},\{v,5\}$ to form $K_{1,5}$): identify a vertex of degree $\le5$, remove it, 5-color the remaining graph, and reintroduce the vertex.
  4. Determine whether the **Petersen graph** is Class 1 or Class 2 for edge coloring. (Recall: Petersen is 3-regular; use the fact that Petersen has no perfect matching to argue $\chi'>3$.)
- **P76 (Transfer Probe, mode = independence)**: "A **$k$-critical graph** is a graph with $\chi(G)=k$ but $\chi(G-e)<k$ for every edge $e$ (removing any edge decreases the chromatic number). (a) Show that every odd cycle $C_{2k+1}$ is 3-critical: $\chi(C_{2k+1})=3$ and $\chi(C_{2k+1}-e)=2$ for any edge $e$ (i.e., removing any edge gives a path, which is bipartite). (b) Prove that a $k$-critical graph must have minimum degree $\delta(G)\ge k-1$ (hint: if $\delta(G)\le k-2$, remove the lowest-degree vertex $v$; the remaining graph has a $(k-1)$-coloring by criticality; reintroduce $v$ — it has $\le k-2$ neighbors, so a $(k-1)$-coloring exists, contradicting $\chi(G)=k$). (c) Use (b) to prove that a $k$-critical graph on $n$ vertices has at least $n(k-1)/2$ edges."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Graph Coloring — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHROMATIC-NUMBER-EQUALS-CLIQUE-NUMBER | Believing $\chi(G)=\omega(G)$ always — the clique number gives a LOWER BOUND ($\chi\ge\omega$) but not an equality; triangle-free graphs (Mycielski construction) can have arbitrarily large chromatic number while $\omega=2$ | Critical |
| MC-2 | FIVE-COLOR-PROOF-EXTENDS-TO-FOUR | Believing the Kempe-chain argument used in the Five Color Theorem can be extended to prove the Four Color Theorem — Kempe's original 1879 attempt to prove the Four Color Theorem using this exact idea was shown by Heawood (1890) to contain an error; the Four Color Theorem required a fundamentally different (computer-assisted) proof | Foundational |
| MC-3 | VIZING-HOLDS-FOR-MULTIGRAPHS | Applying Vizing's theorem ($\chi'\le\Delta+1$) to multigraphs — Vizing's theorem holds only for SIMPLE graphs (no parallel edges, no self-loops); for multigraphs with maximum multiplicity $\mu$, the correct upper bound is Shannon's $\lfloor3\Delta/2\rfloor$, which can be much larger than $\Delta+1$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Clique Number Is a Lower Bound, Not Equal to the Chromatic Number") → P41 (detect: present the Mycielski graph $M_4$ (the Mycielskian of $C_5$): it is triangle-free ($\omega=2$) but 4-chromatic — ask what the chromatic number is and whether $\omega=4$) → P64 (conceptual shift: the clique number measures the densest complete subgraph; the chromatic number measures the minimum number of independent sets needed to partition the vertex set; these are related by $\chi\ge\omega$ but can differ arbitrarily in triangle-free graphs; perfect graphs (where $\chi=\omega$, including all bipartite, chordal, and comparability graphs) are the special class where equality holds — not the general case).
- **B02 (targets MC-2)**: P27 (name it: "The Kempe-Chain Argument Does Not Extend to Four Colors") → P41 (detect: in the 5-color proof, the Kempe chain for colors 1 and 3 starting from $v_1$ and the chain for colors 2 and 4 starting from $v_2$ cannot cross in a planar graph (no non-crossing paths connecting them); ask what happens in the 4-color version when we try to avoid using two specific colors at once) → P64 (conceptual shift: with only 4 colors, the chains can become tangled — swapping the 1-3 chain from $v_1$ may break the attempted 2-4 swap for $v_2$; Heawood exhibited a specific planar graph where this exact issue arises; the correct 4-color proof requires verifying that none of the 633 reducible configurations (RSST proof) lead to this entanglement — a task requiring systematic case analysis, not a simple chain swap).
- **B03 (targets MC-3)**: P27 (name it: "Vizing's Theorem Requires Simple Graphs") → P41 (detect: ask for the chromatic index of the multigraph $G$ consisting of two vertices with 3 parallel edges — $\Delta=3$, Vizing would bound $\chi'\le4$; actual $\chi'=3$ (each of 3 color classes can take one of the 3 parallel edges) — consistent with Vizing here; now try 4 parallel edges between two vertices: $\Delta=4$, each color class takes one edge, $\chi'=4=\Delta$; but with a loop added, everything breaks) → P64 (conceptual shift: for a multigraph with maximum edge multiplicity $\mu$, Shannon's theorem gives $\chi'\le\lfloor3\Delta/2\rfloor$, which for large $\mu$ ($\mu\approx\Delta$) gives roughly $3\Delta/2\gg\Delta+1$; Vizing's proof uses a structure (augmenting-path recoloring argument) that breaks when parallel edges allow different recoloring interference; always verify simple-graph assumption before applying Vizing).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph-coloring` (basic vertex coloring, map-coloring motivation, chromatic number concept).
- **Unlocks**: none listed in the KG.
- **Cross-link**: `math.disc.graph-coloring` — MISSING on disk (verified) → P76 uses independence mode.

## Component 8 — Teaching Notes

- The chromatic number vs. clique number distinction (MC-1) is foundational for understanding why graph coloring is hard — if $\chi=\omega$, we could compute both via clique detection (NP-hard but well-understood); the gap between $\chi$ and $\omega$ is precisely what makes coloring's computational difficulty qualitatively different.
- The Five Color Theorem proof is one of the most beautiful constructive inductive proofs in combinatorics and should be worked in full detail; it gives students a complete, human-checkable argument in contrast to the Four Color Theorem's computer-assisted proof (a philosophically interesting contrast worth raising explicitly).
- Vizing's theorem and the Class 1/2 distinction are excellent examples of "tight" theorems: the gap between $\Delta$ and $\Delta+1$ is small but algorithmically significant. The fact that this gap is NP-hard to close (Holyer) should be juxtaposed with the polynomial solvability of bipartite edge-coloring (König).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.graph-coloring`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.graph-coloring` MISSING → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS (MAMR = 4/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert, formal chromatic theory with structural theorems and NP-hardness arguments) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires computing $\chi$ with explicit bounds proof, applying Five Color Theorem constructively, proving Brooks exception cases, and determining edge-coloring class via structural argument — not listing theorem names | PASS |

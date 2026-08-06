# Blueprint: math.disc.graph-coloring

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.graph-coloring |
| name | Graph Coloring |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 4 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.disc.graph |
| Cross-links | math.graph.graph-coloring |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines proper vertex coloring and the chromatic number χ(G); applies the greedy coloring algorithm and identifies that greedy gives an upper bound ≤ Δ(G)+1 (maximum degree plus one); states Brooks' theorem (χ(G) ≤ Δ(G) unless G is a complete graph or odd cycle); recognises that χ(Kₙ)=n, χ(bipartite)≤2 (bipartite iff 2-colorable), χ(odd cycle)=3, χ(even cycle)=2; states the Four Color Theorem (every planar graph is 4-colorable); computes the chromatic polynomial P(G,k) for trees and small graphs; and distinguishes vertex, edge, and list colorings.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 5-cycle C₅ and attempt to color it with 2 colors: start vertex 1 gets color A, alternating gives vertices 1,3 color A and 2,4 color B, but vertex 5 is adjacent to both vertex 4 (color B) and vertex 1 (color A), forcing a third color; annotate "χ(C₅)=3 — odd cycles need 3 colors"; then draw K₄ and observe each new vertex sees all existing colors → χ(K₄)=4; annotate: "χ(G)=k means k colors suffice and k−1 do not")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CHROMATIC-NUMBER-EQUALS-GREEDY-COLORS | Student believes the number of colors produced by the greedy algorithm equals χ(G); applies greedy and reports that number as the exact chromatic number without verifying it's a lower bound too; misses that greedy is order-dependent and may use more colors than necessary | Type 5 — instruction-induced (greedy coloring is the first algorithm taught; it always produces a valid coloring; students conflate "a valid coloring" with "the minimum coloring"; the gap: greedy gives χ(G) ≤ greedy-count ≤ Δ+1, not χ(G) = greedy-count — the lower bound proof needs a different argument, e.g. clique number ω(G) ≤ χ(G)) |
| MC-2 | FOUR-COLOR-THEOREM-IS-OBVIOUS | Student treats the Four Color Theorem as trivially obvious ("just use four colors") without grasping that it is one of the deepest results in combinatorics and that no short human-verifiable proof exists; or conversely, tries to prove it by hand in a few lines | Type 1 — overgeneralisation (students are told "every planar graph needs ≤4 colors" and think "I can see why"; in fact the proof requires checking 1,936 configurations by computer and is the first major theorem proved this way; the real difficulty is lower-bounding — proving some planar graph needs exactly 4 — not upper-bounding) |
| MC-3 | CHROMATIC-POLYNOMIAL-IS-CHROMATIC-NUMBER | Student confuses P(G,k) (the number of proper colorings using AT MOST k colors, a polynomial in k) with χ(G) (the minimum k for which P(G,k)>0); says "the chromatic polynomial is 3" when they mean χ(G)=3; or tries to substitute k=1 into P(G,k) to find the chromatic number | Type 4 — notation-induced (P(G,k) and χ(G) use the same variable k; the polynomial P evaluates to a number for each specific k; the chromatic number χ(G) is the smallest k where P(G,k)>0, which students must find by solving P(G,k)=0, not by substituting a value they already know) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Proper coloring, chromatic number, and basic bounds:**

**Definition:** A proper vertex coloring of G assigns a color to each vertex so that no two adjacent vertices share a color. The chromatic number χ(G) is the minimum number of colors needed.

**Lower bounds on χ(G):**
- Clique lower bound: χ(G) ≥ ω(G) (clique number — maximum complete subgraph size). (A k-clique needs k distinct colors.)
- Odd cycle: χ(odd cycle) = 3 (bipartiteness breaks down).

**Upper bounds on χ(G):**
- Greedy upper bound: χ(G) ≤ Δ(G)+1 (order vertices arbitrarily; each vertex has at most Δ(G) neighbors already colored → at most Δ(G) forbidden colors → one of Δ(G)+1 colors is always available).
- **Brooks' theorem:** For a connected graph G that is NOT a complete graph Kₙ and NOT an odd cycle, χ(G) ≤ Δ(G). (The maximum-degree bound can be tightened by 1 for "generic" graphs.)

**Key chromatic numbers:**
- Trees and forests: χ = 2 (bipartite).
- Bipartite graphs: χ = 2 iff no odd cycle.
- Complete graph Kₙ: χ = n.
- Cycle Cₙ: χ = 2 if n even; 3 if n odd.
- Petersen graph: χ = 3.
- Planar graphs: χ ≤ 4 (Four Color Theorem, 1976, Appel–Haken; computer-assisted).

**Greedy algorithm:** Order vertices v₁,…,vₙ; assign to vᵢ the smallest color not used by already-colored neighbors. Number of colors used ≤ Δ(G)+1.

**P49 checkpoint:**
- CORRECT → "χ(G)=min colors needed. Greedy ≤ Δ+1 (upper bound). Brooks: ≤ Δ for non-Kₙ non-odd-cycle. Lower bound: χ≥ω. Bipartite↔χ≤2. Four Color: planar→χ≤4." → A02
- PARTIAL (MC-1: greedy = chromatic number) → "Greedy gives A valid coloring but NOT necessarily the MINIMUM. Counter-example: for a path P₃ (1−2−3), the greedy with ordering 1,3,2 might give colors A,A,B (2 colors=χ(P₃)=2, fine). But for C₅ ordered 1,2,3,4,5: colors A,B,A,B,A — vertex 5 is adjacent to 4 (B) and 1 (A), forcing a third color C → greedy gives 3 = χ(C₅). For a different graph, greedy might give more: a 5-vertex graph where greedy gives 4 but χ=3. To PROVE χ(G)=k you need: (1) exhibit a valid k-coloring [upper bound], (2) prove no (k−1)-coloring exists [lower bound — usually via a k-clique or odd-cycle argument]." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "K₄ coloring: vertex 1 gets A; vertex 2 (adj to 1) gets B; vertex 3 (adj to 1,2) gets C; vertex 4 (adj to 1,2,3) gets D. 4 colors needed. Is χ(K₄)=4? Lower bound: K₄ is itself a 4-clique → ω(K₄)=4 → χ≥4. Upper bound: 4-coloring just exhibited. → χ(K₄)=4. ✓" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Chromatic polynomial, edge coloring, and list coloring:**

**Chromatic polynomial P(G,k):** the number of proper colorings of G using colors from a palette of k colors.

**Deletion-contraction formula:** P(G,k) = P(G−e,k) − P(G/e,k) for any edge e, where G/e is G with edge e contracted.

**Examples:**
- Tree on n vertices: P(Tₙ,k) = k(k−1)ⁿ⁻¹.
- Cycle Cₙ: P(Cₙ,k) = (k−1)ⁿ + (−1)ⁿ(k−1).
- P(K₃,k) = k(k−1)(k−2).
- Finding χ: χ(G) = smallest positive integer k with P(G,k) > 0.

**Edge coloring:** assign colors to EDGES so adjacent edges (sharing a vertex) get different colors. The chromatic index χ'(G) is the minimum edge colors needed. Vizing's theorem: χ'(G) ∈ {Δ(G), Δ(G)+1} for simple graphs.

**List coloring:** each vertex v has its own list L(v) of allowed colors; choose a proper coloring where each vertex uses a color from its list. The list chromatic number (choosability) χₗ(G) ≥ χ(G), and equality need not hold.

**Applications:** register allocation in compilers, scheduling, map coloring, frequency assignment in wireless networks.

**P49 checkpoint:**
- CORRECT → "P(G,k): deletion-contraction, P(Tₙ,k)=k(k−1)ⁿ⁻¹. Vizing: χ'∈{Δ,Δ+1}. List coloring: χₗ≥χ. Four Color Theorem: χ≤4 for planar graphs." → Gate (P91)
- PARTIAL (MC-3: polynomial confused with chromatic number) → "P(G,k) is a POLYNOMIAL in k — it gives the COUNT of valid k-colorings for each specific k value. The chromatic number χ(G) is a single INTEGER — the smallest k for which P(G,k)>0. For K₃: P(K₃,k)=k(k−1)(k−2). At k=1: P=0 (can't color triangle with 1 color). At k=2: P=0 (can't color triangle with 2 colors). At k=3: P=6 (6 ways to 3-color K₃). So χ(K₃)=3. The chromatic polynomial is a FUNCTION, the chromatic number is its smallest positive root." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "P(C₄,k): C₄ is 4-cycle. P(C₄,k)=(k−1)⁴+(−1)⁴(k−1)=(k−1)⁴+(k−1)=(k−1)[(k−1)³+1]. At k=2: (1)(2)=2 (two 2-colorings of a 4-cycle: ABAB and BABA). χ(C₄)=2 (even cycle). At k=1: (0)(1)=0 ✓." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "The two-part proof of χ(G)=k: (UPPER bound) exhibit an explicit k-coloring using k colors — this shows χ(G)≤k. (LOWER bound) argue no coloring with fewer than k colors can work — the standard tools are: (a) find a k-clique (ω(G)≥k → χ≥k); (b) find an odd cycle in a subgraph that forces 3 colors; (c) derive a contradiction by assuming k−1 colors and showing a vertex must share a color with a neighbor. Both parts together give χ(G)=k exactly."
Step 2 — "The Four Color Theorem: the upper bound (planar→χ≤4) was conjectured in 1852, resisted human proof for 124 years, and was finally settled in 1976 by Appel and Haken using 1,200 hours of computer time to check 1,936 reducible configurations. No human-verifiable proof exists today. The lower bound (some planar graph needs 4 colors) is trivial: K₄ is planar (draw 3 on a triangle, 1 in the middle) and χ(K₄)=4. So the hard part of the Four Color Theorem is entirely in the UPPER bound direction."
Step 3 — "Greedy versus optimal: the greedy algorithm's output depends on the vertex ordering. For the graph C₅: orderings that give the optimal 3 colors exist, but orderings that also give 3 exist (it's already minimum). For a graph where greedy over-counts: the crown graph (bipartite, Δ=n/2) — greedy in a bad ordering uses n/2 colors, but χ=2. To find χ(G) exactly: use greedy for an upper bound, clique/odd-cycle argument for a lower bound; if they match, you're done."

**TB-R02 (MC-3 POLYNOMIAL VS. NUMBER):**
Step 1 — "Systematic reading of P(G,k): P(G,k) is a polynomial function of k. Evaluate it at small positive integers: P(G,1), P(G,2), P(G,3), … The first k at which P(G,k)>0 is χ(G). All earlier values P(G,1)=0, …, P(G,χ−1)=0. Example: P(C₃,k)=k(k−1)(k−2). Roots are k=0,1,2. Smallest positive k with P>0: k=3. So χ(C₃)=3."
Step 2 — "Deletion-contraction worked example: compute P(P₃,k) where P₃ is a path 1−2−3. Delete edge {2,3}: get P₂ union isolated vertex 3, P=k²(k−1). Contract edge {2,3}: merge vertices 2 and 3 into one vertex adjacent to 1, giving P₂ with P=k(k−1). So P(P₃,k)=k²(k−1)−k(k−1)=k(k−1)(k−1)=k(k−1)². Verify: at k=2, P=2·1·1=2 (two 2-colorings: AB-A-B and BA-B-A). ✓"
Step 3 — "Coefficients of P(G,k): the chromatic polynomial of any graph on n vertices has leading term kⁿ, alternating-sign coefficients, zero constant term (P(G,0)=0 always — can't color with 0 colors). The coefficient of k^{n−1} is −|E| (negative of the number of edges). These structural facts let you partially read the graph from the polynomial."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Compute χ(G) for each: (a) K₅; (b) K_{3,3} (complete bipartite); (c) C₇; (d) the Petersen graph (χ=3, prove it: exhibit a 3-coloring and show 2 is impossible since the graph contains an odd cycle). State the clique lower bound and an explicit coloring for each.
2. Compute P(G,k) using deletion-contraction for the diamond graph (K₄ minus one edge). Find χ from the polynomial by identifying its smallest positive root.
3. Brooks' theorem application: determine which connected graphs on 6 vertices with maximum degree 3 satisfy χ=3 vs χ=2. Identify the condition that lets you improve the Δ+1=4 bound to the Brooks bound of Δ=3 vs. the tighter χ=2 (bipartite) case.
4. A compiler must assign registers to 5 variables; each pair that is simultaneously live must get different registers. The interference graph has edges: {a,b},{a,c},{b,c},{c,d},{d,e},{a,e}. Find χ of this interference graph — that is the minimum number of registers needed.
5. Edge coloring: prove that K_{2n} (complete graph on an even number of vertices) has chromatic index χ'=2n−1. (Hint: exhibit a 1-factorization — a partition of the edges into perfect matchings.)

**P55 — Reflect & Consolidate:** "χ(G)=min colors. Upper bounds: greedy≤Δ+1, Brooks≤Δ (non-Kₙ, non-odd-cycle), Four Color≤4 for planar. Lower bounds: χ≥ω (clique), χ≥3 for odd cycles. P(G,k) counts k-colorings; χ=smallest positive root. Edge coloring: Vizing χ'∈{Δ,Δ+1}. Applications: register allocation, scheduling, frequency assignment."

**P76 — Transfer Probe (Cross-link mode: math.graph.graph-coloring):**
(a) Graph coloring and scheduling: given n courses and m pairs of courses that share students (cannot be scheduled simultaneously), model as a graph coloring problem and show the minimum number of time slots equals χ. If the conflict graph is interval-representable (an interval graph), show χ equals the maximum clique size (interval graphs are perfect graphs). (b) Perfect graphs: the Perfect Graph Theorem (Chudnovsky et al., 2006) states that a graph is perfect (χ(H)=ω(H) for every induced subgraph H) iff it contains no odd hole (induced odd cycle ≥5) and no odd antihole (complement of an odd cycle ≥5). Verify that bipartite graphs and chordal graphs are perfect, and that C₅ is not. (c) Fractional coloring: the fractional chromatic number χ_f(G) = inf{k/r : G is (k,r)-colorable}, where (k,r)-colorable means each vertex gets a set of r colors from {1,…,k} with adjacent vertices getting disjoint sets. Show χ_f(G) ≤ χ(G) and χ_f(C₅)=5/2 (fractional chromatic number of an odd cycle Cₙ is n/⌊n/2⌋).

**P75 — Mastery Assessment:**
"(a) A map of 5 countries requires coloring so that adjacent countries get different colors. Model the dual graph (countries = vertices, shared border = edge). If country 3 is adjacent to all others, what can you immediately conclude about χ? Find χ of the specific graph K₁+C₄ (vertex v adjacent to all of C₄). (b) Compute P(C₄,k) using deletion-contraction and verify that χ(C₄)=2. (c) State and apply Brooks' theorem to the Petersen graph (Δ=3). Does Brooks' bound equal χ? (d) A frequency assignment problem requires assigning one of k radio frequencies to each of 6 transmitters so that transmitters within 50km of each other use different frequencies. The conflict graph is: 1-2, 1-3, 2-4, 3-4, 3-5, 4-6, 5-6. Find χ and exhibit an optimal coloring."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the two-part χ-proof structure and the deletion-contraction formula
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.graph; reassign

**P78 — Completion:** Graph Coloring certified. Student defines proper coloring and chromatic number; proves χ bounds using clique lower bounds, greedy and Brooks upper bounds; states the Four Color Theorem; computes chromatic polynomials via deletion-contraction; states Vizing's theorem for edge coloring; and applies graph coloring to scheduling and register-allocation problems.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.graph.graph-coloring])
Target: Graph coloring in scheduling/interval graphs; perfect graph theorem; fractional chromatic number
Skill tested: Connect discrete chromatic theory to computational scheduling, perfect-graph structure, and fractional relaxations of the coloring problem

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

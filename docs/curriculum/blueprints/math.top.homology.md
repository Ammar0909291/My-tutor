# Teaching Blueprint: Homology (`math.top.homology`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.homology` |
| name | Homology |
| domain | Topology |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 10 |
| requires | `math.top.simplicial-complex`, `math.abst.group-theory` |
| unlocks | `math.top.euler-characteristic` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with the filled/hollow triangle contrast before the general chain-complex machinery |
| description (KG) | Assigns abelian groups Hₙ(X) (n-th homology groups) to topological spaces. H₀: connected components; H₁: loops not bounding discs; H₂: 2D holes. Functorial and homotopy invariant. Computable via simplicial/CW chain complexes. |

## Component 1 — Learning Objectives

- LO1: Define $H_0(X)$ as counting the **connected components** of $X$ (NOT its vertex count, edge count, or any other simplex count), and compute it directly for a concrete disconnected simplicial complex.
- LO2: Define $H_1(X)$ as detecting **loops that do not bound a disc** — using the cycle/boundary quotient structure — and correctly distinguish a loop that DOES bound a 2-simplex (contributing the zero class) from a loop that does NOT (contributing a genuinely nontrivial class), via a direct filled-vs-hollow triangle contrast.
- LO3 *(orientation-level, given the research-level scope of this concept)*: Recognize that homology is **functorial** and a **homotopy invariant** — spaces with DIFFERENT homology groups cannot be homotopy equivalent (hence not homeomorphic) — while correctly recognizing this is only a ONE-DIRECTIONAL guarantee: spaces with IDENTICAL homology groups are not thereby guaranteed to be homeomorphic.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.simplicial-complex` (simplices, face-closure, and the filled-vs-hollow triangle triangulation example already used there) and `math.abst.group-theory` (abelian groups; verifying group-theoretic structure directly).

## Component 3 — Core Explanation

**$H_0(X)$ counts connected components, nothing else**: the 0-th homology group $H_0(X)$ is a free abelian group whose RANK equals the number of connected components of $X$ — one $\mathbb{Z}$ summand per component. It is not a count of vertices, edges, or any other raw simplex tally; it specifically measures connectivity.

**$H_1(X)$ measures loops that fail to bound a 2-dimensional patch**: built from the chain complex of a simplicial complex, $H_1(X)$ is the quotient $Z_1/B_1$ of 1-CYCLES (closed loops of edges, with zero net boundary) by 1-BOUNDARIES (loops that are themselves the boundary of some 2-simplex already present in the complex). A loop that bounds a 2-simplex in the complex represents the ZERO class (it's "filled in," hence trivial); a loop that does NOT bound anything present in the complex represents a genuinely nontrivial class — $H_1$ specifically detects THIS kind of unfilled loop, i.e., a 1-dimensional "hole."

**Homology is a homotopy invariant, but a one-directional tool**: homology groups are FUNCTORIAL (continuous maps between spaces induce well-defined maps between their homology groups) and invariant under HOMOTOPY EQUIVALENCE (spaces that can be continuously deformed into each other have identical homology groups, at every dimension $n$). This makes homology extremely useful for PROVING two spaces are NOT homotopy equivalent (hence not homeomorphic): if their homology groups differ at any dimension, they cannot be equivalent. But the converse does not hold — two spaces can share identical homology groups at every dimension and still fail to be homeomorphic (homology is a coarser invariant than homeomorphism type).

## Component 4 — Worked Examples

**Example 1 ($H_0$ — connected components, not simplex counts, breaking MC-1)**: Consider a simplicial complex consisting of two disjoint filled triangles: Triangle 1 (vertices $A,B,C$, its 3 edges, and the 2-simplex $\{A,B,C\}$) and Triangle 2 (vertices $D,E,F$, its 3 edges, and the 2-simplex $\{D,E,F\}$), with NO shared vertices or edges connecting them. This complex has 6 vertices and 6 edges total — but $H_0(X)\cong\mathbb{Z}^2$, rank exactly $2$, because there are exactly 2 connected components (no path of edges connects $\{A,B,C\}$ to $\{D,E,F\}$). Counting vertices (6) or edges (6) would give the wrong answer if mistaken for $H_0$'s rank; only counting connected components (2) gives the correct one.

**Example 2 ($H_1$ — a loop bounding a disc vs. one that doesn't, breaking MC-2)**: (a) The FILLED triangle (vertices $A,B,C$, edges $\{A,B\},\{B,C\},\{C,A\}$, AND the 2-simplex $\{A,B,C\}$ — exactly `math.top.simplicial-complex`'s own Example 1) — the loop $A\to B\to C\to A$ bounds the filled-in 2-simplex, so it represents the ZERO class: $H_1=0$. (b) The HOLLOW triangle (the SAME 3 vertices and 3 edges, but WITHOUT the 2-simplex $\{A,B,C\}$ — just the "wire outline" of a triangle) — the identical loop $A\to B\to C\to A$ does NOT bound any 2-simplex in this complex (there is none), so it represents a genuinely NONTRIVIAL class: $H_1\cong\mathbb{Z}$, detecting exactly the hole where the missing 2-simplex would have been. Two complexes with the same vertices and edges, differing only in whether the 2-simplex is present, have genuinely different $H_1$.

**Example 3 (orientation-level — homotopy invariance is one-directional, breaking MC-3)**: a filled 2-simplex (disc, contractible) and a single point both have IDENTICAL homology: $H_0\cong\mathbb{Z}$, $H_n=0$ for all $n\ge1$ (both are homotopy equivalent to a point). Yet they are NOT homeomorphic (different dimensions, different underlying point-set cardinalities) — identical homology did NOT certify homeomorphism. Contrast with Example 2's DIFFERENT-homology case: the filled triangle ($H_1=0$) and the hollow triangle ($H_1\cong\mathbb{Z}$) genuinely CANNOT be homotopy equivalent (hence not homeomorphic), correctly certified by their differing $H_1$ — homology works reliably to prove spaces are DIFFERENT, but never to prove they are THE SAME.

## Component 5 — Teaching Actions

### Teaching Action A01 — $H_0$'s Rank Is the Component Count, Not Any Other Tally (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: 6 vertices, 6 edges, but $H_0$ has rank exactly $2$ — matching the component count, not any raw simplex count. State: "$H_0$ answers exactly one question: how many separate pieces does the space fall into? — nothing about vertex or edge counts enters its rank."

- **MC-1 hook**: ask "does $H_0(X)$'s rank correspond to the number of vertices (or edges) in the simplicial complex?" — a "yes" answer reveals MC-1 (confusing $H_0$'s rank with a raw simplex count rather than the connected-component count).

### Teaching Action A02 — A Loop's Class Depends on Whether It Bounds a 2-Simplex (Primitive P06: Contrast Pair)

Contrast Example 2's two cases directly: the filled triangle ($H_1=0$, loop bounds the 2-simplex) against the hollow triangle ($H_1\cong\mathbb{Z}$, loop bounds nothing). State: "the SAME loop of edges can be trivial or nontrivial in $H_1$ depending entirely on whether a 2-simplex is present to fill it in — the loop itself doesn't determine its own class in isolation."

- **MC-2 hook**: ask "does every closed loop of edges in a simplicial complex automatically represent a nontrivial class in $H_1$?" — a "yes" answer reveals MC-2 (missing that a loop bounding a present 2-simplex is trivial, contributing zero to $H_1$).

### Teaching Action A03 — Different Homology Certifies Difference; Same Homology Certifies Nothing (Primitive P11: Representation Shift)

State: "if two spaces' homology groups differ, they are provably NOT homotopy equivalent — a powerful, reliable conclusion. But if their homology groups AGREE, that alone proves nothing about whether the spaces are actually the same." Work Example 3's point-vs-disc case (identical homology, not homeomorphic) alongside Example 2's genuinely-different case (different $H_1$, correctly certified as inequivalent).

- **MC-3 hook**: ask "if two spaces have identical homology groups at every dimension, does that guarantee they are homeomorphic?" — a "yes" answer reveals MC-3 (treating homology as a complete, two-directional invariant rather than a one-directional distinguishing tool).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A simplicial complex has 3 connected components. State $H_0(X)$ directly, without needing to know the vertex or edge count.
  2. A hollow square (4 vertices, 4 edges forming a loop, no 2-simplex) — state whether its boundary loop represents the zero class or a nontrivial class in $H_1$, and why.
  3. A filled square (same 4 vertices/edges, PLUS a 2-simplex, or a pair of 2-simplices via a diagonal, filling the interior) — state whether the boundary loop is now trivial or nontrivial in $H_1$, and explain what changed.
  4. Explain why "two spaces have the same $H_0$ and $H_1$" is not, by itself, enough to conclude the spaces are homeomorphic.
- **P76 (Transfer Probe, mode = independence)**: "A materials scientist models a 2D sheet with a manufacturing defect as a simplicial complex, and wants to detect whether the defect is a genuine 'hole' (missing material) versus just a surface marking. (a) Using this lesson's $H_1$ framework, explain what topological signature (in terms of loops and 2-simplices) would indicate a genuine hole versus a solid, unbroken region. (b) The scientist computes $H_1=0$ for the sheet and concludes 'this confirms the sheet is topologically identical to a solid disc, with no holes and no other distinguishing structure whatsoever.' Using this lesson's one-directional homology principle, explain what is overreaching about this conclusion, even though $H_1=0$ is correct evidence against a 1-dimensional hole specifically. (c) A colleague suggests using ONLY $H_0$ to detect the hole, arguing 'if there's a hole, the space must have multiple connected components.' Explain why this reasoning conflates $H_0$ (component count) with $H_1$ (loop/hole detection) — a hole can exist in a single connected piece."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | H0-RANK-CONFUSED-WITH-SIMPLEX-COUNT | Believing H₀'s rank corresponds to the number of vertices or edges in a simplicial complex, missing that it specifically counts connected components | Foundational |
| MC-2 | EVERY-LOOP-ASSUMED-NONTRIVIAL-IN-H1 | Believing every closed loop of edges automatically represents a nontrivial class in H₁, missing that a loop bounding a present 2-simplex is trivial (the zero class) | Foundational |
| MC-3 | IDENTICAL-HOMOLOGY-ASSUMED-TO-IMPLY-HOMEOMORPHIC | Believing identical homology groups at every dimension guarantee two spaces are homeomorphic, missing that homology is a one-directional distinguishing tool, not a complete invariant | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "H₀ Rank Confused with Simplex Count") → P41 (detect: present a complex with 6 vertices/6 edges but 2 components and ask for $H_0$'s rank, checking for "6") → P64 (conceptual shift: re-walk Example 1's two-disjoint-triangles case, re-anchoring on "H₀ counts connected components only, regardless of vertex/edge tallies").
- **B02 (targets MC-2)**: P27 (name it: "Every Loop Assumed Nontrivial in H₁") → P41 (detect: present the filled triangle's loop and ask whether it represents a nontrivial $H_1$ class, checking for "yes") → P64 (conceptual shift: re-walk Example 2's filled-vs-hollow contrast, re-anchoring on "a loop bounding a present 2-simplex is trivial — only an unfilled loop is nontrivial").
- **B03 (targets MC-3)**: P27 (name it: "Identical Homology Assumed to Imply Homeomorphic") → P41 (detect: ask a student whether identical homology groups guarantee two spaces are homeomorphic, checking for "yes") → P64 (conceptual shift: re-walk Example 3's point-vs-disc case, sharing identical homology yet not homeomorphic, re-anchoring on "different homology proves difference; same homology proves nothing").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.simplicial-complex` (the filled-vs-hollow triangle triangulation this concept's $H_1$ example directly reuses, and the face-closure structure the chain complex is built from), `math.abst.group-theory` (the abelian group structure of $H_n(X)$).
- **Unlocks**: `math.top.euler-characteristic` (the alternating sum of homology ranks, i.e. Betti numbers, computed directly from the homology groups this concept establishes).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a research/analyze tag places this among the corpus's largest concepts; per established precedent for capstone-scale concepts (`math.abst.galois-theory`, `math.calc.fourier-series-intro`), LO1 and LO2 receive full concrete worked-example depth while LO3 (functoriality/homotopy invariance) is deliberately kept at ORIENTATION level — stating the one-directional distinguishing power of homology as a landmark property rather than deriving functoriality or homotopy invariance from the chain-complex definitions in full.
- **Division of labor**: `math.top.simplicial-complex` owns face-closure and triangulation as a combinatorial model; `math.abst.group-theory` owns abelian group structure in the abstract. This concept, `math.top.homology`, deliberately does not re-derive either; it owns the ASSIGNMENT of abelian groups to spaces via the chain complex, and the crucial "connected components / unfilled loops" interpretation of $H_0,H_1$.
- Example 2 deliberately reuses `math.top.simplicial-complex`'s own filled-triangle example (rather than a new one) specifically so the SAME concrete complex, already familiar, can be directly extended into the new homological computation — and the hollow-triangle variant (identical vertices/edges, 2-simplex removed) isolates exactly what changes $H_1$ from $0$ to $\mathbb{Z}$, the cleanest possible contrast for this concept's central misconception.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: filled/hollow triangle contrast before the general chain-complex machinery) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

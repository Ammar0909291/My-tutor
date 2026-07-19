# Teaching Blueprint: Connectivity (`math.graph.connectivity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.connectivity` |
| name | Connectivity |
| domain | Graph Theory |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.disc.graph-connectivity` |
| unlocks | `math.graph.maximum-flow` |
| cross_links | `math.disc.graph-connectivity` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | C (Concrete) — comparing a star graph and a cycle graph, both "connected," before the quantitative refinement |
| description (KG) | Vertex connectivity κ(G): min vertices to remove to disconnect. Edge connectivity λ(G): min edges. κ≤λ≤δ (min degree). Menger's theorem: κ = max internally disjoint paths. Whitney's theorem unifies these via max-flow min-cut. |

## Component 1 — Learning Objectives

- LO1: Define VERTEX connectivity $\kappa(G)$ (minimum number of vertices whose removal disconnects $G$) and EDGE connectivity $\lambda(G)$ (minimum number of edges whose removal disconnects $G$) — reusing `math.disc.graph-connectivity`'s own qualitative connected/disconnected notion, now QUANTIFIED as a measure of structural robustness rather than a binary yes/no.
- LO2: Verify and apply the inequality $\kappa(G)\le\lambda(G)\le\delta(G)$ (where $\delta$ is minimum degree) for a specific graph, correctly computing all three quantities and confirming the ordering holds.
- LO3 (orientation level — full unification deferred to the unlocked child): recognize **Menger's theorem** ($\kappa(G)$ equals the maximum number of internally-disjoint paths between any two non-adjacent vertices) as a precise, checkable duality, and recognize Whitney's theorem's unification of these notions via max-flow min-cut, deferred to `math.graph.maximum-flow`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.graph-connectivity` (paths, cycles, and the binary connected/disconnected notion for undirected and directed graphs).

## Component 3 — Core Explanation

**Quantifying robustness beyond yes/no connectedness**: `math.disc.graph-connectivity` established a BINARY notion — a graph either is or isn't connected. Vertex connectivity $\kappa(G)$ (the fewest vertices whose removal disconnects $G$, or reduces it to a single vertex) and edge connectivity $\lambda(G)$ (the fewest edges whose removal disconnects $G$) refine this into a NUMBER, measuring HOW ROBUST that connection is — two graphs can both be "connected" in the binary sense while having very different $\kappa$ and $\lambda$ values.

**The inequality $\kappa(G)\le\lambda(G)\le\delta(G)$**: this ordering holds for EVERY graph, not merely a coincidental pattern for specific examples. Intuitively, removing all edges at the lowest-degree vertex (only $\delta$ of them) always disconnects that vertex from the rest, so $\lambda\le\delta$; and removing the endpoints of any minimum edge cut is at most as costly as the edge cut itself, so $\kappa\le\lambda$.

**Menger's theorem and Whitney's unification (orientation level)**: Menger's theorem states $\kappa(G)$ equals the MAXIMUM number of internally-disjoint paths (paths sharing no vertices except their two endpoints) between any two non-adjacent vertices — a precise duality between a MINIMUM (fewest vertices to remove) and a MAXIMUM (most disjoint paths available), not merely a loose correlation. Whitney's theorem further unifies vertex connectivity, edge connectivity, and path-counting through the max-flow min-cut framework, fully developed in `math.graph.maximum-flow`.

## Component 4 — Worked Examples

**Example 1 (LO1 — quantifying robustness, star vs. cycle, breaking MC-1, cross-link engaging `math.disc.graph-connectivity`)**: a "star" graph (one central vertex connected to $3$ leaves) and a $4$-cycle $A$-$B$-$C$-$D$-$A$ are BOTH connected, per `math.disc.graph-connectivity`'s own binary notion. Yet their robustness differs sharply: removing the star's single central vertex disconnects it entirely ($\kappa=1$), while removing any ONE vertex of the $4$-cycle leaves the rest still connected as a path (you must remove $2$ vertices to disconnect the cycle, so $\kappa=2$). Both graphs are "connected" in the earlier binary sense, but connectivity as a NUMBER reveals their genuinely different structural robustness.

**Example 2 (LO2 — verifying $\kappa\le\lambda\le\delta$ directly, breaking MC-2)**: for the $4$-cycle $A$-$B$-$C$-$D$-$A$: minimum degree $\delta=2$ (every vertex has exactly $2$ edges). Edge connectivity $\lambda=2$ (removing any single edge leaves a path, still connected; removing $2$ well-chosen edges, e.g. $AB$ and $CD$, disconnects it into two separate paths). Vertex connectivity $\kappa=2$ (established in Example 1). Confirming $\kappa=2\le\lambda=2\le\delta=2$ — here all three happen to be EQUAL, a valid special case of the general inequality (equality is common in highly symmetric graphs like cycles) — but the inequality itself holds for EVERY graph, not merely this one.

**Example 3 (LO3, orientation level — Menger's theorem, an exact duality)**: for the $4$-cycle, Menger's theorem states $\kappa(G)$ (found to be $2$ in Example 1) equals the MAXIMUM number of internally-disjoint paths between any two non-adjacent vertices — e.g. between $A$ and $C$: there are exactly $2$ internally-disjoint paths, $A$-$B$-$C$ and $A$-$D$-$C$ (sharing no internal vertices), matching $\kappa=2$ exactly — a genuine, checkable instance of this duality between a MINIMUM (fewest vertices to remove) and a MAXIMUM (most disjoint paths available). Whitney's theorem further unifies these ideas via max-flow min-cut, developed in `math.graph.maximum-flow`.

## Component 5 — Teaching Actions

### Teaching Action A01 — Connectivity as a Number Reveals Structural Robustness Beyond Yes/No (Primitive P11: Representation Shift)

State: "'connected' just tells you SOMETHING is connected — vertex and edge connectivity tell you HOW ROBUSTLY, and two graphs that are equally 'connected' in the binary sense can have wildly different robustness." Work Example 1's star-vs-cycle contrast, both connected but with $\kappa=1$ versus $\kappa=2$.

- **MC-1 hook**: ask "once you know a graph is 'connected' in the binary sense, does that already tell you everything meaningful about its connection structure?" — a "yes" answer reveals MC-1 (missing that connectivity as a number reveals genuinely different degrees of robustness among equally "connected" graphs).

### Teaching Action A02 — The Inequality κ≤λ≤δ Holds for Every Graph (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing $\kappa$, $\lambda$, and $\delta$ for the $4$-cycle and verifying the ordering. State: "this isn't a coincidental pattern for one graph — the inequality $\kappa\le\lambda\le\delta$ is a theorem that holds for every graph, always."

- **MC-2 hook**: ask "could $\kappa$, $\lambda$, and $\delta$ appear in any order for some graph, or is $\kappa\le\lambda\le\delta$ a general theorem?" — an "any order" answer reveals MC-2 (missing that this ordering is a general, always-true theorem, not a coincidental observation for specific graphs).

### Teaching Action A03 — Menger's Theorem Is an Exact Duality, Not a Loose Correlation (Primitive P06: Contrast Pair)

Contrast a loose intuitive statement ("more paths probably means more connected") against Example 3's exact numerical match ($\kappa=2$ EQUALS exactly $2$ disjoint paths, not merely "roughly related"). State: "this is a precise equality between a specific minimum and a specific maximum — checkable exactly, not an approximate correlation."

- **MC-3 hook**: ask "is Menger's theorem a loose intuitive statement about paths and connectivity being correlated, or a precise, checkable equality?" — a "loose statement" answer reveals MC-3 (missing that it is an exact duality, verifiable by direct computation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a "path" graph $A$-$B$-$C$-$D$ (a simple line, not a cycle), compute $\delta$ (minimum degree), and determine $\kappa$ and $\lambda$ directly (how many vertices/edges must be removed to disconnect it).
  2. Verify the inequality $\kappa\le\lambda\le\delta$ for your answer in problem 1.
  3. For the $4$-cycle example from this lesson, identify two internally-disjoint paths between vertices $B$ and $D$ (non-adjacent in the cycle), and verify their count matches $\kappa=2$.
  4. Explain why "the graph is connected" (a yes/no fact) and "the graph has vertex connectivity $3$" (a number) convey genuinely different amounts of information, using this lesson's star-vs-cycle contrast as your example.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.disc.graph-connectivity`)**: "A computer network is modeled as a graph where servers are vertices and direct connections are edges. Network engineers want to know not just whether the network is connected (using `math.disc.graph-connectivity`'s own binary definition), but how ROBUST that connection is against server or link failures. (a) Explain, using this lesson's vocabulary, what vertex connectivity $\kappa(G)$ and edge connectivity $\lambda(G)$ each tell the engineers that the binary connected/disconnected fact does not. (b) If a specific network has $\kappa=3$, explain precisely what this guarantees about how many servers could fail simultaneously before the network might become disconnected. (c) Using Menger's theorem, explain what $\kappa=3$ tells the engineers about the number of independent (internally-disjoint) communication routes available between any two non-adjacent servers, and why this might be valuable information for planning redundant infrastructure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BINARY-CONNECTEDNESS-ASSUMED-SUFFICIENT | Believing "the graph is connected" already captures everything meaningful about its connection structure, missing that connectivity as a number reveals genuinely different degrees of structural robustness | Foundational |
| MC-2 | KAPPA-LAMBDA-DELTA-INEQUALITY-ASSUMED-COINCIDENTAL | Believing $\kappa\le\lambda\le\delta$ is merely a coincidental pattern for a specific graph rather than a general theorem holding for every graph | High |
| MC-3 | MENGERS-THEOREM-ASSUMED-LOOSE-CORRELATION | Believing Menger's theorem is a loose intuitive statement about paths and connectivity, missing that it is a precise, checkable equality between a specific minimum and maximum | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Binary Connectedness Assumed Sufficient") → P41 (detect: ask whether knowing a graph is connected already tells you everything meaningful about its structure) → P64 (conceptual shift: re-walk Example 1's star-vs-cycle contrast, re-anchoring on "connectivity as a number reveals genuinely different robustness among equally connected graphs").
- **B02 (targets MC-2)**: P27 (name it: "Kappa-Lambda-Delta Inequality Assumed Coincidental") → P41 (detect: ask whether $\kappa\le\lambda\le\delta$ could fail to hold for some graph) → P64 (conceptual shift: re-walk Example 2's direct verification, re-anchoring on "this ordering is a general theorem, true for every graph").
- **B03 (targets MC-3)**: P27 (name it: "Menger's Theorem Assumed Loose Correlation") → P41 (detect: ask whether Menger's theorem is a loose statement about paths and connectivity) → P64 (conceptual shift: re-walk Example 3's exact numerical match, re-anchoring on "this is a precise, checkable equality, not an approximate correlation").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.graph-connectivity` (the binary connected/disconnected notion this concept quantifies and refines).
- **Unlocks**: `math.graph.maximum-flow` (will develop Whitney's max-flow min-cut unification previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists `math.disc.graph-connectivity`, verified authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, directly contrasting that concept's own binary connectivity vocabulary with this concept's quantitative refinement throughout Example 1 and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/analyze tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine star-vs-cycle contrast and a direct verification of the general inequality) and LO3 kept orientation-level, appropriately naming Menger's and Whitney's theorems without proving either.
- **Division of labor**: `math.disc.graph-connectivity` owns the binary connected/disconnected notion and its own established misconceptions (strong connectivity, systematic search); this concept owns the QUANTITATIVE refinement (κ, λ, and their relationship), deliberately reusing that concept's own binary vocabulary as the explicit contrast point throughout, rather than introducing the quantitative notions as an unrelated new topic.
- Example 1's star-vs-cycle pairing was chosen specifically because both graphs are unambiguously connected in the binary sense yet have maximally different vertex connectivity ($1$ vs. $2$) for graphs of comparable size — the sharpest possible illustration that "connected" alone doesn't capture structural robustness.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.graph-connectivity` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: comparing a star graph and a cycle graph, both "connected," before the quantitative refinement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

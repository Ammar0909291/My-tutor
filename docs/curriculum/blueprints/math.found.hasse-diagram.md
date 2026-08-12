# Teaching Blueprint: Hasse Diagram (`math.found.hasse-diagram`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.hasse-diagram` |
| name | Hasse Diagram |
| domain | Foundations |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 2 |
| requires | `math.found.partial-order` |
| unlocks | (none in KG) |
| cross_links | `math.graph.graph` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) |
| description (KG) | A graphical representation of a finite partially ordered set where directed edges represent immediate predecessor relationships. |
| related | `math.found.partial-order` |
| aliases | order diagram |

## Component 1 — Learning Objectives

- LO1: Draw a Hasse diagram for a given finite partially ordered set, showing ONLY immediate (covering) relationships, with higher elements drawn above lower ones and no arrowheads or self-loops.
- LO2: Read a Hasse diagram to determine whether one element is $\le$ another, by tracing upward paths (not just direct edges).
- LO3: Explain why transitive and reflexive edges are OMITTED from a Hasse diagram even though the partial order itself still holds them.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.partial-order` ($\le$, reflexive/antisymmetric/transitive) — a Hasse diagram is a visual shorthand for exactly this structure.

## Component 3 — Core Explanation

A **Hasse diagram** visually represents a finite partially ordered set by drawing each element as a point, with $a$ placed BELOW $b$ and connected by an edge only when $b$ **covers** $a$ — meaning $a<b$ and no element $c$ exists with $a<c<b$ (an immediate, no-skip relationship). Reflexive relationships ($a\le a$) and edges implied by transitivity (if $a$ covers... no, if there's a longer path $a\to c\to b$, the direct $a$-$b$ edge is omitted) are deliberately NOT drawn — they are implied by the diagram's vertical structure (upward paths) rather than drawn explicitly, keeping the picture uncluttered.

To determine "$a\le b$?" from a Hasse diagram, trace whether there is an UPWARD path (possibly through several intermediate points) from $a$ to $b$ — not merely whether a direct edge connects them.

## Component 4 — Worked Examples

**Example 1 (LO1 — drawing from a covering relation)**: For the divisibility order on $\{1,2,3,6\}$ (where $a\le b$ means $a$ divides $b$): $1$ divides everything (bottom), $2$ and $3$ each cover $1$ directly, $6$ is divisible by both $2$ and $3$ (covering each), and $1\mid 6$ but NOT drawn as a direct edge since $1<2<6$ already provides a path. The diagram: $1$ at the bottom, $2$ and $3$ side by side above it (each connected to $1$), $6$ at the top connected to both $2$ and $3$.

**Example 2 (LO2 — reading indirect order via paths, breaking MC-1)**: In Example 1's diagram, is $1\le 6$? There is no DIRECT edge between $1$ and $6$ — but there IS an upward path $1\to2\to6$ (or $1\to3\to6$), so $1\le6$ is TRUE. A student reading only direct edges would incorrectly conclude $1$ and $6$ are unrelated.

**Example 3 (LO3 — why transitive edges are omitted)**: If the diagram in Example 1 explicitly drew EVERY related pair as a direct edge, it would need an edge from $1$ to $6$ in addition to $1$-$2$, $1$-$3$, $2$-$6$, $3$-$6$ — five edges total, with the $1$-$6$ edge being entirely redundant information already recoverable from the path $1\to2\to6$. Omitting it keeps the diagram minimal without losing any information, since transitivity guarantees the omitted relationship is still implied.

## Component 5 — Teaching Actions

### Teaching Action A01 — Draw Only Covering (Immediate) Relationships (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly checking each candidate edge against the covering definition ("is there anything strictly between them?") before drawing it, and explicitly REJECTING the redundant $1$-$6$ edge with the reasoning from Example 3.

- **MC-1 hook**: present the completed diagram from Example 1 (no direct $1$-$6$ edge) and ask "is $1\le6$?" (revealing MC-1: reading order relationships only from direct edges, missing that upward PATHS also establish the relation).

### Teaching Action A02 — Trace Upward Paths, Not Just Direct Edges (Primitive P06: Contrast Pair)

Contrast reading "$1\le2$" (a direct edge, immediately visible) against reading "$1\le6$" (requires tracing a two-step path through 2 or 3) side by side. State the rule: "$a\le b$ in a Hasse diagram whenever there is SOME upward path from $a$ to $b$, of any length — not only when a single direct edge connects them."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Draw the Hasse diagram for the divisibility order on $\{1,2,4,8\}$.
  2. Draw the Hasse diagram for the subset order ($\subseteq$) on the power set of $\{a,b\}$: $\{\emptyset,\{a\},\{b\},\{a,b\}\}$.
  3. Given a Hasse diagram for the divisibility order on $\{1,2,3,4,6,12\}$, determine whether $2\le12$ by tracing a path (not requiring a direct edge).
  4. Explain why a Hasse diagram for the divisibility order on $\{1,2,3,4,6,12\}$ would NOT include a direct edge between 1 and 12, even though $1$ divides $12$.
- **P76 (Transfer Probe, mode = independence)**: "A company's organizational reporting structure has a 'reports to' relationship: Analyst reports to Manager, Manager reports to Director, Director reports to VP. (a) Draw (describe in words if needed) a Hasse-diagram-style picture of this hierarchy, connecting only DIRECT (immediate) reporting relationships. (b) Using the diagram, determine whether Analyst 'reports up to' VP (even indirectly, through the chain), and explain why no direct Analyst-VP edge is needed to establish this, connecting your reasoning to the path-tracing rule from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ORDER-RELATION-READ-ONLY-FROM-DIRECT-EDGES | Determining $a\le b$ only by checking for a direct edge, missing indirect relationships established via a longer upward path | Foundational |
| MC-2 | NON-COVERING-EDGE-DRAWN-REDUNDANTLY | Drawing a direct edge for a relationship already implied by a shorter path (e.g. drawing $1$-$6$ in addition to $1$-$2$-$6$), missing that only COVERING relationships should be drawn | Moderate |
| MC-3 | INCOMPARABLE-ELEMENTS-ASSUMED-RELATED | Assuming any two elements in the diagram must be comparable (one $\le$ the other), missing that a PARTIAL order permits pairs with no path connecting them either way | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Order Relation Read Only from Direct Edges") → P41 (detect: present Example 2's task and check whether the student searches for a direct edge only) → P64 (conceptual shift: re-walk Example 2, explicitly tracing the two-step path).
- **B02 (targets MC-2)**: P27 ("Non-Covering Edge Drawn Redundantly") → P41 (detect: review a submitted diagram for a redundant direct edge already implied by a shorter path) → P64 (conceptual shift: re-walk Example 3's minimality argument, removing the redundant edge).
- **B03 (targets MC-3)**: P27 ("Incomparable Elements Assumed Related") → P41 (detect: present two elements in a partial order with no path either direction — e.g. 2 and 3 in Example 1's diagram — and ask if one is $\le$ the other) → P64 (conceptual shift: confirm 2 and 3 are genuinely INCOMPARABLE under divisibility, since neither divides the other, illustrating that "partial" order permits unrelated pairs).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.partial-order`.
- **Unlocks**: none recorded in the KG.
- **Cross-link**: KG lists `math.graph.graph` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.graph.graph.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision may add a genuine cross-link probe connecting Hasse diagrams' directed-edge structure directly to general graph theory once that concept is authored.

## Component 8 — Teaching Notes

- estimated_hours = 2 reflects that this concept builds a visual/drawing skill atop already-mastered order-theoretic content (`math.found.partial-order`), similar in scope to `math.found.venn-diagram`'s relationship to set operations.
- MC-1 was ranked most severe because it is the single failure mode most likely to produce an outright WRONG factual conclusion (declaring two elements incomparable or unrelated when they are, in fact, related via a longer path) rather than merely an incomplete drawing.
- MC-3 was included specifically because Hasse diagrams are the first concept in this domain wave to visually foreground the PARTIAL nature of partial orders — unlike a total order (where every pair is comparable), a Hasse diagram can and often does contain genuinely unconnected pairs, which is easy to overlook without explicit attention.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.partial-order`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.graph.graph` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Simplicial Complex (`math.top.simplicial-complex`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.simplicial-complex` |
| name | Simplicial Complex |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.top.topological-space` |
| unlocks | `math.top.homology` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a concrete triangle/square before the general combinatorial definition |
| description (KG) | A simplicial complex: a collection of simplices (points, edges, triangles, tetrahedra, …) closed under faces. Provides a combinatorial way to study topological spaces. Every compact manifold admits a triangulation. |

## Component 1 — Learning Objectives

- LO1: Define a **simplicial complex** as a collection of simplices (0-simplices = vertices, 1-simplices = edges, 2-simplices = triangles, 3-simplices = tetrahedra, …) that is **closed under faces** — every face of a simplex in the collection must ALSO be in the collection — and identify a proposed collection that violates this closure requirement.
- LO2: Recognize a simplicial complex as a **combinatorial (discrete, finite-data) model** of a topological space via **triangulation**, distinguishing the model from the space itself — the same topological space can be represented by more than one genuinely different triangulation.
- LO3: State that **every compact manifold admits a triangulation**, and recognize this guarantee's scope — it does NOT extend to every topological space; dropping the "compact" or "manifold" hypothesis removes the guarantee.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (the open-set definition of a topological space, continuity in terms of open sets).

## Component 3 — Core Explanation

**Face-closure is the defining structural requirement**: a simplicial complex is a collection of simplices — points (0-simplices), edges (1-simplices), triangles (2-simplices), tetrahedra (3-simplices), and higher-dimensional analogues — satisfying one essential rule: if a simplex belongs to the collection, then EVERY FACE of that simplex (its bounding lower-dimensional simplices — a triangle's three edges and three vertices; an edge's two endpoints) must also belong to the collection. A "collection" that includes a triangle but omits one of its edges is not a valid simplicial complex.

**A simplicial complex is a chosen combinatorial MODEL of a space, not the space's unique intrinsic structure**: while `math.top.topological-space` describes a space directly via its open sets, a simplicial complex offers an alternative, purely combinatorial (countable, finite-data) description via TRIANGULATION — decomposing the space into simplices glued along shared faces. Crucially, a single topological space can admit multiple, genuinely DIFFERENT triangulations (different numbers of vertices, edges, and faces), all validly representing the same underlying space — the triangulation is a chosen representation, not an intrinsic, unique feature of the space.

**The compact-manifold triangulation guarantee has a specific, limited scope**: the theorem "every compact manifold admits a triangulation" is a genuine, useful guarantee, but it applies specifically to spaces that are BOTH compact AND manifolds. Dropping either hypothesis — considering a non-compact space, or a non-manifold (e.g., certain pathological or infinite-dimensional) space — removes the guarantee; such spaces may or may not be triangulable, and this specific theorem says nothing about them either way.

## Component 4 — Worked Examples

**Example 1 (LO1 — face-closure, breaking MC-1)**: A filled triangle with vertices $A,B,C$. A VALID simplicial complex representing it must include: the 2-simplex $\{A,B,C\}$ itself, all three of its edges as 1-simplices ($\{A,B\},\{A,C\},\{B,C\}$), AND all three vertices as 0-simplices ($\{A\},\{B\},\{C\}$) — 7 simplices total, closed under faces. Proposing JUST the 2-simplex $\{A,B,C\}$ alone, without listing its edges and vertices as separate members of the collection, is NOT a valid simplicial complex — it violates face-closure, even though the triangle "obviously contains" those edges and vertices geometrically.

**Example 2 (LO2 — two different triangulations of the same space, breaking MC-2)**: A filled square can be triangulated in at least two genuinely different ways. Triangulation A: draw ONE diagonal, splitting the square into 2 triangles sharing one edge (5 vertices... actually 4 vertices, 5 edges, 2 faces after accounting for the shared diagonal). Triangulation B: draw BOTH diagonals, meeting at the center, splitting the square into 4 triangles sharing a common central vertex (5 vertices, 8 edges, 4 faces). Both are valid simplicial complexes (each closed under faces), and both represent the SAME topological space — the filled square — yet they have different vertex/edge/face counts. The square itself has no single "correct" triangulation; each is a valid combinatorial model of the same space.

**Example 3 (LO3 — the compact-manifold guarantee and its limited scope, breaking MC-3)**: The 2-sphere $S^2$ (a compact manifold) admits a triangulation — for instance, the surface of a regular tetrahedron (4 triangular faces, 6 edges, 4 vertices) is topologically a valid triangulation of $S^2$, confirming the theorem's guarantee for this compact manifold. By contrast, an infinite, non-compact space such as the open half-plane $\{(x,y):y>0\}$ is NOT covered by this specific theorem (it fails the compactness hypothesis) — the theorem simply makes no claim about it either way; some non-compact spaces can still be triangulated by other means, but this particular guarantee does not automatically extend to them.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Simplex Without Its Faces Is Not a Simplicial Complex (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: listing only the 2-simplex $\{A,B,C\}$ without its edges and vertices fails face-closure, even though those faces are geometrically "obviously part of" the triangle. State: "the simplicial complex is defined by which simplices are EXPLICITLY included in the collection — every face of an included simplex must be explicitly included too."

- **MC-1 hook**: ask "if a collection includes a triangle, are its edges and vertices automatically considered part of the simplicial complex even if not separately listed?" — a "yes" answer reveals MC-1 (missing that face-closure must be explicitly satisfied by the collection itself, not assumed automatically).

### Teaching Action A02 — One Space, Multiple Valid Triangulations (Primitive P06: Contrast Pair)

Contrast Example 2's two triangulations of the square (one-diagonal vs. both-diagonals) — different vertex/edge/face counts, same underlying topological space. State: "a simplicial complex is a CHOSEN combinatorial model of a space — the same space can be triangulated in genuinely different ways, none of which is the single 'true' structure."

- **MC-2 hook**: ask "does a topological space have one single, intrinsically correct triangulation, or can it have multiple genuinely different valid ones?" — a "single, correct one" answer reveals MC-2 (mistaking a simplicial complex for the space's unique intrinsic structure rather than a chosen model).

### Teaching Action A03 — The Compact-Manifold Guarantee Does Not Extend to Every Space (Primitive P11: Representation Shift)

State: "'every compact manifold admits a triangulation' is a guarantee with a specific scope — compact AND manifold. Dropping either condition means this particular theorem is simply silent, not that triangulation becomes impossible or automatic." Work Example 3's contrast between the triangulable $S^2$ (compact manifold) and the non-compact half-plane (outside this theorem's scope).

- **MC-3 hook**: ask "does the fact that every compact manifold is triangulable mean every topological space is triangulable?" — a "yes" answer reveals MC-3 (overgeneralizing the compact-manifold triangulation theorem to all topological spaces).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. List all the simplices (of every dimension) that must be included for a valid simplicial complex representing a single edge $\{A,B\}$.
  2. Propose a THIRD, different triangulation of the square from Example 2 (different from both the one-diagonal and both-diagonal versions), and state its vertex/edge/face counts.
  3. State whether the guarantee "every compact manifold admits a triangulation" applies to a closed disk (compact, but with boundary — is it a manifold with boundary, and does the theorem's scope include this case conceptually?), explaining your reasoning about the theorem's hypotheses.
  4. Explain why a collection consisting of a single 3-simplex (tetrahedron) with none of its faces listed separately fails to be a simplicial complex.
- **P76 (Transfer Probe, mode = independence)**: "A computer graphics engineer represents a 3D compact surface (a manifold, like a character model) using a mesh of triangles for rendering. (a) Using this lesson's face-closure requirement, explain what property the engineer's triangle mesh data structure must satisfy to be a valid simplicial complex, not just a loose collection of triangles. (b) The engineer later needs to represent the SAME surface at a different level of detail (fewer, larger triangles for a distant view; more, smaller triangles for a close view). Using this lesson's triangulation-is-a-model (not the space's unique structure) principle, explain why both representations can validly represent the identical surface. (c) A colleague argues 'since this surface is triangulable, surely so is the infinite flat plane it's sitting in, since a plane seems even simpler than a curved surface.' Using this lesson's compact-manifold scope discussion, explain what is missing from this argument."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SIMPLEX-FACES-ASSUMED-AUTOMATICALLY-INCLUDED | Believing a simplex's faces are automatically part of a simplicial complex without needing to be explicitly listed, missing the explicit face-closure requirement | Foundational |
| MC-2 | SIMPLICIAL-COMPLEX-AS-UNIQUE-INTRINSIC-STRUCTURE | Believing a topological space has one single, intrinsically correct triangulation, missing that a space can admit multiple genuinely different valid triangulations | Moderate |
| MC-3 | COMPACT-MANIFOLD-TRIANGULATION-OVERGENERALIZED | Believing every topological space is triangulable because compact manifolds are, missing that the theorem's guarantee is scoped specifically to compact manifolds | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Simplex Faces Assumed Automatically Included") → P41 (detect: present a collection containing only a 2-simplex and ask whether it is a valid simplicial complex, checking for "yes") → P64 (conceptual shift: re-walk Example 1's explicit 7-simplex face-closed collection, re-anchoring on "every face must be explicitly included, not assumed").
- **B02 (targets MC-2)**: P27 (name it: "Simplicial Complex as Unique Intrinsic Structure") → P41 (detect: ask a student whether a space has exactly one correct triangulation, checking for "yes") → P64 (conceptual shift: re-walk Example 2's two different valid triangulations of the same square, re-anchoring on "a triangulation is a chosen combinatorial model, not the space's unique structure").
- **B03 (targets MC-3)**: P27 (name it: "Compact-Manifold Triangulation Overgeneralized") → P41 (detect: ask a student whether every topological space is triangulable, checking for "yes") → P64 (conceptual shift: re-walk Example 3's contrast between the triangulable compact $S^2$ and the non-compact half-plane outside the theorem's scope, re-anchoring on "the guarantee is scoped to compact manifolds specifically").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (the open-set framework this concept's combinatorial alternative is contrasted against).
- **Unlocks**: `math.top.homology` (uses simplicial complexes as the standard combinatorial input for computing homology groups).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag places this at a "3 TAs + gate" tier, appropriately compact for an understand-level concept whose three learning objectives (face-closure, model-vs-space, and the scoped triangulation guarantee) are each definitional/conceptual rather than requiring extended computation.
- **Division of labor**: `math.top.topological-space` owns the open-set-based definition of a topological space; this concept, `math.top.simplicial-complex`, deliberately does not re-derive that framework, instead presenting the combinatorial ALTERNATIVE (triangulation) as a genuinely different but complementary way to study the same spaces, explicit about the model-vs-space distinction this alternative requires.
- Example 2's square triangulated two different ways was deliberately chosen as the simplest possible example demonstrating triangulation non-uniqueness (a shape simple enough to fully enumerate both triangulations explicitly, with countable vertex/edge/face totals a learner can verify directly) rather than a more complex space requiring unverifiable claims about triangulation count.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: triangle/square examples before the general combinatorial definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

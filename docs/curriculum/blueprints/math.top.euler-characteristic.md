# Teaching Blueprint: Euler Characteristic (`math.top.euler-characteristic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.euler-characteristic` |
| name | Euler Characteristic |
| domain | Topology |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.top.homology` |
| unlocks | none |
| cross_links | `math.disc.planar-graph` (blueprint NOT on disk → independence mode) |
| CPA_entry_stage | A (Abstract) — expert learner is already fluent in simplicial/singular homology; Euler characteristic is computed directly from Betti numbers or cell counts, no geometric metric needed |
| description (KG) | χ(X) = V−E+F for polyhedra (Euler's formula χ=2 for convex polyhedra). For surfaces: χ = 2−2g (orientable genus g). χ = Σ(−1)ⁿ rank(Hₙ) is a homotopy invariant. |

## Component 1 — Learning Objectives

- LO1: **Compute** $\chi(X)=V-E+F$ for polyhedra and verify Euler's formula $\chi=2$ for convex polyhedra; express $\chi$ as the **alternating sum of Betti numbers** $\chi=\sum_n(-1)^n\,\mathrm{rank}(H_n(X;\mathbb{Z}))$ and verify the two formulas agree on standard examples ($S^2$, $T^2$, $\mathbb{R}P^2$).
- LO2: **Use $\chi$ as a topological invariant** to distinguish closed surfaces: $\chi(S^2)=2$ (sphere), $\chi(T^2)=0$ (torus), $\chi(\Sigma_g)=2-2g$ (orientable genus-$g$ surface); explain why $\chi=0$ alone does NOT determine the homeomorphism type (Klein bottle and torus both have $\chi=0$ but are not homeomorphic — one is orientable, one is not).
- LO3: **Apply the classification of compact surfaces** — orientable surfaces classified by genus $g\ge0$, non-orientable surfaces by non-orientable genus $k\ge1$ with $\chi=2-k$ — to read off the topological type from $\chi$ together with an orientability flag.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.homology` (singular or simplicial homology, Betti numbers $\beta_n=\mathrm{rank}(H_n)$, the sequence of homology groups of a CW complex, the fact that Betti numbers are finite for compact spaces). The $V-E+F$ formula is introduced here as a special case of the homological formula for 2-dimensional polyhedra.

## Component 3 — Core Explanation

**Euler's formula for polyhedra.** For a convex polyhedron (combinatorial surface homeomorphic to $S^2$): $V-E+F=2$. Euler observed this empirically; the homological proof: triangulate, compute $H_0\cong\mathbb{Z}$ ($\beta_0=1$, one component), $H_1=0$ ($\beta_1=0$, simply connected), $H_2\cong\mathbb{Z}$ ($\beta_2=1$, one 2-cycle); then $\chi=\beta_0-\beta_1+\beta_2=1-0+1=2$.

**General definition.** For a space $X$ with finitely generated homology, the **Euler characteristic** is:
$$\chi(X) = \sum_{n\ge0} (-1)^n\,\mathrm{rank}(H_n(X;\mathbb{Z})) = \beta_0 - \beta_1 + \beta_2 - \cdots$$
For a CW complex with $c_n$ cells in dimension $n$: $\chi=\sum_n(-1)^n c_n$ (independently of the CW structure chosen). This is a **homotopy invariant**: if $X\simeq Y$ then $\chi(X)=\chi(Y)$.

**Euler characteristics of compact surfaces**:

| Surface | $\chi$ | $\beta_0$ | $\beta_1$ | $\beta_2$ | Notes |
|---|---|---|---|---|---|
| $S^2$ | 2 | 1 | 0 | 1 | Sphere |
| $T^2$ | 0 | 1 | 2 | 1 | Torus, genus 1 |
| $\Sigma_g$ | $2-2g$ | 1 | $2g$ | 1 | Orientable, genus $g$ |
| $\mathbb{R}P^2$ | 1 | 1 | 0 | 0 | Non-orientable, $H_2=0$ over $\mathbb{Z}$ |
| Klein bottle $K$ | 0 | 1 | 1 | 0 | Non-orientable, $\chi=0$ same as torus |

**Why $\chi$ alone doesn't classify surfaces**: The torus $T^2$ and the Klein bottle $K$ both have $\chi=0$ but are not homeomorphic — $T^2$ is orientable ($H_2\cong\mathbb{Z}$, a 2-cycle exists), while $K$ is not ($H_2=0$ over $\mathbb{Z}$, no global orientation). Classification requires $\chi$ PLUS an orientability flag.

**Classification theorem for compact surfaces** (without boundary): Every compact connected surface is homeomorphic to exactly one of: $S^2$, $\Sigma_g$ ($g\ge1$, orientable genus-$g$), or $N_k$ ($k\ge1$, connected sum of $k$ copies of $\mathbb{R}P^2$, $\chi=2-k$).

## Component 4 — Worked Examples

**Example 1 (LO1 — Euler formula for a cube)**: A cube has $V=8$, $E=12$, $F=6$. Euler formula: $\chi=8-12+6=2$. ✓ Homological check: the cube is homeomorphic to $S^2$, so $H_0\cong\mathbb{Z}$ ($\beta_0=1$), $H_1=0$ ($\beta_1=0$), $H_2\cong\mathbb{Z}$ ($\beta_2=1$); $\chi=1-0+1=2$. ✓ Both formulas agree.

**Example 2 (LO2 — torus via CW structure)**: Give the torus $T^2$ the standard CW structure: 1 zero-cell (vertex $v$), 2 one-cells (edges $a$, $b$), 1 two-cell (face $F$). Cell count: $c_0=1$, $c_1=2$, $c_2=1$. So $\chi=1-2+1=0$. Homological check: $H_0\cong\mathbb{Z}$ ($\beta_0=1$), $H_1\cong\mathbb{Z}^2$ ($\beta_1=2$, from loops $a$ and $b$), $H_2\cong\mathbb{Z}$ ($\beta_2=1$, global orientation); $\chi=1-2+1=0$. ✓ Genus formula: $\chi=2-2g\Rightarrow g=1$ (the torus is a genus-1 surface). ✓

**Example 3 (LO2–LO3 — $\chi$ does not classify: torus vs. Klein bottle)**: Klein bottle $K$: CW structure same as torus (1 vertex, 2 edges, 1 two-cell) but different attaching map. Cell count: $\chi=1-2+1=0$. Homology over $\mathbb{Z}$: $H_0\cong\mathbb{Z}$, $H_1\cong\mathbb{Z}\oplus\mathbb{Z}/2\mathbb{Z}$, $H_2=0$ (non-orientable → no integer 2-cycle). Betti numbers: $\beta_0=1$, $\beta_1=1$, $\beta_2=0$ → $\chi=1-1+0=0$. Same $\chi=0$ as $T^2$, yet $K\not\cong T^2$ (orientability differs: $T^2$ has $H_2\cong\mathbb{Z}$; $K$ has $H_2=0$). Conclusion: to distinguish $T^2$ and $K$, you must check orientability (or $H_2$), not $\chi$ alone.

## Component 5 — Teaching Actions

### Teaching Action A01 — From Polyhedra to Homology (Primitive P11: Representation Shift)

Start with Euler's formula as a numerical pattern observed for polyhedra ($V-E+F=2$ for the tetrahedron, cube, octahedron). Then lift: "what is this formula really counting?" — it is the alternating sum of cell counts, which equals the alternating sum of Betti numbers by the Euler–Poincaré formula. Work Example 1.

- **MC-1 hook**: ask "does $V-E+F=2$ hold for any polyhedron?" — No: only for simply connected polyhedra (homeomorphic to $S^2$); a torus-shaped polyhedron has $\chi=0$, demonstrating that $\chi$ depends on topology, not just the shape.

### Teaching Action A02 — Computing $\chi$ for Surfaces (Primitive P25: Deductive)

Work Example 2 (torus). Present the table of compact surfaces. Emphasize: $\chi$ is a homotopy invariant — homeomorphic spaces have the same $\chi$, and homotopy-equivalent spaces also share $\chi$ (e.g., a punctured torus has the same $\chi$ as $S^1\vee S^1$: both equal $-1$).

- **MC-2 hook**: ask "if two closed surfaces have the same $\chi$, are they homeomorphic?" — No: present Example 3, where $T^2$ and $K$ both have $\chi=0$ but differ in orientability.

### Teaching Action A03 — Classification of Compact Surfaces (Primitive P16: Counterexample)

State the classification theorem. Explain: every compact surface is classified by two pieces of information — $\chi$ and orientability. Show that $(\chi, \text{orientable})$ determines the surface completely (for orientable: $g=(2-\chi)/2$; for non-orientable: $k=2-\chi$). Work Example 3.

- **MC-3 hook**: ask "does Euler's formula $V-E+F=2$ apply to any closed surface?" — No: it only applies to surfaces homeomorphic to $S^2$; for a genus-$g$ surface, $V-E+F=2-2g$.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A surface is formed by gluing a regular octagon (8-gon) with edge identification word $abcda^{-1}b^{-1}c^{-1}d^{-1}$. Determine $V$, $E$, $F$ from the CW structure. Compute $\chi$ and identify the surface.
  2. Show that $\chi(\mathbb{R}P^2)=1$ using the CW structure: 1 zero-cell, 1 one-cell, 1 two-cell (standard structure of $\mathbb{R}P^2$). Verify that $H_2(\mathbb{R}P^2;\mathbb{Z})=0$ is consistent with the Betti-number formula.
  3. The connected sum $M_1\#M_2$ of two surfaces satisfies $\chi(M_1\#M_2)=\chi(M_1)+\chi(M_2)-2$. Use this to compute $\chi(\Sigma_g)$ for all $g\ge0$ by induction from $\chi(S^2)=2$ and $\chi(T^2)=0$.
  4. Show that no compact surface has Euler characteristic equal to 3. (Use the classification theorem: possible values are $2,1,0,-1,-2,\ldots$; explain why 3 is not achievable.)
- **P76 (Transfer Probe, mode = independence)**: "The **Lefschetz Fixed-Point Theorem** states: for a continuous map $f:X\to X$ on a compact triangulable space, if the **Lefschetz number** $L(f)=\sum_n(-1)^n\,\mathrm{tr}(f_{*n})$ (trace of the induced map on $H_n$) is non-zero, then $f$ has a fixed point. Note that $L(\mathrm{id})=\chi(X)$. (a) Use this to explain why every continuous map $f:S^2\to S^2$ with $\deg f\neq(-1)^{n+1}$ must have a fixed point (compute $L(f)=1+(-1)^2\deg f$ from $f_*$ on $H_2\cong\mathbb{Z}$). (b) Apply the theorem to the identity map on $T^2$: note $L(\mathrm{id}_{T^2})=\chi(T^2)=0$, which is consistent with the existence of fixed-point-free maps (like a translation of the torus) — explain why $L=0$ does NOT guarantee the absence of fixed points."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Euler Characteristic — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EULER-FORMULA-HOLDS-FOR-ALL-POLYHEDRA | Believing $V-E+F=2$ holds for any polyhedron regardless of topology — missing that it holds only for polyhedra homeomorphic to $S^2$; a torus-shaped polyhedron gives $V-E+F=0$ | Foundational |
| MC-2 | SAME-EULER-CHARACTERISTIC-MEANS-HOMEOMORPHIC | Believing two compact surfaces with equal $\chi$ are homeomorphic — missing orientability as the second classifying invariant: the torus ($\chi=0$, orientable) and Klein bottle ($\chi=0$, non-orientable) have the same $\chi$ but different topological type | Critical |
| MC-3 | EULER-FORMULA-V-MINUS-E-PLUS-F-UNIVERSALLY-2 | Believing the formula always gives 2 for any surface triangulation — confusing Euler's special result for $S^2$ with the general formula $\chi=V-E+F=2-2g$ for genus-$g$ orientable surfaces | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Euler's Formula $\chi=2$ Is for $S^2$-Topology Only") → P41 (detect: ask what $V-E+F$ equals for a torus triangulated with 9 vertices, 27 edges, 18 faces) → P64 (conceptual shift: compute $9-27+18=0\neq2$; $\chi$ is a topological invariant that equals the number of components minus the number of independent loops plus the number of enclosed volumes — for a surface with a hole, $\chi$ drops below 2; for a genus-$g$ surface, $\chi=2-2g$ exactly).
- **B02 (targets MC-2)**: P27 (name it: "Equal $\chi$ Does Not Imply Homeomorphic") → P41 (detect: ask whether the torus and Klein bottle are homeomorphic, given they both have $\chi=0$) → P64 (conceptual shift: compute $H_2(T^2;\mathbb{Z})\cong\mathbb{Z}$ (orientable, global 2-cycle exists) vs. $H_2(K;\mathbb{Z})=0$ (non-orientable, no integer orientation class); these homology groups are homotopy invariants that $\chi$ alone cannot distinguish because $\chi$ collapses the orientation information — need $\chi$ PLUS orientability to classify).
- **B03 (targets MC-3)**: P27 (name it: "$V-E+F$ Equals $\chi$, Not Always 2") → P41 (detect: ask what $V-E+F$ is for a genus-2 surface using a standard triangulation) → P64 (conceptual shift: apply $\chi=2-2g$ with $g=2$: $\chi=-2$; verify with a concrete triangulation of $\Sigma_2$ (e.g., 4 vertices, 12 edges, 8 faces: $4-12+8=0$... actually a triangulation of $\Sigma_2$ has at least $10$ vertices; the formula $\chi=V-E+F$ always gives the correct topological $\chi$, which is $-2$ for $\Sigma_2$, not $2$; Euler's formula $\chi=2$ is specific to $S^2$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.homology` (Betti numbers, singular/simplicial homology groups, CW complexes).
- **Unlocks**: none listed in the KG.
- **Cross-link**: `math.disc.planar-graph` listed in KG but blueprint NOT on disk → P76 uses independence mode.

## Component 8 — Teaching Notes

- Euler characteristic is the most concrete homotopy invariant a student encounters: it reduces an entire homology computation to a single integer. This concreteness is its pedagogical strength — use it to motivate abstract homology, not the other way around.
- The torus vs. Klein bottle comparison (Example 3) is the canonical "same $\chi$ but different topology" example; it should appear in every presentation of $\chi$ and is placed prominently here.
- The Lefschetz fixed-point transfer probe is advanced but appropriate: it directly extends $\chi$ from a topological invariant to a dynamical tool (fixed-point theory), and the $L=0$ caveat (non-zero $L$ guarantees fixed points, but $L=0$ guarantees nothing) is a genuine insight that reinforces the limits of numerical invariants.
- The cross-link to `math.disc.planar-graph` is in the KG (Euler's formula $V-E+F=2$ applies to planar graphs via Euler's planar formula) but the blueprint is not yet on disk, so independence mode is used here; when that blueprint is authored, revisiting P76 with a cross-link probe is recommended.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.top.homology`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.planar-graph` MISSING on disk → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS (MAMR = 4/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence — cross-link blueprint missing) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert, homological computation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2–LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate includes polygon-gluing computation, classification-theorem application, and Lefschetz fixed-point transfer — genuine analysis beyond definition recall | PASS |

# math.top.euler-characteristic

## Identity
- **KG id**: `math.top.euler-characteristic`
- **Domain**: math.top
- **Requires**: `math.top.homology`
- **Unlocks**: none
- **Cross-links**: `math.disc.planar-graph`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Compute $\chi(X)=V-E+F$ for polyhedra, recognizing Euler's $\chi=2$ holds ONLY for polyhedra
homeomorphic to $S^2$ (never for arbitrary polyhedra); express $\chi$ as the alternating sum of
Betti numbers and use it to distinguish closed surfaces, recognizing $\chi$ ALONE never
classifies a surface (orientability is a required second invariant); and apply the classification
of compact surfaces via $\chi$ plus an orientability flag.

## Core Understanding
EULER'S $\chi=2$ HOLDS ONLY FOR $S^2$-TOPOLOGY — NEVER FOR EVERY POLYHEDRON: a cube has $V=8$,
$E=12$, $F=6$, giving $\chi=8-12+6=2$ — matching the homological check ($H_0\cong\mathbb Z$,
$H_1=0$, $H_2\cong\mathbb Z$, so $\chi=1-0+1=2$). But a TORUS triangulated with, say, 9 vertices,
27 edges, 18 faces gives $\chi=9-27+18=0$, NOT 2 — because the torus is not homeomorphic to
$S^2$. Euler's famous "$\chi=2$" is specific to polyhedra homeomorphic to the SPHERE, never a
universal fact about all polyhedra.

$\chi$ ALONE NEVER CLASSIFIES A SURFACE — ORIENTABILITY IS A REQUIRED SECOND PIECE: the torus
$T^2$ (CW structure: 1 vertex, 2 edges, 1 face, $\chi=1-2+1=0$) and the Klein bottle $K$ (SAME
cell counts, different attaching map, $\chi=1-2+1=0$ via cells, or $\chi=1-1+0=0$ via Betti
numbers) have the IDENTICAL $\chi=0$ — yet $T^2\not\cong K$. The distinguishing fact: $T^2$ is
ORIENTABLE ($H_2(T^2;\mathbb Z)\cong\mathbb Z$, a genuine 2-cycle exists), while $K$ is NOT
($H_2(K;\mathbb Z)=0$, no global orientation class). $\chi$ collapses orientation information —
classification genuinely requires $\chi$ PLUS an orientability flag, never $\chi$ alone.

THE CLASSIFICATION OF COMPACT SURFACES READS OFF THE TYPE FROM $\chi$ AND ORIENTABILITY TOGETHER:
every compact connected surface (without boundary) is homeomorphic to EXACTLY ONE of: $S^2$
($\chi=2$), $\Sigma_g$ (orientable genus $g\ge1$, $\chi=2-2g$), or $N_k$ (non-orientable, $k\ge1$
copies of $\mathbb RP^2$, $\chi=2-k$). Given $\chi$ and an orientability flag, the specific surface
is DETERMINED — for orientable surfaces, $g=(2-\chi)/2$; for non-orientable, $k=2-\chi$ — but
$\chi$ by itself, without knowing orientability, leaves the surface genuinely AMBIGUOUS whenever
an orientable and non-orientable surface happen to share the same $\chi$ value.

## Mental Models
- **"χ=2 is the sphere's own special number — every other topology gets its own different χ,
  computed the same way but landing somewhere else."**
- **"χ alone is a coarse fingerprint — orientability is the second piece of information needed
  to actually identify the surface uniquely."**
- **"A surface's full identity is (χ, orientable/not) — read off genus or non-orientable genus
  directly from that pair."**

## Why Students Fail

### MC-1: EULER-FORMULA-HOLDS-FOR-ALL-POLYHEDRA
- **Surface form**: believes $V-E+F=2$ holds for any polyhedron regardless of topology, missing
  that it holds only for polyhedra homeomorphic to $S^2$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the formula is
  usually first taught only via $S^2$-like examples, obscuring its topological dependence).
- **Repair**: re-compute $V-E+F$ for a torus-shaped polyhedron, showing it gives 0, not 2.

### MC-2: SAME-EULER-CHARACTERISTIC-MEANS-HOMEOMORPHIC
- **Surface form**: believes two compact surfaces with equal $\chi$ are homeomorphic, missing
  orientability as the second classifying invariant.
- **Birth type**: Critical severity (Blueprint's own declared severity — treating $\chi$ as a
  complete classifying invariant undermines the entire classification theorem).
- **Repair**: re-walk the torus-versus-Klein-bottle $H_2$ comparison ($\mathbb Z$ versus $0$).

### MC-3: EULER-FORMULA-V-MINUS-E-PLUS-F-UNIVERSALLY-2
- **Surface form**: believes the formula always gives 2 for any surface triangulation, confusing
  Euler's special $S^2$ result with the general $\chi=2-2g$ formula for genus-$g$ surfaces.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the numerical
  coincidence "$\chi=2$" for the most familiar shapes overshadows the general genus-dependent
  formula).
- **Repair**: re-derive $\chi=2-2g$ for a genus-2 surface, confirming $\chi=-2\ne2$.

## Misconceptions

### MC-1: EULER-FORMULA-HOLDS-FOR-ALL-POLYHEDRA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SAME-EULER-CHARACTERISTIC-MEANS-HOMEOMORPHIC
- **Surface form**: as described above.
- **Root cause (Critical)**: as described above.
- **Repair**: as described above.

### MC-3: EULER-FORMULA-V-MINUS-E-PLUS-F-UNIVERSALLY-2
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"χ=2 is the sphere's signature, not a universal constant — every genus gets its own χ,
  computed the same recipe, landing on a different number."**
- **Anti-analogy**: two surfaces sharing the same χ are not thereby "the same" — a torus and a
  Klein bottle both read χ=0 yet are genuinely different surfaces, distinguished only by
  orientability.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the cube's $V-E+F=2$ computation contrasted with a
  torus-shaped polyhedron's $V-E+F=0$.
- **Demonstration 2 (targets MC-2)**: the torus-versus-Klein-bottle same-$\chi$-different-
  orientability contrast, via $H_2\cong\mathbb Z$ versus $H_2=0$.
- **Demonstration 3 (targets MC-3)**: the genus-2 surface's $\chi=2-2g=-2$ computation.

## Discovery Questions
1. "Does $V-E+F=2$ hold for any polyhedron?"
2. "If two closed surfaces have the same $\chi$, are they homeomorphic?"
3. "Does Euler's formula $V-E+F=2$ apply to any closed surface?"

## Teaching Sequence
1. **Representation shift**: Euler's formula lifted to the alternating-sum-of-Betti-numbers
   formula, working Demonstration 1, isolating MC-1.
2. **Deductive**: the compact-surfaces $\chi$ table, computing torus and sphere directly.
3. **Counterexample**: the classification theorem and the torus-versus-Klein-bottle contrast,
   working Demonstration 2, isolating MC-2, and Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct $\chi$ computation from a CW structure with edge-gluing
   identifications, a correct orientability-consistency check via Betti numbers, and a correct
   application of the connected-sum formula, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept $V-E+F=2$ offered as a universal fact for any polyhedron.
- Never accept two surfaces declared homeomorphic solely because they share the same $\chi$.
- Never accept $\chi=2$ presented as the general formula for all closed surfaces.

## Voice Teaching Notes
- Say "is this polyhedron actually homeomorphic to a sphere, or could it have a different
  topology?" whenever Euler's $\chi=2$ is invoked.
- Ask "have you checked orientability, or just $\chi$?" whenever two surfaces are compared via
  Euler characteristic alone.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $\chi=V-E+F$ for a given polyhedron and
  identifies whether it matches 2.
- **Rung 2 (application)**: learner correctly computes $\chi$ from Betti numbers or a CW
  structure for a named surface.
- **Rung 3 (transfer)**: learner correctly applies the classification theorem, reading off the
  surface type from $\chi$ and an orientability flag together.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute $V-E+F$ for a torus-shaped polyhedron.
- If MC-2 recurs, re-walk the torus-versus-Klein-bottle $H_2$ comparison.
- If MC-3 recurs, re-derive $\chi=2-2g$ for a genus-2 surface.

## Memory Hooks
- "χ=2 is the sphere's own number — other topologies get their own χ from the same formula."
- "Same χ doesn't mean same surface — check orientability too."
- "χ=2-2g for genus g — 2 is just the g=0 special case."

## Transfer Connections
- `math.top.homology` (already authored, this campaign, Batch 191): supplies the Betti numbers
  and homology groups this concept's $\chi=\sum(-1)^n\mathrm{rank}(H_n)$ formula is built directly
  from.
- `math.disc.planar-graph` (already authored, certified domain, genuine cross-link): supplies
  Euler's planar formula $V-E+F=2$ for planar graphs, the discrete-graph-theoretic special case
  this concept's polyhedral formula directly generalizes.

## Cross-Subject Connections
- Dynamical systems: the Lefschetz Fixed-Point Theorem, which generalizes $\chi$ to the Lefschetz
  number of a self-map, using $\chi(X)=L(\mathrm{id}_X)$ as the special case of the identity map.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.euler-characteristic.md`, reused by
  reference for its cube/torus Euler-formula contrast, its torus-versus-Klein-bottle
  classification example, its classification-theorem statement, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: adapted to a GENUINE CROSS-LINK PROBE (see Curriculum Feedback) connecting this
  concept's $\chi=V-E+F$ formula directly to `math.disc.planar-graph`'s own Euler's planar formula
  for connected planar graphs, in place of the Blueprint's stated independence mode and its
  Lefschetz Fixed-Point Theorem preview (retained as a Cross-Subject Connection instead).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction discrepancy found**: the Blueprint's Component 7 states its cross-link
  `math.disc.planar-graph`'s blueprint was "NOT on disk" at write-time (independently
  re-verified: this was CORRECT at that time), but `docs/curriculum/blueprints/
  math.disc.planar-graph.md` now EXISTS, and its Educational Brain file
  (`educational-brain/concepts/mathematics/math.disc.planar-graph.md`) is independently
  confirmed AUTHORED in this corpus. This EB file therefore upgrades the transfer probe to a
  genuine cross-link probe connecting $\chi=V-E+F$ to Euler's planar-graph formula, rather than
  the Blueprint's stated independence mode — the sixth such reverse-direction discrepancy this
  campaign (after the pre-segment Batch 131, and Batches 152, 156, 165, 176, 181). All other
  fields (requires `math.top.homology`, unlocks none, expert/apply, mastery_threshold 0.8,
  estimated_hours 4) verified exact matches.

## Version History
- 2026-09-19 (Batch 192): authored. First entry this batch. Companion batch concept:
  `math.cat.natural-transformation`.

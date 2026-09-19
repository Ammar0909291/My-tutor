# math.top.homology

## Identity
- **KG id**: `math.top.homology`
- **Domain**: math.top
- **Requires**: `math.top.simplicial-complex`, `math.abst.group-theory`
- **Unlocks**: `math.top.euler-characteristic`
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6
- **Estimated hours**: 10

## Learning Objective
Define $H_0(X)$ as counting CONNECTED COMPONENTS (never vertex or edge counts); define $H_1(X)$
as detecting loops that do NOT bound a 2-simplex (a loop bounding a present 2-simplex is trivial,
never automatically nontrivial); and recognize homology as functorial and homotopy-invariant, a
ONE-DIRECTIONAL distinguishing tool — different homology certifies difference, but identical
homology NEVER certifies sameness.

## Core Understanding
$H_0$'S RANK IS THE COMPONENT COUNT — NEVER ANY OTHER SIMPLEX TALLY: for two disjoint filled
triangles (6 vertices, 6 edges, 2 two-simplices, no shared vertices): $H_0(X)\cong\mathbb Z^2$,
rank EXACTLY 2 — matching the 2 connected components, NEVER the vertex count (6) or edge count
(6). $H_0$ answers exactly one question: how many separate pieces does the space fall into —
nothing about raw simplex tallies enters its rank.

A LOOP'S $H_1$ CLASS DEPENDS ON WHETHER IT BOUNDS A 2-SIMPLEX — NEVER AUTOMATIC: for the SAME
vertices $A,B,C$ and edges $\{A,B\},\{B,C\},\{C,A\}$: the FILLED triangle (2-simplex
$\{A,B,C\}$ present) has the loop $A\to B\to C\to A$ bound the filled-in 2-simplex, representing
the ZERO class — $H_1=0$. The HOLLOW triangle (identical vertices/edges, 2-simplex REMOVED) has
the SAME loop bound NOTHING present in the complex, representing a genuinely NONTRIVIAL class —
$H_1\cong\mathbb Z$. The identical loop of edges is trivial or nontrivial DEPENDING ENTIRELY on
whether a 2-simplex is present to fill it — never determined by the loop alone.

HOMOLOGY IS A ONE-DIRECTIONAL DISTINGUISHING TOOL — NEVER A COMPLETE INVARIANT: a filled 2-simplex
(disc) and a single point have IDENTICAL homology ($H_0\cong\mathbb Z$, $H_n=0$ for $n\ge1$, both
homotopy equivalent to a point) — yet they are NOT homeomorphic (different dimensions,
cardinalities). Identical homology proves NOTHING about sameness. Contrast the filled triangle
($H_1=0$) versus the hollow triangle ($H_1\cong\mathbb Z$): their DIFFERING $H_1$ correctly
CERTIFIES they cannot be homotopy equivalent. Different homology proves difference, reliably;
identical homology proves nothing at all about sameness.

## Mental Models
- **"H₀ answers exactly one question — how many pieces? — never how many vertices or edges."**
- **"A loop's fate in H₁ depends on whether something is there to fill it — the same loop can be
  trivial or a genuine hole depending on what's around it."**
- **"Homology is a one-way detector — different readings prove genuine difference; identical
  readings prove absolutely nothing about sameness."**

## Why Students Fail

### MC-1: H0-RANK-CONFUSED-WITH-SIMPLEX-COUNT
- **Surface form**: believes $H_0$'s rank corresponds to the number of vertices or edges in a
  simplicial complex, missing that it specifically counts connected components.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a simplicial complex
  is defined by its list of simplices, inviting confusion between "counting simplices" and
  "counting components").
- **Repair**: re-walk the two-disjoint-triangles example (6 vertices, 6 edges, rank 2).

### MC-2: EVERY-LOOP-ASSUMED-NONTRIVIAL-IN-H1
- **Surface form**: believes every closed loop of edges automatically represents a nontrivial
  class in $H_1$, missing that a loop bounding a present 2-simplex is trivial.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a "loop" visually
  suggests "a hole," obscuring the case where a 2-simplex fills it in).
- **Repair**: re-walk the filled-versus-hollow-triangle contrast.

### MC-3: IDENTICAL-HOMOLOGY-ASSUMED-TO-IMPLY-HOMEOMORPHIC
- **Surface form**: believes identical homology groups at every dimension guarantee two spaces
  are homeomorphic, missing that homology is a one-directional distinguishing tool.
- **Birth type**: Moderate severity (Blueprint's own declared severity — homology's power at
  proving difference invites over-extending it to proving sameness too).
- **Repair**: re-walk the point-versus-disc case, sharing identical homology yet not homeomorphic.

## Misconceptions

### MC-1: H0-RANK-CONFUSED-WITH-SIMPLEX-COUNT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: EVERY-LOOP-ASSUMED-NONTRIVIAL-IN-H1
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: IDENTICAL-HOMOLOGY-ASSUMED-TO-IMPLY-HOMEOMORPHIC
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"H₀ counts islands, not grains of sand — the raw material tally is irrelevant to how many
  separate landmasses there are."**
- **Anti-analogy**: identical homology readings are not a certificate of sameness — a point and a
  filled disc read identically to homology yet are utterly different spaces.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the two-disjoint-filled-triangles $H_0$ computation.
- **Demonstration 2 (targets MC-2)**: the filled-versus-hollow-triangle $H_1$ contrast.
- **Demonstration 3 (targets MC-3)**: the point-versus-disc identical-homology-not-homeomorphic
  case, alongside the filled-versus-hollow-triangle's genuinely-different case.

## Discovery Questions
1. "Does $H_0(X)$'s rank correspond to the number of vertices (or edges) in the simplicial
   complex?"
2. "Does every closed loop of edges in a simplicial complex automatically represent a nontrivial
   class in $H_1$?"
3. "If two spaces have identical homology groups at every dimension, does that guarantee they are
   homeomorphic?"

## Teaching Sequence
1. **Conflict evidence**: the two-disjoint-triangles $H_0$ computation, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the filled-versus-hollow-triangle $H_1$ contrast, working Demonstration 2,
   isolating MC-2.
3. **Representation shift**: the one-directional homology principle, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct $H_0$ statement from a component count alone, a correct
   $H_1$ determination for a hollow-versus-filled shape, and a correct explanation of why
   identical $H_0$/$H_1$ does not certify homeomorphism, at the Blueprint's own stated MAMR of
   3/5.

## Tutor Actions
- Never accept $H_0$'s rank computed from a vertex or edge count rather than a component count.
- Never accept a claim that every closed loop automatically represents a nontrivial $H_1$ class.
- Never accept a claim that identical homology groups guarantee two spaces are homeomorphic.

## Voice Teaching Notes
- Say "how many separate pieces, not how many vertices or edges?" whenever $H_0$ is computed.
- Ask "is there a 2-simplex present to fill this loop in, or not?" whenever a loop's $H_1$ class
  is determined.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states $H_0$ from a stated component count alone.
- **Rung 2 (application)**: learner correctly determines whether a specific loop represents the
  zero class or a nontrivial class in $H_1$, based on whether a 2-simplex fills it.
- **Rung 3 (transfer)**: learner correctly explains why identical homology at every dimension does
  not certify homeomorphism, using the point-versus-disc example.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the two-disjoint-triangles component-count example.
- If MC-2 recurs, re-walk the filled-versus-hollow-triangle contrast.
- If MC-3 recurs, re-walk the point-versus-disc identical-homology case.

## Memory Hooks
- "H₀ counts pieces, never vertices or edges."
- "A loop is trivial in H₁ if something fills it in — otherwise it's a genuine hole."
- "Different homology proves difference; same homology proves nothing."

## Transfer Connections
- `math.top.simplicial-complex` (already authored, this campaign, Batch 190): supplies the
  filled-versus-hollow-triangle triangulation this concept's $H_1$ example directly reuses, and
  the face-closure structure the chain complex is built from.
- `math.abst.group-theory` (already authored, certified domain): supplies the abelian group
  structure of $H_n(X)$.
- `math.top.euler-characteristic` (not yet authored, KG's declared unlock): the alternating sum of
  homology ranks (Betti numbers), computed directly from the homology groups this concept
  establishes.

## Cross-Subject Connections
- Materials science and data analysis: topological data analysis uses homology to detect genuine
  "holes" or defects in a dataset or material, distinguishing them from noise.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.homology.md`, reused by reference for
  its two-disjoint-triangles $H_0$ example, its filled-versus-hollow-triangle $H_1$ contrast, its
  point-versus-disc one-directional-invariance example, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on detecting a manufacturing defect
  in a 2D sheet via $H_1$, refuting an overreaching "no holes at all" conclusion from $H_1=0$ and
  a conflation of $H_0$ with hole detection.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.simplicial-complex`/`math.abst.group-theory`, unlocks
  `math.top.euler-characteristic`, cross_links none, research/analyze, mastery_threshold 0.6,
  estimated_hours 10) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 191): authored. First entry this batch. Companion batch concept:
  `math.cat.morphism-types`.

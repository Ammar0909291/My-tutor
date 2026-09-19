# math.top.simplicial-complex

## Identity
- **KG id**: `math.top.simplicial-complex`
- **Domain**: math.top
- **Requires**: `math.top.topological-space`
- **Unlocks**: `math.top.homology`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Define a simplicial complex as a collection of simplices CLOSED UNDER FACES (every face of an
included simplex must be EXPLICITLY listed too, never assumed automatic); recognize a simplicial
complex as a CHOSEN combinatorial model via triangulation, never the space's unique intrinsic
structure (the same space can admit multiple genuinely different triangulations); and state "every
compact manifold admits a triangulation" with its SCOPED guarantee, never overgeneralized to every
topological space.

## Core Understanding
FACE-CLOSURE MUST BE EXPLICIT — NEVER ASSUMED AUTOMATIC: a collection representing a filled
triangle $A,B,C$ must EXPLICITLY include the 2-simplex $\{A,B,C\}$ AND all three edges
$\{A,B\},\{A,C\},\{B,C\}$ AND all three vertices $\{A\},\{B\},\{C\}$ — 7 simplices total. Listing
JUST the 2-simplex $\{A,B,C\}$ alone, without separately including its edges and vertices, FAILS
to be a valid simplicial complex — even though the triangle "obviously contains" those faces
geometrically. The simplicial complex is defined by which simplices are EXPLICITLY in the
collection, never by what's geometrically implied.

A TRIANGULATION IS A CHOSEN MODEL — NEVER THE SPACE'S UNIQUE INTRINSIC STRUCTURE: a filled square
can be triangulated via ONE diagonal (2 triangles sharing one edge, 4 vertices, 5 edges, 2 faces)
OR via BOTH diagonals meeting at the center (4 triangles sharing a central vertex, 5 vertices, 8
edges, 4 faces). BOTH are valid simplicial complexes (each closed under faces), and BOTH represent
the SAME topological space — the filled square — despite having genuinely DIFFERENT vertex/edge/
face counts. The square has no single "correct" triangulation; a triangulation is a chosen
representation, never an intrinsic, unique feature of the space itself.

THE COMPACT-MANIFOLD TRIANGULATION GUARANTEE IS SCOPED — NEVER EXTENDED TO EVERY SPACE: $S^2$ (a
compact manifold) admits a triangulation — the surface of a regular tetrahedron (4 triangular
faces, 6 edges, 4 vertices) is topologically a valid triangulation. But the theorem "every compact
manifold admits a triangulation" applies SPECIFICALLY to spaces that are BOTH compact AND
manifolds — the non-compact open half-plane $\{(x,y):y>0\}$ fails the compactness hypothesis, so
this SPECIFIC theorem is simply SILENT about it (never claiming it's untriangulable, just outside
this theorem's scope). Dropping either hypothesis removes the guarantee entirely — it never
automatically extends further.

## Mental Models
- **"A simplicial complex is defined by its explicit member list — a face isn't 'in' the complex
  just because it's geometrically part of a bigger simplex; it has to be listed too."**
- **"A triangulation is a chosen combinatorial photograph of a space — the same space can have
  many genuinely different valid photographs, none more 'true' than another."**
- **"'Every compact manifold triangulates' is a guarantee with a fence around it — step outside
  compact-and-manifold, and the theorem simply has nothing to say, neither yes nor no."**

## Why Students Fail

### MC-1: SIMPLEX-FACES-ASSUMED-AUTOMATICALLY-INCLUDED
- **Surface form**: believes a simplex's faces are automatically part of a simplicial complex
  without needing to be explicitly listed, missing the explicit face-closure requirement.
- **Birth type**: Foundational severity (Blueprint's own declared severity — geometric intuition
  says a triangle "obviously has" edges and vertices, obscuring the need for explicit listing).
- **Repair**: re-walk the explicit 7-simplex face-closed collection for a filled triangle.

### MC-2: SIMPLICIAL-COMPLEX-AS-UNIQUE-INTRINSIC-STRUCTURE
- **Surface form**: believes a topological space has one single, intrinsically correct
  triangulation, missing that a space can admit multiple genuinely different valid triangulations.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the first-encountered
  triangulation of a shape feels like "the" triangulation rather than one choice among many).
- **Repair**: re-walk the two different valid triangulations of the same square.

### MC-3: COMPACT-MANIFOLD-TRIANGULATION-OVERGENERALIZED
- **Surface form**: believes every topological space is triangulable because compact manifolds
  are, missing that the theorem's guarantee is scoped specifically to compact manifolds.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a positive result
  about an important class of spaces is easy to over-extend to "all spaces").
- **Repair**: re-walk the triangulable $S^2$ contrasted with the non-compact half-plane outside
  the theorem's scope.

## Misconceptions

### MC-1: SIMPLEX-FACES-ASSUMED-AUTOMATICALLY-INCLUDED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SIMPLICIAL-COMPLEX-AS-UNIQUE-INTRINSIC-STRUCTURE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: COMPACT-MANIFOLD-TRIANGULATION-OVERGENERALIZED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A simplicial complex is a guest list, not a floor plan — a face doesn't get in just because
  it's structurally implied by a bigger shape; its name has to actually appear on the list."**
- **Anti-analogy**: a triangulation is not a fingerprint uniquely identifying a space — many
  different, equally valid triangulations can represent the identical underlying shape.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit 7-simplex face-closed collection for a filled
  triangle, contrasted with the invalid triangle-only collection.
- **Demonstration 2 (targets MC-2)**: the one-diagonal-versus-both-diagonals triangulations of the
  same square.
- **Demonstration 3 (targets MC-3)**: the triangulable $S^2$ (tetrahedron surface) contrasted with
  the non-compact half-plane outside the theorem's scope.

## Discovery Questions
1. "If a collection includes a triangle, are its edges and vertices automatically considered
   part of the simplicial complex even if not separately listed?"
2. "Does a topological space have one single, intrinsically correct triangulation, or can it have
   multiple genuinely different valid ones?"
3. "Does the fact that every compact manifold is triangulable mean every topological space is
   triangulable?"

## Teaching Sequence
1. **Conflict evidence**: the triangle-only-versus-face-closed-collection contrast, working
   Demonstration 1, isolating MC-1.
2. **Contrast pair**: the two different triangulations of the same square, working
   Demonstration 2, isolating MC-2.
3. **Representation shift**: the scoped compact-manifold guarantee, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct listing of every simplex needed for a face-closed complex,
   a correct construction of an alternative triangulation of a given space, and a correct
   determination of whether the compact-manifold triangulation theorem applies to a specific
   space, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a simplex's faces treated as automatically included without being explicitly
  listed.
- Never accept a claim that a topological space has one single, intrinsically correct
  triangulation.
- Never accept a claim that every topological space is triangulable because compact manifolds
  are.

## Voice Teaching Notes
- Say "is that face actually listed in the collection, or just geometrically implied?" whenever
  face-closure is being checked.
- Ask "is this THE triangulation, or just one valid triangulation among several?" whenever a
  triangulation is presented.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly lists every simplex (of every dimension) needed for
  a face-closed complex representing a given shape.
- **Rung 2 (application)**: learner correctly constructs a second, genuinely different
  triangulation of a given space.
- **Rung 3 (transfer)**: learner correctly determines whether the compact-manifold triangulation
  guarantee applies to a specific space, reasoning about its hypotheses explicitly.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the explicit 7-simplex face-closed collection.
- If MC-2 recurs, re-walk the two different triangulations of the same square.
- If MC-3 recurs, re-walk the $S^2$-versus-half-plane scope contrast.

## Memory Hooks
- "Face-closure means the face is on the LIST — not just geometrically implied."
- "A triangulation is a chosen model — the same space can have many valid ones."
- "Compact manifold triangulability is scoped — dropping either hypothesis leaves the theorem
  silent, not false."

## Transfer Connections
- `math.top.topological-space` (already authored, this campaign, Batch 180): supplies the
  open-set framework this concept's combinatorial alternative (triangulation) is contrasted
  against.
- `math.top.homology` (not yet authored, KG's declared unlock): uses simplicial complexes as the
  standard combinatorial input for computing homology groups.

## Cross-Subject Connections
- Computer graphics: 3D mesh representations of surfaces are simplicial complexes, with the
  model-versus-space distinction directly relevant to level-of-detail rendering.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.simplicial-complex.md`, reused by
  reference for its explicit face-closure verification, its two-triangulations-of-a-square
  contrast, its $S^2$/half-plane scope contrast, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a computer-graphics engineer's
  triangle mesh, connecting face-closure and the model-versus-space distinction to level-of-detail
  rendering, and refuting an overgeneralization to the infinite flat plane.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.topological-space`, unlocks `math.top.homology`, cross_links none,
  expert/understand, mastery_threshold 0.75, estimated_hours 5) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 190): authored. First entry this batch. Companion batch concept:
  `math.top.van-kampen`.

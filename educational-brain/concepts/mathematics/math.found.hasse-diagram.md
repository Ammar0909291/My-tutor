# Hasse Diagram — `math.found.hasse-diagram`

## Identity

- **Concept ID**: `math.found.hasse-diagram` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.partial-order`)
- **Prerequisites**: `math.found.partial-order`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.partial-order`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.80 · **Est. hours**: 2
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "order diagram".

## Learning Objective

The learner can: draw a Hasse diagram for a finite partial order by
including only IMMEDIATE predecessor relationships (covering relations)
as edges, correctly omitting both self-loops (reflexivity) and edges
implied by transitivity; read a Hasse diagram to recover the full
partial order it represents, by reconstructing all implied
relationships from the drawn immediate-predecessor edges; and correctly
identify incomparable elements (those with no directed path between
them in either direction) directly from the diagram's shape.

## Core Understanding

A Hasse diagram is a graphical representation of a finite partially
ordered set where directed edges represent immediate predecessor
relationships. A Hasse diagram deliberately OMITS two kinds of edges a
full relation-diagram would need: self-loops (since reflexivity is
assumed automatically for every partial order and would clutter every
single node with a redundant loop) and any edge implied by transitivity
(if a≤b≤c, the diagram draws only a→b and b→c, never a DIRECT a→c edge,
since that relationship is already fully recoverable by following the
two drawn edges in sequence). An edge a→b is drawn ONLY when b
immediately covers a — meaning a≤b and there is no element c strictly
between them (a≤c≤b with c≠a,b). By convention, elements are positioned
vertically by "rank" (higher elements drawn above the ones they cover),
so edges can be drawn without arrowheads, with "upward" implicitly
meaning "greater than." Two elements are INCOMPARABLE exactly when
neither has a path (following edges only upward) to the other — visible
directly in the diagram as two nodes with no connecting upward path in
either direction, often drawn side by side at similar or different
heights with no line connecting them.

## Mental Models

- **Beginner model — "a Hasse diagram shows every single related pair
  as its own edge, like a complete relation diagram"**: the learner
  attempts to draw an edge for every pair satisfying the order relation,
  including transitively-implied and reflexive ones. Shelf-life
  warning: this model produces a cluttered, redundant diagram that
  defeats the entire purpose of the Hasse convention, and fails outright
  once self-loops or transitively-redundant edges are drawn.
- **Intermediate model — "only immediate covering relationships are
  drawn; the rest is recovered by following paths"**: the learner
  correctly omits self-loops and transitively-implied edges, but may
  still misidentify incomparable elements, especially at different
  heights in the diagram. Upgrade trigger: being asked to identify all
  incomparable pairs in a diagram with elements at three or more
  distinct heights.
- **Advanced model — "the diagram's shape directly encodes the full
  order via reachability, and incomparability is read as 'no upward
  path either way'"**: the learner reliably reconstructs the complete
  relation from a diagram and correctly reads incomparability from
  shape alone, including for elements not at the same height. Upgrade
  trigger: being asked whether two elements at DIFFERENT heights in a
  diagram must be comparable (they need not be).
- **Do not upgrade early**: a learner who still tries to draw every
  related pair as its own edge (beginner model) should not be pushed
  into height-independent incomparability judgments (advanced model)
  before the covering-relation-only drawing convention is itself
  reliable.

## Why Students Fail

The dominant failure draws a Hasse diagram as if it were a complete
relation diagram, including self-loops (redundant, since reflexivity is
assumed) and edges implied by transitivity (redundant, since they're
already recoverable by following the drawn covering edges in sequence)
— missing that the Hasse convention specifically OMITS exactly these
two kinds of edges to keep the diagram legible. A second, independent
failure assumes that two elements drawn at DIFFERENT heights in the
diagram must automatically be comparable (one "above" the other in the
order), missing that height alone does not establish a connecting
path — two elements can sit at different heights and still be
incomparable if no sequence of upward edges connects them.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "Every related pair gets its own edge, including self-loops
and transitively-implied ones" (Foundational; Type 1, overgeneralization
from a general relation-diagram convention, applied here where the
Hasse-specific omission rules haven't yet been learned)**
- *Why*: a general "draw an edge for every related pair" instinct,
  carried over from earlier relation-diagram experience (e.g. arrow
  diagrams for arbitrary relations), doesn't yet account for the Hasse
  diagram's specific, deliberate omissions.
- *Symptom*: drawing a self-loop at every node, or drawing a direct edge
  from a to c even when a≤b≤c is already represented by two separate
  edges a→b and b→c.
- *Detection probe*: given a≤b≤c with no other relationships, ask the
  learner to draw the Hasse diagram and check whether they include a
  direct a-to-c edge.
- *Recovery*: "self-loops are omitted because reflexivity is assumed for
  EVERY partial order — drawing it everywhere adds nothing. The a-to-c
  edge is omitted because it's already recoverable: follow a→b→c, and
  you know a≤c by transitivity, without needing a third edge to say so.
  Draw ONLY immediate covering relationships — no c strictly between
  the two elements."
- *Verification*: the learner, given a chain of three or more elements,
  draws only the minimal covering edges, correctly omitting both
  self-loops and transitively-redundant edges.

**MC-2 — "Elements at different heights must be comparable" (Type 1,
overgeneralization from the vertical-rank convention, mistaking
positional height for a guarantee of connection)**
- *Why*: since the diagram's convention places "greater" elements
  higher, it's tempting to assume ANY two elements at different heights
  are automatically ordered relative to each other, when in fact height
  alone doesn't establish a connecting path — two elements can occupy
  different heights in entirely separate, unconnected branches.
- *Symptom*: declaring two elements comparable based solely on one
  being drawn higher than the other, without checking whether an actual
  upward path (via edges) connects them.
- *Detection probe*: present a Hasse diagram with two separate branches
  reaching different heights, with no connecting path between a
  specific pair, and ask whether that pair is comparable.
- *Recovery*: "height alone doesn't establish comparability — check for
  an actual PATH of upward edges connecting the two elements. If no
  such path exists in either direction, the elements are incomparable,
  regardless of their relative heights."
- *Verification*: the learner correctly identifies an incomparable pair
  at different heights in a fresh diagram, by checking for a connecting
  path rather than relying on height alone.

## Analogies

**Primary — a simplified subway map showing only direct connections**:
A Hasse diagram is like a subway map that shows only DIRECT track
segments between adjacent stations, never redundantly drawing a line
for every possible route (you can figure out "Station A to Station D"
by following the direct segments A→B→C→D, without needing a special
extra line drawn straight from A to D). Two stations with no connecting
route at all — on entirely separate lines — are simply not linked on
the map, regardless of how far apart or close together they're drawn.

**Anti-analogy to retire**: "A Hasse diagram just draws all the pairs
that satisfy the order relation." This directly invites MC-1 by
suggesting the diagram should be exhaustive rather than minimal.

## Demonstrations

**Chain-diagram construction, omissions made explicit**: for a≤b≤c
(and nothing else), draw the Hasse diagram with only two edges (a→b,
b→c), explicitly narrating why the self-loops (a→a, b→b, c→c) and the
transitively-implied edge (a→c) are both correctly omitted.

**Reading incomparability from a branching diagram**: draw a diagram
with a bottom element connecting to two separate upward branches
(neither branch connecting to the other), and identify the incomparable
pairs directly — one element from each branch, with no connecting path
in either direction, regardless of their drawn heights.

**Divisibility Hasse diagram**: for the divisors of 12 ({1,2,3,4,6,12})
under divisibility, draw the diagram with 1 at the bottom, 12 at the
top, and 2,3,4,6 forming a branching middle layer — directly showing 4
and 6 as incomparable (neither divides the other) despite being at the
same height, and 2 and 3 as incomparable despite both connecting
upward to 6.

## Discovery Questions

Present a small finite partial order (e.g. divisors of 12 under
divisibility) as a full listing of pairs, and ask the learner to find
the MINIMAL set of edges needed to reconstruct the entire relation by
following paths — the learner discovers the covering-relation-only
principle through elimination (which edges are redundant because they
follow from others?) before the Hasse convention is named.
Recommendation: guided discovery for the minimal-edge-set insight
(directly discoverable through the elimination exercise); direct
instruction for the height-versus-comparability distinction (MC-2),
since it requires an explicit branching example not naturally
constructed by a learner working from a simple chain.

## Teaching Sequence

MC-1 (over-drawing self-loops and transitive edges) is addressed first,
since it concerns the basic construction rule every subsequent diagram
depends on. MC-2 (height mistaken for comparability) is addressed
second, once correct construction is reliable, since it concerns
correctly READING an already-correctly-drawn diagram.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the chain-diagram
construction with omissions narrated, the primary action targeting
MC-1) → **Demonstration** (the divisibility-of-12 branching diagram,
targeting MC-2) → **Drill** (rapid comparability judgments read
directly from varied diagram shapes). **What doesn't fit**: algorithmic
construction of Hasse diagrams for large or infinite posets — this
concept's scope (2 hours, `apply`-level) is manual construction and
reading for small, finite examples.

## Voice Teaching Notes

**Register**: Visually descriptive — narrate diagram shapes explicitly
even in text-only delivery ("draw a at the bottom, with an edge rising
to b").

**Wait-time**: After drawing a chain relationship, pause and ask "does
this diagram need a direct edge from the bottom to the top element, or
is that already implied?" — surfaces MC-1 directly.

**Load-bearing sentences**:
- "Draw only immediate covering relationships — no self-loops, no
  edges you can already get by following other edges."
- "Height alone doesn't mean comparable — check for an actual
  connecting path."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.
This concept is unusually visual; voice-only delivery should rely
heavily on explicit structural narration.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is a
structurally over-complete diagram rather than a wrong final answer,
assessment should require the learner to draw (or precisely describe)
the diagram itself, not just answer comparability questions about an
already-provided one. Because MC-2's defining signature is relying on
position rather than connectivity, assessment should include at least
one diagram with elements at different heights that are genuinely
incomparable.

## Tutor Recovery Strategy

Likeliest utterance: "shouldn't I draw a line for every pair that's
related?" — the concept-specific smaller question: "can you already GET
from one to the other by following the edges you've drawn so far?"
reframes the confusion from "every relationship needs its own edge" to
"only the minimal, irreducible relationships need edges — the rest
follows" — directly isolating MC-1's over-drawing habit.

## Memory Hooks

**Type**: procedural (minimal-edge-set construction and path-based
reading, directly reusing `math.found.partial-order`'s own three-
property structure). Review form: fresh finite posets requiring both
construction (from a listing) and reading (from a diagram), always
including at least one incomparable pair at differing heights.
Interleaving partners: `math.found.partial-order` (the structure this
diagram represents) and `math.found.total-order` (whose Hasse diagram
is always a single vertical line, a useful contrast case).

## Transfer Connections

- **Near**: `math.found.total-order` (a total order's Hasse diagram is
  always a single line, with no branching — a direct visual contrast).
- **Far**: dependency graphs in project management and software build
  systems (task-precedence diagrams are Hasse-diagram-shaped, showing
  only direct prerequisites, never redundant transitively-implied
  dependencies); organizational charts showing only direct reporting
  lines.
- **Real-world**: family trees restricted to direct parent-child edges
  (omitting redundant grandparent-to-grandchild lines, recoverable by
  following the direct edges).
- **Expert transfer**: the learner, meeting an unfamiliar dependency or
  precedence diagram in any domain, automatically checks whether it
  follows the minimal-edge Hasse convention before assuming every drawn
  or implied relationship needs its own line.

## Cross-Subject Connections

KG lists `math.graph.graph` as a cross-link; confirmed a Blueprint
exists (`docs/curriculum/blueprints/math.graph.graph.md`) but no
Educational Brain entry yet (different domain, out of this program's
current math.found scope). The relationship — a Hasse diagram is
itself a specific kind of directed graph, with edges restricted to
covering relations — is named here but not developed further, pending
that concept's authoring.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.hasse-diagram.md` — stated explicitly per the established
no-Blueprint convention, not omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (2) and mastery threshold (0.80) are appropriate for a
concept whose core content is a single, precise drawing/reading
convention. Cross-link (`math.graph.graph`) verified present with a
Blueprint but no Educational Brain entry, consistent with prior
findings for the same cross-link on `math.found.relation`.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 10, autonomous loop) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |

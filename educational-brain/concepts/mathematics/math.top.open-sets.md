# math.top.open-sets

## Identity
- **KG id**: `math.top.open-sets`
- **Domain**: math.top
- **Requires**: `math.top.topological-space`
- **Unlocks**: `math.top.interior-closure`, `math.top.connectedness`
- **Cross-links**: `math.real.open-sets`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define open sets simply as ELEMENTS of $\tau$ and closed sets as their complements (never
requiring distance or metric balls, genuinely generalizing `math.real.open-sets`'s metric-based
definitions); define interior as the LARGEST open set contained in $A$, recognizing a NONEMPTY set
can have EMPTY interior (never assumed automatically nonempty); and define boundary
$\partial A=\text{cl}(A)\cap\text{cl}(A^c)$, recognizing it can be DRAMATICALLY LARGER than
intuition suggests — even the ENTIRE space (never assumed to always be a thin edge).

## Core Understanding
OPEN AND CLOSED ARE DEFINED PURELY FROM $\tau$ — NEVER REQUIRING A METRIC: for
$X=\{a,b,c\}$ with $\tau=\{\emptyset,\{a\},\{a,b\},X\}$: the OPEN sets are exactly $\tau$'s four
elements. The CLOSED sets are their complements: $X\setminus\emptyset=X$,
$X\setminus\{a\}=\{b,c\}$, $X\setminus\{a,b\}=\{c\}$, $X\setminus X=\emptyset$. This entire
computation used ZERO distance or metric-ball reasoning — a genuine generalization of
`math.real.open-sets`'s ball-based definitions, never merely a relabeling.

A NONEMPTY SET CAN HAVE EMPTY INTERIOR — NEVER ASSUMED AUTOMATICALLY NONEMPTY: for the same
$X,\tau$: $\text{int}(\{b\})$ asks for the LARGEST open set contained in $\{b\}$. Checking each
open set: $\emptyset\subseteq\{b\}$ ✓ (trivially); $\{a\},\{a,b\},X\not\subseteq\{b\}$. The ONLY
open subset of $\{b\}$ is $\emptyset$ itself — so $\text{int}(\{b\})=\emptyset$, even though
$\{b\}$ is perfectly nonempty. Interior asks "what's the biggest open set hiding INSIDE this set" —
and for some perfectly nonempty sets, in some topologies, the honest answer is nothing at all.

THE BOUNDARY CAN BE THE ENTIRE SPACE — NEVER ASSUMED ALWAYS THIN: for $A=(2,5)$ in $\mathbb R$:
$\text{cl}(A)=[2,5]$, $\text{cl}(A^c)=(-\infty,2]\cup[5,\infty)$, giving
$\partial A=\{2,5\}$ — matching familiar "endpoints" intuition. But for $A=\mathbb Q$: since
BOTH $\mathbb Q$ AND its complement (the irrationals) are DENSE in $\mathbb R$:
$\text{cl}(\mathbb Q)=\mathbb R$ and $\text{cl}(\mathbb Q^c)=\mathbb R$ too, giving
$\partial\mathbb Q=\mathbb R\cap\mathbb R=\mathbb R$ — the ENTIRE real line. When a set and its
complement are BOTH dense, the boundary swallows the whole space — never a thin "edge," contrary
to the interval-endpoint intuition.

## Mental Models
- **"Open is a pure declaration — a member of τ, no distance needed anywhere."**
- **"Interior asks what open set hides inside — sometimes, honestly, nothing does, even for a
  nonempty set."**
- **"Boundary can swallow the whole space — when both a set and its complement are dense, there's
  no thin edge left."**

## Why Students Fail

### MC-1: TOPOLOGICAL-CONCEPTS-ASSUMED-TO-NEED-A-METRIC
- **Surface form**: believes interior, closure, and boundary can only be defined or computed using
  distance/metric balls, missing that they are defined purely from the topology's declared
  open/closed sets.
- **Birth type**: Foundational severity (Blueprint's own declared severity — these concepts were
  first encountered via metric balls in `math.real.open-sets`, obscuring their fully general,
  metric-free definitions).
- **Repair**: re-walk the fully metric-free computation of open and closed sets from a declared
  $\tau$.

### MC-2: NONEMPTY-SET-ASSUMED-NONEMPTY-INTERIOR
- **Surface form**: believes every nonempty set has a nonempty interior, missing that sets like
  single points (or dense-complement sets like $\mathbb Q$ in $\mathbb R$) can have entirely
  empty interior.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "nonempty" and "has
  interior" feel like they should track together without direct verification).
- **Repair**: re-walk the $\text{int}(\{b\})=\emptyset$ computation directly.

### MC-3: BOUNDARY-ASSUMED-ALWAYS-THIN
- **Surface form**: believes a set's boundary is always a small, thin collection of "edge" points
  like an interval's endpoints, missing that a set dense alongside a dense complement can have a
  boundary equal to the entire space.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the interval example,
  encountered first, sets a strong "thin edge" expectation).
- **Repair**: re-walk the $\partial\mathbb Q=\mathbb R$ computation, anchoring on the double-
  density mechanism.

## Misconceptions

### MC-1: TOPOLOGICAL-CONCEPTS-ASSUMED-TO-NEED-A-METRIC
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: NONEMPTY-SET-ASSUMED-NONEMPTY-INTERIOR
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: BOUNDARY-ASSUMED-ALWAYS-THIN
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Interior is the largest room that fits fully inside a shape — sometimes, for a strangely thin
  shape, no room fits at all, even though the shape itself isn't empty."**
- **Anti-analogy**: a boundary is not always a thin outline you could trace with a pencil — when a
  set and its complement are both everywhere-dense, the "boundary" is everything.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full metric-free open/closed-set computation from a
  declared $\tau$ on a three-point set.
- **Demonstration 2 (targets MC-2)**: the $\text{int}(\{b\})=\emptyset$ computation, contrasted
  with $\text{int}(\{a,b\})=\{a,b\}$ (an already-open set).
- **Demonstration 3 (targets MC-3)**: the $\partial(2,5)=\{2,5\}$-versus-$\partial\mathbb Q=
  \mathbb R$ contrast.

## Discovery Questions
1. "Can interior, closure, and boundary only be computed using distance or metric balls?"
2. "Does every nonempty set have a nonempty interior?"
3. "Is the boundary of a set always a small, thin collection of 'edge' points?"

## Teaching Sequence
1. **Representation shift**: the metric-free open/closed-set computation, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the empty-interior-for-a-nonempty-set example, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the thin-versus-whole-space boundary comparison, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct open/closed-set listing from a declared topology, a correct
   interior computation possibly yielding empty, and a correct boundary computation including the
   dense-complement case, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that interior/closure/boundary require a metric to be defined.
- Never accept a claim that every nonempty set automatically has a nonempty interior.
- Never accept a claim that a set's boundary is always a small, thin collection of edge points.

## Voice Teaching Notes
- Say "does this need a distance, or just the declared open sets?" whenever interior/closure/
  boundary are computed.
- Ask "is there really an open set fitting entirely inside this one?" whenever an interior is
  computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly lists open and closed sets from a declared topology.
- **Rung 2 (application)**: learner correctly computes an interior, including cases where it's
  empty.
- **Rung 3 (transfer)**: learner correctly computes a boundary for both a "thin" case (an interval)
  and a "whole space" case (a dense set with dense complement), and connects the topological
  definitions to the metric-space special case.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the metric-free open/closed-set computation.
- If MC-2 recurs, re-walk the empty-interior computation.
- If MC-3 recurs, re-walk the $\partial\mathbb Q=\mathbb R$ computation.

## Memory Hooks
- "Open is a pure declaration — a member of τ, no distance needed."
- "A nonempty set can still have an empty interior — sometimes nothing open fits inside."
- "Boundary can be the whole space — when both a set and its complement are dense."

## Transfer Connections
- `math.top.topological-space` (already authored, this campaign, Batch 180): supplies the
  topology $\tau$ and its three axioms this concept's open/closed definitions directly reuse.
- `math.real.open-sets` (already authored, certified domain, genuine cross-link): supplies the
  metric-ball-based definitions this concept's topological definitions directly generalize, shown
  to agree exactly when $\tau$ is the metric topology.
- `math.top.interior-closure`, `math.top.connectedness` (not yet authored, KG's declared
  unlocks): the deeper interior/closure treatment and the disjoint-open-set-based connectedness
  definition this concept's open-set vocabulary directly enables.

## Cross-Subject Connections
- Real analysis: the standard topology on $\mathbb R$, where the topological and metric
  definitions of open/closed/interior/closure/boundary coincide exactly.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.open-sets.md`, reused by reference for
  its metric-free open/closed-set computation, its empty-interior example, its thin-versus-whole-
  space boundary contrast, and its three-misconception registry (severity levels adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe against `math.real.open-sets`, showing the
  purely topological definitions recover exactly the same open/closed sets as the ball-based
  definitions when $\tau$ is the metric topology, and computing $\text{int}([0,1))$ and
  $\text{cl}([0,1))$ to confirm why $[0,1)$ is neither open nor closed.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.topological-space`, unlocks `math.top.interior-closure`/`math.top.connectedness`,
  cross_links `math.real.open-sets`, expert/understand, mastery_threshold 0.9,
  estimated_hours 4) was directly verified against the live KG and matches exactly.
  `math.real.open-sets` independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 181): authored. First entry this batch. Companion batch concept:
  `math.cat.functor`.

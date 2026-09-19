# math.real.connectedness

## Identity
- **KG id**: `math.real.connectedness`
- **Domain**: math.real
- **Requires**: `math.real.open-sets`
- **Unlocks**: `math.real.ivt`
- **Cross-links**: `math.top.connectedness` (NOT yet authored — confirmed via `ls`; independence
  mode used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Define $E$ as CONNECTED iff it cannot be written as a union of two nonempty SEPARATED sets $A,B$
(meaning $A\cap\bar B=\varnothing$ AND $\bar A\cap B=\varnothing$) — a precise, closure-based
condition, never a merely informal "no visible gap" intuition; apply the theorem that INTERVALS
in $\mathbb R$ are the ONLY connected subsets, recognizing a set can fail to be an interval, hence
fail to be connected, even without an obviously "missing" member point; and derive the
INTERMEDIATE VALUE THEOREM directly from connectedness-preservation under continuous maps, rather
than as an independently-proven fact.

## Core Understanding
SEPARATION IS A PRECISE CLOSURE-BASED CONDITION, NEVER JUST "LOOKS SPLIT": for $E=[0,1]\cup[2,3]$,
set $A=[0,1]$, $B=[2,3]$. $\bar A=[0,1]$, $\bar B=[2,3]$. $A\cap\bar B=\varnothing$ and
$\bar A\cap B=\varnothing$ — both intersections genuinely empty, so $A,B$ are SEPARATED and $E$ is
NOT connected, confirmed via the formal closure check (not merely the visual gap between 1 and 2,
though that intuition happens to align here).

A SET CAN FAIL TO BE AN INTERVAL WITHOUT AN OBVIOUSLY MISSING MEMBER: for $\mathbb Q\subset
\mathbb R$, let $A=\mathbb Q\cap(-\infty,\sqrt2)$, $B=\mathbb Q\cap(\sqrt2,\infty)$. Since
$\sqrt2$ is irrational, every rational lies in exactly one set, so $A\cup B=\mathbb Q$. Checking
separation: $\bar B=[\sqrt2,\infty)$ and $A\cap\bar B=\varnothing$; $\bar A=(-\infty,\sqrt2]$ and
$\bar A\cap B=\varnothing$ — separated, so $\mathbb Q$ is NOT connected, split at $\sqrt2$ even
though $\sqrt2\notin\mathbb Q$ itself. A genuine interval like $[0,1]$ resists every such
splitting attempt at any point.

THE INTERMEDIATE VALUE THEOREM FALLS OUT DIRECTLY, WITH NO SEPARATE PROOF TECHNIQUE: for
continuous $f:[a,b]\to\mathbb R$ with $f(a)<0<f(b)$: $[a,b]$ is connected (a genuine interval).
Continuous maps preserve connectedness, so $f([a,b])$ is connected — and since intervals are the
ONLY connected subsets of $\mathbb R$, $f([a,b])$ must itself be an interval, hence contains every
value between $f(a)$ and $f(b)$, including 0. So some $c\in[a,b]$ has $f(c)=0$ — derived entirely
from connectedness-preservation plus the intervals-only theorem, no IVT-specific argument needed.

## Mental Models
- **"Connectedness isn't about how a set looks — it's about whether its pieces' closures can be
  kept from touching each other at all."**
- **"IVT isn't a separate fact to memorize — it's connectedness showing up in disguise, once you
  already know intervals are the only connected sets in ℝ."**

## Why Students Fail

### MC-1: CONNECTEDNESS-AS-INFORMAL-VISUAL-NOTION
- **Surface form**: believes a set's connectedness is decided by visually spotting a "gap."
- **Birth type**: Foundational severity (Blueprint's own declared severity — the informal visual
  intuition is the natural first read of "connected," obscuring the precise closure-based
  definition).
- **Repair**: re-walk the $[0,1]\cup[2,3]$ closure computation, re-anchoring on separation as a
  closure condition, not a visual one.

### MC-2: DISCONNECTION-ASSUMED-TO-REQUIRE-A-MEMBER-GAP
- **Surface form**: believes a disconnected set must have an obviously "missing" point that is
  itself a member of the ambient space.
- **Birth type**: Foundational severity (Blueprint's own declared severity — most first examples
  of non-intervals have an obvious missing member, making this pattern feel universal).
- **Repair**: re-walk $\mathbb Q$'s split at the irrational $\sqrt2$, re-anchoring on a splitting
  point never needing to belong to the set itself.

### MC-3: IVT-ASSUMED-TO-NEED-INDEPENDENT-PROOF
- **Surface form**: believes IVT requires its own dedicated proof technique, separate from
  connectedness theory.
- **Birth type**: Moderate severity (Blueprint's own declared severity — IVT is often taught
  before connectedness, establishing it as a standalone fact needing its own proof).
- **Repair**: re-walk the direct derivation from connectedness-preservation and the intervals-only
  theorem.

## Misconceptions

### MC-1: CONNECTEDNESS-AS-INFORMAL-VISUAL-NOTION
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: DISCONNECTION-ASSUMED-TO-REQUIRE-A-MEMBER-GAP
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: IVT-ASSUMED-TO-NEED-INDEPENDENT-PROOF
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Separated sets are like two crowds whose personal space bubbles never overlap — not just
  standing apart, but neither one's outer boundary ever brushes the other's."**
- **Anti-analogy**: a "missing point" splitting a set does NOT need to belong to the set itself —
  $\mathbb Q$ has no missing rational, yet is still split cleanly by an irrational entirely
  outside it.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $[0,1]\cup[2,3]$'s explicit closure computation confirming
  genuine separation.
- **Demonstration 2 (targets MC-2)**: $\mathbb Q$ split at the irrational $\sqrt2$, a point not
  even a member of $\mathbb Q$.
- **Demonstration 3 (targets MC-3)**: IVT derived in two steps from connectedness-preservation and
  the intervals-only theorem, no separate argument.

## Discovery Questions
1. "Is a set disconnected simply whenever you can visually identify a 'gap' in it?"
2. "Must a subset of ℝ that fails to be connected always have an obviously 'missing' point that
   is itself a member of that space?"
3. "Does the Intermediate Value Theorem require its own independent proof technique, separate
   from connectedness?"

## Teaching Sequence
1. **Representation shift**: the closure-based separation definition, working Demonstration 1's
   explicit computation, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's $\mathbb Q$-split-at-an-irrational case, isolating
   MC-2.
3. **Contrast pair**: Demonstration 3's two-step IVT derivation against treating IVT as an
   independent fact, isolating MC-3.
4. **Mastery gate**: require a correct separation-or-non-separation determination for a new set,
   a correct interval-versus-non-interval classification, and a correct IVT-style argument built
   from connectedness alone (without invoking IVT by name), at the Blueprint's own stated MAMR of
   4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept a connectedness judgment based on visual inspection alone, without a closure check.
- Never accept a claim that a disconnected set must have an obviously missing member point.
- Never accept IVT invoked as an independent fact rather than a consequence of connectedness.

## Voice Teaching Notes
- Say "did you check whether the closures actually touch, or just eyeball a gap?" whenever
  connectedness is being judged.
- When IVT is invoked, ask "can you derive that directly from connectedness, instead of citing
  IVT by name?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly performs a closure-based separation check for a new
  set.
- **Rung 2 (application)**: learner correctly identifies whether a new subset of $\mathbb R$ is
  an interval, and hence connected.
- **Rung 3 (transfer)**: learner correctly explains, for a physically disconnected two-piece rod,
  why a continuous temperature guarantee across the whole domain does NOT automatically transfer
  from the connectedness of each individual piece.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $[0,1]\cup[2,3]$ closure computation.
- If MC-2 recurs, re-walk $\mathbb Q$'s split at $\sqrt2$.
- If MC-3 recurs, re-walk the two-step IVT derivation from connectedness.

## Memory Hooks
- "Connectedness is decided by closures not touching — never by eyeballing a gap."
- "A splitting point never needs to belong to the set itself."
- "IVT is connectedness in disguise — not a separate fact needing its own proof."

## Transfer Connections
- `math.real.open-sets` (already authored, this campaign, Batch 125): supplies the open/closed
  set definitions and the closure operation this concept's separation definition directly uses.
- `math.real.compactness` (already authored, this campaign, Batch 126): the other declared unlock
  of `math.real.open-sets`, developed in parallel as a second major consequence of the open-set
  machinery.
- `math.real.ivt` (not yet authored): the KG's declared unlock, developing the Intermediate Value
  Theorem in its own dedicated concept, building directly on this concept's derivation.
- `math.top.connectedness` (not yet authored): the KG's declared cross-link target, generalizing
  the separation-based definition to arbitrary topological spaces without reference to a metric.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.connectedness.md`, reused by reference
  for its closure-based separation worked example, its $\mathbb Q$-splits-at-an-irrational
  conflict evidence, its direct IVT derivation, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying connectedness-preservation
  to a continuous temperature function along a metal rod, and explaining why the guarantee fails
  to transfer to a physically disconnected two-piece rod.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.open-sets`,
  unlocks `math.real.ivt`, cross_links `math.top.connectedness`, expert/understand,
  mastery_threshold 0.8, estimated_hours 4) was directly verified against the live KG and matches
  exactly. The Blueprint's own correctly-declared independence-mode P76 (cross-link target
  confirmed NOT authored via `ls`) required no correction.

## Version History
- 2026-09-19 (Batch 127): authored. Second entry this batch. Companion batch concept:
  `math.prob.lln`.

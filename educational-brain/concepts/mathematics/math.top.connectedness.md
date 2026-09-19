# math.top.connectedness

## Identity
- **KG id**: `math.top.connectedness`
- **Domain**: math.top
- **Requires**: `math.top.topological-space`
- **Unlocks**: none
- **Cross-links**: `math.real.connectedness`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define $X$ (or a subset) as connected iff it CANNOT be written as a union of two disjoint
nonempty OPEN sets (never requiring a metric or "separated sets" language at the definitional
level); reconcile this open-set definition with `math.real.connectedness`'s separated-sets
definition, showing they agree exactly in metric contexts; and distinguish connected from
path-connected — path-connected ALWAYS implies connected, but never conversely (the topologist's
sine curve is connected but not path-connected).

## Core Understanding
CONNECTEDNESS IS ABOUT THE IMPOSSIBILITY OF AN OPEN SPLIT — NEVER ABOUT A METRIC OR DISTANCE
DIRECTLY: for the finite space $X=\{a,b,c\}$ with $\tau=\{\emptyset,\{a\},\{a,b\},X\}$: checking
EVERY way to split $X$ into two disjoint nonempty subsets — $\{a\}\cup\{b,c\}$: is $\{b,c\}$ open?
Scanning $\tau$: no. $\{a,b\}\cup\{c\}$: is $\{a,b\}$ open? Yes — but is $\{c\}$ open? Scanning
$\tau$: no. Since NO split has BOTH pieces open, $X$ is connected. This exhaustive check used
purely the declared topology, zero distance reasoning.

THE OPEN-SET AND SEPARATED-SETS DEFINITIONS AGREE EXACTLY — NEVER TWO DIFFERENT NOTIONS: for
$E=[0,1]\cup[2,3]\subset\mathbb R$: via `math.real.connectedness`'s separated-sets route,
$[0,1]$ and $[2,3]$ have disjoint closures ($\text{cl}([0,1])=[0,1]$ misses $[2,3]$ entirely),
so $E$ is disconnected. Via THIS concept's open-set route: $[0,1]=E\cap(-1,1.5)$ and
$[2,3]=E\cap(1.5,4)$ are BOTH open in $E$'s subspace topology, disjoint, nonempty, and union to
$E$ — exhibiting the exact open split the definition asks for. Both routes reach the identical
verdict "disconnected" by two genuinely equivalent characterizations, never two different
concepts that happen to coincide by luck.

PATH-CONNECTED IMPLIES CONNECTED BUT NOT CONVERSELY — NEVER ASSUMED EQUIVALENT: the topologist's
sine curve $T=\{(x,\sin(1/x)):0<x\le1\}\cup(\{0\}\times[-1,1])$ is CONNECTED (it is the closure of
the connected curve piece, and closures of connected sets stay connected) but NOT
path-connected — no continuous path exists from a point on the oscillating curve to a point on
the vertical segment at $x=0$, because any such path's $x$-coordinate would have to pass through
increasingly rapid oscillations that prevent continuity at $x=0$. Path-connectedness is a
STRICTLY STRONGER property; connectedness alone never guarantees a path exists.

## Mental Models
- **"Connected means no way to split it into two open, disjoint, nonempty pieces — check every
  candidate split against the declared topology."**
- **"Open-set connectedness and separated-sets connectedness are the same fact seen two ways —
  never two competing definitions."**
- **"Path-connected is the stronger claim — it always drags connected along, but connected can
  stand alone."**

## Why Students Fail

### MC-1: CONNECTEDNESS-ASSUMED-TO-NEED-METRIC
- **Surface form**: believes connectedness can only be defined or checked using distance or a
  visual "one piece" intuition, missing the purely open-set-based topological definition.
- **Birth type**: Foundational severity (Blueprint's own declared severity — connectedness was
  first encountered via `math.real.connectedness`'s metric-space separated-sets framing).
- **Repair**: re-walk the exhaustive open-set-split check on the three-point space.

### MC-2: OPEN-SET-AND-SEPARATED-SETS-DEFINITIONS-ASSUMED-DIFFERENT
- **Surface form**: treats the open-set definition of connectedness and the separated-sets
  definition from `math.real.connectedness` as two unrelated notions that happen to sometimes
  agree, rather than provably equivalent characterizations.
- **Birth type**: High severity (Blueprint's own declared severity — the two definitions look
  syntactically unrelated without direct side-by-side verification).
- **Repair**: re-walk the $E=[0,1]\cup[2,3]$ example via BOTH routes, confirming the identical
  verdict.

### MC-3: CONNECTED-ASSUMED-EQUIVALENT-TO-PATH-CONNECTED
- **Surface form**: assumes connected and path-connected are the same property, missing that
  path-connected is strictly stronger.
- **Birth type**: High severity (Blueprint's own declared severity — most familiar examples
  (intervals, disks) are both, obscuring the gap until a genuine counterexample is seen).
- **Repair**: re-walk the topologist's sine curve as a connected-but-not-path-connected witness.

## Misconceptions

### MC-1: CONNECTEDNESS-ASSUMED-TO-NEED-METRIC
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: OPEN-SET-AND-SEPARATED-SETS-DEFINITIONS-ASSUMED-DIFFERENT
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: CONNECTED-ASSUMED-EQUIVALENT-TO-PATH-CONNECTED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A connected space is a sheet of paper that can't be cut into two open, disjoint scraps —
  check every proposed cut against the declared topology, not against a picture."**
- **Anti-analogy**: connected does not mean "you can walk between any two points" — the
  topologist's sine curve is one unbroken piece by the open-set test, yet no continuous walk
  crosses its gap.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the exhaustive open-set-split check on the three-point
  space $X=\{a,b,c\}$.
- **Demonstration 2 (targets MC-2)**: the $E=[0,1]\cup[2,3]$ disconnection shown via BOTH the
  separated-sets route and the open-set route, side by side.
- **Demonstration 3 (targets MC-3)**: the topologist's sine curve as connected but not
  path-connected, with components of $E=[0,1]\cup[2,3]$ identified as $[0,1]$ and $[2,3]$.

## Discovery Questions
1. "Can connectedness only be checked using distance, or is there a purely open-set-based test?"
2. "Are the open-set definition of connectedness and the separated-sets definition really the
   same fact, or two different notions that just happen to agree sometimes?"
3. "Does connected mean the same thing as path-connected?"

## Teaching Sequence
1. **Representation shift**: the exhaustive open-set-split check on a finite space, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the dual-route verification on $E=[0,1]\cup[2,3]$, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the topologist's sine curve counterexample, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct open-set-split determination on a finite or interval
   example, a correct reconciliation with the separated-sets definition, and a correct
   identification that path-connected implies but is not implied by connected, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept connectedness checked or defined purely via distance or visual "one piece"
  intuition without the open-set-split test.
- Never accept the open-set and separated-sets definitions treated as unrelated rather than
  provably equivalent.
- Never accept connected and path-connected treated as equivalent properties.

## Voice Teaching Notes
- Say "is there any way to split this into two disjoint, nonempty OPEN pieces?" whenever
  connectedness is being checked.
- Ask "does this route agree with the separated-sets route from real analysis?" whenever the
  open-set definition is applied to a metric-space example.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly performs the exhaustive open-set-split check on a
  finite space.
- **Rung 2 (application)**: learner correctly determines connectedness of a subspace of $\mathbb
  R$ via the open-set route and reconciles it with the separated-sets route.
- **Rung 3 (transfer)**: learner correctly explains why the topologist's sine curve is connected
  but not path-connected, and identifies the components of a disconnected space.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the open-set-split check on the three-point space.
- If MC-2 recurs, re-walk the $E=[0,1]\cup[2,3]$ dual-route verification.
- If MC-3 recurs, re-walk the topologist's sine curve counterexample.

## Memory Hooks
- "Connected means no open, disjoint, nonempty split exists — check the declared topology."
- "Open-set and separated-sets connectedness are one fact seen two ways."
- "Path-connected always implies connected — never the reverse."

## Transfer Connections
- `math.top.topological-space` (already authored, this campaign, Batch 180): supplies the
  topology $\tau$ this concept's open-set-split test is stated directly in terms of.
- `math.real.connectedness` (already authored, certified domain, genuine cross-link): supplies
  the separated-sets definition this concept's open-set definition is shown to agree with exactly
  in metric contexts.

## Cross-Subject Connections
- Real analysis: the Intermediate Value Theorem, whose proof relies on the connectedness of
  intervals in $\mathbb R$.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.connectedness.md`, reused by reference
  for its exhaustive finite-space open-set-split check, its dual-route $E=[0,1]\cup[2,3]$
  verification, its topologist's sine curve counterexample, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe against `math.real.connectedness`, showing
  the open-set and separated-sets definitions of connectedness are provably equivalent for
  subspaces of $\mathbb R$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.topological-space`, unlocks none, cross_links `math.real.connectedness`,
  expert/understand, mastery_threshold 0.85, estimated_hours 4) was directly verified against the
  live KG and matches exactly. `math.real.connectedness` independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 182): authored. First entry this batch. Companion batch concept:
  `math.top.interior-closure`.

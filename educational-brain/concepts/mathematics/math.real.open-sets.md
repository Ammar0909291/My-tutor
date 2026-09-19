# math.real.open-sets

## Identity
- **KG id**: `math.real.open-sets`
- **Domain**: math.real
- **Requires**: `math.real.metric-space`
- **Unlocks**: `math.real.compactness`, `math.real.connectedness`
- **Cross-links**: `math.top.open-sets` (NOT yet authored — confirmed via `ls`; independence mode
  used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Define the open ball $B(x,r)=\{y\in X:d(x,y)<r\}$ and a set $U$ as OPEN iff every point of $U$ is
an INTERIOR POINT (some ball around it fits inside $U$); define $C$ as CLOSED iff its complement
is open, equivalently iff $C$ contains ALL its limit points; and recognize open and closed are
NOT complementary categories — a set can be NEITHER or BOTH — defining the CLOSURE as the smallest
closed set containing $S$.

## Core Understanding
OPEN MEANS EVERY POINT HAS SOME BALL FITTING ENTIRELY INSIDE — THE RADIUS CAN SHRINK PER POINT:
for $U=(2,5)$ in $\mathbb R$: at $x=4.9$, choosing $r=0.05$ gives $B(4.9,0.05)=(4.85,4.95)\subseteq
(2,5)$. In general, $r=\min(x-2,5-x)$ (distance to the nearer endpoint) always works — the radius
is allowed to SHRINK as $x$ approaches an endpoint, which is fine: the definition requires only
SOME radius per point, never one uniform radius for the whole set.

CLOSED MEANS THE COMPLEMENT IS OPEN, EQUIVALENTLY EVERY LIMIT POINT IS ALREADY INCLUDED: for
$C=[0,1]$: its complement $(-\infty,0)\cup(1,\infty)$ is a union of open intervals, hence open, so
$C$ is closed. Equivalently: every limit point of $[0,1]$ (points every ball around which
intersects $[0,1]$) — including 0 and 1 themselves — is already IN $[0,1]$; no point outside like
1.5 has this property once its ball is small enough.

OPEN AND CLOSED ARE NOT COMPLEMENTARY CATEGORIES — A SET CAN BE NEITHER OR BOTH: $S=[0,1)$ is
NEITHER: not open (every ball around $x=0$ contains negative numbers, so 0 isn't interior), and
not closed (1 is a limit point but $1\notin S$). Conversely, $\emptyset$ and the whole space $X$
are BOTH open and closed in ANY metric space, vacuously. The CLOSURE $\bar S$ is the SMALLEST
closed set containing $S$ — never just ANY closed superset: $[0,2]$ is A closed superset of
$(0,1)$, but the closure is specifically $[0,1]$, since no smaller closed set still contains
$(0,1)$.

## Mental Models
- **"Open means every point has breathing room — a small enough ball around it never pokes
  outside, even if that ball must shrink near the edges."**
- **"Open and closed are two SEPARATE yes/no questions, never one either/or classification — a
  set can fail both, or pass both."**

## Why Students Fail

### MC-1: OPEN-CLOSED-ASSUMED-EXHAUSTIVE-DICHOTOMY
- **Surface form**: believes every set must be classifiable as exactly one of open or closed,
  missing "neither" and "both" as genuinely possible.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Foundational severity —
  "open" and "closed" sound like natural opposites in everyday language, as with an open or
  closed door).
- **Repair**: re-walk $[0,1)$'s explicit failure of BOTH definitions, re-anchoring on them as
  separate tests.

### MC-2: CLOSURE-CONFUSED-WITH-ANY-CLOSED-SUPERSET
- **Surface form**: believes any closed set containing $S$ qualifies as "the closure," rather than
  specifically the smallest such closed set.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — "a
  closed set containing $S$" is easy to treat as sufficient without checking minimality).
- **Repair**: re-derive by checking whether a strictly smaller closed set containing $S$ exists.

### MC-3: LIMIT-POINT-REQUIRES-SET-MEMBERSHIP
- **Surface form**: believes a point must already belong to $C$ to be considered a "limit point"
  of $C$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Moderate severity — "limit
  point OF $C$" linguistically suggests membership in $C$, obscuring that the point can be
  entirely outside $C$).
- **Repair**: re-anchor on the definition — a limit point is about every ball intersecting the
  set, unrelated to whether the point itself is a member.

## Misconceptions

### MC-1: OPEN-CLOSED-ASSUMED-EXHAUSTIVE-DICHOTOMY
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: CLOSURE-CONFUSED-WITH-ANY-CLOSED-SUPERSET
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: LIMIT-POINT-REQUIRES-SET-MEMBERSHIP
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An open set is a room with no touchable walls — stand anywhere inside, and there's always
  some safety margin, however small, before you'd hit a boundary that isn't there."**
- **Anti-analogy**: "open" and "closed" are NOT a light-switch pair — most sets in practice are
  neither, and the empty set and whole space are both simultaneously.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $[0,1)$ fails BOTH the interior-point test (at $x=0$) and
  the limit-point test (missing $1$) — genuinely neither open nor closed.
- **Demonstration 2 (targets MC-2)**: $[0,2]\supsetneq(0,1)$ is A closed superset, but the closure
  of $(0,1)$ is specifically $[0,1]$, the smallest one.
- **Demonstration 3 (targets MC-3)**: $1$ is a limit point of $[0,1)$ even though $1\notin[0,1)$ —
  membership is irrelevant to the limit-point definition.

## Discovery Questions
1. "Is [0,1) open, closed, both, or neither?"
2. "Is any closed superset of a set S automatically 'the closure' of S?"
3. "Must a point already belong to C to be a limit point of C?"

## Teaching Sequence
1. **Representation shift**: the open-ball/interior-point definition, working Example 1's explicit
   radius construction, isolating MC-1 via the "is [0,1) open or closed?" hook.
2. **Contrast pair**: Demonstration 1's neither-open-nor-closed verification and Demonstration 2's
   smallest-closed-superset distinction, isolating MC-1 and MC-2 respectively.
3. **Conceptual anchor**: Demonstration 3's limit-point-without-membership example, isolating MC-3.
4. **Mastery gate**: require a correct openness verification for a new interval, a correct
   closedness verification via either the complement or limit-point route, a correct open/closed/
   neither/both classification, and a correct closure computation, at the Blueprint's own stated
   MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a set forced into exactly one of open/closed without checking both definitions
  independently.
- Never accept an arbitrary closed superset presented as "the closure."
- Never accept a limit point rejected solely because it's not a member of the set.

## Voice Teaching Notes
- Say "did you check both open and closed separately, or assume it must be one or the other?"
  whenever a set's classification is discussed.
- When a closure is computed, ask "is that the SMALLEST closed set containing it, or just A
  closed superset?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies whether a new set is open via the
  interior-point definition.
- **Rung 2 (application)**: learner correctly classifies a new set as open, closed, neither, or
  both, justifying via both definitions.
- **Rung 3 (transfer)**: learner correctly identifies a strict-versus-non-strict inequality
  boundary (e.g. a delivery zone $<10$km vs $\le10$km) as the exact mechanism distinguishing open
  from closed, and correctly computes the closure relationship between the two.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk $[0,1)$'s explicit failure of both definitions.
- If MC-2 recurs, re-check for a strictly smaller closed superset.
- If MC-3 recurs, re-anchor on the ball-intersection definition, independent of membership.

## Memory Hooks
- "Open and closed are two separate questions — never assume every set must answer one of them
  'yes.'"
- "The closure is the SMALLEST closed superset — not just any closed superset."
- "A limit point need not belong to the set — only every ball around it must intersect the set."

## Transfer Connections
- `math.real.metric-space` (already authored, this campaign, Batch 124): supplies the metric $d$
  and the space $(X,d)$ this concept's balls, interior points, and limit points are all defined
  relative to.
- `math.real.compactness` (not yet authored): the KG's declared unlock, defined via open covers,
  building directly on this concept's open-set definition.
- `math.real.connectedness` (not yet authored): the KG's declared unlock, defined via the
  impossibility of splitting a space into two disjoint nonempty open sets.
- `math.top.open-sets` (not yet authored): the KG's declared cross-link target, where "open" is
  taken as a primitive axiom rather than derived from a metric — this concept's ball-based
  treatment is exactly the motivating special case.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.open-sets.md`, reused by reference for
  its interior-point openness verification, its complement/limit-point closedness equivalence, its
  neither-open-nor-closed counterexample, its closure-as-smallest-superset distinction, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, examining a delivery zone's
  strict-versus-non-strict distance boundary and its relationship to closure.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.metric-
  space`, unlocks `math.real.compactness`/`math.real.connectedness`, cross_links `math.top.open-
  sets`, expert/understand, mastery_threshold 0.9, estimated_hours 5) was directly verified
  against the live KG and matches exactly. The Blueprint's own correctly-declared independence-
  mode P76 (cross-link target confirmed NOT authored via `ls`) required no correction.

## Version History
- 2026-09-19 (Batch 125): authored. Second entry this batch. Companion batch concept:
  `math.prob.chebyshev`.

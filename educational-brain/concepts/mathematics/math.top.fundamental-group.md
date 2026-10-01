# math.top.fundamental-group

## Identity
- **KG id**: `math.top.fundamental-group`
- **Domain**: math.top
- **Requires**: `math.top.homotopy`, `math.abst.group-theory`
- **Unlocks**: `math.top.covering-space`, `math.top.van-kampen`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 7

## Learning Objective
Define a loop based at $x_0$ and $\pi_1(X,x_0)$ as based homotopy classes of such loops — a
STRICTER refinement of `math.top.homotopy`'s ordinary homotopy, requiring $H(0,t)=H(1,t)=x_0$ for
EVERY $t$ (never just at $t=0,1$); define the group operation via concatenation, recognizing
associativity holds only UP TO based homotopy (never as literal function equality, exactly why
$\pi_1$'s elements are classes $[\gamma]$); and apply the computed values
$\pi_1(S^1)\cong\mathbb Z$, $\pi_1(S^n)=0$ ($n\ge2$), $\pi_1(T^2)\cong\mathbb Z^2$, recognizing
"simply connected" as ruling out ONLY loop-detectable 1-dimensional holes (never all interesting
topology).

## Core Understanding
LOOP HOMOTOPY REQUIRES THE BASEPOINT TO STAY FIXED THROUGHOUT — NEVER JUST AT THE TWO ENDPOINTS:
on $S^1$ with $x_0=(1,0)$, $\gamma(s)=(\cos2\pi s,\sin2\pi s)$: the "rotate the whole loop"
candidate $H(s,t)=(\cos2\pi(s+t),\sin2\pi(s+t))$ satisfies the PLAIN endpoint conditions
$H(s,0)=\gamma(s)$, $H(s,1)=\gamma(s)$ perfectly. But checking $H(0,t)=(\cos2\pi t,\sin2\pi t)$:
at $t=1/2$, $H(0,1/2)=(-1,0)\ne x_0$ — the basepoint SWEEPS all the way around the circle. Despite
satisfying `math.top.homotopy`'s plain conditions, this $H$ is NOT a valid BASED homotopy — the
stricter requirement $H(0,t)=H(1,t)=x_0$ for EVERY $t$ fails.

CONCATENATION IS ASSOCIATIVE ONLY UP TO BASED HOMOTOPY — NEVER AS LITERAL FUNCTION EQUALITY: for
three loops $\gamma_1,\gamma_2,\gamma_3$: $(\gamma_1\ast\gamma_2)\ast\gamma_3$ traverses them on
$[0,\frac14],[\frac14,\frac12],[\frac12,1]$, while $\gamma_1\ast(\gamma_2\ast\gamma_3)$ traverses
them on $[0,\frac12],[\frac12,\frac34],[\frac34,1]$ — DIFFERENT breakpoint schedules, DIFFERENT
functions of $s$ (they disagree at, e.g., $s=0.3$). They ARE based-homotopic (a reparametrization
homotopy slides the breakpoints continuously, every intermediate stage still a valid loop based at
$x_0$) — but NEVER literally equal as functions. This is EXACTLY why `math.abst.group-theory`'s
associativity axiom is verified for homotopy CLASSES $[\gamma]$, never for individual loops.

SIMPLY CONNECTED RULES OUT ONLY LOOP-DETECTABLE 1D HOLES — NEVER ALL INTERESTING TOPOLOGY:
$\pi_1(S^2)=0$ (simply connected — every loop on the sphere can be shrunk to a point, since there's
enough "room" to slide any loop to one side). But $S^2$ is NOT devoid of interesting topological
structure — $\pi_1$ specifically detects only the kind of "hole" a 1-dimensional loop can wrap
around and get stuck on; a simply connected space can carry OTHER, higher-dimensional topological
features entirely invisible to $\pi_1$ alone (e.g. $S^2$'s nontrivial second homotopy group
$\pi_2(S^2)\ne0$).

## Mental Models
- **"A loop homotopy must keep the basepoint pinned down at every single moment — matching the
  loop only at the start and end of the deformation isn't enough."**
- **"Concatenated loops with different timing schedules are different functions, but the same
  π₁-element — the group axioms live at the level of homotopy classes, never individual loops."**
- **"Simply connected means no loop can get stuck — it says nothing about holes a loop simply
  cannot detect."**

## Why Students Fail

### MC-1: BASEPOINT-DRIFT-IN-LOOP-HOMOTOPY-OVERLOOKED
- **Surface form**: believes any homotopy $H$ satisfying the plain endpoint conditions is
  automatically a valid loop homotopy, without checking $H(0,t)=H(1,t)=x_0$ for every $t$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the plain
  `math.top.homotopy` endpoint check is the most recently learned pattern, inviting reuse without
  the stricter addition).
- **Repair**: re-walk the rotating-loop candidate, showing $H(0,t)$ sweeping around the whole
  circle despite valid plain endpoints.

### MC-2: CONCATENATION-ASSOCIATIVITY-TREATED-AS-LITERAL-EQUALITY
- **Surface form**: believes $(\gamma_1\ast\gamma_2)\ast\gamma_3$ and
  $\gamma_1\ast(\gamma_2\ast\gamma_3)$ must be the exact same function of $s$, missing that
  associativity holds only up to based homotopy.
- **Birth type**: Foundational severity (Blueprint's own declared severity — group axioms are
  usually first learned for literal set elements, not homotopy classes).
- **Repair**: re-walk the differing breakpoint schedules and the reparametrization homotopy
  connecting them.

### MC-3: SIMPLY-CONNECTED-OVERGENERALIZED-TO-NO-TOPOLOGY-AT-ALL
- **Surface form**: believes a trivial $\pi_1$ means a space has no interesting topological
  structure at all, rather than specifically no loop-detectable 1-dimensional holes.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "simply connected"
  sounds like a blanket statement about the whole space's topology).
- **Repair**: re-state the $S^2$ contrast — simply connected, yet not devoid of all topological
  structure.

## Misconceptions

### MC-1: BASEPOINT-DRIFT-IN-LOOP-HOMOTOPY-OVERLOOKED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONCATENATION-ASSOCIATIVITY-TREATED-AS-LITERAL-EQUALITY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: SIMPLY-CONNECTED-OVERGENERALIZED-TO-NO-TOPOLOGY-AT-ALL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A loop-homotopy is a leashed dog's walk — the leash (the basepoint) must stay pinned to the
  same post at every moment, not just when the walk starts and ends."**
- **Anti-analogy**: differently-timed concatenations are not the same walk retraced — they are
  genuinely different functions that happen to belong to the same equivalence class, the only
  level at which the group axioms hold.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the "rotate the whole loop" candidate on $S^1$, satisfying
  plain endpoints but drifting the basepoint.
- **Demonstration 2 (targets MC-2)**: the differing breakpoint schedules of
  $(\gamma_1\ast\gamma_2)\ast\gamma_3$ versus $\gamma_1\ast(\gamma_2\ast\gamma_3)$, reconciled via
  reparametrization homotopy.
- **Demonstration 3 (targets MC-3)**: the $\pi_1(S^1)\cong\mathbb Z$-versus-$\pi_1(S^2)=0$
  contrast, with $S^2$'s simple connectivity not implying trivial topology overall.

## Discovery Questions
1. "If $H(s,0)=\gamma_1(s)$ and $H(s,1)=\gamma_2(s)$ both check out, is $H$ automatically a valid
   based homotopy for computing $\pi_1$?"
2. "Are $(\gamma_1\ast\gamma_2)\ast\gamma_3$ and $\gamma_1\ast(\gamma_2\ast\gamma_3)$ the exact
   same function of $s$?"
3. "If a space is simply connected, does that mean it has no interesting topological features of
   any kind?"

## Teaching Sequence
1. **Representation shift**: the stricter based-homotopy condition introduced against
   `math.top.homotopy`'s plain version, working Example 1's straight-line shrink.
2. **Conflict evidence**: the rotating-loop basepoint-drift counterexample, working
   Demonstration 1, isolating MC-1.
3. **Contrast pair**: the reparametrization-homotopy associativity argument, working
   Demonstration 2, isolating MC-2; the $S^1$-versus-$S^2$ simply-connected scope caution, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct based-homotopy verification with the stricter condition
   checked explicitly, a correct explanation of why associativity only holds up to homotopy, and
   a correct statement of $\pi_1(S^1)$'s value with its winding-number interpretation, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a loop homotopy verified only by `math.top.homotopy`'s plain endpoint conditions,
  without checking the basepoint stays fixed at every $t$.
- Never accept a claim that differently-scheduled concatenations must be literally identical
  functions.
- Never accept "simply connected" generalized to mean a space has no interesting topology at all.

## Voice Teaching Notes
- Say "does the basepoint stay fixed at EVERY t, not just t=0 and t=1?" whenever a loop homotopy
  is verified.
- Ask "is that a statement about the loops as functions, or about their homotopy classes?"
  whenever a group axiom is checked for $\pi_1$.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies a based homotopy, checking the stricter
  fixed-basepoint condition explicitly.
- **Rung 2 (application)**: learner correctly explains why concatenation associativity holds only
  up to based homotopy, not literal equality.
- **Rung 3 (transfer)**: learner correctly applies $\pi_1(S^1)\cong\mathbb Z$ and correctly
  explains why simple connectivity doesn't imply the absence of all interesting topology.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the rotating-loop basepoint-drift example.
- If MC-2 recurs, re-walk the breakpoint-schedule reparametrization homotopy.
- If MC-3 recurs, re-state the $S^1$-versus-$S^2$ contrast.

## Memory Hooks
- "Loop homotopy pins the basepoint at every t — not just the start and end."
- "π₁'s group axioms live at the level of homotopy classes, not individual loops."
- "Simply connected rules out loop-shaped holes only — never all of a space's topology."

## Transfer Connections
- `math.top.homotopy` (already authored, this campaign, Batch 187): supplies the ordinary
  homotopy $H(x,t)$ and endpoint conditions this concept strengthens into the based/loop-homotopy
  condition.
- `math.abst.group-theory` (already authored, certified domain): supplies the four group axioms
  this concept verifies hold for $\pi_1(X,x_0)$ under concatenation, at the level of homotopy
  classes.
- `math.top.covering-space` (not yet authored, KG's declared unlock): the machinery that actually
  proves computed values like $\pi_1(S^1)\cong\mathbb Z$, deferred here at orientation level.
- `math.top.van-kampen` (not yet authored, KG's declared unlock): a theorem for computing $\pi_1$
  of spaces built by gluing simpler pieces together.

## Cross-Subject Connections
- Robotics: modeling a robot's patrol routes around obstacles as based loops, with $\pi_1$
  classifying which routes are "the same" topologically.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.fundamental-group.md`, reused by
  reference for its rotating-loop basepoint-drift counterexample, its breakpoint-schedule
  reparametrization argument, its $\pi_1(S^1)/\pi_1(S^n)/\pi_1(T^2)$ computed values, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe modeling a robot's patrol routes
  around factory pillars as based loops, connecting one-pillar and two-pillar cases to
  $\pi_1(S^1)\cong\mathbb Z$ and $\pi_1(T^2)\cong\mathbb Z^2$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.homotopy`/`math.abst.group-theory`, unlocks
  `math.top.covering-space`/`math.top.van-kampen`, cross_links none, expert/apply,
  mastery_threshold 0.75, estimated_hours 7) was directly verified against the live KG and
  matches exactly. `math.abst.group-theory` independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 188): authored. First entry this batch. Companion batch concept:
  `math.top.homotopy-equivalence`.

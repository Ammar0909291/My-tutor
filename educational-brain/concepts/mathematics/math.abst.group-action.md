# math.abst.group-action

## Identity
- **KG id**: `math.abst.group-action`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`, `math.found.function-set-theoretic`
- **Unlocks**: `math.abst.sylow-theorems`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Define a GROUP ACTION of $G$ on $X$ as a map $G\times X\to X$ (written $g\cdot x$) satisfying BOTH
the identity axiom ($e\cdot x=x$) and the compatibility axiom ($g\cdot(h\cdot x)=(gh)\cdot x$), and
verify a specific map satisfies both directly, reusing `math.found.function-set-theoretic`'s own
verify-by-checking-cases procedure; define the ORBIT $Gx$ and STABILIZER $G_x$, compute both for a
specific action, and verify $G_x$ is ALWAYS a genuine SUBGROUP; and state and numerically verify
the ORBIT-STABILIZER THEOREM, $|Gx|\cdot|G_x|=|G|$.

## Core Understanding
TWO AXIOMS, BOTH REQUIRED: a group action of $G$ on a set $X$ is a map $G\times X\to X$, written
$g\cdot x$, satisfying BOTH: (i) IDENTITY — $e\cdot x=x$ for every $x\in X$ (the group's identity
element does nothing); (ii) COMPATIBILITY — $g\cdot(h\cdot x)=(gh)\cdot x$ for all $g,h\in G$
(applying $h$ then $g$ matches applying the single combined element $gh$). Verifying these axioms
for a specific proposed action means checking specific cases directly, exactly as `math.found.
function-set-theoretic` verifies any claimed function's defining properties — a map satisfying
only ONE of the two axioms is NOT a genuine group action.

ORBIT AND STABILIZER, AND THE STABILIZER'S SUBGROUP STRUCTURE: the ORBIT of $x$, $Gx=\{gx:g\in
G\}$, collects every place $x$ can be sent by some group element — all the "positions" $x$ can
reach under the action. The STABILIZER of $x$, $G_x=\{g\in G:gx=x\}$, collects every group element
that leaves $x$ fixed. Crucially, $G_x$ is NOT just an arbitrary subset — it is ALWAYS a genuine
SUBGROUP of $G$: it contains $e$ (by the identity axiom), is closed under the group operation (if
$g,h$ both fix $x$, so does $gh$, by compatibility), and closed under inverses (if $g$ fixes $x$,
so does $g^{-1}$).

ORBIT-STABILIZER: ORBIT SIZE AND STABILIZER SIZE ARE LINKED, NOT INDEPENDENT: the Orbit-Stabilizer
theorem states $|Gx|\cdot|G_x|=|G|$ — for ANY element $x$, the orbit size and stabilizer size
MULTIPLY to give exactly the group's own size. This is a genuine multiplicative constraint: a
LARGER orbit forces a correspondingly SMALLER stabilizer (and vice versa), for the same group
acting on different elements — the two quantities are never free to vary independently.

## Mental Models
- **"A group action needs BOTH axioms verified — checking identity says nothing about
  compatibility, and vice versa."**
- **"The stabilizer isn't just a collection of elements that happen to fix a point — it's
  guaranteed to be a genuine subgroup, every time."**
- **"Orbit size times stabilizer size always equals $|G|$ exactly — a bigger orbit forces a
  smaller stabilizer."**

## Why Students Fail

### MC-1: ONLY-ONE-GROUP-ACTION-AXIOM-VERIFIED
- **Surface form**: believing verifying only the identity axiom (or only compatibility) is
  sufficient to confirm a genuine group action, missing that BOTH must hold.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity — the
  identity axiom is often the easier, more intuitive check, and its confirmation is mistaken for
  a complete verification, when the compatibility axiom is a genuinely SEPARATE condition).
- **Repair**: re-attempt the specific map's compatibility-axiom check directly, for a case where
  identity alone was already confirmed.

### MC-2: STABILIZER-ASSUMED-ARBITRARY-SUBSET
- **Surface form**: believing the stabilizer $G_x$ is just an arbitrary subset of $G$, missing
  that it is always guaranteed to be a genuine subgroup.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity — the
  stabilizer's DEFINITION (a set of elements satisfying a condition) resembles an arbitrary subset
  definition, obscuring that the group-action axioms FORCE it to additionally satisfy the subgroup
  criteria).
- **Repair**: re-attempt the specific stabilizer's subgroup verification directly (identity,
  closure, inverses all checked).

### MC-3: ORBIT-AND-STABILIZER-SIZES-ASSUMED-INDEPENDENT
- **Surface form**: believing orbit size and stabilizer size are independent, unrelated
  quantities, missing the Orbit-Stabilizer theorem's precise multiplicative constraint.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity — the
  two quantities are computed via seemingly unrelated procedures — reachability vs. fixing — so
  their forced numerical relationship is not obviously anticipated).
- **Repair**: re-attempt the specific numerical verification directly, confirming $|Gx|\cdot
  |G_x|=|G|$ for the case in question.

## Misconceptions

### MC-1: ONLY-ONE-GROUP-ACTION-AXIOM-VERIFIED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: STABILIZER-ASSUMED-ARBITRARY-SUBSET
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ORBIT-AND-STABILIZER-SIZES-ASSUMED-INDEPENDENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A group action is like a remote control operating a robot arm — 'do nothing' (identity) must
  work, and pressing two buttons in sequence must match pressing the single combined button
  (compatibility); missing either check means the remote isn't genuinely wired correctly."**
- **Anti-analogy**: the stabilizer is NOT "whichever elements happen to fix $x$, with no further
  guaranteed structure" — it is FORCED to be a subgroup by the action's own axioms.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $D_3=\{e,r,r^2,s,sr,sr^2\}$ acting on the triangle's
  vertices $\{1,2,3\}$: identity axiom $e\cdot1=1$ ✓; compatibility for $g=r,h=s,x=1$:
  $r\cdot(s\cdot1)=r\cdot1=2$, and $(rs)\cdot1=2$ (composing functions) — MATCHES exactly,
  confirming compatibility for this specific case, a genuinely separate check from identity.
- **Demonstration 2 (targets MC-2)**: orbit of vertex 1 under $D_3$: $G\cdot1=\{1,2,3\}$ (all
  three vertices reachable); stabilizer $G_1=\{g:g\cdot1=1\}=\{e,s\}$; verified as a genuine
  subgroup — contains $e$ ✓, closed ($s\cdot s=s^2=e\in G_1$) ✓, closed under inverses
  ($s^{-1}=s\in G_1$) ✓.
- **Demonstration 3 (targets MC-3)**: $|Gx|=3$, $|G_x|=2$, product $3\times2=6=|D_3|$ — EXACTLY
  matching the Orbit-Stabilizer theorem's prediction, confirming the two quantities are forced to
  multiply to $|G|$, never independently chosen.

## Discovery Questions
1. "If a map $G\times X\to X$ satisfies the identity axiom, is that enough to confirm it's a
   genuine group action?"
2. "Is the stabilizer $G_x$ just an arbitrary subset of $G$, or is it guaranteed to have extra
   structure?"
3. "Are the orbit size and stabilizer size of an element independent quantities, unrelated to
   each other?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own subgroup-verification framework and
   `math.found.function-set-theoretic`'s own verify-by-checking-cases procedure, framing a group
   action as a map requiring BOTH axioms checked.
2. **Conflict evidence**: Demonstration 1's dual verification, directly challenging MC-1 by
   showing identity and compatibility are genuinely separate checks.
3. **Contrast pair**: the stabilizer's subgroup verification (Demonstration 2) against a naive
   "arbitrary subset" reading, isolating MC-2 directly; the numerical Orbit-Stabilizer check
   (Demonstration 3) against a "these are unrelated" assumption, isolating MC-3.
4. **Mastery gate**: require a correct orbit/stabilizer computation for a new element, a correct
   numerical verification of the Orbit-Stabilizer theorem, a correct explanation of why the
   stabilizer always contains the identity, and a correct explanation of why one axiom alone is
   insufficient, at the Blueprint's own stated MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept a group-action verification that checks only the identity axiom — require the
  compatibility axiom to be verified explicitly, for a specific case.
- Never accept "the stabilizer is just the elements that fix $x$" as a complete answer — require
  the learner to confirm it is a subgroup (identity, closure, inverses).

## Voice Teaching Notes
- Say "you checked identity — did you also check compatibility?" whenever a group-action
  verification appears incomplete.
- When a stabilizer is computed, ask "is that set genuinely a subgroup, or just a list of
  elements?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies both group-action axioms for a specific
  proposed map.
- **Rung 2 (application)**: learner correctly computes the orbit and stabilizer of a specific
  element and verifies the stabilizer is a genuine subgroup.
- **Rung 3 (transfer)**: learner correctly applies the Orbit-Stabilizer theorem to a NEW setting
  (e.g. a puzzle's configuration space) to reason about the relative sizes of orbit and stabilizer
  without direct computation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-attempt the specific map's compatibility-axiom check directly.
- If MC-2 recurs, re-attempt the specific stabilizer's subgroup verification directly.
- If MC-3 recurs, re-attempt the specific numerical verification directly.

## Memory Hooks
- "Both axioms, every time — identity alone proves nothing about compatibility."
- "The stabilizer is always a subgroup — never just a list of elements."
- "Orbit size times stabilizer size always equals $|G|$ — a genuine multiplicative constraint."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign, Batch 84): supplies the group axioms
  and subgroup-verification framework this concept's stabilizer analysis directly reuses.
- `math.found.function-set-theoretic` (already authored, earlier in this campaign): supplies the
  verify-by-checking-cases procedure this concept's axiom verification directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-action.md`, reused by reference
  for its $D_3$-acting-on-a-triangle worked examples (reusing `math.abst.normal-subgroup`'s own
  $D_3$ setup directly), its dual-axiom verification, its stabilizer-subgroup verification, and
  its three-misconception registry (severity levels adopted directly as declared; birth types
  independently classified since this Blueprint states Description/Severity but not a formal Type
  label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying orbit
  and stabilizer reasoning to a Rubik's-cube-like puzzle's configuration space.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.
  group-theory`+`math.found.function-set-theoretic`, unlocks `math.abst.sylow-theorems`,
  cross_links none, expert/apply, mastery_threshold 0.8, estimated_hours 6) was directly verified
  against the live KG and matches exactly. The Blueprint's own correctly-declared independence
  P76 mode (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 91): authored. First entry this batch. Companion batch concepts:
  `math.abst.alternating-group`, `math.abst.euclidean-domain`, `math.abst.field-extension`. All 4
  concepts this batch are math.abst, closing the domain's entire ready frontier — `math.abst`
  moves 25/37 → **29/37** this batch.

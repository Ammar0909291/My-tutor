# math.top.van-kampen

## Identity
- **KG id**: `math.top.van-kampen`
- **Domain**: math.top
- **Requires**: `math.top.fundamental-group`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: apply
- **Mastery threshold**: 0.65
- **Estimated hours**: 7

## Learning Objective
State van Kampen's theorem's precise hypotheses ($X=U\cup V$, $U,V$ OPEN, $U\cap V$
PATH-CONNECTED) and verify them BEFORE applying the conclusion
$\pi_1(X)\cong\pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V)$ (never assuming the theorem applies to any
decomposition automatically); apply the theorem when $U\cap V$ is simply connected, recognizing
the amalgamation COLLAPSES to an ordinary free product (never assuming extra relations survive);
and apply the theorem when $U\cap V$ has nontrivial $\pi_1$, recognizing GENUINE amalgamation
occurs (never assuming the computation is unaffected).

## Core Understanding
THE THEOREM'S HYPOTHESES MUST BE VERIFIED — NEVER ASSUMED AUTOMATIC FOR ANY DECOMPOSITION: for
$X=S^1\vee S^1$ (two circles joined at point $p$): naively setting $U=$ one circle, $V=$ the other
gives $U\cap V=\{p\}$ — path-connected, but $U,V$ are NOT open in $X$ as bare circles. Each must
be slightly ENLARGED (a small open neighborhood of $p$ reaching into the other circle) to satisfy
OPENNESS — a genuine technical adjustment the hypotheses require, never skippable. Only AFTER this
adjustment, with $U\cap V$ deformation-retracting to $\{p\}$ (still simply connected) and both
$U,V$ genuinely open, do all three hypotheses hold and the theorem become applicable.

WHEN $U\cap V$ IS SIMPLY CONNECTED, AMALGAMATION COLLAPSES TO AN ORDINARY FREE PRODUCT — NEVER
IMPOSING EXTRA RELATIONS: continuing the wedge-of-circles example: $\pi_1(U)\cong\pi_1(S^1)=
\mathbb Z$ (reusing `math.top.fundamental-group`'s own computed value), similarly
$\pi_1(V)\cong\mathbb Z$. Since $\pi_1(U\cap V)=\{e\}$, there are NO nontrivial elements to map
anywhere — NO relations get imposed beyond the free product's own structure. This gives
$\pi_1(S^1\vee S^1)\cong\mathbb Z*\mathbb Z$, the free group on two generators, with genuinely NO
identifications between the two circles' loops.

WHEN $U\cap V$ HAS NONTRIVIAL $\pi_1$, GENUINE AMALGAMATION OCCURS — NEVER LEAVING THE
COMPUTATION UNCHANGED: for two tori glued along a common circle, with $U\cap V\simeq S^1$ (so
$\pi_1(U\cap V)\cong\mathbb Z$, NONTRIVIAL): van Kampen's theorem gives
$\pi_1(X)\cong\pi_1(U)*_{\mathbb Z}\pi_1(V)$ — the generator of $\pi_1(U\cap V)$ is IDENTIFIED
with SPECIFIC elements inside BOTH $\pi_1(U)$ and $\pi_1(V)$ (the images of the gluing circle's
loop as seen from within each torus). This genuinely FUSES the two pieces' group structures
together at the shared overlap — a strictly richer, structurally different computation than the
simply-connected-intersection case, never the same answer regardless of the intersection's
fundamental group.

## Mental Models
- **"Van Kampen's theorem is not a plug-and-compute formula — openness and path-connected
  intersection are conditions to VERIFY first, sometimes requiring you to enlarge your natural
  decomposition."**
- **"A simply connected overlap has nothing to amalgamate — you just get the plain free product
  of the two pieces, reusing already-known building blocks directly."**
- **"A nontrivial overlap genuinely glues the two pieces' groups together — the computation isn't
  combining two separate answers, it's fusing them at the shared overlap."**

## Why Students Fail

### MC-1: VAN-KAMPEN-HYPOTHESES-ASSUMED-AUTOMATIC
- **Surface form**: believes van Kampen's theorem applies to any decomposition $X=U\cup V$
  without checking hypotheses, missing that openness and path-connectedness of $U\cap V$ are
  genuine, checkable conditions.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the theorem's power
  and generality invite treating it as an unconditional formula).
- **Repair**: re-walk the wedge-of-circles example's necessary open-neighborhood enlargement.

### MC-2: SIMPLY-CONNECTED-INTERSECTION-ASSUMED-TO-STILL-IMPOSE-RELATIONS
- **Surface form**: believes the amalgamated free product formula still imposes extra relations
  even when $U\cap V$ is simply connected, missing that a trivial $\pi_1(U\cap V)$ collapses the
  formula to an ordinary free product.
- **Birth type**: High severity (Blueprint's own declared severity — the amalgamated-product
  notation looks like it should always impose SOME relation, obscuring the trivial-group
  collapse case).
- **Repair**: re-walk the direct $\pi_1(S^1\vee S^1)\cong\mathbb Z*\mathbb Z$ computation.

### MC-3: NONTRIVIAL-INTERSECTION-ASSUMED-NOT-TO-CHANGE-COMPUTATION
- **Surface form**: believes a nontrivial $\pi_1(U\cap V)$ does not genuinely change the
  resulting computation from the simpler free-product case.
- **Birth type**: Moderate severity (Blueprint's own declared severity — without a direct
  contrasting example, the amalgamation's structural effect is easy to underestimate).
- **Repair**: re-walk the genuinely amalgamated two-tori computation, contrasted against the
  wedge-of-circles free product.

## Misconceptions

### MC-1: VAN-KAMPEN-HYPOTHESES-ASSUMED-AUTOMATIC
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SIMPLY-CONNECTED-INTERSECTION-ASSUMED-TO-STILL-IMPOSE-RELATIONS
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: NONTRIVIAL-INTERSECTION-ASSUMED-NOT-TO-CHANGE-COMPUTATION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Van Kampen's theorem is a recipe with prerequisite ingredients checked at the door — open
  pieces, path-connected overlap — skip the check and the recipe simply doesn't apply, whatever
  you compute."**
- **Anti-analogy**: a nontrivial overlap is not a minor footnote to the free-product answer — it
  genuinely welds the two pieces' group structures together at specific, identifiable elements.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the wedge-of-circles decomposition, with the necessary
  open-neighborhood enlargement made explicit.
- **Demonstration 2 (targets MC-2)**: the direct $\pi_1(S^1\vee S^1)\cong\mathbb Z*\mathbb Z$
  computation via the simply-connected-intersection collapse.
- **Demonstration 3 (targets MC-3)**: the genuinely amalgamated two-tori-glued-along-a-circle
  computation.

## Discovery Questions
1. "Can van Kampen's theorem be applied to any decomposition $X=U\cup V$ of a space into two
   pieces, or must specific hypotheses be verified first?"
2. "When $U\cap V$ is simply connected, does the amalgamated free product formula still impose
   extra relations between $\pi_1(U)$ and $\pi_1(V)$, or does it collapse to their ordinary free
   product?"
3. "Does a nontrivial $\pi_1(U\cap V)$ change the resulting computation, or does the answer stay
   the same regardless of the intersection's fundamental group?"

## Teaching Sequence
1. **Representation shift**: the theorem's three hypotheses, checked explicitly, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the direct wedge-of-circles free-product computation, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the genuinely amalgamated two-tori computation contrasted against the
   free-product case, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct verification of the theorem's hypotheses for a specific
   decomposition, a correct free-product computation for a simply-connected-intersection case,
   and a correct identification of the amalgamation relations for a nontrivial-intersection case,
   at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept van Kampen's theorem applied to a decomposition without verifying openness and
  path-connectedness of the intersection first.
- Never accept a claim that a simply connected intersection still imposes extra relations on the
  amalgamated product.
- Never accept a claim that a nontrivial intersection leaves the computation unchanged from the
  free-product case.

## Voice Teaching Notes
- Say "have you verified $U,V$ are open and $U\cap V$ is path-connected, or are you assuming the
  theorem just applies?" whenever van Kampen's theorem is invoked.
- Ask "is $\pi_1(U\cap V)$ trivial or nontrivial here — does that change what relations get
  imposed?" whenever the amalgamated product is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies van Kampen's three hypotheses for a
  specific decomposition, including any necessary open-neighborhood enlargement.
- **Rung 2 (application)**: learner correctly computes $\pi_1$ via the free-product collapse
  when the intersection is simply connected.
- **Rung 3 (transfer)**: learner correctly identifies the amalgamation relations when the
  intersection has nontrivial fundamental group.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the wedge-of-circles open-neighborhood enlargement.
- If MC-2 recurs, re-walk the direct $\mathbb Z*\mathbb Z$ computation.
- If MC-3 recurs, re-walk the genuinely amalgamated two-tori computation.

## Memory Hooks
- "Check the three hypotheses first — van Kampen isn't a plug-and-compute formula."
- "Simply connected overlap: nothing to amalgamate, just the plain free product."
- "Nontrivial overlap: the two pieces' groups get genuinely fused, not just combined."

## Transfer Connections
- `math.top.fundamental-group` (already authored, this campaign, Batch 188): supplies
  $\pi_1(S^1)=\mathbb Z$ and the general definition of $\pi_1$, reused directly as the
  building-block computation for this concept's decomposition-based approach.

## Cross-Subject Connections
- Algebraic topology: computing $\pi_1$ of CW complexes and surfaces of higher genus, both
  standard applications of the decomposition technique this concept establishes.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.van-kampen.md`, reused by reference for
  its wedge-of-circles hypothesis-verification example, its free-product collapse computation, its
  genuinely amalgamated two-tori example, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on computing $\pi_1$ of a genus-2
  surface via a one-holed-torus decomposition, contrasting the genuine amalgamation case with a
  hypothetical simply-connected-intersection alternative.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.fundamental-group`, unlocks none, cross_links none, research/apply,
  mastery_threshold 0.65, estimated_hours 7) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 190): authored. Second entry this batch. Companion batch concept:
  `math.top.simplicial-complex`.

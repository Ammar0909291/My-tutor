# math.linalg.distance

## Identity
- **KG id**: `math.linalg.distance`
- **Domain**: math.linalg
- **Requires**: `math.linalg.norm`
- **Unlocks**: none
- **Cross-links**: `math.real.metric-space`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 1

## Learning Objective
Define the distance between two vectors as $d(u,v)=\|u-v\|$, reusing `math.linalg.norm` directly on
the difference vector; state the metric axioms distance satisfies (non-negativity, symmetry, the
triangle inequality); and recognize that the triangle inequality can be a STRICT inequality or an
EQUALITY, with equality holding exactly when the three points are collinear.

## Core Understanding
The DISTANCE between two vectors $u,v$ is $d(u,v)=\|u-v\|$ — reusing `math.linalg.norm` directly,
applied to their difference. Computing $u-v$ first and then taking its norm is the standard
convention: while $\|u-v\|=\|v-u\|$ always (the final distance value is unaffected by subtraction
order, since $\|-x\|=\|x\|$), consistently choosing one order throughout a calculation avoids
sign-tracking errors in the INTERMEDIATE difference vector.

Distance satisfies the METRIC AXIOMS: NON-NEGATIVITY ($d(u,v)\ge0$, with equality exactly when
$u=v$), SYMMETRY ($d(u,v)=d(v,u)$), and the TRIANGLE INEQUALITY
($d(u,w)\le d(u,v)+d(v,w)$ for any third point $w$) — going directly from $u$ to $w$ is never
longer than going through an intermediate point $v$.

The triangle inequality is NOT always a strict inequality: EQUALITY holds exactly when $u$, $v$,
and $w$ are COLLINEAR with $v$ lying between $u$ and $w$ — in that case, going through $v$ adds no
extra distance at all, since the path is already a straight line. For any three points not
satisfying this collinear-and-between condition, the inequality is strict.

## Mental Models
- **"$d(u,v)=\|u-v\|$ — distance is just the norm of the difference."**
- **"Subtraction order doesn't change the final distance, but pick one order and stick with it for
  the intermediate steps."**
- **"Triangle inequality: equality only when the three points are collinear and $v$ sits between
  $u$ and $w$ — otherwise it's strictly less than the two-hop path."**

## Why Students Fail

### MC-1: DISTANCE-SUBTRACTION-ORDER-NOT-TRACKED-CONSISTENTLY
- **Surface form**: switches between computing $u-v$ and $v-u$ inconsistently within the same
  multi-step calculation, risking sign errors in intermediate work even though the final distance
  value is unaffected.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Minor severity). Since the
  final answer is order-independent, there is little incentive to fix a convention, but switching
  mid-calculation still risks losing track of signs in intermediate steps.
- **Repair**: re-anchor on picking ONE subtraction order (e.g. always "later point minus earlier
  point") and holding it consistently throughout a multi-step calculation.

### MC-2: TRIANGLE-INEQUALITY-ASSUMED-ALWAYS-STRICT-EQUALITY
- **Surface form**: assumes the triangle inequality $d(u,w)\le d(u,v)+d(v,w)$ is always a strict
  inequality ($<$), not recognizing that equality genuinely holds when the three points are
  collinear with $v$ between $u$ and $w$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). Most
  introductory examples use non-collinear points, where the inequality IS strict, and that pattern
  is overgeneralized into treating strictness as universal rather than a special case.
- **Repair**: construct an explicit collinear example (e.g. $u$, $v$, $w$ on a single line with $v$
  between $u$ and $w$) and confirm $d(u,w)=d(u,v)+d(v,w)$ exactly.

## Misconceptions

### MC-1: DISTANCE-SUBTRACTION-ORDER-NOT-TRACKED-CONSISTENTLY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: TRIANGLE-INEQUALITY-ASSUMED-ALWAYS-STRICT-EQUALITY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A direct flight versus a connecting flight: the connecting flight is USUALLY longer, but if
  the layover city happens to sit exactly on the direct flight path, the two routes cover the exact
  same distance — that's the triangle inequality's equality case."**
- **Anti-analogy**: distance is NOT "however you subtract, you might get a different final answer"
  — $\|u-v\|=\|v-u\|$ always, exactly; only the INTERMEDIATE difference vector's sign depends on
  order, never the final distance.

## Demonstrations
- **Demonstration 1 (targets neither MC directly, establishes LO1)**: compute $d((1,2),(4,6))$ via
  $\|u-v\|=\sqrt{(1-4)^2+(2-6)^2}=5$, confirming the same result via $\|v-u\|$.
- **Demonstration 2 (targets MC-2)**: construct three collinear points (e.g. $(0,0)$, $(1,0)$,
  $(3,0)$) and confirm $d(u,w)=d(u,v)+d(v,w)$ exactly, then contrast with three non-collinear
  points where the inequality is strict.

## Discovery Questions
1. "Does it matter whether you compute $u-v$ or $v-u$ when finding the distance between two
   points?"
2. "Is the triangle inequality ever an equality, or is it always a strict less-than?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.norm`'s own computation, framing distance as the norm
   applied to a difference vector.
2. **Conflict evidence**: the collinear-points equality demonstration, breaking MC-2 directly.
3. **Contrast pair**: the collinear equality case against a non-collinear strict-inequality case,
   reinforcing when each applies.
4. **Mastery gate**: require a correct distance computation, a consistent subtraction-order
   convention, and a correct identification of the triangle-inequality equality condition under
   transfer, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a distance computation switching subtraction order mid-calculation without the
  learner reconciling it.
- When the triangle inequality is discussed, require the learner to state the exact condition for
  equality (collinear, $v$ between $u$ and $w$).

## Voice Teaching Notes
- Say "which order are you subtracting in, and are you staying consistent?" whenever subtraction
  order shifts mid-calculation.
- When the triangle inequality is stated, ask "can that ever be an equality — and when?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the distance between two given points.
- **Rung 2 (application)**: learner correctly identifies whether a given triple of points satisfies
  the triangle inequality strictly or with equality.
- **Rung 3 (transfer)**: learner correctly constructs, in a novel context, an example achieving
  triangle-inequality equality and explains why it holds.

## Tutor Recovery Strategy
- If MC-1 recurs, re-fix a single subtraction-order convention for the specific calculation in
  question.
- If MC-2 recurs, re-construct a collinear example for the specific triple of points in question.

## Memory Hooks
- "$d(u,v)=\|u-v\|$ — distance is the norm of the difference."
- "Pick an order, keep it — the final distance doesn't care, but your intermediate steps will."
- "Equality happens exactly when the points line up."

## Transfer Connections
- `math.linalg.norm` (already authored, this campaign): supplies the norm computation this
  concept applies directly to a difference vector.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.distance.md`, reused by reference for
  its basic-distance-computation demonstration, its collinear-equality demonstration, and its
  two-misconception registry (birth types independently classified, since this Blueprint states
  severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own probe (constructing a triangle-inequality
  equality case in a novel context).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found**: the Blueprint's own Component 0 states
  "cross_links: none" and its Validation Checklist item V-5 states "PASS (none declared)" — but the
  live KG lists `cross_links: ['math.real.metric-space']`. Resolved toward the KG per standing
  policy (never fixing the KG or Blueprint file). Verified via `ls
  educational-brain/concepts/mathematics/math.real.metric-space.md` that this cross-link target has
  no Educational Brain entry (`math.real` entirely unstarted — the identical finding already
  recorded for `math.linalg.norm`'s own `math.real.metric-space` cross-link in Batch 74) —
  independence mode applies: this entry's metric-axioms treatment (non-negativity, symmetry,
  triangle inequality) is self-contained rather than citing a retrievable peer entry.

## Version History
- 2026-09-13 (Batch 77): authored. Unblocked by `math.linalg.norm` (Batch 74). Companion batch
  concepts: `math.linalg.augmented-matrix`, `math.linalg.cofactor-expansion`,
  `math.linalg.cramer-rule`. `math.linalg` moves toward **22/61** this batch.

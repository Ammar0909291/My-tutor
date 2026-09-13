# math.linalg.angle-vectors

## Identity
- **KG id**: `math.linalg.angle-vectors`
- **Domain**: math.linalg
- **Requires**: `math.linalg.dot-product`, `math.linalg.norm`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 1

## Learning Objective
Compute the angle $\theta$ between two vectors using $\cos\theta=\frac{a\cdot b}{|a||b|}$, reusing
`math.linalg.dot-product` and `math.linalg.norm` directly; use the dot product ALONE to test
perpendicularity ($\theta=\pi/2$ iff $a\cdot b=0$), without needing the full angle formula; and
state that the Cauchy-Schwarz inequality guarantees $\frac{a\cdot b}{|a||b|}$ always lies in
$[-1,1]$, ensuring the angle formula's input to $\cos^{-1}$ is always valid.

## Core Understanding
The angle $\theta$ between two nonzero vectors $a,b$ satisfies
$\cos\theta=\frac{a\cdot b}{|a||b|}$ — the dot product (`math.linalg.dot-product`), normalized by
both vectors' lengths (`math.linalg.norm`). Solving for $\theta$:
$\theta=\cos^{-1}\left(\frac{a\cdot b}{|a||b|}\right)$.

A key special case: $\theta=\pi/2$ (perpendicular) IF AND ONLY IF $a\cdot b=0$ — since
$\cos(\pi/2)=0$, checking perpendicularity is as simple as computing the dot product ALONE,
without needing the norms or the full angle formula at all. This is a genuine EFFICIENCY shortcut
for the specific perpendicularity question, not a substitute for the full formula when the actual
numeric angle is needed.

The CAUCHY-SCHWARZ INEQUALITY guarantees $\left|\frac{a\cdot b}{|a||b|}\right|\le1$ ALWAYS — this
ratio always lies in $[-1,1]$, exactly the domain of $\cos^{-1}$, ensuring the angle formula is
always mathematically well-defined. A computed ratio falling OUTSIDE $[-1,1]$ can never genuinely
happen for real vectors — such a result signals a computational ERROR somewhere upstream (in the
dot product or norm calculation), not a legitimate but unusual outcome.

## Mental Models
- **"$\cos\theta=\frac{a\cdot b}{|a||b|}$ — the dot product, normalized."**
- **"Perpendicular? Just check $a\cdot b=0$ — no norms, no arccosine needed."**
- **"A ratio outside $[-1,1]$ is impossible — Cauchy-Schwarz guarantees it, so it always signals an
  upstream error."**

## Why Students Fail

### MC-1: FULL-ANGLE-FORMULA-USED-UNNECESSARILY-FOR-PERPENDICULARITY-CHECK
- **Surface form**: computes the full angle formula (norms and arccosine) when only checking
  perpendicularity, rather than using the more efficient dot-product-alone test.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). The
  full formula is presented first as the general method, and without an explicit statement of the
  perpendicularity-specific shortcut, the general procedure is applied even when unnecessary.
- **Repair**: re-state the efficient shortcut explicitly — "$a\cdot b=0$ is both necessary AND
  sufficient for perpendicularity" — no further computation needed.

### MC-2: OUT-OF-RANGE-RATIO-NOT-RECOGNIZED-AS-ERROR-SIGNAL
- **Surface form**: does not recognize that a computed $\frac{a\cdot b}{|a||b|}$ value outside
  $[-1,1]$ indicates an upstream computational error, since Cauchy-Schwarz guarantees this can
  never genuinely happen.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared FOUNDATIONAL severity). The
  Cauchy-Schwarz guarantee is easy to state as an abstract fact without connecting it to its
  practical diagnostic USE — recognizing an impossible value as a signal to re-check earlier work.
- **Repair**: re-state the Cauchy-Schwarz guarantee explicitly, then re-check the dot product and
  norm computations for the actual arithmetic error that produced the impossible value.

## Misconceptions

### MC-1: FULL-ANGLE-FORMULA-USED-UNNECESSARILY-FOR-PERPENDICULARITY-CHECK
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: OUT-OF-RANGE-RATIO-NOT-RECOGNIZED-AS-ERROR-SIGNAL
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A smoke detector going off when nothing is burning: that's not a genuine 'no-fire fire' event
  — it's a signal something upstream is wrong. A ratio outside $[-1,1]$ is the same kind of
  impossible reading, always pointing to an earlier mistake."**
- **Anti-analogy**: the perpendicularity shortcut is NOT "you never need the full angle formula
  again" — it applies ONLY to the specific question "are these perpendicular?"; finding the actual
  numeric angle for a non-perpendicular pair still requires norms and arccosine.

## Demonstrations
- **Demonstration 1 (targets neither MC directly, establishes LO1)**: find the angle between
  $(1,0)$ and $(1,1)$: $\cos\theta=\frac{1}{\sqrt2}$, $\theta=45°$.
- **Demonstration 2 (targets MC-1)**: determine $(2,3)$ and $(3,-2)$ are perpendicular by computing
  $a\cdot b=6-6=0$ alone, without computing norms or the arccosine.
- **Demonstration 3 (targets MC-2)**: verify the extreme cases $\cos\theta=\pm1$ for parallel
  (same-direction and opposite-direction) vector pairs, establishing these as the genuine bounds
  Cauchy-Schwarz guarantees.

## Discovery Questions
1. "To check whether two vectors are perpendicular, do you need to compute the full angle, or is
   there a shortcut?"
2. "Can the ratio $\frac{a\cdot b}{|a||b|}$ ever come out to $1.5$ for real vectors?"
3. "If you computed that ratio and got $1.2$, what should you conclude?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.dot-product`'s and `math.linalg.norm`'s own computations,
   framing the angle formula as combining both directly.
2. **Conflict evidence**: the dot-product-alone perpendicularity check, breaking MC-1 directly by
   contrasting against the unnecessary full computation.
3. **Contrast pair**: the extreme $\cos\theta=\pm1$ cases against a hypothetical out-of-range
   value, isolating MC-2.
4. **Mastery gate**: require an angle computation, an efficient perpendicularity check, and an
   error-diagnosis judgment for an out-of-range ratio under transfer, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept a full angle-formula computation when only perpendicularity is being checked —
  require the dot-product-alone shortcut.
- When a computed ratio falls outside $[-1,1]$, require the learner to state this signals an
  upstream error, never a valid result.

## Voice Teaching Notes
- Say "do you need the full formula, or just the dot product?" whenever perpendicularity alone is
  being checked.
- When an out-of-range ratio appears, ask "what does that tell you about your earlier work?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the angle between two vectors using the
  full formula.
- **Rung 2 (application)**: learner correctly uses the dot-product-alone shortcut to check
  perpendicularity without computing norms or arccosine.
- **Rung 3 (transfer)**: learner correctly diagnoses an out-of-range computed ratio as an upstream
  error in a novel context (e.g. a robotics bracket-alignment scenario), and correctly explains
  when the full formula is genuinely necessary versus when the shortcut suffices.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the dot-product-alone shortcut for the specific pair in question.
- If MC-2 recurs, re-check the dot product and norm computations for the specific out-of-range
  result in question.

## Memory Hooks
- "$\cos\theta=\frac{a\cdot b}{|a||b|}$ — dot product over norms."
- "Perpendicular? Dot product alone, no norms needed."
- "Outside $[-1,1]$ is impossible — always an upstream error."

## Transfer Connections
- `math.linalg.dot-product` (already authored, this campaign): supplies the numerator of the angle
  formula and the perpendicularity shortcut this concept reuses directly.
- `math.linalg.norm` (already authored, this campaign): supplies the denominator of the angle
  formula.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.angle-vectors.md`, reused by
  reference for its basic-angle-computation demonstration, its perpendicularity-shortcut contrast,
  its Cauchy-Schwarz-bounds demonstration, and its two-misconception registry (birth types
  independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a robotics
  sensor-bracket-alignment scenario, applying the perpendicularity shortcut and distinguishing when
  the full formula is genuinely needed).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `dot-product`/`norm`, unlocks none, cross_links none, proficient/apply, mastery_threshold 0.9,
  estimated_hours 1) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 76): authored. Unblocked by `math.linalg.dot-product`+`math.linalg.norm`
  (Batches 72/74). Companion batch concepts: `math.graph.algebraic-graph-theory`,
  `math.linalg.linear-system`, `math.linalg.matrix-inverse`. `math.linalg` moves toward **19/61**
  this batch.

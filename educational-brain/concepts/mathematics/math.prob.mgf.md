# math.prob.mgf

## Identity
- **KG id**: `math.prob.mgf`
- **Domain**: math.prob
- **Requires**: `math.prob.moments`, `math.calc.power-series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Recognize this concept as the FULL development of `math.prob.moments`'s own orientation-level
preview ($M(t)=E[e^{tX}]$, $M^{(k)}(0)=E[X^k]$), never a new definition; use power-series
expansion to derive WHY differentiating the MGF at $t=0$ extracts moments, connecting directly to
`math.calc.power-series`'s own Taylor-coefficient-extraction machinery; and apply the MGF's two
genuinely powerful properties — it UNIQUELY determines the distribution, and for INDEPENDENT
random variables $M_{X+Y}=M_X\cdot M_Y$.

## Core Understanding
THIS CONCEPT COMPUTES AND DERIVES — IT DOES NOT REDEFINE: `math.prob.moments` already introduces
$M(t)=E[e^{tX}]$ and states $M^{(k)}(0)=E[X^k]$ at orientation level. For $X\sim
\text{Exponential}(\lambda)$: $M_X(t)=E[e^{tX}]=\int_0^\infty e^{tx}\lambda e^{-\lambda x}\,dx=
\frac{\lambda}{\lambda-t}$ (finite for $t<\lambda$). Differentiating: $M_X'(0)=\frac{\lambda}
{\lambda^2}=\frac1\lambda$ — matching the already-known $E[X]=1/\lambda$ exactly, concretely
verifying the previewed derivative rule on a real computation.

THE DERIVATIVE RULE COMES FROM POWER-SERIES COEFFICIENT MATCHING, NEVER AN ISOLATED FACT:
expanding $e^{tX}=\sum_{k=0}^\infty\frac{(tX)^k}{k!}$ and taking expectations term-by-term:
$M_X(t)=\sum_{k=0}^\infty\frac{E[X^k]}{k!}t^k$ — a power series in $t$ whose $k$th coefficient is
$E[X^k]/k!$. By `math.calc.power-series`'s own fact that the $k$th Taylor coefficient equals
$f^{(k)}(0)/k!$, matching coefficients gives $M_X^{(k)}(0)=E[X^k]$ exactly — derived from
power-series machinery, not stated as an unmotivated trick. Concretely: the exponential's
$M_X(t)=1/(1-t/\lambda)=\sum_{k=0}^\infty(t/\lambda)^k$ (a geometric series), so matching gives
$E[X^k]=k!/\lambda^k$.

UNIQUENESS AND THE PRODUCT RULE MAKE THE MGF GENUINELY POWERFUL, NOT JUST NOTATIONAL: if
$M_X(t)=M_Y(t)$ near $t=0$, then $X$ and $Y$ have the SAME distribution (stated without proof).
For independent $X,Y$: $M_{X+Y}(t)=E[e^{tX}e^{tY}]=E[e^{tX}]E[e^{tY}]=M_X(t)M_Y(t)$ — the MGF of a
sum of independent variables is the PRODUCT of their individual MGFs. For $n$ iid
$\text{Exponential}(\lambda)$ variables, $M_{X_1+\cdots+X_n}(t)=\left(\frac{\lambda}{\lambda-t}
\right)^n$ — recognized as $\text{Gamma}(n,\lambda)$'s own MGF, so by uniqueness,
$X_1+\cdots+X_n\sim\text{Gamma}(n,\lambda)$ — identified entirely through MGF algebra, no
convolution required.

## Mental Models
- **"The MGF is a machine that already knows every moment — differentiating at 0 is just asking
  it to hand one over."**
- **"Multiplying MGFs for independent sums replaces a messy convolution integral with simple
  algebra, then a recognition step."**

## Why Students Fail

### MC-1: MGF-ASSUMED-NEW-DEFINITION
- **Surface form**: believes this concept introduces a new definition of the MGF.
- **Birth type**: Foundational severity (Blueprint's own declared severity — encountering the
  same formula again in a new concept naturally reads as "starting over," obscuring that the
  definition was already previewed).
- **Repair**: re-walk the exponential-distribution computation, explicitly citing
  `math.prob.moments`'s own preview as the source of the definition.

### MC-2: DERIVATIVE-RULE-ASSUMED-INDEPENDENT-FACT
- **Surface form**: believes the MGF's derivative-extraction rule is an independent probability
  fact.
- **Birth type**: High severity (Blueprint's own declared severity — the rule is often quoted
  without its power-series justification, making it feel like a standalone trick).
- **Repair**: re-walk the coefficient-matching derivation connecting to power-series machinery
  directly.

### MC-3: CONVOLUTION-ASSUMED-ONLY-RELIABLE-METHOD
- **Surface form**: believes direct convolution is the only reliable way to find a sum of
  independent random variables' distribution.
- **Birth type**: Moderate severity (Blueprint's own declared severity — convolution is often the
  first, and only, method taught for combining independent distributions).
- **Repair**: re-walk the MGF-product-and-recognize identification of a Gamma sum.

## Misconceptions

### MC-1: MGF-ASSUMED-NEW-DEFINITION
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: DERIVATIVE-RULE-ASSUMED-INDEPENDENT-FACT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: CONVOLUTION-ASSUMED-ONLY-RELIABLE-METHOD
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"The MGF is like a compressed archive of every moment — unzip it (differentiate) at $t=0$ to
  retrieve whichever one you need."**
- **Anti-analogy**: computing a sum's distribution via MGF multiplication is NOT a shortcut that
  loses information — uniqueness guarantees the recognized MGF pins down the exact distribution,
  with no approximation involved.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the exponential MGF computed explicitly, its derivative
  verified against the already-known $E[X]=1/\lambda$.
- **Demonstration 2 (targets MC-2)**: the geometric-series coefficient match deriving
  $E[X^k]=k!/\lambda^k$ directly from power-series machinery.
- **Demonstration 3 (targets MC-3)**: $n$ independent exponentials' MGF product recognized as
  Gamma$(n,\lambda)$'s own MGF, identifying the sum's distribution without convolution.

## Discovery Questions
1. "Does this concept introduce a new definition of the moment generating function, or fully
   develop one already previewed?"
2. "Is the MGF's derivative-extraction rule an independent probability fact, or does it follow
   from power-series coefficient matching?"
3. "Is convolving densities directly the only reliable way to find a sum of independent random
   variables' distribution?"

## Teaching Sequence
1. **Representation shift**: the exponential MGF's explicit computation and derivative
   verification, isolating MC-1.
2. **Conflict evidence**: the geometric-series coefficient-matching derivation, isolating MC-2.
3. **Contrast pair**: the MGF-product identification of a Gamma sum versus a convolution-based
   route, isolating MC-3.
4. **Mastery gate**: require a correct explicit MGF computation for a new distribution, a correct
   derivative verification against a known moment, and a correct sum-of-independent-variables
   distribution identification via the product rule, at the Blueprint's own stated MAMR of 4/5
   (⌈0.8×5⌉).

## Tutor Actions
- Never accept the MGF treated as a brand-new definition unrelated to its earlier preview.
- Never accept the derivative-extraction rule stated without connecting it to power-series
  coefficient matching.
- Never accept convolution presented as the only reliable method for a sum's distribution.

## Voice Teaching Notes
- Say "have you seen this definition before, or is this genuinely new?" whenever the MGF is
  introduced.
- When a sum of independent variables' distribution is sought, ask "could you multiply MGFs and
  recognize the result, instead of convolving?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the MGF explicitly for a new standard
  distribution.
- **Rung 2 (application)**: learner correctly differentiates a computed MGF to verify a known
  moment.
- **Rung 3 (transfer)**: learner correctly uses the product rule and uniqueness to identify a sum
  of independent random variables' distribution, and explains why this beats direct convolution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the exponential MGF computation, citing the earlier preview explicitly.
- If MC-2 recurs, re-walk the coefficient-matching derivation.
- If MC-3 recurs, re-walk the MGF-product Gamma-sum identification.

## Memory Hooks
- "The MGF was already defined — this concept computes it, doesn't redefine it."
- "Differentiating the MGF at 0 is power-series coefficient extraction, not a separate trick."
- "Multiply MGFs, recognize the result — that identifies a sum's distribution without
  convolution."

## Transfer Connections
- `math.prob.moments` (already authored, this campaign, Batch 128): supplies the MGF's own
  orientation-level preview and the moment/central-moment vocabulary this concept fully develops.
- `math.calc.power-series` (already authored, certified domain): supplies the Taylor-coefficient
  extraction machinery this concept's derivative-rule derivation directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.mgf.md`, reused by reference for its
  exponential-distribution MGF computation, its power-series coefficient-matching derivation, its
  Gamma-sum product-rule identification, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the product rule and
  uniqueness to a reliability engineer's total combined usage time across independent components.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.moments`/
  `math.calc.power-series`, unlocks none, cross_links none, expert/apply, mastery_threshold 0.8,
  estimated_hours 5) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 129): authored. First entry this batch. Companion batch concept:
  `math.real.baire-category`.

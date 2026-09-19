# math.top.continuity-top

## Identity
- **KG id**: `math.top.continuity-top`
- **Domain**: math.top
- **Requires**: `math.top.topological-space`
- **Unlocks**: `math.top.homeomorphism`
- **Cross-links**: `math.real.continuity-rigorous`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define $f:X\to Y$ as continuous iff $f^{-1}(V)$ is open in $X$ for EVERY open $V$ in $Y$ —
stated on PREIMAGES, never forward images; verify this open-set definition is EQUIVALENT to the
ε-δ definition (`math.real.continuity-rigorous`) for metric spaces, while remaining meaningful
even where no metric exists; and apply the composition rule (continuous $\circ$ continuous is
continuous) without re-deriving it from scratch each time.

## Core Understanding
CONTINUITY RUNS ON PREIMAGES, NEVER FORWARD IMAGES: let $f(x)=5$ (constant) on $\mathbb R$.
Checking $V=(4,6)$: $f^{-1}(V)=\{x:5\in(4,6)\}=\mathbb R$, open. Checking $V'=(0,1)$:
$f^{-1}(V')=\emptyset$, open. Every preimage test passes, so $f$ IS continuous. But the FORWARD
image of the open set $(0,1)$ under $f$ is $f((0,1))=\{5\}$ — a single point, NOT open. A
continuous function can perfectly well send an open set forward to a non-open one; the definition
constrains ONLY what pulls back from $Y$'s open sets to $X$, never what pushes forward.

THE OPEN-SET DEFINITION GENERALIZES ε-δ — NEVER A MERE REPHRASING WITH NO INDEPENDENT VALUE: for
$f(x)=2x+1$ at $a=3$: the open-set preimage of $V=(7-\varepsilon,7+\varepsilon)$ is
$f^{-1}(V)=\{x:3-\varepsilon/2<x<3+\varepsilon/2\}=(3-\varepsilon/2,3+\varepsilon/2)$ — EXACTLY
the interval $(a-\delta,a+\delta)$ with $\delta=\varepsilon/2$ that `math.real.continuity-rigorous`
derives via ε-δ. Same content, different vocabulary — for METRIC spaces. But the open-set
definition remains meaningful in a space where NO metric exists at all (per
`math.top.topological-space`'s own non-metrizable indiscrete-topology example) — there, "ε" and
"δ" cannot even be written down, while "for every open $V$, $f^{-1}(V)$ is open" still applies
unchanged. The generalization is genuine, never a stylistic detour around an already-adequate
tool.

COMPOSITION NEVER NEEDS RE-DERIVATION FROM SCRATCH: for $f(x)=x^2$, $g(x)=x+1$, both continuous:
$(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$ for any open $W$ — since $g$ continuous makes $g^{-1}(W)$
open, and $f$ continuous then makes $f^{-1}(g^{-1}(W))$ open, the composite is continuous with NO
extra distance-based work at all. This set-identity argument uses only open sets, so it applies
IDENTICALLY in any topological space with no metric whatsoever — confirming continuity is a
genuinely TOPOLOGICAL property, never one requiring a fresh proof for each new composite.

## Mental Models
- **"Continuity is a promise about pulling open sets BACKWARD — it makes no promise at all about
  pushing them forward."**
- **"The open-set definition and ε-δ compute the same fact in metric spaces — but only the
  open-set version survives when there's no metric left to lean on."**
- **"Composition of continuous functions is a one-time proof, reusable forever — never
  re-derive it per pair."**

## Why Students Fail

### MC-1: CONTINUITY-DEFINITION-DIRECTION-REVERSED
- **Surface form**: believes continuity requires open sets to map FORWARD to open sets, rather
  than correctly requiring preimages of open sets to be open.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "continuous"
  colloquially suggests smooth forward behavior, inviting the direction reversal).
- **Repair**: re-walk the constant-function example, showing continuity holds via preimages while
  the forward image collapses an open set to a non-open point.

### MC-2: OPEN-SET-DEFINITION-TREATED-AS-MERE-REPHRASING
- **Surface form**: treats the open-set definition as just a stylistic alternative to ε-δ with no
  independent value, missing that it is the ONLY available definition in spaces lacking a metric.
- **Birth type**: Foundational severity (Blueprint's own declared severity — since ε-δ "already
  works" for the metric spaces usually studied first, the generalization's necessity is easy to
  miss).
- **Repair**: re-anchor on `math.top.topological-space`'s non-metrizable indiscrete topology,
  where ε-δ literally cannot be written down but the open-set definition still applies.

### MC-3: COMPOSITION-CONTINUITY-RE-DERIVED-FROM-SCRATCH
- **Surface form**: fails to invoke the composition rule directly, instead re-verifying continuity
  of a composite function via ε-δ or preimages from first principles every time.
- **Birth type**: Moderate severity (Blueprint's own declared severity — without seeing the
  general set-identity proof once, each new composite looks like it needs its own fresh argument).
- **Repair**: re-walk the $(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$ identity, emphasizing it is a
  single general proof covering every pair of continuous functions.

## Misconceptions

### MC-1: CONTINUITY-DEFINITION-DIRECTION-REVERSED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: OPEN-SET-DEFINITION-TREATED-AS-MERE-REPHRASING
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: COMPOSITION-CONTINUITY-RE-DERIVED-FROM-SCRATCH
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Continuity checks what comes IN through the back door (preimages), never what goes OUT the
  front (forward images) — a function can be perfectly continuous while still squashing an open
  set flat on its way out."**
- **Anti-analogy**: the open-set definition is not "ε-δ in a costume" — pull the costume off in a
  space with no metric, and only the open-set version is still standing.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the constant-function preimage-passes-but-forward-image-
  collapses example.
- **Demonstration 2 (targets MC-2)**: the side-by-side $f(x)=2x+1$ open-set-preimage-versus-ε-δ
  translation, reused against the non-metrizable indiscrete topology as a contrast.
- **Demonstration 3 (targets MC-3)**: the $(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$ composition
  identity for $f(x)=x^2$, $g(x)=x+1$.

## Discovery Questions
1. "Does continuity mean that $f$ sends open sets forward to open sets?"
2. "Is the open-set definition just a rephrasing of ε-δ with no independent use, since ε-δ
   already works for metric spaces?"
3. "If $f$ and $g$ are both known to be continuous, do you need to re-derive continuity of
   $g\circ f$ from scratch?"

## Teaching Sequence
1. **Conflict evidence**: the constant-function preimage-versus-forward-image example, working
   Demonstration 1, isolating MC-1.
2. **Analogy bridge**: the ε-δ-to-open-set translation contrasted with the non-metrizable case,
   working Demonstration 2, isolating MC-2.
3. **Representation shift**: the composition set-identity argument, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct preimage-based continuity verification, a correct
   translation between the open-set and ε-δ definitions for a metric-space example, and a correct
   application of the composition rule without re-derivation, at the Blueprint's own stated MAMR
   of 5/5.

## Tutor Actions
- Never accept continuity described as requiring open sets to map forward to open sets.
- Never accept the open-set definition dismissed as a mere rephrasing with no independent use.
- Never accept a composite function's continuity re-derived from scratch when the composition rule
  applies directly.

## Voice Teaching Notes
- Say "is that a statement about preimages, or about forward images?" whenever continuity is being
  checked via open sets.
- Ask "would this definition still make sense in a space with no metric at all?" whenever the
  open-set-versus-ε-δ relationship is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies continuity of a simple function using the
  preimage test.
- **Rung 2 (application)**: learner correctly translates between the open-set and ε-δ definitions
  for a metric-space example, and correctly identifies a continuous function whose forward image
  of an open set is not open.
- **Rung 3 (transfer)**: learner correctly applies the composition rule to a composite function
  without re-deriving continuity from scratch, and explains why the open-set definition, unlike
  ε-δ, extends to non-metrizable spaces.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the constant-function preimage-versus-forward-image example.
- If MC-2 recurs, re-anchor on the non-metrizable indiscrete-topology contrast.
- If MC-3 recurs, re-walk the composition set-identity argument.

## Memory Hooks
- "Continuity is about preimages going backward — never forward images."
- "Open-set continuity survives with no metric; ε-δ cannot even be written down there."
- "Composition of continuous functions is proven once, for all — never re-derive it."

## Transfer Connections
- `math.top.topological-space` (already authored, this campaign, Batch 180): supplies the
  declared-open-sets framework and the non-metrizable indiscrete-topology example this concept's
  MC-2 repair directly reuses.
- `math.real.continuity-rigorous` (already authored, certified domain, genuine cross-link):
  supplies the ε-δ definition and the $f(x)=2x+1$/$f(x)=3x-2$ worked examples this concept's
  open-set definition is shown to agree with exactly on metric spaces.
- `math.top.homeomorphism` (not yet authored, KG's declared unlock): the continuous-bijection-
  with-continuous-inverse definition this concept's "continuity is a topological property"
  framing directly sets up.

## Cross-Subject Connections
- Real analysis: the standard ε-δ definition of continuity on $\mathbb R$, the concrete
  motivating special case this concept's open-set definition generalizes.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.continuity-top.md`, reused by reference
  for its constant-function preimage-versus-forward-image example, its $f(x)=2x+1$ open-set-to-
  ε-δ translation, its composition set-identity argument, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe against `math.real.continuity-rigorous`,
  reusing that lesson's $f(x)=3x-2$ at $a=5$ worked example to translate ε-δ into open-set
  language and connect the "arbitrary $V$ first, then find the preimage" logical order to that
  lesson's "arbitrary ε first, then produce δ" order.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.topological-space`, unlocks `math.top.homeomorphism`, cross_links
  `math.real.continuity-rigorous`, expert/understand, mastery_threshold 0.9, estimated_hours 4)
  was directly verified against the live KG and matches exactly. `math.real.continuity-rigorous`
  independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 183): authored. Second entry this batch. Companion batch concept:
  `math.top.basis`.

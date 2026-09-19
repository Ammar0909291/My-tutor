# math.top.interior-closure

## Identity
- **KG id**: `math.top.interior-closure`
- **Domain**: math.top
- **Requires**: `math.top.open-sets`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Compute interior (the largest open set contained in $A$), closure (the smallest closed set
containing $A$), and boundary ($\partial A=\text{cl}(A)\setminus\text{int}(A)$) directly; apply
the neighborhood characterizations — $x\in\text{int}(A)$ iff SOME open set containing $x$ lies
entirely in $A$ (existential), $x\in\text{cl}(A)$ iff EVERY open set containing $x$ meets $A$
(universal) — never swapping the quantifiers; and recognize dense subsets ($\text{cl}(A)=X$)
never require $A=X$ itself.

## Core Understanding
INTERIOR IS EXISTENTIAL, CLOSURE IS UNIVERSAL — NEVER THE SAME QUANTIFIER FOR BOTH: for
$A=(0,1]\subset\mathbb R$: is $0\in\text{cl}(A)$? Check: does EVERY open set containing $0$ meet
$A$? Yes — any interval $(-\epsilon,\epsilon)$ meets $(0,1]$ for any $\epsilon>0$. So
$0\in\text{cl}(A)$, giving $\text{cl}(A)=[0,1]$. Is $0\in\text{int}(A)$? Check: does SOME open set
containing $0$ lie entirely in $A$? No open interval around $0$ avoids negative numbers, so no —
$0\notin\text{int}(A)$, and in fact $\text{int}(A)=(0,1)$. The SAME point $0$ satisfies the
universal "every neighborhood meets $A$" test but FAILS the existential "some neighborhood lies
inside $A$" test — confirming $\partial A=\text{cl}(A)\setminus\text{int}(A)=[0,1]\setminus(0,1)=
\{0,1\}$.

DENSE MEANS EVERY OPEN SET MEETS $A$ — NEVER THAT $A$ EQUALS THE WHOLE SPACE: $\mathbb Q$ is
dense in $\mathbb R$ ($\text{cl}(\mathbb Q)=\mathbb R$, since every open interval, however small,
contains a rational) — but $\mathbb Q\ne\mathbb R$; $\mathbb Q$ is a strict, countable subset of
the uncountable $\mathbb R$. Meanwhile $\text{int}(\mathbb Q)=\emptyset$: no open interval lies
entirely inside $\mathbb Q$, since every interval also contains irrationals. So $\mathbb Q$'s
interior, closure, and the set itself are THREE dramatically different objects
($\emptyset$, $\mathbb R$, $\mathbb Q$) — density of the closure never collapses this distinction.

THE BOUNDARY IS NOT ALWAYS A "NICE" SEPARATING CURVE — NEVER ASSUMED THIN OR SIMPLE: for the open
unit disk $A=\{(x,y):x^2+y^2<1\}$ in $\mathbb R^2$: $p=(0.5,0)$ is interior (a small ball around
$p$ fits inside $A$); $q=(1,0)$ is boundary (every ball around $q$ contains BOTH points inside and
outside $A$); $r=(2,0)$ is exterior (a ball around $r$ misses $A$ entirely). Here $\partial A$ is
the unit circle — a familiar thin curve. But for $\mathbb Q$, $\partial\mathbb Q=\mathbb R$ (from
`math.top.open-sets`'s own worked example) — the boundary can be the ENTIRE space, never
guaranteed to be a simple separating curve.

## Mental Models
- **"Interior asks 'does SOME neighborhood fit inside' — closure asks 'does EVERY neighborhood
  touch' — swapping these quantifiers swaps the answer."**
- **"A dense set can be a thin, countable sliver — density describes the closure, never the set
  itself."**
- **"Boundary is whatever's left after closure minus interior — sometimes a thin curve, sometimes
  the whole space."**

## Why Students Fail

### MC-1: INTERIOR-REQUIRES-EVERY-NEIGHBORHOOD
- **Surface form**: confuses interior's existential condition ("some neighborhood fits inside")
  with closure's universal condition ("every neighborhood meets"), applying the wrong quantifier
  to the wrong concept.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the two definitions
  are syntactically similar "neighborhood" statements that differ only in quantifier).
- **Repair**: re-walk the $x=0$ dual test on $(0,1]$, explicitly naming which quantifier applies
  to which concept.

### MC-2: DENSE-MEANS-EQUAL-TO-WHOLE-SPACE
- **Surface form**: believes $\text{cl}(A)=X$ implies $A=X$ itself, missing that a dense set can
  be a proper, even much "smaller," subset.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "dense" colloquially
  suggests "fills up," which is easily over-read as "equals").
- **Repair**: re-walk the $\mathbb Q$ example, contrasting $\text{int}(\mathbb Q)=\emptyset$,
  $\text{cl}(\mathbb Q)=\mathbb R$, and $\mathbb Q$ itself as three distinct objects.

### MC-3: BOUNDARY-SEPARATES-INSIDE-FROM-OUTSIDE
- **Surface form**: assumes a set's boundary is always a "nice" thin curve cleanly separating
  inside from outside, missing that it can be empty, fractal, or the entire space.
- **Birth type**: Moderate severity (Blueprint's own declared severity — familiar geometric
  examples like disks reinforce a "thin curve" expectation).
- **Repair**: re-walk the unit-disk boundary (a thin circle) against $\partial\mathbb Q=\mathbb R$
  (the whole space), anchoring on the general definition rather than the geometric picture.

## Misconceptions

### MC-1: INTERIOR-REQUIRES-EVERY-NEIGHBORHOOD
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: DENSE-MEANS-EQUAL-TO-WHOLE-SPACE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: BOUNDARY-SEPARATES-INSIDE-FROM-OUTSIDE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Interior asks if you can find ONE room that fits entirely inside the house; closure asks if
  EVERY nearby spot, however small, brushes against the house — one demand is easy to satisfy
  locally, the other is a constant, universal check."**
- **Anti-analogy**: a dense set is not "basically the whole space" — $\mathbb Q$ is dense in
  $\mathbb R$ yet is a thin, countable sliver, infinitely outnumbered by the irrationals it sits
  among.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the dual existential/universal test at $x=0$ for
  $A=(0,1]$, computing $\text{int}(A)=(0,1)$, $\text{cl}(A)=[0,1]$, $\partial A=\{0,1\}$.
- **Demonstration 2 (targets MC-2)**: the $\mathbb Q$ triple contrast —
  $\text{int}(\mathbb Q)=\emptyset$, $\text{cl}(\mathbb Q)=\mathbb R$, $\mathbb Q\ne\mathbb R$.
- **Demonstration 3 (targets MC-3)**: the open unit disk's thin-circle boundary versus
  $\partial\mathbb Q=\mathbb R$.

## Discovery Questions
1. "Does interior require EVERY nearby neighborhood to fit inside the set, or just SOME
   neighborhood?"
2. "If a set's closure equals the whole space, does the set itself have to equal the whole space
   too?"
3. "Is a set's boundary always a thin, simple curve separating inside from outside?"

## Teaching Sequence
1. **Representation shift**: the dual existential/universal neighborhood test on $(0,1]$, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the $\mathbb Q$ triple contrast, working Demonstration 2, isolating
   MC-2.
3. **Contrast pair**: the thin-circle-versus-whole-space boundary comparison, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct interior/closure/boundary computation for a
   half-open-interval-style example, a correct density judgment distinguishing $\text{cl}(A)=X$
   from $A=X$, and a correct boundary computation for a dense-with-dense-complement case, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept interior's existential condition confused with closure's universal condition.
- Never accept $\text{cl}(A)=X$ treated as implying $A=X$.
- Never accept a claim that a set's boundary must always be a thin, simple curve.

## Voice Teaching Notes
- Say "does SOME neighborhood fit inside, or does EVERY neighborhood have to touch it?" whenever
  interior or closure is computed.
- Ask "is the set itself really the whole space, or just its closure?" whenever a dense set is
  discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes interior, closure, and boundary for a
  half-open interval.
- **Rung 2 (application)**: learner correctly applies the existential/universal neighborhood
  characterizations to classify a specific point as interior, boundary, or exterior.
- **Rung 3 (transfer)**: learner correctly distinguishes a dense set from the whole space using
  the $\mathbb Q$ example, and correctly computes a boundary for a dense-with-dense-complement
  case.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the dual existential/universal test at $x=0$ on $(0,1]$.
- If MC-2 recurs, re-walk the $\mathbb Q$ triple contrast.
- If MC-3 recurs, re-walk the unit-disk-versus-$\mathbb Q$ boundary comparison.

## Memory Hooks
- "Interior: SOME neighborhood fits inside. Closure: EVERY neighborhood touches."
- "Dense means the closure is everything — the set itself can still be a thin sliver."
- "Boundary can be a thin curve, or it can be the entire space — never assume which."

## Transfer Connections
- `math.top.open-sets` (already authored, this campaign, Batch 181): supplies the metric-free
  open/closed-set vocabulary this concept's interior/closure/boundary computations are stated
  directly in terms of, and its own $\partial\mathbb Q=\mathbb R$ example this concept's
  Demonstration 3 directly reuses.

## Cross-Subject Connections
- Real analysis: the Baire Category Theorem, which characterizes "nowhere dense" sets via
  $\text{int}(\text{cl}(A))=\emptyset$, directly building on this concept's interior/closure
  machinery.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.interior-closure.md`, reused by
  reference for its neighborhood-characterization framing, its $(0,1]$ worked example, its unit
  disk classification of interior/boundary/exterior points, its $\mathbb Q$ density example, and
  its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe connecting to the Baire Category
  Theorem and nowhere-dense sets in complete metric spaces.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.open-sets`, unlocks none, cross_links none, expert/apply, mastery_threshold 0.85,
  estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 182): authored. Second entry this batch. Companion batch concept:
  `math.top.connectedness`.

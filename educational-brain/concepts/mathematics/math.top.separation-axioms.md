# math.top.separation-axioms

## Identity
- **KG id**: `math.top.separation-axioms`
- **Domain**: math.top
- **Requires**: `math.top.topological-space`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
State the five separation axioms T₀–T₄ and the STRICT implication chain
T₄⇒T₃⇒T₂⇒T₁⇒T₀ (never reversing the direction — T₄/normal is the STRONGEST, never the
weakest-sounding despite "regular" sounding more restrictive than "normal"); prove metric spaces
are T₄, and that Hausdorff (T₂) spaces have UNIQUE sequence limits; and apply Urysohn's Lemma
(T₄ ↔ disjoint closed sets separated by a continuous $[0,1]$-valued function), recognizing
normality ALONE never implies metrizability (second-countability is a separate, necessary
ingredient).

## Core Understanding
T₂'S SEPARATING NEIGHBORHOODS NEVER NEED TO PARTITION $X$: for $\mathbb R$, separating the points
$0$ and $2$: $U=(-1,1)$ and $V=(1,3)$ are open, disjoint, contain $0$ and $2$ respectively — but
$U\cup V\ne\mathbb R$; the point $1$ lies in NEITHER neighborhood. T₂ only demands DISJOINT open
sets around each point — nothing about covering or partitioning the whole space. Small,
non-covering neighborhoods satisfy the axiom perfectly.

T₄ (NORMAL) IS STRICTLY STRONGER THAN T₃ (REGULAR) — NEVER THE REVERSE, DESPITE "REGULAR" SOUNDING
MORE RESTRICTIVE: T₃ separates a POINT from a closed set; T₄ separates TWO CLOSED SETS from each
other. Since a point is itself a closed set in a T₁ space, separating two closed sets is AT LEAST
as demanding as separating a point from a closed set — so T₄⇒T₃, never T₃⇒T₄. The chain runs
T₄⇒T₃⇒T₂⇒T₁⇒T₀, each implication STRICT: the Sierpiński space $\{0,1\}$ with $\tau=\{\emptyset,
\{1\},X\}$ is T₀ (the open set $\{1\}$ separates $1$ from $0$) but NOT T₁ (no open set contains
$0$ without also containing... wait, no open set at all contains $0$ except $X$ itself, which
also contains $1$) — proving T₀⇏T₁. The cofinite topology on an infinite set is T₁ but not T₂
(any two nonempty open sets intersect, since their complements are finite).

NORMALITY ALONE NEVER IMPLIES METRIZABILITY — SECOND-COUNTABILITY IS A SEPARATE REQUIREMENT: for a
metric space $(X,d)$: T₂ follows from $B(x,r)\cap B(y,r)=\emptyset$ for $r=d(x,y)/2$; T₄ follows
from the Urysohn function $f(x)=d(x,F_1)/(d(x,F_1)+d(x,F_2))$ for disjoint closed $F_1,F_2$ — so
EVERY metric space is T₄. But Urysohn's METRIZATION theorem requires T₃ PLUS second-countability
to conclude metrizability — normality (T₄) by itself only provides Urysohn functions (continuous
separation), never a countable basis. The LONG LINE is a standard T₄, non-second-countable,
NON-metrizable space — proving normality alone is never sufficient.

## Mental Models
- **"T₂'s disjoint neighborhoods are a local promise, not a global partition — they can be tiny
  and leave most of the space untouched."**
- **"Normal separates closed set from closed set — strictly harder than regular's point-from-
  closed-set — so normal is the STRONGER axiom, whatever 'regular' sounds like."**
- **"Normality buys you continuous separating functions; metrizability additionally needs a
  countable basis — normal alone is never enough."**

## Why Students Fail

### MC-1: HAUSDORFF-NEIGHBORHOODS-PARTITION-X
- **Surface form**: believes T₂ requires the separating open sets $U,V$ to cover or partition
  $X$, missing that they only need to be disjoint and each contain the respective point.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "separating" two points
  suggestively implies dividing the whole space, when it only demands local disjointness).
- **Repair**: re-walk the $\mathbb R$ example separating $0,2$ via $(-1,1)$ and $(1,3)$, noting
  the point $1$ is in neither.

### MC-2: NORMAL-DOES-NOT-IMPLY-REGULAR
- **Surface form**: confuses the direction of the T₃/T₄ implication, sometimes believing T₃ is
  the stronger axiom since "regular" sounds more restrictive than "normal."
- **Birth type**: Foundational severity (Blueprint's own declared severity — the informal
  connotations of the words "regular" and "normal" actively mislead about which is stronger).
- **Repair**: re-derive the comparison directly from the definitions — separating two closed sets
  (T₄) is at least as hard as separating a point from a closed set (T₃).

### MC-3: NORMAL-IMPLIES-METRIZABLE
- **Surface form**: believes T₄ alone implies metrizability, missing that Urysohn's Metrization
  Theorem also requires second-countability.
- **Birth type**: Moderate severity (Blueprint's own declared severity — Urysohn's Lemma's
  continuous-separation power feels like it should be "enough" for a metric).
- **Repair**: re-anchor on the long line as a standard T₄, non-metrizable counterexample.

## Misconceptions

### MC-1: HAUSDORFF-NEIGHBORHOODS-PARTITION-X
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-2: NORMAL-DOES-NOT-IMPLY-REGULAR
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: NORMAL-IMPLIES-METRIZABLE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"T₂'s neighborhoods are two small private rooms, not a wall dividing the whole building —
  plenty of shared hallway can remain unclaimed by either."**
- **Anti-analogy**: "regular" and "normal" are not ranked by their everyday English connotations —
  normal (T₄) is the STRICTLY stronger, more demanding axiom, despite sounding like the more
  ordinary one.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\mathbb R$ example separating $0,2$ via $(-1,1)$,
  $(1,3)$, with the point $1$ in neither.
- **Demonstration 2 (targets MC-2)**: the direct point-versus-closed-set-separation comparison
  proving T₄⇒T₃.
- **Demonstration 3 (targets MC-3)**: the long line as a T₄, non-second-countable,
  non-metrizable counterexample, alongside metric spaces' own T₄ proof via Urysohn functions.

## Discovery Questions
1. "In a T₂ space, must the separating open sets $U,V$ cover or partition the whole space $X$?"
2. "Which is the stronger axiom, T₃ (regular) or T₄ (normal)?"
3. "Does T₄ (normality) alone guarantee a space is metrizable?"

## Teaching Sequence
1. **Representation shift**: the hierarchy table introduced progressively, working
   Demonstration 1, isolating MC-1.
2. **Counterexample**: the Sierpiński-space and cofinite-topology gap examples, working
   Demonstration 2, isolating MC-2.
3. **Deductive**: Urysohn's Lemma and the metric-space T₄ proof, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct proof that singletons are closed in a T₁ space, a correct
   demonstration that the cofinite topology is T₁ but not T₂, a correct limit-uniqueness proof in
   a Hausdorff space, and a correct explicit Urysohn function construction, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept a claim that T₂'s separating neighborhoods must cover or partition $X$.
- Never accept T₃ (regular) described as stronger than T₄ (normal).
- Never accept a claim that T₄ (normality) alone guarantees metrizability.

## Voice Teaching Notes
- Say "do $U$ and $V$ need to cover the whole space, or just be disjoint and contain their
  points?" whenever T₂ is being verified.
- Ask "which axiom separates POINTS from closed sets, and which separates CLOSED SETS from each
  other?" whenever T₃ versus T₄ is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the five separation axioms and the strict
  implication chain.
- **Rung 2 (application)**: learner correctly proves metric spaces are T₄ and that Hausdorff
  spaces have unique limits.
- **Rung 3 (transfer)**: learner correctly applies Urysohn's Lemma to construct an explicit
  separating function, and correctly explains why normality alone does not imply metrizability.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\mathbb R$ separating-neighborhoods example.
- If MC-2 recurs, re-derive the point-versus-closed-set-separation comparison.
- If MC-3 recurs, re-anchor on the long line counterexample.

## Memory Hooks
- "T₂'s neighborhoods are local and disjoint — never a partition of the whole space."
- "Normal separates closed-from-closed; regular separates point-from-closed — normal is
  strictly stronger."
- "Normal gives you Urysohn functions, not a metric — metrizability needs second-countability
  too."

## Transfer Connections
- `math.top.topological-space` (already authored, this campaign, Batch 180): supplies the
  open/closed-set framework this concept's five separation axioms are all stated directly within.

## Cross-Subject Connections
- Functional analysis: Urysohn's Lemma and the Tietze Extension Theorem underlie many
  extension-and-separation arguments used when constructing continuous functions on normal spaces.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.separation-axioms.md`, reused by
  reference for its hierarchy table, its Sierpiński-space and cofinite-topology counterexamples,
  its metric-space T₄ proof, its Urysohn's Lemma statement, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe proving every regular Lindelöf
  space is normal, and concluding every second-countable T₃ space is metrizable via Urysohn's
  Metrization Theorem.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.topological-space`, unlocks none, cross_links none, expert/analyze,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 186): authored. First entry this batch. Companion batch concept:
  `math.top.tychonoff`.

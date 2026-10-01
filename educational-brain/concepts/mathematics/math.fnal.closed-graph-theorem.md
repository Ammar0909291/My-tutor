# math.fnal.closed-graph-theorem

## Identity
- **KG id**: `math.fnal.closed-graph-theorem`
- **Domain**: math.fnal
- **Requires**: `math.fnal.open-mapping-theorem`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3

## Learning Objective
Recognize the "defined on all of $X$" hypothesis as REQUIRED — NEVER assume a closed graph on a
proper subspace implies boundedness; recognize completeness of BOTH spaces is REQUIRED — NEVER
assume closed graph implies boundedness for any normed spaces; and distinguish "closed graph" (a
JOINT condition on pairs) from continuity's one-sided definition — NEVER treat them as differing
in content for everywhere-defined operators.

## Core Understanding
"CLOSED GRAPH IMPLIES BOUNDED" REQUIRES $T$ DEFINED ON ALL OF $X$ — NEVER JUST A PROPER SUBSPACE:
for $T:\ell^2\to\ell^2$, $T(x_1,x_2,\ldots)=(x_1,2x_2,3x_3,\ldots)$: a direct estimate shows
$\|Te_n\|=n\to\infty$, so $T$ is UNBOUNDED. Yet checking the graph condition entry-by-entry:
$x^{(k)}\to x$, $Tx^{(k)}\to y$ gives $y_n=nx_n=(Tx)_n$, so $y=Tx$ — the GRAPH IS closed. This
does NOT contradict the theorem, because $T$ is only actually defined on
$\{x\in\ell^2:Tx\in\ell^2\}$, a PROPER subspace, not all of $\ell^2$. Believing a closed graph
implies boundedness even when $T$ is defined only on a proper subspace of a Banach space is WRONG
— the "full-domain" hypothesis is genuinely necessary, and this exact operator is the standard
counterexample when it's dropped.

COMPLETENESS OF BOTH SPACES IS REQUIRED — NEVER ASSUME CLOSED GRAPH IMPLIES BOUNDED FOR ANY
NORMED SPACES: let $T(f)=f'$ on $C^1([0,1])$ equipped with ONLY the sup-norm $\|f\|_\infty$ (not
the $C^1$-norm) — NOT complete. The graph is still closed in the same sequential sense, yet $T$ is
NOT bounded (take $f_n(x)=x^n/n$: $\|f_n\|_\infty=1/n\to0$ but $\|f_n'\|_\infty=1$, so
$\|Tf_n\|/\|f_n\|\to\infty$). Believing a closed graph always implies boundedness for linear
operators between ANY two normed spaces (complete or not) is WRONG — the theorem's conclusion
requires BOTH spaces to be Banach; drop completeness and the closed-graph condition can hold for a
genuinely unbounded operator.

CLOSED GRAPH IS A JOINT CONDITION ON PAIRS — NEVER SIMPLY THE SAME AS CONTINUITY'S ONE-SIDED
DEFINITION: continuity says $x_n\to x\Rightarrow Tx_n\to Tx$; closed graph says, ADDITIONALLY,
that IF $x_n\to x$ AND $Tx_n\to y$ (for SOME $y$, not necessarily $Tx$ yet), THEN $y=Tx$. For an
everywhere-defined operator these turn out equivalent (continuity forces $Tx_n\to Tx$, and
uniqueness of limits then gives $y=Tx$ automatically) — but treating "closed graph" and
"continuous at every point" as IDENTICAL definitions, rather than recognizing the theorem
precisely encodes their equivalence under completeness, misses the actual content of what makes
the theorem non-trivial.

## Mental Models
- **"Every bounded operator has a closed graph — that's necessity. The theorem's surprise is the
  converse: closed graph implies bounded, but only under real hypotheses."**
- **"The closed-graph check replaces 'bound ‖Tx‖ directly' with 'show the limit lands where it
  should' — often easier, but the theorem's hypotheses (full domain, both spaces Banach) must
  hold first."**
- **"Closed graph and continuity coincide for everywhere-defined operators between Banach spaces
  — that coincidence IS the theorem, not something to take for granted separately."**

## Why Students Fail

### MC-1: CLOSED-GRAPH-IMPLIES-BOUNDED-ON-SUBDOMAINS
- **Surface form**: believes a closed graph implies boundedness even when $T$ is only defined on
  a proper subspace of a Banach space, missing the "full-domain" hypothesis.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  theorem's statement is often remembered without its precise domain requirement).
- **Repair**: re-identify which hypothesis fails in the $\ell^2$-scaling example — $T$ is not
  defined on all of $X$, only on a subspace — and why this matters for the proof via the Open
  Mapping Theorem.

### MC-2: CLOSED-GRAPH-IMPLIES-BOUNDED-WITHOUT-COMPLETENESS
- **Surface form**: believes a closed graph always implies boundedness for linear operators
  between any normed spaces, missing that completeness of BOTH spaces is required.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  "closed graph implies bounded" slogan is easily detached from its Banach-space hypothesis).
- **Repair**: re-walk the $C^1$-under-sup-norm counterexample, showing closed graph but unbounded
  $T$.

### MC-3: CLOSED-GRAPH-CONFUSED-WITH-CONTINUITY-DEFINITION
- **Surface form**: believes "closed graph" and "continuous at every point" are the same
  condition, missing that closed graph is a joint condition on pairs while continuity can be
  stated one-sidedly.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — the two
  conditions are stated similarly enough to blur together without careful comparison).
- **Repair**: compare the definitions explicitly — continuity says $x_n\to x\Rightarrow Tx_n\to
  Tx$; closed graph additionally requires $Tx_n\to y\Rightarrow y=Tx$, automatic once $Tx_n\to Tx$
  and limits are unique.

## Misconceptions

### MC-1: CLOSED-GRAPH-IMPLIES-BOUNDED-ON-SUBDOMAINS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: CLOSED-GRAPH-IMPLIES-BOUNDED-WITHOUT-COMPLETENESS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: CLOSED-GRAPH-CONFUSED-WITH-CONTINUITY-DEFINITION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Checking the closed-graph condition is like checking a vending machine's receipts match its
  dispensed items — but that check only certifies the machine if it's actually stocked (full
  domain) and its supply chain is reliable (both spaces complete)."**
- **Anti-analogy**: a closed graph on a proper subspace isn't a weaker version of the theorem's
  guarantee — it's simply outside the theorem's scope entirely, and the operator can genuinely be
  unbounded.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\ell^2$-scaling-by-$n$ closed-graph-but-improper-domain
  example.
- **Demonstration 2 (targets MC-2)**: the differentiation-operator closed-graph check replacing a
  direct norm estimate.
- **Demonstration 3 (targets MC-2, via counterexample)**: the $C^1$-under-sup-norm
  incomplete-domain counterexample.

## Discovery Questions
1. "If T is defined on a proper subspace of a Banach space (not all of it), does a closed graph
   still imply boundedness?"
2. "Does a closed graph imply boundedness for linear operators between any two normed spaces,
   complete or not?"
3. "Are 'closed graph' and 'continuous at every point' identical conditions?"

## Teaching Sequence
1. **Representation shift**: state the theorem, work Example 1's closed-graph-but-improper-domain
   case, isolating MC-1.
2. **Deductive**: work Example 2's differentiation-operator closed-graph check in place of a norm
   estimate.
3. **Counterexample**: work Example 3's incomplete-domain counterexample, isolating MC-2.
4. **Mastery gate**: require a correct theorem statement with all hypotheses, a correct
   closed-graph verification for a genuinely everywhere-defined operator, a correct explanation
   of why the full-domain condition can't be dropped, and a correct explanation of the proof via
   the Open Mapping Theorem's bounded-inverse corollary (isolating MC-3 via the continuity
   comparison), at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a closed graph on a proper subspace treated as sufficient for boundedness.
- Never accept the closed-graph theorem applied without checking both spaces are Banach.
- Never accept "closed graph" and "continuous at every point" treated as identical without noting
  the joint-condition distinction.

## Voice Teaching Notes
- Say "is T actually defined on the whole space, or just a subspace?" whenever the closed-graph
  theorem is invoked.
- Ask "are both spaces genuinely complete here?" whenever a closed-graph argument is used to
  conclude boundedness.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the Closed Graph Theorem with all hypotheses.
- **Rung 2 (application)**: learner correctly verifies the graph is closed for a genuinely
  everywhere-defined operator and applies the theorem to conclude boundedness.
- **Rung 3 (transfer)**: learner correctly diagnoses why a physicist's operator on a dense
  subspace of $L^2$ (not all of $L^2$) can't invoke the theorem directly, and identifies the
  density-extension fix.

## Tutor Recovery Strategy
- If MC-1 recurs, re-identify the domain-restriction failure in the $\ell^2$-scaling example.
- If MC-2 recurs, re-walk the $C^1$-under-sup-norm incompleteness counterexample.
- If MC-3 recurs, re-compare the closed-graph and continuity definitions explicitly.

## Memory Hooks
- "Closed graph needs T defined on ALL of X — a proper subspace voids the guarantee."
- "Closed graph implies bounded only when BOTH spaces are Banach — never for any normed spaces."
- "Closed graph is a joint condition on pairs — its equivalence to continuity IS the theorem."

## Transfer Connections
- `math.fnal.open-mapping-theorem` (prerequisite, already authored, this campaign): supplies the
  bounded-inverse corollary this theorem's proof directly applies to the graph-projection map.

## Cross-Subject Connections
- Quantum mechanics and PDE theory: unbounded operators (like differentiation or multiplication
  operators) defined only on dense subspaces are the standard setting where the closed-graph
  criterion's full-domain hypothesis becomes practically important to check.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.closed-graph-theorem.md`, reused by
  reference for its three worked examples (the standard $\ell^2$-scaling counterexample) and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a physicist's operator defined on
  a dense subspace of $L^2$, and the density-extension fix that avoids the domain-hypothesis gap.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.open-mapping-theorem`, unlocks none, cross_links none, expert/understand,
  mastery_threshold 0.75, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 231): authored. First entry this batch. Companion batch concept:
  `math.fnal.hahn-banach`.

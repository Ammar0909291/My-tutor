# math.abst.group-order

## Identity
- **KG id**: `math.abst.group-order`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: `math.abst.lagrange-theorem`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Distinguish the ORDER OF A GROUP $|G|$ (the number of elements in $G$) from the ORDER OF AN
ELEMENT $\mathrm{ord}(g)$ (the smallest positive integer $k$ with $g^k=e$) — two genuinely
different quantities sharing one overloaded word; compute element orders directly via ORBIT TABLES
(reusing `math.abst.group-theory`'s own G4 inverse-existence and G2 associativity directly in the
computation); and verify EMPIRICALLY that $\mathrm{ord}(g)$ always divides $|G|$ in a finite group
— a preview of the Lagrange divisibility property `math.abst.lagrange-theorem` will prove in full
generality.

## Core Understanding
Two SEPARATE uses of the word "order" coexist in group theory. The ORDER OF THE GROUP, $|G|$, is
simply the number of elements: $|\mathbb Z/6\mathbb Z|=6$, $|D_3|=6$, $|\{e\}|=1$. The ORDER OF AN
ELEMENT, $\mathrm{ord}(g)$, is the smallest positive integer $k$ such that $g^k=e$ (if no such $k$
exists, $\mathrm{ord}(g)=\infty$); $\mathrm{ord}(e)=1$ in EVERY group, with no exceptions, since
$e^1=e$.

The ORBIT TABLE is the primary computational tool: compute $g,g^2,g^3,\ldots$ until reaching $e$,
and the step count at which $e$ first appears IS $\mathrm{ord}(g)$. In $\mathbb Z/6\mathbb Z$:
$\mathrm{ord}(1)=6$ (orbit $1,2,3,4,5,0$), $\mathrm{ord}(2)=3$ (orbit $2,4,0$),
$\mathrm{ord}(3)=2$ (orbit $3,0$) — element orders are $\{1,2,3,6\}$, all divisors of $|G|=6$.

A GENERATOR of a cyclic group is an element $g$ with $\mathrm{ord}(g)=|G|$ — equivalently, $G$ is
CYCLIC iff some element has order equal to the full group order. In $\mathbb Z/6\mathbb Z$,
elements $1$ and $5$ are generators (order $6$); in $D_3$, NO element has order $6$ (maximum order
found is $3$, for the rotations $r,r^2$) — $D_3$ is NOT cyclic, despite also having $6$ elements.

The KEY THEOREM (provable directly, not merely observed): $g^n=e$ **iff** $\mathrm{ord}(g)\mid n$.
Proof: if $g^n=e$, write $n=q\cdot\mathrm{ord}(g)+r$ with $0\le r<\mathrm{ord}(g)$ (Euclidean
division). Then $g^n=(g^{\mathrm{ord}(g)})^q\cdot g^r=e^q\cdot g^r=g^r$. Since $g^n=e$, this forces
$g^r=e$ with $r<\mathrm{ord}(g)$ — but $\mathrm{ord}(g)$ is by definition the SMALLEST positive
exponent giving $e$, so $r=0$ is forced (minimality), meaning $\mathrm{ord}(g)\mid n$ exactly.

In a FINITE group, every element's order DIVIDES the group order: $|\mathbb Z/6\mathbb Z|=6$;
observed orders $\{1,2,3,6\}$ all divide $6$. $|D_3|=6$; observed orders $\{1,2,3\}$ all divide
$6$. This divisibility pattern is exactly what `math.abst.lagrange-theorem` will prove in full
generality — here it is verified empirically, motivating the full proof to come.

## Mental Models
- **"$|G|$ counts the group; $\mathrm{ord}(g)$ counts how many steps until an element returns to
  identity — two different questions sharing one word."**
- **"The orbit table $g,g^2,g^3,\ldots$ until $e$ IS both the computation method and the proof of
  the order."**
- **"$\mathrm{ord}(g)=|G|$ means $g$ is a generator; $\mathrm{ord}(g)$ always divides $|G|$ in a
  finite group."**

## Why Students Fail

### MC-1: ORDER-OF-GROUP-VS-ELEMENT
- **Surface form**: confuses "order of the group" (number of elements) with "order of an element"
  (smallest power giving identity) — treats the two questions as one.
- **Birth type**: Type 3, language contamination (Blueprint's own declared FOUNDATIONAL severity,
  here attributed to the single English word "order" being formally overloaded to name two
  genuinely distinct mathematical quantities simultaneously — nothing in the shared vocabulary
  signals which meaning is intended in a given context, until the notation $|G|$ versus
  $\mathrm{ord}(g)$ is explicitly distinguished).
- **Repair**: re-state both quantities side by side using their distinct notations ($|G|$ versus
  $\mathrm{ord}(g)$) for the specific group and element in question, confirming they answer
  different questions.

### MC-2: ORDER-ALWAYS-EQUALS-GROUP-ORDER
- **Surface form**: claims every element has order equal to $|G|$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity, here
  attributed to over-generalizing from GENERATORS of $\mathbb Z/n\mathbb Z$, which do have order
  $n$ — a salient, frequently-encountered case — while forgetting elements like the identity
  (always order $1$) or proper-subgroup generators (order strictly less than $|G|$) exist in every
  group).
- **Repair**: re-compute the specific counterexample element's order directly via its orbit table,
  confirming it is strictly less than $|G|$.

### MC-3: ORD-NOT-DIVIDES-GROUP-ORDER
- **Surface form**: after computing element orders, doesn't apply the fact that $\mathrm{ord}(g)$
  must divide $|G|$ — treats the divisibility pattern as coincidental rather than as a usable
  constraint.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Secondary severity, here
  attributed to the divisibility pattern being demonstrated only empirically at this stage — its
  FULL proof is deliberately deferred to `math.abst.lagrange-theorem` — so without a proof in hand,
  the pattern can be dismissed as an unproven coincidence rather than a reliable constraint to
  apply prospectively).
- **Repair**: re-verify the divisibility pattern explicitly for the specific group order in
  question, then apply it prospectively to rule out impossible element orders before computing.

## Misconceptions

### MC-1: ORDER-OF-GROUP-VS-ELEMENT
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: ORDER-ALWAYS-EQUALS-GROUP-ORDER
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ORD-NOT-DIVIDES-GROUP-ORDER
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"$|G|$ is like the total headcount of a club; $\mathrm{ord}(g)$ is like how many steps a
  specific member takes walking around a circular track before returning to the starting line —
  entirely different questions about entirely different things, even though both get called
  'order.'"**
- **Anti-analogy**: an element's order is NOT automatically the group's order — most elements have
  STRICTLY SMALLER orders; only generators of a cyclic group achieve $\mathrm{ord}(g)=|G|$.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $D_3$ (elements $e,r,r^2,s,rs,r^2s$): $|D_3|=6$
  (headcount), while $\mathrm{ord}(r)=3$ (orbit $r,r^2,e$) — two clearly different numbers for the
  same group, side by side.
- **Demonstration 2 (targets MC-2)**: in $\mathbb Z/6\mathbb Z$: $\mathrm{ord}(e)=\mathrm{ord}(0)=1$
  always, directly contradicting "every element has order $|G|=6$"; $\mathrm{ord}(2)=3$ (orbit
  $2,4,0$), also strictly less than $6$.
- **Demonstration 3 (targets MC-3)**: the full orbit table for $\mathbb Z/8\mathbb Z$: orders found
  are $\{1,2,4,8\}$ — all divisors of $8$; applying the pattern prospectively, an element of order
  $5$ or $3$ is IMPOSSIBLE in this group, since neither divides $8$.

## Discovery Questions
1. "Is $|G|$ the same quantity as $\mathrm{ord}(g)$ for a specific element $g$?"
2. "Does every element of a group have order equal to the group's own order?"
3. "If a group has order $12$, could an element have order $5$? What about order $4$?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own G4 (inverse existence, underlying why an
   orbit eventually returns to $e$) and G2 (associativity, needed for the Euclidean-division proof
   step), framing element order as a NEW computation built on already-mastered axioms.
2. **Conflict evidence**: the $D_3$ side-by-side $|D_3|=6$ versus $\mathrm{ord}(r)=3$ demonstration,
   breaking MC-1 directly.
3. **Contrast pair**: a generator (order $=|G|$) directly against a non-generator (order $<|G|$),
   isolating MC-2; the empirical divisibility pattern applied prospectively to rule out impossible
   orders, isolating MC-3.
4. **Mastery gate**: require a correct orbit-table computation, a correct group-vs-element-order
   distinction, and a correct prospective application of the divisibility pattern, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept an "order" claim without requiring the learner to specify whether they mean the
  group's order or a specific element's order.
- When an element order is proposed, require the divisibility pattern ($\mathrm{ord}(g)\mid|G|$) to
  be checked before accepting the answer as plausible.

## Voice Teaching Notes
- Say "are you talking about the group's order or this element's order right now?" whenever the
  two are at risk of being conflated.
- When an order is proposed for a finite group, ask "does that number divide $|G|$? If not, it
  can't be right."

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes $|G|$ from $\mathrm{ord}(g)$ for a
  specific group and element, using an orbit table.
- **Rung 2 (application)**: learner correctly identifies whether a given element is a generator
  (order $=|G|$), and correctly applies the divisibility constraint to rule out impossible orders.
- **Rung 3 (transfer)**: learner correctly proves, for a group of order $15$, that an element with
  $g^5\ne e$ and $g^3\ne e$ must have order exactly $15$, and correctly concludes the group is
  cyclic.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state both quantities side by side for the specific case in question.
- If MC-2 recurs, re-compute the specific counterexample element's order via its orbit table.
- If MC-3 recurs, re-verify the divisibility pattern for the specific group order in question.

## Memory Hooks
- "$|G|$ counts the group; $\mathrm{ord}(g)$ counts an element's own return trip."
- "Identity always has order $1$ — never order $|G|$, unless $|G|=1$."
- "$g^n=e\iff\mathrm{ord}(g)\mid n$ — the divisibility test, not a coincidence."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign): supplies G4 (inverse existence,
  underlying orbit termination) and G2 (associativity, used in the Euclidean-division proof of the
  $g^n=e\iff\mathrm{ord}(g)\mid n$ theorem) this concept's computations and proofs directly reuse.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-order.md`, reused by reference for
  its representation-shift two-meanings-of-order table, its pattern-induction $D_3$ element-order
  gallery, its contrast-pair generator/identity demonstration, and its three-misconception registry
  (birth types independently classified, since this Blueprint states Root Cause/Severity but not a
  formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a group of order
  $15$, determining an element's order exactly from partial divisibility information and concluding
  cyclicity).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.group-
  theory`, unlocks `math.abst.lagrange-theorem`, cross_links none, advanced/apply, mastery_threshold
  0.9, estimated_hours 3) was directly verified against the live KG and matches exactly. The
  Blueprint's own correctly-declared independence P76 mode (cross_links empty in KG) required no
  correction.

## Version History
- 2026-09-14 (Batch 86): authored. Third entry this batch, part of the 9-candidate frontier opened
  by Batch 84's `group-theory`. Companion batch concepts: `math.abst.ideal`, `math.abst.coset`,
  `math.abst.polynomial-ring`. `math.abst` moves from 7/37 toward **11/37** this batch.

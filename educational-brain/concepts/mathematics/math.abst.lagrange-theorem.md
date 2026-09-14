# math.abst.lagrange-theorem

## Identity
- **KG id**: `math.abst.lagrange-theorem`
- **Domain**: math.abst
- **Requires**: `math.abst.coset`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State and prove LAGRANGE'S THEOREM — for a finite group $G$ and subgroup $H\le G$, $|H|$ divides
$|G|$, with $|G|=|H|\cdot[G:H]$ (reusing `math.abst.coset`'s own partition property and equal-size
bijection DIRECTLY as the proof's two load-bearing facts); apply its three key COROLLARIES
(element order divides $|G|$; groups of prime order are cyclic; $g^{|G|}=e$ for every $g$); and
correctly distinguish the theorem (NECESSARY: subgroup order divides group order) from its FALSE
converse (divisor of $|G|$ does NOT guarantee a subgroup of that order).

## Core Understanding
LAGRANGE'S THEOREM: for a FINITE group $G$ and any subgroup $H\le G$, $|H|$ divides $|G|$; more
precisely, $|G|=|H|\cdot[G:H]$, where $[G:H]$ is the INDEX (number of distinct cosets, reusing
`math.abst.coset` directly). The proof reduces entirely to two facts `math.abst.coset` already
established: (1) distinct cosets PARTITION $G$ into non-overlapping blocks; (2) every coset has
the SAME SIZE $|H|$ (via the bijection $h\mapsto ah$). If there are $k$ distinct cosets, then
$|G|=k\cdot|H|$ directly, forcing $|H|\mid|G|$.

Three COROLLARIES follow immediately: **C1** — the order of any element $g$ divides $|G|$ (since
$\langle g\rangle$ is a subgroup of order $\mathrm{ord}(g)$, apply Lagrange directly). **C2** — any
group of PRIME order $p$ is CYCLIC (isomorphic to $\mathbb Z/p\mathbb Z$): pick any $g\ne e$;
$\mathrm{ord}(g)\mid p$ forces $\mathrm{ord}(g)\in\{1,p\}$; since $g\ne e$ rules out $1$,
$\mathrm{ord}(g)=p$, so $\langle g\rangle=G$. **C3** — $g^{|G|}=e$ for EVERY $g\in G$ (since
$\mathrm{ord}(g)\mid|G|$, apply the $g^n=e\iff\mathrm{ord}(g)\mid n$ theorem directly).

Lagrange's theorem gives a NECESSARY condition only — $|H|\mid|G|$ is REQUIRED for a subgroup of
order $|H|$ to exist, but is NOT SUFFICIENT. The CONVERSE is FALSE: $A_4$ (the alternating group on
4 elements, $|A_4|=12$) has $6\mid12$, yet $A_4$ has NO subgroup of order $6$ — divisibility alone
never guarantees the subgroup exists. Corollary C2 is likewise SCOPED strictly to prime order: a
group of COMPOSITE order (e.g. $|D_3|=6$) need NOT be cyclic — $D_3$ itself is non-abelian, hence
genuinely not cyclic, despite $6$ having multiple divisors.

## Mental Models
- **"Cosets partition $G$ into equal-size blocks of size $|H|$ — count the blocks, and $|H|$
  divides $|G|$ automatically."**
- **"Lagrange is a ONE-WAY street: subgroup order divides group order, but a divisor doesn't
  guarantee a subgroup."**
- **"Prime order forces cyclic — composite order does not; $D_3$ (order 6, non-cyclic) is the
  standing counterexample."**

## Why Students Fail

### MC-1: LAGRANGE-CONVERSE-TRUE
- **Surface form**: claims "if $d$ divides $|G|$, then $G$ has a subgroup of order $d$" — treating
  the theorem as a two-way equivalence.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to the theorem's own directional statement — "subgroup order divides group order" —
  being mentally reversed into the more symmetric-feeling claim "divisor implies subgroup," a
  pattern reinforced by small, well-behaved groups like cyclic groups where the converse HAPPENS
  to hold for every divisor, until a genuinely counterexample-bearing group like $A_4$ is tried).
- **Repair**: re-state the theorem's precise direction (subgroup $\Rightarrow$ divides) alongside
  the $A_4$ counterexample (order 12, no subgroup of order 6) for the specific claim in question.

### MC-2: COSET-OVERLAP-POSSIBLE
- **Surface form**: believes two different cosets might share an element.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity, here attributed
  to the partition property from `math.abst.coset` not yet being fully absorbed as a PREREQUISITE
  fact — this concept's proof assumes it rather than re-deriving it, so a gap in that earlier
  concept surfaces here as an apparent failure of Lagrange's own proof rather than being
  recognized as a prerequisite recall issue).
- **Repair**: re-verify the coset partition property directly for the specific pair of cosets in
  question (shared element forces equal cosets, per `math.abst.coset`'s own equality criterion).

### MC-3: COROLLARY-OVERSHOOT
- **Surface form**: applies corollary C2 (prime-order groups are cyclic) to NON-prime group
  orders.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity, here attributed to
  C2's own elegant, memorable statement — "order $n$ forces cyclic" — being retained without its
  essential SCOPE qualifier, "$n$ prime," since the qualifier is easy to drop from an otherwise
  clean-sounding rule).
- **Repair**: re-state C2's precise scope (prime order only) alongside the $D_3$ counterexample
  (order 6, non-cyclic) for the specific group order in question.

## Misconceptions

### MC-1: LAGRANGE-CONVERSE-TRUE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: COSET-OVERLAP-POSSIBLE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: COROLLARY-OVERSHOOT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Lagrange's theorem is like saying every apartment building's floor count must divide its
  total unit count evenly — but knowing a number divides the total doesn't tell you a building
  with that many floors actually exists."**
- **Anti-analogy**: Lagrange's theorem does NOT certify that a subgroup of every divisor-order
  exists — it only rules OUT non-divisor orders; existence is a separate, much harder question.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: in $D_3$, $H=\{e,r,r^2\}$: cosets $eH=\{e,r,r^2\}$ and
  $sH=\{s,sr,sr^2\}$ — exactly two, disjoint, each of size 3, confirming $|D_3|=6=3\times2$.
- **Demonstration 2 (targets MC-1)**: $A_4$ has order 12 and $6\mid12$, yet $A_4$ has NO subgroup
  of order 6 — a genuine, standard counterexample to the converse, cited without full proof at
  this level.
- **Demonstration 3 (targets MC-3)**: $|D_3|=6$ (composite, not prime) — $D_3$ is non-abelian,
  hence NOT cyclic, directly refuting "order 6 forces cyclic"; contrast $\mathbb Z/6\mathbb Z$
  (also order 6, genuinely cyclic) — same order, structurally different groups.

## Discovery Questions
1. "If $6$ divides $|G|$, does $G$ necessarily have a subgroup of order 6?"
2. "Is every group of order 7 cyclic? What about every group of order 6?"
3. "Can two different cosets of the same subgroup share an element?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.coset`'s own partition property and equal-size bijection,
   framing Lagrange's proof as their direct three-line consequence.
2. **Conflict evidence**: the $A_4$-order-12-no-subgroup-of-order-6 counterexample, breaking MC-1
   directly.
3. **Contrast pair**: the theorem (subgroup $\Rightarrow$ divides) against its false converse
   (divides $\Rightarrow$ subgroup), isolating MC-1; $D_3$ (order 6, non-cyclic) against $\mathbb
   Z/6\mathbb Z$ (order 6, cyclic), isolating MC-3.
4. **Mastery gate**: require a correct statement and proof of the theorem, a correct application
   distinguishing possible from guaranteed subgroup orders, and a correct scoped application of
   corollary C2, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "6 divides 12, so a subgroup of order 6 exists" without requiring the learner to
  acknowledge this is unguaranteed, citing the $A_4$ counterexample.
- When corollary C2 is applied, require the learner to state explicitly that the group order is
  prime before concluding cyclicity.

## Voice Teaching Notes
- Say "does divisibility guarantee the subgroup exists, or only rule out the ones that can't?"
  whenever the converse is assumed.
- When C2 is invoked, ask "is that order actually prime, or just some number?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes cosets for a specific group/subgroup pair
  and verifies $|G|=|H|\times[G:H]$.
- **Rung 2 (application)**: learner correctly determines which subgroup orders are POSSIBLE
  (divide $|G|$) for a given group order, and correctly identifies element orders via corollary C1.
- **Rung 3 (transfer)**: learner correctly reasons about possible element orders and cyclicity for
  a group of a genuinely novel composite order, citing the correct scope of corollary C2.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the theorem's direction alongside the $A_4$ counterexample for the
  specific claim in question.
- If MC-2 recurs, re-verify the coset partition property for the specific pair of cosets in
  question.
- If MC-3 recurs, re-state C2's scope alongside the $D_3$ counterexample for the specific group
  order in question.

## Memory Hooks
- "Cosets partition into equal blocks of size $|H|$ — count the blocks."
- "Lagrange is one-way: subgroup divides group. A₄ (order 12, no subgroup of order 6) is the
  standing reminder."
- "C2 needs PRIME order — $D_3$ (order 6, non-cyclic) is the counterexample for composite order."

## Transfer Connections
- `math.abst.coset` (already authored, this campaign): supplies the partition property and
  equal-size bijection this concept's entire proof directly reuses, and the index $[G:H]$ this
  concept's own formula $|G|=|H|\cdot[G:H]$ builds on.
- `math.abst.group-order` (already authored, this campaign): supplies the element-order machinery
  ($g^n=e\iff\mathrm{ord}(g)\mid n$) corollary C3 directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.lagrange-theorem.md`, reused by
  reference for its representation-shift $D_3$ coset-partition proof walkthrough, its pattern-
  induction subgroup-order gallery ($A_4$'s converse failure), its contrast-pair theorem-vs-
  converse and prime-vs-composite corollary treatment, and its three-misconception registry (birth
  types independently classified, since this Blueprint states Root Cause/Severity but not a formal
  Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a group of order
  21, determining possible subgroup and element orders and reasoning about non-necessary
  cyclicity).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.coset`,
  unlocks none, cross_links none, advanced/understand, mastery_threshold 0.9, estimated_hours 3)
  was directly verified against the live KG and matches exactly. The Blueprint's own correctly-
  declared independence P76 mode (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 87): authored. Second entry this batch. Companion batch concepts: `math.abst.
  prime-ideal`, `math.abst.quotient-ring`, `math.abst.normal-subgroup`. `math.abst` moves from
  11/37 toward **15/37** this batch.

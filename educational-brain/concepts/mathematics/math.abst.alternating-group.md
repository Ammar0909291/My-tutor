# math.abst.alternating-group

## Identity
- **KG id**: `math.abst.alternating-group`
- **Domain**: math.abst
- **Requires**: `math.abst.symmetric-group`, `math.abst.normal-subgroup`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define the ALTERNATING GROUP $A_n$ as the set of all EVEN permutations in $S_n$ (a permutation is
even if it decomposes into an even number of transpositions, computed via the $k$-cycle $=k-1$
transpositions rule); state that $|A_n|=n!/2$ and that $A_n\trianglelefteq S_n$ (index-2 subgroups
are always normal, equivalently the kernel of the parity homomorphism); and recognize $A_n$'s
abelian/cyclic behavior varies by $n$ (abelian and cyclic for $n\le3$, non-abelian for $n\ge4$),
with $A_n$ SIMPLE for $n\ge5$ as the single most important fact about alternating groups.

## Core Understanding
THE ALTERNATING GROUP $A_n$ is the set of all EVEN permutations in $S_n$ under composition. A
permutation is EVEN if it can be written as a product of an even number of TRANSPOSITIONS
(2-cycles); ODD if it requires an odd number — the parity is well-defined. The PARITY RULE: a
$k$-cycle decomposes into exactly $k-1$ transpositions, so parity is computed as (sum of
$(\text{length}-1)$ over all disjoint cycles) mod 2 — a 3-cycle contributes 2 (even), a
transposition contributes 1 (odd), a 4-cycle contributes 3 (odd).

$|A_n|=n!/2$ AND $A_n\trianglelefteq S_n$: exactly half of $S_n$'s permutations are even, giving
$|A_n|=n!/2$. Normality follows two equivalent ways: (1) the PARITY HOMOMORPHISM $\pi:S_n\to
\mathbb Z/2\mathbb Z$ (even $\mapsto0$, odd$\mapsto1$) has $\ker(\pi)=A_n$, and kernels of group
homomorphisms are always normal (reusing `math.abst.normal-subgroup`'s own kernel-is-normal fact
directly); (2) $A_n$ has index 2 in $S_n$, and index-2 subgroups are always normal.

$A_n$'S STRUCTURE VARIES SHARPLY BY $n$: $A_3\cong\mathbb Z/3\mathbb Z$ — abelian and cyclic
(order 3, prime, so necessarily cyclic). For $n\ge4$, $A_n$ is NON-ABELIAN (verified directly:
$(1\,2\,3)\circ(1\,2\,4)\ne(1\,2\,4)\circ(1\,2\,3)$ in $A_4$) and hence NOT cyclic. $A_4$ (order
12) has NO subgroup of order 6 — a famous counterexample to the false "Lagrange converse" (that a
subgroup of every divisor-order must exist). MOST IMPORTANTLY: $A_n$ IS SIMPLE FOR $n\ge5$ — it
has no proper nontrivial normal subgroups, making it the "atom" from which, via the Jordan-Hölder
theorem, all finite groups are ultimately built; $A_5$'s simplicity is the group-theoretic reason
the general quintic has no radical solution formula (Galois theory).

## Mental Models
- **"Parity is decided purely by transposition count mod 2 — never by 'how the permutation
  looks.'"**
- **"$A_n$ is always normal in $S_n$ — it's the kernel of the parity homomorphism, or equivalently
  an index-2 subgroup."**
- **"$A_3$ is cyclic by coincidence of small size — $A_n$ for $n\ge4$ is genuinely non-abelian, and
  for $n\ge5$ is SIMPLE, the deepest fact in this concept."**

## Why Students Fail

### MC-1: EVEN-PERMUTATION-IS-EVEN-LOOKING
- **Surface form**: determines parity by counting fixed points or by the permutation's "visual"
  appearance rather than the number of transpositions.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared FOUNDATIONAL severity —
  conflates the cycle STRUCTURE's visual pattern with parity, not applying the mechanical
  transposition-count rule: $k$-cycle $=k-1$ transpositions).
- **Repair**: re-attempt the specific permutation's transposition-count computation directly,
  summing $(\text{length}-1)$ over every disjoint cycle.

### MC-2: A_N-ALWAYS-CYCLIC
- **Surface form**: claims $A_n$ is cyclic for all $n$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity —
  over-generalizes from $A_3\cong\mathbb Z/3\mathbb Z$ without checking commutativity or element
  orders for $n\ge4$).
- **Repair**: re-attempt the specific $A_4$ non-commutativity computation directly, comparing
  $(1\,2\,3)\circ(1\,2\,4)$ against $(1\,2\,4)\circ(1\,2\,3)$.

### MC-3: A_N-NOT-NORMAL
- **Surface form**: doubts $A_n\trianglelefteq S_n$ because "not every subgroup is normal."
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity — the
  general fact "most subgroups aren't normal" is applied unmodified to $A_n$, forgetting the
  specific theorem that index-2 subgroups are always normal and that $A_n$ is a homomorphism's
  kernel).
- **Repair**: re-attempt the specific parity-homomorphism argument directly, confirming
  $\ker(\pi)=A_n$.

## Misconceptions

### MC-1: EVEN-PERMUTATION-IS-EVEN-LOOKING
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-2: A_N-ALWAYS-CYCLIC
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: A_N-NOT-NORMAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Parity is like counting how many times you flip a coin to reach a state — the FINAL count's
  even-or-odd matters, never the shape the coin makes along the way."**
- **Anti-analogy**: $A_n$ is NOT automatically cyclic just because $A_3$ happens to be — cyclicity
  requires abelian structure, and $A_n$ for $n\ge4$ genuinely fails to commute.

## Demonstrations
- **Demonstration 1 (targets MC-1, the parity table)**: in $S_3$, classifying $e$ (0
  transpositions, even), $(1\,2\,3)$ and $(1\,3\,2)$ (2 transpositions each, even), and
  $(1\,2),(1\,3),(2\,3)$ (1 transposition each, odd) — giving $A_3=\{e,(1\,2\,3),(1\,3\,2)\}$,
  $|A_3|=3=3!/2$, and $A_3\cong\mathbb Z/3\mathbb Z$.
- **Demonstration 2 (targets MC-3)**: the parity homomorphism $\pi:S_n\to\mathbb Z/2\mathbb Z$
  satisfies $\pi(\sigma\tau)=\pi(\sigma)+\pi(\tau)$ (parities add mod 2); $\ker(\pi)=A_n$; since
  kernels of homomorphisms are always normal, $A_n\trianglelefteq S_n$ directly.
- **Demonstration 3 (targets MC-2, non-abelian $A_4$)**: computing $(1\,2\,3)\circ(1\,2\,4)$ and
  $(1\,2\,4)\circ(1\,2\,3)$ in $A_4$ and confirming the results differ, establishing $A_4$ is
  non-abelian and hence not cyclic — contrasted directly against $A_3\cong\mathbb Z/3\mathbb Z$.
- **Demonstration 4 (the pattern gallery, $A_n$ across $n$)**: $A_2$ trivial; $A_3$ abelian/cyclic/
  simple (order 3, prime); $A_4$ non-abelian/non-cyclic/NOT simple (has the normal $V_4$ subgroup,
  and famously no subgroup of order 6, a counterexample to the false Lagrange converse); $A_5$ and
  beyond SIMPLE — the single deepest fact this concept teaches.

## Discovery Questions
1. "A student classifies $(1\,2)(3\,4)(5\,6)$ as 'even because it looks symmetric.' Is this
   correct?"
2. "Is $A_n$ cyclic for every $n$, the way $A_3$ is?"
3. "Is $A_n$ genuinely a normal subgroup of $S_n$, or could it fail to be, like most subgroups?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.symmetric-group`'s own cycle notation and `math.abst.
   normal-subgroup`'s own kernel-is-normal / index-2-is-normal facts, framing $A_n$ as the even
   half of $S_n$.
2. **Conflict evidence**: Demonstration 1's parity table, directly challenging MC-1 by showing
   parity is decided purely by transposition count, never visual appearance.
3. **Contrast pair**: $A_3$ (cyclic) against $A_4$ (non-abelian, Demonstration 3), isolating MC-2
   directly; the two equivalent normality arguments (Demonstration 2) against a naive "not every
   subgroup is normal" doubt, isolating MC-3.
4. **Mastery gate**: require a correct parity classification of a specific permutation, a correct
   explanation of why $A_n\trianglelefteq S_n$, a correct explanation of $A_5$'s simplicity and its
   significance, and a correct application of Sylow reasoning to $A_4$'s missing order-6 subgroup,
   at the Blueprint's own stated MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept a parity classification based on "how the permutation looks" — require the
  transposition-count computation to be stated explicitly.
- Never accept "$A_n$ is cyclic" as a general claim without checking commutativity for the
  specific $n$ in question.

## Voice Teaching Notes
- Say "how many transpositions, exactly?" whenever a parity claim is made without a stated count.
- When $A_n$'s structure is discussed, ask "does that hold for THIS $n$, or only for $A_3$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a given permutation's parity via the
  transposition-count rule.
- **Rung 2 (application)**: learner correctly explains why $A_n\trianglelefteq S_n$ using either
  the parity-homomorphism kernel argument or the index-2 argument.
- **Rung 3 (transfer)**: learner correctly reasons about $A_5$'s structure (order, even-cycle-type
  enumeration) and correctly explains the significance of its simplicity, independently applying
  the concepts to a group not directly worked in the main sequence.

## Tutor Recovery Strategy
- If MC-1 recurs, re-attempt the specific permutation's transposition-count computation directly.
- If MC-2 recurs, re-attempt the specific $A_4$ non-commutativity computation directly.
- If MC-3 recurs, re-attempt the specific parity-homomorphism argument directly.

## Memory Hooks
- "Parity = transposition count mod 2 — never appearance."
- "$A_n$ is always normal — kernel of parity, or index 2, either proof works."
- "$A_3$ is cyclic by luck of small size; $A_n$ for $n\ge5$ is SIMPLE — the deep fact."

## Transfer Connections
- `math.abst.symmetric-group` (already authored, this campaign, Batch 90): supplies cycle
  notation and the transposition-decomposition this concept's parity rule directly reuses.
- `math.abst.normal-subgroup` (already authored, this campaign, Batch 87): supplies the
  kernel-is-normal and index-2-is-normal facts this concept's normality argument directly reuses,
  and the $D_3$ conventions this concept's own group-theoretic examples build on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.alternating-group.md`, reused by
  reference for its $S_3$/$S_4$ parity classification tables, its $A_4$ non-commutativity
  computation, its $A_n$ pattern gallery across $n=2,\ldots,5$, and its three-misconception
  registry (severity levels adopted directly as declared; birth types independently classified
  since this Blueprint states Root Cause/Severity but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, computing
  $|A_5|=60$, enumerating even cycle types in $S_5$ with counts, and explaining $A_5$'s status as
  the smallest nontrivial simple group.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.
  symmetric-group`+`math.abst.normal-subgroup`, unlocks none, cross_links none, expert/analyze,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and matches
  exactly. The Blueprint's own correctly-declared independence P76 mode (cross_links empty in KG)
  required no correction.

## Version History
- 2026-09-14 (Batch 91): authored. Second entry this batch. Companion batch concepts:
  `math.abst.group-action`, `math.abst.euclidean-domain`, `math.abst.field-extension`. All 4
  concepts this batch are math.abst, closing the domain's entire ready frontier — `math.abst`
  moves 25/37 → **29/37** this batch.

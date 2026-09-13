# math.disc.stirling-numbers

## Identity
- **KG id**: `math.disc.stirling-numbers`
- **Domain**: math.disc
- **Requires**: `math.disc.combinations`, `math.disc.recurrence-relation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 5

## Learning Objective
Distinguish Stirling numbers of the second kind $S(n,k)$ (the number of ways to partition an
$n$-element set into $k$ non-empty, UNORDERED subsets) from Stirling numbers of the first kind
$s(n,k)$ (the number of permutations of $n$ elements with exactly $k$ cycles); derive and apply
each kind's own recurrence, correctly distinguishing the two nearly-identical recurrence forms;
and correctly determine, for a given counting scenario, which kind — if either — actually applies.

## Core Understanding
`math.disc.combinations` counts ways to CHOOSE a subset — order never matters, and there is no
notion of grouping the chosen elements further. Stirling numbers of the SECOND kind, $S(n,k)$,
extend this idea one step further: instead of choosing one subset, they count ways to PARTITION
an entire $n$-element set into exactly $k$ non-empty, unordered, unlabeled groups. "Unordered" and
"unlabeled" both matter here — the groups themselves have no names or positions, only their
CONTENTS distinguish one partition from another, and swapping which physical group is called
"group 1" versus "group 2" changes nothing about the partition itself.

Stirling numbers of the FIRST kind (unsigned), $s(n,k)$, count something genuinely different: the
number of ways to arrange $n$ distinct elements into exactly $k$ non-empty CYCLES (as in a
permutation decomposed into disjoint cycles). A cycle has internal structure — $(a\,b\,c)$ and
$(a\,c\,b)$ are different cycles on the same three elements, since one traces $a\to b\to c\to a$
and the other traces $a\to c\to b\to a$ — so grouping the SAME three elements into one cycle can be
done in more than one way, unlike grouping them into one unordered subset (which can only be done
one way). This structural difference — no internal order for the second kind, cyclic internal
order for the first kind — is the single fact from which every other distinction in this concept
follows.

Both kinds share the SAME recurrence relation SHAPE, built via `math.disc.recurrence-relation`'s
already-familiar case-split technique (consider the last element: does it join an existing group,
or start a new one?), but the coefficient on the "joins an existing group" case differs precisely
BECAUSE of the underlying structural difference:
$$S(n,k) = k\cdot S(n-1,k) + S(n-1,k-1) \qquad\qquad s(n,k) = (n-1)\cdot s(n-1,k) + s(n-1,k-1)$$
For the second kind, the $n$-th element joining one of the $k$ EXISTING unordered groups has
exactly $k$ choices — one per group, since a group has no internal positions to insert into. For
the first kind, the $n$-th element joining an existing arrangement of $n-1$ elements into $k$
cycles can be inserted immediately after ANY of the $n-1$ elements already placed within a cycle
(since a cycle's internal order matters, there are $n-1$ distinct insertion points, not $k$) — this
is exactly why the first-kind recurrence's "joins an existing group" coefficient is $(n-1)$, the
total element count so far, rather than $k$, the group count.

## Mental Models
- **"Second kind: how many ways to SORT INTO unlabeled BINS. First kind: how many ways to ARRANGE
  INTO cycles."**
- **"No internal order inside a group (second kind) versus internal cyclic order inside a group
  (first kind) is the ENTIRE difference between the two recurrences."**
- **"The coefficient on 'join an existing group' answers: how many distinct ways can the new
  element be inserted? For unordered groups, once per group ($k$ ways); for cycles, once per
  existing element ($n-1$ ways)."**

## Why Students Fail

### MC-1: FIRST-AND-SECOND-KIND-STIRLING-NUMBERS-CONFLATED
- **Surface form**: treating $S(n,k)$ and $s(n,k)$ as two names or two notations for the same
  quantity, rather than as counting two structurally distinct kinds of grouping.
- **Frequency band**: Foundational.
- **Root cause (Type 1, overgeneralization)**: a genuine small-case coincidence generalized
  incorrectly — for very small $n$ and $k$ (e.g. $S(3,2)=s(3,2)=3$), the two kinds happen to give
  the identical numeric value, and a learner who checks only this one case concludes the two
  notations must always agree, without checking a case where cyclic structure genuinely creates a
  divergence.
- **Repair**: compute BOTH $S(4,2)$ and $s(4,2)$ directly by enumeration for the same 4-element set
  and show they genuinely diverge ($S(4,2)=7$, $s(4,2)=11$), immediately after confirming the
  coincidental agreement at $n=3$ — so the learner sees both the coincidence and its breakdown in
  the same sitting, rather than generalizing from the coincidence alone.

### MC-2: RECURRENCE-COEFFICIENT-CONFUSED-BETWEEN-THE-TWO-KINDS
- **Surface form**: correctly recalling that BOTH kinds satisfy a recurrence of the shape
  "coefficient $\times$ (join existing group) $+$ (start new group)," but substituting the WRONG
  kind's coefficient — using $(n-1)$ where $k$ belongs, or vice versa.
- **Frequency band**: Foundational.
- **Root cause (Type 4, notation-induced)**: the two recurrences are visually near-identical,
  differing in exactly one symbol position (`k` versus `(n-1)`), which makes the correct
  coefficient easy to swap under working-memory load — especially since both notations use similar
  letters ($S$ versus $s$, differing only in case) for structurally different objects.
- **Repair**: derive EACH recurrence's coefficient directly from its own underlying insertion-count
  argument (count insertion points into $k$ unordered groups versus into $n-1$ ordered cyclic
  positions) immediately before using either formula, rather than recalling either coefficient from
  memory alone.

### MC-3: PARTITION-COUNTED-WITH-INTERNAL-ORDER
- **Surface form**: importing the "internal order matters" intuition, correctly used for the FIRST
  kind's cycles, into the SECOND kind's unordered partitions — overcounting $S(n,k)$ by treating two
  identical partitions with the groups merely relabeled as though they were distinct.
- **Frequency band**: Moderate.
- **Root cause (Type 6, analogy overextension)**: the learner's prior experience with
  `math.disc.permutations`-style counting (where arrangement order always matters) is overextended
  into the second kind's genuinely unordered-grouping context, where it does not apply.
- **Repair**: explicitly enumerate a small partition (e.g. $S(3,2)$) both ways — once correctly as
  unordered groups, once (incorrectly, for contrast) as if group labels mattered — and show the
  incorrect count is inflated by exactly a factor tied to the number of equivalent relabelings,
  directly exposing the overcounting.

## Misconceptions

### MC-1: FIRST-AND-SECOND-KIND-STIRLING-NUMBERS-CONFLATED
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: RECURRENCE-COEFFICIENT-CONFUSED-BETWEEN-THE-TWO-KINDS
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: PARTITION-COUNTED-WITH-INTERNAL-ORDER
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Second kind is like sorting into unlabeled boxes; first kind is like arranging around
  circular tables."**: putting objects into unlabeled boxes has no internal order per box (second
  kind); seating people around several circular tables has genuine internal (cyclic) order at each
  table (first kind).
- **Anti-analogy**: the two kinds are NOT interchangeable notations for "group $n$ things into $k$
  groups" — the moment internal arrangement within a group starts to matter, the counting problem
  has silently switched from the second kind to the first.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: enumerate all partitions of $\{a,b,c\}$ into 2 unordered
  groups (yielding $S(3,2)=3$) and all permutations of $\{a,b,c\}$ with 2 cycles (yielding
  $s(3,2)=3$, coincidentally equal), then repeat for $\{a,b,c,d\}$ into/with 2 groups/cycles,
  showing $S(4,2)=7 \ne s(4,2)=11$.
- **Demonstration 2 (targets MC-2)**: derive $S(n,k)=k\cdot S(n-1,k)+S(n-1,k-1)$ by asking, of the
  $k$ existing unordered groups, how many can the $n$-th element join (answer: $k$, one per group);
  derive $s(n,k)=(n-1)\cdot s(n-1,k)+s(n-1,k-1)$ by asking, of the $n-1$ elements already placed
  into cyclic arrangements, how many distinct insertion points exist for the $n$-th element
  (answer: $n-1$, one immediately after each existing element in its cycle).
- **Demonstration 3 (targets MC-3)**: for $\{a,b,c\}$ partitioned into 2 groups, list the 3
  genuinely distinct partitions ($\{a\}\{b,c\}$, $\{b\}\{a,c\}$, $\{c\}\{a,b\}$), then show that
  labeling the groups "Group 1" and "Group 2" and treating the two labelings of each partition as
  distinct would double-count to 6 — demonstrating the overcounting mechanism directly.

## Discovery Questions
1. "If you group three friends into two teams where team membership is all that matters (no team
   names), how many genuinely different ways are there? Now, if instead you seat those three
   friends around one shared circular table and a second single-seat table, does 'how many
   different seatings' give the same count?"
2. "For $S(3,2)$ and $s(3,2)$, both equal 3. Does that mean the two notations always agree? Try
   $n=4$, $k=2$ and see what happens."
3. "In the recurrence for $S(n,k)$, the coefficient on 'join an existing group' is $k$. In the
   recurrence for $s(n,k)$, it's $(n-1)$. What is each coefficient actually counting?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.combinations`'s already-known idea of choosing an unordered
   subset, framing $S(n,k)$ as extending that idea to partitioning a WHOLE set into several
   unordered groups at once.
2. **Conflict evidence**: the $S(3,2)=s(3,2)=3$ coincidence, immediately followed by the
   $S(4,2)=7$ vs $s(4,2)=11$ divergence.
3. **Contrast pair**: derive both recurrence coefficients ($k$ vs. $(n-1)$) side by side from their
   respective insertion-count arguments.
4. **Mastery gate**: require distinguishing which kind applies to a new counting scenario, applying
   the correct recurrence with the correct coefficient, and explaining why the second kind's
   partitions must not be counted as though internally ordered.

## Tutor Actions
- Never introduce $s(n,k)$ (first kind) and $S(n,k)$ (second kind) in the same sentence without
  explicitly naming which one is under discussion, since their near-identical notation is the
  primary confusion driver.
- When a learner recalls a recurrence coefficient from memory, ask them to re-derive it from the
  underlying insertion-count argument before accepting it.
- When a learner counts a second-kind partition, ask whether swapping which physical group is
  called "first" changes the partition — if they say yes, the overcounting misconception (MC-3) is
  active.

## Voice Teaching Notes
- Say "second kind" and "first kind" explicitly and consistently rather than relying on case
  alone ($S$ versus $s$) to carry the distinction in speech, since case is inaudible.
- When a learner substitutes the wrong coefficient, ask "how many places could the new element
  actually go — one per group, or one per already-placed element?" rather than simply correcting
  the formula.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states which kind (first or second) a given
  counting scenario calls for.
- **Rung 2 (application)**: learner correctly computes $S(n,k)$ or $s(n,k)$ via the correct
  recurrence with the correct coefficient.
- **Rung 3 (transfer)**: learner correctly explains, for a genuinely new scenario, why the answer
  requires one kind rather than the other, citing the internal-order distinction directly.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the $S(4,2)$ vs. $s(4,2)$ divergence demonstration.
- If MC-2 recurs, re-derive both coefficients from their insertion-count arguments side by side.
- If MC-3 recurs, re-run the group-relabeling overcounting demonstration.

## Memory Hooks
- "Second kind: unlabeled bins, no internal order. First kind: cyclic tables, internal order."
- "Coefficient $k$: one insertion point per group. Coefficient $(n-1)$: one insertion point per
  already-placed element."
- "$S(3,2)=s(3,2)$ is a coincidence, not a pattern — check a bigger case."

## Transfer Connections
- `math.disc.combinations` (already authored): supplies the foundational unordered-selection idea
  the second kind's partitioning directly extends.
- `math.disc.recurrence-relation` (already authored): supplies the case-split derivation technique
  (does the new element join an existing group, or start a new one?) both recurrences use.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.stirling-numbers.md`, reused by
  reference for its first-kind/second-kind distinction, its $S(4,2)=7$ vs. $s(4,2)=11$ divergence
  example, and its three-misconception registry (independently birth-type-classified above, per
  this entry's own diagnostic procedure).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a scheduling
  problem distinguishing "identical unlabeled teams" — second kind — from "cyclic processing
  loops" — first kind).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found: requires, unlocks, cross_links, difficulty,
  bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- 2026-09-13 (Batch 65): authored. Unblocked by `math.disc.combinations` (Batch 19) and
  `math.disc.recurrence-relation` (Batch 63). Companion batch concepts:
  `math.calc.taylor-series`, `math.graph.shortest-path`, `math.seq.harmonic-series`. `math.disc`
  moves from **22/32** toward **23/32** this batch.

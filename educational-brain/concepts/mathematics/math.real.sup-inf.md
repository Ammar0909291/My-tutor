# math.real.sup-inf

## Identity
- **KG id**: `math.real.sup-inf`
- **Domain**: math.real
- **Requires**: `math.real.completeness`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define the SUPREMUM $\sup(S)$ as the LEAST UPPER BOUND of $S\subseteq\mathbb R$ — verified by the
TWO-PART TEST (an upper bound, AND no smaller number is also an upper bound) — and dually the
INFIMUM as the greatest lower bound; state that `math.real.completeness`'s own axiom guarantees
existence of $\sup/\inf$ in $\mathbb R$ for bounded sets, failing in $\mathbb Q$; and correctly
distinguish ATTAINED suprema (equal to a maximum) from UNATTAINED ones (no maximum exists at all).

## Core Understanding
THE SUPREMUM TEST HAS TWO INDEPENDENT PARTS, AND BOTH ARE REQUIRED: $u=\sup(S)$ requires (i) $u$
is an upper bound ($s\le u$ for all $s\in S$), AND (ii) no smaller number is also an upper bound
(for any $\varepsilon>0$, some $s\in S$ satisfies $s>u-\varepsilon$). For $S=(0,3)$: part (i) holds
for $u=3$ since every $s\in(0,3)$ satisfies $s<3$; part (ii) holds since for any $\varepsilon>0$,
$s=3-\varepsilon/2\in(0,3)$ satisfies $s>3-\varepsilon$. BOTH parts are needed — part (i) alone
only establishes SOME upper bound (e.g. 10 is also an upper bound of $(0,3)$, but fails part (ii)
since $9<10$ is still an upper bound); part (ii) is what makes $u$ specifically the LEAST one.

COMPLETENESS'S GUARANTEE OF EXISTENCE IS SPECIFICALLY AN $\mathbb R$-PROPERTY, GENUINELY FAILING
IN $\mathbb Q$: reusing `math.real.completeness`'s own canonical example, $S=\{q\in\mathbb Q:
q>0,q^2<2\}$ is bounded above in $\mathbb Q$ (e.g. by 2), but has NO least upper bound WITHIN
$\mathbb Q$ — any rational upper bound can always be improved by a strictly smaller rational
upper bound, since $\sqrt2$ (the "gap" being approached) is irrational. In $\mathbb R$,
completeness guarantees $\sup(S)=\sqrt2$ genuinely exists as a real number — this existence
guarantee is exactly completeness's real content, not automatic for any ordered field.

ATTAINED VERSUS UNATTAINED IS A SEPARATE QUESTION FROM EXISTENCE: $\sup(S)$ always EXISTS for a
non-empty bounded-above $S\subseteq\mathbb R$ (by completeness), but whether it belongs to $S$
itself is independent. For $S_1=[0,3]$: $\sup(S_1)=3\in S_1$, so 3 is both the supremum AND the
maximum. For $S_2=(0,3)$: $\sup(S_2)=3\notin S_2$ (as shown above), so $S_2$ has NO maximum at
all — its elements ($2.9,2.99,2.999,\ldots$) get arbitrarily close to 3 without ever reaching it,
yet the supremum 3 is still a perfectly well-defined real number.

## Mental Models
- **"Check BOTH halves of the supremum test — being an upper bound only gets you halfway; being
  the LEAST one is the other, equally required half."**
- **"Existence and attainment are two separate questions — completeness always answers the first
  'yes' for bounded sets in R; whether the set actually reaches its own supremum is a distinct,
  case-by-case question."**

## Why Students Fail

### MC-1: SUPREMUM-EXISTENCE-ASSUMED-IN-RATIONALS
- **Surface form**: believes every bounded-above set of rational numbers has a supremum that is
  itself rational.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  arithmetic and ordering work the same way in $\mathbb Q$ and $\mathbb R$, obscuring that
  existence-guarantee specifically fails in $\mathbb Q$).
- **Repair**: re-walk the $\{q\in\mathbb Q:q^2<2\}$ density-based non-existence argument directly,
  contrasting with $\mathbb R$.

### MC-2: SUPREMUM-ASSUMED-ALWAYS-ATTAINED
- **Surface form**: believes the supremum of a set is always an element of that set, missing that
  many sets have an unattained supremum and no maximum.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  maximum of a finite set is always attained, so "greatest value" intuitively suggests
  attainment).
- **Repair**: re-walk the $S_1=[0,3]$ versus $S_2=(0,3)$ contrast directly.

### MC-3: UPPER-BOUND-ALONE-MISTAKEN-FOR-SUPREMUM
- **Surface form**: believes any upper bound of a set qualifies as "the supremum," missing the
  second requirement that it be the LEAST such upper bound.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Moderate severity — "an
  upper bound" and "the supremum" are easy to conflate without the explicit least-ness
  qualifier).
- **Repair**: re-walk the two-part test, emphasizing part (ii)'s "no smaller upper bound"
  requirement explicitly.

## Misconceptions

### MC-1: SUPREMUM-EXISTENCE-ASSUMED-IN-RATIONALS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SUPREMUM-ASSUMED-ALWAYS-ATTAINED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: UPPER-BOUND-ALONE-MISTAKEN-FOR-SUPREMUM
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The supremum is the exact height of an invisible ceiling — countless heights above the floor
  qualify as 'a ceiling,' but only one is the LOWEST ceiling that still clears every point."**
- **Anti-analogy**: a supremum is NOT required to be an upper bound achieved by some element of
  the set — it is required only to be the LEAST upper bound, whether or not any element reaches
  it.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: for $S=(0,3)$, is 10 the supremum? It is an upper bound
  (part (i) holds), but $9<10$ is also an upper bound, so part (ii) fails — 10 is AN upper bound,
  not THE supremum.
- **Demonstration 2 (targets MC-1)**: $S=\{q\in\mathbb Q:q>0,q^2<2\}$ has no rational least upper
  bound (every rational bound improvable); $\sup(S)=\sqrt2$ exists only in $\mathbb R$.
- **Demonstration 3 (targets MC-2)**: $S_1=[0,3]$ has $\sup=3=\max$ (attained); $S_2=(0,3)$ has
  $\sup=3$ but no maximum (unattained) — same supremum value, different attainment status.

## Discovery Questions
1. "Does every bounded-above set of RATIONAL numbers have a supremum that is itself rational?"
2. "Does $\sup((0,3))=3$ mean that $3$ is an element of $(0,3)$?"
3. "Does 10 qualify as 'the supremum' of $(0,3)$, since it is an upper bound?"

## Teaching Sequence
1. **Representation shift**: state the two-part test directly, working Demonstration 1's failed-
   candidate check (10 is not the supremum), isolating MC-3.
2. **Conceptual shift/conflict evidence**: Demonstration 2's rational-versus-real contrast,
   isolating MC-1 by requiring the genuine existence-guarantee failure in $\mathbb Q$
   acknowledged.
3. **Contrast pair**: Demonstration 3's attained-versus-unattained pair, isolating MC-2 by
   requiring attainment recognized as a separate question from existence.
4. **Mastery gate**: require a correct two-part supremum/infimum verification for a new set, a
   correct explanation of why a specific rational set lacks a rational supremum, and a correct
   attained-versus-unattained classification for two new sets, at the Blueprint's own stated MAMR
   of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept an upper bound declared "the supremum" without part (ii) of the test verified.
- Never accept a supremum rejected solely because it is not an element of the set.

## Voice Teaching Notes
- Say "is that just an upper bound, or is it specifically the LEAST one?" whenever a candidate
  supremum is proposed.
- When attainment is questioned, ask "does the supremum need to actually belong to the set, or
  just be the least upper bound?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the two-part test to verify or reject a
  candidate supremum/infimum for a new set.
- **Rung 2 (application)**: learner correctly explains why a specific bounded rational set lacks
  a rational supremum.
- **Rung 3 (transfer)**: learner correctly explains, for a bounded sequence's term set, why
  $\sup_na_n$ is guaranteed to exist regardless of convergence, and why an unattained supremum is
  still a meaningful, well-defined real number.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\{q\in\mathbb Q:q^2<2\}$ density-based non-existence argument.
- If MC-2 recurs, re-walk the $S_1=[0,3]$ versus $S_2=(0,3)$ contrast directly.
- If MC-3 recurs, re-walk the two-part test, emphasizing part (ii) explicitly.

## Memory Hooks
- "An upper bound is a candidate; the supremum is the winner — the LEAST candidate."
- "Q has gaps; R doesn't — existence of sup/inf is R's own guarantee, not Q's."
- "Existence and attainment are different questions — a supremum can exist without being
  reached."

## Transfer Connections
- `math.real.completeness` (already authored, this campaign, Batch 109): supplies the existence
  guarantee (every bounded-above set has a supremum in $\mathbb R$) this concept directly
  characterizes via the two-part test and reuses the exact rational-supremum-failure example from.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.sup-inf.md`, reused by reference for
  its two-part supremum test, its rational-versus-real existence contrast (directly reusing
  `math.real.completeness`'s own canonical example), its attained-versus-unattained pair, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint correctly self-reports no cross-links for this concept (empty in
  KG) — independence mode used, the Blueprint's own self-contained bounded-sequence supremum probe
  treated as complete without correction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.
  completeness`, unlocks none, cross_links none, expert/apply, mastery_threshold 0.9,
  estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 110): authored. Second entry this batch. Companion batch concept:
  `math.meas.lebesgue-measure`.

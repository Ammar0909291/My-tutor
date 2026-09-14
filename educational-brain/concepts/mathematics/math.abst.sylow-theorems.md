# math.abst.sylow-theorems

## Identity
- **KG id**: `math.abst.sylow-theorems`
- **Domain**: math.abst
- **Requires**: `math.abst.group-action`, `math.nt.prime-number`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 7

## Learning Objective
State the THREE SYLOW THEOREMS for a finite group $G$ with $|G|=p^n\cdot m$ ($p$ prime,
$\gcd(p,m)=1$) — Existence (a Sylow $p$-subgroup of order $p^n$ exists), Conjugacy (all Sylow
$p$-subgroups are conjugate), and Count ($n_p\equiv1\pmod p$ and $n_p\mid m$) — and APPLY the
two-constraint count system, correctly distinguishing $n_p=1$ (forced normality) from $n_p>1$,
and using an ELEMENT-COUNTING argument when the count alone does not force normality.

## Core Understanding
A SYLOW $p$-SUBGROUP of $G$ (with $|G|=p^n\cdot m$, $\gcd(p,m)=1$) is a subgroup of order
EXACTLY $p^n$ — the FULL prime-power factor, reusing `math.abst.group-action`'s own conjugation
action and `math.nt.prime-number`'s own prime factorization machinery directly. THE THREE
THEOREMS: Sylow I (EXISTENCE) guarantees at least one such subgroup exists; Sylow II (CONJUGACY)
guarantees every Sylow $p$-subgroup is conjugate to every other ($Q=gPg^{-1}$ for some $g\in G$);
Sylow III (COUNT) constrains the number $n_p$ of Sylow $p$-subgroups via TWO SIMULTANEOUS
conditions — $n_p\equiv1\pmod p$ AND $n_p\mid m$ — intersecting both candidate lists narrows
$n_p$ sharply.

$n_p=1$ IS THE NORMALITY CONDITION: a Sylow $p$-subgroup $P$ is normal in $G$ IF AND ONLY IF
$n_p=1$ (the unique Sylow $p$-subgroup). This is a BICONDITIONAL, not a one-way implication from
mere existence — Sylow I guarantees existence unconditionally, but says NOTHING about
uniqueness or normality; those require checking $n_p$ specifically via Sylow III.

THE ELEMENT-COUNTING ARGUMENT is the decisive tool when Sylow III's own constraints leave
MULTIPLE candidates for $n_p$ (rather than forcing $n_p=1$ directly): counting the non-identity
elements contributed by $n_p$ distinct Sylow $p$-subgroups (each of prime order $p$ contributes
$p-1$ non-identity elements, pairwise intersecting only in the identity when $p$ is prime) and
summing across primes can EXCEED $|G|$ — a contradiction forcing at least one $n_p=1$ after all,
even when the divisibility constraints alone did not.

## Mental Models
- **"A Sylow $p$-subgroup's SIZE is guaranteed by Sylow I; its COUNT and NORMALITY are separate
  questions, answered only by Sylow III's two-constraint system."**
- **"$n_p=1$ is a biconditional with normality — not merely a sufficient condition, and never
  automatic from existence alone."**

## Why Students Fail

### MC-1: SYLOW-SUBGROUP-ALWAYS-NORMAL
- **Surface form**: claims a Sylow $p$-subgroup is AUTOMATICALLY normal in $G$, simply because
  Sylow I guarantees it exists.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  Sylow subgroups are presented as a special, structurally-guaranteed class of subgroup, and
  learners extend that specialness into an unearned normality claim, without separately checking
  $n_p$).
- **Repair**: re-anchor on the biconditional directly, using the $S_3$ counterexample (three
  Sylow 2-subgroups, none normal, since $n_2=3\ne1$).

### MC-2: SYLOW-III-WRONG-DIVISOR
- **Surface form**: applies $n_p\mid|G|$ instead of the correct $n_p\mid m$ (where
  $m=|G|/p^n$).
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Secondary severity — $|G|$
  is the salient, already-known total order, so it is the natural first divisor reached for,
  while $m$ requires an extra factoring step to isolate).
- **Repair**: re-compute $m=|G|/p^n$ explicitly FIRST, before applying the divisibility
  constraint to $m$, not $|G|$.

### MC-3: ANY-p-SUBGROUP-IS-SYLOW
- **Surface form**: calls ANY subgroup of prime-power order a "Sylow $p$-subgroup," regardless of
  whether its order equals the FULL $p^n$ factor of $|G|$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Secondary severity —
  "$p$-subgroup" and "Sylow $p$-subgroup" share surface vocabulary, obscuring that only the
  MAXIMAL prime-power-order subgroup qualifies as Sylow).
- **Repair**: re-derive $p^n$ (the full prime-power factor of $|G|$) FIRST, then confirm the
  subgroup's order matches exactly, not merely some smaller power of $p$.

## Misconceptions

### MC-1: SYLOW-SUBGROUP-ALWAYS-NORMAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SYLOW-III-WRONG-DIVISOR
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: ANY-p-SUBGROUP-IS-SYLOW
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Sylow III is a two-filter sieve: list numbers $\equiv1\pmod p$, intersect with divisors of
  $m$ — whatever survives both filters is the candidate set for $n_p$."**
- **Anti-analogy**: existence (Sylow I) is NOT normality — a Sylow subgroup is guaranteed to
  exist in every case, but is normal only when the count $n_p$ happens to be forced to 1.

## Demonstrations
- **Demonstration 1 (targets baseline count system)**: for $|G|=12=2^2\times3$, $p=2$
  ($p^n=4$, $m=3$): $n_2\equiv1\pmod2$ gives odd candidates, $n_2\mid3$ gives $\{1,3\}$ —
  intersection $\{1,3\}$, both genuinely possible (in $A_4$, $n_2=3$, none normal).
- **Demonstration 2 (targets MC-1)**: in $S_3$ ($|G|=6$), three distinct Sylow 2-subgroups
  $\{e,(12)\},\{e,(13)\},\{e,(23)\}$ exist (Sylow I holds), yet $n_2=3\ne1$, so NONE of them is
  normal — conjugating $\{e,(12)\}$ by $(123)$ gives $\{e,(23)\}\ne\{e,(12)\}$, confirming
  non-normality directly.
- **Demonstration 3 (targets MC-2/MC-3)**: for $|G|=45=3^2\times5$, the Sylow 3-subgroup has
  order $p^n=9$ (NOT order 3 — a subgroup of order 3 would be a $p$-subgroup but not Sylow), and
  $n_3$ must divide $m=45/9=5$ (NOT 45 directly) — giving candidates $\{1,5\}$, intersected with
  $n_3\equiv1\pmod3$ giving $\{1,4,7,\ldots\}$, forcing $n_3=1$.

## Discovery Questions
1. "Does Sylow I's guarantee that a Sylow $p$-subgroup EXISTS also guarantee it is unique, or
   normal?"
2. "For $|G|=p^n\cdot m$, does $n_p$ divide the full order $|G|$, or only the cofactor $m$?"
3. "If $|G|=12=2^2\times3$, does a subgroup of order 2 (not 4) qualify as a Sylow 2-subgroup?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-action`'s own conjugation action and orbit-stabilizer
   theorem, and `math.nt.prime-number`'s own prime factorization, framing Sylow theory as
   applying both directly to subgroup structure.
2. **Misconception gate**: Demonstration 2's $S_3$ counterexample, isolating MC-1 by contrasting
   guaranteed existence against non-forced normality.
3. **Pattern induction**: Demonstration 1's two-constraint intersection applied across several
   group orders, building fluency with the congruence-plus-divisibility filter system.
4. **Contrast pair**: Demonstration 3's Sylow-subgroup-vs-general-$p$-subgroup and
   $n_p\mid m$-vs-$n_p\mid|G|$ distinctions, isolating MC-2 and MC-3 together.
5. **Mastery gate**: require correctly stating all three theorems, correctly applying the
   two-constraint system to a new group order, correctly using an element-counting argument when
   $n_p$ is not immediately forced, and correctly diagnosing an error using the wrong divisor or
   wrong subgroup order, at the Blueprint's own stated MAMR of 4/5 (⌈0.75×5⌉).

## Tutor Actions
- Never accept a normality claim for a Sylow subgroup without an explicit $n_p=1$ verification.
- Never accept $n_p\mid|G|$ as a substitute for the correct $n_p\mid m$.

## Voice Teaching Notes
- Say "existence, or normality — which one does Sylow I actually guarantee?" whenever a Sylow
  subgroup's status is being discussed.
- When $n_p$ is computed, ask "is that divisor of $m$, or of the full $|G|$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states all three Sylow theorems with precise
  hypotheses.
- **Rung 2 (application)**: learner correctly applies the two-constraint system (congruence plus
  divisibility on $m$) to determine candidates for $n_p$ in a specific group order.
- **Rung 3 (transfer)**: learner correctly applies Sylow III across MULTIPLE primes for a NEW
  group order (e.g. $|G|=30$), using an element-counting argument to rule out simplicity when no
  single $n_p$ is immediately forced to 1.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the $S_3$ counterexample (existence without normality) directly.
- If MC-2 recurs, re-compute $m=|G|/p^n$ explicitly before applying divisibility.
- If MC-3 recurs, re-derive the full prime-power factor $p^n$ before checking subgroup order.

## Memory Hooks
- "Existence is guaranteed; normality is earned — only when $n_p=1$."
- "$n_p$ divides $m$, the LEFTOVER factor, never the full group order."
- "Sylow order is the FULL $p^n$ — not just any power of $p$."

## Transfer Connections
- `math.abst.group-action` (already authored, this campaign, Batch 91): supplies the conjugation
  action, orbit-stabilizer theorem, and normalizer machinery this concept's own Sylow II proof
  sketch and $n_p=[G:N_G(P)]$ formula directly reuse.
- `math.nt.prime-number` (already authored, this campaign, earlier domain certified): supplies
  the prime factorization and $\gcd$ machinery this concept's own $|G|=p^n\cdot m$ decomposition
  directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.sylow-theorems.md`, reused by
  reference for its $S_3$/$A_4$/order-30/order-56 canonical examples, its two-constraint
  candidate-narrowing gallery, its element-counting non-simplicity argument, and its
  three-misconception registry (severity levels adopted directly as declared; birth types
  independently classified since this Blueprint states Root Cause but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying full
  Sylow analysis to $|G|=30$ across all three primes (2, 3, 5), using an element-counting
  argument to prove non-simplicity.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.abst.group-action`+`math.nt.prime-number`, unlocks none, cross_links none,
  expert/analyze, mastery_threshold 0.75, estimated_hours 7) was directly verified against the
  live KG and matches exactly. The Blueprint's own correctly-declared independence P76 mode
  (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 92): authored. Second entry this batch. Companion batch concepts:
  `math.abst.burnside-lemma`, `math.abst.pid`, `math.abst.algebraic-extension`. All 4 concepts
  this batch are math.abst, closing the domain's entire post-Batch-91 ready frontier —
  `math.abst` moves 29/37 → **33/37** this batch.

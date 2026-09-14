# math.abst.normal-subgroup

## Identity
- **KG id**: `math.abst.normal-subgroup`
- **Domain**: math.abst
- **Requires**: `math.abst.coset`
- **Unlocks**: `math.abst.quotient-group`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define $N$ as NORMAL in $G$ (written $N\trianglelefteq G$) iff $gNg^{-1}=N$ for EVERY $g\in G$, and
verify normality directly by computing $gNg^{-1}$ for representative elements; recognize that
$gNg^{-1}=N$ is EQUIVALENT to $gN=Ng$ as SETS (left and right cosets coincide) — a genuinely more
permissive condition than requiring $g$ to commute with each individual element of $N$ — and that
while EVERY subgroup of an abelian group is automatically normal, non-abelian groups can genuinely
have non-normal subgroups; and state that kernels of group homomorphisms are ALWAYS normal, and
that normality is EXACTLY the condition needed for coset multiplication $(aN)(bN)=abN$ to be
WELL-DEFINED.

## Core Understanding
A subgroup $N\le G$ is NORMAL ($N\trianglelefteq G$) if $gNg^{-1}=N$ for EVERY $g\in G$ —
conjugating $N$ by any group element returns $N$ itself as a set, never a genuinely different
subgroup. This is a real, checkable condition, not automatically satisfied by every subgroup.

$gNg^{-1}=N$ is EQUIVALENT to $gN=Ng$ (left cosets equal right cosets, as SETS). This does NOT
require $g$ to commute with each individual element of $N$ ($gn=ng$ for every specific $n$) — it
only requires the SET $\{gn:n\in N\}$ to equal the SET $\{ng:n\in N\}$, even if individual
pairings differ from simple commutation. In an ABELIAN group, every subgroup is AUTOMATICALLY
normal ($gn=ng$ trivially, by the group's own commutativity) — but in a NON-abelian group, this
guarantee disappears entirely, and genuine failures of normality can and do occur.

WHY normality matters: the KERNEL of any group homomorphism is ALWAYS a normal subgroup — a key
structural fact. More fundamentally, normality is EXACTLY the condition needed to make coset
multiplication $(aN)(bN):=abN$ WELL-DEFINED — if $N$ is normal, this product does not depend on
which representatives $a,a'$ (with $aN=a'N$) or $b,b'$ are chosen. If $N$ is NOT normal, different
valid representatives of the SAME cosets can produce genuinely DIFFERENT products, making
"multiply the cosets" an ill-defined operation entirely — the exact reason normal subgroups,
specifically, are singled out for the quotient-group construction.

In $D_3$ ($|D_3|=6$, the smallest non-abelian group: rotations $e,r,r^2$, reflections $s,sr,sr^2$,
with $sr=r^{-1}s=r^2s$): the rotation subgroup $H=\{e,r,r^2\}$ IS normal ($sHs=H$, verified
directly). The reflection subgroup $K=\{e,s\}$ is NOT normal ($rKr^{-1}=\{e,sr\}\ne K$) — a
perfectly legitimate subgroup that simply fails the normality condition.

## Mental Models
- **"Normal means conjugating the WHOLE subgroup by any element gives back the same subgroup —
  never a different one."**
- **"$gN=Ng$ is a SET-level match, not element-by-element commutation — the sets coincide even
  when individual pairings don't."**
- **"Normality is exactly what makes coset multiplication well-defined — without it, 'multiply
  the cosets' isn't a genuine operation at all."**

## Why Students Fail

### MC-1: EVERY-SUBGROUP-ASSUMED-NORMAL
- **Surface form**: believes every subgroup of every group is automatically normal, over-
  generalizing from the abelian case (where this happens to hold) to non-abelian groups in
  general.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to the abelian case's genuine "every subgroup is normal" fact — trivially true there
  since $gn=ng$ always — being carried forward unmodified into non-abelian groups, where the
  guarantee genuinely fails, with no counterexample encountered until a group like $D_3$ is
  tried).
- **Repair**: re-compute $gNg^{-1}$ directly for the specific non-abelian candidate subgroup in
  question, confirming or refuting normality by direct computation rather than assumption.

### MC-2: GN-EQUALS-NG-CONFUSED-WITH-ELEMENT-WISE-COMMUTATION
- **Surface form**: believes $gN=Ng$ means $g$ commutes with every individual element of $N$,
  rather than the weaker set-level equality of the two coset sets.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to the symmetric-looking equation $gN=Ng$ visually suggesting the more familiar,
  stronger notion of commutativity — the notation does not distinguish "these two SETS coincide"
  from "each individual pairing commutes," and the stronger reading is the more immediately
  available interpretation).
- **Repair**: re-verify, for the specific normal subgroup in question, that $gN=Ng$ holds as SETS
  even while specific individual products $gn$ and $ng$ genuinely differ for particular $n$.

### MC-3: QUOTIENT-MULTIPLICATION-ASSUMED-ALWAYS-WELL-DEFINED
- **Surface form**: believes coset multiplication $(aN)(bN)=abN$ is always well-defined
  regardless of whether $N$ is normal, missing that non-normal subgroups produce genuinely
  inconsistent products depending on the chosen representatives.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to ordinary arithmetic operations, encountered throughout prior mathematics, never
  requiring any well-definedness check at all — so the possibility that a seemingly natural
  operation like "multiply the cosets" could simply FAIL to be well-defined is not anticipated
  without direct demonstration).
- **Repair**: re-compute the specific coset "product" in question using two different valid
  representatives, confirming the results genuinely disagree when $N$ is not normal.

## Misconceptions

### MC-1: EVERY-SUBGROUP-ASSUMED-NORMAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: GN-EQUALS-NG-CONFUSED-WITH-ELEMENT-WISE-COMMUTATION
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: QUOTIENT-MULTIPLICATION-ASSUMED-ALWAYS-WELL-DEFINED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Normality is like a seating chart that stays valid no matter who reorders the room — a
  non-normal subgroup is a seating chart that falls apart the moment someone swaps seats."**
- **Anti-analogy**: $gN=Ng$ does NOT mean every individual pairing $gn=ng$ — it is the WEAKER claim
  that the two full sets match, which can hold even when no single pairing commutes.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: in $D_3$, verify $H=\{e,r,r^2\}$ IS normal by computing
  $sHs^{-1}=sHs$ directly: $ses=e$, $srs=r^2$, $sr^2s=r$ — confirming $sHs=\{e,r^2,r\}=H$ exactly.
- **Demonstration 2 (targets MC-1)**: in $D_3$, verify $K=\{e,s\}$ is NOT normal: $rKr^{-1}=\{e,
  sr\}\ne\{e,s\}=K$ (since $sr\ne s$) — a direct computed refutation.
- **Demonstration 3 (targets MC-2, MC-3)**: for $H$ (normal): $sH=\{s,sr,sr^2\}=Hs=\{s,rs,r^2s\}$
  as SETS, despite $sr\ne rs$ individually. For $K$ (not normal): computing $(rK)(rK)$ via
  representative $r$ gives $r^2K=\{r^2,r^2s\}$; via representative $rs$ instead gives $eK=K=\{e,
  s\}$ — two genuinely DIFFERENT answers for the SAME coset product, confirming the multiplication
  is ill-defined precisely because $K$ is not normal.

## Discovery Questions
1. "Is every subgroup of every group automatically normal?"
2. "Does $gN=Ng$ mean $g$ commutes with every individual element of $N$?"
3. "Does coset multiplication $(aN)(bN)=abN$ always give a consistent answer, no matter which
   subgroup $N$ is used?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.coset`'s own left-coset construction and equality criterion,
   framing normality as a specific, checkable relationship between left and right cosets.
2. **Conflict evidence**: the $K=\{e,s\}$ non-normal demonstration in $D_3$, breaking MC-1 directly
   by computed counterexample.
3. **Contrast pair**: $sH=Hs$ as sets despite $sr\ne rs$ individually, isolating MC-2; the two
   conflicting "products" for $rK\cdot rK$ under different representatives, isolating MC-3.
4. **Mastery gate**: require a correct normality verification via conjugation, a correct set-level
   (not element-wise) interpretation of $gN=Ng$, and a correct explanation of why non-normality
   breaks coset multiplication, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "it's normal because it's a subgroup" without requiring the conjugation
  $gNg^{-1}=N$ to be checked explicitly for a non-abelian group.
- When $gN=Ng$ is invoked, never accept an individual-pairing interpretation — require the
  learner to confirm it is a SET-level claim.

## Voice Teaching Notes
- Say "have you actually computed $gNg^{-1}$, or are you assuming it holds?" whenever normality is
  claimed without verification.
- When $gN=Ng$ is discussed, ask "does that mean every single pairing commutes, or just that the
  two sets match?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies normality (or its absence) for a specific
  subgroup by direct conjugation computation.
- **Rung 2 (application)**: learner correctly distinguishes set-level coset equality from
  element-wise commutation, and correctly explains why kernels of homomorphisms are always normal.
- **Rung 3 (transfer)**: learner correctly explains, in a novel organizational-structure analogy,
  why representative-independence (normality) is required for a well-defined "combine the
  groups" operation, and what breaks down without it.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute $gNg^{-1}$ directly for the specific non-abelian candidate in
  question.
- If MC-2 recurs, re-verify $gN=Ng$ as sets for the specific normal subgroup in question, showing
  individual non-commutation alongside set-level agreement.
- If MC-3 recurs, re-compute the specific coset "product" using two different representatives,
  confirming disagreement when $N$ is not normal.

## Memory Hooks
- "Normal: conjugate the WHOLE subgroup by any element, get the same subgroup back."
- "$gN=Ng$ is about SETS matching, not every pairing commuting."
- "No normality, no well-defined coset multiplication — that's the whole reason it matters."

## Transfer Connections
- `math.abst.coset` (already authored, this campaign): supplies the left-coset construction, the
  equality criterion, and the partition property this concept's own conjugation-based definition
  directly builds on.
- `math.abst.group-theory` (already authored, this campaign): supplies the group axioms and the
  non-abelian example ($D_3$-style reasoning) this concept's counterexamples rely on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.normal-subgroup.md`, reused by
  reference for its representation-shift direct-conjugation verification in $D_3$, its conflict-
  evidence non-normal-subgroup demonstration, its contrast-pair set-versus-element-wise and
  well-defined-versus-ill-defined treatment, and its three-misconception registry (birth types
  independently classified, since this Blueprint states Description/Severity but not a formal
  Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an
  organizational-chart analogy for why representative-independence matters for a well-defined
  combination operation).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.coset`,
  unlocks `math.abst.quotient-group`, cross_links none, advanced/understand, mastery_threshold 0.9,
  estimated_hours 4) was directly verified against the live KG and matches exactly. The Blueprint's
  own correctly-declared independence P76 mode (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 87): authored. Fourth and final entry this batch. Companion batch concepts:
  `math.abst.prime-ideal`, `math.abst.lagrange-theorem`, `math.abst.quotient-ring`. `math.abst`
  moves from 11/37 to **15/37** this batch.

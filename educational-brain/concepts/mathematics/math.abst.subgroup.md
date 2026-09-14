# math.abst.subgroup

## Identity
- **KG id**: `math.abst.subgroup`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: `math.abst.coset`, `math.abst.normal-subgroup`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
State the SUBGROUP CRITERION — $H\le G$ (H is a subgroup of G) iff $H$ is NON-EMPTY, CLOSED under
the group operation, and CLOSED under inverses — and verify each condition explicitly for a given
candidate subset; state and apply the equivalent ONE-LINE CRITERION ($H\le G$ iff $H\ne\emptyset$
and $\forall a,b\in H,\ ab^{-1}\in H$); and identify the two TRIVIAL subgroups ($\{e\}$ and $G$
itself, present in EVERY group), correctly distinguishing these from PROPER (non-trivial)
subgroups.

## Core Understanding
A subset $H\subseteq G$ is a SUBGROUP of $G$ (written $H\le G$) if $H$ itself forms a group under
the SAME operation as $G$ (reusing `math.abst.group-theory`'s own group definition directly). The
SUBGROUP CRITERION gives a practical checklist: (1) NON-EMPTY — $H\ne\emptyset$, typically
verified by checking $e\in H$; (2) CLOSED UNDER THE OPERATION — for all $a,b\in H$, $ab\in H$;
(3) CLOSED UNDER INVERSES — for all $a\in H$, $a^{-1}\in H$. Associativity is AUTOMATICALLY
INHERITED from $G$ — it holds for ALL elements of $G$, hence for the subset $H$ too, requiring no
separate check.

The EQUIVALENT ONE-LINE CRITERION packages all three conditions into one: $H\le G$ iff
$H\ne\emptyset$ and $\forall a,b\in H,\ ab^{-1}\in H$. This compact statement is not a different
test — setting $a=b$ recovers $aa^{-1}=e\in H$ (identity membership); then setting $a=e$ (now
known to be in $H$) recovers $eb^{-1}=b^{-1}\in H$ (inverse-closure); then applying the criterion
to $a$ and $b^{-1}$ (now known to be in $H$) recovers $a(b^{-1})^{-1}=ab\in H$
(operation-closure) — the compact condition genuinely IMPLIES all three separate ones, in a
specific derivation order.

EVERY group $G$ has (at least) two subgroups: $\{e\}$ (just the identity — trivially closed,
since $ee=e$ and $e^{-1}=e$) and $G$ itself (trivially a subgroup of itself). These are the
TRIVIAL subgroups — "trivial" meaning "automatically present in every group," NEVER "the only
genuine subgroups." Any OTHER subgroup (neither $\{e\}$ nor all of $G$) is called PROPER, and is
every bit as legitimate a subgroup as the trivial ones — being proper simply means it is not one
of the two automatic cases.

## Mental Models
- **"A subgroup is a subset that's also a group in its own right, under the same operation —
  check non-empty, closed under the operation, closed under inverses."**
- **"The one-line test $ab^{-1}\in H$ packages all three conditions — derive identity, then
  inverse-closure, then operation-closure, in that order."**
- **"'Trivial' means automatically present in every group, never 'the only real ones.' A proper
  subgroup is just as genuine."**

## Why Students Fail

### MC-1: PROPER-SUBGROUP-TREATED-AS-NOT-A-REAL-SUBGROUP
- **Surface form**: confuses "proper subgroup" (a genuine, legitimate non-trivial subgroup) with
  "not actually a subgroup," believing only the trivial subgroups $\{e\}$ and $G$ truly count.
- **Birth type**: Type 3, language contamination (Blueprint's own declared FOUNDATIONAL severity).
  The word "trivial" in everyday usage suggests "the only simple/obvious cases," which is easily
  misread as "the only genuine cases" — precisely inverting the intended technical meaning
  ("automatically present," not "the only real ones").
- **Repair**: re-verify the subgroup criterion for the specific proper subgroup in question,
  confirming it satisfies the criterion exactly as validly as the trivial cases do.

### MC-2: ASSOCIATIVITY-CHECKED-UNNECESSARILY
- **Surface form**: attempts to separately verify associativity for a candidate subgroup, not
  recognizing it's automatically inherited from $G$ and requires no independent check.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Minor severity). Since
  every OTHER group axiom must be individually checked when verifying a full group from scratch,
  that pattern is overgeneralized to subgroup verification as well, missing that associativity is
  a property of the OPERATION ITSELF (already holding for all of $G$), inherited automatically by
  any subset.
- **Repair**: re-state that associativity holds for the operation on all of $G$, hence
  automatically for the subset $H$, with nothing new to verify.

### MC-3: ONE-LINE-CRITERION-MISAPPLIED-WITHOUT-CORRECT-OPERATION-NOTATION
- **Surface form**: when applying the compact $ab^{-1}\in H$ criterion in an ADDITIVE group
  (where the "operation" is $+$ and "inverse" is negation), fails to correctly translate the
  criterion to $a-b\in H$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Moderate severity). The
  multiplicative notation $ab^{-1}$ is the default symbolic form of the criterion, and applying
  it literally (rather than translating $\cdot\to+$ and inverse $\to$ negation) in an additive
  group produces a nonsensical or incorrect expression.
- **Repair**: re-derive the correctly translated criterion for the specific additive group in
  question before applying it.

## Misconceptions

### MC-1: PROPER-SUBGROUP-TREATED-AS-NOT-A-REAL-SUBGROUP
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: ASSOCIATIVITY-CHECKED-UNNECESSARILY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ONE-LINE-CRITERION-MISAPPLIED-WITHOUT-CORRECT-OPERATION-NOTATION
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A neighborhood inside a city is every bit as much a real place as the city itself or a
  single street corner — 'trivial' locations (the whole city, one corner) aren't the only real
  ones; a genuine, structured neighborhood in between counts just as much."**
- **Anti-analogy**: the subgroup criterion is NOT "check every group axiom from scratch" — closure
  and inverse-closure are the only NEW things to verify; associativity transfers automatically.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: in $(\mathbb Z,+)$, verify $H=2\mathbb Z$ (even integers)
  is a subgroup: non-empty ($0\in H$), closed under $+$ (even+even=even), closed under inverses
  (negative of even is even) — three checks, no separate associativity check needed.
- **Demonstration 2 (targets MC-3)**: same $H=2\mathbb Z$, apply the one-line criterion in
  additive notation: for $a,b\in H$, is $a-b\in H$? Difference of two even numbers is always even
  — confirms $H\le G$ via the correctly translated compact criterion.
- **Demonstration 3 (targets MC-1)**: in $(\mathbb Z/6\mathbb Z,+)$, verify $H=\{0,2,4\}$ is a
  genuine PROPER subgroup (non-empty, closed under $+\bmod6$, closed under inverses) — neither
  trivial subgroup, yet every bit as legitimate.

## Discovery Questions
1. "Is a proper subgroup — one that's neither $\{e\}$ nor all of $G$ — a real subgroup, or does
   it not really count?"
2. "When verifying a subgroup criterion, do you need to separately check associativity?"
3. "In an additive group like $(\mathbb Z,+)$, what does the criterion $ab^{-1}\in H$ actually
   look like?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own group definition, framing a subgroup as
   a subset that independently satisfies the same definition.
2. **Conflict evidence**: the proper-subgroup $\{0,2,4\}\le\mathbb Z/6\mathbb Z$ verification,
   breaking MC-1 directly.
3. **Contrast pair**: trivial subgroups alongside the proper subgroup, all verified equally
   validly, further isolating MC-1; the multiplicative default notation against the additive
   translation, isolating MC-3.
4. **Mastery gate**: require a correct three-part criterion verification, a correct one-line
   criterion application, and a correct trivial-vs-proper classification, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept "that's not a real subgroup, it's just proper" — require the criterion to be
  checked and the term "proper" to be used correctly.
- When a subgroup criterion is verified, never accept a separate associativity check as necessary
  — redirect to closure and inverse-closure only.

## Voice Teaching Notes
- Say "does 'proper' mean it doesn't count, or does it mean something else?" whenever a proper
  subgroup is dismissed.
- When the one-line criterion is applied in an additive group, ask "what does $ab^{-1}$ actually
  become here?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies the three-part subgroup criterion for a
  given candidate subset.
- **Rung 2 (application)**: learner correctly applies the equivalent one-line criterion,
  correctly translating notation for additive groups.
- **Rung 3 (transfer)**: learner correctly explains, in a cryptographic-protocol context, why a
  proper subgroup (neither trivial case) is chosen deliberately, and what must be verified before
  trusting it as a genuine algebraic structure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the criterion for the specific proper subgroup in question.
- If MC-2 recurs, re-state that associativity transfers automatically for the case in question.
- If MC-3 recurs, re-translate the criterion correctly for the specific additive group in
  question.

## Memory Hooks
- "Trivial means automatic, not exclusive — proper subgroups are just as real."
- "Only closure and inverse-closure are new — associativity comes free."
- "$ab^{-1}$ becomes $a-b$ in additive notation."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign): supplies the group axioms and
  structure this concept's subsets are checked against directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.subgroup.md`, reused by reference for
  its representation-shift three-part-to-one-line criterion demonstration, its contrast-pair
  trivial-vs-proper comparison, and its three-misconception registry (birth types independently
  classified, since this Blueprint states Description/Severity but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a cryptographic
  protocol relying on a proper subgroup of a modular multiplicative group).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.group-
  theory`, unlocks `math.abst.coset`+`math.abst.normal-subgroup`, cross_links none, advanced/
  apply, mastery_threshold 0.9, estimated_hours 4) was directly verified against the live KG and
  matches exactly. The Blueprint's own correctly-declared independence P76 mode (cross_links
  empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 85): authored. Second entry this batch, part of the 9-candidate frontier
  opened by Batch 84's `group-theory`. Companion batch concepts: `math.abst.ring-theory`,
  `math.abst.group-operation`, `math.abst.group-inverse`. `math.abst` moves toward **7/37** this
  batch.

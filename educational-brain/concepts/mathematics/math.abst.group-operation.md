# math.abst.group-operation

## Identity
- **KG id**: `math.abst.group-operation`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: none
- **Cross-links**: `math.linalg.vector-addition`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Compute WITHIN specific groups using CAYLEY TABLES and modular arithmetic (reusing `math.abst.
group-theory`'s own axiomatic definition as the structure being computed within, not merely
verified abstractly); recognize the LATIN SQUARE property (every element appears exactly once in
each row and column); and correctly read whether a Cayley table represents an ABELIAN group
(symmetric table) or a NON-ABELIAN group (asymmetric table) directly from the table's structure.

## Core Understanding
A CAYLEY TABLE encodes all $|G|^2$ values of a group's operation: row $a$, column $b$, entry
$a\cdot b$. In $\mathbb Z/n\mathbb Z$ (integers mod $n$ under addition — the canonical finite
abelian group), the identity is $0$ and the inverse of $a$ is $(n-a)\bmod n$. Every Cayley table
of a group satisfies the LATIN SQUARE property: each element appears EXACTLY ONCE in every row
and every column — this is a THEOREM, not an axiom, following directly from LEFT CANCELLATION
(reusing `math.abst.group-theory`'s own G2+G4 directly: if $a\cdot b=a\cdot c$, then
$a^{-1}\cdot(a\cdot b)=a^{-1}\cdot(a\cdot c)\Rightarrow b=c$, so no element can repeat in a row).

A Cayley table's SYMMETRY directly reads off commutativity: the table is symmetric (entry $(a,b)$
equals entry $(b,a)$ for every pair) IF AND ONLY IF the group is ABELIAN. A NON-SYMMETRIC Cayley
table does NOT indicate a broken or invalid group — it indicates a genuine, valid NON-ABELIAN
group. $D_3$ (the dihedral group of the triangle, $\{e,r,r^2,s,rs,r^2s\}$) illustrates this
concretely: using the defining relation $sr=r^2s$, the entry at $(r,s)$ is $rs$ while the entry
at $(s,r)$ is $sr=r^2s\ne rs$ — the table is NOT symmetric at these entries, yet $D_3$ is a
completely valid group, satisfying G1–G4 fully; it is simply non-abelian.

MODULAR ARITHMETIC computations in $\mathbb Z/n\mathbb Z$ must always be REDUCED to the canonical
range $\{0,1,\ldots,n-1\}$: the identity is genuinely $0$ (never $n$, even though $n\equiv0\pmod
n$ — the canonical representative is always $0$), and the inverse of $a$ is $(n-a)\bmod n$
(NEVER simply $-a$ unreduced, since $-a$ typically falls outside the canonical range).

## Mental Models
- **"A Cayley table is symmetric exactly when the group is abelian — asymmetric doesn't mean
  broken, it means non-abelian."**
- **"Every element appears exactly once per row and column — the Latin square property, a
  theorem from cancellation, not an assumption."**
- **"In $\mathbb Z/n\mathbb Z$: the identity is always $0$, never $n$; the inverse is
  $(n-a)\bmod n$, never a raw negative."**

## Why Students Fail

### MC-1: CAYLEY-TABLE-ALWAYS-SYMMETRIC
- **Surface form**: claims the Cayley table of any group must be symmetric, "because
  multiplication is symmetric."
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity).
  Ordinary numerical multiplication and addition, the first operations ever encountered, are
  genuinely commutative, and that universal property is overgeneralized into a mistaken belief
  that ALL group operations must share it — conflating commutativity with the group operation
  itself.
- **Repair**: re-compute the specific asymmetric entries for $D_3$ (or another non-abelian
  example) in question, confirming the table is genuinely non-symmetric while the group remains
  fully valid.

### MC-2: MODULAR-IDENTITY-IS-N
- **Surface form**: writes "the identity in $\mathbb Z/n\mathbb Z$ is $n$."
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Secondary severity). The
  modulus $n$ is the most salient number associated with the group's name ($\mathbb Z/n\mathbb
  Z$), and that salience is mistaken for identifying the identity element itself, rather than
  recognizing $n\equiv0\pmod n$ — the identity is the canonical representative $0$.
- **Repair**: re-solve $a+e\equiv a\pmod n$ explicitly for the modulus in question, confirming
  $e=0$.

### MC-3: MODULAR-INVERSE-SUBTRACTION
- **Surface form**: computes the inverse of $a$ in $\mathbb Z/n\mathbb Z$ as "$-a$" without
  checking it lies in $\{0,\ldots,n-1\}$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity).
  Transferring the additive inverse from ordinary $\mathbb Z$ (where $-a$ is simply correct)
  without the extra reduction step $\bmod n$ that modular arithmetic genuinely requires.
- **Repair**: re-solve $a+x\equiv0\pmod n$ explicitly, reducing to the canonical range, for the
  specific case in question.

## Misconceptions

### MC-1: CAYLEY-TABLE-ALWAYS-SYMMETRIC
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: MODULAR-IDENTITY-IS-N
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: MODULAR-INVERSE-SUBTRACTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A round-robin tournament schedule where the order teams play in genuinely changes the
  outcome (who's 'home' vs 'away') is a perfectly valid schedule — it's just not symmetric.
  Symmetric schedules (order never matters) are the special, easier case, not the only valid
  one."**
- **Anti-analogy**: the Latin square property is NOT an assumption to be checked case-by-case —
  it is a guaranteed THEOREM for every group, following from cancellation.

## Demonstrations
- **Demonstration 1 (targets MC-2, MC-3)**: in $\mathbb Z/4\mathbb Z$, read row 2 column 3 from
  the Cayley table to get $2+3=1$; solve $2+x\equiv0\pmod4$ to find the inverse of $2$ is $2$
  itself (self-inverse).
- **Demonstration 2 (targets MC-1)**: in $D_3$, compute $r\cdot s=rs$ (row $r$, column $s$) and
  $s\cdot r=sr=r^2s\ne rs$ (row $s$, column $r$) — the table is genuinely asymmetric, yet $D_3$
  satisfies G1–G4 fully.
- **Demonstration 3 (targets MC-1)**: a candidate table with row $b=[b,b,e]$ violates the Latin
  square property ($b$ repeats), proving it CANNOT be a valid group table at all — via left
  cancellation, $b\cdot a=b\Rightarrow a=b$ contradicts distinctness.

## Discovery Questions
1. "Must every group's Cayley table be symmetric?"
2. "In $\mathbb Z/n\mathbb Z$, is the identity element $n$, or something else?"
3. "Is the inverse of $a$ in $\mathbb Z/n\mathbb Z$ always exactly $-a$?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own axioms, framing the Cayley table as a
   computational tool for the SAME structure already verified abstractly.
2. **Conflict evidence**: the $D_3$ asymmetric-but-valid-group demonstration, breaking MC-1
   directly.
3. **Contrast pair**: symmetric (abelian) tables against asymmetric (non-abelian) tables, both
   satisfying the Latin square property, further isolating MC-1.
4. **Mastery gate**: require a correct Cayley table construction, a correct symmetric-vs-
   asymmetric classification, and a correct cross-link application to the Klein four-group as
   vector addition mod 2, at the Blueprint's own stated PASS_CRITERION of 5/5.

## Tutor Actions
- Never accept "not a valid group" solely because a Cayley table is asymmetric — require G1–G4
  to be checked, not symmetry.
- When a modular identity or inverse is stated, require the learner to solve the defining
  equation explicitly and reduce to the canonical range.

## Voice Teaching Notes
- Say "does an asymmetric table mean the group is broken, or just non-abelian?" whenever
  asymmetry is treated as disqualifying.
- When a modular inverse is computed, ask "is that value in the canonical range $\{0,\ldots,
  n-1\}$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly reads sums, identities, and inverses directly from
  a $\mathbb Z/n\mathbb Z$ Cayley table.
- **Rung 2 (application)**: learner correctly determines whether a group is abelian or
  non-abelian from its Cayley table's symmetry, and correctly verifies the Latin square property.
- **Rung 3 (transfer)**: learner correctly builds the Cayley table for the Klein four-group
  $\mathbb Z/2\mathbb Z\times\mathbb Z/2\mathbb Z$, recognizes it as component-wise vector
  addition mod 2, and correctly distinguishes it from $\mathbb Z/4\mathbb Z$ by order structure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute the specific asymmetric entries for the non-abelian group in
  question.
- If MC-2 recurs, re-solve the specific identity equation for the modulus in question.
- If MC-3 recurs, re-solve the specific inverse equation, reducing to canonical range, for the
  case in question.

## Memory Hooks
- "Symmetric table = abelian. Asymmetric table = non-abelian, still a valid group."
- "Every row and column: each element exactly once — the Latin square theorem."
- "$\mathbb Z/n\mathbb Z$'s identity is $0$, never $n$. Inverse is $(n-a)\bmod n$."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign): supplies the axioms G1–G4 this
  concept's computational tables verify concretely, and the cancellation property (G2+G4) the
  Latin square theorem directly relies on.
- `math.linalg.vector-addition` (already authored, this campaign): the concept's Tier-1
  cross-link, substantively incorporated as the transfer probe's Klein four-group example — the
  group operation on $\mathbb Z/2\mathbb Z\times\mathbb Z/2\mathbb Z$ IS component-wise vector
  addition.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-operation.md`, reused by
  reference for its representation-shift $\mathbb Z/4\mathbb Z$ Cayley-table demonstration, its
  misconception-detector $D_3$ asymmetry gate, its contrast-pair Latin-square verification, and
  its three-misconception registry (birth types independently classified, since this Blueprint
  states Root Cause and Severity but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own cross-link-mode probe against
  `math.linalg.vector-addition` (confirmed genuinely authored via `ls`), building the Klein
  four-group's Cayley table and comparing it to $\mathbb Z/4\mathbb Z$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.group-
  theory`, unlocks none, cross_links `math.linalg.vector-addition`, advanced/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and
  matches exactly. The Blueprint's own cross-link P76 mode against `math.linalg.vector-addition`
  is confirmed genuinely valid — that concept IS authored (this campaign) — required no
  correction.

## Version History
- 2026-09-14 (Batch 85): authored. Third entry this batch, part of the 9-candidate frontier
  opened by Batch 84's `group-theory`. Companion batch concepts: `math.abst.ring-theory`,
  `math.abst.subgroup`, `math.abst.group-inverse`. `math.abst` moves toward **7/37** this batch.

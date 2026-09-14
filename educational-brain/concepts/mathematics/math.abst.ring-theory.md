# math.abst.ring-theory

## Identity
- **KG id**: `math.abst.ring-theory`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: `math.abst.ideal`, `math.abst.field`
- **Cross-links**: `math.linalg.matrix-multiplication`
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Recognize a RING $(R,+,\cdot)$ as an algebraic structure with TWO binary operations, where the
first ($+$) forms an ABELIAN GROUP (reusing `math.abst.group-theory`'s own G1–G5 directly as
axiom R1) but the second ($\cdot$) is required ONLY to be CLOSED, ASSOCIATIVE, and DISTRIBUTIVE
over $+$ — never requiring multiplicative inverses or identity; and correctly verify all five
ring axioms R1–R5 for both commutative and non-commutative examples.

## Core Understanding
A RING $(R,+,\cdot)$ satisfies exactly five axioms: R1 — $(R,+)$ is an ABELIAN GROUP, reusing
`math.abst.group-theory`'s own G1–G5 directly (closure, associativity, identity $0$, inverses
$-r$, commutativity); R2 — $\cdot$ is CLOSED: $r\cdot s\in R$ for all $r,s\in R$; R3 — $\cdot$ is
ASSOCIATIVE: $(r\cdot s)\cdot t=r\cdot(s\cdot t)$; R4 — LEFT DISTRIBUTIVITY:
$r\cdot(s+t)=r\cdot s+r\cdot t$; R5 — RIGHT DISTRIBUTIVITY: $(r+t)\cdot s=r\cdot s+t\cdot s$.
Multiplicative IDENTITY, multiplicative INVERSES, and multiplicative COMMUTATIVITY are all
OPTIONAL EXTRAS — NEVER definitional requirements of a ring. A ring's $+$ is FULLY
group-equipped (a genuine abelian group); its $\cdot$ is only PARTIALLY structured (closed,
associative, distributive — nothing more).

DISTRIBUTIVITY specifically links $+$ and $\cdot$: multiplication distributes over ADDITION
($r\cdot(s+t)=r\cdot s+r\cdot t$), NEVER over multiplication itself
($r\cdot(s\cdot t)\ne(r\cdot s)\cdot(r\cdot t)$ in general — this is not even the correct shape
of the axiom). $\mathbb Z$ is the prototypical ring: $(\mathbb Z,+)$ is an abelian group, $\times$
is closed/associative/distributive over $+$ — but $2$ has NO multiplicative inverse in
$\mathbb Z$, and this does NOT disqualify $\mathbb Z$ from being a ring, since no ring axiom ever
requires multiplicative inverses. That stronger requirement — every non-zero element having a
multiplicative inverse — is what defines a FIELD, a strictly stronger structure built on top of a
ring (`math.abst.field`, this concept's own downstream unlock).

RINGS need not be COMMUTATIVE under multiplication: $M_2(\mathbb R)$ (2×2 real matrices under
matrix addition and multiplication) satisfies R1–R5 fully — $(M_2(\mathbb R),+)$ is abelian
(zero matrix identity, entry-wise negation as inverse), matrix multiplication is closed,
associative, and distributes over addition — yet $AB\ne BA$ in general. $M_2(\mathbb R)$ is a
genuine NON-COMMUTATIVE ring; commutativity of $\cdot$ is never one of R1–R5, so its absence is
never disqualifying.

## Mental Models
- **"A ring is a full group under $+$, but only closed/associative/distributive under $\cdot$ —
  no multiplicative inverses required."**
- **"Distributivity spreads $\cdot$ over $+$, never $\cdot$ over $\cdot$."**
- **"Commutativity of multiplication is a bonus (commutative ring), never a requirement."**

## Why Students Fail

### MC-1: RING-IS-TWO-GROUPS
- **Surface form**: believes a ring requires $(R,\cdot)$ to be a group (with multiplicative
  inverses and identity), rejecting $\mathbb Z$ as a ring because $2$ has no multiplicative
  inverse in $\mathbb Z$.
- **Birth type**: Type 6, analogy overextension (Blueprint's own declared FOUNDATIONAL priority,
  here attributed to copying the group axiom template wholesale onto multiplication, extending
  the "two operations, symmetric requirements" pattern past where it actually applies). Since $+$
  IS a full group, the "everything a group needs" template is extended by analogy onto $\cdot$ as
  well, when the ring definition deliberately asks less of $\cdot$.
- **Repair**: re-verify R1–R5 explicitly for $\mathbb Z$, confirming no axiom requires a
  multiplicative inverse; distinguish ring from field explicitly.

### MC-2: DISTRIBUTIVITY-CONFUSED
- **Surface form**: writes distributivity as $a\cdot(b\cdot c)=(a\cdot b)\cdot(a\cdot c)$
  (distributing $\cdot$ over $\cdot$) rather than $\cdot$ over $+$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared birth type). The word
  "distribute" is pattern-matched to "spread across the other operation present," without
  specifying WHICH operation distributes over WHICH — since both operations use the same
  syntactic shape (a binary infix symbol), the specific $+$-inside-parentheses structure of the
  real axiom is easy to lose.
- **Repair**: re-verify the specific numerical instance of R4/R5 for the case in question, showing
  the addition genuinely sits inside the parentheses.

### MC-3: COMMUTATIVITY-REQUIRED
- **Surface form**: believes all rings must satisfy $r\cdot s=s\cdot r$, concluding $M_2(\mathbb
  R)$ cannot be a ring.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). All the
  elementary examples first encountered ($\mathbb Z$, $\mathbb R$, $\mathbb Z/n\mathbb Z$) happen
  to be commutative rings, and that shared property is overgeneralized into a mistaken belief
  that it belongs to the defining axiom list R1–R5.
- **Repair**: re-verify R1–R5 explicitly for $M_2(\mathbb R)$, confirming all five hold despite
  $AB\ne BA$ in general.

## Misconceptions

### MC-1: RING-IS-TWO-GROUPS
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

### MC-2: DISTRIBUTIVITY-CONFUSED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: COMMUTATIVITY-REQUIRED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"You can always add and subtract integers freely, but you can't always divide — a ring
  formalizes exactly this: full arithmetic power under addition, but division is never
  guaranteed."**
- **Anti-analogy**: a ring is NOT "two groups glued together" — the multiplicative side is
  deliberately weaker, asking only for closure, associativity, and distributivity, never
  inverses or identity.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: verify $(\mathbb Z,+,\times)$ satisfies R1–R5 fully; note
  $2$ has no multiplicative inverse in $\mathbb Z$, and confirm this violates NO ring axiom.
- **Demonstration 2 (targets MC-2)**: for $\mathbb Z/4\mathbb Z$, verify
  $[2]\cdot([1]+[3])=[2]\cdot[1]+[2]\cdot[3]$ — both sides equal $[0]$, confirming distributivity
  spreads $\cdot$ over $+$, never over $\cdot$.
- **Demonstration 3 (targets MC-3)**: for $M_2(\mathbb R)$ with $A=\begin{pmatrix}1&2\\0&1
  \end{pmatrix},B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$: $AB=\begin{pmatrix}3&2\\1&1\end{pmatrix}
  \ne BA=\begin{pmatrix}1&2\\1&3\end{pmatrix}$ — yet R1–R5 all verified to hold; $M_2(\mathbb R)$
  is a genuine non-commutative ring.

## Discovery Questions
1. "Does $\mathbb Z$ fail to be a ring because $2$ has no multiplicative inverse in $\mathbb Z$?"
2. "Does distributivity mean $a\cdot(b\cdot c)=(a\cdot b)\cdot(a\cdot c)$?"
3. "Must every ring satisfy $r\cdot s=s\cdot r$ for all elements?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own abelian-group definition, framing R1
   as its direct reuse for the additive operation.
2. **Conflict evidence**: the $\mathbb Z$-is-a-ring-despite-no-multiplicative-inverse
   verification, breaking MC-1 directly.
3. **Contrast pair**: the group (multiplicative-inverse-requiring) axiom template against the
   ring's weaker multiplicative requirements, isolating MC-1 further; commutative rings against
   the non-commutative $M_2(\mathbb R)$, isolating MC-3.
4. **Mastery gate**: require a correct R1–R5 verification for a candidate ring, a correct
   distributivity computation, and a correct non-commutative ring classification, at the
   Blueprint's own stated pass criterion of 5/5.

## Tutor Actions
- Never accept "not a ring" solely because multiplication lacks an inverse — require R1–R5 to be
  checked explicitly.
- When distributivity is invoked, require the learner to state which operation sits inside the
  parentheses (addition) before computing.

## Voice Teaching Notes
- Say "which ring axiom would actually require a multiplicative inverse?" whenever a ring is
  rejected for lacking one.
- When a non-commutative candidate ring is presented, ask "does any of R1 through R5 mention
  commutativity of multiplication?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies R1–R5 for a given candidate ring.
- **Rung 2 (application)**: learner correctly computes a distributivity instance in modular
  arithmetic, correctly identifying which operation distributes over which.
- **Rung 3 (transfer)**: learner correctly verifies $M_2(\mathbb R)$ satisfies all five ring
  axioms via matrix addition/multiplication, correctly classifying it as a non-commutative ring.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify R1–R5 explicitly for the specific candidate in question.
- If MC-2 recurs, re-verify the specific distributivity instance for the case in question.
- If MC-3 recurs, re-verify R1–R5 explicitly for the specific non-commutative candidate in
  question.

## Memory Hooks
- "Full group under $+$; only closed, associative, distributive under $\cdot$."
- "Distribute $\cdot$ over $+$ — the $+$ sits inside the parentheses."
- "Commutativity of $\cdot$ is a bonus (commutative ring), never a requirement."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign): supplies the abelian-group
  definition R1 directly reuses for the ring's additive structure.
- `math.linalg.matrix-multiplication` (already authored, this campaign): the concept's Tier-1
  cross-link, substantively incorporated as the non-commutative-ring worked example — verifying
  $M_2(\mathbb R)$ satisfies R1–R5 via matrix addition and multiplication directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.ring-theory.md`, reused by reference
  for its contrast-pair group-vs-ring axiom comparison, its representation-shift distributivity
  demonstration, its pattern-induction non-commutative-ring example, and its three-misconception
  registry (birth types independently classified, since this Blueprint states Origin/Trigger but
  not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own cross-link-mode probe against
  `math.linalg.matrix-multiplication` (confirmed genuinely authored via `ls`), verifying
  $M_2(\mathbb R)$ satisfies all ring axioms via matrix operations.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.group-
  theory`, unlocks `math.abst.ideal`+`math.abst.field`, cross_links `math.linalg.matrix-
  multiplication`, advanced/understand, mastery_threshold 0.85, estimated_hours 5) was directly
  verified against the live KG and matches exactly. The Blueprint's own cross-link P76 mode
  against `math.linalg.matrix-multiplication` is confirmed genuinely valid — that concept IS
  authored (this campaign) — required no correction.

## Version History
- 2026-09-14 (Batch 85): authored. First entry this batch, part of the 9-candidate frontier
  opened by Batch 84's `group-theory`. This is the highest-leverage concept in this batch —
  `math.abst.ring-theory` is one of the two prerequisites (`ring-theory`+`prime-ideal`) for
  `math.abst.field`, the shared blocker parking both `math.linalg` (since Batch 80) and
  `math.opt` (since Batch 83). Companion batch concepts: `math.abst.subgroup`,
  `math.abst.group-operation`, `math.abst.group-inverse`. `math.abst` moves toward **7/37** this
  batch.

# math.abst.group-theory

## Identity
- **KG id**: `math.abst.group-theory`
- **Domain**: math.abst
- **Requires**: `math.abst.binary-operation`
- **Unlocks**: `math.abst.subgroup`, `math.abst.coset`
- **Cross-links**: `math.linalg.vector-addition`
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Recognize a GROUP as a set $G$ together with a binary operation $\cdot$ (reusing `math.abst.
binary-operation`'s own closure-preserving definition directly as axiom G1) satisfying exactly
FOUR axioms — closure (G1), associativity (G2), identity (G3), inverses (G4); distinguish these
FOUR REQUIRED axioms from the FIFTH, OPTIONAL property of commutativity (G5, defining "abelian");
and correctly find identity elements and inverses BY SOLVING the defining equations directly,
rather than assuming they must be $0$/$1$ or negation.

## Core Understanding
A GROUP $(G,\cdot)$ satisfies exactly four axioms: G1 CLOSURE — $a\cdot b\in G$ for all $a,b\in
G$ (reusing `math.abst.binary-operation`'s own definition of binary operation directly as this
group's baseline); G2 ASSOCIATIVITY — $(a\cdot b)\cdot c=a\cdot(b\cdot c)$; G3 IDENTITY — there
exists $e\in G$ such that $a\cdot e=e\cdot a=a$ for every $a\in G$; G4 INVERSES — for every $a\in
G$, there exists $a^{-1}\in G$ such that $a\cdot a^{-1}=a^{-1}\cdot a=e$. If additionally G5
COMMUTATIVITY ($a\cdot b=b\cdot a$) holds, the group is called ABELIAN — but G5 is NOT one of the
four defining axioms; it is a separate, optional property a group may or may not have. A group
satisfying G1–G4 without G5 is a genuinely valid, NON-ABELIAN group, not a defective one.

G3 and G4 are EQUATIONS TO SOLVE, never patterns to assume: the identity element $e$ is whatever
satisfies $a\cdot e=a$ FOR THE SPECIFIC OPERATION in question — for the custom operation
$a*b=a+b-1$ on $\mathbb Z$, solving $a*e=a$ gives $a+e-1=a\Rightarrow e=1$, NOT the familiar
$e=0$. Similarly, the inverse $a^{-1}$ is whatever solves $a\cdot x=e$ using THAT specific
identity — for the same custom operation, $a*x=1\Rightarrow a+x-1=1\Rightarrow x=2-a$, NOT the
familiar $a^{-1}=-a$. The two-step procedure — first solve for $e$, then solve for $a^{-1}$ using
that $e$ — must never be skipped or assumed from familiar examples.

Canonical examples establish the axioms concretely: $(\mathbb Z,+)$ is ABELIAN (identity $0$,
inverse $-a$, and commutative); $(GL_2(\mathbb R),\times)$ (invertible $2\times2$ real matrices
under multiplication) satisfies G1–G4 but is NON-ABELIAN (matrix multiplication is not
commutative in general) — it is STILL a genuine group. $(\mathbb N,+)$ with $\mathbb N=\{1,2,3,
\ldots\}$ FAILS G3 (no identity $0$ exists in $\mathbb N$); $(\mathbb Z,\times)$ FAILS G4 (most
integers, like $2$, have no integer multiplicative inverse) — neither is a group. The identity
element is UNIQUE, and inverses are unique — these are THEOREMS provable from the axioms (if $e$
and $e'$ are both identities, $e=e\cdot e'=e'$), not additional axioms themselves.

## Mental Models
- **"Four axioms, not five: closure, associativity, identity, inverses. Commutativity is the
  bonus fifth property — abelian, not required."**
- **"Identity and inverse are equations to SOLVE using the specific operation — never assumed as
  $0$/$1$/negation from familiar habit."**
- **"A non-abelian group is still a perfectly valid group — non-commutative doesn't mean
  broken."**

## Why Students Fail

### MC-1: GROUP-NEEDS-COMMUTATIVITY
- **Surface form**: claims $(GL_2(\mathbb R),\times)$ is not a group because matrix
  multiplication is not commutative.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). The
  most familiar groups encountered first — $(\mathbb Z,+)$, $(\mathbb R\setminus\{0\},\times)$ —
  are all abelian, and that shared property is overgeneralized into a mistaken belief that
  commutativity (G5) belongs to the actual defining axiom list (G1–G4).
- **Repair**: re-verify G1–G4 explicitly for the specific non-abelian group in question, confirming
  it satisfies all four required axioms despite failing G5.

### MC-2: IDENTITY-MUST-BE-ZERO-OR-ONE
- **Surface form**: assumes the identity is always $0$ (for additive-looking groups) or $1$ (for
  multiplicative-looking groups), unable to find the identity in non-standard groups.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity, here
  attributed to surface pattern-matching from familiar examples rather than solving G3 from first
  principles). The visual similarity of an operation's symbol ($+$ or $\times$) to ordinary
  arithmetic is overgeneralized into assuming the SAME identity value, without actually solving
  $a\cdot e=a$ for the specific operation.
- **Repair**: re-solve $a\cdot e=a$ explicitly for the specific custom operation in question,
  confirming the identity element it actually produces.

### MC-3: INVERSE-IS-NEGATIVE
- **Surface form**: writes $a^{-1}=-a$ always, without connecting the definition of inverse to the
  specific operation and identity in the group being considered.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity, here
  attributed to overgeneralizing from $(\mathbb Z,+)$ where $a^{-1}=-a$ genuinely holds, applying
  it universally rather than re-deriving G4 from first principles each time).
- **Repair**: re-solve $a\cdot x=e$ explicitly for the specific operation and its own already-found
  identity, confirming the inverse it actually produces.

## Misconceptions

### MC-1: GROUP-NEEDS-COMMUTATIVITY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: IDENTITY-MUST-BE-ZERO-OR-ONE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: INVERSE-IS-NEGATIVE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A traffic intersection with strict right-of-way rules is a perfectly functioning system even
  though the order cars arrive genuinely changes who goes first — 'order matters' (non-abelian)
  doesn't mean the system is broken, just that it's not the simpler kind where order never
  matters."**
- **Anti-analogy**: the identity element is NOT automatically "whatever looks like zero or one" —
  it is whatever specific element solves $a\cdot e=a$ for the operation actually being used.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $(GL_2(\mathbb R),\times)$, verify G1 (product of
  invertible matrices is invertible), G2 (matrix multiplication is always associative), G3
  (identity matrix $I_2$), G4 (every invertible matrix has an inverse) — all four hold, despite
  $AB\ne BA$ in general.
- **Demonstration 2 (targets MC-2)**: for the custom operation $a*b=a+b-1$ on $\mathbb Z$, solve
  $a*e=a\Rightarrow e=1$ (not $0$); verify $a*1=a+1-1=a$ ✓.
- **Demonstration 3 (targets MC-3)**: for the same custom operation with $e=1$, solve $a*x=1
  \Rightarrow x=2-a$; for $a=5$, the inverse is $2-5=-3$ (not $-5$); verify $5*(-3)=5+(-3)-1=1=e$
  ✓.

## Discovery Questions
1. "Is the set of invertible $2\times2$ matrices under multiplication a group, given that matrix
   multiplication is not commutative?"
2. "Must the identity element of every group be $0$ or $1$?"
3. "Is the inverse of an element in a group always its negative?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.binary-operation`'s own closure definition, framing G1 as
   its direct reuse and G2–G4 as new required axioms layered on top.
2. **Conflict evidence**: the $(GL_2(\mathbb R),\times)$ non-abelian-but-genuine-group
   verification, breaking MC-1 directly.
3. **Contrast pair**: solving G3/G4 by definition for a custom operation against the familiar
   $(\mathbb Z,+)$/$(\mathbb R\setminus\{0\},\times)$ pattern, isolating MC-2 and MC-3.
4. **Mastery gate**: require a correct five-condition (G1–G5) verification distinguishing group
   axioms from the abelian property, a correct non-group diagnosis (identifying which specific
   axiom fails), and a correct cross-link application to vector addition, at the Blueprint's own
   stated PASS_CRITERION of 5/5.

## Tutor Actions
- Never accept "not a group" solely because an operation is non-commutative — require G1–G4 to be
  checked explicitly first.
- When an identity or inverse is claimed, require the learner to show the solving equation
  ($a\cdot e=a$ or $a\cdot x=e$), not just state a value.

## Voice Teaching Notes
- Say "does failing commutativity actually fail one of the four group axioms?" whenever
  non-commutativity is used to disqualify a group.
- When an identity or inverse is stated, ask "did you solve for that, or assume it from a familiar
  example?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies G1–G4 for a given $(G,\cdot)$ and
  correctly determines whether it is also abelian (G5).
- **Rung 2 (application)**: learner correctly identifies which specific axiom fails for a given
  non-group (e.g. G3 for $(\mathbb N,+)$, G4 for $(\mathbb Z,\times)$).
- **Rung 3 (transfer)**: learner correctly verifies that $(\mathbb R^2,+)$ under component-wise
  vector addition is an abelian group (G1–G5), using `math.linalg.vector-addition`'s own
  component-wise structure directly.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify G1–G4 explicitly for the specific non-abelian group in question.
- If MC-2 recurs, re-solve $a\cdot e=a$ explicitly for the specific operation in question.
- If MC-3 recurs, re-solve $a\cdot x=e$ explicitly for the specific operation and identity in
  question.

## Memory Hooks
- "Four axioms: closure, associativity, identity, inverses. Commutativity is a fifth, optional
  bonus."
- "Solve for the identity: $a\cdot e=a$. Solve for the inverse: $a\cdot x=e$. Never assume."
- "Non-abelian is still a group — just not a commutative one."

## Transfer Connections
- `math.abst.binary-operation` (already authored, this campaign): supplies the closure-preserving
  binary-operation definition this concept's axiom G1 directly reuses, and the "extra optional
  properties" framing this concept's own G2–G5 structure directly extends.
- `math.linalg.vector-addition` (already authored, this campaign): the concept's Tier-1 cross-link,
  substantively incorporated as the transfer probe's own worked case — verifying $(\mathbb R^2,+)$
  satisfies all five group conditions using vector addition's own component-wise structure.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-theory.md`, reused by reference
  for its analogy-bridge canonical-group introduction, its misconception-detector non-abelian
  gate, its contrast-pair identity/inverse-by-definition demonstrations, and its three-
  misconception registry (birth types independently attributed from the Blueprint's own Root-
  Cause descriptions, since this Blueprint states Root Cause and Severity but not a formal Type
  label).
- Transfer probe cited by reference: the Blueprint's own cross-link-mode probe against
  `math.linalg.vector-addition` (confirmed genuinely authored via `ls`), verifying $(\mathbb R^2,
  +)$ satisfies all five group conditions via component-wise vector addition.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.binary-
  operation`, unlocks `math.abst.subgroup`+`math.abst.coset`, cross_links `math.linalg.vector-
  addition`, advanced/understand, mastery_threshold 0.9, estimated_hours 5) was directly verified
  against the live KG and matches exactly. The Blueprint's own cross-link P76 mode against
  `math.linalg.vector-addition` is confirmed genuinely valid — that concept IS authored (this
  campaign) — required no correction.

## Version History
- 2026-09-14 (Batch 84): authored. Sole topologically-ready `math.abst` candidate after Batch 83
  (requires `math.abst.binary-operation`, authored that batch). `math.abst` moves toward
  **3/37** this batch.

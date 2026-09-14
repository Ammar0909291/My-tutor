# math.abst.group-inverse

## Identity
- **KG id**: `math.abst.group-inverse`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: none
- **Cross-links**: `math.linalg.matrix-inverse`
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.95
- **Estimated hours**: 1

## Learning Objective
Prove the UNIQUENESS theorem — the inverse of any group element is unique (reusing `math.abst.
group-theory`'s own G2+G4 directly in the proof); prove and apply the PRODUCT-INVERSE FORMULA
$(a\cdot b)^{-1}=b^{-1}\cdot a^{-1}$ (order REVERSES); and prove the DOUBLE-INVERSE theorem
$(a^{-1})^{-1}=a$, correctly identifying which group axiom justifies each proof step.

## Core Understanding
G4 (reusing `math.abst.group-theory`'s own axiom directly) guarantees inverses EXIST; this
concept sharpens that guarantee with three THEOREMS. UNIQUENESS (T1): the inverse of any element
is unique — if $a\cdot b=e$ and $a\cdot c=e$, then $b=b\cdot e=b\cdot(a\cdot c)=(b\cdot a)\cdot
c=e\cdot c=c$ (using G4, G3, G2, G4, G3 in that specific order). This single proof, applying
associativity (G2) to route through the shared identity, is the foundation both other theorems
build on directly.

The PRODUCT-INVERSE FORMULA (T2): for any $a,b\in G$, $(a\cdot b)^{-1}=b^{-1}\cdot a^{-1}$ — the
order REVERSES, it does NOT stay parallel to the original product. Proof:
$(a\cdot b)\cdot(b^{-1}\cdot a^{-1})=a\cdot(b\cdot b^{-1})\cdot a^{-1}=a\cdot e\cdot a^{-1}=a\cdot
a^{-1}=e$ — by UNIQUENESS (T1), since this product with $(ab)$ gives $e$, $b^{-1}\cdot a^{-1}$
MUST be $(a\cdot b)^{-1}$. In ABELIAN groups (like $(\mathbb Z,+)$), commutativity HIDES this
reversal — $a^{-1}\cdot b^{-1}$ and $b^{-1}\cdot a^{-1}$ coincide — but in NON-ABELIAN groups
(like $GL_n(\mathbb R)$ under matrix multiplication), the reversal is essential: computing
$(AB)^{-1}$ genuinely differs from $A^{-1}B^{-1}$ and equals $B^{-1}A^{-1}$ instead.

The DOUBLE-INVERSE theorem (T3): $(a^{-1})^{-1}=a$ for every $a\in G$. Proof: $a^{-1}\cdot a=e$
(G4), so $a$ ITSELF satisfies the defining property of being the inverse of $a^{-1}$; by
UNIQUENESS (T1), $(a^{-1})^{-1}=a$ directly — this is the SHORTEST path, reusing T1 rather than
re-solving the defining equation from scratch.

## Mental Models
- **"The inverse is unique — no element ever has two different inverses; G2+G4 force this."**
- **"$(a\cdot b)^{-1}=b^{-1}\cdot a^{-1}$ — the order reverses, like removing shoes-then-socks:
  socks off first, then shoes."**
- **"$(a^{-1})^{-1}=a$ — apply uniqueness once, don't re-derive from scratch."**

## Why Students Fail

### MC-1: INVERSE-NOT-UNIQUE
- **Surface form**: claims "a group element might have two different inverses," or treats
  non-uniqueness as possible.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity,
  here attributed to not having applied G4 and associativity together — the uniqueness
  consequence isn't automatically visible from G4's existence claim alone). G4 only asserts an
  inverse EXISTS, and without explicitly combining it with G2 (associativity) via the uniqueness
  proof, its uniqueness is not obviously guaranteed, leaving open the possibility of multiple
  inverses.
- **Repair**: re-walk the uniqueness proof step-by-step with concrete numbers for the specific
  case in question, confirming any two candidate inverses must coincide.

### MC-2: PRODUCT-INVERSE-WRONG-ORDER
- **Surface form**: writes $(a\cdot b)^{-1}=a^{-1}\cdot b^{-1}$ (parallel to the product, not
  reversed).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity, here
  attributed to over-generalizing from $(\mathbb Z,+)$ where addition is commutative and order
  genuinely doesn't matter). Since the wrong-order and correct-order formulas COINCIDE in abelian
  groups, no evidence ever surfaces to correct the assumption until a non-abelian example is
  tried.
- **Repair**: re-compute both formulas numerically for a specific non-abelian (e.g. matrix) case
  in question, confirming only the reversed order matches the true inverse.

## Misconceptions

### MC-1: INVERSE-NOT-UNIQUE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: PRODUCT-INVERSE-WRONG-ORDER
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Putting on shoes, then socks, and later wanting to undo it: you must remove socks first
  (the last thing put on), then shoes — the undo-order is the exact reverse of the do-order.
  That's exactly why $(a\cdot b)^{-1}=b^{-1}\cdot a^{-1}$."**
- **Anti-analogy**: the inverse of a product is NOT found by inverting each factor in place —
  $a^{-1}\cdot b^{-1}$ is generally the WRONG answer; the order must reverse.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: in $(\mathbb Z,+)$, if $3+b=0$ and $3+c=0$, both force
  $b=c=-3$ — concretely confirming uniqueness for this case, matching the abstract proof exactly.
- **Demonstration 2 (targets MC-2)**: for $A=\begin{pmatrix}1&1\\0&1\end{pmatrix},B=
  \begin{pmatrix}1&0\\1&1\end{pmatrix}$ in $GL_2(\mathbb R)$: computing $A^{-1}B^{-1}$ gives a
  DIFFERENT matrix than $(AB)^{-1}$, while $B^{-1}A^{-1}$ matches $(AB)^{-1}$ exactly.
- **Demonstration 3 (targets MC-1)**: apply T3 twice to $((a^{-1})^{-1})^{-1}$: first
  $(a^{-1})^{-1}=a$, then $(a)^{-1}=a^{-1}$ — confirming the result is $a^{-1}$, using uniqueness
  rather than re-solving from scratch each time.

## Discovery Questions
1. "Could a group element have two genuinely different inverses?"
2. "Is $(a\cdot b)^{-1}$ equal to $a^{-1}\cdot b^{-1}$, or to $b^{-1}\cdot a^{-1}$?"
3. "What is $(a^{-1})^{-1}$, and how would you prove it using uniqueness rather than re-solving
   from scratch?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own G2 (associativity) and G4 (inverse
   existence), framing the uniqueness proof as their direct combination.
2. **Conflict evidence**: the non-abelian matrix counterexample where $A^{-1}B^{-1}\ne(AB)^{-1}$
   but $B^{-1}A^{-1}=(AB)^{-1}$, breaking MC-2 directly.
3. **Contrast pair**: the wrong-order formula against the correct reversed-order formula, tested
   side by side on the same matrices, further isolating MC-2.
4. **Mastery gate**: require a correct uniqueness proof, a correct product-inverse formula
   application with correct order, and a correct double-inverse proof via uniqueness, at the
   Blueprint's own stated PASS_CRITERION of 5/5.

## Tutor Actions
- Never accept an inverse claim without requiring the uniqueness argument (or its direct
  application) to justify it.
- When a product's inverse is computed, require the learner to state the reversed order
  explicitly before computing.

## Voice Teaching Notes
- Say "how do you know that's the ONLY inverse, not just an inverse?" whenever uniqueness is
  assumed without justification.
- When a product-inverse formula is applied, ask "does the order stay the same, or reverse?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly reproduces the uniqueness proof, citing G2, G3, G4
  at each step.
- **Rung 2 (application)**: learner correctly applies the product-inverse formula with the
  correct reversed order to a specific non-abelian example.
- **Rung 3 (transfer)**: learner correctly verifies, in $GL_2(\mathbb R)$, that the group-
  theoretic product-inverse formula matches the matrix-inverse computation, and correctly
  identifies when the wrong-order formula happens to coincide (when the elements commute).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the uniqueness proof with concrete numbers for the case in question.
- If MC-2 recurs, re-compute both orders numerically for the specific non-abelian case in
  question.

## Memory Hooks
- "Uniqueness: G2 plus G4 force it — no element has two inverses."
- "Shoes then socks: undo socks first, then shoes — the order reverses."
- "Double-inverse: apply uniqueness once, don't re-derive."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign): supplies G2 (associativity), G3
  (identity), and G4 (inverse existence) this concept's three theorems directly build their
  proofs from.
- `math.linalg.matrix-inverse` (already authored, this campaign): the concept's Tier-1
  cross-link, substantively incorporated as the transfer probe's own worked case — verifying the
  group-theoretic product-inverse formula matches the matrix inverse in $GL_2(\mathbb R)$
  directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-inverse.md`, reused by
  reference for its representation-shift uniqueness/double-inverse proof gallery, its
  contrast-pair product-inverse-order demonstration, and its two-misconception registry (birth
  types independently classified, since this Blueprint states Root Cause and Severity but not a
  formal Type label).
- Transfer probe cited by reference: the Blueprint's own cross-link-mode probe against
  `math.linalg.matrix-inverse` (confirmed genuinely authored via `ls`), verifying the
  product-inverse formula concretely for $2\times2$ matrices.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.group-
  theory`, unlocks none, cross_links `math.linalg.matrix-inverse`, advanced/understand,
  mastery_threshold 0.95, estimated_hours 1) was directly verified against the live KG and
  matches exactly. The Blueprint's own cross-link P76 mode against `math.linalg.matrix-inverse`
  is confirmed genuinely valid — that concept IS authored (this campaign) — required no
  correction.

## Version History
- 2026-09-14 (Batch 85): authored. Fourth and final entry this batch, part of the 9-candidate
  frontier opened by Batch 84's `group-theory`. Companion batch concepts: `math.abst.ring-
  theory`, `math.abst.subgroup`, `math.abst.group-operation`. `math.abst` moves from 3/37 to
  **7/37** this batch.

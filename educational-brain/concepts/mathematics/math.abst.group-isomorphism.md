# math.abst.group-isomorphism

## Identity
- **KG id**: `math.abst.group-isomorphism`
- **Domain**: math.abst
- **Requires**: `math.abst.group-homomorphism`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define a GROUP ISOMORPHISM $\varphi:G\to H$ as a BIJECTIVE group homomorphism — satisfying both
the homomorphism condition $\varphi(ab)=\varphi(a)\varphi(b)$ (reusing `math.abst.
group-homomorphism`'s own definition directly) AND bijectivity (injective and surjective); use
STRUCTURAL INVARIANTS (element order multisets, in particular) to PROVE two groups of the SAME
order are NOT isomorphic; and distinguish a mere bijection between two groups from a genuine
isomorphism, recognizing that a bijection alone says nothing about whether the group operation is
respected.

## Core Understanding
A GROUP ISOMORPHISM $\varphi:G\to H$ is a BIJECTIVE group homomorphism: a map satisfying (I1)
$\varphi(ab)=\varphi(a)\varphi(b)$ for all $a,b\in G$ (the homomorphism condition, reusing
`math.abst.group-homomorphism`'s own definition directly), (I2) $\varphi$ injective, and (I3)
$\varphi$ surjective. Two groups $G$ and $H$ are ISOMORPHIC (written $G\cong H$) if such a
$\varphi$ exists. Isomorphic groups are structurally IDENTICAL — they differ only in the LABELING
of elements, never in their underlying algebraic structure.

The prerequisite `math.abst.group-homomorphism` already established that a homomorphism $\varphi:
G\to H$ satisfies $\varphi(ab)=\varphi(a)\varphi(b)$ but MAY collapse structure — the trivial map
sending everything to the identity is a perfectly valid homomorphism, but it is FAR from
bijective. An isomorphism requires bijection on top of the homomorphism condition — no collapse,
no gaps — so both groups end up genuinely the SAME size and the SAME structure.

PROPERTIES PRESERVED BY ISOMORPHISMS include: the order of the group, the order of EACH element
(if $\operatorname{ord}(g)=k$ then $\operatorname{ord}(\varphi(g))=k$), the abelian property, the
cyclic property, and the number of elements of each order. This last fact gives a powerful PROOF
TOOL: to show $G\not\cong H$, it suffices to find ONE structural invariant that differs — most
commonly, the MULTISET of element orders. $|G|=|H|$ is NECESSARY for $G\cong H$ but is NOT
SUFFICIENT — same size never by itself guarantees isomorphism.

The canonical demonstration: $\mathbb Z/4\mathbb Z$ and $V_4=\mathbb Z/2\mathbb Z\times\mathbb Z/2
\mathbb Z$ both have order 4, yet $\mathbb Z/4\mathbb Z$ has an element of order 4 (its generator),
while $V_4$'s every non-identity element has order 2 — NO element of order 4 exists in $V_4$. Since
an isomorphism would be forced to send a generator of $\mathbb Z/4\mathbb Z$ (order 4) to SOME
element of $V_4$ of order 4, and none exists, $\mathbb Z/4\mathbb Z\not\cong V_4$ despite identical
order.

## Mental Models
- **"Same size is necessary, never sufficient — always check a structural invariant like element
  orders before concluding two groups are isomorphic."**
- **"Isomorphism = bijection AND homomorphism, both required — a bijection that ignores the group
  operation isn't an isomorphism."**
- **"Isomorphic groups are the SAME structure wearing different labels — different elements,
  possibly a different operation symbol, but one underlying blueprint."**

## Why Students Fail

### MC-1: SAME-SIZE-MEANS-ISOMORPHIC
- **Surface form**: claims $\mathbb Z/4\mathbb Z\cong V_4$ because both have 4 elements.
- **Birth type**: FOUNDATIONAL severity (Blueprint's own declared level). Confuses bijection of
  SETS with isomorphism of GROUPS, ignoring the homomorphism condition and structural invariants —
  after encountering isomorphisms like $\mathbb Z/2\mathbb Z\cong\{1,-1\}$ and $\mathbb Z/4
  \mathbb Z\cong\{1,i,-1,-i\}$, the pattern "same order → isomorphic" is over-generalized.
- **Repair**: re-verify the specific pair's element-order multisets directly, confirming they
  differ before concluding non-isomorphism.

### MC-2: ANY-BIJECTION-IS-ISOMORPHISM
- **Surface form**: proposes a bijection $\varphi:G\to H$ without checking $\varphi(ab)=\varphi(a)
  \varphi(b)$.
- **Birth type**: Secondary severity (Blueprint's own declared level). Forgets that isomorphism =
  bijection + homomorphism, treating it as a purely set-theoretic notion — the operation-respecting
  condition is silently dropped.
- **Repair**: re-attempt the specific proposed bijection's homomorphism check directly, computing
  $\varphi(a\cdot b)$ and $\varphi(a)\cdot\varphi(b)$ separately and comparing.

### MC-3: ISOMORPHISM-PRESERVES-LABELS
- **Surface form**: thinks isomorphic groups share the same element names or operation symbol.
- **Birth type**: Secondary severity (Blueprint's own declared level). Conflates structural
  sameness with identical representation — doesn't see that $G\cong H$ means RELABELING, not
  literal identity of the underlying sets.
- **Repair**: re-examine the specific isomorphism's two groups directly, confirming they consist of
  genuinely different objects (e.g. integers versus complex numbers) sharing only the structure.

## Misconceptions

### MC-1: SAME-SIZE-MEANS-ISOMORPHIC
- **Surface form**: as described above.
- **Root cause (FOUNDATIONAL)**: as described above.
- **Repair**: as described above.

### MC-2: ANY-BIJECTION-IS-ISOMORPHISM
- **Surface form**: as described above.
- **Root cause (Secondary)**: as described above.
- **Repair**: as described above.

### MC-3: ISOMORPHISM-PRESERVES-LABELS
- **Surface form**: as described above.
- **Root cause (Secondary)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Isomorphic groups are like two orchestras playing the same symphony on different
  instruments — one on strings, one on brass; the NOTES (the structure) match exactly, even
  though the instruments (the elements) are completely different."**
- **Anti-analogy**: two groups of the same SIZE are NOT automatically the "same orchestra" — a
  4-piece string quartet and a 4-piece brass ensemble can play entirely different pieces, just as
  $\mathbb Z/4\mathbb Z$ and $V_4$ share a headcount but not a structure.

## Demonstrations
- **Demonstration 1 (targets MC-2, four representations)**: the isomorphism $\varphi:(\mathbb Z/4
  \mathbb Z,+)\to(\{1,i,-1,-i\},\times)$, $\varphi(n)=i^n$ — verbally ("every element maps to a
  distinct power of $i$, multiplying as addition mod 4 predicts"), symbolically ($\varphi(m+n)=
  i^{m+n}=i^m\cdot i^n=\varphi(m)\cdot\varphi(n)$), via a table (elements $\{0,1,2,3\}\leftrightarrow
  \{1,i,-1,-i\}$), and structurally (both groups cyclic of order 4, generator $1\leftrightarrow$
  generator $i$) — confirming all three conditions (I1, I2, I3) hold.
- **Demonstration 2 (targets MC-1, the canonical non-isomorphism)**: $\mathbb Z/4\mathbb Z$'s
  element orders $\{1,4,2,4\}$ against $V_4$'s element orders $\{1,2,2,2\}$ — $\mathbb Z/4
  \mathbb Z$ has elements of order 4; $V_4$ has NONE; since isomorphisms preserve element orders,
  if $\mathbb Z/4\mathbb Z\cong V_4$, $V_4$ would need an element of order 4, a direct
  contradiction, confirming $\mathbb Z/4\mathbb Z\not\cong V_4$.
- **Demonstration 3 (targets MC-2, contrast pair)**: $\psi:(\mathbb Z/4\mathbb Z,+)\to(\{1,i,-1,
  -i\},\times)$ defined by $\psi(0)=1,\psi(1)=-1,\psi(2)=i,\psi(3)=-i$ — a genuine BIJECTION, but
  $\psi(1+1)=\psi(2)=i$ while $\psi(1)\cdot\psi(1)=(-1)(-1)=1$, and $i\ne1$: $\psi$ is NOT a
  homomorphism, so NOT an isomorphism, directly contrasted against the correct $\varphi$ from
  Demonstration 1, which DOES satisfy $\varphi(1+1)=\varphi(2)=-1=\varphi(1)\cdot\varphi(1)=i\cdot
  i=-1$.

## Discovery Questions
1. "Are $\mathbb Z/4\mathbb Z$ and $V_4$ isomorphic? Both have order 4 — is that enough to
   conclude yes?"
2. "If a map between two groups is a bijection, is it automatically an isomorphism?"
3. "If $G\cong H$, do $G$ and $H$ have to share the same elements or operation symbol?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-homomorphism`'s own homomorphism condition, framing
   isomorphism as that SAME condition plus the additional requirement of bijectivity.
2. **Conflict evidence**: Demonstration 3's bijection-that-fails-the-homomorphism-condition,
   directly challenging MC-2 by showing bijection alone is insufficient.
3. **Contrast pair**: $\mathbb Z/4\mathbb Z$'s element-order multiset $\{1,4,2,4\}$ against $V_4$'s
   $\{1,2,2,2\}$ (Demonstration 2), isolating MC-1 directly; the failing bijection $\psi$ against
   the correct isomorphism $\varphi$ (Demonstration 3), isolating MC-2.
4. **Mastery gate**: require a correct structural-invariant argument proving two same-order groups
   are NOT isomorphic, a correct four-condition verification (bijection + homomorphism) of a
   genuine isomorphism, and a correct explanation of why isomorphic groups need not share elements
   or notation, at the Blueprint's own stated PASS_CRITERION of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "same order, so isomorphic" as a complete argument — require a structural invariant
  (most commonly element orders) to be checked explicitly.
- Never accept a bijection alone as proof of isomorphism — require the homomorphism condition
  $\varphi(ab)=\varphi(a)\varphi(b)$ to be verified separately.

## Voice Teaching Notes
- Say "same SIZE, but is the STRUCTURE the same — did you check element orders?" whenever MC-1 is
  suspected.
- When a bijection is proposed as an isomorphism, ask "does it respect the group operation, or
  only the element count?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly defines group isomorphism as bijective homomorphism,
  naming both required conditions.
- **Rung 2 (application)**: learner correctly uses a structural invariant (element orders) to prove
  two specific same-order groups are NOT isomorphic.
- **Rung 3 (transfer)**: learner correctly constructs and fully verifies (homomorphism, injective,
  surjective) an isomorphism between a NEW pair of groups not previously seen (e.g. $\mathbb Z/5
  \mathbb Z$ and the 5th roots of unity).

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the specific pair's element-order multisets directly.
- If MC-2 recurs, re-attempt the specific proposed bijection's homomorphism check directly.
- If MC-3 recurs, re-examine the specific isomorphism's two groups directly, confirming they are
  genuinely different objects sharing only structure.

## Memory Hooks
- "Same size is necessary, never sufficient — check a structural invariant."
- "Isomorphism = bijection AND homomorphism, both required, neither implies the other."
- "Isomorphic groups share a structure, not a set of elements."

## Transfer Connections
- `math.abst.group-homomorphism` (already authored, this campaign, Batch 88): supplies the
  homomorphism condition $\varphi(ab)=\varphi(a)\varphi(b)$, kernel, and image this concept's
  definition and Q4 identity-preservation proof directly reuse.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-isomorphism.md`, reused by
  reference for its four-representation worked example ($\mathbb Z/4\mathbb Z\cong\{1,i,-1,-i\}$),
  its structural-invariant element-order table, its bijection-versus-isomorphism contrast pair, and
  its three-misconception registry (severity levels adopted directly as declared, since this
  Blueprint's format states Severity rather than a formal birth-Type label — independently
  classified here as MC-1 Type 1 overgeneralization, MC-2 Type 5 instruction-induced, MC-3 Type 6
  analogy overextension, for consistency with this campaign's own birth-taxonomy convention).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, constructing and
  fully verifying the isomorphism $\varphi:\mathbb Z/5\mathbb Z\to\{5\text{th roots of unity}\}$,
  $\varphi(k)=e^{2\pi ik/5}$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.
  group-homomorphism`, unlocks none, cross_links none, advanced/analyze, mastery_threshold 0.85,
  estimated_hours 4) was directly verified against the live KG and matches exactly. The
  Blueprint's own correctly-declared independence P76 mode (cross_links empty in KG) required no
  correction.

## Version History
- 2026-09-14 (Batch 89): authored. Fourth entry this batch. Companion batch concepts: `math.linalg.
  vector-space`, `math.abst.first-isomorphism-theorem`, `math.abst.finite-field`. Three math.abst
  concepts authored this batch (`first-isomorphism-theorem`, `finite-field`, `group-isomorphism`)
  plus one math.linalg concept (`vector-space`), so `math.abst` moves 19/37 → **22/37** this batch.

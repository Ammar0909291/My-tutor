# math.abst.first-isomorphism-theorem

## Identity
- **KG id**: `math.abst.first-isomorphism-theorem`
- **Domain**: math.abst
- **Requires**: `math.abst.quotient-group`, `math.abst.group-homomorphism`
- **Unlocks**: `math.abst.second-isomorphism-theorem`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
State the First Isomorphism Theorem $G/\ker(\varphi)\cong\operatorname{im}(\varphi)$, recognizing
it CONNECTS three objects already separately studied — the kernel and image from `math.abst.
group-homomorphism`, and the quotient-group construction from `math.abst.quotient-group` — into
one genuinely NEW fact: the induced map is not merely a restatement of prior definitions, but an
actual ISOMORPHISM whose well-definedness relies SPECIFICALLY on quotienting by the kernel; verify
this well-definedness directly for a small example by checking that different coset
representatives give consistent results; and recognize the theorem holds in the analogous RING
form with no separate proof strategy required.

## Core Understanding
The FIRST ISOMORPHISM THEOREM states: for any group homomorphism $\varphi:G\to H$,
$$G/\ker(\varphi)\cong\operatorname{im}(\varphi).$$
This connects THREE objects already separately built: $\ker(\varphi)$ and $\operatorname{im}
(\varphi)$ (reusing `math.abst.group-homomorphism`'s own definitions directly), and the QUOTIENT
GROUP $G/N$ construction (reusing `math.abst.quotient-group`'s own coset-multiplication
construction directly, with $N=\ker(\varphi)$). The theorem's genuinely NEW content is not merely
restating these prior definitions — it is the claim that the INDUCED MAP $\bar\varphi:G/\ker
(\varphi)\to\operatorname{im}(\varphi)$, defined by $\bar\varphi(g\ker(\varphi))=\varphi(g)$, is a
genuine ISOMORPHISM: well-defined, a homomorphism, injective, and surjective, all at once.

WELL-DEFINEDNESS is the theorem's central technical crux, and it depends SPECIFICALLY on
quotienting by the KERNEL, not by an arbitrary normal subgroup: if $g_1\ker(\varphi)=g_2\ker
(\varphi)$ (the SAME coset, reached via two different representatives), then $\bar\varphi$ must
give the SAME answer regardless of which representative is used — $\varphi(g_1)=\varphi(g_2)$.
This holds because $g_1\ker(\varphi)=g_2\ker(\varphi)$ means $g_1^{-1}g_2\in\ker(\varphi)$, so
$\varphi(g_1^{-1}g_2)=e_H$, which forces $\varphi(g_1)=\varphi(g_2)$ directly — a consequence that
would NOT follow for a normal subgroup other than the kernel itself.

Once well-definedness is established, $\bar\varphi$ is automatically a HOMOMORPHISM (inherited
directly from $\varphi$'s own homomorphism property via `math.abst.group-homomorphism`), and
INJECTIVE (if $\bar\varphi(g_1\ker(\varphi))=\bar\varphi(g_2\ker(\varphi))$ then $\varphi(g_1)=
\varphi(g_2)$, which forces $g_1\ker(\varphi)=g_2\ker(\varphi)$ — the SAME coset, so distinct
cosets never collide), and SURJECTIVE onto $\operatorname{im}(\varphi)$ by construction (every
element of $\operatorname{im}(\varphi)$ is $\varphi(g)$ for some $g\in G$, which is exactly
$\bar\varphi(g\ker(\varphi))$). All four properties together confirm $G/\ker(\varphi)\cong
\operatorname{im}(\varphi)$.

The theorem holds in an EXACTLY ANALOGOUS RING form with NO separate proof strategy needed: for a
ring homomorphism $\varphi:R\to S$, $R/\ker(\varphi)\cong\operatorname{im}(\varphi)$, where
$\ker(\varphi)$ is now recognized as an IDEAL (reusing `math.abst.ring-homomorphism`'s own
kernel-is-a-two-sided-ideal fact directly), not merely a normal subgroup — the identical
well-definedness argument applies unchanged.

## Mental Models
- **"The theorem connects three things you already know — kernel, image, quotient — into one
  genuinely new fact: the induced map between them is an isomorphism."**
- **"Well-definedness works SPECIFICALLY because you quotiented by the kernel — that's not a
  coincidence, it's the whole reason the theorem is true."**
- **"Same theorem, same proof strategy, groups or rings — only the vocabulary (kernel-as-normal-
  subgroup vs. kernel-as-ideal) changes."**

## Why Students Fail

### MC-1: THEOREM-ASSUMED-MERE-RESTATEMENT
- **Surface form**: believes the theorem just restates the definitions of kernel and image, missing
  that its genuine new content is the claim that the induced map $\bar\varphi$ is an isomorphism.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity — the
  theorem's STATEMENT visually resembles a definitional recap, since it names objects already
  individually familiar, obscuring that the ISOMORPHISM CLAIM connecting them is the actual new
  content).
- **Repair**: re-walk the specific example's induced-map construction directly, verifying all four
  properties (well-defined, homomorphism, injective, surjective) explicitly rather than treating
  the statement as already-known.

### MC-2: WELL-DEFINEDNESS-ASSUMED-INDEPENDENT-OF-KERNEL-CHOICE
- **Surface form**: believes the induced map would be well-defined for ANY normal subgroup used in
  the quotient, not specifically the kernel.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — `math.abst.
  quotient-group`'s own general construction works for ANY normal subgroup, and that broader fact
  is carried forward unmodified into this concept, where well-definedness of the SPECIFIC induced
  map genuinely does require quotienting by the kernel in particular).
- **Repair**: re-attempt the specific well-definedness argument directly for the kernel case,
  tracing exactly where $g_1^{-1}g_2\in\ker(\varphi)$ is used to force $\varphi(g_1)=\varphi(g_2)$.

### MC-3: RING-VERSION-ASSUMED-SEPARATE-THEOREM
- **Surface form**: believes the ring version of the First Isomorphism Theorem needs an entirely
  different proof strategy, missing that the identical argument transfers directly once the kernel
  is recognized as an ideal.
- **Birth type**: Type 6, analogy overextension (Blueprint's own declared Moderate severity — the
  surface-level differences between groups and rings, ordinarily emphasized when the two theories
  are contrasted, are over-applied here to assume EVERY theorem must be separately re-proved,
  missing that this specific proof transfers unchanged).
- **Repair**: re-trace the specific ring-version example directly, confirming the identical
  well-definedness/homomorphism/injective/surjective argument structure applies with $\ker
  (\varphi)$ now read as an ideal.

## Misconceptions

### MC-1: THEOREM-ASSUMED-MERE-RESTATEMENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: WELL-DEFINEDNESS-ASSUMED-INDEPENDENT-OF-KERNEL-CHOICE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: RING-VERSION-ASSUMED-SEPARATE-THEOREM
- **Surface form**: as described above.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The First Isomorphism Theorem is like discovering that a photocopier's 'input groups' and
  'output groups' are secretly the same object, once you account for exactly what the machine
  discards (the kernel) — the discarded part isn't incidental, it's precisely what makes the
  correspondence work."**
- **Anti-analogy**: the theorem is NOT "kernel plus image, restated together" — it is the claim
  that a SPECIFIC constructed map between them is a genuine isomorphism, a claim requiring its own
  four-part verification.

## Demonstrations
- **Demonstration 1 (targets MC-1, trivial warm-up)**: $\varphi:\mathbb Z\to\mathbb Z/6\mathbb Z$,
  $\varphi(n)=n\bmod6$ — $\ker(\varphi)=6\mathbb Z$, $\operatorname{im}(\varphi)=\mathbb Z/6
  \mathbb Z$, so the theorem gives $\mathbb Z/6\mathbb Z\cong\mathbb Z/6\mathbb Z$ trivially,
  confirming the STATEMENT'S shape before the nontrivial case.
- **Demonstration 2 (targets MC-2, well-definedness verified via two representatives)**: $\varphi:
  S_3\to\{1,-1\}$ (the sign homomorphism), $\ker(\varphi)=A_3=\{e,(123),(132)\}$. Checking the
  coset $eA_3$ via TWO different representatives — $e$ gives $\varphi(e)=1$; $(123)$ (also in
  $eA_3$, since $(123)\in A_3$) gives $\varphi((123))=1$ — consistent. Checking the coset
  $(12)A_3$ via two representatives — $(12)$ gives $\varphi((12))=-1$; $(132)(12)=(13)$ (also in
  $(12)A_3$) gives $\varphi((13))=-1$ — consistent. Both checks confirm $\bar\varphi$ gives the
  SAME answer regardless of representative choice, SPECIFICALLY because $A_3=\ker(\varphi)$.
- **Demonstration 3 (targets MC-3, ring-version parallel)**: $\varphi:\mathbb Z\to\mathbb Z/n
  \mathbb Z$ viewed as a RING homomorphism (not merely a group homomorphism), $\ker(\varphi)=n
  \mathbb Z$ now recognized as an IDEAL (reusing `math.abst.ring-homomorphism`'s own
  kernel-is-ideal fact directly) rather than merely a normal subgroup — the SAME theorem,
  $\mathbb Z/n\mathbb Z\cong\mathbb Z/n\mathbb Z$, with the identical proof structure applying
  unchanged.

## Discovery Questions
1. "Does this theorem just restate what kernel and image already mean, or is it claiming something
   genuinely new about them?"
2. "Would the induced map still be well-defined if the quotient were taken by SOME OTHER normal
   subgroup, not specifically the kernel?"
3. "Does the ring version of this theorem need an entirely different proof, or does the same
   argument transfer?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-homomorphism`'s own kernel/image definitions and
   `math.abst.quotient-group`'s own $G/N$ construction, framing the theorem as the claim linking
   these three already-familiar objects via a genuine isomorphism.
2. **Conflict evidence**: Demonstration 2's two-representative well-definedness check, directly
   challenging MC-1 by showing there IS a nontrivial verification required, not merely a
   restatement.
3. **Contrast pair**: the kernel-specific well-definedness argument (Demonstration 2) against
   `math.abst.quotient-group`'s own general any-normal-subgroup construction, isolating MC-2
   directly; the trivial warm-up (Demonstration 1) against the ring-version parallel
   (Demonstration 3), isolating MC-3 by showing the SAME structure recurring.
4. **Mastery gate**: require a correct four-part verification (well-defined, homomorphism,
   injective, surjective) of the induced map for a specific example, and a correct explanation of
   why the ring version needs no separate proof strategy, at the Blueprint's own stated MAMR of
   4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept "the theorem just says kernel and image are related" as a complete answer — require
  the specific claim that $G/\ker(\varphi)$ and $\operatorname{im}(\varphi)$ are ISOMORPHIC, with
  the induced map explicitly named.
- Never accept a well-definedness claim that doesn't reference the KERNEL specifically — require
  the learner to trace why $g_1^{-1}g_2\in\ker(\varphi)$ is the step that makes it work.

## Voice Teaching Notes
- Say "what NEW thing does this theorem tell you, beyond what kernel and image already mean?"
  whenever MC-1 is suspected.
- When well-definedness is claimed, ask "would that argument work for ANY normal subgroup, or does
  it specifically need the kernel?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the theorem $G/\ker(\varphi)\cong
  \operatorname{im}(\varphi)$ and identifies which prior concepts (kernel, image, quotient group)
  it connects.
- **Rung 2 (application)**: learner correctly verifies well-definedness for a specific example
  using two different coset representatives, confirming consistent results.
- **Rung 3 (transfer)**: learner correctly applies the theorem to a NEW homomorphism (e.g.
  $\det:GL_2(\mathbb R)\to\mathbb R^\times$) and correctly identifies what changes (and what
  doesn't) if the same homomorphism is instead viewed as a ring homomorphism.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the specific example's four-part induced-map verification directly.
- If MC-2 recurs, re-attempt the specific well-definedness argument for the kernel case, tracing
  exactly where the kernel membership is used.
- If MC-3 recurs, re-trace the specific ring-version example directly, confirming the identical
  argument structure transfers.

## Memory Hooks
- "$G/\ker(\varphi)\cong\operatorname{im}(\varphi)$ — three familiar objects, one genuinely new
  isomorphism claim."
- "Well-defined because it's the KERNEL — that's not incidental, it's the whole proof."
- "Same theorem, groups or rings — only the vocabulary changes."

## Transfer Connections
- `math.abst.group-homomorphism` (already authored, this campaign, Batch 88): supplies the kernel
  and image definitions, and the automatic-consequence facts, this concept directly reuses.
- `math.abst.quotient-group` (already authored, this campaign, Batch 88): supplies the $G/N$
  coset-multiplication construction this concept's induced map is built on top of directly.
- `math.abst.ring-homomorphism` (already authored, this campaign, Batch 88): supplies the
  kernel-is-a-two-sided-ideal fact this concept's ring-version parallel directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.first-isomorphism-theorem.md`, reused
  by reference for its trivial-warm-up/well-definedness-verification/ring-version-parallel worked
  examples, and its three-misconception registry (birth types independently classified, since this
  Blueprint states only Severity, not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, using $\det:
  GL_2(\mathbb R)\to\mathbb R^\times$ with $\ker(\det)=SL_2(\mathbb R)$, giving $GL_2(\mathbb R)/
  SL_2(\mathbb R)\cong\mathbb R^\times$, plus its follow-up asking what changes under the ring-
  homomorphism view.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.
  quotient-group`+`math.abst.group-homomorphism`, unlocks `math.abst.second-isomorphism-theorem`,
  cross_links none, advanced/understand, mastery_threshold 0.8, estimated_hours 4) was directly
  verified against the live KG and matches exactly. The Blueprint's own correctly-declared
  independence P76 mode (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 89): authored. Second entry this batch. Companion batch concepts: `math.linalg.
  vector-space`, `math.abst.finite-field`, `math.abst.group-isomorphism`. Three math.abst concepts
  authored this batch (this one, `finite-field`, `group-isomorphism`) plus one math.linalg concept
  (`vector-space`), so `math.abst` moves 19/37 → **22/37** this batch.

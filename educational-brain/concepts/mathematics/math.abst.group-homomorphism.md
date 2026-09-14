# math.abst.group-homomorphism

## Identity
- **KG id**: `math.abst.group-homomorphism`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: `math.abst.group-isomorphism`, `math.abst.first-isomorphism-theorem`
- **Cross-links**: `math.linalg.linear-map`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define a GROUP HOMOMORPHISM $\varphi:G\to H$ as a map satisfying $\varphi(ab)=\varphi(a)\varphi(b)$
for all $a,b\in G$, and verify this directly for a given map; define the KERNEL $\ker(\varphi)=
\{g\in G:\varphi(g)=e_H\}$ and IMAGE $\mathrm{im}(\varphi)=\{\varphi(g):g\in G\}$, compute both for
a specific homomorphism, and state that $\ker(\varphi)$ is always a NORMAL subgroup of $G$
(reusing `math.abst.normal-subgroup`'s own terminology directly) while $\mathrm{im}(\varphi)$ is
always a subgroup of $H$; and correctly verify that $\varphi(e_G)=e_H$ and $\varphi(g^{-1})=
\varphi(g)^{-1}$ are AUTOMATIC CONSEQUENCES of the single defining property, using the kernel to
determine injectivity (trivial kernel $\{e_G\}$ $\iff$ injective).

## Core Understanding
A GROUP HOMOMORPHISM $\varphi:G\to H$ (reusing `math.abst.group-theory`'s own group structure on
both sides directly) is a map satisfying $\varphi(ab)=\varphi(a)\varphi(b)$ for all $a,b\in G$ —
the product on the left computed in $G$, on the right in $H$. A homomorphism "preserves the group
operation," translating computation in $G$ into the corresponding computation in $H$.

Two properties are AUTOMATIC CONSEQUENCES of this single defining property, NOT separate axioms
requiring independent verification: $\varphi(e_G)=e_H$ (since $\varphi(e_G)=\varphi(e_Ge_G)=
\varphi(e_G)\varphi(e_G)$, canceling gives $e_H=\varphi(e_G)$); and $\varphi(g^{-1})=\varphi(g)^{-1}$
(since $\varphi(g)\varphi(g^{-1})=\varphi(gg^{-1})=\varphi(e_G)=e_H$, so $\varphi(g^{-1})$ IS
$\varphi(g)$'s inverse, by uniqueness of inverses).

The KERNEL $\ker(\varphi)=\{g\in G:\varphi(g)=e_H\}$ is ALWAYS a NORMAL subgroup of $G$; the IMAGE
$\mathrm{im}(\varphi)=\{\varphi(g):g\in G\}\subseteq H$ is ALWAYS a subgroup of $H$. The kernel
DETERMINES injectivity: $\varphi$ is injective $\iff$ $\ker(\varphi)=\{e_G\}$ (the TRIVIAL kernel).
Since $\varphi(e_G)=e_H$ always holds, $e_G$ is ALWAYS in the kernel — but whether ANYTHING ELSE
is also in the kernel is a genuinely SEPARATE question requiring direct computation, never assumed
from the automatic-consequence fact alone.

## Mental Models
- **"A homomorphism translates operations correctly — do it in $G$ then map, or map then do it in
  $H$; either order agrees."**
- **"$\varphi(e_G)=e_H$ and $\varphi(g^{-1})=\varphi(g)^{-1}$ come FREE from the one defining
  property — never re-prove them separately."**
- **"$e_G$ is always in the kernel — but whether it's the ONLY element there is a genuine,
  separate question you must compute directly."**

## Why Students Fail

### MC-1: KERNEL-ASSUMED-TRIVIAL-WITHOUT-CHECKING
- **Surface form**: believes the kernel automatically contains only the identity element, without
  directly computing which elements genuinely map to $e_H$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to the ALWAYS-true fact $\varphi(e_G)=e_H$ being over-extended into "so the kernel is
  JUST $\{e_G\}$" — the guaranteed presence of $e_G$ in the kernel is silently upgraded into a
  guarantee of EXCLUSIVE presence, without the separate computation that would reveal otherwise).
- **Repair**: re-compute the specific homomorphism's kernel directly (find ALL elements mapping to
  $e_H$, not just confirm $e_G$'s membership) for the case in question.

### MC-2: AUTOMATIC-CONSEQUENCES-TREATED-AS-SEPARATE-AXIOMS
- **Surface form**: believes $\varphi(e_G)=e_H$ and $\varphi(g^{-1})=\varphi(g)^{-1}$ are separate
  conditions that must be independently verified for each homomorphism, rather than automatic
  consequences of the single defining property.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity, here
  attributed to each property being introduced and practiced as its own separate numerical check
  in worked examples, without the general algebraic derivation from Component 3 being emphasized
  as making each new re-verification unnecessary).
- **Repair**: re-derive the general algebraic argument (from the single defining property alone)
  for the specific consequence in question, confirming it holds for ANY homomorphism without
  needing separate proof each time.

### MC-3: HOMOMORPHISM-ASSUMED-BIJECTIVE-BY-DEFAULT
- **Surface form**: believes every homomorphism is automatically bijective (both injective and
  surjective), rather than recognizing a homomorphism can be neither, either, or both.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Moderate severity, here
  attributed to the word "map" in everyday usage often implicitly suggesting a one-to-one
  correspondence, or to isomorphisms — genuinely bijective homomorphisms — being encountered as a
  salient first example, with the bijectivity property silently generalized to the broader
  homomorphism category it is not automatically true for).
- **Repair**: re-verify the specific homomorphism's kernel and image directly, confirming
  injectivity/surjectivity are genuinely separate, checkable properties rather than automatic.

## Misconceptions

### MC-1: KERNEL-ASSUMED-TRIVIAL-WITHOUT-CHECKING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: AUTOMATIC-CONSEQUENCES-TREATED-AS-SEPARATE-AXIOMS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: HOMOMORPHISM-ASSUMED-BIJECTIVE-BY-DEFAULT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A homomorphism is like a currency-conversion function that respects addition — converting
  then adding gives the same total as adding then converting — but that doesn't mean the
  conversion is reversible (injective) or covers every possible target amount (surjective)."**
- **Anti-analogy**: $\varphi(e_G)=e_H$ being ALWAYS true is NOT the same claim as "only $e_G$ maps
  to $e_H$" — the kernel's exact size is a separate question every single time.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: for $\varphi:(\mathbb Z,+)\to(\mathbb Z/6\mathbb Z,+)$,
  $\varphi(n)=n\bmod6$: verify $\varphi(8+5)=\varphi(13)=1$ matches $\varphi(8)+\varphi(5)=2+5=7
  \equiv1\pmod6$ — confirmed directly from the single defining property, no separate proof needed
  for $\varphi(0)=0$ or $\varphi(-4)=-\varphi(4)$.
- **Demonstration 2 (targets MC-1, MC-3)**: for the SAME $\varphi$: $\ker(\varphi)=6\mathbb Z=
  \{\ldots,-6,0,6,\ldots\}$ — genuinely NOT just $\{0\}$, since $\varphi(6)=0=\varphi(0)$ with
  $6\ne0$ — confirming $\varphi$ is NOT injective, directly refuting an assumed-trivial-kernel or
  assumed-bijective claim; $\mathrm{im}(\varphi)=\mathbb Z/6\mathbb Z$ (the entire target) — so
  $\varphi$ IS surjective despite NOT being injective.
- **Demonstration 3 (targets MC-2)**: verify $\varphi(g^{-1})=\varphi(g)^{-1}$ for $g=4$ (so
  $g^{-1}=-4$): $\varphi(-4)=2$ (since $-4=6(-1)+2$), matching the additive inverse of $\varphi(4)=
  4$ in $\mathbb Z/6\mathbb Z$, which is $-4\bmod6=2$ — confirmed without any separate proof effort
  beyond the basic homomorphism property.

## Discovery Questions
1. "Since $\varphi(e_G)=e_H$ always, is $\{e_G\}$ therefore the WHOLE kernel?"
2. "Does $\varphi(g^{-1})=\varphi(g)^{-1}$ need to be verified separately for every homomorphism,
   or does it follow automatically?"
3. "Is every homomorphism automatically bijective?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own group axioms, framing the homomorphism
   property as the single condition that automatically forces identity- and inverse-preservation.
2. **Conflict evidence**: the $\varphi(n)=n\bmod6$ demonstration, breaking MC-1 and MC-3 directly
   by showing a genuinely non-trivial kernel and a non-injective-yet-surjective example.
3. **Contrast pair**: the always-true "$e_G$ is in the kernel" fact against the separate,
   genuinely-checkable "is the kernel ONLY $e_G$" question, isolating MC-1.
4. **Mastery gate**: require a correct direct verification of the homomorphism property, a
   correct kernel computation used to determine injectivity, and a correct explanation of why
   identity- and inverse-preservation need no separate proof, at the Blueprint's own stated MAMR
   of 5/5.

## Tutor Actions
- Never accept a kernel claimed to be trivial without requiring the FULL set of elements mapping
  to $e_H$ to be computed directly.
- Never accept a separate re-derivation of $\varphi(e_G)=e_H$ or $\varphi(g^{-1})=\varphi(g)^{-1}$
  for each new homomorphism — require the learner to cite it as automatic.

## Voice Teaching Notes
- Say "have you found EVERY element mapping to $e_H$, or just confirmed $e_G$ is one of them?"
  whenever the kernel is assumed trivial.
- When identity- or inverse-preservation is being re-derived from scratch, ask "does this actually
  need separate proof, or does it follow automatically from the one property?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies the homomorphism property for a specific
  map.
- **Rung 2 (application)**: learner correctly computes a specific homomorphism's kernel and image,
  using the kernel to determine injectivity.
- **Rung 3 (transfer)**: learner correctly recognizes a linear map's additivity as exactly the
  group homomorphism property applied to the underlying additive groups, and correctly identifies
  homogeneity as the additional structure a linear map carries beyond bare group homomorphism.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute the specific homomorphism's kernel directly for the case in question.
- If MC-2 recurs, re-derive the general algebraic argument for the specific consequence in
  question.
- If MC-3 recurs, re-verify the specific homomorphism's kernel and image directly.

## Memory Hooks
- "$e_G$ is ALWAYS in the kernel — whether anything else is there is a separate question."
- "Identity- and inverse-preservation come free — never re-prove them."
- "Homomorphism only preserves the operation — bijectivity is a separate, additional property."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign): supplies the group axioms this
  concept's structure-preserving maps operate between.
- `math.abst.normal-subgroup` (already authored, this campaign): supplies the normal-subgroup
  terminology this concept's kernel property directly cites.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.group-homomorphism.md`, reused by
  reference for its representation-shift homomorphism-property-and-automatic-consequences
  demonstration, its contrast-pair kernel-determines-injectivity treatment, its four-problem
  mastery-gate set, and its three-misconception registry (birth types independently classified,
  since this Blueprint states Description/Severity but not a formal Type label).
- Transfer probe: the Blueprint declares P76_mode = cross-link probe against `math.linalg.
  linear-map`, citing the Blueprint FILE as confirmed present via directory listing. Verified via
  `ls` that the Educational Brain ENTRY for that concept is UNAUTHORED — the same Blueprint-file-
  existence-mistaken-for-EB-entry-existence pattern this campaign has repeatedly corrected. This
  entry uses INDEPENDENCE mode instead, restating the additivity-is-a-group-homomorphism-property
  argument self-contained (Component 4's own transfer-probe text: a linear map's additivity
  $T(u+v)=T(u)+T(v)$ is exactly the group homomorphism property applied to $(V,+)$ and $(W,+)$,
  while homogeneity $T(cv)=cT(v)$ is the genuinely additional structure not required of a bare
  group homomorphism) rather than assuming a retrievable peer entry.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero KG metadata discrepancy on requires/unlocks/cross_links/difficulty/bloom/
  mastery_threshold/estimated_hours**: all directly verified against the live KG and match the
  Blueprint exactly, including the `math.linalg.linear-map` cross-link itself (correctly present
  in the KG field).
- **Genuine Blueprint-staleness finding, corrected**: as detailed in Blueprint References above —
  the Blueprint's own P76_mode declaration rests on Blueprint-file existence, not Educational
  Brain-entry existence; corrected to independence mode.

## Version History
- 2026-09-14 (Batch 88): authored. Third entry this batch. Companion batch concepts: `math.abst.
  field`, `math.abst.quotient-group`, `math.abst.ring-homomorphism`. `math.abst` moves from 15/37
  toward **19/37** this batch.

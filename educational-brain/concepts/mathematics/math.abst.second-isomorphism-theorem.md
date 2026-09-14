# math.abst.second-isomorphism-theorem

## Identity
- **KG id**: `math.abst.second-isomorphism-theorem`
- **Domain**: math.abst
- **Requires**: `math.abst.first-isomorphism-theorem`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
State the Second Isomorphism Theorem (also the "Diamond Isomorphism Theorem"): for a group $G$,
subgroup $H\le G$, and normal subgroup $N\trianglelefteq G$, $HN$ is a subgroup of $G$, $H\cap N$
is normal in $H$, and $H/(H\cap N)\cong HN/N$ via the natural map $h(H\cap N)\mapsto hN$; recognize
this theorem as a CONSEQUENCE of `math.abst.first-isomorphism-theorem`, applied to the restriction
map $\varphi|_H:H\to HN/N$; and verify WHY $N$ must be normal in $G$ (not merely a subgroup) for
the theorem's conclusions to hold.

## Core Understanding
THE SECOND ISOMORPHISM THEOREM (SIT): let $G$ be a group, $H\le G$ a subgroup, and $N
\trianglelefteq G$ a normal subgroup. Then: (S1) $HN=\{hn:h\in H,n\in N\}$ is a subgroup of $G$;
(S2) $H\cap N$ is a normal subgroup of $H$; (S3) $H/(H\cap N)\cong HN/N$ via the natural map
$h(H\cap N)\mapsto hN$. The theorem is also called the DIAMOND ISOMORPHISM THEOREM — the four
groups $H$, $N$, $HN$, $H\cap N$ form a diamond-shaped lattice, with $HN$ at the top and $H\cap N$
at the bottom; the isomorphism identifies the LEFT-side quotient $H/(H\cap N)$ with the RIGHT-side
(ambient) quotient $HN/N$.

WHY $N$ MUST BE NORMAL IN $G$ (not merely a subgroup): to verify $HN$ is closed under the group
operation, a product $h_1n_1h_2n_2$ must be rewritten as $h_1(n_1h_2)n_2$, which requires $n_1h_2
\in HN$ — specifically, $h_2^{-1}n_1h_2\in N$ for ALL $h_2\in H$, which holds EXACTLY when $N$ is
normal in $G$. Without normality, $HN$ may not even be a subgroup: in $S_3$, taking $H=\{e,(1\,2)\}$
and $N=\{e,(1\,3)\}$ (neither normal), $HN=\{e,(1\,2),(1\,3),(1\,3\,2)\}$ has 4 elements, which does
NOT divide $|S_3|=6$ — by Lagrange's theorem, $HN$ cannot be a subgroup.

THE SIT IS A CONSEQUENCE OF THE FIT: unlike `math.abst.first-isomorphism-theorem`, where an
explicit homomorphism $\varphi:G\to K$ is GIVEN, the SIT's map is NATURAL — no homomorphism is
handed to us. Defining $\varphi|_H:H\to HN/N$ by $\varphi|_H(h)=hN$: this IS a homomorphism (reuses
FIT's own machinery directly); its kernel is $\{h\in H:hN=N\}=\{h\in H:h\in N\}=H\cap N$; its image
is $HN/N$ (every coset $hnN=hN$ in $HN/N$ is hit). By the FIT: $H/\ker(\varphi|_H)\cong
\operatorname{im}(\varphi|_H)$, i.e. $H/(H\cap N)\cong HN/N$ — the SIT falls out directly.

## Mental Models
- **"Draw the diamond: $HN$ on top, $H$ and $N$ on the sides, $H\cap N$ on the bottom — the
  isomorphism connects the two bottom-adjacent quotients."**
- **"$N$ must be normal in $G$ for $HN$ to even be a subgroup — without it, closure genuinely
  fails."**
- **"The SIT isn't a separate proof — it's the FIT applied to the restriction map $h\mapsto hN$."**

## Why Students Fail

### MC-1: HN-NOT-A-SUBGROUP
- **Surface form**: claims $HN$ may not be a subgroup without additional conditions.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  forgets that $N\trianglelefteq G$, not just $N\le G$, is exactly the condition that makes $HN$ a
  subgroup, conflating the roles of a subgroup and a normal subgroup).
- **Repair**: re-attempt the specific $S_3$ counterexample directly, confirming $HN$ fails to be a
  subgroup when $N$ is not normal (via Lagrange's theorem).

### MC-2: WRONG-QUOTIENT-SIDES
- **Surface form**: writes $H/(H\cap N)\cong N/\text{something}$ or confuses which quotient is on
  which side.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Secondary severity — misreads
  the diamond lattice, not tracking which group is normal in which ambient group).
- **Repair**: re-draw the specific diamond diagram directly, labeling all four vertices before
  identifying the two quotients.

### MC-3: WELL-DEFINEDNESS-SKIPPED
- **Surface form**: applies the map $h(H\cap N)\mapsto hN$ without checking that different coset
  representatives give the same image.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Secondary severity —
  doesn't recall that quotient maps must be checked for well-definedness, assuming any formula is a
  valid map without verification).
- **Repair**: re-attempt the specific well-definedness check directly, confirming $h^{-1}h'\in
  H\cap N\Rightarrow hN=h'N$.

## Misconceptions

### MC-1: HN-NOT-A-SUBGROUP
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: WRONG-QUOTIENT-SIDES
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: WELL-DEFINEDNESS-SKIPPED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The diamond is like a road map with one destination reachable by two different routes — going
  up-left through $H$ and down-right through $N$, or up-right through $N$ and down-left through
  $H$ — the SIT says both routes end at isomorphic places."**
- **Anti-analogy**: the SIT is NOT a brand-new proof technique — it is the FIT, applied to one
  specific, cleverly-chosen restriction map.

## Demonstrations
- **Demonstration 1 (targets MC-2, the diamond)**: for $G=\mathbb Z$, $H=2\mathbb Z$, $N=3\mathbb
  Z$: $HN=2\mathbb Z+3\mathbb Z=\mathbb Z$ (since $\gcd(2,3)=1$, Bézout gives $1=3-2\in HN$);
  $H\cap N=6\mathbb Z$; the diamond has $\mathbb Z$ on top, $2\mathbb Z$ and $3\mathbb Z$ on the
  sides, $6\mathbb Z$ on the bottom; SIT gives $2\mathbb Z/6\mathbb Z\cong\mathbb Z/3\mathbb Z$
  (both order 3).
- **Demonstration 2 (targets MC-1)**: in $S_3$, $H=\{e,(1\,2)\}$, $N=\{e,(1\,3)\}$ (neither
  normal): $HN=\{e,(1\,2),(1\,3),(1\,3\,2)\}$, order 4, which does not divide $|S_3|=6$ — by
  Lagrange's theorem, $HN$ cannot even be a subgroup, confirming normality is essential.
- **Demonstration 3 (targets MC-3, the SIT-via-FIT derivation)**: defining $\varphi:2\mathbb Z\to
  \mathbb Z/3\mathbb Z$ by $\varphi(2k)=k\bmod3$; verifying it's a homomorphism
  ($\varphi(2k+2m)=\varphi(2k)+\varphi(2m)$); computing $\ker(\varphi)=\{2k:3\mid k\}=6\mathbb
  Z=H\cap N$ exactly; applying the FIT directly gives $2\mathbb Z/6\mathbb Z\cong\mathbb Z/3
  \mathbb Z$, matching the SIT conclusion.

## Discovery Questions
1. "Suppose $H\le G$ and $N\le G$ but $N$ is not normal in $G$. Is $HN$ necessarily a subgroup of
   $G$?"
2. "Which quotient sits on the left side of the diamond, and which on the right?"
3. "Does the map $h(H\cap N)\mapsto hN$ need to be checked for well-definedness, or does any such
   formula automatically define a valid map?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.first-isomorphism-theorem`'s own $G/\ker(\varphi)\cong
   \operatorname{im}(\varphi)$ statement, framing the SIT as its direct consequence applied to a
   specific restriction map.
2. **Conflict evidence**: Demonstration 2's $S_3$ counterexample, directly challenging MC-1 by
   showing $HN$ genuinely fails to be a subgroup without normality.
3. **Contrast pair**: the diamond's left-side quotient $H/(H\cap N)$ against its right-side quotient
   $HN/N$ (Demonstration 1), isolating MC-2 directly; the well-definedness check (Demonstration 3)
   against a naive unchecked application of the map, isolating MC-3.
4. **Mastery gate**: require a correct statement of all three SIT conclusions, a correct
   identification of $H\cap N$/$HN$/both quotients for a specific example, a correct explanation of
   why $N$ must be normal, and a correct derivation of the SIT from the FIT via the restriction map,
   at the Blueprint's own stated MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept "$HN$ is a subgroup" without confirming $N\trianglelefteq G$ explicitly — require the
  learner to state which subgroup is normal.
- Never accept the isomorphism $H/(H\cap N)\cong HN/N$ applied without deriving it from the FIT via
  the restriction map when asked to justify it.

## Voice Teaching Notes
- Say "is that second subgroup normal in $G$, or just a subgroup?" whenever an $HN$-is-a-subgroup
  claim is made without checking normality.
- When the SIT is stated, ask "can you derive this from the First Isomorphism Theorem directly?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states all three SIT conclusions (S1, S2, S3) with
  the correct hypotheses.
- **Rung 2 (application)**: learner correctly computes $H\cap N$, $HN$, and both quotient groups
  for a specific example, confirming the SIT's isomorphism.
- **Rung 3 (transfer)**: learner correctly derives the SIT from the FIT by defining the restriction
  map $\varphi|_H$, computing its kernel as $H\cap N$, and applying the FIT — and correctly applies
  the theorem to a NEW group not previously seen.

## Tutor Recovery Strategy
- If MC-1 recurs, re-attempt the specific $S_3$ counterexample directly.
- If MC-2 recurs, re-draw the specific diamond diagram directly, labeling all four vertices.
- If MC-3 recurs, re-attempt the specific well-definedness check directly.

## Memory Hooks
- "$N$ normal in $G$ is what makes $HN$ a subgroup — without it, closure genuinely fails."
- "Draw the diamond first — $HN$ on top, $H\cap N$ on bottom, quotients on matching sides."
- "SIT = FIT applied to $h\mapsto hN$ — not a separate proof from scratch."

## Transfer Connections
- `math.abst.first-isomorphism-theorem` (already authored, this campaign, Batch 89): supplies the
  $G/\ker(\varphi)\cong\operatorname{im}(\varphi)$ statement and well-definedness argument this
  concept's entire SIT-via-FIT derivation directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.second-isomorphism-theorem.md`, reused
  by reference for its diamond-lattice diagram, its $\mathbb Z/2\mathbb Z/3\mathbb Z$ worked
  example, its $S_3$ non-normal-subgroup counterexample, its SIT-via-FIT derivation, and its
  three-misconception registry (birth types independently classified, since this Blueprint states
  only Root Cause/Severity, not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying the SIT
  to $G=S_4$, $N=A_4$, $H=\{e,(1\,2)\}$, computing $H\cap N$, $|HN|$, and both quotient groups.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.
  first-isomorphism-theorem`, unlocks none, cross_links none, expert/analyze, mastery_threshold
  0.8, estimated_hours 4) was directly verified against the live KG and matches exactly. The
  Blueprint's own correctly-declared independence P76 mode (cross_links empty in KG) required no
  correction.

## Version History
- 2026-09-14 (Batch 90): authored. Third entry this batch. Companion batch concepts: `math.abst.
  cyclic-group`, `math.abst.symmetric-group`, `math.linalg.subspace`. Three math.abst concepts
  authored this batch (`cyclic-group`, `symmetric-group`, this one) plus one math.linalg concept
  (`subspace`), so `math.abst` moves 22/37 → **25/37** this batch.

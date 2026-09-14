# math.abst.coset

## Identity
- **KG id**: `math.abst.coset`
- **Domain**: math.abst
- **Requires**: `math.abst.subgroup`
- **Unlocks**: `math.abst.lagrange-theorem`, `math.abst.normal-subgroup`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute the LEFT COSET $aH=\{ah:h\in H\}$ of a subgroup $H\le G$ (reusing `math.abst.subgroup`'s
own subgroup criterion directly as the object cosets are built from) for a specific element $a\in
G$; state and apply the COSET EQUALITY CRITERION — $aH=bH$ iff $a^{-1}b\in H$ — to determine
whether two elements generate the same coset WITHOUT listing both out fully; and use the facts that
distinct cosets PARTITION $G$ and all have the SAME SIZE $|H|$ to compute the INDEX
$[G:H]=|G|/|H|$.

## Core Understanding
For a subgroup $H\le G$ and an element $a\in G$, the LEFT COSET of $H$ by $a$ is $aH=\{ah:h\in H\}$
— take every element of $H$, left-multiply by the fixed $a$, and collect the results. This directly
reuses `math.abst.subgroup`'s own already-verified $H$ as the raw material being shifted.

The COSET EQUALITY CRITERION gives a practical test: $aH=bH$ **iff** $a^{-1}b\in H$. This shortcut
avoids listing out both cosets entirely — compute $a^{-1}b$ (using the group's actual operation)
and check membership in $H$. Two DIFFERENT elements can genuinely generate the SAME coset; the
criterion, not the elements' apparent difference, is what decides equality.

Distinct cosets PARTITION $G$: every element $g\in G$ belongs to EXACTLY one left coset (since
$g\in gH$ always, because $g=ge$ and $e\in H$), and any two cosets are either IDENTICAL or entirely
DISJOINT — never partially overlapping. This divides $G$ into non-overlapping blocks that together
cover every element exactly once.

All cosets have the SAME SIZE $|H|$: the map $h\mapsto ah$ is a bijection from $H$ to $aH$
(invertible via $ah\mapsto a^{-1}(ah)=h$), so $|aH|=|H|$ for EVERY $a\in G$, regardless of which
element generates the coset.

The INDEX $[G:H]$ is the NUMBER of distinct left cosets. For a finite group, since the cosets
partition $G$ into equal-sized (size $|H|$) blocks, $[G:H]=\frac{|G|}{|H|}$ — this is exactly the
reasoning `math.abst.lagrange-theorem` will formalize into a full theorem: $|H|$ must divide $|G|$.
Continuing to compute cosets for every element of $G$ eventually just RE-PRODUCES already-found
cosets — once every element of $G$ is covered, there are no more genuinely distinct cosets to
discover, however many additional generating elements are tried.

## Mental Models
- **"A coset $aH$ shifts the whole subgroup $H$ over by $a$ — like sliding a fixed pattern."**
- **"$aH=bH$ exactly when $a^{-1}b\in H$ — a shortcut test, never requiring both cosets to be
  listed out."**
- **"Cosets partition $G$ into equal-sized blocks of size $|H|$ — the index counts the blocks, not
  the generating elements tried."**

## Why Students Fail

### MC-1: DIFFERENT-GENERATORS-ASSUMED-TO-GIVE-DIFFERENT-COSETS
- **Surface form**: believes two different elements of $G$ must generate different cosets, rather
  than checking the equality criterion $a^{-1}b\in H$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to the intuitive but false assumption that "different starting point" must mean
  "different destination set" — a pattern that holds for many everyday labeling schemes but fails
  for cosets, where the equivalence relation underlying coset membership can identify apparently
  unrelated elements). Without explicitly applying the equality criterion, the surface difference
  between two generating elements is mistaken for a guarantee of coset difference.
- **Repair**: re-apply the equality criterion explicitly to the specific pair of elements in
  question, confirming or refuting sameness directly rather than assuming from appearance.

### MC-2: ALL-GROUP-ELEMENTS-ASSUMED-TO-GENERATE-DISTINCT-COSETS
- **Surface form**: believes computing a coset for every single element of $G$ produces $|G|$
  genuinely distinct cosets, rather than recognizing many generators repeat already-found cosets,
  with only $[G:H]$ genuinely distinct ones existing.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  attributed to treating "one coset per element tried" as a counting procedure without tracking
  which cosets have already been produced — a natural first instinct when the partition property
  and MC-1's equality criterion haven't yet been internalized together). Since nothing explicitly
  flags a repeat as a repeat unless the criterion is actively applied, the total element count is
  mistaken for the total distinct-coset count.
- **Repair**: re-walk the full coset listing for the specific group/subgroup pair in question,
  explicitly checking each new candidate against ALL previously-found cosets via the equality
  criterion before counting it as genuinely new.

### MC-3: LEFT-COSET-COMPUTED-WITH-WRONG-MULTIPLICATION-SIDE
- **Surface form**: computes $Ha=\{ha:h\in H\}$ (a right coset) when a LEFT coset $aH=\{ah:h\in H\}$
  was requested, or vice versa, in a non-abelian group where the two can genuinely differ.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Moderate severity). The
  near-symmetric notation $aH$ versus $Ha$ differs only in which side the fixed element sits, and
  in an ABELIAN group both sides genuinely produce the identical set — so no evidence ever forces
  the side distinction to be tracked carefully until a non-abelian example is encountered.
- **Repair**: re-derive the correctly-sided coset for the specific element and subgroup in
  question, explicitly stating which side the fixed generator multiplies from before computing.

## Misconceptions

### MC-1: DIFFERENT-GENERATORS-ASSUMED-TO-GIVE-DIFFERENT-COSETS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ALL-GROUP-ELEMENTS-ASSUMED-TO-GENERATE-DISTINCT-COSETS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: LEFT-COSET-COMPUTED-WITH-WRONG-MULTIPLICATION-SIDE
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two different mailing addresses can route to the same postal delivery zone — the zone (coset)
  is what matters, not whether the two starting addresses (generators) looked different."**
- **Anti-analogy**: coset generation is NOT a one-to-one labeling scheme — many different elements
  can validly generate the identical coset, so the generating element's identity alone never
  determines the coset's identity.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: in $G=(\mathbb Z/6\mathbb Z,+)$, $H=\{0,3\}$: compute $1+H=
  \{1,4\}$ and $4+H=\{4,1\}=\{1,4\}$ — SAME coset from different generators, confirmed both by
  direct listing and by the equality criterion ($4-1=3\in H$).
- **Demonstration 2 (targets MC-2)**: for the same $G,H$: list ALL distinct cosets — $0+H=\{0,3\}$,
  $1+H=\{1,4\}$, $2+H=\{2,5\}$ — covering all $6$ elements in exactly $3$ blocks. Computing $3+H=
  \{3,0\}=\{0,3\}$ reproduces $0+H$ rather than adding a fourth distinct coset — the count
  stabilizes at $[G:H]=6/2=3$, not $6$.
- **Demonstration 3 (targets MC-3)**: in a non-abelian group like $D_3$, the left coset $rH$ and the
  right coset $Hr$ for a non-normal subgroup $H$ can genuinely differ as sets — worked concretely
  by direct left- and right-multiplication using $D_3$'s own composition rule.

## Discovery Questions
1. "Could two different elements of $G$ generate the exact same coset?"
2. "If you compute a coset for every element of $G$, do you always get $|G|$ genuinely distinct
   cosets?"
3. "Does $aH$ mean the same thing as $Ha$ in every group?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.subgroup`'s own already-verified $H\le G$, framing a coset as
   $H$ "shifted" by a fixed group element.
2. **Conflict evidence**: the $1+H=4+H$ same-coset-different-generators demonstration, breaking
   MC-1 directly.
3. **Contrast pair**: the full listing of all distinct cosets in $\mathbb Z/6\mathbb Z$ against the
   diminishing-returns pattern of continuing to compute cosets past the index, isolating MC-2; the
   left-coset formula against the right-coset formula, isolating MC-3.
4. **Mastery gate**: require a correct coset computation, a correct equality-criterion application,
   and a correct partition/index computation, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "these must be different cosets, the generators are different" without requiring the
  equality criterion $a^{-1}b\in H$ to be checked explicitly.
- When a full coset listing is requested, require each new candidate to be checked against
  previously-found cosets before being counted as distinct.

## Voice Teaching Notes
- Say "have you checked whether $a^{-1}b\in H$, or are you assuming from appearance?" whenever two
  elements are declared to generate different cosets without the criterion being applied.
- When a coset is computed, ask "which side is the fixed element multiplying from — left or
  right?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes specific left cosets for a given group and
  subgroup.
- **Rung 2 (application)**: learner correctly applies the equality criterion to determine whether
  two elements generate the same coset, without listing both out fully.
- **Rung 3 (transfer)**: learner correctly explains why a coset-based partitioning scheme (e.g. a
  scheduling system grouping by a reference equivalence) genuinely covers every element exactly
  once, and correctly computes the resulting index.

## Tutor Recovery Strategy
- If MC-1 recurs, re-apply the equality criterion explicitly for the specific pair in question.
- If MC-2 recurs, re-walk the full listing, explicitly checking each candidate against all
  previously-found cosets.
- If MC-3 recurs, re-derive the correctly-sided coset for the specific case in question.

## Memory Hooks
- "Same coset check: $a^{-1}b\in H$ — never judge by how different the generators look."
- "Once every element of $G$ is covered, you're done — the index counts blocks, not attempts."
- "$aH$ and $Ha$ can genuinely differ — always state which side."

## Transfer Connections
- `math.abst.subgroup` (already authored, this campaign): supplies the subgroup $H\le G$ this
  concept's cosets are defined relative to, and the already-mastered criterion for verifying $H$
  itself.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.coset.md`, reused by reference for its
  representation-shift coset-computation demonstration, its contrast-pair partition/diminishing-
  returns argument, and its three-misconception registry (birth types independently classified,
  since this Blueprint states Description/Severity but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a
  shift-scheduling system partitioning employees via a coset-like equivalence structure).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.subgroup`,
  unlocks `math.abst.lagrange-theorem`+`math.abst.normal-subgroup`, cross_links none, advanced/
  understand, mastery_threshold 0.9, estimated_hours 4) was directly verified against the live KG
  and matches exactly. The Blueprint's own correctly-declared independence P76 mode (cross_links
  empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 86): authored. Second entry this batch, part of the 9-candidate frontier opened
  by Batch 84's `group-theory` (via `math.abst.subgroup`, Batch 85). Companion batch concepts:
  `math.abst.ideal`, `math.abst.group-order`, `math.abst.polynomial-ring`. `math.abst` moves from
  7/37 toward **11/37** this batch.

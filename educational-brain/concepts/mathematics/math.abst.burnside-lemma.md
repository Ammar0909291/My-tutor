# math.abst.burnside-lemma

## Identity
- **KG id**: `math.abst.burnside-lemma`
- **Domain**: math.abst
- **Requires**: `math.abst.group-action`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
State BURNSIDE'S LEMMA — $|G\backslash X|=\frac1{|G|}\sum_{g\in G}|X^g|$, where $X^g=\{x\in X:
g\cdot x=x\}$ is the FIXED-POINT SET of $g$ — and apply it to count distinct configurations
(e.g. colorings) up to symmetry, by computing $|X^g|$ correctly for EVERY group element
(including the identity) and correctly distinguishing the fixed-point set from an orbit.

## Core Understanding
BURNSIDE'S LEMMA counts DISTINCT configurations under a group's symmetry action by AVERAGING
fixed-point counts: if a finite group $G$ acts on a finite set $X$, the number of orbits
$|G\backslash X|$ (the truly distinct configurations, treating symmetric copies as identical)
equals $\frac1{|G|}\sum_{g\in G}|X^g|$, reusing `math.abst.group-action`'s own action axioms and
orbit-stabilizer theorem directly. THE FIXED-POINT SET $X^g=\{x\in X:g\cdot x=x\}$ is the set of
configurations LEFT UNCHANGED by applying $g$ — a fundamentally different quantity from an
ORBIT (the set of configurations REACHABLE from one $x$ by varying $g$): $X^g$ is indexed by a
FIXED group element and ranges over $X$; an orbit is indexed by a FIXED element of $X$ and
ranges over $G$.

WHY THE FORMULA WORKS (double-counting sketch): count pairs $(g,x)$ with $g\cdot x=x$ two ways —
by $g$ first, giving $\sum_{g\in G}|X^g|$; by $x$ first, giving $\sum_{x\in X}|\mathrm{Stab}(x)|$.
By the orbit-stabilizer theorem, $|\mathrm{Stab}(x)|=|G|/|\mathrm{Orb}(x)|$, so summing this over
each orbit contributes exactly $|G|$ (orbit size times its reciprocal) once per orbit — giving
$\sum_{g\in G}|X^g|=|G|\cdot|G\backslash X|$, which rearranges directly to Burnside's formula.

THE SUM RUNS OVER EVERY $g\in G$, INCLUDING THE IDENTITY: $|X^{e}|=|X|$ always (the identity
fixes everything), so omitting it drastically undercounts the sum.

## Mental Models
- **"Burnside's Lemma averages, over every symmetry, how many configurations that symmetry
  personally leaves unchanged — the average IS the orbit count."**
- **"$X^g$ asks 'which configurations does THIS symmetry fix?'; an orbit asks 'where does THIS
  configuration go under ALL symmetries?' — opposite directions of the same action."**

## Why Students Fail

### MC-1: FIXED-POINT-MEANS-TOTAL-FIXED
- **Surface form**: computes $|X^g|$ as the SIZE OF AN ORBIT of one particular $x$ (e.g. reports
  the orbit of a specific coloring under $g$ as if it were the fixed-point count), rather than
  counting how many DIFFERENT configurations $g$ itself leaves unchanged.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  both "orbit" and "fixed-point set" are quantities attached to the same group-action machinery,
  and a learner who has just mastered orbit computation naturally reaches for that same
  computation when asked about $X^g$, conflating "how far does $g$ move $x$" with "what does $g$
  leave alone").
- **Repair**: re-test EACH configuration individually against $g\cdot x\stackrel?=x$, rather than
  computing any single element's orbit.

### MC-2: BURNSIDE-COUNTS-CONFIGURATIONS
- **Surface form**: reports Burnside's Lemma's output as the TOTAL number of configurations
  $|X|$, rather than the number of DISTINCT orbits $|G\backslash X|$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity —
  conflates the raw configuration count with the symmetry-reduced count, since both are "how many
  things are there" style answers).
- **Repair**: re-contrast the two quantities directly — $|X|$ (ignoring symmetry) versus
  $|G\backslash X|$ (Burnside's actual output, accounting for symmetry).

### MC-3: FORMULA-APPLIED-WITHOUT-ALL-GROUP-ELEMENTS
- **Surface form**: sums $|X^g|$ over only SOME elements of $G$ (commonly omitting the identity),
  rather than every element.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Secondary severity — the
  non-identity elements are where the "interesting" fixed-point restrictions happen, so worked
  examples that emphasize those cases can leave the identity's own trivial-but-mandatory
  contribution under-practiced).
- **Repair**: re-verify the sum explicitly runs over ALL of $G$, noting $|X^{e}|=|X|$ is always
  the identity's own (large) contribution.

## Misconceptions

### MC-1: FIXED-POINT-MEANS-TOTAL-FIXED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: BURNSIDE-COUNTS-CONFIGURATIONS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: FORMULA-APPLIED-WITHOUT-ALL-GROUP-ELEMENTS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Burnside's Lemma is a poll: ask each symmetry 'how many configurations do YOU personally
  leave unchanged,' average the answers, and that average is the number of genuinely distinct
  configurations."**
- **Anti-analogy**: $X^g$ is NOT the orbit of any particular $x$ — it is a set defined by a FIXED
  $g$, ranging over all of $X$, the reverse indexing from an orbit.

## Demonstrations
- **Demonstration 1 (targets baseline application)**: coloring a triangle's 3 vertices with 2
  colors under $G=\mathbb Z/3\mathbb Z$ (rotations): $|X^{r^0}|=8$ (identity fixes all 8
  colorings), $|X^{r^1}|=|X^{r^2}|=2$ (only the two monochromatic colorings survive a genuine
  rotation) — Burnside gives $(8+2+2)/3=4$ distinct colorings, matching direct enumeration.
- **Demonstration 2 (targets MC-1)**: for $r^1$ acting on the coloring RRB, the ORBIT of RRB has
  size 3 ($\{$RRB, RBR, BRR$\}$) — but this is NOT $|X^{r^1}|$; testing $r^1\cdot$RRB directly
  gives BRR $\ne$ RRB, so RRB is NOT counted in $X^{r^1}$ at all. $|X^{r^1}|=2$ comes from testing
  EVERY coloring individually, not from any orbit size.
- **Demonstration 3 (targets MC-3)**: for the square ($G=\mathbb Z/4\mathbb Z$, 2-colorings of 4
  corners, $|X|=16$), omitting the identity's contribution ($|X^{r^0}|=16$) and summing only
  $|X^{r^1}|+|X^{r^2}|+|X^{r^3}|=2+4+2=8$ then dividing by 4 gives 2 — wildly wrong versus the
  correct $(16+2+4+2)/4=6$, since the identity alone supplies the majority of the sum.

## Discovery Questions
1. "If $r^1$ moves the coloring RRB to a DIFFERENT coloring, does RRB belong in the fixed-point
   set $X^{r^1}$?"
2. "Does Burnside's formula report how many total configurations exist, or how many are
   genuinely DIFFERENT once symmetric copies are identified?"
3. "The identity element does nothing to any configuration — should it still be included in the
   sum $\sum_{g\in G}|X^g|$?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-action`'s own orbit and fixed-point-adjacent
   machinery, framing Burnside's Lemma as "counting orbits by averaging, instead of enumerating
   them directly."
2. **Misconception gate**: Demonstration 2's direct test of $r^1\cdot$RRB, isolating MC-1 by
   contrasting an orbit computation against the correct fixed-point test.
3. **Contrast pair**: Demonstration 1 versus a raw configuration count, isolating MC-2 by
   distinguishing $|X|$ from $|G\backslash X|$.
4. **Mastery gate**: require a correct fixed-point-set computation for a new group action, a
   correct total distinct-count via Burnside applied with EVERY group element included, and a
   correct diagnosis of an error that omits the identity or confuses orbit size with fixed-point
   count, at the Blueprint's own stated MAMR of 4/5 (⌈0.75×5⌉).

## Tutor Actions
- Never accept an orbit-size computation as a substitute for $|X^g|$ — require an explicit
  element-by-element fixed-point test.
- Never accept a sum over $G$ that silently omits the identity element.

## Voice Teaching Notes
- Say "is that the orbit of one configuration, or the fixed-point set of one symmetry?" whenever
  $|X^g|$ is being computed.
- When a Burnside sum is proposed, ask "did you include the identity element in that sum?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $|X^g|$ for a specific group element by
  testing individual configurations.
- **Rung 2 (application)**: learner correctly applies Burnside's formula across ALL group
  elements (including the identity) to find the number of distinct configurations.
- **Rung 3 (transfer)**: learner correctly applies the fixed-point-set/cycle-structure pattern to
  a NEW symmetry group (e.g. a hexagon under $\mathbb Z/6\mathbb Z$), computing all fixed-point
  counts independently.

## Tutor Recovery Strategy
- If MC-1 recurs, re-test the specific configuration against $g\cdot x\stackrel?=x$ directly,
  distinguishing it from any orbit computation.
- If MC-2 recurs, re-contrast $|X|$ versus $|G\backslash X|$ using the same concrete example.
- If MC-3 recurs, re-verify the sum's index set explicitly includes every element of $G$.

## Memory Hooks
- "Fixed by $g$ means $g\cdot x=x$ — test each $x$, don't reach for an orbit size."
- "Burnside's answer is the DISTINCT count, never the raw total."
- "The identity always contributes $|X|$ to the sum — never skip it."

## Transfer Connections
- `math.abst.group-action` (already authored, this campaign, Batch 91): supplies the action
  axioms, orbit definition, and orbit-stabilizer theorem this concept's own double-counting proof
  sketch and canonical triangle-coloring example directly reuse.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.burnside-lemma.md`, reused by
  reference for its triangle-coloring canonical example, its fixed-point table technique, its
  double-counting proof sketch of the formula, and its three-misconception registry (severity
  levels adopted directly as declared; birth types independently classified since this Blueprint
  states Root Cause but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying the
  fixed-point-set/cycle-structure pattern to a hexagon under $\mathbb Z/6\mathbb Z$ (2-colorings,
  6 group elements, answer 14 distinct colorings).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.abst.group-action`, unlocks none, cross_links none, expert/apply, mastery_threshold 0.75,
  estimated_hours 5) was directly verified against the live KG and matches exactly. The
  Blueprint's own correctly-declared independence P76 mode (cross_links empty in KG) required no
  correction.

## Version History
- 2026-09-14 (Batch 92): authored. First entry this batch. Companion batch concepts:
  `math.abst.sylow-theorems`, `math.abst.pid`, `math.abst.algebraic-extension`. All 4 concepts
  this batch are math.abst, closing the domain's entire post-Batch-91 ready frontier —
  `math.abst` moves 29/37 → **33/37** this batch.

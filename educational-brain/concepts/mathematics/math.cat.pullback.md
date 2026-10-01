# math.cat.pullback

## Identity
- **KG id**: `math.cat.pullback`
- **Domain**: math.cat
- **Requires**: `math.cat.limits`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: apply
- **Mastery threshold**: 0.6
- **Estimated hours**: 4

## Learning Objective
Recognize cospan (pullback) and span (pushout) as arrows pointing OPPOSITE DIRECTIONS — NEVER
interchangeable or "the same construction relabeled"; recognize the pullback as EQUALING the
product ONLY in the degenerate one-point-$C$ case — NEVER assuming it always equals $A\times B$;
and recognize the pushout's element count as REDUCED BY IDENTIFICATION — NEVER a plain
$|A|+|B|$ sum.

## Core Understanding
COSPAN AND SPAN POINT OPPOSITE DIRECTIONS — NEVER INTERCHANGEABLE: the pullback's diagram is a
COSPAN $A\to C\leftarrow B$ (both maps INTO $C$); the pushout's diagram is a SPAN
$A\leftarrow C\to B$ (both maps OUT OF $C$). For the pullback (Example 1's parity setup):
$|A\times B|=9$ narrows DOWN to $|P|=4$ agreeing pairs. For the pushout (Example 2's gluing
setup): $|A|+|B|=4$ combines via identification DOWN to $|Q|=3$. Believing the cospan (pullback)
and span (pushout) diagram shapes are interchangeable or "the same construction, just relabeled"
is WRONG — the arrows point genuinely opposite directions, producing structurally different, dual
constructions, not a superficial labeling difference.

THE PULLBACK EQUALS THE PRODUCT ONLY IN THE DEGENERATE ONE-POINT-$C$ CASE — NEVER ALWAYS: for
$C=\{*\}$ with $f,g$ the unique constant maps: $f(a)=g(b)=*$ for EVERY pair, so the agreement
condition is VACUOUS, giving $P=A\times B$ exactly, the FULL ordinary product. But for a
non-trivial $C$ (Example 1's parity setup, $|C|=2$): $P$ genuinely narrows to only 4 of the 9
pairs. Believing the pullback always equals the ordinary product $A\times B$ regardless of
$f,g,C$ is WRONG — it genuinely restricts to the agreeing pairs except in the degenerate,
information-free one-point-$C$ case.

THE PUSHOUT'S ELEMENT COUNT IS REDUCED BY IDENTIFICATION — NEVER A PLAIN SUM: for $C=\{*\}$,
$A=\{1,2\}$, $B=\{p,q\}$, $f(*)=1,g(*)=p$: the pushout glues $1\sim p$, giving
$Q=\{[1{=}p],2,q\}$ — a THREE-element set, NOT $|A|+|B|=4$. Believing the pushout $Q$ always has
exactly $|A|+|B|$ elements (a plain disjoint union, ignoring forced identifications) is WRONG —
the identifications forced by $f,g$ genuinely reduce the count below the simple sum whenever any
identification actually occurs.

## Mental Models
- **"Cospan arrows point INTO the shared object (pullback); span arrows point OUT of the shared
  object (pushout) — opposite directions, opposite constructions."**
- **"The pullback only equals the full product when the shared target carries zero information —
  any real target genuinely restricts the pairs."**
- **"The pushout's count drops below |A|+|B| exactly by however many identifications the maps
  force — never a free plain sum."**

## Why Students Fail

### MC-1: PULLBACK-PUSHOUT-DIRECTION-CONFUSED
- **Surface form**: confuses the cospan (into $C$, pullback) and span (out of $C$, pushout)
  diagram shapes, treating them as interchangeable.
- **Birth type**: foundational (Blueprint's own declared severity — both "combine two things using
  a shared piece," making the arrow-direction distinction easy to blur).
- **Repair**: re-walk the explicit arrow-direction and element-count contrast.

### MC-2: PULLBACK-ASSUMED-ALWAYS-EQUALS-PRODUCT
- **Surface form**: believes the pullback always equals the ordinary product $A\times B$
  regardless of $f,g,C$.
- **Birth type**: foundational (Blueprint's own declared severity — the one-point-$C$ special case
  is often seen first, over-generalizing it as the general rule).
- **Repair**: re-walk the non-trivial parity-based pullback computation showing genuine
  restriction.

### MC-3: PUSHOUT-ELEMENT-COUNT-MISCOMPUTED-AS-SIMPLE-SUM
- **Surface form**: believes the pushout always has exactly $|A|+|B|$ elements, ignoring the
  identifications forced by $f,g$.
- **Birth type**: moderate severity (Blueprint's own declared severity — "combining two sets"
  intuitively suggests a disjoint union without accounting for the gluing).
- **Repair**: re-count the pushout example explicitly, showing the identification reduces the
  count.

## Misconceptions

### MC-1: PULLBACK-PUSHOUT-DIRECTION-CONFUSED
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: PULLBACK-ASSUMED-ALWAYS-EQUALS-PRODUCT
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: PUSHOUT-ELEMENT-COUNT-MISCOMPUTED-AS-SIMPLE-SUM
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A pullback is like finding matching puzzle pieces that fit the same slot — a restrictive
  search. A pushout is like taping two pieces of paper together at a shared edge — a combining,
  identifying operation."**
- **Anti-analogy**: the pullback isn't secretly always the product wearing a disguise — the
  product is just the special, information-free case where the shared target contributes nothing.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the one-point-$C$-versus-parity-based-$C$ pullback contrast.
- **Demonstration 2 (targets MC-1)**: the cospan-pullback-versus-span-pushout arrow-direction and
  element-count contrast.
- **Demonstration 3 (targets MC-3)**: the explicit pushout identification-count computation.

## Discovery Questions
1. "Is the pullback just the product A×B, computed the same way regardless of f and g?"
2. "Do the pullback and pushout use the same diagram shape, just labeled differently?"
3. "Does the pushout Q always have exactly |A|+|B| elements?"

## Teaching Sequence
1. **Representation shift**: work the one-point-$C$-versus-parity-based pullback contrast,
   isolating MC-2.
2. **Contrast pair**: work the cospan-versus-span arrow-direction and element-count contrast,
   isolating MC-1.
3. **Conflict evidence**: work the explicit pushout identification count, isolating MC-3.
4. **Mastery gate**: require a correct fiber-product computation, a correct explanation of the
   degenerate one-point-$C$ reduction to the ordinary product, a correct pushout computation with
   explicit elements, and a correct explanation of why cospan and span produce dual rather than
   identical constructions, at the Blueprint's own stated MAMR of 3/5.

## Tutor Actions
- Never accept a pullback and pushout treated as interchangeable or defined by the same diagram
  shape.
- Never accept a claim that the pullback always equals the full product $A\times B$.
- Never accept a pushout's element count computed as a plain $|A|+|B|$ sum without checking
  identifications.

## Voice Teaching Notes
- Say "which way do those arrows point — into the shared object, or out of it?" whenever a
  pullback or pushout is being set up.
- Ask "did you account for the identifications the maps force?" whenever a pushout's element count
  is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a fiber product for given $f,g,C$.
- **Rung 2 (application)**: learner correctly computes a pushout's identified elements.
- **Rung 3 (transfer)**: learner correctly explains why a database JOIN is structurally a pullback
  (not a pushout), and why gluing two circles at a point is a pushout.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the cospan-versus-span arrow-direction contrast.
- If MC-2 recurs, re-walk the non-trivial parity-based pullback computation.
- If MC-3 recurs, re-count the pushout example explicitly.

## Memory Hooks
- "Cospan into C gives pullback; span out of C gives pushout — never interchangeable."
- "Pullback equals the product only when C carries zero information — never generally."
- "Pushout's count drops by however many identifications occur — never a plain sum."

## Transfer Connections
- `math.cat.limits` (prerequisite, already authored, this campaign): supplies the general
  universal-cone definition of a limit and the specific claim, previewed there, that the pullback
  is the limit of a cospan diagram — this concept fully expands that claim.

## Cross-Subject Connections
- Relational databases: a JOIN between two tables sharing a common key column is structurally a
  PULLBACK (a cospan, both tables mapping INTO the shared key values), directly applying this
  concept's cospan-versus-span distinction.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.pullback.md`, reused by reference for
  its three worked examples and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on gluing two circles into a
  figure-eight (pushout) contrasted with a database JOIN (pullback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cat.limits`,
  unlocks none, cross_links none, research/apply, mastery_threshold 0.6, estimated_hours 4) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 253): authored. Second entry this batch. Companion batch concept:
  `math.cat.equalizer`.

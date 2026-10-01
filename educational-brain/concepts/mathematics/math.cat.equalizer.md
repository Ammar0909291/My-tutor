# math.cat.equalizer

## Identity
- **KG id**: `math.cat.equalizer`
- **Domain**: math.cat
- **Requires**: `math.cat.limits`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: apply
- **Mastery threshold**: 0.6
- **Estimated hours**: 4

## Learning Objective
Recognize the equalizer as EXACTLY the limit of the two-parallel-arrows diagram — NEVER an
unrelated new definition; recognize universality as picking out ONE CANONICAL subset — NEVER any
arbitrary agreeing subset; and recognize the coequalizer as a GENUINELY DIFFERENT quotient
construction — NEVER the equalizer computed "the same way for the other direction."

## Core Understanding
THE EQUALIZER IS EXACTLY THE LIMIT OF THE TWO-PARALLEL-ARROWS DIAGRAM — NEVER AN UNRELATED NEW
DEFINITION: recall a limit is a universal cone over a diagram. For the diagram $\bullet
\rightrightarrows\bullet$ with arrows $f,g$: a cone over $D=(f,g):A\to B$ consists of an object
$C$ with maps into BOTH objects, but $C\to B$ is DETERMINED by composing $C\to A$ with either $f$
or $g$, and these must AGREE — forcing $f\circ e=g\circ e$ exactly. Believing the equalizer is an
unrelated new definition rather than recognizing it as the specific limit of the two-parallel-
arrows diagram is WRONG — cone data over this diagram shape reduces EXACTLY to equalizer data;
this is not an analogy, it is the same universal-cone definition specialized.

UNIVERSALITY PICKS OUT ONE CANONICAL SUBSET — NEVER ANY ARBITRARY AGREEING SUBSET: for $f(x)=x^2$,
$g(x)=3x-2$ on $\mathbb{R}$: the equalizer is $E=\{x:x^2=3x-2\}=\{1,2\}$. Believing any subset of
$A$ where $f,g$ happen to agree (like $\{1\}\subset\{1,2\}$) qualifies as "the" equalizer is
WRONG — universality's uniqueness-of-factoring requirement forces $E$ to be the LARGEST, ALL-
ENCOMPASSING agreeing set; a proper subset like $\{1\}$ fails universality since a cone hitting
both $1$ and $2$ could not factor uniquely through it.

THE COEQUALIZER IS A GENUINELY DIFFERENT QUOTIENT CONSTRUCTION — NEVER THE EQUALIZER MIRRORED: for
$A=\{*\}$, $B=\{1,2,3\}$, $f(*)=1,g(*)=2$: the coequalizer identifies $1\sim2$, giving
$Q=\{[1{=}2],[3]\}$ — a TWO-element set that is NOT a subset of $B$ at all, a genuinely different
set (equivalence classes). Believing the coequalizer is computed the same way as the equalizer (a
subset where something holds) rather than recognizing it as a genuinely different quotient
construction is WRONG — the equalizer restricts $A$ (narrows via inclusion INTO $A$); the
coequalizer collapses $B$ (quotients via a map OUT OF $B$) — dual operations, not mirror images of
the same computation.

## Mental Models
- **"The equalizer isn't a new idea from scratch — it's the same universal-cone definition,
  specialized to the two-parallel-arrows diagram shape."**
- **"Universality demands the LARGEST canonical agreeing subset — a proper subset always fails
  the uniqueness-of-factoring test."**
- **"Equalizer narrows a domain into a subset; coequalizer collapses a codomain into a quotient —
  genuinely dual, never the same computation read backwards."**

## Why Students Fail

### MC-1: COEQUALIZER-TREATED-AS-EQUALIZER-MIRRORED
- **Surface form**: believes the coequalizer is computed the same way as the equalizer (a subset
  where something holds), rather than recognizing it as a genuinely different quotient
  construction.
- **Birth type**: foundational (Blueprint's own declared severity — "dual" is easy to
  misinterpret as "the same computation, just relabeled," rather than a structurally different
  operation).
- **Repair**: re-walk the element-count contrast — equalizer as subset versus coequalizer as
  quotient.

### MC-2: EQUALIZER-TREATED-AS-ARBITRARY-AGREEING-SUBSET
- **Surface form**: believes any subset of $A$ where $f,g$ happen to agree qualifies as "the"
  equalizer, missing that universality picks out one canonical such subset.
- **Birth type**: moderate severity (Blueprint's own declared severity — "where f and g agree"
  sounds descriptive of any agreeing subset rather than specifically the maximal one).
- **Repair**: re-derive universality's uniqueness-of-factoring requirement showing only the full
  agreeing set qualifies.

### MC-3: EQUALIZER-NOT-RECOGNIZED-AS-A-LIMIT-INSTANCE
- **Surface form**: treats the equalizer as an unrelated new definition rather than recognizing it
  as the specific limit of the two-parallel-arrows diagram shape.
- **Birth type**: moderate severity (Blueprint's own declared severity — the concrete $\mathbf{Set}$
  formula "$\{a:f(a)=g(a)\}$" looks self-contained, obscuring its origin as a specialization of
  the general limit definition).
- **Repair**: re-walk the cone-data-reduces-to-equalizer-data argument.

## Misconceptions

### MC-1: COEQUALIZER-TREATED-AS-EQUALIZER-MIRRORED
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: EQUALIZER-TREATED-AS-ARBITRARY-AGREEING-SUBSET
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

### MC-3: EQUALIZER-NOT-RECOGNIZED-AS-A-LIMIT-INSTANCE
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The equalizer is like finding every point where two overlapping maps genuinely agree — not
  just some, but ALL of them, captured canonically as one set."**
- **Anti-analogy**: the coequalizer isn't the equalizer's twin computed on the other side — it's a
  quotient, an identification of points, not a restriction to a subset.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the cone-data-reduces-to-equalizer-data argument.
- **Demonstration 2 (targets MC-2)**: the $x^2=3x-2$ equalizer computation and the proper-subset
  universality failure.
- **Demonstration 3 (targets MC-1)**: the coequalizer's quotient-versus-equalizer's-subset
  element-count contrast.

## Discovery Questions
1. "Is the equalizer just 'some subset of A where f and g happen to agree,' any way you like, or
   a specific canonically-determined subset?"
2. "Does the coequalizer describe 'the subset of B where something holds,' the same way the
   equalizer does for A?"
3. "Is the equalizer merely analogous to a limit, or is it literally the limit of a specific
   diagram shape?"

## Teaching Sequence
1. **Representation shift**: work the cone-data-reduces-to-equalizer-data argument, isolating
   MC-3.
2. **Conflict evidence**: work the $x^2=3x-2$ computation and proper-subset failure, isolating
   MC-2.
3. **Contrast pair**: work the equalizer-subset-versus-coequalizer-quotient element-count
   contrast, isolating MC-1.
4. **Mastery gate**: require a correct equalizer computation, a correct coequalizer computation
   with explicit equivalence classes, a correct explanation of why the equalizer is literally the
   two-parallel-arrows limit, and a correct explanation of why the coequalizer is a subset of
   neither $A$ nor $B$ in general, at the Blueprint's own stated MAMR of 3/5.

## Tutor Actions
- Never accept the equalizer described as any subset where $f,g$ happen to agree, rather than the
  canonical maximal one.
- Never accept the equalizer treated as an unrelated definition separate from the general limit
  concept.
- Never accept the coequalizer computed as if it were a subset of $B$.

## Voice Teaching Notes
- Say "is that subset the largest one, or could a bigger agreeing set exist?" whenever an
  equalizer is being computed.
- Ask "is that a subset, or a quotient?" whenever a coequalizer is being computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes an equalizer as the full canonical
  agreeing subset.
- **Rung 2 (application)**: learner correctly computes a coequalizer's equivalence classes for a
  given pair of functions.
- **Rung 3 (transfer)**: learner correctly explains a group-theoretic coequalizer's need for a
  normal subgroup specifically, connecting to the general fact that coequalizers must respect the
  ambient category's structure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the element-count contrast between subset and quotient.
- If MC-2 recurs, re-derive the uniqueness-of-factoring requirement.
- If MC-3 recurs, re-walk the cone-data-reduces-to-equalizer-data argument.

## Memory Hooks
- "The equalizer is literally the limit of the two-parallel-arrows diagram — never unrelated."
- "Universality picks the largest agreeing subset — never an arbitrary one."
- "Coequalizer collapses a codomain into a quotient — never the equalizer mirrored."

## Transfer Connections
- `math.cat.limits` (prerequisite, already authored, this campaign): supplies the general
  universal-cone definition of a limit and the specific claim, previewed there, that the
  equalizer is the limit of the two-parallel-arrows diagram — this concept fully expands that
  claim.

## Cross-Subject Connections
- Group theory: a coequalizer of two group homomorphisms is the quotient by the NORMAL subgroup
  generated by $f(h)g(h)^{-1}$ — directly applying this concept's principle that coequalizers must
  respect the ambient category's structure, not produce an unstructured quotient set.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.equalizer.md`, reused by reference for
  its three worked examples and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on group-theoretic coequalizers and
  the necessity of a normal subgroup.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cat.limits`,
  unlocks none, cross_links none, research/apply, mastery_threshold 0.6, estimated_hours 4) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 253): authored. First entry this batch. Companion batch concept:
  `math.cat.pullback`.

# math.fnal.open-mapping-theorem

## Identity
- **KG id**: `math.fnal.open-mapping-theorem`
- **Domain**: math.fnal
- **Requires**: `math.fnal.banach-space`, `math.fnal.bounded-operator`
- **Unlocks**: `math.fnal.closed-graph-theorem`
- **Cross-links**: `math.real.baire-category`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Distinguish "open" (IMAGES of open sets are open) from continuity (PREIMAGES of open sets are
open) — NEVER conflate the two, opposite directions; recognize completeness of BOTH spaces is
essential to the bounded-inverse corollary — NEVER assume it holds for merely normed spaces; and
recognize surjectivity is a NECESSARY hypothesis for openness — NEVER assume every bounded operator
between Banach spaces is automatically open.

## Core Understanding
"OPEN" IS ABOUT IMAGES — THE OPPOSITE DIRECTION FROM CONTINUITY'S PREIMAGES, NEVER THE SAME
PROPERTY: for $T(x,y)=(x,0)$ on $\mathbb{R}^2$ (a bounded, continuous PROJECTION, but NOT
surjective — its image is only the $x$-axis): $T$ is certainly continuous (preimages of open sets
are open, guaranteed for any bounded operator). But taking the open unit disk $D$: $T(D)=(-1,1)$
on the $x$-axis has EMPTY INTERIOR in $\mathbb{R}^2$ — NOT an open subset of the codomain. $T$
fails to be open. Believing boundedness/continuity of an operator already guarantees images of
open sets are open is WRONG — "open" concerns images, "continuous" concerns preimages, genuinely
opposite directions, and one does not imply the other.

COMPLETENESS OF BOTH SPACES IS ESSENTIAL TO THE BOUNDED-INVERSE COROLLARY — NEVER ASSUMED TO HOLD
FOR MERELY NORMED SPACES: let $X=c_{00}$ (finitely-supported sequences, sup norm — NOT complete),
$T(x_1,x_2,x_3,\ldots)=(x_1,x_2/2,x_3/3,\ldots)$ — linear, bounded, bijective onto $c_{00}$, with
inverse $T^{-1}(x_1,x_2,\ldots)=(x_1,2x_2,3x_3,\ldots)$. Testing $e_n'=(0,\ldots,1/n,\ldots,0)$
with $\|e_n'\|=1/n$: $T^{-1}(e_n')=e_n$ with $\|T^{-1}(e_n')\|=1$, giving ratio
$\|T^{-1}(e_n')\|/\|e_n'\|=n\to\infty$ — $T^{-1}$ is UNBOUNDED, despite $T$ being bijective and
bounded. Believing the bounded-inverse corollary holds for bijective bounded operators between ANY
normed spaces is WRONG — completeness of BOTH spaces is essential, and $c_{00}$'s incompleteness
is exactly why the corollary fails here.

SURJECTIVITY IS A NECESSARY HYPOTHESIS FOR OPENNESS — NEVER AUTOMATIC FOR EVERY BOUNDED OPERATOR
BETWEEN BANACH SPACES: the same projection $T(x,y)=(x,0)$ from above fails to be open PRECISELY
because it is not surjective. Believing every bounded linear operator between Banach spaces is
automatically open regardless of surjectivity is WRONG — surjectivity is not a technical footnote,
it is a REQUIRED hypothesis of the theorem's conclusion.

## Mental Models
- **"Continuity is about preimages (already guaranteed for bounded operators); openness is about
  images — the opposite direction, and genuinely stronger."**
- **"The striking 'bijective + bounded implies bounded inverse' fact needs BOTH spaces complete —
  drop completeness and the corollary can fail, concretely."**
- **"Surjectivity isn't decoration in this theorem's hypotheses — a non-surjective bounded
  operator can genuinely fail to be open."**

## Why Students Fail

### MC-1: OPEN-MAPPING-CONFLATED-WITH-CONTINUITY
- **Surface form**: believes boundedness/continuity of an operator already guarantees images of
  open sets are open, missing that this is the opposite direction from continuity's preimage
  property.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — "open" and
  "continuous" both sound like general topological niceness properties, inviting conflation).
- **Repair**: re-walk Example 1's projection map, continuous yet not open, re-anchoring on "open is
  about images; continuity is about preimages — opposite directions."

### MC-2: COMPLETENESS-NOT-REQUIRED-FOR-BOUNDED-INVERSE-COROLLARY
- **Surface form**: believes the bounded-inverse corollary holds for bijective bounded operators
  between any normed spaces, missing that completeness of BOTH spaces is essential.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  corollary's statement is often remembered without its Banach-space hypothesis attached).
- **Repair**: re-walk Example 2's $c_{00}$ counterexample, $T^{-1}$ genuinely unbounded there,
  re-anchoring on "completeness of both spaces is essential to the corollary."

### MC-3: SURJECTIVITY-NOT-REQUIRED-FOR-OPENNESS
- **Surface form**: believes every bounded linear operator between Banach spaces is automatically
  open regardless of surjectivity, missing that surjectivity is a necessary hypothesis.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — the theorem's
  name emphasizes "mapping" over its specific surjectivity requirement).
- **Repair**: re-walk Example 1's non-surjective projection failing to be open, re-anchoring on
  "surjectivity is a genuinely necessary hypothesis."

## Misconceptions

### MC-1: OPEN-MAPPING-CONFLATED-WITH-CONTINUITY
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: COMPLETENESS-NOT-REQUIRED-FOR-BOUNDED-INVERSE-COROLLARY
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: SURJECTIVITY-NOT-REQUIRED-FOR-OPENNESS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Continuity checks that nearby inputs stay nearby in output — openness checks the reverse:
  that a whole neighborhood of outputs is actually achieved by a neighborhood of inputs."**
- **Anti-analogy**: a bijective bounded operator's inverse isn't automatically bounded just because
  it's a well-defined linear formula — on an incomplete space, that same formula can blow up
  arbitrarily on a sequence of shrinking vectors.

## Demonstrations
- **Demonstration 1 (targets MC-1, MC-3)**: the $T(x,y)=(x,0)$ continuous-but-not-open,
  non-surjective projection.
- **Demonstration 2 (targets MC-2)**: the $c_{00}$ bijective-bounded-but-unbounded-inverse
  counterexample.
- **Demonstration 3 (orientation)**: the Baire Category theorem's role as the completeness-
  dependent engine of the proof.

## Discovery Questions
1. "Does boundedness (continuity) of a linear operator already guarantee that it maps open sets to
   open sets?"
2. "Does the bounded-inverse corollary hold for any bijective bounded linear operator, even between
   merely normed (not necessarily complete) spaces?"
3. "Is every bounded linear operator between Banach spaces automatically open, regardless of
   whether it is surjective?"

## Teaching Sequence
1. **Representation shift**: work Example 1's projection map, distinguishing open from continuous,
   isolating MC-1.
2. **Conflict evidence**: work Example 1's surjectivity-failure angle, isolating MC-3.
3. **Contrast pair**: work Example 2's $c_{00}$ bounded-inverse-failure counterexample, isolating
   MC-2.
4. **Mastery gate**: require a correct distinction between open and continuous, a correct
   explanation of why $T^{-1}$'s unboundedness in Example 2 doesn't contradict the theorem, and a
   correct statement of all the theorem's hypotheses, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "open" and "continuous" treated as the same property for a linear operator.
- Never accept the bounded-inverse corollary applied without verifying both spaces are Banach.
- Never accept an operator assumed open without checking surjectivity.

## Voice Teaching Notes
- Say "is that about images or preimages?" whenever "open" versus "continuous" is discussed for an
  operator.
- Ask "are both spaces actually complete here?" whenever the bounded-inverse corollary is invoked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes "T is continuous" from "T is open" in
  terms of preimages versus images.
- **Rung 2 (application)**: learner correctly identifies why a specific non-surjective bounded
  operator fails to be open.
- **Rung 3 (transfer)**: learner correctly diagnoses what could go wrong applying the bounded-
  inverse corollary to a numerical solver's operator when one space is a proper, incomplete
  subspace of a Banach space.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the projection map's continuous-but-not-open status.
- If MC-2 recurs, re-walk the $c_{00}$ counterexample's unbounded-ratio computation.
- If MC-3 recurs, re-walk the non-surjective projection's openness failure.

## Memory Hooks
- "Open is about images, continuous is about preimages — opposite directions."
- "Bounded inverse needs BOTH spaces complete — an incomplete space can break it."
- "Surjectivity is required for openness — not automatic for any bounded operator."

## Transfer Connections
- `math.fnal.banach-space` (prerequisite, already authored, this campaign): supplies the
  completeness hypothesis this theorem's corollary depends on.
- `math.fnal.bounded-operator` (prerequisite, already authored, this campaign): supplies the
  continuity/boundedness property this concept's "open" property is contrasted against.

## Cross-Subject Connections
- Numerical analysis: solving a discretized linear system relies on the bounded-inverse corollary
  to guarantee a stable (bounded) solution operator, provided both spaces involved are genuinely
  complete.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.open-mapping-theorem.md`, reused by
  reference for its three worked examples (the standard $c_{00}$ counterexample) and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a numerical analyst's discretized-
  system operator, and why an incomplete subspace (analogous to $c_{00}$) threatens the
  bounded-inverse assumption.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction discrepancy (cross-link target since authored)**: the Blueprint's Component 0
  and Component 7 state the cross-link `math.real.baire-category` was "not yet authored" at write
  time, using independence mode for its P76 probe. The live EB corpus directory listing now shows
  `math.real.baire-category.md` IS authored (this campaign has since progressed past that point).
  This is the campaign's 20th discrepancy overall and a reverse-direction case, noted for the
  record; the Blueprint's own independence-mode probe is retained as authored, consistent with
  established discipline of not retroactively rewriting a Blueprint's chosen probe mode.

## Version History
- 2026-09-19 (Batch 230): authored. Second entry this batch. Companion batch concept:
  `math.fnal.dual-space-functional`.

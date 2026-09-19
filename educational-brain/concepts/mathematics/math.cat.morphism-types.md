# math.cat.morphism-types

## Identity
- **KG id**: `math.cat.morphism-types`
- **Domain**: math.cat
- **Requires**: `math.cat.category`
- **Unlocks**: none
- **Cross-links**: `math.abst.group-isomorphism`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Define monomorphism (left-cancellable) and epimorphism (right-cancellable) via ELEMENT-FREE
composition conditions, never element-based definitions; recognize that "mono = injective" and
"epi = surjective" in $\mathbf{Set}$ is a PROVABLE THEOREM specific to $\mathbf{Set}$, never part
of the general categorical definitions; and distinguish isomorphism (a genuine two-sided inverse)
from "merely mono and epi" (which can fail to be an isomorphism in general categories, though not
in $\mathbf{Set}$ or groups).

## Core Understanding
MONO/EPI ARE DEFINED PURELY VIA CANCELLATION — NEVER VIA ELEMENTS: a monomorphism $f:A\to B$ is
LEFT-CANCELLABLE ($f\circ g=f\circ h\Rightarrow g=h$ for all $g,h:C\to A$); an epimorphism is
RIGHT-CANCELLABLE ($g\circ f=h\circ f\Rightarrow g=h$). NEITHER definition mentions elements of
$A$ or $B$ at all — they are stated purely in terms of morphisms and composition, making them
meaningful in ANY category, even ones with no underlying-set structure whatsoever.

"MONO = INJECTIVE" IN $\mathbf{SET}$ IS A THEOREM — NEVER A DEFINITIONAL IDENTITY: to prove
mono$\Rightarrow$injective in $\mathbf{Set}$: suppose $f:A\to B$ is mono but NOT injective, so
$f(a_1)=f(a_2)$ for $a_1\ne a_2$. Define $g,h:\{*\}\to A$ by $g(*)=a_1$, $h(*)=a_2$ — then
$f\circ g=f\circ h$ but $g\ne h$, CONTRADICTING $f$ mono. This proof genuinely EXPLOITS
$\mathbf{Set}$'s structure (the existence of a one-point set, functions out of which correspond
exactly to elements) — a category lacking such objects would need an entirely different argument,
or the coincidence could fail outright. The general categorical definition says NOTHING about
elements; the coincidence is a DERIVED fact about $\mathbf{Set}$ specifically.

MONO AND EPI TOGETHER DO NOT ALWAYS IMPLY ISOMORPHISM — NEVER A UNIVERSAL LAW: in the category of
rings, the inclusion $\iota:\mathbb Z\hookrightarrow\mathbb Q$ is BOTH mono (injective as a
function) AND epi (any two ring homomorphisms out of $\mathbb Q$ agreeing on $\mathbb Z$ must
agree everywhere, since every rational is a ratio of integers). Yet $\iota$ has NO inverse ring
homomorphism $\mathbb Q\to\mathbb Z$ (no ring homomorphism can send $1/2$ anywhere consistent,
since $2\cdot(1/2)=1$ would force a rational inverse of $2$ inside $\mathbb Z$, which doesn't
exist) — $\iota$ is mono AND epi but genuinely NOT an isomorphism. Whether "mono+epi $\Rightarrow$
iso" holds is a CATEGORY-BY-CATEGORY fact — true in $\mathbf{Set}$ and in the category of groups,
but FALSE in the category of rings — never a universal law across all categories.

## Mental Models
- **"Mono and epi are about cancellation, never about elements — the definitions work in any
  category, elements or not."**
- **"'Mono equals injective' isn't handed down by definition — it's a theorem you PROVE, using
  Set's own specific structure (like its one-point sets)."**
- **"Mono+epi is a strong pair of properties, but never an automatic ticket to invertibility —
  check the specific category before assuming isomorphism."**

## Why Students Fail

### MC-1: MONO-EPI-CONFLATED-WITH-DEFINITIONAL-INJECTIVE-SURJECTIVE
- **Surface form**: believes "monomorphism = injective" and "epimorphism = surjective" are true
  by definition in every category, rather than a provable, $\mathbf{Set}$-specific theorem.
- **Birth type**: Foundational severity (Blueprint's own declared severity — $\mathbf{Set}$ is
  almost always the first category encountered, making the coincidence feel definitional).
- **Repair**: re-walk the one-point-set proof that mono implies injective, specific to
  $\mathbf{Set}$'s structure.

### MC-2: MONO-AND-EPI-ASSUMED-TO-IMPLY-ISOMORPHISM
- **Surface form**: believes a morphism that is both mono and epi must automatically be an
  isomorphism in every category, over-generalizing from $\mathbf{Set}$ where this happens to
  hold.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the pattern holds in
  the most familiar categories, $\mathbf{Set}$ and groups, inviting the over-generalization).
- **Repair**: re-walk the $\mathbb Z\hookrightarrow\mathbb Q$ ring-inclusion counterexample.

### MC-3: ENDOMORPHISM-CONFLATED-WITH-AUTOMORPHISM
- **Surface form**: believes every endomorphism ($f:A\to A$) is automatically an automorphism,
  missing that endomorphism only requires matching source/target with no invertibility implied.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the "auto-" prefix
  invites conflating the two terms without checking the invertibility requirement).
- **Repair**: re-anchor on a non-invertible endomorphism example (e.g. $f(n)=2n$ on $\mathbb Z$).

## Misconceptions

### MC-1: MONO-EPI-CONFLATED-WITH-DEFINITIONAL-INJECTIVE-SURJECTIVE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MONO-AND-EPI-ASSUMED-TO-IMPLY-ISOMORPHISM
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: ENDOMORPHISM-CONFLATED-WITH-AUTOMORPHISM
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Mono and epi are cancellation promises, not element-counting rules — they work exactly the
  same whether or not the category's objects even have 'elements' at all."**
- **Anti-analogy**: mono-and-epi is not a secret password to invertibility — $\mathbb Z
  \hookrightarrow\mathbb Q$ satisfies both yet opens no door back.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the one-point-set proof that mono implies injective in
  $\mathbf{Set}$.
- **Demonstration 2 (targets MC-2)**: the $\mathbb Z\hookrightarrow\mathbb Q$ mono-and-epi-but-
  not-isomorphism counterexample in the category of rings.
- **Demonstration 3 (targets MC-3)**: a non-invertible endomorphism contrasted with a genuine
  automorphism.

## Discovery Questions
1. "Is 'monomorphism means injective' true by definition, or is it something that has to be
   PROVEN, and if so, in which categories?"
2. "If a morphism is both mono and epi, must it be an isomorphism?"
3. "Is every endomorphism $f:A\to A$ automatically an automorphism?"

## Teaching Sequence
1. **Representation shift**: the element-free cancellation definitions grounded in $\mathbf{Set}$,
   working Demonstration 1, isolating MC-1.
2. **Counterexample**: the ring-inclusion mono-and-epi-but-not-isomorphism case, working
   Demonstration 2, isolating MC-2.
3. **Mastery gate**: require a correct cancellation-based mono/epi verification for a specific
   morphism, a correct classification of a morphism as endomorphism/automorphism/neither, and a
   correct example of a mono-and-epi morphism that is not an isomorphism, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept "mono = injective" or "epi = surjective" presented as true by definition rather
  than a $\mathbf{Set}$-specific theorem.
- Never accept a claim that mono and epi together always imply isomorphism.
- Never accept every endomorphism treated as automatically an automorphism.

## Voice Teaching Notes
- Say "is that true because it's the definition, or because it's a fact PROVEN about this
  specific category?" whenever "mono = injective" is invoked.
- Ask "does this category guarantee mono+epi implies isomorphism, or do you need to check?"
  whenever a mono-and-epi morphism is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies mono/epi for a specific morphism via
  cancellation.
- **Rung 2 (application)**: learner correctly explains why mono=injective in $\mathbf{Set}$ is a
  proven theorem, not a definitional identity.
- **Rung 3 (transfer)**: learner correctly produces or explains a mono-and-epi morphism that is
  not an isomorphism, and correctly distinguishes endomorphism from automorphism.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the one-point-set proof for $\mathbf{Set}$.
- If MC-2 recurs, re-walk the $\mathbb Z\hookrightarrow\mathbb Q$ counterexample.
- If MC-3 recurs, re-anchor on a non-invertible endomorphism example.

## Memory Hooks
- "Mono/epi are cancellation properties — element-free, valid in any category."
- "Mono=injective in Set is proven, not definitional — the proof uses Set's own structure."
- "Mono+epi is category-dependent — never assume it gives you an isomorphism."

## Transfer Connections
- `math.cat.category` (already authored, this campaign, Batch 180): supplies the objects,
  morphisms, composition, and identity vocabulary this concept's mono/epi/iso definitions are all
  stated within.

## Cross-Subject Connections
- Abstract algebra: group and ring homomorphisms, whose injective/surjective classifications are
  the concrete special cases this concept's categorical mono/epi definitions generalize.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.morphism-types.md`, reused by reference
  for its cancellation-based mono/epi definitions, its one-point-set $\mathbf{Set}$ proof, its
  ring-inclusion mono-and-epi-not-isomorphism counterexample, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own probe connecting to group isomorphisms, explaining why a
  bijective group homomorphism is mono and epi, and why mono+epi DOES imply isomorphism in the
  category of groups specifically (contrasting with the ring counterexample).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cat.category`,
  unlocks none, cross_links `math.abst.group-isomorphism`, expert/understand,
  mastery_threshold 0.8, estimated_hours 4) was directly verified against the live KG and matches
  exactly. `math.abst.group-isomorphism` independently re-confirmed NOT YET authored in this EB
  corpus, exactly matching the Blueprint's own correctly-scoped independence-mode transfer probe
  (which references the concept's mathematical content directly without requiring its Blueprint
  or EB file to exist first, per this corpus's established convention).

## Version History
- 2026-09-19 (Batch 191): authored. Second entry this batch. Companion batch concept:
  `math.top.homology`.

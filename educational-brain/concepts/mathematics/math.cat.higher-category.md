# math.cat.higher-category

## Identity
- **KG id**: `math.cat.higher-category`
- **Domain**: math.cat
- **Requires**: `math.cat.monad`, `math.top.homotopy`
- **Unlocks**: none
- **Cross-links**: `math.top.homotopy`
- **Difficulty**: research
- **Bloom level**: create
- **Mastery threshold**: 0.35
- **Estimated hours**: 15

## Learning Objective
Recognize a 2-category's hom-categories as LITERALLY $[\mathcal{C},\mathcal{D}]$'s own
construction — NEVER an unrelated new invention; recognize $\infty$-category composition as
associative UP TO HOMOTOPY — NEVER required to be strictly associative like an ordinary category;
and recognize HoTT's "proofs are paths" as a GENUINE, FORMAL CORRESPONDENCE built on
already-mastered homotopy machinery — NEVER a loose metaphor.

## Core Understanding
A 2-CATEGORY'S HOM-CATEGORIES ARE LITERALLY $[\mathcal{C},\mathcal{D}]$ — NEVER AN UNRELATED
INVENTION: in $\mathbf{Cat}$, the "2-category of categories": OBJECTS are categories, MORPHISMS
are functors, 2-MORPHISMS are natural transformations. The hom-CATEGORY $\mathbf{Cat}(\mathcal{C},
\mathcal{D})$ — all functors $\mathcal{C}\to\mathcal{D}$ with natural transformations between
them — IS EXACTLY $[\mathcal{C},\mathcal{D}]$, `math.cat.functor-category`'s own already-mastered
construction. Believing a 2-category's structure is unrelated to the functor category
$[\mathcal{C},\mathcal{D}]$ already studied is WRONG — $[\mathcal{C},\mathcal{D}]$ literally IS
the hom-category structure a 2-category uses, reused one level up, not a new invention.

$\infty$-CATEGORY COMPOSITION IS ASSOCIATIVE UP TO HOMOTOPY — NEVER STRICTLY: in an ordinary
category, $(h\circ g)\circ f=h\circ(g\circ f)$ is a literal EQUATION. In an $\infty$-category, the
two composites need only be CONNECTED BY A HOMOTOPY $H$ (per `math.top.homotopy`'s own
definition: continuous, $H(\cdot,0)$ giving one composite, $H(\cdot,1)$ giving the other) — a
coherent WITNESS they are "the same up to a specified path," never literally identical. Believing
composition in an $\infty$-category must still be strictly associative, exactly like an ordinary
category, is WRONG — $\infty$-categories specifically REPLACE strict equality with a richer,
homotopy-coherent notion of sameness.

HOTT'S "PROOFS ARE PATHS" IS A GENUINE FORMAL CORRESPONDENCE — NEVER A METAPHOR: in HoTT, a type
$A$ is a space; a term $a:A$ is a point; a proof of $a=b$ is LITERALLY a path
$H:[0,1]\to A$ with $H(0)=a$, $H(1)=b$ — using EXACTLY `math.top.homotopy`'s own homotopy
machinery. TWO different proofs of $a=b$ can correspond to genuinely DIFFERENT, NON-HOMOTOPIC
paths — a real, checkable, higher-dimensional phenomenon with no analogue in ordinary equality.
Believing HoTT's "proofs are paths" idea is merely a suggestive metaphor with no formal
mathematical content is WRONG — this correspondence uses the identical formal homotopy machinery
already mastered; it is a genuine reinterpretation of equality, not a poetic analogy.

## Mental Models
- **"A 2-category isn't a new invention from scratch — its hom-categories are literally [C,D],
  now serving as the connecting data one level up."**
- **"∞-categories don't abandon associativity — they replace the strict equation with a coherent
  homotopy witness, using machinery you already have."**
- **"HoTT's proofs-as-paths isn't poetic — it's the exact same homotopy definition, applied
  formally, with different proofs sometimes genuinely non-homotopic."**

## Why Students Fail

### MC-1: 2-CATEGORY-TREATED-AS-UNRELATED-TO-FUNCTOR-CATEGORY
- **Surface form**: believes a 2-category's structure is unrelated to the functor category
  $[\mathcal{C},\mathcal{D}]$ already studied, missing that $[\mathcal{C},\mathcal{D}]$ literally
  is the hom-category structure a 2-category uses.
- **Birth type**: foundational (Blueprint's own declared severity — "2-category" sounds like a
  wholly new named structure rather than a direct reuse of the already-mastered functor category).
- **Repair**: re-walk the direct identification $\mathbf{Cat}(\mathcal{C},\mathcal{D})=
  [\mathcal{C},\mathcal{D}]$.

### MC-2: INFINITY-CATEGORY-ASSUMED-STRICTLY-ASSOCIATIVE
- **Surface form**: believes composition in an $\infty$-category must still be strictly
  associative like an ordinary category, missing that $\infty$-categories replace strict equality
  with homotopy-coherence.
- **Birth type**: foundational (Blueprint's own declared severity — "category" strongly implies
  the ordinary strict axioms already mastered, obscuring the relaxation $\infty$-categories make).
- **Repair**: re-walk the strict-equation-versus-homotopy-witness contrast.

### MC-3: HOTT-PROOFS-AS-PATHS-TREATED-AS-METAPHOR
- **Surface form**: believes HoTT's "proofs are paths" idea is merely a suggestive metaphor with
  no formal mathematical content.
- **Birth type**: moderate severity (Blueprint's own declared severity — "proofs as paths" sounds
  evocative and poetic on first hearing, obscuring its literal formal definition).
- **Repair**: re-walk the formal path-based reinterpretation and the non-homotopic-proofs example.

## Misconceptions

### MC-1: 2-CATEGORY-TREATED-AS-UNRELATED-TO-FUNCTOR-CATEGORY
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INFINITY-CATEGORY-ASSUMED-STRICTLY-ASSOCIATIVE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: HOTT-PROOFS-AS-PATHS-TREATED-AS-METAPHOR
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A 2-category is [C,D] wearing a promotion — the exact same construction, now doing duty one
  level higher in the hierarchy."**
- **Anti-analogy**: HoTT's paths-as-proofs isn't a poetic flourish for equality — it hands equality
  genuine higher-dimensional structure, where two proofs really can be different objects, not
  just different presentations of one fact.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\mathbf{Cat}(\mathcal{C},\mathcal{D})=
  [\mathcal{C},\mathcal{D}]$ identification.
- **Demonstration 2 (targets MC-2)**: the strict-equation-versus-homotopy-witness associativity
  contrast.
- **Demonstration 3 (targets MC-3)**: the formal path-based proof reinterpretation and
  non-homotopic-proofs phenomenon.

## Discovery Questions
1. "Is a 2-category's structure unrelated to the functor category [C,D] already studied?"
2. "Must composition in an ∞-category still be strictly associative, exactly like an ordinary
   category?"
3. "Is HoTT's 'proofs are paths' idea merely a suggestive metaphor with no formal mathematical
   content?"

## Teaching Sequence
1. **Representation shift**: work the $\mathbf{Cat}(\mathcal{C},\mathcal{D})=
   [\mathcal{C},\mathcal{D}]$ identification, isolating MC-1.
2. **Contrast pair**: work the strict-versus-homotopy-coherent associativity contrast, isolating
   MC-2.
3. **Conflict evidence**: work the formal path-based proof reinterpretation, isolating MC-3.
4. **Mastery gate**: require a correct explanation of why a 2-category's hom-category is exactly a
   $[\mathcal{C},\mathcal{D}]$-style functor category, a correct explanation of the strict-versus-
   homotopy-connected distinction, a correct statement of what non-homotopic proofs would mean in
   HoTT terms, and a correct explanation of why this concept is presented at orientation rather
   than mastery level, at the Blueprint's own stated MAMR of 2/5.

## Tutor Actions
- Never accept a 2-category's hom-category described as unrelated to $[\mathcal{C},\mathcal{D}]$.
- Never accept $\infty$-category composition described as requiring strict, on-the-nose
  associativity.
- Never accept HoTT's proofs-as-paths correspondence dismissed as merely metaphorical.

## Voice Teaching Notes
- Say "what construction have you already mastered that this literally reuses?" whenever a 2-
  category, $\infty$-category, or HoTT idea is introduced.
- Ask "is that connection formal and checkable, or just evocative language?" whenever a
  higher-category analogy is presented.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies a 2-category's hom-category as the
  already-mastered $[\mathcal{C},\mathcal{D}]$ construction.
- **Rung 2 (application)**: learner correctly distinguishes strict associativity from
  homotopy-coherent associativity for a given pair of composites.
- **Rung 3 (transfer)**: learner correctly explains what it would mean for two proofs of the same
  equality to be non-homotopic, and why this is a genuine, formally checkable claim rather than a
  purely philosophical one.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\mathbf{Cat}(\mathcal{C},\mathcal{D})=[\mathcal{C},\mathcal{D}]$
  identification.
- If MC-2 recurs, re-walk the strict-versus-homotopy-coherent contrast.
- If MC-3 recurs, re-walk the formal path-based proof reinterpretation.

## Memory Hooks
- "A 2-category's hom-category is literally [C,D] — never an unrelated new invention."
- "∞-categories trade strict equality for homotopy-coherence — never strict associativity
  unchanged."
- "HoTT's proofs-as-paths is formal, using real homotopy machinery — never just a metaphor."

## Transfer Connections
- `math.cat.monad` (prerequisite, already authored, this campaign): supplies the functors,
  natural transformations, and escalation-of-structure pattern this concept extends further.
- `math.top.homotopy` (prerequisite and cross-link, already authored): supplies the
  homotopy-equivalence machinery this concept's $\infty$-category and HoTT content directly
  reuses.

## Cross-Subject Connections
- Homotopy Type Theory / computer-verified mathematics: the proofs-as-paths correspondence
  directly underlies the univalence axiom and modern proof-assistant foundations built on
  identity types.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.higher-category.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.top.homotopy`'s own
  definition to explain non-homotopic proofs and why HoTT's framework is formally checkable, not
  purely philosophical.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cat.monad`,
  `math.top.homotopy`, unlocks none, cross_links `math.top.homotopy` [confirmed authored on
  disk], research/create, mastery_threshold 0.35, estimated_hours 15) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 257): authored. FINAL entry of the Mathematics Educational Brain authoring
  campaign — completes 908/908 concepts.

# math.cat.yoneda-lemma

## Identity
- **KG id**: `math.cat.yoneda-lemma`
- **Domain**: math.cat
- **Requires**: `math.cat.functor-category`
- **Unlocks**: `math.cat.representable-functor`
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 7

## Learning Objective
Recognize the bijection $\text{Nat}(\text{Hom}(A,-),F)\cong F(A)$ as a GENUINE, CONSTRUCTIVE
two-way correspondence — NEVER a mere cardinality coincidence; recognize the extraction recipe as
evaluating SPECIFICALLY at $A$ using $\text{id}_A$ — NEVER at an arbitrary object or morphism; and
recognize the Yoneda embedding's consequence as determination UP TO ISOMORPHISM — NEVER literal
identity between an object and the functor it represents.

## Core Understanding
THE BIJECTION IS A GENUINE, CONSTRUCTIVE TWO-WAY CORRESPONDENCE — NEVER A CARDINALITY
COINCIDENCE: for $\mathcal{C}=\{X,Y\}$, $f:X\to Y$, $A=X$: for EVERY $s\in F(X)$, defining
$\eta^{(s)}_X(\text{id}_X)=s$ and $\eta^{(s)}_Y(f)=F(f)(s)$ genuinely satisfies naturality — a
bona fide natural transformation. Conversely, ANY $\eta:\text{Hom}(X,-)\Rightarrow F$ must have
$\eta_Y(f)=F(f)(\eta_X(\text{id}_X))$, forced by naturality, so $\eta$ is entirely determined by
$\eta_X(\text{id}_X)$. Believing the Yoneda bijection is simply an observation that both sides
happen to have the same cardinality, without an actual explicit correspondence, is WRONG — the
correspondence is built EXPLICITLY in both directions, genuinely constructive.

THE EXTRACTION RECIPE EVALUATES SPECIFICALLY AT $A$ USING $\text{id}_A$ — NEVER AT AN ARBITRARY
OBJECT: the CORRECT extraction of the element of $F(A)=F(X)$ is $\eta_X(\text{id}_X)$. The
INCORRECT attempt $\eta_Y(f)$ gives $F(f)(\eta_X(\text{id}_X))\in F(Y)$ — a valid element, but of
the WRONG SET entirely (of $F(Y)$, not $F(A)=F(X)$). Believing the element of $F(A)$
corresponding to $\eta$ can be extracted by evaluating any component at any morphism is WRONG —
the recipe is SPECIFIC: evaluate the component at $A$, applied to $\text{id}_A$; evaluating
elsewhere gives a different (and unintended) result.

THE EMBEDDING CONSEQUENCE IS DETERMINATION UP TO ISOMORPHISM — NEVER LITERAL IDENTITY: if
$\text{Hom}(A,-)\cong\text{Hom}(B,-)$ (a natural isomorphism of functors), the embedding forces
$A\cong B$ as OBJECTS of $\mathcal{C}$ — an isomorphism, not identity. $A$ (an object of
$\mathcal{C}$) and $\text{Hom}(A,-)$ (a functor to $\mathbf{Set}$) remain genuinely DIFFERENT
KINDS of mathematical entities. Believing the Yoneda embedding's result means $A$ is literally the
same thing as the functor $\text{Hom}(A,-)$ it represents is WRONG — $A$'s isomorphism class is
fully DETERMINED by (recoverable from) which functor it represents, a determination mediated by
isomorphism, never a claim of literal identity.

## Mental Models
- **"The bijection is built in both directions explicitly — every element genuinely produces a
  transformation, and every transformation is genuinely forced back to one element."**
- **"Evaluate specifically at A, at the identity — evaluating elsewhere lands you in the wrong
  set entirely, not just a different answer in the right set."**
- **"An object is recoverable from the functor it represents — but recoverable-from is an
  isomorphism, never a literal equation between two different kinds of things."**

## Why Students Fail

### MC-1: YONEDA-BIJECTION-AS-CARDINALITY-COINCIDENCE
- **Surface form**: believes the Yoneda bijection is merely an observation of matching set sizes,
  missing its genuine, explicit, two-way constructive correspondence.
- **Birth type**: foundational (Blueprint's own declared severity — the notation
  "$\cong$" between $\text{Nat}(\ldots)$ and $F(A)$ can look like an abstract existence claim
  rather than an explicit recipe).
- **Repair**: re-walk the explicit two-way construction on the 2-object category.

### MC-2: EXTRACTION-RECIPE-EVALUATED-AT-WRONG-OBJECT
- **Surface form**: believes the element of $F(A)$ corresponding to a natural transformation can
  be extracted by evaluating any component at any morphism.
- **Birth type**: foundational (Blueprint's own declared severity — a natural transformation has
  many components, and without an explicit contrast, any one might seem equally valid).
- **Repair**: re-walk the correct-versus-incorrect extraction contrast.

### MC-3: DETERMINATION-CONFLATED-WITH-LITERAL-IDENTITY
- **Surface form**: believes "A is determined by Hom(A,-)" means $A$ is literally the same object
  as the functor $\text{Hom}(A,-)$.
- **Birth type**: moderate severity (Blueprint's own declared severity — "fully determined by"
  colloquially suggests identity rather than a mediated correspondence).
- **Repair**: re-walk the isomorphism-versus-identity distinction explicitly.

## Misconceptions

### MC-1: YONEDA-BIJECTION-AS-CARDINALITY-COINCIDENCE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: EXTRACTION-RECIPE-EVALUATED-AT-WRONG-OBJECT
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: DETERMINATION-CONFLATED-WITH-LITERAL-IDENTITY
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Yoneda's correspondence is like a two-way translator, not a coincidence of vocabulary size —
  every phrase in one language genuinely maps to exactly one in the other, and back."**
- **Anti-analogy**: recovering A from Hom(A,-) isn't discovering they were secretly the same
  object all along — it's discovering a reliable, isomorphism-mediated way to reconstruct one
  from the other, while they remain distinct kinds of entities.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit two-way bijection construction on the 2-object
  category.
- **Demonstration 2 (targets MC-2)**: the correct-$\eta_X(\text{id}_X)$-versus-incorrect-
  $\eta_Y(f)$ contrast.
- **Demonstration 3 (targets MC-3)**: the isomorphism-versus-literal-identity distinction for the
  embedding consequence.

## Discovery Questions
1. "Is the Yoneda bijection simply an observation that both sides happen to have the same
   cardinality, without an actual explicit correspondence?"
2. "Can the element of F(A) corresponding to a natural transformation be extracted by evaluating
   any component at any morphism?"
3. "Does the Yoneda embedding's result mean an object A is literally the same thing as the functor
   Hom(A,-) it represents?"

## Teaching Sequence
1. **Conflict evidence**: work the explicit two-way construction, isolating MC-1.
2. **Contrast pair**: work the correct-versus-incorrect extraction, isolating MC-2.
3. **Representation shift**: work the isomorphism-versus-identity distinction, isolating MC-3.
4. **Mastery gate**: require a correct listing of natural transformations corresponding to each
   element of $F(X)$, a correct explanation of why evaluating elsewhere gives the wrong set, a
   correct statement of what a natural isomorphism of representable functors implies, and a
   correct explanation of why evaluating at the identity specifically is essential, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the Yoneda bijection described as a mere cardinality observation.
- Never accept an extraction of $F(A)$'s corresponding element performed at any object other than
  $A$ using any morphism other than $\text{id}_A$.
- Never accept "A is determined by Hom(A,-)" interpreted as literal identity.

## Voice Teaching Notes
- Say "can you build the transformation from the element, and the element from the transformation,
  explicitly?" whenever the Yoneda bijection is discussed.
- Ask "which object and which morphism does the recipe specify?" whenever an extraction is being
  performed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly builds the natural transformation corresponding to a
  given element of $F(A)$.
- **Rung 2 (application)**: learner correctly extracts the element of $F(A)$ from a given natural
  transformation using the correct recipe.
- **Rung 3 (transfer)**: learner correctly states what $\text{Hom}(P,-)\cong\text{Hom}(Q,-)$
  implies about $P,Q$, and refutes a colleague's claim that $P$ and $\text{Hom}(P,-)$ can be
  treated as the same object.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the explicit two-way construction.
- If MC-2 recurs, re-walk the correct-versus-incorrect extraction contrast.
- If MC-3 recurs, re-walk the isomorphism-versus-identity distinction.

## Memory Hooks
- "The bijection is built explicitly both ways — never a coincidence of set sizes."
- "Evaluate at A, at the identity — never elsewhere."
- "Determined up to isomorphism — never literally identical."

## Transfer Connections
- `math.cat.functor-category` (prerequisite, already authored, this campaign): supplies the
  functors-as-objects, natural-transformations-as-morphisms structure the lemma's
  $\text{Nat}(-,-)$ and $F(A)$ operate on directly.

## Cross-Subject Connections
- Representable functors: the Yoneda embedding's "determined up to isomorphism" consequence is
  the foundational result underlying the entire theory of representable functors and universal
  properties across mathematics.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cat.yoneda-lemma.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on two objects with naturally
  isomorphic representable functors, refuting a "convenient object to evaluate at" proposal and an
  "identify P with Hom(P,-)" overstatement.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cat.functor-category`, unlocks `math.cat.representable-functor`, cross_links none,
  research/analyze, mastery_threshold 0.65, estimated_hours 7) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 254): authored. First entry this batch. Companion batch concept:
  `math.cat.tensor-product`.

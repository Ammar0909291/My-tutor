# math.de.higher-order-ode

## Identity
- **KG id**: `math.de.higher-order-ode`
- **Domain**: math.de
- **Requires**: `math.de.second-order-linear`, `math.alg.polynomial-roots`
- **Unlocks**: none
- **Cross-links**: `math.linalg.vector-space`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Generalize the characteristic-equation method to degree $n$, recognizing (via the Fundamental
Theorem of Algebra) that the degree-$n$ characteristic polynomial ALWAYS supplies exactly $n$
roots counting multiplicity; translate each root's MULTIPLICITY $k$ into $k$ genuinely
INDEPENDENT solutions $e^{rx},xe^{rx},\ldots,x^{k-1}e^{rx}$ (never $k$ literal copies of $e^{rx}$);
and VERIFY (via `math.linalg.vector-space`'s own closure axioms, never just assert) that the $n$
solutions form a genuine $n$-dimensional solution space.

## Core Understanding
THE CHARACTERISTIC POLYNOMIAL ALWAYS SUPPLIES EXACTLY $n$ ROOTS FOR AN $n$TH-ORDER ODE — NEVER
POTENTIALLY TOO FEW: for $y'''-6y''+11y'-6y=0$: substituting $y=e^{rx}$ gives
$r^3-6r^2+11r-6=0=(r-1)(r-2)(r-3)$, giving THREE distinct roots $r=1,2,3$ — matching the
Fundamental Theorem of Algebra's guarantee of exactly 3 roots (counting multiplicity) for this
degree-3 polynomial. The general solution $y=c_1e^x+c_2e^{2x}+c_3e^{3x}$ uses exactly the roots
supplied — this guarantee holds for ANY order $n$, never just degree 2.

MULTIPLICITY $k$ MEANS $k$ GENUINELY INDEPENDENT SOLUTIONS $e^{rx},xe^{rx},\ldots,x^{k-1}e^{rx}$
— NEVER $k$ LITERAL COPIES OF THE SAME $e^{rx}$: for $y'''-3y''+3y'-y=(r-1)^3=0$: a SINGLE root
$r=1$ of multiplicity 3. The correct solutions are $e^x,xe^x,x^2e^x$ — verified directly:
substituting $y_2=xe^x$ gives $y_2'=e^x+xe^x,y_2''=2e^x+xe^x,y_2'''=3e^x+xe^x$, and
$(3e^x+xe^x)-3(2e^x+xe^x)+3(e^x+xe^x)-xe^x=0$ ✓ — confirming $xe^x$ is a GENUINELY NEW, independent
solution, never a redundant repeat of $e^x$.

"$n$-DIMENSIONAL SOLUTION SPACE" IS A VERIFIED STRUCTURAL CLAIM — NEVER JUST DESCRIPTIVE
LANGUAGE: for $L[y]=y'''-6y''+11y'-6y$ and solutions $y_1=e^x,y_2=e^{2x}$: forming
$y=3y_1-2y_2=3e^x-2e^{2x}$ and substituting directly into $L[y]$ gives
$e^x(3-18+33-18)+e^{2x}(-16+48-44+12)=0+0=0$ ✓ — CONCRETELY verifying closure under linear
combination, exactly matching `math.linalg.vector-space`'s own closure axioms. This is a
CHECKABLE fact, established the same way any candidate vector space's closure is verified, never
an unverified label borrowed from linear algebra.

## Mental Models
- **"The same e^(rx) substitution that gives a quadratic at degree 2 gives a degree-n polynomial
  at degree n — the Fundamental Theorem of Algebra guarantees exactly n roots, every single
  time."**
- **"Multiplicity k means k genuinely new functions (1, x, x², ..., x^(k-1) times e^(rx)) — never
  k identical copies of one function."**

## Why Students Fail

### MC-1: CHARACTERISTIC-POLYNOMIAL-ROOT-COUNT-DOUBTED
- **Surface form**: doesn't recognize that the Fundamental Theorem of Algebra's guarantee (exactly
  $n$ roots counting multiplicity) applies directly to an $n$th-order ODE's characteristic
  polynomial.
- **Birth type**: Foundational severity (Blueprint's own declared severity — generalizing a
  degree-2 fact to arbitrary degree $n$ requires trusting an abstract theorem rather than
  re-verifying case by case).
- **Repair**: re-walk the degree-3 factoring example, re-anchoring on the Fundamental Theorem of
  Algebra's guarantee.

### MC-2: MULTIPLICITY-TREATED-AS-LITERAL-REPETITION
- **Surface form**: believes a root of multiplicity $k$ contributes $k$ literal copies of
  $e^{rx}$, rather than $k$ genuinely independent solutions.
- **Birth type**: High severity (Blueprint's own declared severity — "multiplicity $k$" sounds
  like it should mean "the same thing $k$ times").
- **Repair**: re-walk the direct verification that $xe^x$ genuinely satisfies the ODE independently
  of $e^x$.

### MC-3: SOLUTION-SPACE-DIMENSIONALITY-UNVERIFIED
- **Surface form**: treats "the solutions form an $n$-dimensional vector space" as descriptive
  language taken on faith.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the vector-space label
  sounds like borrowed terminology rather than a checkable claim).
- **Repair**: re-walk the direct closure verification for a specific linear combination of
  solutions.

## Misconceptions

### MC-1: CHARACTERISTIC-POLYNOMIAL-ROOT-COUNT-DOUBTED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MULTIPLICITY-TREATED-AS-LITERAL-REPETITION
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: SOLUTION-SPACE-DIMENSIONALITY-UNVERIFIED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A degree-n characteristic polynomial is a promise kept by the Fundamental Theorem of
  Algebra — exactly n roots, every time, no matter how large n gets."**
- **Anti-analogy**: a repeated root is NOT the same solution showing up multiple times on a guest
  list — each multiplier x, x², ... introduces a genuinely distinct guest.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the degree-3 factoring $(r-1)(r-2)(r-3)=0$ example.
- **Demonstration 2 (targets MC-2)**: the triple-root $(r-1)^3=0$ example, verifying $xe^x$'s
  independence directly.
- **Demonstration 3 (targets MC-3)**: the direct closure verification for $3e^x-2e^{2x}$.

## Discovery Questions
1. "Does an nth-order linear ODE's characteristic polynomial always supply enough roots for all n
   needed solutions?"
2. "For a root of multiplicity 3, are the 3 solutions three literal copies of e^(rx)?"
3. "Is 'the ODE's solutions form an n-dimensional vector space' something you take on faith, or
   something checkable?"

## Teaching Sequence
1. **Representation shift**: the degree-$n$ characteristic polynomial and root-count guarantee,
   working Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the multiplicity-to-solution-form rule, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the verified-versus-assumed vector-space structure, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct degree-$n$ characteristic-polynomial factoring with roots
   and multiplicities identified, a correct multiplicity-to-solution-form application, and a
   correct closure-axiom explanation citing `math.linalg.vector-space`, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept doubt that a degree-$n$ characteristic polynomial supplies exactly $n$ roots
  counting multiplicity.
- Never accept a multiplicity-$k$ root's solutions written as $k$ literal copies of $e^{rx}$.
- Never accept "$n$-dimensional solution space" asserted without a closure-axiom justification.

## Voice Teaching Notes
- Say "how many roots does the Fundamental Theorem of Algebra guarantee here?" whenever a
  characteristic polynomial's degree is discussed.
- When a repeated root appears, ask "are these solutions genuinely independent, or just the same
  function repeated?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly finds a degree-$n$ characteristic polynomial's
  roots and multiplicities.
- **Rung 2 (application)**: learner correctly writes the independent solutions for a repeated
  root using the $x,x^2,\ldots$ multiplier pattern.
- **Rung 3 (transfer)**: learner correctly handles a 5th-order ODE with mixed real, repeated, and
  complex roots, and justifies the solution set's vector-space structure via closure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the degree-3 factoring example.
- If MC-2 recurs, re-verify $xe^x$'s independence directly.
- If MC-3 recurs, re-walk the direct closure verification.

## Memory Hooks
- "Degree n always gives exactly n roots, counting multiplicity — the Fundamental Theorem of
  Algebra guarantees it."
- "Multiplicity k means k NEW functions — 1, x, x², ... times e^(rx), never k copies."
- "n-dimensional solution space is checkable via closure — never just asserted."

## Transfer Connections
- `math.de.second-order-linear` (already authored, this campaign, Batch 150): supplies the
  degree-2 characteristic-equation and superposition framework this concept generalizes to degree
  $n$.
- `math.alg.polynomial-roots` (already authored, certified domain): supplies the Fundamental
  Theorem of Algebra's exact-root-count guarantee and multiplicity definition this concept directly
  reuses.
- `math.linalg.vector-space` (already authored, certified domain, formal KG cross-link): supplies
  the closure axioms this concept's "$n$-dimensional solution space" claim is verified against.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.higher-order-ode.md`, reused by
  reference for its degree-3 distinct-roots example, its triple-root multiplicity example, its
  closure-verification example, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own declared cross-link probe engaging
  `math.linalg.vector-space`, applying the characteristic-polynomial and closure-verification
  methods to a 5th-order structural-engineering beam-deflection equation with mixed root types.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-linear`/`math.alg.polynomial-roots`, unlocks none, cross_links
  `math.linalg.vector-space`, expert/apply, mastery_threshold 0.8, estimated_hours 5) was directly
  verified against the live KG and matches exactly. The declared cross-link
  `math.linalg.vector-space` was confirmed already authored, enabling a genuine cross-link probe.

## Version History
- 2026-09-19 (Batch 155): authored. Second entry this batch. Companion batch concept:
  `math.de.resonance`.

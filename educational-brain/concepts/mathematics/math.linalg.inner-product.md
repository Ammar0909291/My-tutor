# math.linalg.inner-product

## Identity
- **KG id**: `math.linalg.inner-product`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector-space`, `math.linalg.dot-product`
- **Unlocks**: `math.linalg.inner-product-space`
- **Cross-links**: `math.fnal.hilbert-space` (not yet authored — verified via `ls`; independence
  mode used, see Blueprint References)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
State the axioms of a real inner product — symmetry $\langle u,v\rangle=\langle v,u\rangle$,
bilinearity, and positive-definiteness $\langle v,v\rangle\ge0$ with equality iff $v=0$ — and
verify whether a proposed bilinear form on $\mathbb R^n$ or an abstract space (polynomials,
functions, matrices) satisfies all three, never assuming an inner product is merely a renaming of
the dot product; correctly check positive-definiteness EXPLICITLY rather than assuming any
symmetric bilinear form qualifies; and, for the complex case, state that CONJUGATE symmetry
$\langle u,v\rangle=\overline{\langle v,u\rangle}$ replaces plain symmetry.

## Core Understanding
THE DOT PRODUCT IS ONE EXAMPLE, NOT THE DEFINITION: a (real) inner product on a vector space $V$
is a function $\langle\cdot,\cdot\rangle:V\times V\to\mathbb R$ satisfying symmetry
($\langle u,v\rangle=\langle v,u\rangle$), bilinearity (linear in each argument), and
positive-definiteness ($\langle v,v\rangle\ge0$, equality iff $v=0$). `math.linalg.dot-product`'s
own $\sum u_iv_i$ satisfies all three and is the MOTIVATING special case — but the axiomatic
definition applies equally to spaces with no literal numeric components at all: on continuous
functions, $\langle f,g\rangle=\int_0^1f(x)g(x)\,dx$ satisfies symmetry (integrand order doesn't
matter), bilinearity (integration is linear), and positive-definiteness ($\int_0^1f(x)^2\,dx\ge0$,
zero only if $f\equiv0$) — a genuine inner product where "dot product" has no direct meaning at
all. Every inner product induces a norm $\|v\|=\sqrt{\langle v,v\rangle}$, well-defined precisely
because positive-definiteness guarantees a non-negative quantity under the square root.

POSITIVE-DEFINITENESS MUST BE CHECKED EXPLICITLY, SEPARATELY FROM SYMMETRY AND BILINEARITY: for
$\langle u,v\rangle=u_1v_1-u_2v_2$ on $\mathbb R^2$, symmetry and bilinearity both hold easily —
but $\langle v,v\rangle=v_1^2-v_2^2$, and at $v=(0,1)$: $\langle v,v\rangle=-1<0$, a NEGATIVE
self-pairing for a nonzero vector. This form satisfies two of the three axioms yet is genuinely
NOT a valid inner product — positive-definiteness is often the axiom most likely to be assumed
rather than independently verified, precisely because it is the one most often overlooked when
symmetry and bilinearity already "look fine."

THE COMPLEX CASE REQUIRES CONJUGATE SYMMETRY, NOT PLAIN SYMMETRY: on $\mathbb C^n$,
$\langle u,v\rangle=\sum u_i\overline{v_i}$ gives $\langle v,v\rangle=\sum|v_i|^2$, always a
non-negative REAL number even though the $v_i$ are complex — this is exactly what makes
positive-definiteness meaningful for a complex space (since complex numbers themselves aren't
ordered). Checking $\langle u,v\rangle=\langle v,u\rangle$ literally FAILS in general for complex
vectors (e.g. $u=(1,0),v=(i,0)$: $\langle u,v\rangle=-i\ne i=\langle v,u\rangle$), but the WEAKER
conjugate-symmetric identity $\langle v,u\rangle=\overline{\langle u,v\rangle}$ holds exactly
($\overline{-i}=i$) — the complex generalization replaces plain symmetry with this conjugate form
specifically so $\langle v,v\rangle$ comes out real.

## Mental Models
- **"Dot product is the leftmost branch of a much larger family — anything satisfying the same
  three axioms qualifies, components or not."**
- **"Positive-definiteness is the axiom most likely to be skipped because the other two 'look
  fine' — always test it with a deliberately chosen vector."**

## Why Students Fail

### MC-1: INNER-PRODUCT-IS-JUST-DOT-PRODUCT
- **Surface form**: treats "inner product" as merely a renaming of the standard dot product,
  missing the generalization to abstract spaces (polynomials, functions, matrices) and
  non-standard weighted inner products on $\mathbb R^n$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  KG already has a separate, dedicated dot-product concept, so a student who has just mastered it
  has strong incentive to assume this concept is a redundant restatement).
- **Repair**: re-verify the same three axioms directly on a genuinely component-free example
  (e.g. an integral-based function-space pairing).

### MC-2: ANY-SYMMETRIC-BILINEAR-FORM-QUALIFIES
- **Surface form**: assumes any symmetric, bilinear form is automatically a valid inner product,
  without checking positive-definiteness.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — positive-
  definiteness is the axiom most frequently skipped since the other two are often "obviously
  true" by inspection).
- **Repair**: re-test $\langle v,v\rangle$ explicitly with a deliberately chosen vector capable of
  exposing a sign failure.

### MC-3: COMPLEX-INNER-PRODUCT-IS-PLAIN-SYMMETRIC
- **Surface form**: applies plain symmetry to a complex inner product rather than the required
  conjugate symmetry.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity — the real case's
  formula is memorized and applied unchanged to $\mathbb C$ without noticing the conjugate is
  required).
- **Repair**: re-compute both sides directly for a concrete complex example, confirming
  conjugate — not plain — symmetry.

## Misconceptions

### MC-1: INNER-PRODUCT-IS-JUST-DOT-PRODUCT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ANY-SYMMETRIC-BILINEAR-FORM-QUALIFIES
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: COMPLEX-INNER-PRODUCT-IS-PLAIN-SYMMETRIC
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An inner product is a club with exactly three membership rules — symmetry, bilinearity,
  positive-definiteness — and the dot product is just one member, not the club's definition."**
- **Anti-analogy**: a form that looks "dot-product-like" (symmetric, bilinear) can still fail to
  be an inner product if it goes negative somewhere — resemblance is not membership.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: on continuous functions, $\langle f,g\rangle=
  \int_0^1f(x)g(x)\,dx$ has no finite list of components to "dot," yet satisfies all three axioms
  directly — a genuine inner product on an infinite-dimensional space.
- **Demonstration 2 (targets MC-2)**: $\langle u,v\rangle=u_1v_1-u_2v_2$ passes symmetry and
  bilinearity but fails positive-definiteness at $v=(0,1)$: $\langle v,v\rangle=-1<0$ — NOT a
  valid inner product despite passing two of three axioms.
- **Demonstration 3 (targets MC-3)**: on $\mathbb C^n$, $\langle u,v\rangle=\sum u_i\overline
  {v_i}$ gives $\langle v,v\rangle=\sum|v_i|^2\ge0$ (always real), while plain symmetry fails for
  $u=(1,0),v=(i,0)$ ($-i\ne i$) yet conjugate symmetry holds exactly ($\overline{-i}=i$).

## Discovery Questions
1. "Can polynomials or functions have an inner product, even though they have no numeric
   components to literally 'dot' together?"
2. "If a bilinear form is symmetric, is that enough to guarantee it's a valid inner product?"
3. "For a complex inner product, does $\langle u,v\rangle=\langle v,u\rangle$ hold exactly, the
   same as in the real case?"

## Teaching Sequence
1. **Anchor**: verify the three axioms on `math.linalg.dot-product`'s own familiar formula first,
   confirming consistency before generalizing.
2. **Representation shift**: Demonstration 1's function-space example, isolating MC-1 by removing
   numeric components entirely while the axioms still hold.
3. **Contrast pair**: Demonstration 2's failing indefinite form, isolating MC-2 by exposing a
   form that passes two axioms yet fails the third.
4. **Contrast pair**: Demonstration 3's complex case, isolating MC-3 by exposing conjugate — not
   plain — symmetry as the genuine requirement.
5. **Mastery gate**: require a correct axiom verification on an unfamiliar abstract-space form, a
   correct positive-definiteness test exposing a failure, and a correct complex conjugate-symmetry
   computation, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "it's not the dot product, so it can't be an inner product" — require the three
  axioms checked directly regardless of the space.
- Never accept positive-definiteness as verified without an explicit general-case argument or a
  deliberately chosen test vector.

## Voice Teaching Notes
- Say "does this have numeric components, or does it just need to satisfy the same three axioms?"
  whenever an unfamiliar candidate space is introduced.
- When positive-definiteness is claimed, ask "did you check the general case, or just one
  convenient vector?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies all three axioms for a new weighted or
  abstract-space candidate form.
- **Rung 2 (application)**: learner correctly identifies when a symmetric bilinear form fails to
  be an inner product by testing positive-definiteness with a deliberately chosen vector.
- **Rung 3 (transfer)**: learner correctly verifies conjugate symmetry (not plain symmetry) for a
  NEW complex-vector-space pairing, and correctly reasons about a non-numeric (e.g. matrix-based)
  inner product's validity.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the axioms directly on a genuinely component-free example.
- If MC-2 recurs, re-test positive-definiteness with a deliberately chosen vector.
- If MC-3 recurs, re-compute both sides directly for a concrete complex example.

## Memory Hooks
- "Dot product is one member of the inner-product family, not the whole family."
- "Symmetric and bilinear is not enough — positive-definiteness must be checked too."
- "Complex inner products conjugate on the swap — plain symmetry doesn't survive to $\mathbb C$."

## Transfer Connections
- `math.linalg.vector-space` (already authored): supplies the 8-axiom structure inner products
  are defined on top of, including abstract examples like polynomials and matrices.
- `math.linalg.dot-product` (already authored): supplies the motivating special case this concept
  generalizes, reused directly as the first verified example.
- `math.linalg.inner-product-space` (not yet authored): the KG's declared unlock, the formal
  structure of a vector space equipped with a chosen inner product.

## Cross-Subject Connections
- None formal — `math.fnal.hilbert-space` is declared as a cross-link in the KG but is not yet
  authored (confirmed via `ls`), so this entry uses independence mode per the established
  convention.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.inner-product.md`, reused by
  reference for its function-space axiom verification, its indefinite-form positive-definiteness
  failure, its complex conjugate-symmetry contrast, and its three-misconception registry
  (severity levels and birth types both adopted directly as declared, since this Blueprint states
  formal Type-equivalent trigger conditions for each).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining the
  trace-based inner product $\langle A,B\rangle=\mathrm{trace}(A^TB)$ on $2\times2$ matrices, its
  positive-definiteness (matching the sum-of-squared-entries pattern), and its symmetry proof via
  the transpose-of-a-product rule.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.vector-space`+`math.linalg.dot-product`, unlocks `math.linalg.inner-product-space`,
  cross_links `math.fnal.hilbert-space`, expert/understand, mastery_threshold 0.85,
  estimated_hours 4) was directly verified against the live KG and matches exactly. The
  Blueprint's own correctly-declared independence P76 mode (cross-link target confirmed
  unauthored via `ls`) required no correction.

## Version History
- 2026-09-18 (Batch 96): authored. Second entry this batch. Companion batch concept:
  `math.linalg.eigenspace`. `math.linalg` moves 35/61 → **36/61** this batch.

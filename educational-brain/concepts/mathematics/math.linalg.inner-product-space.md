# math.linalg.inner-product-space

## Identity
- **KG id**: `math.linalg.inner-product-space`
- **Domain**: math.linalg
- **Requires**: `math.linalg.inner-product`, `math.linalg.vector-space`
- **Unlocks**: `math.linalg.orthogonal-basis`, `math.linalg.gram-schmidt`
- **Cross-links**: `math.fnal.hilbert-space` (not yet authored, independence mode)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define an inner product space as a vector space equipped with an inner product that AUTOMATICALLY
induces a norm $\|v\|=\sqrt{\langle v,v\rangle}$; state and apply the Cauchy-Schwarz inequality
$|\langle u,v\rangle|\le\|u\|\|v\|$ (never reversed); and recognize the structure hierarchy inner
product space $\Rightarrow$ normed space $\Rightarrow$ metric space as a ONE-WAY chain of
implications (never assuming every normed space arises from some inner product), with a Hilbert
space requiring the genuinely ADDITIONAL condition of completeness (never conflated with an
ordinary inner product space).

## Core Understanding
THE INDUCED NORM ALWAYS EXISTS AND RECOVERS THE FAMILIAR NOTION OF LENGTH: every inner product
automatically induces a norm via $\|v\|=\sqrt{\langle v,v\rangle}$, well-defined since
$\langle v,v\rangle\ge0$ always (positive-definiteness). For $v=(1,2,2)$ in $\mathbb R^3$:
$\langle v,v\rangle=1+4+4=9$, giving $\|v\|=3$ — exactly the familiar Euclidean length, confirming
the induced norm recovers the already-known notion in the standard case.

THE STRUCTURE HIERARCHY IS ONE-DIRECTIONAL — NEVER ASSUMED TO REVERSE: inner product space
$\Rightarrow$ normed space $\Rightarrow$ metric space is a chain of STRICT implications. The
sup-norm $\|f\|_\infty=\sup_x|f(x)|$ on $C([a,b])$ is a genuine, valid norm (satisfies all norm
axioms) — but it provably does NOT arise from ANY inner product on $C([a,b])$. This demonstrates
the hierarchy's strictness directly: being a normed space does NOT automatically make something an
inner product space, even though every inner product space IS automatically a normed space —
the implication runs only ONE direction.

A HILBERT SPACE REQUIRES GENUINELY ADDITIONAL COMPLETENESS — NEVER SYNONYMOUS WITH "INNER PRODUCT
SPACE": a Hilbert space is specifically an inner product space that is ALSO complete (every Cauchy
sequence converges within the space). Completeness is a genuinely SEPARATE, additional property,
never automatic just from having an inner product. Finite-dimensional inner product spaces (like
$\mathbb R^n$) are always automatically complete, but infinite-dimensional ones may or may not
be — making the Hilbert-space qualifier a meaningful, non-automatic distinction specifically in
the infinite-dimensional setting, never a redundant restatement of "inner product space."

## Mental Models
- **"Every inner product gives you a norm for free — but plenty of legitimate norms simply don't
  come from any inner product at all."**
- **"Hilbert space = inner product space + completeness — the completeness qualifier is doing
  real, additional work, not a redundant restatement."**
- **"Cauchy-Schwarz says the inner product can never exceed the product of the vectors' own
  lengths — an echo of |cos θ|≤1."**

## Why Students Fail

### MC-1: NORMED-SPACE-ASSUMED-TO-IMPLY-INNER-PRODUCT-SPACE
- **Surface form**: believes the "inner product space implies normed space" implication reverses,
  i.e. every valid norm must come from some inner product.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the forward direction
  is easy to internalize correctly while silently assuming it reverses).
- **Repair**: present the sup-norm counterexample directly, establishing the implication's strict
  one-directionality.

### MC-2: HILBERT-SPACE-CONFLATED-WITH-INNER-PRODUCT-SPACE
- **Surface form**: treats "inner product space" and "Hilbert space" as synonymous, not
  recognizing completeness as a genuinely additional, non-automatic requirement.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without emphasis,
  completeness can seem like an automatic technicality rather than a genuine additional
  condition).
- **Repair**: re-anchor on "Hilbert space = inner product space + completeness," noting
  finite-dimensional spaces are automatically complete but infinite-dimensional ones may not be.

### MC-3: CAUCHY-SCHWARZ-DIRECTION-REVERSED
- **Surface form**: misremembers the Cauchy-Schwarz inequality's direction, believing
  $\|u\|\|v\|\le|\langle u,v\rangle|$ rather than the correct $|\langle u,v\rangle|\le\|u\|\|v\|$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the inequality's two
  sides are easy to transpose without a clear anchor for which side is bounded).
- **Repair**: re-derive via the $|\cos\theta|\le1$ geometric intuition — the inner product is
  bounded ABOVE by the product of lengths, never the reverse.

## Misconceptions

### MC-1: NORMED-SPACE-ASSUMED-TO-IMPLY-INNER-PRODUCT-SPACE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: HILBERT-SPACE-CONFLATED-WITH-INNER-PRODUCT-SPACE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: CAUCHY-SCHWARZ-DIRECTION-REVERSED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An inner product is a richer structure than a norm — it always builds you a norm for free,
  but a norm alone doesn't tell you enough to reconstruct an inner product."**
- **Anti-analogy**: a Hilbert space is NOT just another name for "inner product space" — it's an
  inner product space that has also passed the additional, genuinely separate completeness test.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the sup-norm-on-$C([a,b])$ counterexample, a valid norm
  provably not arising from any inner product.
- **Demonstration 2 (targets MC-2)**: the precise Hilbert-space definition, contrasted against
  "inner product space" alone, with the finite-vs-infinite-dimensional completeness distinction.
- **Demonstration 3 (targets MC-3)**: the direct Cauchy-Schwarz verification for
  $u=(1,0,2),v=(2,1,-1)$ in $\mathbb R^3$, confirming the correct inequality direction.

## Discovery Questions
1. "Since every inner product space is automatically a normed space, does that mean every normed
   space must also come from some inner product?"
2. "Is 'inner product space' just another name for 'Hilbert space,' or does Hilbert space require
   something additional?"
3. "Does the Cauchy-Schwarz inequality bound the inner product above by the product of lengths, or
   the other way around?"

## Teaching Sequence
1. **Representation shift**: the induced norm and Cauchy-Schwarz inequality, working
   Demonstration 3, isolating MC-3.
2. **Contrast pair**: the one-directional structure hierarchy, working Demonstration 1, isolating
   MC-1, and the completeness-as-extra-condition distinction, working Demonstration 2, isolating
   MC-2.
3. **Mastery gate**: require a correct induced-norm computation, a correct Cauchy-Schwarz
   verification, and a correct explanation of why the normed-to-inner-product implication doesn't
   reverse and what Hilbert space additionally requires, at the Blueprint's own stated MAMR of
   5/5.

## Tutor Actions
- Never accept a claim that every valid norm must arise from some inner product.
- Never accept "inner product space" and "Hilbert space" used interchangeably without noting
  completeness.
- Never accept the Cauchy-Schwarz inequality stated with the inequality direction reversed.

## Voice Teaching Notes
- Say "does every norm come from an inner product, or just some?" whenever the structure hierarchy
  is discussed.
- Ask "is that space also complete, or just an inner product space?" whenever "Hilbert space" is
  mentioned.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes an induced norm from a given inner product.
- **Rung 2 (application)**: learner correctly verifies the Cauchy-Schwarz inequality for specific
  vectors, in the correct direction.
- **Rung 3 (transfer)**: learner correctly explains why the sup-norm doesn't arise from an inner
  product, and correctly states what completeness adds beyond being an inner product space.

## Tutor Recovery Strategy
- If MC-1 recurs, re-present the sup-norm counterexample.
- If MC-2 recurs, re-anchor on the precise Hilbert-space definition.
- If MC-3 recurs, re-derive Cauchy-Schwarz via the $|\cos\theta|\le1$ intuition.

## Memory Hooks
- "Inner product space implies normed space — never the other way around."
- "Hilbert space needs completeness too — not just an inner product."
- "The inner product is bounded above by the product of lengths — never the reverse."

## Transfer Connections
- `math.linalg.inner-product` (already authored, certified domain): supplies the inner product
  itself this concept's induced norm and Cauchy-Schwarz inequality are built from.
- `math.linalg.vector-space` (already authored, certified domain): supplies the underlying
  vector-space structure this concept equips with an inner product.
- `math.linalg.orthogonal-basis`, `math.linalg.gram-schmidt` (KG's declared unlocks): the
  orthogonality-based basis structure and constructive algorithm this concept's inner product and
  induced norm directly enable.
- `math.fnal.hilbert-space` (not yet authored): the KG's declared cross-link, the full treatment
  of complete inner product spaces this concept's completeness discussion previews.

## Cross-Subject Connections
- Signal processing: the $L^2$ integral inner product $\langle f,g\rangle=\int_a^bf(x)g(x)\,dx$
  measuring "signal correlation," with the induced norm giving "signal energy."

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.inner-product-space.md`, reused by
  reference for its induced-norm and Cauchy-Schwarz worked examples, its sup-norm structure-
  hierarchy counterexample, and its three-misconception registry (severity levels adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe (pending `math.fnal.hilbert-space`'s
  authoring), applying the integral inner product and sup-norm contrast to a signal-processing
  scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.inner-product`/`math.linalg.vector-space`, unlocks
  `math.linalg.orthogonal-basis`/`math.linalg.gram-schmidt`, cross_links
  `math.fnal.hilbert-space`, expert/understand, mastery_threshold 0.85, estimated_hours 4) was
  directly verified against the live KG and matches exactly. `math.fnal.hilbert-space`
  independently re-confirmed still unauthored — the Blueprint's independence-mode deferral remains
  correct.

## Version History
- 2026-09-19 (Batch 173): authored. First entry this batch. Companion batch concept:
  `math.linalg.orthogonal-basis`.

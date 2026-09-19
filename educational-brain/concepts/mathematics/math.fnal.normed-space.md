# math.fnal.normed-space

## Identity
- **KG id**: `math.fnal.normed-space`
- **Domain**: math.fnal
- **Requires**: `math.linalg.vector-space`, `math.linalg.norm`
- **Unlocks**: `math.fnal.completeness`, `math.fnal.banach-space`
- **Cross-links**: `math.linalg.norm`, `math.real.metric-space`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Verify the three norm axioms (definiteness, homogeneity, triangle inequality) for a specific
example; verify every norm induces a metric $d(x,y)=\|x-y\|$ by checking each metric axiom
follows from a specific norm axiom — NEVER assumed automatically; and recognize a vector space
can carry MULTIPLE genuinely different norms — "the norm" is NEVER a single, space-independent
unambiguous quantity.

## Core Understanding
A NORM IS NEVER A SINGLE, SPACE-INDEPENDENT UNAMBIGUOUS QUANTITY — A VECTOR SPACE CAN CARRY
MULTIPLE VALID NORMS: for $v=(3,4)\in\mathbb{R}^2$, the Euclidean norm gives $\|v\|_2=5$, but the
sup-norm gives $\|v\|_\infty=\max(3,4)=4$ — a genuinely DIFFERENT number for the SAME vector. Both
independently satisfy all three norm axioms. Asking for "the norm" of $(3,4)$ without specifying
which norm is meaningless — a "normed space" always refers to the PAIR (vector space, specific
norm), NEVER the vector space alone; $\mathbb{R}^n$ alone supports infinitely many valid norms.

THE INDUCED METRIC'S AXIOMS FOLLOW DIRECTLY FROM THE NORM'S OWN AXIOMS — NEVER ASSUMED WITHOUT
VERIFICATION: $d(x,y)=\|x-y\|$'s symmetry, $d(x,y)=d(y,x)$, follows because
$\|x-y\|=\|-(y-x)\|=|-1|\|y-x\|=\|y-x\|$ — DIRECTLY from the norm's own homogeneity axiom with
$\alpha=-1$, never an independent fact requiring separate proof. Asserting the induced metric
satisfies the metric axioms without tracing each one back to the specific norm axiom that
justifies it is WRONG — the mechanism is a direct, step-by-step consequence, not a coincidence.

THE HOMOGENEITY AXIOM MUST BE CHECKED WITH A NEGATIVE SCALAR, NEVER ONLY POSITIVE ONES: for
$v=(3,4)$ with $\alpha=-2$: $\|-2v\|_2=\|(-6,-8)\|_2=\sqrt{36+64}=10=|-2|\cdot5$ — the ABSOLUTE
VALUE $|\alpha|=2$ correctly makes the result positive even though $\alpha$ itself is negative.
Testing homogeneity only with positive scalars misses that $\|\alpha x\|=|\alpha|\|x\|$ requires
the absolute value precisely BECAUSE norms are always nonnegative — $\|-3v\|=3\|v\|$, NEVER
$-3\|v\|$, since a norm can never be negative regardless of the scalar's sign.

## Mental Models
- **"A normed space is always a PAIR — vector space plus a specific norm choice — never assume
  there's only one possible norm for a given space."**
- **"Every metric axiom for the induced metric traces back to one specific norm axiom — you get
  metric-space structure for free, but only because each step is directly justified."**
- **"Homogeneity's absolute value exists precisely to handle negative scalars — a norm is never
  negative, whatever sign the scalar carries."**

## Why Students Fail

### MC-1: NORM-TREATED-AS-SPACE-INDEPENDENT-UNIQUE-QUANTITY
- **Surface form**: believes "the norm" of a vector is a single, unambiguous number independent
  of which norm function is chosen, rather than recognizing a vector space can carry multiple
  genuinely different valid norms.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — the
  everyday phrase "the norm of a vector" is used casually in `math.linalg.norm` without needing
  to distinguish between norm choices).
- **Repair**: work through Example 3's explicit two-norm comparison on the identical vector,
  showing genuinely different valid answers.

### MC-2: INDUCED-METRIC-AXIOMS-ASSUMED-WITHOUT-VERIFICATION
- **Surface form**: assumes the induced metric $d(x,y)=\|x-y\|$ automatically satisfies the
  metric axioms without connecting each metric axiom back to the specific norm axiom that
  justifies it.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the formula looks
  self-evidently valid without tracing the actual justification).
- **Repair**: re-derive the symmetry check explicitly, $d(y,x)=\|y-x\|=|-1|\|x-y\|=\|x-y\|=d(x,y)$.

### MC-3: NORM-AXIOMS-CHECKED-ONLY-FOR-POSITIVE-SCALARS
- **Surface form**: when verifying homogeneity $\|\alpha x\|=|\alpha|\|x\|$, tests only positive
  scalars and misses the absolute-value requirement for negative $\alpha$.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — positive-scalar
  examples dominate early practice).
- **Repair**: re-verify explicitly with a negative scalar, confirming the absolute value correctly
  handles the sign.

## Misconceptions

### MC-1: NORM-TREATED-AS-SPACE-INDEPENDENT-UNIQUE-QUANTITY
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: INDUCED-METRIC-AXIOMS-ASSUMED-WITHOUT-VERIFICATION
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: NORM-AXIOMS-CHECKED-ONLY-FOR-POSITIVE-SCALARS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A normed space is like a ruler paired with a specific scale marking — the same stick can
  carry a metric ruler or an imperial one, and 'the length' means nothing until you say which."**
- **Anti-analogy**: the induced metric isn't a lucky coincidence that happens to satisfy the
  metric axioms — each axiom is a direct, traceable consequence of a specific norm axiom.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $(3,4)$ Euclidean-versus-sup-norm two-different-answers
  comparison.
- **Demonstration 2 (targets MC-2)**: the line-by-line induced-metric-axiom-from-norm-axiom
  derivation.
- **Demonstration 3 (targets MC-3)**: the $\alpha=-2$ homogeneity verification.

## Discovery Questions
1. "For the vector (3,4), is its 'norm' simply and unambiguously the number 5?"
2. "Does the induced metric's symmetry need independent proof, or does it follow directly from a
   specific norm axiom?"
3. "When checking homogeneity, is it enough to test only positive scalars?"

## Teaching Sequence
1. **Representation shift**: work Example 1's three-axiom verification, grounded in the known
   Euclidean norm, then Example 2's induced-metric computation.
2. **Contrast pair**: work Example 3's two-norm comparison on the same vector, isolating MC-1;
   then walk the induced-metric-axiom derivation line by line, isolating MC-2.
3. **Mastery gate**: require correct three-axiom verification (including a negative-scalar
   homogeneity check, isolating MC-3), a correct induced-distance computation, and a correct
   explanation of why $\|x-y\|=0 \iff x=y$, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "the norm" of a vector stated without specifying which norm.
- Never accept the induced metric's axioms asserted without tracing each to a specific norm axiom.
- Never accept homogeneity verified using only positive scalars.

## Voice Teaching Notes
- Say "which norm — Euclidean, sup, or something else?" whenever "the norm" is invoked without
  qualification.
- Ask "which norm axiom justifies that metric property?" whenever the induced metric is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies all three norm axioms, including with a
  negative scalar.
- **Rung 2 (application)**: learner correctly computes the induced distance between two vectors
  and traces each metric axiom to its norm-axiom justification.
- **Rung 3 (transfer)**: learner correctly identifies the specific inducing norm for named
  metric-space examples from `math.real.metric-space`.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the two-norm same-vector comparison.
- If MC-2 recurs, re-derive the symmetry check explicitly from homogeneity.
- If MC-3 recurs, re-verify homogeneity with a negative scalar.

## Memory Hooks
- "A normed space is a pair — vector space plus a chosen norm, never the space alone."
- "Every metric axiom traces back to a specific norm axiom — never assumed for free."
- "Homogeneity's absolute value handles negative scalars — norms are never negative."

## Transfer Connections
- `math.linalg.norm` (already authored, cross-link): supplies the concrete Euclidean/p-norm
  construction this concept abstracts into a general axiomatic definition.
- `math.real.metric-space` (already authored, cross-link): supplies the metric-space axioms this
  concept's induced metric directly satisfies.

## Cross-Subject Connections
- Numerical analysis: choosing between the 2-norm and infinity-norm to measure error or
  convergence is a direct, practical instance of this concept's core lesson that norm choice
  matters.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.normed-space.md`, reused by reference
  for its three worked examples, its dual cross-link engagement, and its three-misconception
  registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging both `math.linalg.norm` (citing
  its specific axiom statements to justify the induced-metric verification) and
  `math.real.metric-space` (identifying the specific inducing norm for its named examples).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.vector-space`/`math.linalg.norm`, unlocks `math.fnal.completeness`/
  `math.fnal.banach-space`, cross_links `math.linalg.norm`/`math.real.metric-space`,
  expert/understand, mastery_threshold 0.85, estimated_hours 4) was directly verified against the
  live KG and matches exactly. Both named cross-link targets reconfirmed authored in the live EB
  corpus directory listing, matching the Blueprint's own dual cross-link-probe determination.

## Version History
- 2026-09-19 (Batch 225): authored. First entry this batch. Companion batch concept:
  `math.fnal.convolution`.

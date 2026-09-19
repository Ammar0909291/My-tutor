# math.de.inverse-laplace

## Identity
- **KG id**: `math.de.inverse-laplace`
- **Domain**: math.de
- **Requires**: `math.de.laplace-properties`, `math.calc.partial-fractions`
- **Unlocks**: `math.de.laplace-ode`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Recognize inverting $F(s)$ as a DIRECT APPLICATION of `math.calc.partial-fractions`'s own
decomposition method (never a new, separate technique); match each decomposed piece against
already-established transform PAIRS (run in reverse) and combine via LINEARITY (never requiring
extra justification beyond linearity itself); and correctly handle a repeated linear factor,
matching it to the DISTINCT $te^{at}$-type pair — never the same $e^{at}$ pair used for a simple
factor.

## Core Understanding
INVERTING $F(s)$ USES THE SAME PARTIAL-FRACTION DECOMPOSITION — NEVER A NEW TECHNIQUE: for
$F(s)=\frac{3s+1}{(s-1)(s+2)}$: the EXACT same cover-up method already known gives
$A=\left.\frac{3s+1}{s+2}\right|_{s=1}=4/3$, $B=\left.\frac{3s+1}{s-1}\right|_{s=-2}=5/3$ — so
$F(s)=\frac{4/3}{s-1}+\frac{5/3}{s+2}$. The KEY difference from the calculus use-case: each piece
is now MATCHED against a transform pair, never integrated.

INVERTING PIECE-BY-PIECE AND SUMMING IS DIRECTLY JUSTIFIED BY LINEARITY — NEVER REQUIRING EXTRA
CHECKING: matching each piece against $\mathcal{L}^{-1}\{1/(s-a)\}=e^{at}$: $\frac{4/3}{s-1}\to
\frac43e^t$, $\frac{5/3}{s+2}\to\frac53e^{-2t}$. Combining via linearity:
$f(t)=\frac43e^t+\frac53e^{-2t}$ — VERIFIED by forward-transforming back:
$\frac43\cdot\frac1{s-1}+\frac53\cdot\frac1{s+2}=\frac{3s+1}{(s-1)(s+2)}=F(s)$ ✓. Linearity
DIRECTLY guarantees the summed pieces recover the correct $f(t)$, never needing an unspecified
additional check.

A REPEATED LINEAR FACTOR MATCHES A GENUINELY DIFFERENT $te^{at}$ PAIR — NEVER THE SAME $e^{at}$
PAIR: for $F(s)=2/(s-3)^2$: this is NOT $2e^{3t}$ (a naive guess ignoring the squared
denominator) — the correct pair is $\mathcal{L}^{-1}\{1/(s-a)^2\}=te^{at}$, giving $f(t)=2te^{3t}$.
Verified: $\mathcal{L}\{2te^{3t}\}(s)=2/(s-3)^2=F(s)$ ✓ — the repeated factor genuinely requires
the DISTINCT power-of-$t$ pattern, mirroring the $e^{rx},xe^{rx}$ repeated-root pattern already
familiar from characteristic-equation solutions.

## Mental Models
- **"Inverting a Laplace transform is partial fractions with a different final step — match
  against a table instead of integrating."**
- **"A repeated factor's inverse always carries an extra t — never just the plain exponential
  repeated."**

## Why Students Fail

### MC-1: INVERSE-LAPLACE-ASSUMED-NEW-DECOMPOSITION-TECHNIQUE
- **Surface form**: believes inverting a Laplace transform requires a new decomposition technique
  specific to Laplace transforms.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the Laplace-transform
  context feels specialized enough to warrant its own new machinery).
- **Repair**: re-walk the direct reuse of the cover-up method for $F(s)=\frac{3s+1}{(s-1)(s+2)}$.

### MC-2: PIECE-WISE-INVERSION-SUM-ASSUMED-TO-NEED-EXTRA-JUSTIFICATION
- **Surface form**: believes summing individually-inverted pieces requires additional checking
  beyond linearity, or isn't valid.
- **Birth type**: High severity (Blueprint's own declared severity — combining separately-derived
  pieces feels like it should need extra verification).
- **Repair**: re-walk the verified forward-transform check confirming linearity's direct
  guarantee.

### MC-3: REPEATED-FACTOR-INVERSE-ASSUMED-SAME-AS-SIMPLE-FACTOR
- **Surface form**: believes $1/(s-a)^2$ inverts to the same $e^{at}$ pair as $1/(s-a)$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the squared denominator
  looks like a minor variation rather than a genuinely different transform pair).
- **Repair**: re-walk the verified $te^{3t}$ pair for $2/(s-3)^2$.

## Misconceptions

### MC-1: INVERSE-LAPLACE-ASSUMED-NEW-DECOMPOSITION-TECHNIQUE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: PIECE-WISE-INVERSION-SUM-ASSUMED-TO-NEED-EXTRA-JUSTIFICATION
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: REPEATED-FACTOR-INVERSE-ASSUMED-SAME-AS-SIMPLE-FACTOR
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Recovering f(t) from F(s) is decomposition you already know, followed by a table lookup
  instead of an integral."**
- **Anti-analogy**: a repeated denominator factor is NOT a doubled version of the simple case —
  it's a structurally different pair carrying an explicit factor of t.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct cover-up decomposition of
  $F(s)=\frac{3s+1}{(s-1)(s+2)}$.
- **Demonstration 2 (targets MC-2)**: the piece-matching, linearity-combination, and
  forward-transform verification.
- **Demonstration 3 (targets MC-3)**: the $2/(s-3)^2\to2te^{3t}$ verified pair.

## Discovery Questions
1. "Does inverting a Laplace transform require a new decomposition technique, or does it directly
   reuse partial fractions?"
2. "After inverting each decomposed piece, is it valid to simply sum the results, or does
   something additional need checking?"
3. "Does 1/(s−a)² invert to the same e^(at) pair as 1/(s−a), or to a genuinely different
   function?"

## Teaching Sequence
1. **Representation shift**: the direct partial-fraction decomposition reuse, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the piece-matching-plus-linearity procedure with verification, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the repeated-factor's distinct $te^{at}$ pattern, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct partial-fraction decomposition of a rational $F(s)$, a
   correct piece-by-piece inversion combined via linearity and verified by forward transform, and
   a correct repeated-factor inversion, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that inverting a Laplace transform requires a technique other than
  partial-fraction decomposition.
- Never accept piece-wise inversion summed without citing linearity as the direct justification.
- Never accept a repeated linear factor inverted using the simple $e^{at}$ pair instead of
  $te^{at}$.

## Voice Teaching Notes
- Say "is this a new technique, or the same decomposition you already know?" whenever inverse
  Laplace transformation begins.
- When a repeated factor appears, ask "does this need the plain exponential pair, or the t-times-
  exponential pair?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly decomposes a rational $F(s)$ via partial fractions.
- **Rung 2 (application)**: learner correctly inverts each piece and combines via linearity,
  verified against the original $F(s)$.
- **Rung 3 (transfer)**: learner correctly inverts a transform with a repeated factor arising from
  a solved circuit ODE.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct cover-up decomposition.
- If MC-2 recurs, re-walk the forward-transform verification.
- If MC-3 recurs, re-walk the $te^{3t}$ verified pair.

## Memory Hooks
- "Inverting F(s) is partial fractions, then table lookup — not a new technique."
- "Linearity directly guarantees summing inverted pieces gives the correct f(t)."
- "A repeated factor always carries a factor of t — never the plain exponential alone."

## Transfer Connections
- `math.de.laplace-properties` (already authored, this campaign, Batch 157): supplies linearity,
  the shifting theorems, and standard transform pairs this concept's matching step directly
  reuses.
- `math.calc.partial-fractions` (already authored, certified domain): supplies the decomposition
  method this concept's first step directly applies.
- `math.de.laplace-ode` (not yet authored): the KG's declared unlock, solving ODEs via the full
  forward-transform-then-invert pipeline using this concept's inversion technique as its final
  step.

## Cross-Subject Connections
- Electrical engineering: recovering time-domain circuit responses from transformed solutions.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.inverse-laplace.md`, reused by reference
  for its cover-up decomposition example, its verified piece-matching-and-linearity example, its
  repeated-factor example, and its three-misconception registry (severity levels adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe, recovering a circuit's time-domain
  response from a transformed solution with a repeated factor.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.laplace-properties`/`math.calc.partial-fractions`, unlocks `math.de.laplace-ode`,
  cross_links none, expert/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 158): authored. First entry this batch. Companion batch concept:
  `math.de.frobenius-method`.

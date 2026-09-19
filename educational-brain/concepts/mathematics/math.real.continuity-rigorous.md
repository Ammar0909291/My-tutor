# math.real.continuity-rigorous

## Identity
- **KG id**: `math.real.continuity-rigorous`
- **Domain**: math.real
- **Requires**: `math.real.metric-space`, `math.calc.continuity`
- **Unlocks**: `math.real.extreme-value-theorem`, `math.real.ivt`
- **Cross-links**: `math.calc.continuity` (already authored, confirmed via `ls`; genuine
  cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
State and apply the $\varepsilon$-$\delta$ definition of continuity at a point
($\forall\varepsilon>0\,\exists\delta>0: |x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon$),
correctly treating $\delta$ as PRODUCED IN RESPONSE TO an arbitrary given $\varepsilon$, never
chosen first; apply the SEQUENTIAL criterion requiring EVERY sequence $x_n\to a$ to satisfy
$f(x_n)\to f(a)$, not just one convenient sequence; and distinguish "$f$ is defined near $a$" from
"$f$ is continuous at $a$" — definedness says nothing about whether the limit actually equals
$f(a)$.

## Core Understanding
$\delta$ IS PRODUCED AFTER $\varepsilon$ IS GIVEN, NEVER CHOSEN FIRST: proving $f(x)=2x+1$
continuous at $a=3$ ($f(3)=7$): given ARBITRARY $\varepsilon>0$, compute
$|f(x)-7|=|2x-6|=2|x-3|$. Need $2|x-3|<\varepsilon$, i.e. $|x-3|<\varepsilon/2$ — so choose
$\delta=\varepsilon/2$, a FORMULA depending on $\varepsilon$, discovered by solving the inequality
BACKWARD. This works for every $\varepsilon>0$ by that formula. Picking $\delta$ FIRST (e.g.
$\delta=0.01$) and then checking which $\varepsilon$ it happens to satisfy (say $\varepsilon\ge
0.02$) is NOT a proof — it only handles those specific $\varepsilon$ values, never an arbitrary
one, missing arbitrarily small $\varepsilon$ entirely.

THE SEQUENTIAL CRITERION REQUIRES EVERY SEQUENCE, NEVER JUST ONE: for $f(x)=x$ if $x\ne0$, $f(0)=1$,
at $a=0$: the sequence $x_n=1/n\to0$ gives $f(x_n)=1/n\to0\ne1=f(0)$ — ALREADY revealing
discontinuity. A single FAILING sequence is fully sufficient to prove discontinuity, but a single
SUCCEEDING sequence proves nothing — continuity requires the implication to hold for EVERY
sequence converging to $a$, and checking only one convenient (or degenerate) sequence can wrongly
suggest continuity that a different sequence would immediately disprove.

"DEFINED NEARBY" IS NOT "CONTINUOUS" — THE LIMIT MUST ALSO MATCH THE ACTUAL VALUE: for
$g(x)=x^2$ if $x<2$, $g(x)=x+5$ if $x\ge2$, at $a=2$: $g$ is defined at EVERY real number, no
domain gaps anywhere. But as $x\to2^-$, $g(x)\to4$; as $x\to2^+$, $g(x)\to7$ — these ONE-SIDED
LIMITS DISAGREE, so $\lim_{x\to2}g(x)$ doesn't exist, and $g$ is discontinuous at 2 DESPITE being
fully defined everywhere nearby. "Fully defined nearby" and "continuous" are entirely different
claims.

## Mental Models
- **"$\varepsilon$ comes first, always — $\delta$ is manufactured to order, never picked in
  advance and then tested against whatever $\varepsilon$ it happens to survive."**
- **"A function's domain having no gaps says nothing about whether its graph has a jump — those
  are two completely separate questions."**

## Why Students Fail

### MC-1: DELTA-CHOSEN-BEFORE-EPSILON
- **Surface form**: picks a specific $\delta$ first, then checks what $\varepsilon$ it happens to
  satisfy, reversing the required logical order.
- **Birth type**: Foundational (Blueprint's own declared status — the single most common
  logical-order error across all of real analysis, inverting the entire meaning of the
  definition).
- **Repair**: re-derive $\delta$ by solving the inequality backward from an arbitrary
  $\varepsilon$, never starting from a chosen $\delta$.

### MC-2: ONE-SEQUENCE-CONFIRMS-SEQUENTIAL-CONTINUITY
- **Surface form**: checks the sequential criterion using only one (often the simplest) sequence
  converging to $a$, and declares continuity confirmed.
- **Birth type**: a natural shortcut when one sequence happens to behave nicely, obscuring that
  the criterion is a universal claim over ALL sequences.
- **Repair**: re-check with a genuinely different sequence (e.g. approaching from another
  direction), showing it can reveal a failure the first sequence missed.

### MC-3: DEFINED-NEARBY-MEANS-CONTINUOUS
- **Surface form**: assumes a function defined at every point near $a$ (no domain gaps) must be
  continuous there.
- **Birth type**: conflates two genuinely separate properties — domain completeness and
  limit-value agreement.
- **Repair**: re-check the one-sided limits directly at the suspicious seam point, showing they
  can disagree despite full definedness.

## Misconceptions

### MC-1: DELTA-CHOSEN-BEFORE-EPSILON
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: ONE-SEQUENCE-CONFIRMS-SEQUENTIAL-CONTINUITY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: DEFINED-NEARBY-MEANS-CONTINUOUS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"The ε-δ definition is like a customer demanding an arbitrarily tight tolerance and the
  factory having to prove, for ANY demand however strict, that a matching input tolerance
  exists — never the factory picking its own tolerance first and hoping it satisfies whatever the
  customer eventually asks."**
- **Anti-analogy**: a gap-free domain does NOT guarantee a gap-free graph — a function can be
  defined at literally every point and still jump abruptly at one of them.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $f(x)=2x+1$ backward-derivation proof, $\delta=
  \varepsilon/2$, contrasted against an invalid $\delta$-first attempt.
- **Demonstration 2 (targets MC-2)**: the step function at $a=0$, where $x_n=1/n\to0$ alone
  reveals discontinuity that a degenerate constant sequence would miss.
- **Demonstration 3 (targets MC-3)**: the piecewise $g(x)$ example, fully defined everywhere yet
  discontinuous at $a=2$ due to disagreeing one-sided limits.

## Discovery Questions
1. "If a δ-value is found that makes the tolerance condition true for one specific ε, is the
   function proven continuous?"
2. "If one sequence converging to a point gives the expected limit, is that enough to confirm
   continuity there?"
3. "If a function is defined at every point near a, with no domain gaps, must it be continuous
   there?"

## Teaching Sequence
1. **Representation shift**: the full backward-derivation ε-δ proof for a linear function,
   isolating MC-1.
2. **Contrast pair**: δ-first versus ε-first-then-δ on the same function; one convenient sequence
   versus a genuinely revealing one; a fully-defined-nearby function that still fails continuity —
   isolating MC-1, MC-2, and MC-3 respectively.
3. **Mastery gate**: require a correct ε-δ proof producing δ as a formula in ε, a correct
   multi-sequence continuity/discontinuity determination, and a correct defined-versus-continuous
   judgment for a seam-point function, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a δ chosen before ε as a valid continuity proof.
- Never accept continuity confirmed from checking only one sequence.
- Never accept "defined at every nearby point" as sufficient evidence for continuity.

## Voice Teaching Notes
- Say "did you produce δ from an arbitrary ε, or pick δ first and see what ε it satisfies?"
  whenever an ε-δ proof is reviewed.
- When continuity is judged via sequences, ask "have you checked more than one sequence, from
  different directions or patterns?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly produces δ as a formula in ε for a new linear
  function.
- **Rung 2 (application)**: learner correctly uses two distinct sequences to determine
  continuity or discontinuity at a seam point.
- **Rung 3 (transfer)**: learner correctly constructs a full ε-δ proof for a nonlinear function
  (e.g. $x^2$) using a preliminary δ≤1 restriction, and explains what the rigorous proof adds
  beyond citing an already-known "polynomials are continuous" fact.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive δ backward from an arbitrary ε.
- If MC-2 recurs, re-check with a genuinely different sequence.
- If MC-3 recurs, re-check the one-sided limits directly at the seam point.

## Memory Hooks
- "ε comes first, always — δ is manufactured in response, never chosen in advance."
- "One successful sequence proves nothing; one failing sequence proves discontinuity."
- "A gap-free domain says nothing about a gap-free graph."

## Transfer Connections
- `math.real.metric-space` (already authored, this campaign, Batch 124): supplies the open-ball
  machinery this concept's open-set/preimage characterization is stated in.
- `math.calc.continuity` (already authored, certified domain): supplies the informal limit-based
  definition this concept sharpens into the rigorous ε-δ form.
- `math.real.extreme-value-theorem` (not yet authored): the KG's declared unlock, relying on this
  concept's rigorous continuity plus compactness to guarantee attained maxima/minima.
- `math.real.ivt` (not yet authored): the KG's declared unlock, whose rigorous proof uses the
  ε-δ (or equivalently sequential) definition established here.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.continuity-rigorous.md`, reused by
  reference for its backward-derivation ε-δ proof, its δ-first-versus-ε-first contrast, its
  sequential-criterion multi-sequence demonstration, its defined-versus-continuous seam-point
  example, and its three-misconception registry (Foundational status for MC-1 adopted directly as
  declared).
- Transfer probe: the Blueprint's own cross-link-probe against `math.calc.continuity`,
  constructing a full ε-δ proof for $x^2$ with the δ≤1 restriction technique, and arguing for the
  value of the rigorous proof beyond citing an already-known theorem.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.metric-space`/`math.calc.continuity`, unlocks `math.real.extreme-value-theorem`/
  `math.real.ivt`, cross_links `math.calc.continuity`, expert/apply, mastery_threshold 0.9,
  estimated_hours 6) was directly verified against the live KG and matches exactly. The
  Blueprint's own cross-link-probe P76 mode was independently re-verified via `ls
  educational-brain/concepts/mathematics/` (`math.calc.continuity` genuinely authored) and
  required no correction.

## Version History
- 2026-09-19 (Batch 130): authored. Second entry this batch. Companion batch concept:
  `math.prob.markov-inequality`.

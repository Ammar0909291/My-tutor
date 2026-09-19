# math.de.laplace-properties

## Identity
- **KG id**: `math.de.laplace-properties`
- **Domain**: math.de
- **Requires**: `math.de.laplace-transform`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
State and apply LINEARITY $\mathcal{L}\{af+bg\}=aF+bG$ (a direct consequence of the integral's own
linearity, never a special Laplace-specific trick); apply the FIRST shifting theorem
$\mathcal{L}\{e^{at}f\}(s)=F(s-a)$ (a direct SUBSTITUTION into an already-known $F(s)$, never
requiring a new integral); and apply the SECOND shifting theorem (Heaviside step)
$\mathcal{L}\{f(t-c)u(t-c)\}=e^{-cs}F(s)$, correctly distinguishing its MULTIPLICATIVE outcome from
the first theorem's ARGUMENT-shift outcome — never conflating the two.

## Core Understanding
LINEARITY IS ORDINARY INTEGRAL LINEARITY — NEVER A SEPARATE LAPLACE-SPECIFIC RULE: for
$\mathcal{L}\{3e^{2t}-5\sin t\}(s)$: using already-known $\mathcal{L}\{e^{2t}\}=1/(s-2)$ and
$\mathcal{L}\{\sin t\}=1/(s^2+1)$: linearity gives
$3/(s-2)-5/(s^2+1)$ DIRECTLY — no new integral computed, just combining known pieces. This follows
because integration itself splits sums and pulls out constants, always.

THE FIRST SHIFTING THEOREM IS A DIRECT SUBSTITUTION $s\to s-a$ — NEVER A NEW INTEGRAL: for
$\mathcal{L}\{e^{3t}\cos(2t)\}(s)$: starting from the known $F(s)=\mathcal{L}\{\cos(2t)\}=
s/(s^2+4)$, the theorem gives $F(s-3)=(s-3)/[(s-3)^2+4]$ — obtained by DIRECTLY replacing $s$ with
$s-3$, with zero new integral evaluation.

THE SECOND SHIFTING THEOREM PRODUCES A MULTIPLICATIVE FACTOR — GENUINELY DIFFERENT FROM THE FIRST
THEOREM'S ARGUMENT SHIFT: for $\mathcal{L}\{(t-2)^2u(t-2)\}(s)$: using known
$F(s)=\mathcal{L}\{t^2\}=2/s^3$, the theorem gives $e^{-2s}F(s)=2e^{-2s}/s^3$ — a MULTIPLICATIVE
factor $e^{-2s}$ applied to $F(s)$, contrasted directly with the first theorem's $F(s-3)$
ARGUMENT shift. Delaying in TIME multiplies by $e^{-cs}$; multiplying by $e^{at}$ in TIME shifts
the ARGUMENT — these are opposite mechanisms, never interchangeable.

## Mental Models
- **"Linearity of the transform is just linearity of the integral — nothing Laplace-specific to
  memorize separately."**
- **"Multiply by e^(at) in time → shift the argument of F. Delay in time → multiply F by e^(−cs).
  Two genuinely different shifts, easy to confuse because both are called 'shifting.'"**

## Why Students Fail

### MC-1: LINEARITY-ASSUMED-TO-REQUIRE-RE-DERIVATION
- **Surface form**: believes applying linearity requires re-deriving each piece's transform from
  the defining integral.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the transform's own
  integral definition is the most salient memory, obscuring that known pieces combine directly).
- **Repair**: re-walk the direct combination of already-known transforms for $3e^{2t}-5\sin t$.

### MC-2: FIRST-SHIFTING-THEOREM-ASSUMED-TO-NEED-NEW-INTEGRAL
- **Surface form**: believes computing $\mathcal{L}\{e^{at}f(t)\}(s)$ requires evaluating a
  brand-new integral, missing the direct $s\to s-a$ substitution mechanism.
- **Birth type**: High severity (Blueprint's own declared severity — the presence of a new function
  $e^{at}f(t)$ suggests a fresh computation is needed).
- **Repair**: re-walk the direct $s\to s-3$ substitution for $e^{3t}\cos(2t)$.

### MC-3: SHIFTING-THEOREMS-CONFLATED
- **Surface form**: believes the first and second shifting theorems produce the same kind of
  result (both argument-shifts, or both multiplicative factors).
- **Birth type**: High severity (Blueprint's own declared severity — both are called "shifting
  theorems," inviting conflation of their genuinely different mechanisms).
- **Repair**: re-walk the direct contrast between $F(s-3)$ (argument shift) and $e^{-2s}F(s)$
  (multiplicative factor).

## Misconceptions

### MC-1: LINEARITY-ASSUMED-TO-REQUIRE-RE-DERIVATION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: FIRST-SHIFTING-THEOREM-ASSUMED-TO-NEED-NEW-INTEGRAL
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: SHIFTING-THEOREMS-CONFLATED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Linearity lets you build any transform from LEGO pieces you already own — never rebuild a
  piece from scratch."**
- **Anti-analogy**: the first and second shifting theorems are NOT two flavors of the same trick —
  one shifts where you look (the argument), the other multiplies what you see (a factor), based
  on whether the shift happens before or after transforming.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct linearity combination for $3e^{2t}-5\sin t$.
- **Demonstration 2 (targets MC-2)**: the direct $s\to s-3$ substitution for $e^{3t}\cos(2t)$.
- **Demonstration 3 (targets MC-3)**: the $F(s-3)$ versus $e^{-2s}F(s)$ side-by-side contrast.

## Discovery Questions
1. "Does applying linearity require re-deriving the transform from the defining integral each
   time, or can you simply combine already-known standard transforms?"
2. "Does computing L{e^(at)f(t)}(s) require evaluating a brand-new integral, or can it be obtained
   directly by substitution?"
3. "Do the first and second shifting theorems produce the same kind of result, or genuinely
   different kinds?"

## Teaching Sequence
1. **Representation shift**: linearity as ordinary integral linearity, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the first shifting theorem's direct substitution, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the two shifting theorems' genuinely different outcomes, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct linearity-based combination, a correct first-shifting-
   theorem application, and a correct second-shifting-theorem application with the distinction
   from the first stated explicitly, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept linearity applied by re-deriving each piece from the integral definition.
- Never accept the first shifting theorem computed via a fresh integral rather than direct
  substitution.
- Never accept the first and second shifting theorems conflated as producing the same kind of
  result.

## Voice Teaching Notes
- Say "can you just combine known transforms, or do you need a new integral?" whenever a linear
  combination is transformed.
- When a shifting theorem is applied, ask "is this an argument shift, or a multiplicative
  factor?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly combines known transforms via linearity.
- **Rung 2 (application)**: learner correctly applies the first shifting theorem via direct
  substitution.
- **Rung 3 (transfer)**: learner correctly distinguishes and applies both shifting theorems to two
  structurally different circuit-signal scenarios (decaying oscillation versus delayed
  oscillation).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct linearity combination.
- If MC-2 recurs, re-walk the direct $s\to s-3$ substitution.
- If MC-3 recurs, re-walk the argument-shift-versus-multiplicative-factor contrast.

## Memory Hooks
- "Linearity is just integral linearity — combine known pieces directly."
- "Multiply by e^(at) before transforming: shift the argument. Delay in time: multiply by
  e^(−cs)."
- "The two shifting theorems are opposite mechanisms, not interchangeable."

## Transfer Connections
- `math.de.laplace-transform` (already authored, this campaign, Batch 156): supplies the
  transform's integral definition and derivative rule this concept's property toolkit builds
  directly on and reuses.
- `math.de.inverse-laplace` (not yet authored): the KG's declared related concept, the reverse
  operation these properties help compute.

## Cross-Subject Connections
- Electrical engineering: circuit analysis with decaying and delayed signals.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.laplace-properties.md`, reused by
  reference for its linearity, first-shifting, and second-shifting worked examples, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, distinguishing a decaying
  oscillation circuit (first shifting theorem) from a delayed oscillation circuit (second shifting
  theorem).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.laplace-transform`, unlocks none, cross_links none, expert/apply, mastery_threshold
  0.85, estimated_hours 5) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 157): authored. First entry this batch. Companion batch concept:
  `math.de.convolution-theorem`.

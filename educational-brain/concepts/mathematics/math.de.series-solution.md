# math.de.series-solution

## Identity
- **KG id**: `math.de.series-solution`
- **Domain**: math.de
- **Requires**: `math.de.second-order-linear`, `math.calc.power-series`
- **Unlocks**: none
- **Cross-links**: `math.calc.taylor-series` (Blueprint's own Component 7 declared this concept
  NOT YET authored at write-time — it has SINCE been authored (Batch 65, well before this campaign
  reached this concept); upgraded to a genuine cross-link probe, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Apply the series ansatz $y=\sum a_nx^n$ to a homogeneous second-order linear ODE, substituting
term-by-term derivatives; derive the RECURRENCE relation by RE-INDEXING all sums to a common power
of $x$ before matching coefficients (never guessing individual coefficients directly); and state
the ORDINARY POINT condition ($P,Q$ analytic at the expansion point) required for this method to
apply, recognizing when it fails (a singular point, requiring the Frobenius method instead).

## Core Understanding
COEFFICIENTS MUST BE DERIVED VIA A SYSTEMATIC RECURRENCE — NEVER GUESSED INDIVIDUALLY: for
$y''-y=0$: substituting $y=\sum a_nx^n$ and re-indexing the $y''$ sum via $m=n-2$ gives BOTH sums
over the SAME power $x^m$: $\sum_m[(m+2)(m+1)a_{m+2}-a_m]x^m=0$. Since this holds for EVERY $m$,
the coefficient of each $x^m$ must vanish: $(m+2)(m+1)a_{m+2}=a_m$ — the recurrence
$a_{m+2}=a_m/[(m+2)(m+1)]$. Starting from FREE $a_0,a_1$: $a_2=a_0/2,a_3=a_1/6,a_4=a_0/24,\ldots$
— generating $\cosh x$ and $\sinh x$ exactly, matching the known $C_1e^x+C_2e^{-x}$. No individual
coefficient beyond $a_0,a_1$ is ever guessed; each follows mechanically from the recurrence.

RE-INDEXING TO A COMMON POWER OF $x$ MUST HAPPEN BEFORE COEFFICIENTS CAN BE MATCHED — NEVER
SKIPPED: after substitution, $y''$'s sum and $y$'s sum have DIFFERENT index offsets. Attempting to
match coefficients while the sums still run over different powers produces an incorrect
recurrence. Only after shifting $m=n-2$ so both sums are expressed as series in $x^m$ can the
"coefficient of $x^m$ must vanish" argument validly apply.

THE METHOD REQUIRES $x=0$ TO BE AN ORDINARY POINT — NEVER APPLICABLE UNCHECKED TO ANY ODE: for
$y''-y=0$: $P(x)=0,Q(x)=-1$, both trivially analytic — an ordinary point, method applies cleanly.
Contrast $x^2y''+xy'-y=0$ (standard form $y''+\frac1xy'-\frac1{x^2}y=0$): $P(x)=1/x,Q(x)=-1/x^2$
have a GENUINE singularity at $x=0$ — a SINGULAR point, where this direct method does NOT
correctly capture the full solution space; the Frobenius method (beyond this concept's scope)
would be required instead.

## Mental Models
- **"Substitute the series, re-index every sum to the same power of x, THEN match coefficients —
  skipping the re-indexing step produces a wrong recurrence."**
- **"The recurrence is the systematic machine generating every coefficient beyond a₀, a₁ — never a
  guessing game."**

## Why Students Fail

### MC-1: ORDINARY-POINT-CONDITION-NOT-CHECKED
- **Surface form**: applies the series-substitution method to any ODE without first verifying the
  expansion point is ordinary ($P,Q$ analytic there).
- **Birth type**: Foundational severity (Blueprint's own declared severity — the mechanical
  substitution procedure feels universally applicable once learned).
- **Repair**: re-walk the $x^2y''+xy'-y=0$ contrast, confirming $P,Q$'s genuine singularity at
  $x=0$ disqualifies the direct method there.

### MC-2: RE-INDEXING-STEP-SKIPPED-OR-MISALIGNED
- **Surface form**: attempts to match coefficients across sums with different index offsets
  without properly re-indexing first, producing an incorrect recurrence.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the re-indexing step
  is an easy-to-skip technical detail that invalidates the entire coefficient-matching argument).
- **Repair**: re-walk the explicit $m=n-2$ re-indexing step for $y''-y=0$.

### MC-3: SERIES-SOLUTION-COEFFICIENTS-GUESSED-RATHER-THAN-DERIVED
- **Surface form**: attempts to guess individual coefficients $a_n$ directly rather than
  systematically deriving and applying the recurrence relation.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a pattern in a few early
  coefficients can tempt guessing rather than deriving).
- **Repair**: re-anchor on the recurrence as the systematic tool generating every coefficient
  mechanically.

## Misconceptions

### MC-1: ORDINARY-POINT-CONDITION-NOT-CHECKED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: RE-INDEXING-STEP-SKIPPED-OR-MISALIGNED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: SERIES-SOLUTION-COEFFICIENTS-GUESSED-RATHER-THAN-DERIVED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Re-indexing sums to a common power is like converting all measurements to the same unit
  before comparing them — skip it, and 'matching coefficients' compares apples to oranges."**
- **Anti-analogy**: the series-substitution method is NOT a universal tool for every ODE — a
  singular point at the expansion point disqualifies it, requiring the Frobenius method instead.

## Demonstrations
- **Demonstration 1 (targets MC-2, MC-3)**: the full re-indexing and recurrence derivation for
  $y''-y=0$, generating $\cosh x,\sinh x$ mechanically.
- **Demonstration 2 (targets MC-1)**: the ordinary-versus-singular-point contrast between
  $y''-y=0$ and $x^2y''+xy'-y=0$.

## Discovery Questions
1. "Can you apply the series-substitution method to any second-order linear ODE, regardless of its
   coefficients?"
2. "Before matching coefficients across two sums with different starting indices, what step must
   happen first?"
3. "Should individual coefficients aₙ be guessed, or systematically derived from a recurrence?"

## Teaching Sequence
1. **Representation shift**: the series ansatz and term-by-term substitution, working
   Demonstration 1.
2. **Representation shift (continued)**: the re-indexing and recurrence derivation, working
   Demonstration 1 to completion, isolating MC-2 and MC-3.
3. **Contrast pair**: the ordinary-versus-singular-point condition, working Demonstration 2,
   isolating MC-1.
4. **Mastery gate**: require a correct series substitution, a correct re-indexed recurrence
   derivation with several generated coefficients, and a correct ordinary/singular-point
   classification for a new ODE, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the series-substitution method applied without checking the ordinary-point
  condition.
- Never accept coefficients matched across sums that haven't been re-indexed to a common power of
  $x$.
- Never accept individual coefficients guessed rather than derived from the recurrence.

## Voice Teaching Notes
- Say "is the expansion point ordinary or singular here?" whenever the series method is about to
  be applied.
- Before matching coefficients, ask "are all your sums expressed in the same power of x yet?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly substitutes the series ansatz and its derivatives
  into a given ODE.
- **Rung 2 (application)**: learner correctly re-indexes and derives a recurrence relation,
  generating several coefficients.
- **Rung 3 (transfer)**: learner correctly applies the method to the Airy equation, recognizing it
  as the PRIMARY way to obtain an explicit solution when no elementary closed form exists.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the ordinary-versus-singular-point contrast.
- If MC-2 recurs, re-walk the explicit re-indexing step.
- If MC-3 recurs, re-anchor on the recurrence as the systematic coefficient-generating tool.

## Memory Hooks
- "Always check the ordinary-point condition first — P and Q must be analytic there."
- "Re-index every sum to the same power of x before matching coefficients."
- "The recurrence generates every coefficient mechanically — never guess."

## Transfer Connections
- `math.de.second-order-linear` (already authored, this campaign, Batch 150): supplies the
  standard form $y''+P(x)y'+Q(x)y=0$ this method solves.
- `math.calc.power-series` (already authored, certified domain): supplies the series ansatz,
  term-by-term differentiation, and radius-of-convergence machinery this method directly reuses.
- `math.calc.taylor-series` (already authored, Batch 65, formal KG cross-link): supplies the
  Taylor-series machinery this concept's generated series (verified against $\cosh x,\sinh x$)
  directly connects to.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.series-solution.md`, reused by reference
  for its $y''-y=0$ substitution-and-recurrence derivation, its ordinary-versus-singular-point
  contrast, and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: extending the Blueprint's own independence-mode probe (the Airy equation
  $y''-xy=0$) into a genuine cross-link probe against `math.calc.taylor-series`, connecting the
  generated series' coefficients directly to Taylor-series machinery.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction cross-link discrepancy found and corrected**: the Blueprint's own
  Component 7 declares `math.calc.taylor-series` NOT YET authored at its own write-time, correctly
  setting `P76_mode=independence` under that state. Checking the live corpus now shows it WAS
  authored (Batch 65 of this campaign), well before this campaign reached
  `math.de.series-solution` — this entry upgrades the transfer probe to a genuine cross-link probe,
  consistent with the established reverse-direction-discrepancy correction pattern (last seen at
  Batch 152's `math.de.char-equation`). All other fields (requires
  `math.de.second-order-linear`/`math.calc.power-series`, unlocks none, expert/apply,
  mastery_threshold 0.8, estimated_hours 6) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 156): authored. Second entry this batch. Companion batch concept:
  `math.de.laplace-transform`.

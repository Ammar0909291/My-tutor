# math.de.second-order-homogeneous

## Identity
- **KG id**: `math.de.second-order-homogeneous`
- **Domain**: math.de
- **Requires**: `math.de.second-order-linear`
- **Unlocks**: `math.de.char-equation`, `math.de.wronskian`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
State the homogeneous form $y''+P(x)y'+Q(x)y=0$; given two solutions $y_1,y_2$, write the general
solution $c_1y_1+c_2y_2$ via superposition — but only when $y_1,y_2$ form a FUNDAMENTAL SET
(linearly independent, never merely any two valid solutions); define linear independence's
necessity via the collapsed one-dimensional family a dependent pair produces; and use the
WRONSKIAN $W(y_1,y_2)=y_1y_2'-y_1'y_2$ as a practical test — nonzero at even ONE point confirms
independence EVERYWHERE (for solutions of the same equation), never requiring an everywhere-check.

## Core Understanding
NOT ANY TWO VALID SOLUTIONS FORM A FUNDAMENTAL SET — LINEAR INDEPENDENCE IS A GENUINE ADDITIONAL
REQUIREMENT: for $y''-y=0$: $y_1=e^x,\tilde y_2=3e^x$ are BOTH valid solutions, but
$c_1y_1+c_2\tilde y_2=(c_1+3c_2)e^x$ collapses to a SINGLE-parameter family — NOT the genuine
two-dimensional solution space a second-order equation has. Only $y_1=e^x,y_2=e^{-x}$ (linearly
INDEPENDENT) gives $c_1e^x+c_2e^{-x}$ that genuinely spans EVERY solution.

THE WRONSKIAN NONZERO AT A SINGLE POINT CONFIRMS INDEPENDENCE EVERYWHERE — NEVER REQUIRING A
POINT-BY-POINT CHECK: for $y_1=e^x,y_2=e^{-x}$: $W=e^x(-e^{-x})-e^x(e^{-x})=-1-1=-2\ne0$ at every
point — genuine fundamental set. For $y_1=e^x,\tilde y_2=3e^x$: $W=e^x(3e^x)-e^x(3e^x)=0$
identically — correctly signaling dependence. The theorem (valid specifically because both solve
the SAME homogeneous linear ODE) means checking $W$ at ONE point (e.g. $W(0)=1\ne0$ for
$\cos x,\sin x$ solving $y''+y=0$) suffices to confirm independence EVERYWHERE — no need to
separately verify at every other point.

THE WRONSKIAN'S EXACT TERM ORDER IS $y_1y_2'-y_1'y_2$ — NEVER $y_1'y_2-y_1y_2'$: for
$y_1=\cos x,y_2=\sin x$: $W(0)=\cos(0)\cos(0)-(-\sin(0))\sin(0)=1(1)-0(0)=1$ — the correct order
matters for the sign, and swapping terms produces the negated (and for some purposes, misleading)
value.

## Mental Models
- **"Superposition gives you a family of solutions from any two — but only a linearly independent
  pair, a fundamental set, gives you the FULL family, the genuine general solution."**
- **"The Wronskian is a one-point litmus test — for solutions of the same homogeneous linear ODE,
  a single nonzero evaluation is proof of independence everywhere, sparing an impossible
  everywhere-check."**

## Why Students Fail

### MC-1: ANY-TWO-SOLUTIONS-ASSUMED-TO-FORM-FUNDAMENTAL-SET
- **Surface form**: believes any two valid solutions of a homogeneous linear ODE automatically
  combine via superposition to give the general solution, without checking linear independence.
- **Birth type**: Foundational severity (Blueprint's own declared severity — superposition, just
  established in the prerequisite, is easily over-read as needing no further conditions).
- **Repair**: re-compute the Wronskian for $e^x,3e^x$, showing it's identically zero, confirming
  dependence and the collapsed one-parameter family.

### MC-2: WRONSKIAN-CHECKED-AT-ONLY-ONE-ARBITRARY-POINT-WITHOUT-JUSTIFICATION
- **Surface form**: checks the Wronskian at a single point and concludes independence without
  recognizing this relies on the specific theorem for solutions of the same homogeneous linear
  ODE.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the shortcut is easy to
  apply mechanically without understanding why it's valid).
- **Repair**: re-anchor on the theorem's scope — this shortcut works because $y_1,y_2$ solve the
  SAME homogeneous linear ODE, making the Wronskian itself satisfy a first-order equation
  guaranteeing it's always zero or never zero.

### MC-3: WRONSKIAN-COMPUTED-WITH-SIGN-OR-TERM-ORDER-ERROR
- **Surface form**: computes the Wronskian as $y_1'y_2-y_1y_2'$ (terms/signs swapped) instead of
  the correct $y_1y_2'-y_1'y_2$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the two terms look
  symmetric enough that the order is easy to swap).
- **Repair**: re-derive from the precise definition, working through a computation step by step to
  reinforce the correct term order.

## Misconceptions

### MC-1: ANY-TWO-SOLUTIONS-ASSUMED-TO-FORM-FUNDAMENTAL-SET
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: WRONSKIAN-CHECKED-AT-ONLY-ONE-ARBITRARY-POINT-WITHOUT-JUSTIFICATION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: WRONSKIAN-COMPUTED-WITH-SIGN-OR-TERM-ORDER-ERROR
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A fundamental set is like two genuinely different basis vectors spanning a plane — a
  dependent pair is like two vectors pointing the same direction, spanning only a line no matter
  how you combine them."**
- **Anti-analogy**: the Wronskian test is NOT a spot-check that might miss dependence elsewhere —
  for solutions of the same homogeneous linear ODE, one nonzero point is a mathematically complete
  proof of independence everywhere.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $e^x,3e^x$ dependent-pair Wronskian computation,
  contrasted with $e^x,e^{-x}$'s genuine fundamental set.
- **Demonstration 2 (targets MC-2)**: the $\cos x,\sin x$ single-point Wronskian check at $x=0$,
  confirming independence everywhere by the theorem.
- **Demonstration 3 (targets MC-3)**: the explicit term-by-term Wronskian computation reinforcing
  the correct order $y_1y_2'-y_1'y_2$.

## Discovery Questions
1. "If two functions both solve the same homogeneous ODE, does any linear combination of them
   automatically give the general solution?"
2. "Does checking the Wronskian at just one point tell you about independence everywhere, or only
   at that point?"
3. "Is the Wronskian y₁y₂′−y₁′y₂, or y₁′y₂−y₁y₂′?"

## Teaching Sequence
1. **Representation shift**: the general solution from two solutions and why independence matters,
   working Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the Wronskian's one-point sufficiency, working Demonstration 2, isolating
   MC-2.
3. **Precision check**: the correct term order, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct general solution write-up from two given solutions, a
   correct Wronskian computation confirming or refuting a fundamental set, and a correct
   explanation of the one-point sufficiency theorem, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept any two valid solutions treated as automatically forming a fundamental set without
  a Wronskian check.
- Never accept a single-point Wronskian check concluding independence without acknowledging the
  same-equation theorem it relies on.
- Never accept the Wronskian computed with swapped term order.

## Voice Teaching Notes
- Say "have you checked whether these two solutions are actually independent?" whenever a general
  solution is written from two given solutions.
- When the Wronskian is checked at one point, ask "why does one point suffice here?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the Wronskian for a given pair of
  solutions.
- **Rung 2 (application)**: learner correctly determines whether a pair forms a fundamental set
  and writes the correct general solution.
- **Rung 3 (transfer)**: learner correctly explains, for a spring-mass system's two solutions, why
  their independence matters for describing every possible oscillation scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute the Wronskian for the dependent $e^x,3e^x$ pair.
- If MC-2 recurs, re-anchor on the same-equation theorem justifying the one-point check.
- If MC-3 recurs, re-derive the Wronskian term by term with the correct order.

## Memory Hooks
- "Superposition gives a family — only independence makes it the FULL family."
- "One nonzero Wronskian point proves independence everywhere, for solutions of the same
  equation."
- "Wronskian: y₁y₂′ minus y₁′y₂ — never swapped."

## Transfer Connections
- `math.de.second-order-linear` (already authored, this campaign, Batch 150): supplies the
  standard form and the already-proven superposition principle this concept builds directly on.
- `math.de.char-equation` (not yet authored): the KG's declared unlock, the practical tool for
  actually finding a fundamental set for constant-coefficient equations.
- `math.de.wronskian` (not yet authored): the KG's declared unlock, a dedicated deeper treatment
  of the Wronskian's own properties (e.g. Abel's formula).

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.second-order-homogeneous.md`, reused by
  reference for its $e^x,e^{-x}$ versus $e^x,3e^x$ contrast, its $\cos x,\sin x$ one-point
  Wronskian check, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the fundamental-set and
  Wronskian concepts to a spring-mass oscillation system's two representative solutions.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-linear`, unlocks `math.de.char-equation`/`math.de.wronskian`, cross_links
  none, advanced/apply, mastery_threshold 0.85, estimated_hours 4) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 151): authored. First entry this batch, closing
  `math.de.second-order-linear`'s declared unlock. Companion batch concept:
  `math.de.phase-plane`.

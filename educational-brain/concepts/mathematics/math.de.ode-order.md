# math.de.ode-order

## Identity
- **KG id**: `math.de.ode-order`
- **Domain**: math.de
- **Requires**: `math.de.ode`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: remember
- **Mastery threshold**: 0.9
- **Estimated hours**: 1

## Learning Objective
Define the ORDER of an ODE as the order of the HIGHEST derivative present (never the exponent on
that derivative), directly reusing `math.de.ode`'s own order/degree distinction; define the
DEGREE as the power to which that highest-order derivative is raised, ONLY when the ODE is
polynomial in its derivatives (undefined otherwise, e.g. when a derivative appears inside $\sin$
or a square root); and connect the ORDER — never the degree — to the number of arbitrary
constants in the general solution.

## Core Understanding
ORDER IS DETERMINED BY WHICH DERIVATIVE IS HIGHEST, NEVER BY AN EXPONENT: for $(y')^3=x$, the
highest derivative present is $y'$ itself (the FIRST derivative) — so the order is 1, regardless
of the cube. The "3" is the DEGREE (the power $y'$ is raised to), never mistaken for the order —
order counts WHICH derivative appears (first, second, third, ...), a completely separate question
from what power it's raised to.

DEGREE IS ONLY DEFINED WHEN THE ODE IS POLYNOMIAL IN ITS DERIVATIVES: for $y''+\sin(y')=0$, the
highest derivative $y'$ appears inside $\sin(\cdot)$ — NOT as an algebraic power — so the degree
is UNDEFINED, even though the order (2, from $y''$) is perfectly well-defined. Similarly
$\sqrt{y''}+y=0$ has $y''$ appearing as $(y'')^{1/2}$, a non-integer power, so its degree is also
undefined. Degree only applies once the ODE is confirmed polynomial (integer powers only, no
functions like $\sin$, $\exp$, or roots applied to the derivatives).

THE ORDER — NEVER THE DEGREE — DETERMINES THE NUMBER OF ARBITRARY CONSTANTS: an $n$-th order ODE
has a general solution with exactly $n$ arbitrary constants (for linear ODEs, from $n$ independent
solutions), directly reusing `math.de.ode`'s own general-solution machinery. A second-order ODE
needs $C_1$ AND $C_2$ — two initial conditions (e.g. $y(0)=a,y'(0)=b$) — regardless of what degree
the equation happens to have.

## Mental Models
- **"Order counts prime marks — degree counts powers. The exponent on $y'''$ never changes how
  many prime marks it has."**
- **"Degree only exists once you've confirmed the ODE is a genuine polynomial in its
  derivatives — sin, exp, or a root applied to a derivative kills degree entirely, but never
  order."**

## Why Students Fail

### MC-1: ORDER-IS-THE-POWER-OF-THE-DERIVATIVE
- **Surface form**: identifies the order as the exponent on the derivative, e.g. claiming
  $(y')^3=x$ has order 3.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — "order" and
  "degree" both sound like measures of "how big/strong something is," and "third power" sounds
  like "third order").
- **Repair**: re-count the prime marks (or derivative index) on the highest derivative present,
  ignoring any exponent entirely.

### MC-2: DEGREE-ALWAYS-EXISTS
- **Surface form**: assigns a degree to non-polynomial ODEs, e.g. assigning degree 1 to
  $y''+\sin(y')=0$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — early examples
  are all polynomial ODEs, so the polynomial-condition check is never explicitly exercised until
  a non-polynomial case appears).
- **Repair**: re-check whether the highest-order derivative appears as a plain algebraic power
  before assigning any degree at all.

### MC-3: NUMBER-OF-CONSTANTS-EQUALS-DEGREE
- **Surface form**: states the general solution has as many arbitrary constants as the degree,
  rather than the order.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — both order
  and degree are numerical measures of the ODE, making it easy to confuse which one governs the
  constant count).
- **Repair**: re-anchor on the order-to-constant-count connection directly, confirming the degree
  plays no role.

## Misconceptions

### MC-1: ORDER-IS-THE-POWER-OF-THE-DERIVATIVE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: DEGREE-ALWAYS-EXISTS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: NUMBER-OF-CONSTANTS-EQUALS-DEGREE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Order is a derivative's rank in a lineup (1st, 2nd, 3rd); degree is a completely separate
  question about how that one derivative is raised — never read off the same number."**
- **Anti-analogy**: a non-polynomial ODE does NOT lose its order just because its degree is
  undefined — order (which derivative is highest) and the polynomial-degree question are
  independent.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $(y'')^3+2y'=0$ — the highest derivative is $y''$ (order
  2), raised to the power 3 (degree 3) — the "3" belongs to degree, never order.
- **Demonstration 2 (targets MC-2)**: $y''+\sin(y')=0$ has order 2 ($y''$ is highest) but degree
  UNDEFINED, since $y'$ appears inside $\sin(\cdot)$, not as a plain algebraic power.
- **Demonstration 3 (targets MC-3)**: the general solution $y=C_1e^{2x}+C_2e^{-x}+3x$ has exactly
  2 arbitrary constants, confirming the ODE is second-order — regardless of what degree the
  original equation had.

## Discovery Questions
1. "In $(y')^3=x$, is the order 3, or is that number something else?"
2. "Does every ODE have a well-defined degree, or can some ODEs lack one?"
3. "Does the number of arbitrary constants in a general solution match the order or the degree?"

## Teaching Sequence
1. **Anchor**: connect to `math.de.ode`'s own order/degree definitions and general-solution
   constant-counting, framing this concept as a focused classification drill.
2. **Pattern induction**: classify several ODEs by order and degree side by side, establishing
   the baseline procedure.
3. **Conceptual shift**: Demonstration 1's exponent-versus-order contrast, isolating MC-1 by
   requiring the prime-mark count, ignoring exponents.
4. **Conceptual shift**: Demonstration 2's non-polynomial case, isolating MC-2 by requiring the
   polynomial condition checked before any degree is assigned.
5. **Conceptual shift**: Demonstration 3's constant-count connection, isolating MC-3 by requiring
   the order — not the degree — be cited as the source of the constant count.
6. **Mastery gate**: require correct order/degree classification across several ODEs (including a
   non-polynomial one), and a correct order-to-constant-count determination, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept an order claim derived from an exponent rather than a derivative's own index.
- Never accept a degree assigned to an ODE without first confirming it is polynomial in its
  derivatives.

## Voice Teaching Notes
- Say "is that number counting which derivative it is, or what power it's raised to?" whenever
  order or degree is stated.
- When a degree is claimed, ask "is the highest derivative appearing as a plain power, or is it
  inside a function like sin or a root?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a new ODE's order and degree, or states
  degree as undefined when appropriate.
- **Rung 2 (application)**: learner correctly connects an ODE's order to its general solution's
  number of arbitrary constants.
- **Rung 3 (transfer)**: learner correctly reasons about how many initial conditions a NEW
  $n$-th order initial value problem requires, and correctly identifies degree as undefined for a
  non-polynomial ODE presented in an unfamiliar physical context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-count the prime marks on the highest derivative, ignoring exponents.
- If MC-2 recurs, re-check the polynomial condition before assigning any degree.
- If MC-3 recurs, re-anchor on the order-to-constant-count connection directly.

## Memory Hooks
- "Order is which derivative; degree is what power — never the same question."
- "No polynomial, no degree — but order never disappears."
- "Constants match the order, always — the degree has no vote."

## Transfer Connections
- `math.de.ode` (already authored, this campaign, Batch 99): supplies the order/degree
  definitions and the general-solution constant-counting rule this concept applies as a focused
  classification drill.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.ode-order.md`, reused by reference for
  its four-equation classification set, its non-polynomial degree-undefined example, its
  order-to-constant-count connection, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining
  Newton's second law as a second-order ODE requiring two initial conditions, the
  Picard–Lindelöf existence-uniqueness theorem's order-dependent initial-condition count, and the
  Cauchy–Kowalewski theorem's analogous requirement for the wave equation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ode`,
  unlocks none, cross_links none, advanced/remember, mastery_threshold 0.9, estimated_hours 1)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 100): authored. Second entry this batch. Companion batch concept:
  `math.prob.conditional-probability`. `math.de` moves 1/56 → **2/56** this batch.

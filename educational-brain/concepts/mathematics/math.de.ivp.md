# math.de.ivp

## Identity
- **KG id**: `math.de.ivp`
- **Domain**: math.de
- **Requires**: `math.de.ode`, `math.de.solution-types`
- **Unlocks**: `math.de.existence-uniqueness`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define an Initial Value Problem (IVP) as an ODE together with conditions specifying the solution's
value AND its derivatives, ALL at a SINGLE point $x_0$; solve a complete IVP by finding the
general solution then using ALL $n$ conditions SIMULTANEOUSLY (never one at a time in isolation)
to pin down every arbitrary constant; and distinguish an IVP (conditions at ONE point,
solution guaranteed unique) from a Boundary Value Problem (conditions at TWO OR MORE points,
solvability NOT guaranteed), recognizing condition PLACEMENT — not just count — as decisive.

## Core Understanding
ALL CONDITIONS OF AN IVP ARE ANCHORED AT ONE POINT, NEVER SPREAD ACROSS SEVERAL: for
$y''-5y'+6y=0$ (general solution $y=C_1e^{2x}+C_2e^{3x}$) with $y(0)=1$, $y'(0)=0$ — BOTH
conditions at $x_0=0$. This extends the general/particular-solution framework directly: the
initial conditions are simply the specific values used to solve for the arbitrary constants.

THE $n$ CONDITIONS MUST BE SOLVED SIMULTANEOUSLY, NEVER SEQUENTIALLY ONE AT A TIME: substituting
$y(0)=C_1+C_2=1$ and (from $y'=2C_1e^{2x}+3C_2e^{3x}$) $y'(0)=2C_1+3C_2=0$ gives a SYSTEM of two
equations in two unknowns. Solving together: $C_1=1-C_2$, then $2(1-C_2)+3C_2=0\Rightarrow
C_2=-2$, $C_1=3$ — giving $y=3e^{2x}-2e^{3x}$, verified directly: $y(0)=3-2=1$ ✓,
$y'(0)=6-6=0$ ✓. Treating each condition as pinning down one constant in isolation, without
using both equations together, is not the correct method.

CONDITION PLACEMENT — NOT JUST CONDITION COUNT — DETERMINES THE SOLVABILITY GUARANTEE: for the
SAME ODE $y''+y=0$ (general solution $y=C_1\cos x+C_2\sin x$): as an IVP with $y(0)=0,y'(0)=1$
(both at $x=0$), substitution gives $C_1=0,C_2=1$ — the UNIQUE solution $y=\sin x$, guaranteed. As
a BVP instead with $y(0)=0,y(\pi)=1$ (split across two points): $C_1=0$ from the first, then
$y(\pi)=C_1\cos\pi+C_2\sin\pi=0$ — but the condition demands $1$, a CONTRADICTION — NO solution
exists at all. Same ODE, same NUMBER (2) of conditions — the only difference is WHERE they're
placed, and that alone changes the guarantee from "always unique" to "possibly none."

## Mental Models
- **"An IVP anchors every piece of given information at one shared starting point — solve the
  resulting system of equations together, never constant by constant in isolation."**
- **"Moving the same conditions from one point to several turns a guaranteed-unique problem into
  one that might have no solution at all — placement is as decisive as count."**

## Why Students Fail

### MC-1: CONDITION-COUNT-ASSUMED-TO-DETERMINE-OUTCOME-REGARDLESS-OF-PLACEMENT
- **Surface form**: believes the same number of conditions always leads to the same kind of
  solvability guarantee, regardless of whether placed at one point (IVP) or split across multiple
  points (BVP).
- **Birth type**: Foundational severity (Blueprint's own declared severity — transitioning from
  uniformly well-behaved IVPs to BVPs' no-solution/unique/infinite trichotomy makes this an easy
  assumption to carry over).
- **Repair**: re-walk the $y''+y=0$ IVP-versus-BVP contrast on identical underlying mathematics,
  isolating condition placement as the only variable.

### MC-2: INITIAL-CONDITIONS-SOLVED-SEQUENTIALLY-INSTEAD-OF-SIMULTANEOUSLY
- **Surface form**: attempts to solve for each arbitrary constant one at a time using only one
  condition per constant, rather than the full system together.
- **Birth type**: Foundational severity (Blueprint's own declared severity — treating conditions
  as independent, sequential steps feels natural but discards the coupling between constants).
- **Repair**: re-walk the full simultaneous-equation solution and verification for
  $y''-5y'+6y=0$.

### MC-3: DERIVATIVE-CONDITIONS-OMITTED-FOR-HIGHER-ORDER-IVPS
- **Surface form**: forgets that a higher-order IVP requires conditions on DERIVATIVES, not just
  the function value, at the initial point — e.g. providing only $y(x_0)$ for a second-order ODE.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the function-value
  condition is the most salient, and the derivative conditions are easy to overlook).
- **Repair**: re-anchor on "an $n$th-order equation needs $n$ conditions" — for order 2, both
  $y(x_0)$ and $y'(x_0)$.

## Misconceptions

### MC-1: CONDITION-COUNT-ASSUMED-TO-DETERMINE-OUTCOME-REGARDLESS-OF-PLACEMENT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INITIAL-CONDITIONS-SOLVED-SEQUENTIALLY-INSTEAD-OF-SIMULTANEOUSLY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: DERIVATIVE-CONDITIONS-OMITTED-FOR-HIGHER-ORDER-IVPS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An IVP is like a snapshot at one instant fully specifying a system's future — a BVP is like
  demanding a story's beginning and ending match up, which might be impossible."**
- **Anti-analogy**: solving an IVP's constants is NOT filling in a form one blank at a time — it's
  solving a system where every blank depends on every other.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the $y''-5y'+6y=0$ IVP, solved via the simultaneous system
  and directly verified.
- **Demonstration 2 (targets MC-1)**: the $y''+y=0$ IVP-versus-BVP contrast, unique solution versus
  no solution on identical underlying mathematics.
- **Demonstration 3 (targets MC-3)**: a second-order ODE with only $y(x_0)$ given, shown
  insufficient without also $y'(x_0)$.

## Discovery Questions
1. "If two problems share the same ODE and the same number of conditions, are they guaranteed the
   same kind of solvability outcome?"
2. "Should you solve for each arbitrary constant using one condition at a time, or set up and solve
   the full system from all conditions together?"
3. "For a second-order ODE's initial value problem, is giving only y(x₀) enough to fully specify
   the IVP?"

## Teaching Sequence
1. **Representation shift**: the IVP definition — all conditions at one point — worked via
   Demonstration 1's setup, isolating MC-3.
2. **Representation shift (continued)**: the simultaneous-system-solving method, working
   Demonstration 1 to completion, isolating MC-2.
3. **Conflict evidence**: the IVP-versus-BVP contrast (Demonstration 2), isolating MC-1.
4. **Mastery gate**: require a correct second-order IVP solved via the simultaneous system, direct
   verification of both conditions, and a correct explanation of why IVPs are guaranteed unique
   while BVPs with the same condition count are not, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that the same ODE and condition count guarantee the same solvability
  outcome regardless of placement.
- Never accept arbitrary constants solved for one condition at a time in isolation, when multiple
  conditions must be used together.
- Never accept a higher-order IVP specified with only the function value and no derivative
  conditions at the initial point.

## Voice Teaching Notes
- Say "are all these conditions at the same point, or spread across several?" whenever a
  differential-equation problem's conditions are introduced.
- When solving for constants, ask "are you using all the conditions together, or one at a time?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies an IVP's conditions as anchored at a
  single point and sets up the correct number for the ODE's order.
- **Rung 2 (application)**: learner correctly solves a second-order IVP via the simultaneous
  system and verifies both conditions directly.
- **Rung 3 (transfer)**: learner correctly models a falling-object scenario as an IVP, solves it,
  and explains what would change if the problem instead gave height at two different times.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $y''+y=0$ IVP-versus-BVP contrast.
- If MC-2 recurs, re-walk the simultaneous-system solution for $y''-5y'+6y=0$.
- If MC-3 recurs, re-anchor on the $n$-conditions-for-order-$n$ requirement.

## Memory Hooks
- "IVP: all conditions at one point, uniqueness guaranteed. BVP: conditions split across points,
  no such guarantee."
- "Solve the whole system together — never one constant at a time from one condition."
- "An order-n ODE's IVP needs n conditions, including derivatives for n≥2."

## Transfer Connections
- `math.de.ode` (already authored, certified domain): supplies the general/particular-solution
  framework this concept's simultaneous-condition-solving directly extends.
- `math.de.solution-types` (already authored, certified domain): supplies the solution taxonomy,
  including the reminder that singular solutions can exist outside any IVP's reach.
- `math.de.existence-uniqueness` (not yet authored): the KG's declared unlock, formalizing the
  uniqueness guarantee previewed informally here.
- `math.de.bvp` (not yet authored): the KG's declared related concept, this entry's direct
  contrast case for condition-placement.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.ivp.md`, reused by reference for its
  second-order IVP worked example, its IVP-versus-BVP contrast on $y''+y=0$, and its three-
  misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, modeling a falling object's height
  as an IVP and contrasting with a hypothetical two-point BVP variant.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ode`/
  `math.de.solution-types`, unlocks `math.de.existence-uniqueness`, cross_links none, advanced/
  apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly. `math.de.bvp`, the KG's declared "related" concept used in the Blueprint's
  contrast example, is not yet authored — this does not affect the requires/unlocks verification.

## Version History
- 2026-09-19 (Batch 146): authored. First entry this batch, opening the `math.de` domain in this
  campaign. Companion batch concept: `math.de.separable`.

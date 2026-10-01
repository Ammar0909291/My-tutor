# math.num.runge-kutta

## Identity
- **KG id**: `math.num.runge-kutta`
- **Domain**: math.num
- **Requires**: `math.num.euler-method`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Derive the classical RK4 update from weighted slope averaging at four interior points; recognize
RK4 is NEVER exact — its $O(h^5)$ local truncation error is small but NEVER zero, and still
accumulates; recognize more STAGES is NEVER always better — beyond 4 stages, extra stages do NOT
buy a corresponding order increase (Butcher barrier); and recognize adaptive step-size control
NEVER changes the underlying method — only $h$ changes, the same RK formula applies throughout.

## Core Understanding
RK4 IS NEVER EXACT — ITS SMALL BUT NONZERO ERROR STILL ACCUMULATES: a student using RK4 with
$h=0.01$ finds error $3\times10^{-10}$ at $t=1$ and claims "RK4 is essentially exact for $h$ this
small." This is MISLEADING — the error is small but genuinely NONZERO (a real $O(h^5)$ local
truncation error, giving $O(h^4)$ global error, that accumulates over $N=T/h$ steps); halving $h$
to $0.005$ would reduce it by $2^4=16$ (to $\approx2\times10^{-11}$), but below some
$h_{\text{opt}}$, ROUNDOFF error (growing as $Tu/h$ as $h\to0$) starts DOMINATING. Believing RK4
gives the EXACT solution because it matches the Taylor series to order 4 confuses "matches up to
order 4" with "no error at all beyond order 4" — the total error is $Ch^4+Tu/h$, minimized at a
FINITE $h_{\text{opt}}$, never at $h=0$.

MORE STAGES IS NEVER ALWAYS BETTER — THE BUTCHER BARRIER LIMITS ORDER GAINS: RK4 (4 stages)
achieves order 4. But a 5-STAGE method achieves ONLY order 4 as well (NOT order 5) — beyond 4
stages, the number of order-matching conditions grows FASTER than the free parameters available,
so extra stages do not automatically buy the next order; ORDER 5 first requires 6 stages.
Assuming increasing the number of stages ALWAYS improves accuracy proportionally, without
recognizing the Butcher barrier at 5 stages, is WRONG — each stage costs an extra function
evaluation, and beyond 4 stages that cost does NOT translate into a corresponding order gain until
a threshold (6 stages for order 5) is reached.

ADAPTIVE STEP-SIZE CONTROL NEVER CHANGES THE UNDERLYING METHOD — ONLY $h$ CHANGES: an adaptive
RK45 solver reports varying step sizes ($h=0.3,0.28,0.31,0.05,0.04,0.06$) across an interval —
this is NOT a switch to a different, lower-order method. The SAME RK formula
$y_{n+1}=y_n+(k_1+2k_2+2k_3+k_4)/6$ applies whether $h=0.3$ or $h=0.003$; ONLY the input $h$
changes, chosen by monitoring a local error estimate (from an embedded lower/higher-order pair)
to keep the local error below a tolerance $\epsilon$. Thinking that when an adaptive solver
REDUCES $h$ it is switching to a different, lower-order method is WRONG — the "engine" (the RK
formula) never changes; only the "throttle" ($h$) is adjusted, larger where the solution is
smooth, smaller where it changes rapidly.

## Mental Models
- **"Fourth-order accurate is never the same as exact — the error is small, genuinely nonzero,
  and still accumulates over many steps."**
- **"More stages don't automatically buy more accuracy — the Butcher barrier means 5 stages give
  the same order as 4, until 6 stages unlock order 5."**
- **"Adaptive step control is a throttle on the same engine — the RK formula never changes, only
  h does."**

## Why Students Fail

### MC-1: RK4-IS-EXACT
- **Surface form**: believes RK4 gives the exact solution because it matches the Taylor series to
  order four, not recognizing a nonzero $O(h^5)$ LTE still accumulates.
- **Birth type**: language contamination (Blueprint's own declared birth type — "fourth-order"
  sounds complete; students confuse "matches up to order 4" with "no error beyond order 4").
- **Repair**: re-derive the total-error formula $Ch^4+Tu/h$, confirming a finite optimal $h$, never
  zero error at $h\to0$.

### MC-2: MORE-STAGES-ALWAYS-BETTER
- **Surface form**: assumes increasing the number of stages always improves accuracy, not
  recognizing that beyond 4 stages extra stages do not buy a corresponding order increase.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — tables showing
  order 1→2→3→4 for 1→2→3→4 stages lead students to extrapolate; the Butcher barrier is rarely
  covered).
- **Repair**: re-present the Butcher-barrier table, confirming 5 stages give only order 4.

### MC-3: ADAPTIVE-STEP-CHANGES-METHOD
- **Surface form**: thinks that when an adaptive solver reduces $h$ it is switching to a
  different, lower-order method, not understanding the same RK formula is applied with a smaller
  step.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — solvers report step
  sizes that vary; students interpret any change in $h$ as a change in the underlying algorithm).
- **Repair**: re-anchor on the cruise-control analogy — the same engine (RK formula), a varying
  throttle ($h$).

## Misconceptions

### MC-1: RK4-IS-EXACT
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-2: MORE-STAGES-ALWAYS-BETTER
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: ADAPTIVE-STEP-CHANGES-METHOD
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"RK4's tiny error is like a barely-visible crack — small enough to ignore once, but it
  widens if you keep stressing it over many steps."**
- **Anti-analogy**: an adaptive solver shrinking its step size isn't switching cars mid-race — it's
  the same car slowing down for a sharp turn, never a different vehicle.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $3\times10^{-10}$-error-at-$h=0.01$ "essentially exact"
  gate question, deriving the true total-error formula.
- **Demonstration 2 (targets MC-2)**: the Butcher-barrier table showing 5 stages give only order
  4.
- **Demonstration 3 (targets MC-3)**: the RK45 varying-step-size-same-formula demonstration.

## Discovery Questions
1. "Is RK4's small error at a given h actually zero, or just small and still accumulating?"
2. "Does adding a 5th stage to a 4-stage RK method always increase the accuracy order?"
3. "When an adaptive solver shrinks its step size, is it switching to a different method?"

## Teaching Sequence
1. **Representation shift**: the four-representation RK4 derivation (geometric, algebraic, error
   analysis, code), setting up the order-versus-exactness groundwork.
2. **Pattern induction**: the adaptive-step-size gallery and Butcher-barrier table, isolating
   MC-2.
3. **Misconception detector**: the order-vs-exactness gate question, working Demonstration 1,
   isolating MC-1.
4. **Reused procedure**: the adaptive-step-is-the-same-formula demonstration, working
   Demonstration 3, isolating MC-3.
5. **Mastery gate**: require a correct RK4 derivation and error-order statement, a correct
   explanation of the Butcher barrier, and a correct explanation of why adaptive step control
   doesn't change the method, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept RK4 described as giving an exact solution for any nonzero $h$.
- Never accept a claim that adding stages always increases accuracy order proportionally.
- Never accept adaptive step-size changes described as switching to a different method.

## Voice Teaching Notes
- Say "is that error truly zero, or just small enough to be negligible here?" whenever RK4's
  accuracy is discussed.
- Ask "does the RK formula itself change when h changes, or just the step size?" whenever
  adaptive step control is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the RK4 update from four weighted slope
  evaluations.
- **Rung 2 (application)**: learner correctly explains why RK4's error is small but nonzero and
  identifies the roundoff-truncation trade-off.
- **Rung 3 (transfer)**: learner correctly compares RK4's energy drift against a symplectic
  integrator for a long-time Hamiltonian system.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the total-error formula and its finite optimal $h$.
- If MC-2 recurs, re-present the Butcher-barrier table.
- If MC-3 recurs, re-anchor on the cruise-control analogy.

## Memory Hooks
- "Fourth-order isn't exact — the error is small, never zero, and it accumulates."
- "Five stages give the same order as four — the Butcher barrier, never a free upgrade."
- "Adaptive control changes h, never the formula — same engine, different throttle."

## Transfer Connections
- `math.num.euler-method` (already authored, this campaign, Batch 219): supplies the first-order
  explicit-method framework (LTE versus global error, stability region) this concept directly
  extends to fourth order.

## Cross-Subject Connections
- Orbital mechanics: integrating a spacecraft trajectory over many orbital periods requires
  weighing RK4's higher formal order against a symplectic integrator's exact energy preservation.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.runge-kutta.md`, reused by reference
  for its four-representation RK4 derivation, its adaptive-step-size gallery and Butcher-barrier
  table, its order-vs-exactness gate question, and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on symplectic integrators for
  Hamiltonian systems, comparing RK4's energy drift against symplectic Euler's exact preservation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.num.euler-method`, unlocks none, cross_links none, proficient/apply, mastery_threshold
  0.85, estimated_hours 5) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 221): authored. Second entry this batch. Companion batch concept:
  `math.num.qr-algorithm`.

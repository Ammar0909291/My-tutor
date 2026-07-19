# Teaching Blueprint: Initial Value Problem (`math.de.ivp`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.ivp` |
| name | Initial Value Problem |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.de.ode`, `math.de.solution-types` |
| unlocks | `math.de.existence-uniqueness` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a specific general solution paired with a starting value, solved for the constant, before the formal IVP framework |
| description (KG) | An ODE together with conditions specifying the value of the solution and its derivatives at a single point (the initial point). Determines a unique solution under appropriate smoothness conditions. |

## Component 1 — Learning Objectives

- LO1: Define an **Initial Value Problem (IVP)** as an ODE together with conditions specifying the value of the solution AND ITS DERIVATIVES at a SINGLE point (the initial point) — e.g. for a second-order ODE, both $y(x_0)$ and $y'(x_0)$ given at the SAME $x_0$ — directly extending `math.de.ode`'s own already-established general/particular solution framework.
- LO2: Solve a complete IVP by first finding the general solution (per `math.de.ode`'s method), then using ALL the initial conditions AT THE SAME POINT to solve for every arbitrary constant simultaneously — correctly recognizing that for an $n$th-order ODE, exactly $n$ conditions (all at one point) are needed to pin down a unique particular solution.
- LO3: Distinguish an IVP (all conditions at ONE point) from a boundary value problem (`math.de.bvp`'s own territory — conditions at TWO OR MORE distinct points) — directly refuting the misconception that "conditions given" always means the same solving procedure, when in fact the SAME number of conditions arranged at one point versus split across multiple points leads to genuinely different mathematical behavior (an IVP's solution, under smoothness conditions, is always guaranteed unique; a BVP's is not).

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.ode` (an ODE relates a function to its derivatives; general solution has $n$ arbitrary constants for order $n$; particular solutions fix them via conditions) and `math.de.solution-types` (the general/particular/singular solution taxonomy, and that singular solutions can exist outside the general-solution family entirely).

## Component 3 — Core Explanation

**An IVP, defined precisely**: an Initial Value Problem consists of an ODE PLUS a set of conditions specifying the solution's value (and, for higher-order equations, its derivatives) all at ONE SINGLE point $x_0$ — e.g. for a second-order ODE: $y(x_0)=y_0$ AND $y'(x_0)=y_0'$, both conditions anchored at the identical starting point $x_0$. This directly extends `math.de.ode`'s own particular-solution machinery: the initial conditions are simply the specific values used to solve for the arbitrary constants.

**Solving a complete IVP — using all conditions simultaneously, at the same point**: for an $n$th-order ODE, the general solution has $n$ arbitrary constants; a complete IVP supplies exactly $n$ conditions, ALL evaluated at the same $x_0$ (e.g. $y(x_0), y'(x_0),\dots,y^{(n-1)}(x_0)$). Substituting these all at once into the general solution (and its derivatives) produces a SYSTEM of $n$ equations in the $n$ unknown constants, solved SIMULTANEOUSLY (not one at a time in isolation) to pin down the unique particular solution.

**IVP vs. BVP — same number of conditions, different placement, genuinely different behavior**: an IVP's conditions are all anchored at ONE point; a Boundary Value Problem's conditions (`math.de.bvp`'s territory) are spread across TWO OR MORE distinct points. This is not a cosmetic difference: under mild smoothness conditions on the ODE, an IVP is GUARANTEED to have a unique solution (the content of `math.de.existence-uniqueness`, this concept's own forward link) — but `math.de.bvp` already established that a BVP with the exact same NUMBER of conditions can have no solution, a unique solution, or infinitely many, depending on how the conditions interact with the ODE's general solution. The SAME count of conditions behaves completely differently depending on WHERE those conditions are placed.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — solving a complete second-order IVP)**: Solve $y''-5y'+6y=0$ (already solved generally in `math.de.second-order-ode`'s own example: $y=C_1e^{2x}+C_2e^{3x}$) subject to the initial conditions $y(0)=1$, $y'(0)=0$ — BOTH conditions at $x_0=0$. Substitute $y(0)=C_1+C_2=1$. Differentiate the general solution: $y'=2C_1e^{2x}+3C_2e^{3x}$, so $y'(0)=2C_1+3C_2=0$. Solving these TWO equations SIMULTANEOUSLY: from the first, $C_1=1-C_2$; substituting into the second: $2(1-C_2)+3C_2=0 \Rightarrow 2+C_2=0 \Rightarrow C_2=-2$, so $C_1=3$. The unique particular solution: $y=3e^{2x}-2e^{3x}$.

**Example 2 (LO2 — verifying the solved IVP directly)**: Verify Example 1's answer $y=3e^{2x}-2e^{3x}$ satisfies BOTH original conditions: $y(0)=3(1)-2(1)=1$ ✓; $y'=6e^{2x}-6e^{3x}$, so $y'(0)=6-6=0$ ✓. Both conditions, evaluated at the SAME point $x_0=0$, are simultaneously satisfied by this ONE specific particular solution — confirming the simultaneous-system-solving approach correctly used all the given information together, rather than treating the two conditions as separate, sequential steps.

**Example 3 (LO3 — IVP vs. BVP, same equation, genuinely different behavior, breaking MC-1)**: Consider the SAME ODE $y''+y=0$ (general solution $y=C_1\cos x+C_2\sin x$) under TWO different condition arrangements. As an IVP: $y(0)=0$, $y'(0)=1$ — substituting: $y(0)=C_1=0$; $y'=-C_1\sin x+C_2\cos x$, so $y'(0)=C_2=1$ — giving the UNIQUE solution $y=\sin x$, guaranteed by the IVP framework. As a BVP instead (from `math.de.bvp`'s own territory): $y(0)=0$, $y(\pi)=1$ — substituting: $y(0)=C_1=0$; $y(\pi)=C_1\cos\pi+C_2\sin\pi = 0+0=0$ — but the condition requires $y(\pi)=1$, giving $0=1$, a CONTRADICTION — this BVP has NO solution at all, despite using the identical ODE and the same NUMBER (2) of conditions as the IVP. The only difference: WHERE the two conditions were placed (both at $x=0$ for the IVP, versus split across $x=0$ and $x=\pi$ for the BVP) — proving condition PLACEMENT, not just condition COUNT, fundamentally changes the solvability guarantee.

## Component 5 — Teaching Actions

### Teaching Action A01 — All Conditions at One Point, Defining the IVP (Primitive P11: Representation Shift)

State: "an IVP just means: every piece of information you're given about the solution is anchored at the SAME starting point." Work Example 1's setup, explicitly identifying both conditions as evaluated at $x_0=0$.

### Teaching Action A02 — Solving the System Simultaneously (Primitive P11: Representation Shift)

Work Example 1's full simultaneous-equation solving, then Example 2's direct verification. State: "don't solve for $C_1$ and $C_2$ one at a time in isolation — set up BOTH equations from BOTH conditions, then solve the system together."

### Teaching Action A03 — IVP vs. BVP: Same Conditions Count, Different Placement, Different Guarantee (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: the identical ODE, with 2 conditions either both at one point (IVP: unique solution guaranteed, found directly) or split across two points (BVP: no solution at all, a contradiction). State: "the SAME ODE, the SAME number of conditions — but moving where those conditions sit completely changes whether a solution is even guaranteed to exist."

- **MC-1 hook**: ask "if two problems give you the same ODE and the same number of conditions, will they always be solved the same way and have the same kind of guarantee?" — a "yes" answer reveals MC-1 (assuming condition count alone determines the solving procedure and outcome, missing that WHERE the conditions are placed — one point vs. multiple points — is equally decisive).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve the IVP $y'-4y=0$, $y(0)=3$ (first-order — one condition, one constant).
  2. Solve the IVP $y''-y=0$ (general solution $y=C_1e^x+C_2e^{-x}$) with $y(0)=2$, $y'(0)=0$.
  3. Verify your solution to problem 2 satisfies both original conditions directly.
  4. Explain, using Example 3's reasoning, why an IVP with $n$ conditions (for an $n$th-order ODE) is generally guaranteed a unique solution, while a BVP with the same number of conditions is not.
- **P76 (Transfer Probe, mode = independence)**: "A physicist models a falling object's height with the second-order ODE $y''=-9.8$ (constant gravitational acceleration), and knows the object's initial height $y(0)=100$ meters and initial velocity $y'(0)=0$ (dropped from rest). (a) Find the general solution of $y''=-9.8$ (integrate twice). (b) Set up and solve the IVP using both initial conditions, both anchored at $t=0$, to find the unique particular solution for $y(t)$. (c) Explain why this scenario is naturally modeled as an IVP (conditions at a single starting instant) rather than a BVP, and what would be different about the problem if instead the physicist knew the object's height at $t=0$ AND at some LATER time $t=5$ seconds, rather than its initial velocity."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONDITION-COUNT-ASSUMED-TO-DETERMINE-OUTCOME-REGARDLESS-OF-PLACEMENT | Believing the same number of conditions always leads to the same kind of solvability guarantee, regardless of whether they're placed at one point (IVP) or split across multiple points (BVP) | Foundational |
| MC-2 | INITIAL-CONDITIONS-SOLVED-SEQUENTIALLY-INSTEAD-OF-SIMULTANEOUSLY | Attempting to solve for each arbitrary constant one at a time using only one condition per constant, rather than setting up and solving the full system of equations using all conditions together | Foundational |
| MC-3 | DERIVATIVE-CONDITIONS-OMITTED-FOR-HIGHER-ORDER-IVPS | Forgetting that a higher-order IVP requires conditions on DERIVATIVES (not just the function value) at the initial point, e.g. providing only $y(x_0)$ for a second-order ODE without also providing $y'(x_0)$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Condition-Count-Determines-Outcome-Regardless-of-Placement Assumption") → P41 (detect: ask whether an IVP and a BVP with the same ODE and same number of conditions are guaranteed the same kind of solution behavior) → P64 (conceptual shift: re-walk Example 3's direct contrast — identical ODE, IVP gives a unique solution, BVP gives no solution at all — re-anchoring on "placement of conditions matters as much as their count").
- **B02 (targets MC-2)**: P27 (name it: "Sequential Instead of Simultaneous Constant-Solving") → P41 (detect: ask a student to solve a two-condition IVP and check whether they attempt to find $C_1$ from one condition alone before considering the second) → P64 (conceptual shift: re-walk Example 1's full simultaneous system, re-anchoring on "set up BOTH equations first, from BOTH conditions, THEN solve together").
- **B03 (targets MC-3)**: P27 (name it: "Derivative Conditions Omitted") → P41 (detect: present a second-order ODE with only $y(x_0)$ given and ask whether this fully specifies an IVP) → P64 (conceptual shift: re-anchor on "an $n$th-order equation needs $n$ conditions — for order 2, that means BOTH $y(x_0)$ and $y'(x_0)$, not just the function value alone").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.ode` (the general/particular solution framework this concept's simultaneous-condition-solving directly extends), `math.de.solution-types` (the solution taxonomy, including the reminder that singular solutions can exist outside any IVP's reach if the ODE has one).
- **Unlocks**: `math.de.existence-uniqueness` (the precise theorem guaranteeing an IVP's unique solution under smoothness conditions, previewed here informally).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (the IVP definition), A02 (simultaneous condition-solving), and A03 (IVP vs. BVP behavior contrast) each target a distinct LO, appropriate for a compact concept extending already-mastered particular-solution machinery to the multi-condition case.
- Example 3 was deliberately built using the exact ODE $y''+y=0$ already featured in `math.de.bvp`'s own worked examples, specifically so the IVP-vs-BVP contrast could be made on IDENTICAL underlying mathematics, isolating condition-placement as the only variable — this is the strongest possible demonstration that placement, not count, is what determines the qualitatively different guarantee.
- MC-1 (condition-count-determines-outcome) was given the most teaching weight because it directly echoes a genuine, easy-to-make assumption when transitioning from IVPs (uniformly well-behaved, always locally unique) to BVPs (`math.de.bvp`'s own no-solution/unique/infinite trichotomy) — flagging the contrast explicitly here helps consolidate both concepts' teaching.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a specific general solution paired with a starting value, solved for the constant) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

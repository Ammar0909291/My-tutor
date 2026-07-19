# Teaching Blueprint: Boundary Value Problem (`math.de.bvp`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.bvp` |
| name | Boundary Value Problem |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.second-order-ode` |
| unlocks | `math.de.sturm-liouville` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a beam pinned at both ends before the formal two-point conditions |
| description (KG) | An ODE with conditions specified at two or more distinct points. Unlike IVPs, existence and uniqueness are not guaranteed; a BVP may have no solution, a unique solution, or infinitely many solutions. |

## Component 1 — Learning Objectives

- LO1: Define a **Boundary Value Problem (BVP)** as an ODE with conditions specified at **two or more distinct points** (e.g. $y(a)=\alpha$, $y(b)=\beta$ for $a\neq b$), and correctly distinguish it from an **Initial Value Problem (IVP)** (all conditions given at a SINGLE point).
- LO2: Explain that, unlike IVPs (where existence and uniqueness are generally guaranteed under mild conditions), a BVP's **solution behavior is fundamentally different** — a given BVP may have NO solution, a UNIQUE solution, or INFINITELY many solutions, and correctly determine which case a specific BVP falls into by solving the general solution and applying both boundary conditions.
- LO3: Solve a simple BVP by first finding the ODE's **general solution** (with arbitrary constants), THEN applying BOTH boundary conditions as a system of equations to solve for the constants — recognizing that this differs procedurally from an IVP's sequential single-point condition application.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-ode` (the general second-order ODE and its solution methods, typically previously encountered with IVP-style single-point conditions).

## Component 3 — Core Explanation

A **Boundary Value Problem** consists of an ODE together with conditions specified at **two or more distinct points** — e.g., for $y''+y=0$ on $[0,\pi]$, boundary conditions might be $y(0)=0$ and $y(\pi)=0$ (values fixed at BOTH ends of an interval, rather than the value and derivative fixed at a single starting point as in an IVP).

**Existence and uniqueness are NOT guaranteed** (unlike IVPs): a BVP for a linear second-order ODE can fall into exactly one of three cases:
1. **No solution** — the boundary conditions are simply incompatible with the ODE's general solution form.
2. **A unique solution** — exactly one function satisfies both the ODE and both boundary conditions.
3. **Infinitely many solutions** — the boundary conditions leave at least one constant genuinely undetermined, so a whole family of functions satisfies everything.

**Solving procedure**: find the ODE's general solution (containing arbitrary constants, e.g. $y=c_1\cos x+c_2\sin x$ for $y''+y=0$), then substitute BOTH boundary conditions to form a system of equations in the constants — solving this system reveals which of the three cases (no solution, unique, infinitely many) applies.

## Component 4 — Worked Examples

**Example 1 (LO1/LO3 — a unique solution)**: Solve $y''+y=0$ with $y(0)=0$, $y(\pi/2)=1$. General solution: $y=c_1\cos x+c_2\sin x$. Apply $y(0)=0$: $c_1\cos0+c_2\sin0=c_1=0$. Apply $y(\pi/2)=1$: $c_1\cos(\pi/2)+c_2\sin(\pi/2)=c_2=1$. Unique solution: $y=\sin x$.

**Example 2 (LO2 — no solution, breaking MC-1)**: Solve $y''+y=0$ with $y(0)=0$, $y(\pi)=1$. General solution: $y=c_1\cos x+c_2\sin x$. Apply $y(0)=0$: $c_1=0$. Apply $y(\pi)=1$: $c_1\cos\pi+c_2\sin\pi = -c_1+0 = -c_1=1$ — but $c_1=0$ already, so $0=1$, a CONTRADICTION. This BVP has **NO solution** at all — a genuinely different outcome from Example 1's unique solution, despite using the exact same ODE, purely because the SECOND boundary condition was changed.

**Example 3 (LO2 — infinitely many solutions)**: Solve $y''+y=0$ with $y(0)=0$, $y(\pi)=0$. General solution: $y=c_1\cos x+c_2\sin x$. Apply $y(0)=0$: $c_1=0$. Apply $y(\pi)=0$: $c_1\cos\pi+c_2\sin\pi = -c_1+0=0$ — automatically satisfied (since $c_1=0$ already), with NO constraint at all on $c_2$! Every function $y=c_2\sin x$, for ANY value of $c_2$, satisfies both boundary conditions. This BVP has **infinitely many solutions** — a third genuinely different outcome, again from the SAME ODE, with only the boundary point (not even the boundary VALUE) changed from Example 1.

## Component 5 — Teaching Actions

### Teaching Action A01 — BVP vs. IVP, and Solving via General Solution Plus Both Conditions (Primitive P11: Representation Shift)

Start pictorial: describe a beam pinned (fixed displacement) at BOTH ends, versus a beam launched from one point with a known initial displacement AND initial velocity (all conditions at one point) — the first is the BVP picture, the second the IVP picture. State: "IVP conditions all sit at ONE point (like knowing where and how fast something starts); BVP conditions are spread across TWO OR MORE points (like knowing the value at both ends of a beam)."

Work Example 1's full procedure: general solution first, then substitute BOTH boundary conditions as a system, solving for the constants.

- **MC-1 hook**: ask "since a BVP for a nice, nonlinear-free second-order linear ODE always has a solution once you correctly solve for the constants — right?" — a "yes, always" answer reveals MC-1 (assuming a BVP, like an IVP, always has a unique solution once the general solution and conditions are correctly applied, rather than recognizing existence and uniqueness genuinely aren't guaranteed).

### Teaching Action A02 — The Three Genuinely Different Outcomes, Same ODE (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Examples 1, 2, and 3 side by side — ALL using the identical ODE $y''+y=0$, differing only in the SPECIFIC boundary conditions imposed. Show explicitly: Example 1 → unique solution ($y=\sin x$); Example 2 → no solution (a direct contradiction, $0=1$); Example 3 → infinitely many solutions (an unconstrained free constant). State the rule with full force: "the SAME differential equation, with different boundary conditions, can land in ANY of the three cases — this is fundamentally different from IVPs, where (under mild smoothness conditions) a unique solution is essentially always guaranteed."

**Contrast 2**: Connect the mechanism directly: in each case, substituting both boundary conditions produces a 2×2 linear SYSTEM in $c_1,c_2$ — Example 1's system has a unique solution (determinant nonzero, in linear-algebra terms); Example 2's system is INCONSISTENT (no solution exists); Example 3's system is DEPENDENT (infinitely many solutions, one equation redundant) — the same three cases familiar from solving systems of linear equations generally, now appearing in the BVP context.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve the BVP $y''+4y=0$, $y(0)=1$, $y(\pi/4)=0$, and state whether it has no solution, a unique solution, or infinitely many.
  2. Solve the BVP $y''+4y=0$, $y(0)=0$, $y(\pi/2)=0$, and determine which of the three cases applies.
  3. Solve the BVP $y''+4y=0$, $y(0)=0$, $y(\pi/2)=1$, and determine which of the three cases applies.
  4. Explain, using the linear-system analogy, why changing only ONE boundary condition (keeping the same ODE and the other condition fixed) can move a BVP from "unique solution" to "no solution" or "infinitely many solutions."
- **P76 (Transfer Probe, mode = independence)**: "A structural engineer models a beam's deflection using a second-order linear ODE, with boundary conditions specifying the deflection at both supported ends of the beam. (a) Using this lesson's three-case framework, explain what it would mean PHYSICALLY if the engineer's specific choice of end-supports and end-deflection values produced 'no solution' when solved as a BVP — what would this suggest about the physical setup being modeled? (b) Explain what it would mean physically if the BVP instead produced 'infinitely many solutions' — what would this suggest about whether the given boundary information is sufficient to pin down the beam's actual shape uniquely?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BVP-ASSUMED-TO-ALWAYS-HAVE-UNIQUE-SOLUTION | Believing a BVP, like an IVP, always has a unique solution once correctly set up and solved, rather than recognizing existence and uniqueness genuinely aren't guaranteed | Foundational |
| MC-2 | BOTH-BOUNDARY-CONDITIONS-NOT-APPLIED-SIMULTANEOUSLY | Solving for one constant using the first boundary condition alone, without correctly incorporating the second condition into a genuine system, potentially missing an inconsistency or a free parameter | Moderate |
| MC-3 | INFINITELY-MANY-SOLUTIONS-CASE-MISTAKEN-FOR-AN-ERROR | When a boundary condition is found to be automatically satisfied (imposing no genuine constraint), treating this as a computational mistake rather than correctly recognizing it as the genuine "infinitely many solutions" case | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "BVP Uniqueness Overassumption") → P41 (detect: present Example 2's contradictory BVP and ask if a solution must exist) → P64 (conceptual shift: work through the explicit contradiction ($0=1$), showing genuinely no solution exists despite a perfectly valid, correctly-solved general solution being available).
- **B02 (targets MC-2)**: P27 (name it: "Sequential Rather Than Simultaneous Condition Application") → P41 (detect: check whether a student solves for $c_1$ using only the first condition, then treats $c_2$ as automatically determined without properly checking the second condition against it) → P64 (conceptual shift: re-derive by explicitly setting up BOTH conditions as a genuine 2-equation system before solving for either constant).
- **B03 (targets MC-3)**: P27 (name it: "Infinitely-Many-Solutions Mistaken for Error") → P41 (detect: present Example 3's automatically-satisfied second condition and ask if something went wrong) → P64 (conceptual shift: re-anchor on "a condition that's automatically true, leaving a constant fully free, is the genuine signature of the infinitely-many-solutions case — not a sign of a computational mistake").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-ode` (the general second-order ODE and its solution methods, previously encountered with IVP-style conditions).
- **Unlocks**: `math.de.sturm-liouville` (Sturm-Liouville theory studies a specific, richly-structured family of BVPs, building directly on this concept's foundational three-case framework).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (BVP vs. IVP, and the general-solution-plus-both-conditions procedure) and A02 (the three genuinely different outcomes, traced to the underlying linear-system structure) jointly cover all three LOs.
- MC-1 (BVP assumed to always have a unique solution) was made this blueprint's central focus because IVPs (the learner's prior differential-equations experience) essentially always DO have unique solutions under mild conditions, creating a strong but incorrect expectation that BVPs behave the same way — Examples 1-3 were deliberately built from the IDENTICAL ODE, varying only the boundary conditions, specifically to isolate this expectation as the sole variable under test.
- The structural-beam transfer probe was chosen because BVPs are the standard mathematical framework for exactly this kind of physical modeling (deflection fixed at both supports), and the three-case framework has genuine physical interpretive content (no solution suggests an inconsistent/impossible physical setup; infinitely many solutions suggests underdetermined boundary information) rather than being a purely abstract mathematical curiosity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.de.second-order-ode`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: pinned-beam before formal two-point conditions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

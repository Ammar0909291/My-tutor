# Teaching Blueprint: Green's Function (`math.de.greens-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.greens-function` |
| name | Green's Function |
| domain | Differential Equations |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 9 |
| requires | `math.de.poisson-equation`, `math.de.ivp` |
| unlocks | none |
| cross_links | `math.fnal.distributions` (not yet authored at time of writing — see Component 7) |
| CPA_entry_stage | A (Abstract) — research-tier learner already has Poisson's Equation and IVP machinery; the point-source construction is introduced directly |
| description (KG) | The Green's function G(x,ξ) is the response to a unit point source: LG=δ(x−ξ). Allows expressing solutions to Lu=f as u(x)=∫G(x,ξ)f(ξ)dξ. Encodes both operator and boundary conditions. |

## Component 1 — Learning Objectives

- LO1: Define the **Green's function** $G(x,\xi)$ as the response of a linear differential operator $L$ to a unit point source at $x=\xi$: $LG=\delta(x-\xi)$, and CONSTRUCT it directly for a simple boundary-value problem — via a piecewise ansatz satisfying each boundary condition separately, glued together with a specific derivative JUMP at $x=\xi$ (the signature of a genuine point source, not an ordinary smooth solution) — directly fulfilling `math.de.poisson-equation`'s own point-source-then-superpose preview.
- LO2: Apply the **superposition formula** $u(x)=\int G(x,\xi)f(\xi)\,d\xi$ to construct the solution to the FULL nonhomogeneous equation $Lu=f$ from the Green's function alone, correctly distinguishing this from the mistaken belief that $G$ by itself (without integrating against $f$) already solves the general problem.
- LO3 (orientation level, given research-tier scope): recognize that $G(x,\xi)$ encodes the **boundary conditions** as well as the operator $L$ — a fixed $L$ with DIFFERENT boundary conditions produces a genuinely different Green's function — and recognize, without deriving, that the Dirac delta $\delta(x-\xi)$ is not an ordinary function but a genuine mathematical object (a distribution) requiring its own careful theory, deferred to `math.fnal.distributions`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.poisson-equation` (the nonhomogeneous equation $\nabla^2u=f$, and its own orientation-level preview of the Green's-function point-source-then-superpose strategy) and `math.de.ivp` (solving for unknown constants by imposing conditions simultaneously, and the general vs. particular solution distinction).

## Component 3 — Core Explanation

**Constructing $G$ via a piecewise ansatz with a derivative jump**: for a linear operator $L$ and boundary conditions on an interval, the Green's function $G(x,\xi)$ satisfies $LG=\delta(x-\xi)$ together with the SAME boundary conditions as the original problem. Since $\delta(x-\xi)$ is a point source concentrated exactly at $x=\xi$, $G$ is typically constructed PIECEWISE: one form satisfying the LEFT boundary condition for $x<\xi$, another form satisfying the RIGHT boundary condition for $x>\xi$, glued together by requiring CONTINUITY of $G$ at $x=\xi$ together with a specific JUMP in $G$'s derivative there (found by integrating the defining equation across the point source) — a genuine kink, not an ordinary smooth solution throughout.

**The superposition formula does the essential work**: once $G$ is found, the solution to the FULL nonhomogeneous equation $Lu=f$ for an ARBITRARY source $f$ is $u(x)=\int G(x,\xi)f(\xi)\,d\xi$ — literally summing (superposing) the point-source responses $G(x,\xi)$ over every location $\xi$, each weighted by the actual source strength $f(\xi)$ there. Finding $G$ alone answers only the single point-source case; the integral against $f$ is what generalizes that single response into the solution for a genuinely continuous, distributed source.

**$G$ encodes boundary conditions too, and $\delta$'s true nature (orientation level)**: since $G$'s piecewise construction directly uses the specific boundary conditions at each step, changing those conditions (while keeping the same operator $L$) produces a genuinely DIFFERENT $G$ — the Green's function is not a property of $L$ alone. Separately, $\delta(x-\xi)$ itself is not an ordinary function (no ordinary function is zero everywhere except one point, yet integrates to $1$ there) — it is a rigorous mathematical object called a **distribution**, whose full theory is the dedicated subject of `math.fnal.distributions`.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing $G$ for a 1D boundary-value problem, breaking MC-1)**: solve $-u''=f(x)$ on $[0,1]$ with $u(0)=u(1)=0$. The Green's function satisfies $-G''=\delta(x-\xi)$ with $G(0,\xi)=G(1,\xi)=0$. For $x<\xi$: $G=Ax$ (satisfies $G(0)=0$). For $x>\xi$: $G=B(1-x)$ (satisfies $G(1)=0$). CONTINUITY at $x=\xi$: $A\xi=B(1-\xi)$. Integrating $-G''=\delta(x-\xi)$ across $x=\xi$ forces a JUMP: $G'(\xi^-)-G'(\xi^+)=1$, i.e. $A-(-B)=1$. Solving these two conditions gives $A=1-\xi$, $B=\xi$, so
$$G(x,\xi)=\begin{cases}x(1-\xi) & x\le\xi\\ \xi(1-x) & x\ge\xi\end{cases}$$
— a genuine derivative kink at $x=\xi$ (NOT a smooth function there), exactly the signature of responding to a concentrated point source.

**Example 2 (LO2 — the superposition integral, not $G$ alone, solves the general problem, breaking MC-2)**: using the SAME $G$ from Example 1, solve $-u''=1$ (a constant source) on $[0,1]$ with $u(0)=u(1)=0$ via $u(x)=\int_0^1G(x,\xi)\cdot1\,d\xi=\int_0^x\xi(1-x)\,d\xi+\int_x^1x(1-\xi)\,d\xi$. Computing: $(1-x)\cdot\frac{x^2}2 + x\left[\frac12-x+\frac{x^2}2\right] = \frac{x^2}2-\frac{x^3}2+\frac x2-x^2+\frac{x^3}2 = \frac x2-\frac{x^2}2 = \frac{x(1-x)}2$. This EXACTLY matches the known closed-form solution to $-u''=1$, $u(0)=u(1)=0$ (verify: $u''=-1$ for $u=x(1-x)/2$, so $-u''=1$ ✓; $u(0)=u(1)=0$ ✓). The Green's function ALONE did not produce this answer — the integral against the actual source $f(\xi)=1$ was the essential step combining the point-source responses into the genuine solution.

**Example 3 (LO3, orientation level — $G$ depends on boundary conditions too, and $\delta$'s true nature)**: if the boundary conditions were instead $u(0)=0$, $u'(1)=0$ (a MIXED condition) rather than $u(0)=u(1)=0$, the SAME operator $-d^2/dx^2$ would require a genuinely DIFFERENT construction — the right-hand piece would need to satisfy $u'(1)=0$ instead of $u(1)=0$, producing a different $G(x,\xi)$ despite $L$ being unchanged. This shows $G$ encodes the boundary conditions, not just $L$. Separately, the Dirac delta $\delta(x-\xi)$ in $LG=\delta(x-\xi)$ is not an ordinary pointwise function — no ordinary function is zero everywhere except one point yet integrates to $1$ there — it is a genuine mathematical object (a distribution), rigorously developed in `math.fnal.distributions`.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Jump Condition Is the Signature of a Point Source (Primitive P11: Representation Shift)

State: "a Green's function isn't a smooth solution throughout the interval — the point source at $x=\xi$ forces a genuine kink there, and finding that specific derivative jump is the heart of constructing $G$." Work Example 1's full piecewise construction, including the continuity and jump conditions.

- **MC-1 hook**: ask "can the Green's function for $-u''=\delta(x-\xi)$ be found as a single smooth formula valid across the whole interval, without treating $x<\xi$ and $x>\xi$ separately?" — a "yes" answer reveals MC-1 (missing that the point source forces a genuine piecewise construction with a derivative jump at $x=\xi$).

### Teaching Action A02 — $G$ Alone Does Not Solve the General Problem; the Integral Does (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: plugging $G$ into the superposition integral against $f(\xi)=1$ reproduces the EXACT known solution $x(1-x)/2$ — a computation $G$ alone, without the integral, could never produce. State: "$G$ answers only the single point-source question — the integral against the real source $f$ is what builds the actual general solution."

- **MC-2 hook**: ask "once you've found the Green's function $G(x,\xi)$ for an operator, have you already solved the general nonhomogeneous equation $Lu=f$ for any source $f$?" — a "yes" answer reveals MC-2 (missing that the superposition integral against $f$ is the essential remaining step).

### Teaching Action A03 — Changing Boundary Conditions Changes $G$, Even With the Same Operator (Primitive P06: Contrast Pair)

Contrast Example 1's $G$ (for $u(0)=u(1)=0$) against Example 3's discussion of a DIFFERENT $G$ needed for $u(0)=0,u'(1)=0$ — the same operator $-d^2/dx^2$, genuinely different Green's functions. State: "$G$ is a property of the WHOLE boundary-value problem, operator plus boundary conditions together — not of the operator alone."

- **MC-3 hook**: ask "if the differential operator $L$ stays the same, must the Green's function $G$ also stay the same regardless of the boundary conditions?" — a "yes" answer reveals MC-3 (missing that $G$ encodes the boundary conditions as much as the operator).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $G(x,\xi)=x(1-\xi)$ for $x\le\xi$ and $\xi(1-x)$ for $x\ge\xi$, verify $G$ is continuous at $x=\xi$ (check both pieces agree there).
  2. Using the SAME $G$, solve $-u''=2$ (a different constant source) on $[0,1]$ with $u(0)=u(1)=0$ via the superposition integral, and verify your answer against the known exact solution $u(x)=x(1-x)$.
  3. Explain why finding $G$ alone does not finish solving $Lu=f$ for a general source $f$, referencing the superposition integral.
  4. Explain why changing the boundary conditions (while keeping the same differential operator $L$) produces a different Green's function, referencing Example 3's mixed-condition contrast.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models the deflection $u(x)$ of a beam under a distributed load $f(x)$, governed by $-u''=f(x)$ on $[0,2]$ with fixed ends $u(0)=u(2)=0$ (a different interval from this lesson's $[0,1]$). (a) Without fully deriving it, explain in general terms what two properties the Green's function $G(x,\xi)$ for this new interval must satisfy (referencing the point-source equation and the boundary conditions). (b) If the engineer already has $G(x,\xi)$ for this beam, explain precisely how they would use it to find the deflection under a specific load $f(x)=3$ (constant), referencing the superposition integral — and what would go wrong if they simply used $G(x,\xi)$ itself as the answer without integrating against $f$. (c) A colleague claims that since the differential operator $-d^2/dx^2$ is the same as in this lesson's example, the Green's function must also be identical. Explain why this is incorrect, given the interval has changed from $[0,1]$ to $[0,2]$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GREENS-FUNCTION-ASSUMED-SMOOTH-THROUGHOUT | Believing the Green's function can be found as a single smooth formula across the whole interval, missing that the point source forces a genuine piecewise construction with a derivative jump at $x=\xi$ | Foundational |
| MC-2 | GREENS-FUNCTION-ALONE-ASSUMED-SUFFICIENT | Believing that finding $G$ already solves the general nonhomogeneous equation $Lu=f$, missing that the superposition integral $\int G(x,\xi)f(\xi)\,d\xi$ is the essential remaining step | High |
| MC-3 | GREENS-FUNCTION-ASSUMED-OPERATOR-ONLY | Believing the Green's function depends only on the differential operator $L$, missing that it also encodes the specific boundary conditions, which genuinely change $G$ | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Green's Function Assumed Smooth Throughout") → P41 (detect: ask whether $G$ can be a single smooth formula valid everywhere) → P64 (conceptual shift: re-walk Example 1's piecewise construction and jump condition, re-anchoring on "the point source forces a genuine kink at $x=\xi$").
- **B02 (targets MC-2)**: P27 (name it: "Green's Function Alone Assumed Sufficient") → P41 (detect: ask whether finding $G$ already solves $Lu=f$ for any source $f$) → P64 (conceptual shift: re-walk Example 2's superposition-integral verification, re-anchoring on "the integral against $f$ is what builds the actual solution").
- **B03 (targets MC-3)**: P27 (name it: "Green's Function Assumed Operator-Only") → P41 (detect: ask whether $G$ stays the same if boundary conditions change but $L$ doesn't) → P64 (conceptual shift: re-walk Example 3's mixed-condition contrast, re-anchoring on "$G$ encodes the whole boundary-value problem, not just the operator").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.poisson-equation` (whose own orientation-level LO3 previewed exactly the point-source-then-superpose strategy this concept develops in full) and `math.de.ivp` (the simultaneous-condition-solving technique this concept's piecewise construction directly reuses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.fnal.distributions`, checked via `ls docs/curriculum/blueprints/` at the time of authoring THIS blueprint and confirmed not yet authored. $P76_{mode}=$ **independence**. (Note: `math.fnal.distributions` is authored later in this same batch, and its own blueprint engages this concept as a genuine cross-link probe in the opposite direction, directly resolving the $\delta$-is-not-an-ordinary-function concern this concept flags in LO3/Example 3.)

## Component 8 — Teaching Notes

- estimated_hours = 9 with a research/analyze tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine piecewise Green's-function construction and a verified superposition-integral computation) and LO3 kept orientation-level, appropriately flagging the boundary-condition dependence and the Dirac delta's true nature without developing distribution theory itself.
- **Division of labor**: `math.de.poisson-equation` owns the nonhomogeneous-equation framing and first previewed this concept's own point-source-then-superpose strategy in orientation-level form; this concept owns the FULL construction (piecewise ansatz, jump condition) and the superposition formula's concrete verification, deliberately using the simplest possible 1D boundary-value problem so the mechanics are fully hand-computable rather than asserted.
- Example 1's interval $[0,1]$ and boundary conditions $u(0)=u(1)=0$ were chosen as the standard, simplest textbook Green's-function example specifically so every computation (the piecewise pieces, the jump condition, the superposition integral) could be verified by hand against a known closed-form answer — establishing genuine trust in the method before LO3's orientation-level generalizations.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.distributions` unauthored at time of writing → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner already has Poisson/IVP machinery; construction introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

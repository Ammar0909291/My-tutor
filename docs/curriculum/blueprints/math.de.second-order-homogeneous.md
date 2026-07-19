# Teaching Blueprint: Homogeneous Second-Order Linear ODE (`math.de.second-order-homogeneous`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.second-order-homogeneous` |
| name | Homogeneous Second-Order Linear ODE |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.de.second-order-linear` |
| unlocks | `math.de.char-equation`, `math.de.wronskian` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct build on the already-established superposition principle |
| description (KG) | The equation y″ + P(x)y′ + Q(x)y = 0. Two linearly independent solutions y₁, y₂ form a fundamental set; general solution is c₁y₁ + c₂y₂. Linearity determined by the Wronskian. |

## Component 1 — Learning Objectives

- LO1: State the standard **homogeneous** second-order linear ODE $y''+P(x)y'+Q(x)y=0$ (already introduced as the $G=0$ case in `math.de.second-order-linear`), and given two specific solutions $y_1,y_2$, write the **general solution** $c_1y_1+c_2y_2$ using the already-established superposition principle.
- LO2: Define a **fundamental set of solutions** as a pair $y_1,y_2$ that are **linearly independent** — and explain WHY linear independence is essential: two linearly DEPENDENT solutions (one a scalar multiple of the other) would only span a one-dimensional family, failing to capture the FULL two-dimensional solution space a second-order equation genuinely has.
- LO3: Use the **Wronskian** $W(y_1,y_2)=y_1y_2'-y_1'y_2$ as a practical TEST for linear independence — $W\neq0$ (at even a single point) confirms $y_1,y_2$ are independent and form a genuine fundamental set; $W\equiv0$ signals dependence (for solutions of the SAME homogeneous linear ODE — a subtlety worth flagging, since the Wronskian test's full validity in this direction relies on both functions solving the same equation).

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-linear` (the standard form, homogeneous/nonhomogeneous distinction, and — critically — the superposition principle already proven for the homogeneous case).

## Component 3 — Core Explanation

The **homogeneous** second-order linear ODE is $y''+P(x)y'+Q(x)y=0$ (the $G(x)=0$ case from `math.de.second-order-linear`). Given two SOLUTIONS $y_1,y_2$, the superposition principle (already established) guarantees $c_1y_1+c_2y_2$ is ALSO a solution for any constants $c_1,c_2$ — but this is only the GENERAL solution (capturing every possible solution) if $y_1,y_2$ are chosen correctly.

**Fundamental set requires linear independence**: if $y_1,y_2$ are **linearly dependent** (one is a constant multiple of the other, e.g. $y_2=5y_1$), then $c_1y_1+c_2y_2 = c_1y_1+5c_2y_1=(c_1+5c_2)y_1$ — this collapses to just a SINGLE-parameter family (multiples of $y_1$ alone), NOT the full two-dimensional solution space a genuine second-order linear homogeneous ODE has. Only a **linearly independent** pair $y_1,y_2$ — called a **fundamental set** — gives $c_1y_1+c_2y_2$ that genuinely spans EVERY solution.

**The Wronskian test**: $W(y_1,y_2)(x) = y_1(x)y_2'(x)-y_1'(x)y_2(x)$. For two solutions of the SAME homogeneous linear ODE: if $W(x_0)\neq0$ at even ONE point $x_0$, then $y_1,y_2$ are linearly independent EVERYWHERE (a genuinely useful theorem — checking just one point suffices, rather than needing to verify independence "everywhere" directly). If $W\equiv0$ (identically zero, for solutions of the same equation), $y_1,y_2$ are linearly dependent.

## Component 4 — Worked Examples

**Example 1 (LO1 — general solution from two given solutions)**: For $y''-y=0$, verify $y_1=e^x$, $y_2=e^{-x}$ are both solutions (direct substitution, as in `math.de.second-order-linear`'s own Example 2). The general solution: $y=c_1e^x+c_2e^{-x}$.

**Example 2 (LO2/LO3 — fundamental set verified via Wronskian, breaking MC-1)**: For $y_1=e^x,y_2=e^{-x}$ (Example 1): $W(y_1,y_2) = e^x(-e^{-x}) - e^x(e^{-x}) = -1-1=-2\neq0$ — nonzero at every point, confirming $y_1,y_2$ ARE linearly independent, forming a genuine fundamental set; $c_1e^x+c_2e^{-x}$ is truly the GENERAL solution. Contrast: consider instead the pair $y_1=e^x$, $\tilde y_2=3e^x$ (both ALSO solve $y''-y=0$, since any constant multiple of a solution is still a solution). Compute $W(y_1,\tilde y_2) = e^x(3e^x)-e^x(3e^x)=0$ — the Wronskian is IDENTICALLY zero, correctly signaling $y_1,\tilde y_2$ are linearly DEPENDENT ($\tilde y_2=3y_1$), so $c_1y_1+c_2\tilde y_2 = (c_1+3c_2)e^x$ only spans a ONE-dimensional family — NOT the general solution, despite both being valid individual solutions.

**Example 3 (LO3 — checking the Wronskian at just one point suffices)**: For $y_1=\cos x,y_2=\sin x$ (both solutions of $y''+y=0$): compute $W$ at $x=0$: $W(0) = \cos(0)\cos(0)-(-\sin(0))\sin(0) = 1(1)-0(0)=1\neq0$. Since $W(0)\neq0$, this ALONE confirms $y_1,y_2$ are linearly independent EVERYWHERE (not just at $x=0$) — no need to separately check the Wronskian at every other point; the theorem guarantees a single nonzero evaluation is sufficient.

## Component 5 — Teaching Actions

### Teaching Action A01 — General Solution from Two Solutions, and Why Independence Matters (Primitive P11: Representation Shift)

Recall the superposition principle directly. State: "given two solutions, you automatically get a whole family via $c_1y_1+c_2y_2$ — but for this family to be the GENUINE general solution (capturing EVERY possible solution), the two you started with must be genuinely different in a specific technical sense: linearly independent." Work Example 1's direct general-solution write-up.

Shift representation to the Wronskian: define it, then work Example 2's TWO computations side by side — one nonzero (genuine fundamental set), one identically zero (dependent, collapsed family).

- **MC-1 hook**: present two valid individual solutions to the SAME homogeneous ODE (like $e^x$ and $3e^x$ from Example 2) and ask "since both are valid solutions, does $c_1e^x+c_2(3e^x)$ automatically give the general solution?" — a "yes" answer reveals MC-1 (believing ANY two solutions, regardless of linear independence, automatically combine to give the general solution).

### Teaching Action A02 — The Wronskian as a One-Point Sufficient Test (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 2's two Wronskian computations directly side by side — $W(e^x,e^{-x})=-2\neq0$ (genuine fundamental set) versus $W(e^x,3e^x)=0$ (dependent, collapsed family) — state precisely: "not every pair of valid solutions forms a fundamental set — the Wronskian tells you definitively which pairs genuinely work."

**Contrast 2**: Work Example 3's single-point sufficiency directly — checking $W(0)\neq0$ and stating the THEOREM (for solutions of the same linear homogeneous ODE) that this single nonzero evaluation guarantees independence everywhere, sparing the (impossible, in general) task of checking every point individually. Contrast this efficient theorem-based shortcut against naively trying to verify "$y_1\neq cy_2$ for every possible constant $c$, at every point" directly.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify $y_1=e^{2x}$ and $y_2=e^{-2x}$ both solve $y''-4y=0$, then write the general solution.
  2. Compute the Wronskian of $y_1=e^{2x}$ and $y_2=e^{-2x}$ from problem 1, and confirm they form a fundamental set.
  3. Given that $y_1=\cos(3x)$ and $y_2=\sin(3x)$ both solve $y''+9y=0$, compute their Wronskian and confirm they form a fundamental set.
  4. A student proposes using $y_1=\cos(3x)$ and $y_2=4\cos(3x)$ (both solutions of $y''+9y=0$, since $4\cos(3x)$ is just a scalar multiple) as a fundamental set. Compute their Wronskian and explain why this pair fails to form a genuine fundamental set.
- **P76 (Transfer Probe, mode = independence)**: "A mechanical engineer models a spring-mass system's oscillation using $y''+9y=0$ (undamped, from Newton's second law), and has found two specific solutions: $y_1=\cos(3t)$ (representing a scenario starting at maximum displacement with zero velocity) and $y_2=\sin(3t)$ (representing a scenario starting at zero displacement with maximum velocity). (a) Using the Wronskian, confirm these two solutions genuinely form a fundamental set, and explain why this matters for the engineer's ability to describe EVERY possible oscillation scenario (not just the two specific starting conditions each solution individually represents) via $c_1\cos(3t)+c_2\sin(3t)$. (b) A colleague suggests using $y_1=\cos(3t)$ and $y_3=-2\cos(3t)$ instead, arguing both are valid solutions. Explain, using the Wronskian, why this second pair would fail to let the engineer describe every possible oscillation scenario."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ANY-TWO-SOLUTIONS-ASSUMED-TO-FORM-FUNDAMENTAL-SET | Believing any two valid solutions of a homogeneous linear ODE automatically combine (via superposition) to give the general solution, without checking linear independence | Foundational |
| MC-2 | WRONSKIAN-CHECKED-AT-ONLY-ONE-ARBITRARY-POINT-WITHOUT-JUSTIFICATION | Checking the Wronskian at a single point and concluding independence WITHOUT recognizing this relies on the specific theorem (valid for solutions of the SAME homogeneous linear ODE) that a single nonzero evaluation suffices | Moderate |
| MC-3 | WRONSKIAN-COMPUTED-WITH-SIGN-OR-TERM-ORDER-ERROR | Computing the Wronskian as $y_1'y_2-y_1y_2'$ (terms/signs swapped) instead of the correct $y_1y_2'-y_1'y_2$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Any-Solutions-Pair Assumption") → P41 (detect: present $e^x$ and $3e^x$ as a candidate fundamental set and ask if they work) → P64 (conceptual shift: compute the Wronskian directly, showing it's identically zero, confirming dependence and the collapsed one-parameter family).
- **B02 (targets MC-2)**: P27 (name it: "Single-Point Check Without Theorem Justification") → P41 (detect: ask a student WHY checking the Wronskian at just one point suffices, checking for genuine understanding versus rote application) → P64 (conceptual shift: re-anchor on the specific theorem's scope — this shortcut is valid precisely because $y_1,y_2$ solve the SAME homogeneous linear ODE, a fact that makes the Wronskian itself satisfy a simple first-order ODE guaranteeing it's either always zero or never zero).
- **B03 (targets MC-3)**: P27 (name it: "Wronskian Term Order Error") → P41 (detect: check a student's Wronskian computation for correctly ordered terms) → P64 (conceptual shift: re-derive from the precise definition $W=y_1y_2'-y_1'y_2$, working through Example 2's computation step by step to reinforce the correct term order).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-linear` (the standard form and, critically, the already-proven superposition principle this concept builds directly on).
- **Unlocks**: `math.de.char-equation` (the characteristic equation is the practical tool for actually FINDING a fundamental set of solutions for constant-coefficient homogeneous equations), `math.de.wronskian` (a dedicated, deeper treatment of the Wronskian's own properties, e.g. Abel's formula).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at the "2 main TAs + gate" tier — A01 (general solution from two solutions, and why independence matters) and A02 (the Wronskian as a definitive test, plus its one-point sufficiency) jointly cover all three LOs.
- MC-1 (any two solutions assumed to form a fundamental set) was made this blueprint's central focus because the superposition principle (just established in the prerequisite concept) can easily be over-read as "any two solutions automatically give the general solution," when in fact linear independence is a genuine ADDITIONAL requirement — Example 2's deliberate pairing of a genuine fundamental set against a dependent pair (both drawn from the SAME ODE, $y''-y=0$) was designed to isolate independence, not solution-validity, as the actual variable under test.
- The spring-mass transfer probe was chosen because the physical interpretation of $\cos(3t)$ and $\sin(3t)$ as two genuinely different initial-condition scenarios (max-displacement-zero-velocity vs. zero-displacement-max-velocity) gives linear independence real physical meaning — a fundamental set corresponds to two GENUINELY different starting behaviors whose combinations describe every possible oscillation, while a dependent pair (like $\cos(3t)$ and $-2\cos(3t)$) would only ever describe scaled/inverted versions of the SAME behavior.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.de.second-order-linear`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, direct build on established superposition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

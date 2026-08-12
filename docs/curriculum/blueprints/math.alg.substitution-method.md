# Teaching Blueprint: Substitution Method (`math.alg.substitution-method`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.substitution-method` |
| name | Substitution Method |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.alg.system-linear-equations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Solving a system of equations by expressing one variable in terms of others from one equation and substituting into the remaining equations.

 |

## Component 1 — Learning Objectives

- LO1: Solve a system of two linear equations by isolating one variable in ONE equation, then substituting that expression into the OTHER equation.
- LO2: Back-substitute the found value into the isolated expression to find the SECOND variable, completing the full solution pair.
- LO3: Recognize when the substitution method produces a FALSE numerical statement (no solution — inconsistent system) or a TRUE statement independent of the variables (infinitely many solutions — dependent system).

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.system-linear-equations` (what a system of equations is, and what solving it means).

## Component 3 — Core Explanation

The **substitution method** solves a system of two equations by: (1) solving ONE equation for one variable in terms of the other; (2) SUBSTITUTING that expression into the OTHER equation, reducing it to a single-variable equation; (3) solving that single-variable equation; (4) BACK-SUBSTITUTING the found value into the expression from step 1 to find the remaining variable.

If step 3 produces a FALSE statement (like $0=5$), the system is INCONSISTENT — no solution exists (the two equations represent parallel, non-intersecting lines). If step 3 produces a TRUE statement independent of the variable (like $0=0$), the system is DEPENDENT — infinitely many solutions exist (the two equations represent the SAME line).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard case)**: Solve $y=2x+1$ and $3x+y=11$. Substitute the first equation's expression for $y$ into the second: $3x+(2x+1)=11\Rightarrow5x+1=11\Rightarrow x=2$. Back-substitute: $y=2(2)+1=5$. Solution: $(2,5)$. Check: $3(2)+5=11$ ✓.

**Example 2 (LO3 — inconsistent system, breaking MC-1)**: Solve $y=3x+2$ and $y=3x-4$. Substitute: $3x+2=3x-4\Rightarrow2=-4$ — a FALSE statement, independent of $x$. This means the system is INCONSISTENT: no solution exists (the two lines have the same slope, $3$, but different $y$-intercepts, so they never intersect). A common error, upon reaching a false numerical statement, either concludes "$x=0$" (misinterpreting the equation) or gets confused and abandons the problem, rather than correctly recognizing this specific outcome as the definitive signal of NO SOLUTION.

**Example 3 (LO3 — dependent system, breaking MC-2)**: Solve $y=2x+3$ and $2y=4x+6$. Substitute: $2(2x+3)=4x+6\Rightarrow4x+6=4x+6\Rightarrow6=6$ — a TRUE statement, independent of $x$. This means the system is DEPENDENT: infinitely many solutions exist (the second equation is just $2\times$ the first — the same line). A common error mistakes this outcome for "no solution" (confusing it with the inconsistent case) or for "$x$ can be any single specific value," rather than correctly stating the solution set is the entire line $y=2x+3$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Isolate, Substitute, Solve, Back-Substitute (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly labeling each of the four steps (isolate, substitute, solve, back-substitute) as the process unfolds, emphasizing that back-substitution is a required LAST step, not optional.

### Teaching Action A02 — False Statement Means No Solution; True Statement Means Infinite Solutions (Primitive P06: Contrast Pair)

Work Examples 2 and 3 side by side, explicitly contrasting the FALSE outcome ($2=-4$, inconsistent, no solution) against the TRUE outcome ($6=6$, dependent, infinitely many solutions) — two structurally similar-looking "variable disappeared" results with OPPOSITE meanings. State the rule: "when the variable cancels out entirely, check whether what remains is true or false — false means the lines never meet (no solution); true means the lines are identical (infinitely many solutions)."

- **MC-1 hook** (targets the inconsistent case) and **MC-2 hook** (targets the dependent case): both misconceptions are directly addressed by this side-by-side contrast, checking whether each case is correctly classified.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Solve the system $y=x+4$ and $2x+y=10$ using substitution.
  2. Solve the system $y=5x-2$ and $y=5x+3$, and classify the outcome (unique solution, no solution, or infinitely many).
  3. Solve the system $x=2y+1$ and $3x-6y=3$, and classify the outcome.
  4. Explain, in one sentence, how to distinguish "no solution" from "infinitely many solutions" when the variable cancels out during substitution.
- **P76 (Transfer Probe, mode = independence)**: "Two mobile phone plans are modeled by cost equations: Plan A: $C=0.10m+20$ (where $m$ is minutes used); Plan B: $C=0.10m+35$. (a) Attempt to solve this system using substitution to find a minute usage $m$ where both plans cost the same, and interpret what the resulting equation tells you about whether such a break-even point exists. (b) Explain, using this lesson's inconsistent-system idea, what this result means in practical terms for someone comparing the two phone plans (hint: compare the plans' per-minute rates)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INCONSISTENT-SYSTEM-FALSE-STATEMENT-MISINTERPRETED | Reaching a false numerical statement (like $2=-4$) during substitution and failing to correctly conclude "no solution," instead misreading it or abandoning the problem | Foundational |
| MC-2 | DEPENDENT-SYSTEM-TRUE-STATEMENT-CONFUSED-WITH-NO-SOLUTION | Reaching a true numerical statement (like $6=6$) and incorrectly concluding "no solution" instead of "infinitely many solutions," conflating the two opposite outcomes | Foundational |
| MC-3 | BACK-SUBSTITUTION-STEP-OMITTED | Solving for the first variable but forgetting to back-substitute to find the second, leaving the solution incomplete (only one coordinate found) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Inconsistent System False Statement Misinterpreted") → P41 (detect: present Example 2 and check whether "no solution" is correctly concluded from $2=-4$) → P64 (conceptual shift: re-state the rule explicitly — "a false statement with no variable remaining means the system has NO solution" — and connect to the parallel-lines geometric interpretation).
- **B02 (targets MC-2)**: P27 ("Dependent System True Statement Confused with No Solution") → P41 (detect: present Example 3 and check whether "no solution" is (incorrectly) concluded from $6=6$) → P64 (conceptual shift: re-derive by checking that the second equation is just a multiple of the first, confirming they represent the SAME line with infinitely many shared points).
- **B03 (targets MC-3)**: P27 ("Back-Substitution Step Omitted") → P41 (detect: review a submitted solution for a missing second coordinate) → P64 (re-walk Example 1's back-substitution step explicitly as a required final step, not optional cleanup).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.system-linear-equations`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; a common alternative technique (elimination method) is not authored as a separate entry in this batch.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that the substitution PROCESS itself is a straightforward four-step algorithm; the genuine complexity lies in correctly classifying the two special (variable-cancels) outcomes.
- MC-1 and MC-2 are tied for foundational severity because they represent OPPOSITE misclassifications of structurally similar-looking outcomes — exactly the kind of confusion that requires deliberate side-by-side contrast (Teaching Action A02) rather than teaching each case in isolation.
- The phone-plan transfer probe was deliberately designed around a genuine no-solution (inconsistent) real-world scenario — two plans with the SAME per-minute rate but different base fees never break even — to give the abstract "no solution" outcome concrete, intuitive meaning beyond an algebraic curiosity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.system-linear-equations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Absolute Value Equations (`math.alg.absolute-value-equations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.absolute-value-equations` |
| name | Absolute Value Equations |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.arith.absolute-value`, `math.alg.linear-equation-1var` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — number-line distance representations before symbolic case-splitting |
| description (KG) | Equations and inequalities involving the absolute value; solved by splitting into cases based on the sign of the expression inside the absolute value.

 |

## Component 1 — Learning Objectives

- LO1: Solve an absolute value equation $|expression|=k$ (for $k\ge0$) by splitting into two cases: $expression=k$ and $expression=-k$.
- LO2: Recognize when an absolute value equation has NO solution — specifically when it is set equal to a NEGATIVE number, since $|x|\ge0$ always.
- LO3: Solve an absolute value INEQUALITY, correctly distinguishing $|expression|<k$ (a conjunction/"between" region) from $|expression|>k$ (a disjunction/"outside" region).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.absolute-value` (distance from zero, always non-negative) and `math.alg.linear-equation-1var` (solving each resulting case).

## Component 3 — Core Explanation

An **absolute value equation** $|expression|=k$ (with $k\ge0$) is solved by splitting into TWO cases, since the expression inside could be either $k$ or $-k$ and still have absolute value $k$: Case 1: $expression=k$; Case 2: $expression=-k$. Solve each case as an ordinary equation, and the solution set is the UNION of both cases' solutions.

If $k<0$, the equation $|expression|=k$ has NO solution at all, since absolute value can never be negative.

**Absolute value inequalities** split differently by TYPE: $|expression|<k$ (for $k>0$) means the expression is BETWEEN $-k$ and $k$: $-k<expression<k$ (a single connected interval, a "conjunction/AND" region). $|expression|>k$ means the expression is EITHER less than $-k$ OR greater than $k$: $expression<-k$ OR $expression>k$ (two separate, disconnected pieces, a "disjunction/OR" region).

## Component 4 — Worked Examples

**Example 1 (LO1 — basic two-case split)**: Solve $|2x-3|=7$. Case 1: $2x-3=7\Rightarrow x=5$. Case 2: $2x-3=-7\Rightarrow x=-2$. Solution set: $\{-2,5\}$. Check both: $|2(5)-3|=|7|=7$ ✓; $|2(-2)-3|=|-7|=7$ ✓.

**Example 2 (LO2 — no solution when set equal to a negative, breaking MC-1)**: Solve $|3x+1|=-4$. Since $-4<0$ and absolute value can NEVER be negative, this equation has NO SOLUTION — the solution set is $\varnothing$, with NO case-splitting needed or possible. A common error proceeds directly to case-splitting anyway ("$3x+1=-4$ or $3x+1=4$"), producing spurious "solutions" that don't actually satisfy the original equation when checked — the sign of the right-hand side must be checked FIRST, before attempting to split into cases.

**Example 3 (LO3 — inequality direction determines AND vs. OR, breaking MC-2)**: Solve $|x-2|<5$: this is a "BETWEEN" case, giving $-5<x-2<5\Rightarrow-3<x<7$ (one connected interval). Solve $|x-2|>5$: this is an "OUTSIDE" case, giving $x-2<-5$ OR $x-2>5\Rightarrow x<-3$ OR $x>7$ (two disconnected pieces). A common error applies the SAME structure (either always "between" or always "outside") to both inequality directions, rather than recognizing that $<$ produces a connected AND-region while $>$ produces a disconnected OR-region — these are genuinely different logical structures, not interchangeable.

## Component 5 — Teaching Actions

### Teaching Action A01 — Two Cases: Expression Equals k or Equals -k (Primitive P64: Conceptual Shift)

Work Example 1 with a number-line diagram showing $2x-3$ landing at EITHER $+7$ or $-7$ (both distance 7 from zero), connecting the two symbolic cases directly to this distance interpretation before solving each linear equation.

### Teaching Action A02 — Check the Sign First: No Solution When Set to a Negative (Primitive P06: Contrast Pair)

Work Example 2, contrasting the flawed direct-case-split attempt (yielding false "solutions" that fail when checked) against the correct immediate recognition that $|expr|=$ negative has NO solution. State the rule: "before splitting into cases, check the right-hand side's sign — if it's negative, stop immediately; there's nothing to solve."

- **MC-1 hook**: this directly targets MC-1 (case-splitting without checking the sign first).

### Teaching Action A03 — Less-Than Gives AND (Between); Greater-Than Gives OR (Outside) (Primitive P06: Contrast Pair, second pairing)

Work Example 3's two inequality directions side by side, using a number line to show the connected "between" region for $<$ versus the two disconnected "outside" pieces for $>$. State the rule: "$|expr|<k$ traps the expression between two bounds (AND); $|expr|>k$ pushes it beyond one bound or the other (OR) — the inequality direction determines which logical structure applies, memorize by picturing the number line, not by a fixed formula."

- **MC-2 hook**: this directly targets MC-2 (applying the wrong AND/OR structure to a given inequality direction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $|3x-1|=8$.
  2. Determine whether $|2x+5|=-3$ has a solution, and explain why or why not without attempting to split into cases.
  3. Solve $|x+4|<6$, expressing the solution as a single interval.
  4. Solve $|2x-1|>9$, expressing the solution as two separate pieces.
- **P76 (Transfer Probe, mode = independence)**: "A manufacturing tolerance specifies that a produced part's length $L$ must satisfy $|L-50|\le0.5$ (millimeters) to pass quality control, where 50mm is the target length. (a) Solve this inequality to find the acceptable range of $L$. (b) A quality inspector instead needs to flag parts that are OUT of tolerance, i.e. satisfying $|L-50|>0.5$ — solve this inequality and explain, using this lesson's AND-vs-OR distinction, why the 'in tolerance' and 'out of tolerance' solution sets have fundamentally different structures (one connected interval vs. two separate pieces)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ABSOLUTE-VALUE-EQUATION-SPLIT-WITHOUT-CHECKING-SIGN | Splitting an absolute value equation into two cases without first checking whether the right-hand side is negative (making the equation unsolvable) | Foundational |
| MC-2 | ABSOLUTE-VALUE-INEQUALITY-AND-OR-STRUCTURE-CONFUSED | Applying the wrong logical structure (AND/between vs. OR/outside) based on the inequality's direction ($<$ vs. $>$) | Foundational |
| MC-3 | ABSOLUTE-VALUE-SOLUTIONS-NOT-VERIFIED | Failing to check candidate solutions from a case-split against the ORIGINAL absolute value equation, missing that one case can sometimes fail to check out (e.g. when the equation is embedded in a larger, more complex expression) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Absolute Value Equation Split Without Checking Sign") → P41 (detect: present Example 2 and check whether the student attempts to split into cases before checking the sign) → P64 (conceptual shift: re-state the check-first rule explicitly, verifying $-4<0$ before any further work is attempted).
- **B02 (targets MC-2)**: P27 ("Absolute Value Inequality AND/OR Structure Confused") → P41 (detect: present Example 3's two inequality directions and check whether the same structure is applied to both) → P64 (conceptual shift: re-draw both on a number line, visually confirming the connected vs. disconnected regions).
- **B03 (targets MC-3)**: P27 ("Absolute Value Solutions Not Verified") → P41 (detect: review a submitted case-split solution for a missing verification step) → P64 (conceptual shift: re-substitute each candidate solution back into the ORIGINAL absolute value equation, confirming both sides match).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.absolute-value`, `math.alg.linear-equation-1var`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects that this concept bundles equations AND both inequality directions, each with genuinely distinct structural rules, into one substantial unit.
- MC-1 and MC-2 are both ranked foundational because each represents a structural setup error that corrupts the ENTIRE solution process from the start, regardless of how carefully the subsequent algebra is executed.
- The manufacturing-tolerance transfer probe was deliberately designed as a genuine paired scenario (in-tolerance vs. out-of-tolerance) using the SAME underlying expression with opposite inequality directions, directly testing whether MC-2's AND/OR distinction transfers to a practical quality-control context rather than remaining an abstract symbolic rule.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.absolute-value`, `math.alg.linear-equation-1var`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: number-line distance before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

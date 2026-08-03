# Teaching Blueprint: Solution Set (`math.alg.solution-set`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.solution-set` |
| name | Solution Set |
| domain | Algebra |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.alg.equation` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The set of all values of the variable(s) satisfying an equation or inequality; may be empty, finite, or infinite.

 |

## Component 1 — Learning Objectives

- LO1: State the solution set of a given simple equation or inequality using correct set notation.
- LO2: Recognize when a solution set is EMPTY ($\varnothing$, no values satisfy the equation), FINITE (a specific finite list of values), or INFINITE (e.g. all reals in an interval).
- LO3: Distinguish "solving an equation" (finding its solution set) from merely finding "a solution" (one member of that set) — recognizing an equation can have more than one solution, and a complete answer requires the FULL set.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.equation` (what an equation is) — the solution set is precisely the collection of values making a given equation (or inequality) true.

## Component 3 — Core Explanation

The **solution set** of an equation or inequality is the set of ALL values of the variable(s) that make it TRUE. Solution sets vary in size: **empty** ($\varnothing$) when NO value works (e.g. $x+1=x$ has no solution); **finite** when a specific, countable list of values works (e.g. $x^2=4$ has solution set $\{-2,2\}$); or **infinite** when a whole interval or unbounded range works (e.g. $x>3$ has solution set $\{x:x>3\}$, an infinite interval).

"Solving" an equation means finding its COMPLETE solution set — not just one value that happens to work, since many equations have multiple (or infinitely many) solutions, and stopping after finding just one gives an incomplete answer.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — finite solution set)**: The equation $x^2-5x+6=0$ factors as $(x-2)(x-3)=0$, giving solution set $\{2,3\}$ — a finite set with exactly two elements.

**Example 2 (LO2 — empty and infinite cases, breaking MC-1)**: The equation $x+3=x+5$ simplifies to $3=5$, a FALSE statement independent of $x$ — its solution set is $\varnothing$ (empty), since NO value of $x$ can make it true. Contrast with $x+3=x+3$, which simplifies to $3=3$, ALWAYS true — its solution set is ALL real numbers (infinite), since EVERY value of $x$ works. A common error conflates these two cases, assuming "no specific numeric answer found" always means "no solution," when it could instead mean "every value is a solution" — the ALGEBRAIC outcome (a false vs. a true numerical statement) must be checked to distinguish the two.

**Example 3 (LO3 — complete solution set vs. one solution, breaking MC-2)**: For $x^2=9$, a student who finds $x=3$ by taking the "positive square root" and stops has found only ONE member of the solution set — the COMPLETE solution set is $\{-3,3\}$, since $(-3)^2=9$ also holds. Reporting "$x=3$" as if it were THE full answer misses that solving means finding the ENTIRE set of values that work, not merely a single verified example.

## Component 5 — Teaching Actions

### Teaching Action A01 — Solution Sets Can Be Empty, Finite, or Infinite (Primitive P11: Representation Shift)

Present Example 1's finite set, Example 2's empty and infinite cases side by side, using set notation consistently for each, so the three size-categories are visually and notationally distinguished from the start.

- **MC-1 hook**: present $x+3=x+3$ and ask for the solution set, checking whether "no solution" (confusing it with the empty case) or the correct "all reals" is given.

### Teaching Action A02 — Empty vs. Infinite: Check the Resulting Statement's Truth (Primitive P06: Contrast Pair)

Work Example 2's two cases side by side, explicitly simplifying each equation down to a variable-free statement (a false one for the empty case, a true one for the infinite case) to show WHY they differ despite both initially looking like "the variable disappeared." State the rule: "when the variable cancels out entirely, check whether what remains is TRUE (solution set = everything) or FALSE (solution set = empty) — these are opposite outcomes."

### Teaching Action A03 — A Complete Solution Set, Not Just One Value (Primitive P64: Conceptual Shift)

Work Example 3, explicitly checking BOTH $x=3$ and $x=-3$ against the original equation, reinforcing that "solving" requires finding every value that works, not stopping at the first one found.

- **MC-2 hook**: this directly targets MC-2 (reporting a single found solution as if it were the complete answer).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State the solution set of $x^2-4=0$.
  2. Determine whether $2x+1=2x-3$ has an empty, finite, or infinite solution set, and state it.
  3. Determine whether $5(x+1)=5x+5$ has an empty, finite, or infinite solution set, and state it.
  4. Given that $x=4$ satisfies $x^2-16=0$, determine whether this is the complete solution set, and if not, find the rest.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs all values of $x$ (a design parameter) satisfying $x^2-7x+10=0$ for a structural constraint. (a) Find the complete solution set. (b) A colleague reports only 'x=5 works' as the final answer to the design team — explain, using this lesson's complete-solution-set idea, why this answer is incomplete and could lead to a missed valid design option."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ALL-REALS-SOLUTION-SET-CONFUSED-WITH-EMPTY-SET | Confusing an "always true" resulting statement (solution set = all reals) with a "no solution" outcome (solution set = empty) when the variable cancels out | Foundational |
| MC-2 | SINGLE-FOUND-SOLUTION-REPORTED-AS-COMPLETE-ANSWER | Stopping after finding one value that satisfies an equation, without checking for or reporting additional solutions | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("All-Reals Confused with Empty Set") → P41 (detect: present Example 2's two cases and check whether both are labeled the same) → P64 (conceptual shift: re-simplify each equation to its variable-free remainder, checking true vs. false explicitly).
- **B02 (targets MC-2)**: P27 ("Single Solution Reported as Complete Answer") → P41 (detect: present Example 3 and check whether only $x=3$ is reported) → P64 (conceptual shift: re-verify $x=-3$ against the original equation directly, showing it is an equally valid solution).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.equation`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 2 and bloom = understand reflect that this concept is primarily conceptual (classifying and correctly reporting solution sets) rather than introducing new solving techniques.
- MC-1 was ranked foundational severity because it produces a diametrically OPPOSITE wrong answer (empty vs. everything) rather than a merely imprecise one — a maximally consequential category error for what looks like a small notational slip.
- The engineering transfer probe was deliberately chosen to give MC-2's correction genuine practical stakes — an incomplete solution set in a real design context could mean a valid engineering option is silently discarded.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.equation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Boolean Circuits (`math.disc.boolean-circuits`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.boolean-circuits` |
| name | Boolean Circuits |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.disc.propositional-logic` |
| unlocks | (none in KG) |
| cross_links | `math.found.set-operations` (verified present — the union/intersection/complement parallel used in Teaching Action A02) |
| CPA_entry_stage | P (Pictorial) — gate-diagram circuits before symbolic Boolean expressions |
| description (KG) | Electronic implementation of Boolean functions using AND, OR, NOT, NAND, NOR, XOR gates. Any Boolean function has a circuit representation. Minimization via Karnaugh maps or Quine-McCluskey algorithm.

 |

## Component 1 — Learning Objectives

- LO1: Evaluate a Boolean circuit's output for given input values by tracing signals through AND, OR, NOT, NAND, NOR, and XOR gates.
- LO2: Construct a Boolean circuit (or its symbolic expression) implementing a given truth table or logical statement.
- LO3: Simplify a Boolean expression/circuit using a Karnaugh map, correctly grouping adjacent 1's in POWERS-OF-TWO-sized blocks to find a minimal equivalent expression.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.propositional-logic` (AND, OR, NOT and truth tables) — Boolean circuits are the electronic/gate-based physical implementation of exactly this logical structure.

## Component 3 — Core Explanation

A **Boolean circuit** implements a Boolean function using logic GATES: AND (output 1 only if both inputs are 1), OR (output 1 if at least one input is 1), NOT (inverts its single input), plus derived gates NAND (NOT-AND), NOR (NOT-OR), and XOR (exclusive or — output 1 if inputs DIFFER). Any Boolean function of $n$ inputs can be implemented by SOME circuit built from these gates (a completeness property).

**Karnaugh maps (K-maps)** provide a visual method for simplifying Boolean expressions: arrange a truth table's outputs in a grid where ADJACENT cells differ in exactly one input bit, then group adjacent 1's into rectangular blocks of size $1,2,4,8,\ldots$ (powers of 2) — each valid group corresponds to one simplified term in the minimized expression, eliminating variables that don't matter within that group.

## Component 4 — Worked Examples

**Example 1 (LO1 — tracing signals through gates, breaking MC-1)**: Evaluate the circuit $(A\text{ AND } B)\text{ XOR } (\text{NOT } C)$ for $A=1,B=0,C=1$. First, $A\text{ AND }B=1\text{ AND }0=0$. Then $\text{NOT }C=\text{NOT }1=0$. Finally, $0\text{ XOR }0=0$ (XOR outputs 0 when inputs MATCH). A common error evaluates XOR as if it were OR (outputting 1 whenever EITHER input is 1, rather than specifically when they DIFFER) — here, both intermediate values happen to be 0, so OR would ALSO give 0 by coincidence, but this is not generally true and must not be relied upon.

**Example 2 (LO2 — constructing a circuit from a truth table)**: Build a circuit for a function that outputs 1 exactly when inputs $A,B$ DIFFER (i.e. the XOR function itself, built from more primitive gates): $(A\text{ AND NOT }B)\text{ OR }(\text{NOT }A\text{ AND }B)$. Verify against the truth table: $A=0,B=0$: $(0\text{ AND }1)\text{ OR }(1\text{ AND }0)=0\text{ OR }0=0$ ✓ (matching, since equal inputs give XOR output 0); $A=1,B=0$: $(1\text{ AND }1)\text{ OR }(0\text{ AND }0)=1\text{ OR }0=1$ ✓ (differing inputs give 1).

**Example 3 (LO3 — Karnaugh map grouping, breaking MC-2)**: Simplify a 3-variable function whose truth table has 1's at rows $ABC=001,011,101,111$ (i.e., whenever $C=1$, regardless of $A,B$). In the K-map, these four 1's form a valid group of size 4 (a power of 2), all sharing $C=1$ — simplifying to just $C$ (the variables $A,B$ drop out entirely since they don't affect the output within this group). A common error groups these same four cells as TWO separate groups of size 2 instead of recognizing the single larger group of 4 — technically still a valid (if less minimal) simplification, but missing the fully-reduced form the K-map method is meant to find; K-map grouping should always use the LARGEST valid power-of-2 block available, not settle for smaller sub-groupings.

## Component 5 — Teaching Actions

### Teaching Action A01 — Evaluate Gate by Gate, XOR Means "Differ" Not "Either" (Primitive P64: Conceptual Shift)

Work Example 1 step by step, tracing each intermediate gate's output explicitly, and specifically drilling XOR's truth table (0,1→1; 1,0→1; 0,0→0; 1,1→0) against OR's (0,1→1; 1,0→1; 0,0→0; 1,1→1) side by side to isolate the ONE differing row.

- **MC-1 hook**: this directly targets MC-1 (confusing XOR with OR) by presenting inputs where the two gates genuinely disagree (both inputs = 1) and checking which output is produced.

### Teaching Action A02 — Building a Circuit from a Truth Table (Primitive P11: Representation Shift)

Work Example 2, explicitly reading each TRUE row of the truth table as one AND-term (a "minterm"), then OR-ing all such terms together — connecting this construction method to `math.found.set-operations`'s union-of-intersections structure (this concept's declared cross-link) as a parallel pattern from set theory.

### Teaching Action A03 — Karnaugh Map: Always Use the Largest Valid Group (Primitive P06: Contrast Pair)

Work Example 3's correct largest-group simplification against the flawed two-smaller-groups alternative, showing both are technically valid but only the larger group achieves the FULLY minimized expression. State the rule: "always look for the LARGEST power-of-2 block of 1's containing the region you're grouping — settling for a smaller group leaves the simplification incomplete."

- **MC-2 hook**: this contrast directly targets MC-2 (settling for smaller K-map groups instead of the largest available one).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Evaluate $(A\text{ OR }B)\text{ AND }(\text{NOT }C)$ for $A=0,B=1,C=0$.
  2. Evaluate $A\text{ XOR }B\text{ XOR }C$ for $A=1,B=1,C=0$.
  3. Construct a Boolean expression implementing a function that outputs 1 exactly when at least 2 of 3 inputs $A,B,C$ are 1 (a majority function).
  4. Given a K-map with a group of 8 adjacent 1's available (spanning all values of one variable and half the values of the others), state which variable(s) drop out of the simplified expression.
- **P76 (Transfer Probe, mode = independence)**: "A digital alarm system should trigger (output 1) if a door sensor ($D$) is open AND the system is armed ($S$), OR if a fire sensor ($F$) is triggered regardless of arming status. (a) Write the Boolean expression for this alarm logic using AND, OR, and any needed NOT gates. (b) Evaluate the circuit for the specific case $D=1, S=0, F=0$ (door open, but system NOT armed, no fire), and explain in plain language why the alarm does or does not trigger in this scenario, connecting your answer back to the circuit's logical structure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | XOR-CONFUSED-WITH-OR | Evaluating XOR as if it were OR (outputting 1 whenever at least one input is 1), rather than specifically when the inputs differ | Foundational |
| MC-2 | KARNAUGH-MAP-GROUP-NOT-MAXIMIZED | Grouping K-map 1's into smaller valid blocks instead of finding the largest available power-of-2 group, leaving the simplification incomplete | Moderate |
| MC-3 | GATE-EVALUATION-ORDER-IGNORES-PARENTHESES | Evaluating a multi-gate expression in the wrong order, ignoring the grouping structure (parentheses) that determines which sub-expressions combine first | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("XOR Confused with OR") → P41 (detect: present Example 1's evaluation or a case with both intermediate values equal to 1, checking whether XOR outputs 0 (correct) or 1 (OR's behavior)) → P64 (conceptual shift: re-drill the XOR truth table explicitly against OR's, side by side, isolating the single differing row where both inputs are 1).
- **B02 (targets MC-2)**: P27 ("Karnaugh Map Group Not Maximized") → P41 (detect: present Example 3 and check whether the largest group of 4 or two smaller groups of 2 are used) → P64 (conceptual shift: re-scan the K-map systematically for the largest valid power-of-2 grouping before finalizing any simplification).
- **B03 (targets MC-3)**: P27 ("Gate Evaluation Order Ignores Parentheses") → P41 (detect: review a submitted multi-gate evaluation for the wrong sub-expression evaluated first) → P64 (conceptual shift: re-walk the expression's parenthesization explicitly, evaluating innermost groups first per standard order-of-operations discipline).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.propositional-logic`.
- **Unlocks**: none recorded in the KG.
- **Cross-link**: `math.found.set-operations` — verified present via directory listing; Teaching Action A02 draws the parallel between Boolean circuit construction (OR of AND-terms) and set theory's union-of-intersections structure, closing the P76_mode=cross-link probe opportunity this blueprint's own set-operations counterpart (`math.found.set-operations`'s Component 7) had left as independence-mode pending this concept's authoring.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept combines gate-evaluation fluency, circuit-construction skill, and the genuinely separate K-map simplification technique, three distinct sub-skills.
- MC-1 was ranked most severe because XOR is the gate most frequently confused with a more familiar one (OR), and this confusion silently produces wrong outputs specifically in the one input combination (both 1) where the two gates diverge — an error that can pass unnoticed through testing that happens not to probe that specific case.
- The alarm-system transfer probe was deliberately designed as a two-part conditional structure (a conjunction ORed with an independent condition) to test genuine circuit-construction and evaluation together in a realistic, safety-relevant scenario, rather than testing gate evaluation and construction as separate, disconnected skills.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.propositional-logic`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.found.set-operations` confirmed present) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (embedded via cross-link Teaching Action, not a separate P76 tag — real-world alarm scenario in gate) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: gate diagrams before symbolic expressions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

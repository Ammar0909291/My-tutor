# Teaching Blueprint: Inequality (`math.alg.inequality`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.inequality` |
| name | Inequality |
| domain | Algebra |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.alg.equation` |
| unlocks | `math.alg.inequality-1var` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a direct numeric check before the general sign-flip rule |
| description (KG) | A mathematical statement asserting that one expression is greater than or less than another; solutions form intervals or regions rather than isolated points. |

## Component 1 — Learning Objectives

- LO1: Define an inequality (using $<,\le,>,\ge$) and distinguish its solution set from an equation's — an equation typically has ISOLATED point solutions, while an inequality's solutions form an ENTIRE interval or region.
- LO2: Solve a linear inequality using the same algebraic operations as for equations (add/subtract/multiply/divide both sides), correctly applying the critical exception: multiplying or dividing both sides by a **negative** number **reverses** the inequality's direction.
- LO3: Represent and interpret an inequality's solution set correctly, distinguishing **strict** ($<,>$) from **non-strict** ($\le,\ge$) boundaries — a strict inequality EXCLUDES its boundary point, while a non-strict one INCLUDES it.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.equation` (solving linear equations via isolating the variable through inverse operations).

## Component 3 — Core Explanation

**Inequalities describe a RANGE of values, not a single point**: an equation like $2x+3=7$ asserts EQUALITY, pinning down exactly one value of $x$. An inequality like $2x+3<7$ asserts an ORDER relationship, and is satisfied by an entire interval of values — every $x$ making the left side strictly less than the right side, which is typically infinitely many numbers, not one.

**Solving an inequality mirrors solving an equation, with one critical exception**: the same operations used to isolate a variable in an equation (adding/subtracting the same quantity, multiplying/dividing by the same nonzero quantity) apply to inequalities too — EXCEPT that multiplying or dividing both sides by a NEGATIVE number reverses the direction of the inequality (what was $<$ becomes $>$, and vice versa). This is necessary because multiplying by a negative number reverses the relative order of any two numbers on the number line.

**Strict vs. non-strict inequalities differ by exactly the boundary point**: $x<5$ and $x\le5$ describe almost the same set of numbers, differing ONLY at $x=5$ itself: $x<5$ excludes it (open interval), while $x\le5$ includes it (closed-at-5 interval). This single-point difference is a genuine, meaningful distinction — not an interchangeable notational variant.

## Component 4 — Worked Examples

**Example 1 (LO1 — a point vs. an interval, breaking MC-1)**: The equation $2x+3=7$ has exactly ONE solution: $x=2$ (an isolated point). The inequality $2x+3<7$ has infinitely many solutions: subtracting 3 gives $2x<4$, dividing by 2 gives $x<2$ — an entire RAY of solutions, every real number less than $2$, not a single value. The same surface numbers ($2$, $3$, $7$) produce fundamentally different solution SHAPES depending on whether the relation is equality or inequality.

**Example 2 (LO2 — dividing by a negative reverses the direction, breaking MC-2)**: Solve $-3x+6>0$. Isolate: $-3x>-6$. Now divide both sides by $-3$ (negative) — the inequality direction MUST reverse: $x<2$ (NOT $x>2$). Verify: $x=0$ satisfies the original ($-3(0)+6=6>0$ ✓) and satisfies $x<2$ ($0<2$ ✓) — consistent. Check $x=3$ (violates the correct answer $x<2$): $-3(3)+6=-9+6=-3$, which is NOT $>0$ — correctly excluded. Had the direction been wrongly kept as $x>2$, $x=3$ would have been wrongly included as a solution, despite failing the original inequality — confirming the sign-flip rule is necessary, not optional.

**Example 3 (LO3 — strict vs. non-strict differ at exactly the boundary, breaking MC-3)**: Compare $x<5$ and $x\le5$ at the boundary $x=5$. For $x<5$: is $5$ included? Check $5<5$ — FALSE, so $5$ is EXCLUDED; the solution set is the open interval $(-\infty,5)$. For $x\le5$: is $5$ included? Check $5\le5$ — TRUE, so $5$ IS included; the solution set is $(-\infty,5]$. The two solution sets differ by exactly the single point $x=5$ — a genuine, meaningful difference, not an interchangeable choice of notation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Equations Give Points; Inequalities Give Intervals (Primitive P06: Contrast Pair)

Contrast Example 1's two results directly: $2x+3=7$ giving the single point $x=2$, against $2x+3<7$ giving the entire ray $x<2$. State: "an equation pins down one value; an inequality describes an entire range — the solution 'shape' itself is fundamentally different, not just the specific numbers."

- **MC-1 hook**: ask "does an inequality, like $2x+3<7$, have a single specific numeric solution, the same way an equation does?" — a "yes" answer reveals MC-1 (believing an inequality has an isolated point solution rather than an interval).

### Teaching Action A02 — Dividing by a Negative Reverses the Inequality (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: checking $x=3$ against the original inequality shows it fails, even though it would satisfy the WRONGLY-unreversed $x>2$. State: "multiplying or dividing both sides by a negative number flips which side is 'bigger' — the inequality direction must flip to match, every time."

- **MC-2 hook**: ask "can every algebraic operation used to solve equations (including dividing by any number) be applied to inequalities without any special care?" — a "yes" answer reveals MC-2 (missing the sign-flip rule for multiplying/dividing by a negative).

### Teaching Action A03 — Strict and Non-Strict Inequalities Differ at the Boundary (Primitive P11: Representation Shift)

State: "the ONLY difference between $x<5$ and $x\le5$ is whether $x=5$ itself counts as a solution — and that single point genuinely matters." Work Example 3's direct boundary check for both cases.

- **MC-3 hook**: ask "do $x<5$ and $x\le5$ describe exactly the same solution set?" — a "yes" answer reveals MC-3 (treating strict and non-strict inequalities as interchangeable).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve $3x-4=11$ and $3x-4<11$, describing how the two solution sets differ in shape.
  2. Solve $-2x+5\le9$, showing the direction-reversal step explicitly.
  3. State the solution sets for $x>-2$ and $x\ge-2$, and identify the exact point where they differ.
  4. Verify, using a specific counterexample number, why $-4x>8$ solved as $x>-2$ (without reversing) would be incorrect.
- **P76 (Transfer Probe, mode = independence)**: "A shipping company requires a package's weight $w$ (in kg) to satisfy $-2w+10<0$ to qualify for standard shipping. (a) Solve this inequality for $w$, showing the direction-reversal step explicitly. (b) A clerk claims the solution should be described as 'the single weight value where the package just barely qualifies,' rather than a range of weights. Using this lesson's point-vs-interval distinction, explain what is wrong with the clerk's description. (c) The clerk also wonders whether the qualifying condition should be written as $w>5$ or $w\ge5$, arguing 'it probably doesn't matter since they're basically the same.' Using this lesson's strict-vs-non-strict distinction, explain why the choice between $>$ and $\ge$ is a genuine, meaningful decision here, not an arbitrary one."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INEQUALITY-SOLUTION-AS-SINGLE-POINT | Believing an inequality has one isolated numeric solution like an equation, missing that its solution set is an interval or region | Foundational |
| MC-2 | SIGN-FLIP-RULE-OMITTED | Believing all algebraic operations valid for equations (including dividing by any number) apply unchanged to inequalities, missing that multiplying/dividing by a negative reverses the direction | Foundational |
| MC-3 | STRICT-NON-STRICT-CONFLATED | Believing strict (<,>) and non-strict (≤,≥) inequalities describe identical solution sets, missing that they differ by inclusion/exclusion of the boundary point | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Inequality Solution as Single Point") → P41 (detect: ask a student to state "the solution" to $2x+3<7$ as a single number, checking whether they name one value) → P64 (conceptual shift: re-walk Example 1's equation-vs-inequality contrast, re-anchoring on "an inequality's solution is an entire range, not one point").
- **B02 (targets MC-2)**: P27 (name it: "Sign-Flip Rule Omitted") → P41 (detect: ask a student to solve $-3x+6>0$ and check whether they keep the direction unreversed after dividing by $-3$) → P64 (conceptual shift: re-walk Example 2's counterexample check at $x=3$, re-anchoring on "dividing by a negative always reverses the inequality direction").
- **B03 (targets MC-3)**: P27 (name it: "Strict/Non-Strict Conflated") → P41 (detect: ask a student whether $x<5$ and $x\le5$ have the same solution set, checking for "yes") → P64 (conceptual shift: re-walk Example 3's boundary check at $x=5$, re-anchoring on "the boundary point's inclusion or exclusion is a genuine, meaningful difference").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.equation` (the isolate-the-variable algebraic operations this concept applies, with one added exception, to inequalities).
- **Unlocks**: `math.alg.inequality-1var` (deepens single-variable inequality solving, including compound and absolute-value inequalities, building directly on this concept's sign-flip rule and interval representation).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly reuses `math.alg.equation`'s own algebraic operations, adding only the sign-flip exception and the interval-vs-point distinction as genuinely new content.
- **Division of labor**: `math.alg.equation` owns the isolate-the-variable operations in general. This concept, `math.alg.inequality`, deliberately does not re-teach those operations from scratch; it owns the TWO genuinely new ideas an inequality requires beyond equation-solving: the sign-flip exception, and the interval/boundary representation of the resulting solution set.
- Example 2's verification step (checking $x=3$ against both the original inequality and the wrongly-unreversed answer) was deliberately included so the sign-flip rule's necessity is demonstrated concretely, via a specific number that would be wrongly included without it, rather than asserted as an arbitrary rule to memorize.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct numeric check before the general sign-flip rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

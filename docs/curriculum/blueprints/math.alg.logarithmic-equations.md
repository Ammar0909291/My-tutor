# Teaching Blueprint: Logarithmic Equations (`math.alg.logarithmic-equations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.logarithmic-equations` |
| name | Logarithmic Equations |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.logarithm-properties`, `math.alg.exponential-equations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Equations in which the unknown appears as an argument of a logarithm; solved by using logarithm properties to condense and then exponentiate.

 |

## Component 1 — Learning Objectives

- LO1: Solve a logarithmic equation by CONDENSING multiple logarithm terms into a single logarithm (using log properties), then EXPONENTIATING both sides to eliminate the logarithm.
- LO2: Solve the resulting algebraic equation using appropriate prior techniques.
- LO3: Check every candidate solution against the DOMAIN of the original logarithms (arguments must be POSITIVE), correctly identifying and discarding EXTRANEOUS solutions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.logarithm-properties` (condensing logarithms via product/quotient/power rules) and `math.alg.exponential-equations` (the exponentiation step this concept's solving process mirrors in reverse).

## Component 3 — Core Explanation

A **logarithmic equation** has the unknown appearing as the ARGUMENT of a logarithm. Solved by: (1) CONDENSE any multiple log terms into a SINGLE logarithm using the product/quotient/power rules; (2) EXPONENTIATE both sides (raise the log's base to both sides' power) to eliminate the logarithm entirely; (3) solve the resulting algebraic equation; (4) CHECK every candidate against the DOMAIN requirement that every original logarithm's ARGUMENT must be POSITIVE (logarithms of zero or negative numbers are undefined).

This domain check is essential because the exponentiation step, like squaring in radical equations, can introduce EXTRANEOUS solutions — algebraic candidates that don't actually satisfy the domain restrictions of the original logarithmic expressions.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard case)**: Solve $\log_2(x)+\log_2(x-2)=3$. Condense: $\log_2(x(x-2))=3$. Exponentiate (base 2): $x(x-2)=2^3=8\Rightarrow x^2-2x-8=0\Rightarrow(x-4)(x+2)=0\Rightarrow x=4$ or $x=-2$.

**Example 2 (LO3 — domain check eliminates an extraneous candidate, breaking MC-1)**: Continuing Example 1: check $x=4$ against the ORIGINAL equation's domain requirements ($x>0$ AND $x-2>0$, i.e. $x>2$): $x=4$ satisfies BOTH — valid. Check $x=-2$: this makes $\log_2(-2)$ UNDEFINED (negative argument) — EXTRANEOUS, must be discarded. Final solution: $x=4$ only. A common error accepts BOTH algebraic candidates from the exponentiated equation without checking each against the ORIGINAL logarithm's domain, missing that $x=-2$ produces an undefined expression in the starting equation.

**Example 3 (LO1 — condensing before exponentiating, breaking MC-2)**: Solve $\log(x+1)-\log(x-1)=\log(3)$. Condense using the quotient rule: $\log\left(\frac{x+1}{x-1}\right)=\log(3)$. Since both sides are now logarithms of the SAME base, equate the arguments directly: $\frac{x+1}{x-1}=3\Rightarrow x+1=3(x-1)\Rightarrow x+1=3x-3\Rightarrow4=2x\Rightarrow x=2$. Check domain: $x+1=3>0$ ✓, $x-1=1>0$ ✓ — valid. A common error attempts to solve BEFORE condensing (e.g. trying to isolate $x$ term by term across the separate log expressions), rather than first combining everything into a single logarithm equation, making the algebra needlessly complicated or error-prone.

## Component 5 — Teaching Actions

### Teaching Action A01 — Condense, Then Exponentiate (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly applying the log-condensing rule BEFORE exponentiating, connecting each step to the already-mastered log properties.

### Teaching Action A02 — Domain Check Catches Extraneous Solutions (Primitive P06: Contrast Pair)

Work Example 2's domain-checking process explicitly, checking each candidate independently against the original equation's positivity requirements. State the rule: "exponentiating (like squaring for radicals) can introduce solutions that don't actually satisfy the original logarithm's domain — always check every candidate's arguments are POSITIVE in the original equation."

- **MC-1 hook**: this directly targets MC-1 (accepting an extraneous candidate without a domain check).

### Teaching Action A03 — Condense First, Even When Comparing Two Logs Directly (Primitive P06: Contrast Pair, second pairing)

Work Example 3, showing the condense-first approach leads directly and cleanly to equating arguments, contrasting against the flawed attempt to manipulate the separate log terms individually before combining them.

- **MC-2 hook**: this directly targets MC-2 (attempting to solve before condensing into a single logarithm).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $\log_3(x)+\log_3(x+6)=3$, checking for extraneous solutions.
  2. Solve $\log(2x+1)-\log(x-1)=\log(4)$, condensing before solving.
  3. Solve $\log_5(x-1)=2$, checking the domain of the result.
  4. Explain, in one sentence, why exponentiating both sides of a logarithmic equation can introduce extraneous solutions.
- **P76 (Transfer Probe, mode = independence)**: "A seismologist uses the Richter scale formula involving $\log_{10}(x)-\log_{10}(y)=M$ (relating two earthquake amplitudes $x,y$ to a magnitude difference $M$). Given a specific equation $\log_{10}(x+5)+\log_{10}(x-5)=2$ arising from a related calculation, (a) condense and solve for $x$, finding all algebraic candidates. (b) Check each candidate against the domain requirements of the ORIGINAL logarithms (both $x+5>0$ and $x-5>0$), explaining what it would mean physically/practically if one candidate turns out to be extraneous in this seismological context."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LOGARITHMIC-EQUATION-CANDIDATES-NOT-DOMAIN-CHECKED | Accepting a candidate solution without checking that every original logarithm's argument is positive, missing an extraneous solution | Foundational |
| MC-2 | LOGARITHMIC-EQUATION-SOLVED-BEFORE-CONDENSING | Attempting to manipulate separate logarithm terms individually before first condensing them into a single logarithm, complicating the solution process | Foundational |
| MC-3 | LOGARITHM-CONDENSING-RULE-MISAPPLIED | Using the wrong log property (e.g. adding instead of multiplying arguments, or vice versa) when condensing multiple log terms | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Logarithmic Equation Candidates Not Domain Checked") → P41 (detect: present Example 2 and check whether $x=-2$ is (incorrectly) accepted) → P64 (conceptual shift: re-substitute $x=-2$ into the original $\log_2(x)$ term, showing it is undefined for a negative argument).
- **B02 (targets MC-2)**: P27 ("Logarithmic Equation Solved Before Condensing") → P41 (detect: review a submitted attempt for term-by-term manipulation of separate logs before condensing) → P64 (conceptual shift: re-derive by first applying the appropriate log property to combine ALL log terms into one, then proceeding).
- **B03 (targets MC-3)**: P27 ("Logarithm Condensing Rule Misapplied") → P41 (detect: review a submitted condensing step for the wrong property applied — e.g. product rule used where quotient rule was needed) → P64 (conceptual shift: re-derive using the correct rule matching the original operation — addition of logs condenses via multiplication of arguments; subtraction via division).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.logarithm-properties`, `math.alg.exponential-equations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.radical-equations` (the structurally parallel extraneous-solution-checking discipline for a different equation type).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept combines log-condensing, exponentiation, algebraic solving, and the genuinely distinct domain-checking step into one multi-stage procedure.
- MC-1 was ranked most severe because it mirrors exactly the same critical failure pattern already established in `math.alg.radical-equations`'s extraneous-solution checking — this concept reinforces that general verification discipline in a genuinely different (domain-restriction rather than sign-loss) context.
- The seismology transfer probe was deliberately chosen to give the domain-check requirement authentic scientific stakes, since Richter-scale-style logarithmic relationships are a genuine real-world application where an extraneous, physically-impossible solution would be immediately recognizable as nonsensical.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.logarithm-properties`, `math.alg.exponential-equations`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

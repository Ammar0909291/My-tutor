# Teaching Blueprint: Exponential Equations (`math.alg.exponential-equations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.exponential-equations` |
| name | Exponential Equations |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.exponential-function` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Equations in which the unknown appears in an exponent; solved using logarithms or by expressing both sides as powers of the same base.

 |

## Component 1 — Learning Objectives

- LO1: Solve an exponential equation by expressing BOTH SIDES as powers of the SAME base, then equating the exponents directly.
- LO2: Solve an exponential equation that does NOT have a convenient common base by taking the LOGARITHM of both sides.
- LO3: Recognize when the same-base method is applicable (both sides can be rewritten as powers of one common base) versus when logarithms are genuinely necessary.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponential-function` (the general form $a^x$ and its behavior) — this concept solves equations where the variable sits in the exponent.

## Component 3 — Core Explanation

An **exponential equation** has the unknown variable appearing in an EXPONENT. Two solution strategies:

**Same-base method**: if both sides can be rewritten as powers of the SAME base, e.g. $a^{f(x)}=a^{g(x)}$, then (since $a^x$ is one-to-one for $a>0,a\ne1$) the EXPONENTS must be equal: $f(x)=g(x)$ — reducing to a simpler equation solvable by prior techniques.

**Logarithm method**: when no convenient common base exists, take the LOGARITHM of both sides (any consistent base works, commonly base 10 or $e$), using the power rule $\log(a^x)=x\log a$ to bring the exponent DOWN as a multiplicative factor, then solve algebraically for $x$.

## Component 4 — Worked Examples

**Example 1 (LO1 — same-base method)**: Solve $2^{x+1}=8$. Rewrite $8=2^3$: $2^{x+1}=2^3$. Since the bases match, equate exponents: $x+1=3\Rightarrow x=2$.

**Example 2 (LO3 — recognizing when same-base doesn't apply, breaking MC-1)**: Solve $3^x=20$. Since $20$ is NOT a clean power of $3$ (there's no integer or simple fraction $k$ with $3^k=20$), the same-base method doesn't directly apply — LOGARITHMS are needed here instead. A common error attempts to force a same-base rewrite even when no clean common base exists, either giving up prematurely or making an invalid approximate substitution, rather than recognizing this is exactly the scenario logarithms are FOR.

**Example 3 (LO2 — logarithm method, breaking MC-2)**: Solve $3^x=20$ using logarithms. Take $\log$ of both sides: $\log(3^x)=\log(20)$. Apply the power rule: $x\log3=\log20$. Solve: $x=\frac{\log20}{\log3}\approx\frac{1.301}{0.477}\approx2.727$. A common error, after taking the log of both sides, mishandles the power rule — e.g. writing $x\log3=x\log20$ (incorrectly distributing the exponent to BOTH sides' bases rather than just the side it actually belongs to) or computing $\log(3^x)$ as $3\log x$ (swapping which quantity the exponent multiplies) instead of the correct $x\log3$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Same Base, Then Equate Exponents (Primitive P64: Conceptual Shift)

Work Example 1, explicitly rewriting $8$ as $2^3$ before equating exponents, reinforcing that this step requires BOTH sides to share the identical base first.

### Teaching Action A02 — Recognizing When Same-Base Doesn't Apply (Primitive P06: Contrast Pair)

Work Example 2, explicitly checking whether $20$ can be written as a clean power of $3$ (it cannot) before concluding the same-base method is unavailable here. State the rule: "only reach for the same-base method when BOTH sides genuinely share a common base after rewriting — if no clean common base exists, that's your signal to switch to logarithms."

- **MC-1 hook**: this directly targets MC-1 (forcing an invalid same-base approach when no clean common base actually exists).

### Teaching Action A03 — The Power Rule Brings the Exponent Down Correctly (Primitive P06: Contrast Pair, second pairing)

Work Example 3's correct application ($x\log3=\log20$) against flawed alternatives (distributing the exponent to both sides, or swapping which quantity it multiplies). State the rule: "the power rule $\log(a^x)=x\log a$ only pulls the exponent down as a multiplier on the SIDE where that exponent actually appears — check carefully which base the variable exponent belongs to."

- **MC-2 hook**: this directly targets MC-2 (misapplying the logarithm power rule).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $5^{2x-1}=125$ using the same-base method.
  2. Solve $4^x=50$ using logarithms.
  3. Determine whether $9^x=27$ can be solved using the same-base method, and solve it if so.
  4. Explain, in one sentence, when the same-base method is applicable versus when logarithms are needed.
- **P76 (Transfer Probe, mode = independence)**: "A bacteria population doubles every 3 hours, modeled by $P(t)=P_0\times2^{t/3}$. A scientist wants to know when the population will reach 10 times its initial size, i.e. solve $10=2^{t/3}$ for $t$. (a) Determine whether the same-base method applies here (can 10 be written as a clean power of 2?), and if not, solve using logarithms instead. (b) Explain, using this lesson's power rule discussion, exactly how the exponent $t/3$ gets brought down during the logarithm step, showing each piece of the resulting equation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SAME-BASE-METHOD-FORCED-WITHOUT-A-GENUINE-COMMON-BASE | Attempting to apply the same-base method when no clean common base actually exists between the two sides, rather than switching to logarithms | Foundational |
| MC-2 | LOGARITHM-POWER-RULE-MISAPPLIED | Incorrectly applying $\log(a^x)=x\log a$, e.g. distributing the exponent to the wrong side or swapping which quantity it multiplies | Foundational |
| MC-3 | EXPONENTIAL-EQUATION-SOLUTION-LEFT-UNCHECKED | Not verifying a found solution by substituting back into the original exponential equation, missing a possible arithmetic error along the way | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Same-Base Method Forced Without Genuine Common Base") → P41 (detect: present Example 2 and check whether a forced/invalid same-base attempt is made) → P64 (conceptual shift: explicitly test whether the target number is a clean power of the given base BEFORE attempting the same-base method, switching to logarithms when it isn't).
- **B02 (targets MC-2)**: P27 ("Logarithm Power Rule Misapplied") → P41 (detect: present Example 3 and check whether $x\log3=\log20$ or a flawed variant is produced) → P64 (conceptual shift: re-derive the power rule application step by step, explicitly identifying which side's exponent is being brought down).
- **B03 (targets MC-3)**: P27 ("Exponential Equation Solution Left Unchecked") → P41 (detect: review a submitted solution for a missing verification step) → P64 (re-substitute the found value back into the original equation, confirming both sides approximately match).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponential-function`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.logarithmic-equations` (the companion equation type, and `math.alg.change-of-base` (needed for logarithm computations in bases not directly available)).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept requires genuine METHOD-SELECTION judgment (LO3) in addition to executing either solution technique correctly.
- MC-2 was ranked most severe because it represents a genuine misunderstanding of how logarithms interact with exponents — the power rule is the single mechanism making the logarithm method work at all, and misapplying it undermines the entire technique regardless of how well the rest of the algebra is executed.
- The bacteria-growth transfer probe was deliberately chosen as a realistic scientific modeling scenario where exponential equations arise naturally, and where the same-base-vs-logarithm decision (MC-1) has genuine practical stakes rather than being an artificial classroom distinction.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.exponential-function`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

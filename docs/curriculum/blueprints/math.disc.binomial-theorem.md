# Teaching Blueprint: Binomial Theorem (`math.disc.binomial-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.binomial-theorem` |
| name | Binomial Theorem |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.combinations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | (x+y)ⁿ = ∑_{k=0}^n C(n,k) xᵏ y^{n-k}. Coefficients are binomial coefficients. Multinomial theorem generalizes to (x₁+⋯+xₘ)ⁿ. Applications: probability, approximation.

 |

## Component 1 — Learning Objectives

- LO1: Expand $(x+y)^n$ for a given small $n$ using the binomial theorem $(x+y)^n=\sum_{k=0}^n\binom{n}{k}x^ky^{n-k}$.
- LO2: Find a SPECIFIC term (e.g. the term containing $x^3y^5$) of a binomial expansion without expanding the entire expression, using the general term formula $\binom{n}{k}x^ky^{n-k}$.
- LO3: Correctly handle a NEGATIVE or non-unit coefficient inside one of the binomial's terms (e.g. $(x-2y)^n$), tracking sign and coefficient powers through every term of the expansion.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinations` (the binomial coefficients $\binom{n}{k}$ this theorem uses directly as the expansion's coefficients).

## Component 3 — Core Explanation

The **binomial theorem** states $(x+y)^n=\sum_{k=0}^n\binom{n}{k}x^ky^{n-k}$ — expanding $(x+y)^n$ produces $n+1$ terms, the $k$-th term being $\binom{n}{k}x^ky^{n-k}$, where the binomial coefficient $\binom{n}{k}$ counts the number of ways to choose which $k$ of the $n$ factors contribute an $x$ (the rest contributing $y$). The exponents of $x$ and $y$ in each term always sum to $n$.

The **multinomial theorem** generalizes this to $(x_1+\cdots+x_m)^n$, with coefficients $\binom{n}{k_1,k_2,\ldots,k_m}=\frac{n!}{k_1!k_2!\cdots k_m!}$ for each way of distributing the $n$ factors among the $m$ terms.

## Component 4 — Worked Examples

**Example 1 (LO1 — full expansion)**: Expand $(x+y)^4$: $\binom{4}{0}x^0y^4+\binom{4}{1}x^1y^3+\binom{4}{2}x^2y^2+\binom{4}{3}x^3y^1+\binom{4}{4}x^4y^0 = y^4+4xy^3+6x^2y^2+4x^3y+x^4$.

**Example 2 (LO2 — extracting a specific term without full expansion)**: Find the term containing $x^3$ in the expansion of $(x+2)^7$. The general term is $\binom{7}{k}x^k2^{7-k}$; setting $k=3$: $\binom{7}{3}x^3\cdot2^4=35\cdot16\cdot x^3=560x^3$. No need to expand all 8 terms — the general-term formula directly targets the one of interest.

**Example 3 (LO3 — negative/non-unit coefficients, breaking MC-1)**: Expand $(x-2y)^3$. Treating this as $(x+(-2y))^3$: $\binom{3}{0}x^3(-2y)^0+\binom{3}{1}x^2(-2y)^1+\binom{3}{2}x^1(-2y)^2+\binom{3}{3}x^0(-2y)^3$ $=x^3+3x^2(-2y)+3x(4y^2)+(-8y^3)=x^3-6x^2y+12xy^2-8y^3$. A common error drops the sign or coefficient on the SECOND term entirely, treating $(-2y)^k$ as if it were simply $(2y)^k$ or $2y^k$ — every power of the substituted term $(-2y)$, including its sign and its coefficient $2$, must be raised to the power $k$ at each step, not just the variable $y$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Expand Term by Term Using Binomial Coefficients (Primitive P64: Conceptual Shift)

Work Example 1 in full, computing each $\binom{4}{k}$ explicitly via `math.disc.combinations`'s formula and connecting each coefficient directly to "the number of ways to choose which factors give an $x$."

### Teaching Action A02 — The General Term Extracts a Specific Coefficient Directly (Primitive P06: Contrast Pair)

Work Example 2, contrasting the FULL expansion approach (computing all 8 terms of $(x+2)^7$, wasteful when only one term is needed) against the general-term shortcut (computing just $\binom{7}{3}x^32^4$ directly). State the rule: "the general term formula $\binom{n}{k}x^ky^{n-k}$ lets you jump straight to any single term — full expansion is only needed when every term is actually wanted."

### Teaching Action A03 — Every Part of a Substituted Term Gets Raised to the Power (Primitive P06: Contrast Pair, second pairing)

Work Example 3's correct expansion against a flawed version that drops the sign or coefficient on $(-2y)^k$ terms, showing the discrepancy in the final signs and coefficients. State the rule: "when a term like $(-2y)$ replaces $y$, treat the ENTIRE substituted expression — sign, coefficient, and variable together — as the thing being raised to each power $k$."

- **MC-1 hook**: this contrast directly targets MC-1 (mishandling substituted coefficients/signs) by checking Example 3's second and fourth terms specifically.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Expand $(x+y)^5$ fully using the binomial theorem.
  2. Find the term containing $x^4$ in the expansion of $(x+3)^6$ without expanding fully.
  3. Expand $(2x-y)^3$, tracking coefficients and signs correctly.
  4. State the sum of the exponents of $x$ and $y$ in ANY single term of the expansion of $(x+y)^n$, and explain why this must always hold.
- **P76 (Transfer Probe, mode = independence)**: "A probability problem models the number of heads in 6 coin flips using the expansion of $(p+q)^6$, where $p$ is the probability of heads and $q$ of tails. (a) Write out the general term of this expansion for exactly $k$ heads, and explain what $\binom{6}{k}$ represents in this context (connecting back to combinations). (b) Find the specific term corresponding to exactly 4 heads, being careful to substitute $p$ and $q$'s roles correctly (not accidentally swapping which variable's exponent is $k$)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUBSTITUTED-TERM-SIGN-OR-COEFFICIENT-DROPPED | When a term like $(-2y)$ or $(3x)$ replaces a simple variable in the binomial, failing to raise its full sign/coefficient to the required power at each step | Foundational |
| MC-2 | GENERAL-TERM-EXPONENTS-MISASSIGNED | Assigning the exponent $k$ to the wrong one of the two binomial terms (swapping which term gets $k$ and which gets $n-k$) | Foundational |
| MC-3 | BINOMIAL-COEFFICIENT-MISCOMPUTED | Computing $\binom{n}{k}$ incorrectly, independent of the rest of the expansion (an error in the underlying combinations formula, not the theorem's own structure) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Substituted Term Sign/Coefficient Dropped") → P41 (detect: present Example 3 and check whether $(-2y)^2=4y^2$ is correctly computed, sign and coefficient together) → P64 (conceptual shift: re-derive each term explicitly, substituting the FULL expression $(-2y)$ in place of $y$ before applying any exponent).
- **B02 (targets MC-2)**: P27 ("General Term Exponents Misassigned") → P41 (detect: present Example 2 and check whether $x$ or the constant term receives the exponent $k=3$) → P64 (conceptual shift: re-derive from the general formula $\binom{n}{k}x^ky^{n-k}$, explicitly confirming which variable's exponent was specified as the target).
- **B03 (targets MC-3)**: P27 ("Binomial Coefficient Miscomputed") → P41 (detect: review a submitted $\binom{n}{k}$ computation for an arithmetic error) → P64 (conceptual shift: re-derive $\binom{n}{k}=\frac{n!}{k!(n-k)!}$ from `math.disc.combinations`'s formula directly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinations`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; the multinomial theorem is mentioned as a generalization within the KG description but not authored as a separate entry in this batch.

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.90 reflect that this concept is a direct, high-precision APPLICATION of the already-mastered combinations formula, with the genuine new content being the term-structure pattern and careful handling of substituted expressions.
- MC-1 was ranked most severe because it is the single most common real error in binomial expansions involving anything beyond the simplest $(x+y)^n$ case, and it silently corrupts every affected term's sign and magnitude simultaneously.
- The coin-flip transfer probe was deliberately chosen to connect this concept forward to its most common real application (binomial probability), reinforcing that $\binom{n}{k}$'s combinatorial meaning ("ways to choose which flips are heads") is not merely notation but the actual reason the formula works.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.combinations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

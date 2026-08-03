# Teaching Blueprint: Irrational Roots (`math.arith.irrational-roots`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.irrational-roots` |
| name | Irrational Roots |
| domain | Arithmetic |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.arith.square-roots`, `math.found.irrational-numbers` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Square roots of non-perfect-square integers (e.g., √2, √3) that are irrational; their proofs use the uniqueness of prime factorization.

 |

## Component 1 — Learning Objectives

- LO1: Determine whether the square root of a given positive integer is rational (a perfect square) or irrational (not a perfect square).
- LO2: Estimate the approximate value of an irrational square root by locating it between two consecutive perfect squares' roots.
- LO3: Explain, at a conceptual level, WHY the square root of a non-perfect-square integer is irrational, citing the uniqueness of prime factorization (an integer's square has every prime factor appearing an EVEN number of times).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.square-roots` (what a square root represents) and `math.found.irrational-numbers` (numbers that cannot be expressed as a ratio of integers) — this concept identifies WHICH square roots fall into that category and why.

## Component 3 — Core Explanation

The square root of a positive integer $n$ is **irrational** unless $n$ is a perfect square (1, 4, 9, 16, 25, ...). So $\sqrt2,\sqrt3,\sqrt5,\sqrt6,\sqrt7,\sqrt8,\sqrt{10},\ldots$ are all irrational, while $\sqrt4=2$, $\sqrt9=3$, etc. are rational (whole numbers).

**Why**: if $\sqrt n$ were rational, it would equal $\frac{a}{b}$ in lowest terms, giving $n=\frac{a^2}{b^2}$, i.e. $nb^2=a^2$. By the UNIQUENESS OF PRIME FACTORIZATION, a perfect square (like $a^2$ or $b^2$) has every prime factor appearing an EVEN number of times. If $n$ itself is not a perfect square, it has at least one prime factor appearing an ODD number of times in its own factorization — and this parity mismatch cannot be resolved by any choice of integer $a,b$, forcing a contradiction (this is the same proof structure as `math.found.proof-by-contradiction`'s classical $\sqrt2$ case, generalized to any non-perfect-square $n$).

## Component 4 — Worked Examples

**Example 1 (LO1 — classification)**: Is $\sqrt{49}$ rational or irrational? $49=7^2$ is a perfect square, so $\sqrt{49}=7$ is RATIONAL. Is $\sqrt{50}$ rational or irrational? $50$ is between the perfect squares $49$ and $64$, and is not itself a perfect square, so $\sqrt{50}$ is IRRATIONAL.

**Example 2 (LO2 — estimating an irrational root, breaking MC-1)**: Estimate $\sqrt{50}$. Since $7^2=49<50<64=8^2$, $\sqrt{50}$ lies strictly between $7$ and $8$ — and since $50$ is much closer to $49$ than to $64$, $\sqrt{50}\approx7.07$ (the true value), NOT the naive midpoint estimate of $7.5$. Simple linear interpolation between the two bounding integers is only a rough guide, not an exact method — the true value is genuinely closer to the LOWER bound here because square roots grow more slowly as numbers increase.

**Example 3 (LO3 — the parity argument, breaking MC-2)**: Why is $\sqrt6$ irrational? If $\sqrt6=\frac{a}{b}$ in lowest terms, then $6b^2=a^2$. Since $6=2\times3$, the left side $6b^2$ has an ODD total count of the prime factor 2 relative to $b^2$'s own even count (specifically, $b^2$ contributes an even number of 2's, plus the ONE extra 2 from the factor 6, making an odd total) — but $a^2$, being a perfect square, must have an EVEN count of every prime factor, including 2. This parity mismatch (odd vs. even count of the prime 2) is impossible, so no such $a,b$ exist, proving $\sqrt6$ is irrational. A common error stops at "6 isn't a perfect square, so its root is irrational" without being able to articulate WHY that's true beyond citing the classification rule as if it were self-evident.

## Component 5 — Teaching Actions

### Teaching Action A01 — Locate Between Consecutive Perfect Squares (Primitive P64: Conceptual Shift)

Work Example 1's classification and Example 2's estimation together, building a mental number line of perfect squares ($1,4,9,16,25,36,49,64,\ldots$) and locating a given non-perfect-square integer between two consecutive entries to both classify its root as irrational AND bound its approximate value.

- **MC-1 hook**: ask the student to estimate $\sqrt{50}$ using the midpoint of 7 and 8 (revealing MC-1: assuming square roots interpolate linearly between bounding perfect-square roots, rather than recognizing the curve's actual (concave) shape).

### Teaching Action A02 — The Prime-Factorization Parity Argument (Primitive P06: Contrast Pair)

Contrast a perfect square's prime factorization (every prime's exponent EVEN, e.g. $36=2^2\times3^2$) against a non-perfect-square's factorization (at least one prime's exponent ODD, e.g. $6=2^1\times3^1$), working Example 3's full parity-mismatch argument to show concretely why no fraction $\frac ab$ could satisfy $nb^2=a^2$ when $n$ has an odd-exponent prime.

- **MC-2 hook**: ask the student to explain WHY $\sqrt6$ is irrational, not just classify it, and check whether the explanation goes beyond "6 isn't a perfect square" to the actual parity mechanism.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Classify $\sqrt{81}$ and $\sqrt{90}$ as rational or irrational, justifying each.
  2. Estimate $\sqrt{20}$ by locating it between two consecutive perfect-square roots, and state whether it is closer to the lower or upper bound.
  3. Explain, using the prime-factorization parity argument, why $\sqrt{12}$ is irrational.
  4. Given that $\sqrt2$'s irrationality was proved in `math.found.proof-by-contradiction`, explain how this concept's general parity argument for $\sqrt n$ specializes to reproduce that exact same proof when $n=2$.
- **P76 (Transfer Probe, mode = independence)**: "A carpenter needs to cut a diagonal brace for a square frame with side length 10 (the diagonal length is $\sqrt{200}$ by the Pythagorean relationship, taken as given here). (a) Determine whether $\sqrt{200}$ is rational or irrational, and estimate its approximate value by locating it between two consecutive perfect squares. (b) Explain to the carpenter, in plain terms grounded in this lesson's parity argument, why no EXACT fraction-of-an-inch measurement will ever perfectly capture this diagonal length, no matter how finely measured."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SQUARE-ROOT-ESTIMATED-BY-LINEAR-MIDPOINT-INTERPOLATION | Assuming a square root's value lies at the linear midpoint between two bounding perfect-square roots, ignoring the curve's actual concave shape | Moderate |
| MC-2 | IRRATIONALITY-CLASSIFICATION-ACCEPTED-WITHOUT-UNDERSTANDING-WHY | Correctly classifying a root as irrational (via the "not a perfect square" rule) without being able to explain the underlying prime-factorization parity reason | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Square Root Estimated by Linear Midpoint") → P41 (detect: present Example 2's $\sqrt{50}$ estimation and check for a midpoint answer of $7.5$) → P64 (conceptual shift: compute $7.07^2\approx50$ directly to verify the true value, contrasting it with the naive midpoint guess of $7.5^2=56.25$, showing the interpolation error).
- **B02 (targets MC-2)**: P27 ("Irrationality Accepted Without Understanding Why") → P41 (detect: ask the student to explain WHY $\sqrt6$ is irrational beyond "6 isn't a perfect square") → P64 (conceptual shift: re-walk Example 3's full parity argument, explicitly counting prime-factor exponents in $6b^2$ vs. $a^2$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.square-roots`, `math.found.irrational-numbers`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.proof-by-contradiction` (the specific $\sqrt2$ case this concept's general argument directly generalizes, reused by reference rather than re-derived from scratch).

## Component 8 — Teaching Notes

- estimated_hours = 4 and bloom = understand reflect that this concept's genuine content is the WHY (the parity argument), not merely a classification rule to apply mechanically.
- MC-2 was deliberately included as a distinct misconception (rather than assuming correct classification implies understanding) because the classification rule ("not a perfect square ⇒ irrational") is easily memorized and applied correctly by rote, while the actual proof mechanism is a genuinely separate and more demanding piece of understanding this concept is specifically responsible for building.
- This concept explicitly reuses `math.found.proof-by-contradiction`'s $\sqrt2$ proof by reference (Teaching Action A03's problem 4) rather than re-deriving it, generalizing that specific case to the full parity argument for any non-perfect-square $n$ — avoiding duplicating content already authored in that blueprint.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.square-roots`, `math.found.irrational-numbers`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Uncountable Set (`math.found.uncountable-set`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.uncountable-set` |
| name | Uncountable Set |
| domain | Foundations |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.countable-set` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A set whose cardinality is strictly greater than that of ℕ; the real numbers ℝ are uncountable (Cantor's diagonal argument). |
| related | `math.found.countable-set` |
| aliases | uncountably infinite, non-enumerable |

## Component 1 — Learning Objectives

- LO1: Define an **uncountable set** as one with cardinality STRICTLY GREATER than $\mathbb{N}$'s — no bijection with $\mathbb{N}$ can exist, no matter how it's constructed.
- LO2: Reproduce Cantor's diagonal argument to show $\mathbb{R}$ (or the interval $(0,1)$) is uncountable, by assuming a complete enumeration exists and constructing a number provably missing from it.
- LO3: Distinguish "no enumeration has been FOUND yet" from "provably NO enumeration can exist" — uncountability is a genuine impossibility proof, not merely a difficulty.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.countable-set` (the direct contrast this concept establishes: a set that fails to be countable, PROVABLY, not just apparently).

## Component 3 — Core Explanation

A set is **uncountable** if its cardinality is strictly greater than $\mathbb{N}$'s — equivalently, NO bijection between it and $\mathbb{N}$ exists, however cleverly constructed (contrast `math.found.countable-set`'s $\mathbb{Z}$ and $\mathbb{Q}$, where a clever bijection DOES exist). **Cantor's diagonal argument** proves $(0,1)$ (and hence $\mathbb{R}$) is uncountable: assume, for contradiction, that a complete list $x_1,x_2,x_3,\ldots$ of all reals in $(0,1)$ exists (written as infinite decimals); construct a new number $y$ by choosing its $n$th decimal digit to DIFFER from $x_n$'s $n$th digit, for every $n$. This $y$ differs from every listed $x_n$ in at least one digit, so $y$ is NOT on the list — contradicting the assumption that the list was complete. Hence no complete enumeration of $(0,1)$ can exist.

This is genuinely a **proof by contradiction** (`math.found.proof-by-contradiction`): it doesn't merely fail to find an enumeration, it proves none can possibly exist.

## Component 4 — Worked Examples

**Example 1 (LO2 — the diagonal argument step by step)**: Suppose (for contradiction) $(0,1)$ is enumerated: $x_1=0.\mathbf{1}42\ldots$, $x_2=0.5\mathbf{0}3\ldots$, $x_3=0.99\mathbf{2}\ldots$ (bolded digits mark the diagonal position: $n$th digit of $x_n$). Construct $y=0.d_1d_2d_3\ldots$ where $d_n$ differs from $x_n$'s $n$th digit (e.g. add 1, wrapping 9 to 0): here $d_1\ne1$, $d_2\ne0$, $d_3\ne2$, giving $y=0.213\ldots$ (one valid choice). This $y$ cannot equal $x_1$ (differs in digit 1), cannot equal $x_2$ (differs in digit 2), cannot equal $x_3$ (differs in digit 3) — and by construction, differs from EVERY $x_n$ in digit $n$, so $y$ is missing from the supposedly complete list.

**Example 2 (LO3 — impossibility, not just difficulty, breaking MC-1)**: A student might think "maybe we just haven't found the right enumeration of $\mathbb{R}$ yet — perhaps a cleverer scheme, like the one used for $\mathbb{Q}$, would work." This is WRONG in a way qualitatively different from "we haven't tried hard enough": the diagonal argument shows that ANY proposed enumeration — no matter how it is constructed — admits a missing number by the SAME diagonal construction. It is a proof of genuine impossibility, exactly analogous to `math.found.proof-by-contradiction`'s $\sqrt2$ case, not an unsolved search problem.

**Example 3 (LO1 — comparing cardinalities directly)**: Since $\mathbb{N}$ is countable and $\mathbb{R}$ is uncountable, $|\mathbb{R}|>|\mathbb{N}|$ — a STRICTLY greater infinite cardinality exists. This shows "infinity" is not a single, uniform notion — there are at least two genuinely different SIZES of infinite set, a fact with no analog among finite sets.

## Component 5 — Teaching Actions

### Teaching Action A01 — Construct the Diagonal Number Explicitly (Primitive P64: Conceptual Shift)

Work Example 1 in full, constructing $y$ digit by digit against a concrete (short) hypothetical list, and explicitly verifying $y$ differs from each listed number at the corresponding diagonal position.

- **MC-1 hook**: after presenting the diagonal argument's conclusion, ask "couldn't a smarter enumeration scheme, like the one used for the rationals, eventually work for $\mathbb{R}$?" (revealing MC-1: treating uncountability as an unsolved search problem rather than a proven impossibility).

### Teaching Action A02 — Provable Impossibility vs. Not-Yet-Found (Primitive P06: Contrast Pair)

Contrast `math.found.countable-set`'s $\mathbb{Q}$ case (a clever enumeration WAS eventually found) against this concept's $\mathbb{R}$ case (PROVABLY no enumeration can ever be found, for any scheme whatsoever) side by side. State the rule: "the diagonal argument doesn't just fail to enumerate $\mathbb{R}$ — it shows that ANY attempted enumeration, whatever its rule, necessarily misses at least one number, by the very construction of the diagonal number itself."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given a (short, 4-number) hypothetical enumeration of numbers in $(0,1)$, construct the diagonal number $y$ explicitly and verify it differs from all 4 listed numbers.
  2. Explain, in one paragraph, why the diagonal argument constitutes a proof by contradiction, identifying the assumed statement and the derived impossibility.
  3. State whether $|\mathbb{R}|=|\mathbb{N}|$, $|\mathbb{R}|<|\mathbb{N}|$, or $|\mathbb{R}|>|\mathbb{N}|$, and justify using Cantor's argument.
  4. Explain why finding a bijection between $\mathbb{Z}$ and $\mathbb{N}$ was possible (per `math.found.countable-set`) while no such bijection can EVER be found between $\mathbb{R}$ and $\mathbb{N}$ — connect to what specifically differs about the two situations.
- **P76 (Transfer Probe, mode = independence)**: "A student claims: 'if we had infinite time and infinite computing power, we could eventually list every real number in $(0,1)$, one at a time, just like listing the rationals.' (a) Explain, using the diagonal argument's logic, why this claim is false regardless of how much time or computational power is available — the issue is not practical difficulty. (b) Describe, in your own words, what the diagonal construction guarantees about ANY proposed list, however it is generated, and why this makes the impossibility a matter of pure logic rather than resources."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | UNCOUNTABILITY-TREATED-AS-UNSOLVED-SEARCH-PROBLEM | Believing a cleverer enumeration scheme might eventually be found for $\mathbb{R}$, rather than recognizing the diagonal argument proves NO enumeration can ever exist | Foundational |
| MC-2 | DIAGONAL-ARGUMENT-MISAPPLIED-TO-A-FINITE-OR-INCOMPLETE-LIST | Constructing a "diagonal number" against a list that is not actually claimed to be complete, missing that the argument's force comes specifically from contradicting an assumed COMPLETE enumeration | Moderate |
| MC-3 | ALL-INFINITE-SETS-ASSUMED-SAME-SIZE | Believing all infinite sets have the "same" size simply because they are all infinite, missing that $|\mathbb{R}|>|\mathbb{N}|$ demonstrates genuinely different infinite cardinalities | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Uncountability Treated as Unsolved Search Problem") → P41 (detect: the opening A01 question itself) → P64 (conceptual shift: re-walk Example 2, emphasizing the diagonal construction applies to ANY proposed list, defeating the "just try harder" intuition).
- **B02 (targets MC-2)**: P27 ("Diagonal Argument Misapplied to Incomplete List") → P41 (detect: ask the student to explain what the diagonal argument assumes at the start; check whether they identify the COMPLETENESS assumption specifically) → P64 (conceptual shift: re-state the proof-by-contradiction structure explicitly — assume completeness, derive a missing element, conclude the assumption was false).
- **B03 (targets MC-3)**: P27 ("All Infinite Sets Assumed Same Size") → P41 (detect: ask whether $\mathbb{N}$ and $\mathbb{R}$ have "the same size, since both are infinite") → P64 (conceptual shift: re-walk Example 3, confirming $|\mathbb{R}|>|\mathbb{N}|$ is a genuine, proven strict inequality between two different infinite cardinalities).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.countable-set`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.proof-by-contradiction` (the diagonal argument's logical structure is a direct instance of this technique, reused by reference rather than re-derived).

## Component 8 — Teaching Notes

- estimated_hours = 4, matching `math.found.countable-set`'s allocation and reflecting the diagonal argument's genuine conceptual difficulty as this domain's most advanced construction (difficulty = proficient, the highest tier reached in this batch).
- MC-1 and MC-3 are both ranked foundational because they represent the SAME failure at different scopes — MC-1 doubts this SPECIFIC impossibility proof; MC-3 doubts the very existence of different infinite sizes that the proof establishes — both undermining the concept's central discovery.
- The diagonal argument was deliberately connected explicitly to `math.found.proof-by-contradiction`'s machinery (Component 8's cross-reference, Teaching Action A02) rather than presented as a standalone novel technique, reinforcing that this domain's advanced results still rest on the same proof toolkit built earlier in the wave.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.countable-set`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

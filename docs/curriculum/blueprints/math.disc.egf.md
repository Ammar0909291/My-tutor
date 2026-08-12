# Teaching Blueprint: Exponential Generating Functions (`math.disc.egf`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.egf` |
| name | Exponential Generating Functions |
| domain | Discrete Mathematics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.disc.generating-functions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | B(x) = ∑_{n≥0} bₙxⁿ/n! for labeled structures. Product of EGFs corresponds to labeled union. eˣ is the EGF for permutations; e^{eˣ−1} for set partitions. Essential for counting labeled objects.

 |

## Component 1 — Learning Objectives

- LO1: Write the EGF $B(x)=\sum_{n\ge0}b_n\frac{x^n}{n!}$ for a given sequence, and recover sequence terms $b_n$ from a given EGF by multiplying its $x^n$ coefficient by $n!$.
- LO2: Explain WHY EGFs (dividing by $n!$) are the natural choice for LABELED structures, in contrast to OGFs for unlabeled ones — distinguishing when each type applies.
- LO3: Recognize $e^x$ as the EGF for permutations ($b_n=n!$ for all $n$) and interpret this connection.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.generating-functions` (the general encoding-a-sequence idea) — this concept specializes that idea for LABELED combinatorial structures, contrasting directly with `math.disc.ogf`'s unlabeled case.

## Component 3 — Core Explanation

An **exponential generating function (EGF)** encodes a sequence $b_0,b_1,b_2,\ldots$ as $B(x)=\sum_{n\ge0}b_n\frac{x^n}{n!}$ — dividing by $n!$ makes EGFs the natural tool for counting LABELED structures (where the $n$ individual elements/positions are distinguishable, e.g. labeled with distinct names $1,\ldots,n$), since the $\frac{1}{n!}$ factor correctly accounts for the $n!$ ways to assign labels when COMBINING labeled structures.

The sequence $b_n=n!$ (counting all permutations of $n$ labeled items) has EGF $B(x)=\sum_{n\ge0}n!\cdot\frac{x^n}{n!}=\sum_{n\ge0}x^n=\frac{1}{1-x}$... actually, the canonical simpler identity is: the EGF for the constant sequence $b_n=1$ (counting exactly ONE way to arrange $n$ labeled items into a single unordered group, i.e. "sets") is $e^x=\sum_{n\ge0}\frac{x^n}{n!}$ — this is the EGF whose coefficients directly are $\frac{1}{n!}$, matching $b_n=1$ for every $n$. The related structure $e^{e^x-1}$ is the EGF for the Bell numbers (set partitions).

## Component 4 — Worked Examples

**Example 1 (LO1 — writing and reading an EGF)**: The sequence $b_n=1$ for all $n\ge0$ has EGF $B(x)=\sum_{n\ge0}1\cdot\frac{x^n}{n!}=e^x$. Given $B(x)=e^{2x}=\sum_{n\ge0}\frac{(2x)^n}{n!}=\sum_{n\ge0}2^n\frac{x^n}{n!}$, the sequence is $b_n=2^n$ — read off DIRECTLY as the coefficient of $\frac{x^n}{n!}$ (not the coefficient of $x^n$ alone, which would be $\frac{2^n}{n!}$, a different quantity).

**Example 2 (LO2 — why EGFs suit labeled structures, breaking MC-1)**: Consider combining a labeled structure on set $S_1$ (size $k$) with an independent labeled structure on set $S_2$ (size $n-k$) to form a combined structure on a labeled set of size $n$: there are $\binom{n}{k}$ ways to choose WHICH labels go into $S_1$ versus $S_2$. The EGF product's coefficient, $b_n=\sum_{k=0}^n\binom{n}{k}b_k^{(1)}b_{n-k}^{(2)}$ (an EGF-CONVOLUTION with binomial weights, distinct from an OGF's plain convolution), automatically accounts for this label-assignment count — a plain OGF-style convolution (WITHOUT the binomial weight) would UNDERCOUNT, since it fails to account for the $\binom{n}{k}$ ways of distributing labels between the two substructures.

**Example 3 (LO3 — $e^x$ as the "sets of labeled points" EGF)**: $e^x$'s coefficient of $\frac{x^n}{n!}$ is exactly $1$ for every $n$ — meaning there is exactly ONE way to form an (unordered, unstructured) "block" out of $n$ labeled points (the points themselves are labeled, but the block containing them has no further internal structure). This is why $e^x$ appears as a fundamental building block throughout labeled combinatorics — e.g. $e^{e^x-1}$ (the EGF for set partitions, or Bell numbers) represents "a SET of such labeled blocks," composing $e^x$'s "one labeled block" structure with itself via the exponential formula.

## Component 5 — Teaching Actions

### Teaching Action A01 — EGF Coefficients Are Divided by n! — Read Carefully (Primitive P64: Conceptual Shift)

Work Example 1 both directions, explicitly emphasizing the extraction rule: "the coefficient of $\frac{x^n}{n!}$ IS $b_n$ directly — don't confuse this with the coefficient of $x^n$ alone, which would need to be multiplied by $n!$ to recover $b_n$."

### Teaching Action A02 — Why n! Division Matters for Labeled Structures (Primitive P06: Contrast Pair)

Work Example 2's binomial-weighted EGF convolution against a plain (unweighted) OGF-style convolution attempt, showing the plain version undercounts by failing to account for label-distribution choices. State the rule: "labeled structures need the $\binom{n}{k}$ weighting baked in automatically by the $\frac{1}{n!}$ normalization — this is exactly why EGFs, not OGFs, are the natural tool whenever the underlying $n$ elements are individually distinguishable."

- **MC-1 hook**: this contrast directly targets MC-1 (using OGF-style plain convolution on EGFs, missing the automatic binomial weighting).

### Teaching Action A03 — $e^x$ as the Building-Block EGF (Primitive P11: Representation Shift)

Work Example 3, connecting $e^x$'s uniform coefficient-of-1 pattern to its combinatorial meaning ("one way to form a labeled block"), previewing (without fully deriving) how it composes into $e^{e^x-1}$ for set partitions.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Write the EGF for the sequence $b_n=3^n$.
  2. Given $B(x)=e^{5x}$, state the sequence $b_n$ it represents.
  3. Explain, in one sentence, why the coefficient of $\frac{x^n}{n!}$ (not $x^n$) is the natural quantity to extract from an EGF.
  4. State what sequence $e^x$ itself represents (i.e. $b_n$ for all $n$), and explain its combinatorial meaning as "one way to form a labeled block."
- **P76 (Transfer Probe, mode = independence)**: "A combinatorics problem asks for the number of ways to partition a set of $n$ distinctly labeled students into an unordered collection of non-empty study groups (each student in exactly one group, groups have no internal order or names). (a) Explain, using this lesson's EGF-composition idea (previewed with $e^{e^x-1}$ in Example 3), why this counting problem — the Bell numbers — is naturally suited to EGFs rather than OGFs, given that the students are individually labeled/distinguishable. (b) Contrast this with a DIFFERENT problem: partitioning $n$ IDENTICAL (unlabeled) tokens into groups — explain why this second problem would instead be a natural fit for an OGF (per `math.disc.ogf`), not an EGF."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EGF-PRODUCT-COMPUTED-AS-PLAIN-CONVOLUTION | Computing the product of two EGFs using an OGF-style plain convolution, missing the automatic binomial-coefficient weighting that makes EGF products correct for labeled structures | Foundational |
| MC-2 | EGF-COEFFICIENT-EXTRACTION-CONFUSED-WITH-OGF | Reading off the coefficient of $x^n$ directly as $b_n$ (as one would for an OGF), forgetting the required multiplication by $n!$ | Foundational |
| MC-3 | LABELED-VS-UNLABELED-STRUCTURE-TYPE-MISJUDGED | Choosing an EGF for a fundamentally unlabeled counting problem, or an OGF for a fundamentally labeled one, misjudging which encoding the problem's structure actually calls for | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("EGF Product Computed as Plain Convolution") → P41 (detect: present Example 2's scenario and check whether the binomial-weighted sum or a plain convolution sum is used) → P64 (conceptual shift: re-derive the label-distribution count explicitly, $\binom{n}{k}$ ways to split $n$ labels between the two substructures, showing why this weight is required).
- **B02 (targets MC-2)**: P27 ("EGF Coefficient Extraction Confused with OGF") → P41 (detect: present Example 1's $e^{2x}$ case and check whether $b_n$ is reported as $\frac{2^n}{n!}$ (the $x^n$ coefficient) or correctly as $2^n$) → P64 (conceptual shift: re-derive by explicitly multiplying the $x^n$ coefficient by $n!$ to recover $b_n$, per the EGF's defining formula).
- **B03 (targets MC-3)**: P27 ("Labeled vs. Unlabeled Structure Type Misjudged") → P41 (detect: present a new combinatorial scenario and ask whether an OGF or EGF applies; check the reasoning given) → P64 (conceptual shift: re-walk the transfer probe's explicit labeled/unlabeled contrast, asking "are the individual $n$ elements distinguishable from each other?" as the deciding question).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.generating-functions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.ogf` (the unlabeled-structure counterpart, directly contrasted throughout this blueprint), `math.disc.stirling-numbers` (Stirling numbers of the second kind, connected to the Bell-number/set-partition structure this concept previews).

## Component 8 — Teaching Notes

- estimated_hours = 5 and difficulty = expert, mastery_threshold = 0.70 (the lowest threshold in this batch) reflect that EGFs are among the most abstract concepts in this domain, with the mastery bar set to prioritize genuine conceptual grasp of the labeled/unlabeled distinction over flawless mechanical fluency at this stage.
- MC-1 was ranked most severe because it is the exact EGF analog of `math.disc.ogf`'s own MC-1 (pointwise-vs-convolution confusion) at one level deeper — even a student who correctly generalizes "product means convolution" from OGFs will still undercount EGF products without the additional binomial weighting, making this a genuinely NEW pitfall despite superficial similarity to prior material.
- This blueprint deliberately mirrors `math.disc.ogf`'s structure (writing/reading, product interpretation, closed-form connection) throughout, since the two concepts are natural direct counterparts — the transfer probe's part (b) explicitly requires the student to distinguish when each applies, reinforcing the pairing rather than treating EGFs in isolation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.generating-functions`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

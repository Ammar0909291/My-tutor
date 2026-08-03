# Teaching Blueprint: Ordinary Generating Functions (`math.disc.ogf`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.ogf` |
| name | Ordinary Generating Functions |
| domain | Discrete Mathematics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.disc.generating-functions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A(x) = ∑_{n≥0} aₙxⁿ for unlabeled combinatorial structures. Product of OGFs corresponds to convolution of sequences. Partial fractions decompose rational GFs into partial sums, yielding linear recurrence solutions.

 |

## Component 1 — Learning Objectives

- LO1: Write the OGF $A(x)=\sum_{n\ge0}a_nx^n$ for a given sequence, and recover sequence terms as coefficients from a given OGF.
- LO2: Compute the product of two OGFs and interpret the result as the CONVOLUTION of the two original sequences.
- LO3: Use partial fraction decomposition of a rational OGF to extract a closed-form formula for its sequence's general term, connecting back to `math.disc.linear-recurrence`'s characteristic-root solutions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.generating-functions` (the general encoding-a-sequence-as-a-power-series idea this concept specializes into the "ordinary," unlabeled-structure case).

## Component 3 — Core Explanation

An **ordinary generating function (OGF)** encodes a sequence $a_0,a_1,a_2,\ldots$ as the formal power series $A(x)=\sum_{n\ge0}a_nx^n$ — the sequence's $n$-th term is simply the COEFFICIENT of $x^n$. OGFs represent UNLABELED combinatorial structures (where identical-looking arrangements are not distinguished by internal labels).

**Product of OGFs**: if $A(x)=\sum a_nx^n$ and $B(x)=\sum b_nx^n$, their product $A(x)B(x)=\sum c_nx^n$ has coefficients $c_n=\sum_{k=0}^na_kb_{n-k}$ — the CONVOLUTION of the two sequences. This corresponds combinatorially to combining a structure counted by $A$ with one counted by $B$.

**Partial fractions**: a rational OGF like $\frac{1}{(1-2x)(1-3x)}$ can be decomposed into $\frac{A}{1-2x}+\frac{B}{1-3x}$, each term expandable as a geometric series ($\frac{1}{1-rx}=\sum r^nx^n$), directly yielding a closed-form sequence formula — recovering exactly the kind of solution `math.disc.linear-recurrence` produces via characteristic roots.

## Component 4 — Worked Examples

**Example 1 (LO1 — writing and reading an OGF)**: The sequence $a_n=2^n$ (i.e. $1,2,4,8,16,\ldots$) has OGF $A(x)=\sum_{n\ge0}2^nx^n=\frac{1}{1-2x}$ (a geometric series). Conversely, given $A(x)=\frac{1}{1-3x}$, the sequence is $a_n=3^n$.

**Example 2 (LO2 — product as convolution, breaking MC-1)**: Let $A(x)=\frac{1}{1-x}=\sum_{n\ge0}x^n$ (sequence $1,1,1,\ldots$) and $B(x)=\frac{1}{1-x}$ (same sequence). The product $A(x)B(x)=\frac{1}{(1-x)^2}=\sum_{n\ge0}(n+1)x^n$ — the coefficient sequence is $1,2,3,4,\ldots$, NOT the term-by-term product of the original sequences ($1\times1,1\times1,\ldots=1,1,1,\ldots$, which would be a common but incorrect guess). The coefficient $c_n=\sum_{k=0}^na_kb_{n-k}=\sum_{k=0}^n1\cdot1=n+1$ — a genuine CONVOLUTION sum, not a pointwise multiplication of corresponding terms.

**Example 3 (LO3 — partial fractions to closed form)**: Decompose $A(x)=\frac{1}{(1-2x)(1-3x)}$. Partial fractions: $\frac{1}{(1-2x)(1-3x)}=\frac{-2}{1-2x}+\frac{3}{1-3x}$ (solving for the constants via the standard partial-fraction method). Expand each geometric series: $-2\sum2^nx^n+3\sum3^nx^n=\sum(-2\cdot2^n+3\cdot3^n)x^n$. So $a_n=-2^{n+1}+3^{n+1}$ — a closed-form solution matching exactly the form `math.disc.linear-recurrence` would produce for the recurrence $a_n=5a_{n-1}-6a_{n-2}$ (whose characteristic roots are 2 and 3).

## Component 5 — Teaching Actions

### Teaching Action A01 — OGF as a Coefficient-Extraction Device (Primitive P64: Conceptual Shift)

Work Example 1 both directions (sequence → OGF, and OGF → sequence), reinforcing that the OGF is just a bookkeeping device where "the coefficient of $x^n$" IS the sequence's $n$-th term, nothing more mysterious.

### Teaching Action A02 — Product Means Convolution, Not Pointwise Multiplication (Primitive P06: Contrast Pair)

Work Example 2's correct convolution computation against the flawed pointwise-multiplication guess, showing the genuinely different resulting sequences ($1,2,3,4,\ldots$ vs. $1,1,1,\ldots$). State the rule explicitly: "multiplying two generating functions convolves the sequences — sum over all ways to split the index $n$ between the two factors — it is NOT the same as multiplying corresponding terms."

- **MC-1 hook**: this contrast directly targets MC-1 (assuming OGF multiplication is pointwise).

### Teaching Action A03 — Partial Fractions Recover a Closed Form (Primitive P11: Representation Shift)

Work Example 3 in full, connecting each partial-fraction term's geometric-series expansion back to a specific characteristic root, explicitly bridging this technique to the already-familiar `math.disc.linear-recurrence` solution method.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Write the OGF for the sequence $a_n=5^n$.
  2. Given $A(x)=\frac{1}{1-4x}$, state the sequence it represents.
  3. Compute the coefficient of $x^3$ in the product $\frac{1}{1-x}\cdot\frac{1}{1-x}$ using the convolution formula, and verify it matches the closed form $(n+1)$ from Example 2.
  4. Decompose $\frac{1}{(1-x)(1-4x)}$ via partial fractions and find the closed-form formula for its sequence.
- **P76 (Transfer Probe, mode = independence)**: "A vending machine problem asks for the number of ways to make change for $n$ cents using only 1-cent and 5-cent coins (unlimited supply of each, order doesn't matter). (a) The OGF for using only 1-cent coins is $\frac{1}{1-x}$ (any number of 1-cent coins), and for only 5-cent coins is $\frac{1}{1-x^5}$ (any number of 5-cent coins, contributing multiples of 5 to the total). Explain, using this lesson's product-as-convolution idea, why the OGF for using BOTH coin types together is the PRODUCT $\frac{1}{(1-x)(1-x^5)}$, not some other combination. (b) Without fully decomposing it, describe in general terms what kind of closed-form answer you would expect this product's partial-fraction decomposition to eventually yield, based on Example 3's pattern."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | OGF-PRODUCT-TREATED-AS-POINTWISE-MULTIPLICATION | Believing the product of two generating functions corresponds to term-by-term multiplication of the underlying sequences, rather than convolution | Foundational |
| MC-2 | PARTIAL-FRACTION-CONSTANTS-MISCOMPUTED | Making an algebraic error solving for the partial-fraction decomposition's constants, propagating an incorrect closed-form sequence formula | Moderate |
| MC-3 | OGF-COEFFICIENT-EXTRACTION-INDEX-CONFUSED | Confusing which power of $x$ corresponds to which sequence index when reading a coefficient off an OGF, especially for series with shifted or scaled exponents | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("OGF Product Treated as Pointwise Multiplication") → P41 (detect: present Example 2 and check whether the guessed product sequence is $1,1,1,\ldots$ or the correct $1,2,3,4,\ldots$) → P64 (conceptual shift: re-derive the convolution sum explicitly, $c_n=\sum_{k=0}^na_kb_{n-k}$, for a specific small $n$ like $n=2$, verifying $c_2=a_0b_2+a_1b_1+a_2b_0=1+1+1=3$ matches).
- **B02 (targets MC-2)**: P27 ("Partial Fraction Constants Miscomputed") → P41 (detect: review a submitted partial-fraction decomposition for an arithmetic error) → P64 (conceptual shift: re-derive the constants via the standard clearing-denominators method, verifying by substituting back specific values of $x$).
- **B03 (targets MC-3)**: P27 ("OGF Coefficient Extraction Index Confused") → P41 (detect: present an OGF with a shifted/scaled power like $\frac{1}{1-x^5}$ and ask for a specific coefficient) → P64 (conceptual shift: re-expand the series explicitly term by term, showing which power of $x$ genuinely appears and which are structurally absent).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.generating-functions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.egf` (the labeled-structure counterpart), `math.disc.linear-recurrence` (the closed-form solution technique this concept's partial-fraction method directly parallels and reinforces).

## Component 8 — Teaching Notes

- estimated_hours = 5 and difficulty = expert reflect that this concept sits at the intersection of algebra (partial fractions), combinatorics (convolution interpretation), and recurrence theory, demanding synthesis across multiple advanced prerequisites.
- MC-1 was ranked most severe because it represents a fundamental misunderstanding of what multiplying formal power series actually does — a student who assumes pointwise multiplication has not grasped the encoding mechanism at all, undermining every subsequent OGF manipulation.
- The vending-machine transfer probe (coin-change counting) was deliberately chosen as the canonical application of OGF products, since it is a standard, intuitive combinatorial scenario where the product-as-combination interpretation (combining independent "choices" from each coin type) is unusually easy to motivate concretely.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

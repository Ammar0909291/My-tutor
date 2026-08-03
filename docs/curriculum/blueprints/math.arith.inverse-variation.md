# Teaching Blueprint: Inverse Variation (`math.arith.inverse-variation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.inverse-variation` |
| name | Inverse Variation |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.arith.proportion` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — area-model/table representations before symbolic $y=k/x$ |
| description (KG) | A relationship where y = k/x for a constant k, meaning y decreases as x increases and their product is constant. |

## Component 1 — Learning Objectives

- LO1: Determine whether a given table or equation represents inverse variation, and if so, find the constant of variation $k$ by checking that $x\times y$ is constant.
- LO2: Use $y=k/x$ (equivalently $xy=k$) to find an unknown value of $x$ or $y$ given the other and $k$.
- LO3: Distinguish inverse variation (constant PRODUCT $xy=k$) from direct variation (constant RATIO $y/x=k$), recognizing that "one increases as the other decreases" alone does not guarantee inverse variation specifically.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.proportion` (equal ratios, the foundation this concept contrasts against via its constant-product structure).

## Component 3 — Core Explanation

**Inverse variation** describes a relationship $y=\frac{k}{x}$ (equivalently $xy=k$), where $k$ is a fixed constant: as $x$ increases, $y$ decreases so that their PRODUCT stays constant. This differs fundamentally from direct variation (constant RATIO $y/x=k$): in direct variation, doubling $x$ doubles $y$; in inverse variation, doubling $x$ HALVES $y$ (keeping $xy$ fixed).

Verifying inverse variation requires checking that $x\times y$ is the SAME value across every data pair — merely observing that $y$ decreases as $x$ increases is necessary but not sufficient.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — identifying $k$ and using it)**: A table shows $x=2,y=12$; $x=4,y=6$; $x=6,y=4$. Check products: $2\times12=24$, $4\times6=24$, $6\times4=24$ — constant $k=24$, so $y=24/x$. Using this, find $y$ when $x=8$: $y=24/8=3$.

**Example 2 (LO3 — decreasing together isn't automatically inverse variation, breaking MC-1)**: The table $x=1,y=20$; $x=2,y=15$; $x=4,y=5$ shows $y$ decreasing as $x$ increases — but checking products: $1\times20=20$, $2\times15=30$, $4\times5=20$ — NOT all equal, so this is NOT inverse variation despite the decreasing trend. A relationship can have $y$ decrease as $x$ increases for many reasons (e.g. a linear relationship with negative slope) without the specific constant-product structure of inverse variation.

**Example 3 (LO2, LO3 — contrasting direct vs. inverse computation, breaking MC-2)**: Given $xy=36$ (inverse variation) and asked to find $y$ when $x=9$: $y=36/9=4$. A common error instead treats this like direct variation and computes $y=k\times x$ using some mistakenly-derived $k$ (e.g. treating $36$ as a ratio constant rather than a product constant), giving a wrong, much larger answer — the OPERATION (divide by $x$, not multiply by $x$) must match the relationship's actual type.

## Component 5 — Teaching Actions

### Teaching Action A01 — Find k by Checking the Product Is Constant (Primitive P64: Conceptual Shift)

Work Example 1, computing $x\times y$ for each table row explicitly and confirming they all equal the same value before declaring $k=24$ and writing $y=24/x$.

- **MC-1 hook**: present Example 2's decreasing-but-non-constant-product table and ask whether it represents inverse variation (revealing MC-1: assuming any "$y$ decreases as $x$ increases" pattern qualifies as inverse variation, without checking the constant-product property specifically).

### Teaching Action A02 — Product Constant (Inverse) vs. Ratio Constant (Direct) (Primitive P06: Contrast Pair)

Contrast Example 1's inverse-variation table (constant PRODUCT, $xy=24$ throughout) against a direct-variation table with the SAME first data point (e.g. $x=2,y=12$ also fits $y=6x$, a completely different relationship) to show that a single matching point never determines which relationship type applies — the full pattern (product vs. ratio) must be checked. State the rule: "inverse variation keeps $x\times y$ fixed; direct variation keeps $y\div x$ fixed — these are different tests, and using the wrong one gives a wrong constant entirely."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given the table $x=3,y=8$; $x=4,y=6$; $x=6,y=4$, determine whether this represents inverse variation and find $k$ if so.
  2. Given $xy=48$, find $y$ when $x=6$, and find $x$ when $y=4$.
  3. Given the table $x=1,y=10$; $x=2,y=8$; $x=5,y=2$, determine whether it represents inverse variation, checking the product for every pair.
  4. Explain, in one sentence, the difference between checking "$y/x$ constant" and "$x\times y$ constant," and state which test applies to inverse variation.
- **P76 (Transfer Probe, mode = independence)**: "The time it takes to complete a job varies inversely with the number of workers: 4 workers can finish a job in 9 hours. (a) Find the constant of variation $k$ (representing total worker-hours needed) and write the equation relating hours $(h)$ to number of workers $(w)$. (b) A manager assumes that using 12 workers (three times as many) would finish the job in 3 hours (dividing 9 by 3) — verify whether this matches the inverse-variation relationship you found, and explain any discrepancy using the constant-product rule from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DECREASING-TOGETHER-MISTAKEN-FOR-INVERSE-VARIATION | Concluding inverse variation merely because $y$ decreases as $x$ increases, without verifying the product $xy$ is constant across all data points | Foundational |
| MC-2 | INVERSE-VARIATION-COMPUTATION-CONFUSED-WITH-DIRECT-VARIATION | Using the direct-variation operation (multiply by $x$) to solve an inverse-variation problem (which requires dividing $k$ by $x$), or vice versa | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Decreasing Together Mistaken for Inverse Variation") → P41 (detect: present Example 2's table and check whether "y decreases as x increases" is accepted as sufficient) → P64 (conceptual shift: re-compute $x\times y$ for every row explicitly, showing the products differ despite the decreasing trend).
- **B02 (targets MC-2)**: P27 ("Inverse Variation Computation Confused with Direct Variation") → P41 (detect: present Example 3 and check whether $y=k\times x$ or $y=k/x$ is used) → P64 (conceptual shift: re-derive from the defining relationship $xy=k\Rightarrow y=k/x$ explicitly, verifying by re-multiplying the found $y$ by $x$ to confirm it reproduces $k$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.proportion`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.direct-variation` (the complementary constant-ratio relationship, directly contrasted in Teaching Action A02).

## Component 8 — Teaching Notes

- estimated_hours = 4 mirrors `math.arith.direct-variation`'s allocation — both concepts require the same depth of verification discipline (checking a specific invariant across all data, not just a qualitative trend).
- MC-1 is the direct structural counterpart of direct-variation's MC-2 ("increasing together mistaken for constant ratio") — both misconceptions substitute a qualitative trend observation for the actual required quantitative invariant check, just for opposite-direction trends.
- The worker/job-completion transfer probe was deliberately chosen because "more workers, proportionally less time" is a common real-world intuition that genuinely IS inverse variation, giving the concept a concrete, verifiable stake beyond abstract $x,y$ tables — while part (b) tests whether the constant-product verification is actually applied to catch a plausible-but-wrong assumption.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.proportion`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: area-model/table representations before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Direct Variation (`math.arith.direct-variation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.direct-variation` |
| name | Direct Variation |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.arith.proportion` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — proportional graphs through the origin before symbolic $y=kx$ |
| description (KG) | A relationship where y = kx for a constant k, meaning y is proportional to x and the graph passes through the origin. |

## Component 1 — Learning Objectives

- LO1: Determine whether a given table, equation, or graph represents direct variation, and if so, find the constant of variation $k$.
- LO2: Use $y=kx$ to find an unknown value of $x$ or $y$ given the other and $k$.
- LO3: Recognize that direct variation's defining feature is the graph passing through the ORIGIN $(0,0)$ — a linear relationship with a nonzero $y$-intercept is NOT direct variation, even if it looks similarly "straight-line."

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.proportion` (equal ratios — direct variation is the functional/graphical form of exactly this idea, $\frac{y}{x}=k$ constant).

## Component 3 — Core Explanation

**Direct variation** describes a relationship $y=kx$, where $k$ (the **constant of variation**) is fixed and $y$ is directly proportional to $x$ — as $x$ increases, $y$ increases proportionally (doubling $x$ doubles $y$, etc.). Its graph is a straight line through the ORIGIN $(0,0)$, since $x=0\Rightarrow y=k\times0=0$ always.

This origin-passing property is the DEFINING test: any linear relationship of the form $y=mx+b$ with $b\ne0$ is a straight line, but NOT direct variation, since it fails the "doubling $x$ doubles $y$" property and does not pass through the origin.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — identifying $k$ and using it)**: A table shows $x=2,y=6$; $x=5,y=15$; $x=8,y=24$. Check ratio: $6/2=3$, $15/5=3$, $24/8=3$ — constant $k=3$, so $y=3x$. Using this, find $y$ when $x=10$: $y=3\times10=30$.

**Example 2 (LO3 — origin test distinguishes direct variation from general linear, breaking MC-1)**: The relationship $y=2x+5$ IS linear (a straight line) but is NOT direct variation: at $x=0$, $y=5\ne0$ — it does not pass through the origin. Also, doubling $x$ does not double $y$: at $x=2$, $y=9$; at $x=4$, $y=13$, which is not $2\times9=18$. Contrast with $y=2x$ (true direct variation): at $x=2$, $y=4$; at $x=4$, $y=8=2\times4$ — doubling $x$ DOES double $y$ here.

**Example 3 (LO1 — verifying constancy across a table, breaking MC-2)**: Given the table $x=1,y=4$; $x=2,y=9$; $x=3,y=14$, checking ratios: $4/1=4$, $9/2=4.5$, $14/3\approx4.67$ — these are NOT equal, so this table does NOT represent direct variation, despite $y$ clearly increasing as $x$ increases. "Increasing together" alone does not establish direct variation — the ratio $y/x$ must be genuinely CONSTANT across every pair.

## Component 5 — Teaching Actions

### Teaching Action A01 — Find k by Checking the Ratio Is Constant (Primitive P64: Conceptual Shift)

Work Example 1, computing $y/x$ for each table row explicitly and confirming they all equal the same value before declaring $k=3$ and writing $y=3x$.

- **MC-1 hook**: present $y=2x+5$ and ask whether it's direct variation (revealing MC-1: assuming any straight-line/linear relationship qualifies as direct variation, without checking the origin/constant-ratio property specifically).

### Teaching Action A02 — The Origin Test, and Checking Every Pair Not Just Trend (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's side-by-side comparison of $y=2x+5$ (fails the origin/doubling test) against $y=2x$ (passes), isolating the origin-passing property as the deciding factor, not merely "is this a straight line."

**Contrast 2 (targets MC-2)**: Work Example 3's table, showing $y$ increasing as $x$ increases yet failing the constant-ratio test — state the rule: "increasing together is necessary but nowhere near sufficient; the ratio $y/x$ must be IDENTICAL for every single pair, not merely trending in the same direction."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given the table $x=3,y=12$; $x=6,y=24$; $x=9,y=36$, determine whether this represents direct variation and find $k$ if so.
  2. Given $y=5x$, find $y$ when $x=7$, and find $x$ when $y=45$.
  3. Determine whether $y=4x-1$ represents direct variation, justifying using the origin test.
  4. Given the table $x=2,y=6$; $x=4,y=11$; $x=6,y=17$, determine whether it represents direct variation, checking the ratio for EVERY pair.
- **P76 (Transfer Probe, mode = independence)**: "A recipe states that the amount of water needed varies directly with the amount of rice: 2 cups of rice needs 3 cups of water. (a) Find the constant of variation $k$ and write the equation relating water $(w)$ to rice $(r)$. (b) A student instead proposes the relationship $w=1.5r+0.5$ based on a slightly different data point they misremembered — explain, using the origin test from this lesson, why this proposed relationship could NOT be a genuine direct variation, regardless of whether it happens to fit one data point."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ANY-LINEAR-RELATIONSHIP-ASSUMED-DIRECT-VARIATION | Believing any straight-line relationship $y=mx+b$ qualifies as direct variation, without checking that $b=0$ specifically | Foundational |
| MC-2 | INCREASING-TOGETHER-MISTAKEN-FOR-CONSTANT-RATIO | Concluding direct variation merely because $y$ increases as $x$ increases, without verifying the ratio $y/x$ is identical across all data points | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Any Linear Relationship Assumed Direct Variation") → P41 (detect: present $y=2x+5$ and check whether it's classified as direct variation) → P64 (conceptual shift: re-check the origin test explicitly — evaluate at $x=0$ and confirm whether $y=0$ results).
- **B02 (targets MC-2)**: P27 ("Increasing Together Mistaken for Constant Ratio") → P41 (detect: present Example 3's table and check whether "y increases as x increases" is accepted as sufficient) → P64 (conceptual shift: re-compute $y/x$ for every single row explicitly, showing the values differ despite the increasing trend).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.proportion`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.inverse-variation` (the complementary $y=k/x$ relationship, contrasted directly in that concept's own blueprint).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects the added conceptual precision needed beyond basic proportion — specifically, distinguishing direct variation from the broader class of linear relationships it is a special case of.
- MC-1 was ranked most severe because it is the single most common confusion once students have already learned general linear equations $y=mx+b$ — the natural (but incorrect) assumption that direct variation is simply "linear" rather than the more restrictive "linear AND through the origin."
- The recipe transfer probe's part (b) was deliberately designed to present a plausible-sounding alternative relationship with a nonzero constant term, directly testing whether the origin test is applied as a genuine filter rather than treated as an afterthought once a linear-looking pattern is spotted.

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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: origin-passing graphs before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

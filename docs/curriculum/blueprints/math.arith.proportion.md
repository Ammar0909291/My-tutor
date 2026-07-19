# Teaching Blueprint: Proportion (`math.arith.proportion`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.proportion` |
| name | Proportion |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.arith.ratios` |
| unlocks | `math.arith.direct-variation`, `math.arith.inverse-variation` |
| cross_links | `math.func.linear-function` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — a scale-model/map example before cross-multiplication |
| description (KG) | An equation stating that two ratios are equal (a/b = c/d); used to solve scale problems, map reading, and many applied problems. |

## Component 1 — Learning Objectives

- LO1: Define a **proportion** as an equation stating two ratios are equal, $\frac{a}{b}=\frac{c}{d}$, and solve for an unknown term using **cross-multiplication** ($ad=bc$).
- LO2: Set up a proportion correctly from a word problem, paying careful attention to matching the CORRECT quantities in corresponding positions (e.g. not mixing up which quantity goes in the numerator versus denominator across the two ratios).
- LO3: Apply proportional reasoning to scale/map problems, and correctly distinguish a genuinely proportional relationship (constant ratio) from a superficially similar but NON-proportional one (e.g. one involving a fixed additive offset), recognizing that not every "two quantities that grow together" relationship is a true proportion.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.ratios` (a ratio $a:b$ or $\frac{a}{b}$ as a comparison of two quantities by division).

## Component 3 — Core Explanation

A **proportion** is an equation stating that two ratios are equal:
$$\frac{a}{b} = \frac{c}{d}$$
**Cross-multiplication** solves for an unknown: $ad=bc$ (multiply diagonally across the equals sign). This works because multiplying both sides of $\frac{a}{b}=\frac{c}{d}$ by $bd$ clears both denominators.

**Correctly setting up the proportion**: the single most important step is ensuring the SAME kind of quantity occupies the corresponding position in both ratios — e.g., if solving a map-scale problem with "map distance : real distance," BOTH ratios in the proportion must keep map distance on top (or both on bottom) — mixing this up (map distance on top in one ratio, real distance on top in the other) produces a proportion that looks structurally fine but answers the WRONG question.

**Genuine proportionality vs. a superficially similar relationship**: two quantities are genuinely proportional if their RATIO stays constant as both scale — $y=kx$ for a fixed constant $k$ (so $y/x=k$ always). A relationship like $y=x+5$ (a fixed ADDITIVE offset, not a fixed ratio) is NOT proportional, even though $y$ still grows as $x$ grows — checking whether $y/x$ stays constant across different values is the definitive test.

## Component 4 — Worked Examples

**Example 1 (LO1 — cross-multiplication)**: Solve $\frac{3}{4}=\frac{x}{20}$ for $x$. Cross-multiply: $3\times20=4\times x \Rightarrow 60=4x \Rightarrow x=15$.

**Example 2 (LO2 — correctly matching quantities, breaking MC-1)**: A map has scale "2cm represents 50km." A real distance is 175km — find the map distance. Set up CORRECTLY, keeping map-distance-to-real-distance consistent in both ratios: $\frac{2\text{cm}}{50\text{km}} = \frac{x\text{cm}}{175\text{km}}$ (map on top in BOTH ratios). Cross-multiply: $2\times175=50x \Rightarrow 350=50x \Rightarrow x=7$cm. (An INCORRECT setup mixing positions, e.g. $\frac{2}{50}=\frac{175}{x}$, would answer a different, wrong question — solving for what real distance corresponds to "175 map units," not the intended quantity.)

**Example 3 (LO3 — proportional vs. non-proportional, breaking MC-2)**: A cab company charges a flat $5 fee plus $2 per mile: cost $C=5+2m$ for $m$ miles. Is cost proportional to miles? Check the ratio $C/m$ at two different mile values: at $m=5$, $C=15$, ratio $=3$. At $m=10$, $C=25$, ratio $=2.5$ — the ratio CHANGES, confirming this is NOT a proportional relationship (the flat fee breaks the constant-ratio property), even though cost clearly increases as miles increase. Contrast with a DIFFERENT cab company charging purely $3/mile with no flat fee: $C=3m$, ratio $C/m=3$ always — genuinely proportional.

## Component 5 — Teaching Actions

### Teaching Action A01 — Cross-Multiplication, via a Scale Model (Primitive P11: Representation Shift)

Start concrete: present a scale model where "1 inch represents 10 feet," and ask how many real feet a 3.5-inch measurement on the model represents. Set up the ratio equation directly: $\frac{1\text{in}}{10\text{ft}}=\frac{3.5\text{in}}{x\text{ft}}$, solve by cross-multiplication: $x=35$ feet. State: "cross-multiplying is just clearing the fractions — multiply diagonally, then solve the resulting simple equation."

Shift to Example 1's pure numeric case, reinforcing the mechanical cross-multiplication procedure.

- **MC-1 hook**: present Example 2's map-scale problem and set it up with quantities SWAPPED between ratios (map-distance on top in one, real-distance on top in the other) — ask the student to solve, and check whether they notice the mismatch before or only after getting a nonsensical answer, revealing MC-1 (not consistently matching corresponding quantity types across both ratios when setting up a proportion).

### Teaching Action A02 — Correct Setup Matters, and Genuine vs. Superficial Proportionality (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place the CORRECT setup from Example 2 ($\frac{2\text{cm}}{50\text{km}}=\frac{x\text{cm}}{175\text{km}}$, map-on-top consistently) directly beside the INCORRECT mixed setup ($\frac{2}{50}=\frac{175}{x}$, positions swapped) — solve both and show they give DIFFERENT (and only one, correct) answers. State the rule: "before cross-multiplying, always check: is the SAME type of quantity in the same position (both numerators, or both denominators) across both ratios? If not, fix the setup before solving, not after."

**Contrast 2 (targets MC-2)**: Work Example 3's flat-fee-taxi versus flat-rate-taxi contrast explicitly, computing the ratio $C/m$ at two different values for EACH company and showing it changes for one (non-proportional) but stays constant for the other (genuinely proportional). State the test: "always check whether the ratio between the two quantities stays the SAME across different values — if it changes, the relationship is not a true proportion, no matter how naturally the two quantities seem to grow together."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve $\frac{5}{8}=\frac{x}{40}$ for $x$ using cross-multiplication.
  2. A recipe uses 3 cups of flour for every 2 cups of sugar. If a baker wants to use 10 cups of flour, set up and solve a proportion to find how much sugar is needed, being careful to keep flour and sugar consistently positioned.
  3. A phone plan costs a flat $20 fee plus $0.05 per text. Determine, by checking the ratio cost/(number of texts) at two different text counts, whether cost is proportional to the number of texts.
  4. A student sets up a map-scale proportion as $\frac{\text{map distance}_1}{\text{real distance}_2} = \frac{\text{map distance}_2}{\text{real distance}_1}$ (mismatched pairing). Explain what is wrong with this setup and how to fix it.
- **P76 (Transfer Probe, mode = independence)**: "A photographer is enlarging a photo while maintaining its exact original aspect ratio (width:height). The original photo is 4 inches wide by 6 inches tall. (a) Set up and solve a proportion to find the height of an enlarged version that is 10 inches wide, being careful to keep width and height consistently positioned in both ratios. (b) A separate photo-printing service instead charges a flat $2 setup fee plus $0.50 per square inch of print area — explain, using this lesson's ratio-constancy test, why the relationship between total cost and print area is NOT a true proportion, even though cost clearly increases as area increases."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUANTITY-POSITIONS-MISMATCHED-ACROSS-RATIOS | Setting up a proportion with corresponding quantity types in inconsistent positions across the two ratios (e.g. one ratio's numerator matching the other ratio's denominator type instead), producing an answer to the wrong question | Foundational |
| MC-2 | ANY-INCREASING-RELATIONSHIP-ASSUMED-PROPORTIONAL | Believing any relationship where both quantities increase together must be a true proportion, without checking whether their ratio actually stays constant | Foundational |
| MC-3 | CROSS-MULTIPLICATION-APPLIED-WITHOUT-VALID-PROPORTION-SETUP | Applying the cross-multiplication mechanical procedure to an equation that isn't actually a valid proportion setup in the first place (e.g. mismatched units or quantities), producing a numerically "correct" but meaningless answer | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Mismatched Quantity Positions") → P41 (detect: present a mixed-position proportion setup and ask the student to solve without first checking positions) → P64 (conceptual shift: re-anchor on "before solving, always verify: is the same TYPE of quantity in matching positions across both ratios?" — walk through the corrected setup from Example 2's contrast).
- **B02 (targets MC-2)**: P27 (name it: "Any-Increasing-Relationship Assumed Proportional") → P41 (detect: present the flat-fee-taxi cost function and ask if cost is proportional to miles) → P64 (conceptual shift: re-derive by explicitly computing the ratio at two different values, showing it changes — proving non-proportionality directly rather than relying on visual/intuitive impressions of "growing together").
- **B03 (targets MC-3)**: P27 (name it: "Cross-Multiplication Without Valid Setup") → P41 (detect: give a proportion with a units/quantity mismatch and check whether the student cross-multiplies immediately without questioning the setup) → P64 (conceptual shift: re-anchor on "cross-multiplication is a valid ALGEBRAIC step only once the proportion itself correctly represents the intended relationship — garbage in, garbage out").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.ratios` (the ratio concept this entire equation-of-two-ratios definition builds on directly).
- **Unlocks**: `math.arith.direct-variation` (direct variation, $y=kx$, is exactly the genuinely-proportional relationship this concept's Example 3 contrasts against non-proportional cases), `math.arith.inverse-variation` (inverse variation, $xy=k$, is a related but structurally different proportional relationship building on the same ratio-constancy reasoning).
- **Cross-link**: KG lists `math.func.linear-function` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.func.linear-function.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's genuine-proportionality test directly to that concept's classification of $y=mx$ (proportional, passes through the origin) versus $y=mx+b$ with $b\neq0$ (linear but not proportional) — exactly the distinction Example 3 draws informally here.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a developing/apply tag places this at the "2 main TAs + gate" tier — A01 (cross-multiplication via the scale-model anchor) and A02 (correct quantity-matching setup, plus genuine-vs-superficial proportionality) jointly cover all three LOs, appropriate given the concept's real difficulty lies in correct problem SETUP (both quantity matching and genuine-proportionality recognition) rather than the cross-multiplication mechanics themselves, which are comparatively simple once a correct equation is established.
- MC-1 (quantity positions mismatched) and MC-3 (cross-multiplication applied without valid setup) are closely related — MC-1 is the specific, most common way MC-3's more general failure occurs — and were deliberately kept as SEPARATE registry entries (rather than merged) because MC-1 gives a specific, directly diagnosable error pattern (position-swapping) with a specific fix, while MC-3 captures the broader class of setup errors this specific pattern is the leading instance of.
- The taxi/photo-printing genuine-vs-non-proportional contrast (Example 3, echoed in the transfer probe's part (b)) was deliberately built around FLAT-FEE-PLUS-RATE structures specifically because they are the most common real-world source of "looks proportional but isn't" relationships students encounter (phone plans, delivery fees, printing costs), making the ratio-constancy test practically valuable beyond the immediate lesson.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.ratios`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.func.linear-function` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: scale model before cross-multiplication) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

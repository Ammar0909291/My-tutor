# Teaching Blueprint: Sample Correlation (`math.stats.correlation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.correlation` |
| name | Sample Correlation |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.measures-of-spread`, `math.prob.correlation` |
| unlocks | `math.stats.linear-regression` |
| cross_links | `math.prob.correlation` |
| CPA_entry_stage | P (Pictorial) — scatterplot patterns before the formula |
| description (KG) | r = ∑(xᵢ−x̄)(yᵢ−ȳ) / √[∑(xᵢ−x̄)²∑(yᵢ−ȳ)²] ∈ [−1,1]. Measures strength and direction of linear association. r²=coefficient of determination. Testing H₀:ρ=0 uses t-statistic with n−2 df.

 |

## Component 1 — Learning Objectives

- LO1: Compute the Pearson sample correlation $r=\frac{\sum(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum(x_i-\bar{x})^2\sum(y_i-\bar{y})^2}}$, and recognize $r\in[-1,1]$ ALWAYS — a computed value OUTSIDE this range signals an arithmetic ERROR, not a valid result.
- LO2: Interpret $r$'s SIGN (positive $=$ variables increase together; negative $=$ one increases as the other decreases) and MAGNITUDE (closer to $\pm1$ $=$ stronger LINEAR association; closer to 0 $=$ weaker linear association) — and recognize $r$ specifically measures LINEAR association, so a STRONG non-linear (e.g. curved) relationship can still produce an $r$ CLOSE TO ZERO, misleadingly suggesting "no relationship."
- LO3: Recognize $r^2$ (the coefficient of determination) as a DIFFERENT, related quantity from $r$ itself — and recognize that CORRELATION does NOT imply CAUSATION — a strong observed $r$ shows STATISTICAL association, never by itself evidence that one variable CAUSES changes in the other.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.measures-of-spread` (needed for the deviation terms in the formula) and `math.prob.correlation` (the theoretical population correlation this sample statistic estimates).

## Component 3 — Core Explanation

The **sample correlation coefficient** $r=\frac{\sum(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum(x_i-\bar{x})^2\sum(y_i-\bar{y})^2}}$ measures the STRENGTH and DIRECTION of the LINEAR association between two variables. By its mathematical construction, $r$ is ALWAYS constrained to $[-1,1]$ — a computed value outside this range (e.g. $r=1.3$) indicates a genuine ARITHMETIC ERROR in the calculation, never a valid, more-extreme-than-usual result.

The SIGN of $r$ indicates DIRECTION: positive means the variables tend to increase TOGETHER; negative means one tends to increase as the other DECREASES. The MAGNITUDE indicates STRENGTH: values close to $\pm1$ indicate a strong LINEAR relationship; values close to 0 indicate a weak (or no) linear relationship. Crucially, $r$ specifically captures LINEAR association — a genuinely STRONG but NON-LINEAR (e.g. perfectly curved, like a parabola) relationship can produce an $r$ value close to ZERO, misleadingly suggesting "no relationship" when a strong (just non-linear) pattern genuinely exists.

$r^2$ (the **coefficient of determination**) is a DIFFERENT, related quantity — it represents the PROPORTION of variance in one variable "explained" by the linear relationship with the other (a concept fully developed in `math.stats.linear-regression`). And critically, correlation NEVER implies causation on its own — a strong $r$ demonstrates a genuine STATISTICAL association, but NEVER by itself establishes that changes in one variable CAUSE changes in the other (a third, unmeasured "confounding" variable could drive both).

## Component 4 — Worked Examples

**Example 1 (LO1 — computed r must fall in [-1,1], breaking MC-1)**: A student computes $r=1.4$ for some dataset. Explain why this result signals an error. Since $r$ is mathematically GUARANTEED to lie in $[-1,1]$ (a direct consequence of the Cauchy-Schwarz-like structure of the formula), ANY computed value outside this range is IMPOSSIBLE for a genuinely correct calculation — it signals an ARITHMETIC MISTAKE somewhere in the computation (e.g. in the deviations, sums, or square root), and the calculation must be re-checked, NOT accepted as "a very strong result." A common error accepts an out-of-range computed value at face value (perhaps interpreting $r=1.4$ as "even stronger than perfect correlation"), rather than recognizing this as a clear signal of a computational error.

**Example 2 (LO2 — a strong non-linear relationship producing a near-zero r, breaking MC-2)**: For data following a PERFECT parabolic relationship $y=x^2$ over a SYMMETRIC range like $x\in\{-3,-2,-1,0,1,2,3\}$, explain why the computed $r$ would be approximately ZERO, despite the perfect (deterministic) underlying relationship. Since $r$ specifically measures LINEAR association, and $y=x^2$ is symmetric around $x=0$ (increasing for $x>0$, decreasing for $x<0$), there's NO overall linear trend across the full symmetric range — the positive and negative linear contributions largely CANCEL OUT, producing $r\approx0$ even though $x$ and $y$ are PERFECTLY (non-linearly) related. A common error interprets $r\approx0$ as conclusive evidence of "no relationship whatsoever" between the variables, without checking a SCATTERPLOT first to rule out a strong NON-LINEAR pattern that $r$ simply isn't designed to detect.

**Example 3 (LO3 — correlation vs. causation, breaking MC-3-merged)**: A study finds a strong positive correlation ($r=0.85$) between ice cream sales and drowning incidents across many months. Explain why this does NOT mean ice cream sales CAUSE drowning. Both variables are likely driven by a THIRD, confounding factor — HOT WEATHER (more ice cream is sold in summer, and more people swim, hence more drowning risk, in summer) — the strong correlation reflects this shared underlying cause, not a direct causal link between ice cream and drowning. A common error interprets ANY strong correlation as automatic evidence of a direct causal relationship between the two measured variables, without considering the possibility of confounding variables or other explanations (like reverse causation or pure coincidence).

## Component 5 — Teaching Actions

### Teaching Action A01 — A Computed r Outside [-1,1] Signals a Calculation Error (Primitive P64: Conceptual Shift)

Work Example 1, explicitly using the impossible-value observation as an error-detection tool.

- **MC-1 hook**: this directly targets MC-1 (accepting an out-of-range computed value rather than recognizing it as an error signal).

### Teaching Action A02 — r Measures Linear Association Only; Check a Scatterplot for Non-Linear Patterns (Primitive P06: Contrast Pair)

Work Example 2, explicitly demonstrating how a perfect non-linear relationship can still produce $r\approx0$.

- **MC-2 hook**: this directly targets MC-2 (interpreting a near-zero $r$ as conclusive evidence of no relationship, without checking for non-linear patterns).

### Teaching Action A03 — Correlation Does Not Imply Causation (reused procedure)

Present Example 3, explicitly identifying the confounding-variable explanation.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. A student computes $r=-1.2$ for a dataset. Explain what this indicates and what should be done.
  2. Explain why a strong sinusoidal (wave-like) relationship between two variables could produce a computed $r$ close to zero.
  3. Explain the difference between correlation and causation, using an example other than ice cream and drowning.
  4. For $r=0.7$, describe the strength and direction of the linear association.
- **P76 (Transfer Probe, mode = independence)**: "A researcher finds a strong positive correlation ($r=0.78$) between the number of firefighters dispatched to a fire and the amount of damage the fire causes, and a journalist writes a headline suggesting 'sending more firefighters causes more fire damage.' (a) Explain why this causal interpretation is almost certainly wrong, identifying the likely confounding variable. (b) Explain what additional evidence (beyond a single correlation coefficient) would be needed before making any causal claim."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | OUT-OF-RANGE-COMPUTED-R-ACCEPTED-RATHER-THAN-RECOGNIZED-AS-AN-ERROR | Accepting a computed correlation value outside [-1,1] at face value, rather than recognizing it as a clear signal of a computational error | Foundational |
| MC-2 | NEAR-ZERO-R-INTERPRETED-AS-NO-RELATIONSHIP-WITHOUT-CHECKING-FOR-NON-LINEAR-PATTERNS | Interpreting a correlation coefficient close to zero as evidence of no relationship at all, without checking a scatterplot for a strong non-linear pattern that r cannot detect | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Out-of-Range Computed R Accepted Rather Than Recognized as an Error") → P41 (detect: present Example 1 and check whether the out-of-range value is (incorrectly) accepted) → P64 (conceptual shift: re-state the $[-1,1]$ guarantee explicitly and re-check the calculation for arithmetic errors).
- **B02 (targets MC-2)**: P27 ("Near-Zero R Interpreted as No Relationship Without Checking for Non-Linear Patterns") → P41 (detect: present Example 2 and check whether "no relationship" is (incorrectly) concluded from $r\approx0$ alone) → P64 (conceptual shift: re-examine a scatterplot of the data, checking for a strong non-linear pattern before concluding "no relationship").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.measures-of-spread`, `math.prob.correlation`.
- **Unlocks**: `math.stats.linear-regression`.
- **Cross-links**: `math.prob.correlation` (the theoretical population quantity this sample statistic estimates).

## Component 8 — Teaching Notes

- estimated_hours = 4 and mastery_threshold = 0.85 reflect the genuine importance of both correctly computing and correctly INTERPRETING correlation, which is easy to over-interpret.
- Both misconceptions were ranked Foundational because each leads to a genuinely wrong conclusion — either failing to catch a computational error, or drawing an unjustified "no relationship" conclusion.
- The firefighters-and-fire-damage transfer probe was deliberately chosen as a classic, memorable illustration of confounding (more firefighters are sent to BIGGER fires, which independently cause more damage), reinforcing the correlation-is-not-causation principle vividly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.measures-of-spread`, `math.prob.correlation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.stats.linear-regression`) |
| V-5 | cross_links checked against disk | PASS (`math.prob.correlation`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: scatterplot patterns before the formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

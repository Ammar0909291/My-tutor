# Teaching Blueprint: Curve Sketching (`math.calc.curve-sketching`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.curve-sketching` |
| name | Curve Sketching |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.concavity`, `math.calc.local-extrema`, `math.calc.limits-at-infinity` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — build the graph incrementally from each piece of information |
| description (KG) | Systematic method to sketch y = f(x) using domain, intercepts, symmetry, asymptotes, increasing/decreasing intervals, and concavity. |

## Component 1 — Learning Objectives

- LO1: Follow the SYSTEMATIC curve-sketching procedure in order — domain, intercepts, symmetry, asymptotes (using `math.calc.limits-at-infinity`), increasing/decreasing intervals (via $f'$), local extrema (via `math.calc.local-extrema`), and concavity/inflection points (via `math.calc.concavity`) — before drawing the final sketch.
- LO2: Correctly synthesize the FIRST-derivative information (increasing/decreasing, local max/min) and SECOND-derivative information (concave up/down, inflection points) into ONE coherent sketch, rather than treating them as separate, unconnected facts.
- LO3: Recognize that skipping ANY step of the systematic procedure (e.g. omitting asymptote analysis) risks producing a GEOMETRICALLY INCORRECT sketch, even if the remaining analysis is done correctly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.concavity` (second-derivative behavior), `math.calc.local-extrema` (first-derivative critical points), and `math.calc.limits-at-infinity` (end behavior and asymptotes) — curve sketching synthesizes all three.

## Component 3 — Core Explanation

**Curve sketching** is a SYSTEMATIC procedure for graphing $y=f(x)$ by hand, using calculus to determine the curve's exact shape rather than guessing or plotting isolated points. The standard order: (1) DOMAIN (where $f$ is defined); (2) INTERCEPTS ($x$- and $y$-intercepts); (3) SYMMETRY (even/odd/periodic, if any); (4) ASYMPTOTES (vertical, from discontinuities; horizontal/oblique, from `math.calc.limits-at-infinity`); (5) INCREASING/DECREASING intervals (sign of $f'$); (6) LOCAL EXTREMA (from `math.calc.local-extrema`, using $f'$'s sign changes or the second derivative test); (7) CONCAVITY and INFLECTION POINTS (from `math.calc.concavity`, using $f''$'s sign).

The power of this method comes from SYNTHESIZING all this information into ONE picture: the first derivative tells you where the curve rises/falls and where its local peaks/valleys are; the second derivative tells you where it curves upward (like a cup) versus downward (like a cap), and where that curving changes (inflection points). A complete, geometrically accurate sketch requires combining BOTH pieces of information consistently — e.g. a local maximum must occur where the curve is concave DOWN nearby (consistent with the peak shape), not concave up.

Skipping any step (most commonly, asymptotes) risks a sketch that's locally correct near critical points but globally WRONG in overall shape.

## Component 4 — Worked Examples

**Example 1 (LO1 — following the full procedure, breaking MC-1)**: Sketch $f(x)=\frac{x^2}{x^2-1}$. Domain: all $x\ne\pm1$. Intercepts: $(0,0)$. Symmetry: even ($f(-x)=f(x)$). Asymptotes: vertical at $x=\pm1$ (denominator zero, numerator nonzero there); horizontal $y=1$ (from $\lim_{x\to\pm\infty}f(x)=1$). Increasing/decreasing and extrema and concavity follow from $f'$ and $f''$. A common error jumps STRAIGHT to computing $f'$ and finding critical points, SKIPPING the domain/asymptote analysis entirely — this risks drawing a sketch that looks fine locally near critical points but is geometrically WRONG overall, since it misses the vertical asymptotes at $x=\pm1$ that fundamentally shape the graph's global structure.

**Example 2 (LO2 — synthesizing first and second derivative information)**: For a function with a local maximum at $x=2$ (from $f'$ changing from positive to negative there) and $f''(2)<0$ (concave down at $x=2$), confirm these are CONSISTENT — a local max naturally sits atop a concave-down "cap" shape, and both pieces of evidence AGREE, giving confidence in the sketch's correctness at that point.

**Example 3 (LO3 — the cost of skipping a step, breaking MC-2)**: For $f(x)=\frac{1}{x}$, a student who skips the asymptote-analysis step and only examines increasing/decreasing behavior might sketch a single continuous decreasing curve passing smoothly through $x=0$ — but $f$ actually has a VERTICAL asymptote at $x=0$ (the function is undefined there, with $\lim_{x\to0^-}f(x)=-\infty$ and $\lim_{x\to0^+}f(x)=+\infty$), meaning the TRUE graph consists of two SEPARATE branches, never connecting. A common error treats "the function is decreasing everywhere in its domain" as license to draw ONE continuous decreasing curve, without checking whether the domain itself has a GAP (from an excluded point or vertical asymptote) that should split the sketch into disconnected pieces.

## Component 5 — Teaching Actions

### Teaching Action A01 — Follow the Systematic Procedure in Order, Every Time (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly walking through every step of the procedure in sequence before sketching.

- **MC-1 hook**: check whether earlier procedural steps (domain, asymptotes) are completed before jumping to derivative analysis.

### Teaching Action A02 — First and Second Derivative Evidence Must Agree (Primitive P11: Representation Shift)

Work Example 2, explicitly cross-checking the first-derivative-based extrema against the second-derivative-based concavity at the same point.

### Teaching Action A03 — Domain Gaps and Asymptotes Split the Sketch into Separate Branches (Primitive P06: Contrast Pair)

Work Example 3, contrasting the (incorrect) single continuous curve against the correct two-branch sketch.

- **MC-2 hook**: this directly targets MC-2 (drawing a single continuous curve despite a domain gap or vertical asymptote).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. List, in order, the seven steps of the systematic curve-sketching procedure.
  2. For $f(x)=x^3-3x$, find the domain, intercepts, increasing/decreasing intervals, local extrema, and concavity, then describe the resulting sketch.
  3. Explain why a local maximum should always occur where the function is (locally) concave down, connecting the first and second derivative tests.
  4. For $f(x)=\frac{1}{x-2}$, explain why the sketch must consist of two separate, disconnected branches.
- **P76 (Transfer Probe, mode = independence)**: "A company's profit function $P(x)$ (profit as a function of units sold $x$) has a vertical asymptote at $x=0$ (fixed costs make very low production catastrophically unprofitable per-unit), a local maximum somewhere in the middle range, and approaches a fixed horizontal asymptote as $x\to\infty$ (diminishing returns at very high volumes). (a) Using the systematic curve-sketching procedure, describe what each of these three features (vertical asymptote, local max, horizontal asymptote) tells a business decision-maker about the profit function's real-world behavior. (b) Explain why skipping the asymptote analysis and focusing only on the local maximum could lead to a dangerously incomplete understanding of the profit function's true behavior at very low or very high production volumes."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DOMAIN-AND-ASYMPTOTE-STEPS-SKIPPED-IN-FAVOR-OF-DIRECT-DERIVATIVE-ANALYSIS | Jumping directly to derivative-based analysis without first completing the domain/intercept/asymptote steps, risking a globally incorrect sketch | Foundational |
| MC-2 | DOMAIN-GAPS-IGNORED-WHEN-DRAWING-A-SINGLE-CONTINUOUS-CURVE | Drawing a single continuous curve across a domain gap or vertical asymptote, rather than correctly splitting the sketch into separate branches | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Domain and Asymptote Steps Skipped in Favor of Direct Derivative Analysis") → P41 (detect: present Example 1 and check whether the domain/asymptote steps were completed) → P64 (conceptual shift: re-work the problem following the full seven-step procedure in strict order).
- **B02 (targets MC-2)**: P27 ("Domain Gaps Ignored When Drawing a Single Continuous Curve") → P41 (detect: present Example 3 and check whether the sketch incorrectly connects across the domain gap) → P64 (conceptual shift: re-examine the domain explicitly, identifying the excluded point and the one-sided limit behavior on each side).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.concavity`, `math.calc.local-extrema`, `math.calc.limits-at-infinity`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 8 (among the highest in the domain) reflects that this concept is a genuine SYNTHESIS of nearly the entire single-variable calculus toolkit into one procedural skill.
- Both misconceptions were ranked Foundational because each produces a sketch that is geometrically WRONG in an important, easily-overlooked way, despite correct execution of the individual pieces that WERE performed.
- The business-profit transfer probe was deliberately chosen because each curve feature (vertical asymptote, local max, horizontal asymptote) maps onto a genuinely important real-world business insight, motivating why the FULL systematic procedure (not just the "interesting" local max) matters practically.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.concavity`, `math.calc.local-extrema`, `math.calc.limits-at-infinity`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: build the graph incrementally) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

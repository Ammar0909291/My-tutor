# Teaching Blueprint: Simple Function (`math.meas.simple-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.meas.simple-function` |
| name | Simple Function |
| domain | Measure Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.meas.measurable-function` |
| unlocks | `math.meas.lebesgue-integral` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a step-shaped function taking only a few distinct values, before the general indicator-sum definition |
| description (KG) | φ = ∑aᵢ1_{Eᵢ} (finite linear combination of indicator functions). ∫φ dμ = ∑aᵢμ(Eᵢ). Every non-negative measurable function is the limit of an increasing sequence of simple functions (monotone approximation). |

## Component 1 — Learning Objectives

- LO1: Define a **simple function** $\varphi = \sum_{i=1}^n a_i\mathbb{1}_{E_i}$ — a FINITE linear combination of indicator functions of measurable sets $E_i$ — and verify a given function is simple by identifying its finite range of values and the corresponding measurable "level sets" where each value is attained.
- LO2: Compute the integral of a simple function DIRECTLY as the finite sum $\int\varphi\,d\mu = \sum_i a_i\mu(E_i)$ — no limiting process required — and correctly refuting the misconception that integrating even a simple function requires the full machinery of a limit, when in fact the finite-sum formula is exact and immediate.
- LO3: State the **monotone approximation** theorem (every non-negative measurable function is the limit of an increasing sequence of simple functions) at a level sufficient to construct a SPECIFIC approximating sequence for a given function, recognizing simple functions as the essential building blocks the general Lebesgue integral is built from.

## Component 2 — Prerequisite Check

Assumes mastery of `math.meas.measurable-function` (a function is measurable iff preimages of measurable sets are measurable, and the Borel-measurability test via open sets).

## Component 3 — Core Explanation

**A simple function, defined as a finite indicator-function combination**: a **simple function** $\varphi$ on a measure space $(X,\mathcal{F},\mu)$ is a function of the form $\varphi(x) = \sum_{i=1}^n a_i\mathbb{1}_{E_i}(x)$, where $a_1,\dots,a_n$ are (real) constants, $E_1,\dots,E_n\in\mathcal{F}$ are MEASURABLE sets, and $\mathbb{1}_{E_i}(x)$ is the indicator function ($1$ if $x\in E_i$, $0$ otherwise). Equivalently, $\varphi$ takes only FINITELY many distinct values, each attained on a measurable set (the "level set" for that value).

**Integrating a simple function — a finite sum, no limit needed**: because $\varphi$ takes only finitely many values, its integral is defined DIRECTLY as $\int\varphi\,d\mu = \sum_i a_i\mu(E_i)$ — literally: for each value $a_i$ the function takes, multiply by the measure (size) of the set where it takes that value, and sum. This is a genuinely FINITE computation, exact and immediate — no limiting process, no approximation, unlike the general Lebesgue integral (which IS built as a limit, but of exactly these simple-function integrals).

**Monotone approximation — simple functions as the building blocks of the general integral**: the reason simple functions matter so much is the **monotone approximation theorem**: every non-negative MEASURABLE function $f$ (however complicated) can be written as the limit of an increasing sequence of simple functions $\varphi_1\le\varphi_2\le\cdots\to f$. This is the bridge from the easy, finite-sum simple-function integral to the general Lebesgue integral: $\int f\,d\mu$ is DEFINED as the limit (or supremum) of $\int\varphi_n\,d\mu$ as $n\to\infty$ — everything more sophisticated in Lebesgue integration theory ultimately reduces to this finite-sum computation, applied to an increasingly refined sequence of simple functions.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying a function is simple, identifying its level sets)**: Let $\varphi:[0,4]\to\mathbb{R}$ be defined by $\varphi(x)=2$ for $x\in[0,1)$, $\varphi(x)=5$ for $x\in[1,3)$, $\varphi(x)=0$ for $x\in[3,4]$. This IS a simple function: it takes exactly 3 distinct values ($2,5,0$), each on a measurable set ($[0,1)$, $[1,3)$, $[3,4]$ respectively — writing $\varphi = 2\cdot\mathbb{1}_{[0,1)}+5\cdot\mathbb{1}_{[1,3)}+0\cdot\mathbb{1}_{[3,4]}$ matches the definition exactly.

**Example 2 (LO2 — computing the integral directly, no limit)**: For Example 1's $\varphi$, using Lebesgue measure ($\mu(E)$ = ordinary length for an interval): $\int\varphi\,d\mu = 2\cdot\mu([0,1)) + 5\cdot\mu([1,3)) + 0\cdot\mu([3,4]) = 2(1)+5(2)+0(1) = 2+10+0=12$ — a direct, finite computation. This matches the intuitive "area under the step function" picture exactly, computed with no limiting process whatsoever, in sharp contrast to how a general (non-simple) function's integral would need to be approached.

**Example 3 (LO3 — a concrete increasing approximating sequence, breaking MC-1)**: Approximate $f(x)=x^2$ on $[0,1]$ (a non-negative measurable, but NOT simple, function) via simple functions. Define $\varphi_n$ by partitioning $[0,1]$ into $n$ equal pieces and setting $\varphi_n(x)$ equal to the SMALLEST value $f$ takes on each piece (the infimum on that sub-interval) — e.g. for $n=2$: $\varphi_2(x)=0$ on $[0,0.5)$ (since $f$'s minimum there is $f(0)=0$) and $\varphi_2(x)=0.25$ on $[0.5,1]$ (since $f$'s minimum there is $f(0.5)=0.25$). As $n$ increases, the partition refines, and $\varphi_n$ increases pointwise toward $f(x)=x^2$ everywhere (each $\varphi_n\le\varphi_{n+1}\le f$, with the approximation improving as the partition gets finer) — a CONCRETE instance of the monotone approximation theorem, illustrating explicitly how an ordinary continuous function is built up as a limit of increasingly fine simple functions, rather than the theorem being an abstract, unconstructed existence claim.

## Component 5 — Teaching Actions

### Teaching Action A01 — Simple Functions as Finite Combinations of Indicators (Primitive P11: Representation Shift)

Draw the step function from Example 1, marking the three horizontal segments and their heights. State: "a simple function is exactly this — a finite number of distinct 'flat levels,' each sitting over a measurable set." Work Example 1's direct verification, writing $\varphi$ in indicator-sum form.

### Teaching Action A02 — Integrating a Simple Function Is Just a Finite Sum (Primitive P11: Representation Shift)

State: "no limit needed here — multiply each value by the size (measure) of where it's attained, and add." Work Example 2's direct computation, connecting explicitly to the "area under a step function" intuition already familiar from elementary integration.

- **MC-1 hook**: ask "does integrating even a simple function require a limiting process, like the general Lebesgue integral does?" — a "yes" answer reveals MC-1 (over-generalizing the limit-based machinery of the general integral to the simple-function case, missing that the finite-sum formula is exact and immediate).

### Teaching Action A03 — Monotone Approximation, Made Concrete (Primitive P11: Representation Shift)

Work Example 3's explicit construction of $\varphi_n$ for $f(x)=x^2$, showing the partition refining and the approximation visibly tightening. State: "this is the bridge connecting simple functions (easy, finite sums) to the general Lebesgue integral (any measurable function) — build a specific increasing sequence of simple functions converging to $f$, then define $\int f$ as the limit of the already-known simple-function integrals."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that $\psi(x) = 3$ for $x\in[0,2)$, $\psi(x)=-1$ for $x\in[2,5]$ is a simple function, writing it explicitly in indicator-sum form.
  2. Compute $\int\psi\,d\mu$ for the function in problem 1, using Lebesgue measure.
  3. Construct the simple function $\varphi_3$ (using 3 equal sub-intervals) approximating $f(x)=x$ on $[0,3]$ from below (using the infimum on each sub-interval), and compute $\int\varphi_3\,d\mu$.
  4. Explain, in your own words, why the general Lebesgue integral is DEFINED in terms of simple-function integrals (via the monotone approximation theorem), rather than being defined some other way from scratch.
- **P76 (Transfer Probe, mode = independence)**: "A data analyst represents a histogram of measured data — a step function taking a few distinct 'bucket heights' over disjoint intervals of the measurement range — and wants to compute its total 'area' (analogous to a probability mass or total count, depending on context). (a) Explain why this histogram is precisely a simple function in the sense of this lesson. (b) Compute (in general symbolic terms, using bucket heights $a_i$ and bucket widths $\mu(E_i)$) the formula for this histogram's total area, connecting it directly to this lesson's integral formula. (c) If the analyst instead had continuous, smoothly-varying data (not naturally step-shaped), explain how the monotone approximation idea from Example 3 would let them still compute a meaningful 'total area' by approximating the smooth data with increasingly fine step functions."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SIMPLE-FUNCTION-INTEGRAL-ASSUMED-TO-NEED-A-LIMIT | Believing integrating a simple function requires a limiting process like the general Lebesgue integral, missing that the finite-sum formula is exact and immediate | Foundational |
| MC-2 | SIMPLE-FUNCTION-VALUES-OR-LEVEL-SETS-MISIDENTIFIED | Incorrectly identifying the distinct values a simple function takes, or misidentifying the measurable set where each value is attained (e.g. using the wrong interval boundaries) | Foundational |
| MC-3 | MONOTONE-APPROXIMATION-TREATED-AS-PURELY-ABSTRACT | Accepting the monotone approximation theorem as an abstract existence claim without being able to construct or reason about a specific approximating sequence for a given function | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Simple-Function-Integral-Needs-a-Limit Assumption") → P41 (detect: ask a student to compute a simple function's integral and check whether they attempt a limiting/partition-refinement process rather than the direct finite sum) → P64 (conceptual shift: re-walk Example 2's direct, one-step computation, re-anchoring on "simple functions are EASY precisely because they need no limit — that's what makes them the right building block for defining harder integrals").
- **B02 (targets MC-2)**: P27 (name it: "Simple-Function Values/Level-Sets Misidentified") → P41 (detect: ask a student to write Example 1's $\varphi$ in indicator-sum form and check whether they correctly match each value to its exact interval) → P64 (conceptual shift: re-walk Example 1's explicit value-by-value, interval-by-interval identification, re-anchoring on "read the function's graph carefully — each flat segment is one term in the sum").
- **B03 (targets MC-3)**: P27 (name it: "Monotone Approximation Treated as Abstract") → P41 (detect: ask a student to construct a specific approximating simple function for a given non-negative function, and check whether they can only recite the theorem's existence claim without producing an actual sequence) → P64 (conceptual shift: re-walk Example 3's explicit partition-and-infimum construction, re-anchoring on "the theorem isn't just an abstract guarantee — you CAN build the sequence yourself, by partitioning finer and finer and taking the minimum value on each piece").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.meas.measurable-function` (the measurability condition each level set $E_i$ in a simple function's definition must satisfy).
- **Unlocks**: `math.meas.lebesgue-integral` (defined directly via the monotone approximation of a general measurable function by simple functions, whose integrals this concept establishes as easy, exact finite sums).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the definition), A02 (the finite-sum integral), and A03 (monotone approximation, made concrete) each target a distinct LO, appropriate for a compact but foundational concept whose entire content is preparing the building blocks for the Lebesgue integral.
- Example 3's approximating-sequence construction was deliberately made fully explicit and computational (not merely asserted), specifically because this corpus's general practice favors verified, constructive demonstrations over abstract existence claims — and because MC-3 (treating monotone approximation as purely abstract) is a natural failure mode when a genuinely constructive alternative isn't shown.
- The histogram framing in the transfer probe was chosen because it is the most immediately recognizable real-world instance of a simple function for most learners, directly connecting the abstract indicator-sum definition to an everyday object (a bar chart / step function) without requiring any new vocabulary.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a step-shaped function with few distinct values before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

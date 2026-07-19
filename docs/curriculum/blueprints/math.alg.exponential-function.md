# Teaching Blueprint: Exponential Function (`math.alg.exponential-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.exponential-function` |
| name | Exponential Function |
| domain | Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.alg.exponent-rules`, `math.func.function-concept` |
| unlocks | `math.alg.logarithm` |
| cross_links | `math.func.exponential-function` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — population-doubling story before the formal function |
| description (KG) | A function of the form f(x) = aˣ with base a > 0, a ≠ 1; exhibits exponential growth (a > 1) or decay (a < 1) and is the inverse of the logarithm. |

## Component 1 — Learning Objectives

- LO1: Define the **exponential function** $f(x)=a^x$ with base $a>0, a\neq1$, evaluate it at both integer and non-integer (rational, using already-known rational exponent rules) values of $x$, and correctly explain WHY the base restrictions ($a>0$, $a\neq1$) are necessary.
- LO2: Distinguish **exponential growth** ($a>1$, function increasing) from **exponential decay** ($0<a<1$, function decreasing), correctly identifying which regime a given base falls into, and sketch/describe the graph's key features (always positive, horizontal asymptote at $y=0$, $y$-intercept at $(0,1)$) for both cases.
- LO3: Correctly distinguish an exponential function $a^x$ (variable in the EXPONENT) from a power function $x^a$ (variable in the BASE) — two structurally different functions that are easy to conflate given their superficially similar notation, with genuinely different growth behaviors.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponent-rules` (integer, zero, negative, and rational exponent laws) and `math.func.function-concept` (the general domain/codomain/rule structure of a function).

## Component 3 — Core Explanation

The **exponential function** is $f(x)=a^x$ for a fixed **base** $a>0, a\neq1$, with $x$ ranging over all real numbers.

**Why the base restrictions**: $a>0$ is required because $a^x$ for non-integer $x$ (e.g. $a^{1/2}=\sqrt a$) requires a nonnegative base to stay real-valued (a negative base raised to a fractional power can produce non-real results, or ambiguous/inconsistent values depending on how the fraction is expressed). $a\neq1$ is required because $1^x=1$ for every $x$ — a constant function, not exhibiting the interesting growth/decay behavior the exponential function is defined to capture; excluding $a=1$ avoids this degenerate, uninteresting case.

**Growth vs. decay**:
- If $a>1$: $f(x)=a^x$ is **increasing** (exponential GROWTH) — as $x$ increases, $f(x)$ grows without bound; as $x\to-\infty$, $f(x)\to0^+$.
- If $0<a<1$: $f(x)=a^x$ is **decreasing** (exponential DECAY) — as $x$ increases, $f(x)\to0^+$; as $x\to-\infty$, $f(x)$ grows without bound.
Both cases share key features: $f(x)>0$ for every $x$ (never zero, never negative), a horizontal asymptote at $y=0$, and $f(0)=a^0=1$ always (the $y$-intercept is always $(0,1)$, regardless of the specific base).

**Exponential function vs. power function — a critical structural distinction**: $a^x$ (exponential, variable in the EXPONENT, fixed base) is a fundamentally DIFFERENT kind of function from $x^a$ (power function, variable in the BASE, fixed exponent) — despite both notations involving "a number to a power," their growth behaviors, domains, and graphs differ substantially (e.g. $2^x$ is defined for all real $x$ and grows without any polynomial bound eventually overtaking any fixed power $x^a$; $x^2$ is a completely different, parabola-shaped function).

## Component 4 — Worked Examples

**Example 1 (LO1 — evaluating at various x, including non-integer)**: For $f(x)=3^x$: $f(2)=9$, $f(0)=1$, $f(-1)=\frac13$, $f\left(\frac12\right)=3^{1/2}=\sqrt3\approx1.73$ (using the rational-exponent rule $a^{1/2}=\sqrt a$, already known).

**Example 2 (LO2 — growth vs. decay, contrasting graphs)**: $g(x)=2^x$ (base $2>1$, growth): $g(-2)=\frac14$, $g(0)=1$, $g(2)=4$ — increasing, approaching 0 as $x\to-\infty$. $h(x)=\left(\frac12\right)^x$ (base $\frac12<1$, decay): $h(-2)=4$, $h(0)=1$, $h(2)=\frac14$ — decreasing, approaching 0 as $x\to+\infty$ instead. Note $h(x)=\left(\frac12\right)^x = 2^{-x}=g(-x)$ — decay is literally growth reflected across the $y$-axis.

**Example 3 (LO3 — exponential vs. power function, breaking MC-1)**: Compare $f(x)=2^x$ (exponential) and $g(x)=x^2$ (power function) at several values: $f(3)=8$, $g(3)=9$ — close, but NOT structurally related. At $x=10$: $f(10)=1024$, $g(10)=100$ — now the exponential function is dramatically larger. At $x=0$: $f(0)=1$ (nonzero!), $g(0)=0$. At $x=-2$: $f(-2)=\frac14$ (positive), $g(-2)=4$ (also positive, but for a completely different reason — squaring a negative, not exponentiating). These functions are genuinely different objects, despite the superficial "2 and a power" resemblance in their notation — one has the variable in the exponent (grows explosively, always positive, never zero), the other has the variable in the base (a parabola, can be zero, symmetric about the $y$-axis for even powers).

## Component 5 — Teaching Actions

### Teaching Action A01 — Evaluating the Exponential Function, and the Base Restrictions (Primitive P11: Representation Shift)

Start concrete: describe a population doubling every year, starting from 1: after $x$ years, population $=2^x$. Work Example 1's evaluation at several values, including a rational exponent, reinforcing the already-known exponent rules in this new functional context.

State the base restrictions explicitly and WHY: "$a\neq1$ because $1^x$ never changes — no growth or decay to study; $a>0$ because negative bases raised to fractional powers cause real-number problems (e.g. $(-4)^{1/2}=\sqrt{-4}$ isn't real)."

- **MC-1 hook**: ask "is $2^x$ the same TYPE of function as $x^2$, since both involve '2' and a power?" — a "yes" answer reveals MC-1 (conflating the exponential function with a power function based on superficial notational similarity, rather than recognizing the fundamentally different roles the variable plays in each).

### Teaching Action A02 — Growth vs. Decay, and Exponential vs. Power Function (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2's growth-vs-decay comparison side by side, showing the reflection relationship ($h(x)=g(-x)$) and the shared features (always positive, $y$-intercept at 1, horizontal asymptote at 0) alongside the genuinely different long-term behavior (blows up vs. decays to 0).

**Contrast 2 (targets MC-1)**: Work Example 3's exponential-vs-power comparison across several $x$-values, explicitly highlighting the divergence at $x=10$ (1024 vs. 100) and the qualitative differences at $x=0$ and $x=-2$. State the rule precisely: "check WHERE the variable sits — in the exponent ($a^x$, exponential) or in the base ($x^a$, power function) — this single structural difference produces dramatically different graphs and growth rates, never assume similarity from notation alone."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=5^x$, compute $f(-2)$, $f(0)$, and $f\left(\frac13\right)$ (leave the last in radical form if not a whole number).
  2. Classify $g(x)=\left(\frac34\right)^x$ as exponential growth or decay, and state the $y$-intercept and horizontal asymptote.
  3. Compare $f(x)=3^x$ and $g(x)=x^3$ at $x=2$, $x=0$, and $x=-1$, noting where their values agree, disagree, or diverge substantially.
  4. Explain why $a=1$ is excluded from the exponential function's base, using a specific example to illustrate what would go wrong (or rather, what would be uninteresting) if it were allowed.
- **P76 (Transfer Probe, mode = independence)**: "A radioactive substance decays according to $A(t) = A_0(0.5)^{t/h}$ where $h$ is the half-life and $A_0$ is the initial amount. Separately, an investment grows according to $V(t)=V_0(1.05)^t$ (5% annual growth). (a) Identify which of these two models is exponential DECAY and which is exponential GROWTH, justifying using the base's relationship to 1. (b) A financial analyst mistakenly models the investment's growth using $V(t)=V_0\cdot t^{1.05}$ instead (a power function, variable in the base) — using this lesson's exponential-vs-power distinction, explain why this would give a dramatically different (and incorrect) long-term prediction compared to the correct exponential model, especially for large $t$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXPONENTIAL-CONFLATED-WITH-POWER-FUNCTION | Believing $a^x$ (exponential, variable in exponent) and $x^a$ (power function, variable in base) are the same type of function due to superficial notational similarity | Foundational |
| MC-2 | BASE-RESTRICTIONS-TREATED-AS-ARBITRARY | Treating the $a>0, a\neq1$ base restrictions as arbitrary rules to memorize, rather than understanding the specific mathematical reasons (real-valuedness; avoiding the degenerate constant case) behind each | Moderate |
| MC-3 | Y-INTERCEPT-ASSUMED-TO-VARY-BY-BASE | Believing the exponential function's $y$-intercept depends on the specific base $a$, rather than recognizing $f(0)=a^0=1$ always, for EVERY valid base | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Exponential/Power Function Conflation") → P41 (detect: ask whether $2^x$ and $x^2$ are the same type of function) → P64 (conceptual shift: work through Example 3's explicit multi-point comparison, showing genuinely divergent values and behaviors).
- **B02 (targets MC-2)**: P27 (name it: "Base Restrictions as Arbitrary Rules") → P41 (detect: ask a student to explain WHY $a\neq1$ and $a>0$, checking for genuine reasoning versus rote recall) → P64 (conceptual shift: re-derive each restriction's specific reason — $1^x$'s constancy; negative bases' fractional-power real-valuedness problems).
- **B03 (targets MC-3)**: P27 (name it: "Y-Intercept Assumed Base-Dependent") → P41 (detect: ask for the $y$-intercept of $f(x)=7^x$ without computing, checking if the student assumes it depends on the base 7 specifically) → P64 (conceptual shift: re-derive directly — $f(0)=7^0=1$, and $a^0=1$ for ANY valid base $a$, by the zero-exponent rule already known).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponent-rules` (integer/zero/negative/rational exponent laws, needed to evaluate the function at any real input), `math.func.function-concept` (the general function structure this concept instantiates).
- **Unlocks**: `math.alg.logarithm` (the logarithm is defined directly as the exponential function's inverse).
- **Cross-link**: KG lists `math.func.exponential-function` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.func.exponential-function.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's growth/decay classification directly to that concept's likely broader treatment of exponential functions within general function theory (transformations, composition with other function types, etc.).

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/understand tag places this at the "2 main TAs + gate" tier — A01 (evaluating the function and the base restrictions) and A02 (growth/decay contrast plus the critical exponential-vs-power-function distinction) jointly cover all three LOs.
- MC-1 (exponential conflated with power function) was made this blueprint's central focus and given the most extensive treatment (both A01's hook and the entirety of A02 Contrast 2) because it represents one of the most consequential and persistent confusions in algebra — the notational similarity between $a^x$ and $x^a$ masks a fundamental structural difference with major real-world consequences (as dramatized in the transfer probe's financial-modeling scenario, where using the wrong function type produces dramatically wrong long-term predictions).
- The radioactive-decay/investment-growth transfer probe was chosen because these are the two most standard, immediately recognizable real-world instances of exponential decay and growth respectively, and part (b)'s deliberate exponential-vs-power mix-up gives MC-1's correction genuine practical consequence beyond an abstract classroom distinction.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.func.exponential-function` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: population-doubling story before formal function) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

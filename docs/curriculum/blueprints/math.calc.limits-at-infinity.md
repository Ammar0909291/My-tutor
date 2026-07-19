# Teaching Blueprint: Limits at Infinity (`math.calc.limits-at-infinity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.limits-at-infinity` |
| name | Limits at Infinity |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.limits` |
| unlocks | `math.func.horizontal-asymptote` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a graph flattening out toward a horizontal line as x extends rightward, before the symbolic definition |
| description (KG) | lim_{x→∞} f(x) = L means f(x) → L as x grows without bound; determines horizontal asymptotes of rational and other functions. |

## Component 1 — Learning Objectives

- LO1: Interpret $\lim_{x\to\infty}f(x)=L$ as meaning $f(x)$ gets and stays arbitrarily close to $L$ as $x$ grows without bound (and similarly for $x\to-\infty$) — directly distinguishing this from an ordinary limit $\lim_{x\to a}f(x)$, where $x$ approaches a specific finite value.
- LO2: Compute limits at infinity for rational functions by dividing numerator and denominator by the highest power of $x$ present in the denominator, then applying the fact that $1/x^n\to0$ as $x\to\infty$ — directly refuting the misconception that a limit at infinity is evaluated by "plugging in" infinity as if it were an ordinary number.
- LO3: Distinguish a limit at infinity ($x\to\infty$, describing END behavior as $x$ grows) from an infinite limit ($f(x)\to\infty$ as $x\to a$, describing a vertical asymptote at a FINITE point $a$) — two entirely different phenomena that are easily conflated because both involve the symbol $\infty$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.limits` (the ε-δ definition of $\lim_{x\to a}f(x)=L$, and the core idea that a limit describes approach, not the function's actual value at the point).

## Component 3 — Core Explanation

**The definition, extending "approach" to unbounded growth**: $\lim_{x\to\infty}f(x)=L$ means that as $x$ grows without bound (takes larger and larger values, with no upper limit), $f(x)$ gets arbitrarily close to $L$ and stays close. This directly generalizes `math.calc.limits`'s core idea of "approach" — instead of $x$ approaching a specific finite point $a$, $x$ now "approaches" infinity itself (grows without bound), and the question is still whether $f(x)$ settles down near some fixed value $L$.

**Computing limits at infinity for rational functions**: naively substituting "$x=\infty$" into a formula is not a valid arithmetic operation — infinity is not a number to plug in. Instead, for a rational function $f(x) = \frac{p(x)}{q(x)}$, divide **both** the numerator and denominator by the **highest power of $x$ appearing in the denominator**. This rewrites every term as either a constant or a term of the form $c/x^n$, and the key fact $\lim_{x\to\infty} \frac{1}{x^n} = 0$ (for any $n>0$) lets each such term vanish, leaving a definite, computable limit.

**Limits at infinity vs. infinite limits — two different phenomena**: a **limit at infinity** ($x\to\infty$) describes the function's behavior as the INPUT grows without bound — the answer, if it exists, is typically a finite number $L$ (giving a horizontal asymptote $y=L$). An **infinite limit** ($f(x)\to\infty$ as $x\to a$) describes the OUTPUT growing without bound as the input approaches a specific FINITE point $a$ — giving a vertical asymptote at $x=a$. These are genuinely different situations (input growing vs. output growing, at infinity vs. at a finite point), despite both notations involving the symbol $\infty$.

## Component 4 — Worked Examples

**Example 1 (LO1 — interpreting the limit as x grows without bound)**: For $f(x) = \frac{1}{x}$, as $x$ takes the values $10, 100, 1000, 10000,\dots$, $f(x)$ takes the values $0.1, 0.01, 0.001, 0.0001,\dots$ — getting arbitrarily close to $0$ and staying close as $x$ grows. So $\lim_{x\to\infty}\frac{1}{x} = 0$, matching the intuitive picture of the graph flattening toward the horizontal line $y=0$ as $x$ extends rightward.

**Example 2 (LO2 — the divide-by-highest-power technique, breaking MC-1)**: Compute $\lim_{x\to\infty}\frac{3x^2+5x-1}{2x^2-x+4}$. A naive "plug in infinity" gives the meaningless $\infty/\infty$. Instead, divide numerator and denominator by $x^2$ (the highest power in the denominator): $\frac{3+5/x-1/x^2}{2-1/x+4/x^2}$. As $x\to\infty$, every term with $1/x$ or $1/x^2$ vanishes (using $1/x^n\to0$), leaving $\frac{3+0-0}{2-0+0} = \frac{3}{2}$. So $\lim_{x\to\infty}\frac{3x^2+5x-1}{2x^2-x+4} = \frac{3}{2}$ — giving the horizontal asymptote $y=3/2$.

**Example 3 (LO3 — limits at infinity vs. infinite limits, breaking MC-2)**: Consider $g(x) = \frac{1}{x-2}$. As $x\to\infty$: dividing by the highest power (just $x$ here), $\frac{1/x}{1-2/x}\to\frac{0}{1}=0$ — a genuine limit AT infinity, giving horizontal asymptote $y=0$. But as $x\to2$ (a FINITE point): the denominator $x-2\to0$ while the numerator stays at $1$, so $g(x)\to\pm\infty$ (blowing up) — this is an INFINITE limit at a finite point, giving a VERTICAL asymptote at $x=2$. Same function, two completely different phenomena: one describes what happens as $x$ runs off to infinity (a finite answer, $0$); the other describes what happens as $x$ approaches a specific finite point (an unbounded, "infinite" answer) — proving these two uses of $\infty$ are not interchangeable.

## Component 5 — Teaching Actions

### Teaching Action A01 — x Growing Without Bound, f(x) Settling Down (Primitive P11: Representation Shift)

Show the graph of $f(x)=1/x$ flattening toward $y=0$ as $x$ extends far to the right, alongside the numeric table from Example 1. State: "just like an ordinary limit asks 'what does f(x) approach as x approaches a specific number,' this asks 'what does f(x) approach as x just keeps growing, forever.'" Connect directly to the already-known "approach, not arrival" principle from `math.calc.limits`.

### Teaching Action A02 — Dividing by the Highest Power, Never "Plugging In Infinity" (Primitive P28: Conflict Evidence)

State plainly: "infinity is not a number — you cannot substitute it into a formula the way you substitute a specific value." Work Example 2's full technique, explicitly narrating why $\infty/\infty$ is meaningless as a starting point and why dividing by $x^2$ first converts every troublesome term into a $1/x^n$ term that provably vanishes.

- **MC-1 hook**: ask "can you find $\lim_{x\to\infty}\frac{3x^2+5x-1}{2x^2-x+4}$ by just substituting a very large number for x and see what happens?" (looking for whether the student understands this only approximates, rather than rigorously computes, the limit) — treat an answer suggesting substitution alone is sufficient as revealing MC-1 (attempting direct substitution of "infinity" rather than using the algebraic technique that produces an exact, provable answer).

### Teaching Action A03 — Limits at Infinity vs. Infinite Limits: Not the Same Phenomenon (Primitive P06: Contrast Pair)

Present Example 3's direct contrast: the SAME function $g(x)=1/(x-2)$ analyzed two ways — as $x\to\infty$ (a finite limit, $0$, horizontal asymptote) and as $x\to2$ (an infinite limit, unbounded, vertical asymptote). State: "don't let the shared symbol $\infty$ fool you — 'the input runs off to infinity' and 'the output runs off to infinity at a fixed input' are opposite kinds of behavior, describing completely different parts of the graph."

- **MC-2 hook**: ask "are a 'limit at infinity' and an 'infinite limit' describing the same kind of thing, just with different names?" — a "yes" answer reveals MC-2 (conflating end behavior as $x$ grows with unbounded output behavior at a finite point, missing that these are different phenomena located in different parts of the graph).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\lim_{x\to\infty}\frac{4x^3-2x}{x^3+7}$ using the divide-by-highest-power technique, showing every step.
  2. Compute $\lim_{x\to\infty}\frac{5x+1}{2x^2-3}$ (note the denominator's higher degree here), and explain what happens to the limit when the denominator's degree exceeds the numerator's.
  3. For $h(x)=\frac{2}{x-5}$, find $\lim_{x\to\infty}h(x)$ AND separately describe the behavior of $h(x)$ as $x\to5$, explaining why these are two different questions about the same function.
  4. A student computes $\lim_{x\to\infty}\frac{x^2+1}{x+1}$ by substituting a "very large" value and concludes the limit is some large finite number close to that substituted value. Explain what's incomplete about this reasoning, and correctly determine what actually happens to this limit as $x\to\infty$ (hint: compare the degrees of numerator and denominator).
- **P76 (Transfer Probe, mode = independence)**: "A company models its per-unit production cost as $C(x) = \frac{1000+2x}{x}$, where $x$ is the number of units produced. (a) Find $\lim_{x\to\infty}C(x)$ using the divide-by-highest-power technique, and interpret what this limit means for the company's per-unit cost as production scales up indefinitely. (b) Explain why this limit describes a HORIZONTAL asymptote of the cost function, using the terminology from this lesson. (c) If the company's model also has a different formula that blows up as $x$ approaches some small specific production level (e.g. representing a fixed setup cost divided by a vanishingly small batch size), explain why that separate behavior would be a VERTICAL asymptote, not a limit at infinity, even though both involve the word 'infinite' informally in conversation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INFINITY-SUBSTITUTED-AS-A-NUMBER | Attempting to evaluate a limit at infinity by directly substituting "infinity" into the formula, rather than using the divide-by-highest-power algebraic technique | Foundational |
| MC-2 | LIMITS-AT-INFINITY-CONFLATED-WITH-INFINITE-LIMITS | Treating a limit at infinity (x growing without bound, typically a finite answer) as the same phenomenon as an infinite limit (output growing without bound at a finite input point) | Foundational |
| MC-3 | HIGHEST-POWER-DIVISION-APPLIED-TO-WRONG-TERM-COUNT | Dividing by the highest power of x in the NUMERATOR instead of the denominator, or by an incorrect power, leading to an incorrectly simplified (and wrong) limit | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Infinity-Substituted-As-a-Number Error") → P41 (detect: ask a student to evaluate a rational-function limit at infinity and observe whether they attempt to substitute a literal "infinity" or a specific large number as if it settles the question exactly) → P64 (conceptual shift: re-walk Example 2's full technique, re-anchoring on "infinity isn't a number you plug in — dividing by the highest power turns the expression into one built from terms that provably vanish, giving an EXACT answer, not an approximation").
- **B02 (targets MC-2)**: P27 (name it: "Limits-at-Infinity/Infinite-Limits Conflation") → P41 (detect: ask a student to distinguish $\lim_{x\to\infty}\frac{1}{x-2}$ from the behavior of $\frac{1}{x-2}$ as $x\to2$) → P64 (conceptual shift: re-walk Example 3's direct side-by-side analysis of the SAME function under both questions, re-anchoring on "input running to infinity" vs. "output running to infinity at a finite input" as opposite directions of the same symbol's use).
- **B03 (targets MC-3)**: P27 (name it: "Wrong-Term Highest-Power Division") → P41 (detect: give a rational function and check whether the student divides by the numerator's highest power, or an incorrect power, rather than the denominator's highest power) → P64 (conceptual shift: re-walk Example 2's specific choice — dividing by $x^2$ because that IS the denominator's highest power — and verify the resulting simplified terms all correctly vanish as $x\to\infty$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.limits` (the ε-δ "approach" definition and the "approach vs. arrival" principle this concept extends to unbounded growth).
- **Unlocks**: `math.func.horizontal-asymptote` (the horizontal asymptote $y=L$ is defined directly as the value a limit at infinity approaches, taught here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (the extended definition), A02 (the computational technique), and A03 (limits at infinity vs. infinite limits) each target a distinct LO, appropriate for a concept whose core difficulty is one persistent notational-confusion error (MC-2) alongside one computational technique.
- MC-2 (conflating limits at infinity with infinite limits) was given Foundational severity because the confusion is baked into the shared symbol $\infty$ appearing in both notations ($x\to\infty$ versus $f(x)\to\infty$) — Example 3 was deliberately built around a SINGLE function analyzed both ways specifically to make the distinction as vivid and memorable as possible, rather than using two separate functions that might obscure the parallel.
- The transfer probe's part (c) deliberately gestures toward vertical asymptote behavior without fully working it, since that is genuinely a different concept's territory (infinite limits at finite points) — this blueprint's job is establishing the DISTINCTION clearly, not teaching the vertical-asymptote computation in depth.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: graph flattening toward a horizontal line before the symbolic definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

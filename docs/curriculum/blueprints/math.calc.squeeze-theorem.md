# Teaching Blueprint: Squeeze Theorem (`math.calc.squeeze-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.squeeze-theorem` |
| name | Squeeze Theorem |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.limit-laws` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — the "sandwich" graph before the formal statement |
| description (KG) | If g(x) ≤ f(x) ≤ h(x) near a and lim g = lim h = L, then lim f = L; used to compute limits like lim(sinx/x) = 1.

 |

## Component 1 — Learning Objectives

- LO1: State the Squeeze Theorem — if $g(x)\le f(x)\le h(x)$ NEAR $a$ (not necessarily AT $a$ itself), and $\lim_{x\to a}g(x)=\lim_{x\to a}h(x)=L$, then $\lim_{x\to a}f(x)=L$ — the "sandwiched" function's limit is FORCED to match the bounding functions', even without evaluating $f$ directly.
- LO2: Correctly establish BOTH inequalities $g(x)\le f(x)$ and $f(x)\le h(x)$ before applying the theorem — a common shortcut error uses only ONE side of the inequality, which is insufficient to conclude anything.
- LO3: Apply the theorem to the classic result $\lim_{x\to0}\frac{\sin x}{x}=1$, recognizing this is a FOUNDATIONAL limit (needed to derive `math.calc.derivative-trig`'s $\frac{d}{dx}\sin x=\cos x$) that CANNOT be evaluated by direct substitution or the ordinary limit laws alone (since it's a $0/0$ form with no algebraic simplification available).

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.limit-laws` — the squeeze theorem is a genuinely separate technique from the basic limit laws, needed specifically when direct evaluation and algebraic manipulation both fail.

## Component 3 — Core Explanation

The **Squeeze Theorem** (or Sandwich Theorem) provides a way to find $\lim_{x\to a}f(x)$ when $f$ is difficult to evaluate directly, by "trapping" it between two SIMPLER functions: if $g(x)\le f(x)\le h(x)$ for all $x$ NEAR $a$ (except possibly AT $a$ itself), and $\lim_{x\to a}g(x)=\lim_{x\to a}h(x)=L$ (both bounding functions converge to the SAME value $L$), then $f$ is FORCED to converge to that same $L$ as well — $f$ is "squeezed" between two functions closing in on the same point.

Applying the theorem correctly requires establishing BOTH inequalities — $g(x)\le f(x)$ AND $f(x)\le h(x)$ — since the "sandwich" structure genuinely needs bounds on BOTH sides; a single one-sided inequality doesn't pin down $f$'s behavior at all.

The theorem's most important application is proving $\lim_{x\to0}\frac{\sin x}{x}=1$ — a limit that CANNOT be evaluated by direct substitution (giving $0/0$) or any algebraic trick (there's no factor to cancel), making the squeeze theorem's geometric bounding argument (using areas of triangles and a circular sector) the essential technique. This result is itself foundational: it's the key step in DERIVING $\frac{d}{dx}\sin x=\cos x$ from the derivative's limit definition.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic application, breaking MC-1)**: Evaluate $\lim_{x\to0}x^2\sin\left(\frac{1}{x}\right)$ (a function that oscillates wildly and cannot be evaluated by direct substitution or ordinary limit laws, since $\sin(1/x)$ has no limit as $x\to0$). Since $-1\le\sin\left(\frac{1}{x}\right)\le1$ for all $x\ne0$, multiplying through by $x^2\ge0$: $-x^2\le x^2\sin\left(\frac{1}{x}\right)\le x^2$. Since $\lim_{x\to0}(-x^2)=0$ and $\lim_{x\to0}x^2=0$ (both bounds converge to 0), the Squeeze Theorem gives $\lim_{x\to0}x^2\sin\left(\frac{1}{x}\right)=0$. A common error establishes only ONE side of the inequality (e.g. only $f(x)\le x^2$) and attempts to conclude the limit anyway — without BOTH a lower and upper bound converging to the SAME value, the sandwich structure is incomplete and the conclusion is unjustified.

**Example 2 (LO3 — the sin(x)/x limit)**: State (without full geometric derivation) that $\lim_{x\to0}\frac{\sin x}{x}=1$ is established via the Squeeze Theorem, using the geometric inequality $\cos x\le\frac{\sin x}{x}\le1$ for $x$ near 0 (derived by comparing areas of a triangle, a circular sector, and a larger triangle) — since both $\cos x\to1$ and the constant function $1\to1$ as $x\to0$, the theorem forces $\frac{\sin x}{x}\to1$ as well.

**Example 3 (LO1, LO2 — recognizing when the squeeze theorem is needed, breaking MC-2)**: Evaluate $\lim_{x\to\infty}\frac{\cos x}{x}$. Since $-1\le\cos x\le1$ for ALL $x$, dividing by $x>0$ (for $x\to\infty$): $-\frac{1}{x}\le\frac{\cos x}{x}\le\frac{1}{x}$. Both bounds $\to0$ as $x\to\infty$, so by the Squeeze Theorem, $\lim_{x\to\infty}\frac{\cos x}{x}=0$. A common error attempts to apply ordinary limit LAWS directly (e.g. trying "$\lim(\cos x)/\lim(x)$"), not recognizing that $\lim_{x\to\infty}\cos x$ does NOT EXIST (it oscillates forever) — the ordinary quotient limit law requires BOTH individual limits to exist, which fails here, making the Squeeze Theorem the necessary alternative technique.

## Component 5 — Teaching Actions

### Teaching Action A01 — Establishing Both Bounding Inequalities Before Applying the Theorem (Primitive P64: Conceptual Shift)

Work Example 1, explicitly establishing BOTH the lower and upper bound before concluding.

- **MC-1 hook**: check whether both sides of the sandwich inequality are established, not just one.

### Teaching Action A02 — The Foundational sin(x)/x Limit (reused procedure)

Present Example 2, connecting this result forward to its role in deriving trigonometric derivatives.

### Teaching Action A03 — Recognizing When Ordinary Limit Laws Fail and the Squeeze Theorem Is Needed (Primitive P06: Contrast Pair)

Work Example 3, contrasting the invalid attempt to apply the quotient limit law (when one piece's limit doesn't exist) against the correct squeeze-theorem approach.

- **MC-2 hook**: this directly targets MC-2 (attempting ordinary limit laws when a piece's limit doesn't exist, rather than recognizing the squeeze theorem is needed).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Evaluate $\lim_{x\to0}x^4\cos\left(\frac{1}{x}\right)$ using the Squeeze Theorem, establishing both bounds explicitly.
  2. Explain, in one sentence, why establishing only one side of the sandwich inequality is insufficient to apply the theorem.
  3. Explain why $\lim_{x\to0}\frac{\sin x}{x}$ cannot be evaluated by direct substitution or ordinary limit laws.
  4. Evaluate $\lim_{x\to\infty}\frac{\sin x}{x^2}$ using the Squeeze Theorem.
- **P76 (Transfer Probe, mode = independence)**: "A signal-processing engineer analyzes a noisy signal $f(x)=x\sin\left(\frac{1}{x}\right)$ (near $x=0$, where the oscillation frequency becomes unbounded, but the AMPLITUDE is controlled by the factor $x$). (a) Explain how the Squeeze Theorem lets the engineer confidently conclude the signal approaches 0 as $x\to0$, despite the wild oscillation of $\sin(1/x)$ itself. (b) Identify the two bounding functions the engineer would use, and explain why BOTH must converge to the same limit for the argument to work."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONLY-ONE-SIDE-OF-THE-SANDWICH-INEQUALITY-ESTABLISHED | Establishing only one bounding inequality (upper or lower) and attempting to conclude the limit anyway, without the complete two-sided sandwich structure | Foundational |
| MC-2 | ORDINARY-LIMIT-LAWS-ATTEMPTED-WHEN-A-PIECES-LIMIT-DOES-NOT-EXIST | Attempting to apply ordinary limit laws (like the quotient law) to a situation where one piece's limit genuinely does not exist, rather than recognizing the squeeze theorem is the appropriate alternative | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Only One Side of the Sandwich Inequality Established") → P41 (detect: present Example 1 and check whether both bounds are established) → P64 (conceptual shift: re-derive both the lower and upper bound explicitly, confirming both converge to the same limit).
- **B02 (targets MC-2)**: P27 ("Ordinary Limit Laws Attempted When a Piece's Limit Does Not Exist") → P41 (detect: present Example 3 and check whether the quotient law is (incorrectly) applied to $\cos x$, whose limit at infinity doesn't exist) → P64 (conceptual shift: re-recognize the oscillating piece's limit failure, then re-derive using the squeeze theorem's bounding approach instead).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.limit-laws`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.limits` (the squeeze theorem is a specialized technique extending the basic limit concept).

## Component 8 — Teaching Notes

- estimated_hours = 4 and mastery_threshold = 0.75 reflect that while the theorem's statement is simple, correctly constructing valid bounding functions requires genuine insight.
- Both misconceptions were ranked Foundational because each reflects a genuine gap in understanding what the theorem actually requires, not a minor computational slip.
- The noisy-signal transfer probe was deliberately chosen because a bounded-amplitude oscillating signal is a genuinely common real-world scenario where direct evaluation is impossible but the squeeze theorem's bounding logic applies cleanly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.limit-laws`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: the "sandwich" graph before formal statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1/LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

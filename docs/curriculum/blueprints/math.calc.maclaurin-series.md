# Teaching Blueprint: Maclaurin Series (`math.calc.maclaurin-series`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.maclaurin-series` |
| name | Maclaurin Series |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.taylor-series` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Taylor series centered at a = 0; key examples: eˣ = Σxⁿ/n!, sin x = Σ(−1)ⁿx^(2n+1)/(2n+1)!, cos x = Σ(−1)ⁿx^(2n)/(2n)!, 1/(1−x) = Σxⁿ.

 |

## Component 1 — Learning Objectives

- LO1: Define the Maclaurin series as the SPECIAL CASE of the Taylor series CENTERED AT $a=0$: $f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}x^n$ — every derivative is evaluated AT ZERO, simplifying the general Taylor formula.
- LO2: Memorize and derive the FOUR standard Maclaurin series — $e^x=\sum\frac{x^n}{n!}$, $\sin x=\sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}$, $\cos x=\sum\frac{(-1)^nx^{2n}}{(2n)!}$, and $\frac{1}{1-x}=\sum x^n$ — and recognize $\sin x$'s series contains ONLY ODD powers while $\cos x$'s contains ONLY EVEN powers, a DIRECT consequence of $\sin$ being an odd function and $\cos$ an even function.
- LO3: Derive NEW Maclaurin series from the four standard ones via SUBSTITUTION, DIFFERENTIATION, or INTEGRATION (e.g. finding the series for $e^{-x^2}$ by substituting $-x^2$ for $x$ in $e^x$'s series) — RATHER than computing every derivative from scratch each time.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.taylor-series` — the Maclaurin series is its $a=0$ special case.

## Component 3 — Core Explanation

The **Maclaurin series** is the Taylor series CENTERED AT $a=0$: $f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}x^n=f(0)+f'(0)x+\frac{f''(0)}{2!}x^2+\cdots$ — every derivative is evaluated specifically at 0, which is often what makes these series' coefficients particularly clean and memorable.

Four series are worth knowing by heart: $e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\cdots$; $\sin x=\sum_{n=0}^{\infty}\frac{(-1)^nx^{2n+1}}{(2n+1)!}=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$ (ONLY odd powers, since $\sin$ is an ODD function); $\cos x=\sum_{n=0}^{\infty}\frac{(-1)^nx^{2n}}{(2n)!}=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots$ (ONLY even powers, since $\cos$ is an EVEN function); and $\frac{1}{1-x}=\sum_{n=0}^{\infty}x^n=1+x+x^2+\cdots$ (the geometric series, valid for $|x|<1$).

Rather than computing derivatives from scratch for every new function, NEW Maclaurin series can be efficiently derived from these four standard ones via algebraic manipulation: SUBSTITUTION (replacing $x$ with some expression), DIFFERENTIATION (term-by-term, valid within the radius of convergence), or INTEGRATION (also term-by-term).

## Component 4 — Worked Examples

**Example 1 (LO2 — odd/even power pattern, breaking MC-1)**: Write out the first three nonzero terms of $\sin x$'s Maclaurin series and confirm it contains only ODD powers. $\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$ — powers 1, 3, 5 (all odd). A common error includes an even-power term (e.g. mistakenly adding an $x^2$ or $x^4$ term) when reconstructing $\sin x$'s series from memory, rather than recognizing that $\sin$'s ODDNESS (as a function, $\sin(-x)=-\sin(x)$) structurally FORCES every coefficient of an even power to be exactly zero in its Maclaurin series.

**Example 2 (LO3 — deriving a new series via substitution, breaking MC-2)**: Find the Maclaurin series for $e^{-x^2}$ using the known $e^x$ series. Substitute $-x^2$ for $x$ in $e^x=\sum\frac{x^n}{n!}$: $e^{-x^2}=\sum\frac{(-x^2)^n}{n!}=\sum\frac{(-1)^nx^{2n}}{n!}=1-x^2+\frac{x^4}{2!}-\frac{x^6}{3!}+\cdots$. A common error attempts to compute this series by finding derivatives of $e^{-x^2}$ directly from the Maclaurin formula's definition (a genuinely tedious, error-prone process involving repeated chain-rule differentiation), rather than recognizing the far more efficient substitution shortcut using the ALREADY-KNOWN $e^x$ series.

**Example 3 (LO3 — deriving via term-by-term integration)**: Find the Maclaurin series for $\ln(1+x)$ using the known geometric series. Since $\frac{1}{1+x}=\sum(-x)^n=\sum(-1)^nx^n$ (substituting $-x$ into the geometric series), and $\ln(1+x)=\int_0^x\frac{1}{1+t}\,dt$, integrate the series term-by-term: $\ln(1+x)=\sum_{n=0}^{\infty}\frac{(-1)^nx^{n+1}}{n+1}=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Odd Functions Have Only Odd-Power Series Terms; Even Functions Only Even (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting the odd/even function property to the structural absence of the "wrong-parity" power terms.

- **MC-1 hook**: check whether the correct power parity is maintained when reconstructing a standard series from memory.

### Teaching Action A02 — Deriving New Series via Substitution Is More Efficient Than Direct Differentiation (Primitive P11: Representation Shift)

Work Example 2, contrasting the efficient substitution shortcut against the (unnecessarily tedious) direct-derivative approach.

- **MC-2 hook**: this directly targets MC-2 (attempting direct differentiation instead of using known series as building blocks).

### Teaching Action A03 — Deriving New Series via Term-by-Term Integration (reused procedure)

Work Example 3, demonstrating the integration-based derivation technique as a third tool alongside substitution.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Write the Maclaurin series for $\cos x$, confirming it contains only even powers.
  2. Find the Maclaurin series for $e^{3x}$ using substitution into the known $e^x$ series.
  3. Find the Maclaurin series for $\sin(x^2)$ using substitution into the known $\sin x$ series.
  4. Explain, in one sentence, why using substitution/integration/differentiation from known series is generally more efficient than computing every derivative from the Maclaurin formula's definition directly.
- **P76 (Transfer Probe, mode = independence)**: "A physicist needs an approximation for the relativistic energy correction term $\frac{1}{\sqrt{1-v^2/c^2}}$ (appearing in special relativity, where $v/c$ is small for everyday speeds) as a power series in $v/c$, to identify the leading correction to Newtonian mechanics. (a) Using the known binomial-series pattern $(1-u)^{-1/2}=1+\frac{1}{2}u+\frac{3}{8}u^2+\cdots$ (a Maclaurin-type expansion), substitute $u=v^2/c^2$ to find the first two nonzero terms of this expression's series in $v/c$. (b) Explain why deriving this via substitution into a known series is far more practical than differentiating the original expression repeatedly from scratch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ODD-EVEN-POWER-PARITY-VIOLATED-WHEN-RECONSTRUCTING-STANDARD-SERIES | Including a wrong-parity power term (even in sin's series, or odd in cos's) when reconstructing a standard Maclaurin series from memory | Moderate |
| MC-2 | NEW-SERIES-DERIVED-VIA-DIRECT-DIFFERENTIATION-INSTEAD-OF-REUSING-KNOWN-SERIES | Attempting to derive a new Maclaurin series by repeated direct differentiation, rather than efficiently reusing a known series via substitution, differentiation, or integration | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Odd-Even Power Parity Violated When Reconstructing Standard Series") → P41 (detect: present Example 1 and check whether an incorrect-parity term appears) → P64 (conceptual shift: re-derive using the function's odd/even symmetry property to justify which powers must vanish).
- **B02 (targets MC-2)**: P27 ("New Series Derived via Direct Differentiation Instead of Reusing Known Series") → P41 (detect: present Example 2 and check whether direct differentiation is attempted instead of substitution) → P64 (conceptual shift: re-work the problem using the substitution shortcut into the already-known series).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.taylor-series`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.calc.taylor-series`.

## Component 8 — Teaching Notes

- estimated_hours = 8 (the highest in this batch) reflects the genuine breadth required to master the four standard series plus the three derivation techniques (substitution, differentiation, integration) for building new ones.
- Both misconceptions were ranked Moderate because each typically still leads toward a usable (if inefficient or slightly flawed) result, rather than a completely wrong answer.
- The relativistic-energy-correction transfer probe was deliberately chosen because approximating a complicated expression via a known series' substitution is exactly how physicists derive practical low-speed approximations from exact relativistic formulas, giving the technique genuine scientific weight.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.taylor-series`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

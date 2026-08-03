# Teaching Blueprint: Radius of Convergence (`math.calc.radius-of-convergence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.radius-of-convergence` |
| name | Radius of Convergence |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.power-series`, `math.seq.ratio-test` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The radius R such that the power series converges absolutely for |x−a| < R and diverges for |x−a| > R; found via the ratio or root test.

 |

## Component 1 — Learning Objectives

- LO1: Find the RADIUS of convergence $R$ of a power series $\sum c_n(x-a)^n$ by applying the RATIO TEST to the series' terms, solving for the range of $x$ where the ratio's limit is less than 1.
- LO2: State that the power series converges ABSOLUTELY for $|x-a|<R$ and DIVERGES for $|x-a|>R$ — but that the ENDPOINTS $x=a\pm R$ require SEPARATE, individual checking (the ratio test is INCONCLUSIVE exactly at the boundary, giving limit exactly 1).
- LO3: Correctly report the full INTERVAL of convergence (not just the radius) by explicitly testing EACH endpoint individually and stating whether it's included or excluded.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.power-series` (the series form being analyzed) and `math.seq.ratio-test` (the primary tool for finding $R$).

## Component 3 — Core Explanation

For a power series $\sum_{n=0}^{\infty}c_n(x-a)^n$, the **radius of convergence** $R$ is the value such that the series converges ABSOLUTELY for $|x-a|<R$ and DIVERGES for $|x-a|>R$. It is found by applying the RATIO TEST to the series' general term: compute $\lim_{n\to\infty}\left|\frac{c_{n+1}(x-a)^{n+1}}{c_n(x-a)^n}\right|<1$ and solve the resulting inequality for $|x-a|$.

Crucially, the ratio test is INCONCLUSIVE exactly when this limit equals 1 — which happens precisely at the two ENDPOINTS $x=a-R$ and $x=a+R$. The radius of convergence formula tells you NOTHING about behavior at these two exact points; each endpoint must be checked SEPARATELY, by substituting it into the original series and testing convergence with a DIFFERENT test (e.g. the alternating series test, or a comparison test).

The full **interval of convergence** is the radius result COMBINED with the endpoint checks — it might be $(a-R,a+R)$, $[a-R,a+R)$, $(a-R,a+R]$, or $[a-R,a+R]$, depending on what each individual endpoint check reveals.

## Component 4 — Worked Examples

**Example 1 (LO1 — finding R via the ratio test, breaking MC-1)**: Find the radius of convergence of $\sum_{n=0}^{\infty}\frac{(x-2)^n}{n!}$. Ratio test: $\lim_{n\to\infty}\left|\frac{(x-2)^{n+1}/(n+1)!}{(x-2)^n/n!}\right|=\lim_{n\to\infty}\left|\frac{x-2}{n+1}\right|=0<1$ for ALL $x$ — since this limit is 0 regardless of $x$, the series converges for EVERY $x$, meaning $R=\infty$. A common error, upon finding the limit simplifies to something like $|x-2|\cdot0$, incorrectly concludes "the radius is 0" (confusing the coefficient-decay pattern with the CONDITION for divergence) rather than correctly recognizing that a limit of 0 (regardless of $x$) means the series ALWAYS converges, i.e. $R=\infty$ — the exact opposite conclusion.

**Example 2 (LO2 — endpoints require separate checking, breaking MC-2)**: Find the radius and interval of convergence of $\sum_{n=1}^{\infty}\frac{(x-1)^n}{n}$. Ratio test gives $R=1$, so the series converges for $|x-1|<1$, i.e. $0<x<2$. At $x=2$: the series becomes $\sum\frac{1}{n}$ — the HARMONIC series, which DIVERGES. At $x=0$: the series becomes $\sum\frac{(-1)^n}{n}$ — an ALTERNATING series that CONVERGES (by the alternating series test). So the full interval is $[0,2)$ — LEFT endpoint included, RIGHT endpoint excluded. A common error assumes BOTH endpoints behave the same way (either both included or both excluded) simply because they're "the same distance" from the center — but each endpoint substitutes into a genuinely DIFFERENT series (one alternating, one not), and must be checked completely independently; there's no general symmetry guaranteeing matching behavior.

**Example 3 (LO1 — a finite nonzero radius)**: Find the radius of convergence of $\sum_{n=0}^{\infty}n\cdot x^n$. Ratio test: $\lim_{n\to\infty}\left|\frac{(n+1)x^{n+1}}{nx^n}\right|=\lim_{n\to\infty}\frac{n+1}{n}|x|=|x|<1$ — giving $R=1$ (converges for $|x|<1$, before even checking endpoints).

## Component 5 — Teaching Actions

### Teaching Action A01 — Interpreting the Ratio Test's Limit Correctly (Primitive P64: Conceptual Shift)

Work Example 1, explicitly interpreting a limit of 0 (independent of $x$) as meaning convergence for ALL $x$, i.e. $R=\infty$.

- **MC-1 hook**: check whether a limit of 0 is correctly interpreted as $R=\infty$, not $R=0$.

### Teaching Action A02 — Each Endpoint Is a Separate, Independent Check (Primitive P06: Contrast Pair)

Work Example 2, explicitly checking both endpoints as genuinely DIFFERENT series with potentially different outcomes.

- **MC-2 hook**: this directly targets MC-2 (assuming both endpoints must behave identically).

### Teaching Action A03 — Standard Ratio-Test Application for a Finite Radius (reused procedure)

Work Example 3, as a standard clean application without the edge cases of Examples 1-2.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Find the radius of convergence of $\sum_{n=0}^{\infty}\frac{x^n}{2^n}$.
  2. Find the radius and full interval of convergence of $\sum_{n=1}^{\infty}\frac{(x+1)^n}{n^2}$, checking both endpoints.
  3. Explain, in one sentence, why the ratio test's limit equaling exactly 1 signals that a SEPARATE check is needed at that point.
  4. Find the radius of convergence of $\sum_{n=0}^{\infty}n!\,x^n$.
- **P76 (Transfer Probe, mode = independence)**: "An engineer approximates a nonlinear circuit's response using a power series $\sum c_n V^n$ (voltage $V$ raised to increasing powers), and needs to know the exact voltage RANGE over which this approximation is mathematically valid (i.e., where the series converges). (a) Explain what finding the radius of convergence $R$ would tell the engineer about the maximum safe voltage magnitude for using this approximation. (b) Explain why, even after finding $R$, the engineer would still need to separately investigate the behavior at exactly $V=R$ and $V=-R$ before fully characterizing the approximation's valid range."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RATIO-TEST-LIMIT-OF-ZERO-MISINTERPRETED-AS-RADIUS-ZERO | Misinterpreting a ratio-test limit of 0 (true for all x) as meaning the radius of convergence is 0, rather than infinite | Foundational |
| MC-2 | ENDPOINTS-ASSUMED-TO-BEHAVE-IDENTICALLY-WITHOUT-SEPARATE-CHECKING | Assuming both endpoints of the interval of convergence must behave the same way, without checking each one as an independent series | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Ratio Test Limit of Zero Misinterpreted as Radius Zero") → P41 (detect: present Example 1 and check whether $R=0$ is (incorrectly) concluded) → P64 (conceptual shift: re-state the ratio test's logic explicitly — the limit being LESS than 1 means convergence, and 0 is always less than 1 regardless of $x$, so every $x$ satisfies the criterion).
- **B02 (targets MC-2)**: P27 ("Endpoints Assumed to Behave Identically Without Separate Checking") → P41 (detect: present Example 2 and check whether both endpoints are (incorrectly) assumed identical) → P64 (conceptual shift: re-substitute each endpoint into the ORIGINAL series separately, identifying the genuinely different resulting series at each).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.power-series`, `math.seq.ratio-test`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.calc.power-series`.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that while the ratio-test computation itself is routine, correctly handling the endpoint analysis and edge cases (R=0 vs R=∞) requires genuine care.
- Both misconceptions were ranked Foundational because each produces a fundamentally wrong characterization of the series' convergence behavior, not a minor imprecision.
- The nonlinear-circuit transfer probe was deliberately chosen because determining a valid operating range for an approximation is a genuinely important engineering concern, giving the abstract radius-of-convergence concept immediate practical stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.power-series`, `math.seq.ratio-test`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

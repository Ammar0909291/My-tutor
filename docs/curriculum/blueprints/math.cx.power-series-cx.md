# Teaching Blueprint: Power Series in ℂ (`math.cx.power-series-cx`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.power-series-cx` |
| name | Power Series in ℂ |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.cx.analytic-functions`, `math.calc.power-series` |
| unlocks | `math.cx.identity-theorem` |
| cross_links | `math.calc.power-series` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — a direct transfer of the already-known real power series machinery into ℂ, immediately contrasted on the one genuinely new feature (disk vs. interval) |
| description (KG) | ∑aₙ(z−z₀)ⁿ converges absolutely in \|z−z₀\|<R (radius of convergence, R from Hadamard formula). Holomorphic functions are locally equal to their Taylor series. Ratio/root tests work in ℂ as in ℝ. |

## Component 1 — Learning Objectives

- LO1: Define a complex power series $\sum_{n=0}^\infty a_n(z-z_0)^n$ and find its **radius of convergence** $R$ using the ratio test (or root test) applied to $|a_n|$ — recognizing this is the **identical procedure** already mastered in `math.calc.power-series`, with no new technique required.
- LO2: Correctly interpret $|z-z_0|<R$ as a **disk** of radius $R$ centered at $z_0$ in the complex plane (not an interval on the real line) — directly refuting the misconception that convergence-region reasoning transfers from ℝ's two endpoints to ℂ's boundary in the same simple way, since ℂ's boundary is an entire **circle** of points, each of which may behave differently.
- LO3: State the central theorem this concept exists to deliver: a function **holomorphic** on an open set $U$ is **locally equal to its Taylor series** there (directly citing `math.cx.analytic-functions`'s holomorphic $\Leftrightarrow$ analytic equivalence) — recognizing this as a genuinely stronger guarantee than in ℝ, where a real-differentiable (even $C^\infty$) function need not equal its Taylor series at all.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.power-series` (the real power series $\sum c_n(x-a)^n$, its radius of convergence $R$ found via the ratio test, and the endpoint-testing procedure at $x=a\pm R$) and `math.cx.analytic-functions` (holomorphic $\Leftrightarrow$ analytic in $\mathbb{C}$, a genuine equivalence with no real-analysis counterpart).

## Component 3 — Core Explanation

**The complex power series and its radius of convergence, transferred directly**: a complex power series $\sum_{n=0}^\infty a_n(z-z_0)^n$ converges absolutely for $|z-z_0|<R$, where $R$ is found by the **exact same ratio test** already used in `math.calc.power-series`: $R = \lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right|$ (or via the general Hadamard formula, $R = \left(\limsup_{n\to\infty}|a_n|^{1/n}\right)^{-1}$, which the ratio test approximates whenever the ratio limit exists). Nothing about *finding* $R$ changes when moving from ℝ to ℂ — the same series-of-numbers convergence test applies identically to $|a_n(z-z_0)^n|$ as it did to $|c_n(x-a)^n|$.

**The disk of convergence — genuinely different from the real interval**: in ℝ, $|x-a|<R$ describes an **interval** $(a-R, a+R)$ with exactly two boundary points to check. In ℂ, $|z-z_0|<R$ describes a **disk** — every complex number within distance $R$ of $z_0$ — whose boundary is an entire **circle** $|z-z_0|=R$, containing infinitely many points. The ratio test is inconclusive on this whole boundary circle, exactly as it was inconclusive at the two real endpoints — but now there are infinitely many boundary points to potentially investigate individually, and behavior can genuinely vary from point to point around the circle (some points on the boundary may give a convergent series, others divergent, for the same power series).

**Holomorphic functions locally equal their Taylor series**: this is the payoff theorem. If $f$ is holomorphic on an open set $U$, then at every point $z_0\in U$, $f$ equals its own Taylor series $\sum_{n=0}^\infty \frac{f^{(n)}(z_0)}{n!}(z-z_0)^n$ on some disk around $z_0$ — this is precisely `math.cx.analytic-functions`'s holomorphic $\Leftrightarrow$ analytic equivalence restated using the power-series machinery developed here. This is a genuinely stronger fact than in real analysis, where being infinitely differentiable ($C^\infty$) does **not** guarantee equality with the Taylor series (the standard real counterexample, $e^{-1/x^2}$, is $C^\infty$ but its Taylor series at $0$ is identically zero, matching the function nowhere except at that single point).

## Component 4 — Worked Examples

**Example 1 (LO1 — finding R by the identical ratio-test procedure)**: For $\sum_{n=0}^\infty \frac{z^n}{n!}$ (the complex exponential series), apply the ratio test to $a_n=1/n!$: $\lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right| = \lim_{n\to\infty}\frac{(n+1)!}{n!} = \lim_{n\to\infty}(n+1) = \infty$. So $R=\infty$ — the series converges for **every** $z\in\mathbb{C}$, exactly the same computation and conclusion as the real exponential series in `math.calc.power-series`, with $x$ simply replaced by $z$ throughout.

**Example 2 (LO2 — the disk of convergence and its circular boundary, breaking MC-1)**: For $\sum_{n=1}^\infty \frac{z^n}{n}$, the ratio test on $a_n=1/n$ gives $R=1$ — converges for $|z|<1$ (the **open unit disk**), diverges for $|z|>1$. On the boundary circle $|z|=1$ itself, behavior varies by point: at $z=1$, the series becomes $\sum 1/n$, the harmonic series, which **diverges**; at $z=-1$, it becomes $\sum(-1)^n/n$, which **converges** (alternating series test). Two different points on the SAME boundary circle, one divergent and one convergent — proving the boundary cannot be treated as a single "the endpoint" the way ℝ's two isolated endpoints sometimes can be handled together, and that each boundary point genuinely requires its own separate check.

**Example 3 (LO3 — holomorphic implies equal to its Taylor series, contrasted with the real gap, breaking MC-3)**: $f(z)=e^z$ is entire (holomorphic on all of $\mathbb{C}$, from `math.cx.analytic-functions`), so by the central theorem, $f$ equals its Taylor series $\sum z^n/n!$ everywhere (matching Example 1's $R=\infty$ result). Contrast with the real function $g(x)=e^{-1/x^2}$ (for $x\ne0$, $g(0)=0$): this function is $C^\infty$ on $\mathbb{R}$ (infinitely differentiable, with every derivative at $0$ equal to $0$), yet its Taylor series at $0$ is the identically-zero series — which equals $g(x)$ only at the single point $x=0$, not on any surrounding interval. In ℂ, this kind of failure is **impossible** for a genuinely holomorphic function: holomorphic $\Rightarrow$ automatically, provably equal to its Taylor series on a disk, with no analogous "smooth but not analytic" gap.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Ratio Test Transfers Directly, No New Technique (Primitive P11: Representation Shift)

State plainly: "everything you already know about finding $R$ — the ratio test on the coefficients $a_n$ — works completely unchanged here. The only thing that's new is what the resulting inequality $|z-z_0|<R$ actually LOOKS like geometrically." Work Example 1, explicitly noting the computation is identical in form to the corresponding real-series computation from `math.calc.power-series`.

### Teaching Action A02 — From Interval to Disk: the Boundary Is a Whole Circle (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the same power series, boundary behavior differing at $z=1$ (diverges) versus $z=-1$ (converges), both on the same circle $|z|=1$. State: "in ℝ you had exactly two endpoints to check. Here, the entire circle $|z-z_0|=R$ is the 'boundary' — and just like the two real endpoints could behave differently from each other, points anywhere around this circle can too. There's no shortcut that lets you check one point and assume the rest of the circle behaves the same way."

- **MC-1 hook**: ask "if a complex power series converges at one point on its boundary circle $|z-z_0|=R$, does it converge at every point on that circle?" — a "yes" answer reveals MC-1 (assuming uniform boundary behavior around the whole circle, rather than recognizing each boundary point may need independent checking, exactly as ℝ's two endpoints sometimes disagree).

### Teaching Action A03 — Holomorphic ⟹ Equals Its Taylor Series, a Guarantee Absent in ℝ (Primitive P06: Contrast Pair)

**Contrast** Example 3's $f(z)=e^z$ (holomorphic, provably equals its Taylor series everywhere) against $g(x)=e^{-1/x^2}$ (real, $C^\infty$, yet its Taylor series matches it only at a single point). State: "this is the payoff of `math.cx.analytic-functions`'s big theorem: 'holomorphic' in ℂ is SO much stronger than 'infinitely differentiable' in ℝ that it forces genuine equality with the Taylor series on a whole disk — a guarantee real analysis simply does not offer merely from smoothness."

- **MC-3 hook**: ask "if a real function is infinitely differentiable everywhere, must it equal its Taylor series near every point, the same way a holomorphic complex function does?" — a "yes" answer reveals MC-3 (assuming the real and complex situations are analogous here, missing that this is precisely the gap that makes complex analysis distinctive, already flagged as MC-2 in `math.cx.analytic-functions`).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the radius of convergence of $\sum_{n=0}^\infty \frac{z^n}{2^n}$ using the ratio test, and describe the region of convergence geometrically (in terms of $z$'s distance from the origin).
  2. For $\sum_{n=1}^\infty \frac{z^n}{n^2}$, find $R$, and then determine whether the series converges at BOTH $z=1$ and $z=-1$ on the boundary circle (using the fact that $\sum 1/n^2$ and $\sum(-1)^n/n^2$ are both known to converge absolutely).
  3. Explain why $f(z) = 1/(1-z)$ (holomorphic on $|z|<1$) equaling its geometric series Taylor expansion $\sum z^n$ there is an instance of the central theorem of this concept, referencing `math.cx.analytic-functions` directly.
  4. A student claims: "since the real function $\sin(x)$ is $C^\infty$ everywhere and DOES equal its Taylor series everywhere, all complex holomorphic functions should behave the same way as all smooth real functions." Explain what's wrong with this reasoning, using the $e^{-1/x^2}$ counterexample.
- **P76 (Transfer Probe, mode = cross-link probe against `math.calc.power-series`)**: "Recall from your `math.calc.power-series` lesson that the real power series $\sum_{n=1}^\infty \frac{x^n}{n}$ has radius of convergence $R=1$, converges at $x=-1$ (alternating series test) but diverges at $x=1$ (harmonic series) — so its real interval of convergence is $[-1,1)$. (a) Using the IDENTICAL series but now as a function of a complex variable $z$, state its radius of convergence $R$ in $\mathbb{C}$, and explain why the ratio-test computation is literally unchanged from the real case. (b) Describe the complex region of convergence as a disk, and identify the two SPECIFIC points on its boundary circle that correspond exactly to the real endpoints $x=1$ and $x=-1$ from that lesson. (c) Explain why, even though this complex series shares those same two boundary points' behavior with the real case, the boundary circle also contains infinitely many OTHER complex points (e.g. $z=i$) that the real-only analysis never had to consider at all."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOUNDARY-CIRCLE-ASSUMED-UNIFORM-BEHAVIOR | Assuming that if a complex power series converges (or diverges) at one point on its boundary circle $\|z-z_0\|=R$, it must behave the same way at every point on that circle | Foundational |
| MC-2 | RATIO-TEST-ASSUMED-TO-NEED-MODIFICATION-IN-C | Believing the ratio/root test procedure for finding $R$ must be adapted or changed when moving from real to complex power series, rather than recognizing it transfers completely unchanged | Moderate |
| MC-3 | REAL-SMOOTH-EQUALS-TAYLOR-SERIES-ASSUMED-GENERAL | Assuming that because SOME real $C^\infty$ functions (like $\sin x$) equal their Taylor series, this is the general rule for smooth functions, missing that in ℝ it is not guaranteed (unlike the automatic guarantee for holomorphic functions in ℂ) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Uniform-Boundary-Circle-Behavior Assumption") → P41 (detect: give a series with known differing boundary behavior, e.g. $\sum z^n/n$, and ask if convergence at $z=-1$ implies convergence at $z=1$ too) → P64 (conceptual shift: re-walk Example 2's direct computation at both $z=1$ (diverges) and $z=-1$ (converges), re-anchoring on "the boundary circle has infinitely many points, and each one needs its own check, just like ℝ's two endpoints sometimes disagreed with each other").
- **B02 (targets MC-2)**: P27 (name it: "Ratio-Test-Needs-Modification-in-ℂ Assumption") → P41 (detect: ask a student to find $R$ for a complex power series and observe if they hesitate or invent a new procedure rather than directly applying the familiar ratio test) → P64 (conceptual shift: re-walk Example 1 side by side with its real-analogue computation from `math.calc.power-series`, showing the algebra is symbol-for-symbol identical).
- **B03 (targets MC-3)**: P27 (name it: "Real-Smooth-Equals-Taylor-Series Overgeneralization") → P41 (detect: ask whether every infinitely differentiable real function equals its own Taylor series, citing $\sin x$ as apparent supporting evidence) → P64 (conceptual shift: re-present the $e^{-1/x^2}$ counterexample from Example 3 — genuinely $C^\infty$, yet its Taylor series matches it at only one point — then re-anchor on why holomorphic functions in ℂ are exempt from this failure mode, per `math.cx.analytic-functions`'s central equivalence theorem).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.analytic-functions` (the holomorphic $\Leftrightarrow$ analytic equivalence this concept's central theorem directly restates using power-series language), `math.calc.power-series` (the ratio-test radius-of-convergence procedure and endpoint-testing habit this concept transfers into $\mathbb{C}$).
- **Unlocks**: `math.cx.identity-theorem` (which relies on holomorphic functions being locally determined by their power series, established here).
- **Cross-link**: KG lists `math.calc.power-series` as a cross-link — **verified authored** via `ls docs/curriculum/blueprints/math.calc.power-series.md` — so P76_mode = **cross-link probe**, directly reusing that blueprint's own worked example ($\sum z^n/n$, $R=1$, boundary behavior at $x=\pm1$) as the transfer probe's anchor, per this corpus's established cross-link-probe convention (verified by reading the target file's content, not just gesturing at a shared topic).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at a "3 TAs + cross-link-probe gate" tier — A01 (direct technique transfer), A02 (disk-vs-interval, circular boundary), and A03 (holomorphic implies equals Taylor series) each target a distinct LO, appropriate for a concept whose primary teaching challenge is correctly generalizing familiar real-analysis machinery into the complex plane without either under- or over-generalizing.
- The cross-link probe deliberately reuses `math.calc.power-series`'s own $\sum x^n/n$ example verbatim (rather than a fresh series), maximizing the transfer signal: the student must recognize the identical algebra while correctly reframing the geometric picture from an interval with two endpoints to a disk with a full boundary circle.
- Example 3's real/complex contrast ($e^{-1/x^2}$ vs. $e^z$) deliberately reuses the exact counterexample already established in `math.cx.analytic-functions`'s own MC-2 discussion, reinforcing that prerequisite concept's central point rather than introducing a new smooth-but-non-analytic example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.power-series authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.calc.power-series) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct transfer of already-known machinery into ℂ) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

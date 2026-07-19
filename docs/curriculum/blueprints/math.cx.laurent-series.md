# Teaching Blueprint: Laurent Series (`math.cx.laurent-series`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.laurent-series` |
| name | Laurent Series |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.cx.singularities`, `math.cx.power-series-cx` |
| unlocks | `math.cx.residue-theorem` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert-level learner already fluent in both power series and singularity classification; the Laurent series combines these directly |
| description (KG) | In the annulus r<\|z−z₀\|<R: f(z) = ∑_{n=−∞}^∞ aₙ(z−z₀)ⁿ. Principal part: terms with n<0. aₙ = (1/2πi)∮_C f(z)/(z−z₀)^{n+1}dz. Classifies singularities: finite/zero/infinite principal part ↔ removable/pole/essential. |

## Component 1 — Learning Objectives

- LO1: Define the Laurent series $f(z)=\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n$ valid in an annulus $r<|z-z_0|<R$, identifying the **principal part** (all terms with $n<0$) as the genuinely NEW piece beyond an ordinary power series (from `math.cx.power-series-cx`, which has only $n\ge0$ terms and requires no annulus, just a disk).
- LO2: Compute the Laurent series of a function with an isolated singularity by direct algebraic manipulation (geometric series expansion, known Taylor series substitution) rather than always evaluating the contour-integral coefficient formula $a_n=\frac{1}{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}dz$ directly.
- LO3: Classify an isolated singularity's type — removable, pole, or essential — by examining the Laurent series' principal part directly (zero terms, finitely many terms, or infinitely many terms respectively), connecting this ALGEBRAIC test to the LIMITING-BEHAVIOR test (`math.cx.singularities`'s boundedness/blow-up/path-dependence criteria) as two different lenses on the exact same classification.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.singularities` (isolated singularities; the three-way classification removable/pole/essential via limiting behavior — boundedness, blow-up, or path-dependence — and Riemann's Removable Singularity Theorem) and `math.cx.power-series-cx` (ordinary power series $\sum_{n=0}^\infty a_n(z-z_0)^n$, radius of convergence via the ratio test, identical in form to real power series).

## Component 3 — Core Explanation

**The principal part is what makes a Laurent series genuinely new**: an ordinary power series (`math.cx.power-series-cx`) has only non-negative powers, $\sum_{n=0}^\infty a_n(z-z_0)^n$, and converges in a DISK $|z-z_0|<R$. A Laurent series allows NEGATIVE powers too, $\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n$, and converges in an ANNULUS $r<|z-z_0|<R$ (a punctured disk when $r=0$) — precisely because negative powers like $(z-z_0)^{-1}$ blow up at $z_0$ itself, so $z_0$ must be excluded. The terms with $n<0$ are called the **principal part**; the terms with $n\ge0$ form the **analytic part**, which behaves exactly like an ordinary power series.

**Computing Laurent coefficients by algebra, not always the contour integral**: the formal coefficient formula $a_n=\frac{1}{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}dz$ is rarely evaluated directly in practice. Instead, for functions built from familiar pieces, the Laurent series is found by substituting KNOWN series (geometric series $\frac1{1-w}=\sum w^n$, or Taylor series for $\sin$, $\cos$, $e^w$) into the given expression algebraically — the same technique already used for ordinary power series, just permitting the resulting expansion to contain negative powers.

**The Laurent series reclassifies singularities by an algebraic (not limiting-behavior) test**: `math.cx.singularities` classified removable/pole/essential singularities by examining boundedness or path-dependent limits. The Laurent series gives an EQUIVALENT, purely algebraic test on the SAME three-way classification: a **removable** singularity has principal part identically zero (no negative-power terms at all); a **pole** (of order $k$) has a principal part with FINITELY many terms, the most negative power being $(z-z_0)^{-k}$; an **essential** singularity has a principal part with INFINITELY many nonzero terms. Both tests — limiting behavior and Laurent-coefficient structure — always agree, because they classify the exact same underlying phenomenon from two different vantage points.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — the removable case, reusing `math.cx.singularities`'s $\sin z/z$, breaking MC-1)**: `math.cx.singularities` established $f(z)=\frac{\sin z}{z}$ has a removable singularity at $z_0=0$ (bounded, since $f(z)\to1$). Its Laurent series, found by substituting the known Taylor series $\sin z=z-\frac{z^3}{3!}+\frac{z^5}{5!}-\cdots$ and dividing by $z$: $\frac{\sin z}{z}=1-\frac{z^2}{3!}+\frac{z^4}{5!}-\cdots$. This series has **NO negative-power terms at all** — the principal part is identically zero, matching the removable classification exactly. The Laurent series here is genuinely just an ordinary power series (with $a_0=1$ patching the value at $z_0=0$, exactly as Riemann's theorem promised).

**Example 2 (LO2/LO3 — the pole case, reusing $1/z^2$, breaking MC-2)**: `math.cx.singularities` established $f(z)=\frac1{z^2}$ has a pole at $z_0=0$ (since $|f(z)|\to\infty$). Its Laurent series is trivial to write directly: $f(z)=z^{-2}$, a single term. The principal part is exactly $\{z^{-2}\}$ — **finitely many** negative-power terms, with the most negative exponent being $-2$, so this is classified as a **pole of order 2**, matching the limiting-behavior classification exactly, now confirmed by a purely algebraic count of terms rather than a limiting argument.

**Example 3 (LO2/LO3 — the essential case, reusing $e^{1/z}$, breaking MC-3)**: `math.cx.singularities` established $f(z)=e^{1/z}$ has an essential singularity at $z_0=0$ (path-dependent: blows up along one path, vanishes along another, oscillates along a third). Substituting $w=1/z$ into the known Taylor series $e^w=\sum_{n=0}^\infty\frac{w^n}{n!}$: $e^{1/z}=\sum_{n=0}^\infty\frac{1}{n!\,z^n}=1+\frac1z+\frac1{2z^2}+\frac1{6z^3}+\cdots$. The principal part has **infinitely many** nonzero negative-power terms ($z^{-1},z^{-2},z^{-3},\dots$, all with nonzero coefficients $1/n!$) — matching the essential classification exactly, now visible directly from the algebraic structure of the series, without needing to trace limiting behavior along multiple approach paths at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Principal Part Is the Genuinely New Ingredient (Primitive P11: Representation Shift)

State: "everything about an ordinary power series — radius of convergence, term-by-term manipulation — carries over unchanged; the ONLY new idea is allowing negative powers, which is exactly what's needed to describe behavior AT an isolated singularity itself." Work Example 1's derivation, explicitly noting its principal part is empty, making it feel like "just" a power series.

- **MC-1 hook**: ask "is a Laurent series fundamentally a different kind of object from an ordinary power series, requiring entirely new manipulation techniques?" — a "yes" answer reveals MC-1 (missing that the analytic part behaves exactly like an ordinary power series, and the only new tool is allowing negative powers).

### Teaching Action A02 — Same Three-Way Classification, Two Different Tests (Primitive P06: Contrast Pair)

Contrast all three examples side by side: $\sin z/z$ (zero principal part → removable), $1/z^2$ (finite principal part, order 2 → pole), $e^{1/z}$ (infinite principal part → essential) — the EXACT same three functions and classifications already established in `math.cx.singularities` via limiting behavior, now reclassified by literally counting terms in the Laurent expansion. State: "these are not two competing theories — they are two different WINDOWS onto the identical fact about a function's behavior near a singularity."

- **MC-2 hook**: ask "if a function's Laurent series has a nonzero coefficient in front of $z^{-2}$ but nothing more negative than that, could it still be an essential singularity?" — a "yes" answer reveals MC-2 (missing that a FINITE principal part, no matter how many terms, always means a pole, never essential).

### Teaching Action A03 — Algebra First, Contour Integral Only When Forced (Primitive P28: Conflict Evidence)

Present the direct evidence: none of the three worked examples required evaluating $a_n=\frac{1}{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}dz$ — every coefficient came from substituting a known series. State: "the contour-integral formula is the DEFINITION and guarantees uniqueness, but in practice, algebraic substitution of familiar series is almost always faster and is the standard first approach."

- **MC-3 hook**: ask "must every Laurent series coefficient be found by directly evaluating the contour integral formula?" — a "yes" answer reveals MC-3 (missing that algebraic substitution of known series is the standard, far faster technique).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the Laurent series of $\frac{\cos z-1}{z^2}$ about $z_0=0$ by substituting the known Taylor series for $\cos z$, and state whether its principal part is zero, finite, or infinite.
  2. Given the Laurent series of some $g(z)$ has nonzero terms at $z^{-1}$ and $z^{-3}$ but none more negative, classify the singularity at $z_0=0$ and state the pole's order.
  3. Find the Laurent series of $\frac{1}{z(z-1)}$ in the annulus $0<|z|<1$ using the geometric series expansion of $\frac1{1-z}$, and identify its principal part.
  4. Explain, without doing any new computation, why the classification you get from a function's Laurent series principal part must always agree with the classification you would get from checking its limiting behavior directly.
- **P76 (Transfer Probe, mode = independence)**: "An electrical engineer models a filter's transfer function as $H(s)=\dfrac{1}{s^2}e^{1/s}$ near $s=0$ (a combination of the pole and essential-singularity examples from this lesson). (a) Using algebraic substitution of known series (not the contour-integral formula), find the Laurent series of $H(s)$ about $s_0=0$. (b) Based on the principal part's structure, classify the singularity at $s=0$ — is it more like a pole, an essential singularity, or something distinct from both individual pieces? (c) A colleague argues 'since one factor contributes a pole and the other an essential singularity, the combination must average out to something in between, like a higher-order pole.' Using your actual Laurent series from part (a), explain specifically why this averaging intuition is wrong."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAURENT-SERIES-AS-UNRELATED-NEW-OBJECT | Believing a Laurent series requires entirely new manipulation techniques unrelated to ordinary power series, missing that the analytic part behaves identically and only negative powers are new | Foundational |
| MC-2 | FINITE-PRINCIPAL-PART-MISCLASSIFIED-AS-ESSENTIAL | Believing a principal part with several nonzero terms (but finitely many) could indicate an essential singularity, missing that ANY finite principal part, regardless of how many terms, always means a pole | Moderate |
| MC-3 | LAURENT-COEFFICIENTS-REQUIRE-CONTOUR-INTEGRATION | Believing every Laurent coefficient must be computed by directly evaluating the contour integral formula, missing that algebraic substitution of known series is the standard, far more practical technique | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Laurent Series as Unrelated New Object") → P41 (detect: ask a student whether ordinary power-series manipulation skills transfer to Laurent series, checking for "no") → P64 (conceptual shift: re-walk Example 1, re-anchoring on "the analytic part is literally an ordinary power series; only the principal part is new").
- **B02 (targets MC-2)**: P27 (name it: "Finite Principal Part Misclassified as Essential") → P41 (detect: present a principal part with exactly 3 nonzero terms and ask whether it could be essential, checking for "yes") → P64 (conceptual shift: re-walk Example 2's single-term pole alongside Example 3's genuinely infinite principal part, re-anchoring on "finite, no matter the count, always means pole; only INFINITE means essential").
- **B03 (targets MC-3)**: P27 (name it: "Laurent Coefficients Require Contour Integration") → P41 (detect: ask a student how they would find a Laurent series' coefficients, checking whether they immediately reach for the contour integral rather than known-series substitution) → P64 (conceptual shift: re-walk all three worked examples, none of which needed the contour integral formula, re-anchoring on "algebraic substitution first; the contour formula is the underlying definition, rarely the computational tool").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.singularities` (the removable/pole/essential classification via limiting behavior, reclassified here via an equivalent algebraic test on the Laurent series' principal part — this concept deliberately reuses the SAME three functions, $\sin z/z$, $1/z^2$, $e^{1/z}$, already established there), `math.cx.power-series-cx` (ordinary power series, whose ratio-test/radius-of-convergence machinery carries over unchanged to the Laurent series' analytic part).
- **Unlocks**: `math.cx.residue-theorem` (uses the Laurent series' $a_{-1}$ coefficient — the residue — directly for contour integral evaluation).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier; the concept is appropriately compact given it directly reuses `math.cx.singularities`'s own three worked functions rather than introducing new example material, letting the entire lesson focus on the NEW algebraic-classification lens rather than re-teaching what a removable/pole/essential singularity is.
- **Division of labor**: `math.cx.singularities` owns classification via LIMITING BEHAVIOR (boundedness, blow-up, path-dependence along multiple approach paths) — a purely qualitative, geometric test. This concept, `math.cx.laurent-series`, deliberately does not re-derive that limiting-behavior reasoning; it owns the ALGEBRAIC/SERIES-STRUCTURE test (counting terms in the principal part) on the exact same three functions, explicitly connected as "two windows onto the same fact" in TA-A02, rather than presented as a competing or redundant classification method.
- All three worked examples deliberately reuse the identical functions from `math.cx.singularities` (rather than introducing new ones) specifically so the Laurent-series classification can be checked directly against the already-established limiting-behavior classification — the strongest possible form of cross-blueprint reinforcement, even though `math.cx.singularities` is a `requires` dependency rather than a formal `cross_link`.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in both prerequisites; combined directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2/LO3, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

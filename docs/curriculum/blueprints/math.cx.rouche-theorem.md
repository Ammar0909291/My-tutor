# Teaching Blueprint: Rouché's Theorem (`math.cx.rouche-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.rouche-theorem` |
| name | Rouché's Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.cx.argument-principle` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in the argument principle and winding numbers; Rouché is the argument principle's principal applied corollary |
| description (KG) | If |f(z)−g(z)|<|g(z)| on a simple closed contour C, then f and g have the same number of zeros inside C. Used to count zeros of polynomials and prove FTA. Easy to apply when the dominant term is clear. |

## Component 1 — Learning Objectives

- LO1: State **Rouché's Theorem** — if $f$ and $g$ are holomorphic inside and on a simple closed contour $C$, and $|f(z)-g(z)|<|g(z)|$ for all $z\in C$, then $f$ and $g$ have the **same number of zeros** (counted with multiplicity) inside $C$ — and correctly identify the hypothesis as a DOMINATION condition on the contour (not in the interior).
- LO2: Apply Rouché's Theorem to **count zeros of polynomials** by choosing a dominant term $g$ and verifying the domination condition $|f-g|<|g|$ on an appropriate circle, recognizing that the "easy" direction is to let $g$ be the dominant monomial and $f$ be the full polynomial.
- LO3: Derive the **Fundamental Theorem of Algebra** as a corollary of Rouché's Theorem — for $p(z)=a_nz^n+\cdots+a_0$, take $g(z)=a_nz^n$ and $C=|z|=R$ for large $R$; show the domination condition holds, conclude $p$ and $g$ have the same number of zeros inside $|z|=R$; since $g$ has $n$ zeros (all at the origin), $p$ has $n$ zeros.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.argument-principle` (the argument principle: $\frac{1}{2\pi i}\oint_C\frac{f'}{f}\,dz = Z - P$ counts zeros minus poles; winding numbers; the connection between contour integrals and counts of zeros).

## Component 3 — Core Explanation

**Rouché's Theorem**: let $f,g$ be holomorphic on and inside a simple closed contour $C$. If $|f(z)-g(z)|<|g(z)|$ for all $z\in C$, then $f$ and $g$ have the same number of zeros (counted with multiplicity) inside $C$.

**Proof via the argument principle**: the number of zeros of $h$ inside $C$ is $\frac{1}{2\pi i}\oint_C\frac{h'}{h}\,dz=\frac{1}{2\pi}\Delta_C\arg h$ (the winding number of $h(C)$ around the origin). Consider $h_t(z)=g(z)+t(f(z)-g(z))$ for $t\in[0,1]$: at $t=0$, $h_0=g$; at $t=1$, $h_1=f$. The hypothesis $|f-g|<|g|$ on $C$ implies $|h_t(z)-g(z)|=|t||f(z)-g(z)|<|g(z)|$, so for all $t\in[0,1]$ and $z\in C$, $h_t(z)\neq0$ (since $|h_t(z)|\ge|g(z)|-|h_t(z)-g(z)|>0$). So the winding number $\frac{1}{2\pi}\Delta_C\arg h_t$ is a continuous integer-valued function of $t$, hence constant. At $t=0$ it equals the zero count of $g$; at $t=1$ it equals the zero count of $f$ — therefore equal.

**Why the hypothesis must be on the contour**: the domination $|f-g|<|g|$ only needs to hold on $C$, not inside it. This makes the theorem easy to verify: check a pointwise inequality on the curve, not an interior estimate.

**Standard application template**: to count zeros of a complicated function $f$ inside $|z|=R$: (1) identify the "dominant" part — call it $g$ — that is easy to analyze; (2) show $|f(z)-g(z)|<|g(z)|$ for all $z$ on $|z|=R$ (use the triangle inequality and $|z|=R$); (3) count zeros of $g$ (usually obvious — a monomial has all zeros at the origin); (4) conclude $f$ has the same count.

## Component 4 — Worked Examples

**Example 1 (LO1 — the domination condition, breaking MC-1)**: Consider $f(z)=z^5+3z^3+7$ and count its zeros inside $|z|=2$. Let $g(z)=z^5$ (dominant term on the large circle). Check the condition on $|z|=2$: $|f(z)-g(z)|=|3z^3+7|\le3|z|^3+7=3\cdot8+7=31$. And $|g(z)|=|z|^5=32$. Since $31<32$, the condition $|f-g|<|g|$ holds on $|z|=2$. By Rouché, $f$ has the same number of zeros inside $|z|=2$ as $g(z)=z^5$ — which has 5 zeros (all at $z=0$, with multiplicity 5). Therefore $f$ has exactly **5 zeros** inside $|z|=2$. This uses the fact that a degree-5 polynomial has exactly 5 zeros in $\mathbb{C}$ (FTA), all of which must lie inside $|z|=2$ since the domination check bounds the zeros.

**Example 2 (LO2 — applying Rouché to locate zeros on different annuli)**: Count the zeros of $f(z)=z^4+iz^3+3$ inside $|z|=2$ and inside $|z|=1$. For $|z|=2$: let $g(z)=z^4$; $|f-g|=|iz^3+3|\le|z|^3+3=8+3=11<16=|z|^4=|g|$ on $|z|=2$. So $f$ has 4 zeros inside $|z|=2$ (same as $z^4$). For $|z|=1$: let $g(z)=3$ (dominant constant on small circle); $|f-g|=|z^4+iz^3|=|z^3||z+i|\le|z|^3(|z|+1)=1\cdot2=2<3=|g|$ on $|z|=1$. So $f$ has 0 zeros inside $|z|=1$ (same as $g(z)=3$). Conclusion: all 4 zeros lie in the annulus $1\le|z|\le2$.

**Example 3 (LO3 — FTA as a corollary)**: Let $p(z)=a_nz^n+a_{n-1}z^{n-1}+\cdots+a_0$ with $a_n\neq0$. Take $g(z)=a_nz^n$ and $C=\{|z|=R\}$ for $R$ large enough. On $C$: $|p(z)-g(z)|=|a_{n-1}z^{n-1}+\cdots+a_0|\le|a_{n-1}|R^{n-1}+\cdots+|a_0|$ and $|g(z)|=|a_n|R^n$. For large $R$, $|a_n|R^n\gg|a_{n-1}|R^{n-1}+\cdots+|a_0|$ (the dominant term grows faster), so $|p-g|<|g|$ on $|z|=R$. By Rouché, $p$ has the same number of zeros inside $|z|=R$ as $g(z)=a_nz^n$ — which has exactly $n$ zeros (all at the origin, with multiplicity $n$). Therefore $p$ has exactly $n$ zeros inside $|z|=R$ (for large enough $R$, this captures all zeros). This is FTA: every degree-$n$ polynomial has exactly $n$ zeros in $\mathbb{C}$ (counted with multiplicity), derived purely from Rouché without the Liouville argument.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Domination Condition and What It Guarantees (Primitive P11: Representation Shift)

State Rouché's theorem, emphasizing the condition holds ON the contour (not inside) and the conclusion is equal zero COUNTS (not equal zeros). Work Example 1 step by step: identify $g$, check $|f-g|<|g|$ on $|z|=2$ numerically, read off the count.

- **MC-1 hook**: ask "does the domination condition $|f(z)-g(z)|<|g(z)|$ need to hold for ALL $z$ inside the contour $C$, or only on the contour itself?" — an "inside too" answer reveals MC-1 (the condition is only on $C$, making it checkable by a pointwise inequality on the boundary curve).

### Teaching Action A02 — Using Rouché to Locate Zeros in Annuli (Primitive P25: Deductive)

Work Example 2: apply Rouché twice — once with a large circle, once with a small circle — to locate zeros in an annular region. Emphasize the CHOICE of dominant term $g$: on a large circle, the highest-degree term dominates; on a small circle, the constant term or a low-degree term dominates.

### Teaching Action A03 — FTA as a Rouché Corollary (Primitive P37: Classify)

Work Example 3: derive FTA from Rouché, identifying the "for large enough $R$" argument that makes the domination condition hold. State: "this gives a second independent proof of FTA — alongside the Liouville proof — using the argument principle instead of boundedness." Compare the two routes: Rouché (counts zeros directly via the winding number) vs. Liouville (argues by contradiction from boundedness).

- **MC-2 hook**: ask "in the FTA proof via Rouché, why is the large-$R$ choice of circle important — what goes wrong for small $R$?" — a "nothing, any $R$ works" answer reveals MC-2 (missing that the domination $|p-g|<|g|$ only holds when $R$ is large enough for the leading term to dominate the lower-order terms — for small $R$, the lower-order terms may win).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State Rouché's theorem precisely, identifying all hypotheses (holomorphicity conditions, domination condition, where it must hold) and the conclusion (what exactly is equal between $f$ and $g$).
  2. Count the zeros of $f(z)=z^6+10z^2+2$ inside $|z|=2$ using Rouché. Identify your choice of $g$, verify the domination condition explicitly, and state the count.
  3. Show that the polynomial $p(z)=z^5+2z^3+z-6$ has exactly one zero inside $|z|=1$ using Rouché (hint: compare with $g(z)=-6$).
  4. Use Rouché's theorem to prove that if $|a|>e$ then $f(z)=e^z-az^n$ has exactly $n$ zeros inside the unit disk $|z|<1$.
- **P76 (Transfer Probe, mode = independence)**: "In control theory, the stability of a linear time-invariant system is determined by the locations of the poles of its transfer function $H(s)=N(s)/D(s)$ — the system is stable if and only if all poles of $H$ lie in the left half-plane $\mathrm{Re}(s)<0$. (a) The Nyquist criterion in control theory uses a winding-number argument: if the Nyquist contour (a large semicircle enclosing the right half-plane) is mapped by $1+H(s)$, the number of clockwise encirclements of the origin equals the number of unstable poles. Using this lesson's argument-principle foundation for Rouché's theorem, explain why counting winding numbers is equivalent to counting zeros/poles inside a contour. (b) Suppose a nominal stable system $D_0(s)$ is perturbed to $D_0(s)+\Delta(s)$. Using Rouché's theorem (with $g=D_0$ and $f=D_0+\Delta$), state a sufficient condition on $|\Delta(j\omega)|$ for all real $\omega$ (on the imaginary axis) that guarantees the perturbed system remains stable — and explain why this is a robustness guarantee."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ROUCHE-DOMINATION-MUST-HOLD-INSIDE | Believing the domination condition $|f(z)-g(z)|<|g(z)|$ must hold for all $z$ inside the contour $C$ (not just on $C$), making the theorem harder to apply and missing that the pointwise check on the boundary curve suffices | Foundational |
| MC-2 | FTA-VIA-ROUCHE-ANY-RADIUS-WORKS | Believing that in the FTA proof via Rouché, any choice of circle radius $R$ makes the domination condition hold, missing that $R$ must be large enough for the leading monomial to dominate the lower-order terms on $|z|=R$ | Moderate |
| MC-3 | ROUCHE-GIVES-SAME-ZERO-LOCATIONS | Believing Rouché's theorem concludes that $f$ and $g$ have the same ZEROS (same locations), not just the same NUMBER of zeros — missing that the theorem is a counting result, not a location result | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Rouché Domination Must Hold Inside") → P41 (detect: ask where exactly the domination condition must hold for Rouché to apply) → P64 (conceptual shift: re-state the hypothesis — "for all $z\in C$" (on the curve) — and explain why: the proof uses continuity of the zero count as a function of $t$ on $C$, not an interior estimate; the interior geometry is irrelevant).
- **B02 (targets MC-2)**: P27 (name it: "FTA via Rouché Any Radius Works") → P41 (detect: ask for small $R$, say $R=0.01$, whether the domination condition holds for $z^5+2z^3+z-6$) → P64 (conceptual shift: compute — on $|z|=0.01$, the lower-degree terms $(-6)$ dominate, not $z^5$; so the domination fails for the leading-term choice of $g$ — a different $g$ would be needed for a small circle, and "large enough $R$" is exactly the condition that makes the leading term win).
- **B03 (targets MC-3)**: P27 (name it: "Rouché Gives Same Zero Locations") → P41 (detect: ask whether $f$ and $g$ have their zeros at the same points after applying Rouché) → P64 (conceptual shift: re-state the conclusion — "SAME NUMBER," not "same locations" — and give a concrete example: $f(z)=z^5+3z^3+7$ and $g(z)=z^5$ have all zeros at different locations ($f$'s 5 zeros are spread around the complex plane; $g$'s 5 zeros are all at $z=0$), yet Rouché correctly gives them the same COUNT inside $|z|=2$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.argument-principle` (the argument principle — $\frac{1}{2\pi i}\oint_C\frac{f'}{f}\,dz$ counts zeros minus poles — and winding numbers — since Rouché's proof is a continuity argument on the winding number).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply bloom tag and mastery_threshold = 0.8 (MAMR 4/5) places this at the "3 TAs + gate" tier. The apply bloom level is reflected in the gate: Problems 2, 3, and 4 all require choosing $g$, verifying the domination condition, and reading off the zero count — not just reciting the theorem.
- The two-circle technique (Example 2, A02) is the most practically useful skill this lesson teaches: locating zeros in annular regions by applying Rouché with different radii. This technique appears in stability analysis, polynomial root-finding, and perturbation theory.
- The FTA-via-Rouché derivation (A03) serves a dual purpose: it is a landmark application in its own right, AND it provides a direct contrast with the Liouville-based FTA proof from `math.cx.fundamental-theorem-algebra`, reinforcing that a single theorem can have genuinely different proofs.
- The control-theory transfer probe was chosen because Rouché's zero-counting stability criterion is one of the most direct applications of this theorem in applied mathematics, and the connection to the Nyquist criterion makes the winding-number foundation of Rouché concrete for engineers and applied scientists.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.argument-principle`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in the argument principle and winding numbers) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

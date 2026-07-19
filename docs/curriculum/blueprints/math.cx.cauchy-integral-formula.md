# Teaching Blueprint: Cauchy Integral Formula (`math.cx.cauchy-integral-formula`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.cauchy-integral-formula` |
| name | Cauchy Integral Formula |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.cx.cauchy-theorem` |
| unlocks | `math.cx.higher-derivatives` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct extension of the already-known 1/z contour-integral fact into a general recovery formula |
| description (KG) | If f is holomorphic on and inside a simple closed curve C, then f(z₀) = (1/2πi)∮_C f(z)/(z−z₀)dz for z₀ inside C. Recovers function values from boundary values. Foundation of all deeper complex analysis. |

## Component 1 — Learning Objectives

- LO1: State the **Cauchy Integral Formula** precisely: if $f$ is holomorphic on and inside a simple closed curve $C$, then for any $z_0$ **strictly inside** $C$, $f(z_0) = \frac{1}{2\pi i}\oint_C \frac{f(z)}{z-z_0}\,dz$ — and correctly verify all its hypotheses (holomorphicity on and inside $C$; $z_0$ genuinely interior, not on or outside $C$) before applying it.
- LO2: Apply the formula directly to EVALUATE contour integrals of the form $\oint_C \frac{f(z)}{z-z_0}\,dz$ by recognizing the integral equals $2\pi i\cdot f(z_0)$ — turning a potentially difficult direct contour integration into a simple evaluation of $f$ at one point.
- LO3: Recognize the profound structural implication: a holomorphic function's values EVERYWHERE INSIDE a curve are completely determined by its values ON the curve's boundary alone — directly refuting the misconception that the formula is merely a computational shortcut, rather than a statement about a deep rigidity property unique to holomorphic functions with no real-analysis analogue.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.cauchy-theorem` ($\oint_C f(z)\,dz=0$ for $f$ holomorphic on a simply connected domain, and the counterexample $\oint_C\frac1z\,dz=2\pi i$ when a singularity is enclosed).

## Component 3 — Core Explanation

**The formula, and why it's surprising**: for $f$ holomorphic on and inside a simple closed curve $C$, and $z_0$ any point STRICTLY inside $C$, the Cauchy Integral Formula states $f(z_0)=\frac{1}{2\pi i}\oint_C\frac{f(z)}{z-z_0}\,dz$. This says the single number $f(z_0)$ — the function's value at ONE interior point — can be recovered ENTIRELY from an integral involving only the function's values ON the boundary curve $C$, with no reference to the function's behavior anywhere else inside. Nothing like this holds for general real-valued functions of a real variable; it is a structural consequence of holomorphicity specifically.

**Where the formula comes from, connected to already-known territory**: the integrand $\frac{f(z)}{z-z_0}$ has a singularity exactly at $z=z_0$ (division by zero there) — this is why the formula doesn't simply reduce to Cauchy's Theorem giving zero: $f(z)/(z-z_0)$ is NOT holomorphic at $z_0$ (a point strictly inside $C$), so Cauchy's Theorem's hypothesis fails there. In fact, the formula's structure directly generalizes the already-known fact $\oint_C\frac{1}{z}\,dz=2\pi i$ (from `math.cx.cauchy-theorem`'s own counterexample, the case $f\equiv1$, $z_0=0$): plugging $f(z_0)=1$ into the Cauchy Integral Formula gives $\oint_C\frac{1}{z-0}\,dz = 2\pi i\cdot1=2\pi i$ — exactly matching that already-established fact.

**Using the formula to EVALUATE integrals, and its rigidity implication**: rather than computing $\oint_C\frac{f(z)}{z-z_0}\,dz$ directly (which could be a difficult parametrized contour integral), the formula lets you simply evaluate $f$ at the single point $z_0$ and multiply by $2\pi i$ — turning integration into simple function evaluation. The deeper implication is that a holomorphic function is extraordinarily RIGID: its entire behavior throughout the interior of a region is locked in by its boundary values alone, a "boundary determines interior" property that is the foundation for essentially all deeper results in complex analysis (Taylor series existence, Liouville's theorem, the maximum modulus principle, and more).

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying hypotheses, then applying directly)**: Let $f(z)=z^2+1$ (entire, holomorphic everywhere) and $C$ the circle $|z|=2$, with $z_0=1$ (check: $|1|=1<2$, so $z_0$ is strictly inside $C$). Both hypotheses hold ($f$ holomorphic on and inside $C$; $z_0$ genuinely interior). Applying the formula: $\oint_C\frac{z^2+1}{z-1}\,dz = 2\pi i\cdot f(1) = 2\pi i(1^2+1)=4\pi i$ — computed WITHOUT ever parametrizing or directly integrating around the circle.

**Example 2 (LO2 — the formula as a fast evaluation tool)**: Evaluate $\oint_C\frac{\sin z}{z-\pi/2}\,dz$ where $C$ is $|z|=2$ (check: $|\pi/2|\approx1.57<2$, so $z_0=\pi/2$ is inside $C$). Direct parametrized contour integration would be tedious; instead, apply the formula directly: $\oint_C\frac{\sin z}{z-\pi/2}\,dz = 2\pi i\cdot\sin(\pi/2) = 2\pi i(1)=2\pi i$ — the entire contour integral collapses to evaluating $\sin$ at one point.

**Example 3 (LO3 — verifying the connection to the known 1/z fact, and the interior-only requirement, breaking MC-1)**: Set $f(z)\equiv1$ (constant, trivially holomorphic everywhere) and $z_0=0$, with $C$ the unit circle $|z|=1$. The Cauchy Integral Formula gives $\oint_C\frac{1}{z-0}\,dz = 2\pi i\cdot f(0) = 2\pi i(1)=2\pi i$ — EXACTLY matching `math.cx.cauchy-theorem`'s own already-established fact $\oint_C\frac1z\,dz=2\pi i$, confirming the formula's consistency with prior knowledge. Now check what happens if $z_0=2$ (OUTSIDE the unit circle $C$, since $|2|=2>1$): the formula's hypothesis (z_0 strictly inside $C$) FAILS, so the formula does not apply at all — in fact, since $\frac{f(z)}{z-2}=\frac{1}{z-2}$ IS holomorphic everywhere ON AND INSIDE the unit circle (its only singularity, $z=2$, lies OUTSIDE), Cauchy's Theorem (not the Integral Formula) applies instead, giving $\oint_C\frac{1}{z-2}\,dz=0$ — a completely different formula and a completely different answer, purely because $z_0$ moved from inside to outside the curve.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula's Surprising Content, Verified Against Known Territory (Primitive P11: Representation Shift)

State: "this formula says something remarkable — one single interior value is completely recoverable from an integral around the boundary. Nothing in ordinary real calculus works this way." Work Example 3's direct verification that the formula, applied to $f\equiv1$, exactly reproduces the already-known $\oint_C\frac1z\,dz=2\pi i$ fact — confirming the new formula is consistent with, and directly generalizes, prior knowledge.

### Teaching Action A02 — Using the Formula to Evaluate Integrals Quickly (Primitive P11: Representation Shift)

Work Example 1 and Example 2 directly, emphasizing: "instead of parametrizing and grinding through a contour integral, just check the hypotheses, then evaluate $f$ at the one point $z_0$ and multiply by $2\pi i$." Contrast the simplicity of this approach against how tedious direct contour integration of $\frac{\sin z}{z-\pi/2}$ would otherwise be.

### Teaching Action A03 — Interior vs. Exterior: The Formula Only Applies to Points Inside C (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: the SAME setup ($f(z)=1/(z-z_0)$-style integrand) gives $2\pi i$ when $z_0$ is inside $C$, but $0$ (via Cauchy's Theorem instead) when $z_0$ is outside — a completely different rule applies depending on interior vs. exterior placement. State: "always check FIRST whether $z_0$ is inside the curve. If it's outside, the integrand $f(z)/(z-z_0)$ is holomorphic everywhere on and inside $C$, so Cauchy's THEOREM (not the Integral Formula) applies instead, giving zero."

- **MC-1 hook**: ask "does the Cauchy Integral Formula give the same kind of answer regardless of whether $z_0$ is inside or outside the curve $C$?" — a "yes" answer reveals MC-1 (failing to check whether $z_0$ is genuinely interior, missing that the formula's hypothesis is essential and a different rule entirely — Cauchy's Theorem, giving zero — applies when $z_0$ is outside).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Evaluate $\oint_C\frac{e^z}{z-1}\,dz$ where $C$ is $|z|=3$, verifying first that $z_0=1$ is inside $C$.
  2. Evaluate $\oint_C\frac{\cos z}{z}\,dz$ where $C$ is $|z|=1$, using the Cauchy Integral Formula with $f(z)=\cos z$ and $z_0=0$.
  3. For $\oint_C\frac{z^2}{z-5}\,dz$ where $C$ is $|z|=2$, determine whether $z_0=5$ is inside or outside $C$, and state (without necessarily computing further) which rule (Cauchy's Theorem or the Cauchy Integral Formula) applies, and why.
  4. Explain, in your own words, why the Cauchy Integral Formula is described as revealing that a holomorphic function is "rigid" — using the idea that boundary values completely determine interior values.
- **P76 (Transfer Probe, mode = independence)**: "An engineer working with a holomorphic function $f(z)$ representing a physical field needs to determine the field's value at an interior point $z_0=i$ of a region bounded by the circle $|z|=3$, but can only directly measure the field's values along the boundary curve. (a) Explain, using the Cauchy Integral Formula, how the engineer could in principle recover $f(i)$ purely from boundary measurements, without needing any interior measurements at all. (b) Explain why this recovery would NOT be possible for an arbitrary (non-holomorphic) physical field — what specifically about holomorphicity makes this boundary-to-interior recovery valid? (c) If the engineer mistakenly tried to apply the same reasoning to a point $z_0=5$ (outside the circle $|z|=3$), explain what would go wrong, and what the correct value of the corresponding contour integral would be instead, referencing Example 3's interior/exterior contrast."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INTERIOR-EXTERIOR-DISTINCTION-FOR-Z0-IGNORED | Applying the Cauchy Integral Formula without checking whether $z_0$ is genuinely inside the curve $C$, missing that a different rule (Cauchy's Theorem, giving zero) applies when $z_0$ is outside | Foundational |
| MC-2 | CAUCHY-INTEGRAL-FORMULA-TREATED-AS-MERE-COMPUTATIONAL-TRICK | Viewing the formula only as a shortcut for evaluating integrals, without recognizing its deeper structural meaning — that holomorphic functions are entirely determined by their boundary values | Foundational |
| MC-3 | INTEGRAND-SINGULARITY-AT-Z0-OVERLOOKED-AS-A-PROBLEM | Failing to recognize why $f(z)/(z-z_0)$ is not itself holomorphic at $z_0$ (hence why Cauchy's Theorem alone doesn't apply directly, requiring the separate Cauchy Integral Formula machinery) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Interior-Exterior Distinction Ignored") → P41 (detect: give an integral with $z_0$ outside the curve and ask a student to apply the Cauchy Integral Formula directly, checking whether they verify $z_0$'s position first) → P64 (conceptual shift: re-walk Example 3's direct contrast — $2\pi i$ when inside, $0$ (via Cauchy's Theorem) when outside — re-anchoring on "ALWAYS check interior vs. exterior first; they are governed by entirely different rules").
- **B02 (targets MC-2)**: P27 (name it: "Cauchy-Integral-Formula-as-Mere-Trick View") → P41 (detect: ask a student what the formula MEANS, beyond "a way to compute integrals fast") → P64 (conceptual shift: re-anchor on "boundary values completely determine interior values — this is a statement about how special holomorphic functions are, with the fast-computation use being a convenient side-benefit, not the main point").
- **B03 (targets MC-3)**: P27 (name it: "Integrand Singularity at z0 Overlooked") → P41 (detect: ask why Cauchy's Theorem alone (giving zero) doesn't apply directly to $\oint_C\frac{f(z)}{z-z_0}\,dz$ when $z_0$ is inside $C$) → P64 (conceptual shift: re-anchor on "the integrand $f(z)/(z-z_0)$ itself has a singularity exactly at $z_0$ — since $z_0$ is inside $C$, this integrand is NOT holomorphic throughout the interior, so Cauchy's Theorem's hypothesis genuinely fails there, which is precisely why the separate Cauchy Integral Formula is needed").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.cauchy-theorem` ($\oint_Cf(z)\,dz=0$ for holomorphic $f$ on a simply connected domain, and the $\oint_C\frac1z\,dz=2\pi i$ counterexample this concept's formula directly generalizes and remains consistent with).
- **Unlocks**: `math.cx.higher-derivatives` (differentiating the Cauchy Integral Formula under the integral sign yields formulas for ALL derivatives of $f$, directly building on this concept).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the formula's content, verified against known territory), A02 (using it to evaluate integrals), and A03 (the interior/exterior distinction) each target a distinct LO, appropriate for a foundational result whose difficulty lies in both correct hypothesis-checking and appreciating its structural significance.
- Example 3 was deliberately designed to directly verify the new formula against `math.cx.cauchy-theorem`'s own already-established fact ($\oint_C\frac1z\,dz=2\pi i$) as its FIRST use, before showing the interior/exterior contrast — this ordering builds confidence that the new formula is a genuine, consistent generalization rather than an unrelated new rule to memorize separately.
- MC-2 (treating the formula as a mere computational trick) was given Foundational severity because a student who only sees the formula as a shortcut will not correctly anticipate WHY it generalizes to power-series representability, Liouville's theorem, and the other deep results `math.cx.higher-derivatives` and beyond depend on — the rigidity framing is essential scaffolding for everything that follows.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct extension of the already-known 1/z fact) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

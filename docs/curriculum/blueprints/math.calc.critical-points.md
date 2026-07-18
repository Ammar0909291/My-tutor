# Teaching Blueprint: Critical Points (`math.calc.critical-points`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.critical-points` |
| name | Critical Points |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.derivative-rules` |
| unlocks | `math.calc.local-extrema`, `math.calc.optimization` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — graph with visible flat/sharp points before the formal $f'(c)=0$-or-undefined definition |
| description (KG) | Points where f'(c) = 0 or f'(c) is undefined; candidates for local maxima, minima, and inflection points. |

## Component 1 — Learning Objectives

- LO1: Define a **critical point** of $f$ as a value $c$ in the domain of $f$ where **either** $f'(c)=0$ **or** $f'(c)$ is undefined, and correctly find all critical points of a given function by solving $f'(x)=0$ and separately checking for points where $f'$ fails to exist.
- LO2: Recognize that critical points are only **candidates** for local extrema (or inflection points) — not every critical point is actually a local max/min — and correctly identify examples where a critical point is neither.
- LO3: Correctly distinguish a critical point that arises from $f'(c)=0$ (a "smooth" flat point, e.g. the vertex of a parabola) from one arising because $f'(c)$ is **undefined** (e.g. a sharp corner or a vertical tangent), since these require different graphical/analytical handling.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-rules` (power rule, sum/difference rule, constant multiple rule — enough to differentiate polynomials and locate where the derivative equals zero).

## Component 3 — Core Explanation

A **critical point** of a function $f$ is a value $c$ in the **domain of $f$** such that either:
1. $f'(c) = 0$ (the tangent line is horizontal at $c$), or
2. $f'(c)$ is **undefined** (the derivative fails to exist at $c$ — e.g. a sharp corner, a cusp, or a vertical tangent).

**Both conditions require $c$ to be in the domain of $f$ itself** — a value where $f$ isn't even defined can never be a critical point, even if a derivative-like expression seems to blow up there.

**Critical points are candidates, not guarantees**: they are exactly the *only* places a local maximum or minimum can occur (this is a necessary condition, from Fermat's theorem on local extrema), but not every critical point actually is one — a critical point can also be a **saddle-like flat point** (neither max nor min, e.g. $f(x)=x^3$ at $x=0$) or an **inflection point** with a flat tangent. Determining *which* a given critical point is requires further work (first or second derivative test), covered in the next concept.

**Two structurally different sources of critical points**: solving $f'(x)=0$ finds the "smooth flat" critical points; separately checking where $f'(x)$ fails to exist (typically visible on the graph as a corner, cusp, or vertical tangent, or algebraically as a point where the derivative formula involves division by an expression that vanishes) finds the "non-smooth" critical points. Both must be checked — a common error is finding only one type.

## Component 4 — Worked Examples

**Example 1 (LO1 — solving f'(x)=0)**: $f(x)=x^3-3x$. $f'(x)=3x^2-3=3(x^2-1)=3(x-1)(x+1)$. Setting $f'(x)=0$: $x=1$ or $x=-1$. Both are in the domain of $f$ (all reals), so both are critical points.

**Example 2 (LO2 — critical point that is neither max nor min, breaking MC-1)**: $f(x)=x^3$. $f'(x)=3x^2$, so $f'(x)=0$ only at $x=0$ — a critical point. But checking the graph/behavior: $f$ is increasing on both sides of $x=0$ (e.g. $f(-1)=-1 < f(0)=0 < f(1)=1$, with no local peak or valley) — $x=0$ is a critical point that is **neither** a local max nor a local min; it's an inflection point with a horizontal tangent.

**Example 3 (LO1/LO3 — undefined-derivative critical point)**: $f(x)=|x|$. For $x\neq 0$, $f'(x) = 1$ (if $x>0$) or $-1$ (if $x<0$) — never zero. But at $x=0$, the left-hand and right-hand derivatives disagree ($-1$ vs. $1$), so $f'(0)$ **does not exist** — $x=0$ is a critical point from the "undefined derivative" category, not from $f'(c)=0$. (Here it genuinely IS a local minimum, unlike Example 2's flat inflection point — illustrating that both categories of critical point can turn out to be genuine extrema, or not, and require the same follow-up analysis either way.)

## Component 5 — Teaching Actions

### Teaching Action A01 — Two Sources of Critical Points (Primitive P11: Representation Shift)

Draw a smooth curve with a clear local max (a "hilltop," tangent horizontal) and a sharp V-shaped corner elsewhere (like $|x|$'s vertex). At the hilltop: "the tangent line here is flat — $f'(c)=0$." At the corner: "there's no single well-defined tangent line here at all — the slope approaching from the left doesn't match the slope approaching from the right, so $f'(c)$ is undefined." State: "both of these are called **critical points** — the definition is deliberately an 'or': $f'(c)=0$ OR $f'(c)$ undefined."

Shift to the symbolic procedure: work Example 1 (solve $f'(x)=0$ algebraically) and Example 3 (check $|x|$'s one-sided derivatives directly) side by side as the two distinct search procedures needed.

- **MC-1 hook**: after finding a critical point via $f'(c)=0$, ask "so is this a local max or min?" before doing any further test — an assumed answer (rather than "we can't tell yet, we need more information") reveals MC-1 (believing every critical point must be a local extremum).

### Teaching Action A02 — Critical Point ≠ Extremum (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1's $x=\pm1$ (genuine local max/min, verifiable by checking nearby function values: $f(1)=-2$ is lower than nearby points, $f(-1)=2$ is higher) directly beside Example 2's $x=0$ for $f(x)=x^3$ (a critical point that is neither, since $f$ is increasing right through it). State clearly: "critical points are the *only candidates* — the theorem tells you WHERE to look, never WHAT you'll find there. You always still need a follow-up check."

**Contrast 2 (targets MC-2, missing the undefined-derivative category)**: Ask students to find all critical points of $f(x)=|x-2|+1$ using only "set $f'(x)=0$." Since $f'(x)$ is never actually zero (it's $\pm1$ everywhere it's defined), a student following only that rule would conclude "no critical points" — missing $x=2$, where $f'$ is undefined. Correct explicitly: "always check BOTH conditions — solving $f'(x)=0$ finds only one kind of critical point; you must separately scan for domain points where the derivative fails to exist."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find all critical points of $f(x)=x^3-6x^2+9x$.
  2. Find all critical points of $g(x)=x^{2/3}$ (hint: check where the power-rule-derived derivative formula is undefined, in addition to solving for zeros).
  3. $h(x)=x^4$ has a critical point at $x=0$. Determine, by checking nearby function values, whether it is a local max, local min, or neither.
  4. A student solves $f'(x)=0$ for a piecewise function and finds two solutions, then states "these are all the critical points." What check did the student skip, and how would you verify whether anything was missed?
- **P76 (Transfer Probe, mode = independence)**: "A company's hourly profit function $P(t) = -t^3+9t^2$ (for $t$ in a realistic working-hours domain) is being analyzed by an analyst who wants to find all 'candidate' times where profit might peak or bottom out. (a) Find all critical points of $P(t)$ algebraically. (b) The analyst's software separately flags a suspicious kink in a DIFFERENT process's profit graph (not this same $P(t)$) at a specific hour, where the profit rate visibly jumps rather than smoothly leveling off — explain why that kink, even without ever computing $P'=0$ there, still counts as a critical point, and what category of critical point it represents."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CRITICAL-POINT-ASSUMED-EXTREMUM | Believing every critical point must be a local maximum or minimum, without checking further | Foundational |
| MC-2 | UNDEFINED-DERIVATIVE-CATEGORY-MISSED | Searching only for points where $f'(x)=0$ and failing to separately check for points where $f'(x)$ is undefined | Foundational |
| MC-3 | OUTSIDE-DOMAIN-POINT-TREATED-AS-CRITICAL | Treating a point outside $f$'s domain (where a derivative-like expression is undefined, but $f$ itself isn't even defined there) as a critical point | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Critical-Point-as-Extremum Assumption") → P41 (detect: give $f(x)=x^3$ and ask directly whether $x=0$ is a local max or min — an answer of "yes, one of them" without qualification reveals MC-1) → P64 (conceptual shift: re-anchor on "critical points are necessary-condition candidates only — Fermat's theorem tells you extrema can ONLY occur at critical points, never that every critical point IS one").
- **B02 (targets MC-2)**: P27 (name it: "Undefined-Derivative Search Skipped") → P41 (detect: give a function like $|x-2|+1$ where $f'$ is never literally zero and ask for all critical points — an answer of "none" reveals MC-2) → P64 (conceptual shift: re-derive from the definition's explicit "or" — two separate searches are always required, not one).
- **B03 (targets MC-3)**: P27 (name it: "Outside-Domain False Critical Point") → P41 (detect: give a function like $f(x)=\frac{1}{x}$ and ask if $x=0$ is a critical point) → P64 (conceptual shift: re-anchor on "a critical point must be IN the domain of $f$ first — $x=0$ isn't even a place $f$ is defined, so the derivative-undefined condition never gets a chance to apply there").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-rules` (power/sum/constant-multiple rules — the computational tool for solving $f'(x)=0$ on polynomials).
- **Unlocks**: `math.calc.local-extrema` (the first/second derivative tests that resolve exactly the "is this critical point actually a max/min?" ambiguity this concept deliberately leaves open), `math.calc.optimization` (real-world max/min problems are solved by first finding critical points, exactly as taught here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at the "2 main TAs + gate" compact tier — A01 (the two-source definition) and A02 (the critical-point-vs-extremum contrast, including the commonly-missed undefined-derivative category) jointly cover all three LOs without needing a third TA, since the concept is narrow (a definition plus a necessary-condition caveat) rather than broad in technique.
- This blueprint was deliberately scoped to stop at "critical point identified, extremum status undetermined" — explicitly NOT teaching the first/second derivative tests that would resolve Example 2's ambiguity, since that is the next concept's (`math.calc.local-extrema`) entire content; teaching it here would duplicate that blueprint's Teaching Actions.
- MC-2 (undefined-derivative category missed) was elevated to Foundational severity alongside MC-1, rather than treated as a minor omission, because in practice it is the single most common source of missed critical points in student work — students overwhelmingly default to "solve $f'(x)=0$" as the entire procedure and need the second search made explicit and habitual.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.derivative-rules`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: graph before formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

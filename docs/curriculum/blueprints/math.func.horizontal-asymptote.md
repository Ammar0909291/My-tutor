# Blueprint: math.func.horizontal-asymptote

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.horizontal-asymptote |
| Title | Horizontal Asymptotes |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.rational-function |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a rational function f(x)=P(x)/Q(x), the student determines the horizontal asymptote (or its absence) using degree comparison (deg P < deg Q → y=0; deg P = deg Q → y=aₙ/bₙ; deg P > deg Q → none), recognises that a function CAN cross its horizontal asymptote (unlike vertical asymptotes), identifies oblique (slant) asymptotes when deg P = deg Q + 1 via polynomial long division, and verifies asymptotic claims by evaluating the function at large x-values.

## Component 2 — CPA Entry Stage
**C — Concrete** (numerical table of f(x) at x=10, 100, 1000 and x=−10, −100, −1000 showing convergence to a finite limit before the algebraic rule is derived)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | HORIZONTAL-NEVER-CROSSED | Student believes the graph can NEVER cross a horizontal asymptote, because vertical asymptotes are never crossed; applies the vertical-asymptote rule universally | Type 1 — overgeneralization (vertical asymptotes are never crossed because the function is undefined there; students transfer this hard rule to horizontal asymptotes, which are a limit statement only — the function can cross its HA finitely many times in the interior) |
| MC-2 | PLUG-IN-LARGE-NUMBER | Student substitutes x=1000 into the function, reads off a value like 2.003, and reports the horizontal asymptote as "y=2.003" — a numerical approximation mistaken for an exact asymptote | Type 5 — instruction-induced (plugging in large numbers is a legitimate checking strategy, but is introduced before the algebraic degree-comparison rule; students stop at the numerical step and never derive the exact limit) |
| MC-3 | OBLIQUE-IS-HORIZONTAL | When deg P = deg Q + 1, the function has an oblique asymptote y=mx+b (a slant line); student either reports no asymptote or reports the y-intercept b as a horizontal asymptote | Type 5 — instruction-induced (the three-case rule for horizontal asymptotes is memorized without the "fourth case" of deg P = deg Q+1; oblique asymptotes require long division and are introduced separately, after the HA rule is already fixed in memory) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of a horizontal asymptote:**

| Representation | Example: f(x)=(2x+1)/(x−3) |
|---|---|
| Algebraic (limit) | lim x→+∞ f(x) = 2; lim x→−∞ f(x) = 2 |
| Graphical | Dashed horizontal line y=2; graph approaches from above or below as x→±∞ |
| Numerical | x=100: f≈2.07; x=1000: f≈2.007; x=−1000: f≈1.993; all converging to 2 |
| Algebraic (degree rule) | deg(2x+1) = deg(x−3) = 1; y = leading coeff ratio = 2/1 = 2 |

**The three-case degree-comparison rule:**

Divide leading terms aₙxⁿ/bₘxᵐ as x→±∞:
- Case 1 (n < m): aₙxⁿ/bₘxᵐ = (aₙ/bₘ)·x^(n−m) → 0. **Horizontal asymptote: y=0.**
- Case 2 (n = m): aₙxⁿ/bₘxⁿ = aₙ/bₙ (constant). **Horizontal asymptote: y=aₙ/bₙ.**
- Case 3 (n > m): aₙxⁿ/bₘxᵐ → ±∞. **No horizontal asymptote.** (May have oblique asymptote if n=m+1.)

**Worked examples:**

| f(x) | deg(P) vs. deg(Q) | Horizontal asymptote |
|---|---|---|
| (3x+1)/(x²+2) | 1 < 2 | y=0 |
| (5x²−2)/(2x²+1) | 2 = 2 | y=5/2 |
| (x³+x)/(x+1) | 3 > 1 | None (has oblique) |
| (4x−1)/(3x+2) | 1 = 1 | y=4/3 |

**Derivation of Case 1 (n < m):** Divide numerator and denominator by xᵐ (largest power):
(3x+1)/(x²+2) = (3/x + 1/x²)/(1 + 2/x²) → 0/1 = 0 as x→∞. ✓

**P49 checkpoint:**
- CORRECT → "Compare degrees: n<m → y=0; n=m → y=leading coeff ratio; n>m → no HA." → A02
- PARTIAL (applies Case 2 rule to Case 1 and gets y=aₙ/bₘ=3/1=3 for (3x+1)/(x²+2)) → "The degree of the numerator is 1; the degree of the denominator is 2. Since 1<2, this is Case 1: the denominator grows faster, pulling f toward 0." → TB-R02 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For f(x)=(2x²+1)/(x²+3): divide every term by x². What does f simplify to as x→∞?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Horizontal asymptote CAN be crossed — gate:**

**Gate question (MC-1):** "Can f(x)=(x²−1)/(x²+1) ever equal 0? If so, does this contradict its horizontal asymptote?"

f(x)=0 when x²−1=0 → x=±1. f(1)=(1−1)/(1+1)=0 and f(−1)=0. The function DOES cross y=0.
lim x→±∞ f(x) = 1 (leading coefficients both 1). Horizontal asymptote: y=1. f never equals 1 (x²−1=x²+1 has no solution). The function approaches y=1 asymptotically but crosses y=0 (not the HA).

**The key distinction:**
- **Vertical asymptotes:** the function is UNDEFINED there; graph CANNOT cross. (Hard constraint.)
- **Horizontal asymptotes:** describe limit AT INFINITY; the function CAN have finite values equal to the HA in the interior. (Soft constraint — only enforced as x→±∞.)

**Counter-example where HA is crossed:** f(x)=sin(x)/x. Horizontal asymptote: y=0 (since |sin(x)/x|≤1/x→0). But f(nπ)=0 for all positive integers n — the function crosses y=0 infinitely many times in the interior.

**Checking the HA algebraically:** Find x where f(x)=L (the HA value). If P(x)=L·Q(x) has solutions, the HA is crossed at those x. If L=aₙ/bₙ (Case 2), P(x)=L·Q(x) may or may not have solutions.

**P49 checkpoint:**
- CORRECT → "Horizontal asymptotes: the function CAN cross them in the interior; they only constrain the tails (x→±∞). This is fundamentally different from vertical asymptotes, where the function is undefined." → A03
- PARTIAL (understands HA can be crossed but can't find where) → "Set f(x)=L (the HA value) and solve the resulting polynomial equation. Any real solution is an x-value where the HA is crossed." → TB-R01 → A03
- INCORRECT → TB-R01 → A03
- NO_RESPONSE → "For f(x)=2/(x²+1), the HA is y=0. Evaluate f(0). Does f(0)=0? Can the graph cross y=0?" → TB-R01 → A03

### A03 — P06 CONTRAST PAIR
**Horizontal vs. oblique asymptotes:**

**When deg P = deg Q + 1 — oblique asymptote:**
Use polynomial long division to write P(x)/Q(x) = (ax+b) + R(x)/Q(x), where deg(R)<deg(Q).
As x→±∞: R(x)/Q(x)→0. So f(x)≈ax+b. The line y=ax+b is the **oblique (slant) asymptote**.

**Worked example:** f(x)=(x²+2x−1)/(x+1).
Long division: x²+2x−1 ÷ (x+1):
x²+2x−1 = (x+1)(x+1) + (−2). So f(x)=(x+1)+(−2/(x+1)).
As x→±∞: −2/(x+1)→0. Oblique asymptote: **y=x+1**.

**Contrast:**
| deg(P) vs. deg(Q) | Asymptote type | Formula |
|---|---|---|
| n < m | Horizontal | y=0 |
| n = m | Horizontal | y=aₙ/bₙ |
| n = m+1 | Oblique (slant) | y=mx+b (from long division) |
| n ≥ m+2 | None (grows unboundedly) | — |

**Can f cross its oblique asymptote?** Yes — same reasoning as horizontal: the oblique asymptote describes tail behavior only.

**Verify an oblique asymptote:** Show f(x)−(ax+b)→0 as x→∞. Equivalently: R(x)/Q(x)→0. ✓

**P49 checkpoint:**
- CORRECT → "Three-case degree rule → HA or no HA. If n=m+1: polynomial long division → oblique asymptote y=mx+b. f can cross both HA and OA in the interior; only vertical asymptotes are never crossed." → Gate (P91)
- PARTIAL (performs long division incorrectly, off-by-one in remainder) → "Verify: multiply (quotient)×(divisor)+remainder and check it equals the original numerator. This confirms the long division." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For f(x)=(x²+3x)/(x−1): the degree of the numerator exceeds the degree of the denominator by exactly 1. Perform long division: x²+3x ÷ (x−1). What is the quotient line?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 HORIZONTAL-NEVER-CROSSED):**
Step 1 — "Vertical asymptotes are at x-values where the function is UNDEFINED (denominator=0). The graph literally has no point there — it cannot cross. Horizontal asymptotes are the function's LIMITING VALUE as x→±∞. The function is perfectly defined for all finite x; there is no rule preventing it from equaling the asymptote value at some finite x." Step 2 — f(x)=x/(x²+1). HA: y=0. f(2)=2/5>0, f(−2)=−2/5<0. Does f ever equal 0? Yes: at x=0, f(0)=0. The graph crosses y=0 at the origin. The HA y=0 is still correct — it describes the tail, not the interior. Step 3 — "Rule: vertical asymptote = never crossed (function undefined there). Horizontal asymptote = describes tails only; crossing is allowed in the interior. These are different kinds of statements."

**TB-R02 (MC-2 PLUG-IN-LARGE-NUMBER):**
Step 1 — "Plugging in a large number gives an APPROXIMATION of the horizontal asymptote, not the exact value. x=1000 gives 2.003 — the true HA is y=2, not 2.003. Numerical checking is useful for verification, but the exact value comes from the degree-comparison algebraic rule." Step 2 — Derive the HA algebraically: divide each term by x^(max degree). For f(x)=(2x+1)/(x−3): divide by x → (2+1/x)/(1−3/x) → 2/1=2 as x→∞. Exact answer: y=2. Step 3 — "Always find the exact HA by the degree-comparison rule. Use large-x numerical evaluation only to VERIFY the exact answer — never as the primary derivation method."

**TB-R03 (MC-3 OBLIQUE-IS-HORIZONTAL):**
Step 1 — "A horizontal asymptote y=L is a CONSTANT line. An oblique asymptote y=mx+b (m≠0) is a SLANTED line — not horizontal at all. These are two different phenomena with different detection methods." Step 2 — f(x)=(x²+2)/(x−1). Degree of numerator (2) exceeds degree of denominator (1) by 1. No horizontal asymptote by the degree rule (n>m → none). Perform long division: x²+2=(x−1)(x+1)+3. So f(x)=x+1+3/(x−1). As x→∞: f≈x+1. Oblique asymptote: y=x+1, a slant line with slope 1. Step 3 — "Check the degrees first. If n=m+1: do long division to find the slant asymptote. If n<m or n=m: apply the HA rule. If n>m+1: neither."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Find all horizontal asymptotes (if any) for: (a) f(x)=(3x²−1)/(5x²+2); (b) g(x)=(x+4)/(x³−1); (c) h(x)=x²/(x−1); (d) k(x)=(2x³−x)/(4x³+3).
2. For f(x)=(x²−4)/(x²+4): (a) Find the horizontal asymptote. (b) Does f ever equal its HA? (c) Find all x where f(x)=0. Does f cross y=0?
3. Find the oblique asymptote of f(x)=(x²+3x+2)/(x−1) using long division. Sketch the asymptote and verify one point on the graph.
4. A rational function has degree-3 numerator and degree-3 denominator, with leading coefficients 4 and −2 respectively. State the horizontal asymptote. Find where f could cross it (in terms of what equation to solve).

**P55 — Reflect & Consolidate:** "HA rule: deg(P)<deg(Q)→y=0; deg(P)=deg(Q)→y=leading ratio; deg(P)>deg(Q)→none. If deg(P)=deg(Q)+1: oblique asymptote via long division. HA can be crossed; VA cannot."

**P76 — Transfer Probe (Independence mode):**
f(x)=(2x³−3x)/(x²+1). (a) Determine whether f has a horizontal asymptote or an oblique asymptote. (b) Perform polynomial long division to find the oblique asymptote y=mx+b. (c) Show that f(x)−(mx+b)→0 as x→∞ by computing f(x)−(mx+b) explicitly. (d) Find all x where f crosses its oblique asymptote (solve f(x)=mx+b). (e) Verify the graph crosses at those x by checking f evaluates to the asymptote line's value there.

**P55 — Reflect & Consolidate:** "Oblique asymptotes verified by showing the remainder term R(x)/Q(x)→0. Crossing an oblique asymptote = solving f(x)=mx+b = solving R(x)/Q(x)=0 = solving R(x)=0. Both horizontal and oblique asymptotes can be crossed in the interior — tail behavior only."

**P75 — Mastery Assessment:**
"f(x)=(3x³+x²−2)/(x²−1). (a) Factor the denominator: identify vertical asymptotes and/or holes. (b) Does f have a horizontal or oblique asymptote? Find it. (c) Where does f cross its asymptote? (d) Describe the end behavior: as x→+∞ and x→−∞, what does f approach along its asymptote?"

**P55 — Reflect & Consolidate:** "Full asymptote analysis: vertical (denominator zeros after cancellation), horizontal or oblique (degree comparison then long division if needed). A complete graph requires all four: x-intercepts, y-intercept, vertical asymptotes (with one-sided behavior), and horizontal/oblique asymptote."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.horizontal-asymptote complete
- Score 3/5 → REVIEW degree-comparison rule and crossing behavior; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.rational-function; reassign

**P78 — Completion:** Horizontal asymptotes certified. Student applies the three-case degree rule, recognises that graphs can cross horizontal asymptotes, locates oblique asymptotes via long division, and integrates HA analysis with vertical asymptote and zero analysis to produce a complete rational function graph.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Oblique asymptote derivation and verification; crossing an oblique asymptote; unifying all asymptote types in one analysis
Skill tested: Perform long division; verify remainder → 0; solve f(x) = oblique asymptote line; interpret end behavior as convergence to a slant line

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

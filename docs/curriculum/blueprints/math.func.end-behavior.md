# Blueprint: math.func.end-behavior

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.end-behavior |
| name | End Behavior of Functions |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.polynomial-function |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a polynomial function, the student determines end behavior (the function's behavior as x→+∞ and x→−∞) using the leading term rule (degree and sign of leading coefficient), writes end behavior using arrow notation (f(x)→+∞ as x→+∞, etc.), draws the correct tail directions on a graph, extends the analysis to rational functions via degree comparison and leading-coefficient ratio, and distinguishes end behavior from local behavior (zeros, local maxima/minima) in the middle of the graph.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit table of large positive and negative x-values showing the domination of the leading term; numerical pattern before algebraic generalization)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | END-BEHAVIOR-FROM-ZERO | Student evaluates f(0) or f(1) to determine what the function does at the "ends"; doesn't understand that end behavior requires x→±∞ | Type 1 — overgeneralization (students are used to evaluating functions at specific values; "what does f do" triggers substitution of a convenient value rather than limits) |
| MC-2 | ODD-DEGREE-SAME-ENDS | Student believes odd-degree polynomials have the same tail direction on both sides, like even-degree polynomials; draws both tails going up (or both down) | Type 1 — overgeneralization (most early polynomial examples are even-degree — the symmetric parabola imprints "both ends go the same way"; the asymmetric behavior of odd-degree functions is counter-intuitive) |
| MC-3 | LEADING-COEFFICIENT-ONLY-POSITIVE | Student correctly uses the leading coefficient's sign for large positive x, but ignores the reversal at x→−∞ for odd-degree polynomials; always writes the same behavior for both ends | Type 5 — instruction-induced (right-side analysis is taught first and more heavily; (−x)ⁿ sign reversal for odd n is introduced later and not always practiced symmetrically) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of end behavior:**

| Representation | Description | Example: f(x)=2x³−5x+1 |
|---|---|---|
| Arrow notation | f(x)→L as x→a; for ends: f(x)→+∞ or −∞ | f(x)→+∞ as x→+∞; f(x)→−∞ as x→−∞ |
| Verbal | "Both tails go up" / "tails go in opposite directions" | "Right tail up, left tail down" |
| Graphical | Tail arrows on graph indicating direction at extreme x | Right end rises; left end falls |
| Numerical table | f(x) evaluated at x=±10, ±100, ±1000 | x=1000: f≈2×10⁹ (↑); x=−1000: f≈−2×10⁹ (↓) |

**The Leading Term Rule:** As x→±∞, a polynomial f(x)=aₙxⁿ+aₙ₋₁xⁿ⁻¹+…+a₀ behaves like its leading term aₙxⁿ. All other terms become negligible in comparison.

Why: f(x)/xⁿ = aₙ + aₙ₋₁/x + … + a₀/xⁿ → aₙ as x→±∞. So for large |x|, f(x) ≈ aₙxⁿ.

**The four end-behavior patterns:**

| Degree | Leading coefficient | x→+∞ | x→−∞ | Graph tails |
|---|---|---|---|---|
| Even | Positive (a>0) | f→+∞ | f→+∞ | Both up ↑↑ |
| Even | Negative (a<0) | f→−∞ | f→−∞ | Both down ↓↓ |
| Odd | Positive (a>0) | f→+∞ | f→−∞ | Right up, left down ↑↓ |
| Odd | Negative (a<0) | f→−∞ | f→+∞ | Right down, left up ↓↑ |

**Why odd-degree reverses:** For f(x)=xⁿ, if n is odd: (−x)ⁿ=−xⁿ. So f(−x)=−f(x) — the function is odd, and x→−∞ reversal follows. For even n: (−x)ⁿ=xⁿ — no reversal.

**Worked example:** f(x)=−3x⁴+7x³−2x+5.
- Leading term: −3x⁴. Degree 4 (even), coefficient −3 (negative).
- Pattern: both down. f(x)→−∞ as x→+∞; f(x)→−∞ as x→−∞.
- Verification: f(100)=−3(10⁸)+7(10⁶)−…≈−3×10⁸ (very negative). ✓

**P49 checkpoint:**
- CORRECT → "End behavior: look at aₙxⁿ only. Even degree: both ends same direction (sign of aₙ). Odd degree: ends in opposite directions (positive aₙ → right up/left down)." → A02
- PARTIAL (correct for x→+∞, wrong for x→−∞) → "For x→−∞: substitute −∞ into the leading term aₙxⁿ. If n is odd, (−∞)ⁿ=−∞, so the sign flips." → TB-R03 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Fill in a table for f(x)=x³ at x=10, 100, 1000 (all positive) and x=−10, −100, −1000. What happens at the extremes?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**End-behavior gallery — matching leading term to tail pattern:**

| Polynomial | Leading term | Degree | Sign | End behavior |
|---|---|---|---|---|
| f(x)=x²−4 | x² | 2 (even) | + | f→+∞ both ends |
| g(x)=−x²+2x | −x² | 2 (even) | − | g→−∞ both ends |
| h(x)=x³−x | x³ | 3 (odd) | + | h→+∞ right, h→−∞ left |
| p(x)=−2x³+x | −2x³ | 3 (odd) | − | p→−∞ right, p→+∞ left |
| q(x)=x⁴−2x²+1 | x⁴ | 4 (even) | + | q→+∞ both ends |
| r(x)=x⁵−3x | x⁵ | 5 (odd) | + | r→+∞ right, r→−∞ left |

**End behavior vs. local behavior:** The end behavior describes tails only. A polynomial can have local maxima, minima, and zeros in between while still having the same end behavior determined by its leading term. Example: f(x)=x³−3x has local max at x=−1 (f=2) and local min at x=1 (f=−2), but end behavior is x³: →+∞ right, →−∞ left.

**Number of turning points:** A degree-n polynomial has at most n−1 turning points (local max/min). The polynomial can "wiggle" in the middle, but the ends are always determined by the leading term.

**P49 checkpoint:**
- CORRECT → "Leading term determines both ends. Degree-parity determines same vs. opposite directions. Leading-coefficient sign determines which direction (up/down) for x→+∞. Local behavior in the middle is independent." → A03
- PARTIAL (confuses turning points with end behavior) → "Turning points are the 'bumps' in the middle. End behavior is about the tails for very large |x| — far from any turning points. The leading term wins at the tails regardless of bumps." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "For f(x)=−x⁵+3x³−x, what is the leading term? Use it to fill in: f(x)→__ as x→+∞ and f(x)→__ as x→−∞." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Odd-degree check — gate:**

**Gate question (MC-2):** "f(x)=2x³+x²−5. Describe the end behavior on BOTH sides."

x→+∞: leading term 2x³ → +∞. f(x)→+∞. ✓
x→−∞: (−∞)³=−∞, so 2(−∞)³=−∞. f(x)→−∞.

The two tails go in **opposite** directions: right up, left down. This is the characteristic shape of an odd-degree polynomial with positive leading coefficient — an "S" shape that rises to the right and falls to the left.

**Contrast with even-degree:** f(x)=2x⁴+x²−5.
x→+∞: 2x⁴→+∞. x→−∞: 2(−∞)⁴=2(+∞)=+∞. **Both up.** The tails go the SAME direction — like a parabola or a "U."

**Connection to odd/even function symmetry:** Odd-degree polynomials are NOT odd functions unless all even-power terms vanish. The end behavior (opposite tails) is a consequence of the leading term's odd-power behavior, not of full odd-function symmetry.

**P49 checkpoint:**
- CORRECT → "Odd-degree polynomials: tails in opposite directions. Even-degree: tails in same direction. The leading coefficient's sign gives the x→+∞ direction; x→−∞ reverses for odd degree." → Gate (P91)
- PARTIAL (correctly finds x→+∞, writes same direction for x→−∞) → "For f(x)=−x³: at x=−10, f=−(−10)³=−(−1000)=1000>0. This is positive, opposite to f(10)=−1000. So x³ and −x go in opposite directions at ±∞." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Evaluate f(x)=x³ at x=100 and at x=−100. What are the two values? What are the two tails doing?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 END-BEHAVIOR-FROM-ZERO):**
Step 1 — "End behavior describes what the function does for very large or very small x — values like 10⁶ or −10⁶. It is NOT about x=0 or x=1. Evaluating at a specific finite value gives local behavior, not end behavior." Step 2 — f(x)=x²−100x+2499. f(0)=2499 (high); f(50)=−1 (low). If you use x=0, you'd wrongly infer f is large everywhere. But for x=10⁶: f≈(10⁶)²=10¹² — enormous. End behavior is governed by x²: both tails go to +∞. Step 3 — "To find end behavior: (1) Identify the leading term aₙxⁿ. (2) Ask: what does aₙxⁿ do as x→+∞ and separately as x→−∞? That is the end behavior."

**TB-R02 (MC-2 ODD-DEGREE-SAME-ENDS):**
Step 1 — "For even degree: xⁿ is symmetric — (−x)ⁿ=xⁿ. So x→−∞ behaves the same as x→+∞ (both tails go the same way). For odd degree: (−x)ⁿ=−xⁿ — the sign FLIPS at x→−∞. So the tails go in OPPOSITE directions." Step 2 — Table: x³ at x=10 is 1000; x³ at x=−10 is −1000. Compare x² at x=10 (=100) and x=−10 (also 100). The even power is symmetric; the odd power is antisymmetric. Step 3 — "Quick rule: EVEN degree → same ends (both up or both down). ODD degree → opposite ends (one up, one down). The leading coefficient's sign tells you which is which for x→+∞."

**TB-R03 (MC-3 LEADING-COEFFICIENT-ONLY-POSITIVE):**
Step 1 — "Finding end behavior as x→−∞ requires two steps: (a) raise the leading variable to the degree, and (b) apply the actual sign of x, which is negative. For odd n: (−large)ⁿ is negative-large. For even n: (−large)ⁿ is positive-large." Step 2 — f(x)=3x⁵: as x→−∞, x⁵→−∞ (odd power, x is negative → result is negative). So 3x⁵→3(−∞)=−∞. f(x)→−∞ as x→−∞. As x→+∞: 3x⁵→+∞. Opposite tails. Step 3 — "Systematic: replace x with −∞ (keeping the sign). x⁵=−∞⁵=−∞; x⁴=−∞⁴=+∞. Then multiply by the leading coefficient. This always gives the correct x→−∞ direction."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. State the end behavior (x→+∞ and x→−∞) for: (a) f(x)=4x³−x+7; (b) g(x)=−x⁴+3x²; (c) h(x)=−5x⁷+2x³−1; (d) k(x)=x⁸.
2. A polynomial f has exactly 3 turning points and both tails going to −∞. What is the minimum degree of f? What must be true about the leading coefficient?
3. Sketch a polynomial with: odd degree, negative leading coefficient, two turning points. Label the tail directions.
4. Determine end behavior for the rational function f(x)=(3x²−1)/(x²+2). [Hint: divide numerator and denominator by x² and apply limits.] What is the horizontal asymptote?

**P55 — Reflect & Consolidate:** "End behavior: look at leading term aₙxⁿ only. Even degree → same tails. Odd degree → opposite tails. Sign of aₙ → right tail direction. x→−∞ reverses sign only for odd n. Local behavior (zeros, turning points) doesn't affect the tails."

**P76 — Transfer Probe (Independence mode):**
For a rational function f(x)=P(x)/Q(x): (a) If deg(P)<deg(Q), show that f(x)→0 as x→±∞. What is the horizontal asymptote? (b) If deg(P)=deg(Q), show that f(x)→aₙ/bₙ (ratio of leading coefficients). (c) If deg(P)=deg(Q)+1, show that f has an oblique asymptote y=mx+b; find it for f(x)=(2x²+3x)/(x+1). (d) If deg(P)>deg(Q)+1, what happens to f as x→±∞? Does it have any asymptote?

**P55 — Reflect & Consolidate:** "End behavior of rational functions depends on the degrees: underdeveloped numerator → 0; equal degrees → constant; numerator one more → oblique asymptote; numerator larger excess → unbounded. Polynomial long division reveals the oblique asymptote explicitly."

**P75 — Mastery Assessment:**
"f(x)=x⁴−16x². (a) Identify the leading term and state the end behavior. (b) How many turning points could f have (maximum)? (c) Factor f(x) completely and find all zeros. (d) Sketch f: mark zeros, approximate turning points, and confirm the tail behavior matches your analysis in (a)."

**P55 — Reflect & Consolidate:** "End behavior constrains the graph's tails but says nothing about the middle. A degree-4 polynomial can have 0, 2, or 4 real zeros and up to 3 turning points while maintaining the same even-positive end behavior (both tails up). Reading a sketch requires separating local and global analysis."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.end-behavior complete
- Score 3/5 → REVIEW odd-degree behavior at x→−∞ and leading-term dominance; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.polynomial-function; reassign

**P78 — Completion:** End behavior certified. Student applies the leading-term rule to determine tail directions for any polynomial, writes end behavior using correct arrow notation, distinguishes even-degree (same tails) from odd-degree (opposite tails) patterns, and extends analysis to rational function horizontal/oblique asymptotes.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: End behavior of rational functions via degree comparison; derivation of horizontal and oblique asymptotes; connection to polynomial long division
Skill tested: Apply leading-term dominance to a ratio; identify all three cases (deg P < Q, = Q, = Q+1); use long division to extract oblique asymptote

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

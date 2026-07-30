# Blueprint: math.func.even-odd-functions

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.even-odd-functions |
| Title | Even and Odd Functions |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.graph-of-function |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a function f, the student classifies it as even (f(−x)=f(x) for all x), odd (f(−x)=−f(x) for all x), or neither by algebraic substitution; interprets even symmetry as reflection about the y-axis and odd symmetry as 180° rotational symmetry about the origin; applies symmetry to simplify definite integrals (∫_{−a}^{a} f = 0 for odd, 2∫_0^a for even); and recognises that a function can be neither even nor odd.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit graph with symmetry lines drawn; numerical check at x=3 and x=−3 before algebraic proof)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | EVEN-ODD-FROM-EXPONENTS | Student determines even/odd by looking at the exponent of x only: x² is even (exponent 2), x³ is odd (exponent 3); does not handle sums (x²+x is neither) or non-monomial functions | Type 5 — instruction-induced (monomials like x^n ARE even iff n is even; students generalise this shortcut to all functions) |
| MC-2 | NEITHER-MEANS-BOTH | Student, finding that f(−x)≠f(x) AND f(−x)≠−f(x), concludes the function is both even and odd rather than neither | Type 1 — overgeneralization (students confuse "the test fails" with "some other state between even and odd"; the correct conclusion is simply "neither") |
| MC-3 | EVEN-MEANS-SYMMETRIC-ABOUT-x-AXIS | Student confuses y-axis symmetry (even function) with x-axis symmetry; draws the wrong axis of symmetry | Type 3 — language contamination ("even" suggests the x-axis which has equation y=even-number; the correct axis is y-axis) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Even and odd — four representations:**

| Representation | Even function | Odd function |
|---|---|---|
| Algebraic | f(−x)=f(x) for all x in domain | f(−x)=−f(x) for all x in domain |
| Graphical | Symmetric about y-axis (mirror image) | Symmetric about origin (180° rotation) |
| Intuitive | "Left side = right side" | "Left side = upside-down right side" |
| Numerical check | f(3)=f(−3) | f(3)=−f(−3) |

**Gallery of examples:**

| Function | f(−x) | Classification | Why |
|---|---|---|---|
| f(x)=x² | (−x)²=x² ✓ | Even | f(−x)=f(x) |
| f(x)=x³ | (−x)³=−x³=−f(x) ✓ | Odd | f(−x)=−f(x) |
| f(x)=|x| | |−x|=|x| ✓ | Even | Absolute value, symmetric |
| f(x)=cos(x) | cos(−x)=cos(x) ✓ | Even | Cosine is symmetric |
| f(x)=sin(x) | sin(−x)=−sin(x) ✓ | Odd | Sine is antisymmetric |
| f(x)=x²+x | (−x)²+(−x)=x²−x ≠ ±f(x) | Neither | Mixed-parity terms |
| f(x)=0 | 0=0 and 0=−0 | Both (unique case) | Only function that is both |

**Worked algebraic test:** f(x)=2x⁴−3x².
f(−x)=2(−x)⁴−3(−x)²=2x⁴−3x²=f(x). Even. ✓

f(x)=x⁵−x³.
f(−x)=(−x)⁵−(−x)³=−x⁵+x³=−(x⁵−x³)=−f(x). Odd. ✓

**P49 checkpoint:**
- CORRECT → "Substitute −x: if f(−x)=f(x), even (y-axis symmetry). If f(−x)=−f(x), odd (origin symmetry). Otherwise: neither." → A02
- PARTIAL (handles monomials, fails on sums) → "For f(x)=x²+x, compute f(−x) and compare to f(x) and −f(x). What do you find?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For f(x)=x², compute f(3) and f(−3). Are they equal? What does this tell you about the graph?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Symmetry rules — pattern gallery:**

**Sums and products:**
| Rule | Example |
|---|---|
| Even + Even = Even | x² + x⁴ |
| Odd + Odd = Odd | x + x³ |
| Even + Odd = Neither (unless one is 0) | x² + x |
| Even × Even = Even | x² · x⁴ = x⁶ |
| Odd × Odd = Even | x · x³ = x⁴ |
| Even × Odd = Odd | x² · x = x³ |

**Derivative and integral rules (preview):**
- Derivative of even = odd. Derivative of odd = even.
- ∫_{−a}^{a} f(x)dx = 0 if f is odd (antisymmetric contributions cancel).
- ∫_{−a}^{a} f(x)dx = 2∫_0^a f(x)dx if f is even.

**P49 checkpoint:**
- CORRECT → "Even×Even=Even, Odd×Odd=Even, Even×Odd=Odd, Even+Odd=Neither. Symmetric integrals simplify: odd→0, even→double the half-integral." → A03
- PARTIAL (knows examples, can't derive the product rules) → "If f is odd: f(−x)=−f(x). If g is odd: g(−x)=−g(x). What is [f·g](−x)?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Compute ∫_{−2}^{2} x³ dx without a calculator. Justify using symmetry." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**Symmetry axis identification — gate:**

**Gate question (MC-3):** "The graph of f(x)=x² is symmetric about which axis: the x-axis or the y-axis?"

Y-axis. The parabola y=x² is the same on the left (x<0) and right (x>0) of the y-axis — it has y-axis symmetry. This is even symmetry: f(−x)=f(x).

The x-axis: a function can NOT be symmetric about the x-axis (unless f=0) because that would mean for each x, there are two y-values (+f(x) and −f(x)), violating the vertical line test.

**Neither-even-nor-odd example:** f(x)=eˣ.
f(−x)=e⁻ˣ. Is e⁻ˣ=eˣ? Only at x=0. Is e⁻ˣ=−eˣ? Never (both positive). Neither even nor odd. The graph is not symmetric about y-axis or origin.

**P49 checkpoint:**
- CORRECT → "Even: y-axis symmetry (NOT x-axis). Odd: origin (180° rotation). x-axis symmetry fails the vertical line test. A function that is neither has no such symmetry." → Gate (P91)
- PARTIAL (confuses y-axis and x-axis symmetry) → "Draw the parabola y=x². Is the left half the mirror image of the right (y-axis), or is the top half the mirror of the bottom (x-axis)?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Plot (1,1) and (−1,1) for f(x)=x². Are these points mirror images across the y-axis or across the x-axis?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 EVEN-ODD-FROM-EXPONENTS):**
Step 1 — "The shortcut 'even exponent → even function' works ONLY for pure monomials cxⁿ. For sums: each term has its own parity, and a sum of different parities is neither." Step 2 — f(x)=x²+x: f(−x)=(−x)²+(−x)=x²−x. Is x²−x = x²+x? No (unless x=0). Is x²−x = −(x²+x)=−x²−x? No. So f(x)=x²+x is NEITHER. Step 3 — "Always test the whole function by computing f(−x) and comparing with f(x) and −f(x). Don't shortcut from individual terms."

**TB-R02 (MC-2 NEITHER-MEANS-BOTH):**
Step 1 — "After computing f(−x): compare with f(x) — if equal, EVEN. Compare with −f(x) — if equal, ODD. If NEITHER comparison holds, the function is NEITHER EVEN NOR ODD. This is the only remaining option." Step 2 — f(x)=eˣ: f(−x)=e⁻ˣ ≠ eˣ (not even). e⁻ˣ ≠ −eˣ (not odd, since both are positive). Conclusion: neither. This is a third category, not a combination of even and odd. Step 3 — "The only function that is both even AND odd is f(x)=0 (since 0=−0 and the identity f(−x)=f(x)=−f(x)=0 holds). Every other function is exactly one of: even, odd, or neither."

**TB-R03 (MC-3 EVEN-MEANS-SYMMETRIC-ABOUT-x-AXIS):**
Step 1 — "Even function: f(−x)=f(x) means the y-values at x and −x are THE SAME. On the graph: the point (x, f(x)) has a mirror image (−x, f(x)) — same height, reflected across the y-axis." Step 2 — x-axis symmetry means (x,y) and (x,−y) are both on the graph. For a function, both (x, f(x)) and (x, −f(x)) would be on the graph. But a function can have only one y-value per x — so x-axis symmetry is impossible for any non-zero function. Step 3 — "Even → y-axis. Odd → origin. x-axis is never a function's symmetry axis (except f=0)."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Classify each as even, odd, or neither: (a) f(x)=x⁴−6x²+1; (b) g(x)=x³+x; (c) h(x)=x²+2x; (d) k(x)=(x³−x)/(x²+1).
2. Prove: if f and g are odd, then f+g is odd. Is f·g even or odd?
3. Use symmetry to evaluate: (a) ∫_{−3}^{3} (x⁵−x³+x) dx; (b) ∫_{−π}^{π} sin(x)cos(x) dx.
4. Decompose f(x)=eˣ into an even part and an odd part: f(x)=E(x)+O(x) where E is even and O is odd. [Hint: any function can be written as ½(f(x)+f(−x))+½(f(x)−f(−x)).] Identify E(x) and O(x).

**P55 — Reflect & Consolidate:** "Even: f(−x)=f(x), y-axis symmetry. Odd: f(−x)=−f(x), origin symmetry. Neither: the third category. Every function decomposes into even+odd parts. Integrals over [−a,a]: odd→0, even→2×half."

**P76 — Transfer Probe (Independence mode):**
Fourier series: any periodic function on [−π,π] can be written as a sum of sines and cosines. Since cos(nx) is even and sin(nx) is odd: (a) if f is an even periodic function, show that all sine coefficients (bₙ) in the Fourier expansion must be zero; (b) if f is odd, show all cosine coefficients (a₀, aₙ) must be zero; (c) confirm: f(x)=x on (−π,π) is odd, so its Fourier series contains only sine terms — verify the first two terms are (2/π)sin(x)−(1/π)sin(2x).

**P55 — Reflect & Consolidate:** "Fourier series applies even/odd symmetry directly: even functions need only cosines, odd functions need only sines, halving the computation. This is one of the most-used applications of function symmetry in engineering and physics."

**P75 — Mastery Assessment:**
"f(x)=x/(x²+1). (a) Is f even, odd, or neither? Justify algebraically. (b) What does this imply about ∫_{−2}^{2} f(x)dx? Evaluate it without computing the antiderivative. (c) If g(x)=f(x)+1, is g even, odd, or neither? (d) Sketch f and g, marking the symmetry (or lack thereof) of each."

**P55 — Reflect & Consolidate:** "Adding a constant to an odd function destroys odd symmetry (unless the constant is 0). The symmetry test always requires checking the full function after any modification."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.even-odd-functions complete
- Score 3/5 → REVIEW algebraic classification for non-monomial functions; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.graph-of-function; reassign

**P78 — Completion:** Even and odd functions certified. Student classifies functions algebraically, identifies the correct symmetry axis (y-axis for even, origin for odd), applies parity rules to products and sums, and uses symmetry to evaluate symmetric integrals.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Fourier series as an application of even/odd symmetry; sine-only vs. cosine-only expansions; coefficient elimination via symmetry
Skill tested: Apply parity of basis functions to determine which Fourier coefficients vanish; verify explicit Fourier series terms

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

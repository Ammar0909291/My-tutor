# Teaching Blueprint — math.calc.ftc-part1

## Component 0 — Metadata
concept_id: math.calc.ftc-part1
concept_name: Fundamental Theorem of Calculus Part 1
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: analyze
estimated_hours: 6
mastery_threshold: 0.8
CPA_entry_stage: C
requires: [math.calc.definite-integral, math.calc.continuity]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** FTC Part 1 asserts that differentiation and integration are inverse operations. If f is continuous on [a,b] and G(x) = ∫_a^x f(t)dt, then G′(x) = f(x) for every x in (a,b). The dummy variable t plays no role in the output: differentiating the accumulation function G recovers the integrand f evaluated at the upper limit. When the upper limit is a composite function u(x), the chain rule yields d/dx[∫_a^{u(x)} f(t)dt] = f(u(x))·u′(x).

**Conceptual progression:**
1. Accumulation function: G(x) = ∫_a^x f(t)dt is a function of the upper limit x.
2. Geometric intuition: as x increases by Δx, the added area ≈ f(x)·Δx; so G′(x) = lim f(x)·Δx/Δx = f(x).
3. FTC1 formal statement: f continuous on [a,b] → G′(x) = f(x) for x ∈ (a,b).
4. Role of dummy variable: t is internal; the derivative output replaces t with the upper limit x.
5. Chain rule extension: d/dx[∫_a^{u(x)} f(t)dt] = f(u(x))·u′(x).
6. Contrast with FTC2: FTC1 differentiates an integral-defined function; FTC2 evaluates a definite integral using an antiderivative.

**CPA arc (entry: C):**
- Concrete: velocity v(t) and position function s(t) = ∫_0^t v(τ)dτ; differentiating position gives back velocity — the physical embodiment of G′ = f.
- Pictorial: sliding-boundary shaded area under f; thin strip of height ≈ f(x) and width Δx; G′(x) = lim(Δx→0) f(x)Δx/Δx = f(x).
- Abstract: G(x) = ∫_a^x f(t)dt ⟹ G′(x) = f(x); chain rule extension.

**Prior knowledge activated:** definite integral (math.calc.definite-integral) — Riemann sum limit, signed area, integral properties; continuity (math.calc.continuity) — continuity on an interval is the hypothesis of FTC1; derivative and chain rule (math.calc.derivative-intro).

---

## Component 2 — Misconception Registry

### MC-1: VARIABLE-CONFUSION-T-AND-X [FOUNDATIONAL]
**Description:** Learner retains the dummy integration variable t in the output of the derivative, writing G′(x) = f(t) instead of G′(x) = f(x).
**Surface form:** "G(x) = ∫_0^x sin(t)dt, so G′(x) = sin(t)."
**Root cause:** The learner does not recognise that t is a dummy variable that disappears upon differentiation; they believe the integrand formula must appear unchanged.
**Trigger condition:** Any FTC1 application where the integrand is written in terms of t.
**Repair target:** TA-B01.

### MC-2: LOWER-LIMIT-DETERMINES-FTC1
**Description:** Learner believes FTC1 applies only when the lower limit of integration is 0; for G(x) = ∫_3^x f(t)dt, they claim the theorem doesn't hold or adds an offset.
**Surface form:** "G(x) = ∫_3^x t² dt — but the lower limit is 3, not 0, so G′(x) ≠ t²."
**Root cause:** FTC1 is often introduced with lower limit 0 in examples; the learner infers the lower limit is structurally important rather than seeing it as a fixed constant.
**Trigger condition:** Any FTC1 problem with a non-zero constant lower limit.
**Repair target:** TA-B02.

### MC-3: CHAIN-RULE-OMITTED
**Description:** When the upper limit is a composite function u(x), learner applies FTC1 but omits the chain rule factor u′(x), writing d/dx[∫_a^{u(x)} f(t)dt] = f(u(x)) without multiplying by u′(x).
**Surface form:** "d/dx[∫_0^{x²} cos(t)dt] = cos(x²)."
**Root cause:** The learner correctly applies FTC1 (substitute upper limit into integrand) but treats the composite upper limit as though it were simply x, forgetting the chain rule.
**Trigger condition:** Any FTC1 problem with a composite upper limit such as x², sin(x), or x³.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "What does ∫_0^4 v(t)dt represent if v(t) is a velocity function?" Correct response (total displacement/distance in [0,4]) confirms the integral-as-accumulation understanding from math.calc.definite-integral. Then: "If we replace 4 with a variable x to get G(x) = ∫_0^x v(t)dt, what does G(x) represent?" This primes the accumulation-function idea before FTC1 is stated.

**Scaffolding ladder:**
- Rung 1 (concrete): position-velocity analogy; G(x) as cumulative displacement; G′ must equal v at each moment.
- Rung 2 (pictorial): graph f(t); shade ∫_a^x f(t)dt; move x rightward by Δx; area of thin strip ≈ f(x)·Δx; G′(x) = f(x).
- Rung 3 (abstract): FTC1 formal statement; practice with simple integrands; then composite upper limits with chain rule.

**Pacing note:** h=6 estimated hours; A01 in session 1, A02 in sessions 2–3, A03 in sessions 4–5; mastery gate in session 6.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Concrete (velocity and position):
"A car starts at a fixed reference point at time 0. Its velocity at time t is v(t). The car's position at time x is:
    G(x) = ∫_0^x v(t) dt.
This is the total displacement accumulated from 0 to x.

Question: How fast is G changing at time x? At rate v(x). Why? In the next tiny interval Δx, the car moves approximately v(x)·Δx. So ΔG ≈ v(x)·Δx, giving G′(x) = lim_{Δx→0} ΔG/Δx = v(x).

Differentiating the accumulation integral gives back the integrand evaluated at the current time."

REPRESENTATION 2 — Pictorial (area and the thin strip):
Draw f(t) as a positive curve. Shade the area under f from a to x — this is G(x).
Move the right boundary to x+Δx. The extra area (the thin strip) is approximately:
    ΔG = G(x+Δx) − G(x) ≈ f(x)·Δx (height f(x), width Δx).
Therefore:
    G′(x) = lim_{Δx→0} ΔG/Δx = lim_{Δx→0} f(x)·Δx/Δx = f(x).
(This argument is rigorous when f is continuous — continuity ensures f doesn't jump near x, making the strip area approximation exact in the limit.)

REPRESENTATION 3 — Algebraic (FTC1 formal statement):
Let f be continuous on [a,b]. Define G(x) = ∫_a^x f(t) dt for x ∈ [a,b].
Then G is differentiable on (a,b) and G′(x) = f(x).

KEY NOTATIONAL POINT:
"t is a DUMMY variable inside the integral — it is a placeholder name for the integration variable. After differentiation, t vanishes and x takes its place as the output argument. G′(x) = f(x), not f(t)."

SUMMARY TABLE:
| Quantity | Meaning | Role |
|---|---|---|
| t | dummy integration variable (inside ∫) | disappears after differentiation |
| x | the upper limit; argument of G | appears in output G′(x) = f(x) |
| a | fixed lower limit (constant) | does not affect the derivative |
| f(x) | integrand evaluated at upper limit | IS the derivative G′(x) |

**Assessment primitive: P49**

PROBE: "G(x) = ∫_0^x sin(t) dt. Find G′(x)."
- CORRECT: "By FTC1, G′(x) = sin(x)." → proceed to A02.
- PARTIAL: "G′(x) = sin(t)" (dummy variable retained) → Repair with B01. "After applying FTC1, replace the dummy variable t with the upper limit x in the integrand: sin(t) → sin(x). So G′(x) = sin(x)."
- INCORRECT: "G′(x) = cos(x)" (differentiates sin rather than applying FTC1) → "FTC1 says: differentiate the integral by evaluating the INTEGRAND at the upper limit. Do not differentiate f(t). G′(x) = f(x) = sin(x)."
- NO_RESPONSE: "FTC1: d/dx[∫_a^x f(t)dt] = f(x). Here f(t) = sin(t); evaluate at t=x: f(x) = sin(x). So G′(x) = sin(x)."

---

### TA-B01 — Repair for MC-1 (VARIABLE-CONFUSION-T-AND-X)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'G(x) = ∫_0^x sin(t)dt → G′(x) = sin(t).' The answer must be expressed in x, not t. After FTC1, the dummy variable t is replaced by the upper limit x."

**P41 — MISCONCEPTION DETECTOR**
"Evaluate ∫_0^2 sin(t)dt. What letter appears in the answer?
(A) The answer contains t: sin(t).
(B) The answer is a number (no variable): −cos(2)+cos(0) = 1−cos(2) ≈ 0.416.
Now evaluate ∫_0^x sin(t)dt and differentiate with respect to x. Should t appear in G′(x)?
(A) Yes — G′(x) = sin(t).
(B) No — G′(x) = sin(x), since t was integrated out."
[If A for second question: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The symbol t inside ∫_0^x f(t)dt is a 'dummy name' — like a loop index variable in programming. The integral ∫_0^x sin(t)dt = ∫_0^x sin(u)du = ∫_0^x sin(s)ds (all equal). The letter used inside doesn't matter; only the bounds and the integrand shape matter. After applying FTC1, the output is a function of the upper limit x. Replace t with x: d/dx[∫_0^x sin(t)dt] = sin(x). The dummy variable t is gone."

→ Return to A01.

---

### TA-A02 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

INDUCTIVE SEQUENCE — Building the FTC1 pattern:

Step 1 — Simple upper limit (u = x, u′ = 1):
Example 1: d/dx[∫_0^x t² dt] = x²
  (Evaluate integrand t² at t=x; multiply by u′=1.)
Example 2: d/dx[∫_1^x eᵗ dt] = eˣ
  (f(t)=eᵗ; evaluated at x: eˣ; ×1.)
Example 3: d/dx[∫_2^x cos(t) dt] = cos(x)
  (f(t)=cos(t); at x: cos(x); ×1.)
Example 4: d/dx[∫_5^x ln(1+t²) dt] = ln(1+x²)
  (f(t)=ln(1+t²); at x: ln(1+x²); ×1.)

PATTERN (simple case): replace t with x in the integrand, multiply by 1.

Step 2 — Composite upper limit (chain rule required):
Let u = u(x) be a differentiable function. By the Chain Rule applied to G(u(x)):
  d/dx[∫_a^{u(x)} f(t)dt] = f(u(x)) · u′(x)

Example 5: d/dx[∫_0^{x²} t dt] — u=x², u′=2x; f(u)=u=x².
  Result: x² · 2x = 2x³.
  Verify: ∫_0^{x²} t dt = [t²/2]_0^{x²} = x⁴/2. Differentiate: d/dx[x⁴/2] = 2x³ ✓.

Example 6: d/dx[∫_0^{sin x} t² dt] — u=sin x, u′=cos x; f(u)=u²=sin²x.
  Result: sin²(x) · cos(x).
  Check: ∫_0^{sin x} t² dt = [t³/3]_0^{sin x} = sin³(x)/3. d/dx[sin³(x)/3] = 3sin²(x)cos(x)/3 = sin²(x)cos(x) ✓.

Example 7: d/dx[∫_0^{x³} eᵗ dt] — u=x³, u′=3x²; f(u)=e^{x³}.
  Result: e^{x³} · 3x².

PATTERN (chain rule case): evaluate integrand at u(x), then multiply by u′(x).

UNIFIED RULE: d/dx[∫_a^{u(x)} f(t)dt] = f(u(x)) · u′(x).
(Simple case: u(x)=x, u′(x)=1 → f(x)·1 = f(x).)

**Assessment primitive: P49**

PROBE: "Find d/dx[∫_0^{x²} cos(t) dt]."
- CORRECT: "u=x², u′=2x; f(u)=cos(x²). Result: cos(x²)·2x = 2x·cos(x²)." → proceed to A03.
- PARTIAL: "cos(x²)" (forgot to multiply by u′=2x) → Repair with B03 (CHAIN-RULE-OMITTED). "The upper limit is x², not x. Chain rule: multiply by d/dx[x²] = 2x. Final: cos(x²)·2x."
- INCORRECT: "−sin(x²)·2x" (differentiating cos rather than evaluating it) → "FTC1: do not differentiate f(t). Simply evaluate cos(t) at t=x²: cos(x²). Then multiply by the chain rule factor (d/dx[x²]=2x): 2x·cos(x²)."
- NO_RESPONSE: "Identify u=x², compute u′=d/dx[x²]=2x. By FTC1 + chain rule: evaluate f(t)=cos(t) at t=x²: cos(x²). Then ×u′: 2x·cos(x²)."

---

### TA-B03 — Repair for MC-3 (CHAIN-RULE-OMITTED)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'd/dx[∫_0^{x²} cos(t)dt] = cos(x²).' This omits the chain rule. Whenever the upper limit is a function u(x) and not simply x, the result must be multiplied by u′(x)."

**P41 — MISCONCEPTION DETECTOR**
"Compute d/dx[x²] directly: result is 2x. Now for H(x) = ∫_0^{x²} cos(t)dt, view this as G(u) where G(u)=∫_0^u cos(t)dt and u=x². By chain rule: dH/dx = dG/du · du/dx = ?
(A) cos(x²) — the dG/du part only.
(B) cos(x²) · 2x — both parts multiplied together."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Chain rule: [composite function]′ = [outer derivative at inner] × [inner derivative]. Here the 'outer' is G(u) = ∫_0^u cos(t)dt and the 'inner' is u = x². Outer derivative at inner: G′(u) = cos(u) = cos(x²). Inner derivative: u′(x) = 2x. Full chain rule: H′(x) = cos(x²)·2x. The u′ factor is NEVER optional when u ≠ x. Quick diagnostic: if the upper limit is anything other than bare x — any power, trig, logarithm, or composition — you must multiply by its derivative."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

CONTRAST 1 — FTC1 (function output) vs FTC2 (numerical output):
| | FTC1 | FTC2 |
|---|---|---|
| Operation | Differentiate an integral-defined function | Evaluate a definite integral |
| Input/output | G(x) = ∫_a^x f(t)dt → G′(x) = f(x) | ∫_a^b f(x)dx = F(b)−F(a) |
| Result type | A FUNCTION of x | A NUMBER |
| Question answered | "How fast does accumulation change?" | "What is the total accumulation?" |
| What you need | The integrand f | An antiderivative F |

Example — two uses of the same integral:
Let f(t) = t². G(x) = ∫_1^x t²dt.
- FTC1: G′(x) = x². (Derivative of the accumulation function — a function.)
- FTC2: G(3) = ∫_1^3 t²dt = [t³/3]_1^3 = 9 − 1/3 = 26/3. (A number.)

CONTRAST 2 — Simple vs composite upper limit:
| Integral | Upper limit | Derivative | Chain rule? |
|---|---|---|---|
| ∫_0^x t³ dt | u=x, u′=1 | x³ · 1 = x³ | No |
| ∫_0^{x²} t³ dt | u=x², u′=2x | (x²)³ · 2x = 2x⁷ | YES |
| ∫_0^{cos x} t³ dt | u=cos x, u′=−sin x | cos³(x)·(−sin x) | YES |

"The moment the upper limit is not bare x, chain rule is mandatory. The factor u′ is NEVER 1 in those cases."

CONTRAST 3 — Two common wrong paths and the correct one:
Compute d/dx[∫_1^x (t²+1)dt].
- Wrong path 1 (evaluate integral first): [t³/3+t]_1^x = x³/3+x−4/3; differentiate: x²+1 ✓ (gets the right answer but obscures the pattern — this can't generalise when antiderivative is unavailable).
- Wrong path 2 (differentiate the integrand): d/dt[t²+1] = 2t (wrong; FTC1 is not about differentiating the integrand).
- Correct path (FTC1 directly): evaluate f(t)=t²+1 at t=x → x²+1. Done.

**Assessment primitive: P49**

PROBE: "Find d/dx[∫_3^x (t²+1)/(t+1) dt]."
- CORRECT: "By FTC1: evaluate integrand at t=x: (x²+1)/(x+1). Lower limit 3 is a constant — doesn't affect the derivative." → proceed to A04.
- PARTIAL: "I should first compute the antiderivative..." (reaching for unnecessary FTC2 path) → "FTC1 gives the derivative directly without finding an antiderivative. Just evaluate f(t)=(t²+1)/(t+1) at t=x: answer is (x²+1)/(x+1)."
- INCORRECT: "0, because the lower limit is 3 not 0" → Repair with B02 (LOWER-LIMIT-DETERMINES-FTC1). "FTC1 holds for any constant lower limit. G(x)=∫_3^x f(t)dt → G′(x)=f(x). The lower limit a=3 cancels in the derivation."
- NO_RESPONSE: "FTC1: d/dx[∫_a^x f(t)dt] = f(x) for any constant a. Set a=3, f(t)=(t²+1)/(t+1). Evaluate at t=x: f(x)=(x²+1)/(x+1). Done."

---

### TA-B02 — Repair for MC-2 (LOWER-LIMIT-DETERMINES-FTC1)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'FTC1 only works when the lower limit is 0.' The lower limit can be any constant a; the theorem holds regardless."

**P41 — MISCONCEPTION DETECTOR**
"G(x) = ∫_3^x t dt. Compute G(x) directly. G(x) = [t²/2]_3^x = x²/2 − 9/2.
Now differentiate: G′(x) = x.
Compare with FTC1 prediction G′(x) = f(x) = x. Do they match?
(A) No — the lower limit 3 causes an offset.
(B) Yes — G′(x) = x regardless of the lower limit value."
[If A: learner holds MC-2.]
"The constant −9/2 has zero derivative. The lower limit only shifts G by a constant; differentiating removes it."

**P64 — CONCEPTUAL SHIFT**
"FTC1 proof: G(x) = ∫_a^x f(t)dt. The constant a appears only in the lower limit. By additivity: ∫_a^x f(t)dt = ∫_0^x f(t)dt − ∫_0^a f(t)dt. The second piece is a constant (no x). Differentiating: G′(x) = f(x) − 0 = f(x). The lower limit value cancels when you differentiate. It affects the VALUE of G(x) but not the RATE of change G′(x). Therefore FTC1 holds for any constant a: d/dx[∫_a^x f(t)dt] = f(x)."

→ Return to A03.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (VARIABLE-CONFUSION-T-AND-X)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (LOWER-LIMIT-DETERMINES-FTC1)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A03.

### TA-B03 — Repair for MC-3 (CHAIN-RULE-OMITTED)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Find: (a) d/dx[∫_2^x (1+t⁴)^{1/2} dt]; (b) d/dx[∫_0^{tan x} t/(1+t²) dt]."
[Expected: (a) (1+x⁴)^{1/2}; (b) u=tan x, u′=sec²x; f(u)=(tan x)/(1+tan²x)=sin x·cos x; result: sin x·cos x·sec²x = sin x/cos x = tan x. (Alternatively: tan x/(1+tan²x) = sin x·cos x; ×sec²x = sin x/cos x = tan x.)]

**Day 10 prompt:**
"Let F(x) = ∫_x^{x²} sin(t²) dt. Find F′(x)."
[Expected: split: F(x) = ∫_0^{x²} sin(t²)dt − ∫_0^x sin(t²)dt. Differentiate: F′(x) = sin(x⁴)·2x − sin(x²)·1 = 2x·sin(x⁴) − sin(x²).]

**Day 30 prompt:**
"Define G(x) = ∫_0^x |sin(t)| dt. Is G differentiable at x = π? Find G′(π) if it exists."
[Expected: |sin(t)| is continuous everywhere (including t=π, where |sin(π)|=0). By FTC1, G′(x) = |sin(x)| for all x. At x=π: G′(π) = |sin(π)| = 0. G is differentiable at π.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.calc.definite-integral — Riemann sum limit, signed area, integral as accumulation; the integrand f(t) and the notation ∫_a^x are assumed known
- math.calc.continuity — continuity on [a,b] is the hypothesis of FTC1; the geometric argument (thin strip has height f(x)) requires continuity to ensure no jump in f near x

**Unlocked blueprints:**
- math.calc.ftc-part2 — evaluating definite integrals via antiderivatives; the companion theorem to FTC1

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (VARIABLE-CONFUSION-T-AND-X) is the most frequent error and blocks all further progress. Address it immediately at first occurrence; the dummy-variable explanation (t is a placeholder; FTC1 outputs a function of x) must be internalised before chain rule work begins.

**Two separate skill layers:** FTC1 with simple upper limit (no chain rule) should be mastered fully before introducing composite upper limits. Presenting both simultaneously triggers MC-3 in learners who have not yet automated the basic case.

**FTC1 vs FTC2 contrast:** Many learners reach for antiderivative computation (FTC2) when asked to differentiate an integral. Reinforce that FTC1 bypasses antiderivative computation entirely — this is its power. Emphasise: FTC1 turns a hard differentiation (of an integral) into a trivial substitution.

**Continuity requirement:** Connect back to math.calc.continuity: FTC1 requires f to be continuous on [a,b]. A discontinuous f can create an accumulation function G that is not differentiable. This gives continuity a precise role in the theorem.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 11 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P04, A03: P06
- [x] V-3: CPA_entry_stage=C (advanced difficulty); A01 opens with concrete velocity/position anchor ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=analyze; no P07 (WORKED EXAMPLE PAIR); B-category: P11, P04, P06 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (not seen in P77)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: FTC1 statement and proof sketch are textbook-standard; all chain-rule extensions verified; Examples 5–7 in A02 verified by direct antiderivative computation

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Find d/dx[∫_0^x √(1+t³) dt]."
[Expected: √(1+x³). FTC1 directly; no chain rule needed (upper limit = x).]

**Item 2:**
"Find d/dx[∫_3^x cos(t²) dt]."
[Expected: cos(x²). FTC1 with non-zero lower limit a=3; lower limit is a constant, has no effect on the derivative.]

**Item 3:**
"Find d/dx[∫_0^{x²} eᵗ dt]."
[Expected: e^{x²} · 2x. u=x², u′=2x; FTC1+chain rule: e^{x²}·2x.]

**Item 4:**
"Identify and correct the error: 'd/dx[∫_0^{x³} t dt] = x³.'"
[Expected: Error — chain rule omitted. Correct: u=x³, u′=3x²; f(u)=u=x³; result = x³·3x² = 3x⁵. Alternatively: ∫_0^{x³} t dt = [t²/2]_0^{x³} = x⁶/2; d/dx[x⁶/2] = 3x⁵ ✓.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Evaluate:
(a) d/dx[∫_2^x (t³+1) dt]
(b) d/dx[∫_0^{x⁴} cos(t) dt]"

[Expected:
(a) FTC1 directly (lower limit a=2 is a constant): x³+1.
(b) u=x⁴, u′=4x³; FTC1+chain rule: cos(x⁴)·4x³.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if both (a) and (b) are correct; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (4–5/5): Learner can apply FTC1 for simple and composite upper limits, recognise the dummy variable role, and apply the chain rule extension.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or 2 with G′(x)=f(t) (dummy variable retained): → TA-B01 (VARIABLE-CONFUSION-T-AND-X repair), then re-gate
- FAIL on Item 2 citing non-zero lower limit as a blocker: → TA-B02 (LOWER-LIMIT-DETERMINES-FTC1 repair), then re-gate
- FAIL on Item 3 or 4 or P76(b) — chain rule omitted: → TA-B03 (CHAIN-RULE-OMITTED repair), then re-gate
- FAIL on one item only due to arithmetic error (correct method, wrong computation): → targeted correction; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated the ability to apply FTC Part 1: differentiating an accumulation integral gives back the integrand evaluated at the upper limit, extended by the chain rule for composite upper limits.

Key anchors to carry forward:
- d/dx[∫_a^x f(t)dt] = f(x) for any constant a (lower limit is irrelevant to the derivative).
- t is a dummy variable; it is replaced by x in the output.
- Composite upper limit u(x): multiply by u′(x). Never skip this factor.
- FTC1 gives a FUNCTION; FTC2 gives a NUMBER. Different theorems, different jobs.

Next concept: math.calc.ftc-part2 — evaluating definite integrals via antiderivatives."

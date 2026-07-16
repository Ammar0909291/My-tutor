# Teaching Blueprint — math.prob.continuous-rv

## Component 0 — Metadata
concept_id: math.prob.continuous-rv
concept_name: Continuous Random Variable
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 4
mastery_threshold: 0.9
CPA_entry_stage: P
requires: [math.prob.random-variable, math.calc.definite-integral]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A continuous random variable X is characterised by a probability density function (PDF) f(x) ≥ 0 whose integral over all reals equals 1. Probability is not attached to individual points but to intervals: P(a ≤ X ≤ b) = ∫_a^b f(x)dx. As a consequence, P(X = c) = 0 for every single value c. The cumulative distribution function F(x) = P(X ≤ x) = ∫_{−∞}^x f(t)dt is the running antiderivative of f, so f(x) = F′(x) wherever f is continuous.

**Conceptual progression:**
1. Discrete RV recap: PMF P(X=k) assigns positive probability to each value.
2. Transition: as values become uncountably infinite, each point's probability becomes zero; probability "spreads" into density.
3. PDF f(x): density per unit length; area under curve over [a,b] gives P(a ≤ X ≤ b).
4. Validity conditions: f(x) ≥ 0 everywhere; ∫_{−∞}^∞ f(x)dx = 1.
5. CDF F(x) = ∫_{−∞}^x f(t)dt; f(x) = F′(x); F ranges in [0,1] and is non-decreasing.

**CPA arc (entry: P):**
- Pictorial: continuous curve above x-axis; shaded region between a and b represents P(a ≤ X ≤ b); a single vertical line at x = c has zero area.
- Abstract: P(a ≤ X ≤ b) = ∫_a^b f(x)dx; ∫_{−∞}^∞ f(x)dx = 1; F(x) = ∫_{−∞}^x f(t)dt; f(x) = F′(x).

**Prior knowledge activated:** discrete random variable (math.prob.random-variable) — PMF, expectation; definite integral (math.calc.definite-integral) — area as integral, limits of integration.

---

## Component 2 — Misconception Registry

### MC-1: SINGLE-VALUE-HAS-PROBABILITY [FOUNDATIONAL]
**Description:** Learner assigns positive probability to a single point, believing P(X = c) = f(c) or P(X = c) > 0.
**Surface form:** "If f(2) = 0.5, then the probability of getting exactly 2 is 0.5."
**Root cause:** Overgeneralising from discrete RV where P(X = k) > 0; the learner reads the density value as a direct probability.
**Trigger condition:** Any question asking for P(X = c) or computing P(a ≤ X ≤ b) with a = b.
**Repair target:** TA-B01.

### MC-2: PDF-IS-PROBABILITY
**Description:** Learner believes f(x) is a probability and must satisfy 0 ≤ f(x) ≤ 1; they reject PDFs where f(x) > 1.
**Surface form:** "f(x) = 3 on [0, 1/3] can't be valid because a probability can't exceed 1."
**Root cause:** Conflating probability (f(x)) with density (mass per unit length). The constraint is on the integral ∫f(x)dx = 1, not on the value f(x).
**Trigger condition:** Any PDF where f exceeds 1 on some interval; any question asking whether a given f is a valid PDF.
**Repair target:** TA-B02.

### MC-3: CDF-PDF-CONFUSION
**Description:** Learner conflates F(x) and f(x), using them interchangeably or applying the wrong one.
**Surface form:** "The probability P(X ≤ 1/2) equals f(1/2)." or "To check validity, I evaluate F(0) + F(1)."
**Root cause:** Both F and f involve the same variable x; learner does not distinguish the accumulation function from the density function.
**Trigger condition:** Any problem requesting either the CDF or the PDF when the other is given.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "A discrete RV X takes values 1, 2, 3 with P(X=1)=0.2, P(X=2)=0.5, P(X=3)=0.3. Find P(X=2)." Correct answer (0.5) confirms familiarity with discrete PMF. Follow up: "Why can't an analogous formula work when X can take any real value in [0,1]?" This exposes the discrete-to-continuous transition need.

**Scaffolding ladder:**
- Rung 1 (pictorial): show a smooth curve f(x) over [0,1]; shade the region from 0.3 to 0.7; confirm "the shaded area IS the probability."
- Rung 2 (structured): provide f(x) = 1 on [0,1]; guide computation of P(0.2 ≤ X ≤ 0.6) = ∫_{0.2}^{0.6} 1 dx = 0.4.
- Rung 3 (full understand): learner verifies validity of a given PDF and computes probabilities and CDF independently.

**Pacing note:** h=4 estimated hours; A01 + A02 in sessions 1–2; mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Concrete (discrete-to-continuous transition):
"A spinner randomly selects a real number in [0,1]. What is the probability of landing exactly on 0.5000...? There are infinitely many points; each one gets probability 0. But landing in [0.4, 0.6] has probability 0.2 — a twentieth of the dial."

REPRESENTATION 2 — Pictorial:
Draw f(x) as a smooth non-negative curve over [0,1] with total area 1.
- P(a ≤ X ≤ b) = shaded area between x=a and x=b under the curve.
- P(X = c) = area of a single vertical line = 0. A line has width 0; zero-width integral = 0.

REPRESENTATION 3 — Algebraic:
- f(x) ≥ 0 for all x (density is non-negative)
- ∫_{−∞}^∞ f(x)dx = 1 (total probability is 1)
- P(a ≤ X ≤ b) = ∫_a^b f(x)dx
- P(X = c) = ∫_c^c f(x)dx = 0 (integral over zero-width interval)
- F(x) = ∫_{−∞}^x f(t)dt; f(x) = F′(x)

COMPARISON TABLE:
| Property | Discrete RV | Continuous RV |
|---|---|---|
| Individual value | P(X=k) > 0 | P(X=c) = 0 |
| Interval prob | P(a ≤ X ≤ b) = Σ P(X=k) | P(a ≤ X ≤ b) = ∫_a^b f(x)dx |
| Total prob | Σ_k P(X=k) = 1 | ∫_{−∞}^∞ f(x)dx = 1 |
| Probability fn | PMF: P(X=k) ∈ [0,1] | PDF: f(x) ≥ 0 (can exceed 1) |

**Assessment primitive: P49**

PROBE: "A continuous RV X has density f(x) = 1/2 for 0 ≤ x ≤ 2, 0 elsewhere (uniform on [0,2]). Find P(X = 1)."
- CORRECT: "P(X=1) = 0. For any single point, the integral ∫_1^1 f(x)dx = 0." → proceed to A02.
- PARTIAL: sets up ∫_1^1 (1/2)dx correctly but hesitates about the answer → "An integral with equal lower and upper limits always equals zero: ∫_a^a g(x)dx = 0 for any function g. So P(X=1) = 0."
- INCORRECT: "P(X=1) = f(1) = 1/2." → Repair with B01 (SINGLE-VALUE-HAS-PROBABILITY). "f(1)=1/2 is the density at that point, not the probability of that point."
- NO_RESPONSE: "P(X = c) = ∫_c^c f(x)dx. The lower and upper limits are both 1; the integral covers a zero-width interval: ∫_1^1 (1/2)dx = (1/2)(1−1) = 0. Any single point has probability zero under a continuous distribution."

---

### TA-B01 — Repair for MC-1 (SINGLE-VALUE-HAS-PROBABILITY)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'P(X = c) = f(c) for a continuous RV.' This is incorrect. Single values carry zero probability because probability is measured by AREA, and a vertical line has zero area."

**P41 — MISCONCEPTION DETECTOR**
"X ~ Uniform[0,2], so f(x) = 1/2. What is P(X = 1)?
(A) P(X=1) = f(1) = 1/2.
(B) P(X=1) = ∫_1^1 (1/2)dx = 0."
[If A: learner holds MC-1.]
"Evaluate ∫_1^1 (1/2)dx. What do you get?"

**P64 — CONCEPTUAL SHIFT**
"Probability for a continuous RV is AREA, not height. f(x) tells you how 'dense' probability is near x — like a population density map giving people per square mile (not total people). A single point is a line with ZERO WIDTH; zero width means zero area means zero probability. This is why we always integrate over an interval: P(a < X < b) = ∫_a^b f(x)dx. The endpoints don't matter: P(a ≤ X ≤ b) = P(a < X < b) for a continuous RV."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

CONTRAST 1 — Point probability versus interval probability:
f(x) = 1/2 for 0 ≤ x ≤ 2 (uniform on [0,2]).

| Question | Computation | Answer |
|---|---|---|
| P(X = 1) | ∫_1^1 (1/2)dx | 0 |
| P(0.5 ≤ X ≤ 1.5) | ∫_{0.5}^{1.5} (1/2)dx = (1/2)(1) | 1/2 |
| P(X ≤ 1) | ∫_0^1 (1/2)dx = (1/2)(1) | 1/2 |
| P(X = 1 or X = 2) | ∫_1^1 + ∫_2^2 = 0 + 0 | 0 |

KEY CONTRAST: individual points → always 0; intervals with positive width → may be positive.

CONTRAST 2 — PDF f(x) versus CDF F(x):
For f(x) = 2x on [0,1], 0 elsewhere:

| Property | PDF f(x) | CDF F(x) |
|---|---|---|
| Definition | probability density at x | P(X ≤ x) = accumulated probability |
| Formula | f(x) = 2x (given directly) | F(x) = ∫_0^x 2t dt = x² for 0 ≤ x ≤ 1 |
| Range of values | f(x) ≥ 0; can exceed 1 | 0 ≤ F(x) ≤ 1 always |
| At x = 0 | f(0) = 0 | F(0) = 0 |
| At x = 1 | f(1) = 2 | F(1) = 1 |
| How to get other from one | F(x) = ∫_{−∞}^x f(t)dt | f(x) = F′(x) |
| Monotone? | not necessarily | always non-decreasing |

NOTE: f(1) = 2 > 1 is perfectly valid. f is a density; only its integral must equal 1.

Compute P(0.5 ≤ X ≤ 0.8) two ways:
- Via PDF: ∫_{0.5}^{0.8} 2x dx = [x²]_{0.5}^{0.8} = 0.64 − 0.25 = 0.39
- Via CDF: F(0.8) − F(0.5) = 0.64 − 0.25 = 0.39 ✓ (consistent)

**Assessment primitive: P49**

PROBE: "f(x) = 3x² for 0 ≤ x ≤ 1, 0 elsewhere. (a) Verify this is a valid PDF. (b) Find F(1/2)."
- CORRECT: "(a) ∫_0^1 3x²dx = [x³]_0^1 = 1 ✓; 3x²≥0 ✓. (b) F(1/2) = ∫_0^{1/2} 3x²dx = [x³]_0^{1/2} = (1/2)³ = 1/8." → proceed to A03.
- PARTIAL: correct validity check but evaluates F(1/2) = f(1/2) = 3(1/2)² = 3/4 → "F is the CDF — an integral, not the density value. F(1/2) = ∫_0^{1/2} 3x²dx = [x³]_0^{1/2} = 1/8." → Repair with B03.
- INCORRECT: validity step ∫_0^1 f(x)dx computed as f(0)+f(1) = 0+3 = 3 → "Validity requires the integral, not the sum of endpoint values. Compute ∫_0^1 3x²dx = [x³]_0^1 = 1−0 = 1 ✓."
- NO_RESPONSE: "(a) Validity: compute ∫_0^1 3x²dx. Antiderivative of 3x² is x³; evaluate from 0 to 1: 1³−0³=1 ✓. (b) CDF at 1/2: F(1/2)=∫_0^{1/2}3x²dx=[x³]_0^{1/2}=(1/2)³=1/8."

---

### TA-B02 — Repair for MC-2 (PDF-IS-PROBABILITY)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'f(x) must satisfy f(x) ≤ 1 because it is a probability.' f(x) is a probability DENSITY, not a probability. Its values can freely exceed 1."

**P41 — MISCONCEPTION DETECTOR**
"Consider f(x) = 3 for 0 ≤ x ≤ 1/3, 0 elsewhere. Is this a valid PDF?
(A) No — f(x) = 3 > 1 is invalid for a probability.
(B) Yes — check the integral: ∫_0^{1/3} 3 dx = 3·(1/3) = 1 ✓."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"Think of f(x) as population DENSITY (people per km²). A city can have 10,000 people/km² — that number easily exceeds 1, and it makes perfect sense. Total population = density × area (integrated). Similarly, f(x) is probability per unit length. It can exceed 1 on a narrow interval as long as the area underneath integrates to 1. The only constraints on f: (1) f(x) ≥ 0 everywhere; (2) ∫_{−∞}^∞ f(x)dx = 1. There is no constraint that f(x) ≤ 1."

→ Return to A02.

---

### TA-B03 — Repair for MC-3 (CDF-PDF-CONFUSION)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'F(x) and f(x) are interchangeable.' They are different objects: f(x) is the density at x; F(x) = P(X ≤ x) is the accumulated probability up to x."

**P41 — MISCONCEPTION DETECTOR**
"f(x) = 2x on [0,1]. Find F(1/2) = P(X ≤ 1/2).
(A) F(1/2) = f(1/2) = 2·(1/2) = 1.
(B) F(1/2) = ∫_0^{1/2} 2t dt = [t²]_0^{1/2} = 1/4."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"f → F: integrate. F → f: differentiate. F(x) = ∫_{−∞}^x f(t)dt; f(x) = F′(x). Key diagnostic: F(x) is always in [0,1]; F(0) = 0; F(∞) = 1; F is non-decreasing. f(x) has none of these constraints except f(x) ≥ 0 and total integral 1. Whenever you want P(X ≤ x), use F(x). Whenever you want probability over an interval [a,b], use ∫_a^b f(x)dx (which equals F(b)−F(a))."

→ Return to A02.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (SINGLE-VALUE-HAS-PROBABILITY)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (PDF-IS-PROBABILITY)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (CDF-PDF-CONFUSION)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Let X have CDF F(x) = x² for 0 ≤ x ≤ 1, F(x) = 0 for x < 0, F(x) = 1 for x > 1. Find: (a) f(x); (b) P(1/4 < X < 3/4); (c) P(X = 0.3)."
[Expected: (a) f(x)=F′(x)=2x on [0,1]; (b) ∫_{1/4}^{3/4}2x dx=[x²]_{1/4}^{3/4}=9/16−1/16=1/2; (c) 0.]

**Day 10 prompt:**
"A factory produces bolts with diameter X (mm). f(x) = k(x−9)(11−x) for 9 ≤ x ≤ 11, 0 elsewhere. Find k so that f is a valid PDF, then find P(9.5 ≤ X ≤ 10.5)."
[Expected: ∫_9^{11} k(x−9)(11−x)dx; substitute u=x−10: ∫_{−1}^{1} k(1−u²)du = k[u−u³/3]_{−1}^{1} = k·(4/3); so k=3/4. P(9.5≤X≤10.5)=∫_{9.5}^{10.5}(3/4)(x−9)(11−x)dx; by symmetry around 10, = (3/4)·∫_{−0.5}^{0.5}(1−u²)du=(3/4)[u−u³/3]_{−0.5}^{0.5}=(3/4)·(11/12)=11/16.]

**Day 30 prompt:**
"X has PDF f(x) = e^{−x} for x ≥ 0. Find P(X > t) for any t > 0 and use this to show that P(X > s+t | X > s) = P(X > t). This is the memoryless property."
[Expected: P(X>t)=∫_t^∞ e^{−x}dx=e^{−t}. P(X>s+t|X>s)=P(X>s+t)/P(X>s)=e^{−(s+t)}/e^{−s}=e^{−t}=P(X>t). Memoryless: past survival provides no information about future survival.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.prob.random-variable — discrete RV, PMF, expectation; the continuous case is the limiting extension
- math.calc.definite-integral — computing ∫_a^b f(x)dx as signed area; used for every probability computation in this blueprint

**Unlocked blueprints:**
- math.prob.pdf — formal PDF properties, expectation E[X]=∫xf(x)dx, variance
- math.prob.continuous-distributions — Normal, Exponential, Uniform; all are special cases of this blueprint's framework

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (SINGLE-VALUE-HAS-PROBABILITY) is the deepest conceptual shift — learners carry discrete intuition from math.prob.random-variable. The zero-width-integral argument (∫_c^c f(x)dx = 0) is the cleanest resolution; verify the learner can articulate it before proceeding.

**Density intuition:** Reinforce the physical density analogy (mass per unit length, population per km²) to make f(x) > 1 feel natural. Learners who understand density never confuse f(x) with a probability value.

**CDF-PDF relationship:** The chain F(x) = ∫f; f = F′ is the most reusable calculus link in probability. Confirm both directions are understood before the gate.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 11 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A03 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A03 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; no P07 (WORKED EXAMPLE PAIR); B-category: P11, P06 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (f(x)=2x on [0,1]; not seen in P77)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.9 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: P(X=c)=0 derivation, PDF validity conditions, CDF-PDF relationship, all computations verified correct

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A03 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.9 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"X ~ Uniform[0,2]: f(x) = 1/2 for 0 ≤ x ≤ 2, 0 elsewhere. Find P(1 ≤ X ≤ 1.5)."
[Expected: ∫_1^{1.5} (1/2)dx = (1/2)(0.5) = 1/4.]

**Item 2:**
"f(x) = 2x for 0 ≤ x ≤ 1, 0 elsewhere. Verify ∫_{−∞}^∞ f(x)dx = 1."
[Expected: ∫_0^1 2x dx = [x²]_0^1 = 1 ✓.]

**Item 3:**
"True or False: 'f(x) = 5 on [0, 0.2] is not a valid PDF because f(x) = 5 > 1.'"
[Expected: FALSE. ∫_0^{0.2} 5 dx = 5·0.2 = 1 ✓; f(x) ≥ 0 ✓. The density can exceed 1; only the integral must equal 1.]

**Item 4:**
"The CDF of X is F(x) = x² for 0 ≤ x ≤ 1. Find f(x) for 0 < x < 1."
[Expected: f(x) = F′(x) = 2x.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Let X have density f(x) = 2x for 0 ≤ x ≤ 1, 0 elsewhere.

(a) Verify that f is a valid PDF.
(b) Find P(1/4 ≤ X ≤ 3/4).
(c) What is P(X = 1/2)? Justify.
(d) Find the CDF F(x) for 0 ≤ x ≤ 1."

[Expected:
(a) f(x) = 2x ≥ 0 on [0,1] ✓; ∫_0^1 2x dx = [x²]_0^1 = 1 ✓. Valid PDF.
(b) ∫_{1/4}^{3/4} 2x dx = [x²]_{1/4}^{3/4} = 9/16 − 1/16 = 8/16 = 1/2.
(c) P(X=1/2) = 0. A single point has zero-width integral; P(X=c)=0 for any continuous RV.
(d) F(x) = ∫_0^x 2t dt = [t²]_0^x = x² for 0 ≤ x ≤ 1.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if parts (a)–(d) are all correct; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner understands the PDF/CDF distinction, P(X=c)=0, and can compute probabilities by integration.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 3 (False → True) or P76(c) wrong (P(X=1/2)>0): → TA-B01 (SINGLE-VALUE-HAS-PROBABILITY repair), then re-gate
- FAIL on Item 3 (f=5 invalid) or P76(a) wrong: → TA-B02 (PDF-IS-PROBABILITY repair), then re-gate
- FAIL on Item 4 (F′ error) or P76(d) wrong: → TA-B03 (CDF-PDF-CONFUSION repair), then re-gate
- FAIL on Item 1 or 2 (integration error only): → return to A02; practice integration for probabilities; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of continuous random variables: probability is area under f(x), single points have zero probability, and F(x) = ∫f(t)dt with f = F′.

Key anchors to carry forward:
- P(a ≤ X ≤ b) = ∫_a^b f(x)dx; P(X=c) = 0 always.
- Valid PDF: f(x) ≥ 0 and ∫_{−∞}^∞ f(x)dx = 1 (f(x) can exceed 1).
- CDF: F(x) = P(X ≤ x) = ∫_{−∞}^x f(t)dt; f(x) = F′(x).

Next concepts: math.prob.pdf (expectation, variance), math.prob.continuous-distributions (Normal, Exponential)."

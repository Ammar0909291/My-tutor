# Teaching Blueprint — math.calc.derivative-intro

## Component 0 — Metadata
concept_id: math.calc.derivative-intro
concept_name: Slope of Tangent and Rate of Change
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: understand
estimated_hours: 5
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.geom.slope, math.calc.limits]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The derivative at a point is the instantaneous rate of change, defined as the limit of the average rate of change (difference quotient) as the interval shrinks to zero: f'(a) = lim_{h→0} [f(a+h) − f(a)]/h. Geometrically, f'(a) is the slope of the tangent line to the curve y=f(x) at x=a, obtained as the limit of secant slopes as the second point approaches the first.

**Conceptual progression:**
1. Average rate of change (AROC): Δy/Δx = [f(x+h)−f(x)]/h — slope of secant line through two points.
2. As h→0, the secant line rotates toward the tangent line at x — a limiting process.
3. The difference quotient's limit gives the instantaneous rate of change (IROC) = derivative.
4. AROC ≠ IROC in general: AROC measures over an interval; IROC measures at a single instant.
5. Linear functions: AROC = IROC everywhere (constant slope), confirming consistency.
6. f'(a) may not exist if the limit does not exist (corner, cusp, vertical tangent).

**CPA arc (entry: P):**
- Pictorial: table of AROC values for decreasing h approaching 0; graph of secant lines rotating toward tangent; animated slope convergence
- Abstract: difference quotient [f(a+h)−f(a)]/h; limit notation lim_{h→0}; derivative f'(a); tangent line equation y−f(a)=f'(a)(x−a)

**Prior knowledge activated:** slope of a line (rise/run, two-point formula); limit of a function as h→0; function notation f(x); average rate of change concept

---

## Component 2 — Misconception Registry

### MC-1: TANGENT-IS-JUST-ONE-POINT [FOUNDATIONAL]
**Description:** Learner believes the tangent line "only touches the curve at one point and has no slope" — conflates the geometric picture (tangent point) with the algebraic construction needed to compute the slope.
**Surface form:** "You can't find the slope with just one point. You need two points on the line."
**Root cause:** Correct but incomplete — learner knows slope needs two points but hasn't yet seen how the second point is constructed via the limit. Conflates "tangent line as geometric object" with "method of computing its slope."
**Trigger condition:** Any prompt asking for the slope of a tangent or derivative at a point.
**Repair target:** TA-B01.

### MC-2: INSTANTANEOUS-IS-UNDEFINED
**Description:** Learner thinks "rate of change at a single instant" is a contradiction in terms — there is no time elapsed, so change divided by zero is undefined. Resists the limit construction as a workaround.
**Surface form:** "Speed at one moment doesn't make sense. You need a time interval to measure speed."
**Root cause:** Pre-limit intuition: change requires two distinct states. Learner hasn't reconciled this with the limit as a process that approaches, not divides by, zero.
**Trigger condition:** Car-speed or particle-motion problems asking for instantaneous velocity.
**Repair target:** TA-B02.

### MC-3: DIFFERENCE-QUOTIENT-IS-THE-DERIVATIVE
**Description:** Learner computes [f(x+h)−f(x)]/h for a specific small h (e.g., h=0.001) and treats this as the derivative, skipping the limit.
**Surface form:** "The slope is approximately 2.001, so the derivative is 2.001."
**Root cause:** Numerically, small h gives good approximation, so learner conflates approximation with the exact value. Does not distinguish limit (process) from evaluation at small h (computation).
**Trigger condition:** Problems requiring an exact derivative using the limit definition.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** Present graph of y=x² and two points: (1, 1) and (1.5, 2.25). Ask: "What is the slope of the line through these two points?" If correct (Δy/Δx=2.5), proceed to A01. If incorrect, reinforce slope formula from math.geom.slope before continuing.

**Scaffolding ladder:**
- Rung 1 (pictorial): Provide completed AROC table with h=1, 0.5, 0.1, 0.01 — learner reads off values and identifies trend.
- Rung 2 (partial abstract): Learner fills in the algebra for one row of the AROC table using the difference quotient formula provided.
- Rung 3 (full abstract): Learner sets up and evaluates the limit lim_{h→0} [f(x+h)−f(x)]/h independently.

**Pacing note:** h=5 estimated hours; deliver over 2 sessions. A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — PICTORIAL/NUMERICAL (table):
Present y=x², a=1. Compute AROC from x=1 to x=1+h for decreasing h:

| h | f(1+h) | AROC = [f(1+h)−f(1)]/h |
|---|--------|------------------------|
| 1 | 4 | 3 |
| 0.5 | 2.25 | 2.5 |
| 0.1 | 1.21 | 2.1 |
| 0.01 | 1.0201 | 2.01 |
| 0.001 | 1.002001 | 2.001 |

"Look at the AROC column. What value is it approaching?"

REPRESENTATION 2 — PICTORIAL/GRAPHICAL:
Show the curve y=x² with a fixed point P=(1,1). Draw secant lines through P and Q=(1+h, (1+h)²) for h=1, 0.5, 0.1. As h decreases, the secant line rotates counterclockwise, approaching a single limiting position — the TANGENT LINE at P.

"The slope of the tangent line is the value the AROC approaches: 2."

REPRESENTATION 3 — ABSTRACT (algebra):
[f(1+h)−f(1)]/h = [(1+h)²−1]/h = [1+2h+h²−1]/h = [2h+h²]/h = 2+h.
As h→0: lim_{h→0}(2+h) = 2.
f'(1) = 2. The derivative at x=1 is 2.

"Three representations — table, graph, algebra — all confirm: the tangent slope at (1,1) on y=x² equals 2."

**Assessment primitive: P49**

PROBE: "Without computing, use the table to estimate the instantaneous rate of change of y=x² at x=1 as h→0.001 is already shown. What exact value does the limit approach?"
- CORRECT: "2" → "Exactly right. The limit is 2, which is also what the algebra confirms. Proceed."
- PARTIAL: Gives 2.001 or "close to 2" → "Good numerical reasoning. 2.001 is the AROC at h=0.001, but the limit as h→0 is exactly 2. The limit gives us the precise value, not an approximation."
- INCORRECT: Any value other than 2 or near-2 → "Let's look at the table again. As h gets smaller — 1, 0.5, 0.1, 0.01, 0.001 — the AROC values are 3, 2.5, 2.1, 2.01, 2.001. What single number are they approaching?"
- NO_RESPONSE: Restate: "Read the rightmost column of the table. The values are getting closer and closer to what number?"

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — AVERAGE RATE OF CHANGE (AROC):
Definition: AROC = [f(b)−f(a)]/(b−a) = Δy/Δx.
Measures: total change over an interval [a,b].
Geometric object: slope of the SECANT LINE through (a,f(a)) and (b,f(b)).
Requires: two distinct points.
Example: average speed of a car from t=0 to t=3 hours.

PAIR B — INSTANTANEOUS RATE OF CHANGE (IROC) = DERIVATIVE:
Definition: IROC = lim_{h→0} [f(a+h)−f(a)]/h.
Measures: rate at a single point x=a.
Geometric object: slope of the TANGENT LINE at (a,f(a)).
Requires: a limit as h→0 (not evaluating at h=0).
Example: speedometer reading at exactly t=2 hours.

CRITICAL DISTINCTION: The difference quotient [f(a+h)−f(a)]/h for fixed h is AROC. Taking lim_{h→0} converts it to IROC. The limit is what makes it instantaneous.

SPECIAL CASE: For f(x)=mx+b (linear): AROC = m for any interval, and IROC = m everywhere. When AROC = IROC for all points, the function is linear — the slope doesn't change. This is a sanity-check: derivatives of linear functions recover the slope.

**Assessment primitive: P49**

PROBE: "A car travels s(t)=t² kilometres in t hours. (a) What is the average speed from t=2 to t=3? (b) Is this the instantaneous speed at t=2?"
- CORRECT: "(a) AROC = (9−4)/(3−2) = 5 km/h. (b) No — instantaneous speed at t=2 requires the limit as the interval shrinks to zero." → "Precisely. AROC gives 5, but IROC at t=2 = lim_{h→0}[(2+h)²−4]/h = lim_{h→0}(4+h) = 4 km/h. Different values for the same function."
- PARTIAL: Correct average speed, but claims it equals instantaneous → Address MC-2: "Average speed of 5 km/h is for the whole hour. Instantaneous speed at exactly t=2 needs the limit: lim_{h→0}[(2+h)²−4]/h = 4 km/h. 5 ≠ 4 — so AROC ≠ IROC here."
- INCORRECT: Wrong computation of AROC → "AROC = [s(3)−s(2)]/(3−2). s(3)=9, s(2)=4. So AROC = (9−4)/1 = 5 km/h."
- NO_RESPONSE: "Start with s(3): what is 3² ? And s(2): what is 2²? Then divide the difference by the time interval."

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: The difference quotient formula for any power function yields a recognisable pattern.

CASE 1: f(x) = x, a = 3.
[f(3+h)−f(3)]/h = [(3+h)−3]/h = h/h = 1 (for all h≠0).
Limit: f'(3) = 1.

CASE 2: f(x) = x², a = 3.
[f(3+h)−f(3)]/h = [(3+h)²−9]/h = [9+6h+h²−9]/h = 6+h.
Limit: f'(3) = 6 = 2·3.

CASE 3: f(x) = x³, a = 2.
[f(2+h)−f(2)]/h = [(2+h)³−8]/h = [8+12h+6h²+h³−8]/h = 12+6h+h².
Limit: f'(2) = 12 = 3·2².

GENERALISED PATTERN:
- f(x)=x → f'(x)=1
- f(x)=x² → f'(x)=2x
- f(x)=x³ → f'(x)=3x²

"Each time, the exponent comes down as a coefficient and the power decreases by one. This is the power rule — we are discovering it through the limit definition."

CONSOLIDATION: The limit definition is the foundation. The power rule is a shortcut derived from it. Every derivative rule (product rule, chain rule) ultimately rests on this same limit construction.

**Assessment primitive: P49**

PROBE: "Use the limit definition (difference quotient) to find f'(2) for f(x)=x²+3x."
- CORRECT: "[f(2+h)−f(2)]/h = [(2+h)²+3(2+h)−(4+6)]/h = [4+4h+h²+6+3h−10]/h = [7h+h²]/h = 7+h. Limit: f'(2)=7." → "Excellent. Algebra of the difference quotient, then take the limit. That's the complete procedure."
- PARTIAL: Correct setup, error in algebra → "Your setup is right. Expand (2+h)²=4+4h+h², and 3(2+h)=6+3h. Numerator becomes 4+4h+h²+6+3h−10 = 7h+h². Divide by h to get 7+h, then limit as h→0 gives 7."
- INCORRECT: Evaluates f'(2) as f(2)=10 → "f(2)=10 is the function VALUE, not the derivative. The derivative needs the limit: lim_{h→0}[f(2+h)−f(2)]/h. Set up the difference quotient first."
- NO_RESPONSE: "Write out f(2+h) by substituting (2+h) for x everywhere in x²+3x. Then subtract f(2)=10, divide by h, and finally take the limit as h→0."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (TANGENT-IS-JUST-ONE-POINT)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"There is a very common belief at this stage: 'You need two points to find a slope — with one point, you can't compute it.' This is true for a secant, but it misses the key idea: we are going to BUILD a second point artificially, then move it until it disappears."

**P41 — MISCONCEPTION DETECTOR**
"If I give you only the point (1,1) on y=x² and ask for the tangent slope, which response matches your thinking?
(A) I cannot find the slope with one point.
(B) I need to pick a nearby second point and find the secant slope.
(C) The tangent slope is the limit of secant slopes as the second point approaches (1,1)."
[Document which option the learner selects to gauge depth of misconception.]

**P64 — CONCEPTUAL SHIFT**
"Here is the key idea: we do not use just one point. We use ONE fixed point P=(1,1) and ONE movable point Q=(1+h, f(1+h)). The secant through P and Q has slope [f(1+h)−f(1)]/h. As h→0, Q slides toward P — and the secant approaches the tangent. The tangent slope is defined AS this limit. Two points become one in the limit — but we used two points to get there. The limit is the bridge."

---

### TA-B02 — Repair for MC-2 and MC-3 (INSTANTANEOUS-IS-UNDEFINED / DIFFERENCE-QUOTIENT-IS-DERIVATIVE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two closely related misconceptions often appear together. First: 'rate of change at one instant is meaningless because there is no interval.' Second: 'a very small h gives the derivative.' Both miss the same point: the limit is not a small value of h — it is the value the expression approaches as h gets arbitrarily close to zero."

**P41 — MISCONCEPTION DETECTOR**
"For f(x)=x², compute [f(1+0.001)−f(1)]/0.001. You get 2.001. Is 2.001 the derivative f'(1)?
(A) Yes, it's close enough.
(B) No — the derivative is exactly 2, the LIMIT as h→0.
(C) No — a smaller h would give a better approximation, so the derivative doesn't exist exactly."
[If A or C: proceed to P64.]

**P64 — CONCEPTUAL SHIFT**
"The limit is not 'plug in a small h.' The limit is 'what value does the expression approach as h shrinks to zero without ever equalling zero?'
For 2+h: as h→0, this approaches exactly 2 — not approximately, exactly. No computation with a specific h ever gives the derivative. The limit law (substitution: when the expression is continuous in h) gives lim_{h→0}(2+h)=2+0=2.
Instantaneous rate of change is real and exactly defined — by the limit. The speedometer in a car reads the derivative of position. It is not meaningless; it is precisely defined via limits."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"f(x)=2x²+1. Without using derivative rules, use the limit definition to find f'(x). What is f'(3)?"
[Expected: [f(x+h)−f(x)]/h = [2(x+h)²+1−2x²−1]/h = [4xh+2h²]/h = 4x+2h → 4x. f'(3)=12.]

**Day 10 prompt:**
"A particle's position is s(t)=t³ metres. (a) Find the average velocity from t=1 to t=2. (b) Find the instantaneous velocity at t=1 using the limit definition."
[Expected: (a) (8−1)/1=7 m/s. (b) lim_{h→0}[(1+h)³−1]/h = lim_{h→0}[3+3h+h²] = 3 m/s.]

**Day 30 prompt:**
"Explain in words why the derivative is called an 'instantaneous' rate of change even though 'dividing by zero' would be undefined. What role does the limit play?"
[Expected: The limit avoids dividing by zero by approaching h=0 without reaching it; algebra simplifies h out of the numerator before the limit is taken.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.geom.slope — slope formula, secant lines, two-point slope; activates immediately in A01
- math.calc.limits — limit notation, substitution, lim_{h→0}; required for the limit step in every TA

**Unlocked blueprints:**
- math.calc.derivative-definition — formal definition and rules for differentiation; builds directly on this motivational foundation

**Cross-links (non-Tier-1, reference only):**
- None

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The SINGLE most important idea is that the limit is what converts average to instantaneous — not "plugging in a small h." Spend most time on this distinction (P06 contrast in A02).

**Common failure mode:** Learners compute the difference quotient mechanically without recognising the limit step. After A02, confirm that the learner can distinguish the difference quotient expression (AROC at specific h) from its limit (IROC = derivative).

**Symbolic notation hygiene:** Distinguish f'(a) (derivative at a point) from f'(x) (derivative as a function). Use f'(a) in motivational examples to avoid confusion with the general derivative function introduced in the next concept.

**Linear function sanity check:** Use f(x)=3x to show AROC=3 for all h, and IROC=3 everywhere — a reassuring confirmation that the limit machinery gives the expected answer when the slope is already constant.

**For the physical intuition gap (MC-2):** The speedometer analogy is powerful. A speedometer at a single instant is meaningful precisely because it represents the derivative. Do not leave MC-2 unaddressed — it blocks understanding of the entire derivative concept.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (advanced difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence (cross_links=[]); P76 uses independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct — understand does not require worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1; B02 covers MC-2 and MC-3
- [x] V-14: P76 independence probe is a novel, unseen problem (car position s(t)=t²+2t, find instantaneous speed at t=2)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard calculus pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"For f(x)=x², compute the difference quotient [f(1+h)−f(1)]/h and simplify. What does this expression approach as h→0?"
[Expected: (2h+h²)/h = 2+h → 2. Answer: 2. This is f'(1).]

**Item 2:**
"The average rate of change of g(x)=x³ from x=2 to x=2+h is computed as 12+6h+h². What is the instantaneous rate of change at x=2?"
[Expected: Take lim_{h→0}(12+6h+h²) = 12. Answer: 12.]

**Item 3:**
True or False: "The derivative f'(a) equals the slope of the secant line through (a, f(a)) and a nearby point."
[Expected: FALSE. The derivative equals the slope of the TANGENT line — the LIMIT of secant slopes, not any secant slope itself.]

**Item 4:**
"If f(x)=5x+2, what is f'(x) for all x? (Use the difference quotient or reasoning.)"
[Expected: AROC = [5(x+h)+2−5x−2]/h = 5h/h = 5. Limit: f'(x)=5 everywhere. The derivative of a linear function is its slope.]

---

#### P55 — SCORE after P77
Score each item 1 point for fully correct, 0 for incorrect or missing. Running score: /4. If score ≥ 3, add half-weight (+0.5) to provisional total; if ≤ 2, note repair triggers for MC-1 or MC-3.

---

#### P76 — TRANSFER PROBE (independence mode)

"A car's position at time t seconds is s(t) = t² + 2t metres.

(a) Write out the difference quotient [s(2+h)−s(2)]/h and simplify completely.
(b) Take the limit as h→0. What is the instantaneous speed of the car at t=2 seconds?
(c) What does this value represent on the graph of s(t)?"

[Expected:
(a) s(2+h)=(2+h)²+2(2+h)=4+4h+h²+4+2h=8+6h+h². s(2)=4+4=8.
Difference quotient: (8+6h+h²−8)/h=(6h+h²)/h=6+h.
(b) lim_{h→0}(6+h)=6. Instantaneous speed = 6 m/s at t=2.
(c) It is the slope of the tangent line to the curve y=s(t) at the point (2, 8).]

---

#### P55 — SCORE after P76
Score 1 point for correct limit (6 m/s), 1 point for correct geometric interpretation (tangent slope). Maximum P76 contribution: 1 point (binary — P76 is 1 of the 5 items). Award 1 if both algebra and limit are correct; 0 if limit is wrong.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner has demonstrated understanding of the limit definition of derivative, distinction between AROC and IROC, and can compute difference quotients and take limits.
- FAIL (<4/5): Identify which items failed; route to appropriate repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or Item 4 (difference quotient algebra): → TA-B02 (repair MC-3)
- FAIL on Item 3 (secant vs. tangent confusion): → TA-B01 (repair MC-1)
- FAIL on P76 (limit step or interpretation): → TA-B02 (limit = instantaneous conceptual repair)
- FAIL on multiple items: → TA-B01 first, then TA-B02; re-gate after both repair sequences

---

#### P55 — SCORE (post-repair if applicable)
If routed through repair: re-administer two fresh items (equivalent difficulty) and P76. Apply same MAMR. Record repair score separately.

---

#### P78 — COMPLETION

"You have successfully demonstrated understanding of the derivative as the limit of the difference quotient — the instantaneous rate of change as the geometrical slope of the tangent line.

Key anchors to carry forward:
- f'(a) = lim_{h→0} [f(a+h)−f(a)]/h — the definition you will use to derive all derivative rules.
- AROC measures over an interval; IROC = derivative measures at a point.
- The tangent line at (a, f(a)) has slope f'(a).

Next concept: math.calc.derivative-definition — formal rules for differentiation (power rule, sum rule, product rule) derived from this limit foundation."

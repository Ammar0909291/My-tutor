# Teaching Blueprint — math.calc.continuity

## Component 0 — Metadata
concept_id: math.calc.continuity
concept_name: Continuity
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: analyze
estimated_hours: 8
mastery_threshold: 0.80
CPA_entry_stage: C
requires: [math.calc.limits]
cross_links: [math.real.continuity-rigorous, math.top.continuity-top]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A function f is continuous at x = a when three conditions hold simultaneously: (1) f(a) is defined; (2) lim_{x→a} f(x) exists; (3) lim_{x→a} f(x) = f(a). All three are required — a missing one produces a specific type of discontinuity. Three canonical discontinuity types: removable (hole), jump, and infinite (vertical asymptote). Piecewise functions require checking all three conditions at each boundary point. Continuity on an interval requires continuity at every point in the interval.

**Conceptual progression:**
1. Three-condition definition: f(a) defined AND limit exists AND limit equals f(a).
2. Discontinuity classification: failure of condition (1) → point undefined; failure of condition (2) → limit does not exist (jump or oscillation); failure of condition (3) → removable discontinuity (limit exists, f(a) ≠ limit).
3. Piecewise function analysis: evaluate left/right limits at boundary; check whether f(boundary) equals the limit; classify the discontinuity if any.
4. Continuous functions on intervals: polynomials, rational functions (on their natural domain), sin, cos are all continuous everywhere on their domain; the three-condition test is trivial for these but required for piecewise.

**CPA arc (entry: C — advanced difficulty):**
- Concrete: physical motion analogy — a continuous path has no teleportation; a discontinuity is a jump or hole in the path.
- Pictorial: graphs with marked holes (removable), vertical gaps (jump), vertical asymptotes (infinite).
- Abstract: the three-condition definition; lim_{x→a} f(x) = f(a) as the unifying formula.

**Prior knowledge activated:** limits (math.calc.limits) — one-sided limits, existence condition for a two-sided limit, limit laws; piecewise function evaluation; domain of rational functions.

---

## Component 2 — Misconception Registry

### MC-1: CONTINUOUS-MEANS-NO-GAPS [FOUNDATIONAL]
**Description:** Learner judges continuity by visual inspection alone — if the graph "looks connected," the function is continuous. Does not check all three conditions, so misses removable discontinuities (hole with f(a) defined elsewhere) or a function defined piecewise where both pieces have the same limit but f(a) is wrong.
**Surface form:** "The graph looks like one connected piece with no gaps, so it must be continuous."
**Root cause:** Continuity was introduced informally as "you can draw it without lifting your pencil," and the learner never moved beyond this intuition to the three-condition algebraic test.
**Trigger condition:** Any removable discontinuity problem where the graph appears visually smooth but a hole exists, or any piecewise function where pieces visually connect but f(a) ≠ limit.
**Repair target:** TA-B01.

### MC-2: LIMIT-EXISTS-MEANS-CONTINUOUS
**Description:** Learner believes that if lim_{x→a} f(x) exists, then f is automatically continuous at x = a. Ignores the third condition: limit must equal f(a).
**Surface form:** "The left and right limits are both 3, so the limit is 3, and the function must be continuous at x = 2."
**Root cause:** The first two continuity conditions (f(a) defined; limit exists) are checked correctly, but the third condition (limit = f(a)) is treated as automatically satisfied once the limit exists.
**Trigger condition:** Any piecewise or redefined function where the limit exists but f(a) is defined differently (e.g., g(a) = 6 while lim g = 5).
**Repair target:** TA-B02.

### MC-3: PIECEWISE-ALWAYS-DISCONTINUOUS
**Description:** Learner assumes piecewise-defined functions are always discontinuous at their boundary points because the formula changes there.
**Surface form:** "Since the rule changes at x = 2, it can't be continuous there — piecewise functions are always discontinuous."
**Root cause:** Piecewise functions are often introduced as examples of discontinuity in textbooks. The learner overgeneralises: formula change → discontinuity. They do not check whether the pieces happen to produce matching one-sided limits and function value.
**Trigger condition:** Any piecewise function that is actually continuous at its boundary point.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Find lim_{x→2} (x²+1)." If the learner evaluates the limit by direct substitution (giving 5) and justifies this as valid for polynomials, proceed to A01. This confirms they can compute limits and apply direct substitution, the core tool for continuity checking.

**Scaffolding ladder:**
- Rung 1 (concrete): motion analogy — a car moving on a road; a teleport (jump) or a missing section of road (hole) is a discontinuity. Map each to a condition failure.
- Rung 2 (pictorial): labelled graphs showing one each of removable, jump, and infinite discontinuity; learner identifies which condition fails in each.
- Rung 3 (full analyze): learner applies the three-condition checklist algebraically to piecewise functions without a graph.

**Pacing note:** h=8 estimated hours; A01 in session 1; A02 in sessions 2–3; A03 + mastery gate in sessions 3–4.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Concrete (motion analogy):
Imagine a car's position as a function of time. Continuous = the car moves along a connected road with no jumps. Three ways the road can fail:
- The road has no marking at a point (f(a) undefined) — the position is simply missing.
- The road has a sudden teleportation (left limit ≠ right limit) — the car vanishes and reappears elsewhere.
- The car arrives at a different location than the road leads to (limit ≠ f(a)) — a removable discontinuity: the road points to one place but the car is parked at a different spot.

REPRESENTATION 2 — Pictorial (three graphs):
- Removable discontinuity: graph of f with an open hole at (a, L) and a filled dot at (a, c) where c ≠ L. The limit L exists; f(a) = c; f(a) ≠ limit.
- Jump discontinuity: left half of graph ends with open circle at height L₁; right half begins with filled/open circle at height L₂ ≠ L₁. The limit does not exist.
- Infinite discontinuity: vertical asymptote at x = a; function goes to ±∞. The limit does not exist (or is ±∞, not a finite value).

REPRESENTATION 3 — Algebraic (three-condition checklist):
For f to be continuous at x = a, ALL three must hold:
  (C1) f(a) is defined.
  (C2) lim_{x→a} f(x) exists (equivalently: left limit = right limit = finite value L).
  (C3) lim_{x→a} f(x) = f(a).

LINKING STATEMENT: "The three conditions match the three ways the road analogy can fail. A function that passes all three is continuous at a — you can 'draw through' that point without lifting your pencil. Any failure means a specific type of discontinuity, and the type tells you which condition failed."

**Assessment primitive: P49**

PROBE: "For f(x) = (x²−4)/(x−2), check continuity at x = 2."
- CORRECT: "f(2): denominator=0, so f(2) is undefined → C1 fails. The function is NOT continuous at x=2 (removable discontinuity: the hole). Note: lim_{x→2} f(x) = lim_{x→2} (x+2) = 4; the limit exists even though f(2) does not." → proceed to A02.
- PARTIAL: computes the limit correctly but concludes 'continuous' because the limit exists → Repair with B02 (LIMIT-EXISTS-MEANS-CONTINUOUS). All three conditions must hold — C1 already failed.
- INCORRECT: graphs it and says "it looks continuous" (misses the hole) → Repair with B01 (CONTINUOUS-MEANS-NO-GAPS). The graph has a hole at (2,4) even if it looks smooth.
- NO_RESPONSE: "Start with C1: is f(2) defined? Substitute x=2: denominator=2−2=0 → division by zero → f(2) undefined. C1 FAILS immediately → not continuous at x=2. There is a hole at x=2."

---

### TA-B01 — Repair for MC-1 (CONTINUOUS-MEANS-NO-GAPS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'if the graph looks connected, the function is continuous.' Visual inspection can miss removable discontinuities — holes where the limit exists but f(a) is defined differently or not at all."

**P41 — MISCONCEPTION DETECTOR**
"Consider g(x) = (x²−1)/(x−1). Without simplifying, evaluate g(1). What does the graph look like near x=1?
(A) g(1)=2 and the graph is a straight line — continuous.
(B) g(1) is undefined; the graph looks like the line y=x+1 with a hole at (1,2)."
[If A: learner holds MC-1 or made an error cancelling without checking the domain.]

**P64 — CONCEPTUAL SHIFT**
"Algebraic cancellation: (x²−1)/(x−1)=(x+1)(x−1)/(x−1)=x+1 only when x≠1. At x=1 the original function is undefined — the cancelled form hides this. The graph has a hole at (1,2). The three-condition test catches this: C1 fails because g(1) is undefined. Visual inspection of the simplified graph y=x+1 would show no gap — but the gap IS there at x=1 in the original function. ALWAYS apply the three-condition algebraic test; never rely on the visual alone."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Three discontinuity types compared:

| Type | Which condition fails | Limit exists? | f(a) defined? | Limit = f(a)? | Fix? |
|---|---|---|---|---|---|
| Removable (hole) | C3 (or C1) | Yes | Maybe | No | Redefine f(a) = L |
| Jump | C2 | No (left ≠ right) | Maybe | N/A | Cannot fix with a single point |
| Infinite | C2 | No (→ ±∞) | Maybe | N/A | Vertical asymptote |

PAIR B — Concrete examples:

Removable: f(x) = (x²−4)/(x−2) at x=2. Limit=4, f(2) undefined. Fix: define f(2)=4.
Redefine: g(x) = {(x²−4)/(x−2) for x≠2; 4 at x=2} → g is continuous at x=2.

Jump: h(x) = {1 for x<0; 2 for x≥0} at x=0. lim_{x→0⁻}=1 ≠ lim_{x→0⁺}=2. Limit DNE. No way to redefine a single point to fix a jump.

Infinite: k(x) = 1/x at x=0. Both one-sided limits are ±∞ (infinite). Limit DNE. Vertical asymptote.

KEY DISTINCTION: Removable vs jump vs infinite. Removable is the only type fixable by redefining one value.

**Assessment primitive: P49**

PROBE: "Classify the discontinuity of f(x) = {x+1 for x<1; 3 for x≥1} at x=1."
- CORRECT: "f(1) = 3 (defined, C1 holds). lim_{x→1⁻} = 1+1 = 2; lim_{x→1⁺} = 3. Left limit ≠ right limit → C2 fails → limit DNE. Jump discontinuity. f(1)=3 matches the right-hand limit but the two-sided limit doesn't exist." → proceed to A03.
- PARTIAL: identifies discontinuity but labels it removable → "Removable means the limit exists but ≠ f(a). Here the LEFT limit (2) ≠ RIGHT limit (3) → the two-sided limit does NOT exist → this is a JUMP discontinuity, not removable."
- INCORRECT: concludes continuous because 'formula joins up' → Repair with B03 (PIECEWISE-ALWAYS-DISCONTINUOUS addressed in reverse — learner might also have MC-1). Recheck: left limit = 2 ≠ f(1) = 3 → not continuous.
- NO_RESPONSE: "C1: f(1)=3 ✓ defined. C2: compute left and right limits separately. Left: lim_{x→1⁻}(x+1)=2. Right: lim_{x→1⁺}(3)=3. Since 2≠3, limit DNE → C2 fails. Jump discontinuity."

---

### TA-B02 — Repair for MC-2 (LIMIT-EXISTS-MEANS-CONTINUOUS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'if the limit at a exists, the function is continuous at a.' A limit existing satisfies only C2. You must also check C1 (f(a) defined) and C3 (limit equals f(a))."

**P41 — MISCONCEPTION DETECTOR**
"Consider f(x) = {x²+1 for x≠2; 6 at x=2}. The limit as x→2 is 5. Is f continuous at x=2?
(A) Yes — the limit exists, so it's continuous.
(B) No — lim=5 but f(2)=6; limit ≠ f(2), so C3 fails."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"Continuity requires ALL THREE conditions simultaneously. The limit existing (C2) is necessary but not sufficient. The third condition, C3: lim f(x) = f(a), is the joining condition — it says the function's value AT the point matches what the function approaches FROM both sides. In this example: the function approaches 5 from both sides, but its actual value at x=2 is 6. The function 'teleports' to 6 — a removable discontinuity. Fix it by redefining f(2)=5. Never declare continuity from C2 alone."

→ Return to A01 or A02 as appropriate.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: systematic three-condition analysis of piecewise functions.

EXAMPLE 1 — Continuous at boundary:
f(x) = {x²+1 for x≤2; 3x−1 for x>2}. Check continuity at x=2.
- C1: f(2) = 2²+1 = 5. Defined ✓.
- C2: lim_{x→2⁻} = 4+1 = 5; lim_{x→2⁺} = 3(2)−1 = 5. Both limits = 5, so limit = 5 ✓.
- C3: lim = 5 = f(2) = 5 ✓.
ALL THREE hold → f is continuous at x=2.

EXAMPLE 2 — Removable discontinuity:
g(x) = {x²+1 for x<2; 6 at x=2; 3x−1 for x>2}. Check at x=2.
- C1: g(2) = 6. Defined ✓.
- C2: lim_{x→2⁻} = 5; lim_{x→2⁺} = 5. Limit = 5 ✓.
- C3: lim = 5 ≠ g(2) = 6. C3 FAILS.
Removable discontinuity at x=2. Fix: redefine g(2) = 5.

EXAMPLE 3 — Jump discontinuity:
h(x) = {x+1 for x<1; 3 for x≥1}. Check at x=1.
- C1: h(1)=3 ✓.
- C2: lim_{x→1⁻}=2; lim_{x→1⁺}=3. 2≠3 → limit DNE. C2 FAILS.
Jump discontinuity; not fixable by redefining h(1).

GENERALISED PROCEDURE for piecewise f at boundary a:
1. Compute f(a) from the formula that applies at x=a (the "at" or "≥" or "≤" piece).
2. Compute lim_{x→a⁻} from the formula that applies for x<a.
3. Compute lim_{x→a⁺} from the formula that applies for x>a.
4. Check: f(a) defined? → left = right? → limit = f(a)?
5. Classify: all ✓ = continuous; C3 fails only = removable; C2 fails = jump or infinite.

**Assessment primitive: P49**

PROBE: "For f(x) = {x²−1 for x<2; 3 for x=2; 2x for x>2}, determine continuity at x=2. Classify any discontinuity."
- CORRECT: "f(2)=3 (C1 ✓). lim_{x→2⁻}=4−1=3; lim_{x→2⁺}=4. Left=3 ≠ right=4 → C2 fails → jump discontinuity. Also, even from the left, lim=3=f(2), so C3 would hold only for the left limit — but since C2 fails, the function is discontinuous." → proceed to A04.
- PARTIAL: computes f(2) and one-sided limits correctly but misclassifies as removable → "Removable: limit exists (both sides equal) but ≠ f(a). Here left limit (3) ≠ right limit (4): the two-sided limit doesn't exist → JUMP, not removable."
- INCORRECT: states continuous because left limit = f(2) → "Continuity at a point requires the TWO-SIDED limit to equal f(a). The right limit is 4 ≠ 3 = f(2) AND ≠ 3 = left limit. The two-sided limit doesn't exist. Not continuous."
- NO_RESPONSE: "Step 1: f(2)=3. Step 2: left limit as x→2⁻: use x²−1; at x=2: 4−1=3. Step 3: right limit as x→2⁺: use 2x; at x=2: 4. Since 3≠4, C2 fails. Jump discontinuity."

---

### TA-B03 — Repair for MC-3 (PIECEWISE-ALWAYS-DISCONTINUOUS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'piecewise functions are always discontinuous at their boundary points.' A piecewise function CAN be continuous at a boundary — if all three conditions hold. The formula change does not automatically cause a discontinuity."

**P41 — MISCONCEPTION DETECTOR**
"Consider f(x) = {2x for x≤1; x+1 for x>1}. Is f continuous at x=1?
(A) No — the formula changes at x=1, so it must be discontinuous.
(B) Check: f(1)=2; lim_{x→1⁻}=2; lim_{x→1⁺}=2. All three conditions hold → continuous."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"The formula change at a boundary means different algebraic rules apply left and right. But if the two pieces happen to produce the same value — the same limit from both sides AND f(a) matches — the function is continuous. The key test is: do the pieces 'join up' at the boundary? A piecewise function is discontinuous ONLY when they don't. Many smooth, well-behaved functions are defined piecewise (e.g., |x| = {x for x≥0; −x for x<0} is continuous everywhere). Always apply the three-condition test; do not assume discontinuity."

→ Return to A02 or A03 as appropriate.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (CONTINUOUS-MEANS-NO-GAPS)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (LIMIT-EXISTS-MEANS-CONTINUOUS)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A01 or A02.

### TA-B03 — Repair for MC-3 (PIECEWISE-ALWAYS-DISCONTINUOUS)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02 or A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Find all x at which f(x) = (x²−9)/(x−3) is discontinuous. Classify each discontinuity and determine whether it is removable."
[Expected: f(3) undefined — C1 fails at x=3. Limit as x→3: (x+3)→6. Limit exists = 6; f(3) undefined → removable discontinuity. Fix: define f(3)=6. No other discontinuities (denominator only zero at x=3).]

**Day 10 prompt:**
"For f(x) = {ax+1 for x<2; x²−1 for x≥2}, find the value of a that makes f continuous at x=2."
[Expected: For continuity: lim_{x→2⁻} = 2a+1 must equal f(2) = 4−1 = 3 and lim_{x→2⁺} = 3. Set 2a+1=3 → a=1. Verify: left limit = 3 = f(2) = 3 ✓.]

**Day 30 prompt:**
"Explain why the Intermediate Value Theorem (IVT) requires the function to be CONTINUOUS on [a,b], not just defined there. Give a counterexample showing the conclusion fails without continuity."
[Expected: IVT states: if f is continuous on [a,b] and N is between f(a) and f(b), there exists c∈(a,b) with f(c)=N. Without continuity, the function can jump over N. Counterexample: f(x) = {1 for x∈[0,1]; 3 for x∈(1,2]}. f(0)=1, f(2)=3. N=2 is between 1 and 3, but f(x)∈{1,3} so there is no c with f(c)=2. The jump at x=1 allows the function to skip the value 2 entirely.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.calc.limits — one-sided limits, two-sided limit existence, limit laws, direct substitution for polynomials; these are the computational tools for all three continuity conditions

**Unlocked blueprints:**
- math.calc.differentiation — derivative definition requires the limit lim_{h→0} [f(x+h)−f(x)]/h to exist; differentiability at a point implies continuity there (but not vice versa); continuity is the prerequisite concept
- math.calc.intermediate-value-theorem — IVT applies only to continuous functions on closed intervals; a correct statement and application of IVT requires mastery of continuity

**Cross-links:** math.real.continuity-rigorous (ε-δ definition), math.top.continuity-top (topological definition) — both are NOT Tier 1; P76 uses independence mode.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (CONTINUOUS-MEANS-NO-GAPS) is the most fundamental obstacle: learners relying on visual inspection will always miss removable discontinuities. Establish the three-condition algebraic test immediately as the authoritative method, with graphical intuition as a supplement — not the decision procedure.

**Three-condition checklist as a structured tool:** Present the checklist as a literal three-step procedure. Learners who follow the checklist mechanically catch discontinuities they would otherwise miss. After several exercises, the checklist becomes internalised.

**Piecewise function boundary protocol:** Make the boundary-point computation explicit: (1) which piece applies AT x=a? (2) compute left limit from the left piece; (3) compute right limit from the right piece; (4) compare. This procedural clarity is what distinguishes MC-3 repair: students who see the three-step checklist applied correctly to a continuous piecewise function immediately see that the formula change is irrelevant to the outcome.

**Removable vs jump terminology:** Emphasise that "removable" means fixable — you can remove the discontinuity by redefining one point. Jump means the function literally makes a jump and cannot be repaired by changing one value. This concreteness helps learners correctly classify.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: CPA_entry_stage=C (advanced difficulty); concrete anchor included in A01 (motion analogy) ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links not Tier 1; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=analyze; no P07 (WORKED EXAMPLE PAIR not required); B-category primitives are P11, P06, P04 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (piecewise continuity analysis with removable vs jump classification)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All continuity definitions, discontinuity types, and piecewise function examples consistent with standard calculus pedagogy; three-condition definition matches Spivak/Stewart; no fabricated theorems

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Is f(x) = x² continuous at x = 3? Apply the three-condition test."
[Expected: C1: f(3)=9 ✓. C2: lim_{x→3} x²=9 ✓. C3: 9=9 ✓. All three hold → f is continuous at x=3. (Polynomials are continuous everywhere.)]

**Item 2:**
"For g(x) = {x+1 for x<1; 3 for x≥1}, apply the three-condition test at x=1 and classify any discontinuity."
[Expected: C1: g(1)=3 ✓. C2: lim_{x→1⁻}=2; lim_{x→1⁺}=3. 2≠3 → limit DNE → C2 fails. Jump discontinuity at x=1.]

**Item 3:**
True or False: "If lim_{x→a} f(x) exists, then f is continuous at x = a."
[Expected: FALSE. The limit existing satisfies C2 only. Continuity also requires C1 (f(a) defined) and C3 (limit = f(a)). Counterexample: f(x)=(x²−4)/(x−2) at x=2; limit=4 but f(2) undefined.]

**Item 4:**
"Identify the type of discontinuity of f(x) = 1/(x−1) at x=1."
[Expected: C1: f(1) undefined (denominator zero). C2: lim_{x→1⁻}=−∞; lim_{x→1⁺}=+∞. Limit DNE (infinite). Infinite discontinuity (vertical asymptote at x=1). C2 and C1 both fail.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Analyse the piecewise function:
  f(x) = {x²+1 for x≤2; 3x−1 for x>2}

and then contrast it with:
  g(x) = {x²+1 for x<2; 6 at x=2; 3x−1 for x>2}.

For each function at x=2:
(a) Compute f(2) (or g(2)) — check C1.
(b) Compute the left and right limits — check C2.
(c) Check C3.
(d) State whether the function is continuous or classify the discontinuity."

[Expected:
f(x):
(a) f(2) = 4+1 = 5. C1 ✓.
(b) lim_{x→2⁻} = 4+1 = 5; lim_{x→2⁺} = 3(2)−1 = 5. Both = 5 → limit = 5. C2 ✓.
(c) lim = 5 = f(2) = 5. C3 ✓.
(d) f is continuous at x=2.

g(x):
(a) g(2) = 6. C1 ✓.
(b) lim_{x→2⁻} = 5; lim_{x→2⁺} = 5. Both = 5 → limit = 5. C2 ✓.
(c) lim = 5 ≠ g(2) = 6. C3 FAILS.
(d) Removable discontinuity at x=2. Fix: redefine g(2) = 5.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (d) correctly identifies f as continuous AND g as having a removable discontinuity, 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can apply the three-condition test, classify discontinuities, and distinguish removable from jump and infinite types.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 3 or P76 (claims continuity from limit alone): → TA-B02 (LIMIT-EXISTS-MEANS-CONTINUOUS repair), then re-gate
- FAIL on Item 2 (calls jump discontinuity "removable" or "continuous"): → TA-B01 (CONTINUOUS-MEANS-NO-GAPS) if concludes continuous; else re-explain jump vs removable classification; re-gate
- FAIL on Item 4 (calls infinite discontinuity "removable"): → return to A02 discontinuity classification contrast; re-gate
- FAIL on multiple items: → B01 + B02 as needed; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to apply the three-condition continuity test, classify discontinuities, and analyse piecewise functions at boundary points.

Key anchors to carry forward:
- Three conditions for continuity at a: (C1) f(a) defined; (C2) lim_{x→a} f(x) exists; (C3) limit = f(a). All three required.
- Discontinuity types: removable (C3 fails, limit exists) — fixable; jump (C2 fails, one-sided limits differ) — not fixable; infinite (C2 fails, limit ±∞) — vertical asymptote.
- Piecewise at boundary: compute left limit, right limit, and f(a) separately; compare all three.
- Limit existing is necessary but NOT sufficient for continuity — C3 is the joining condition.

Next concepts: math.calc.differentiation (differentiability implies continuity; the derivative limit requires the function to be continuous), math.calc.intermediate-value-theorem (IVT requires continuity on a closed interval)."

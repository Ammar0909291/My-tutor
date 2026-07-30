<!-- BLUEPRINT: math.trig.double-angle-formulas -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Double-Angle Formulas
**Concept ID:** `math.trig.double-angle-formulas`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=4 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.double-angle-formulas |
| name | Double-Angle Formulas |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 4 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.trig.sum-difference-formulas |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.sum-difference-formulas**: sin(A+B) = sinA cosB + cosA sinB; cos(A+B) = cosA cosB − sinA sinB; these are the source of the double-angle formulas

### Target Knowledge State
Student derives sin 2θ = 2 sin θ cos θ and cos 2θ = cos²θ − sin²θ from the sum formulas by setting A = B = θ. Student states the three equivalent forms of cos 2θ (choosing based on context) and derives tan 2θ = 2 tan θ/(1 − tan²θ). Student applies the formulas to compute exact values and simplify expressions, including the power-reducing forms sin²θ = (1 − cos 2θ)/2 and cos²θ = (1 + cos 2θ)/2.

### Conceptual Obstacles
1. Writing sin 2θ = 2 sin θ (doubling the value instead of using the product formula)
2. Choosing the inefficient form of cos 2θ given only one of sin θ or cos θ
3. Omitting the (1 − tan²θ) denominator in tan 2θ — writing 2 tan θ instead

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DOUBLE-ANGLE-SCALING | Student writes sin 2θ = 2 sin θ, treating 2θ as a scalar multiplication on the function value | Any "find sin 2θ" problem |
| MC-2 | WRONG-COS-DOUBLE-FORM | Student uses cos²θ − sin²θ when only cos θ is known (requiring an extra step to find sin θ), instead of using 2cos²θ − 1 directly | "Given cos θ, find cos 2θ" problems |
| MC-3 | TAN-DOUBLE-NO-DENOMINATOR | Student writes tan 2θ = 2 tan θ and omits the (1 − tan²θ) denominator | Any "find tan 2θ" problem |

**Foundational Misconception:** MC-1 (DOUBLE-ANGLE-SCALING) — a fundamental misunderstanding of how trig functions compose. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — derive directly from sum-difference formulas.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Derive sin 2θ and cos 2θ by setting A=B=θ in the sum formulas; show all three cos 2θ forms; derive tan 2θ; derive power-reducing identities
2. **A02 P04 PATTERN INDUCTION** — Gallery of exact-value computations from given sin/cos/tan; automate form-selection
3. **A03 P06 CONTRAST PAIR** — Three forms of cos 2θ: contrast which form requires the fewest steps for "given cos θ only", "given sin θ only", "given both"
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving the Double-Angle Formulas

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground all formulas in the sum formulas; prevent MC-1 by showing the product structure; derive all forms

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — sin 2θ:**

Use sin(A+B) = sinA cosB + cosA sinB with A = B = θ:

sin(θ + θ) = sin θ cos θ + cos θ sin θ = **2 sin θ cos θ**

So: **sin 2θ = 2 sin θ cos θ** — a product, not 2 × sin θ.

**Stage B — cos 2θ (three equivalent forms):**

Use cos(A+B) = cosA cosB − sinA sinB with A = B = θ:

cos 2θ = cos²θ − sin²θ &emsp; *[Form 1: balanced]*

Substitute sin²θ = 1 − cos²θ: **cos 2θ = 2cos²θ − 1** &emsp; *[Form 2: only cos θ]*

Substitute cos²θ = 1 − sin²θ: **cos 2θ = 1 − 2sin²θ** &emsp; *[Form 3: only sin θ]*

**Stage C — tan 2θ:**

Use tan(A+B) = (tanA + tanB)/(1 − tanA tanB) with A = B = θ:

**tan 2θ = 2 tan θ / (1 − tan²θ)**

**Stage D — Power-reducing identities (rearranging Form 2 and Form 3):**

cos 2θ = 2cos²θ − 1 → **cos²θ = (1 + cos 2θ)/2**

cos 2θ = 1 − 2sin²θ → **sin²θ = (1 − cos 2θ)/2**

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* If sin θ = 3/5 and cos θ = 4/5 (θ acute), what is sin 2θ?

(A) 6/5
(B) 24/25
(C) 12/5
(D) 7/25

*Branch CORRECT (B):* sin 2θ = 2 sin θ cos θ = 2 · (3/5) · (4/5) = 24/25. ✓ Proceed to A02.

*Branch INCORRECT (A):* 6/5 > 1 and cannot be a sine value. sin 2θ = 2 sin θ cos θ = 2·(3/5)·(4/5) = 24/25. The formula is a product of sin θ and cos θ, not just 2×sinθ. Proceed to A02.

*Branch INCORRECT (D):* That is cos 2θ = cos²θ − sin²θ = 16/25 − 9/25 = 7/25, not sin 2θ. sin 2θ = 2·(3/5)·(4/5) = 24/25. Proceed to A02.

*Branch NO_RESPONSE:* sin 2θ = 2 sin θ cos θ = 2·(3/5)·(4/5) = **24/25**. Proceed to A02.

---

### Teaching Action A02 — Computing Double-Angle Values

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate form selection; build exact-value fluency; address MC-2

---

**[P04 — PATTERN INDUCTION]**

**Procedure:** Identify which of sin θ, cos θ, tan θ is given → choose the matching cos 2θ form to minimize steps.

**Gallery:**

| Given | sin 2θ | cos 2θ (form) | tan 2θ |
|-------|--------|--------------|--------|
| sin θ = 3/5, cos θ = 4/5 (Q1) | 2·(3/5)·(4/5) = 24/25 | (4/5)²−(3/5)² = 7/25 | 24/7 |
| cos θ = 5/13, Q1 → sin θ = 12/13 | 2·(12/13)·(5/13) = 120/169 | 2·(25/169)−1 = −119/169 | 120/−119 |
| sin θ = √2/2, cos θ = √2/2 (45°) | 2·(√2/2)·(√2/2) = 1 | 0 | undefined |

**Shortcut for tan 2θ from sin 2θ and cos 2θ:** tan 2θ = sin 2θ/cos 2θ (avoids the tan formula directly).

**Simplification:**

2 sin(x/2) cos(x/2) = sin(2 · x/2) = sin x — the double-angle formula in reverse.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Given only cos θ = 3/5 (θ acute), find cos 2θ in one step without finding sin θ.

(A) 2·(9/25) − 1 = −7/25
(B) (3/5)² − (4/5)² = −7/25 (after finding sin θ)
(C) 1 − 2·(4/5)² = −7/25 (after finding sin θ)
(D) 2·(3/5)·(4/5) = 24/25

*Branch CORRECT (A):* cos 2θ = 2cos²θ − 1 = 2·(9/25) − 1 = 18/25 − 25/25 = **−7/25** — directly from cos θ alone. ✓ Proceed to A03.

*Branch INCORRECT (B, C):* Both are correct but require an extra step (finding sin θ = 4/5 first). The form 2cos²θ − 1 avoids that: cos 2θ = 2(3/5)² − 1 = −7/25 in one line. Proceed to A03.

*Branch INCORRECT (D):* That is sin 2θ = 2sinθcosθ, which requires sin θ. For cos 2θ from only cos θ, use 2cos²θ−1 = −7/25. Proceed to A03.

*Branch NO_RESPONSE:* cos 2θ = 2cos²θ − 1 = 2·(9/25) − 1 = **−7/25** (Form 2, using cos θ only). Proceed to A03.

---

### Teaching Action A03 — Choosing the Right Form of cos 2θ

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Teach the efficiency of form selection; prevent MC-2

---

**[P06 — CONTRAST PAIR]**

**Problem:** θ in Q1 with sin θ = 5/13. Find cos 2θ.

**Route A — Form 1 (cos²θ − sin²θ) — needs both:**
Need cos θ first: cos θ = 12/13. Then cos 2θ = (144 − 25)/169 = 119/169. (Two steps.)

**Route B — Form 3 (1 − 2sin²θ) — uses given directly:**
cos 2θ = 1 − 2·(25/169) = 1 − 50/169 = 119/169. (One step.)

**Form selection rule:**

| What is given | Use form |
|--------------|---------|
| Both sin θ and cos θ | Form 1: cos²θ − sin²θ |
| Only cos θ | Form 2: 2cos²θ − 1 |
| Only sin θ | Form 3: 1 − 2sin²θ |
| Only tan θ | Derive cos θ from sec²θ = 1+tan²θ, then Form 2 |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Find tan 2θ if tan θ = 2.

(A) 4
(B) −4/3
(C) 4/3
(D) −4

*Branch CORRECT (B):* tan 2θ = 2 tan θ/(1 − tan²θ) = 4/(1 − 4) = 4/(−3) = **−4/3**. ✓ Proceed to A04.

*Branch INCORRECT (A):* 2 tan θ = 4 is the numerator only. The formula requires dividing by (1 − tan²θ) = 1 − 4 = −3: tan 2θ = 4/(−3) = −4/3. Proceed to A04.

*Branch INCORRECT (C, D):* Check the denominator sign. 1 − tan²θ = 1 − 4 = −3. tan 2θ = 4/(−3) = −4/3. Proceed to A04.

*Branch NO_RESPONSE:* tan 2θ = 2·2/(1 − 2²) = 4/(1−4) = 4/(−3) = **−4/3**. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Given sin θ = 3/5 (θ in Q1), find sin 2θ, cos 2θ, and tan 2θ exactly.

**Problem 2.** Find sin(2·30°) using the double-angle formula. Verify against the known value of sin 60°.

**Problem 3.** Simplify: 2sin(x/2)cos(x/2).

**Problem 4.** Given tan θ = 2, find tan 2θ.

---

**[P55 — SCORE]**

*Answers:*

1. cos θ = 4/5. sin 2θ = 2·(3/5)·(4/5) = **24/25**. cos 2θ = (4/5)²−(3/5)² = **7/25**. tan 2θ = sin2θ/cos2θ = 24/7 ✓

2. sin(60°) = 2·sin30°·cos30° = 2·(1/2)·(√3/2) = **√3/2**. Matches the known sin 60° = √3/2 ✓

3. 2sin(x/2)cos(x/2) = sin(2·x/2) = **sin x** ✓

4. tan 2θ = 2·2/(1−4) = **−4/3** ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* The range of a projectile launched at angle θ is R = (v₀²/g)·sin 2θ.

*(a)* Show that maximum range occurs at θ = 45°.

*(b)* Find the ratio R(30°)/R(45°) — the range at 30° as a fraction of the maximum range.

*Expected answer:*

*(a)* sin 2θ is maximized when 2θ = π/2, i.e., **θ = π/4 = 45°**. At this angle, sin 2θ = sin 90° = 1.

*(b)* R(30°)/R(45°) = sin(60°)/sin(90°) = (√3/2)/1 = **√3/2 ≈ 0.866**. So the range at 30° is about 86.6% of the maximum.

---

**[P55 — SCORE]**

Transfer probe: 1 point (both parts correct).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.8 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 4–5/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed item; scaling error → B01; form selection → B02; tan denominator → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-derive from sum formulas; emphasize product structure of sin 2θ; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.double-angle-formulas` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** math.trig.half-angle-formulas (derives from power-reducing forms of cos 2θ).

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DOUBLE-ANGLE-SCALING Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"sin 2θ does NOT equal 2 sin θ. The correct formula is sin 2θ = 2 sin θ cos θ — a product involving BOTH sin θ and cos θ."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* If sin θ = 0.6, what is sin 2θ? (Without finding cos θ first, can you compute it?)
*Correct response:* No — you need cos θ too. If θ is in Q1, cos θ = 0.8. sin 2θ = 2·0.6·0.8 = 0.96. (NOT 1.2 = 2·0.6, which exceeds 1 and is impossible for a sine value.)

**[P64 — CONCEPTUAL SHIFT]**
"Doubling an angle is not doubling the function's output. The function sin is not linear: sin(2θ) ≠ 2 sin(θ). Derive it from the sum formula: sin(θ+θ) = sinθcosθ + cosθsinθ = 2sinθcosθ. This product structure shows why both sin θ and cos θ must appear."

---

### Repair Action B02 — WRONG-COS-DOUBLE-FORM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"There are three equivalent forms of cos 2θ. When only cos θ is given, use the form 2cos²θ − 1 to avoid an extra step. When only sin θ is given, use 1 − 2sin²θ."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* cos θ = 5/13. Find cos 2θ using the fastest form — without finding sin θ.
*Correct response:* cos 2θ = 2·(25/169) − 1 = 50/169 − 169/169 = −119/169.

**[P64 — CONCEPTUAL SHIFT]**
"The three forms are: (1) cos²θ−sin²θ — use when BOTH are given. (2) 2cos²θ−1 — use when ONLY cos θ is given (the cos² term matches). (3) 1−2sin²θ — use when ONLY sin θ is given (the sin² term matches). Match the formula to what you have."

---

### Repair Action B03 — TAN-DOUBLE-NO-DENOMINATOR Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The tan double-angle formula has a denominator: tan 2θ = 2 tan θ / (1 − tan²θ). Writing just 2 tan θ gives the numerator only and is wrong."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* tan θ = 1. What is tan 2θ?
*Correct response:* tan 2θ = 2·1/(1−1) = 2/0 = undefined. tan(2·45°) = tan 90° is indeed undefined — the formula captures this correctly. If you wrote 2 tan θ = 2, the formula gave a defined answer for an undefined quantity.

**[P64 — CONCEPTUAL SHIFT]**
"The denominator (1 − tan²θ) is essential — it becomes 0 exactly when 2θ = 90°+nπ, where tan 2θ is undefined. You can verify: tan 2θ = sin 2θ/cos 2θ = 2sinθcosθ/(cos²θ−sin²θ). Dividing numerator and denominator by cos²θ gives 2tanθ/(1−tan²θ). The denominator is not decorative."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Given cos θ = −3/5 (θ in Q3), find sin 2θ, cos 2θ, tan 2θ. |
| R2 | 3 days | Simplify: cos²(3x) − sin²(3x). |
| R3 | 7 days | Prove: sin 3θ = 3 sin θ − 4 sin³θ. (Hint: sin 3θ = sin(2θ+θ).) |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | math.trig.half-angle-formulas |
| Requires (Tier-1) | math.trig.sum-difference-formulas |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent projectile-range problem.

---

## Component 8 — Teaching Notes

- **Derivation is the fastest memorization:** Students who can re-derive sin 2θ = 2sinθcosθ in 15 seconds from sin(A+B) will never need to memorize it as a separate fact.
- **The three forms of cos 2θ are a practical skill:** Many students memorize only Form 1, then need extra steps in every subsequent identity proof. Form selection is worth a dedicated gallery exercise (A02).
- **Power-reducing identities connect to calculus:** sin²θ = (1−cos2θ)/2 and cos²θ = (1+cos2θ)/2 are the standard tools for integrating sin²x and cos²x — flag this connection when teaching to STEM students.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; derived algebraically from sum formulas | PASS |
| V-4 | bloom=apply; P07 not required | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.8×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

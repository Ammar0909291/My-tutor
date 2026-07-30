<!-- BLUEPRINT: math.trig.half-angle-formulas -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Half Angle Formulas (`math.trig.half-angle-formulas`)
**Concept ID:** `math.trig.half-angle-formulas`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=3 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.half-angle-formulas |
| name | Half Angle Formulas |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.trig.double-angle-formulas |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.double-angle-formulas**: cos 2θ = 1 − 2 sin²θ = 2 cos²θ − 1; power-reducing identities sin²θ = (1 − cos 2θ)/2 and cos²θ = (1 + cos 2θ)/2 — the direct algebraic source of the half-angle formulas

### Target Knowledge State
Student derives sin(θ/2) = ±√((1 − cos θ)/2) and cos(θ/2) = ±√((1 + cos θ)/2) from the power-reducing identities by substituting 2α = θ. Student determines the ± sign from the quadrant of θ/2 (not θ). Student applies the formulas to compute exact values at non-standard angles such as 15°, 22.5°, and 75°, and to simplify expressions involving half angles.

### Conceptual Obstacles
1. Treating sin(θ/2) as ½ sin θ — scaling the function instead of halving the argument
2. Determining the ± sign from the quadrant of θ instead of the quadrant of θ/2
3. Confusing the sin half-angle formula (1 − cos) with the cos half-angle formula (1 + cos)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | HALF-ANGLE-SCALING | Student writes sin(θ/2) = ½ sin θ by treating the half-angle as a simple scalar | Any sin(θ/2) evaluation |
| MC-2 | SIGN-FROM-THETA-NOT-HALF | Student determines the ± from the quadrant of θ rather than the quadrant of θ/2 | Problems where θ and θ/2 are in different quadrant families |
| MC-3 | FORMULA-SWAP | Student uses (1 + cos θ) under the radical for sin and (1 − cos θ) for cos, reversing the two formulas | Direct evaluation of sin or cos half-angle values |

**Foundational Misconception:** MC-1 (HALF-ANGLE-SCALING) — produces completely wrong results for every half-angle calculation. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — algebraic derivation from the power-reducing identities.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Derive both half-angle formulas from power-reducing identities via substitution 2α = θ; state tan half-angle formula; sign-determination rule; summary table
2. **A02 P04 PATTERN INDUCTION** — Gallery of exact-value computations at 15°, π/8, and 75°; three-step procedure; tan half-angle applied
3. **A03 P06 CONTRAST PAIR** — sin(θ/2) formula (1 − cos θ) vs cos(θ/2) formula (1 + cos θ); contrast reveals which formula increases/decreases from zero
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving the Half-Angle Formulas

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build the formulas from first principles using the double-angle blueprint's power-reducing identities; surface MC-1; state the ± sign rule

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Start from the power-reducing identities (inherited from double-angle-formulas):**

sin²θ = (1 − cos 2θ) / 2 and cos²θ = (1 + cos 2θ) / 2

**Stage B — Substitute 2α = θ (i.e., replace θ with α and 2θ with θ):**

Let α = θ/2, so 2α = θ:

sin²(θ/2) = (1 − cos θ) / 2 → sin(θ/2) = ±√((1 − cos θ)/2)

cos²(θ/2) = (1 + cos θ) / 2 → cos(θ/2) = ±√((1 + cos θ)/2)

**Stage C — Sign rule:**

The ± is determined by the quadrant of **θ/2** (not θ):
- If θ/2 is in Q1: both sin(θ/2) and cos(θ/2) are positive
- If θ/2 is in Q2: sin(θ/2) > 0, cos(θ/2) < 0
- If θ/2 is in Q3: both negative
- If θ/2 is in Q4: sin(θ/2) < 0, cos(θ/2) > 0

**Stage D — Tan half-angle (two equivalent forms):**

tan(θ/2) = sin(θ/2)/cos(θ/2) = ±√((1 − cos θ)/(1 + cos θ))

Rationalized forms (no ± needed — sign is automatic from sin and cos):
- tan(θ/2) = sin θ / (1 + cos θ)
- tan(θ/2) = (1 − cos θ) / sin θ

**Summary table:**

| Formula | Expression |
|---------|-----------|
| sin(θ/2) | ±√((1 − cos θ)/2) |
| cos(θ/2) | ±√((1 + cos θ)/2) |
| tan(θ/2) | (1 − cos θ)/sin θ = sin θ/(1 + cos θ) |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* sin(θ/2) = ±√((1 − cos θ)/2). A student says sin(45°/2) = sin(22.5°) = ½ sin(45°) = √2/4. What error has the student made?

(A) The student used the wrong quadrant sign
(B) The student confused sin and cos formulas
(C) The student treated sin(θ/2) as a scalar multiple of sin θ
(D) The student used the double-angle formula instead

*Branch CORRECT (C):* sin(θ/2) ≠ ½ sin θ. The half-angle formula is sin(θ/2) = ±√((1 − cos θ)/2). For θ = 45°: sin(22.5°) = √((1 − cos 45°)/2) = √((1 − √2/2)/2) = √((2 − √2)/4). ✓ Proceed to A02.

*Branch INCORRECT (A):* The sign determination is not the error here — the student didn't use the formula at all. The fundamental error is writing sin(θ/2) = ½ sin θ. Proceed to A02.

*Branch INCORRECT (B or D):* The error is simpler: the student multiplied sin θ by ½ rather than applying the radical formula. Proceed to A02.

*Branch NO_RESPONSE:* sin(θ/2) ≠ ½ sin θ — this is the scaling error (MC-1). The correct formula is the radical expression: sin(22.5°) = √((1 − cos 45°)/2) = √((2 − √2)/4). Proceed to A02.

---

### Teaching Action A02 — Gallery of Exact-Value Computations

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Apply the three-step procedure to non-standard angles; practice sign determination from quadrant of θ/2

---

**[P04 — PATTERN INDUCTION]**

**Three-step procedure:**
1. Write θ as twice the target angle: identify θ so that θ/2 = target
2. Look up cos θ from the special-angle table
3. Apply formula; determine sign from the quadrant of θ/2

**Gallery:**

| Target angle | θ (= 2 × target) | cos θ | Formula | Sign (quadrant of θ/2) | Exact value |
|-------------|-------------------|-------|---------|------------------------|-------------|
| sin(15°) | θ = 30° | √3/2 | √((1 − √3/2)/2) = √((2 − √3)/4) | Q1 (15° in Q1): + | (√(2 − √3))/2 |
| cos(π/8) | θ = π/4 | √2/2 | √((1 + √2/2)/2) = √((2 + √2)/4) | Q1 (π/8 in Q1): + | (√(2 + √2))/2 |
| tan(15°) | θ = 30° | √3/2 | (1 − √3/2)/(sin 30°) = (1 − √3/2)/(1/2) | — (no ± needed) | 2 − √3 |

**Worked example in full — cos(π/8):**

Step 1: Target = π/8; θ = π/4.

Step 2: cos(π/4) = √2/2.

Step 3: cos(π/8) = +√((1 + cos(π/4))/2) = √((1 + √2/2)/2) = √((2 + √2)/4) = (√(2 + √2))/2.

Sign check: π/8 ≈ 22.5° is in Q1, so cos(π/8) > 0. ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Find cos(π/8) using the half-angle formula. Which is the correct first step?

(A) Set θ = π/4 and use cos(π/8) = √((1 + cos(π/4))/2)
(B) Set θ = π/4 and use cos(π/8) = √((1 − cos(π/4))/2)
(C) Set θ = π/16 and use cos(π/8) = √((1 + cos(π/16))/2)
(D) Use cos(π/8) = ½ cos(π/4)

*Branch CORRECT (A):* cos(θ/2) = √((1 + cos θ)/2) with θ = π/4. The (1 + cos θ) form is correct for cosine. ✓ Proceed to A03.

*Branch INCORRECT (B):* (1 − cos θ) is the sin half-angle formula, not cos. For cos(θ/2), use (1 + cos θ) under the radical. Proceed to A03.

*Branch INCORRECT (C):* θ/2 = π/8 means θ = π/4, not π/16. Proceed to A03.

*Branch NO_RESPONSE:* cos(π/8) = cos(π/4 / 2) → θ = π/4; cos formula uses **(1 + cos θ)**: cos(π/8) = √((1 + cos(π/4))/2) = (√(2 + √2))/2. Proceed to A03.

---

### Teaching Action A03 — sin vs cos Half-Angle: Which Formula Uses Which Term

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish (1 − cos θ) from (1 + cos θ) by their behaviour near θ = 0; resolve MC-3

---

**[P06 — CONTRAST PAIR]**

| | sin(θ/2) = ±√((1 − cos θ)/2) | cos(θ/2) = ±√((1 + cos θ)/2) |
|--|-------------------------------|-------------------------------|
| At θ = 0 | √((1 − 1)/2) = **0** | √((1 + 1)/2) = **1** |
| At θ = π | √((1 − (−1))/2) = **1** | √((1 + (−1))/2) = **0** |
| Behaviour | Starts at 0, increases to 1 | Starts at 1, decreases to 0 |

**Reasoning:** When θ = 0, the half-angle θ/2 = 0 as well. sin(0) = 0, cos(0) = 1. So the sin formula must equal 0 at θ = 0 → it needs (1 − cos 0) = 0 in the numerator. The cos formula must equal 1 → it needs (1 + cos 0) = 2 under the radical, giving √(2/2) = 1. This boundary check always identifies the correct formula.

**Memory device:** "sin formula has a minus; sin starts small at small angles" — when θ is small and positive, cos θ ≈ 1, so (1 − cos θ) ≈ 0, giving a small sin(θ/2). For cos, (1 + cos θ) ≈ 2, giving cos(θ/2) ≈ 1. Both match known geometry.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Without computing, which formula produces a larger value at θ = 60°: sin(30°) or cos(30°)?

(A) sin(30°) = √((1 − cos 60°)/2) = √(1/4) = 1/2
(B) cos(30°) = √((1 + cos 60°)/2) = √(3/4) = √3/2
(C) Both are equal
(D) It is impossible to compare without a calculator

*Branch CORRECT — both (A) and (B) must be stated:* (A): sin(30°) = √((1 − 1/2)/2) = √(1/4) = 1/2. (B): cos(30°) = √((1 + 1/2)/2) = √(3/4) = √3/2. cos(30°) = √3/2 > 1/2 = sin(30°). ✓ Proceed to A04.

*Branch INCORRECT (C):* sin(30°) = 1/2 ≠ √3/2 = cos(30°). They are not equal. The (1 + cos θ) term is always larger than (1 − cos θ) for θ ∈ (0°, 180°), so cos(θ/2) > sin(θ/2) in Q1. Proceed to A04.

*Branch INCORRECT (D):* These are special angles with exact values computable without a calculator. Try θ = 60°: cos 60° = 1/2; sin(30°) = √((1 − 1/2)/2) = 1/2; cos(30°) = √3/2. Proceed to A04.

*Branch NO_RESPONSE:* cos 60° = 1/2. sin(30°) = √((1 − 1/2)/2) = **1/2**. cos(30°) = √((1 + 1/2)/2) = **√3/2**. cos(30°) is larger, consistent with cos > sin in the first quadrant for angles less than 45°. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Find the exact value of sin(π/8).

**Problem 2.** Find the exact value of cos(15°).

**Problem 3.** Given cos θ = −3/5 with θ in Q3, find sin(θ/2).

**Problem 4.** Find tan(π/12) using the rationalized tan half-angle formula tan(θ/2) = (1 − cos θ)/sin θ.

---

**[P55 — SCORE]**

*Answers:*

1. sin(π/8) = sin((π/4)/2); θ = π/4; cos(π/4) = √2/2; π/8 in Q1 → positive.
   sin(π/8) = √((1 − √2/2)/2) = √((2 − √2)/4) = **(√(2 − √2))/2**. ✓

2. cos(15°) = cos(30°/2); θ = 30°; cos 30° = √3/2; 15° in Q1 → positive.
   cos(15°) = √((1 + √3/2)/2) = √((2 + √3)/4) = **(√(2 + √3))/2**. ✓

3. θ in Q3 means 180° < θ < 270°, so 90° < θ/2 < 135° → θ/2 is in Q2 → sin(θ/2) > 0.
   cos θ = −3/5; sin(θ/2) = +√((1 − (−3/5))/2) = √((1 + 3/5)/2) = √(8/10) = √(4/5) = **2/√5 = 2√5/5**. ✓

4. tan(π/12) = tan(30°/2); θ = 30°; cos 30° = √3/2; sin 30° = 1/2.
   tan(π/12) = (1 − √3/2)/(1/2) = 2(1 − √3/2) = **2 − √3** ≈ 0.268. ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Prove the identity sin²(θ/2) = (1 − cos θ)/2, then use it to find sin(22.5°) exactly and verify that 2 sin²(22.5°) = 1 − cos(45°).

*(a)* Derive the identity sin²(θ/2) = (1 − cos θ)/2 from the double-angle formula for cosine.

*(b)* Use the identity to compute sin(22.5°) exactly.

*(c)* Verify numerically that 2 sin²(22.5°) = 1 − cos(45°).

*Expected answer:*

*(a)* cos 2α = 1 − 2 sin²α → 2 sin²α = 1 − cos 2α → sin²α = (1 − cos 2α)/2. Let α = θ/2: sin²(θ/2) = (1 − cos θ)/2. ✓

*(b)* θ = 45°; cos 45° = √2/2; sin²(22.5°) = (1 − √2/2)/2 = (2 − √2)/4.
sin(22.5°) = +√((2 − √2)/4) = (√(2 − √2))/2 (positive since 22.5° ∈ Q1). ✓

*(c)* 2 sin²(22.5°) = 2 · (2 − √2)/4 = (2 − √2)/2 = 1 − √2/2 = 1 − cos 45°. ✓

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three parts correct with valid derivation in (a)); 0.5 if (a) and (b) correct but (c) skipped or incomplete.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.75 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| ≥ 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed item; scaling error → B01; sign error → B02; formula swap → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-derive both formulas from power-reducing identities; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.half-angle-formulas` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** Integration by parts with trig functions; Fourier coefficient computation; advanced trig identity proofs.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — HALF-ANGLE-SCALING Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"sin(θ/2) is NOT ½ sin θ. Halving the angle is not the same as halving the output. sin is a nonlinear function — you cannot pull the ½ outside as a scalar multiplier."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Is sin(90°/2) = ½ sin(90°)?
*Correct response:* sin(45°) = √2/2 ≈ 0.707. ½ sin(90°) = ½ · 1 = 0.5. They are not equal. The scaling rule fails.

**[P64 — CONCEPTUAL SHIFT]**
"Think of f(x) = x² — you would never say f(x/2) = ½ f(x), because (x/2)² = x²/4 ≠ x²/2. Similarly, sin(θ/2) ≠ ½ sin θ because the sine function is curved. The half-angle formula reveals the actual relationship: sin(θ/2) = ±√((1 − cos θ)/2) — a radical expression involving cos θ, completely different from ½ sin θ."

---

### Repair Action B02 — SIGN-FROM-THETA-NOT-HALF Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The sign of sin(θ/2) depends on the quadrant of θ/2, not the quadrant of θ. These can differ: if θ = 270° (in Q3), then θ/2 = 135° (in Q2 — positive sin)."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* θ = 270° (Q3). What quadrant is θ/2 in?
*Correct response:* θ/2 = 135°, which is in Q2. sin(135°) > 0. If the student says Q3, they divided the quadrant, not the angle.

**[P64 — CONCEPTUAL SHIFT]**
"Divide the ANGLE, then determine which quadrant that halved angle falls into. The quadrant of θ has no direct bearing on the quadrant of θ/2. Always: (1) compute θ/2 numerically or as a fraction, (2) check which quadrant that result lives in, (3) apply the ASTC sign for that quadrant."

---

### Repair Action B03 — FORMULA-SWAP Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You have the sin and cos formulas reversed. sin(θ/2) uses (1 − cos θ) under the radical; cos(θ/2) uses (1 + cos θ). The minus goes with sin; the plus goes with cos."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* At θ = 0, evaluate both √((1 − cos 0)/2) and √((1 + cos 0)/2). Which equals sin(0°/2) = sin(0°) = 0?
*Correct response:* √((1 − 1)/2) = 0. So (1 − cos θ) is the sin formula.

**[P64 — CONCEPTUAL SHIFT]**
"Boundary check: at θ = 0, sin(0) = 0 and cos(0) = 1. Which formula gives 0? (1 − cos 0)/2 = 0 — so this is the sin formula. (1 + cos 0)/2 = 1 — this is the cos formula. Test the boundary whenever you are uncertain which formula to use."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Find the exact value of sin(75°/2) = sin(37.5°) in simplified radical form. |
| R2 | 3 days | Given sin θ = 4/5 with θ in Q1, find cos(θ/2) exactly. |
| R3 | 7 days | Use the tan half-angle formula to prove tan(π/8) = √2 − 1. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Advanced integration techniques; Fourier coefficient derivations |
| Requires (Tier-1) | math.trig.double-angle-formulas |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent identity-proof and verification problem.

---

## Component 8 — Teaching Notes

- **The derivation is two lines of algebra:** Students who see how to obtain the half-angle formulas from power-reducing identities (via the substitution 2α → θ) gain a derivation they can reconstruct under exam pressure. Students who only memorise the formulas cannot recover if they misremember (1 − cos) vs (1 + cos).
- **The sign determination step is the main procedural difficulty:** Most errors at the intermediate stage are sign errors (MC-2). Insist on a two-step process: (a) compute the numerical value of θ/2 explicitly, (b) determine its quadrant and apply ASTC. Skipping step (a) is the main cause of MC-2.
- **The rationalized tan formula avoids the sign issue:** tan(θ/2) = (1 − cos θ)/sin θ is always defined when sin θ ≠ 0 and carries the correct sign automatically via the signs of the numerator and denominator. Recommend this form for tan half-angle problems to reduce error surface.
- **P76 connects back to double-angle-formulas:** The proof in P76(a) is exactly the reverse direction of the double-angle derivation — students should recognize they already know cos 2α = 1 − 2 sin²α and are now reading it backwards. This cross-blueprint continuity is worth naming explicitly.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; algebraic derivation used in A01 | PASS |
| V-4 | bloom=apply; formula application and identity proof | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.75×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

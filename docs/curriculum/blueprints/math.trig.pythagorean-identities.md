<!-- BLUEPRINT: math.trig.pythagorean-identities -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Pythagorean Identities
**Concept ID:** `math.trig.pythagorean-identities`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.pythagorean-identities |
| name | Pythagorean Identities |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.trig.trig-identities, math.trig.unit-circle |
| cross_links | none |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.unit-circle**: sin θ = y, cos θ = x on the unit circle; unit circle equation x² + y² = 1
- **math.trig.trig-identities**: General concept of a trigonometric identity as an equation true for all valid θ

### Target Knowledge State
Student derives sin²θ + cos²θ = 1 directly from the unit circle equation, then derives 1 + tan²θ = sec²θ (dividing by cos²θ) and 1 + cot²θ = csc²θ (dividing by sin²θ). Student selects the appropriate identity form for a given problem: the fundamental form when sin and cos appear, the tan/sec form when tangent or secant appears, and the cot/csc form when cotangent or cosecant appears. Student uses these identities to find unknown trig values given one ratio and a quadrant, and to simplify expressions.

### Conceptual Obstacles
1. Believing the identity applies only to acute angles in a right triangle, rather than to all real θ
2. Choosing the wrong identity form — using sin²+cos²=1 when 1+tan²=sec² would reduce steps directly
3. Losing the ± sign when solving for sin θ = ±√(1−cos²θ) — the quadrant determines the sign

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | PYTHAGOREAN-AS-GEOMETRIC | Student believes sin²θ+cos²θ=1 requires θ to be in a right triangle; unaware it holds for all real θ via the unit circle | When θ > 90° or θ is negative |
| MC-2 | ALWAYS-USE-FUNDAMENTAL | Student always uses sin²θ+cos²θ=1 even when 1+tan²θ=sec²θ would immediately give the answer with fewer steps | Problems involving secant or tangent |
| MC-3 | SIGN-LOSS-IN-SOLVING | Student writes sinθ=√(1−cos²θ) without the ± symbol; chooses the positive square root regardless of quadrant | "Given cosθ, find sinθ" problems specifying a quadrant |

**Foundational Misconception:** MC-3 (SIGN-LOSS-IN-SOLVING) — produces wrong answers when θ is in Q3 or Q4 where sinθ < 0. Addressed in A02 and B03.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — derive from the unit circle equation.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Unit circle equation x²+y²=1 → substitute x=cosθ, y=sinθ → derive all three identities algebraically
2. **A02 P04 PATTERN INDUCTION** — Gallery of "given one ratio, find others" problems; gallery of expression simplifications; introduce quadrant sign selection
3. **A03 P06 CONTRAST PAIR** — Same expression, two routes: fundamental identity vs. tan/sec identity; show when each is more efficient
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving All Three Pythagorean Identities

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground all three identities in the unit circle; show the algebraic derivation; prevent MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Unit circle:**

Every point on the unit circle satisfies x² + y² = 1.

By definition, for any angle θ measured from the positive x-axis: x = cos θ and y = sin θ.

**Stage B — First identity:**

Substitute into x² + y² = 1:

**(cos θ)² + (sin θ)² = 1**, i.e., **sin²θ + cos²θ = 1**

This holds for ALL real θ — not just acute angles. The unit circle contains all angles, positive or negative, large or small.

**Stage C — Second identity (divide by cos²θ, cosθ ≠ 0):**

sin²θ/cos²θ + cos²θ/cos²θ = 1/cos²θ

tan²θ + 1 = sec²θ → **1 + tan²θ = sec²θ**

**Stage D — Third identity (divide by sin²θ, sinθ ≠ 0):**

sin²θ/sin²θ + cos²θ/sin²θ = 1/sin²θ

1 + cot²θ = csc²θ → **1 + cot²θ = csc²θ**

**Identity selection guide:**

| Use this form | When the problem involves |
|--------------|--------------------------|
| sin²θ + cos²θ = 1 | sin θ and/or cos θ |
| 1 + tan²θ = sec²θ | tan θ and/or sec θ |
| 1 + cot²θ = csc²θ | cot θ and/or csc θ |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Which Pythagorean identity is most directly useful if you know tan θ and need to find sec θ?

(A) sin²θ + cos²θ = 1
(B) 1 + tan²θ = sec²θ
(C) 1 + cot²θ = csc²θ
(D) All three give the same number of steps

*Branch CORRECT (B):* 1 + tan²θ = sec²θ directly gives sec²θ = 1 + tan²θ in one step. ✓ Proceed to A02.

*Branch INCORRECT (A):* You could use sin²+cos²=1, but you'd need to find sin θ and cos θ separately from tan θ — two extra steps. The tan/sec form is direct. Proceed to A02.

*Branch INCORRECT (C):* 1+cot²θ=csc²θ involves cot and csc, not tan and sec. Proceed to A02.

*Branch NO_RESPONSE:* The identity **1 + tan²θ = sec²θ** directly gives sec²θ when tan θ is known — the most efficient choice. Proceed to A02.

---

### Teaching Action A02 — Applying the Identities

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate identity selection; practice sign determination from quadrant; surface MC-3

---

**[P04 — PATTERN INDUCTION]**

**Pattern 1 — Finding a missing ratio (quadrant required for sign):**

*Given:* cos θ = 3/5, θ in Q4.

Use sin²θ + cos²θ = 1: sin²θ = 1 − 9/25 = 16/25. So sin θ = ±4/5.

Q4: sin θ < 0, so **sin θ = −4/5**. Then tan θ = sin θ/cos θ = (−4/5)/(3/5) = **−4/3**.

**Sign rule:** After extracting the square root, the sign is determined by the quadrant — NEVER assume positive.

**Pattern 2 — Simplifying expressions:**

| Expression | Step | Result |
|-----------|------|--------|
| sin²θ · sec²θ + cos²θ · sec²θ | sec²θ(sin²θ + cos²θ) = sec²θ · 1 | sec²θ |
| (1 − sin²θ)/(1 − cos²θ) | cos²θ/sin²θ | cot²θ |
| tan²θ − sec²θ | = (sec²θ − 1) − sec²θ | −1 |

**Gallery — "given one, find another":**

| Given | Quadrant | Solve for | Answer |
|-------|---------|-----------|--------|
| sin θ = 3/5 | Q2 | cos θ | −4/5 |
| cos θ = −5/13 | Q3 | sin θ | −12/13 |
| tan θ = 2 | Q1 | sec²θ | 5 |
| cot θ = 3 | Q1 | csc²θ | 10 |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Given sin θ = −3/5 and θ is in Q3, find cos θ.

(A) 4/5
(B) −4/5
(C) 3/4
(D) ±4/5

*Branch CORRECT (B):* cos²θ = 1 − 9/25 = 16/25. In Q3, cos θ < 0, so cos θ = −4/5. ✓ Proceed to A03.

*Branch INCORRECT (A):* cos²θ = 16/25 → cos θ = ±4/5. Q3 has cos θ < 0, so the negative root applies: cos θ = −4/5. Proceed to A03.

*Branch INCORRECT (D):* The ± is resolved by the quadrant information. Q3 requires cos θ < 0, giving −4/5. Proceed to A03.

*Branch NO_RESPONSE:* sin²θ + cos²θ = 1 → cos²θ = 16/25. Q3: cos θ < 0. cos θ = **−4/5**. Proceed to A03.

---

### Teaching Action A03 — Choosing the Right Identity Form

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Show when each form saves steps; prevent MC-2

---

**[P06 — CONTRAST PAIR]**

**Problem:** Simplify (sec²θ − 1)/tan²θ.

**Route A — Use fundamental identity (indirect):**
sec²θ − 1 = (1/cos²θ) − 1 = (1 − cos²θ)/cos²θ = sin²θ/cos²θ = tan²θ.
So (sec²θ − 1)/tan²θ = tan²θ/tan²θ = **1**.

**Route B — Use 1+tan²θ=sec²θ (direct):**
sec²θ − 1 = tan²θ (by the identity rearranged). So (tan²θ)/tan²θ = **1** — two lines.

Route B is shorter because the problem involves sec and tan — matching the tan/sec identity form directly.

**Decision rule:** Let the functions in the problem guide the identity form. sec or tan present → use the tan/sec form. csc or cot present → use the cot/csc form. Only sin and cos → use the fundamental form.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Simplify: csc²θ − cot²θ.

(A) 1
(B) 0
(C) sec²θ
(D) sin²θ

*Branch CORRECT (A):* Using 1 + cot²θ = csc²θ → csc²θ − cot²θ = 1. ✓ Proceed to A04.

*Branch INCORRECT (B):* csc²θ − cot²θ ≠ 0 in general; substituting the identity: csc²θ = 1 + cot²θ, so csc²θ − cot²θ = 1. Proceed to A04.

*Branch INCORRECT (C, D):* The cot/csc identity directly gives csc²θ − cot²θ = 1 — a constant, not another trig function. Proceed to A04.

*Branch NO_RESPONSE:* By the identity 1 + cot²θ = csc²θ, rearranging: csc²θ − cot²θ = **1**. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Given sin θ = 3/5 and θ is in Q2, find cos θ and tan θ.

**Problem 2.** Simplify: sin²θ · sec²θ + cos²θ · sec²θ.

**Problem 3.** Simplify: (1 − sin²θ)/(1 − cos²θ), assuming neither denominator is zero.

**Problem 4.** If tan θ = 2 (θ acute), find sec²θ, then find cos²θ.

---

**[P55 — SCORE]**

*Answers:*

1. sin²θ + cos²θ = 1 → cos²θ = 1 − 9/25 = 16/25. Q2: cosθ < 0 → **cos θ = −4/5**. tan θ = sinθ/cosθ = (3/5)/(−4/5) = **−3/4** ✓

2. sec²θ · (sin²θ + cos²θ) = sec²θ · 1 = **sec²θ** ✓

3. (1−sin²θ)/(1−cos²θ) = cos²θ/sin²θ = **cot²θ** ✓

4. sec²θ = 1 + tan²θ = 1 + 4 = **5**. cos²θ = 1/sec²θ = **1/5** ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Prove the identity: sin⁴θ − cos⁴θ = sin²θ − cos²θ.

*(Hint: Factor the left side as a difference of squares.)*

*Expected answer:*

sin⁴θ − cos⁴θ = (sin²θ − cos²θ)(sin²θ + cos²θ) = (sin²θ − cos²θ) · **1** = sin²θ − cos²θ ✓

The key step is recognizing sin⁴θ − cos⁴θ = (sin²θ)² − (cos²θ)² and applying a² − b² = (a−b)(a+b), then using sin²θ + cos²θ = 1.

---

**[P55 — SCORE]**

Transfer probe: 1 point for correct factoring and application of the identity.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.9 × 5⌉ = 5). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Identify missed item; geometric misconception → B01; wrong form → B02; sign loss → B03; targeted repair |
| ≤ 3/5 | → Return to A01; re-derive all three identities from unit circle; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.pythagorean-identities` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** All downstream identity-based proofs and simplifications; prerequisite for double-angle, half-angle derivations.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — PYTHAGOREAN-AS-GEOMETRIC Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The identity sin²θ + cos²θ = 1 is not restricted to acute angles in a right triangle. It is true for ALL real θ because it comes from the unit circle, which contains every angle."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Is sin²(150°) + cos²(150°) = 1?
*Correct response:* sin(150°) = 1/2, cos(150°) = −√3/2. (1/2)² + (√3/2)² = 1/4 + 3/4 = 1. ✓

**[P64 — CONCEPTUAL SHIFT]**
"The unit circle has equation x² + y² = 1, and every point on it corresponds to an angle θ via (x,y) = (cos θ, sin θ). Since ALL angles are on the unit circle, the substitution gives cos²θ + sin²θ = 1 for every θ. The right-triangle picture of SOH-CAH-TOA is one way to see trig functions, but the unit circle is the universal definition."

---

### Repair Action B02 — ALWAYS-USE-FUNDAMENTAL Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You are always using sin²θ + cos²θ = 1 even when the problem only involves tangent or secant. There are three identities — select the one that matches the functions already in the problem."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* If tan θ = 3, find sec²θ in ONE step.
*Correct response:* sec²θ = 1 + tan²θ = 1 + 9 = 10. (If you first found sin θ and cos θ, you used more steps than needed.)

**[P64 — CONCEPTUAL SHIFT]**
"Match the identity to the functions: tan and sec appear together in 1 + tan²θ = sec²θ; cot and csc appear together in 1 + cot²θ = csc²θ. Start by scanning the problem for which trig functions are present, then select accordingly — the selection rule is in the identity choice table in A01."

---

### Repair Action B03 — SIGN-LOSS-IN-SOLVING Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"When you solve sin²θ = 1 − cos²θ and take the square root, you must write ±√(…). The sign is determined by the quadrant — it is NOT always positive."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Given cos θ = 4/5, θ in Q4. What is sin θ?
*Correct response:* sin²θ = 1 − 16/25 = 9/25. Q4: sin θ < 0. So sin θ = −3/5 (not +3/5).

**[P64 — CONCEPTUAL SHIFT]**
"The Pythagorean identity gives you sin²θ, which is always ≥ 0 — taking the square root gives |sin θ|, not sin θ. To recover the actual sign, recall the ASTC chart: All positive in Q1, Sin positive in Q2, Tan positive in Q3, Cos positive in Q4. The quadrant information in the problem always resolves the ±."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Given tan θ = −3/4 with θ in Q2, find sin θ and cos θ. |
| R2 | 3 days | Simplify: (sec²θ − 1) · cos²θ. |
| R3 | 7 days | Prove: (sin θ + cos θ)² = 1 + 2 sin θ cos θ. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | double-angle derivations; trig identity proofs |
| Requires (Tier-1) | math.trig.trig-identities, math.trig.unit-circle |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent algebraic factoring problem.

---

## Component 8 — Teaching Notes

- **Derive, don't memorize:** Students who derive all three forms from sin²+cos²=1 in 30 seconds are far more robust than those who try to memorize them as separate facts. Insist on the derivation.
- **Identity selection is a skill:** MC-2 is prevalent because most classroom practice only uses the fundamental form. Include problems that explicitly require the tan/sec and cot/csc forms.
- **The ± trap appears repeatedly:** This same pattern (square root → ± → quadrant resolves) recurs in half-angle formulas. Establishing correct habit here prevents a cluster of future errors.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; derived algebraically from unit circle | PASS |
| V-4 | bloom=apply; P07 not required | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.9×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-3 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

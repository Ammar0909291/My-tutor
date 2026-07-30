<!-- BLUEPRINT: math.trig.reciprocal-identities -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Reciprocal and Quotient Identities
**Concept ID:** `math.trig.reciprocal-identities`
**KG Fields:** difficulty=proficient | bloom=remember | estimated_hours=2 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.reciprocal-identities |
| name | Reciprocal and Quotient Identities |
| difficulty | proficient |
| bloom | remember |
| estimated_hours | 2 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.trig.trig-identities |
| cross_links | none |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.trig-identities**: sin θ, cos θ, tan θ definitions; the concept of a trigonometric identity

### Target Knowledge State
Student states all six reciprocal and quotient identities without prompting: csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ = cos θ/sin θ, tan θ = sin θ/cos θ. Student applies these identities to simplify expressions and prove basic identities involving all six trig functions. Student correctly pairs sec with cos (not sin) and csc with sin (not cos).

### Conceptual Obstacles
1. Swapping secant and cosecant — writing sec θ = 1/sin θ and csc θ = 1/cos θ
2. Treating cot θ as equivalent to tan θ rather than its reciprocal
3. Forgetting that csc, sec, cot are undefined wherever their denominators vanish

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SECANT-COSECANT-SWAP | Student writes sec θ = 1/sin θ and csc θ = 1/cos θ — the "co" in cosecant is misread as cosine | Any problem requiring sec or csc values |
| MC-2 | COT-EQUALS-TAN | Student treats cot θ as another name for tan θ, rather than as 1/tan θ = cos θ/sin θ | Simplifications involving cot θ |
| MC-3 | DOMAIN-BLINDNESS | Student computes csc(0), sec(π/2), or cot(0) without noticing undefined results | Domain-sensitive problems |

**Foundational Misconception:** MC-1 (SECANT-COSECANT-SWAP) — produces systematically wrong values for every sec and csc computation. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — define from the three primary ratios.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Paired table: six functions as three reciprocal pairs + two quotient identities; domain restriction column; memory device
2. **A02 P04 PATTERN INDUCTION** — Gallery of simplifications using reciprocal and quotient identities; prove one identity from scratch
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — All Six Functions and Their Relationships

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Define csc, sec, cot as reciprocals; pair them correctly; prevent MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — The three primary functions (known):**

| Function | Definition |
|----------|-----------|
| sin θ | y on unit circle |
| cos θ | x on unit circle |
| tan θ | sin θ / cos θ |

**Stage B — The three reciprocal functions (new):**

Each primary function has an exact reciprocal partner. The "co" in cosecant pairs with "sine", NOT with cosine:

| Primary | Reciprocal | Memory anchor |
|---------|-----------|---------------|
| **sin** θ | **csc** θ = 1/sin θ | S and C swap (sin↔csc) |
| **cos** θ | **sec** θ = 1/cos θ | C and S swap (cos↔sec) |
| **tan** θ | **cot** θ = 1/tan θ | T and Cot reciprocal |

**Memory device:** "**co**secant is the reciprocal of **s**ine, not cosine" — the "co" prefix creates a common trap. Memorize: **sec = 1/cos** (both start with c → paired), **csc = 1/sin** (the other one).

**Stage C — Quotient identities:**

tan θ = sin θ / cos θ (where cos θ ≠ 0)

cot θ = cos θ / sin θ (where sin θ ≠ 0)

**Stage D — Domain restrictions (where each function is undefined):**

| Function | Undefined when |
|----------|----------------|
| tan θ, sec θ | cos θ = 0 → θ = π/2 + nπ |
| cot θ, csc θ | sin θ = 0 → θ = nπ |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* If sin θ = 5/13 and cos θ = 12/13, what is sec θ?

(A) 13/5
(B) 13/12
(C) 5/12
(D) 12/5

*Branch CORRECT (B):* sec θ = 1/cos θ = 1/(12/13) = 13/12. ✓ Proceed to A02.

*Branch INCORRECT (A):* 13/5 = 1/sin θ = csc θ, not sec θ. Secant is the reciprocal of cosine: sec θ = 1/cos θ = 13/12. Proceed to A02.

*Branch INCORRECT (C, D):* Those are quotient ratios. sec θ = 1/cos θ = 13/12. Proceed to A02.

*Branch NO_RESPONSE:* sec θ = 1/cos θ = 1/(12/13) = **13/12**. Proceed to A02.

---

### Teaching Action A02 — Simplifying with Reciprocal and Quotient Identities

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate identity application; build fluency with csc, sec, cot; surface MC-3

---

**[P04 — PATTERN INDUCTION]**

**Strategy:** Convert all unfamiliar functions to sin and cos using the reciprocal/quotient identities, then simplify.

**Gallery:**

| Expression | Substitution | Simplified |
|-----------|-------------|-----------|
| cot θ · sin θ | (cos θ/sin θ) · sin θ | cos θ |
| (sec θ − cos θ)/sin θ | (1/cosθ − cosθ)/sinθ = (1−cos²θ)/(cosθ·sinθ) = sin²θ/(cosθ·sinθ) | sin θ/cos θ = tan θ |
| csc²θ · sin²θ | (1/sin²θ) · sin²θ | 1 |
| tan θ · cot θ | (sinθ/cosθ) · (cosθ/sinθ) | 1 |

**Proving an identity — example:**

Prove: tan θ + cot θ = sec θ · csc θ

LHS = sin θ/cos θ + cos θ/sin θ = (sin²θ + cos²θ)/(sin θ cos θ) = 1/(sin θ cos θ)

RHS = (1/cos θ)(1/sin θ) = 1/(sin θ cos θ) ✓

LHS = RHS. Key steps: convert to sin/cos, apply Pythagorean identity (sin²+cos²=1), convert back.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Simplify: (sec θ − cos θ)/sin θ.

(A) tan θ
(B) cot θ
(C) 1
(D) sin θ/cos²θ

*Branch CORRECT (A):* sec θ − cos θ = 1/cos θ − cos θ = (1 − cos²θ)/cos θ = sin²θ/cos θ. Divide by sin θ: sin θ/cos θ = tan θ. ✓ Proceed to A03.

*Branch INCORRECT (B):* cot θ = cos θ/sin θ; the result here has sin in the numerator, not cosine. Work through: sec θ = 1/cos θ, so (1/cos θ − cos θ)/sin θ = sin²θ/(cos θ sin θ) = sin θ/cos θ = tan θ. Proceed to A03.

*Branch INCORRECT (C, D):* Expand sec θ = 1/cos θ: (1/cosθ − cosθ)/sinθ = (1−cos²θ)/(cosθ sinθ) = sin²θ/(cosθ sinθ) = sinθ/cosθ = tan θ. Proceed to A03.

*Branch NO_RESPONSE:* sec θ − cos θ = (1−cos²θ)/cos θ = sin²θ/cos θ. Divide by sin θ: **tan θ**. Proceed to A03.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Given sin θ = 5/13 and cos θ = 12/13, find csc θ, sec θ, and cot θ.

**Problem 2.** Simplify: cot θ · sin θ.

**Problem 3.** Simplify: (sec θ − cos θ)/sin θ.

**Problem 4.** For what values of θ in [0, 2π) is sec θ undefined?

---

**[P55 — SCORE]**

*Answers:*

1. csc θ = 13/5, sec θ = 13/12, cot θ = cos θ/sin θ = 12/5 ✓

2. cot θ · sin θ = (cos θ/sin θ) · sin θ = **cos θ** ✓

3. **tan θ** (see A02 gallery) ✓

4. sec θ = 1/cos θ is undefined when cos θ = 0: **θ = π/2 and θ = 3π/2** ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Prove the identity: tan θ + cot θ = sec θ · csc θ.

*Expected answer:*

LHS = sin θ/cos θ + cos θ/sin θ = (sin²θ + cos²θ)/(sin θ cos θ) = 1/(sin θ cos θ)

RHS = (1/cos θ)(1/sin θ) = 1/(sin θ cos θ)

LHS = RHS ✓

---

**[P55 — SCORE]**

Transfer probe: 1 point for a complete proof with all steps shown.

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
| 4/5 | → Identify missed item; sec/csc swap → B01; cot confusion → B02; domain error → B03; targeted repair |
| ≤ 3/5 | → Return to A01; rebuild the paired table; re-memorise the sec/cos and csc/sin pairings; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.reciprocal-identities` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** All six-function identity proofs; cotangent in integration contexts.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SECANT-COSECANT-SWAP Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You have secant and cosecant swapped. The rule: **sec θ = 1/cos θ** and **csc θ = 1/sin θ**. The 'co' in cosecant pairs with sine, not with cosine."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* If cos θ = 3/5, what is sec θ?
*Correct response:* sec θ = 1/cos θ = 5/3. If you wrote 5/4 or computed 1/sin θ, you used the wrong pairing.

**[P64 — CONCEPTUAL SHIFT]**
"Anchor with the same letter: **sec**ant contains 'c' at the start; **cos**ine also starts with 'c'. They go together: sec = 1/cos. Then **csc**ant and **sin**e are the other pair: csc = 1/sin. Both 'co' names (cosecant, cotangent) are the reciprocals of the corresponding non-co functions (sine, tangent)."

---

### Repair Action B02 — COT-EQUALS-TAN Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Cotangent is not another name for tangent — it is the reciprocal: cot θ = 1/tan θ = cos θ/sin θ. Tangent and cotangent are always reciprocals."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* If tan θ = 3/4, what is cot θ?
*Correct response:* cot θ = 1/tan θ = 4/3 (flip the fraction). If you wrote 3/4, you confused cot with tan.

**[P64 — CONCEPTUAL SHIFT]**
"The pattern: tan θ = sin/cos, cot θ = cos/sin — they are flipped versions of each other. Their product is always 1: tan θ · cot θ = (sin/cos)(cos/sin) = 1, confirming they are reciprocals."

---

### Repair Action B03 — DOMAIN-BLINDNESS Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Csc, sec, and cot are undefined at certain angles. Before computing them, check whether the denominator is zero at the given θ."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Is sec(π/2) defined?
*Correct response:* cos(π/2) = 0, so sec(π/2) = 1/0 — undefined. Not a number.

**[P64 — CONCEPTUAL SHIFT]**
"Undefined is not the same as zero. When a trig function equals zero in a denominator, the reciprocal doesn't exist — it blows up (→ ±∞ on a graph). The two groups of undefined angles: csc/cot at θ = nπ (where sin = 0); sec/tan at θ = π/2 + nπ (where cos = 0)."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Given tan θ = 5/12 (acute), find all six trig values. |
| R2 | 3 days | Simplify: sin θ · cot θ + cos θ · tan θ. |
| R3 | 7 days | Prove: csc θ − sin θ = cos θ · cot θ. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Identity proofs involving all six functions |
| Requires (Tier-1) | math.trig.trig-identities |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent identity proof.

---

## Component 8 — Teaching Notes

- **The "co" trap is nearly universal:** Most students read "cosecant" and map it to cosine by prefix. The sec/cos pairing by shared 'c' is more memorable than any verbal explanation.
- **Prove, don't just state:** Having students derive cot θ = cos θ/sin θ from tan θ = sin θ/cos θ in one step (flip the fraction) is faster and more durable than memorizing it as a separate fact.
- **hrs=2 is appropriate:** This is a retrieval/application concept — the heavy lifting (unit circle, SOH-CAH-TOA) is upstream. The key teaching work is cementing the pairings and preventing MC-1.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; abstract definition from sin/cos | PASS |
| V-4 | bloom=remember; P07 not required | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A03) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.9×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | hrs=2 → 2 main TAs + gate appropriate for retrieval concept | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

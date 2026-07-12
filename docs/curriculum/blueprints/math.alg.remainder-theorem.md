# Teaching Blueprint — math.alg.remainder-theorem

## Component 0 — Metadata
concept_id: math.alg.remainder-theorem
concept_name: Remainder Theorem
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 3
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.alg.polynomial-division]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** When polynomial p(x) is divided by (x−a), the remainder r is a constant (degree 0 < degree 1 of the divisor). Substituting x=a into p(x)=( x−a)q(x)+r gives p(a)=0·q(a)+r=r. Therefore the remainder equals p(a) — no division required. The Factor Theorem is the immediate corollary: (x−a) divides p(x) exactly (r=0) if and only if p(a)=0.

**Conceptual progression:**
1. Division algorithm foundation: p(x) = (x−a)q(x) + r with r constant.
2. Substitution argument: x=a zeroes the first term; p(a) = r.
3. Direct application: remainder when p(x) ÷ (x−a) = evaluate p(a).
4. Factor Theorem corollary: p(a) = 0 ↔ (x−a) is a factor of p(x).
5. Connection to synthetic division: the last entry of the synthetic array with c=a is exactly p(a).

**CPA arc (entry: P):**
- Pictorial: side-by-side of synthetic division array and direct substitution p(a), showing they produce the same last entry.
- Abstract: p(x) = (x−a)q(x) + r; r = p(a).

**Prior knowledge activated:** polynomial division (math.alg.polynomial-division) — synthetic division, remainder concept, evaluation of p(c); polynomial evaluation by substitution.

---

## Component 2 — Misconception Registry

### MC-1: SUBSTITUTE-WRONG-SIGN [FOUNDATIONAL]
**Description:** When the divisor is (x−a), the learner substitutes x = −a into p(x) instead of x = a. Sees "x−2" and computes p(−2); sees "x+3" and computes p(+3).
**Surface form:** "Dividing by (x−2), so I substitute x=−2: p(−2) = 8−4+2−1 = 5."
**Root cause:** "The number being subtracted is 2, so I use −2." The learner focuses on the subtracted constant rather than solving (x−a)=0 for x. The correct value a solves x=a, not x=−a.
**Trigger condition:** Any application of the Remainder Theorem with a non-zero value of a.
**Repair target:** TA-B01.

### MC-2: THEOREM-IS-ONLY-FOR-ROOTS
**Description:** Learner believes the Remainder Theorem only applies (or only gives a useful answer) when p(a)=0 — conflating it with the Factor Theorem. If the remainder is non-zero, they believe the theorem "doesn't work" or is inapplicable.
**Surface form:** "The remainder theorem tells you if something is a factor. If p(a)≠0, then the theorem doesn't apply."
**Root cause:** The Factor Theorem (which requires p(a)=0) is taught alongside the Remainder Theorem, and learners merge the two. The general statement — remainder = p(a) regardless of whether it is zero — is lost.
**Trigger condition:** Any problem where the remainder is non-zero.
**Repair target:** TA-B02.

### MC-3: DIVISION-STILL-REQUIRED
**Description:** After computing p(a), the learner performs full polynomial division anyway "to verify." They do not accept that p(a) IS the remainder — the theorem feels like an approximation or shortcut that must be validated by the actual computation.
**Surface form:** "I got p(2)=7, but let me check by doing the long division to make sure."
**Root cause:** Distrust of the theorem; the learner views synthetic or long division as the "real" method and substitution as a guess. The proof (substitution argument) was never made rigorous enough to be convincing.
**Trigger condition:** Speed or efficiency problems where the learner should apply the theorem directly.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "What is the remainder when p(x) = x³−2x²+x−3 is divided by (x−2)? Use synthetic division." If the learner produces remainder = −1 via the synthetic array (confirmed from the polynomial-division blueprint WE1), they are ready for A01. This confirms the synthetic division skill and establishes the remainder = last array entry fact.

**Scaffolding ladder:**
- Rung 1 (pictorial): show the synthetic array for p(x)÷(x−2) alongside the direct computation p(2); label both last entries as the remainder; confirm they match.
- Rung 2 (structured): provide four divisors; learner identifies the value a to substitute for each; evaluates p(a).
- Rung 3 (full apply): learner applies the theorem independently to find remainders and test factors.

**Pacing note:** h=3 estimated hours; A01 + A02 in sessions 1–2; mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Testing divisibility of integers.
"Does 7 divide 371? Instead of long division, we test: 371 = 7·53 + 0, confirmed by checking 7×53=371. The 'remainder' of 371÷7 is the error when we approximate 371 by a multiple of 7."

TARGET DOMAIN: Testing divisibility of polynomials by (x−a).
"Does (x−2) divide p(x)=x³−2x²+x−3? We could do long division. But the theorem says: the remainder r = p(2) = 8−8+2−3 = −1. Remainder is −1 ≠ 0, so (x−2) is not a factor."

BRIDGE MAPPING:
| Integer divisibility | Polynomial remainder |
|---|---|
| Divide 371 by 7; remainder 0? | Divide p(x) by (x−a); remainder 0? |
| Check by arithmetic | Check by evaluating p(a) |
| Remainder = 371 − 7·⌊371/7⌋ | Remainder = p(a) |
| Avoids knowing full quotient | Avoids full polynomial division |

PROOF SKETCH (why p(a) = remainder):
Division algorithm: p(x) = (x−a)·q(x) + r, where r is constant.
Substitute x=a: p(a) = (a−a)·q(a) + r = 0 + r = r. ∎
"The substitution zeros out the divisor term. Whatever is left is exactly r — and that is p(a)."

SIGN RULE: To find a, solve (x−a) = 0 → x = a (the value that makes the divisor zero).
- Divisor (x−3): a = 3, compute p(3).
- Divisor (x+5) = (x−(−5)): a = −5, compute p(−5).
- Divisor (x−0) = x: a = 0, compute p(0) = constant term.

**Assessment primitive: P49**

PROBE: "Find the remainder when p(x) = 2x³−x²+4x−7 is divided by (x−1)."
- CORRECT: "a=1; p(1)=2−1+4−7=−2. Remainder = −2." → proceed to A02.
- PARTIAL: correct setup, arithmetic error → "p(1)=2(1)³−1²+4(1)−7=2−1+4−7. Recompute: 2−1=1; 1+4=5; 5−7=−2. Remainder=−2."
- INCORRECT: computes p(−1) → Repair with B01 (SUBSTITUTE-WRONG-SIGN). "For divisor (x−1): solve x−1=0 → x=1, not x=−1. Use x=+1."
- NO_RESPONSE: "Find a by solving (x−1)=0 → a=1. Evaluate p(1): substitute 1 for every x. 2(1)³=2; −(1)²=−1; 4(1)=4; constant=−7. Sum: 2−1+4−7=−2. Remainder=−2."

---

### TA-B01 — Repair for MC-1 (SUBSTITUTE-WRONG-SIGN)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'divide by (x−a), substitute x=−a.' The correct substitution is x=a — the value that makes the divisor zero."

**P41 — MISCONCEPTION DETECTOR**
"For divisor (x−3), which value do you substitute?
(A) x=−3, because the constant in (x−3) is −3.
(B) x=+3, because setting x−3=0 gives x=3."
[If A: learner holds MC-1.]
"Solve x−3=0. What is x?"

**P64 — CONCEPTUAL SHIFT**
"The Remainder Theorem uses the ROOT of the divisor — the value of x that makes (x−a)=0. Solve: x−a=0 → x=a. For (x−3): x=3. For (x+5)=(x−(−5)): x=−5. The sign of a is the opposite of the sign of the constant in (x+constant) form. Reliable rule: 'solve the divisor equals zero; use that solution as a.' Never read off the sign directly from the divisor — derive it by solving."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Finding a non-zero remainder efficiently:
p(x) = x⁴−3x³+x−5, divide by (x−2).
Divisor root: x=2.
p(2) = 16 − 24 + 2 − 5 = −11.
Remainder = −11.
Verify with Remainder Theorem connection: the last entry of the synthetic array with c=2 and coefficients [1,−3,0,1,−5] must also be −11.
Synthetic check: 2|1 −3 0 1 −5 → 1; 2,−1; −2,−2; −4,−3; −6,−11. Last entry: −11 ✓.

WORKED EXAMPLE 2 — Factor test using the theorem:
Is (x+2) a factor of p(x) = x³+6x²+11x+6?
Divisor root: x+2=0 → x=−2.
p(−2) = −8 + 24 − 22 + 6 = 0.
p(−2)=0 → remainder=0 → (x+2) IS a factor. Factor Theorem applies.
Full factorisation: p(x)=(x+2)(x²+4x+3)=(x+2)(x+1)(x+3). Roots: x=−1,−2,−3.

CONTRAST: WE1 shows the theorem gives remainder directly without division. WE2 shows remainder=0 leads to the Factor Theorem and full factorisation. The theorem does both jobs — find any remainder, or test for a factor.

**Assessment primitive: P49**

PROBE: "Is (x−3) a factor of p(x) = x³−7x+6? Use the Remainder Theorem."
- CORRECT: "a=3; p(3)=27−21+6=12. Remainder=12≠0 → (x−3) is NOT a factor." → proceed to A03.
- PARTIAL: correct substitution, arithmetic error (e.g., −7·3=−21 correct but adds wrong) → "p(3)=27+( −7·3)+6=27−21+6. Recompute: 27−21=6; 6+6=12. So remainder=12."
- INCORRECT: concludes (x−3) IS a factor despite p(3)≠0 → Repair with B02 (THEOREM-IS-ONLY-FOR-ROOTS). "(x−3) is a factor only when remainder=0. Here p(3)=12≠0 → not a factor."
- NO_RESPONSE: "Apply the theorem: remainder when p(x)÷(x−3) equals p(3). Compute p(3)=3³−7(3)+6=27−21+6=12. Since 12≠0, (x−3) is not a factor."

---

### TA-B02 — Repair for MC-2 (THEOREM-IS-ONLY-FOR-ROOTS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'the Remainder Theorem only applies when p(a)=0.' The theorem holds for ALL values of a — it gives the remainder whether or not it is zero. Zero remainder is the special case called the Factor Theorem."

**P41 — MISCONCEPTION DETECTOR**
"p(x)=x²+1, divide by (x−1). Compute p(1). Is the theorem applicable here?
(A) p(1)=2≠0, so the theorem doesn't give us useful information.
(B) p(1)=2, so the remainder when p(x)÷(x−1) is 2 — theorem works regardless."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The Remainder Theorem states: remainder = p(a). Period. No condition on whether p(a) is zero or not. The Factor Theorem is the COROLLARY: if the remainder happens to be zero, then (x−a) is a factor. Diagram: [Remainder Theorem: r=p(a) always] → [special case r=0] → [Factor Theorem: (x−a)|p(x)]. The general theorem includes the zero case. It does not require it."

→ Return to A02.

---

### TA-B03 — Repair for MC-3 (DIVISION-STILL-REQUIRED)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'I need to do the polynomial division to find the actual remainder; p(a) is just a check.' The theorem proves that p(a) IS the remainder — not an approximation, not a shortcut that needs verification."

**P41 — MISCONCEPTION DETECTOR**
"p(x)=x³+2x+1 divided by (x−1). You compute p(1)=1+2+1=4. Is 4 the remainder?
(A) Probably, but I should verify with long division.
(B) Yes — the theorem proves remainder=p(a)=4. No division needed."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"The proof: p(x)=(x−a)q(x)+r → substituting x=a gives p(a)=0·q(a)+r=r. This is an algebraic identity — it holds for ALL polynomials, ALL divisors of the form (x−a), with NO exceptions. The substitution p(a) gives the EXACT remainder, not an estimate. Polynomial division would give the same number in the last row — it is equivalent, not more reliable. Use the theorem to save time; trust the algebra."

→ Return to A02.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (SUBSTITUTE-WRONG-SIGN)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (THEOREM-IS-ONLY-FOR-ROOTS)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (DIVISION-STILL-REQUIRED)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Without any division, find all values of k such that (x−2) is a factor of p(x)=x³−kx²+3x−2."
[Expected: p(2)=0 → 8−4k+6−2=0 → 12−4k=0 → k=3. Verify: p(x)=x³−3x²+3x−2; p(2)=8−12+6−2=0 ✓.]

**Day 10 prompt:**
"p(x) is a cubic with p(1)=3, p(−1)=5, p(2)=−1. Find the remainders when p(x) is divided by (x−1), (x+1), and (x−2)."
[Expected: By the Remainder Theorem, remainders are p(1)=3, p(−1)=5, p(2)=−1 respectively. No additional computation needed.]

**Day 30 prompt:**
"Prove or disprove: if p(a)=p(b)=0 with a≠b, then (x−a)(x−b) divides p(x)."
[Expected: TRUE, but requires care. p(a)=0 → (x−a)|p(x) → p(x)=(x−a)q(x). Now p(b)=0 → (b−a)q(b)=0 → since a≠b, b−a≠0 → q(b)=0 → (x−b)|q(x) → q(x)=(x−b)r(x) → p(x)=(x−a)(x−b)r(x). So yes, (x−a)(x−b)|p(x). This is the basis for building polynomial factorisation from roots.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.polynomial-division — polynomial division algorithm, synthetic division, the division equation p(x)=d(x)q(x)+r(x); the Remainder Theorem is derived directly from this equation

**Unlocked blueprints:**
- math.alg.factor-theorem — the corollary p(a)=0 ↔ (x−a)|p(x); systematic root-finding and polynomial factorisation via repeated Remainder Theorem application

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (SUBSTITUTE-WRONG-SIGN) is the highest-frequency error and must be addressed at first occurrence. The reliable fix is the "solve divisor equals zero" rule — always derive a by solving (x−a)=0, never read off the sign visually.

**Proof as pedagogical tool:** The proof of the theorem (two lines: write the division algorithm; substitute x=a) should be shown explicitly. Learners who see the proof stop needing to "verify" with division (MC-3) because they understand WHY the substitution gives the exact remainder.

**Factor Theorem sequencing:** Introduce Factor Theorem as the immediate corollary after the learner has successfully applied the Remainder Theorem to non-zero remainders. Presenting both simultaneously causes MC-2 (merger of the two theorems into one "roots-only" rule).

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A03 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A03 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (p(x)=2x³+x²−5x+2 ÷ (x−1) and factor test)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: Remainder Theorem proof, Factor Theorem corollary, and all polynomial evaluations consistent with standard algebra; p(x)=(x−a)q(x)+r derivation is textbook-standard

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A03 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Find the remainder when p(x) = x³−4x+1 is divided by (x−2)."
[Expected: a=2; p(2)=8−8+1=1. Remainder=1.]

**Item 2:**
"Find the remainder when q(x) = x⁴+2x³−x+3 is divided by (x+1)."
[Expected: divisor (x+1)=(x−(−1)); a=−1. q(−1)=1−2+1+3=3. Remainder=3.]

**Item 3:**
"Is (x−3) a factor of p(x) = x³−6x²+11x−6?"
[Expected: p(3)=27−54+33−6=0. Remainder=0 → (x−3) IS a factor. Factor: p(x)=(x−3)(x²−3x+2)=(x−3)(x−1)(x−2).]

**Item 4:**
True or False: "The Remainder Theorem only applies when p(a) = 0."
[Expected: FALSE. The theorem gives remainder = p(a) for any value of a. When p(a)=0 the remainder is zero (Factor Theorem), but the theorem holds regardless.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Let p(x) = 2x³+x²−5x+2.

(a) Use the Remainder Theorem to find the remainder when p(x) is divided by (x−1).
(b) Use the Remainder Theorem to find the remainder when p(x) is divided by (x+2).
(c) Is (x+2) a factor of p(x)? Justify."

[Expected:
(a) a=1; p(1)=2+1−5+2=0. Remainder=0.
(b) a=−2; p(−2)=2(−8)+4+10+2=−16+4+10+2=0. Remainder=0.
(c) p(−2)=0 → (x+2) IS a factor. (Also p(1)=0 so (x−1) is a factor.) Full factor: p(x)=(x−1)(x+2)(2x−1).]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) gives remainder 0, (b) gives remainder 0, and (c) correctly identifies (x+2) as a factor with justification p(−2)=0; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can apply the Remainder Theorem to find remainders and test factors, choosing the correct substitution value.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or 2 with wrong value substituted (e.g., p(−2) for (x−2)): → TA-B01 (SUBSTITUTE-WRONG-SIGN repair), then re-gate
- FAIL on Item 4 (TRUE instead of FALSE): → TA-B02 (THEOREM-IS-ONLY-FOR-ROOTS repair), then re-gate
- FAIL on Item 3 with correct p(3)=0 but claims "not a factor": → TA-B02; clarify Factor Theorem corollary; re-gate
- FAIL on P76 (computational error only): → return to A02; re-practise evaluation; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to apply the Remainder Theorem to find remainders and to identify factors without polynomial division.

Key anchors to carry forward:
- Remainder Theorem: when p(x) ÷ (x−a), remainder = p(a). No division needed.
- To find a: solve (divisor)=0. For (x−3): a=3. For (x+5): a=−5.
- Factor Theorem (corollary): p(a)=0 ↔ (x−a) is a factor of p(x).
- The theorem holds for ALL a — non-zero remainders are just as valid as zero remainders.

Next concept: math.alg.factor-theorem — using repeated Remainder Theorem application to find and verify all roots, leading to complete polynomial factorisation."

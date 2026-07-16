# Teaching Blueprint — math.trig.right-triangle-trig

## Component 0 — Metadata
concept_id: math.trig.right-triangle-trig
concept_name: Right-Triangle Trigonometry
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 10
mastery_threshold: 0.90
CPA_entry_stage: P
requires: [math.geom.right-triangle, math.geom.similar-triangles, math.trig.angle-measure]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** For a right triangle with an acute angle θ, sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent (SOH-CAH-TOA). These ratios are well-defined because all right triangles with the same acute angle are similar — their side ratios are constant regardless of triangle size. The three ratios are used to find missing sides when one side and one angle are known, or to find angles when sides are known.

**Conceptual progression:**
1. Why ratios are constant: similar triangles → same angle → same ratio (from math.geom.similar-triangles).
2. Labelling: hypotenuse always opposite the right angle; opposite and adjacent are RELATIVE to the chosen angle θ.
3. SOH-CAH-TOA: three ratios; reciprocals csc, sec, cot (mentioned but not primary here).
4. Special angles: 30-60-90 triangle (sides 1:√3:2) and 45-45-90 triangle (sides 1:1:√2) give exact values.
5. Applications: find missing side given angle and one side; find angle given two sides (inverse trig preview).

**CPA arc (entry: P):**
- Pictorial: right triangle diagram with sides labelled "opposite," "adjacent," "hypotenuse" relative to angle θ; SOH-CAH-TOA mnemonic table; 30-60-90 and 45-45-90 diagrams
- Abstract: ratio equations sin θ=opp/hyp, cos θ=adj/hyp, tan θ=opp/adj; Pythagorean theorem a²+b²=c²; inverse: θ=arcsin(opp/hyp)

**Prior knowledge activated:** right triangle definition, hypotenuse, legs (math.geom.right-triangle); similar triangles and why ratios are constant (math.geom.similar-triangles); angle measure in degrees and radians (math.trig.angle-measure)

---

## Component 2 — Misconception Registry

### MC-1: OPPOSITE-ADJACENT-SWAP [FOUNDATIONAL]
**Description:** Learner confuses which side is "opposite" and which is "adjacent" — particularly when the reference angle is not at the conventional lower-left position. Writes sin θ = adjacent/hypotenuse (the formula for cos θ).
**Surface form:** "The side next to θ is the opposite side because it's touching the angle."
**Root cause:** "Adjacent" means "next to" in everyday English, so the side nearest the angle seems like it should be "adjacent to the angle" — which it is. But "opposite" refers to the side ACROSS from θ (not touching θ), not the hypotenuse. The labelling is relative to the angle, not to a fixed orientation.
**Trigger condition:** Any right triangle problem where the reference angle is not at the standard position, or any problem asking for sin vs. cos.
**Repair target:** TA-B01.

### MC-2: TRIG-APPLIES-TO-ALL-TRIANGLES
**Description:** Learner applies SOH-CAH-TOA to non-right triangles — for example, computing sin θ = opposite/hypotenuse in a triangle with no right angle, calling the longest side the "hypotenuse."
**Surface form:** "sin θ = 5/8 because 5 is opposite θ and 8 is the longest side (hypotenuse)." [In a non-right triangle.]
**Root cause:** The definition "opposite/hypotenuse" works for right triangles; learner extends it to all triangles without recognising that "hypotenuse" is defined only for right triangles (the side opposite the 90° angle).
**Trigger condition:** Any triangle problem that does not have a clearly marked right angle.
**Repair target:** TA-B02.

### MC-3: TAN-IS-OPP-OVER-HYP
**Description:** Learner computes tan θ as opposite/hypotenuse (the formula for sin θ) instead of opposite/adjacent.
**Surface form:** "tan θ = 3/5 in a 3-4-5 triangle at the angle opposite the 3." [Correct sin; wrong tan.]
**Root cause:** SOH-CAH-TOA requires distinguishing TOA (tan=opp/adj) from SOH (sin=opp/hyp). In a 3-4-5 triangle, the hypotenuse (5) is visually prominent and learner defaults to it as the denominator for all ratios.
**Trigger condition:** Any problem asking for tan θ, especially in triangles where the hypotenuse is a round number.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "In a right triangle with hypotenuse 10 and one leg 6, find the other leg." If the learner applies Pythagoras correctly (leg=√(100−36)=8) and correctly labels hypotenuse as the side opposite the right angle, proceed to A01. If the learner cannot identify the hypotenuse, review math.geom.right-triangle before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): provide a right triangle; label the reference angle θ; draw arrows from θ to each side labelling "opposite," "adjacent," "hypotenuse"; write the three ratios.
- Rung 2 (ratio): given sides, compute all three ratios for both acute angles; observe that opposite/adjacent swaps between the two angles.
- Rung 3 (full apply): given one side and one angle, set up a ratio equation and solve for the missing side.

**Pacing note:** h=10 estimated hours; A01 in session 1; A02 in sessions 2–3; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Slope of a hill.
"When you walk up a hill, 'steepness' is measured by how much you rise for every unit you walk forward: rise/run. If you walk 3 m forward and rise 1 m, steepness = 1/3. A steeper hill has rise/run closer to 1 or greater."

TARGET DOMAIN: Tangent of an angle.
"tan θ = opposite/adjacent = rise/run for the right triangle formed by the hill. The 'adjacent' side is the horizontal distance (run); the 'opposite' side is the vertical rise. tan θ is the slope of the hypotenuse."

EXTENSION — why three ratios?
"Sometimes you know the slope (tan θ) from a map, but need to know the actual path length up the hill (hypotenuse). Then you need sin θ = rise/path = opposite/hypotenuse. Or you know the path length and need the horizontal distance: cos θ = run/path = adjacent/hypotenuse. The three ratios answer three different questions about the same triangle."

LABELLING RULE:
"'Opposite' and 'adjacent' are RELATIVE to angle θ:
- Hypotenuse: always opposite the 90° angle (the longest side).
- Opposite (to θ): the side that does NOT touch θ (across from θ).
- Adjacent (to θ): the side that TOUCHES θ but is not the hypotenuse."

WORKED DEMONSTRATION: 3-4-5 triangle with θ at vertex A (opposite side=3, adjacent=4, hyp=5).
- sin θ = 3/5 (opposite/hyp)
- cos θ = 4/5 (adjacent/hyp)
- tan θ = 3/4 (opposite/adjacent = rise/run = slope)
- For the OTHER acute angle φ (opposite=4, adjacent=3): sin φ=4/5, cos φ=3/5, tan φ=4/3. The labels swap.

**Assessment primitive: P49**

PROBE: "Right triangle: hypotenuse=13, legs=5 and 12. Angle θ is opposite the leg of length 5. Compute sin θ, cos θ, tan θ."
- CORRECT: sin θ=5/13, cos θ=12/13, tan θ=5/12 → "Correct. Opposite to θ is 5 (the side not touching θ); adjacent is 12; hypotenuse is 13."
- PARTIAL: sin and cos correct, tan=5/13 (used hyp instead of adj) → "sin and cos are right. For tan: the denominator is the ADJACENT side, not the hypotenuse. tan θ = opposite/adjacent = 5/12." → Repair with B03 if this is repeated.
- INCORRECT: sin θ=12/13 (swapped opp and adj) → Repair with B01 (OPPOSITE-ADJACENT-SWAP).
- NO_RESPONSE: "First identify the hypotenuse: it's opposite the 90° angle = 13. Now find the 'opposite' to θ: the side NOT touching θ. Since θ is at vertex A opposite the leg of length 5, the opposite side is 5. The adjacent side (touching θ but not hyp) is 12. sin θ=5/13, cos θ=12/13, tan θ=5/12."

---

### TA-B01 — Repair for MC-1 (OPPOSITE-ADJACENT-SWAP)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'adjacent means the side next to θ, and that must be the opposite side.' Both 'adjacent' and the 'opposite' sides are next to θ — the distinction is whether the side is the hypotenuse or not."

**P41 — MISCONCEPTION DETECTOR**
"In a right triangle with θ at vertex A, the side BC (not touching A) and side AC (touching A, not hyp). Which is opposite to θ?
(A) AC — it's adjacent to θ (touches θ).
(B) BC — it's opposite θ (across from θ, doesn't touch θ)."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"'Opposite' means ACROSS FROM θ — the side that does not touch θ at all. 'Adjacent' means touching θ (but not being the hypotenuse). Think of a person standing at angle θ: the 'opposite' side is the wall they are facing (across the room); the 'adjacent' side is the floor they stand on (right next to them). Both are 'next to' the person in some sense, but only the floor is adjacent; the wall is opposite."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Computing all three ratios and using reciprocals:

Triangle: right angle at C, θ at A.
- AC=4 (adjacent to θ), BC=3 (opposite θ), AB=5 (hypotenuse).
- sin θ = 3/5 = 0.6; cos θ = 4/5 = 0.8; tan θ = 3/4 = 0.75.
- Verify: sin²θ+cos²θ = (3/5)²+(4/5)² = 9/25+16/25 = 25/25 = 1 ✓ (Pythagorean identity).
- Verify: tan θ = sin θ/cos θ = (3/5)/(4/5) = (3/5)×(5/4) = 3/4 ✓.
- For the other acute angle φ (at B): opposite=4, adjacent=3. sin φ=4/5, cos φ=3/5, tan φ=4/3. Note: sin φ=cos θ and cos φ=sin θ (complementary angles: θ+φ=90°).

WORKED EXAMPLE 2 — Finding a missing side using special angles:

Problem: A 30-60-90 triangle has hypotenuse 12 cm. Find all sides.

30-60-90 triangle side ratios: 1:√3:2 (opposite 30°: opposite 60°: hypotenuse).
Step 1: hypotenuse = 2 × (short leg). So short leg = 12/2 = 6 cm (side opposite 30°).
Step 2: long leg = short leg × √3 = 6√3 cm (side opposite 60°).
Step 3: Verify using sin 30°: sin 30° = 1/2 = (side opposite 30°)/hyp = 6/12 = 1/2 ✓.
Check with Pythagoras: 6²+(6√3)²=36+108=144=12² ✓.

WORKED EXAMPLE EXTENSION — 45-45-90:
Triangle with legs both length 5. Hypotenuse = 5√2. cos 45°=adj/hyp=5/(5√2)=1/√2=√2/2.

**Assessment primitive: P49**

PROBE: "Right triangle: one angle is 60°, the adjacent side is 4 cm. Find the opposite side and the hypotenuse."
- CORRECT: tan 60°=√3=opp/4 → opp=4√3. cos 60°=1/2=4/hyp → hyp=8. Check: (4)²+(4√3)²=16+48=64=8² ✓. → "Correct. tan 60°=√3 gives the opposite; cos 60°=1/2 gives the hypotenuse."
- PARTIAL: correct opposite, error in hypotenuse → "Opposite is right: 4√3. For hypotenuse: cos 60°=adjacent/hyp=4/hyp. Since cos 60°=1/2: 1/2=4/hyp → hyp=8."
- INCORRECT: uses sin 60° for adjacent → Repair with B01 (OPPOSITE-ADJACENT-SWAP); clarify which side is "adjacent" to 60°.
- NO_RESPONSE: "Label the sides: adjacent to 60°=4, opposite to 60°=unknown, hypotenuse=unknown. Use tan 60°=opposite/adjacent=x/4 to find x=4tan60°=4√3. Then use cos 60°=adjacent/hypotenuse=4/h to find h=4/cos60°=4/(1/2)=8."

---

### TA-B02 — Repair for MC-2 (TRIG-APPLIES-TO-ALL-TRIANGLES)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'SOH-CAH-TOA works for any triangle — just use the longest side as the hypotenuse.' The hypotenuse is DEFINED as the side opposite the 90° angle, which only exists in right triangles."

**P41 — MISCONCEPTION DETECTOR**
"In a triangle with angles 40°, 60°, 80° and longest side 10. Can you apply sin 40°=opposite/10?
(A) Yes — 10 is the longest side so it's the hypotenuse.
(B) No — without a 90° angle, there is no hypotenuse; SOH-CAH-TOA does not apply."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"'Hypotenuse' means 'the side opposite the 90° angle' — this is its DEFINITION, not a description of the longest side. In a triangle with no 90° angle, no side is the hypotenuse, and the ratios sin=opp/hyp, cos=adj/hyp are undefined. For non-right triangles, use the Law of Sines (sin A/a = sin B/b = sin C/c) or Law of Cosines — different tools designed for the general case."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Correct identification and application:
- θ=30°; opposite side=a, adjacent=b, hypotenuse=c.
  sin 30°=a/c=1/2 → a=c/2.
  cos 30°=b/c=√3/2 → b=c√3/2.
  tan 30°=a/b=(c/2)/(c√3/2)=1/√3=√3/3 ✓ (consistent).

- For COMPLEMENTARY angle φ=60°: opposite side IS b (=c√3/2), adjacent IS a (=c/2).
  sin 60°=b/c=√3/2 = cos 30° ✓ [complementary angles: sin(90°−θ)=cos θ].

PAIR B — Common errors:

Error 1 — Swap (sin when cos wanted):
"Find the side adjacent to θ=30° if hypotenuse=10."
WRONG: uses sin 30°=1/2 → adjacent=10×(1/2)=5. [This gives the OPPOSITE side.]
CORRECT: cos 30°=adjacent/hyp → adjacent=10×cos30°=10×(√3/2)=5√3.

Error 2 — tan error (divides by hypotenuse):
"tan 45° in a 1-1-√2 triangle."
WRONG: tan 45°=1/√2. [This is sin 45°.]
CORRECT: tan 45°=opposite/adjacent=1/1=1.

Error 3 — applying SOH-CAH-TOA to scalene triangle (no right angle):
WRONG: calls the longest side hypotenuse; computes sin θ=opp/(longest side). [Undefined.]
CORRECT: use Law of Sines for general triangles.

CONTRAST TABLE:
| Situation | Correct ratio | Common error |
|---|---|---|
| Find opposite, know hyp | sin θ=opp/hyp → opp=hyp·sin θ | Uses cos θ instead |
| Find adjacent, know hyp | cos θ=adj/hyp → adj=hyp·cos θ | Uses sin θ instead |
| Find opposite, know adj | tan θ=opp/adj → opp=adj·tan θ | Divides by hyp |
| Non-right triangle | Law of Sines/Cosines | SOH-CAH-TOA incorrectly |

**Assessment primitive: P49**

PROBE: "A right triangle has a 45° angle and one leg of length 7. Find the hypotenuse and the other leg."
- CORRECT: "sin 45°=7/hyp → hyp=7/sin45°=7/(√2/2)=7√2. The other leg: cos 45°=7/7√2=1/√2=√2/2 or just note 45-45-90 → both legs equal = 7. Hyp=7√2." → proceed to A04.
- PARTIAL: correct hypotenuse, wrong other leg → "Other leg: since both acute angles are 45°, the triangle is isosceles — both legs are equal = 7. Alternatively, use Pythagorean theorem: 7²+b²=(7√2)² → 49+b²=98 → b²=49 → b=7."
- INCORRECT: confuses sin and cos → Repair with B01 (OPPOSITE-ADJACENT-SWAP).
- NO_RESPONSE: "In a 45-45-90 triangle, both legs are equal (the two acute angles are the same). If one leg is 7, the other leg is also 7. Hypotenuse: by Pythagoras, 7²+7²=hyp² → hyp²=98 → hyp=7√2. Verify with sin 45°=7/(7√2)=1/√2=√2/2 ✓."

---

### TA-B03 — Repair for MC-3 (TAN-IS-OPP-OVER-HYP)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'tan θ = opposite/hypotenuse.' This is the formula for sin θ. Tan has the adjacent side in the denominator, not the hypotenuse."

**P41 — MISCONCEPTION DETECTOR**
"In a 3-4-5 right triangle with θ opposite the side of length 3: which value is tan θ?
(A) 3/5 (opposite/hypotenuse = sin θ).
(B) 3/4 (opposite/adjacent)."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"SOH-CAH-TOA:
- S-O-H: Sin = Opposite/Hypotenuse.
- C-A-H: Cos = Adjacent/Hypotenuse.
- T-O-A: Tan = Opposite/Adjacent.
Tan's denominator is the ADJACENT side, not the hypotenuse. An alternative memory: tan θ = sin θ/cos θ = (opp/hyp)/(adj/hyp) = opp/adj. In the 3-4-5 triangle: tan θ = 3/4 = sin θ/cos θ = (3/5)/(4/5) = 3/4 ✓. The hypotenuse cancels out — tan does not involve the hypotenuse directly."

→ Return to A01.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (OPPOSITE-ADJACENT-SWAP)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (TRIG-APPLIES-TO-ALL-TRIANGLES)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (TAN-IS-OPP-OVER-HYP)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A01.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"A ramp makes a 20° angle with the ground. The ramp is 6 m long. How high above the ground does the ramp reach? (Use sin 20°≈0.342.)"
[Expected: height = 6·sin 20° ≈ 6×0.342 = 2.052 m. sin 20°=opposite/hyp, so opposite=hyp·sin20°=6·0.342.]

**Day 10 prompt:**
"Derive from scratch (without memorising): what are sin 45°, cos 45°, and tan 45°? Use a right isosceles triangle."
[Expected: equal legs=1, hyp=√2. sin45°=1/√2=√2/2. cos45°=1/√2=√2/2. tan45°=1/1=1. Note sin45°=cos45° because the triangle is isosceles — equal legs, equal acute angles.]

**Day 30 prompt:**
"In a right triangle with legs a and b and hypotenuse c, prove that sin²θ+cos²θ=1 for the acute angle θ opposite side a."
[Expected: sin θ=a/c, cos θ=b/c. sin²θ+cos²θ=(a/c)²+(b/c)²=(a²+b²)/c²=c²/c²=1, using Pythagoras a²+b²=c². This is the Pythagorean identity — it follows directly from the Pythagorean theorem applied to the defining triangle.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.geom.right-triangle — right angle, legs, hypotenuse; Pythagorean theorem a²+b²=c²
- math.geom.similar-triangles — all right triangles with the same acute angle are similar; side ratios are constant → WHY trig ratios are well-defined
- math.trig.angle-measure — degrees and radians; angle labelling conventions

**Unlocked blueprints:**
- math.trig.unit-circle — extending sin/cos beyond 0°–90° via the unit circle
- math.trig.law-of-sines — sin A/a = sin B/b for general triangles
- math.trig.law-of-cosines — c²=a²+b²−2ab·cos C for general triangles

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (OPPOSITE-ADJACENT-SWAP) causes the most systematic errors. The key intervention is to ALWAYS draw and label the triangle before writing any ratio — label O, A, H relative to the reference angle on every problem.

**SOH-CAH-TOA as a last resort:** Students who rely on the mnemonic alone without understanding are prone to MC-3. Pair the mnemonic with the slope interpretation (tan=rise/run) and the identity tan θ=sin θ/cos θ to create multiple anchors.

**Special angle triangles are worth memorising:** 30-60-90 (sides 1:√3:2) and 45-45-90 (sides 1:1:√2) allow exact answers without a calculator. Derive them once from first principles; then they are owned, not memorised.

**Complementary angle identity:** sin(90°−θ)=cos θ and cos(90°−θ)=sin θ. Derived from labelling: what is "opposite" to θ becomes "adjacent" to (90°−θ). This identity connects the two acute angles and deepens structural understanding.

**Bridge to unit circle:** At this level, sin/cos are defined for 0°<θ<90° only. The unit circle generalises this to all angles — preview this without teaching it.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P06
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel unseen problem (ladder problem with Pythagoras + all three ratios)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.90 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All mathematical content (SOH-CAH-TOA, special angles, Pythagorean identity, complementary angle identity) consistent with KG description and standard trigonometry pedagogy; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.90 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"In a right triangle with legs 5 and 12 and hypotenuse 13, angle θ is opposite the leg of length 5. Find sin θ."
[Expected: sin θ = opposite/hypotenuse = 5/13.]

**Item 2:**
"A right triangle has a 45° angle and hypotenuse 8. Find the length of each leg."
[Expected: leg = 8·sin 45° = 8·(√2/2) = 4√2. Both legs equal 4√2 (45-45-90 triangle).]

**Item 3:**
True or False: "tan θ = opposite/hypotenuse."
[Expected: FALSE. tan θ = opposite/adjacent. sin θ = opposite/hypotenuse.]

**Item 4:**
"What is cos 60°?"
[Expected: cos 60° = 1/2. In a 30-60-90 triangle: adjacent to 60° is the short leg = 1; hypotenuse = 2; cos 60° = 1/2.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"A ladder of length 13 m leans against a vertical wall. The foot of the ladder is 5 m from the base of the wall on level ground.

(a) Find the height h that the ladder reaches on the wall.
(b) Let θ be the angle the ladder makes with the ground. Compute sin θ, cos θ, and tan θ as exact fractions.
(c) Verify that sin²θ + cos²θ = 1."

[Expected:
(a) Right triangle: hypotenuse=13 (ladder), adjacent to θ=5 (ground distance), opposite=h (wall height). Pythagoras: h=√(13²−5²)=√(169−25)=√144=12 m.
(b) sin θ=opp/hyp=12/13; cos θ=adj/hyp=5/13; tan θ=opp/adj=12/5.
(c) sin²θ+cos²θ=(12/13)²+(5/13)²=144/169+25/169=169/169=1 ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (b) gives all three ratios correctly (12/13, 5/13, 12/5) and (c) verifies the identity, 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner correctly identifies opposite/adjacent/hypotenuse relative to a chosen angle, computes all three trig ratios, applies them to find missing sides, and knows special angle values.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (sin gives cos value, i.e., 12/13): → TA-B01 (OPPOSITE-ADJACENT-SWAP repair), then re-gate
- FAIL on Item 2 (uses wrong ratio for 45° problem): → Return to A02 (WE2 — 30-60-90 and 45-45-90 examples), then re-gate
- FAIL on Item 3 (believes tan=opp/hyp): → TA-B03 (TAN-IS-OPP-OVER-HYP repair), then re-gate
- FAIL on Item 4 (cannot recall cos 60°): → Return to A02 (WE2 — derive 30-60-90 ratios), then re-gate
- FAIL on P76 (wrong sides or wrong ratio): → TA-B01 if wrong side labelled; TA-B03 if tan error; else return to A01, then re-gate
- FAIL on multiple items: → B01 then B03; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated mastery of right-triangle trigonometry: correct labelling of sides relative to the reference angle, computation of all three ratios, application to find missing sides with special angles.

Key anchors to carry forward:
- SOH-CAH-TOA: Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj. Labelling is RELATIVE to θ.
- Hypotenuse is always opposite the 90° angle; 'opposite' and 'adjacent' depend on which acute angle is θ.
- Special angles: 30-60-90 (1:√3:2) and 45-45-90 (1:1:√2) give exact values.
- sin²θ+cos²θ=1 (Pythagorean identity — follows from Pythagoras on the defining triangle).
- tan θ=sin θ/cos θ (ratio identity).

Next concepts: math.trig.unit-circle (extending trig to all angles), math.trig.law-of-sines (general triangles)."

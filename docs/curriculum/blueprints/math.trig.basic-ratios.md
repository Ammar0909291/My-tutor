<!-- BLUEPRINT: math.trig.basic-ratios -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Basic Trigonometric Ratios (SOH-CAH-TOA)
**Concept ID:** `math.trig.basic-ratios`
**KG Fields:** difficulty=proficient | bloom=remember | estimated_hours=4 | mastery_threshold=0.95

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.basic-ratios |
| name | Basic Trigonometric Ratios (SOH-CAH-TOA) |
| difficulty | proficient |
| bloom | remember |
| estimated_hours | 4 |
| mastery_threshold | 0.95 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.trig.right-triangle-trig |
| cross_links | none |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.95 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.right-triangle-trig**: Right-triangle geometry; hypotenuse as the side opposite the right angle; similar-triangle angle-ratio invariance; Pythagorean theorem

### Target Knowledge State
Student names and applies the three primary trigonometric ratios: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. Student labels Opposite, Adjacent, and Hypotenuse correctly relative to the reference angle θ (not the right angle). Student applies the Pythagorean theorem to find a missing side before computing a ratio.

### Conceptual Obstacles
1. Swapping sin and cos — assigning the adjacent leg to sin or the opposite leg to cos
2. Labeling sides relative to the right-angle vertex instead of relative to θ
3. Identifying the hypotenuse by visual "longest appearance" rather than as the side opposite the right angle

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | OPPOSITE-ADJACENT-SWAP | Student reverses sin and cos: writes sin θ = adjacent/hyp and cos θ = opposite/hyp | Any problem requiring both sin θ and cos θ |
| MC-2 | WRONG-REFERENCE-VERTEX | Student labels O and A relative to the right-angle vertex rather than relative to θ | Non-standard orientations; θ near the right angle |
| MC-3 | HYPOTENUSE-BY-POSITION | Student identifies a different side as hypotenuse when the triangle is tilted, rather than always using the side opposite the right angle | Rotated or non-standard diagrams |

**Foundational Misconception:** MC-1 (OPPOSITE-ADJACENT-SWAP) — produces systematically wrong ratios for every downstream problem. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — labeled right-triangle diagram with a marked reference angle θ.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Four-stage diagram: unlabeled triangle → right angle marked → θ marked → sides labeled O/A/H relative to θ; state SOH-CAH-TOA
2. **A02 P04 PATTERN INDUCTION** — Gallery of triangles with varying side lengths; compute sin, cos, tan; extend to missing-side problems via Pythagorean theorem
3. **A03 P06 CONTRAST PAIR** — Same triangle, θ at two different vertices; show O and A swap while H is fixed; resolve MC-2
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Defining SOH-CAH-TOA from a Labeled Diagram

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build the O/A/H labeling procedure relative to θ; state the three ratios; prevent MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Unlabeled triangle:**

A right triangle with vertices P (top), Q (bottom-right), R (bottom-left). No labels yet.

**Stage B — Mark the right angle:**

Place the right-angle marker at R. The side PR and QR are legs; the side PQ across from R is the **hypotenuse**. This identification never changes.

**Stage C — Mark θ:**

Set θ = angle at P (top vertex). Mentally stand at P:
- The side DIRECTLY ACROSS from me: QR. This is the **Opposite** leg.
- The side BESIDE me (between me and the right angle): PR. This is the **Adjacent** leg.

**Stage D — SOH-CAH-TOA:**

| Ratio | Definition | Memory cue |
|-------|-----------|-----------|
| **sin θ** | Opposite / Hypotenuse | **S**OH |
| **cos θ** | Adjacent / Hypotenuse | **C**AH |
| **tan θ** | Opposite / Adjacent | **T**OA |

**Worked example:** Legs 3 and 4, hypotenuse 5; θ is the angle opposite the leg of length 3.
- Opposite = 3, Adjacent = 4, Hypotenuse = 5
- sin θ = 3/5, cos θ = 4/5, tan θ = 3/4

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* In a right triangle with legs 5 and 12 and hypotenuse 13, θ is the angle opposite the leg of length 12. What is cos θ?

(A) 12/13
(B) 5/13
(C) 12/5
(D) 5/12

*Branch CORRECT (B):* Adjacent = 5, Hypotenuse = 13. cos θ = 5/13. ✓ Proceed to A02.

*Branch INCORRECT (A):* That is sin θ = opposite/hypotenuse = 12/13. For cos θ, use the adjacent leg (the one beside θ, not opposite it): the adjacent leg is 5, so cos θ = 5/13. Proceed to A02.

*Branch INCORRECT (C, D):* cos θ requires the hypotenuse in the denominator. The adjacent leg is 5 and hypotenuse is 13: cos θ = 5/13. Proceed to A02.

*Branch NO_RESPONSE:* Opposite = 12, Adjacent = 5, Hypotenuse = 13. cos θ = Adjacent/Hypotenuse = **5/13**. Proceed to A02.

---

### Teaching Action A02 — Computing All Three Ratios from Given Sides

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate the O/A/H labeling process; extend to missing-side problems; surface MC-3

---

**[P04 — PATTERN INDUCTION]**

**Labeling algorithm:**
1. Locate the right angle → the side opposite it is always the hypotenuse
2. Locate θ → the leg across from θ is Opposite; the remaining leg (beside θ) is Adjacent
3. Apply SOH-CAH-TOA

**Gallery:**

| Legs | Hyp | θ opposite | sin θ | cos θ | tan θ |
|------|-----|-----------|-------|-------|-------|
| 3, 4 | 5 | leg 3 | 3/5 | 4/5 | 3/4 |
| 5, 12 | 13 | leg 12 | 12/13 | 5/13 | 12/5 |
| 7, 24 | 25 | leg 7 | 7/25 | 24/25 | 7/24 |
| 8, 15 | 17 | leg 15 | 15/17 | 8/17 | 15/8 |

**When a side is missing — use Pythagorean theorem first:**

*Example:* One leg = 9, hypotenuse = 41; θ is the angle between the hypotenuse and the leg of length 9.
- Adjacent = 9, Hypotenuse = 41
- Opposite = √(41² − 9²) = √(1681 − 81) = √1600 = 40
- sin θ = 40/41, cos θ = 9/41, tan θ = 40/9

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* A right triangle has one leg = 7 and hypotenuse = 25. θ is the angle opposite the leg of length 7. What is tan θ?

(A) 7/25
(B) 7/24
(C) 24/25
(D) 25/7

*Branch CORRECT (B):* Missing leg = √(25² − 7²) = √(625 − 49) = √576 = 24. Opposite = 7, Adjacent = 24. tan θ = 7/24. ✓ Proceed to A03.

*Branch INCORRECT (A):* That is sin θ = 7/25. For tan θ, use opposite/adjacent. Find the adjacent leg: √(25² − 7²) = 24. So tan θ = 7/24. Proceed to A03.

*Branch INCORRECT (C):* That is cos θ = 24/25. Tan = opposite/adjacent = 7/24. Proceed to A03.

*Branch NO_RESPONSE:* Missing leg = √(625 − 49) = 24. Opposite = 7, Adjacent = 24. tan θ = **7/24**. Proceed to A03.

---

### Teaching Action A03 — The Moving Reference Angle

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Show that O and A swap when θ shifts to the other acute vertex; resolve MC-2

---

**[P06 — CONTRAST PAIR]**

**Same triangle, two reference angles:**

Right triangle with legs 3 and 4, hypotenuse 5. α = angle opposite leg 3; β = angle opposite leg 4.

| | θ = α | θ = β |
|---|---|---|
| Opposite | 3 | 4 |
| Adjacent | 4 | 3 |
| Hypotenuse | 5 | 5 |
| sin θ | 3/5 | 4/5 |
| cos θ | 4/5 | 3/5 |
| tan θ | 3/4 | 4/3 |

**What changes:** Opposite and Adjacent swap when θ moves. **What stays fixed:** Hypotenuse is always 5 (always the side across from the right angle).

**Key observation:** sin α = cos β = 3/5, and cos α = sin β = 4/5. This is the complementary angle relationship — α + β = 90°, so sin α = cos(90° − α) = cos β.

**Common error:** Labeling sides by visual position ("the bottom side is adjacent") rather than by angular position ("the side beside θ is adjacent"). A tilted diagram doesn't change which side is opposite θ — the geometry of angle position does.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* A right triangle has legs 6 (horizontal) and 8 (vertical), hypotenuse 10. θ is the angle at the top of the vertical leg (between the vertical leg and the hypotenuse). Which side is the Adjacent leg for θ?

(A) The horizontal leg of length 6
(B) The vertical leg of length 8
(C) The hypotenuse of length 10
(D) Both legs of length 6 and 8 are adjacent

*Branch CORRECT (B):* θ is at the top of the vertical leg; the vertical leg is the side beside θ between θ and the right angle — it is Adjacent. The horizontal leg is opposite θ. ✓ Proceed to A04.

*Branch INCORRECT (A):* The horizontal leg is ACROSS from θ (not touching θ's vertex) — it is the Opposite side. The Adjacent side is the one beside θ: the vertical leg of length 8. Proceed to A04.

*Branch INCORRECT (C):* The hypotenuse is neither adjacent nor opposite — it is always the hypotenuse (opposite the right angle). The Adjacent side here is the vertical leg of length 8. Proceed to A04.

*Branch NO_RESPONSE:* θ is at the top vertex. The side beside θ (connecting θ to the right angle) is the vertical leg of length **8** — that is the Adjacent leg. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** In a right triangle with legs 3 and 4 (hypotenuse 5), θ is the angle opposite the leg of length 3. Find sin θ, cos θ, and tan θ.

**Problem 2.** In a right triangle with legs 5 and 12 (hypotenuse 13), θ is the angle opposite the leg of length 5. Find sin θ, cos θ, and tan θ.

**Problem 3.** A right triangle has one leg = 8 and hypotenuse = 17. θ is the angle between the hypotenuse and the leg of length 8. Find sin θ, cos θ, and tan θ. (Find the missing leg first.)

**Problem 4.** If sin θ = 7/25 where θ is an acute angle in a right triangle, find cos θ and tan θ.

---

**[P55 — SCORE]**

*Answers:*

1. sin θ = 3/5, cos θ = 4/5, tan θ = 3/4 ✓

2. Opposite = 5, Adjacent = 12, Hyp = 13. sin θ = 5/13, cos θ = 12/13, tan θ = 5/12 ✓

3. Missing leg = √(17² − 8²) = √(289 − 64) = √225 = 15. θ between hyp and leg 8 → Adjacent = 8, Opposite = 15, Hyp = 17. sin θ = 15/17, cos θ = 8/17, tan θ = 15/8 ✓

4. sin θ = 7/25 → Opposite = 7, Hypotenuse = 25. Adjacent = √(25² − 7²) = √576 = 24. cos θ = 24/25, tan θ = 7/24 ✓

Score 1 point per problem (each problem has multiple parts; award 1 point for all sub-parts correct).

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A ladder leans against a wall. The foot of the ladder is 5 m from the base of the wall and the top reaches 12 m up the wall. The angle θ is formed between the ladder and the ground.

*(a)* Find the length of the ladder.

*(b)* Find sin θ, cos θ, and tan θ.

*(c)* A student writes cos θ = 12/13. What error did the student make?

*Expected answer:*

*(a)* Ladder = √(5² + 12²) = √169 = 13 m.

*(b)* Opposite (wall height) = 12, Adjacent (ground distance) = 5, Hypotenuse (ladder) = 13.
sin θ = 12/13, cos θ = 5/13, tan θ = 12/5.

*(c)* The student confused Opposite and Adjacent for cos: wrote 12/13 (opposite/hypotenuse) when cos = adjacent/hypotenuse = 5/13. The value 12/13 is sin θ, not cos θ.

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three parts correct); 0.5 if (a) and (b) correct but (c) error not identified.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.95 × 5⌉ = 5). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Identify missed item; sin/cos swap → B01; wrong vertex → B02; hypotenuse error → B03; targeted repair |
| ≤ 3/5 | → Return to A01; re-label triangle diagram from scratch; rebuild SOH-CAH-TOA; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.basic-ratios` complete. Threshold 0.95 requires 5/5 correct.

**Unlocks:** math.trig.special-angles (special angle values from 30-60-90 and 45-45-90); downstream trig functions.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — OPPOSITE-ADJACENT-SWAP Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You have sin and cos switched. Sin = Opposite/Hypotenuse (S-O-H). Cos = Adjacent/Hypotenuse (C-A-H). The mnemonic: **S**OH–**C**AH–**T**OA. S goes with O, C goes with A."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* In a 3-4-5 triangle with θ opposite the leg 3, which ratio equals 4/5?
*Correct response:* cos θ = adjacent/hypotenuse = 4/5. If you said sin θ = 4/5, you have the ratios switched.

**[P64 — CONCEPTUAL SHIFT]**
"Anchor on the first letters: **S**in starts with S, **O**pposite starts with O — both 'sharp' letters. **C**os starts with C, **A**djacent starts with A — both 'curvy' letters. This pairing is the mnemonic SOH-CAH-TOA read as three groups: S-O-H (sin=opp/hyp), C-A-H (cos=adj/hyp), T-O-A (tan=opp/adj)."

---

### Repair Action B02 — WRONG-REFERENCE-VERTEX Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You labeled the sides relative to the right angle rather than relative to θ. The right angle tells you which side is the hypotenuse — but Opposite and Adjacent are always defined relative to WHERE θ IS."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Draw a right triangle. Mark θ at one acute vertex. Point to the Opposite side.
*Correct response:* The student should point to the leg that does NOT touch θ (the side directly across the triangle from the θ vertex).

**[P64 — CONCEPTUAL SHIFT]**
"Imagine standing at the θ vertex. Look straight across the triangle — whatever you see is the Opposite side. Look beside you (not across) — that's the Adjacent side. This mental movement always works regardless of how the triangle is oriented or tilted."

---

### Repair Action B03 — HYPOTENUSE-BY-POSITION Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The hypotenuse is NOT the side that looks longest from θ's perspective. The hypotenuse is ALWAYS the side directly opposite the right angle — regardless of how the triangle is drawn or rotated."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* A right triangle is drawn tilted so that the hypotenuse appears horizontal (at the bottom). Which side is the hypotenuse?
*Correct response:* Still the side opposite the right angle — even if it looks like the 'base' now.

**[P64 — CONCEPTUAL SHIFT]**
"The right angle has a square marker. The side directly across from that square marker is the hypotenuse. This is a property of the right angle's position, not the triangle's visual orientation. Mark the right angle first; then the hypotenuse is automatic."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | In a right triangle with legs 8 and 15 (hypotenuse 17), find sin, cos, tan for the angle opposite the leg of length 8. |
| R2 | 3 days | A right triangle has hypotenuse 10 and one leg 6. Find all six values (sin, cos, tan) for both acute angles. |
| R3 | 7 days | Without a calculator: if tan θ = 3/4 (acute θ), find sin θ and cos θ. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | math.trig.special-angles |
| Requires (Tier-1) | math.trig.right-triangle-trig |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent ladder problem.

---

## Component 8 — Teaching Notes

- **SOH-CAH-TOA is a recall tool, not a reasoning tool:** Students who only memorise the mnemonic without internalizing the O/A/H labeling procedure will fail on non-standard orientations. Always insist on labeling the diagram before applying the mnemonic.
- **MC-1 is extremely common and hard to detect without contrast:** A student who always gets sin 3/5 and cos 4/5 in a 3-4-5 triangle may be getting them right by accident (confusing which is which) when the two values differ. The two-vertex contrast (A03) is the fastest diagnostic.
- **The P76 transfer adds a self-error-identification step:** Students who can compute ratios but cannot explain why a classmate's answer is wrong do not have procedural fluency tied to conceptual meaning. The (c) sub-part targets this gap.
- **Prepare for reciprocal identities:** The three primary ratios are complete here; csc, sec, cot appear in `math.trig.reciprocal-identities`. Don't introduce them in this blueprint.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; concrete labeled triangle diagram used in A01 | PASS |
| V-4 | bloom=remember; P07 not included | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.95×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

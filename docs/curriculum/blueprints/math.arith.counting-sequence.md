# Teaching Blueprint — math.arith.counting-sequence

## Component 0 — Metadata
concept_id: math.arith.counting-sequence
concept_name: Counting Sequence
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: foundational
bloom: remember
estimated_hours: 4
mastery_threshold: 0.95
CPA_entry_stage: C
requires: [math.arith.counting]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The counting sequence is the ordered sequence 1, 2, 3, 4, … of natural numbers. It assigns a unique natural number to each element of a finite set. Three properties define it: (1) it starts at 1; (2) each successor is exactly 1 more than the previous; (3) it contains no gaps. The total count of a finite set equals the last number reached.

**Conceptual progression:**
1. Counting as a bijection: matching each object with exactly one number from the sequence (one-to-one correspondence).
2. Order within the sequence is fixed: 1 always before 2, 2 always before 3 — this order is not a matter of preference.
3. The total count is invariant: regardless of which object in a set you count first, the final number is always the same.
4. No gaps in the sequence: 1, 2, 4, 5 is NOT a counting sequence (3 was skipped).

**CPA arc (entry: C):**
- Concrete: touching and labelling objects (apples, blocks, fingers) with spoken numbers 1, 2, 3, …
- Pictorial: number line showing 1, 2, 3, … equally spaced; arrows connecting objects to their number tags
- Abstract: formal sequence notation 1, 2, 3, …, n; last element n = cardinality of the set

**Prior knowledge activated:** the counting process (saying 1, 2, 3 … while touching objects); natural number symbols 1, 2, 3, …; the concept of "how many"

---

## Component 2 — Misconception Registry

### MC-1: SEQUENCE-HAS-GAPS [FOUNDATIONAL]
**Description:** Learner believes a counting sequence can skip numbers (e.g., 1, 2, 4, 5).
**Surface form:** When asked what comes after 3 in the counting sequence, says 5.
**Root cause:** Conflates the counting sequence with an arbitrary list of numbers; has not internalised the successor rule (+1 every step with no skips).
**Trigger condition:** Any question about the structure or continuation of the counting sequence.
**Repair target:** TA-B01.

### MC-2: COUNT-ORDER-CHANGES-TOTAL
**Description:** Learner believes the total count changes depending on which object in a set is counted first.
**Surface form:** Counts 5 apples starting from the left (gets 5), then thinks counting from the right would give a different number.
**Root cause:** Confuses the ORDER in which objects are counted with the TOTAL count; does not yet grasp that the bijection produces the same last number regardless of starting point.
**Trigger condition:** Any problem asking whether counting in different orders gives the same total.
**Repair target:** TA-B01.

### MC-3: ZERO-STARTS-SEQUENCE
**Description:** Learner begins the counting sequence at 0 instead of 1 when counting elements of a finite set.
**Surface form:** Counts 5 objects as "0, 1, 2, 3, 4" and reports 4 as the total.
**Root cause:** Over-generalisation from zero-indexed contexts (computer programming, some array notations) or from cardinal vs. ordinal confusion.
**Trigger condition:** Any problem requiring a count of a finite set where starting number matters.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** "Say the first 5 numbers you use when counting things." If correct (1, 2, 3, 4, 5) → begin TA-A01. If learner starts from 0 → flag MC-3 and route to TA-B02 after TA-A01.

**Scaffolding ladder:**
1. Touch-and-count 5 physical objects — verify start at 1, one-to-one matching, no skipping
2. Identify the gap in a sequence with a missing number (e.g., 1, 2, __, 4, 5)
3. Confirm count invariance by counting the same set of objects in two different orders
4. Connect sequence to number line — equal spacing, no gaps

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 95%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — What the Counting Sequence Is
**Primitive sequence:** P11 → P49

**P11 — REPRESENTATION SHIFT:**

*Concrete:* Place 6 apples in a row. Touch each apple in order and say: "1, 2, 3, 4, 5, 6." Each apple gets exactly one number. The last number said (6) is the count.

*Pictorial:* Draw a number line with marks at equal intervals. Label marks 1, 2, 3, 4, 5, 6. Draw arrows from each apple to its mark. No apple gets two numbers; no mark gets two apples. This is a one-to-one pairing.

*Abstract:* The counting sequence is 1, 2, 3, 4, 5, 6, … Each term is the previous term plus 1. To count a set of n objects: match them one-to-one with 1, 2, 3, …, n; the last number n is the size of the set.

Three defining properties:
1. Starts at 1.
2. Each next number = previous number + 1 (no skips, no jumps).
3. No gaps: if 1 through 5 are all in the sequence, 6 is always next.

**P49 — ADAPTIVE CHECKPOINT:**
"What is the 4th number in the counting sequence? What comes immediately after 7?"

- CORRECT (4; 8): "Exactly — the sequence is 1, 2, 3, 4, … and after 7 always comes 8." → TA-A02
- PARTIAL (4th is 4 correct, but says 9 comes after 7): "After 7 is 7+1=8. The counting sequence steps by exactly 1 each time." → TA-A02
- INCORRECT (4th is 5, i.e., started counting from 0): "The counting sequence starts at 1, not 0. So the 4th term is the 4th step: 1st=1, 2nd=2, 3rd=3, 4th=4." → TA-B02
- NO_RESPONSE: "The counting sequence: 1, 2, 3, 4, 5, 6, 7, 8, … Every step adds 1. The 4th number is 4. After 7: 7+1=8." → TA-A02

---

### TA-A02 — Properties and Invariance
**Primitive sequence:** P04 → P49

**P04 — PATTERN INDUCTION:**
Study these counting demonstrations and identify what stays the same:

Example 1: Count 5 blocks left to right → 1, 2, 3, 4, 5. Total: 5.
Example 2: Count the same 5 blocks right to left → 1, 2, 3, 4, 5. Total: 5.
Example 3: Count 5 blocks by picking them up randomly one at a time → 1, 2, 3, 4, 5. Total: 5.

Example 4: Count the sequence 1, 3, 5, 7 — is this a counting sequence? No — step from 1 to 3 is +2, not +1. Gap at 2 and 4.
Example 5: Count the sequence 0, 1, 2, 3, 4 — is this a counting sequence for a set of 4 objects? No — it starts at 0. Total reported (4) is one less than the actual count (5 numbers labelled from 0 to 4 would mean 5 steps).

Pattern extraction questions:
1. What is always the same regardless of counting order? (The total count — the last number reached)
2. What happens if you skip a number? (The count is wrong — you undercount)
3. What happens if you start at 0? (Off-by-one error — last number is one less than actual count)

Conclusion: The counting sequence is rigid. Its three properties (start at 1, step by 1, no gaps) are not negotiable — each one exists to ensure the final number equals the true size of the set.

**P49 — ADAPTIVE CHECKPOINT:**
"Amy counts 6 beads starting from the left and gets a total of 6. Ben counts the same 6 beads starting from the right. What total does Ben get?"

- CORRECT (6): "Correct — the order of counting doesn't change the total. Same set of beads, same counting sequence applied, same result: 6." → TA-A03
- PARTIAL (says 6 but offers wrong reason — e.g., "because there are 6 beads"): "The reason is that the counting sequence assigns one unique number to each bead, and the last number is always the count — regardless of which bead gets label 1." → TA-A03
- INCORRECT (says a different number): "No matter which bead you label '1', the counting sequence 1, 2, 3, 4, 5, 6 has to be applied in order — 6 labels for 6 beads, last label always 6." → TA-B01
- NO_RESPONSE: "Both count the same 6 beads. The sequence 1, 2, 3, 4, 5, 6 is applied either direction. The last number is always 6." → TA-A03

---

### TA-A03 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 95% → PASS requires ⌈0.95 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: What number comes immediately after 9 in the counting sequence? [Answer: 10]
Item 2: Is 1, 2, 3, 5, 6 a valid counting sequence? Why or why not? [Answer: No — 4 is missing; a counting sequence has no gaps]
Item 3: True or False — if you count 8 objects starting from the 3rd object instead of the 1st, your total will be different. [Answer: FALSE — the total is always 8, regardless of starting object]
Item 4: What is the 7th number in the counting sequence? [Answer: 7]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — cross_links: []):**
A librarian counts the books on a shelf: "1, 2, 3, 4, 5, 6, 7, 8." The next day, books were rearranged. The librarian counts again and again reaches 8.

(a) Does the rearrangement change the count? [Answer: No — the set has the same 8 books]
(b) The librarian accidentally skips book number 5 while counting, saying "1, 2, 3, 4, 6, 7, 8, 9." What total does the librarian report? [Answer: 9 — one more than the true count]
(c) Why is this wrong, and how could the librarian catch the error? [Answer: Book 5 was counted twice (or skipped in labelling but the sequence kept going — the labelling gap at 5 means one book got no unique number, but then a 9th label was assigned incorrectly to the same 8 books). The librarian could verify by recounting or checking that the last number reached equals the known shelf capacity.]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (gap / order-dependence errors) or TA-B02 (zero-start errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Counting sequence: mastered. You understand that the sequence 1, 2, 3, … starts at 1, steps by 1 with no gaps, and produces the same total regardless of counting order. This is the foundation of all arithmetic and measurement of set size."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Sequence-Has-Gaps / Count-Order-Changes-Total
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two connected errors: SEQUENCE-HAS-GAPS (believing the counting sequence can skip numbers, e.g., 1, 2, 4, 5) and COUNT-ORDER-CHANGES-TOTAL (believing counting in a different order changes the result). Both break the bijection principle — each object must get exactly one unique number from an unbroken sequence."

**P41 — MISCONCEPTION DETECTOR:**
> "Try this: count 5 objects but skip 3: 1, 2, 4, 5, 6. You've labelled 5 objects with 6 labels — one label (3) was skipped, so object counted as '4' really is object number 3. The total reported is 6 instead of 5. A gap in the sequence ALWAYS produces an off-by-one error for every number after the gap."

**P64 — CONCEPTUAL SHIFT:**
> "The counting sequence has no options — it must be 1, 2, 3, 4, 5, … Each number is the ONLY correct label for its position. The total count is the LAST label used, and it equals the set size only when the sequence is unbroken. As for order of counting: which object gets label 1 vs. label 5 doesn't matter — what matters is that all objects get labels and no label is used twice."

→ TA-A02

---

### TA-B02 — Repair: Zero-Starts-Sequence
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error here is ZERO-STARTS-SEQUENCE. The counting sequence begins at 1, not 0. Starting at 0 produces an off-by-one error: 5 objects counted as 0, 1, 2, 3, 4 gives a final label of 4, which is one less than the true count of 5."

**P41 — MISCONCEPTION DETECTOR:**
> "Count 5 apples two ways. Way 1 (correct): 1, 2, 3, 4, 5 → total is 5. Way 2 (incorrect): 0, 1, 2, 3, 4 → total is 4. But you counted the same 5 apples! The 0 doesn't label an apple — it's a placeholder that doesn't correspond to any object. Every label must correspond to exactly one object."

**P64 — CONCEPTUAL SHIFT:**
> "The counting sequence is for THINGS that exist. There are no 'zero-th' things. The first object is object number 1. The sequence 1, 2, 3, … pairs each label with exactly one object. Starting from 0 means the label 0 is 'wasted' on nothing, so the final label is always one short."

→ TA-A01

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.arith.counting-sequence
  MAMR: 0.95
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "What comes after 12 in the counting sequence?"
  session_3_probe: "Is 1, 2, 3, 4, 6 a valid counting sequence? Explain."
  session_7_probe: "Keiko counts 7 coins starting from the leftmost coin. Priya counts the same 7 coins starting from the rightmost. Who gets a bigger total?"
  session_14_probe: "A teller counts banknotes: 1, 2, 3, 4, 5, 7, 8. What went wrong and what is the correct total?"
  session_30_probe: "Explain why the counting sequence must start at 1 and have no gaps. What goes wrong if either rule is violated?"
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.arith.counting — the counting process (saying numbers while touching objects) [BLUEPRINT EXISTS]

**Unlocks:**
- math.arith.place-value — place value requires understanding the sequence beyond 9

**Cross-links:** [] — no Tier 1 cross-links.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** P76 independence mode applied (cross_links empty).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** P11 (representation shift) must move through all three stages — concrete touch-and-count, pictorial number line with arrows, abstract sequence notation — before the formal properties are stated. Learners who jump to abstract notation without concrete grounding develop both MC-1 and MC-3.

**Invariance emphasis:** The fact that counting order doesn't change the total (MC-2) is non-obvious to young learners. Always demonstrate with the SAME set of objects counted in two different orders, both arriving at the same final number.

**Zero-starting:** MC-3 is especially common in learners who have prior programming experience. Explicitly distinguish: in computer science, arrays may be 0-indexed; in mathematics, counting a set of physical objects starts at 1.

**V-3 check (CPA_ENTRY=C for foundational difficulty):** TA-A01 opens with concrete touch-and-count of physical objects before transitioning to pictorial and abstract — V-3 satisfied.

**GR-10 — MAMR enforcement:** MAMR = 95%. A learner who scores 4/5 on the P91 gate does NOT receive mastery credit and routes to repair (TA-B01 or TA-B02), then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P11 (B-category primitive for foundational/remember)
- [x] GR-2: Each non-gate TA (A01, A02) contains P49
- [x] GR-3: TA-A03 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A03; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A03 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links = [] → P76 independence mode applied; probe uses library shelf context
- [x] GR-10: MAMR = 95% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.arith.counting-sequence)
- [x] V-2: difficulty=foundational, bloom=remember, h=4, thresh=0.95 match KG
- [x] V-3: CPA_ENTRY=C (foundational difficulty → concrete entry); TA-A01 opens with touch-and-count concrete stage
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P11 correctly anchors TA-A01 (representation shift from concrete to abstract)
- [x] V-6: bloom=remember → P07 not required; no P07 present
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.95 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items cover successor, gap detection, invariance, and position recall
- [x] V-13: P76 probe is genuine transfer (library shelf rearrangement + gap-counting error analysis)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain is lean for h=4 (2 main TAs + gate — within spec)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 check note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Three-stage CPA arc in P11 grounds the sequence concretely before formalisation ✓
- Robust: Lean TA chain matches h=4 scope; P91 gate enforces 95% threshold ✓

**STATUS: PACKAGE_READY**

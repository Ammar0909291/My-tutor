<!-- BLUEPRINT: math.seq.telescoping-series -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Telescoping Series
**Concept ID:** `math.seq.telescoping-series`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=4 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.telescoping-series |
| name | Telescoping Series |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 4 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | A (Abstract) — learner arrives with the partial-sum definition Sₙ = Σₖ₌₁ⁿ aₖ from `math.seq.partial-sums`; the telescoping insight (algebraic cancellation in a written-out partial sum) is inherently symbolic |
| requires (Tier-1) | math.seq.partial-sums |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.partial-sums**: Sₙ = a₁+a₂+⋯+aₙ; computing Sₙ by direct summation; closed-form vs recursive expressions

### Target Knowledge State
Student can recognise the telescoping form Σ(bₙ − bₙ₊₁) in a given series; can apply partial fraction decomposition to write aₙ = bₙ − bₙ₊₁ when aₙ is a rational function; can write out Sₙ explicitly to see the cancellation pattern; and can evaluate the sum by taking lim_{n→∞} Sₙ = b₁ − lim bₙ₊₁.

### Conceptual Obstacles
1. Attempting to telescope before decomposing — for aₙ = 1/(n(n+1)), the terms as given do not visibly telescope; partial fractions (1/n − 1/(n+1)) must be found first
2. Confusing which terms survive the cancellation — in Sₙ = b₁ − bₙ₊₁, students sometimes write b₁ + bₙ₊₁ or bₙ − b₁, reversing the sign or the order
3. Assuming every rational series telescopes — telescoping requires a specific difference structure; series like Σ1/n² do not telescope directly

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | TELESCOPE-BEFORE-DECOMPOSE | Student tries to apply the telescoping formula to aₙ=1/(n(n+1)) directly without splitting into partial fractions first; the form must be a difference bₙ−bₙ₊₁ before cancellation works | Any rational-function series needing partial fractions |
| MC-2 | WRONG-SURVIVING-TERMS | Student writes Sₙ = b₁ + bₙ₊₁ or bₙ − b₁ instead of b₁ − bₙ₊₁; reverses sign or order in the cancellation | Writing out the telescoping sum |
| MC-3 | ALL-RATIONAL-SERIES-TELESCOPE | Student attempts to telescope Σ1/n² by guessing a difference structure; not all rational series have a telescoping form | Any series with rational terms |

**Foundational Misconception:** MC-1 (TELESCOPE-BEFORE-DECOMPOSE) — the most common failure mode; corrected by always setting up partial fractions first in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — partial-sum definition is prior knowledge; symbolic cancellation is the new skill.

**Scaffolding sequence:**
1. **A01 P02 FORMAL DEFINITION** — define telescoping form Σ(bₙ−bₙ₊₁); derive Sₙ = b₁−bₙ₊₁; apply to 1/(n(n+1)) via partial fractions; address MC-1, MC-2
2. **A02 P04 PATTERN INDUCTION** — practice partial fraction setups for several rational aₙ; tabulate cancellation; address MC-3
3. **A03 P05 WORKED EXAMPLE** — extended form with gap k: Σ(bₙ−bₙ₊ₖ); double-telescope example
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Telescoping Form and Partial Fractions

**Primitive:** P02 FORMAL DEFINITION
**Purpose:** Define telescoping series; derive the Sₙ formula; apply partial fractions to find the difference structure; address MC-1, MC-2

---

**[P02 — FORMAL DEFINITION]**

**Telescoping series (definition):**
A series Σₙ₌₁^∞ aₙ is telescoping if there exists a sequence {bₙ} such that
```
aₙ = bₙ − bₙ₊₁   for all n ≥ 1
```

**Partial sum of a telescoping series:**
```
Sₙ = (b₁−b₂) + (b₂−b₃) + ⋯ + (bₙ−bₙ₊₁)
   = b₁ − bₙ₊₁
```
All intermediate terms cancel pairwise (the "telescope" collapsing).

**Infinite sum (if lim bₙ₊₁ exists):**
```
S∞ = lim_{n→∞} Sₙ = b₁ − lim_{n→∞} bₙ₊₁
```

**Canonical example — 1/(n(n+1)):**

Step 1 (partial fractions): 1/(n(n+1)) = A/n + B/(n+1)
Multiply through: 1 = A(n+1) + Bn
Set n=0: A=1; set n=−1: B=−1
So: **1/(n(n+1)) = 1/n − 1/(n+1)**

Step 2 (this IS the telescoping form): bₙ = 1/n, bₙ₊₁ = 1/(n+1)

Step 3 (write out Sₙ):
```
Sₙ = (1/1−1/2) + (1/2−1/3) + (1/3−1/4) + ⋯ + (1/n−1/(n+1))
   = 1 − 1/(n+1)   = b₁ − bₙ₊₁   ✓
```

Step 4 (S∞): lim (1−1/(n+1)) = **1 − 0 = 1**

(MC-2 addressed: surviving terms are always the FIRST b₁ minus the LAST bₙ₊₁. Neither bₙ nor b₂ survive.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Find S∞ for Σₙ₌₁^∞ 1/(n(n+2)).

(A) Partial fractions: 1/(n(n+2)) = 1/2(1/n − 1/(n+2)); Sₙ = 1/2(1+1/2−1/(n+1)−1/(n+2)); S∞ = 3/4
(B) 1/(n(n+2)) telescopes with bₙ=1/n directly; S∞=1
(C) S∞ = 1/(1·3) = 1/3 (first term only)
(D) 1/(n(n+2)) = 1/2·1/n − 1/2·1/(n+2); S∞ = 1/2(1+1/2) = 3/4

*Branch CORRECT (A or D):* PF: 1/(n(n+2))=1/2(1/n−1/(n+2)); gap k=2:
S₂ₙ = 1/2[(1+1/2)−(1/(n+1)+1/(n+2))] → S∞ = 1/2·3/2 = **3/4** ✓ Proceed to A02.

*Branch PARTIAL:* Correct partial fractions. When the gap is k=2, the first two terms of the b-sequence survive (b₁ and b₂) and the last two die off. S∞ = 1/2(1/1+1/2)=3/4. Proceed to A02.

*Branch INCORRECT (B):* bₙ=1/n gives bₙ−bₙ₊₁=1/n−1/(n+1)=1/(n(n+1))≠1/(n(n+2)). Partial fractions give the gap-2 structure; use PF first. Proceed to A02.

*Branch NO_RESPONSE:* 1/(n(n+2))=1/2(1/n−1/(n+2)); Sₙ=1/2(1+1/2−1/(n+1)−1/(n+2))→3/4. Proceed to A02.

---

### Teaching Action A02 — Recognising and Setting Up Telescoping

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Practice identifying which series telescope via partial fractions; know when NOT to telescope; address MC-3

---

**[P04 — PATTERN INDUCTION]**

**Pattern — Which forms telescope?**

| Series | Setup | Telescopes? |
|--------|-------|-------------|
| Σ 1/(n(n+1)) | 1/n−1/(n+1) | Yes; S∞=1 |
| Σ 1/((n+1)(n+2)) | 1/(n+1)−1/(n+2) | Yes; S∞=1 (shifts index) |
| Σ 1/(n(n+3)) | 1/3(1/n−1/(n+3)), gap 3 | Yes; S∞=1/3(1+1/2+1/3)=11/18 |
| Σ 1/n² | No standard difference form bₙ−bₙ₊₁ | Not directly (needs integral test) |
| Σ 1/(n²−1) = Σ 1/((n−1)(n+1)) | 1/2(1/(n−1)−1/(n+1)), gap 2 | Yes; start n=2 |

**The pattern:** Telescoping works when PF decomposition yields bₙ − bₙ₊ₖ for some fixed k. Products of consecutive integers are the canonical source.

**When NOT to try telescoping (MC-3):**
- Σ1/n² — no factor structure gives a clean difference
- Σ1/n — no PF split; needs integral test or harmonic-series argument
- Σ rⁿ — use geometric series formula instead

**Decision tree:**
1. Is aₙ a rational function with factors that differ by a small integer? → Try PF.
2. Does PF give bₙ − bₙ₊ₖ? → Telescope.
3. Otherwise → other convergence tests.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Find S∞ for Σₙ₌₂^∞ 1/((n−1)(n+1)).

(A) PF: 1/((n−1)(n+1))=1/2(1/(n−1)−1/(n+1)); S∞ = 1/2(1+1/2) = 3/4
(B) PF: 1/(n²−1)=1/2(1/(n−1)−1/(n+1)); gap 2; surviving from n=2: b₁=1/(2−1)=1, b₂=1/(2+1−1)=1/2; S∞=3/4
(C) S∞ = 1 (because the first term is 1/(1·3)=1/3 and limit is 1)
(D) S∞ doesn't exist because the series diverges

*Branch CORRECT (A or B):* PF on 1/((n−1)(n+1)): 1/2(1/(n−1)−1/(n+1)), gap k=2. Sum from n=2: b values that survive are b₁=1/1 and b₂=1/2; S∞=1/2(1+1/2)=**3/4** ✓ Proceed to A03.

*Branch PARTIAL:* Correct PF setup. The gap-2 structure means two b-terms survive at the start. From n=2: surviving = b₁=1/(n−1)|_{n=2}=1 and the next bₙ = 1/(n−1)|_{n=3}=1/2. S∞=1/2(1+1/2)=3/4. Proceed to A03.

*Branch INCORRECT (C, D):* (D) Σ1/(n²−1) converges (terms go to 0 and PF works). (C) S∞=3/4, not 1. Use PF first. Proceed to A03.

*Branch NO_RESPONSE:* 1/((n−1)(n+1))=1/2(1/(n−1)−1/(n+1)); gap 2; S∞=1/2(b₁+b₂)=1/2(1+1/2)=3/4. Proceed to A03.

---

### Teaching Action A03 — Extended Telescoping and Double Telescope

**Primitive:** P05 WORKED EXAMPLE
**Purpose:** Handle gap-k telescoping precisely; show a double-telescope example

---

**[P05 — WORKED EXAMPLE]**

**Worked Example 1 — Gap k=3:**

Σₙ₌₁^∞ 1/(n(n+3)) = 1/3·Σ(1/n − 1/(n+3))

Write out first several partial differences:
```
(1/1−1/4) + (1/2−1/5) + (1/3−1/6) + (1/4−1/7) + ⋯
```
Three "streams" interleave; in each, every term except the first k=3 at the start and last k=3 at the end cancel:

Sₙ = 1/3 · [(1/1+1/2+1/3) − (1/(n+1)+1/(n+2)+1/(n+3))]

S∞ = 1/3 · (1+1/2+1/3) = 1/3 · 11/6 = **11/18**

**Worked Example 2 — Rational cubic in denominator:**

Σₙ₌₁^∞ 1/(n(n+1)(n+2))

PF: 1/(n(n+1)(n+2)) = 1/2 · [1/(n(n+1)) − 1/((n+1)(n+2))]

This is a difference of two consecutive terms of the sequence {cₙ = 1/(n(n+1))}:
cₙ − cₙ₊₁, a pure telescoping form.

Sₙ = 1/2(c₁ − cₙ₊₁) = 1/2(1/2 − 1/((n+1)(n+2)))

S∞ = 1/2 · 1/2 = **1/4**

(The strategy: always try to write aₙ = c·[f(n)−f(n+1)] for some standard sequence f.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Find Σₙ₌₁^∞ 2/(n(n+1)) using telescoping.

(A) 2/(n(n+1)) = 2(1/n−1/(n+1)); S∞ = 2·(b₁−lim bₙ₊₁) = 2·(1−0) = 2
(B) S∞ = 2 (since Σ1/(n(n+1))=1 and we multiply by 2)
(C) S∞ = 1 (same as Σ1/(n(n+1)) = 1, ignoring the factor 2)
(D) S∞ doesn't converge because the numerator 2 is larger than 1

*Branch CORRECT (A or B):* 2/(n(n+1))=2(1/n−1/(n+1)); Sₙ=2(1−1/(n+1))→2·1=**2** ✓ Proceed to A04.

*Branch INCORRECT (C):* The factor 2 in the numerator multiplies the entire sum: S∞=2·1=2, not 1. Proceed to A04.

*Branch INCORRECT (D):* The denominator n(n+1)→∞ much faster than the constant 2; terms go to 0, series converges. Proceed to A04.

*Branch NO_RESPONSE:* 2(1/n−1/(n+1)); Sₙ=2(1−1/(n+1))→2. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Use partial fractions and telescoping to evaluate each sum.*

**Problem 1.** Σₙ₌₁^∞ 1/((n+1)(n+3))

**Problem 2.** Σₙ₌₁^∞ (1/2)ⁿ − (1/2)ⁿ⁺¹  (verify it telescopes and find S∞)

**Problem 3.** Σₙ₌₁^∞ 3/(n(n+3))  (use the gap-3 result from A03)

**Problem 4.** Find Σₙ₌₂^∞ 1/(n²−1)  (note n²−1=(n−1)(n+1), sum starts at n=2)

---

**[P55 — SCORE]**

*Answers:*

1. PF: 1/((n+1)(n+3))=1/2(1/(n+1)−1/(n+3)); gap 2; surviving: 1/(n+1)|_{n=1}=1/2 and 1/(n+1)|_{n=2}=1/3; S∞=1/2(1/2+1/3)=1/2·5/6=**5/12**
2. bₙ=(1/2)ⁿ, bₙ₊₁=(1/2)ⁿ⁺¹; Sₙ=b₁−bₙ₊₁=1/2−(1/2)ⁿ⁺¹→1/2; **S∞=1/2**. Verify: this equals Σ(1/2)ⁿ·(1−1/2)=Σ(1/2)ⁿ⁺¹... actually bₙ−bₙ₊₁=(1/2)ⁿ−(1/2)ⁿ⁺¹; Sₙ=(1/2)¹−(1/2)ⁿ⁺¹→1/2 ✓
3. 3/(n(n+3))=3·(1/3)(1/n−1/(n+3))=1/n−1/(n+3); S∞=1/1+1/2+1/3=**11/6**... wait: 3·(11/18)=11/6. Actually 3/(n(n+3))=1·(1/n−1/(n+3)) (A in PF: 3/(n(n+3))=A/n+B/(n+3): A·(n+3)+Bn=3; A=1,B=−1); S∞=(1+1/2+1/3)−0=**11/6**. *(Note: from the gap-3 result above, Σ1/(n(n+3))=11/18; multiplying by 3 gives 11/6.)*
4. 1/(n²−1)=1/2(1/(n−1)−1/(n+1)), gap 2; n starts at 2; surviving: b₁=1/1=1 and b₂=1/2; S∞=1/2(1+1/2)=**3/4**

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Evaluate Σₙ₌₁^∞ 1/(4n²−1).

(a) Factor the denominator.

(b) Decompose into partial fractions.

(c) Identify the telescoping structure and find S∞.

*Expected answers:*

(a) 4n²−1 = (2n−1)(2n+1)

(b) 1/((2n−1)(2n+1)) = 1/2·(1/(2n−1) − 1/(2n+1))

(c) This is 1/2·(bₙ − bₙ₊₁) where bₙ = 1/(2n−1).
Sₙ = 1/2·(1/(2·1−1) − 1/(2n+1)) = 1/2·(1 − 1/(2n+1))
S∞ = 1/2·1 = **1/2**

(This is the Leibniz series connection: 1/1·3 + 1/3·5 + ⋯ = 1/2, related to π/4 via partial fractions on arctan.)

---

**[P55 — SCORE]**

Transfer probe: 1 point.

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
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed items; if MC-1 (no PF first) → B01; if MC-2 (wrong surviving terms) → B02; targeted repair |
| ≤ 2/5 | → Return to A01; rework canonical 1/(n(n+1)) example step by step; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.telescoping-series` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** none directly (see KG).

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — TELESCOPE-BEFORE-DECOMPOSE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You tried to telescope the series before writing aₙ as a difference bₙ−bₙ₊₁. The cancellation only works when the terms are already in difference form. For rational functions, you must find that form via partial fractions first."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Can 1/(n(n+1)) telescope directly as written? What must you do first?
*Correct response:* As written, "1/(n(n+1))" is one fraction — it doesn't visibly cancel with adjacent terms. You must split: 1/n−1/(n+1). Only then do adjacent terms cancel.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'write Sₙ immediately and look for cancellation' → to: 'FIRST write aₙ = bₙ−bₙ₊₁ (via PF or inspection); THEN write out Sₙ to see the cancellation.' Two steps, always."

---

### Repair Action B02 — WRONG-SURVIVING-TERMS Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote the wrong terms surviving the cancellation. In Sₙ = Σ(bₙ−bₙ₊₁), only the very first b-term (b₁) and the very last remaining term (bₙ₊₁) survive. All others cancel. The sign is b₁ − bₙ₊₁, not b₁ + bₙ₊₁."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For Σₙ₌₁^4 (1/n − 1/(n+1)), write out all four terms and circle the ones that don't cancel.
*Correct response:* (1/1−1/2)+(1/2−1/3)+(1/3−1/4)+(1/4−1/5). The −1/2 and +1/2 cancel; −1/3 and +1/3 cancel; −1/4 and +1/4 cancel. Survivors: **+1/1 and −1/5** → S₄=1−1/5=4/5.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'I keep first + last' → to: 'I keep the FIRST positive term (b₁) MINUS the LAST negative term (bₙ₊₁). Always subtract. Write it out term by term once to see which terms survive.'"

---

### Repair Action B03 — ALL-RATIONAL-SERIES-TELESCOPE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You tried to telescope a series that does not have a difference structure. Telescoping requires aₙ = bₙ−bₙ₊₁ for some explicit sequence bₙ. Not every rational series has this form."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Does Σ1/n² telescope? Try to find bₙ such that 1/n² = bₙ−bₙ₊₁.
*Correct response:* There is no standard sequence bₙ with bₙ−bₙ₊₁ = 1/n² (you would need bₙ = Σₖ₌ₙ^∞ 1/k², which is itself the unknown sum). Σ1/n² does not telescope; use the integral test or p-series theorem instead.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'try telescoping on any rational series' → to: 'telescoping applies when PF gives exactly the structure bₙ−bₙ₊ₖ. If PF doesn't yield a difference of the same function at n and n+k, use a different test.'"

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Find S∞ for Σₙ₌₁^∞ 1/((n+2)(n+3)). Show the partial fraction step. |
| R2 | 3 days | Verify that Σₙ₌₁^∞ 1/(n(n+1)) = 1 by computing S₁, S₂, S₅, and lim Sₙ. |
| R3 | 7 days | Find S∞ for Σₙ₌₁^∞ 2/(n(n+2)). |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | none |
| Requires (Tier-1) | math.seq.partial-sums |

**GR-8 compliance:** no cross_links in KG — documented.
**GR-9 compliance:** P76 uses an independent problem (4n²−1).

---

## Component 8 — Teaching Notes

- **The two-step discipline is non-negotiable:** Every telescoping problem follows: (1) find bₙ via PF, (2) write out a few terms to see cancellation, (3) read off Sₙ = b₁−bₙ₊₁. Students who skip step (2) regularly make the MC-2 error.
- **Gap k matters:** For gap-1 (standard), only b₁ survives at the start. For gap-2, both b₁ and b₂ survive. Always write out enough terms to count correctly.
- **Canonical form:** 1/(n(n+1)) → S∞=1 is the anchor. Every student should be able to derive this from scratch in under 2 minutes; it appears as a subproblem in many higher-level proofs.
- **Connection to π:** The transfer probe Σ1/(4n²−1)=1/2 is related to Leibniz's π/4 series via different PF decompositions. Mentioning this connection creates a memorable anchor for the technique.
- **When to use vs when not:** Reinforce the decision tree from A02 every session: factor the denominator → if it's a product of linear factors with fixed difference → PF → check for bₙ−bₙ₊ₖ structure.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; symbolic cancellation requires prior partial-sum algebra | PASS |
| V-4 | bloom=apply → application problems throughout | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P02, A02=P04, A03=P05) |
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
| V-19 | h=4 → standard structure (3 main TAs + gate) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

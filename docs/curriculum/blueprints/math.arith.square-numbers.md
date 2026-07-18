<!-- BLUEPRINT: math.arith.square-numbers -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Perfect Squares
**Concept ID:** `math.arith.square-numbers`
**KG Fields:** difficulty=developing | bloom=remember | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.arith.square-numbers |
| name | Perfect Squares |
| difficulty | developing |
| bloom | remember |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.arith.exponentiation |
| cross_links | math.geom.area (Tier 1) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.arith.exponentiation**: $n^2=n\times n$ (repeated multiplication) — this concept studies the specific integers PRODUCED by squaring, not the operation itself, already known

### Target Knowledge State
Student can list and recognize perfect squares ($1,4,9,16,25,36,49,64,81,100,\ldots$) and correctly compute $n^2$ as $n\times n$ (never $2n$); correctly recognize that squaring a NEGATIVE integer produces a POSITIVE perfect square ($(-n)^2=n^2$, not a negative value); and correctly verify whether a number IS a perfect square by actually checking for a whole-number square root, rather than guessing from surface features like its last digit.

### Conceptual Obstacles
1. Confusing "squaring" with "doubling" — computing $n^2$ as $2n$ (adding $n$ to itself) rather than $n\times n$ (multiplying $n$ by itself); the two operations coincide only at $n=2$ ($2^2=4=2\times2$), which can reinforce the confusion if that's the first example seen
2. Believing that squaring a negative integer produces a negative result — $(-5)^2$ might be computed as $-25$ rather than the correct $25$; squaring ALWAYS produces a non-negative result, regardless of the original number's sign
3. Judging whether a number is a perfect square from surface features (like its last digit) rather than actually checking for an integer square root — perfect squares' last digits ARE restricted (only 0,1,4,5,6,9 ever appear), but having one of those last digits is NECESSARY, not SUFFICIENT, for being a perfect square (e.g. 15 ends in 5 but is not a perfect square)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SQUARING-MEANS-DOUBLING | Student computes $n^2$ as $2n$ (doubling) rather than $n\times n$ (multiplying by itself) | Any squaring computation for $n\ne2$, where doubling and squaring give different answers |
| MC-2 | NEGATIVE-SQUARED-IS-NEGATIVE | Student computes $(-n)^2$ as a negative number, rather than recognizing squaring a negative always yields a positive result | Any squaring of a negative integer |
| MC-3 | LAST-DIGIT-DECIDES-PERFECT-SQUARE | Student judges a number to be a perfect square based solely on its last digit matching a common perfect-square ending (0,1,4,5,6,9), without verifying an actual integer square root exists | Any non-square number whose last digit happens to match a perfect square's typical ending, e.g. 15, 26, 40 |

**Foundational Misconception:** MC-1 (SQUARING-MEANS-DOUBLING) — it is the most common and earliest-forming error in this concept, since "squaring" and "doubling" are both simple one-step operations that beginning students can conflate, and the confusion is silently reinforced by $2^2=4=2\times2$ (the one case where both operations happen to agree), making the error invisible until a DIFFERENT number is tried.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner builds the list of perfect squares by direct repeated multiplication, deliberately checking $n=2$ against a DIFFERENT value to break the doubling/squaring coincidence, before any shortcut is introduced.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: building $1^2,2^2,3^2,\ldots$ by direct multiplication, explicitly contrasting $3^2$ against $2\times3$; P: a growing square-grid picture (geometric area) for perfect squares; A: the formal definition and negative-integer squaring rule
2. **A02 P06 CONTRAST PAIR** — squaring vs. doubling on a value where they clearly differ (MC-1); a negative integer squared, shown positive (MC-2); a last-digit-matching non-square vs. a genuine perfect square (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Building the List by Direct Multiplication

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build perfect squares via genuine repeated multiplication, deliberately breaking the doubling/squaring coincidence at n=2; connect to geometric area; state the formal rules

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (building the list, with an explicit doubling-vs-squaring check):**

$1^2=1\times1=1$; $2^2=2\times2=4$; $3^2=3\times3=9$; $4^2=4\times4=16$; $5^2=5\times5=25$.

**Explicit check at $n=3$:** doubling gives $2\times3=6$; squaring gives $3\times3=9$ — **these are DIFFERENT** ($6\ne9$). (At $n=2$ specifically, doubling gives $2\times2=4$ and squaring ALSO gives $2\times2=4$ — the SAME number, purely because $2+2=2\times2$ is a coincidence unique to the number 2; this must not be mistaken for a general pattern.)

**Stage P — Pictorial (perfect squares as literal square areas):**

```
   1²=1        2²=4         3²=9          4²=16
   ■           ■■           ■■■           ■■■■
               ■■           ■■■           ■■■■
                            ■■■           ■■■■
                                          ■■■■
   (an n×n grid of unit squares has AREA n², connecting
    directly to math.geom.area — squaring genuinely means
    "side length n, multiplied by itself," not "doubled")
```

**Stage A — Abstract (formal list and negative-integer rule):**

**Perfect squares:** $\{n^2 : n\in\mathbb Z^+\} = \{1,4,9,16,25,36,49,64,81,100,121,144,\ldots\}$.

**Negative integers squared:** $(-n)^2 = (-n)\times(-n) = n^2$ (a NEGATIVE times a NEGATIVE gives a POSITIVE) — e.g. $(-4)^2=16$, the SAME perfect square as $4^2=16$. Every perfect square in the list above is reached by squaring EITHER a positive OR the corresponding negative integer.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compute $6^2$ using direct multiplication (not doubling), and state what $2\times6$ gives for contrast.

**CORRECT:** $6^2=6\times6=36$. For contrast, $2\times6=12$ — a completely different, much smaller number. $36\ne12$.
→ "Correct — this large a gap between the two operations (36 vs. 12) makes it clear squaring and doubling are genuinely different procedures." → Proceed to A02.

**PARTIAL:** Student computes $6^2$ correctly as 36 but is unsure why anyone would confuse it with doubling, missing the point of the contrast.
→ "The value of checking this: at $n=2$ specifically, $2^2=4$ and $2\times2=4$ happen to match, purely by coincidence (2+2=2×2 is a special fact only true for the number 2). If someone's very first example of squaring were $n=2$, they might wrongly conclude 'squaring means doubling' — checking a DIFFERENT number (like 6, where 36≠12) is exactly how to catch and correct that mistaken generalization."

**INCORRECT:** Student computes $6^2$ as $12$ (doubling instead of squaring) (MC-1).
→ "$6^2$ means $6\times6$ (six multiplied by itself), not $2\times6$ (six doubled). $6\times6=36$, not 12. These are different operations that happen to only agree at $n=2$ ($2\times2=2+2=4$) — for every other number, squaring and doubling give different results, and 36 (not 12) is the correct value of $6^2$."

**NO_RESPONSE:** → "$6^2=6\times6=36$. For contrast, $2\times6=12$ (doubling) — a different, smaller number, confirming squaring and doubling are not the same operation."

---

### Teaching Action A02 — Positive Result from Negatives; Verify, Don't Guess from Digits

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-2 with a negative-integer squaring example; break MC-3 with a last-digit-matching non-square contrasted against a genuine perfect square

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — $(-7)^2$ vs. a naive negative guess (MC-2):**

**Naive (wrong) computation:** "$(-7)^2 = -49$" (assuming the negative sign carries through). **Correct computation:** $(-7)^2 = (-7)\times(-7)$. A negative times a negative gives a POSITIVE: $(-7)\times(-7)=49$. **$(-7)^2=49$, the SAME positive perfect square as $7^2=49$** — squaring a negative integer always erases the negative sign, producing the identical positive perfect square as its positive counterpart.

**Contrast 2 — A last-digit match that is NOT a perfect square, vs. a genuine one (MC-3):**

$15$ ends in 5 (a digit that DOES appear in some perfect squares, like $25=5^2$ and $225=15^2$... wait, check $15$ itself directly): is $15$ itself a perfect square? Check: $3^2=9$, $4^2=16$ — $15$ falls strictly BETWEEN these two consecutive perfect squares, so **$15$ is NOT a perfect square**, despite ending in 5 (a digit that IS common among perfect squares like 25, 225, 625). Compare: $25$ also ends in 5, and IS a perfect square ($5^2=25$). **Ending in a "perfect-square-typical" digit is NEVER enough on its own** — the only reliable test is checking whether an actual integer, when squared, produces exactly that number (here, no integer between 3 and 4 exists, so 15 fails, while $5^2$ exactly hits 25).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Compute $(-9)^2$. (b) Is $40$ a perfect square? Justify by checking against consecutive integer squares (hint: $6^2=36$, $7^2=49$).

**CORRECT:** (a) $(-9)^2=(-9)\times(-9)=81$ (positive, matching $9^2=81$). (b) $40$ falls between $6^2=36$ and $7^2=49$ — no integer squares to exactly 40, so **NOT a perfect square** (despite ending in 0, a digit that IS common among perfect squares like 100, 400).
→ "Correct — (b) directly applies the 'falls between consecutive squares' verification method, the reliable alternative to guessing from the last digit." → Proceed to A03.

**PARTIAL:** Student gets (a) but in (b) says "not a perfect square, since 40 doesn't look like one," without checking against consecutive squares explicitly.
→ "A stronger justification: locate 40 between consecutive perfect squares. $6^2=36$ and $7^2=49$ — since $36<40<49$ and 40 isn't exactly either one, no integer squared gives exactly 40, confirming it's not a perfect square. This 'bracket between consecutive squares' check is reliable and repeatable, unlike a vague 'doesn't look like one' judgment."

**INCORRECT:** Student answers (a) "$-81$" (MC-2) and/or (b) "yes, since it ends in 0 like other perfect squares" (MC-3).
→ "(a) $(-9)\times(-9)$: a negative times a negative is POSITIVE, giving 81, not $-81$. (b) Ending in 0 is necessary for SOME perfect squares (like 100, 400) but far from sufficient — checking directly: $40$ sits strictly between $6^2=36$ and $7^2=49$, with no integer landing exactly on 40, so it is NOT a perfect square despite the matching last digit."

**NO_RESPONSE:** → "(a) $(-9)^2=81$ (positive). (b) Not a perfect square — 40 is between $6^2=36$ and $7^2=49$, with no integer squaring to exactly 40."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct squaring computation, sign handling, and verification-based perfect-square recognition under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Compute $8^2$ (not $2\times8$).

*Solution:* $8\times8=64$.

**Problem 2:** Compute $(-6)^2$.

*Solution:* $(-6)\times(-6)=36$ (positive).

**Problem 3:** Is $50$ a perfect square? Justify using consecutive integer squares.

*Solution:* $7^2=49$, $8^2=64$ — 50 falls strictly between them, not equal to either. NOT a perfect square.

**Problem 4:** True or false: "Since 121 ends in 1, and many perfect squares end in 1, 121 must be a perfect square." Evaluate the REASONING (not just the conclusion).

*Solution:* The conclusion happens to be true ($121=11^2$), but the REASONING is invalid as stated — ending in 1 is necessary for some perfect squares but not sufficient (e.g. 31 also ends in 1 but is not a perfect square). The correct justification requires checking directly: $11^2=121$ exactly, confirming it, independent of the last-digit observation.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.geom.area)*

**Prompt:** A gardener wants to build a square vegetable patch. Recall from math.geom.area that the area of a square with side length $s$ is $s^2$.

(a) The gardener wants the patch's area to be exactly 144 square feet. Using the perfect-square list, determine the exact side length $s$ (a whole number of feet), and verify by computing $s^2$ directly.
(b) A second gardener wants a patch with area exactly 150 square feet. Using the "falls between consecutive squares" technique, explain why NO whole-number side length gives exactly 150 square feet, and state the two whole-number side lengths that come closest (just under and just over).
(c) A student argues: "For part (b), since 150 is close to 144=12², we could just say the side length is approximately 12 feet and call it a perfect square for practical gardening purposes." Evaluate this claim, distinguishing between a PRACTICAL/approximate answer (which might be reasonable for gardening) and the MATHEMATICAL fact about whether 150 is a genuine perfect square.

**Expected solution:**

(a) From the perfect-square list, $144=12^2$ (locate it: $12\times12=144$). Verify directly: $12\times12=144$ ✓. Side length: **12 feet**.

(b) Check consecutive squares: $12^2=144$, $13^2=169$. Since $144<150<169$, and 150 doesn't exactly equal either, NO whole-number side length produces exactly 150 square feet — the closest whole-number side lengths are 12 feet (area 144, just under) and 13 feet (area 169, just over).

(c) The claim conflates two genuinely different things. MATHEMATICALLY, 150 is definitively NOT a perfect square — this is a precise, verifiable fact (no integer squares to exactly 150), and no amount of "closeness" to 144 changes that. PRACTICALLY, for an actual gardening project, using a side length of "approximately 12 feet" (accepting an area close to but not exactly 150) might be a perfectly reasonable real-world simplification — but this is a PRACTICAL COMPROMISE, not a mathematical reclassification of 150 as a perfect square. The two questions ("is 150 a perfect square?" and "is 12 feet a good-enough approximate side length for a 150-square-foot patch?") have different, independent answers, and conflating them (treating "close enough for gardening" as making 150 "basically" a perfect square) is exactly the kind of last-digit/approximation-based reasoning this concept warns against — verification (checking against exact consecutive squares) is the only way to settle the mathematical question, regardless of what practical accommodations are separately reasonable.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.9 × 5⌉ = ⌈4.5⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.arith.square-roots; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.arith.square-numbers assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SQUARING-MEANS-DOUBLING (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Computing n² as 2n is SQUARING-MEANS-DOUBLING. Squaring means multiplying a number BY ITSELF (n×n), not adding it to itself (2n) — these only coincidentally agree at n=2."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is 5²?"
- MC-1 response: "10" (doubling 5).

**[P64 — CONCEPTUAL SHIFT]**
"$5^2$ means $5\times5$, not $2\times5$. Compute directly: $5\times5=25$, not 10. Check at $n=2$ why the confusion might arise: $2^2=2\times2=4$ AND $2\times2=4$ (doubling) also give 4 — purely because $2+2=2\times2$ happens to be true only for the number 2. For every other number (like 5), squaring and doubling give clearly different results (25 vs. 10)."

Practice: Compute both 4² and 2×4, confirming they give different values (16 vs. 8).

---

### Repair Action B02 — NEGATIVE-SQUARED-IS-NEGATIVE (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Computing (-n)² as negative is NEGATIVE-SQUARED-IS-NEGATIVE. A negative number times a negative number is always POSITIVE — squaring a negative integer gives the same positive perfect square as its positive counterpart."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is (-8)²?"
- MC-2 response: "-64."

**[P64 — CONCEPTUAL SHIFT]**
"$(-8)^2=(-8)\times(-8)$. Recall the sign rule: negative times negative equals positive. So $(-8)\times(-8)=64$, the SAME positive perfect square as $8^2=64$ — never $-64$. Squaring ALWAYS produces a non-negative result, for any real number, positive or negative."

Practice: Compute (-3)² and 3² side by side, confirming they give the identical positive value.

---

### Repair Action B03 — LAST-DIGIT-DECIDES-PERFECT-SQUARE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Judging a number is a perfect square from its last digit alone is LAST-DIGIT-DECIDES-PERFECT-SQUARE. A matching last digit is necessary for SOME perfect squares but never sufficient on its own — only checking against actual consecutive integer squares reliably verifies it."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "26 ends in 6, like 16=4² and 36=6². Is 26 a perfect square?"
- MC-3 response: "Yes, since it ends in a digit common to perfect squares."

**[P64 — CONCEPTUAL SHIFT]**
"Check directly against consecutive squares: $5^2=25$, $6^2=36$ — 26 falls strictly between them, matching neither exactly. NOT a perfect square, despite the matching last digit. The last-digit pattern only narrows down CANDIDATES (rules out numbers ending in 2,3,7,8, which can never be perfect squares) — it never confirms one; direct verification against the actual list of squares is the only reliable test."

Practice: Check whether 65 (ending in 5, like 25 and 225) is a perfect square, using consecutive squares (8²=64, 9²=81) to verify.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute a fresh squaring problem, explicitly contrasting it against doubling the same number |
| SR-2 | +3 days | Compute a fresh negative integer's square, confirming a positive result |
| SR-3 | +7 days | Verify whether a fresh number is a perfect square using the consecutive-squares bracket method |
| SR-4 | +14 days | Reconstruct the gardening transfer probe's practical-vs-mathematical distinction for a fresh non-square target area |

Retrieval flag: if student doubles instead of squaring (MC-1) or reports a negative result for a squared negative (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.arith.exponentiation | Supplies the $n^2$ notation and repeated-multiplication meaning this concept studies the integer outputs of |
| Unlocks | math.arith.square-roots | The inverse operation (finding $n$ given $n^2$) builds directly on the perfect-square list established here |

**GR-9:** cross_links include math.geom.area (Tier 1) → P76_mode = cross-link probe (probe applies the perfect-square list and verification method to a concrete square-garden area problem, distinguishing mathematical exactness from practical approximation).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching the concept's small time allocation and recall-focused (bloom=remember) scope
- bloom=remember → checkpoints emphasize direct recall/computation of the perfect-square list and squaring procedure, not derivations
- CPA_entry = C for a developing learner: direct repeated multiplication (with an explicit doubling-vs-squaring check at a non-coincidental value) anchors squaring as genuine self-multiplication before any shortcut or pattern-based recognition is introduced

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception specifically because of the $n=2$ coincidence ($2\times2=2+2$) — if a student's very first exposure to squaring happens to use $n=2$ as the example, doubling and squaring are indistinguishable, and the misconception can persist silently until a different number exposes it. A01 is deliberately built around $n=3$ (not $n=2$) as the illustrative contrast specifically to break this coincidence immediately.

**MC-3 and the necessary-vs-sufficient distinction:** MC-3 is a genuine logical error (mistaking a necessary condition — matching last digit — for a sufficient one) rather than a computational slip, and B03's repair explicitly names this distinction ("necessary for SOME, never sufficient") so the lesson generalizes beyond just perfect squares to the broader habit of not confusing "consistent with" and "proves."

**Sequencing note (cross-link):** math.geom.area (Tier 1, already authored) is a genuine, actionable cross-link — the P76 transfer probe grounds the perfect-square verification method in a concrete square-garden scenario, and its part (c) explicitly separates the mathematical fact (is a number a perfect square) from a practical approximation question (is a close side-length good enough for gardening), reinforcing that verification-based reasoning applies to the mathematical question specifically.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.arith.square-numbers ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.arith.exponentiation ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=remember → recall/computation tasks | Direct squaring and list-recall tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | math.geom.area is Tier 1 → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Square garden area scenario; mathematical-vs-practical distinction ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

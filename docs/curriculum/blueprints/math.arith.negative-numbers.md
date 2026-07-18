<!-- BLUEPRINT: math.arith.negative-numbers -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Negative Numbers
**Concept ID:** `math.arith.negative-numbers`
**KG Fields:** difficulty=developing | bloom=understand | estimated_hours=8 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.arith.negative-numbers |
| name | Negative Numbers |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 8 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.arith.subtraction, math.found.integers |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.arith.subtraction**: $a-b$ — this concept extends subtraction to allow the result (and the numbers involved) to go below zero, and studies what happens when a NEGATIVE number is itself subtracted
- **math.found.integers**: $\mathbb Z=\{\ldots,-2,-1,0,1,2,\ldots\}$ — the set this concept's arithmetic operates within, including the additive-inverse structure

### Target Knowledge State
Student can correctly compute $a-(-b)$ as $a+b$ (subtracting a negative flips to addition), never leaving it as $a-b$; correctly apply the sign rule for multiplication — a negative times a negative gives a POSITIVE result, not a negative one; and correctly recognize that the symbol $-x$ does not always represent a negative number — it represents the ADDITIVE INVERSE of $x$, which is positive whenever $x$ itself is negative.

### Conceptual Obstacles
1. Treating "subtracting a negative" as equivalent to ordinary subtraction — computing $7-(-3)$ as $7-3=4$ rather than the correct $7+3=10$; the two negative signs (the subtraction operator and the negative number's own sign) combine to flip the operation to addition, a step easy to skip when the two minus signs are read as simply "cancelling to nothing in particular" rather than specifically producing a plus
2. Believing a negative times a negative gives a negative result — computing $(-4)\times(-5)$ as $-20$ rather than the correct $+20$; the sign rule (negative × negative = positive) is a genuine rule requiring memorization/justification, not something that follows automatically from "two negatives feel like more negativity"
3. Assuming the notation $-x$ always denotes a negative number — if $x$ itself is already negative (e.g. $x=-7$), then $-x=-(-7)=7$, a POSITIVE number; $-x$ correctly denotes "the additive inverse of $x$" (whatever sign that turns out to have), not "a negative number" as a blanket rule

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DOUBLE-NEGATIVE-STAYS-NEGATIVE | Student computes $a-(-b)$ as $a-b$, failing to flip the operation to addition | Any expression subtracting a negative number |
| MC-2 | NEGATIVE-TIMES-NEGATIVE-IS-NEGATIVE | Student computes a product of two negative numbers as negative, rather than positive | Any multiplication of two negative factors |
| MC-3 | MINUS-X-IS-ALWAYS-NEGATIVE | Student assumes $-x$ always represents a negative number, missing that $-x$ is positive whenever $x$ itself is negative | Any expression $-x$ where $x$ is given as (or turns out to be) a negative value |

**Foundational Misconception:** MC-1 (DOUBLE-NEGATIVE-STAYS-NEGATIVE) — subtracting a negative number is the single most common sign-arithmetic error, because it requires correctly combining TWO separate negative signals (the subtraction operator itself, and the number's own negative sign) into a single flip to addition, and a student who processes these signs sequentially rather than combining them correctly will systematically under-compute by exactly $2b$ every time; this error directly compounds with MC-2 (both involve correctly tracking how negative signs combine under an operation) and sets up MC-3's deeper confusion about what "$-x$" fundamentally means.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner computes $a-(-b)$ using a number-line "turn around and step backward" model before the formal rule is stated, then verifies the multiplication sign rule via a repeated-addition pattern.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: $7-(-3)$ modeled on the number line (subtracting a negative = moving in the OPPOSITE direction, i.e. forward); P: a number-line "turn around" picture; A: the formal rule ($a-(-b)=a+b$) and the multiplication sign-rule table
2. **A02 P06 CONTRAST PAIR** — subtracting a negative vs. subtracting a positive, contrasted directly (MC-1); a negative-times-negative computed via a repeated-addition pattern proving the sign (MC-2); $-x$ evaluated for both a positive AND a negative $x$, showing the sign flips (MC-3)
3. **A03 P28 CONFLICT EVIDENCE** — a composite expression combining subtraction-of-negatives, multiplication of negatives, and a $-x$ evaluation together
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Subtracting a Negative Turns You Around

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground "subtract a negative = add" in a number-line turn-around model; state the formal rule and the multiplication sign-rule table

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (the number line, "turn around" model for $7-(-3)$):**

Ordinary subtraction $7-3$: start at 7, FACE the negative direction (left), step forward 3 times: land at 4.

Subtracting a NEGATIVE, $7-(-3)$: start at 7, face the negative direction (left, as subtraction always initially indicates) — but then the number being subtracted is ITSELF negative, which means "turn around" (face the opposite direction, now facing right/positive), and step forward 3 times FROM THAT NEW FACING: land at $7+3=10$.

**Stage P — Pictorial (the turn-around rule):**

```
   7 − 3:   at 7, face left (subtraction), step 3 → land at 4
   ●───────────────────●
   0                   7  4

   7 − (−3): at 7, face left (subtraction), but the number
             itself is NEGATIVE → TURN AROUND (now facing
             right), step 3 → land at 10
   ●───────────────────●──────●
   0                   7      10
```

**Stage A — Abstract (the formal rule and multiplication sign table):**

**Subtracting a negative:** $a-(-b) = a+b$ — the two negative signs (subtraction, and the number's own sign) combine to flip the operation entirely to addition.

**Multiplication sign rule:**

| | × positive | × negative |
|---|---|---|
| **positive ×** | positive | negative |
| **negative ×** | negative | **positive** |

Two negatives multiplied give a POSITIVE result: $(-a)\times(-b)=ab$ (positive), exactly mirroring how two negative SIGNS in the subtraction rule above combined to flip to addition — both rules share the underlying pattern "two negatives combine to cancel out."

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compute $12-(-5)$ using the turn-around model, and verify using the formal rule.

**CORRECT:** Turn-around: at 12, face left (subtraction), but the number (−5) is negative, so turn around (face right), step 5: land at 17. Formal rule: $12-(-5)=12+5=17$.
→ "Correct — both methods agree, confirming subtracting a negative genuinely means adding." → Proceed to A02.

**PARTIAL:** Student computes $12-(-5)$ as $12-5=7$ but recognizes something feels off when double-checking with the turn-around model.
→ "Walk through the turn-around model explicitly: subtraction normally means 'face left, step forward.' But here the number being subtracted, $-5$, is ITSELF negative — this negative sign on the number triggers a 'turn around,' so you end up facing RIGHT instead, and step 5 in that direction from 12, landing at 17, not 7. The two negative signals (subtraction + negative number) combine to flip the direction entirely, exactly matching the algebraic rule $12-(-5)=12+5=17$."

**INCORRECT:** Student computes $12-(-5)=12-5=7$ (MC-1).
→ "This treats subtracting -5 the same as subtracting +5, but they're different: subtracting a POSITIVE number moves you further in the negative direction (left); subtracting a NEGATIVE number flips that, moving you in the positive direction (right) instead. $12-(-5)=12+5=17$, not 7 — the double negative (subtraction AND the number's own sign) combines into a plus."

**NO_RESPONSE:** → "12-(-5): the negative sign on 5 flips the subtraction to addition. 12-(-5)=12+5=17."

---

### Teaching Action A02 — Two Negatives Make a Positive; -x Isn't Always Negative

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-2 by proving the multiplication sign rule via a repeated-addition pattern; break MC-3 by evaluating $-x$ for both a positive and a negative $x$

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Proving negative × negative = positive via a pattern (MC-2):**

Build a pattern using known multiplication facts, decreasing one factor by 1 each row:

$$3\times(-2)=-6$$
$$2\times(-2)=-4$$
$$1\times(-2)=-2$$
$$0\times(-2)=0$$
$$-1\times(-2)=\,?$$

Each row's result INCREASES by 2 as the first factor decreases by 1 (from $-6\to-4\to-2\to0$, each step $+2$). Continuing this consistent pattern: $-1\times(-2)$ should be $0+2=2$ — **POSITIVE**, confirming $(-1)\times(-2)=2$, not $-2$. The sign rule (negative × negative = positive) isn't an arbitrary convention; it's FORCED by requiring multiplication to behave consistently (following the established pattern) even as one factor crosses into negative territory.

**Contrast 2 — Evaluating $-x$ for positive AND negative $x$ (MC-3):**

For $x=5$ (positive): $-x=-5$ — negative, matching the "−x is negative" expectation. For $x=-5$ (negative): $-x=-(-5)$. Apply the "double negative" rule from A01 (or directly: the additive inverse of $-5$ is the number that, added to $-5$, gives 0 — that number is $5$): **$-x=5$ — POSITIVE**, despite the expression "$-x$" LOOKING like it should be negative by its surface appearance. $-x$ means "the additive inverse of $x$," which is negative when $x$ is positive, but genuinely POSITIVE when $x$ is itself negative — the notation's sign depends entirely on $x$'s own sign, never fixed in advance.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Compute $(-6)\times(-3)$ using the sign rule. (b) If $x=-9$, what is $-x$? Is it positive or negative?

**CORRECT:** (a) Negative times negative is positive: $(-6)\times(-3)=18$. (b) $-x=-(-9)=9$ — POSITIVE, despite the "-x" notation, because $x$ itself was already negative.
→ "Correct — (b) directly confirms that '-x' names a positive number here, precisely because x started out negative." → Proceed to A03.

**PARTIAL:** Student gets (a) but in (b) computes $-x=-9$ correctly as a VALUE but describes it as "still following the -x is negative pattern" without recognizing this is actually the exception, not the rule.
→ "Recheck: if x=-9, then -x = -(-9) = 9, a POSITIVE number — not -9. Confirm using the additive-inverse definition: -x is whatever number added to x gives 0; here 9+(-9)=0, confirming -x=9, positive. This is a case where '-x' denotes a positive value precisely BECAUSE x was already negative — the general rule is 'sign of -x is opposite to the sign of x,' not 'always negative.'"

**INCORRECT:** Student answers (a) "$(-6)\times(-3)=-18$" (MC-2) and/or (b) "$-x=-9$, negative, since there's a minus sign in front" (MC-3).
→ "(a) Two negatives multiplied give a POSITIVE result: $(-6)\times(-3)=18$, not $-18$ — verify via the pattern in Contrast 1 (each step down by 1 in the first factor increases the product by 3, consistently). (b) $-x$ means the additive inverse of x, not 'a negative number by definition' — since $x=-9$ is already negative, its additive inverse $-x=9$ is POSITIVE. The minus sign in '-x' is a NAME for an operation (negation/additive-inverse), not a guarantee that the resulting value is negative."

**NO_RESPONSE:** → "(a) (-6)×(-3)=18 (negative times negative is positive). (b) -x=-(-9)=9, positive, since x itself was negative."

---

### Teaching Action A03 — Composite: All Three Rules Together

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Force correct application of double-negative subtraction, negative×negative multiplication, and -x evaluation together in one expression

---

**[P28 — CONFLICT EVIDENCE]**

Evaluate: $-x - (-y)\times(-z)$ where $x=-4$, $y=-2$, $z=3$.

A student weak on any single rule typically fails a different piece of this composite expression: misreading $-x$ (MC-3, forgetting $x$ is already negative so $-x$ flips positive), mishandling the subtraction of a negative-valued expression (MC-1), or getting the multiplication sign wrong (MC-2).

**Full resolution, step by step:**

1. **Evaluate $-x$:** $x=-4$, so $-x=-(-4)=4$ (positive, since $x$ was negative — MC-3's lesson).
2. **Evaluate $(-y)\times(-z)$:** $y=-2$ so $-y=-(-2)=2$; $z=3$ so $-z=-3$. Then $(-y)\times(-z)=2\times(-3)=-6$ (positive times negative is negative — a straightforward sign rule, not the negative×negative case here, since $-y$ itself already evaluated to positive 2).
3. **Combine:** $-x - [(-y)\times(-z)] = 4 - (-6)$ (substituting the result from step 2, which was $-6$, a NEGATIVE value being subtracted) $= 4+6=10$ (subtracting a negative flips to addition — MC-1's lesson, applied to the computed intermediate value $-6$, not a literal "-z" symbol).

**Final answer: 10.**

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Evaluate $-a + (-b)\times(-c)$ where $a=-5, b=4, c=-2$.

**CORRECT:** $-a=-(-5)=5$. $(-b)\times(-c)$: $-b=-4$, $-c=-(-2)=2$; $(-4)\times(2)=-8$. Combine: $5+(-8)=-3$.
→ "Correct — each of the three rules (evaluating -x, sign of a product, and combining terms) was applied correctly in sequence." → Proceed to A04.

**PARTIAL:** Student correctly computes $-a=5$ and $-c=2$ but makes a sign error in $(-4)\times(2)$, computing it as $8$ instead of $-8$.
→ "Recheck the multiplication: $(-4)\times(2)$ — a NEGATIVE times a POSITIVE gives a NEGATIVE result (only two negatives together give a positive; one negative and one positive stay negative). So $(-4)\times2=-8$, not 8. Redo the final combination with this corrected value: $5+(-8)=-3$."

**INCORRECT:** Student evaluates $-a$ as $-5$ (not flipping the sign since $a$ was already negative) (MC-3).
→ "Since $a=-5$ (already negative), $-a=-(-5)=5$, POSITIVE — not $-5$. Applying '-' to an already-negative number flips it positive; don't assume the minus sign in '-a' automatically means the result stays negative. Redo the rest of the expression using $-a=5$ as the corrected first term."

**NO_RESPONSE:** → "-a=5 (a was negative). (-b)×(-c)=(-4)×(2)=-8. Combine: 5+(-8)=-3."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess double-negative subtraction, multiplication sign rule, and -x evaluation under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Compute $9-(-6)$.

*Solution:* $9+6=15$.

**Problem 2:** Compute $(-7)\times(-8)$.

*Solution:* $56$ (positive).

**Problem 3:** If $m=-11$, what is $-m$?

*Solution:* $-m=-(-11)=11$ (positive).

**Problem 4:** True or false: "$-y$ is always a negative number." Correct if false, with an example.

*Solution:* False. If $y$ is itself negative (e.g. $y=-3$), then $-y=3$, a positive number. $-y$'s sign depends on $y$'s own sign; it is not always negative.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A submarine's depth is tracked as a negative number (e.g. $-200$ meters means 200m below sea level), and altitude changes are tracked as signed numbers (positive = ascending, negative = descending further).

(a) The submarine is at depth $d=-450$ meters. It then ascends by removing a descent of $-150$ meters that had previously been PLANNED but never executed (i.e., compute $d - (-150)$, representing "cancel a planned further descent of 150m"). What is the resulting effective depth calculation, and what does the sign tell you (did the sub end up effectively higher or lower than $d$ alone)?
(b) A sensor reports the submarine's "un-descent" value (the negative of its planned descent) as $-x$ where $x=-150$ (the planned descent itself, stored as a negative number representing downward motion). Compute $-x$ and explain, in terms of the submarine scenario, why this comes out positive despite the "-" in front.
(c) A colleague argues: "Depth calculations involving double negatives like this are just confusing notation tricks with no real physical meaning — in practice, you'd never actually need to compute something like d − (−150)." Evaluate this claim, explaining a concrete practical reason two negative signs might genuinely need to combine in a real depth/altitude tracking system.

**Expected solution:**

(a) $d-(-150) = -450-(-150) = -450+150 = -300$. The result, $-300$, is LESS negative than the original $-450$ — meaning the submarine ends up effectively HIGHER (less deep) than before, consistent with "cancelling a planned descent of 150m" — removing a planned further descent should indeed leave the sub shallower than it would have been, matching the "subtracting a negative = adding, hence moving toward less-negative/higher" pattern from A01.

(b) $x=-150$ (the planned descent, negative because descending is tracked as negative motion). $-x=-(-150)=150$ — POSITIVE. In the submarine scenario, this positive 150 represents the CANCELLATION of the descent as an equivalent ASCENT amount — "un-doing" a −150m descent is equivalent to a +150m ascent, hence the positive sign, exactly matching MC-3's lesson that $-x$'s sign depends on $x$'s own sign (here, negating an already-negative planned descent naturally produces a positive "ascent-equivalent" value).

(c) The colleague's claim is wrong — double-negative combinations arise naturally whenever a system needs to CANCEL or REVERSE a previously recorded negative change, exactly as in (a): "cancel a planned descent" is a completely realistic operational scenario (e.g. an order is countermanded, a planned maneuver is aborted), and mathematically this is EXACTLY "subtract a negative number," which practically must be computed correctly (flipping to addition) to get the right resulting depth. Treating this as "just confusing notation" risks a genuine computational error (e.g. computing $d-(-150)$ incorrectly as $d-150=-600$, which would wrongly suggest the sub got DEEPER after cancelling a planned descent — the opposite of what actually happened) — the double-negative rule has direct, practically consequential meaning whenever a system tracks and later reverses signed changes.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.arith.integer-arithmetic and math.arith.number-line; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.arith.negative-numbers assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DOUBLE-NEGATIVE-STAYS-NEGATIVE (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Computing a-(-b) as a-b is DOUBLE-NEGATIVE-STAYS-NEGATIVE. Subtracting a negative number flips the operation to addition — a-(-b)=a+b, always."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Compute 10-(-4)."
- MC-1 response: "6" (treating it as 10-4).

**[P64 — CONCEPTUAL SHIFT]**
"Use the turn-around model: subtraction normally faces you toward the negative direction, but the number being subtracted (-4) is ITSELF negative, which turns you back around to face positive. Stepping 4 from 10 in that (now positive) direction lands at 14, not 6. Algebraically: 10-(-4)=10+4=14 — the two negative signals (subtraction, and the number's own sign) combine into a plus."

Practice: Compute 15-(-9) using both the turn-around model and the algebraic rule, confirming they agree.

---

### Repair Action B02 — NEGATIVE-TIMES-NEGATIVE-IS-NEGATIVE (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Computing a product of two negatives as negative is NEGATIVE-TIMES-NEGATIVE-IS-NEGATIVE. Two negative factors multiply to a POSITIVE result — a genuine rule, provable by extending a consistent multiplication pattern."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is (-5)×(-2)?"
- MC-2 response: "-10."

**[P64 — CONCEPTUAL SHIFT]**
"Build the pattern: $2\times(-2)=-4$; $1\times(-2)=-2$; $0\times(-2)=0$ — each step down by 1 in the first factor INCREASES the product by 2. Continuing consistently: $-1\times(-2)$ should be $0+2=2$, and by the same logic $-5\times(-2)=10$ (positive), not $-10$. The sign rule isn't arbitrary — it's what's REQUIRED to keep multiplication behaving consistently as the first factor crosses zero into negative territory."

Practice: Extend the pattern 3×(-3), 2×(-3), 1×(-3), 0×(-3) to predict (-2)×(-3), confirming the result is positive.

---

### Repair Action B03 — MINUS-X-IS-ALWAYS-NEGATIVE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming -x is always negative is MINUS-X-IS-ALWAYS-NEGATIVE. -x means 'the additive inverse of x' — its actual sign is OPPOSITE to x's own sign, so -x is positive whenever x itself is negative."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "If x=-8, is -x positive or negative?"
- MC-3 response: "Negative, since there's a minus sign."

**[P64 — CONCEPTUAL SHIFT]**
"Compute directly: $-x=-(-8)$. Using the double-negative rule (or the additive-inverse definition: -x is whatever number added to x gives 0), $-(-8)=8$ — POSITIVE. The minus sign in '-x' names an OPERATION (find the additive inverse), not a guaranteed negative outcome; since x started out negative here, its inverse flips to positive."

Practice: For x=-20, compute -x and state whether it's positive or negative, explaining why using the additive-inverse definition.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute a fresh a-(-b) subtraction using the turn-around model and the algebraic rule together |
| SR-2 | +3 days | Reconstruct the negative×negative=positive pattern proof from a fresh starting multiplication fact |
| SR-3 | +7 days | Evaluate -x for a fresh negative x, explaining why the result is positive |
| SR-4 | +14 days | Reconstruct the submarine transfer probe's argument for why double-negative subtraction has genuine practical meaning |

Retrieval flag: if student fails to flip subtraction-of-a-negative to addition (MC-1) or computes a negative-times-negative as negative (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.arith.subtraction | Supplies ordinary subtraction, which this concept extends to allow negative operands and negative results |
| Requires (Tier-1) | math.found.integers | Supplies the set ℤ (including additive inverses) this concept's arithmetic operates within |
| Unlocks | math.arith.integer-arithmetic | The general arithmetic of ℤ (all four operations combined) builds directly on the sign rules established here |
| Unlocks | math.arith.number-line | The number line's leftward (negative) extension is exactly where these numbers are given their geometric position |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies double-negative subtraction and the -x evaluation to a submarine depth-tracking scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=8 → extended structure (3 main TAs + gate), reflecting the concept's broader scope (subtraction-of-negatives, multiplication sign rule, and the -x notation subtlety are three genuinely separate skill clusters under one KG node)
- bloom=understand → V-4 = N/A (no P07 required; rule-application and pattern-verification tasks, not open derivations beyond the provided pattern argument)
- CPA_entry = C for a developing learner: a physical number-line "turn around" model grounds subtracting-a-negative in a concrete spatial action before the abstract "two negatives combine to a plus" rule is stated symbolically

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception because subtracting a negative number requires correctly combining TWO independent negative signals into a single flip — a genuinely different cognitive demand from ordinary sign-tracking, and one that resists intuition precisely because "two minuses" doesn't obviously suggest "becomes a plus" without an explicit model (the turn-around picture) to anchor it. A01's number-line model is deliberately concrete and re-usable, giving students a fallback method whenever the abstract rule is momentarily uncertain.

**MC-2's pattern-based proof as a template for MC-3:** The Contrast 1 pattern argument (extending known products consistently as one factor crosses zero) proves the sign rule rather than merely asserting it — this same "verify by extending a known, consistent pattern" habit is exactly what makes MC-3's -x evaluation trustworthy without memorization: checking $-x$ via the additive-inverse DEFINITION (what number added to x gives 0) rather than a surface-level sign-reading rule.

**Sequencing note:** No cross-link concept exists yet for math.arith.negative-numbers; the P76 transfer probe instead uses a submarine depth-tracking scenario, chosen because "cancelling a planned descent" gives a genuinely concrete, practically motivated reason for a double-negative subtraction to arise, directly countering any sense that this rule is merely an abstract notational trick.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.arith.negative-numbers ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.arith.subtraction ✓, math.found.integers ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=8, three skill clusters → extended (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Submarine depth-tracking scenario; practical double-negative-cancellation argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

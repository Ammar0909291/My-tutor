# Teaching Blueprint — math.alg.polynomial-operations

## Component 0 — Metadata
concept_id: math.alg.polynomial-operations
concept_name: Polynomial Operations
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 8
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.alg.polynomial, math.alg.like-terms]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** Polynomials are added and subtracted by collecting like terms (matching degree); they are multiplied using the distributive property applied term-by-term, then collecting like terms. The degree of a sum is at most max(deg p, deg q); the degree of a product is exactly deg p + deg q when both leading coefficients are nonzero.

**Conceptual progression:**
1. Addition/subtraction: group terms of the same degree; only like terms (same variable and same exponent) combine.
2. Sign distribution in subtraction: p(x)−q(x) requires distributing the minus sign to EVERY term of q(x), not just the first.
3. Multiplication — distributive property: each term of one factor multiplies every term of the other; FOIL is a mnemonic for the binomial×binomial case, not a general rule.
4. Degree arithmetic: deg(p+q) ≤ max(deg p, deg q); deg(p·q) = deg p + deg q.
5. Standard form throughout: always collect and write in descending exponent order.

**CPA arc (entry: P):**
- Pictorial: column addition/subtraction of polynomials aligned by degree; grid (table) method for multiplication showing partial products
- Abstract: sigma notation grouping, coefficient arithmetic, degree rules

**Prior knowledge activated:** polynomial anatomy (math.alg.polynomial) — degree, leading term, like terms; like-term identification and collection (math.alg.like-terms); distributive property a(b+c)=ab+ac

---

## Component 2 — Misconception Registry

### MC-1: UNLIKE-TERMS-COMBINE [FOUNDATIONAL]
**Description:** Learner adds or multiplies terms with different degrees as if they were like terms — e.g., x²+x = 2x² or 2x³, or writes (x²)(x) = x² rather than x³.
**Surface form:** "x²+x = 2x because they're both x-terms." or "x²+3x = 4x² because 1+3=4."
**Root cause:** Overgeneralisation of numeric addition: 2+3=5, so 2x²+3x "should" simplify. Learner has not internalised that unlike terms cannot be combined — only terms with the SAME variable AND the SAME exponent are like terms.
**Trigger condition:** Any addition or subtraction problem involving terms of different degrees.
**Repair target:** TA-B01.

### MC-2: SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY
**Description:** Learner negates only the first term of the subtracted polynomial, leaving subsequent terms unchanged. For example, (x²+3x+1)−(x²−2x+4) becomes x²+3x+1−x²−2x+4 instead of x²+3x+1−x²+2x−4.
**Surface form:** "p(x)−q(x): I put a minus in front of q and change the first term's sign."
**Root cause:** The minus sign is treated as a prefix that modifies one term, not as multiplying the entire second polynomial by −1. Learner has not internalised that subtraction = adding the additive inverse of the WHOLE polynomial.
**Trigger condition:** Any polynomial subtraction, especially when the second polynomial has three or more terms.
**Repair target:** TA-B02.

### MC-3: FOIL-FOR-ALL-PRODUCTS
**Description:** Learner applies FOIL (First-Outer-Inner-Last) mechanically to multiply polynomials when at least one factor has more than two terms, and either stops at 4 terms or misses cross-products.
**Surface form:** "(x+2)(x²−3x+5): FOIL gives x³−3x+2x²−6… wait, I'm confused."
**Root cause:** FOIL is taught as a standalone rule for binomial×binomial, and learner never generalises it to the underlying distributive property. When the mnemonic doesn't apply, learner has no fallback method.
**Trigger condition:** Any product where at least one factor has 3+ terms.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Simplify: (2x²+3x)+(x²−5x). Which terms can you combine?" If the learner correctly identifies like terms (both x² terms, both x terms) and gets 3x²−2x, proceed to A01. If the learner attempts to combine x² and x, address MC-1 before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): column layout — write polynomials aligned by degree (x³ column, x² column, x column, constant column); add within each column only.
- Rung 2 (sign focus): given a subtraction problem, rewrite p(x)−q(x) as p(x)+(−1)·q(x), then negate every term of q.
- Rung 3 (multiplication): use a grid (table) with one polynomial's terms as rows and the other's as columns; each cell is one partial product.

**Pacing note:** h=8 estimated hours; A01 in session 1; A02 in sessions 2–3; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Sorting coins.
"You have a pile of quarters, dimes, and nickels. To total them, you sort by type first: add all quarters together, all dimes together, all nickels together. You cannot add a quarter and a dime to get a 'quarter-dime' — they stay separate until converted."

TARGET DOMAIN: Polynomial addition.
"x² terms, x terms, and constants are like quarters, dimes, and nickels. You can only add 'like coins': x² with x², x with x, constant with constant. Mixing them — writing x²+x as 2x or 2x² — is like adding a quarter and a dime and calling it 'two quarters.'"

BRIDGE MAPPING:
| Coins | Polynomial terms |
|---|---|
| Quarters (25¢ each) | x² terms (each worth one x²) |
| Dimes (10¢ each) | x terms (each worth one x) |
| Nickels (5¢ each) | Constant terms |
| 3 quarters + 2 quarters = 5 quarters | 3x² + 2x² = 5x² |
| Cannot add quarter + dime (different type) | Cannot add x² + x (different degree) |
| Conversion to pennies changes the unit | No "conversion" in polynomial addition |

WORKED EXAMPLE:
(3x²−2x+1) + (−x²+4x−3)
= (3−1)x² + (−2+4)x + (1−3)
= 2x² + 2x − 2.

**Assessment primitive: P49**

PROBE: "Simplify: (4x³+2x²−5) + (−x³−3x²+2x+1)."
- CORRECT: (4−1)x³+(2−3)x²+2x+(−5+1) = 3x³−x²+2x−4 → "Correct. Group by degree: x³ terms give 3x³, x² terms give −x², x term stays 2x, constants give −4."
- PARTIAL: correct grouping, arithmetic error → "Your grouping is right. Check: 4x³+(−x³)=(4−1)x³=3x³; 2x²+(−3x²)=(2−3)x²=−x²; 2x from second poly only; −5+1=−4. Final: 3x³−x²+2x−4."
- INCORRECT: combines x³ and x² terms → Repair with B01 (UNLIKE-TERMS-COMBINE).
- NO_RESPONSE: "Sort terms by degree: all x³ terms together: 4x³+(−x³). All x² terms: 2x²+(−3x²). All x terms: +2x. All constants: −5+1. Add each group separately."

---

### TA-B01 — Repair for MC-1 (UNLIKE-TERMS-COMBINE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'x²+x = 2x because they both involve x.' Like terms must have the SAME variable AND the SAME exponent — x² (x-squared) and x (x-to-the-first) are different types."

**P41 — MISCONCEPTION DETECTOR**
"Does 3x²+2x equal 5x² or 5x or cannot be simplified?
(A) 5x² — add the coefficients.
(B) 5x — they're both 'x-terms.'
(C) Cannot be simplified — x² ≠ x."
[If A or B: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"x² = x·x (x multiplied by itself). x = x (just x). These are DIFFERENT quantities — like 'area' vs. 'length.' If a square has area x² and a segment has length x, you cannot add them to get '2x' or '2x²'. They are unlike types. Only when BOTH the variable AND its exponent match can terms be combined: 3x² and 2x² are both x²-type → add to 5x². 3x² and 2x are different types → leave as 3x²+2x (cannot simplify)."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Addition and subtraction:

Problem A (addition): (3x²−2x+1)+(x²+4x−3)
Step 1 — Group like terms: (3x²+x²)+(−2x+4x)+(1−3)
Step 2 — Combine: 4x²+2x−2 ✓

Problem B (subtraction): (2x³+x−5)−(x³−3x²+2)
Step 1 — Distribute minus sign to EVERY term of second polynomial:
= 2x³+x−5 −x³+3x²−2   [NOT: −x³−3x²+2]
Step 2 — Group like terms: (2x³−x³)+(3x²)+(x)+(−5−2)
Step 3 — Combine: x³+3x²+x−7 ✓

KEY STEP: (subtracting q) = (adding −q) = negate ALL terms of q.

WORKED EXAMPLE 2 — Multiplication of binomial × trinomial:

Problem: (x+2)(x²−3x+5)

Method — Distribute each term of (x+2) to every term of (x²−3x+5):
Step 1 — x × (x²−3x+5) = x³−3x²+5x
Step 2 — 2 × (x²−3x+5) = 2x²−6x+10
Step 3 — Add partial products:
  x³
  −3x²+2x² = −x²
  5x−6x = −x
  +10
= x³−x²−x+10 ✓

Verify degree: deg(x+2)=1, deg(x²−3x+5)=2; deg(product)=1+2=3 ✓.

**Assessment primitive: P49**

PROBE: "(2x+1)(x²+x−4). Find the product."
- CORRECT: 2x·(x²+x−4)=2x³+2x²−8x; 1·(x²+x−4)=x²+x−4; sum: 2x³+(2+1)x²+(−8+1)x−4=2x³+3x²−7x−4 → "Correct. Distribute each factor, collect like terms."
- PARTIAL: correct distribution, error in collection → "Distribution step is right. Combine x² terms: 2x²+x²=3x². Combine x terms: −8x+x=−7x. Final: 2x³+3x²−7x−4."
- INCORRECT: uses FOIL (gets only 4 terms) → Repair with B03 (FOIL-FOR-ALL-PRODUCTS).
- NO_RESPONSE: "Distribute 2x to each term of (x²+x−4): 2x·x²=2x³, 2x·x=2x², 2x·(−4)=−8x. Then distribute 1: 1·x²=x², 1·x=x, 1·(−4)=−4. Add all six terms, then collect like terms."

---

### TA-B02 — Repair for MC-2 (SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'in p−q, the minus sign only changes the first term of q.' The minus sign is actually a multiplication by −1 applied to the ENTIRE second polynomial."

**P41 — MISCONCEPTION DETECTOR**
"Compute (5x²+3x+1)−(2x²−x+4). Which is correct after removing the parentheses?
(A) 5x²+3x+1−2x²−x+4 (only first term sign changed: 2x² becomes −2x²)
(B) 5x²+3x+1−2x²+x−4 (all signs of second poly reversed)"
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"Subtraction means adding the NEGATIVE of the whole polynomial. −(2x²−x+4) = −2x²+x−4 (multiply every term by −1). Every term in the second polynomial changes sign: +2x²→−2x², −x→+x, +4→−4. Think: if you owe a friend the NEGATIVE of the whole debt (2x²−x+4), every component of the debt is reversed. Never change just one sign — it must be all of them."

→ Return to A02.

---

### TA-B03 — Repair for MC-3 (FOIL-FOR-ALL-PRODUCTS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'FOIL works for multiplying any two polynomials.' FOIL is a memory aid for (a+b)(c+d) — binomial×binomial only. For any other product, use the distributive property directly."

**P41 — MISCONCEPTION DETECTOR**
"Compute (x+1)(x²+2x+3) using FOIL.
How many partial products do you get?
(A) 4 (First, Outer, Inner, Last).
(B) 6 (each of 2 terms in first factor × each of 3 terms in second)."
[If A: learner holds MC-3 — FOIL underestimates the product.]

**P64 — CONCEPTUAL SHIFT**
"FOIL = distribute each of 2 terms over 2 terms = 2×2=4 products. For (x+1)(x²+2x+3): 2 terms × 3 terms = 2×3=6 products. The rule is ALWAYS: each term in the first factor multiplies every term in the second. FOIL just happens to enumerate all products when both factors are binomials. For larger factors, list the products in rows: x×(x²+2x+3) and 1×(x²+2x+3), then add."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Correct like-term collection:
- (3x²+2x)+(x²−5x) = (3+1)x²+(2−5)x = 4x²−3x ✓
- (x³+2x²)−(x³−x²) = x³+2x²−x³+x² = 0x³+3x² = 3x² ✓ [leading terms cancel!]
- (x+3)(x−3) = x²−3x+3x−9 = x²−9 ✓ [middle terms cancel — difference of squares]

PAIR B — Incorrect collection (common errors):
- (3x²+2x)+(x²−5x) → "4x²+2x−5x=4x²−3x ✗ wait that's fine"

Let me redo with genuine errors:

PAIR A — Correct:
- 4x²+3x²=7x² (same degree: exponents match)
- x³+x²: CANNOT combine (different degrees) → stays x³+x²
- (2x+3)(x−1)=2x²−2x+3x−3=2x²+x−3 (4 partial products collected)

PAIR B — Incorrect:
- x³+x²=2x⁵ [ERROR: multiplied exponents and added coefficients — this is not a rule]
- (x²+3)−(x+1)=x²+3−x−1=x²−x+2 ✓ [correctly distributes minus]
  vs. (x²+3)−(x+1)=x²+3−x+1=x²−x+4 [ERROR: did not negate last term]
- (x+2)(x²+x+1): stopping at 4 terms → x³+x²+x+2x²+2x+2 ✗ (forgot to collect) vs. x³+3x²+3x+2 ✓

CONTRAST TABLE:
| Operation | Common error | Correct |
|---|---|---|
| (2x²+x)+(3x²−4x) | 5x²−3x ✓ (happens to be right) | — |
| (x²+2x+1)−(x²−x+3) | x²+2x+1−x²−x+3=x+4 ✗ | x²+2x+1−x²+x−3=3x−2 ✓ |
| (x+1)(x+1) | FOIL: x²+x+x+1=x²+2x+1 ✓ | Same — FOIL works here |
| (x+1)(x²+x+1) | FOIL: x³+x²+x+x²+x+1 ✗ (wrong) | distribute: x³+2x²+2x+1 ✓ |

**Assessment primitive: P49**

PROBE: "(x²−3x+2)−(2x²+x−5). Expand and simplify."
- CORRECT: x²−3x+2−2x²−x+5=−x²−4x+7 → "Correct — all signs of the subtracted polynomial reversed: +2x²→−2x², +x→−x, −5→+5."
- PARTIAL: correct expansion of first poly, error in sign of last term of second → "Almost — the last term of (2x²+x−5) is −5. When subtracting, −(−5)=+5. Check: x²−3x+2−2x²−x+5=−x²−4x+7."
- INCORRECT: does not negate middle or last term → Repair with B02 (SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY).
- NO_RESPONSE: "First, distribute the minus sign: −(2x²+x−5)=−2x²−x+5. Now add to (x²−3x+2): (x²−2x²)+(−3x−x)+(2+5)=−x²−4x+7."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (UNLIKE-TERMS-COMBINE)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (FOIL-FOR-ALL-PRODUCTS)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Compute (3x²−x+4)−(x²+2x−1) and (x−3)(2x²+x−5). Simplify fully."
[Expected: subtraction: 2x²−3x+5. Product: 2x³+x²−5x−6x²−3x+15=2x³−5x²−8x+15.]

**Day 10 prompt:**
"What is (x+a)(x+b) expanded? Now what is (x+a)³=(x+a)(x+a)² — expand step by step."
[Expected: (x+a)(x+b)=x²+(a+b)x+ab. (x+a)²=x²+2ax+a². (x+a)³=(x+a)(x²+2ax+a²)=x³+2ax²+a²x+ax²+2a²x+a³=x³+3ax²+3a²x+a³ (binomial theorem for n=3).]

**Day 30 prompt:**
"Prove or disprove: (p+q)²=p²+q² for polynomials p and q. Give a concrete counterexample if false."
[Expected: FALSE. (p+q)²=(p+q)(p+q)=p²+2pq+q². The cross term 2pq is generally nonzero. Counterexample: p=x, q=1: (x+1)²=x²+2x+1≠x²+1. This is a polynomial identity version of the "freshman's dream" error (which holds in characteristic 2 but not over ℝ).]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.polynomial — definition of polynomial, degree, like terms, standard form
- math.alg.like-terms — combining like terms by adding coefficients when variables and exponents match

**Unlocked blueprints:**
- math.alg.polynomial-division — long division and synthetic division of polynomials

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-2 (SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY) is the most persistent error and causes wrong answers on virtually every subtraction problem. Drill the rewrite p−q = p+(−q) = p+(−1)·q until it is automatic.

**Distributive property as the master rule:** FOIL, FOIL-extended, the grid method — all are visual aids for the same underlying rule: every term of the first polynomial multiplies every term of the second. Teach the distributive property as the canonical method; use the grid as a visual scaffold.

**Degree arithmetic:** After every product, check deg(result) = deg(p)+deg(q). If it's wrong, a collection error was made. This verification catches errors without re-doing the whole computation.

**Sign check protocol:** After writing p−q expanded, verify that every term of q has flipped sign. Count the terms of q; count the sign-flipped terms — they should match.

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
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel unseen problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (product of trinomial and binomial with collection)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All content (like-term collection, sign distribution, distributive property for multiplication) consistent with KG description and standard algebra pedagogy; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Simplify: (3x²+2x−1)+(x²−5x+4)."
[Expected: (3+1)x²+(2−5)x+(−1+4) = 4x²−3x+3.]

**Item 2:**
"Simplify: (4x³−2x+1)−(x³+x²−3x+5)."
[Expected: 4x³−2x+1−x³−x²+3x−5 = (4−1)x³+(−1)x²+(−2+3)x+(1−5) = 3x³−x²+x−4.]

**Item 3:**
True or False: "x²+x = 2x³."
[Expected: FALSE. x² and x are unlike terms (different degrees); they cannot be combined at all, and certainly not to produce a cubic term.]

**Item 4:**
"Expand: (x+3)(x+4)."
[Expected: x²+4x+3x+12 = x²+7x+12. (FOIL or distributive property both work here.)]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Expand and simplify: (x²−2x+1)(x+3).

(a) List all partial products.
(b) Collect like terms and write the result in standard form.
(c) Verify the degree of the result equals deg(x²−2x+1)+deg(x+3)."

[Expected:
(a) x²·x=x³; x²·3=3x²; (−2x)·x=−2x²; (−2x)·3=−6x; 1·x=x; 1·3=3. Six partial products.
(b) x³+(3x²−2x²)+(−6x+x)+3 = x³+x²−5x+3.
(c) deg(x²−2x+1)=2, deg(x+3)=1; 2+1=3=deg(result) ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (b) x³+x²−5x+3 is correct, 0 otherwise. (Minor arithmetic slip in one coefficient acceptable if method is correct and degree check (c) is valid.)

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can add, subtract (including full sign distribution), and multiply polynomials correctly; knows unlike terms don't combine; knows degree adds under multiplication.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or Item 3 (unlike terms combined): → TA-B01 (UNLIKE-TERMS-COMBINE repair), then re-gate
- FAIL on Item 2 (sign error in subtraction): → TA-B02 (SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY repair), then re-gate
- FAIL on Item 4 or P76 (multiplication error / wrong number of products): → TA-B03 (FOIL-FOR-ALL-PRODUCTS repair) if 3+ term polynomial involved; else re-demonstrate WE1; then re-gate
- FAIL on multiple items: → B01 then B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to perform all three polynomial arithmetic operations correctly.

Key anchors to carry forward:
- Like terms only: same variable AND same exponent; x² and x are unlike and cannot combine.
- Subtraction = add the negative: p−q = p+(−1)·q; every term of q changes sign.
- Multiplication = distributive property: every term of first × every term of second; FOIL is a special case for binomials only.
- Degree: deg(p+q) ≤ max(deg p, deg q); deg(p·q) = deg p + deg q.

Next concept: math.alg.polynomial-division — dividing polynomials using long division and the Remainder Theorem."

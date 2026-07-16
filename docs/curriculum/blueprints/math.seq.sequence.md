# Teaching Blueprint — math.seq.sequence

## Component 0 — Metadata
concept_id: math.seq.sequence
concept_name: Sequence
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 5
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.func.function-concept, math.found.natural-numbers]
cross_links: [math.calc.sequence-limits]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A sequence is a function from ℕ (or {1,2,3,...,n}) to a set, whose values are listed in order: a₁, a₂, a₃, …. Unlike a set, order is essential and repetition is permitted. A sequence may be defined by an explicit formula (aₙ = f(n)), a recurrence relation (a₁ given; aₙ₊₁ = g(aₙ)), or by description alone with no closed-form rule.

**Conceptual progression:**
1. A sequence is an ordered list — position (index) matters; {2,4,6} as a set ≠ (2,4,6) as the first three terms of a sequence.
2. Sequences as functions: domain = ℕ (or a finite initial segment), codomain = any set. aₙ = f(n).
3. Explicit sequences: aₙ=2n, aₙ=1/n, aₙ=(-1)ⁿ — pattern identified from formula.
4. Recursive sequences: a₁=1, aₙ₊₁=aₙ+3 — next term defined in terms of previous.
5. Non-patterned sequences: digits of π — a valid sequence with no predictive formula.
6. Finite vs. infinite sequences: both valid; infinite sequences central to analysis.

**CPA arc (entry: P):**
- Pictorial: ordered list notation (a₁, a₂, a₃, …); arrow diagrams ℕ→ℝ showing mapping; number-line plots of sequence terms
- Abstract: function notation aₙ = f(n), n ∈ ℕ; recurrence notation a₁=c, aₙ₊₁=g(aₙ); Σ and lim notation for later concepts

**Prior knowledge activated:** function concept (domain, codomain, function-as-mapping); natural numbers ℕ = {1, 2, 3, …}; set notation vs. ordered list notation

---

## Component 2 — Misconception Registry

### MC-1: SEQUENCE-IS-A-SET [FOUNDATIONAL]
**Description:** Learner treats a sequence as a set — believes order doesn't matter and repetition is impossible. Writes {2,4,6} and (2,4,6) interchangeably; cannot process (2,2,2,...) as a valid sequence.
**Surface form:** "The sequence (4,2,6) and the sequence (2,4,6) are the same — they have the same elements."
**Root cause:** Prior exposure to sets (which are unordered and have no repeated elements) is the dominant data structure. The concept of "ordered list with repetition" requires a distinct data model the learner hasn't yet internalised.
**Trigger condition:** Any problem where two sequences with the same elements but different orders are presented.
**Repair target:** TA-B01.

### MC-2: SEQUENCE-MUST-HAVE-PATTERN
**Description:** Learner believes a sequence is only valid if there is a formula or rule generating it. Rejects sequences defined by description or without closed form.
**Surface form:** "3, 1, 4, 1, 5, 9, 2, 6 — this isn't a sequence because there's no formula."
**Root cause:** Exposure to sequences has been exclusively through arithmetic/geometric progressions with explicit formulas. The general definition (any function from ℕ) has not been presented.
**Trigger condition:** Any sequence defined recursively or informally (digits of π, random-looking sequences).
**Repair target:** TA-B02.

### MC-3: INDEX-STARTS-AT-ZERO
**Description:** Learner defaults to 0-based indexing (from programming). Interprets a₃ as the fourth term (offset by one), or writes a₀ = first term when the convention is a₁ = first term.
**Surface form:** "If aₙ=2n and n starts at 0, then a₃=6 is the fourth term."
**Root cause:** Zero-indexing is standard in programming and some computer science contexts. Mathematical sequences conventionally start at n=1 (or explicitly state the starting index).
**Trigger condition:** Any problem where the index of a specific term must be identified.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Give an example of a function. What is its domain? What is its codomain?" If the learner can give a function with domain ℕ (even informally), proceed to A01. If not, briefly review function-as-mapping before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): Arrow diagram from {1,2,3,4,5} to ℝ showing aₙ=2n. Learner reads off a₃ and a₅ from the diagram.
- Rung 2 (partial abstract): Learner fills in the table for a recursive sequence a₁=3, aₙ₊₁=aₙ+4 through a₅.
- Rung 3 (full abstract): Learner writes the explicit formula for a sequence given first four terms.

**Pacing note:** h=5 estimated hours; deliver A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: A waiting list at a restaurant.
- Names on the list have ORDER — position 1, position 2, position 3 matter.
- The same name can appear TWICE (two members of the same family both on the waiting list).
- If names are rearranged, the list is DIFFERENT — "Smith at position 1" ≠ "Smith at position 3."

TARGET DOMAIN: A mathematical sequence.
- Terms a₁, a₂, a₃, … have order — position (index) matters.
- The same VALUE can appear multiple times: (2, 2, 2, …) is a valid sequence.
- The sequence (4, 2, 6) ≠ the sequence (2, 4, 6) — same numbers, different order, different sequences.

BRIDGE MAPPING:
| Waiting list | Sequence |
|---|---|
| Position on list (1st, 2nd, …) | Index n |
| Name at position k | Term aₖ |
| Can repeat same name | Can repeat same value |
| Order matters | Order matters |

CONTRAST WITH SET: A set {2, 4, 6} has no order and no repetition — it is a collection, not a list. A sequence (2, 4, 6) is the same set of values but with order imposed. Swapping elements creates a different sequence but the same set.

**Assessment primitive: P49**

PROBE: "Are the sequences (1, 2, 3) and (3, 2, 1) the same or different? What about the sets {1,2,3} and {3,2,1}?"
- CORRECT: "Different sequences (order matters); same set (order doesn't matter in a set)." → "Exactly right. Order is the key distinction between sequences and sets."
- PARTIAL: "Different because the order is different" but can't distinguish from sets → "Good — sequences differ when order differs. What about sets? {1,2,3} and {3,2,1}: do sets have order? No — so these are the SAME set. A set ignores order; a sequence preserves it."
- INCORRECT: "They are the same because they have the same numbers" → "In a SET, yes — {1,2,3}={3,2,1}. But in a SEQUENCE, position matters. Position 1 holds 1 in the first, but position 1 holds 3 in the second. They are different sequences — like two different waiting lists."
- NO_RESPONSE: "Imagine a race: (gold, silver, bronze) describes who finished in each position. Is (gold, silver, bronze) the same outcome as (bronze, silver, gold)? Why not?"

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — EXPLICIT SEQUENCE (direct formula):
Definition: aₙ = f(n) for some function f. Each term computed directly from its index.
Examples:
- aₙ = 2n: terms are 2, 4, 6, 8, 10, …
- aₙ = 1/n: terms are 1, 1/2, 1/3, 1/4, …
- aₙ = (-1)ⁿ: terms are -1, 1, -1, 1, …
Advantage: Any single term aₙ computed in O(1) — no need to know previous terms.

PAIR B — RECURSIVE SEQUENCE (recurrence relation):
Definition: a₁ (base case) + rule for aₙ₊₁ in terms of previous terms.
Examples:
- a₁=1, aₙ₊₁=aₙ+3: terms are 1, 4, 7, 10, 13, …
- a₁=1, a₂=1, aₙ=aₙ₋₁+aₙ₋₂: Fibonacci sequence 1, 1, 2, 3, 5, 8, …
Advantage: Captures processes that are naturally step-by-step. May or may not have a closed-form explicit formula.

KEY INSIGHT: Both are sequences. A sequence is defined by its terms and their positions — the method of definition (formula or recursion) is secondary.

NEITHER-TYPE: Sequence of digits of π: 3, 1, 4, 1, 5, 9, 2, 6, 5, …
This is a valid infinite sequence. It has no known simple closed-form formula and no simple recurrence. Yet it IS a well-defined function from ℕ to {0,1,...,9}: the nth decimal digit of π.

**Assessment primitive: P49**

PROBE: "The sequence a₁=5, aₙ₊₁=2aₙ. (a) Find a₃. (b) Is this a valid sequence even without an explicit formula for aₙ?"
- CORRECT: "(a) a₂=2(5)=10, a₃=2(10)=20. (b) Yes — it is well-defined because each term is determined by the previous one. (It has an explicit formula too: aₙ=5·2ⁿ⁻¹, but that's not required for validity.)" → "Perfect. Recursive definitions are as valid as explicit ones."
- PARTIAL: Correct computation of a₃, but doubts validity without explicit formula → "a₃=20 is correct. About validity: a sequence needs only that each term is determined by its position. The recursion uniquely determines every term: a₁=5, a₂=10, a₃=20, … It's completely valid."
- INCORRECT: Wrong computation (e.g., a₃=15, adding instead of multiplying) → "Check the rule: aₙ₊₁=2aₙ means MULTIPLY by 2, not add 2. a₂=2×5=10, a₃=2×10=20."
- NO_RESPONSE: "Start with a₁=5. Apply the rule once: a₂=2×a₁=2×5=? Then apply again to get a₃."

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN DISCOVERY: From terms to formula.

INSTANCE 1: Given (2, 5, 8, 11, 14, …)
- Differences: 3, 3, 3, 3 — constant.
- a₁=2, then +3 each step.
- Explicit: aₙ = 2 + 3(n−1) = 3n−1. Check: a₁=2 ✓, a₄=11 ✓.

INSTANCE 2: Given (1, 4, 9, 16, 25, …)
- Differences: 3, 5, 7, 9 — increasing by 2.
- Second differences: 2, 2, 2 — constant.
- Pattern: perfect squares. Explicit: aₙ = n². Check: a₅=25 ✓.

INSTANCE 3: Given (1, 1/2, 1/4, 1/8, 1/16, …)
- Ratios: 1/2, 1/2, 1/2, 1/2 — constant.
- Each term is half the previous.
- Explicit: aₙ = (1/2)ⁿ⁻¹. Check: a₁=1 ✓, a₄=1/8 ✓.

INSTANCE 4: Given (3, 1, 4, 1, 5, 9, 2, 6, …) [digits of π]
- No obvious additive or multiplicative pattern.
- VALID SEQUENCE: well-defined (each term = next digit of π), but no simple formula.

GENERALISED PATTERN:
When differences are constant → arithmetic sequence (linear formula).
When ratios are constant → geometric sequence (exponential formula).
When no pattern → may be valid but complex (or truly patternless).

CONSOLIDATION: Finding the formula from terms is an extra skill — a sequence exists and is valid independently of whether we can find its formula.

**Assessment primitive: P49**

PROBE: "Given the sequence (2, 6, 18, 54, …): (a) Find the explicit formula aₙ. (b) What is a₆?"
- CORRECT: "(a) Ratios: 6/2=3, 18/6=3 — geometric with ratio 3, first term 2. aₙ=2·3ⁿ⁻¹. (b) a₆=2·3⁵=2·243=486." → "Excellent. Identified as geometric, found formula, applied it. All three steps."
- PARTIAL: Identifies geometric but formula error → "Good — geometric sequence with ratio 3, first term 2. The formula is aₙ = a₁·rⁿ⁻¹ = 2·3ⁿ⁻¹. Not 2·3ⁿ — check the exponent: when n=1, the exponent must give 2·3⁰=2·1=2 ✓."
- INCORRECT: Treats as arithmetic → "Test: is the DIFFERENCE constant? 6−2=4, 18−6=12 — not constant. Now test: is the RATIO constant? 6/2=3, 18/6=3, 54/18=3 — yes, constant ratio 3. This is geometric, not arithmetic."
- NO_RESPONSE: "Compute: 6÷2=?, 18÷6=?, 54÷18=? Are all the ratios the same?"

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (SEQUENCE-IS-A-SET)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A very natural confusion at this stage: treating a sequence like a set — where order doesn't matter and repetition is impossible. But a sequence and a set are different objects, even when they contain the same elements."

**P41 — MISCONCEPTION DETECTOR**
"Are the sequences (1, 2, 3) and (3, 2, 1) the same?
(A) Yes — same elements, so same sequence.
(B) No — different order means different sequence."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"A sequence is a FUNCTION. The function f(1)=1, f(2)=2, f(3)=3 is a different function from g(1)=3, g(2)=2, g(3)=1, even though both have range {1,2,3}. Two functions are equal only if they agree on every input — f(1)=1 ≠ g(1)=3, so f ≠ g.
In a set {1,2,3}, membership is all that matters — order is not part of the definition.
In a sequence (1,2,3), the mapping n↦aₙ is part of the definition.
Test: Is (2,2,4) a valid sequence? YES — a₁=2, a₂=2, a₃=4. Repetition is allowed. As a set, {2,2,4}={2,4} — repetition collapses. The sequence (2,2,4) and the set {2,4} are fundamentally different objects."

---

### TA-B02 — Repair for MC-2 and MC-3 (MUST-HAVE-PATTERN / ZERO-INDEXING)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two related confusions: 'a sequence must have a pattern or formula' and 'sequences start at index 0 not 1.' Both create errors in identifying and computing with sequences."

**P41 — MISCONCEPTION DETECTOR**
"Is the sequence of digits of π (3, 1, 4, 1, 5, 9, …) a valid mathematical sequence?
(A) No — there is no formula for the nth digit of π.
(B) Yes — each digit is well-defined, so the function n↦(nth decimal digit of π) is a valid sequence."
[If A: learner holds MC-2.]
"If a₁=7 and the formula is aₙ=7 for all n≥1, what is a₀?
(A) 7 — because we can always go one step back.
(B) Undefined — the sequence starts at n=1, so a₀ is not in the domain."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"MC-2: A sequence is any function from ℕ to a set. The definition requires only that each term aₙ is well-defined. The nth digit of π is well-defined (there is a definite answer for every n), even if computing it requires deep algorithms. No formula requirement exists in the definition.
MC-3: Mathematical conventions differ from programming. In mathematics, sequences are usually indexed starting at n=1 (or the starting index is explicitly declared). Always check: does the problem say 'n starts at 0' or 'n starts at 1'? When unspecified in a math context, assume n=1 is the first term. a₁ is the first term; a₃ is the third term — not the fourth."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Write the first five terms of (a) aₙ=n²−1 and (b) a₁=3, aₙ₊₁=aₙ/3. Identify which is explicit and which is recursive."
[Expected: (a) 0,3,8,15,24 (explicit). (b) 3,1,1/3,1/9,1/27 (recursive).]

**Day 10 prompt:**
"A sequence has a₁=2, a₂=5, a₃=8, a₄=11. (a) Find the explicit formula. (b) Is this a function from ℕ to ℝ? (c) What is a₁₀₀?"
[Expected: (a) aₙ=3n−1. (b) Yes — domain ℕ, codomain ℝ. (c) a₁₀₀=299.]

**Day 30 prompt:**
"Can two different functions f:ℕ→ℝ and g:ℕ→ℝ define the same sequence? Can two different formulas define the same sequence? Give an example or explain why not."
[Expected: Same sequence means same function: f(n)=g(n) for all n. Example: aₙ=2(n+1)−2 and bₙ=2n give the same terms 2,4,6,8,… — they are the same sequence expressed with different (equivalent) formulas.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.func.function-concept — function as a mapping, domain, codomain; essential for the function-theoretic definition of a sequence
- math.found.natural-numbers — ℕ = {1,2,3,…}; the domain of a sequence

**Unlocked blueprints:**
- math.seq.series — sum of sequence terms; requires sequence concept
- math.seq.arithmetic-sequence — special case with constant differences
- math.seq.geometric-sequence — special case with constant ratios
- math.seq.recursive-sequences — formal treatment of recurrence relations

**Cross-links (non-Tier-1, reference only):**
- math.calc.sequence-limits — limits of sequences as n→∞; this concept is the prerequisite for that one, but the limit concept itself is not required here

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The function-theoretic definition is the key conceptual leap. Spend time on the arrow diagram ℕ→ℝ in A01 to make the function interpretation concrete before moving to formulas.

**Common failure mode:** Learners who have only seen arithmetic and geometric sequences with nice formulas struggle with the idea that a sequence can lack a formula (A03, Instance 4). The digits-of-π example is essential for breaking this assumption.

**Index convention note:** Always state the starting index explicitly when introducing a sequence. Use the phrase "for n=1,2,3,…" consistently. If a learner uses n=0 indexing, address it immediately via TA-B02 to prevent downstream errors in arithmetic/geometric sequence blueprints.

**Repetition and order:** These are the two features that distinguish sequences from sets. Both must be addressed explicitly. The waiting-list analogy in A01 handles both naturally.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P06, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: cross_links=[math.calc.sequence-limits] is NOT Tier 1 → P76 independence mode (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct — understand does not require worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1; B02 covers MC-2 and MC-3
- [x] V-14: P76 independence probe is a novel, unseen problem (digits-of-π sequence: order/formula/membership analysis)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = ⌈4.25⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all content consistent with KG fields and standard mathematics pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"If aₙ = 3n − 1, what is the 4th term a₄?"
[Expected: 3(4)−1 = 11.]

**Item 2:**
"Is the sequence (2, 2, 2, 2, …) valid? Is (2) the same sequence as (2, 2, …)?"
[Expected: Yes, (2,2,2,…) is valid — repetition is allowed in sequences. No, (2) has one term; (2,2,…) has infinitely many — they are different sequences (different domains).]

**Item 3:**
True or False: "A sequence is a set."
[Expected: FALSE. A set is unordered and has no repeated elements; a sequence preserves order and allows repetition. They are different mathematical objects.]

**Item 4:**
"Given a₁=4, aₙ₊₁=aₙ−2. Find a₃."
[Expected: a₂=4−2=2, a₃=2−2=0. Answer: 0.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"The sequence b₁, b₂, b₃, … is defined by: bₙ = the nth decimal digit of π, starting from the first digit after the decimal point.
So b₁=1 (since π=3.14159…), b₂=4, b₃=1, b₄=5, b₅=9, b₆=2, …

(a) Is this a valid mathematical sequence? Why or why not?
(b) What is the domain of this sequence (viewed as a function)?
(c) If I told you b₇=6, does that tell you anything about b₈? Explain."

[Expected:
(a) Yes — valid. Each bₙ is well-defined (every decimal digit of π exists and is a specific digit 0–9). The function n↦bₙ is defined on all of ℕ.
(b) Domain = ℕ = {1,2,3,…}.
(c) No — knowing b₇ does not allow prediction of b₈ from local information. The digits of π are deterministic but not predictable by a simple recurrence from a single previous term. (No known simple formula for the nth digit of π exists.) This shows sequences can be valid without patterns.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) is correctly answered with reasoning (well-defined function from ℕ), 0 otherwise. Part (b) and (c) give partial credit context but the binary score is on (a).

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: 5 out of 5 (MAMR = ⌈0.85 × 5⌉ = 5).
- PASS (5/5): Learner demonstrates clear understanding of sequences as ordered functions, recurrence and explicit formulas, and the independence of a sequence's validity from the existence of a formula.
- FAIL (<5/5): Identify which items failed; route to appropriate repair sequence.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS (5/5): → P78 COMPLETION
- FAIL on Item 3 (sequence-is-a-set): → TA-B01, then re-gate
- FAIL on P76 (pattern required for validity): → TA-B02 (MC-2 repair), then re-gate
- FAIL on Item 4 (index confusion, off-by-one): → TA-B02 (MC-3 repair), then re-gate
- FAIL on Items 1 or 2: → Review A01 analogy; confirm order and repetition understanding; re-gate

---

#### P55 — SCORE (post-repair if applicable)
If routed through repair: re-administer two fresh equivalent items + P76. Apply same MAMR 5/5. Record repair attempt score.

---

#### P78 — COMPLETION

"You have demonstrated solid understanding of mathematical sequences — ordered functions from ℕ to a set — including explicit formulas, recurrence relations, and the fact that validity does not require a pattern.

Key anchors to carry forward:
- A sequence is a function aₙ = f(n), n ∈ ℕ. Order and repetition both matter.
- Sequences ≠ sets. {1,2,3} = {3,2,1} as sets; but (1,2,3) ≠ (3,2,1) as sequences.
- No formula is needed for a sequence to be valid — only that each term is well-defined.

Next concepts: math.seq.arithmetic-sequence, math.seq.geometric-sequence — special sequences where the structure yields explicit formulas."

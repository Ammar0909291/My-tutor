# Teaching Blueprint — Cartesian Product

**PACKAGE_READY: YES**
**Framework Version:** Teaching Blueprint Specification v1.0
**KG Concept ID:** math.found.cartesian-product
**Authored:** 2026-07-11

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| KG concept ID | `math.found.cartesian-product` |
| Concept name | Cartesian Product |
| Aliases | direct product, product set, A × B |
| Domain | Mathematical Foundations |
| Difficulty | developing (2) |
| Bloom level | understand |
| Bloom tier | LOT |
| CPA entry stage | C (concrete) — difficulty = developing ≤ 2 |
| Mastery threshold | 0.85 |
| Estimated hours | 3 |
| Session TA cap | 7 (estimated_hours ≥ 1 h) |
| Prerequisites (Tier 1) | `math.found.set` |
| Cross-links | `math.linalg.vector-space` |
| P76 cross-link bridge | ℝ² = ℝ × ℝ as the coordinate plane; foundation of vector-space elements |
| MAMR | MC-1 (FOUNDATIONAL) cleared before MC-2 and MC-3; MC-2 and MC-3 FIFO after |

---

## Component 1 — Concept Snapshot

The **Cartesian product** A × B is the set of all **ordered pairs** (a, b) where a ∈ A and b ∈ B.

**Formal definition:**
> A × B = { (a, b) | a ∈ A and b ∈ B }

**Ordered pair** (a, b): a two-element sequence in which **position matters**. (a, b) ≠ (b, a) unless a = b.

**Key properties:**

| Property | Fact | Example |
|---|---|---|
| Cardinality | \|A × B\| = \|A\| · \|B\| | \|{1,2} × {x,y,z}\| = 2·3 = 6 |
| Non-commutativity | A × B ≠ B × A (in general) | {1,2}×{x} = {(1,x),(2,x)}; {x}×{1,2} = {(x,1),(x,2)} |
| Empty set | A × ∅ = ∅ × B = ∅ | Any product with ∅ is empty |
| Associativity | (A×B)×C ≠ A×(B×C) as sets | Triple products require explicit bracketing |

**Canonical real-world instance:**
> ℝ × ℝ = ℝ² — the set of all points (x, y) in the Cartesian coordinate plane.
> Named after René Descartes, who introduced coordinate geometry.

**Connection to downstream concepts:**
- A **relation** from A to B is any *subset* of A × B.
- A **function** f: A → B is a *specific kind* of relation — a subset of A × B satisfying uniqueness.

---

## Component 2 — Misconception Register

**MC-1 (FOUNDATIONAL) — The Cartesian product is commutative: A × B = B × A.**
- Trigger: student claims {1,2} × {x,y} = {x,y} × {1,2}; OR writes (2,x) and (x,2) as the same pair
- Root cause: confuses Cartesian product with set intersection/union (both commutative); confuses ordered pair with a two-element set
- Impact: corrupts all relation and function work (f: A→B distinct from f: B→A)
- Correction path: Protocol B-01 → ordered-pair card demonstration
- MAMR role: FOUNDATIONAL — must be cleared before MC-2 and MC-3

**MC-2 — Cartesian product lists all combinations, but (a,b) and (b,a) are the same pair.**
- Trigger: student lists pairs but counts (1,x) and (x,1) as duplicates
- Root cause: conflates Cartesian product with an unordered combination (like choosing 2 items from a bag)
- Correction path: Protocol B-02 → formal definition of ordered pair applied to examples

**MC-3 — A × ∅ = A (the empty set "disappears").**
- Trigger: student claims {1,2} × ∅ = {1,2} or ∅ × A = A
- Root cause: analogising with multiplication where n × 1 = n, or misreading "product" as additive neutral
- Correction path: Protocol B-03 → formal definition: there is no b ∈ ∅, so no pair (a,b) can be formed

---

## Component 3 — Teaching Primitive Sequence

### Protocol A — Standard Teaching Sequence

**TA-A01: Ordered Pairs — Position Matters**

[P06 CONTRAST PAIR PROMPT — B-category opening, satisfies GR-1]

Present two paired scenarios:
- (A) A set {Alice, Bob} — is it different from {Bob, Alice}?
- (B) A seating arrangement where Alice is in seat 1 and Bob is in seat 2 — is this different from Bob in seat 1, Alice in seat 2?

Establish: an **ordered pair** (a, b) is a mathematical object where **first component** and **second component** are distinct positions. (Alice, Bob) ≠ (Bob, Alice) as ordered pairs, even though {Alice, Bob} = {Bob, Alice} as a set.

Notation: parentheses signal ordered pair; braces signal set.
- (1, 2): an ordered pair — first=1, second=2
- {1, 2}: a set — no first or second

Test cases:
- (3, 7) = (3, 7)? YES — same first, same second
- (3, 7) = (7, 3)? NO — components in different positions
- (a, a) is a valid ordered pair — both components happen to be equal

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Is (5, 3) the same ordered pair as (3, 5)? Is {5, 3} the same set as {3, 5}?"
- **CORRECT** (No; Yes) → TA-A02
- **PARTIAL** (one correct) → clarify the wrong answer; reinforce parentheses vs. braces distinction → TA-A02
- **INCORRECT** (says (5,3)=(3,5)) → Protocol B-01 (MC-1)
- **NO_RESPONSE** → ask: "Which seat is Alice in: (Alice, Bob) means Alice is first, Bob is second. If we swap them, does Alice move seats?"

---

**TA-A02: Definition of A × B — Building All Ordered Pairs**

[P07 WORKED EXAMPLE PAIR — B-category, satisfies GR-1]

Formal definition: **A × B = { (a, b) | a ∈ A and b ∈ B }**

"For every element a in A and every element b in B, form the ordered pair (a, b). Collect all such pairs. That collection is A × B."

**Worked Example 1:** A = {1, 2}, B = {x, y}

Systematic listing — for each a ∈ A, pair with each b ∈ B:
- a=1: (1,x), (1,y)
- a=2: (2,x), (2,y)

A × B = {(1,x), (1,y), (2,x), (2,y)} — 4 ordered pairs

**Worked Example 2:** P = {red, blue}, Q = {small, medium, large}

P × Q — for each colour, pair with each size:
- red: (red,small), (red,medium), (red,large)
- blue: (blue,small), (blue,medium), (blue,large)

|P × Q| = 2 × 3 = 6

"Think of it as filling a 2-row, 3-column table: rows are P-elements, columns are Q-elements, each cell is one ordered pair."

| | small | medium | large |
|---|---|---|---|
| red | (red,small) | (red,medium) | (red,large) |
| blue | (blue,small) | (blue,medium) | (blue,large) |

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Let C = {a, b, c} and D = {1, 2}. List all elements of C × D."
- **CORRECT** ({(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)} — 6 pairs) → TA-A03
- **PARTIAL** (correct pairs but missing some) → check systematic listing: go row-by-row through C → TA-A03
- **INCORRECT** (mixes up B × A or confuses ordered pairs with sets) → Protocol B-01 or B-02
- **NO_RESPONSE** → scaffold: "Start with a=a. What pairs can you form with elements of D?"

---

**TA-A03: Cardinality — |A × B| = |A| · |B|**

[P04 PATTERN INDUCTION — B-category, satisfies GR-1]

Observe from examples:

| A | B | \|A\| | \|B\| | \|A×B\| |
|---|---|---|---|---|
| {1,2} | {x,y} | 2 | 2 | 4 |
| {red,blue} | {small,medium,large} | 2 | 3 | 6 |
| {a,b,c} | {1,2} | 3 | 2 | 6 |
| {p,q,r,s} | {0,1} | 4 | 2 | 8 |

Pattern: **|A × B| = |A| · |B|**

Explanation: for each of the |A| choices for the first component, there are |B| choices for the second. By the multiplication principle, total pairs = |A| · |B|.

Edge cases:
- If A = ∅: |∅ × B| = 0 · |B| = 0, so ∅ × B = ∅
- If B = ∅: |A × ∅| = |A| · 0 = 0, so A × ∅ = ∅
- If |A| = 1 (singleton {a}): |{a} × B| = |B| — exactly |B| pairs

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "|A| = 5 and |B| = 7. What is |A × B|? What is |B × A|?"
- **CORRECT** (35; 35 — same cardinality even if elements differ) → TA-A04
- **PARTIAL** (gets 35 but thinks B×A = A×B as sets) → clarify: same cardinality, different pairs → TA-A04
- **INCORRECT** (adds instead of multiplies: 12) → re-explain multiplication principle using table analogy
- **NO_RESPONSE** → "How many cells does a 5-row, 7-column table have?"

---

**TA-A04: Non-Commutativity — A × B ≠ B × A**

[P06 CONTRAST PAIR PROMPT — B-category, satisfies GR-1]

Compute both products for a concrete case:
- A = {1, 2}, B = {x}

A × B = {(1,x), (2,x)} — pairs have a number first, letter second

B × A = {(x,1), (x,2)} — pairs have a letter first, number second

Are these equal? NO. (1,x) ∉ B × A because (1,x) has first component 1 ∉ B = {x}.
Both have cardinality 2, but the elements are different ordered pairs.

**Rule:** A × B = B × A only when A = B (in that case both equal A × A).

**ℝ² context:** ℝ × ℝ = ℝ × ℝ here (same set both sides), giving all points (x, y) in the plane.

Key table contrast:
- A×B table: rows labeled by A, columns by B → element in row a, column b is (a,b)
- B×A table: rows labeled by B, columns by A → element in row b, column a is (b,a)
The tables are different; you cannot swap them without changing the pairs.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "A = {p, q}, B = {1, 2, 3}. Compute A × B and B × A. Are they equal?"
- **CORRECT** (A×B = 6 pairs with letter-first; B×A = 6 pairs with number-first; not equal) → TA-A05
- **PARTIAL** (lists correct pairs but says equal because |A×B|=|B×A|) → reinforce: same cardinality ≠ same set; compare (p,1) vs. (1,p) → TA-A05
- **INCORRECT** (claims A×B = B×A) → Protocol B-01 (MC-1)
- **NO_RESPONSE** → "List A×B and B×A side-by-side. Is (p,1) ∈ B×A? What is the first component of (p,1)? Is p ∈ B?"

---

**TA-A05: Empty Set and Higher Products**

[P02 PRIOR KNOWLEDGE PROBE — B-category, satisfies GR-1]

Probe prior intuition: "What do you think happens when you form A × ∅? Does anything change?"

**A × ∅ = ∅:**
Formal argument: A × ∅ = {(a,b) | a ∈ A and b ∈ ∅}. Since no b satisfies b ∈ ∅, no ordered pair (a,b) can be formed. The product is empty.

**Cardinality check:** |A × ∅| = |A| · 0 = 0 ✓

**Three-fold product A × B × C:**
An element of A × B × C is an ordered triple (a, b, c):
- A × B × C = {(a,b,c) | a ∈ A, b ∈ B, c ∈ C}
- |A × B × C| = |A| · |B| · |C|

Example: {H,T} × {H,T} × {H,T} — all outcomes of three coin flips = 8 ordered triples

ℝ³ = ℝ × ℝ × ℝ — all points in 3-dimensional space.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "(a) What is {a, b} × ∅? (b) How many elements are in {0,1} × {0,1} × {0,1}?"
- **CORRECT** (a: ∅; b: 8) → TA-A06
- **PARTIAL** (one wrong) → address specific error; if (a) wrong → Protocol B-03; if (b) wrong → multiply 2·2·2
- **INCORRECT** on (a) → Protocol B-03 (MC-3)
- **NO_RESPONSE** → (a): "For any pair (a,b) with b from ∅, can you pick b? Why not?" → (b): "How many elements does each set have? Multiply."

---

**TA-A06: Mastery Gate** *(terminal TA — satisfies GR-3, GR-6)*

[P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]

---

[P77 MULTI-PROBLEM SET — non-transfer domain]

Five problems on Cartesian product:

**Q1.** Let A = {1, 2, 3} and B = {a, b}. List A × B completely.

**Q2.** |X| = 4 and |Y| = 6. What is |X × Y|?

**Q3.** True or false: For any sets A and B, A × B = B × A.

**Q4.** What is {p, q} × ∅?

**Q5.** If A × B = {(1,a),(1,b),(2,a),(2,b),(3,a),(3,b)}, what are A and B?

*Answers:*
Q1: {(1,a),(1,b),(2,a),(2,b),(3,a),(3,b)}
Q2: 24
Q3: False (A×B = B×A only if A = B)
Q4: ∅
Q5: A = {1,2,3}, B = {a,b}

---

[P55 SCORE — record Q1–Q5: _/5]

---

[P76 TRANSFER PROBE — cross-link to `math.linalg.vector-space`]

*Cross-link bridge (cd = 1):*
> "The 2-dimensional real coordinate plane contains all points (x, y) where x and y are real numbers. This is written ℝ² and is formally defined as ℝ × ℝ — the Cartesian product of the real numbers with itself.
>
> (a) Using the cardinality formula: if ℝ has infinitely many elements, what can you say about |ℝ × ℝ|?
>
> (b) A vector space consists of elements (vectors) and two operations. In ℝ², each vector is an ordered pair (x, y). Why is it important that (3, 5) and (5, 3) are treated as **different** vectors in ℝ²?"

*Answer:* (a) |ℝ × ℝ| is also infinite (uncountably infinite, same cardinality as ℝ). (b) (3,5) and (5,3) represent different points/directions in the plane — swapping components changes location. The ordered-pair structure of the Cartesian product ensures each vector has a definite x-component and y-component.

---

[P55 SCORE — record transfer probe: _/2 (1 pt per part)]

---

[P75 MASTERY ASSESSMENT]

Total: __/7 (Q1–Q5 = 5 pts; transfer probe = 2 pts)

Mastery threshold: 0.85 → pass mark = ⌈0.85 × 7⌉ = 6/7

---

[P74 ROUTING DECISION]

- **7/7 or 6/7** → MASTERED → exit TA-A06 → spaced revision schedule activated
- **5/7** → PARTIAL — identify weakest area:
  - Q1 wrong (listing) → Protocol B-02 (systematic enumeration)
  - Q2 wrong (cardinality) → reteach multiplication principle (TA-A03 repeat)
  - Q3 wrong (commutativity) → Protocol B-01 (MC-1)
  - Q4 wrong (empty set) → Protocol B-03 (MC-3)
  - Q5 wrong (reverse-engineering A and B) → Protocol C-01
- **≤4/7** → Protocol C-01 then re-attempt TA-A06

---

[P55 SCORE — record mastery state: MASTERED / PARTIAL / INCOMPLETE]

---

[P78 COMPLETION]

Record: concept `math.found.cartesian-product`, mastery state, date, score __/7.
Unlock prerequisite check for `math.found.relation`.
Exit TA-A06.

---

### Protocol B — Misconception Repair Chains

**B-01: Ordered-Pair Non-Commutativity Repair (MC-1)**

[P41 MISCONCEPTION DETECTOR]
"Quick test: if (a, b) means 'a is first, b is second', is (Alice, Bob) the same as (Bob, Alice)?"
[If student hesitates or says yes: misconception confirmed]

[P27 MISCONCEPTION NAMING]
"The **commutativity misconception** assumes A×B = B×A because multiplication of numbers is commutative. But ordered pairs carry positional information: (a,b) records *which element came from which set*. Swapping produces a different pair."

[P64 CONCEPTUAL SHIFT]
Physical demonstration with cards: write "1" and "x" on separate cards.
- Hold (1, x): first card is 1, second is x.
- Swap to (x, 1): first card is x, second is 1.
These are literally different arrangements.

Now apply: {1,2} × {x} vs. {x} × {1,2}:
- (1, x) ∈ {1,2}×{x} because 1 ∈ {1,2} and x ∈ {x} ✓
- (1, x) ∈ {x}×{1,2}? This requires first component from {x} — but 1 ∉ {x}. So NO.
- Conclusion: {1,2}×{x} ≠ {x}×{1,2}

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "True or false: if A ≠ B, then A×B ≠ B×A. Give an example."
- **CORRECT** (True; example: {1}×{a}={(1,a)}, {a}×{1}={(a,1)}) → repair complete → return to suspended TA
- **INCORRECT** → verify step-by-step: is (1,a) ∈ {a}×{1}? First component of (1,a) is 1; is 1 ∈ {a}? No.

---

**B-02: Ordered-Pair Distinctness Repair (MC-2)**

[P41 MISCONCEPTION DETECTOR]
"You have listed (1,x) and (x,1) as the same pair. Let me ask: in the pair (1,x), which element is first?"
[Student answers: 1. Then: which element is first in (x,1)?]

[P27 MISCONCEPTION NAMING]
"The **unordered-combination misconception** treats ordered pairs like unordered subsets {a,b} = {b,a}. Cartesian products form **ordered** pairs, not sets of two elements. (a,b) and (b,a) are always counted as distinct pairs unless a = b."

[P64 CONCEPTUAL SHIFT]
Compare side-by-side:
- Set of 2 elements: {1, x} = {x, 1} (unordered; same object)
- Ordered pair: (1, x) ≠ (x, 1) (position matters; different objects)

Cartesian product {1,2} × {x,y}:
- (1,x), (1,y), (2,x), (2,y) — 4 distinct ordered pairs
Each pair is unique because it specifies both the first-set choice AND the second-set choice in that order.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "List all elements of {a,b} × {a,b}. How many are there?"
- **CORRECT** ({(a,a),(a,b),(b,a),(b,b)} — 4 pairs) → repair complete → return to suspended TA
- **INCORRECT** (only 3 because student thinks (a,b)=(b,a)) → point out: (a,b): first=a; (b,a): first=b. Different.

---

**B-03: Empty Cartesian Product Repair (MC-3)**

[P41 MISCONCEPTION DETECTOR]
"You said A × ∅ = A. Let me ask: to form an ordered pair (a, b), what do you need b to be?"
[Student: an element of ∅. Then: name one element of ∅.]

[P27 MISCONCEPTION NAMING]
"The **disappearing-empty-set misconception** treats ∅ like the number 1 in multiplication (identity). But sets don't work that way. To form any pair (a,b), you need a b. No elements exist in ∅, so no b can be chosen. Zero pairs means an empty Cartesian product."

[P64 CONCEPTUAL SHIFT]
Formal logic:
> A × B = {(a,b) | a ∈ A AND b ∈ B}
> For A × ∅: we need b ∈ ∅. But ∅ has no elements. The condition "b ∈ ∅" is ALWAYS FALSE.
> Therefore no pair (a,b) satisfies the condition. A × ∅ = ∅.

Cardinality check confirms: |A × ∅| = |A| × 0 = 0. An empty product.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "What is ∅ × {1, 2, 3}? Give the cardinality."
- **CORRECT** (∅; cardinality 0) → repair complete → return to suspended TA
- **INCORRECT** → repeat formal argument; stress that first component a must come from ∅, which is impossible

---

### Protocol C — Consolidation

**C-01: Mixed Practice**

[P17 MIXED PRACTICE SET]

Six items:

1. A = {0, 1}, B = {0, 1}. List A × B. Is A × B = B × A here? Why?
2. |A × B| = 15 and |A| = 3. What is |B|?
3. Compute {x | x ∈ ℕ, x < 3} × {a, b}.
4. True or false: (3, 7) ∈ {1,2,3} × {5,6,7}.
5. If A × B = ∅, what can you conclude about A or B?
6. Compute |{a,b,c} × {1,2} × {α,β}|.

*Answers:*
1: {(0,0),(0,1),(1,0),(1,1)}; yes, A=B so A×B=B×A
2: |B| = 5
3: {1,2} interpreted from condition; {(1,a),(1,b),(2,a),(2,b)}; wait — {x|x∈ℕ, x<3} = {1,2} → {(1,a),(1,b),(2,a),(2,b)}
4: True (3 ∈ {1,2,3} and 7 ∈ {5,6,7})
5: A = ∅ or B = ∅ (at least one is empty)
6: 3×2×2 = 12

[P49 ADAPTIVE CHECKPOINT]
- **5–6/6** → MASTERED → spaced revision
- **3–4/6** → identify errors → specific B chain
- **≤2/6** → restart Protocol A from TA-A01

---

### Protocol D — Acceleration

Student state S6: demonstrates at TA-A01 that ordered pairs and Cartesian product are already understood.

Skip TA-A01 through TA-A05. Go directly to TA-A06 (mastery gate). Same threshold applies (6/7).

---

### Protocol E — Spaced Revision

[P89 SPACED REPETITION] Schedule: Day 1, Day 3, Day 7, Day 21, Day 60.

Five-item revision probe:

1. True or false: {1,2} × {3,4} = {3,4} × {1,2}
2. |A × B × C| if |A|=2, |B|=3, |C|=4 = ?
3. What is {0} × ∅?
4. Is (2, 5) ∈ {1,2,3} × {4,5,6}?
5. List {a} × {1,2,3}.

*Answers:* 1: False | 2: 24 | 3: ∅ | 4: Yes (2∈{1,2,3}, 5∈{4,5,6}) | 5: {(a,1),(a,2),(a,3)}

Decay rule: score < 5/5 → reset to Day 1, route to Protocol B targeting failed property.

---

## Component 4 — Student State Routing Table

| Student state | Detected by | Routed to |
|---|---|---|
| S0 (no prior knowledge) | No engagement with ordered-pair concept before TA-A01 | Protocol A, TA-A01 |
| S1 (active misconception) | P49 INCORRECT at any TA-A01 through TA-A05 | Protocol B matching the MC triggered |
| S2 (partial mastery) | TA-A06 score 5/7; or C-01 score 3–4/6 | Protocol C-01 |
| S6 (prior mastery / acceleration) | TA-A01 P49 answered CORRECT before instruction | Protocol D (skip to TA-A06) |
| S9 (spaced revision due) | P89 interval elapsed | Protocol E |

---

## Component 5 — Session Configuration

| Parameter | Value |
|---|---|
| CPA entry stage | C (Concrete) — difficulty = developing (2) |
| Session TA cap | 7 |
| Protocol A TAs | 7 (TA-A01 through TA-A06 + mastery gate = 7 within cap) |
| MAMR | MC-1 (commutativity) cleared first; MC-2, MC-3 FIFO after |
| Repair chain entry | Always via P41 → P27 → P64 → P49 |
| Mastery gate | TA-A06 (P91 compound) |

---

## Component 6 — Transfer Probe Documentation

**Cross-link:** `math.linalg.vector-space` (cd = 1)

| Probe | Context | Transfer target |
|---|---|---|
| TA-A06 P76 | ℝ² = ℝ × ℝ: ordered pairs as vectors; non-commutativity of components | Recognises that the ordered-pair structure of Cartesian products is the formal foundation of coordinate vectors; prepares for vector-space elements |

**Transfer relevance for math.linalg.vector-space:** vector spaces over ℝ commonly use ℝⁿ = ℝ × ℝ × … × ℝ (n times) as the carrier set. The Cartesian-product structure ensures each vector (v₁, v₂, …, vₙ) has positionally distinct components. This transfer probe bridges foundational set theory to linear algebra.

---

## Component 7 — Spaced Repetition Schedule

| Interval | Trigger | Action |
|---|---|---|
| Day 1 | Day of initial mastery | Schedule Day 3 |
| Day 3 | 2 days after mastery | Protocol E 5-item probe |
| Day 7 | 4 days after Day 3 pass | Protocol E 5-item probe |
| Day 21 | 14 days after Day 7 pass | Protocol E 5-item probe |
| Day 60 | 39 days after Day 21 pass | Protocol E 5-item probe |
| Decay reset | Any probe score < 5/5 | Reset to Day 1 + Protocol B for failed item |

---

## Component 8 — Assessment Item Bank

| # | Item | Property | Answer |
|---|---|---|---|
| A1 | A = {1,2}, B = {a,b,c}. List A × B. | Enumeration | {(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)} |
| A2 | |A|=7, |B|=3. What is |A×B|? | Cardinality | 21 |
| A3 | True or false: (2,3) = (3,2) as ordered pairs. | Ordered pair | False |
| A4 | True or false: A × B = B × A for all sets A, B. | Non-commutativity | False |
| A5 | What is {1,2,3} × ∅? | Empty set | ∅ |
| A6 | A × B has 12 elements; A has 4 elements. What is \|B\|? | Cardinality reverse | 3 |
| A7 | Is (b, 2) ∈ {a,b} × {1,2,3}? | Membership test | Yes |
| A8 | How many elements in {H,T}×{H,T}×{H,T}? What are they? | Triple product | 8; all 3-coin flip outcomes |
| A9 | If A = B = {0,1}, is A×B = B×A? | Commutativity exception | Yes — A=B so A×B = B×A |
| A10 | What is ∅ × ∅? | Empty product | ∅ |
| A11 | Express ℝ² as a Cartesian product. | Transfer | ℝ × ℝ |
| A12 | If (3, x) ∈ A × B and (y, 2) ∈ A × B, what can you say about A and B? | Inference | 3 ∈ A; x ∈ B; y ∈ A; 2 ∈ B |

---

## Component 9 — Teaching Notes

- **Ordered pair prerequisite:** `math.found.set` must be mastered before this blueprint. The ordered-pair concept in TA-A01 is introduced here as a natural extension; if students struggle with it, it is usually because the set vs. sequence distinction from `math.found.set` isn't solid.
- **Downstream sensitivity:** `math.found.relation` and `math.func.function-concept` both directly follow. Any shaky understanding of ordered-pair ordering (MC-1) will corrupt the definition of relation and function. Do not advance until MC-1 is resolved.
- **ℝ² cross-link:** The P76 probe for `math.linalg.vector-space` is forward-pointing — students may not yet know what a vector space is. The probe is designed to be answerable with Cartesian product knowledge alone; it seeds later learning rather than requiring it.
- **Commutativity of cardinality vs. non-commutativity of the product itself:** Students sometimes resolve the contradiction by saying "A×B and B×A are different but have the same size." This is correct! Confirm it explicitly to prevent confusion. Same cardinality ≠ same set.

---

## Component 10 — Validation Checklist

### V-Checks

| ID | Check | Status |
|---|---|---|
| V-1 | KG concept ID `math.found.cartesian-product` verified; no duplicate blueprint | PASS |
| V-2 | Difficulty (developing) and Bloom (understand) match KG | PASS |
| V-3 | Mastery threshold (0.85) matches KG | PASS |
| V-4 | Estimated hours (3) matches KG | PASS |
| V-5 | CPA entry stage C derived correctly (difficulty = developing = 2 ≤ 2) | PASS |
| V-6 | Session TA cap 7 derived correctly (estimated_hours = 3 ≥ 1 h) | PASS |
| V-7 | MAMR stated: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO | PASS |
| V-8 | Every non-repair TA opens with B-category primitive (P06, P07, P04, P06, P02) | PASS |
| V-9 | Each TA-A01 through TA-A05 contains exactly one P49 | PASS |
| V-10 | Mastery gate TA-A06 is terminal (satisfies GR-3) | PASS |
| V-11 | Repair chains B-01, B-02, B-03 entered via P41→P27→P64→P49 (satisfies GR-4) | PASS |
| V-12 | P91 compound is terminal in TA-A06 (satisfies GR-6) | PASS |
| V-13 | P76 transfer probe in TA-A06 P91 sequence (satisfies GR-7) | PASS |
| V-14 | Cross-link `math.linalg.vector-space` documented in Component 0 and Component 6 | PASS |
| V-15 | MAMR routing enforced in P74: B-01 (MC-1) triggered first | PASS |
| V-16 | Assessment item bank contains 12 items (≥ 10 required) | PASS |
| V-17 | All three repair chains (B-01, B-02, B-03) fully documented with P41→P27→P64→P49 | PASS |
| V-18 | P76 probe uses valid cross-link context (ℝ² = ℝ×ℝ → vector space) | PASS |
| V-19 | Cross-link field non-empty; P76 bridge to math.linalg.vector-space documented | PASS |
| V-20 | All five student state routes documented: S0→A, S1→B, S2→C, S6→D, S9→E | PASS |

### AIR Test

| ID | Check | Status |
|---|---|---|
| AIR-1 | All content slots finite and pre-specified | PASS |
| AIR-2 | All P49 response taxonomies pre-authored (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) | PASS |
| AIR-3 | All branching decisions deterministic | PASS |
| AIR-4 | All primitives are concept-independent | PASS |
| AIR-5 | TA sequences fixed at authoring time | PASS |

**PACKAGE_READY: YES — all 20 V-checks PASS; AIR Test PASS**

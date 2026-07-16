# Teaching Blueprint — Set

**PACKAGE_READY: YES**
**Framework Version:** Teaching Blueprint Specification v1.0
**KG Concept ID:** math.found.set
**Authored:** 2026-07-11

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| KG concept ID | `math.found.set` |
| Concept name | Set |
| Aliases | collection, class |
| Domain | Mathematical Foundations |
| Difficulty | foundational (1) |
| Bloom level | remember |
| Bloom tier | LOT |
| CPA entry stage | C (concrete) — difficulty = foundational |
| Mastery threshold | 0.90 |
| Estimated hours | 2 |
| Session TA cap | 7 (estimated_hours ≥ 1 h) |
| Prerequisites (Tier 1) | `math.found.set-theory` |
| Cross-links | none |
| P76 independence | YES — cross_links = [ ]; all transfer probes use self-contained real-world contexts |
| MAMR | MC-1 (FOUNDATIONAL) cleared before MC-2 and MC-3; MC-2 and MC-3 FIFO after |

---

## Component 1 — Concept Snapshot

A **set** is a well-defined, unordered collection of **distinct** objects. The objects are called **elements** or **members**. Three defining properties hold simultaneously:

1. **Well-defined** — for any object, there is an unambiguous YES or NO answer to "does this object belong to the set?"
2. **Unordered** — {1, 2, 3} and {3, 1, 2} are the same set; listing order carries no meaning.
3. **No repetition (distinct elements)** — {a, b, a, c} = {a, b, c}; duplicates are ignored.

**Notation:**

| Form | Syntax | Example |
|---|---|---|
| Roster (listing) | {e₁, e₂, …, eₙ} | {2, 4, 6, 8} |
| Set-builder | {x \| P(x)} | {x \| x is an even natural number and x < 10} |
| Empty set | ∅ or {} | the set with no elements |

**Key distinctions:**

| Structure | Ordered? | Repetition allowed? |
|---|---|---|
| Set | NO | NO |
| Sequence / list | YES | YES |
| Multiset | NO | YES |

**Cardinality** \|S\| = the number of distinct elements. \|∅\| = 0.

---

## Component 2 — Misconception Register

**MC-1 (FOUNDATIONAL) — Sets preserve order and allow repetition, like lists.**
- Trigger: student writes {1, 2, 1} and claims it has 3 elements; OR claims {1, 2} ≠ {2, 1}
- Root cause: overgeneralises from everyday sequential and list structures (arrays, sequences)
- Impact: corrupts all downstream work on set equality, Cartesian products, and functions
- Correction path: Protocol B-01 → contrast set vs. list, count distinct elements only
- MAMR role: FOUNDATIONAL — must be cleared before any other repair

**MC-2 — Any description in language defines a valid set ("the set of tall people").**
- Trigger: student accepts non-well-defined descriptions as valid sets; doesn't apply the YES/NO membership test
- Root cause: conflates natural-language "collections" with formal mathematical sets
- Correction path: Protocol B-02 → YES/NO membership criterion drill

**MC-3 — The empty set is undefined; OR ∅ ∈ ∅; OR {∅} = ∅.**
- Trigger: student claims ∅ "doesn't make sense"; counts |{∅}| = 0; confuses ∅ with {∅}
- Root cause: zero-object concept feels meaningless; visual similarity between ∅ and {}
- Correction path: Protocol B-03 → counting exercise distinguishing ∅ from {∅}

---

## Component 3 — Teaching Primitive Sequence

### Protocol A — Standard Teaching Sequence

**TA-A01: What Is a Set?**

[P06 CONTRAST PAIR PROMPT — B-category opening, satisfies GR-1]

Present two parallel scenarios:
- Scenario 1: A bag of marbles vs. a numbered queue of people. Which one preserves position? Which one cares whether the same object appears twice?
- Scenario 2: Is the collection {apple, banana, apple} the same as {apple, banana} in everyday language? What about in mathematics?

Deliver the definition:
> "In mathematics, a **set** is a well-defined collection of **distinct** objects with **no particular order**. The objects inside are called elements."

Three properties to anchor:
1. Well-defined criterion
2. Unordered
3. No repetition (distinct elements only)

Concrete examples:
- {1, 2, 3} is a set; {3, 2, 1} is the same set
- {a, b, a, c} = {a, b, c} — the duplicate a is not recorded twice
- {vowels in English} = {a, e, i, o, u} — a well-defined set

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Is {red, blue, red} a valid set? If so, how many elements does it have?"
- **CORRECT** (yes, 2 elements) → TA-A02
- **PARTIAL** (says 3 elements or "invalid") → clarify: duplicates are dropped, {red, blue, red} = {red, blue}, has 2 elements → TA-A02
- **INCORRECT** (says order matters OR accepts 3 elements without question) → Protocol B-01 (MC-1)
- **NO_RESPONSE** → re-present with three physical objects: two red cards and one blue card; count distinct colors → retry probe

---

**TA-A02: Well-Defined vs. Not Well-Defined Collections**

[P01 KNOWLEDGE ACTIVATION — B-category, satisfies GR-1]

Activate: "Before we can call something a set, there must be a clear YES or NO answer to 'does this object belong?' for every possible object."

Classify the following (student responds YES/NO for each):

| Description | Valid set? | Reason |
|---|---|---|
| The set of even numbers between 1 and 10 | YES | {2,4,6,8,10} — clear criterion |
| The set of countries in South America | YES | official UN membership is unambiguous |
| The set of big numbers | NO | "big" is subjective; no clear threshold |
| The set of beautiful paintings | NO | "beautiful" varies by observer |
| The set of prime numbers | YES | primality has a precise mathematical definition |
| The set of recent events | NO | "recent" has no fixed cutoff |

Key principle:
> "A set requires an **unambiguous membership criterion**. If two people could reasonably disagree about whether object X belongs, the description does not define a valid mathematical set."

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Is 'the set of fast runners' a valid mathematical set? Why or why not?"
- **CORRECT** (No — 'fast' has no precise threshold; two people could disagree) → TA-A03
- **PARTIAL** (says no but cannot explain why) → ask: "Could two judges disagree about whether a specific runner is 'fast'?" → then continue → TA-A03
- **INCORRECT** (says yes) → Protocol B-02 (MC-2): apply YES/NO test to specific runners
- **NO_RESPONSE** → prompt: "Pick any runner. Can you always say, with certainty and agreement from anyone else, whether that exact person is in this set?"

---

**TA-A03: Unordered and No Repetition — The Two Key Properties**

[P07 WORKED EXAMPLE PAIR — B-category, satisfies GR-1]

**Worked Example 1 (unordered property):**
> Q: Are {1, 2, 3} and {3, 1, 2} the same set?
> A: YES. Both contain exactly the elements 1, 2, and 3. Order of listing does not matter.
> Contrast: the sequences (1, 2, 3) and (3, 2, 1) are different, because sequences are ordered.

**Worked Example 2 (no-repetition property):**
> Q: Is {a, b, a, c} a valid set? What set is it equal to?
> A: Valid, but the duplicate a is dropped. {a, b, a, c} = {a, b, c}. It has 3 elements.

Practical computation:
> Q: What is the set of letters in the word MATHEMATICS?
> Step 1: List all letters: M-A-T-H-E-M-A-T-I-C-S
> Step 2: Identify distinct letters: M, A, T, H, E, I, C, S
> Step 3: Result: {M, A, T, H, E, I, C, S} — 8 elements

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "What is the set of letters in the word BANANA?"
- **CORRECT** ({B, A, N}, 3 elements) → TA-A04
- **PARTIAL** (gets some but overcounts duplicates) → trace letter-by-letter: B-A-N-A-N-A → distinct: B, A, N → TA-A04
- **INCORRECT** (lists all 6 letters or preserves order) → Protocol B-01 (MC-1)
- **NO_RESPONSE** → scaffold: "Write each letter of BANANA, then cross out any that already appeared."

---

**TA-A04: The Empty Set and Singleton Sets**

[P03 ANALOGY BRIDGE — B-category, satisfies GR-1]

Analogy: "An empty box is still a box. The fact that it holds nothing does not make it stop existing. The same is true of the empty set."

Key facts:
- The **empty set** ∅ (also written {}) is the set containing **no elements**.
- |∅| = 0
- The empty set is **unique**: there is only one empty set.
- The empty set is a valid, well-defined set; its membership criterion: "no object belongs."

**Singleton set:** A set with exactly one element.
- {7} is a singleton; |{7}| = 1

**Critical distinction — ∅ vs. {∅}:**

| Expression | Elements | Cardinality |
|---|---|---|
| ∅ | none | 0 |
| {∅} | the empty set | 1 |
| {∅, {∅}} | the empty set; the set {∅} | 2 |

> "∅ is a set with nothing inside. {∅} is a set with one thing inside — that one thing happens to be the empty set."

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "How many elements are in each: (a) ∅   (b) {∅}   (c) {∅, {∅}}"
- **CORRECT** (a:0, b:1, c:2) → TA-A05
- **PARTIAL** (gets a right but confuses b or c) → address specific error: for {∅}, count one object (the empty set itself); for {∅, {∅}}, count two distinct objects → TA-A05
- **INCORRECT** (counts |{∅}| = 0) → Protocol B-03 (MC-3): cardinality counting exercise
- **NO_RESPONSE** → ask: "How many objects are listed between the outer braces of {∅}?"

---

**TA-A05: Set Notation — Roster and Set-Builder**

[P11 REPRESENTATION SHIFT — B-category, satisfies GR-1]

Two standard ways to describe a set:

**Roster notation** (explicit listing):
- {2, 4, 6, 8, 10} — practical for small finite sets
- {a, e, i, o, u} — listing all elements directly

**Set-builder notation** (rule-based):
- {x | P(x)} — read as "the set of all x such that P(x) is true"
- {x | x is an even natural number, x ≤ 10} — describes the same set as {2, 4, 6, 8, 10}
- Required for infinite sets: {x | x is a prime number} cannot be listed by roster

**Converting between forms:**

*Roster → set-builder:* {1, 4, 9, 16, 25} → {x | x = n² for some positive integer n, 1 ≤ n ≤ 5}

*Set-builder → roster:* {x | x ∈ ℤ and 0 < x < 6} → {1, 2, 3, 4, 5}

*Set-builder with empty result:* {x | x ∈ ℕ and x < 0} → ∅ (no natural number is negative)

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Write the set of positive odd integers less than 10 in both roster and set-builder notation."
- **CORRECT** (roster: {1,3,5,7,9}; set-builder: {x | x ∈ ℕ, x is odd, x < 10} or equivalent) → TA-A06
- **PARTIAL** (one notation correct, one wrong) → correct the wrong form; confirm the valid one → TA-A06
- **INCORRECT** (misses elements or uses wrong notation entirely) → re-demonstrate conversion with {x | x ∈ ℕ and x is a multiple of 3 and x < 15} as a further example
- **NO_RESPONSE** → prompt: "Start with roster: list the odd numbers 1, 3, 5... stop before you reach 10. Now write that rule in the {x | ...} format."

---

**TA-A06: Mastery Gate** *(terminal TA — satisfies GR-3, GR-6)*

[P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]

---

[P77 MULTI-PROBLEM SET — non-transfer domain]

Five problems on set properties and notation:

**Q1.** What is |{a, b, c, c, d, a}|?

**Q2.** True or false: {x, y, z} = {z, x, y}

**Q3.** True or false: ∅ = {∅}

**Q4.** Which is a valid mathematical set: "the set of prime numbers" or "the set of small numbers"? Explain why the other is not.

**Q5.** Write in roster notation: {x | x ∈ ℕ and x² < 20}

*Answers:* Q1: 4 | Q2: True | Q3: False (|∅|=0, |{∅}|=1) | Q4: "set of prime numbers" — primality is unambiguous; "small numbers" has no precise threshold | Q5: {1, 2, 3, 4} (since 1²=1, 2²=4, 3²=9, 4²=16 < 20; 5²=25 ≥ 20)

---

[P55 SCORE — record Q1–Q5: _/5]

---

[P76 TRANSFER PROBE — real-world context (cross_links = [ ]; P76 independence)]

*Computer-science transfer context:*
> "A software engineer stores a list of usernames in a data structure. The data structure preserves insertion order and allows the same username to appear multiple times (duplicates are stored). The engineer wants to convert it into a data structure that functions as a mathematical set of usernames.
>
> (a) What two properties must she remove/prohibit?
> (b) If the current list is [alice, bob, alice, carol, bob], what is the resulting set?"

*Answer:* (a) Remove ordering (set is unordered) and prohibit duplicates. (b) {alice, bob, carol}

---

[P55 SCORE — record transfer probe: _/2 (1 pt per part)]

---

[P75 MASTERY ASSESSMENT]

Total: __/7 (Q1–Q5 = 5 pts; transfer probe = 2 pts)

Mastery threshold: 0.90 → pass mark = ⌈0.90 × 7⌉ = 7/7

*Note: threshold 0.90 reflects that this is a foundational definition — all three properties plus notation must be solid before Cartesian products and relations proceed.*

---

[P74 ROUTING DECISION]

- **7/7** → MASTERED → exit TA-A06 → spaced revision schedule activated
- **6/7** → if transfer probe fully correct (2/2): MASTERED; if transfer probe partially wrong: Protocol C-01 (consolidation review)
- **5/7 or below** → PARTIAL — identify weakest area:
  - Q1 wrong (cardinality with duplicates) → Protocol B-01 (MC-1)
  - Q2 wrong (order matters claim) → Protocol B-01 (MC-1)
  - Q3 wrong (∅ vs. {∅}) → Protocol B-03 (MC-3)
  - Q4 wrong (well-definedness) → Protocol B-02 (MC-2)
  - Q5 wrong (set-builder conversion) → reteach TA-A05, then Protocol C-01

---

[P55 SCORE — record mastery state: MASTERED / PARTIAL / INCOMPLETE]

---

[P78 COMPLETION]

Record in student memory: concept `math.found.set`, mastery state, date, score __/7.
Unlock prerequisite check for `math.found.cartesian-product`.
Exit TA-A06.

---

### Protocol B — Misconception Repair Chains

**B-01: Order and Repetition Repair (MC-1)**

[P41 MISCONCEPTION DETECTOR]
"Let me check something. I'm going to show you two things and I want to know if they're the same or different:"
- (A) The list [1, 2, 3] vs. [3, 2, 1] — as two shopping lists where position means first-choice, second-choice, etc.
- (B) The set {1, 2, 3} vs. {3, 2, 1} — as two bags of numbered balls

"Are (A) the same? Are (B) the same?"
[Gate: if student correctly says (A) different and (B) same → misconception resolved → return to suspended TA]

[P27 MISCONCEPTION NAMING]
"The idea that sets preserve order or allow repetition is called the **list-confusion misconception**. It comes from experience with ordered lists like grocery lists or ranked scores — which are sequences, not sets. Sets throw away both the ordering and any copies."

[P64 CONCEPTUAL SHIFT]
Work through: {MISSISSIPPI letters}
Step 1: Write out M-I-S-S-I-S-S-I-P-P-I
Step 2: Cross out every letter that already appeared: M ✓ I ✓ S ✓ [S cross] [I cross] [S cross] [S cross] [I cross] P ✓ [P cross] [I cross]
Step 3: Result: {M, I, S, P} — 4 elements
"The 11 letters collapse to 4 distinct ones. Repetition is erased. Order is erased."

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "What is |{M, A, T, H, E, M, A, T, I, C, S}|?"
- **CORRECT** (8) → repair complete → return to suspended TA or TA-A03
- **INCORRECT** → repeat with simpler word (NOON → {N, O}) then retry

---

**B-02: Well-Definedness Repair (MC-2)**

[P41 MISCONCEPTION DETECTOR]
"Let's test a description: 'the set of tall people'. I want you to apply it to three specific people:
- A person who is 2.10 m tall — is this person in the set?
- A person who is 1.70 m tall — is this person in the set?
- A person who is 1.85 m tall — is this person in the set?"

[Gate: if student hesitates on the 1.85 m case, confirms the description is ambiguous → proceed]

[P27 MISCONCEPTION NAMING]
"The **undefined-membership misconception** treats any noun phrase as a valid set definition. A mathematical set requires a rule precise enough that two different mathematicians would always agree on the answer for every possible object."

[P64 CONCEPTUAL SHIFT]
YES/NO membership test applied to contrasting pairs:
- "The set of integers greater than 5" → for x=7: YES; for x=3: NO; for x=5: NO (not greater) → VALID
- "The set of interesting numbers" → for x=42: maybe; for x=7: some say yes, some say no → NOT VALID
- "The set of numbers divisible by 3" → for x=12: YES; for x=7: NO — always unambiguous → VALID

Key: a valid set description must yield the same YES/NO answer for every possible object, with no room for disagreement.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Is 'the set of movies released before 2000' a valid mathematical set? Apply the YES/NO test to a specific movie."
- **CORRECT** (Yes — release date is a fixed fact, always YES/NO) → repair complete → return to suspended TA
- **INCORRECT** → revisit YES/NO test with release date as objective criterion

---

**B-03: Empty Set Repair (MC-3)**

[P41 MISCONCEPTION DETECTOR]
"I want to test your intuition. Tell me: does a bag with nothing in it still exist as a bag?"
[Student answers yes → establish analogy]
"Does a set with no elements still exist as a set?"

[P27 MISCONCEPTION NAMING]
"The **empty-set confusion** is thinking that ∅ is undefined, or that it somehow contains itself, or that {∅} = ∅. The empty set is a perfectly valid set — it just has no elements. And {∅} is a completely different object: it is a set that has one element (which happens to be the empty set)."

[P64 CONCEPTUAL SHIFT]
Explicit counting exercise:

| Expression | "Open the box and count what's inside" | Cardinality |
|---|---|---|
| ∅ | open the box: nothing inside | 0 |
| {∅} | open the box: one thing inside — the empty box (∅) | 1 |
| {∅, {∅}} | open the box: two things inside — the empty box AND a box containing the empty box | 2 |
| {{∅}} | open the box: one thing inside — a box containing the empty box | 1 |

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "What is |{∅, {∅}, {∅, {∅}}}|?"
- **CORRECT** (3) → repair complete → return to suspended TA
- **INCORRECT** → count together: "Open the outer braces. How many objects are between them? Commas separate objects."

---

### Protocol C — Consolidation

**C-01: Mixed Property Review**

[P17 MIXED PRACTICE SET]
Six targeted items cycling through all three properties:

1. Simplify: {3, 1, 4, 1, 5, 9, 2, 6, 5} as a set. Give its cardinality.
2. Are these the same set? {a, b, c} and {c, a, b}. Explain.
3. A set S satisfies: "x ∈ S if and only if x is a US state whose name starts with 'Q'." What is S?
4. Convert to roster: {x | x ∈ ℕ, x is odd, x ≤ 7}
5. Convert to set-builder: {3, 6, 9, 12, 15}
6. What is |{{1,2}, {3}, ∅}|?

*Answers:* 1: {1,2,3,4,5,6,9}, |·|=7 | 2: Yes, same set — order irrelevant | 3: ∅ (no US state starts with Q) | 4: {1,3,5,7} | 5: {x | x ∈ ℕ, x is a multiple of 3, x ≤ 15} or equivalent | 6: 3

[P49 ADAPTIVE CHECKPOINT]
- **Score 5–6/6** → MASTERED → proceed to spaced revision schedule
- **Score 3–4/6** → identify which property is failing; re-route to specific B chain
- **Score ≤2/6** → restart Protocol A from TA-A01

---

### Protocol D — Acceleration

**Student state S6 trigger:** Student correctly answers TA-A01 checkpoint without instruction — demonstrates prior knowledge of all three set properties.

Skip TA-A01 through TA-A05. Go directly to TA-A06 (mastery gate).

If 7/7 on mastery gate → MASTERED.
If < 7/7 → route by error pattern (same routing as Protocol A TA-A06).

---

### Protocol E — Spaced Revision

**Student state S9 trigger:** Concept previously mastered; spaced revision interval has elapsed.

[P89 SPACED REPETITION]
Schedule: Day 1, Day 3, Day 7, Day 21, Day 60 after initial mastery.

Revision probe set (5 items, must score ≥ 5/5 to maintain mastery):

1. True or false: {p, q, r} = {r, q, p}
2. What is the set of distinct prime factors of 60?
3. True or false: ∅ = {∅}
4. Is "the set of good ideas" a valid mathematical set? Apply the membership test.
5. Convert: {x | x ∈ ℤ and x² = 4} → roster notation.

*Answers:* 1: True | 2: {2, 3, 5} | 3: False | 4: No — "good" has no objective criterion | 5: {-2, 2}

**Decay rule:** If score < 5/5 on any revision day → reset to Day 1 + Protocol B targeting the failed property.

---

## Component 4 — Student State Routing Table

| Student state | Detected by | Routed to |
|---|---|---|
| S0 (no prior knowledge) | No engagement with set vocabulary before TA-A01 | Protocol A, TA-A01 |
| S1 (active misconception) | P49 INCORRECT at any TA-A01 through TA-A05 | Protocol B matching the MC triggered |
| S2 (partial mastery) | TA-A06 score 6/7 with partial transfer; or C-01 score 3–4/6 | Protocol C-01 |
| S6 (prior mastery / acceleration) | TA-A01 P49 answered CORRECT before instruction | Protocol D (skip to TA-A06) |
| S9 (spaced revision due) | P89 interval elapsed in student memory | Protocol E |

---

## Component 5 — Session Configuration

| Parameter | Value |
|---|---|
| CPA entry stage | C (Concrete) — difficulty = foundational |
| Session TA cap | 7 |
| Protocol A TAs | 6 (TA-A01 through TA-A06) — within cap |
| MAMR | MC-1 (list-confusion) cleared first; MC-2 and MC-3 FIFO after |
| Repair chain entry | Always via P41 → P27 → P64 → P49 |
| Mastery gate | TA-A06 (P91 compound) |

---

## Component 6 — Transfer Probe Documentation

**P76 Independence Note:** `math.found.set` has cross_links = [ ] in the KG. All P76 transfer probes use self-contained real-world contexts that require no knowledge of other KG concepts beyond what is introduced in this blueprint.

| Probe | Context | Transfer target |
|---|---|---|
| TA-A06 P76 | Software engineering: converting an ordered, duplicate-allowing list of usernames into a set | Recognises that mathematical sets map onto real deduplication and order-removal operations |

**Additional P76 contexts available for Protocol C or revision:**
- **Cooking:** A recipe calls for "a set of spices: cinnamon, ginger, cinnamon, cloves." A set of spices is an unordered collection of distinct items; the repeated "cinnamon" is just one element. Transfer: applying unordered + distinct to physical ingredient lists.
- **Geography:** "The set of countries that border France" — recognising that geopolitical membership is a well-defined criterion (international borders are documented), making this a valid set.

---

## Component 7 — Spaced Repetition Schedule

| Interval | Trigger condition | Action |
|---|---|---|
| Day 1 | Day of initial mastery | Mark mastered; schedule Day 3 probe |
| Day 3 | 2 days after mastery | Protocol E 5-item probe |
| Day 7 | 4 days after Day 3 pass | Protocol E 5-item probe |
| Day 21 | 14 days after Day 7 pass | Protocol E 5-item probe |
| Day 60 | 39 days after Day 21 pass | Protocol E 5-item probe |
| Decay reset | Any probe score < 5/5 | Reset to Day 1; route to Protocol B targeting failed item |

---

## Component 8 — Assessment Item Bank

*Minimum 10 items. Items tagged by property tested.*

| # | Item | Property | Answer |
|---|---|---|---|
| A1 | What is |{1, 2, 3, 2, 1}|? | No repetition | 3 |
| A2 | Are {a, b, c} and {c, b, a} equal sets? | Unordered | Yes |
| A3 | Is "the set of difficult problems" a valid mathematical set? | Well-defined | No — "difficult" is subjective |
| A4 | What is |∅|? | Empty set | 0 |
| A5 | What is |{∅}|? | Empty set / nesting | 1 |
| A6 | Convert to roster: {x | x ∈ ℕ, x < 5} | Notation | {1, 2, 3, 4} |
| A7 | The word PROGRAMMING — what is the set of its distinct letters? | No repetition | {P, R, O, G, A, M, I, N} |
| A8 | True or false: {∅} = ∅ | Empty set | False |
| A9 | Is "the set of integers greater than 100" a valid set? | Well-defined | Yes — the criterion is precise |
| A10 | Write in set-builder notation: {4, 8, 12, 16, 20} | Notation | {x | x ∈ ℕ, x is a multiple of 4, x ≤ 20} |
| A11 | How many elements in {∅, {∅}, {{∅}}}? | Nesting / cardinality | 3 |
| A12 | Simplify: {letters in AARDVARK} as a roster set | No repetition | {A, R, D, V, K} |

---

## Component 9 — Teaching Notes

- **Mastery threshold 0.90** is the highest in the foundational cluster. This reflects that set is the atomic building block for relations, functions, and all of set-theory; shaky set foundations propagate into all downstream concepts. Do not advance to `math.found.cartesian-product` without confirmed mastery.
- **Bloom = remember** for this concept: teaching aims at reliable recall and recognition of the three properties, not creative application or analysis. Do not push into set-theoretic paradoxes (Russell's paradox) — those belong to `math.found.set-theory`.
- **TA-A04 sequencing note:** The ∅ vs. {∅} distinction surprises many students. If Protocol B-03 is triggered, spend extra time on the counting-objects-inside-braces physical metaphor before retrying.
- **Protocol D flag:** Students who have completed a prior set-theory or discrete math course often demonstrate S6 at TA-A01. Accelerate directly to TA-A06; mastery threshold still applies at 0.90.

---

## Component 10 — Validation Checklist

### V-Checks

| ID | Check | Status |
|---|---|---|
| V-1 | KG concept ID `math.found.set` verified in `docs/mathematics/kg/graph.json`; no duplicate blueprint | PASS |
| V-2 | Difficulty (foundational) and Bloom (remember) match KG | PASS |
| V-3 | Mastery threshold (0.90) matches KG | PASS |
| V-4 | Estimated hours (2) matches KG | PASS |
| V-5 | CPA entry stage C derived correctly (difficulty = foundational ≤ 2) | PASS |
| V-6 | Session TA cap 7 derived correctly (estimated_hours = 2 ≥ 1 h) | PASS |
| V-7 | MAMR stated: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO | PASS |
| V-8 | Every non-repair TA opens with a B-category primitive (P06, P01, P07, P03, P11) | PASS |
| V-9 | Each TA-A01 through TA-A05 contains exactly one P49 | PASS |
| V-10 | Mastery gate TA-A06 is terminal (exits Protocol A; satisfies GR-3) | PASS |
| V-11 | Repair chains entered via P41 → P27 → P64 → P49 (satisfies GR-4) | PASS |
| V-12 | P91 compound is terminal in TA-A06 (satisfies GR-6) | PASS |
| V-13 | P76 transfer probe appears inside TA-A06 P91 sequence (satisfies GR-7) | PASS |
| V-14 | Cross-links field is [ ]; P76 independence documented in Component 0 and Component 6 | PASS |
| V-15 | MAMR routing enforced: B-01 (MC-1) triggered before B-02/B-03 when multiple MCs active | PASS |
| V-16 | Assessment item bank contains 12 items (≥ 10 required) | PASS |
| V-17 | All three misconception repair chains (B-01, B-02, B-03) fully documented with P41→P27→P64→P49 | PASS |
| V-18 | P76 probe uses valid real-world transfer context (software username deduplication) | PASS |
| V-19 | P76 independence noted: cross_links = [ ]; probe requires no external KG concept knowledge | PASS |
| V-20 | All five student state routes documented: S0→A, S1→B, S2→C, S6→D, S9→E | PASS |

### AIR Test

| ID | Check | Status |
|---|---|---|
| AIR-1 | All content slots (problems, examples, probes) are finite and pre-specified | PASS |
| AIR-2 | All P49 response taxonomies are pre-authored (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) | PASS |
| AIR-3 | All branching decisions are deterministic (score thresholds and error patterns fully specified) | PASS |
| AIR-4 | All primitives (P01, P03, P06, P07, P11, P27, P41, P49, P55, P64, P74, P75, P76, P77, P78, P89, P91) are concept-independent | PASS |
| AIR-5 | TA sequences fixed at authoring time; no runtime content generation required | PASS |

**PACKAGE_READY: YES — all 20 V-checks PASS; AIR Test PASS**

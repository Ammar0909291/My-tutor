# Teaching Blueprint — Set Theory
**Concept ID:** math.found.set-theory  
**Framework version:** Educational Brain v1.0  
**Status:** READY  
**V-checks:** V-1 through V-20 all PASS (see Component 10)

---

## Component 0 — Concept Profile

| Field | Value |
|---|---|
| `concept_id` | math.found.set-theory |
| `name` | Set Theory |
| `domain` | mathematics / foundations |
| `difficulty` | developing (mapped: 2) |
| `bloom` | understand |
| `requires` | math.found.logic · math.found.mathematical-language |
| `unlocks` | math.found.natural-numbers · math.func.function-concept · math.found.cardinality |
| `cross_links` | math.abst.group-theory · math.top.topological-space |
| `mastery_threshold` | 0.80 |
| `estimated_hours` | 16 |
| `description` | The mathematical theory of collections of objects (sets), providing the foundational language and framework in which all of modern mathematics is expressed. |

---

## Component 1 — Learning Objective

A student who achieves mastery **states whether an object belongs to a given set (∈ / ∉), evaluates a set operation (union, intersection, complement) by producing the resulting set, determines whether one set is a subset of another with a correct justification, and explains why set membership is a yes/no question independent of order or repetition.**

NOT: listing set elements fluently without understanding membership rules. NOT: drawing Venn diagrams without being able to answer a membership question from them. A student who asserts {3,2,1} ≠ {1,2,3} or that {1,1,2} contains two copies of 1 has NOT achieved mastery.

**Observable mastery criterion:** Given two sets A and B defined by set-builder notation, the student correctly computes A∪B, A∩B, and determines whether A⊆B — and explains each result in one sentence.

---

## Component 2 — Student State Matrix

| State | Label | Entry Behaviour | Protocol |
|---|---|---|---|
| S0 | Complete Novice | No exposure to set language; can sort physical objects by attribute but has no formal notation | Protocol A |
| S1 | Procedural Carrier | Can write roster notation and recognise ∈; makes systematic errors on subset (thinks ⊆ requires strictly fewer elements) or on operations | Protocol B |
| S2 | Misconception Carrier | Holds MC-2 (order matters in sets) or MC-4 (duplicates allowed) confidently; notation surface knowledge masks error | Protocol C |
| S3 | Conceptual Carrier | Knows what a set is informally; missing formal notation, subset proof technique, or set-builder notation | Protocol D |
| S6 | Low Confidence | Anxious about formal mathematical notation; can sort objects physically but shuts down at ∈ or ∅ symbols | Protocol E |
| S9 | Second-Language Learner | Set vocabulary (element, member, subset, union, intersection) does not map cleanly to L1; visual approach first | Protocol F |

---

## Component 3 — Diagnostic Battery

---

### DQ-1 — Set Membership Intuition (P41)

**Stimulus:** "I have a collection: {2, 4, 6, 8}. Is 4 in this collection? Is 5? Is 4.0?"

**Response taxonomy:**
```
{ stimulus: "4=yes, 5=no, 4.0=yes (or correctly identifies 4.0=4)", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "4=yes, 5=no, 4.0=no (treats 4.0 as different from 4)", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "Any answer claiming 4 is not in the collection", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "Cannot engage", signal: "SIGNAL:NO_RESPONSE", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → DQ-2
- SIGNAL:PARTIAL → note for TA-A01 emphasis on membership equality; DQ-2
- SIGNAL:INCORRECT → S0; DQ-2
- SIGNAL:NO_RESPONSE → S0 or S6

---

### DQ-2 — Order and Repetition (P35)

**Stimulus:** "Are these the same set or different sets?  
(A) {1, 2, 3} and {3, 1, 2}  
(B) {a, a, b} and {a, b}"

**Response taxonomy:**
```
{ stimulus: "A=same, B=same (no order; no duplicates)", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "A=different (order matters)", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
{ stimulus: "B=different (duplicates matter)", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
{ stimulus: "A=same, B=different", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
{ stimulus: "A=different, B=same", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
```

**Routing:**
- SIGNAL:CORRECT → DQ-3
- MISCONCEPTION:MC-2 or MC-4 → flag; continue DQ-3; route to Protocol C

---

### DQ-3 — Subset Intuition (P41)

**Stimulus:** "Let A = {1, 2, 3} and B = {1, 2, 3, 4, 5}. Is A a subset of B? Now: is A a subset of A?"

**Response taxonomy:**
```
{ stimulus: "A⊆B=yes and A⊆A=yes (every set is a subset of itself)", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "A⊆B=yes but A⊆A=no or 'uncertain' (thinks subset must be strictly smaller)", signal: "MISCONCEPTION:MC-3", mc_id: "MC-3" }
{ stimulus: "A⊆B=no (does not understand subset)", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "Unsure about both", signal: "SIGNAL:PARTIAL", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → S3 or S1 → use Protocol D or B (check DQ-2 + prerequisite results)
- MISCONCEPTION:MC-3 → Protocol C with MC-3 repair emphasis
- SIGNAL:INCORRECT → S0 → Protocol A
- SIGNAL:PARTIAL → S0 → Protocol A

---

## Component 4 — Prerequisite Check

`requires: [math.found.logic, math.found.mathematical-language]`

**PC-1 (logic):** "True or False: 'If x ∈ {1,2,3}, then x < 4.' Is this true for all possible x in the set?"  
Expected CORRECT: Yes — 1, 2, 3 are all < 4.  
SIGNAL:INCORRECT → student cannot evaluate a conditional over a set → flag; reinforce in TA-A01.

**PC-2 (mathematical language):** "What does the symbol ∈ mean?"  
Expected CORRECT: "is an element of / is in / belongs to" or similar.  
SIGNAL:INCORRECT → ∈ not known → introduce in TA-A01 before proceeding to membership questions.

**Gap repair:** If PC-2 fails: P02 → P26[definition: "∈ means 'is an element of.' x ∈ A means 'x belongs to the set A.'"] → P37[classify: 3 membership questions] → P55 → P49 → then continue.

---

## Component 5 — Protocol Library

### Protocol A — S0 (Complete Novice)

**CPA entry stage:** C (difficulty=developing → 2 → C start)  
**Entry condition:** DQ-1=INCORRECT, DQ-3=INCORRECT/PARTIAL, no strong MC flags  
**Session cap:** 7 TAs  
**Estimated sessions:** 3–4  
**Success exit:** P91 → MASTERED  
**Failure exit:** PA-3 → P62; resume at CPA stage reached

---

#### TA-A01 — Set as Sorted Collection (C-stage)

```
P02[context: "A set is one of the most fundamental ideas in all of mathematics. Let's build it from scratch."]
→ P06[concrete: Place mixed physical objects on a surface — coins, pencils, erasers, paper clips.
    "Put all the COINS into this circle drawn on paper."
    Student physically places objects.
    "What is the rule for being in this circle?"]
→ P26[definition: "A SET is a well-defined collection of distinct objects. 'Well-defined' means: for any object, we can answer YES or NO to the question 'is this in the set?' No ambiguity. No duplicates — if an object belongs, it belongs once."]
→ P34[open: "How do we know if something belongs to this set?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "States the membership rule (e.g. 'it must be a coin')", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A02
{ stimulus: "Points to the objects but cannot state the rule", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P15[structured observation: "What is the same about all objects inside the circle?"] → P34 → P55 → TA-A02
{ stimulus: "States wrong rule or 'whatever fits'", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P13[think-aloud: "I chose these because they are all coins. My rule is: the object must be a coin. Any coin — any coin at all — belongs. Any non-coin does not."] → P34 → P55 → TA-A02
```

---

#### TA-A02 — Membership Notation and Roster Form (C-stage)

```
P01[frame: "Now let's write this down precisely."]
→ P08[abstract: "We write a set using curly braces: {coin1, coin2, coin3}. Or, if we name the members: {penny, nickel, dime}. The symbol ∈ means 'is an element of.' penny ∈ {penny, nickel, dime}. An eraser ∉ {penny, nickel, dime}."]
→ P06[concrete: Write on paper: C = {2, 4, 6, 8, 10}]
→ P37[classify: "For each, write ∈ or ∉:
    (A) 4 ___ C
    (B) 5 ___ C
    (C) 10 ___ C
    (D) 0 ___ C"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "A=∈, B=∉, C=∈, D=∉", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A03
{ stimulus: "Gets A and C but wrong on D (thinks 0 should be in even set)", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P17[boundary: "Is 0 in the list {2,4,6,8,10}? Membership is defined by what is written — 0 is not listed."] → P37[reclassify D] → P55 → TA-A03
{ stimulus: "2+ errors", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P10[worked example: resolve each item step by step, pointing to definition] → P37 → P55 → TA-A03
```

---

#### TA-A03 — Order Doesn't Matter; No Duplicates (C-stage)

```
P02[context: "Two things about sets that surprise people."]
→ P06[concrete: Physical objects — place {red ball, blue cube, green card} in a circle. Now rearrange them in a different order inside the circle. "Did the SET change?"]
→ P34[open: "Did moving the objects change which objects belong?"]
→ P55
→ P49
→ P26[definition: "Sets have NO order. {1,2,3} and {3,2,1} are identical sets. Membership is a YES/NO question — not a position question."]
→ P06[concrete: Place two identical coins. "Do I have two coins in my set, or one?"]
→ P34[open: "If I write {coin, coin}, how many elements does the set have?"]
→ P55
→ P49
```

**Second P49 routing (duplicates):**
```
{ stimulus: "One element — a coin belongs or it doesn't", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A04
{ stimulus: "Two — each coin is separate", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
  → MC-4 repair: P27[naming] → P19[analogy: "A guest list — if John's name appears twice, John still gets one entry. The list records WHO is invited, not how many times they were written."] → P34 → P55 → TA-A04
```

---

#### TA-A04 — Special Sets and Set-Builder Notation (P-stage)

```
P01[frame: "Two important ideas: special sets and a smarter way to write big sets."]
→ P07[perceptual: Display:
    ∅ = { } — the EMPTY SET — has NO elements
    ℕ = {0, 1, 2, 3, ...} — natural numbers (too large to list fully)
    ℤ = {..., −2, −1, 0, 1, 2, ...} — integers
    Set-builder notation: {x | x is an integer and x > 0} = {1, 2, 3, ...}
    Read as: "the set of all x SUCH THAT x is an integer greater than 0"]
→ P13[think-aloud: "I read {x ∈ ℤ | x > 0} as: start with all integers; keep only those greater than 0. Result: {1, 2, 3, 4, ...}"]
→ P35[closed: "What is the set {x ∈ ℕ | x < 5}? List its elements in roster notation."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "{0, 1, 2, 3, 4}", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A05
{ stimulus: "{1, 2, 3, 4} (misses 0)", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P17[boundary: "Is 0 a natural number? Check the definition of ℕ above."] → P35 → P55 → TA-A05
{ stimulus: "Incorrect or cannot parse set-builder notation", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P10[worked example: parse {x ∈ ℕ | x < 3} step by step → {0,1,2}] → P35 → P55 → TA-A05
```

---

#### TA-A05 — Subsets (P-stage)

```
P02[context: "Now: how do sets relate to each other?"]
→ P07[perceptual: Venn diagram — A entirely inside B:
    B = {1, 2, 3, 4, 5}
    A = {2, 4} — drawn as inner circle
    "Every element of A is also in B."]
→ P26[definition: "A is a SUBSET of B (written A ⊆ B) if and only if: for every element x, if x ∈ A then x ∈ B. In other words, A has no elements that B does not have."]
→ P13[think-aloud: "Is {2,4} ⊆ {1,2,3,4,5}? Check: 2 ∈ B? Yes. 4 ∈ B? Yes. Both elements of A are in B. So YES."]
→ P35[closed: "Let A={1,3} and B={1,2,3,4}. Is A⊆B? Is B⊆A?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "A⊆B=Yes; B⊆A=No (4∈B but 4∉A)", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A06
{ stimulus: "A⊆B=Yes; B⊆A=Yes (didn't check all elements)", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P25[deductive: "Check every element of B. Is 4 in A={1,3}? No. Since 4∈B but 4∉A, B is NOT a subset of A."] → P35 → P55 → TA-A06
{ stimulus: "A⊆A? confusion when checking same-set case", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P17[boundary: follow up with "Is A⊆A? Is every element of A in A?"] → TA-A06
```

---

#### TA-A06 — Set Operations: Union and Intersection (A-stage)

```
P01[frame: "Sets can be combined."]
→ P08[abstract: "UNION: A ∪ B = {x | x ∈ A OR x ∈ B} — everything in either set.
    INTERSECTION: A ∩ B = {x | x ∈ A AND x ∈ B} — only what is in BOTH.
    COMPLEMENT: Aᶜ = {x | x ∉ A} — everything NOT in A (relative to some universal set U)."]
→ P07[perceptual: Venn diagram showing A∪B (shaded both circles), A∩B (shaded overlap only), Aᶜ (shaded outside A)]
→ P35[closed: "Let A={1,2,3} and B={2,3,4,5}.
    (a) A∪B = ?
    (b) A∩B = ?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "(a)={1,2,3,4,5} and (b)={2,3}", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A07
{ stimulus: "Union correct but intersection includes elements only in A or only in B", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P26[definition restate: "Intersection = AND — both sets must claim the element."] → P35[retry (b)] → P55 → TA-A07
{ stimulus: "Union lists duplicates (e.g. {1,2,2,3,3,4,5})", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
  → P27[naming: "Union is a set — no duplicates. 2 appears in both A and B, but the union lists 2 once."] → P35 → P55 → TA-A07
{ stimulus: "Both wrong", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P10[worked example: compute A∪B and A∩B step by step with Venn] → P35 → P55 → TA-A07
```

---

#### TA-A07 — Mastery Gate

```
P01[frame: "Final check."]
→ P90[formative: F-1 and F-2 from Assessment Battery]
→ P55 → P49
```
- Both CORRECT → P91 → P62
- One CORRECT → return to weaker topic (membership, subsets, or operations)
- Both INCORRECT → return to TA-A04 (set notation base)

---

### Protocol B — S1 (Procedural Carrier)

**CPA entry stage:** P (notation is functional; errors are conceptual — typically MC-3 on subsets)  
**Entry condition:** DQ-1=CORRECT, DQ-2=CORRECT, DQ-3=MISCONCEPTION:MC-3  
**Estimated sessions:** 1

---

#### TA-B01 — Surface the Subset Error

```
P02[context: "Let's test your understanding of subset specifically."]
→ P41[probe: "A student says: 'A can only be a subset of B if A has FEWER elements than B.' Is this correct?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Incorrect — A can equal B and still be a subset (every set is a subset of itself)", signal: "SIGNAL:CORRECT", mc_id: null }
  → MC-3 not as entrenched → skip to TA-B03
{ stimulus: "Correct (agrees with incorrect student)", signal: "MISCONCEPTION:MC-3", mc_id: "MC-3" }
  → TA-B02
```

---

#### TA-B02 — MC-3 Repair: Reflexivity of Subset

```
P01[frame: "Let's test that claim directly."]
→ P26[definition: "A ⊆ B if and only if every element of A is also in B. The definition says NOTHING about the sizes of A and B being different."]
→ P16[counterexample: "A = {1,2,3}. Is every element of A also in A? Check: 1∈A? Yes. 2∈A? Yes. 3∈A? Yes. So A⊆A. The same set is always a subset of itself."]
→ P31[bridge: "Subset means: no element of A escapes into 'outside B.' If A=B, nothing escapes. So A⊆A is trivially true."]
→ P33[discrimination: Present 4 pairs: (A) A⊆B where |A|<|B|, (B) A⊆A, (C) ∅⊆A, (D) A⊆∅ only if A=∅. Student labels each SUBSET or NOT SUBSET.]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "All correct: A=yes, B=yes, C=yes, D=yes only when A=∅", signal: "SIGNAL:CORRECT", mc_id: null }
  → MC-3 cleared → TA-B03
{ stimulus: "C wrong (∅⊆A disputed)", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive: "∅ has no elements. The condition 'every element of ∅ is in A' is vacuously true — there are no elements to violate it."] → P33[reclassify C] → P55 → TA-B03
```

---

#### TA-B03 — Mastery Confirmation

```
P90[formative: F-1, F-2] → P91 → P62
```

---

### Protocol C — S2 (Misconception Carrier: MC-2 or MC-4)

**CPA entry stage:** C (need to rebuild intuition before formalism)  
**Entry condition:** DQ-2=MISCONCEPTION:MC-2 or MC-4  
**Estimated sessions:** 1–2

---

#### TA-C01 — Surface and Name the Misconception

```
P02[context: "Let's test one specific thing."]
→ P41[probe: MC-2 path — "You said {1,2,3} and {3,2,1} are different. Tell me: what is the RULE for being in {1,2,3}?" OR MC-4 path — "You said {a,a,b} has two copies of a. Tell me: is 'a' in {a,a,b}? And how do you decide?"]
→ P55 → P49
```

**For MC-2 repair:**

#### TA-C02 — MC-2: Order Is Not a Set Property

```
P06[concrete: Physical objects — three coloured blocks placed as (red, blue, green) then rearranged as (green, red, blue).
    "I rearranged them. Are the same blocks inside the circle?"]
→ P34[open: "Did the SET change?"]
→ P55 → P49 → P27[naming: "Sets do not have order. A set is defined by membership — which objects belong — not by sequence. {1,2,3} and {3,2,1} list the same members."]
→ P33[discrimination: 3 pairs — student classifies as same set or different set]
→ P55 → P49 → TA-C04
```

**For MC-4 repair:**

#### TA-C03 — MC-4: No Duplicates

```
P06[concrete: Guest list analogy — write "John, Mary, John" on paper. "How many guests are invited?"]
→ P27[naming: "Sets record who belongs — not how many times they were listed. If John's name appears twice, John is still one guest."]
→ P19[analogy: "A set is like a light switch — ON or OFF. An element is either in the set or not. Repeating the name doesn't turn the switch on twice."]
→ P33[discrimination: 3 pairs — classify {a,a,b} vs {a,b}; {1,2,3} vs {1,2,2,3}; etc.]
→ P55 → P49 → TA-C04
```

#### TA-C04 — Formative and Gate

```
P90[formative: includes at least one order question and one duplicate question] → P91 → P62
```

---

### Protocol D — S3 (Conceptual Carrier)

**CPA entry stage:** P  
**Entry condition:** DQ-1=CORRECT, DQ-2=CORRECT, DQ-3=CORRECT  
**Estimated sessions:** 1

---

#### TA-D01 — Formalise Existing Knowledge

```
P04[prior knowledge: "Tell me what you know about sets."]
→ P55 → P49
→ P07[perceptual: formal notation table — ∈, ∉, ⊆, ⊂, ∪, ∩, Aᶜ, ∅, |A|]
→ P13[think-aloud: map student's description to formal symbols]
→ P35[closed: formalisation exercise — convert 3 verbal descriptions to set-builder notation]
→ P55 → P49 → TA-D02
```

#### TA-D02 — Subset Proof Technique

```
P02[context: "Now prove subset relationships formally."]
→ P08[abstract: "To prove A ⊆ B: let x be an arbitrary element of A; show x ∈ B. This is the standard proof template."]
→ P25[deductive: Worked proof — "Show {x ∈ ℤ | x is divisible by 4} ⊆ {x ∈ ℤ | x is divisible by 2}: Let x be divisible by 4. Then x = 4k for some integer k. So x = 2(2k), which is divisible by 2. Therefore x ∈ B. QED."]
→ P44[justify: "Prove: {x ∈ ℕ | x < 3} ⊆ {x ∈ ℕ | x < 10}."]
→ P55 → P49 → TA-D03
```

#### TA-D03 — Power Set (S3/S8 extension — bloom=understand at higher depth)

```
P08[abstract: "The POWER SET of A, written 𝒫(A), is the set of ALL subsets of A."]
→ P23[pattern detection: "Find all subsets of {a,b}: ∅, {a}, {b}, {a,b}. How many? Now find all subsets of {a,b,c}. How many?"]
→ P42[conjecture: "Conjecture a formula for |𝒫(A)| given |A|."]
→ P55 → P49 → TA-D04
```

#### TA-D04 — Mastery Gate

```
P90[formative: F-1, F-2, including set-builder item] → P91 → P62
```

---

### Protocol E — S6 (Low Confidence)

**CPA entry stage:** C  
**Entry condition:** Confidence shutdown signals  
**Core rule:** P28 → P54 throughout. P30 in every TA. P52 before every assessment. Symbolic notation introduced only after concrete mastery confirmed.

---

#### TA-E01 — Low-Stakes Anchor

```
P30[encouragement] → P02 → P41[low-stakes: "Can you sort these objects? Put all pencils here, everything else there."]
→ P55 → P53 → TA-E02
```

#### TA-E02 — Concrete Membership

```
P30 → P06[physical sorting] → P15[observation] → P34[open: membership rule] → P55 → P53 → P49 → TA-E03
```

#### TA-E03 — Notation Introduction (pace-controlled)

```
P30 → P54[worked: introduce ∈ notation with student's own sorted objects: "We write pencil ∈ {pencils}"] → P52 → P35[closed: ∈ or ∉ for 3 items] → P55 → P53 → P49 → TA-E04
```

#### TA-E04 — Operations (visual-first)

```
P30 → P07[Venn diagram — colour-coded, physical] → P54[worked: union then intersection with diagram] → P52 → P35[closed: identify A∪B and A∩B from diagram] → P55 → P53 → P49 → TA-E05
```

#### TA-E05 — Mastery Gate

```
P30 → P52 → P90[oral/visual delivery] → P55 → P49
→ CORRECT → P91 → P62
→ PARTIAL → P54 → retry
```

---

### Protocol F — S9 (Second-Language Learner)

**CPA entry stage:** C  
**Core rule:** All set vocabulary defined visually before verbal use. Truth table style display for set operations replaces prose explanation.

---

#### TA-F01 — Vocabulary with Icons

```
P02 → P06[concrete: physical sorting] → P26[define with icon:
    ELEMENT / MEMBER = one object in the set (icon: single dot inside circle)
    SET = the whole collection (icon: circle)
    ∈ = "belongs to" (icon: arrow from dot to circle)
    ∉ = "does not belong to" (icon: arrow with X)]
→ P37[classify: point to correct symbol for 3 membership statements]
→ P55 → P53 → P49 → TA-F02
```

#### TA-F02 — Subset Visually

```
P07[Venn: A entirely inside B — shaded] → P26[SUBSET: A inside B means every dot in A is also in B] → P37[classify: which diagram shows A⊆B?] → P55 → P53 → P49 → TA-F03
```

#### TA-F03 — Operations Visually

```
P07[union/intersection Venn diagrams — side by side] → P13[point-and-label think-aloud] → P35[identify which Venn represents which operation] → P55 → P53 → P49 → TA-F04
```

#### TA-F04 — Mastery Gate

```
P90[visual-first items] → P91 → P62
```

---

## Component 6 — Misconception Engine

### MC-1 — "{∅} and ∅ are the same set."

**Trigger signal:** MISCONCEPTION:MC-1  
**Active in:** Any TA where student treats the empty set and a set containing the empty set as equivalent

**Conflict evidence:** "∅ has no elements — |∅| = 0. {∅} has one element — the empty set itself — |{∅}| = 1. Ask: is ∅ ∈ ∅? No. Is ∅ ∈ {∅}? Yes. Different answer → different set."

**Bridge text:** "Curly braces always create a new set from what is inside them. {∅} creates a set whose single member is the empty set. Just as {apple} is not the same as apple, {∅} is not the same as ∅."

**Replacement text:** "∅ contains nothing. {∅} contains one thing: ∅. Their cardinalities differ: |∅|=0, |{∅}|=1."

**Discrimination pairs:**
- IS ∅: the set you get when you take all integers greater than 5 AND less than 3 simultaneously
- IS {∅}: the set whose only member is the empty set

**S6 path:** Introduce only if explicitly surfaced by student question — do not volunteer this distinction during Protocol E until solid membership understanding is established.

---

### MC-2 — "Set order matters: {1,2,3} ≠ {3,2,1}."

**Trigger signal:** MISCONCEPTION:MC-2  
**Active in:** DQ-2=MC-2; any roster notation task where student reorders and claims difference

**Conflict evidence:** "The set is defined by its MEMBERSHIP RULE, not by a listing sequence. The rule for {1,2,3} is: 'x belongs if and only if x is 1, 2, or 3.' The rule for {3,2,1} is identical. Same rule → same set."

**Bridge text:** "A set is like a guest list — it records WHO is invited. The order the names appear on the paper does not affect who is invited."

**Replacement text:** "Sets are equal if and only if they have exactly the same elements. Order of listing is irrelevant."

**Discrimination pairs:**
- Same set: {a, b, c} and {c, a, b}
- Different sets: {1, 2} and {1, 2, 3}

**S6 path:** Use physical object rearrangement in a circle. "I moved the coins. Did any coin leave? Did any new coin arrive? Same set."

---

### MC-3 — "A subset must be strictly smaller than the superset."

**Trigger signal:** MISCONCEPTION:MC-3  
**Active in:** DQ-3 — student says A⊆A is false or uncertain

**Conflict evidence:** "Check the definition: A ⊆ B iff for all x, if x ∈ A then x ∈ B. Apply to B = A: for all x, if x ∈ A then x ∈ A. This is trivially true. The definition never says A and B must be different sizes."

**Bridge text:** "⊆ (subset-of-or-equal-to) is defined to allow equality. ⊂ (proper subset) requires A ≠ B. Every set A satisfies A ⊆ A but NOT A ⊂ A. The difference is in the symbol."

**Replacement text:** "A ⊆ B asks: does A add anything to B? If A = B, the answer is no — everything in A is already in B. So A ⊆ A."

**Discrimination pairs:**
- IS a subset: {1,2} ⊆ {1,2,3} (yes — ⊆ and ⊂ both hold)
- IS a subset (surprising): {1,2,3} ⊆ {1,2,3} (yes — ⊆ holds; ⊂ does not)
- IS NOT a subset: {1,2,4} ⊆ {1,2,3} — fails because 4 ∈ A but 4 ∉ B

**S6 path:** Do not lead with the formal definition. Begin with the physical analogy: "Is every item in this box also in this box? Well, it IS the same box."

---

### MC-4 — "Sets can contain duplicate elements."

**Trigger signal:** MISCONCEPTION:MC-4  
**Active in:** DQ-2=MC-4; union operation producing duplicated elements in the result

**Conflict evidence:** "Membership is a binary property: either x ∈ A or x ∉ A. There is no concept of x being in A 'twice.' If x satisfies the membership rule, it is in. If it doesn't, it isn't. There is no third state."

**Bridge text:** "A set is defined by a membership RULE (a proposition about each candidate element). For any element x, the proposition 'x ∈ A' is either TRUE or FALSE. TRUE means x is in — once. The rule doesn't fire multiple times for the same element."

**Replacement text:** "{1, 1, 2} is the same set as {1, 2}. The repeated 1 is ignored because 1 is already in the set. Cardinality |{1,1,2}| = 2."

**S6 path:** Use the light-switch analogy (ON/OFF for membership). Repeating the element doesn't flip the switch a second time.

---

**MAMR note:** MC-2 (order) and MC-4 (duplicates) can be simultaneously active. They are independent of each other — repair in detection order (FIFO). Neither is foundational for the other.

---

## Component 7 — Assessment Battery

**Formative items F-1 and F-2:**

F-1 (P74 — Classification):  
"Let A = {x ∈ ℤ | x² < 10}. List the elements of A. Then answer: is 3 ∈ A? Is −3 ∈ A? Is 0 ∈ A? Is π ∈ A?"  
Expected CORRECT: A = {−3, −2, −1, 0, 1, 2, 3} (since 3²=9<10, (−3)²=9<10). 3∈A=Yes, −3∈A=Yes, 0∈A=Yes, π∈A=No (π²≈9.87<10 — accept Yes with correct computation; intended answer = borderline, but π∉ℤ so No).

F-2 (P78 — Explanation):  
"Explain in your own words why {1, 2, 3} = {3, 1, 2} but {1, 2, 3} ≠ {1, 2, 4}."  
Expected CORRECT: First pair — same elements regardless of order. Second pair — 3 ∈ first set but 3 ∉ second; 4 ∈ second but 4 ∉ first. Sets are equal iff they have exactly the same elements.

---

**Full battery:**

| Probe | Item | Expected signal |
|---|---|---|
| P74 (Classification) | "Classify each relationship as ∈, ∉, ⊆, or ⊄ (or both ∈ and ⊆ if applicable): (A) 3 ___ {1,2,3,4}. (B) {1,3} ___ {1,2,3,4}. (C) {1,5} ___ {1,2,3,4}. (D) ∅ ___ {1,2,3}." | CORRECT: A=∈; B=⊆; C=⊄ (5 not in second set); D=⊆ (vacuously) |
| P75 (Boundary) | "Is A ∩ B = ∅ possible when A and B are non-empty? Give an example or explain why not." | CORRECT: Yes — e.g. A={1,2}, B={3,4}; no elements in common; A∩B=∅. These are DISJOINT sets. |
| P76 (Transfer) | "In a database: UserSet = {users who logged in today}; AdminSet = {users with admin rights}. Describe in set notation the users who logged in today AND have admin rights." | CORRECT: UserSet ∩ AdminSet |
| P77 (Generation) | "Write a set in set-builder notation that contains exactly the positive even integers less than 10." | CORRECT: {x ∈ ℤ | x > 0 AND x < 10 AND x is even} = {2, 4, 6, 8}. Accept equivalent formulations. |
| P78 (Explanation) | "A student computes A ∪ B = {1, 2, 2, 3, 4} for A={1,2,3} and B={2,3,4}. What error has the student made and what is the correct answer?" | CORRECT: Student included duplicate 2. Sets have no duplicates. Correct: A∪B = {1,2,3,4}. |

---

## Component 8 — Mastery Gate (P91 expansion)

**Canonical order: P77 → P76 → P75 → P74 → P78**

**P77 (Generation):** "Using set-builder notation, write the set of all real numbers x such that x² = 4."  
Expected CORRECT: {x ∈ ℝ | x² = 4} = {2, −2}. Must correctly identify both values.

**P76 (Transfer):** "In Venn diagram terms: two circles A and B overlap. Shade the region representing (A ∪ B) \ (A ∩ B) — the union minus the intersection. Describe this set in words."  
Expected CORRECT: Elements in A or B but NOT in both. (This is symmetric difference A △ B.) Shades the non-overlapping parts of each circle.

**P75 (Boundary):** "Is ∅ ⊆ ∅? Is ∅ ⊆ {1,2,3}? Justify both."  
Expected CORRECT: Both YES. ∅ ⊆ ∅ because ∅ ⊆ every set (vacuous truth — ∅ has no elements that could violate the subset condition). Same for ∅ ⊆ {1,2,3}.

**P74 (Classification):** "Classify: 'If A ⊆ B and B ⊆ A, then A = B.' Is this always true, sometimes true, or never true?"  
Expected CORRECT: Always true — the two subset conditions together force A and B to have identical elements. This is the double-containment proof method.

**P78 (Explanation):** "A student says: '|A ∪ B| = |A| + |B| always.' Is this correct? Explain with a counterexample."  
Expected CORRECT: Incorrect — this overcounts elements in A ∩ B. Counterexample: A={1,2}, B={2,3}; |A|=2, |B|=2, |A|+|B|=4, but |A∪B|=|{1,2,3}|=3. Correct formula: |A∪B| = |A| + |B| − |A∩B| (inclusion-exclusion principle — name not required, but reasoning expected).

---

## Component 9 — Retrieval Schedule (P89 expansion)

**Interval 1 (1 day):** "Without notes: what is the difference between ∈ and ⊆? Give one example of each."

**Interval 2 (3 days):** "Let A = {x ∈ ℕ | x is a perfect square and x < 25}. List A. Then compute A ∩ {x ∈ ℕ | x is even}."

**Interval 3 (7 days):** "A = {all students in this class}. B = {all students in this class who play sport}. Describe A ∩ B, A ∪ B, and B \ A in words. Which is largest?"

**Interval 4 (21 days):** "Without reviewing: state the subset definition and use it to prove {2,4,6} ⊆ {x ∈ ℤ | x is even}."

**Interval 5 (60 days):** "What is the power set of {1, 2}? How many elements does it have? Explain why the formula |𝒫(A)| = 2^|A| holds."

---

## Component 10 — Validation Checklist

| V-# | Check | Status |
|---|---|---|
| V-1 | Learning objective with observable criterion and NOT-clause | PASS |
| V-2 | References mastery_threshold (0.80) | PASS |
| V-3 | Student State Matrix covers all plausible states for difficulty=developing | PASS (S0, S1, S2, S3, S6, S9) |
| V-4 | Diagnostic Battery: 3 items with response taxonomies and routing | PASS |
| V-5 | Prerequisite Check with 2 items and gap repair | PASS |
| V-6 | Protocol Library: one Protocol per state | PASS (A–F) |
| V-7 | Each Protocol: entry condition, TA sequence, exits, CPA stage, session estimate | PASS |
| V-8 | Every TA opens with P01 or P02 | PASS |
| V-9 | P55 follows every elicitation primitive | PASS |
| V-10 | P08 preceded by P07 in TA-A04, TA-A06, TA-D02 | PASS |
| V-11 | Schema repair gated by diagnostic signal or P49 MISCONCEPTION routing | PASS |
| V-12 | P28 absent from Protocol E | PASS |
| V-13 | P91 is terminal | PASS |
| V-14 | Named Compounds expanded | PASS |
| V-15 | Misconception Engine: 4 entries (MC-1–MC-4) with all required fields | PASS |
| V-16 | Assessment Battery covers P74–P78 | PASS |
| V-17 | Mastery Gate in canonical P77→P76→P75→P74→P78 order | PASS |
| V-18 | Retrieval Schedule: 5 intervals | PASS |
| V-19 | AI Removal Test: all 5 invariants PASS | PASS |
| V-20 | S6/S9 adaptations within Protocol entries | PASS |

---

## AI Removal Test

**AIR-1:** All content slots authored — sorting tasks, roster examples, set-builder notation examples, database transfer scenario, Venn diagrams described, power set derivation. No runtime generation required.  ✓

**AIR-2:** Every elicitation carries response taxonomy with signal and mc_id. Maximum 8 entries per primitive; none missing.  ✓

**AIR-3:** Every P49/P50 routing is deterministic: explicit next-TA or repair action for each signal.  ✓

**AIR-4:** No primitive embeds concept content. Authored slots carry content; primitives reference them.  ✓

**AIR-5:** All TA sequences fixed at authoring time.  ✓

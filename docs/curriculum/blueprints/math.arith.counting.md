# Teaching Blueprint: math.arith.counting
**Blueprint Specification Version:** 1.0
**Status:** PACKAGE_READY
**Last Validated:** 2026-07-12

---

## Component 0 — Metadata

```yaml
concept_id: math.arith.counting
concept_name: Counting
domain: arithmetic
difficulty: foundational
bloom_level: apply
mastery_threshold: 0.95
estimated_hours: 8
prerequisites:
  - math.found.natural-numbers
unlocks:
  - math.arith.addition
  - math.arith.place-value
cross_links:
  - math.disc.combinatorics
cpa_entry_stage: C
session_ta_cap: 7
mamr_policy: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO after
pass_criterion: "⌈0.95 × 5⌉ = 5 out of 5 (4 P77 items + 1 P76 item)"
```

---

## Component 1 — Cognitive Map

### Core Insight
Counting a set S means establishing a one-to-one correspondence (bijection) between the elements of S and an initial segment {1, 2, …, n} of the natural numbers. The number n reached at the end is the cardinality |S|. This makes counting independent of the order in which elements are tagged.

### Conceptual Hierarchy
```
Level 0 (Concrete): Count five specific objects by pointing and tagging 1, 2, 3, 4, 5.
Level 1 (Pictorial): Draw arrows from {1,2,3,4,5} to the objects; verify bijection.
Level 2 (Abstract): Define counting as a bijection f: {1,...,n} → S; |S| = n.
Level 3 (Transfer): Show two different bijections to S both yield the same cardinality.
```

### Formal Definition
```
Let S be a finite set. Counting S means constructing a bijection
  f : {1, 2, …, n} → S  for some n ∈ ℕ₀.
The cardinality of S is |S| = n.
  (If S = ∅, the unique function f: {} → ∅ is a bijection, so |∅| = 0.)

Bijection requirements:
  Injective (one-to-one): f(i) ≠ f(j) for i ≠ j — each element gets at most one tag.
  Surjective (onto): every element of S is tagged — no element is skipped.
```

### Five Counting Principles (Skill Execution Steps)
```
Step 1 (One-to-one correspondence): Tag each object exactly once with successive naturals.
Step 2 (Stable order): Use tags 1, 2, 3, … in fixed sequence.
Step 3 (Cardinality): The last tag used = |S|.
Step 4 (Abstraction): The nature of the objects doesn't affect the count.
Step 5 (Order irrelevance): Any tagging order gives the same cardinality.
```

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL]: COUNTING-WITHOUT-BIJECTION
**Belief:** Counting means reciting number words in sequence while pointing; some objects may be tagged twice or skipped, and the count is still valid.
**Origin:** Procedural counting habit from early learning that ignores the bijection constraint. Students say "1, 2, 3" rhythmically but don't track which objects have been tagged.
**Trigger:** Asked to count S = {□, △, ○, ★, ♦} by pointing; student tags one object twice and skips another, arrives at 5 but the bijection is invalid.
**Repair:** Emphasise the one-to-one rule: each object receives exactly one tag. Model explicit tracking (cross out or mark each object after tagging).
**Priority:** FOUNDATIONAL — bijection validity underlies every other counting property.

### MC-2: ORDER-DEPENDENT-CARDINALITY
**Belief:** Counting the same set in a different order gives a different total, so cardinality is not well-defined.
**Origin:** Conflating the sequence of tags assigned with the resulting cardinality. Students see f₁(3)=△ and f₂(3)=○ and conclude the count is "different."
**Trigger:** Asked to count S twice (different order); student says "I got 5 then 5, but different bijections — which is right?"
**Repair:** Distinguish bijection (the assignment) from cardinality (the final n). Both bijections are valid; both end at n=5. Cardinality = the size of the domain of the bijection.

### MC-3: PROCEDURE-REPLACES-STRUCTURE
**Belief:** Counting is just a memorised procedure (saying 1, 2, 3, …) with no mathematical structure; bijection language is unnecessary jargon.
**Origin:** Students who can count fluently procedurally resist the formal bijection framing.
**Trigger:** Asked "why does order not matter?"; student says "it just doesn't" without invoking bijection.
**Repair:** Show explicitly that the bijection framing gives a proof: ANY bijection f: {1,...,n}→S has domain {1,...,n}, so the cardinality is always n regardless of which bijection is used.

---

## Component 3 — Scaffolding Protocol

### Entry Diagnostic (P41 gate)
```
P41 — MISCONCEPTION DETECTOR
Prompt: "Count the elements of S = {☆, ♣, ♥, ◆, ♠} by assigning each a number
tag. Show your assignment as a list of pairs (tag, element). Then state |S|."

CORRECT (5 distinct pairs, each element appears once, |S|=5):
→ No MC-1 detected → proceed to TA-A01 standard opening.

INCORRECT (a pair appears twice, or an element is skipped; student says |S|=5):
→ MC-1 FOUNDATIONAL active → P64 CONCEPTUAL SHIFT on bijection requirement
→ Activate Protocol B (MC-1 Repair Chain)
```

### Prerequisite Bridge
Student completed math.found.natural-numbers. Counting extends natural numbers from abstract sequence (ℕ = {1, 2, 3, …}) to a concrete tool for measuring set size. The natural numbers provide the tag sequence; the bijection formalises the matching.

### MAMR Enforcement
MC-1 is FOUNDATIONAL. If active, the entire session prioritises bijection validity before order-irrelevance or structural arguments. MC-2 and MC-3 addressed FIFO once MC-1 cleared.

### CPA Progression: C → P → A
- **Concrete (C):** Physical or listed objects tagged with written numbers; pairs listed explicitly.
- **Pictorial (P):** Arrow diagrams from {1,...,n} to the set S; verify injective + surjective visually.
- **Abstract (A):** Formal bijection definition; proof that any two bijections to S give the same n.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01: Concrete Foundation — Counting as Matching

**Opening (GR-1: B-category primitive)**
```
P03 — ANALOGY BRIDGE
Source domain: Guest list check-in
Target domain: Counting as bijection

"Imagine a party with 5 guests. At the door, each guest gets a wristband:
  Guest 1 → wristband #1
  Guest 2 → wristband #2
  Guest 3 → wristband #3
  Guest 4 → wristband #4
  Guest 5 → wristband #5

Rules: no guest gets two wristbands; no wristband is skipped.
When all wristbands are handed out, you know: there are exactly 5 guests.
Counting a set follows the same logic — you hand out number tags one by one
until every element has exactly one tag. The last tag number = the count."
```

**Concrete Execution**
```
P06 — CONTRAST PAIR
Left: VALID counting of S = {a, b, c, d}   Right: INVALID counting

Valid assignment:                            Invalid assignment:
  1 → a  (✓ a gets one tag)                   1 → a  (✓)
  2 → b  (✓ b gets one tag)                   2 → a  (✗ a tagged twice)
  3 → c  (✓ c gets one tag)                   3 → c  (✓)
  4 → d  (✓ d gets one tag)                   4 → d  (✓)
  |S| = 4  ✓                                  b is untagged (✗ skipped)
                                              |S| = 4? — NO. Bijection fails.

Left satisfies bijection: injective (each tag used once) + surjective (all elements tagged).
Right violates injectivity (1 maps to a twice) and surjectivity (b skipped).
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Count S = {■, ▲, ●, ◆, ★, ♦} by listing all pairs (tag number, element).
State |S| and confirm your assignment is a valid bijection."

CORRECT (6 pairs with distinct elements, |S|=6, no repeats or skips):
→ Affirm: "Perfect. Six pairs, each element tagged exactly once. The last tag is 6, so |S|=6.
  You have established a bijection f: {1,...,6} → S."
→ Advance to TA-A02.

PARTIAL (correct count but pairs not listed explicitly):
→ "Good count. Now list the 6 pairs explicitly to show the bijection.
  This is how we verify validity."
→ Re-attempt with explicit pairs; advance.

INCORRECT (a tag assigned to two elements or an element skipped; still says |S|=6):
→ MC-1 active. P27: "COUNTING-WITHOUT-BIJECTION. You tagged an element twice.
  Rule 1: each element gets exactly one tag. Rule 2: no element is left untagged.
  Recount, crossing off each element as you tag it."
→ Activate B-1 repair; re-attempt.

NO_RESPONSE:
→ "Start by listing all 6 elements. Then assign 1 to the first, 2 to the second, and so on.
  Write each pair as '(1, ■)', '(2, ▲)', etc."
→ Guide through first two pairs; student completes.
```

---

### TA-A02: Skill Execution — Bijection in Practice

**Opening (GR-1: B-category primitive)**
```
P07 — WORKED EXAMPLE PAIR
[bloom=apply: model the skill of constructing and verifying a counting bijection]

EXAMPLE 1 — Count a set; list bijection; state cardinality:
Given: T = {Monday, Tuesday, Wednesday, Thursday, Friday}.
Task: Count T and state |T|.

Step 1 — Assign tags in any order:
  f(1) = Monday
  f(2) = Tuesday
  f(3) = Wednesday
  f(4) = Thursday
  f(5) = Friday
Step 2 — Verify injective: each element appears exactly once. ✓
Step 3 — Verify surjective: every element of T is tagged. ✓
Step 4 — State cardinality: |T| = 5.

EXAMPLE 2 — Count the same set in a different order; confirm same cardinality:
Same T; tag starting from Friday:
  g(1) = Friday
  g(2) = Wednesday
  g(3) = Monday
  g(4) = Thursday
  g(5) = Tuesday
Verify g is also a bijection {1,...,5} → T. ✓
Result: |T| = 5 — same as before.
Key observation: f and g are different bijections but both end at n=5.
Cardinality is the size of the domain ({1,...,5}), not which bijection is used.
```

**Pictorial Layer**
```
P11 — REPRESENTATION SHIFT (list → arrow diagram)
"Draw the bijection as an arrow diagram:

  {1, 2, 3, 4, 5}      T
       1 ───────────→ Monday
       2 ───────────→ Tuesday
       3 ───────────→ Wednesday
       4 ───────────→ Thursday
       5 ───────────→ Friday

Injective: each node in {1,...,5} has exactly one arrow out.
Surjective: each node in T has exactly one arrow in.
Both conditions → bijection → |T| = 5."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Count R = {2, 4, 6, 8} two ways:
  Way 1: tag in the order shown.
  Way 2: tag in reverse order (8, 6, 4, 2).
List both bijections. Do you get |R| = 4 both times?"

CORRECT (two valid bijections both giving |R|=4):
→ Affirm: "Exactly. f₁(1)=2, f₁(2)=4, f₁(3)=6, f₁(4)=8 and
  f₂(1)=8, f₂(2)=6, f₂(3)=4, f₂(4)=2 are different bijections, same |R|=4.
  This is the order-irrelevance principle: cardinality = the n in {1,...,n}, 
  independent of which bijection is chosen."
→ Advance to TA-A03.

PARTIAL (counts correctly but doesn't list pairs for both ways):
→ "Great. Now write out the pairs for Way 2 explicitly — show each (tag, element) pair."
→ Re-attempt; advance.

INCORRECT (claims Way 2 gives a different count):
→ MC-2 active. P27: "ORDER-DEPENDENT-CARDINALITY. Both bijections have domain {1,2,3,4}.
  Whatever order you assign, you've used exactly 4 tags. So n=4, |R|=4, always."
→ Re-examine both arrow diagrams; advance.

NO_RESPONSE:
→ "For Way 2, start by assigning tag 1 to 8, tag 2 to 6, and continue.
  How many tags did you use in total?"
→ Step through; advance.
```

---

### TA-A03: Abstract Layer — Cardinality and the Bijection Proof

**Opening (GR-1: B-category primitive)**
```
P04 — PATTERN INDUCTION
"We've counted several sets. Let's observe the pattern:

  Set            Different orderings tried     Cardinality
  {■,▲,●,◆,★,♦}  6 possible 1st elements       6
  {Mon,...,Fri}   5 possible 1st elements        5
  {2,4,6,8}       4 possible 1st elements        4
  {π}             1 possible 1st element         1
  ∅               0 elements, no bijection       0

Pattern: no matter how we construct the bijection, |S| is always the
n such that {1,...,n} matches S exactly.

Why is this guaranteed? Because any two bijections f,g: {1,...,n}→S
have the SAME domain {1,...,n}. The cardinality is a property of
the set S, not of the particular bijection chosen."
```

**MC-3 Direct Address**
```
P27 — MISCONCEPTION NAMING
"PROCEDURE-REPLACES-STRUCTURE: counting is only a procedure.
The bijection framing is not jargon — it is the proof that:
  (a) counting always terminates for finite sets,
  (b) cardinality is well-defined (any valid counting gives the same n).

Without bijection language, you cannot explain WHY order doesn't matter.
With it: any bijection f:{1,...,n}→S reveals n by looking at its domain."
```

**Abstract Formalisation**
```
P11 — REPRESENTATION SHIFT (examples → formal definition)
"FORMAL DEFINITION:
  S is a finite set of cardinality n (written |S| = n) if and only if
  there exists a bijection f : {1, 2, …, n} → S.

Special cases:
  |∅| = 0  (empty bijection f: {} → ∅ is vacuously valid)
  |{x}| = 1  (f(1) = x is the unique bijection)

WELL-DEFINEDNESS THEOREM (informal):
  If f: {1,...,n}→S and g: {1,...,m}→S are both bijections, then n=m.
  Proof sketch: f⁻¹∘g is a bijection {1,...,m}→{1,...,n}.
  A bijection between {1,...,m} and {1,...,n} forces m=n.
  Therefore |S| is the same no matter which bijection is used."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "A student says: 'I counted set P = {α, β, γ, δ, ε} starting
from γ and got |P|=5, but my friend started from α and also got |P|=5.
One of us must be wrong.' Is either wrong? Explain using the bijection
definition of cardinality."

CORRECT (both are right; two different bijections, same domain size 5; cardinality well-defined):
→ Affirm: "Exactly right. Both bijections have domain {1,...,5}. Cardinality
  measures the domain size, which is 5 regardless of which element gets tag 1.
  Both students have correctly determined |P|=5."
→ Advance to TA-A04 (mastery gate).

PARTIAL (knows both are right but can't articulate the bijection argument):
→ "Right conclusion. Now phrase it: each student constructed a bijection
  f: {1,...,5}→P. The cardinality |P| is the n in the domain {1,...,n}.
  Both bijections have the same n. Therefore same cardinality."
→ Restate; advance.

INCORRECT (sides with one student or says cardinality is undefined):
→ P64 CONCEPTUAL SHIFT: "Two bijections to the same set always have domains
  of equal size. Let's see why: if |P|=5 via one bijection and |P|=4 via another,
  composing them gives a bijection between {1,...,5} and {1,...,4} — impossible
  for finite sets. So both bijections agree: |P|=5."
→ Re-examine; advance.

NO_RESPONSE:
→ "Ask yourself: how many tags did each student use? What is the domain of each bijection?"
→ Guide to domain = {1,...,5} for both; cardinality = 5.
```

---

### TA-A04: Mastery Gate (P91 Terminal)

```
P77 — MULTI-PROBLEM SET (4 problems)

Problem 1:
"Count V = {vowels in 'equation'} by constructing an explicit bijection.
(a) List V. (b) List all pairs (tag, element) of your bijection. (c) State |V|."
['equation' has vowels: e, q, u, a, t, i, o, n → vowels: e, u, a, i, o → |V|=5]

Problem 2:
"Let W = {x ∈ ℕ : 1 ≤ x ≤ 7 and x is odd}.
(a) List W. (b) Count W using two different bijections (different tagging orders).
(c) Confirm |W| is the same for both."
[W = {1,3,5,7}, |W|=4]

Problem 3:
"Is f: {1,2,3,4} → {■,▲,●,◆,★} defined by f(1)=■, f(2)=▲, f(3)=●, f(4)=◆
a valid counting bijection for S={■,▲,●,◆,★}? Explain what goes wrong."
[Not surjective: ★ is untagged. f does not count S; it counts a 4-element subset.]

Problem 4:
"Why is |∅| = 0? Use the bijection definition."
[The function f: {} → ∅ is vacuously a bijection (no elements to violate
injectivity/surjectivity). Its domain has 0 elements, so |∅|=0.]
```

```
P55 — SCORE (after P77)
Award 1 point per problem.
Running total before P76: __/4.
```

```
P76 — TRANSFER PROBE (P76 independence: math.disc.combinatorics NOT Tier 1)
"Let C = {red, blue, green, yellow, purple}.
(a) Construct two bijections f and g from {1,...,5} to C that differ in at
    least three assignments.
(b) Verify both are valid (injective and surjective).
(c) Confirm |C| = 5 for both bijections.
(d) In one sentence, explain why any bijection from {1,...,n} to a finite set S
    must have n = |S| regardless of which bijection is used."

[Expected:
(a) e.g. f: 1→red,2→blue,3→green,4→yellow,5→purple;
         g: 1→purple,2→green,3→red,4→blue,5→yellow.
(b) Each element appears exactly once in both. ✓
(c) Both domains are {1,...,5}, so n=5, |C|=5. ✓
(d) The cardinality |S| equals the size of the domain of any bijection to S;
    since any bijection to S has the same domain size, |S| is well-defined.]
```

```
P55 — SCORE (after P76)
Award 1 point for P76.
Running total: __/5.
```

```
P75 — MASTERY ASSESSMENT
Pass criterion: 5 out of 5 (⌈0.95 × 5⌉ = 5)
```

```
P55 — SCORE (final)
Record pass/fail status.
```

```
P74 — ROUTING DECISION
Score = 5/5 → MASTERY ACHIEVED → P78 COMPLETION
Score < 5/5 → NEEDS REVIEW → identify lowest-scoring item; activate Protocol B for its misconception
```

```
P55 — SCORE (routing recorded)
```

```
P78 — COMPLETION
"Counting checkpoint complete. You have established:
  • Counting S = constructing a bijection f: {1,...,n} → S.
  • |S| = n = the last tag number used in any valid bijection.
  • Bijection requires both injectivity (no element tagged twice)
    and surjectivity (no element skipped).
  • Cardinality is well-defined: any valid bijection gives the same n.
  • |∅| = 0 (empty bijection); |{x}| = 1.
Next concepts: math.arith.addition (operating on counted quantities),
math.arith.place-value (representing cardinalities in positional notation)."
```

---

## Component 5 — Protocol B (Misconception Repair Chains)

### Repair Chain B-1: COUNTING-WITHOUT-BIJECTION (MC-1 FOUNDATIONAL)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: Counting means reciting number words while pointing at objects —
  some may be pointed at twice or missed.
 AFTER: Counting means constructing a bijection — each object gets
  exactly one number tag, no skipping.

The bijection requirement has two parts:
  (1) Injective: no object gets two tags.    (Each arrow goes to a DIFFERENT target.)
  (2) Surjective: every object gets a tag.   (Every target receives EXACTLY ONE arrow.)

Procedure fix: as you tag each object, mark it (cross it out, circle it).
Never tag a marked object. Stop when all objects are marked."

Repair exercise:
Count Q = {α, β, γ} while physically marking each as tagged.
  Tag 1: α → mark α.
  Tag 2: β → mark β.
  Tag 3: γ → mark γ.
  All marked. |Q| = 3.
Student re-attempts with marking strategy; verify pairs.

Exit gate: "What are the two rules a counting assignment must follow?"
Expected: (1) each element tagged exactly once; (2) no element skipped.
→ Correct: return to TA-A01 P49 re-attempt.
→ Incorrect: repeat P64 with two-tag/skip demonstration.
```

### Repair Chain B-2: ORDER-DEPENDENT-CARDINALITY (MC-2)

```
P41 — MISCONCEPTION DETECTOR
Diagnostic: "Count S={a,b,c} starting from b. What is |S|?"
If student says "3, but different from counting a-first (which gives 3 too) — which is correct?": MC-2 confirmed.

P27 — MISCONCEPTION NAMING
"ORDER-DEPENDENT-CARDINALITY: believing different bijections could give different cardinalities.
The cardinality is the size of the DOMAIN {1,...,n} of the bijection.
Both bijections to S have domain {1,...,n} for the SAME n.
It is impossible for one to end at 3 and another at 4 for the same finite S."

P03 — ANALOGY BRIDGE
"Same guest list, two check-in staff at two doors — each assigns wristbands
in a different order. At the end: both used exactly the same number of wristbands
because there are exactly that many guests. Order of assignment ≠ number of guests."

Repair exercise: count T={x,y,z,w} in order x,y,z,w and in order w,z,y,x.
Both yield n=4.

Exit gate: "If f:{1,...,5}→S and g:{1,...,m}→S are both bijections, what is m?"
Expected: m=5.
→ Correct: return to TA-A02.
```

### Repair Chain B-3: PROCEDURE-REPLACES-STRUCTURE (MC-3)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: Counting is just a procedure; bijection language adds nothing.
 AFTER: The bijection formalisation explains WHY the count is independent of order.

Without bijection: 'order doesn't matter because it just doesn't.'
With bijection: 'any bijection f:{1,...,n}→S has domain {1,...,n}.
  The cardinality n is a property of S, not of f. Two bijections
  to S cannot have different domain sizes (would imply a bijection
  between {1,...,n} and {1,...,m} for n≠m, impossible for finite sets).'

This is a PROOF, not a procedure. The bijection language makes the proof possible."

Exit gate: "In one sentence, explain using 'bijection' why |S| doesn't depend on counting order."
Expected: any statement invoking 'domain of the bijection' or 'both bijections have {1,...,n} as domain.'
→ Correct: return to TA-A03.
```

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89 — SPACED REPETITION
Review schedule for math.arith.counting:

Interval 1 (1 day after mastery):
  Recall prompt: "State the bijection definition of counting. What is |∅|?"
  Target: counting = bijection f:{1,...,n}→S; |∅|=0.

Interval 2 (3 days):
  Application: "Count B = {letters in 'math'} using an explicit bijection.
  Then count it again in a different order. State |B| both times."
  Target: B={m,a,t,h}, |B|=4 both times.

Interval 3 (7 days):
  Transfer: "f:{1,2,3}→{red,green,blue} and g:{1,2,3,4}→{red,green,blue,∅}.
  What are |{red,green,blue}| and |{red,green,blue,∅}|?"
  Target: 3 and 4 respectively (∅ as element is distinct from the empty set).

Interval 4 (21 days):
  Integration: "A student studying math.disc.combinatorics says: 'the number
  of bijections from {1,...,n} to an n-element set S is n! (n-factorial).
  Explain why this is consistent with counting: although n! bijections exist,
  they all confirm the same cardinality |S|=n."
  Target: all n! bijections have domain {1,...,n}; domain size = cardinality.
```

---

## Component 7 — Cross-Blueprint Dependencies

### GR-8: Cross-link documentation
```
Incoming prerequisite:
  math.found.natural-numbers → Provides the natural number sequence {1,2,3,...}
  used as the tag set in the bijection. Counting without natural numbers is
  impossible (no tag domain).

Outgoing unlocks:
  math.arith.addition → Requires knowing |S| + |T| for disjoint S, T.
  math.arith.place-value → Requires understanding that |S| is a single number n.

Cross-linked (non-prerequisite):
  math.disc.combinatorics (NOT Tier 1) → Counting's bijection framework
  underlies combinatorics: counting arrangements = counting bijections,
  counting subsets = counting injections, etc.
```

### GR-9: P76 Mode Determination
```
cross_links = [math.disc.combinatorics]
math.disc.combinatorics is NOT in Tier 1 set → P76 INDEPENDENCE
P76 probe: two explicit bijections to same 5-element set; confirm same cardinality;
  explain well-definedness. Self-contained, no cross-concept dependency.
```

---

## Component 8 — Teaching Notes

### Pedagogical Rationale
Counting (bloom=apply) requires students to execute the bijection-construction procedure and also understand why it is well-defined. The P07 worked example pair in TA-A02 models both the construction (listing pairs) and the demonstration that two different bijections give the same cardinality — the second example is critical because it preempts MC-2 before students encounter it.

### Common Session Failure Modes
1. **Informal counting is automatic:** Students who have counted fluently since childhood resist writing out explicit pairs. The marking strategy (B-1) is essential — it converts procedural habit into verifiable bijection.
2. **MC-2 often triggered by the worked example:** When students see f and g both map {1,...,5} to the same set in different orders, some momentarily believe the results could differ. The analogy (wristband check-in) resolves this without formal proof.
3. **MC-3 is a meta-level resistance:** This repair chain is less about mathematics and more about convincing the student that formalism adds explanatory power. The proof sketch ("any bijection between {1,...,n} and {1,...,m} forces n=m for finite sets") is the key sentence.

### Connections to Broader Curriculum
- **Downstream — math.arith.addition:** Addition of cardinalities |S| + |T| for disjoint sets formalises as the cardinality of the disjoint union S⊔T.
- **Downstream — math.arith.place-value:** Place value represents a natural number n (the cardinality) in base-10 using digit positions.
- **Cross-domain — math.disc.combinatorics:** Combinatorics counts bijections (permutations), injections (arrangements), and arbitrary functions (sequences). The bijection framework here is the direct foundation.

### Language Precision
- Use "construct a bijection" not just "count."
- Distinguish "the bijection f" (the assignment) from "the cardinality |S|" (the result).
- Never say "counting gives a different answer if you start from a different element" — cardinality is invariant.

---

## Component 10 — Validation Checklist

### Structural Validators
- [x] V-1: Blueprint has all 10 components (0–8, 10).
- [x] V-2: Metadata YAML complete with all required fields.
- [x] V-3: concept_id matches filename `math.arith.counting`.
- [x] V-4: difficulty=foundational, bloom_level=apply, mastery_threshold=0.95.
- [x] V-5: estimated_hours=8, session_ta_cap=7.

### Grammar Rule Validators
- [x] V-6 (GR-1): Every non-repair TA opens with B-category primitive (TA-A01: P03+P06; TA-A02: P07; TA-A03: P04; TA-A04 is mastery gate).
- [x] V-7 (GR-2): Every non-gate TA contains P49 with all 4 branches. TA-A01, TA-A02, TA-A03 each have P49.
- [x] V-8 (GR-3): Mastery gate TA-A04 is terminal (ends with P78).
- [x] V-9 (GR-4): P41 entry diagnostic gates P64 → Protocol B when MC-1 active.
- [x] V-10 (GR-6): P91 compound (P77→P55→P76→P55→P75→P55→P74→P55→P78) complete in TA-A04.
- [x] V-11 (GR-7): P76 present in mastery gate TA-A04.
- [x] V-12 (GR-8): Cross-links documented in Component 7. math.disc.combinatorics named.
- [x] V-13 (GR-9): P76 mode is INDEPENDENCE (math.disc.combinatorics NOT Tier 1). P76 probe is self-contained (two bijections to same set).
- [x] V-14 (GR-10): MAMR stated in Component 0 and enforced in Component 3.

### Content Validators
- [x] V-15: Pass criterion = ⌈0.95 × 5⌉ = 5/5. P77 has 4 problems; P76 contributes 1; total n=5. ✓
- [x] V-16: CPA_ENTRY_STAGE = C. foundational/apply always starts Concrete. ✓
- [x] V-17: MC-1 is FOUNDATIONAL and cleared first per MAMR. ✓
- [x] V-18: P49 INCORRECT branch activates P27 or P64 with repair pathway in all three non-gate TAs. ✓
- [x] V-19: P76 probe independent of P77 problems (P77: specific counting tasks; P76: open-ended two-bijection construction + well-definedness argument). ✓
- [x] V-20: Spaced repetition intervals are 1, 3, 7, 21 days with distinct prompts. ✓

### bloom=apply Validator
- [x] V-APPLY: P07 (WORKED EXAMPLE PAIR) present in TA-A02, modelling bijection construction and order-independence in paired examples. ✓

### Automated Invariant Check (AIR)
- [x] AIR-1: No implementation code present.
- [x] AIR-2: No references to internal system variables.
- [x] AIR-3: All cross-linked concept IDs use canonical prefix format.
- [x] AIR-4: P91 sequence order is P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
- [x] AIR-5: Protocol B repair chains each have explicit exit gate with return instruction. ✓

**VALIDATION RESULT: PASS — PACKAGE_READY**

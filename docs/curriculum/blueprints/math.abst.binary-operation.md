# Teaching Blueprint — math.abst.binary-operation

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.binary-operation
KG_FIELDS:
  difficulty:        advanced
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   2
  requires:          [math.found.function-set-theoretic]
  unlocks:           [math.abst.group-theory]
  cross_links:       []

SESSION_TA_CAP:      7   (estimated_hours = 2 → ≥1h band → cap 7)
CPA_ENTRY_STAGE:     C   (start Concrete with arithmetic examples regardless of difficulty level)
P76_MODE:            Independence
  rationale:         cross_links = [] → self-contained probe.
PASS_CRITERION:      ⌈0.90 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
A **binary operation** on a set S is a function ∗: S × S → S that assigns to every ordered pair
(a, b) ∈ S × S exactly one element a∗b ∈ S.  The critical constraint is **closure**: the result
a∗b must lie in S for every a, b ∈ S.  Associativity, commutativity, the existence of an identity
element, and the existence of inverses are **additional properties** an operation may or may not
have — they are not part of the definition of a binary operation.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Familiar operations on ℤ: addition, subtraction, multiplication; checking closure by trying specific pairs |
| **Pictorial (P)** | Cayley (operation) table for a small finite set; arrow diagram of ∗: S×S→S |
| **Abstract (A)** | Formal definition: ∗: S×S→S total and well-defined; the four extra properties (associativity, commutativity, identity, inverse) as separate, optional attributes |

### Prerequisite Knowledge (from KG)
- **math.found.function-set-theoretic** — a function is a total, well-defined map from domain to codomain; ordered pairs; Cartesian product S×S

### Key Distinctions
| Property | Definition | Holds for + on ℤ? | Holds for − on ℤ? | Holds for × on ℕ? |
|----------|------------|:-----------------:|:-----------------:|:-----------------:|
| **Closure** | a∗b ∈ S for all a,b | ✓ | ✓ | ✓ |
| **Commutativity** | a∗b = b∗a | ✓ | ✗ (3−5 ≠ 5−3) | ✓ |
| **Associativity** | (a∗b)∗c = a∗(b∗c) | ✓ | ✗ | ✓ |
| **Identity** | ∃e: a∗e=e∗a=a | ✓ (e=0) | ✗ | ✓ (e=1) |
| **Inverses** | ∀a ∃a⁻¹: a∗a⁻¹=e | ✓ (−a) | n/a | ✗ (no 1/a in ℕ) |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | CLOSURE-VIOLATION | Accepts subtraction on ℕ as a binary operation; doesn't check 2−5=−3∉ℕ | Treats any "rule" on a set as a binary operation without verifying that outputs stay in the set | **FOUNDATIONAL** |
| MC-2 | COMMUTATIVITY-REQUIRED | Claims matrix multiplication or function composition "can't be a binary operation" because they're not commutative | Conflates commutativity (an optional extra property) with the definition of binary operation | Secondary |
| MC-3 | ARITHMETIC-ONLY | Doesn't recognise set intersection, function composition, string concatenation, or XOR as binary operations | Mental model of "operation" anchored on +, −, ×, ÷ | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03
and P91 context.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P03 concrete analogy + P11 representation shift + P49)
      → TA-A02 (P41/P64 MC-1 gate: closure check + P49)
      → TA-A03 (P06 contrast: closed vs not closed / commutative vs not + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (closure re-anchoring)
  MC-2 → TB-R02 (commutativity is optional)
  MC-3 → TB-R03 (non-arithmetic examples)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: The Definition via Concrete Examples (P03 + P11 + P49)

**[P03 — ANALOGY BRIDGE]**

You already know integer addition.  When you compute 3 + 5 = 8, three things are happening:

1. You start with two integers: 3 and 5.
2. A rule ("+") combines them.
3. You get one integer back: 8.

This is the template for **every binary operation**:

> A binary operation on S is a rule that takes **two elements of S** and returns **one element of S**.

The set S = ℤ and the rule "+" form a binary operation because:
- Input: two integers (any pair).
- Output: one integer.
- The output is always in ℤ — it never escapes the set.

That third point — **the output stays in S** — is called **closure**.

**[P11 — REPRESENTATION SHIFT]**

Three ways to express the same concept:

| Representation | Binary operation "+" on ℤ |
|----------------|--------------------------|
| **Example** | 3 + 5 = 8; −7 + 2 = −5 (both outputs in ℤ) |
| **Arrow diagram** | +: ℤ × ℤ → ℤ; (a, b) ↦ a + b |
| **Formal definition** | ∗: S × S → S such that ∗ is total and well-defined |

The arrow diagram reads: "addition is a function from pairs of integers to integers."

**[P49 — ADAPTIVE CHECKPOINT]**

> Consider the set S = {even integers} and the rule a ∗ b = a + b.
> Is ∗ a binary operation on S?  Explain why or why not.

- **CORRECT** (yes, because even + even = even ∈ S; closure holds): ✓ Advance to TA-A02.
- **PARTIAL** (says yes but doesn't mention closure, just says "addition works"): Ask "Does a+b always land back in S?" to elicit the closure argument. Advance with MC-1 flagged for monitoring.
- **INCORRECT** (says no, or says closure fails): Flag MC-1 active. Route to TB-R01, then return.
- **NO_RESPONSE**: Scaffold: "Try 2+4, 4+6, −2+8. Is each result even?"

---

### TA-A02 · MC-1 Gate: Closure Check (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> A student says: "Subtraction is a binary operation on ℕ = {1, 2, 3, 4, …} because I can always
> subtract two natural numbers."
> Is the student correct?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student is **wrong**.

Try 2 − 5 = −3.  Is −3 a natural number?  No — −3 ∉ ℕ.

**Closure fails**: there exist natural numbers a, b such that a − b ∉ ℕ.

| Test pair | a − b | In ℕ? |
|-----------|-------|:-----:|
| 5 − 3 = 2 | 2 | ✓ |
| 3 − 5 = −2 | −2 | ✗ |

One counterexample is enough to disprove closure.

**Conceptual shift:** "A rule that works on SOME pairs but escapes the set on others is NOT a
binary operation."  A binary operation must be closed for **every** pair in S × S.

On ℤ (all integers, positive and negative), subtraction IS a binary operation because
a − b ∈ ℤ for every a, b ∈ ℤ.  The set matters.

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> Which of the following is a binary operation on ℕ = {1, 2, 3, …}?
> (A) a ∗ b = a × b
> (B) a ∗ b = a − b
> (C) a ∗ b = a / b

- **CORRECT** (A only — multiplication on ℕ is closed; subtraction fails as shown; division can produce non-naturals e.g. 1/2): ✓ MC-1 cleared. Advance to TA-A03.
- **PARTIAL** (selects A and C, missing the closure failure in C): Try "1 ÷ 2 = ?" — direct, then retry.
- **INCORRECT** (selects B or C): Route to TB-R01 (abbreviated). Return here.
- **NO_RESPONSE**: Scaffold "Does 2 × 3 land in ℕ?"

---

### TA-A03 · Properties: Contrast Commutative vs Non-Commutative (P06 + P49)

**[P06 — CONTRAST PAIR]**

Binary operations come in many varieties.  The table below contrasts pairs of operations on the
same question: "Does a ∗ b always equal b ∗ a?"

| Operation ∗ | Set S | Closed? | Commutative (a∗b=b∗a)? | Note |
|-------------|-------|:-------:|:----------------------:|------|
| Addition (+) | ℤ | ✓ | ✓ | 3+5=5+3=8 |
| Subtraction (−) | ℤ | ✓ | ✗ | 3−5=−2 ≠ 5−3=2 |
| Matrix multiplication | 2×2 matrices | ✓ | ✗ | AB ≠ BA in general |
| Set intersection (∩) | Subsets of U | ✓ | ✓ | A∩B = B∩A always |
| String concatenation | Strings | ✓ | ✗ | "ab"+"c" = "abc" ≠ "cab" |
| XOR | {0, 1} | ✓ | ✓ | 0⊕1 = 1⊕0 = 1 |

> **Key message:** Non-commutativity does NOT disqualify an operation.  Matrix multiplication and
> string concatenation are perfectly valid binary operations on their respective sets.
> Commutativity is an **extra bonus property**, not a requirement.

> **MC-3 pre-emption:** Any rule on a set that always returns a result in the set is a binary
> operation, regardless of whether it involves +, −, ×, or something completely abstract.

**[P49 — ADAPTIVE CHECKPOINT]**

> Define ∗ on ℤ by a ∗ b = a + b − ab.
> (i) Is ∗ closed on ℤ?  (Hint: is a + b − ab always an integer when a, b ∈ ℤ?)
> (ii) Is ∗ commutative?  (Check whether a ∗ b = b ∗ a.)

Expected answers:
*(i) Yes — a+b−ab is a sum/difference/product of integers, so it's an integer. Closed.*
*(ii) a∗b = a+b−ab = b+a−ba = b∗a. Yes, commutative (addition and multiplication are both commutative on ℤ).*

- **CORRECT** (both parts right with reasoning): ✓ Advance to TA-A04.
- **PARTIAL — (i) wrong** (claims not closed without counterexample): Route to TB-R01 (closure check drill). Return.
- **PARTIAL — (ii) wrong** (claims not commutative despite checking): Route to TB-R02 (commutativity is optional; verify the algebra a+b−ab = b+a−ba). Return.
- **INCORRECT** (both wrong): TB-R01 then TB-R02. Return.
- **NO_RESPONSE**: Scaffold "(i) Try a=2, b=3: 2+3−6 = −1. Is −1 ∈ ℤ?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Which is a binary operation on ℕ = {1, 2, 3, …}?
(A) a ∗ b = |a − b| (absolute difference)
(B) a ∗ b = a − b
(C) a ∗ b = a / b
(D) None of the above

*(Target: A — |a − b| is always a non-negative integer, but wait: |2−5|=3 ∈ ℕ, |5−5|=0 ∉ ℕ if ℕ={1,2,3,...}. Actually |a-b|=0 when a=b, and 0∉ℕ under the convention ℕ={1,2,...}. So A also fails! Under ℕ = {0,1,2,...} (including zero), A works. This is ambiguous. Let me change Q1 to avoid this.)*

Revised Q1: Which is a binary operation on ℤ (all integers)?
(A) a ∗ b = a + b − 2
(B) a ∗ b = a / b
(C) a ∗ b = √(a + b)
(D) a ∗ b = the larger of a and b

*(Target: A and D are both valid on ℤ — but the question asks for a single answer. Let me say "select all that apply." Actually for simplicity: A gives an integer (closed ✓); B may not give integer (1/3 ∉ ℤ, fails); C may not give integer (√3 ∉ ℤ, fails); D max(a,b) is always an integer ✓. So A and D. Let me make this a two-answer question.)*

Let me redesign Q1 more cleanly:

**Q1.** Decide: Is a ∗ b = a + b − 2 a binary operation on ℤ?  Justify in one sentence.

*(Target: Yes — a+b−2 is always an integer when a,b ∈ ℤ. Closure holds. ✓)*

**Q2.** Is matrix multiplication a binary operation on the set of all 2×2 real matrices?  Is it commutative?

*(Target: Yes, binary operation (closed: 2×2 times 2×2 = 2×2). Not commutative: give example or state AB ≠ BA in general.)*

**Q3.** Let S = {−1, 0, 1} and define a ∗ b = a × b (ordinary multiplication).
(i) Is ∗ closed on S?  (ii) Is ∗ associative on S?

*(Target: (i) Yes — check: (−1)×(−1)=1∈S, (−1)×0=0∈S, 1×1=1∈S, etc. All products of elements from {−1,0,1} stay in {−1,0,1}. ✓ (ii) Yes — multiplication of real numbers is associative.)*

**Q4.** TRUE or FALSE: If ∗ is a binary operation on S, then a ∗ b must equal b ∗ a for all a, b ∈ S.

*(Target: FALSE — commutativity is an optional property, not part of the definition. Matrix multiplication is a counterexample.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — self-contained.*

> Let S = {0, 1, 2, 3} and define a ⊕ b = (a + b) mod 4 (the remainder when a + b is divided by 4).
>
> (a) Verify that ⊕ is closed on S by computing 2 ⊕ 3 and 3 ⊕ 3.
> (b) Compute 1 ⊕ 3 and 3 ⊕ 1.  Is ⊕ commutative?
> (c) Find an element e ∈ S such that a ⊕ e = a for all a ∈ S.  (This is the identity element.)
> (d) For the element 3 ∈ S, find an element x such that 3 ⊕ x = e.  (This is the inverse of 3.)

*Expected answers:*
*(a) 2⊕3 = 5 mod 4 = 1 ∈ S ✓; 3⊕3 = 6 mod 4 = 2 ∈ S ✓.*
*(b) 1⊕3 = 4 mod 4 = 0; 3⊕1 = 0. Equal — commutative for this pair. (In general, yes: (a+b) mod 4 = (b+a) mod 4.)*
*(c) e = 0 — because a⊕0 = (a+0) mod 4 = a for all a ∈ S.*
*(d) 3⊕1 = 0 = e, so the inverse of 3 is 1.*

**[P55 — SCORE]**  Award 1 point for P76 if all four parts correct; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 5 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.90  →  ⌈0.90 × 5⌉ = 5
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score = 5/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 4/5 → Identify which items failed:**
  - Q1 wrong → closure gap → TB-R01.
  - Q2 wrong → MC-2 or MC-3 → TB-R02 (matrix multiplication example).
  - Q3 wrong → check (i) vs (ii) separately; closure gap → TB-R01; associativity gap → explain with numbers.
  - Q4 wrong → MC-2 → TB-R02 (commutativity is optional; give counterexample).
  - P76 wrong → map error to (a)/(b)/(c)/(d): closure → TB-R01; identity/inverse → re-derive from definition; commutativity → TB-R02.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.binary-operation
MASTERY_REACHED: true
UNLOCKS:         math.abst.group-theory
NEXT_CONCEPT:    math.abst.group-theory
SESSION_CLOSE:   "You now understand that a binary operation is simply a closure-preserving
                  rule on a set. Commutativity, associativity, identity, and inverses are
                  extra properties an operation may have — and group theory is the study of
                  operations that have all four."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: CLOSURE-VIOLATION (MC-1)

**Trigger:** Student accepts an operation as binary despite the output leaving S on some pair.

**Step 1 — Single counterexample suffices.**
> To DISPROVE closure, you only need ONE pair (a, b) where a ∗ b ∉ S.

**Step 2 — Structured check.**
> For the claimed operation and set, pick a "stress-test" pair:
> - If S ⊆ ℤ and ∗ = subtraction: try the smallest minus the largest.
> - If ∗ = division: try 1 ÷ 2.
> - If ∗ = square root: try √2 (irrational, likely outside the set).

**Step 3 — Confirm the definition.**
> Binary operation: ∗: S × S → S — the OUTPUT must be IN S for EVERY pair. Not just most.

**Exit:** Return to the TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: COMMUTATIVITY-REQUIRED (MC-2)

**Trigger:** Student rejects an operation because a ∗ b ≠ b ∗ a.

**Step 1 — State what the definition requires.**
> The DEFINITION of binary operation only requires closure.
> The question "is it commutative?" is SEPARATE.

**Step 2 — Counterexample: matrix multiplication.**
> Let A = [[1,1],[0,1]] and B = [[1,0],[1,1]].
> AB = [[2,1],[1,1]], BA = [[1,1],[1,2]].  AB ≠ BA.
> Yet matrix multiplication IS a binary operation on 2×2 real matrices — it is closed.
> It is simply NOT commutative.

**Step 3 — Reframe commutativity.**
> Commutativity means "order doesn't matter."
> Binary operation means "closure."
> These are independent conditions.

**Exit:** Return to TA-A03 P49 checkpoint, part (ii).

---

### TB-R03 · Repair: ARITHMETIC-ONLY (MC-3)

**Trigger:** Student does not recognise non-arithmetic rules as binary operations.

**Step 1 — Expand the example set.**
> Three non-arithmetic binary operations:
> 1. Set intersection ∩ on subsets of U: A ∩ B is always a subset of U → closed.
> 2. String concatenation on strings: "hello" + "world" = "helloworld" → still a string → closed.
> 3. XOR on {0,1}: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0 → all in {0,1} → closed.

**Step 2 — Apply the closure test to each.**
> For each one: "Does every pair of inputs produce an output in S?"
> If yes, it is a binary operation — regardless of how it looks.

**Step 3 — Restate the definition.**
> A binary operation is ANY rule ∗: S×S→S.  The "∗" can be anything.

**Exit:** Return to TA-A03 P49 checkpoint.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "Is a ∗ b = 2^a a binary operation on ℤ? Explain."
    Target: No — 2^a takes only one input (a), not two; or if interpreted as a∗b=2^(a+b),
            check closure on ℤ: 2^(a+b) is always positive, so not in ℤ when result < 0
            is needed... actually 2^(anything) > 0, so 2^(a+b) ∈ ℤ⁺ ⊆ ℤ. But the
            function only depends on a, not b — it is not a genuine binary operation.
            PASS if student identifies the problem.
    Alternative probe: "Is subtraction a binary operation on ℕ = {1,2,3,...}? Give a counterexample."
    Target: No — 2−5=−3∉ℕ. PASS if counterexample given.

  Interval-2 (+3 days):
    Probe: "Name one binary operation on ℤ that is NOT commutative."
    Target: Subtraction (3−5 ≠ 5−3). PASS if correct with justification.

  Interval-3 (+1 week):
    Probe: "Define a ∗ b = max(a,b) on ℝ. Is ∗ a binary operation? Is it commutative?
            Does it have an identity element?"
    Target: Yes (closed, max(a,b)∈ℝ). Commutative (max(a,b)=max(b,a)). No identity
            (there is no e ∈ ℝ with max(a,e)=a for all a, since for a < e we get e ≠ a).
            PASS if all three answered correctly.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (closure check) and TA-A03 (contrast table).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.found.function-set-theoretic:
    Used in:   TA-A01 (binary op defined as function ∗: S×S→S; arrow diagram),
               TA-A02 P64 (output must land in codomain = S),
               TA-A04 P76 (⊕ defined as a function on S={0,1,2,3}).
    Assumed:   Student can read f: A→B notation; understands domain, codomain, Cartesian product.

UNLOCKS_ENABLED:
  math.abst.group-theory:
    Dependency: Group theory studies binary operations with ALL FOUR extra properties
                (closure, associativity, identity, inverses). Student must first hold the
                definition of binary operation and understand that the four properties are
                independent and optional.

CROSS_LINKS_NOTED:
  (none)
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. Closure is the ENTIRE definition; everything else is extra.**
Students typically arrive expecting a binary operation to be commutative, to have an identity, and
to behave like arithmetic.  The fastest way to break this expectation is TB-R02's matrix
multiplication example — two 2×2 matrices whose product depends on order.  Use it early if MC-2
appears.

**2. The set S matters as much as the rule.**
Subtraction on ℤ: binary operation.  Subtraction on ℕ: not a binary operation.  Same rule,
different set, different answer.  Emphasise this in TA-A02 to anchor MC-1 to the set, not just
the rule.

**3. The Cayley table is the clearest Pictorial representation for finite sets.**
For the P76 probe, a 4×4 Cayley table for ⊕ on {0,1,2,3} makes closure visible as "every entry
in the table is in {0,1,2,3}."  If a student struggles with parts (a)–(b), suggest building the
full table.

**4. bloom = understand: proofs not required, but justifications are.**
Students do not need to prove theorems about binary operations.  They need to explain why a given
rule is or is not a binary operation on a given set, and identify whether specific properties
hold, with one illustrative example or counterexample as evidence.

**5. This blueprint is a direct prerequisite for group theory (math.abst.group-theory).**
The group axioms (closure, associativity, identity, inverse) are exactly the four optional
properties introduced in TA-A03.  Point this out in P78 so students see the purpose of the
abstract definition they just learned.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.binary-operation
===================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = C.
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02, P41 + P64).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03, TB-R02, TB-R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P03 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA; gate TAs exempt from GR-2 as
               the P64 + P49 structure serves the gate function)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross_links to document (cross_links = []).
[PASS] V-17  GR-9: P76 uses Independence mode (cross_links = []); probe is self-contained
               (modular arithmetic on {0,1,2,3}, no external Tier 1 concept required).
[PASS] V-18  GR-10: MAMR stated in Component 3; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Core definition covered: ∗: S×S→S, closure.
             Four optional properties (associativity, commutativity, identity, inverse) named
             and explicitly labelled as optional.
             MC-1 (closure violation) anchored to the set-dependence of the definition.
             MC-2 (commutativity required) countered by matrix multiplication example.
             MC-3 (arithmetic-only) countered by set intersection, string concatenation, XOR.
             P76 probe exercises closure, commutativity, identity, and inverse on {0,1,2,3}
             with modular addition — no external Tier 1 dependency.

VERDICT: PACKAGE_READY
```

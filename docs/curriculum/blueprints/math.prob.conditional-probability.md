# Teaching Blueprint — math.prob.conditional-probability

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.prob.conditional-probability
KG_FIELDS:
  difficulty:        proficient
  bloom:             apply
  mastery_threshold: 0.90
  estimated_hours:   4
  requires:          [math.prob.probability-axioms]
  unlocks:           [math.prob.independence, math.prob.bayes-theorem,
                      math.prob.total-probability]
  cross_links:       []

SESSION_TA_CAP:      7   (estimated_hours = 4 → ≥1h band → cap 7)
CPA_ENTRY_STAGE:     C   (bloom = apply: start Concrete even at proficient difficulty;
                          execution of the formula requires grounded numerical examples first)
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
**Conditional probability** P(A|B) is the probability of event A given that event B has already
occurred, defined as P(A|B) = P(A ∩ B) / P(B), valid when P(B) > 0.  Conditioning on B restricts
the sample space from Ω to B: we ignore all outcomes outside B and rescale so the remaining
probabilities sum to 1.  This is the foundation of Bayesian reasoning.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Card-drawing without replacement; two-step experiment with updated counts |
| **Pictorial (P)** | Venn diagram with B shaded as the new "universe"; reduced sample space |
| **Abstract (A)** | Formula P(A|B) = P(A∩B)/P(B); asymmetry P(A|B) ≠ P(B|A) in general |

### Prerequisite Knowledge (from KG)
- **math.prob.probability-axioms** — Kolmogorov axioms; P(A∩B), P(A∪B), P(A^c); probability measure

### Key Facts
| Statement | Formula |
|-----------|---------|
| Definition | P(A\|B) = P(A ∩ B) / P(B), P(B) > 0 |
| Multiplication rule | P(A ∩ B) = P(A\|B) × P(B) = P(B\|A) × P(A) |
| P(A\|B) is itself a probability measure on B | P(Ω\|B) = 1; P(A\|B) ≥ 0; disjoint additivity holds within B |
| Asymmetry | P(A\|B) ≠ P(B\|A) in general |
| Undefined when | P(B) = 0 |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | CONDITIONAL-IS-JOINT | Writes P(A\|B) = P(A ∩ B) without dividing by P(B) | Reads "probability of A and B" rather than "probability of A given B"; missing the rescaling step | **FOUNDATIONAL** |
| MC-2 | REVERSING-CONDITIONING | Writes P(A\|B) = P(B\|A) always; confuses which event is the condition | "Given" and "of" are treated as symmetric; no awareness that swapping condition changes the value | Secondary |
| MC-3 | ZERO-DENOMINATOR-IGNORED | Attempts to compute P(A\|B) without verifying P(B) > 0; divides by zero without flagging | No habit of checking the denominator's validity before applying the formula | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03
and P91.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P03 card-draw analogy: updated counts after conditioning + P11 + P49)
      → TA-A02 (P41/P64 MC-1 gate: formula P(A|B)=P(A∩B)/P(B) + P07 worked pair + P49)
      → TA-A03 (P06 contrast: P(A|B) vs P(B|A); zero-denominator check + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (rescaling the reduced sample space)
  MC-2 → TB-R02 (P(A|B) vs P(B|A) — two explicit calculations)
  MC-3 → TB-R03 (undefined conditional; check P(B)>0 first)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: Conditioning Restricts the Sample Space (P03 + P11 + P49)

**[P03 — ANALOGY BRIDGE]**

A deck has 52 cards.  You draw one card and are told it is **red** (hearts or diamonds).  Now
you want to know: what is the probability it is a **heart**?

**Before knowing the card is red:**
P(heart) = 13/52 = 1/4.

**After knowing the card is red:**
Only the 26 red cards are possible.  Of those, 13 are hearts.
P(heart | red) = 13/26 = 1/2.

What changed?  The **sample space shrank** from 52 cards to 26 red cards.  Knowing B = "red"
eliminates all non-red outcomes.  We then count only outcomes inside B.

**[P11 — REPRESENTATION SHIFT]**

Three ways to express P(heart | red):

| Representation | Expression |
|----------------|-----------|
| **Counting** | (hearts that are red) / (total red cards) = 13/26 = 1/2 |
| **Venn diagram** | Shade B = {red cards}; P(heart\|red) = size of A∩B region / size of B region |
| **Formula** | P(heart ∩ red) / P(red) = (13/52) / (26/52) = 13/26 = 1/2 |

All three give the same answer.  The **formula** (third row) is what we use when outcomes are
not equally likely.

**[P49 — ADAPTIVE CHECKPOINT]**

> A bag has 4 red marbles and 6 blue marbles.  You draw one marble and are told it is blue.
> What is the probability it is a dark blue marble, given 3 of the 6 blue marbles are dark blue?
> Use the counting method.

- **CORRECT** (3/6 = 1/2 — sample space reduces to 6 blue marbles, 3 dark): ✓ Advance to TA-A02.
- **PARTIAL** (gets 3/10 — uses full sample space): Flag MC-1. Route to TB-R01. Return.
- **INCORRECT** (other wrong answer): Flag MC-1. Route to TB-R01. Return.
- **NO_RESPONSE**: Scaffold "After learning the marble is blue, how many marbles are still possible?"

---

### TA-A02 · MC-1 Gate: The Conditional Probability Formula (P41 + P64 + P07 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> Events A and B: P(A) = 0.3, P(B) = 0.5, P(A ∩ B) = 0.1.
> A student computes P(A | B) = P(A ∩ B) = 0.1.
> Is the student correct?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student is **wrong**.

The correct formula is: **P(A|B) = P(A ∩ B) / P(B)**.

Why divide by P(B)?  Conditioning on B means we RESTRICT to the world where B has occurred.
Inside that restricted world, probabilities must still sum to 1.  Dividing by P(B) rescales
them so P(B|B) = P(B)/P(B) = 1 (the certain event in the new world).

P(A|B) = 0.1 / 0.5 = **0.2**.

The student forgot to divide by P(B) = 0.5, which made the answer too small.

**[P07 — WORKED EXAMPLE PAIR]**

**Example 1 (correct application):**
> P(A) = 0.6, P(B) = 0.4, P(A ∩ B) = 0.24.
> P(A|B) = 0.24 / 0.4 = **0.6**.
> (In this special case P(A|B) = P(A) — knowing B didn't change anything.)

**Example 2 (catch the error):**
> P(A) = 0.5, P(B) = 0.8, P(A ∩ B) = 0.3.
> A student writes P(A|B) = P(A) × P(B) = 0.5 × 0.8 = 0.4.
> **Error:** P(A|B) is NOT P(A) × P(B).  Correct: P(A|B) = 0.3 / 0.8 = **0.375**.

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2.  Find P(A|B).

- **CORRECT** (0.2/0.4 = 0.5): ✓ MC-1 cleared. Advance to TA-A03.
- **PARTIAL** (correct division but wrong arithmetic): Retry once with scaffolding.
- **INCORRECT** (writes 0.2 or 0.2×0.4): Route to TB-R01 (brief). Return.
- **NO_RESPONSE**: Scaffold "P(A|B) = P(A∩B) / P(B) = 0.2 / ?"

---

### TA-A03 · Asymmetry and Undefined Conditionals (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — P(A|B) vs P(B|A):**

Setting: Roll a fair die (Ω = {1,2,3,4,5,6}).
Let A = {even} = {2,4,6}, P(A) = 1/2.
Let B = {≤ 3} = {1,2,3}, P(B) = 1/2.
A ∩ B = {2}, P(A ∩ B) = 1/6.

| Conditional | Formula | Value | Meaning |
|-------------|---------|:-----:|---------|
| P(A\|B) | P(A∩B)/P(B) = (1/6)/(1/2) | **1/3** | "Given we rolled ≤3, what's P(even)?" → only 2 qualifies out of {1,2,3} |
| P(B\|A) | P(A∩B)/P(A) = (1/6)/(1/2) | **1/3** | "Given we rolled even, what's P(≤3)?" → only 2 qualifies out of {2,4,6} |

In this symmetric example P(A|B) = P(B|A), but this is a coincidence (P(A) = P(B)).

**Counter-example to show they differ:**
Let C = {6}, P(C) = 1/6.  A = {even}, P(A) = 1/2.  A ∩ C = {6}, P(A ∩ C) = 1/6.

| Conditional | Formula | Value |
|-------------|---------|:-----:|
| P(A\|C) | (1/6)/(1/6) = **1** | "Given we rolled 6, it must be even" |
| P(C\|A) | (1/6)/(1/2) = **1/3** | "Given we rolled even, only 1 of 3 even numbers is 6" |

P(A|C) = 1 ≠ 1/3 = P(C|A).

> **Rule:** Always read the condition carefully.  P(A|B) ≠ P(B|A) in general.

---

**Contrast B — defined vs undefined:**

| Case | P(B) | P(A|B) |
|------|:----:|:------:|
| P(B) = 0.5 | 0.5 > 0 | Defined: 0.1/0.5 = 0.2 |
| P(B) = 0 | 0 | **UNDEFINED** — cannot divide by zero |

> **Rule:** Always verify P(B) > 0 before computing P(A|B).  If P(B) = 0, event B cannot
> occur, so "given B" is a vacuous condition with no probabilistic meaning.

**[P49 — ADAPTIVE CHECKPOINT]**

> In a class, P(passes exam) = 0.7, P(studies) = 0.6, P(passes ∩ studies) = 0.5.
> (i) Find P(passes | studies).   (ii) Find P(studies | passes).

Expected:
*(i) P(passes ∩ studies)/P(studies) = 0.5/0.6 ≈ 0.833.*
*(ii) P(passes ∩ studies)/P(passes) = 0.5/0.7 ≈ 0.714.*

- **CORRECT** (both correct to 3 d.p.): ✓ Advance to TA-A04.
- **PARTIAL — reversal** (swaps numerator/denominator or mixes which P to divide by): MC-2 active.
  Route to TB-R02. Return.
- **PARTIAL — (i) correct, (ii) wrong**: Ask "Which event is the condition in (ii)?" Retry once.
- **INCORRECT** (both wrong): TB-R01 then TB-R02. Return.
- **NO_RESPONSE**: Scaffold "(i) The condition is 'studies', so divide by P(studies) = 0.6."

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** P(A ∩ B) = 0.15, P(B) = 0.25.  Find P(A|B).

*(Target: 0.15/0.25 = 0.6.)*

**Q2.** In a group of 100 people, 60 exercise and 30 eat healthy.  Of the 30 healthy eaters,
20 also exercise.  Given a person exercises, what is the probability they eat healthy?

*(Target: P(healthy ∩ exercise) = 20/100 = 0.2; P(exercise) = 60/100 = 0.6;
P(healthy|exercise) = 0.2/0.6 = 1/3 ≈ 0.333.)*

**Q3.** P(A) = 0.5, P(B|A) = 0.4.  Find P(A ∩ B) using the multiplication rule.

*(Target: P(A ∩ B) = P(B|A) × P(A) = 0.4 × 0.5 = 0.2.)*

**Q4.** TRUE or FALSE: "P(A|B) is always equal to P(B|A)."  If false, give a counterexample.

*(Target: FALSE.  Counterexample from TA-A03: P(A|C)=1 ≠ P(C|A)=1/3, or any numerical example
where P(A) ≠ P(B).)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — self-contained.*

> A box contains 5 red chips and 3 blue chips.  You draw two chips **without replacement**.
>
> (a) What is P(second chip is red | first chip was red)?
> (b) What is P(second chip is red | first chip was blue)?
> (c) Are P(second red | first red) and P(second red | first blue) equal?
>     What does this tell you about the draws?
> (d) Use the multiplication rule to find P(both chips are red).

*Expected answers:*
*(a) After removing one red chip: 4 red, 3 blue remain (7 total). P = 4/7.*
*(b) After removing one blue chip: 5 red, 2 blue remain (7 total). P = 5/7.*
*(c) 4/7 ≠ 5/7 — the draws are NOT independent. Knowing the first outcome changes the
    probability of the second.*
*(d) P(both red) = P(first red) × P(second red | first red) = (5/8) × (4/7) = 20/56 = 5/14.*

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
  - Q1 wrong → MC-1 residual → TB-R01.
  - Q2 wrong → identify whether error is in constructing P(A∩B) (counting) or dividing → TB-R01
    if formula error; re-explain table-to-probability conversion if counting error.
  - Q3 wrong → multiplication rule confusion → re-read the key facts table and retry.
  - Q4 wrong → MC-2 residual → TB-R02.
  - P76 wrong → (a)/(b) wrong → TB-R01 (updated counts); (c) wrong → re-read asymmetry;
    (d) wrong → multiplication rule from Q3 repair.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.prob.conditional-probability
MASTERY_REACHED: true
UNLOCKS:         math.prob.independence, math.prob.bayes-theorem, math.prob.total-probability
NEXT_CONCEPT:    math.prob.independence  (or math.prob.total-probability)
SESSION_CLOSE:   "You can now compute P(A|B) for any events with P(B)>0, apply the
                  multiplication rule, and recognise that P(A|B) ≠ P(B|A) in general.
                  These skills directly feed into Bayes' theorem and the law of total
                  probability."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: CONDITIONAL-IS-JOINT (MC-1)

**Trigger:** Student omits division by P(B); writes P(A|B) = P(A ∩ B).

**Step 1 — Counting analogy.**
> Return to the card example: B = "red" (26 cards), A ∩ B = "red hearts" (13 cards).
> If you only wrote P(A ∩ B) = 13/52 = 0.25, you haven't used the information that the card IS red.
> Knowing B happened means you're only in the 26-card world now.
> So you count: 13 out of 26 = 13/26 = 0.5, not 13/52.

**Step 2 — The formula's purpose.**
> P(A|B) = P(A ∩ B) / P(B).
> Dividing by P(B) rescales all probabilities inside B to sum to 1.
> P(B|B) = P(B)/P(B) = 1 — "given B, B is certain." That makes sense.
> But P(A ∩ B) alone ≤ P(B), so P(A ∩ B) / P(B) ≤ 1. ✓

**Step 3 — Numeric drill.**
> Try: P(A ∩ B) = 0.3, P(B) = 0.6. P(A|B) = 0.3 / 0.6 = 0.5.

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: REVERSING-CONDITIONING (MC-2)

**Trigger:** Student writes P(A|B) = P(B|A) or swaps numerator/denominator.

**Step 1 — Two calculations side by side.**
> Events: A = "rolls 5 or 6", P(A)=1/3.  B = "rolls even", P(B)=1/2.  A∩B = {6}, P(A∩B)=1/6.
> P(A|B) = P(A∩B)/P(B) = (1/6)/(1/2) = 1/3.  "Given even, the die shows 5 or 6" → only 6 ✓.
> P(B|A) = P(A∩B)/P(A) = (1/6)/(1/3) = 1/2.  "Given 5 or 6, is it even?" → only 6 of {5,6} ✓.

**Step 2 — Denominator identification rule.**
> The denominator is ALWAYS the probability of the **condition** (the event after the "|").
> P(A|B): condition = B, denominator = P(B).
> P(B|A): condition = A, denominator = P(A).
> P(A∩B) is always the numerator regardless of which direction.

**Exit:** Return to TA-A03 P49 checkpoint.

---

### TB-R03 · Repair: ZERO-DENOMINATOR-IGNORED (MC-3)

**Trigger:** Student computes P(A|B) without checking P(B) > 0.

**Step 1 — Why P(B) = 0 is a problem.**
> P(A|B) means "given that B occurred."  If P(B) = 0, event B never occurs.
> Asking "given that something impossible happened" has no meaningful answer.
> Mathematically, P(A|B) = P(A∩B)/P(B) = P(A∩B)/0 is undefined.

**Step 2 — Build the habit.**
> Before computing P(A|B):
> Step 0: Check P(B) > 0.  If yes, proceed.  If no, write "undefined."

**Exit:** Continue with awareness of the check in subsequent problems.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "P(A∩B)=0.12, P(B)=0.3. Find P(A|B)."
    Target: 0.12/0.3 = 0.4. PASS if correct.

  Interval-2 (+3 days):
    Probe: "P(A)=0.4, P(B)=0.6, P(A∩B)=0.2. Find P(A|B) and P(B|A). Are they equal?"
    Target: P(A|B)=0.2/0.6=1/3; P(B|A)=0.2/0.4=0.5. Not equal. PASS if both correct and
            student correctly says they are unequal.

  Interval-3 (+1 week):
    Probe: "P(A)=0.7, P(B|A)=0.3. Use the multiplication rule to find P(A∩B)."
    Target: P(A∩B)=P(B|A)×P(A)=0.3×0.7=0.21. PASS if correct.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (formula) or TA-A03 (asymmetry) as appropriate.
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.prob.probability-axioms:
    Used in:   TA-A01 (P(A∩B) notation from prerequisite; probability as a measure on events),
               TA-A02 (P(A∩B) used in the formula; axiom A2 ensures P(B|B)=1),
               TA-A04 Q3 (multiplication rule P(A∩B)=P(B|A)×P(A)), P76 (draws without replacement).
    Assumed:   Student can compute P(A∩B), P(A∪B); knows P(A)∈[0,1]; knows probability axioms.

UNLOCKS_ENABLED:
  math.prob.independence:
    Dependency: Independence is defined as P(A|B) = P(A), i.e., conditioning on B does not
                change the probability of A. Requires the conditional probability formula.
  math.prob.bayes-theorem:
    Dependency: Bayes' theorem P(A|B) = P(B|A)P(A)/P(B) rearranges the multiplication rule;
                requires understanding of both P(A|B) and P(B|A).
  math.prob.total-probability:
    Dependency: Total probability P(B) = ΣP(B|Aᵢ)P(Aᵢ) uses P(B|Aᵢ) conditional probabilities.

CROSS_LINKS_NOTED:
  (none)
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. bloom = apply: formula execution is the primary goal.**
Students must be able to extract P(A∩B) and P(B) from problem descriptions (tables, words, or
given values) and correctly divide.  The card-draw and marble examples in TA-A01 provide the
Concrete anchoring needed before the abstract formula.  The P07 worked pair in TA-A02 models
the formula execution twice, including a common wrong approach.

**2. MC-1 is driven by notation confusion, not conceptual confusion.**
Most students understand that conditioning changes the sample space (they get the card example).
The error is algebraic: they write P(A∩B) instead of P(A∩B)/P(B).  The P64 explanation
("dividing by P(B) rescales probabilities to sum to 1") plus the P07 worked pair usually
resolves MC-1 in one pass.

**3. MC-2 (reversing conditioning) is the highest-stakes error.**
Confusing P(A|B) with P(B|A) is the core error in prosecutor's fallacy reasoning (used in
legal/medical contexts).  TA-A03 Contrast A demonstrates this with both a symmetric and
asymmetric case to prevent over-generalisation from the symmetric coincidence.

**4. P76 probe exercises the multiplication rule forward.**
Parts (a)–(b) test the basic formula with updated counts; (c) introduces the concept of
independence (not yet taught) as a consequence; (d) applies the multiplication rule.  This
sequencing previews math.prob.independence without teaching it — appropriate at bloom=apply.

**5. The TA-A03 zero-denominator contrast is brief by design.**
MC-3 is a procedural gap, not a conceptual one.  The repair (TB-R03) is a habit-building step,
not a deep conceptual intervention.  Don't over-invest time here; flag and move on.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.prob.conditional-probability
=========================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = C (bloom = apply; concrete numerical entry required).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 + P07 + P49).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03 P06, TB-R02, TB-R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P03 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross_links to document (cross_links = []).
[PASS] V-17  GR-9: P76 uses Independence mode (cross_links = []); probe is self-contained
               (5 red + 3 blue chips drawn without replacement; no external Tier 1 concept).
[PASS] V-18  GR-10: MAMR stated in Component 3; enforced — MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Definition P(A|B) = P(A∩B)/P(B) taught with C→P→A CPA ladder.
             Multiplication rule P(A∩B) = P(A|B)×P(B) derived and applied in Q3.
             Asymmetry P(A|B) ≠ P(B|A) demonstrated with symmetric and asymmetric examples.
             Undefined case P(B)=0 addressed in TA-A03 Contrast B and TB-R03.
             bloom = apply served by: P03 Concrete card/marble examples, P07 worked formula
             pairs, P76 multi-step draw-without-replacement probe.
             MC-1 (missing denominator) addressed by P64 rescaling explanation + P07.
             MC-2 (reversing conditioning) addressed by TA-A03 Contrast A + TB-R02.
             MC-3 (zero denominator) addressed by TA-A03 Contrast B + TB-R03.

VERDICT: PACKAGE_READY
```

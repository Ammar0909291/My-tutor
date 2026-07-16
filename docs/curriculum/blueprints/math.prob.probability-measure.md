# Teaching Blueprint — math.prob.probability-measure

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.prob.probability-measure
KG_FIELDS:
  difficulty:        developing
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   2
  requires:          [math.prob.event]
  unlocks:           [math.prob.probability-axioms]
  cross_links:       [math.meas.measure]

SESSION_TA_CAP:      7   (estimated_hours = 2 → 0.5–1 h band → cap 5; ≥1h band → cap 7 applies)
CPA_ENTRY_STAGE:     C   (difficulty = developing → start Concrete)
P76_MODE:            Independence
  rationale:         math.meas.measure is NOT a Tier 1 concept; treat cross_links as empty.
PASS_CRITERION:      ⌈0.90 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
A **probability measure** assigns to every event A a real number P(A) ∈ [0, 1] satisfying three
Kolmogorov axioms: (i) P(A) ≥ 0 for all events A; (ii) P(Ω) = 1; (iii) if A and B are mutually
exclusive, P(A ∪ B) = P(A) + P(B). Everything else — complement rule, general addition rule,
P(∅) = 0 — follows from these three axioms by algebra.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Counting outcomes in equally-likely sample spaces (marbles, dice, coins); writing P = favourable / total as a fraction then a decimal |
| **Pictorial (P)** | Venn diagrams showing A ∩ B overlap; number-line placing P(A) in [0, 1] |
| **Abstract (A)** | Three Kolmogorov axioms; derived rules: P(A^c) = 1 − P(A), P(A ∪ B) = P(A) + P(B) − P(A ∩ B), P(∅) = 0 |

### Prerequisite Knowledge (from KG)
- **math.prob.event** — event as a subset of the sample space Ω; complement, union, intersection

### Core Derivations Students Must Follow
1. P(∅) = 0: Ω and ∅ are mutually exclusive and Ω ∪ ∅ = Ω ⟹ P(Ω) + P(∅) = P(Ω) = 1 ⟹ P(∅) = 0.
2. P(A^c) = 1 − P(A): A and A^c are mutually exclusive, A ∪ A^c = Ω ⟹ P(A) + P(A^c) = 1.
3. General addition rule: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) (A ∩ B counted twice in P(A) + P(B)).

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | PROBABILITY-AS-PERCENTAGE | Writes P(A) = 60 or P(A) = 75% instead of 0.60 | Confuses the probability scale [0, 1] with the percentage scale [0, 100]; treats "probability" and "chance" as synonymous with percentage | **FOUNDATIONAL** |
| MC-2 | COMPLEMENT-ERROR | Writes P(A^c) = 1 + P(A), or P(A^c) = P(A), or omits complement rule entirely | Does not connect A ∪ A^c = Ω with P(Ω) = 1; sees complement as "the opposite" without a numeric rule | Secondary |
| MC-3 | ADDITION-FORMULA-ALWAYS-SUM | Always writes P(A ∪ B) = P(A) + P(B), even when A ∩ B ≠ ∅ | Overgeneralises the mutually-exclusive rule; does not notice double-counting the overlap | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) must be cleared at TA-A02 gate before MC-2 and MC-3 are
addressed. MC-2 addressed in TA-A03; MC-3 addressed in TA-A03 and reinforced in TA-A04 (P91).

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P03 concrete analogy + P11 representation shift + P49)
      → TA-A02 (P41/P64 MC-1 gate + P49)
      → TA-A03 (P06 axiom contrast table + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair branches (Protocol B) activate on INCORRECT/PARTIAL in any TA-A0x:
  MC-1 active → TB-R01 (scale anchoring)
  MC-2 active → TB-R02 (complement derivation walkthrough)
  MC-3 active → TB-R03 (overlap counting)
  After repair → re-enter at the TA where the error occurred.
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: Concrete Probability (P03 + P11 + P49)

**[P03 — ANALOGY BRIDGE]**

Imagine a jar holding **3 red** marbles and **7 blue** marbles — 10 marbles in total, all identical
except for colour.  You reach in without looking and pull one out.

- Favourable outcomes (red): 3
- Total equally-likely outcomes: 10
- Fraction: 3/10

We write this as **P(red) = 3/10**.

Now convert: 3 ÷ 10 = **0.3**.

P(red) = 0.3.  Not 3.  Not 30.  Not 30%.  The number **0.3** — a decimal between 0 and 1.

> **Why [0, 1]?**  You can never pull fewer than 0 red marbles (so P ≥ 0) and you can never pull
> more marbles than exist (so P ≤ 1, reached only when every marble is red).

**[P11 — REPRESENTATION SHIFT]**

Three equivalent ways to write the same fact:

| Representation | Value | Read as |
|----------------|-------|---------|
| Fraction | 3/10 | "3 out of 10" |
| Decimal | 0.3 | "zero point three" |
| Axiom statement | P(red) = 0.3 ∈ [0, 1] | "the probability of red is 0.3, a valid measure" |

All three mean the same thing.  The **axiomatic form** (column 3) is what we use in mathematics
because it works even when outcomes are not equally likely.

**[P49 — ADAPTIVE CHECKPOINT]**

> A bag holds 5 green and 5 yellow counters.  You draw one at random.  Write P(green) using the
> axiomatic form.

- **CORRECT** (P(green) = 0.5 or 5/10 or 1/2, value in [0, 1]): ✓ Confirmed.  Advance to TA-A02.
- **PARTIAL** (writes 1/2 but also says "that's 50%"): Acknowledge the fraction is right; note
  that 50% and 0.5 are different representations — in probability we write the decimal 0.5, not
  the percentage 50%. Advance to TA-A02 with MC-1 flagged.
- **INCORRECT** (writes 5, 50, or 50%): Flag MC-1 active. Route to TB-R01, then return here.
- **NO_RESPONSE**: Restate: "Count the green counters (5), count all counters (10), divide: 5 ÷ 10 = ?"
  Prompt again.

---

### TA-A02 · MC-1 Gate: Probability Lives in [0, 1] (P41 + P64 + P49)

*Activate only if MC-1 was not flagged in TA-A01; otherwise this gate fires automatically after TB-R01.*

**[P41 — MISCONCEPTION DETECTOR]**

> A weather forecast says there is a **70% chance of rain**.  A student writes:
> P(rain) = 70.
> Is this correct?  What should it be?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student's answer **P(rain) = 70** is incorrect.

Here is the conceptual shift:

| Everyday language | Mathematical probability |
|-------------------|--------------------------|
| "70% chance" | P(rain) = 0.70 |
| "50-50" | P(rain) = 0.50 |
| "certain" | P(rain) = 1 |
| "impossible" | P(rain) = 0 |

**Rule (permanent):** To convert a percentage to a probability, divide by 100.
70% → 70 ÷ 100 = **0.70**.

A valid probability is always a number in **[0, 1]**.  Numbers like 70, 1.3, or −0.2 are
**invalid** as probabilities.

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> Which of the following could be a valid probability?
> (A) 0.85   (B) 85   (C) 1.05   (D) −0.2

- **CORRECT** (A only, or "0.85"): ✓ MC-1 cleared. Advance to TA-A03.
- **PARTIAL** (selects A but also B): Ask "Is 85 between 0 and 1?" — redirect to the [0, 1] rule.
  Try once more; if correct, advance.
- **INCORRECT** (selects B, C, or D): Route to TB-R01 (extended). Return here.
- **NO_RESPONSE**: Ask "Is 85 larger than 1?" to scaffold.

---

### TA-A03 · Axiom Contrast Table: All Four Core Rules (P06 + P49)

**[P06 — CONTRAST PAIR]**

Here are the four rules that every probability measure must satisfy.  For each rule the table
shows a **valid** and an **invalid** example side by side.

| Rule | Formula | Valid example | Invalid example |
|------|---------|--------------|-----------------|
| **Non-negativity** | P(A) ≥ 0 | P(snow in July) = 0 | P(snow) = −0.1 ✗ |
| **Certainty** | P(Ω) = 1 | P(die shows 1–6) = 1 | P(Ω) = 0.9 ✗ |
| **Complement** | P(A^c) = 1 − P(A) | P(A) = 0.3 → P(A^c) = 0.7 | P(A^c) = 1 + 0.3 = 1.3 ✗ |
| **General addition** | P(A ∪ B) = P(A) + P(B) − P(A ∩ B) | P(A)=0.5, P(B)=0.4, P(A∩B)=0.2 → P(A∪B)=0.7 | P(A∪B) = 0.5 + 0.4 = 0.9 (drops −P(A∩B)) ✗ |

> **Why subtract P(A ∩ B)?**  Draw a Venn diagram with overlapping circles.  When you add P(A)
> and P(B), the overlap A ∩ B is counted once in P(A) and once again in P(B) — twice total.
> Subtracting P(A ∩ B) once corrects the double-count.

> **Special case:** If A and B are mutually exclusive (A ∩ B = ∅, so P(A ∩ B) = 0), the formula
> reduces to P(A ∪ B) = P(A) + P(B).  That is the rule you may have seen first — it is a
> *special case*, not the general rule.

**[P49 — ADAPTIVE CHECKPOINT]**

> Two events A and B have P(A) = 0.6, P(B) = 0.5, P(A ∩ B) = 0.3.
> (i) Find P(A^c).   (ii) Find P(A ∪ B).

- **CORRECT** (P(A^c) = 0.4 AND P(A ∪ B) = 0.8): ✓ Both axiom chains working. Advance to TA-A04.
- **PARTIAL — complement wrong** (P(A^c) ≠ 0.4 but union correct): MC-2 active. Route to TB-R02.
  Return to this checkpoint after repair.
- **PARTIAL — union wrong** (complement correct but P(A ∪ B) ≠ 0.8, e.g. gets 1.1): MC-3 active.
  Route to TB-R03. Return to this checkpoint.
- **INCORRECT** (both wrong): Flag MC-2 and MC-3. Route to TB-R02 first (MAMR FIFO), then TB-R03.
  Return here.
- **NO_RESPONSE**: Ask "(i) P(A) + P(A^c) = ?" to scaffold.

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Which probability assignment is valid?
(A) P(A) = 0, P(A^c) = 1
(B) P(A) = 0.4, P(A^c) = 0.4
(C) P(A) = 1.2, P(A^c) = −0.2
(D) P(A) = 75, P(A^c) = 25

*(Target: A — the only assignment summing to 1 with values in [0, 1].)*

**Q2.** Event A has probability P(A) = 0.35.  Find P(A^c).

*(Target: 0.65, from P(A^c) = 1 − 0.35.)*

**Q3.** Events C and D satisfy P(C) = 0.5, P(D) = 0.4, P(C ∩ D) = 0.1.  Find P(C ∪ D).

*(Target: 0.5 + 0.4 − 0.1 = 0.8.)*

**Q4.** A student claims: "The probability of rain is 0.6 and the probability of no rain is 0.5,
so P(rain) + P(no rain) = 1.1."  Identify the error and state the correct values.

*(Target: The error is that the complement rule requires P(no rain) = 1 − 0.6 = 0.4, so the sum
is 0.6 + 0.4 = 1.0.  Having both values exceed 0.5 violates P(A^c) = 1 − P(A).)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — no other Tier 1 concept required.*

> A fair six-sided die has faces {1, 2, 3, 4, 5, 6}, each equally likely.
> Let **E** = {2, 4, 6} (even numbers) and **F** = {2, 3, 5} (prime numbers).
>
> (a) Find P(E) and P(F).
> (b) Find E ∩ F.  Hence find P(E ∩ F).
> (c) Use the general addition rule to find P(E ∪ F).
> (d) Find P(E^c) — the probability of NOT rolling an even number.

*Expected answers:*
*(a) P(E) = 3/6 = 1/2 = 0.5; P(F) = 3/6 = 1/2 = 0.5.*
*(b) E ∩ F = {2}; P(E ∩ F) = 1/6 ≈ 0.167.*
*(c) P(E ∪ F) = 0.5 + 0.5 − 1/6 = 1 − 1/6 = 5/6 ≈ 0.833.*
*(d) P(E^c) = 1 − 0.5 = 0.5.*

**[P55 — SCORE]**  Award 1 point for P76 if (a)–(d) all correct; 0 otherwise.

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
  - Q1 or Q4 wrong → MC-1 residual → TB-R01 (abbreviated).
  - Q2 wrong → MC-2 residual → TB-R02 (abbreviated).
  - Q3 wrong → MC-3 residual → TB-R03 (abbreviated).
  - P76 wrong → concept transfer gap → re-expose the general addition rule with a different
    example, then re-administer P76 with a coin-flip variant.
  - After repair, re-administer only the failed items; full re-gate is not required.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.prob.probability-measure
MASTERY_REACHED: true
UNLOCKS:         math.prob.probability-axioms
NEXT_CONCEPT:    math.prob.probability-axioms
SESSION_CLOSE:   "You now know the three Kolmogorov axioms and the two derived rules —
                  complement and general addition — that govern every probability calculation
                  you will ever encounter."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: PROBABILITY-AS-PERCENTAGE (MC-1)

**Trigger:** Student writes P(A) > 1 or P(A) expressed as a percentage (e.g. 60, 75%).

**Step 1 — Anchor the scale.**
> Draw a number line from 0 to 1.  Mark 0 ("impossible") and 1 ("certain").
> Where would you place P(red) = 3/10?  Draw it on the line.

*(Student places 0.3 between 0 and 1.)*

**Step 2 — Expose the error.**
> Now, where would you place 30?  Is it on the line between 0 and 1?

*(30 is off the line entirely.)*

**Step 3 — Convert the percentage.**
> "30%" is a way of saying 30 per 100, i.e. 30 ÷ 100 = 0.30.
> So the probability is 0.30, NOT 30.

**Step 4 — Restate the rule.**
> Probability is always a decimal (or fraction) between 0 and 1 inclusive.
> To convert: percentage ÷ 100 = probability.

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: COMPLEMENT-ERROR (MC-2)

**Trigger:** P(A^c) calculated incorrectly (e.g. = P(A), or = 1 + P(A)).

**Step 1 — Draw the Venn diagram.**
> Draw a rectangle labelled Ω.  Shade a circle inside it and call it A.
> The unshaded region is A^c.

**Step 2 — Use P(Ω) = 1.**
> The entire rectangle (Ω) has probability 1.
> P(A) + P(A^c) = P(Ω) = 1.
> Therefore P(A^c) = 1 − P(A).  Not "1 + P(A)".  Not "P(A)".

**Step 3 — Numeric example.**
> If P(A) = 0.7, then P(A^c) = 1 − 0.7 = 0.3.  Check: 0.7 + 0.3 = 1 ✓.

**Exit:** Return to TA-A03 P49 checkpoint, part (i).

---

### TB-R03 · Repair: ADDITION-FORMULA-ALWAYS-SUM (MC-3)

**Trigger:** Student computes P(A ∪ B) = P(A) + P(B), omitting −P(A ∩ B).

**Step 1 — Draw overlapping circles.**
> Draw Venn diagram with events A and B overlapping.  Shade A ∪ B.
> Point to the overlap region A ∩ B.

**Step 2 — Count the overlap.**
> When you add P(A) to P(B), the overlap A ∩ B is included in P(A) AND again in P(B) — counted
> **twice**.  But it only exists once in reality.  So subtract it once:
> P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

**Step 3 — Numeric example.**
> P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2.
> Wrong: 0.5 + 0.4 = 0.9 (counts overlap twice).
> Correct: 0.5 + 0.4 − 0.2 = 0.7.

**Step 4 — Special case reminder.**
> If A ∩ B = ∅ (mutually exclusive), P(A ∩ B) = 0, so the formula reduces to P(A) + P(B).
> That rule is a **special case**, not the general rule.

**Exit:** Return to TA-A03 P49 checkpoint, part (ii).

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "P(A) = 0.4; find P(A^c) and confirm it is in [0,1]."
    Target: 0.6; PASS if correct and explicitly bounded.

  Interval-2 (+3 days):
    Probe: "Events X and Y: P(X)=0.55, P(Y)=0.45, P(X∩Y)=0.15. Find P(X∪Y)."
    Target: 0.55+0.45−0.15 = 0.85; PASS if correct.

  Interval-3 (+1 week):
    Probe: "A student writes P(B) = 1.1. What is wrong? What constraint does a
            valid probability measure impose?"
    Target: P(B) > 1 is invalid; P(B) ∈ [0,1] required; PASS if both points stated.

REACTIVATION_TRIGGER: Any of the three probes fails → requeue TA-A03 + TA-A04.
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.prob.event:
    Used in:   TA-A01 (sample space Ω, event as subset), TA-A03 (A^c, A∪B, A∩B notation),
               TA-A04 P77 Q4 (complement of rain event), P76 (E and F as subsets of {1..6}).
    Assumed:   Student can write an event as a subset of Ω and compute A^c, A∪B, A∩B.

UNLOCKS_ENABLED:
  math.prob.probability-axioms:
    Dependency: Requires student to hold all four rules (non-negativity, certainty, complement,
                general addition) before studying formal axiomatic development.

CROSS_LINKS_NOTED:
  math.meas.measure:
    Status:    NOT Tier 1 — P76_MODE set to Independence.
    Note:      Measure theory generalises the probability measure to σ-algebras; that
               generalisation is deferred. No cross-link probe is produced here.
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. P(A) ∈ [0, 1] is the single hardest fact to internalise.**
Students live in a percentage world.  Every weather app, every sports statistic, every exam score
is expressed as a percentage.  The decimal form [0, 1] requires active retraining.  TB-R01's
number-line anchor is the most reliable intervention; use it without hesitation.

**2. Distinguish the complement rule from the addition rule early.**
MC-2 and MC-3 appear simultaneously for many students because both involve "doing something with
1".  The key contrast: complement uses subtraction from 1 with a *single* event; addition uses
subtraction of the overlap between *two* events.  The Venn diagram in TB-R03 Step 1 makes this
spatial distinction visible.

**3. The mutually-exclusive special case is a trap.**
Many students first encounter P(A ∪ B) = P(A) + P(B) in a mutually-exclusive context and lock
it in as the general rule.  TA-A03's contrast table places the special case in the bottom row
explicitly labelled "special case" to pre-empt MC-3.

**4. P76 die probe is deliberately multi-step.**
Parts (a)–(d) form a chain: P(E) and P(F) feed into P(E ∩ F) which feeds into P(E ∪ F), and
P(E^c) tests the complement rule independently.  A student who loses the thread between steps
likely has MC-3 residual; re-administer TB-R03 Step 3 with the die fractions.

**5. bloom = understand: no procedure memorisation required.**
This blueprint does not demand algorithmic drill.  Understanding means the student can explain
*why* P(A^c) = 1 − P(A) (using P(Ω) = 1) and *why* the −P(A ∩ B) term appears (double-count
correction).  Q4 in P77 targets exactly this explanatory fluency.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.prob.probability-measure
=====================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block is complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP stated and respected (cap 7; 4 TAs used ≤ 7).
[PASS] V-4   CPA_ENTRY_STAGE = C (difficulty = developing).
[PASS] V-5   P76_MODE stated with explicit rationale (math.meas.measure not Tier 1).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared before secondary MCs (MAMR enforced).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02 with P41 + P64).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03, TB-R02, TB-R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with a B-category primitive.
               TA-A01→P03 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has a P49 checkpoint.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA; gate TAs exempt)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; no P49 outside P91.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 is terminal in TA-A04 with correct compound P77→P55→P76→P55→P75→P55→P74→P55→P78.
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: Cross-link math.meas.measure documented in Component 7.
[PASS] V-17  GR-9: P76 uses Independence mode (math.meas.measure not Tier 1); probe is self-contained.
[PASS] V-18  GR-10: MAMR stated in Component 3; enforced — MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → repair by item).

CONTENT
[PASS] AIR   All four core rules covered: non-negativity, P(Ω)=1, complement, general addition.
             Key derivations (P(∅)=0, complement, general addition) included in Component 1.
             MC-1 (percentage scale) anchored on number line in TB-R01.
             MC-3 (special-case overgeneralisation) addressed explicitly in TA-A03 contrast table.
             P76 die probe exercises all four rules in a single scenario.

VERDICT: PACKAGE_READY
```

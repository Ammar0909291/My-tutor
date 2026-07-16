# Teaching Blueprint — math.prob.random-variable

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.prob.random-variable
KG_FIELDS:
  difficulty:        proficient
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   4
  requires:          [math.prob.probability-axioms, math.func.function-concept]
  unlocks:           [math.prob.distribution, math.prob.expected-value]
  cross_links:       [math.meas.measurable-function]

SESSION_TA_CAP:      7   (estimated_hours = 4 → ≥1h band → cap 7)
CPA_ENTRY_STAGE:     C   (difficulty = proficient; but the RV-as-function concept
                          requires concrete outcome-mapping examples before abstraction)
P76_MODE:            Independence
  rationale:         math.meas.measurable-function is NOT a Tier 1 concept; treat cross_links as empty.
PASS_CRITERION:      ⌈0.90 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
A **random variable** X is a function X: Ω → ℝ that assigns a real number to every outcome in
the sample space Ω.  X is NOT a fixed number — it is a rule that produces different numbers
depending on which outcome occurred.  A **discrete** random variable has a countable range
{x₁, x₂, …}; a **continuous** random variable has an uncountable range (typically an interval).
The event {X = x} means "the set of all outcomes ω ∈ Ω such that X(ω) = x."

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Die roll: each outcome ω ∈ {1,…,6} is mapped to X(ω) = ω itself (or X = # dots); coin toss: X(H)=1, X(T)=0 |
| **Pictorial (P)** | Arrow diagram X: Ω → ℝ; two rows — sample space on top, ℝ on bottom, arrows showing the mapping |
| **Abstract (A)** | Formal: X is a function; {X = x} = X⁻¹(x) = {ω ∈ Ω : X(ω) = x}; discrete vs continuous defined by cardinality of range |

### Prerequisite Knowledge (from KG)
- **math.prob.probability-axioms** — sample space Ω, events as subsets, probability measure P
- **math.func.function-concept** — function as a rule f: A → B; domain, codomain, range; well-defined

### Key Distinctions
| Property | Random Variable X | NOT a RV |
|----------|:-----------------:|:--------:|
| Is X a function? | ✓ X: Ω → ℝ | ✗ X = "maybe 3 or 5" (not a function) |
| Has one value per outcome? | ✓ Each ω maps to exactly one X(ω) | ✗ X(ω) = "any value" |
| Range is in ℝ | ✓ | ✗ Range is Ω itself (X must output real numbers) |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | RV-IS-FIXED-VALUE | Writes "X = 4" as if X is a constant; says "X is the number 4" | Confuses the random variable (the function) with its specific realised value X(ω); treats X like a variable in algebra | **FOUNDATIONAL** |
| MC-2 | RV-IS-DISTRIBUTION | Says "X is the probability distribution"; conflates the function X:Ω→ℝ with the induced probability measure on ℝ | Jumps past the function layer and thinks the RV is the table of (value, probability) pairs | Secondary |
| MC-3 | DISCRETE-MEANS-SMALL | Calls a RV discrete because it has "few" values; calls continuous "large" or "complex"; doesn't use cardinability criterion | "Discrete" and "continuous" treated as colloquial size descriptors, not formal mathematical definitions | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03
and P91.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P03 analogy: X as outcome-to-number machine + P11 arrow diagram + P49)
      → TA-A02 (P41/P64 MC-1 gate: X is a function, not a number + P49)
      → TA-A03 (P06 contrast: discrete vs continuous; RV vs distribution + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (function language: X(ω) vs X)
  MC-2 → TB-R02 (RV = function; distribution = induced measure)
  MC-3 → TB-R03 (countable vs uncountable range)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: Random Variable as an Outcome-to-Number Machine (P03 + P11 + P49)

**[P03 — ANALOGY BRIDGE]**

Think of a random variable as a **machine**.

You roll a fair die.  The die produces an outcome ω ∈ Ω = {1, 2, 3, 4, 5, 6}.  Then you feed
the outcome into the machine, and the machine outputs a **number**.

Machine X: "output the number of dots" → X(ω) = ω.
- ω = 1 → X(1) = 1
- ω = 2 → X(2) = 2
- ω = 6 → X(6) = 6

Machine Y: "output 1 if odd, 0 if even" → Y(ω) = ω mod 2.
- ω = 1 → Y(1) = 1
- ω = 2 → Y(2) = 0
- ω = 5 → Y(5) = 1

The machine is the random variable.  The output (the number) is the **value** of X at ω, written X(ω).
X itself is not any single number — it is the rule that produces numbers.

**[P11 — REPRESENTATION SHIFT]**

Three representations of the same coin-toss random variable (Ω = {H, T}, X(H) = 1, X(T) = 0):

| Representation | Description |
|----------------|------------|
| **Verbal** | "X = 1 if heads, 0 if tails" |
| **Arrow diagram** | H → 1, T → 0 (arrows from Ω to ℝ) |
| **Formal notation** | X: {H, T} → ℝ, defined by X(H)=1, X(T)=0 |

All three describe the same function.  The **formal notation** (third row) is what we use in
rigorous probability because it shows that X is a function from the sample space to the real line.

**[P49 — ADAPTIVE CHECKPOINT]**

> A single fair coin is tossed twice.  Ω = {HH, HT, TH, TT}.
> Define X = number of heads.  Write out X(ω) for each ω.

Expected: X(HH) = 2, X(HT) = 1, X(TH) = 1, X(TT) = 0.

- **CORRECT** (all four values listed): ✓ Advance to TA-A02.
- **PARTIAL** (lists some but confuses X with P(X=x)): Flag MC-2. Advance to TA-A02 with note.
- **INCORRECT** (says "X = 0, 1, or 2" without mapping to specific outcomes): Flag MC-1.
  Route to TB-R01. Return.
- **NO_RESPONSE**: Scaffold "For ω = HH: how many heads? So X(HH) = ?"

---

### TA-A02 · MC-1 Gate: X Is a Function (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> A student is asked to define the random variable X for a fair six-sided die roll.
> She writes: "X = 4."
> What is wrong with this definition?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student has given a **specific value** of X, not the random variable X itself.

"X = 4" is a statement about one particular outcome (the die showing 4).  It does not define X
for any other outcome.

**A random variable is a FUNCTION, not a number.** The definition must specify what X does for
EVERY outcome ω in Ω:

> X: {1, 2, 3, 4, 5, 6} → ℝ,  X(ω) = ω  for all ω ∈ Ω.

Then we can ask:
- "What is X when ω = 4?" → X(4) = 4.  This is a VALUE.
- "What is P(X = 4)?" → P({ω : X(ω) = 4}) = P({4}) = 1/6.  This is a PROBABILITY.

X itself is the function.  X(ω) is the value.  P(X = x) is the probability.

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> Ω = {1, 2, 3, 4, 5, 6} (fair die).  Define Y(ω) = 1 if ω is even, 0 if ω is odd.
> (i) Write out Y(ω) for each ω.
> (ii) What is P(Y = 1)?

Expected:
*(i) Y(1)=0, Y(2)=1, Y(3)=0, Y(4)=1, Y(5)=0, Y(6)=1.*
*(ii) P(Y=1) = P({2,4,6}) = 3/6 = 1/2.*

- **CORRECT** (both parts right): ✓ MC-1 cleared. Advance to TA-A03.
- **PARTIAL — (ii) wrong** (writes P(Y=1) = Y(2)+Y(4)+Y(6) = 3): MC-2 active. Route to TB-R02.
  Return.
- **INCORRECT** (i wrong — writes single value for Y): Route to TB-R01 (brief). Return.
- **NO_RESPONSE**: Scaffold "(i) Is 2 even or odd? So Y(2) = ?"

---

### TA-A03 · Discrete vs Continuous; RV vs Distribution (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — Discrete vs Continuous Random Variables:**

| | Discrete | Continuous |
|-|----------|-----------|
| **Range** | Countable: {0,1,2}, ℤ, ℕ | Uncountable: [0,1], ℝ, (a,b) |
| **Key word** | "Countable" — you can list the values | "Uncountable" — impossible to list all values |
| **Example** | X = number of heads in 3 flips: range {0,1,2,3} | Y = time until next earthquake: range (0,∞) |
| **Example** | Z = sum of two dice: range {2,3,…,12} | W = weight of a randomly chosen apple: range [100g,300g] |
| **Example** | Die roll X: range {1,2,3,4,5,6} | V = uniform on [0,1]: range [0,1] |

> **Definition rule:** Discrete ↔ range is finite or countably infinite.
> Continuous ↔ range is uncountably infinite (typically an interval of ℝ).
> "Few values" does not mean discrete; "many values" does not mean continuous.

---

**Contrast B — Random Variable vs Probability Distribution:**

| Object | What it IS | Example |
|--------|-----------|---------|
| **Random Variable X** | A function X: Ω → ℝ | X(H)=1, X(T)=0 (the RULE) |
| **Distribution of X** | A probability measure on ℝ induced by X | P(X=0)=0.5, P(X=1)=0.5 (the TABLE of probabilities) |

The RV and its distribution are DIFFERENT objects.  The RV is the function; the distribution is
the answer to "how likely is each value?"  You need X (the function) first, then you can derive
the distribution by computing P(X = x) = P({ω : X(ω) = x}) for each x.

**[P49 — ADAPTIVE CHECKPOINT]**

> Mark each statement as TRUE (about the random variable X) or FALSE:
> (i) "X is a function from Ω to ℝ."
> (ii) "X = 0.5" (for a fair coin flip with X(H)=1, X(T)=0).
> (iii) "X is discrete if its range is countable."
> (iv) "P(X=1) is the random variable X itself."

Expected: (i) TRUE. (ii) FALSE (0.5 is P(X=1) or the average, not X). (iii) TRUE. (iv) FALSE (P(X=1) is a probability number, not the function X).

- **CORRECT** (all four right): ✓ Advance to TA-A04.
- **PARTIAL — (ii) and/or (iv) wrong** (MC-1 or MC-2): Route to TB-R01 or TB-R02 as indicated.
  Return.
- **PARTIAL — (iii) wrong**: MC-3 → Route to TB-R03. Return.
- **INCORRECT** (three or four wrong): TB-R01 → TB-R02 → TB-R03 as needed. Return.
- **NO_RESPONSE**: Scaffold "(i) We said X is a machine from Ω to ℝ — is that a function?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** A bag has 2 red and 3 blue marbles.  You draw one.  Define X = 1 if red, 0 if blue.
Write X(ω) for every outcome ω ∈ Ω.  Then compute P(X = 1).

*(Target: Ω = {r₁, r₂, b₁, b₂, b₃}. X(r₁)=X(r₂)=1, X(b₁)=X(b₂)=X(b₃)=0.
P(X=1) = P({r₁,r₂}) = 2/5.)*

**Q2.** Is the following a discrete or continuous random variable?  Justify.
"Y = the exact temperature (in °C) of a randomly chosen city at noon."

*(Target: Continuous — temperature takes values in an interval (uncountable range).)*

**Q3.** TRUE or FALSE: "The random variable X for a fair die equals 3.5 on average, so X = 3.5."

*(Target: FALSE.  3.5 is the expected value of X (average outcome), not a value X can actually
take.  X ∈ {1,2,3,4,5,6} — it never equals 3.5.  X is a function; 3.5 is a summary statistic.)*

**Q4.** For the coin-flip RV X (X(H)=1, X(T)=0), a student writes:
"X is the distribution: P(X=0)=0.5, P(X=1)=0.5."
What important distinction is the student missing?

*(Target: X is the FUNCTION X:Ω→ℝ, not the distribution.  The distribution is derived FROM X
by computing P(X=x).  The function X and its distribution are different mathematical objects.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — self-contained.*

> Two fair dice are rolled.  Ω = {(i,j) : i,j ∈ {1,2,3,4,5,6}}, 36 equally-likely outcomes.
> Define S: Ω → ℝ by S(i,j) = i + j (the sum of the two dice).
>
> (a) What is S(3,5)?  What is S(6,6)?
> (b) List all outcomes (i,j) ∈ Ω such that S(i,j) = 7.
> (c) Compute P(S = 7).
> (d) Is S a discrete or continuous random variable?  Justify.

*Expected answers:*
*(a) S(3,5) = 8; S(6,6) = 12.*
*(b) (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 outcomes.*
*(c) P(S=7) = 6/36 = 1/6.*
*(d) Discrete — the range of S is {2,3,4,…,12}, a finite (countable) set.*

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
  - Q1 wrong → MC-1 (didn't write X(ω) for each ω) → TB-R01.
  - Q2 wrong → MC-3 (discrete/continuous confusion) → TB-R03.
  - Q3 wrong → MC-1 or MC-2 (confuses X with expected value) → TB-R01 brief (X is a function;
    3.5 is a derived number, not a value of X).
  - Q4 wrong → MC-2 → TB-R02.
  - P76 wrong → (a) simple evaluation → re-read the definition of S; (b)/(c) → TB-R01 (event
    as preimage {ω : S(ω) = x}); (d) → TB-R03 (range is finite).
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.prob.random-variable
MASTERY_REACHED: true
UNLOCKS:         math.prob.distribution, math.prob.expected-value
NEXT_CONCEPT:    math.prob.distribution
SESSION_CLOSE:   "You now understand that a random variable is a function X:Ω→ℝ, not a
                  fixed number. You can evaluate X(ω) for any outcome, compute P(X=x)
                  by counting preimages, and classify a RV as discrete or continuous by
                  the cardinability of its range."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: RV-IS-FIXED-VALUE (MC-1)

**Trigger:** Student writes X = specific number without specifying the mapping for all outcomes.

**Step 1 — Function language.**
> A random variable is a function.  A function needs a rule for EVERY input.
> "X = 4" says nothing about when ω = 1, 2, 3, 5, or 6.

**Step 2 — Write out the full mapping.**
> For X = number of dots on a die:
> X(1) = 1, X(2) = 2, X(3) = 3, X(4) = 4, X(5) = 5, X(6) = 6.
> Only after writing this does X become a well-defined random variable.

**Step 3 — Distinguish X from X(ω).**
> X is the entire function (the machine).
> X(4) = 4 is the output when the input is ω = 4.  That's a value, not the RV.

**Exit:** Return to TA-A02 P49 checkpoint, part (i).

---

### TB-R02 · Repair: RV-IS-DISTRIBUTION (MC-2)

**Trigger:** Student conflates the random variable X with its probability distribution.

**Step 1 — Name the two objects.**
> Object 1: Random variable X.  This is the function X: Ω → ℝ.
> Object 2: Distribution of X.  This is the table (or formula) P(X = x) for each x in the range.

**Step 2 — Show the derivation direction.**
> You START with X (the function).
> You COMPUTE the distribution: for each x, evaluate {ω : X(ω) = x} and find its probability.
> The function comes first; the distribution is derived from it.

**Step 3 — Concrete example.**
> X for a fair coin: X(H) = 1, X(T) = 0 → this is the function.
> Distribution: P(X=0) = P({T}) = 0.5; P(X=1) = P({H}) = 0.5 → these are derived probabilities.

**Exit:** Return to TA-A03 P49 checkpoint, parts (ii) and (iv).

---

### TB-R03 · Repair: DISCRETE-MEANS-SMALL (MC-3)

**Trigger:** Student uses "few values" for discrete or "large" for continuous.

**Step 1 — The correct criterion.**
> Discrete: the range of X can be listed as a sequence x₁, x₂, x₃, …  (finite or countably infinite).
> Continuous: the range of X is an uncountable set (e.g., an interval — you cannot list all values).

**Step 2 — Examples of each.**
> Discrete (range is countable):
>   - Die roll: range = {1,2,3,4,5,6} — finite ✓
>   - Number of heads in infinite flips: range = {0,1,2,…} — countably infinite ✓
> Continuous (range is uncountable):
>   - Height of a random person: range = (140cm, 220cm) — uncountable ✓
>   - Time until next bus: range = (0, ∞) — uncountable ✓

**Step 3 — Counter the size intuition.**
> {0,1,2,3,…,10000} is large but countable → DISCRETE.
> [0,1] is small (it fits between 0 and 1) but uncountable → CONTINUOUS.
> Size doesn't matter; countability does.

**Exit:** Return to TA-A03 P49 checkpoint, part (iii).

---

<!-- COMPONENT 6: P89 Spaced Repetition -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "For Ω={1,2,3,4} (uniform), define X(ω)=ω². Write X(ω) for each ω and find P(X=9)."
    Target: X(1)=1, X(2)=4, X(3)=9, X(4)=16. P(X=9)=P({3})=1/4. PASS if both correct.

  Interval-2 (+3 days):
    Probe: "Is Y = weight of a randomly chosen tomato (in grams) discrete or continuous? Why?"
    Target: Continuous — weight in an interval (uncountable range). PASS if justification cites
            countability criterion, not size.

  Interval-3 (+1 week):
    Probe: "A student says 'X is its probability distribution.' What is wrong? Give a one-sentence
            correction."
    Target: X is a function X:Ω→ℝ; the distribution P(X=x) is derived from X, not X itself.
            PASS if distinction is clear.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (function definition) or TA-A03 (contrasts).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.prob.probability-axioms:
    Used in:   TA-A01 (sample space Ω; P(X=x) notation from probability measure),
               TA-A02 (P(Y=1) computed via axioms on subsets of Ω),
               TA-A04 Q1 (P(X=1) computed as probability of an event).
    Assumed:   Student can compute P(A) for any event A ⊆ Ω; knows P(Ω)=1.

  math.func.function-concept:
    Used in:   TA-A01 (X as a function with domain Ω, codomain ℝ; well-defined map),
               TA-A02 (P64: "function" language — domain, rule, output),
               TA-A03 (RV vs distribution: function vs derived measure),
               TA-A04 P77 Q1+Q4 (function evaluation; function vs derived object).
    Assumed:   Student understands f: A→B notation; domain, codomain, rule, exactly-one-output.

UNLOCKS_ENABLED:
  math.prob.distribution:
    Dependency: A distribution is the probability measure on ℝ induced by a random variable;
                requires understanding of X as a function before studying its distribution.
  math.prob.expected-value:
    Dependency: E[X] = Σ x P(X=x) (discrete) requires knowing what P(X=x) means in terms
                of the function X and the probability axioms.

CROSS_LINKS_NOTED:
  math.meas.measurable-function:
    Status:    NOT Tier 1 — P76_MODE set to Independence.
    Note:      Measurability (Borel sets, σ-algebra preimages) generalises the RV definition
               to arbitrary measure spaces; deferred to measure theory. No cross-link probe.
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The function-concept prerequisite is essential.**
Students who have mastered `math.func.function-concept` (domain/codomain/rule) can immediately
parse "X: Ω → ℝ" as a function.  Those who haven't will struggle with TA-A02's P64.  If
the student's function vocabulary is shaky, re-visit the function blueprint before proceeding.

**2. MC-1 is driven by everyday language.**
In casual speech, "the random variable X is 4" is normal.  This conflates the function X with its
realised value.  TA-A02's P64 must shift this vocabulary: "X(ω) is 4 when ω = 4" distinguishes
the function from its output.  The arrow-diagram in P11 makes this visual.

**3. MC-2 often appears as MC-1 in disguise.**
When a student writes the distribution table and calls it X, they are simultaneously confusing X
with its distribution (MC-2) and X with a number (MC-1).  Check Q4 carefully: a student who
describes the distribution as X needs TB-R02, not TB-R01.

**4. MC-3 is purely definitional.**
"Countable" is the key word.  Students who have seen the real numbers (through
`math.found.real-numbers`) typically know that intervals are uncountable.  The counter-intuitive
contrast in TB-R03 ("a large set can be discrete, a small interval is continuous") is the most
effective anchor.

**5. P76 probe exercises preimage reasoning.**
Part (b) asks for all outcomes ω such that S(ω) = 7.  This is X⁻¹(7) — the preimage.  At
bloom=understand, students need to enumerate these explicitly (the 6 pairs summing to 7).  If a
student struggles with (b), they are not yet comfortable thinking of events as preimages of values.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.prob.random-variable
=================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = C (even at proficient difficulty; abstract function concept
              needs concrete outcome-mapping examples first).
[PASS] V-5   P76_MODE = Independence with explicit rationale (math.meas.measurable-function
              is NOT Tier 1).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 + P49).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03 P06 Contrast B and A; TB-R02, TB-R03).
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
[PASS] V-16  GR-8: Cross-link math.meas.measurable-function documented in Component 7.
[PASS] V-17  GR-9: P76 uses Independence mode (math.meas.measurable-function not Tier 1);
              probe is self-contained (two dice, sum function S, 36-outcome space; no external
              Tier 1 concept required beyond math.prob.probability-axioms prerequisite).
[PASS] V-18  GR-10: MAMR stated in Component 3; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Random variable defined as function X: Ω → ℝ; X(ω) vs X vs P(X=x) distinguished.
             Concrete mapping (die, coin, marble) provided at C layer.
             Arrow-diagram Pictorial representation included in P11.
             Formal notation X: Ω → ℝ in P64 and P11.
             Discrete vs continuous: countable vs uncountable range (correct criterion).
             RV vs distribution: function vs induced probability measure (Contrast B in TA-A03).
             MC-1 (X is a number) addressed by P64 + function-language repair TB-R01.
             MC-2 (X is its distribution) addressed by Contrast B + TB-R02.
             MC-3 (discrete = small) addressed by Contrast A + countability criterion TB-R03.
             P76 probe exercises function evaluation, preimage computation, probability
             computation, and discrete classification on the two-dice sum RV.

VERDICT: PACKAGE_READY
```

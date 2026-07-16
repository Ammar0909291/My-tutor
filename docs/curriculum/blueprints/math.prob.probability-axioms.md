# Teaching Blueprint — math.prob.probability-axioms

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.prob.probability-axioms
KG_FIELDS:
  difficulty:        developing
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   3
  requires:          [math.prob.probability-measure]
  unlocks:           [math.prob.conditional-probability, math.prob.independence]
  cross_links:       []

SESSION_TA_CAP:      7   (estimated_hours = 3 → ≥1h band → cap 7)
CPA_ENTRY_STAGE:     C   (difficulty = developing → start Concrete)
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
The three **Kolmogorov axioms** are the only assumed truths in probability theory.  Every other
result — P(∅) = 0, the complement rule P(A^c) = 1−P(A), the general addition rule
P(A∪B) = P(A)+P(B)−P(A∩B), and the monotonicity property P(A) ≤ P(B) when A ⊆ B — is
**derived** from those three axioms by explicit logical steps.  Understanding the axiomatic
structure means being able to identify which statements are axioms and which are theorems, and
being able to trace the derivation of a theorem back to the axioms that generate it.

### Distinction from math.prob.probability-measure
`math.prob.probability-measure` established that P(A) ∈ [0, 1] and introduced the four core
rules as working facts.  This blueprint goes one level deeper: WHY are those rules true?
The answer — they all follow from the three Kolmogorov axioms — is the subject here.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Fair coin toss Ω = {H, T}; verifying the three axioms hold for the uniform assignment P({H}) = P({T}) = 0.5 |
| **Pictorial (P)** | Venn diagrams annotated with axiom numbers at each proof step |
| **Abstract (A)** | Step-by-step derivations; monotonicity proof; general addition rule proof |

### The Three Kolmogorov Axioms (for reference in all derivations)
| # | Statement | In words |
|---|-----------|---------|
| A1 | P(A) ≥ 0 for all events A | Probabilities are non-negative |
| A2 | P(Ω) = 1 | The sample space has probability 1 |
| A3 | If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B) | Disjoint events add |

### Four Key Derived Theorems
| Theorem | Statement | Proof uses |
|---------|-----------|-----------|
| T1 | P(∅) = 0 | A2 + A3 (with Ω and ∅ disjoint) |
| T2 | P(A^c) = 1 − P(A) | A2 + A3 (with A and A^c disjoint) |
| T3 | A ⊆ B ⟹ P(A) ≤ P(B) | A1 + A3 (decompose B = A ∪ (B\A)) |
| T4 | P(A∪B) = P(A)+P(B)−P(A∩B) | A3 + T2 (decompose A∪B into disjoint parts) |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | AXIOM-THEOREM-CONFUSION | Calls P(∅)=0 "Axiom 3" or P(A^c)=1−P(A) "Axiom 4"; cannot identify the three Kolmogorov axioms precisely | Does not distinguish assumed truths (axioms) from derived truths (theorems); treats all probability rules as equal in status | **FOUNDATIONAL** |
| MC-2 | DERIVATION-GAP | Can state the complement rule but writes "P(A^c)=1−P(A) because complements add to 1" without naming which axioms justify each step | Cannot trace a proof step-by-step; conclusion stated as if self-evident | Secondary |
| MC-3 | MONOTONICITY-UNKNOWN | Does not know P(A)≤P(B) when A⊆B; or reverses the inequality (writes P(A)≥P(B)) | No exposure to the monotonicity theorem; or confuses subset direction with probability direction | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03
and P91.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P04 pattern induction: see ALL derived rules emerge from 3 axioms + P11 + P49)
      → TA-A02 (P41/P64 MC-1 gate: sort axioms vs theorems + P49)
      → TA-A03 (P06 contrast: proof-with-justification vs proof-gap; monotonicity derivation + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (axiom vs theorem classification drill)
  MC-2 → TB-R02 (step-by-step derivation with axiom labels)
  MC-3 → TB-R03 (monotonicity proof from first principles)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: One Source, Many Results (P04 + P11 + P49)

**[P04 — PATTERN INDUCTION]**

Every probability rule you have used follows from just **three** starting points.  Watch the
pattern:

**Starting point (the three axioms):**
- A1: P(A) ≥ 0
- A2: P(Ω) = 1
- A3: If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B)

**Round 1 — derive P(∅) = 0:**
> Ω and ∅ are disjoint: Ω ∩ ∅ = ∅.  Also Ω ∪ ∅ = Ω.
> By A3: P(Ω ∪ ∅) = P(Ω) + P(∅).
> By A2: P(Ω) = 1.
> So 1 = 1 + P(∅), therefore **P(∅) = 0**.  ← derived from A2 + A3.

**Round 2 — derive P(A^c) = 1 − P(A):**
> A and A^c are disjoint: A ∩ A^c = ∅.  Also A ∪ A^c = Ω.
> By A3: P(A ∪ A^c) = P(A) + P(A^c).
> By A2: P(Ω) = 1.
> So **P(A^c) = 1 − P(A)**.  ← derived from A2 + A3.

**The pattern:** Both results required only A2 and A3.  Nothing extra was assumed.

**[P11 — REPRESENTATION SHIFT]**

| Representation | A3 (disjoint additivity) |
|----------------|--------------------------|
| **Verbal** | "If two events cannot both happen, their probabilities add." |
| **Symbolic** | If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B) |
| **Proof role** | The single engine driving every derivation above |

**[P49 — ADAPTIVE CHECKPOINT]**

> Which of the following is a DERIVED result (not an axiom)?
> (A) P(A) ≥ 0 for all events A
> (B) P(Ω) = 1
> (C) P(∅) = 0

- **CORRECT** (C — P(∅)=0 was derived from A2+A3, not assumed): ✓ Advance to TA-A02.
- **PARTIAL** (selects C but also selects another): Ask "Which of these was listed in the
  three Kolmogorov axioms?" Re-read A1–A3 together. Retry once.
- **INCORRECT** (selects A or B): Flag MC-1. Route to TB-R01. Return here.
- **NO_RESPONSE**: "Reread the three axioms above. Which one mentions ∅?"

---

### TA-A02 · MC-1 Gate: Axioms vs Theorems (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> Here are five probability statements.  Sort them into two groups: AXIOM or THEOREM.
>
> 1. P(A) ≥ 0 for all events A
> 2. P(Ω) = 1
> 3. P(A^c) = 1 − P(A)
> 4. If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B)
> 5. P(∅) = 0

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

Correct sorting:

| AXIOM (assumed) | THEOREM (derived) |
|:---------------:|:-----------------:|
| 1. P(A) ≥ 0 | 3. P(A^c) = 1 − P(A) |
| 2. P(Ω) = 1 | 5. P(∅) = 0 |
| 4. P(A∪B)=P(A)+P(B) if A∩B=∅ | |

**Conceptual shift:** An **axiom** is a statement we ACCEPT without proof — it is a starting
point.  A **theorem** is a statement we PROVE from axioms.  In probability:
- Kolmogorov chose exactly 3 axioms (A1, A2, A3).
- Everything else is a theorem.
- The complement rule and P(∅)=0 were PROVEN from those 3 axioms in TA-A01.

If you see a textbook claim that P(∅)=0 is "obvious" or "defined", it is being imprecise —
in a rigorous treatment it is a theorem.

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> A student says: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B) is Axiom 4."  Identify the error.

- **CORRECT** (general addition rule is a THEOREM derived from A1+A2+A3; there are only 3
  axioms and this is not one of them): ✓ Advance to TA-A03.
- **PARTIAL** (says "it's not an axiom" but can't say what it is): Prompt "What do we call a
  statement derived from axioms?" → theorem. Advance.
- **INCORRECT** (agrees with the student): Route to TB-R01 (abbreviated). Return.
- **NO_RESPONSE**: Scaffold "How many axioms are there? Is this one of A1, A2, A3?"

---

### TA-A03 · Derivation Technique and Monotonicity (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — proof with justification vs proof gap:**

| Step | With justification (correct) | Without justification (gap) |
|------|-----------------------------|-----------------------------|
| 1 | A ∩ A^c = ∅, so by A3: P(A) + P(A^c) = P(A ∪ A^c) | "A and its complement add up" |
| 2 | A ∪ A^c = Ω, so P(A ∪ A^c) = P(Ω) | (step skipped) |
| 3 | By A2: P(Ω) = 1 | (axiom not cited) |
| 4 | Therefore P(A^c) = 1 − P(A) | "Therefore P(A^c) = 1 − P(A)" |

The right column arrives at the same answer but provides no evidence — it could be a guess.
A proof is the left-column chain: each step cites A1, A2, or A3.

---

**Contrast B — monotonicity proof (new theorem):**

**Claim (Theorem T3):** If A ⊆ B, then P(A) ≤ P(B).

**Proof:**
1. Since A ⊆ B, we can write B as a disjoint union: **B = A ∪ (B \ A)**, where B \ A = B ∩ A^c.
2. A and B \ A are disjoint (A ∩ (B \ A) = ∅).
3. By **A3**: P(B) = P(A) + P(B \ A).
4. By **A1**: P(B \ A) ≥ 0.
5. Therefore P(B) ≥ P(A), i.e., **P(A) ≤ P(B)**.  ∎

> **Key insight:** The proof uses BOTH A1 and A3.  A1 (non-negativity) is what produces the ≤
> inequality — without it, step 4 would not work and the direction could flip.

**[P49 — ADAPTIVE CHECKPOINT]**

> Events X and Y satisfy X ⊆ Y.  P(X) = 0.3.
> (i) What does monotonicity (Theorem T3) tell you about P(Y)?
> (ii) In the proof of T3, which axiom is responsible for the inequality direction?

Expected:
*(i) P(Y) ≥ 0.3.*
*(ii) A1 (non-negativity) — it ensures P(Y \ X) ≥ 0.*

- **CORRECT** (both parts right): ✓ Advance to TA-A04.
- **PARTIAL — (i) reversed** (writes P(Y) ≤ 0.3): MC-3 active. Route to TB-R03. Return.
- **PARTIAL — (ii) wrong** (cites A2 or A3 for the direction): MC-2 active. Route to TB-R02
  (abbreviated, focus on step 4). Return.
- **INCORRECT** (both wrong): TB-R03 then TB-R02. Return.
- **NO_RESPONSE**: Scaffold "X ⊆ Y means Y is at least as large a set as X.  Can P(Y) be smaller?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Which ONE of the following is a Kolmogorov AXIOM (not derived)?
(A) P(∅) = 0
(B) P(A^c) = 1 − P(A)
(C) If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B)
(D) P(A ∪ B) = P(A) + P(B) − P(A ∩ B)

*(Target: C — this is Axiom A3 verbatim.  A, B, D are all derived theorems.)*

**Q2.** Derive P(∅) = 0 from the three axioms.  Write each step with the axiom used.

*(Target: Ω ∩ ∅ = ∅ (definition); Ω ∪ ∅ = Ω (definition); by A3: P(Ω) + P(∅) = P(Ω ∪ ∅) = P(Ω);
by A2: P(Ω) = 1; so 1 = 1 + P(∅); therefore P(∅) = 0.)*

**Q3.** Events A and B satisfy A ⊆ B and P(B) = 0.7.  What is the maximum possible value
of P(A)?  Justify using the monotonicity theorem.

*(Target: P(A) ≤ P(B) = 0.7 by monotonicity.  Maximum is 0.7 (achieved when A = B).)*

**Q4.** A student writes: "The complement rule P(A^c) = 1 − P(A) is obvious because A and A^c
together make the whole sample space."  Is this a valid proof?  What is missing?

*(Target: Not a valid proof.  "Together make the whole sample space" is correct (A ∪ A^c = Ω)
but the step from that observation to the equation requires A3 (disjoint additivity — A ∩ A^c = ∅)
and A2 (P(Ω) = 1).  The student's statement is a verbal intuition, not a proof — the axioms are
not cited.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — self-contained.*

> Let Ω = {a, b, c, d} with P({a}) = 0.4, P({b}) = 0.3, P({c}) = 0.2, P({d}) = 0.1.
> Let A = {a, b} and B = {a, c}.
>
> (a) Verify Axiom A2: compute P(Ω) using A3 applied repeatedly to single-element disjoint events.
> (b) Note A ∩ B = {a} ⊆ A.  Apply monotonicity to conclude a relationship between P(A ∩ B)
>     and P(A).  Then compute both values directly to verify.
> (c) Derive P(A^c) using the complement theorem.  Verify by direct computation from A^c = {c, d}.
> (d) Which axiom ALONE guarantees that P({a}) = 0.4 ≥ 0?

*Expected answers:*
*(a) P(Ω) = P({a})+P({b})+P({c})+P({d}) by A3 (repeated): 0.4+0.3+0.2+0.1 = 1.0 ✓ (A2 holds).*
*(b) A∩B={a}⊆A, so by T3 P(A∩B)≤P(A). Compute: P(A∩B)=P({a})=0.4, P(A)=P({a})+P({b})=0.7. 0.4≤0.7 ✓.*
*(c) P(A^c) = 1−P(A) = 1−0.7 = 0.3. Direct: P({c})+P({d})=0.2+0.1=0.3 ✓.*
*(d) Axiom A1 (non-negativity).*

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
  - Q1 wrong → MC-1 residual → TB-R01 (abbreviated, re-sort the five statements).
  - Q2 wrong → MC-2 → TB-R02 (re-derive with explicit labels; check if steps A2 and A3 are named).
  - Q3 wrong → MC-3 → TB-R03.
  - Q4 wrong → MC-2 → TB-R02 (what "not a valid proof" means; what's missing).
  - P76 wrong → map to part (a)/(b)/(c)/(d): (a)→A3 not applied correctly; (b)→MC-3; (c)→MC-2;
    (d)→MC-1 (student doesn't know A1).  Re-administer the specific part after targeted repair.
  - After repair, re-administer only the failed items.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.prob.probability-axioms
MASTERY_REACHED: true
UNLOCKS:         math.prob.conditional-probability, math.prob.independence
NEXT_CONCEPT:    math.prob.conditional-probability  (or math.prob.independence)
SESSION_CLOSE:   "You can now distinguish the three Kolmogorov axioms from the theorems
                  they generate, and trace any probability derivation back to its axiom
                  source. This axiomatic foundation underlies all of conditional probability
                  and statistical independence."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: AXIOM-THEOREM-CONFUSION (MC-1)

**Trigger:** Student labels a derived result (P(∅)=0, complement rule, or general addition rule)
as an axiom; or cannot recite the three Kolmogorov axioms precisely.

**Step 1 — Recite the three axioms exactly.**
> Copy these three sentences:
> A1: P(A) ≥ 0 for all events A.
> A2: P(Ω) = 1.
> A3: If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B).

**Step 2 — Classify by source.**
> For each statement below, ask: "Is it one of A1, A2, A3 word-for-word?"
> - P(∅) = 0 → not in A1/A2/A3 → THEOREM.
> - P(A^c) = 1−P(A) → not in A1/A2/A3 → THEOREM.
> - P(A∪B)=P(A)+P(B)−P(A∩B) → not in A1/A2/A3 → THEOREM.

**Step 3 — State the rule.**
> There are exactly three Kolmogorov axioms.  Everything else is a theorem.  The number of
> axioms does not grow as we derive more facts.

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: DERIVATION-GAP (MC-2)

**Trigger:** Student states a theorem as a fact without citing the axioms that generate each step.

**Step 1 — Model a justified proof.**
> Derive P(∅) = 0 with explicit labels:
> Line 1: Ω ∩ ∅ = ∅ (definition of empty set and full sample space — no axiom needed).
> Line 2: Ω ∪ ∅ = Ω (definition).
> Line 3: P(Ω) + P(∅) = P(Ω ∪ ∅)  ← Axiom A3 (disjoint union, A ∩ B = ∅).
> Line 4: P(Ω ∪ ∅) = P(Ω) = 1  ← Axiom A2.
> Line 5: P(∅) = 0.

**Step 2 — Highlight what "citing an axiom" means.**
> Every equality that isn't a definition or arithmetic must be justified by "by A1", "by A2", or
> "by A3".  A proof without these citations is an argument by assertion, not a proof.

**Step 3 — Practice.**
> Ask the student to label the steps in the complement proof (TA-A01 Round 2) using A1/A2/A3.

**Exit:** Return to TA-A03 P49 checkpoint, part (ii).

---

### TB-R03 · Repair: MONOTONICITY-UNKNOWN (MC-3)

**Trigger:** Student doesn't know A ⊆ B implies P(A) ≤ P(B), or reverses the inequality.

**Step 1 — Concrete anchor.**
> A bag has 10 marbles.  Event A = "draw a red marble" (3 red marbles in the bag).
> Event B = "draw a red or blue marble" (3 red + 5 blue = 8 marbles).
> Clearly A ⊆ B (every red marble counts as red-or-blue).
> P(A) = 3/10 = 0.3.  P(B) = 8/10 = 0.8.  Is 0.3 ≤ 0.8?  Yes.

**Step 2 — Why the inequality can't flip.**
> B = A ∪ (B \ A).  These two parts are disjoint.
> By A3: P(B) = P(A) + P(B \ A).
> By A1: P(B \ A) ≥ 0.
> Adding a non-negative quantity can only increase or maintain, never decrease: P(B) ≥ P(A).

**Step 3 — Direction mnemonic.**
> "Bigger set, at least as big probability."
> A ⊆ B means A is the smaller set, B is at least as large → P(A) ≤ P(B).

**Exit:** Return to TA-A03 P49 checkpoint, part (i).

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "State the three Kolmogorov axioms from memory."
    Target: A1, A2, A3 all stated correctly. PASS if all three accurate.

  Interval-2 (+3 days):
    Probe: "Prove P(A^c) = 1−P(A) in three lines, citing the axiom used in each step."
    Target: Line 1 cites A3 (disjoint: A ∩ A^c = ∅, so P(A ∪ A^c)=P(A)+P(A^c)).
            Line 2 cites A2 (P(Ω)=1). Line 3: algebra. PASS if axioms named.

  Interval-3 (+1 week):
    Probe: "Events A ⊆ B with P(B) = 0.5. What can you say about P(A)?
            Which axiom makes the inequality direction certain?"
    Target: P(A) ≤ 0.5; Axiom A1. PASS if both correct.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (axiom/theorem sort) and TA-A03 (proofs).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.prob.probability-measure:
    Used in:   TA-A01 (student already knows the four core rules; this blueprint explains
               WHY they hold), TA-A02 gate (sorting rules into axioms vs derived),
               TA-A04 P76 (uniform assignment P({ω}) = c already a familiar pattern).
    Assumed:   Student can write P(A) ∈ [0,1]; knows complement, union, intersection notation;
               knows P(Ω)=1 and P(A^c)=1−P(A) as working rules.

UNLOCKS_ENABLED:
  math.prob.conditional-probability:
    Dependency: Conditional probability P(A|B) = P(A∩B)/P(B) is derived from the axioms;
                student must hold the axiomatic structure to understand why P(A|B) satisfies
                the axioms as a new probability measure on B.
  math.prob.independence:
    Dependency: Independence P(A∩B) = P(A)P(B) is defined via the axioms; the axiomatic
                framework is required to prove independence theorems.

CROSS_LINKS_NOTED:
  (none)
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The goal is axiomatic literacy, not derivation fluency.**
At bloom = understand, students do not need to discover proofs independently — they need to
verify that a given derivation is valid (step-by-step, citing axioms) and to recognise which
results are axioms vs. theorems.  Q4 in P77 targets this exactly: evaluating a student's
incomplete argument.

**2. MC-1 is the dominant blocker.**
Most students have never encountered the axiom/theorem distinction before.  They treat all
probability facts as rules of equal epistemic status.  The TA-A02 sorting exercise (five
statements → axiom or theorem) is the most direct intervention.  If it fails the first time,
TB-R01's "compare word-for-word to A1/A2/A3" technique almost always succeeds on the second
attempt.

**3. The complement proof is the model for all derivations.**
Because students already know P(A^c) = 1−P(A) from `math.prob.probability-measure`, they have
the conclusion memorised.  The value here is in the PROOF — seeing a known fact re-derived from
first principles.  Use this familiarity productively: "You already know the answer; now show me
WHY it must be true."

**4. Monotonicity connects sets and probabilities.**
The monotonicity theorem (T3) is often surprising: "if A is a subset of B, P(A) is smaller."
The concrete marble example in TB-R03 is essential for students who reverse the direction.
After the concrete example, the proof (decompose B = A ∪ B\A, apply A3, apply A1) should click.

**5. P76 probe is cumulative.**
Parts (a)–(d) are ordered from easiest (verify A2) to hardest (name the axiom).  A student who
fails only part (d) likely has MC-1 residual; failure on (b) suggests MC-3; failure on (c)
suggests MC-2.  Map failures precisely before routing to repair.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.prob.probability-axioms
=====================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = C (difficulty = developing).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02, P41 + P64 — axiom/theorem sorting).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03, TB-R02, TB-R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P04 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross_links to document (cross_links = []).
[PASS] V-17  GR-9: P76 uses Independence mode (cross_links = []); probe is self-contained
               (finite sample space {a,b,c,d} with explicit probabilities; no external Tier 1
               concept required).
[PASS] V-18  GR-10: MAMR stated in Component 3; enforced — MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Three Kolmogorov axioms stated precisely (A1, A2, A3).
             Four derived theorems named and labelled as theorems (T1–T4).
             P(∅)=0 derivation given step-by-step with axiom citations.
             Complement rule derivation given step-by-step with axiom citations.
             Monotonicity theorem T3 proven fully (decompose B=A∪(B\A), apply A1+A3).
             MC-1 (axiom/theorem confusion) addressed via TA-A02 sorting gate.
             MC-2 (derivation gap) addressed via P06 contrast table and TB-R02.
             MC-3 (monotonicity unknown/reversed) addressed via TA-A03 and TB-R03.
             P76 probe exercises A1, A2, A3, T2, T3 on a concrete 4-element space.

VERDICT: PACKAGE_READY
```

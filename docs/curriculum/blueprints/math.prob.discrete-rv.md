# Teaching Blueprint — math.prob.discrete-rv

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.prob.discrete-rv
KG_FIELDS:
  difficulty:        proficient
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   3
  requires:          [math.prob.random-variable]
  unlocks:           [math.prob.pmf, math.prob.discrete-distributions]
  cross_links:       []

SESSION_TA_CAP:      7   (estimated_hours = 3 → ≥1h band → cap 7)
CPA_ENTRY_STAGE:     C   (start Concrete: PMF tables with small sample spaces)
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
A **discrete random variable** X has a countable range {x₁, x₂, …}.  Its probability distribution
is completely described by the **probability mass function (PMF)** p(x) = P(X = x).  A PMF is
valid if and only if: (i) p(x) ≥ 0 for all x, and (ii) Σ p(xᵢ) = 1 (probabilities sum to 1).
The **support** of X is the set of values x where p(x) > 0.

### Distinction from math.prob.random-variable
`math.prob.random-variable` established that X: Ω → ℝ is a function from the sample space to
the reals, and that "discrete" means the range of X is countable.  This blueprint focuses
exclusively on discrete RVs and their PMFs — the complete numerical characterisation of the
probability distribution.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Fair die: tabulate x and p(x)=1/6; biased coin: tabulate P(H)=2/3, P(T)=1/3 |
| **Pictorial (P)** | Bar chart / probability histogram with x on the horizontal axis and p(x) on the vertical; bars reach p(x) |
| **Abstract (A)** | PMF definition: p: ℝ → [0,1]; properties p(x)≥0, Σp(x)=1; support; CDF vs PMF distinction |

### Prerequisite Knowledge (from KG)
- **math.prob.random-variable** — X: Ω→ℝ; P(X=x) = P({ω : X(ω)=x}); discrete = countable range

### PMF Validity Rules
| Rule | Check | Typical error |
|------|-------|--------------|
| Non-negativity | p(x) ≥ 0 for every listed x | p(x) = −0.1 for some x |
| Normalization | Σp(x) = 1 exactly | Σ = 0.9 (missing case) or Σ = 1.1 (double-counted) |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | PMF-SUMS-NOT-ONE | Writes a PMF where Σp(x) ≠ 1 without flagging the error; assigns probabilities by intuition without checking normalization | Does not treat Σp(x)=1 as a hard constraint; treats each p(x) assignment as independent | **FOUNDATIONAL** |
| MC-2 | SUPPORT-IS-ALL-REALS | Thinks p(x) must be defined (and nonzero) for all x ∈ ℝ; confused when p(x)=0 for most values | Doesn't understand that p(x)=0 for all x outside the support; conflates domain with support | Secondary |
| MC-3 | PMF-IS-CDF | Writes P(X ≤ x) when asked for the PMF p(x); or uses cumulative values as if they were individual probabilities | Confuses the PMF (point probability) with the CDF (cumulative probability); reads P(X=x) as P(X≤x) | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P03 analogy: fair die as canonical PMF + P11 table representation + P49)
      → TA-A02 (P41/P64 MC-1 gate: normalization Σp(x)=1 + P49)
      → TA-A03 (P06 contrast: valid vs invalid PMF; support; PMF vs CDF + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (normalization check — Σp(x) must equal 1 exactly)
  MC-2 → TB-R02 (support is where p(x)>0; outside support, p(x)=0)
  MC-3 → TB-R03 (PMF = P(X=x) vs CDF = P(X≤x))
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: The PMF as a Probability Table (P03 + P11 + P49)

**[P03 — ANALOGY BRIDGE]**

Roll a fair six-sided die.  The outcome X ∈ {1, 2, 3, 4, 5, 6}, each equally likely.

The **probability mass function** of X is the rule that assigns a probability to each value:

| x | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| p(x) | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 |

Key observations:
- Every probability is non-negative: p(x) = 1/6 > 0 for each x. ✓
- They sum to 1: 6 × 1/6 = 1. ✓
- The PMF gives you the EXACT probability of EACH specific outcome.

Now roll the die and ask "What is p(3)?"  Answer: p(3) = P(X = 3) = 1/6.
Note: p(7) = P(X = 7) = 0 — there is no 7 on a six-sided die.

**[P11 — REPRESENTATION SHIFT]**

Three representations of the same PMF:

| Representation | Die PMF |
|----------------|---------|
| **Table** | x=1→1/6, x=2→1/6, …, x=6→1/6 |
| **Bar chart** | 6 bars of equal height 1/6 at x=1,…,6 |
| **Formula** | p(x) = 1/6 if x ∈ {1,…,6}, else 0 |

All three describe the same distribution.  The **formula** representation (third row) makes
explicit that p(x) = 0 for all x outside {1, …, 6}.

**[P49 — ADAPTIVE CHECKPOINT]**

> A biased coin: P(H) = 0.3, P(T) = 0.7.  Let X = 1 if H, X = 0 if T.
> (i) Write the PMF as a table.
> (ii) Verify the normalization condition.

Expected:
*(i) x=0 → p(0)=0.7; x=1 → p(1)=0.3.*
*(ii) 0.7 + 0.3 = 1.0 ✓.*

- **CORRECT** (both right): ✓ Advance to TA-A02.
- **PARTIAL** (table correct but says "sum is 0.3 + 0.7 = 1 approximately"): Confirm that 1.0
  exactly is the requirement. Advance.
- **INCORRECT** (p(0)+p(1) ≠ 1, e.g. assigns 0.3+0.3=0.6): Flag MC-1. Route to TB-R01. Return.
- **NO_RESPONSE**: Scaffold "What is P(X=0)? That's the probability the coin shows tails."

---

### TA-A02 · MC-1 Gate: Normalization Must Hold Exactly (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> A student proposes the following PMF for X ∈ {1, 2, 3}:
> p(1) = 0.4, p(2) = 0.4, p(3) = 0.3.
> Is this a valid PMF?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The proposed PMF is **invalid**.

Check the normalization: 0.4 + 0.4 + 0.3 = **1.1 ≠ 1**.

A PMF MUST satisfy Σ p(xᵢ) = 1 exactly.  Here the probabilities "leak" — they sum to more than
1, which is impossible for a probability measure (P(Ω) = 1 by Axiom A2 from probability-axioms).

**Why exactly 1?**  The events {X=1}, {X=2}, {X=3} are mutually exclusive and exhaustive
(one of them MUST happen).  By the axioms of probability: P(X=1) + P(X=2) + P(X=3) = P(Ω) = 1.

A valid fix: p(1) = 0.4, p(2) = 0.4, p(3) = 0.2 (sum = 1.0).

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> Which of the following is a valid PMF for X ∈ {0, 1, 2}?
> (A) p(0)=0.5, p(1)=0.3, p(2)=0.2
> (B) p(0)=0.5, p(1)=0.3, p(2)=0.3
> (C) p(0)=0.5, p(1)=0.3, p(2)=−0.1

- **CORRECT** (A only — sums to 1.0; B sums to 1.1; C has negative value): ✓ MC-1 cleared.
  Advance to TA-A03.
- **PARTIAL** (says A and dismisses C but accepts B): "Check 0.5+0.3+0.3=?" Retry.
- **INCORRECT** (accepts B or C): Route to TB-R01. Return.
- **NO_RESPONSE**: Scaffold "For (A): 0.5+0.3+0.2=?"

---

### TA-A03 · Support, Invalid PMFs, and PMF vs CDF (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — Support vs all reals:**

| x | … | −1 | 0 | 1 | 2 | 3 | 4 | … |
|---|---|----|---|---|---|---|---|---|
| p(x) | 0 | 0 | 0.1 | 0.3 | 0.4 | 0.2 | 0 | 0 |

The support of X is {0, 1, 2, 3} — only the values where p(x) > 0.
For all x ∉ {0, 1, 2, 3}, p(x) = 0.  The PMF is defined on ALL of ℝ but equals 0 everywhere
outside the support.  The PMF is NOT restricted to the support — it just happens to be zero there.

---

**Contrast B — PMF vs CDF:**

Using the same PMF above:

| x | p(x) = P(X=x) | F(x) = P(X ≤ x) |
|---|:-------------:|:---------------:|
| 0 | 0.1 | 0.1 |
| 1 | 0.3 | 0.4 |
| 2 | 0.4 | 0.8 |
| 3 | 0.2 | 1.0 |

**PMF** p(x): the probability of EXACTLY x.  Example: P(X = 2) = p(2) = 0.4.
**CDF** F(x): the probability of AT MOST x.  Example: P(X ≤ 2) = F(2) = p(0)+p(1)+p(2) = 0.8.

They are DIFFERENT objects.  "PMF" and "CDF" are not interchangeable.

**[P49 — ADAPTIVE CHECKPOINT]**

> For the PMF above (p(0)=0.1, p(1)=0.3, p(2)=0.4, p(3)=0.2):
> (i) What is the support of X?
> (ii) Find P(X ≤ 2).  Is this p(2) or F(2)?

Expected:
*(i) {0, 1, 2, 3}.*
*(ii) P(X≤2) = p(0)+p(1)+p(2) = 0.1+0.3+0.4 = 0.8. This is F(2), the CDF at 2, NOT p(2)=0.4.*

- **CORRECT** (both right with correct CDF/PMF label): ✓ Advance to TA-A04.
- **PARTIAL — (ii) says 0.4** (reads p(2) instead of summing): MC-3 active. Route to TB-R03. Return.
- **PARTIAL — support wrong** (lists all integers or says {0,1,2,3,...}): MC-2 active. Route
  to TB-R02. Return.
- **INCORRECT** (both wrong): TB-R02 then TB-R03. Return.
- **NO_RESPONSE**: Scaffold "(i) Which values of x have p(x)>0?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Is the following a valid PMF for X ∈ {1, 2, 3, 4}?
p(1)=0.25, p(2)=0.25, p(3)=0.25, p(4)=0.25.
If yes, what is P(X = 2)?

*(Target: Yes — each p(x)=0.25≥0 and 4×0.25=1.0 ✓. P(X=2)=p(2)=0.25.)*

**Q2.** A PMF for X ∈ {0, 1, 2} has p(0) = 0.2 and p(1) = 0.5.  What must p(2) be?

*(Target: p(2) = 1 − 0.2 − 0.5 = 0.3, from normalization Σp(x)=1.)*

**Q3.** For the PMF p(1)=0.1, p(2)=0.3, p(3)=0.4, p(4)=0.2:
(i) Find P(X ≥ 3).   (ii) Find the support of X.

*(Target: (i) P(X≥3) = p(3)+p(4) = 0.4+0.2 = 0.6. (ii) {1,2,3,4}.)*

**Q4.** TRUE or FALSE: "The PMF p(x) = P(X ≤ x)."

*(Target: FALSE. p(x) = P(X = x) is the PMF (point probability). P(X ≤ x) is the CDF F(x).)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — self-contained.*

> A biased coin has P(H) = 2/3, P(T) = 1/3.  The coin is flipped **twice**.
> Let X = number of heads in two flips.
>
> (a) List the support of X.
> (b) Construct the complete PMF table for X.  (Use the sample space {HH, HT, TH, TT} and
>     the independence of flips to find each probability.)
> (c) Verify that Σp(x) = 1.
> (d) Find P(X ≥ 1) using the PMF.

*Expected answers:*
*(a) Support = {0, 1, 2}.*
*(b) P(TT) = (1/3)² = 1/9 → p(0) = 1/9.*
*    P(HT or TH) = 2×(2/3)(1/3) = 4/9 → p(1) = 4/9.*
*    P(HH) = (2/3)² = 4/9 → p(2) = 4/9.*
*(c) 1/9 + 4/9 + 4/9 = 9/9 = 1 ✓.*
*(d) P(X≥1) = p(1)+p(2) = 4/9+4/9 = 8/9.  Alternatively: 1 − p(0) = 1 − 1/9 = 8/9.*

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
  - Q1 wrong → MC-1 residual (verification) → re-check Σ = 4×0.25 = 1.
  - Q2 wrong → MC-1 residual (solving for missing p) → TB-R01 brief.
  - Q3(i) wrong → summing wrong range → re-read "P(X≥3) = p(3)+p(4)."
  - Q3(ii) wrong → MC-2 → TB-R02.
  - Q4 wrong → MC-3 → TB-R03.
  - P76 wrong → (a) support listing; (b) probability computation; (c) normalization; (d) summing.
    Route to TB-R01 if normalization fails; no repair needed for arithmetic errors — retry once.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.prob.discrete-rv
MASTERY_REACHED: true
UNLOCKS:         math.prob.pmf, math.prob.discrete-distributions
NEXT_CONCEPT:    math.prob.pmf
SESSION_CLOSE:   "You can now construct and validate a PMF table, identify the support,
                  distinguish the PMF from the CDF, and compute event probabilities by
                  summing the relevant p(x) values. The PMF is the complete description
                  of a discrete random variable's distribution."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: PMF-SUMS-NOT-ONE (MC-1)

**Trigger:** Student assigns probabilities without verifying Σp(x) = 1.

**Step 1 — Axiom anchor.**
> By Axiom A2 (probability-axioms): P(Ω) = 1.
> The events {X=x₁}, {X=x₂}, … partition Ω (they're mutually exclusive and exhaustive for
> a discrete RV).
> By Axiom A3 (extended): Σ P(X=xᵢ) = P(Ω) = 1.
> This is not optional — it is forced by the axioms.

**Step 2 — Check and adjust.**
> After assigning all p(x) values:
> Step 1: Sum them.
> Step 2: If sum ≠ 1, identify what's wrong (missing case, double-counted case, arithmetic).
> Step 3: Adjust one value (or all proportionally) to make the sum exactly 1.

**Step 3 — Practical heuristic.**
> With n outcomes, a uniform PMF gives p(x) = 1/n for each.
> For non-uniform, assign values that sum to 1 by construction (e.g., last value = 1 − Σ_others).

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: SUPPORT-IS-ALL-REALS (MC-2)

**Trigger:** Student claims the PMF must be defined or nonzero for all x ∈ ℝ.

**Step 1 — Definition of support.**
> The support of X is {x : p(x) > 0} — the set of values that CAN occur.
> For x outside the support, p(x) = P(X=x) = 0 (that value simply cannot happen).

**Step 2 — Die example.**
> For a six-sided die: support = {1,2,3,4,5,6}.
> p(7) = P(X=7) = 0.  p(−5) = 0.  The PMF is defined on ALL of ℝ; it just equals 0 outside {1,…,6}.

**Step 3 — Analogy.**
> Think of the PMF as a bar chart.  Bars appear only where the die can land.
> No bar at x=7 — not because 7 is "outside the PMF" but because p(7) = 0 and a bar of height 0
> is invisible.

**Exit:** Return to TA-A03 P49 checkpoint, part (i).

---

### TB-R03 · Repair: PMF-IS-CDF (MC-3)

**Trigger:** Student uses cumulative probabilities where individual probabilities are required.

**Step 1 — Name the difference.**
> PMF: p(x) = P(X = x).  The probability of landing EXACTLY on x.
> CDF: F(x) = P(X ≤ x).  The probability of landing AT OR BELOW x.

**Step 2 — Numeric contrast.**
> PMF: p(2) = 0.4 means "exactly 2 happens with probability 0.4."
> CDF: F(2) = P(X≤2) = p(0)+p(1)+p(2) = 0.1+0.3+0.4 = 0.8 means "2 or less with probability 0.8."

**Step 3 — Which to use when.**
> "Find P(X = x)" → use the PMF directly.
> "Find P(X ≤ x)" or "P(X < x)" or "P(X ≥ x)" → sum the relevant PMF values.

**Exit:** Return to TA-A03 P49 checkpoint, part (ii).

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "A PMF has p(0)=0.3, p(1)=0.5, p(2)=k. Find k. Is it valid?"
    Target: k = 1−0.3−0.5 = 0.2. Valid (k=0.2≥0 and sum=1). PASS if both correct.

  Interval-2 (+3 days):
    Probe: "For p(1)=0.2, p(2)=0.5, p(3)=0.3: what is the support? Find P(X≥2)."
    Target: Support={1,2,3}. P(X≥2)=p(2)+p(3)=0.8. PASS if both correct.

  Interval-3 (+1 week):
    Probe: "TRUE/FALSE: p(x)=P(X≤x). Explain."
    Target: FALSE. p(x)=P(X=x) is the PMF; P(X≤x)=F(x) is the CDF. PASS if distinction clear.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (normalization) or TA-A03 (PMF vs CDF).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.prob.random-variable:
    Used in:   TA-A01 (X: Ω→ℝ function; p(x)=P(X=x) notation; discrete = countable range),
               TA-A02 (normalization traced to probability-axioms via the prerequisite),
               TA-A04 P76 (two-coin-flip sample space; X = number of heads).
    Assumed:   Student can write out X(ω) for each ω; understands P(X=x)=P({ω:X(ω)=x});
               knows discrete means countable range.

UNLOCKS_ENABLED:
  math.prob.pmf:
    Dependency: Detailed study of PMF properties, moment generating functions, and specific PMF
                families (Bernoulli, Binomial); requires this blueprint's normalization and
                support concepts.
  math.prob.discrete-distributions:
    Dependency: Named discrete distributions (Poisson, Geometric) are specific PMF families;
                requires understanding of what a PMF is and its validity conditions.

CROSS_LINKS_NOTED:
  (none)
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The normalization condition is the most critical invariant.**
Every PMF problem should begin with a normalization check.  If the check is automatic, MC-1
never fires.  TA-A02's P64 traces Σp(x)=1 directly back to Axiom A2 (P(Ω)=1) — this is the
most convincing argument because the student has already internalized the axioms.

**2. MC-3 appears as an interpretation error, not a computational one.**
Students who confuse PMF and CDF typically compute the right number but label it wrong.
The contrast table in TA-A03 Contrast B is designed to make the labelling difference visual.
If MC-3 persists after TA-A03, TB-R03's three-line rule ("= x → PMF, ≤ x → CDF") is usually
enough to close it.

**3. The P76 probe's biased-coin calculation is non-trivial.**
Part (b) requires computing P(HT or TH) = 2×(2/3)(1/3) = 4/9, which assumes independent flips.
Students who have not seen independence before may struggle with this.  If so, allow direct
counting from the probability tree (P(HT) = 2/3 × 1/3 = 2/9; P(TH) = 1/3 × 2/3 = 2/9; total
= 4/9) rather than requiring the formula.  The key skill being tested is the PMF construction
and normalization, not independence itself.

**4. Support is a concise concept but requires careful wording.**
Support = {x : p(x) > 0}, not {x : p(x) is defined}.  Since p is defined on all of ℝ (it's
just 0 outside the support), the distinction matters.  The bar-chart analogy in TB-R02 Step 3
makes this visual.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.prob.discrete-rv
=============================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = C (Concrete PMF tables before abstract definition).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 — normalization axiom link).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03 Contrast A/B; TB-R02, TB-R03).
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
               (biased coin flipped twice; PMF for number of heads; no external Tier 1 dependency).
[PASS] V-18  GR-10: MAMR stated in Component 3; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   PMF defined: p(x) = P(X=x); validity conditions p(x)≥0 and Σp(x)=1.
             Support defined: {x : p(x) > 0}; outside support p(x)=0.
             PMF vs CDF distinction: P(X=x) vs P(X≤x).
             Normalization linked to Axiom A2 via mutually-exclusive exhaustive partition.
             MC-1 (normalization fails) addressed by P64 axiom derivation + TB-R01.
             MC-2 (support = all reals) addressed by die example + bar-chart analogy.
             MC-3 (PMF = CDF) addressed by Contrast B table showing numerical difference.
             P76 probe: biased coin flipped twice; full PMF construction + normalization check
             + P(X≥1) computation. Self-contained.

VERDICT: PACKAGE_READY
```

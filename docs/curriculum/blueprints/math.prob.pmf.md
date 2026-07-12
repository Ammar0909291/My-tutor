# TEACHING BLUEPRINT — math.prob.pmf

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.prob.pmf |
| concept_name | Probability Mass Function |
| domain | probability |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 2 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | P |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.prob.discrete-rv]
**unlocks:** []
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** The probability mass function (PMF) of a discrete random variable X assigns to each possible value x the probability p(x) = P(X = x). A valid PMF satisfies two axioms: (1) p(x) ≥ 0 for all x; (2) ∑ₓ p(x) = 1. The PMF completely characterises the distribution of X; from it, any event probability is computed as the sum of p(x) over the event's values.

**Knowledge prerequisites activated:**
- math.prob.discrete-rv: a discrete random variable X takes values from a finite or countably infinite set; each value has a probability; the PMF formalises this assignment

**Concept structure:**
1. **PMF definition**: p(x) = P(X = x) — the probability that X equals the specific value x
2. **Axiom 1 (non-negativity)**: p(x) ≥ 0 for all x in the support; probabilities cannot be negative
3. **Axiom 2 (normalisation)**: ∑_{all x} p(x) = 1 — total probability equals 1
4. **Support**: the set of x values where p(x) > 0; values outside the support have p(x) = 0
5. **Event probability**: P(X ∈ A) = ∑_{x ∈ A} p(x) for any set A of values
6. **PMF table**: a complete listing of (x, p(x)) pairs — the canonical representation

**Target understanding:** The learner verifies whether a given table is a valid PMF, finds unknown PMF values using the normalisation axiom, and computes event probabilities by summing the relevant PMF entries.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | PMF-SUM-NOT-ONE | Constructing a PMF table with given partial values | Assigns the remaining probability so that ∑p(x) ≠ 1 — either miscomputes the residual, or assigns equal probabilities to all values without checking the sum | B01 |
| MC-2 | PMF-IS-CDF | Asked for P(X = 3) from a PMF table; or asked to compute P(X ≤ 3) | Reads P(X = 3) as a running total up to 3 (CDF) rather than the point probability; conversely, computes ∑_{x≤3} p(x) when asked only for p(3) | B02 |
| MC-3 | PMF-NEGATIVE-ALLOWED | PMF values must sum to 1 but one partial sum exceeds 1; learner tries to introduce a negative probability to compensate | Assigns p(x) < 0 for some x to make the total sum to 1; does not recognise that p(x) ≥ 0 is a hard axiom, not a guideline | B03 |

**FOUNDATIONAL MC:** MC-1 (PMF-SUM-NOT-ONE) — if the normalisation axiom is not operative, the PMF cannot be correctly constructed, and event probability computations are systematically wrong.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** P — Pictorial
"Frequency bar chart" model: each bar's height is the probability of that value. The bars cover all possible values and their heights sum to 1 — a full "unit of probability" distributed across the support. No bar dips below zero.

**Progression Gate (P → A):** Learner consistently verifies both PMF axioms and uses the normalisation constraint to find unknown entries.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — PMF Definition and Axioms (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe three valid PMFs. Extract the shared pattern:

**Example 1:** Fair coin (X = 1 for heads, X = 0 for tails)

| x | p(x) |
|---|---|
| 0 | 0.5 |
| 1 | 0.5 |

Check: p(0) ≥ 0 ✓; p(1) ≥ 0 ✓; 0.5 + 0.5 = 1 ✓

**Example 2:** Loaded die (face values 1–3 only; P(1)=0.5, P(2)=0.3, P(3)=0.2)

| x | p(x) |
|---|---|
| 1 | 0.5 |
| 2 | 0.3 |
| 3 | 0.2 |

Check: all p(x) ≥ 0 ✓; 0.5 + 0.3 + 0.2 = 1 ✓

**Example 3:** p(x) = x/10 for x = 1, 2, 3, 4

| x | p(x) |
|---|---|
| 1 | 0.1 |
| 2 | 0.2 |
| 3 | 0.3 |
| 4 | 0.4 |

Check: all p(x) ≥ 0 ✓; 0.1 + 0.2 + 0.3 + 0.4 = 1 ✓

**Extracted pattern — two mandatory axioms for any PMF:**
1. **Non-negativity**: p(x) ≥ 0 for every x
2. **Normalisation**: ∑_{all x} p(x) = 1

**Derived usage:** given a partial PMF with one unknown entry k, find k by:
```
∑_{all x} p(x) = 1   →   (sum of known entries) + k = 1   →   k = 1 − (sum of known entries)
```
Also: P(X ∈ A) = ∑_{x ∈ A} p(x) — sum the p(x) values for all x in the event.

**P49 ADAPTIVE CHECKPOINT**
Q: "A discrete RV X has p(1) = 0.2, p(2) = 0.5, p(3) = k. (a) Find k. (b) Find P(X ≥ 2)."
→ CORRECT [(a) k = 0.3; (b) P(X≥2) = p(2) + p(3) = 0.5 + 0.3 = 0.8]: "Correct." → TA-A02
→ INCORRECT [(a) k = 0.7 or k = 0.3 + 0.2 = 0.5]: Flag MC-1. Route → B01.
→ INCORRECT [(b) reads p(3) as P(X≤3)]: Flag MC-2. Route → B02.
→ NO_RESPONSE: "(a) Use ∑p(x)=1: 0.2+0.5+k=1. (b) Sum the p values for x=2 and x=3." → guided.

---

### TA-A02 — Verifying and Constructing PMFs (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

**Worked example 1:** Verify that p(x) = x/10 for x = 1, 2, 3, 4 is a valid PMF. Find P(X ≤ 3).

Step 1 — Check non-negativity:
```
p(1)=1/10=0.1 ≥ 0 ✓;  p(2)=0.2 ≥ 0 ✓;  p(3)=0.3 ≥ 0 ✓;  p(4)=0.4 ≥ 0 ✓
```

Step 2 — Check normalisation:
```
∑p(x) = 0.1 + 0.2 + 0.3 + 0.4 = 1.0 ✓
```

Conclusion: valid PMF.

Step 3 — Find P(X ≤ 3):
```
P(X ≤ 3) = p(1) + p(2) + p(3) = 0.1 + 0.2 + 0.3 = 0.6
```

---

**Worked example 2:** Construct a PMF for X = number of heads in 2 fair coin tosses.

Possible outcomes: TT (0H), HT or TH (1H), HH (2H).

| x (heads) | outcomes | p(x) |
|---|---|---|
| 0 | TT | 1/4 |
| 1 | HT, TH | 2/4 = 0.5 |
| 2 | HH | 1/4 |

Verify: all p ≥ 0 ✓; 1/4 + 2/4 + 1/4 = 4/4 = 1 ✓

Find P(X ≥ 1):
```
P(X ≥ 1) = p(1) + p(2) = 0.5 + 0.25 = 0.75
```

(Alternatively: P(X ≥ 1) = 1 − P(X = 0) = 1 − 0.25 = 0.75.)

**P49 ADAPTIVE CHECKPOINT**
Q: "A loaded die shows 1,2,3,4,5,6 with PMF p(x) = c·x for each x. Find c so that the PMF is valid, then find P(X ≥ 5)."
→ CORRECT [c·(1+2+3+4+5+6) = 21c = 1 → c = 1/21; P(X≥5) = p(5)+p(6) = 5/21+6/21 = 11/21]: "Correct." → TA-A03
→ INCORRECT [c = 1/6 — treats as uniform]: Flag MC-1. Route → B01.
→ INCORRECT [P(X≥5) = p(6) only]: "P(X≥5) includes X=5 AND X=6. Sum both." → guided.

---

### TA-A03 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **A discrete RV X has PMF: p(1) = 0.1, p(2) = 0.4, p(3) = 0.3, p(4) = k. Find k.**
   *(Expected: k = 1 − 0.1 − 0.4 − 0.3 = 0.2)*

2. **A PMF table shows: p(0) = 0.5, p(1) = 0.3, p(2) = 0.2. Find P(X ≥ 1).**
   *(Expected: P(X ≥ 1) = p(1) + p(2) = 0.3 + 0.2 = 0.5)*

3. **True/False:** A valid PMF can have p(3) = −0.1 if the remaining values sum to 1.1 so that the total is 1.
   *(Expected: FALSE — the non-negativity axiom p(x) ≥ 0 for all x is inviolable; negative probabilities are not permitted regardless of the total)*

4. **A loaded die has p(1) = p(2) = p(3) = p(4) = p(5) = 1/8. Find p(6). Is the PMF valid?**
   *(Expected: p(6) = 1 − 5·(1/8) = 3/8; verify: 3/8 ≥ 0 ✓ and 5·(1/8)+3/8 = 8/8 = 1 ✓ → valid PMF)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Two-dice sum distribution:*

"A discrete random variable S represents the sum of two fair six-sided dice. The PMF is symmetric; selected values are:
P(S=2) = 1/36, P(S=7) = 6/36, P(S=12) = 1/36.

(a) Is P(S=7) ≥ 0? Does P(S=7) = 6/36 seem plausible given there are 6 ways to roll a sum of 7?
(b) Given that P(S ≥ 9) = 10/36, find P(S ≤ 8) using the complement rule.
(c) Without listing all 11 values (S = 2, 3, …, 12), explain in one sentence why ∑_{s=2}^{12} p(s) must equal 1."

*(Expected:
(a) Yes, 6/36 ≥ 0 ✓; plausible — the six pairs (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) all sum to 7
(b) P(S ≤ 8) = 1 − P(S ≥ 9) = 1 − 10/36 = 26/36
(c) S = 2, 3, …, 12 are all possible outcomes of the dice sum, forming a partition of the sample space — mutually exclusive and exhaustive events must have probabilities summing to 1)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 PMF-SUM-NOT-ONE first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now verify PMF validity using the non-negativity and normalisation axioms, find unknown PMF entries by solving the normalisation equation, and compute event probabilities by summing over the relevant support values. The PMF is the complete description of any discrete random variable's distribution."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: PMF-SUM-NOT-ONE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The normalisation axiom is not a guideline — it is a hard requirement of any probability distribution. The probabilities assigned to all possible values must sum to exactly 1. If a PMF table is partially specified, the remaining entry (or entries) must be chosen so the total is exactly 1, regardless of what seems convenient or symmetric."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "A discrete RV has p(1) = 0.3, p(2) = 0.4. If there are no other values, is this a valid PMF?"
→ "No — 0.3 + 0.4 = 0.7 ≠ 1; the PMF is invalid": MC-1 not active. Exit B01 → next flagged MC or TA-A03.
→ "Yes" or "close enough": MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"The total probability = 1 represents 100% certainty that X takes SOME value. Any deviation means probability is either missing or doubled:

```
∑_{all x} p(x) = 1   (axiom — no exceptions)

Check: p(1)=0.3, p(2)=0.4, and suppose p(3) is unknown.
  0.3 + 0.4 + p(3) = 1
  p(3) = 1 − 0.3 − 0.4 = 0.3

If you try to leave p(3) = 0 (defaulting to 0):
  0.3 + 0.4 + 0 = 0.7 ≠ 1 → INVALID
```

Always compute the residual: unknown p(x) = 1 − (sum of all known probabilities)."

**P49 ADAPTIVE CHECKPOINT**
Q: "A PMF has p(1)=0.25, p(2)=0.25, p(3)=0.25. Find p(4) so the PMF is valid."
→ CORRECT [p(4) = 0.25]: "Correct — 1 − 3×0.25 = 0.25." Exit B01 → B02 if flagged, else TA-A03.
→ INCORRECT: "Sum the known probabilities. Subtract from 1." → guided.

---

### TA-B02 — Repair: PMF-IS-CDF (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The PMF p(x) = P(X = x) is a point probability — the probability of exactly the value x. It is not a running total. The cumulative distribution function (CDF) F(x) = P(X ≤ x) is the running total; these are two different objects. The PMF entry for x = 3 tells you only P(X = 3), not P(X ≤ 3)."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "A PMF table has p(1)=0.1, p(2)=0.2, p(3)=0.3, p(4)=0.4. What is P(X = 3)?"
→ "0.3": MC-2 not active. Exit B02 → B03 if flagged, else TA-A03.
→ "0.6" (0.1+0.2+0.3, summing up to 3): MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"The PMF answers 'EXACTLY x'; the CDF answers 'AT MOST x':

```
PMF table: p(1)=0.1, p(2)=0.2, p(3)=0.3, p(4)=0.4

P(X = 3)  = p(3)              = 0.3        ← PMF: point value
P(X ≤ 3)  = p(1)+p(2)+p(3)   = 0.6        ← CDF: cumulative total

These are different questions with different answers from the same table.

P(X ∈ {2, 4}) = p(2) + p(4) = 0.2 + 0.4 = 0.6   ← event probability: sum only the listed values
```

Read the question carefully: 'P(X = x)' → look up the single p(x) entry. 'P(X ≤ x)' → sum all entries up to x."

**P49 ADAPTIVE CHECKPOINT**
Q: "PMF: p(1)=0.2, p(2)=0.3, p(3)=0.5. Find (a) P(X=2) and (b) P(X≤2)."
→ CORRECT [(a) 0.3; (b) 0.2+0.3=0.5]: "Correct — point value vs. cumulative sum." Exit B02 → B03 if flagged, else TA-A03.
→ INCORRECT [(a) 0.5 (summing)]: "P(X=2) asks for exactly x=2. Read the p(2) entry directly — no summing." → guided.

---

### TA-B03 — Repair: PMF-NEGATIVE-ALLOWED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Probability is a measure of likelihood — it must be between 0 and 1 inclusive. A negative probability p(x) < 0 is meaningless: P(X = x) < 0 would say the event X = x is 'less than impossible', which has no interpretation. The non-negativity axiom p(x) ≥ 0 cannot be violated to make a normalisation sum work out."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "A PMF has p(1)=0.6, p(2)=0.7. What must p(3) be?"
→ "The table is already invalid — p(1)+p(2)=1.3>1; no valid p(3) can fix this": MC-3 not active. Exit B03 → TA-A03.
→ "p(3) = −0.3 so that the total is 1": MC-3 confirmed. Continue B03.

**P64 CONCEPTUAL SHIFT**
"Both axioms must hold simultaneously:

```
Axiom 1: p(x) ≥ 0   for all x
Axiom 2: ∑ p(x) = 1

If p(1)=0.6 and p(2)=0.7 are given:
  Their sum is 1.3 > 1.

Conclusion: this CANNOT be a valid PMF for any choice of p(3).

  If p(3) = −0.3: violates Axiom 1 (negative probability).
  If p(3) = 0:    sum = 1.3 ≠ 1, violates Axiom 2.

The table p(1)=0.6, p(2)=0.7 is internally inconsistent —
no extension can make it a valid PMF.
Correct response: report that the table is invalid, not invent a negative entry.
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "A PMF has p(1)=0.4, p(2)=0.35, p(3)=0.3. Is this a valid PMF?"
→ CORRECT [No — 0.4+0.35+0.3 = 1.05 > 1; Axiom 2 fails; cannot add a negative value to fix it]: "Correct — both axioms must hold; no negative entry is permitted." Exit B03 → TA-A03.
→ INCORRECT [says p(4)=−0.05 fixes it]: "Axiom 1 requires p(x) ≥ 0. If p(4)=−0.05 violates Axiom 1, the fix is invalid. What is the correct conclusion?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Find unknown PMF entry | "p(1)=0.1, p(2)=0.3, p(3)=0.4, p(4)=k — find k" (0.2) |
| Day 3 | Compute event probabilities | "P(X ≥ 2) with PMF from Day 1" (0.3+0.4+0.2=0.9) |
| Day 7 | Verify validity and identify failures | "p(1)=0.5, p(2)=0.6: valid?" (No — sum=1.1>1) |
| Day 30 | Transfer to expected value setup | "For p(x)=x/10, x=1,2,3,4: compute E[X]=∑x·p(x)" (1×0.1+2×0.2+3×0.3+4×0.4=3.0) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.prob.discrete-rv (required): a discrete RV X assigns a numerical outcome to each experimental result; the PMF formalises the probability assignment as a function from values to probabilities

**Enables:**
- (no direct Tier 1 unlocks — cross_links=[], unlocks=[])
  The PMF is the foundational representation for the entire discrete distribution toolbox (expected value, variance, moment generating function, named distributions such as Binomial, Poisson) in downstream non-Tier-1 concepts.

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **h=2 lean structure:** PMF adds the two formal axioms and the event-probability summation procedure to the existing discrete-RV framework; 2 main TAs + gate is appropriate.

2. **CPA_ENTRY = P for proficient difficulty:** Learners already know discrete random variables and informal probability. The bar-chart pictorial model connects the intuitive "probability bar" height to the formal p(x) value.

3. **MC-1 and MC-3 are complementary failure modes:** MC-1 (sum ≠ 1) and MC-3 (negative allowed) are opposites — one under-normalises, the other attempts to over-normalise using an illegal value. Both are addressed by enforcing both axioms simultaneously in B01 and B03.

4. **P77 item 4 (loaded die):** Computing p(6) = 3/8 confirms that non-uniform PMFs frequently give "unexpected" probabilities; the axiom check catches whether the result is valid rather than assuming it looks wrong.

5. **P76 two-dice probe (complement rule):** The probe introduces P(X ≥ 9) → P(X ≤ 8) via the complement, which is a standard PMF application. The "explain why ∑p(s)=1" question (part c) tests whether learners understand normalisation from first principles (exhaustive partition of sample space) rather than just arithmetic.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.prob.discrete-rv ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | N/A — difficulty is proficient; CPA_ENTRY = P (bar-chart pictorial model for proficient learners) |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P04) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A03 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A03 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A03 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (two-dice sum distribution) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (two-dice sum; complement rule; normalisation rationale) | PASS |
| V-18 | MC-1 PMF-SUM-NOT-ONE designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY

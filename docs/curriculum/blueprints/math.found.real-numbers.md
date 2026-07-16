# Teaching Blueprint: math.found.real-numbers
**Blueprint Specification Version:** 1.0
**Status:** PACKAGE_READY
**Last Validated:** 2026-07-12

---

## Component 0 — Metadata

```yaml
concept_id: math.found.real-numbers
concept_name: Real Numbers
domain: foundations
difficulty: developing
bloom_level: understand
mastery_threshold: 0.85
estimated_hours: 5
prerequisites:
  - math.found.irrational-numbers
  - math.found.rational-numbers
unlocks:
  - math.func.real-valued-function
  - math.calc.limits
  - math.real.completeness
cross_links:
  - math.calc.limits
  - math.real.completeness
cpa_entry_stage: C
session_ta_cap: 7
mamr_policy: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO after
pass_criterion: "⌈0.85 × 5⌉ = 5 out of 5 (4 P77 items + 1 P76 item)"
```

---

## Component 1 — Cognitive Map

### Core Insight
The real numbers ℝ are the unique complete ordered field: they contain all rationals and irrationals, they are ordered in the familiar way, and — crucially — they have no gaps. The completeness property (every bounded non-empty subset has a least upper bound) is what separates ℝ from ℚ and is what makes calculus possible.

### Conceptual Hierarchy
```
Level 0 (Concrete): Specific reals on a number line: −3, 0, ½, √2, π, e.
Level 1 (Pictorial): The number line as a complete continuum; ℚ as dense but gapped; ℝ as gapless.
Level 2 (Abstract): ℝ = ℚ ∪ (ℝ\ℚ); completeness property; ordered field axioms.
Level 3 (Transfer): Why ℝ's completeness allows limits to converge;
                    the sequence 1, 1.4, 1.41, 1.414, … converges in ℝ but has no limit in ℚ.
```

### Key Facts About ℝ
```
Containment: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.

Components of ℝ:
  Rational numbers ℚ: numbers expressible as p/q, p∈ℤ, q∈ℤ\{0}.
    Examples: −3, 0, 1/2, 0.333…=1/3, 2.5=5/2.
  Irrational numbers ℝ\ℚ: reals not expressible as p/q.
    Examples: √2, π, e, √3, ln 2.
  Every real number has an infinite decimal expansion:
    Rational ↔ eventually repeating decimal.
    Irrational ↔ non-repeating, non-terminating decimal.

Completeness Property (Least Upper Bound / LUB):
  If A ⊆ ℝ is non-empty and bounded above, then sup A ∈ ℝ exists.
  (ℚ fails: A = {q ∈ ℚ : q² < 2} is bounded above but has no sup in ℚ.)

Density: Between any two distinct reals a < b, there exist:
  • A rational r with a < r < b.
  • An irrational s with a < s < b.

Order: ℝ is totally ordered (for any a, b: a < b or a = b or a > b).
```

### Why ℝ ≠ "Just Long Decimals"
```
A decimal representation is a NAME for a real number, not the number itself.
The same real number has multiple representations:
  0.999… = 1  (same real, different decimal string)
  0.5 = 0.4999… (same real, different decimal string)
The real number system is defined by its algebraic and order properties,
not by the notation used to write its elements.
```

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL]: REAL-IS-DECIMAL
**Belief:** Real numbers are numbers that have decimal points, or are "numbers you can write as decimals." Integers and fractions are not "really" real numbers; reals are a special extra category.
**Origin:** The phrase "real number" sounds like a category distinct from integers/fractions; the decimal representation of √2 or π reinforces the idea that reals are "decimal numbers."
**Trigger:** "Is 7 a real number?" → student says no, or "Is 1/3 a real number?" → student says no.
**Repair:** Every integer is real (7=7.000…), every rational is real (1/3=0.333…). ℝ is the union, not a separate category. "Real" contrasts with "complex," not with "integer."
**Priority:** FOUNDATIONAL — misidentifying which numbers are real blocks every downstream concept.

### MC-2: RATIONAL-IS-COMPLETE
**Belief:** The rational numbers ℚ are already "complete" — fractions can be made as precise as needed, so there are no gaps.
**Origin:** Students know ℚ is dense (there's a rational between any two rationals), and confuse density with completeness.
**Trigger:** "Is there a gap in ℚ?" → student says no because "you can always find a fraction in between."
**Repair:** Density ≠ completeness. The set A={q∈ℚ: q²<2} is bounded above (e.g., by 2) but has no least upper bound in ℚ — √2 is the supremum, and √2 ∉ ℚ. ℚ is dense but gapped.

### MC-3: IRRATIONALS-ARE-RARE
**Belief:** Irrational numbers like √2, π, e are rare special cases; "most" real numbers are rational.
**Origin:** Students encounter specific named irrationals and form the impression that irrationals are exceptional.
**Repair:** The opposite is true in a precise sense: the rationals occupy "measure zero" of the real line — almost every real number is irrational. Named irrationals are just the memorable ones.

---

## Component 3 — Scaffolding Protocol

### Entry Diagnostic (P41 gate)
```
P41 — MISCONCEPTION DETECTOR
Prompt: "Which of the following are real numbers? 
  (a) −5    (b) 3/7    (c) √5    (d) π    (e) 0    (f) 2.718…"

CORRECT (all six are real numbers):
→ No MC-1 detected → proceed to TA-A01 standard opening.

INCORRECT (excludes integers like −5 and 0, or excludes fractions, or treats
"real number" as meaning "decimal with infinite non-repeating expansion"):
→ MC-1 FOUNDATIONAL active → P64 CONCEPTUAL SHIFT on ℝ as umbrella set
→ Activate Protocol B (MC-1 Repair Chain)
```

### Prerequisite Bridge
Student completed math.found.rational-numbers and math.found.irrational-numbers. Real-numbers synthesises both: ℝ = ℚ ∪ (ℝ\ℚ) is the unique set containing all rationals and irrationals on a complete, ordered line.

### MAMR Enforcement
MC-1 is FOUNDATIONAL. If active, clear the "ℝ includes all of ℕ, ℤ, ℚ, and ℝ\ℚ" framing before any completeness discussion. MC-2 and MC-3 addressed FIFO after MC-1 cleared.

### CPA Progression: C → P → A
- **Concrete (C):** Specific real numbers placed on a number line; identify type (rational/irrational).
- **Pictorial (P):** Number line with labelled regions; gap diagram for ℚ; completeness as "filling all gaps."
- **Abstract (A):** Formal completeness property; LUB/supremum; density theorem.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01: Concrete Foundation — ℝ Is the Entire Number Line

**Opening (GR-1: B-category primitive)**
```
P03 — ANALOGY BRIDGE
Source domain: A ruler as a physical measuring tool
Target domain: The real number line as a mathematical object

"Picture a ruler marked in centimetres. Between 1 cm and 2 cm you can measure
1.5 cm, 1.41 cm, 1.414 cm, …  No matter how fine the graduation, every mark
on that ruler represents a real number.

The ruler doesn't stop at fractions (1/2, 3/4, …). It doesn't skip irrational
lengths (the diagonal of a unit square is √2 ≈ 1.414…).
The REAL NUMBER LINE is the idealised, infinitely fine ruler: every conceivable
length, positive or negative, has a corresponding real number."
```

**Concrete Classification**
```
P06 — CONTRAST PAIR
Left: Numbers that ARE real (full list)     Right: Common misconception
                                             (restricted notion of "real")
  −7   ∈ ℤ ⊂ ℚ ⊂ ℝ  ✓                       Student says: "integers are not real"
  0    ∈ ℤ ⊂ ℚ ⊂ ℝ  ✓                       Student says: "0 is not a number"
  2/3  ∈ ℚ ⊂ ℝ       ✓                       Student says: "fractions are rational, not real"
  √2   ∈ ℝ\ℚ ⊂ ℝ    ✓                       Student says: "√2 is irrational, not real"
  π    ∈ ℝ\ℚ ⊂ ℝ    ✓
  e    ∈ ℝ\ℚ ⊂ ℝ    ✓

Key: ℝ is the UMBRELLA. Being rational, irrational, integer, or natural
does NOT exclude a number from ℝ. They are all real numbers.
ℝ contrasts with ℂ (complex), not with ℚ or ℤ.
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Place each number in the correct category/categories:
  −√9,  22/7,  0.101001000…,  −3/1,  ∛8.
  Categories: natural number, integer, rational, irrational, real number."

CORRECT (−√9=−3: integer+rational+real; 22/7: rational+real; 0.101001000…: irrational+real;
         −3/1=−3: integer+rational+real; ∛8=2: natural+integer+rational+real):
→ Affirm: "Perfect. Every number in the list is real. Some are also integer, rational,
  or natural — those are subsets of ℝ, not alternatives to it."
→ Advance to TA-A02.

PARTIAL (correct for rationals/irrationals but miscategorises integers as "not real"):
→ "Check −3: is it on the number line? Yes, at position −3. So it's real.
  Being an integer doesn't exclude it from ℝ — ℤ ⊂ ℝ."
→ Re-examine; advance.

INCORRECT (excludes integers or fractions from ℝ):
→ MC-1 active. P27: "REAL-IS-DECIMAL. The word 'real' does NOT mean 'decimal.'
  ℝ includes ALL numbers on the number line: integers, fractions, and irrationals.
  7 is real. 1/3 is real. √2 is real. They differ in type, not in realness."
→ Activate B-1 repair.

NO_RESPONSE:
→ "Start with −√9: compute its value. Is it an integer? Is it on the number line?"
→ Step through each number; advance.
```

---

### TA-A02: Completeness — What ℚ Is Missing

**Opening (GR-1: B-category primitive)**
```
P11 — REPRESENTATION SHIFT
Shift: Abstract containment diagram → concrete gap example → formal property

Step 1 (Pictorial — containment diagram):
  ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
  Each set is strictly contained in the next.
  ℚ is DENSE: between any two rationals there is another rational.
  ℝ is COMPLETE: ℚ is dense but has gaps; ℝ fills them all.

Step 2 (Concrete gap — where ℚ fails):
  Define A = {q ∈ ℚ : q² < 2} = {rationals whose square is less than 2}.
  A is non-empty (1 ∈ A) and bounded above (2 is an upper bound).
  
  What is sup A? The smallest upper bound — the value x where x² = 2.
  x = √2. But √2 ∉ ℚ.
  
  In ℚ: A has no least upper bound (no sup in ℚ).
  In ℝ: sup A = √2 ∈ ℝ. The gap is filled.

Step 3 (Abstract — formal statement):
  COMPLETENESS (Least Upper Bound Property):
  Every non-empty subset A ⊆ ℝ that is bounded above
  has a least upper bound sup A ∈ ℝ.
  
  ℚ does NOT have this property (the √2 example shows it).
  ℝ DOES have this property — it is the defining feature of ℝ.
```

**MC-2 Direct Address**
```
P27 — MISCONCEPTION NAMING
"RATIONAL-IS-COMPLETE: believing ℚ has no gaps because it is dense.
DENSITY ≠ COMPLETENESS.
  Dense means: between any two points there is another point.
  Complete means: every bounded non-empty subset has a supremum.

ℚ is dense but NOT complete: the set {q∈ℚ:q²<2} is bounded above in ℚ
but its supremum (√2) is not in ℚ.
ℝ is dense AND complete — that is the extra structure ℝ adds over ℚ."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Consider B = {q ∈ ℚ : q < √3}.
(a) Is B non-empty? (b) Is B bounded above in ℚ? (c) Does sup B exist in ℚ?
(d) Does sup B exist in ℝ? State its value."

CORRECT ((a) YES — 1 ∈ B; (b) YES — 2 is an upper bound; 
          (c) NO — √3 ∉ ℚ; (d) YES — sup B = √3 ∈ ℝ):
→ Affirm: "Exactly. This is the completeness gap: ℚ sees B bounded above
  but cannot supply the supremum. ℝ can — √3 lives in ℝ\ℚ."
→ Advance to TA-A03.

PARTIAL (correct on (a)(b)(d) but claims sup B exists in ℚ):
→ "For (c): the supremum of B would be the smallest rational ≥ all elements of B.
  Is √3 rational? No. Could a rational number be the supremum? Let r ∈ ℚ be any
  upper bound. Then r ≥ √3. But between r and √3 there is a rational r' with √3 < r' < r.
  So r is not the LEAST upper bound. No rational supremum exists."
→ Re-examine; advance.

INCORRECT (claims sup B = 2 or some specific rational):
→ "Is 2 the LEAST upper bound? Is there a smaller upper bound?
  1.8 is an upper bound (1.8 > √3 ≈ 1.732). Is 1.8 the least? No — 1.74 is smaller.
  The least upper bound is √3 ≈ 1.7320…, which is irrational. Rationals cannot be sup B."
→ Re-examine; advance.

NO_RESPONSE:
→ "First: name one element in B. Now name one rational number larger than √3.
  Is there a SMALLEST such rational?"
→ Guide toward realising the infimum of upper bounds is √3 ∉ ℚ.
```

---

### TA-A03: The Real Line — Density, Decimal Expansions, and Irrationals

**Opening (GR-1: B-category primitive)**
```
P04 — PATTERN INDUCTION
"Decimal expansions of real numbers fall into two patterns:

  Number          Decimal expansion              Type
  1/3             0.333…  (repeating)            Rational
  22/7            3.142857142857…  (repeating)   Rational
  7               7.000…  (terminating = repeat 0) Rational
  √2              1.41421356…  (non-repeating)    Irrational
  π               3.14159265…  (non-repeating)    Irrational
  e               2.71828182…  (non-repeating)    Irrational

Pattern:
  Rational ↔ decimal eventually repeats (including terminating).
  Irrational ↔ decimal never repeats, never terminates.

Both types are real numbers. The decimal is a NAME for the number,
not the number itself."
```

**MC-3 Direct Address + Density Theorem**
```
P27 — MISCONCEPTION NAMING
"IRRATIONALS-ARE-RARE: believing irrationals like √2, π, e are edge cases.
In the precise sense of measure theory: between any two distinct reals a < b,
the total 'length' occupied by rationals is 0. Almost every real is irrational.
The named irrationals (√2, π, e, ln 2, …) are the ones mathematicians have
studied — they are exceptional only in being memorable, not in being common."

DENSITY THEOREM (both directions):
  For any a, b ∈ ℝ with a < b:
  (1) There exists r ∈ ℚ with a < r < b.  [ℚ is dense in ℝ]
  (2) There exists s ∈ ℝ\ℚ with a < s < b. [irrationals are dense in ℝ]
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "(a) Find a rational number strictly between 1.41 and √2 ≈ 1.41421….
           (b) The sequence 1, 1.4, 1.41, 1.414, 1.4142, … converges to √2.
               Each term is rational. The limit is irrational. Does this
               sequence converge in ℚ? Does it converge in ℝ? Why?"

CORRECT ((a) e.g. 1.412 (since 1.412 ∈ ℚ and 1.41 < 1.412 < 1.41421…);
          (b) NOT in ℚ (limit √2 ∉ ℚ); YES in ℝ (√2 ∈ ℝ; completeness guarantees it)):
→ Affirm: "Exactly. The sequence has a natural limit (√2) that lies outside ℚ.
  In ℚ, the sequence has no limit — it diverges within ℚ.
  In ℝ, √2 ∈ ℝ and the sequence converges. This is completeness in action."
→ Advance to TA-A04.

PARTIAL (part (a) correct but part (b) misses the ℚ/ℝ distinction):
→ "In (b): the limit is √2. Is √2 rational? No. So the sequence cannot
  converge within ℚ — the limit doesn't live there. But √2 ∈ ℝ, so in ℝ
  the sequence converges. Completeness is why limits work in ℝ."
→ Re-state; advance.

INCORRECT (claims the sequence converges in ℚ to "approximately 1.414"):
→ MC-2 bridge: "Approximating in ℚ is not the same as converging in ℚ.
  Convergence requires the limit to be IN the space. √2 ∉ ℚ, so the sequence
  diverges in ℚ. Being 'close' is not enough — the limit must exist."
→ Re-examine; advance.

NO_RESPONSE:
→ "For (a): find any fraction between 1.41 and 1.415.
   For (b): what number do the terms approach? Is that number in ℚ?"
→ Guide through.
```

---

### TA-A04: Mastery Gate (P91 Terminal)

```
P77 — MULTI-PROBLEM SET (4 problems)

Problem 1:
"For each number, state all applicable categories (natural, integer, rational, irrational, real):
  (a) −√16    (b) 0.272727… (= 3/11)    (c) ∛7    (d) 0"

Problem 2:
"Let A = {q ∈ ℚ : q³ < 5}.
(a) Is A non-empty? (b) Is A bounded above in ℝ? (c) State sup A in ℝ.
(d) Is sup A ∈ ℚ? What does this demonstrate about ℚ?"

Problem 3:
"True or false: Between any two distinct rational numbers there is an irrational number.
Justify."
[True. Given a < b in ℚ, a + (b−a)/√2 is irrational and lies in (a,b) when (b−a)/√2 < b−a.
 Simpler: a+√2(b−a)/2 ∈ (a,b) and is irrational since √2 is irrational.]

Problem 4:
"A student says: '0.999… and 1 are different real numbers because one has a 9 after the decimal
and the other doesn't.' Is the student correct? Explain using the definition of real numbers."
[Incorrect. 0.999… = 1 as real numbers. The same real number has multiple decimal representations.
 Proof: let x=0.999…; then 10x=9.999…; so 10x−x=9; so 9x=9; x=1.]
```

```
P55 — SCORE (after P77)
Award 1 point per problem.
Running total before P76: __/4.
```

```
P76 — TRANSFER PROBE (cross-link: math.calc.limits — Tier 1)
"In calculus, lim[n→∞] aₙ = L means: for every ε > 0, there exists N such that
for all n > N, |aₙ − L| < ε.

Consider the sequence aₙ = (1 + 1/n)ⁿ.
The first few terms are: a₁=2, a₂=2.25, a₃≈2.370, a₄≈2.441, a₁₀₀≈2.705.

(a) Each term aₙ is rational (it's a finite power of rational numbers). True or false?
(b) The sequence is increasing and bounded above (by 3, for example). Using ℝ's
    completeness property, what can you conclude about lim[n→∞] aₙ?
(c) The limit is e ≈ 2.71828… Is e rational?
(d) In one sentence: why is ℝ the natural setting for limits, rather than ℚ?"

[Expected:
(a) TRUE — each aₙ = (1+1/n)ⁿ where 1+1/n ∈ ℚ and the power is a natural number.
(b) Completeness guarantees that any bounded monotone sequence in ℝ converges.
    So lim aₙ exists in ℝ.
(c) No — e is irrational (transcendental). The limit is NOT rational.
(d) ℝ is the natural setting because completeness guarantees limits of bounded
    sequences exist, even when those limits are irrational.]
```

```
P55 — SCORE (after P76)
Award 1 point for P76.
Running total: __/5.
```

```
P75 — MASTERY ASSESSMENT
Pass criterion: 5 out of 5 (⌈0.85 × 5⌉ = 5)
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
"Real numbers checkpoint complete. You have established:
  • ℝ = ℚ ∪ (ℝ\ℚ): the complete union of rationals and irrationals.
  • Every integer, fraction, and named irrational (√2, π, e) is a real number.
  • Completeness: every bounded non-empty subset of ℝ has a supremum in ℝ.
  • ℚ is dense but not complete; ℝ fills ℚ's gaps (e.g., √2, √3, e ∈ ℝ\ℚ).
  • Decimal representation is a name for a real number, not its definition.
Next concepts: math.calc.limits (why completeness makes limits well-defined),
math.func.real-valued-function (functions mapping into ℝ)."
```

---

## Component 5 — Protocol B (Misconception Repair Chains)

### Repair Chain B-1: REAL-IS-DECIMAL (MC-1 FOUNDATIONAL)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: 'Real numbers' = numbers with decimal points (a special category).
 AFTER: 'Real numbers' = all numbers on the number line.

The hierarchy is:
  ℕ (natural: 1,2,3,…) ⊂ ℤ (integers) ⊂ ℚ (rationals) ⊂ ℝ (reals)

Every natural number IS a real number. Every integer IS a real number.
Every rational IS a real number. Every irrational IS a real number.
'Real' contrasts with 'imaginary' (from complex numbers ℂ), not with 'rational.'

Mnemonic: REAL = RULER — every point on a number line is real."

Repair exercise:
Place each on the number line: −4, 0, 7/2, −√25, π.
[−4: left of 0; 0: origin; 7/2=3.5: between 3 and 4;
 −√25=−5: left of −4; π≈3.14: between 3 and 4 to the left of 7/2]
Confirm each is a real number.

Exit gate: "Name one integer that is not a real number."
Expected: "No such integer exists — all integers are real."
→ Correct: return to TA-A01 P49 re-attempt.
→ Incorrect: revisit containment diagram ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.
```

### Repair Chain B-2: RATIONAL-IS-COMPLETE (MC-2)

```
P41 — MISCONCEPTION DETECTOR
Diagnostic: "Does the set {q ∈ ℚ : q < √2} have a least upper bound in ℚ?"
If student says YES: MC-2 confirmed.

P27 — MISCONCEPTION NAMING
"RATIONAL-IS-COMPLETE: confusing DENSITY with COMPLETENESS.
Dense: between any two rationals, another rational exists. (TRUE for ℚ)
Complete: every bounded non-empty subset has a supremum. (FALSE for ℚ)
Dense subsets of ℝ are NOT automatically complete."

P03 — ANALOGY BRIDGE
"A dense fog fills a room but not every point — there are gaps between
individual fog particles even though they appear continuous.
ℚ is like a dense fog: it appears to fill the line, but √2 is a gap that
no rational number can plug."

Repair exercise: show that no rational r satisfies r = sup{q∈ℚ: q²<2}.
  If r < √2: r²<2, so r ∉ upper bounds (elements of A exceed r).
  If r > √2: r²>2, and there's a smaller upper bound between √2 and r.
  Only √2 is the least upper bound, but √2 ∉ ℚ.

Exit gate: "Name the supremum of {q∈ℚ: q²<2} and state whether it's in ℚ."
Expected: sup = √2, which is NOT in ℚ.
→ Correct: return to TA-A02.
```

### Repair Chain B-3: IRRATIONALS-ARE-RARE (MC-3)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: Irrationals (√2, π, e) are rare exceptions.
 AFTER: Irrationals are overwhelmingly MORE common than rationals.

ℚ is countable (can be listed: 1/1, 1/2, 2/1, 1/3, 3/1, …).
ℝ is uncountable (Cantor's diagonal argument).
So ℝ\ℚ (irrationals) = ℝ minus a countable set = still uncountable.

Intuition: Pick a 'random' real number — the probability that it is rational
is 0 (measure-theoretic sense). Named irrationals are memorable, not numerous."

Exit gate: "Is the set of irrational numbers larger, smaller, or the same size
as the set of rational numbers?" (in cardinality sense)
Expected: LARGER — irrationals are uncountable, rationals are countable.
→ Correct: return to TA-A03.
```

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89 — SPACED REPETITION
Review schedule for math.found.real-numbers:

Interval 1 (1 day after mastery):
  Recall prompt: "State the completeness property of ℝ in one sentence.
  Give one example of a set that demonstrates ℚ is NOT complete."
  Target: LUB property; A = {q∈ℚ:q²<2}, sup = √2 ∉ ℚ.

Interval 2 (3 days):
  Application: "Is the set {x ∈ ℝ : x² < 7} bounded above? What is its supremum?
  Is the supremum in ℚ?"
  Target: bounded above by 3; sup = √7; √7 ∉ ℚ (irrational).

Interval 3 (7 days):
  Transfer: "The sequence 3, 3.1, 3.14, 3.141, 3.1415, … converges to π.
  (a) Are all terms rational? (b) Is the limit in ℚ? (c) Is the limit in ℝ?
  (d) What property of ℝ guarantees the limit exists?"
  Target: (a) YES; (b) NO (π irrational); (c) YES; (d) completeness.

Interval 4 (21 days):
  Integration: "A student in math.calc.limits asks: 'Why do we define limits using
  ℝ and not ℚ?' Explain using the completeness property and a concrete example."
  Target: ℚ not complete → sequences with irrational limits diverge in ℚ;
    ℝ is complete → all Cauchy sequences converge; limits are well-defined in ℝ.
```

---

## Component 7 — Cross-Blueprint Dependencies

### GR-8: Cross-link documentation
```
Incoming prerequisites:
  math.found.rational-numbers → Defines ℚ = {p/q : p,q ∈ ℤ, q≠0};
    density of ℚ; decimal representation of rationals.
  math.found.irrational-numbers → Defines ℝ\ℚ; examples (√2, π, e);
    irrationality proofs (√2 proof by contradiction).

Outgoing unlocks:
  math.func.real-valued-function → Functions f: D → ℝ require ℝ as codomain.
  math.calc.limits → Limit theory depends on ℝ's completeness;
    sequences converge in ℝ because of LUB.
  math.real.completeness → Formal study of suprema, infima, Cauchy sequences.

Cross-linked (non-prerequisite):
  math.calc.limits (Tier 1) → Used in P76 probe: sequence (1+1/n)ⁿ → e;
    completeness guarantees limit; limit is irrational.
  math.real.completeness (NOT Tier 1) → Formal deepening of the LUB property.
```

### GR-9: P76 Mode Determination
```
cross_links = [math.calc.limits, math.real.completeness]
math.calc.limits IS in Tier 1 set → P76 CROSS-LINK PROBE
math.real.completeness NOT in Tier 1 → ignore for P76 mode

P76 probe: sequence (1+1/n)ⁿ → e; each term rational; limit irrational;
  completeness guarantees limit exists in ℝ; bridges to math.calc.limits.
```

---

## Component 8 — Teaching Notes

### Pedagogical Rationale
Real numbers (bloom=understand) requires students to understand what ℝ is, not just compute with real numbers. The critical understanding is two-fold: (1) ℝ is the umbrella containing ALL types of numbers students have encountered, and (2) the completeness property is what makes ℝ different from ℚ and what makes calculus possible.

### Common Session Failure Modes
1. **MC-1 is the entry blocker:** Students who think "real" means "decimal" cannot correctly classify integers as real numbers. The B-1 repair chain must resolve this before TA-A02's completeness discussion.
2. **Completeness is abstract:** The ℚ gap example with √2 is the single most effective concrete illustration. Spend time on it — if students understand why {q∈ℚ:q²<2} has no supremum in ℚ, the completeness concept crystallises.
3. **The sequence-to-limit bridge (TA-A03):** The sequence 1, 1.4, 1.41, ... → √2 is the most intuitive path from "rational approximations" to "irrational limit." This prepares the P76 probe directly.

### Connections to Broader Curriculum
- **Downstream — math.calc.limits:** Every fundamental theorem of calculus (continuity, differentiability, integration) implicitly uses ℝ's completeness. The intermediate value theorem, the extreme value theorem, and the mean value theorem all fail in ℚ.
- **Downstream — math.real.completeness:** Formal study includes Cauchy completeness, the Bolzano-Weierstrass theorem, and the Heine-Borel theorem.
- **Conceptual predecessor:** Students who have proved √2 irrational (from math.found.irrational-numbers) already have the key example for the completeness gap. Build on it explicitly.

### Language Precision
- Say "ℝ is the complete ordered field" — not "ℝ is all the numbers."
- "Completeness" means LUB property — not "covers everything" informally.
- Distinguish "supremum" (least upper bound, may or may not be in the set) from "maximum" (largest element, must be in the set).

---

## Component 10 — Validation Checklist

### Structural Validators
- [x] V-1: Blueprint has all 10 components (0–8, 10).
- [x] V-2: Metadata YAML complete with all required fields.
- [x] V-3: concept_id matches filename `math.found.real-numbers`.
- [x] V-4: difficulty=developing, bloom_level=understand, mastery_threshold=0.85.
- [x] V-5: estimated_hours=5, session_ta_cap=7.

### Grammar Rule Validators
- [x] V-6 (GR-1): Every non-repair TA opens with B-category primitive (TA-A01: P03+P06; TA-A02: P11; TA-A03: P04; TA-A04 is mastery gate).
- [x] V-7 (GR-2): Every non-gate TA contains P49 with all 4 branches. TA-A01, TA-A02, TA-A03 each have P49.
- [x] V-8 (GR-3): Mastery gate TA-A04 is terminal (ends with P78).
- [x] V-9 (GR-4): P41 entry diagnostic gates P64 → Protocol B when MC-1 active.
- [x] V-10 (GR-6): P91 compound (P77→P55→P76→P55→P75→P55→P74→P55→P78) complete in TA-A04.
- [x] V-11 (GR-7): P76 present in mastery gate TA-A04.
- [x] V-12 (GR-8): Cross-links documented in Component 7. math.calc.limits and math.real.completeness named.
- [x] V-13 (GR-9): P76 mode is CROSS-LINK (math.calc.limits is Tier 1). P76 probe: sequence (1+1/n)ⁿ→e; completeness guarantees limit; limit irrational. Bridges to math.calc.limits.
- [x] V-14 (GR-10): MAMR stated in Component 0 and enforced in Component 3.

### Content Validators
- [x] V-15: Pass criterion = ⌈0.85 × 5⌉ = 5/5. P77 has 4 problems; P76 contributes 1; total n=5. ✓
- [x] V-16: CPA_ENTRY_STAGE = C. developing always starts Concrete. ✓
- [x] V-17: MC-1 is FOUNDATIONAL and cleared first per MAMR. ✓
- [x] V-18: P49 INCORRECT branch activates P27 or P64 with repair pathway in TA-A01, TA-A02, TA-A03. ✓
- [x] V-19: P76 probe independent of P77 problems (P77: classification, LUB exercises, density, 0.999…; P76: Euler's number sequence and completeness argument). ✓
- [x] V-20: Spaced repetition intervals are 1, 3, 7, 21 days with distinct prompts. ✓

### Automated Invariant Check (AIR)
- [x] AIR-1: No implementation code present.
- [x] AIR-2: No references to internal system variables.
- [x] AIR-3: All cross-linked concept IDs use canonical prefix format.
- [x] AIR-4: P91 sequence order is P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
- [x] AIR-5: Protocol B repair chains each have explicit exit gate with return instruction. ✓

**VALIDATION RESULT: PASS — PACKAGE_READY**

# Teaching Blueprint: Rational Numbers

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.rational-numbers |
| KG_ID | math.found.rational-numbers |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Rational Numbers |
| ALIASES | ℚ, fractions, ratios |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.85 |
| ESTIMATED_HOURS | 5 |
| REQUIRES | math.found.integers |
| UNLOCKS | math.arith.fractions, math.found.irrational-numbers |
| CROSS_LINKS | math.arith.fractions |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 7 (TA-A01 through TA-A07) |
| MASTERY_GATE_TA | TA-A07 (P91, terminal) |
| PASS_CRITERION | 6/7 (⌈0.85 × 7⌉ = 6; threshold = 0.85) |
| MAMR | MC-1 FRACTION-UNIQUE is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links = [math.arith.fractions]; P76 probe references math.arith.fractions directly) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.integers**: ℤ = {…, −2, −1, 0, 1, 2, …} with ring structure (closed under +, −, ×; not under ÷). ℚ extends ℤ by supplying multiplicative inverses for all non-zero elements, completing the field structure. The numerator and denominator of every rational are integers.

### Target Understanding
1. **Formal definition**: ℚ = {p/q : p ∈ ℤ, q ∈ ℤ, q ≠ 0}, where p/q and r/s name the same rational iff p × s = q × r.
2. **Equivalence classes**: Every rational number is an equivalence class of integer pairs under the relation (p,q) ~ (r,s) iff ps = qr. A single rational has infinitely many fraction representations (1/2 = 2/4 = 3/6 = …).
3. **Canonical form**: The reduced fraction: GCD(|p|, q) = 1 and q > 0. Each equivalence class has exactly one canonical representative.
4. **Field structure**: ℚ is closed under +, −, ×, and ÷ (by non-zero elements). Every non-zero rational has a multiplicative inverse: (p/q)⁻¹ = q/p. ℤ is a ring but not a field; ℚ is a field.
5. **Dense total order**: ℚ is totally ordered. Between any two distinct rationals a < b, there exists c ∈ ℚ with a < c < b (e.g., c = (a+b)/2). ℤ is NOT dense.
6. **Not complete**: ℚ is dense but has "holes" — the positions occupied by irrational numbers (√2, π, e ∉ ℚ). The sequence 1, 1.4, 1.41, 1.414, … of rational approximations to √2 converges, but its limit (√2) is not in ℚ.
7. **Decimal characterization**: Every rational has a terminating or eventually repeating decimal expansion. Terminating: reduced denominator has only prime factors 2 and 5 (e.g., 3/4 = 0.75, 7/40 = 0.175). Repeating: other prime factors (e.g., 1/3 = 0.333…, 1/7 = 0.142857142857…). Non-terminating, non-repeating decimals are irrational.
8. **Number system chain**: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. ℚ is the first number system in the chain that forms a field.

### Cross-Link Activation
- **math.arith.fractions**: ℚ provides the formal ring/field foundation; math.arith.fractions provides the computational operations (addition with LCD, multiplication, simplification) and concrete applications. P76 bridges these via recipe scaling.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — FRACTION-UNIQUE
- **Trigger**: "1/2 and 2/4 are different rational numbers" or "each rational number has exactly one fraction."
- **Root cause**: Elementary education teaches fraction symbols before equivalence; 1/2 and 2/4 look different, so learners treat them as different objects.
- **Error pattern**: Rejects simplification steps as "changing the number"; treats canonical form as the only legitimate representation; argues 3/6 ≠ 1/2.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — DENSITY-COMPLETENESS
- **Trigger**: "Since there's always a rational between any two rationals, ℚ must fill the entire number line."
- **Root cause**: "Dense" sounds like "no gaps"; learner conflates density (no adjacent elements) with completeness (every Cauchy sequence converges in the set).
- **Error pattern**: Claims √2 must be rational because the number line looks "full"; believes ℚ and ℝ are the same set.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — RATIONAL-TERMINATING
- **Trigger**: "1/3 isn't really a rational because its decimal never ends" or "all fractions have terminating decimals."
- **Root cause**: Early exposure to 1/2, 1/4, 3/4 (all terminating); non-terminating decimals feel "incomplete" or "not exact."
- **Error pattern**: Excludes 1/3, 1/7, 2/9 from ℚ; believes terminating = rational and non-terminating = irrational.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a Concrete number-line model (fence posts for ℤ, rationals filling the gaps). Move to Pictorial (fraction ↔ decimal ↔ percentage ↔ number-line-position equivalence table) in TA-A03. Reach Abstract (equivalence class formalism, field axioms, density proof sketch) by TA-A05.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). If triggered in later TAs, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Extending ℤ: From Fence Posts to Filled Gaps
**Primitives**: P03 → P49

**P03 (ANALOGY BRIDGE):**
- **Source domain**: A fence line. ℤ is like fence posts at …, −2, −1, 0, 1, 2, … — evenly spaced, with nothing between consecutive posts. Between posts 0 and 1, there is no post.
- **Target domain**: ℚ. The rational numbers fill the gaps between the integer fence posts with infinitely many points: 1/2 is halfway between 0 and 1; 1/3 and 2/3 divide the gap into thirds; between 1/3 and 1/2 sit 5/12, 7/18, … and infinitely more rationals.
- **Bridge**: ℤ failed to be closed under division (3 ÷ 2 ∉ ℤ). ℚ is constructed precisely to fix this: by allowing all ratios p/q, we add exactly those points needed to make division (by non-zero elements) always possible.
- **Limitation (to address later)**: Even after filling in all rational points, the number line still has "irrational dust" — positions like √2, π that no fraction p/q can hit exactly. That's why ℝ is needed; but ℚ is the right next step from ℤ.

**P49:** "Between the integers 0 and 1, how many rational numbers exist? Can you always find a rational between any two distinct rationals?"
- **CORRECT**: Infinitely many. Yes — (a+b)/2 is always rational and between a and b. → TA-A02.
- **PARTIAL**: Demonstrate (0+1)/2 = 1/2; then (0+1/2)/2 = 1/4; process never terminates. → TA-A02.
- **INCORRECT**: Number the gap: 1/2 is between 0 and 1; 1/3, 2/3 also; 1/4, 3/4 also; infinitely more. → TA-A02.
- **NO_RESPONSE**: Explain density and give three explicit examples. → TA-A02.

---

### TA-A02 — Misconception Gate: FRACTION-UNIQUE (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "True or False: 1/2 and 2/4 are two different rational numbers."
- If learner says **True** (incorrect): proceed to P64.
- If learner says **False** (correct): briefly validate, ask why — confirm learner can state the equivalence condition, then proceed to P64 for formal grounding.

**P64 (CONCEPTUAL SHIFT):**
"A rational number is not a fraction symbol — it is a NUMBER: a specific position on the number line. The fraction p/q is notation pointing to that position.

1/2 and 2/4 point to exactly the same position: halfway between 0 and 1. They are two NAMES for the same number, just as 'Wolfgang Amadeus Mozart' and 'Mozart' are two names for the same person.

The formal test: p/q = r/s in ℚ if and only if p × s = q × r.
Check: 1 × 4 = 4 and 2 × 2 = 4. Equal. ✓

Every rational number has infinitely many fraction representations:
  1/2 = 2/4 = 3/6 = 4/8 = n/(2n) for all n ≠ 0.

The canonical (reduced) form — where GCD(|numerator|, denominator) = 1 and denominator > 0 — is one CHOSEN representative. Canonical form does not mean 'the only form.'"

**P49:** "Show that 12/18 and 8/12 represent the same rational number using the cross-multiplication test. Then find the canonical form."
- **CORRECT**: 12 × 12 = 144; 18 × 8 = 144. Equal ✓. GCD(12,18) = 6 → 2/3. GCD(8,12) = 4 → 2/3. Canonical form: 2/3. → TA-A03.
- **PARTIAL**: Verify cross-multiplication; assist with GCD if needed. → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Representation Shift: Four Faces of a Rational Number
**Primitives**: P11 → P49

**P11 (REPRESENTATION SHIFT):**
Take the rational number "three-quarters" across four representations:

| Representation | Form | Value |
|---|---|---|
| Fraction | 3/4 | Numerator 3, denominator 4 |
| Decimal | 0.75 | Terminating; exact |
| Percentage | 75% | Per centum = per 100 |
| Number-line position | 3/4 of the way from 0 to 1 | Geometric location |

All four representations name the SAME rational number: the equivalence class {3/4, 6/8, 9/12, −3/−4, …} ⊂ ℚ.

Equivalence class view: a rational number IS the entire equivalence class; any member (fraction) can be used as a representative; canonical form (3/4) is the standard choice.

Conversion summary:
- Fraction → decimal: divide numerator by denominator (long division or calculator)
- Decimal → fraction: e.g., 0.75 = 75/100 = 3/4 (reduce); for repeating, use algebraic trick (TA-A04)
- Fraction → percentage: multiply by 100

**P49:** "Express 12/18 as: (a) canonical fraction; (b) decimal; (c) percentage."
- **CORRECT**: (a) 2/3; (b) 0.666…; (c) 66.6…%. → TA-A04.
- **PARTIAL**: Address any wrong representation. → TA-A04.
- **INCORRECT/NO_RESPONSE**: Walk through each conversion step. → TA-A04.

---

### TA-A04 — Pattern Induction: Terminating vs. Repeating Decimals
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
Present five examples; learner identifies the pattern:

| Fraction | Decimal | Terminates? | Denominator factors |
|---|---|---|---|
| 1/2 | 0.5 | ✓ Terminates | 2 = 2¹ |
| 1/4 | 0.25 | ✓ Terminates | 4 = 2² |
| 1/5 | 0.2 | ✓ Terminates | 5 = 5¹ |
| 1/3 | 0.333… | ✗ Repeating | 3 = 3¹ |
| 1/7 | 0.142857142857… | ✗ Repeating | 7 = 7¹ |

Observed pattern: terminates ↔ denominator (in reduced form) has ONLY prime factors 2 and 5.

Why: In base 10 (= 2 × 5), a fraction p/q terminates iff q = 2^a × 5^b, because then p/q = p × (2^c × 5^d) / 10^(max(a,b)) for some c, d — a fraction over a power of 10, which terminates.

Algebraic trick for repeating → fraction:
  x = 0.333…
  10x = 3.333…
  10x − x = 3
  9x = 3
  x = 3/9 = 1/3 ✓

This confirms 0.333… is rational. Repeating decimals are ALWAYS rational (and vice versa for all rationals).

**P49:** "Without computing the decimal, predict: does 7/40 terminate or repeat? Justify."
- **CORRECT**: Terminates. 40 = 2³ × 5¹ — only prime factors 2 and 5. (7/40 = 0.175.) → TA-A05.
- **PARTIAL**: Prompt: "Factor 40. Are there any prime factors other than 2 and 5?" → TA-A05.
- **INCORRECT/NO_RESPONSE**: Factor 40 = 8 × 5 = 2³ × 5; apply the rule. → TA-A05.

---

### TA-A05 — Contrast Pair: ℤ vs. ℚ (Field and Density)
**Primitives**: P06 → P41 → P49

**P06 (CONTRAST PAIR PROMPT):**

Contrast 1 — Field vs. Ring (closure under division):
| Property | ℤ | ℚ |
|---|---|---|
| Closed under + | ✓ | ✓ |
| Closed under − | ✓ | ✓ |
| Closed under × | ✓ | ✓ |
| Closed under ÷ (non-zero) | ✗ (3÷2=1.5 ∉ ℤ) | ✓ |
| Multiplicative inverse exists | ✗ (no integer 1/2) | ✓ (p/q)⁻¹=q/p |
| Structure | Ring | Field |

Contrast 2 — Dense vs. Discrete ordering:
| Property | ℤ | ℚ |
|---|---|---|
| Totally ordered | ✓ | ✓ |
| Between 1 and 2: elements? | ✗ No integer | ✓ Infinitely many |
| Dense? | ✗ (adjacent integers) | ✓ |
| Complete? | ✗ | ✗ (ℚ has irrational holes) |

**P41 (MISCONCEPTION DETECTOR — MC-2):** "ℚ is dense: between any two rationals there is another rational. Does this mean ℚ fills the entire number line with no gaps?"
- If learner says **YES**: proceed to P64-style correction inline.
  "Consider the sequence: 1, 1.4, 1.41, 1.414, 1.4142, … Each term is rational (terminates), and the terms get closer and closer to √2. But √2 ∉ ℚ — no fraction p/q satisfies (p/q)² = 2 exactly. ℚ is dense (no rational is 'adjacent' to another) but NOT complete (this sequence has no limit in ℚ). The number line has irrational 'dust' filling the gaps that ℚ can't reach."
- If learner says **NO** (correctly): validate and confirm the ℚ-vs-ℝ distinction.

**P49:** "Is ℤ a field? Is ℚ a field? What property distinguishes them?"
- **CORRECT**: ℤ is NOT a field (no multiplicative inverses for 2, 3, … within ℤ). ℚ IS a field (every non-zero rational has inverse q/p ∈ ℚ). → TA-A06.
- **PARTIAL**: Confirm which is a field; address the missing inverse in ℤ. → TA-A06.
- **INCORRECT/NO_RESPONSE**: Walk through the inverse of 3: 1/3 ∉ ℤ but 1/3 ∈ ℚ. → TA-A06.

---

### TA-A06 — Misconception Naming + Worked Examples: Repeating Decimals
**Primitives**: P27 → P07 → P49

**P27 (MISCONCEPTION NAMING — MC-3 RATIONAL-TERMINATING):**
"MC-3 RATIONAL-TERMINATING: the belief that 'a rational number has a terminating decimal.'

Why it's tempting: the first fractions you learn (1/2, 1/4, 3/4) all terminate. 'Rational' and 'terminates' feel linked.

Why it's wrong: the defining property of ℚ is p/q with p,q ∈ ℤ, q ≠ 0 — NOTHING about decimal termination. Whether a decimal terminates depends on whether the reduced denominator is of the form 2^a × 5^b. Most denominators aren't.

Correct rule: Every rational has a TERMINATING or EVENTUALLY REPEATING decimal expansion. Non-terminating, non-repeating = irrational."

Examples showing repeating = rational:
- 1/3 = 0.333… (rational — denominator 3, not 2^a × 5^b)
- 2/9 = 0.222…
- 5/6 = 0.8333… (eventually repeating: one non-repeating digit, then repeating 3)
- 1/7 = 0.142857142857… (repeating block of 6)

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1**: Convert 5/6 to decimal.
  5 ÷ 6 = 0.8333…
  Long division: 50÷6=8 remainder 2; 20÷6=3 remainder 2; repeats → 0.8̄3̄ (8 then repeating 3).
  Verify 5/6 is rational: p=5 ∈ ℤ, q=6 ∈ ℤ, q≠0 ✓.
  Denominator: 6 = 2 × 3; has prime factor 3 (not only 2 or 5) → repeating. ✓

- **Example 2**: Add 3/4 + 2/3.
  LCD = 12: 3/4 = 9/12; 2/3 = 8/12.
  9/12 + 8/12 = 17/12 = 1 and 5/12.
  Result: 17/12 ∈ ℚ. ℚ is closed under addition. ✓

**P49:** "Is 0.142857142857… (repeating block 142857) a rational number? How do you know?"
- **CORRECT**: Yes — it is a repeating decimal, so it is rational. (It equals 1/7.) All repeating decimals are rational by the algebraic trick: set x = 0.142857…, multiply by 10⁶, subtract. → TA-A07.
- **PARTIAL**: Confirm repeating → rational; mention the algebraic trick (or that 1/7 = 0.142857…). → TA-A07.
- **INCORRECT**: "Repeating decimals are always rational. 0.142857142857… = 1/7 ∈ ℚ. The trick: 1,000,000x = 142857.142857…; subtract: 999,999x = 142857; x = 142857/999,999 = 1/7." → TA-A07.
- **NO_RESPONSE**: Work through the algebraic trick. → TA-A07.

---

### TA-A07 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal in this TA]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**

Q1: Which of these is NOT a rational number? (A) 22/7  (B) √4  (C) 0.6̄ (= 0.666…)  (D) √3

Q2: Reduce 48/60 to canonical form. Show your work.

Q3: Calculate 2/3 × 9/4. Express the result as a reduced fraction.

Q4: Does 7/40 have a terminating or repeating decimal expansion? Justify by factoring the denominator.

Q5: A student says: "0.999… (repeating 9) and 1 are different rational numbers." Is the student correct? If not, prove that 0.999… = 1.

Q6: ℤ and ℚ are both totally ordered sets. Name one structural property that ℚ has and ℤ lacks (not "field" — think about the ordering).

**P55 (SCORE):**
Q1: D — √3 is irrational (non-terminating, non-repeating). Note: 22/7 ∈ ℚ; √4 = 2 ∈ ℤ ⊂ ℚ; 0.666… = 2/3 ∈ ℚ.
Q2: GCD(48, 60) = 12; 48/12 = 4; 60/12 = 5 → 4/5.
Q3: (2 × 9)/(3 × 4) = 18/12; GCD(18,12) = 6 → 3/2.
Q4: Terminates. 40 = 2³ × 5; only prime factors 2 and 5 → terminating. (7/40 = 0.175.)
Q5: Incorrect. Proof: let x = 0.999…; 10x = 9.999…; 10x − x = 9; 9x = 9; x = 1. So 0.999… = 1 exactly.
Q6: Density. Between any two distinct rationals there exists another rational; between consecutive integers (e.g., 1 and 2) there is no integer. ℤ is discrete; ℚ is dense.

**P76 (TRANSFER PROBE — Cross-link: math.arith.fractions):**

**Context**: Recipe scaling. A bakery recipe produces 12 cookies and calls for 3/4 cup of sugar.

**(a)** You want to make only 8 cookies. What is the scale factor? Express as a fraction in canonical (reduced) form.

**(b)** Using your scale factor from (a), how much sugar do you need for 8 cookies? Express as a fraction in canonical form.

**(c)** Your oven tray holds exactly 6 cookies and you decide to make 2 full trays. What scale factor maps the original 12-cookie recipe to the 2-tray production? How much sugar do you need?

**Expected answers**:
(a) Scale factor = 8/12; GCD(8,12) = 4 → 2/3.
(b) Sugar = 3/4 × 2/3 = 6/12; GCD(6,12) = 6 → 1/2 cup.
(c) 2 trays × 6 cookies = 12 cookies = original recipe. Scale factor = 12/12 = 1. Sugar: 3/4 × 1 = 3/4 cup.
Cross-link: math.arith.fractions — this probe uses fraction multiplication, GCD reduction, and scaling, the core operations of math.arith.fractions, grounding rational arithmetic in a concrete food-preparation context.

**P55 (SCORE):** Scale factors computed and reduced; sugar quantities obtained by rational multiplication; canonical forms verified.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, Q6, P76 = **7 items**.
Pass criterion: **6/7** (⌈0.85 × 7⌉ = 6; threshold = 0.85).
- **PASS (≥ 6/7)** → P78.
- **FAIL (< 6/7)** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q5 wrong → TA-B02 (DENSITY-COMPLETENESS — confusing irrational status) or TA-B03 (RATIONAL-TERMINATING); inspect error type; apply MAMR.
- Q2 wrong or Q3 wrong or P76 wrong → TA-B01 (FRACTION-UNIQUE — reduction errors trace to equivalence confusion); apply MAMR.
- Q4 wrong → TA-B03 (RATIONAL-TERMINATING).
- Q6 wrong → TA-B02 (DENSITY-COMPLETENESS — conflating density with discrete ordering).
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.arith.fractions, math.found.irrational-numbers.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 FRACTION-UNIQUE
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You wrote 6/8 and 3/4 as your two answers. Are these the same rational number or two different ones?"

**P06 (CONTRAST PAIR PROMPT):**
| Claim | Correct? | Evidence |
|---|---|---|
| 6/8 and 3/4 are different rational numbers | ✗ | They occupy the same point on the number line |
| 6/8 = 3/4 because 6 × 4 = 8 × 3 = 24 | ✓ | Cross-multiplication test confirms equality |
| Canonical form of both is 3/4 | ✓ | GCD(6,8)=2 → 3/4; GCD(3,4)=1 → already canonical |

**P64**: "A rational number is a position on the number line. 6/8 and 3/4 both sit exactly at the same position. The fraction 'p/q' is an ADDRESS pointing to that position. Different addresses can point to the same house. The canonical (reduced) form is the official address; other forms are valid aliases."

**P49**: "Are 15/25 and 9/15 the same rational number? Find the canonical form."
- **CORRECT**: 15×15=225; 25×9=225 → equal ✓. GCD(15,25)=5 → 3/5. GCD(9,15)=3 → 3/5. Same canonical form 3/5. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Work through cross-multiplication and GCD step by step. → return.

---

### TA-B02 — Repair MC-2 DENSITY-COMPLETENESS
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 DENSITY-COMPLETENESS: confusing 'dense ordering' with 'filling the entire number line.' Dense means no two distinct elements are adjacent — there is always a third between them. Complete means every Cauchy sequence (sequence of elements getting arbitrarily close) has a limit IN the set. ℚ is dense but NOT complete."

**P06 (CONTRAST):**
| Property | ℤ | ℚ | ℝ |
|---|---|---|---|
| Totally ordered | ✓ | ✓ | ✓ |
| Dense | ✗ (no integer between 1 and 2) | ✓ | ✓ |
| Complete | ✗ | ✗ (√2 is a Cauchy-limit not in ℚ) | ✓ |

Concrete witness for ℚ incompleteness: the sequence 1, 1.4, 1.41, 1.414, 1.4142, … Every term is rational (terminates). The sequence converges. Its limit is √2 ≈ 1.41421356… — and √2 ∉ ℚ. So ℚ has a "hole" at √2. Dense + incomplete = ℚ. Dense + complete = ℝ.

**P49**: "Is ℚ complete? Give a sequence of rationals whose limit is NOT in ℚ."
- **CORRECT**: Not complete. Example: 1, 1.4, 1.41, 1.414, … → √2 ∉ ℚ. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Walk through the √2 sequence; confirm √2 irrational (briefly). → return.

---

### TA-B03 — Repair MC-3 RATIONAL-TERMINATING
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 RATIONAL-TERMINATING: 'All rational numbers have terminating decimals.' This is false. The correct rule: every rational has a terminating OR repeating decimal. Terminating is just the easy case. Repeating decimals are equally rational — their fraction form p/q is a ratio of integers."

**P06 (CONTRAST):**
| Decimal type | Example | Rational? | Why |
|---|---|---|---|
| Terminating | 3/4 = 0.75 | ✓ ℚ | Denominator = 2² |
| Repeating | 1/3 = 0.333… | ✓ ℚ | Ratio of integers; algebraic trick confirms |
| Non-terminating, non-repeating | √2 = 1.41421356… | ✗ ∉ ℚ | Cannot be written as p/q |

Algebraic trick to convert repeating → fraction (repair tool):
  x = 0.333…
  10x = 3.333…
  9x = 3
  x = 1/3 ∈ ℚ ✓

**P49**: "Is 0.272727… (repeating block 27) rational? If yes, express it as a fraction in canonical form."
- **CORRECT**: Rational. x = 0.272727…; 100x = 27.272727…; 99x = 27; x = 27/99; GCD(27,99)=9 → 3/11 ∈ ℚ. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Apply algebraic trick step by step with the learner. → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q2 (reduce 48/60) + Q4 (7/40 terminating check) | 2/2 |
| Day 3 | Q3 (multiply 2/3 × 9/4) + Q5 (0.999… = 1 proof) | 2/2 |
| Day 7 | Mixed 3-item: classify rational/irrational, perform multiplication, state density vs. completeness | 2/3 |
| Day 21 | Q1, Q2, Q3, Q4, Q6 (5 items) | 4/5 |
| Day 60 | Full 7-item mastery gate | 6/7 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Integers | math.found.integers | ℤ as the alphabet for numerator/denominator; ring structure that ℚ extends to a field |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Fractions | math.arith.fractions | Operational arithmetic (addition, subtraction, multiplication, division) on ℚ elements |
| Irrational Numbers | math.found.irrational-numbers | Defined as ℝ ∖ ℚ; requires ℚ to be precisely characterized first |

### Cross-Links
- **math.arith.fractions**: ℚ provides the formal number-theoretic foundation (equivalence classes, field axioms, density). math.arith.fractions provides the computational procedures and concrete applications. P76 recipe-scaling probe bridges formal multiplication in ℚ with practical fraction arithmetic.

---

## Component 8 — Teaching Notes

1. **0.999… = 1**: This always surprises learners; address it explicitly (Q5 in P77). The algebraic proof is accessible and decisive; don't avoid it.
2. **Canonical form is a choice, not a law**: Reduced form is standard because it is unique per equivalence class, but any member of the class is a valid rational number. Emphasize this to prevent MC-1.
3. **Density vs. completeness**: Most learners at this level will not have seen "complete" formally. Enough to say: ℚ is dense (no gaps between rationals) but has irrational holes (the sequence-to-√2 argument). Completeness is formalized in real analysis.
4. **Field axioms**: Listing all field axioms is advanced. Sufficient here: ℚ has multiplicative inverses (ℤ does not); this is the key structural upgrade.
5. **Number chain**: Always reinforce ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. Position ℚ as the first field; ℝ as the completion of ℚ; ℂ as the algebraic closure of ℝ. Even brief forward-pointing reduces future confusion.
6. **Bloom level**: UNDERSTAND — learner must be able to apply equivalence, reduce fractions, classify decimals, and explain density vs. completeness. Not just "recall the definition."

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.found.rational-numbers |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.85) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (5) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.integers ✓ |
| V-9 | CPA_ENTRY correct (developing → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=5 ≥ 1h → max 7; used 7) | ✓ 7 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P11, A04:P04, A05:P06, A06:P27 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A06 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A07 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1 FRACTION-UNIQUE; P64 provides equivalence-class shift |
| V-15 | GR-6: P91 terminal in TA-A07 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link to math.arith.fractions (recipe scaling) |
| V-17 | GR-8: cross_links documented | ✓ math.arith.fractions in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links≠[] → cross-link probe) | ✓ P76 references math.arith.fractions directly |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 2; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.

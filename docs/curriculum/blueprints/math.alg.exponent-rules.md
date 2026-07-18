<!-- BLUEPRINT: math.alg.exponent-rules -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Exponent Rules (Algebraic)
**Concept ID:** `math.alg.exponent-rules`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=6 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.alg.exponent-rules |
| name | Exponent Rules (Algebraic) |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.arith.exponent-rules, math.alg.expression |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.arith.exponent-rules**: the integer laws aᵐ·aⁿ=aᵐ⁺ⁿ, (aᵐ)ⁿ=aᵐⁿ, (ab)ⁿ=aⁿbⁿ, a⁰=1, a⁻ⁿ=1/aⁿ, established for whole-number and integer exponents on numbers
- **math.alg.expression**: variables, coefficients, and combining algebraic terms under arithmetic operations — the surface these rules now operate on (aᵐ where a is a variable or algebraic expression, not just a number)

### Target Knowledge State
Student can apply the product, power, and quotient rules of exponents to algebraic expressions with variable bases; correctly extend the rules to zero exponents (a⁰=1 for a≠0) and negative exponents (a⁻ⁿ=1/aⁿ) as consequences of the SAME product rule rather than as separate new facts; correctly interpret and manipulate fractional (rational) exponents (a^(1/n)=ⁿ√a, a^(m/n)=ⁿ√(aᵐ)=(ⁿ√a)ᵐ) as an extension consistent with the integer rules; simplify multi-step expressions combining several rules; and avoid the classic overgeneralization errors that arise when exponent rules are pattern-matched onto addition instead of multiplication.

### Conceptual Obstacles
1. Overgeneralizing the product rule to addition — believing (a+b)ⁿ = aⁿ+bⁿ, by analogy with (ab)ⁿ=aⁿbⁿ; the rules for exponents distribute over MULTIPLICATION and DIVISION inside the base, never over addition or subtraction
2. Treating a⁰=1 and a⁻ⁿ=1/aⁿ as arbitrary conventions to memorize rather than forced consequences of extending aᵐ⁺ⁿ=aᵐ·aⁿ consistently to m=0 and negative m — this makes the rules feel like a list of unrelated facts instead of one coherent pattern
3. Misapplying the product/power rules to fractional exponents — e.g. computing a^(1/2)·a^(1/2) incorrectly, or confusing a^(m/n) with a^m/n (division of the exponent by n as a separate operation rather than nth root); confusing a^(1/n) (an nth root) with (1/n)·a (a fraction of a)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | EXPONENT-DISTRIBUTES-OVER-ADDITION | Student expands (a+b)ⁿ as aⁿ+bⁿ, applying the multiplicative distribution rule (ab)ⁿ=aⁿbⁿ to a sum instead | Any expression of the form (a+b)ⁿ or (a−b)ⁿ with n≥2; most visibly n=2, confused with the correct expansion a²+2ab+b² |
| MC-2 | ZERO-NEGATIVE-EXPONENTS-ARBITRARY | Student memorizes a⁰=1 and a⁻ⁿ=1/aⁿ as isolated facts without connecting them to the product rule, leading to shaky recall, sign errors (writing a⁻ⁿ=−aⁿ), or refusal to apply the rule when the base is an algebraic expression rather than a bare number | Any negative or zero exponent on a variable or a multi-term base; the specific error a⁻ⁿ=−aⁿ (confusing the exponent's sign with the value's sign) |
| MC-3 | FRACTIONAL-EXPONENT-AS-DIVISION | Student interprets a^(1/n) as "a divided by n" or a^(m/n) as "aᵐ divided by n," rather than as the nth root of a (raised to the mth power); also mishandles products like a^(1/2)·a^(1/2), failing to add the exponents to get a¹=a | Any fractional/rational exponent; expressions requiring a^(1/2)·a^(1/2) or converting between radical and exponent notation |

**Foundational Misconception:** MC-1 (EXPONENT-DISTRIBUTES-OVER-ADDITION) — it is the single most common and most damaging exponent error across all subsequent algebra (binomial expansion, polynomial identities, calculus power rule proofs), and it stems from a genuine structural feature of exponents (they DO distribute over multiplication and division) being over-applied to the one operation, addition, where no such property holds; every other misconception in this set concerns extending an existing correct rule, while MC-1 involves applying a correct rule to the wrong operation entirely.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner verifies the product/power rules numerically before manipulating variable expressions, confirming the rules survive the shift from numbers to algebra.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: numeric verification of aᵐ·aⁿ=aᵐ⁺ⁿ and (aᵐ)ⁿ=aᵐⁿ with actual numbers, then the same rules applied to variable bases; P: exponent "bookkeeping" table showing how exponents add/multiply/subtract under each operation; A: the four core rules stated for variable bases, plus the zero/negative exponent rules DERIVED from the product rule rather than stated separately
2. **A02 P06 CONTRAST PAIR** — (a+b)ⁿ vs (ab)ⁿ (MC-1); a⁻ⁿ vs −aⁿ (MC-2); a^(1/n) vs a/n (MC-3), with the radical-notation bridge
3. **A03 P28 CONFLICT EVIDENCE** — multi-step simplification combining product, power, quotient, zero, negative, and fractional rules in one expression, forcing correct rule selection under composition
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — From Numbers to Variables: The Rules Survive

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Re-verify the integer exponent rules numerically, then transfer them to variable bases; derive (not merely state) the zero and negative exponent rules from the product rule

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (numeric verification, then variable transfer):**

Verify the product rule with actual numbers: 2³·2² = 8·4 = 32, and 2³⁺²=2⁵=32. ✓ Match. Verify the power rule: (2³)² = 8² = 64, and 2³·²=2⁶=64. ✓ Match.

Now apply the SAME rules to a variable base — nothing about the derivation used any specific numeric value of the base, so it transfers directly:
- x³·x² = x³⁺² = x⁵ (check by expansion: x·x·x·x·x·x·x·x — wait, count directly: (x·x·x)·(x·x) = x·x·x·x·x = x⁵ ✓)
- (x³)² = x³·² = x⁶ (check: (x·x·x)² = (x·x·x)·(x·x·x) = x⁶ ✓)
- (2x)³ = 2³x³ = 8x³ (the power distributes over the multiplication inside the parentheses)

**Stage P — Pictorial (exponent bookkeeping table):**

| Operation | What happens to the exponents | Example |
|-----------|-------------------------------|---------|
| Multiply same base | ADD the exponents | x⁴·x³ = x⁷ |
| Raise a power to a power | MULTIPLY the exponents | (x⁴)³ = x¹² |
| Divide same base | SUBTRACT the exponents | x⁷/x³ = x⁴ |
| Power of a product | Apply the power to EACH factor | (xy)³ = x³y³ |
| Power of a quotient | Apply the power to EACH of numerator and denominator | (x/y)³ = x³/y³ |

Every row's exponent bookkeeping is exact and mechanical — no row mentions addition or subtraction of the BASES, only of the exponents, and only under multiplication/division/power operations.

**Stage A — Abstract (rules stated for variable bases; zero and negative exponents DERIVED):**

**Product rule:** xᵐ·xⁿ = xᵐ⁺ⁿ
**Power rule:** (xᵐ)ⁿ = xᵐⁿ
**Power of a product:** (xy)ⁿ = xⁿyⁿ
**Quotient rule:** xᵐ/xⁿ = xᵐ⁻ⁿ (x≠0)

**Deriving the zero exponent** (not a new rule — a consequence): by the quotient rule, xⁿ/xⁿ = xⁿ⁻ⁿ = x⁰. But xⁿ/xⁿ = 1 directly (any nonzero quantity divided by itself). Therefore **x⁰ = 1** (x≠0) — forced by consistency with the quotient rule, not a separate convention.

**Deriving the negative exponent** (also a consequence): by the quotient rule, x⁰/xⁿ = x⁰⁻ⁿ = x⁻ⁿ. But x⁰/xⁿ = 1/xⁿ directly (since x⁰=1). Therefore **x⁻ⁿ = 1/xⁿ** — again forced, not memorized as an isolated fact.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Simplify: (a) x⁵·x⁴, (b) (y²)⁵, (c) (2z³)⁴, (d) x⁶/x⁹ (write without a negative exponent).

**CORRECT:** (a) x⁵⁺⁴=x⁹. (b) y²·⁵=y¹⁰. (c) 2⁴z³·⁴=16z¹². (d) x⁶⁻⁹=x⁻³=1/x³.
→ "Correct throughout — (d) shows the quotient rule producing a negative exponent, then converting it via the derived rule x⁻ⁿ=1/xⁿ." → Proceed to A02.

**PARTIAL:** Student gets (a)–(c) but leaves (d) as x⁻³ without converting, or writes 1/x⁻³ (double-flipping the sign).
→ "x⁻³ is a correct intermediate step, but 'without a negative exponent' asks for the final form: x⁻³ = 1/x³ (flip to the reciprocal, drop the negative sign — do not flip twice). Compare directly: x⁶/x⁹ has more factors of x in the denominator, so the answer should be a fraction less than 1 in x — 1/x³ matches that; x⁻³ alone doesn't visually confirm it."

**INCORRECT:** Student computes (c) as 2z³⁺⁴=2z⁷ (failing to apply the outer power to the coefficient) or (2z³)⁴=8z¹² (applying the power to the coefficient with the wrong arithmetic, 2⁴≠8).
→ "The power of a product rule says EVERY factor gets the outer exponent: (2z³)⁴ = 2⁴·(z³)⁴ = 16·z¹² = 16z¹². Two things must both happen: the coefficient 2 is raised to the 4th power (2⁴=16, not left as 2 or wrongly computed as 8), AND the inner exponent 3 is multiplied by the outer exponent 4 (3·4=12, not added: 3+4=7 is the product-rule pattern, which doesn't apply here since z³ is being raised to a power, not multiplied by another power of z)."

**NO_RESPONSE:** → "(a) Same base, multiplying → add exponents: 5+4=9, x⁹. (b) Power of a power → multiply exponents: 2·5=10, y¹⁰. (c) Power of a product → apply to each factor: 2⁴=16, z³·⁴=z¹², giving 16z¹². (d) Same base, dividing → subtract exponents: 6−9=−3, x⁻³, then convert: 1/x³."

---

### Teaching Action A02 — Three Overgeneralizations, Three Contrasts

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 (exponent over addition), MC-2 (negative exponent sign confusion), and MC-3 (fractional exponent as division) each with a direct numeric contrast

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — (a+b)ⁿ vs (ab)ⁿ (MC-1), settled numerically:**

Test with a=2, b=3, n=2. Claim to check: (a+b)² =? a²+b².

- (a+b)² = (2+3)² = 5² = 25
- a²+b² = 2²+3² = 4+9 = 13

**25 ≠ 13.** The claim (a+b)ⁿ=aⁿ+bⁿ is FALSE. The correct expansion, (a+b)²=a²+2ab+b², includes a cross term (2ab=12) that the false rule always drops: 13+12=25 ✓.

Now test the rule that DOES hold: (ab)² =? a²b². (ab)²=(2·3)²=6²=36. a²b²=4·9=36. **36=36 — this one is genuinely true**, because power-of-a-product distributes over MULTIPLICATION (the base is a product, and each factor independently gets the exponent), while addition creates cross terms that a single-term rule can never capture.

**Contrast 2 — a⁻ⁿ vs −aⁿ (MC-2), settled numerically:**

Test with a=2, n=3. a⁻ⁿ = 2⁻³ = 1/2³ = 1/8 (a small POSITIVE fraction). −aⁿ = −2³ = −8 (a NEGATIVE integer). **1/8 ≠ −8** — wildly different values. The exponent's sign controls whether you take a RECIPROCAL (negative exponent) — it never controls the SIGN of the result. a⁻ⁿ is always positive when a>0, no matter how negative the exponent n is.

**Contrast 3 — a^(1/n) as a root vs a^(1/n) as division (MC-3):**

Test with a=8, n=3. Claim to check: 8^(1/3) =? 8/3.

- 8/3 ≈ 2.67
- The DEFINING property of 8^(1/3) is that it is the number which, cubed, gives 8: (8^(1/3))³ = 8. Test 2.67³ ≈ 19.03 ≠ 8 — so 8/3 is NOT 8^(1/3).
- The correct value is 8^(1/3) = 2 (the cube root of 8), since 2³=8. **2 ≠ 8/3 ≈ 2.67** — close enough in magnitude to be a tempting confusion, but definitionally different operations: a^(1/n) means "the nth root of a" (ⁿ√a), never "a divided by n."

Bridge to radical notation: a^(1/n) = ⁿ√a, and more generally a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ (the two orders give the same answer — take the root first or the power first). Product-rule consistency check: a^(1/2)·a^(1/2) = a^(1/2+1/2) = a¹ = a, matching √a·√a=a exactly, confirming the fractional exponent rule is consistent with the product rule established in A01.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Evaluate numerically and simplify: (a) (3+4)² compared to 3²+4² (state whether equal), (b) 5⁻² as a fraction (not a negative number), (c) 16^(1/4) as a whole number, (d) x^(1/3)·x^(1/3)·x^(1/3) simplified using the product rule.

**CORRECT:** (a) (3+4)²=49; 3²+4²=9+16=25. **Not equal** (49≠25) — cross term 2·3·4=24 accounts for the gap (25+24=49). (b) 5⁻²=1/5²=1/25 (a positive fraction, not −25 or −1/25). (c) 16^(1/4) is the 4th root of 16: 2⁴=16, so 16^(1/4)=2. (d) x^(1/3+1/3+1/3)=x^(1)=x.
→ "Correct across the board — (d) is the fractional-exponent analogue of the product rule confirming a^(1/3) really does behave like 'one third of a factor of x', consistent with taking a cube root three times." → Proceed to A03.

**PARTIAL:** Student gets (a)–(c) but computes (d) incorrectly as x^(1/27) (multiplying the exponents instead of adding, treating repeated multiplication like the power rule (xᵐ)ⁿ instead of the product rule xᵐ·xⁿ).
→ "This is the product rule (same base MULTIPLIED together, three separate factors of x^(1/3)), not the power rule (a single expression raised to an outer power) — exponents ADD: 1/3+1/3+1/3=1, giving x¹=x. Multiplying the exponents (1/3·1/3·1/3=1/27) would be the correct move only if the expression were (x^(1/3))^(1/3) raised again, i.e. nested powers, not three factors multiplied together."

**INCORRECT:** Student answers (b) "5⁻²=−25" (MC-2) and/or (c) "16^(1/4)=4" (dividing 16 by 4 instead of taking the 4th root, MC-3).
→ "(b) The exponent's sign triggers a reciprocal, never a sign flip on the value: 5⁻²=1/5²=1/25, a small positive fraction — 5² itself is 25, and inverting a positive number never produces a negative one. (c) 16^(1/4) asks 'what number, raised to the 4th power, gives 16?' — check 2⁴=2·2·2·2=16 ✓, so the answer is 2, not 16/4=4 (which would test 4⁴=256≠16, confirming 4 is wrong)."

**NO_RESPONSE:** → "(a) (3+4)²=7²=49; 3²+4²=25; not equal, the missing cross term is 2(3)(4)=24 and 25+24=49. (b) 5⁻²=1/25 (positive fraction). (c) 16^(1/4)=2 since 2⁴=16. (d) Add the three exponents: 1/3+1/3+1/3=1, so x^1=x."

---

### Teaching Action A03 — Composite Simplification Under Multiple Rules

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Force correct rule selection when several rules must be applied in sequence within one expression, surfacing any residual confusion between the rules before the gate

---

**[P28 — CONFLICT EVIDENCE]**

Simplify fully: $$\left(\dfrac{2x^3y^{-2}}{4x^{-1}y^{5}}\right)^{2}$$

A student who has NOT yet integrated the rules typically produces one of several inconsistent partial simplifications — for instance, cancelling the coefficients incorrectly (4/2=2 instead of 2/4=1/2), or handling the negative exponents on x and y inconsistently between numerator and denominator, or forgetting to apply the outer power of 2 to every factor including the coefficient.

**Correct simplification, step by step:**

1. Inside the parentheses first — combine coefficients and like bases using the quotient rule: $\dfrac{2x^3y^{-2}}{4x^{-1}y^{5}} = \dfrac{2}{4}\cdot x^{3-(-1)}\cdot y^{-2-5} = \dfrac{1}{2}x^{4}y^{-7}$
2. Rewrite the negative exponent as a fraction: $\dfrac{1}{2}x^{4}y^{-7} = \dfrac{x^{4}}{2y^{7}}$
3. Now apply the outer power of 2 to EVERY factor: $\left(\dfrac{x^{4}}{2y^{7}}\right)^{2} = \dfrac{x^{4\cdot2}}{2^{2}y^{7\cdot2}} = \dfrac{x^{8}}{4y^{14}}$

**Final answer:** $\dfrac{x^{8}}{4y^{14}}$

Each of the three misconceptions has a specific failure signature in this problem: MC-1 would show up as treating the coefficient subtraction/combination like a sum instead of tracking numerator/denominator multiplicatively; MC-2 would show up as a sign error converting y⁻⁷ (e.g. writing −y⁷ instead of 1/y⁷); MC-3 is less directly triggered here (no fractional exponents appear) but the same "treat the exponent operation mechanically, never as an arithmetic shortcut on the base" discipline is what this composite problem is built to test.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Simplify fully: $\left(\dfrac{3a^{-2}b^{4}}{a^{2}b^{-1}}\right)^{-1}$

**CORRECT:** Inside first: $\dfrac{3a^{-2}b^{4}}{a^{2}b^{-1}} = 3\cdot a^{-2-2}\cdot b^{4-(-1)} = 3a^{-4}b^{5}$. Apply the outer exponent of $-1$: $(3a^{-4}b^{5})^{-1} = 3^{-1}a^{4}b^{-5} = \dfrac{a^{4}}{3b^{5}}$.
→ "Correct. The outer negative-one power flips every factor's exponent sign, including the coefficient — a clean test of whether the negative-exponent rule is applied uniformly." → Proceed to A04.

**PARTIAL:** Student correctly simplifies the inside ($3a^{-4}b^{5}$) but then only flips the sign on the coefficient or only on the variables when applying the outer $-1$ power (e.g. writing $\frac{1}{3}a^{-4}b^{5}$, forgetting the variables).
→ "The outer exponent of $-1$ applies to the ENTIRE quantity $3a^{-4}b^5$ as one factor — every piece (the 3, the $a^{-4}$, and the $b^5$) gets its own exponent flipped: $3^{-1}=1/3$, $(a^{-4})^{-1}=a^{4}$, $(b^{5})^{-1}=b^{-5}$. Combine: $\frac{a^4}{3b^5}$. Partial application (flipping only some factors) breaks the power-of-a-product rule, which requires EVERY factor to receive the outer exponent."

**INCORRECT:** Student adds exponents where the quotient rule requires subtraction (e.g. computes $a^{-2}/a^{2}$ as $a^{-2+2}=a^0=1$ instead of $a^{-2-2}=a^{-4}$).
→ "Dividing same bases SUBTRACTS exponents (quotient rule: $x^m/x^n=x^{m-n}$), never adds. Here: $a^{-2}/a^{2} = a^{-2-2} = a^{-4}$ — carefully track the sign: subtracting a positive 2 from a negative $-2$ gives $-2-2=-4$, not $-2+2=0$. A quick sanity check: dividing by $a^2$ should make the exponent MORE negative (fewer net factors of $a$ available), consistent with $-4$ being more negative than $-2$."

**NO_RESPONSE:** → "Inside: $3\cdot a^{-2-2}\cdot b^{4-(-1)} = 3a^{-4}b^{5}$. Apply outer $-1$ to every factor: $3^{-1}a^{4}b^{-5} = \dfrac{a^{4}}{3b^{5}}$."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent application of all exponent rules (product, power, quotient, zero, negative, fractional) under composition and transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Simplify: $x^{6}\cdot x^{-2}\cdot x^{3}$.

*Solution:* Add all exponents (same base, product rule extends to any number of factors): $6+(-2)+3=7$, giving $x^{7}$.

**Problem 2:** Simplify: $\left(\dfrac{2m^{4}}{n^{2}}\right)^{3}$.

*Solution:* Apply the outer power to every factor: $\dfrac{2^{3}m^{4\cdot3}}{n^{2\cdot3}} = \dfrac{8m^{12}}{n^{6}}$.

**Problem 3:** Simplify: $27^{2/3}$ (as a whole number, showing the root-then-power route).

*Solution:* $27^{2/3} = (27^{1/3})^{2} = 3^{2} = 9$ (cube root of 27 is 3, then square it).

**Problem 4:** Simplify: $\dfrac{x^{-3}y^{2}}{x^{2}y^{-4}}$, leaving no negative exponents.

*Solution:* $x^{-3-2}y^{2-(-4)} = x^{-5}y^{6} = \dfrac{y^{6}}{x^{5}}$.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Radioactive decay is modeled by $N(t) = N_0 \cdot 2^{-t/h}$, where $N_0$ is the initial quantity, $h$ is the half-life, and $t$ is elapsed time.

(a) Using only exponent rules (no calculator), show that $N(h) = N_0/2$ (i.e. after one half-life, exactly half remains).
(b) Show that $N(2h) = N_0/4$, and explain — using the product rule for exponents, not a new argument — why doubling the number of half-lives always squares the fraction remaining (from $1/2$ to $1/4$ to $1/8$, etc., i.e. $(1/2)^n$ after $n$ half-lives).
(c) A students argues: "Since $2^{-t/h}$ has a negative exponent, and negative numbers are 'less than zero,' the decayed quantity should eventually become negative if we wait long enough." Use the negative-exponent rule to explain precisely why this is wrong.

**Expected solution:**

(a) $N(h) = N_0\cdot 2^{-h/h} = N_0\cdot 2^{-1} = N_0\cdot\dfrac{1}{2} = \dfrac{N_0}{2}$ — using $a^{-n}=1/a^n$ with $n=1$.

(b) $N(2h) = N_0\cdot 2^{-2h/h} = N_0\cdot 2^{-2} = N_0\cdot\dfrac{1}{4} = \dfrac{N_0}{4}$. More generally, after $n$ half-lives ($t=nh$): $N(nh) = N_0\cdot 2^{-nh/h} = N_0\cdot 2^{-n} = N_0\cdot(2^{-1})^{n} = N_0\cdot\left(\dfrac{1}{2}\right)^{n}$ — this last step is exactly the power rule $a^{mn}=(a^m)^n$ applied with $a=2, m=-1$: the exponent $-n$ factors as $(-1)\cdot n$, so $2^{-n}=(2^{-1})^n=(1/2)^n$. Each additional half-life multiplies the remaining fraction by another factor of $1/2$ — this IS the product rule in disguise, since $2^{-(n+1)} = 2^{-n}\cdot 2^{-1} = 2^{-n}\cdot\frac12$.

(c) The negative exponent never makes the BASE or the RESULT negative — it triggers a reciprocal, not a sign flip (exactly MC-2's contrast from A02). $2^{-t/h}$ for any real $t$ is $1/2^{t/h}$, and $2^{t/h}>0$ always (a positive base raised to any real power stays positive), so $1/2^{t/h}>0$ always too. As $t\to\infty$, $2^{t/h}\to\infty$, so $N(t)=N_0/2^{t/h}\to 0$ — the quantity shrinks toward zero and gets arbitrarily small, but the negative exponent never produces a negative quantity of remaining material. The student's error is confusing "the exponent has a minus sign" with "the value of the expression is negative" — precisely MC-2, now surfacing in a physical-modeling context.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.alg.radicals and math.alg.exponential-function; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.alg.exponent-rules assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — EXPONENT-DISTRIBUTES-OVER-ADDITION (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Expanding (a+b)ⁿ as aⁿ+bⁿ is EXPONENT-DISTRIBUTES-OVER-ADDITION. Exponent rules distribute over MULTIPLICATION and DIVISION inside the base — never over addition or subtraction."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is (a+b)² equal to a²+b²? Test with a=2, b=3."
- MC-1 response: "Yes, the square distributes over each term."

**[P64 — CONCEPTUAL SHIFT]**
"Test it: (2+3)²=25, but 2²+3²=13. Not equal — a real gap of 12, which is exactly the missing cross term 2(2)(3). The correct expansion is (a+b)²=a²+2ab+b², and that extra middle term is unavoidable whenever you square a SUM (it comes from FOIL/distribution: (a+b)(a+b)=a²+ab+ba+b²=a²+2ab+b²). Contrast with (ab)²=a²b², which IS true, because squaring a PRODUCT lets you square each factor independently with no cross term to lose — multiplication of the base becomes multiplication of the results, but addition of the base never becomes addition of the results."

Practice: Expand (x+1)² fully and identify the cross term; then verify (2x)³=8x³ genuinely holds (no cross term needed, since it's a product, not a sum).

---

### Repair Action B02 — ZERO-NEGATIVE-EXPONENTS-ARBITRARY (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Treating a⁰=1 and a⁻ⁿ=1/aⁿ as separate memorized facts (with sign errors like a⁻ⁿ=−aⁿ) is ZERO-NEGATIVE-EXPONENTS-ARBITRARY. Both rules are forced consequences of the SAME quotient rule that already produces a positive result — the exponent's sign flips to a RECIPROCAL, never to a negative value."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is 3⁻²? Is it positive or negative?"
- MC-2 response: "3⁻²=−9" or "3⁻²=−1/9"

**[P64 — CONCEPTUAL SHIFT]**
"Derive it fresh, don't recall it: x⁰/xⁿ=x⁻ⁿ by the quotient rule, but also x⁰/xⁿ=1/xⁿ directly (since x⁰=1). So x⁻ⁿ=1/xⁿ — a RECIPROCAL of a positive quantity is still positive. Concretely: 3⁻²=1/3²=1/9, a small positive fraction, never −9 or −1/9. The negative sign lives on the EXPONENT (telling you to flip to a reciprocal); it never migrates onto the base's sign or the final value's sign."

Practice: Compute 2⁻⁴, 10⁻¹, and (1/2)⁻³ (note the last one flips a fraction to its reciprocal: (1/2)⁻³=2³=8), confirming every result stays positive when the base is positive.

---

### Repair Action B03 — FRACTIONAL-EXPONENT-AS-DIVISION (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Interpreting a^(1/n) as 'a divided by n' is FRACTIONAL-EXPONENT-AS-DIVISION. a^(1/n) means the nth ROOT of a (ⁿ√a) — division of the exponent's numerator by its denominator is not what the fraction in the exponent instructs."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is 27^(1/3)? Is it 27 divided by 3?"
- MC-3 response: "27/3=9" (or approximately, treating the exponent as a literal division instruction on the base)

**[P64 — CONCEPTUAL SHIFT]**
"Test the candidate: if 27^(1/3) were 9, then by the defining property of a cube root, 9³ should equal 27. But 9³=729, wildly off. The correct value is 3, since 3³=27 exactly — 27^(1/3) is 'the number which, cubed, returns 27,' not 'twenty-seven split into three equal pieces.' Consistency check with the product rule: 27^(1/3)·27^(1/3)·27^(1/3) = 27^(1/3+1/3+1/3) = 27^1 = 27, and indeed 3·3·3=27 — the fractional exponent rule agrees perfectly with the product rule already established for integer exponents."

Practice: Evaluate 64^(1/2), 8^(2/3) (root-then-power: (8^(1/3))²=2²=4), and 4^(3/2) (2³=8), confirming each by checking the reverse operation (squaring/cubing back to the original).

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Re-derive x⁰=1 and x⁻ⁿ=1/xⁿ from the quotient rule from memory, without looking them up as facts |
| SR-2 | +3 days | Numerically re-verify (a+b)²≠a²+b² and (ab)²=a²b² with fresh chosen values of a, b |
| SR-3 | +7 days | Simplify one composite expression combining product, quotient, power-of-a-product, and negative-exponent rules in a single problem |
| SR-4 | +14 days | Convert between radical and fractional-exponent notation in both directions; re-derive the radioactive-decay transfer argument (why doubling half-lives squares the remaining fraction) |

Retrieval flag: if student expands (a+b)ⁿ as aⁿ+bⁿ (MC-1) or assigns a negative value to a negative exponent's result (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.arith.exponent-rules | The integer-exponent product/power/quotient laws established numerically are re-verified and then transferred to variable bases in A01 |
| Requires (Tier-1) | math.alg.expression | Provides the algebraic-manipulation vocabulary (terms, coefficients, variables) that exponent rules now operate over |
| Unlocks | math.alg.radicals | ⁿ√a notation is introduced here (A02 Contrast 3) as equivalent to a^(1/n); that blueprint develops radical simplification and rationalization built on this equivalence |
| Unlocks | math.alg.exponential-function | f(x)=aˣ requires fluent exponent manipulation, including the fractional and negative cases used in the A04 transfer probe's decay model |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the rules to a genuinely new context — exponential decay modeling — rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → standard structure (3 main TAs + gate), matching other h=6, bloom=apply Tier-2 concepts
- bloom=apply → the checkpoints and gate emphasize procedural fluency (simplification tasks) over pure conceptual explanation, consistent with the KG's apply designation
- CPA_entry = C for a proficient learner: numeric re-verification of the already-known integer rules opens the concept, confirming the rules survive the shift to variable bases before any new content (zero/negative/fractional exponents) is introduced

**Key teaching insight:** The three misconceptions in this concept are not independent errors to patch one at a time — they share a single root cause: treating exponent notation as an arbitrary set of memorized transformation rules rather than as a coherent extension of repeated multiplication. A01's derivation of x⁰=1 and x⁻ⁿ=1/xⁿ FROM the product/quotient rule (rather than stating them as separate facts) is the single highest-leverage move in this blueprint, because a student who sees the derivation can always reconstruct the rule under exam pressure, while a student who only memorized "a⁰=1" has no fallback when asked to justify it or apply it to an unfamiliar base.

**Composite problem design (A03):** The P28 conflict-evidence problem is deliberately built so that a shortcut on any ONE rule (coefficient handling, negative-exponent sign, or forgetting to apply the outer power to every factor) produces a visibly different final answer — this makes A03 a genuine diagnostic rather than a repetition of A01/A02's isolated-rule checks, and previews the kind of composite simplification the mastery gate (A04) requires under full transfer.

**Sequencing note:** No cross-link concept exists yet for math.alg.exponent-rules; the P76 transfer probe instead applies the rules to a radioactive-decay exponential model, chosen specifically because it exercises the negative-exponent rule (MC-2's exact failure mode) inside a physically meaningful context where "the exponent is negative" could otherwise be mistaken for "the physical quantity goes negative."

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.alg.exponent-rules ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.arith.exponent-rules ✓, math.alg.expression ✓ | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Procedural simplification tasks throughout A01-A04; V-4=satisfied by applied checkpoints | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=6 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Radioactive decay model; negative-exponent-never-negative-value argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

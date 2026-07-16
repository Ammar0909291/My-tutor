<!-- BLUEPRINT: math.calc.antiderivatives -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Antiderivatives
**Concept ID:** `math.calc.antiderivatives`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=8 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.antiderivatives |
| name | Antiderivatives |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 8 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.derivative-rules |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.derivative-rules**: d/dx(xⁿ)=nxⁿ⁻¹; constant multiple rule; sum/difference rule; d/dx(eˣ)=eˣ; rewrite-first discipline for radicals and rationals

### Target Knowledge State
Student understands that F is an antiderivative of f when F'=f; can identify the entire family F(x)+C and explain why the arbitrary constant is necessary; fluently applies the reverse power rule ∫xⁿdx=xⁿ⁺¹/(n+1)+C (n≠−1), ∫eˣdx=eˣ+C, and the sum/constant-multiple rules; rewrites radical and rational expressions as fractional/negative powers before integrating; and uses an initial condition to determine C in applied problems.

### Conceptual Obstacles
1. Omitting the +C — writing ∫f(x)dx=F(x) without the constant; misses that the antiderivative is a family of functions, not a unique function
2. Applying the reverse power rule in the wrong direction — writing ∫xⁿdx=xⁿ⁻¹/n (subtracting 1, dividing by n) instead of xⁿ⁺¹/(n+1) (adding 1, dividing by new exponent)
3. Believing the antiderivative is unique — confusing F(x) (one member) with the whole family F(x)+C; doesn't see the verification step F'(x)=f(x) as a check on any single choice

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | CONSTANT-OMISSION | Student writes ∫f(x)dx=F(x) without +C; treats indefinite integral as yielding a unique function | Any antiderivative computation; also when checking: F'=f → student stops without acknowledging the family |
| MC-2 | REVERSE-POWER-RULE-WRONG | Student computes ∫xⁿdx=xⁿ⁻¹/n (subtracts 1 from exponent, divides by original n) instead of xⁿ⁺¹/(n+1) | Any reverse-power-rule application; especially for n=2 giving x¹/2 instead of x³/3 |
| MC-3 | ANTIDERIVATIVE-IS-UNIQUE | Student says "THE antiderivative is…" as if there is only one; confused when asked why +C appears | Initial-value problems; comparison of antiderivatives differing by constants |

**Foundational Misconception:** MC-1 (CONSTANT-OMISSION) — every subsequent antiderivative and initial-value calculation is incomplete or wrong without +C; addressed in A01 and reinforced throughout.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner observes that multiple functions share the same derivative before abstracting.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: differentiate three functions (3x², 3x²+5, 3x²−7) to observe that all have derivative 6x; conclude antiderivative of 6x is 3x²+C; P: antiderivative family as vertical shift table; A: formal definition, reverse power rule, ∫eˣdx=eˣ+C, linearity rules
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: polynomial ∫(5x³−2x+7)dx; WE2: radical/rational ∫(3√x+1/x²)dx requiring rewrite-first
3. **A03 P06 CONTRAST PAIR** — differentiation vs antidifferentiation (unique vs family; local vs global); indefinite vs definite integral (preview Fundamental Theorem)
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Family of Antiderivatives

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish the antiderivative family F(x)+C; motivate why +C is mandatory; state the reverse power rule and core table; address MC-1 and MC-3

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (one derivative, many antiderivatives):**

Differentiate these three functions:
- d/dx(3x²) = 6x
- d/dx(3x²+5) = 6x
- d/dx(3x²−7) = 6x

All three have derivative 6x. So if we're asked "what function has derivative 6x?", the honest answer is: **any function of the form 3x²+C**, where C is any constant.

Verify: if F(x)=3x²+C, then F'(x)=6x ✓ regardless of C.

**Stage P — Pictorial (antiderivative family as vertical shifts):**

The family of antiderivatives of f(x)=6x is a collection of parallel parabolas, each shifted vertically by the constant C:

```
y
 │    3x²+5 (C=5)
 │   ·
 │  3x² (C=0)
 │ ·
 ·3x²−7 (C=−7)
 ─────────────── x
```

Each parabola has slope 6x at every x — they are "parallel" in the sense that they share the same slope at each x-value. There is no "right" choice of C without additional information.

**Stage A — Algebraic (definition and standard antiderivatives):**

**Definition:** F is an antiderivative of f on an interval if F'(x)=f(x) for all x in that interval.

If F is one antiderivative, the complete family is: F(x) + C, C∈ℝ.

**Notation:** ∫f(x)dx = F(x) + C (the indefinite integral of f).

**Reverse power rule:** For n ≠ −1:
$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C$$

*Memory aid:* add 1 to the exponent, divide by the new exponent. This is the exact reverse of d/dx(xⁿ)=nxⁿ⁻¹.

**Core antiderivative table:**

| f(x) | ∫f(x)dx |
|------|---------|
| xⁿ (n≠−1) | xⁿ⁺¹/(n+1) + C |
| eˣ | eˣ + C |
| 1 (= x⁰) | x + C |
| cos(x) | sin(x) + C |
| sin(x) | −cos(x) + C |

**Linearity rules:**
- ∫c·f(x)dx = c·∫f(x)dx (constant multiple)
- ∫[f(x)±g(x)]dx = ∫f(x)dx ± ∫g(x)dx (sum/difference)

**Exception: n=−1:** ∫(1/x)dx = ln|x|+C (different rule; covered later).

---

**[P49 — ADAPTIVE CHECKPOINT]**

Find ∫6x²dx.

- **CORRECT** → ∫6x²dx = 6·x³/3 + C = 2x³ + C. Affirm: "Correct — and always include +C." Verify: d/dx(2x³+C) = 6x² ✓.
- **PARTIAL** → Student writes 2x³ (no +C). Address: "Correct formula, but missing +C. The antiderivative is a family — 2x³+5 and 2x³−3 also work."
- **INCORRECT** → Student writes 6·x¹/2=3x (applied derivative rule backward). Address: "For antiderivatives, you ADD 1 to the exponent (2→3) and DIVIDE by the new exponent (3). Reverse of differentiation."
- **NO_RESPONSE** → Prompt: "The reverse power rule says ∫xⁿdx=xⁿ⁺¹/(n+1)+C. Here n=2. Add 1: exponent becomes 3. Divide by 3. Carry the coefficient 6."

---

### Teaching Action A02 — Worked Examples: Polynomials and Radical/Rational Functions

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Model antidifferentiation for polynomial and non-integer power functions; establish rewrite-first discipline; demonstrate the verification step (F'=f)

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Polynomial: ∫(5x³ − 2x + 7)dx**

*Step 1 — Apply sum/constant-multiple rules (term-by-term):*
$$\int(5x^3 - 2x + 7)\,dx = \int 5x^3\,dx - \int 2x\,dx + \int 7\,dx$$

*Step 2 — Reverse power rule on each term:*
- ∫5x³dx = 5·x⁴/4 = (5/4)x⁴
- ∫2x dx = 2·x²/2 = x²
- ∫7 dx = 7x

*Step 3 — Collect (one +C at the end):*
$$\int(5x^3 - 2x + 7)\,dx = \frac{5}{4}x^4 - x^2 + 7x + C$$

*Verification (always available):*
d/dx[(5/4)x⁴ − x² + 7x + C] = 5x³ − 2x + 7 ✓

**Common error:** writing a separate +C for each term — this is redundant; one +C absorbs all constants.

---

**WE2 — Radical and Rational: ∫(3√x + 1/x²)dx**

*Step 1 — Rewrite as power functions FIRST:*
$$3\sqrt{x} + \frac{1}{x^2} = 3x^{1/2} + x^{-2}$$

*Step 2 — Reverse power rule on each term:*
- ∫3x^(1/2)dx = 3·x^(3/2)/(3/2) = 3·(2/3)x^(3/2) = 2x^(3/2)
- ∫x^(−2)dx = x^(−1)/(−1) = −x^(−1) = −1/x

*Step 3 — Collect:*
$$\int\left(3\sqrt{x} + \frac{1}{x^2}\right)dx = 2x^{3/2} - \frac{1}{x} + C$$

*Verification:*
d/dx[2x^(3/2) − x^(−1) + C] = 2·(3/2)x^(1/2) − (−1)x^(−2) = 3x^(1/2) + x^(−2) = 3√x + 1/x² ✓

*Rewrite-first discipline:* Never apply the reverse power rule to 1/x² directly as written. Rewrite → then antidifferentiate. Same discipline as differentiation (WE2 in math.calc.derivative-rules).

---

**[P49 — ADAPTIVE CHECKPOINT]**

Find ∫(4x^(−3) + 6√x)dx.

- **CORRECT** → ∫(4x^(−3)+6x^(1/2))dx = 4·x^(−2)/(−2)+6·x^(3/2)/(3/2)+C = −2x^(−2)+4x^(3/2)+C = −2/x²+4x^(3/2)+C. Verify: d/dx[−2x^(−2)+4x^(3/2)+C]=4x^(−3)+6x^(1/2) ✓.
- **PARTIAL** → Student may get one term wrong (often the sign on x^(−2)). Isolate: "For ∫4x^(−3)dx: exponent = −3. Add 1: −3+1=−2. Divide by −2. So 4·x^(−2)/(−2)=−2x^(−2)."
- **INCORRECT** → Student writes 4·x^(−4)/(−3)+... (subtracted 1 instead of adding). Redirect: "Reverse power rule: ADD 1 to the exponent. Here −3+1=−2, not −4."
- **NO_RESPONSE** → Prompt: "First rewrite both terms in power form. 4x^(−3) is already written. 6√x = 6x^(?). Fill in the exponent."

---

### Teaching Action A03 — Antidifferentiation vs. Differentiation; Indefinite vs. Definite

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Contrast the two operations; clarify the role of +C; preview the Fundamental Theorem link to definite integrals

---

**[P06 — CONTRAST PAIR]**

**Contrast A: Differentiation vs. Antidifferentiation**

| Feature | Differentiation | Antidifferentiation |
|---------|----------------|---------------------|
| Input | One function f(x) | One function f(x) |
| Output | One unique function f'(x) | A family F(x)+C (infinitely many) |
| Operation | Local (slope at a point) | Global (reverse slope construction) |
| Degree (polynomial) | Reduces by 1 (n→n−1) | Increases by 1 (n→n+1) |
| Verification | — | d/dx[F(x)+C] = f(x) ✓ |

Antidifferentiation is not a function: one input (f) gives infinitely many outputs. The +C is not optional — it represents all valid answers simultaneously.

**Determining C: Initial Conditions**

If we know F(x₀)=y₀, we can solve for C:
Example: ∫6x dx = 3x² + C. If F(1) = 5: 3(1)² + C = 5 → C = 2. So F(x) = 3x² + 2.

**Contrast B: Indefinite vs. Definite Integral (preview)**

| | Indefinite integral ∫f(x)dx | Definite integral ∫_a^b f(x)dx |
|-|----------------------------|-------------------------------|
| Notation | No bounds | Bounds a (lower) and b (upper) |
| Result | Function family F(x)+C | A single number |
| C needed? | Yes | No (C cancels in F(b)−F(a)) |

The Fundamental Theorem of Calculus (future blueprint) bridges these: ∫_a^b f(x)dx = F(b)−F(a). The +C cancels, which is why definite integrals produce numbers, not families.

---

**[P49 — ADAPTIVE CHECKPOINT]**

f'(x) = 3x² − 4x. Find f(x) given f(0) = 7.

- **CORRECT** → ∫(3x²−4x)dx = x³ − 2x² + C. f(0)=C=7. So f(x)=x³−2x²+7.
- **PARTIAL** → Student finds x³−2x²+C but forgets to apply initial condition. Ask: "Now use f(0)=7 to find C."
- **INCORRECT** → f(x) = 6x−4 (differentiated again instead of integrating). Redirect: "f'(x) is the derivative of f. We need to reverse this: find f from f'."
- **NO_RESPONSE** → Prompt: "Integrating f'(x)=3x²−4x: apply the reverse power rule to each term. What is ∫3x²dx? What is ∫−4x dx?"

---

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** Find ∫(4x³ − 3x + 1)dx.

*Solution:* x⁴ − (3/2)x² + x + C

**Item 2:** Find ∫(2x^(1/2) − 5x^(−2))dx.

*Solution:* 2·x^(3/2)/(3/2) − 5·x^(−1)/(−1) + C = (4/3)x^(3/2) + 5x^(−1) + C = (4/3)x^(3/2) + 5/x + C

**Item 3:** Find ∫(3eˣ − 7)dx.

*Solution:* 3eˣ − 7x + C

*(Verify: d/dx[3eˣ−7x+C]=3eˣ−7 ✓)*

**Item 4:** Is F(x) = x³ − 2x an antiderivative of f(x) = 3x² − 2? Verify.

*Solution:* F'(x) = 3x² − 2 = f(x) ✓. Yes, F is an antiderivative. The full family is x³ − 2x + C.

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

The velocity of a particle moving along a line is v(t) = 6t² − 4t + 1 (m/s). At time t=0, the position is s(0) = 3 m.

**(a)** Find the position function s(t) using antidifferentiation (include +C).

**(b)** Apply the initial condition s(0)=3 to determine C.

**(c)** Find s(2) and v(2). What do they represent?

**(d)** At what time t>0 does the particle momentarily change direction (v=0)?

---

*Expected solution:*

(a) s(t) = ∫v(t)dt = ∫(6t²−4t+1)dt = 2t³ − 2t² + t + C

(b) s(0) = 2(0)−2(0)+0+C = C = 3 → **s(t) = 2t³ − 2t² + t + 3**

(c) s(2) = 2(8)−2(4)+2+3 = 16−8+2+3 = **13 m** (position at t=2)
v(2) = 6(4)−4(2)+1 = 24−8+1 = **17 m/s** (velocity at t=2)

(d) v(t)=0: 6t²−4t+1=0. Discriminant: 16−24=−8<0. No real roots → the particle never stops for t>0. Its velocity stays positive for all t>0.

---

**[P55 — SCORE]** Score P76 (0 or 1). Running total: _/5.

---

**[P75 — MASTERY ASSESSMENT]** MAMR = 5/5.

- Score ≥ 5/5 → PASS → proceed to P74.
- Score < 5/5 → FAIL → P74 routes to repair.

---

**[P55 — SCORE]** Record final pass/fail.

---

**[P74 — ROUTING DECISION]**

- **PASS (5/5):** Concept mastered. Proceed to math.calc.definite-integral.
- **FAIL:** Diagnose: +C omitted → B-MC1. Reverse power rule wrong → B-MC2. Uniqueness confusion → B-MC3.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.calc.antiderivatives.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: CONSTANT-OMISSION

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote F(x) without +C. The indefinite integral is a family of functions, not a unique one. Any constant C gives a valid antiderivative, and all of them are equally correct answers."

**[P41 — MISCONCEPTION DETECTOR]**
Compare F₁(x)=x³ and F₂(x)=x³+100. Both satisfy d/dx(Fᵢ)=3x². If you write "the" antiderivative of 3x² is x³, you're missing x³+100, x³−7, and infinitely many others. The +C is not cosmetic — it means "this works for any constant."

**[P64 — CONCEPTUAL SHIFT]**
Antiderivative is many-to-one in reverse: many functions (all shifted copies) share the same derivative. The +C collects all of them in one expression. When someone gives you an initial condition (F(0)=5), you then solve for C to pin down the unique antiderivative they want. Without +C, you can't do initial-value problems.

---

### B-MC2 — Repair: REVERSE-POWER-RULE-WRONG

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote ∫xⁿdx=xⁿ⁻¹/n — that's the derivative rule applied backward the wrong way. For antiderivatives, you add 1 to the exponent (not subtract) and divide by the new exponent."

**[P41 — MISCONCEPTION DETECTOR]**
Test: if ∫x²dx=x¹/2=x/2 (your answer), check by differentiating: d/dx(x/2)=1/2 ≠ x². That's wrong. Now try x³/3: d/dx(x³/3)=3x²/3=x² ✓. The correct process: 2+1=3, divide by 3 → x³/3.

**[P64 — CONCEPTUAL SHIFT]**
Differentiation lowers the power by 1 (n→n−1) and multiplies by n. Antidifferentiation reverses both steps: raise the power by 1 (n→n+1) and divide by the NEW exponent (n+1). The two operations are exact inverses. Use the verification step d/dx[F]=f to catch the error immediately.

---

### B-MC3 — Repair: ANTIDERIVATIVE-IS-UNIQUE

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You're treating the antiderivative as a unique function. It's not — there are infinitely many, all differing by a constant. 'An antiderivative' is one member; 'the antiderivative' is the whole family F(x)+C."

**[P41 — MISCONCEPTION DETECTOR]**
d/dx(x²+1)=2x; d/dx(x²−π)=2x; d/dx(x²+10000)=2x. All have derivative 2x. So asking "what is the antiderivative of 2x?" has infinitely many correct answers. Only when given additional information (e.g., F(1)=3) does the answer narrow to a unique function (here x²+2).

**[P64 — CONCEPTUAL SHIFT]**
This non-uniqueness is intrinsic: differentiation discards additive constant information. Antidifferentiation cannot recover it. The +C represents "the information that was lost." In physics, this lost constant is often the initial position, initial velocity, or another physical starting condition — found from measurements, not from the math alone.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | ∫(7x⁶ − 3x^(−2) + 1)dx. [x⁷+3x^(−1)+x+C] |
| Day 3 | f'(x)=√x and f(4)=10. Find f(x). [f=∫x^(1/2)dx=(2/3)x^(3/2)+C; f(4)=(2/3)·8+C=10 → C=10−16/3=14/3; f(x)=(2/3)x^(3/2)+14/3] |
| Day 7 | True/False: ∫(2x)(3x²)dx = (2x)·(x³)+C. [False — simplify first: ∫6x³dx = (3/2)x⁴+C] |
| Day 14 | ∫(x+1)²dx: expand first or use chain-rule-in-reverse? [Expand to x²+2x+1 → x³/3+x²+x+C; chain-rule-in-reverse is valid but not yet covered] |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.calc.derivative-rules | PACKAGE_READY | Reverse power rule is the exact inverse of the derivative power rule; rewrite-first discipline transfers |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.calc.definite-integral | Requires antiderivative family concept and F(x)+C notation for Fundamental Theorem |

### Cross-Links
*(none — cross_links field is empty in the KG)*

---

## Component 8 — Teaching Notes

**Antidifferentiation as reverse-engineering:** Frame A01 explicitly as "we already know how to go forward (differentiate); now we go backward." The Stage C observation — three different functions sharing the same derivative — makes the +C feel necessary and natural, not like a technicality imposed by the teacher.

**The rewrite-first discipline:** WE2 reinforces the same pattern from the differentiation blueprint: convert radicals and fractions to power form before operating. Students who form this habit have far fewer errors on integration than those who try to apply rules to √x or 1/x² directly.

**The verification step:** Encourage students to check every antiderivative they find by differentiating it back. This is the fastest way to catch MC-2 errors (wrong direction of power rule) and builds the habit of self-verification that will serve them in definite integrals and differential equations.

**P76 connects to initial-value problems:** The projectile/position context shows exactly how +C is resolved in practice: a physical measurement (initial position) determines C. This connects integration back to the kinematic intuition from the derivative-definition blueprint while requiring a new skill (apply initial condition).

**Note on scope:** ∫(1/x)dx=ln|x|+C is NOT covered here — it requires the natural logarithm rule, which is a separate blueprint. If students ask about it, acknowledge it as a special case (n=−1) and note it will appear later.

---

## Component 10 — Validation Checklist

| ID | Check | Status |
|----|-------|--------|
| V-1 | All Teaching Actions have assigned primitives | PASS |
| V-2 | GR-1: A01 opens with P11 (B-category primitive, non-repair) | PASS |
| V-3 | CPA entry stage = C for advanced difficulty | PASS |
| V-4 | bloom=apply → P07 present in A02 (WORKED EXAMPLE PAIR) | PASS |
| V-5 | GR-2: P49 present in A01, A02, A03, each with 4 branches | PASS |
| V-6 | GR-3: A04 (P91) is terminal — no further TAs after gate | PASS |
| V-7 | GR-4: All B-sequences open with P27+P41+P64 | PASS |
| V-8 | GR-6: P91 is terminal in A04 | PASS |
| V-9 | GR-7: P76 present inside A04 mastery gate | PASS |
| V-10 | GR-9: cross_links=[] → P76 mode = independence | PASS |
| V-11 | GR-10: MAMR=5/5 stated and enforced (thresh=0.85, n=5: ⌈0.85×5⌉=5) | PASS |
| V-12 | PASS criterion (5/5) stated in P75 and P74 | PASS |
| V-13 | GR-8: Component 7 documents all cross-blueprint dependencies | PASS |
| V-14 | Standard structure: h=8 → 3 main TAs (A01,A02,A03) + gate (A04) | PASS |
| V-15 | Component 0 metadata fields complete | PASS |
| V-16 | Component 1 (prior anchors, target state, obstacles) complete | PASS |
| V-17 | Component 2: 3 MCs with 1 foundational designated | PASS |
| V-18 | Component 3 scaffolding protocol complete | PASS |
| V-19 | Component 6 P89 schedule complete (4 intervals) | PASS |
| V-20 | Component 8 teaching notes complete | PASS |
| AIR | No prohibited operations (no curriculum modification, no framework redesign) | PASS |

**Status: PACKAGE_READY**

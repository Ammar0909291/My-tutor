<!-- BLUEPRINT: math.calc.u-substitution -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Integration by Substitution
**Concept ID:** `math.calc.u-substitution`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=10 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.u-substitution |
| name | Integration by Substitution (u-substitution) |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 10 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.ftc-part2, math.calc.chain-rule |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.chain-rule**: (f∘g)'(x) = f'(g(x))·g'(x); outer-inner decomposition; d/dx[F(g(x))] = F'(g(x))·g'(x)
- **math.calc.ftc-part2**: ∫ₐᵇ f(x)dx = F(b)−F(a); antiderivative families; evaluation theorem; definite vs indefinite integrals

### Target Knowledge State
Student fluently applies u-substitution to evaluate indefinite and definite integrals: identifies u=g(x) (the inner function), computes du=g'(x)dx, verifies g'(x) appears as a factor in the integrand (or adjusts with a constant), rewrites the integral in terms of u, evaluates, and back-substitutes. For definite integrals, converts limits to u-limits and evaluates without back-substitution. Recognises when substitution will not work (g'(x) entirely absent) versus when it requires a constant adjustment.

### Conceptual Obstacles
1. Failing to verify that g'(x) (up to a constant) appears in the integrand — writing u=x² for ∫cos(x²)dx and proceeding without du=2x dx present; the method cannot proceed when the differential is completely absent
2. Keeping x-limits unchanged in a definite integral after substituting u — computing [F(u)]₀¹ with original x-bounds instead of converting to u-bounds (x=0 → u=g(0), x=1 → u=g(1))
3. Computing du incorrectly — writing du=x dx instead of du=2x dx for u=x², or omitting the factor from the chain rule; leads to wrong constant multiple in the result

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DU-WITHOUT-VERIFICATION | Student identifies u=g(x) and substitutes without checking that g'(x) (up to a constant) is present in the integrand; integral cannot be rewritten purely in u; the method breaks down and student proceeds with mixed x-u expressions | Integrands like ∫cos(x²)dx or ∫√(x²+1)dx where the "obvious" inner function's derivative is absent |
| MC-2 | LIMITS-UNCHANGED | Student converts ∫ₐᵇ f(g(x))g'(x)dx to ∫ₐᵇ f(u)du with the original x-limits a and b instead of converting to u-limits g(a) and g(b); produces a numerically wrong definite answer | Any definite integral solved by substitution; students who are comfortable with indefinite but not definite substitution |
| MC-3 | DU-ALGEBRA-ERROR | Student computes du incorrectly: omits a constant factor (du=x dx instead of 2x dx for u=x²) or differentiates the wrong expression; the integral evaluates with a wrong constant multiple | Any substitution where g'(x) is not 1; especially u=ax²+b, u=sin(x), u=eˣ |

**Foundational Misconception:** MC-1 (DU-WITHOUT-VERIFICATION) — proceeding without checking that du is present creates a method-application without a valid foundation; students who skip the verification step produce structurally invalid work that cannot be rescued by arithmetic correction.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner reverses a known chain-rule derivative to discover substitution, making the method a direct consequence of something already mastered.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: differentiate F(x)=sin(x²) using the chain rule → F'(x)=cos(x²)·2x; reverse: ∫cos(x²)·2x dx=sin(x²)+C; name the substitution u=x², du=2x dx; P: outer-inner decomposition diagram; A: formal substitution theorem ∫f(g(x))g'(x)dx = ∫f(u)du
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: ∫2x·cos(x²)dx (u=x², g' visible); WE2: ∫x²(1+x³)⁵dx (u=1+x³, g'=3x² requires constant adjustment)
3. **A03 P06 CONTRAST PAIR** — substitution works (g' present) vs. fails (g' absent); indefinite vs. definite with limit conversion; constant-coefficient adjustment
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Discovering Substitution by Reversing the Chain Rule

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Root substitution in the chain rule already mastered; make the two-step structure (identify u, verify du present) feel inevitable; introduce the formal notation before the worked examples

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (reverse-engineering the chain rule):**

Recall from the chain rule: d/dx[sin(x²)] = cos(x²) · 2x.

This means: ∫cos(x²) · 2x dx = sin(x²) + C.

We just integrated by recognising the pattern. Now formalise the substitution:
- Let u = x² (the "inner function")
- Then du/dx = 2x, so du = 2x dx
- The factor 2x dx in the integral is exactly du

Rewrite: ∫cos(x²) · 2x dx = ∫cos(u) du = sin(u) + C = sin(x²) + C ✓

The substitution worked because du = 2x dx was already present in the integrand.

**Stage P — Pictorial (decomposition diagram):**

```
Integrand: ∫ cos(x²) · 2x dx
                │         │
           f(g(x))      g'(x)dx
           = cos(u)      = du
                └────────┘
              ∫ cos(u) du = sin(u) + C
                                │
                         back-substitute u=x²
                         sin(x²) + C  ✓
```

Three-step verification before substituting:
1. Choose u = g(x) (inner function)
2. Compute du = g'(x) dx
3. Check: does g'(x) appear (up to a constant) as a factor in the integrand?
   - YES → proceed; rewrite everything in u
   - NO → substitution cannot proceed; try a different approach

**Stage A — Abstract (formal substitution theorem):**

**Theorem (Integration by Substitution):** If g is differentiable on [a,b] and f is continuous on the range of g, then:
$$\int f(g(x))\, g'(x)\, dx = \int f(u)\, du \quad \text{where } u = g(x)$$

After integrating, back-substitute u = g(x) to express the antiderivative in x.

**For definite integrals:** Convert the limits simultaneously with the variable:
$$\int_a^b f(g(x))\, g'(x)\, dx = \int_{g(a)}^{g(b)} f(u)\, du$$

This avoids back-substitution and is generally faster.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Set up the substitution for ∫6x²(x³+1)⁴dx. State your u, compute du, verify, and write the integral in u before evaluating.

**CORRECT:** u=x³+1, du=3x²dx. Note 6x²dx=2·(3x²dx)=2du. So ∫6x²(x³+1)⁴dx=∫2u⁴du=2u⁵/5+C=(2/5)(x³+1)⁵+C.
→ "Correct. The constant 2 is handled by writing 6x²dx=2·(3x²dx)=2du. Verification: differentiate (2/5)(x³+1)⁵: (2/5)·5(x³+1)⁴·3x²=6x²(x³+1)⁴ ✓." → Proceed to A02.

**PARTIAL:** Student sets up u=x³+1 and du=3x²dx but writes du=6x²dx or mishandles the constant.
→ "Good substitution. Now du=3x²dx (derivative of x³+1 is 3x²). But the integrand has 6x²dx: that's 2·(3x²dx)=2du. So ∫6x²(x³+1)⁴dx=∫2u⁴du. Never change the constant in du — adjust the integral to absorb the constant."

**INCORRECT:** Student writes u=x²+1 (wrong inner function) or skips verification (MC-1).
→ "Check: what is the inner function of (x³+1)⁴? It's x³+1, not x²+1. So u=x³+1, du=3x²dx. Verify: is 3x²dx (up to a constant) present in the integrand? Yes — the integrand has 6x²dx=2·(3x²dx)=2du. Proceed."

**NO_RESPONSE:** → "Step 1: identify the outer function (power ⁴) and inner function (x³+1). Set u=x³+1. Step 2: du=d/dx(x³+1)·dx=3x²dx. Step 3: verify — integrand has 6x²dx; that's 2·(3x²dx)=2du ✓. Rewrite: ∫2u⁴du=2u⁵/5+C=(2/5)(x³+1)⁵+C."

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Build substitution fluency across two difficulty levels: WE1 shows a clean substitution; WE2 shows the constant-adjustment technique; both model the three-step verification protocol explicitly

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Clean substitution: ∫2x · cos(x²) dx**

**Step 1 — Choose u:**
$$u = x^2 \quad \text{(the inner function of } \cos(x^2) \text{)}$$

**Step 2 — Compute du:**
$$du = 2x\, dx$$

**Step 3 — Verify du is present:**
Integrand: 2x dx = du ✓ (exact match)

**Step 4 — Rewrite in u and integrate:**
$$\int \cos(u)\, du = \sin(u) + C$$

**Step 5 — Back-substitute:**
$$= \sin(x^2) + C$$

**Verification:** d/dx[sin(x²)] = cos(x²)·2x ✓

---

**WE2 — Constant adjustment: ∫x²(1+x³)⁵dx**

**Step 1 — Choose u:**
$$u = 1+x^3 \quad \text{(inner function of } (1+x^3)^5 \text{)}$$

**Step 2 — Compute du:**
$$du = 3x^2\, dx$$

**Step 3 — Verify and adjust:**
Integrand contains x²dx but du=3x²dx. So x²dx = du/3.

$$\int x^2(1+x^3)^5\, dx = \int (1+x^3)^5 \cdot x^2\, dx = \int u^5 \cdot \frac{du}{3} = \frac{1}{3}\int u^5\, du$$

**Step 4 — Integrate in u:**
$$\frac{1}{3} \cdot \frac{u^6}{6} + C = \frac{u^6}{18} + C$$

**Step 5 — Back-substitute:**
$$= \frac{(1+x^3)^6}{18} + C$$

**Verification:** d/dx[(1+x³)⁶/18] = (6(1+x³)⁵·3x²)/18 = x²(1+x³)⁵ ✓

**Key lesson from WE2:** When du ≠ (what's in the integrand)·dx but differs only by a constant, divide/multiply to adjust. The constant can always be moved outside the integral. If the mismatch involves an x-expression (not just a number), the substitution cannot be adjusted and a different approach is needed.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Evaluate ∫x·e^{x²}dx.

**CORRECT:** u=x², du=2x dx; x dx=du/2. ∫(1/2)eᵘdu=(1/2)eᵘ+C=(1/2)e^{x²}+C.
→ "Correct. Verify: d/dx[(1/2)e^{x²}]=(1/2)·e^{x²}·2x=xe^{x²} ✓." → Proceed to A03.

**PARTIAL:** Student gets u=x² but writes du=x dx (MC-3 — forgot factor of 2).
→ "Good substitution. Now differentiate u=x²: du/dx=2x, so du=2x dx (not x dx). Therefore x dx=du/2. Rewrite: ∫(1/2)eᵘdu=(1/2)eᵘ+C=(1/2)e^{x²}+C."

**INCORRECT:** Student tries u=e^{x²} (wrong inner-outer assignment).
→ "With u=e^{x²}: du=e^{x²}·2x dx. The integral becomes ∫x·u·(du/(2xu))... this doesn't simplify. Instead: e^{x²} is the outer function applied to x². The inner function is x². Set u=x², du=2x dx. The factor x dx is present (as du/2). Proceed."

**NO_RESPONSE:** → "The inner function of e^{x²} is x². Set u=x². Differentiate: du=2x dx. The integrand has x dx = du/2. Rewrite: ∫(1/2)eᵘ du. Integrate: (1/2)eᵘ+C. Back-substitute: (1/2)e^{x²}+C."

---

### Teaching Action A03 — Contrast Pair: Works vs. Fails; Indefinite vs. Definite

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish settings where substitution applies from where it cannot; establish the definite-integral limit-conversion procedure; address MC-1, MC-2

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Substitution works vs. fails (MC-1):**

| Integral | u choice | du | g'(x) present? | Outcome |
|----------|----------|-----|-----------------|---------|
| ∫2x·cos(x²)dx | u=x² | 2x dx | ✓ exact | Works: ∫cos(u)du |
| ∫cos(x²)dx | u=x² | 2x dx | ✗ absent | **Cannot substitute** |
| ∫x(x²+1)⁴dx | u=x²+1 | 2x dx | ✓ (x dx=du/2) | Works with constant adj. |
| ∫(x²+1)⁴dx | u=x²+1 | 2x dx | ✗ absent | **Cannot substitute** |

When g'(x) is entirely absent, substitution cannot convert the integral to pure u. Alternative methods (polynomial expansion, trig substitution, etc.) are required.

**Contrast 2 — Definite integral: convert limits vs. back-substitute (MC-2):**

Evaluate ∫₀¹ 2x(x²+1)³ dx.

**Method A (convert limits — preferred):**
- u=x²+1, du=2x dx
- Limits: x=0 → u=0²+1=1; x=1 → u=1²+1=2
- ∫₁² u³ du = [u⁴/4]₁² = 16/4 − 1/4 = **15/4**

**Method B (back-substitute then evaluate):**
- Indefinite: ∫2x(x²+1)³ dx = (x²+1)⁴/4 + C
- Evaluate: [(x²+1)⁴/4]₀¹ = (2⁴/4) − (1⁴/4) = 4 − 1/4 = **15/4** ✓

Both give the same answer, but Method A is cleaner. The error in MC-2 is writing ∫₀¹ u³ du (original x-limits with u-variable) = [u⁴/4]₀¹ = 1/4 − 0 = 1/4 ✗. The x-limits 0 and 1 are limits on x, not on u.

**Contrast 3 — Choosing the right u:**

For ∫sin(3x)dx: u=3x, du=3dx. But the integrand has dx only, not 3dx. Adjust: dx=du/3. Result: ∫(1/3)sin(u)du=−cos(u)/3+C=−cos(3x)/3+C. Works — constant adjustment.

For ∫sin(x²)dx: u=x², du=2x dx. Integrand has dx only, with no x factor. Cannot write dx in terms of du without an x remaining → impossible to eliminate x. **Substitution fails.**

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Evaluate the definite integral ∫₀² 2x(x²+1)³dx by converting limits to u-limits.

**CORRECT:** u=x²+1, du=2x dx; limits: x=0→u=1, x=2→u=5. ∫₁⁵u³du=[u⁴/4]₁⁵=625/4−1/4=624/4=156.
→ "Correct. Verify: if we back-substitute, [(x²+1)⁴/4]₀²=(5⁴/4)−(1⁴/4)=625/4−1/4=156 ✓." → Proceed to A04.

**PARTIAL:** Student sets up correctly but evaluates [u⁴/4]₀² (MC-2 — uses original x-limits).
→ "Good substitution. Now the variable is u, so the limits must also be in u. At x=0: u=0²+1=1. At x=2: u=2²+1=5. Evaluate [u⁴/4]₁⁵, not [u⁴/4]₀²."

**INCORRECT:** Student attempts ∫₀² (x²+1)³ dx directly (ignores the 2x factor / misidentifies du).
→ "The key is the 2x factor. u=x²+1 gives du=2x dx — and the integrand already has 2x dx, so the substitution is exact. Convert to u: ∫₀² 2x·(x²+1)³ dx = ∫₁⁵ u³ du. Evaluate to get 156."

**NO_RESPONSE:** → "Let u=x²+1. Then du=2x dx (exact match to the integrand). Limits: x=0 gives u=1, x=2 gives u=5. ∫₁⁵ u³ du=[u⁴/4]₁⁵=625/4−1/4=624/4=156."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent application of u-substitution to indefinite and definite integrals

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Evaluate ∫cos(3x)dx.

*Solution:* u=3x, du=3dx; dx=du/3. ∫(1/3)cos(u)du=(1/3)sin(u)+C=**(1/3)sin(3x)+C**

**Problem 2:** Evaluate ∫x/(1+x²)dx.

*Solution:* u=1+x², du=2x dx; x dx=du/2. ∫(1/(2u))du=(1/2)ln|u|+C=**(1/2)ln(1+x²)+C**

**Problem 3:** Evaluate ∫eˢⁱⁿ⁽ˣ⁾cos(x)dx.

*Solution:* u=sin(x), du=cos(x)dx (exact match). ∫eᵘdu=eᵘ+C=**e^{sin(x)}+C**

**Problem 4:** Evaluate ∫₀¹ 2x(x²+1)⁴dx using limit conversion.

*Solution:* u=x²+1, du=2x dx; limits: x=0→u=1, x=1→u=2. [u⁵/5]₁² = 32/5 − 1/5 = **31/5**

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Evaluate ∫sin³(x)cos(x)dx. Then use your result to compute ∫₀^{π/2} sin³(x)cos(x)dx.

For the definite integral, use limit conversion (not back-substitution after evaluating the indefinite integral).

**Expected solution:**

*Indefinite:* Let u=sin(x), du=cos(x)dx. The integrand sin³(x)·cos(x)dx = u³du (exact match).
∫u³du = u⁴/4 + C = **sin⁴(x)/4 + C**

*Definite (limit conversion):*
- x=0: u=sin(0)=0
- x=π/2: u=sin(π/2)=1
$$\int_0^{π/2}\sin^3(x)\cos(x)\,dx = \int_0^1 u^3\,du = \left[\frac{u^4}{4}\right]_0^1 = \frac{1}{4} - 0 = \boxed{\frac{1}{4}}$$

*Verification:* d/dx[sin⁴(x)/4] = (4sin³(x)cos(x))/4 = sin³(x)cos(x) ✓.

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

- MASTERY ACHIEVED → unlock math.calc.integration-by-parts; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.calc.u-substitution assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DU-WITHOUT-VERIFICATION (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Choosing u and substituting without verifying that du is present is called DU-WITHOUT-VERIFICATION. Substitution requires that the entire integral — including the differential — can be expressed in u alone. If any x remains after substitution, the method has failed."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Set up u-substitution for ∫cos(x²)dx."
- MC-1 response: Writes u=x², du=2x dx, proceeds to ∫cos(u)du (forgetting the 2x factor is absent).
- Correct: "u=x², du=2x dx, but 2x dx is NOT in the integrand — substitution cannot proceed."

**[P64 — CONCEPTUAL SHIFT]**
"After computing du, ask: 'Is du (or a constant multiple of du) present in the original integrand as a factor?' For ∫cos(x²)dx: du=2x dx, but the integrand has only dx, with no x factor to match. The 2x is missing completely — not a constant issue, a function issue. You cannot divide by 2x (it's a variable). Substitution fails. The verification step is non-negotiable: check before rewriting."

Practice: ∫x²sin(x³)dx — verify u=x³, du=3x²dx, integrand has x²dx: adjust with constant 1/3 → works. Contrast: ∫sin(x³)dx — same u, du=3x²dx, integrand has only dx: x² completely absent → fails.

---

### Repair Action B02 — LIMITS-UNCHANGED (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Keeping the original x-limits after substituting u is LIMITS-UNCHANGED. In a definite integral, limits are x-values; after substituting u=g(x), they become u-values via g(a) and g(b)."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: Set up ∫₀¹ 2x(x²+1)³dx with u=x²+1.
- MC-2 response: ∫₀¹ u³du (x-limits kept).
- Correct: ∫₁² u³du (limits converted: x=0→u=1, x=1→u=2).

**[P64 — CONCEPTUAL SHIFT]**
"The limit 0 means x=0, which translates to u=g(0)=0²+1=1. The limit 1 means x=1, which translates to u=g(1)=1²+1=2. New limits are in u-space. The integral ∫₀¹u³du=1/4, but ∫₁²u³du=15/4 — keeping old limits gives the wrong numerical answer. Checklist: after substituting, immediately compute the new limits before evaluating."

Practice: ∫₀^{π/2} cos(x)sin²(x)dx with u=sin(x). Convert limits: x=0→u=0, x=π/2→u=1. ∫₀¹u²du=1/3.

---

### Repair Action B03 — DU-ALGEBRA-ERROR (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Computing du incorrectly is DU-ALGEBRA-ERROR. The most common form: writing du=x dx instead of 2x dx for u=x². The derivative of x² is 2x, not x."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "For u=x², what is du?"
- MC-3 response: du=x dx.

**[P64 — CONCEPTUAL SHIFT]**
"du = (d/dx)(u) · dx. For u=x²: d/dx(x²)=2x, so du=2x dx. The '2' comes from the power rule. A fast check: differentiate F(x)=x²sin(x²) using chain rule to see the 2x factor naturally. Similarly: u=x³ → du=3x²dx; u=sin(x) → du=cos(x)dx; u=eˣ → du=eˣdx."

Practice drills (write du for each u): u=x⁴, u=3x²+1, u=cos(x), u=ln(x), u=e^{2x}.
Answers: 4x³dx, 6x dx, −sin(x)dx, (1/x)dx, 2e^{2x}dx.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Three indefinite integrals requiring constant adjustment (e.g., ∫x(1+x²)⁴dx); verify du-check step is stated |
| SR-2 | +3 days | Two definite integrals with limit conversion; include one where the student must state explicitly "x=a → u=g(a)" |
| SR-3 | +7 days | Recognise failure case: ∫√(1+x²)dx — no g'(x) to match; discuss why this requires trig substitution instead |
| SR-4 | +14 days | Multi-step: ∫tan(x)dx via u=cos(x); ∫sec²(x)tan³(x)dx via u=tan(x); connect to integration-by-parts boundary |

Retrieval flag: if student skips verification step (MC-1) or keeps x-limits (MC-2) in any SR, re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.calc.ftc-part2 | Evaluation theorem and definite integral mechanics assumed; limit conversion technique extends FTC Part 2 |
| Requires (Tier-1) | math.calc.chain-rule | Substitution reverses the chain rule; f'(g(x))·g'(x) pattern must be recognised in the integrand |
| Unlocks | math.calc.integration-by-parts | Integration by parts is the next systematic integration technique; requires fluent substitution as a sub-step |

**GR-9:** cross_links=[] → P76 mode = independence (transfer probe is self-contained within single-variable calculus).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=10 → standard structure (3 main TAs + gate)
- bloom=apply → V-4 = PASS (P07 required; WE1 and WE2 in A02)
- CPA_entry = C for advanced learner: concrete chain-rule reversal in A01 before abstract theorem

**Key teaching insight:** Substitution is the most important single integration technique, and the verification step (does du appear?) is what students most frequently skip. A01's three-step protocol (choose u, compute du, verify) should be presented as a checklist that students write down before every substitution problem, not just a thought process. The P76 probe uses sin³(x)cos(x) — a composite where u=sin(x) is natural but may not be obvious to students who haven't seen trigonometric integrands, making it a genuine transfer test.

**WE2 constant adjustment:** The pattern of writing x²dx=(du/3) is subtle — students need to isolate the exact factor that is present (x²dx) and express it in terms of du. Emphasise: never change what's in du; instead, adjust the relationship between du and the factor in the integrand.

**Definite integral advice:** Always convert limits immediately after identifying u and computing du — before rewriting the integrand. Deferring the limit conversion is the main cause of MC-2.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.calc.u-substitution ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.calc.ftc-part2 ✓, math.calc.chain-rule ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 present | P07 in A02 (WE1=∫2x·cos(x²)dx, WE2=∫x²(1+x³)⁵dx) ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[] → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=10 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | sin³(x)cos(x): u=sin(x), du=cos(x)dx, exact match; definite=1/4; verified by differentiation ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

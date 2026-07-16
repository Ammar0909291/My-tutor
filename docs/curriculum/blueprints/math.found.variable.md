# Teaching Blueprint: Variable

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.variable |
| KG_ID | math.found.variable |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Variable |
| ALIASES | unknown, placeholder, indeterminate |
| DIFFICULTY | foundational |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.85 |
| ESTIMATED_HOURS | 3 |
| REQUIRES | math.found.abstraction, math.found.mathematical-notation |
| UNLOCKS | math.alg.expression, math.alg.equation, math.func.function-concept |
| CROSS_LINKS | math.func.function-concept |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 6/7 (⌈0.85 × 7⌉ = 6; threshold = 0.85) |
| MAMR | MC-1 VARIABLE-AS-LABEL is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links ≠ []; references math.func.function-concept) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.abstraction**: Learner can extract a general pattern from specific instances; understands that symbols represent general concepts, not just specific values.
- **math.found.mathematical-notation**: Learner reads and writes standard mathematical symbols; familiar with quantifiers (∀, ∃) and set notation (∈, :).

### Target Understanding
1. A variable is a symbol that represents any element from a specified domain (not just a label or fixed unknown).
2. Three roles of a variable: (a) unknown in an equation; (b) universal placeholder in an identity; (c) parameter in a formula.
3. Domain of a variable: the set from which it takes values must be specified or clearly implied.
4. Bound vs. free variables: a bound variable is captured by a quantifier or summation; a free variable ranges over its domain without an enclosing binder.
5. Cross-link: in f:A→B, the input variable x ranges over A — the function-concept formalizes variables with explicit domain and co-domain.

### Cross-Link Activation
- **math.func.function-concept**: f(x) = x² formalizes x as a variable ranging over the domain A of function f. The notation f:A→B makes the domain explicit — reinforcing that every variable has a domain.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — VARIABLE-AS-LABEL
- **Trigger**: "x is just a name for the unknown" OR "x is whatever we decide to call it — it doesn't matter what set x comes from"
- **Root cause**: Informal introduction of variables as "a letter standing in for a number" without specifying a domain; learner treats x like a box-label rather than a ranging symbol.
- **Error pattern**: Writing expressions with unspecified domain; treating ∀x (x > 0) as equivalent to "x = any positive number" without understanding that x quantifies over a declared set; confusing "let x = 5" (fixed value) with "for all x ∈ ℝ" (domain-ranging).
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — cleared in TA-A02; if triggered later, route to TA-B01 before returning.

### MC-2 — EQUATION-ONLY
- **Trigger**: "Variables only appear in equations like x + 3 = 7 — they don't appear in identities or formulas"
- **Root cause**: First contact with variables is always in equations (solve for x); learner has not encountered the identity or parameter roles.
- **Error pattern**: Expecting a variable always to have exactly one value to "solve for"; treating a(b+c) = ab+ac as an equation with unknowns rather than an identity true for all a, b, c.
- **Repair**: TA-B02.
- **MAMR**: Address after MC-1 cleared. FIFO with MC-3.

### MC-3 — SINGLE-VALUE
- **Trigger**: "x = 5 means x always refers to 5 in this problem"
- **Root cause**: Solving equations reinforces the idea that a variable collapses to one specific value; learner does not distinguish "x is the unknown we solved for" from "x ranges over a domain in a general statement."
- **Error pattern**: Substituting a found solution into a universal statement and concluding the universal statement is "about" that value; not seeing that a universal quantifier makes x range over ALL domain elements simultaneously.
- **Repair**: TA-B03.
- **MAMR**: Address after MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with concrete objects (a seat labelled "speaker," a price tag with "?") before introducing symbolic notation. Move from concrete placeholder → pictorial domain diagram → symbolic ∀x ∈ S.

### MAMR Enforcement
MC-1 VARIABLE-AS-LABEL addressed in TA-A02 (explicitly names MC-1 via P27). If MC-1 triggers at any later TA or at the mastery gate, route → TA-B01 → return to point of interruption. MC-2 and MC-3 are FIFO after MC-1 cleared: if both active, address TA-B02 before TA-B03.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Three Roles of a Variable
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
"A variable is a reserved seat with a role label — 'speaker', 'moderator', 'guest'. Anyone who qualifies for the role (anyone in the specified set) can fill the seat. The seat isn't empty and isn't fixed to one person — it holds a ROLE, and whoever fits the domain can occupy it."

**P11 (REPRESENTATION SHIFT):**
Three roles, one symbol:

| Role | Example | What the variable represents |
|---|---|---|
| Unknown (equation) | 2x + 3 = 11, solve for x | One specific value satisfying the equation (x = 4) |
| Universal placeholder (identity) | ∀a, b ∈ ℝ: (a+b)² = a²+2ab+b² | ALL values simultaneously from the declared domain |
| Parameter (formula) | A = πr², r ∈ (0, ∞) | A varying quantity that generates a family of values |

Shift: fixed unknown → all-at-once universal → continuously varying parameter.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Identify the role of the variable in each: (a) 3t + 1 = 10; (b) ∀m, n ∈ ℤ: m + n = n + m; (c) V = lwh in the formula for volume."
- **CORRECT**: (a) unknown (t = 3); (b) universal placeholder; (c) parameter (l, w, h vary to generate different volumes) → TA-A02.
- **PARTIAL**: Clarify any misidentified role with the table contrast → TA-A02.
- **INCORRECT**: → Protocol B, TA-B02.
- **NO_RESPONSE**: → Protocol B, TA-B01.

---

### TA-A02 — Domain of a Variable
**Primitives**: P27 → P04 → P49

**P27 (MISCONCEPTION NAMING):**
Name MC-1 VARIABLE-AS-LABEL: "A common error: treating a variable as just a name — 'x is the unknown' — without specifying which SET x can take values from. A variable without a declared domain is mathematically incomplete. The domain determines what operations are valid, what values are possible, and whether a statement is true or false."

Examples:
- "x > −1" — no truth value until we specify the domain. If x ∈ ℕ, it's true for all x ∈ ℕ. If x ∈ ℝ, it's true for x > −1 only.
- "n is even" — only makes sense when n ∈ ℤ (or ℕ); meaningless if n ∈ ℝ.

**P04 (PATTERN INDUCTION):**
Pattern: every well-formed variable usage specifies a domain.
- "Let x ∈ ℝ" — domain is ℝ (all real numbers)
- "For n ∈ ℕ, n ≥ 0" — domain is ℕ
- "r ∈ (0, ∞)" — domain is positive reals
- f(x) = x² where f : ℝ → ℝ — domain is ℝ, made explicit in the function type

The domain can be declared explicitly (∀x ∈ S), contextually implied (in a geometry problem, "x" is a length so x > 0), or imposed by a function signature (f : A → B gives x ∈ A).

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "For the variable x in each context, identify its domain: (a) 'Let x ∈ ℤ, x² = 4'; (b) f : [0,1] → ℝ, f(x) = √x; (c) 'n is prime' (context: a number theory statement)."
- **CORRECT**: (a) ℤ; (b) [0,1] ⊂ ℝ; (c) ℕ (or ℤ⁺) — natural numbers or positive integers → TA-A03.
- **PARTIAL**: Confirm correct domains; emphasize that (c) requires inferring ℕ from context → TA-A03.
- **INCORRECT**: → Protocol B, TA-B01.
- **NO_RESPONSE**: → Protocol B, TA-B01.

---

### TA-A03 — Bound vs. Free Variables
**Primitives**: P03 → P06 → P49

**P03 (ANALOGY BRIDGE):**
"A free variable roams: in the expression x² + 1, the variable x is free — its value is not fixed by the expression, and different values of x give different results. A bound variable is captured: in ∑_{k=1}^{5} k, the variable k is bound by the sum sign — once you evaluate ∑, k disappears. Bound variables are internal; free variables are external inputs."

**P06 (CONTRAST PAIR PROMPT):**
| Expression | Variable | Bound or Free? | Reason |
|---|---|---|---|
| x² + 3x | x | Free | No quantifier or binder captures x |
| ∀x ∈ ℝ, x² ≥ 0 | x | Bound | Captured by ∀; the statement has no free variables; it is a proposition |
| ∑_{k=1}^{n} k² | k | Bound (by ∑) | k disappears after summation |
| ∑_{k=1}^{n} k² | n | Free | n is the upper limit; different n gives different sums |
| ∃x ∈ ℕ, x > 100 | x | Bound | Captured by ∃; the statement is a proposition (TRUE) |
| f(x) = x² + 1 (definition) | x | Free in RHS expression | x is the input; in the function context, x is bound to domain of f |

Key rule: an expression with all variables bound is a PROPOSITION (has a definite truth value). An expression with at least one free variable is an open sentence (truth value depends on the free variable).

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "In ∀x ∈ ℤ, ∃y ∈ ℤ, x + y = 0 — are x and y free or bound? Is this expression a proposition?"
- **CORRECT**: Both x and y are bound (x by ∀, y by ∃); all variables bound → it IS a proposition (TRUE: y = −x) → TA-A04.
- **PARTIAL**: Confirm bound status of both; note that bound-all → proposition → TA-A04.
- **INCORRECT**: → Protocol B, TA-B03.
- **NO_RESPONSE**: → Protocol B, TA-B01.

---

### TA-A04 — Worked Examples Across Expression Types
**Primitives**: P04 → P07 → P49

**P04 (PATTERN INDUCTION):**
Pattern: the SAME variable symbol plays different roles depending on context.
- Equation context: solve for one value (x = ?)
- Identity context: true for ALL values in domain simultaneously
- Formula/parameter context: generates a family of outputs as variable changes

The letter used (x, t, r, n) does not determine the role — context and quantifiers do.

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — Expression vs. Equation vs. Identity**:
  - Expression: 2x + 3 — free variable x; no truth value; evaluates to a number given x.
  - Equation: 2x + 3 = 11 — solving gives x = 4; here x played the "unknown" role.
  - Identity: 2(a + b) = 2a + 2b — true for ALL a, b ∈ ℝ; variables are universal placeholders.
  - Moral: the same symbol x can play different roles in different contexts. The ROLE is determined by context, not by the letter chosen.

- **Example 2 — Parameter role**:
  - Formula: C = 2πr, r ∈ (0, ∞). The variable r is a parameter — fixing r gives one circle's circumference; varying r generates the family of all circles.
  - Compare with: solving C = 2πr for r when C = 10π gives r = 5. Here r becomes an unknown (one specific value). Same formula, different context, different role.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Consider the expression (x + y)² = x² + 2xy + y². (a) What role do x and y play? (b) What is their domain? (c) Is this an expression, equation, or identity?"
- **CORRECT**: (a) universal placeholder (true for all values); (b) ℝ (or any ring); (c) identity → TA-A05.
- **PARTIAL**: Clarify identity = true for ALL values in domain, not just one; role = universal placeholder → TA-A05.
- **INCORRECT**: → Protocol B, TA-B02.
- **NO_RESPONSE**: → Protocol B, TA-B02.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA — routing via P75/P74 only]**
**[GR-6: P91 is the terminal compound in this TA]**
**[GR-7: P76 present in this mastery gate]**

**P77 (MULTI-PROBLEM SET):**

Q1: "In the statement ∀n ∈ ℕ, n² ≥ n — what is the domain of n? Is n free or bound?"

Q2: "Identify the role of the variable t in: (a) 3t − 7 = 2; (b) sin²t + cos²t = 1; (c) s = ut + ½at² (equation of motion with u, a fixed constants)."

Q3: "In ∑_{i=1}^{m} i = m(m+1)/2 — which variables are bound and which are free?"

Q4: "Write a mathematical expression containing one bound variable and one free variable. Identify each."

Q5: "True or False: 'A variable must always refer to a single specific number.' Justify."

Q6: "What is missing from the statement 'x > 0 implies x² > 0'? What must be added to make it a complete formal proposition?"

**P55 (SCORE):** Evaluate Q1–Q6:
- Q1: domain ℕ; n is bound (by ∀)
- Q2: (a) unknown (t = 3); (b) universal placeholder; (c) parameter (t varies with u, a fixed)
- Q3: i is bound (by ∑); m is free
- Q4: any valid example, e.g., ∑_{k=1}^{n} k (k bound, n free) — award if distinction is correct
- Q5: FALSE — a variable ranges over a domain; in a universal statement it represents ALL values simultaneously
- Q6: domain of x must be declared, e.g., "∀x ∈ ℝ, x > 0 ⟹ x² > 0"

**P76 (TRANSFER PROBE — Cross-link: math.func.function-concept):**
"Consider the function f : ℝ → ℝ defined by f(x) = x² + 1. (a) What role does x play in this function definition? (b) What is x's domain? (c) In the definition 'f(x) = x² + 1', is x free or bound? (d) Now compare ∀x ∈ ℝ, f(x) ≥ 1 — is x free or bound here, and what type of statement is this?"

Expected: (a) parameter/input variable; (b) ℝ — the domain of f; (c) free in the expression x²+1 (x is the input to f; it becomes bound only when we apply f to a specific value or quantify); (d) x is bound by ∀; the statement is a proposition (TRUE, since x²+1 ≥ 1 for all x ∈ ℝ). This bridges to math.func.function-concept: the function f makes the domain of x explicit in its type signature f:ℝ→ℝ.

**P55 (SCORE):** Evaluate P76: (a) correct role; (b) domain ℝ; (c) free in expression; (d) bound by ∀, proposition.

**P75 (MASTERY ASSESSMENT):**
Items: Q1, Q2, Q3, Q4, Q5, Q6, P76 = **7 items**.
Pass criterion: **6/7** (⌈0.85 × 7⌉ = 6; threshold = 0.85).
- **PASS** → P74: route to P78.
- **FAIL** → P74: identify miss pattern → repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q6 wrong (domain missing) → TA-B01 (VARIABLE-AS-LABEL).
- Q2 wrong (role confusion) or Q5 wrong → TA-B02 (EQUATION-ONLY) or TA-B03 (SINGLE-VALUE) depending on error.
- Q3 wrong or Q4 wrong or P76(c/d) wrong → TA-B03 (SINGLE-VALUE / bound-free confusion).
- Multiple wrongs → MAMR: TA-B01 if domain issue present; then FIFO TA-B02 before TA-B03; re-gate after all active MCs cleared.

**P78 (COMPLETION):**
Mastery of math.found.variable confirmed. Record mastery event. Schedule P89. Activate unlocks: math.alg.expression, math.alg.equation, math.func.function-concept.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 VARIABLE-AS-LABEL
**Primitives**: P41 → P06 → P64 → P49

**P41**: "When you write x in an expression, what does it represent? Does x need to come from a specific set, or can it be 'anything at all'?"

**P06 (CONTRAST PAIR PROMPT):**
| Incomplete (label only) | Complete (domain declared) | Why it matters |
|---|---|---|
| "x > 0" | "∀x ∈ ℝ, x > 0" | Without domain: no truth value. With ℝ: FALSE. |
| "n is prime" | "∀n ∈ ℕ, n is prime" | Without domain: meaningless. With ℕ: FALSE. |
| "x + y = y + x" | "∀x, y ∈ ℝ, x + y = y + x" | Without domain: open sentence. With ℝ: TRUE (commutativity). |

**P64 (CONCEPTUAL SHIFT):** "A variable is not just a name — it is a symbol ANCHORED to a domain. The domain determines truth values, valid operations, and the meaning of the statement. Without a domain, a variable expression is grammatically correct but semantically incomplete."

**P49**: Prompt: "Add a domain to make this a complete proposition: 'x² ≥ 0'."
- **CORRECT**: "∀x ∈ ℝ, x² ≥ 0" or "∀x ∈ ℂ, x² ≥ 0" — note the real version is TRUE, the complex version is FALSE (e.g., i² = −1) → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Emphasize domain changes truth value; show ℝ vs. ℂ contrast → return to calling TA.

---

### TA-B02 — Repair MC-2 EQUATION-ONLY
**Primitives**: P03 → P07 → P49

**P03**: "The first time most people see a variable is in an equation — 'solve for x.' But variables appear in three contexts: (1) equations (one specific value to find), (2) identities (true for ALL values simultaneously), (3) formulas (a parameter generating a family). Limiting variables to equations misses roles (2) and (3)."

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — Identity role**: a² − b² = (a+b)(a−b). Try a=3, b=2: 9−4=5=(5)(1) ✓. Try a=7, b=3: 49−9=40=(10)(4) ✓. This is an IDENTITY — TRUE for all a, b ∈ ℝ. There is no unique value of a or b to "solve for."
- **Example 2 — Parameter role**: The height of a projectile: h(t) = h₀ + v₀t − ½gt². The variable t is a parameter — different values of t give the height at different moments. You don't "solve" t; you plug in a value to get h.

**P49**: Prompt: "True or False: 'In the identity sin²θ + cos²θ = 1, we should solve for θ.' Explain."
- **CORRECT**: FALSE — it is an identity, true for all θ ∈ ℝ; θ is a universal placeholder, not an unknown to solve → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Show that substituting any θ yields 1=1; no unique θ satisfies the "equation" more than any other → return to calling TA.

---

### TA-B03 — Repair MC-3 SINGLE-VALUE
**Primitives**: P06 → P27 → P49

**P27 (MISCONCEPTION NAMING)**: "MC-3 SINGLE-VALUE: 'A variable refers to exactly one specific number.' This conflates the equation role (where solving gives one value) with the universal or parameter roles (where the variable ranges over an entire domain)."

**P06 (CONTRAST PAIR PROMPT):**
| Statement | What x represents |
|---|---|
| 2x + 3 = 11 | ONE specific value (x = 4); the equation role |
| ∀x ∈ ℝ, x + 0 = x | ALL values in ℝ simultaneously; universal role |
| f(x) = x² for x ∈ [0,5] | A continuously varying input; parameter role |
| ∃x ∈ ℕ, x > 100 | AT LEAST ONE value; existential role |

The same letter x can represent one value, all values, or a varying value — the ROLE is determined by context and quantifiers, not by the letter.

**P49**: Prompt: "In ∀x ∈ ℤ, x + (−x) = 0 — what does x represent? Is there ONE specific integer that makes this true?"
- **CORRECT**: x represents ALL integers simultaneously; the statement is TRUE for every x ∈ ℤ, not just one specific value → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Test substituting x=3, x=−7, x=0 — all yield 0=0; x is universal, not one value → return to calling TA.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (domain + bound/free) + Q5 (single-value misconception) | 2/2 |
| Day 3 | Q2 (three roles) + P76 (function cross-link) | 2/2 |
| Day 7 | Mixed 3-item mini-set: one from each role + domain question | 2/3 |
| Day 21 | Q1, Q2, Q3, Q6 (4 items) | 3/4 |
| Day 60 | Full 7-item mastery gate | 6/7 |

**Decay rule**: Failure at any interval → reset to Day 1 + Protocol B routing:
- Domain-type failure → TA-B01; role-confusion failure → TA-B02; single-value failure → TA-B03.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Abstraction | math.found.abstraction | Ability to extract general pattern; symbol as placeholder concept |
| Mathematical Notation | math.found.mathematical-notation | ∀, ∃, ∈, :, → symbols; set and quantifier notation |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Expression | math.alg.expression | Algebraic expressions require understanding variables |
| Equation | math.alg.equation | Equations use variables in the unknown role |
| Function Concept | math.func.function-concept | Functions formalize variables with explicit domain/codomain |

### Cross-Links
- **math.func.function-concept**: Bidirectional — function makes variable domain explicit in f:A→B type signature; P76 probe bridges this. Variables are the inputs that function-concept formalizes.

---

## Component 8 — Teaching Notes

1. **Domain is non-negotiable**: Never let a learner write a variable expression without a domain in formal contexts. TA-A02 forces explicit domain declaration.
2. **Three roles take time**: Learners with only equation exposure need deliberate exposure to identities (TA-A04 Example 1) before accepting the universal role. Do not rush TA-A01.
3. **Bound/free is new vocabulary**: Most pre-university learners have not seen the bound/free distinction. TA-A03 introduces it carefully. The payoff is immediately visible in the cross-link to function-concept (P76).
4. **Concrete entry**: If learner has only seen variables in arithmetic equations, open TA-A01 with physical placeholders (price tag with "?", seat label with "speaker") before symbolic notation.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID exactly | ✓ math.found.variable |
| V-2 | KG node ID exists in docs/mathematics/kg/graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.85) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (3) | ✓ |
| V-8 | All REQUIRES listed; prerequisite blueprints exist | ✓ math.found.abstraction ✓, math.found.mathematical-notation ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=3 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair Protocol A TAs open with B-category primitive | ✓ A01:P03, A02:P27, A03:P03, A04:P04 |
| V-12 | GR-2: every non-gate TA has exactly one P49 | ✓ TA-A01 through TA-A04 each have P49; TA-A05 uses P91 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A05 uses P91; P75/P74 govern routing |
| V-14 | GR-4: P41/P64 gates repair chain | ✓ TA-B01 uses P41 to detect MC-1; P64 shifts concept; P49 routes |
| V-15 | GR-6: P91 compound is terminal in TA-A05 | ✓ P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78 |
| V-16 | GR-7: P76 present in mastery gate | ✓ P76 cross-link to math.func.function-concept in TA-A05 |
| V-17 | GR-8: all cross_links documented in Component 7 | ✓ math.func.function-concept |
| V-18 | GR-9: P76 mode correct (cross_links≠[] → cross-link probe) | ✓ P76 references math.func.function-concept directly |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; stated Component 0 and Component 3; TA-A05 P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P03, B03:P27 |
| AIR | AI Removal Test: executes with human tutor; all content fully specified | ✓ All examples, contrasts, prompts, and responses are explicit |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.

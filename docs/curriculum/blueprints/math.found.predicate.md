# Teaching Blueprint: Predicate

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.predicate |
| KG_ID | math.found.predicate |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Predicate |
| ALIASES | open sentence, propositional function |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.80 |
| ESTIMATED_HOURS | 3 |
| REQUIRES | math.found.proposition, math.found.variable |
| UNLOCKS | math.found.quantifiers |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 5/6 (⌈0.80 × 6⌉ = 5; threshold = 0.80) |
| MAMR | MC-1 PREDICATE-AS-PROPOSITION is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.proposition**: Learner knows that a proposition has a definite truth value (T or F); understands open sentences are NOT propositions.
- **math.found.variable**: Learner understands that a variable is a symbol ranging over a domain; knows domain, bound/free distinction.

### Target Understanding
1. A predicate P(x) is a statement containing one or more free variables that evaluates to TRUE or FALSE when each variable is assigned a value from its domain.
2. Formally: P : D → {T, F} — a predicate is a function from its domain to truth values.
3. The truth set of P(x) over domain D: {x ∈ D : P(x) is TRUE} — the set of all domain elements that satisfy the predicate.
4. Multi-variable predicates P(x, y): require values for ALL free variables to yield a truth value.
5. Predicates become propositions when (a) all free variables are instantiated, or (b) all free variables are bound by quantifiers (∀ or ∃).

### Cross-Link Activation
- None (cross_links = []). P76 uses an independent context.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — PREDICATE-AS-PROPOSITION
- **Trigger**: "'n is even' is a proposition" OR "P(n) is either true or false — it's a proposition"
- **Root cause**: Learner conflates the grammatical form (declarative sentence) with the logical form (proposition with definite truth value); does not recognize that a free variable renders a statement incomplete.
- **Error pattern**: Assigning a definite truth value to P(n) without specifying n; claiming "n is even" is TRUE or FALSE without substituting a value.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A01 via P27; if triggered later, route to TA-B01 before returning.

### MC-2 — PREDICATE-ONE-VARIABLE
- **Trigger**: "A predicate can only have one variable — P(x, y) with two variables isn't a real predicate"
- **Root cause**: Most introductory examples (n is prime, x > 0) use single-variable predicates; learner over-generalizes.
- **Error pattern**: Rejecting multi-variable predicates; not understanding that multi-variable predicates yield truth values only when ALL variables are instantiated.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — PREDICATE-AS-FORMULA
- **Trigger**: "P(x) = x² + 1 is a predicate" (confusing a formula that returns a number with a predicate that returns a truth value)
- **Root cause**: Notation P(x) looks identical for functions and predicates; learner doesn't distinguish "returns a number" from "returns T/F."
- **Error pattern**: Calling any function-like notation a predicate; using predicates in arithmetic contexts expecting a numerical result.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with everyday examples ("Student s is enrolled" where s is a specific student; "Door d is locked" where d is a specific door) before symbolic notation P(x).

### MAMR Enforcement
MC-1 addressed in TA-A01 via P27. If triggered later, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Predicate Definition: Function from Domain to {T, F}
**Primitives**: P27 → P03 → P49

**P27 (MISCONCEPTION NAMING):** Name MC-1 PREDICATE-AS-PROPOSITION: "You've seen that 'n is even' is NOT a proposition — it's an open sentence. We now give this a formal name: it's a PREDICATE. The key: a predicate is NOT a proposition by itself. It becomes a proposition ONLY when you substitute a specific value for each free variable. 'n is even' is a predicate; '6 is even' (TRUE) and '7 is even' (FALSE) are propositions derived from it."

**P03 (ANALOGY BRIDGE):** "A predicate is like a quiz question with a blank: '___ is even.' The question has no answer until you fill in the blank. Fill in '6' → answer is TRUE. Fill in '7' → answer is FALSE. The blank is the free variable; filling it in is instantiation."

Formal: A predicate P with free variable x over domain D is a function P : D → {T, F}. Notation: P(x) denotes the predicate; P(a) denotes the proposition obtained by substituting a for x.

**P49:** Prompt: "Let P(n) : 'n is prime' over D = ℕ. (a) Is P(n) a proposition? (b) Is P(7) a proposition? What is its truth value? (c) Is P(4) a proposition? What is its truth value?"
- **CORRECT**: (a) NO — P(n) is a predicate (free variable n); (b) YES — "7 is prime" is TRUE; (c) YES — "4 is prime" is FALSE → TA-A02.
- **PARTIAL**: Clarify (a) — a predicate is not a proposition; (b)/(c) are propositions → TA-A02.
- **INCORRECT**: → TA-B01.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A02 — Truth Set of a Predicate
**Primitives**: P04 → P11 → P49

**P04 (PATTERN INDUCTION):** The truth set of predicate P over domain D:
- **Definition**: T(P) = {x ∈ D : P(x) is TRUE} — all elements of D that make P(x) a true proposition.
- **Pattern**:
  - P(n) : "n is even", D = {0,1,2,3,4,5} → T(P) = {0, 2, 4}
  - P(n) : "n > 3", D = {0,1,2,3,4,5} → T(P) = {4, 5}
  - P(x) : "x² < 0", D = ℝ → T(P) = ∅ (no real number has negative square)
  - P(x) : "x² ≥ 0", D = ℝ → T(P) = ℝ (all real numbers)

When T(P) = D: predicate is satisfied by ALL domain elements (∀x ∈ D, P(x) is TRUE).
When T(P) = ∅: predicate is satisfied by NO domain element (∀x ∈ D, P(x) is FALSE).

**P11 (REPRESENTATION SHIFT):**
Predicate → truth set → universal/existential proposition:
- P(n) : "n is prime" (predicate) → T(P) = {2,3,5,7,11,…} over ℕ (truth set) → "∃n ∈ ℕ, n is prime" (TRUE; T(P) ≠ ∅)

**P49:** Prompt: "Let P(x) : 'x² = x' over D = ℝ. Find T(P). Is T(P) ∅, ℝ, or something in between?"
- **CORRECT**: x² = x ⟺ x(x−1) = 0 ⟺ x=0 or x=1 → T(P) = {0, 1} ⊂ ℝ (proper nonempty subset) → TA-A03.
- **PARTIAL**: Confirm {0,1}; note neither all nor none → TA-A03.
- **INCORRECT**: → TA-B01 or TA-B03 depending on error.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A03 — Multi-Variable Predicates
**Primitives**: P04 → P06 → P49

**P04 (PATTERN INDUCTION):**
A predicate can have multiple free variables:
- P(x, y) : "x < y" over D = ℤ × ℤ → P(3, 7) is TRUE; P(7, 3) is FALSE; P(5, 5) is FALSE.
- P(x, y) : "x divides y" (x | y) over D = ℕ × ℕ → P(3, 12) is TRUE (12 = 3×4); P(4, 10) is FALSE (10 ÷ 4 = 2.5).
- P(x, y, z) : "x + y = z" → P(2, 3, 5) is TRUE; P(2, 3, 6) is FALSE.

Key: ALL free variables must be instantiated to obtain a proposition. P(x, 7) : "x < 7" still has a free variable (x) — still a predicate, not a proposition.

**P06 (CONTRAST PAIR PROMPT):**
| Expression | Free variables | Proposition? |
|---|---|---|
| P(3, 7) : "3 < 7" | None | ✓ YES (TRUE) |
| P(x, 7) : "x < 7" | x is free | ✗ NO — still a predicate |
| P(x, y) : "x < y" | x and y free | ✗ NO — predicate |
| ∀x ∈ ℝ, P(x, 7) | None (x bound by ∀) | ✓ YES ("∀x, x<7" is FALSE) |

**P49:** Prompt: "Consider P(a, b) : 'a² + b² = 1' over D = ℝ × ℝ. (a) Is P(0, 1) a proposition? Truth value? (b) Is P(a, 0) a proposition?"
- **CORRECT**: (a) YES — "0² + 1² = 1" is TRUE; (b) NO — still has free variable a → TA-A04.
- **PARTIAL**: Confirm (a); clarify (b) still has one free variable → TA-A04.
- **INCORRECT**: → TA-B02.
- **NO_RESPONSE**: → TA-B02.

---

### TA-A04 — Predicates and Quantifiers (Preview)
**Primitives**: P03 → P07 → P49

**P03 (ANALOGY BRIDGE):** "A quantifier is a machine that processes a predicate and produces a proposition. Feed P(x) : 'x is prime' into the ∀ machine over D = ℕ: output is '∀x ∈ ℕ, x is prime' (FALSE). Feed it into the ∃ machine: output is '∃x ∈ ℕ, x is prime' (TRUE). The machines bind the free variable and produce a definite truth value."

Two binding operations:
- **Universal quantification**: ∀x ∈ D, P(x) — proposition that is TRUE iff T(P) = D.
- **Existential quantification**: ∃x ∈ D, P(x) — proposition that is TRUE iff T(P) ≠ ∅.

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1**: P(n) : "n² > 0" over D = ℝ. T(P) = ℝ \ {0} ≠ ℝ → "∀n ∈ ℝ, n²>0" is FALSE (n=0 fails). T(P) ≠ ∅ → "∃n ∈ ℝ, n²>0" is TRUE.
- **Example 2**: P(x,y) : "x + y = 0" over D = ℤ. ∀x ∈ ℤ, ∃y ∈ ℤ, P(x,y) — is this TRUE? Yes: for any x, take y = −x; then x+(−x)=0. ✓

**P49:** Prompt: "Let P(n) : 'n is a perfect square' over D = {1,2,3,4,5}. (a) Find T(P). (b) Is '∀n ∈ D, P(n)' TRUE or FALSE? (c) Is '∃n ∈ D, P(n)' TRUE or FALSE?"
- **CORRECT**: T(P) = {1, 4}. (b) FALSE (T(P)≠D; e.g., 2 is not a perfect square). (c) TRUE (T(P)≠∅; 1 and 4 are perfect squares) → TA-A05.
- **PARTIAL**: Confirm T(P); clarify ∀ needs T(P)=D, ∃ needs T(P)≠∅ → TA-A05.
- **INCORRECT**: → TA-B01 or TA-B03.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: "Let P(x) : 'x is divisible by 3' over D = {1,2,...,10}. List T(P) and determine whether '∀x ∈ D, P(x)' and '∃x ∈ D, P(x)' are TRUE or FALSE."

Q2: "Is P(2, 5) : '2 + 5 = 7' a proposition? Is P(x, 5) : 'x + 5 = 7' a proposition?"

Q3: "Let Q(a, b) : 'a divides b' over ℕ × ℕ. (a) Evaluate Q(4, 12). (b) Evaluate Q(5, 13). (c) Is Q(a, 12) a predicate or proposition?"

Q4: "Convert P(n) : 'n² ≤ 100' into a proposition two ways: (a) by substituting n = 11; (b) by existential quantification over D = ℕ."

Q5: "Explain in one sentence why P(x) : 'x is large' is problematic as a mathematical predicate."

**P55 (SCORE):** Q1: T(P)={3,6,9}; ∀ is FALSE; ∃ is TRUE. Q2: P(2,5) is a proposition (TRUE); P(x,5) is a predicate (x free). Q3: (a) Q(4,12)=TRUE (12=4×3); (b) Q(5,13)=FALSE (13÷5∉ℕ); (c) Q(a,12) is a predicate (a free). Q4: (a) "11²≤100" = "121≤100" = FALSE (proposition); (b) "∃n∈ℕ, n²≤100" = TRUE (n=0,1,...,10 all work). Q5: "large" has no precise mathematical definition — the domain is unspecified and "large" is vague; the predicate has no well-defined truth set.

**P76 (TRANSFER PROBE — Independence, real-world context):**
"In a library database, define the predicate Available(B) : 'Book B is currently available for loan' over domain D = {all books in the library}. (a) Is Available(B) a proposition? (b) Is Available('Crime and Punishment') a proposition? Give a plausible truth value. (c) Define a two-variable predicate Reserved(U, B) : 'User U has reserved Book B.' How many free variables does Reserved(U, B) have? When does it become a proposition?"

Expected: (a) NO — B is a free variable; predicate. (b) YES — proposition (could be TRUE or FALSE depending on library state). (c) Two free variables; becomes a proposition when both U and B are instantiated to specific user and book.

**P55 (SCORE):** Correct on (a) predicate; (b) proposition; (c) two free variables, instantiation required.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, P76 = **6 items**.
Pass criterion: **5/6** (⌈0.80 × 6⌉ = 5; threshold = 0.80).
- **PASS** → P78.
- **FAIL** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q2 wrong or Q4 wrong → TA-B01 (PREDICATE-AS-PROPOSITION); apply MAMR.
- Q3 wrong or P76(c) wrong → TA-B02 (PREDICATE-ONE-VARIABLE) if multi-variable confusion.
- Q5 wrong or P76(a) wrong → TA-B03 (PREDICATE-AS-FORMULA) if formula/truth-value confusion.
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.found.quantifiers.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 PREDICATE-AS-PROPOSITION
**Primitives**: P41 → P06 → P64 → P49

**P41**: "What is the truth value of 'x is a perfect square'? Give a definite answer without substituting a value for x."
Expected: learner cannot (or incorrectly does) — reveals MC-1.

**P06 (CONTRAST PAIR):**
| Expression | Free variable? | What it is | Truth value |
|---|---|---|---|
| "x is a perfect square" | YES (x free) | Predicate | Undefined until x specified |
| "16 is a perfect square" | NO | Proposition | TRUE |
| "3 is a perfect square" | NO | Proposition | FALSE |
| "∀x ∈ {0,...,10}, x is a perfect square" | NO (x bound) | Proposition | FALSE (e.g., 2 is not) |

**P64**: "A predicate is NOT a proposition. It is a FUNCTION: P : D → {T, F}. The function exists and has a well-defined output for every input — but until you supply the input, there is no output. 'x is a perfect square' is the function; '16 is a perfect square' is calling the function with input 16."

**P49**: "How do you convert the predicate P(n) : 'n! > n²' into a TRUE proposition?"
- **CORRECT**: Either substitute a specific n where n! > n² (e.g., n=3: 6>9? No. n=4: 24>16? YES → "4! > 4²" is TRUE), or use ∃n ∈ ℕ, n!>n² (TRUE) → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Guide: substitute n=4; verify 24>16 → TRUE proposition; or ∃n works → return.

---

### TA-B02 — Repair MC-2 PREDICATE-ONE-VARIABLE
**Primitives**: P03 → P07 → P49

**P03**: "Predicates can have any number of free variables. P(x, y, z) : 'x + y = z' has three free variables — you need to specify all three to get a truth value: P(2, 3, 5) = TRUE; P(2, 3, 6) = FALSE. The number of free variables is called the ARITY of the predicate."

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1**: Binary predicate — R(a, b) : "a is an ancestor of b." R(Queen Victoria, Elizabeth II) = TRUE; R(Newton, Euler) = FALSE (not biologically related). Two free variables; both must be specified.
- **Example 2**: Ternary predicate — Between(x, a, b) : "a < x < b." Between(5, 3, 7) = TRUE; Between(8, 3, 7) = FALSE. Three variables; all three must be specified.

**P49**: "Is 'a divides b and b divides c' a predicate? How many free variables? What instantiation makes it TRUE with a=2, b=6?"
- **CORRECT**: Predicate with 3 free variables (a, b, c). With a=2, b=6: need c such that 6|c; e.g., c=12: "2|6 and 6|12" = TRUE → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Count free variables (a, b, c = 3); show c=12 works → return.

---

### TA-B03 — Repair MC-3 PREDICATE-AS-FORMULA
**Primitives**: P06 → P27 → P49

**P27 (MISCONCEPTION NAMING)**: "MC-3 PREDICATE-AS-FORMULA: confusing P(x) = x² + 1 (a formula yielding a NUMBER) with P(x) : 'x² > 0' (a predicate yielding TRUE or FALSE). The key difference: a predicate's output is always a TRUTH VALUE; a formula's output is a NUMBER (or other object)."

**P06 (CONTRAST PAIR):**
| Expression | Output type | Name |
|---|---|---|
| f(x) = x² + 1 | A NUMBER (for each x) | Function (formula) |
| P(x) : "x² + 1 > 0" | A TRUTH VALUE (T or F) | Predicate |
| P(x) : "x² = x" | A TRUTH VALUE | Predicate (truth set: {0,1}) |
| f(x) = x² − x | A NUMBER | Function (formula) |

Test: "Does substituting x give a number or a truth value?" Number → function/formula. Truth value → predicate.

**P49**: "Is 'P(x) : sin(x) = 0' a predicate or a formula? What is T(P) over D = ℝ?"
- **CORRECT**: Predicate (outputs T or F for each x ∈ ℝ). T(P) = {nπ : n ∈ ℤ} (where sin = 0) → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Confirm sin(x)=0 is a truth claim (predicate); contrast with f(x)=sin(x) (formula giving a number) → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (truth set) + Q2 (predicate vs. proposition) | 2/2 |
| Day 3 | Q3 (binary predicate) + P76 (library database) | 2/2 |
| Day 7 | Mixed 3-item: one truth-set computation, one multi-variable, one conversion | 2/3 |
| Day 21 | Q1, Q2, Q4, Q5 (4 items) | 3/4 |
| Day 60 | Full 6-item mastery gate | 5/6 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Proposition | math.found.proposition | Truth values; proposition definition; bivalence principle |
| Variable | math.found.variable | Free/bound variable distinction; domain concept |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Quantifiers | math.found.quantifiers | ∀ and ∃ bind free variables in predicates to produce propositions |

### Cross-Links
- None. P76 uses independent context.

---

## Component 8 — Teaching Notes

1. **Name reinforcement**: "Predicate" and "open sentence" are synonymous. Some courses use "propositional function." Introduce all three names in TA-A01.
2. **Truth set connection**: Truth sets are the bridge from predicates to set theory (learned in math.found.set-theory). A predicate defines a subset of its domain. This connection is worth noting.
3. **Quantifier preview**: TA-A04 previews quantifiers (math.found.quantifiers) without teaching them fully. Keep it at the "binding machine" level. Full truth-table analysis of ∀ and ∃ belongs to the quantifiers blueprint.
4. **Arity matters**: Multi-variable predicates are essential for relation theory (R(a,b) is the predicate form of a binary relation). Plant this seed in TA-A03 without pre-teaching relations.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.found.predicate |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.80) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (3) | ✓ |
| V-8 | REQUIRES listed; blueprints exist | ✓ math.found.proposition ✓, math.found.variable ✓ |
| V-9 | CPA_ENTRY correct (developing=2 → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=3 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P27, A02:P04, A03:P04, A04:P03 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A04 |
| V-13 | GR-3: mastery gate TA terminal | ✓ TA-A05 uses P91 |
| V-14 | GR-4: P41/P64 gates repair in TA-B01 | ✓ P41 detects MC-1; P64 shifts concept |
| V-15 | GR-6: P91 terminal in TA-A05 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence in TA-A05 |
| V-17 | GR-8: cross_links documented | ✓ cross_links = [] documented |
| V-18 | GR-9: P76 independence correct (cross_links=[] → self-contained context) | ✓ P76 uses library database — no KG concept references |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 3; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P03, B03:P06 (Note: P06 is B-category ✓) |
| AIR | All content fully specified; human tutor can execute | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.

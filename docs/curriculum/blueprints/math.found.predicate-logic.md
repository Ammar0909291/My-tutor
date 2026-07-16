# Teaching Blueprint: math.found.predicate-logic
**Blueprint Specification Version:** 1.0
**Status:** PACKAGE_READY
**Last Validated:** 2026-07-12

---

## Component 0 — Metadata

```yaml
concept_id: math.found.predicate-logic
concept_name: Predicate Logic
domain: foundations
difficulty: developing
bloom_level: analyze
mastery_threshold: 0.80
estimated_hours: 8
prerequisites:
  - math.found.logical-connectives
  - math.found.proposition
unlocks:
  - math.found.proof
  - math.found.set-theory
cross_links: []
cpa_entry_stage: C
session_ta_cap: 7
mamr_policy: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO after
pass_criterion: "⌈0.80 × 5⌉ = 4 out of 5 (4 P77 items + 1 P76 item)"
```

---

## Component 1 — Cognitive Map

### Core Insight
Predicate logic extends propositional logic by quantifying over a domain: ∀x P(x) claims P holds for every element, while ∃x P(x) claims P holds for at least one. Quantifier order is critical — swapping ∀ and ∃ changes the meaning, and often the truth value. Negation pushes through a quantifier by flipping ∀↔∃ and negating the predicate.

### Conceptual Hierarchy
```
Level 0 (Concrete): Predicates as sentence templates; domain as a specific set.
Level 1 (Pictorial): Truth table for small finite domains; scope diagram for nested quantifiers.
Level 2 (Abstract): Quantifier syntax (∀x, ∃x); negation laws; nested quantifiers.
Level 3 (Transfer): Analyse ∀x ∃y P(x,y) vs. ∃y ∀x P(x,y); different truth values, different meanings.
```

### Core Definitions
```
PREDICATE: P(x) is a sentence containing a variable x that becomes a proposition
  when x is assigned a value from the domain D.
  Example: P(x) = "x is even" over D = ℤ.
    P(4) is TRUE; P(7) is FALSE; P(x) alone has no truth value.

DOMAIN OF DISCOURSE (D): the set of values x can take.
  Example: D = ℕ, D = ℤ, D = {1,2,...,10}.
  Changing D can change the truth value of ∀x P(x) or ∃x P(x).

UNIVERSAL QUANTIFIER ∀:
  ∀x P(x) is TRUE iff P(d) is TRUE for EVERY d ∈ D.
  ∀x P(x) is FALSE iff P(d) is FALSE for SOME d ∈ D (a counter-example suffices).

EXISTENTIAL QUANTIFIER ∃:
  ∃x P(x) is TRUE iff P(d) is TRUE for AT LEAST ONE d ∈ D.
  ∃x P(x) is FALSE iff P(d) is FALSE for EVERY d ∈ D.

NEGATION LAWS (De Morgan for quantifiers):
  ¬(∀x P(x)) ≡ ∃x ¬P(x)   [Not all → exists one that fails]
  ¬(∃x P(x)) ≡ ∀x ¬P(x)   [None exists → all fail]

NESTED QUANTIFIERS:
  ∀x ∃y P(x,y): For each x, we can FIND a (possibly different) y.
  ∃y ∀x P(x,y): There is ONE y that works for ALL x simultaneously.
  These are NOT equivalent in general.

FREE vs. BOUND VARIABLES:
  In ∀x P(x,y): x is bound (quantified); y is free (unquantified).
  Replacing y with a value gives a proposition.
```

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL]: QUANTIFIER-SCOPE-COLLAPSE
**Belief:** ∀x ∃y P(x,y) and ∃y ∀x P(x,y) mean the same thing — quantifier order doesn't matter.
**Origin:** Students read both as "for all x and for some y, P(x,y)" without registering the dependency. Multiplication is commutative; students assume logical quantifiers are too.
**Trigger:** "Is ∀m ∃n (m < n) the same as ∃n ∀m (m < n) over ℤ?" → student says yes.
**Repair:** Over ℤ: ∀m ∃n (m<n) is TRUE (for any m, take n=m+1). But ∃n ∀m (m<n) is FALSE (no single integer exceeds all integers). Same predicate, reversed quantifiers, opposite truth values.
**Priority:** FOUNDATIONAL — every proof involving "for all x, there exists y" depends on getting this right.

### MC-2: NEGATION-FLIP-FAILURE
**Belief:** ¬(∀x P(x)) ≡ ∀x ¬P(x) — negation passes through the quantifier without flipping ∀↔∃.
**Origin:** Students negate the predicate but forget to flip the quantifier, mirroring how ¬(p∧q) ≡ ¬p∧¬q is incorrectly applied.
**Trigger:** "Negate: ∀x (x > 0)" → student writes "∀x (x ≤ 0)" instead of "∃x (x ≤ 0)."
**Repair:** The correct law is ¬(∀x P(x)) ≡ ∃x ¬P(x). Mnemonic: to disprove a "for all" claim, you need only ONE counter-example (there EXISTS one where it fails).

### MC-3: DOMAIN-UNIVERSAL
**Belief:** The domain is always ℝ (or "all numbers" or "everything") unless explicitly restricted; unstated domains default to ℝ.
**Origin:** Most school examples use ℝ or ℤ; students habituate to omitting domain specification.
**Trigger:** "∀x (x² ≥ 0)" — student says TRUE without checking; over ℂ it's FALSE (i² = −1 < 0).
**Repair:** Domain must always be stated. The same statement can be TRUE over D₁ and FALSE over D₂.

---

## Component 3 — Scaffolding Protocol

### Entry Diagnostic (P41 gate)
```
P41 — MISCONCEPTION DETECTOR
Prompt: "Consider P(x) = 'x² > x' and domain D = {−2, −1, 0, 1, 2}.
(a) Evaluate P(x) for each element of D.
(b) Is ∀x P(x) true or false?
(c) Is ∃x P(x) true or false?"

CORRECT ((a): P(−2)=4>−2 ✓, P(−1)=1>−1 ✓, P(0)=0>0 ✗, P(1)=1>1 ✗, P(2)=4>2 ✓;
          (b) FALSE (P(0) and P(1) fail); (c) TRUE (P(2) holds)):
→ No MC-1/MC-2 detected for this level → proceed to TA-A01.

INCORRECT (part (b) TRUE — misses the counter-examples):
→ MC-1 potential. Ask follow-up: "Does P(0) hold? P(0) says 0² > 0, i.e., 0 > 0. True or false?"
→ If student still says TRUE → MC-1/MC-3 active → activate Protocol B.

INCORRECT (part (c) FALSE — misses all three TRUE cases):
→ Ask: "Does P(2) hold? 4 > 2. True or false?"
→ Guide to understanding ∃ needs only one witness; activate B-2 if negation confusion surfaces.
```

### Prerequisite Bridge
Student completed math.found.proposition (truth values, logical structure) and math.found.logical-connectives (∧, ∨, ¬, →, ↔). Predicate logic extends this by adding a variable x and quantifiers — ∀ generalises "and for every element" and ∃ generalises "or for some element."

### MAMR Enforcement
MC-1 is FOUNDATIONAL. If the student conflates quantifier order, correct this before domain specification or negation. MC-2 and MC-3 addressed FIFO once MC-1 cleared.

### CPA Progression: C → P → A
- **Concrete (C):** Small finite domain (e.g., {1,2,3,4,5}); evaluate predicate at each element; determine truth values of ∀ and ∃ by exhaustion.
- **Pictorial (P):** Scope diagram for nested quantifiers; dependency arrows (x selected first, y may depend on x).
- **Abstract (A):** Infinite domains (ℤ, ℝ); nested quantifiers; formal negation; free/bound variable identification.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01: Concrete Foundation — Predicates and Quantifiers on Finite Domains

**Opening (GR-1: B-category primitive)**
```
P03 — ANALOGY BRIDGE
Source domain: Fitness tests on a small team
Target domain: Predicate quantification over a domain

"A coach has 5 athletes: {Alice, Bob, Cara, Dan, Eve}.
Predicate L(x) = 'x can lift 100 kg.'
  L(Alice)=TRUE, L(Bob)=TRUE, L(Cara)=FALSE, L(Dan)=FALSE, L(Eve)=TRUE.

∀x L(x): 'Every athlete can lift 100 kg.' — FALSE (Cara and Dan can't).
∃x L(x): 'Some athlete can lift 100 kg.' — TRUE (Alice can).

One counter-example disproves ∀. One witness proves ∃."
```

**Concrete Predicate Evaluation**
```
P06 — CONTRAST PAIR
Domain D = {1, 2, 3, 4, 5, 6}.   Predicate: Q(x) = 'x is divisible by 2.'

Left: Evaluate ∀x Q(x)            Right: Evaluate ∃x Q(x)
  Q(1) = FALSE  ← counter-example    Q(1) = FALSE
  → ∀x Q(x) is FALSE immediately.    Q(2) = TRUE  ← witness!
                                      → ∃x Q(x) is TRUE immediately.

Key asymmetry:
  ∀: ONE false instance → statement is false. Must check ALL for true.
  ∃: ONE true instance → statement is true. Must check ALL for false.
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Domain D = {−3, −2, −1, 0, 1, 2, 3}.  Predicate: R(x) = 'x² < 4'.
(a) Determine the truth value of R(x) for each element of D.
(b) Is ∀x R(x) true? Give a counter-example if false.
(c) Is ∃x R(x) true? Give a witness if true."

CORRECT (R(−3)=F,R(−2)=F,R(−1)=T,R(0)=T,R(1)=T,R(2)=F,R(3)=F;
          (b) FALSE — counter-example: x=2, 4<4 is FALSE;
          (c) TRUE — witness: x=1, 1<4 is TRUE):
→ Affirm: "Exact. ∀ fails because x=2 gives 4 < 4 which is false.
  ∃ succeeds because x=1 gives 1 < 4 which is true. Both checks used the same predicate."
→ Advance to TA-A02.

PARTIAL (correct truth values but counter-example/witness not identified):
→ "For (b): name the specific x that makes R(x) false. For (c): name the x that makes R(x) true."
→ Re-attempt; advance.

INCORRECT (∀x R(x) TRUE — misses negative elements or x=2/x=−2):
→ MC-3 potential: "Check x=−3. R(−3): is (−3)²=9 less than 4? 9 < 4? No.
  So x=−3 is a counter-example. ∀x R(x) is FALSE."
→ Re-examine; activate B-3 if student assumed domain is something else.

NO_RESPONSE:
→ "Start by computing x² for x=−3. Is 9 < 4? Now compute for x=0. Is 0 < 4?"
→ Build the table row by row; advance.
```

---

### TA-A02: Negation Laws and Quantifier Flipping

**Opening (GR-1: B-category primitive)**
```
P11 — REPRESENTATION SHIFT
Shift: English argument → symbolic negation law → formal verification

Step 1 (English reasoning):
  "Suppose someone claims: ∀x (x is a mammal that can fly).
   How do you disprove it? Find ONE mammal that cannot fly (e.g., a dog).
   Your counter-example is: ∃x (x is a mammal that CANNOT fly)."
  
  Negation of a ∀ claim = ∃ of the negated predicate.
  ¬(∀x P(x)) ≡ ∃x ¬P(x).

Step 2 (Symbolic law):
  ¬(∀x P(x)) ≡ ∃x ¬P(x)       [not all → exists one that fails]
  ¬(∃x P(x)) ≡ ∀x ¬P(x)       [none exists → all fail]

Step 3 (Formal verification on finite domain D = {1,2,3}):
  P(x) = 'x > 0'. ∀x P(x) is TRUE (1>0, 2>0, 3>0).
  ¬(∀x P(x)) is FALSE.
  ∃x ¬P(x) = ∃x (x ≤ 0) over {1,2,3} is FALSE.   ✓ equivalent.
  
  Now P(x) = 'x is even'. ∀x P(x) is FALSE (1 is odd).
  ¬(∀x P(x)) is TRUE.
  ∃x ¬P(x) = ∃x (x is odd) over {1,2,3}: x=1 is a witness → TRUE.   ✓ equivalent.
```

**MC-2 Direct Address**
```
P27 — MISCONCEPTION NAMING
"NEGATION-FLIP-FAILURE: writing ¬(∀x P(x)) ≡ ∀x ¬P(x).
This is WRONG. The correct law is ¬(∀x P(x)) ≡ ∃x ¬P(x).

Memory device: to DISPROVE 'for all,' find ONE counter-example.
A counter-example is an existential witness for the negated predicate.
The quantifier FLIPS: ∀ → ∃.

Similarly: to DISPROVE 'there exists,' show EVERY element fails.
This is the universal statement of the negated predicate.
The quantifier FLIPS: ∃ → ∀."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Write the formal negation of each statement (move ¬ inside, flip quantifier):
(a) ∀x (x² ≥ 0)  over domain ℝ.
(b) ∃x (x + 3 = 10)  over domain ℕ.
Also determine whether the original statement and its negation are TRUE or FALSE over the given domain."

CORRECT ((a) negation: ∃x (x² < 0); original TRUE over ℝ, negation FALSE;
          (b) negation: ∀x (x + 3 ≠ 10); original TRUE (x=7 is witness), negation FALSE):
→ Affirm: "Perfect on both laws. For (a) over ℝ, all squares are non-negative so original is TRUE,
  its negation FALSE. For (b), x=7 ∈ ℕ satisfies 7+3=10, so original TRUE, negation FALSE."
→ Advance to TA-A03.

PARTIAL (flips quantifier correctly but wrong truth value for (a)):
→ "For (a) over ℝ: can a real number squared be negative? Take x=i — wait, i ∉ ℝ.
  For real x: x² = (x)(x). Both factors same sign → product ≥ 0. So x²≥0 always over ℝ.
  Original TRUE."
→ Re-attempt; advance.

INCORRECT (writes ∀x ¬P(x) for negation — flip-failure):
→ MC-2 active. P27 re-read: "The quantifier FLIPS when negation passes through.
  ¬∀ becomes ∃; ¬∃ becomes ∀. Then negate the predicate.
  For (a): ¬(∀x (x²≥0)) → ∃x ¬(x²≥0) → ∃x (x²<0)."
→ Activate B-2 repair; re-attempt.

NO_RESPONSE:
→ "The negation law says ¬(∀x P(x)) ≡ ∃x ¬P(x). Apply this to (a):
  what is P(x)? What is ¬P(x)? Replace ∀ with ∃ and negate the predicate."
→ Guide through step by step; advance.
```

---

### TA-A03: Nested Quantifiers and Scope Analysis

**Opening (GR-1: B-category primitive)**
```
P04 — PATTERN INDUCTION
"Let P(m,n) = 'm < n' over domain ℤ. Compare the two statements:

Statement A: ∀m ∃n (m < n)  [for every m, find some n larger than m]
  m=0: choose n=1. ✓
  m=5: choose n=6. ✓
  m=−100: choose n=−99. ✓
  For any m, n=m+1 works. STATEMENT A IS TRUE.

Statement B: ∃n ∀m (m < n)  [find ONE n that is larger than ALL m]
  We need a single integer n larger than every integer.
  n=1000? No — 1001 is an integer larger than 1000, not smaller.
  No such n exists. STATEMENT B IS FALSE.

Pattern: A is TRUE, B is FALSE — same predicate, reversed quantifier order.
QUANTIFIER ORDER IS NOT COMMUTATIVE."
```

**Pictorial Layer: Scope Diagram**
```
P11 — REPRESENTATION SHIFT (symbolic → scope dependency diagram)
"For ∀m ∃n P(m,n):

  SCOPE DIAGRAM:
  ∀m: pick any m ──────────────────────────────────┐
        ∃n: find n (n may depend on m) ────────────┤
              P(m,n): must hold                     │
                                                   depends

  n is chosen AFTER m is fixed → n CAN depend on m.
  Different m's may need different n's. This is WEAKER.

For ∃n ∀m P(m,n):

  SCOPE DIAGRAM:
  ∃n: commit to ONE fixed n ──────────────────────┐
        ∀m: for EVERY m ──────────────────────────┤
              P(m,n): must hold                    │
                                                   fixed

  n is chosen BEFORE m → n CANNOT depend on m.
  The SAME n must work for all m's. This is STRONGER."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Domain D = {1, 2, 3, 4} for both m and n.
  P(m,n) = 'n ≥ 2m'.
  (a) Analyse ∀m ∃n P(m,n). For each m, find an n ∈ D with n ≥ 2m (or show none exists).
      Is ∀m ∃n P(m,n) TRUE or FALSE?
  (b) Analyse ∃n ∀m P(m,n). Find an n ∈ D such that n ≥ 2m for ALL m ∈ D
      (or show none exists). Is ∃n ∀m P(m,n) TRUE or FALSE?"

CORRECT ((a): m=1→n=2(✓); m=2→n=4(✓); m=3: need n≥6, max n=4, IMPOSSIBLE → FALSE;
          (b): would need n≥2·3=6, impossible in D → FALSE):
→ Affirm: "Correct. For (a): m=3 needs n≥6, but max n=4 — no witness exists.
  So ∀m ∃n P(m,n) is FALSE.
  For (b): even harder — one n must satisfy n≥2m for ALL m, including m=3.
  No n in {1,2,3,4} satisfies n≥6. Also FALSE. Both false here —
  the interesting case is when they DIFFER (as in the ℤ example in TA-A03 opening)."
→ Advance to TA-A04.

PARTIAL (correct on (a) but claims (b) TRUE with n=4):
→ "For (b), n=4 fixed: check ALL m. Does 4 ≥ 2·3 = 6? No. n=4 fails for m=3.
  'Exists n for all m' requires the SAME n to satisfy ALL m simultaneously."
→ Re-examine; advance.

INCORRECT (claims (a) and (b) have the same truth value because 'order doesn't matter'):
→ MC-1 active. P64 CONCEPTUAL SHIFT: "Let's try a different domain — ℤ.
  ∀m ∃n (m<n): take any m; n=m+1 works. TRUE.
  ∃n ∀m (m<n): need one integer n larger than all integers. FALSE.
  Same predicate, swapped order, DIFFERENT truth values. Order is critical."
→ Activate B-1 repair; re-attempt.

NO_RESPONSE:
→ "For (a): start with m=1. Find any n in {1,2,3,4} where n ≥ 2×1=2.
  Is n=2 available? Yes. Now try m=2. Find n ≥ 4. Is n=4 available?"
→ Step through each m; advance.
```

---

### TA-A04: Mastery Gate (P91 Terminal)

```
P77 — MULTI-PROBLEM SET (4 problems)

Problem 1:
"Domain: D = {n ∈ ℕ : 1 ≤ n ≤ 10}. Predicate: S(n) = 'n is a perfect square.'
(a) List all n ∈ D for which S(n) is TRUE.
(b) Determine the truth value of ∀n S(n) and ∃n S(n).
(c) Write the formal negation of ∀n S(n) and state its truth value."

Problem 2:
"Write the formal negation of each statement (flip quantifier, negate predicate):
(a) ∃x (x² = 2)  over ℚ.
(b) ∀x ∀y (x + y = y + x)  over ℝ."

Problem 3:
"Domain D = ℤ × ℤ (pairs of integers). Predicate P(a,b) = 'a + b = 0'.
(a) Determine the truth value of ∀a ∃b P(a,b).
(b) Determine the truth value of ∃b ∀a P(a,b).
(c) Explain in one sentence why (a) and (b) differ."

Problem 4:
"In the statement ∀x ∃y (y > x²), identify:
(a) The bound variables.
(b) Any free variables.
(c) Whether this statement is TRUE or FALSE over domain ℝ.
(d) Write its formal negation."
```

```
P55 — SCORE (after P77)
Award 1 point per problem.
Running total before P76: __/4.
```

```
P76 — TRANSFER PROBE (P76 independence: cross_links = [])
"Let D = ℕ (positive integers 1, 2, 3, …).
Define P(m, n) = 'm divides n' (meaning n = km for some k ∈ ℕ).

(a) State ∀m ∃n P(m,n) in plain English. Is it TRUE or FALSE over ℕ?
    For each m, exhibit a witness n.

(b) State ∃n ∀m P(m,n) in plain English. Is it TRUE or FALSE over ℕ?
    Explain why no such n can exist.

(c) Write the formal negation of statement (b). Simplify fully (no ¬ on a quantifier).

(d) In one sentence, explain what the difference between (a) and (b) reveals
    about why quantifier order matters in predicate logic."

[Expected:
(a) 'For every positive integer m, there exists a positive integer n that m divides.'
    TRUE: for any m, take n = m (m divides m, since m = 1·m). Witness: n = m.
(b) 'There exists a positive integer n that is divisible by every positive integer.'
    FALSE: such an n would satisfy 1|n AND 2|n AND 3|n AND … — no finite positive
    integer is divisible by all positive integers (e.g., n+1 doesn't divide n for n≥1; or
    directly: if n is divisible by every m, then n ≥ m for all m, so n ≥ n+1, contradiction).
(c) ¬(∃n ∀m P(m,n)) ≡ ∀n ∃m ¬P(m,n) = ∀n ∃m (m does not divide n).
    In English: 'For every positive integer n, there is some positive integer m that does not divide n.'
(d) In (a), each m chooses its own n; in (b), a single n must work for every m —
    this dependency is what makes (a) weaker than (b) and explains why swapping
    quantifiers changes truth values.]
```

```
P55 — SCORE (after P76)
Award 1 point for P76.
Running total: __/5.
```

```
P75 — MASTERY ASSESSMENT
Pass criterion: 4 out of 5 (⌈0.80 × 5⌉ = 4)
```

```
P55 — SCORE (final)
Record pass/fail status.
```

```
P74 — ROUTING DECISION
Score ≥ 4/5 → MASTERY ACHIEVED → P78 COMPLETION
Score < 4/5 → NEEDS REVIEW → identify lowest-scoring item; activate Protocol B for its misconception
```

```
P55 — SCORE (routing recorded)
```

```
P78 — COMPLETION
"Predicate logic checkpoint complete. You have established:
  • Predicates P(x): sentences with a variable that become propositions when x is assigned a value.
  • Domain D: the set of values x can take; always state the domain.
  • ∀x P(x): TRUE iff P(d) holds for every d ∈ D; one counter-example makes it FALSE.
  • ∃x P(x): TRUE iff P(d) holds for some d ∈ D; one witness makes it TRUE.
  • Negation laws: ¬(∀x P(x)) ≡ ∃x ¬P(x); ¬(∃x P(x)) ≡ ∀x ¬P(x). Quantifier flips.
  • Nested quantifiers: ∀x ∃y ≠ ∃y ∀x in general — order determines dependency structure.
Next concepts: math.found.proof (quantifiers structure every mathematical proof),
math.found.set-theory (∀/∃ over sets formalise membership and subset relations)."
```

---

## Component 5 — Protocol B (Misconception Repair Chains)

### Repair Chain B-1: QUANTIFIER-SCOPE-COLLAPSE (MC-1 FOUNDATIONAL)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: ∀x ∃y P(x,y) and ∃y ∀x P(x,y) say the same thing.
 AFTER: They differ in DEPENDENCY. In ∀x ∃y, y can depend on x.
   In ∃y ∀x, y is fixed before x is chosen.

Dependency picture:
  ∀x ∃y P(x,y): Pick any x → THEN search for y (y may vary with x).
  ∃y ∀x P(x,y): Fix y first → THEN verify P holds for ALL x.

Concrete counter-example (ℤ, P(m,n) = 'm < n'):
  ∀m ∃n (m<n): TRUE — for any m, pick n=m+1.
  ∃n ∀m (m<n): FALSE — no single integer beats all integers.
  Conclusion: swapping quantifiers changed TRUE to FALSE."

Repair exercise:
Over D = {1,2,3}, P(a,b) = 'a+b > 3'.
  ∀a ∃b P(a,b): a=1: b=3 ✓. a=2: b=2 ✓. a=3: b=1 ✓. TRUE.
  ∃b ∀a P(a,b): need fixed b with 1+b>3 AND 2+b>3 AND 3+b>3.
    b must satisfy b>2 AND b>1 AND b>0. So b>2. Only b=3.
    Check: 1+3=4>3 ✓, 2+3=5>3 ✓, 3+3=6>3 ✓. TRUE.
  (This example BOTH are true, showing independence isn't guaranteed either way.)
  Return to the ℤ example for a pair that differs.

Exit gate: "Give one example where ∀x ∃y P(x,y) is TRUE but ∃y ∀x P(x,y) is FALSE."
Expected: ∀m ∃n (m<n) over ℤ (TRUE) vs. ∃n ∀m (m<n) over ℤ (FALSE).
→ Correct: return to TA-A03.
→ Incorrect: revisit the scope diagrams.
```

### Repair Chain B-2: NEGATION-FLIP-FAILURE (MC-2)

```
P41 — MISCONCEPTION DETECTOR
Diagnostic: "Negate: ∀x (x is a prime number) over D = {2,3,4,5}."
If student writes "∀x (x is NOT a prime number)": MC-2 confirmed.

P27 — MISCONCEPTION NAMING
"NEGATION-FLIP-FAILURE: ¬(∀x P(x)) ≡ ∀x ¬P(x) is WRONG.
The CORRECT law: ¬(∀x P(x)) ≡ ∃x ¬P(x).
Mnemonic: to disprove 'ALL x satisfy P,' show ONE x that DOESN'T satisfy P.
ONE counter-example = one existential statement."

P03 — ANALOGY BRIDGE
"Prosecutor's claim: 'All suspects were at the scene.'
Defense's negation: 'Not ALL were at the scene' = 'AT LEAST ONE suspect was NOT.'
The defense does NOT say 'NONE were at the scene' — that's ¬∃, not ¬∀."

Repair exercise:
Negate ∃x (x² < 0) over ℝ.
  ¬(∃x (x²<0)) ≡ ∀x ¬(x²<0) ≡ ∀x (x² ≥ 0). (TRUE over ℝ.)
Negate ∀x (x > 0) over ℤ.
  ¬(∀x (x>0)) ≡ ∃x ¬(x>0) ≡ ∃x (x ≤ 0). (TRUE — x=−1 is a witness.)

Exit gate: "What are the two negation laws? State them symbolically."
Expected: ¬(∀x P(x)) ≡ ∃x ¬P(x) AND ¬(∃x P(x)) ≡ ∀x ¬P(x).
→ Correct: return to TA-A02.
```

### Repair Chain B-3: DOMAIN-UNIVERSAL (MC-3)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: The domain is always ℝ (or 'all numbers') by default.
 AFTER: The domain must always be specified; truth values can differ by domain.

Counter-example:
  ∀x (x² ≥ 0):
    Over ℝ: TRUE (squares of real numbers are non-negative).
    Over ℂ: FALSE — take x=i; i²=−1 < 0.
  
  ∀x (x + 1 > x):
    Over ℝ: TRUE.
    Over ℤ/2ℤ = {[0],[1]}: [0]+[1]=[1] and [1]+[1]=[0].
    In [1]: [1]+[1]=[0] ≰ [1]? Depends on ordering definition.

Lesson: ALWAYS state the domain. Same predicate, different domain → possibly different truth value."

Exit gate: "Give an example of a predicate P(x) and two domains D₁, D₂ such that
∀x P(x) is TRUE over D₁ but FALSE over D₂."
Expected: e.g. P(x) = 'x > 0'; D₁ = ℕ (TRUE), D₂ = ℤ (FALSE, x=−1 is counter-example).
→ Correct: return to TA-A01.
```

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89 — SPACED REPETITION
Review schedule for math.found.predicate-logic:

Interval 1 (1 day after mastery):
  Recall prompt: "State the two negation laws for quantifiers.
  Negate: ∃x (x is a factor of 7) over D = {2,3,4,5,6}."
  Target: ¬∃ ≡ ∀¬; negation: ∀x (x is NOT a factor of 7); TRUE over D.

Interval 2 (3 days):
  Application: "Over D = ℝ, compare:
  (a) ∀x ∃y (x·y = 1)  and  (b) ∃y ∀x (x·y = 1).
  Determine truth values and explain the dependency structure."
  Target: (a) FALSE — x=0 has no multiplicative inverse;
          (b) FALSE — y=1 fails for x=2 (2·1≠1).

Interval 3 (7 days):
  Transfer: "Analyse ∀ε>0 ∃δ>0 (|x−a|<δ → |f(x)−L|<ε).
  (a) What does this say about ε and δ?
  (b) What does swapping the quantifiers change?"
  Target: (a) ε fixed first; then δ found (δ may depend on ε);
          (b) ∃δ ∀ε: one δ must work for ALL ε simultaneously — much stronger,
              corresponds to uniform continuity, not pointwise.

Interval 4 (21 days):
  Integration: "When writing a proof that ∀x ∈ D, P(x), what is the
  standard proof strategy? How does predicate logic determine the proof structure?"
  Target: Let x ∈ D be arbitrary; prove P(x). Generality of x represents ∀.
```

---

## Component 7 — Cross-Blueprint Dependencies

### GR-8: Cross-link documentation
```
Incoming prerequisites:
  math.found.proposition → Truth values (TRUE/FALSE); propositions as atomic statements.
    Predicates generalise propositions by introducing a free variable.
  math.found.logical-connectives → ∧, ∨, ¬, →, ↔. The negation law
    ¬(∀x P(x)) ≡ ∃x ¬P(x) is the quantifier analogue of De Morgan's laws.

Outgoing unlocks:
  math.found.proof → Every mathematical proof involves quantified statements;
    "∀x P(x)" proofs use the arbitrary-element strategy; "∃x P(x)" proofs require
    constructing a witness.
  math.found.set-theory → Set membership (x ∈ A) and subset (A ⊆ B, meaning
    ∀x (x ∈ A → x ∈ B)) are predicate logic statements.

Cross-links: none.
```

### GR-9: P76 Mode Determination
```
cross_links = []
P76 MODE: INDEPENDENCE
P76 probe: divisibility predicate P(m,n) = 'm divides n' over ℕ;
  ∀m ∃n P(m,n) vs. ∃n ∀m P(m,n); negation of the existential form.
  Self-contained; no cross-concept dependency.
```

---

## Component 8 — Teaching Notes

### Pedagogical Rationale
Predicate logic (bloom=analyze) requires students to break down quantified statements — identify the quantifier, the domain, the predicate, and the dependency structure — then evaluate truth values by checking elements or constructing counter-examples/witnesses. The bloom level means P49 branches and P77 problems require analysis, not just procedural symbol manipulation.

### Common Session Failure Modes
1. **MC-1 is the critical gate:** Students who conflate ∀x ∃y and ∃y ∀x will write flawed proofs indefinitely. The scope-dependency diagram (TA-A03, P11) is the most effective repair tool — visualising "y is chosen AFTER x" vs. "y is fixed BEFORE x" separates the two cases.
2. **MC-2 persists even when corrected:** Students revert to ∀x ¬P(x) under time pressure. The prosecutor/defense analogy in B-2 provides a durable mnemonic.
3. **Finite domain exercises are essential:** Abstract laws (∀m ∃n over ℤ) are easier to understand after smaller concrete checks (domain {1,2,3}). Always begin with finite domains in TA-A01 before moving to infinite ones.

### Connections to Broader Curriculum
- **Downstream — math.found.proof:** Universal statements are proved by "let x ∈ D be arbitrary"; existential statements by "let x = [specific witness]." The logic is directly predicate logic.
- **Downstream — math.found.set-theory:** Every set operation (∩, ∪, ⊆, complement) is a predicate-logic statement about membership. Set theory IS applied predicate logic.
- **Cross-domain — calculus (later):** The ε-δ definition of limits (∀ε>0 ∃δ>0 …) is a nested quantifier statement. Students who master predicate logic here will find the limit definition much more legible.

### Language Precision
- Always say "for all x IN D" and "there exists x IN D" — domain membership is essential.
- "Negate" means flip the quantifier AND negate the predicate; do not do one without the other.
- "Bound variable" vs "free variable": in ∀x P(x,y), x is bound; y is free — the statement is still a predicate in y, not a proposition.

---

## Component 10 — Validation Checklist

### Structural Validators
- [x] V-1: Blueprint has all 10 components (0–8, 10).
- [x] V-2: Metadata YAML complete with all required fields.
- [x] V-3: concept_id matches filename `math.found.predicate-logic`.
- [x] V-4: difficulty=developing, bloom_level=analyze, mastery_threshold=0.80.
- [x] V-5: estimated_hours=8, session_ta_cap=7.

### Grammar Rule Validators
- [x] V-6 (GR-1): Every non-repair TA opens with B-category primitive (TA-A01: P03+P06; TA-A02: P11; TA-A03: P04; TA-A04 is mastery gate).
- [x] V-7 (GR-2): Every non-gate TA contains P49 with all 4 branches. TA-A01, TA-A02, TA-A03 each have P49.
- [x] V-8 (GR-3): Mastery gate TA-A04 is terminal (ends with P78).
- [x] V-9 (GR-4): P41 entry diagnostic gates → Protocol B when MC-1 active.
- [x] V-10 (GR-6): P91 compound (P77→P55→P76→P55→P75→P55→P74→P55→P78) complete in TA-A04.
- [x] V-11 (GR-7): P76 present in mastery gate TA-A04.
- [x] V-12 (GR-8): Cross-links = []; documented in Component 7 as empty.
- [x] V-13 (GR-9): P76 mode is INDEPENDENCE (cross_links=[]). P76 probe: divisibility predicate on ℕ; ∀m∃n vs. ∃n∀m; negation. Self-contained.
- [x] V-14 (GR-10): MAMR stated in Component 0 and enforced in Component 3.

### Content Validators
- [x] V-15: Pass criterion = ⌈0.80 × 5⌉ = 4/5. P77 has 4 problems; P76 contributes 1; total n=5. ✓
- [x] V-16: CPA_ENTRY_STAGE = C. developing always starts Concrete. ✓
- [x] V-17: MC-1 is FOUNDATIONAL and cleared first per MAMR. ✓
- [x] V-18: P49 INCORRECT branch activates P27 or P64 with repair pathway in TA-A01, TA-A02, TA-A03. ✓
- [x] V-19: P76 probe independent of P77 problems (P77: perfect squares/negation/nested on D={1..10} and specific integer pairs; P76: divisibility on ℕ — distinct predicate/domain). ✓
- [x] V-20: Spaced repetition intervals are 1, 3, 7, 21 days with distinct prompts. ✓

### Automated Invariant Check (AIR)
- [x] AIR-1: No implementation code present.
- [x] AIR-2: No references to internal system variables.
- [x] AIR-3: cross_links = [] — no concept IDs to validate.
- [x] AIR-4: P91 sequence order is P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
- [x] AIR-5: Protocol B repair chains each have explicit exit gate with return instruction. ✓

**VALIDATION RESULT: PASS — PACKAGE_READY**

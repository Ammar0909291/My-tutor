# Blueprint: math.disc.predicate-logic-disc

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.predicate-logic-disc |
| name | Predicate Logic in Discrete Mathematics |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.found.predicate-logic, math.disc.propositional-logic |
| Cross-links | math.found.predicate-logic |
| Unlocks | — |

## Component 1 — Learning Objective
The student translates English mathematical statements involving "for all," "there exists," and "there exists a unique" into first-order logic notation and back; negates quantified statements correctly (¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x)); handles nested quantifiers and identifies when quantifier order matters (∀x∃y R(x,y) vs. ∃y∀x R(x,y)); applies universal and existential instantiation and generalisation as proof steps; constructs proofs of universally quantified statements by choosing an arbitrary representative; refutes a universal claim by exhibiting a counterexample; and distinguishes free and bound variables.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a universe of discourse as a circle of dots (integers); mark some dots green (satisfying P(x)) and some red (not satisfying P(x)); illustrate: "∀x P(x)": ALL dots are green; "∃x P(x)": AT LEAST ONE dot is green; "¬∀x P(x)=∃x ¬P(x)": find ANY red dot; then draw two-variable R(x,y) as a grid of pairs: "∀x∃y R(x,y)": every ROW has at least one checked pair; "∃y∀x R(x,y)": some single COLUMN is entirely checked — annotate: these are DIFFERENT claims, and order matters)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | QUANTIFIER-ORDER-COMMUTES | Student treats ∀x∃y and ∃y∀x as equivalent; writes "∀x∃y R(x,y)" when they mean "∃y∀x R(x,y)" or vice versa; fails to see that the latter requires a SINGLE witness y that works for ALL x, while the former allows y to depend on x | Type 4 — notation-induced (both statements use the same two quantifiers and the same variable names; the difference is in order — which quantifier is outer; students read them left-to-right and see the same "symbols" without recognising that the outer quantifier determines what depends on what; the canonical example: "every student has some professor" (∀s∃p: professor(p,s)) vs. "some professor teaches every student" (∃p∀s: professor(p,s)) — very different claims) |
| MC-2 | NEGATION-FLIPS-PREDICATE-NOT-QUANTIFIER | Student negates "∀x P(x)" as "∀x ¬P(x)" (flips the predicate but not the quantifier); fails to apply the De Morgan analogy — to negate a universally quantified statement, BOTH the quantifier changes to existential AND the predicate is negated: ¬∀x P(x) ≡ ∃x ¬P(x) | Type 1 — overgeneralisation (students correctly negate propositional "not" and apply "double negation" to simple predicates; when they see ¬∀x P(x) they distribute the negation inward without changing the quantifier, treating ∀ as transparent; the quantifier-type swap is not an analogy to anything in propositional logic — it requires the De Morgan law for quantifiers) |
| MC-3 | COUNTEREXAMPLE-REFUTES-EXISTENTIAL | Student gives a counterexample to refute an existential statement "∃x P(x)" rather than a universal; a single counterexample refutes "∀x P(x)" (by providing an x with ¬P(x)), but to refute "∃x P(x)" you must show that NO x satisfies P(x) — a single non-example is insufficient | Type 1 — overgeneralisation ("counterexample" is associated with disproving a claim; students deploy it against any claim without reading the quantifier; one x with P(x) false proves "not all x satisfy P", but one x with P(x) false says nothing about "there exists x with P(x)" when another x might satisfy it) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Quantifiers, negation, and translation:**

**Quantifiers over domain D:**
- Universal: ∀x P(x) — "for every x in D, P(x) holds." Equivalent: conjunction over all elements of D.
- Existential: ∃x P(x) — "there exists at least one x in D such that P(x) holds." Equivalent: disjunction over all elements.
- Unique existence: ∃!x P(x) — "there exists exactly one x such that P(x)." Defined as ∃x(P(x) ∧ ∀y(P(y) → y=x)).

**Negation laws (De Morgan for quantifiers):**
- ¬∀x P(x) ≡ ∃x ¬P(x)
- ¬∃x P(x) ≡ ∀x ¬P(x)

**Translation examples (domain: integers):**
- "Every even number has an even square" → ∀x(even(x) → even(x²))
- "There is a prime greater than 1,000" → ∃x(prime(x) ∧ x>1000)
- "No integer is both even and odd" → ¬∃x(even(x) ∧ odd(x)) ≡ ∀x¬(even(x) ∧ odd(x))
- "Every positive integer has a prime factor" → ∀x(x>1 → ∃p(prime(p) ∧ p|x))

**Nested quantifiers — ORDER MATTERS:**
Let R(x,y): "x<y" over integers.
- ∀x∃y R(x,y): for every integer x, there exists an integer y with x<y. TRUE (take y=x+1).
- ∃y∀x R(x,y): there exists a single integer y greater than every integer. FALSE.

**Proof strategies:**
- To prove ∀x P(x): let x be an arbitrary element; prove P(x) without using any specific property of x. (Universal generalisation — the "let x be arbitrary" setup.)
- To prove ∃x P(x): exhibit a specific x and verify P(x) holds. (Existential instantiation — the "take x=…" setup.)
- To refute ∀x P(x): exhibit a COUNTEREXAMPLE — one specific x with ¬P(x).
- To refute ∃x P(x): prove ∀x ¬P(x) — no element satisfies P.

**P49 checkpoint:**
- CORRECT → "∀x∃y ≠ ∃y∀x (y may depend on x in the first). ¬∀xP(x)=∃x¬P(x). Prove ∀: arbitrary element; prove ∃: exhibit; refute ∀: counterexample; refute ∃: prove negation for all x." → A02
- PARTIAL (MC-1: quantifier order commutes) → "QUANTIFIER ORDER changes the claim fundamentally. Draw the grid model: domain {1,2,3}, R(x,y) means x divides y. ∀x∃y R(x,y): for each row x, some y in that row works. For x=1: y=1✓. For x=2: y=2✓. For x=3: y=3✓. TRUE. ∃y∀x R(x,y): some single column y works for ALL rows. Is there a y divisible by 1, 2, and 3? Yes: y=6 (if 6 is in domain). But if domain is {1,2,3}: y must be divisible by 1,2,3 simultaneously — no such y in {1,2,3}. FALSE. SAME predicate, DIFFERENT order → DIFFERENT truth values." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Negate: ¬(∀x∃y (x<y)). Step 1: ¬∀x → ∃x¬. Step 2: ¬∃y → ∀y¬. Step 3: ¬(x<y) → x≥y. Result: ∃x∀y(x≥y). English: there exists an integer x that is ≥ every integer — i.e., a largest integer. This is false over ℤ, confirming the original is true." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Proof techniques using quantifiers in discrete mathematics:**

**Universal instantiation:** From ∀x P(x), infer P(a) for any specific a. (Allowed in proofs — "since ∀x P(x), in particular P(7) holds.")

**Existential instantiation:** From ∃x P(x), introduce a new constant c and assume P(c). (c must be fresh — not already named in the proof.)

**Universal generalisation:** If P(x) was proved for arbitrary x (using no assumptions about x's specific value), conclude ∀x P(x).

**Using quantifiers in discrete proofs:**

**Example 1 — Proving a divisibility property:**
Claim: ∀n(n is even → n² is even).
Proof: Let n be an arbitrary integer. Assume n is even. Then n=2k for some integer k (existential instantiation). Then n²=(2k)²=4k²=2(2k²). So n² is even (definition). Since n was arbitrary: ∀n(even(n)→even(n²)). ✓

**Example 2 — Refuting a universal claim:**
Claim: ∀x∈ℤ, x²>x.
Counterexample: x=0. 0²=0, which is NOT >0. So the claim is false.

**Example 3 — Proving an existential:**
Claim: ∃x∈ℝ, x²=2.
Proof: Take x=√2. Then x²=(√2)²=2. ✓

**Bounded quantifiers:** ∀x<N P(x) means ∀x(x<N → P(x)). ∃x<N P(x) means ∃x(x<N ∧ P(x)). Their negations: ¬∀x<N P(x) = ∃x<N ¬P(x); ¬∃x<N P(x) = ∀x<N ¬P(x).

**P49 checkpoint:**
- CORRECT → "Universal generalisation: prove P(x) for arbitrary x → conclude ∀x. Existential instantiation: fresh constant c from ∃x P(x). Counterexample refutes ∀, not ∃. Bounded quantifiers: ∀x<N is ∀x(x<N→). Negations push inward, flip quantifier type." → Gate (P91)
- PARTIAL (MC-2: negation flips predicate only) → "Negating a quantified statement requires TWO simultaneous changes: (1) the quantifier type FLIPS (∀↔∃); (2) the predicate is NEGATED. Think of De Morgan: ¬(P∧Q)=¬P∨¬Q flips ∧ to ∨; analogously ¬∀xP(x) flips ∀ to ∃ AND negates P(x). Drill: ¬(∀x∃y(R(x,y)∧x<y)). Outer quantifier ∀→∃: ∃x. Inner ∃→∀: ∀y. Predicate: ¬(R(x,y)∧x<y)=¬R(x,y)∨x≥y. Result: ∃x∀y(¬R(x,y)∨x≥y)." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Prove: ∀m∀n(m and n both odd → m·n is odd). Let m,n be arbitrary odd integers. Then m=2a+1 and n=2b+1 for some integers a,b (existential instantiation from 'odd'). m·n=(2a+1)(2b+1)=4ab+2a+2b+1=2(2ab+a+b)+1. This is odd (integer 2ab+a+b times 2, plus 1). Since m,n were arbitrary: ∀m∀n(odd(m)∧odd(n)→odd(m·n)). ✓" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Grid model for two-variable statements: draw a 3×3 grid with rows indexed by x and columns by y. Fill in a check (✓) at position (x,y) if R(x,y) holds. ∀x∃y R(x,y): EVERY ROW has at least one ✓. ∃y∀x R(x,y): some COLUMN is ALL ✓'s. The second is much harder to satisfy — a single y must work for every x simultaneously, while the first allows y to be chosen fresh for each x."
Step 2 — "Counterexample only refutes ∀: to refute ∃x P(x), you cannot exhibit 'one x where P(x) fails' — that's one data point against many possibilities. You must prove ∀x ¬P(x), i.e., P fails for EVERY x. Conversely, a single example where P(x) holds PROVES ∃x P(x). Keep the equivalence: ∃x P(x) is disjunction — one true disjunct makes it true. ¬∃x P(x) requires ALL disjuncts false."
Step 3 — "Parsing English: 'some x such that P(x) is false' is ambiguous. It could mean 'there exists x with ¬P(x)' (= ∃x¬P(x) = ¬∀xP(x)), or 'the claim ∃x P(x) is false' (= ∀x¬P(x)). Always write the logical form before reasoning — ambiguous English is the source of quantifier errors."

**TB-R02 (MC-2 NEGATION RULE):**
Step 1 — "The quantifier negation laws as De Morgan: ∧ and ∨ extend to all and some. ¬(A∧B)=¬A∨¬B; in the limit ¬∀xP(x)=¬⋀ₓP(x)=⋁ₓ¬P(x)=∃x¬P(x). ¬(A∨B)=¬A∧¬B; ¬∃xP(x)=¬⋁ₓP(x)=⋀ₓ¬P(x)=∀x¬P(x). These are the ONLY two negation rules for quantifiers; no other patterns."
Step 2 — "Practice with successive application: negate ∀x∃y∀z R(x,y,z) step by step. (1) ¬∀x → ∃x¬. (2) ¬∃y → ∀y¬. (3) ¬∀z → ∃z¬. (4) ¬R(x,y,z) stays. Result: ∃x∀y∃z¬R(x,y,z). Pattern: negation pushed inward flips EACH quantifier and ends with ¬ on the atomic predicate."
Step 3 — "Memory aid: think of the quantifiers as switches. ∀ is an ALL switch (must ALL be on); ∃ is an ANY switch (at least one on). Negation flips ALL to ANY and ANY to ALL. The predicate's negation is the final flip at the innermost level. Once the negation has passed all the way through, stop — do NOT continue negating subformulas inside the predicate."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Translate each to predicate logic (domain = integers): (a) "Some integer is divisible by every positive integer"; (b) "For every prime p, there is a prime q>p"; (c) "No integer equals its own square except 0 and 1"; (d) "There exist integers m, n such that m²+n²=5."
2. Negate each statement and simplify to a statement without leading negations: (a) ∀x(P(x)→Q(x)); (b) ∃x∀y(R(x,y)∨S(y)); (c) ∀x∃!y T(x,y).
3. Prove: ∀n∈ℤ, if n² is odd then n is odd. (Use proof by contrapositive: assume n is even, show n² is even. Translate using quantifiers explicitly.)
4. Refute each claim by finding the sharpest counterexample: (a) ∀x∈ℝ, x²≥x; (b) ∀m,n∈ℤ, if m and n are divisible by 3 then m+n is divisible by 9.
5. Let D = {1,2,3,4,5}. For each, determine truth value and justify: (a) ∀x∈D ∃y∈D (x+y=6); (b) ∃x∈D ∀y∈D (x·y=y); (c) ∀x∈D ∀y∈D (x<y → x²<y²).

**P55 — Reflect & Consolidate:** "∀x P(x): all; ∃x P(x): some. ¬∀xP=∃x¬P; ¬∃xP=∀x¬P. Quantifier order matters: ∀x∃y ≠ ∃y∀x. Prove ∀: arbitrary element. Prove ∃: exhibit. Refute ∀: counterexample. Refute ∃: prove ∀¬. Nested quantifiers negate inward one step at a time, flipping each quantifier type."

**P76 — Transfer Probe (Cross-link mode: math.found.predicate-logic):**
(a) Completeness of first-order logic: Gödel's Completeness Theorem states that a first-order sentence φ is a logical tautology (true in every model) iff φ has a formal proof. In contrast, Gödel's Incompleteness Theorem says any consistent first-order theory extending Peano Arithmetic has true sentences with no proof. Explain the apparent paradox: how can logic be both complete (valid=provable) and incomplete (some truths have no proofs in specific theories)? (b) Quantifier alternation and complexity: a Π₁ statement (∀x P(x) with P decidable) is falsifiable (one counterexample); a Σ₁ statement (∃x P(x) with P decidable) is verifiable (one witness). A Π₂ statement (∀x∃y R(x,y)) requires both: for every x, find a witness y. The halting problem is a Σ₁ statement (∃ computation that halts). The Riemann Hypothesis is Π₁ (for all s with Re(s)=1/2, ζ(s)≠0) with P computably checkable. Explain why the quantifier complexity of a statement determines its verifiability/falsifiability structure. (c) Decision procedures: the first-order theory of (ℤ,+,<) (Presburger arithmetic, no multiplication) is decidable — every sentence has an algorithmic truth value. Adding multiplication gives Peano Arithmetic, which is undecidable (Gödel). Connect the expressiveness gained by multiplication to the loss of decidability and contrast with propositional logic, which has SAT as NP-complete but decidable.

**P75 — Mastery Assessment:**
"(a) Translate and evaluate (domain = real numbers): 'For every ε>0 there exists δ>0 such that |x−a|<δ implies |f(x)−L|<ε.' This is the definition of lim_{x→a} f(x)=L. Write the negation (definition of 'f has no limit L at a') and give its English meaning. (b) Prove using universal generalisation: ∀n∈ℕ, n²+n is even. (c) Determine truth and falsity and give evidence: (i) ∀x∈ℝ ∃y∈ℝ (xy=1); (ii) ∃y∈ℝ ∀x∈ℝ (xy=1). (d) Negate completely, pushing all ¬ inward: ¬(∀x>0)(∃y)(∀z<y)(P(x,z) → ¬Q(x,z))."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW nested-quantifier ordering and the full negation-pushdown procedure
- Score ≤ 3/5 → PREREQUISITE GAP in math.found.predicate-logic or math.disc.propositional-logic; reassign

**P78 — Completion:** Predicate Logic in Discrete Mathematics certified. Student translates multi-quantifier English statements into first-order logic; correctly negates by applying De Morgan laws for quantifiers; identifies when quantifier order changes meaning; constructs proofs using universal generalisation and existential instantiation; and refutes universals with counterexamples and existentials with exhaustive negations.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.found.predicate-logic])
Target: Completeness vs. Incompleteness; quantifier alternation and computational complexity; decidability of first-order theories
Skill tested: Connect the syntactic/semantic distinction in predicate logic to computability theory, arithmetic hierarchies, and the decidability frontier

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

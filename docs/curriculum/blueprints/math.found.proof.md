# Teaching Blueprint — math.found.proof

## Component 0 — Metadata
concept_id: math.found.proof
concept_name: Mathematical Proof
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: developing
bloom: create
estimated_hours: 20
mastery_threshold: 0.75
CPA_entry_stage: C
requires: [math.found.logic, math.found.rules-of-inference]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A mathematical proof is a finite sequence of logically valid steps that establishes the truth of a mathematical statement with certainty, starting from axioms or previously proven results. Proofs are not explanations or demonstrations — they are rigorous logical arguments where every step follows from the previous by a valid inference rule.

**Conceptual progression:**
1. What a proof is: a finite, formal, logical chain from known truths to a new conclusion.
2. What a proof is NOT: checking examples, appealing to intuition, or informal explanation.
3. Direct proof: assume P, apply definitions and theorems, derive Q.
4. Proof by contradiction: assume P and ¬Q, derive a logical contradiction (proving Q must be true).
5. Proof by induction: base case + inductive step (deferred — see math.found.theorem for induction details).
6. Structural requirements: each step cites its justification (definition, axiom, hypothesis, or previously proven result).

**CPA arc (entry: C):**
- Concrete: argument chains using familiar facts — number parity, set membership, simple geometry; learner manually checks each step
- Pictorial: proof diagrams showing logical flow; annotated proofs with justifications highlighted; "broken proof" exercises where learner spots missing or invalid steps
- Abstract: formal two-column proofs (statement | justification); paragraph proofs with explicit connectives; symbolic logic notation

**Prior knowledge activated:** propositional logic (P → Q, ¬P, P ∧ Q, P ∨ Q); rules of inference (modus ponens, modus tollens, hypothetical syllogism); definitions of even/odd integers; set membership notation

**Threshold concept:** The difference between a proof and a convincing argument. Many arguments that feel convincing (examples, analogies, diagrams) are not proofs. A proof eliminates ALL doubt by proceeding step-by-step from undeniable foundations.

---

## Component 2 — Misconception Registry

### MC-1: PROOF-BY-EXAMPLE [FOUNDATIONAL]
**Description:** Learner checks a universal statement for several cases and claims "proven."
**Surface form:** "I checked n=1,2,3,4,5 and n²+n is even each time, so it's always even."
**Root cause:** Conflates "consistent with" and "proven"; has not internalised that a universal statement (∀n …) requires an argument that works for ALL n, not merely many.
**Trigger condition:** Any problem asking for a proof of a statement involving "for all" or "always."
**Repair target:** TA-B01.

### MC-2: CIRCULAR-REASONING
**Description:** Learner uses the conclusion as a step in the proof.
**Surface form:** To prove n²+n is even, writes "n²+n is divisible by 2, so n²+n is even" — uses the conclusion to establish itself.
**Root cause:** Does not distinguish between what is GIVEN and what is TO BE SHOWN; may confuse "restating" with "proving."
**Trigger condition:** Any proof where the desired conclusion appears in the proof body before being established.
**Repair target:** TA-B02.

### MC-3: ALGEBRA-WITHOUT-JUSTIFICATION
**Description:** Learner produces a sequence of algebraic manipulations without citing why each step is valid, presenting algebra as a self-sufficient proof.
**Surface form:** Writes a chain of equalities with no explanations, no definitions invoked, no logical connectives.
**Root cause:** Has seen algebra used to "show" things but has not learned to annotate: which step invokes which definition/axiom/theorem.
**Trigger condition:** Any proof requiring algebraic manipulation combined with a definition or theorem.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** "Why is checking n=1,2,3 for a statement about 'all integers n' not a proof?" If learner correctly identifies that it doesn't cover all cases → begin TA-A01. If learner says it is enough → flag MC-1 for TA-B01.

**Scaffolding ladder:**
1. Identify valid vs. invalid proof steps (spot-the-error exercises)
2. Annotate a given proof with justifications for each step
3. Complete a partially-written direct proof by filling in the missing steps
4. Write a complete direct proof from scratch
5. Construct a proof by contradiction for a simple claim

**Pacing gate:** Must score ≥ 4/5 on P91 to earn mastery credit (MAMR = 75%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — What Proof Is (and Is Not)
**Primitive sequence:** P03 → P49

**P03 — ANALOGY BRIDGE:**
> "Imagine a courtroom. The prosecution presents 10 witnesses who each say 'I think the defendant was at the scene.' That's convincing, but it's not proof — a skilled defence lawyer can challenge each witness. A mathematical proof is like an unbreakable chain of testimony from an infallible source: every step is airtight and cites a known fact (axiom, definition, or previously proven theorem). No step can be challenged, because each step follows necessarily from what came before. Once the chain is complete, the conclusion is certain — not likely, not plausible, certain."

Four things that look like proofs but are NOT:
1. Proof by example: checking n=1,2,3,...,100 and finding no counterexample — doesn't cover n=101,102,...
2. Appeal to intuition: "It's obvious that..." or "You can see from the diagram that..." — diagrams can mislead.
3. Informal explanation: "This makes sense because..." — mathematical sense doesn't establish mathematical truth.
4. Circular reasoning: "It's true because it's true" — conclusion appears in the argument.

What a proof IS:
A finite sequence of statements s₁, s₂, …, sₙ where:
- s₁ is an axiom, definition, or given hypothesis
- Each subsequent sᵢ follows from previous statements by a valid rule of inference
- sₙ is the desired conclusion

**P49 — ADAPTIVE CHECKPOINT:**
"Which of the following is a valid proof that 'the sum of two even integers is even'?
(A) 'I tried 4+6=10, 8+2=10, 12+8=20 — all even. Proven.'
(B) 'Let m=2j and n=2k for integers j,k. Then m+n=2j+2k=2(j+k). Since j+k is an integer, m+n is even.'
Explain your choice."

- CORRECT (B): "(A) is proof by example — doesn't cover all cases. (B) is a valid direct proof: it starts with definitions, uses algebra, and concludes using the definition of even." → TA-A02
- PARTIAL (chose B but couldn't explain why A fails): "B is right. A fails because checking a finite number of cases doesn't prove the statement for ALL even integers — there could be a counterexample among the infinitely many cases not checked." → TA-A02
- INCORRECT (chose A): "A is proof by example — it only checks three specific cases. The statement 'for all even integers m, n' requires an argument that works without knowing which specific m, n are chosen. B provides that general argument." → TA-B01
- NO_RESPONSE: "B is valid. It uses the DEFINITION of even (m=2j, n=2k for integers j,k), derives m+n=2(j+k), then applies the definition again. Every step is justified. A only tests examples." → TA-A02

---

### TA-A02 — Direct Proof Structure
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: Proof that if n is even, then n² is even*

Claim: If n is an even integer, then n² is an even integer.

Proof:
Step 1: Assume n is even. [Hypothesis]
Step 2: By definition of even, n = 2k for some integer k. [Definition of even]
Step 3: Compute n²: n² = (2k)² = 4k² = 2(2k²). [Algebra]
Step 4: Since k is an integer, 2k² is an integer. [Closure of ℤ under multiplication]
Step 5: n² = 2·(2k²) is of the form 2·(integer). [From Step 3 and Step 4]
Step 6: By definition of even, n² is even. [Definition of even, applied to Step 5]
∴ If n is even, then n² is even. □

Structure: every step either invokes (hypothesis / definition / axiom / prior result) or applies algebra; every move is justified.

*Worked Example 2: Proof that if m and n are odd, then m+n is even*

Claim: If m and n are odd integers, then m+n is even.

Proof:
Step 1: Assume m and n are odd. [Hypothesis]
Step 2: By definition, m=2j+1 and n=2k+1 for integers j,k. [Definition of odd]
Step 3: m+n = (2j+1)+(2k+1) = 2j+2k+2 = 2(j+k+1). [Algebra]
Step 4: j+k+1 is an integer (integers closed under addition). [Closure]
Step 5: m+n = 2·(integer) → m+n is even. [Definition of even]
∴ If m and n are odd, then m+n is even. □

**P49 — ADAPTIVE CHECKPOINT:**
"Write a direct proof that the product of two odd integers is odd."

- CORRECT (let m=2j+1, n=2k+1; mn=(2j+1)(2k+1)=4jk+2j+2k+1=2(2jk+j+k)+1 which is odd): "Complete and correct. Every step has a justification." → TA-A03
- PARTIAL (correct algebra but missing justification steps, e.g., no citation of definition of odd): "Good algebra. Now annotate: cite the definition of odd at each use; explain why 2jk+j+k is an integer." → TA-A03
- INCORRECT (used specific numbers): "Using m=3, n=5 to get mn=15 is proof by example — it only establishes one case. Let m=2j+1 and n=2k+1 for arbitrary integers j,k and proceed generally." → TA-B01
- NO_RESPONSE: "(2j+1)(2k+1) = 4jk+2j+2k+1 = 2(2jk+j+k)+1. Since 2jk+j+k is an integer, this has the form 2·(integer)+1, which is the definition of odd." → TA-A03

---

### TA-A03 — Proof by Contradiction
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | Direct proof | Proof by contradiction |
|---|---|---|
| Structure | Assume P. Derive Q directly. | Assume P and ¬Q. Derive contradiction. Conclude Q. |
| First step | Assume the hypothesis P | Assume the hypothesis P AND the negation of Q |
| Goal | Reach Q | Reach a statement that is false (contradiction) |
| Why Q is true | Constructed directly | ¬Q led to impossibility, so Q must be true |
| When to use | When a direct path from P to Q exists | When assuming ¬Q gives useful structure to exploit |

Worked example of proof by contradiction:
Claim: √2 is irrational.
Proof: Assume for contradiction that √2 = p/q in lowest terms (gcd(p,q)=1).
Then 2=p²/q², so p²=2q². Thus p² is even → p is even → p=2m.
Then (2m)²=2q² → 4m²=2q² → q²=2m² → q is even.
But p and q are both even, contradicting gcd(p,q)=1. Contradiction. ✗
Therefore √2 is irrational. □

**P49 — ADAPTIVE CHECKPOINT:**
"In a proof by contradiction to show 'there is no largest even integer,' what would you assume at the start?"

- CORRECT ("Assume there IS a largest even integer, call it N"): "Exactly — assume the negation: 'there exists a largest even integer N.' Then show this leads to a contradiction." → TA-A04
- PARTIAL (says "assume N is the largest even number" without framing as negation of conclusion): "You have the right object. Frame it explicitly as assuming the OPPOSITE of what we want to prove: 'Assume for contradiction that a largest even integer N exists.' Then derive N+2 is even and larger — contradiction." → TA-A04
- INCORRECT (says "assume there is no largest even integer" — assumes the conclusion): "That's what we want to PROVE, not what we assume. In proof by contradiction, you assume the NEGATION of the conclusion. The negation of 'there is no largest' is 'there IS a largest.'" → TA-B02
- NO_RESPONSE: "We want to prove: ∄ largest even integer. Its negation: ∃ a largest even integer, call it N. Assume that. Then N+2 > N and N+2 is even (sum of even and 2). Contradiction with N being 'largest.' So our assumption was false. □" → TA-A04

---

### TA-A04 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 75% → PASS requires ⌈0.75 × 5⌉ = 4/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: Identify the error: "I verified n²+n is even for n=1,2,3,4,5. Therefore it is always even." [Answer: proof by example — only checks 5 of infinitely many cases; does not constitute a proof for all integers]

Item 2: Prove directly: if n is even, then n² is even. [Answer: let n=2k; n²=4k²=2(2k²); 2k² is an integer; n² is even. □]

Item 3: True or False — in a proof by contradiction, you begin by assuming the NEGATION of the conclusion. [Answer: TRUE]

Item 4: Complete the following proof step: "Let n be an even integer. By definition of even, n = ___, where ___ is an integer." [Answer: n = 2k, where k is an integer]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — cross_links: []):**
Prove that the sum of two odd numbers is even. Write a complete direct proof with all steps justified.

Model proof:
Step 1: Let a and b be odd integers. [Hypothesis]
Step 2: By definition of odd: a=2j+1 and b=2k+1 for integers j,k. [Definition of odd]
Step 3: a+b = (2j+1)+(2k+1) = 2j+2k+2 = 2(j+k+1). [Algebra]
Step 4: j+k+1 is an integer (integers are closed under addition). [Closure of ℤ]
Step 5: a+b = 2·(j+k+1) has the form 2·(integer). [From Steps 3–4]
Step 6: By definition of even, a+b is even. □ [Definition of even]

Marking rubric: full marks if all 6 logical elements appear (hypothesis, both definitions, algebra, closure citation, conclusion). Partial if 4–5 elements present. Fail if proof-by-example used or conclusion assumed.

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score ≥ 4/5 → PASS → P78 COMPLETION
- Score < 4/5 → FAIL → Route to TA-B01 (proof-by-example / structural errors) or TA-B02 (circular reasoning / missing justification)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Mathematical proof: mastered. You can distinguish valid proofs from proof-by-example and circular reasoning, write complete direct proofs with step-by-step justifications, construct proof-by-contradiction arguments, and annotate each proof step with its logical basis. This is the foundation for all formal mathematics."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Proof-by-Example / Failure to Generalise
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error is PROOF-BY-EXAMPLE — providing specific cases as evidence for a universal claim. For statements of the form 'for all n …', checking any finite number of cases leaves infinitely many unchecked. One counterexample disproves the claim; the absence of a counterexample in your sample does not prove it."

**P41 — MISCONCEPTION DETECTOR:**
> "Consider: 'I claim n²−n+41 is prime for all positive integers n.' Check: n=1: 41 (prime). n=2: 43 (prime). n=3: 47 (prime). … n=40: 1601 (prime). But n=41: 41²−41+41=41²=1681=41×41 (not prime). Forty consecutive confirmations, then a counterexample. Proof by example is always vulnerable to this."

**P64 — CONCEPTUAL SHIFT:**
> "To prove something for ALL integers, your argument must work for an arbitrary integer n — one that could be any integer, not one you choose. Introduce n as 'let n be any [odd/even/integer]', apply the definition to get a general algebraic form (like 2k or 2k+1), and derive the conclusion from that general form. The argument works for every n because n was never specified — it represents all of them."

→ TA-A02

---

### TA-B02 — Repair: Circular Reasoning / Algebra-Without-Justification
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two errors: CIRCULAR-REASONING (using the conclusion as a step before it is proven) and ALGEBRA-WITHOUT-JUSTIFICATION (presenting algebraic steps without citing which definition, axiom, or theorem makes each step valid). Both produce arguments that look like proofs but contain logical gaps."

**P41 — MISCONCEPTION DETECTOR:**
> "Detect circularity: 'Prove m+n is even. Since m+n is divisible by 2, m+n is even.' The conclusion 'is even' appears in the proof without being established — it just uses different words for the same thing. Detect missing justification: '(2j+1)(2k+1) = 4jk+2j+2k+1.' Why is this algebra valid? What axioms of arithmetic are used? At minimum, cite 'expansion of product (distributive law)' and 'algebra'."

**P64 — CONCEPTUAL SHIFT:**
> "Every proof step must be derivable from something EARLIER in the chain — either a hypothesis, a definition, an axiom, or a previously proven theorem. NEVER use the conclusion as support for itself. For algebra steps, cite at minimum 'algebra' or 'by definition of [term]'. Build the habit: after every line, ask 'what authorises me to write this?'"

→ TA-A02

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.found.proof
  MAMR: 0.75
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Write a direct proof that if n is odd, then n² is odd."
  session_3_probe: "Spot the flaw: 'To prove √2 is irrational, note that √2≈1.414, which cannot be expressed as p/q.'"
  session_7_probe: "Prove by contradiction that there is no largest prime."
  session_14_probe: "Prove that the product of an even and an odd integer is even."
  session_30_probe: "What is the difference between a proof and a convincing informal argument? Why does mathematics require the former?"
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.found.logic — propositional logic; P→Q, negation, conjunction, disjunction [BLUEPRINT EXISTS]
- math.found.rules-of-inference — modus ponens, modus tollens, hypothetical syllogism [BLUEPRINT EXISTS]

**Unlocks:**
- math.found.theorem — theorems are statements established by proof
- math.found.axiom — axioms are the starting points that proofs build on

**Cross-links:** [] — no Tier 1 cross-links.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** P76 independence mode applied (cross_links empty).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (PROOF-BY-EXAMPLE) is nearly universal at this stage. The courtroom analogy (P03) must establish before any technique work that examples, no matter how many, do not constitute a proof. A single counterexample attempt (like the n²−n+41 case in TA-B01) is often more persuasive than any explanation.

**Justification habit:** Require learners to annotate every proof step with a one-word or one-phrase justification from the very first worked example. This habit prevents MC-3 from forming and makes circular reasoning visible.

**Bloom=create note:** This blueprint targets bloom=create because proof-writing requires generating a novel valid argument, not merely applying a template. P07 is used to model the creation process — learners observe expert proof-writing before creating their own. The P76 probe requires creating a complete original proof.

**V-3 check (CPA_ENTRY=C for developing difficulty):** TA-A01 opens with the courtroom analogy (concrete-stage reasoning about certainty and logical chain) and classifies familiar examples (even numbers, specific integers) before introducing formal proof structure — V-3 satisfied.

**GR-10 — MAMR enforcement:** MAMR = 75%. For n=5, PASS threshold = ⌈0.75×5⌉ = 4/5. A learner who scores 3/5 or below does NOT receive mastery credit. Routes to TA-B01 or TA-B02, then retakes the gate.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P03 (B-category primitive for developing/create)
- [x] GR-2: Each non-gate TA (A01, A02, A03) contains P49
- [x] GR-3: TA-A04 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A04; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A04 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links = [] → P76 independence mode applied; probe requires creating an original proof
- [x] GR-10: MAMR = 75% stated; PASS threshold = 4/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.found.proof)
- [x] V-2: difficulty=developing, bloom=create, h=20, thresh=0.75 match KG
- [x] V-3: CPA_ENTRY=C (developing → concrete entry); TA-A01 opens with courtroom analogy and familiar integer examples
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P03 correctly anchors TA-A01 (courtroom analogy for logical certainty)
- [x] V-6: P07 present in TA-A02 (bloom=create benefits from worked proof models)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.75 × 5⌉ = 4/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items cover example-vs-proof recognition, direct proof writing, contradiction structure, definition usage
- [x] V-13: P76 probe requires creating an original complete proof (genuine transfer via bloom=create)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain matches h=20 scope (3 main TAs + gate — within spec for h≥6)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement, V-3 check, and bloom=create note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Courtroom analogy distinguishes proof from convincing argument before technique work; counterexample (n²−n+41) in repair path demonstrates proof-by-example failure ✓
- Robust: 3-TA chain covers proof structure, direct proof, contradiction; P91 gate enforces 75% threshold (4/5) ✓

**STATUS: PACKAGE_READY**

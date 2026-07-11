# Teaching Blueprint: Logical Connectives

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.logical-connectives |
| KG_ID | math.found.logical-connectives |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Logical Connectives |
| ALIASES | propositional connectives, Boolean operators, logical operators |
| DIFFICULTY | foundational |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.85 |
| ESTIMATED_HOURS | 4 |
| REQUIRES | math.found.proposition |
| UNLOCKS | math.found.truth-table, math.found.logical-equivalence, math.disc.boolean-circuits |
| CROSS_LINKS | math.disc.boolean-circuits |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 6 (TA-A01 through TA-A06) |
| MASTERY_GATE_TA | TA-A06 (P91, terminal) |
| PASS_CRITERION | 6/7 (⌈0.85 × 7⌉ = 6; threshold = 0.85) |
| MAMR | MC-1 OR-EXCLUSIVE is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links ≠ []; references math.disc.boolean-circuits) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.proposition**: Learner knows propositions have definite truth values (T/F); can identify propositions. Logical connectives operate on propositions to form compound propositions.

### Target Understanding
1. Five standard connectives: ¬ (negation), ∧ (conjunction), ∨ (disjunction), → (conditional), ↔ (biconditional).
2. Each connective is TRUTH-FUNCTIONAL: the truth value of the compound depends only on the truth values of its component propositions.
3. Negation: ¬P is TRUE iff P is FALSE.
4. Conjunction: P ∧ Q is TRUE iff BOTH P and Q are TRUE.
5. Disjunction: P ∨ Q is FALSE iff BOTH P and Q are FALSE. Mathematical ∨ is INCLUSIVE or.
6. Conditional: P → Q is FALSE iff P is TRUE and Q is FALSE (vacuous truth: FALSE antecedent makes conditional TRUE).
7. Biconditional: P ↔ Q is TRUE iff P and Q have the SAME truth value.
8. Operator precedence: ¬ (highest) > ∧ > ∨ > → > ↔ (lowest).

### Cross-Link Activation
- **math.disc.boolean-circuits**: AND/OR/NOT gates implement ∧/∨/¬. NAND and NOR gates are derived. De Morgan's laws (¬(P∧Q) = ¬P∨¬Q; ¬(P∨Q) = ¬P∧¬Q) apply to both logic and digital circuits.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — OR-EXCLUSIVE
- **Trigger**: "P ∨ Q means P or Q but NOT both" (exclusive or in everyday English vs. inclusive or in mathematics)
- **Root cause**: In everyday English, "or" is often exclusive ("soup or salad?" means one, not both). Mathematical ∨ is inclusive (TRUE when both are true).
- **Error pattern**: Evaluating P ∨ Q as FALSE when both P and Q are TRUE; confusing ∨ with XOR (exclusive or).
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P27; if triggered later, route to TA-B01 before returning.

### MC-2 — IMPLIES-CAUSAL
- **Trigger**: "P → Q means P causes Q" OR "if the antecedent is false, the conditional is meaningless"
- **Root cause**: Everyday "if…then" carries causal meaning; learner imports this into formal logic. Also: vacuous truth (FALSE → Q is TRUE) feels counterintuitive.
- **Error pattern**: Rejecting P → Q as TRUE when P is FALSE (vacuous truth); evaluating P → Q based on causal plausibility rather than truth values.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — BICONDITIONAL-SYMMETRY-CONFUSION
- **Trigger**: "P ↔ Q is the same as P → Q" OR "P ↔ Q means P and Q are always true"
- **Root cause**: Learner conflates biconditional (both must have same truth value) with conditional (only one direction required) or with conjunction (both must be true).
- **Error pattern**: Treating ↔ as → in proofs; thinking P ↔ Q requires both to be TRUE rather than both to have the SAME truth value (even both FALSE).
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with natural language examples ("It is raining AND cold" — requires both; "I'll have coffee OR tea" — at least one) before introducing symbols ¬, ∧, ∨, →, ↔.

### MAMR Enforcement
MC-1 addressed in TA-A02 via P27. If triggered later, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Negation (¬) and Conjunction (∧)
**Primitives**: P03 → P04 → P49

**P03 (ANALOGY BRIDGE):**
"Negation is a light switch: flip it and the truth value reverses. Conjunction is a two-key safe: BOTH keys must be turned simultaneously for it to open. ¬P flips P's truth value; P ∧ Q opens only when both P and Q are true."

**P04 (PATTERN INDUCTION):**
| P | Q | ¬P | P ∧ Q |
|---|---|---|---|
| T | T | F | T |
| T | F | F | F |
| F | T | T | F |
| F | F | T | F |

Pattern for ¬: exactly flips. Pattern for ∧: TRUE only on row 1 (T,T).

Example:
- P: "It is raining." Q: "The road is wet."
- ¬P: "It is NOT raining." — TRUE iff P is FALSE.
- P ∧ Q: "It is raining AND the road is wet." — TRUE only when both TRUE.

**P49:** Prompt: "Let P: '5 > 3' (TRUE), Q: '7 is even' (FALSE). Evaluate: (a) ¬P; (b) ¬Q; (c) P ∧ Q; (d) ¬P ∧ ¬Q."
- **CORRECT**: (a) FALSE; (b) TRUE; (c) FALSE (Q is FALSE); (d) FALSE ∧ TRUE = FALSE → TA-A02.
- **PARTIAL**: Address any wrong; note ∧ is FALSE if ANY component is FALSE → TA-A02.
- **INCORRECT**: → TA-B01.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A02 — Disjunction (∨): Inclusive Or
**Primitives**: P27 → P06 → P49

**P27 (MISCONCEPTION NAMING):** Name MC-1 OR-EXCLUSIVE: "In everyday English, 'or' is often exclusive: 'Do you want tea or coffee?' usually means one or the other, not both. In MATHEMATICS, ∨ (disjunction) is INCLUSIVE or: P ∨ Q is TRUE when P is TRUE, when Q is TRUE, OR when BOTH are TRUE. It is FALSE ONLY when BOTH are FALSE. This is the definition — always."

**P06 (CONTRAST PAIR PROMPT):**
| P | Q | P ∨ Q (inclusive, math) | P XOR Q (exclusive, everyday) |
|---|---|---|---|
| T | T | **T** (BOTH true: inclusive ✓) | F (exactly one: XOR) |
| T | F | T | T |
| F | T | T | T |
| F | F | F | F |

Example: "A student passes if they score ≥ 60 on the exam OR submit all homework." A student who does BOTH also passes. That's inclusive ∨.

**P49:** Prompt: "P: 'It is Saturday' (TRUE), Q: 'It is a holiday' (TRUE). Evaluate P ∨ Q. Is the result different from everyday English 'or'?"
- **CORRECT**: P ∨ Q = TRUE (both TRUE → inclusive or = TRUE). In everyday English 'or', you might expect only one, but mathematical ∨ is TRUE → TA-A03.
- **PARTIAL**: Confirm TRUE; note everyday 'or' can be exclusive but math ∨ is always inclusive → TA-A03.
- **INCORRECT**: → TA-B01.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A03 — Conditional (→): Vacuous Truth
**Primitives**: P27 → P03 → P49

**P27 (MISCONCEPTION NAMING):** Name MC-2 IMPLIES-CAUSAL: "Another common error: treating P → Q as a causal claim — 'P causes Q.' In logic, → is TRUTH-FUNCTIONAL only: its truth value depends only on the truth values of P and Q, not on any causal relationship. The key rule that surprises most people: if P is FALSE, then P → Q is TRUE regardless of Q. This is called VACUOUS TRUTH."

**P03 (ANALOGY BRIDGE):** "Think of P → Q as a promise: 'If you study (P), I'll give you an A (Q).' The promise is BROKEN only if you studied (P=TRUE) and I didn't give you an A (Q=FALSE). If you didn't study (P=FALSE), I haven't broken the promise regardless of what grade you get — it's vacuously kept."

| P | Q | P → Q |
|---|---|---|
| T | T | T (promise kept) |
| T | F | **F** (promise broken — ONLY this case is FALSE) |
| F | T | T (vacuously true) |
| F | F | T (vacuously true) |

Equivalent forms: P → Q ≡ ¬P ∨ Q (important identity). Contrapositive: P → Q ≡ ¬Q → ¬P (both have same truth table).

**P49:** Prompt: "P: '2+2=5' (FALSE), Q: 'The moon is made of cheese' (FALSE). Evaluate P → Q. Explain why the result is what it is."
- **CORRECT**: P → Q = TRUE (P=FALSE → vacuously true; a false premise makes any conditional true). The promise "if 2+2=5 then the moon is cheese" was never violated because the antecedent is false → TA-A04.
- **PARTIAL**: Confirm TRUE; explain vacuous truth with promise analogy → TA-A04.
- **INCORRECT**: → TA-B02.
- **NO_RESPONSE**: → TA-B02.

---

### TA-A04 — Biconditional (↔) and Operator Precedence
**Primitives**: P04 → P07 → P49

**P04 (PATTERN INDUCTION):**
| P | Q | P ↔ Q |
|---|---|---|
| T | T | T (same: both T) |
| T | F | F (different) |
| F | T | F (different) |
| F | F | T (same: both F) |

P ↔ Q = "P if and only if Q" — TRUE exactly when P and Q have the SAME truth value.
Equivalent: P ↔ Q ≡ (P → Q) ∧ (Q → P).

Operator precedence (highest to lowest): **¬ > ∧ > ∨ > → > ↔**
Example parsing: ¬P ∧ Q ∨ R → S ≡ ((¬P) ∧ Q) ∨ R) → S.

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1**: Let P: "n is even", Q: "n² is even" (both about the same integer n). P ↔ Q: "n is even iff n² is even." This is TRUE for all integers n (provable theorem). When n=4: P=TRUE, Q=TRUE → ↔ = TRUE. When n=3: P=FALSE, Q=FALSE (9 is odd) → ↔ = TRUE.
- **Example 2**: Parse ¬P ∨ Q → R. Precedence: first ¬P, then ¬P ∨ Q, then (¬P ∨ Q) → R. Evaluate with P=T, Q=F, R=T: ¬P=F, F∨F=F, F→T=TRUE.

**P49:** Prompt: "P: '6 is divisible by 2' (T), Q: '6 is even' (T). (a) P ↔ Q = ? (b) Parse and evaluate ¬P ∨ Q → P ↔ Q with P=T, Q=T."
- **CORRECT**: (a) T ↔ T = TRUE. (b) ¬T=F; F∨T=T; T→T=T; then T ↔ T = TRUE. Overall: (¬P ∨ Q → P) ↔ Q ... need to clarify: parse as (((¬P)∨Q)→P)↔Q = ((F∨T)→T)↔T = (T→T)↔T = T↔T = TRUE → TA-A05.
- **PARTIAL**: Confirm (a); walk through precedence in (b) step by step → TA-A05.
- **INCORRECT**: → TA-B03.
- **NO_RESPONSE**: → TA-B03.

---

### TA-A05 — Compound Propositions and De Morgan's Laws
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
De Morgan's Laws:
- ¬(P ∧ Q) ≡ ¬P ∨ ¬Q — "not (P and Q)" equals "(not P) or (not Q)"
- ¬(P ∨ Q) ≡ ¬P ∧ ¬Q — "not (P or Q)" equals "(not P) and (not Q)"

Verification for ¬(P ∧ Q) ≡ ¬P ∨ ¬Q:
| P | Q | P ∧ Q | ¬(P∧Q) | ¬P | ¬Q | ¬P∨¬Q |
|---|---|---|---|---|---|---|
| T | T | T | **F** | F | F | **F** |
| T | F | F | **T** | F | T | **T** |
| F | T | F | **T** | T | F | **T** |
| F | F | F | **T** | T | T | **T** |

Both columns are identical → De Morgan's first law confirmed.

Practical reading:
- "Not (raining AND cold)" ≡ "Not raining OR not cold" — same truth value in every scenario.
- "Not (raining OR cold)" ≡ "Not raining AND not cold" — dry AND warm.

**P49:** Prompt: "Apply De Morgan's law to simplify ¬(P ∨ ¬Q). Then evaluate with P=FALSE, Q=TRUE."
- **CORRECT**: ¬(P∨¬Q) ≡ ¬P ∧ ¬(¬Q) ≡ ¬P ∧ Q. With P=F, Q=T: ¬F ∧ T = T ∧ T = TRUE → TA-A06.
- **PARTIAL**: Apply first law: ¬(P∨¬Q) = ¬P∧¬(¬Q) = ¬P∧Q; evaluate: T∧T=T → TA-A06.
- **INCORRECT**: → TA-B01 or TA-B02 depending on error.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A06 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: "Let P=TRUE, Q=FALSE, R=TRUE. Evaluate: (a) P ∧ ¬Q; (b) ¬P ∨ Q; (c) Q → R; (d) P ↔ R."

Q2: "Identify the ONE row (P,Q combination) that makes P → Q FALSE."

Q3: "Apply De Morgan's law to ¬(¬P ∧ Q). Show each step."

Q4: "True or False: 'If 2+2=5 then pigs can fly' — evaluate this conditional."

Q5: "Write the contrapositive of P → Q. If P → Q is TRUE, is the contrapositive TRUE or FALSE?"

Q6: "Parse ¬P → Q ∧ R and insert parentheses to show the precedence. Then evaluate with P=T, Q=F, R=T."

**P55 (SCORE):**
- Q1: (a) T∧T=T; (b) F∨F=F; (c) F→T=T (vacuous); (d) T↔T=T.
- Q2: P=TRUE, Q=FALSE.
- Q3: ¬(¬P∧Q) ≡ ¬(¬P) ∨ ¬Q ≡ P ∨ ¬Q.
- Q4: P=FALSE (2+2≠5) → P→Q=TRUE (vacuous). "True" — don't need pigs to fly; antecedent is false.
- Q5: Contrapositive of P→Q is ¬Q→¬P. If P→Q is TRUE, contrapositive is also TRUE (they are logically equivalent).
- Q6: Precedence: ¬P→(Q∧R). With P=T: ¬T=F; Q∧R=F∧T=F; F→F=TRUE.

**P76 (TRANSFER PROBE — Cross-link: math.disc.boolean-circuits):**
"In digital logic, a NAND gate outputs ¬(A ∧ B) for inputs A, B ∈ {0, 1} (where 1=TRUE, 0=FALSE). (a) Complete the truth table for NAND: list all four (A,B) combinations and their outputs. (b) Using De Morgan's law, rewrite ¬(A ∧ B) as an expression using only ¬ and ∨. (c) A circuit has two NAND gates: first NAND(A,B)=X, then NAND(X,X)=Y. What logical expression does Y compute?"

Expected: (a) NAND(T,T)=F, NAND(T,F)=T, NAND(F,T)=T, NAND(F,F)=T. (b) ¬(A∧B)≡¬A∨¬B. (c) Y=¬(X∧X)=¬X=¬(¬(A∧B))=A∧B — double NAND is AND. Cross-link: math.disc.boolean-circuits (NAND/NOR universality, De Morgan's in circuits).

**P55 (SCORE):** Correct truth table; De Morgan application; double-NAND = AND identified.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, Q6, P76 = **7 items**.
Pass criterion: **6/7** (⌈0.85 × 7⌉ = 6; threshold = 0.85).
- **PASS** → P78.
- **FAIL** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1(b) wrong or Q2 wrong (OR/disjunction errors) → TA-B01 (OR-EXCLUSIVE); apply MAMR first.
- Q1(c) wrong or Q4 wrong or Q5 wrong → TA-B02 (IMPLIES-CAUSAL).
- Q1(d) wrong or Q3(↔ confusion) → TA-B03 (BICONDITIONAL-SYMMETRY-CONFUSION).
- Multiple wrongs → MAMR: TA-B01 if OR errors; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.found.truth-table, math.found.logical-equivalence, math.disc.boolean-circuits.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 OR-EXCLUSIVE
**Primitives**: P41 → P06 → P64 → P49

**P41**: "A restaurant menu says 'choose soup OR salad.' If I order both, am I violating the menu? Now consider: in math, the statement 'n=2 OR n=3' — can both hold simultaneously?"
Expected: learner says "no, both is not allowed" — reveals OR-EXCLUSIVE bias.

**P06 (CONTRAST PAIR):**
| "Or" type | Symbol | P=T, Q=T gives? | Used in |
|---|---|---|---|
| Inclusive or | ∨ | TRUE | Mathematics, formal logic |
| Exclusive or | XOR | FALSE | Everyday English, some circuits |

Mathematical ∨ is ALWAYS inclusive. If exclusive-or is intended, it must be written explicitly as XOR or "P or Q but not both."

**P64**: "Mathematical ∨ means AT LEAST ONE of P, Q is true — including the case where both are true. The everyday 'or' in English is context-dependent and often exclusive. In formal mathematics, ∨ is DEFINED as inclusive. When you see ∨, always apply the inclusive definition."

**P49**: "Evaluate: '5 is odd ∨ 5 is prime' — both are TRUE. What is the result?"
- **CORRECT**: TRUE — both components are TRUE; inclusive ∨ gives TRUE when either or both are true → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Reinforce truth table row (T,T)→T for inclusive ∨ → return.

---

### TA-B02 — Repair MC-2 IMPLIES-CAUSAL
**Primitives**: P03 → P07 → P49

**P03**: "Logical → is truth-functional: only truth values matter, not causation. Think of it as a promise that can only be BROKEN one way: the antecedent is true but the consequent is false. If the antecedent is false, the promise is automatically kept — even if the consequent is false too. This is called VACUOUS TRUTH."

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — Vacuous truth is not weird**: "If 1=0, then 2=3." Antecedent is FALSE → conditional is VACUOUSLY TRUE. We didn't claim 1=0; we just said IF it were so, then 2=3. The whole conditional is a TRUE statement in classical logic.
- **Example 2 — Only one failure mode**: "If you're a citizen, you can vote." (P→Q) This is FALSE ONLY IF you're a citizen (P=T) but can't vote (Q=F) — a broken promise. If you're not a citizen (P=F), the statement is vacuously true regardless of whether you can vote by some other means.

**P49**: "Let P: 'x is divisible by 4' (for a specific x=6: FALSE), Q: 'x is divisible by 2' (for x=6: TRUE). Evaluate P→Q."
- **CORRECT**: P=FALSE → P→Q = TRUE (vacuous). Note: for x=4, P=T,Q=T→T; for x=6, P=F,Q=T→T; for x=3, P=F,Q=F→T (vacuous again) → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: The only way P→Q is FALSE is P=T, Q=F. Here P=F → TRUE → return.

---

### TA-B03 — Repair MC-3 BICONDITIONAL-SYMMETRY-CONFUSION
**Primitives**: P06 → P27 → P49

**P27 (MISCONCEPTION NAMING)**: "MC-3 BICONDITIONAL-SYMMETRY-CONFUSION: 'P ↔ Q means P and Q are both TRUE.' Wrong. P ↔ Q is TRUE when P and Q have the SAME truth value — that includes BOTH FALSE. P ↔ Q ≡ (P→Q) ∧ (Q→P): both directions must hold."

**P06 (CONTRAST PAIR):**
| P | Q | P → Q | P ↔ Q | Key difference |
|---|---|---|---|---|
| T | T | T | T | Same — both agree |
| T | F | F | F | Both agree: → false, ↔ false |
| F | T | T | F | DIFFER here: → T, ↔ F |
| F | F | T | T | DIFFER here: → T, ↔ T |

P↔Q and P→Q agree on rows 1 and 2 but DISAGREE on rows 3 and 4. P↔Q is TRUE on row 4 (both FALSE = same value); P→Q is also TRUE on row 4 (vacuous). P↔Q is FALSE on row 3; P→Q is TRUE on row 3 (false antecedent).

**P49**: "P: '4 is prime' (FALSE), Q: '9 is prime' (FALSE). Evaluate P ↔ Q."
- **CORRECT**: F ↔ F = TRUE — both have same truth value (both FALSE) → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: P↔Q requires SAME truth value, not both TRUE; F↔F=T just like T↔T=T → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (evaluate compound with T/F values) + Q2 (P→Q failure case) | 2/2 |
| Day 3 | Q3 (De Morgan) + Q4 (vacuous truth) | 2/2 |
| Day 7 | Mixed 3-item: ∨ evaluation, → evaluation, ↔ evaluation | 2/3 |
| Day 21 | Q1, Q3, Q5, Q6 (4 items) | 3/4 |
| Day 60 | Full 7-item mastery gate | 6/7 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Proposition | math.found.proposition | Atomic propositions; T/F values; bivalence |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Truth Table | math.found.truth-table | Systematic enumeration of compound proposition truth values |
| Logical Equivalence | math.found.logical-equivalence | Two propositions are equivalent iff same truth table |
| Boolean Circuits | math.disc.boolean-circuits | AND/OR/NOT gates implement ∧/∨/¬ |

### Cross-Links
- **math.disc.boolean-circuits**: ∧/∨/¬ map directly to AND/OR/NOT gates. De Morgan's laws apply to both. NAND universality: any connective can be expressed using only NAND.

---

## Component 8 — Teaching Notes

1. **Inclusive or must be stated explicitly and early**: MC-1 OR-EXCLUSIVE is extremely common. TA-A02 addresses it as the first item after ¬ and ∧. Reinforce in every ∨ evaluation.
2. **Vacuous truth requires repeated exposure**: MC-2 IMPLIES-CAUSAL is the hardest misconception in this blueprint. TA-A03 introduces it with the promise analogy. TA-B02 reinforces with additional worked examples. Students often need 3+ exposures before it sticks.
3. **De Morgan's laws are essential**: Introduced in TA-A05 and appear in the cross-link P76 (NAND gate). These laws are foundational for truth-table-free equivalence proofs.
4. **Operator precedence**: ¬ > ∧ > ∨ > → > ↔. Provide a mnemonic: "Not And Or Implies Iff" (NAOII). Used in TA-A04 and Q6.
5. **Forward link**: Truth tables (math.found.truth-table) will formalize the mini-tables shown here into a systematic method. Note this in P78 completion.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.found.logical-connectives |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.85) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (4) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.proposition ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=4 ≥ 1h → max 7; used 6) | ✓ 6 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P27, A03:P27, A04:P04, A05:P04 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A05 |
| V-13 | GR-3: mastery gate TA terminal | ✓ TA-A06 uses P91 |
| V-14 | GR-4: P41/P64 in TA-B01 gates repair chain | ✓ P41 detects MC-1; P64 shifts to inclusive-or; P49 routes |
| V-15 | GR-6: P91 terminal in TA-A06 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link to math.disc.boolean-circuits in TA-A06 |
| V-17 | GR-8: cross_links documented | ✓ math.disc.boolean-circuits |
| V-18 | GR-9: P76 mode correct (cross_links≠[] → cross-link probe) | ✓ P76 references math.disc.boolean-circuits (NAND gate) |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 3; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P03, B03:P06 |
| AIR | All content fully specified; human tutor can execute | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.

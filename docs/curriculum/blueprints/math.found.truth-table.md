<!-- BLUEPRINT: math.found.truth-table -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Truth Table
**Concept ID:** `math.found.truth-table`
**KG Fields:** difficulty=foundational | bloom=apply | estimated_hours=3 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.found.truth-table |
| name | Truth Table |
| difficulty | foundational |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.logical-connectives |
| cross_links | math.disc.boolean-circuits (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.logical-connectives**: the operators ¬, ∧, ∨, →, ↔ combine propositions with precise truth-functional meanings — this concept tabulates those meanings exhaustively for every input combination

### Target Knowledge State
Student can construct a complete truth table for a compound proposition, listing every combination of truth values for its component propositions (2ⁿ rows for n propositions); correctly apply the INCLUSIVE meaning of ∨ (true when either or both inputs are true, false only when both are false); correctly apply the material conditional P→Q (FALSE only when P is true and Q is false; TRUE — "vacuously" — whenever P is false, regardless of Q); and correctly negate a conjunction or disjunction using De Morgan's laws (¬(P∧Q)≡¬P∨¬Q; ¬(P∨Q)≡¬P∧¬Q — the connective FLIPS under negation).

### Conceptual Obstacles
1. Reading ∨ (OR) as exclusive — assuming "P∨Q" is false when BOTH P and Q are true, by analogy with everyday English "or" (e.g. "coffee or tea," usually meaning pick one); the logical/mathematical ∨ is INCLUSIVE, true whenever at least one of P, Q holds, including when both do
2. Believing "if P then Q" (P→Q) is automatically false whenever P is false — this is the single most famous truth-table surprise: P→Q is defined to be TRUE whenever the antecedent P is false, regardless of Q's truth value ("vacuous truth"), which conflicts sharply with everyday intuitions about implication
3. Negating ¬(P∧Q) as ¬P∧¬Q (or ¬(P∨Q) as ¬P∨¬Q) — forgetting that De Morgan's laws FLIP the connective under negation (¬(P∧Q)≡¬P∨¬Q, not ¬P∧¬Q), a very common algebraic-style overgeneralization treating negation as if it distributed unchanged

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | OR-IS-EXCLUSIVE | Student marks P∨Q as false when both P and Q are true, reading ∨ as "one or the other, not both," matching colloquial English "or" | Any truth table row with both inputs true, for a disjunction |
| MC-2 | FALSE-ANTECEDENT-MEANS-FALSE-IMPLICATION | Student marks P→Q as false whenever P is false, regardless of Q, rather than recognizing P→Q is vacuously TRUE in that case | Any truth table row with a false antecedent, for a conditional |
| MC-3 | NEGATION-DISTRIBUTES-WITHOUT-FLIPPING | Student computes ¬(P∧Q) as ¬P∧¬Q (or ¬(P∨Q) as ¬P∨¬Q), failing to flip the connective as De Morgan's laws require | Any task negating a conjunction or disjunction |

**Foundational Misconception:** MC-2 (FALSE-ANTECEDENT-MEANS-FALSE-IMPLICATION) — vacuous truth is the single most counter-intuitive fact in elementary logic, directly conflicting with how "if...then" is used in ordinary speech (where a false premise usually makes the whole statement feel meaningless rather than "true"); a student who cannot accept this convention will construct every conditional truth table incorrectly and will misread every subsequent proof technique (e.g. vacuous proofs, contrapositive reasoning) that relies on it.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — foundational learner builds a truth table row by row for one compound proposition, checking each row's INCLUSIVE-or value directly, before any general rule is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a full truth table for P∨Q built row by row, explicitly marking the both-true row; P: a 2×2 grid picture of all four input combinations; A: formal truth tables for all five connectives (¬,∧,∨,→,↔), stated together
2. **A02 P06 CONTRAST PAIR** — inclusive OR vs. exclusive OR side by side (MC-1); the conditional's vacuous-truth row explicitly justified against intuition (MC-2); ¬(P∧Q) computed correctly via De Morgan vs. the naive non-flipping error (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Building a Truth Table Row by Row

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Construct one complete truth table concretely, explicitly marking the both-true row for OR; then state all five connective truth tables formally together

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (building the truth table for P∨Q row by row):**

| P | Q | P∨Q |
|---|---|-----|
| T | T | ? |
| T | F | ? |
| F | T | ? |
| F | F | ? |

Fill in one row at a time, checking the DEFINITION ("true when at least one is true") against each specific combination:
- Row 1 (P=T, Q=T): at least one is true (in fact both) → **T**
- Row 2 (P=T, Q=F): at least one is true (P is) → **T**
- Row 3 (P=F, Q=T): at least one is true (Q is) → **T**
- Row 4 (P=F, Q=F): neither is true → **F**

**The critical row is Row 1**: many students expect F there (by analogy with everyday "or"), but the mathematical definition of ∨ (inclusive OR) explicitly counts "both true" as satisfying "at least one is true" — Row 1 is T.

**Stage P — Pictorial (all four input combinations, a 2×2 grid):**

```
           Q=T        Q=F
   P=T   [T,T]→T   [T,F]→T
   P=F   [F,T]→T   [F,F]→F

   Only ONE cell (bottom-right, both false) gives F for OR.
   Three of the four cells give T — OR is true in the
   MAJORITY of cases, including the both-true corner.
```

**Stage A — Abstract (all five connective truth tables, stated together):**

| P | Q | ¬P | P∧Q | P∨Q | P→Q | P↔Q |
|---|---|----|----|----|----|-----|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

Read directly: ¬ flips a single value. ∧ (AND) is true only in the all-true row. ∨ (OR) is true in every row except all-false. → (IMPLIES) is FALSE only in row 2 (T,F) — true antecedent, false consequent — and TRUE in every other row, INCLUDING both false-antecedent rows (rows 3 and 4). ↔ (IFF) is true exactly when P and Q MATCH (both T or both F).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Build the truth table for ¬P∨Q (four rows). State the value in the row where P=T, Q=T.

**CORRECT:** ¬P∨Q: row P=T,Q=T: ¬P=F, so F∨Q=F∨T=**T**. Full table: (T,T)→T; (T,F)→ ¬P=F, F∨F=F; (F,T)→ ¬P=T, T∨T=T; (F,F)→ ¬P=T, T∨F=T. So P=T,Q=T row is **T**.
→ "Correct — this table (¬P∨Q) turns out to match P→Q exactly, row for row, a fact worth noticing now and revisited in A02." → Proceed to A02.

**PARTIAL:** Student computes ¬P correctly in each row but makes an OR error in one row (e.g. treating F∨T as F).
→ "Recheck the OR step specifically: OR is true whenever AT LEAST ONE input is true. In the row P=F,Q=T: ¬P=T, and Q=T, so we need T∨T, which is true (both being true certainly means 'at least one'). Revisit each row's OR computation against the 'at least one true' rule, not a memorized pattern."

**INCORRECT:** Student marks the P=T,Q=T row as F, reasoning "¬P is false there, and Q or nothing doesn't apply since P is already true" (a confused mixture, or exclusive-or reasoning applied to the OR step) (MC-1-adjacent).
→ "Work it mechanically, step by step: first compute ¬P for this row (P=T, so ¬P=F). THEN apply OR to ¬P and Q: F∨T. OR is true whenever at least one side is true — here Q=T, so F∨T=T regardless of the other side being false. The row is T, not F."

**NO_RESPONSE:** → "Row by row: (T,T): ¬P=F, F∨T=T. (T,F): ¬P=F, F∨F=F. (F,T): ¬P=T, T∨T=T. (F,F): ¬P=T, T∨F=T. The P=T,Q=T row is T."

---

### Teaching Action A02 — Inclusive vs. Exclusive OR; Vacuous Truth; De Morgan's Flip

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with inclusive OR vs. exclusive OR side by side; break MC-2 by directly justifying the vacuous-truth rows; break MC-3 with a correct De Morgan computation against the naive non-flipping error

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Inclusive OR (∨) vs. Exclusive OR (XOR) (MC-1):**

| P | Q | P∨Q (inclusive) | P⊕Q (exclusive) |
|---|---|-------------------|---------------------|
| T | T | **T** | **F** |
| T | F | T | T |
| F | T | T | T |
| F | F | F | F |

The ONLY row where they differ is both-true: inclusive OR says T (satisfied by either or both), exclusive OR says F (satisfied by exactly one, not both). Everyday English "or" is often exclusive in spirit ("soup or salad" usually means pick one), but mathematical logic's default ∨ is ALWAYS inclusive unless explicitly marked ⊕ (XOR) — a student translating an everyday sentence into logic must consciously override the exclusive-sounding intuition.

**Contrast 2 — Why P→Q is TRUE when P is false (MC-2), justified via a concrete promise:**

Consider the promise: "If it rains tomorrow, I will bring an umbrella" (P→Q, P="it rains", Q="I bring an umbrella"). When is this promise BROKEN (false)? Only if it RAINS (P true) and you DON'T bring an umbrella (Q false) — that is the one clear-cut violation. If it does NOT rain (P false), the promise is not tested at all — whether or not you happen to bring an umbrella anyway, you have not broken your word. Logic's convention captures this by calling the promise TRUE (not "undefined" or "meaningless") whenever the antecedent fails — a "vacuous" truth, true by default because there was no opportunity for it to be violated. This matches the truth table exactly: P→Q is false in exactly one row (P=T,Q=F, the broken promise) and true in the other three, including both P=F rows.

**Contrast 3 — De Morgan's flip: ¬(P∧Q) vs. the naive non-flipped guess (MC-3):**

Claim to check: is ¬(P∧Q) the same as ¬P∧¬Q, or as ¬P∨¬Q?

| P | Q | P∧Q | ¬(P∧Q) | ¬P∧¬Q | ¬P∨¬Q |
|---|---|-----|--------|-------|-------|
| T | T | T | F | F | F |
| T | F | F | T | F | **T** |
| F | T | F | T | F | **T** |
| F | F | F | T | T | T |

Comparing columns: ¬(P∧Q) matches ¬P∨¬Q EXACTLY (every row agrees), and DISAGREES with ¬P∧¬Q in rows 2 and 3. **De Morgan's law: ¬(P∧Q)≡¬P∨¬Q** — negating a conjunction flips it to a disjunction of the negated parts; the connective changes, it does not stay ∧.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Is "I'll pay you \$10 or take you to dinner" (inclusive, as typically meant in logic) true if I do BOTH? (b) Is the statement "If 2+2=5, then the moon is made of cheese" true or false (evaluate as a material conditional)? (c) Compute ¬(P∨Q) using De Morgan's law, and verify one row against the definition directly.

**CORRECT:** (a) Yes, under the INCLUSIVE reading, doing both satisfies "at least one," so the disjunction is true. (b) TRUE — the antecedent "2+2=5" is false, so by vacuous truth the whole conditional is true regardless of the (false) consequent. (c) De Morgan: ¬(P∨Q)≡¬P∧¬Q. Verify row P=F,Q=F: P∨Q=F, so ¬(P∨Q)=T. And ¬P∧¬Q = T∧T = T. **Match.**
→ "Correct on all three — (b) is a classic 'both parts are absurd, yet the whole statement is TRUE' example, testing vacuous truth in its starkest form." → Proceed to A03.

**PARTIAL:** Student gets (a) and (c) but hesitates on (b), unsure whether a conditional with an obviously false antecedent AND consequent should be called "true," "false," or "meaningless."
→ "Apply the definition mechanically, ignoring how strange it feels: P→Q is false in EXACTLY one case (P true, Q false) and true in all three others. Here P ('2+2=5') is false, so we're automatically in one of the three TRUE cases — Q's own truth value (also false here) doesn't matter once P is already false. The statement is TRUE by the formal definition, however odd that sounds next to its absurd content."

**INCORRECT:** Student answers (b) "false, since both parts are nonsense" (MC-2) and/or (c) as ¬P∨¬Q (MC-3).
→ "(b) The conditional's truth value depends ONLY on the P→Q truth table, not on whether P or Q are individually 'sensible' — since P is false here, the row is automatically TRUE (vacuous truth), regardless of Q. (c) Recheck against a truth table row: at P=F,Q=T, P∨Q=T, so ¬(P∨Q)=F. Does ¬P∨¬Q give F there? ¬P=T,¬Q=F, so T∨F=T — WRONG, doesn't match. Try ¬P∧¬Q instead: T∧F=F — matches. So ¬(P∨Q)≡¬P∧¬Q (AND, not OR) — De Morgan flips OR to AND under negation, the opposite connective from what non-flipping would guess."

**NO_RESPONSE:** → "(a) Yes, inclusive OR counts 'both' as satisfying 'at least one.' (b) True — false antecedent makes the conditional vacuously true. (c) ¬(P∨Q)≡¬P∧¬Q; check P=F,Q=T: ¬(P∨Q)=¬(T)=F, and ¬P∧¬Q=T∧F=F — match."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess inclusive-OR fluency, vacuous-truth application, and correct De Morgan negation under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Construct the full truth table for P∧Q, marking all four rows.

*Solution:* (T,T)→T; (T,F)→F; (F,T)→F; (F,F)→F — true only when both are true.

**Problem 2:** Evaluate "If 5 is even, then 5 is prime" as a material conditional. Is it true or false?

*Solution:* True — the antecedent ("5 is even") is false, so the conditional is vacuously true regardless of the consequent's actual truth value (which happens to be true here too, but that's not why the conditional is true).

**Problem 3:** Is P∨Q true when P is true and Q is true? Is P⊕Q (exclusive or) true in that same case?

*Solution:* P∨Q: true (inclusive OR counts "both" as satisfying "at least one"). P⊕Q: false (exclusive OR requires exactly one, not both).

**Problem 4:** Using De Morgan's law, rewrite ¬(P∨Q) without a negation applied to the whole parenthesized expression (i.e. push the negation inside).

*Solution:* ¬(P∨Q) ≡ ¬P∧¬Q (negating a disjunction flips it to a conjunction of the negated parts).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A university's policy states: "A student may graduate if they have completed all core courses OR received a special exemption from the dean."

(a) Using the INCLUSIVE reading of "or" (the logical default), determine whether a student who has BOTH completed all core courses AND received a dean's exemption may graduate.
(b) A separate policy states: "If a student has an unresolved disciplinary case, they may not register for the following semester." A particular student has NO disciplinary case at all. Using the material conditional's truth table, determine whether this second policy statement is satisfied (true) or violated (false) for this student, and justify using the vacuous-truth row.
(c) A student complains: "These two policies use logic in an unfair way — the OR policy lets in people who satisfy BOTH conditions, which seems too generous, while the IF policy seems to just not apply to people without a disciplinary case, which seems to let them off too easily." Evaluate this complaint by identifying, precisely, which truth-table row is doing the work in each case, and explain why "the rule doesn't apply" and "the rule is satisfied (true)" turn out to be the same outcome for the IF policy specifically.

**Expected solution:**

(a) Under inclusive OR, satisfying BOTH conditions certainly satisfies "at least one" — the student MAY graduate. (This matches Row 1 of the ∨ truth table: P=T, Q=T → T.)

(b) The policy "if disciplinary case, then may not register" is P→Q with P=false (no disciplinary case) for this student. By the material conditional's truth table, P→Q is TRUE whenever P is false, regardless of Q — so the policy statement is TRUE (satisfied, not violated) for this student, precisely because the antecedent condition that would trigger scrutiny (having a disciplinary case) never arose. This is Row 3 or 4 of the → truth table (P=F, either Q value), both giving T.

(c) The complaint conflates two different truth-table rows with two different intuitions, but formally there is no unfairness or inconsistency — each policy's truth value is determined mechanically by its own definition. For the OR policy, the "generous" both-satisfied case is Row 1 (P=T,Q=T→T), a deliberate feature of inclusive OR (rewarding either sufficient condition, or both, equally). For the IF policy, "the rule doesn't apply" (no disciplinary case, so no violation can occur) and "the rule is satisfied/true" are indeed the SAME formal outcome, precisely because of vacuous truth: a conditional with a false antecedent is DEFINED as true, capturing exactly the intuition that a promise/rule cannot be broken if the triggering condition never occurred. The complaint's discomfort is a genuine, common reaction to how formal logic's ∨ and → are DEFINED (not bugs or inconsistencies) — both definitions are chosen specifically so that truth tables give unambiguous, mechanically computable answers in every one of the four input combinations, at the cost of sometimes disagreeing with looser, context-dependent everyday intuitions about "or" and "if."

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

- MASTERY ACHIEVED → unlock math.found.logical-equivalence and math.disc.boolean-circuits; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.found.truth-table assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — OR-IS-EXCLUSIVE (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Reading ∨ as exclusive (true only when exactly one input is true) is OR-IS-EXCLUSIVE. Mathematical/logical OR is INCLUSIVE by default — true whenever AT LEAST ONE input is true, including when both are."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is P∨Q true when both P and Q are true?"
- MC-1 response: "No — 'or' means one or the other, not both."

**[P64 — CONCEPTUAL SHIFT]**
"Check the actual definition: ∨ is true whenever AT LEAST ONE input is true. When both are true, 'at least one' is certainly satisfied (in fact, satisfied twice over) — so P∨Q=T there. Everyday English 'or' often carries an exclusive flavor ('coffee or tea'), but logic's default symbol ∨ is always inclusive; a separate symbol (⊕, XOR) exists specifically for the exclusive meaning when that's what's intended."

Practice: State whether "I'll bring a book or a laptop to read" (interpreted inclusively) is satisfied if someone brings both.

---

### Repair Action B02 — FALSE-ANTECEDENT-MEANS-FALSE-IMPLICATION (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Assuming P→Q is automatically false when P is false is FALSE-ANTECEDENT-MEANS-FALSE-IMPLICATION. P→Q is defined to be TRUE whenever the antecedent is false — a 'vacuous truth,' since there's no way to violate a promise whose triggering condition never occurred."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is 'if pigs can fly, then 2+2=5' true or false?"
- MC-2 response: "False, since pigs obviously can't fly and 2+2 isn't 5."

**[P64 — CONCEPTUAL SHIFT]**
"P→Q's truth table is false in EXACTLY one row: P true, Q false (a broken promise). Here P ('pigs can fly') is false, so we're automatically in one of the three TRUE rows, regardless of Q's own truth value — the conditional is TRUE, however absurd both parts individually are. Anchor: a promise 'if it rains, I'll bring an umbrella' is not BROKEN on a sunny day, no matter what you do about umbrellas — the conditional survives (is true) whenever its trigger never fires."

Practice: Evaluate "If the moon is made of cheese, then 7 is a prime number" as a material conditional, and justify using the vacuous-truth row.

---

### Repair Action B03 — NEGATION-DISTRIBUTES-WITHOUT-FLIPPING (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Computing ¬(P∧Q) as ¬P∧¬Q (or ¬(P∨Q) as ¬P∨¬Q) is NEGATION-DISTRIBUTES-WITHOUT-FLIPPING. De Morgan's laws require the connective to FLIP under negation — AND becomes OR, and OR becomes AND."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is ¬(P∧Q) equivalent to?"
- MC-3 response: "¬P∧¬Q."

**[P64 — CONCEPTUAL SHIFT]**
"Check row by row: at P=T,Q=F, P∧Q=F, so ¬(P∧Q)=T. Does ¬P∧¬Q match? ¬P=F,¬Q=T, so F∧T=F — does NOT match (T≠F). Try ¬P∨¬Q instead: F∨T=T — MATCHES. De Morgan's law is ¬(P∧Q)≡¬P∨¬Q (AND flips to OR under negation). Mnemonic: negation 'breaks apart' the connective into its opposite — 'not (both)' means 'at least one fails,' which is exactly an OR of the negated parts, not an AND."

Practice: Verify ¬(P∨Q)≡¬P∧¬Q by checking all four rows directly against the definitions.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Reconstruct the full five-connective truth table (¬,∧,∨,→,↔) from memory |
| SR-2 | +3 days | Evaluate a fresh material conditional with a false antecedent, justifying vacuous truth explicitly |
| SR-3 | +7 days | Apply De Morgan's law to negate a fresh conjunction and a fresh disjunction, verifying at least one row against the definition |
| SR-4 | +14 days | Reconstruct the university-policy transfer probe's argument for why "rule doesn't apply" and "rule is true" coincide for a conditional |

Retrieval flag: if student marks the both-true row of OR as false (MC-1) or a false-antecedent conditional as false (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.found.logical-connectives | Supplies the five connectives (¬,∧,∨,→,↔) this concept tabulates exhaustively for every input combination |
| Unlocks | math.found.logical-equivalence | Two propositions are logically equivalent iff their truth tables match on every row — the exact column-comparison technique used in A02 Contrast 3 |
| Unlocks | math.disc.boolean-circuits | Truth tables are the direct specification for logic gates (AND, OR, NOT gates implement ∧, ∨, ¬ exactly) |

**GR-9:** cross_links: math.disc.boolean-circuits is listed in the KG but has **no authored blueprint yet** — P76_mode is therefore set to independence for now; once math.disc.boolean-circuits is authored, a future revision may add a genuine cross-link probe connecting truth tables directly to logic-gate behavior.

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching other h=3, foundational/apply concepts
- bloom=apply → every checkpoint and the gate require constructing/evaluating truth tables mechanically, not merely stating definitions
- CPA_entry = C for a foundational learner: a single truth table (P∨Q) built row by row anchors the "check the definition against each specific combination" discipline before all five connectives are presented together

**Key teaching insight:** MC-2 (vacuous truth) is this concept's highest-leverage misconception precisely because it conflicts most sharply with natural-language intuition — everyday "if...then" statements feel meaningless or inapplicable when the premise is false, never "true." A02's Contrast 2 uses a concrete promise ("if it rains, I'll bring an umbrella") specifically because promise-keeping is a domain where "the promise isn't broken" and "the promise is true/kept" are intuitively the same outcome, bridging the gap between everyday reasoning and the formal convention.

**MC-1 and MC-3 as complementary connective-behavior errors:** MC-1 involves reading a connective (∨) too NARROWLY (as if it were exclusive); MC-3 involves negating a connective too NAIVELY (without flipping it). Both are addressed with the same technique — building the FULL truth table and comparing column by column — reinforcing that every claim about connective behavior in this concept is settled by direct row-by-row verification, never by pattern-matching from a superficially similar rule.

**Sequencing note (cross-link):** math.disc.boolean-circuits (logic gates implementing ∧, ∨, ¬ in hardware) is not yet authored in the corpus; this blueprint's truth-table machinery is exactly what that future concept will need to invoke (a truth table IS a gate's specification), and Component 7 records the pending cross-link for a future authoring pass.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.found.truth-table ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.found.logical-connectives ✓ | PASS |
| V-3 | CPA entry = C for foundational difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Truth-table construction/evaluation tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1, MC-2 FOUNDATIONAL, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | University graduation/disciplinary policy scenario; OR/IF rows named explicitly ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

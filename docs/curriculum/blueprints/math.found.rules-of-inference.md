<!-- BLUEPRINT: math.found.rules-of-inference -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Rules of Inference
**Concept ID:** `math.found.rules-of-inference`
**KG Fields:** difficulty=developing | bloom=apply | estimated_hours=5 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.found.rules-of-inference |
| name | Rules of Inference |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.logical-equivalence, math.found.logical-connectives |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.logical-equivalence**: two propositions are equivalent iff they match on every truth-table row — the tool that VERIFIES a proposed inference rule is genuinely valid (a valid rule's premises-imply-conclusion form is a tautology)
- **math.found.logical-connectives**: ¬,∧,∨,→,↔ — the vocabulary inference rules are built from

### Target Knowledge State
Student can apply modus ponens (P, P→Q ⊢ Q) and modus tollens (¬Q, P→Q ⊢ ¬P) correctly to draw valid conclusions; correctly identify and REJECT the two classic invalid argument forms that superficially resemble them — affirming the consequent (Q, P→Q ⊢ P, INVALID) and denying the antecedent (¬P, P→Q ⊢ ¬Q, INVALID); and correctly recognize that a valid inference rule's DIRECTION cannot be reversed — from {P, P→Q} validly concluding Q does NOT license concluding P→Q from {P,Q}.

### Conceptual Obstacles
1. Affirming the consequent — treating "P→Q is true, and Q is true, therefore P is true" as a valid inference, when in fact Q being true says nothing about P (many other things besides P could have caused Q); this is a genuinely invalid argument form, not a weaker version of modus ponens
2. Denying the antecedent — treating "P→Q is true, and P is false, therefore Q is false" as valid, when P being false says nothing about Q's truth value (Q could still be true for some other reason); this is a genuinely invalid argument form, not a weaker version of modus tollens
3. Assuming a valid inference's direction can be reversed — believing that because {P, P→Q} validly yields Q (modus ponens), the reverse process (starting from P and Q, concluding P→Q) is equally valid; a conditional cannot in general be inferred merely from its antecedent and consequent both happening to be true

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | AFFIRMING-THE-CONSEQUENT | Student treats "P→Q; Q; therefore P" as valid, confusing it with modus ponens | Any argument where the consequent Q is asserted true and the antecedent P is (invalidly) concluded |
| MC-2 | DENYING-THE-ANTECEDENT | Student treats "P→Q; ¬P; therefore ¬Q" as valid, confusing it with modus tollens | Any argument where the antecedent P is asserted false and the consequent Q's negation is (invalidly) concluded |
| MC-3 | INFERENCE-DIRECTION-REVERSIBLE | Student assumes a valid rule's direction can be reversed — e.g. from P and Q both being true, concluding P→Q must also be established | Any task asking whether a conditional can be inferred merely from its antecedent and consequent independently holding |

**Foundational Misconception:** MC-1 (AFFIRMING-THE-CONSEQUENT) — it is the single most common invalid-argument error in introductory logic, precisely because it is a superficial mirror image of the genuinely valid modus ponens (both involve $P\to Q$ and one of $P,Q$ as premises), and a student who cannot reliably distinguish "P is asserted, conclude Q" (valid) from "Q is asserted, conclude P" (invalid) will misapply BOTH modus ponens and modus tollens throughout every subsequent proof.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner works a concrete modus ponens and modus tollens example fully, verified by truth table, before the invalid look-alike forms are introduced.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: modus ponens and modus tollens worked on a concrete premise pair, each verified as a tautology via truth table; P: an argument-form template picture; A: the formal rule statements and validity-via-tautology criterion
2. **A02 P06 CONTRAST PAIR** — modus ponens vs. affirming the consequent, truth-table-verified (MC-1); modus tollens vs. denying the antecedent, truth-table-verified (MC-2); the direction-reversal fallacy exposed via a counterexample (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Two Valid Rules, Verified by Truth Table

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Work modus ponens and modus tollens on a concrete example, verifying validity via the truth-table method already known; state the formal rules and the validity-as-tautology criterion

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete ("If it rains, the ground gets wet"):**

Let $P$="it rains", $Q$="the ground gets wet". Given: $P\to Q$ (the rule) and $P$ (it is in fact raining). **Modus ponens concludes: $Q$** (the ground gets wet) — directly matching intuition.

Now given instead: $P\to Q$ and $\neg Q$ (the ground is NOT wet). **Modus tollens concludes: $\neg P$** (it must not be raining) — since if it HAD rained, the ground WOULD be wet (by the rule), but it isn't, so it can't have rained.

**Verify both are valid via truth table** (checking $[(P\to Q)\wedge P]\to Q$ is a tautology):

| P | Q | P→Q | (P→Q)∧P | [(P→Q)∧P]→Q |
|---|---|-----|---------|--------------|
| T | T | T | T | T |
| T | F | F | F | T |
| F | T | T | F | T |
| F | F | T | F | T |

All four rows T — a **tautology**, confirming modus ponens is genuinely valid (the conclusion is guaranteed whenever the premises hold).

**Stage P — Pictorial (the argument-form template):**

```
   MODUS PONENS                    MODUS TOLLENS
   Premise 1: P → Q                Premise 1: P → Q
   Premise 2: P                    Premise 2: ¬Q
   ─────────────────                ─────────────────
   Conclusion: Q                    Conclusion: ¬P

   (asserting the ANTECEDENT       (denying the CONSEQUENT
    lets you conclude the           lets you conclude the
    consequent)                     negated antecedent)
```

**Stage A — Abstract (formal statement and validity criterion):**

**Modus Ponens:** $P, P\to Q \vdash Q$. **Modus Tollens:** $\neg Q, P\to Q \vdash \neg P$.

**Validity criterion:** an argument form is VALID iff the conditional [(all premises) $\to$ (conclusion)] is a TAUTOLOGY (true on every row) — exactly the method used above, directly reusing the truth-table technique from math.found.logical-equivalence.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Given "If the alarm sounds, the building is being evacuated" (P→Q) and "The alarm is sounding" (P), what does modus ponens conclude? Verify by checking which row of the P→Q truth table this scenario corresponds to.

**CORRECT:** Modus ponens concludes: "The building is being evacuated" (Q). This corresponds to row 1 of the P→Q truth table (P=T, Q=T) — the only row where BOTH premises (P→Q true, and P true) can hold simultaneously, and in that row Q is also T, confirming the conclusion.
→ "Correct — checking which row makes BOTH premises true simultaneously (only row 1) directly confirms Q must also hold there." → Proceed to A02.

**PARTIAL:** Student states the correct conclusion but cannot identify which truth-table row corresponds to the argument.
→ "Identify the row where BOTH premises hold: P→Q is true in rows 1,3,4 (T,T / F,T / F,F), but P is true only in rows 1,2 (T,T / T,F). The ONLY row where both premises are simultaneously true is row 1 (P=T,Q=T) — and in that row, Q is indeed true, confirming the conclusion is forced."

**INCORRECT:** Student concludes "the alarm sounding means something is wrong" or some other vague restatement rather than applying modus ponens's specific conclusion (Q itself).
→ "Modus ponens has a precise conclusion: given P→Q and P, the conclusion is exactly Q (not some vaguer paraphrase). Here Q is specifically 'the building is being evacuated' — that specific statement is what's concluded, directly and only, from the two given premises."

**NO_RESPONSE:** → "Modus ponens: given P→Q and P, conclude Q — 'the building is being evacuated.' This matches row 1 (P=T,Q=T), the only row where both premises hold."

---

### Teaching Action A02 — Two Fallacies, Exposed by Truth Table; Direction Cannot Reverse

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by truth-table-testing affirming the consequent against modus ponens; break MC-2 similarly for denying the antecedent; break MC-3 with a direct counterexample to direction-reversal

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Modus ponens (valid) vs. affirming the consequent (invalid), truth-table tested (MC-1):**

Affirming the consequent: $Q, P\to Q \vdash P$. Test $[(P\to Q)\wedge Q]\to P$ for tautology:

| P | Q | P→Q | (P→Q)∧Q | [(P→Q)∧Q]→P |
|---|---|-----|---------|--------------|
| T | T | T | T | T |
| T | F | F | F | T |
| F | T | T | T | **F** |
| F | F | T | F | T |

**Row 3 is FALSE** — NOT a tautology. Concretely: "If it rains, the ground gets wet" (P→Q) and "the ground is wet" (Q) does NOT let you validly conclude "it rained" (P) — the ground could be wet from a sprinkler, a spilled bucket, or countless other causes having nothing to do with rain. **Affirming the consequent is INVALID**, genuinely different from modus ponens despite superficially resembling it.

**Contrast 2 — Modus tollens (valid) vs. denying the antecedent (invalid), truth-table tested (MC-2):**

Denying the antecedent: $\neg P, P\to Q \vdash \neg Q$. Test $[(P\to Q)\wedge\neg P]\to\neg Q$:

| P | Q | P→Q | ¬P | (P→Q)∧¬P | ¬Q | [...]→¬Q |
|---|---|-----|----|---------|----|----|
| T | T | T | F | F | F | T |
| T | F | F | F | F | T | T |
| F | T | T | T | T | F | **F** |
| F | F | T | T | T | T | T |

**Row 3 is FALSE** — NOT a tautology. Concretely: "If it rains, the ground gets wet" and "it is NOT raining" does NOT let you validly conclude "the ground is NOT wet" — the ground could still be wet from another cause (sprinkler, etc.), exactly the same failure mode as Contrast 1, applied to the negated form. **Denying the antecedent is INVALID.**

**Contrast 3 — Direction cannot reverse (MC-3), a direct counterexample:**

Suppose $P$="today is Tuesday" and $Q$="the store is open" both happen to be true today (it IS Tuesday, and the store IS open). Does this let us conclude $P\to Q$ ("if it's Tuesday, the store is open," as a GENERAL rule)? **No** — the store might simply happen to be open today for an UNRELATED reason (e.g. it's open every day, or today is a holiday sale), with NO genuine connection between the day being Tuesday and the store's being open. Knowing $P$ and $Q$ are both individually true tells you NOTHING about whether $P\to Q$ holds as a general implication — reversing modus ponens's direction (concluding the conditional FROM the two individual facts) is not a valid inference at all.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** "If a number is divisible by 4, it is divisible by 2" (P→Q). Given that a number IS divisible by 2 (Q), can you validly conclude it is divisible by 4 (P)? Name the fallacy if this reasoning is attempted, and give a specific counterexample number.

**CORRECT:** No — this would be affirming the consequent, an invalid inference. Counterexample: 6 is divisible by 2 (Q true) but NOT divisible by 4 (P false) — a number satisfying Q without satisfying P, exactly disproving the invalid conclusion.
→ "Correct — 6 is a clean, concrete counterexample showing Q can hold while P fails, confirming the fallacy." → Proceed to A03.

**PARTIAL:** Student correctly identifies the fallacy name but cannot produce a specific counterexample number.
→ "Find a number divisible by 2 but NOT by 4 — try small even numbers not multiples of 4: 2, 6, 10, 14 all work (each divisible by 2, none divisible by 4). Any one of these, like 6, directly disproves 'divisible by 2 implies divisible by 4.'"

**INCORRECT:** Student answers "yes, since divisibility by 2 and 4 are closely related" (accepting the fallacious inference).
→ "Closely related is not the same as logically equivalent or reversible. Test directly: is 6 divisible by 4? $6/4=1.5$, not a whole number — so 6 is NOT divisible by 4, despite being divisible by 2. This single counterexample proves the reverse implication (divisible by 2 ⟹ divisible by 4) is FALSE — only the original direction (divisible by 4 ⟹ divisible by 2) was ever claimed to hold."

**NO_RESPONSE:** → "No — this is affirming the consequent (invalid). Counterexample: 6 is divisible by 2 but not by 4."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct application of modus ponens/tollens, rejection of the two classic fallacies, and direction-reversal awareness under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** "If x=3, then x²=9" (P→Q) and "x=3" (P). What follows by modus ponens?

*Solution:* $x^2=9$ (Q).

**Problem 2:** "If x=3, then x²=9" (P→Q) and "x²≠9" (¬Q). What follows by modus tollens?

*Solution:* $x\ne3$ (¬P).

**Problem 3:** "If x=3, then x²=9" and "x²=9". Can you validly conclude x=3? Name the fallacy if not, and give a counterexample.

*Solution:* No — affirming the consequent. Counterexample: $x=-3$ gives $x^2=9$ too, but $x\ne3$.

**Problem 4:** "If x=3, then x²=9" and "x≠3". Can you validly conclude x²≠9? Name the fallacy if not, and give a counterexample.

*Solution:* No — denying the antecedent. Counterexample: $x=-3\ne3$, yet $x^2=9$ (not ≠9).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A medical test has the property: "If a patient has disease D, the test result is positive" (P→Q, where P="has D", Q="test positive").

(a) A patient tests positive (Q). A doctor concludes "the patient has D" (P). Is this valid? Name the fallacy if not, and explain in real medical terms (not just abstract symbols) why the conclusion doesn't necessarily follow.
(b) A different patient tests negative (¬Q). Using modus tollens correctly, what can be validly concluded?
(c) A researcher observes that, in a specific patient, both "has D" and "tests positive" happen to be true, and concludes: "This confirms our rule 'if a patient has D, the test is positive' is a genuinely reliable causal rule." Evaluate this reasoning, distinguishing between confirming ONE INSTANCE is consistent with the rule versus establishing the rule ITSELF (as a general implication) from that one instance alone.

**Expected solution:**

(a) **Invalid** — this is affirming the consequent. In real terms: many medical tests have FALSE POSITIVES — a patient could test positive due to a different condition, a lab error, or other causes entirely unrelated to disease D, without actually having D. Testing positive (Q) does not, by itself, guarantee the specific cause was D (P); the rule only guarantees the OTHER direction (having D guarantees a positive test, not the reverse).

(b) Modus tollens: from $\neg Q$ (tests negative) and $P\to Q$, validly conclude $\neg P$ — the patient does NOT have disease D (assuming the test has zero false negatives, i.e. the rule $P\to Q$ genuinely holds without exception; real tests may have this stated as an idealization).

(c) The researcher's reasoning overreaches. Observing ONE patient where both P (has D) and Q (tests positive) are true is fully CONSISTENT with the rule $P\to Q$ holding — it doesn't contradict it — but a single consistent instance does not ESTABLISH the general rule as reliable or causal; that would require broader evidence (e.g. checking many patients WITH the disease to confirm they consistently test positive, and understanding the biological/testing mechanism). This is precisely the direction-reversal fallacy from Contrast 3 in a scientific-reasoning guise: observing P and Q both true in a single case never PROVES $P\to Q$ as a law — at most it fails to disprove it. Confirming a rule's reliability requires evidence structured very differently from simply noting one instance where the antecedent and consequent happened to coincide.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 4/5 (⌈0.8 × 5⌉ = ⌈4⌉ = 4)

- S ≥ 4: MASTERY ACHIEVED → proceed to P74
- S = 3: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 2: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.found.proof; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.found.rules-of-inference assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — AFFIRMING-THE-CONSEQUENT (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Concluding P from P→Q and Q is AFFIRMING-THE-CONSEQUENT. This is invalid — Q being true doesn't rule out other causes of Q besides P."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "If it's raining, the ground is wet. The ground is wet. Is it raining?"
- MC-1 response: "Yes, it must be raining."

**[P64 — CONCEPTUAL SHIFT]**
"Check for other causes of a wet ground: a sprinkler, a spilled bucket, melted snow — the ground being wet is CONSISTENT with rain but doesn't RULE OUT these other explanations. Verify via truth table: $[(P\to Q)\wedge Q]\to P$ fails at row (F,T) — P false, Q true, P→Q true, yet the conclusion P would be false. NOT a tautology, confirming this inference pattern is invalid in general."

Practice: For "if a shape is a square, it has 4 sides" and "a shape has 4 sides," explain why you cannot conclude it's a square, naming a specific counterexample shape.

---

### Repair Action B02 — DENYING-THE-ANTECEDENT (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Concluding ¬Q from P→Q and ¬P is DENYING-THE-ANTECEDENT. This is invalid — P being false doesn't rule out Q being true for some other reason."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "If it's raining, the ground is wet. It's not raining. Is the ground dry?"
- MC-2 response: "Yes, the ground must be dry."

**[P64 — CONCEPTUAL SHIFT]**
"The ground could still be wet from a sprinkler even though it's not raining — 'not raining' rules out rain as the CAUSE, but says nothing about OTHER causes making the ground wet anyway. Verify via truth table: $[(P\to Q)\wedge\neg P]\to\neg Q$ fails at row (F,T) — P false, Q true (so ¬Q false), yet ¬P is true; the conclusion ¬Q is false there. NOT a tautology."

Practice: For "if a number is a multiple of 4, it's even" and "a number is not a multiple of 4," explain why you cannot conclude it's odd, naming a specific counterexample number.

---

### Repair Action B03 — INFERENCE-DIRECTION-REVERSIBLE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming a valid rule's direction can be reversed is INFERENCE-DIRECTION-REVERSIBLE. Concluding Q from P and P→Q (modus ponens) does NOT license the reverse: concluding P→Q merely from P and Q both being independently true."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Today is Tuesday, and the store is open. Does this prove 'if it's Tuesday, the store is open'?"
- MC-3 response: "Yes, since both are true today."

**[P64 — CONCEPTUAL SHIFT]**
"Both being true TODAY says nothing about whether the connection holds as a GENERAL RULE. The store might be open every single day, with Tuesday being completely irrelevant to its hours — one day's coincidence proves nothing about a general implication. Establishing $P\to Q$ as a genuine rule requires checking many cases (or understanding an underlying mechanism), not observing one instance where both happen to hold."

Practice: Explain why observing that "today is sunny" and "the ice cream shop has a long line" doesn't prove "if it's sunny, the ice cream shop has a long line" as a universal rule.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Reconstruct modus ponens and modus tollens from memory, applying each to a fresh premise pair |
| SR-2 | +3 days | Verify affirming-the-consequent and denying-the-antecedent are invalid via fresh truth tables |
| SR-3 | +7 days | Find a fresh counterexample number/object disproving an affirming-the-consequent or denying-the-antecedent argument |
| SR-4 | +14 days | Reconstruct the medical-test transfer probe's distinction between one consistent instance and establishing a general rule |

Retrieval flag: if student accepts affirming the consequent (MC-1) or denying the antecedent (MC-2) as valid, re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.found.logical-equivalence | Supplies the truth-table-as-tautology validity criterion used throughout to verify (or refute) every argument form in this concept |
| Requires (Tier-1) | math.found.logical-connectives | Supplies the → connective these inference rules are built around |
| Unlocks | math.found.proof | Formal mathematical proofs are built by chaining valid inference rules (modus ponens, modus tollens, and others) — this concept supplies the basic building blocks |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the fallacy-detection and direction-reversal lessons to a medical-testing/scientific-reasoning scenario rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (2 main TAs + gate), matching the concept's tightly focused scope (two valid rules, two paired fallacies, one direction-reversal caution) despite developing difficulty
- bloom=apply → every checkpoint and the gate require applying a rule or constructing a counterexample, not merely stating a definition
- CPA_entry = C for a developing learner: a concrete rain/wet-ground scenario, verified by truth table (already a familiar technique), anchors both valid rules before their invalid look-alikes are introduced

**Key teaching insight:** MC-1 and MC-2 are best taught as a matched PAIR, not two separate lessons, because they share the identical underlying error (mistaking "consistent with the rule" for "the only way the rule could be satisfied") applied to the two valid rules' mirror images. A02's Contrasts 1 and 2 deliberately reuse the IDENTICAL rain/wet-ground scenario from A01, changing only which premise is asserted, so the parallel structure between the valid and invalid forms — and between the two fallacies themselves — is as visible as possible.

**MC-3 as the conceptually deepest error:** Unlike MC-1/MC-2 (which involve a specific WRONG conclusion), MC-3 involves a more subtle logical error — mistaking evidence CONSISTENT with a rule for evidence that ESTABLISHES the rule. This connects directly to scientific reasoning generally (confirmation bias, the difference between consistent-with and proves), which is why the A03 transfer probe extends it into an explicitly scientific/medical framing.

**Sequencing note:** No cross-link concept exists yet for math.found.rules-of-inference; the P76 transfer probe instead uses a medical-testing scenario, chosen because false positives/negatives make the affirming-the-consequent and denying-the-antecedent fallacies concretely consequential (misdiagnosis) rather than abstract, and because the direction-reversal fallacy maps naturally onto a common scientific-reasoning error (over-generalizing from one confirming instance).

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.found.rules-of-inference ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.found.logical-equivalence ✓ (this session), math.found.logical-connectives ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Rule-application and counterexample-construction tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=4/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.8×5⌉=⌈4⌉=4; PASS=4/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5, tightly-scoped → standard (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Medical testing false-positive scenario; consistent-with-vs-establishes distinction ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

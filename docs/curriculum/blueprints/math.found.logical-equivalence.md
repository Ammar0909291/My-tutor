<!-- BLUEPRINT: math.found.logical-equivalence -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Logical Equivalence
**Concept ID:** `math.found.logical-equivalence`
**KG Fields:** difficulty=foundational | bloom=analyze | estimated_hours=3 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.found.logical-equivalence |
| name | Logical Equivalence |
| difficulty | foundational |
| bloom | analyze |
| estimated_hours | 3 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.truth-table, math.found.logical-connectives |
| cross_links | math.disc.boolean-circuits (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.truth-table**: exhaustive row-by-row evaluation of a compound proposition — the exact tool used to CHECK logical equivalence (compare tables column by column)
- **math.found.logical-connectives**: ¬,∧,∨,→,↔ — the building blocks of the compound propositions being compared for equivalence

### Target Knowledge State
Student can determine whether two compound propositions are logically equivalent by constructing BOTH truth tables and comparing them row by row on EVERY row (not just checking a few convenient rows); correctly distinguish a genuine logical equivalence (true on every row) from a mere COINCIDENTAL match on some rows but not all; and correctly apply De Morgan's laws and other standard equivalences (double negation, the conditional-as-disjunction rewrite $P\to Q\equiv\neg P\vee Q$) as PROVEN facts (verifiable by truth table), not as arbitrary rules to memorize without justification.

### Conceptual Obstacles
1. Declaring two propositions equivalent after checking only ONE or a FEW rows that happen to match, rather than verifying ALL rows agree — logical equivalence is an EXHAUSTIVE claim (every possible truth-value assignment), and a single disagreeing row anywhere disqualifies the whole claim
2. Confusing "these two propositions happen to have the same truth value in this ONE specific scenario" with "these two propositions are logically equivalent" — equivalence is a property of the FORMULAS across ALL assignments, not a fact about one particular assignment of truth values
3. Treating standard equivalences (De Morgan's, double negation, $P\to Q\equiv\neg P\vee Q$) as arbitrary memorized rules rather than provable facts — each can and should be VERIFIED by truth table, and a student who cannot verify one has no way to check whether it's being applied correctly in a new, unfamiliar context

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | PARTIAL-MATCH-MEANS-EQUIVALENT | Student checks only a few rows of two truth tables, finds they match, and declares logical equivalence without checking every row | Any pair of propositions that agree on some rows but disagree on at least one other |
| MC-2 | ONE-SCENARIO-MATCH-MEANS-EQUIVALENT | Student observes that two propositions have the same truth value for ONE specific assignment (e.g. "when P is true and Q is false, both are false, so they're equivalent") and generalizes incorrectly | Any single-scenario comparison presented as if it settled the general equivalence question |
| MC-3 | EQUIVALENCES-ARE-ARBITRARY-RULES | Student applies De Morgan's laws or other named equivalences as memorized templates without being able to verify them via truth table, leading to misapplication in unfamiliar forms | Any request to justify (not just apply) a standard equivalence |

**Foundational Misconception:** MC-1 (PARTIAL-MATCH-MEANS-EQUIVALENT) — logical equivalence is fundamentally an EXHAUSTIVE claim (true for every one of the $2^n$ rows), and a student who checks only some rows has not actually verified the claim at all; this directly enables MC-2 (an extreme version checking only ONE row) and undermines any confidence in applying named equivalences (MC-3), since a student who doesn't insist on exhaustive verification has no reliable way to confirm a memorized rule actually holds in general.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — foundational learner builds two full truth tables and compares them row by row, encountering a near-miss (matching on most but not all rows) before the formal exhaustive-comparison rule is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: two full truth tables built and compared row by row for a genuinely equivalent pair; P: a side-by-side table-comparison picture; A: the formal definition of logical equivalence and the ≡ notation
2. **A02 P06 CONTRAST PAIR** — a near-miss pair (matches on 3 of 4 rows, NOT equivalent) vs. a genuine equivalence (matches all 4) (MC-1); one-scenario "equivalence" vs. genuine all-rows equivalence (MC-2); a named equivalence (De Morgan's) VERIFIED by truth table rather than assumed (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Comparing Two Full Truth Tables, Row by Row

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build and compare two complete truth tables for a genuinely equivalent pair before any formal definition; state the formal definition and notation

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (comparing $\neg(P\wedge Q)$ and $\neg P\vee\neg Q$, all four rows):**

| P | Q | P∧Q | ¬(P∧Q) | ¬P | ¬Q | ¬P∨¬Q |
|---|---|-----|--------|----|----|----|
| T | T | T | F | F | F | F |
| T | F | F | T | F | T | T |
| F | T | F | T | T | F | T |
| F | F | F | T | T | T | T |

Compare the $\neg(P\wedge Q)$ column against the $\neg P\vee\neg Q$ column: row 1 (F,F) ✓ match; row 2 (T,T) ✓ match; row 3 (T,T) ✓ match; row 4 (T,T) ✓ match. **Every single row matches — this is what logical equivalence means.**

**Stage P — Pictorial (side-by-side column comparison):**

```
   Row |  ¬(P∧Q)  |  ¬P∨¬Q  |  Match?
   ----+----------+---------+---------
    1  |    F     |    F    |    ✓
    2  |    T     |    T    |    ✓
    3  |    T     |    T    |    ✓
    4  |    T     |    T    |    ✓
   ----+----------+---------+---------
        ALL FOUR ROWS MATCH → equivalent
```

If even ONE row had shown a mismatch (say row 3 showing F,T instead of T,T), the two propositions would NOT be equivalent — equivalence requires unanimous agreement across every row, with no exceptions.

**Stage A — Abstract (formal definition):**

Two compound propositions $\phi$ and $\psi$ are **logically equivalent** (written $\phi\equiv\psi$) iff they have the SAME truth value for EVERY possible assignment of truth values to their component propositions — equivalently, iff the biconditional $\phi\leftrightarrow\psi$ is a **tautology** (true on every row). The example above establishes $\neg(P\wedge Q)\equiv\neg P\vee\neg Q$ — this is **De Morgan's Law**, now VERIFIED, not merely asserted.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Build the full truth table for $P\to Q$ and for $\neg P\vee Q$ (all four rows each), and determine whether they are logically equivalent.

**CORRECT:** $P\to Q$: (T,T)→T; (T,F)→F; (F,T)→T; (F,F)→T. $\neg P\vee Q$: (T,T): ¬P=F, F∨T=T; (T,F): ¬P=F, F∨F=F; (F,T): ¬P=T, T∨T=T; (F,F): ¬P=T, T∨F=T. Comparing all four rows: T=T, F=F, T=T, T=T — **all match, so $P\to Q\equiv\neg P\vee Q$**, a genuine equivalence.
→ "Correct — every row was checked and matched, confirming genuine equivalence, not just a coincidental partial match." → Proceed to A02.

**PARTIAL:** Student computes both tables correctly but only explicitly compares 2 of the 4 rows before concluding equivalence.
→ "Two matching rows out of four is NOT sufficient to conclude equivalence — logical equivalence requires ALL $2^n$ rows to match (here, all 4). Go back and explicitly check the remaining two rows before declaring the result; in this case they do also match, but the conclusion isn't justified until every row has been checked."

**INCORRECT:** Student makes an error in the $\neg P\vee Q$ table (e.g. computing row (F,F) as F instead of T) and concludes the two are NOT equivalent.
→ "Recheck row (F,F) for ¬P∨Q specifically: ¬P with P=F gives ¬P=T. Then T∨Q with Q=F gives T∨F=T (OR is true whenever at least one side is true, and here ¬P=T already satisfies that). The row should read T, not F — redo the full comparison with this correction, and the tables will match on all four rows."

**NO_RESPONSE:** → "P→Q: T,F,T,T (rows TT,TF,FT,FF in order). ¬P∨Q: T,F,T,T. All four rows match — P→Q ≡ ¬P∨Q."

---

### Teaching Action A02 — Exhaustive Comparison, Not Partial or Single-Scenario Matches

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a near-miss pair that matches on most but not all rows; break MC-2 by contrasting a single-scenario match against genuine all-rows equivalence; break MC-3 by verifying (not just asserting) a named equivalence

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — A near-miss: matches on 3 of 4 rows, genuinely NOT equivalent (MC-1):**

Compare $P\wedge Q$ and $P\vee Q$:

| P | Q | P∧Q | P∨Q | Match? |
|---|---|-----|-----|--------|
| T | T | T | T | ✓ |
| T | F | F | T | ✗ |
| F | T | F | T | ✗ |
| F | F | F | F | ✓ |

Rows 1 and 4 match; rows 2 and 3 do NOT. **Two rows out of four matching is NOT close to sufficient** — $P\wedge Q$ and $P\vee Q$ are genuinely, definitively NOT logically equivalent, despite agreeing exactly half the time. A student checking only rows 1 and 4 (the "both same" and "both different" extremes) would wrongly conclude equivalence; the disagreement lives specifically in the "exactly one true" rows.

**Contrast 2 — One matching scenario vs. genuine all-rows equivalence (MC-2):**

Someone observes: "When P is false, both $P\wedge Q$ and $Q$ have the value... let's check: P=F: $P\wedge Q=F\wedge Q=F$ regardless of Q; and $Q$ itself could be T or F. These AREN'T even matching in this one scenario when Q=T ($P\wedge Q=F$ but $Q=T$)." Try a genuinely matching single scenario instead: at P=T, Q=T: $P\wedge Q=T$ and $P\vee Q=T$ — these DO match at this one scenario. But checking the OTHER three scenarios (as in Contrast 1) reveals disagreement at P=T,Q=F and P=F,Q=T. **A match at one specific scenario proves NOTHING about the general equivalence claim** — only checking every row (or proving it holds for arbitrary P, Q algebraically) establishes genuine logical equivalence.

**Contrast 3 — Verifying De Morgan's (¬(P∨Q)≡¬P∧¬Q), not just asserting it (MC-3):**

| P | Q | P∨Q | ¬(P∨Q) | ¬P | ¬Q | ¬P∧¬Q |
|---|---|-----|--------|----|----|----|
| T | T | T | F | F | F | F |
| T | F | T | F | F | T | F |
| F | T | T | F | T | F | F |
| F | F | F | T | T | T | T |

All four rows match ($\neg(P\vee Q)$ column equals $\neg P\wedge\neg Q$ column exactly): F,F,F,T against F,F,F,T. This VERIFIES De Morgan's second law directly — it is not an arbitrary rule to be trusted on authority, but a checkable fact, confirmed here by exhaustive row-by-row comparison exactly like any other equivalence claim in this concept.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Are $P\leftrightarrow Q$ and $(P\to Q)\wedge(Q\to P)$ logically equivalent? Build both truth tables fully and check every row.

**CORRECT:** $P\leftrightarrow Q$: (T,T)→T; (T,F)→F; (F,T)→F; (F,F)→T. $(P\to Q)\wedge(Q\to P)$: (T,T): $T\wedge T=T$; (T,F): $P\to Q=F$, so $F\wedge(\ldots)=F$; (F,T): $Q\to P=F$, so $(\ldots)\wedge F=F$; (F,F): $T\wedge T=T$. Comparing: T,F,F,T against T,F,F,T — **all four rows match, genuinely equivalent.**
→ "Correct — every row checked and matched; this also reveals WHY ↔ is called the 'biconditional': it's literally the conjunction of both directions of →." → Proceed to A03.

**PARTIAL:** Student checks only rows 1 and 4 (where both formulas happen to be T) and concludes equivalence without checking rows 2 and 3.
→ "Rows 1 and 4 matching is a good start, but NOT sufficient — Contrast 1 showed exactly this trap (matching on 2 of 4 rows isn't enough to conclude equivalence in general). Explicitly check rows 2 (P=T,Q=F) and 3 (P=F,Q=T) as well; in this case they also match, but the conclusion isn't earned until all four are verified."

**INCORRECT:** Student concludes "not equivalent" based on a single mismatched row from an arithmetic slip (e.g. miscomputing $Q\to P$ at row 2).
→ "Recheck row (T,F) for $(P\to Q)\wedge(Q\to P)$ specifically: $P\to Q$ with P=T,Q=F is FALSE (true antecedent, false consequent — the one false case for →). Since the whole expression is an AND, and one side is already false, the WHOLE expression is F regardless of the other side — matching $P\leftrightarrow Q$'s F at that row. Redo each row's computation carefully before concluding a mismatch."

**NO_RESPONSE:** → "P↔Q: T,F,F,T. (P→Q)∧(Q→P): T,F,F,T. All four rows match — genuinely equivalent (this is exactly why ↔ means 'both directions of implication hold')."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess exhaustive-comparison discipline, rejection of partial/single-scenario matches, and verification (not assumption) of named equivalences under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Are $\neg\neg P$ and $P$ logically equivalent? Verify by truth table (2 rows suffice here, since only one proposition is involved).

*Solution:* P=T: ¬¬P=¬F=T, matches P=T. P=F: ¬¬P=¬T=F, matches P=F. Both rows match — equivalent (double negation).

**Problem 2:** Are $P\vee Q$ and $Q\vee P$ logically equivalent? Verify all four rows.

*Solution:* Both give T,T,T,F for (T,T),(T,F),(F,T),(F,F) respectively (OR is symmetric in its inputs) — all four rows match, equivalent (commutativity of ∨).

**Problem 3:** A student checks only the row P=T,Q=T for $P\wedge Q$ and $P\to Q$, finds both equal T, and concludes they're equivalent. Show this conclusion is wrong by finding a disagreeing row.

*Solution:* At P=F,Q=F: $P\wedge Q=F$, but $P\to Q$=T (vacuously true, false antecedent). These disagree — NOT equivalent, despite matching at the one row checked.

**Problem 4:** Verify $P\to Q \equiv \neg Q\to\neg P$ (the contrapositive) by truth table, all four rows.

*Solution:* $P\to Q$: T,F,T,T. $\neg Q\to\neg P$: (T,T): ¬Q=F,¬P=F, F→F=T; (T,F): ¬Q=T,¬P=F, T→F=F; (F,T): ¬Q=F,¬P=T, F→T=T; (F,F): ¬Q=T,¬P=T, T→T=T. Result: T,F,T,T — matches all four rows, equivalent.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A student is asked to determine whether $(P\wedge Q)\vee(P\wedge\neg Q)$ is logically equivalent to $P$.

(a) Build the full truth table for $(P\wedge Q)\vee(P\wedge\neg Q)$ (all four rows) and for $P$ (trivially, just P's own column), and determine whether they are equivalent.
(b) A classmate argues: "These can't be equivalent, because the left side is a complicated compound expression with three connectives, and $P$ is just a single proposition — they're not even the 'same kind' of formula." Evaluate this argument.
(c) Using algebraic manipulation with a NAMED equivalence law (distributivity: $P\wedge(Q\vee\neg Q)$, or factor differently), show HOW the left side simplifies down to $P$ alone, connecting this to why the truth-table verification in (a) succeeds.

**Expected solution:**

(a) $(P\wedge Q)\vee(P\wedge\neg Q)$: (T,T): $(T\wedge T)\vee(T\wedge F)=T\vee F=T$. (T,F): $(T\wedge F)\vee(T\wedge T)=F\vee T=T$. (F,T): $(F\wedge T)\vee(F\wedge F)=F\vee F=F$. (F,F): $(F\wedge F)\vee(F\wedge T)=F\vee F=F$. Result: T,T,F,F — matches $P$'s own column (T,T,F,F) exactly on all four rows. **Equivalent.**

(b) The classmate's argument is **invalid** — logical equivalence is entirely a matter of matching TRUTH VALUES across every row, not a matter of "looking similar" or having the same syntactic complexity/structure. A long, complicated formula can be perfectly equivalent to a very short one (exactly as demonstrated in (a)) — complexity of the FORMULA and truth-value behavior are independent properties; the only test that matters is the row-by-row truth-value comparison, which (a) already carried out successfully regardless of how different the two formulas "look."

(c) Factor $P$ out of both terms: $(P\wedge Q)\vee(P\wedge\neg Q) = P\wedge(Q\vee\neg Q)$ (distributivity of ∧ over ∨, run in reverse — factoring). Now $Q\vee\neg Q$ is itself ALWAYS true (a tautology — Q is either true or false, and at least one of Q, ¬Q must hold), so $P\wedge(Q\vee\neg Q) \equiv P\wedge T \equiv P$ (since ANDing with a guaranteed-true value never changes the other side's truth value — check: if P=T, $T\wedge T=T$; if P=F, $F\wedge T=F$, both matching P exactly). This algebraic derivation EXPLAINS, at a structural level, why the truth-table verification in (a) succeeds row by row: the original expression is really just $P$ combined with an always-true "no-op" term ($Q\vee\neg Q$), so simplifying reveals $P$ was there all along, and the truth table simply confirms this algebraic fact empirically, row by row.

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

- MASTERY ACHIEVED → unlock math.found.rules-of-inference and math.disc.boolean-circuits; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.found.logical-equivalence assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — PARTIAL-MATCH-MEANS-EQUIVALENT (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Concluding equivalence after checking only some rows is PARTIAL-MATCH-MEANS-EQUIVALENT. Logical equivalence requires ALL rows to match — checking a few (even most) rows is never sufficient."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "P∧Q and P∨Q agree at (T,T) and (F,F). Are they logically equivalent?"
- MC-1 response: "Yes, since they match at those rows."

**[P64 — CONCEPTUAL SHIFT]**
"Check the OTHER two rows too, always: at (T,F), $P\wedge Q=F$ but $P\vee Q=T$ — disagreement. At (F,T), $P\wedge Q=F$ but $P\vee Q=T$ — disagreement again. Two matches out of four rows is exactly HALF, and it's still not remotely enough — even matching on 3 of 4 rows fails, since ONE disagreeing row is enough to disqualify equivalence entirely. There is no partial credit; equivalence means unanimous agreement, full stop."

Practice: Check all four rows for $P\to Q$ versus $Q\to P$ (the converse) and confirm they are NOT equivalent by finding the disagreeing row(s).

---

### Repair Action B02 — ONE-SCENARIO-MATCH-MEANS-EQUIVALENT (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Generalizing from one matching truth-value scenario to full equivalence is ONE-SCENARIO-MATCH-MEANS-EQUIVALENT. A single scenario matching proves nothing about the OTHER scenarios, which must be checked independently."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "At P=T, Q=T, both $P\wedge Q$ and $P$ equal T. Are they equivalent?"
- MC-2 response: "Yes, since they agree there."

**[P64 — CONCEPTUAL SHIFT]**
"Check a DIFFERENT scenario: at P=T, Q=F: $P\wedge Q=F$, but $P=T$ — these DISAGREE. One matching scenario (T,T) tells you nothing about what happens at other truth-value assignments; each of the $2^n$ rows is an independent fact to verify, and disagreement at even one of them (as found here) settles the matter: NOT equivalent."

Practice: Find a scenario where $P\vee Q$ and $Q$ agree, then find a DIFFERENT scenario where they disagree, confirming they are not equivalent overall despite the first match.

---

### Repair Action B03 — EQUIVALENCES-ARE-ARBITRARY-RULES (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Treating named equivalences (De Morgan's, etc.) as arbitrary memorized templates is EQUIVALENCES-ARE-ARBITRARY-RULES. Every such rule is a PROVABLE fact, verifiable by truth table — treat it as checkable, not as received wisdom."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "State De Morgan's law for ¬(P∨Q). How do you know it's actually true?"
- MC-3 response: recites "¬P∧¬Q" correctly but cannot explain how to verify it, or says "it's just a rule."

**[P64 — CONCEPTUAL SHIFT]**
"Verify it directly, the same way as any other equivalence claim in this concept: build both truth tables (¬(P∨Q) and ¬P∧¬Q) across all four rows, and check they match everywhere. They do (F,F,F,T against F,F,F,T) — THAT is how you know it's true, not because a textbook asserts it. Every named law in logic is checkable this same way; if you ever forget or doubt a rule, rebuild the truth table rather than guessing or relying on memory alone."

Practice: Verify $P\to Q \equiv \neg Q \to \neg P$ (the contrapositive) yourself by truth table, rather than taking it as a given rule.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Reconstruct De Morgan's law verification (¬(P∧Q)≡¬P∨¬Q) from scratch, all four rows |
| SR-2 | +3 days | Find a fresh near-miss pair (matching on some but not all rows) and confirm they are NOT equivalent |
| SR-3 | +7 days | Verify a fresh named equivalence (e.g. the contrapositive) by full truth table rather than reciting it |
| SR-4 | +14 days | Reconstruct the algebraic-factoring argument from the A03 transfer probe, connecting it to the truth-table verification |

Retrieval flag: if student concludes equivalence from a partial-row match (MC-1) or a single scenario (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.found.truth-table | Supplies the exhaustive row-by-row evaluation tool used throughout this concept to VERIFY equivalence claims |
| Requires (Tier-1) | math.found.logical-connectives | Supplies the connectives (¬,∧,∨,→,↔) combined into the compound propositions being compared |
| Unlocks | math.found.rules-of-inference | Valid inference rules rely on logically equivalent reformulations (e.g. modus tollens via the contrapositive equivalence verified here) |

**GR-9:** cross_links: math.disc.boolean-circuits is listed in the KG but has **no authored blueprint yet** — P76_mode is therefore set to independence for now; once math.disc.boolean-circuits is authored, a future revision may add a genuine cross-link probe connecting logical equivalence directly to circuit simplification (equivalent circuits implement logically equivalent boolean expressions).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching other h=3, foundational/analyze concepts
- bloom=analyze → checkpoints and the gate require multi-step comparison (build two tables, compare every row, draw a conclusion), consistent with the KG's analyze designation
- CPA_entry = C for a foundational learner: two full truth tables, built and compared row by row for a genuine equivalence (De Morgan's), anchor the exhaustive-comparison discipline before any near-miss or single-scenario trap is introduced

**Key teaching insight:** MC-1 and MC-2 are the same underlying error at different scales (checking SOME rows vs. checking exactly ONE row) — both stem from failing to recognize that logical equivalence is an EXHAUSTIVE, all-rows claim. A02's Contrast 1 (a near-miss matching 2 of 4 rows) is deliberately placed before Contrast 2 (a single-scenario match) so the student sees the "partial match" trap generalize downward to its most extreme form (just one row), rather than encountering the single-scenario version first and treating it as a separate, unrelated error.

**MC-3 as the concept's payoff:** Once exhaustive verification is established as the ONLY valid method (via MC-1/MC-2's repairs), MC-3 addresses the natural next question — why should named laws like De Morgan's be trusted at all? — by insisting every named equivalence be treated as a truth-table-checkable claim like any other, not a special, unquestionable rule; this directly prepares students to verify unfamiliar equivalences confidently in later concepts (rules of inference, Boolean circuit simplification) rather than relying on incomplete memorization.

**Sequencing note (cross-link):** math.disc.boolean-circuits (where equivalent circuits implement logically equivalent expressions) is not yet authored in the corpus; this blueprint's exhaustive-verification method is exactly the tool that future concept will need, and Component 7 records the pending cross-link for a future authoring pass.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.found.logical-equivalence ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.found.truth-table ✓, math.found.logical-connectives ✓ | PASS |
| V-3 | CPA entry = C for foundational difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=analyze → multi-step comparison recommended | Two-table build-and-compare tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=4/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.8×5⌉=⌈4⌉=4; PASS=4/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Algebraic factoring argument connecting structure to truth-table verification ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

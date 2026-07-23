# math.found.logical-equivalence
**Educational Brain Entry** | Mathematics — Foundations
**KG node**: `math.found.logical-equivalence` | difficulty: foundational | bloom: analyze | estimated_hours: 3
**Standard**: EDUCATIONAL_BRAIN_STANDARD.md v1.0 | Entry version: 1.0 | Date: 2026-07-23

---

## 1. Concept Identity

**One-line definition**: Two propositions are logically equivalent when they have identical truth values for every possible assignment of truth values to their constituent variables.

**Why this concept exists in the KG**: Logical equivalence is the structural backbone of mathematical proof manipulation — it licenses the replacement of one expression with another without altering meaning, enabling simplification, canonical form reduction, and proof by substitution.

**Canonical KG node data**:
- requires: `math.found.truth-table`, `math.found.logical-connectives`
- unlocks: (downstream proof and logic nodes)
- bloom: analyze
- mastery_threshold: 0.75
- estimated_hours: 3

---

## 2. Blueprint References

Blueprint file: `docs/curriculum/blueprints/math.found.logical-equivalence.md`

Key teaching objectives extracted (do not duplicate prose):
- LO1: Verify equivalence by constructing and comparing truth tables
- LO2: Apply named equivalences (De Morgan's, double negation, contrapositive, distribution)
- LO3: Replace subexpressions in compound propositions using equivalences

Blueprint misconception registry (cited by ID, birth-type added):
- MC-1 PARTIAL-MATCH-MEANS-EQUIVALENT: checking only some rows of a truth table and concluding equivalence — Type 1 (overgeneralization of insufficient sample)
- MC-2 ONE-SCENARIO-MATCH: finding one assignment where P and Q agree and concluding they are equivalent — Type 1 (same overgeneralization, single-case variant)
- MC-3 EQUIVALENCES-ARE-ARBITRARY-RULES: treating named laws as memorisation items rather than verifiable identities — Type 5 (instruction-induced: rote-law teaching without verification)

---

## 3. Mental Models

**Primary model — The Identical Shadow**: Two statements are logically equivalent if, no matter what world (truth assignment) you step into, they cast the same shadow (truth value). Equivalence is not about what the statements say; it is about whether they are always in agreement.

**Secondary model — Substitution License**: A named equivalence is a coupon: wherever you see one side, you may swap in the other, and the mathematical sentence remains equally true or false. The coupon is only valid because truth tables confirm the swap never changes the outcome.

**Anti-model**: "They say similar things" is not equivalence. P: "It is raining" and Q: "The ground is wet" often agree, but they are not logically equivalent — one can be true while the other is false.

---

## 4. Misconception Library

### MC-1: Partial-Row Equivalence (Type 1 — overgeneralization)
**Verbatim probe phrases**: "I checked it for T,T and T,F — those match, so they must be equivalent." / "Three out of four rows match, close enough."
**Mechanism**: Student generalizes from a subset of truth table rows to all rows — treats "usually the same" as "always the same."
**Diagnostic signature**: Produces incomplete truth tables; accepts partial matches as proof.
**Repair**: Require full table construction for at least two named equivalences before accepting any partial check. Emphasize: equivalence is a universal quantifier claim ("for ALL assignments"), so a single counterexample row falsifies it.
**Collision design** (birth-type 1 = needs concrete counterexample, not re-explanation):
Show P∨(Q∧R) vs (P∨Q)∧R. Rows for (T,T,T),(T,T,F),(T,F,T) agree; row (F,T,T) differs. Ask student to evaluate that row themselves before revealing it.

### MC-2: Single-Instance Match (Type 1 — overgeneralization, extreme variant)
**Verbatim probe phrases**: "When P is true and Q is true, both come out true — they're the same." / "I found a case where they agree."
**Mechanism**: Student confuses satisfiability (there exists an agreement) with equivalence (every assignment agrees).
**Diagnostic signature**: Cites a single row as proof; does not spontaneously check other rows.
**Repair**: Contrast with the identity p∧q: it agrees with p∨q when both are true, yet clearly differs otherwise. Use the contrapositive of the definition: "to prove equivalence you need ALL rows; to disprove it you need just ONE."

### MC-3: Equivalences as Memorisation (Type 5 — instruction-induced)
**Verbatim probe phrases**: "De Morgan's just says flip and switch — I don't know why." / "I just remember the formula."
**Mechanism**: Teacher presented named laws as rules to memorise, not as verified table-to-table comparisons. Student cannot reconstruct them and therefore cannot apply them flexibly.
**Repair**: Have student derive De Morgan's ¬(P∧Q)≡¬P∨¬Q from scratch by building both columns of a truth table. Once the student has produced the truth table themselves, the law becomes a retrieval label for something they understand, not an arbitrary string.
**Burned-collision note**: If a student gets De Morgan's wrong in practice after table derivation, re-verify column by column with a concrete substitution (P="door is locked", Q="window is closed") before suspecting a different misconception.

---

## 5. Explanation Library

### Core explanation (concrete — preferred entry point)
Logical equivalence asks one question: do these two statements always agree, no matter what? Build a truth table with one column for each statement. If every row has matching truth values, the statements are logically equivalent; if any row differs, they are not.

Example: Is ¬(P∧Q) equivalent to ¬P∨¬Q (De Morgan's first law)?

| P | Q | P∧Q | ¬(P∧Q) | ¬P | ¬Q | ¬P∨¬Q |
|---|---|-----|--------|----|----|-------|
| T | T |  T  |   F    |  F |  F |   F   |
| T | F |  F  |   T    |  F |  T |   T   |
| F | T |  F  |   T    |  T |  F |   T   |
| F | F |  F  |   T    |  T |  T |   T   |

Column 4 and column 7 are identical — so yes, they are equivalent. We write ¬(P∧Q) ≡ ¬P∨¬Q.

### Misconception-repair explanation (for MC-1/MC-2)
Equivalence is a universal claim, not a majority claim. The moment you find one row where the two expressions differ, equivalence is gone. Partial matching is never enough — you must complete the full table. This is why mathematicians say "equivalent" only after checking every case.

### Formal framing (for advanced students)
P ≡ Q is defined as (P→Q)∧(Q→P) — mutual implication. Alternatively, P ≡ Q iff P↔Q is a tautology (true in every row). All named equivalences (commutativity, associativity, distributivity, De Morgan's, double negation, contrapositive, implication rewrite) can be verified by constructing a truth table for P↔Q and confirming every row is T.

---

## 6. Analogy Library

**Analogy**: Two maps of the same city from different publishers are "equivalent" if every location one marks, the other marks too — not just most locations, not just the downtown area. One unmarked shared road breaks the claim.

**Anti-analogy to retire**: "P and Q are equivalent if they seem to say the same thing." Natural-language paraphrase is not logical equivalence. "The door is not both locked and open" and "the door is unlocked or closed" feel synonymous — but logical equivalence asks you to verify that claim formally, not to trust intuition.

---

## 7. Demonstration Library

**Concrete demonstration — Derive De Morgan's yourself**:
1. Write out all four (P,Q) combinations: (T,T),(T,F),(F,T),(F,F).
2. For each, compute P∧Q, then negate it.
3. For each, compute ¬P and ¬Q separately, then take their disjunction.
4. Compare columns 2 and 3 row by row.
5. Student observes they always match — and has now proved De Morgan's first law.

**Concrete demonstration — Find the counterexample**:
Claim: P→Q ≡ P∧Q.
Student evaluates (T,F): P→Q = F; P∧Q = F — match. (F,T): P→Q = T; P∧Q = F — mismatch. Claim refuted. This exercise trains the reflex to look for counterexamples before accepting an equivalence.

---

## 8. Discovery vs. Direct Instruction

**Recommendation**: Guided discovery for the definition; direct instruction for named laws after discovery.

**Rationale**: Let students verify two or three equivalences from scratch (truth table construction) before naming them. Once the student has the verification procedure, name the patterns (De Morgan's, double negation, contrapositive) as labels for things already discovered. Naming before discovery produces MC-3.

**Discovery lesson sketch**:
- Present ¬(P∨Q) and ¬P∧¬Q. Ask: "Are these the same?" (Student guesses.)
- Walk through table construction together.
- Reveal they match. Ask: "What would make them NOT match?"
- Present a non-equivalence and have student find the counterexample row.
- Introduce notation ≡ as shorthand for "always the same."

---

## 9. Teaching Action Dispatch

| Student state | Recommended action | Source |
|---|---|---|
| Has correct procedure, slow execution | DRILL: full truth table, timed | Teaching Actions: DO §3 |
| MC-1 or MC-2 active | ERROR ANALYSIS: find the counterexample row themselves | Teaching Actions: TEST-THINKING §5 |
| MC-3 active (memorisation only) | WORKED EXAMPLE: derive De Morgan's from scratch | Teaching Actions: SHOW §1 |
| Conceptually solid, needs transfer | THOUGHT EXPERIMENT: "Can two statements be equivalent if they have different numbers of variables?" | Teaching Actions: TEST-THINKING §4 |
| FRAGILE (hesitant-correct) | ANALOGY: the identical-shadow model, then confirm with one more table | Teaching Actions: TELL §2 |

---

## 10. Voice Teaching

**Register**: Calm and precise. Equivalence is not intuitive — resist the urge to say "they're the same thing" without immediately following with "let me show you what same means here."

**Wait-time rule**: After asking "are these two expressions equivalent?", wait for the student's guess before touching the table. Premature table construction prevents the student from noticing their own uncertainty.

**Prosody markers**: Slight emphasis on "every" in "every row must match" — the universal quantifier is the concept, and students who miss the emphasis miss the concept.

**Load-bearing sentences**:
- "Equivalence is a promise: no matter what truth values you plug in, these two expressions give the same result."
- "One mismatch anywhere ends the equivalence."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7` for current instrument availability. In text channel, use the table-construction demonstration as the primary instrument (observable step-by-step output replaces prosodic latency signals).

---

## 11. Assessment Gate Set

**Gate 1 (RECOGNITION)**: Given a completed truth table for two propositions, state whether they are equivalent and justify with one sentence. Pass: correct verdict with correct justification citing all rows.

**Gate 2 (INDEPENDENT construction)**: Given P: ¬(P→Q) and Q: P∧¬Q, construct the full truth table and determine equivalence without assistance. Pass: correct table, correct verdict.

**Gate 3 (TRANSFER — application of named law)**: Simplify ¬(A∨¬B) using De Morgan's law, showing each substitution step. Pass: arrives at ¬A∧B with correctly labelled steps.

**Gate 4 (MISCONCEPTION probe)**: "A student checked only the first two rows of a truth table and said the expressions are equivalent. What, if anything, is wrong with this?" Pass: identifies the need for all rows; names a counterexample strategy.

**Mastery criterion**: Pass Gates 1–3 independently; correct response on Gate 4. Consistent with KG mastery_threshold 0.75.

---

## 12. Concept-Specific Recovery Notes

**If Gates 1–2 fail**: Student is constructing truth tables incorrectly — likely a prerequisite gap in `math.found.truth-table`. Back up: verify student can correctly evaluate a single compound proposition before re-entering equivalence.

**If Gate 3 fails but 1–2 pass**: Named-law application is the gap. Demonstrate one full substitution step with narration, then have student complete the remaining steps.

**If Gate 4 fails**: MC-1 or MC-2 is active. Deploy ERROR ANALYSIS action: produce a non-equivalent pair and ask student to find the row that differs. Do not re-explain the definition — the student needs to encounter the counterexample themselves.

**Stuck-learner script** (from `foundations/01-recovery-engine.md §3`): "Let's slow down. Instead of the whole problem, just tell me: what does it mean for two things to be logically equivalent?" If student cannot answer, the concept anchor is missing — restart from the Identical Shadow mental model.

---

## 13. Memory Typing

**Memory type**: Declarative + procedural composite.

**Forgetting profile**: The procedure (table construction) is robust once practised. Named equivalences (De Morgan's, contrapositive) are fragile if learned by rote — they decay to verbal strings within weeks. Anchor them to verified examples to slow decay.

**Spaced retrieval targets**:
- Session +1: Can student reconstruct De Morgan's without the formula? (Tests procedure retention)
- Session +7: Apply the contrapositive equivalence in a proof context.
- Session +30: Identify which equivalence law licenses a given substitution step.

---

## 14. Transfer Map

**Near transfer**:
- Propositional proof simplification (replace subexpressions using equivalences)
- Contrapositive proof strategy (P→Q ≡ ¬Q→¬P)

**Far transfer**:
- Set-theoretic identities (De Morgan's laws for sets are structurally identical)
- Boolean algebra in digital circuits (same laws, different notation)
- Predicate logic generalisation (equivalence of quantified statements)

**Transfer prerequisite**: Student must first have the verification procedure (truth table construction) as automatic before transfer tasks succeed. Do not introduce far transfer while the procedure itself is FRAGILE.

---

## 15. Curriculum Feedback

No structural KG issues found. The three blueprint misconceptions (MC-1, MC-2, MC-3) are well-specified and map cleanly to the birth-type taxonomy. The concept is correctly placed at foundational difficulty — truth table construction is the only prerequisite skill, and it is already authored.

**Standing KG note (from Wave 2)**: The `math.found.logical-connectives`/`math.found.mathematical-notation` overlap remains an open KGCS review item — not resolved here.

---

## 16. Blueprint References (runtime)

Blueprint: `docs/curriculum/blueprints/math.found.logical-equivalence.md`
Cross-references within Blueprint (do not duplicate): worked example on De Morgan's verification, practice problems on simplification, assessment items on contrapositive application.

---

## 17. Runtime Asset References

- Explanation Memory assets: to be seeded from Section 5 (core + repair explanations)
- Probe assets: Gate 2 (independent table construction) and Gate 4 (misconception probe) are suitable MCQ/misconception-probe seeds
- Visual asset: truth table side-by-side comparison (column-match highlighting) — ADR 12 Visual Asset Model, background-authored

---

## 18. Authoring Notes

All misconception birth-type classifications applied using the 7-question diagnostic from `educational-brain/misconceptions/01-birth-types.md`. Named-law examples cross-checked against Blueprint MC registry — no new MCs found beyond Blueprint's three. The three gates map to LO1 (Gate 1), LO2 (Gate 3), and MC-probe (Gate 4).

---

## 19. Open Questions

None blocking. The open KG overlap (notation/symbols) is carried forward as a KGCS review item, not an EB authoring blocker.

---

## 20. Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-23 | Human Curator (Domain Certification Mode, Wave 6) | Initial entry |

---

## 21. Certification Status

- [ ] Layer 1 (Blueprint): ✅ EXISTS — `docs/curriculum/blueprints/math.found.logical-equivalence.md`
- [ ] Layer 2 (Educational Brain): ✅ THIS ENTRY
- [ ] Layer 3/7 (Explanation/Probe DB assets): N/A — runtime/pipeline-owned
- [ ] Layer 5 (Lesson Assets): N/A — runtime-generated
- [ ] Layer 6 (Visualizations): N/A — ADR 12 pipeline-owned
- [ ] Layer 8 (Practice): N/A — runtime-generated
- [ ] Layer 9 (Adaptive Tutoring): N/A — `decide()` consumes this entry
- [ ] Layer 10 (Certification): Layers 1–2 complete ✅

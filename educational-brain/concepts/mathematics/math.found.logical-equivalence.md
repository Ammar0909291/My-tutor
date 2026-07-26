# Logical Equivalence — `math.found.logical-equivalence`

## Identity

- **Concept ID**: `math.found.logical-equivalence` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.truth-table`, `math.found.logical-connectives`
  — verifying equivalence requires constructing and comparing truth
  tables built from the connectives.
- **Unlocks**: downstream proof and logic nodes (per KG node data).
- **Related** (from KG `cross_links`): `math.disc.boolean-circuits` (not
  yet authored).
- **Difficulty**: foundational · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.found.logical-equivalence.md`.

## Learning Objective

The learner can: verify equivalence by constructing and comparing full
truth tables; apply named equivalences (De Morgan's, double negation,
contrapositive, distribution) after deriving at least one from scratch;
and replace subexpressions in compound propositions using verified
equivalences.

## Core Understanding

Two propositions are logically equivalent when they have identical
truth values for every possible assignment of truth values to their
constituent variables. Verifying equivalence means building a truth
table with one column for each statement: if every row has matching
truth values, the statements are logically equivalent (written P ≡ Q);
if any single row differs, they are not. This is a universal claim, not
a majority claim — the moment one row disagrees, equivalence is gone,
no matter how many other rows agree. Formally, P ≡ Q is defined as
(P→Q)∧(Q→P) — mutual implication — or equivalently, P ≡ Q iff P↔Q is a
tautology (true in every row). All named equivalences (commutativity,
associativity, distributivity, De Morgan's, double negation,
contrapositive, implication rewrite) are not arbitrary rules to
memorize — each can be, and should be, verified by constructing a truth
table for P↔Q and confirming every row is T. Once verified, a named
equivalence functions as a substitution license: wherever one side
appears in a larger expression, the other side may be swapped in
without changing the expression's truth value, because the truth tables
guarantee the swap never changes the outcome.

## Mental Models

- **Beginner model — "they say similar things, so they're equivalent"**:
  the learner judges equivalence by informal paraphrase or intuitive
  similarity rather than by verification. Shelf-life warning: natural-
  language paraphrase routinely diverges from logical equivalence (e.g.
  "it is raining" and "the ground is wet" feel synonymous but are not
  logically equivalent), and this model fails the moment a genuinely
  non-equivalent but superficially similar pair is presented.
- **Intermediate model — "equivalence means every row of a full truth
  table matches"**: the learner correctly constructs and compares
  complete truth tables for concrete propositions, but may still treat
  named laws (De Morgan's, contrapositive) as memorized strings rather
  than verified, derivable identities. Upgrade trigger: being asked to
  derive a named law from scratch via truth table rather than recite it.
- **Advanced model — "P≡Q iff P↔Q is a tautology, and every named law is
  a derivable, substitutable identity"**: the learner reaches for the
  formal P↔Q-tautology criterion as the general validity test and treats
  named equivalences as reusable, verified substitution licenses rather
  than a fixed list to memorize. Upgrade trigger: being asked to
  simplify a compound proposition using a chain of named equivalences,
  justifying each substitution step.
- **Do not upgrade early**: a learner still judging equivalence by
  informal paraphrase (beginner model) should not be pushed into named-
  law substitution chains (advanced model) before the exhaustive, full-
  table verification habit is itself secure — substitution without
  verified grounding reproduces exactly the rote-memorization failure
  this concept is designed to prevent.

## Why Students Fail

The dominant failure generalizes from a subset of truth table rows to
all rows — treating "usually the same" or "mostly matches" as "always
the same," an easy trap since equivalence IS a universal quantifier
claim and a partial check can look identical to a complete one until the
missing rows are actually examined. A second, closely related failure
confuses satisfiability (there exists some assignment where P and Q
agree) with equivalence (every assignment agrees) — citing a single
matching case as proof, without spontaneously checking whether other
assignments might disagree. A third, independent failure treats named
equivalences as arbitrary rules to memorize rather than as identities
that can be verified and reconstructed — a direct consequence of
instruction that presents laws like De Morgan's as formulas to apply
rather than facts to derive, leaving students unable to reconstruct or
flexibly apply them once the exact memorized wording is forgotten.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: Partial-Row Equivalence (Type 1 — overgeneralization)
**Verbatim probe phrases**: "I checked it for T,T and T,F — those
match, so they must be equivalent." / "Three out of four rows match,
close enough."
**Mechanism**: Student generalizes from a subset of truth table rows to
all rows — treats "usually the same" as "always the same."
**Diagnostic signature**: Produces incomplete truth tables; accepts
partial matches as proof.
**Repair**: Require full table construction for at least two named
equivalences before accepting any partial check. Emphasize: equivalence
is a universal quantifier claim ("for ALL assignments"), so a single
counterexample row falsifies it.
**Collision design** (birth-type 1 = needs concrete counterexample, not
re-explanation): Show P∨(Q∧R) vs (P∨Q)∧R. Rows for (T,T,T),(T,T,F),
(T,F,T) agree; row (F,T,T) differs. Ask student to evaluate that row
themselves before revealing it.

### MC-2: Single-Instance Match (Type 1 — overgeneralization, extreme variant)
**Verbatim probe phrases**: "When P is true and Q is true, both come
out true — they're the same." / "I found a case where they agree."
**Mechanism**: Student confuses satisfiability (there exists an
agreement) with equivalence (every assignment agrees).
**Diagnostic signature**: Cites a single row as proof; does not
spontaneously check other rows.
**Repair**: Contrast with the identity p∧q: it agrees with p∨q when
both are true, yet clearly differs otherwise. Use the contrapositive of
the definition: "to prove equivalence you need ALL rows; to disprove it
you need just ONE."

### MC-3: Equivalences as Memorisation (Type 5 — instruction-induced)
**Verbatim probe phrases**: "De Morgan's just says flip and switch — I
don't know why." / "I just remember the formula."
**Mechanism**: Teacher presented named laws as rules to memorise, not as
verified table-to-table comparisons. Student cannot reconstruct them
and therefore cannot apply them flexibly.
**Repair**: Have student derive De Morgan's ¬(P∧Q)≡¬P∨¬Q from scratch
by building both columns of a truth table. Once the student has produced
the truth table themselves, the law becomes a retrieval label for
something they understand, not an arbitrary string.
**Burned-collision note**: If a student gets De Morgan's wrong in
practice after table derivation, re-verify column by column with a
concrete substitution (P="door is locked", Q="window is closed") before
suspecting a different misconception.

## Analogies

**Primary — two maps of the same city**: Two maps of the same city from
different publishers are "equivalent" if every location one marks, the
other marks too — not just most locations, not just the downtown area.
One unmarked shared road breaks the claim.

**Anti-analogy to retire**: "P and Q are equivalent if they seem to say
the same thing." Natural-language paraphrase is not logical equivalence.
"The door is not both locked and open" and "the door is unlocked or
closed" feel synonymous — but logical equivalence asks you to verify
that claim formally, not to trust intuition.

## Demonstrations

**Derive De Morgan's yourself**: (1) Write out all four (P,Q)
combinations: (T,T),(T,F),(F,T),(F,F). (2) For each, compute P∧Q, then
negate it. (3) For each, compute ¬P and ¬Q separately, then take their
disjunction. (4) Compare columns 2 and 3 row by row. (5) Student
observes they always match — and has now proved De Morgan's first law.

**Find the counterexample**: Claim: P→Q ≡ P∧Q. Student evaluates (T,F):
P→Q = F; P∧Q = F — match. (F,T): P→Q = T; P∧Q = F — mismatch. Claim
refuted. This exercise trains the reflex to look for counterexamples
before accepting an equivalence.

**Worked example table — De Morgan's first law**:

| P | Q | P∧Q | ¬(P∧Q) | ¬P | ¬Q | ¬P∨¬Q |
|---|---|-----|--------|----|----|-------|
| T | T |  T  |   F    |  F |  F |   F   |
| T | F |  F  |   T    |  F |  T |   T   |
| F | T |  F  |   T    |  T |  F |   T   |
| F | F |  F  |   T    |  T |  T |   T   |

Column 4 and column 7 are identical — so yes, they are equivalent. We
write ¬(P∧Q) ≡ ¬P∨¬Q.

## Discovery Questions

Present ¬(P∨Q) and ¬P∧¬Q. Ask: "Are these the same?" (Student guesses.)
Walk through table construction together. Reveal they match. Ask: "What
would make them NOT match?" Present a non-equivalence and have student
find the counterexample row. Introduce notation ≡ as shorthand for
"always the same." Recommendation: guided discovery for the definition;
direct instruction for named laws after discovery — let students verify
two or three equivalences from scratch before naming them, since naming
before discovery produces MC-3.

## Teaching Sequence

MC-1 (partial-row equivalence) and MC-2 (single-instance match) are
addressed together first, since both stem from the identical root cause
— under-checking the universal quantifier claim — and are both directly
resolvable via the same full-table-construction habit. MC-3
(equivalences as memorisation) is addressed last, once the verification
habit is secure, since deriving a named law from scratch presupposes the
student already trusts and can execute the full-table method.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| Has correct procedure, slow execution | DRILL: full truth table, timed | Teaching Actions: DO §3 |
| MC-1 or MC-2 active | ERROR ANALYSIS: find the counterexample row themselves | Teaching Actions: TEST-THINKING §5 |
| MC-3 active (memorisation only) | WORKED EXAMPLE: derive De Morgan's from scratch | Teaching Actions: SHOW §1 |
| Conceptually solid, needs transfer | THOUGHT EXPERIMENT: "Can two statements be equivalent if they have different numbers of variables?" | Teaching Actions: TEST-THINKING §4 |
| FRAGILE (hesitant-correct) | ANALOGY: the identical-shadow model, then confirm with one more table | Teaching Actions: TELL §2 |

## Voice Teaching Notes

**Register**: Calm and precise. Equivalence is not intuitive — resist
the urge to say "they're the same thing" without immediately following
with "let me show you what same means here."

**Wait-time rule**: After asking "are these two expressions
equivalent?", wait for the student's guess before touching the table.
Premature table construction prevents the student from noticing their
own uncertainty.

**Prosody markers**: Slight emphasis on "every" in "every row must
match" — the universal quantifier is the concept, and students who miss
the emphasis miss the concept.

**Load-bearing sentences**:
- "Equivalence is a promise: no matter what truth values you plug in,
  these two expressions give the same result."
- "One mismatch anywhere ends the equivalence."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`
for current instrument availability. In text channel, use the table-
construction demonstration as the primary instrument (observable
step-by-step output replaces prosodic latency signals).

## Assessment Signals

**Gate 1 (RECOGNITION)**: Given a completed truth table for two
propositions, state whether they are equivalent and justify with one
sentence. Pass: correct verdict with correct justification citing all
rows.

**Gate 2 (INDEPENDENT construction)**: Given P: ¬(P→Q) and Q: P∧¬Q,
construct the full truth table and determine equivalence without
assistance. Pass: correct table, correct verdict.

**Gate 3 (TRANSFER — application of named law)**: Simplify ¬(A∨¬B)
using De Morgan's law, showing each substitution step. Pass: arrives at
¬A∧B with correctly labelled steps.

**Gate 4 (MISCONCEPTION probe)**: "A student checked only the first two
rows of a truth table and said the expressions are equivalent. What, if
anything, is wrong with this?" Pass: identifies the need for all rows;
names a counterexample strategy.

**Mastery criterion**: Pass Gates 1–3 independently; correct response
on Gate 4. Consistent with KG mastery_threshold 0.75.

## Tutor Recovery Strategy

**If Gates 1–2 fail**: Student is constructing truth tables incorrectly
— likely a prerequisite gap in `math.found.truth-table`. Back up: verify
student can correctly evaluate a single compound proposition before
re-entering equivalence.

**If Gate 3 fails but 1–2 pass**: Named-law application is the gap.
Demonstrate one full substitution step with narration, then have
student complete the remaining steps.

**If Gate 4 fails**: MC-1 or MC-2 is active. Deploy ERROR ANALYSIS
action: produce a non-equivalent pair and ask student to find the row
that differs. Do not re-explain the definition — the student needs to
encounter the counterexample themselves.

**Stuck-learner script** (from `foundations/01-recovery-engine.md §3`):
"Let's slow down. Instead of the whole problem, just tell me: what does
it mean for two things to be logically equivalent?" If student cannot
answer, the concept anchor is missing — restart from the Identical
Shadow mental model.

## Memory Hooks

**Memory type**: Declarative + procedural composite.

**Forgetting profile**: The procedure (table construction) is robust
once practised. Named equivalences (De Morgan's, contrapositive) are
fragile if learned by rote — they decay to verbal strings within weeks.
Anchor them to verified examples to slow decay.

**Spaced retrieval targets**:
- Session +1: Can student reconstruct De Morgan's without the formula?
  (Tests procedure retention)
- Session +7: Apply the contrapositive equivalence in a proof context.
- Session +30: Identify which equivalence law licenses a given
  substitution step.

## Transfer Connections

**Near transfer**:
- Propositional proof simplification (replace subexpressions using
  equivalences)
- Contrapositive proof strategy (P→Q ≡ ¬Q→¬P)

**Far transfer**:
- Set-theoretic identities (De Morgan's laws for sets are structurally
  identical)
- Boolean algebra in digital circuits (same laws, different notation)
- Predicate logic generalisation (equivalence of quantified statements)

**Transfer prerequisite**: Student must first have the verification
procedure (truth table construction) as automatic before transfer tasks
succeed. Do not introduce far transfer while the procedure itself is
FRAGILE.

## Cross-Subject Connections

KG lists `math.disc.boolean-circuits` as a cross-link; confirmed via
directory listing that no blueprint yet exists at
`docs/curriculum/blueprints/math.disc.boolean-circuits.md`. The
relationship — De Morgan's laws for propositions are structurally
identical to Boolean algebra laws for digital circuits, already named
in Transfer Connections above — is not yet developed further, pending
that concept's authoring.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.logical-equivalence.md`.
Cross-references within the Blueprint (not duplicated here): worked
example on De Morgan's verification, practice problems on
simplification, assessment items on contrapositive application.

Key teaching objectives reused by reference: LO1 (verify via truth
table), LO2 (apply named equivalences), LO3 (substitution in compound
propositions). All three Blueprint misconceptions (MC-1 through MC-3)
cited above with birth-type classification added.

## Runtime Asset References

- Explanation Memory: the Core Understanding paragraph and the MC-1/
  MC-2 repair explanation are suitable seeds.
- Probe assets: Gate 2 (independent table construction) and Gate 4
  (misconception probe) are suitable MCQ/misconception-probe seeds.
- Visual asset: truth table side-by-side comparison (column-match
  highlighting) — ADR 12 Visual Asset Model, background-authored.

## Curriculum Feedback

No structural KG issues found. The three Blueprint misconceptions
(MC-1, MC-2, MC-3) are well-specified and map cleanly to the birth-type
taxonomy. The concept is correctly placed at foundational difficulty —
truth table construction is the only prerequisite skill, and it is
already authored. The `math.found.logical-connectives`/
`math.found.mathematical-notation` overlap noted in Wave 2 remains an
open KGCS review item, not resolved here. All misconception birth-type
classifications applied using the 7-question diagnostic from
`educational-brain/misconceptions/01-birth-types.md`; named-law examples
cross-checked against the Blueprint's MC registry, no new misconceptions
found beyond the Blueprint's three.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-23 | Human Curator (Domain Certification Mode, Wave 6) | Initial entry |
| 1.1 | 2026-07-26 | Curriculum Completion Program (Quality Gate 3 repair) | Restructured from the retired numbered "1. Concept Identity"..."21. Certification Status" heading scheme to the current `EDUCATIONAL_BRAIN_STANDARD.md` 21-section scheme. All content preserved losslessly; added standalone Learning Objective and Why Students Fail sections; merged the two duplicate Blueprint References sections into one; dropped the non-Standard Certification Status section. No factual or pedagogical content removed. |

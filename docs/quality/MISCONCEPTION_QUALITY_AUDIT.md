# Misconception Quality Audit

Per-misconception scoring against the authored standard
(`educational-brain/misconceptions/01-birth-taxonomy.md`,
`02-the-repair-sequence.md`, and the concept-entry misconception-library
format in `TEMPLATE.md` §4). Misconceptions are the single highest-moat
instrument in a blueprint (validation/08) — this audit is the most
rigorous in the QA layer.

Every misconception entry in a blueprint is scored on five required
attributes. Each attribute is 0–2 (0 absent · 1 present-but-weak · 2
strong). Max 10 per misconception.

---

## 1. The five attributes

**M-A · Observable symptom (0–2).**
- 2: A characteristic PHRASE the learner says, quoted verbatim, AND the
  observable error pattern (which distractor / what wrong move across
  surfaces).
- 1: A described symptom but no verbatim phrase (loses the free detection
  channel).
- 0: "The learner misunderstands X" — an inference, not an observable.

**M-B · Diagnostic precision (0–2).**
- 2: An askable-verbatim detection probe that the WRONG model answers
  incorrectly and confidently — a golden probe where the correct model
  and the misconception give visibly different answers.
- 1: A probe that detects the error but doesn't cleanly separate this
  misconception from adjacent ones.
- 0: No probe, or "assess their understanding."

**M-C · Repair protocol (0–2).**
- 2: The 7-step sequence instantiated FOR THIS misconception, with the
  COLLIDE step's design matched to the birth type
  (`misconceptions/02 §1` collision table) — physical collision for
  perceptual (type 2), notation-swap for type 4, etc.
- 1: A repair present but generic (not birth-type-matched), or missing a
  step (commonly CONTRAST, which is why repairs regrow).
- 0: "Correct the misconception" with no sequence.

**M-D · Recovery signal (0–2).**
- 2: A stated verification-of-death — delayed + disguised + speeded
  re-probe items specific to this misconception, plus the birth-type
  regrowth prior (`student-state/03 §3`) so the schedule knows how
  hard to re-check.
- 1: A re-probe named but not delayed/speeded (same-session verification
  proves nothing — Universal Principle 17).
- 0: No verification.

**M-E · Escalation path (0–2).**
- 2: States what happens when the repair FAILS — the burned-collision
  rule (a second attempt uses a different collision case and ideally a
  different modality), and the re-rating trigger (two regrowths → re-rate
  HIGH + flag the repair for redesign, `student-state/03 §3`).
- 1: Acknowledges repair can fail but no concrete next move.
- 0: Assumes the repair always works.

---

## 2. Birth-type validity (gate, not scored)

Before scoring, verify the entry names a birth type from the 6 authored
types and that the type MATCHES the mechanism described (run the 7-question
diagnostic procedure, `misconceptions/01 §7`). A mislabelled birth type
is a hard FAIL — it corrupts the regrowth prior and the collision design
downstream. (E.g. labelling a perceptual-intuition misconception as
overgeneralization would prescribe a verbal collision that cannot work.)

---

## 3. Scoring and thresholds

```
MISCONCEPTION: {concept}:{M-id}   birth type: {type} [VALID|MISLABELLED]
M-A observable symptom   0|1|2
M-B diagnostic precision 0|1|2
M-C repair protocol      0|1|2
M-D recovery signal      0|1|2
M-E escalation path      0|1|2
SCORE: {n}/10
```

- **Birth-type MISLABELLED → hard FAIL** regardless of score.
- **Score ≥ 8 AND no attribute = 0 → ACCEPT.**
- **Score 5–7, or any single attribute = 0 → REVISE** (named attribute).
- **Score < 5 → REJECT** (the entry is a description, not an instrument).

A blueprint's misconception library passes only when EVERY entry scores
≥ 8 with no zero attribute and a valid birth type. One weak misconception
holds the whole blueprint (misconceptions are where authored knowledge
most outperforms improvisation — a weak one squanders the moat's richest
seam).

---

## 4. Library-level checks (across the blueprint's misconceptions)

- **Coverage sanity**: the blueprint's "Why beginners fail here" (§3)
  names failure mechanisms; each major mechanism should have a
  corresponding misconception entry. A named mechanism with no entry is
  a gap (FLAG, reviewer judgement).
- **No metastasis blindness**: if the concept is a cut-node (high
  `unlocks` fan-out), the audit checks the entry acknowledges the
  chain-check trigger (`misconceptions/02 §4`) — an ACTIVE misconception
  here corrupts everything downstream.
- **De-duplication**: the entry references the generic taxonomy and
  repair sequence, never re-authors them (V30).

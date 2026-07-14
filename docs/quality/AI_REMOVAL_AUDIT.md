# AI Removal Audit

A repeatable procedure that proves a blueprint **teaches without AI
reasoning** — i.e. that its instrument content would still work if
rendered by a much weaker model that supplies wording only. This is the
authoring quality gate named in the Runtime ↔ Educational Brain Contract
§4 ("The AI Removal Test"), turned into a run-book with objective
pass/fail criteria.

The principle (Contract §4, restated): *if an asset only works because a
strong LLM patches its gaps, infers missing steps, or supplies unstated
context, it is not authored knowledge — it is a prompt.* Prompts do not
compound; authored knowledge does. This audit fails the prompts.

---

## 1. The renderer model

Audit every instrument section as if the renderer can do ONLY:
- choose surface words in a given register,
- substitute example values into an authored template slot,
- read the retrieved text aloud.

The renderer CANNOT: decide what to teach, infer a missing step, pick
between two unstated options, know the concept, or repair its own gap.
Every place the blueprint silently relies on a capability beyond this
list is an AI-dependency defect.

---

## 2. The five removal probes (each PASS/FAIL)

Run each probe against the blueprint. A probe FAILS if the honest answer
is "only a capable model could do this."

**Probe R1 — Detection determinism.**
For each misconception: is the detection signal something a weak renderer
can *match*, not *infer*? A verbatim characteristic phrase and a
specified distractor choice PASS. "The learner seems to misunderstand"
FAILS — that requires inference.

**Probe R2 — Repair executability.**
For each misconception repair: are the 7 steps concrete enough to execute
from the text alone? Each step must name WHAT to say/show, not a goal to
achieve. "Create cognitive conflict" FAILS (a goal); "present this
specific case where their rule gives the wrong answer: [case]" PASSES.

**Probe R3 — Probe self-sufficiency.**
For each assessment item: is the stem askable verbatim and the
correct/incorrect verdict decidable from the authored correctValue or
distractor map — with no judgment call? A distractor-mapped MCQ or a
correctValue with a stated acceptance rule PASSES. "Assess whether they
understand" FAILS.

**Probe R4 — No hidden step.**
Walk the teaching sequence (mental model install → discovery/direct →
teaching actions → assessment). Is there any transition where the
learner gets from A to B only because a smart tutor would "know what to
do next"? Each transition must be authored. A gap PASSES only if the
blueprint explicitly delegates it to a named universal engine
(recovery, escalation) — delegation is authored; silence is a gap.

**Probe R5 — Context independence.**
Could this section be executed correctly by a renderer that knows nothing
about the concept beyond this file? Anything requiring outside
subject-matter knowledge the file doesn't supply FAILS (the file is not
self-contained — TEMPLATE.md rule 4).

---

## 3. The residue ledger (what MAY remain AI)

The audit does not demand zero AI. It demands the residue is only the
*authorized* residue (`decision-engine/08 §4`):
- surface wording within the retrieved register and burst limits,
- specific example values inside an authored template's constraints,
- voice/prosody rendering of retrieved emphasis rules,
- genuinely novel learner utterances with no matching rule (each logged).

The audit produces a **residue ledger**: for the blueprint, list every
thing still left to the renderer. Every ledger line must fall in the four
authorized categories above. A ledger line outside them (e.g. "renderer
decides which analogy to use", "renderer figures out the repair") is a
FAIL and names exactly what must be authored.

---

## 4. Scoring

```
AI REMOVAL AUDIT: {kg-id}
R1 detection determinism   PASS|FAIL
R2 repair executability    PASS|FAIL
R3 probe self-sufficiency  PASS|FAIL
R4 no hidden step          PASS|FAIL
R5 context independence    PASS|FAIL
RESIDUE LEDGER: {n lines; all authorized? YES|NO}
RESULT: PASS (all five PASS AND residue fully authorized) | FAIL
```

The AI Removal Audit is a **mandatory acceptance gate** (see
`PRODUCTION_ACCEPTANCE_CHECKLIST.md`). A blueprint that fails any probe is
not accepted, regardless of how good its prose reads — because good prose
under a strong renderer is exactly what this audit exists to distinguish
from authored knowledge.

---

## 5. Why this audit is the moat's guardian

Explanation prose is future-generatable; instrument content
(misconception detection, repair steps, probes, gates) is not. This audit
is the mechanism that keeps the two apart at the door: it lets the prose
lean on the renderer (that is fine — it is a depreciating asset) while
forcing every instrument to stand on its own (that is the appreciating
asset). Applied to thousands of concepts, it is what keeps the Brain a
body of retrievable knowledge instead of a library of prompts.

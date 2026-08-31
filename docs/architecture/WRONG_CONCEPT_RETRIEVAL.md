# The optics card in the quantum lesson — root cause, and three fixes that measurement rejected

Session B, 2026-08-31. Found by running the hardest physics concept as an
average student on the real account. **Root cause is fully established. No fix
shipped — three candidates were falsified by measurement and the fourth is
unvalidated.**

## What the learner saw

```
lesson:   phys.qm.perturbation-theory  (Time-Independent Perturbation Theory)
learner:  "what does that angle bracket thing even mean?"
tutor:    "Underwater, look up steeply and you see the sky… That is what keeps
           a signal inside an optical fibre for kilometres…"     provider: memory
learner:  "why are you talking about optical fibres?"
tutor:    (the identical paragraph again, verbatim)
```

The learner meant **bra-ket notation**. They were taught total internal
reflection, twice, mid-way through quantum mechanics.

## Root cause — five steps, each verified

1. `resolveConceptMatches` matched the bare word **"Angle"** against
   `math.geom.angle`, whose title is exactly `Angle`. Method **EXACT_TITLE**,
   confidence **0.95** — the tier the code documents as "direct evidence and
   never second-guessed", because a full-title match is normally unambiguous.
2. The lesson is physics and the match is mathematics, so
   `subjectLocalReading('Angle', 'phys', …)` translated it into "the physics
   reading of angle".
3. Exactly two physics titles contain the word: `Hamilton-Jacobi Equation and
   Action-Angle Variables` and **`Total Internal Reflection and Critical
   Angle`**. The function takes the **shortest** qualifying title.
4. `findRemediationCard('phys.opt.total-internal-reflection')` found an
   **ACTIVE, owner-promoted** card and `renderRemediationCard` emitted it
   verbatim — hence `provider: memory`.
5. `captureGeneratedExplanation` then filed that optics text as a DRAFT under
   `phys.qm.perturbation-theory` (row created 20:07:32 during the session),
   which is how it also entered the history the model then repeated from.

Every step is individually defensible. The failure is that **"angle" inside the
compound "angle bracket" was never the learner naming a topic**, and nothing
downstream can recover from a confident wrong id.

`findRemediationCard` is NOT at fault — it matches `c.conceptId === conceptId`
exactly. It was handed the wrong concept.

## The structural exposure

**213 of 1,775 concepts have a ONE-WORD title.** Most are unmistakable
(Photosynthesis, Stoichiometry, Meiosis), but some are ordinary English —
**Angle, Point, Set, Even, Lists, Strings, Functions** — and those match by
accident inside any compound. CLAUDE.md already records a sibling defect from
the same class, unfixed: `"what is the point of this?"` → `math.geom.point`.

## Three fixes, each rejected BY MEASUREMENT

Recorded so they are not attempted again.

**(1) Constrain `subjectLocalReading` to a title's primary conjunct** (the part
before " and "), so "…and Critical Angle" stops qualifying.
→ **REJECTED: 339 of 2,306 possible translations broken (14.7%).** It also
destroys `"genome editing"` → *CRISPR and Genome Editing* and
`"programmed cell death"` → *Apoptosis and Programmed Cell Death*.

**(2) Drop a one-word title match whose following word is outside the corpus's
1,980-word title vocabulary** ("angle bracket" → "bracket" unknown → drop).
Measured clean against the feared false positives: `"photosynthesis
experiment"`, `"angle rules"`, `"genome editing"`, `"set theory"` all survive,
because those following words ARE corpus vocabulary.
→ **REJECTED: it does not fire.** `"bracket"` IS corpus vocabulary — via
`phys.mech.poisson-brackets`, *Poisson Brackets and Phase Space Dynamics*. The
evidence the rule depends on does not exist for the very case it was written
for.

**(3) Refuse cross-subject translation for one-word matches.**
→ **REJECTED: 72 translations affected, and several are legitimate** —
`"Carbohydrates"`(chem)→*Carbohydrates and Lipids*, `"Proteins"`(chem)→*Proteins
and Protein Structure*, `"Sets"`(cs)→*Set*, `"Functions"`(cs)→*Function*. It
would break those to fix this.

## The fix I would try next, and have NOT validated

Guard at the point of harm rather than in the resolver, mirroring a pattern the
visual layer already proved: generated figures are refused by a
`not-anchored-to-concept` critic, and **the explanation and remediation-card
paths have no equivalent check at all.**

Proposed: a remediation card may serve only when its concept is the lesson
concept or a **KG neighbour** of it (prerequisite, unlock, or cross-link).
`phys.qm.perturbation-theory` and `phys.opt.total-internal-reflection` are
unrelated in the graph, so the card would be withheld and the ordinary engine
would teach instead — failing safe.

This is *structural* evidence (graph adjacency) rather than *lexical* evidence,
which is why it may survive where all three lexical rules died. **It is
unmeasured. Do not ship it without measuring how many legitimate excursions it
would block first** — that is exactly the step that killed the other three.

## Also observed in the same session, not yet investigated

- The tutor repeated the identical paragraph **three times**, including once in
  reply to a **correct** answer to its own keyed MCQ.
- That correct MCQ answer moved no mastery counter and drew no confirmation —
  consistent with the prediction in `C5_CONFIRMATION_RESIDUE.md` that C5's
  residue is the grading seam, not detector width.
- Chemistry (`chem.org.pericyclic`) stated two confident falsehoods, twice
  each: a diene contributes "two π-electrons" (it is four, contradicting the
  same lesson's own [4+2] definition), and the cyclopentadiene/maleic-anhydride
  adduct is "a new seven-membered ring" (it is a six-membered ring in a
  bicyclic norbornene adduct).

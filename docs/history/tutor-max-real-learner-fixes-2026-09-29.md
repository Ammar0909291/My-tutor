# Tutor Max — real-learner QA and cross-cutting fixes (2026-09-29)

Owner instruction: "completely fix the tutor so that every concept can be taught better with
visuals and simulation". Scope decided: fix the SHARED teaching defects first (each one improves
every concept at once), prove every fix with a repeatable learner replay, then visuals, then
simulations.

## The evidence: 5 physics sessions on a real account (production, commit 61e85d20)

A weak-English learner persona drove P1 Newton's 2nd law, P2 pendulum, P3 projectile motion,
P4 thin lenses and P5 Kirchhoff's laws turn by turn through the production API. Visuals were
rendered in the local app at the same commit, because the sandbox browser cannot load production.

- Ratings: P1 7/10, P2 4/10, P3 7/10, P4 2/10, P5 5/10.
- Only P1 and P3 completed with verified mastery. P2, P4 and P5 stalled in GUIDE/CHECK after
  11–14 turns.

Recurring, cross-cutting defects (reproducible):

1. **Topic hijack on an ambiguous word.** P4 "what is focal length?" led to three turns of special
   relativity. "what is P? power?" led to mechanical power in watts.
2. **Bare "Not quite — the answer is: X", with no why.** Five of five wrong answers.
3. **The tutor describes figure details that are not drawn.** Rays, current arrows and timing
   marks, in P1, P3, P4 and P5.
4. **Stored replies ignore the learner's message.** P2, P4, P5.
5. **Questions test untaught material.** ΣF, ω, h = ½gt², lens power, traversal sign.
6. **Answer options carry their own working.** Seed content; task #2 (length giveaway) still needs
   an owner-authorized DB update.
7. **One-turn-late replies.** P2, P5.
8. **English stays too hard after the learner asks for simpler words.**
9. **Lesson text states the answers a simulation withholds.** Pendulum, Newton.
10. **Visual bugs.**
    - The pendulum interpretation says "measured a".
    - The lens figure has no rays and a 3D grid.
    - The lens formula sign convention differs between the tutor and the figure.

## Root causes found and fixed (batch 1)

| # | Defect | Root cause (evidence) | Fix |
|---|---|---|---|
| 1 | Topic hijack | Production log `[knowledge-gap] concept: phys.rel.length-contraction`. `resolveRequestedConceptId` matched "Length" (math.geom.length), and `subjectLocalReading` re-read it as "Length Contraction". "Power" is an exact title for phys.mech.power. | **L1** in `concept/requestedConcept.ts`: a word inside a compound term the lesson itself uses (KG title and definition, plus the tutor's last message) is the lesson's term. **L2**: within the same subject, read a one-word match in the lesson's own domain first ("Power of a Lens"). Positional, no word list. |
| 2 | Bare "Not quite" | The server graded the answer before the model ran, but never told the model the verdict. On wrong answers the model wrote a paraphrase-confirm ("It sounds like you're thinking… Is that right?"), `stripConfirmBack` removed it, and only the correction was left. Production log P1 18:56:20Z: 223 → 76 characters. | `answerVerdictBlock.ts`. On a turn graded against an AUTHORED key, the prompt states the verdict, the chosen option and the correct option, and asks for a short, simple why. It does not change grading, mastery or question selection. |
| 3 | Invented figure details | The figure description listed what was drawn but never said the list was complete. | `visualSemantics.buildSemanticsBlock`: "That list is COMPLETE… describe anything else as something to IMAGINE". |
| 4 | Stored text ignoring the learner | `learnerMessageNeedsModelReply` treated any message containing a practice request as low-content ("i see no arrow in picture. can you give me new question to practice?"). | A practice request short-circuits only when nothing else in the message has content. |

## The repeatable check

`scripts/qa/learnerReplay.ts` uses a disposable account (deleted afterwards) to run the scripted
learner turns against production. It flags three things:

- OFF_TOPIC: the reply teaches an unrelated concept;
- BARE_WRONG: a wrong answer gets no explanation;
- IGNORED: stored text replaces a reply the learner needed.

Baseline against production before this batch: 6 failures, covering all three types.

# English topic-drift — DIAGNOSED 2026-09-12, two independent causes fixed

> **RESOLVED for ENG-D08 and ENG-D09; ENG-D07 recorded as having no runtime
> mechanism.** The file's own warning that the two episode classes might not
> share a root cause was correct — they were investigated independently and do
> not. Original text below is kept unedited as the record of what was observed.
>
> - **Self-echoing class (digraphs / print-concepts)** — the topic-request
>   detector. Reproduced deterministically offline against the real
>   `namedTopicUnknownTo`: "hello, what are we learning today" extracted the
>   topic **"we learning today"** and "explain simple please, im a beginner"
>   extracted **"simple please, im a beginner"** — verbatim the phrases the
>   transcripts record being taught. In each case exactly ONE word held the
>   phrase up (`today`, `beginner`), neither about any subject. Fixed by
>   extending `DISCOURSE_NOUNS` — the SAME list and the SAME
>   one-real-word-survives rule that already closed `slowly`, `please`, `main`
>   and `practice` — never by widening the request detector. All added words
>   occur in 0 of 1,775 concept titles. Guard: `src/tests/englishTopicDrift.test.ts`.
> - **Cross-concept class (Group 5 pronouns)** — NOT the detector; every
>   detector returns null on "please explain it another way". It is the
>   weak-topic reinforcement advisory, whose 2026-09-06 suppression guard
>   consults the RECOVERY rung of the arbitration ladder (`failureState`) but
>   not the LEARNER_REQUEST rung that also outranks TEACH. Measured: all four
>   pre-existing terms read false while `learnerRequest` read
>   `explain_differently`. Fixed by adding that one rung, same authoritative
>   per-turn read, no new detector.
> - **ENG-D07 "hello, new topic for me"** — every detector returns null and an
>   excursion cannot open without a resolved concept id or a topic title, so no
>   runtime path acts on it. Model behaviour, recorded rather than patched with
>   a speculative regex.

# English topic-drift — tracked finding, NOT fixed

**Status: OPEN, reported not diagnosed further. Found 2026-09-10 during real-learner
QA of the English ADULT-band probe-contract campaign's Group 1. Confirmed
pre-existing and unrelated to that campaign's content — reported here as a
standalone item so the asset-authoring campaign is not blocked on it and the
finding is not lost between sessions. Extended 2026-09-11 with a Group 5
episode that does NOT fit the original "echoes the learner's own text"
hypothesis — see "Second episode class" below. The title was generalized
from "via self-referential latching" since that no longer describes both
observed episode classes.**

## Second episode class (Group 5, 2026-09-11) — NOT text-echoing

**eng.grammar.complex-sentences**, session `cmtwim0wn0001l70421o06r1v`, T4-T6
(production, `scripts/qa/englishAdultBandBatch5LiveQa.ts`): the learner asked
"please explain it another way" (about complex sentences, the lesson's own
topic). The reply abandoned complex sentences entirely and taught the
**pronoun "they"** instead — subject/object/possessive-adjective/possessive-
pronoun forms, a full table, and a practice prompt ("Rewrite the following
sentence using 'they': ...") — for 2 full turns (T4, T5). T6
("hold on, let me reconsider") got a reply that said "Let me ask you
something concrete about **Complex Sentences**: what's one thing you notice
or find surprising about what we just covered?" — referring back to the
lesson by name while what was actually "just covered" was the unrelated
pronoun content, producing an internally incoherent turn. T7 ("got it now")
finally returned to genuine complex-sentence content (comma placement with
subordinate clauses).

This does **NOT** match the original hypothesis: "they" does not appear
anywhere in the learner's own T1-T4 messages, so this is not the tutor
re-explaining the learner's own recent phrasing as vocabulary. Instead, the
drifted content ("they" as a pronoun, subject/object/possessive forms) is
recognizable, on-curriculum content for a DIFFERENT concept
(`eng.grammar.pronouns`, this campaign's own Group 3) — raising a new,
unconfirmed possibility that this episode class is a **cross-concept content
leak** (e.g. a spaced-revision/prior-mastery/"due review" injection pulling
in unrelated already-taught material mid-lesson) rather than the
excursion/topic-request misdetection the original hypothesis pointed at.
**Not confirmed** — this is a second lead, not a diagnosis. A dedicated
investigation should check both mechanisms independently rather than assume
they share one root cause.

## Symptom, reproduced twice in three test lessons

The tutor abandons the actual lesson subject for several consecutive turns
and instead "teaches" the **learner's own recent message text** as if it were
vocabulary or content to explain, ignoring what the learner actually said.

- **eng.phonics.digraphs**, T2: learner asked "so two letters can make one
  sound? give me example please" (a genuine on-topic question). Reply ignored
  it and instead explained the phrase "we learning today" — echoed verbatim
  from the learner's own T1 ("hello, what are we learning today") — as a
  concept about group-learning dynamics. Continued T2→T6 (5 turns); "i dont
  know, im confused" at T3 did not recover the topic. Self-corrected at T7
  ("ok got it") and returned to genuine digraphs content.
- **eng.phonics.print-concepts**, T3: learner said "i dont know". Reply
  ignored it and instead explained the phrase "explain simple please, im a
  beginner" — the learner's own T2 message — as a 4-step meta-lesson on how
  to give a simple explanation. Self-corrected at T4.

Full transcripts: see the Group 1 report in the session that found this
(session `01WzbBYRuimbhY71AyDxRzZX`); not reproduced verbatim here to keep
this file short — re-run `scripts/qa/englishAdultBandBatch1LiveQa.ts` against
production to reproduce.

## What is NOT the cause

- **Not this campaign's content.** Neither drifted exchange involves any
  concept, misconception, or probe the ADULT-band batches authored. The
  mechanism (whatever it is) operates on the learner's own message text, not
  on served content.
- **Not a mastery/grading defect.** `check`/`practice` stayed 0 throughout
  every drifted turn; no MCQ was answered incorrectly-but-praised; no false
  evidence was recorded.
- **Not permanent.** Both episodes self-corrected within 4-6 turns without
  any visible intervention.

## Lead, not a diagnosis

Both triggering messages contain a first-person/meta phrase that resembles a
lesson-scoping instruction: "what are we learning [today]", "explain simple
please, I'm a beginner". This resembles the defect class already fixed once
in this codebase — commit `eb8738c` ("a fresh lesson-opening instruction can
no longer be read as learner intent"), where a machine-authored instruction
phrase was misread by the topic/excursion-request detector
(`namedTopicUnknownTo` / `matchTopicRequest`, see `excursion.ts` /
`requestedTopic.ts`) as a genuine topic name to teach. This may be a related,
not-yet-covered trigger for that same detector, applied here to the
**learner's own** phrasing rather than a machine-authored one — or it may be
a distinct cause entirely. **Not confirmed.**

## Why this was not fixed in the session that found it

Diagnosing the teaching engine's topic/excursion-detection layer is outside
the scope of an asset-authoring batch (probe/explanation content), and this
project's own standing discipline treats that layer as hot-path surgery
requiring dedicated investigation, not a side effect of a content campaign.
Per the task's own stop-condition rule ("real learner behavior reveals a
serious correctness/safety problem" → stop, report, don't improvise a
workaround), it was reported and the campaign paused for a user decision,
then explicitly directed to continue with this finding tracked separately —
which is what this file is.

## Suggested next step for a dedicated investigation session

1. Reproduce deterministically: drive a fresh lesson with a T1 message
   containing "what are we learning [today]" or similar meta-phrasing,
   confirm the drift, capture the exact `[excursion]` / `[knowledge-gap]` /
   `[arbitration]` production log lines for that turn (per this repo's
   existing logging conventions — see the Excursion R1-R4 and Unresolved-
   topic-excursion sections of `CLAUDE.md` for the log line shapes to grep).
2. Check whether `requestedTopic.ts`'s `namedTopicUnknownTo()` (or its
   sibling in `excursion.ts`) resolves a `requestedTopicTitle` on these
   turns, and whether the resolved title matches the drifted phrase.
3. If confirmed, the fix likely narrows the SAME detector the `eb8738c`
   fix narrowed, not a new detector — check whether learner-authored
   meta-phrasing needs the same treatment machine-authored lesson-opening
   text already got.

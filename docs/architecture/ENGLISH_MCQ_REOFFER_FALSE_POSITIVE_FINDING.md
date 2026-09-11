# Finding: MCQ re-offer disambiguation lead-in fires on non-answer-attempt prose

**Status:** OPEN, tracked separately (not fixed in this campaign — out of scope).
**Discovered:** 2026-09-11, ENGLISH NEXT 50 CONCEPTS campaign, Group 3 real-learner
QA (`scripts/qa/englishAdultBandBatch3LiveQa.ts`, `eng.grammar.verbs` lesson,
production, real account).
**Severity:** P1 (learner-facing correctness-of-conversation defect; not a
grading/mastery-fabrication issue).
**Related but distinct from:** `docs/architecture/ENGLISH_TOPIC_DRIFT_FINDING.md`
(that bug is about topic drift; this one is about a specific lead-in string
misfiring). Do not conflate the two when triaging.

## Symptom

The Option-A / I1 mechanism (`route.ts` ~L8918, commit `00e53ac1`, extended by
the I4 fix at commit `3940daa9`) prepends "I couldn't tell which option your
answer matched — tap the choice you mean from the list below." when it judges
a turn to be a genuine-but-ungradeable MCQ answer attempt while a probe is
pending and ungraded.

In one 10-turn `eng.grammar.verbs` lesson (Group 3 live QA), this lead-in fired
on **3 of 10 turns**, and in at least 2 of the 3 cases the learner had made
**no answer attempt at all**:

- T3: `"wait, what about words like 'is' or 'seems', those arent actions"` — a
  genuine follow-up question, phrased without a trailing `?`.
- T6: `"hmm i think i picked the wrong one, let me think again"` — meta-
  commentary about the learner's own reasoning process, not an answer.
- T8: `"thanks that helped"` — an elaborated acknowledgement (bare "thanks"
  alone would presumably match `isBareAcknowledgement`; the trailing "that
  helped" apparently does not).

The identical mechanism did **not** false-fire on a near-identical phrasing in
the sibling `eng.vocab.idioms` lesson in the same run
(`"oh wait, i think i misunderstood, let me try again"`, Lesson B T6) — most
likely because no probe was pending+ungraded at that exact moment (the prior
probe had already been silently released by the Liveness programme's rung-1
2-turn hold, so `mcqToServe`'s pending-probe precondition was false and the
guard never evaluated the message shape at all). This makes the defect
**state-dependent and intermittent**, not a constant misfire — it only
manifests when a probe is freshly pending (held ~1 turn) AND the learner's next
message is prose that doesn't match `detectLearnerQuestion` (no `?`), isn't a
bare acknowledgement, isn't a practice request, and isn't flagged as
`turnIntent.failureState`/`learnerRequest` (the I4 narrowing).

## Why this is a real defect, not a tracking artifact

I4's own fix (commit `3940daa9`) already found and closed one slice of this
exact false-positive surface (distress/help phrases without `?`). This
transcript shows the false-positive surface is **broader** than what I4's
narrowing covered:
- implicit follow-up questions without `?` that aren't in the distress/help
  pattern list ("wait, what about words like X" reads as a question to any
  human but isn't detected as one),
- meta-commentary about the learner's own answer-selection process ("I think I
  picked the wrong one, let me think again" — this is the learner narrating
  their own confusion about a PAST answer, not attempting a NEW one),
- acknowledgements with a trailing clause that push them past whatever
  `isBareAcknowledgement`'s pattern requires.

For the weak/lower-intermediate learner persona this campaign is testing
against, being told "I couldn't tell which option your answer matched" when
they never attempted to answer is actively confusing — it implies they did
something wrong when they didn't do anything gradable at all.

## Why not fixed in this campaign

This campaign's scope is asset authoring (probes/explanations), not teaching-
engine/route.ts hot-path logic. Per the campaign's explicit stop conditions,
a serious-correctness issue found outside this scope is reported, not
improvised on. `route.ts`'s Option-A guard, `detectLearnerQuestion`, and
`isBareAcknowledgement` are shared production hot-path code touching every
subject's grading flow, not English-specific — a fix here needs its own
dedicated investigation/session (same posture as the topic-drift finding).

## Additional evidence (Group 4 live QA, 2026-09-11)

Group 4's live QA (`scripts/qa/englishAdultBandBatch4LiveQa.ts`,
`eng.grammar.conjunctions` + `eng.grammar.articles-and-determiners`, same
production run) reproduced the same class of false positive **4 more times**
across 17 turns:

- `"can you try a different way to explain it"` (a genuine help request,
  phrased as a question but without a `?`)
- `"oh wait, i think i see my mistake now"` (meta-commentary about a past
  answer)
- `"thank you, that makes more sense"` (an elaborated acknowledgement)
- `"hold on, let me reconsider that"` (meta-commentary/stalling)

Notably, an almost-identical phrase in the SAME lesson did NOT false-fire at a
different turn (`"im confused about the comma rule, can you explain more"` at
T3, one turn after a probe attached, produced normal teaching with no
lead-in) — reinforcing that the trigger is state-dependent (how many turns the
probe has been held, and the exact shape of the turn-intent classifiers) and
not simply "any prose without `?`". Across the two groups' live QA (Group 3 + 4),
this lead-in has now fired **7 times** in roughly 27 conversational turns where
a probe was pending — a substantial, repeated false-positive rate, not a
one-off.

Reassuringly, this run also confirms Batch 4's own authored content serves
correctly in production: the `[gate]` MCQs and `[memory]` explanations served
word-for-word matched the exact probe stems and explanation text authored in
`englishAdultBandBatch4.ts` (e.g. the "cover letter... an honest assessment"
and "memo... an hour-long meeting" probes). The false-positive lead-in is a
defect in the shared re-offer/disambiguation mechanism, not in this
campaign's authored assets.

## More serious variant found (Group 5 live QA, 2026-09-11) — false "That's right." confirmation

Group 5's live QA (`eng.grammar.past-tenses`, session `cmtwim0wn0001l70421o06r1v`,
T3) surfaced a variant of this same false-positive family that is MORE
serious than the disambiguation lead-in: instead of "I couldn't tell which
option...", the reply OPENED WITH "That's right." — a genuine correctness
confirmation — in response to `"i dont understand irregular verbs, can you
explain"`, a message that made **no answer attempt at all**. The MCQ pending
at that point ("is 'went' formed by adding -ed...") was not addressed by the
learner's message in any way.

This is a sharper defect than the disambiguation lead-in: that one at least
tells the learner nothing was understood as an answer; this one **falsely
tells the learner they got something right** when they asked an unrelated
question. `check`/`practice` counters did not increment (0 throughout), so
this appears to be a text-only false confirmation, not a false mastery
credit — but the learner-facing message is actively misleading. Given the
Option-A/I1 mechanism's own design intent (never claim correctness without a
server grade), this specific occurrence warrants checking whether
`answerConfirmation.confirmCorrectAnswer` (the C5 enforcer,
`route.ts:5824`, documented in CLAUDE.md's "#1 — correct-answer confirmation
rate" section) is itself firing on a turn where `mcqGradeHoisted?.correct`
was never legitimately set to `true` — i.e. whether this is the SAME
turn-intent misclassification as the disambiguation lead-in, just landing on
the opposite (false-positive-graded-correct) branch instead of the
ungradeable branch, rather than a separate defect in the confirmation
enforcer itself.

## Recurrence tally (kept brief from Group 6 onward — see git log for detail)

Group 6 live QA reproduced the same disambiguation-lead-in false positive 3
more times (`eng.grammar.active-and-passive-voice` T4/T6,
`eng.grammar.subject-verb-agreement` T6 — all genuine follow-ups/meta-
commentary, no answer attempt). Running total across Groups 3-6: **10
disambiguation-lead-in occurrences + 1 false-confirmation occurrence**. Also
observed this group (not part of this finding, noted for completeness): one
correct answer (`active-and-passive-voice` T7) got a hedging "Let me know if
that's right" instead of a clear confirmation — consistent with the already-
documented C5 confirmation-rate gap in CLAUDE.md (~65%), not a new defect.
Batch 6's own authored probes were independently confirmed served correctly
(verbatim stem matches), and this run also served a genuine `process_flow`
visualSpec (not just the usual ASCII fallback) for two auto-attached figures
— positive evidence the visual pipeline works correctly when not explicitly
requested via "show me a diagram."

## Group 7 update

3 more recurrences (`eng.grammar.apostrophes` T6/T8, `eng.reading.main-idea-
and-details` T6) — running total 13 disambiguation + 1 false-confirmation
across Groups 3-7. No new episode classes. Batch 7 content confirmed served
correctly (verbatim stem matches); wrong answers were correctly identified as
wrong (not falsely confirmed) throughout; no topic drift observed; 2 more
real `process_flow` visualSpecs auto-attached.

## Group 8 update

3 more recurrences (`eng.reading.inference-in-reading` T4/T8,
`eng.reading.critical-reading` T6) — running total 16 disambiguation + 1
false-confirmation across Groups 3-8. No new episode classes. Batch 8
content confirmed served correctly; wrong answers correctly identified as
wrong throughout (via accurate [memory] explanations); no topic drift; 3
more real `process_flow` visuals auto-attached (including a genuinely
useful 5-step critical-reading diagram: Identify Claim/Examine Evidence/
Identify Assumptions/Detect Bias/Form Judgment).

## Group 9 update — a more serious variant: fabricated MCQ option content

`eng.writing.topic-sentences`, T6: the learner sent `"oh wait, i think i need
to rethink that"` (pure meta-commentary, no answer attempt) while a probe
about "remote work" vague topic sentences was pending. The reply was:
**"That's right. A) 'Dogs are popular pets.' Let me know which one you
pick."** — this is worse than the Group 5 false-confirmation finding in two
ways: (1) it falsely confirms correctness on a non-answer turn as before, but
(2) it also **invents an MCQ option text** ("Dogs are popular pets") that
does not appear anywhere in the actual pending MCQ's two real options (which
were about specificity vs. vagueness in topic sentences, not dogs). "Dogs are
popular pets" appears to be leaked from an earlier scaffolding analogy in
T1/T3/T4's teaching prose ("Dogs make excellent family pets..."), not from
the served MCQ at all — suggesting the model is drawing on stale prompt
context rather than the actual `pendingMcq` state when constructing this
reply. This is a genuine hallucination-adjacent defect, not just a
misclassified turn-intent, and is more concerning than the other tracked
occurrences. 3 more ordinary disambiguation-lead-in recurrences also occurred
this group (`eng.writing.topic-sentences` T4/T8, `eng.writing.narrative-
writing` T6) — running total 19 disambiguation + 2 false-confirmation (1
bare, 1 with fabricated content) across Groups 3-9. Otherwise: wrong answers
were correctly identified as wrong via accurate [memory] explanations; Batch
9 content confirmed served correctly (verbatim stem matches); a real
process_flow visual (6-step narrative-writing stages) auto-attached; no
topic drift.

## Group 10 update

3 more recurrences (`eng.listening.active-listening` T4/T6,
`eng.writing.editing-and-proofreading` T6) — running total 22
disambiguation + 2 false-confirmation across Groups 3-10. No new episode
classes this group (a clean run apart from the tracked recurrence). Batch 10
content confirmed served correctly; wrong answers correctly identified as
wrong; correct answers confirmed properly; multiple real `process_flow`
visuals auto-attached (5-step active-listening diagram); no topic drift.

## Suggested next steps for a dedicated session

1. Reproduce offline against the real `mcqReoffer.test.ts` harness with these
   exact three phrasings as new cases.
2. Consider widening `detectLearnerQuestion` (or a narrow allowlist alongside
   it, mirroring the `DISCOURSE_NOUNS`/distress-phrase precedent from I4) to
   catch "what about X" / "what does X mean" style implicit questions lacking
   `?`.
3. Consider whether "meta-commentary about a past answer attempt" (e.g. "I
   think I picked wrong", "let me think again") should be its own excluded
   category alongside bare-ack/practice/question — it is semantically closer
   to a bare acknowledgement (stalling) than to a genuine new answer attempt.
4. Re-verify `isBareAcknowledgement`'s pattern against "thanks that helped"
   and similar elaborated-but-still-acknowledgement phrasings.
5. Any fix must re-run `mcqReoffer.test.ts`'s full 18-assertion suite plus new
   cases, and must not reopen the original I1 gap (a genuine ungradeable
   answer attempt must still get the disambiguation lead-in).

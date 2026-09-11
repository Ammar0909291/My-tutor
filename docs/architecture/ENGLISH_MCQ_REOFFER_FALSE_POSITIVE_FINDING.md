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

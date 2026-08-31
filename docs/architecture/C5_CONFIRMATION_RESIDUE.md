# C5 at 65% — why widening the detector is probably the wrong fix

Session B, 2026-08-31, during the E1 verification run. Analysis only; no
behaviour changed.

## The handover's suggested next step, and why I did not take it

Session A: *"C5 at 65% against a 90% gate. answerConfirmation moved it from 39%.
The residue is turns where the confirmation detector and the tutor's phrasing
disagree; widening the detector is the obvious next step and I did not do it."*

I checked the premise before acting on it, and it does not hold up.

## The detectors do not disagree — they are character-identical

There are two copies of the pattern:

| file | constant | role |
|---|---|---|
| `src/lib/teaching/answerConfirmation.ts` | `CONFIRMS_CORRECT` | ENFORCES — prepends a confirmation when this does NOT match |
| `scripts/qa/rubricScore.ts` | `CONFIRMS` | MEASURES — counts a correct answer as confirmed when this DOES match |

Measured today: **the same 17 alternatives, in the same order.** So the residue
is not the scorer failing to recognise a confirmation the tutor gave.

That also means the module's own claim — *"the detector is the same one
rubricScore.ts scores with, so the thing that measures the criterion and the
thing that enforces it cannot drift apart"* — is structurally false. They are
two separate literals; nothing prevents drift, they merely match right now.
`src/tests/confirmationDetectorParity.test.ts` now pins that.

## Why widening would be measurement tampering, not a fix

The two copies fail in OPPOSITE directions, which is what makes this dangerous:

- Widen the **scorer** only → the measured rate rises with no reply changed.
  C5 "improves" and no learner sees anything different.
- Widen the **enforcer** only → it now believes more replies already confirm,
  so it stops prepending on those. The REAL confirmation rate FALLS while the
  scorer's number is unchanged.
- Widen both with a pattern that is too loose → the enforcer goes quiet on
  turns that never actually confirmed, and the scorer counts them as confirmed.
  **Criterion 5 goes green while the defect gets worse.**

Given the detectors already agree, any widening starts from the third case.

## What the residue is more likely to be

The enforcer fires on exactly one condition:
`mcqGradeHoisted?.correct === true` — the SERVER's grade against an authored
key. The scorer counts a different thing: `answeredOption(prev, sent)`, which
returns correct when the PREVIOUS RESPONSE PAYLOAD carried an `mcq` and the
learner's sent text matches one of its options.

Those are two different questions, and this repo has already measured them
coming apart. From CLAUDE.md, the seventh physics defect:

> `route.ts` suppresses the mastery gate while a probe is pending and ungraded
> on the stated assumption that *"the widget keeps rendering it from
> `pendingMcq`"* — and `LessonScreen.tsx` does not.

The same seam explains C5 exactly: if a response carries an `mcq` that the
server does not hold as pending, the learner's next message is **not graded**,
`mcqGradeHoisted` is null, the enforcer correctly stays silent — and the scorer,
reading only the payload, counts a correct answer that was never confirmed.

**Prediction, recorded before the data exists:** in the E1 run's transcripts,
C5's unconfirmed turns will be disproportionately turns where the mastery
counters did NOT move — i.e. the server did not grade the answer the scorer
counted. If that holds, C5 is a symptom of the grading seam, not of detector
width, and widening the regex would hide it.

If it does not hold — if the unconfirmed turns ARE server-graded — then the
enforcement is being lost after it runs (the verifier, or a later repair,
stripping the prepended sentence), which is a third possibility and also not a
detector problem.

Either way the next step is to read the transcripts, which the running E1 sweep
is producing now. **Do not widen the pattern first.**

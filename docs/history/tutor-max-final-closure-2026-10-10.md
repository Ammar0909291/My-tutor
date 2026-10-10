# Tutor Max final defect closure — 2026-10-10

Owner campaign briefs: "TUTOR MAX FINAL DEFECT CLOSURE — Missing-Image Hallucinations + Explicit Quiz Requests +
Non-Numeric Factual Accuracy", then "FINAL PRODUCTION CLOSURE AFTER cf79346". Source findings:
`docs/qa/LIVE_REDRIVE_2026-10-10.md` ("Seen live, not fixed in this pass"). Evidence (screenshots, transcripts):
`docs/qa/final-closure-2026-10-10/`.

## Commits and deploys

| Commit | Deploy | What |
|---|---|---|
| cf79346 | dpl_9WRpYHVYG7wiAfoWfpKkS5CNcjYe | Issues A, B, C (below) |
| 76c2edd | dpl_BV8uceAYfB4Pu99ahYcMcpAuQQTb | Follow-ups found by the cf79346 re-drive: figure answers grounded in what was drawn; re-ask wording; final gate re-reads the learner's words and logs its evidence; route behaviour tests; /learn evidence script |
| 82e3e89 | dpl_Fa3c1weGTWstXRH9YbWPdGywWFym | QA harness one-line fix only (same app code) |

Gates on 76c2edd's tree: `tsc --noEmit` exit 0; `npm run lint` exit 0, 0 errors, 12 warnings (none in changed
files); `vitest run` 917 files, 18,754 passed, 9 skipped, exit 0; `npm run build` exit 0.

## Issue A — picture questions

**Root causes.** (1) Availability was read from the held-figure session (`session.turns > 0`), server state the browser
may never have received. (2) Only sentences naming "the picture" were removed, so an imagined description ("Three
different lines are drawn …", "such pictures usually show …") passed. (3) Found on cf79346: on a recovery turn the
model's prompt lacked the rendered figure, so with a real figure shown it said "you can't see a picture … a typical
illustration would show …".

**Fix.** `figureReference.figureAvailableToLearner`: a picture is available only with evidence — a figure in this
reply, a figure the rendered-reality log records for this concept, or a photo sent with the camera button (📸,
/api/vision). With none, the whole reply is replaced (after every fallback path) by `noFigureAnswer`: no picture is
visible, how to send one, the idea from authored text. With a figure available but a reply that denies it or
describes a typical/imagined one (`DENIES_OR_IMAGINES_FIGURE_RE`), the reply is rebuilt from what the renderer drew
(`figureEvidenceAnswer`; the rendered-reality log now keeps `drawn: {caption, text}`).

**Production.** 76c2edd: 10/10 no-figure picture questions honest; 13/14 with a real figure answered about it; the
cf79346 rate-law failure fixed (`figure-reply-grounded-to-shown-figure`). **Open — A-2:** an imagined description
phrased as an analogy beside a real figure ("the horizontal line shows … In the sketch …"), and a figure-pointing
reply to "show me a diagram" when no figure was re-sent, still pass. Proposed (not implemented): check every
figure-pointing sentence against the recorded caption and labels.

## Issue B — explicit quiz requests

**Root cause.** At OBSERVE/DEMONSTRATE the surplus rule kept the authored cards for the mastery check; with model
cards no longer served (owner decision 2026-10-07) the reply was a worked example.

**Fix.** The detector covers "test my understanding", "give me a quiz"; an explicit request opens the gate in any
phase and outranks the reservation (`quiz-request-spends-reserved-card`, logged with what is left for the check).
Credit rules unchanged (`probeWouldCountThisPhase` does not read the request). With no new card the reply says why
(`quizRequest.ts`): the unanswered card again, every new card used (and that a seen one comes back once more when the
owner's re-ask rule has one waiting), or none available. A re-asked card says it was seen before.

**Production.** 56 requests in 8 lessons / 5 subjects: 53 authored cards (all in the corpus), 3 honest lines, 0 silent;
real /learn page shows the card and the graded tap. **Trade-off:** 4 of 6 reserved spends left 0–1 fresh cards for the
mastery check; mastery then depends on the one re-ask of a question answered without credit (owner option (c)).

## Issue C — non-numeric factual claims

**Fix.** `groundedProseCheck.ts`, beside the numeric check pass, on model-written English replies with concrete-case
claims (examples, analogies, "give me an example", "explain simpler"). Sources: the KG line and the concept's ACTIVE
authored explanations and probes (`loadConceptSourceTexts`, concept-scoped, ≤ 12 rows each). Structured JSON verdicts;
a correction only with a verbatim source quote whose words cover the new words; a doubted unhedged uncovered sentence
removed; ≤ 2 sentences / 40 % of words; never a stub; sentences with digits left to the numeric pass; edits keyed by
sentence text so the two passes cannot rewrite the same sentence. Offline scope measurement on 347 re-drive replies:
119 (34.3 %) in scope.

**Production.** 76c2edd logs: 124 replies, 34 checked, 1 changed (probable false positive), 90 out of scope.
**Open — C-1 (BIO-024):** a great crested grebe example with an unsupported sign stimulus passed; the stickleback error
did not recur in two runs. The check is source consistency, not truth.

## Tests

`src/tests/finalDefectClosure20261010.test.ts` (pure modules, production strings), `src/tests/finalDefectClosureRoute20261010.test.ts`
(real route, scripted model and checker). 15 routeAI call-site pins 10 → 11; `practiceRequestBelowGuide` and
`attachAssemblyRoute` updated to the explicit-quiz policy; picture-condition pins updated to the evidence rule.

## Environment note

This Chromium build rejects the sandbox egress CA (ERR_CERT_AUTHORITY_INVALID, also with the CA added to NSS; the NSS
entry was removed again). `scripts/qa/learnPageEvidence.ts` fetches app requests on the Node side (`route.fetch()`,
certificate verified there) and gives them to the real page; nothing disables TLS checking.

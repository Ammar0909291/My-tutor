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
| 9a0cee7a | dpl_A2SahaRQC8xoBXwkefHWBR4RJVWy | A-2: every figure-pointing sentence checked against the figure's evidence; C-1: uncovered examples qualified ("Go fix all") |
| f32eeb04 | dpl_FpCgtwM2KUna2KD8CNCPvxnaXfan | Precision from the 9a0cee7a re-drive: drawn primitives in evidence, questions/part descriptions not label claims, note only on example turns |
| 3e7bdcc4 | dpl_HcnzWw9p4K4LrjimuzsLpkqYu3uU | Ordinal box/step claims checked against the figure's step order; note placed above the /learn "Read more" fold |

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
cf79346 rate-law failure fixed (`figure-reply-grounded-to-shown-figure`). A-2 (an imagined description phrased as an
analogy beside a real figure, "the horizontal line shows … In the sketch …") was open after 76c2edd.

**A-2 fix (9a0cee7a → f32eeb04 → 3e7bdcc4).** `figureReference.checkFigureClaims` checks every figure-pointing
sentence of a model-written reply (picture question or not) against `FigureEvidence` = caption, written labels, step
titles/notes, what is DRAWN (arrows, line stubs, flow-chart boxes) and the steps in order: imagined structure, a quoted
label the figure does not carry, a part explanation sharing no words with the figure, and an ordinal box/step claim
that does not match step N are removed; questions, bolded part descriptions, "sketch" as a verb and "says" without a
figure subject are not claims. The rendered-reality log stores the same evidence (`drawn`), so figures shown earlier
are checked too. Each round was re-driven in production and its false positives fixed; offline sweep over 474
production replies: 5 sentences removed, all imagined. Details: LIVE_REDRIVE_2026-10-10.md, "A-2 and C-1 closure".

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

**Production.** 76c2edd logs: 124 replies, 34 checked, 1 changed (probable false positive), 90 out of scope. C-1
(BIO-024 class: a great crested grebe example with an unsupported sign stimulus passed) was open after 76c2edd.

**C-1 fix (9a0cee7a → f32eeb04 → 3e7bdcc4).** "Supported" needs a verbatim `source_quote`; a real-world example is never
"not_factual". On an example turn (the learner asked for one, or the reply opens with one; never a picture question),
two or more confident sentences the sources do not cover make the reply carry `UNCOVERED_EXAMPLE_NOTE`, placed right
after the paragraph with the first uncovered sentence (above the /learn "Read more" fold). Nothing is invented or
rewritten. The stickleback error recurred in production on 9a0cee7a and f32eeb04 and was qualified both times. Limit:
qualification, not correction — no authored source covers sticklebacks.

## Tests

`src/tests/finalDefectClosure20261010.test.ts` (pure modules, production strings), `src/tests/finalDefectClosureRoute20261010.test.ts`
(real route, scripted model and checker). 15 routeAI call-site pins 10 → 11; `practiceRequestBelowGuide` and
`attachAssemblyRoute` updated to the explicit-quiz policy; picture-condition pins updated to the evidence rule.

## Environment note

This Chromium build rejects the sandbox egress CA (ERR_CERT_AUTHORITY_INVALID, also with the CA added to NSS; the NSS
entry was removed again). `scripts/qa/learnPageEvidence.ts` fetches app requests on the Node side (`route.fetch()`,
certificate verified there) and gives them to the real page; nothing disables TLS checking.

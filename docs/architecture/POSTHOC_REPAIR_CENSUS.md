# Post-hoc repair census — the 27 `cleanText =` sites classified

Census A (OWNERSHIP_CENSUS_2026-09-01): after the LLM generates a turn, its
text is rewritten at 27 sites in `route.ts`. The mission requires each be
classified before any is retired (Definition-of-Done #10), and any that act as
hidden decision authorities identified (#9). This is that classification.

**Categories**: A genuine safety/validation · B temporary compat · C duplicate
authority (re-decides something another component owns) · D compensation for
missing enforcement (prompt-only rule ignored) · E content-specific · F obsolete.

| line | what it does | cat | flags |
|---|---|---|---|
| 5619 | strip `VISUAL:<type>` tag | A | — |
| 5652 | strip `[HINT]` tag | A | — |
| 5662 | `stripIpaNotation` (beginners) | A | — |
| 5737 | overwrite filler turn with a canned check-question | D | ADDS a question |
| 5747 | `stripRawImageUrls` | A | — |
| 5762 | `normalizeMathDelimiters` | A | — |
| 5788 | `confirmCorrectAnswer` — append ack from server grade | D | states server verdict |
| 5816 | `applyDontKnowCeiling` — withhold question | C | question-ship |
| 6214 | verifier affirm-guard → template fallback | D | EOS flag-gated |
| 6221 | verifier affirm-guard → accept repaired | D | EOS flag-gated |
| 6316 | `verifierGate` finalText | D | EOS flag-gated |
| 6483 | remediation-floor accept repaired | D | — |
| 6531 | remediation-floor fail-closed fallback | D | — |
| 6733 | `withholdUngradedGateQuestion` | C | question-ship |
| 6766 | `withholdClosingProseQuestion` | C | question-ship; else-branch DETECTION-ONLY |
| 6866 | `enforceStance` — strip false mastery-completion | C | completion |
| 6897 | append completion-nudge question | D | ADDS a question + completion |
| 7048 | fail-closed `[LESSON_COMPLETE]` strip (gate threw) | A | — |
| 7054 | fail-closed `[LESSON_COMPLETE]` strip (no state machine) | A | — |
| 7223 | `stripUnbackedFigureReferences` | A | — |
| 7246 | `stripScaffoldHeadings` | A | — |
| 7278 | `stripFabricatedAttribution` | A | — |
| 7324 | `repairMirrorWithVerdict` — replace mirror w/ server grade | D | states server verdict |
| 7367 | `dropDuplicatedMcqProse` | A | — |
| 7451 | `enforceGateProbeContract` — replace prose beside canonical probe | D | — |
| 7610 | `stripResidualMachineTags` | A | — |
| 8282 | `buildLessonCloseText` — replace completing turn with the close | C | completion (the OWNER) |

Most sites (A) are honest text-safety strips and are correct as-is. The
category-C/D flags concentrate on THREE decisions with no single owner:

## Finding 1 — "does a question ship this turn?" — MEASURED: already one owner

The classification flagged 5 sites (withholds 5816/6733/6766, adds 5737/6897) as
having "no single arbiter." **Measuring the actual guards (not just the
`cleanText =` lines the classification saw) corrected this:** the three withholds
are pure STRIPS — removing a question is safe by construction and needs no
arbiter. The two ADD sites — the only sites that can put a NEW question in front
of a learner post-generation — are BOTH already gated by the one arbiter,
`turnArbitration` (Series B Phase 3):

- filler-repair swap (5737) is inside `allows('FILLER_REPAIR')` (route.ts 5713);
- completion-nudge (6897) is inside `allows('NEW_QUESTION')` (route.ts 6895),
  and fires only after a completion claim was made in prose;
- the model's own MCQ is likewise withheld when `!allows('NEW_QUESTION')` (5210),
  and authored-probe eligibility reads `allows('AUTHORED_PROBE')` (4100).

The filler site's own comment records the intent: "a future authority added to
the ladder protects this site automatically instead of waiting for a fourth
production incident to add a fourth boolean." So the "does a question ship"
decision is already owned by `turnArbitration`; the reachability worry
(6897 firing on a withheld turn) is bounded because 6897's guard forbids it on
any turn the arbiter denies NEW_QUESTION (RECOVERY / CLOSE / LEARNER_REQUEST).

**Enforcement pinned** (`questionAddArbitration.test.ts`): both add sites must
stay inside an arbitration-gated block, so a future third add site (the "fourth
boolean") cannot ship an unguarded question. No runtime change — the architecture
was already correct; it was undocumented and unpinned.

## Finding 2 — DETECTION-NOT-ENFORCEMENT at 6766's else (6767–6776)

When the whole closing turn is a question (`reason === 'nothing-would-survive'`),
the offending question ships **unchanged**, logged only. This is a **deliberate,
documented** choice: the only enforcement alternative is inventing a closing
sentence, which the "never fabricate" principle forbids. The honest enforcement
is upstream (stop the model producing a question-only closing turn) or a
non-fabricating fallback to authored close copy — NOT a rewrite here. Left as-is
with this rationale recorded; the Turn Parity Observer (6783) is likewise
measurement-only by design.

## Finding 3 — one computed grade, stated three ways: 5788, 7324, ~6715

`confirmCorrectAnswer` (5788), `repairMirrorWithVerdict` (7324), and the
`justGraded` reveal inside `applyDontKnowCeiling` (≈6715) each render the same
`mcqGradeHoisted` verdict via different triggers. Divergent phrasings of one
grade risk disagreeing on screen. A single "state the graded verdict" owner
would consolidate them.

**MEASURED + PINNED 2026-09-02 (slice 9).** The grade VALUE already has one
owner: `mcqGradeHoisted` is assigned exactly once (route 2171, from
`gradeMcqAnswer`'s deterministic comparison against an authored key), and all
three staters read that one derivation — never a self-report, never a
re-computed grade. `repairMirrorWithVerdict`'s correct-option text also comes
from the SAME `pendingMcqHoisted` the answer was graded against, so it cannot
name a different option. The three are SEQUENTIAL transforms of one `cleanText`
(a later repair replaces the mirror, it does not append a second verdict beside
the first), so two divergent verdicts cannot co-render even in phrasing. So the
"disagree on screen" risk is not reachable today; a full consolidation into one
stater is unnecessary. What IS worth guarding is the one-source invariant — a
future edit giving any stater a second grade source (`signalCorrect`, a
re-derivation) is the reachable regression. `gradeVerdictSingleSource.test.ts`
pins it: single assignment, every stater reads `mcqGradeHoisted`, none reads the
SIGNAL. Same discipline as slices 2/4/5 — measure reachable harm, pin the
invariant, don't consolidate where the semantics don't require it.

## Verdict

No repair is obsolete; none should be deleted. The A-sites are correct. The
consolidation work is **Finding 1** (the question-ship arbiter — the highest
success-condition-#5 value) and, secondarily, **Finding 3** (one server-verdict
stater). Finding 2 is a defensible detection-only choice, recorded not "fixed".

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

## Finding 1 — "does a gradeable/prose question ship this turn?" — 5 sites, no arbiter

Withheld at **5816** (`applyDontKnowCeiling`), **6733** (`withholdUngradedGateQuestion`),
**6766** (`withholdClosingProseQuestion`); a question is ADDED at **5737** (filler
→ canned check-question) and **6897** (completion-nudge). Five post-model sites
decide whether a question is on screen, in sequence, **with no mutual awareness**,
while `gateEligible` already owns *authored-probe* eligibility upstream. This is
success-condition #5 ("gradeable-question decisions cannot be contradicted by
shipped output") and the clearest duplicate authority in the file.

**Open reachability question (resolve before consolidating):** can 6897 ADD a
completion-nudge question on the same turn 6733/6766 WITHHELD one? They fire in
different conditions (nudge = mastery-adjacent; withholds = dry probe pool /
closing episode), plausibly disjoint but **not structurally guaranteed**. The
consolidation is: one post-model "question arbiter" that the withholds and the
adds both consult, so an add can never follow a withhold on the same turn.

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

## Verdict

No repair is obsolete; none should be deleted. The A-sites are correct. The
consolidation work is **Finding 1** (the question-ship arbiter — the highest
success-condition-#5 value) and, secondarily, **Finding 3** (one server-verdict
stater). Finding 2 is a defensible detection-only choice, recorded not "fixed".

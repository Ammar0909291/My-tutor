# Handover — tutor output fixes + learner pilot (2026-09-24)

For the next Claude session (any account) continuing this work. Read this, then
`CLAUDE.md`, then `docs/architecture/RUNTIME_ARCHITECTURE_MAP.md`.

## What the owner asked for

"Fix everything you suggested", within 3 working sessions, and study the product
as a real learner on four owner accounts. The plan that was accepted (after a
steel-man pass) and its status:

| # | Item | Status |
|---|---|---|
| 1 | Figure fidelity — tutor's words vs. the figure on screen | **Done, deployed** (colour claims only; see limits) |
| 2 | No-picture remnants (pointers/ASCII left after "I don't have a picture") | **Done, deployed** |
| 3 | Output verifier: enforce only rules proven precise | **Measured; nothing enforced** (reason below); evidence logging added |
| 4 | Lesson opening (`lesson-init`) gets the chat turn's output checks | **Done, deployed** |
| 5 | Instrumented pilot on real accounts + per-lesson report | **Done** — run 1: 2/8 mastered; root causes fixed in `d6750dc`; run 2 on the 4 failures: 3/4 mastered (see `docs/history/visualization-engine.md`, 2026-09-24 pilot section) |
| — | Structural changes (split route, delete dormant pipelines, new learner store) | **Not in scope** — owner decides from pilot data |

## What changed (commits on `main`)

- `9260d77` fix(tutor-output):
  - `src/lib/teaching/figureReference.ts` — remnant shapes rewritten to keep the teaching:
    "Follow/Trace the arrows…" → "Trace the steps…" (drops "on the left/right"),
    "This layout shows…" → "Here is…", symbol-legend prefix removed, orphan label
    paragraphs dropped only after a removal; new `onlyPointer` flag + `pointerOnlyFallback()`.
  - `src/lib/teaching/asciiDiagramGuard.ts` — Pass 5: standalone one-line art
    (`5'---[Promoter]---3'`) + its caption line; tables/rules/bare box edges excluded.
  - `src/app/api/learn/chat/route.ts` — reference check re-runs AFTER the ASCII guard;
    a pointer-only turn is replaced by the concept's KG title + description; new
    colour-fidelity block for on-screen SCENE figures.
  - `src/lib/teaching/visual/figureFidelity.ts` (new) — colour families from the
    scene's own object colours; removes colour phrases about the figure that name an
    absent colour. Cards/charts are not checked (colours not in payload). Shapes not checked.
  - `src/app/api/learn/lesson-init/route.ts` — ASCII guard, remnant re-check,
    pointer-only fallback, phantom-claim strip, missing-options drop, residual tags.
  - `src/lib/teaching/visualRegistry.ts` — **existing bug fixed**: `stripPhantomVisualClaims`
    flattened every paragraph break even when it removed nothing (all 26 replayed
    production openings). Now returns untouched text as-is and keeps paragraphs.
  - `src/lib/eos-runtime/verifierGate.ts` — in log mode, `[verifier-log]` line per
    rejected draft (codes, matched excerpt, first 200 chars of TUTOR text).
  - Tests: `diagramRemnantCleanup`, `figureFidelity`, `lessonOpeningOutputParity`;
    one pinned control in `figureReference.test.ts` updated with the production evidence.
- `def71c5` `scripts/qa/learnerPilot.ts` — the pilot harness.
- Earlier today, same session: `116a737` runtime architecture map; `33415ef`/`26f8e6a`
  DNA-replication figure; `e09200f`/`4e2a026` visual lifecycle finalization.

Validation at `9260d77`: full suite 719 files / 14,828 passed / 9 skipped; `tsc` clean;
`npm run build` clean. Deployment of `9260d77`: `dpl_Dm19SkDkMerA5AR7KyDaa7y51dvQ`
(check it is READY before trusting production behaviour).

## Verifier decision (item 3) — do not flip it without new evidence

Aggregate over `learn_sessions.contextSnapshot.verifierMetrics` (1,754 sessions):
15,744 turns verified, **8,697 (55%) would be rejected** in enforce mode. Top codes:
V-Q1 6,725 · V-REACT 5,875 · V-Q2 4,023 · V-VOC-FORMULA 2,648 · V-TERMS 1,255 ·
V-REC 803 · V-DUP-EXACT 93. No precision data existed (flagged text was never kept),
so nothing was promoted. Next step: after some real traffic, read `[verifier-log]`
lines from Vercel logs, adjudicate a sample per code, then enforce only codes with
near-zero false positives (needs a per-code enforce path in `verifierGate.ts`).

## Next — (pilot DONE; kept as the re-run recipe) run the pilot and write the report

1. Confirm the latest production deployment is READY (Vercel MCP, project
   `prj_FwjmRdthApGhwdQY7FyDYThD7WJD`, team `team_ZHSoYXkAEang6oq1I9hAPn45`).
2. Get the accounts' password **from the owner in chat**. Never write it to a file,
   commit, log, or this document. Pass it only as an env var for one invocation.
3. Run (plan used; all four accounts belong to the owner, concepts chosen fresh or
   restartable after a narrow `topic_progress` check — `suaibamr@gmail.com` is
   physics-saturated):
   ```
   PILOT_PLAN='[
     {"email":"suaibamr@gmail.com","lessons":[{"subject":"english","conceptId":"eng.grammar.verbs"},{"subject":"chemistry","conceptId":"chem.elect.nernst"}]},
     {"email":"suaibamr1@gmail.com","lessons":[{"subject":"physics","conceptId":"phys.therm.calorimetry"},{"subject":"english","conceptId":"eng.grammar.nouns"}]},
     {"email":"suaibamr3@gmail.com","lessons":[{"subject":"english","conceptId":"eng.phonics.blending-segmenting"},{"subject":"physics","conceptId":"phys.wave.interference"}]},
     {"email":"suaibamr4@gmail.com","lessons":[{"subject":"chemistry","conceptId":"chem.found.stoichiometry"},{"subject":"physics","conceptId":"phys.opt.total-internal-reflection"}]}
   ]' PILOT_PASSWORD='<from owner>' QA_OUT=<scratchpad>/pilot.json \
   npx tsx scripts/qa/learnerPilot.ts
   ```
   Long run (~30 min): run it in the background.
4. Cross-check against Vercel runtime logs for the run window (query `VISUAL_TURN`,
   `[figure-reference]`, `[figure-fidelity]`, `[verifier-log]`) — scope to the
   deployment id or the query times out; output is large, grep the saved file.
5. Write the per-lesson report: turns, model vs memory/gate turns, verified vs
   unverified credit, completion, figures, defects found (`summary.defects` plus
   reading the transcripts). Record it under `docs/history/` (new dated section).
6. Close with the CLAUDE.md report format (one fenced block, git info).

## Standing rules that bit this work

- Egress: 5 GB/month Supabase. Use aggregate SQL only; read Vercel logs rather than
  the database; no new per-turn DB reads.
- `main` only; push `git push origin HEAD:main && git push origin HEAD:claude/physics-master-completion-u7wgrl`
  (the feature pointer is the harness branch of the originating session — use your
  own session's branch name if it differs). Fetch/ff before every push; GitHub
  intermittently returns 503 — retry with backoff.
- Don't `pkill -f` with a pattern that matches your own shell command (it kills the shell).
- Known open, not fixed here: the tutor still invents shapes ("little motor") and can
  misstate process direction on scene figures; the content-free hold
  ("Let's stay with this idea for a moment."); `MISCONCEPTION_DETECTED` firing on
  conversational nudges. Details: `docs/history/visualization-engine.md` (2026-09-24).

## LATEST (2026-09-24, acting as a real student) — read first

Owner asked Claude to use the owner accounts "as real students". Tool: `scripts/qa/studentTurn.ts`
(`open` / `say`, one turn per call, password via `STUDENT_PASSWORD` env only). Findings and the one
fix shipped (typed grouped numbers now graded) are in `docs/history/visualization-engine.md`,
section "Acting as a real student". **Two items need the OWNER's approval before any code** (they
change assessment behaviour — CLAUDE.md G1/G2): (1) re-serve a MISSED authored probe once the
pool is spent in an attempt; (2) stop the model seeing/solving the gate probe before it is asked
(answer leak). **UPDATE: the owner APPROVED both ("Approved, implement both items") and both are
shipped** — see the next section of `docs/history/visualization-engine.md`. Next: after deploy, run
a real-student lesson and grep the Vercel logs for `missed-probe-reasked` / `[answer-leak]`.

## LIVE LOOP STATE (updated every loop step)

The owner said: fix what was proposed WITHOUT asking for approval, work in a loop,
keep this file current so another account can continue with no prompts from the owner.
Stay inside the owner's "3 complete sessions" budget for this work (about 2 used by 2026-09-24).

| Step | What | Status |
|---|---|---|
| L1 | Gate-internal withhold falls back to the concept, not "Let's stay with this idea" (`2935762`) | **deployed READY** (`dpl_2AUZmqyp36KL8Ub9N2Z6sRL3vtCX`, 14:10 UTC) |
| L2 | Re-run pilot: `chem.found.stoichiometry` on suaibamr4 with `PILOT_MAX_TURNS=20`, + `eng.grammar.pronouns` on suaibamr4 (fresh) | **done** 14:17 UTC — hold line 0/27 turns; pronouns mastered; stoichiometry closed by concept budget at t12 (model-invented questions, harness answers blindly — needs a real learner) |
| L3 | Record L2 results in `docs/history/visualization-engine.md` + this table | **done** — recorded in `docs/history/visualization-engine.md` (pilot run 3); follow-up fix for \"This simple layout shows…\" |
| L4 | Stop the loop. Items #2-#4 of the plan need REAL learners and owner decisions — do not start them. | **LOOP STOPPED** — all proposed fixes that need no real learners are shipped and verified |

How to run a step with no owner input:
1. Check the latest production deployment is READY and its commit is ≥ the step's commit
   (Vercel MCP `list_deployments`, project `prj_FwjmRdthApGhwdQY7FyDYThD7WJD`, team
   `team_ZHSoYXkAEang6oq1I9hAPn45`, target production).
2. Pilot command (password: ask the owner, or — if the owner has already given it in the
   current chat — pass it ONLY as `PILOT_PASSWORD` for the one invocation; never commit it):
   ```
   PILOT_MAX_TURNS=20 PILOT_PLAN='[{"email":"suaibamr4@gmail.com","lessons":[{"subject":"chemistry","conceptId":"chem.found.stoichiometry"},{"subject":"english","conceptId":"eng.grammar.pronouns"}]}]' \
   PILOT_PASSWORD=… QA_OUT=<scratchpad>/pilot3.json npx tsx scripts/qa/learnerPilot.ts
   ```
   Pass criteria: `summary.mastered` true on stoichiometry, no `content-free-hold` defect,
   no turn text equal to "Let's stay with this idea for a moment."
3. If a new defect appears: reproduce it against the real module with the production text,
   fix at the shared cause, add a test with that text, run `npx tsc --noEmit`, the full
   `npx vitest run`, `npm run build`, then commit + push (`main` and the session's feature
   pointer), update THIS table, and re-verify after deploy.
4. Owner asked for a 60-second loop wake between steps (`send_later` delay 1 minute).
   Don't poll faster than that; use background commands for long runs.

## Status at hand-off (after pilot run 2)

- `d6750dc` fixes are live (`dpl_CopQvQGpR5S4HhuWikc9EjCBVndQ`); full suite 720 files /
  14,842 passed; tsc clean; build clean.
- **Next concrete item**: thread the concept (KG title/description) into the gate-internal
  ungradeable-question strip in `src/lib/teaching/gateAssessment.ts` (the
  `WITHHELD_QUESTION_CONTINUATION` sites) so it stops shipping "Let's stay with this idea for a
  moment." — the final-response site in `route.ts` already does this (`finalFallback`).
  Then re-run the pilot on `chem.found.stoichiometry` (suaibamr4) with a higher turn cap.
- The 3-session budget the owner set is nearly spent: this work used ~2.

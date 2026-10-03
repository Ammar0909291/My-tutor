# Launch readiness — 2026-10-03

Owner-scoped loop: "Get My Tutor ready for end users". Every number below was measured in
production (Vercel runtime logs, read-only SQL against `ywakxiqbevfuxsiwewnw`) or with the
repo's own audit scripts, as noted. QA traffic came only from disposable
`qa-*@mytutor-qa.invalid` accounts, each deleted at the end of its run. No real account was used.

## Verdict

| Subject | Verdict | Why |
| --- | --- | --- |
| physics | **Ready for a pilot** | All checks under the bar; 238/238 concepts resolve a figure |
| biology | **Ready for a pilot** | All checks under the bar; 199/199 concepts resolve a figure (closed today) |
| chemistry | **Ready for a pilot, with a known gap** | All checks under the bar; 139/186 concepts have no static figure and depend on live generation |
| english | **Ready for a pilot, with a known gap** | All checks under the bar; 3 phonics (concept, band) pairs are voice-only by design, so no written mastery path; 0/216 static figures |
| mathematics | not assessed here | Owned by another session |

**Pilot recommendation:**
- A small, invite-only pilot (5–20 learners) in physics and biology first, then chemistry and
  English.
- Keep `TURN_ASSEMBLY_MODE=serve` and `FACT_CHECK_MODE` at its default (shadow).
- Re-run the checks in this file after the first week of real traffic. Everything below came
  from scripted disposable accounts, and real learners write differently.
- **Factual correctness of the teaching text is NOT verified** (item 3). A pilot should say so to
  its learners, or have a subject expert spot-read sessions.

## Item 1 — no stub reply on a quiz answer

- **Fix:** `6d0fb30` (`neutralAssembly.ts`). A tap on a *model-written* card used to get "Here
  is your next question." (2 cases since serve). It now gets a reason that judges nothing:
  - no verdict (N1);
  - no option named (N2);
  - served only when the live reply is a stub.
- **Measured (read-only SQL; graded turn = assistant row carrying a `PROBE_OUTCOME` evidence
  event):**
  - since serve (11:37 UTC): **583 graded turns, K1 2 (0.34%)**, under the 1% target;
  - both stubs predate the fix; **since the fix: 0 of 132**.
- **Caveat:** no tap on a model-written card happened after the fix (`[assembled-neutral]`: 0
  lines). The neutral path is tested (unit and route) but not yet observed in production.

## Item 2 — English content gap

- **Measured (`npx tsx scripts/assets/contract-audit.ts --subject english`):**
  - 216/216 concepts authored;
  - **409 of 412** (concept, band) pairs at contract;
  - **3 short**, all 0 gradeable probes.
- The loop's brief said 91 pairs were missing. That figure was stale: other sessions had closed
  88 of them before this loop started.
- **The 3 short pairs are deliberate, documented exclusions, not omissions:**
  - `eng.phonics.letter-sound-correspondence::EARLY`
  - `eng.phonics.phonemic-awareness::EARLY`
  - `eng.phonics.phonemic-awareness::ADULT`
- The concept's own Educational Brain entry calls phonemic awareness "the tree's flagship
  voice-required territory … nothing is writable". It calls letters in this skill a category
  error, because a written option list needs the letter-sound knowledge this node comes before.
  The reasoning is recorded in `src/lib/teaching/assets/englishLetterSoundElementaryGap.ts`.
  Writing closed-choice probes only to reach "0 short" would contradict the authored
  pedagogy, so none were written.
- **Consequence for learners:** a learner on one of these 3 (concept, band) pairs has no
  gradeable written probe, so that lesson cannot reach *verified* mastery in text mode.
- **Owner decision needed (one of):**
  - (a) accept the three as voice-only, recorded as such;
  - (b) build a voice-graded probe path.
- **Production convergence (read-only SQL, `authorId = 'EDUCATIONAL_BRAIN_SEED'`):**
  - ACTIVE English rows: **626 EXPLANATION + 1,503 PROBE across 216 concepts**. This equals
    the seed corpus exactly (`scripts/brain/seed-knowledge-assets.ts --draft --dry-run`: 626 +
    1,503).
  - **0 hollow identities, 0 duplicate slugs.**

## Item 3 — fact-check gate (Phase 5)

- **Shipped in shadow** (`df8bd0d`, `55396db`, `factCheck.ts`).
  - Check F1 flags a served sentence that states one of the concept's authored misconception
    distractors as fact.
  - `FACT_CHECK_MODE` is off, shadow or serve; the default is shadow.
- **Production shadow:** **0 flagged of 78 checked turns**.
- **Offline precision**, every authored explanation (known-correct prose) checked against its own
  concept's distractors:
  - first version: 131 of 2,200 flagged, hand-read **30 of 30 false positives**;
  - tightened version: 25 of 2,156 flagged, hand-read **25 of 25 false positives**.
- **Why:**
  - the prose describes the misconception in order to correct it;
  - a distractor is wrong only as an answer to its own question, and is often true as a
    standalone sentence.
- **Precision 0%**, far under the 90% bar, so **nothing is served**.
- **Hand-read of 30 unflagged served turns:** 0 clear factual errors, 2 imprecisions:
  - fluorine's smaller radius explained as "inner electrons shield poorly";
  - bipedalism dated to "about 4 million years ago".
- **The facts in the teaching text are not verified correct; this check cannot do it.** A useful
  gate would need claim extraction checked against authored *statements*, not distractors, or
  a subject-expert review loop. Recorded as open.

## Item 4 — visuals and empty replies

- **Biology figures: 199/199** concepts resolve a static Tier 0/1 figure of their own
  (`c2f9f90`). The last one was `bio.plant.plant-respiration`: a day / compensation point /
  night comparison, grounded in its EB entry.
- **Also measured:**
  - physics 238/238;
  - chemistry 47/186 (139 depend on live generation);
  - English 0/216;
  - computer science 33/119.
- **Empty replies** (read-only SQL, assistant rows with blank content):
  - **0 of 3,835** since 2026-09-29;
  - **0 of 414** since this loop's deploys.
  - The 163 earlier empty rows all date from 2026-09-28 or before, which is when the
    empty-reply net shipped.
- **`bio.immuno.immune-disorders`:** the 2026-09-24 logs are past retention, so its exact
  chain cannot be re-read. The reported shape (a reply made only of figure references) is now
  pinned end to end (`f67908c`): the learner gets text plus the concept's figure.

## Item 5 — end-to-end learner QA

- **Method:** `scripts/qa/shadowSampleRun.ts`, `QA_ALL_RIGHT=1`. Each run drives lessons to
  verified mastery on a disposable account, deleted afterwards. Two batches, 2026-10-03 17:25
  and 21:00 UTC (the first batch's runtime logs expired before they were read).

| Subject | Lessons to verified mastery | Graded taps | K1 on graded | K2 beside a card | K5 | Z1 | Z2 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| physics | 8 | 34 | 0 | 0 / 36 | 0 | 0 fails / 34 passes | 0 (min 4 passes) |
| chemistry | 7 | 31 | 0 | 0 / 32 | 0 | 0 / 31 | 0 (min 4) |
| biology | 9 | 36 | 0 | 0 / 39 | 0 | 0 / 36 | 0 (min 3) |
| english | 7 | 31 | 0 | 0 / 33 | 0 | 0 / 31 | 0 (min 4) |

- **Window:** turns since 17:23 UTC.
- **Z1:** every tap was the authored correct option, so any fail would be a grading error.
- **Z2:** a lesson completed with fewer than 3 graded passes.
- **K3** (the previous answer quoted on the next item) was not re-measured in this window. It
  was 0 since serve in the Phase-0 re-run (`TURN_ASSEMBLY_PHASE1_SPEC.md` §17).
- **Runtime:**
  - graded turns served assembled 25/25 in the fetched window;
  - completion agreement 100%;
  - **no 5xx** in production over the 4 hours covering both batches.
- **Limit:** scripted learners always answer correctly or alternate. Real learners type free
  text, ask off-topic questions and abandon lessons, none of which this exercises.

## Owner-only actions (not attempted)

1. Verify the Resend sending domain. Welcome emails currently fail for everyone but the owner.
2. Rotate the OpenRouter key and clear the comment on the `OPENROUTER_API_KEY` Vercel variable.
   The comment holds what looks like the key in plaintext.
3. Change the owner's account password. It was posted in chat.
4. Delete the leftover QA accounts from 2026-10-02 17:01 and 2026-10-03 13:11 UTC.
   - Note: the app's own account deletion anonymises rather than deletes. A "deleted" QA
     account keeps its `users` row as `deleted_…@mytutor-qa.invalid`, together with its
     progress and evidence rows.
   - Whether that is the intended retention policy is the owner's call.
5. Decide the three English voice-only (concept, band) pairs (item 2): accept them, or build a
   voice-graded probe path.

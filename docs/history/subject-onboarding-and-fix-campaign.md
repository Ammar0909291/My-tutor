# Subject-Onboarding Pipeline Audit & Physics/English/Chemistry Fix Campaign (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Subject-onboarding pipeline — audit, not a new build (2026-09-17)

**Requested scope**: with only English/physics/chemistry EB-complete (mathematics 577/908,
biology and computer_science with zero `educational-brain/concepts/{subject}/` entries — see the
"CS asset-contract campaign" batches immediately above), the owner asked to stop adding more
per-subject content patches and instead audit whether the underlying PIPELINE (KG → registration
→ seed corpus → bootstrap wiring → asset contract) is generic enough that a future subject goes
through it cleanly, rather than repeating the class of defect §10.1 of
`TUTOR_REMEDIATION_PLAN.md` already found and fixed once (33 stranded seed modules, discovered
2026-09-14).

**Finding: two of the biggest historically-real defect classes are ALREADY hardened with
dedicated regression tests, both confirmed to run in the CI hard gate (`npx vitest run` in
`.github/workflows/validate.yml`), and both DYNAMIC — they discover subjects from disk rather
than a hand-maintained list, so they catch a hypothetical future subject automatically, not just
the current six:**
- **`curriculumKgRegistration.test.ts`** — guards the exact English-registration-gap class of bug
  (a KG existed on disk, was never wired into `SUBJECT_ADAPTERS`/`ID_PREFIX_TO_SUBJECT` in
  `knowledgeGraph.ts`, so the app silently served a smaller legacy curriculum instead). Discovers
  every `docs/{subject}/kg/graph.json` and asserts `getKnowledgeGraph()` returns the full,
  correct node count for each.
- **`seedCorpusCoverageRatchet.test.ts`** — guards the exact "two writers, one corpus" class of
  bug (§10.1's 33 stranded modules: `scripts/brain/seed-knowledge-assets.ts` and
  `src/instrumentation.ts`'s cold-start bootstrap each hand-maintain their own import list of
  asset modules under `src/lib/teaching/assets/`, and nothing tied the two together). Discovers
  every content module by its EXPORTED TYPE (`SeedExplanation[]`/`SeedProbe[]`), not by name or
  by either writer's own import list, and asserts both writers import every one.

**One real, if minor, blind spot found and fixed — `scripts/assets/contract-audit.ts`'s readiness
report silently omitted any subject with zero seed content.** Its subject list was derived only
from `subjectSlug` values already present in loaded explanations/probes — a subject whose KG
exists and is correctly registered in `SUBJECT_ADAPTERS` but has no seed corpus AUTHORED yet
(the exact state a brand-new subject starts in) simply never appeared in the report, rather than
showing up as a visible "0 authored of N in the KG" line someone would notice. Fixed: a new
`kgSubjects()` function (exported, reused by the new test rather than re-implemented) discovers
every `docs/{subject}/kg/graph.json` on disk — same technique as `curriculumKgRegistration.test.ts`
— and is unioned into the audit's subject list; the table gained a `kg concepts` column so the
gap between "concepts in the KG" and "concepts with any authored seed content" is visible for
every subject, not just the ones already being worked. Pinned by new
`contractAuditSubjectCoverage.test.ts` (9 assertions: kgSubjects() matches an independent scan of
`docs/`; every discovered subject's concept count is correct; every seed module's `subjectSlug`
resolves to a registered KG subject — an orphan-slug check that would catch a typo or a subject
removed from the registry while its seed content was left behind).
`scripts/assets/contract-audit.ts`'s `main()` was guarded behind `require.main === module` so the
new test can import `kgSubjects()` without triggering the CLI's console output as an import side
effect — the script's behaviour when actually run (`npx tsx scripts/assets/contract-audit.ts`) is
unchanged, verified by running it before and after.

**Incidental finding surfaced by the new column, not itself investigated further this session**:
mathematics's KG has 908 concepts but only 273 have ANY seed content in the runtime corpus — a
materially bigger gap than the already-known 577 vs. 908 Educational Brain gap, since even fewer
EB-authored concepts have been transcribed into `mathematicsSeedAssets.ts`'s siblings than
previously tracked. Not this session's to fix (that's Curriculum Completion Program /
content-authoring territory, same as the CS/biology asset-contract gaps above) — recorded because
the column that surfaced it is new.

**What this means for a future subject, concretely**: drop `docs/{subject}/kg/graph.json` in,
register it (the one remaining genuinely manual step — `knowledgeGraph.ts`'s own header still
says "add one entry to SUBJECT_ADAPTERS + one entry to ID_PREFIX_TO_SUBJECT... no new adapter
code is required"), and from that point on: forgetting the registration step fails CI immediately
via `curriculumKgRegistration.test.ts`; authoring a seed module and wiring it into only one of the
two writers fails CI immediately via `seedCorpusCoverageRatchet.test.ts`; and the subject is
visible in the asset-contract readiness report from the moment its KG exists, at 0% authored,
rather than needing to be remembered.

**Deliberately NOT done, and why**: did not add a CI GATE on asset-contract completion — the
readiness report's own header already states this decision correctly (`masteryReachability.ts`'s
reasoning, reaffirmed in `TUTOR_REMEDIATION_PLAN.md` §11.10: "§10.2 survives only as a REPORT,
never a gate"), and this session found no new evidence to reopen that call. Did not touch the
registration step's manual nature (adding automatic subject discovery there would be a real
architecture change, not a hardening fix, and no defect currently motivates it beyond what the
registration test already catches).

Targeted validation before commit: `npx tsc --noEmit` clean; `npm run build` clean (middleware
79.7 kB, unchanged); the two pre-existing generic-hardening tests plus the new
`contractAuditSubjectCoverage.test.ts` plus every asset-contract test — 7 files / 557 tests, all
passing. **Full suite confirmed green after commit**: 699 files / 14,457 passed / 9 skipped, no
regressions from either this change or the three preceding CS asset-contract batches. No
curriculum/KG/Educational Brain content touched by this entry's own change — only
`scripts/assets/contract-audit.ts` and the new test.


## HANDOVER — "fix physics/english/chemistry" campaign (2026-09-17, session in progress)

**Full suite confirmed green after the `ebf88245` contract-audit fix**: 700 files / 14,461 passed
/ 9 skipped, no regressions.

**Read this section FIRST if picking this campaign up cold.** Owner-scoped, live in-chat
instruction: "fix physics, english and chemistry, rest work will see later" — biology,
computer_science, and mathematics content work (the asset-contract probe campaign a few sections
above, batches `c0c95636`/`c7e40c25`/`d2aeea10`) is explicitly PAUSED, not abandoned. Do not
resume it without a fresh instruction.

### The one fact that changes everything about this campaign: `contract-audit.ts` was lying about English

Commit `ebf88245` (immediately above, same session). English is at **313/412 (76%) asset-contract
pairs**, not the 2/412 (0.5%) every prior session — including this one, until this fix — had been
quoting. The prior number was a bug in the MEASURING TOOL (a name-based content-detection heuristic
that silently dropped 22 real, authored English batch files), not a true reading of the corpus.
**Regenerate the number yourself before trusting anything written before this commit**:
```
npx tsx scripts/assets/contract-audit.ts --subject english
```
The TRUE remaining English gap is 99 pairs (96 of them ADULT band, all zero-probe) — a much
smaller, more tractable campaign than previously believed, same shape and same proven technique as
the CS/biology batches above (add one `probeKind: 'true_false'` (or another fresh kind) probe per
short pair, reusing an existing registered misconceptionId, avoiding the P-10 slot-collision class
documented in `brainSeedAssets.ts`).

### Current subject state (re-verify with `npx tsx scripts/assets/contract-audit.ts`, don't trust a stale number)

| subject | asset-contract status | what "fix" means here |
|---|---|---|
| chemistry | 186/186 (100%) | defect-hunting only — content is complete |
| physics | 261/261 (100%) | defect-hunting only — content is complete |
| english | 313/412 (76%), 99 short | BOTH: close the remaining 99-pair gap (content work) AND defect-hunt on the 76% that's already servable |
| biology, computer_science, mathematics | PAUSED | not this campaign's scope right now |

### Defect-hunting: what's already known, and what's in flight

CLAUDE.md's "Physics + Chemistry ceiling broken" section (2026-08-31, ~2.5 weeks before this
entry) recorded two defects explicitly measured and **left unfixed at the time** — worth
re-verifying fresh before assuming they're still accurate, since a few other things (probe depth,
`answerConfirmation.ts`, `dontKnowCeiling.ts`) shipped in the same period and could have changed
the picture:
- **ASCII-art fallback figures**: 18% of physics sessions, 64% of chemistry sessions in that
  measurement. Naive stripping was tested and found NOT to correlate cleanly with mastery
  (opposite direction in each subject) — don't re-attempt that specific fix without new evidence.
- **Content-free hold** (9 of 67 sessions, the whole turn) — flagged as "a content-generation
  problem, not a text-repair one," i.e. needs the model to actually have something to say, not a
  prompt patch.
- **C7** (the "explanation repeats verbatim" criterion) — an earlier fix (`5c1d7c8`, referenced
  higher up in this file) was later found to NOT actually work at full sample (p=0.80, not the
  interim p=0.11 that looked promising) — a third, unidentified channel is producing repeats.

### CRITICAL — `suaibamr@gmail.com` is now SATURATED for physics; do not use it for physics
### mastery-reachability QA without filtering already-completed concepts (2026-09-17)

A live-QA run (`strugglingLearnerHarness.ts`, 4 physics concepts, `--seed=42`) showed **0/4
sessions reaching verified mastery** and, per-turn, **`checkCorrect`/`practiceCorrect` never
incrementing across ~16 answered MCQ turns even on turns where the harness's sent text was a
byte-verbatim match to what reads as the objectively correct option** (verified by reading
`resolveMcqChoice`'s rule 0 — exact-string match, runs first, correctly handles this case; no
grading-pipeline bug was found by code inspection). This looked, at first, like a serious new
regression.

**It was not. Root-caused via direct production DB query (Supabase MCP, project
`ywakxiqbevfuxsiwewnw`), not guessed:**
```sql
select "subjectSlug", count(*) filter (where status='COMPLETED') as completed, count(*) as total
from topic_progress where "userId" = '<suaibamr's id>' group by "subjectSlug";
-- physics: 237 completed / 238 total. chemistry: 22/53. english: 13/38. mathematics: 1/2.
```
**Physics is 237 of 238 concepts COMPLETED on this account already** — from this project's own
extensive multi-week Physics Teachability Program / ceiling-breaking / I1-I4 investigation
history, all run on this same real account. Only `phys.meas.vector-products` (IN_PROGRESS) is not
COMPLETED; **zero physics concepts are genuinely untouched.** All 4 concepts my run happened to
sample were already COMPLETED weeks ago (2026-08-19 through 2026-09-07). Re-teaching an
already-COMPLETED concept goes through review/revisit behavior this harness was never designed to
measure (it assumes first-contact teaching), and the harness's own existing SESSION ISOLATION
guard (see its header) only detects mid-run CONCEPT DRIFT — it has no guard against sampling an
already-mastered concept in the first place. **The 0/4 result is a QA-methodology confound
(saturated account), not a new grading or teaching defect.** Do not chase this as a product bug.

**Chemistry (22/53 touched) and English (13/38 touched) are still mostly fresh** on this account —
most concepts in both subjects have never been taught to it. Physics defect-hunting on this
account is effectively a dead end now; chemistry/english defect-hunting can still proceed on it
for a while, but will saturate too if runs keep accumulating COMPLETED rows.

**For any future physics (or, eventually, chemistry/english) fresh-teach QA**, either:
1. Query `topic_progress` for the account first (as above) and pick concepts NOT already
   COMPLETED, or
2. Use a disposable QA account instead (`scripts/qa/liveAccount.ts`'s established
   register→drive→delete lifecycle, `qa-*@mytutor-qa.invalid`) — the mechanism this codebase
   already built for exactly this purpose, used throughout the original Physics Teachability
   Program and struggling-learner harness work before this session.
Given physics has essentially 0 fresh concepts left on the real account, **option 2 is the only
viable path for further physics mastery-reachability QA** unless the owner wants topic_progress
rows reset (a destructive action on the owner's own account data — ask first, don't do it
unprompted).

### Batch — English `eng.composition.*` ADULT-band gap, first 8 of 16 (2026-09-17)

Closed 8 of the 99 short (concept, ADULT-band) pairs using the established, proven technique
(`englishAdultBandBatch1.ts`'s `adultLadder` helper: `mcq`(FOUNDATIONAL) +
`misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's `misconceptionId` reusing
one of the concept's own two already-registered Blueprint misconceptions, fresh adult-register
worked examples never duplicating the Blueprint's own Conflict-Evidence examples). New file:
`englishAdultBandBatch13.ts` — `eng.composition.academic-writing-conventions`,
`argumentation-basics`, `audience-and-purpose`, `claim-evidence-reasoning`,
`comparative-essay-writing`, `counterargument-and-rebuttal`, `editing-for-style`,
`figurative-language-in-composition` (24 new probes). Wired into BOTH writers
(`src/instrumentation.ts`'s bootstrap `ALL_PROBES` and `scripts/brain/seed-knowledge-assets.ts`'s
`ALL_PROBES`) — `seedCorpusCoverageRatchet.test.ts` passes, confirming neither writer is missing
it. None of these 8 concepts held any prior ADULT probe, so this is a fresh singleton-to-ladder
promotion with zero P-10 collision risk (confirmed: `--dry-run` shows 0 skipped/0 revived across
the whole 7,625-item corpus).

English: **313/412 → 321/412 at contract, 99 → 91 short.** Remaining 91: the other 8
`eng.composition.*` concepts (logical-fallacies, persuasive-techniques,
plagiarism-and-citation-ethics, research-paper-writing, rhetorical-analysis, rhetorical-appeals,
rhetorical-devices, style-voice-and-tone) plus `eng.communication.*` (11),
`eng.linguistics.*` (16), `eng.literature.*` (16 advanced), `eng.phonetics.*` (12 advanced),
`eng.vocab.*` (9 advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-genres`,
`eng.speaking.debate-skills`/`presentation-skills`, and 2 EARLY-band phonics pairs
(`letter-sound-correspondence`/`phonemic-awareness` — these already carry `openRecall=1`, i.e.
some non-closed-choice content; per `englishAdultBandBatch1.ts`'s own established precedent these
two are voice-required and deliberately excluded from closed-choice probing, so they may not be
closable the same way — check `educational-brain/first-lesson/07-subject-adaptations.md` §1
before touching them).

Validated: `npx tsc --noEmit` clean; `contractAuditShapeDetection`/`contractAuditSubjectCoverage`/
`seedCorpusCoverageRatchet`/`curriculumKgRegistration` (23 tests) green;
`contract-audit.ts --subject english` confirms 321/412; `seed-knowledge-assets.ts --draft
--dry-run` shows 7,625 would-create, 0 skipped, 0 revived (no duplicate canonicalSlugs anywhere in
the corpus); full suite run separately, see commit message for the confirmed count.

### Discipline reminder for whoever continues this
Same as every other campaign in this file: small bounded batches, `npx tsc --noEmit` clean +
targeted tests + full suite + `npm run build` clean before every commit, commit+push each batch
separately, update THIS section (or a fresh dated one) rather than leaving stale status here.
Never write the real account's password to any file — treat it exactly like the four-primitives
campaign's OWNER OVERRIDE precedent: a live, in-chat credential, used only as an ephemeral env var
at invocation time. **Re-verify `topic_progress` completion state on whichever account you use
before any fresh-teach QA run** — this file's own account-saturation finding above is the reason
why.

### Batch — English `eng.composition.*` ADULT-band gap, remaining 8 of 16, closes the subdomain (2026-09-17)

Closed the 8 `eng.composition.*` concepts Batch 13 deliberately deferred (logical-fallacies,
persuasive-techniques, plagiarism-and-citation-ethics, research-paper-writing, rhetorical-analysis,
rhetorical-appeals, rhetorical-devices, style-voice-and-tone), using the identical established
technique (`englishAdultBandBatch13.ts`'s `adultLadder` helper: `mcq`(FOUNDATIONAL) +
`misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's `misconceptionId` reusing
one of the concept's own two already-registered Blueprint misconceptions — verified against each
concept's own Component 1 Misconception Register before writing, every one of the 8 holds exactly
MC-A/MC-B, no more, no fewer). New file: `englishAdultBandBatch14.ts` (24 new probes). Wired into
both writers (`src/instrumentation.ts`'s bootstrap `ALL_PROBES` and
`scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) — `seedCorpusCoverageRatchet.test.ts`
passes. All 8 concepts held zero prior ADULT probes, so this is a fresh singleton-to-ladder
promotion with zero P-10 collision risk (`--dry-run`: created=7649, skipped=0, revived=0).

`eng.composition.*` (16 concepts) is now fully closed at asset-contract. English:
**321/412 → 329/412 at contract, 91 → 83 short.** Remaining 83: `eng.communication.*` (11),
`eng.linguistics.*` (16), `eng.literature.*` (16 advanced), `eng.phonetics.*` (12 advanced),
`eng.vocab.*` (9 advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-genres`,
`eng.speaking.debate-skills`/`presentation-skills`, and the 2 EARLY-band phonics pairs flagged in
the Batch 13 entry above (deliberately excluded — voice-required, not closable the same way).

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green; `contract-audit.ts --subject english` confirms
329/412; `validate-knowledge-graph.ts docs/english/kg/graph.json` PASS (KG file untouched); full
suite 700/700 test files, 14,461 passed / 9 skipped (no regression vs. pre-batch baseline);
`npm run build` clean (middleware 79.7 kB, no regression).


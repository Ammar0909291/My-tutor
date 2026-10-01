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

### Batch — English `eng.communication.*` ADULT-band gap, all 11 short concepts, closes the subdomain (2026-09-18)

Closed all 11 short `eng.communication.*` concepts (`digital-communication` was already at
contract, so untouched): academic-writing-advanced, business-writing, cross-cultural-
communication, discourse-markers-advanced, editing-for-publication, media-literacy, negotiation-
language, presentation-design, professional-communication, research-methodology-writing,
technical-writing. Same established technique as Batches 13-14 (`adultLadder` helper: `mcq`
(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's
`misconceptionId` reusing one of the concept's own two already-registered Blueprint
misconceptions — verified against each concept's own Component 1 Misconception Register before
writing, every one of the 11 holds exactly MC-A/MC-B). New file: `englishAdultBandBatch15.ts` (33
new probes). Wired into both writers (`src/instrumentation.ts`'s bootstrap `ALL_PROBES` and
`scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) — `seedCorpusCoverageRatchet.test.ts`
passes. All 11 concepts held zero prior ADULT probes, so this is a fresh singleton-to-ladder
promotion with zero P-10 collision risk (`--dry-run`: created=7682, skipped=0, revived=0).

English: **329/412 → 340/412 at contract, 83 → 72 short.** Remaining 72:
`eng.linguistics.*` (16), `eng.literature.*` (16 advanced), `eng.phonetics.*` (12 advanced),
`eng.vocab.*` (9 advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-genres`,
`eng.speaking.debate-skills`/`presentation-skills`, and the 2 EARLY-band phonics pairs flagged in
the Batch 13 entry above (deliberately excluded — voice-required, not closable the same way).

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green; `contract-audit.ts --subject english` confirms
340/412; `validate-knowledge-graph.ts docs/english/kg/graph.json` PASS (KG file untouched); full
suite 700/700 test files, 14,461 passed / 9 skipped (no regression vs. pre-batch baseline);
`npm run build` clean (middleware 79.7 kB, no regression).

### Batch — English `eng.linguistics.*` ADULT-band gap, all 18 short concepts, closes the subdomain (2026-09-18)

**Correction to the prior estimate**: this file's own "Remaining 72" line above quoted
`eng.linguistics.*` as 16 concepts. Live regeneration (`contract-audit.ts --subject english
--all`) found **18**, not 16 — the stale estimate is corrected here, per this campaign's own
standing rule to never trust a count in a history file. The same `--all` regeneration also
surfaced **3 previously-unknown short `eng.grammar.*` pairs** (`colons-semicolons-dashes`,
`parallel-structure`, `sentence-combining`) that no prior entry in this file had recorded —
flagged here for a future bounded batch; NOT touched by this batch (different subdomain, one-
subdomain-per-batch discipline).

Closed all 18 short `eng.linguistics.*` concepts: applied-linguistics-intro, bilingualism-and-
multilingualism, computational-linguistics-intro, corpus-linguistics-intro, dialectology,
discourse-analysis-intro, historical-linguistics-intro, language-acquisition-intro, language-
families, morphology-intro, phonology-intro, pragmatics-intro, psycholinguistics-intro,
semantics-intro, sociolinguistics-intro, syntax-theory-intro, translation-studies-intro, what-is-
linguistics. Same established technique as Batches 13-15 (`adultLadder` helper: `mcq`
(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's
`misconceptionId` reusing one of the concept's own two already-registered Blueprint
misconceptions — verified against each concept's own Component 1 Misconception Register before
writing, every one of the 18 holds exactly MC-A/MC-B). New file: `englishAdultBandBatch16.ts` (54
new probes). Wired into both writers (`src/instrumentation.ts`'s bootstrap `ALL_PROBES` and
`scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) — `seedCorpusCoverageRatchet.test.ts`
passes. All 18 concepts held zero prior ADULT probes, so this is a fresh singleton-to-ladder
promotion with zero P-10 collision risk (`--dry-run`: created=7736, skipped=0, revived=0).

English: **340/412 → 358/412 at contract, 72 → 54 short.** Remaining 54: `eng.literature.*` (16
advanced), `eng.phonetics.*` (12 advanced), `eng.vocab.*` (9 advanced), `eng.writing.*` (9
advanced), the 3 `eng.grammar.*` pairs flagged above, `eng.reading.reading-across-genres`,
`eng.speaking.debate-skills`/`presentation-skills`, and the 2 EARLY-band phonics pairs flagged in
the Batch 13 entry above (deliberately excluded — voice-required, not closable the same way).

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green; `contract-audit.ts --subject english` confirms
358/412; `validate-knowledge-graph.ts docs/english/kg/graph.json` PASS (KG file untouched); full
suite 700/700 test files, 14,461 passed / 9 skipped (no regression vs. pre-batch baseline);
`npm run build` clean (middleware 79.7 kB, no regression).

**Egress check (owner-requested mid-batch, 2026-09-18)**: this batch's changes are pure static
TypeScript (new seed-asset arrays + import/spread wiring in `instrumentation.ts` and
`seed-knowledge-assets.ts`) — no DB writes performed this session (validation used `--dry-run`
only), and the corpus-scoped completeness-probe query logic in `instrumentation.ts` (the two-COUNT
cheap probe intersected against `expectedSlugs`, see its own long comment block) was not touched,
only its `ALL_PROBES` array gained more entries via `...` spreads, the same pattern already used
for batches 1-15. A live read-only Supabase check (`get_project`, `get_advisors` type=performance,
`query_logs` last 24h on project `ywakxiqbevfuxsiwewnw`) found no active egress risk: no
row-scanning query patterns, no anomalous log volume, no repeated high-row-count signatures. The
advisor findings (32 unindexed FKs, 1 table without a PK, 43 unused indexes) are pre-existing
hygiene items unrelated to the two previously-fixed leaks. Note: the Supabase Management
API/MCP tools do not expose actual monthly GB egress-vs-quota numbers — that requires the
Supabase dashboard's own Usage/Billing page, which only the owner can check directly.

### Batch — English `eng.grammar.*` gap, the 3 pairs Batch 16 surfaced, closes the subdomain (2026-09-18)

Closed all 3 previously-unrecorded short `eng.grammar.*` pairs found by Batch 16's live
regeneration: `colons-semicolons-dashes`, `parallel-structure`, `sentence-combining`. Same
established technique as Batches 13-16 (`adultLadder` helper: `mcq`(FOUNDATIONAL) +
`misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's `misconceptionId` reusing
one of the concept's own two already-registered Blueprint misconceptions — verified against each
concept's own Component 1 Misconception Register before writing, all 3 hold exactly MC-A/MC-B).
New file: `englishAdultBandBatch17.ts` (9 new probes, adult/workplace framing — a report, a
review, an incident log). Wired into both writers (`src/instrumentation.ts`'s bootstrap
`ALL_PROBES` and `scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) —
`seedCorpusCoverageRatchet.test.ts` passes. All 3 concepts held zero prior ADULT probes, so this
is a fresh singleton-to-ladder promotion with zero P-10 collision risk (`--dry-run`:
created=7745, skipped=0, revived=0).

English: **358/412 → 361/412 at contract, 54 → 51 short.** Remaining 51: `eng.literature.*` (16
advanced), `eng.phonetics.*` (12 advanced), `eng.vocab.*` (9 advanced), `eng.writing.*` (9
advanced), `eng.reading.reading-across-genres`, `eng.speaking.debate-skills`/`presentation-skills`,
and the 2 EARLY-band phonics pairs flagged in the Batch 13 entry above (deliberately excluded —
voice-required, not closable the same way).

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green; `contract-audit.ts --subject english` confirms
361/412; `validate-knowledge-graph.ts docs/english/kg/graph.json` PASS (KG file untouched); full
suite 700/700 test files, 14,461 passed / 9 skipped (no regression vs. pre-batch baseline);
`npm run build` clean (middleware 79.7 kB, no regression).

### Batch — English `eng.literature.*` ADULT-band gap, all 19 short concepts, closes the subdomain (2026-09-18)

**Correction to the prior estimate**: this file's own "Remaining 51" line above quoted
`eng.literature.*` as 16 concepts. Live regeneration (`contract-audit.ts --subject english
--all`) found **19**, not 16 — corrected here, per this campaign's standing rule to never trust a
count in a history file.

Closed all 19 short `eng.literature.*` concepts: comparative-literature-intro, dramatic-structure,
foreshadowing-and-suspense, imagery, irony, literary-criticism-intro, literary-devices-overview,
literary-genres-overview, literary-periods-survey, metaphor-and-simile, meter-and-rhyme,
novel-study, poetic-forms, poetry-basics, prose-fiction, prose-nonfiction, short-story-study,
symbolism, theme-and-message. Same established technique as Batches 13-17 (`adultLadder` helper:
`mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's
`misconceptionId` reusing one of the concept's own two already-registered Blueprint
misconceptions — verified against each concept's own Component 1 Misconception Register before
writing). **Naming-convention note**: several of these Blueprints label their two misconceptions
with bare `MC-...` headings rather than the `MC-A-.../MC-B-...` convention used elsewhere (e.g.
`literary-devices-overview`, `metaphor-and-simile`, `poetry-basics`, `prose-fiction`, `symbolism`,
`theme-and-message`) — the batch file carries each concept's exact heading text verbatim as the
misconceptionId regardless of which convention that Blueprint happens to use. New file:
`englishAdultBandBatch18.ts` (57 new probes). Wired into both writers (`src/instrumentation.ts`'s
bootstrap `ALL_PROBES` and `scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) —
`seedCorpusCoverageRatchet.test.ts` passes. All 19 concepts held zero prior ADULT probes, so this
is a fresh singleton-to-ladder promotion with zero P-10 collision risk (`--dry-run`:
created=7802, skipped=0, revived=0).

English: **361/412 → 380/412 at contract, 51 → 32 short.** Remaining 32: `eng.phonetics.*` (12
advanced), `eng.vocab.*` (9 advanced), `eng.writing.*` (9 advanced),
`eng.reading.reading-across-genres`, `eng.speaking.debate-skills`/`presentation-skills`, and the 2
EARLY-band phonics pairs flagged in the Batch 13 entry above (deliberately excluded —
voice-required, not closable the same way).

**Test-infrastructure fix, surfaced by this batch's own validation (not a content bug)**:
`contractAuditShapeDetection.test.ts`'s `load() over the real corpus...` test calls
`contract-audit.ts`'s `load()`, which dynamically imports every seed-asset module on disk — its
wall-clock cost scales with total corpus size, and with ~90 seed-asset files now on disk it
started exceeding vitest's default 5000ms test timeout (reproduced consistently, both in
isolation and inside the full suite run, not a flake). Fixed by giving that one test an explicit
30000ms timeout via `it()`'s third argument — the exact same fix pattern this codebase already
uses for other full-corpus-load tests (`probeOptionQuality.test.ts` at 30000ms,
`mathPackageCorpus.test.ts` at 60000ms). No assertion logic changed. Whoever adds the next batch
of seed-asset files should expect this to need raising again eventually as the corpus keeps
growing — check this test first if a batch's full-suite run times out here.

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green (after the timeout fix above);
`contract-audit.ts --subject english` confirms 380/412; `validate-knowledge-graph.ts
docs/english/kg/graph.json` PASS (KG file untouched); full suite 700/700 test files, 14,461
passed / 9 skipped (no regression vs. pre-batch baseline); `npm run build` clean (middleware
79.7 kB, no regression).

### Batch — English `eng.phonetics.*` ADULT-band gap, all 12 short concepts, closes the subdomain (2026-09-18)

Closed all 12 short `eng.phonetics.*` concepts: accents-and-dialects, connected-speech,
consonant-sounds, intonation-patterns, ipa-basics, minimal-pairs, phonetic-transcription,
prosody, rhythm-and-timing, sentence-stress, syllable-stress, vowel-sounds. Live regeneration
matched the prior estimate exactly this time (12, not a stale number). Same established
technique as Batches 13-18 (`adultLadder` helper: `mcq`(FOUNDATIONAL) +
`misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's `misconceptionId`
reusing one of the concept's own two already-registered Blueprint misconceptions — verified
against each concept's own Component 1 Misconception Register before writing; as with Batch 18,
several of these Blueprints use bare `MC-...` headings rather than the `MC-A-.../MC-B-...`
convention, carried through verbatim). New file: `englishAdultBandBatch19.ts` (36 new probes,
adult/professional framing — a call-center training program, a presentation coach, a workplace
rehearsal). Wired into both writers (`src/instrumentation.ts`'s bootstrap `ALL_PROBES` and
`scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) — `seedCorpusCoverageRatchet.test.ts`
passes. All 12 concepts held zero prior ADULT probes, so this is a fresh singleton-to-ladder
promotion with zero P-10 collision risk (`--dry-run`: created=7838, skipped=0, revived=0).

English: **380/412 → 392/412 at contract, 32 → 20 short.** Remaining 20: `eng.vocab.*` (9
advanced), `eng.writing.*` (9 advanced), `eng.reading.reading-across-genres`,
`eng.speaking.debate-skills`/`presentation-skills`, and the 2 EARLY-band phonics pairs flagged in
the Batch 13 entry above (deliberately excluded — voice-required, not closable the same way).

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green, including the Batch 18 timeout fix holding at 12
seed-asset files heavier than when it was applied; `contract-audit.ts --subject english`
confirms 392/412; `validate-knowledge-graph.ts docs/english/kg/graph.json` PASS (KG file
untouched); full suite 700/700 test files, 14,461 passed / 9 skipped (no regression vs.
pre-batch baseline); `npm run build` clean (middleware 79.7 kB, no regression).

**Egress re-check (owner-requested again, 2026-09-18, before this batch)**: same live, read-only
Supabase checks as the prior check in this file (`get_project`, `get_advisors` type=performance,
`query_logs` on `postgres_logs`/`supavisor_logs`/`postgrest_logs`, last 24h, project
`ywakxiqbevfuxsiwewnw`) — status ACTIVE_HEALTHY, same pre-existing hygiene-only advisor findings
(32 unindexed FKs, 1 table without a PK, 43 unused indexes, all unrelated to egress), and
`postgres_logs` content is routine checkpoint/connection-reset/lock-timeout activity with no
row-scanning or runaway-query signature. No active egress risk found. Same caveat as before: the
Supabase Management API/MCP tools don't expose an actual monthly GB-used-vs-quota number — only
the Supabase dashboard's own Usage/Billing page has that, and only the owner can check it
directly.

### Batch — English `eng.vocab.*` ADULT-band gap, all 8 short concepts, closes the subdomain (2026-09-18)

Closed all 8 short `eng.vocab.*` concepts (live count was 8, not the prior estimate of 9 — per
this campaign's standing rule, live regeneration always wins): academic-vocabulary, collocations,
connotation-denotation, etymology, multiple-meaning-words, register-and-formality,
roots-and-origins, semantic-fields. Same established technique as Batches 13-19 (`adultLadder`
helper: `mcq`(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each
distractor's `misconceptionId` reusing one of the concept's own two already-registered Blueprint
misconceptions — verified against each concept's own Component 1 Misconception Register before
writing; as with Batches 18-19, several of these Blueprints use bare `MC-...` headings rather
than the `MC-A-.../MC-B-...` convention, carried through verbatim). New file:
`englishAdultBandBatch20.ts` (24 new probes, adult/professional framing — a performance review, a
Slack message, a workplace text). Wired into both writers (`src/instrumentation.ts`'s bootstrap
`ALL_PROBES` and `scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) —
`seedCorpusCoverageRatchet.test.ts` passes. All 8 concepts held zero prior ADULT probes, so this
is a fresh singleton-to-ladder promotion with zero P-10 collision risk (`--dry-run`:
created=7862, skipped=0, revived=0).

English: **392/412 → 400/412 at contract, 20 → 12 short.** Remaining 12: `eng.writing.*` (9
advanced), `eng.reading.reading-across-genres`, `eng.speaking.debate-skills`/`presentation-skills`,
and the 2 EARLY-band phonics pairs flagged in the Batch 13 entry above (deliberately excluded —
voice-required, not closable the same way).

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green; `contract-audit.ts --subject english` confirms
400/412; `validate-knowledge-graph.ts docs/english/kg/graph.json` PASS (KG file untouched); full
suite 700/700 test files, 14,461 passed / 9 skipped (no regression vs. pre-batch baseline);
`npm run build` clean (middleware 79.7 kB, no regression).

### Batch — English `eng.writing.*`/`eng.reading.*`/`eng.speaking.*` gap, closes every remaining non-phonics subdomain (2026-09-18)

**Correction to the prior estimate**: this file's own "Remaining 12" line above quoted
`eng.writing.*` as 9 advanced concepts. Live regeneration (`contract-audit.ts --subject english
--all`) found only **5** short: citations-and-referencing, creative-writing-forms, essay-
structure, revising-for-content, thesis-statements — corrected here, per this campaign's standing
rule to never trust a count in a history file.

Closed all 8 remaining closed-choice-eligible concepts: the 5 `eng.writing.*` concepts above,
`eng.reading.reading-across-genres`, and both `eng.speaking.*` concepts (debate-skills,
presentation-skills). Same established technique as Batches 13-20 (`adultLadder` helper: `mcq`
(FOUNDATIONAL) + `misconception_probe`(DEVELOPING) + `mcq`(PROFICIENT), each distractor's
`misconceptionId` reusing one of the concept's own two already-registered Blueprint
misconceptions — verified against each concept's own Component 1 Misconception Register before
writing; as with Batches 18-20, several of these Blueprints use bare `MC-...` headings rather
than the `MC-A-.../MC-B-...` convention, carried through verbatim). New file:
`englishAdultBandBatch21.ts` (24 new probes, adult/professional framing — a product-defect
synthesis, a budget-proposal debate, a quarterly-results slide, a grant proposal). Wired into
both writers (`src/instrumentation.ts`'s bootstrap `ALL_PROBES` and
`scripts/brain/seed-knowledge-assets.ts`'s `ALL_PROBES`) — `seedCorpusCoverageRatchet.test.ts`
passes. All 8 concepts held zero prior ADULT probes, so this is a fresh singleton-to-ladder
promotion with zero P-10 collision risk (`--dry-run`: created=7886, skipped=0, revived=0).

**New finding, deliberately NOT touched this batch**: the same `--all` regeneration surfaced 2
previously-unknown short `eng.phonics.*` pairs — `letter-sound-correspondence::ELEMENTARY` and
`phonemic-awareness::ADULT` — distinct from the already-excluded `::EARLY` band pairs for the
same two concepts. These two are `gradeable=0, openRecall=0` (zero content of any kind, not even
voice-required openRecall content, unlike the `::EARLY` pairs which have `openRecall=1`), so
whether the closed-choice technique this campaign uses is even appropriate for them is an open
question — phonemic awareness and letter-sound correspondence are inherently about sound
production/recognition, and a text-based MCQ ("which word starts with the same sound as X?") may
or may not adequately assess the skill at these two bands. This needs its own investigation
(check `educational-brain/first-lesson/07-subject-adaptations.md` §1, the same reference Batch
13 used for the `::EARLY` exclusion decision) before authoring, not a same-turn extension of a
differently-scoped batch.

English: **400/412 → 408/412 at contract, 12 → 4 short.** Remaining 4 (all `eng.phonics.*`,
flagged above): `letter-sound-correspondence::EARLY`/`::ELEMENTARY`,
`phonemic-awareness::EARLY`/`::ADULT`.

Validated: `npx tsc --noEmit` clean; targeted tests (`englishAssetContractP1`,
`contractAuditShapeDetection`, `contractAuditSubjectCoverage`, `seedCorpusCoverageRatchet`,
`curriculumKgRegistration`, 41 tests) green; `contract-audit.ts --subject english --all` confirms
408/412, 4 short (all eng.phonics.*, listed above); `validate-knowledge-graph.ts
docs/english/kg/graph.json` PASS (KG file untouched); full suite 700/700 test files, 14,461
passed / 9 skipped (no regression vs. pre-batch baseline); `npm run build` clean (middleware
79.7 kB, no regression).

### Batch 22 (2026-09-18) — investigated and closed the last closeable eng.phonics.* gap; 2 confirmed permanently voice-required

Investigated the 4 remaining short `eng.phonics.*` pairs directly against the primary sources
(`educational-brain/first-lesson/07-subject-adaptations.md`,
`educational-brain/concepts/english/eng.phonics.phonemic-awareness.md` full 425-line file,
`educational-brain/concepts/english/eng.phonics.letter-sound-correspondence.md`) before authoring
anything, rather than assuming all 4 are closeable via the same technique as the rest of this
campaign:

- **`eng.phonics.phonemic-awareness::EARLY` and `::ADULT` — CONFIRMED permanently voice-required,
  NOT a deferral.** The concept file's own "Voice teaching" section calls it "the tree's flagship
  voice-required territory — every success and every failure is audible and nothing is
  writable"; its Mastery gate requires oral "production (isolate a fresh word's first sound with
  no cueing)"; and it carries an explicit ANTI-ANALOGY warning that using written letters at this
  node is a CATEGORY ERROR ("letters are a written-language convention that arrives LATER...
  using letter-talk here installs exactly the letter-before-sound misconception"). This holds at
  every grade band, not just EARLY — the skill being assessed (oral phoneme isolation) doesn't
  change with age, only the vocabulary framing does. A closed-choice probe would have to either
  present written word options (requiring the very letter-sound knowledge this node is
  prerequisite TO) or not actually test phoneme isolation at all — neither is a valid probe. Both
  bands are left as permanent, evidence-grounded exclusions, matching the existing `::EARLY`
  precedent from Batch 13 rather than an oversight.
- **`eng.phonics.letter-sound-correspondence::EARLY`** — already excluded per the same Batch 13
  finding (has an existing `short_answer` openRecall probe; voice-required for the same reason).
  Unchanged this batch.
- **`eng.phonics.letter-sound-correspondence::ELEMENTARY` — CLOSED.** Unlike phonemic awareness,
  letters are literally the content at this node, so recognition/decoding distinctions (letter
  NAME vs. letter SOUND; decoding vs. guessing from a picture/first-letter) are describable and
  gradeable in text without requiring live audio — the same pattern `englishBandGapAssets.ts`
  already uses for this concept's sibling gap (`eng.phonics.blending-segmenting`). New file
  `src/lib/teaching/assets/englishLetterSoundElementaryGap.ts` (`ENGLISH_LETTER_SOUND_ELEMENTARY_GAP`,
  3 probes: mcq FOUNDATIONAL / misconception_probe DEVELOPING / mcq PROFICIENT, `adultLadder`-style
  ladder) targets the misconception registry the existing live EARLY-band probe for this concept
  already uses — `educational-brain/concepts/english/eng.phonics.letter-sound-correspondence.md`'s
  own "Misconception library" (M1 "letters say their names", M5 "first-letter guessing") — rather
  than the Blueprint's separate, unused "Misconception Engine" (MC-1..MC-4) registry, for
  consistency. Register: 8-11 "returning older struggler, dignity-first," matching this concept's
  own existing ELEMENTARY explanation's audience, not the adult-professional register the rest of
  this campaign's ADULT-band batches use. Slot was a fresh singleton (core_explanation only, zero
  probes) — zero P-10 collision risk, confirmed via dry-run `created=7889 skipped=0 revived=0`.
  Wired into both `src/instrumentation.ts` and `scripts/brain/seed-knowledge-assets.ts`.

English: **408/412 → 409/412 at contract, 4 → 3 short.** Remaining 3 are
`letter-sound-correspondence::EARLY`, `phonemic-awareness::EARLY`, `phonemic-awareness::ADULT` —
all permanently voice-required, not a to-do. This is the practical ceiling for this campaign's
closed-choice technique on English's KG: **409/412 is as complete as this campaign can validly
make English.**

Validated: `npx tsc --noEmit` clean; `seed-knowledge-assets.ts --draft --dry-run` →
`created=7889 revived=0 skipped=0`; `contract-audit.ts --subject english --all` confirms 409/412,
3 short (all voice-required, listed above); targeted 5-file/41-test checklist green;
`validate-knowledge-graph.ts docs/english/kg/graph.json` PASS, 216/216 reachable (KG file
untouched); full suite 700/700 test files, 14,461 passed / 9 skipped (no regression); `npm run
build` clean.


## Physics master completion pass (2026-09-24)

Owner instruction "PHYSICS MASTER COMPLETION": take physics from baseline through production
verification, fixing only confirmed blocking defects. Re-measure before trusting any number here.

**Baseline (all re-measured, none taken from this file):** KG 238 concepts, validator PASS, 238/238
reachable from one root (`phys.meas.units`); Blueprints 238/238; EB 238/238; asset contract 261/261
(concept, band) pairs at contract on disk AND in production (0 short, 0 never-quizzable, 0 hollow
explanation/probe identities, 0 quizzed-not-taught); every pair holds 4-6 gradeable probes
(65 at 4, 195 at 5, 1 at 6). 30-day isolation: 0 cross-subject `evidence_events`/`topic_progress`
rows (1,005 physics-session `ASSET_SHOWN` rows carry the subject-slug fallback `conceptId='physics'`
— telemetry only, strength 0, never a grade). Every number in the 60 served answer keys of the 7
sampled concepts was independently re-derived: all correct.

**Live QA** — new harness `scripts/qa/physicsProductionRuntimeQa.ts` (disposable accounts, weak-
English learner, answer key read from the seed corpus, every answer scored against the mastery
counters). 5 runs, ~170 turns, 8 concepts across mechanics, E&M, thermodynamics, optics, waves and
modern physics. All 5 accounts deleted afterwards (`deleted:true, reloginBlocked:true`), each only
after its `topic_progress` was cross-checked: verified sessions COMPLETED, unverified REVISION, no
false mastery anywhere.

**Confirmed defects fixed (each with a fail-before/pass-after regression test):**
1. `e68e828` — pool exhaustion served a MODEL-INVENTED graded MCQ. photoelectric-effect: the model
   keyed "What does the stopping potential directly measure?" to "number of photons per second";
   the learner's wrong tap was graded correct (`gradeSource:server-key, gradedCorrect:true`), the
   plain counter moved, the reply said "That's right". `findBestProbe` now reports exhaustion
   (`onAllCandidatesSpent`, from rows already fetched — no new query) and `decideModelProbe`
   withholds with `'authored-pool-exhausted'` at counting phases. Verified live: the verdict fired
   3x in the pass-2 photoelectric session, 0 invented-key grades.
2. `a5e798c` — typed physics values mis-graded. "2", "i think 2 m/s2", "a = 2 m/s^2" resolved to
   "50 m/s²" (ordinal "2"); "c = 450" to option C. Plus rule 3b: the answer half of an authored
   "<answer> — <why>" option ("Toward the normal", "The cyclist") now resolves; yes/no halves
   deliberately excluded (a bare "no" may answer the tutor's check-in). Corpus-wide differential
   over 3,292 probes / 30,387 typed forms in all subjects: 3,265 forms newly resolve as intended;
   every no-longer-resolving form was an ordinal/letter coincidence, now refused not guessed; tap
   behaviour identical.
3. `b64925d` — the ENG-D11 wrong-answer correction was erased by the remediation floor's later
   wholesale overwrite (projectile-motion served the bare fallback template). Re-applied after the
   floor. Verified live: the same misconception answer now opens "Not quite — the answer is: …".

**Remaining, evidence-backed, NOT blocking (not fixed — each is either a documented owner
decision or needs new capability behind the G2 gate):**
- Content-free hold, still open (see above): "Let's stay with this idea for a moment." answered a
  real transfer question (photoelectric), and one Doppler turn shipped an EMPTY reply (no probe on
  screen, so the late empty-guard does not fire). Withholding in fix 1 can also end in this hold
  on an exhausted-pool turn — strictly safer than the mis-keyed grade it replaces.
- `phys.opt.refraction` still renders a convex-lens figure (in `INSUFFICIENT_FOR_CONCEPT`; the tutor
  correctly introduces it as a general illustration). An interface/Snell figure needs new authoring.
- Diagnostic probes can precede teaching at DEMONSTRATE (photoelectric asked about the stopping
  potential first); two graded wrong answers then close the episode by the documented
  `sessionLifecycle` budget (projectile pass 2). Owner policy question, not a grading error.
- Mirror check-ins sometimes paraphrase something the learner did not say ("So you're saying the
  arrow labelled 'car'…"); a bare "Yes"/"No" to a yes/no probe stays ungraded by design.
- `MISCONCEPTION_DETECTED` fires on plain nudges (model-emitted, analytics-only reader).
- The deterministic physics verifier remains shadow-only (deferred primitive; not resumed).

### Hard-concept QA follow-up (2026-09-24, owner's real account + disposable verification)
Five expert/advanced concepts (quantum-tunneling, particle-in-box, keplers-laws, lc-circuits,
carnot-cycle) driven on the owner's account (`scripts/qa/physicsProductionRuntimeQa.ts --hard`,
real-account mode: credentials from the environment only). Physics correct throughout, 0 false
accepts; particle-in-box verified, others REVISION/IN_PROGRESS honestly. Defects fixed:
- D1 (`b4409bb`) — "pick the best answer / which of the following" with no options served.
  Delivery contract now drops option-pointing sentences when no MCQ is served and no prose list
  exists. Verified by tests on the production texts (model-dependent; did not recur live).
- D3 (`b4409bb`, relocated `28c251c`) — picture request silently ignored where no figure exists
  (keplers/LC figures are retired as wrong). Reply now opens "I don't have a picture for this one,
  so I'll explain it in words." First placement missed memory-served turns; moved to the final
  response step. Verified live on both concepts.
- D4 (`b4409bb`) — carnot general-illustration grid called "the motion graph"; general
  illustrations are now "the figure". Verified live.
Not fixed (model-written prose or documented owner policy): wrong answers to model-invented
questions below GUIDE go uncorrected (the guard's recorded "undo" decision); correct transfer
answers not always confirmed; mirror mis-paraphrases; recap after a budget close.

## 2026-09-27 — "Always tap A" passed every authored quiz (all subjects) — fixed at probeToMcq

**Finding (measured, static corpus scan).** The authored seed corpus lists the correct choice FIRST
in 6,280 of 6,281 multiple-choice items (biology 597/597, chemistry 930/931, physics 554/554,
mathematics 2528/2528, cs 268/268, english 81/81, authored 1319/1319). `probeToMcq`
(`src/lib/teaching/gateAssessment.ts`) — the single conversion point from an authored probe to the
learner-facing MCQ, used by the gate in `route.ts` and by `assembleLesson` — kept authored order,
and `findBestProbe` only rotated choices on a re-ask. So a learner who tapped the first option
every time was graded correct on every authored gate question in every subject.

**Fix.** `probeToMcq` now presents a deterministic permutation keyed on the question text
(`presentationOrder`: FNV-1a seed + mulberry32 Fisher–Yates). Same question → same order (reload,
restored turn and grade agree; grading reads the stored `pendingMcq.correctIndex`). Measured on
2,602 convertible biology+chemistry+authored probes: 4-option correct positions 76/77/63/75,
2-option 1015/1006. A re-ask (rotated by the selector) always lands the correct answer in a
different slot. Regression: `src/tests/probeOptionOrder.test.ts`; 6 existing tests that pinned
authored positions now assert "the key moves with its choice" instead.

**Caveat for prior QA evidence.** Several live harnesses answer unrecognised questions with
`options[0]` as a "guess" (`biologyProductionRuntimeQa.ts`, `masteryEvidenceIdentityLive.ts`,
`synthetic/personas.ts`, `preMergeStudentRun.ts`, …). Before this fix that guess was always right
on authored probes, so any past "mastery reached" run that leaned on it overstates reachability.

**Still open (needs an owner decision, not a code change).** The correct option is also the
uniquely LONGEST option on 71% of biology 3–4-option items (mathematics 94%, physics 67%, cs 66%,
chemistry 38%) — "pick the longest" beats chance by ~2–3×. Fixing it means rewriting existing
probe text, and the cold-start bootstrap is insert-only (`createMany … skipDuplicates` in
`src/instrumentation.ts`), so edited seed text never reaches existing production rows without a
direct, owner-authorized DB update. Not done unilaterally.

**2026-09-30 update (owner approved working on it; re-measured, not yet fixed).** Re-measured
from the seed corpus with the new, re-runnable `scripts/assets/length-cue-audit.ts` (no DB
access). It is wider than the figures above, because TWO-option items are the worst case and
were not counted before: the correct option is the uniquely longest on 79% of biology items
(597), 79% chemistry (931), 78% cs (268), 96% english (432), 94% mathematics (2752) and 81%
physics (1365) — about 5,400 items in all. Cause, visible in the samples: the correct option
carries its own full working ("Four — l can be 0 or 1. The 2s subshell contributes 1 …") while
distractors are short. The planned "DB update" cannot be written yet: there is no rewritten
text to write. Options put to the owner:
- (a) runtime, no DB write: show only each option's answer head (text before " — ") and reveal
  the working after grading. Measured effect: english 96% → 18%, chemistry 79% → 45%, physics
  81% → 54%, biology 79% → 56%, cs 78% → 48%, mathematics 94% → 89% (only 9% of maths items
  split cleanly on " — "). A change to every learner's quiz presentation — needs a decision.
- (b) content rewrite of the remaining items in the seed files (distractors given comparable
  working, or working moved out of the options), batch by batch, then an owner-reviewed,
  idempotent UPDATE of existing `probe_assets` rows generated from those files (the bootstrap is
  insert-only, so edited seed text never reaches rows already in production).
- (a) then (b) for what (a) leaves behind is the cheapest route to near-chance.

**2026-09-30 — option (a) SHIPPED (owner: "decide yourself what is best").** `probeToMcq` now
serves each option's answer head when every option has the "head — working" shape (spaced em/en
dash; heads distinct case-insensitively; no bare letter heads; hyphens never split) — 2,081 of
the 6,345 convertible items. The working travels in the new optional `TutorMCQ.rationales`,
persisted with the pending question, never sent to the client (`mcqForClient` unchanged) and
read only after grading: `buildAnswerVerdictBlock` hands the model the authored reason (and the
thinking behind a wrong choice), and `stateCorrectionForWrongAnswer` now says "Not quite — the
answer is: X — <authored working>", never a bare answer (this also addresses the earlier
"bare 'the answer is: X', no why" finding). Grading is untouched — `resolveMcqChoice` reads
`correctIndex`; one narrow rule accepts the ORIGINAL full text of option i as option i, so a
page rendered before the deploy still grades. Corpus simulation: 4,617/4,617 head taps and
4,617/4,617 full-text answers grade to their own option, 0 misattributions. Served cue, correct
option uniquely longest: english 96% → 18%, chemistry 79% → 45%, cs 78% → 48%, physics 81% →
54%, biology 79% → 56%, mathematics 94% → 89%. Regression: `src/tests/probeAnswerHeads.test.ts`.
No production data changed; option (b) (rewriting the remaining items, then an owner-reviewed
UPDATE) stays open — mathematics is the main residue and its content work is paused.

**2026-09-30 — part (b), PHYSICS ONLY (owner: "Go task 2", then "only physics as of now").**
Analysis of physics' 734 remaining cue items (correct uniquely longest after the heads change):
247 carried working on the correct option alone, 104 on a mix of options, 155 were already split
(heads differing by a few letters, not a real cue), 187 were plainly longer wording and 41
multi-sentence/"because". The first two groups are the same authored annotation, so the runtime
rule was extended rather than the content rewritten: `splitAnswerHeadsPerOption`
(gateAssessment.ts) serves the head of EVERY option that has the spaced-dash shape and serves
the rest whole (empty rationale), with the same safety rules; it applies only when the probe's
`conceptId` starts with `phys.` (plumbed via the new optional `ProbeMatch.conceptId` /
`ConvertibleProbe.conceptId`) — every other subject keeps the all-or-nothing rule. The
full-text grading rule skips empty rationales; the verdict never invents "thinking" for a
whole-served distractor. Physics, served: correct option uniquely longest 81% → 54% → **36%**,
uniquely shortest 8% → **42%** (no-cue baseline for physics' 722 two-option / 643 three-to-four-
option mix ≈ 40% each) — "pick the longest" no longer beats chance, and no reverse cue was
created. Grading simulation: 5,734/5,734 head taps and original full texts grade to their own
option, 0 misattributions. No production data changed; no DB statements were needed. Left, as
optional per-item polish only (content + an owner-reviewed UPDATE): the ~220 plain/multi-sentence
physics items whose correct wording is individually longer.

**Verified live (2026-09-27, production deploy `2f15d657`, disposable account, deleted after).**
`scripts/qa/probeOptionOrderLive.ts` over the first 5 Biology lessons: 10 authored quizzes served;
the authored-correct option sat at A in 4/10 (3 of them 2-option items that happened to land in
authored order — chance is 1/2 there), versus 10/10 before the fix. Tapping the authored-correct
option still graded correct (`checkCorrect: 1`, verified).

## 2026-09-28 — Physics Unit 1 certification begins; learner questions no longer spend the teaching budget

**Owner goal:** make one subject defect-free, starting with Physics. **Unit 1** is every
`foundational` concept plus the `developing` `phys.meas.*` / `phys.mech.*` concepts (23).
Harness: `scripts/qa/physicsCert/`.
- `buildScript.ts` freezes the scripted student from authored content only: quoted Blueprint/EB
  misconception phrases, else the misconception-tagged seed choice; seed-probe correct and wrong
  choices; the next concept's stem as the off-topic question. Output is `unit1.json`, with its
  sha256 logged per run.
- `drive.ts` runs the identical-student 14-slot plan on the production default model, one
  disposable account per lesson, deleted after.
- `analyze.ts` applies deterministic HIGH/MEDIUM detectors, and prints slots 2/5/9/10 for human
  reading.

**First defect found (smoke run, phys.mech.normal-force), root-caused and fixed.** The concept
turn budget (`CONCEPT_TURN_BUDGET = 12`) counted EVERY turn, including the learner's own questions
and requests. The scripted learner asked "why does that matter?", asked for a diagram and asked
one off-topic question. It answered correctly twice and missed once (deliberately), and on turn
12 was closed with "Let's pause … you haven't mastered it yet". The extension did not apply
because the one miss had moved the phase below CHECK.

**Fix.**
- `TurnEvidence.learnerInitiated` (`isLearnerInitiatedTurn`: a question or a request, not an
  answer to the pending quiz, not "quiz me") no longer increments `turnsOnConcept`.
- `turnsTotalOnConcept` counts every turn.
- `ABSOLUTE_TURN_CEILING = 2 × 12 + 6 = 30` keeps termination structural.
- Wired at both route ladder folds and replayed in `transcriptReplayFramework.test.ts`.
- Tests: `learnerInitiatedBudget.test.ts`.

**Also found, not yet fixed.** The same authored explanation (the "book on a mattress" paragraph)
reached the learner three times in one lesson: once served from memory, then twice recited
verbatim by the model. The response's `retrievedExplanationInPrompt` diagnostic is now captured
by `drive.ts`, to settle from evidence whether the already-served guard is being bypassed.

**Pass 1 findings (partial, 33+/46 lessons) and fixes, 2026-09-28.**
- **Budget fix confirmed live:** 0 H-PAUSE (the smoke run had 1/1). No misconception was
  answered "That's right" across all 23 concepts (the V-AFFIRM belief fix holds). Every
  deliberate wrong answer at slot 9 was corrected.
- **Confirm-back** ("That's right. You said … Is that right?", and after "continue": "So you'd
  like to keep moving forward—have I got that right?"): `isMirrorTurn` only saw a whole turn of
  at most 2 sentences ending on the request. New `stripConfirmBack` (attributionGuard.ts) removes
  the request and the paraphrase feeding it wherever they sit, only in paraphrase context, so
  authored "…Is that right?" quiz stems are untouched. Wired after the verdict repair, with a
  fallback if the turn empties.
- **C7 verbatim repeats, settled from evidence:** the slot-3 memory paragraph came back verbatim
  from the model in 11 of 32 lessons, WITH `already_served` firing and
  `retrievedExplanationInPrompt: false`. New output-side `dropRepeatedParagraphs`
  (historyCompaction.ts) drops a paragraph of 120+ chars already sent this session (checked
  against the uncompacted stored tutor messages; verdict paragraphs exempt).
- **Off-topic question treated as a failed quiz answer** ("I couldn't tell which option your
  answer matched"). `engagesPendingOptions` counted long questions via shared option words, and
  read "A 5 kg mass …" as option A. A question of more than 6 words ending in "?" is no longer an
  attempt; "A" followed by a number is an article.
- **Harness:** the deliberate wrong answer is never an authored-correct option (one false
  H-UNCORRECTED).
- **Recorded, not yet fixed:**
  - "quiz me" / "give me a practice question" answered with no question (new M-NOQUIZ detector
    to measure it);
  - the V-AFFIRM fall-closed template is generic;
  - several slot-5 replies only ask "how did you decide that?" without correcting in the same
    turn.

**Pass 1 complete (46 lessons, ~690 turns, 0 errors; baseline on deploy 372be7a8).**
- Flags: HIGH 4 (2 H-EMPTY; 2 H-UNCORRECTED, both the harness artifact, now fixed in the
  harness). MEDIUM 86: M-NOQUIZ 59, M-REPEAT 16, M-SELFGRADE 9, M-DOUBLECONF 2.
- **Egress measured:** ~30–37 MB for the pass (~50 KB/turn, ~0.7% of the 5 GB quota). The largest
  real cost is session snapshots (~12 KB, read about twice per turn).
- **Practice requests unanswered (M-NOQUIZ 59/92).** 52 were at GUIDE with a quiz already on
  screen. Root cause, reproduced offline: the held-probe release (turnProgress rung 1, after 2
  unanswered turns) runs AFTER this turn's probe selection, so on the release turn nothing is on
  screen. When that turn was "quiz me", the learner got no question. Fix: no release on a
  practice-request turn (`&& !turnIntent.wantsPractice`); the held quiz is what they asked for.
  Test: `practiceRequestKeepsHeldQuiz.test.ts` (fails without the fix; control shows the release
  still fires otherwise).
- **Blank replies (H-EMPTY, 2 turns, both llmCallCount 2).** A final net before the provenance log
  substitutes the concept's own description (or the hand-off line) when text is empty and no quiz
  is attached, and logs `[empty-reply-net]` to pin down the emptying repair. Test:
  `emptyReplyNet.test.ts`.

### 2026-09-28 — Physics Unit-1 certification, pass 2 + lesson-one "quiz me" fix
- Pass 2 (production 1aa77824, 23 concepts x 2 runs, disposable accounts): 40 lessons completed, HIGH 1
  (H-UNCORRECTED, kinematics-1d r2 s9 — harness artifact: the "wrong" answer to a model-written
  question was actually correct), MEDIUM 1 (M-NOQUIZ, phys.meas.units r2 s6). Pass 1 was HIGH 4 /
  MEDIUM 86. 6 lessons failed on infrastructure (3 x route_deadline 503, 2 x login, 1 x onboarding
  500) and were re-driven.
- Root cause of the M-NOQUIZ: phys.meas.units is lesson one for every beginner. There
  `notFirstLesson` refused the authored probe, and memoryState was null. The invented-probe guard reads
  that refusal as POLICY, so it withheld the model's own question as well, and "quiz me" got one KG
  sentence. Fix: when a lesson-one learner asks for practice, `notFirstLesson` is true and memoryState
  is built for the gate only (assembleLesson stays skipped, same shape as the prose-MCQ branch).
  Test: `firstLessonPracticeRequest.test.ts` (fails without the fix). Harness gained a `lessonOne` option.
- Known, not fixed: at DEMONSTRATE with a bare 3-probe pool the gate declines `below-guide-no-surplus`
  and the model's question is withheld (`authored-probes-exist`), so "quiz me" there can also get no
  question. Seen in the harness, not in pass 2's production data.
- Pass 2 final (46/46 after re-driving): HIGH 1 (the kinematics harness artifact above), MEDIUM 3
  (M-NOQUIZ fixed; 2 x M-DOUBLECONF benign). Two more defects found reading it and fixed:
  1. "quiz me" at OBSERVE/DEMONSTRATE with a bare 3-probe pool got no question. The surplus rule keeps
     the pool in reserve (correct), and the ungraded-question withhold then removed the model's question.
     Below GUIDE a model question cannot reach the mastery record, so on a practice request it is now kept
     (`withholdUngradedGateQuestion` input `learnerRequestedPractice`, reason 'left-for-practice-request').
     Test: `practiceRequestBelowGuide.test.ts`.
  2. kinematics-1d r1 s9 showed "- **A)** 12 metres per second …" options with no question. The option-line
     regexes (3 copies plus proseMcqGuard's) did not allow a markdown bullet/bold around the label, so the
     withhold cut the stem but left the options. There is now one shared `OPTION_LINE_RE` in
     gateProbeContract.ts, and proseMcqGuard accepts the same markup. Test: `markdownOptionList.test.ts`.
- Harness now covers all 238 concepts: `buildScript.ts --unit 2..5` (46/49/51/69 concepts, 0 gaps), with
  the onboarding level by difficulty. The wrong-answer pick prefers an authored wrong option; an unverified
  pick is reported as M-UNVERIFIED.
- Unit 2 pass 1 (in progress) found two more defects, both fixed:
  3. phys.mech.work-energy-theorem r1 s5, HIGH. With "State the work–energy theorem" on screen, the
     typed misconception "I think it is at rest — zero work means zero kinetic energy" was graded as the
     CORRECT option. Rule 4a let one distinctive word ("kinetic") decide, and the tutor said "That's right."
     Rule 4a now also requires the message to use the options' vocabulary: at most one substantial word
     the options never use, fillers aside. Test: `oneWordGradeInOwnSentence.test.ts`.
  4. Same lesson, s11-s12. "give me a practice question" with a quiz carried forward on screen: the
     direct-request exemption kept the model's own second question, and the learner's quiz answer was
     then judged against it ("Correct — well done … but it doesn't address friction"). On a practice request
     with a quiz on screen the exemption no longer applies, and the turn hands off to the quiz.
  5. phys.mech.impulse r1 s5, HIGH. "Force A = 800 N …; Force B = 8 N …" with options "Equal — …" |
     "A, because it is a much bigger force". The misconception "I think force A — it is a much bigger
     force …" was read by the letter rule as option A, the CORRECT answer, and the tutor said "That's
     right." A "<word> <LETTER>" pair that the question uses as a name is now removed before the letter
     rules run (`withoutEntityLetters`). Test: `entityLetterNotOption.test.ts`.
  6. phys.mech.moment-of-inertia r1 s7, MEDIUM. "So you selected option A … Is that right?" survived
     `stripConfirmBack`, which lacked answer-report frames. Added "you selected/chose/picked/answered/
     went with/opted for". Tests added to `confirmBackStrip.test.ts`.
  7. Unit 2, HIGH (lesson hijack). phys.mech.conservation-of-momentum r2 and phys.mech.impulse r2
     (intermediate accounts): mid-lesson the tutor switched to teaching SI units (curriculum lesson 1)
     and served SI quizzes. Placement verification's eligibility and write-site checks read
     `studentProgress.currentLesson`, which stays at the placement entry, so answers inside a lesson the
     learner opened themselves were folded as calibration results. The downward adjustment then cleared
     `activeLessonSlug` mid-lesson. Both checks now take the lesson actually taught
     (`lessonCtx.currentLesson`); placement neither probes nor adjusts outside the entry lesson.
     Test: `placementOnlyAtEntryLesson.test.ts`.
  8. phys.mech.power r2 s5, HIGH: "I think crane B did more work …" was read as option B (correct). A
     capital letter after an ordinary word and before more of the sentence is now a name; only
     answer-lead words ("think B", "option B", "is B") keep the letter reading.
  9. phys.mech.poisson-brackets r1 s5, HIGH: a misconception about a different bracket shared
     "bracket"/"does" with the correct option (rule 4) and was banked as right. Rule 4 now allows at most
     2x as many option-foreign words as matched distinctive words.
  10. unit 1 pass 3, kinematics-1d r2 s5: "So you're indicating … Is that right?" is now stripped.
- Unit 1 pass 3 (verification on 1aa77824+ deploys): 36/46 lessons, HIGH 0. 10 infra failures re-driving.
- Production incident, 2026-09-28 11:02-11:05Z: db_timeout site-wide right after a deploy. Cold-start
  bootstrap transactions were left idle in transaction (idle_in_transaction_session_timeout = 0).
  OWNER DECISION pending: set that timeout. Mitigation: one deploy per pass.
  11. phys.mech.cyclic-coordinates-conservation-laws r2 s5, HIGH (on the 5729359f deploy): "I think a cyclic
      coordinate means that coordinate is zero or held constant" was graded as the correct option by rule 5.
      The only number named was "zero", and the only option carrying 0 was "∂L/∂x=0". Rule 5 now needs a bare
      value (at most one option-foreign word).
  12. Unit 2 MEDIUM cluster (hamiltonian, hamilton-jacobi, euler-lagrange, hamiltons-equations): repairs
      emptied consecutive turns and both shipped the same "<concept> covers: …" line. A verbatim-repeat
      fallback is now replaced by an open "which part should I explain more" question (`FALLBACK_REPEAT_TEXT`).
- Unit 2 pass 1 final: 77 lessons + 15 infra re-drives in progress. Every HIGH root-caused: grading misreads
  (4 kinds), the placement hijack, and 1 harness artifact.
- Unit 3 pass 1 (in progress):
  13. phys.therm.second-law r1 s5, HIGH: "… the First Law rules it out, making the Second Law redundant" was
      read by rule 2 as "the first one", the correct option. An ordinal now names a position only alone, before
      "one"/"option"/a reason, at the end, or after a marker. The same turn's "So I hear you saying … Is that an
      accurate summary …?" confirm-back is now stripped.
  14. phys.therm.third-law r2 s11-s13: a withheld model quiz left "Pick the statement that best captures it."
      and then bare inline "A) … B) … C) … D) …" lines with no question, two turns running. The lesson then
      closed "on pause" (budget spent on ungradeable prose quizzes). Inline option runs are now dropped with
      their question (withhold `poses`, `dropAnswerableContent`, salvage), and "Pick/Choose/Select the …" is
      an announcement when nothing follows.
  15. phys.opt.single-slit r2 s7, HIGH H-LEAK: `<!--SIGNAL … phrase="…">` (bare `>` close) reached the learner.
      SIGNAL_RE now accepts that close. Same turn: "have I understood you correctly?" is now a confirm-back.
  16. The fallback-repeat guard (item 12) now covers any earlier tutor turn, not only the last.
  Not treated as defects: phys.mech.equilibrium r1 s9 (a Socratic counterexample correction the checker's
  keyword list misses) and the third-law "pause" (the honest outcome of an unreached mastery within budget,
  caused by item 14).
- 2026-09-28 ~15:50Z, owner-requested study of a fixed concept on the owner account (phys.mech.impulse,
  previously COMPLETED 2026-09-06). The password was used as an env var only, never written.
  - The fix is visible: the "force A" misconception now gets "Not quite — Equal" plus an egg/pillow
    explanation. Before the fix: "That's right. So you're thinking…". "force B" (name letter) graded
    correctly.
  - NEW HIGH, fixed: "wait why is the area the impulse? i dont get the graph part" was graded as the correct
    option (rule 4 on "area"/"impulse"). It got "That's right." and a verified CHECK credit, and the lesson then
    closed "mastered" partly on that unearned credit. `looksLikeAQuestion` now covers a '?' anywhere, a
    WH-word after a lead-in, and explicit confusion.
  - Quality gaps seen (not fixed yet): the learner's own correct observation is not acknowledged before a
    quiz; a wrong answer gets only "the answer is: …" with no why; the same unrelated "Elastic Collision
    (1D)" figure is attached on several turns; quiz lead-ins sometimes mismatch the quiz ("statements",
    "new situation").

### 2026-09-28 — Choice-only MCQ grading (spec GB+), owner-approved; committed locally, NOT deployed
- Evidence: Phase 1 offline replay (457 scripted physics lessons, 20,726 graded cases) plus 65 anonymised
  real replies (internal accounts). The old resolver credited 28 of 478 scripted misconception sentences
  as CORRECT (shared-word and letter-as-symbol inference), and each patch closed one wording only.
- Change (src/lib/teaching/mcq.ts): `resolveMcqChoice` keeps Stage E (exact option text, existing rule-0
  normalization, verbatim fallback, case tiebreak, "B) <exact text>"). The label must now agree with the
  text (R13). It then applies Stage L, `resolveExplicitLetter`: a bare letter, a labelled letter
  ("B)", "B.", "B:", "C, 0 m", "A —", "(B) …"), or a letter + connective ("B because …"), at the start
  after an optional lead-in. All inference rules (0a letter-anywhere, 1, 2 ordinals, 3/3b containment
  and answer halves, 4/4a words, 5 numbers) and their dead helpers were removed. No kill switch
  (owner: no path back to the old grading).
- Offline replay against the real code: identical to scratchpad GB+ on all 20,726 cases. Harmful false
  credit 28 -> 0; taps, letters and letter + reason 100%. Real sample: 3/58 answers refused (ordinal, two
  natural typed), 0/7 non-answers graded.
- Deviation from the spec text, documented: the lead-in list gained "my answer" (without "is") and
  "i say", because pinned learner forms "my answer: C)" and "i say D," are explicit letters (the same class
  of normalization gap as "C, 0 m").
- Accepted false negatives (pinned in choiceOnlyGrading.test.ts): ordinals, bare values/equations,
  answer halves, paraphrases, "I think B is right" (the same shape as the harmful "B is perpendicular"),
  hedges ("maybe B", "A but i am not sure"), and lead-in or reason + exact option text
  ("i think it is negative", "Negative, because …"). The last two need an owner decision.
- Behaviour change on a pinned guard: "A sir" / "a sir" are now an explicit letter A (grammar BARE + TRAIL).
- Tests: new choiceOnlyGrading.test.ts (44, incl. route-level no-credit / SIGNAL-suppression /
  still-answerable) + fixture; 13 files had removed-inference assertions flipped, each marked BEFORE -> AFTER.
- 2026-09-29, merged with a parallel GB+ draft pushed straight to `main` (595ea7a4..7d6aa426; owner chose
  "Option 1"). That draft first failed CI: its regex literals were double-escaped (`\\s`, `\\/`), which gave
  11 tsc errors. Once the escaping was fixed (7d6aa426), its first letter pattern made the separator
  optional, so any first word starting with a/b/c/d was graded as that option ("Air resistance slows it"
  -> A, "I think all of them…" -> A). Phase 1 replay: 66 non-answers graded, 14 credited CORRECT,
  57 answers graded as the wrong option. The merge keeps this GB+ resolver (0 / 0 / 0 on the same replay)
  plus the 8ee670f8 `isLongQuestion` guard. It keeps the draft's tests; 8 assertions were re-aligned to the
  approved spec, each marked BEFORE -> AFTER: exact option text and "0.5 m/s2" (a tap / normalised exact
  text) are graded; "B … C and A …" is ambiguous (c3); "ok i think A. but sir …" is graded A (LABELLED).
  Ordinals and paraphrases in offTopicQuestionNotGraded.test.ts are now ungraded. Lead-ins "my choice is",
  "the choice is" and "choice is" were added.
## 2026-09-28 — Chemistry/Physics live-QA defect pass (visual delivery, off-topic grading, Third-Law routing)

Owner request: fix the Chemistry and Physics defects found in this session's live QA, then re-run the
same live check (disposable `qa-*@mytutor-qa.invalid` accounts, exact concept, exact phrasing) against
production. Commits: `d1eb649` (item 1), `6bcb274` `4d89b3a` `52de4f6` `5be436a` `8ee670f` `f714b69`
`12039fb`, merged as `a05a3ba` and deployed (`dpl_CX5kLJPhskwPFvq7aU8eAHXqSGUf`, live 16:23:47Z).
Every account used was deleted afterwards (DB-checked: 0 `qa-ab-*`/`qa-repro-*`, 0 qa accounts with
`modelOverrideAllowed`).

1. **Chemistry visual delivery — FIXED, verified live.** `chem.org.pericyclic`,
   `chem.dblock.organometallics` and `chem.poly.biodegradable` had no Tier 0/1 binding, and Tier 3 was
   declining or critic-rejecting. They now have Tier 0 scenes built from the existing
   `buildCellComparisonScene`/`buildCellPathwayScene`, with content taken from each concept's EB entry.
   The scene is served even while a Tier 3 decline is cached. Live: 12/12 diagram requests served the
   concept's own figure.
2. **`phys.astro.gravitational-waves`, 0/4 figures — FIXED, verified live (4/4).**
   - **Root cause**, from production logs and the `visual_generation_outcome` ledger: the generator
     always chose a strain-vs-TIME graph. Its equation (`h(t) = 1e-21 * sin(2π * 150 * t)`) is outside
     mathParser's x-only grammar, so every candidate rendered blank, and the critic rejected it before
     judging (`[visual-critic-retry]`, `judged:false`). perturbation-theory and dark-matter pick process
     flows, which can pass.
   - **Fix:** a Tier 0 source-to-detector pathway scene.
   - **The garbled `|` block** was the model's own unfenced ASCII interferometer. No guard pass
     recognised vertical strokes, and Pass 5 removed only the horizontal arm, leaving an orphan "Mirror"
     label. New Pass 4b in `asciiDiagramGuard.ts` removes a paragraph made only of drawing-shaped lines
     that contains a stroke-only line, together with its "Picture it like this:" lead-in.
   - **NEW, root-caused, NOT fixed** (found while verifying): diagram requests 2 and 3 got only a
     one-line summary, and turn 3 repeated it.
     - Chain: any help request (diagram included) sets `studentIntent=requesting_help`, and
       `classifyConversation` turns that into `REPHRASE_REQUEST`, a remediation turn held on GW's
       curated card (`constrained-source`).
     - The model's figure-anchored reply was rejected by the remediation floor as `question-only` twice,
       so it fell back to the one-line KG sentence.
     - Next turn, the repeat-guard emptied the held-card substitute and the same sentence was served
       again.
     - The chemistry concepts have no held card, and their figure walkthroughs passed (222–1966
       characters).
     - **Not fixed:** it lives in the remediation-floor / fallback-repeat code the concurrent physics
       session changed today (`26b9a94`). **Proposed fix:** a diagram request whose figure is delivered
       this turn is not a REPHRASE remediation turn (or the floor accepts a figure walkthrough); and the
       fallback-repeat guard should also compare against a CONTAINED repeat, not only an equal one.
3. **Tier 3 "fails twice then succeeds" (`phys.qm.perturbation-theory`) — ROOT-CAUSED, prompt fixed.**
   - Not variance. All 64 `structurally-invalid` process flows in the ledger had a step title over the
     60-character cap: the formula was packed into the title. The prompt stated the cap but never
     offered the schema's optional `note` field (<= 140 characters, rendered).
   - Graphs: only 124 of 378 distinct generated equations compile, because the prompt never named the
     parser's grammar.
   - The prompt now names both (`figurePromptMatchesParser.test.ts` pins that what it recommends
     compiles).
   - Retries were deliberately not added.
   - After deploy (organic traffic, small sample): 3/3 new graph equations compile (one is literally
     the recommended `sin(6.2832*x)`), 2/2 process flows are valid, and 1 uses notes (0 of 336 did
     before).
4. **Groq correctness.**
   - (a) mole-concept "That's right" to "the mole is a mass" — **FIXED earlier (`dc5566c`)**. Re-check
     on the deployed code, Groq forced: 0/3 false credit. Observation: in 1/3 runs the reply was only
     "I couldn't tell which option your answer matched" with nothing addressing the stated
     misconception.
   - (b) friction off-topic "What is the Third-Law reaction to that force?" — **app defect FIXED; a
     model residual remains.**
     - Root cause: "Third Law" was indexed as an unambiguous title component of `chem.thermo.third-law`
       although it reads inside two other titles, so the question resolved to `phys.therm.third-law`.
     - `deriveTitleComponents` now treats a multi-word conjunct inside >= 2 other titles as ambiguous
       (removes exactly "Second Law"/"Third Law"). New aliases keep "third law reaction/pair" on Newton
       and each thermodynamics law in its own subject.
     - Before, on the deployed code: 3/3 wrong (2 thermodynamics tangents, 2 normal-force answers).
     - After: 0/3 tangents; the excursion opened to `phys.mech.newtons-third-law` in 3/3.
     - **Model residual (1/3):** run 3 still named the normal force as the reaction, with the right
       concept and figure. Root cause: a DIRECT_QUESTION excursion carries none of the target concept's
       authored content. The target-keyed grounding and cards run only on CONFUSION/REPHRASE and
       claim-challenge turns (`route.ts` ~5600/5780/5836), and `remediationGrounding` deliberately
       excludes misconception registers.
     - Grounding excursions with the target's authored explanation (which does carry the
       MC-SAME-OBJECT-PAIR repair) is an EB content decision. It was left for the owner (G1/G2).
5. **Single-occurrence artifacts.**
   - (a) electric-charge "Not quite — the answer is: Two" — **systematic, FIXED, verified live.**
     Re-check on the deployed code: 3/3 graded the off-topic friction question CORRECT against the
     pending rubbing probe ("That's right.", PROBE_OUTCOME pass, probe spent). `resolveMcqChoice` now
     declines a question of more than six words ending in "?", as `engagesPendingOptions` already did.
     After: 0/3. The probe stayed pending and was graded at slot 12 (DB `evidence_events` timings
     confirm no outcome at slot 10).
   - (b) mole-concept off-topic question ignored — **CONFIRMED NOT REPRODUCIBLE** (3/3 answered the
     limiting-reagent question correctly).
   - (c) biodegradable wrong previous-answer reference — **CONFIRMED NOT REPRODUCIBLE** in two clean,
     correctly-answered runs.
- Test hygiene: the two widened-binding KG sweeps in `visualSemanticMoatPhysicsChemistry.test.ts` take
  ~4s alone (on the previous HEAD too). They timed out at vitest's 5s default under full-suite load, so
  they now get 30s like the repo's other sweeps; the ceilings are unchanged.

## 2026-09-30 — live production check, physics (deployment of 76916f3b)

Production was confirmed on the latest commit via the Vercel API (dpl_EtsaxeJw26z3XoD1daHwcujZTRho,
READY, sha 76916f3b). The site answered this container (home 200, /api/health 200 db:true).

- `scripts/qa/learnerReplay.ts` (all physics scenarios, disposable account, deleted with
  re-login blocked): **ALL CHECKS PASSED**.
- One concept end to end on the owner-supplied fresh account `suaibamr6@gmail.com`
  (credentials used only as an ephemeral env var, never written), via the new
  `scripts/qa/physicsOneConceptLive.ts`: lesson 1, `phys.meas.units` "SI Units and
  Measurement". **Mastery verified in 10 turns** (check 1/1, practice 2/2, lesson complete,
  fullyMastered, 107 s). The "seven SI base units" figure was on screen on 3 turns. All 5
  authored quizzes were served without working in the options (e.g. "Its zero is absolute",
  "No"/"Yes"); one answered deliberately wrong, four right, grades followed the key.
- **Defect found (open):** the deliberately wrong answer (4.7 µF → "4.7 × 10⁶ F") got ONLY
  "Not quite — the answer is: 4.7 × 10⁻⁶ F" — no why. That item's options carry no authored
  working (nothing to reveal), and the model's own explanation did not survive into the reply,
  so this is the earlier "bare Not quite" symptom (answerVerdictBlock asks for a why; the
  final text had none). Not yet root-caused.
- Account note: `suaibamr6@gmail.com` now has `phys.meas.units` COMPLETED; the rest of
  physics is still fresh on it.

## 2026-09-30 — live difficult-concept visual check: phys.qm.wkb-approximation

Owner instruction: "Run difficult concept again with visuals. Check all n visuals correctness."
Ran `scripts/qa/physicsOneConceptLive.ts` (now with `QA_CONCEPT`, `QA_PROMPTS`, `QA_DUMP`) on the
owner-supplied fresh account (credentials supplied as env vars only, never written). Mastery was verified in 12 turns,
and the deliberate wrong answer got a correction with its authored reason.

Four figures were served:
- **t1, t5, t12: the authored `phys-wkb` scene, correct.** The dumped payload is identical to `buildWkbScene`
  (objects and narration), and `validateSceneSpec` is clean. Physics recomputed: the turning point is at x = 0.6, where
  V = E = 3; ∫κ dx = 1.33287 matches the closed form; T = e^(−2∫κ) = 0.0695 matches the printed label
  0.07; the transmitted amplitude is 0.26 ≈ √T.
- **t2: DEFECT, a generated `process_flow` ("WKB Approximation Procedure").** It replaced the authored
  figure after the learner asked "what are the turning points in the picture?". Root cause:
  `requestLeftActiveFigure` compared the question only to the KG title and description, and "turning points"
  is not in either. The question was read as a named topic leaving the figure, so the screen was released to
  no concept and Tier 3 generated a flowchart in its place.
  **Fix** (`resolveVisual.ts` `activeFigureText`): also include `authoredFigureText(conceptId)`, meaning the
  figure's own labels and stage narration. Regression test: `visualContinuityProduction.test.ts`
  ("a question about a word printed on the active figure stays on that figure"). It fails without the fix and
  passes with it. Production re-check after deploy is pending.

## 2026-09-30 — "Fix defects": bare correction root-caused; WKB figure re-verified live

**1. The bare "Not quite — the answer is: 4.7 × 10⁻⁶ F" (phys.meas.units).** Evidence from the Vercel runtime log for
that turn: Groq returned 148 characters (`finish_reason=stop`), and the shipped reply was 39 characters. No
answer-leak, empty-reply or phantom-visual strip was logged, and the verifier saw the bare line before the remediation
floor ran. The only step left that removes text is `stripLeadingFalseConfirmation`, called inside the correction.
`CONFIRMS_CORRECT` matches a bare "correct" and "exactly". Reproduced exactly: "The correct conversion uses micro =
10⁻⁶ …" and "Micro means one millionth, which is exactly 10⁻⁶." were each deleted as false praise, leaving only the
correction line. **Fix:** new `affirmsTheLearner()` (answerConfirmation.ts), used by the strip. It neutralises
attributive "the correct X" / "correct value/answer/…" and "exactly/precisely" qualifying a quantity. Genuine praise
("Correct!", "Exactly right.", "Great, you got it!") is still stripped. The model's exact text is not retained anywhere,
so this is the only mechanism consistent with every logged fact. It is reproduced, but not observed verbatim.

**2. A tapped numeric option was read as UNINTERPRETABLE.** Same turn: `LEARNER_MOVE kinds=["UNINTERPRETABLE"]`, while
`mcq-grade` resolved it. Cause: `engagesPendingOptions` had no exact-option rule, and every word of "4.7 × 10⁶ F" is
shared or too short to discriminate. **Fix:** rule (0), the option typed or tapped whole.

Tests: `wrongAnswerKeepsTeaching.test.ts`.

**3. WKB figure, re-verified live on c3183ed7** (disposable qa-* account, deleted afterwards; the script gained
`QA_DISPOSABLE=1`). t2 "what are the turning points in the picture?" now keeps the authored figure (continuity
'continuity'), so the earlier fix is confirmed in production. **New:** t3 "why is the wave smaller after the barrier?"
still swapped in the generated flowchart, via a second path. The excursion check's taught text used the figure's
labels only (`authoredFigureLabelText`), and "barrier" is in its stage narration, so a topic detour opened
(`transition: started`, `named-topic-left-the-figure`). **Fix:** route.ts now uses `authoredFigureText` (labels and
narration), the same definition resolveVisual reads. Tests are in `visualContinuityProduction.test.ts`. This fix still
needs a production re-check after deploy.

## 2026-09-30 — live check on the owner's account, deployment 0151eb40

Run on the owner's account (credentials supplied in chat, used as env vars for the invocation only, never written).

- **WKB visuals: FIXED IN PRODUCTION.** t2 "turning points", t3 "wave smaller after the barrier" and t4 "what does T
  mean" were all held on the authored figure (`continuity`, tier0-generator on every turn, no excursion opened, no
  generated figure). Mastery was verified at turn 12. The deliberate wrong answer got a full explanation.
- **Wrong-answer explanation: FIXED IN PRODUCTION.** phys.meas.units t4 "4.7 × 10⁶ F" → "Not quite — the answer is:
  4.7 × 10⁻⁶ F. … The prefix micro- means 10⁻⁶ … You reversed the sign of the exponent …".
- **NEW DEFECT (open, awaiting owner decision): the lesson-one spiral close deadlocks.** In lesson one the affect
  budget is 1, so ONE graded wrong answer on an authored item set the episode to `CLOSING` (closedBy 'spiral'). The log
  shows "CLOSING (affect budget spent): no new content". From then on every turn read `gate-eligibility`
  `blockedBy:["arbitrationAllowsProbe","notClosingTurn"]` and the model's own questions were withheld
  (`model-probe-withheld`, gate-declined-by-policy). The learner asked "quiz me" (PRACTICE_REQUEST) nine times, got "Which
  part of this would you like me to explain more …" (and once the degraded template), and the lesson paused unmastered
  at turn 14. The owner-approved 2026-09-25 reopen (a spiral close returns to CORE on an AUTHORED right answer) cannot
  fire here, because CLOSING withholds every authored question. The same wrong tap on the same lesson did NOT close the
  episode in the 19:09 run on 76916f3b. Why is not established: the failure signal does not read the learner-move
  reading, so 0151eb40's answer-detector change is not the cause.
- **Recheck on a second owner account** (the saturated physics account, same deployment 0151eb40): WKB held the
  authored figure on all four figure questions and reached mastery at turn 11, with the wrong answer explained.
  phys.meas.units: the wrong tap "4.7 × 10⁶ F" was explained ("µ stands for micro … 10⁻⁶"), the next authored question
  came in the same reply, and mastery was reached at turn 8 with no spiral close. The deadlock above is not
  universal; it reproduced once, on the account where this was a genuine first lesson. Its exact trigger is still open.

## 2026-10-01 — fixes from the two-hard-concepts live QA (phys.particle.standard-model, phys.mod.diode-rectification)

Owner instruction: "Fix" for the QA report. Physics only.

- **P1, wrong answer key (content).** The stem said "counting antiparticles separately" (which makes it 24) while the
  key is "Twelve". The stem now reads "counting each particle and its antiparticle as one". The seed is fixed, but the
  cold-start bootstrap is insert-only (`createMany … skipDuplicates`), so the live `probe_assets` row keeps the old stem
  until an owner-approved one-row UPDATE is run.
- **V2, diode figure.** (a) The I–V curve was clamped at the axis top (`Math.min(…, 4.8)`), which drew a flat top that
  read as saturation. It now ends where it reaches the top, and the narration says it keeps climbing. (b) The concept is
  rectification, but the figure had no rectifier. A fourth stage now draws the half-wave rectifier: an AC input on top
  and the output humps on their own axis below, on one volts scale, each a turn-on drop (0.66 V) lower
  (`halfWaveOutput`). (c) "forward: conducts" was moved off the curve. Rendered at 1280px through the local app: no
  overlaps.
- **V1, the tutor misdescribed the figure's layout.** The model was told which labels were drawn, never where. The
  semantics now carry each label's coarse place, read off its own coordinates against the drawn extent ("u c t" (top
  left), "leptons" (bottom left), "g γ Z W" (right), "H" (right)). The contract says to describe positions only by
  those places.
- **P3, prose competing with the question on screen.** The one-question contract only ran on a fresh gate turn. It now
  also runs when an authored question is HELD on screen, in a stricter `held` mode: an option list always goes; a
  trailing competing question is cut only when it is a real question (6+ words) in its own paragraph; and the reply is
  never replaced wholesale ("Does that help?" stays).
- **P7, "please select the option you think is correct" after a credited right answer.** The word "correct" in that
  instruction counted as a confirmation, so no confirmation was added. `statesCorrect` now tests each sentence with
  `affirmsTheLearner` (choose/select instructions and "which is correct" are neutral), and on a graded-correct turn an
  instruction to pick from the choices ABOVE is removed.
- **P10, the figure pointer under the completion banner.** `ensureVisualAcknowledged` takes `closesLesson`; it is not
  appended on a served completion or when the reply carries the completion tag.
- **Not fixed, with reasons:**
  - P6 `[LESSON_COMPLETE]`: the UI strips it (`parseLessonCompletionTag`). The harness read raw API text.
  - P2: a model-invented question is never graded, by design (an unauthored key cannot be trusted).
  - P4, guessable 2-option mastery: an assessment-policy change, which needs the owner (G1/G2).
  - P9: model wording.
  - P11–P13: separate investigations.
- Tests: `hardPhysicsLiveQaFixes.test.ts`.

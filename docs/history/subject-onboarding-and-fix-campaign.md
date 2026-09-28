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

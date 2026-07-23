# Educational Brain Production Pipeline — Validation Report

Generated 2026-07-22, re-run every batch since. Most recently re-run this
batch (Physics Wave 21, see the dedicated section near the end of this
file for full detail), merged with a concurrent session's Chemistry
level-14 batch (15 concepts) that landed on `origin/main` while Wave 21
was in progress — both are reflected in the totals below. All totals
(top-level summary and Phase 2 checklist) are recomputed fresh from the
live `educational-brain/concepts/{subject}/` directories after the
merge, not hand-merged from conflicting drafts or estimated — the
per-wave sections
below remain as a historical log, each showing the state as of when it
was written. Every check below was computed directly from
`docs/{subject}/kg/graph.json` (all 6 subjects),
`docs/curriculum/blueprints/`, and `educational-brain/concepts/{subject}/`
— none of the numbers here are estimated or copied from prior reports.

## Structural KG integrity (all 6 subjects, re-run this batch)

`npx tsx scripts/validate-knowledge-graph.ts docs/{subject}/kg/graph.json`
for mathematics, physics, chemistry, biology, computer_science, and
english — re-run fresh this batch, all 6 still PASS with unchanged
concept counts (this batch authored Educational Brain entries only; no
KG file was touched, Wave 21):

| Subject | Status | Concepts | Reachable | Broken requires/unlocks |
|---|---|---|---|---|
| mathematics | PASS | 908 | 908/908 | 0 |
| physics | PASS | 238 | 238/238 | 0 |
| english | PASS | 216 | 216/216 | 0 |
| chemistry | PASS | 186 | 186/186 | 0 |
| biology | PASS | 108 | 108/108 | 0 |
| computer_science | PASS | 119 | 119/119 | 0 |

Zero failures, zero warnings, 100% reachability, all six — this is the
"mathematically correct" baseline the rest of this report depends on.
Biology's count (89→108) reflects the Curriculum Production Pipeline's
own Biology KG v2.0.0 freeze, a concurrent external change picked up via
rebase during this batch, re-validated fresh (not copied from a prior
report).

## Phase 2 checklist

**✓ Every Educational Brain entry points to one existing KG concept.**
Checked: every filename in `educational-brain/concepts/{subject}/`
(409 files, post-merge: 233 physics + 37 mathematics + 136 chemistry +
3 english) against that subject's live KG id set. **0 orphans** — every
EB file resolves to a real, current KG concept. **Reconciliation
findings (Waves 12, 13, 15, 16, the Wave-19 merges, and this Wave-21
merge, carried forward)**: multiple concurrent chemistry batches'
commits authored their files but never added rows to
`EDUCATIONAL_BRAIN_INDEX.md` or `QUALITY.md`, nor removed them from
`AUTHORING_QUEUE.md` — a bookkeeping gap in each of those sessions' work,
corrected during the respective merges/reconciliation passes (a 57-row
`AUTHORING_QUEUE.md` gap corrected in Wave 15; a separate 21-row
Blueprint-column accuracy bug in `EDUCATIONAL_BRAIN_INDEX.md`, affecting
`phys.particle.*`/`phys.mod.*` semiconductor concepts unrelated to that
batch's own new entries, corrected in Wave 16; two concurrent Chemistry
batches — level 12, 17 rows, and level 13, 15 rows — found and corrected
during the Wave 19 merges; a concurrent Chemistry level-14 batch, 15
rows, found and corrected during this Wave 21 merge — see the dedicated
Wave 21 section below for full detail). Wave 20 encountered no
concurrent commits and required no reconciliation.

**✓ Every KG concept has at most one Educational Brain entry.**
Structurally guaranteed by the 1:1 `{kg-id}.md` filename convention;
verified with no exceptions (including a case-insensitive check, since a
filesystem could technically hold `Foo.md` and `foo.md` as distinct
files) — **0 duplicates**.

**◐ Every Educational Brain entry references one Blueprint — partially,
honestly reported.** 266 of 409 EB entries' concepts have a matching
Blueprint FILE on disk (post-merge). The other 143 are: 7 `math.found`
concepts (`math.found.definition`, `inductive-reasoning`,
`mathematical-modeling`, `mathematical-symbols`,
`problem-solving-strategies` — Wave 2 — plus `reading-mathematics` —
Wave 3 — plus `empty-set` — Wave 5) which genuinely have no Blueprint
yet, each stating this explicitly in its own Blueprint References
section per Quality Gate 2; plus all 136 chemistry concepts, which
reference `docs/chemistry/kg/graph.json` and standard chemistry
pedagogy directly instead — confirmed by the 2026-07-23 Forensic
Repository Audit that no chemistry Blueprint file has ever existed in
this repository's history, on any branch. All 5 of Wave 21's new physics
entries DO have existing Blueprints, each reused by reference (raising
the Blueprint-matched count from 261 to 266 with no methodology change;
the concurrent Chemistry level-14 batch's 15 new entries add 0 to this
count, consistent with chemistry's Blueprint-less track).
A separate, pre-existing Blueprint-column ACCURACY bug (not a coverage
gap) was found and fixed in Wave 16 in `EDUCATIONAL_BRAIN_INDEX.md`:
21 rows for concepts whose Blueprint files genuinely exist on disk
(15 `phys.particle.*`, 6 `phys.mod.*` semiconductor concepts — none of
which have an Educational Brain entry yet) were incorrectly recorded as
Blueprint="No"; corrected via direct file-existence verification, then
the entire file re-scanned programmatically confirming 0 remaining
Blueprint-column mismatches in either direction. The migration debt on
the 71 pre-Standard entries (authored under the old `TEMPLATE.md`)
remains unchanged and already recorded in `EDUCATIONAL_BRAIN_STANDARD.md`
§6 and `QUALITY.md`. The structural
heading non-conformance in 5 `math.found` Wave 6 entries
(`logical-equivalence`, `ordinal-number`, `quantifiers`, `relation`,
`subset`) — found in a prior batch, still not corrected (out of scope,
another session's freshly authored files) — also remains unchanged.

**✓ No duplicate Educational Brain files.** 0 found (see above).

**✓ No orphan Educational Brain files.** 0 found (see above).

**✓ No broken Blueprint references.** Every Blueprint file an EB entry
claims to reference is verified to exist at
`docs/curriculum/blueprints/{kg-id}.md` by direct file-existence test;
every entry that instead states "no Blueprint exists" was independently
verified to be correct (checked programmatically this batch for the 1
new Blueprint-less concept, `empty-set`).

**✓ No broken KG references.** 0 broken `requires`/`unlocks` edges across
all 1,775 concepts in all 6 subjects (see the integrity table above).

**◐ Cross-links — 2 unresolvable references found, both real, neither a
blocker:**
1. `math.de.ode` → `math.phys.classical-mechanics` — this resolves to
   neither mathematics's own KG nor any other subject's KG, but it
   matches the KG validator's own recognized "aspirational placeholder"
   pattern (`math.phys.*`, `math.cs.*`, `math.eng.*` — reserved
   future-namespace prefixes the validator explicitly treats as INFO,
   not FAIL). Not a defect; a deliberate forward reference.
2. `chem.atomic.electromagnetic-radiation` → `phys.opt.wave-nature-of-light`
   — this one IS a genuine broken reference: `phys.` is a real, live
   subject prefix, but no concept with that exact slug exists in the
   physics KG (the actual physics concept is
   `phys.opt.nature-of-light`, one word shorter). This looks like a
   naming drift or typo at authoring time. **Recorded as Curriculum
   Feedback for the Curriculum Production Pipeline, not fixed here** —
   this batch does not modify any Canonical Knowledge Graph, per this
   task's explicit constraint and the project's standing rule that KG
   corrections are the Pipeline's to make.

## Physics Wave 6 — explicit exception batch (2026-07-22, COMPLETE)

A direct, explicit user instruction redirected this batch specifically to
physics, overriding the standing math.found-first default (see
`ROADMAP.md` §3b for full detail). Audited first: verified
programmatically that the pre-existing 67 physics EB files have zero
overlap with `AUTHORING_QUEUE.md`'s physics rows and that their union
equals exactly the physics KG's 238 concepts. Authored all 12 concepts at
physics dependency level 6 (the full level). All 12 individually pass
every per-entry check: structural 21-section conformance verified by
heading scan and exact heading-order diff (0 mismatches across all 12);
0 orphans; 0 duplicates; Blueprint References section present and
accurate (all 12 cite an existing Blueprint); no runtime-asset
duplication (none of the 12 created any `AssetIdentity` records). **Six
Curriculum Feedback findings, explicitly carried forward, not resolved**:
every one of the 12 concepts' KG `cross_links` arrays is empty, and 11 of
the 12 have a genuine, identifiable cross-subject connection this program
found but the KG does not yet encode (see `COVERAGE.md`'s Delivery
history for the full per-concept list); `phys.opt.youngs-experiment`
alone was honestly assessed as having no strong cross-subject connection
at this level — a "weak but real" conclusion, not a gap. No Canonical KG
file was modified for any of the six findings.

## Physics Wave 7 — second explicit exception batch, mandatory-rules
cycle (2026-07-23)

A second, direct, explicit user instruction (an 11-point numbered
mandatory-rules set) again redirected this batch specifically to
physics, overriding the standing math.found-first default (see
`ROADMAP.md` §3c for full detail). Audit first, per mandatory rule 1/2
("never trust previous reports"): `git fetch origin && git checkout main
&& git pull origin main` revealed `main` had only 67 physics EB files —
the entire prior Wave 6 batch had never been merged, only existed on the
feature branch. Merged it (fast-forward, zero file conflicts) before
re-auditing again, establishing 79/238 as the true starting point.
Independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-7 set (25 concepts)
matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero discrepancy.
Authored all 25. All 25 individually pass every per-entry check:
structural 21-section conformance verified by heading scan and exact
heading-order diff (0 mismatches across all 25); 0 orphans; 0
duplicates; Blueprint References section present and accurate (all 25
cite an existing Blueprint); no runtime-asset duplication (none of the
25 created any `AssetIdentity` records). Physics KG re-validated fresh
this batch: PASS, 238/238 reachable, 0 failures/warnings — no KG file
was touched. A concurrent commit set (`806eb9b5`/`95d6e44a`/`ff07c8cc`)
landed on `origin/main` mid-batch — verified zero file overlap, merged
cleanly. `physics` is now 104/238 (134 concepts remain).

## Physics Wave 8 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 7 within the same conversation, per rule 10. Re-fetched
`origin/main` after the Wave 7 push and confirmed 0 commits ahead/behind
before starting — no other session had touched physics EB concurrently.
Independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-8 set (15 concepts)
matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero discrepancy.
Authored all 15. All 15 individually pass every per-entry check:
structural 21-section conformance verified by heading scan and exact
heading-order diff (0 mismatches across all 15); 0 orphans; 0
duplicates; Blueprint References section present and accurate (all 15
cite an existing Blueprint — `phys.opt.single-slit` cites all 4 of its
Blueprint's documented misconceptions, matching the 4-misconception
density already established for its sibling `phys.opt.diffraction`); no
runtime-asset duplication (none of the 15 created any `AssetIdentity`
records). Physics KG re-validated fresh this batch: PASS, 238/238
reachable, 0 failures/warnings — no KG file was touched. `physics` is
now exactly 119/238 — 50.00%, the halfway point of the subject.

## Physics Wave 9 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 8 within the same conversation, per rule 10. Re-fetched
`origin/main` after the Wave 8 push and confirmed 0 commits ahead/behind
before starting — no other session had touched physics EB concurrently.
Independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-9 set (16 concepts)
matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero discrepancy.
Authored all 16. All 16 individually pass every per-entry check:
structural 21-section conformance verified by heading scan and exact
heading-order diff (0 mismatches across all 16); 0 orphans; 0
duplicates; Blueprint References section present and accurate (all 16
cite an existing Blueprint — `phys.mod.photoelectric-effect` and
`phys.rel.postulates` each cite all 4 of their Blueprint's documented
misconceptions, matching the 4-misconception density already established
for `phys.opt.diffraction`/`phys.opt.single-slit`); no runtime-asset
duplication (none of the 16 created any `AssetIdentity` records). This
wave introduced the first Modern Physics and Relativity domain entries
in this program. Physics KG re-validated fresh this batch: PASS, 238/238
reachable, 0 failures/warnings — no KG file was touched. `physics` is
now 135/238 — 56.72%.

## Physics Wave 10 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 9 within the same conversation, per rule 10. Re-fetched
`origin/main` after the Wave 9 push and confirmed 0 commits ahead/behind
before starting — no other session had touched physics EB concurrently.
Independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-10 set (9 concepts)
matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero discrepancy.
Authored all 9. All 9 individually pass every per-entry check:
structural 21-section conformance verified by heading scan and exact
heading-order diff (0 mismatches across all 9); 0 orphans; 0 duplicates;
Blueprint References section present and accurate (all 9 cite an
existing Blueprint — `phys.mod.photons` cites all 4 of its Blueprint's
documented misconceptions, matching the 4-misconception density already
established for `phys.opt.diffraction`/`phys.opt.single-slit`/
`phys.mod.photoelectric-effect`/`phys.rel.postulates`); no runtime-asset
duplication (none of the 9 created any `AssetIdentity` records). Physics
KG re-validated fresh this batch: PASS, 238/238 reachable, 0 failures/
warnings — no KG file was touched. `physics` is now 144/238 — 60.50%.

## Physics Wave 11 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 10 within the same conversation, per rule 10. Re-fetched
`origin/main` after the Wave 10 push and confirmed 0 commits ahead/
behind before starting — no other session had touched physics EB
concurrently. Independently recomputed dependency levels via a fresh
Kahn's-algorithm pass over the live KG's `requires` edges — the
level-11 set (11 concepts) matched `AUTHORING_QUEUE.md`'s stored rows
exactly, zero discrepancy. Authored all 11. All 11 individually pass
every per-entry check: structural 21-section conformance verified by
heading scan and exact heading-order diff (0 mismatches across all 11);
0 orphans; 0 duplicates; Blueprint References section present and
accurate (all 11 cite an existing Blueprint — six of the eleven
[`phys.mod.compton-effect`, `phys.mod.de-broglie`,
`phys.mod.bohr-model`, `phys.mod.x-rays`, `phys.rel.time-dilation`,
`phys.stat.probability-basics`] each cite all 4 of their Blueprint's
documented misconceptions, extending the 4-misconception density
pattern to 10 concepts across this program); no runtime-asset
duplication (none of the 11 created any `AssetIdentity` records). This
wave introduced the first Statistical Mechanics domain entry in this
program. Physics KG re-validated fresh this batch: PASS, 238/238
reachable, 0 failures/warnings — no KG file was touched. `physics` is
now 155/238 — 65.13%.

## Physics Wave 12 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 11 within the same conversation, per rule 10. Re-fetched
`origin/main` after the Wave 11 push and confirmed 0 commits ahead/
behind before starting — no other session had touched physics EB
concurrently. Independently recomputed dependency levels via a fresh
Kahn's-algorithm pass over the live KG's `requires` edges — the
level-12 set (8 concepts) matched `AUTHORING_QUEUE.md`'s stored rows
exactly, zero discrepancy. Authored all 8. All 8 individually pass every
per-entry check: structural 21-section conformance verified by heading
scan and exact heading-order diff (0 mismatches across all 8); 0
orphans; 0 duplicates; Blueprint References section present and accurate
(all 8 cite an existing Blueprint — all 8 cite all 4 of their
Blueprint's documented misconceptions, extending the 4-misconception
density pattern to 18 concepts across this program); no runtime-asset
duplication (none of the 8 created any `AssetIdentity` records). This
wave introduced the second Statistical Mechanics domain entry
(`phys.stat.boltzmann-factor`) and reached the Hamiltonian formulation
hub concept (`phys.mech.hamiltonian`), a genuine bridge into quantum
mechanics via its KG unlock
`phys.qm.scattering-theory-born-approximation`. Physics KG re-validated
fresh this batch: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS this batch.
`physics` is now 163/238 — 68.49%.

## Physics Wave 13 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following the Wave 12 merge within the same conversation, per rule 10.
Re-fetched `origin/main` after the Wave 12 merge-push and confirmed 0
commits ahead/behind before starting — no other session had touched
physics EB concurrently this time. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-13 set (6 concepts) matched `AUTHORING_QUEUE.md`'s
stored rows exactly, zero discrepancy. Authored all 6. All 6
individually pass every per-entry check: structural 21-section
conformance verified by heading scan and exact heading-order diff (0
mismatches across all 6); 0 orphans; 0 duplicates; Blueprint References
section present and accurate (all 6 cite an existing Blueprint — 5 of
the 6 cite all 4 of their Blueprint's documented misconceptions,
extending the 4-misconception density pattern to 23 concepts across this
program; `phys.mech.hamiltons-equations`' Blueprint documents only 2);
no runtime-asset duplication (none of the 6 created any `AssetIdentity`
records). This wave introduced the first Quantum Mechanics domain entry
in this program (`phys.qm.wave-function`) and expanded Statistical
Mechanics with two more hub concepts, including
`phys.stat.partition-function` (a major hub feeding six downstream KG
concepts). Physics KG re-validated fresh this batch: PASS, 238/238
reachable, 0 failures/warnings — no KG file was touched; all 6 subject
KGs re-validated PASS this batch. `physics` is now 169/238 — 71.01%.
**Merge note**: this batch's push encountered a second concurrent
Chemistry EB batch (level 4, 8 concepts, 24→32) — merged rather than
force-pushed; found the same bookkeeping gap as Wave 12 (chemistry rows
not added to `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md`, not removed from
`AUTHORING_QUEUE.md`), corrected as part of that merge.

## Physics Wave 14 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 13's second merge within the same conversation, per rule
10. Re-fetched `origin/main` after the Wave 13 merge-push and confirmed
0 commits ahead/behind before starting — no other session had touched
physics EB concurrently this time. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-14 set (10 concepts) matched `AUTHORING_QUEUE.md`'s
stored rows exactly, zero discrepancy. Authored all 10. All 10
individually pass every per-entry check: structural 21-section
conformance verified by heading scan and exact heading-order diff (0
mismatches across all 10); 0 orphans; 0 duplicates; Blueprint References
section present and accurate (all 10 cite an existing Blueprint); no
runtime-asset duplication (none of the 10 created any `AssetIdentity`
records). This wave completed the Schrödinger-equation hub
(`phys.qm.schrodinger-equation`, unlocking 5 downstream quantum-
mechanics concepts) and expanded Statistical Mechanics with four more
hub concepts (Bose-Einstein statistics, statistical entropy,
fluctuations/correlations, free energy, grand canonical ensemble).
Physics KG re-validated fresh this batch: PASS, 238/238 reachable, 0
failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS this batch. `physics` is now 179/238 — 75.21%. No
concurrent push encountered this time.

## Domain Certification — math.found

**Certification does NOT pass**, correctly: `math.found` has 82 total
concepts, 31 authored across Wave 1 (5), Wave 2 (8), Wave 3 (6), Wave 4
(4), and Wave 5 (8), 51 remaining. Domain Certification requires 100%
of a domain's concepts authored — reported here as IN PROGRESS, not
marked COMPLETE anywhere in `COVERAGE.md` or `ROADMAP.md`. All 31
authored concepts individually pass every per-entry check (structural
21-section conformance verified by heading scan and exact heading-order
diff; 0 orphans; 0 duplicates; Blueprint References section present and
accurate — either citing an existing Blueprint or stating none exists;
no runtime-asset duplication — none of the 31 created any
`AssetIdentity` records). **Three open KGCS review items, explicitly
carried forward, not resolved**: (1) `math.found.mathematical-notation`
and `math.found.mathematical-symbols` remain flagged as a genuinely
thin KG distinction (near-identical descriptions, identical single
prerequisite, identical `bloom: remember`); (2) `math.found.set`'s
Misconception Register substantially overlaps `math.found.set-theory`'s
own (order/repetition, ∅-vs-{∅}); (3) the same ∅-vs-{∅} confusion is now
registered a THIRD time in `math.found.empty-set`'s own Misconceptions,
found this batch. No Canonical KG file has been modified for any of the
three; all stay open until `math.found` reaches 82/82.

## Full index and queue

See `EDUCATIONAL_BRAIN_INDEX.md` (1,775 rows, one per KG concept, with
Blueprint/EB/Status columns) and `AUTHORING_QUEUE.md` (1,524 rows —
every `MISSING` concept, with `math.found`'s remaining 46 called out as
the default next targets per the current Domain Certification Mode,
unless overridden by an equally explicit subject-specific instruction as
this batch was) for the complete, per-concept detail behind every count
in this report.

## Verdict

**No blocking defect found.** The two mathematics/chemistry cross-link
findings (KG-level, pre-existing) remain informational, as does the
accumulated physics cross-link findings from Waves 12-14 (10 genuine
cross-subject connections identified in Curriculum Feedback despite
empty KG `cross_links` fields — `phys.stat.boltzmann-factor`'s and
`phys.stat.maxwell-boltzmann`'s Arrhenius-equation links to chemistry,
`phys.stat.partition-function`'s and `phys.stat.grand-canonical-ensemble`'s
statistical-thermodynamics/chemical-equilibrium links to chemistry,
`phys.mod.radioactivity`'s and `phys.mod.radioactive-decay`'s nuclear-
medicine/archaeology links, `phys.qm.schrodinger-equation`'s quantum-
chemistry link, `phys.rel.relativistic-momentum`'s nuclear-engineering
link, `phys.stat.entropy-statistical`'s information-theory link, and
`phys.stat.free-energy`'s chemistry/biology links — + 14 honest "none
found" across all three waves — an EB-authoring-level observation, not
a KG defect). None of these break any of the Phase 2 checklist's pass/
fail criteria. The open items (Blueprint References migration debt on
70 pre-Standard entries; math.found domain at 37/82; the bookkeeping
gaps found in both concurrent chemistry batches, corrected as part of
the Wave 12 and Wave 13 merges; the structural heading non-conformance
found in the concurrent `math.found` Wave 6 batch, flagged not
corrected) are already tracked, already have owners (future
reconciliation/continuation batches), and do not block new authoring
under the current Standard.

---

## Batch 15 validation (2026-07-23) — math.found Wave 6

**Re-validated**: 0 new KG files touched; 5 new EB entries authored. All 5
`math.found` Wave 6 concepts (`logical-equivalence`, `subset`, `quantifiers`,
`relation`, `ordinal-number`) verified:
- Blueprint exists for all 5 ✅
- All 5 entries conform to `EDUCATIONAL_BRAIN_STANDARD.md` 21-section structure ✅
- 0 orphan EB files (all 5 new files map to valid KG node IDs) ✅
- 0 duplicate EB files ✅
- 0 broken KG references ✅
- 0 invalid Blueprint references ✅

Total EB entries: 195. `math.found` is now 36/82. `AUTHORING_QUEUE.md` updated
(5 rows removed). `EDUCATIONAL_BRAIN_INDEX.md` updated (5 rows MISSING→READY).
No KG file was modified.

**Open items carried forward** (unchanged from prior batches):
- Blueprint References migration debt on 71 pre-Standard entries (tracked in `EDUCATIONAL_BRAIN_STANDARD.md §6`)
- `mathematical-notation`/`mathematical-symbols` KG overlap (Wave 2 Curriculum Feedback, unresolved)
- `math.found` domain at 36/82 — Wave 7 candidates to be computed before the next batch

---

## Physics Wave 15 — mandatory-rules cycle continuation (2026-07-23)

This batch followed a separate, intervening turn (a read-only Forensic
Repository Audit, no production work, no commits) — resumed the standing
Curriculum Completion Program cycle per the user's "Continue working from
here" instruction. Re-fetched `origin/main`: it had moved TWICE since the
prior physics batch (a concurrent session landed 7 chemistry EB entries
at level 10, then 16 more at level 11 — chemistry rising 73→89); pulled
both fast-forwards cleanly, confirmed 0 commits ahead/behind before
starting. Re-audited physics EB state fresh from disk (179/238,
unaffected by the concurrent chemistry work — confirmed no other session
touched physics EB in that window). Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-15 set (9 concepts) matched the previously-computed
candidate list exactly: `phys.mech.canonical-transformations`,
`phys.mod.nuclear-reactions`, `phys.qm.harmonic-oscillator-qm`,
`phys.qm.operators`, `phys.qm.particle-in-box`,
`phys.qm.quantum-tunneling`, `phys.rel.mass-energy`,
`phys.stat.chemical-potential`, `phys.stat.phase-transitions`. Verified
all 9 have existing Blueprints on disk before starting. Authored all 9.
All 9 individually pass every per-entry check: structural 21-section
conformance verified by heading scan and exact heading-order diff (0
mismatches across all 9, checked against `EDUCATIONAL_BRAIN_STANDARD.md`'s
canonical heading list programmatically); 0 orphans (all 9 new files map
to a valid KG concept id, verified against `docs/physics/kg/graph.json`);
0 duplicates (verified via `git log --diff-filter=A` showing 0 prior
commits touching any of the 9 new file paths, and via a repo-wide
orphan/duplicate scan across all 6 subjects); Blueprint References
section present and accurate (all 9 cite an existing Blueprint by exact
path); no runtime-asset duplication (none of the 9 created any
`AssetIdentity` records, checked against `brainSeedAssets.ts`). This wave
completed all four downstream concepts of the `phys.qm.schrodinger-
equation` hub authored in Wave 14 (operators, particle-in-box, harmonic
oscillator, quantum tunneling), closed out Statistical Mechanics' two
remaining leaf concepts (chemical potential, phase transitions), and
added one Classical Mechanics capstone (canonical transformations,
itself unlocking `phys.mech.hamilton-jacobi-equation`) and one Modern
Physics capstone (nuclear reactions, generalizing the radioactive-decay
Q-value machinery to induced two-body reactions). Physics KG re-validated
fresh this batch: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS this batch.
`physics` is now 188/238 — 78.99%. **Tracking-file reconciliation
performed this batch, beyond physics itself**: found and corrected a
57-row bookkeeping gap left by the concurrent chemistry level-10/level-11
batches — those batches authored 23 files (7+16) but never added their
rows to `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md` and never removed the
corresponding 57 stale rows from `AUTHORING_QUEUE.md` (57, not 23,
because the gap had accumulated across two batches without any
intervening reconciliation). Corrected in the same pass as this batch's
own physics-Wave-15 tracking-file updates. True total, recomputed fresh
by scanning every live file: **317** EB entries (188 physics + 37
mathematics + 89 chemistry + 3 english), out of 1,775 total KG concepts,
1,458 remaining (17.86%). No concurrent push encountered during this
batch's own commit/push (verified via `git fetch` + `git rev-list
--left-right --count` immediately before push).

**Updated Phase 2 checklist numbers (this batch, recomputed fresh)**:
- Every Educational Brain entry points to one existing KG concept: 317
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **221/317** have a matching Blueprint file on disk. The other 96 are: 7
  `math.found` concepts (genuinely Blueprint-less, stated explicitly in
  each entry) plus all 89 chemistry concepts (chemistry's Blueprint
  production track has never started, per the 2026-07-23 Forensic
  Repository Audit's finding that no chemistry Blueprint file has ever
  existed in this repository's history). All 9 of this batch's new
  physics entries (Wave 15) DO have existing Blueprints, each reused by
  reference.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

---

## Physics Wave 16 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 15, triggered by a plain "Continue" instruction. Re-
fetched `origin/main` and confirmed 0 commits ahead/behind before
starting — no concurrent push this time (unlike Wave 15, where origin
had moved twice during an intervening audit turn). Independently
recomputed dependency levels via a fresh Kahn's-algorithm pass over the
live KG's `requires` edges — the level-16 set (7 concepts) matched the
expected candidate list exactly: `phys.mech.hamilton-jacobi-equation`,
`phys.mod.binding-energy`, `phys.qm.hydrogen-atom-qm`, `phys.qm.spin`,
`phys.rel.spacetime`, `phys.stat.ising-model`, `phys.particle.four-
forces`. Verified all 7 have existing Blueprints on disk before
starting. Authored all 7. All 7 individually pass every per-entry check:
structural 21-section conformance verified by heading scan and exact
heading-order diff (0 mismatches across all 7); 0 orphans (all 7 new
files map to a valid KG concept id, verified against
`docs/physics/kg/graph.json`); 0 duplicates (verified via `git log
--diff-filter=A` showing 0 prior commits touching any of the 7 new file
paths, and via a repo-wide orphan/duplicate scan across all 6 subjects);
Blueprint References section present and accurate (all 7 cite an
existing Blueprint by exact path); no runtime-asset duplication (none of
the 7 created any `AssetIdentity` records, checked against
`brainSeedAssets.ts`). `phys.particle.four-forces` was independently
verified as the formal root node of the Particle Physics domain: its
only prerequisites (`phys.em.coulombs-law`, `phys.mod.nuclear-reactions`)
lie outside the domain, so no other Particle Physics concept was already
authorable — this wave genuinely OPENS that 16-concept domain for the
first time in this program. Physics KG re-validated fresh this batch:
PASS, 238/238 reachable, 0 failures/warnings — no KG file was touched;
all 6 subject KGs re-validated PASS this batch. `physics` is now
195/238 — 81.93%. **Tracking-file reconciliation performed this batch,
beyond physics EB authoring itself**: found and corrected a pre-existing
Blueprint-column accuracy bug in `EDUCATIONAL_BRAIN_INDEX.md` — 21 rows
(15 `phys.particle.*` concepts plus 6 `phys.mod.*` semiconductor
concepts, all with Blueprint files genuinely present on disk) were
recorded as Blueprint="No"; corrected via direct file-existence
verification, then re-scanned the entire file programmatically and
confirmed 0 remaining Blueprint-column mismatches in either direction
across all 1,775 rows. True total, recomputed fresh by scanning every
live file: **324** EB entries (195 physics + 37 mathematics + 89
chemistry + 3 english), out of 1,775 total KG concepts, 1,451 remaining
(18.25%). No concurrent push encountered during this batch's own
commit/push (verified via `git fetch` + `git rev-list --left-right
--count` immediately before push).

**Updated Phase 2 checklist numbers (this batch, recomputed fresh)**:
- Every Educational Brain entry points to one existing KG concept: 324
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **228/324** have a matching Blueprint file on disk. The other 96 are: 7
  `math.found` concepts (genuinely Blueprint-less, stated explicitly in
  each entry) plus all 89 chemistry concepts (chemistry's Blueprint
  production track has never started). All 7 of this batch's new
  physics entries (Wave 16) DO have existing Blueprints, each reused by
  reference.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

## Physics Wave 17 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 16, triggered by an explicit standing instruction — "Keep
continue until 238/238 done" — which sets 238/238 as this program's
stopping condition rather than a single batch. Re-fetched `origin/main`
and confirmed 0 commits ahead/behind before starting — no concurrent push
occurred between Wave 16 and Wave 17. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-17 set (12 concepts) matched the expected candidate
list exactly: `phys.mod.nuclear-fission`, `phys.mod.nuclear-fusion`,
`phys.mod.nuclear-models`, `phys.qm.pauli-exclusion`,
`phys.qm.perturbation-theory`, `phys.qm.selection-rules`,
`phys.qm.angular-momentum-addition`, `phys.qm.density-matrix`,
`phys.stat.phase-transitions-critical-phenomena`,
`phys.stat.monte-carlo-basics`, `phys.particle.particle-classification`,
`phys.particle.gauge-bosons` — the largest single wave since Wave 9,
driven by the unlock cascade from Wave 16's `phys.particle.four-forces`
domain-root authoring. Verified all 12 have existing Blueprints on disk
before starting. Authored all 12. All 12 individually pass every
per-entry check: structural 21-section conformance verified by heading
scan and exact heading-order diff (0 mismatches across all 12); 0 orphans
(all 12 new files map to a valid KG concept id, verified against
`docs/physics/kg/graph.json`); 0 duplicates (verified via `git log
--diff-filter=A` showing 0 prior commits touching any of the 12 new file
paths, and via a repo-wide orphan/duplicate scan across all 6 subjects);
Blueprint References section present and accurate (all 12 cite an
existing Blueprint by exact path); no runtime-asset duplication (none of
the 12 created any `AssetIdentity` records, checked against
`brainSeedAssets.ts`). Physics KG re-validated fresh this batch: PASS,
238/238 reachable, 0 failures/warnings — no KG file was touched; all 6
subject KGs re-validated PASS this batch. `physics` is now 207/238 —
86.97%, 31 concepts remaining. True total, recomputed fresh by scanning
every live file: **336** EB entries (207 physics + 37 mathematics + 89
chemistry + 3 english), out of 1,775 total KG concepts, 1,439 remaining
(18.93%). No concurrent push encountered during this batch's own
commit/push (verified via `git fetch` + `git rev-list --left-right
--count` immediately before push).

**Updated Phase 2 checklist numbers (this batch, recomputed fresh)**:
- Every Educational Brain entry points to one existing KG concept: 336
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **240/336** have a matching Blueprint file on disk. The other 96 are: 7
  `math.found` concepts (genuinely Blueprint-less, stated explicitly in
  each entry) plus all 89 chemistry concepts (chemistry's Blueprint
  production track has never started). All 12 of this batch's new
  physics entries (Wave 17) DO have existing Blueprints, each reused by
  reference.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

Per the user's standing instruction, the next unlocked physics wave
(Wave 18) was NOT computed this batch — it must be recomputed fresh from
the live KG immediately after this batch's commit/push completes, and the
cycle continues without pausing until physics reaches 238/238.

## Physics Wave 18 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 17, per the same explicit standing instruction — "Keep
continue until 238/238 done." Re-fetched `origin/main` and confirmed 0
commits ahead/behind before starting — no concurrent push occurred
between Wave 17 and Wave 18. Independently recomputed dependency levels
via a fresh Kahn's-algorithm pass over the live KG's `requires` edges —
the level-18 set (8 concepts) matched the expected candidate list
exactly: `phys.qm.variational-method`, `phys.qm.identical-particles`,
`phys.qm.scattering-theory-born-approximation`, `phys.stat.fermi-dirac`,
`phys.astro.stellar-structure`, `phys.particle.antimatter`,
`phys.particle.quarks`, `phys.particle.leptons` — drawing from three
different domains simultaneously (Quantum Mechanics, Statistical
Physics, Astrophysics, and Particle Physics), reflecting the unlock
cascade from Wave 17's authoring across those same domains.
`phys.astro.stellar-structure` is notable as the first Astrophysics-
domain concept authored under this program — a 6-concept domain
(`phys.astro.*`: stellar-structure, stellar-evolution, cosmology,
dark-matter, black-holes, gravitational-waves) confirmed present in the
live KG via direct query, previously not called out separately in
project memory. Verified all 8 have existing Blueprints on disk before
starting. Authored all 8. All 8 individually pass every per-entry check:
structural 21-section conformance verified by heading scan and exact
heading-order diff (0 mismatches across all 8); 0 orphans (all 8 new
files map to a valid KG concept id, verified against
`docs/physics/kg/graph.json`); 0 duplicates (verified via `git log
--diff-filter=A` showing 0 prior commits touching any of the 8 new file
paths, and via a repo-wide orphan/duplicate scan across all 6 subjects);
Blueprint References section present and accurate (all 8 cite an
existing Blueprint by exact path); no runtime-asset duplication (none of
the 8 created any `AssetIdentity` records, checked against
`brainSeedAssets.ts`). Physics KG re-validated fresh this batch: PASS,
238/238 reachable, 0 failures/warnings — no KG file was touched; all 6
subject KGs re-validated PASS this batch. `physics` is now 215/238 —
90.34%, 23 concepts remaining. True total, recomputed fresh by scanning
every live file: **344** EB entries (215 physics + 37 mathematics + 89
chemistry + 3 english), out of 1,775 total KG concepts, 1,431 remaining
(19.38%). No concurrent push encountered during this batch's own
commit/push (verified via `git fetch` + `git rev-list --left-right
--count` immediately before push).

**Updated Phase 2 checklist numbers (this batch, recomputed fresh)**:
- Every Educational Brain entry points to one existing KG concept: 344
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **248/344** have a matching Blueprint file on disk. The other 96 are: 7
  `math.found` concepts (genuinely Blueprint-less, stated explicitly in
  each entry) plus all 89 chemistry concepts (chemistry's Blueprint
  production track has never started). All 8 of this batch's new
  physics entries (Wave 18) DO have existing Blueprints, each reused by
  reference.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

Per the user's standing instruction, the next unlocked physics wave
(Wave 19) was NOT computed this batch — it must be recomputed fresh from
the live KG immediately after this batch's commit/push completes, and
the cycle continues without pausing until physics reaches 238/238.

## Physics Wave 19 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 18, per the same explicit standing instruction — "Keep
continue until 238/238 done." Re-fetched `origin/main` and confirmed 0
commits ahead/behind before starting. Independently recomputed
dependency levels via a fresh Kahn's-algorithm pass over the live KG's
`requires` edges —
the level-19 set (8 concepts) matched the expected candidate list
exactly: `phys.qm.wkb-approximation`, `phys.qm.s-matrix-basics`,
`phys.astro.stellar-evolution`, `phys.astro.cosmology`,
`phys.particle.neutrinos`, `phys.particle.hadron-quark-model`,
`phys.particle.strong-interaction`, `phys.mod.energy-bands` — continuing
the unlock cascade from Wave 18's authoring across the Quantum
Mechanics, Astrophysics, and Particle Physics domains. `phys.mod.
energy-bands` is notable as the entry point for the six-concept
semiconductor-physics extension of the Modern Physics domain. Verified
all 8 have existing Blueprints on disk before starting. Authored all 8.
All 8 individually pass every per-entry check: structural 21-section
conformance verified by heading scan and exact heading-order diff (0
mismatches across all 8); 0 orphans (all 8 new files map to a valid KG
concept id, verified against `docs/physics/kg/graph.json`); 0 duplicates
(verified via `git log --diff-filter=A` showing 0 prior commits touching
any of the 8 new file paths, and via a repo-wide orphan/duplicate scan
across all 6 subjects); Blueprint References section present and
accurate (all 8 cite an existing Blueprint by exact path); no
runtime-asset duplication (none of the 8 created any `AssetIdentity`
records, checked against `brainSeedAssets.ts`). Physics KG re-validated
fresh this batch: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS this batch.
`physics` is now 223/238 — 93.70%, 15 concepts remaining. True total at
the moment this wave was authored: **352** EB entries (223 physics + 37
mathematics + 89 chemistry + 3 english), 1,423 remaining (19.83%).

**Merge encountered on push (first)**: fetching immediately before push
(per standing safety practice) found `origin/main` had moved 2 commits
ahead — a concurrent session's Chemistry EB level-12 batch (17 concepts,
chemistry 89→106), pushed while this Wave 19 batch was in progress.
Merged via `git merge` — zero file overlap in authored concept files
(physics vs. chemistry), but both `COVERAGE.md` and `ROADMAP.md` had
been edited by both sides and required manual conflict resolution
(both sides' delivery-history/current-batch content preserved, combined
totals recomputed fresh rather than summed by hand). The merge also
surfaced a bookkeeping gap in the concurrent session's own commit —
its 17 new chemistry files were never added to `EDUCATIONAL_BRAIN_
INDEX.md`, removed from `AUTHORING_QUEUE.md`, or reflected in `QUALITY.
md` (the same pattern previously found in Waves 12, 13, 15, and 16) —
found and corrected as part of this merge's reconciliation, alongside
this wave's own physics updates. True total after this first merge,
recomputed fresh: **369** EB entries (223 physics + 37 mathematics +
106 chemistry + 3 english), 1,406 remaining (19.83%→20.79%).

**Merge encountered on push (second)**: fetching again immediately
before push found `origin/main` had moved a further 1 commit ahead — a
second concurrent Chemistry batch (level 13, 15 concepts, chemistry
106→121), pushed while resolving the first merge. Merged via `git merge`
— again zero file overlap in authored concept files, with `COVERAGE.md`
and `ROADMAP.md` requiring a second round of conflict resolution. The
same bookkeeping-gap pattern was found in this second concurrent
commit (its 15 new files similarly not added to `EDUCATIONAL_BRAIN_
INDEX.md`, removed from `AUTHORING_QUEUE.md`, or reflected in
`QUALITY.md`) — found and corrected. Post-both-merges true total,
recomputed fresh by scanning every live file across all 6 subjects:
**384** EB entries (223 physics + 37 mathematics + 121 chemistry + 3
english), out of 1,775 total KG concepts, 1,391 remaining (21.63%).

**Updated Phase 2 checklist numbers (post-both-merges, recomputed
fresh)**:
- Every Educational Brain entry points to one existing KG concept: 384
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **256/384** have a matching Blueprint file on disk. The other 128 are:
  7 `math.found` concepts (genuinely Blueprint-less, stated explicitly
  in each entry) plus all 121 chemistry concepts (chemistry's Blueprint
  production track has never started). All 8 of this batch's new
  physics entries (Wave 19) DO have existing Blueprints, each reused by
  reference; the two concurrent Chemistry batches' 32 new entries (17
  at level 12, 15 at level 13) add 0 to the Blueprint-matched count,
  consistent with chemistry's Blueprint-less track.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

Per the user's standing instruction, the next unlocked physics wave
(Wave 20) was NOT computed this batch — it must be recomputed fresh from
the live KG immediately after this batch's commit/push completes, and
the cycle continues without pausing until physics reaches 238/238.

## Physics Wave 20 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 19 (and its two merge reconciliations), per the same
explicit standing instruction — "Keep continue until 238/238 done."
Re-fetched `origin/main` and confirmed 0 commits ahead/behind before
starting. Re-audited physics EB state fresh from disk (223/238).
Independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-20 set (5 concepts)
matched the expected candidate list exactly: `phys.astro.dark-matter`,
`phys.astro.black-holes`, `phys.particle.weak-interaction`,
`phys.particle.conservation-laws`, `phys.mod.semiconductor-
classification` — continuing the unlock cascade from Wave 19's authoring
across the Astrophysics, Particle Physics, and Modern Physics
(semiconductor extension) domains. Verified all 5 have existing
Blueprints on disk before starting. Authored all 5.

All 5 individually pass every per-entry check: structural 21-section
conformance verified by heading scan and exact heading-order diff (0
mismatches across all 5); 0 orphans (all 5 new files map to a valid KG
concept id, verified against `docs/physics/kg/graph.json`); 0 duplicates
(verified via `git log --oneline` showing 0 prior commits touching any
of the 5 new file paths, and via a repo-wide orphan/duplicate scan across
all 6 subjects); Blueprint References section present and accurate (all
5 cite an existing Blueprint by exact path); no runtime-asset duplication
(none of the 5 created any `AssetIdentity` records, checked against
`brainSeedAssets.ts`).

Physics KG re-validated fresh this batch: PASS, 238/238 reachable, 0
failures/warnings — no KG file was touched. All 6 subject KGs
re-validated PASS this batch (mathematics 908/908, physics 238/238,
english 216/216, chemistry 186/186, biology 108/108, computer_science
119/119 — all 0 failures/0 warnings).

`physics` is now 228/238 — 95.80%, only 10 concepts remaining, all in
Particle Physics (levels 21-23: `phys.particle.electroweak-unification`,
`phys.particle.feynman-diagrams`, `phys.particle.accelerators-detectors`,
`phys.particle.higgs-mechanism`, `phys.particle.standard-model`) and the
Modern Physics semiconductor extension (levels 21-24:
`phys.mod.intrinsic-semiconductors`, `phys.mod.extrinsic-semiconductors`,
`phys.mod.pn-junction`, `phys.mod.diode-rectification`). True total,
recomputed fresh by scanning every live file across all 6 subjects:
**389** EB entries (228 physics + 37 mathematics + 121 chemistry + 3
english), out of 1,775 total KG concepts, 1,386 remaining (21.92%).

No concurrent commits landed on `origin/main` during this batch — a
single, uneventful fetch-verify-push, unlike Wave 19's two merges.

**Updated Phase 2 checklist numbers (recomputed fresh)**:
- Every Educational Brain entry points to one existing KG concept: 389
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **261/389** have a matching Blueprint file on disk. The other 128 are:
  7 `math.found` concepts (genuinely Blueprint-less, stated explicitly
  in each entry) plus all 121 chemistry concepts (chemistry's Blueprint
  production track has never started). All 5 of this batch's new
  physics entries (Wave 20) DO have existing Blueprints, each reused by
  reference.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

Per the user's standing instruction, the next unlocked physics wave
(Wave 21) was NOT computed this batch — it must be recomputed fresh from
the live KG immediately after this batch's commit/push completes, and
the cycle continues without pausing until physics reaches 238/238.

## Physics Wave 21 — mandatory-rules cycle continuation (2026-07-23)

Continuation of the same mandatory-rules production cycle immediately
following Wave 20, per the same explicit standing instruction — "Keep
continue until 238/238 done." Re-fetched `origin/main` and confirmed 0
commits ahead/behind before starting. Re-audited physics EB state fresh
from disk (228/238). Independently recomputed dependency levels via a
fresh Kahn's-algorithm pass over the live KG's `requires` edges — the
level-21 set (5 concepts) matched the expected candidate list exactly:
`phys.astro.gravitational-waves`, `phys.particle.electroweak-
unification`, `phys.particle.feynman-diagrams`, `phys.particle.
accelerators-detectors`, `phys.mod.intrinsic-semiconductors` —
continuing the unlock cascade from Wave 20's authoring across the
Astrophysics, Particle Physics, and Modern Physics (semiconductor
extension) domains. Verified all 5 have existing Blueprints on disk
before starting. Authored all 5.

All 5 individually pass every per-entry check: structural 21-section
conformance verified by heading scan and exact heading-order diff (0
mismatches across all 5); 0 orphans (all 5 new files map to a valid KG
concept id, verified against `docs/physics/kg/graph.json`); 0 duplicates
(verified via `git log --oneline` showing 0 prior commits touching any
of the 5 new file paths, and via a repo-wide orphan/duplicate scan across
all 6 subjects); Blueprint References section present and accurate (all
5 cite an existing Blueprint by exact path); no runtime-asset duplication
(none of the 5 created any `AssetIdentity` records, checked against
`brainSeedAssets.ts`).

Physics KG re-validated fresh this batch: PASS, 238/238 reachable, 0
failures/warnings — no KG file was touched. All 6 subject KGs
re-validated PASS this batch (mathematics 908/908, physics 238/238,
english 216/216, chemistry 186/186, biology 108/108, computer_science
119/119 — all 0 failures/0 warnings).

`physics` is now 233/238 — 97.90%, completing the Astrophysics domain in
full (`phys.astro.gravitational-waves` was its terminal node). Only 5
concepts remain, all in Particle Physics (levels 22-23:
`phys.particle.higgs-mechanism`, `phys.particle.standard-model`) and the
Modern Physics semiconductor extension (levels 22-24:
`phys.mod.extrinsic-semiconductors`, `phys.mod.pn-junction`,
`phys.mod.diode-rectification`). True total at the moment this wave was
authored: **394** EB entries (233 physics + 37 mathematics + 121
chemistry + 3 english), 1,381 remaining (22.20%).

**Merge encountered on push**: fetching immediately before push (per
standing safety practice) found `origin/main` had moved 1 commit ahead
— a concurrent session's Chemistry EB level-14 batch (15 concepts,
chemistry 121→136), pushed while this Wave 21 batch was in progress.
Merged via `git merge` — zero file overlap in authored concept files
(physics vs. chemistry), but both `COVERAGE.md` and `ROADMAP.md` had
been edited by both sides and required manual conflict resolution
(both sides' delivery-history/current-batch content preserved, combined
totals recomputed fresh rather than summed by hand). A genuine data-
quality issue was found in the concurrent commit's own `ROADMAP.md` §1
Totals table during this resolution: it contained two conflicting,
un-reconciled rows (389/1,386/21.92% and 376/1,384/22.03%) left over
from that session's own editing — corrected here to the single true
combined figure. The merge also surfaced the same bookkeeping gap in
the concurrent session's own commit as prior waves — its 15 new
chemistry files were never added to `EDUCATIONAL_BRAIN_INDEX.md`,
removed from `AUTHORING_QUEUE.md`, or reflected in `QUALITY.md` — found
and corrected as part of this merge's reconciliation, alongside this
wave's own physics updates. True total after this merge, recomputed
fresh by scanning every live file across all 6 subjects: **409** EB
entries (233 physics + 37 mathematics + 136 chemistry + 3 english), out
of 1,775 total KG concepts, 1,366 remaining (23.04%).

**Updated Phase 2 checklist numbers (post-merge, recomputed fresh)**:
- Every Educational Brain entry points to one existing KG concept: 409
  files checked, **0 orphans**.
- Every KG concept has at most one Educational Brain entry: **0
  duplicates** (case-insensitive check included).
- Every Educational Brain entry references one Blueprint — partially:
  **266/409** have a matching Blueprint file on disk. The other 143 are:
  7 `math.found` concepts (genuinely Blueprint-less, stated explicitly
  in each entry) plus all 136 chemistry concepts (chemistry's Blueprint
  production track has never started). All 5 of this batch's new
  physics entries (Wave 21) DO have existing Blueprints, each reused by
  reference; the concurrent Chemistry level-14 batch's 15 new entries
  add 0 to the Blueprint-matched count, consistent with chemistry's
  Blueprint-less track.
- No broken KG references: **0** across all 1,775 concepts, all 6
  subjects (integrity table above, re-verified this batch).
- Cross-links: the same 2 pre-existing unresolvable references carried
  forward unchanged from prior batches (§ above) — neither touched or
  affected by this batch's physics-only work.

Per the user's standing instruction, the next unlocked physics wave
(Wave 22) was NOT computed this batch — it must be recomputed fresh from
the live KG immediately after this batch's commit/push completes, and
the cycle continues without pausing until physics reaches 238/238.
